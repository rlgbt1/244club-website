import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function AboutPage() {
  const t = useT()
  const a = t.about
  useScrollReveal()

  return (
    <>
      <div className="page-hero page-hero-split reveal">
        <div className="page-hero-text">
          <span className="label">{a.label}</span>
          <h1>
            {a.h1Lines[0]}<br />{a.h1Lines[1]}<br /><em>{a.h1Em}</em>
          </h1>
          <p>{a.heroP}</p>
        </div>
        <div className="page-hero-logo">
          <img src="/assets/logo.png" alt="244 Club logo" />
        </div>
      </div>

      <div className="about-body">

        <div className="about-quote-block reveal">
          <blockquote>{a.quote}</blockquote>
          <cite>{a.quoteBy}</cite>
        </div>

        <div className="about-grid" style={{ marginBottom: '3rem' }}>
          {a.cards.map((card, i) => (
            <div key={i} className={`about-card about-card-${i + 1} reveal`}>
              <div className="about-card-num">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.p1}</p>
              {card.p2 && <p style={{ marginTop: '.75rem' }}>{card.p2}</p>}
            </div>
          ))}
        </div>

        <div className="about-mv-block reveal">
          <div className="about-mv-grid">
            <div>
              <p className="about-mv-label">{a.missionLabel}</p>
              <p className="about-mv-text">{a.missionText}</p>
            </div>
            <div>
              <p className="about-mv-label">{a.visionLabel}</p>
              <p className="about-mv-text">{a.visionText}</p>
            </div>
          </div>
        </div>

        <div className="team-section reveal">
          <span className="label">{a.teamLabel}</span>
          <h2>{a.teamH2}</h2>
          <p>{a.teamP}</p>
          <div className="team-grid">
            {a.team.map(member => (
              <div key={member.name} className="team-card">
                <div className="team-img-wrap">
                  <img src={member.img} alt={member.name} style={{ objectPosition: member.pos }} />
                </div>
                <h4>{member.name}</h4>
                <p className="team-role">{member.role}</p>
                <p className="team-uni">{member.uni}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="join-actions reveal" style={{ paddingBottom: '1rem' }}>
          <Link to="/join" className="btn btn-primary">{a.cta1}</Link>
          <Link to="/events" className="btn btn-outline">{a.cta2}</Link>
        </div>

      </div>
    </>
  )
}
