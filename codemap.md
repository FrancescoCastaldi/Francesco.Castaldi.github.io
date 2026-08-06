# Codemap: Portfolio Repository

Questa mappa descrive l'organizzazione del codice sorgente del portfolio personale. Serve come punto di ingresso per orientarsi rapidamente all'interno della codebase.

## Albero delle Directory Principali

Il codice sorgente si trova interamente sotto la cartella `src/`.

```
src/
├── app/          # Next.js App Router (Rotte, Pagine, Layout)
├── components/   # Componenti React riutilizzabili (UI e Layout)
├── context/      # Context Provider (es. Gestione Lingua globale)
├── data/         # Dati statici (Progetti, Skill, Post, Traduzioni)
├── hooks/        # Custom React Hooks (es. Reduced Motion per accessibilità)
└── styles/       # Fogli di stile globali e variabili CSS
```

## Dettaglio dei Moduli

### 1. App Router (`src/app/`)
Contiene le pagine pubbliche e il routing dell'applicazione.
- **`layout.tsx`**: Il layout principale che avvolge l'intera app, includendo l'Header, il Footer e il `LanguageProvider`.
- **`page.tsx`**: La Home Page (Hero Section, elenco skill, progetti in evidenza).
- **`blog/`**: Gestisce il listing dei post (`page.tsx`) e il dettaglio dinamico del singolo articolo (`[slug]/page.tsx`).
- **`project/`**: Pagine dinamiche dei singoli progetti del portfolio (`[slug]/page.tsx`) con rendering avanzato del Markdown.
- **`skill/`**: Pagine dinamiche delle skill (`[id]/page.tsx`).
- **`contact/`**: Pagina dei contatti.

### 2. Components (`src/components/`)
Divisi in logica strutturale e UI pura.
- **`layout/`**: `Header.tsx` (navigazione principale, toggle lingua) e `Footer.tsx`.
- **`ui/`**: 
  - `ProjectCard.tsx`, `SkillCard.tsx`: Card visive per gli elenchi.
  - `HeroSection.tsx`: Componente introduttivo della home.
  - `InteractiveLink.tsx`, `Breadcrumb.tsx`: Elementi interattivi e di navigazione secondaria.

### 3. Gestione dello Stato e Dati (`src/context/` e `src/data/`)
- **`LanguageContext.tsx`**: React Context per il toggle istantaneo Inglese/Italiano.
- **`data/`**: Questo portfolio è "Serverless/Databaseless". Tutti i contenuti (testi, URL immagini, link GitHub) risiedono staticamente qui:
  - `projects.ts`: I contenuti dei progetti (con formattazione UUXD).
  - `blog-posts.ts`: Gli articoli del blog.
  - `skills.ts`: Le abilità tecniche classificate.
  - `translations.ts`: Dizionario di traduzione (i18n).

### 4. Styles (`src/styles/`)
- **`globals.css`**: Configurazione base di Tailwind, custom properties (colori spaziali, font, background gradient) e classi di utilità.
