import type { Metadata } from "next";
import { getCategories, getFeaturedPosts, getPosts } from "@/lib/blog";
import { getSettings } from "@/lib/settings";
import { absoluteUrl, defaultOgImage, jsonLdScript, SITE_NAME } from "@/lib/seo";
import BlogListClient from "@/components/blog/BlogListClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; page?: string }>;
}): Promise<Metadata> {
  const { kategori, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const baseTitle = kategori ? `${kategori} Yazıları` : "Blog";
  // Sayfalamada her sayfa KENDİNE canonical verir ve başlığı farklıdır;
  // aksi halde 2., 3. sayfalar 1. sayfanın kopyası gibi görünür.
  const title = currentPage > 1 ? `${baseTitle} — Sayfa ${currentPage}` : baseTitle;
  const description =
    "Psikoloji, terapi ve kişisel gelişim hakkında bilgilendirici içerikler. Zihinsel sağlık üzerine güncel yazılar.";
  const query = new URLSearchParams();
  if (kategori) query.set("kategori", kategori);
  if (currentPage > 1) query.set("page", String(currentPage));
  const path = query.toString() ? `/blog?${query.toString()}` : "/blog";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      images: [defaultOgImage()],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage().url],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; page?: string }>;
}) {
  const { kategori, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const [{ posts, lastPage }, featured, categories, settings] = await Promise.all([
    getPosts({ category: kategori, page: currentPage }),
    kategori || currentPage > 1 ? Promise.resolve([]) : getFeaturedPosts(),
    getCategories(),
    getSettings(),
  ]);

  // Öne çıkanları normal listeden ayıkla (tekrar olmasın)
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const regular = posts.filter((p) => !featuredSlugs.has(p.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "Psikoloji, terapi ve kişisel gelişim üzerine yazılar.",
    url: absoluteUrl("/blog"),
    inLanguage: "tr-TR",
    blogPost: [...featured, ...regular].slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt ?? undefined,
      image: p.coverImage ?? undefined,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }} />
      <BlogListClient
        featuredPosts={featured}
        posts={regular}
        categories={categories}
        activeCategory={kategori ?? null}
        currentPage={currentPage}
        lastPage={lastPage}
        settings={settings}
      />
    </>
  );
}
