# Architecture & Infrastructure (Portfolio «The Sculpted Atlas»)

Questo documento traccia le scelte architetturali, i vincoli e le metodologie di deployment del portfolio personale. Serve come *Single Source of Truth* per capire come è stato costruito il sito e come viene servito.

## Panoramica

Il sito è costruito con **Next.js 16 (App Router su Node.js 22)** con supporto runtime Vercel nativo e SSG prerendering di tutte le rotte editoriali finite.
Combina una suite esperienziale 3D WebGL persistente su tutte le superfici pubbliche («The Sculpted Atlas») con pagine semantiche ad alte prestazioni e un adapter GitHub server-only protetto da cache a 15 minuti e fallback offline su snapshot.

## Scelte Architetturali

| Componente | Tecnologia | Rationale |
|---|---|---|
| **Core Framework** | Next.js 16 (App Router) | Vercel Native Runtime su Node.js 22.x con prerendering SSG per le pagine statiche e Route Handler protetto per `/api/github`. |
| **Motore 3D** | Three.js, React Three Fiber, Drei | Esperienza visiva 3D integrata nel ciclo di vita React, con gestione fine del framerate, DPR dinamico adattivo e dispose sicuro delle risorse GPU. |
| **Smooth Scroll & Animazione** | Lenis, GSAP ScrollTrigger | Scorrimento fluido sincronizzato con il progresso della camera 3D e il cambio di fase visivo. |
| **Styling** | Tailwind CSS v4 | Utility classes con token di design system («The Sculpted Atlas»): Carbone, Antracite, Verde pino, Arancione bruciato, Grigio pietra, Avorio. |
| **Tipografia** | Fraunces & Manrope (WOFF2 self-hosted) | Zero chiamate esterne di rete (Google Fonts rimosso). Font self-hosted in `public/assets/portfolio/fonts/`. |
| **Language** | TypeScript | Type safety rigorosa per modelli di dati, derivazioni e costrutti 3D. |
| **Dati & Derivazione** | `src/data/portfolio.ts` + `src/lib/portfolio/derive.ts` | Single Source of Truth statica con pipeline di validazione referenziale e calcolo distribuzioni a build-time. |
| **Adapter GitHub** | `src/lib/github/` | Client GraphQL server-only (`import 'server-only'`), zero token leak e cache 900s con fallback su `github-snapshot.json`. |

## CI/CD e Deployment Strategy

Il repository funge da Single Source of Truth del codice con deployment automatico:

1. **Vercel (Produzione)**:
   - Build automatica su push al branch `master` con runtime nativo Next.js 16.
   - Dominio canonico `francescocastaldi.it` con gestione DNS e certificati SSL automatici.
2. **Workflow CI GitHub Actions (`.github/workflows/ci.yml`)**:
   - Checkout del repository.
   - Installazione pulita dipendenze con Node.js 22.
   - Esecuzione `npm run lint`, `npm run typecheck` e `npm run build`.
3. **Politica di rilascio**:
   - Incremento obbligatorio della versione semantica e di `versionCode` in `package.json` a ogni release.

## Accessibilità e Fallback Progressivo

- Supporto per `prefers-reduced-motion`: disattivazione immediata del ciclo di animazione 3D e di Lenis, transizione a scorrimento nativo e visualizzazione 2D statica.
- Fallback WebGL: in assenza di supporto GPU o in caso di perdita di contesto WebGL, il canvas viene smontato e sostituito da un layout CSS puro ad alto contrasto.
- Conformità contrasto colori WCAG: contrasti elevati (Avorio/Carbone 15,64:1, Pietra/Carbone 11,09:1).
