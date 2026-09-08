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

  // Yazıların en yenisinin tarihi: blog listesinin gerçekten değiştiği an.
  const postTimes = posts
    .map((p) => p.updatedAt ?? p.publishedAt)
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime())
    .filter((t) => !Number.isNaN(t));
  const latestPostDate = postTimes.length ? new Date(Math.max(...postTimes)) : undefined;

  // ÖNEMLİ: lastModified yalnızca gerçekten bilinen yerlerde veriliyor.
  // Her istekte new Date() basmak (eski davranış) sayfa değişmese bile
  // "az önce güncellendi" demek olur; Google bunu fark edince lastmod
  // sinyaline güvenmeyi bırakır. Bilmediğimiz yerde alan hiç yazılmıyor.
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPostDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    // Blog CMS'i ile uyumlu olmadığı için elle eklenen bağımsız sayfalar.
    { url: absoluteUrl("/psikolog"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/istanbul-psikolog"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/etiler-psikolog"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/online-terapi"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/istanbul-online-terapi"), changeFrequency: "monthly", priority: 0.9 },
  ];

  const therapyDetailPages: MetadataRoute.Sitemap = therapyPages.map((content) => ({
    url: absoluteUrl(`/${content.slug}`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => (c.postsCount ?? 0) > 0)
    .map((c) => ({
      url: absoluteUrl(`/blog?kategori=${c.slug}`),
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt ?? undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...therapyDetailPages, ...categoryPages, ...postPages];
}
