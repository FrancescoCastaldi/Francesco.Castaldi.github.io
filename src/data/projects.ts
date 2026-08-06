import type { ProjectNode } from "./types";

export const projects: ProjectNode[] = [
  {
    id: "trumetrapla",
    label: "TruMetraPla",
    title: "TruMetraPla",
    slug: "trumetrapla",
    description:
      "Python dashboard to monitor productivity in metalworking processes by importing Excel data and calculating KPIs.",
    longDescription:
      "Interactive data dashboard built in Python (Streamlit/Pandas) designed to monitor and optimize productivity in manufacturing and metalworking processes. It imports raw production data from Excel files, cleans it, and automatically calculates key performance indicators (KPIs) through rich data visualizations.",
    content: `
## Overview
TruMetraPla is a desktop and CLI tool designed to monitor and optimize productivity in manufacturing and metalworking processes. It imports raw production data from Excel files, cleans it, and automatically calculates key performance indicators (KPIs) through rich data visualizations.

## Key Features
- **Smart import**: Automatic recognition of Excel columns (Italian/English).
- **Modern dashboard**: Graphical interface with a minimal tech theme and dynamic filters.
- **Real-time KPIs**: Pieces produced, hours worked, average productivity per employee/process.
- **Interactive charts**: Pie charts for quick analysis.
- **Cross-platform**: Windows executable + Linux package.
- **Full CLI**: Command-line reports with advanced options.

> [!NOTE]
> The system supports unmapped extra columns (they are preserved in the data but not used for KPIs).

## Architecture & Technology
The tool is built entirely in Python (3.11+) and is structured to be used both as a CLI application and a desktop GUI. 
It uses \`pandas\` and \`openpyxl\` for efficient data manipulation and \`tkinter\` / \`ttkbootstrap\` for the graphical interface.
The project is organized in a modular structure (\`cli.py\`, \`data_loader.py\`, \`gui.py\`, \`metrics.py\`) and is distributed via PyInstaller as standalone executables for Windows and Linux.

`,
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
      "A decentralized application based on Ethereum smart contracts for immutable tracking of hospital sanitization activities, certified on Sepolia testnet.",
    longDescription:
      "Full-stack blockchain DApp that records hospital sanitization operations as immutable transactions on the Ethereum Sepolia testnet. Built with Solidity smart contracts, Hardhat for testing and deployment, and Ethers.js for frontend integration. Ensures compliance traceability for healthcare facility hygiene protocols.",
    content: `
## Overview
DApp for tracing sanitization activities in hospitals using blockchain technology - Project for Blockchain and Cryptocurrencies course.
Hospital Sanitization Tracker is a decentralized application designed to record, verify, and monitor the sanitization of hospital environments (rooms, operating theaters, equipment) in an immutable and transparent way.

## Key Features
- **Immutable Records**: Every sanitization activity is permanently recorded on the blockchain.
- **Role-Based Access**: Distinct roles for Cleaners (who log activities) and Auditors (who verify them).
- **Transparency**: Patients and hospital management can cryptographically verify when an area was last sanitized.
- **Smart Contracts**: Core logic is governed by Ethereum Smart Contracts.

> [!IMPORTANT]
> The use of blockchain ensures that sanitization logs cannot be retroactively altered, increasing accountability in healthcare facilities.

## Architecture & Technology
The backend is powered by **Solidity** smart contracts deployed on a test network (Ganache/Sepolia).
The frontend is a **React** application that interacts with the blockchain using **Web3.js** / **Ethers.js** and MetaMask for wallet authentication.
The project demonstrates applied cryptography and decentralized consensus mechanisms in a real-world healthcare scenario.

`,
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
      "Web application for editing GPS tracks with interactive Leaflet maps, smoothing, point trimming, and real-time elevation profiles.",
    longDescription:
      "A browser-based GPS track editor allowing cyclists and outdoor enthusiasts to modify GPX files directly. Features include route smoothing (Douglas-Peucker algorithm), waypoint trimming, elevation profile visualization with Chart.js, and export to standard GPX format. Built with TypeScript and Vite for fast development.",
    content: `
## Overview
Browser-based GPX file editor: modify power (watts) and speed of cycling activities. Works 100% offline. No server needed.
This tool was built to solve a specific problem for cyclists: correcting erroneous power meter data or speed spikes in GPS files before uploading them to platforms like Strava or Garmin Connect.

## Key Features
- **Client-Side Processing**: All parsing and XML manipulation happens in the browser for maximum privacy and speed.
- **Power Adjustment**: Scale, cap, or offset watts data across the entire ride or specific segments.
- **Speed Correction**: Smooth out GPS glitches that result in impossible speed spikes.
- **Export**: Generate a valid, clean \`.gpx\` file ready for upload.

> [!TIP]
> Since it runs entirely in the browser, you can load a 50MB GPX file and it processes instantly without waiting for uploads.

## Architecture & Technology
Developed with vanilla **JavaScript**, **HTML5**, and **CSS3**. It utilizes the DOMParser API to read and mutate the complex XML structure of GPX files.
The UI is minimal and responsive, focusing purely on utility and performance.

`,
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
      "Simulation of an SIR epidemiological model as a discrete-time Markov chain with sensitivity analysis and Monte Carlo simulation.",
    longDescription:
      "Academic project implementing the SIR (Susceptible-Infected-Recovered) epidemiological model using discrete-time Markov chains. Includes parameter sensitivity analysis, Monte Carlo simulations for outbreak prediction, and visualization of epidemic curves under different R₀ scenarios. Developed for the University of Bologna.",
    content: `
## Overview
Simulation of an epidemiological SIR model as a discrete-time Markov chain - University project for Probabilistic Models (UniBo).
This project models the spread of infectious diseases using a stochastic approach, comparing it with the classic deterministic differential equations.

## Key Features
- **Stochastic Modeling**: Implementation of the SIR (Susceptible-Infectious-Recovered) model using Markov Chains.
- **Transition Matrices**: Calculation of state probabilities over discrete time steps.
- **Comparative Analysis**: Visualization of the differences between the stochastic simulation and the deterministic model.
- **Parameter Tuning**: Adjustable infection ($\beta$) and recovery ($\gamma$) rates.

> [!NOTE]
> The stochastic approach captures the random fluctuations of disease transmission, which is especially important in small populations where the deterministic model fails.

## Architecture & Technology
The simulation engine is written in **Python**, utilizing **NumPy** for efficient matrix operations and state transitions.
**Matplotlib** is used to plot the trajectories of the Susceptible, Infectious, and Recovered populations over time, providing clear visual insights into the epidemic dynamics.

`,
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
      "Comparative study of deblurring and denoising methods on cervical cytology images: Total Variation, UNet, and DiffPIR.",
    longDescription:
      "Research project comparing state-of-the-art image restoration techniques applied to liquid-based cytology (LBC) cervical images. Evaluates Total Variation regularization, UNet convolutional networks, and DiffPIR diffusion-based reconstruction. Includes quantitative metrics (PSNR, SSIM) and qualitative pathologist review.",
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
      "Supervised Machine Learning on the Adult (UCI) dataset to predict income >$50K. Model comparison, fairness analysis, and feature importance.",
    longDescription:
      "Comprehensive ML pipeline comparing classifiers (Logistic Regression, Random Forest, XGBoost) on the UCI Adult census dataset. Includes exploratory data analysis, feature engineering, cross-validation, fairness metrics (demographic parity, equal opportunity), and SHAP-based feature importance interpretation.",
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
      "Complete UX redesign of the TPER public transport website using the Double Diamond methodology. SUS score from 37.5 to 72.5, +50pp task completion.",
    longDescription:
      "End-to-end UX redesign project for TPER (Emilia-Romagna public transport). Applied Double Diamond design process: user research, journey mapping, wireframing, interactive prototyping, and usability testing. Achieved a 35-point SUS score improvement and 50 percentage point increase in task completion rate across key user flows.",
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
      "Interactive calendar heatmap chart plugin for Apache Superset 6.1.0. Click dates to cross-filter dashboards.",
    longDescription:
      "Custom visualization plugin for Apache Superset that renders a calendar heatmap. Users can click individual dates or date ranges to cross-filter other dashboard components. Built with TypeScript and Emotion for styling. The plugin integrates with Superset's native cross-filter API and supports both metric and time-series data sources.",
    color: "var(--color-nebula)",
    tags: ["Superset", "TypeScript", "React", "Cross-Filter"],
    skills: ["data-science", "cloud-arch"],
    links: {},
    image: "images/digital_workspace.jpg",
    featured: false,
    icon: "📅",
  },
];
