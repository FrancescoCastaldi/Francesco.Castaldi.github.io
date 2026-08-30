"use client";
import Link from "next/link";

export default function HeroSection() {
  const engineeringDisciplines = [
    {
      code: "01",
      area: "OPEN SOURCE & UPSTREAM",
      desc: "Architected multi-language & filter systems in Evidence (Svelte), enriched Superset engine ASTs, fixed Docker CLI Zsh completion, and contributed to Kanister & Duckle.",
      tags: ["Evidence", "Superset", "Docker CLI", "DuckDB"],
    },
    {
      code: "02",
      area: "RADAR NOWCASTING & AI",
      desc: "Dual-polarization radar storm cell tracking, optical flow motion fields, and machine learning models for real-time severe hail and convective prediction.",
      tags: ["HailCast-ML", "PyTorch", "OpenCV", "NumPy"],
    },
    {
      code: "03",
      area: "3D WEBGL & INTERACTIVE CAD",
      desc: "High-performance browser-based 3D engines, real-time SVG-to-mesh decal projection, GLB parsers, and automated Tech Pack production pipelines.",
      tags: ["Three.js", "WebGL", "TypeScript", "3D CAD"],
    },
    {
      code: "04",
      area: "AUTOMOTIVE & KINEMATICS",
      desc: "Full structural CAD, dynamic inertia derivation, Goodman-Smith fatigue verification for Toyota M15A 1.5L HEV connecting rods, and CAN-bus telemetry.",
      tags: ["Toyota HEV", "SolidWorks", "FEA", "Fatigue"],
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        zIndex: 5,
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        padding: "130px 5% 70px",
        overflow: "hidden",
        borderBottom: "1px solid #1e222b",
        background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(148, 163, 184, 0.04), transparent 70%), #0b0c0e",
      }}
    >
      {/* Subtle hairline technical grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(38, 42, 51, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38, 42, 51, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
          alignItems: "center",
          gap: "48px",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Left Column: Tech Identity & Overview */}
        <div>
          {/* Status Badge */}
          <div
            className="hero-entrance"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              background: "#131519",
              border: "1px solid #262a33",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#cbd5e1",
                boxShadow: "0 0 8px rgba(203, 213, 225, 0.8)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#cbd5e1",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
              }}
            >
              SYS // ACTIVE &bull; BOLOGNA, IT
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(38px, 5.5vw, 70px)",
              color: "#f8fafc",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Francesco<br />
            <span
              style={{
                background: "linear-gradient(90deg, #f8fafc 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Castaldi
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "#94a3b8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 20,
              marginBottom: 20,
              borderLeft: "2px solid #475164",
              paddingLeft: "14px",
            }}
          >
            Computer Systems Engineer &bull; Open Source Contributor &bull; Automotive Enthusiast
          </p>

          {/* Description */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              color: "#94a3b8",
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Designing resilient software architectures, contributing to upstream enterprise open-source tools (Evidence, Apache Superset, Docker CLI), and engineering high-precision data & mechanical systems.
          </p>

          {/* Telemetry Numbers Matrix */}
          <div
            className="hero-entrance"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: 12,
              marginTop: 32,
              padding: "16px 20px",
              background: "#131519",
              border: "1px solid #262a33",
            }}
          >
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                UPSTREAM
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>
                Open Source
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                PROJECTS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>
                15+ Builds
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                HYBRID HEV
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#cbd5e1" }}>
                Yaris MK4 1.5L
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                ARTICLES
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>
                25+ Guides
              </span>
            </div>
          </div>

          {/* Action CTAs */}
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
              href="#open-source"
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#0b0c0e",
                background: "#e2e8f0",
                padding: "12px 24px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
                e.currentTarget.style.color = "#0b0c0e";
              }}
            >
              [ View Open Source Work ]
            </a>
            <a
              href="#projects"
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#cbd5e1",
                background: "transparent",
                padding: "12px 24px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1px solid #262a33",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#94a3b8";
                e.currentTarget.style.color = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              [ Explore Systems & Builds ]
            </a>
          </div>
        </div>

        {/* Right Column: High-Precision Engineering Spec Sheet */}
        <div className="hero-entrance" style={{ animationDelay: "0.3s" }}>
          <div
            style={{
              background: "#131519",
              border: "1px solid #262a33",
              padding: "24px 28px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #262a33",
                paddingBottom: 14,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                }}
              >
                ENGINEERING_MATRIX // SPEC_SHEET
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "#64748b",
                  padding: "2px 8px",
                  background: "#1a1d23",
                  border: "1px solid #262a33",
                }}
              >
                REV 2026.4
              </span>
            </div>

            {/* Spec Matrix List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {engineeringDisciplines.map((item) => (
                <div
                  key={item.code}
                  style={{
                    borderBottom: "1px solid #1a1d23",
                    paddingBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#f8fafc",
                        textTransform: "uppercase",
                      }}
                    >
                      <span style={{ color: "#64748b", marginRight: 8 }}>[{item.code}]</span>
                      {item.area}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "#94a3b8",
                      lineHeight: 1.55,
                      margin: "0 0 10px 0",
                    }}
                  >
                    {item.desc}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "#cbd5e1",
                          background: "#1a1d23",
                          border: "1px solid #262a33",
                          padding: "2px 6px",
                          textTransform: "uppercase",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 18,
                paddingTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              <span>STATUS: PRODUCTION_READY</span>
              <span>HOSTED ON GITHUB PAGES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

