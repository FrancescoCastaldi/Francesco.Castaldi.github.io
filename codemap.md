# Codemap: Portfolio Repository

Questa mappa descrive l'organizzazione del codice sorgente del portfolio personale ("The Sculpted Atlas"). Serve come punto di ingresso per orientarsi rapidamente all'interno della codebase.

## Albero delle Directory Principali

Il codice sorgente si trova interamente sotto la cartella `src/`.

```
src/
├── app/          # Next.js App Router (Rotte statiche, Pagine, Layout)
├── components/   # Componenti React riutilizzabili
│   ├── experience/ # Scena 3D Three.js / React Three Fiber (Scultura lamellare, paesaggio, costellazione)
│   ├── layout/     # Header e Footer
│   ├── portfolio/  # Sezioni DOM della Home 3D (Hero, Numbers, Showcase, Archive, Expertise, Contact)
│   └── ui/         # Componenti UI 2D condivisi (Breadcrumb, ProjectCard, ecc.)
├── context/      # Context Provider (es. Gestione Lingua globale)
├── data/         # Dati statici (portfolio.ts, projects.ts, skills.ts, blog-posts.ts)
├── hooks/        # Custom React Hooks (useExperienceQuality, useScrollStage, useReducedMotion)
├── lib/          # Logica pura di derivazione e configurazione 3D
│   └── portfolio/  # derive.ts, scene-config.ts
└── styles/       # Fogli di stile globali e variabili CSS (globals.css, token palette e tipografia)
```

## Dettaglio dei Moduli

### 1. App Router (`src/app/`)
Contiene le pagine pubbliche e il routing dell'applicazione (export statico `output: "export"`).
- **`layout.tsx`**: Layout radice con font self-hosted (Fraunces & Manrope), Header, Footer e `LanguageProvider`. Zero chiamate esterne a Google Fonts.
- **`page.tsx`**: Home Page con architettura ibrida 3D WebGL / DOM progressivo ("The Sculpted Atlas").
- **`project/`**: Pagine dinamiche dei singoli progetti del portfolio (`[slug]/page.tsx`) con rendering ad alto contrasto 2D.
- **`skill/`**: Pagine dinamiche delle competenze (`[id]/page.tsx`) con evidenziazione progetti correlati.
- **`contact/`**: Pagina contatti 2D.
- **`not-found.tsx`**: Pagina 404 coerente con la palette del design system.

### 2. Experience 3D (`src/components/experience/`)
Motore 3D per la homepage basato su Three.js e React Three Fiber.
- **`ExperienceCanvas.tsx`**: Host WebGL con gestione performance, fallback per hardware limitato / reduced motion e sincronizzazione dello scroll.
- **`LamellarSculpture.tsx`**: Scultura lamellare ispirata alle sezioni CAD della biella motore Toyota M15A.
- **`ImpactLandscape.tsx`**: Paesaggio di barre geometriche proporzionali ai progetti per area.
- **`StageFraming.tsx`**: Cornici prospettiche e quinte di scena per la vetrina progetti.
- **`ConstellationGraph.tsx`**: Grafo nodale interattivo delle competenze derivato dalle relazioni con i progetti.

### 3. Sezioni Portfolio DOM (`src/components/portfolio/`)
Interfaccia semantica accessibile sovrapposta e coordinata con la scena 3D:
- **`PortfolioHero.tsx`**: Hero section con headline `Systems, shaped with care.`
- **`PortfolioNumbers.tsx`**: Dati di impatto, distribuzione per practice area e dichiarazioni di carriera verificate (D5/D6).
- **`PortfolioShowcase.tsx`**: Vetrina prospettica con i 12 progetti curati, controlli da tastiera e swipe.
- **`PortfolioArchive.tsx`**: Archivio completo di tutti i 15 progetti raggruppati per area.
- **`PortfolioExpertise.tsx`**: Esploratore delle 11 competenze e interconnessioni.
- **`PortfolioContact.tsx`**: Chiusura sobria con CTA diretta e riferimenti professionali.

### 4. Gestione Dati e Derivazione (`src/data/` e `src/lib/portfolio/`)
- **`src/data/portfolio.ts`**: Single Source of Truth per progetti, skill, practice areas, metriche verificate e dichiarazioni d'autore (D5/D6).
- **`src/lib/portfolio/derive.ts`**: Motore di calcolo puro che valida e deriva distribuzioni, conteggi, legami bidirezionali e coerenza referenziale.
- **`src/lib/portfolio/scene-config.ts`**: Configurazione delle posizioni di camera, palette 3D, parametri di interpolazione e materiali.

### 5. Styles & Assets (`src/styles/` e `public/assets/portfolio/fonts/`)
- **`globals.css`**: Configurazione dei token di colore (Carbone `#0E100F`, Antracite `#2A2D2B`, Verde pino `#1F3329`, Arancione bruciato `#C1622D`, Grigio pietra `#C9C5BC`, Avorio `#EDE8DE`).
- **`fonts/`**: File font WOFF2 self-hosted con licenza OFL (Fraunces e Manrope).
