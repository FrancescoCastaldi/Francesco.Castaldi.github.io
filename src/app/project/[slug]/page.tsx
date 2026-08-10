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
      padding: "120px 5% 60px",
      background: "var(--color-space-void)",
    }}>
      <main style={{ maxWidth: 800, margin: "0 auto" }}>
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
          color: "var(--color-accent-secondary)",
          border: "1px solid var(--color-accent-secondary)",
          padding: "4px 8px",
          marginTop: 24,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          [ {project.icon} Project ]
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          marginBottom: 16,
        }}>{project.title}</h1>


        {/* Description */}
        <p style={{
          color: "var(--color-text-body)",
          fontSize: 16,
          lineHeight: 1.8,
          fontFamily: 'var(--font-sans)',
          marginBottom: 32,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48, paddingBottom: 24, borderBottom: "1px solid var(--color-space-surface)" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              textTransform: "uppercase",
              padding: "4px 8px",
              border: "1px solid var(--color-space-surface)",
              color: "var(--color-text-muted)",
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
          }}>
            {project.content.split("\n\n").map((rawParagraph, i) => {
              const paragraph = rawParagraph.trim();
              if (!paragraph) return null;
              
              const renderInline = (text: string) => {
                let html = text
                  .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
                  .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: var(--color-space-surface); padding: 2px 6px; border-radius: 0; font-size: 0.9em; color: var(--color-text-primary); border: 1px solid var(--color-accent-secondary)">$1</code>');
                return <span dangerouslySetInnerHTML={{ __html: html }} />;
              };

              if (paragraph.startsWith("## ")) {
                return (
                  <div key={i} style={{ display: "flex", gap: 16, margin: "48px 0 24px", borderBottom: "1px solid var(--color-space-surface)", paddingBottom: 16 }}>
                    <div style={{ width: 4, background: "var(--color-accent-primary)", flexShrink: 0 }} />
                    <h2 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 24,
                      textTransform: "uppercase",
                      color: "var(--color-text-primary)",
                      fontWeight: 700,
                      margin: 0,
                    }}>
                      {renderInline(paragraph.replace("## ", ""))}
                    </h2>
                  </div>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} style={{ padding: "0 0 0 24px", margin: "16px 0", listStyleType: "square" }}>
                    {paragraph.split("\n").map((line, j) => {
                      if (!line.trim()) return null;
                      return (
                        <li key={j} style={{ marginBottom: 8 }}>
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
                const cleanText = paragraph.replace(/> \[!(WARNING|TIP|NOTE|IMPORTANT)\]\n> /g, "").replace(/\n> /g, " ");
                return (
                  <div key={i} style={{
                    margin: "32px 0",
                    padding: "24px",
                    background: "var(--color-space-surface)",
                    border: "1px solid var(--color-accent-secondary)",
                    color: "var(--color-text-primary)",
                  }}>
                    <strong style={{ color: "var(--color-accent-primary)", display: "block", marginBottom: 12, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: 'var(--font-mono)' }}>
                      [ {isWarning ? "WARNING" : (isTip ? "TIP" : (isImportant ? "IMPORTANT" : "NOTE"))} ]
                    </strong>
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
                    <div key={i} style={{ overflowX: "auto", margin: "32px 0", border: "1px solid var(--color-space-surface)" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                          <tr style={{ background: "var(--color-space-surface)", borderBottom: "1px solid var(--color-accent-secondary)" }}>
                            {headers.map((h, idx) => (
                              <th key={idx} style={{ padding: "16px", textAlign: "left", color: "var(--color-text-primary)", fontWeight: 600, fontFamily: 'var(--font-mono)', textTransform: "uppercase", fontSize: 12 }}>
                                {renderInline(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid var(--color-space-surface)" }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ padding: "16px", color: "var(--color-text-body)" }}>
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

              if (paragraph.startsWith("![")) {
                const match = paragraph.match(/^!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div key={i} style={{ margin: "40px 0", border: "1px solid var(--color-accent-secondary)", padding: 8 }}>
                      <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block" }} />
                      <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: "var(--color-accent-secondary)", textTransform: "uppercase", textAlign: "center" }}>
                        FIG: {match[1]}
                      </div>
                    </div>
                  );
                }
              }

              if (paragraph.startsWith("\`\`\`")) {
                const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
                return (
                  <pre key={i} style={{
                    background: "var(--color-space-surface)",
                    padding: "24px",
                    border: "1px solid var(--color-accent-secondary)",
                    overflowX: "auto",
                    margin: "32px 0",
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                  }}>
                    <code>{codeContent}</code>
                  </pre>
                );
              }


              return (
                <p key={i} style={{ marginBottom: 24 }}>
                  {renderInline(paragraph.replace(/\n/g, " "))}
                </p>
              );
            })}
          </div>
        )}

        {/* Related Skills */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--color-space-surface)" }}>
            <h3 style={{
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}>
              [ Related Skills ]
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <InteractiveLink key={skillId} href={`/skill/${skill.id}`} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--color-text-primary)",
                    fontSize: 12,
                    textTransform: "uppercase",
                    fontFamily: 'var(--font-mono)',
                    textDecoration: "none",
                    padding: "8px 16px",
                    background: "var(--color-space-void)",
                    border: `1px solid var(--color-space-surface)`,
                  }}
                  hoverStyle={{
                    borderColor: `var(--color-accent-secondary)`,
                    color: "var(--color-space-void)",
                    background: "var(--color-accent-primary)",
                  }}>
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </InteractiveLink>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Links */}
          {project.links.github && (
            <div style={{ marginTop: 32 }}>
              <InteractiveLink href={project.links.github} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-space-void)",
                fontSize: 12,
                textTransform: "uppercase",
                fontFamily: 'var(--font-mono)',
                textDecoration: "none",
                background: "var(--color-accent-primary)",
                border: "1px solid var(--color-accent-primary)",
                padding: "12px 24px",
                fontWeight: 600,
              }}
              hoverStyle={{
                background: "var(--color-space-void)",
                color: "var(--color-accent-primary)",
              }}>
                [ View on GitHub ]
              </InteractiveLink>
            </div>
          )}
          {project.links.demo && (
            <div style={{ marginTop: 32 }}>
              <InteractiveLink href={project.links.demo} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-accent-secondary)",
                fontSize: 12,
                textTransform: "uppercase",
                fontFamily: 'var(--font-mono)',
                textDecoration: "none",
                background: "var(--color-space-void)",
                border: "1px solid var(--color-accent-secondary)",
                padding: "12px 24px",
                fontWeight: 600,
              }}
              hoverStyle={{
                background: "var(--color-accent-primary)",
                color: "var(--color-space-void)",
                borderColor: "var(--color-accent-primary)",
              }}>
                [ Live Demo ]
              </InteractiveLink>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--color-space-surface)" }}>
          <InteractiveLink href="/#projects" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textTransform: "uppercase",
            color: "var(--color-accent-primary)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          hoverStyle={{
            color: "var(--color-accent-secondary)",
          }}>
            [ ← Back to Projects ]
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
