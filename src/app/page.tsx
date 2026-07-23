import HeroSection from "@/components/ui/HeroSection";
import ProjectCard from "@/components/ui/ProjectCard";
import SkillCard from "@/components/ui/SkillCard";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export default function Home() {

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section
        id="projects"
        className="section-entrance"
        style={{
          padding: "80px 8% 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "#F59E0B",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            Portfolio
          </span>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "#E7EDF5",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Featured Projects
          </h2>
          <div className="section-divider" />
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 15,
              color: "#9BA9BB",
              maxWidth: 520,
              margin: "20px auto 0",
              lineHeight: 1.6,
            }}
          >
            A selection of projects spanning blockchain, data science, UX design, and full-stack development.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{
                animation: "sectionFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="section-entrance"
        style={{
          padding: "80px 8% 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: "#22D3EE",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            Expertise
          </span>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "#E7EDF5",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Skills &amp; Capabilities
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, #22D3EE, transparent)" }} />
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 15,
              color: "#9BA9BB",
              maxWidth: 520,
              margin: "20px auto 0",
              lineHeight: 1.6,
            }}
          >
            Core competencies developed through academic research, professional consulting, and hands-on building.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              style={{
                animation: "sectionFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
