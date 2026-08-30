import "../blog/blog.css";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ContactPage() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 5% 70px",
        background: "#0b0c0e",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Breadcrumb */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={categoryBadgeStyle}>[ DIRECT_COMMUNICATION ]</span>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#f8fafc",
              marginBottom: 16,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            Get In Touch
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 15,
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
              maxWidth: 440,
              margin: "0 auto",
            }}
          >
            Available for upstream open-source contributions, automotive systems engineering, data pipelines, and technical consulting.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {[
            {
              label: "Email",
              value: "info@francescocastaldi.it",
              href: "mailto:info@francescocastaldi.it",
            },
            {
              label: "GitHub",
              value: "github.com/FrancescoCastaldi",
              href: "https://github.com/FrancescoCastaldi",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/francescocastaldi",
              href: "https://www.linkedin.com/in/francescocastaldi",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                border: "1px solid #262a33",
                textDecoration: "none",
                color: "#cbd5e1",
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
                background: "#131519",
              }}
            >
              <span
                style={{
                  color: "#64748b",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                [{item.label}]
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#f8fafc" }}>{item.value}</span>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/" style={backLinkStyle}>[ &larr; Back to Home ]</Link>
        </div>
      </div>
    </div>
  );
}

const backLinkStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: "#94a3b8",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const categoryBadgeStyle = {
  display: "inline-block",
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: "#cbd5e1",
  background: "#131519",
  border: "1px solid #262a33",
  padding: "4px 10px",
  marginBottom: 16,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontWeight: 700,
};

