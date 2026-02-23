const skills = [
  { category: 'Languages', tags: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'] },
  { category: 'Frontend',  tags: ['React', 'Next.js', 'D3.js', 'Tailwind CSS', 'HTML', 'CSS'] },
  { category: 'Backend',   tags: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'] },
  { category: 'Data',      tags: ['Pandas', 'NumPy', 'SQLite', 'Supabase', 'MySQL', 'Power BI'] },
  { category: 'AI / ML',   tags: ['OpenAI', 'Google Gemini', 'YOLOv8', 'FAISS', 'OpenCV', 'PyTorch', 'Sentence Transformers', 'NLP'] },
  { category: 'Tools',     tags: ['Git', 'Docker', 'WebRTC', 'Jupyter'] },
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
