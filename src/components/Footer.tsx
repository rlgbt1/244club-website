import { Link } from 'react-router-dom'
import logoSrc from '/logo.jpeg?url'

export default function Footer() {
  return (
    <>
      <div className="flag-stripe">
        <div className="flag-stripe-red" />
        <div className="flag-stripe-black" />
      </div>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logoSrc} alt="244 Club" />
            <span>244 CLUB</span>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/events">Events</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://www.instagram.com/244clubuk/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} 244 Club — Angolan Students in the UK. Est. 2025.
          </p>
        </div>
      </footer>
    </>
  )
}
