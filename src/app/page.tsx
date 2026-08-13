"use client";
import { useEffect } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, []);

  const forumBoards = [
    { id: "automotive", code: "BOARD_01", title: "Automotive & Hybrid HEV", desc: "Toyota Yaris MK4 HEV powertrain analysis, e-CVT telematics, Focal audio upgrades, and hybrid hyper-miling.", color: "var(--color-accent-amber)", tag: "AUTOMOTIVE" },
    { id: "healthcare", code: "BOARD_02", title: "Healthcare IT & Compliance", desc: "Medical device software integration, hospital compliance audit trails, and privacy-first architectures.", color: "var(--color-node-healthcare)", tag: "HEALTHCARE" },
    { id: "dataScience", code: "BOARD_03", title: "Data Science & AI", desc: "Machine Learning models, predictive analytics, RAG architectures, and statistical visualization.", color: "var(--color-accent-primary)", tag: "DATA_SCIENCE" },
    { id: "cloud", code: "BOARD_04", title: "Cloud & Systems", desc: "Scalable GCP/AWS cloud infrastructure, Docker microservices, CI/CD pipelines, and static export SSG.", color: "#a78bfa", tag: "CLOUD_DEVOPS" },
    { id: "security", code: "BOARD_05", title: "Cybersecurity & Systems", desc: "System hardening, threat modeling, secure software development lifecycles, and audit logging.", color: "#34d399", tag: "SECURITY" },
    { id: "cycling", code: "BOARD_06", title: "Sports Analytics & Cycling", desc: "Biomechanical performance data analysis, Strava Python pipelines, power meter telemetry, and aerodynamics.", color: "#f43f5e", tag: "SPORTS_TECH" },
  ];

  const automotivePosts = blogPosts.filter(p => p.category === "Automotive" || p.tags.includes("Toyota"));

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 60, background: "var(--color-space-void)" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Automotive Hub Showcase */}
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

        {/* Featured Automotive Cards */}
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

      {/* Forum Sub-Boards / Expertise Section */}
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

      {/* Projects Section / Garage */}
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
            Software & Hardware Garage Projects
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {projects.filter(p => p.featured).map((project) => (
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
                e.currentTarget.style.borderColor = "var(--color-accent-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-accent-primary)", textTransform: "uppercase" }}>
                  [ BUILD_LOG // {project.slug} ]
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
                  marginBottom: 12
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
                  marginBottom: 20
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map(tech => (
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

      {/* Latest Forum Threads / Blog Section */}
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
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
                marginBottom: 14,
                borderBottom: "1px solid #1f2937",
                paddingBottom: 8,
                display: "flex",
                justifyContent: "space-between",
              }}>
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
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
                  lineHeight: 1.35
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
                  flex: 1
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
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-primary)"; e.currentTarget.style.color = "#090d16"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#111827"; e.currentTarget.style.color = "var(--color-accent-primary)"; }}
          >
            [ Open Full Forum Index → ]
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center"
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
            marginBottom: 40
          }}
        >
          Open for technical discussions, automotive engineering exchanges, data science projects, or software collaboration.
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
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-amber)"; e.currentTarget.style.color = "#090d16"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#111827"; e.currentTarget.style.color = "var(--color-accent-amber)"; }}
          >
            [ LinkedIn Profile ]
          </a>
        </div>
      </section>
    </div>
  );
}
