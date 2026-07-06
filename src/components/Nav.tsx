import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type NavLink =
  | { kind: 'scroll'; id: string; label: string }
  | { kind: 'route'; to: string; label: string }

const landingLinks: NavLink[] = [
  { kind: 'scroll', id: 'about', label: 'about' },
  { kind: 'scroll', id: 'building', label: 'building' },
  { kind: 'scroll', id: 'experience', label: 'experience' },
  { kind: 'scroll', id: 'skills', label: 'stack' },
  { kind: 'route', to: '/work', label: 'work' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const location = useLocation()
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 })

  const onLanding = location.pathname === '/'

  function scrollToSection(id: string) {
    close()
    if (onLanding) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

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
            const className = 'group font-mono text-[0.72rem] tracking-[0.14em] uppercase text-muted hover:text-text transition-colors cursor-pointer'
            const inner = (
              <>
                <span className="text-accent/50 mr-1.5">0{i + 1}</span>
                {l.label}
              </>
            )
            return l.kind === 'scroll' ? (
              <button key={l.id} type="button" onClick={() => scrollToSection(l.id)} className={className}>
                {inner}
              </button>
            ) : (
              <Link key={l.to} to={l.to} className={className}>
                {inner}
              </Link>
            )
          })}
        </nav>

        <button
          className="md:hidden text-text -mr-2 p-3"
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
            const className = 'w-full text-left flex items-center gap-3 py-3 font-mono text-[0.82rem] tracking-[0.08em] uppercase text-text'
            const inner = (
              <>
                <span className="text-accent/60 text-[0.7rem]">0{i + 1}</span>
                {l.label}
              </>
            )
            return (
              <li key={l.kind === 'scroll' ? l.id : l.to} className="border-t border-line">
                {l.kind === 'scroll' ? (
                  <button type="button" onClick={() => scrollToSection(l.id)} className={className}>{inner}</button>
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
