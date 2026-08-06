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
    <div style={{ animation: "pageFadeIn 0.6s ease both" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Expertise Section */}
      <section
        id="expertise"
        className="section-entrance"
        style={{
          padding: "80px 5% 100px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
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

        {/* Expertise Grid */}
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
    </div>
  );
}
