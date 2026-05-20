import SectionLabel from '../components/SectionLabel'
import Card from '../components/Card'
import MarkdownRenderer from '../components/MarkdownRenderer'
import logoSrc from '/logo.jpeg?url'
import aboutContent from '../../pages/about.md?raw'

const values = [
  { label: 'Ubuntu', desc: '"I am because we are." Community comes first.', color: 'red' as const },
  { label: 'Resiliência', desc: 'The resilience that defines the Angolan spirit.', color: 'yellow' as const },
  { label: 'Orgulho', desc: 'Pride in our heritage, our language, and our culture.', color: 'mint' as const },
  { label: 'Crescimento', desc: 'Growth through education, networking, and shared experience.', color: 'purple' as const },
]

const committee = [
  { name: 'Committee Member', role: 'President', initials: 'CM' },
  { name: 'Committee Member', role: 'Vice President', initials: 'CM' },
  { name: 'Committee Member', role: 'Events Lead', initials: 'CM' },
  { name: 'Committee Member', role: 'Secretary', initials: 'CM' },
  { name: 'Committee Member', role: 'Treasurer', initials: 'CM' },
  { name: 'Committee Member', role: 'Social Media', initials: 'CM' },
]

export default function AboutPage() {
  return (
    <div className="page page-enter">
      <div className="container">
        {/* Header */}
        <section className="hero">
          <SectionLabel>About Us</SectionLabel>
          <h1 className="hero-title animate-in">
            OUR <span className="accent">STORY</span>.
          </h1>
          <p className="hero-subtitle animate-in animate-delay-1">
            Founded in 2025, 244 Club brings together Angolan students from across the United Kingdom
            into one united community.
          </p>
        </section>

        {/* Mission & Palanca */}
        <section className="mb-3xl">
          <div className="bento-grid bento-grid-hero">
            <Card variant="green" className="animate-in animate-delay-2">
              <SectionLabel>Our Mission</SectionLabel>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>UNITE. EMPOWER. CELEBRATE.</h2>
              <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
                To unite, empower, and celebrate the Angolan student community across the United Kingdom
                through cultural events, professional development, and mutual support.
              </p>
            </Card>

            <Card className="animate-in animate-delay-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <img
                src={logoSrc}
                alt="Palanca Negra — Giant Sable Antelope"
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                  border: '3px solid var(--ink)',
                  boxShadow: 'var(--shadow-hard)',
                  marginBottom: 'var(--space-md)',
                }}
              />
              <h3>THE PALANCA NEGRA</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: 'var(--space-sm)' }}>
                Angola's national symbol — one of the rarest animals on Earth, found only in Angola.
              </p>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-3xl">
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="mb-xl">WHAT WE STAND FOR.</h2>
          <div className="bento-grid bento-grid-2">
            {values.map((v, i) => (
              <Card key={v.label} variant={v.color} className={`animate-in animate-delay-${i + 1}`}>
                <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.2rem' }}>
                  {v.label.toUpperCase()}.
                </h3>
                <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>{v.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Committee */}
        <section className="mb-3xl">
          <SectionLabel>Committee</SectionLabel>
          <h2 className="mb-xl">THE TEAM.</h2>
          <div className="team-grid">
            {committee.map((m, i) => (
              <div key={i} className={`team-member animate-in animate-delay-${Math.min(i + 1, 5)}`}>
                <div className="team-avatar">{m.initials}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Extended Markdown Content */}
        <section>
          <MarkdownRenderer content={aboutContent} />
        </section>
      </div>
    </div>
  )
}
