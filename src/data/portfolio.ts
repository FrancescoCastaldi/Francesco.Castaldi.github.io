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
