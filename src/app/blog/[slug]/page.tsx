import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";
import BlogArticleClient from "./BlogArticleClient";

/* ── Static params for SSG ── */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ── Dynamic metadata per article ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Articolo non trovato | CIVIKA" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      locale: "it_IT",
      siteName: "CIVIKA",
      url: `https://civika.it/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["CIVIKA"],
      tags: [post.category, "Comunicazione Istituzionale", "Comuni Siciliani"],
      images: [
        {
          url: "https://civika.it/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["https://civika.it/og-image.png"],
    },
    alternates: {
      canonical: `https://civika.it/blog/${post.slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  /* JSON-LD structured data for the article */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CIVIKA",
      url: "https://civika.it",
    },
    publisher: {
      "@type": "Organization",
      name: "CIVIKA",
      url: "https://civika.it",
      logo: {
        "@type": "ImageObject",
        url: "https://civika.it/logo-civika-new.svg",
        width: 200,
        height: 50,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://civika.it/blog/${post.slug}`,
    },
    image: "https://civika.it/og-image.png",
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: "it",
  };

  /* Breadcrumb JSON-LD */
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://civika.it",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://civika.it/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://civika.it/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogArticleClient post={post} />
    </>
  );
}
