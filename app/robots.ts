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
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Host direktifi şemasız (protokolsüz) alan adı bekler.
    host: new URL(absoluteUrl("")).host,
  };
}
