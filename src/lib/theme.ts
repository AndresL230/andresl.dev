import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { light: '#f5efe1', dark: '#14110d' }

// Images that ship a `-dark` sibling (same path, `-dark` before the extension).
const DARK_VARIANTS = new Set(['/images/etl-pipeline.svg'])

const listeners = new Set<() => void>()
const systemQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function resolve(): Theme {
  return readStored() ?? (systemQuery?.matches ? 'dark' : 'light')
}

function current(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  listeners.forEach((l) => l())
}

// Follow the OS setting until the visitor picks a theme explicitly.
systemQuery?.addEventListener('change', () => {
  if (!readStored()) apply(resolve())
})

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // private mode / blocked storage — the choice just won't persist
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) {
    apply(theme)
    return
  }
  document.startViewTransition(() => flushSync(() => apply(theme)))
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => 'light' as Theme)
  return {
    theme,
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}

export function themedSrc(src: string, theme: Theme): string
export function themedSrc(src: string | undefined, theme: Theme): string | undefined
export function themedSrc(src: string | undefined, theme: Theme) {
  if (!src || theme !== 'dark' || !DARK_VARIANTS.has(src)) return src
  return src.replace(/(\.[a-z]+)$/, '-dark$1')
}
