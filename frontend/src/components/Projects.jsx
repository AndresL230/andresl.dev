const projects = [
  {
    name: 'noogie',
    award: 'Best Design — PennApps XXVI',
    desc: 'News aggregation platform that uses NLP and clustering algorithms to group and summarize breaking news in real time.',
    tech: ['Python', 'React', 'Hugging Face', 'NLP'],
    url: null,
  },
  {
    name: 'Eyrie',
    award: 'Best Use of Cloudflare — HackHarvard',
    desc: 'Real-time crowd monitoring system designed to prevent crowd crush events using computer vision and density estimation.',
    tech: ['Python', 'Computer Vision', 'Cloudflare'],
    url: null,
  },
  {
    name: 'PointPath',
    award: 'Capital One Tech Summit',
    desc: 'Credit card rewards optimization platform that helps users maximize points across spending categories.',
    tech: ['React', 'Node.js', 'REST APIs'],
    url: 'https://github.com/AndresL230/PointPath',
  },
  {
    name: 'ETL Pipeline',
    award: null,
    desc: 'Financial data ETL system that extracts stock prices from the Alpha Vantage API, calculates financial metrics, and loads results into a TimescaleDB time-series database with a Streamlit dashboard.',
    tech: ['Python', 'TimescaleDB', 'Streamlit', 'Docker', 'SQLAlchemy'],
    url: 'https://github.com/AndresL230/etl-pipeline',
  },
  {
    name: 'Portfolio Insights',
    award: null,
    desc: 'Full-stack web app for tracking and analyzing stock portfolios with real-time performance metrics, interactive charts, sector allocation breakdowns, and AI-powered risk analysis.',
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
