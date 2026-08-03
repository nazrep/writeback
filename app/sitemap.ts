import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const BASE = "https://writeback.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPostsEn = POSTS.filter(p => p.titleEn).map(p => ({
    url: `${BASE}/blog/${p.slug}?lang=en`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const landingPages = [
    "/wzor-reklamacji",
    "/reklamacja-allegro",
    "/jak-napisac-reklamacje",
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/zamow`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...landingPages,
    ...blogPosts,
    ...blogPostsEn,
    {
      url: `${BASE}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/polityka`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
