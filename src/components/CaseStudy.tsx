import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft, ArrowRight, Trophy } from '@phosphor-icons/react'
import { getAdjacent, type Project } from '../data/projects'

type Props = {
  project: Project
  onClose?: () => void
}

export default function CaseStudy({ project: p }: Props) {
  const location = useLocation()
  const state = location.state as { background?: Location } | null
  const adjacent = getAdjacent(p.slug)

  return (
    <article className="text-text">
      <header className="relative pt-10 md:pt-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase text-text-dim mb-8">
              <span className="text-accent">{p.year}</span>
              <span className="w-3 h-px bg-line-strong" />
              <span>{p.role}</span>
              {p.award && (
                <>
                  <span className="w-3 h-px bg-line-strong" />
                  <span className="inline-flex items-center gap-1.5 text-accent/85">
                    <Trophy size={11} weight="fill" /> {p.award}
                  </span>
                </>
              )}
            </div>

            <h1
              className="font-display font-medium tracking-[-0.04em] leading-[0.9] text-balance"
              style={{ fontSize: 'clamp(3.4rem, 12vw, 9rem)' }}
            >
              {p.name}<span className="text-accent">.</span>
            </h1>

            <p className="mt-8 max-w-[760px] font-display text-text-dim leading-[1.35] text-balance"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)' }}>
              {p.tagline}
            </p>
          </motion.div>
        </div>
      </header>

      {p.cover && (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="mx-auto max-w-[1240px] px-6 md:px-10 pb-16 md:pb-24"
        >
          <div className="bg-surface border border-line p-3 md:p-6">
            <div className="border border-line-strong/40 overflow-hidden">
              <img
                src={p.cover}
                alt={`${p.name} interface`}
                className="block w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
            <span className="text-accent">fig. 01</span>
            <span className="w-3 h-px bg-line-strong" />
            <span>{p.name} · interface preview</span>
          </figcaption>
        </motion.figure>
      )}

      <section className="mx-auto max-w-[1240px] px-6 md:px-10 pb-16 md:pb-28 border-t border-line pt-16 md:pt-24">
        <div className="grid md:grid-cols-12 gap-y-16 md:gap-x-10">
          <FlowingBlock label="the problem" body={p.problem} />
          <FlowingBlock label="the solution" body={p.solution} />
        </div>

        <div className="mt-20 md:mt-28">
          <Label>how it works</Label>
          <ol className="mt-8 md:mt-10 max-w-[820px]">
            {p.deepDive.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                className="group grid grid-cols-[2.5rem_1fr] gap-5 py-7 border-t border-line last:border-b last:border-line"
              >
                <span className="font-mono text-accent text-[0.78rem] tracking-[0.14em] pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[1.02rem] md:text-[1.1rem] leading-[1.7] text-text-dim group-hover:text-text transition-colors">
                  {d}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {p.gallery && p.gallery.length > 0 && (
          <div className="mt-20 md:mt-28 flex flex-col gap-12 md:gap-16">
            {p.gallery.map((shot, i) => (
              <motion.figure
                key={shot.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <div className="bg-surface border border-line p-3 md:p-6">
                  <div className="border border-line-strong/40 overflow-hidden">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="block w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">fig. {String(i + 2).padStart(2, '0')}</span>
                  <span className="w-3 h-px bg-line-strong" />
                  <span>{shot.caption}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}

        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="md:col-span-4">
            <Label>built with</Label>
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.92rem] text-text-dim">
            {p.tech.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-muted-2">·</span>}
                <span className="hover:text-accent transition-colors">{t}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-x-8 gap-y-4">
          {p.live && <BigLink href={p.live}>visit live</BigLink>}
          {p.url && <BigLink href={p.url}>github</BigLink>}
          {p.devpost && <BigLink href={p.devpost}>devpost</BigLink>}
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 py-12 md:py-16 grid md:grid-cols-2 gap-8">
          <Link
            to={`/work/${adjacent.prev?.slug}`}
            state={state?.background ? { background: state.background } : undefined}
            className="group flex flex-col gap-2 md:gap-3 text-left"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">
              <ArrowLeft size={12} weight="bold" /> previous
            </span>
            <span className="font-display text-[1.6rem] md:text-[2rem] tracking-[-0.025em] font-medium text-text-dim group-hover:text-accent transition-colors">
              {adjacent.prev?.name}
            </span>
          </Link>
          <Link
            to={`/work/${adjacent.next?.slug}`}
            state={state?.background ? { background: state.background } : undefined}
            className="group flex flex-col gap-2 md:gap-3 md:text-right md:items-end"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">
              next <ArrowRight size={12} weight="bold" />
            </span>
            <span className="font-display text-[1.6rem] md:text-[2rem] tracking-[-0.025em] font-medium text-text-dim group-hover:text-accent transition-colors">
              {adjacent.next?.name}
            </span>
          </Link>
        </div>
      </footer>
    </article>
  )
}

function FlowingBlock({ label, body }: { label: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
      className="md:col-span-6 first:md:border-r first:md:border-line first:md:pr-10"
    >
      <Label>{label}</Label>
      <p className="mt-6 text-[1.15rem] md:text-[1.35rem] leading-[1.6] text-text-dim text-balance">
        {body}
      </p>
    </motion.div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-accent">
      <span className="text-muted-2 mr-1">/</span>
      {children}
    </span>
  )
}

function BigLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 font-display font-medium text-[1.4rem] md:text-[1.8rem] tracking-[-0.02em] text-text hover:text-accent transition-colors"
    >
      {children}
      <ArrowUpRight size={26} weight="light" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  )
}
