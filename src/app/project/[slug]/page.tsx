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

  const isWork = project.track === "work";

  return (
    <div style={{
      position: "relative",
      zIndex: 60,
      minHeight: "100vh",
      padding: "120px 5% 70px",
      background: "#0b0c0e",
    }}>
      <main style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: isWork ? "Work Portfolio" : "Garage Labs", href: isWork ? "/#work-portfolio" : "/#garage-labs" },
          { label: project.title },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{
            display: "inline-block",
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: isWork ? "#f8fafc" : "#cbd5e1",
            background: isWork ? "#1e222b" : "#131519",
            border: "1px solid #333a48",
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}>
            [ TRACK // {isWork ? "PROFESSIONAL & WORK PORTFOLIO" : "GARAGE LAB & HOBBY"} ]
          </span>
          <span style={{
            display: "inline-block",
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: "#64748b",
            background: "#131519",
            border: "1px solid #262a33",
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            ID: {project.slug}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          textTransform: "uppercase",
          color: "#f8fafc",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}>{project.title}</h1>

        {/* Description */}
        <p style={{
          color: "#94a3b8",
          fontSize: 16,
          lineHeight: 1.7,
          fontFamily: 'var(--font-sans)',
          marginBottom: 28,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #1e222b" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              textTransform: "uppercase",
              padding: "3px 8px",
              background: "#131519",
              border: "1px solid #262a33",
              color: "#64748b",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Content (Rich Markdown) */}
        {project.content && (
          <div style={{
            color: "#94a3b8",
            fontSize: 15,
            lineHeight: 1.75,
            fontFamily: 'var(--font-sans)',
          }}>
            {project.content.split("\n\n").map((rawParagraph, i) => {
              const paragraph = rawParagraph.trim();
              if (!paragraph) return null;
              
              const renderInline = (text: string) => {
                let html = text
                  .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #f8fafc; font-weight: 600;">$1</strong>')
                  .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: #131519; padding: 2px 6px; font-size: 0.9em; color: #f8fafc; border: 1px solid #262a33">$1</code>');
                return <span dangerouslySetInnerHTML={{ __html: html }} />;
              };

              if (paragraph.startsWith("## ")) {
                return (
                  <div key={i} style={{ margin: "44px 0 20px", borderBottom: "1px solid #1e222b", paddingBottom: 14 }}>
                    <h2 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 22,
                      textTransform: "uppercase",
                      color: "#f8fafc",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}>
                      {renderInline(paragraph.replace("## ", ""))}
                    </h2>
                  </div>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} style={{ padding: "0 0 0 20px", margin: "16px 0", listStyleType: "square" }}>
                    {paragraph.split("\n").map((line, j) => {
                      if (!line.trim()) return null;
                      return (
                        <li key={j} style={{ marginBottom: 8, color: "#94a3b8" }}>
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
                    margin: "28px 0",
                    padding: "20px 24px",
                    background: "#131519",
                    border: "1px solid #262a33",
                    color: "#94a3b8",
                  }}>
                    <strong style={{ color: "#f8fafc", display: "block", marginBottom: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: 'var(--font-mono)' }}>
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
                    <div key={i} style={{ overflowX: "auto", margin: "28px 0", border: "1px solid #262a33" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#131519", borderBottom: "1px solid #262a33" }}>
                            {headers.map((h, idx) => (
                              <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "#f8fafc", fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: "uppercase", fontSize: 11 }}>
                                {renderInline(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid #1a1d23" }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ padding: "12px 16px", color: "#94a3b8" }}>
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
                    <div key={i} style={{ margin: "32px 0", border: "1px solid #262a33", padding: 8, background: "#131519" }}>
                      <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block" }} />
                      <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: "#64748b", textTransform: "uppercase", textAlign: "center" }}>
                        FIG: {match[1]}
                      </div>
                    </div>
                  );
                }
              }

              if (paragraph.startsWith("```")) {
                const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
                return (
                  <pre key={i} style={{
                    background: "#131519",
                    padding: "20px",
                    border: "1px solid #262a33",
                    overflowX: "auto",
                    margin: "28px 0",
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                  }}>
                    <code>{codeContent}</code>
                  </pre>
                );
              }

              return (
                <p key={i} style={{ marginBottom: 20 }}>
                  {renderInline(paragraph.replace(/\n/g, " "))}
                </p>
              );
            })}
          </div>
        )}

        {/* Related Skills */}
        {project.skills.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #1e222b" }}>
            <h3 style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}>
              [ Related Engineering Disciplines ]
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <InteractiveLink key={skillId} href={`/skill/${skill.id}`} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#cbd5e1",
                    fontSize: 11,
                    textTransform: "uppercase",
                    fontFamily: 'var(--font-mono)',
                    textDecoration: "none",
                    padding: "6px 14px",
                    background: "#131519",
                    border: `1px solid #262a33`,
                  }}
                  hoverStyle={{
                    borderColor: `#94a3b8`,
                    color: "#f8fafc",
                  }}>
                    <span>{skill.name}</span>
                  </InteractiveLink>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
          {project.links.github && (
            <InteractiveLink href={project.links.github} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#0b0c0e",
              fontSize: 11,
              textTransform: "uppercase",
              fontFamily: 'var(--font-mono)',
              textDecoration: "none",
              background: "#e2e8f0",
              border: "1px solid #e2e8f0",
              padding: "10px 22px",
              fontWeight: 700,
            }}
            hoverStyle={{
              background: "#0b0c0e",
              color: "#e2e8f0",
            }}>
              [ View Upstream / Repository ]
            </InteractiveLink>
          )}
          {project.links.demo && (
            <InteractiveLink href={project.links.demo} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#cbd5e1",
              fontSize: 11,
              textTransform: "uppercase",
              fontFamily: 'var(--font-mono)',
              textDecoration: "none",
              background: "#131519",
              border: "1px solid #262a33",
              padding: "10px 22px",
              fontWeight: 700,
            }}
            hoverStyle={{
              borderColor: "#94a3b8",
              color: "#f8fafc",
            }}>
              [ Live Demo &rarr; ]
            </InteractiveLink>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid #1e222b" }}>
          <InteractiveLink href={isWork ? "/#work-portfolio" : "/#garage-labs"} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: "uppercase",
            color: "#94a3b8",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          hoverStyle={{
            color: "#f8fafc",
          }}>
            [ &larr; Back to {isWork ? "Work Portfolio" : "Garage & Hobbies"} ]
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
