import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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

  useEffect(() => {
    const page = pages[pathname] ?? pages['/']
    const url = `${SITE_URL}${pathname}`
    document.title = page.title

    setMeta('meta[name="description"]', 'name', 'description', page.description)
    setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', '244 Club')
    setMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_IMAGE)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_IMAGE)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: page.title,
        page_location: url,
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
