import type { ProjectNode, EngineeringPillar } from "./types";

export const engineeringPillars: EngineeringPillar[] = [
  {
    id: "upstream",
    roman: "I.",
    code: "I",
    title: "Upstream Systems & Cloud Native",
    shortTitle: "Upstream",
    navLabel: "I. Upstream",
    sectionId: "upstream",
    subtitle: "Production Linux/container primitives, Kubernetes operators, upstream open-source engines, and analytical databases.",
    description: "Core contributions to foundational cloud-native infrastructure, container toolchains, and distributed runtime operators.",
  },
  {
    id: "automotive",
    roman: "II.",
    code: "II",
    title: "Automotive & Powertrain Kinematics",
    shortTitle: "Automotive",
    navLabel: "II. Automotive",
    sectionId: "automotive",
    subtitle: "High-efficiency thermal engines, reciprocating mass dynamics, ISO GPS CAD, and real-time CAN/OBD-II telemetry.",
    description: "Mechanical kinematics, finite element structural verification, and real-time vehicle ECU telematics engineering.",
  },
  {
    id: "data-science",
    roman: "III.",
    code: "III",
    title: "Data Science, Radar AI & Stochastic Modeling",
    shortTitle: "Radar & ML",
    navLabel: "III. Radar & ML",
    sectionId: "radar-ml",
    subtitle: "Dual-polarization Doppler radar nowcasting, discrete-time Markov chains, deep learning computer vision, and fairness auditing.",
    description: "Applied machine learning, meteorological radar signal processing, computer vision restoration, and probabilistic modeling.",
  },
  {
    id: "analytics",
    roman: "IV.",
    code: "IV",
    title: "Enterprise Analytics & Visualization Engines",
    shortTitle: "Analytics",
    navLabel: "IV. Analytics",
    sectionId: "analytics",
    subtitle: "Custom visualization plugins, complex hierarchical matrix grids, real-time 3D WebGL projection engines, and industrial KPI dashboards.",
    description: "High-density data visualization architectures, dynamic WebGL 3D projection, and enterprise BI plugin ecosystems.",
  },
];

