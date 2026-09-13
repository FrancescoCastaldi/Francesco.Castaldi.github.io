// Server component with generateStaticParams
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InteractiveLink from "@/components/ui/InteractiveLink";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";

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
      padding: "120px 5% 70px",
      background: "#0E100F",
    }}>
      <main style={{ maxWidth: 840, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Selected Work", href: "/#work" },
          { label: project.title },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#C1622D",
            background: "rgba(193, 98, 45, 0.12)",
            border: "1px solid rgba(193, 98, 45, 0.3)",
            borderRadius: 3,
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}>
            PILLAR {project.pillarRoman} • {project.pillar.toUpperCase()}
          </span>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#C9C5BC",
            background: "#2A2D2B",
            border: "1px solid rgba(201, 197, 188, 0.2)",
            borderRadius: 3,
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            FOLIO ID: {project.slug}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 400,
          color: "#EDE8DE",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          marginBottom: 16,
        }}>{project.title}</h1>

        {/* Description */}
        <p style={{
          color: "#C9C5BC",
          fontSize: 16,
          lineHeight: 1.75,
          fontFamily: "var(--font-body)",
          marginBottom: 28,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(201, 197, 188, 0.15)" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              padding: "4px 10px",
              background: "#2A2D2B",
              border: "1px solid rgba(201, 197, 188, 0.2)",
              borderRadius: 3,
              color: "#EDE8DE",
            }}>{tag}</span>
          ))}
        </div>

        {/* Full Markdown content rendering */}
        {project.content && (
          <div style={{
            color: "#C9C5BC",
            lineHeight: 1.8,
            fontSize: 15,
            fontFamily: "var(--font-body)",
            marginBottom: 48,
          }}>
            {project.content.split("\n\n").map((paragraph, i) => {
              const renderInline = (text: string) => {
                const boldRegex = /\*\*(.*?)\*\*/g;
                const parts = [];
                let lastIndex = 0;
                let match;
                while ((match = boldRegex.exec(text)) !== null) {
                  if (match.index > lastIndex) {
                    parts.push(text.slice(lastIndex, match.index));
                  }
                  parts.push(<strong key={match.index} style={{ color: "#EDE8DE", fontWeight: 600 }}>{match[1]}</strong>);
                  lastIndex = match.index + match[0].length;
                }
                if (lastIndex < text.length) {
                  parts.push(text.slice(lastIndex));
                }
                return parts.length > 0 ? parts : text;
              };

              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#EDE8DE",
                    marginTop: 40,
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
                  }}>
                    {renderInline(paragraph.replace("### ", ""))}
                  </h3>
                );
              }

              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    fontWeight: 400,
                    color: "#EDE8DE",
                    marginTop: 48,
                    marginBottom: 20,
                    paddingBottom: 10,
                    borderBottom: "1px solid rgba(201, 197, 188, 0.2)",
                  }}>
                    {renderInline(paragraph.replace("## ", ""))}
                  </h2>
                );
              }

              if (paragraph.startsWith("> ")) {
                const cleanText = paragraph.replace(/^> \*\*.*?\*\*:? ?/, "").replace(/^> /, "");
                const calloutMatch = paragraph.match(/^> \*\*(.*?)\*\*:?/);
                const calloutTitle = calloutMatch ? calloutMatch[1] : "ARCHIVAL EXCERPT";

                return (
                  <div key={i} style={{
                    margin: "24px 0",
                    padding: "18px 22px",
                    borderLeft: "3px solid #C1622D",
                    background: "#2A2D2B",
                    border: "1px solid rgba(201, 197, 188, 0.15)",
                    borderRadius: 4,
                    color: "#EDE8DE",
                  }}>
                    <strong style={{ color: "#C1622D", display: "block", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                      {calloutTitle}
                    </strong>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "#C9C5BC" }}>
                      {renderInline(cleanText)}
                    </div>
                  </div>
                );
              }

              if (paragraph.startsWith("|") && paragraph.includes("|---|")) {
                const rows = paragraph.split("\n").filter(r => r.trim().startsWith("|"));
                if (rows.length > 2) {
                  const headers = rows[0].split("|").slice(1, -1).map(s => s.trim());
                  const bodyRows = rows.slice(2).map(r => r.split("|").slice(1, -1).map(s => s.trim()));
                  
                  return (
                    <div key={i} style={{ overflowX: "auto", margin: "28px 0", border: "1px solid rgba(201, 197, 188, 0.18)", background: "#2A2D2B", borderRadius: 4 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#1F3329", borderBottom: "1px solid rgba(201, 197, 188, 0.2)" }}>
                            {headers.map((h, idx) => (
                              <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "#EDE8DE", fontWeight: 600, fontFamily: "var(--font-body)", textTransform: "uppercase", fontSize: 12 }}>
                                {renderInline(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid rgba(201, 197, 188, 0.1)" }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ padding: "12px 16px", color: "#C9C5BC" }}>
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
                    <div key={i} style={{ margin: "32px 0", border: "1px solid rgba(201, 197, 188, 0.2)", padding: 8, background: "#2A2D2B", borderRadius: 4 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block", borderRadius: 2 }} />
                      <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "#C9C5BC", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.06em" }}>
                        FIGURE: {match[1]}
                      </div>
                    </div>
                  );
                }
              }

              if (paragraph.startsWith("```")) {
                const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
                return (
                  <pre key={i} style={{
                    background: "#0E100F",
                    padding: "20px",
                    border: "1px solid rgba(201, 197, 188, 0.18)",
                    borderRadius: 4,
                    overflowX: "auto",
                    margin: "28px 0",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#EDE8DE",
                    lineHeight: 1.6,
                  }}>
                    <code>{codeContent}</code>
                  </pre>
                );
              }

              return (
                <p key={i} style={{ marginBottom: 20 }}>
                  {renderInline(paragraph)}
                </p>
              );
            })}
          </div>
        )}

        {/* Associated Skills */}
        <div style={{ marginBottom: 48, paddingTop: 28, borderTop: "1px solid rgba(201, 197, 188, 0.15)" }}>
          <h3 style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "#C1622D",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 16,
          }}>
            LINKED COMPETENCIES & ARCHIVAL TRACEABILITY
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {project.skills.map((skillId) => {
              const skill = skills.find((s) => s.id === skillId);
              return (
                <InteractiveLink key={skillId} href={`/skill/${skillId}`} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#2A2D2B",
                  border: "1px solid rgba(201, 197, 188, 0.2)",
                  borderRadius: 4,
                  padding: "8px 14px",
                  color: "#EDE8DE",
                  textDecoration: "none",
                  fontSize: 13,
                  fontFamily: "var(--font-body)",
                }}
                hoverStyle={{
                  borderColor: "#C1622D",
                  color: "#C1622D",
                }}>
                  <span>{skill?.name || skillId}</span>
                  <span style={{ fontSize: 10, color: "#C1622D" }}>↗</span>
                </InteractiveLink>
              );
            })}
          </div>
        </div>

        {/* Project Links / External Repositories */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
          {project.links.github && (
            <InteractiveLink href={project.links.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#EDE8DE",
              fontSize: 13,
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              background: "#C1622D",
              border: "1px solid #C1622D",
              borderRadius: 4,
              padding: "11px 22px",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
            hoverStyle={{
              background: "transparent",
              color: "#EDE8DE",
            }}>
              <span>Examine Upstream Repository</span>
              <ArrowRightIcon size={14} color="currentColor" />
            </InteractiveLink>
          )}
          {project.links.demo && (
            <InteractiveLink href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#EDE8DE",
              fontSize: 13,
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              background: "#1F3329",
              border: "1px solid rgba(201, 197, 188, 0.35)",
              borderRadius: 4,
              padding: "11px 22px",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
            hoverStyle={{
              borderColor: "#C1622D",
              color: "#C1622D",
            }}>
              <span>Consult Live Demonstration</span>
              <ArrowRightIcon size={14} color="#C1622D" />
            </InteractiveLink>
          )}
        </div>

        {/* Bottom nav backlink */}
        <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(201, 197, 188, 0.15)" }}>
          <InteractiveLink href="/#work" style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            textTransform: "uppercase",
            color: "#C1622D",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
          hoverStyle={{
            color: "#EDE8DE",
          }}>
            <ArrowLeftIcon size={14} color="currentColor" />
            <span>Return to Selected Work</span>
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}