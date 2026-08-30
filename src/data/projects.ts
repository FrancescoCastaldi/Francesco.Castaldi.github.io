import type { ProjectNode } from "./types";

export const projects: ProjectNode[] = [
  // --- OPEN SOURCE CONTRIBUTIONS ---
  {
    id: "evidence-bi-as-code",
    label: "Evidence (BI as Code)",
    title: "Evidence — BI as Code (Open Source Contribution)",
    slug: "evidence-bi-as-code",
    description:
      "Architected global multi-language system, language switcher, full Italian localization, MetricCard, and FilterPresets for Evidence BI.",
    longDescription:
      "Upstream open-source contribution to evidence-dev/evidence (Svelte & TypeScript): architected the global multi-language system, language switcher UI, complete Italian localization, all-in-one MetricCard, interactive FilterPresets, and cross-filtering data configurations.",
    content: `![Evidence BI as Code](/assets/projects/evidence-bi-as-code/images/cover.png)

## Overview & The Challenge

[Evidence](https://github.com/evidence-dev/evidence) is an open-source framework for building Business Intelligence reports as code using Markdown and SQL. As the platform expanded internationally, European enterprises and localized analytics teams required native multi-language support, automated UI translations, and more versatile metric summary components.

> [!IMPORTANT]
> I designed and contributed the core internationalization (i18n) layer, dynamic language switcher, complete Italian localization, and high-density dashboard components directly to the upstream evidence-dev repository.

## Architectural Additions

The contribution encompasses full-stack frontend architecture across the Evidence monorepo:

| Component | Technology | Impact |
|---|---|---|
| **Multi-Language Engine** | TypeScript & Svelte Stores | Reactive client-side locale switching with zero page reload latency. |
| **Italian Localization** | JSON Schema / i18n | Full translation of all error states, export tools, query inspectors, and UI labels. |
| **MetricCard Component** | Svelte 5 / Tailwind | Unified KPI component supportingsparklines, variance trends, and target comparisons. |
| **FilterPresets** | SQLGlot & Svelte | Persistent quick-filter dropdowns and cross-filtering synchronization across tabs. |

*Table 1: Key Architectural Additions in Evidence BI*

\`\`\`typescript
// Example: Reactive locale switching store in Evidence UI
import { writable, derived } from 'svelte/store';
import { translations } from './locales';

export const currentLocale = writable('it');
export const t = derived(currentLocale, ($locale) => (key: string) => {
  return translations[$locale]?.[key] ?? translations['en']?.[key] ?? key;
});
\`\`\`

## Results & Upstream Integration

- Seamless multi-language report generation for worldwide teams.
- Drastically reduced boilerplate when setting up localized KPI dashboards.
- Merged and maintained in upstream releases of Evidence.`,
    tags: ["Svelte", "TypeScript", "SQL", "Open Source", "BI as Code", "i18n"],
    skills: ["open-source", "web-dev", "data-science", "cloud-arch"],
    color: "#38bdf8",
    links: {
      github: "https://github.com/evidence-dev/evidence",
    },
    featured: true,
    icon: "📊",
  },
  {
    id: "apache-superset-contributions",
    label: "Apache Superset",
    title: "Apache Superset — Enterprise Localization & Specs",
    slug: "apache-superset-contributions",
    description:
      "Led full Italian translation overhaul, database engine specs metadata enrichment, and SQLGlot optimizer hints preservation.",
    longDescription:
      "Upstream contributions to Apache Superset (ASF): led full Italian translation overhaul with strict placeholder validation, enriched database engine specs metadata, preserved optimizer hints during SQLGlot parsing, and resolved default catalog mappings.",
    content: `![Apache Superset](/assets/projects/apache-superset-contributions/images/cover.png)

## Enterprise BI at Scale

[Apache Superset](https://github.com/apache/superset) is the premier open-source data exploration and visualization platform used by thousands of companies worldwide. Working with Superset in complex enterprise environments revealed critical opportunities in translation completeness, SQL parser dialect compatibility, and catalog resolution.

> [!IMPORTANT]
> Contributions to Apache Superset were focused on production stability: comprehensive Italian translation overhaul, query optimizer hint preservation in SQLGlot ASTs, and database engine spec optimizations.

## Technical Contributions

1. **Italian Localization Overhaul**: Re-architected and updated over 3,000 translation keys with strict parameter placeholder validation to prevent Flask Babel formatting exceptions.
2. **SQL Parser & Optimizer Hints**: Enhanced SQLGlot parser integration in Superset's SQL Lab to preserve database engine-specific optimizer hints (e.g. \`/*+ INDEX(t1) */\`) during query rewriting.
3. **Database Engine Specs**: Enriched metadata definitions and default catalog resolution for modern analytical engines (ClickHouse, DuckDB, Trino).

| Area | Stack | Focus |
|---|---|---|
| **Localization (i18n)** | Python / Babel / PO files | Zero missing tokens, automated placeholder integrity checks. |
| **SQL Engine Specs** | Python / SQLAlchemy / SQLGlot | AST preservation, dialect-specific quoting, and catalog routing. |
| **Frontend UI** | React / TypeScript / Emotion | UI string localization and modal responsive spacing. |

*Table 1: Superset Core Contribution Areas*

\`\`\`python
# Example: Preserving optimizer hints during AST transformations
def extract_hints_and_transform(sql_query: str, dialect: str) -> str:
    parsed = sqlglot.parse_one(sql_query, read=dialect)
    # Ensure comments and optimizer hints remain intact
    return parsed.sql(dialect=dialect, comments=True)
\`\`\``,
    tags: ["Python", "Flask", "React", "TypeScript", "SQLGlot", "Open Source"],
    skills: ["open-source", "data-science", "cloud-arch", "web-dev"],
    color: "#22c55e",
    links: {
      github: "https://github.com/apache/superset",
    },
    featured: true,
    icon: "⚡",
  },
  {
    id: "docker-cli-contributions",
    label: "Docker CLI",
    title: "Docker CLI — Shell Completion & Plugin Discovery",
    slug: "docker-cli-contributions",
    description:
      "Maintained and fixed shell completion routines for Docker CLI plugins under Zsh, ensuring stable automated plugin discovery.",
    longDescription:
      "Upstream patch for the official Docker Command-Line Interface (docker/cli in Go): fixed shell completion routines under Zsh for third-party and native plugins, preventing arithmetic evaluation errors and stabilizing plugin discovery.",
    content: `![Docker CLI](/assets/projects/docker-cli-contributions/images/cover.png)

## The Command Line Experience

The official [Docker CLI](https://github.com/docker/cli) is executed millions of times daily by developers worldwide. When using Docker CLI plugin architectures on modern Unix shells like Zsh, automated completion routines could encounter evaluation errors under specific environment configurations.

> [!TIP]
> Fixed Zsh shell completion routines to properly handle dynamic plugin binary paths without throwing evaluation exceptions during tab-completion.

## Technical Details

- **Language**: Go / Bash / Zsh scripting
- **Component**: \`cli/command/completion\`
- **Resolution**: Streamlined plugin list expansion and ensured robust fallback when plugin binaries return non-zero exit codes during inspection.`,
    tags: ["Go", "Zsh", "Docker", "CLI", "Open Source"],
    skills: ["open-source", "cloud-arch"],
    color: "#38bdf8",
    links: {
      github: "https://github.com/docker/cli",
    },
    featured: true,
    icon: "🐳",
  },
  {
    id: "kanister-kubernetes-operator",
    label: "Kanister (CNCF)",
    title: "Kanister — Kubernetes Application Data Management",
    slug: "kanister-kubernetes-operator",
    description:
      "Enhanced Kanister operator Helm chart infrastructure by introducing imagePullSecrets support for air-gapped clusters.",
    longDescription:
      "CNCF sandbox project contribution: enhanced Kanister operator Helm chart infrastructure by introducing imagePullSecrets support across all sub-components, enabling enterprise deployment in air-gapped and secure private registries.",
    content: `![Kanister Kubernetes](/assets/projects/kanister-kubernetes-operator/images/cover.png)

## Kubernetes Data Management in Air-Gapped Environments

[Kanister](https://github.com/kanisterio/kanister) is a Cloud Native Computing Foundation (CNCF) project for application-level data backup, restore, and mobility on Kubernetes. In restricted enterprise environments (banking, healthcare, defense), container images must be pulled exclusively from authenticated private registries.

> [!IMPORTANT]
> Added full support for configurable \`imagePullSecrets\` across the Kanister Helm chart hierarchy (controller, blueprint runners, and sidecars), unblocking enterprise air-gapped deployments.

## Contribution Architecture

- Added global and per-subchart \`imagePullSecrets\` templating in Helm.
- Validated compatibility with OpenShift, EKS, and vanilla Kubernetes 1.28+.
- Ensured zero regression on existing non-authenticated Helm deployments.`,
    tags: ["Kubernetes", "Helm", "Go", "Cloud Native", "CNCF"],
    skills: ["open-source", "cloud-arch"],
    color: "#a855f7",
    links: {
      github: "https://github.com/kanisterio/kanister",
    },
    featured: true,
    icon: "☸️",
  },
  {
    id: "duckle-workspace-orchestration",
    label: "Duckle Orchestration",
    title: "Duckle — Workspace Orchestration & Template Engine",
    slug: "duckle-workspace-orchestration",
    description:
      "Engineered dynamic time offset handling in template evaluation and implemented inline config rollups with crash recovery.",
    longDescription:
      "Open-source contributions to Duckle (slothflowlabs/duckle): built dynamic time offset handling for SQL template engines, inline configuration rollups, and crash-resilient active job recovery routines for high-throughput DuckDB data pipelines.",
    content: `![Duckle Orchestration](/assets/projects/duckle-workspace-orchestration/images/cover.png)

## Embedded Data Pipelines on DuckDB

[Duckle](https://github.com/slothflowlabs/duckle) is an open-source ETL/ELT data engine built on top of DuckDB. Designed for high-speed local and server deployments, it allows orchestrating data pipelines without cloud vendor lock-in.

> [!TIP]
> Implemented dynamic time offset syntax in SQL template rendering (e.g., \`{{ execution_date - 3d }}\`) and built resilient worker state rollups to recover pipeline state after process restarts.`,
    tags: ["DuckDB", "Python", "SQL", "ETL/ELT", "Data Pipelines"],
    skills: ["open-source", "data-science", "cloud-arch"],
    color: "#eab308",
    links: {
      github: "https://github.com/slothflowlabs/duckle",
    },
    featured: true,
    icon: "🦆",
  },

  // --- FEATURED HARDWARE & SOFTWARE PROJECTS ---
  {
    id: "mini-jersey-studio",
    label: "Mini Jersey Studio",
    title: "Mini Jersey Studio — 3D WebGL Customizer",
    slug: "mini-jersey-studio",
    description:
      "Interactive 3D WebGL apparel customizer with dynamic planar texture projection, custom GLB import, and Tech Pack export.",
    longDescription:
      "Real-time 3D cycling jersey & apparel customizer built with Three.js and TypeScript. Features SVG-to-Canvas dynamic texture projection, custom GLB/GLTF model parsing, multi-layer decal placement, and automated Tech Pack production export for apparel manufacturing.",
    content: `![Mini Jersey Studio](/assets/projects/mini-jersey-studio/images/cover.png)

## Real-Time 3D Apparel Customization

Mini Jersey Studio is a browser-based 3D design studio for cycling kits and sportswear. Designers can apply colors, vector gradients, sponsor logos, and patterns directly onto 3D garments with instantaneous WebGL texture baking.

> [!IMPORTANT]
> The engine utilizes dynamic UV coordinate mapping and OffscreenCanvas layers to project 2D SVG vector artwork onto complex 3D non-planar meshes in real time at 60 FPS.

## Key Capabilities

1. **3D Mesh Rendering**: Interactive Three.js viewport with OrbitControls, PBR materials, and realistic fabric normal maps.
2. **Planar & Decal Projection**: High-resolution logo placement with interactive scale, rotate, and snap-to-seam controls.
3. **Tech Pack Production Export**: Converts the 3D model configuration into flat 2D pattern templates with Pantone color codes ready for sublimation printing.

| Component | Technology | Role |
|---|---|---|
| **3D Viewport** | Three.js / WebGL / GLTFLoader | Real-time PBR rendering and lighting setup. |
| **Texture Engine** | HTML5 Canvas / SVG Matrix | Off-screen baking of multi-layer vector decals. |
| **UI Framework** | React / TypeScript / Tailwind | Colorway palettes, asset library, and layer stack. |

*Table 1: Mini Jersey Studio Technical Architecture*`,
    tags: ["Three.js", "WebGL", "TypeScript", "React", "3D Modeling"],
    skills: ["web-dev", "cycling-analytics"],
    color: "#06b6d4",
    links: {
      github: "https://github.com/FrancescoCastaldi/mini-jersey-studio",
    },
    featured: true,
    icon: "👕",
  },
  {
    id: "hailcast-ml-radar-nowcasting",
    label: "HailCast-ML",
    title: "HailCast-ML — Radar Nowcasting & Hail Detection",
    slug: "hailcast-ml-radar-nowcasting",
    description:
      "Real-time hail tracking & convective nowcasting platform using open-source radar networks, optical flow, and deep learning.",
    longDescription:
      "A meteorological nowcasting and radar processing platform. Ingests dual-polarization radar reflectivity matrices, applies cell tracking and optical flow motion vectors, and uses ML models to predict hail probability and severe storm trajectories in real time.",
    content: `![HailCast-ML](/assets/projects/hailcast-ml-radar-nowcasting/images/cover.png)

## Convective Storm Nowcasting

Severe convective storms and hailstorms cause millions in damage within minutes. HailCast-ML is an end-to-end radar nowcasting platform that analyzes open-source meteorological radar data in real time to detect severe convective cells and predict hail trajectories.

> [!WARNING]
> Standard numerical weather models have update cycles of 3-6 hours. HailCast-ML operates on 5-minute radar scan loops to compute instantaneous storm cell kinematics.

## Processing Pipeline

- **Data Ingestion**: Dual-polarization radar matrices (Z, ZDR, KDP) from open radar networks.
- **Computer Vision Tracking**: Gunnar Farneback optical flow and TITAN (Thunderstorm Identification, Tracking, Analysis and Nowcasting) centroid clustering.
- **Machine Learning Inference**: Random Forest / Gradient Boosted ensemble predicting Maximum Expected Size of Hail (MESH) and severe gust probabilities.`,
    tags: ["Python", "Machine Learning", "Computer Vision", "Meteorology", "NumPy"],
    skills: ["data-science", "ai-ml"],
    color: "#f43f5e",
    links: {
      github: "https://github.com/FrancescoCastaldi/hailcast-ml",
    },
    featured: true,
    icon: "⛈️",
  },
  {
    id: "toyota-m15a-connecting-rod",
    label: "Toyota M15A Connecting Rod",
    title: "Toyota M15A Connecting Rod — Kinematics & FEA",
    slug: "toyota-m15a-connecting-rod",
    description:
      "Kinematic, dynamic inertia, fatigue (Goodman-Smith), and FEA simulation of the connecting rod for Toyota Yaris Mk4 1.5L.",
    longDescription:
      "Complete mechanical engineering design and structural verification for the connecting rod of the Toyota Dynamic Force 1.5L M15A-FXE engine (Yaris Mk4). Features dynamic piston acceleration and gas pressure inertia calculations, Goodman-Smith fatigue criteria, and Ansys FEA mesh convergence.",
    content: `![Toyota M15A Connecting Rod](/assets/projects/toyota-m15a-connecting-rod/images/cover.png)

## Automotive Mechanical Engineering

The Toyota M15A-FXE (Dynamic Force 1.5L 3-cylinder) powers the Toyota Yaris Mk4 Hybrid with up to 41% thermal efficiency. This project performs a complete structural, dynamic, and fatigue analysis of the engine's connecting rod under peak combustion pressure (120 bar) and high-RPM inertia loads.

> [!IMPORTANT]
> The connecting rod was modeled in 3D CAD according to ISO GPS standards and subjected to FEA mesh convergence tests and Goodman-Smith high-cycle fatigue criteria.

## Engineering Workflow

1. **Kinematics & Inertia**: Derived piston displacement, velocity, and acceleration equations as functions of crankshaft angle \`θ\`.
2. **Pressure vs Inertia Load Curves**: Computed net forces across the 4-stroke cycle, identifying peak tensile loads at TDC overlap and peak compressive loads at ignition.
3. **FEA Verification**: Ansys structural simulation for Von Mises stress distribution on small-end bushing, I-beam shank, and big-end journal.
4. **Fatigue Verification**: Goodman-Smith diagrams with safety factors \`n > 1.8\` under infinite-life regime (10^7 cycles).`,
    tags: ["CAD", "FEA", "Kinematics", "SolidWorks", "Automotive"],
    skills: ["automotive-eng", "consulting"],
    color: "#f97316",
    links: {
      github: "https://github.com/FrancescoCastaldi/toyota-m15a-connecting-rod",
    },
    featured: true,
    icon: "⚙️",
  },
  {
    id: "velometric",
    label: "VeloMetric",
    title: "VeloMetric — Road Cycling Wear Telemetry",
    slug: "velometric",
    description:
      "Predictive component wear and tear analytics platform for performance road cycling based on ride power and weather telemetry.",
    longDescription:
      "High-precision predictive maintenance platform for performance road bikes. Ingests Strava & Garmin FIT telemetry, models drivetrain friction loss, chain elongation, tire compound wear rates, and delivers proactive maintenance scheduling.",
    content: `![VeloMetric](/assets/projects/velometric/images/cover.png)

## Precision Wear Analytics for Road Cycling

Drivetrain wear, cassette erosion, and tire compound degradation are directly correlated with mechanical wattage output, cadence torque, rider weight, and environmental precipitation. VeloMetric moves beyond crude kilometer-based maintenance rules to deliver physics-based wear predictions.

> [!TIP]
> By integrating Normalized Power (NP), Torque (Nm), and Strava weather data, VeloMetric calculates exact chain elongation rates (\`0.5%\` and \`0.75%\` thresholds) and recommends proactive replacement before costly cassette damage occurs.`,
    tags: ["Python", "TypeScript", "Strava API", "Telemetry", "Cycling"],
    skills: ["cycling-analytics", "data-science"],
    color: "#10b981",
    links: {
      github: "https://github.com/FrancescoCastaldi/VeloMetric",
    },
    featured: true,
    icon: "🚴",
  },
  {
    id: "epson-air-resuscitator",
    label: "Epson Air Resuscitator",
    title: "Epson Air Resuscitator — Wireless EEPROM Resetter",
    slug: "epson-air-resuscitator",
    description:
      "Wireless EEPROM Waste Ink Pad counter resetter and telemetry suite for Epson printers via reverse-engineered SNMP packets.",
    longDescription:
      "Zero-cost wireless utility that bypasses manufacturer artificial end-of-life lockouts on Epson EcoTank and WorkForce printers. Reverse-engineers raw SNMP byte packets over local Wi-Fi to read and reset the internal waste ink pad EEPROM counter.",
    content: `![Epson Air Resuscitator](/assets/projects/epson-air-resuscitator/images/cover.png)

## Hardware Hacking & Right to Repair

Many inkjet printers (Epson EcoTank/WorkForce) contain internal waste ink pad sponge counters. When the counter reaches 100%, the printer firmware triggers a hard lockout error (*"Service Required"*), artificially bricking an otherwise perfectly functional device.

Commercial reset utilities charge steep subscription keys for a 5-second serial write. Epson Air Resuscitator solves this permanently via local wireless reverse engineering.

> [!IMPORTANT]
> By capturing network traffic during diagnostic handshakes, I identified the proprietary SNMP OIDs and raw payload bytes required to query and zero out the EEPROM waste counter over standard Wi-Fi. Zero physical disassembly required.`,
    tags: ["Reverse Engineering", "SNMP", "Python", "Networking", "Hardware"],
    skills: ["reverse-eng", "data-science"],
    color: "#ec4899",
    links: {
      github: "https://github.com/FrancescoCastaldi/epson-air-resuscitator",
    },
    featured: true,
    icon: "🖨️",
  },
  {
    id: "trumetrapla",
    label: "TruMetraPla",
    title: "TruMetraPla — Industrial Productivity Dashboard",
    slug: "trumetrapla",
    description:
      "Python dashboard to monitor productivity in metalworking processes. Automatic calculation of KPIs from raw Excel sheets.",
    longDescription:
      "Interactive data dashboard written in Python (Streamlit/Pandas) to optimize productivity in metalworking production processes. It imports raw data from Excel files, cleans it, and calculates KPIs through rich and interactive data visualizations.",
    content: `![TruMetraPla](/assets/projects/trumetrapla/images/cover.png)

## The Factory Challenge

Metalworking companies generate a frightening amount of data, often trapped in disconnected Excel spreadsheets. Finding production bottlenecks is like looking for a needle in a haystack, and it costs hours of manual work every week.

> [!IMPORTANT]
> The goal was to transform chaotic spreadsheets into real-time operational insights, without forcing the company to change its CRM or its habits.

## Architecture and Technological Choices

To ensure maximum backward compatibility on industrial PCs running Windows, I structured the application as a standalone executable that requires no external setup.

| Component | Technology | Motivation |
|---|---|---|
| **Data Engine** | Pandas (Python) | Capable of ingesting and aggregating thousands of rows in milliseconds. |
| **Graphical Interface** | Tkinter / ttkbootstrap | Native deployment on Windows machines without browser overhead. |
| **Distribution** | PyInstaller | The operator does not have to install Python. Double click and it starts. |

*Table 1: Architectural Choices of TruMetraPla*

\`\`\`python
# Example: KPI Aggregation on Pandas
import pandas as pd

def calculate_kpi(df):
    return df.groupby("machinery")["produced_pieces"].mean()
\`\`\`

## The Result on the Field

The dashboard replaced hours of manual manipulation in Excel with a **single click** import process. Now operators monitor average productivity instantly, identifying efficiency drops via dynamic tables and interactive breakdown charts.`,
    tags: ["Python", "Data Analysis", "Dashboard", "Pandas"],
    skills: ["data-science", "healthcare-it"],
    color: "var(--color-star-gold)",
    links: {
      github: "https://github.com/FrancescoCastaldi/TruMetraPla",
    },
    featured: true,
    icon: "🏭",
  },
  {
    id: "tpertutti-ux",
    label: "TperTutti UX",
    title: "TperTutti — Public Transport UX Redesign",
    slug: "tpertutti-ux-redesign",
    description:
      "Complete redesign (Double Diamond) for the TPER public transport website. SUS score improved from 37.5 to 72.5.",
    longDescription:
      "An end-to-end UX research project. From field interviews to interactive prototypes, redesigning the entire ticket purchasing and timetable search experience for TPER, bringing down user frustration.",
    content: `![TperTutti UX Redesign Mockup](/assets/projects/tpertutti-ux-redesign/images/cover.png)

## The Original Problem

The Emilia-Romagna public transport website (TPER) suffered from a common disease in the public sector: it was designed for those who managed it, not for those who used it. The initial Usability Score (SUS) was a catastrophic **37.5 out of 100**.

## The Cure: Double Diamond Methodology

Design is not art, it is problem solving. I led the redesign following the *Double Diamond* framework:

1. **Discover**: Exploratory research. 15 contextual interviews with commuters and tourists. Mapped customer journeys with frustration peaks at checkout.
2. **Define**: Formulated Personas and key HMW (How Might We) questions.
3. **Develop**: Rapid sketching, low-fidelity wireframes, and continuous A/B testing with users.
4. **Deliver**: Final Design System and 22-page high-fidelity interactive prototype.

| Success Metric | Old Site (Baseline) | New Design | Improvement |
|---|---|---|---|
| **SUS Score** | 37.5 / 100 | **72.5 / 100** | +93% |
| **Task Completion** | ~40% | **>90%** | Drastic |
| **Purchase Time** | > 3 minutes | **< 45 seconds** | Quantum leap |

*Table 1: Pre and Post Redesign KPIs*`,
    tags: ["UX Design", "Double Diamond", "Usability", "University"],
    skills: ["consulting", "healthcare-it"],
    color: "#E2E8F0",
    links: {
      github: "https://github.com/FrancescoCastaldi/Esame-UUXD",
    },
    featured: true,
    icon: "🎨",
  },
  {
    id: "sir-markov",
    label: "SIR Markov Chain",
    title: "SIR Markov Chain — Stochastic Epidemic Simulation",
    slug: "sir-markov-chain",
    description:
      "Discrete-time Markov Chain simulation of the SIR epidemiological model with Monte Carlo trajectory analysis.",
    longDescription:
      "Academic project (UniBo) for simulating epidemic spread. Replaces classic differential equations with Markovian transition matrices to capture random fluctuations in small groups.",
    content: `![SIR Markov Chain](/assets/projects/sir-markov-chain/images/cover.png)

## Epidemiological Models: Determinism vs Stochasticity

The classic SIR model uses differential equations that work well on large populations but fail when numbers are small and random fluctuations take over. This academic project tackles the problem by simulating epidemic spread as a **Discrete-Time Markov Chain**.

## How It Works

- Time advances in discrete steps (days).
- Individuals transition between Susceptible, Infectious, and Recovered states based on calculated probability distributions.
- **Monte Carlo Simulations**: Runs thousands of trajectories to output statistical confidence intervals and outbreak probabilities.`,
    tags: ["Python", "NumPy", "Matplotlib", "University"],
    skills: ["data-science", "ai-ml"],
    color: "var(--color-nebula)",
    links: {
      github: "https://github.com/FrancescoCastaldi/sir-markov-chain",
    },
    featured: true,
    icon: "🦠",
  },
  {
    id: "hosp-san-tracker",
    label: "Hospital Sanitization",
    title: "Hospital Sanitization Tracker — Blockchain DApp",
    slug: "hospital-sanitization-tracker",
    description:
      "Ethereum Smart Contract (Sepolia) based DApp for immutable tracking of hospital sanitization activities.",
    longDescription:
      "Full-stack blockchain DApp that logs hospital sanitization operations as immutable transactions on the Ethereum Sepolia testnet. Built with Solidity, Hardhat, and Ethers.js to ensure hygiene compliance.",
    content: `![Hospital Sanitization Tracker](/assets/projects/hospital-sanitization-tracker/images/cover.png)

## The Compliance Challenge

In hospital environments, verifying the completion of sanitation routines in operating rooms is critical. Paper logs get lost or altered. This decentralized application logs sanitization events directly to Ethereum testnets via cryptographic signatures.

\`\`\`solidity
// Emitting a sanitization event on-chain
event SanitizationLogged(
    address indexed operator,
    string roomId,
    uint256 timestamp
);
\`\`\``,
    tags: ["Solidity", "Hardhat", "Ethers.js", "Blockchain"],
    skills: ["healthcare-it", "blockchain"],
    color: "var(--color-star-gold)",
    links: {
      github: "https://github.com/FrancescoCastaldi/hospital-sanitization-tracker",
    },
    featured: false,
    icon: "🏥",
  },
  {
    id: "gpx-editor",
    label: "GPX Editor",
    title: "GPX Editor — Client-Side GPS Track Editor",
    slug: "gpx-editor",
    description:
      "Web app to edit offline GPS tracks: smoothing, point cutting, and real-time generated elevation profiles.",
    longDescription:
      "A browser-based GPS editor for cyclists. It allows you to edit GPX files to fix power spikes (watts) or speed glitches before uploading them to Strava. Everything runs client-side.",
    content: `![GPX Editor Web App](/assets/projects/gpx-editor/images/cover.png)

## Pure Browser-Based GPX Editing

Cyclists often have GPS tracks with anomalous power spikes or speed errors due to signal tunnels. GPX Editor cleans and resamples GPS files entirely client-side with zero server roundtrips.

- **Client-Side**: Runs 100% in browser via DOMParser.
- **Watts & Speed Smoothing**: Removes GPS anomalies.
- **Fast Leaflet Rendering**: Draws elevation profiles and track maps.`,
    tags: ["TypeScript", "Leaflet", "Vite", "Chart.js"],
    skills: ["cycling-analytics", "web-dev"],
    color: "#34D399",
    links: {
      github: "https://github.com/FrancescoCastaldi/gpx-editor",
    },
    featured: false,
    icon: "🗺️",
  },
  {
    id: "benzatracker",
    label: "BenzaTracker",
    title: "BenzaTracker — Vehicle Refuel Telematics",
    slug: "benzatracker",
    description:
      "Fuel refuels tracking, consumption statistics, spending KPIs, and automated PDF report export.",
    longDescription:
      "Multi-interface application (CLI, ttkbootstrap GUI, Flask Web) to log vehicle refuels, compute real-time L/100km efficiency, detect anomalous fuel consumption spikes, and generate executive PDF monthly cost reports.",
    content: `![BenzaTracker](/assets/projects/benzatracker/images/cover.png)

## Fuel Economy & Cost Auditing

BenzaTracker is a complete fuel telemetry tracking suite. It allows drivers to log fill-ups, calculate exact consumption (L/100km and km/L), monitor monthly expenditure trends, and export clean PDF summary reports.

- **Multiple Interfaces**: CLI, ttkbootstrap GUI, and Flask web app.
- **Storage**: SQLite database with automated backups.
- **Reporting**: ReportLab PDF invoice and summary generator.`,
    tags: ["Python", "ttkbootstrap", "Flask", "SQLite", "Automotive"],
    skills: ["data-science", "automotive-eng"],
    color: "#f59e0b",
    links: {
      github: "https://github.com/FrancescoCastaldi/BenzaTracker",
    },
    featured: false,
    icon: "⛽",
  },
  {
    id: "ci-cervical",
    label: "CI Cervical LBC",
    title: "CI Cervical LBC — Deblurring & Image Restoration",
    slug: "ci-cervical-lbc",
    description:
      "Comparison between Total Variation, UNet, and DiffPIR for the restoration of cervical cytology images (LBC).",
    longDescription:
      "Research project to clean up noise and blur from Pap smear slides. Evaluates the impact of generative diffusion models against classic mathematical deblurring to avoid medical 'hallucinations'.",
    content: `![Cervical LBC Deblurring](/assets/projects/ci-cervical-lbc/images/cover.png)

## Medical Image Deblurring

Evaluates mathematical methods (Total Variation) vs Deep Learning (UNet, DiffPIR) for the restoration of LBC cytology images. Shows that while generative diffusion models produce sharp visual results, supervised UNet architectures provide the highest clinical safety against synthetic hallucinations.`,
    tags: ["Python", "PyTorch", "DiffPIR", "University"],
    skills: ["data-science", "ai-ml"],
    color: "#FB7185",
    links: {
      github: "https://github.com/FrancescoCastaldi/ci-cervical-lbc",
    },
    featured: false,
    icon: "🔬",
  },
  {
    id: "sgf2-ai",
    label: "SGF² AI",
    title: "SGF² AI — Algorithmic Fairness & SHAP Auditing",
    slug: "sgf2-ai-project",
    description:
      "Machine Learning on the UCI Adult dataset: income prediction and in-depth investigation of Fairness metrics.",
    longDescription:
      "Complete ML pipeline that exposes algorithmic biases. A 90% Accuracy is not enough: through Demographic Parity and SHAP analysis, the project demonstrates how models actively discriminate by gender and ethnicity.",
    content: `![SGF² AI Fairness Analysis](/assets/projects/sgf2-ai-project/images/cover.png)

## Explainable AI & Bias Auditing

Predictive models can reach high accuracy while quietly learning historical demographic biases. This project analyzes Demographic Parity and Equal Opportunity gaps on XGBoost and Random Forest models using SHAP value explanations.`,
    tags: ["Python", "scikit-learn", "pandas", "University"],
    skills: ["data-science", "ai-ml"],
    color: "#FB7185",
    links: {
      github: "https://github.com/FrancescoCastaldi/sgf2-ai-project",
    },
    featured: false,
    icon: "🤖",
  },
  {
    id: "superset-calendar",
    label: "Superset Calendar",
    title: "Superset Calendar Filter — Custom React Plugin",
    slug: "superset-calendar-filter",
    description:
      "React plugin for Apache Superset: an interactive Calendar Heatmap for temporal exploration and cross-filtering.",
    longDescription:
      "Development of a custom chart plugin for Apache Superset. Allows analysts to highlight temporal patterns and dynamically filter dashboard data by clicking on days or date ranges.",
    content: `![Superset Calendar Filter](/assets/projects/superset-calendar-filter/images/cover.png)

## Apache Superset Plugin Architecture

Custom visualization plugin for Apache Superset supporting bidirectional cross-filtering. Clicking dates in the contribution grid filters all sibling charts dynamically.`,
    tags: ["Superset", "TypeScript", "React", "Cross-Filter"],
    skills: ["data-science", "cloud-arch", "web-dev"],
    color: "var(--color-nebula)",
    links: {
      github: "https://github.com/FrancescoCastaldi/superset-plugin-chart-calendar-filter",
    },
    featured: false,
    icon: "📅",
  },
];

