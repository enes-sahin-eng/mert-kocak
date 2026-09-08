import { getSettings } from "@/lib/settings";
import { getTherapies } from "@/lib/therapies";
import { getPosts } from "@/lib/blog";
import { getSeoPageContent, type SeoPageContent } from "@/lib/seoPage";
import * as psikolog from "@/app/psikolog/content";
import * as istanbulPsikolog from "@/app/istanbul-psikolog/content";
import * as etilerPsikolog from "@/app/etiler-psikolog/content";
import * as onlineTerapi from "@/app/online-terapi/content";
import * as istanbulOnlineTerapi from "@/app/istanbul-online-terapi/content";

// /psikolog, /istanbul-psikolog, /etiler-psikolog, /online-terapi,
// /istanbul-online-terapi: blog CMS'i ile uyumsuz
// oldukları için ayrı, bağımsız SEO sayfaları (bkz. ilgili content.ts).
// Panelde "SEO Sayfaları"nda kayıt varsa o içerik, yoksa buradaki fallback
// kullanılır — page.tsx'lerdeki mantıkla birebir aynı.
const SEO_PAGES: { slug: string; fallback: SeoPageContent }[] = [
  {
    slug: "psikolog",
    fallback: {
      slug: "psikolog",
      metaTitle: psikolog.metaTitle,
      metaDescription: psikolog.metaDescription,
      heroEyebrow: psikolog.heroEyebrow,
      heroTitle: psikolog.heroTitle,
      breadcrumbLabel: "Psikolog",
      articleHtml: psikolog.articleHtml,
      faq: psikolog.faq,
    },
  },
  {
    slug: "istanbul-psikolog",
    fallback: {
      slug: "istanbul-psikolog",
      metaTitle: istanbulPsikolog.metaTitle,
      metaDescription: istanbulPsikolog.metaDescription,
      heroEyebrow: istanbulPsikolog.heroEyebrow,
      heroTitle: istanbulPsikolog.heroTitle,
      breadcrumbLabel: istanbulPsikolog.breadcrumbLabel,
      articleHtml: istanbulPsikolog.articleHtml,
      faq: istanbulPsikolog.faq,
    },
  },
  {
    slug: "etiler-psikolog",
    fallback: {
      slug: "etiler-psikolog",
      metaTitle: etilerPsikolog.metaTitle,
      metaDescription: etilerPsikolog.metaDescription,
      heroEyebrow: etilerPsikolog.heroEyebrow,
      heroTitle: etilerPsikolog.heroTitle,
      breadcrumbLabel: etilerPsikolog.breadcrumbLabel,
      articleHtml: etilerPsikolog.articleHtml,
      faq: etilerPsikolog.faq,
    },
  },
  {
    slug: "online-terapi",
    fallback: {
      slug: "online-terapi",
      metaTitle: onlineTerapi.metaTitle,
      metaDescription: onlineTerapi.metaDescription,
      heroEyebrow: onlineTerapi.heroEyebrow,
      heroTitle: onlineTerapi.heroTitle,
      breadcrumbLabel: onlineTerapi.breadcrumbLabel,
      articleHtml: onlineTerapi.articleHtml,
      faq: onlineTerapi.faq,
    },
  },
  {
    slug: "istanbul-online-terapi",
    fallback: {
      slug: "istanbul-online-terapi",
      metaTitle: istanbulOnlineTerapi.metaTitle,
      metaDescription: istanbulOnlineTerapi.metaDescription,
      heroEyebrow: istanbulOnlineTerapi.heroEyebrow,
      heroTitle: istanbulOnlineTerapi.heroTitle,
      breadcrumbLabel: istanbulOnlineTerapi.breadcrumbLabel,
      articleHtml: istanbulOnlineTerapi.articleHtml,
      faq: istanbulOnlineTerapi.faq,
    },
  },
];

// CMS'ten taze üretilir; CDN/tarayıcı için 1 saat önbelleklenir.
export const dynamic = "force-dynamic";

function siteUrl(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (env) return env.replace(/\/$/, "");
  return new URL(request.url).origin;
}

