import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// Her istekte taze üretilir (yeni yazı eklenince anında sitemap'e girer).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => (c.postsCount ?? 0) > 0)
    .map((c) => ({
      url: absoluteUrl(`/blog?kategori=${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt ?? now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
