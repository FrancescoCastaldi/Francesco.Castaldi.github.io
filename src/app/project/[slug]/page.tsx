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

  const isWork = project.track === "work";

  return (
    <div style={{
      position: "relative",
      zIndex: 60,
      minHeight: "100vh",
      padding: "120px 5% 70px",
      background: "#121110",
    }}>
      <main style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: isWork ? "Work Portfolio" : "Garage Labs", href: isWork ? "/#work-portfolio" : "/#garage-labs" },
          { label: project.title },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-serif)",
            fontSize: 11,
            color: "#C5A059",
            background: "rgba(197, 160, 89, 0.08)",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            borderRadius: 3,
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}>
            I. PROJECT MONOGRAPH • {isWork ? "SELECTED WORKS" : "EXPERIMENTAL ATELIER"}
          </span>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-serif)",
            fontSize: 11,
            color: "#9E978E",
            background: "#15261E",
            border: "1px solid rgba(197, 160, 89, 0.2)",
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
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(30px, 4vw, 46px)",
          fontWeight: 600,
          color: "#FAF6EE",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          marginBottom: 16,
        }}>{project.title}</h1>

        {/* Description */}
        <p style={{
          color: "#E8E3D6",
          fontSize: 16,
          lineHeight: 1.75,
          fontFamily: "var(--font-body)",
          marginBottom: 28,
          opacity: 0.92,
        }}>{project.longDescription}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(197, 160, 89, 0.18)" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11,
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              padding: "3px 8px",
              background: "rgba(197, 160, 89, 0.08)",
              border: "1px solid rgba(197, 160, 89, 0.22)",
              borderRadius: 3,
              color: "#C5A059",
              letterSpacing: "0.04em",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Content (Rich Markdown) */}
        {project.content && (
          <div style={{
            color: "#E8E3D6",
            fontSize: 15,
            lineHeight: 1.8,
            fontFamily: "var(--font-body)",
            opacity: 0.95,
          }}>
            {project.content.split("\n\n").map((rawParagraph, i) => {
              const paragraph = rawParagraph.trim();
              if (!paragraph) return null;
              
              const renderInline = (text: string) => {
                const html = text
                  .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FAF6EE; font-weight: 600;">$1</strong>')
                  .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: #15261E; padding: 2px 6px; font-size: 0.9em; color: #C5A059; border: 1px solid rgba(197, 160, 89, 0.25); border-radius: 3px;">$1</code>');
                return <span dangerouslySetInnerHTML={{ __html: html }} />;
              };

              if (paragraph.startsWith("## ")) {
                return (
                  <div key={i} style={{ margin: "44px 0 20px", borderBottom: "1px solid rgba(197, 160, 89, 0.18)", paddingBottom: 14 }}>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 22,
                      color: "#FAF6EE",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}>
                      {renderInline(paragraph.replace("## ", ""))}
                    </h2>
                  </div>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} style={{ padding: "0 0 0 20px", margin: "16px 0", listStyleType: "circle" }}>
                    {paragraph.split("\n").map((line, j) => {
                      if (!line.trim()) return null;
                      return (
                        <li key={j} style={{ marginBottom: 8, color: "#E8E3D6" }}>
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
                const calloutTitle = isWarning ? "CAUTION" : (isTip ? "OBSERVATION" : (isImportant ? "IMPORTANT NOTICE" : "SCHOLARLY NOTE"));

                return (
                  <div key={i} style={{
                    margin: "28px 0",
                    padding: "20px 24px",
                    background: "#15261E",
                    border: "1px solid rgba(197, 160, 89, 0.28)",
                    borderRadius: 4,
                    color: "#E8E3D6",
                  }}>
                    <strong style={{ color: "#C5A059", display: "block", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                      {calloutTitle}
                    </strong>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "#E8E3D6", opacity: 0.9 }}>
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
                    <div key={i} style={{ overflowX: "auto", margin: "28px 0", border: "1px solid rgba(197, 160, 89, 0.22)", background: "#15261E", borderRadius: 4 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#1B2E24", borderBottom: "1px solid rgba(197, 160, 89, 0.25)" }}>
                            {headers.map((h, idx) => (
                              <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "#FAF6EE", fontWeight: 600, fontFamily: "var(--font-serif)", textTransform: "uppercase", fontSize: 12 }}>
                                {renderInline(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid rgba(197, 160, 89, 0.12)" }}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ padding: "12px 16px", color: "#E8E3D6" }}>
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
                    <div key={i} style={{ margin: "32px 0", border: "1px solid rgba(197, 160, 89, 0.25)", padding: 8, background: "#15261E", borderRadius: 4 }}>
                      <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block", borderRadius: 2 }} />
                      <div style={{ marginTop: 8, fontFamily: "var(--font-serif)", fontSize: 11, color: "#9E978E", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.06em" }}>
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
                    background: "#15261E",
                    padding: "20px",
                    border: "1px solid rgba(197, 160, 89, 0.22)",
                    borderRadius: 4,
                    overflowX: "auto",
                    margin: "28px 0",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#FAF6EE",
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
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(197, 160, 89, 0.18)" }}>
            <h3 style={{
              fontSize: 13,
              fontFamily: "var(--font-serif)",
              color: "#C5A059",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
              fontWeight: 600,
            }}>
              Related Disciplines & Competencies
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.skills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId);
                return skill ? (
                  <InteractiveLink key={skillId} href={`/skill/${skill.id}`} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#FAF6EE",
                    fontSize: 12,
                    textTransform: "uppercase",
                    fontFamily: "var(--font-serif)",
                    textDecoration: "none",
                    padding: "6px 14px",
                    background: "#15261E",
                    border: "1px solid rgba(197, 160, 89, 0.25)",
                    borderRadius: 3,
                    letterSpacing: "0.04em",
                  }}
                  hoverStyle={{
                    borderColor: "#C5A059",
                    color: "#C5A059",
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
              color: "#121110",
              fontSize: 12,
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
              textDecoration: "none",
              background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
              border: "1px solid #C5A059",
              borderRadius: 4,
              padding: "11px 22px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              boxShadow: "0 4px 16px rgba(197, 160, 89, 0.2)",
            }}
            hoverStyle={{
              background: "transparent",
              color: "#FAF6EE",
            }}>
              <span>Examine Upstream Repository</span>
              <ArrowRightIcon size={14} color="currentColor" />
            </InteractiveLink>
          )}
          {project.links.demo && (
            <InteractiveLink href={project.links.demo} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#FAF6EE",
              fontSize: 12,
              textTransform: "uppercase",
              fontFamily: "var(--font-serif)",
              textDecoration: "none",
              background: "#15261E",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              borderRadius: 4,
              padding: "11px 22px",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
            hoverStyle={{
              borderColor: "#C5A059",
              color: "#C5A059",
            }}>
              <span>Consult Live Demonstration</span>
              <ArrowRightIcon size={14} color="#C5A059" />
            </InteractiveLink>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(197, 160, 89, 0.18)" }}>
          <InteractiveLink href={isWork ? "/#work-portfolio" : "/#garage-labs"} style={{
            fontFamily: "var(--font-serif)",
            fontSize: 12,
            textTransform: "uppercase",
            color: "#C5A059",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
          hoverStyle={{
            color: "#FAF6EE",
          }}>
            <ArrowLeftIcon size={14} color="currentColor" />
            <span>Return to {isWork ? "Selected Works" : "Workshop & Kinematics"}</span>
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
