# Francesco Castaldi — Personal Website

Personal website of **Francesco Castaldi**, Computer Engineer & Healthcare Business Consultant at Maps Group.
Live at 👉 [francescocastaldi.github.io](https://francescocastaldi.github.io/Francesco.Castaldi.github.io)

---

## About

Francesco Castaldi is a Computer Engineer and Business Consultant specialised in **Healthcare IT**, **Data Science**, and **Cloud Architecture**, based in Modena / Piacenza, Emilia-Romagna, Italy. This site is his personal portfolio, cycling journal, and toolbox.

**Core expertise areas:**
- Healthcare IT — hospital information systems, clinical data warehouses, IoT for digital health (HL7 FHIR, ICD-10, GDPR)
- Data Science — advanced analytics, machine learning, business intelligence (Python, SQL, Apache Superset)
- Cloud Architecture — scalable cloud infrastructure, containerisation, DevOps automation (Docker, AWS, Azure)

---

## Architecture Overview

Static site hosted on **GitHub Pages** — no build step, no framework. All pages are standalone HTML5 files sharing a single CSS stylesheet (`styles.css`) and a main JS module (`main.js`).

```
Francesco.Castaldi.github.io/
│
├── index.html                        # Landing page / homepage
├── styles.css                        # Global stylesheet (shared across all pages)
├── main.js                           # Core JavaScript (animations, navigation, shared UI logic)
├── contact.js                        # Contact form validation and submission logic
│
├── 404.html                          # Custom 404 error page
├── contact.html                      # Contact page
├── newsletter.html                   # Newsletter subscription page
├── strava.html                       # Strava cycling stats
│
├── giant-tcr.html                    # Giant TCR Advanced SL ISP Rabobank Edition — bike page
├── giant-tcr-maintenance.html        # Giant TCR maintenance log and tips
├── bike-maintenance.html             # General bike maintenance reference
├── trek-madone.html                  # Trek Madone — bike page
├── trek-madone-animazione.html       # Trek Madone — animated CSS/JS visual showcase
│
├── allenamento-ciclismo-8-ore.html   # Structured 8-hour cycling training plan
├── gpx-editor.html                   # Client-side GPX route viewer and editor tool
├── hospital-sanitization-tracker.html# Healthcare IoT: real-time sanitization tracking dashboard
├── love.html                         # Personal/creative page
│
├── sitemap.xml                       # XML sitemap for SEO indexing
├── robots.txt                        # Crawler directives (allows all, points to sitemap)
├── humans.txt                        # Credits (humans.txt standard)
│
├── photos/                           # Media assets — images, icons, photos
│
└── .github/
    └── workflows/                    # GitHub Actions CI/CD — auto-deploy to GitHub Pages on push to main
```

---

## Page Descriptions

| File | Category | Description |
|------|----------|-------------|
| `index.html` | Core | Main landing page — hero section, expertise cards (Healthcare IT / Data Science / Cloud), featured projects |
| `contact.html` | Core | Contact form, personal info, video intro |
| `newsletter.html` | Core | Newsletter subscription form |
| `404.html` | Core | Custom error page for broken or missing URLs |
| `strava.html` | Cycling | Embedded Strava cycling activity stats and performance data |
| `giant-tcr.html` | Cycling | Dedicated page for the Giant TCR Advanced SL ISP Rabobank Edition |
| `giant-tcr-maintenance.html` | Cycling | Maintenance log and service tips for the Giant TCR |
| `bike-maintenance.html` | Cycling | General cycling maintenance dashboard — Strava integration, proactive maintenance tracking |
| `trek-madone.html` | Cycling | Dedicated page for the Trek Madone road bike |
| `trek-madone-animazione.html` | Cycling | Animated visual showcase of the Trek Madone using CSS and JS animations |
| `allenamento-ciclismo-8-ore.html` | Cycling | Full structured 8-hour cycling training plan |
| `gpx-editor.html` | Tools | Client-side GPX route file viewer and editor — no external dependencies |
| `hospital-sanitization-tracker.html` | Healthcare | IoT dashboard for real-time tracking of sanitization activities in hospital facilities |
| `love.html` | Personal | Personal/creative page |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Hosting | GitHub Pages |
| Markup | HTML5 (semantic, lang=`it`) |
| Styling | CSS3 — single global file `styles.css` |
| Scripting | Vanilla JavaScript — `main.js` + `contact.js` |
| SEO | `sitemap.xml`, `robots.txt`, `humans.txt`, Schema.org JSON-LD, Open Graph, Twitter Card |
| CI/CD | GitHub Actions (`.github/workflows/`) — auto-deploy on push to `main` |
| Analytics | Google Search Console verified |
| Fonts | Google Fonts (preconnect optimised) |

---

## SEO & Structured Data

The site implements full SEO coverage:
- **Schema.org `Person`** — name, job title, location (Modena, IT), skills, LinkedIn and GitHub sameAs links
- **Schema.org `WebSite`** — enables Google Sitelinks Search Box
- **Open Graph** — `og:type=profile`, title, description, image, locale `it_IT`
- **Twitter Card** — `summary` card type
- **Canonical URL** — `https://francescocastaldi.github.io/Francesco.Castaldi.github.io/`
- **Google Search Console** — meta verification tag present

---

## Local Development

```sh
git clone https://github.com/FrancescoCastaldi/Francesco.Castaldi.github.io.git
cd Francesco.Castaldi.github.io
```

Open `index.html` directly in a browser — no build step required.

> For JS modules or to avoid CORS issues, use a local server:
> ```sh
> npx serve .
> # or
> python3 -m http.server 8080
> ```

---

## Deployment

Every push to `main` is automatically deployed to GitHub Pages via GitHub Actions.
No manual action required — live URL updates within ~1 minute.

---

## Contact

Francesco Castaldi — [francesco.castaldi@proton.me](mailto:francesco.castaldi@proton.me)
🔗 [GitHub](https://github.com/FrancescoCastaldi) · [LinkedIn](https://www.linkedin.com/in/francescocastaldi)
