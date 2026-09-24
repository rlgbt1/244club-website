import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useLang } from '../context/LanguageContext'
import { article, articlePath, author, portrait } from '../content/willva'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const SITE_URL = 'https://244club.com'
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`

const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: '244 Club | Angolan Community in the UK',
    description: '244 Club connects Angolan students and young professionals in the UK through community, culture, careers and events.',
  },
  '/about': {
    title: 'About — 244 Club | Angolan Community UK',
    description: 'Learn about 244 Club, the community for Angolan students and young professionals building their future in the United Kingdom.',
  },
  '/events': {
    title: 'Events — 244 Club | Angolan Community UK',
    description: 'Explore 244 Club events for Angolan students and professionals in the UK: cultural gatherings, networking and career conversations.',
  },
  '/join': {
    title: 'Join 244 Club | Angolan Community UK',
    description: 'Join 244 Club, a community for Angolan students and young professionals in the UK and across the diaspora.',
  },
  '/minds-in-action': {
    title: 'Minds in Action | 244 Club Editorial — Angolan Community UK',
    description: 'Minds in Action is the editorial space of 244 Club: essays, research, career reflections and cultural commentary written by Angolan students and young professionals across the UK.',
  },
}

function setMeta(selector: string, attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }
  element.content = content
}

export default function Seo() {
  const { pathname } = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    const isArticle = pathname === articlePath
    const story = article[lang]
    const page = isArticle ? { title: `${story.title} | Minds in Action — 244 Club`, description: story.subtitle } : pages[pathname] ?? pages['/']
    const image = isArticle ? `${SITE_URL}${portrait}` : DEFAULT_IMAGE
    const url = `${SITE_URL}${pathname}`
    document.title = page.title

    setMeta('meta[name="description"]', 'name', 'description', page.description)
    setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', isArticle ? 'article' : 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', '244 Club')
    setMeta('meta[property="og:image"]', 'property', 'og:image', image)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const schema = document.createElement('script')
    if (isArticle) {
      schema.type = 'application/ld+json'
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: story.title, description: story.subtitle, image,
        author: { '@type': 'Person', name: author },
        publisher: { '@type': 'Organization', name: '244 Club', url: SITE_URL },
        inLanguage: lang, mainEntityOfPage: url,
      })
      document.head.appendChild(schema)
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: page.title,
        page_location: url,
        page_path: pathname,
      })
    }
    return () => { schema.remove() }
  }, [pathname, lang])

  return null
}
