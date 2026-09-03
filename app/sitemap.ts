import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { bireyselTerapiContent } from "@/lib/therapy/bireysel-terapi";
import { evlilikIliskiTerapisiContent } from "@/lib/therapy/evlilik-iliski-terapisi";
import { kaygiBozukluklariContent } from "@/lib/therapy/kaygi-bozukluklari";
import { depresyonTerapisiContent } from "@/lib/therapy/depresyon-terapisi";
import { olumYasTerapisiContent } from "@/lib/therapy/olum-yas-terapisi";
import { ofkeStresTerapisiContent } from "@/lib/therapy/ofke-stres-terapisi";

// Her istekte taze üretilir (yeni yazı eklenince anında sitemap'e girer).
export const dynamic = "force-dynamic";

const therapyPages = [
  bireyselTerapiContent,
  evlilikIliskiTerapisiContent,
  kaygiBozukluklariContent,
  depresyonTerapisiContent,
  olumYasTerapisiContent,
  ofkeStresTerapisiContent,
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    // GEÇİCİ: blog CMS'i ile uyumlu olmadığı için elle eklenen bağımsız sayfa (bkz. app/psikolog).
    { url: absoluteUrl("/psikolog"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const therapyDetailPages: MetadataRoute.Sitemap = therapyPages.map((content) => ({
    url: absoluteUrl(`/${content.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

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

  return [...staticPages, ...therapyDetailPages, ...categoryPages, ...postPages];
}
