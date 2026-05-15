import { motion } from 'framer-motion'

function About() {
  return (
    <section id="about" className="relative py-28 md:py-44 border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
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
              Right now I&apos;m building <span className="text-text">Recost</span>, an API
              cost intelligence platform on Cloudflare Workers. Python and Node SDKs hook
              your outbound HTTP calls, a VS Code extension reads your code statically for
              cost patterns, and an MCP server hands the whole thing to AI agents. The rest
              of the week goes to backend at <span className="text-text">Hack4Impact BU</span>,
              an <span className="text-text">ML Foundations fellowship</span> at Cornell Tech
              through Break Through Tech, and whatever new tool I can break in a weekend.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            <span className="md:col-span-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted pt-2">
              <span className="text-accent">/</span> the hackathons
            </span>
            <p className="md:col-span-9 text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim max-w-[680px]">
              Four wins so far: <span className="text-text">PennApps XXVI</span> (Best
              Design), <span className="text-text">HackHarvard &apos;25</span> (Best Use of
              Cloudflare), <span className="text-text">HackIllinois 2026</span> (Stripe Best
              Web API), and <span className="text-text">CivicHacks BU &apos;26</span> (AI
              Tutor Track). Most recently I shipped <span className="text-text">Calyx</span>
              {' '}at LA Hacks 2026. Something about a 36-hour clock and three strangers in a
              basement out of coffee brings out the best work.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-12 gap-y-8 md:gap-x-12 items-start">
            <span className="md:col-span-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted pt-2">
              <span className="text-accent">/</span> the rest
            </span>
            <p className="md:col-span-9 text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-text-dim max-w-[680px]">
              <span className="text-text">Eagle Scout</span>, Dean&apos;s List,{' '}
              <span className="text-text">HSF Scholar</span>,{' '}
              <span className="text-text">MLT Career Prep</span>, SEO Edge, plus an AI/ML
              fellowship at Cornell Tech through Break Through Tech. Outside the editor:
              fragrance, cooking, music, gaming, and the occasional argument about whether
              type systems are worth it (they are).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
