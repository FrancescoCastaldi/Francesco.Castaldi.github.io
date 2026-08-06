---
name: portfolio-routing
description: Create or modify portfolio detail pages (project/skill routes), navigation from 3D node clicks to dedicated pages, and back-to-constellation links. Use when adding project/[slug] or skill/[id] dynamic routes.
---

# Portfolio Routing Skill

Use when creating project detail pages, skill detail pages, or changing how node clicks navigate.

## Route Structure

| Route | File | Content |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Home — 3D constellation + HeroOverlay |
| `/project/[slug]` | `src/app/project/[slug]/page.tsx` | Project detail page |
| `/skill/[id]` | `src/app/skill/[id]/page.tsx` | Skill detail page |
| `/blog` | `src/app/blog/page.tsx` | Blog index |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Blog article |
| `/contact` | `src/app/contact/page.tsx` | Contact info |

## Navigation Pattern

Node clicks in `Node3D.tsx` use `useRouter` from `next/navigation`:
- Project node: `router.push(/project/${slug})`
- Skill node: `router.push(/skill/${id})`

Back link on detail pages: `← Return to constellation` → `/`

## Data Flow

- Projects: `src/data/projects.ts` → `ProjectNode[]` with slug, id, title, description, tags, skills, links
- Skills: `src/data/skills.ts` → `SkillNode[]` with id, name, area, level, description, relatedProjects
- Types: `src/data/types.ts` — `ProjectNode`, `SkillNode`, `BlogPost`

## Detail Page Template

```tsx
// Standard pattern for a project/skill detail page:
// 1. generateStaticParams to list all slugs/ids
// 2. Look up data by slug/id
// 3. Render: category label, title, description, tags/level, links, related items
// 4. "← Return to constellation" link at bottom
// 5. notFound() if no match
```
