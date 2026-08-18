import { API_BASE_URL } from "@/lib/api";

export interface Therapy {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  details: string | null;
  image: string | null;
}

/**
 * Backend erişilemezse / API henüz seed edilmemişse kullanılacak varsayılanlar.
 * Frontend tasarımının orijinal içerikleriyle birebir aynıdır.
 */
export const defaultTherapies: Therapy[] = [
  {
    id: 1,
    title: "Bireysel Terapi",
    subtitle: "Kişisel Gelişim",
    description: "İçsel yolculuğunuzda size eşlik ediyorum.",
    details: "Kendinizi tanıma ve potansiyelinizi keşfetme.",
    image: null,
  },
  {
    id: 2,
    title: "Çift Terapisi",
    subtitle: "İlişki Danışmanlığı",
    description: "İlişkilerinizi güçlendirin ve derinleştirin.",
    details: "Sağlıklı iletişim kalıpları oluşturma.",
    image: null,
  },
  {
    id: 3,
    title: "EMDR Terapi",
    subtitle: "Travma Tedavisi",
    description: "Geçmişin izlerini dönüştürün.",
    details: "Bilimsel olarak kanıtlanmış travma tedavisi.",
    image: null,
  },
  {
    id: 4,
    title: "Bilişsel Davranışçı",
    subtitle: "BDT Yaklaşımı",
    description: "Düşünce kalıplarınızı dönüştürün.",
    details: "Davranış değişikliği için etkili stratejiler.",
    image: null,
  },
  {
    id: 5,
    title: "Anksiyete Terapisi",
    subtitle: "Kaygı Yönetimi",
    description: "Kaygıyla başa çıkma stratejileri.",
    details: "Panik atak ve sosyal fobi tedavisi.",
    image: null,
  },
  {
    id: 6,
    title: "Depresyon Terapisi",
    subtitle: "Duygudurum Desteği",
    description: "Karanlıktan aydınlığa çıkış yolu.",
    details: "Umut ve iyileşme odaklı yaklaşım.",
    image: null,
  },
];

/**
 * Terapi hizmetlerini backend'den çeker. Her istekte taze veri alır
 * (cache yok → admin paneldeki değişiklik anında yansır). Hata durumunda
 * veya liste boşsa varsayılanlara düşer (site asla kırılmaz).
 */
export async function getTherapies(): Promise<Therapy[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/therapies`, {
      cache: "no-store",
    });
    if (!res.ok) return defaultTherapies;
    const json = (await res.json()) as { data: Therapy[] };
    return json.data?.length ? json.data : defaultTherapies;
  } catch {
    return defaultTherapies;
  }
}
