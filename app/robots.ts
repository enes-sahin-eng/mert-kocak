import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Sorgu paramlı filtre/sayfalama varyasyonlarının taranmasını sınırla
        disallow: ["/api/"],
      },
      // AI botları açıkça izinli: GEO için alıntılanabilmek bunlara bağlı.
      // "*" kuralı zaten kapsıyor ama niyeti netleştirmek için ayrı yazıldı.
      { userAgent: "GPTBot", allow: "/" }, // OpenAI — model eğitimi
      { userAgent: "OAI-SearchBot", allow: "/" }, // ChatGPT arama sonuçları
      { userAgent: "ChatGPT-User", allow: "/" }, // Kullanıcı link paylaşımı
      { userAgent: "ClaudeBot", allow: "/" }, // Anthropic
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" }, // Gemini / AI Overviews
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Host direktifi şemasız (protokolsüz) alan adı bekler.
    host: new URL(absoluteUrl("")).host,
  };
}
