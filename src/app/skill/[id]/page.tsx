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

  const relatedProjects = projects.filter((p) => p.skills.includes(skill.id));

  return (
    <div style={{
      position: "relative",
      zIndex: 60,
      minHeight: "100vh",
      padding: "120px 5% 70px",
      background: "#0E100F",
    }}>
      <main style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Expertise", href: "/#expertise" },
          { label: skill.name },
        ]} />

        {/* Category badge */}
        <div style={{ marginTop: 24, marginBottom: 16 }}>
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
            DISCIPLINE // {skill.area.toUpperCase()}
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 400,
            color: "#EDE8DE",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}>{skill.name}</h1>
        </div>

        {/* Proficiency */}
        <div style={{ marginBottom: 32, background: "#2A2D2B", padding: "16px 20px", borderRadius: 4, border: "1px solid rgba(201, 197, 188, 0.15)" }}>
          <span style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "#C9C5BC",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
            marginBottom: 6,
          }}>PROFICIENCY PROFILE // {skill.level.toUpperCase()}</span>
          <p style={{
            color: "#C9C5BC",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
            margin: 0,
          }}>{skill.description}</p>
        </div>

        {/* Related Projects */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(201, 197, 188, 0.15)",
            paddingBottom: 10,
            marginBottom: 20,
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              color: "#EDE8DE",
            }}>
              Demonstrated In Projects
            </h2>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C9C5BC" }}>
              {relatedProjects.length} records
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {relatedProjects.map((p) => (
              <InteractiveLink key={p.slug} href={`/project/${p.slug}`} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                border: "1px solid rgba(201, 197, 188, 0.18)",
                borderRadius: 4,
                textDecoration: "none",
                color: "#EDE8DE",
                background: "#2A2D2B",
                transition: "all 0.2s ease",
              }}
              hoverStyle={{
                borderColor: "#C1622D",
                background: "#1F3329",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C1622D", marginBottom: 4 }}>
                    PILLAR {p.pillarRoman} • {p.pillar.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#EDE8DE" }}>
                    {p.title}
                  </div>
                </div>
                <ArrowRightIcon size={14} color="#C1622D" />
              </InteractiveLink>
            ))}
          </div>
        </div>

        {/* Return backlink */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(201, 197, 188, 0.15)" }}>
          <InteractiveLink href="/#expertise" style={{
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
            <span>Return to Expertise Constellation</span>
          </InteractiveLink>
        </div>
      </main>
    </div>
  );
}