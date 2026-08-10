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
              fontFamily: 'var(--font-serif)',
              fontSize: "clamp(42px, 7vw, 80px)",
              color: "var(--color-text-primary)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Francesco<br />
            <span style={{
              color: "var(--color-accent-primary)",
              textDecoration: "underline",
              textDecorationColor: "var(--color-accent-secondary)",
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
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: "var(--color-accent-secondary)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            Software Engineer & Data Scientist
          </p>

          {/* Tagline */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "var(--color-text-body)",
              margin: 0,
              maxWidth: 520,
              lineHeight: 1.4,
            }}
          >
            Building intelligent systems at the intersection of robust backend engineering and machine learning.
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
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-space-void)",
                background: "var(--color-accent-primary)",
                padding: "10px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "background 0.2s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent-primary)")}
            >
              View My Work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-accent-secondary)",
                background: "transparent",
                padding: "10px 24px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "all 0.2s",
                border: "1px solid var(--color-accent-secondary)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-soft)"; e.currentTarget.style.borderColor = "var(--color-accent-secondary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--color-accent-secondary)"; }}
            >
              Get In Touch
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
              boxShadow: "0 24px 48px -12px rgba(203, 213, 225, 0.1), 0 0 24px rgba(203, 213, 225, 0.05)",
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
