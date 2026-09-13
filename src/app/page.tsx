"use client";
import { useEffect } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );

      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, []);

  const workProjects = projects.filter((p) => p.track === "work");
  const hobbyProjects = projects.filter((p) => p.track === "hobby");
  const automotivePosts = blogPosts.filter((p) => p.category === "Automotive" || p.tags.includes("Toyota"));

  const engineeringBoards = [
    { id: "openSource", code: "I.", title: "Open Source & Upstream", desc: "Upstream engineering on Evidence BI (Svelte), Apache Superset AST optimizers, Docker CLI plugins, and DuckDB pipelines.", tag: "UPSTREAM" },
    { id: "automotive", code: "II.", title: "Automotive & Powertrain HEV", desc: "Dynamic Force M15A engine kinematics, Goodman-Smith fatigue modeling, CAN telemetry, and hybrid hyper-miling.", tag: "AUTOMOTIVE" },
    { id: "radar", code: "III.", title: "Radar Nowcasting & ML", desc: "Dual-polarization Doppler radar storm cell tracking, optical flow velocity fields, and convective hail prediction models.", tag: "RADAR_AI" },
    { id: "cloud", code: "IV.", title: "Cloud Native & Systems", desc: "Kubernetes operators, air-gapped Helm chart infrastructure, Docker CLI extensions, and secure deployment architectures.", tag: "CLOUD_DEVOPS" },
    { id: "web3d", code: "V.", title: "3D WebGL & Graphic Pipelines", desc: "Three.js shader pipelines, dynamic planar texture projection on non-planar meshes, and automated Tech Pack export.", tag: "WEBGL_3D" },
    { id: "cycling", code: "VI.", title: "Cycling Telematics & Wear Analytics", desc: "Drivetrain friction decay models, Strava/Garmin FIT telemetry parsing, and predictive maintenance algorithms.", tag: "TELEMETRY" },
  ];

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 80, background: "#121110" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* --- TRACK 01: PROFESSIONAL & WORK PORTFOLIO --- */}
      <section
        id="work-portfolio"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 70px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 13,
                color: "#C5A059",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              I. Selected Engineering & Upstream Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 600,
                color: "#FAF6EE",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Professional Portfolio & Upstream Engineering
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#E8E3D6", margin: "8px 0 0", maxWidth: 700, opacity: 0.88, lineHeight: 1.65 }}>
              Enterprise open-source systems, production data pipelines, corporate UX architecture, and academic/clinical research.
            </p>
          </div>

          <a
            href="https://github.com/FrancescoCastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
              color: "#FAF6EE",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              padding: "10px 20px",
              background: "rgba(197, 160, 89, 0.12)",
              borderRadius: 4,
              textDecoration: "none",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C5A059";
              e.currentTarget.style.background = "#15261E";
              e.currentTarget.style.color = "#C5A059";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.35)";
              e.currentTarget.style.background = "rgba(197, 160, 89, 0.12)";
              e.currentTarget.style.color = "#FAF6EE";
            }}
          >
            GitHub Repository Archive &rarr;
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 20,
          }}
        >
          {workProjects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                padding: 28,
                textDecoration: "none",
                transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1B2E24";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "#C5A059", fontWeight: 600, letterSpacing: "0.06em" }}>
                  FOLIO — {project.label}
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 11, padding: "2px 8px", background: "#1B2E24", color: "#FAF6EE", border: "1px solid rgba(197, 160, 89, 0.25)", borderRadius: 3, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em" }}>
                  UPSTREAM WORK
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "#FAF6EE", marginBottom: 12, lineHeight: 1.35 }}>
                {project.title}
              </h3>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#E8E3D6", lineHeight: 1.65, marginBottom: 20, flex: 1, opacity: 0.9 }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid rgba(197, 160, 89, 0.14)", paddingTop: 14 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--font-serif)",
                      padding: "3px 8px",
                      background: "rgba(197, 160, 89, 0.08)",
                      color: "#C5A059",
                      border: "1px solid rgba(197, 160, 89, 0.22)",
                      borderRadius: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- TRACK 02: GARAGE LABS & HOBBY BUILDS --- */}
      <section
        id="garage-labs"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 13,
              color: "#C5A059",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            II. Experimental Labs & Automotive Workshop
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 600,
              color: "#FAF6EE",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Garage Labs, Automotive & Maker Workshop
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#E8E3D6", margin: "8px 0 0", maxWidth: 700, opacity: 0.88, lineHeight: 1.65 }}>
            Personal technical experiments, automotive powertrain kinematics, 3D WebGL apparel customizers, cycling telemetry, and hardware reverse engineering.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {hobbyProjects.map((project) => (
            <Link
              href={`/project/${project.slug}`}
              key={project.id}
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                padding: 28,
                transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1B2E24";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "#C5A059", letterSpacing: "0.06em", fontWeight: 600 }}>
                  FOLIO — {project.label}
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 11, padding: "2px 8px", background: "#1B2E24", color: "#FAF6EE", border: "1px solid rgba(197, 160, 89, 0.25)", borderRadius: 3, textTransform: "uppercase", fontWeight: 600 }}>
                  WORKSHOP
                </span>
              </div>
              <h3
                style={{
                  color: "#FAF6EE",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  fontSize: 20,
                  marginBottom: 12,
                  lineHeight: 1.35,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "#E8E3D6",
                  lineHeight: 1.65,
                  marginBottom: 20,
                  flex: 1,
                  opacity: 0.9,
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, borderTop: "1px solid rgba(197, 160, 89, 0.14)", paddingTop: 14 }}>
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      color: "#C5A059",
                      border: "1px solid rgba(197, 160, 89, 0.22)",
                      background: "rgba(197, 160, 89, 0.08)",
                      borderRadius: 3,
                      padding: "3px 8px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- AUTOMOTIVE & KINEMATICS LOGS --- */}
      <section
        id="automotive-hub"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 70px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 13,
                color: "#C5A059",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              III. Automotive Kinematics & Track Systems
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 600,
                color: "#FAF6EE",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Automotive Engineering & HEV Telematics
            </h2>
          </div>

          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
              color: "#FAF6EE",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              padding: "10px 20px",
              background: "rgba(197, 160, 89, 0.12)",
              borderRadius: 4,
              textDecoration: "none",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C5A059";
              e.currentTarget.style.background = "#15261E";
              e.currentTarget.style.color = "#C5A059";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.35)";
              e.currentTarget.style.background = "rgba(197, 160, 89, 0.12)";
              e.currentTarget.style.color = "#FAF6EE";
            }}
          >
            View Full Archival Index &rarr;
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {automotivePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                padding: 26,
                textDecoration: "none",
                transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1B2E24";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, fontSize: 11, fontFamily: "var(--font-serif)", color: "#C5A059", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                <span>{post.subcategory || post.category}</span>
                <span style={{ color: "#9E978E" }}>{post.readingTime} MIN READ</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "#FAF6EE", marginBottom: 12, lineHeight: 1.35 }}>
                {post.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#E8E3D6", lineHeight: 1.65, marginBottom: 20, flex: 1, opacity: 0.9 }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid rgba(197, 160, 89, 0.14)", paddingTop: 14 }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-serif)", padding: "3px 8px", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", border: "1px solid rgba(197, 160, 89, 0.22)", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 11, fontFamily: "var(--font-serif)", padding: "3px 8px", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", border: "1px solid rgba(197, 160, 89, 0.22)", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {post.subcategory}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- TECHNICAL DISCIPLINES / EXPERTISE MATRIX --- */}
      <section
        id="expertise"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 70px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 13,
              color: "#C5A059",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            IV. Curated Engineering Disciplines
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 600,
              color: "#FAF6EE",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Core Competencies & Engineering Focus
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 16,
          }}
        >
          {engineeringBoards.map((board) => (
            <div
              key={board.id}
              style={{
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                padding: 26,
                transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1B2E24";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
                e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "#C5A059", fontWeight: 700 }}>
                  {board.code}
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 11, padding: "2px 8px", background: "#1B2E24", color: "#FAF6EE", border: "1px solid rgba(197, 160, 89, 0.25)", borderRadius: 3, letterSpacing: "0.04em" }}>
                  {board.tag}
                </span>
              </div>
              <h3
                style={{
                  color: "#FAF6EE",
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 10,
                  letterSpacing: "0.01em",
                }}
              >
                {board.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "#E8E3D6",
                  lineHeight: 1.65,
                  margin: 0,
                  opacity: 0.88,
                }}
              >
                {board.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- RECENT ARTICLES & RESEARCH GUIDES --- */}
      <section
        id="blog"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 13,
              color: "#C5A059",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            V. Archival Monographs & Selected Essays
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 600,
              color: "#FAF6EE",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Featured Archival Monographs & Research
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.22)",
                borderRadius: 6,
                padding: 26,
                transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1B2E24";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.45)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(197, 160, 89, 0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#15261E";
                e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.22)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  color: "#C5A059",
                  marginBottom: 14,
                  borderBottom: "1px solid rgba(197, 160, 89, 0.14)",
                  paddingBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span style={{ color: "#9E978E" }}>{post.readingTime} MIN READ</span>
              </div>
              <h3
                style={{
                  color: "#FAF6EE",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  fontSize: 20,
                  marginBottom: 12,
                  lineHeight: 1.35,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "#E8E3D6",
                  lineHeight: 1.65,
                  marginBottom: 20,
                  flex: 1,
                  opacity: 0.9,
                }}
              >
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid rgba(197, 160, 89, 0.14)", paddingTop: 14 }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-serif)", padding: "3px 8px", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", border: "1px solid rgba(197, 160, 89, 0.22)", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 11, fontFamily: "var(--font-serif)", padding: "3px 8px", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", border: "1px solid rgba(197, 160, 89, 0.22)", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {post.subcategory}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#121110",
              background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
              border: "1px solid #C5A059",
              padding: "13px 28px",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(197, 160, 89, 0.2)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(197, 160, 89, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)";
              e.currentTarget.style.color = "#121110";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(197, 160, 89, 0.2)";
            }}
          >
            Browse Complete Essays Index &rarr;
          </Link>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 13,
            color: "#C5A059",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            display: "block",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          VI. Direct Inquiries & Archival Liaison
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#FAF6EE",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Direct Correspondence & Scholarly Exchange
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "#E8E3D6",
            lineHeight: 1.7,
            marginBottom: 36,
            opacity: 0.9,
          }}
        >
          Open for upstream open-source collaboration, automotive engineering exchanges, data science systems, or specialized architectural consultation.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:info@francescocastaldi.it"
            style={{
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#121110",
              background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
              padding: "13px 28px",
              border: "1px solid #C5A059",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(197, 160, 89, 0.2)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(197, 160, 89, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)";
              e.currentTarget.style.color = "#121110";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(197, 160, 89, 0.2)";
            }}
          >
            Direct Correspondence
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-serif)",
              textTransform: "uppercase",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#FAF6EE",
              background: "rgba(21, 38, 30, 0.7)",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              borderRadius: 4,
              padding: "13px 28px",
              textDecoration: "none",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C5A059";
              e.currentTarget.style.color = "#C5A059";
              e.currentTarget.style.background = "#15261E";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.35)";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.background = "rgba(21, 38, 30, 0.7)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Curriculum Vitae / LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
