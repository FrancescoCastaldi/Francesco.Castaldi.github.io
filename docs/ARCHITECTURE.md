# Architecture & Infrastructure (Portfolio)

Questo documento traccia le scelte architetturali, i vincoli e le metodologie di deployment del portfolio personale. Serve come *Single Source of Truth* per capire come è stato costruito il sito e come viene servito.

## Panoramica

Il sito è costruito utilizzando un framework React moderno (**Next.js**) ed è compilato come sito puramente statico (SSG). Non c'è alcun backend attivo o database in produzione.

## Scelte Architetturali

| Componente | Tecnologia | Rationale |
|---|---|---|
| **Core Framework** | Next.js 16 (App Router) | Permette il routing basato su filesystem e la generazione statica tramite `output: "export"`. |
| **Styling** | Tailwind CSS v4 | Styling puramente basato su utility classes. Veloce, zero configurazioni complesse per temi dark/light. |
| **Language** | TypeScript | Type safety forte per evitare errori a runtime durante la renderizzazione statica dei dati del portfolio. |
| **State Management** | React Context API | Usata solo per il `LanguageProvider` (Italiano/Inglese), evitando dipendenze pesanti come Redux o Zustand. |
| **Dati** | File Locali (`src/data/*.ts`) | Il portfolio è "Databaseless". I contenuti (markdown dei progetti, array delle skill) sono hardcoded per azzerare la latenza e i costi di infrastruttura. |

## Modello di Rendering: SSG (Static Site Generation)

A causa della natura di un portfolio (lettura intensiva, aggiornamenti rari), il sito utilizza la direttiva `output: "export"` nel `next.config.mjs`.

- Durante il build time, Next.js legge tutti i file in `src/data` e pre-renderizza ogni rotta in file HTML puri.
- Le immagini e gli asset vengono copiati direttamente senza ottimizzazioni dinamiche lato server (poiché non supportate dall'export statico puro senza server node).
- Nessun SSR (Server-Side Rendering).

## CI/CD e Deployment Strategy

Il sito è ospitato su **GitHub Pages**.

1. **Il Trigger**: Ogni push sul branch `master` può attivare manualmente (o tramite trigger configurabili) la GitHub Action.
2. **Il Workflow (`.github/workflows/deploy.yml`)**:
   - Effettua il checkout del codice.
   - Installa Node.js e le dipendenze via `npm install`.
   - Lancia `npm run build` (che internamente lancia `next build`).
   - Prende la cartella di output (`out/`) e la fa un-deploy direttamente sull'infrastruttura globale di GitHub Pages.
3. **Vantaggi**:
   - Zero costi di hosting.
   - Distribuzione tramite CDN di GitHub.
   - Pieno controllo sul workflow di build (CI).

## Sicurezza e Performance

- Poiché non esiste un database, **non c'è superficie di attacco backend** (es. no SQL injection).
- La formattazione Markdown viene iniettata tramite string-replace rigorosamente controllato prima di chiamare `dangerouslySetInnerHTML`, minimizzando i rischi di XSS per contenuti che, in ogni caso, sono scritti solo dall'autore della repository.
- Il design supporta nativamente *prefers-reduced-motion* per l'accessibilità visiva (UUXD).

## Lavori Futuri (Future Work)

Se il progetto dovesse scalare, si potrebbero considerare i seguenti step:
- Migrazione dei contenuti `src/data/*.ts` su un Headless CMS (es. Sanity o Strapi) conservando però l'SSG.
- Internazionalizzazione tramite moduli ufficiali Next.js i18n invece di un semplice Context Provider lato client.
