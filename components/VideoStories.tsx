"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Video } from "@/lib/videos";
import type { VideosSection } from "@/lib/settings";

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Videoyu kapat"
          className="absolute -top-10 right-0 sm:-top-12 sm:right-0 text-white/70 hover:text-white transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="aspect-video rounded-2xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoThumb({ video, onOpen }: { video: Video; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${video.title} videosunu oynat`}
      className="group relative aspect-video rounded-2xl overflow-hidden bg-black w-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
    </button>
  );
}

export default function VideoStories({
  videos,
  section,
}: {
  videos: Video[];
  section: VideosSection;
}) {
  const [openVideo, setOpenVideo] = useState<Video | null>(null);

  return (
    <section className="bg-primary px-6 md:px-8 py-20 md:py-28 border-t border-white/10">
      <div className="max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            {section.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white">
            {section.title}
          </h2>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            {section.description}
          </p>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 xl:grid-cols-5 md:gap-5 pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[85%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none"
            >
              <VideoThumb video={video} onOpen={() => setOpenVideo(video)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openVideo && (
          <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
