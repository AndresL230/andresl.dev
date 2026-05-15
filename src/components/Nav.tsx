import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

const landingLinks = [
  { to: '/#about', label: 'about' },
  { to: '/#experience', label: 'experience' },
  { to: '/#skills', label: 'stack' },
  { to: '/work', label: 'work' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const location = useLocation()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 })

  const onLanding = location.pathname === '/'

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-bg/70 border-b border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 h-[64px] flex items-center justify-between">
        <Link
          to="/"
          onClick={close}
          className="font-mono text-[0.78rem] tracking-[0.02em] text-text hover:text-accent transition-colors"
        >
          <span className="text-accent">~/</span>andresl<span className="text-muted">.dev</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {landingLinks.map((l, i) => {
            const isAnchor = l.to.startsWith('/#')
            const href = isAnchor && onLanding ? l.to.slice(1) : l.to
            const isExternal = isAnchor && !onLanding ? false : isAnchor
            const className = 'group font-mono text-[0.72rem] tracking-[0.14em] uppercase text-muted hover:text-text transition-colors'
            const inner = (
              <>
                <span className="text-accent/50 mr-1.5">0{i + 1}</span>
                {l.label}
              </>
            )
            return isExternal || isAnchor ? (
              <a key={l.to} href={href} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={l.to} to={l.to} className={className}>
                {inner}
              </Link>
            )
          })}
        </nav>

        <button
          className="md:hidden text-text -mr-1 p-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="origin-left h-px bg-accent/80"
      />

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 pb-5 pt-1 flex flex-col">
          {landingLinks.map((l, i) => {
            const isAnchor = l.to.startsWith('/#')
            const href = isAnchor && onLanding ? l.to.slice(1) : l.to
            const className = 'flex items-center gap-3 py-3 font-mono text-[0.82rem] tracking-[0.08em] uppercase text-text'
            const inner = (
              <>
                <span className="text-accent/60 text-[0.7rem]">0{i + 1}</span>
                {l.label}
              </>
            )
            return (
              <li key={l.to} className="border-t border-line">
                {isAnchor ? (
                  <a href={href} onClick={close} className={className}>{inner}</a>
                ) : (
                  <Link to={l.to} onClick={close} className={className}>{inner}</Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}

export default Nav
