"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";
import { track } from "@/lib/tracking";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const name = settings.author.name || "Mert Koçak";
  const year = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative bg-[#f5f3ef] overflow-hidden"
    >
      {/* Main footer content */}
      <div className="relative min-h-[80vh] flex flex-col">
        {/* Decorative SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path
            d="M 100 500 Q 200 400 350 420 Q 500 440 600 350 Q 700 260 850 280 Q 1000 300 1100 200"
            fill="none"
            stroke="rgba(201, 169, 98, 0.3)"
            strokeWidth="1"
            style={{ pathLength }}
          />
          <motion.path
            d="M 50 450 Q 150 380 300 400 Q 450 420 550 320 Q 650 220 800 250 Q 950 280 1150 150"
            fill="none"
            stroke="rgba(201, 169, 98, 0.15)"
            strokeWidth="1"
            style={{ pathLength }}
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-8 md:px-16 py-16">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Left text */}
            <motion.div style={{ opacity }} className="max-w-xs">
              <p className="text-primary/60 text-sm leading-relaxed font-light italic">
                Zihinsel sağlık
                <br />
                yolculuğunuzda
                <br />
                yanınızdayım.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div style={{ opacity }} className="text-right">
              <p className="text-primary/60 text-xs tracking-widest uppercase mb-4">
                Sosyal Medya
              </p>
              <div className="flex gap-4 justify-end">
                {settings.social.instagram && (
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/60 hover:text-accent transition-colors text-sm"
                  >
                    Instagram
                  </a>
                )}
                {/* LinkedIn yerine YouTube gösteriliyor. backend "social.linkedin" alanı
                    yayınlamaya devam ediyor (bkz. lib/settings.ts), sadece burada kullanılmıyor. */}
                {settings.social.youtube && (
                  <a
                    href={settings.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/60 hover:text-accent transition-colors text-sm"
                  >
                    YouTube
                  </a>
                )}
                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", "footer")}
                    className="text-primary/60 hover:text-accent transition-colors text-sm"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Center - Large navigation links */}
          <div className="relative h-[300px] md:h-[350px] my-8">
            {/* Floating large links */}
            <Link href="/#about">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[5%] right-[15%] md:right-[25%] text-4xl md:text-6xl lg:text-7xl font-serif text-primary hover:text-accent transition-colors cursor-pointer block"
              >
                <span className="text-accent-ink text-lg mr-1">+</span>
                Hakkımda
              </motion.span>
            </Link>

            <Link href="/#therapies">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[30%] right-[5%] md:right-[10%] text-4xl md:text-6xl lg:text-7xl font-serif text-primary hover:text-accent transition-colors cursor-pointer block"
              >
                <span className="text-accent-ink text-lg mr-1">+</span>
                Terapiler
              </motion.span>
            </Link>

            <Link href="/#testimonials">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[55%] left-[5%] md:left-[15%] text-4xl md:text-6xl lg:text-7xl font-serif text-primary hover:text-accent transition-colors cursor-pointer block"
              >
                <span className="text-accent-ink text-lg mr-1">+</span>
                Yorumlar
              </motion.span>
            </Link>

            <Link href="/#contact">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[45%] right-[20%] md:right-[30%] text-4xl md:text-6xl lg:text-7xl font-serif text-primary hover:text-accent transition-colors cursor-pointer block"
              >
                <span className="text-accent-ink text-lg mr-1">+</span>
                İletişim
              </motion.span>
            </Link>

            {/* Decorative text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-0 left-0 md:left-[5%]"
            >
              <p className="text-primary/60 text-sm leading-relaxed">
                İstanbul&apos;da
                <br />
                Hizmet
                <br />
                Veriyorum.
              </p>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-primary/10"
          >
            <p className="text-primary/60 text-sm">
              © {year} {name}
            </p>

            <p className="text-primary/50 text-xs text-center max-w-md">
              Klinik Psikolog olarak bireysel ve çift terapisi hizmetleri
              sunuyorum.
            </p>

            <p className="text-primary/60 text-sm">Tüm hakları saklıdır.</p>
          </motion.div>
        </div>
      </div>

      {/* Large brand name at very bottom */}
      <div className="relative overflow-hidden py-8 border-t border-primary/5">
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center"
        >
          <Link
            href="/"
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-primary/50 hover:text-primary/65 transition-colors tracking-tight whitespace-nowrap cursor-pointer uppercase"
          >
            {name}
          </Link>
        </motion.div>
      </div>

      {/* Designer Badge */}
      <div className="w-full bg-[#0d1d2b] py-3 flex justify-center items-center">
        <a
          href="https://ideazone.digital/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity group"
          aria-label="Design and Development by ideaZone DIGITAL"
        >
          <span className="text-[#94a3b8] text-sm font-light group-hover:text-white transition-colors">
            Design & Development By
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/designer-logo-full.png"
            alt="ideaZone DIGITAL"
            className="h-5 md:h-6 w-auto object-contain"
          />
        </a>
      </div>
    </footer>
  );
}
