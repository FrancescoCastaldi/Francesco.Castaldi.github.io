import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { HeritageIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";

export default function ContactPage() {
  const contactItems = [
    {
      label: "Direct Email",
      value: "info@francescocastaldi.it",
      href: "mailto:info@francescocastaldi.it",
      icon: "mail",
    },
    {
      label: "GitHub Archive",
      value: "github.com/FrancescoCastaldi",
      href: "https://github.com/FrancescoCastaldi",
      icon: "github",
    },
    {
      label: "Curriculum / LinkedIn",
      value: "linkedin.com/in/francescocastaldi",
      href: "https://www.linkedin.com/in/francescocastaldi",
      icon: "linkedin",
    },
  ];

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
        background: "#0E100F",
      }}
    >
      <div style={{ width: "100%", maxWidth: 580 }}>
        {/* Breadcrumb */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Correspondence" },
          ]} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "#C1622D",
              background: "rgba(193, 98, 45, 0.12)",
              border: "1px solid rgba(193, 98, 45, 0.3)",
              borderRadius: 3,
              padding: "4px 12px",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            05 // DIRECT INQUIRIES & ARCHIVAL LIAISON
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 400,
              color: "#EDE8DE",
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            Initiate Direct Dialogue
          </h1>
          <p
            style={{
              color: "#C9C5BC",
              fontSize: 15,
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Available for upstream open-source core engineering, powertrain telematics, stochastic systems, and technical consulting.
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
          {contactItems.map((item) => (
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
                padding: "18px 22px",
                border: "1px solid rgba(201, 197, 188, 0.18)",
                borderRadius: 4,
                textDecoration: "none",
                color: "#EDE8DE",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                transition: "all 0.25s ease",
                background: "#2A2D2B",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    background: "rgba(193, 98, 45, 0.12)",
                    border: "1px solid rgba(193, 98, 45, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HeritageIcon name={item.icon} size={16} color="#C1622D" />
                </div>
                <span
                  style={{
                    color: "#C1622D",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#EDE8DE" }}>{item.value}</span>
                <ArrowRightIcon size={14} color="#C1622D" />
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#C1622D",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeftIcon size={14} color="currentColor" />
            <span>Return to Monograph</span>
          </Link>
        </div>
      </div>
    </div>
  );
}