# 244 Club Website — Implementation Plan

Build a visually striking website for 244 Club (Angolan students society in the UK) using React + Vite, with a **KaniCompanion-inspired neo-brutalist design** adapted with Angolan cultural identity, markdown-driven content pages, and GitHub Pages compatibility.

## Design Vision

Blend three reference sources into a cohesive identity:

| Source | What to take |
|---|---|
| **KaniCompanion** (`kani-companion.pages.dev`) | Neo-brutalist card system, hard box-shadows, monospace section labels (`// SECTION`), warm cream background, bold typography, vibrant accent colors, CRT scanline texture overlay |
| **martinhe.co.uk** | Sidebar navigation, tab-based page switching, dark/light theme support, glassmorphism elements, smooth transitions |
| **Mood board screenshots** | The full dashboard-style bento grid, colorful cards (pink, yellow, mint, purple), thick borders, retro-digital aesthetic |

### Color Palette (Angolan-inspired, KaniCompanion-adapted)

| Token | Value | Usage |
|---|---|---|
| `--cream` | `#FEF3E0` | Page background |
| `--ink` | `#1A0B2E` | Text, borders, hard shadows |
| `--red-angola` | `#CC092F` | Primary accent (Angolan flag red) |
| `--black-angola` | `#1A1A1A` | Secondary dark |
| `--yellow-angola` | `#FFD60A` | Highlight accent (Angolan flag yellow) |
| `--mint` | `#7DF9C0` | Success/CTA accent |
| `--purple-electric` | `#8B3DFF` | Interactive/hover accent |
| `--pink-hot` | `#FF3D8A` | Decorative accent |

### Typography

| Role | Font | Usage |
|---|---|---|
| Display/Titles | **Rubik Mono One** | Page titles, hero text, section headings |
| Body | **Figtree** | Paragraphs, descriptions, UI text |
| Mono/Labels | **JetBrains Mono** | Section labels (`// ABOUT`), code, metadata |

### Key Visual Elements (from KaniCompanion)
- **Hard box-shadows**: `4px 4px 0 var(--ink)` on cards, `8px 8px 0` on hero cards
- **Thick borders**: `2.5px solid var(--ink)`
- **Monospace section prefixes**: `// EVENTS`, `// ABOUT US`
- **CRT/scanline texture overlay**: Subtle repeating gradient on `body::before`
- **Noise texture overlay**: SVG fractal noise on `body::after`
- **Bento grid layout**: Mixed-size colorful cards
- **Neo-brutalist buttons**: Solid bg, hard shadow, translate on hover

---

## User Review Required

> [!IMPORTANT]
> **GitHub Pages + Client-Side Routing**: Since GitHub Pages doesn't support server-side routing, I'll use `HashRouter` (e.g. `/#/about`) so all routes work without a 404.html redirect hack. This means URLs will have `#` in them. If you later move to a server with proper routing, we can switch to `BrowserRouter`.

> [!IMPORTANT]
> **Markdown Pages Architecture**: All page content will live in `./pages/*.md` files. These will be imported at build time via `vite-plugin-markdown` (or a raw import + `react-markdown` renderer). Editing content = editing markdown. The React components provide layout/design around the markdown content.

> [!WARNING]
> **Firebase Integration**: The plan creates a clean separation where Firebase can be plugged in later. I'll add a `src/firebase.ts` config stub file but won't implement any Firebase features yet.

## Open Questions

> [!IMPORTANT]
> **Logo/Branding**: Do you have a 244 Club logo (SVG preferred), or should I create a text-based logo using Rubik Mono One? The KaniCompanion style uses a small icon + monospace text in the nav bar.

> [!IMPORTANT]
> **Instagram Content**: The Linktree page was blocked — is there specific content (bio text, event details, mission statement) you'd like me to include, or should I use placeholder text that you'll replace via the markdown files?

> [!NOTE]
> **Color Palette Direction**: I've chosen Angolan flag colors (red, black, yellow) blended with KaniCompanion's vibrant palette. Let me know if you'd prefer different accent colors or a different cultural emphasis.

---

