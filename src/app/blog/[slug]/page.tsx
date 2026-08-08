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
        padding: "80px 5% 60px",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <article style={{ maxWidth: 680, margin: "0 auto" }}>
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
          { label: post.title },
        ]} />

        {/* Category badge */}
        <span style={{
          display: "inline-block",
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: "var(--color-star-gold)",
          background: "rgba(245,158,11,0.1)",
          padding: "3px 10px",
          borderRadius: 4,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          {post.category}
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 12,
        }}>
          {post.title}
        </h1>

        {/* Gold accent line */}
        <div style={{ width: 40, height: 2, background: "var(--color-star-gold)", borderRadius: 2, marginBottom: 20 }} />

        {/* Metadata */}
        <div style={{
          display: "flex",
          gap: 16,
          fontSize: 12,
          color: "var(--color-text-muted)",
          fontFamily: 'var(--font-sans)',
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        {/* Content */}
        <div style={{
          color: "var(--color-text-body)",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: 'var(--font-sans)',
        }}>
          {post.content.split("\n\n").map((paragraph, i) => {
            const renderInline = (text: string) => {
              let html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: var(--color-space-surface); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; color: var(--color-nebula);">$1</code>');
              return <span dangerouslySetInnerHTML={{ __html: html }} />;
            };

            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ display: "flex", gap: 12, margin: "36px 0 16px" }}>
                  <div style={{ width: 3, background: "var(--color-star-gold)", borderRadius: 2, flexShrink: 0 }} />
                  <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    color: "var(--color-text-primary)",
                    fontWeight: 400,
                    margin: 0,
                  }}>
                    {renderInline(paragraph.replace("## ", ""))}
                  </h2>
                </div>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 20px", margin: "12px 0" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 6 }}>
                      {renderInline(line.replace("- ", ""))}
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith("> [!")) {
              const isWarning = paragraph.startsWith("> [!WARNING]");
              const isTip = paragraph.startsWith("> [!TIP]");
              const isImportant = paragraph.startsWith("> [!IMPORTANT]");
              const color = isWarning ? "var(--color-star-gold)" : (isTip ? "var(--color-nebula)" : (isImportant ? "#9333ea" : "var(--color-text-primary)"));
              const bgColor = isWarning ? "rgba(245,158,11,0.05)" : (isTip ? "rgba(34,211,238,0.05)" : (isImportant ? "rgba(147,51,234,0.05)" : "rgba(231,237,245,0.05)"));
              const cleanText = paragraph.replace(/> \[!(WARNING|TIP|NOTE|IMPORTANT)\]\n> /g, "").replace(/\n> /g, " ");
              return (
                <div key={i} style={{
                  margin: "24px 0",
                  padding: "16px 20px",
                  background: bgColor,
                  borderLeft: `3px solid ${color}`,
                  borderRadius: "0 8px 8px 0",
                  color: "var(--color-text-primary)",
                }}>
                  <strong style={{ color, display: "block", marginBottom: 8, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: 'var(--font-mono)' }}>
                    {isWarning ? "Attenzione" : (isTip ? "Consiglio Pratico" : (isImportant ? "Importante" : "Nota"))}
                  </strong>
                  {renderInline(cleanText)}
                </div>
              );
            }

            if (paragraph.startsWith("|") && paragraph.includes("|---|")) {
              const rows = paragraph.split("\n").filter(r => r.trim().startsWith("|"));
              if (rows.length > 2) {
                const headers = rows[0].split("|").slice(1, -1).map(s => s.trim());
                const bodyRows = rows.slice(2).map(r => r.split("|").slice(1, -1).map(s => s.trim()));
                
                return (
                  <div key={i} style={{ overflowX: "auto", margin: "24px 0" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                          {headers.map((h, idx) => (
                            <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "var(--color-text-primary)", fontWeight: 500 }}>
                              {renderInline(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: "12px 16px", color: "var(--color-text-body)" }}>
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

            if (paragraph.startsWith("![")) {
              const match = paragraph.match(/^!\[(.*?)\]\((.*?)\)/);
              if (match) {
                return (
                  <div key={i} style={{ margin: "32px 0", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                );
              }
            }

            if (paragraph.startsWith("\`\`\`")) {
              const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
              return (
                <pre key={i} style={{
                  background: "var(--color-space-void)",
                  padding: "20px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.05)",
                  overflowX: "auto",
                  margin: "24px 0",
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                }}>
                  <code>{codeContent}</code>
                </pre>
              );
            }
            return (
              <p key={i} style={{ marginBottom: 20 }}>
                {renderInline(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Bottom navigation */}
        <div style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Link href="/blog" style={{ color: "var(--color-star-gold)", fontSize: 12, fontFamily: 'var(--font-sans)', textDecoration: "none" }}>
            ← Back to blog
          </Link>
          <Link href="/" style={{ color: "var(--color-text-muted)", fontSize: 12, fontFamily: 'var(--font-sans)', textDecoration: "none" }}>
            Back to Home →
          </Link>
        </div>
      </article>
    </div>
  );
}
