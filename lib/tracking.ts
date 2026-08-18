import { API_BASE_URL } from "@/lib/api";
import { captureAttribution } from "@/lib/contact";

export type TrackEvent =
  | "whatsapp_click"
  | "info_cta_click"
  | "contact_form_submit";

const VISITOR_KEY = "mk_visitor_id";

/**
 * Tarayıcıda kalıcı, anonim bir ziyaretçi kimliği üretir/okur.
 * Tekil (kişi bazlı) sayım için kullanılır; kişisel veri içermez.
 */
function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/**
 * Ziyaretçi etkileşimini backend'e bildirir (best-effort).
 * Hata sessizce yutulur — izleme hiçbir zaman kullanıcı akışını bozmaz.
 * `keepalive` sayesinde dış linke (WhatsApp) geçişte de istek tamamlanır.
 */
export function track(type: TrackEvent, placement?: string): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    type,
    visitorId: getVisitorId(),
    placement: placement ?? null,
    ...captureAttribution(),
  });

  void fetch(`${API_BASE_URL}/api/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {});
}
