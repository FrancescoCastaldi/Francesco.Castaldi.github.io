---
name: md-codemap-analyzer
description: Skill specializzata per scansionare, leggere e sintetizzare TUTTI i file Markdown (.md, .mdx) del progetto e le codemap di architettura (es. codemap.md). Estrae regole, convenzioni, struttura dei moduli, decisioni architetturali, status corrente e incongruenze, fornendo un report esecutivo elegante e altamente strutturato. Usa questa skill quando l'utente chiede di "analizzare i file md", "analizzare la codemap", "analizzare la documentazione", "fare una panoramica della repo basata sui doc" o "verificare la coerenza della documentazione".
---

# md-codemap-analyzer

## Overview

Questa skill esegue un'analisi approfondita, elegante e coordinata di **tutti i file Markdown (`.md`, `.mdx`)** e delle **codemap** del progetto (es. `codemap.md`). Il suo obiettivo è fornire una visione d'insieme strutturata ed esecutiva senza perdersi nei dettagli del codice sorgente grezzo, identificando vincoli architetturali, linee guida per sviluppatori, mappa dei moduli, status dei task ed eventuali disallineamenti tra documenti.

Principio Guida: **Discovery -> Classification -> Extraction -> Cross-Verification -> Executive Synthesis.**

---

## When to Use

Attiva questa skill nei seguenti casi:
- L'utente chiede di analizzare o riassumere i file `.md` o la documentazione del progetto.
- L'utente chiede di esplorare o verificare la `codemap.md` e la struttura dei moduli.
- Si vuole un audit di coerenza tra la documentazione (`docs/`, `AGENTS.md`, `README.md`) e la codemap di progetto.
- Durante l'onboarding o l'inizio di una nuova sessione di lavoro per comprendere regole, vincoli e roadmap descritti nei file `.md`.

---

## Do NOT Use For

| Esigenza | Usa invece |
|---|---|
| Generazione ex-novo di un file `codemap.md` per una nuova codebase | Skill `codemap` |
| Creazione o modifica di post/contenuti del blog senza audit generale | Skill `content-manager` |
| Analisi statica/dinamica del codice sorgente TypeScript/Python/ecc. | Skill `codebase-analyzer` |
| Refactoring coordinato su più file di codice | Skill `codebase-refactorer` |

---

## Workflow di Esecuzione

### Fase 1: Discovery (Scansione Totale)
1. Individua tutti i file `.md` e `.mdx` nel progetto.
2. Escludi tassativamente cartelle esterne o temporanee:
   - `node_modules/`, `.git/`, `.next/`, `dist/`, `out/`, `build/`, `.gemini/`, `.antigravity-ide/`.
3. Compila un inventario completo dei file trovati con relativi percorsi relativi ed assoluti.

### Fase 2: Classificazione & Prioritizzazione
Organizza i file individuati nei seguenti gruppi funzionali:
1. **Regole & Istruzioni Agent** (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) -> *Priorità Massima*
2. **Codemap & Architettura** (`codemap.md`, `docs/ARCHITECTURE.md`) -> *Priorità Massima*
3. **Documentazione Principale & Onboarding** (`README.md`, `docs/CONTRIBUTING.md`, `design/styleguide.md`) -> *Priorità Alta*
4. **Piani & Tracciamento** (`ANALYSIS_PLAN.md`, `CHANGELOG.md`, `TODO.md`, note operative) -> *Priorità Media*
5. **Skill Local & Custom Docs** (`.agents/skills/**/*.md`, altri `.md` specifici) -> *Priorità Contesto*

### Fase 3: Estrazione Sistematica dei Contenuti
Leggi i file seguiti dall'ordine di priorità:
- **Lettura Integrale**: Leggi completamente i file di priorità Massima e Alta.
- **Skim Mode (Token Budget Control)**: Se un file supera le 300 righe o se ci sono più di 15 file `.md`, leggi l'intestazione, il sommario (TOC) e le sezioni chiave (primi 50 righe + sezioni con titoli `H1`/`H2`).
- Durante la lettura, estrai:
  - Scopo e dominio del progetto.
  - Moduli, entry points e confini di dipendenza.
  - Regole tassative e convenzioni di codice/stile.
  - Decisioni architetturali (es. export statico, CI/CD, framework usati).
  - Status attuale e roadmap.

