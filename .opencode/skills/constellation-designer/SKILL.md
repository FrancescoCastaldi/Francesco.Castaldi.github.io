---
name: constellation-designer
description: Modify 3D node/constellation appearance — size, radius, colors, emissive glow, materials, animations, and spatial layout in the Nocturne Three.js portfolio. Use when adjusting node radius, glow intensity, geometry, layout spacing, or 3D visual polish.
---

# Constellation Designer Skill

Use when adjusting the 3D constellation nodes, edges, camera, or starfield.

## Key Files

- `src/lib/nodes.ts` — `computeLayout()`: sets node `radius`, runs d3-force simulation
- `src/components/three/Node3D.tsx` — per-node rendering: geometry, materials, animations, labels
- `src/components/three/Constellation.tsx` — graph assembly: edge building, dimming logic, featured node
- `src/components/three/Edge3D.tsx` — connection lines between nodes
- `src/components/three/Starfield.tsx` — background particle starfield
- `src/components/three/CameraController.tsx` — camera position, OrbitControls, zoom to node
- `src/components/three/Scene3D.tsx` — Canvas wrapper, loading state
- `src/store/constellation-store.ts` — Zustand store for 3D interaction state
- `src/data/types.ts` — `PositionedNode`, `ProjectNode`, `SkillNode` interfaces

## Node Types

| Type | Geometry | Default Radius | Color Source |
|------|----------|---------------|--------------|
| Project | Octahedron | 1.1 (increased) | `project.color` |
| Skill | Tetrahedron | 1.3 (increased) | `skill.color` (per area) |

## Dimming & Interaction

- Dimmed opacity: 0.3 (when another node is selected and not connected)
- Featured node: never dimmed, oscillates 1.0–1.25 scale
- Hover: scale 1.3x, emissive 1.4
- Selected: scale 1.6x, emissive 1.4, expanding ring animation

## Design Tokens

Colors defined in `src/styles/globals.css` under `@theme`:
- `--color-star-gold: #F59E0B` — healthcare, projects
- `--color-nebula: #22D3EE` — data-science, web-dev
- `--color-node-cloud: #A78BFA` — blockchain, cloud
- `--color-node-ai: #FB7185` — AI/ML
- `--color-node-cycling: #34D399` — cycling, security
- `--color-node-consulting: #E2E8F0` — consulting
