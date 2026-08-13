"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import "./blog.css";

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
        padding: "120px 5% 80px",
        background: "var(--color-space-void)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
          <div>
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
              [ 04_Blog_Index ]
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.04em",
                margin: 0,
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              Writing & Research
            </h1>
          </div>
          
          {/* Category Dropdown Filter */}
          <div style={{ paddingBottom: 6 }}>
            <select
              title="Filter by Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: "var(--color-space-void)",
                border: "1px solid var(--color-accent-secondary)",
                color: "var(--color-text-primary)",
                padding: "8px 16px",
                borderRadius: 0,
                fontFamily: 'var(--font-mono)',
                textTransform: "uppercase",
                fontSize: 12,
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23ffffff\" height=\"16\" viewBox=\"0 0 24 24\" width=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                paddingRight: 32,
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} style={{ background: "var(--color-space-void)" }}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div
          style={{
            width: "100%",
            height: 1,
            background: "var(--color-space-surface)",
            marginBottom: 48,
          }}
        />

        {/* Posts */}
        <div style={{ display: "grid", gap: 2, background: "var(--color-space-surface)", border: "1px solid var(--color-space-surface)" }}>
          {filteredPosts.map((post) => {
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{
                  display: "block",
                  padding: "32px",
                  background: "var(--color-space-void)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-space-elevated)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-space-void)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 11, color: "var(--color-accent-secondary)", fontFamily: 'var(--font-mono)', textTransform: "uppercase", alignItems: "center" }}>
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span>|</span>
                      <span>{post.readingTime} MIN READ</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-primary)", marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ color: "var(--color-text-body)", fontSize: 14, lineHeight: 1.6, fontFamily: 'var(--font-sans)', margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="blog-card-arrow" style={{ color: "var(--color-text-primary)", fontSize: 20, flexShrink: 0, marginTop: 4, transition: "transform 0.2s", fontFamily: 'var(--font-mono)' }}>
                    [→]
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
                  <span style={{ border: "1px solid var(--color-accent-secondary)", color: "var(--color-text-muted)", padding: "4px 8px", fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: "uppercase" }}>
                    {post.category}
                  </span>
                  {post.subcategory && (
                    <span style={{ border: "1px solid var(--color-space-surface)", background: "var(--color-space-elevated)", color: "var(--color-text-primary)", padding: "4px 8px", fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: "uppercase" }}>
                      {post.subcategory}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
