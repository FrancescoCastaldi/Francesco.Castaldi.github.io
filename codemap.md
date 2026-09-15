# Codemap: Portfolio Repository

Questa mappa descrive l'organizzazione del codice sorgente del portfolio personale ("The Sculpted Atlas"). Serve come punto di ingresso per orientarsi rapidamente all'interno della codebase.

## Albero delle Directory Principali

Il codice sorgente si trova interamente sotto la cartella `src/`.

```
src/
├── app/          # Next.js App Router (Rotte, API /api/github, Layout con ExperienceShell)
├── components/   # Componenti React riutilizzabili
│   ├── experience/ # Scena 3D Three.js / R3F (ExperienceShell, SceneDirector, Atlas, Landscape, Project & Skill scenes)
│   ├── layout/     # Header e Footer
│   ├── portfolio/  # Sezioni DOM della Home (Hero, Numbers, Gallery, Archive, Expertise, Contact)
│   └── ui/         # Componenti UI 2D condivisi (Breadcrumb, ProjectCard, HeritageIcon, ecc.)
├── context/      # Context Provider (SceneContext per coordinamento 3D globale)
├── data/         # Dati canonici (portfolio.ts, projects.ts, skills.ts, github-snapshot.json)
├── hooks/        # Custom React Hooks (useExperienceQuality, useTabVisibility)
├── lib/          # Logica pura di derivazione e adapter server-only
│   ├── github/   # Client GraphQL server-only, cache 15m, DTO sanitizzati
│   └── portfolio/# derive.ts, scene-config.ts
└── styles/       # Fogli di stile globali e variabili CSS (globals.css, token palette e tipografia)
```

## Dettaglio dei Moduli

### 1. App Router (`src/app/`)
Contiene le pagine pubbliche e il routing dell'applicazione su Vercel Native Runtime (Node.js 22).
- **`layout.tsx`**: Layout radice con font self-hosted, `SceneProvider`, `GlobalExperience`, Header, Footer.
- **`page.tsx`**: Home Page con architettura ibrida 3D WebGL / DOM progressivo ("The Sculpted Atlas").
- **`project/`**: Pagine dinamiche dei 15 progetti (`[slug]/page.tsx`) con rendering DOM semantico e sfondo 3D parametrico.
- **`skill/`**: Pagine dinamiche delle 11 competenze (`[id]/page.tsx`) coordinate con il 3D Living Graph.
- **`contact/`**: Pagina contatti con camera focale e micro-drift 3D.
- **`not-found.tsx`**: Pagina 404 coerente con matrice wireframe fratturata 3D.
- **`api/github/route.ts`**: Endpoint pubblico sanitizzato con cache a 15 minuti.

### 2. Experience 3D (`src/components/experience/`)
Motore 3D globale persistente basato su Three.js e React Three Fiber.
- **`ExperienceShell.tsx`**: Host WebGL globale a schermo intero montato in `layout.tsx`, gestione DPR e visibilità tab.
- **`SceneDirector.tsx`**: Macchina a stati legata alle rotte Next.js e al `SceneContext` per camera e orchestrazione scene.
- **`AdaptiveQuality.tsx`**: Monitor FPS e DPR adattivo sotto i 45 FPS per salvaguardare le performance GPU.
- **`scenes/HeroSculpture.tsx`**: Scultura cinetica per la hero della homepage.
- **`scenes/ImpactLandscape.tsx`**: Paesaggio di barre geometriche + griglia estrusa 3D ad alte prestazioni (InstancedMesh a draw-call singola) del calendario contributivo GitHub.
- **`scenes/ProjectStage.tsx`**: Vetrina prospettica dei progetti curati.
- **`scenes/SkillsConstellation.tsx`**: Costellazione orbitale nodale delle competenze.
- **`scenes/ProjectParametricScene.tsx`**: Scena parametrica tecnica dedicata ai singoli progetti per area (cinematica, tensori AI, griglie).
- **`scenes/SkillLivingGraphScene.tsx`**: Grafo nodale vivente per la singola competenza con anelli orbitali di progetti e tecnologie collegate.
- **`scenes/ContactRoomScene.tsx`**: Camera architettonica minimale con micro-drift.
- **`scenes/NotFoundScene.tsx`**: Matrice wireframe frammentata con particelle disallineate che si riallineano su hover del tasto di ritorno.
- **`ResourceCleaner.ts`**: Utility di dispose ricorsivo per prevenire leak di memoria GPU su geometrie, materiali e texture.

### 3. Server-Only GitHub Adapter (`src/lib/github/`)
- **`client.server.ts`**: Client GraphQL server-only protetto da `import 'server-only'`. Zero leak del token.
- **`cache.ts`**: Cache in-memory con TTL 900s (15 min) e fallback garantito.
- **`types.ts`**: Contratti di tipo per GraphQL e DTO pubblico sanitizzato.
- **`src/data/github-snapshot.json`**: Dataset statico offline di fallback verificato.

### 4. Gestione Dati e Derivazione (`src/data/` e `src/lib/portfolio/`)
- **`src/data/portfolio.ts`**: Single Source of Truth per progetti, skill, practice areas, metriche verificate (D5/D6) e mapping repository con flag `owned` vs `upstream`.
- **`src/lib/portfolio/derive.ts`**: Motore di calcolo puro che valida e deriva distribuzioni, conteggi, legami bidirezionali e coerenza referenziale.
- **`src/lib/portfolio/scene-config.ts`**: Configurazione delle posizioni di camera, palette 3D, parametri di interpolazione e materiali.

### 5. Styles & Assets (`src/styles/` e `public/assets/portfolio/fonts/`)
- **`globals.css`**: Configurazione dei token di colore (Carbone `#0E100F`, Antracite `#2A2D2B`, Verde pino `#1F3329`, Arancione bruciato `#C1622D`, Grigio pietra `#C9C5BC`, Avorio `#EDE8DE`).
- **`fonts/`**: File font WOFF2 self-hosted con licenza OFL (Fraunces e Manrope).
