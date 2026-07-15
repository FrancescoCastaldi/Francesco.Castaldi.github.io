import type { ProjectNode } from "./types";

export const projects: ProjectNode[] = [
  {
    id: "hosp-san-tracker",
    label: "Hospital Sanitization",
    title: "Hospital Sanitization Tracker",
    slug: "hospital-sanitization-tracker",
    description:
      "A decentralized application based on Ethereum smart contracts for immutable tracking of hospital sanitization activities, certified on Sepolia testnet.",
    longDescription:
      "Full-stack blockchain DApp that records hospital sanitization operations as immutable transactions on the Ethereum Sepolia testnet. Built with Solidity smart contracts, Hardhat for testing and deployment, and Ethers.js for frontend integration. Ensures compliance traceability for healthcare facility hygiene protocols.",
    tags: ["Solidity", "Hardhat", "Ethers.js", "Blockchain"],
    skills: ["healthcare-it", "blockchain"],
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
      "Web application for editing GPS tracks with interactive Leaflet maps, smoothing, point trimming, and real-time elevation profiles.",
    longDescription:
      "A browser-based GPS track editor allowing cyclists and outdoor enthusiasts to modify GPX files directly. Features include route smoothing (Douglas-Peucker algorithm), waypoint trimming, elevation profile visualization with Chart.js, and export to standard GPX format. Built with TypeScript and Vite for fast development.",
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
      "Simulation of an SIR epidemiological model as a discrete-time Markov chain with sensitivity analysis and Monte Carlo simulation.",
    longDescription:
      "Academic project implementing the SIR (Susceptible-Infected-Recovered) epidemiological model using discrete-time Markov chains. Includes parameter sensitivity analysis, Monte Carlo simulations for outbreak prediction, and visualization of epidemic curves under different R₀ scenarios. Developed for the University of Bologna.",
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
      "Comparative study of deblurring and denoising methods on cervical cytology images: Total Variation, UNet, and DiffPIR.",
    longDescription:
      "Research project comparing state-of-the-art image restoration techniques applied to liquid-based cytology (LBC) cervical images. Evaluates Total Variation regularization, UNet convolutional networks, and DiffPIR diffusion-based reconstruction. Includes quantitative metrics (PSNR, SSIM) and qualitative pathologist review.",
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
      "Supervised Machine Learning on the Adult (UCI) dataset to predict income >$50K. Model comparison, fairness analysis, and feature importance.",
    longDescription:
      "Comprehensive ML pipeline comparing classifiers (Logistic Regression, Random Forest, XGBoost) on the UCI Adult census dataset. Includes exploratory data analysis, feature engineering, cross-validation, fairness metrics (demographic parity, equal opportunity), and SHAP-based feature importance interpretation.",
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
      "Complete UX redesign of the TPER public transport website using the Double Diamond methodology. SUS score from 37.5 to 72.5, +50pp task completion.",
    longDescription:
      "End-to-end UX redesign project for TPER (Emilia-Romagna public transport). Applied Double Diamond design process: user research, journey mapping, wireframing, interactive prototyping, and usability testing. Achieved a 35-point SUS score improvement and 50 percentage point increase in task completion rate across key user flows.",
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
      "Interactive calendar heatmap chart plugin for Apache Superset 6.1.0. Click dates to cross-filter dashboards.",
    longDescription:
      "Custom visualization plugin for Apache Superset that renders a calendar heatmap. Users can click individual dates or date ranges to cross-filter other dashboard components. Built with TypeScript and Emotion for styling. The plugin integrates with Superset's native cross-filter API and supports both metric and time-series data sources.",
    tags: ["Superset", "TypeScript", "React", "Cross-Filter"],
    skills: ["data-science", "cloud-arch"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "📅",
  },
];
