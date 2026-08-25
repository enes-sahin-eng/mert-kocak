// eslint-disable-next-line @typescript-eslint/no-unused-vars -- GEÇİCİ SMTP modu boyunca kullanılmıyor, bkz. submitContact
import { API_BASE_URL } from "@/lib/api";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string; // yalnızca rakamlar, ör. 05323323232
  message: string;
}

export interface ContactResult {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Türk cep telefonu maskesi: "05323323232" → "0532 332 32 32".
 * Girdi olarak herhangi bir biçimi (boşluklu/rakam) kabul eder.
 */
export function formatTrPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  const parts = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return parts.filter(Boolean).join(" ");
}

/**
 * Ziyaretçinin nereden geldiğini yakalar (referrer + UTM + landing page).
 * Sunucu ayrıca IP, user-agent ve kaynağı türetir.
 */
export function captureAttribution(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    referrer: document.referrer || null,
    landingPage: window.location.href,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
  };
}

/**
 * İletişim formunu gönderir. 422'de alan hatalarını döndürür.
 * GEÇİCİ: backend hazır olana kadar /api/contact (SMTP) kullanılıyor,
 * bkz. app/api/contact/route.ts. Backend bağlanınca aşağıdaki satır
 * `${API_BASE_URL}/api/contact` olarak geri değiştirilecek.
 */
export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  try {
    const res = await fetch(`/api/contact`, {
      // const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload, ...captureAttribution() }),
    });

    if (res.status === 422) {
      const json = (await res.json()) as { errors?: Record<string, string[]> };
      return { ok: false, errors: json.errors };
    }

    if (res.status === 429) {
      return {
        ok: false,
        message: "Çok fazla deneme yaptınız. Lütfen biraz sonra tekrar deneyin.",
      };
    }

    if (!res.ok) {
      return { ok: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." };
    }

    const json = (await res.json()) as { message?: string };
    return { ok: true, message: json.message };
  } catch {
    return { ok: false, message: "Bağlantı hatası. Lütfen tekrar deneyin." };
  }
}
