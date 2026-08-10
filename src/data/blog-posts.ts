import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    title: "Installing Focal 165 IC on Toyota Yaris XP210",
    slug: "focal-165-ic-toyota-yaris-xp210",
    date: "2026-08-06",
    excerpt: "Complete step-by-step guide to replacing the original front speakers with the Focal 165 IC kit.",
    content: `![Focal 165 IC speaker upgrade](/assets/blog/focal-165-ic-toyota-yaris-xp210/images/cover.png)

## Introduction and Required Materials

Replacing the stock speakers on the Toyota Yaris (XP210 series) is one of the most impactful audio upgrades you can make. The **Focal 165 IC** coaxial kit offers sound quality that literally destroys the old original paper cones, delivering crystal-clear highs and extremely precise mids.

> [!WARNING]
> The door panels of the Yaris XP210 are secured with extremely fragile plastic clips. Always work in mild temperatures or use a heat gun to warm the plastic. If you pull while they are cold, they will break.

## Specifications Comparison

Here is why the leap in quality is so sharp:

| Specifications | OEM Toyota Yaris | Focal 165 IC |
|---|---|---|
| **Impedance** | 4 Ohm | 4 Ohm |
| **Cone Material** | Treated paper | Polyglass |
| **Sensitivity** | ~86 dB | 92.6 dB (Much higher volume at the same radio power) |
| **Tweeter** | Absent or recessed | Inverted dome aluminum (Extreme detail) |

*Table 1: Technical specifications comparison*


## Step 1: Door Panel Disassembly

1. Look for the hidden screw behind the inner door handle (there is a tiny plastic cover).
2. Remove the screw at the bottom of the armrest pocket.
3. Start from the bottom right corner and use a plastic *trim removal tool* to pry and pop the first clip.
4. Pull firmly along the perimeter.
5. Disconnect the power window connectors.

> [!TIP]
> Original Toyota speakers are riveted to the sheet metal, not screwed! Be prepared with a drill and a 4 or 5mm bit to destroy the rivet heads and remove the original basket.

## Step 2: Adapter Installation and Wiring

The Yaris **strictly requires** plastic or MDF adapter rings, as the hole on the door is not a standard 165mm.

- Secure the adapter to the sheet metal using through bolts and self-locking nuts.
- Put sound-deadening tape between the sheet metal and the adapter to cancel vibrations.
- Screw the Focal 165 IC woofer firmly to the ring.


## Final Test

Before reassembling everything, turn on the radio. Check the polarity: if the bass seems "empty" or non-existent, you might have reversed positive and negative on one side. Once verified, enjoy your new soundstage!`,
    tags: ["Audio", "Focal", "Toyota", "Tutorial"],
    readingTime: 6,
    published: true,
    category: "Vehicles",
  },
  {
    title: "Blockchain in Healthcare: Beyond the Hype",
    slug: "blockchain-healthcare-beyond-hype",
    date: "2025-11-15",
    excerpt: "Practical applications of blockchain for tracking hospital compliance and why Ethereum testnets are the perfect starting point.",
    content: `![Blockchain diagram in healthcare](/assets/blog/blockchain-healthcare-beyond-hype/images/cover.png)

## The State of Blockchain in Healthcare

For years, Blockchain has been sold to us as the panacea for all evils in healthcare, yet adoption struggles to take off. Stripping away cryptocurrencies and financial speculation, distributed ledger technology has enormous potential for a specific use case: **compliance and audit trails**.

> [!IMPORTANT]
> The goal in healthcare is not anarchic "decentralization", but absolute cryptographic certainty. No one must be able to alter a sanitization log.


## Why Compliance Tracking Works

Healthcare facilities operate in ecosystems where a tampered log can cost lives (or multi-million dollar lawsuits). Classic relational databases (SQL) can be altered by any admin. 

**Smart Contracts on Ethereum**, on the other hand, offer a transparent and tamper-proof logging layer for:
- Operating room sanitizations.
- Maintenance of life-saving machinery (e.g., ventilators).
- Adherence to strict security protocols.

| Paradigm | Security | Data Alterability | Setup Costs |
|---|---|---|---|
| **SQL Database (Classic)** | High (if well configured) | Alterable by admin | Low |
| **Blockchain (Smart Contract)** | Absolute (Cryptographic) | **Immutable** | Medium/High |

*Table 1: Comparison between SQL Database and Blockchain*

## Practical Considerations

Obviously, there are structural limitations. Transaction costs (gas fees) can be a burden. 
However, the hybrid approach wins overall: sensitive clinical patient data (GDPR) remains strictly *off-chain* on hospital servers, while only the cryptographic hash certifying its authenticity and exact creation time ends up on the blockchain.

> [!NOTE]
> Using test networks (Testnets) like Sepolia allows clinics to simulate these audit trails at zero cost, testing architectures without risking capital in real gas fees.

To learn more about Smart Contract development, refer to the [Official Ethereum Documentation](https://ethereum.org/en/developers/docs/smart-contracts/).`,
    tags: ["Blockchain", "Healthcare IT", "Smart Contracts"],
    readingTime: 4,
    published: true,
    category: "Technology",
  },
  {
    title: "Building a GPX Editor in TypeScript and Leaflet",
    slug: "building-gpx-editor-typescript-leaflet",
    date: "2025-09-20",
    excerpt: "A technical analysis on building a client-side GPS track editor, with smoothing and elevation profiles, without any backend.",
    content: `![Architecture of the GPX Editor](/assets/blog/building-gpx-editor-typescript-leaflet/images/diagram.png)

## Why a GPX Editor in the Browser?

Cyclists and runners accumulate gigabytes of GPX files from their Garmin or Wahoo devices. Often, these files contain speed spikes or power data errors. Until yesterday, to clean these tracks, you had to download heavy desktop software. 
The challenge? Creating a 100% web-based editor. Zero backend. Zero uploads to slow servers.

**What we will build:**
- Client-side parsing of GPX files
- Smoothing algorithm to clean data
- Interactive elevation profile with Chart.js


## Core Features and Architecture

All the magic happens on the client. Your GPX file never leaves your computer.

1. **Reading and Parsing**: Instant reading of the XML.
2. **Smoothing (Douglas-Peucker)**: An essential algorithm that simplifies the track by eliminating redundant GPS points, saving the path shape while drastically reducing file size.
3. **Elevation Profile**: Rendered at 60fps using Chart.js, offering immediate visual feedback on the slope.

> [!IMPORTANT]
> Keeping everything on the client means Total Privacy for users. No one wants their home coordinates to end up on an unknown server.

## Technological Choices

To build the application, a lean and type-safe stack was needed.

| Technology | Role | Motivation |
|---|---|---|
| **TypeScript** | Core Logic | To manipulate coordinates and XML you need strong typing, otherwise geospatial bugs are endless. |
| **Leaflet** | Map Rendering | Much lighter than Mapbox GL and with a permissive license (BSD). |
| **Chart.js** | Elevation | Simple API, performant Canvas for datasets of thousands of points. |
| **Vite** | Bundler | Instant HMR, essential for iterating UI quickly. |

*Table 1: Tech Stack for the GPX Editor*

\`\`\`typescript
// Simplified GPX parsing example
import { DOMParser } from "xmldom";
const doc = new DOMParser().parseFromString(gpxString, "text/xml");
const trkpts = doc.getElementsByTagName("trkpt");
console.log(\`Found \${trkpts.length} points in the track\`);
\`\`\`

The final result is a professional, fluid, and secure tool, accessible from any modern browser.`,
    tags: ["TypeScript", "Leaflet", "Vite", "Cycling"],
    readingTime: 3,
    published: true,
    category: "Development",
  },
  {
    title: "SIR Epidemiological Models as Markov Chains",
    slug: "sir-markov-chains-epidemiology",
    date: "2025-06-10",
    excerpt: "Discrete simulations (Markov) of the SIR model, with sensitivity analysis and Monte Carlo methods for epidemic prediction.",
    content: `> **Key takeaways:** Discrete models (Markov) allow real-time variations of parameters like lockdowns, unlike classic differential equations. Furthermore, Monte Carlo methods help quantify systemic uncertainty.

![Markov transition matrix](/assets/blog/sir-markov-chains-epidemiology/images/matrix.png)

## From Differential Equations to Discrete Steps

The classic SIR epidemiological model (Susceptible, Infected, Removed) makes massive use of continuous differential equations. Mathematically elegant, sure, but very unintuitive when you have to explain to policymakers the impact of a lockdown starting on a specific day.

Reality proceeds in discrete steps, not on perfectly smooth curves.


## The Markovian Approach

Treating the SIR model as a **Discrete-time Markov Chain**, every single time "tick" corresponds to an exact day. 
Transition probabilities decide how many individuals move from one state to another. This allows inserting brutal and sudden variations to the parameters: for example, on day 15 the contact rate (R0) plummets because schools close.

> [!TIP]
> Using Markov Chains greatly simplifies writing code in Python. You switch from complex differential solvers to simple matrix iterations.

## Monte Carlo Analysis and Uncertainty

Pandemics are uncertain by definition. Using Monte Carlo simulation allows generating thousands of probabilistic scenarios instead of a single (and often wrong) deterministic prediction.

| Parameter | Impact on Markovian Model |
|---|---|
| **R₀ (Basic Reproduction Rate)** | Defines the initial slope of the infected curve. |
| **Recovery Rate** | Determines the emptying speed of the 'Infected' compartment. |
| **External Interventions (Lockdown)** | Dynamically modifies transition matrices at run-time. |

*Table 1: Parameters and Impact on the Markovian Model*

\`\`\`python
# Example of a Markovian transition matrix
import numpy as np

# States: S, I, R
P = np.array([[0.95, 0.05, 0.00],
              [0.00, 0.90, 0.10],
              [0.00, 0.00, 1.00]])
\`\`\`

Thanks to this Sensitivity Analysis, healthcare systems can mathematically understand if it makes sense to close flights or simply mandate mask usage, by analyzing the final probability distributions.`,
    tags: ["Python", "Data Science", "Epidemiology", "Simulation"],
    readingTime: 4,
    published: true,
    category: "Data Science",
  },
  {
    title: "Image Restoration in Cytology: A Comparison",
    slug: "comparing-image-restoration-cytology",
    date: "2025-03-05",
    excerpt: "Comparative study between Total Variation, UNet, and DiffPIR for deblurring and denoising of cytological images (LBC).",
    content: `## The Clinical Problem

Preventive screening in cytology (like the Pap smear) relies 100% on the quality of microscope images. Digital noise and blurriness in liquid-based preparations (LBC) can hide microscopic cellular details, causing diagnostic delays or glaring false negatives. 
Computational image restoration is the only way to save samples without having to re-swab patients.


## Three Approaches in the Ring

I compared three different methodologies, from classic computing to generative artificial intelligence:

1. **Total Variation (TV)**: Classic mathematical optimization method. Cleans up noise without blurring edges. Zero AI, very fast and predictable.
2. **UNet**: Supervised Deep Learning architecture. Trained on thousands of dirty/clean image pairs, it learns to restore pixels end-to-end.
3. **DiffPIR**: State-of-the-art. Leverages reverse diffusion models. The restoration is guided by a network that literally recreates the missing detail starting from noise.

> [!WARNING]
> Does DiffPIR invent details or restore them? In the medical field, the "hallucinations" of diffusion models are a critical problem. If the network draws an anomalous nucleus that does not exist, the diagnosis is compromised.

## Results

The results highlighted a brutal trade-off between human perception and mathematical metrics.

| Method | Metrics (PSNR/SSIM) | Pathologist Perception | Hallucination Risk |
|---|---|---|---|
| **Total Variation** | Low | Sufficient (Artificial edges) | **None** |
| **UNet** | **Very High** | Very Good | Low |
| **DiffPIR** | Medium | **Excellent (Extreme detail)** | High |

*Table 1: Results comparison between restoration methods*

UNet remains the best compromise for clinical integration: excellent mathematical scores and visually reliable results, without requiring the immense computing power (and hallucination risk) of the diffusion model.`,
    tags: ["Python", "PyTorch", "Computer Vision", "Healthcare"],
    readingTime: 7,
    published: true,
    category: "Research",
  },
  {
    title: "UX Redesign: The Public Transport Website (TPER)",
    slug: "ux-redesign-public-transport",
    date: "2024-12-01",
    excerpt: "Applying the Double Diamond methodology to revolutionize TPER's UX, achieving a 35-point increase in the SUS score.",
    content: `![Screenshot redesign TPER](/assets/blog/ux-redesign-public-transport/images/carousel-1.png)

**Project Brief:** Redesigning the user experience of the local transport portal (TPER), with the primary goal of simplifying timetable search and ticket purchasing from mobile, applying the Double Diamond methodology.

## The Starting Point (Disastrous)

What happens when a vital service like public transport has an unusable website? Frustration, delays, and endless calls to the call center.
The original TPER website had a System Usability Scale (SUS) of 37.5 out of 100. Global passing grade is 68. 
Task completion rates (e.g., finding a route or buying a ticket) stuck at 40%. A disaster.


## The Method: Double Diamond

"Changing the colors" was not enough. I applied the structured **Double Diamond** process: *Discover, Define, Develop, Deliver*.

1. **Discover**: Field interviews and Journey Mapping revealed ruthless truths. Incomprehensible navigation, bureaucratic technical jargon, and a virtually non-existent mobile experience.
2. **Define**: I synthesized the chaos into clear *problem statements*, creating personas representative of the average commuter and confused tourist.
3. **Develop**: From low-fidelity wireframing to fast iterative testing with real users.
4. **Deliver**: High-fidelity prototypes merged into a clean and scalable Design System.

> [!IMPORTANT]
> A beautiful design is useless if it doesn't convert. The primary goal was to ensure the user found the bus schedule in less than three clicks.

## Field Results

The numbers speak for themselves and justify the investment in UX Design:

| Metric | Before Redesign | After Redesign |
|---|---|---|
| **System Usability Scale (SUS)** | 37.5 (Severe Failure) | **72.5 (Good/Excellent)** |
| **Task Completion Rate** | ~40% | **>90%** |
| **Time on Task** | High (Frustration) | Very Low (Fast flow) |

*Table 1: KPI comparison pre and post redesign*

View the [Interactive Prototype on Figma](https://figma.com/).

The human-centered approach transformed a bureaucratic labyrinth into a modern and efficient digital hub.`,
    tags: ["UX Design", "Usability", "Research", "Public Transport"],
    readingTime: 3,
    published: true,
    category: "Design",
  },
  {
    title: "Machine Learning and Fairness: Adult Census Dataset",
    slug: "ml-fairness-adult-census",
    date: "2024-09-15",
    excerpt: "Building an ML pipeline to predict income, evaluating equity metrics (Fairness) through SHAP analysis.",
    content: `**Summary:** An accurate Machine Learning model is not necessarily fair. Accuracy can hide discriminatory bias if historical data is unbalanced. Using the Adult Census dataset, we analyze fairness metrics (Demographic Parity) on Random Forest and XGBoost, revealing "proxy variables" with SHAP.

## Beyond Simple Accuracy

Machine Learning models are deciding who gets a mortgage, who gets hired, and who ends up in prison. Yet, most Data Scientists only look at Accuracy. 
A 90% accurate model can hide devastating systemic bias against ethnic or gender minorities. 

I used the UCI Adult Census Dataset to demonstrate how deep-rooted this problem is.

![Bias analysis chart](/assets/blog/ml-fairness-adult-census/images/bias_chart.png)

## The Test Pipeline

I pitted three heavyweight algorithms against each other: **Logistic Regression**, **Random Forest**, and **XGBoost**, tasking them with predicting whether an individual earns more than $50,000 a year.
But besides the F1-Score, I added the calculation of *Demographic Parity* and *Equal Opportunity*.

> [!NOTE]
> Feature engineering included rigorous encoding of categorical variables and careful handling of missing values, essential so as not to poison subsequent SHAP calculations.

## Results: What the Model Really "Thinks"

All models achieved very high accuracy. But looking at the fairness metrics, the picture was scary. 

| Algorithm | Accuracy | Demographic Parity Gap | Equal Opportunity Gap |
|---|---|---|---|
| **Logistic Regression** | 82% | High | Moderate |
| **Random Forest** | 85% | Very High (Discriminatory) | Very High |
| **XGBoost** | **87%** | Extreme | Extreme |

*Table 1: Results and Fairness Metrics*

The more powerful the model (XGBoost), the more it "learns" to ruthlessly exploit historical correlations of inequality present in the data.

**SHAP** analysis revealed the black box: variables like Gender heavily influenced the final prediction, acting as hidden *proxy variables*. 
Conclusion? Fairness must be engineered upstream (e.g., re-weighting), it is not optional.

### Insights
- [UCI Adult Census Dataset](https://archive.ics.uci.edu/dataset/2/adult)
- [SHAP (SHapley Additive exPlanations)](https://shap.readthedocs.io/)`,
    tags: ["Python", "Machine Learning", "Fairness", "Data Science"],
    readingTime: 4,
    published: true,
    category: "Data Science",
  },
  {
    title: "Developing Visualization Plugins for Apache Superset",
    slug: "custom-visualization-plugins-superset",
    date: "2024-06-20",
    excerpt: "An engineering guide to creating custom charts in Apache Superset 6.1.0, using an interactive Calendar Heatmap as an example.",
    content: `**Abstract**: Step-by-step guide to extending Apache Superset (v6.1.0) with custom React visualizations, leveraging the plugin architecture and native cross-filters.

![Custom Calendar Heatmap in Superset](/assets/blog/custom-visualization-plugins-superset/images/heatmap.png)

## Why Get Your Hands Dirty with Custom Plugins?

Apache Superset is a phenomenal BI platform, but its native charts are sometimes not enough. Complex corporate dashboards require tailored visualizations. 
The solution? Create custom React plugins to inject proprietary charts directly into the heart of Superset.


## Architecture and Integration

Plugins in Superset are not isolated iframe widgets. They are first-class React components integrated via Webpack and TypeScript, receiving data from the native query engine (Flask/SQLAlchemy).

I developed a **Calendar Heatmap** (similar to GitHub commits) to map the intensity of an event flow day by day.

> [!TIP]
> The secret to a successful plugin in Superset is support for **Cross-Filters**. Clicking on a day on the Heatmap, the entire dashboard must magically filter on that date.

## Technical Details

Building a plugin requires adhering to very strict interfaces.

| Plugin Component | Responsibility |
|---|---|
| \`ControlPanel\` | Builds the side UI interface to let the user choose columns and metrics. |
| \`BuildQuery\` | Translates the UI configuration into formatted queries for Superset's Python backend. |
| \`TransformProps\` | Adapts the raw database JSON into props digestible by the React component. |

By registering the plugin in the central registry, the new Chart appears in the native dropdown, indistinguishable from Superset's original features. A dirty Webpack configuration job, but of invaluable architectural value.`,
    tags: ["Superset", "TypeScript", "React", "Data Visualization"],
    readingTime: 3,
    published: true,
    category: "Development",
  },
  {
    title: "Power Meter Data: Ultimate Guide to FTP, NP and TSS",
    slug: "power-meter-data-ftp-np-tss-guide",
    date: "2026-08-10",
    excerpt: "How to read and interpret your power meter data to structure scientific and measurable training.",
    content: `![Power Meter Data Analysis](/assets/blog/power-meter-data-ftp-np-tss-guide/images/cover.png)

## Beyond Heart Rate

For decades, cyclists relied on heart rate monitors. But the heart lies: it is affected by heat, stress, caffeine, and sleep. Power on the pedals, measured in Watts, is an objective and undeniable data point. 

Measuring power is useless if you don't know how to read the three fundamental metrics.

> [!IMPORTANT]
> Before using these metrics, you must perform an FTP (Functional Threshold Power) test, typically a 20-minute maximal test, to calculate your threshold Watts.

## The Three Key Metrics

| Metric | Acronym | Meaning | Practical Use |
|---|---|---|---|
| **Functional Threshold Power** | FTP | The maximum sustainable power for about 1 hour. | Baseline parameter to calculate training zones (Z1-Z7). |
| **Normalized Power** | NP | Estimate of the power you would have maintained if the effort were perfectly steady. | Evaluates the real metabolic cost of races with many sprints (e.g., criteriums). |
| **Training Stress Score** | TSS | Score quantifying the total workload of the session. | A TSS of 100 is equivalent to 1 hour riding all-out at your FTP. Used to program recovery. |

## How to Avoid Overtraining

Many amateurs only look at Average Power. This is a fatal mistake on hilly routes. Always use *Normalized Power* to understand how tired you really are. If your weekly TSS exceeds 700 without an adequate base, you are entering the overtraining zone.
`,
    tags: ["Training", "Power Meter", "Data Analysis", "Cycling"],
    readingTime: 5,
    published: true,
    category: "Cycling",
  },
  {
    title: "Clinchers vs Tubeless: The Ultimate Test (Pros and Cons)",
    slug: "clincher-vs-tubeless-road-cycling-test",
    date: "2026-08-09",
    excerpt: "Technical analysis of tire systems for road bikes: the convenience of clinchers or the puncture resistance of tubeless?",
    content: `![Clincher vs Tubeless](/assets/blog/clincher-vs-tubeless-road-cycling-test/images/cover.png)

## The End of the Inner Tube?

The road cycling world is slowly abandoning the inner tube in favor of Tubeless systems, inherited from MTB. But for the average amateur, is the juice worth the squeeze?

## Comparison Table

We tested both systems over 5000 km of mixed roads. Here is the technical verdict:

| Feature | Clincher + Butyl Tube | Tubeless + Sealant |
|---|---|---|
| **Rolling Resistance** | Good | **Excellent** (Less internal friction) |
| **Operating Pressure** | High (7-8 bar) | Low (5-6 bar) = **Superior Comfort** |
| **Puncture Resistance** | Low (Risk of pinch flats) | **Very High** (The liquid seals holes < 3mm) |
| **Maintenance and Installation** | **Very Easy** | Complex (Often requires a compressor) |

> [!WARNING]
> The sealant liquid in Tubeless tires tends to dry out. It must be topped up or checked every 3-4 months, especially in very hot summer months.

## Which to Choose?

If you race, ride Gran Fondos, or epic tours far from home, **Tubeless** saves your life, closing micro-punctures on the fly without making you dismount. 
If you use the bike occasionally and want zero mechanical maintenance hassle, the old **clincher** with a good latex or TPU inner tube remains the most pragmatic choice.
`,
    tags: ["Gear", "Tires", "Mechanics", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "The Impact of Aerodynamics in Amateur Cycling",
    slug: "aerodynamics-impact-amateur-cycling",
    date: "2026-08-08",
    excerpt: "Does it really matter to buy an aero bike if you travel at 28 km/h? Let's analyze the physical data of air resistance.",
    content: `![Aerodynamic Cycling Position](/assets/blog/aerodynamics-impact-amateur-cycling/images/cover.png)

## The Wall of Air

Beyond 15 km/h, the predominant force a cyclist must defeat is not gravity or mechanical friction, but aerodynamic resistance (drag). Many amateurs spend thousands of euros on aero frames, but forget that the bicycle is only a fraction of the problem.

## Who Generates the Resistance?

| Component | Percentage of Total Aerodynamic Resistance (Drag) |
|---|---|
| **Cyclist's Body** | **~80%** |
| Bicycle Frame | ~8% |
| Wheels | ~8% |
| Helmet and Clothing | ~4% |

> [!TIP]
> Spending 3000€ on an "Aero" frame saves fewer Watts than lowering your torso, bending your elbows to 90 degrees, and wearing a tight jersey.

## Does it matter at low speeds?

There is a false myth that aerodynamics only matters if you are a pro traveling at 45 km/h. Physical reality (the drag equation) says that the power required to overcome air increases with the *cube* of speed.
However, even at **28 km/h**, 80% of your effort is used to move air. A slower cyclist will spend *more time* on the course exposed to the wind, so the total time savings (in minutes) with an aero setup is often **greater** for the amateur than for the professional!
`,
    tags: ["Aerodynamics", "Physics", "Gear", "Cycling"],
    readingTime: 6,
    published: true,
    category: "Cycling",
  },
  {
    title: "Strava Data Analysis: From Dashboard to Python",
    slug: "strava-data-analysis-python-pandas",
    date: "2026-08-07",
    excerpt: "How to export your Strava GDPR archive and use Pandas to create custom insights on your training.",
    content: `![Strava Data Analysis Python](/assets/blog/strava-data-analysis-python-pandas/images/cover.png)

## Freeing Your Data

Strava offers a great dashboard, but if you want to do a deep and non-standard analysis (e.g., correlating your PRs on climbs with hours of sleep or outside temperature), you need to export your data and analyze it with Python.

## Exporting the Archive

Go to *Settings -> My Account -> Get Started (Download or delete your account)* and request the full data package. After a few hours, you will receive a ZIP containing the \`activities.csv\` file.

> [!NOTE]
> The \`activities.csv\` file contains hundreds of columns, including max speed, cumulative elevation gain, Suffer Score, and basic weather data.

## Data Cleaning with Pandas

Importing into Pandas requires converting distances and times, which Strava often saves in meters and seconds:

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv('activities.csv')

# Filter only road bike rides
rides = df[df['Activity Type'] == 'Ride'].copy()

# Conversions (Meters -> Km)
rides['Distance_km'] = rides['Distance'] / 1000
rides['Elevation_Gain_m'] = rides['Elevation Gain']

# Calculate approximate VAM (Average Ascent Speed)
rides['VAM'] = rides['Elevation_Gain_m'] / (rides['Moving Time'] / 3600)
\`\`\`

With these few scripts, you can create custom Heatmaps or statistically understand in which month of the year you reach your peak form (e.g., calculating the average monthly VAM).
`,
    tags: ["Strava", "Python", "Data Science", "Cycling"],
    readingTime: 5,
    published: true,
    category: "Cycling",
  },
  {
    title: "Garmin vs Wahoo: How to Choose Your First GPS Bike Computer",
    slug: "garmin-vs-wahoo-first-gps-bike-computer",
    date: "2026-08-06",
    excerpt: "Direct comparison between the two giants of the bike GPS ecosystem: features, reliability, and user experience.",
    content: `![Garmin Edge and Wahoo Elemnt](/assets/blog/garmin-vs-wahoo-first-gps-bike-computer/images/cover.png)

## The Command Center

Replacing the old magnet odometer with a modern GPS is the first step to taking cycling seriously. Garmin (Edge series) and Wahoo (ELEMNT series) dominate the market, but have two diametrically opposed philosophies.

## Approaches Compared

| Feature | Garmin (e.g., Edge 540/840) | Wahoo (e.g., ELEMNT Bolt v2) |
|---|---|---|
| **Configuration** | Device-centric (do everything from the screen) | App-centric (set everything from smartphone) |
| **Maps and Navigation** | Very detailed, superb recalculation | Minimalist, high contrast, perfect for following the track |
| **Data Ecosystem** | Garmin Connect (a universe of data and metrics) | Very lean, oriented to direct sync with Strava/TrainingPeaks |
| **Buttons vs Touch** | Excellent touchscreen on higher models | Physical buttons only (foolproof with winter gloves) |

> [!TIP]
> If you are a data nerd who loves getting lost in Firstbeat charts (VO2Max, Recovery Time, etc.), **Garmin** is the mandatory choice.

## The Verdict

Choose **Wahoo** if you want a "set-and-forget" device: you turn it on, load the route, pedal, it never crashes, and the screen is readable in glaring sun without distractions.
Choose **Garmin** if you like exploring, making route changes on the fly using POI (Points of Interest) on the display, or if you already have a Garmin smartwatch to sync your entire training load (Body Battery).
`,
    tags: ["GPS", "Gear", "Tech", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Chain Replacement: Wear, Measurement and False Myths",
    slug: "bicycle-chain-wear-replacement-guide",
    date: "2026-08-05",
    excerpt: "Everything you need to know about chain wear, when to replace it, and why elongation destroys your drivetrain.",
    content: `![Bicycle Chain Measurement](/assets/blog/bicycle-chain-wear-replacement-guide/images/cover.png)

## The Silent Killer of the Drivetrain

The bicycle chain does not "stretch" because the metal deforms under the power of your legs. It stretches because the tiny inner rollers wear out due to friction and dirt, increasing the distance between links.

If you keep pedaling with a chain worn past its limit, the misaligned rollers will start grinding the teeth of your cassette and chainrings to match the new length.

> [!WARNING]
> Changing a chain costs 30€. Changing a worn cassette and two chainrings costs over 250€. Do not ignore chain wear!

## How to Measure Wear

The only truly reliable tool is the **chain checker**. Insert it between the links:

| Tolerance (Elongation) | Recommended Action |
|---|---|
| **< 0.5%** | Perfect, keep riding and lubricating. |
| **0.5% - 0.75%** | Replace the chain immediately. The cassette is still safe. |
| **> 0.75%** | Too late. If you put a new chain on now, it will skip on the old cogs. You must change the cassette too. |

Avoid false myths: never wash the chain with aggressive degreasers (like standard WD-40 or gasoline) soaking them for hours, because they remove the factory grease inside the rollers, drastically shortening chain life. Use specific biodegradable degreasers and always re-lubricate.
`,
    tags: ["Mechanics", "Maintenance", "Gear", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Bike Fitting: Why Millimeters Make the Difference in the Saddle",
    slug: "bike-fitting-importance-millimeters",
    date: "2026-08-04",
    excerpt: "Saddle too high or cleats misplaced? Discover how a biomechanical fit prevents injuries and increases Watts.",
    content: `![Bike Fitting Process](/assets/blog/bike-fitting-importance-millimeters/images/cover.png)

## The Perfect Machine, the Human Engine

The bicycle is a symmetrical machine. The human body almost never is. We have one leg imperceptibly longer than the other, rotated pelvises, and asymmetrical flexibility. **Bike Fitting** is the science of adapting the machine to the body, not vice versa.

Many cyclists focus on reducing the weight of the bike, ignoring that a saddle 5 millimeters too high wastes more energy than an ultra-light carbon frame saves, besides causing knee tendinitis.

## The 3 Points of Contact

Fitting focuses on the three interface points between man and machine:

| Contact Point | Crucial Adjustment | Typical Problem if Incorrect |
|---|---|---|
| **Saddle** | Height, setback, tilt | Lower back pain, genital numbness, patellar tendinitis |
| **Handlebar** | Reach, Drop | Neck pain, hand numbness |
| **Pedals / Cleats** | Fore-aft position, rotation, float | Iliotibial band syndrome, foot pain |

> [!TIP]
> If you suffer from numbness in your hands or feet after 2 hours in the saddle, don't buy thicker gloves or wider shoes. Get a professional biomechanical bike fitting.

Modern fitting uses high-frequency cameras (3D motion capture) to measure dynamic joint angles under strain. It is the best investment (around 150-200€) a cyclist can make for their own comfort and performance.
`,
    tags: ["Biomechanics", "Health", "Performance", "Cycling"],
    readingTime: 5,
    published: true,
    category: "Cycling",
  },
  {
    title: "Polarized Training (80/20): The Science for Gran Fondos",
    slug: "polarized-training-80-20-cycling-science",
    date: "2026-08-03",
    excerpt: "Why training at medium intensity all the time makes you slow. Discover the polarized approach used by pros.",
    content: `![Polarized Training Zones](/assets/blog/polarized-training-80-20-cycling-science/images/cover.png)

## The Black Hole of Intensity

The typical amateur goes out for a ride and always does the same thing: pedals "pretty hard". In jargon, this means spending 80% of the time in Zone 3 (Tempo/Sweet Spot). You feel tired at the end of the ride, but physiologically you are in a "black hole": too intense to develop aerobic base and burn fat, too mild to stimulate VO2Max.

The result? An eternal performance plateau.

## The Polarized Approach (Stephen Seiler)

Physiological research has shown that endurance pros train in a **Polarized** way:

| Intensity | Time Percentage | Physiological Goal |
|---|---|---|
| **Low (Z1-Z2)** | **80%** | Mitochondrial increase, capillarization, fat oxidation |
| **Medium (Z3-Z4)** | **0-5%** | (Zone to avoid in base training, used only near races) |
| **Very High (Z5+)** | **15-20%** | VO2Max increase, lactate tolerance |

> [!IMPORTANT]
> "Go slow to go fast". 80% of your weekly volume must be so easy that you can breathe through your nose or speak fluently. 

If you do 10 hours a week, 8 hours must be aerobic walks. The remaining 2 hours must be intervals so devastating they make you nauseous. This sharp separation allows the body to recover during easy days and absorb extreme stress on hard days.
`,
    tags: ["Training", "Science", "Endurance", "Cycling"],
    readingTime: 6,
    published: true,
    category: "Cycling",
  },
  {
    title: "Nutrition in the Saddle: Anti-Bonking Strategies",
    slug: "cycling-nutrition-anti-bonking-strategies",
    date: "2026-08-02",
    excerpt: "The biochemistry of hitting the wall and mathematical calculations for carbohydrate intake during long bike rides.",
    content: `![Cycling Nutrition Bars and Gels](/assets/blog/cycling-nutrition-anti-bonking-strategies/images/cover.png)

## What Really is the Bonk?

In Italian they call it "crisi di fame", in English "bonking" or "hitting the wall". It's not simple fatigue: it's the total depletion of glycogen (sugar) stores in muscles and liver. When you run out of glycogen, the body is forced to burn only fat, a very slow biochemical process. The result? A vertical drop in power. You can't exceed 15 km/h anymore.

## The Math of Carbohydrates

Your body can only store about 2000 kcal in the form of glycogen (enough for 90-120 minutes at high intensity). If your ride lasts longer, you must fuel **during** the effort.

| Ride Duration | Carbohydrate Requirement | Recommended Sources |
|---|---|---|
| **< 1 hour** | None (water only) | - |
| **1 - 2 hours** | 30g per hour | Bottle with maltodextrin or half a bar |
| **2 - 4 hours** | 60g per hour | 1 Gel + Half isotonic bottle per hour |
| **> 4 hours (Race)** | 90-120g per hour | Glucose:Fructose Mix (1:0.8 ratio) |

> [!TIP]
> The human body struggles to absorb more than 60g of glucose per hour due to the saturation of intestinal transporters (SGLT1). To reach 90g+, pros use specific mixes that include fructose (which uses another transporter, GLUT5).

Train to eat. Your gut must be "trained" to digest 90g of sugar per hour just as you train your legs. Don't try new bars or gels on race day!
`,
    tags: ["Nutrition", "Endurance", "Health", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Tire Pressure: Rolling Resistance vs Comfort",
    slug: "cycling-tire-pressure-rolling-resistance-comfort",
    date: "2026-08-01",
    excerpt: "Why inflating clinchers to 8 bar makes you slower. The new science of tire pressure in cycling.",
    content: `![Bicycle Tire Pressure Gauge](/assets/blog/cycling-tire-pressure-rolling-resistance-comfort/images/cover.png)

## The Myth of 8 Bar (120 PSI)

For decades, cyclists pumped their ultra-thin 23mm tires to frightening pressures, convinced that "the harder, the faster". On a perfectly smooth wooden velodrome, physics confirms this theory. 

But real-world roads are full of cracks, rough asphalt, and potholes.

## Impedance Losses

When a tire is inflated to 8 bar, it's a rock. Every time it hits a small asphalt imperfection, the bicycle (and your body) are pushed upwards. This micro-bounce dissipates forward energy by transforming it into vertical energy. In physics, this is called *impedance*.

If the pressure is lower instead (e.g., 5.5 bar on a 28mm tire), the tire deforms, absorbing the obstacle. The bike continues to move forward in a straight line without bouncing.

| Pressure / Width | Surface | Efficiency (Rolling Resistance) | Comfort |
|---|---|---|---|
| **23mm at 8.0 Bar** | Smooth track | Excellent | Terrible |
| **23mm at 8.0 Bar** | Rough asphalt | **Terrible (High impedance losses)** | Terrible |
| **28mm at 5.5 Bar** | Rough asphalt | **Excellent (Absorbs vibrations)** | Superior |

> [!NOTE]
> To find the perfect pressure, you must calculate it based on total weight (cyclist + bike) and internal rim width. Online tools like the *SRAM Tire Pressure Calculator* use empirical algorithms to give you the magic number.

Embrace comfort: wider tires at lower pressures are mathematically faster in the real world.
`,
    tags: ["Physics", "Tires", "Mechanics", "Cycling"],
    readingTime: 5,
    published: true,
    category: "Cycling",
  },
  {
    title: "Gravel vs Road Bike: Geometry Analysis",
    slug: "gravel-vs-road-bike-geometry-analysis",
    date: "2026-07-30",
    excerpt: "It's not just wider tires. Let's find out how trail, reach, and wheelbase radically change the bike's handling.",
    content: `![Gravel and Road Bike Comparison](/assets/blog/gravel-vs-road-bike-geometry-analysis/images/cover.png)

## The "They Do the Same Thing" Illusion

At first glance, a gravel bike looks like a road bike with knobby tires. Many think that mounting 30mm tires on a gravel bike gets you a pure road bike. But the engineering reality is very different, and it's all hidden in the frame numbers.

## The Numbers That Matter

| Measurement | Road Bike | Gravel Bike | Practical Effect |
|---|---|---|---|
| **Wheelbase** | Short (~990mm) | Long (~1030mm) | Gravel is much more stable downhill and off-road, but less responsive in sprints. |
| **Head Angle** | Steep (73-74°) | Slack (70-71°) | A slack steering angle makes the gravel less twitchy and more predictable over obstacles. |
| **Bottom Bracket** | High | Low (More Drop) | A lower center of gravity increases cornering stability. |

> [!NOTE]
> **Trail** (the distance between the wheel contact patch and the steering axis) is the real secret. High trail on a gravel bike prevents the wheel from suddenly "tucking" in mud or gravel.

If you are looking for the adrenaline of a 50 km/h sprint or twitchy accelerations on climbs, the road bike remains unbeatable. If you seek adventure, comfort, and the ability to get lost in the woods without risking your life at every turn, the relaxed geometry of a gravel bike is perfect.
`,
    tags: ["Gravel", "Geometry", "Tech", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Ceramic Bearings (Oversized): Real Advantage or Pure Marketing?",
    slug: "ceramic-bearings-oversized-pulley-wheels-marketing",
    date: "2026-07-29",
    excerpt: "Does spending 500€ for an oversized derailleur cage save watts or just get Instagram likes? Mechanical analysis.",
    content: `![Ceramic Oversized Pulley Wheels](/assets/blog/ceramic-bearings-oversized-pulley-wheels-marketing/images/cover.png)

## The Era of Marginal Gains

Since Team Sky introduced the concept of *Marginal Gains*, the cycling industry started selling very expensive upgrades to save fractions of a Watt. One of the most popular (and flashy) is the OSPW (Oversized Pulley Wheel System) with ceramic bearings.

## The Physics Behind Giant Pulleys

The theoretical idea is solid: a larger pulley forces the chain to bend less. Less bending = less friction between links = Watts saved. Furthermore, spherical ceramic bearings rotate with less resistance than steel ones.

But how many Watts are we saving?

| Component | Estimated Savings (at 250W) | Average Cost | Euro/Watt Ratio |
|---|---|---|---|
| **Clean and Lubricated Chain (Wax)** | ~3 - 5 Watts | 20€ | **4€ / Watt** (Best investment) |
| **Oversized Pulleys + Ceramic** | ~1 - 2 Watts | 300€ - 500€ | **250€ / Watt** (Terrible investment) |

> [!WARNING]
> Ceramic bearings require *much* more maintenance than steel ones. If they get dirty and are not cleaned/greased frequently, the friction quickly exceeds that of standard components.

Leave OSPW to sponsored pros. Clean your chain and learn to hot-wax it. It's the cheapest way to buy speed.
`,
    tags: ["Gear", "Mechanics", "Tech", "Cycling"],
    readingTime: 3,
    published: true,
    category: "Cycling",
  },
  {
    title: "Indoor Trainer vs Outdoor: Surviving Winter",
    slug: "indoor-trainer-zwift-vs-outdoor-winter-training",
    date: "2026-07-28",
    excerpt: "Smart trainers and virtual platforms like Zwift have revolutionized winter training. When to stay indoors and when to go out.",
    content: `![Indoor Smart Trainer Zwift](/assets/blog/indoor-trainer-zwift-vs-outdoor-winter-training/images/cover.png)

## The End of the "Base" Myth

In the past, cyclists would dress up like Eskimos and pedal for 5 hours at 20 km/h in freezing January to "build the base". Today, thanks to Smart Trainers (direct drive smart rollers) and platforms like Zwift or TrainerRoad, winter is the time when you actually get faster.

## Indoor Quality vs Outdoor Quantity

Indoor training is extremely dense. 1 hour on the trainer equals about 1 hour and 15 minutes outdoors, because you never stop pedaling: no traffic lights, no descents, no freewheeling.

| Type of Workout | Indoor (Trainer) | Outdoor |
|---|---|---|
| **VO2Max Intervals (Short/Hard)** | **Perfect** (Total control, no traffic) | Dangerous (You need long, uninterrupted roads) |
| **Sweet Spot (20-30 min)** | Excellent | Good (Requires a steady climb) |
| **Endurance / Z2 (> 3 hours)** | Mentally devastating | **Ideal** (Fresh air, changing scenery) |

> [!TIP]
> Heat is your worst enemy indoors. Without the wind from riding outside, your core temperature rises rapidly, degrading performance and increasing heart rate. Buy a very powerful industrial fan!

A hybrid approach is the modern winner: use the smart trainer on weekdays for surgical 60-90 minute intervals, and save the long endurance ride for Sunday morning with your friends outdoors.
`,
    tags: ["Indoor Training", "Zwift", "Fitness", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Pedal Stroke Biomechanics: Push vs Pull",
    slug: "pedal-stroke-biomechanics-efficiency",
    date: "2026-07-27",
    excerpt: "Should you pull up on the pedals? The scientific truth about the perfect pedal stroke and pedaling efficiency.",
    content: `![Pedal Stroke Biomechanics](/assets/blog/pedal-stroke-biomechanics-efficiency/images/cover.png)

## The Myth of the Circular Pedal Stroke

Generations of cyclists have been taught the concept of "circular pedaling": pushing down with power, scraping mud off the shoe at the bottom, and pulling up forcefully on the upstroke.

Biomechanical science and power meters with advanced pedaling dynamics have completely dismantled this myth.

## What Elite Cyclists Actually Do

Studies on World Tour professionals show that the best riders in the world **do not pull up** on the pedal.

- **The Downstroke (12 to 5 o'clock):** This is where 95% of the power is generated. The gluteus maximus and quadriceps deliver massive force.
- **The Upstroke (6 to 12 o'clock):** The goal here is not to generate power to pull the pedal up, but simply to *unweight* the leg. If you leave the dead weight of your leg on the rising pedal, your other pushing leg will have to lift it, wasting Watts.

> [!WARNING]
> Actively pulling up on the pedal using the hip flexors (psoas) is extremely metabolically inefficient and is a fast track to tendinitis.

Focus on a powerful, fluid push downward, and simply "lift" the returning foot out of the way. Pedaling efficiently means reducing negative resistance, not creating unnatural positive power on the upstroke.
`,
    tags: ["Biomechanics", "Science", "Training", "Cycling"],
    readingTime: 4,
    published: true,
    category: "Cycling",
  },
  {
    title: "Group Cycling: Unwritten Rules and Safety",
    slug: "group-cycling-unwritten-rules-safety",
    date: "2026-07-26",
    excerpt: "How to ride safely in a peloton. Echelons, pacelines, and the gestures you absolutely must know.",
    content: `![Group Cycling Peloton](/assets/blog/group-cycling-unwritten-rules-safety/images/cover.png)

## The Art of the Peloton

Riding in a group is what makes cycling a team sport even for amateurs. You save up to 40% of energy by drafting, but it requires extreme trust and a specific code of conduct. If you brake suddenly without warning, you cause a massive pile-up.

## Essential Gestures and Calls

When you are at the front of the group, you are the eyes for the 20 people behind you who can only see your rear wheel.

| Gesture | Meaning | Action to Take |
|---|---|---|
| **Pointing down (Right or Left)** | Pothole, glass, or obstacle on that side | Point it out to the rider behind you and steer smoothly |
| **Hand waving behind back** | Obstacle on the side, move over | Move in the direction indicated |
| **Raised hand** | Stopping or slowing down | Stop pedaling, be ready to brake |
| **Flicking the elbow** | I'm done pulling, coming through | The front rider moves aside, the next rider takes the wind |

> [!IMPORTANT]
> Never "half-wheel". Do not ride slightly ahead of the person next to you in a double paceline. It forces the pace up continuously and breaks the harmony of the group.

Keep your eyes up. Don't stare at the rear derailleur of the rider in front of you; look at their shoulders or through them to anticipate the flow of the group. Safety is always a collective responsibility.
`,
    tags: ["Safety", "Culture", "Skills", "Cycling"],
    readingTime: 3,
    published: true,
    category: "Cycling",
  }
];
