import type { EngineeringPillarId } from "./types";

export const FEATURED_PROJECT_IDS: readonly string[] = [
  "docker-cli-contributions",
  "kanister-kubernetes-operator",
  "toyota-m15a-connecting-rod",
  "yaris-hv-fan-optimizer",
  "evidence-bi-as-code",
  "apache-superset-contributions",
  "hailcast-ml-radar-nowcasting",
  "sir-markov-chain",
  "ci-cervical-lbc",
  "sgf2-ai-project",
  "mini-jersey-studio",
  "trumetrapla",
] as const;

export const ARCHIVE_ONLY_PROJECT_IDS: readonly string[] = [
  "duckle-workspace-orchestration",
  "superset-plugin-chart-hierarchical-table",
  "superset-calendar-filter",
] as const;

export interface VerifiedMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  source: string;
  verifiedAt: string;
}

export const VERIFIED_CAREER_METRICS: readonly VerifiedMetric[] = [
  {
    id: "consulting-experience",
    label: "Industry Practice",
    value: "2 Years",
    detail: "Healthcare Business & Systems Consulting",
    source: "Direct Author Declaration (D5)",
    verifiedAt: "2026-09-13",
  },
  {
    id: "degree-bsc",
    label: "Undergraduate Degree",
    value: "BSc Computer Engineering",
    detail: "Alma Mater Studiorum — Università di Bologna",
    source: "Direct Author Declaration (D6)",
    verifiedAt: "2026-09-13",
  },
  {
    id: "degree-msc",
    label: "Graduate Studies",
    value: "MSc Computer Science",
    detail: "In progress — Advanced Systems & Data Science",
    source: "Direct Author Declaration (D6)",
    verifiedAt: "2026-09-13",
  },
] as const;

export const PORTFOLIO_HERO_COPY = {
  eyebrow: "ARCHIVAL MONOGRAPH • THE SCULPTED ATLAS",
  headline: "Systems, shaped with care.",
  subheadline:
    "A personal atlas of computer engineering, powertrain kinematics, stochastic modeling, and enterprise data architectures.",
  lead:
    "Built with quiet precision: discrete lamellar structures, verified metrics, and upstream code contributions to global open-source ecosystems.",
  primaryCta: {
    label: "Explore Selected Work",
    href: "/#work",
  },
  secondaryCta: {
    label: "Engineering Disciplines",
    href: "/#expertise",
  },
  scrollPrompt: "Scroll to explore monograph",
} as const;

export const PRACTICE_AREA_METADATA: Record<
  EngineeringPillarId,
  {
    id: EngineeringPillarId;
    roman: string;
    title: string;
    description: string;
  }
> = {
  upstream: {
    id: "upstream",
    roman: "I",
    title: "Upstream Systems & Cloud Native",
    description: "Linux container toolchains, distributed runtime operators, and core open-source engines.",
  },
  automotive: {
    id: "automotive",
    roman: "II",
    title: "Automotive & Powertrain Kinematics",
    description: "Reciprocating dynamics, finite-element structural verification, and real-world hybrid telemetry.",
  },
  "data-science": {
    id: "data-science",
    roman: "III",
    title: "Data Science, Radar AI & Stochastic Modeling",
    description: "Meteorological radar Doppler nowcasting, Markov chain dynamics, and algorithmic fairness auditing.",
  },
  analytics: {
    id: "analytics",
    roman: "IV",
    title: "Enterprise Analytics & Visualization",
    description: "High-density data visualization architectures, WebGL projection engines, and industrial KPI plugins.",
  },
};

export interface ProjectRepoMapping {
  projectId: string;
  repoName: string;
  repoUrl: string;
  affiliation: "owned" | "upstream";
  primaryLanguage: string;
  topics: string[];
}

