import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "../blog.css";

export async function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const pageUrl = `https://francescocastaldi.it/blog/${post.slug}`;

  return {
    title: `${post.title} | Francesco Castaldi`,
    description: post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["Francesco Castaldi"],
      images: [
        {
          url: `https://francescocastaldi.it/assets/blog/${post.slug}/images/cover.png`,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post || !post.published) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Francesco Castaldi",
      "url": "https://francescocastaldi.it"
    },
    "publisher": {
      "@type": "Person",
      "name": "Francesco Castaldi",
      "url": "https://francescocastaldi.it"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://francescocastaldi.it/blog/${post.slug}`
    },
    "image": `https://francescocastaldi.it/assets/blog/${post.slug}/images/cover.png`
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "120px 5% 80px",
        background: "#0b0c0e",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ maxWidth: 840, margin: "0 auto" }}>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
          ...(post.subcategory ? [{ label: post.subcategory }] : []),
          { label: post.title },
        ]} />

        {/* Category & Subcategory Badges */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 700,
            color: "#cbd5e1",
            border: "1px solid #262a33",
            background: "#131519",
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            {post.category}
          </span>

          {post.subcategory && (
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              border: "1px solid #262a33",
              background: "#131519",
              padding: "4px 10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {post.subcategory}
            </span>
          )}
        </div>

        {/* Article Title */}
        <h1 style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(28px, 4.5vw, 46px)",
          fontWeight: 800,
          color: "#f8fafc",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 20,
          textTransform: "uppercase",
        }}>
          {post.title}
        </h1>

        {/* Metadata Telemetry Bar */}
        <div style={{
          display: "flex",
          gap: 16,
          fontSize: 11,
          textTransform: "uppercase",
          color: "#64748b",
          fontFamily: "var(--font-mono)",
          marginBottom: 40,
          paddingBottom: 18,
          borderBottom: "1px solid #1e222b",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <span>DATE: {post.date}</span>
          <span style={{ color: "#262a33" }}>|</span>
          <span style={{ color: "#cbd5e1" }}>READ TIME: {post.readingTime} MINS</span>
          <span style={{ color: "#262a33" }}>|</span>
          <span style={{ color: "#94a3b8" }}>AUTHOR: FRANCESCO CASTALDI</span>
        </div>

        {/* Article Markdown Body */}
        <div style={{
          color: "#94a3b8",
          fontSize: 16,
          lineHeight: 1.75,
          fontFamily: "var(--font-sans)",
        }}>
          {post.content.split("\n\n").map((rawParagraph, i) => {
            const paragraph = rawParagraph.trim();
            if (!paragraph) return null;
            
            const renderInline = (text: string) => {
              let html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #f8fafc; font-weight: 700;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: #131519; padding: 2px 6px; font-size: 0.88em; color: #f8fafc; border: 1px solid #262a33">$1</code>');
              return <span dangerouslySetInnerHTML={{ __html: html }} />;
            };

            // H2 Section Headers
            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ margin: "44px 0 20px", borderBottom: "1px solid #1e222b", paddingBottom: 14 }}>
                  <h2 style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    textTransform: "uppercase",
                    color: "#f8fafc",
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}>
                    {renderInline(paragraph.replace("## ", ""))}
                  </h2>
                </div>
              );
            }

            // Bullet Lists
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 20px", margin: "16px 0", listStyleType: "square" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 8, color: "#94a3b8" }}>
                      {renderInline(line.replace("- ", ""))}
                    </li>
                  ))}
                </ul>
              );
            }

            // GitHub Style Callouts
            if (paragraph.startsWith("> [!")) {
              const isWarning = paragraph.startsWith("> [!WARNING]");
              const isTip = paragraph.startsWith("> [!TIP]");
              const isImportant = paragraph.startsWith("> [!IMPORTANT]");
              const cleanText = paragraph.replace(/> \[!(WARNING|TIP|NOTE|IMPORTANT)\]\n> /g, "").replace(/\n> /g, " ");

              return (
                <div key={i} style={{
                  margin: "28px 0",
                  padding: "20px 24px",
                  background: "#131519",
                  border: "1px solid #262a33",
                  color: "#94a3b8",
                }}>
                  <strong style={{ color: "#f8fafc", display: "block", marginBottom: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    [ {isWarning ? "WARNING" : (isTip ? "TIP" : (isImportant ? "IMPORTANT" : "NOTE"))} ]
                  </strong>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "#94a3b8" }}>
                    {renderInline(cleanText)}
                  </div>
                </div>
              );
            }

            // Tables
            if (paragraph.startsWith("|") && paragraph.includes("|---|")) {
              const rows = paragraph.split("\n").filter(r => r.trim().startsWith("|"));
              if (rows.length > 2) {
                const headers = rows[0].split("|").slice(1, -1).map(s => s.trim());
                const bodyRows = rows.slice(2).map(r => r.split("|").slice(1, -1).map(s => s.trim()));
                
                return (
                  <div key={i} style={{ overflowX: "auto", margin: "28px 0", border: "1px solid #262a33", background: "#131519" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#131519", borderBottom: "1px solid #262a33" }}>
                          {headers.map((h, idx) => (
                            <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "#f8fafc", fontWeight: 700, fontFamily: "var(--font-mono)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" }}>
                              {renderInline(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid #1a1d23" }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: "12px 16px", color: "#94a3b8" }}>
                                {renderInline(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // Embedded Images
            if (paragraph.startsWith("![")) {
              const match = paragraph.match(/^!\[(.*?)\]\((.*?)\)/);
              if (match) {
                return (
                  <div key={i} style={{ margin: "36px 0", border: "1px solid #262a33", background: "#131519", padding: 8 }}>
                    <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block" }} />
                    <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", textTransform: "uppercase", textAlign: "center" }}>
                      FIG: {match[1]}
                    </div>
                  </div>
                );
              }
            }

            // Code Blocks
            if (paragraph.startsWith("```")) {
              const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
              return (
                <pre key={i} style={{
                  background: "#131519",
                  padding: "20px",
                  border: "1px solid #262a33",
                  overflowX: "auto",
                  margin: "28px 0",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                }}>
                  <code>{codeContent}</code>
                </pre>
              );
            }

            // Standard Paragraph
            return (
              <p key={i} style={{ marginBottom: 20 }}>
                {renderInline(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          marginTop: 64,
          paddingTop: 28,
          borderTop: "1px solid #1e222b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <Link
            href="/blog"
            style={{
              color: "#0b0c0e",
              background: "#e2e8f0",
              padding: "10px 22px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            [ &larr; Back to Articles ]
          </Link>

          <Link
            href="/"
            style={{
              color: "#cbd5e1",
              border: "1px solid #262a33",
              background: "#131519",
              padding: "10px 22px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            [ Back to Home &rarr; ]
          </Link>
        </div>

      </article>
    </div>
  );
}
