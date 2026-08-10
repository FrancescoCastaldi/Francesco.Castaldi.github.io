"use client";
import Link from "next/link";
import type { SkillNode } from "@/data/types";

interface SkillCardProps {
  skill: SkillNode;
}

const levelMap: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 2,
  expert: 3,
};

export default function SkillCard({ skill }: SkillCardProps) {
  const proficiency = levelMap[skill.level] || 1;

  return (
    <Link
      href={`/skill/${skill.id}`}
      className="skill-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 32,
        background: "var(--color-space-void)",
        border: "1px solid var(--color-space-surface)",
        textDecoration: "none",
        transition: "background 0.2s, border-color 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-space-elevated)";
        e.currentTarget.style.borderColor = "var(--color-accent-secondary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-space-void)";
        e.currentTarget.style.borderColor = "var(--color-space-surface)";
      }}
    >
      {/* Icon */}
      <div style={{
        fontSize: 24,
        lineHeight: 1,
        filter: "grayscale(100%)",
      }}>
        {skill.icon}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 18,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "var(--color-text-primary)",
        letterSpacing: "-0.02em",
        margin: 0,
      }}>
        {skill.name}
      </h3>

      {/* Area badge + Proficiency */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Area badge */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: "var(--color-text-muted)",
          border: "1px solid var(--color-space-surface)",
          padding: "4px 8px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          {skill.area.replace("-", " ")}
        </span>

        {/* Proficiency blocks */}
        <div style={{ display: "flex", gap: 2 }}>
          {[1, 2, 3].map((seg) => (
            <div
              key={seg}
              style={{
                width: 8,
                height: 8,
                background: seg <= proficiency ? "var(--color-accent-secondary)" : "var(--color-space-surface)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: "var(--color-text-body)",
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
      }}>
        {skill.description}
      </p>

      {/* Arrow indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: "uppercase",
        color: "var(--color-accent-secondary)",
        marginTop: "auto",
        transition: "color 0.2s",
      }}>
        [ Explore Skill ]
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      </div>
    </Link>
  );
}
