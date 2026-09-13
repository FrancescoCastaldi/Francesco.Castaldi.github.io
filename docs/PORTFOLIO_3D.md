# Maintenance Guide — 3D Portfolio «The Sculpted Atlas»

This document serves as the operational manual for maintaining, extending, and updating the 3D portfolio experience and its underlying static data architecture.

---

## 1. Architectural Overview

The portfolio features a hybrid architecture:
- **Homepage (`src/app/page.tsx`)**: An interactive 3D WebGL experience («The Sculpted Atlas») powered by **Three.js**, **React Three Fiber (`@react-three/fiber`)**, and **Drei (`@react-three/drei`)**, synchronized with **Lenis** smooth scrolling and GSAP.
- **Internal Subpages (`project/[slug]`, `skill/[id]`, `contact`, `not-found`)**: Pure, high-contrast 2D layouts utilizing the exact same design language and typography without incurring WebGL runtime or GPU overhead.
- **Static Export**: Generates static HTML/JS/CSS assets (`output: "export"` to `out/`) suitable for deployment on GitHub Pages or static CDNs.

### Data Flow & Derivation Pipeline

```
src/data/portfolio.ts (Raw Source of Truth: projects, skills, metrics, author declarations)
       │
       ▼
src/lib/portfolio/derive.ts (Pure derivation & validation engine)
       │
       ├──► DerivedPortfolioData (counts, distribution per practice area, cross-references)
       └──► Integrity Verification (validates inverse project-skill relations)
       │
       ├──► src/components/experience/ExperienceCanvas.tsx (3D Stage: Sculpture, Bars, Constellation)
       └──► src/components/portfolio/*.tsx (DOM Sections: Hero, Numbers, Showcase, Archive, Expertise, Contact)
```

---

## 2. Managing Projects

All project records reside in [`src/data/portfolio.ts`](file:///d:/Sviluppo/Francesco.Castaldi.github.io/src/data/portfolio.ts) within the `PORTFOLIO_PROJECTS` array.

### 2.1 Adding a New Project

When adding a project, append a new object conforming to the `PortfolioProject` interface:

```typescript
{
  id: "new-system-slug",
  title: "System Title",
  headline: "Concise summary of purpose and technical focus",
  area: "embedded-robotics", // "embedded-robotics" | "health-digital" | "cloud-distributed" | "algorithmic-ai"
  role: "Lead Architect",
  period: "2026",
  status: "production",      // "production" | "research" | "archived"
  highlighted: true,         // true: featured in 3D showcase; false: archive only
  sortOrder: 13,             // ordering priority for display
  skills: ["cpp", "robotics", "ros"], // must match id values in PORTFOLIO_SKILLS
  metrics: [
    { label: "Throughput", value: "10k req/s", source: "Internal Benchmark", verifiedAt: "2026-09-13" }
  ],
  links: {
    github: "https://github.com/...",
    live: "https://...",
    internal: "/project/new-system-slug"
  }
}
```

### 2.2 Updating the Featured Selection (Curated 12)

1. Set `highlighted: true` on up to 12 projects that should appear on the 3D prospective stage.
2. Set `highlighted: false` on projects intended for the searchable archive section only.
3. Update `sortOrder` to govern the presentation sequence across keyboard navigation, scroll snapping, and showcase cards.
4. The derivation pipeline in [`src/lib/portfolio/derive.ts`](file:///d:/Sviluppo/Francesco.Castaldi.github.io/src/lib/portfolio/derive.ts) will automatically partition and sort projects dynamically.

---

## 3. Inserting and Updating Verified Metrics

The portfolio strictly adheres to a **verifiable evidence** model. Unsubstantiated claims and vanity numbers are prohibited.

### Metric Structure
```typescript
interface MetricItem {
  label: string;      // What was measured (e.g., "Latency Reduction")
  value: string;      // Exact figure (e.g., "42%")
  source: string;     // Audit origin, repo benchmark, or direct statement
  verifiedAt: string; // ISO date format (YYYY-MM-DD)
}
```

### Career and Academic Metrics
Career and education declarations (governed by decisions D5 & D6) are tracked in `AUTHOR_DECLARATIONS` inside `src/data/portfolio.ts`:
- **Healthcare Business Consulting**: Declared duration, client domain, and verification date.
- **Academic Qualifications**: Degree details (BSc Computer Engineering, MSc Computer Science in progress).

---

## 4. 3D Scene Architecture & Materials

The 3D canvas is configured in [`src/components/experience/ExperienceCanvas.tsx`](file:///d:/Sviluppo/Francesco.Castaldi.github.io/src/components/experience/ExperienceCanvas.tsx) and utilizes four synchronized visual phases keyed to scroll progress:

1. **Phase 0 — Hero: The Lamellar Biella Sculpture (`LamellarSculpture.tsx`)**
   - Architectural lamellae inspired by Toyota M15A engine CAD cross-sections.
   - Four distinct lamellae bundles representing the four core practice areas.
   - Materials: Dark satin metal, pine green matte coating, micro-roughness.

2. **Phase 1 — Numbers: Impact Landscape (`ImpactLandscape.tsx`)**
   - 3D architectural bars whose heights correspond dynamically to projects per practice area on a common geometric scale.

3. **Phase 2 — Showcase: Stage Support Framing (`StageFraming.tsx`)**
   - Perspective framing and depth cues accentuating the focused project showcase card.

4. **Phase 3 — Expertise: Constellation Graph (`ConstellationGraph.tsx`)**
   - Dynamic 3D network node visualization derived directly from `skills` and `relatedProjects` relationships with inverse validation.

### Material & Color Token Mapping

All 3D shaders and standard materials utilize the defined design system palette:
- **Charcoal (`#0E100F`)**: Canvas clear color / background depth.
- **Anthracite (`#2A2D2B`)**: Primary structural lamellae and pedestal elements.
- **Pine Green (`#1F3329`)**: Core accents and volume contrast.
- **Burnt Orange (`#C1622D`)**: Interactive highlight accents (< 5% visual surface).
- **Stone Gray (`#C9C5BC`)**: Framing lines and subtle indicators.
- **Ivory (`#EDE8DE`)**: High-contrast markers.

---

## 5. Accessibility & Fallbacks

The application incorporates a multi-tier fallback mechanism managed by [`src/hooks/useExperienceQuality.ts`](file:///d:/Sviluppo/Francesco.Castaldi.github.io/src/hooks/useExperienceQuality.ts):

1. **Reduced Motion (`prefers-reduced-motion: reduce`)**:
   - WebGL animation loop paused; camera fixed at neutral angle.
   - Lenis smooth scroll disabled; native accessible scrolling preserved.
   - Accessible manual toggle provided in the header.
2. **WebGL Context Failure / Unsupported Hardware**:
   - The canvas unmounts cleanly and renders a CSS-only static architectural fallback.
   - Full content accessibility maintained across all DOM elements.
3. **Mobile Viewport Optimization**:
   - Pixel ratio clamped (`dpr={[1, 1.5]}`) to preserve battery life and prevent thermal throttling.
   - Simplified geometric tessellation.

---

## 6. Build and Verification Procedures

To verify code integrity, build stability, and test compliance:

```bash
# 1. Type verification
npx tsc --noEmit

# 2. Linting verification
npm run lint

# 3. Static build & export
npm run build

# 4. Heritage and integrity suite
node scripts/verify-heritage.mjs

# 5. Challenger stress & route verification
node scripts/challenger-stress-suite.mjs
```
