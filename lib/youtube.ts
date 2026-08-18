/**
 * Çeşitli YouTube URL biçimlerinden (veya ham ID'den) video ID'sini çıkarır.
 * Desteklenen: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID,
 * youtube.com/shorts/ID ve doğrudan 11 karakterlik ID.
 */
export function getYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null;
  const value = input.trim();

  // Ham ID (11 karakter)
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.slice(1) || null;
    }

    if (host.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;

      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "v");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch {
    // URL değilse aşağıda null döner
  }

  return null;
}

/**
 * Modal/tıklayınca oynatılan video için embed URL'i (autoplay açık).
 */
export function youtubeEmbedUrl(input: string | null | undefined): string | null {
  const id = getYouTubeId(input);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

/**
 * Arka plan videosu için embed URL'i (sessiz, otomatik oynatan, döngüde,
 * kontrolsüz). Döngü için playlist=id parametresi gerekir.
 */
export function youtubeBackgroundUrl(input: string | null | undefined): string | null {
  const id = getYouTubeId(input);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    showinfo: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    disablekb: "1", // klavye kontrolleri kapalı
    fs: "0", // tam ekran düğmesi yok
    iv_load_policy: "3", // ek açıklamalar (annotations) gizli
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
