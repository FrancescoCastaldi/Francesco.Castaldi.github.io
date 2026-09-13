"use client";
import React from "react";

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: "#C9C5BC",
    textDecoration: "none",
    fontSize: 12,
    fontFamily: "var(--font-body)",
    letterSpacing: "0.04em",
    fontWeight: 500,
    transition: "color 0.25s ease",
  };

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 20,
        padding: "36px 5%",
        background: "#0E100F",
        borderTop: "1px solid rgba(201, 197, 188, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      {/* Left: Colophon & Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            color: "#C1622D",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          FC // THE SCULPTED ATLAS
        </span>
      </div>

      {/* Center: Correspondence Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a
          href="https://github.com/FrancescoCastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#C9C5BC")}
        >
          GitHub
        </a>

        <span style={{ color: "rgba(201, 197, 188, 0.3)", fontSize: 10 }}>•</span>

        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#C9C5BC")}
        >
          LinkedIn
        </a>

        <span style={{ color: "rgba(201, 197, 188, 0.3)", fontSize: 10 }}>•</span>

        <a
          href="mailto:info@francescocastaldi.it"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C1622D")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#C9C5BC")}
        >
          Direct Email
        </a>
      </div>

      {/* Right: Year & Location */}
      <span
        style={{
          color: "#C9C5BC",
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          opacity: 0.7,
        }}
      >
        BOLOGNA, IT • 2026
      </span>
    </footer>
  );
}
