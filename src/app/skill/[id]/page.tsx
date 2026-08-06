import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InteractiveLink from "@/components/ui/InteractiveLink";

export async function generateStaticParams() {
  return skills.map((s) => ({ id: s.id }));
}

export default async function SkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = skills.find((s) => s.id === id);
  if (!skill) notFound();

  const levelMap = { beginner: 1, intermediate: 2, advanced: 2, expert: 3 };
  const proficiency = levelMap[skill.level as keyof typeof levelMap] || 1;

  const relatedProjects = projects.filter((p) => p.skills.includes(skill.id));

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
          { label: "Skills", href: "/#skills" },
          { label: skill.name },
        ]} />

        {/* Category badge */}
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
          {skill.area.replace("-", " ")}
        </span>

        {/* Header with large icon and title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <span style={{
            fontSize: "clamp(40px, 6vw, 56px)",
            lineHeight: 1,
            filter: "grayscale(0.2)",
          }}>{skill.icon}</span>
          <div>
            <h1 style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              color: "#E7EDF5",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}>{skill.name}</h1>
            <div style={{
              width: 40,
              height: 2,
              background: "#F59E0B",
              borderRadius: 2,
              marginTop: 14,
            }} />
          </div>
        </div>

        {/* Proficiency */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontSize: 10,
            fontFamily: '"JetBrains Mono", monospace',
            color: "#4B5768",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
          }}>Proficiency</span>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {[1, 2, 3].map((seg) => (
              <div key={seg} style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: seg <= proficiency ? "#F59E0B" : "rgba(255,255,255,0.06)",
              }} />
            ))}
          </div>
          <span style={{
            fontSize: 10,
            fontFamily: '"Inter", sans-serif',
            color: "#6B7A8D",
            marginTop: 6,
            display: "block",
            textTransform: "capitalize",
          }}>
            {skill.level}
          </span>
        </div>

        {/* Description */}
        <p style={{
          color: "#9BA9BB",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: '"Inter", sans-serif',
          marginBottom: 24,
        }}>{skill.description}</p>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{
              fontSize: 10,
              fontFamily: '"JetBrains Mono", monospace',
              color: "#4B5768",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
            }}>Related Projects</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {relatedProjects.map((p) => (
                <InteractiveLink key={p.id} href={`/project/${p.slug}`} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  border: `1px solid ${p.color}20`,
                }}
                hoverStyle={{
                  borderColor: `${p.color}50`,
                  background: "rgba(255,255,255,0.05)",
                }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#E7EDF5", fontSize: 13, marginBottom: 2 }}>{p.title}</div>
                    <div style={{ color: "#4B5768", fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }}>
                      {p.tags.slice(0, 3).join(" \u00B7 ")}
                    </div>
                  </div>
                  <span style={{ color: "#F59E0B", fontSize: 12 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </InteractiveLink>
              ))}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <InteractiveLink href="/#skills" style={{
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
            Back to Skills
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
