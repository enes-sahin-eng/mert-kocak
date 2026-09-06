import { NextResponse } from "next/server";
import { INDEXNOW_KEY, pingIndexNow } from "@/lib/indexnow";

/**
 * Sitemap'teki tüm URL'leri IndexNow'a (Bing/Yandex) bildirir.
 *
 * Kullanım: büyük bir içerik güncellemesinden sonra tarayıcıda
 *   https://mertkocak.com/api/indexnow?key=<INDEXNOW_KEY>
 * adresini açmak yeterli. `key` INDEXNOW_KEY env değişkeniyle eşleşmezse
 * 403 döner — yetkisiz kullanım engellenir.
 *
 * İleride: her içerik yayınlandığında otomatik tetiklemek için backend'den
 * (Filament kayıt kaydedildiğinde) bu uca bir istek atılabilir.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  if (!INDEXNOW_KEY || searchParams.get("key") !== INDEXNOW_KEY) {
    return NextResponse.json({ ok: false, message: "Yetkisiz." }, { status: 403 });
  }

  // Kendi origin'inden (istekle aynı host/port) çeker — SITE_URL env yerel
  // geliştirmede farklı bir porta işaret edebilir, bu şekilde her ortamda
  // doğru sitemap'e ulaşılır. sitemap.xml içindeki URL'ler zaten SITE_URL
  // ile üretildiği için (bkz. app/sitemap.ts) IndexNow'a gidenler doğrudur.
  const sitemapUrl = new URL("/sitemap.xml", request.url);

  let urls: string[] = [];
  try {
    const res = await fetch(sitemapUrl, { cache: "no-store" });
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  } catch {
    return NextResponse.json({ ok: false, message: "sitemap.xml okunamadı." }, { status: 500 });
  }

  const result = await pingIndexNow(urls);

  return NextResponse.json({ ...result, submittedCount: urls.length });
}
