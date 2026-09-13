import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InteractiveLink from "@/components/ui/InteractiveLink";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";

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
      background: "#121110",
    }}>
      <main style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Disciplines", href: "/#expertise" },
          { label: skill.name },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16 }}>
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
            DISCIPLINE • {skill.area.replace("-", " ")}
          </span>
        </div>

        {/* Header with large icon and title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <div>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: "#FAF6EE",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}>{skill.name}</h1>
          </div>
        </div>

        {/* Proficiency */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontSize: 11,
            fontFamily: "var(--font-serif)",
            color: "#C5A059",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
            fontWeight: 600,
          }}>PROFICIENCY LEVEL • {skill.level}</span>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {[1, 2, 3].map((seg) => (
              <div key={seg} style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: seg <= proficiency ? "#C5A059" : "rgba(197, 160, 89, 0.2)",
              }} />
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: "#E8E3D6",
          fontSize: 16,
          lineHeight: 1.75,
          fontFamily: "var(--font-body)",
          marginBottom: 28,
          opacity: 0.92,
        }}>{skill.description}</p>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(197, 160, 89, 0.18)" }}>
            <span style={{
              fontSize: 13,
              fontFamily: "var(--font-serif)",
              color: "#C5A059",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: 14,
              fontWeight: 600,
            }}>Related Engineering Archives & Works</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {relatedProjects.map((p) => (
                <InteractiveLink key={p.id} href={`/project/${p.slug}`} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  padding: "16px 20px",
                  background: "#15261E",
                  border: "1px solid rgba(197, 160, 89, 0.22)",
                  borderRadius: 4,
                }}
                hoverStyle={{
                  borderColor: "rgba(197, 160, 89, 0.45)",
                  background: "#1B2E24",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#FAF6EE", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-serif)", marginBottom: 2 }}>{p.title}</div>
                    <div style={{ color: "#9E978E", fontSize: 11, fontFamily: "var(--font-serif)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {p.tags.slice(0, 4).join(" • ")}
                    </div>
                  </div>
                  <span style={{ color: "#C5A059", display: "inline-flex", alignItems: "center" }}>
                    <ArrowRightIcon size={14} color="#C5A059" />
                  </span>
                </InteractiveLink>
              ))}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(197, 160, 89, 0.18)" }}>
          <InteractiveLink href="/#expertise" style={{
            fontFamily: "var(--font-serif)",
            fontSize: 12,
            color: "#C5A059",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
          hoverStyle={{
            color: "#FAF6EE",
          }}>
            <ArrowLeftIcon size={14} color="currentColor" />
            <span>Return to Disciplines & Competencies</span>
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}
