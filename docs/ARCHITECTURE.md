# Architecture Documentation

## Overview

This is a **static website** deployed on GitHub Pages. There is no server-side rendering, no backend, and no build pipeline. Every page is a self-contained HTML5 file that links to shared global assets.

**Owner:** Francesco Castaldi — Computer Engineer & Healthcare Business Consultant  
**Company:** Maps Group  
**Location:** Modena, Emilia-Romagna, Italy  
**Live URL:** https://francescocastaldi.github.io/Francesco.Castaldi.github.io/

---

## Dependency Graph

```
                    ┌─────────────┐
                    │  index.html │  ← entry point
                    └──────┬──────┘
                           │ links to
         ┌─────────────────┼──────────────────────────┐
         ▼                 ▼                          ▼
   [Cycling pages]   [Tools & Apps]            [Other pages]
   giant-tcr.html    gpx-editor.html           contact.html
   trek-madone.html  hospital-sanit...         newsletter.html
   strava.html       allenamento...            love.html
   bike-maint...     
         │
         └── shared assets (all pages)
               styles.css   ← global CSS (layout, responsive, animations, theming)
               main.js      ← global JS (nav, background animation, shared UI)
               contact.js   ← form logic (contact.html only)
               photos/      ← media assets (favicon, images)
```

---

## File Roles

### Core Assets

| File | Role |
|------|------|
| `styles.css` | Single global stylesheet — layout, responsive design, animations, theming, terminal widget, cards, hero section |
| `main.js` | Core JS module — background gradient animation, navigation menu rendering (header/footer injected), scroll reveal, shared UI |
| `contact.js` | Dedicated script for contact form submission and validation logic |

### Page Categories

#### 🏠 Core / Personal

| Page | Description |
|------|-------------|
| `index.html` | Homepage. Hero section with animated terminal widget (`whoami`, `cat skills.txt`, `echo $LOCATION`). Expertise cards: Healthcare IT, Data Science, Cloud Architecture. Featured projects section. |
| `contact.html` | Contact form, email, social links, and a personal video intro section. |
| `newsletter.html` | Email newsletter signup page. |
| `love.html` | Personal/creative page. |
| `404.html` | Custom error page — displayed by GitHub Pages on broken URLs. |

#### 🚴 Cycling & Sport

| Page | Description |
|------|-------------|
| `strava.html` | Embedded Strava cycling stats — activity data, performance metrics. |
| `giant-tcr.html` | Dedicated page for the Giant TCR Advanced SL ISP Rabobank Edition — specs, photos. |
| `giant-tcr-maintenance.html` | Maintenance log and service guide for the Giant TCR. |
| `bike-maintenance.html` | General cycling maintenance dashboard — Strava integration, proactive maintenance tracker. |
| `trek-madone.html` | Dedicated page for the Trek Madone road bike — full specs and details. |
| `trek-madone-animazione.html` | Animated CSS/JS visual showcase of the Trek Madone — interactive presentation. |
| `allenamento-ciclismo-8-ore.html` | Full structured 8-hour cycling training plan — zones, intervals, duration breakdown. |
| `gpx-editor.html` | Client-side GPX route file viewer and editor. No external JS dependencies — fully self-contained. |

#### 🏥 Healthcare

| Page | Description |
|------|-------------|
| `hospital-sanitization-tracker.html` | IoT dashboard for tracking sanitization activities in hospital facilities in real-time. Self-contained HTML with embedded JS — no external backend. Relevant to professional work in Healthcare IT. |

### SEO & Crawler Files

| File | Role |
|------|------|
| `sitemap.xml` | Lists all indexable URLs with `<lastmod>` timestamps for search engine crawlers. |
| `robots.txt` | Allows all crawlers (`User-agent: *`, `Allow: /`), points to `sitemap.xml`. |
| `humans.txt` | Credits file following the humans.txt standard. |

---

## SEO Implementation

The homepage (`index.html`) implements a complete SEO stack:

```html
<!-- Structured Data -->
Schema.org Person  →  name, jobTitle, location, knowsAbout, sameAs (GitHub + LinkedIn)
Schema.org WebSite →  enables Google Sitelinks Search Box

<!-- Social Sharing -->
Open Graph         →  og:type=profile, og:locale=it_IT, og:image (favicon)
Twitter Card       →  summary card

<!-- Technical SEO -->
Canonical URL      →  https://francescocastaldi.github.io/Francesco.Castaldi.github.io/
Google Search Console → meta verification tag
Google Fonts       →  preconnect optimised (fonts.googleapis.com + fonts.gstatic.com)
```

**Known SEO note:** the canonical URL includes the repo name in the path because the site is hosted under a user GitHub Pages subdomain. This is expected behaviour for project-based GitHub Pages.

---

## GitHub Actions (CI/CD)

Workflows are located in `.github/workflows/`. GitHub Pages deployment is triggered automatically on every push to `main`. No manual deployment steps needed.

---

## Naming Conventions

- HTML pages: **kebab-case** (`trek-madone-animazione.html`)
- JS files: **camelCase** or kebab-case (`main.js`, `contact.js`)
- CSS classes: **kebab-case** (`.hero-title`, `.expertise-card`, `.t-prompt`)
- All assets are **flat in the root** — no subdirectory routing except `photos/`

---

## Known Technical Debt

| Issue | Impact | Suggested Fix |
|-------|--------|---------------|
| `.vs/` directory committed | Bloats repo with Visual Studio local config | Add `.vs/` to `.gitignore` |
| Single monolithic `styles.css` | May grow hard to maintain | Split per-section or use CSS custom properties layers |
| No linting / formatting CI step | Code style inconsistency risk | Add ESLint + Prettier GitHub Action |
| No automated tests | No regression detection | Add basic HTML validation step (e.g. `html-validate`) |
| `organigramma.txt` in root | Unclear purpose, raw text file | Move to `docs/` or remove if outdated |
