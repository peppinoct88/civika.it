import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.civika.it";

  /* Static pages — use real last-modified dates */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date("2026-02-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* Service pages */
  const servicePages: MetadataRoute.Sitemap = [
    "servizi",
    "servizi/comunicazione-istituzionale",
    "servizi/sito-web-comunale-agid",
    "servizi/social-media-comuni",
    "servizi/eventi-istituzionali",
    "servizi/bandi-europei-comuni",
    "servizi/ufficio-stampa-comuni",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date("2026-03-03"),
    changeFrequency: "monthly" as const,
    priority: slug === "servizi" ? 0.9 : 0.85,
  }));

  /* Blog articles */
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
