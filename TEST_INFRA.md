# Test Infrastructure Specification: Heritage Verification Engine

**Project**: Francesco Castaldi Website — Old Money & Ralph Lauren Heritage Restyling  
**Author**: Test Writer 1 (Opaque-Box QA Track)  
**File**: `TEST_INFRA.md`  
**Test Suite Script**: `scripts/verify-heritage.mjs`  
**Status**: ACTIVE & OPERATIONAL  

---

## 1. Overview & Architecture

The **Heritage Verification Engine** is an automated, opaque-box, progressive 4-tier test runner built natively with Node.js ESM (`scripts/verify-heritage.mjs`). It operates independently of implementation code, validating all 15 project features defined in `PROJECT.md` and the sensory requirements in `ORIGINAL_REQUEST.md`.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HERITAGE VERIFICATION ENGINE                         │
│                    scripts/verify-heritage.mjs                         │
└────────────────────────────────────────────────────────────────────────┘
        │
        ├── Tier 1: Feature Coverage (M1/M2/M4 Foundations)
        │   ├── Low-Cortisol Palette Tokens (globals.css)
        │   ├── Google Fonts Preconnect & Serifs (layout.tsx)
        │   ├── Brand Assets Existence (favicon, icon, touch icon, logo.svg)
        │   └── SSG Route Definitions & Param Generators
        │
        ├── Tier 2: Boundary & Corner Cases (M1/M2/M3 Edge Conditions)
        │   ├── 404 Low-Cortisol Styling & Neon Amber Removal
        │   ├── Blog Empty State Fallbacks
        │   ├── Mobile Drawer & Hamburger State Toggle Rules
        │   ├── Global Overflow Clipping (Horizontal Scroll Prevention)
        │   ├── SVG ViewBox & XMLNS Geometry Health
        │   └── Sartorial Hairline Icon System (HeritageIcon)
        │
        ├── Tier 3: Cross-Feature Interactions (M2/M3/M4 Integrations)
        │   ├── Monogram Cross-Matching (Header vs logo.svg)
        │   ├── Metadata Icons Linkage in Root Layout
        │   ├── Header Navigation Anchor Resolution in Root Page
        │   ├── Micro-Dot (•) Navigation Separators
        │   └── Kebab-Case Slug Parity across Blog, Projects, and Skills
        │
        └── Tier 4: Real-World Scenarios (M3/M4 Production Acceptance)
            ├── Static Export Integrity (out/ containing >= 58-60 HTML pages)
            ├── Zero UTF-8 Byte Order Marks (BOM 0xEF 0xBB 0xBF)
            ├── Zero Mojibake / Corrupted Character Sequences
            ├── Total Elimination of Tech Telemetry Monospace Brackets
            └── Velvet Hover Transitions (0.5s–0.8s Ease-Out)
```

---

## 2. Test Execution Commands

The runner can be invoked directly with Node.js or integrated into npm scripts:

### Standard Execution (Strict Mode)
Fails with exit code `1` if any assertion fails, exit code `0` when 100% passing:
```bash
node scripts/verify-heritage.mjs
```

### Milestone / Tier-Specific Runs
Execute only tests for a specific tier:
```bash
# Tier 1 only (Tokens, Fonts, Brand Assets, Route Definitions)
node scripts/verify-heritage.mjs --tier=1

# Tier 2 only (404 Page, Empty States, Mobile Rules, SVG Geometry)
node scripts/verify-heritage.mjs --tier=2

# Tier 3 only (Monogram Match, Metadata Links, Nav Validity, Slugs)
node scripts/verify-heritage.mjs --tier=3

