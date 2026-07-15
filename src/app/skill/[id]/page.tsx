import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
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
    <main style={pageStyles}>
      <article style={cardStyles}>
        <Link
          href="/"
          style={backLinkStyles}
        >
          ← Return to constellation
        </Link>

        <span style={categoryStyles}>
          {skill.icon} {skill.area.replace("-", " ")}
        </span>

        <h1 style={titleStyles}>{skill.name}</h1>
        <p style={descStyles}>{skill.description}</p>

        {/* Proficiency bar */}
        <div style={{ marginBottom: 24 }}>
          <span style={sectionLabelStyles}>Proficiency</span>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {[1, 2, 3].map((seg) => (
              <div key={seg} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: seg <= proficiency ? skill.color : "rgba(255,255,255,0.06)",
              }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontFamily: '"Inter", sans-serif', color: "#6B7A8D", marginTop: 4, display: "block", textTransform: "capitalize" }}>
            {skill.level}
          </span>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={sectionLabelStyles}>Related Projects</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
              {relatedProjects.map((p) => (
                <Link key={p.id} href={`/project/${p.slug}`} style={projectLinkStyles}>
                  {p.icon} {p.title}
                  <span style={{ color: "#4B5768", fontSize: 11, marginLeft: "auto" }}>
                    {p.tags.slice(0, 2).join(" · ")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}

const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  background: "#06080C",
  display: "flex",
  justifyContent: "center",
  padding: "80px 5% 60px",
  animation: "pageFadeIn 0.35s ease-out",
};
const cardStyles: React.CSSProperties = {
  maxWidth: 560, width: "100%",
  background: "#0C111A",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  padding: "32px 28px",
};
const backLinkStyles: React.CSSProperties = {
  display: "inline-block",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11, color: "#F59E0B",
  textDecoration: "none", marginBottom: 24,
};
const categoryStyles: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10, color: "#F59E0B",
  textTransform: "uppercase",
  letterSpacing: "0.12em", display: "block", marginBottom: 12,
};
const titleStyles: React.CSSProperties = {
  fontFamily: '"DM Serif Display", Georgia, serif',
  fontSize: "clamp(24px, 4vw, 36px)",
  color: "#E7EDF5", fontWeight: 400,
  letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20,
};
const descStyles: React.CSSProperties = {
  color: "#9BA9BB", fontSize: 14, lineHeight: 1.7,
  fontFamily: '"Inter", sans-serif', marginBottom: 24,
};
const sectionLabelStyles: React.CSSProperties = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  color: "#4B5768", textTransform: "uppercase",
  letterSpacing: "0.08em",
};
const projectLinkStyles: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 8,
  color: "#9BA9BB", fontSize: 13,
  fontFamily: '"Inter", sans-serif',
  textDecoration: "none", padding: "8px 12px",
  background: "rgba(255,255,255,0.02)",
  borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)",
};
