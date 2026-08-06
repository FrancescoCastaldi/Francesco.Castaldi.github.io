// Server component with generateStaticParams
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InteractiveLink from "@/components/ui/InteractiveLink";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div style={{
      position: "relative",
      zIndex: 60,
      minHeight: "100vh",
      padding: "80px 5% 60px",
      background: "rgba(6, 8, 12, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    }}>
      <main style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/#projects" },
          { label: project.title },
        ]} />

        {/* Category badge with icon */}
        <span style={{
          display: "inline-block",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: "#F59E0B",
          background: "rgba(245,158,11,0.1)",
          padding: "4px 12px",
          borderRadius: 4,
          marginTop: 24,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          {project.icon} Project
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "#E7EDF5",
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 16,
        }}>{project.title}</h1>

        {/* Gold accent */}
        <div style={{
          width: 40,
          height: 2,
          background: "#F59E0B",
          borderRadius: 2,
          marginBottom: 24,
        }} />

        {/* Description */}
        <p style={{
          color: "#9BA9BB",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: '"Inter", sans-serif',
          marginBottom: 24,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10,
              fontFamily: '"JetBrains Mono", monospace',
              padding: "4px 10px",
              borderRadius: 4,
              border: `1px solid ${project.color}30`,
              color: project.color || "#22D3EE",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Related Skills */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{
              fontSize: 10,
              fontFamily: '"JetBrains Mono", monospace',
              color: "#4B5768",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
            }}>Related Skills</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <InteractiveLink key={skillId} href={`/skill/${skill.id}`} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#9BA9BB",
                    fontSize: 12,
                    fontFamily: '"Inter", sans-serif',
                    textDecoration: "none",
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 6,
                    border: `1px solid ${skill.color}20`,
                  }}
                  hoverStyle={{
                    borderColor: `${skill.color}50`,
                    color: "#E7EDF5",
                    background: "rgba(255,255,255,0.06)",
                  }}>
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </InteractiveLink>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links.github && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <InteractiveLink href={project.links.github} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#F59E0B",
              fontSize: 13,
              fontFamily: '"Inter", sans-serif',
              textDecoration: "none",
              border: "1px solid rgba(245,158,11,0.3)",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 500,
            }}
            hoverStyle={{
              background: "rgba(245,158,11,0.1)",
            }}>
              View on GitHub
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </InteractiveLink>
          </div>
        )}
        {project.links.demo && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <InteractiveLink href={project.links.demo} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#22D3EE",
              fontSize: 13,
              fontFamily: '"Inter", sans-serif',
              textDecoration: "none",
              border: "1px solid rgba(34,211,238,0.3)",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 500,
            }}
            hoverStyle={{
              background: "rgba(34,211,238,0.1)",
            }}>
              Live Demo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </InteractiveLink>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <InteractiveLink href="/#projects" style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: "#F59E0B",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          hoverStyle={{
            color: "#FBBF24",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Projects
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
