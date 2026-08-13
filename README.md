<div align="center">
  <a href="https://francescocastaldi.it" target="_blank">
    <img src="./public/assets/img/brand/logo.png" alt="Francesco Castaldi Brand Emblem" width="260" style="border-radius: 12px; margin-bottom: 16px;" />
  </a>
  <h1>Francesco Castaldi — Automotive & Tech Forum Hub</h1>
  <p><b>Modern Ultra-Clean Portfolio, Technical Build Logs, and Full Hybrid (HEV) Systems Engineering</b></p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://francescocastaldi.it"><img src="https://img.shields.io/badge/GitHub_Pages-Live_Site-22C55E?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge" alt="License" /></a>
  </p>
</div>

---

<p align="center">
  <img src="./public/assets/img/hero/hero-bg.png" alt="Automotive Tech Forum Visualization" width="750" style="border-radius: 8px; border: 1px solid #1e293b;" />
</p>

---

## 📌 Table of Contents

- [ Overview](#-overview)
- [🚀 Key Features](#-key-features)
- [🏗️ Architecture & File Structure](#️-architecture--file-structure)
- [💻 Core Components Analysis](#-core-components-analysis)
- [⚙️ Quickstart & Usage](#️-quickstart--usage)
- [🔗 Dependencies & Data Flow](#-dependencies--data-flow)
- [⚠️ Gotchas & Developer Notes](#%EF%B8%8F-gotchas--developer-notes)
- [📄 Documentation & References](#-documentation--references)

---

## 🚗 Overview

Welcome to the official repository of **Francesco Castaldi** — a Computer Engineering student at the University of Bologna specializing in **Automotive Tech**, **Full Hybrid (HEV) Systems**, **Healthcare IT**, and **Data Science**.

This platform is engineered as a high-performance **Static Site Generation (SSG)** web application modeled after a modern automotive tech forum. It features deep technical articles on the Toyota Yaris MK4 HEV platform, e-CVT transaxles, car audio DSP engineering, hospital data pipelines, and sports performance analytics.

---

## 🚀 Key Features

- ** Modern Ultra-Clean Automotive Forum Aesthetic**: Dark asphalt surface colors (`#090d16`), electric cyan (`#38bdf8`), and racing amber (`#f59e0b`) accents.
- ** W3C/MDN Modern Web Standards**:
  - **Container Queries (`@container`)**: Fluid responsive grid adapting to container parent bounds instead of traditional viewport queries.
  - **CSS `:has()` Parent Selector**: Dynamic card elevations and interactive glow states without JavaScript event handlers.
  - **Glassmorphism & Native `<dialog>`**: Backdrop blur modals and sticky headers with native browser support.
  - **Core Web Vitals Optimization**: Off-screen content rendering deferred with `content-visibility: auto` and LCP candidate preloading with `fetchPriority="high"`.
- ** Structured Automotive Taxonomy**: Hierarchical category & subcategory classification (`category: "Automotive"`, `subcategory: "Toyota Yaris MK4 HEV"`).
- ** Original Content & UUXD Compliance**: Scannable 3-4 line paragraphs, F-pattern bold keyword highlights, WCAG AA high-contrast compliance, and GitHub callout alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`).
- ** Databaseless Zero-Latency Performance**: 100% pre-rendered static HTML/CSS/JS served via global CDN.

---

## 🏗️ Architecture & File Structure

```
Francesco.Castaldi.github.io/
├── .agents/                      # Custom AI Skill Manifests & Workflows
│   └── skills/
│       ├── blog-post-creator/   # Autonomous UUXD blog post generator
│       ├── md-codemap-analyzer/ # Markdown & codemap architectural auditor
│       └── content-manager/     # Clean formatting & syntax validator
├── docs/                         # Architecture & Deployment Documentation
│   └── ARCHITECTURE.md
├── design/                       # Design System & Styleguide
│   └── styleguide.md
├── public/                       # Static Assets & Generated Media
│   └── assets/
│       ├── blog/                # Article images & cover assets
│       ├── img/
│       │   ├── brand/           # Brand logo emblem (logo.png)
│       │   ├── hero/            # Hero section network graphic
│       │   └── og/              # Open Graph social preview (og-image.png)
├── src/
│   ├── app/                      # Next.js App Router (SSG Pages)
│   │   ├── blog/                 # Blog index & dynamic [slug] reader
│   │   ├── project/              # Project portfolio showcase
│   │   ├── skill/                # Technical skill detail pages
│   │   ├── contact/              # Contact form page
│   │   ├── layout.tsx            # Global layout shell
│   │   └── page.tsx              # Home Page (Automotive Forum & Garage Hub)
│   ├── components/               # Reusable React UI Components
│   │   ├── layout/               # Header, Footer, Navigation
│   │   └── ui/                   # HeroSection, Cards, Modals
│   ├── context/                  # Client-side React Context (LanguageContext)
│   ├── data/                     # Databaseless Content Definitions
│   │   ├── blog-posts.ts         # Blog articles database object
│   │   ├── projects.ts           # Portfolio project data
│   │   └── types.ts              # TypeScript interfaces (BlogPost, Project)
│   └── styles/
│       └── globals.css           # Modern Web CSS Tokens & Utilities
├── AGENTS.md                     # Agent rules & version notes
├── codemap.md                    # Full hierarchical codebase mapping
└── next.config.mjs               # Static Export configuration (output: "export")
```

---

## 💻 Core Components Analysis

### 1. Modern Web CSS Utilities ([`src/styles/globals.css`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/src/styles/globals.css#L112-L160))

Demonstrating Container Queries, CSS `:has()`, and deferred rendering:

```css
/* Container Queries for fluid grid layout */
.forum-grid-container {
  container-type: inline-size;
  container-name: forum-grid;
}

@container forum-grid (min-width: 700px) {
  .forum-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
}

/* Dynamic CSS :has() parent highlighting */
.forum-thread-card:has(a:hover) {
  border-color: var(--color-accent-amber) !important;
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.15);
}

/* Performance: Deferred rendering for offscreen items */
.thread-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 1px 180px;
}
```

### 2. Automotive Telemetry Hero ([`src/components/ui/HeroSection.tsx`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/src/components/ui/HeroSection.tsx#L250-L270))

High-priority image loading for LCP optimization:

```tsx
<img 
  src="/assets/img/hero/hero-bg.png" 
  alt="Automotive Tech Network Visualization" 
  fetchPriority="high"
  style={{
    width: "100%",
    height: "auto",
    display: "block",
    border: "1px solid #1e293b",
  }}
/>
```

### 3. Subcategory Taxonomy Data Model ([`src/data/blog-posts.ts`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/src/data/blog-posts.ts#L3-L12))

Structured TypeScript blog post declaration:

```typescript
export const blogPosts: BlogPost[] = [
  {
    title: "Toyota Yaris MK4 HEV Trend MY25: Specs, Tech & Efficiency",
    slug: "toyota-yaris-mk4-hev-trend-my25-review",
    date: "2026-08-13",
    category: "Automotive",
    subcategory: "Toyota Yaris MK4 HEV",
    excerpt: "A deep dive into the Toyota Yaris MK4 HEV Trend MY25, analyzing its 1.5L Dynamic Force hybrid powertrain...",
    // ...
  }
];
```

---

## ⚙️ Quickstart & Usage

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Commands

```bash
# 1. Clone the repository
git clone https://github.com/FrancescoCastaldi/Francesco.Castaldi.github.io.git
cd Francesco.Castaldi.github.io

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build static export bundle for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the development build.

---

## 🔗 Dependencies & Data Flow

```mermaid
flowchart LR
    A["Static Data (src/data/*.ts)"] --> B["Next.js App Router (app/*)"]
    B --> C["Turbopack Build System"]
    C --> D["Static HTML/CSS/JS (out/)"]
    D --> E["GitHub Pages CDN"]
    E --> F["End User Browser"]
```

---

## ⚠️ Gotchas & Developer Notes

> [!IMPORTANT]
> **Next.js Static Export Constraint**: `next.config.mjs` sets `output: "export"`. There is **no Node.js server at runtime** in production. All dynamic routes (`/blog/[slug]`, `/project/[slug]`, `/skill/[id]`) MUST declare `generateStaticParams()`.

> [!NOTE]
> **Global Agent Skills**: Per repository conventions, all reusable skills reside globally in `C:\Users\franc\.gemini\config\skills\` as well as in local `.agents/skills/`.

> [!TIP]
> **Modern Web Guidance**: Before adding CSS or JavaScript utilities, verify modern browser capabilities using the `modern-web-guidance` skill to leverage native browser features without heavy third-party libraries.

---

## 📄 Documentation & References

- 📋 [`AGENTS.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/AGENTS.md) — Agent guidelines and Next.js version rules.
- 🗺️ [`codemap.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/codemap.md) — Hierarchical codebase mapping.
- 🏗️ [`docs/ARCHITECTURE.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/docs/ARCHITECTURE.md) — Infrastructure decisions and SSG export setup.
- 🎨 [`design/styleguide.md`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/design/styleguide.md) — Design tokens, color palette, and dark mode rules.

---

<div align="center">
  <p>© 2026 Francesco Castaldi — Built with Next.js, TypeScript & Modern Web Standards.</p>
</div>
