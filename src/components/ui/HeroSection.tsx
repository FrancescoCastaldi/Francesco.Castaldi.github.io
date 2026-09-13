"use client";
import Link from "next/link";

export default function HeroSection() {
  const engineeringDisciplines = [
    {
      code: "I.",
      area: "OPEN SOURCE & UPSTREAM",
      desc: "Architected multi-language & filter systems in Evidence (Svelte), enriched Superset engine ASTs, fixed Docker CLI Zsh completion, and contributed to Kanister & Duckle.",
      tags: ["Evidence", "Superset", "Docker CLI", "DuckDB"],
    },
    {
      code: "II.",
      area: "RADAR NOWCASTING & AI",
      desc: "Dual-polarization radar storm cell tracking, optical flow motion fields, and machine learning models for real-time severe hail and convective prediction.",
      tags: ["HailCast-ML", "PyTorch", "OpenCV", "NumPy"],
    },
    {
      code: "III.",
      area: "3D WEBGL & INTERACTIVE CAD",
      desc: "High-performance browser-based 3D engines, real-time SVG-to-mesh decal projection, GLB parsers, and automated Tech Pack production pipelines.",
      tags: ["Three.js", "WebGL", "TypeScript", "3D CAD"],
    },
    {
      code: "IV.",
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
        borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(197, 160, 89, 0.08), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 100%, rgba(21, 38, 30, 0.4), transparent 70%), #121110",
      }}
    >
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
        {/* Left Column: Heritage Identity & Overview */}
        <div>
          {/* Status Badge */}
          <div
            className="hero-entrance"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 16px",
              background: "rgba(21, 38, 30, 0.6)",
              border: "1px solid rgba(197, 160, 89, 0.3)",
              borderRadius: 4,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#C5A059",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 12,
                color: "#C5A059",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
              }}
            >
              ARCHIVAL MONOGRAPH • BOLOGNA, IT
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(42px, 5.5vw, 74px)",
              color: "#FAF6EE",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Francesco<br />
            <span style={{ color: "#C5A059" }}>Castaldi</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              color: "#C5A059",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 20,
              marginBottom: 20,
              borderLeft: "2px solid #C5A059",
              paddingLeft: "14px",
            }}
          >
            Computer Systems Engineer • Upstream Contributor • Automotive Kinematics
          </p>

          {/* Description */}
          <p
            className="hero-entrance"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.6vw, 18px)",
              color: "#E8E3D6",
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.75,
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            Curating resilient software architectures, contributing to upstream enterprise open-source tools (Evidence, Apache Superset, Docker CLI), and engineering high-precision data & mechanical systems.
          </p>

          {/* Action CTAs */}
          <div
            className="hero-entrance"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 34,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#work-portfolio"
              style={{
                fontFamily: "var(--font-serif)",
                textTransform: "uppercase",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#121110",
                background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
                padding: "13px 26px",
                textDecoration: "none",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                border: "1px solid #C5A059",
                borderRadius: 4,
                boxShadow: "0 4px 16px rgba(197, 160, 89, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#FAF6EE";
                e.currentTarget.style.boxShadow = "0 6px 22px rgba(197, 160, 89, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)";
                e.currentTarget.style.color = "#121110";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(197, 160, 89, 0.2)";
              }}
            >
              I. Selected Works & Portfolio
            </a>
            <a
              href="#garage-labs"
              style={{
                fontFamily: "var(--font-serif)",
                textTransform: "uppercase",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#E8E3D6",
                background: "rgba(21, 38, 30, 0.7)",
                padding: "13px 26px",
                textDecoration: "none",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                border: "1px solid rgba(197, 160, 89, 0.35)",
                borderRadius: 4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C5A059";
                e.currentTarget.style.color = "#FAF6EE";
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.35)";
                e.currentTarget.style.color = "#E8E3D6";
                e.currentTarget.style.background = "rgba(21, 38, 30, 0.7)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              II. Workshop & Kinematics
            </a>
          </div>
        </div>

        {/* Right Column: Curated Engineering Compendium */}
        <div className="hero-entrance" style={{ animationDelay: "0.3s" }}>
          <div
            style={{
              background: "#15261E",
              border: "1px solid rgba(197, 160, 89, 0.25)",
              padding: "26px 30px",
              borderRadius: 6,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.55)",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(197, 160, 89, 0.2)",
                paddingBottom: 14,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 12,
                  color: "#C5A059",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                }}
              >
                I. ARCHIVAL SPECIFICATIONS & EXPERTISE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 11,
                  color: "#FAF6EE",
                  padding: "3px 10px",
                  background: "#1B2E24",
                  border: "1px solid rgba(197, 160, 89, 0.25)",
                  borderRadius: 3,
                  letterSpacing: "0.06em",
                }}
              >
                FOLIO MMXXVI
              </span>
            </div>

            {/* Spec Matrix List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {engineeringDisciplines.map((item) => (
                <div
                  key={item.code}
                  style={{
                    borderBottom: "1px solid rgba(197, 160, 89, 0.12)",
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
                        fontFamily: "var(--font-serif)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#FAF6EE",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span style={{ color: "#C5A059", marginRight: 8, fontWeight: 700 }}>
                        {item.code}
                      </span>
                      {item.area}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#E8E3D6",
                      lineHeight: 1.6,
                      margin: "0 0 10px 0",
                      opacity: 0.88,
                    }}
                  >
                    {item.desc}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 11,
                          color: "#C5A059",
                          background: "rgba(197, 160, 89, 0.08)",
                          border: "1px solid rgba(197, 160, 89, 0.22)",
                          padding: "2px 8px",
                          borderRadius: 3,
                          letterSpacing: "0.04em",
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
                fontFamily: "var(--font-serif)",
                fontSize: 11,
                color: "#9E978E",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <span>ALMA MATER STUDIORUM • BOLOGNA</span>
              <span>MONOGRAPH EDITION MMXXVI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
