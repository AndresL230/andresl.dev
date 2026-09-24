import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`${next} mode`}
      className={cn(
        'inline-flex items-center justify-center text-muted hover:text-text transition-colors cursor-pointer',
        className,
      )}
    >
      {theme === 'dark' ? <Sun size={17} weight="light" /> : <Moon size={17} weight="light" />}
    </button>
  )
}
