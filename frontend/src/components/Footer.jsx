function Footer() {
  return (
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
          <a
            href="mailto:andreslopez.23061@gmail.com"
            className="footer-link"
          >
            email
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Andres Lopez</p>
      </div>
    </footer>
  )
}

export default Footer
