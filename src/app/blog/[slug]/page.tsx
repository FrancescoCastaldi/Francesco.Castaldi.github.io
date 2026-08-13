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
        padding: "120px 5% 60px",
        background: "var(--color-space-void)",
      }}
    >
      <article style={{ maxWidth: 800, margin: "0 auto" }}>
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
          ...(post.subcategory ? [{ label: post.subcategory }] : []),
          { label: post.title },
        ]} />

        {/* Category & Subcategory badges */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: "var(--color-accent-secondary)",
            border: "1px solid var(--color-accent-secondary)",
            padding: "4px 8px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            {post.category}
          </span>
          {post.subcategory && (
            <span style={{
              display: "inline-block",
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-space-surface)",
              background: "var(--color-space-elevated)",
              padding: "4px 8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {post.subcategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          marginBottom: 24,
        }}>
          {post.title}
        </h1>

        {/* Metadata */}
        <div style={{
          display: "flex",
          gap: 16,
          fontSize: 11,
          textTransform: "uppercase",
          color: "var(--color-accent-secondary)",
          fontFamily: 'var(--font-mono)',
          marginBottom: 48,
          paddingBottom: 24,
          borderBottom: "1px solid var(--color-space-surface)",
        }}>
          <span>{post.date}</span>
          <span>|</span>
          <span>{post.readingTime} MIN READ</span>
        </div>

        {/* Content */}
        <div style={{
          color: "var(--color-text-body)",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: 'var(--font-sans)',
        }}>
          {post.content.split("\n\n").map((rawParagraph, i) => {
            const paragraph = rawParagraph.trim();
            if (!paragraph) return null;
            
            const renderInline = (text: string) => {
              let html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: var(--color-space-surface); padding: 2px 6px; border-radius: 0; font-size: 0.9em; color: var(--color-text-primary); border: 1px solid var(--color-accent-secondary)">$1</code>');
              return <span dangerouslySetInnerHTML={{ __html: html }} />;
            };

            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ display: "flex", gap: 16, margin: "48px 0 24px", borderBottom: "1px solid var(--color-space-surface)", paddingBottom: 16 }}>
                  <div style={{ width: 4, background: "var(--color-accent-primary)", flexShrink: 0 }} />
                  <h2 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 24,
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    fontWeight: 700,
                    margin: 0,
                  }}>
                    {renderInline(paragraph.replace("## ", ""))}
                  </h2>
                </div>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 24px", margin: "16px 0", listStyleType: "square" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 8 }}>
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
              const cleanText = paragraph.replace(/> \[!(WARNING|TIP|NOTE|IMPORTANT)\]\n> /g, "").replace(/\n> /g, " ");
              return (
                <div key={i} style={{
                  margin: "32px 0",
                  padding: "24px",
                  background: "var(--color-space-surface)",
                  border: "1px solid var(--color-accent-secondary)",
                  color: "var(--color-text-primary)",
                }}>
                  <strong style={{ color: "var(--color-accent-primary)", display: "block", marginBottom: 12, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: 'var(--font-mono)' }}>
                    [ {isWarning ? "WARNING" : (isTip ? "TIP" : (isImportant ? "IMPORTANT" : "NOTE"))} ]
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
                  <div key={i} style={{ overflowX: "auto", margin: "32px 0", border: "1px solid var(--color-space-surface)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "var(--color-space-surface)", borderBottom: "1px solid var(--color-accent-secondary)" }}>
                          {headers.map((h, idx) => (
                            <th key={idx} style={{ padding: "16px", textAlign: "left", color: "var(--color-text-primary)", fontWeight: 600, fontFamily: 'var(--font-mono)', textTransform: "uppercase", fontSize: 12 }}>
                              {renderInline(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid var(--color-space-surface)" }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: "16px", color: "var(--color-text-body)" }}>
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
                  <div key={i} style={{ margin: "40px 0", border: "1px solid var(--color-accent-secondary)", padding: 8 }}>
                    <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block" }} />
                    <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: "var(--color-accent-secondary)", textTransform: "uppercase", textAlign: "center" }}>
                      FIG: {match[1]}
                    </div>
                  </div>
                );
              }
            }

            if (paragraph.startsWith("\`\`\`")) {
              const codeContent = paragraph.replace(/```\w*\n/g, "").replace(/\n```/g, "").replace(/```/g, "");
              return (
                <pre key={i} style={{
                  background: "var(--color-space-surface)",
                  padding: "24px",
                  border: "1px solid var(--color-accent-secondary)",
                  overflowX: "auto",
                  margin: "32px 0",
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
              <p key={i} style={{ marginBottom: 24 }}>
                {renderInline(paragraph)}
              </p>
            );
          })}
        </div>

        {/* Bottom navigation */}
        <div style={{
          marginTop: 64,
          paddingTop: 32,
          borderTop: "1px solid var(--color-space-surface)",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Link href="/blog" style={{ color: "var(--color-text-primary)", fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: "uppercase", textDecoration: "none" }}>
            [ ← Back to Blog ]
          </Link>
          <Link href="/" style={{ color: "var(--color-accent-secondary)", fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: "uppercase", textDecoration: "none" }}>
            [ Back to Home → ]
          </Link>
        </div>
      </article>
    </div>
  );
}