# Tier 4 only (Static HTML Export, 0 BOMs, 0 Mojibake, No Telemetry)
node scripts/verify-heritage.mjs --tier=4
```

### Permissive Mode (Diagnostic Only)
Runs the complete suite and prints formatted output and worker remediation guidance, exiting with `0`:
```bash
node scripts/verify-heritage.mjs --permissive
```

### Machine-Readable JSON Mode
Emits structured JSON for automated pipelines and dashboards:
```bash
node scripts/verify-heritage.mjs --json
node scripts/verify-heritage.mjs --tier=1 --json --permissive
```

---

## 3. Comprehensive Test Inventory (35 Test Cases)

| ID | Tier | Title | Authoritative Source | Target Milestone |
|:---|:----:|:------|:---------------------|:----------------:|
| **T1.1** | 1 | Design Tokens — Primary Canvas Mahogany/Espresso (`#121110` / `#161413`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.2** | 1 | Design Tokens — British Racing Green Surfaces (`#15261E` / `#1B2E24` / `#1A1715`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.3** | 1 | Design Tokens — Antique Satin Gold Noble Accent (`#C5A059` / `#D4AF37`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.4** | 1 | Design Tokens — Warm Cognac Leather & Sage Accents (`#8D5B4C` / `#6D7D72`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.5** | 1 | Design Tokens — Soft Ivory & Warm Parchment Typography (`#FAF6EE` / `#E8E3D6`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.6** | 1 | Design Tokens — Hairline Satin Gold Fillet (`rgba(197, 160, 89, 0.20)`) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.7** | 1 | Design Tokens — Elimination of Cold Asphalt Void (`#0b0c0e` as Active Canvas) | `ORIGINAL_REQUEST.md §R1` | M1 |
| **T1.8** | 1 | Typography — Google Fonts Preconnect in `src/app/layout.tsx` | `ORIGINAL_REQUEST.md §R2` | M1 |
| **T1.9** | 1 | Typography — Garamond, Newsreader/Source Serif, & Cinzel in Layout Link | `ORIGINAL_REQUEST.md §R2` | M1 |
| **T1.10** | 1 | Typography — Serif Font Family Mapping in `src/styles/globals.css` | `PROJECT.md Architecture` | M1 |
| **T1.11** | 1 | Brand Assets — `public/favicon.ico` Exists & Non-Empty | `ORIGINAL_REQUEST.md §R3` | M2 |
| **T1.12** | 1 | Brand Assets — `public/icon.png` Exists & Non-Empty | `ORIGINAL_REQUEST.md §R3` | M2 |
| **T1.13** | 1 | Brand Assets — `public/apple-touch-icon.png` Exists & Non-Empty | `ORIGINAL_REQUEST.md §R3` | M2 |
| **T1.14** | 1 | Brand Assets — `public/assets/img/brand/logo.svg` Exists & Valid SVG | `ORIGINAL_REQUEST.md §R3` | M2 |
| **T1.15** | 1 | Route Architecture — `generateStaticParams` Defined in Dynamic Routes | `PROJECT.md Feature 14` | M4 |
| **T2.1** | 2 | Corner Cases — 404 Page Low-Cortisol Styling & Neon Amber Elimination | `ORIGINAL_REQUEST.md §R4` | M3 |
| **T2.2** | 2 | Corner Cases — 404 Page Classical Headings (No Raw Monospace Brackets) | `ORIGINAL_REQUEST.md §R2, §R4` | M3 |
| **T2.3** | 2 | Boundary Cases — Blog Search/Filter Empty State Graceful Handling | `ORIGINAL_REQUEST.md §R4` | M3 |
| **T2.4** | 2 | Boundary Cases — Mobile Navigation Drawer / Hamburger Toggle in Header | `ORIGINAL_REQUEST.md §R4` | M3 |
| **T2.5** | 2 | Boundary Cases — Global Horizontal Overflow Clipping (`overflow-x: clip`) | `ORIGINAL_REQUEST.md §R4` | M1 |
| **T2.6** | 2 | Corner Cases — SVG Logo ViewBox, XMLNS & Color Palette Attributes | `ORIGINAL_REQUEST.md §R3` | M2 |
| **T2.7** | 2 | Corner Cases — HeritageIcon Component with 0.75-1.0px Hairline Stroke | `PROJECT.md Feature 7` | M2 |
| **T3.1** | 3 | Cross-Feature — Header Monogram Displays Heraldic Identity (No Raw Mono Box) | `ORIGINAL_REQUEST.md §R3, §R4` | M3 |
| **T3.2** | 3 | Cross-Feature — Layout Metadata References Favicon and Touch Icons | `PROJECT.md Feature 6` | M2 |
| **T3.3** | 3 | Cross-Feature — Header Navigation Links Resolve to Valid Page Anchors | `ORIGINAL_REQUEST.md §R4` | M3 |
| **T3.4** | 3 | Cross-Feature — Header Navigation Items Separated by Micro-Dots (`•`) | `ORIGINAL_REQUEST.md §R4` | M3 |
| **T3.5** | 3 | Cross-Feature — Data Parity: All Blog Post Slugs Follow Valid Kebab-Case | `PROJECT.md Feature 13` | M4 |
| **T3.6** | 3 | Cross-Feature — Data Parity: All Project Slugs Follow Valid Kebab-Case | `PROJECT.md Feature 13` | M4 |
| **T3.7** | 3 | Cross-Feature — Data Parity: All Skill IDs Follow Valid Kebab-Case | `PROJECT.md Feature 13` | M4 |
| **T3.8** | 3 | Cross-Feature — Card Component Navigation Paths Match Route Patterns | `PROJECT.md Feature 12` | M3 |
| **T4.1** | 4 | Real-World — Static Export Output Contains Required Prerendered HTML Pages | `ORIGINAL_REQUEST.md §R5` | M4 |
| **T4.2** | 4 | Real-World — Zero UTF-8 Byte Order Marks (BOM `0xEF 0xBB 0xBF`) in Source Files | `ORIGINAL_REQUEST.md §R5` | M4 |
| **T4.3** | 4 | Real-World — Zero Mojibake / Corrupted Character Sequences in Source & Export | `ORIGINAL_REQUEST.md §R5` | M4 |
| **T4.4** | 4 | Real-World — Elimination of Monospace Brackets `[ 01 //` & `[ BLOG ]` Residue | `ORIGINAL_REQUEST.md §R2, §R4` | M3 |
| **T4.5** | 4 | Real-World — Velvet Transitions Configuration (0.5s–0.8s Relaxed Timing) | `ORIGINAL_REQUEST.md §R4` | M3 |

