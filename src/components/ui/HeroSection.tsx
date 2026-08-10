"use client";
import Link from "next/link";
export default function HeroSection() {

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
        borderBottom: "1px solid var(--color-space-surface)",
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
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(42px, 7vw, 80px)",
              color: "var(--color-text-primary)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Francesco<br />
            <span style={{
              color: "var(--color-accent-primary)",
            }}>
              Castaldi
            </span>
          </h1>

          {/* Title */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: "var(--color-accent-secondary)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 24,
              marginBottom: 16,
              borderLeft: "2px solid var(--color-accent-secondary)",
              paddingLeft: "12px",
            }}
          >
            Software Engineer & Data Scientist
          </p>

          {/* Tagline */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--color-text-body)",
              margin: 0,
              maxWidth: 520,
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Building intelligent systems at the intersection of robust backend engineering and machine learning.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-entrance"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#expertise"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "var(--color-space-void)",
                background: "var(--color-accent-primary)",
                padding: "12px 24px",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                border: "1px solid var(--color-accent-primary)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-space-void)";
                e.currentTarget.style.color = "var(--color-accent-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-accent-primary)";
                e.currentTarget.style.color = "var(--color-space-void)";
              }}
            >
              [ View My Work ]
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "var(--color-accent-secondary)",
                background: "transparent",
                padding: "12px 24px",
                textDecoration: "none",
                transition: "all 0.2s",
                border: "1px solid var(--color-accent-secondary)",
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = "var(--color-accent-secondary)"; 
                e.currentTarget.style.color = "var(--color-space-void)"; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = "transparent"; 
                e.currentTarget.style.color = "var(--color-accent-secondary)"; 
              }}
            >
              [ Get In Touch ]
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
              borderRadius: "0",
              border: "1px solid var(--color-accent-secondary)",
              opacity: 0.8,
              filter: "grayscale(100%) contrast(120%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
