"use client";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useConstellationStore } from "@/store/constellation-store";
import type { SkillNode, ProjectNode } from "@/data/types";

export default function InfoPanel() {
  const { selectedNodeId, clearSelection, selectNode } = useConstellationStore();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const project = selectedNodeId
    ? projects.find((p) => p.id === selectedNodeId)
    : null;
  const skill = selectedNodeId
    ? skills.find((s) => s.id === selectedNodeId)
    : null;

  const data = project || skill;
  const isProject = data ? "slug" in data : false;

  // 4. Synthetic "about" node
  const isAbout = !data && selectedNodeId === "about";

  useEffect(() => {
    if (selectedNodeId) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [selectedNodeId]);

  if (!data && !isAbout) return null;

  // 3. Node color accent
  const nodeColor = data
    ? isProject
      ? (data as ProjectNode).color || "#F59E0B"
      : (data as SkillNode).color || "#F59E0B"
    : "#F59E0B";

  // 1. Shared panel style with mobile/desktop variants
  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: "auto",
        zIndex: 50,
        width: "100vw",
        height: "min(55vh, 380px)",
        background: "rgba(12, 17, 26, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: "none",
        borderTop: "1px solid rgba(245, 158, 11, 0.2)",
        borderRadius: "16px 16px 0 0",
        padding: "20px 16px",
        overflowY: "auto",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }
    : {
        position: "fixed",
        top: 48,
        right: 0,
        bottom: 36,
        zIndex: 50,
        width: "min(380px, 90vw)",
        background: "rgba(12, 17, 26, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: `3px solid ${nodeColor}`,
        padding: "28px 24px",
        overflowY: "auto",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
      };

  // 4. About section
  if (isAbout) {
    return (
      <>
        {/* 6. Backdrop */}
        <div
          onClick={clearSelection}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.3)",
            transition: "opacity 0.4s ease",
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
          }}
        />

        {/* Panel */}
        <div style={panelStyle}>
          {/* 1. Drag handle for mobile */}
          {isMobile && (
            <div
              style={{
                width: 40,
                height: 6,
                borderRadius: 3,
                background: "#2E3847",
                margin: "0 auto 16px",
              }}
            />
          )}

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
            About
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
            Francesco Castaldi
          </h2>

          {/* Bio */}
          <p
            style={{
              color: "#9BA9BB",
              fontSize: 13,
              lineHeight: 1.7,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Computer Engineer and Business Consultant based in Modena, Italy. 
            Specializing in Healthcare IT, Data Science, and Business Intelligence. 
            Passionate about cycling and building things that matter.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 16,
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              color: "#6B7A8D",
            }}
          >
            <span>📍 Modena, Italy</span>
            <span>7 Projects · 8 Skills</span>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/FrancescoCastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#F59E0B",
              fontSize: 12,
              border: "1px solid rgba(245,158,11,0.25)",
              padding: "8px 14px",
              borderRadius: 6,
              marginTop: 16,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            GitHub Profile →
          </a>
        </div>
      </>
    );
  }

  // TypeScript narrowing: if not About, data must exist
  if (!data) return null;

  return (
    <>
      {/* 6. Backdrop with smooth transition */}
      <div
        onClick={clearSelection}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.3)",
          transition: "opacity 0.4s ease",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <div style={panelStyle}>
        {/* 1. Drag handle for mobile */}
        {isMobile && (
          <div
            style={{
              width: 40,
              height: 6,
              borderRadius: 3,
              background: "#2E3847",
              margin: "0 auto 16px",
            }}
          />
        )}

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

        {/* 2. Skill Level Indicator (for skills only) */}
        {!isProject && (data as SkillNode).level && (
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 10,
                fontFamily: '"JetBrains Mono", monospace',
                color: "#4B5768",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Proficiency
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3].map((segment) => {
                const levelMap: Record<string, number> = {
                  beginner: 1,
                  intermediate: 2,
                  advanced: 2,
                  expert: 3,
                };
                const filled =
                  levelMap[(data as SkillNode).level] || 1;
                return (
                  <div
                    key={segment}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background:
                        segment <= filled
                          ? "#F59E0B"
                          : "rgba(255,255,255,0.06)",
                      transition: "background 0.3s",
                    }}
                  />
                );
              })}
            </div>
            <span
              style={{
                fontSize: 10,
                fontFamily: '"Inter", sans-serif',
                color: "#6B7A8D",
                marginTop: 4,
                display: "block",
                textTransform: "capitalize",
              }}
            >
              {(data as SkillNode).level}
            </span>
          </div>
        )}

        {/* Tags (for projects only) */}
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

        {/* Links (for projects only) */}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(245, 158, 11, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                View on GitHub →
              </a>
            )}
          </div>
        )}

        {/* 5. Connected skills (for projects) — clickable */}
        {isProject && (data as ProjectNode).skills.length > 0 && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
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
                    onClick={() => selectNode(skillId)}
                    style={{
                      fontSize: 11,
                      color: "#9BA9BB",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F59E0B")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9BA9BB")
                    }
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
