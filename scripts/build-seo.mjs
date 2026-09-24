import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'

// Reuse the same content as React; emit HTML metadata before any JavaScript runs.
async function loadContent(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const { pages } = await loadContent('../src/content/seo.ts')
const { article, articlePath, author, publishedDate } = await loadContent('../src/content/willva.ts')
const site = 'https://244club.com'
const dist = resolve('dist')
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const routes = { ...pages, [articlePath]: { title: `${article.en.title} | Minds in Action — 244 Club`, description: `${article.en.subtitle} Willva Iriana Alberto explores bias in camera technology and her AuraCam concept.` } }

for (const [path, page] of Object.entries(routes)) {
  const isArticle = path === articlePath
  const url = site + (path === '/' ? '/' : `${path}/`)
  const image = `${site}/assets/social/${isArticle ? 'willva-camera-preview' : '244-club-preview'}.jpg`
  const alt = isArticle ? `${article.en.title} — ${author}` : '244 Club, Angolan community in the UK'
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/\s*<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="(?:og:[^"]+|article:[^"]+)")[^>]*>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
  const tags = [
    ['name', 'description', page.description], ['name', 'robots', 'index,follow,max-image-preview:large'],
    ['property', 'og:title', page.title], ['property', 'og:description', page.description],
    ['property', 'og:type', isArticle ? 'article' : 'website'], ['property', 'og:url', url],
    ['property', 'og:site_name', '244 Club'], ['property', 'og:locale', 'en_GB'],
    ['property', 'og:image', image], ['property', 'og:image:secure_url', image],
    ['property', 'og:image:type', 'image/jpeg'], ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'], ['property', 'og:image:alt', alt],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description], ['name', 'twitter:image', image], ['name', 'twitter:image:alt', alt],
  ]
  let metadata = tags.map(([key, name, value]) => `<meta ${key}="${name}" content="${escape(value)}">`).join('\n')
  metadata += `\n<link rel="canonical" href="${url}">`
  if (isArticle) {
    metadata += `\n<meta data-article-meta property="article:published_time" content="${publishedDate}">\n<meta data-article-meta property="article:author" content="${escape(author)}">`
    const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.en.title, description: page.description, image, author: { '@type': 'Person', name: author }, publisher: { '@type': 'Organization', name: '244 Club', url: site }, datePublished: publishedDate, inLanguage: 'en', mainEntityOfPage: url }
    metadata += `\n<script data-page-schema type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
  }
  html = html.replace('</head>', `${metadata}\n</head>`)
  // Useful readable fallback, also exposing the complete original to non-JS readers.
  const content = isArticle
    ? `<article><h1>${escape(article.en.title)}</h1><p>${escape(author)} · <time datetime="${publishedDate}">${publishedDate}</time></p><p>${escape(article.en.subtitle)}</p>${article.en.sections.map(s => `<section><h2>${escape(s.title)}</h2>${s.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</section>`).join('')}</article>`
    : `<h1>${escape(page.title)}</h1><p>${escape(page.description)}</p>`
  const links = Object.entries(routes).map(([route, p]) => `<a href="${route === '/' ? '/' : route + '/'}">${escape(p.title)}</a>`).join(' · ')
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n<noscript><main>${content}<nav>${links}</nav></main></noscript>`)
  const folder = path === '/' ? dist : resolve(dist, path.slice(1))
  await mkdir(folder, { recursive: true })
  await writeFile(resolve(folder, 'index.html'), html)
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(routes).map(path => `<url><loc>${site}${path === '/' ? '/' : path + '/'}</loc></url>`).join('')}</urlset>\n`
await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
console.log(`SEO: emitted ${Object.keys(routes).length} crawlable pages and sitemap.`)
