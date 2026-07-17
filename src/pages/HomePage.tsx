import { Link } from 'react-router-dom'
import { type PointerEvent as ReactPointerEvent } from 'react'
import { useT } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useOrbitScroll } from '../hooks/useOrbitScroll'
import { asset } from '../utils/asset'
import { ConnectionGlobe } from '../components/ConnectionGlobe'
import { ContainerTextFlip } from '../components/ContainerTextFlip'

export default function HomePage() {
  const t = useT()
  const h = t.home
  useScrollReveal()
  useOrbitScroll()

  const HOME_CARD_IMAGES: (string | string[])[] = [
    asset('/assets/images/mckinsey1.jpg'),
    asset('/assets/images/sipconnect1.jpg'),
    asset('/assets/images/miguecarneiro1.jpg'),
    asset('/assets/images/padel.jpg'),
    asset('/assets/images/firstevent.jpg'),
  ]

  const marqueeItems = h.marquee.flatMap((item, i) => [
    <span key={`i${i}`}>{item}</span>,
    <span key={`d${i}`} className="dot">&middot;</span>,
  ])

  const handleCardGlare = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--glare-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    card.style.setProperty('--glare-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
    card.style.setProperty('--glare-opacity', '1')
  }

  const clearCardGlare = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--glare-opacity', '0')
  }

  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-group">
          <div className="orbs-ring" id="orbsRing" aria-hidden="true">
            <div className="orb orb-logo"><div className="orb-content"><img src={asset('/assets/logo.png')} alt="244 Club" loading="eager"/></div></div>
            <div className="orb orb-1"><div className="orb-content"><img src={asset('/assets/images/img-01.jpg')} alt="" loading="eager"/></div></div>
            <div className="orb orb-2"><div className="orb-content"><img src={asset('/assets/mckinseyimg2.png')} alt="" loading="eager" style={{objectPosition:'center center'}}/></div></div>
            <div className="orb orb-3"><div className="orb-content"><img src={asset('/assets/images/img-06.jpg')} alt="" loading="lazy"/></div></div>
            <div className="orb orb-4"><div className="orb-content"><img src={asset('/assets/images/img-04.jpg')} alt="" loading="lazy"/></div></div>
          </div>
          <div className="hero-center">
            <h1 className="hero-headline">
              {h.heroLines[0]}<br/>{h.heroLines[1]}<br/><em>{h.heroLines[2]}</em>
            </h1>
          </div>
        </div>
        <div className="hero-text-below">
          <p className="hero-sub">
            {h.heroSub.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
            ))}
          </p>
          <div className="hero-actions">
            <Link to="/join" className="btn btn-primary">{h.cta1}</Link>
            <Link to="/events" className="btn btn-outline">{h.cta2}</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-inner">
          <div className="marquee-copy">{marqueeItems}</div>
          <div className="marquee-copy" aria-hidden="true">{marqueeItems}</div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-wrap">
          {h.statsNums.map((num, i) => (
            <>
              {i > 0 && <div key={`div${i}`} className="stat-divider" />}
              <div key={num} className="stat-item">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{h.statsLabels[i]}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* WHAT IS 244 */}
      <section className="what-section" id="what">
        <div className="what-wrap">
          <div className="what-left reveal">
            <span className="label">{h.whatLabel}</span>
            <h2>
              {h.whatH2pre}<br/>
              {h.whatH2mid}{' '}
              <span style={{color:'var(--angola-red)'}}>{h.whatDialling}</span>{' '}
              <span style={{color:'var(--angola-gold)'}}>{h.whatCode}</span>
            </h2>
            <p>{h.whatP1}</p>
            <p>{h.whatP2}</p>
            <Link to="/about" className="link-arrow">{h.whatLink}</Link>
          </div>
          <div className="what-right reveal">
            <div className="pillar-block pillar-social">
              <div className="pillar-num">{h.pillar1Num}</div>
              <h3>{h.pillar1Title}</h3>
              <p>{h.pillar1Text}</p>
            </div>
            <div className="pillar-block pillar-pro">
              <div className="pillar-num">{h.pillar2Num}</div>
              <h3>{h.pillar2Title}</h3>
              <p>{h.pillar2Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIASPORA CONNECTION */}
      <section className="connection-section">
        <div className="connection-wrap">
          <div className="connection-copy reveal">
            <span className="label">{h.connectionLabel}</span>
            <h2>{h.connectionH2[0]} <em>{h.connectionH2[1]}</em></h2>
            <p>{h.connectionP}</p>
            <Link to="/join" className="link-arrow connection-link">{h.connectionLink}</Link>
          </div>
          <div className="connection-globe reveal">
            <ConnectionGlobe />
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="events-section" id="events-preview">
        <div className="events-wrap">
          <div className="events-header reveal">
            <span className="label">{h.eventsLabel}</span>
            <h2>
              {h.eventsH2a}{' '}
              <span className="events-room-word">{h.eventsH2room}</span>
              <br/>{h.eventsH2b}{' '}<ContainerTextFlip words={h.eventsFlipWords} />
            </h2>
          </div>
          <div className="event-cards">
            {h.cards.map((card, i) => (
              <article
                key={i}
                className={`ecard glare-card${card.flagship ? ' ecard-flagship' : ''} reveal`}
                onPointerMove={handleCardGlare}
                onPointerLeave={clearCardGlare}
              >
                {card.flagship ? (
                  <>
                    <div className="ecard-flagship-img">
                      <img src={HOME_CARD_IMAGES[i] as string} alt={card.title} loading="lazy" />
                    </div>
                    <div className="ecard-flagship-body">
                      <div className="ecard-badge">Flagship</div>
                      <div className="ecard-date">{card.date}</div>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                      <div className={`ecard-tag ${card.tagClass}`}>{card.tag}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ecard-img">
                      <img src={HOME_CARD_IMAGES[i] as string} alt={card.title} loading="lazy" />
                    </div>
                    <div className="ecard-date">{card.date}</div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <div className={`ecard-tag ${card.tagClass}`}>{card.tag}</div>
                  </>
                )}
              </article>
            ))}
          </div>
          <div className="events-cta reveal">
            <Link to="/events" className="btn btn-outline">{h.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* JOIN TEASER */}
      <section className="join-teaser" id="join-teaser">
        <div className="join-glow" aria-hidden="true"></div>
        <div className="join-wrap reveal">
          <span className="label">{h.joinLabel}</span>
          <h2>{h.joinH2[0]}<br/>{h.joinH2[1]}</h2>
          <p>{h.joinP}</p>
          <div className="join-actions">
            <Link to="/join" className="btn btn-primary">{h.joinCta1}</Link>
            <Link to="/about" className="btn btn-outline">{h.joinCta2}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
