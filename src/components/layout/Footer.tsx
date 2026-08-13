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
        background: "var(--color-space-void)",
        borderTop: "1px solid var(--color-space-surface)",
        pointerEvents: "auto",
      }}
    >
      {/* Left column — Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <img 
          src="/assets/img/brand/logo.png" 
          alt="FC Emblem" 
          style={{ width: 18, height: 18, borderRadius: 3, objectFit: "cover", border: "1px solid rgba(56, 189, 248, 0.3)" }}
        />
        <span
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          [ F.C. ]
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
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          GitHub
        </a>

        <span style={{ color: "var(--color-space-surface)", fontSize: 10, userSelect: "none" }}>|</span>

        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          LinkedIn
        </a>

        <span style={{ color: "var(--color-space-surface)", fontSize: 10, userSelect: "none" }}>|</span>

        <a
          href="mailto:info@francescocastaldi.it"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          Email
        </a>
      </div>

      {/* Right column — Copyright */}
      <span
        style={{
          color: "var(--color-text-muted)",
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
        }}
      >
        © 2026
      </span>
    </div>
  );
}
