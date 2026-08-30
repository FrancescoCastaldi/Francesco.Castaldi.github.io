"use client";
export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: "var(--color-text-muted)",
    textDecoration: "none",
    fontSize: 10,
    textTransform: "uppercase",
    fontFamily: "var(--font-mono)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.2s",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        background: "rgba(11, 12, 14, 0.9)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #1e222b",
        pointerEvents: "auto",
      }}
    >
      {/* Left column — Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "#cbd5e1",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
          }}
        >
          [ FC.SYS // ENG ]
        </span>
      </div>

      {/* Center column — Social links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <a
          href="https://github.com/FrancescoCastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          GitHub
        </a>

        <span style={{ color: "#262a33", fontSize: 10, userSelect: "none" }}>|</span>

        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          LinkedIn
        </a>

        <span style={{ color: "#262a33", fontSize: 10, userSelect: "none" }}>|</span>

        <a
          href="mailto:info@francescocastaldi.it"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          Email
        </a>
      </div>

      {/* Right column — Copyright */}
      <span
        style={{
          color: "#64748b",
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
        }}
      >
        FRANCESCO CASTALDI &copy; 2026
      </span>
    </div>
  );
}
