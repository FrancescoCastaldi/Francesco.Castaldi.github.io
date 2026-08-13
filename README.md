<div align="center">
  <a href="https://francescocastaldi.it" target="_blank">
    <img src="./public/assets/img/brand/logo.png" alt="Francesco Castaldi Brand Emblem" width="240" style="border-radius: 12px; margin-bottom: 16px;" />
  </a>
  <h1>Francesco Castaldi — Automotive & Tech Forum Hub</h1>
  <p><b>Modern Ultra-Clean Portfolio, Technical Build Logs, and Full Hybrid (HEV) Systems Engineering</b></p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://github.com/FrancescoCastaldi/Francesco.Castaldi.github.io"><img src="https://img.shields.io/badge/GitHub_Pages-Deployed-22C55E?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages" /></a>
  </p>
</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Standards](#-tech-stack--standards)
- [Project Architecture & Codemap](#-project-architecture--codemap)
- [Getting Started](#-getting-started)
- [CI/CD & Deployment Strategy](#-cicd--deployment-strategy)
- [Documentation References](#-documentation-references)

---

## 🚗 Overview

Welcome to the official repository of **Francesco Castaldi** — a Computer Engineering student at the University of Bologna specializing in **Automotive Tech**, **Full Hybrid (HEV) Systems**, **Healthcare IT**, and **Data Science**.

This repository powers a high-performance, **Static Site Generation (SSG)** web platform built like a modern automotive tech forum. It features deep dives into Toyota Yaris MK4 HEV telemetry, e-CVT transaxles, audio engineering, cloud architecture, and sports analytics.

---

## ✨ Key Features

- **Modern Ultra-Clean Automotive Forum Aesthetic**: Dark asphalt void theme with electric cyan (`#38bdf8`) and racing amber (`#f59e0b`) accents.
- **W3C/MDN Modern Web Standards**:
  - **Container Queries (`@container`)**: Fluid grid layout adapting to container dimensions.
  - **CSS `:has()` Parent Selector**: Dynamic card elevations and interactive glow effects.
  - **Glassmorphism & Native `<dialog>`**: Blur backdrop modals and sticky navigation.
  - **Core Web Vitals Optimization**: Off-screen content deferred rendering (`content-visibility: auto`) and high-priority hero loading (`fetchPriority="high"`).
- **Categories & Subcategories**: Structured taxonomy for automotive models (e.g. `Automotive` $\rightarrow$ `Toyota Yaris MK4 HEV`).
- **Autonomous SEO & Image Generation**: AI-generated cinematic visual assets (`generate_image`) paired with WCAG AA accessibility alt tags and GitHub Alert Callouts.
- **Databaseless Zero-Latency Performance**: 100% pre-rendered static export hosted on global CDN.

---

## 🛠️ Tech Stack & Standards

| Layer | Technology | Rationale |
|---|---|---|
| **Core Framework** | Next.js 16 (App Router) | Static Site Generation (`output: "export"`) with filesystem routing. |
| **Language** | TypeScript | Strong type safety across blog data, project nodes, and skill models. |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Atomic utility classes combined with custom CSS design tokens. |
| **State Management** | React Context API | Client-side internationalization (`LanguageProvider`). |
| **Data Layer** | Static TypeScript Files (`src/data/*.ts`) | Hardcoded structured objects for 0ms latency and 0$ hosting overhead. |

---

## 🗺️ Project Architecture & Codemap

The full codemap and module boundaries are documented in [`codemap.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/codemap.md).

```
src/
├── app/          # Next.js App Router (Rotte, Pagine, Layout)
│   ├── blog/     # Index ed articoli dinamici ([slug])
│   ├── project/  # Pagine dei progetti del portfolio
│   ├── skill/    # Pagine di dettaglio abilità tecniche
│   ├── contact/  # Pagina dei contatti
│   ├── layout.tsx
│   └── page.tsx  # Home Page (Automotive Forum Hub & Featured Builds)
├── components/   # Componenti React riutilizzabili (HeroSection, Header, Footer)
├── context/      # Context Provider (LanguageContext)
├── data/         # Databaseless Content (blog-posts.ts, projects.ts, types.ts)
└── styles/       # Fogli di stile globali (globals.css)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/FrancescoCastaldi/Francesco.Castaldi.github.io.git
   cd Francesco.Castaldi.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Test the static site export locally before pushing:

```bash
npm run build
```

The output static files will be generated in the `out/` directory.

---

## ⚙️ CI/CD & Deployment Strategy

This site is deployed to **GitHub Pages** via a custom GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. **Trigger**: Pushes to the `master` branch.
2. **Build Process**: Checkout code $\rightarrow$ Setup Node.js $\rightarrow$ `npm install` $\rightarrow$ `npm run build`.
3. **Deployment**: Uploads the resulting static `out/` directory directly to GitHub Pages CDN.

---

## 📄 Documentation References

For further details on guidelines, architecture, and agent rules, consult:

- 📋 [`AGENTS.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/AGENTS.md) — Agent guidelines and Next.js version rules.
- 🗺️ [`codemap.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/codemap.md) — Hierarchical codebase mapping.
- 🏗️ [`docs/ARCHITECTURE.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/docs/ARCHITECTURE.md) — Infrastructure choices and SSG model.
- 🎨 [`design/styleguide.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/design/styleguide.md) — Design concept and node color specifications.

---

<div align="center">
  <p>© 2026 Francesco Castaldi — Built with Next.js, TypeScript & Modern Web Standards.</p>
</div>
