# Francesco Castaldi — Personal Website

Personal website of **Francesco Castaldi**, Healthcare Business Consultant & Software Engineer.
Live at 👉 [francescocastaldi.github.io](https://francescocastaldi.github.io/Francesco.Castaldi.github.io)

---

## Architecture Overview

Static site hosted on **GitHub Pages** — no build step, no framework. All pages are standalone HTML files sharing a single CSS stylesheet and a main JS module.

```
Francesco.Castaldi.github.io/
│
├── index.html                        # Landing page / homepage
├── styles.css                        # Global stylesheet (shared across all pages)
├── main.js                           # Core JavaScript (animations, navigation, shared logic)
├── contact.js                        # Contact form logic
│
├── 404.html                          # Custom 404 error page
├── contact.html                      # Contact page
├── newsletter.html                   # Newsletter subscription page
├── strava.html                       # Strava cycling stats
│
├── giant-tcr.html                    # Giant TCR bike page
├── giant-tcr-maintenance.html        # Giant TCR maintenance guide
├── bike-maintenance.html             # General bike maintenance tips
├── trek-madone.html                  # Trek Madone bike page
├── trek-madone-animazione.html       # Trek Madone animated showcase
│
├── allenamento-ciclismo-8-ore.html   # 8-hour cycling training plan
├── gpx-editor.html                   # GPX route editor tool
├── hospital-sanitization-tracker.html # Healthcare sanitization tracker app
├── love.html                         # Personal/creative page
│
├── sitemap.xml                       # XML sitemap for SEO
├── robots.txt                        # Crawler directives
├── humans.txt                        # humans.txt credits
│
├── photos/                           # Media assets (images, photos)
│
└── .github/
    └── workflows/                    # GitHub Actions CI/CD workflows
```

---

## Page Descriptions

| File | Description |
|------|-------------|
| `index.html` | Main landing page — personal intro, skills, links |
| `contact.html` | Contact form and personal info |
| `newsletter.html` | Newsletter signup page |
| `strava.html` | Embedded Strava cycling activity stats |
| `giant-tcr.html` | Dedicated page for the Giant TCR Advanced SL ISP Rabobank Edition |
| `giant-tcr-maintenance.html` | Maintenance log and tips for the Giant TCR |
| `bike-maintenance.html` | General cycling maintenance reference |
| `trek-madone.html` | Dedicated page for the Trek Madone bike |
| `trek-madone-animazione.html` | Animated visual showcase of the Trek Madone |
| `allenamento-ciclismo-8-ore.html` | Structured 8-hour cycling training plan |
| `gpx-editor.html` | Client-side GPX route viewer and editor |
| `hospital-sanitization-tracker.html` | Healthcare tool: sanitization tracking dashboard |
| `love.html` | Personal/creative page |
| `404.html` | Custom error page for broken links |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Hosting | GitHub Pages |
| Markup | HTML5 |
| Styling | CSS3 (`styles.css`) |
| Scripting | Vanilla JavaScript (`main.js`, `contact.js`) |
| SEO | `sitemap.xml`, `robots.txt`, `humans.txt` |
| CI/CD | GitHub Actions (`.github/workflows/`) |

---

## Local Development

```sh
git clone https://github.com/FrancescoCastaldi/Francesco.Castaldi.github.io.git
cd Francesco.Castaldi.github.io
```

Open `index.html` directly in a browser — no build step required.

> Alternatively, use a local server to avoid CORS issues with JS modules:
> ```sh
> npx serve .
> # or
> python3 -m http.server 8080
> ```

---

## Deployment

Every push to `main` is automatically deployed to GitHub Pages.
No manual action required.

---

## Contact

Francesco Castaldi — [francesco.castaldi@proton.me](mailto:francesco.castaldi@proton.me)
