import { motion } from 'framer-motion'

type SkillGroup = {
  category: string
  hint: string
  tags: string[]
}

const skills: SkillGroup[] = [
  { category: 'Languages', hint: 'daily drivers',     tags: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'SQL', 'HTML', 'CSS'] },
  { category: 'Frontend',  hint: 'pixels & state',    tags: ['React', 'Next.js', 'Vite', 'D3.js', 'Chart.js', 'Tailwind CSS'] },
  { category: 'Backend',   hint: 'apis & services',   tags: ['Hono', 'FastAPI', 'Flask', 'Node.js', 'RESTful APIs', 'WebRTC', 'Tree-sitter'] },
  { category: 'Edge / Cloud', hint: 'where it runs',  tags: ['Cloudflare Workers', 'D1', 'KV', 'Durable Objects', 'Cloudflare Pages', 'Supabase'] },
  { category: 'Data',      hint: 'pipelines & store', tags: ['Pandas', 'PostgreSQL', 'Apache Airflow', 'Docker', 'Power BI'] },
  { category: 'AI / ML',   hint: 'models & vectors',  tags: ['PyTorch', 'Google Gemini', 'YOLOv8', 'OpenCV', 'FAISS', 'NLP'] },
]

function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-44 border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="font-mono text-accent text-[0.7rem] tracking-[0.22em] uppercase">03</span>
          <span className="w-8 h-px bg-line-strong" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted">stack</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-display font-medium tracking-[-0.025em] leading-[1.05] text-text mb-4 max-w-[860px]"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 3.4rem)' }}
        >
          The toolbox<span className="text-accent">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-text-dim text-[1.05rem] leading-[1.7] max-w-[620px] mb-16 md:mb-20"
        >
          Languages, frameworks, and tools I reach for when something needs to ship.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
              className="group relative bg-bg p-6 md:p-7 flex flex-col gap-4 hover:bg-surface transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-text text-[1.05rem] tracking-[-0.01em] font-medium">
                  {s.category}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  {s.hint}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.68rem] tracking-[0.04em] text-text-dim border border-line px-2 py-0.5 group-hover:border-line-strong transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="absolute top-3 right-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
