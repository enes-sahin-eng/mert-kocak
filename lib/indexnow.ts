import { SITE_URL } from "@/lib/seo";

/**
 * IndexNow: Bing ve Yandex'e "şu URL'ler değişti, hemen tara" diye anlık
 * bildirim gönderir. ChatGPT'nin arama katmanı Bing indeksine dayandığı
 * için GEO açısından değerlidir (bkz. seo-geo-rehber.md Bölüm 3.4 / 8.8).
 *
 * Anahtar: public/{INDEXNOW_KEY}.txt dosyasının adı ve içeriği anahtarla
 * birebir aynı olmalı — Bing bunu doğrulama için indirir. Anahtar
 * değiştirilirse hem env hem dosya adı güncellenmeli.
 */
export const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";

/**
 * Verilen URL listesini IndexNow'a bildirir. Anahtar tanımlı değilse
 * (ör. yerel geliştirme) sessizce atlar. Hata durumunda fırlatmaz —
 * bildirim başarısız olsa da site/işlem asla kesintiye uğramaz.
 */
export async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number }> {
  if (!INDEXNOW_KEY || urls.length === 0) return { ok: false };

  const host = new URL(SITE_URL).host;

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false };
  }
}
