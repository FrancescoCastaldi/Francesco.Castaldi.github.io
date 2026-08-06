"use client";
import HeroSection from "@/components/ui/HeroSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const expertiseItems = [
    { id: "healthcare", data: t.expertise.healthcare, color: "#F59E0B" },
    { id: "dataScience", data: t.expertise.dataScience, color: "#22D3EE" },
    { id: "cloud", data: t.expertise.cloud, color: "#A78BFA" },
    { id: "ai", data: t.expertise.ai, color: "#FB7185" },
    { id: "security", data: t.expertise.security, color: "#34D399" },
    { id: "cycling", data: t.expertise.cycling, color: "#E2E8F0" },
  ];

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 60 }}>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="section-entrance"
        style={{
          padding: "80px 5% 40px",
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: "#A78BFA",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 12,
          }}
        >
          {t.nav.about}
        </span>
        <h2
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 400,
            color: "#E7EDF5",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {t.about.title}
        </h2>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 16,
            color: "#9BA9BB",
            lineHeight: 1.8,
            maxWidth: 800,
            margin: "0 auto"
          }}
        >
          {t.about.description}
        </p>
      </section>

      {/* Expertise Section */}
      <section
        id="expertise"
        className="section-entrance"
        style={{
          padding: "80px 5% 60px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "#22D3EE",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            {t.nav.expertise}
          </span>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "#E7EDF5",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {t.expertise.title}
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, #22D3EE, transparent)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {expertiseItems.map((item, i) => (
            <div
              key={item.id}
              style={{
                background: "#0C111A",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: 24,
                animation: "sectionFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: `${0.1 + i * 0.08}s`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#131B27";
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0C111A";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 
                style={{ 
                  color: item.color, 
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  marginBottom: 12
                }}
              >
                {item.data.title}
              </h3>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 15,
                  color: "#9BA9BB",
                  lineHeight: 1.6,
                }}
              >
                {item.data.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="section-entrance"
        style={{
          padding: "60px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "#F59E0B",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            {t.nav.projects}
          </span>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "#E7EDF5",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {t.projects.title}
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, #F59E0B, transparent)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {t.projects.items.map((project, i) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              style={{
                display: "block",
                textDecoration: "none",
                background: "linear-gradient(180deg, #131B27 0%, #0C111A 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: 28,
                animation: "sectionFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: `${0.1 + i * 0.08}s`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.4)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 
                style={{ 
                  color: "#E7EDF5", 
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: 22,
                  marginBottom: 12
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 14,
                  color: "#9BA9BB",
                  lineHeight: 1.6,
                  marginBottom: 20
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      color: "#F59E0B",
                      background: "rgba(245, 158, 11, 0.1)",
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-entrance"
        style={{
          padding: "80px 5% 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: "#34D399",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 12,
          }}
        >
          {t.nav.contact}
        </span>
        <h2
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 400,
            color: "#E7EDF5",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {t.contact.title}
        </h2>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 16,
            color: "#9BA9BB",
            lineHeight: 1.8,
            marginBottom: 40
          }}
        >
          {t.contact.description}
        </p>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={`mailto:${t.contact.email}`}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: "#06080C",
              background: "#34D399",
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#10B981")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34D399")}
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: "#34D399",
              background: "transparent",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(52, 211, 153, 0.1)"; e.currentTarget.style.borderColor = "#34D399"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(52, 211, 153, 0.3)"; }}
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
