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

const nextConfig: NextConfig = {
  // "X-Powered-By: Next.js" başlığını gizle.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
