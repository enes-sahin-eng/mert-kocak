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
    // linkedin: backend'den gelmeye devam ediyor, arayüzde şu an gösterilmiyor (YouTube ile değiştirildi).
    linkedin: string;
    youtube: string;
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
  phone: "+90 501 264 84 84",
  phoneLink: "+905012648484",
  whatsapp: "905012648484",
  email: "bilgi@mertkocak.com",
  address: "Nisbetiye, Ahmet Adnan Saygun Cd. Menekşe 1 Blok No:2 D:3, 34337 Beşiktaş/İstanbul",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=%C4%B0stanbul+Etiler+Psikoloji+Dan%C4%B1%C5%9Fmanl%C4%B1k+Merkezi+Mert+Ko%C3%A7ak+Nisbetiye+Ahmet+Adnan+Saygun+Cd+Menek%C5%9Fe+1+Blok+No%3A2+D%3A3+34337+Be%C5%9Fikta%C5%9F",
  social: {
    instagram: "https://www.instagram.com/mertkocakmusic",
    linkedin: "https://linkedin.com",
    youtube: "https://www.youtube.com/@MertKocak",
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
    heading: "Klinik Psikolog Mert Koçak",
    paragraphs: [
      "Lisans eğitimimi Psikoloji, lisansüstü eğitimimi Klinik Psikoloji alanında tamamladım. Amerika'da Harvard Üniversitesi'nde 'Psikoterapi ve Meditasyon' eğitimi aldım ve çeşitli üniversitelerde eğitim, konferans ve etkinliklere katıldım.",
      "Türkiye'de birçok TV ve radyo programına konuk oldum ve konuşmalar yaptım. İletişim, insan ilişkileri, aşk, sevgi, bağlılık, aldatma, ayrılık gibi duyguların insan doğasında işlenişi ve çözümlenmesi konusuna yoğunlaştım, bu alanda araştırmalar yapıp çalışmalar yürüttüm. Türkiye'nin birçok şehrinde binlerce insana psikoloji alanında seminerler verdim.",
      "Çektiğim videolar ve yazdıklarım büyük ilgi gördü, Instagram'da 1 milyondan fazla takipçiye ulaştım. İki kitabım var ve farklı psikoloji alanlarında eğitim ve sertifikaya sahibim.",
      "Ergen ve yetişkinlerle bireysel ve çift terapisti olarak çalışıyorum. Dünyanın birçok ülkesinden danışan ve hastalarımı online ve yüz yüze görmeye devam ediyorum. Mert Koçak Psikoloji Danışmanlık Merkezi'nin kurucusuyum. New York ve İstanbul'da yaşamımı sürdürüyor, İstanbul'da kurduğum psikoloji danışmanlık merkezinde klinik psikolog olarak mesleğime devam ediyorum.",
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
      label: "Bu Hafta",
      text: "Videomuzu Keşfedin",
      type: "youtube",
      videoUrl: null,
      youtube: "https://youtu.be/pW2K6Sa9OXQ?si=8ACt_tKTx8i_SgKU",
    },
  },
};

/**
 * Site ayarlarını backend'den çeker. Sunucu tarafında her istekte taze
 * veri alır (cache yok → admin paneldeki değişiklik anında yansır).
 * Hata durumunda varsayılanlara düşer (site asla kırılmaz).
 */
export async function getSettings(): Promise<SiteSettings> {
  // GEÇİCİ: backend fetch devre dışı, elle girilen defaultSettings kullanılıyor.
  return defaultSettings;
  // try {
  //   const res = await fetch(`${API_BASE_URL}/api/settings`, {
  //     cache: "no-store",
  //   });
  //   if (!res.ok) return defaultSettings;
  //   const json = (await res.json()) as { data: SiteSettings };
  //   return json.data ?? defaultSettings;
  // } catch {
  //   return defaultSettings;
  // }
}
