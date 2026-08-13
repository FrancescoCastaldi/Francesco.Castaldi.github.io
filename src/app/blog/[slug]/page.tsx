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
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: `/assets/blog/${post.slug}/images/cover.png`,
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

  return (
    <div
      style={{
        position: "relative",
        zIndex: 60,
        minHeight: "100vh",
        padding: "120px 5% 80px",
        background: "#0e1117",
      }}
    >
      <article style={{ maxWidth: 860, margin: "0 auto" }}>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
          ...(post.subcategory ? [{ label: post.subcategory }] : []),
          { label: post.title },
        ]} />

        {/* Category & Subcategory Badges */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            color: "#f97316",
            border: "1px solid #f97316",
            padding: "4px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: "rgba(249, 115, 22, 0.08)",
          }}>
            {post.category}
          </span>

          {post.subcategory && (
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color: "#86efac",
              border: "1px solid #86efac",
              background: "rgba(134, 239, 172, 0.08)",
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
          fontSize: "clamp(30px, 4.5vw, 52px)",
          fontWeight: 800,
          color: "#f8fafc",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          {post.title}
        </h1>

        {/* Metadata Telemetry Bar */}
        <div style={{
          display: "flex",
          gap: 20,
          fontSize: 12,
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-mono)",
          marginBottom: 44,
          paddingBottom: 20,
          borderBottom: "1px solid #30363d",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <span>PUBLISHED: {post.date}</span>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ color: "#86efac" }}>READ TIME: {post.readingTime} MINS</span>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ color: "#f97316" }}>AUTHOR: FRANCESCO CASTALDI</span>
        </div>

        {/* Article Markdown Body */}
        <div style={{
          color: "#cbd5e1",
          fontSize: 16,
          lineHeight: 1.8,
          fontFamily: "var(--font-sans)",
        }}>
          {post.content.split("\n\n").map((rawParagraph, i) => {
            const paragraph = rawParagraph.trim();
            if (!paragraph) return null;
            
            const renderInline = (text: string) => {
              let html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #f8fafc; font-weight: 700;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: #161b22; padding: 3px 8px; border-radius: 2px; font-size: 0.88em; color: #86efac; border: 1px solid #30363d">$1</code>');
              return <span dangerouslySetInnerHTML={{ __html: html }} />;
            };

            // H2 Section Headers
            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ display: "flex", gap: 14, margin: "52px 0 24px", borderBottom: "1px solid #30363d", paddingBottom: 16, alignItems: "center" }}>
                  <div style={{ width: 4, height: 28, background: "#f97316", flexShrink: 0 }} />
                  <h2 style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(20px, 3vw, 26px)",
                    textTransform: "uppercase",
                    color: "#f8fafc",
                    fontWeight: 800,
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
                <ul key={i} style={{ padding: "0 0 0 24px", margin: "20px 0", listStyleType: "square" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 10, color: "#cbd5e1" }}>
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
              const borderColor = isWarning ? "#f43f5e" : (isTip ? "#86efac" : "#f97316");

              return (
                <div key={i} style={{
                  margin: "36px 0",
                  padding: "24px",
                  background: "#161b22",
                  borderLeft: `4px solid ${borderColor}`,
                  borderTop: "1px solid #30363d",
                  borderRight: "1px solid #30363d",
                  borderBottom: "1px solid #30363d",
                  color: "#f8fafc",
                }}>
                  <strong style={{ color: borderColor, display: "block", marginBottom: 10, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    [ {isWarning ? "WARNING" : (isTip ? "TIP" : (isImportant ? "IMPORTANT" : "NOTE"))} ]
                  </strong>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: "#cbd5e1" }}>
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
                  <div key={i} style={{ overflowX: "auto", margin: "36px 0", border: "1px solid #30363d", background: "#161b22" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "#21262d", borderBottom: "2px solid #f97316" }}>
                          {headers.map((h, idx) => (
                            <th key={idx} style={{ padding: "14px 18px", textAlign: "left", color: "#f8fafc", fontWeight: 700, fontFamily: "var(--font-mono)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em" }}>
                              {renderInline(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid #30363d" }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: "14px 18px", color: "#cbd5e1" }}>
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
                  <div key={i} style={{ margin: "44px 0", border: "1px solid #30363d", background: "#161b22", padding: 12 }}>
                    <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block", border: "1px solid #21262d" }} />
                    <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "#86efac", textTransform: "uppercase", textAlign: "center", fontWeight: 700 }}>
                      FIGURE: {match[1]}
                    </div>
                  </div>
                );
              }
            }

            // Code Blocks
            if (paragraph.startsWith("\`\`\`")) {
              const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
              return (
                <pre key={i} style={{
                  background: "#161b22",
                  padding: "24px",
                  border: "1px solid #30363d",
                  overflowX: "auto",
                  margin: "36px 0",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                }}>
                  <code>{codeContent}</code>
                </pre>
              );
            }

            // Standard Paragraph
            return (
              <p key={i} style={{ marginBottom: 24 }}>
                {renderInline(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Bottom Navigation & Share Bar */}
        <div style={{
          marginTop: 72,
          paddingTop: 36,
          borderTop: "1px solid #30363d",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <Link
            href="/blog"
            style={{
              color: "#0e1117",
              background: "#f97316",
              padding: "12px 24px",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            [ ← BACK TO ALL ARTICLES ]
          </Link>

          <Link
            href="/"
            style={{
              color: "#86efac",
              border: "1px solid #86efac",
              padding: "12px 24px",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            [ BACK TO HOME → ]
          </Link>
        </div>

      </article>
    </div>
  );
}
