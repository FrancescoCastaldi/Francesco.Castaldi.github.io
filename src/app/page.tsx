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

  const openSourceProjects = projects.filter((p) => p.skills.includes("open-source"));
  const featuredBuilds = projects.filter((p) => !p.skills.includes("open-source") && p.featured);
  const automotivePosts = blogPosts.filter((p) => p.category === "Automotive" || p.tags.includes("Toyota"));

  const engineeringBoards = [
    { id: "openSource", code: "ENG_01", title: "Open Source & Upstream", desc: "Upstream engineering on Evidence BI (Svelte), Apache Superset AST optimizers, Docker CLI plugins, and DuckDB pipelines.", tag: "UPSTREAM" },
    { id: "automotive", code: "ENG_02", title: "Automotive & Powertrain HEV", desc: "Dynamic Force M15A engine kinematics, Goodman-Smith fatigue modeling, CAN telemetry, and hybrid hyper-miling.", tag: "AUTOMOTIVE" },
    { id: "radar", code: "ENG_03", title: "Radar Nowcasting & ML", desc: "Dual-polarization Doppler radar storm cell tracking, optical flow velocity fields, and convective hail prediction models.", tag: "RADAR_AI" },
    { id: "cloud", code: "ENG_04", title: "Cloud Native & Systems", desc: "Kubernetes operators, air-gapped Helm chart infrastructure, Docker CLI extensions, and secure deployment architectures.", tag: "CLOUD_DEVOPS" },
    { id: "web3d", code: "ENG_05", title: "3D WebGL & Graphic Pipelines", desc: "Three.js shader pipelines, dynamic planar texture projection on non-planar meshes, and automated Tech Pack export.", tag: "WEBGL_3D" },
    { id: "cycling", code: "ENG_06", title: "Cycling Telematics & Wear Analytics", desc: "Drivetrain friction decay models, Strava/Garmin FIT telemetry parsing, and predictive maintenance algorithms.", tag: "TELEMETRY" },
  ];

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 80, background: "#0b0c0e" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* --- OPEN SOURCE CONTRIBUTIONS SECTION --- */}
      <section
        id="open-source"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 70px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e222b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: 8,
              }}
            >
              [ 01 // UPSTREAM_CONTRIBUTIONS ]
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 800,
                color: "#f8fafc",
                letterSpacing: "-0.03em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Open Source Contributions & Upstream PRs
            </h2>
          </div>

          <a
            href="https://github.com/FrancescoCastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              color: "#cbd5e1",
              border: "1px solid #262a33",
              padding: "8px 16px",
              background: "#131519",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#94a3b8";
              e.currentTarget.style.color = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262a33";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            [ GitHub @FrancescoCastaldi &rarr; ]
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 20,
          }}
        >
          {openSourceProjects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#131519",
                border: "1px solid #262a33",
                padding: 26,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475164";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#cbd5e1", fontWeight: 700 }}>
                  [{project.label}]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 8px", background: "#1a1d23", color: "#94a3b8", border: "1px solid #262a33", textTransform: "uppercase" }}>
                  UPSTREAM
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 12, lineHeight: 1.35, textTransform: "uppercase" }}>
                {project.title}
              </h3>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid #1e222b", paddingTop: 14 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      fontFamily: "var(--font-mono)",
                      padding: "3px 7px",
                      background: "#1a1d23",
                      color: "#64748b",
                      border: "1px solid #262a33",
                      textTransform: "uppercase",
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

      {/* --- FEATURED SYSTEMS & GRAPHICS BUILDS --- */}
      <section
        id="projects"
        className="scroll-reveal"
        style={{
          padding: "90px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e222b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ 02 // SYSTEMS_AND_BUILDS ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Software, 3D Graphics & Engineering Projects
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {featuredBuilds.map((project) => (
            <Link
              href={`/project/${project.slug}`}
              key={project.id}
              style={{
                display: "block",
                textDecoration: "none",
                background: "#131519",
                border: "1px solid #262a33",
                padding: 26,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475164";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#cbd5e1", textTransform: "uppercase" }}>
                  [ {project.slug} ]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 6px", background: "#1a1d23", color: "#cbd5e1", border: "1px solid #262a33" }}>
                  DEPLOYED
                </span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 12,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      color: "#64748b",
                      border: "1px solid #262a33",
                      background: "#1a1d23",
                      padding: "3px 7px",
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
          borderBottom: "1px solid #1e222b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: 8,
              }}
            >
              [ 03 // AUTOMOTIVE_KINEMATICS ]
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 800,
                color: "#f8fafc",
                letterSpacing: "-0.03em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Automotive Engineering & HEV Telematics
            </h2>
          </div>

          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              color: "#cbd5e1",
              border: "1px solid #262a33",
              padding: "8px 16px",
              background: "#131519",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#94a3b8";
              e.currentTarget.style.color = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262a33";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            [ View All Technical Logs &rarr; ]
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
                background: "#131519",
                border: "1px solid #262a33",
                padding: 24,
                textDecoration: "none",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475164";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, fontSize: 10, fontFamily: "var(--font-mono)", color: "#cbd5e1", textTransform: "uppercase" }}>
                <span>[ {post.subcategory || post.category} ]</span>
                <span style={{ color: "#64748b" }}>{post.readingTime} MIN READ</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 12, lineHeight: 1.35, textTransform: "uppercase" }}>
                {post.title}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid #1e222b", paddingTop: 14 }}>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 7px", background: "#1a1d23", color: "#cbd5e1", border: "1px solid #262a33", textTransform: "uppercase" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 7px", background: "#1a1d23", color: "#64748b", border: "1px solid #262a33", textTransform: "uppercase" }}>
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
          borderBottom: "1px solid #1e222b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ 04 // TECHNICAL_DISCIPLINES ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
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
                background: "#131519",
                border: "1px solid #262a33",
                padding: 26,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475164";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#cbd5e1", fontWeight: 700 }}>
                  [{board.code}]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 6px", background: "#1a1d23", color: "#64748b", border: "1px solid #262a33" }}>
                  {board.tag}
                </span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                }}
              >
                {board.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  margin: 0,
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
          borderBottom: "1px solid #1e222b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ 05 // TECHNICAL_PUBLICATIONS ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Featured Technical Articles & Research
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
                background: "#131519",
                border: "1px solid #262a33",
                padding: 24,
                transition: "all 0.2s ease",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475164";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#262a33";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                  marginBottom: 14,
                  borderBottom: "1px solid #1e222b",
                  paddingBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span style={{ color: "#64748b" }}>{post.readingTime} MIN READ</span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 17,
                  marginBottom: 12,
                  lineHeight: 1.35,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 7px", background: "#1a1d23", color: "#cbd5e1", border: "1px solid #262a33", textTransform: "uppercase" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 7px", background: "#1a1d23", color: "#64748b", border: "1px solid #262a33", textTransform: "uppercase" }}>
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
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              fontSize: 11,
              fontWeight: 700,
              color: "#f8fafc",
              background: "#131519",
              border: "1px solid #262a33",
              padding: "12px 28px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e2e8f0";
              e.currentTarget.style.color = "#0b0c0e";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#131519";
              e.currentTarget.style.color = "#f8fafc";
              e.currentTarget.style.borderColor = "#262a33";
            }}
          >
            [ Index of All Technical Articles &rarr; ]
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
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 8,
          }}
        >
          [ 06 // DIRECT_COMMUNICATION ]
        </span>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(26px, 3.2vw, 38px)",
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          Let's Connect & Collaborate
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "#94a3b8",
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          Open for upstream open source collaboration, automotive engineering exchanges, data science systems, or full-stack software development.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:info@francescocastaldi.it"
            style={{
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 700,
              color: "#0b0c0e",
              background: "#e2e8f0",
              padding: "12px 28px",
              border: "1px solid #e2e8f0",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0b0c0e";
              e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e2e8f0";
              e.currentTarget.style.color = "#0b0c0e";
            }}
          >
            [ Direct Email ]
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 700,
              color: "#cbd5e1",
              background: "#131519",
              border: "1px solid #262a33",
              padding: "12px 28px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#94a3b8";
              e.currentTarget.style.color = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262a33";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            [ LinkedIn Profile ]
          </a>
        </div>
      </section>
    </div>
  );
}


