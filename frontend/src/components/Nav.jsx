import { useState } from 'react'

function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" onClick={close}>
          <span className="prefix">~/</span>andresl.dev
        </a>
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links${open ? ' nav-links--open' : ''}`}>
          <li><a href="#about" onClick={close}>about</a></li>
          <li><a href="#skills" onClick={close}>skills</a></li>
          <li><a href="#experience" onClick={close}>experience</a></li>
          <li><a href="#projects" onClick={close}>projects</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
