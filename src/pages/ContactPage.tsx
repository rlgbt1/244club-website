import { useState, FormEvent } from 'react'
import SectionLabel from '../components/SectionLabel'
import Card from '../components/Card'
import Button from '../components/Button'
import MarkdownRenderer from '../components/MarkdownRenderer'
import contactContent from '../../pages/contact.md?raw'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Firebase integration will go here
    setSubmitted(true)
  }

  return (
    <div className="page page-enter">
      <div className="container">
        {/* Header */}
        <section className="hero">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="hero-title animate-in">
            GET IN <span className="accent">TOUCH</span>.
          </h1>
          <p className="hero-subtitle animate-in animate-delay-1">
            Whether you want to join, collaborate, or just say hello — we'd love to hear from you.
          </p>
        </section>

        {/* Contact Grid */}
        <section className="mb-3xl">
          <div className="bento-grid bento-grid-hero">
            {/* Contact Form */}
            <Card className="animate-in animate-delay-2">
              <SectionLabel>Message Us</SectionLabel>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>SEND A MESSAGE.</h3>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🇦🇴</div>
                  <h3 style={{ marginBottom: 'var(--space-sm)' }}>OBRIGADO!</h3>
                  <p style={{ opacity: 0.7 }}>
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input type="text" id="contact-name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input type="email" id="contact-email" name="email" placeholder="your@email.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-university">University</label>
                    <input type="text" id="contact-university" name="university" placeholder="Your university (optional)" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" name="message" placeholder="Tell us what's on your mind..." required />
                  </div>
                  <Button variant="primary" size="large" type="submit">
                    SEND MESSAGE →
                  </Button>
                </form>
              )}
            </Card>

            {/* Social & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <Card variant="red" className="animate-in animate-delay-3">
                <SectionLabel>Social</SectionLabel>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>FOLLOW US.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <a
                    href="https://www.instagram.com/244clubuk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(254, 243, 224, 0.2)',
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    📸 @244clubuk
                  </a>
                  <a
                    href="https://linktr.ee/club244"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(254, 243, 224, 0.2)',
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    🔗 linktr.ee/club244
                  </a>
                  <a
                    href="mailto:hello@244club.co.uk"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      padding: '0.5rem 0',
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    ✉️ hello@244club.co.uk
                  </a>
                </div>
              </Card>

              <Card variant="dark" className="animate-in animate-delay-4">
                <SectionLabel>Join</SectionLabel>
                <h3 style={{ marginBottom: 'var(--space-sm)' }}>MEMBERSHIP.</h3>
                <p style={{ opacity: 0.7, fontSize: '0.95rem', marginBottom: 'var(--space-md)' }}>
                  244 Club is free to join. Open to all Angolan students and those with a connection to Angola in the UK.
                </p>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                }}>
                  No membership fees
                </div>
              </Card>

              <Card variant="yellow" className="animate-in animate-delay-5">
                <SectionLabel>Collaborate</SectionLabel>
                <h3 style={{ marginBottom: 'var(--space-sm)' }}>PARTNER WITH US.</h3>
                <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                  Interested in sponsoring an event or collaborating? We're always open to partnerships that benefit our community.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Markdown Content */}
        <section>
          <MarkdownRenderer content={contactContent} />
        </section>
      </div>
    </div>
  )
}
