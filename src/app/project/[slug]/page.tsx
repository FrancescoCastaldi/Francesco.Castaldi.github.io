// Server component with generateStaticParams
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main style={pageStyles}>
      <article style={cardStyles}>
        {/* Breadcrumb / back link */}
        <Link href="/"           style={backLinkStyles}>
          ← Return to constellation
        </Link>

        {/* Category */}
        <span style={categoryStyles}>
          {project.icon} Project
        </span>

        {/* Title */}
        <h1 style={titleStyles}>{project.title}</h1>

        {/* Description */}
        <p style={descStyles}>{project.longDescription}</p>

        {/* Tags */}
        <div style={tagsWrapStyles}>
          {project.tags.map((tag) => (
            <span key={tag} style={tagStyles}>{tag}</span>
          ))}
        </div>

        {/* Skills links */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={sectionLabelStyles}>Related Skills</span>
            <div style={skillsWrapStyles}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <Link key={skillId} href={`/skill/${skill.id}`} style={skillLinkStyles}>
                    {skill.icon} {skill.name}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Links */}
        <div style={linksWrapStyles}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={buttonStyles}>
              View on GitHub →
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={buttonStyles}>
              Live Demo →
            </a>
          )}
        </div>
      </article>
    </main>
  );
}

// --- Styles (inline, consistent with Nocturne design system) ---
const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  background: "#06080C",
  display: "flex",
  justifyContent: "center",
  padding: "80px 5% 60px",
  animation: "pageFadeIn 0.35s ease-out",
};

const cardStyles: React.CSSProperties = {
  maxWidth: 680,
  width: "100%",
  background: "#0C111A",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  padding: "40px 36px",
};

const backLinkStyles: React.CSSProperties = {
  display: "inline-block",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11,
  color: "#F59E0B",
  textDecoration: "none",
  marginBottom: 24,
  transition: "color 0.2s",
};

const categoryStyles: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: "#F59E0B",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  display: "block",
  marginBottom: 12,
};

const titleStyles: React.CSSProperties = {
  fontFamily: '"DM Serif Display", Georgia, serif',
  fontSize: "clamp(24px, 4vw, 36px)",
  color: "#E7EDF5",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  marginBottom: 20,
};

const descStyles: React.CSSProperties = {
  color: "#9BA9BB",
  fontSize: 14,
  lineHeight: 1.7,
  fontFamily: '"Inter", sans-serif',
  marginBottom: 24,
};

const tagsWrapStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 8,
};

const tagStyles: React.CSSProperties = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  color: "#22D3EE",
  background: "rgba(34, 211, 238, 0.08)",
  padding: "4px 10px",
  borderRadius: 4,
};

const sectionLabelStyles: React.CSSProperties = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  color: "#4B5768",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  display: "block",
  marginBottom: 10,
};

const skillsWrapStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const skillLinkStyles: React.CSSProperties = {
  color: "#9BA9BB",
  fontSize: 12,
  fontFamily: '"Inter", sans-serif',
  textDecoration: "none",
  padding: "6px 12px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.2s",
};

const linksWrapStyles: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginTop: 28,
  paddingTop: 24,
  borderTop: "1px solid rgba(255,255,255,0.06)",
};

const buttonStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: "#F59E0B",
  fontSize: 12,
  fontFamily: '"Inter", sans-serif',
  textDecoration: "none",
  border: "1px solid rgba(245, 158, 11, 0.25)",
  padding: "8px 16px",
  borderRadius: 6,
  transition: "background 0.2s",
};
