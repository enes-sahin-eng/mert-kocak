"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { track } from "@/lib/tracking";

const navLinks = [
  { label: "Hakkımda", href: "#about" },
  { label: "Terapiler", href: "#therapies" },
  { label: "Yorumlar", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
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
        <Link
          href="/"
          className="text-white font-light tracking-[0.3em] text-sm hover:text-accent transition-colors"
        >
          MERT KOÇAK
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-white text-primary text-sm font-medium rounded-full hover:bg-accent transition-colors"
        >
          Randevu
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
          <Link
            href="/"
            className="px-4 py-2 text-white font-medium text-sm tracking-wider hover:text-accent transition-colors"
          >
            MK
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-white text-primary text-sm font-medium rounded-full hover:bg-accent transition-colors ml-1"
          >
            Randevu
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
