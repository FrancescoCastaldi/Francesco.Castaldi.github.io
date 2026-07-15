import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
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
        background: "rgba(6, 8, 12, 0.92)",
        backdropFilter: "blur(16px)",
      }}
    >
      <article style={{ maxWidth: 600, margin: "0 auto" }}>
        <Link
          href="/blog"
          className="back-link"
          style={{
            color: "#4B5768",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
          }}
        >
          ← Back to blog
        </Link>

        <h1
          style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 400,
            color: "#E7EDF5",
            marginBottom: 12,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 12,
            color: "#4B5768",
            fontFamily: "Inter, sans-serif",
            marginBottom: 32,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        <div
          style={{
            color: "#9BA9BB",
            fontSize: 14,
            lineHeight: 1.8,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  style={{
                    fontFamily: "DM Serif Display, Georgia, serif",
                    fontSize: 20,
                    color: "#E7EDF5",
                    margin: "32px 0 12px",
                    fontWeight: 400,
                  }}
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} style={{ padding: "0 0 0 20px", margin: "12px 0" }}>
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} style={{ marginBottom: 4 }}>
                      {line.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ marginBottom: 16 }}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
