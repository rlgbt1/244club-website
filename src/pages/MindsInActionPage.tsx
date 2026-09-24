import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { article, articlePath, author, portrait, readingMinutes, publishedDate, publicationLabel } from '../content/willva'
import { useT } from '../i18n'
import { asset } from '../utils/asset'

export default function MindsInActionPage() {
  const t = useT()
  const m = t.mindsInAction
  const { lang } = useLang()
  const story = article[lang]
  const [active, setActive] = useState(0)
  const showArticle = active === 0 || active === 2 || active === 5
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
          {m.categories.map((cat, index) => (
            <button
              key={cat}
              className={`mia-pill${active === index ? ' active' : ''}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              {cat}
            </button>
          ))}
        </div>

        {showArticle ? <>
        <span className="mia-first-label mia-anim mia-anim-6">{m.firstLabel}</span>

        <article className="mia-feature mia-feature-compact mia-anim mia-anim-7">
          <div className="mia-feature-body">
            <div className="mia-feature-meta">
              <span className="mia-feature-tag">{story.category}</span>
              <time dateTime={publishedDate}>{publicationLabel(lang)}</time>
            </div>
            <h2 className="mia-feature-title"><Link to={articlePath}>{story.title}</Link></h2>
            <p className="mia-feature-deck">{story.subtitle}</p>
          </div>
          <div className="mia-feature-byline">
            <Link to={articlePath} className="mia-feature-portrait" aria-label={`${m.featured.cta}: ${story.title}`}>
              <img src={asset(portrait)} alt={author} width="1118" height="1600" loading="lazy" />
            </Link>
            <div>
              <p className="mia-feature-name">{author}</p>
              <p className="mia-feature-university">Ravensbourne University London</p>
            </div>
          </div>
          <div className="mia-feature-footer">
            <p className="mia-feature-read">{readingMinutes(lang)} {lang === 'pt' ? 'min de leitura' : 'min read'}</p>
            <Link to={articlePath} className="mia-feature-cta">{m.featured.cta}</Link>
          </div>
        </article>
        </> : <p className="mia-empty" role="status">{lang === 'pt' ? 'Novas perspetivas nesta categoria, em breve.' : 'New perspectives in this category, coming soon.'}</p>}

        <p className="mia-more-soon">{m.moreSoon}</p>
      </div>
    </div>
  )
}
