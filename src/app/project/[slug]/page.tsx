// Server component with generateStaticParams
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    }}>
      <main style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Back link */}
        <Link href="/" style={backLinkStyle}>
          ← Return to constellation
        </Link>

        {/* Category badge with icon */}
        <span style={categoryBadgeStyle}>
          {project.icon} Project
        </span>

        {/* Title */}
        <h1 style={titleStyle}>{project.title}</h1>

        {/* Gold accent */}
        <div style={accentLineStyle} />

        {/* Description */}
        <p style={descriptionStyle}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              ...tagStyle,
              borderColor: `${project.color}30`,
              color: project.color || "#22D3EE",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Related Skills */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={sectionLabelStyle}>Related Skills</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <Link key={skillId} href={`/skill/${skill.id}`} style={{
                    ...skillCardStyle,
                    borderColor: `${skill.color}20`,
                  }}>
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links.github && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
              View on GitHub →
            </a>
          </div>
        )}
        {project.links.demo && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
              Live Demo →
            </a>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={backLinkStyle}>
            ← Return to constellation
          </Link>
        </div>
      </main>
    </div>
  );
}

// Style definitions
const backLinkStyle = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11,
  color: "#F59E0B",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 24,
} as const;

const categoryBadgeStyle = {
  display: "inline-block",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: "#F59E0B",
  background: "rgba(245,158,11,0.1)",
  padding: "4px 12px",
  borderRadius: 4,
  marginBottom: 16,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const titleStyle = {
  fontFamily: '"DM Serif Display", Georgia, serif',
  fontSize: "clamp(28px, 4vw, 40px)" as const,
  fontWeight: 400,
  color: "#E7EDF5",
  letterSpacing: "-0.03em",
  lineHeight: 1.08,
  marginBottom: 16,
};

const accentLineStyle = {
  width: 40,
  height: 2,
  background: "#F59E0B",
  borderRadius: 2,
  marginBottom: 24,
};

const descriptionStyle = {
  color: "#9BA9BB",
  fontSize: 15,
  lineHeight: 1.8,
  fontFamily: '"Inter", sans-serif',
  marginBottom: 24,
};

const tagStyle = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  padding: "4px 10px",
  borderRadius: 4,
  border: "1px solid",
} as const;

const sectionLabelStyle = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  color: "#4B5768",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  display: "block" as const,
};

const skillCardStyle = {
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
  border: "1px solid",
} as const;

const buttonStyle = {
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
} as const;
