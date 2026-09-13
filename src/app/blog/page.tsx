"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRightIcon } from "@/components/ui/HeritageIcon";
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
        background: "#121110",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Top Archival Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#C5A059",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 12,
                color: "#C5A059",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
              }}
            >
              CURATED ESSAYS & ARCHIVAL PAPERS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              color: "#FAF6EE",
              letterSpacing: "-0.01em",
              margin: 0,
              lineHeight: 1.08,
            }}
          >
            Archival Essays <span style={{ color: "#C5A059" }}>& Monographs</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#E8E3D6",
              marginTop: 14,
              maxWidth: 680,
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            Scholarly treatises and engineering investigations into Full Hybrid (HEV) automotive systems, Toyota Yaris kinematics, car audio DSP, healthcare data architectures, and software systems.
          </p>
        </div>

        {/* Ex Libris Archival Registry Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            padding: "18px 24px",
            background: "#15261E",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            borderRadius: 6,
            marginBottom: 36,
          }}
        >
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: 11, color: "#C5A059", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              CATALOGUED MONOGRAPHS
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: "#FAF6EE" }}>
              {publishedPosts.length} Treatises
            </span>
          </div>

          <div>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: 11, color: "#C5A059", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              PRIMARY DISCIPLINES
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: "#FAF6EE" }}>
              AUTOMOTIVE HEV & SYSTEMS
            </span>
          </div>

          <div>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: 11, color: "#C5A059", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ESTIMATED READING FOLIO
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, color: "#FAF6EE" }}>
              ~{totalReadingTime} MINS TOTAL
            </span>
          </div>
        </div>

        {/* Spotlight Featured Monograph */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                fontFamily: "var(--font-serif)",
                fontSize: 12,
                color: "#C5A059",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              <span>FEATURED MONOGRAPH</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="featured-blog-card"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 28,
                padding: "28px",
                background: "#15261E",
                border: "1px solid rgba(197, 160, 89, 0.28)",
                borderRadius: 6,
                textDecoration: "none",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Image Thumbnail */}
              <div style={{ position: "relative", width: "100%", height: 260, overflow: "hidden", borderRadius: 4, border: "1px solid rgba(197, 160, 89, 0.25)", background: "#121110" }}>
                <Image
                  src="/assets/blog/toyota-yaris-mk4-hev-trend-my25-review/images/cover.png"
                  alt={featuredPost.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                  <span style={{ background: "rgba(18, 17, 16, 0.85)", color: "#C5A059", border: "1px solid rgba(197, 160, 89, 0.35)", borderRadius: 3, padding: "4px 10px", fontSize: 11, fontFamily: "var(--font-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {featuredPost.category}
                  </span>
                  {featuredPost.subcategory && (
                    <span style={{ background: "#1B2E24", color: "#FAF6EE", border: "1px solid rgba(197, 160, 89, 0.25)", borderRadius: 3, padding: "4px 10px", fontSize: 11, fontFamily: "var(--font-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {featuredPost.subcategory}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, fontSize: 12, color: "#9E978E", fontFamily: "var(--font-serif)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span style={{ color: "rgba(197, 160, 89, 0.4)" }}>•</span>
                  <span>{featuredPost.readingTime} MIN READ</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 600, color: "#FAF6EE", marginBottom: 14, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                  {featuredPost.title}
                </h2>

                <p style={{ color: "#E8E3D6", fontSize: 14, lineHeight: 1.65, margin: 0, marginBottom: 20, opacity: 0.9, fontFamily: "var(--font-body)" }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, color: "#C5A059", fontFamily: "var(--font-serif)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <span>Read Archival Essay</span>
                  <ArrowRightIcon size={14} color="#C5A059" />
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
                      background: isActive ? "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)" : "#15261E",
                      color: isActive ? "#121110" : "#E8E3D6",
                      border: `1px solid ${isActive ? "#C5A059" : "rgba(197, 160, 89, 0.25)"}`,
                      padding: "8px 18px",
                      borderRadius: 4,
                      fontFamily: "var(--font-serif)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {cat === "All" ? "ALL ESSAYS" : cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div style={{ flex: "1 1 260px", maxWidth: 360 }}>
              <input
                type="text"
                placeholder="Search archival monographs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{
                  width: "100%",
                  background: "#15261E",
                  border: "1px solid rgba(197, 160, 89, 0.25)",
                  borderRadius: 4,
                  color: "#FAF6EE",
                  padding: "10px 16px",
                  fontSize: 13,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "#9E978E", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            CATALOGUE: SHOWING {filteredPosts.length} OF {publishedPosts.length} MONOGRAPHS
          </span>
        </div>

        {/* Monograph Card Grid */}
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
                  padding: "26px",
                  textDecoration: "none",
                  height: "100%",
                  background: "#15261E",
                  border: "1px solid rgba(197, 160, 89, 0.22)",
                  borderRadius: 6,
                  transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, fontSize: 11, color: "#9E978E", fontFamily: "var(--font-serif)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>{post.readingTime} MIN READ</span>
                </div>

                <h2 className="blog-card-title" style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "#FAF6EE", marginBottom: 12, lineHeight: 1.35 }}>
                  {post.title}
                </h2>

                <p style={{ color: "#E8E3D6", fontSize: 14, lineHeight: 1.65, margin: 0, marginBottom: 20, flexGrow: 1, opacity: 0.9, fontFamily: "var(--font-body)" }}>
                  {post.excerpt}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(197, 160, 89, 0.14)" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ border: "1px solid rgba(197, 160, 89, 0.22)", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", padding: "3px 8px", borderRadius: 3, fontSize: 11, fontFamily: "var(--font-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {post.category}
                    </span>
                    {post.subcategory && (
                      <span style={{ border: "1px solid rgba(197, 160, 89, 0.22)", background: "rgba(197, 160, 89, 0.08)", color: "#C5A059", padding: "3px 8px", borderRadius: 3, fontSize: 11, fontFamily: "var(--font-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {post.subcategory}
                      </span>
                    )}
                  </div>

                  <span className="blog-card-arrow" style={{ color: "#C5A059", display: "inline-flex", alignItems: "center", transition: "transform 0.6s ease-out, color 0.6s ease-out" }}>
                    <ArrowRightIcon size={14} color="#C5A059" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ padding: "60px 20px", textAlign: "center", background: "#15261E", border: "1px solid rgba(197, 160, 89, 0.25)", borderRadius: 6 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#E8E3D6", marginBottom: 20 }}>
              No archival monographs found matching your search query.
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              style={{
                background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
                color: "#121110",
                border: "1px solid #C5A059",
                borderRadius: 4,
                padding: "10px 22px",
                fontFamily: "var(--font-serif)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "all 0.6s ease-out",
              }}
            >
              Clear Search Criteria
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
