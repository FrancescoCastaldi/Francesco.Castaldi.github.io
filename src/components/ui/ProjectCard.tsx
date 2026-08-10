"use client";
import Link from "next/link";
import type { ProjectNode } from "@/data/types";

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
        {project.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-sans)",
        fontSize: 18,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "var(--color-text-primary)",
        letterSpacing: "-0.02em",
        margin: 0,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "var(--color-text-body)",
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-space-surface)",
              padding: "4px 8px",
              letterSpacing: "0.03em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        color: "var(--color-accent-secondary)",
        marginTop: "auto",
        transition: "color 0.2s",
      }}>
        [ View Project ]
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      </div>
    </Link>
  );
}
