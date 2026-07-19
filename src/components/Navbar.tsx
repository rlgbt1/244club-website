import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useT } from '../i18n'
import { asset } from '../utils/asset'

const FLAGS: Record<string, string> = {
  en: '/assets/United-kingdom_flag_icon_round.svg.png',
  pt: '/assets/flag-round-250.png',
}
const LANG_LABELS: Record<string, string> = {
  en: 'English',
  pt: 'Português',
}

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { lang, setLang } = useLang()
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setDrawerOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!langOpen) return
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [langOpen])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const links = [
    { to: '/',       label: t.nav.home },
    { to: '/about',  label: t.nav.about },
    { to: '/events', label: t.nav.events },
    { to: '/join',   label: t.nav.join },
  ]

  return (
    <header>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-wrap">
          <Link to="/" className="nav-logo">
            <img src={asset('/assets/logo.png')} alt="244 Club" className="nav-logo-img" />
          </Link>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={isActive(l.to) ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Language dropdown */}
          <div className="lang-dropdown" ref={langRef}>
            <button
              className="lang-trigger"
              onClick={() => setLangOpen(o => !o)}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <img src={asset(FLAGS[lang])} alt={LANG_LABELS[lang]} />
              <svg className={`lang-chevron${langOpen ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div className="lang-menu" role="listbox">
                {(['pt', 'en'] as const).map(l => (
                  <button
                    key={l}
                    className={`lang-option${lang === l ? ' selected' : ''}`}
                    role="option"
                    aria-selected={lang === l}
                    onClick={() => { setLang(l); setLangOpen(false) }}
                  >
                    <img src={asset(FLAGS[l])} alt="" />
                    <span>{LANG_LABELS[l]}</span>
                  </button>
                ))}
              </div>
            )}
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
    </header>
  )
}
