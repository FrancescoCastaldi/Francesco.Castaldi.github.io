import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    title: "Installazione Focal 165 IC su Toyota Yaris XP210",
    slug: "focal-165-ic-toyota-yaris-xp210",
    date: "2026-08-06",
    excerpt:
      "Guida completa passo-passo per la sostituzione degli altoparlanti anteriori originali con il kit Focal 165 IC.",
    content: `![Focal 165 IC speaker upgrade](/assets/blog/focal-165-ic-toyota-yaris-xp210/images/cover.png)

## Introduzione e Materiale Necessario

Sostituire gli altoparlanti di serie sulla Toyota Yaris (serie XP210) è uno dei miglioramenti audio più impattanti che tu possa fare. Il kit coassiale **Focal 165 IC** offre una qualità sonora che distrugge letteralmente i vecchi coni in carta originali, regalando alti cristallini e medi precisissimi.

> [!WARNING]
> I pannelli porta della Yaris XP210 sono fissati con clip in plastica estremamente fragili. Lavora sempre a temperature miti o usa un phon da carrozziere per scaldare la plastica. Se tiri a freddo, si spaccheranno.

## Specifiche a Confronto

Ecco perché il salto di qualità è così netto:

| Specifiche | OEM Toyota Yaris | Focal 165 IC |
|---|---|---|
| **Impedenza** | 4 Ohm | 4 Ohm |
| **Materiale Cono** | Carta trattata | Polyglass |
| **Sensibilità** | ~86 dB | 92.6 dB (Volume molto più alto a parità di radio) |
| **Tweeter** | Assente o incassato | Alluminio a cupola invertita (Dettaglio estremo) |

*Tabella 1: Confronto specifiche tecniche*


## Step 1: Smontaggio del Pannello Porta

1. Cerca la vite nascosta dietro la maniglia interna (c'è uno sportellino di plastica minuscolo).
2. Togli la vite sul fondo della tasca del bracciolo.
3. Parti dall'angolo in basso a destra e usa un *trim removal tool* in plastica per fare leva e far saltare la prima clip.
4. Tira con forza decisa lungo il perimetro.
5. Scollega i connettori degli alzacristalli.

> [!TIP]
> Gli altoparlanti originali Toyota sono rivettati alla lamiera, non avvitati! Preparati con un trapano e una punta da 4 o 5mm per distruggere la testa dei rivetti e rimuovere il cestello originale.

## Step 2: Installazione Adattatore e Cablaggio

La Yaris richiede **obbligatoriamente** degli anelli adattatori in plastica o MDF, poiché il foro sulla portiera non è uno standard da 165mm.

- Fissa l'adattatore alla lamiera usando bulloni passanti e dadi autobloccanti.
- Metti del nastro insonorizzante tra lamiera e adattatore per annullare le vibrazioni.
- Avvita saldamente il woofer Focal 165 IC all'anello.


## Test Finale

Prima di rimontare tutto, accendi la radio. Controlla la polarità: se i bassi ti sembrano "vuoti" o inesistenti, potresti aver invertito positivo e negativo su un lato. Una volta verificato, goditi il tuo nuovo palcoscenico sonoro!`,
    tags: ["Audio", "Focal", "Toyota", "Tutorial"],
    readingTime: 6,
    published: true,
    category: "Veicoli",
  },
  {
    title: "Blockchain in Healthcare: Oltre l'Hype",
    slug: "blockchain-healthcare-beyond-hype",
    date: "2025-11-15",
    excerpt:
      "Applicazioni pratiche della blockchain per il tracciamento della compliance ospedaliera e perché le testnet di Ethereum sono il punto di partenza perfetto.",
    content: `![Blockchain diagram in healthcare](/assets/blog/blockchain-healthcare-beyond-hype/images/cover.png)

## Lo Stato della Blockchain in Sanità

Per anni ci hanno venduto la Blockchain come la panacea di tutti i mali in sanità, eppure l'adozione stenta a decollare. Tolte di mezzo le criptovalute e la speculazione finanziaria, la tecnologia a registro distribuito ha un potenziale enorme per un caso d'uso specifico: **la compliance e gli audit trail**.

> [!IMPORTANT]
> L'obiettivo in sanità non è la "decentralizzazione" anarchica, ma la certezza crittografica assoluta. Nessuno deve poter alterare un registro delle sanificazioni.


## Perché il Tracciamento della Compliance Funziona

Le strutture sanitarie operano in ecosistemi dove un registro manomesso può costare vite (o cause legali milionarie). I database relazionali classici (SQL) possono essere alterati da qualsiasi admin. 

Gli **Smart Contract su Ethereum** offrono invece un livello di logging trasparente e anti-manomissione per:
- Sanificazioni delle sale operatorie.
- Manutenzione dei macchinari salvavita (es. ventilatori).
- Adesione ai rigidi protocolli di sicurezza.

| Paradigma | Sicurezza | Alterabilità Dati | Costi di Setup |
|---|---|---|---|
| **Database SQL (Classico)** | Alta (se ben configurato) | Alterabile dall'admin | Bassi |
| **Blockchain (Smart Contract)** | Assoluta (Crittografica) | **Immutabile** | Medi/Alti |

*Tabella 1: Confronto tra Database SQL e Blockchain*

## Considerazioni Pratiche

Ovviamente ci sono dei limiti strutturali. I costi delle transazioni (gas fees) possono pesare. 
Tuttavia, l'approccio ibrido vince su tutto: i dati clinici sensibili del paziente (GDPR) rimangono rigorosamente *off-chain* nei server ospedalieri, mentre sulla blockchain finisce unicamente l'hash crittografico che ne certifica l'autenticità e l'ora esatta di creazione.

> [!NOTE]
> Utilizzare reti di test (Testnet) come Sepolia permette alle cliniche di simulare questi audit trail a costo zero, testando le architetture senza rischiare capitali in gas fees reali.

Per approfondire lo sviluppo di Smart Contract, consulta la [Documentazione Ufficiale Ethereum](https://ethereum.org/en/developers/docs/smart-contracts/).`,
    tags: ["Blockchain", "Healthcare IT", "Smart Contracts"],
    readingTime: 4,
    published: true,
    category: "Technology",
  },
  {
    title: "Creare un GPX Editor in TypeScript e Leaflet",
    slug: "building-gpx-editor-typescript-leaflet",
    date: "2025-09-20",
    excerpt:
      "Un'analisi tecnica sulla costruzione di un editor di tracce GPS lato client, con smoothing e profili altimetrici, senza alcun backend.",
    content: `![Architettura del GPX Editor](/assets/blog/building-gpx-editor-typescript-leaflet/images/diagram.png)

## Perché un Editor GPX nel Browser?

Ciclisti e runner accumulano gigabyte di file GPX dai propri Garmin o Wahoo. Spesso questi file contengono sbalzi di velocità o errori nei dati di potenza. Fino a ieri, per pulire queste tracce, dovevi scaricare pesanti software desktop. 
La sfida? Creare un editor 100% web-based. Zero backend. Zero upload su server lenti.

**Cosa costruiremo:**
- Parsing client-side dei file GPX
- Algoritmo di smoothing per ripulire i dati
- Profilo altimetrico interattivo con Chart.js


## Core Features e Architettura

Tutta la magia avviene sul client. Il tuo file GPX non lascia mai il tuo computer.

1. **Lettura e Parsing**: Lettura istantanea dell'XML.
2. **Smoothing (Douglas-Peucker)**: Un algoritmo essenziale che semplifica la traccia eliminando i punti GPS ridondanti, salvando la forma del percorso ma abbattendo il peso del file.
3. **Profilo Altimetrico**: Renderizzato a 60fps usando Chart.js, offre feedback visivo immediato sulla pendenza.

> [!IMPORTANT]
> Mantenere tutto sul client significa Privacy Totale per gli utenti. Nessuno vuole che le coordinate di casa propria finiscano su un server sconosciuto.

## Scelte Tecnologiche

Per costruire l'applicativo, serviva uno stack snello e type-safe.

| Tecnologia | Ruolo | Motivazione |
|---|---|---|
| **TypeScript** | Core Logic | Per manipolare coordinate e XML serve tipizzazione forte, altrimenti i bug geospatial sono infiniti. |
| **Leaflet** | Rendering Mappe | Molto più leggero di Mapbox GL e con licenza permissiva (BSD). |
| **Chart.js** | Altimetria | API semplice, Canvas performante per dataset da migliaia di punti. |
| **Vite** | Bundler | HMR istantaneo, essenziale per iterare velocemente sulle UI. |

*Tabella 1: Stack Tecnologico per il GPX Editor*

\`\`\`typescript
// Esempio di parsing GPX semplificato
import { DOMParser } from "xmldom";
const doc = new DOMParser().parseFromString(gpxString, "text/xml");
const trkpts = doc.getElementsByTagName("trkpt");
console.log(\`Trovati \${trkpts.length} punti nella traccia\`);
\`\`\`

Il risultato finale è uno strumento professionale, fluido e sicuro, accessibile da qualsiasi browser moderno.`,
    tags: ["TypeScript", "Leaflet", "Vite", "Cycling"],
    readingTime: 3,
    published: true,
    category: "Development",
  },
  {
    title: "Modelli Epidemiologici SIR come Catene di Markov",
    slug: "sir-markov-chains-epidemiology",
    date: "2025-06-10",
    excerpt:
      "Simulazioni discrete (Markov) del modello SIR, con sensitivity analysis e metodi Monte Carlo per la previsione delle epidemie.",
    content: `> **Key takeaways:** Modelli discreti (Markov) permettono variazioni real-time dei parametri come il lockdown, al contrario delle equazioni differenziali classiche. Inoltre, i metodi Monte Carlo aiutano a quantificare l'incertezza sistemica.

![Markov transition matrix](/assets/blog/sir-markov-chains-epidemiology/images/matrix.png)

## Dalle Equazioni Differenziali ai Passi Discreti

Il classico modello epidemiologico SIR (Suscettibili, Infetti, Rimossi) fa un uso massiccio di equazioni differenziali continue. Matematicamente elegante, certo, ma molto poco intuitivo quando devi spiegare ai decisori politici l'impatto di un lockdown che inizia in un giorno specifico.

La realtà procede a step discreti, non su curve perfettamente lisce.


## L'Approccio Markoviano

Trattando il modello SIR come una **Catena di Markov a tempo discreto**, ogni singolo "tick" temporale corrisponde a un giorno esatto. 
Le probabilità di transizione decidono quanti individui passano da uno stato all'altro. Questo permette di inserire variazioni brutali e improvvise ai parametri: ad esempio, il giorno 15 il tasso di contatto (R0) crolla perché le scuole chiudono.

> [!TIP]
> Usare le Catene di Markov semplifica enormemente la stesura del codice in Python. Si passa dai solutori differenziali complessi a semplici iterazioni matriciali.

## Analisi Monte Carlo e Incertezza

Le pandemie sono incerte per definizione. Usare la simulazione Monte Carlo permette di generare migliaia di scenari probabilistici invece di una singola (e spesso errata) previsione deterministica.

| Parametro | Impatto sul Modello Markoviano |
|---|---|
| **R₀ (Tasso base di riproduzione)** | Definisce la pendenza iniziale della curva degli infetti. |
| **Tasso di Recupero** | Determina la velocità di svuotamento del compartimento 'Infetti'. |
| **Interventi Esterni (Lockdown)** | Modifica dinamicamente le matrici di transizione in run-time. |

*Tabella 1: Parametri e Impatto sul Modello Markoviano*

\`\`\`python
# Esempio di matrice di transizione Markoviana
import numpy as np

# Stati: S, I, R
P = np.array([[0.95, 0.05, 0.00],
              [0.00, 0.90, 0.10],
              [0.00, 0.00, 1.00]])
\`\`\`

Grazie a questa Analisi di Sensibilità, i sistemi sanitari possono capire matematicamente se ha senso chiudere i voli o semplicemente imporre l'uso di mascherine, analizzando le distribuzioni di probabilità finali.`,
    tags: ["Python", "Data Science", "Epidemiology", "Simulation"],
    readingTime: 4,
    published: true,
    category: "Data Science",
  },
  {
    title: "Restauro Immagini in Citologia: Un Confronto",
    slug: "comparing-image-restoration-cytology",
    date: "2025-03-05",
    excerpt:
      "Studio comparativo tra Total Variation, UNet e DiffPIR per il deblurring e denoising di immagini citologiche (LBC).",
    content: `## Il Problema Clinico

Lo screening preventivo in citologia (come il Pap test) dipende al 100% dalla qualità delle immagini al microscopio. Rumore digitale e sfocature nelle preparazioni a base liquida (LBC) possono nascondere dettagli cellulari microscopici, causando ritardi diagnostici o clamorosi falsi negativi. 
Il restauro computazionale delle immagini è l'unica via per salvare i campioni senza doverli ri-prelevare dalle pazienti.


## Tre Approcci sul Ring

Ho messo a confronto tre diverse metodologie, dal calcolo classico all'intelligenza artificiale generativa:

1. **Total Variation (TV)**: Metodo classico di ottimizzazione matematica. Pulisce il rumore senza sfocare i bordi. Zero AI, molto veloce e predicibile.
2. **UNet**: Architettura Deep Learning supervisionata. Addestrata su migliaia di coppie di immagini sporche/pulite, impara a restaurare i pixel end-to-end.
3. **DiffPIR**: State-of-the-art. Sfrutta modelli a diffusione inversa. Il restauro è guidato da una rete che ricrea letteralmente il dettaglio mancante partendo dal rumore.

> [!WARNING]
> DiffPIR inventa i dettagli o li restaura? In ambito medico le "allucinazioni" dei modelli a diffusione sono un problema critico. Se la rete disegna un nucleo anomalo che non esiste, la diagnosi è compromessa.

## I Risultati

I risultati hanno evidenziato un trade-off brutale tra percezione umana e metriche matematiche.

| Metodo | Metriche (PSNR/SSIM) | Percezione Patologi | Rischio Allucinazioni |
|---|---|---|---|
| **Total Variation** | Basse | Sufficiente (Bordi artificiali) | **Nullo** |
| **UNet** | **Altissime** | Molto Buona | Basso |
| **DiffPIR** | Medie | **Eccellente (Dettaglio estremo)** | Alto |

*Tabella 1: Confronto risultati tra i metodi di restauro*

La UNet rimane il compromesso migliore per l'integrazione clinica: ottimi punteggi matematici e risultati visivamente affidabili, senza richiedere l'immensa potenza di calcolo (e il rischio allucinazioni) del modello a diffusione.`,
    tags: ["Python", "PyTorch", "Computer Vision", "Healthcare"],
    readingTime: 7,
    published: true,
    category: "Research",
  },
  {
    title: "UX Redesign: Il Sito del Trasporto Pubblico (TPER)",
    slug: "ux-redesign-public-transport",
    date: "2024-12-01",
    excerpt:
      "L'applicazione della metodologia Double Diamond per rivoluzionare la UX di TPER, ottenendo un incremento di 35 punti nel punteggio SUS.",
    content: `![Screenshot redesign TPER](/assets/blog/ux-redesign-public-transport/images/carousel-1.png)

**Brief di Progetto:** Riprogettazione dell'esperienza utente del portale di trasporto locale (TPER), con l'obiettivo primario di semplificare la ricerca orari e l'acquisto biglietti da mobile, applicando la metodologia Double Diamond.

## Il Punto di Partenza (Disastroso)

Cosa succede quando un servizio vitale come il trasporto pubblico ha un sito inutilizzabile? Frustrazione, ritardi e chiamate infinite al call center.
Il sito originale di TPER aveva un System Usability Scale (SUS) di 37.5 su 100. La sufficienza mondiale è a 68. 
Tassi di completamento dei task (es. cercare un percorso o comprare un biglietto) bloccati al 40%. Un disastro.


## Il Metodo: Double Diamond

Non bastava "cambiare i colori". Ho applicato il processo strutturato **Double Diamond**: *Discover, Define, Develop, Deliver*.

1. **Discover**: Le interviste sul campo e il Journey Mapping hanno fatto emergere verità spietate. Navigazione incomprensibile, gergo tecnico burocratico e un'esperienza mobile praticamente inesistente.
2. **Define**: Ho sintetizzato il caos in chiari *problem statements*, creando personas rappresentative del pendolare medio e del turista confuso.
3. **Develop**: Dal wireframing in bassa fedeltà a test iterativi veloci con utenti reali.
4. **Deliver**: Prototipi ad alta fedeltà fusi in un Design System pulito e scalabile.

> [!IMPORTANT]
> Un design bellissimo non serve a nulla se non converte. L'obiettivo primario era far sì che l'utente trovasse l'orario del bus in meno di tre click.

## I Risultati sul Campo

I numeri parlano chiaro e giustificano l'investimento in UX Design:

| Metrica | Prima del Redesign | Dopo il Redesign |
|---|---|---|
| **System Usability Scale (SUS)** | 37.5 (Insufficienza Grave) | **72.5 (Buono/Ottimo)** |
| **Task Completion Rate** | ~40% | **>90%** |
| **Time on Task** | Alto (Frustrazione) | Molto Basso (Flusso rapido) |

*Tabella 1: Confronto KPI pre e post redesign*

Visualizza il [Prototipo interattivo su Figma](https://figma.com/).

L'approccio human-centered ha trasformato un labirinto burocratico in un hub digitale moderno ed efficiente.`,
    tags: ["UX Design", "Usability", "Research", "Public Transport"],
    readingTime: 3,
    published: true,
    category: "Design",
  },
  {
    title: "Machine Learning e Fairness: Adult Census Dataset",
    slug: "ml-fairness-adult-census",
    date: "2024-09-15",
    excerpt:
      "Costruzione di una pipeline ML per predire il reddito, valutando le metriche di equità (Fairness) tramite l'analisi SHAP.",
    content: `**Sommario:** Un modello di Machine Learning accurato non è necessariamente giusto. L'Accuracy può nascondere bias discriminatori se i dati storici sono sbilanciati. Utilizzando il dataset Adult Census, analizziamo metriche di fairness (Demographic Parity) su Random Forest e XGBoost, svelando le "proxy variables" con SHAP.

## Oltre la Semplice Accuratezza

I modelli di Machine Learning stanno decidendo chi ottiene un mutuo, chi viene assunto e chi finisce in prigione. Eppure, la maggior parte dei Data Scientist guarda solo l'Accuracy (Accuratezza). 
Un modello accurato al 90% può nascondere bias sistematici devastanti contro minoranze etniche o di genere. 

Ho utilizzato l'UCI Adult Census Dataset per dimostrare quanto questo problema sia radicato.

![Bias analysis chart](/assets/blog/ml-fairness-adult-census/images/bias_chart.png)

## La Pipeline di Test

Ho messo in competizione tre algoritmi pesi massimi: **Logistic Regression**, **Random Forest** e **XGBoost**, incaricandoli di predire se un individuo guadagna più di 50.000$ all'anno.
Ma oltre all'F1-Score, ho aggiunto il calcolo della *Demographic Parity* e dell'*Equal Opportunity*.

> [!NOTE]
> Il feature engineering ha incluso l'encoding rigoroso delle variabili categoriche e la gestione attenta dei valori mancanti, essenziale per non avvelenare i calcoli di SHAP successivi.

## I Risultati: Cosa "Pensa" Davvero il Modello

Tutti i modelli hanno raggiunto precisioni altissime. Ma guardando le metriche di fairness, il quadro era spaventoso. 

| Algoritmo | Accuracy | Demographic Parity Gap | Equal Opportunity Gap |
|---|---|---|---|
| **Logistic Regression** | 82% | Alto | Moderato |
| **Random Forest** | 85% | Molto Alto (Discriminatorio) | Molto Alto |
| **XGBoost** | **87%** | Estremo | Estremo |

*Tabella 1: Risultati e Metriche di Fairness*

Più il modello è potente (XGBoost), più "impara" a sfruttare spietatamente le correlazioni storiche di disuguaglianza presenti nei dati.

L'analisi **SHAP** ha svelato la black box: variabili come il genere (Gender) influenzavano pesantemente la predizione finale, agendo come *proxy variables* occulte. 
Conclusione? La fairness va ingegnerizzata a monte (es. re-weighting), non è un optional.

### Approfondimenti
- [UCI Adult Census Dataset](https://archive.ics.uci.edu/dataset/2/adult)
- [SHAP (SHapley Additive exPlanations)](https://shap.readthedocs.io/)`,
    tags: ["Python", "Machine Learning", "Fairness", "Data Science"],
    readingTime: 4,
    published: true,
    category: "Data Science",
  },
  {
    title: "Sviluppare Plugin di Visualizzazione per Apache Superset",
    slug: "custom-visualization-plugins-superset",
    date: "2024-06-20",
    excerpt:
      "Una guida ingegneristica per creare chart personalizzati in Apache Superset 6.1.0, prendendo come esempio una Calendar Heatmap interattiva.",
    content: `**Abstract**: Guida passo-passo per estendere Apache Superset (v6.1.0) con visualizzazioni React personalizzate, sfruttando l'architettura a plugin e i cross-filter nativi.

![Custom Calendar Heatmap in Superset](/assets/blog/custom-visualization-plugins-superset/images/heatmap.png)

## Perché Sporcarsi le Mani con i Plugin Custom?

Apache Superset è una piattaforma di BI fenomenale, ma i suoi grafici nativi a volte non bastano. Le dashboard aziendali complesse richiedono visualizzazioni studiate su misura. 
La soluzione? Creare plugin React custom per iniettare grafici proprietari direttamente nel cuore di Superset.


## Architettura e Integrazione

I plugin in Superset non sono widget iframe isolati. Sono componenti React di prima classe integrati via Webpack e TypeScript, che ricevono i dati dal query engine nativo (Flask/SQLAlchemy).

Ho sviluppato una **Calendar Heatmap** (simile ai commit di GitHub) per mappare l'intensità di un flusso di eventi giorno per giorno.

> [!TIP]
> Il segreto per un plugin di successo in Superset è il supporto ai **Cross-Filter**. Cliccando su un giorno della Heatmap, l'intera dashboard deve filtrarsi magicamente su quella data.

## Dettagli Tecnici

Costruire un plugin richiede di rispettare interfacce molto rigide.

| Componente Plugin | Responsabilità |
|---|---|
| \`ControlPanel\` | Costruisce l'interfaccia UI laterale per far scegliere colonne e metriche all'utente. |
| \`BuildQuery\` | Traduce la configurazione UI in query formattate per il backend Python di Superset. |
| \`TransformProps\` | Adatta il JSON grezzo del database nei props digeribili dal componente React. |

Registrando il plugin nel registry centrale, la nuova Chart appare nel dropdown nativo, indistinguibile dalle feature originali di Superset. Un lavoro sporco di configurazione Webpack, ma dal valore architetturale inestimabile.`,
    tags: ["Superset", "TypeScript", "React", "Data Visualization"],
    readingTime: 3,
    published: true,
    category: "Development",
  },
];
