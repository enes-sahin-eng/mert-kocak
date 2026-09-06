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

/**
 * Klinik konum verisi. Tek fiziksel adres olduğu için (SiteSettings'teki
 * `address` serbest metin gibi) burada JSON-LD şeması için yapılandırılmış
 * hâlde tutulur. Klinik taşınırsa yalnızca burası güncellenir.
 */
export const BUSINESS_ADDRESS = {
  streetAddress: "Ahmet Adnan Saygun Caddesi, Menekşe 1 Blok No:2 D:3",
  addressLocality: "Beşiktaş",
  addressRegion: "İstanbul",
  postalCode: "34337",
  addressCountry: "TR",
};

/** Google Haritalar'daki gerçek pin konumu (Etiler klinik). */
export const BUSINESS_GEO = { latitude: 41.076658, longitude: 29.025568 };

/** Google'ın "$$" gösterimine karşılık gelen kabaca orta segment fiyat aralığı. */
export const BUSINESS_PRICE_RANGE = "₺₺";

const TR_DAY_TO_SCHEMA: Record<string, string> = {
  pazartesi: "Monday",
  salı: "Tuesday",
  sali: "Tuesday",
  çarşamba: "Wednesday",
  carsamba: "Wednesday",
  perşembe: "Thursday",
  persembe: "Thursday",
  cuma: "Friday",
  cumartesi: "Saturday",
  pazar: "Sunday",
};

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * CMS'teki çalışma saatleri satırlarını ("Pazartesi - Cuma" / "09:00 - 20:00"
 * gibi) schema.org OpeningHoursSpecification'a çevirir. "Kapalı" yazan
 * satırlar (ör. Pazar) atlanır — kapalı günü hiç belirtmemek geçerlidir.
 * Tanınmayan bir gün adı veya saat biçimiyle karşılaşırsa o satırı sessizce
 * atlar; site asla kırılmaz.
 */
export function buildOpeningHours(
  workingHours: { label: string; value: string }[],
): { "@type": "OpeningHoursSpecification"; dayOfWeek: string[]; opens: string; closes: string }[] {
  const specs: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[] = [];

  for (const { label, value } of workingHours) {
    const timeMatch = value.match(/(\d{1,2}[:.]\d{2})\s*-\s*(\d{1,2}[:.]\d{2})/);
    if (!timeMatch) continue; // "Kapalı" vb.

    const [, opensRaw, closesRaw] = timeMatch;
    const opens = opensRaw.replace(".", ":");
    const closes = closesRaw.replace(".", ":");

    const dayNames = label
      .toLocaleLowerCase("tr-TR")
      .split(/-|,|\/|\bve\b/)
      .map((s) => s.trim())
      .filter(Boolean);

    let days: string[] = [];
    if (dayNames.length === 2 && dayNames.every((d) => TR_DAY_TO_SCHEMA[d])) {
      // "Pazartesi - Cuma" gibi bir aralık: ikisi arasındaki tüm günler.
      const startIdx = DAY_ORDER.indexOf(TR_DAY_TO_SCHEMA[dayNames[0]]);
      const endIdx = DAY_ORDER.indexOf(TR_DAY_TO_SCHEMA[dayNames[1]]);
      if (startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx) {
        days = DAY_ORDER.slice(startIdx, endIdx + 1);
      }
    } else {
      days = dayNames.map((d) => TR_DAY_TO_SCHEMA[d]).filter(Boolean) as string[];
    }

    if (days.length === 0) continue;

    specs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes });
  }

  return specs;
}

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
