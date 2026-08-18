import { API_BASE_URL } from "@/lib/api";

export interface SiteStat {
  value: string;
  label: string;
}

export type VideoSourceType = "upload" | "youtube";

export interface HeroVideoSource {
  type: VideoSourceType;
  videoUrl: string | null;
  youtube: string | null;
}

export interface HeroPromo {
  enabled: boolean;
  label: string | null;
  text: string | null;
  type: VideoSourceType;
  videoUrl: string | null;
  youtube: string | null;
}

export interface HeroSettings {
  words: string[];
  subtitle: string | null;
  background: HeroVideoSource;
  promo: HeroPromo;
}

export interface TestimonialsSection {
  eyebrow: string | null;
  title: string | null;
  titleAccent: string | null;
  googleRating: string | null;
  doktortakvimiRating: string | null;
  ctaHint: string | null;
  ctaLabel: string | null;
}

export interface AboutFloating {
  quote: string | null;
  statTop: string | null;
  statBottom: string | null;
  tag1: string | null;
  tag2: string | null;
}

export interface AboutSettings {
  eyebrow: string | null;
  titleLine1: string | null;
  titleLine2: string | null;
  photo: string | null;
  scrollHint: string | null;
  outerText: string | null;
  innerText: string | null;
  floating: AboutFloating;
  storyEyebrow: string | null;
  heading: string;
  paragraphs: string[];
  ctaLabel: string | null;
}

export interface AuthorInfo {
  name: string;
  title: string;
  bio: string | null;
  image: string | null;
}

export interface SiteSettings {
  phone: string;
  phoneLink: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  social: {
    instagram: string;
    linkedin: string;
  };
  stats: SiteStat[];
  author: AuthorInfo;
  testimonials: TestimonialsSection;
  about: AboutSettings;
  hero: HeroSettings;
}

/**
 * Backend erişilemezse / API henüz seed edilmemişse kullanılacak varsayılanlar.
 * Frontend tasarımının orijinal içerikleriyle birebir aynıdır.
 */
export const defaultSettings: SiteSettings = {
  phone: "+90 532 XXX XX XX",
  phoneLink: "+905321234567",
  whatsapp: "905321234567",
  email: "info@mertkocak.com",
  address: "Beşiktaş, İstanbul",
  mapUrl: "https://maps.google.com",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  stats: [
    { value: "500+", label: "Mutlu Danışan" },
    { value: "10+", label: "Yıl Deneyim" },
    { value: "4.9", label: "Ortalama Puan" },
    { value: "150+", label: "Online Yorum" },
  ],
  author: {
    name: "Mert Koçak",
    title: "Klinik Psikolog",
    bio: "İstanbul'da bireysel ve çift terapisi alanında hizmet veriyorum. Bilişsel davranışçı terapi ve EMDR konularında uzmanım.",
    image: null,
  },
  testimonials: {
    eyebrow: "Danışan Yorumları",
    title: "Onların",
    titleAccent: "Hikayesi",
    googleRating: "4.9",
    doktortakvimiRating: "5.0",
    ctaHint: "Siz de yolculuğunuza başlayın",
    ctaLabel: "Ücretsiz Ön Görüşme",
  },
  about: {
    eyebrow: "Hakkımda",
    titleLine1: "Keşfet",
    titleLine2: "Kendini",
    photo: null,
    scrollHint: "Keşfetmek için kaydır",
    outerText: "KLİNİK PSİKOLOG • MERT KOÇAK • İSTANBUL • TERAPİ • İYİLEŞME • ",
    innerText: "ZİHİNSEL SAĞLIK • BİREYSEL TERAPİ • ÇİFT TERAPİSİ • DESTEK • ",
    floating: {
      quote: "Görünmeyeni görmek",
      statTop: "10+ yıl",
      statBottom: "deneyim",
      tag1: "Bireysel Terapi",
      tag2: "Çift Terapisi",
    },
    storyEyebrow: "Benim Hikayem",
    heading: "Zihinsel sağlık yolculuğunuzda güvenilir bir rehber",
    paragraphs: [
      "İstanbul Üniversitesi Psikoloji bölümünden mezun olduktan sonra, klinik psikoloji alanında uzmanlık eğitimimi tamamladım. On yılı aşkın süredir bireylerin ve çiftlerin ruh sağlığını iyileştirmelerine yardımcı oluyorum.",
      "Çalışmalarımda bilişsel davranışçı terapi, EMDR ve psikanalitik yaklaşımlar dahil olmak üzere kanıta dayalı yöntemler kullanıyorum. Her danışanın benzersiz olduğuna ve kişiselleştirilmiş bir tedavi planını hak ettiğine inanıyorum.",
      "Güvenli ve yargılayıcı olmayan bir ortamda, sizinle birlikte içsel dünyanızı keşfetmek ve hayatınızda anlamlı değişiklikler yaratmanıza yardımcı olmak için buradayım.",
    ],
    ctaLabel: "İletişime Geç",
  },
  hero: {
    words: ["Dinle.", "Anla.", "İyileş."],
    subtitle: "Klinik Psikolog — İstanbul",
    background: {
      type: "upload",
      videoUrl: null,
      youtube: null,
    },
    promo: {
      enabled: true,
      label: "Tanıtım",
      text: "Hikayemi Keşfet",
      type: "youtube",
      videoUrl: null,
      youtube: "https://www.youtube.com/watch?v=RFTUZqXZN6M",
    },
  },
};

/**
 * Site ayarlarını backend'den çeker. Sunucu tarafında her istekte taze
 * veri alır (cache yok → admin paneldeki değişiklik anında yansır).
 * Hata durumunda varsayılanlara düşer (site asla kırılmaz).
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`, {
      cache: "no-store",
    });
    if (!res.ok) return defaultSettings;
    const json = (await res.json()) as { data: SiteSettings };
    return json.data ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
}