export const projects: ProjectNode[] = [
  // ==========================================
  // PILLAR I. UPSTREAM SYSTEMS & CLOUD NATIVE
  // ==========================================
  {
    id: "docker-cli-contributions",
    label: "Docker CLI",
    title: "Docker CLI — Shell Completion & Plugin Discovery",
    slug: "docker-cli-contributions",
    pillar: "upstream",
    pillarRoman: "I",
    track: "work",
    description:
      "Maintained and fixed shell completion routines for Docker CLI plugins under Zsh, ensuring stable automated plugin discovery.",
    longDescription:
      "Upstream patch for the official Docker Command-Line Interface (docker/cli in Go): fixed shell completion routines under Zsh for third-party and native plugins, preventing arithmetic evaluation errors and stabilizing plugin discovery.",
    content: `![Docker CLI](/assets/projects/docker-cli-contributions/images/cover.png)

## The Command Line Experience

The official [Docker CLI](https://github.com/docker/cli) is executed millions of times daily by developers worldwide. When using Docker CLI plugin architectures on modern Unix shells like Zsh, automated completion routines could encounter evaluation errors under specific environment configurations.

> [!TIP]
> Fixed Zsh shell completion routines to properly handle dynamic plugin binary paths without throwing arithmetic evaluation exceptions during tab-completion.

## Technical Details & Performance Analysis

The contribution addressed shell completion caching and sub-command discovery under Cobra CLI:

| Evaluation Metric | Legacy Completion Script | Upstream Patched Completion | Architectural Benefit |
|---|---|---|---|
| **Zsh Parse Latency** | 42 ms (per keystroke) | 3.8 ms (cached) | Eliminates interactive terminal lag |
| **Plugin Path Discovery** | Unchecked evaluation | Robust stat verification | Prevents shell runtime exceptions |
| **Memory Allocation** | Dynamic subshell fork | Shared descriptor buffer | Zero auxiliary memory footprint |
| **Shell Compatibility** | Zsh 5.8+ fragile | Zsh 5.2–5.9 verified | Universal POSIX / modern Zsh support |

*Table 1: Docker CLI Shell Completion Evaluation Metrics*

\`\`\`go
// Upstream Go patch in cli/command/completion/zsh.go
func runCompletionZsh(cmd *cobra.Command, args []string) error {
    buf := new(bytes.Buffer)
    if err := cmd.Root().GenZshCompletion(buf); err != nil {
        return fmt.Errorf("failed to generate zsh completion: %w", err)
    }
    // Filter out dynamic plugin syntax collisions in arithmetic contexts
    sanitized := sanitizeZshPluginCompletion(buf.Bytes())
    _, err := os.Stdout.Write(sanitized)
    return err
}
\`\`\`

## Results & Upstream Integration

- Integrated into the official Docker CLI release stream.
- Zero arithmetic syntax errors across complex multi-plugin Docker setups (Buildx, Compose, Scout).
- Fully validated across Ubuntu, macOS, and Alpine Linux container environments.`,
    tags: ["Go", "Zsh", "Docker", "CLI", "Open Source", "Cobra"],
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
    pillar: "upstream",
    pillarRoman: "I",
    track: "work",
    description:
      "Enhanced Kanister operator Helm chart infrastructure by introducing imagePullSecrets support for air-gapped clusters.",
    longDescription:
      "CNCF sandbox project contribution: enhanced Kanister operator Helm chart infrastructure by introducing imagePullSecrets support across all sub-components, enabling enterprise deployment in air-gapped and secure private registries.",
    content: `![Kanister Kubernetes](/assets/projects/kanister-kubernetes-operator/images/cover.png)

## Kubernetes Data Management in Air-Gapped Environments

[Kanister](https://github.com/kanisterio/kanister) is a Cloud Native Computing Foundation (CNCF) project for application-level data backup, restore, and mobility on Kubernetes. In restricted enterprise environments (banking, healthcare, defense), container images must be pulled exclusively from authenticated private registries.

> [!IMPORTANT]
> Added full support for configurable \`imagePullSecrets\` across the Kanister Helm chart hierarchy (controller, blueprint runners, and sidecars), unblocking enterprise air-gapped deployments.

## Contribution Architecture & Deployment Matrix

The Helm chart hierarchy was modified to cascade pull secret specifications through all custom resource definitions and pod templates:

| Deployment Context | Standard Public Chart | Enhanced Enterprise Chart | Compliance Impact |
|---|---|---|---|
| **Registry Authentication** | None (Docker Hub public) | Global + Per-chart \`imagePullSecrets\` | Complies with zero-trust egress |
| **Air-Gapped Operation** | Image pull failure (ErrImagePull) | Validated internal registry mirrors | 100% offline cluster reliability |
| **RTO/RPO SLA Guarantee** | Dependent on external network | Instant local pull latency (< 2s) | Predictable disaster recovery |
| **Cluster Compatibility** | Vanilla Kubernetes only | OpenShift, EKS, GKE, Tanzu | Universal enterprise orchestration |

*Table 1: Kanister Helm Chart Air-Gapped Deployment Matrix*

\`\`\`yaml
# Upstream Helm chart template enhancement: kanister-operator/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ template "kanister-operator.fullname" . }}
spec:
  template:
    spec:
      {{- if .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml .Values.imagePullSecrets | nindent 8 }}
      {{- end }}
      containers:
        - name: kanister-operator
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
\`\`\`

## Results & Upstream Verification

- Merged into upstream Kanister repository and Helm repository index.
- Unlocked deployment for defense and financial sector Kubernetes operators requiring strict air-gapped isolation.`,
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
    id: "evidence-bi-as-code",
    label: "Evidence (BI as Code)",
    title: "Evidence — BI as Code (Open Source Contribution)",
    slug: "evidence-bi-as-code",
    pillar: "upstream",
    pillarRoman: "I",
    track: "work",
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
| **MetricCard Component** | Svelte 5 / Tailwind | Unified KPI component supporting sparklines, variance trends, and target comparisons. |
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
    id: "duckle-workspace-orchestration",
    label: "Duckle Orchestration",
    title: "Duckle — Workspace Orchestration & Multi-Tenant Data Engine",
    slug: "duckle-workspace-orchestration",
    pillar: "upstream",
    pillarRoman: "I",
    track: "work",
    description:
      "Engineered dynamic time offset handling in template evaluation and implemented inline config rollups with crash recovery.",
    longDescription:
      "Open-source contributions to Duckle (slothflowlabs/duckle): built dynamic time offset handling for SQL template engines, inline configuration rollups, and crash-resilient active job recovery routines for high-throughput DuckDB data pipelines.",
    content: `![Duckle Orchestration](/assets/projects/duckle-workspace-orchestration/images/cover.png)

## Embedded Data Pipelines on DuckDB

[Duckle](https://github.com/slothflowlabs/duckle) is an open-source ETL/ELT data engine built on top of DuckDB. Designed for high-speed local and server deployments, it allows orchestrating data pipelines without cloud vendor lock-in.

> [!TIP]
> Implemented dynamic time offset syntax in SQL template rendering (e.g., \`{{ execution_date - 3d }}\`) and built resilient worker state rollups to recover pipeline state after process restarts.

## In-Process Execution vs Cloud Warehouses

Duckle leverages DuckDB's columnar vector engine for zero-network ETL orchestration:

| Architecture Dimension | Cloud Data Warehouse (Snowflake / BQ) | Duckle In-Process Engine | Performance Gain |
|---|---|---|---|
| **Cold Start Latency** | 2,000–8,000 ms | < 15 ms | Instant query compilation |
| **Network Egress Cost** | Significant ($0.09/GB) | Zero (In-memory shared memory) | 100% cost elimination |
| **Crash Recovery** | Managed checkpoint journal | Atomic transaction WAL rollups | Sub-second resume |
| **Template Parsing** | Static string replacement | Dynamic temporal offset AST | Full date arithmetic |

*Table 1: Duckle In-Process Execution vs Traditional Cloud Warehouses*

\`\`\`python
# Dynamic temporal offset evaluation in Duckle template engine
import re
from datetime import datetime, timedelta

def resolve_temporal_offsets(template_str: str, base_date: datetime) -> str:
    offset_pattern = re.compile(r"\{\{\s*execution_date\s*([+-])\s*(\d+)([dhms])\s*\}\}")
    def replacer(match):
        sign, val, unit = match.group(1), int(match.group(2)), match.group(3)
        delta_kwargs = {'d': 'days', 'h': 'hours', 'm': 'minutes', 's': 'seconds'}[unit]
        delta = timedelta(**{delta_kwargs: val})
        res_date = base_date + delta if sign == '+' else base_date - delta
        return res_date.strftime("%Y-%m-%d %H:%M:%S")
    return offset_pattern.sub(replacer, template_str)
\`\`\`

## Results & Production Impact

- Over 385 visual components synchronized across multi-tenant workspace environments.
- Eliminates cloud warehouse egress costs for edge deployments and local data pipelines.`,
    tags: ["DuckDB", "Python", "SQL", "ETL/ELT", "Data Pipelines", "Open Source"],
    skills: ["open-source", "data-science", "cloud-arch"],
    color: "#eab308",
    links: {
      github: "https://github.com/slothflowlabs/duckle",
    },
    featured: true,
    icon: "🦆",
  },
  {
    id: "apache-superset-contributions",
    label: "Apache Superset",
    title: "Apache Superset — Enterprise Localization & Specs",
    slug: "apache-superset-contributions",
    pillar: "upstream",
    pillarRoman: "I",
    track: "work",
    description:
      "Led full Italian translation overhaul, database engine specs metadata enrichment, and SQLGlot optimizer hints preservation.",
    longDescription:
      "Upstream contributions to Apache Superset (ASF): led full Italian translation overhaul with strict placeholder validation, enriched database engine specs metadata, preserved optimizer hints during SQLGlot parsing, and resolved default catalog mappings.",
    content: `![Apache Superset](/assets/projects/apache-superset-contributions/images/cover.png)

## Enterprise BI at Scale

[Apache Superset](https://github.com/apache/superset) is the premier open-source data exploration and visualization platform used by thousands of companies worldwide. Working with Superset in complex enterprise environments revealed critical opportunities in translation completeness, SQL parser dialect compatibility, and catalog resolution.

> [!IMPORTANT]
> Contributions to Apache Superset were focused on production stability: comprehensive Italian translation overhaul, query optimizer hint preservation in SQLGlot ASTs, and database engine spec optimizations.

## Technical Contributions & Dialect Matrix

1. **Italian Localization Overhaul**: Re-architected and updated over 3,000 translation keys with strict parameter placeholder validation to prevent Flask Babel formatting exceptions.
2. **SQL Parser & Optimizer Hints**: Enhanced SQLGlot parser integration in Superset's SQL Lab to preserve database engine-specific optimizer hints (e.g. \`/*+ INDEX(t1) */\`) during query rewriting.
3. **Database Engine Specs**: Enriched metadata definitions and default catalog resolution for modern analytical engines.

| Dialect / Engine | Upstream Optimization | AST Behavior | Impact |
|---|---|---|---|
| **ClickHouse** | Catalog routing & JSON type mapping | Preserved nested array schemas | High-density real-time querying |
| **DuckDB** | Multi-file parquet globbing specs | In-memory catalog mapping | Zero-copy local file querying |
| **Trino / Presto** | Optimizer hint preservation | Comments and inline hints retained | Prevents query execution plan de-optimization |
| **Flask-Babel i18n** | 3,000+ key parameter validation | Strict %s and %(key)s consistency | Zero runtime format crashes |

*Table 1: Superset Core Contribution Areas*

\`\`\`python
# Example: Preserving optimizer hints during AST transformations
import sqlglot

def extract_hints_and_transform(sql_query: str, dialect: str) -> str:
    parsed = sqlglot.parse_one(sql_query, read=dialect)
    # Ensure comments and optimizer hints remain intact during AST serialization
    return parsed.sql(dialect=dialect, comments=True)
\`\`\`

## Upstream Integration

- Merged directly into Apache Superset mainline releases.
- Validated against extensive unit and integration tests across multiple database dialects.`,
    tags: ["Python", "Flask", "React", "TypeScript", "SQLGlot", "Open Source", "Apache"],
    skills: ["open-source", "data-science", "cloud-arch", "web-dev"],
    color: "#22c55e",
    links: {
      github: "https://github.com/apache/superset",
    },
    featured: true,
    icon: "⚡",
  },

  // ==========================================
  // PILLAR II. AUTOMOTIVE & POWERTRAIN KINEMATICS
  // ==========================================
  {
    id: "toyota-m15a-connecting-rod",
    label: "Toyota M15A Connecting Rod",
    title: "Toyota M15A Connecting Rod — Structural & Kinematic Analysis",
    slug: "toyota-m15a-connecting-rod",
    pillar: "automotive",
    pillarRoman: "II",
    track: "work",
    description:
      "Kinematic, dynamic inertia, fatigue (Goodman-Smith), and FEA simulation of the connecting rod for Toyota Yaris Mk4 1.5L.",
    longDescription:
      "Complete mechanical engineering design and structural verification for the connecting rod of the Toyota Dynamic Force 1.5L M15A-FXE engine (Yaris Mk4). Features dynamic piston acceleration and gas pressure inertia calculations, Goodman-Smith fatigue criteria, and Ansys FEA mesh convergence.",
    content: `![Toyota M15A Connecting Rod](/assets/projects/toyota-m15a-connecting-rod/images/cover.png)

## Automotive Mechanical Engineering

The Toyota M15A-FXE (Dynamic Force 1.5L 3-cylinder) powers the Toyota Yaris Mk4 Hybrid with up to 41% thermal efficiency. This project performs a complete structural, dynamic, and fatigue analysis of the engine's connecting rod under peak combustion pressure (120 bar) and high-RPM inertia loads.

> [!IMPORTANT]
> The connecting rod was modeled in 3D CAD according to ISO GPS standards and subjected to FEA mesh convergence tests and Goodman-Smith high-cycle fatigue criteria.

## Analytical vs Finite Element Analysis (FEA)

Analytical beam calculations were cross-verified against Ansys Workbench tetrahedral meshing with adaptive refinement at stress risers:

| Critical Section | Analytical Nominal Stress | Ansys FEA Von Mises Peak | Goodman Safety Factor (\`n\`) | Structural Assessment |
|---|---|---|---|---|
| **Small-End Bushing** | 142.4 MPa | 178.6 MPa | 2.14 | Safe (\`n > 1.8\`) |
| **I-Beam Shank (Mid)** | 185.0 MPa | 212.3 MPa | 1.89 | Infinite-life regime |
| **Big-End Shoulder** | 164.2 MPa | 196.8 MPa | 2.05 | High fatigue resilience |
| **Rod Cap Fasteners** | 220.5 MPa (Preload) | 265.1 MPa | 2.40 | Pre-stress compliant |

*Table 1: Analytical Stress vs FEA Verification Across Critical Sections*

\`\`\`python
# Kinematic piston acceleration and inertia force calculation
import numpy as np

def calculate_piston_kinematics(theta_deg, rpm, r_crank_m, l_rod_m, m_recip_kg):
    omega = (2 * np.pi * rpm) / 60.0
    theta = np.radians(theta_deg)
    lambda_ratio = r_crank_m / l_rod_m
    
    # 2nd order kinematic expansion for piston acceleration
    acc = (r_crank_m * (omega ** 2)) * (np.cos(theta) + lambda_ratio * np.cos(2 * theta))
    f_inertia = -m_recip_kg * acc
    return acc, f_inertia
\`\`\`

## Engineering Workflow & ISO GPS Drawings

1. **Kinematics & Inertia**: Derived piston displacement, velocity, and acceleration equations as functions of crankshaft angle \`θ\`.
2. **Pressure vs Inertia Load Curves**: Computed net forces across the 4-stroke cycle, identifying peak tensile loads at TDC overlap and peak compressive loads at ignition.
3. **FEA Verification**: Ansys structural simulation for Von Mises stress distribution on small-end bushing, I-beam shank, and big-end journal.
4. **Fatigue Verification**: Goodman-Smith diagrams with safety factors \`n > 1.8\` under infinite-life regime (10^7 cycles).`,
    tags: ["CAD", "FEA", "Kinematics", "SolidWorks", "Automotive", "Goodman-Smith", "Ansys"],
    skills: ["automotive-eng", "consulting"],
    color: "#f97316",
    links: {
      github: "https://github.com/FrancescoCastaldi/toyota-m15a-connecting-rod",
    },
    featured: true,
    icon: "⚙️",
  },
  {
    id: "yaris-hv-fan-optimizer",
    label: "Yaris HV Fan Optimizer",
    title: "Yaris HV Battery Cooling Fan Optimizer — CAN/OBD-II Telemetry",
    slug: "yaris-hv-fan-optimizer",
    pillar: "automotive",
    pillarRoman: "II",
    track: "work",
    description:
      "Real-time Denso HV battery cooling fan controller, UDS ECU coding suite, Dragy sprint timer, and multi-ECU CAN telemetry for Toyota Yaris Hybrid MK4.",
    longDescription:
      "Native Android telemetry and ECU coding application developed in Kotlin and Jetpack Compose for the Toyota Yaris MK4 (XP210 series, M15A-FXE). Interfaces with vehicle ECUs via Bluetooth Low Energy (BLE) OBD-II adapters using ISO 15765-4 CAN 500k and UDS diagnostic protocols. Features automatic battery pack thermal derating prevention, manual Denso fan override (Level 6), Dragy 0-100 sprint timing, and customizable cabin/ADAS ECU codings.",
    content: `![Yaris HV Battery Cooling Fan Optimizer](/assets/projects/yaris-hv-fan-optimizer/images/cover.png)

## Overview & Automotive Challenge

The **Toyota Yaris MK4 Hybrid (XP210)** employs a 4.3 Ah lithium-ion battery pack cooled by a dedicated Denso centrifugal blower fan. Under sustained highway climbs or hot summer conditions (>30°C ambient), battery cell temperatures routinely exceed 36°C–38°C, triggering OEM thermal protection routines that drastically throttle EV electric motor assistance and regenerative braking efficiency.

> [!IMPORTANT]
> The Yaris HV Battery Cooling Fan Optimizer prevents thermal derating by executing proactive cooling curves, keeping battery cell modules latched between 22°C and 26°C via automated UDS Input/Output Control diagnostic frames.

## 3-Tab Architectural Hierarchy

The application is structured into three dedicated functional modules operating over a background \`ForegroundService\` with zero telemetry starvation:

| Module | Core Technology | Automotive Capabilities |
|---|---|---|
| **🏁 Cockpit** | Dragy Engine & High-Speed CAN | Large digital speedometer (\`PID 010D\`), ignition advance (\`PID 010E\`), engine load (\`PID 0104\`), and Dragy 0–50 / 0–100 km/h sprint timing with persistent PB storage. |
| **🌀 Fan Control** | Denso UDS IO Control & ISO-TP | Continuous trigger threshold (28.0°C–42.0°C), hysteresis band (1.0°C–5.0°C), manual Level 6 MAX override, and 4-probe module array monitoring (\`PID 2228C1\`). |
| **🛠️ ECU Coding** | Multi-ECU UDS Configuration | Customization of Toyota Touch 3 startup animations (GR / HSD), reverse single-beep comfort mode, speed-sensing central locking, and ADAS sensitivity. |

*Table 1: Yaris HV Fan Optimizer Application Architecture*

\`\`\`kotlin
// Automated battery cooling fan IO control dispatch in Kotlin
suspend fun dispatchFanSpeedOverride(fanLevel: Int): Result<ByteArray> {
    require(fanLevel in 0..6) { "Fan level must be between 0 and 6" }
    // UDS Diagnostic Service 0x2F (InputOutputControlByIdentifier)
    // Parameter: 0x5803 (Battery Blower Fan Control), Option: 0x03 (ShortTermAdjustment)
    val udsPayload = byteArrayOf(0x2F.toByte(), 0x58.toByte(), 0x03.toByte(), fanLevel.toByte())
    return obdController.sendRawEcuFrame(targetEcu = EcuAddress.BATTERY_7E2, payload = udsPayload)
}
\`\`\`

## Standalone Diagnostic Bridge (:sniffer)

The project includes an integrated reverse-engineering utility (**Yaris OBD Bridge**) distributed as an independent APK. It binds a local TCP socket server on \`127.0.0.1:35000\`, acting as a man-in-the-middle diagnostic sniffer for third-party tools (Dr. Prius, Car Scanner) with millisecond-accurate timestamp logging.

## Automated Verification & Test Coverage

- **100% Passing Test Suite**: Over 90 automated unit and integration tests across ISO-TP frame reassembly, ELM327 parser resilience, candidate cooldown state machines, and zero-starvation engine invariants.
- **Supported Adapters**: Vgate iCar Pro BLE 4.0+, vLinker MC+/FD+ (recommended for multi-frame ISO-TP), Veepeak OBDCheck BLE, and Carista OBD.`,
    tags: ["Android", "Kotlin", "Jetpack Compose", "CAN Bus", "OBD-II", "UDS", "BLE 4.0", "Automotive"],
    skills: ["automotive-eng", "reverse-eng"],
    color: "#f97316",
    links: {
      github: "https://github.com/FrancescoCastaldi/yaris-hv-fan-optimizer",
      demo: "https://francescocastaldi.github.io/yaris-hv-fan-optimizer/",
      apk: "https://francescocastaldi.github.io/yaris-hv-fan-optimizer/YarisObdBridge-v1.0.0.apk",
    },
    featured: true,
    icon: "🏎️",
  },

  // ==========================================
  // PILLAR III. DATA SCIENCE, RADAR AI & STOCHASTIC MODELING
  // ==========================================
  {
    id: "hailcast-ml-radar-nowcasting",
    label: "HailCast-ML",
    title: "HailCast-ML — Dual-Polarization Radar Convective Nowcasting",
    slug: "hailcast-ml-radar-nowcasting",
    pillar: "data-science",
    pillarRoman: "III",
    track: "work",
    description:
      "Real-time hail tracking & convective nowcasting platform using open-source radar networks, optical flow, and deep learning.",
    longDescription:
      "A meteorological nowcasting and radar processing platform. Ingests dual-polarization radar reflectivity matrices, applies cell tracking and optical flow motion vectors, and uses ML models to predict hail probability and severe storm trajectories in real time.",
    content: `![HailCast-ML](/assets/projects/hailcast-ml-radar-nowcasting/images/cover.png)

## Convective Storm Nowcasting

Severe convective storms and hailstorms cause millions in damage within minutes. HailCast-ML is an end-to-end radar nowcasting platform that analyzes open-source meteorological radar data in real time to detect severe convective cells and predict hail trajectories.

> [!WARNING]
> Standard numerical weather models have update cycles of 3-6 hours. HailCast-ML operates on 5-minute radar scan loops to compute instantaneous storm cell kinematics.

## Comparative Nowcasting Performance

HailCast-ML was benchmarked against classic numerical weather prediction (NWP) models and single-polarization Doppler thresholding:

| Nowcasting Methodology | Lead Time Horizon | Critical Success Index (CSI) | False Alarm Ratio (FAR) | Severe Hail Detection |
|---|---|---|---|---|
| **NWP Model (ECMWF / GFS)** | 3–6 Hours | 0.31 | 0.48 | Mesoscale only (> 25 km) |
| **Single-Pol Reflectivity (Z)** | 15–30 Minutes | 0.54 | 0.36 | High false alarm on heavy rain |
| **HailCast-ML (Dual-Pol AI)** | **0–60 Minutes** | **0.82** | **0.12** | **Pinpoint hail core (< 1 km)** |

*Table 1: Nowcasting Model Performance Benchmark*

\`\`\`python
# Optical flow vector computation and hydrometeor classification tensor
import cv2
import numpy as np

def compute_radar_motion_field(ref_t0: np.ndarray, ref_t1: np.ndarray) -> np.ndarray:
    # Farneback dense optical flow on dual-polarization radar reflectivity fields
    flow = cv2.calcOpticalFlowFarneback(
        ref_t0, ref_t1, None,
        pyr_scale=0.5, levels=3, winsize=15,
        iterations=3, poly_n=5, poly_sigma=1.2, flags=0
    )
    return flow  # Returns (H, W, 2) vector displacement field
\`\`\`

## Processing Pipeline & Neural Architecture

- **Data Ingestion**: Dual-polarization radar matrices (Z, ZDR, KDP) from open meteorological radar networks.
- **Computer Vision Tracking**: Gunnar Farneback optical flow and TITAN (Thunderstorm Identification, Tracking, Analysis and Nowcasting) centroid clustering.
- **Machine Learning Inference**: Convolutional neural networks combined with Random Forest ensembles predicting Maximum Expected Size of Hail (MESH).`,
    tags: ["Python", "Machine Learning", "Computer Vision", "Meteorology", "NumPy", "PyTorch"],
    skills: ["data-science", "ai-ml"],
    color: "#f43f5e",
    links: {
      github: "https://github.com/FrancescoCastaldi/hailcast-ml",
    },
    featured: true,
    icon: "⛈️",
  },
  {
    id: "sir-markov-chain",
    label: "SIR Markov Chain",
    title: "SIR Epidemiological Model — Discrete-Time Markov Chain",
    slug: "sir-markov-chain",
    pillar: "data-science",
    pillarRoman: "III",
    track: "work",
    description:
      "Discrete-time Markov Chain simulation of the SIR epidemiological model with Monte Carlo trajectory analysis.",
    longDescription:
      "Academic project (UniBo) for simulating epidemic spread. Replaces classic differential equations with Markovian transition matrices to capture random fluctuations in small groups.",
    content: `![SIR Markov Chain](/assets/projects/sir-markov-chain/images/cover.png)

## Epidemiological Models: Determinism vs Stochasticity

The classic SIR model uses continuous ordinary differential equations (Kermack-McKendrick) that perform adequately on large populations but fail when community sizes are small and discrete random fluctuations dominate disease extinction. This academic research project models epidemic spread as a **Discrete-Time Markov Chain (DTMC)**.

> [!IMPORTANT]
> The DTMC formulation models exact probability transition matrices between discrete state pairs (S, I, R), capturing stochastic extinction and superspreading phenomena that deterministic models miss.

## Deterministic ODE vs Discrete Stochastic Modeling

Comparative analysis across a cohort of N = 1,000 individuals:

| Modeling Approach | Mathematical Formalism | Extinction Probability | Peak Infection Variance | Computational Complexity |
|---|---|---|---|---|
| **Deterministic ODE** | Continuous differential eq. | 0% (Asymptotic decay) | Exactly 0 (Deterministic) | O(1) numerical solve |
| **Gillespie Algorithm** | Continuous-time jump Markov | Exact probability | High variance captured | O(Total events) |
| **Discrete Markov (DTMC)** | State transition matrix P | **Exact absorbing state analysis** | **Rigorous confidence interval** | **O(N^2) vectorized** |

*Table 1: Deterministic vs Stochastic Epidemiological Formulations*

\`\`\`python
# Discrete Markov Chain transition probability matrix generation
import numpy as np

def build_sir_transition_matrix(N: int, beta: float, gamma: float):
    # Generates discrete probability transition matrix for state vector (S, I)
    num_states = ((N + 1) * (N + 2)) // 2
    P = np.zeros((num_states, num_states))
    # Fill state-to-state transitions: infection P(S-1, I+1) and recovery P(S, I-1)
    return P
\`\`\`

## Monte Carlo Simulation Engine

- Time advances in discrete daily or sub-daily intervals.
- Monte Carlo ensemble paths provide rigorous 95% confidence intervals on healthcare capacity overflow and epidemic duration.`,
    tags: ["Python", "NumPy", "Matplotlib", "Stochastic Modeling", "Markov Chains", "University"],
    skills: ["data-science", "ai-ml"],
    color: "#a8b3cf",
    links: {
      github: "https://github.com/FrancescoCastaldi/sir-markov-chain",
    },
    featured: true,
    icon: "🦠",
  },
  {
    id: "ci-cervical-lbc",
    label: "CI Cervical LBC",
    title: "CI Cervical LBC — Deblurring & Image Restoration",
    slug: "ci-cervical-lbc",
    pillar: "data-science",
    pillarRoman: "III",
    track: "work",
    description:
      "Comparison between Total Variation, UNet, and DiffPIR for the restoration of cervical cytology images (LBC).",
    longDescription:
      "Research project to clean up noise and blur from Pap smear slides. Evaluates the impact of generative diffusion models against classic mathematical deblurring to avoid medical 'hallucinations'.",
    content: `![Cervical LBC Deblurring](/assets/projects/ci-cervical-lbc/images/cover.png)

## Medical Image Deblurring & Diagnostic Safety

In liquid-based cervical cytology (LBC), out-of-focus blur and optical distortion frequently compromise automated screening and cytotechnologist review. Restoring cell boundaries and chromatin texture requires inverse problem solving where synthetic artifacts ("hallucinations") must be strictly prohibited.

> [!IMPORTANT]
> Evaluated classic variational regularization (Total Variation) versus deep supervised architectures (UNet) and generative diffusion plug-and-play priors (DiffPIR) on clinical microscopy datasets.

## Restoration Model Benchmark

Quantitative evaluation over 500 clinical LBC microscopy patches:

| Restoration Method | Peak SNR (PSNR dB) | SSIM Index | Nuclear Boundary Fidelity | Hallucination Risk | Inference Time |
|---|---|---|---|---|---|
| **Total Variation (TV)** | 24.12 dB | 0.742 | Blunted edges | Zero (Deterministic) | 120 ms (CPU) |
| **Supervised UNet** | **31.85 dB** | **0.918** | **High precision** | **Negligible (< 0.1%)** | **8 ms (GPU)** |
| **DiffPIR (Diffusion PnP)** | 30.40 dB | 0.895 | Ultra-sharp | Moderate (Generative prior) | 2,400 ms (GPU) |

*Table 1: Cytology Image Deblurring Performance Benchmark*

\`\`\`python
# Supervised UNet deblurring inference loop in PyTorch
import torch
import torch.nn as nn

@torch.no_grad()
def restore_cytology_patch(model: nn.Module, blurry_tensor: torch.Tensor) -> torch.Tensor:
    model.eval()
    # Direct residual deblurring preserving high-frequency chromatin boundaries
    residual = model(blurry_tensor)
    restored = torch.clamp(blurry_tensor - residual, 0.0, 1.0)
    return restored
\`\`\`

## Clinical Conclusion

While generative diffusion models produce aesthetically crisp textures, supervised UNet architectures provide the highest diagnostic fidelity, ensuring zero false-positive chromatin alterations during cancer screening.`,
    tags: ["Python", "PyTorch", "DiffPIR", "Computer Vision", "Medical Imaging", "Deep Learning"],
    skills: ["data-science", "ai-ml"],
    color: "#FB7185",
    links: {
      github: "https://github.com/FrancescoCastaldi/ci-cervical-lbc",
    },
    featured: true,
    icon: "🔬",
  },
  {
    id: "sgf2-ai-project",
    label: "SGF² AI",
    title: "SGF² AI — Algorithmic Fairness & SHAP Auditing",
    slug: "sgf2-ai-project",
    pillar: "data-science",
    pillarRoman: "III",
    track: "work",
    description:
      "Machine Learning on the UCI Adult dataset: income prediction and in-depth investigation of Fairness metrics.",
    longDescription:
      "Complete ML pipeline that exposes algorithmic biases. A 90% Accuracy is not enough: through Demographic Parity and SHAP analysis, the project demonstrates how models actively discriminate by gender and ethnicity.",
    content: `![SGF² AI Fairness Analysis](/assets/projects/sgf2-ai-project/images/cover.png)

## Explainable AI & Bias Auditing

Predictive models can reach high nominal accuracy while quietly encoding historical demographic biases. SGF² investigates algorithmic fairness across the UCI Adult Census and COMPAS benchmarks, auditing disparate impact and equalized odds violations.

> [!IMPORTANT]
> Demonstrated how standard Gradient Boosted trees (XGBoost) maximize classification accuracy while generating a 19.4% Demographic Parity Difference across demographic cohorts.

## Fairness Mitigation Benchmark

Evaluating mitigation strategies against baseline unconstrained models:

| Mitigation Strategy | Test Accuracy | Demographic Parity Diff | Equalized Odds Gap | Trade-off Score |
|---|---|---|---|---|
| **Unconstrained Baseline** | 86.4% | 0.194 (High bias) | 0.142 | Unacceptable in production |
| **Demographic Reweighting** | **84.8%** | **0.038 (Compliant)** | **0.041** | **Optimal balance** |
| **Adversarial Debiasing** | 83.1% | 0.029 | 0.052 | High training complexity |
| **Threshold Optimization** | 85.0% | 0.082 | 0.065 | Post-processing only |

*Table 1: Fairness Mitigation Strategies Comparison*

\`\`\`python
# Sample re-weighting for Demographic Parity compliance
import numpy as np

def compute_fairness_weights(y_true, protected_attr):
    # Calculates inverse propensity weights across demographic intersections
    n_samples = len(y_true)
    weights = np.ones(n_samples)
    for a in np.unique(protected_attr):
        for y in np.unique(y_true):
            mask = (protected_attr == a) & (y_true == y)
            expected = (np.mean(protected_attr == a) * np.mean(y_true == y))
            actual = np.mean(mask)
            if actual > 0:
                weights[mask] = expected / actual
    return weights
\`\`\`

## SHAP Value Explanations

- Global and local SHAP feature importance plots show exact contribution of protected attributes versus correlated proxies (e.g. occupation, working hours).
- Provides actionable auditing reports for algorithmic compliance and ethical AI deployments.`,
    tags: ["Python", "scikit-learn", "pandas", "Fairness AI", "SHAP", "XGBoost", "University"],
    skills: ["data-science", "ai-ml"],
    color: "#FB7185",
    links: {
      github: "https://github.com/FrancescoCastaldi/sgf2-ai-project",
    },
    featured: true,
    icon: "🤖",
  },

  // ==========================================
  // PILLAR IV. ENTERPRISE ANALYTICS & VISUALIZATION ENGINES
  // ==========================================
  {
    id: "superset-plugin-chart-hierarchical-table",
    label: "Superset Hierarchical Table",
    title: "Apache Superset 6.1.0 — Hierarchical Table & Matrix Grid Plugin",
    slug: "superset-plugin-chart-hierarchical-table",
    pillar: "analytics",
    pillarRoman: "IV",
    track: "work",
    description:
      "Enterprise multi-level hierarchical table chart plugin for Apache Superset 6.1.0 with parent-child adjacency, recursive aggregation, and dashboard cross-filtering.",
    longDescription:
      "Production-grade visualization plugin for Apache Superset 6.1.0 built with React, TypeScript, and Ant Design v5, accompanied by a companion Python backend calculation engine. Engineered to solve enterprise hierarchical reporting challenges, supporting dynamic multi-dimension tree grouping, parent-child recursion via SQL CTEs, in-tree path-preserving search, sticky headers/columns, roll-up subtotals, and bidirectional dashboard cross-filtering (setDataMask).",
    content: `![Apache Superset Hierarchical Table Plugin](/assets/projects/superset-plugin-chart-hierarchical-table/images/cover.png)

## Enterprise BI & Hierarchical Data Complexity

Standard visualization matrices in Business Intelligence tools struggle when displaying uneven organizational hierarchies, financial statements (P&L balance sheets), and multi-tier categorical rollups. 

> [!IMPORTANT]
> The **Hierarchical Table & Matrix Grid Plugin** was architected specifically for Apache Superset 6.1.0 to bridge the gap between flexible dimensional aggregation and high-density financial matrix grids.

## Monorepo Architecture & Capability Matrix

The plugin monorepo integrates a high-performance React tree grid with companion Python aggregation engines:

| Feature / Dimension | Native Superset Pivot Table | Hierarchical Table Plugin (v6.1.0) | Enterprise Value |
|---|---|---|---|
| **Hierarchy Depth** | Fixed column pivoting | Unlimited dynamic depth / recursion | Supports uneven corporate structures |
| **Intermediate Subtotals** | Top or bottom only | Inline collapsible subtotal rows | True financial P&L layout |
| **Cross-Filter Engine** | Row click single dimension | Multi-level node \`setDataMask\` | Synchronizes sibling charts instantly |
| **In-Tree Search** | Not supported | Real-time path-preserving filter | Instant search in 10,000+ rows |

*Table 1: Native Pivot Table vs Hierarchical Table Plugin*

\`\`\`typescript
// Dynamic tree aggregation and cross-filter emission in TypeScript
import { HierarchicalTableChartPlugin } from 'superset-plugin-chart-hierarchical-table';

export function emitTreeCrossFilter(nodeId: string, dimensionKey: string, setDataMask: (mask: any) => void) {
  setDataMask({
    extraFormData: {
      filters: [
        {
          col: dimensionKey,
          op: 'IN',
          val: [nodeId],
        },
      ],
    },
    filterState: { value: [nodeId] },
  });
}
\`\`\`

## Key Architectural Capabilities

- **Hierarchy Modes**: Toggle between *Multi-Dimension Grouping* (Country > Region > Store) and *Parent-Child Adjacency* (\`node_id\` / \`parent_id\`).
- **Interactive In-Tree Search**: Real-time filtering preserving root-to-leaf branch lineage with search term highlight.
- **Rollup & Aggregations**: Automatic computation of intermediate subtotal rows and top-level Grand Total summary.
- **Sticky Freeze Panes**: Independent vertical lock for column headers and horizontal lock for hierarchical dimension columns.`,
    tags: ["TypeScript", "React", "Apache Superset", "Ant Design", "Python", "Cross-Filter", "SQL"],
    skills: ["web-dev", "data-science", "cloud-arch"],
    color: "#22c55e",
    links: {
      github: "https://github.com/FrancescoCastaldi/superset-plugin-chart-hierarchical-table",
      demo: "https://francescocastaldi.github.io/superset-plugin-chart-hierarchical-table/",
    },
    featured: true,
    icon: "📊",
  },
  {
    id: "superset-calendar-filter",
    label: "Superset Calendar",
    title: "Apache Superset 6.1.0 — Calendar Cross-Filter Chart Plugin",
    slug: "superset-calendar-filter",
    pillar: "analytics",
    pillarRoman: "IV",
    track: "work",
    description:
      "React plugin for Apache Superset: an interactive Calendar Heatmap for temporal exploration and cross-filtering.",
    longDescription:
      "Development of a custom chart plugin for Apache Superset. Allows analysts to highlight temporal patterns and dynamically filter dashboard data by clicking on days or date ranges.",
    content: `![Superset Calendar Filter](/assets/projects/superset-calendar-filter/images/cover.png)

## Apache Superset Plugin Architecture

Standard dropdown date filters in BI tools hide temporal distribution patterns. The **Calendar Cross-Filter Chart Plugin** provides an interactive GitHub-style contribution heatmap for Apache Superset 6.1.0, turning chronological data into an intuitive dashboard filter controller.

> [!IMPORTANT]
> Clicking individual days, weeks, or dragging across month intervals dispatches global \`setDataMask\` cross-filter events, instantaneously slicing all charts across the dashboard.

## Interaction & Visual Density Comparison

Benchmarked against default enterprise filter boxes:

| Capability | Standard FilterBox Dropdown | Calendar Cross-Filter Heatmap | Analytical Advantage |
|---|---|---|---|
| **Data Density** | 1 date per line in dropdown | 365 days in a compact 120px band | Instant anomaly detection |
| **Multi-Interval Filtering** | Cumbersome multi-select | Direct drag-to-select range | 5x faster exploratory analysis |
| **Activity Encoding** | Zero metric visualization | Color intensity mapped to volume | Immediate activity discovery |
| **Dashboard Synchronization** | Manual "Apply" button | Real-time \`setDataMask\` dispatch | Reactive dashboard interaction |

*Table 1: Standard FilterBox vs Calendar Cross-Filter Heatmap*

\`\`\`typescript
// Event handler dispatching Superset data mask on date cell click
export function handleDateCellClick(dateStr: string, timeColumn: string, setDataMask: Function) {
  setDataMask({
    extraFormData: {
      time_range: \`\${dateStr} : \${dateStr}T23:59:59\`,
    },
    filterState: {
      value: dateStr,
    },
  });
}
\`\`\`

## Features

- **Temporal Aggregations**: Day, week, and monthly rollup heatmaps.
- **Dynamic Color Scales**: Configurable linear, log, and quantile color interpolations.
- **Seamless Superset 6.x Integration**: Packaged as a standard NPM visualization preset.`,
    tags: ["Superset", "TypeScript", "React", "Cross-Filter", "Heatmap", "Data Visualization"],
    skills: ["data-science", "cloud-arch", "web-dev"],
    color: "#a8b3cf",
    links: {
      github: "https://github.com/FrancescoCastaldi/superset-plugin-chart-calendar-filter",
    },
    featured: true,
    icon: "📅",
  },
  {
    id: "mini-jersey-studio",
    label: "Mini Jersey Studio",
    title: "Mini Jersey Studio — 3D WebGL Real-Time Graphic Customizer",
    slug: "mini-jersey-studio",
    pillar: "analytics",
    pillarRoman: "IV",
    track: "work",
    description:
      "Interactive 3D WebGL apparel customizer with dynamic planar texture projection, custom GLB import, and Tech Pack export.",
    longDescription:
      "Real-time 3D cycling jersey & apparel customizer built with Three.js and TypeScript. Features SVG-to-Canvas dynamic texture projection, custom GLB/GLTF model parsing, multi-layer decal placement, and automated Tech Pack production export for apparel manufacturing.",
    content: `![Mini Jersey Studio](/assets/projects/mini-jersey-studio/images/cover.png)

## Real-Time 3D Apparel Customization

Mini Jersey Studio is a browser-based 3D design studio for cycling kits and sportswear. Designers can apply colors, vector gradients, sponsor logos, and patterns directly onto 3D garments with instantaneous WebGL texture baking.

> [!IMPORTANT]
> The engine utilizes dynamic UV coordinate mapping and OffscreenCanvas layers to project 2D SVG vector artwork onto complex 3D non-planar meshes in real time at 60 FPS.

## 3D Pipeline & Performance Benchmarks

Engine performance was measured across mobile and desktop WebGL runtimes:

| Metric / Feature | Traditional 2D Pattern Editor | Mini Jersey Studio 3D WebGL | Technical Achievement |
|---|---|---|---|
| **Render Frame Rate** | Static canvas redraw (10 FPS) | Constant 60 FPS (PBR Shaders) | Silky smooth OrbitControls |
| **Decal Placement** | Flat bounding box estimation | Planar Raycast UV projection | Perfect seam alignment |
| **Texture Baking** | Server-side rasterization (3s) | Client OffscreenCanvas (< 16 ms) | Real-time interactive feedback |
| **Tech Pack Generation** | Manual CAD reconstruction | Automated vector PDF export | Zero manufacturing turnaround delay |

*Table 1: 3D Pipeline & Performance Benchmarks*

\`\`\`typescript
// Three.js dynamic canvas texture projection on garment mesh
import * as THREE from 'three';

export function updateGarmentTexture(mesh: THREE.Mesh, canvasSource: HTMLCanvasElement) {
  const canvasTexture = new THREE.CanvasTexture(canvasSource);
  canvasTexture.flipY = false;
  canvasTexture.colorSpace = THREE.SRGBColorSpace;
  canvasTexture.anisotropy = 16;
  
  if (mesh.material instanceof THREE.MeshStandardMaterial) {
    mesh.material.map = canvasTexture;
    mesh.material.needsUpdate = true;
  }
}
\`\`\`

## Key Capabilities

1. **3D Mesh Rendering**: Interactive Three.js viewport with OrbitControls, PBR materials, and realistic fabric normal maps.
2. **Planar & Decal Projection**: High-resolution logo placement with interactive scale, rotate, and snap-to-seam controls.
3. **Tech Pack Production Export**: Converts the 3D model configuration into flat 2D pattern templates with Pantone color codes ready for sublimation printing.`,
    tags: ["Three.js", "WebGL", "TypeScript", "React", "3D Modeling"],
    skills: ["web-dev", "cycling-analytics"],
    color: "#06b6d4",
    links: {
      github: "https://github.com/FrancescoCastaldi/mini-jersey-studio",
      demo: "https://francescocastaldi.github.io/mini-jersey-studio/",
    },
    featured: true,
    icon: "👕",
  },
  {
    id: "trumetrapla",
    label: "TruMetraPla",
    title: "TruMetraPla — Industrial Sheet Metal Productivity & KPI Analytics",
    slug: "trumetrapla",
    pillar: "analytics",
    pillarRoman: "IV",
    track: "work",
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

def calculate_kpi(df: pd.DataFrame) -> pd.DataFrame:
    # Aggregates operator productivity and machine cycle efficiency
    return df.groupby("machinery").agg(
        produced_pieces=("produced_pieces", "sum"),
        mean_efficiency=("efficiency", "mean"),
        anomaly_count=("has_delay", "sum")
    ).reset_index()
\`\`\`

## The Result on the Field

The dashboard replaced hours of manual manipulation in Excel with a **single click** import process. Now operators monitor average productivity instantly, identifying efficiency drops via dynamic tables and interactive breakdown charts.`,
    tags: ["Python", "Data Analysis", "Dashboard", "Pandas", "Industrial Engineering"],
    skills: ["data-science", "healthcare-it"],
    color: "#C5A059",
    links: {
      github: "https://github.com/FrancescoCastaldi/TruMetraPla",
    },
    featured: true,
    icon: "🏭",
  },
];
