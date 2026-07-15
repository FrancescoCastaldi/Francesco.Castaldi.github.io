---
name: nocturne-polish
description: Apply the Nocturne design system consistently across portfolio pages — typography, color tokens, spacing, layout. Use when creating new pages, styling detail views, or ensuring visual consistency.
---

# Nocturne Polish Skill

Use when styling portfolio pages, applying design tokens, or ensuring visual consistency.

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-space-void` | `#06080C` | Page background |
| `--color-space-surface` | `#0C111A` | Card/panel background |
| `--color-space-elevated` | `#131B27` | Elevated surfaces |
| `--color-star-gold` | `#F59E0B` | Primary accent, healthcare |
| `--color-nebula` | `#22D3EE` | Secondary accent, data-science |
| `--color-text-primary` | `#E7EDF5` | Headings |
| `--color-text-body` | `#9BA9BB` | Body text |
| `--color-text-muted` | `#4B5768` | Secondary text |
| `--color-text-dim` | `#2E3847` | Borders, dividers |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Display/Headings | `DM Serif Display` | 400 |
| Body | `Inter` | 300–700 |
| Code/Mono | `JetBrains Mono` | 400–500 |

### Common Patterns
- Background: always `#06080C` (space-void)
- Cards: `#0C111A` (space-surface), `border: 1px solid rgba(255,255,255,0.06)`
- Links: star-gold `#F59E0B` on hover, `#9BA9BB` default
- Transitions: `0.2s ease` for micro-interactions
- Page fade-in: `animation: pageFadeIn 0.35s ease-out` for 2D pages

### Page Fade-In
```css
@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```
