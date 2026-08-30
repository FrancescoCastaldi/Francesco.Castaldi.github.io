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
      padding: "120px 5% 70px",
      background: "#0b0c0e",
    }}>
      <main style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Skills", href: "/#expertise" },
          { label: skill.name },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <span style={{
            display: "inline-block",
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: "#cbd5e1",
            background: "#131519",
            border: "1px solid #262a33",
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}>
            [ DISCIPLINE // {skill.area.replace("-", " ")} ]
          </span>
        </div>

        {/* Header with large icon and title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}>{skill.name}</h1>
          </div>
        </div>

        {/* Proficiency */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
          }}>PROFICIENCY LEVEL &bull; {skill.level}</span>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {[1, 2, 3].map((seg) => (
              <div key={seg} style={{
                flex: 1,
                height: 3,
                background: seg <= proficiency ? "#e2e8f0" : "#1a1d23",
              }} />
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: "#94a3b8",
          fontSize: 15,
          lineHeight: 1.75,
          fontFamily: 'var(--font-sans)',
          marginBottom: 28,
        }}>{skill.description}</p>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid #1e222b" }}>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: 14,
            }}>[ Related Systems & Builds ]</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {relatedProjects.map((p) => (
                <InteractiveLink key={p.id} href={`/project/${p.slug}`} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  padding: "14px 18px",
                  background: "#131519",
                  border: `1px solid #262a33`,
                }}
                hoverStyle={{
                  borderColor: `#475164`,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#f8fafc", fontSize: 14, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{p.title}</div>
                    <div style={{ color: "#64748b", fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: "uppercase" }}>
                      {p.tags.slice(0, 4).join(" \u00B7 ")}
                    </div>
                  </div>
                  <span style={{ color: "#cbd5e1", fontSize: 12, fontFamily: "var(--font-mono)" }}>
                    [&rarr;]
                  </span>
                </InteractiveLink>
              ))}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #1e222b" }}>
          <InteractiveLink href="/#expertise" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: "#94a3b8",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textTransform: "uppercase",
          }}
          hoverStyle={{
            color: "#f8fafc",
          }}>
            [ &larr; Back to Competencies ]
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
