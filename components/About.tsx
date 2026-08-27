"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { SiteSettings } from "@/lib/settings";

export default function About({ settings }: { settings: SiteSettings }) {
  const { about } = settings;
  const photoSrc = about.photo ?? "/mert-kocak.jpg";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Circular text rotation
  const rotation1 = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rotation2 = useTransform(smoothProgress, [0, 1], [0, -360]);

  // Parallax for elements — complete before section fills viewport (~0.33 progress)
  const titleY = useTransform(smoothProgress, [0, 0.25], [60, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.2], [0.6, 1]);

  const imageScale = useTransform(smoothProgress, [0.05, 0.25], [0.85, 1]);
  const imageOpacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1]);

  // Floating text positions
  const floatY1 = useTransform(smoothProgress, [0, 1], [50, -50]);
  const floatY2 = useTransform(smoothProgress, [0, 1], [80, -80]);
  const floatY3 = useTransform(smoothProgress, [0, 1], [30, -30]);

  // Circular text data
  const outerText = about.outerText ?? "";
  const innerText = about.innerText ?? "";

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[200vh] bg-[#f5f3ef] overflow-hidden"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent" />

      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-8">
        {/* Top title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-primary/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            {about.eyebrow}
          </motion.p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary">
            <span className="italic">{about.titleLine1}</span>
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary/85 -mt-2">
            {about.titleLine2}
          </h2>
        </motion.div>

        {/* Center image with circular text */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="relative flex items-center justify-center"
        >
          {/* Outer circular text */}
          <motion.div
            style={{ rotate: rotation1 }}
            className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <path
                  id="outerCircle"
                  d="M 200, 200 m -170, 0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
                  fill="none"
                />
              </defs>
              <text className="fill-accent text-[13px] md:text-[14px] tracking-[0.35em] uppercase">
                <textPath href="#outerCircle" startOffset="0%">
                  {outerText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Inner circular text */}
          <motion.div
            style={{ rotate: rotation2 }}
            className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px]"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <path
                  id="innerCircle"
                  d="M 200, 200 m -140, 0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0"
                  fill="none"
                />
              </defs>
              <text className="fill-primary/25 text-[11px] md:text-[12px] tracking-[0.3em] uppercase">
                <textPath href="#innerCircle" startOffset="0%">
                  {innerText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Image container - BIGGER */}
          <div className="relative w-64 h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] z-10">
            {/* Decorative frames */}
            <div className="absolute -inset-4 border border-primary/10 rounded-[2rem]" />
            <div className="absolute -inset-8 border border-primary/5 rounded-[2.5rem]" />

            {/* Main image */}
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc}
                alt="Klinik Psikolog Mert Koçak - Etiler, İstanbul"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full shadow-lg" />
          </div>
        </motion.div>

        {/* Floating descriptive texts */}
        <motion.p
          style={{ y: floatY1 }}
          className="absolute top-[6%] left-3 md:top-[15%] md:left-16 lg:left-32 text-primary/60 text-[11px] md:text-base lg:text-lg font-light italic max-w-[80px] md:max-w-[180px] lg:max-w-[240px]"
        >
          &ldquo;{about.floating.quote}&rdquo;
        </motion.p>

        <motion.p
          style={{ y: floatY2 }}
          className="absolute top-[6%] right-3 md:top-[20%] md:right-16 lg:right-32 text-primary/60 text-[11px] md:text-base lg:text-lg font-light max-w-[80px] md:max-w-[180px] lg:max-w-[240px] text-right"
        >
          {about.floating.statTop}
          <br />
          <span className="text-accent-ink">{about.floating.statBottom}</span>
        </motion.p>

        <motion.p
          style={{ y: floatY3 }}
          className="absolute bottom-[14%] left-3 md:bottom-[22%] md:left-24 lg:left-40 text-primary/60 text-[10px] md:text-sm lg:text-base tracking-widest uppercase"
        >
          {about.floating.tag1}
        </motion.p>

        <motion.p
          style={{ y: floatY1 }}
          className="absolute bottom-[18%] right-3 md:bottom-[28%] md:right-24 lg:right-40 text-primary/60 text-[10px] md:text-sm lg:text-base tracking-widest uppercase"
        >
          {about.floating.tag2}
        </motion.p>

        {/* Bottom subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-8 md:bottom-12 text-center text-primary/60 text-sm tracking-wide"
        >
          {about.scrollHint}
        </motion.p>

        {/* Decorative side lines */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Second part - scrolls into view */}
      <div className="relative min-h-screen flex items-center justify-center bg-primary py-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="text-center px-8 max-w-4xl"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-8">
            {about.storyEyebrow}
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-serif mb-12 leading-tight">
            {about.heading}
          </h3>
          <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 inline-block px-8 py-4 border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-colors rounded-full"
          >
            {about.ctaLabel}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