export const PROJECT_REPO_MAPPINGS: readonly ProjectRepoMapping[] = [
  {
    projectId: "docker-cli-contributions",
    repoName: "docker/cli",
    repoUrl: "https://github.com/docker/cli",
    affiliation: "upstream",
    primaryLanguage: "Go",
    topics: ["cli", "docker", "zsh", "cobra", "containers"],
  },
  {
    projectId: "kanister-kubernetes-operator",
    repoName: "kanisterio/kanister",
    repoUrl: "https://github.com/kanisterio/kanister",
    affiliation: "upstream",
    primaryLanguage: "Go",
    topics: ["kubernetes", "backup", "disaster-recovery", "operator", "cloud-native"],
  },
  {
    projectId: "toyota-m15a-connecting-rod",
    repoName: "FrancescoCastaldi/toyota-m15a-connecting-rod",
    repoUrl: "https://github.com/FrancescoCastaldi/toyota-m15a-connecting-rod",
    affiliation: "owned",
    primaryLanguage: "MATLAB",
    topics: ["automotive", "kinematics", "cad", "fea", "m15a-fks"],
  },
  {
    projectId: "yaris-hv-fan-optimizer",
    repoName: "FrancescoCastaldi/yaris-hv-fan-optimizer",
    repoUrl: "https://github.com/FrancescoCastaldi/yaris-hv-fan-optimizer",
    affiliation: "owned",
    primaryLanguage: "Kotlin",
    topics: ["android", "obd2", "can-bus", "hybrid", "telematics"],
  },
  {
    projectId: "evidence-bi-as-code",
    repoName: "evidence-dev/evidence",
    repoUrl: "https://github.com/evidence-dev/evidence",
    affiliation: "upstream",
    primaryLanguage: "Svelte",
    topics: ["bi-as-code", "sql", "svelte", "analytics", "data-visualization"],
  },
  {
    projectId: "apache-superset-contributions",
    repoName: "apache/superset",
    repoUrl: "https://github.com/apache/superset",
    affiliation: "upstream",
    primaryLanguage: "TypeScript",
    topics: ["superset", "visualization", "bi", "react", "plugins"],
  },
  {
    projectId: "hailcast-ml-radar-nowcasting",
    repoName: "FrancescoCastaldi/hailcast-ml-radar-nowcasting",
    repoUrl: "https://github.com/FrancescoCastaldi/hailcast-ml-radar-nowcasting",
    affiliation: "owned",
    primaryLanguage: "Python",
    topics: ["radar", "machine-learning", "meteorology", "nowcasting", "doppler"],
  },
  {
    projectId: "sir-markov-chain",
    repoName: "FrancescoCastaldi/sir-markov-chain",
    repoUrl: "https://github.com/FrancescoCastaldi/sir-markov-chain",
    affiliation: "owned",
    primaryLanguage: "Python",
    topics: ["markov-chain", "epidemiology", "stochastic-processes", "simulation"],
  },
  {
    projectId: "ci-cervical-lbc",
    repoName: "FrancescoCastaldi/ci-cervical-lbc",
    repoUrl: "https://github.com/FrancescoCastaldi/ci-cervical-lbc",
    affiliation: "owned",
    primaryLanguage: "Python",
    topics: ["deep-learning", "computer-vision", "healthcare", "cytology"],
  },
  {
    projectId: "sgf2-ai-project",
    repoName: "FrancescoCastaldi/sgf2-ai-project",
    repoUrl: "https://github.com/FrancescoCastaldi/sgf2-ai-project",
    affiliation: "owned",
    primaryLanguage: "Python",
    topics: ["fairness-ai", "demographic-parity", "shap", "xgboost"],
  },
  {
    projectId: "mini-jersey-studio",
    repoName: "FrancescoCastaldi/mini-jersey-studio",
    repoUrl: "https://github.com/FrancescoCastaldi/mini-jersey-studio",
    affiliation: "owned",
    primaryLanguage: "TypeScript",
    topics: ["threejs", "webgl", "r3f", "3d-configurator"],
  },
  {
    projectId: "trumetrapla",
    repoName: "FrancescoCastaldi/trumetrapla",
    repoUrl: "https://github.com/FrancescoCastaldi/trumetrapla",
    affiliation: "owned",
    primaryLanguage: "TypeScript",
    topics: ["bi", "dashboard", "analytics", "enterprise"],
  },
  {
    projectId: "duckle-workspace-orchestration",
    repoName: "FrancescoCastaldi/duckle-workspace-orchestration",
    repoUrl: "https://github.com/FrancescoCastaldi/duckle-workspace-orchestration",
    affiliation: "owned",
    primaryLanguage: "TypeScript",
    topics: ["duckdb", "data-engineering", "workspace", "orchestration"],
  },
  {
    projectId: "superset-plugin-chart-hierarchical-table",
    repoName: "FrancescoCastaldi/superset-plugin-chart-hierarchical-table",
    repoUrl: "https://github.com/FrancescoCastaldi/superset-plugin-chart-hierarchical-table",
    affiliation: "owned",
    primaryLanguage: "TypeScript",
    topics: ["superset", "plugin", "matrix", "hierarchical-table"],
  },
  {
    projectId: "superset-calendar-filter",
    repoName: "FrancescoCastaldi/superset-calendar-filter",
    repoUrl: "https://github.com/FrancescoCastaldi/superset-calendar-filter",
    affiliation: "owned",
    primaryLanguage: "TypeScript",
    topics: ["superset", "filter", "calendar", "time-grain"],
  },
] as const;

