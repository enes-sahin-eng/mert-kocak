"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/tracking";

const navLinks = [
  { label: "Hakkımda", href: "#about" },
  { label: "Terapiler", href: "#therapies" },
  { label: "Yorumlar", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar({ logo }: { logo?: string | null }) {
  const logoSrc = logo ?? "/logo.png";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:py-6"
    >
      {/* Full width navbar - initial state */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -20 : 0,
          pointerEvents: isScrolled ? "none" : "auto",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-x-4 top-4 md:top-6 flex items-center justify-between px-4 md:px-12"
      >
        <Link href="/" className="block mt-2 hover:opacity-80 transition-opacity">
          <Image
            src={logoSrc}
            alt="Mert Koçak - Klinik Psikolog"
            width={80}
            height={80}
            priority
            className="h-16 md:h-20 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
        <motion.a
          href="#contact"
          onClick={(e) => {
            track("info_cta_click", "navbar");
            handleNavClick(e, "#contact");
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative mt-2 inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-5 rounded-full border border-white/25 hover:border-accent transition-colors duration-300"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-primary group-hover:scale-105 transition-transform duration-300">
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
            >
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </span>
          <span className="text-white text-sm font-medium tracking-wide group-hover:text-accent transition-colors duration-300">
            Randevu Al
          </span>
        </motion.a>
      </motion.div>

      {/* Centered pill navbar - scrolled state */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : -20,
          scale: isScrolled ? 1 : 0.9,
          pointerEvents: isScrolled ? "auto" : "none",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex justify-center"
      >
        <div className="flex items-center gap-1 px-2 py-2 bg-primary/95 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="px-3 py-1 block hover:opacity-80 transition-opacity">
            <Image src={logoSrc} alt="Mert Koçak" width={40} height={40} className="h-10 w-auto" />
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-white/20" />

          {/* Nav links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-white/70 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-white/70 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              track("info_cta_click", "navbar");
              handleNavClick(e, "#contact");
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group ml-1 relative inline-flex items-center gap-2 py-1 pl-1 pr-4 rounded-full border border-white/20 hover:border-accent transition-colors duration-300"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-primary group-hover:scale-105 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </span>
            <span className="text-white text-sm font-medium group-hover:text-accent transition-colors duration-300">
              Randevu
            </span>
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
