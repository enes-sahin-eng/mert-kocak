import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

// Varsayılan OG paylaşım görseli: sitedeki gerçek fotoğraf + logo renkleri
// kullanılarak 1200x630'a kod ile bileşimleniyor (ayrı bir tasarım dosyası
// yok). Kapak görseli tanımlı olmayan tüm sayfalarda (anasayfa, /psikolog,
// /istanbul-psikolog, /etiler-psikolog, terapi sayfaları) kullanılır; kendi
// opengraph-image'ı olan sayfalar (ör. blog yazıları, kapak görseli varsa)
// bunu geçersiz kılar.

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoData = await readFile(join(process.cwd(), "public/mert-kocak.jpg"), "base64");
  const photoSrc = `data:image/jpeg;base64,${photoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#001d0d",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              color: "#c9a962",
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {SITE_TAGLINE} — İstanbul
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {SITE_NAME}
          </div>
          <div style={{ display: "flex", color: "#e8e6df", fontSize: 30, lineHeight: 1.4 }}>
            Zihinsel sağlığınız için güvenli bir alan.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 550,
            borderRadius: 24,
            overflow: "hidden",
            border: "2px solid #c9a962",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} height={550} style={{ objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    { ...size },
  );
}
