import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getPost } from "@/lib/blog";
import { getSettings } from "@/lib/settings";
import { absoluteUrl, jsonLdScript, SITE_NAME } from "@/lib/seo";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

export const dynamic = "force-dynamic";

// Aynı istekte generateMetadata + sayfa için tek fetch
const loadPost = cache((slug: string) => getPost(slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) {
    return { title: "Yazı bulunamadı", robots: { index: false, follow: false } };
  }

  const { seo } = post;
  const url = seo.canonicalUrl ?? absoluteUrl(`/blog/${post.slug}`);
  const images = seo.ogImage ? [{ url: seo.ogImage }] : undefined;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription ?? undefined,
    keywords: seo.metaKeywords ?? undefined,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "article",
      title: seo.metaTitle,
      description: seo.metaDescription ?? undefined,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      authors: [post.author.name],
      section: post.category ?? undefined,
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription ?? undefined,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([loadPost(slug), getSettings()]);

  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.seo.ogImage ?? post.coverImage ?? undefined;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription ?? post.excerpt ?? undefined,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    inLanguage: "tr-TR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category ?? undefined,
    keywords: post.seo.metaKeywords ?? (post.tags.join(", ") || undefined),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.title,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }} />
      )}
      <BlogDetailClient post={post} settings={settings} />
    </>
  );
}
