import type { ProjectNode } from "./types";

export const projects: ProjectNode[] = [
  {
    id: "trumetrapla",
    label: "TruMetraPla",
    title: "TruMetraPla",
    slug: "trumetrapla",
    description:
      "Dashboard Python per monitorare la produttività nei processi metalmeccanici. Calcolo automatico dei KPI da Excel.",
    longDescription:
      "Dashboard dati interattiva scritta in Python (Streamlit/Pandas) per ottimizzare la produttività nei processi di produzione metalmeccanica. Importa i dati grezzi dai file Excel, li pulisce e calcola i KPI attraverso visualizzazioni dati ricche e interattive.",
    content: `## La Sfida della Fabbrica

Le aziende metalmeccaniche generano una quantità spaventosa di dati, spesso intrappolati in fogli Excel disconnessi. Trovare i colli di bottiglia della produzione è come cercare un ago in un pagliaio, e costa ore di lavoro manuale ogni settimana.

> [!IMPORTANT]
> L'obiettivo era trasformare fogli di calcolo caotici in insight operativi in tempo reale, senza costringere l'azienda a cambiare il proprio CRM o le proprie abitudini.

[INSERISCI QUI FOTO DELLA DASHBOARD TRUMETRAPLA]

## Architettura e Scelte Tecnologiche

Per garantire la massima retro-compatibilità sui vecchi PC industriali con Windows, ho strutturato l'applicazione come un eseguibile standalone che non richiede installazione.

| Componente | Tecnologia | Motivazione |
|---|---|---|
| **Motore Dati** | Pandas (Python) | Capace di ingerire e aggregare migliaia di righe in millisecondi. |
| **Interfaccia Grafica** | Tkinter / ttkbootstrap | Deploy nativo su vecchie macchine Windows senza l'overhead di un browser web. |
| **Distribuzione** | PyInstaller | L'operatore non deve installare Python. Doppio clic e parte. |

## Il Risultato sul Campo

La dashboard ha sostituito ore di manipolazione manuale in Excel con un processo di importazione a **singolo click**. 
Ora gli operatori monitorano la produttività media istantaneamente, individuando i cali di efficienza tramite grafici a torta e tabelle dinamiche.`,
    tags: ["Python", "Data Analysis", "Dashboard", "Pandas"],
    skills: ["data-science", "healthcare-it"],
    color: "var(--color-star-gold)",
    links: {
      github: "https://github.com/FrancescoCastaldi/TruMetraPla",
    },
    image: "images/digital_workspace.jpg",
    featured: true,
    icon: "🏭",
  },
  {
    id: "hosp-san-tracker",
    label: "Hospital Sanitization",
    title: "Hospital Sanitization Tracker",
    slug: "hospital-sanitization-tracker",
    description:
      "DApp basata su Smart Contract Ethereum (Sepolia) per il tracciamento immutabile delle attività di sanificazione ospedaliera.",
    longDescription:
      "Full-stack blockchain DApp che registra le operazioni di sanificazione ospedaliera come transazioni immutabili sulla testnet Sepolia di Ethereum. Costruita con Solidity, Hardhat ed Ethers.js per garantire la compliance igienica.",
    content: `## La Sfida della Compliance

Nel mondo post-pandemico, verificare l'avvenuta sanificazione degli ambienti ospedalieri (sale operatorie, terapie intensive) è una questione di vita o di morte. I registri cartacei si perdono o possono essere alterati a posteriori per coprire mancanze.

> [!IMPORTANT]
> Questo progetto sfrutta la tecnologia Blockchain per garantire l'immutabilità assoluta. Una volta registrato un evento di sanificazione, nessuno potrà mai più cancellarlo o modificarlo. Nessun admin database ha questo potere.

[INSERISCI QUI FOTO DELLA DAPP COLLEGATA A METAMASK]

## Architettura DApp

Questa Decentralized Application (DApp) utilizza un rigoroso sistema di Controllo degli Accessi Basato sui Ruoli (RBAC) per separare le responsabilità degli Operatori da quelle degli Ispettori (Auditor).

| Modulo | Stack Tecnologico | Ruolo Architetturale |
|---|---|---|
| **Smart Contracts** | Solidity | Deploy su testnet Sepolia. Gestiscono la logica di accesso e il salvataggio immutabile dei log. |
| **Frontend** | React & Web3.js | Interfaccia pulita per permettere allo staff di interagire tramite MetaMask. |
| **Storage Layer** | Blockchain Ethereum | Verifica crittografica dei timestamp e delle firme degli operatori. |

## Risultati

Il sistema ha dimostrato come il meccanismo di consenso decentralizzato sia applicabile alla sanità pubblica. Fornisce un *audit trail* trasparente e sicuro su cui il management ospedaliero può fare affidamento senza esitazioni.`,
    tags: ["Solidity", "Hardhat", "Ethers.js", "Blockchain"],
    skills: ["healthcare-it", "blockchain"],
    color: "var(--color-star-gold)",
    links: {
      github: "https://github.com/FrancescoCastaldi/hospital-sanitization-tracker",
    },
    image: "images/digital_workspace.jpg",
    featured: true,
    icon: "🏥",
  },
  {
    id: "gpx-editor",
    label: "GPX Editor",
    title: "GPX Editor",
    slug: "gpx-editor",
    description:
      "Web app per modificare tracce GPS offline: smoothing, taglio punti e profili altimetrici generati in tempo reale.",
    longDescription:
      "Un editor GPS browser-based per ciclisti. Permette di modificare i file GPX per sistemare sbalzi di potenza (watts) o glitch di velocità prima di caricarli su Strava. Tutto gira client-side.",
    content: `## Perché un Editor GPX nel Browser?

Ciclisti e runner si trovano spesso con tracce GPS rovinate da picchi di velocità impossibili (glitch del segnale) o errori dei misuratori di potenza. Correggere questi errori prima di caricare l'allenamento su Strava richiedeva pesanti software desktop.
La mia soluzione: uno strumento web-based, veloce e 100% offline.

[INSERISCI QUI FOTO DELLA MAPPA LEAFLET E DEL PROFILO ALTIMETRICO]

## Funzionalità Principali

Tutta la computazione avviene nel tuo browser. Zero server. Massima Privacy.

1. **Processing Client-Side**: Niente upload. L'algoritmo legge il file locale.
2. **Correzione Potenza (Watts)**: Scala, taglia o abbassa i dati di potenza su specifici segmenti.
3. **Correzione Velocità**: Appiattisce i picchi anomali dovuti alla perdita di segnale.
4. **Esportazione Pura**: Genera un file \`.gpx\` pulito e pronto per l'upload su Garmin Connect.

> [!TIP]
> Poiché tutto gira nel browser tramite DOMParser, puoi caricare un file GPX da 50MB (un'uscita in bici lunghissima) e il processing sarà istantaneo, senza tempi morti di caricamento.

## Stack Tecnologico

Ho puntato sulla leggerezza estrema.

| Libreria | Utilizzo | Motivazione |
|---|---|---|
| **TypeScript** | Core | Prevenzione dei bug nella manipolazione delle coordinate. |
| **Leaflet** | Rendering Mappa | Leggera, open-source e velocissima nel disegnare polilinee complesse. |
| **Chart.js** | Altimetria | Ideale per visualizzare l'elevazione in relazione alla distanza. |`,
    color: "#34D399",
    tags: ["TypeScript", "Leaflet", "Vite", "Chart.js"],
    skills: ["cycling-analytics", "web-dev"],
    links: {},
    image: "images/cycling_scene.jpg",
    featured: true,
    icon: "🗺️",
  },
  {
    id: "sir-markov",
    label: "SIR Markov Chain",
    title: "SIR Markov Chain",
    slug: "sir-markov-chain",
    description:
      "Simulazione stocastica (Catene di Markov a tempo discreto) del modello SIR epidemiologico, con analisi Monte Carlo.",
    longDescription:
      "Progetto accademico (UniBo) per la simulazione della diffusione epidemica. Sostituisce le equazioni differenziali classiche con matrici di transizione markoviane per catturare le fluttuazioni casuali nei piccoli gruppi.",
    content: `## Modelli Epidemiologici: Determinismo vs Stocasticità

Il modello SIR classico utilizza eleganti equazioni differenziali. Funziona bene sulle grandi popolazioni, ma fallisce quando i numeri sono piccoli e subentra il caos del caso.
Questo progetto accademico affronta il problema simulando la propagazione di un virus come una **Catena di Markov a tempo discreto**.

[INSERISCI QUI FOTO DELLA SIMULAZIONE CON GRAFICI MATPLOTLIB]

## Come Funziona

A differenza del modello continuo, qui il tempo avanza per "scatti" (es. giorni).

- Ogni individuo ha una probabilità matematica esatta di infettarsi o guarire nel giorno T+1.
- Queste probabilità compongono enormi **Matrici di Transizione**.
- Modificando in corsa la matrice, possiamo simulare interventi improvvisi (es. un lockdown).

> [!WARNING]
> La singola simulazione stocastica non ha valore predittivo. Per questo il sistema utilizza simulazioni **Monte Carlo**: lancia il modello migliaia di volte e calcola la distribuzione di probabilità finale, fornendo un "range" di sicurezza.

## Tecnologie

Essendo un calcolo intensivo su matrici, Python era la scelta obbligata.

| Tool | Scopo |
|---|---|
| **Python** | Motore logico. |
| **NumPy** | Operazioni vettorializzate ultra-veloci sulle matrici di transizione. |
| **Matplotlib** | Plotting delle curve epidemiche e delle distribuzioni Monte Carlo. |`,
    color: "var(--color-nebula)",
    tags: ["Python", "NumPy", "Matplotlib", "University"],
    skills: ["data-science", "ai-ml"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: true,
    icon: "🦠",
  },
  {
    id: "ci-cervical",
    label: "CI Cervical LBC",
    title: "CI Cervical LBC",
    slug: "ci-cervical-lbc",
    description:
      "Confronto tra Total Variation, UNet e DiffPIR per il restauro di immagini citologiche cervicali (LBC).",
    longDescription:
      "Progetto di ricerca per ripulire il rumore e la sfocatura dai vetrini dei Pap test. Valuta l'impatto dei modelli a diffusione generativa contro il classico deblurring matematico per evitare 'allucinazioni' mediche.",
    content: `## Il Problema Clinico: Il Rumore nei Pap Test

L'accuratezza di uno screening per il tumore al collo dell'utero dipende interamente dalla qualità visiva del campione (LBC). Quando l'immagine al microscopio è sfocata o rumorosa, la diagnosi è a rischio.
La soluzione non è scartare il campione, ma restaurare l'immagine algoritmicamente.

[INSERISCI QUI FOTO COMPARATIVA TRA MODELLI DI RESTAURO]

## Il Ring dei Modelli AI

Ho implementato e messo in competizione tre approcci storicamente opposti:

1. **Total Variation (TV)**: Pura matematica classica. Riduce il rumore salvando i bordi taglienti. Nessun modello AI, nessuna GPU richiesta.
2. **UNet**: La regina del Deep Learning per la segmentazione medica. Viene addestrata a pulire le immagini pixel per pixel.
3. **DiffPIR**: Stato dell'arte dell'IA Generativa (Modelli a Diffusione). Crea l'immagine dal puro rumore gaussiano, guidata dal campione degradato.

| Algoritmo | Pro | Contro |
|---|---|---|
| **Total Variation** | 100% Affidabile (Nessuna allucinazione) | Pulizia sommaria |
| **UNet** | Altissimo punteggio PSNR | Richiede enormi dataset di training |
| **DiffPIR** | Dettaglio finale mozzafiato | **Rischio di inventare falsi tumori (Allucinazioni)** |

> [!IMPORTANT]
> L'estetica non deve mai battere l'affidabilità clinica. La UNet si è confermata il miglior compromesso tra capacità di pulizia e assenza di allucinazioni generative pericolose per il paziente.`,
    color: "#FB7185",
    tags: ["Python", "PyTorch", "DiffPIR", "University"],
    skills: ["data-science", "ai-ml"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "🔬",
  },
  {
    id: "sgf2-ai",
    label: "SGF² AI",
    title: "SGF² AI Project",
    slug: "sgf2-ai-project",
    description:
      "Machine Learning sul dataset UCI Adult: predizione del reddito e indagine approfondita sulle metriche di Fairness.",
    longDescription:
      "Pipeline ML completa che smaschera i bias algoritmici. Non basta un'Accuracy del 90%: tramite Demographic Parity e analisi SHAP, il progetto dimostra come i modelli discriminino attivamente genere ed etnia.",
    content: `## Il Lato Oscuro dell'Accuracy

Se un modello predittivo raggiunge l'87% di Accuratezza, è pronto per la produzione, giusto? **Sbagliato.**
Questo progetto smonta il mito dell'Accuracy analizzando il celebre dataset *UCI Adult* (predizione del reddito). Ho costruito una pipeline di Machine Learning completa solo per dimostrare un punto: i modelli potenti imparano a discriminare in modo potentissimo.

[INSERISCI QUI GRAFICO A CASCATA SHAP O ROC CURVE]

## Gli Sfidanti

Ho messo a confronto tre architetture, dalla più semplice alla più complessa:

- Logistic Regression
- Random Forest
- XGBoost (Il campione in carica per dati tabulari)

Tutti e tre hanno superato brillantemente i test di precisione standard (ROC-AUC, F1-Score).

> [!WARNING]
> Quando ho introdotto le metriche di *Fairness* (Demographic Parity ed Equal Opportunity Gap), il quadro si è fatto cupo. Il modello XGBoost, quello più accurato, era anche quello che discriminava di più in base al sesso.

## Capire il "Perché" con SHAP

I modelli ensemble sono "Scatole Nere". Per aprirle, ho utilizzato l'analisi **SHAP**.

| Algoritmo | Accuracy Reale | Livello di Bias Rilevato | Spiegabilità (SHAP) |
|---|---|---|---|
| **Log Regression** | Discreta | Basso | I pesi lineari sono trasparenti |
| **Random Forest** | Buona | Alto | Possibile, ma complessa |
| **XGBoost** | **Eccellente** | **Critico (Proxy variabili sul genere)** | Forti interazioni non lineari svelate |

La conclusione dello studio è che ogni deployment di ML deve obbligatoriamente includere un passo di Fairness Auditing e debiasing a monte, altrimenti stiamo solo automatizzando le disuguaglianze del passato.`,
    color: "#FB7185",
    tags: ["Python", "scikit-learn", "pandas", "University"],
    skills: ["data-science", "ai-ml"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "🤖",
  },
  {
    id: "tpertutti-ux",
    label: "TperTutti UX",
    title: "TperTutti — UX Redesign",
    slug: "tpertutti-ux-redesign",
    description:
      "Redesign completo (Double Diamond) per il sito dei trasporti TPER. SUS passato da 37.5 a 72.5.",
    longDescription:
      "Un progetto di ricerca UX end-to-end. Dalle interviste sul campo al prototipo interattivo, ridisegnando l'intera esperienza di acquisto biglietti e ricerca orari per TPER, abbattendo la frustrazione degli utenti.",
    content: `## Il Problema Originale

Il sito dei trasporti pubblici dell'Emilia-Romagna (TPER) soffriva di una malattia comune nel settore pubblico: era stato progettato per chi lo gestiva, non per chi lo usava.
Il punteggio iniziale di Usabilità (SUS) era un catastrofico **37.5 su 100**. Le persone non riuscivano a trovare gli orari. 

[INSERISCI QUI FOTO BEFORE/AFTER DEI WIREFRAME O DEL PROTOTIPO]

## La Cura: Metodologia Double Diamond

Il design non è arte, è risoluzione di problemi. Ho guidato il redesign seguendo il framework *Double Diamond*:

1. **Discover**: Ricerca esplorativa. 15 interviste contestuali con pendolari e turisti. Ho mappato il loro "Customer Journey" scoprendo picchi di frustrazione insostenibili nel checkout.
2. **Define**: Definizione chiara di *Personas* e formulazione dei problemi chiave. (Es: "Come possiamo rendere l'acquisto del biglietto rapido da smartphone?")
3. **Develop**: Sketching rapido, wireframe a bassa fedeltà e test A/B continui con l'utenza per scartare le idee peggiori in fretta.
4. **Deliver**: Design System finale e prototipo interattivo ad alta fedeltà.

> [!TIP]
> In UX, si sbaglia presto per imparare in fretta. Tre cicli di iterazione sui wireframe grezzi valgono molto più di settimane passate ad abbellire un design sbagliato su Figma.

## I Numeri del Successo

Alla fine del percorso, i nuovi test di usabilità hanno restituito numeri inequivocabili:

| Metrica di Successo | Vecchio Sito (Baseline) | Nuovo Design | Incremento |
|---|---|---|---|
| **Punteggio SUS** | 37.5 / 100 | **72.5 / 100** | +93% |
| **Completamento Task** | ~40% | **>90%** | Drastico |
| **Tempo di Acquisto** | > 3 minuti | **< 45 secondi** | Salto quantico |`,
    color: "#E2E8F0",
    tags: ["UX Design", "Double Diamond", "Usability", "University"],
    skills: ["healthcare-it", "consulting"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: true,
    icon: "🎨",
  },
  {
    id: "superset-calendar",
    label: "Superset Calendar",
    title: "Superset Calendar Filter",
    slug: "superset-calendar-filter",
    description:
      "Plugin React per Apache Superset: una Calendar Heatmap interattiva per l'esplorazione temporale delle dashboard.",
    longDescription:
      "Sviluppo di un custom chart plugin per Apache Superset (BI Tool). Permette agli analisti di evidenziare pattern temporali (stile GitHub contributions) e filtrare dinamicamente l'intera dashboard cliccando su giorni o range di date.",
    content: `## Espandere Apache Superset

Superset è uno degli strumenti di Business Intelligence open-source più potenti al mondo, ma i suoi grafici standard hanno dei limiti. Quando un'azienda ha bisogno di visualizzare la densità di eventi giornalieri (pensate alla griglia dei commit di GitHub), un semplice grafico a barre non basta. 

Serve un **Custom Plugin**.

[INSERISCI QUI FOTO DELLA CALENDAR HEATMAP NEL PANNELLO DI SUPERSET]

## Componenti del Plugin

I plugin di Superset sono vere e proprie applicazioni React impacchettate tramite Webpack che dialogano con il motore backend Python (Flask) di Superset.

La complessità principale risiede nell'architettura dei dati:

| Modulo Plugin | Che cosa fa? |
|---|---|
| **ControlPanel** | Aggiunge il menu a tendina sulla sinistra di Superset per far selezionare metriche e colonne di date all'utente. |
| **BuildQuery** | Genera il JSON che ordina al backend di eseguire aggregazioni SQL (GROUP BY date). |
| **React Component** | Usa \`Emotion\` per lo styling e renderizza la griglia vettoriale. |

> [!IMPORTANT]
> Il vero valore aggiunto di questo plugin è l'integrazione con il **Native Cross-Filtering** di Superset. Se clicchi su un quadratino rosso della Heatmap (es. 15 Agosto), *tutti* gli altri grafici della dashboard si filtrano istantaneamente su quella specifica data.

Il risultato è un'esplorazione dei dati estremamente fluida e organica, scritta interamente in **TypeScript** per garantire solidità.`,
    color: "var(--color-nebula)",
    tags: ["Superset", "TypeScript", "React", "Cross-Filter"],
    skills: ["data-science", "cloud-arch"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "📅",
  },
];
