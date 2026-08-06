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
        background: "rgba(6, 8, 12, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <article style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]} />

        {/* Category badge */}
        <span style={{
          display: "inline-block",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: "#F59E0B",
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
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "#E7EDF5",
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 12,
        }}>
          {post.title}
        </h1>

        {/* Gold accent line */}
        <div style={{ width: 40, height: 2, background: "#F59E0B", borderRadius: 2, marginBottom: 20 }} />

        {/* Metadata */}
        <div style={{
          display: "flex",
          gap: 16,
          fontSize: 12,
          color: "#4B5768",
          fontFamily: '"Inter", sans-serif',
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
          color: "#9BA9BB",
          fontSize: 15,
          lineHeight: 1.8,
          fontFamily: '"Inter", sans-serif',
        }}>
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <div key={i} style={{ display: "flex", gap: 12, margin: "36px 0 16px" }}>
                  <div style={{ width: 3, background: "#F59E0B", borderRadius: 2, flexShrink: 0 }} />
                  <h2 style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 22,
                    color: "#E7EDF5",
                    fontWeight: 400,
                    margin: 0,
                  }}>
                    {paragraph.replace("## ", "")}
                  </h2>
                </div>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 20px", margin: "12px 0" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 6 }}>
                      {line.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ marginBottom: 20 }}>
                {paragraph}
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
          <Link href="/blog" style={{ color: "#F59E0B", fontSize: 12, fontFamily: '"Inter", sans-serif', textDecoration: "none" }}>
            ← Back to blog
          </Link>
          <Link href="/" style={{ color: "#4B5768", fontSize: 12, fontFamily: '"Inter", sans-serif', textDecoration: "none" }}>
            Back to Home →
          </Link>
        </div>
      </article>
    </div>
  );
}
