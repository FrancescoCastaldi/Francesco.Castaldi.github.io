# Portfolio Analysis Plan

## Current Architecture
- Next.js 16.2.10 App Router with static export (output: "export")
- React Three Fiber (r185) for 3D constellation
- Tailwind CSS v4 design system
- Zustand for 3D interaction state
- d3-force for build-time layout computation
- 27 static pages: home, 7 blog posts, 7 projects, 8 skills, contact

## UX Issues Identified

### Navigation
- Blog posts show 404 fallback in RSC payload alongside correct content
- Project/skill pages have async/await params pattern (Next.js 15+ requirement)
- Node click navigates to /project/[slug] or /skill/[id] pages
- Blog has "Back to blog" link, project/skill have "Return to constellation"

### Layout
- Content widths are now tightened (640px blog, 600px post, 560px detail)
- Padding reduced for denser information presentation

### 3D Constellation
- Camera limited: zoom 8-15, polar angle 30-60°, auto-rotate speed 1.0
- Hierarchical node sizes (expert 3.2, advanced 2.8, intermediate 2.4)
- Node self-rotation, orbit rings, slow constellation rotation
- Featured nodes with dual counter-rotating rings

## Next Steps
1. Verify all 27 routes return 200 with correct content
2. Test client-side navigation from 3D nodes to detail pages
3. Test blog post loading from listing page
4. Verify mobile layout for all page types
5. Check console for JS errors during navigation
