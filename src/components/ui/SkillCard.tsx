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
        gap: 14,
        padding: 24,
        background: "#0C111A",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.04)",
        textDecoration: "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${skill.color}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${skill.color}10`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${skill.color}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Icon */}
      <div style={{
        fontSize: 28,
        lineHeight: 1,
        filter: "grayscale(0.15)",
      }}>
        {skill.icon}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: '"DM Serif Display", Georgia, serif',
        fontSize: 18,
        fontWeight: 400,
        color: "#E7EDF5",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        margin: 0,
      }}>
        {skill.name}
      </h3>

      {/* Area badge + Proficiency */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Area badge */}
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: skill.color,
          background: `${skill.color}0D`,
          border: `1px solid ${skill.color}20`,
          padding: "3px 8px",
          borderRadius: 4,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          {skill.area.replace("-", " ")}
        </span>

        {/* Proficiency dots */}
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3].map((seg) => (
            <div
              key={seg}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: seg <= proficiency ? skill.color : "rgba(255,255,255,0.06)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 12,
        color: "#9BA9BB",
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
        gap: 6,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: "#4B5768",
        marginTop: "auto",
        transition: "color 0.2s",
      }}>
        Explore skill
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
