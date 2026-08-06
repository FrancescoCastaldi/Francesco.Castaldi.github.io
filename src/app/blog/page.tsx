import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import "./blog.css";

// Category colors for visual variety
const categoryColors: Record<string, string> = {
  "Technology": "#F59E0B",
  "Development": "#22D3EE",
  "Data Science": "#A78BFA",
  "Research": "#FB7185",
  "Design": "#34D399",
};

export default function BlogPage() {
  const posts = blogPosts.filter((p) => p.published);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "80px 5% 60px",
        background: "rgba(6, 8, 12, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Page header */}
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: "#F59E0B",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            display: "block",
            marginBottom: 8,
          }}
        >
          Writing &amp; Research
        </span>
        <h1
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            color: "#E7EDF5",
            letterSpacing: "-0.03em",
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          Blog
        </h1>
        <div
          style={{
            width: 40,
            height: 3,
            background: "#F59E0B",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Posts */}
        <div style={{ display: "grid", gap: 20 }}>
          {posts.map((post) => {
            const catColor = categoryColors[post.category] || "#F59E0B";
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{
                  display: "block",
                  padding: "20px 24px",
                  background: "rgba(12, 17, 26, 0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `3px solid ${catColor}`,
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 18, fontWeight: 400, color: "#E7EDF5", marginBottom: 8, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ color: "#9BA9BB", fontSize: 13, lineHeight: 1.6, fontFamily: '"Inter", sans-serif', margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="blog-card-arrow" style={{ color: "#F59E0B", fontSize: 20, flexShrink: 0, marginTop: 4, transition: "transform 0.2s", fontFamily: '"Inter", sans-serif' }}>
                    →
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 14, fontSize: 11, color: "#4B5768", fontFamily: '"Inter", sans-serif', alignItems: "center" }}>
                  <span style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }}>
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
