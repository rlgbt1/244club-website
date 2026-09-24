import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useLang } from '../context/LanguageContext'
import { article, articlePath, author, publishedDate } from '../content/willva'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

import { pages } from '../content/seo'

const SITE_URL = 'https://244club.com'
const DEFAULT_IMAGE = `${SITE_URL}/assets/social/244-club-preview.jpg`


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
  const location = useLocation()
  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const { lang } = useLang()

  useEffect(() => {
    const isArticle = pathname === articlePath
    const story = article[lang]
    const page = isArticle ? { title: `${story.title} | Minds in Action — 244 Club`, description: story.subtitle } : pages[pathname] ?? pages['/']
    const image = isArticle ? `${SITE_URL}/assets/social/willva-camera-preview.jpg` : DEFAULT_IMAGE
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname + '/'}`
    document.title = page.title

    setMeta('meta[name="description"]', 'name', 'description', page.description)
    setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', isArticle ? 'article' : 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', '244 Club')
    setMeta('meta[property="og:image"]', 'property', 'og:image', image)
    setMeta('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', image)
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', isArticle ? `${story.title} — ${author}` : '244 Club, Angolan community in the UK')
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    setMeta('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/jpeg')
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', isArticle ? `${story.title} — ${author}` : '244 Club, Angolan community in the UK')
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'pt' ? 'pt_PT' : 'en_GB')
    document.head.querySelectorAll('[data-article-meta], [data-page-schema]').forEach(el => el.remove())
    if (isArticle) {
      for (const [property, content] of [['article:published_time', publishedDate], ['article:author', author]]) {
        const meta = document.createElement('meta')
        meta.setAttribute('property', property)
        meta.content = content
        meta.dataset.articleMeta = ''
        document.head.appendChild(meta)
      }
    }

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
      schema.dataset.pageSchema = ''
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: story.title, description: story.subtitle, image,
        author: { '@type': 'Person', name: author },
        publisher: { '@type': 'Organization', name: '244 Club', url: SITE_URL },
        inLanguage: lang, mainEntityOfPage: url, datePublished: publishedDate,
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
