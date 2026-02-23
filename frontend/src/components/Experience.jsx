const experience = [
  {
    role: 'Software Engineer · Part-time',
    company: 'Hack4Impact BU',
    date: 'Dec 2025 – Present',
    desc: 'Developing custom software solutions for nonprofit organizations as part of a student-run team dedicated to creating social impact through technology. Contributing to semester-long collaborative projects building web applications that address real-world challenges for underserved communities.',
  },
  {
    role: 'Hackathon Competitor',
    company: 'Major League Hacking',
    date: 'September 2025 - Present',
    desc: 'Built full-stack applications in small teams under 36-hour deadlines, splitting responsibilities across frontend, backend, and ML while picking up unfamiliar tools like NLP pipelines, vector search, computer vision, and WebRTC on the fly. Each hackathon forced rapid collaboration and scoping decisions that carried into future projects.',
  },
  {
    role: 'Data Analytics Intern',
    company: 'Kearny Bank',
    date: 'Summer 2025',
    desc: 'Supported the data analytics team by streamlining ETL pipelines, building executive dashboards, and helped enhancing database performance to improve reporting workflows across the organization.',
  },
]

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <p className="section-tag">experience</p>
        <h2 className="section-title">What I&apos;ve done.</h2>
        <div className="exp-list">
          {experience.map((e) => (
            <div className="exp-item" key={e.company}>
              <div className="exp-left">
                <p className="exp-role">{e.role}</p>
                <p className="exp-company">{e.company}</p>
                <p className="exp-date">{e.date}</p>
              </div>
              <p className="exp-desc">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
