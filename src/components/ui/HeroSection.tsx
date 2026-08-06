"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        padding: "120px 5% 80px",
        overflow: "hidden",
      }}
    >
      {/* Subtle animated background */}
      <div className="hero-bg" aria-hidden="true" />

      {/* Content Container */}
      <div 
        style={{ 
          position: "relative", 
          zIndex: 2, 
          display: "flex", 
          flexDirection: "row", 
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          gap: "40px"
        }}
      >
        {/* Left Side: Text */}
        <div style={{ flex: "1 1 500px" }}>
          {/* Name */}
          <h1
            className="hero-entrance"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(42px, 7vw, 80px)",
              color: "#E7EDF5",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Francesco<br />
            <span style={{
              color: "#F59E0B",
              textDecoration: "underline",
              textDecorationColor: "rgba(245, 158, 11, 0.3)",
              textUnderlineOffset: "0.15em",
              textDecorationThickness: 2,
            }}>
              Castaldi
            </span>
          </h1>

          {/* Title */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              color: "#22D3EE",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* Tagline */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "#9BA9BB",
              margin: 0,
              maxWidth: 520,
              lineHeight: 1.4,
            }}
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-entrance"
            style={{
              display: "flex",
              gap: 14,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#expertise"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: "#06080C",
                background: "#F59E0B",
                padding: "10px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "background 0.2s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FBBF24")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F59E0B")}
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: "#22D3EE",
                background: "transparent",
                padding: "10px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "all 0.2s",
                border: "1px solid rgba(34, 211, 238, 0.3)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34, 211, 238, 0.1)"; e.currentTarget.style.borderColor = "#22D3EE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.3)"; }}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right Side: Generated Image */}
        <div 
          className="hero-entrance" 
          style={{ 
            flex: "1 1 400px", 
            display: "flex", 
            justifyContent: "center",
            animationDelay: "0.6s"
          }}
        >
          <img 
            src="/assets/img/hero/hero-bg.png" 
            alt="Abstract Tech Representation" 
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 24px 48px -12px rgba(34, 211, 238, 0.2), 0 0 24px rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              opacity: 0.9,
              mixBlendMode: "lighten"
            }}
          />
        </div>
      </div>
    </div>
  );
}
