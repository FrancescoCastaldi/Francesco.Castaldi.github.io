# Piano Esecutivo: Portfolio Immersivo 3D Data-Driven (Factory Agent Mission)

> **Documento Guida per l'Implementazione**  
> **Target Architetturale:** Next.js 16.2.x (App Router, Vercel Runtime Nativo) + React 19 + Three.js / React Three Fiber + GitHub GraphQL Server-Only  
> **Origine Piano:** Factory Droid Mission (`62e2fb22-f6bd-4e5e-b3e0-ceb53dd0399a`)  
> **Dominio Canonico di Produzione:** `https://francescocastaldi.it` (Apex canonical, `www` redirect)

---

## Indice dei Contenuti
1. [Visione & Invarianti Fondamentali](#1-visione--invarianti-fondamentali)
2. [Architettura del Sistema](#2-architettura-del-sistema)
3. [Roadmap a Milestone](#3-roadmap-a-milestone)
   - [Milestone 1: Fondazione Dati & Runtime Vercel](#milestone-1-fondazione-dati--runtime-vercel)
   - [Milestone 2: Esperienza 3D Immersiva Globale](#milestone-2-esperienza-3d-immersiva-globale)
   - [Milestone 3: Hardening, Release Vercel & Migrazione DNS](#milestone-3-hardening-release-vercel--migrazione-dns)
4. [Specifiche di Dettaglio dei Contratti Operativi](#4-specifiche-di-dettaglio-dei-contratti-operativi)
   - [Contratto A: Runtime, API GitHub & Sicurezza](#contratto-a-runtime-api-github--sicurezza)
   - [Contratto B: ExperienceShell & Gestione GPU/WebGL](#contratto-b-experienceshell--gestione-gpuwebgl)
   - [Contratto C: Scena 3D Homepage (Atlas, Landscape & Constellation)](#contratto-c-scena-3d-homepage-atlas-landscape--constellation)
   - [Contratto D: Scene Dinamiche dei 15 Progetti](#contratto-d-scene-dinamiche-dei-15-progetti)
   - [Contratto E: Grafo 3D delle 11 Competenze](#contratto-e-grafo-3d-delle-11-competenze)
   - [Contratto F: Ambienti Contatti & 404](#contratto-f-ambienti-contatti--404)
   - [Contratto G: Strategia di Rilascio & Migrazione DNS Aruba ➔ Vercel](#contratto-g-strategia-di-rilascio--migrazione-dns-aruba--vercel)
5. [Quality Gates, Test Suite & Criteri di Accettazione](#5-quality-gates-test-suite--criteri-di-accettazione)
6. [Checklist Operativa di Esecuzione (Stasera)](#6-checklist-operativa-di-esecuzione-stasera)

---

## 1. Visione & Invarianti Fondamentali

Trasformare il portfolio da un layout prevalentemente 2D con isola 3D confinata alla sola home («The Sculpted Atlas») a un'**esperienza 3D tecnica, futuristica e data-driven coerente su tutte le superfici pubbliche**:
- **Homepage**: Sistema/atlante guidato dai dati editoriali + paesaggio di attività contributiva GitHub + costellazione interattiva.
- **15 Pagine Progetto (`/project/[slug]`)**: Scena 3D parametrica derivata da area tematica, stack, competenze, repository associati e metriche.
- **11 Pagine Competenze (`/skill/[id]`)**: Grafo 3D delle connessioni viventi tra competenze, progetti e linguaggi.
- **Pagine Contatti & 404**: Ambienti 3D dedicati, leggeri e contestuali.

### 🛡️ I 13 Invarianti Non Negoziabili
1. **Runtime Vercel Nativo**: Rimozione definitiva di `output: "export"`. Next.js opera con App Router su Node.js 22.x, con prerendering dove gli input editoriali sono finiti.
2. **GitHub come Sorgente di Verità del Codice**: GitHub resta il repository Git; Vercel diventa l'unico host di produzione dopo il cutover.
3. **Integrità Editoriale**: Titoli, descrizioni, biografia, ruoli dichiarati, 15 progetti e 11 competenze rimangono intatti e canonici. I dati GitHub arricchiscono, non riscrivono.
4. **Server Components per il Contenuto, Client Islands per il 3D**: Il DOM semantico e il SEO sono renderizzati via React Server Components. Il canvas 3D è isolato in un'isola client (`ExperienceShell`). Vietato spostare l'intero albero sotto un unico `'use client'`.
5. **Identità Visiva Coerente**: Linguaggio visivo "Data-Visualization Tecnico / Futuristico", eliminando il dualismo Heritage/Futuristic.
6. **DOM Semantico Sovrano (A11y)**: Ogni informazione e azione presente nel canvas deve avere un equivalente accessibile nel DOM (lettori di schermo, navigazione da tastiera).
7. **Resilienza alle Dipendenze Esterne**: Un'interruzione o rate-limit delle API GitHub **non deve mai** causare errore 500 o pagina bianca. Cache a 15 minuti + snapshot locale bundled di fallback.
8. **Dati Pubblici e Reputazione Pulita**: Vengono mostrati solo repository pubblici owned/contributed e calendari contributivi reali. Non si usano conteggi di stelle o fork come proxy di merito personale.
9. **Zero Leak del Token**: `GITHUB_GRAPHQL_TOKEN` è **server-only**. Non deve mai comparire nei bundle client, DTO di risposta, URL, log o commit.
10. **Relazioni Canoniche & Derivate**: Le relazioni progetto ➔ competenze e progetto ➔ repository sono canoniche nei file di progetto; le relazioni inverse sono pure derivazioni logiche.
11. **Geometrie Finite & Determinate**: Qualsiasi valore per vertici, telecamere, materiali o animazioni deve essere normalizzato e clampato su numeri finiti, gestendo anche dataset vuoti o anomali.
12. **Degrado Grazioso Multi-Stato**: Supporto impeccabile per: `prefers-reduced-motion`, assenza di WebGL, perdita del contesto WebGL (`webglcontextlost`), dispositivi a bassa potenza, e fallimento della rete.
13. **Routing Canonico**: `https://francescocastaldi.it` è l'apice canonico; `www` reindirizza 301 all'apice.

---

## 2. Architettura del Sistema

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                     GitHub Repository (Codice & Dati)                   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ push / preview deploy
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Vercel Next.js Runtime (Node 22)                 │
│                                                                         │
│  ┌─────────────────────────────┐       ┌─────────────────────────────┐  │
│  │ Server Components (HTML/RSC)│       │ Server-Only GitHub Adapter  │  │
│  │ - Pagine prerenderizzate    │       │ - GraphQL Client + PAT      │  │
│  │ - JSON-LD, Metadati SEO     │       │ - Cache ISR / In-memory 15m │  │
│  │ - DOM Semantico accessibile │       │ - Fallback Snapshot Bundled │  │
│  └──────────────┬──────────────┘       └──────────────┬──────────────┘  │
│                 │                                     │                 │
│                 │      ┌──────────────────────────────┘                 │
│                 │      ▼ DTO Pubblico Sanitizzato (GET /api/github)     │
│                 ▼      ▼                                                │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │               Client Island: Global ExperienceShell               │  │
│  │                                                                   │  │
│  │  ┌───────────────────────────┐     ┌───────────────────────────┐  │  │
│  │  │   Scene Director Engine   │     │ Adaptive GPU & Lifecycle  │  │  │
│  │  │   - Home: Atlas/Constell. │     │ - DPR clamping (1.0 - 1.75│  │  │
│  │  │   - Project: Arch Spec    │     │ - Tab visibility pause    │  │  │
│  │  │   - Skill: Living Graph   │     │ - Reduced motion fallback │  │  │
│  │  │   - Contact & 404 Rooms   │     │ - Context lost recovery   │  │  │
│  │  └───────────────────────────┘     └───────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Roadmap a Milestone

### Milestone 1: Fondazione Dati & Runtime Vercel
- [ ] **Configurazione Next.js**: Rimuovere `output: "export"` da `next.config.ts`. Mantenere compatibilità Windows Webpack (`--webpack`) solo dove necessario.
- [ ] **Build & Typecheck**: Riattivare il controllo tipi TypeScript bloccante in `next build` (zero errori consentiti).
- [ ] **Data Model Normalization**: Pulire `src/data/portfolio.ts` e le relazioni bi-direzionali. Implementare mapping esplicito progetto ➔ repo (con flag `owned` vs `upstream`).
- [ ] **GitHub GraphQL Adapter**: Creare `src/lib/github/` con guardia `import 'server-only'`. Query ottimizzata:
  - Repository pubblici dell'utente con byte linguaggi, topic, date di aggiornamento.
  - Calendario contributivo dell'ultimo anno (giorno per giorno).
  - Cache di 15 minuti con validazione schema via Zod / schema tipizzato.
  - Snapshot statico offline (`src/data/github-snapshot.json`) per fallback immediato.
- [ ] **Endpoint DTO**: Creare route handler `GET /api/github` che restituisce esclusivamente dati pubblici e formattati, senza metadati privati o token.
- [ ] **Testing Foundation**: Installare ed abilitare Vitest, React Testing Library e fixture deterministiche per la validazione delle derivazioni geometriche e dei dati.

### Milestone 2: Esperienza 3D Immersiva Globale
- [ ] **Architettura `ExperienceShell`**:
  - Posizionato nel Root Layout (`src/app/layout.tsx`) come tela persistente o coordina scena.
  - Sincronizzazione con il router Next.js per transizioni fluide di camera e materiali tra route diverse.
  - Gestione GPU: DPR ridotto su mobile, stop del rendering (`frameloop="never"`) quando il tab non è visibile (`document.visibilityState === 'hidden'`).
- [ ] **Homepage 3D («Data-Atlas & Constellation»)**:
  - **Fase 1 (Hero)**: Atlante geometrico guidato dalle metriche e dai progetti principali.
  - **Fase 2 (Attività)**: Rilievo 3D (landscape/heatmap prismatica) del calendario contributivo GitHub.
  - **Fase 3 (Showcase)**: Costellazione orbitale di nodi interattivi (progetti, linguaggi, topic).
- [ ] **Pagine Progetto (`/project/[slug]`)**:
  - Scena 3D dedicata che istanzia una "scultura tecnica" o topologia parametrica generata dallo stack tecnologico e dall'area (Embedded/Robotics, Health Digital, Cloud/Distributed, Algorithmic AI).
- [ ] **Pagine Competenze (`/skill/[id]`)**:
  - Grafo tridimensionale interattivo che posiziona la competenza al centro ed evidenzia le connessioni elastiche verso i progetti che la impiegano e i linguaggi correlati.
- [ ] **Pagine Contatti e 404**:
  - Contatti: Camera focale su ambiente geometrico sereno e focalizzato.
  - 404: Scena fratturata / wireframe de-sincronizzato con pulsante di riallineamento (ritorno alla Home).
- [ ] **A11y & Fallback**:
  - Rispetto di `window.matchMedia('(prefers-reduced-motion: reduce)')`: disattivazione animazioni orbitali complesse, transizioni statiche eleganti.
  - Fallback 2D CSS-only per browser senza WebGL o con WebGL disabilitato.

### Milestone 3: Hardening, Release Vercel & Migrazione DNS
- [ ] **SEO & Metadata**: Dynamic `generateMetadata` su progetti e skill, sitemap XML dinamica conforme a `https://francescocastaldi.it`, OpenGraph completi.
- [ ] **Audit & Performance**:
  - Lighthouse Desktop >= 95 su Performance, 100 A11y, 100 Best Practices, 100 SEO.
  - Zero memory leaks Three.js (dispose ricorsivo di geometrie, materiali e texture al cambio rotta).
- [ ] **Configurazione Vercel**:
  - Creazione progetto nel team `francescocastaldis-projects`.
  - Configurazione variabile segreta `GITHUB_GRAPHQL_TOKEN`.
  - Build su Node 22.x.
- [ ] **Migrazione DNS Aruba ➔ Vercel**:
  - Inventario totale dei record DNS attuali (MX Aruba, SPF, DKIM, DMARC, TXT).
  - Ricreazione preventiva dei record mail e di sicurezza nella zona DNS di Vercel.
  - Cutover nameserver verso `ns1.vercel-dns.com` e `ns2.vercel-dns.com` a zero downtime per la posta.
  - Mantenimento temporaneo di GitHub Pages come fallback di emergenza.

---

## 4. Specifiche di Dettaglio dei Contratti Operativi

### Contratto A: Runtime, API GitHub & Sicurezza
- **Posizione file**: `src/lib/github/`
- **File chiave**:
  - `src/lib/github/client.server.ts`: client GraphQL con guard `import 'server-only'`.
  - `src/lib/github/types.ts`: tipi DTO pubblici vs payload GraphQL grezzo.
  - `src/lib/github/cache.ts`: logica di cache con TTL 900s (15 min) e fallback snapshot.
  - `src/data/github-snapshot.json`: dataset statico di fallback verificato.
- **Parametri query**:
  ```graphql
  query PortfolioGitHubData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: [OWNER]) {
        nodes {
          name
          isFork
          updatedAt
          url
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            totalSize
            edges {
              size
              node { name color }
            }
          }
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
        }
      }
    }
  }
  ```

### Contratto B: ExperienceShell & Gestione GPU/WebGL
- **Posizione file**: `src/components/experience/`
- **Componenti chiave**:
  - `ExperienceShell.tsx`: Container canvas a schermo intero con posizionamento fisso (`pointer-events: none` globale, con interazioni abilitate solo sui nodi o tramite proxy di scroll).
  - `SceneDirector.tsx`: Macchina a stati collegata a `usePathname()` che anima camera e composizione in base alla route (`/`, `/project/*`, `/skill/*`, `/contact`, `/404`).
  - `AdaptiveQuality.tsx`: Rilevamento FPS e monitoraggio `gl.info.render`; adatta dynamic resolution e disattiva post-processing su frame rate inferiori a 45 fps.
  - `ResourceCleaner.ts`: Utility per il dispose meticoloso di mesh, buffer geometry e shader al distacco dei componenti.

### Contratto C: Scena 3D Homepage (Atlas, Landscape & Constellation)
- **Visual Phases**:
  1. **Atlas (Hero)**: Anello o scultura cinetica basata sulla ripartizione delle 4 aree operative (Embedded & Robotics, Health Digital, Cloud & Distributed, Algorithmic AI).
  2. **GitHub Activity Landscape**: Griglia 3D estrusa (altezza = numero di contributi giornalieri, colore = palette neon/tecnica) sincronizzata con i dati reali delle 52 settimane.
  3. **Showcase Constellation**: Nodi stellari 3D collegati da linee laser sottili che uniscono progetti a competenze e topic. Hovering su un nodo DOM illumina istantaneamente il corrispondente nodo 3D.

### Contratto D: Scene Dinamiche dei 15 Progetti
- Per ogni rotta `/project/[slug]`, la scena 3D adotta un'impronta geometrica distintiva:
  - **Embedded / Robotics**: Giunti cinematici, wireframe ortogonali, mesh tecniche.
  - **Health Digital**: Reticoli a voxel, curve di segnale biometrico / vettori di flusso.
  - **Cloud & Distributed Architecture**: Topologia di nodi clusterizzati, percorsi di rete mesh.
  - **Algorithmic AI**: Geometrie iperdimensionali, nuvole di punti latenti, tensori rotanti.

### Contratto E: Grafo 3D delle 11 Competenze
- Sulla rotta `/skill/[id]`:
  - Nodo centrale: La competenza selezionata.
  - Primo anello orbitale: I progetti che utilizzano direttamente questa tecnologia.
  - Secondo anello orbitale: Competenze o linguaggi frequentemente associati.
  - Interazione: Click su un nodo secondario permette navigazione diretta alla relativa pagina.

### Contratto F: Ambienti Contatti & 404
- **Contatti (`/contact`)**:
  - Atmosfera minimale ad alto contrasto, camera statica con micro-drift reattivo al puntatore.
- **404 (`/not-found`)**:
  - Matrice wireframe frammentata con particelle disallineate, che si ricompongono geometricamente quando l'utente passa sopra il link "Torna alla Home".

### Contratto G: Strategia di Rilascio & Migrazione DNS Aruba ➔ Vercel
- **Step 1**: Verifica build preview Vercel su dominio `.vercel.app`.
- **Step 2**: Dump completo della zona DNS Aruba attuale:
  - Record `A` e `CNAME`
  - Record `MX` (posta Aruba `mx.aruba.it` / priorità)
  - Record `SPF` (`v=spf1 include:_spf.aruba.it ...`)
  - Record `DKIM` e `DMARC`
- **Step 3**: Configurazione preventiva su Vercel DNS di **TUTTI** i record mail e di sicurezza prima di toccare i nameserver.
- **Step 4**: Cambio Nameserver dal pannello Aruba:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- **Step 5**: Monitoraggio propagazione DNS (TTL basso impostato preventivamente se possibile). Nessuna interruzione email garantita.

---

## 5. Quality Gates, Test Suite & Criteri di Accettazione

Prima di considerare conclusa ogni fase di sviluppo, eseguire in locale la suite di verifica completa:

```bash
# 1. Pulizia e verifica dipendenze
npm ci

# 2. Linting statico
npm run lint

# 3. Controllo tipi TypeScript (bloccante)
npm run typecheck

# 4. Unit & Integration Test
npm run test

# 5. Build di produzione
npm run build

# 6. Test di regressione sui dati storici e codifica UTF-8
node scripts/verify-heritage.mjs
node scripts/challenger-stress-suite.mjs
```

---

## 6. Checklist Operativa di Esecuzione (Stasera)

Utilizza questa lista di spunta rapida per guidare l'implementazione passo dopo passo:

### Step 1: Transizione a Vercel Runtime & Type Safety
- [ ] Modifica `next.config.ts`: rimuovi `output: "export"`.
- [ ] Rimuovi `ignoreBuildErrors: true` da `typescript` in `next.config.ts`.
- [ ] Esegui `npm run typecheck` e risolvi gli eventuali disallineamenti di tipo.

### Step 2: Modulo GitHub Server-Only
- [ ] Crea `src/lib/github/` con i file `client.server.ts`, `types.ts`, `cache.ts`.
- [ ] Genera lo snapshot iniziale `src/data/github-snapshot.json`.
- [ ] Crea la route API `src/app/api/github/route.ts`.
- [ ] Aggiungi test con Vitest in `src/lib/github/__tests__/github.test.ts`.

### Step 3: Global ExperienceShell 3D
- [ ] Crea `src/components/experience/ExperienceShell.tsx` integrato in `src/app/layout.tsx`.
- [ ] Implementa `SceneDirector.tsx` con supporto transizioni route.
- [ ] Aggiungi hook per `prefers-reduced-motion` e `webgl-detection`.

### Step 4: Refactor Scene 3D
- [ ] Collega la Homepage ai dati GitHub (paesaggio contributi).
- [ ] Adatta le pagine progetto (`/project/[slug]`) con la scena parametrica.
- [ ] Implementa il grafo 3D in `/skill/[id]`.

### Step 5: Verifica & Deploy
- [ ] Esegui l'intera sequenza di test (`lint`, `typecheck`, `test`, `build`).
- [ ] Avvia in locale con `npm run dev` (porta 3100) e verifica con il browser.
- [ ] Esegui commit semantico e push per il deploy su Vercel.
