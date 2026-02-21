function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo">
          <span className="prefix">~/</span>andresl.dev
        </a>
        <ul className="nav-links">
          <li><a href="#about">about</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#experience">experience</a></li>
          <li><a href="#projects">projects</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
