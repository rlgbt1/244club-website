import SectionLabel from '../components/SectionLabel'
import Card from '../components/Card'
import Button from '../components/Button'
import MarkdownRenderer from '../components/MarkdownRenderer'
import eventsContent from '../../pages/events.md?raw'

interface EventData {
  title: string
  date: string
  location: string
  description: string
  variant: 'white' | 'red' | 'yellow' | 'mint' | 'purple' | 'dark' | 'green'
  past?: boolean
}

const events: EventData[] = [
  {
    title: 'SUMMER SOCIAL 2026',
    date: 'JUN 2026',
    location: 'London, UK',
    description: 'Kick off the summer with the 244 family. Music, food, and good vibes — Angolan style. Open to all members and friends.',
    variant: 'red',
  },
  {
    title: 'NETWORKING MIXER',
    date: 'JUL 2026',
    location: 'Birmingham, UK',
    description: 'Connect with Angolan professionals working in the UK. Career advice, mentorship opportunities, and real conversations.',
    variant: 'yellow',
  },
  {
    title: 'CULTURAL FILM NIGHT',
    date: 'AUG 2026',
    location: 'Online',
    description: 'A screening of acclaimed Angolan cinema followed by discussion. Celebrating our stories, our voices, our art.',
    variant: 'mint',
  },
  {
    title: 'ANGOLAN INDEPENDENCE DAY',
    date: 'NOV 2026',
    location: 'London, UK',
    description: 'Our flagship event. Celebrating 51 years of Angolan independence with music, dance, food, and community.',
    variant: 'purple',
  },
  {
    title: 'WELCOME FRESHERS MEET',
    date: 'OCT 2025',
    location: 'London, UK',
    description: 'Our inaugural event welcoming new Angolan students arriving in the UK for the 2025/26 academic year.',
    variant: 'white',
    past: true,
  },
  {
    title: 'STUDY JAM',
    date: 'DEC 2025',
    location: 'Manchester, UK',
    description: 'Exam season study session with fellow 244 members. Shared focus, shared snacks, shared success.',
    variant: 'white',
    past: true,
  },
]

export default function EventsPage() {
  const upcoming = events.filter(e => !e.past)
  const past = events.filter(e => e.past)

  return (
    <div className="page page-enter">
      <div className="container">
        {/* Header */}
        <section className="hero">
          <SectionLabel>Events</SectionLabel>
          <h1 className="hero-title animate-in">
            WHAT'S <span className="accent">HAPPENING</span>.
          </h1>
          <p className="hero-subtitle animate-in animate-delay-1">
            From cultural celebrations to professional networking — our events bring the Angolan community together across the UK.
          </p>
        </section>

        {/* Upcoming Events */}
        <section className="mb-3xl">
          <SectionLabel>Upcoming</SectionLabel>
          <h2 className="mb-xl">COMING SOON.</h2>
          <div className="bento-grid bento-grid-events">
            {upcoming.map((event, i) => (
              <Card
                key={event.title}
                variant={event.variant}
                className={`event-card animate-in animate-delay-${Math.min(i + 1, 5)}`}
              >
                <div className="event-date">{event.date}</div>
                <div className="event-title">{event.title}</div>
                <p className="event-description">{event.description}</p>
                <div className="event-location">📍 {event.location}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-3xl">
          <Card variant="dark">
            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
              <div>
                <SectionLabel>Stay Updated</SectionLabel>
                <h2 style={{ marginBottom: 'var(--space-sm)' }}>DON'T MISS OUT.</h2>
                <p style={{ opacity: 0.7, maxWidth: '480px' }}>
                  Follow us on Instagram for event announcements, behind-the-scenes content, and community updates.
                </p>
              </div>
              <Button variant="accent" size="large" href="https://www.instagram.com/244clubuk/">
                FOLLOW US →
              </Button>
            </div>
          </Card>
        </section>

        {/* Past Events */}
        {past.length > 0 && (
          <section className="mb-3xl">
            <SectionLabel>Past Events</SectionLabel>
            <h2 className="mb-xl">WHAT WE'VE DONE.</h2>
            <div className="bento-grid bento-grid-events">
              {past.map((event, i) => (
                <Card
                  key={event.title}
                  variant={event.variant}
                  className={`event-card event-past animate-in animate-delay-${Math.min(i + 1, 5)}`}
                >
                  <div className="event-date">{event.date}</div>
                  <div className="event-title">{event.title}</div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-location">📍 {event.location}</div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Markdown Content */}
        <section>
          <MarkdownRenderer content={eventsContent} />
        </section>
      </div>
    </div>
  )
}
