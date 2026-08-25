"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/lib/settings";
import { getYouTubeId, youtubeEmbedUrl } from "@/lib/youtube";
import YouTubeBackground from "@/components/YouTubeBackground";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const hero = settings.hero;
  const words = hero.words.length > 0 ? hero.words : ["Dinle.", "Anla.", "İyileş."];

  // Arka plan video kaynağı
  const bgIsYoutube = hero.background.type === "youtube" && !!hero.background.youtube;
  const bgVideoSrc =
    hero.background.type === "upload" ? hero.background.videoUrl : null;

  // Tanıtım kartı modal video kaynağı
  const promo = hero.promo;
  const promoYoutube =
    promo.type === "youtube" ? youtubeEmbedUrl(promo.youtube) : null;
  const promoVideoSrc = promo.type === "upload" ? promo.videoUrl : null;
  const promoYoutubeId = promo.type === "youtube" ? getYouTubeId(promo.youtube) : null;
  const promoThumbnail = promoYoutubeId
    ? `https://i.ytimg.com/vi/${promoYoutubeId}/hqdefault.jpg`
    : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = useCallback(() => setIsVideoOpen(true), []);
  const closeVideo = useCallback(() => setIsVideoOpen(false), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Border animation - starts with padding, goes to 0
  const borderSize = useTransform(smoothProgress, [0, 0.5], [20, 0]);
  const borderRadius = useTransform(smoothProgress, [0, 0.5], [24, 0]);

  // Video scale on scroll
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Text animations on scroll
  const textY = useTransform(smoothProgress, [0, 0.6], [0, -100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // Overlay opacity increases on scroll
  const overlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.3, 0.8]);

  // Card animation
  const cardY = useTransform(smoothProgress, [0, 0.6], [0, 50]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[140vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        {/* Animated border/frame */}
        <motion.div
          style={{
            padding: borderSize,
          }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            style={{
              borderRadius: borderRadius,
              scale: videoScale,
            }}
            className="relative w-full h-full overflow-hidden"
          >
            {/* Video Background - YouTube veya yüklenen/varsayılan MP4 */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {bgIsYoutube ? (
                <YouTubeBackground source={hero.background.youtube} />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
                >
                  <source src={bgVideoSrc ?? "/hero-video.mp4"} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Dynamic gradient overlay */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20 z-20"
            />
          </motion.div>
        </motion.div>

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

        {/* Main typography - bottom left */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute bottom-16 md:bottom-24 left-8 md:left-16 z-40"
        >
          <div className="overflow-hidden">
            {words.map((word, index) => (
              <motion.div
                key={word}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.8 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="overflow-hidden"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tight">
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 text-white/60 text-lg md:text-xl max-w-md font-light"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>

        {/* Info card - bottom right */}
        {promo.enabled && (
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-16 md:bottom-24 right-16 md:right-32 z-40 hidden lg:block"
        >
          <div className="group cursor-pointer" onClick={openVideo}>
            {/* Small preview image */}
            <div className="w-48 h-32 rounded-lg overflow-hidden mb-4 relative bg-white/10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
              {promoThumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={promoThumbnail}
                  alt={promo.text ?? "Tanıtım videosu"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/30" />
              )}
              <div className="absolute inset-0 bg-primary/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-accent/30 group-hover:border-accent transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-1"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <p className="text-white/60 text-xs tracking-widest uppercase mb-2">
              {promo.label}
            </p>
            <p className="text-white text-sm font-medium group-hover:text-accent transition-colors flex items-center gap-2">
              {promo.text}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </p>
          </div>
        </motion.div>
        )}

        {/* Scroll indicator - center bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-white/20" />
          </motion.div>
        </motion.div>

        {/* Decorative vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          style={{ opacity: textOpacity }}
          className="absolute left-8 md:left-16 top-1/4 w-px h-32 bg-gradient-to-b from-accent/50 to-transparent origin-top z-40"
          suppressHydrationWarning
        />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={closeVideo}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={closeVideo}
              className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:rotate-90 transition-transform duration-300"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Video container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.1
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/50 via-white/20 to-accent/30 rounded-2xl blur-sm" />

              {/* Video içeriği: YouTube veya yüklenen dosya */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                {promoYoutube ? (
                  <iframe
                    src={promoYoutube}
                    title={promo.text ?? "Tanıtım"}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : promoVideoSrc ? (
                  <video
                    src={promoVideoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                ) : null}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.5, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ delay: 0.3 }}
              className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.5, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: 0.3 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
