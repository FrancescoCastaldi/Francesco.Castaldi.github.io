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
      subtitle: "Computer Engineer & Business Consultant",
      description: "Architetture Cloud, Data Science e IT Sanitario. Progetto sistemi resilienti e soluzioni data-driven per il futuro.",
      ctaPrimary: "Scopri il mio lavoro",
      ctaSecondary: "Contattami"
    },
    expertise: {
      title: "Core Expertise",
      healthcare: {
        title: "Healthcare IT",
        desc: "Sistemi informativi ospedalieri, HL7 FHIR, ICD-10 e conformità GDPR per la sanità digitale."
      },
      dataScience: {
        title: "Data Science",
        desc: "Python, SQL Server, Apache Superset e Power BI per trasformare dati in decisioni strategiche."
      },
      cloud: {
        title: "Cloud Architecture",
        desc: "Azure Data Factory, Delta Lake e Data Lakehouse per architetture scalabili e moderne."
      },
      ai: {
        title: "AI Prompt Engineering",
        desc: "Automazione e workflow basati su LLM (GPT-4, Claude) per ottimizzare i processi."
      },
      security: {
        title: "Cybersecurity",
        desc: "Conformità NIS2, architetture Zero Trust e gestione identità (IAM)."
      },
      cycling: {
        title: "Cycling Analytics",
        desc: "Analisi dati Strava API, GPX e tracking FTP per l'ottimizzazione delle performance sportive."
      }
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
      subtitle: "Computer Engineer & Business Consultant",
      description: "Cloud Architecture, Data Science, and Healthcare IT. I design resilient systems and data-driven solutions for the future.",
      ctaPrimary: "View My Work",
      ctaSecondary: "Get in Touch"
    },
    expertise: {
      title: "Core Expertise",
      healthcare: {
        title: "Healthcare IT",
        desc: "Hospital information systems, HL7 FHIR, ICD-10, and GDPR compliance for digital health."
      },
      dataScience: {
        title: "Data Science",
        desc: "Python, SQL Server, Apache Superset, and Power BI to turn data into strategic decisions."
      },
      cloud: {
        title: "Cloud Architecture",
        desc: "Azure Data Factory, Delta Lake, and Data Lakehouse for scalable modern architectures."
      },
      ai: {
        title: "AI Prompt Engineering",
        desc: "LLM-based automation and workflows (GPT-4, Claude) to optimize business processes."
      },
      security: {
        title: "Cybersecurity",
        desc: "NIS2 compliance, Zero Trust architectures, and Identity Access Management (IAM)."
      },
      cycling: {
        title: "Cycling Analytics",
        desc: "Strava API data analysis, GPX, and FTP tracking for sports performance optimization."
      }
    },
    footer: {
      rights: "All rights reserved."
    }
  }
};

export type Language = "it" | "en";
export type Translations = typeof translations.it;
