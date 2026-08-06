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
        padding: "80px 5% 60px",
        background: "rgba(6, 8, 12, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Breadcrumb */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={categoryBadgeStyle}>Contact</span>
          <h1
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 5vw, 40px)" as const,
              fontWeight: 400,
              color: "#E7EDF5",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Get in touch
          </h1>
          <div style={accentLineStyle} />
          <p
            style={{
              color: "#9BA9BB",
              fontSize: 15,
              lineHeight: 1.8,
              fontFamily: '"Inter", sans-serif',
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            Feel free to reach out. I&apos;m based in Modena, Italy, and always
            happy to connect.
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
                padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                textDecoration: "none",
                color: "#9BA9BB",
                fontSize: 14,
                fontFamily: '"Inter", sans-serif',
                transition: "border-color 0.2s, color 0.2s",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                style={{
                  color: "#4B5768",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {item.label}
              </span>
              <span>{item.value}</span>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/" style={backLinkStyle}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

const backLinkStyle = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11,
  color: "#F59E0B",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
} as const;

const categoryBadgeStyle = {
  display: "inline-block",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: "#F59E0B",
  background: "rgba(245,158,11,0.1)",
  padding: "4px 12px",
  borderRadius: 4,
  marginBottom: 16,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const accentLineStyle = {
  width: 40,
  height: 2,
  background: "#F59E0B",
  borderRadius: 2,
  margin: "0 auto 20px",
};
