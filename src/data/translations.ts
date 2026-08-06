export const translations = {
  it: {
    nav: {
      about: "Chi sono",
      expertise: "Competenze",
      projects: "Progetti",
      contact: "Contatti"
    },
    hero: {
      title: "Francesco Castaldi",
      subtitle: "Computer Engineering Student @ UniBo & Developer",
      description: "Appassionato di Data Science, Intelligenza Artificiale e Web Development. Costruisco strumenti analitici, piattaforme web e modelli probabilistici.",
      ctaPrimary: "Scopri i Progetti",
      ctaSecondary: "Contattami"
    },
    about: {
      title: "Chi sono",
      description: "Sono uno studente di Ingegneria Informatica all'Università di Bologna, appassionato di sfide complesse, sviluppo web, dati e design delle interfacce. Nel tempo libero mi dedico al ciclismo, cercando sempre di applicare la mia passione per i dati e l'ottimizzazione anche allo sport (GPX, performance tracking). Su GitHub trovi tutti i miei progetti, dai modelli matematici alle web app."
    },
    expertise: {
      title: "Core Expertise",
      healthcare: {
        title: "Software Engineering",
        desc: "Sviluppo applicazioni web e desktop moderne con React, Next.js, Python, TypeScript e Java."
      },
      dataScience: {
        title: "Data Science & AI",
        desc: "Python, Jupyter Notebook, AI Prompt Engineering, e modelli matematico-statistici."
      },
      cloud: {
        title: "Data Visualization",
        desc: "Creazione di dashboard interattive e plugin per Apache Superset."
      },
      ai: {
        title: "UX/UI Design",
        desc: "Metodologia Double Diamond, wireframing, e prototipazione iterativa orientata all'utente."
      },
      security: {
        title: "Blockchain",
        desc: "Sviluppo di DApp e smart contracts per la tracciabilità e la sicurezza dei dati."
      },
      cycling: {
        title: "Cycling Analytics",
        desc: "Strumenti per l'analisi di file GPX, statistiche di allenamento e telemetria."
      }
    },
    projects: {
      title: "Portfolio Progetti",
      items: [
        {
          id: "trumetrapla",
          slug: "trumetrapla",
          name: "TruMetraPla",
          description: "Dashboard Python per monitorare la produttività nei processi metalmeccanici tramite importazione da Excel e calcolo di KPI.",
          tech: ["Python", "Data Analysis", "Dashboard"],
          link: "https://github.com/FrancescoCastaldi/TruMetraPla"
        },
        {
          id: "superset",
          slug: "superset-calendar-filter",
          name: "Superset Calendar Filter",
          description: "Plugin interattivo per Apache Superset (TypeScript) per il filtraggio avanzato tramite un calendario custom.",
          tech: ["TypeScript", "React", "Apache Superset"],
          link: "https://github.com/FrancescoCastaldi/superset-plugin-chart-calendar-filter"
        },
        {
          id: "hospital",
          slug: "hospital-sanitization-tracker",
          name: "Sanitization Tracker",
          description: "DApp per il tracciamento delle attività di sanificazione ospedaliera tramite tecnologia Blockchain.",
          tech: ["Blockchain", "JavaScript", "Smart Contracts"],
          link: "https://github.com/FrancescoCastaldi/HospitalSanitizationTracker"
        },
        {
          id: "uuxd",
          slug: "tpertutti-ux-redesign",
          name: "TPER Redesign (UX)",
          description: "Progetto accademico di User Experience Design per il sito TPER, con metodologia Double Diamond e prototipazione.",
          tech: ["UX Design", "Figma", "HTML/CSS"],
          link: "https://github.com/FrancescoCastaldi/Esame-UUXD"
        },
        {
          id: "gpx",
          slug: "gpx-editor",
          name: "GPX Power Editor",
          description: "Editor web browser-based, offline, per modificare wattaggio e velocità delle attività ciclistiche in formato GPX.",
          tech: ["JavaScript", "HTML5", "Cycling"],
          link: "https://github.com/FrancescoCastaldi/gpx-editor"
        },
        {
          id: "sir",
          slug: "sir-markov-chain",
          name: "SIR Markov Chain",
          description: "Simulazione del modello epidemiologico SIR utilizzando le catene di Markov a tempo discreto in Python.",
          tech: ["Python", "Probability", "LaTeX"],
          link: "https://github.com/FrancescoCastaldi/sir-markov-chain"
        }
      ]
    },
    contact: {
      title: "Contatti",
      description: "Vuoi collaborare a un progetto o fare due chiacchiere su tecnologia e sport? Scrivimi o connettiti con me su LinkedIn e GitHub.",
      email: "info@francescocastaldi.it"
    },
    footer: {
      rights: "Tutti i diritti riservati."
    }
  },
  en: {
    nav: {
      about: "About",
      expertise: "Expertise",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      title: "Francesco Castaldi",
      subtitle: "Computer Engineering Student @ UniBo & Developer",
      description: "Passionate about Data Science, AI, and Web Development. I build analytical tools, web platforms, and probabilistic models.",
      ctaPrimary: "View Projects",
      ctaSecondary: "Get in Touch"
    },
    about: {
      title: "About Me",
      description: "I am a Computer Engineering student at the University of Bologna with a strong passion for complex challenges, web development, data, and UI/UX design. In my free time, I love cycling and constantly try to apply my passion for data and optimization to sports (GPX editors, performance tracking). On my GitHub, you can find all my projects, from mathematical models to modern web apps."
    },
    expertise: {
      title: "Core Expertise",
      healthcare: {
        title: "Software Engineering",
        desc: "Developing modern web and desktop applications using React, Next.js, Python, TypeScript, and Java."
      },
      dataScience: {
        title: "Data Science & AI",
        desc: "Python, Jupyter Notebooks, AI Prompt Engineering, and mathematical/statistical modeling."
      },
      cloud: {
        title: "Data Visualization",
        desc: "Creating interactive dashboards and custom plugins for Apache Superset."
      },
      ai: {
        title: "UX/UI Design",
        desc: "Double Diamond methodology, wireframing, and user-centered iterative prototyping."
      },
      security: {
        title: "Blockchain",
        desc: "Building DApps and smart contracts for robust data traceability and security."
      },
      cycling: {
        title: "Cycling Analytics",
        desc: "Tools for parsing GPX files, tracking training statistics, and telemetry visualization."
      }
    },
    projects: {
      title: "Project Portfolio",
      items: [
        {
          id: "trumetrapla",
          slug: "trumetrapla",
          name: "TruMetraPla",
          description: "Python dashboard to monitor productivity in metalworking processes by importing Excel data and calculating KPIs.",
          tech: ["Python", "Data Analysis", "Dashboard"],
          link: "https://github.com/FrancescoCastaldi/TruMetraPla"
        },
        {
          id: "superset",
          slug: "superset-calendar-filter",
          name: "Superset Calendar Filter",
          description: "Interactive TypeScript plugin for Apache Superset enabling advanced cross-filtering via a custom calendar chart.",
          tech: ["TypeScript", "React", "Apache Superset"],
          link: "https://github.com/FrancescoCastaldi/superset-plugin-chart-calendar-filter"
        },
        {
          id: "hospital",
          slug: "hospital-sanitization-tracker",
          name: "Sanitization Tracker",
          description: "DApp designed to trace hospital sanitization activities immutably using Blockchain technology.",
          tech: ["Blockchain", "JavaScript", "Smart Contracts"],
          link: "https://github.com/FrancescoCastaldi/HospitalSanitizationTracker"
        },
        {
          id: "uuxd",
          slug: "tpertutti-ux-redesign",
          name: "TPER Redesign (UX)",
          description: "Academic User Experience Design project for the TPER website, featuring Double Diamond research and prototyping.",
          tech: ["UX Design", "Figma", "HTML/CSS"],
          link: "https://github.com/FrancescoCastaldi/Esame-UUXD"
        },
        {
          id: "gpx",
          slug: "gpx-editor",
          name: "GPX Power Editor",
          description: "Browser-based, 100% offline GPX file editor to modify power (watts) and speed metrics of cycling activities.",
          tech: ["JavaScript", "HTML5", "Cycling"],
          link: "https://github.com/FrancescoCastaldi/gpx-editor"
        },
        {
          id: "sir",
          slug: "sir-markov-chain",
          name: "SIR Markov Chain",
          description: "Simulation of the SIR epidemiological model using discrete-time Markov chains in Python.",
          tech: ["Python", "Probability", "LaTeX"],
          link: "https://github.com/FrancescoCastaldi/sir-markov-chain"
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Want to collaborate on a project or chat about technology and sports? Drop me an email or connect with me on LinkedIn and GitHub.",
      email: "info@francescocastaldi.it"
    },
    footer: {
      rights: "All rights reserved."
    }
  }
};

export type Language = "it" | "en";
export type Translations = typeof translations.it;
