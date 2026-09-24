import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { article, author, portrait, readingMinutes, publishedDate, publicationLabel } from '../content/willva'
import { asset } from '../utils/asset'

export default function ArticlePage() {
  const { lang, setLang } = useLang()
  const story = article[lang]
  const pt = lang === 'pt'
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'manual'>('idle')

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: story.title, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareState('copied')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setShareState('manual')
    }
  }

  return (
    <div className="mia-reader">
      <div className="mia-reader-top">
        <Link className="mia-back" to="/minds-in-action">← Minds in Action</Link>
        <div className="mia-language" role="group" aria-label={pt ? 'Idioma do artigo' : 'Article language'}>
          <button lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN <span>Original</span></button>
          <button lang="pt" aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT <span>Tradução</span></button>
        </div>
      </div>

      <article className="mia-story" lang={lang}>
        <header className="mia-story-header">
          <div className="mia-author-profile">
            <img className="mia-avatar" src={asset(portrait)} alt={author} width="72" height="72" />
            <div>
              <p className="mia-author-name">{author}</p>
              <Link className="mia-handle" to="/minds-in-action">@MindsInAction</Link>
            </div>
          </div>
          <div className="mia-story-meta">
            <span>{story.category}</span><span aria-hidden="true">·</span>
            <time dateTime={publishedDate}>{publicationLabel(lang)}</time><span aria-hidden="true">·</span>
            <span>{readingMinutes(lang)} {pt ? 'min de leitura' : 'min read'}</span>
            <span aria-hidden="true">·</span><span>{pt ? 'Artigo 01' : 'Article 01'}</span>
          </div>
          <h1>{story.title}</h1>
          <p className="mia-story-subtitle">{story.subtitle}</p>
          <div className="mia-story-toolbar">
            <p>{pt ? 'Traduzido do original em inglês.' : 'An original contribution to Minds in Action.'}</p>
            <button onClick={share} className="mia-share">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V3m-5 5 5-5 5 5M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" /></svg>
              {pt ? 'Partilhar' : 'Share'}
            </button>
          </div>
          <p role="status" className="mia-share-status">{shareState === 'copied' ? (pt ? 'Ligação copiada.' : 'Link copied.') : ''}</p>
          {shareState === 'manual' && <label className="mia-copy-link">{pt ? 'Copia esta ligação:' : 'Copy this link:'}<input readOnly value={window.location.href} onFocus={event => event.target.select()} /></label>}
        </header>

        <div className="mia-reading-layout">
          <aside className="mia-contents">
            <details open>
              <summary>{pt ? 'Neste artigo' : 'In this article'}</summary>
              <nav aria-label={pt ? 'Secções do artigo' : 'Article sections'}>
                {story.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span aria-hidden="true">0{index + 1}</span>{section.title}</a>)}
              </nav>
            </details>
          </aside>
          <div className="mia-story-body">
            {story.sections.map(section => (
              <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </section>
            ))}
            <footer className="mia-story-end">
              <div className="mia-author-profile">
                <img className="mia-avatar" src={asset(portrait)} alt="" width="64" height="64" loading="lazy" />
                <div><p className="mia-author-name">{author}</p><p className="mia-author-bio">{story.bio}</p><Link className="mia-handle" to="/minds-in-action">@MindsInAction</Link></div>
              </div>
              <Link className="mia-back" to="/minds-in-action">← {pt ? 'Voltar a Minds in Action' : 'Back to Minds in Action'}</Link>
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
