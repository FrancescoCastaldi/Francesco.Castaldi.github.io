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
        minHeight: "85vh",
        padding: "130px 5% 70px",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-space-surface)",
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.12), transparent 70%)",
      }}
    >
      {/* Subtle grid pattern background */}
      <div className="hero-bg" aria-hidden="true" />

      {/* Main Container */}
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
        {/* Left Column: Telemetry & Intro */}
        <div style={{ flex: "1 1 550px" }}>
          {/* Status Badge */}
          <div
            className="hero-entrance"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "rgba(22, 27, 34, 0.9)",
              border: "1px solid rgba(249, 115, 22, 0.35)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#86efac",
                boxShadow: "0 0 10px #86efac",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#f97316",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 700,
              }}
            >
              OPEN SOURCE & AUTOMOTIVE SYSTEMS ENGINEER
            </span>
          </div>

          {/* Name & Title */}
          <h1
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(38px, 6vw, 76px)",
              color: "var(--color-text-primary)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Francesco<br />
            <span
              style={{
                background: "linear-gradient(90deg, #f97316 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Castaldi
            </span>
          </h1>

          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "#38bdf8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 20,
              marginBottom: 16,
              borderLeft: "3px solid #f97316",
              paddingLeft: "14px",
            }}
          >
            Computer Engineer, Open Source Contributor & Systems Dev
          </p>

          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              color: "var(--color-text-body)",
              margin: 0,
              maxWidth: 580,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Upstream contributor to enterprise open source platforms (Evidence, Apache Superset, Docker CLI). Building high-performance data systems, 3D WebGL engines, radar nowcasting models, and automotive telematics.
          </p>

          {/* Telemetry Gauge Metrics Bar */}
          <div
            className="hero-entrance"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 12,
              marginTop: 32,
              padding: 16,
              background: "rgba(22, 27, 34, 0.8)",
              border: "1px solid #30363d",
            }}
          >
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                OPEN SOURCE
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#38bdf8" }}>
                Upstream Contrib
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                GARAGE BUILDS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#f97316" }}>
                15+ Projects
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                PRIMARY HEV
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#86efac" }}>
                Yaris MK4 1.5L
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                TECH GUIDES
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>
                25+ Articles
              </span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div
            className="hero-entrance"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#open-source"
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#0e1117",
                background: "#38bdf8",
                padding: "14px 28px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1px solid #38bdf8",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0e1117";
                e.currentTarget.style.color = "#38bdf8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#38bdf8";
                e.currentTarget.style.color = "#0e1117";
              }}
            >
              [ Open Source Work ]
            </a>
            <a
              href="#projects"
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--color-text-primary)",
                background: "transparent",
                padding: "14px 28px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1px solid #334155",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-amber)";
                e.currentTarget.style.color = "var(--color-accent-amber)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
            >
              [ Engineering Garage ]
            </a>
          </div>
        </div>

        {/* Right Column: Hero Graphic Artwork */}
        <div 
          className="hero-entrance" 
          style={{ 
            flex: "1 1 420px", 
            display: "flex", 
            justifyContent: "center",
            animationDelay: "0.4s"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              padding: 12,
              background: "rgba(17, 24, 39, 0.8)",
              border: "1px solid #334155",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img 
              src="/assets/img/hero/hero-bg.png" 
              alt="Automotive Tech Network Visualization" 
              fetchPriority="high"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                border: "1px solid #1e293b",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                padding: "4px 8px",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
              }}
            >
              <span>SYS_TELEMETRY // LIVE</span>
              <span style={{ color: "var(--color-accent-amber)" }}>TOYOTA YARIS HEV TELEMATICS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
