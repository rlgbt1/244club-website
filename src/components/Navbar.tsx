import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useT } from '../i18n'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { lang, setLang } = useLang()
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [location.pathname])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const links = [
    { to: '/',       label: t.nav.home },
    { to: '/about',  label: t.nav.about },
    { to: '/events', label: t.nav.events },
    { to: '/join',   label: t.nav.join },
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-wrap">
          <Link to="/" className="nav-logo">
            <img src="/assets/logo.png" alt="244 Club" className="nav-logo-img" />
          </Link>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={isActive(l.to) ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              className={`lang-btn${lang === 'en' ? ' lang-active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="English"
              title="English"
            >
              <img src="/assets/United-kingdom_flag_icon_round.svg.png" alt="UK flag" />
            </button>
            <button
              className={`lang-btn${lang === 'pt' ? ' lang-active' : ''}`}
              onClick={() => setLang('pt')}
              aria-label="Português"
              title="Português"
            >
              <img src="/assets/flag-round-250.png" alt="Portugal flag" />
            </button>
          </div>

          <Link to="/join" className="nav-cta">{t.nav.cta}</Link>

          <button
            className={`hamburger${drawerOpen ? ' open' : ''}`}
            onClick={() => setDrawerOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={drawerOpen}
          >
            <span /><span />
          </button>
        </div>

        <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`} aria-hidden={!drawerOpen}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setDrawerOpen(false)}>{l.label}</Link>
          ))}
          <Link to="/join" className="drawer-cta" onClick={() => setDrawerOpen(false)}>
            {t.nav.cta} →
          </Link>
        </div>
      </nav>
    </>
  )
}
