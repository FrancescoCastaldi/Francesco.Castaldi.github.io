import "../blog/blog.css";
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
        background: "#121110",
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
              fontFamily: "var(--font-serif)",
              fontSize: 12,
              color: "#C5A059",
              background: "rgba(197, 160, 89, 0.08)",
              border: "1px solid rgba(197, 160, 89, 0.25)",
              borderRadius: 3,
              padding: "4px 12px",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            CORRESPONDENCE & INQUIRIES
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 600,
              color: "#FAF6EE",
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            Direct Inquiries & Archival Liaison
          </h1>
          <p
            style={{
              color: "#E8E3D6",
              fontSize: 16,
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
              maxWidth: 480,
              margin: "0 auto",
              opacity: 0.9,
            }}
          >
            Open for upstream open-source contributions, automotive systems engineering, data pipelines, and technical consulting.
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
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                textDecoration: "none",
                color: "#FAF6EE",
                fontSize: 14,
                fontFamily: "var(--font-serif)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "#15261E",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    background: "rgba(197, 160, 89, 0.1)",
                    border: "1px solid rgba(197, 160, 89, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HeritageIcon name={item.icon} size={16} color="#C5A059" />
                </div>
                <span
                  style={{
                    color: "#C5A059",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-serif)",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "#FAF6EE" }}>{item.value}</span>
                <ArrowRightIcon size={14} color="#C5A059" />
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 12,
              color: "#C5A059",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.6s ease-out",
            }}
          >
            <ArrowLeftIcon size={14} color="currentColor" />
            <span>Return to Archival Monograph</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
