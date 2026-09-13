# Architecture & Infrastructure (Portfolio «The Sculpted Atlas»)

Questo documento traccia le scelte architetturali, i vincoli e le metodologie di deployment del portfolio personale. Serve come *Single Source of Truth* per capire come è stato costruito il sito e come viene servito.

## Panoramica

Il sito è costruito con **Next.js 16 (App Router)** ed è compilato come sito puramente statico (SSG via `output: "export"` nella directory `out/`).
Combina una homepage esperienziale interattiva 3D WebGL («The Sculpted Atlas») con pagine interne ad alte prestazioni puramente 2D. Non è presente alcun backend attivo o database in produzione.

## Scelte Architetturali

| Componente | Tecnologia | Rationale |
|---|---|---|
| **Core Framework** | Next.js 16 (App Router) | Routing basato su filesystem e generazione statica tramite `output: "export"`. |
| **Motore 3D** | Three.js, React Three Fiber, Drei | Esperienza visiva 3D integrata nel ciclo di vita React, con gestione fine del framerate e del contesto GPU. |
| **Smooth Scroll & Animazione** | Lenis, GSAP ScrollTrigger | Scorrimento fluido sincronizzato con il progresso della camera 3D e il cambio di fase visivo. |
| **Styling** | Tailwind CSS v4 | Utility classes con token di design system («The Sculpted Atlas»): Carbone, Antracite, Verde pino, Arancione bruciato, Grigio pietra, Avorio. |
| **Tipografia** | Fraunces & Manrope (WOFF2 self-hosted) | Zero chiamate esterne di rete (Google Fonts rimosso). Font self-hosted in `public/assets/portfolio/fonts/`. |
| **Language** | TypeScript | Type safety rigorosa per modelli di dati, derivazioni e costrutti 3D. |
| **Dati & Derivazione** | `src/data/portfolio.ts` + `src/lib/portfolio/derive.ts` | Single Source of Truth statica con pipeline di validazione referenziale e calcolo distribuzioni a build-time. |

## Modello di Rendering: SSG (Static Site Generation)

Il sito utilizza la direttiva `output: "export"` in `next.config.ts`:

- A build time, Next.js valuta tutti i moduli statici ed esporta 31 pagine HTML pure nella directory `out/` (Home, 15 progetti, 11 skill, 5 rotte di supporto).
- Le immagini e gli asset WOFF2 vengono copiati direttamente nella cartella `out/` senza server di trasformazione dinamica.
- Webpack opera con `config.cache = false;` per garantire massima compatibilità e stabilità durante l'esportazione su ambienti Windows.

## CI/CD e Deployment Strategy

Il sito è ospitato su **GitHub Pages**.

1. **Workflow (`.github/workflows/deploy.yml`)**:
   - Checkout del repository.
   - Installazione pulita dipendenze con Node.js.
   - Esecuzione `npm run build` (Next.js static export).
   - Pubblicazione della directory `out/` sulla CDN di GitHub Pages.
2. **Politica di rilascio**:
   - Nessun commit automatico o push sul remote senza autorizzazione esplicita dell'utente.

## Accessibilità e Fallback Progressivo

- Supporto per `prefers-reduced-motion`: disattivazione immediata del ciclo di animazione 3D e di Lenis, transizione a scorrimento nativo e visualizzazione 2D statica.
- Fallback WebGL: in assenza di supporto GPU o in caso di perdita di contesto WebGL, il canvas viene smontato e sostituito da un layout CSS puro ad alto contrasto.
- Conformità contrasto colori WCAG: contrasti elevati (Avorio/Carbone 15,64:1, Pietra/Carbone 11,09:1).
