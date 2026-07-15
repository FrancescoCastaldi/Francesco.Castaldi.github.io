import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    title: "Blockchain in Healthcare: Beyond the Hype",
    slug: "blockchain-healthcare-beyond-hype",
    date: "2025-11-15",
    excerpt:
      "Exploring practical applications of blockchain for healthcare compliance tracking and why Ethereum testnets are a viable starting point.",
    content: `## The State of Blockchain in Healthcare

Blockchain technology has been promised as a revolutionary force in healthcare for years, yet widespread adoption remains elusive. While cryptocurrency markets dominate headlines, the underlying distributed ledger technology offers genuine value for specific healthcare use cases — particularly around compliance, audit trails, and supply chain integrity.

## Why Compliance Tracking Works

Healthcare facilities operate under strict regulatory frameworks that require immutable record-keeping. Traditional databases can be altered, whether accidentally or intentionally. Smart contracts on Ethereum provide a transparent, tamper-resistant layer for logging sanitization activities, equipment maintenance, and protocol adherence.

The key advantage is not decentralization for its own sake, but cryptographic certainty. Once a sanitization record is written to the Sepolia testnet, it cannot be modified retroactively. This creates an audit trail that satisfies regulatory requirements while reducing administrative overhead.

## Practical Considerations

Current limitations include transaction costs (even on testnets), integration complexity with existing hospital management systems, and the learning curve for healthcare IT staff. However, for facilities that already use digital tracking systems, adding a blockchain verification layer can be implemented incrementally.

Hybrid approaches — where sensitive patient data remains off-chain and only hashes or references are stored on-chain — offer the best balance of transparency and privacy.`,
    tags: ["Blockchain", "Healthcare IT", "Smart Contracts"],
    readingTime: 4,
    published: true,
    category: "Technology",
  },
  {
    title: "Building a GPX Editor with TypeScript and Leaflet",
    slug: "building-gpx-editor-typescript-leaflet",
    date: "2025-09-20",
    excerpt:
      "A deep dive into building a browser-based GPS track editor with route smoothing, elevation profiles, and zero backend dependencies.",
    content: `## Why a Browser-Based GPX Editor?

Cyclists and outdoor enthusiasts accumulate GPX files from GPS devices and phone apps, but editing these tracks typically required desktop software. Modern browser APIs and mapping libraries make it possible to build a fully functional GPX editor that runs entirely client-side.

## Core Features

The editor supports three essential workflows: loading existing GPX files, modifying waypoints, and exporting clean tracks. The Douglas-Peucker algorithm handles route simplification by removing redundant points while preserving overall shape — critical for reducing file size without losing meaningful route data.

Elevation profiles are rendered using Chart.js, giving immediate visual feedback on terrain difficulty. Users can trim start and end points, useful for removing the drive to the trailhead from a ride recording.

## Technical Decisions

Leaflet was chosen over Mapbox GL for its smaller bundle size and permissive BSD license. TypeScript provides type safety across the coordinate manipulation logic, which is where most bugs surface in geospatial applications. Vite enables fast development iteration with instant hot module replacement.`,
    tags: ["TypeScript", "Leaflet", "Vite", "Cycling"],
    readingTime: 5,
    published: true,
    category: "Development",
  },
  {
    title: "SIR Epidemiological Models as Markov Chains",
    slug: "sir-markov-chains-epidemiology",
    date: "2025-06-10",
    excerpt:
      "Implementing discrete-time Markov chain simulations of the SIR model with sensitivity analysis and Monte Carlo methods for outbreak prediction.",
    content: `## From Differential Equations to Discrete Steps

The classic SIR model uses differential equations to describe how a population moves between Susceptible, Infected, and Recovered states. While elegant mathematically, this continuous formulation can be less intuitive for modeling real-world outbreaks where interventions happen at discrete time points.

## Markov Chain Formulation

By treating the SIR model as a discrete-time Markov chain, each time step represents a fixed interval (typically one day), and transition probabilities govern movement between compartments. This approach naturally accommodates time-varying parameters — for example, reducing the contact rate when social distancing measures are introduced.

Monte Carlo simulation then generates distributions of possible outcomes rather than a single deterministic trajectory, providing a range of estimates for peak infection rates, outbreak duration, and total cases.

## Sensitivity Analysis

Parameter uncertainty is a known challenge in epidemiological modeling. Running thousands of simulations while varying R₀, recovery rates, and intervention timing reveals which parameters most influence outcomes. This helps public health officials prioritize data collection efforts on the most impactful variables.`,
    tags: ["Python", "Data Science", "Epidemiology", "Simulation"],
    readingTime: 6,
    published: true,
    category: "Data Science",
  },
  {
    title: "Comparing Image Restoration Methods for Cytology",
    slug: "comparing-image-restoration-cytology",
    date: "2025-03-05",
    excerpt:
      "A comparative study of Total Variation, UNet, and DiffPIR for deblurring and denoising cervical liquid-based cytology images.",
    content: `## The Clinical Problem

Cervical cytology screening depends on image quality. Blur and noise in liquid-based cytology (LBC) preparations can obscure cellular details, leading to diagnostic uncertainty or missed abnormalities. Computational image restoration offers a path to improving image quality without repeat sampling.

## Three Approaches

Total Variation (TV) regularization is a classical optimization-based method that reduces noise while preserving edges. It is computationally efficient and requires no training data, making it practical for clinical deployment.

UNet architectures represent the deep learning approach — trained on pairs of degraded and clean images, they learn to restore quality end-to-end. Performance depends heavily on the quantity and quality of training data.

DiffPIR applies diffusion-based reconstruction, treating restoration as a reverse diffusion process guided by the degraded image. It produces visually impressive results but requires significantly more compute.

## Results

UNet achieved the best quantitative metrics (PSNR and SSIM), while DiffPIR produced results preferred by pathologists in qualitative review. TV regularization, while lower in absolute performance, offers the advantage of predictable behavior without training data dependencies.`,
    tags: ["Python", "PyTorch", "Computer Vision", "Healthcare"],
    readingTime: 7,
    published: true,
    category: "Research",
  },
  {
    title: "UX Redesign of a Public Transport Website",
    slug: "ux-redesign-public-transport",
    date: "2024-12-01",
    excerpt:
      "Applying the Double Diamond methodology to redesign the TPER public transport website, achieving a 35-point SUS improvement.",
    content: `## The Starting Point

The existing TPER public transport website had a System Usability Scale (SUS) score of 37.5 out of 100 — well below the average of 68. Task completion rates hovered around 40% for key user journeys like route planning and ticket purchase. Something needed to change.

## The Process

The Double Diamond methodology structures UX work into four phases: Discover, Define, Develop, and Deliver.

In the Discover phase, user research including interviews and contextual inquiry revealed that the main pain points were confusing navigation, inconsistent terminology, and poor mobile responsiveness. Journey mapping visualized the gaps between user expectations and the current experience.

The Define phase synthesized research into clear problem statements and prioritized the highest-impact improvements. A persona representing the typical commuter served as a reference throughout design decisions.

During Develop, wireframes evolved into interactive prototypes tested with users in iterative rounds. Each round identified specific issues and informed refinements.

The Deliver phase produced high-fidelity prototypes backed by a design system for consistent implementation.

## Results

After the redesign, SUS scores improved from 37.5 to 72.5, and task completion rates rose from approximately 40% to over 90% for core workflows.`,
    tags: ["UX Design", "Usability", "Research", "Public Transport"],
    readingTime: 5,
    published: true,
    category: "Design",
  },
  {
    title: "Machine Learning Fairness on the Adult Census Dataset",
    slug: "ml-fairness-adult-census",
    date: "2024-09-15",
    excerpt:
      "Building an ML pipeline to predict income brackets while evaluating fairness metrics across demographic groups using SHAP analysis.",
    content: `## Beyond Accuracy

Machine learning models are increasingly used in high-stakes decisions, yet standard accuracy metrics can mask systematic biases against demographic groups. The UCI Adult census dataset provides a testbed for exploring these issues in a controlled setting.

## The Pipeline

The project compares three classifiers — Logistic Regression, Random Forest, and XGBoost — on the task of predicting whether income exceeds $50K/year. Beyond raw performance, the analysis evaluates fairness using demographic parity and equal opportunity metrics.

Feature engineering includes encoding categorical variables and creating interaction terms. Cross-validation ensures performance estimates generalize beyond the test set.

## Findings

All models achieved acceptable accuracy, but fairness metrics revealed significant disparities. SHAP (SHapley Additive exPlanations) analysis identified which features most influenced predictions, helping distinguish legitimate predictive factors from proxy variables that could encode bias.

The key takeaway: fairness evaluation should be a standard part of any ML pipeline, not an afterthought. Techniques like threshold adjustment and reweighting can mitigate disparities without substantially reducing accuracy.`,
    tags: ["Python", "Machine Learning", "Fairness", "Data Science"],
    readingTime: 6,
    published: true,
    category: "Data Science",
  },
  {
    title: "Building Custom Visualization Plugins for Apache Superset",
    slug: "custom-visualization-plugins-superset",
    date: "2024-06-20",
    excerpt:
      "A technical guide to creating custom chart plugins for Apache Superset 6.1.0, with a calendar heatmap as a working example.",
    content: `## Why Build Custom Plugins?

Apache Superset ships with a rich set of visualization types, but real-world dashboards often require specialized charts. Custom plugins allow teams to extend Superset with visualizations tailored to their specific data and workflows.

## Architecture

Superset plugins are React components that follow a defined interface. Each plugin receives query results as props and is responsible for rendering a visualization. The build system uses TypeScript and Webpack, with Emotion for styling.

The calendar heatmap plugin maps metrics to color intensity on a calendar grid, where each cell represents a day. Clicking a date or date range triggers Superset's native cross-filter API, filtering other dashboard components to the selected period.

## Key Technical Details

Cross-filter compatibility is the most nuanced aspect of plugin development. The plugin must emit the correct filter formatting for Superset's query engine. Type definitions from the Superset codebase help ensure compatibility.

The plugin registers with Superset's plugin registry and then becomes available in the chart type dropdown, just like native visualizations.`,
    tags: ["Superset", "TypeScript", "React", "Data Visualization"],
    readingTime: 5,
    published: true,
    category: "Development",
  },
];
