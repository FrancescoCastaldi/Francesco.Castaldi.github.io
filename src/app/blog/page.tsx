"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import "./blog.css";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const publishedPosts = useMemo(() => {
    return blogPosts.filter((p) => p.published);
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(publishedPosts.map((p) => p.category)))];
  }, [publishedPosts]);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.subcategory && post.subcategory.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [publishedPosts, selectedCategory, searchQuery]);

  // Featured Post: Toyota Yaris MY25 review or the first published post
  const featuredPost = useMemo(() => {
    return (
      publishedPosts.find((p) => p.slug === "toyota-yaris-mk4-hev-trend-my25-review") ||
      publishedPosts[0]
    );
  }, [publishedPosts]);

  // Grid posts: excluding featured post if viewing "All" and no search query
  const gridPosts = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery && featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  const totalReadingTime = useMemo(() => {
    return publishedPosts.reduce((acc, p) => acc + (p.readingTime || 5), 0);
  }, [publishedPosts]);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "120px 5% 90px",
        background: "var(--color-space-void)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Top Telemetry Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#86efac",
                boxShadow: "0 0 8px #86efac",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#86efac",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 700,
              }}
            >
              KNOWLEDGE & TELEMETRY HUB — 04_INDEX
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(34px, 5vw, 64px)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.04em",
              margin: 0,
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            Engineering <span style={{ color: "#f97316" }}>Guides & Articles</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              color: "var(--color-text-body)",
              marginTop: 14,
              maxWidth: 680,
              lineHeight: 1.6,
            }}
          >
            Technical deep-dives into Full Hybrid (HEV) automotive systems, Toyota Yaris telemetry, car audio DSP, healthcare data architectures, and software engineering.
          </p>
        </div>

        {/* Telemetry Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            padding: "16px 20px",
            background: "#161b22",
            border: "1px solid #30363d",
            marginBottom: 36,
          }}
        >
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              PUBLISHED ARTICLES
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "#f97316" }}>
              {publishedPosts.length} THREADS
            </span>
          </div>

          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              TOP CATEGORY
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "#86efac" }}>
              AUTOMOTIVE HEV
            </span>
          </div>

          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              TOTAL READ TIME
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>
              ~{totalReadingTime} MINS
            </span>
          </div>
        </div>

        {/* Spotlight Featured Article (Only on All view without search query) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#f97316",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              <span>[ FEATURED SPOTLIGHT ARTICLE ]</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="featured-blog-card"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 28,
                padding: "32px",
                textDecoration: "none",
              }}
            >
              {/* Image Thumbnail */}
              <div style={{ position: "relative", width: "100%", height: 260, overflow: "hidden", border: "1px solid #30363d", background: "#0e1117" }}>
                <img
                  src="/assets/blog/toyota-yaris-mk4-hev-trend-my25-review/images/cover.png"
                  alt={featuredPost.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                  <span style={{ background: "#f97316", color: "#0e1117", padding: "4px 8px", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase" }}>
                    {featuredPost.category}
                  </span>
                  {featuredPost.subcategory && (
                    <span style={{ background: "#86efac", color: "#0e1117", padding: "4px 8px", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase" }}>
                      {featuredPost.subcategory}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{featuredPost.readingTime} MIN READ</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 26, fontWeight: 800, color: "#f8fafc", marginBottom: 14, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  {featuredPost.title}
                </h2>

                <p style={{ color: "var(--color-text-body)", fontSize: 15, lineHeight: 1.6, margin: 0, marginBottom: 20 }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, color: "#f97316", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>
                  <span>[ READ TECHNICAL GUIDE → ]</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 20 }}>
            
            {/* Category Pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="category-tab"
                    style={{
                      background: isActive ? "#f97316" : "#161b22",
                      color: isActive ? "#0e1117" : "var(--color-text-body)",
                      border: `1px solid ${isActive ? "#f97316" : "#30363d"}`,
                      padding: "8px 16px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                    }}
                  >
                    {cat === "All" ? "ALL THREADS" : cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div style={{ flex: "1 1 260px", maxWidth: 360 }}>
              <input
                type="text"
                placeholder="Search articles by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{
                  width: "100%",
                  background: "#161b22",
                  border: "1px solid #30363d",
                  color: "#f8fafc",
                  padding: "10px 16px",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
            SHOWING {filteredPosts.length} OF {publishedPosts.length} ARTICLES
          </span>
        </div>

        {/* Forum Card Grid */}
        {gridPosts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {gridPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>{post.readingTime} MIN READ</span>
                </div>

                <h2 className="blog-card-title" style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 10, lineHeight: 1.35, letterSpacing: "-0.01em", transition: "color 0.2s" }}>
                  {post.title}
                </h2>

                <p style={{ color: "var(--color-text-body)", fontSize: 13, lineHeight: 1.55, margin: 0, marginBottom: 20, flexGrow: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 14, borderTop: "1px solid #21262d" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ border: "1px solid #f97316", color: "#f97316", padding: "3px 7px", fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase" }}>
                      {post.category}
                    </span>
                    {post.subcategory && (
                      <span style={{ border: "1px solid #86efac", color: "#86efac", padding: "3px 7px", fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase" }}>
                        {post.subcategory}
                      </span>
                    )}
                  </div>

                  <span className="blog-card-arrow" style={{ color: "var(--color-text-muted)", fontSize: 14, fontFamily: "var(--font-mono)", transition: "transform 0.2s, color 0.2s" }}>
                    [→]
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ padding: "60px 20px", textAlign: "center", background: "#161b22", border: "1px solid #30363d" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 16 }}>
              NO ARTICLES FOUND MATCHING YOUR SEARCH QUERY.
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              style={{
                background: "#f97316",
                color: "#0e1117",
                border: "none",
                padding: "10px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              [ RESET SEARCH & FILTERS ]
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
