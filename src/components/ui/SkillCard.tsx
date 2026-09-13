"use client";
import Link from "next/link";
import type { SkillNode } from "@/data/types";
import { HeritageIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";

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
        background: "#15261E",
        border: "1px solid rgba(197, 160, 89, 0.22)",
        borderRadius: 6,
        textDecoration: "none",
        transition:
          "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1B2E24";
        e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
        e.currentTarget.style.boxShadow =
          "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#15261E";
        e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Sartorial Hairline Icon */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 4,
          background: "rgba(197, 160, 89, 0.1)",
          border: "1px solid rgba(197, 160, 89, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeritageIcon nameOrEmoji={skill.icon} size={22} color="#C5A059" />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 20,
          fontWeight: 600,
          textTransform: "uppercase",
          color: "#FAF6EE",
          letterSpacing: "0.02em",
          margin: 0,
        }}
      >
        {skill.name}
      </h3>

      {/* Area badge + Proficiency */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Area badge */}
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 11,
            color: "#C5A059",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            background: "rgba(197, 160, 89, 0.08)",
            padding: "3px 8px",
            borderRadius: 3,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {skill.area.replace("-", " ")}
        </span>

        {/* Proficiency pips */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[1, 2, 3].map((seg) => (
            <div
              key={seg}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: seg <= proficiency ? "#C5A059" : "rgba(197, 160, 89, 0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "#E8E3D6",
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
          opacity: 0.9,
        }}
      >
        {skill.description}
      </p>

      {/* Arrow indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-serif)",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#C5A059",
          marginTop: "auto",
          fontWeight: 600,
        }}
      >
        <span>Examine Discipline</span>
        <ArrowRightIcon size={14} color="#C5A059" />
      </div>
    </Link>
  );
}
