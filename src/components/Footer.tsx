import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { asset } from '../utils/asset'

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)
const LiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const TkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
  </svg>
)

export default function Footer() {
  const t = useT()
  const lines = t.footer.tagline.split('\n')

  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={asset('/assets/WhiteLogo.png')} alt="244 Club" className="footer-logo-img" />
          </div>
          <p>{lines[0]}<br/>{lines[1]}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/_club244/" target="_blank" rel="noopener" aria-label="Instagram"><IgIcon /></a>
            <a href="https://www.linkedin.com/company/244club/?viewAsMember=true" target="_blank" rel="noopener" aria-label="LinkedIn"><LiIcon /></a>
            <a href="https://www.tiktok.com/@244.club" target="_blank" rel="noopener" aria-label="TikTok"><TkIcon /></a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h5>{t.footer.nav}</h5>
            <Link to="/">{t.nav.home}</Link>
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/events">{t.nav.events}</Link>
            <Link to="/join">{t.nav.join}</Link>
          </div>
          <div>
            <h5>{t.footer.connect}</h5>
            <a href="mailto:club244ao@gmail.com">club244ao@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.footer.copy}</span>
        <span className="footer-code">+244</span>
      </div>
    </footer>
  )
}