/**
 * /llms.txt — LLM'lerin siteyi hızlı ve doğru anlaması için seçilmiş,
 * açıklamalı bir Markdown harita. İçerik backend CMS'inden üretilir.
 * Bkz. https://llmstxt.org
 */
export async function GET(request: Request): Promise<Response> {
  const [settings, therapies, { posts }, seoPages] = await Promise.all([
    getSettings(),
    getTherapies(),
    getPosts({ page: 1 }),
    Promise.all(SEO_PAGES.map((p) => getSeoPageContent(p.slug, p.fallback))),
  ]);

  const base = siteUrl(request);
  const { hero, about, social } = settings;

  const summary = [hero.subtitle, about.heading].filter(Boolean).join(". ");
  const intro = about.paragraphs?.[0] ?? null;

  const lines: string[] = [];

  lines.push("# Mert Koçak — Klinik Psikolog");
  lines.push("");
  if (summary) {
    lines.push(`> ${summary}`);
    lines.push("");
  }
  if (intro) {
    lines.push(intro);
    lines.push("");
  }

  // Hizmetler — varsa kendi detay sayfasına, yoksa ana sayfadaki bölüme bağlanır.
  if (therapies.length) {
    lines.push("## Hizmetler");
    for (const therapy of therapies) {
      const desc = therapy.subtitle ?? therapy.description ?? "";
      const url = therapy.link ? `${base}${therapy.link}` : `${base}/#therapies`;
      lines.push(`- [${therapy.title}](${url})${desc ? `: ${desc}` : ""}`);
    }
    lines.push("");
  }

  // Rehber sayfaları (psikolog, istanbul-psikolog, etiler-psikolog)
  lines.push("## Rehberler");
  for (const page of seoPages) {
    lines.push(`- [${page.heroTitle}](${base}/${page.slug}): ${page.metaDescription}`);
  }
  lines.push("");

  // Bölümler
  lines.push("## Bölümler");
  lines.push(
    `- [Hakkımda](${base}/#about): Klinik psikolog Mert Koçak'ın yaklaşımı ve hikayesi.`,
  );
  lines.push(
    `- [Danışan Yorumları](${base}/#testimonials): Google ve Doktor Takvimi üzerinden doğrulanmış danışan yorumları.`,
  );
  lines.push(
    `- [Blog](${base}/blog): Psikoloji, terapi ve ruh sağlığı üzerine yazılar.`,
  );
  lines.push(
    `- [İletişim](${base}/#contact): Randevu ve iletişim formu.`,
  );
  lines.push("");

  // Son blog yazıları
  if (posts.length) {
    lines.push("## Blog Yazıları");
    for (const post of posts.slice(0, 10)) {
      const desc = post.excerpt ?? "";
      lines.push(
        `- [${post.title}](${base}/blog/${post.slug})${desc ? `: ${desc}` : ""}`,
      );
    }
    lines.push("");
  }

  // İletişim
  lines.push("## İletişim");
  if (settings.phone) {
    const tel = settings.phoneLink ? ` (tel:${settings.phoneLink})` : "";
    lines.push(`- Telefon: ${settings.phone}${tel}`);
  }
  if (settings.whatsapp) {
    lines.push(`- WhatsApp: https://wa.me/${settings.whatsapp}`);
  }
  if (settings.email) {
    lines.push(`- E-posta: ${settings.email}`);
  }
  if (settings.address) {
    lines.push(`- Adres: ${settings.address}`);
  }
  lines.push("");

  // Opsiyonel (context kısaysa atlanabilir)
  const optional: string[] = [];
  if (social.instagram) optional.push(`- [Instagram](${social.instagram})`);
  // linkedin yerine youtube gösteriliyor (bkz. lib/settings.ts)
  if (social.youtube) optional.push(`- [YouTube](${social.youtube})`);
  if (settings.mapUrl) optional.push(`- [Harita / Konum](${settings.mapUrl})`);
  if (optional.length) {
    lines.push("## Optional");
    lines.push(...optional);
    lines.push("");
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
