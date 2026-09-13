"use client";
import { useEffect } from "react";
import Link from "next/link";
import { projects, engineeringPillars } from "@/data/projects";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );

      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, []);

  const cardHoverEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "#1B2E24";
    e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
    e.currentTarget.style.boxShadow =
      "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
    e.currentTarget.style.transform = "translateY(-3px)";
  };

  const cardHoverLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "#15261E";
    e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 80, background: "#121110" }}>
      <HeroSection />

      {engineeringPillars.map((pillar) => {
        const pillarProjects = projects.filter((p) => p.pillar === pillar.id);
        return (
          <section
            key={pillar.id}
            id={pillar.sectionId}
            className="scroll-reveal"
            style={{
              padding: "90px 5% 80px",
              maxWidth: 1400,
              margin: "0 auto",
              borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 40,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 13,
                    color: "#C5A059",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {pillar.roman} {pillar.title}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(28px, 3.2vw, 42px)",
                    fontWeight: 600,
                    color: "#FAF6EE",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {pillar.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "#E8E3D6",
                    margin: "8px 0 0",
                    maxWidth: 700,
                    opacity: 0.88,
                    lineHeight: 1.65,
                  }}
                >
                  {pillar.subtitle}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 52,
                  fontWeight: 700,
                  color: "rgba(197, 160, 89, 0.14)",
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.02em",
                }}
                aria-hidden="true"
              >
                {pillar.roman}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: 20,
              }}
            >
              {pillarProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/project/${project.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#15261E",
                    border: "1px solid rgba(197, 160, 89, 0.22)",
                    borderRadius: 6,
                    padding: 28,
                    textDecoration: "none",
                    transition:
                      "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={cardHoverEnter}
                  onMouseLeave={cardHoverLeave}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 12,
                        color: "#C5A059",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {project.icon} {project.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 11,
                        padding: "2px 8px",
                        background: "#1B2E24",
                        color: "#FAF6EE",
                        border: "1px solid rgba(197, 160, 89, 0.25)",
                        borderRadius: 3,
                        textTransform: "uppercase",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {pillar.code}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#FAF6EE",
                      marginBottom: 12,
                      lineHeight: 1.35,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#E8E3D6",
                      lineHeight: 1.65,
                      marginBottom: 20,
                      flex: 1,
                      opacity: 0.9,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      borderTop: "1px solid rgba(197, 160, 89, 0.14)",
                      paddingTop: 14,
                    }}
                  >
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          fontFamily: "var(--font-serif)",
                          padding: "3px 8px",
                          background: "rgba(197, 160, 89, 0.08)",
                          color: "#C5A059",
                          border: "1px solid rgba(197, 160, 89, 0.22)",
                          borderRadius: 3,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section
        id="contact"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 13,
            color: "#C5A059",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            display: "block",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          V. Direct Inquiries &amp; Archival Liaison
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#FAF6EE",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Direct Correspondence &amp; Scholarly Exchange
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "#E8E3D6",
            lineHeight: 1.7,
            marginBottom: 36,
            opacity: 0.9,
          }}
        >
          Open for upstream open-source collaboration, automotive engineering
          exchanges, data science systems, or specialized architectural
          consultation.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:info@francescocastaldi.it"
            style={{
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#121110",
              background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
              padding: "13px 28px",
              border: "1px solid #C5A059",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(197, 160, 89, 0.2)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(197, 160, 89, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)";
              e.currentTarget.style.color = "#121110";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(197, 160, 89, 0.2)";
            }}
          >
            Direct Correspondence
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#FAF6EE",
              background: "rgba(21, 38, 30, 0.7)",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              borderRadius: 4,
              padding: "13px 28px",
              textDecoration: "none",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C5A059";
              e.currentTarget.style.color = "#C5A059";
              e.currentTarget.style.background = "#15261E";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.35)";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.background = "rgba(21, 38, 30, 0.7)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Curriculum Vitae / LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}