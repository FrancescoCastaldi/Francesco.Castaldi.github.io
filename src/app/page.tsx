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
    { id: "healthcare", data: { title: "Healthcare Systems", desc: "Integration of software and biomedical systems with a focus on compliance and patient privacy." }, color: "var(--color-star-gold)" },
    { id: "dataScience", data: { title: "Data Science", desc: "Machine Learning models, predictive analytics, and large-scale data visualization." }, color: "var(--color-nebula)" },
    { id: "cloud", data: { title: "Cloud Computing", desc: "Scalable architectures on GCP and AWS. Microservices and containerization." }, color: "var(--color-node-cloud)" },
    { id: "ai", data: { title: "Artificial Intelligence", desc: "LLMs, RAG architectures, and computer vision applied to real-world problems." }, color: "var(--color-node-ai)" },
    { id: "security", data: { title: "Cybersecurity", desc: "System hardening, threat modeling, and secure software development lifecycles." }, color: "var(--color-node-security)" },
    { id: "cycling", data: { title: "Sports Analytics", desc: "Biomechanical and performance data analysis for competitive cycling." }, color: "var(--color-node-cycling)" },
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
          textAlign: "center"
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: "var(--color-accent-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 12,
          }}
        >
          About
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 400,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 24,
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
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: "var(--color-nebula)",
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
              fontFamily: 'var(--font-serif)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Core Competencies
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-secondary), transparent)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {expertiseItems.map((item, i) => (
            <div
              key={item.id}
              style={{
                background: "var(--color-space-surface)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: 24,
                transition: "border-color 0.4s var(--spring-easing), background 0.4s var(--spring-easing)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-space-elevated)";
                e.currentTarget.style.borderColor = "var(--color-accent-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-space-surface)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
              }}
            >
              <h3 
                style={{ 
                  color: item.color, 
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  marginBottom: 12
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
          padding: "60px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: "var(--color-accent-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            Projects
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Selected Work
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-primary), transparent)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {projects.filter(p => p.featured).map((project, i) => (
            <Link
              href={`/project/${project.slug}`}
              key={project.id}
              style={{
                display: "block",
                textDecoration: "none",
                background: "linear-gradient(180deg, #131B27 0%, #0C111A 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: 28,
                transition: "border-color 0.4s var(--spring-easing), box-shadow 0.4s var(--spring-easing)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-primary)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 
                style={{ 
                  color: "var(--color-text-primary)", 
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: "var(--color-accent-primary)",
                      background: "var(--color-accent-soft)",
                      padding: "4px 10px",
                      borderRadius: 20,
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
          padding: "60px 5% 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: "var(--color-accent-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: 12,
            }}
          >
            Blog
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Latest Articles
          </h2>
          <div className="section-divider" style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-primary), transparent)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
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
                background: "linear-gradient(180deg, #131B27 0%, #0C111A 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: 28,
                transition: "border-color 0.4s var(--spring-easing), box-shadow 0.4s var(--spring-easing)",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-primary)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: "var(--color-text-muted)",
                marginBottom: 12
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
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
                  marginBottom: 12,
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
                  marginBottom: 20,
                  flex: 1
                }}
              >
                {post.excerpt}
              </p>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: "var(--color-accent-primary)",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                Read article <span style={{ fontSize: 16 }}>→</span>
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
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-accent-primary)",
              background: "transparent",
              border: "1px solid var(--color-accent-secondary)",
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-soft)"; e.currentTarget.style.borderColor = "var(--color-accent-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--color-accent-secondary)"; }}
          >
            View all articles
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
            fontSize: 11,
            color: "var(--color-accent-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: 12,
          }}
        >
          Contact
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 400,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 24,
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
            marginBottom: 40
          }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={`mailto:info@francescocastaldi.it`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-space-void)",
              background: "var(--color-accent-primary)",
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-accent-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent-primary)")}
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/francescocastaldi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-accent-primary)",
              background: "transparent",
              border: "1px solid var(--color-accent-secondary)",
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-soft)"; e.currentTarget.style.borderColor = "var(--color-accent-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--color-accent-secondary)"; }}
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
