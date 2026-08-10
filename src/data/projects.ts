import type { ProjectNode } from "./types";

export const projects: ProjectNode[] = [
  {
    id: "trumetrapla",
    label: "TruMetraPla",
    title: "TruMetraPla",
    slug: "trumetrapla",
    description:
      "Python dashboard to monitor productivity in metalworking processes. Automatic calculation of KPIs from Excel.",
    longDescription:
      "Interactive data dashboard written in Python (Streamlit/Pandas) to optimize productivity in metalworking production processes. It imports raw data from Excel files, cleans it, and calculates KPIs through rich and interactive data visualizations.",
    content: `![TruMetraPla](/assets/projects/trumetrapla/images/cover.png)

## The Factory Challenge

Metalworking companies generate a frightening amount of data, often trapped in disconnected Excel spreadsheets. Finding production bottlenecks is like looking for a needle in a haystack, and it costs hours of manual work every week.

> [!IMPORTANT]
> The goal was to transform chaotic spreadsheets into real-time operational insights, without forcing the company to change its CRM or its habits.


## Architecture and Technological Choices

To ensure maximum backward compatibility on old industrial PCs running Windows, I structured the application as a standalone executable that requires no installation.

| Component | Technology | Motivation |
|---|---|---|
| **Data Engine** | Pandas (Python) | Capable of ingesting and aggregating thousands of rows in milliseconds. |
| **Graphical Interface** | Tkinter / ttkbootstrap | Native deployment on old Windows machines without the overhead of a web browser. |
| **Distribution** | PyInstaller | The operator does not have to install Python. Double click and it starts. |

*Table 1: Architectural Choices of TruMetraPla*

\`\`\`python
# Example: KPI Aggregation on Pandas
import pandas as pd

def calculate_kpi(df):
    return df.groupby("machinery")["produced_pieces"].mean()
\`\`\`

## The Result on the Field

The dashboard replaced hours of manual manipulation in Excel with a **single click** import process. 
Now operators monitor average productivity instantly, identifying efficiency drops via pie charts and dynamic tables.`,
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
      "Ethereum Smart Contract (Sepolia) based DApp for immutable tracking of hospital sanitization activities.",
    longDescription:
      "Full-stack blockchain DApp that logs hospital sanitization operations as immutable transactions on the Ethereum Sepolia testnet. Built with Solidity, Hardhat, and Ethers.js to ensure hygiene compliance.",
    content: `![Hospital Sanitization Tracker](/assets/projects/hospital-sanitization-tracker/images/cover.png)

## The Compliance Challenge

In the post-pandemic world, verifying the completion of hospital environment sanitization (operating rooms, intensive care) is a matter of life or death. Paper logs get lost or can be altered retrospectively to cover up shortcomings.

> [!IMPORTANT]
> This project leverages Blockchain technology to guarantee absolute immutability. Once a sanitization event is logged, no one will ever be able to delete or modify it again. No database admin has this power.


## DApp Architecture

This Decentralized Application (DApp) uses a strict Role-Based Access Control (RBAC) system to separate the responsibilities of Operators from those of Inspectors (Auditors).

| Module | Tech Stack | Architectural Role |
|---|---|---|
| **Smart Contracts** | Solidity | Deployed on Sepolia testnet. Handle access logic and immutable log saving. |
| **Frontend** | React & Web3.js | Clean interface to allow staff to interact via MetaMask. |
| **Storage Layer** | Ethereum Blockchain | Cryptographic verification of timestamps and operator signatures. |

*Table 1: DApp Architectural Layers*

\`\`\`solidity
// Emitting a sanitization event on-chain
event SanitizationLogged(
    address indexed operator,
    string roomId,
    uint256 timestamp
);
\`\`\`

## Results

The system demonstrated how decentralized consensus mechanisms can be applied to public health. It provides a transparent and secure *audit trail* that hospital management can rely on without hesitation.`,
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
      "Web app to edit offline GPS tracks: smoothing, point cutting, and real-time generated elevation profiles.",
    longDescription:
      "A browser-based GPS editor for cyclists. It allows you to edit GPX files to fix power spikes (watts) or speed glitches before uploading them to Strava. Everything runs client-side.",
    content: `![GPX Editor Web App](/assets/projects/gpx-editor/images/cover.png)

## Why a GPX Editor in the Browser?

Cyclists and runners often find themselves with GPS tracks ruined by impossible speed spikes (signal glitches) or power meter errors. Correcting these errors before uploading the workout to Strava used to require heavy desktop software.
My solution: a web-based, fast, and 100% offline tool.


## Main Features

All computation happens in your browser. Zero servers. Maximum Privacy.

1. **Client-Side Processing**: No uploads. The algorithm reads the local file.
2. **Power (Watts) Correction**: Scales, cuts, or lowers power data on specific segments.
3. **Speed Correction**: Flattens anomalous spikes due to signal loss.
4. **Pure Export**: Generates a clean \`.gpx\` file ready to upload to Garmin Connect.

> [!TIP]
> Because everything runs in the browser via DOMParser, you can load a 50MB GPX file (a very long bike ride) and the processing will be instantaneous, with no loading downtime.

## Tech Stack

I aimed for extreme lightness.

| Library | Usage | Motivation |
|---|---|---|
| **TypeScript** | Core | Bug prevention in coordinate manipulation. |
| **Leaflet** | Map Rendering | Lightweight, open-source, and incredibly fast at drawing complex polylines. |
| **Chart.js** | Elevation | Ideal for visualizing elevation in relation to distance. |

*Table 1: Client-side Tech Stack*

\`\`\`typescript
// Pure client-side parsing, no backend
const fileReader = new FileReader();
fileReader.onload = (e) => {
  const gpxData = parseGPX(e.target.result);
  renderMap(gpxData);
};
\`\`\``,
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
      "Stochastic simulation (Discrete-time Markov Chains) of the SIR epidemiological model, with Monte Carlo analysis.",
    longDescription:
      "Academic project (UniBo) for simulating epidemic spread. Replaces classic differential equations with Markovian transition matrices to capture random fluctuations in small groups.",
    content: `![SIR Markov Chain](/assets/projects/sir-markov-chain/images/cover.png)

> **Key Takeaways:** The Markovian approach allows inserting discrete stochastic events, simulating lockdowns and reopenings much more closely to reality than continuous models.

## Epidemiological Models: Determinism vs Stochasticity

The classic SIR model uses elegant differential equations. It works well on large populations but fails when numbers are small and the chaos of chance takes over.
This academic project tackles the problem by simulating the spread of a virus as a **Discrete-time Markov Chain**.


## How It Works

Unlike the continuous model, here time advances in "steps" (e.g., days).

- Every individual has an exact mathematical probability of becoming infected or recovering on day T+1.
- These probabilities make up huge **Transition Matrices**.
- By modifying the matrix on the fly, we can simulate sudden interventions (e.g., a lockdown).

> [!WARNING]
> A single stochastic simulation has no predictive value. This is why the system uses **Monte Carlo** simulations: it runs the model thousands of times and calculates the final probability distribution, providing a safety "range".

## Technologies

Being a computation-intensive task on matrices, Python was the obvious choice.

| Tool | Purpose |
|---|---|
| **Python** | Logic engine. |
| **NumPy** | Ultra-fast vectorized operations on transition matrices. |
| **Matplotlib** | Plotting epidemic curves and Monte Carlo distributions. |

*Table 1: Scientific tools in Python*`,
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
      "Comparison between Total Variation, UNet, and DiffPIR for the restoration of cervical cytology images (LBC).",
    longDescription:
      "Research project to clean up noise and blur from Pap smear slides. Evaluates the impact of generative diffusion models against classic mathematical deblurring to avoid medical 'hallucinations'.",
    content: `![Cervical LBC Deblurring](/assets/projects/ci-cervical-lbc/images/cover.png)

**Abstract:** Technical evaluation of mathematical methods (Total Variation) vs Deep Learning (UNet, DiffPIR) for the restoration of LBC cytology images.

## The Clinical Problem: Noise in Pap Smears

The accuracy of a cervical cancer screening relies entirely on the visual quality of the sample (LBC). When the microscope image is blurred or noisy, the diagnosis is at risk.
The solution is not to discard the sample, but to restore the image algorithmically.


## The AI Models Ring

I implemented and pitted three historically opposed approaches against each other:

1. **Total Variation (TV)**: Pure classic math. Reduces noise while preserving sharp edges. No AI model, no GPU required.
2. **UNet**: The queen of Deep Learning for medical segmentation. It is trained to clean images pixel by pixel.
3. **DiffPIR**: State-of-the-art Generative AI (Diffusion Models). Creates the image from pure Gaussian noise, guided by the degraded sample.

| Algorithm | Pros | Cons |
|---|---|---|
| **Total Variation** | 100% Reliable (No hallucinations) | Rough cleaning |
| **UNet** | Very high PSNR score | Requires huge training datasets |
| **DiffPIR** | Breathtaking final detail | **Risk of inventing fake tumors (Hallucinations)** |

*Table 1: Trade-off between Restoration methods*

> [!IMPORTANT]
> Aesthetics must never beat clinical reliability. UNet confirmed itself as the best compromise between cleaning ability and absence of dangerous generative hallucinations for the patient.`,
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
      "Machine Learning on the UCI Adult dataset: income prediction and in-depth investigation of Fairness metrics.",
    longDescription:
      "Complete ML pipeline that exposes algorithmic biases. A 90% Accuracy is not enough: through Demographic Parity and SHAP analysis, the project demonstrates how models actively discriminate by gender and ethnicity.",
    content: `![SGF² AI Fairness Analysis](/assets/projects/sgf2-ai-project/images/cover.png)

**Abstract:** A high-accuracy classification model can hide ethnic or gender biases. This project analyzes Fairness metrics on the Adult Census dataset and reveals the internal dynamics using SHAP values.

## The Dark Side of Accuracy

If a predictive model reaches 87% Accuracy, it's ready for production, right? **Wrong.**
This project debunks the myth of Accuracy by analyzing the famous *UCI Adult* dataset (income prediction). I built a complete Machine Learning pipeline just to prove a point: powerful models learn to discriminate in a very powerful way.

![SHAP Waterfall Analysis](/assets/projects/sgf2-ai-project/images/cover.png)

## The Challengers

I compared three architectures, from the simplest to the most complex:

- Logistic Regression
- Random Forest
- XGBoost (The reigning champion for tabular data)

All three brilliantly passed standard precision tests (ROC-AUC, F1-Score).

> [!WARNING]
> When I introduced *Fairness* metrics (Demographic Parity and Equal Opportunity Gap), the picture grew grim. The XGBoost model, the most accurate one, was also the one that discriminated the most based on sex.

## Understanding the "Why" with SHAP

Ensemble models are "Black Boxes". To open them, I used **SHAP** analysis.

| Algorithm | Real Accuracy | Detected Bias Level | Explainability (SHAP) |
|---|---|---|---|
| **Log Regression** | Fair | Low | Linear weights are transparent |
| **Random Forest** | Good | High | Possible, but complex |
| **XGBoost** | **Excellent** | **Critical (Proxy variables on gender)** | Strong non-linear interactions revealed |

*Table 1: ML Models Comparison on Accuracy vs Fairness*

The study's conclusion is that every ML deployment must necessarily include a Fairness Auditing and upstream debiasing step, otherwise we are just automating the inequalities of the past.`,
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
      "Complete redesign (Double Diamond) for the TPER public transport website. SUS score improved from 37.5 to 72.5.",
    longDescription:
      "An end-to-end UX research project. From field interviews to interactive prototypes, redesigning the entire ticket purchasing and timetable search experience for TPER, bringing down user frustration.",
    content: `![TperTutti UX Redesign Mockup](/assets/projects/tpertutti-ux-redesign/images/cover.png)

**Abstract:** From bureaucratic nightmare to a 3-click checkout. Practical application of the Double Diamond methodology for a UX Research and UI Design project.

## The Original Problem

The Emilia-Romagna public transport website (TPER) suffered from a common disease in the public sector: it was designed for those who managed it, not for those who used it.
The initial Usability Score (SUS) was a catastrophic **37.5 out of 100**. People couldn't find timetables. 


## The Cure: Double Diamond Methodology

Design is not art, it is problem solving. I led the redesign following the *Double Diamond* framework:

1. **Discover**: Exploratory research. 15 contextual interviews with commuters and tourists. I mapped their "Customer Journey", discovering unbearable peaks of frustration during checkout.
2. **Define**: Clear definition of *Personas* and formulation of key problems. (E.g.: "How can we make purchasing a ticket quick from a smartphone?")
3. **Develop**: Rapid sketching, low-fidelity wireframes, and continuous A/B testing with users to quickly discard the worst ideas.
4. **Deliver**: Final Design System and high-fidelity interactive prototype.

> [!TIP]
> In UX, you fail early to learn fast. Three iteration cycles on raw wireframes are worth much more than weeks spent beautifying a wrong design on Figma.

## The Numbers of Success

At the end of the journey, the new usability tests returned unequivocal numbers:

| Success Metric | Old Site (Baseline) | New Design | Improvement |
|---|---|---|---|
| **SUS Score** | 37.5 / 100 | **72.5 / 100** | +93% |
| **Task Completion** | ~40% | **>90%** | Drastic |
| **Purchase Time** | > 3 minutes | **< 45 seconds** | Quantum leap |

*Table 1: Pre and Post redesign KPIs*`,
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
      "React plugin for Apache Superset: an interactive Calendar Heatmap for temporal exploration of dashboards.",
    longDescription:
      "Development of a custom chart plugin for Apache Superset (BI Tool). It allows analysts to highlight temporal patterns (GitHub contributions style) and dynamically filter the entire dashboard by clicking on days or date ranges.",
    content: `![Superset Calendar Filter](/assets/projects/superset-calendar-filter/images/cover.png)

**Abstract:** Creation of a custom React plugin for Apache Superset that supports bidirectional Cross-Filtering to highlight temporal patterns.

## Expanding Apache Superset

Superset is one of the most powerful open-source Business Intelligence tools in the world, but its standard charts have limitations. When a company needs to visualize the density of daily events (think of the GitHub commit grid), a simple bar chart is not enough. 

You need a **Custom Plugin**.


## Plugin Components

Superset plugins are real React applications packaged via Webpack that dialogue with the Superset Python backend engine (Flask).

The main complexity lies in the data architecture:

| Plugin Module | What does it do? |
|---|---|
| **ControlPanel** | Adds the dropdown menu on the left of Superset to let the user select metrics and date columns. |
| **BuildQuery** | Generates the JSON that instructs the backend to perform SQL aggregations (GROUP BY date). |
| **React Component** | Uses \`Emotion\` for styling and renders the vector grid. |

*Table 1: Standard architecture of a Superset Plugin*

\`\`\`typescript
import { Behavior, getChartMetadataRegistry } from "@superset-ui/core";
// The plugin supports the emission of Cross-Filter events
export const metadata = new ChartMetadata({
  name: "Calendar Heatmap",
  behaviors: [Behavior.INTERACTIVE_CHART],
});
\`\`\`

> [!IMPORTANT]
> The real added value of this plugin is the integration with Superset's **Native Cross-Filtering**. If you click on a small red square on the Heatmap (e.g., August 15th), *all* the other charts on the dashboard are instantly filtered to that specific date.

The result is extremely fluid and organic data exploration, written entirely in **TypeScript** to ensure solidity.`,
    color: "var(--color-nebula)",
    tags: ["Superset", "TypeScript", "React", "Cross-Filter"],
    skills: ["data-science", "cloud-arch"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "📅",
  },
];
