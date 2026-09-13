"use client";
import React from "react";
import Link from "next/link";
import type { SkillNode } from "@/data/types";

interface ExpertiseSectionProps {
  skills: SkillNode[];
  onSkillHover?: (skillId: string | null) => void;
}

export default function ExpertiseSection({
  skills,
  onSkillHover,
}: ExpertiseSectionProps) {
  return (
    <section
      id="expertise"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "100px 5%",
        maxWidth: 1360,
        margin: "0 auto",
        borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
      }}
    >
      <div style={{ marginBottom: 44 }}>
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
          04 // VERIFIED COMPETENCY CONSTELLATION
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
          Expertise & Disciplines
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
          Relational constellation mapped directly from shared engineering projects. No arbitrary proficiency percentages.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {skills.map((skill) => (
          <Link
            key={skill.id}
            href={"/skill/" + skill.id}
            style={{
              background: "#2A2D2B",
              border: "1px solid rgba(201, 197, 188, 0.18)",
              borderRadius: 4,
              padding: "24px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={() => onSkillHover?.(skill.id)}
            onMouseLeave={() => onSkillHover?.(null)}
            onFocus={() => onSkillHover?.(skill.id)}
            onBlur={() => onSkillHover?.(null)}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "#C1622D",
                    textTransform: "uppercase",
                  }}
                >
                  {skill.area.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "#C9C5BC",
                    background: "#0E100F",
                    padding: "2px 8px",
                    borderRadius: 2,
                  }}
                >
                  {skill.level}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  color: "#EDE8DE",
                  fontWeight: 400,
                  marginBottom: 8,
                }}
              >
                {skill.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#C9C5BC",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {skill.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(201, 197, 188, 0.12)",
                paddingTop: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#EDE8DE",
                }}
              >
                {skill.relatedProjects.length} linked projects
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#C1622D",
                }}
              >
                Inspect Skill →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
