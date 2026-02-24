import { useState } from 'react'
import ContactModal from './ContactModal'

function Footer() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <a
            href="https://github.com/AndresL230"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/andres-lopez23/"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            linkedin
          </a>
          <a
            href="https://devpost.com/AndresL230"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            devpost
          </a>
          <button
            className="footer-link"
            onClick={() => setContactOpen(true)}
          >
            email
          </button>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Andres Lopez</p>
      </div>
    </footer>

    {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  )
}

export default Footer
