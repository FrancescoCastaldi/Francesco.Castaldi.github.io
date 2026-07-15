"use client";
export default function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "0 5%",
        fontSize: 11,
        color: "#4B5768",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(transparent, rgba(6,8,12,0.4))",
        pointerEvents: "none",
      }}
    >
      <span style={{ pointerEvents: "auto" }}>
        <a
          href="https://github.com/FrancescoCastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4B5768", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#22D3EE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5768")}
        >
          GitHub
        </a>
      </span>
      <span style={{ opacity: 0.3 }}>·</span>
      <span style={{ pointerEvents: "auto" }}>
        <a
          href="https://www.linkedin.com/in/francescocastaldi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4B5768", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#22D3EE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5768")}
        >
          LinkedIn
        </a>
      </span>
      <span style={{ opacity: 0.3 }}>·</span>
      <span style={{ pointerEvents: "auto" }}>
        <a
          href="mailto:info@francescocastaldi.it"
          style={{ color: "#4B5768", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#22D3EE")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5768")}
        >
          Email
        </a>
      </span>
    </div>
  );
}
