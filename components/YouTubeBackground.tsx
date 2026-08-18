"use client";

import { useEffect, useRef, useState } from "react";
import { getYouTubeId } from "@/lib/youtube";

// YouTube IFrame API için minimal tipler
interface YTPlayer {
  mute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  destroy?(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data?: number;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiPromise;
}

/**
 * Kontrolsüz, sessiz, otomatik oynayan ve JS ile döngüye alınan YouTube arka planı.
 * - Playlist parametresi yok → "önceki/sonraki" transport kontrolleri çıkmaz.
 * - Video oynamaya başlayana kadar üstte küçük resim (thumbnail) kapağı durur;
 *   böylece YouTube'un başlangıçtaki merkez oynat/duraklat göstergesi görünmez.
 * - En üstteki şeffaf kalkan tüm hover/tıklamayı yutar → kontroller tetiklenemez.
 */
export default function YouTubeBackground({ source }: { source: string | null }) {
  const videoId = getYouTubeId(source);
  const targetRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!videoId || !targetRef.current) return;
    let cancelled = false;
    setStarted(false);

    loadYouTubeApi().then(() => {
      if (cancelled || !targetRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(targetRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === window.YT?.PlayerState.PLAYING) {
              setStarted(true);
            }
            if (e.data === window.YT?.PlayerState.ENDED) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  if (!videoId) return null;

  return (
    <>
      {/* Cover boyutlandırma: 16:9 videoyu ekranı dolduracak şekilde ölçekler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw] scale-125 pointer-events-none">
        {/* API bu div'i iframe ile değiştirir */}
        <div ref={targetRef} className="w-full h-full" />
      </div>

      {/* Thumbnail kapağı: video oynayana kadar görünür, sonra yumuşakça solar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        aria-hidden="true"
        onError={(e) => {
          e.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }}
        className={`absolute inset-0 w-full h-full object-cover z-20 pointer-events-none transition-opacity duration-700 ${
          started ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Şeffaf kalkan (en üstte): her türlü etkileşimi engeller */}
      <div className="absolute inset-0 z-30" aria-hidden="true" />
    </>
  );
}
