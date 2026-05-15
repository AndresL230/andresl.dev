import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, GithubLogo, LinkedinLogo, At } from '@phosphor-icons/react'
import ContactModal from './ContactModal'
import HeroBackground from './HeroBackground'

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
      ? 'group inline-flex items-center gap-2 bg-accent text-accent-ink font-mono text-[0.78rem] tracking-[0.06em] uppercase px-5 py-3 hover:bg-accent/90 transition-colors'
      : 'group inline-flex items-center gap-2 text-text font-mono text-[0.78rem] tracking-[0.06em] uppercase px-5 py-3 hover:text-accent transition-colors'
  const inner = (
    <span className="inline-flex items-center gap-2">
      {children}
      <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

function Hero() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative min-h-[100dvh] pt-[64px] overflow-hidden" id="hero">
      <HeroBackground variant="scatter" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10 pt-14 lg:pt-28 pb-16">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display font-medium tracking-[-0.045em] leading-[0.92] text-balance text-text"
          style={{ fontSize: 'clamp(3.6rem, 11vw, 8.4rem)' }}
        >
          Andres Lopez<span className="text-accent">.</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 max-w-[760px]"
        >
          <p className="font-display text-text-dim leading-[1.35] text-balance"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)' }}>
            Sophomore at <span className="text-text">Boston University</span>, building <span className="text-text">developer tools</span> and <span className="text-text">edge infrastructure</span>. Right now I&apos;m shipping <a href="https://recost.dev" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 transition-opacity">Recost</a>, which tells engineering teams what their API calls actually cost in real time.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <CtaButton onClick={() => setContactOpen(true)}>get in touch</CtaButton>
          <span className="text-muted-2 mx-1">·</span>
          <CtaButton href="/work" variant="ghost">selected work</CtaButton>

          <div className="flex items-center gap-1 ml-1">
            <SocialIcon href="https://github.com/AndresL230" label="GitHub">
              <GithubLogo size={18} weight="duotone" />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/andres-lopez23/" label="LinkedIn">
              <LinkedinLogo size={18} weight="duotone" />
            </SocialIcon>
            <SocialIcon href="https://devpost.com/AndresL230" label="Devpost">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.446 0 3.851-1.348 3.851-3.875 0-2.676-1.405-3.839-3.851-3.839z" />
              </svg>
            </SocialIcon>
            <SocialIcon as="button" onClick={() => setContactOpen(true)} label="Email">
              <At size={18} weight="duotone" />
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
    'w-9 h-9 inline-flex items-center justify-center text-muted hover:text-accent transition-colors'
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
