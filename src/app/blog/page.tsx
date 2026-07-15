import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import "./blog.css";

export default function BlogPage() {
  const posts = blogPosts.filter((p) => p.published);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "80px 5% 60px",
        background: "rgba(6, 8, 12, 0.92)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(28px, 5vw, 36px)",
            fontWeight: 400,
            color: "#E7EDF5",
            marginBottom: 32,
            letterSpacing: "-0.02em",
          }}
        >
          Blog
        </h1>

        <div style={{ display: "grid", gap: 16 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
              style={{
                display: "block",
                padding: "20px 24px",
                background: "rgba(12, 17, 26, 0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "DM Serif Display, Georgia, serif",
                      fontSize: 18,
                      fontWeight: 400,
                      color: "#E7EDF5",
                      marginBottom: 6,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      color: "#9BA9BB",
                      fontSize: 13,
                      lineHeight: 1.6,
                      fontFamily: "Inter, sans-serif",
                      margin: 0,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
                <span
                  style={{
                    color: "#F59E0B",
                    fontSize: 18,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                >
                  →
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 12,
                  fontSize: 11,
                  color: "#4B5768",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
