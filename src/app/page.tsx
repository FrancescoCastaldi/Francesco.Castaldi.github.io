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

  const expertiseItems = [
    { id: "healthcare", data: { title: "Healthcare Systems", desc: "Integration of software and biomedical systems with a focus on compliance and patient privacy." }, color: "var(--color-accent-primary)" },
    { id: "dataScience", data: { title: "Data Science", desc: "Machine Learning models, predictive analytics, and large-scale data visualization." }, color: "var(--color-text-body)" },
    { id: "cloud", data: { title: "Cloud Computing", desc: "Scalable architectures on GCP and AWS. Microservices and containerization." }, color: "var(--color-accent-primary)" },
    { id: "ai", data: { title: "Artificial Intelligence", desc: "LLMs, RAG architectures, and computer vision applied to real-world problems." }, color: "var(--color-text-body)" },
    { id: "security", data: { title: "Cybersecurity", desc: "System hardening, threat modeling, and secure software development lifecycles." }, color: "var(--color-accent-primary)" },
    { id: "cycling", data: { title: "Sports Analytics", desc: "Biomechanical and performance data analysis for competitive cycling." }, color: "var(--color-text-body)" },
  ];

  return (
    <div style={{ animation: "pageFadeIn 0.6s ease both", paddingBottom: 60 }}>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 40px",
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
          borderBottom: "1px solid var(--color-space-surface)",
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: "var(--color-accent-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 16,
          }}
        >
          [ 01_About ]
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Bridging the gap between software engineering and human-centric design.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: "var(--color-text-body)",
            lineHeight: 1.8,
            maxWidth: 800,
            margin: "0 auto"
          }}
        >
          I am a Computer Engineering student at the University of Bologna with a passion for building scalable systems and analyzing complex data. My focus lies at the intersection of Artificial Intelligence, Data Science, and robust Web Development. Whether it's training machine learning models or crafting elegant user interfaces, I believe in technology that empowers people.
        </p>
      </section>

      {/* Expertise Section */}
      <section
        id="expertise"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 60px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid var(--color-space-surface)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: "var(--color-accent-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            [ 02_Expertise ]
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Core Competencies
          </h2>
          <div className="section-divider" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 2,
            background: "var(--color-space-surface)",
            border: "1px solid var(--color-space-surface)",
          }}
        >
          {expertiseItems.map((item, i) => (
            <div
              key={item.id}
              style={{
                background: "var(--color-space-void)",
                padding: 32,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-space-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-space-void)";
              }}
            >
              <h3 
                style={{ 
                  color: item.color, 
                  fontFamily: 'var(--font-mono)',
                  textTransform: "uppercase",
                  fontSize: 14,
                  marginBottom: 16,
                  letterSpacing: "0.05em",
                }}
              >
                {item.data.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                }}
              >
                {item.data.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid var(--color-space-surface)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: "var(--color-accent-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            [ 03_Projects ]
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Selected Work
          </h2>
          <div className="section-divider" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 2,
            background: "var(--color-space-surface)",
            border: "1px solid var(--color-space-surface)",
          }}
        >
          {projects.filter(p => p.featured).map((project, i) => (
            <Link
              href={`/project/${project.slug}`}
              key={project.id}
              style={{
                display: "block",
                textDecoration: "none",
                background: "var(--color-space-void)",
                padding: 32,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-space-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-space-void)";
              }}
            >
              <h3 
                style={{ 
                  color: "var(--color-text-primary)", 
                  fontFamily: 'var(--font-sans)',
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 12
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: 24
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-accent-secondary)",
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

      {/* Blog Section */}
      <section
        id="blog"
        className="scroll-reveal"
        style={{
          padding: "80px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
          borderBottom: "1px solid var(--color-space-surface)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: "var(--color-accent-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            [ 04_Blog ]
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Latest Articles
          </h2>
          <div className="section-divider" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 2,
            background: "var(--color-space-surface)",
            border: "1px solid var(--color-space-surface)",
            marginBottom: 48,
          }}
        >
          {blogPosts.slice(0, 3).map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                background: "var(--color-space-void)",
                padding: 32,
                transition: "background 0.2s",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-space-elevated)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-space-void)";
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: "uppercase",
                color: "var(--color-accent-secondary)",
                marginBottom: 16,
                borderBottom: "1px solid var(--color-space-surface)",
                paddingBottom: 8,
              }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <h3 
                style={{ 
                  color: "var(--color-text-primary)", 
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 20,
                  marginBottom: 16,
                  lineHeight: 1.3
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                  flex: 1
                }}
              >
                {post.excerpt}
              </p>
              <div style={{
                fontFamily: 'var(--font-mono)',
                textTransform: "uppercase",
                fontSize: 12,
                color: "var(--color-accent-primary)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                [ Read Article ]
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
              fontFamily: 'var(--font-mono)',
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-accent-primary)",
              background: "transparent",
              border: "1px solid var(--color-accent-secondary)",
              padding: "12px 32px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-primary)"; e.currentTarget.style.color = "var(--color-space-void)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-accent-primary)"; }}
          >
            [ View All Articles ]
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
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: "var(--color-accent-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 16,
          }}
        >
          [ 05_Contact ]
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Let's build something together.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: "var(--color-text-body)",
            lineHeight: 1.8,
            marginBottom: 48
          }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={`mailto:info@francescocastaldi.it`}
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-space-void)",
              background: "var(--color-accent-primary)",
              padding: "12px 32px",
              border: "1px solid var(--color-accent-primary)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-space-void)";
              e.currentTarget.style.color = "var(--color-accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent-primary)";
              e.currentTarget.style.color = "var(--color-space-void)";
            }}
          >
            [ Email Me ]
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-accent-primary)",
              background: "transparent",
              border: "1px solid var(--color-accent-secondary)",
              padding: "12px 32px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-primary)"; e.currentTarget.style.color = "var(--color-space-void)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-accent-primary)"; }}
          >
            [ LinkedIn ]
          </a>
        </div>
      </section>
    </div>
  );
}
