import { useEffect } from 'react'
import { useT } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function JoinPage() {
  const t = useT()
  const j = t.join
  useScrollReveal()

  // Load Tally embed script
  useEffect(() => {
    const w = 'https://tally.so/widgets/embed.js'
    if ((window as any).Tally) {
      (window as any).Tally.loadEmbeds()
    } else if (!document.querySelector(`script[src="${w}"]`)) {
      const s = document.createElement('script')
      s.src = w
      s.onload = () => (window as any).Tally?.loadEmbeds()
      document.body.appendChild(s)
    }
  }, [])

  return (
    <>
      <div className="page-hero reveal">
        <span className="label">{j.label}</span>
        <h1>{j.h1}<br /><em>{j.h1em}</em></h1>
        <p>{j.p1}</p>
        <p style={{ marginTop: '.75rem', fontSize: '.9rem', color: 'var(--muted)' }}>
          {j.p2pre} <span className="uk-tag">{j.p2uk}</span> {j.p2post}
        </p>
      </div>

      <div className="join-page">

        <div className="who-section reveal">
          <span className="label">{j.whoLabel}</span>
          <h3>{j.whoH3}</h3>
          <div className="who-grid">
            {j.who.map(item => (
              <div key={item.title} className="who-item">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }} className="reveal">
          {j.benefits.map(b => (
            <div key={b.num} style={{ background: 'var(--white)', border: '1px solid var(--stone)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--stone)', marginBottom: '.5rem' }}>{b.num}</div>
              <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '.9rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '.3rem' }}>{b.title}</strong>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{b.text}</p>
            </div>
          ))}
        </div>

        <div className="form-card reveal">
          <span className="label">{j.formLabel}</span>
          <h2>{j.formH2}</h2>
          <p className="sub">{j.formP}</p>
          <iframe
            data-tally-src="https://tally.so/embed/PdEBD0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="1400"
            frameBorder={0}
            title="244 Club Sign-Up Form"
            style={{ border: 'none', display: 'block' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }} className="reveal">
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone)', borderRadius: '16px', padding: '1.5rem', gridColumn: '1/-1' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--hint)', marginBottom: '.5rem' }}>{j.contactLabel}</p>
            <a href="mailto:club244ao@gmail.com" style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 500, color: 'var(--forest)' }}>club244ao@gmail.com</a>
          </div>
        </div>

      </div>
    </>
  )
}
