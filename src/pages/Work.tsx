import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy } from '@phosphor-icons/react'
import { projects } from '../data/projects'

export default function Work() {
  const location = useLocation()

  return (
    <section className="pt-[110px] pb-32 md:pb-40">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">/ work</span>
          <span className="w-8 h-px bg-line-strong" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">
            {projects.length} projects · 2025 / 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-display font-medium tracking-[-0.04em] leading-[0.92] text-text text-balance max-w-[1080px]"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          Every project here started because something didn&apos;t exist yet<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-10 max-w-[680px] text-[1.1rem] md:text-[1.2rem] leading-[1.7] text-text-dim"
        >
          Below is a chronological cross-section: hackathon entries that
          actually got built and judged, plus a couple of personal experiments
          that turned into something real. Click any one for the full breakdown.
        </motion.p>

        <div className="mt-20 md:mt-28 flex flex-col gap-20 md:gap-32">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <Link
                to={`/work/${p.slug}`}
                state={{ background: location }}
                className="md:col-span-7 group block relative overflow-hidden border border-line"
              >
                <div className="aspect-[4/3] md:aspect-[16/10] relative">
                  {p.cover ? (
                    <>
                      <img
                        src={p.cover}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent opacity-60" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-surface flex items-center justify-center px-8 md:px-14">
                      <div className="text-center">
                        <span className="block font-mono text-[0.6rem] tracking-[0.22em] uppercase text-muted mb-5">
                          // project
                        </span>
                        <span
                          className="block font-display font-medium tracking-[-0.035em] leading-[0.95] text-text text-balance group-hover:text-accent transition-colors"
                          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)' }}
                        >
                          {p.name}<span className="text-accent">.</span>
                        </span>
                        <span className="mt-5 block font-mono text-[0.66rem] tracking-[0.2em] uppercase text-accent/80">
                          {p.year} · {p.role}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-text bg-bg/60 backdrop-blur-sm px-2 py-1">
                    {String(i + 1).padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                  </div>
                </div>
              </Link>

              <div className="md:col-span-5 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">{p.year}</span>
                  <span className="w-3 h-px bg-line-strong" />
                  <span>{p.role}</span>
                </div>

                <Link
                  to={`/work/${p.slug}`}
                  state={{ background: location }}
                  className="group"
                >
                  <h2
                    className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-text group-hover:text-accent transition-colors"
                    style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
                  >
                    {p.name}
                  </h2>
                </Link>

                {p.award && (
                  <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent/85">
                    <Trophy size={12} weight="fill" /> {p.award}
                  </span>
                )}

                <p className="font-display text-text-dim leading-[1.4] text-balance text-[1.15rem] md:text-[1.3rem]">
                  {p.tagline}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted mt-1">
                  {p.tech.slice(0, 6).map((t, k) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      {k > 0 && <span className="text-muted-2">·</span>}
                      <span>{t}</span>
                    </span>
                  ))}
                  {p.tech.length > 6 && <span className="text-muted-2">· +{p.tech.length - 6} more</span>}
                </div>

                <Link
                  to={`/work/${p.slug}`}
                  state={{ background: location }}
                  className="mt-3 group inline-flex items-center gap-2 self-start font-mono text-[0.78rem] tracking-[0.1em] uppercase text-accent hover:text-text transition-colors"
                >
                  read more
                  <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
