# 244 Club — Website

Official website for **244 Club**, a curated society for Angolan students and young professionals in the UK.

**Live site:** [244club.co.uk](https://244club.co.uk)

---

## About

244 Club is a community built for Angolans in the diaspora — wherever you are. Our in-person events and community gatherings are currently based in the United Kingdom. The name comes from **+244**, Angola's international dialling code.

The website serves as the club's public-facing hub: introducing who we are, showcasing events, and collecting sign-ups through a Tally form.

---

## Stack

Pure static HTML — no framework, no build step.

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero with orbital gallery, stats, events preview |
| `about.html` | About page — story, team, mission/vision |
| `events.html` | Events list + photo gallery with lightbox |
| `join.html` | Sign-up page with embedded Tally form |
| `style.css` | Full design system |
| `script.js` | Nav, scroll reveal, orbital animation, lightbox |
| `assets/` | Logo, images, team photos |

**Fonts:** Space Grotesk (UI) + Playfair Display (display accent)  
**Form:** [Tally](https://tally.so) — form ID `PdEBD0`  
**Hosting:** GitHub Pages via GitHub Actions  
**Domain:** `244club.co.uk` (CNAME in `public/`)

---

## Run locally

No server needed. Just open `index.html` in your browser.

Or for a proper local server:

```bash
npx serve .
```

---

## Deploy

Pushing to `main` triggers the GitHub Actions workflow automatically.

```bash
git add .
git commit -m "your message"
git push
```

The workflow (`.github/workflows/deploy.yml`) copies the static files to `dist/` and deploys to GitHub Pages. No npm build required.

---

## Things to update

| What | Where |
|---|---|
| Social links (Instagram, LinkedIn, TikTok) | Already linked in all page footers |
| Email | `club244ao@gmail.com` — already in all pages |
| WhatsApp invite link | Search `YOUR_LINK` across all HTML files and replace |
| Tally form | Live at `join.html` — log in at tally.so to view responses |
| Team photos | `assets/images/reinaldo.jpg`, `yusseni.jpg`, `ines.jpg`, `yzenn.jpg` |

---

## Roadmap

| Phase | Status |
|---|---|
| Phase 1 — Presentation + sign-ups | ✅ Live |
| Phase 2 — Events/content depth | Planned |
| Phase 3 — Merch | Future |
| Phase 4 — Free ebook/playbook | Future |

---

© 2025 244 Club
