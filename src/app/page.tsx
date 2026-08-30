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

  const forumBoards = [
    { id: "openSource", code: "BOARD_00", title: "Open Source & Upstream", desc: "Upstream engineering on Evidence, Apache Superset, Docker CLI, Kanister (CNCF), and DuckDB ecosystems.", color: "#38bdf8", tag: "OPEN_SOURCE" },
    { id: "automotive", code: "BOARD_01", title: "Automotive & Hybrid HEV", desc: "Toyota Yaris MK4 HEV powertrain analysis, e-CVT telematics, Focal audio upgrades, and hybrid hyper-miling.", color: "var(--color-accent-amber)", tag: "AUTOMOTIVE" },
    { id: "dataScience", code: "BOARD_02", title: "Data Science & Radar Nowcasting", desc: "Dual-polarization radar storm nowcasting, BI as code, ML fairness auditing, and statistical simulation.", color: "var(--color-accent-primary)", tag: "DATA_SCIENCE" },
    { id: "cloud", code: "BOARD_03", title: "Cloud Native & Kubernetes", desc: "Kubernetes operators, air-gapped Helm chart infrastructure, Docker CLI plugins, and CI/CD pipelines.", color: "#a78bfa", tag: "CLOUD_DEVOPS" },
    { id: "web3d", code: "BOARD_04", title: "3D WebGL & Interactive Graphics", desc: "Three.js shader pipelines, dynamic planar texture projection, and real-time client-side CAD/apparel rendering.", color: "#06b6d4", tag: "WEBGL_3D" },
    { id: "cycling", code: "BOARD_05", title: "Cycling Telematics & Wear Analytics", desc: "Predictive drivetrain friction models, Strava/Garmin FIT telemetry parsing, and biomechanical analytics.", color: "#f43f5e", tag: "SPORTS_TECH" },
  ];

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 60, background: "var(--color-space-void)" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* --- OPEN SOURCE CONTRIBUTIONS SECTION --- */}
      <section
        id="open-source"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 70px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#38bdf8",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: 8,
              }}
            >
              [ UPSTREAM_CONTRIBUTIONS // OPEN_SOURCE_ECOSYSTEM ]
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
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
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "8px 16px",
              background: "rgba(15, 23, 42, 0.6)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            [ GitHub Profile @FrancescoCastaldi → ]
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
                background: "#111827",
                border: "1px solid #1e293b",
                padding: 24,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color || "#38bdf8";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: project.color || "#38bdf8", fontWeight: 700 }}>
                  [{project.label}]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 8px", background: "rgba(56, 189, 248, 0.12)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)", textTransform: "uppercase" }}>
                  UPSTREAM
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 12, lineHeight: 1.35, textTransform: "uppercase" }}>
                {project.title}
              </h3>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderTop: "1px solid #1f2937", paddingTop: 14 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      fontFamily: "var(--font-mono)",
                      padding: "3px 8px",
                      background: "#1f2937",
                      color: "var(--color-text-muted)",
                      border: "1px solid #374151",
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

      {/* --- FEATURED SOFTWARE & HARDWARE BUILDS --- */}
      <section
        id="projects"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent-amber)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ ENGINEERING_GARAGE // FEATURED_BUILDS ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
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
                background: "#111827",
                border: "1px solid #1e293b",
                padding: 28,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color || "var(--color-accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-accent-primary)", textTransform: "uppercase" }}>
                  [ {project.icon} {project.slug} ]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 6px", background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                  DEPLOYED
                </span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: 19,
                  marginBottom: 12,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      color: "var(--color-accent-secondary)",
                      border: "1px solid #1e293b",
                      background: "#1f2937",
                      padding: "4px 8px",
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

      {/* --- AUTOMOTIVE HUB SHOWCASE --- */}
      <section
        id="automotive-hub"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 60px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-accent-amber)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: 8,
              }}
            >
              [ FORUM_SECTION // AUTOMOTIVE_GARAGE ]
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Featured Automotive & HEV Build Logs
            </h2>
          </div>

          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              color: "var(--color-accent-primary)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "8px 16px",
              background: "rgba(15, 23, 42, 0.6)",
              transition: "all 0.2s",
            }}
          >
            [ View All Forum Threads → ]
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
                background: "#111827",
                border: "1px solid #1e293b",
                padding: 24,
                textDecoration: "none",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-amber)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--color-accent-amber)", textTransform: "uppercase" }}>
                <span>[ THREAD // {post.subcategory || post.category} ]</span>
                <span style={{ color: "var(--color-text-muted)" }}>{post.readingTime} MIN READ</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, color: "#f8fafc", marginBottom: 12, lineHeight: 1.35, textTransform: "uppercase" }}>
                {post.title}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderTop: "1px solid #1f2937", paddingTop: 14 }}>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 8px", background: "rgba(245, 158, 11, 0.15)", color: "var(--color-accent-amber)", border: "1px solid rgba(245, 158, 11, 0.3)", textTransform: "uppercase" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 8px", background: "#1f2937", color: "#f8fafc", border: "1px solid #374151", textTransform: "uppercase" }}>
                    {post.subcategory}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FORUM SUB-BOARDS / EXPERTISE SECTION --- */}
      <section
        id="expertise"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 60px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ FORUM_CATEGORIES // MAIN_BOARDS ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Technical Discussion Boards
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 16,
          }}
        >
          {forumBoards.map((board) => (
            <div
              key={board.id}
              style={{
                background: "#111827",
                border: "1px solid #1e293b",
                padding: 28,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = board.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: board.color, fontWeight: 700 }}>
                  [{board.code}]
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "2px 6px", background: "#1f2937", color: "var(--color-text-muted)", border: "1px solid #374151" }}>
                  {board.tag}
                </span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                {board.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-text-body)",
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

      {/* --- LATEST FORUM THREADS / BLOG SECTION --- */}
      <section
        id="blog"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 8,
            }}
          >
            [ RECENT_THREADS // TECHNICAL_BLOG ]
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Latest Technical Articles & Guides
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
                background: "#111827",
                border: "1px solid #1e293b",
                padding: 24,
                transition: "all 0.2s ease",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  color: "var(--color-accent-primary)",
                  marginBottom: 14,
                  borderBottom: "1px solid #1f2937",
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
                <span>{post.readingTime} MIN READ</span>
              </div>
              <h3
                style={{
                  color: "#f8fafc",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 18,
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
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 8px", background: "rgba(56, 189, 248, 0.12)", color: "var(--color-accent-primary)", border: "1px solid rgba(56, 189, 248, 0.3)", textTransform: "uppercase" }}>
                  {post.category}
                </span>
                {post.subcategory && (
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "3px 8px", background: "#1f2937", color: "#f8fafc", border: "1px solid #374151", textTransform: "uppercase" }}>
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
              fontSize: 12,
              fontWeight: 700,
              color: "var(--color-accent-primary)",
              background: "#111827",
              border: "1px solid #38bdf840",
              padding: "12px 32px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-primary)";
              e.currentTarget.style.color = "#090d16";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111827";
              e.currentTarget.style.color = "var(--color-accent-primary)";
            }}
          >
            [ Open Full Forum Index → ]
          </Link>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-accent-amber)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 8,
          }}
        >
          [ COMMUNITY // CONTACT_DISCUSSIONS ]
        </span>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          Let's Connect & Collaborate
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            color: "var(--color-text-body)",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Open for upstream open source collaboration, automotive engineering exchanges, data science systems, or full-stack software development.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:info@francescocastaldi.it"
            style={{
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 700,
              color: "#090d16",
              background: "var(--color-accent-primary)",
              padding: "14px 32px",
              border: "1px solid var(--color-accent-primary)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#090d16";
              e.currentTarget.style.color = "var(--color-accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent-primary)";
              e.currentTarget.style.color = "#090d16";
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
              color: "var(--color-accent-amber)",
              background: "#111827",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              padding: "14px 32px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-amber)";
              e.currentTarget.style.color = "#090d16";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111827";
              e.currentTarget.style.color = "var(--color-accent-amber)";
            }}
          >
            [ LinkedIn Profile ]
          </a>
        </div>
      </section>
    </div>
  );
}

