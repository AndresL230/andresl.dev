import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'

type ExperienceItem = {
  role: string
  company: string
  date: string
  dateShort: string
  location: string
  desc: string
  highlights: string[]
  stack: string[]
}

const experience: ExperienceItem[] = [
  {
    role: 'Co-Founder & Software Engineer',
    company: 'Recost',
    date: 'Feb 2026 / Present',
    dateShort: 'ongoing',
    location: 'Hybrid',
    desc: 'Co-founding an API cost intelligence platform with a 3-person team. Architected the serverless backend, the VS Code extension, and the runtime SDKs end-to-end.',
    highlights: [
      'designed 30+ REST endpoints on Cloudflare Workers with Hono and D1, Google OAuth, KV-based rate limiting',
      'built VS Code extension with web-tree-sitter to detect N+1 hotspots, batch/cache opportunities, cross-file origins',
      'shipped Node.js + Python SDKs that intercept outbound HTTP across 8+ providers with Express, FastAPI, Flask middleware',
      'wired up MCP server on Durable Objects and a React dashboard surfacing cost + latency telemetry per call',
    ],
    stack: ['Cloudflare Workers', 'Hono', 'D1', 'Durable Objects', 'KV', 'React', 'Tree-sitter', 'Node.js', 'Python'],
  },
  {
    role: 'AI / ML Fellow',
    company: 'Break Through Tech · Cornell Tech',
    date: 'Mar 2026 / Present',
    dateShort: 'ongoing',
    location: 'Hybrid',
    desc: 'Completing a 9-week ML Foundations course toward a machine learning certificate from Cornell, plus a team-based industry challenge applying ML to a real business problem with mentorship from industry professionals.',
    highlights: [
      'building supervised and unsupervised models with full evaluation pipelines on real-world datasets',
      'iterating on data preprocessing, feature engineering, and model selection in the team challenge',
      'targeting the Cornell ML certificate at the end of the program',
    ],
    stack: ['Python', 'PyTorch', 'Pandas', 'scikit-learn'],
  },
  {
    role: 'Software Engineer',
    company: 'Hack4Impact at BU',
    date: 'Dec 2025 / Present',
    dateShort: 'ongoing',
    location: 'Boston, MA',
    desc: 'Writing backend systems for local nonprofits on a student-run team. Semester-long projects where the brief is real and the people on the other end of it are real too.',
    highlights: [
      'engineered 15+ Flask REST endpoints with input validation and full error handling',
      'architected 5+ Supabase schemas with FK relationships for 2 nonprofits serving 250+ community members',
      'led backend across 10+ features in a 6-person agile team: API architecture, DB optimization, integration testing',
    ],
    stack: ['Flask', 'Supabase', 'Python', 'Git'],
  },
  {
    role: 'Data Analytics Intern',
    company: 'Kearny Bank',
    date: 'Jun / Aug 2025',
    dateShort: "summer '25",
    location: 'Fairfield, NJ',
    desc: 'Optimized ETL pipelines, built executive dashboards, and instrumented database monitoring so the reporting workflows the org actually relied on stopped being a bottleneck.',
    highlights: [
      'analyzed 5+ years of historical banking data to optimize 8 ETL pipelines, cutting org-wide query times by 15%',
      'built 5 Power BI dashboards used weekly by 20+ stakeholders to track ETL performance',
      'shipped automated Python scripts for database monitoring and validation across multiple banking DBs',
    ],
    stack: ['Python', 'SQL', 'Power BI'],
  },
]

function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-44 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">02</span>
          <span className="w-8 h-px bg-line-strong" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">experience</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-display font-medium tracking-[-0.025em] leading-[1.05] text-text mb-4 max-w-[860px]"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 3.4rem)' }}
        >
          Some places I&apos;ve put in time<span className="text-accent">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-text-dim text-[1.05rem] leading-[1.7] max-w-[620px] mb-24 md:mb-32"
        >
          A working résumé in chapters, not bullet points.
        </motion.p>

        <div className="flex flex-col gap-32 md:gap-48">
          {experience.map((e, i) => (
            <Chapter key={e.company} item={e} index={i} flipped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({ item, index, flipped }: { item: ExperienceItem; index: number; flipped: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative"
    >
      <div
        className={`relative grid md:grid-cols-12 gap-y-10 md:gap-x-12 ${
          flipped ? 'md:[&>div:nth-child(1)]:order-2' : ''
        }`}
      >
        <div className={`md:col-span-7 ${flipped ? 'md:col-start-6' : ''}`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] mb-7">
            <span className="text-accent">ch. {String(index + 1).padStart(2, '0')}</span>
            <span className="w-3 h-px bg-line-strong" />
            <span className="text-text-dim">{item.date}</span>
            <span className="w-3 h-px bg-line-strong" />
            <span className="text-muted">{item.location}</span>
          </div>

          <h3
            className="font-display font-medium tracking-[-0.04em] leading-[0.94] text-balance text-text"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}
          >
            {item.role}
            <span className="text-muted-2"> @</span>
            <br />
            <span className="text-accent">{item.company}</span>
            <span className="text-muted-2">.</span>
          </h3>

          <p className="mt-9 text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim max-w-[620px]">
            {item.desc}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-muted">
            {item.stack.map((t, k) => (
              <span key={t} className="inline-flex items-center gap-2">
                {k > 0 && <span className="text-muted-2">·</span>}
                <span className="hover:text-accent transition-colors">{t}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`md:col-span-5 ${flipped ? 'md:col-start-1 md:row-start-1' : 'md:col-start-8'}`}>
          <div className="font-mono text-[0.72rem] tracking-[0.24em] uppercase text-muted mb-7 flex items-center gap-2.5">
            <span className="text-accent/85">/</span>
            <span>while there</span>
            <span className="flex-1 h-px bg-line ml-2" />
          </div>
          <ul className="flex flex-col gap-5">
            {item.highlights.map((h, j) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: flipped ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.08 * j, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid grid-cols-[1.5rem_1fr] gap-4 items-start font-mono text-[1rem] md:text-[1.05rem] leading-[1.65] text-text-dim"
              >
                <ArrowRight size={15} weight="bold" className="text-accent mt-1.5" />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 inline-flex items-baseline gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted">
            <span className="text-text font-display font-medium tracking-[-0.02em] text-[2.6rem] md:text-[3rem] leading-none">
              {item.dateShort}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default Experience
