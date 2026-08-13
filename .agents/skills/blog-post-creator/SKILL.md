---
name: blog-post-creator
description: Skill per intervistare l'utente o prendere anche solo un breve testo di contesto, espanderlo ed elaborarlo autonomamente, generare asset multimediali originali (immagini di copertina via generate_image in public/assets/blog/[slug]/images/cover.png), verificare l'assenza di violazioni di copyright, applicare regole UUXD di legibilità e design visivo accattivante, ed inserirlo direttamente in src/data/blog-posts.ts con verifica della build.
---

# blog-post-creator

## Overview

Questa skill guida la creazione autonomo-assistita di nuovi articoli per il blog del sito. L'utente può fornire un'idea dettagliata oppure **un semplice spunto o breve contesto sintetico**. L'agent si occupa di espanderlo autonomamente, applicare un rigoroso **controllo di originalità (no violazione copyright)**, progettare la struttura SEO e le **regole di design UUXD (Universal User Experience Design)**, **generare gli asset multimediali originali** (immagine di copertina via `generate_image`), integrare il testo in `src/data/blog-posts.ts` e convalidare la build static export.

Principio Guida: **Minimal Context -> Originality & Copyright Check -> UUXD Design -> Multimedia Asset Generation -> SEO Copywriting -> TS Integration -> Build Verification.**

---

## When to Use

Attiva questa skill quando:
- L'utente fornisce un contesto breve o un'idea (es. *"scrivi un post sul cambio olio della Yaris"*, *"crea un articolo su X"*).
- L'utente chiede di creare un post completo, accattivante, sicuro sul piano del copyright e visivamente impeccabile secondo i principi UUXD.
- Si desidera generare automaticamente gli asset grafici originali (`cover.png`) e inserirli nella cartella `public/assets/blog/[slug]/images/`.

---

## Workflow di Esecuzione

### Fase 1: Input dell'Utente & Espansione Autonoma del Contesto

1. **Se l'utente fornisce un contesto sintetico**: Prendi il contesto fornito ed elabora autonomamente senza fermare il flusso:
   - **Keyword Primaria e Secondaria** (es. `Toyota Yaris MK4 HEV ibrido`, `sistema e-CVT`, `consumi reali`).
   - **Categoria e Sottocategoria** (es. `category: "Automotive"`, `subcategory: "Toyota Yaris MK4 HEV"`).
   - **Slug Kebab-Case** (es. `toyota-yaris-mk4-hev-hybrid-system-explained`).
   - **Tono di Voce**: Altamente tecnico, chiaro, divulgativo, originale ed elegante.

2. **Se l'utente chiede modifiche specifiche**: Rispetta ogni vincolo quantitativo, grafico o di formato indicato.

---

### Fase 2: Controllo di Originalità & Tutela del Copyright (MANDATORIO)

Prima di generare testo o immagini, applica tassativamente queste regole di tutela del copyright:

1. **Testo 100% Originale (No Plagio)**:
   - Vietata la copia diretta o il calco di articoli, comunicati stampa o documentazione di terze parti.
   - Ogni concetto deve essere rielaborato, sintetizzato e riscritto ex-novo con le parole originali dell'autore.
2. **Immagini d'Autore & Generazione AI**:
   - Tutte le immagini devono essere create ex-novo usando il tool `generate_image` o essere risorse di pubblico dominio/royalty-free.
   - Vietato scaricare o linkare immagini coperte da copyright di terzi o loghi proprietari protetti senza autorizzazione.
3. **Citazione delle Fonti**:
   - Se vengono citati dati tecnici o specifiche ufficiali di produttori (es. Toyota, Focal, IEEE, ISO), cita espressamente la fonte in modo trasparente senza duplicare il testo dei manuali.

---

### Fase 3: Regole UUXD (Universal User Experience Design) & Visual Appeal

Per garantire che ogni post sia visivamente **accattivante, leggibile ed esteticamente WOW**:

1. **Scannabilità Visiva**:
   - Paragrafi brevi (massimo 3-4 righe di testo) per evitare l'effetto "muro di testo".
   - Grassetto strategico sulle parole chiave e sui concetti chiave per guidare la lettura rapida (F-shaped scanning pattern).
2. **Accessibilità Visiva (A11y - WCAG AA)**:
   - Testo alternativo (`alt`) esaustivo per ogni immagine per screen-reader e SEO.
   - Elevato contrasto cromatico tra testo, tabelle e sfondo (Dark Mode compliante con la `design/styleguide.md`).
3. **Gerarchia Tipografica Chiara**:
   - Titolo `H1` d'impatto, titoli `H2` ben distanziati ogni 200-300 parole, e sotto-titoli `H3` per sezioni analitiche.
4. **Elementi Visivi d'Impatto (GitHub Alerts & Tabelle)**:
   - **Tabelle Comparative**: Almeno una tabella Markdown formattata con didascalia in corsivo (`*Tabella 1: ...*`).
   - **GitHub Alert Callouts**: Almeno 2-3 blocchi di avviso cromaticamente distinti per spezzare il ritmo visivo:
     - `> [!NOTE]` per note di contesto.
     - `> [!TIP]` per pratiche e trucchi consigliati.
     - `> [!WARNING]` per avvertenze su sicurezza o errori comuni.
     - `> [!IMPORTANT]` per punti cardine non negoziabili.

---

### Fase 4: Generazione degli Asset Multimediali Originali

1. **Creazione della Cartella Asset**:
   Assicurati che la directory esista: `public/assets/blog/[slug]/images/`

2. **Generazione dell'Immagine di Copertina (`generate_image`)**:
   Usa `generate_image` con un prompt fotorealistico ed elegante, senza testo incorporato:
   - **Prompt Style**: *High quality cinematic tech photo, dark aesthetic, neon accents (amber/cyan), professional composition, zero text embedded*.
   - **ImageName**: `cover.png` (salvato in `public/assets/blog/[slug]/images/cover.png`).

3. **Inserimento nel Body Markdown**:
   All'inizio del post:
   ```markdown
   ![[Descrizione alt ricca per SEO ed accessibilità]](/assets/blog/[slug]/images/cover.png)
   ```

---

### Fase 5: Copywriting SEO & Metadati

1. **Title Tag (H1)**: Tra 50 e 65 caratteri con keyword principale all'inizio.
2. **Excerpt / Meta Description**: Tra 130 e 160 caratteri con valore d'impatto per il lettore per massimizzare il CTR nei motori di ricerca.
3. **Reading Time**: `Math.max(1, Math.ceil(parole_totali / 200))`.
4. **Tag**: 3-5 tag pertinenti in TitleCase.

---

### Fase 6: Integrazione in `src/data/blog-posts.ts` & Validazione Build

1. Inserisci il nuovo oggetto all'inizio dell'array `blogPosts` in [`src/data/blog-posts.ts`](file:///c:/Users/franc/Documents/Francesco.Castaldi.github.io/src/data/blog-posts.ts).
2. Esegui la build di verifica: `npm run build`.
3. Controlla che la nuova rotta `/blog/[slug]` compaia tra quelle prerenderizzate senza alcun errore.

---

## Regole Tassative

1. **Originalità e Zero Copyright Infringement**: Nessun plagiato. Testo originale ed immagini generate ex-novo.
2. **Conformità UUXD**: Paragrafi brevi, scannabili, contrasto cromatico elevato, alt text e alert visivi accattivanti.
3. **Autonomia con Contesto Minimo**: Elaborazione fluida ed autonoma anche partendo da semplici spunti di 1-2 frasi.
