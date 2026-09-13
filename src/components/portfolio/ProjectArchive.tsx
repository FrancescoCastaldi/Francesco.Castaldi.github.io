import React from "react";
import Link from "next/link";
import type { ProjectNode, EngineeringPillarId } from "@/data/types";
import { PRACTICE_AREA_METADATA } from "@/data/portfolio";

interface ProjectArchiveProps {
  allProjects: ProjectNode[];
}

export default function ProjectArchive({ allProjects }: ProjectArchiveProps) {
  const pillars: EngineeringPillarId[] = [
    "upstream",
    "automotive",
    "data-science",
    "analytics",
  ];

  return (
    <section
      id="archive"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "80px 5% 100px",
        maxWidth: 1360,
        margin: "0 auto",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "#C1622D",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            display: "block",
            marginBottom: 8,
          }}
        >
          03 // COMPLETE ARCHIVAL REGISTER
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 3.2vw, 40px)",
            fontWeight: 400,
            color: "#EDE8DE",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          All 15 Documented Projects by Practice Area
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "#C9C5BC",
            marginTop: 8,
            maxWidth: 680,
            lineHeight: 1.6,
          }}
        >
          Every engineering treatise, upstream contribution, and laboratory system remains permanently accessible with immutable URLs.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {pillars.map((pillarId) => {
          const meta = PRACTICE_AREA_METADATA[pillarId];
          const pillarProjects = allProjects.filter((p) => p.pillar === pillarId);

          return (
            <div key={pillarId}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 20,
                  borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
                  paddingBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "#C1622D",
                    fontWeight: 600,
                  }}
                >
                  {meta.roman}.
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "#EDE8DE",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  {meta.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#C9C5BC",
                    opacity: 0.6,
                    marginLeft: "auto",
                  }}
                >
                  {pillarProjects.length} projects
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 16,
                }}
              >
                {pillarProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={"/project/" + proj.slug}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      background: "#2A2D2B",
                      border: "1px solid rgba(201, 197, 188, 0.15)",
                      borderRadius: 4,
                      padding: "20px 24px",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "#C9C5BC",
                          marginBottom: 8,
                        }}
                      >
                        {proj.slug}
                      </div>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 18,
                          color: "#EDE8DE",
                          fontWeight: 400,
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {proj.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "#C9C5BC",
                          lineHeight: 1.55,
                          marginBottom: 16,
                        }}
                      >
                        {proj.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(201, 197, 188, 0.1)",
                        paddingTop: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "#C1622D",
                        }}
                      >
                        View Folio →
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "#C9C5BC",
                          opacity: 0.7,
                        }}
                      >
                        {proj.skills.length} competencies
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
