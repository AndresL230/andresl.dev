import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, GithubLogo, LinkedinLogo, At } from '@phosphor-icons/react'
import ContactModal from './ContactModal'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

function CtaButton({
  children, onClick, href, variant = 'primary',
}: {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost'
}) {
  const className =
    variant === 'primary'
      ? 'group inline-flex items-center gap-2 rounded-md bg-accent text-accent-ink font-mono text-[0.84rem] tracking-[0.06em] uppercase px-5 py-3 hover:bg-accent/90 transition-colors'
      : 'group inline-flex items-center gap-2 rounded-md text-text font-mono text-[0.84rem] tracking-[0.06em] uppercase px-5 py-3 hover:text-accent transition-colors'
  const inner = (
    <span className="inline-flex items-center gap-2">
      {children}
      <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={className}>
      {inner}
    </button>
  )
}

const currently: { text: string; name?: string; href?: string }[] = [
  { text: 'building payments infra at Grove Tax' },
  { text: 'making AI tooling' },
  { text: 'shipping ', name: 'Sapling', href: 'https://saplinglearn.com' },
  { text: 'writing backends for nonprofits' },
]

function CurrentlyLine() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % currently.length), 3000)
    return () => clearInterval(id)
  }, [])

  const s = currently[index]

  return (
    <span className="mt-2 grid items-center">
      {currently.map((c) => (
        <span
          key={c.text + (c.name ?? '')}
          className="col-start-1 row-start-1 invisible"
          aria-hidden="true"
        >
          Currently I&apos;m {c.text}
          {c.name}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          Currently I&apos;m{' '}
          <span className="text-text">
            {s.text}
            {s.name && (
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
              >
                {s.name}
              </a>
            )}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Hero() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative min-h-[100dvh] pt-[64px] overflow-hidden flex items-center" id="hero">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-10 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display font-medium tracking-[-0.04em] leading-[0.95] text-balance text-text"
          style={{ fontSize: 'clamp(3.5rem, 9.4vw, 7rem)' }}
        >
          Andres Lopez<span className="text-accent">.</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 max-w-[780px] mx-auto"
        >
          <p className="font-display text-text-dim leading-[1.45]"
            style={{ fontSize: 'clamp(1.44rem, 2.4vw, 1.875rem)' }}>
            Rising junior at Boston University.
            <CurrentlyLine />
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-15 flex flex-wrap items-center justify-center gap-x-5 gap-y-4"
        >
          <CtaButton onClick={() => setContactOpen(true)}>get in touch</CtaButton>
          <span className="text-muted-2 mx-1">·</span>
          <CtaButton href="/work" variant="ghost">selected work</CtaButton>

          <div className="flex items-center gap-1 ml-1">
            <SocialIcon href="https://github.com/AndresL230" label="GitHub">
              <GithubLogo size={22} weight="duotone" />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/andres-lopez23/" label="LinkedIn">
              <LinkedinLogo size={22} weight="duotone" />
            </SocialIcon>
            <SocialIcon href="https://devpost.com/AndresL230" label="Devpost">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.446 0 3.851-1.348 3.851-3.875 0-2.676-1.405-3.839-3.851-3.839z" />
              </svg>
            </SocialIcon>
            <SocialIcon as="button" onClick={() => setContactOpen(true)} label="Email">
              <At size={22} weight="duotone" />
            </SocialIcon>
          </div>
        </motion.div>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </section>
  )
}

function SocialIcon({
  href, label, children, as = 'a', onClick,
}: {
  href?: string
  label: string
  children: React.ReactNode
  as?: 'a' | 'button'
  onClick?: () => void
}) {
  const className =
    'w-14 h-14 inline-flex items-center justify-center text-muted hover:text-accent transition-colors'
  if (as === 'button') {
    return (
      <button onClick={onClick} aria-label={label} className={className}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={className}>
      {children}
    </a>
  )
}

export default Hero
