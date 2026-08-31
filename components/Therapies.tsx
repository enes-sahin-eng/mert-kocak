"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Therapy } from "@/lib/therapies";

// Detay sayfası bağlantısı artık her terapi kaydında ("link") tutuluyor;
// panelden seçilir. Önceden başlığa göre eşleniyordu, başlık değişince
// bağlantı sessizce kayboluyordu.

export default function Therapies({ therapies }: { therapies: Therapy[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sectionSize = 1 / therapies.length;
      const newIndex = Math.min(
        Math.floor(latest / sectionSize),
        therapies.length - 1
      );
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, therapies.length]);

  // Progress line width
  const progressWidth = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const scrollHeight = therapies.length * 60;

  return (
    <section
      id="therapies"
      ref={containerRef}
      className="relative bg-[#f5f3ef]"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background images with transition */}
        <div className="absolute inset-0">
          {therapies.map((therapy, index) => (
            <motion.div
              key={therapy.id}
              initial={false}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 1.05,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={therapy.image ?? `/therapy-${(index % 6) + 1}.jpg`}
                alt={`${therapy.title} - Etiler, İstanbul Psikolog`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ef] via-transparent to-[#f5f3ef]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3ef]/50 via-transparent to-[#f5f3ef]/50" />
            </motion.div>
          ))}

          {/* Noise texture */}
          <div
            className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Navigation dots and progress line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2 sm:px-4 md:px-8 lg:px-16 z-20">
          <div className="relative flex items-center justify-between max-w-4xl mx-auto">
            {/* Background line */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-primary/20 -translate-y-1/2" />

            {/* Progress line */}
            <motion.div
              className="absolute top-1/2 left-4 right-4 h-px bg-primary/50 -translate-y-1/2 origin-left"
              style={{
                width: progressWidth,
                maxWidth: "calc(100% - 32px)"
              }}
            />

            {/* Number dots */}
            {therapies.map((therapy, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <motion.button
                  key={therapy.id}
                  className="relative flex items-center justify-center z-10 bg-transparent border-none cursor-pointer flex-shrink-0"
                  style={{ width: 50, height: 50 }}
                  onClick={() => {
                    if (containerRef.current) {
                      const containerTop = containerRef.current.offsetTop;
                      const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
                      const targetScroll = containerTop + (index / therapies.length) * containerHeight;
                      window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }
                  }}
                >
                  {/* Outer circle */}
                  <motion.div
                    className="absolute rounded-full border"
                    animate={{
                      width: isActive ? 46 : 32,
                      height: isActive ? 46 : 32,
                      borderColor: isActive
                        ? "rgba(0, 29, 13, 0.4)"
                        : "rgba(0, 29, 13, 0.15)",
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />

                  {/* Inner filled circle */}
                  <motion.div
                    className="absolute rounded-full"
                    animate={{
                      width: isActive ? 38 : 26,
                      height: isActive ? 38 : 26,
                      backgroundColor: isActive
                        ? "rgba(0, 29, 13, 0.08)"
                        : "rgba(0, 29, 13, 0.02)",
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />

                  {/* Number */}
                  <motion.span
                    className="relative font-serif italic z-10"
                    animate={{
                      fontSize: isActive ? "18px" : "14px",
                      color: isActive
                        ? "rgb(0, 29, 13)"
                        : isPast
                        ? "rgba(0, 29, 13, 0.5)"
                        : "rgba(0, 29, 13, 0.35)",
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Title - large serif at bottom */}
        <div className="absolute bottom-20 md:bottom-28 left-0 right-0 px-4 md:px-16 z-20">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center"
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-primary leading-none tracking-tight">
                  {therapies[activeIndex].title}
                </h2>
                {therapies[activeIndex].link && (
                  <Link
                    href={therapies[activeIndex].link}
                    className="group relative mt-4 md:mt-6 inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-6 rounded-full bg-primary shadow-xl shadow-black/25 hover:shadow-accent/30 transition-shadow duration-300"
                  >
                    <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent text-primary group-hover:scale-105 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                    <span className="text-white text-xs md:text-sm font-medium tracking-widest uppercase group-hover:text-accent transition-colors duration-300">
                      Detaylı Bilgi
                    </span>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom info row */}
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 px-4 md:px-16 z-20">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center md:items-end justify-between gap-2 md:gap-4 text-xs md:text-sm text-primary/60"
              >
                <div className="hidden md:block">
                  <p className="font-medium text-primary/70">
                    {therapies[activeIndex].subtitle}
                  </p>
                </div>
                <div className="max-w-sm text-center">
                  <p>{therapies[activeIndex].description}</p>
                </div>
                <div className="hidden lg:block max-w-xs text-right">
                  <p>{therapies[activeIndex].details}</p>
                </div>
                <div className="md:hidden">
                  <p className="text-accent-ink font-medium">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(therapies.length).padStart(2, "0")}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Section label */}
        <div className="absolute top-6 md:top-8 left-4 md:left-16 z-20">
          <p className="text-xs tracking-[0.3em] text-primary/60 uppercase">
            Terapiler
          </p>
        </div>

        {/* Counter - desktop */}
        <div className="absolute top-6 md:top-8 right-4 md:right-16 z-20 hidden md:block">
          <p className="text-sm text-accent-ink">
            {String(activeIndex + 1).padStart(2, "0")} / {String(therapies.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
