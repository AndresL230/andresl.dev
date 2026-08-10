import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const hackathons = [
  { event: 'PennApps XXVI', award: 'Best Design', project: 'noogie', slug: 'noogie' },
  { event: "HackHarvard '25", award: 'Best Use of Cloudflare', project: 'Eyrie', slug: 'eyrie' },
  { event: 'HackIllinois 2026', award: "Stripe's Best Web API", project: 'Recost', slug: 'recost' },
  { event: "CivicHacks BU '26", award: 'the AI Tutor track', project: 'Sapling', slug: 'sapling' },
  { event: 'LA Hacks 2026', award: null, project: 'Calyx', slug: 'calyx' },
]

function About() {
  const location = useLocation()
  return (
    <section className="relative py-28 md:py-44 border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">01</span>
          <span className="w-8 h-px bg-line-strong" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">about</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-[920px]"
        >
          <p
            className="font-display text-text leading-[1.25] tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.9rem)' }}
          >
            Sophomore at <span className="text-accent">Boston University</span>, CS,
            class of 2028. Started in business, got into code at hackathons, kept
            building.
          </p>

          <div className="mt-16 grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            <span className="md:col-span-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted pt-2">
              <span className="text-accent">/</span> the work
            </span>
            <p className="md:col-span-9 text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim max-w-[680px]">
              Right now I&apos;m building payments and document-intelligence infra at{' '}
              <span className="text-text">Grove Tax</span>, an a16z Speedrun-backed tax
              startup. Before that I co-founded <span className="text-text">Recost</span> — API
              cost intelligence on Cloudflare Workers, from SDK hooks to a VS Code extension
              to an MCP server. The rest of the week goes to backend at{' '}
              <span className="text-text">Hack4Impact BU</span> and whatever new tool I can
              break in a weekend.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            <span className="md:col-span-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted pt-2">
              <span className="text-accent">/</span> the hackathons
            </span>
            <ul className="md:col-span-9 max-w-[680px] text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim">
              {hackathons.map((h) => (
                <li key={h.slug} className="flex gap-3">
                  <span className="text-muted-2 select-none" aria-hidden="true">—</span>
                  <span>
                    Built{' '}
                    <Link
                      to={`/work/${h.slug}`}
                      state={{ background: location }}
                      className="text-accent border-b border-accent/40 hover:text-text hover:border-line-strong transition-colors"
                    >
                      {h.project}
                    </Link>{' '}
                    at {h.event}
                    {h.award && (
                      <>
                        {' '}&mdash; and won <span className="text-text">{h.award}</span>
                      </>
                    )}
                    .
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            <span className="md:col-span-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted pt-2">
              <span className="text-accent">/</span> the rest
            </span>
            <p className="md:col-span-9 text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim max-w-[680px]">
              <span className="text-text">Eagle Scout</span>, Dean&apos;s List,{' '}
              <span className="text-text">HSF Scholar</span>,{' '}
              <span className="text-text">MLT Career Prep</span>, SEO Edge, plus an AI/ML
              fellowship at Cornell Tech through Break Through Tech.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
