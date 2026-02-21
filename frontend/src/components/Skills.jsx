const skills = [
  { category: 'Languages', tags: ['Python', 'JavaScript', 'TypeScript', 'Java'] },
  { category: 'Frontend',  tags: ['React', 'HTML', 'CSS'] },
  { category: 'Backend',   tags: ['Flask', 'Node.js'] },
  { category: 'Data',      tags: ['SQL', 'pandas', 'NumPy', 'Streamlit', 'TimescaleDB'] },
  { category: 'Tools',     tags: ['Docker', 'Git', 'SQLAlchemy'] },
  { category: 'AI / ML',   tags: ['Hugging Face', 'OpenCV', 'NLP'] },
]

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="section-tag">skills</p>
        <h2 className="section-title">What I work with.</h2>
        <div className="skills-list">
          {skills.map((s) => (
            <div className="skill-row" key={s.category}>
              <span className="skill-category">{s.category}</span>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
