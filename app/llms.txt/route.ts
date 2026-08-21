import { getSettings } from "@/lib/settings";
import { getTherapies } from "@/lib/therapies";
import { getPosts } from "@/lib/blog";

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
  const [settings, therapies, { posts }] = await Promise.all([
    getSettings(),
    getTherapies(),
    getPosts({ page: 1 }),
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

  // Hizmetler
  if (therapies.length) {
    lines.push("## Hizmetler");
    for (const therapy of therapies) {
      const desc = therapy.subtitle ?? therapy.description ?? "";
      lines.push(
        `- [${therapy.title}](${base}/#therapies)${desc ? `: ${desc}` : ""}`,
      );
    }
    lines.push("");
  }

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