## Proposed Changes

### Project Setup & Configuration

#### [NEW] [package.json](file:///Users/martinhe/Workspaces/244-club/package.json)
- Initialize Vite + React + TypeScript project
- Dependencies: `react`, `react-dom`, `react-router-dom`, `react-markdown`, `remark-gfm`, `gray-matter`
- Dev deps: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `gh-pages`
- Scripts: `dev`, `build`, `preview`, `deploy` (gh-pages)

#### [NEW] [vite.config.ts](file:///Users/martinhe/Workspaces/244-club/vite.config.ts)
- Base path: `/244club/` (for GitHub Pages at `martin-he543.github.io/244club`)
- Raw import support for `.md` files (`?raw` suffix)
- Build output to `dist/`

#### [NEW] [tsconfig.json](file:///Users/martinhe/Workspaces/244-club/tsconfig.json)
Standard React + Vite TypeScript config.

---

### Markdown Content Pages

#### [NEW] [pages/home.md](file:///Users/martinhe/Workspaces/244-club/pages/home.md)
Home page content: hero section text, mission statement, quick links.

#### [NEW] [pages/about.md](file:///Users/martinhe/Workspaces/244-club/pages/about.md)
About page: society description, history, what 244 means (Angola country code), team/committee.

#### [NEW] [pages/events.md](file:///Users/martinhe/Workspaces/244-club/pages/events.md)
Events page: upcoming events, past events, how to attend.

#### [NEW] [pages/contact.md](file:///Users/martinhe/Workspaces/244-club/pages/contact.md)
Contact page: social media links, email, join form info.

---

### Design System & Styles

#### [NEW] [src/index.css](file:///Users/martinhe/Workspaces/244-club/src/index.css)
Complete design system:
- CSS custom properties (color tokens, spacing, typography)
- Global resets and base styles
- Body texture overlays (scanline + noise, matching KaniCompanion)
- Card system (`.card`, `.card-red`, `.card-yellow`, `.card-mint`, `.card-purple`, `.card-dark`)
- Hard shadow system (`.shadow-hard`, `.shadow-hard-lg`)
- Button system (`.btn`, `.btn-primary`, `.btn-accent`)
- Typography classes (`.font-display`, `.font-body`, `.font-mono`)
- Section label style (`.section-label` — the `// SECTION` monospace prefix)
- Bento grid layout utilities
- Responsive breakpoints
- Markdown content styling (`.markdown-content` — styles for rendered markdown)
- Navigation styles
- Smooth animations and transitions

---

### React Components

#### [NEW] [src/main.tsx](file:///Users/martinhe/Workspaces/244-club/src/main.tsx)
App entry point with `HashRouter` setup.

#### [NEW] [src/App.tsx](file:///Users/martinhe/Workspaces/244-club/src/App.tsx)
Root layout component with:
- `<Navbar />` at top
- `<Routes>` for page switching
- `<Footer />` at bottom
- Page transition animations

#### [NEW] [src/components/Navbar.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/Navbar.tsx)
Top navigation bar (KaniCompanion style):
- Logo text "244 CLUB" in Rubik Mono One (left)
- Nav links in JetBrains Mono (right): HOME, ABOUT, EVENTS, CONTACT
- Active link indicator
- Mobile hamburger menu
- Sticky positioning with cream/glassmorphism background

#### [NEW] [src/components/Footer.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/Footer.tsx)
Footer with social links, copyright, Angolan flag colors accent bar.

#### [NEW] [src/components/MarkdownRenderer.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/MarkdownRenderer.tsx)
Wrapper around `react-markdown` with:
- Custom component mapping for h1–h6, blockquote, links, images
- `remark-gfm` plugin for tables, strikethrough, etc.
- Frontmatter parsing with `gray-matter`
- Styled output within `.markdown-content` container

#### [NEW] [src/components/Card.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/Card.tsx)
Reusable neo-brutalist card component:
- Props: `variant` (red, yellow, mint, purple, dark, white), `size`, `children`
- Hard shadow, thick border, rounded corners

