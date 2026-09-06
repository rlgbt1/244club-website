import { useState } from 'react'
import { useT } from '../i18n'
import { asset } from '../utils/asset'

export default function MindsInActionPage() {
  const t = useT()
  const m = t.mindsInAction
  const [active, setActive] = useState(m.categories[0])
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mia-page">
      <img
        src={asset('/assets/africa-outline.png')}
        alt=""
        aria-hidden="true"
        className="mia-africa mia-africa-left"
      />
      <img
        src={asset('/assets/africa-outline.png')}
        alt=""
        aria-hidden="true"
        className="mia-africa mia-africa-right"
      />

      <div className="mia-wrap">
        <header className="mia-masthead">
          <h1 className="mia-title mia-anim mia-anim-1">
            Minds in Action
            <span className="mia-hashtag mia-anim mia-anim-2">{m.hashtag}</span>
          </h1>

          <div className="mia-intro-block mia-anim mia-anim-3">
            <p className="mia-lead">{m.lead}</p>
            <p className="mia-intro">{m.intro}</p>

            <div className={`mia-more${expanded ? ' expanded' : ''}`}>
              <div className="mia-more-inner">
                <p>{m.more1}</p>
                <p>{m.more2}</p>
                <p className="mia-closing">{m.closing}</p>
              </div>
            </div>

            <button
              type="button"
              className="mia-readmore-btn"
              aria-expanded={expanded}
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? m.readLess : m.readMore}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`mia-readmore-chevron${expanded ? ' open' : ''}`}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="mia-rule mia-anim mia-anim-4" />

        <div className="mia-filters mia-anim mia-anim-5">
          {m.categories.map(cat => (
            <button
              key={cat}
              className={`mia-pill${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="mia-first-label mia-anim mia-anim-6">{m.firstLabel}</span>

        <article className="mia-feature mia-anim mia-anim-7">
          <div className="mia-feature-body">
            <h2 className="mia-feature-title">{m.featured.title}</h2>
            <p className="mia-feature-author">{m.featured.author}</p>
            <span className="mia-feature-tag">{m.featured.tag}</span>
            <p className="mia-feature-read">{m.featured.readTime}</p>
            <a href="#" className="mia-feature-cta">{m.featured.cta}</a>
          </div>
          <div className="mia-feature-media">
            <span>IMAGE</span>
          </div>
        </article>

        <p className="mia-more-soon">{m.moreSoon}</p>
      </div>
    </div>
  )
}
