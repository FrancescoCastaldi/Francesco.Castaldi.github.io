"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import "./blog.css";

// Category colors for visual variety
const categoryColors: Record<string, string> = {
  "Technology": "var(--color-star-gold)",
  "Development": "var(--color-nebula)",
  "Data Science": "#A78BFA",
  "Research": "#FB7185",
  "Design": "#34D399",
  "Veicoli": "#38BDF8",
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const publishedPosts = blogPosts.filter((p) => p.published);
  const categories = ["All", ...Array.from(new Set(publishedPosts.map(p => p.category)))];

  const filteredPosts = selectedCategory === "All"
    ? publishedPosts
    : publishedPosts.filter(p => p.category === selectedCategory);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "80px 5% 60px",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: "var(--color-star-gold)",
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
                fontFamily: 'var(--font-serif)',
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 400,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Blog
            </h1>
          </div>
          
          {/* Category Dropdown Filter */}
          <div style={{ paddingBottom: 6 }}>
            <select
              title="Filtra per Categoria"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--color-text-primary)",
                padding: "8px 12px",
                borderRadius: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23ffffff\" height=\"20\" viewBox=\"0 0 24 24\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                paddingRight: 32,
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} style={{ background: "#0a0a0a" }}>
                  {cat === "All" ? "Tutte le Categorie" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div
          style={{
            width: 40,
            height: 3,
            background: "var(--color-star-gold)",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Posts */}
        <div style={{ display: "grid", gap: 20 }}>
          {filteredPosts.map((post) => {
            const catColor = categoryColors[post.category] || "var(--color-star-gold)";
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
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: "var(--color-text-primary)", marginBottom: 8, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ color: "var(--color-text-body)", fontSize: 13, lineHeight: 1.6, fontFamily: 'var(--font-sans)', margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="blog-card-arrow" style={{ color: "var(--color-star-gold)", fontSize: 20, flexShrink: 0, marginTop: 4, transition: "transform 0.2s", fontFamily: 'var(--font-sans)' }}>
                    →
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 14, fontSize: 11, color: "var(--color-text-muted)", fontFamily: 'var(--font-sans)', alignItems: "center" }}>
                  <span style={{ background: "rgba(245,158,11,0.1)", color: "var(--color-star-gold)", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
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