#### [NEW] [src/components/SectionLabel.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/SectionLabel.tsx)
The `// SECTION NAME` monospace label component (matching KaniCompanion's style).

#### [NEW] [src/components/Button.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/Button.tsx)
Neo-brutalist button with hard shadow, hover translate effect.

#### [NEW] [src/components/HeroSection.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/HeroSection.tsx)
Large hero section for the home page: bold display text, accent-colored keyword, subtitle, CTA buttons.

#### [NEW] [src/components/EventCard.tsx](file:///Users/martinhe/Workspaces/244-club/src/components/EventCard.tsx)
Individual event card for the events grid: date badge, title, description, location tag.

---

### Pages (React views wrapping markdown content)

#### [NEW] [src/pages/HomePage.tsx](file:///Users/martinhe/Workspaces/244-club/src/pages/HomePage.tsx)
- Hero section with bold title: "CONNECTING **ANGOLANS** ACROSS THE UK."
- Bento grid with stat cards (member count, events hosted, cities, etc.)
- Featured upcoming event card
- "What is 244?" explainer card
- Social media links section
- Renders `pages/home.md` content

#### [NEW] [src/pages/AboutPage.tsx](file:///Users/martinhe/Workspaces/244-club/src/pages/AboutPage.tsx)
- Section label `// ABOUT US`
- Title: "OUR **STORY**."
- Mission/vision cards in bento layout
- Committee/team section
- Renders `pages/about.md` content

#### [NEW] [src/pages/EventsPage.tsx](file:///Users/martinhe/Workspaces/244-club/src/pages/EventsPage.tsx)
- Section label `// EVENTS`
- Title: "WHAT'S **HAPPENING**."
- Grid of event cards (upcoming + past)
- Renders `pages/events.md` content

#### [NEW] [src/pages/ContactPage.tsx](file:///Users/martinhe/Workspaces/244-club/src/pages/ContactPage.tsx)
- Section label `// CONTACT`
- Title: "GET IN **TOUCH**."
- Contact form card
- Social links grid (Instagram, email, etc.)
- Renders `pages/contact.md` content

---

### Static Assets

#### [NEW] [public/favicon.svg](file:///Users/martinhe/Workspaces/244-club/public/favicon.svg)
Simple "244" text favicon in Angolan red.

#### [NEW] [index.html](file:///Users/martinhe/Workspaces/244-club/index.html)
HTML entry with Google Fonts preconnect, meta tags, OG tags.

---

### Deployment Configuration

#### [NEW] [.github/workflows/deploy.yml](file:///Users/martinhe/Workspaces/244-club/.github/workflows/deploy.yml)
GitHub Actions workflow for auto-deploy on push to `main`.

#### [NEW] [.gitignore](file:///Users/martinhe/Workspaces/244-club/.gitignore)
Standard Vite + Node .gitignore.

---

### Firebase Stub

#### [NEW] [src/firebase.ts](file:///Users/martinhe/Workspaces/244-club/src/firebase.ts)
Commented-out Firebase config stub. Ready for user to fill in project credentials later.

---

## File Structure Summary

```
244-club/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
├── .github/workflows/deploy.yml
├── public/
│   └── favicon.svg
├── pages/                     ← Editable markdown content
│   ├── home.md
│   ├── about.md
│   ├── events.md
│   └── contact.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── firebase.ts            ← Stub for later
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── Card.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── Button.tsx
│   │   ├── HeroSection.tsx
│   │   └── EventCard.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── EventsPage.tsx
│       └── ContactPage.tsx
└── mood-board/                ← Existing reference images
```

---

## Verification Plan

### Automated Tests
- `npm run build` — Verify production build succeeds with no TypeScript errors
- `npm run preview` — Visual check of all 4 pages
- Verify all routes work with HashRouter: `/#/`, `/#/about`, `/#/events`, `/#/contact`

### Manual Verification
- Visual comparison against KaniCompanion mood board screenshots
- Test responsive layout (mobile, tablet, desktop)
- Verify markdown files can be edited and changes appear after rebuild
- Test navigation between all pages
- Verify the base path works for GitHub Pages deployment
