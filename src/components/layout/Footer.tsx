"use client";
import React from "react";

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: "#B8B0A2",
    textDecoration: "none",
    fontSize: 11,
    textTransform: "uppercase",
    fontFamily: "var(--font-serif)",
    letterSpacing: "0.08em",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        background: "rgba(18, 17, 16, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(197, 160, 89, 0.18)",
        pointerEvents: "auto",
        transition: "background 0.7s ease-out, border-color 0.7s ease-out",
      }}
    >
      {/* Left column — Monogram / Identity */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "#C5A059",
            fontFamily: "var(--font-serif)",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 600,
          }}
        >
          FC • ARCHIVAL MONOGRAPH
        </span>
      </div>

      {/* Center column — Social correspondence links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <a
          href="https://github.com/FrancescoCastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C5A059")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#B8B0A2")}
        >
          GitHub
        </a>

        <span style={{ color: "rgba(197, 160, 89, 0.4)", fontSize: 9, userSelect: "none" }}>•</span>

        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C5A059")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#B8B0A2")}
        >
          LinkedIn
        </a>

        <span style={{ color: "rgba(197, 160, 89, 0.4)", fontSize: 9, userSelect: "none" }}>•</span>

        <a
          href="mailto:info@francescocastaldi.it"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C5A059")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#B8B0A2")}
        >
          Direct Email
        </a>
      </div>

      {/* Right column — Archival Colophon */}
      <span
        style={{
          color: "#9E978E",
          fontSize: 11,
          fontFamily: "var(--font-serif)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        FRANCESCO CASTALDI • MMXXVI
      </span>
    </footer>
  );
}
