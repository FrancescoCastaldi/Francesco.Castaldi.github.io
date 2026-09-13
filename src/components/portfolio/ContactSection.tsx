import React from "react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "120px 5% 140px",
        maxWidth: 860,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "#C1622D",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          display: "block",
          marginBottom: 12,
        }}
      >
        05 // LIAISON & CORRESPONDENCE
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(34px, 4.4vw, 56px)",
          fontWeight: 400,
          color: "#EDE8DE",
          letterSpacing: "-0.01em",
          marginBottom: 20,
        }}
      >
        Initiate Technical Dialogue
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          color: "#C9C5BC",
          lineHeight: 1.7,
          maxWidth: 620,
          margin: "0 auto 40px",
        }}
      >
        Available for upstream core contributions, distributed cloud-native systems, powertrain telematics, and high-impact analytics consulting.
      </p>

      <div>
        <a
          href="mailto:info@francescocastaldi.it"
          style={{
            display: "inline-block",
            background: "#C1622D",
            color: "#EDE8DE",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: "16px 36px",
            borderRadius: 3,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
            boxShadow: "0 8px 24px rgba(193, 98, 45, 0.25)",
          }}
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