### Fase 4: Analisi Specifica della Codemap (`codemap.md`)
Se è presente un file `codemap.md` (o simile):
1. Estrai la mappa gerarchica dei componenti e dei pacchetti.
2. Identifica le responsabilità di ogni sotto-sistema.
3. Rileva le dipendenze consentite o vietate tra i vari moduli.
4. Mappa le entry-point principali dell'applicazione (es. `src/app/`, routing, layout).

### Fase 5: Cross-Verification & Detection Incongruenze
Verifica incrociata tra le diverse fonti Markdown:
- **Discrepanze di Versione/Stack**: Es. il README menziona una versione/libreria diversa rispetto a `AGENTS.md` o `package.json`.
- **Link o Riferimenti Rotti**: Documenti che citano file `.md` o script npm inesistenti.
- **Conflitti di Regole**: Regole in `AGENTS.md` che contraddicono `docs/ARCHITECTURE.md` o `styleguide.md`.
- **Documentazione Obsoleta**: File con note temporanee o datate non aggiornate.

### Fase 6: Generazione del Report Finale
Formatta la risposta in Markdown in modo elegante, pulito e leggibile, seguendo il template riportato di seguito.

---

## Template Report Finale

```markdown
# 📊 Audit & Analisi Documentale (.md + Codemap)

> **Progetto:** [Nome Progetto / Repo]
> **Data Analisi:** [Data Corrente]
> **File Analizzati:** [N. File Trovati] file Markdown

---

## 🎯 Executive Summary
[Breve sintesi in 2-4 frasi dello scopo del progetto, dello stato della documentazione e del livello di copertura dell'architettura.]

---

## 🗺️ Mappa della Codebase & Architettura (da `codemap.md` e Docs)
- **Entry Points:** `[es. src/app/layout.tsx, src/app/page.tsx]`
- **Moduli Principali:**
  - `[Modulo 1]`: [Descrizione e responsabilità]
  - `[Modulo 2]`: [Descrizione e responsabilità]
- **Vincoli & Dipendenze:** [Confini di sistema e regole di importazione]

---

## 📋 Regole, Convenzioni & Decisioni Chiave
| Documento Sorgente | Regola / Decisione Principale | Ambito |
|---|---|---|
| [`AGENTS.md`](file:///...) | [Descrizione regola] | Agent & Build |
| [`docs/ARCHITECTURE.md`](file:///...) | [Descrizione decisione] | Infrastruttura |
| [`design/styleguide.md`](file:///...) | [Linee guida estetiche/CSS] | Frontend/UI |

---

## 🔍 Incongruenze & Segnali di Attenzione (Staleness Report)
- ⚠️ **[Tipo Anomalia]**: [Dettaglio dell'incongruenza o link rotto tra file `.md`]
- ℹ️ **[Nota/TODO]**: [Task o spec sospese trovate nei file `.md`]

---

## 🚀 Punti di Partenza Consigliati (Where to Start)
1. **Per lo Sviluppo Frontend:** [Indicazione file da consultare]
2. **Per Modifiche Architetturali:** [Indicazione file da consultare]
3. **Per la Gestione dei Contenuti:** [Indicazione file da consultare]

---
```

---

## Regole Tassative per l'Agent

1. **Uso dei Link Markdown Reali**: Tutti i riferimenti ai file devono includere link cliccabili col formato `[basename](file:///path/assoluto/file.md)`.
2. **Zero Modifiche Improprie**: Questa skill è di sola lettura/analisi. Non modificare i file `.md` senza esplicita richiesta dell'utente.
3. **Chiarezza Visiva & Elegante**: Usa tabelle, alert di GitHub (`> [!NOTE]`, `> [!IMPORTANT]`), elenchi puntati puliti e formattazione impeccabile.
4. **Lingua**: Rispondi sempre nella lingua dell'utente (Italiano per default in questa configurazione).
