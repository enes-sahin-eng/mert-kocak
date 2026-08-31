import { API_BASE_URL } from "@/lib/api";

export interface Video {
  id: string; // YouTube video kodu
  title: string;
}

/**
 * Backend erişilemezse / liste boşsa kullanılacak varsayılanlar.
 * Frontend tasarımının orijinal içerikleriyle birebir aynıdır.
 */
export const defaultVideos: Video[] = [
  {
    id: "7d7fDg15Gnc",
    title:
      "İlişki Bitmeden Bağ Biter Mi? — Aldatma ve Aldatılma Serisi, Bölüm 6",
  },
  {
    id: "zP7T42oz-sQ",
    title: "Aldatma Bir Kaçış Mı? — Aldatma ve Aldatılma Serisi, Bölüm 7",
  },
  {
    id: "pW2K6Sa9OXQ",
    title:
      "Aldatmayı Kimden Öğreniyoruz? — Aldatma ve Aldatılma Serisi, Bölüm 8",
  },
  { id: "VPLnuuGYF9Q", title: "Aldatanlar Aslında Ne Arıyor?" },
  {
    id: "nIRAsfai-ag",
    title: "İletişimsizlik Aldatmaya Nasıl Zemin Hazırlar?",
  },
];

/**
 * Ana sayfadaki video listesini backend'den çeker. Her istekte taze veri alır
 * (cache yok → panelde eklenen video anında yansır). Hata durumunda veya liste
 * boşsa varsayılanlara düşer (site asla kırılmaz).
 */
export async function getVideos(): Promise<Video[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/videos`, {
      cache: "no-store",
    });
    if (!res.ok) return defaultVideos;
    const json = (await res.json()) as { data: Video[] };
    return json.data?.length ? json.data : defaultVideos;
  } catch {
    return defaultVideos;
  }
}
