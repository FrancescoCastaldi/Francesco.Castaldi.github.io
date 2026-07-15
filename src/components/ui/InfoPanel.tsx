"use client";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useConstellationStore } from "@/store/constellation-store";
import type { SkillNode, ProjectNode } from "@/data/types";

export default function InfoPanel() {
  const { selectedNodeId, clearSelection } = useConstellationStore();
  const [visible, setVisible] = useState(false);

  const project = selectedNodeId
    ? projects.find((p) => p.id === selectedNodeId)
    : null;
  const skill = selectedNodeId
    ? skills.find((s) => s.id === selectedNodeId)
    : null;

  const data = project || skill;

  useEffect(() => {
    if (selectedNodeId) {
      // Small delay for camera to start moving
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [selectedNodeId]);

  if (!data) return null;

  const isProject = "slug" in data;

  return (
    <>
      {/* Backdrop */}
      {visible && (
        <div
          onClick={clearSelection}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.3)",
          }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 48,
          right: 0,
          bottom: 36,
          zIndex: 50,
          width: "min(380px, 90vw)",
          background: "rgba(12, 17, 26, 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(245, 158, 11, 0.2)",
          padding: "28px 24px",
          overflowY: "auto",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close button */}
        <button
          onClick={clearSelection}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "#4B5768",
            fontSize: 18,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E7EDF5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5768")}
        >
          ✕
        </button>

        {/* Category */}
        <span
          style={{
            fontSize: 10,
            fontFamily: "JetBrains Mono, monospace",
            color: "#F59E0B",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 12,
            display: "block",
          }}
        >
          {isProject ? "Project" : (data as SkillNode).area.replace("-", " ")}
        </span>

        {/* Title */}
        <h2
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: 22,
            color: "#E7EDF5",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          {isProject ? (data as ProjectNode).title : (data as SkillNode).name}
        </h2>

        {/* Description */}
        <p
          style={{
            color: "#9BA9BB",
            fontSize: 13,
            lineHeight: 1.7,
            fontFamily: "Inter, sans-serif",
            marginBottom: 20,
          }}
        >
          {isProject
            ? (data as ProjectNode).longDescription || data.description
            : (data as SkillNode).description}
        </p>

        {/* Tags */}
        {isProject && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {(data as ProjectNode).tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#22D3EE",
                  background: "rgba(34, 211, 238, 0.08)",
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {isProject && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(data as ProjectNode).links.github && (
              <a
                href={(data as ProjectNode).links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#F59E0B",
                  fontSize: 12,
                  fontFamily: "Inter, sans-serif",
                  textDecoration: "none",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  padding: "8px 14px",
                  borderRadius: 6,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245, 158, 11, 0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                View on GitHub →
              </a>
            )}
          </div>
        )}

        {/* Connected skills (for projects) */}
        {isProject && (data as ProjectNode).skills.length > 0 && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span
              style={{
                fontSize: 10,
                fontFamily: "JetBrains Mono, monospace",
                color: "#4B5768",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Related Skills
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(data as ProjectNode).skills.map((skillId: string) => {
                const s = skills.find((sk) => sk.id === skillId);
                return s ? (
                  <span
                    key={skillId}
                    style={{
                      fontSize: 11,
                      color: "#9BA9BB",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {s.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
