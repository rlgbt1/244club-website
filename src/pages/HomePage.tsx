import SectionLabel from '../components/SectionLabel'
import Card from '../components/Card'
import Button from '../components/Button'
import MarkdownRenderer from '../components/MarkdownRenderer'
import logoSrc from '/logo.jpeg?url'
import homeContent from '../../pages/home.md?raw'

export default function HomePage() {
  return (
    <div className="page page-enter">
      <div className="container">
        {/* Hero */}
        <section className="hero">
          <div className="flex items-center gap-lg mb-xl" style={{ flexWrap: 'wrap' }}>
            <img src={logoSrc} alt="244 Club — Palanca Negra" className="logo-hero animate-in" />
            <div>
              <SectionLabel>Home</SectionLabel>
            </div>
          </div>
          <h1 className="hero-title animate-in animate-delay-1">
            CONNECTING{' '}
            <span className="accent">ANGOLANS</span>{' '}
            ACROSS THE UK.
          </h1>
          <p className="hero-subtitle animate-in animate-delay-2">
            244 Club is a society for Angolan students and professionals in the United Kingdom —
            celebrating our culture, building community, and creating opportunities together.
          </p>
          <div className="hero-actions animate-in animate-delay-3">
            <Button variant="primary" size="large" to="/events">
              UPCOMING EVENTS →
            </Button>
            <Button variant="accent" size="large" to="/about">
              LEARN MORE →
            </Button>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="mb-3xl animate-in animate-delay-4">
          <div className="bento-grid bento-grid-hero" style={{ marginBottom: 'var(--space-lg)' }}>
            <Card variant="red">
              <SectionLabel>What is 244?</SectionLabel>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 'var(--space-md)' }}>
                +244
              </h2>
              <p style={{ opacity: 0.9, fontSize: '1rem' }}>
                Angola's international dialling code. It's our symbol of connection —
                a call home, a link to our roots, and a reminder that we carry Angola with us wherever we go.
              </p>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <Card variant="yellow">
                <SectionLabel>Est.</SectionLabel>
                <div className="stat-number">2025</div>
                <div className="stat-label">Founded</div>
              </Card>
              <Card variant="mint">
                <SectionLabel>Community</SectionLabel>
                <div className="stat-number" style={{ color: 'var(--ink)' }}>UK</div>
                <div className="stat-label">Nationwide</div>
              </Card>
            </div>
          </div>

          <div className="bento-grid bento-grid-3">
            <Card>
              <SectionLabel>Culture</SectionLabel>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>CELEBRATE HERITAGE.</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                Cultural nights, film screenings, food events, and celebrations of Angolan traditions and history.
              </p>
            </Card>
            <Card>
              <SectionLabel>Network</SectionLabel>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>BUILD CONNECTIONS.</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                Meet fellow Angolan students from universities across the UK. Share experiences, advice, and opportunities.
              </p>
            </Card>
            <Card>
              <SectionLabel>Grow</SectionLabel>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>DEVELOP TOGETHER.</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                Professional workshops, mentoring, career panels, and academic support for our members.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mb-3xl">
          <Card variant="dark">
            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
              <div>
                <SectionLabel>Join Us</SectionLabel>
                <h2 style={{ marginBottom: 'var(--space-sm)' }}>BECOME PART OF THE FAMILY.</h2>
                <p style={{ opacity: 0.7, maxWidth: '500px' }}>
                  244 Club is open to all Angolan students and those with a connection to Angola.
                  No fees — just community.
                </p>
              </div>
              <Button variant="accent" size="large" to="/contact">
                GET IN TOUCH →
              </Button>
            </div>
          </Card>
        </section>

        {/* Markdown Content */}
        <section>
          <MarkdownRenderer content={homeContent} />
        </section>
      </div>
    </div>
  )
}
