import type { NextConfig } from "next";

// Tüm rotalara uygulanan güvenlik başlıkları (clickjacking, MIME-sniffing,
// referrer sızıntısı vb. karşı). Teknoloji parmak izini de azaltır.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/**
 * Backend'den (Laravel storage) gelen görseller next/image ile kullanıldığı
 * için host'un burada tanımlı olması gerekir; aksi halde Next 400 döner.
 * Adres API tabanından türetilir, böylece ortam değişince ayar da değişir.
 */
function apiImagePattern() {
  const base =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000";

  try {
    return [new URL("/storage/**", base)];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  // "X-Powered-By: Next.js" başlığını gizle.
  poweredByHeader: false,
  images: {
    remotePatterns: apiImagePattern(),
    // Next 16 güvenlik gereği özel/yerel IP'lerden görsel optimize etmez
    // (SSRF koruması). Yalnızca geliştirmede backend localhost'ta çalıştığı
    // için açılır; canlıda (genel IP) kapalı kalır.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
