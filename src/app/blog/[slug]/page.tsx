import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/HeritageIcon";
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
        background: "#121110",
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
            fontFamily: "var(--font-serif)",
            fontSize: 11,
            fontWeight: 600,
            color: "#C5A059",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            background: "rgba(197, 160, 89, 0.08)",
            padding: "4px 10px",
            borderRadius: 3,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            {post.category}
          </span>

          {post.subcategory && (
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-serif)",
              fontSize: 11,
              fontWeight: 600,
              color: "#FAF6EE",
              border: "1px solid rgba(197, 160, 89, 0.25)",
              background: "#15261E",
              padding: "4px 10px",
              borderRadius: 3,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              {post.subcategory}
            </span>
          )}
        </div>

        {/* Article Title */}
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(30px, 4.5vw, 48px)",
          fontWeight: 600,
          color: "#FAF6EE",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div style={{
          display: "flex",
          gap: 12,
          fontSize: 12,
          textTransform: "uppercase",
          color: "#9E978E",
          fontFamily: "var(--font-serif)",
          marginBottom: 40,
          paddingBottom: 18,
          borderBottom: "1px solid rgba(197, 160, 89, 0.18)",
          alignItems: "center",
          flexWrap: "wrap",
          letterSpacing: "0.06em",
        }}>
          <span>PUBLISHED: {post.date}</span>
          <span style={{ color: "rgba(197, 160, 89, 0.4)" }}>•</span>
          <span style={{ color: "#FAF6EE" }}>FOLIO: {post.readingTime} MIN READ</span>
          <span style={{ color: "rgba(197, 160, 89, 0.4)" }}>•</span>
          <span style={{ color: "#C5A059" }}>CURATED BY FRANCESCO CASTALDI</span>
        </div>

        {/* Article Markdown Body */}
        <div style={{
          color: "#E8E3D6",
          fontSize: 16,
          lineHeight: 1.8,
          fontFamily: "var(--font-body)",
          opacity: 0.95,
        }}>
          {post.content.split("\n\n").map((rawParagraph, i) => {
            const paragraph = rawParagraph.trim();
            if (!paragraph) return null;
            
            const renderInline = (text: string) => {
              const html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FAF6EE; font-weight: 600;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: #15261E; padding: 2px 6px; font-size: 0.88em; color: #C5A059; border: 1px solid rgba(197, 160, 89, 0.25); border-radius: 3px;">$1</code>');
              return <span dangerouslySetInnerHTML={{ __html: html }} />;
            };

            // H2 Section Headers
            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ margin: "44px 0 20px", borderBottom: "1px solid rgba(197, 160, 89, 0.18)", paddingBottom: 14 }}>
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    color: "#FAF6EE",
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}>
                    {renderInline(paragraph.replace("## ", ""))}
                  </h2>
                </div>
              );
            }

            // Bullet Lists
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 20px", margin: "16px 0", listStyleType: "circle" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 8, color: "#E8E3D6" }}>
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
              const calloutTitle = isWarning ? "CAUTION" : (isTip ? "OBSERVATION" : (isImportant ? "IMPORTANT NOTICE" : "SCHOLARLY NOTE"));

              return (
                <div key={i} style={{
                  margin: "28px 0",
                  padding: "20px 24px",
                  background: "#15261E",
                  border: "1px solid rgba(197, 160, 89, 0.28)",
                  borderRadius: 4,
                  color: "#E8E3D6",
                }}>
                  <strong style={{ color: "#C5A059", display: "block", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                    {calloutTitle}
                  </strong>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: "#E8E3D6", opacity: 0.9 }}>
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
                  <div key={i} style={{ overflowX: "auto", margin: "28px 0", border: "1px solid rgba(197, 160, 89, 0.22)", background: "#15261E", borderRadius: 4 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#1B2E24", borderBottom: "1px solid rgba(197, 160, 89, 0.25)" }}>
                          {headers.map((h, idx) => (
                            <th key={idx} style={{ padding: "12px 16px", textAlign: "left", color: "#FAF6EE", fontWeight: 600, fontFamily: "var(--font-serif)", textTransform: "uppercase", fontSize: 12, letterSpacing: "0.05em" }}>
                              {renderInline(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid rgba(197, 160, 89, 0.12)" }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: "12px 16px", color: "#E8E3D6" }}>
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
                  <div key={i} style={{ margin: "36px 0", border: "1px solid rgba(197, 160, 89, 0.25)", background: "#15261E", borderRadius: 4, padding: 8 }}>
                    <img src={match[2]} alt={match[1]} style={{ width: "100%", height: "auto", display: "block", borderRadius: 2 }} />
                    <div style={{ marginTop: 8, fontFamily: "var(--font-serif)", fontSize: 11, color: "#9E978E", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.06em" }}>
                      FIGURE: {match[1]}
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
                  background: "#15261E",
                  padding: "20px",
                  border: "1px solid rgba(197, 160, 89, 0.22)",
                  borderRadius: 4,
                  overflowX: "auto",
                  margin: "28px 0",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "#FAF6EE",
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
          borderTop: "1px solid rgba(197, 160, 89, 0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <Link
            href="/blog"
            style={{
              color: "#121110",
              background: "linear-gradient(135deg, #C5A059 0%, #A6803B 100%)",
              border: "1px solid #C5A059",
              borderRadius: 4,
              padding: "10px 22px",
              fontSize: 12,
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              textTransform: "uppercase",
              textDecoration: "none",
              letterSpacing: "0.06em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <ArrowLeftIcon size={14} color="#121110" />
            <span>Return to Archival Index</span>
          </Link>

          <Link
            href="/"
            style={{
              color: "#FAF6EE",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              background: "#15261E",
              borderRadius: 4,
              padding: "10px 22px",
              fontSize: 12,
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              textTransform: "uppercase",
              textDecoration: "none",
              letterSpacing: "0.06em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span>Return to Monograph Portal</span>
            <ArrowRightIcon size={14} color="#C5A059" />
          </Link>
        </div>

      </article>
    </div>
  );
}
