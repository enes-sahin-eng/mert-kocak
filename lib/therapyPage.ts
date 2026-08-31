import { cache } from "react";
import { API_BASE_URL } from "@/lib/api";
import type { TherapyPageContent } from "@/lib/therapy/types";

/**
 * Terapi detay sayfası içeriğini backend'den çeker. Hata durumunda veya
 * backend'de kayıt yoksa `fallback` (lib/therapy/*.ts'teki elle girilmiş
 * içerik) kullanılır — sayfa asla kırılmaz.
 *
 * `cache()` ile sarmalanmıştır: aynı istekte hem generateMetadata hem sayfa
 * bileşeni çağırsa da backend'e yalnızca bir kez istek atılır.
 */
export const getTherapyPageContent = cache(async function getTherapyPageContent(
  slug: string,
  fallback: TherapyPageContent,
): Promise<TherapyPageContent> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/therapy-pages/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as { data: TherapyPageContent };
    return json.data ?? fallback;
  } catch {
    return fallback;
  }
});
