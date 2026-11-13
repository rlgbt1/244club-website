// One-off asset renderer: PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/render-article-previews.mjs
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const escape = text => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const dataImage = async path => `data:image/${path.endsWith('.png') ? 'png' : 'jpeg'};base64,${(await readFile(path)).toString('base64')}`
const logo = await dataImage('public/assets/logo.png')
try {
  for (const name of ['ayden', 'willva']) {
    const source = await readFile(`src/content/${name}.ts`, 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
    const content = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
    const portrait = await dataImage(`public${content.portrait}`)
    for (const lang of ['en', 'pt']) {
      const story = content.article[lang]
      await page.setContent(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
        *{box-sizing:border-box}body{margin:0;background:#f7f4ec;color:#1c3625;font-family:Arial,sans-serif}
        main{width:1200px;height:630px;display:grid;grid-template-columns:730px 470px;border-top:10px solid #1c3625}
        .copy{padding:36px 42px 32px 52px;display:flex;flex-direction:column}
        header{display:flex;align-items:center;gap:18px}header img{width:62px;height:65px;object-fit:contain}
        .brand{font-family:Georgia,serif;font-style:italic;font-size:31px}.handle{font-size:13px;letter-spacing:2px;margin-top:6px;color:#52765a}
        h1{font-family:Georgia,serif;font-size:49px;line-height:1.08;letter-spacing:-1.3px;margin:30px 0 20px;font-weight:normal}
        .author{margin-top:auto;border-top:1px solid #c7cebc;padding-top:18px;font-size:25px;font-weight:bold}
        .bottom{display:flex;justify-content:space-between;margin-top:12px;font-size:15px;color:#52765a}
        .portrait{background:#1c3625;padding:46px 32px 36px;display:flex;flex-direction:column;gap:22px}
        .photo{width:406px;height:454px;object-fit:cover;object-position:center 26%;border-radius:180px 180px 6px 6px}
        .label{color:#f7f4ec;font-size:14px;letter-spacing:2.8px;text-align:center}
      </style><main><section class="copy"><header><img src="${logo}" alt=""><div><div class="brand">Minds in Action</div><div class="handle">@MindsInAction · 244 CLUB</div></div></header><h1>${escape(story.title)}</h1><div class="author">${escape(content.author)}</div><div class="bottom"><span>${lang === 'pt' ? 'Ideias e perspetivas da nossa comunidade' : 'Ideas and perspectives from our community'}</span><span>244club.com</span></div></section><aside class="portrait"><img class="photo" src="${portrait}" alt="${escape(content.author)}"><div class="label">${lang === 'pt' ? 'ARTIGO · TECNOLOGIA' : 'ARTICLE · TECHNOLOGY'}</div></aside></main></html>`)
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())) })
      await page.screenshot({ path: resolve(`public/assets/social/${name}-article-${lang}-v2.jpg`), type: 'jpeg', quality: 92 })
    }
  }
} finally { await browser.close() }
