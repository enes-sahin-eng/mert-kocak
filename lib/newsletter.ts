import { API_BASE_URL } from "@/lib/api";

export interface NewsletterResult {
  ok: boolean;
  message?: string;
  error?: string;
}

/** Bülten aboneliği. Kaynak (referrer/utm) sunucuya iletilir. */
export async function subscribeNewsletter(email: string): Promise<NewsletterResult> {
  let referrer: string | null = null;
  let utmSource: string | null = null;
  if (typeof window !== "undefined") {
    referrer = document.referrer || null;
    utmSource = new URLSearchParams(window.location.search).get("utm_source");
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, referrer, utmSource }),
    });

    if (res.status === 422) {
      const json = (await res.json()) as { errors?: { email?: string[] } };
      return { ok: false, error: json.errors?.email?.[0] ?? "Geçerli bir e-posta girin." };
    }
    if (res.status === 429) {
      return { ok: false, error: "Çok fazla deneme. Lütfen biraz sonra tekrar deneyin." };
    }
    if (!res.ok) {
      return { ok: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." };
    }

    const json = (await res.json()) as { message?: string };
    return { ok: true, message: json.message };
  } catch {
    return { ok: false, error: "Bağlantı hatası. Lütfen tekrar deneyin." };
  }
}
