import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Trophy } from '@phosphor-icons/react'
import { getProject, type Project } from '@/data/projects'

const featuredSlugs = ['recost', 'sapling'] as const

function SelectedWork() {
  const featured = featuredSlugs
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p))

  return (
    <section className="relative py-28 md:py-44 border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">04</span>
          <span className="w-8 h-px bg-line-strong" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">now building</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-display font-medium tracking-[-0.025em] leading-[1.05] text-text mb-4 max-w-[860px]"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 3.4rem)' }}
        >
          Things I&apos;m building<span className="text-accent">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-text-dim text-[1.05rem] leading-[1.7] max-w-[620px] mb-16 md:mb-20"
        >
          Two things actively in flight right now. The rest of the archive lives on its own page.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {featured.map((p, i) => (
            <FeatureCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-20 md:mt-24"
        >
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 font-display font-medium tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}
          >
            <span className="border-b border-line-strong group-hover:border-accent group-hover:text-accent transition-colors">
              see the full archive
            </span>
            <ArrowUpRight size={26} weight="light" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ project: p, index }: { project: Project; index: number }) {
  const location = useLocation()
  const linkState = { background: location }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative flex flex-col"
    >
      <div className="flex items-center justify-between mb-5 font-mono text-[0.66rem] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-2">
          <span className="relative inline-flex items-center justify-center w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-accent/40 breathe" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-text-dim">in build</span>
        </span>
        <span className="text-muted">{String(index + 1).padStart(2, '0')} / {String(2).padStart(2, '0')}</span>
      </div>

      <Link
        to={`/work/${p.slug}`}
        state={linkState}
        className="relative block overflow-hidden border border-line bg-surface"
      >
        <div className="aspect-[16/10] relative">
          {p.cover && (
            <img
              src={p.cover}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
        </div>
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        <Link to={`/work/${p.slug}`} state={linkState} className="block">
          <h3
            className="font-display font-medium tracking-[-0.035em] leading-[0.95] text-text group-hover:text-accent transition-colors"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)' }}
          >
            {p.name}<span className="text-accent">.</span>
          </h3>
        </Link>

        {p.award && (
          <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent/85">
            <Trophy size={11} weight="fill" /> {p.award}
          </span>
        )}

        <p className="font-display text-text-dim leading-[1.4] text-balance text-[1.1rem] md:text-[1.2rem]">
          {p.tagline}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted mt-1">
          {p.tech.slice(0, 5).map((t, k) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              {k > 0 && <span className="text-muted-2">·</span>}
              <span>{t}</span>
            </span>
          ))}
          {p.tech.length > 5 && <span className="text-muted-2">· +{p.tech.length - 5}</span>}
        </div>

        <Link
          to={`/work/${p.slug}`}
          state={linkState}
          className="mt-3 inline-flex items-center gap-2 self-start font-mono text-[0.74rem] tracking-[0.1em] uppercase text-accent hover:text-text transition-colors"
        >
          open the project
          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}

export default SelectedWork