---

## 4. Expected Output Derivation & Verification Sources

Each test derives expected outputs from authoritative sources:
1. **Palette Colors**: Derived from `ORIGINAL_REQUEST.md` §R1 (Mahogany `#121110`, British Racing Green `#15261E` / `#1B2E24`, Satin Gold `#C5A059` / `#D4AF37`, Cognac `#8D5B4C`, Sage `#6D7D72`, Ivory `#FAF6EE`, Parchment `#E8E3D6`).
2. **Typography**: Derived from `ORIGINAL_REQUEST.md` §R2 (`EB Garamond`, `Cormorant Garamond`, `Newsreader`, `Source Serif 4`, `Cinzel`).
3. **Brand Identity**: Derived from `ORIGINAL_REQUEST.md` §R3 (Monogram "FC", `public/assets/img/brand/logo.svg`, `public/apple-touch-icon.png`, `public/favicon.ico`).
4. **Encoding Integrity**: Derived from user global rule 7 & `ORIGINAL_REQUEST.md` §R5 (Clean UTF-8, zero Byte Order Marks, regex scanning for mojibake byte patterns `Ã`, `â€`, `\uFFFD`).
5. **Static Export**: Derived from Next.js 16 SSG export `out/` validating 60 static routes (home, 404, contact, blog, 24 blog posts, 19 projects, 11 skills, sitemap).

---

## 5. Escalation & Quality Gate Thresholds

The suite operates with clear thresholds:
- **Build Quality Gate**: Exit code 0 from `npm run build`.
- **Suite Quality Gate**: 100% pass rate (35/35 passing) required before final release.
- **Milestone Gates**:
  - Milestone M1: 100% pass on T1.1–T1.10, T2.5.
  - Milestone M2: 100% pass on T1.11–T1.14, T2.6, T2.7, T3.2.
  - Milestone M3: 100% pass on T2.1–T2.4, T3.1, T3.3, T3.4, T3.8, T4.4, T4.5.
  - Milestone M4: 100% pass on T1.15, T3.5–T3.7, T4.1–T4.3.
