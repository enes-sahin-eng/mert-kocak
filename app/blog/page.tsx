import type { Metadata } from "next";
import { getCategories, getFeaturedPosts, getPosts } from "@/lib/blog";
import { getSettings } from "@/lib/settings";
import { absoluteUrl, jsonLdScript, SITE_NAME } from "@/lib/seo";
import BlogListClient from "@/components/blog/BlogListClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}): Promise<Metadata> {
  const { kategori } = await searchParams;
  const title = kategori ? `${kategori} Yazıları` : "Blog";
  const description =
    "Psikoloji, terapi ve kişisel gelişim hakkında bilgilendirici içerikler. Zihinsel sağlık üzerine güncel yazılar.";
  const path = kategori ? `/blog?kategori=${kategori}` : "/blog";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
    },
    twitter: { card: "summary_large_image", title, description },
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
