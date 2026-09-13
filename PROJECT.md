# Project: Francesco Castaldi Website — Old Money & Ralph Lauren Heritage Restyling

## Architecture
- **Framework**: Next.js 16.2.10 (React 19, `output: "export"` SSG static generation).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` with CSS-first configuration in `src/styles/globals.css` using `@theme { ... }`.
- **Typography Architecture**:
  - Titles & Brand Headings: `Cormorant Garamond` & `EB Garamond` (sculptural serifs).
  - Body Copy & Editorial Text: `Newsreader` & `Source Serif 4` (relaxed line-height 1.7, low cortisol).
  - Classical Indices & Accents: `Cinzel` / small caps with Roman numerals.
- **Color Token Architecture**:
  - Primary Canvas: Mahogany / warm deep espresso (`#121110` / `#161413`).
  - Elevated Surfaces / Cards: British Racing Green (`#15261E` / `#1B2E24`) and dark espresso (`#1A1715`).
  - Noble Accent: Warm antique satin gold (`#C5A059` / `#D4AF37`).
  - Secondary Accents: Warm cognac leather (`#8D5B4C`) and desaturated sage/slate (`#6D7D72`).
  - Text & Copy: Soft ivory & warm parchment (`#FAF6EE` / `#E8E3D6`).
  - Hairline Borders: `1px solid rgba(197, 160, 89, 0.20)`.
- **Icon Architecture**: Sartorial hairline icon system (`0.75px–1.0px` stroke with rounded caps) via `<HeritageIcon />` component.

## Feature Inventory
| # | Feature | Description | Milestone | Status |
|---|---------|-------------|-----------|:------:|
| 1 | Low-Cortisol Heritage Palette | Replace cold asphalt/cyan/neon with mahogany, British Racing Green, antique satin gold, cognac, and ivory | M1 | **DONE** |
| 2 | Tailwind v4 Theme Tokens | Declare tokens and backwards-compatible aliases in `@theme` in `globals.css` | M1 | **DONE** |
| 3 | Serif Typography Configuration | Load `EB Garamond`, `Cormorant Garamond`, `Newsreader`, `Source Serif 4`, `Cinzel` via `layout.tsx` | M1 | **DONE** |
| 4 | Chiaroscuro Atmospheric Backgrounds | Replace 40px/48px square tech grids with warm radial chiaroscuro gradients | M1 | **DONE** |
| 5 | Heraldic "FC" Monogram Vector Logo | Generate classical intertwined roman letters in satin gold on British Racing Green (`logo.svg`) | M2 | **DONE** |
| 6 | Favicon & High-Density Touch Icons | Generate multi-resolution `favicon.ico`, `icon.png`, and `apple-touch-icon.png` (180x180) | M2 | **DONE** |
| 7 | Sartorial Hairline Icon System | Implement `<HeritageIcon />` with 0.75–1.0px hairline strokes in antique gold / ivory | M2 | **DONE** |
| 8 | Header Monogram & Micro-Dot Navigation | Replace mono FC box with heraldic crest; navigation links separated by micro-dots `•` | M3 | **DONE** |
| 9 | Roman Numerals & Editorial Indexing | Replace all 46 bracketed telemetry labels (`[ 01 // ... ]`) with Roman numerals (`I.`–`VI.`) & small caps | M3 | **DONE** |
| 10 | Calming Status Badges | Replace pulsing neon status dots with serene antique satin gold insignias | M3 | **DONE** |
| 11 | Velvet Hover Transitions | Upgrade interactive transitions from 0.2s abrupt to 0.6s–0.8s ease-out chiaroscuro glows | M3 | **DONE** |
| 12 | Card & Layout Elevation Restyling | Restyle ProjectCard, SkillCard, Breadcrumb, Footer, and page views with hairline gold borders | M3 | **DONE** |
| 13 | TypeScript Data Models Preservation | Preserve `blog-posts.ts`, `projects.ts`, `skills.ts`, and `types.ts` without schema mutation | M4 | **DONE** |
| 14 | SSG Route Integrity (60 Pages) | Ensure all 60 static routes prerender with exit code 0 | M4 | **DONE** |
| 15 | ESLint Cleanliness & UTF-8 Encoding | Fix source hygiene warnings, update `eslint.config.mjs`, guarantee clean UTF-8 (no BOM/mojibake) | M4 | **DONE** |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|:------:|
| M1 | Design Tokens, CSS Theme & Heritage Typography | `src/styles/globals.css`, `src/app/blog/blog.css`, `src/app/layout.tsx` | none | **DONE** |
| M2 | Heraldic Monogram, Favicons & Brand Assets | `public/assets/img/brand/logo.svg`, `public/favicon.ico`, `public/icon.png`, `public/apple-touch-icon.png`, `src/components/ui/HeritageIcon.tsx` | M1 | **DONE** |
| M3 | UI Atmosphere, Layout & Heritage Components | `src/components/layout/Header.tsx`, `Footer.tsx`, `HeroSection.tsx`, `ProjectCard.tsx`, `SkillCard.tsx`, `Breadcrumb.tsx`, `InteractiveLink.tsx`, and all pages (`src/app/page.tsx`, `blog/`, `project/`, `skill/`, `contact/`, `not-found.tsx`) | M1, M2 | **DONE** |
| M4 | Architectural Integrity, Build Verification & Quality Assurance | Full build validation (`npm run build`), SSG check (60 static pages), ESLint compliance, UTF-8 verification | M1, M2, M3 | **DONE** |

## Quality Gate Final Outcome
- **Reviewer 1 (Architecture & Build)**: `APPROVE`
- **Reviewer 2 (Visual & Assets)**: `APPROVE`
- **Challenger 1 (Route Integrity & Edge Cases)**: `APPROVE`
- **Challenger Recheck (CSS & Asset Encoding)**: `APPROVE`
- **Forensic Auditor (Integrity Forensics)**: `CLEAN`
- **Overall Gate Result**: **`PASS`** (All 35 automated tests passing, 60/60 static SSG routes exported, 0 BOM, 0 mojibake, 0 lint errors).
