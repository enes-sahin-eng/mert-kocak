"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/lib/settings";
import type { Testimonial, TestimonialPlatform } from "@/lib/testimonials";

const platformLabels: Record<TestimonialPlatform, string> = {
  google: "Google Reviews",
  doktortakvimi: "Doktor Takvimi",
  instagram: "Instagram",
  website: "Web Sitesi",
};

const PlatformIcon = ({ platform }: { platform: TestimonialPlatform }) => {
  if (platform === "google") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  if (platform === "doktortakvimi") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#00A65A"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="white"/>
        <path d="M12 9v3l2.5 1.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80"/>
            <stop offset="50%" stopColor="#F56040"/>
            <stop offset="100%" stopColor="#C13584"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
      </svg>
    );
  }
  // website (web sitesi) – genel ikon
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" strokeLinecap="round" />
    </svg>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials({
  testimonials,
  settings,
}: {
  testimonials: Testimonial[];
  settings: SiteSettings;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = settings.testimonials;
  const active = testimonials[activeIndex];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative min-h-screen bg-primary py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Large quote mark */}
      <div className="absolute top-16 left-8 md:left-16 text-accent/10 text-[200px] md:text-[300px] font-serif leading-none pointer-events-none select-none">
        &ldquo;
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
            {t.title} <span className="italic text-accent">{t.titleAccent}</span>
          </h2>

          {/* Platform badges */}
          {(t.googleRating || t.doktortakvimiRating) && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {t.googleRating && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <PlatformIcon platform="google" />
                  <span className="text-white/70 text-sm">{t.googleRating} / 5</span>
                </div>
              )}
              {t.doktortakvimiRating && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <PlatformIcon platform="doktortakvimi" />
                  <span className="text-white/70 text-sm">{t.doktortakvimiRating} / 5</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12"
            >
              {/* Platform and rating header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <PlatformIcon platform={active.platform} />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">
                      {platformLabels[active.platform]}
                    </p>
                    <StarRating rating={active.rating} />
                  </div>
                </div>
                {active.verified && (
                  <div className="flex items-center gap-1 text-accent text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Doğrulanmış
                  </div>
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-8">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                    {active.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={active.avatarUrl}
                        alt={active.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-accent text-lg font-serif">
                        {active.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{active.name}</p>
                    <p className="text-white/60 text-sm">{active.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              aria-label="Önceki yorum"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${index + 1}. yoruma git`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`relative h-2 rounded-full transition-all duration-300 before:content-[''] before:absolute before:-inset-2 ${
                    index === activeIndex
                      ? "bg-accent w-8"
                      : "bg-white/30 hover:bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              aria-label="Sonraki yorum"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 pt-16 border-t border-white/10"
        >
          {settings.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-accent mb-2">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 text-sm mb-6">
            {t.ctaHint}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-medium rounded-full hover:bg-white transition-colors"
          >
            {t.ctaLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
