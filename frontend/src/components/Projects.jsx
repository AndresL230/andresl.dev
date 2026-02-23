const projects = [
  {
    name: 'noogie',
    award: 'Best Design — PennApps XXVI',
    desc: 'News aggregation platform that groups and summarizes breaking news in real time.',
    highlights: [
      'Hugging Face transformers generate semantic embeddings per article',
      'Unsupervised clustering groups related stories across sources into unified topics',
      'React frontend surfaces deduplicated threads, cutting through redundancy',
    ],
    tech: ['Python', 'React', 'Hugging Face', 'NLP'],
    url: 'https://github.com/ruslannnn2/noogie',
  },
  {
    name: 'Eyrie',
    award: 'Best Use of Cloudflare — HackHarvard',
    desc: 'Real-time crowd monitoring system designed to prevent crowd crush events.',
    highlights: [
      'CV models estimate per-zone crowd density from live camera feeds',
      'Crush-risk thresholds trigger instant alerts before dangerous densities form',
      'Cloudflare Workers handle edge processing with near-zero round-trip latency',
    ],
    tech: ['Python', 'Computer Vision', 'Cloudflare'],
    url: 'https://github.com/treehill05/eyrie',
  },
  {
    name: 'Sapling',
    award: 'Eduhack Track Winner — Civichacks 2026',
    desc: 'AI study companion with live knowledge graph visualization and adaptive quizzing.',
    highlights: [
      'FastAPI backend dynamically builds concept graphs persisted in SQLite',
      'D3.js renders a live, interactive knowledge graph as topics are explored',
      'OpenAI drives quizzing across Socratic, expository, and teachback modes',
    ],
    tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'D3.js', 'SQLite'],
    url: 'https://github.com/Jose-Gael-Cruz-Lopez/sapling',
  },
  {
    name: 'ETL Pipeline',
    award: null,
    desc: 'Automated financial data pipeline from API ingestion to time-series storage.',
    highlights: [
      'Polls Alpha Vantage for OHLCV data; computes rolling MA and volatility metrics',
      'Bulk-loads into TimescaleDB hypertables optimized for time-series queries',
      'Containerized with Docker Compose; SQLAlchemy manages schema and ORM ops',
    ],
    tech: ['Python', 'TimescaleDB', 'Streamlit', 'Docker', 'SQLAlchemy'],
    url: 'https://github.com/AndresL230/etl-pipeline',
  },
  {
    name: 'Portfolio Insights',
    award: null,
    desc: 'Full-stack app for tracking and analyzing stock portfolios with AI risk analysis.',
    highlights: [
      'Flask API computes real-time P&L, returns, and sector allocation per holding',
      'AI pass analyzes portfolio composition to surface concentration and volatility risks',
      'React frontend renders interactive performance charts and allocation breakdowns',
    ],
    tech: ['React', 'Flask', 'Python', 'Alpha Vantage API'],
    url: 'https://github.com/AndresL230/portfolio-insights',
  },
]

function ProjectCard({ project: p }) {
  return (
    <div className="project-card">
      <h3 className="project-name">
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="project-name-link"
          >
            {p.name} <span className="project-arrow">↗</span>
          </a>
        ) : (
          p.name
        )}
      </h3>
      {p.award && <span className="project-award">{p.award}</span>}
      <p className="project-desc">{p.desc}</p>
      {p.highlights && (
        <ul className="project-highlights">
          {p.highlights.map((h) => (
            <li key={h} className="project-highlight-item">{h}</li>
          ))}
        </ul>
      )}
      <div className="project-tech">
        {p.tech.map((t) => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const row1 = projects.slice(0, 3)
  const row2 = projects.slice(3)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <p className="section-tag">projects</p>
        <h2 className="section-title">Things I&apos;ve built.</h2>
        <div className="projects-grid">
          <div className="projects-row">
            {row1.map((p) => <ProjectCard key={p.name} project={p} />)}
          </div>
          <div className="projects-row projects-row--center">
            {row2.map((p) => <ProjectCard key={p.name} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
