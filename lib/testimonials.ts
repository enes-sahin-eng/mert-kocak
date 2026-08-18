import { API_BASE_URL } from "@/lib/api";

export type TestimonialPlatform =
  | "google"
  | "doktortakvimi"
  | "instagram"
  | "website";

export interface Testimonial {
  id: number;
  name: string;
  quote: string | null;
  rating: number;
  platform: TestimonialPlatform;
  avatarUrl: string | null;
  sourceUrl: string | null;
  verified: boolean;
  reviewedAt: string | null;
  date: string | null;
}

/**
 * Backend erişilemezse / API henüz seed edilmemişse kullanılacak varsayılanlar.
 * Frontend tasarımının orijinal içerikleriyle birebir aynıdır.
 */
export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayşe K.",
    quote:
      "Mert Bey ile çalışmaya başladığımdan beri hayatımda büyük değişiklikler oldu. Kendimi daha iyi tanıyor ve duygularımı daha sağlıklı yönetebiliyorum. Kesinlikle tavsiye ederim.",
    rating: 5,
    platform: "google",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "2 hafta önce",
  },
  {
    id: 2,
    name: "Mehmet T.",
    quote:
      "İlişkimizde yaşadığımız iletişim sorunlarını aşmamıza yardımcı oldu. Şimdi eşimle birbirimizi daha iyi anlıyoruz. Profesyonel ve empatik yaklaşımı için teşekkürler.",
    rating: 5,
    platform: "doktortakvimi",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "1 ay önce",
  },
  {
    id: 3,
    name: "Zeynep A.",
    quote:
      "EMDR terapisi gerçekten işe yarıyor. Yıllardır taşıdığım travmatik anılarla başa çıkmamı sağladı. Mert Bey bu konuda çok deneyimli ve güven veriyor.",
    rating: 5,
    platform: "google",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "3 hafta önce",
  },
  {
    id: 4,
    name: "Emre S.",
    quote:
      "Panik ataklarım artık hayatımı kontrol etmiyor. Öğrendiğim tekniklerle kaygımı yönetebiliyorum. 6 aydır devam ediyorum ve çok memnunum.",
    rating: 5,
    platform: "doktortakvimi",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "2 ay önce",
  },
  {
    id: 5,
    name: "Selin D.",
    quote:
      "Online terapi seçeneği çok pratik. Yoğun iş temposunda bile seanslarımı aksatmadan devam edebiliyorum. Mert Bey'in yaklaşımı çok profesyonel.",
    rating: 5,
    platform: "instagram",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "1 hafta önce",
  },
  {
    id: 6,
    name: "Can B.",
    quote:
      "Depresyonla mücadelemde yanımda olduğu için minnettarım. Artık hayata daha umutlu bakıyorum. Herkese tavsiye ederim.",
    rating: 5,
    platform: "google",
    avatarUrl: null,
    sourceUrl: null,
    verified: true,
    reviewedAt: null,
    date: "1 ay önce",
  },
];

/**
 * Onaylı danışan yorumlarını backend'den çeker. Her istekte taze veri alır
 * (cache yok → panelden onaylanan yorum anında yansır). Hata durumunda
 * veya liste boşsa varsayılanlara düşer (site asla kırılmaz).
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/testimonials`, {
      cache: "no-store",
    });
    if (!res.ok) return defaultTestimonials;
    const json = (await res.json()) as { data: Testimonial[] };
    return json.data?.length ? json.data : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}
