"use client";
import Link from "next/link";
import type { ProjectNode } from "@/data/types";
import { HeritageIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";

interface ProjectCardProps {
  project: ProjectNode;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="project-card"
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
        <HeritageIcon nameOrEmoji={project.icon} size={22} color="#C5A059" />
      </div>

      {/* Title */}
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
        {project.title}
      </h3>

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
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 11,
              textTransform: "uppercase",
              color: "#C5A059",
              background: "rgba(197, 160, 89, 0.08)",
              border: "1px solid rgba(197, 160, 89, 0.22)",
              borderRadius: 3,
              padding: "3px 8px",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

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
        <span>View Monograph</span>
        <ArrowRightIcon size={14} color="#C5A059" />
      </div>
    </Link>
  );
}
