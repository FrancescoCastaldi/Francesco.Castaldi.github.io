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
      background: "rgba(10, 10, 10, 0.85)",
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
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: "var(--color-star-gold)",
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
          fontFamily: 'var(--font-serif)',
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 16,
        }}>{project.title}</h1>

        {/* Gold accent */}
        <div style={{
          width: 40,
          height: 2,
          background: "var(--color-star-gold)",
          borderRadius: 2,
          marginBottom: 24,
        }} />

        {/* Description */}
        <p style={{
          color: "var(--color-text-body)",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: 'var(--font-sans)',
          marginBottom: 24,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              padding: "4px 10px",
              borderRadius: 4,
              border: `1px solid ${project.color}30`,
              color: project.color || "var(--color-nebula)",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Content (Rich Markdown) */}
        {project.content && (
          <div style={{
            color: "var(--color-text-body)",
            fontSize: 15,
            lineHeight: 1.8,
            fontFamily: 'var(--font-sans)',
            marginTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
          }}>
            {project.content.split("\n\n").map((paragraph, i) => {
              const renderInline = (text: string) => {
                let html = text
                  .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
                  .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: var(--color-space-surface); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; color: var(--color-nebula);">$1</code>');
                return <span dangerouslySetInnerHTML={{ __html: html }} />;
              };

              if (paragraph.startsWith("## ")) {
                return (
                  <div key={i} style={{ display: "flex", gap: 12, margin: "36px 0 16px" }}>
                    <div style={{ width: 3, background: "var(--color-star-gold)", borderRadius: 2, flexShrink: 0 }} />
                    <h2 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 22,
                      color: "var(--color-text-primary)",
                      fontWeight: 400,
                      margin: 0,
                    }}>
                      {renderInline(paragraph.replace("## ", ""))}
                    </h2>
                  </div>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} style={{ padding: "0 0 0 20px", margin: "12px 0" }}>
                    {paragraph.split("\n").map((line, j) => {
                      if (!line.trim()) return null;
                      return (
                        <li key={j} style={{ marginBottom: 6 }}>
                          {renderInline(line.replace("- ", ""))}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              if (paragraph.startsWith("> [!")) {
                const isWarning = paragraph.startsWith("> [!WARNING]");
                const isTip = paragraph.startsWith("> [!TIP]");
                const isImportant = paragraph.startsWith("> [!IMPORTANT]");
                const color = isWarning ? "var(--color-star-gold)" : (isTip ? "var(--color-nebula)" : (isImportant ? "#9333ea" : "var(--color-text-primary)"));
                const bgColor = isWarning ? "rgba(245,158,11,0.05)" : (isTip ? "rgba(34,211,238,0.05)" : (isImportant ? "rgba(147,51,234,0.05)" : "rgba(231,237,245,0.05)"));
                const cleanText = paragraph.replace(/> \[!(WARNING|TIP|NOTE|IMPORTANT)\]\n> /g, "").replace(/\n> /g, " ");
                return (
                  <div key={i} style={{
                    margin: "24px 0",
                    padding: "16px 20px",
                    background: bgColor,
                    borderLeft: `3px solid ${color}`,
                    borderRadius: "0 8px 8px 0",
                    color: "var(--color-text-primary)",
                  }}>
                    {renderInline(cleanText)}
                  </div>
                );
              }

              if (paragraph.startsWith("|") && paragraph.includes("|---|")) {
                const rows = paragraph.split("\n").filter(r => r.trim().startsWith("|"));
                if (rows.length > 2) {
                  const headers = rows[0].split("|").slice(1, -1).map(s => s.trim());
                  const bodyRows = rows.slice(2).map(r => r.split("|").slice(1, -1).map(s => s.trim()));
                  
                  return (
                    <div key={i} style={{ overflowX: "auto", margin: "24px 0" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                          <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                            {headers.map((h, idx) => (
                              <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "var(--color-text-primary)", fontWeight: 500 }}>
                                {renderInline(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ padding: "12px 16px", color: "var(--color-text-body)" }}>
                                  {renderInline(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }


              if (!paragraph.trim()) return null;

              return (
                <p key={i} style={{ marginBottom: 16 }}>
                  {renderInline(paragraph.replace(/\n/g, " "))}
                </p>
              );
            })}
          </div>
        )}

        {/* Related Skills */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}>
              Related Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <InteractiveLink key={skillId} href={`/skill/${skill.id}`} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--color-text-body)",
                    fontSize: 12,
                    fontFamily: 'var(--font-sans)',
                    textDecoration: "none",
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 6,
                    border: `1px solid ${skill.color}20`,
                  }}
                  hoverStyle={{
                    borderColor: `${skill.color}50`,
                    color: "var(--color-text-primary)",
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
              color: "var(--color-star-gold)",
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
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
              color: "var(--color-nebula)",
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
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
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: "var(--color-star-gold)",
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
