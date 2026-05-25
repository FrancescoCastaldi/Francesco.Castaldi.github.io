# Architecture Documentation

## Overview

This is a **static website** deployed on GitHub Pages. There is no server-side rendering, no backend, and no build pipeline. Every page is a self-contained HTML file.

## Dependency Graph

```
                    ┌─────────────┐
                    │  index.html │  ← entry point
                    └──────┬──────┘
                           │ links to
         ┌─────────────────┼──────────────────────┐
         ▼                 ▼                      ▼
   [Cycling pages]   [Tools & Apps]         [Other pages]
   giant-tcr.html    gpx-editor.html        contact.html
   trek-madone.html  hospital-sanit...      newsletter.html
   strava.html       allenamento...         love.html
         │
         └── shared assets
               styles.css  ← global CSS
               main.js     ← global JS
               contact.js  ← form logic
               photos/     ← media
```

## File Roles

### Core Assets
- **`styles.css`** — Single global stylesheet. All pages link to this file. Manages layout, responsive design, animations, and theming.
- **`main.js`** — Core JavaScript module. Handles background animations, navigation menu, shared UI interactions.
- **`contact.js`** — Dedicated script for the contact form submission and validation.

### Page Categories

#### Cycling & Sport
- `strava.html` — Strava stats integration
- `giant-tcr.html` / `giant-tcr-maintenance.html` — Giant TCR bike content
- `trek-madone.html` / `trek-madone-animazione.html` — Trek Madone content with CSS animations
- `bike-maintenance.html` — General maintenance reference
- `allenamento-ciclismo-8-ore.html` — Training plan
- `gpx-editor.html` — Client-side GPX file editor (no external dependencies)

#### Healthcare
- `hospital-sanitization-tracker.html` — Standalone dashboard app for tracking sanitization activities in healthcare facilities. Self-contained HTML with embedded JS.

#### Personal
- `index.html` — Homepage
- `contact.html` — Contact
- `newsletter.html` — Newsletter
- `love.html` — Personal page
- `404.html` — Custom error page

### SEO & Crawlers
- `sitemap.xml` — Lists all indexable URLs with `<lastmod>` timestamps
- `robots.txt` — Allows all crawlers, points to sitemap
- `humans.txt` — Credits and team info

## GitHub Actions

Workflows are located in `.github/workflows/`. GitHub Pages deployment is triggered automatically on push to `main`.

## Naming Conventions

- HTML pages use **kebab-case** (`trek-madone-animazione.html`)
- JS files use **camelCase** or **kebab-case** (`main.js`, `contact.js`)
- All assets are flat in the root (no subdirectory routing except `photos/`)

## Known Technical Debt

- All pages are root-level (no routing, no subfolder structure)
- CSS is a single monolithic file — consider splitting per-page if it grows further
- No automated testing or linting in CI pipeline
- `.vs/` directory (Visual Studio local config) is committed — should be in `.gitignore`
