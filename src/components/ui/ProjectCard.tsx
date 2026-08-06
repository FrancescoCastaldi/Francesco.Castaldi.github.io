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
        e.currentTarget.style.borderColor = `${project.color}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${project.color}10`;
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
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Icon */}
      <div style={{
        fontSize: 28,
        lineHeight: 1,
        filter: "grayscale(0.15)",
      }}>
        {project.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: '"DM Serif Display", Georgia, serif',
        fontSize: 20,
        fontWeight: 400,
        color: "#E7EDF5",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        margin: 0,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 13,
        color: "#9BA9BB",
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
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: project.color || "#22D3EE",
              background: `${project.color || "#22D3EE"}0D`,
              border: `1px solid ${project.color || "#22D3EE"}20`,
              padding: "3px 8px",
              borderRadius: 4,
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
        gap: 6,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: "#4B5768",
        marginTop: "auto",
        transition: "color 0.2s",
      }}>
        View project
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
