import { cache } from "react";
import { API_BASE_URL } from "@/lib/api";

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoPageContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  breadcrumbLabel: string;
  articleHtml: string;
  faq: SeoFaqItem[];
}

/**
 * Bağımsız SEO sayfası içeriğini (psikolog, istanbul-psikolog, etiler-psikolog)
 * backend'den çeker. Hata durumunda veya backend'de kayıt yoksa `fallback`
 * (sayfanın kendi content.ts dosyasındaki elle girilmiş içerik) kullanılır —
 * sayfa asla kırılmaz.
 *
 * `cache()` ile sarmalanmıştır: aynı istekte hem generateMetadata hem sayfa
 * bileşeni çağırsa da backend'e yalnızca bir kez istek atılır.
 */
export const getSeoPageContent = cache(async function getSeoPageContent(
  slug: string,
  fallback: SeoPageContent,
): Promise<SeoPageContent> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/seo-pages/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as { data: SeoPageContent };
    return json.data ?? fallback;
  } catch {
    return fallback;
  }
});
