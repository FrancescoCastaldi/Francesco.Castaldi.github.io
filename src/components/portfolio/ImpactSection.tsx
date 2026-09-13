import React from "react";
import type { DerivedPortfolioStats } from "@/lib/portfolio/derive";

interface ImpactSectionProps {
  stats: DerivedPortfolioStats;
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  return (
    <section
      id="numbers"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "100px 5%",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
        maxWidth: 1360,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 48 }}>
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
          01 // VERIFIED SCALE & PRACTICE METRICS
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 3.8vw, 48px)",
            fontWeight: 400,
            color: "#EDE8DE",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Portfolio in Numbers
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "#C9C5BC",
            marginTop: 8,
            maxWidth: 620,
            lineHeight: 1.6,
          }}
        >
          Precision-labeled dimensions across systems engineering, kinematics, stochastic modeling, and enterprise consulting.
        </p>
      </div>

      {/* Core Counts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginBottom: 56,
        }}
      >
        <div
          style={{
            background: "#2A2D2B",
            border: "1px solid rgba(201, 197, 188, 0.18)",
            borderRadius: 4,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 48,
              color: "#EDE8DE",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {stats.totalProjects}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#C9C5BC",
              fontWeight: 500,
            }}
          >
            documented projects
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#C9C5BC",
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            12 curated in showcase • 3 in archive
          </div>
        </div>

        <div
          style={{
            background: "#2A2D2B",
            border: "1px solid rgba(201, 197, 188, 0.18)",
            borderRadius: 4,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 48,
              color: "#EDE8DE",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {stats.totalSkills}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#C9C5BC",
              fontWeight: 500,
            }}
          >
            competencies
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#C9C5BC",
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            verified cross-domain disciplines
          </div>
        </div>

        <div
          style={{
            background: "#2A2D2B",
            border: "1px solid rgba(201, 197, 188, 0.18)",
            borderRadius: 4,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 48,
              color: "#EDE8DE",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {stats.totalPracticeAreas}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#C9C5BC",
              fontWeight: 500,
            }}
          >
            practice areas
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#C9C5BC",
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            discrete engineering domains
          </div>
        </div>
      </div>

      {/* Verified Declarations (D5 & D6) */}
      <div style={{ marginBottom: 48 }}>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "#C9C5BC",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 16,
          }}
        >
          ACCREDITATION & INDUSTRY PRACTICE (DIRECT VERIFICATION)
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {stats.careerMetrics.map((metric) => (
            <div
              key={metric.id}
              style={{
                background: "#1F3329",
                border: "1px solid rgba(201, 197, 188, 0.2)",
                borderRadius: 4,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#C9C5BC",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "#EDE8DE",
                  marginBottom: 4,
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#C9C5BC",
                  marginBottom: 10,
                }}
              >
                {metric.detail}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "#C1622D",
                  opacity: 0.85,
                }}
              >
                Source: {metric.source} • Verified: {metric.verifiedAt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Area Distribution & 3D Landscape Legend */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "#C9C5BC",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 16,
          }}
        >
          PRACTICE AREA DISTRIBUTION (COMMON SCALE MATRIX)
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {stats.areaDistribution.map((item) => (
            <div
              key={item.pillarId}
              style={{
                background: "#2A2D2B",
                border: "1px solid rgba(201, 197, 188, 0.15)",
                borderRadius: 4,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#C1622D",
                  marginBottom: 4,
                }}
              >
                {item.pillarId.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#EDE8DE",
                  fontWeight: 600,
                  marginBottom: 8,
                  lineHeight: 1.4,
                  minHeight: 36,
                }}
              >
                {item.title}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    color: "#EDE8DE",
                  }}
                >
                  {item.projectCount}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "#C9C5BC",
                  }}
                >
                  projects (height: {(item.normalizedHeight * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
