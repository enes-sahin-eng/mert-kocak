/**
 * SEO ortak yardımcıları. Site URL'i env'den gelir; canlıda
 * NEXT_PUBLIC_SITE_URL ayarlanmalı (yoksa localhost'a düşer).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Mert Koçak";

export const SITE_TAGLINE = "Klinik Psikolog";

/** Göreli yolu mutlak URL'e çevirir. */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** JSON-LD nesnesini güvenli biçimde <script> içeriği olarak hazırlar. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
