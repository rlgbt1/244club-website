import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { asset } from '../utils/asset'

const CARD_IMAGES: (string | string[])[] = [
  asset('/assets/images/sipconnect1.jpg'),
  [
    asset('/assets/images/luisacarlos1.jpg'),
    asset('/assets/images/miguecarneiro1.jpg'),
    asset('/assets/images/miguecarneiro2.jpg'),
  ],
  asset('/assets/images/padel.jpg'),
  asset('/assets/images/firstevent.jpg'),
]

export default function EventsPage() {
  const t = useT()
  const e = t.events
  const [lightboxSrc, setLightboxSrc] = useState('')
  useScrollReveal()

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.gallery-item').forEach(item => {
      item.style.cursor = 'zoom-in'
    })
  }, [])

  const gallery = [
    '/assets/images/img-01.jpg', '/assets/images/img-02.jpg', '/assets/images/img-03.jpg',
    '/assets/images/img-05.jpg', '/assets/images/img-06.jpg', '/assets/images/img-07.jpg',
    '/assets/images/img-08.jpg', '/assets/images/img-09.jpg', '/assets/images/img-04.jpg',
  ].map(asset)

  return (
    <>
      <div className="page-hero reveal">
        <span className="label">{e.label}</span>
        <h1>{e.h1Lines[0]}<br />{e.h1Lines[1]}</h1>
        <p>{e.intro}</p>
      </div>

      <div className="events-page">
        <h2 className="sr-only">Event history</h2>

        <article className="ecard ecard-flagship reveal" style={{ marginBottom: '1rem' }}>
          <div className="ecard-flagship-img">
            <img src={asset('/assets/images/mckinsey1.jpg')} alt="McKinsey × 244 Club" loading="lazy" />
          </div>
          <div className="ecard-flagship-body">
            <div className="ecard-badge">Flagship</div>
            <div className="ecard-date">{e.flagship.date}</div>
            <h3>{e.flagship.title}</h3>
            <p>{e.flagship.desc}</p>
            <div className="ecard-tag pro flagship">{e.flagship.tag}</div>
          </div>
        </article>

        <div className="events-full-grid">
          {e.cards.map((card, i) => (
            <article key={i} className="ecard reveal">
              {Array.isArray(CARD_IMAGES[i]) ? (
                <div className="ecard-gallery">
                  {(CARD_IMAGES[i] as string[]).map((src, j) => (
                    <div key={j} className="ecard-gallery-item">
                      <img src={src} alt={card.title} loading="lazy" />
                    </div>
                  ))}
                </div>
              ) : CARD_IMAGES[i] ? (
                <div className="ecard-img">
                  <img src={CARD_IMAGES[i] as string} alt={card.title} loading="lazy" />
                </div>
              ) : null}
              <div className="ecard-date">{card.date}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className={`ecard-tag ${card.tagClass}`}>{card.tag}</div>
            </article>
          ))}

          <article className="ecard reveal" style={{ border: '2px solid var(--forest-light)', background: 'var(--sage-faint)' }}>
            <div className="ecard-date">{e.nextDate}</div>
            <h3 style={{ color: 'var(--forest)', fontWeight: 700 }}>{e.nextTitle}</h3>
            <p>{e.nextDesc}</p>
            <Link to="/join" style={{ fontSize: '.875rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--forest)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '.5rem', transition: 'gap .2s' }}>
              {e.nextLink}
            </Link>
          </article>
        </div>

        <div className="gallery-section" style={{ padding: '3rem 0 0' }} id="gallery">
          <span className="label">{e.galleryLabel}</span>
          <div className="gallery-grid reveal">
            {gallery.map((src, i) => (
              <div key={i} className="gallery-item" style={{ cursor: 'zoom-in' }} onClick={() => setLightboxSrc(src)}>
                <img src={src} alt="244 Club event" loading="lazy" />
              </div>
            ))}
            <div
              className="gallery-item"
              style={{ gridColumn: 'span 3', aspectRatio: '3/1', cursor: 'zoom-in' }}
              onClick={() => setLightboxSrc(asset('/assets/1.PNG'))}
            >
              <img src={asset('/assets/1.PNG')} alt="244 Club Padel Day" loading="lazy" style={{ objectPosition: 'center 40%' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div id="lightbox" className="open" onClick={() => setLightboxSrc('')} style={{ display: 'flex' }}>
          <button id="lightbox-close" aria-label="Close" onClick={() => setLightboxSrc('')}>&times;</button>
          <img src={lightboxSrc} alt="Enlarged photo" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
