"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/Footer";
import type { FaqItem, Post, PostListItem } from "@/lib/blog";
import type { SiteSettings } from "@/lib/settings";
import { subscribeNewsletter } from "@/lib/newsletter";

const newsletterSchema = z.object({
  email: z.string().min(1, "E-posta adresi gerekli").email("Geçerli bir e-posta adresi girin"),
});

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function slugifyTr(s: string): string {
  return s
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** İçerikteki H2/H3 başlıklara otomatik id ekler ve içindekiler listesini çıkarır. */
function processContent(html: string): { html: string; toc: TOCItem[] } {
  const toc: TOCItem[] = [];
  const used = new Set<string>();

  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const base = slugifyTr(text) || `bolum-${toc.length + 1}`;
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    toc.push({ id, text: text.replace(/^\d+\.\s*/, ""), level: Number(level) });
    const attrsNoId = String(attrs).replace(/\sid="[^"]*"/i, "");
    return `<h${level}${attrsNoId} id="${id}">${inner}</h${level}>`;
  });

  return { html: out, toc };
}

function cover(post: PostListItem, index = 0): string {
  return post.coverImage ?? `/therapy-${(index % 6) + 1}.jpg`;
}

function TableOfContents({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-50 w-64">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-primary/5">
          <p className="text-primary/40 text-xs tracking-widest uppercase mb-4">İçindekiler</p>
          <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <button key={item.id} onClick={() => scrollToHeading(item.id)} className={`group flex items-start gap-2 w-full text-left text-sm py-1.5 transition-all ${item.level === 3 ? "pl-4" : ""} ${activeId === item.id ? "text-accent font-medium" : "text-primary/50 hover:text-primary"}`}>
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${activeId === item.id ? "bg-accent" : "bg-primary/20 group-hover:bg-primary/40"}`} />
                <span className="leading-snug">{item.text}</span>
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      <div className="xl:hidden">
        <AnimatePresence>
          {isVisible && (
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setIsOpen(true)} className="fixed left-4 bottom-8 z-50 w-12 h-12 bg-primary/90 backdrop-blur-md text-white rounded-full shadow-lg flex items-center justify-center" aria-label="İçindekiler">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-[201] bg-white rounded-t-3xl max-h-[70vh] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-primary font-serif text-lg">İçindekiler</p>
                    <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                  </div>
                  <nav className="space-y-1 overflow-y-auto max-h-[50vh]">
                    {items.map((item) => (
                      <button key={item.id} onClick={() => scrollToHeading(item.id)} className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl transition-all ${item.level === 3 ? "pl-8" : ""} ${activeId === item.id ? "bg-accent/10 text-accent" : "text-primary/70 hover:bg-primary/5"}`}>
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activeId === item.id ? "bg-accent" : "bg-primary/20"}`} />
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function FAQSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#f5f3ef] px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-accent text-xs tracking-widest uppercase mb-3">SSS</p>
          <h2 className="text-3xl md:text-4xl font-serif text-primary">Sık Sorulan Sorular</h2>
        </motion.div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                <span className="font-serif text-lg text-primary pr-4 group-hover:text-accent transition-colors">{item.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60"><path d="m6 9 6 6 6-6" /></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <div className="px-6 pb-5">
                      <div className="pt-2 border-t border-primary/10">
                        <p className="text-primary/70 leading-relaxed pt-4">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorNewsletterSection({ author }: { author: Post["author"] }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setIsSubmitting(true);
    const res = await subscribeNewsletter(email);
    setIsSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Abone olunamadı. Lütfen tekrar deneyin.");
      return;
    }
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="bg-white px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#f5f3ef] rounded-3xl p-8">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={author.image ?? "/mert-kocak.jpg"} alt={author.name} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-1">Yazar</p>
                <p className="font-serif text-2xl text-primary">{author.name}</p>
                <p className="text-primary/50">{author.title}</p>
              </div>
            </div>
            {author.bio && <p className="text-primary/60 leading-relaxed mb-6">{author.bio}</p>}
            <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-accent hover:text-primary transition-colors">
              <span>Randevu Al</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-primary rounded-3xl p-8">
            <p className="text-accent text-xs tracking-widest uppercase mb-2">Bülten</p>
            <h3 className="font-serif text-2xl text-white mb-3">Yeni yazılardan haberdar olun</h3>
            <p className="text-white/60 mb-6">Zihinsel sağlık ve kişisel gelişim hakkında içerikler için bültene abone olun.</p>
            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                <p className="text-white">Bültene başarıyla abone oldunuz!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="E-posta adresiniz" className={`w-full px-5 py-4 bg-white/10 border rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-colors ${error ? "border-red-400" : "border-white/20 focus:border-accent"}`} />
                  {error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-red-400 text-sm">{error}</motion.p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-accent text-primary font-medium rounded-xl hover:bg-white transition-colors disabled:opacity-50">
                  {isSubmitting ? "Gönderiliyor..." : "Abone Ol"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.05);
      setPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-[200]">
        <motion.div className="h-full bg-accent origin-left" style={{ scaleX }} />
      </motion.div>
      <AnimatePresence>
        {isVisible && (
          <motion.button initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-[150] group" aria-label="Yukarı çık">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/90 backdrop-blur-md rounded-full shadow-xl" />
              <svg width={size} height={size} className="relative z-10 -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={strokeWidth} />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#c9a962" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: "stroke-dashoffset 0.1s ease-out" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {percentage >= 95 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a962" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="m18 15-6-6-6 6" /></svg>
                ) : (
                  <span className="text-[11px] font-semibold text-white">{percentage}%</span>
                )}
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default function BlogDetailClient({ post, settings }: { post: Post; settings: SiteSettings }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");

  const { html, toc } = useMemo(() => processContent(post.content ?? ""), [post.content]);

  useEffect(() => {
    const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );
    headings.forEach((h) => h && observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  const share = (network: "twitter" | "linkedin" | "whatsapp") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(links[network], "_blank", "noopener,noreferrer");
  };

  const shareIcons: { name: string; key: "twitter" | "linkedin" | "whatsapp"; icon: string }[] = [
    { name: "Twitter", key: "twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { name: "LinkedIn", key: "linkedin", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "WhatsApp", key: "whatsapp", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" },
  ];

  return (
    <main className="min-h-screen bg-[#f5f3ef]">
      <BlogNavbar />
      <ReadingProgress />
      <TableOfContents items={toc} activeId={activeHeading} />

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: imageLoaded ? 1 : 1.1 }} transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover(post)} alt={post.title} className="absolute inset-0 w-full h-full object-cover" onLoad={() => setImageLoaded(true)} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        </motion.div>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 md:px-16 pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto xl:mx-0 xl:ml-[300px]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap items-center gap-4 mb-6">
                {post.category && <span className="px-4 py-1.5 bg-accent text-primary text-sm font-medium rounded-full">{post.category}</span>}
                {post.date && <span className="text-white/60 text-sm">{post.date}</span>}
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/60 text-sm">{post.readTime} okuma</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
                {post.title}
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.author.image ?? "/mert-kocak.jpg"} alt={post.author.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  <p className="text-white/60 text-sm">{post.author.title}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="relative">
        <div className="absolute -top-12 left-0 right-0 h-12 bg-[#f5f3ef] rounded-t-[2rem]" />
        <div className="relative bg-[#f5f3ef] px-6 md:px-16 py-16 md:py-24">
          <div className="max-w-3xl mx-auto xl:mx-0 xl:ml-[300px]">
            <motion.article initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-primary prose-headings:font-normal prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-primary/70 prose-p:leading-relaxed
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-primary prose-strong:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-primary/5
                  prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                  prose-blockquote:not-italic prose-blockquote:text-primary/80
                  prose-figcaption:text-center prose-figcaption:text-primary/50 prose-figcaption:text-sm
                  prose-img:rounded-2xl prose-img:shadow-lg
                  prose-ul:text-primary/70 prose-ol:text-primary/70
                  prose-li:marker:text-accent
                  prose-hr:border-primary/10 prose-hr:my-12
                  [&_.lead]:text-xl [&_.lead]:text-primary/80 [&_.lead]:leading-relaxed [&_.lead]:mb-8
                  [&_figure]:my-10
                  [&_blockquote_cite]:block [&_blockquote_cite]:mt-3 [&_blockquote_cite]:text-accent [&_blockquote_cite]:text-sm
                "
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Etiketler */}
              {post.tags.length > 0 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 pt-8 border-t border-primary/10">
                  <p className="text-primary/40 text-xs tracking-widest uppercase mb-4">Etiketler</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-primary/5 text-primary/60 text-sm rounded-full">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Paylaş */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 flex items-center gap-4">
                <p className="text-primary/40 text-sm">Paylaş:</p>
                <div className="flex gap-3">
                  {shareIcons.map((social) => (
                    <button key={social.name} onClick={() => share(social.key)} className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center text-primary/60 transition-all" aria-label={`${social.name}'da paylaş`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          </div>
        </div>
      </section>

      {post.faq.length > 0 && <FAQSection items={post.faq} />}

      <AuthorNewsletterSection author={post.author} />

      {/* İlgili yazılar */}
      {post.related.length > 0 && (
        <section className="bg-[#f5f3ef] px-6 md:px-16 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-12">
              <div>
                <p className="text-primary/40 text-xs tracking-widest uppercase mb-2">Okumaya Devam Et</p>
                <h2 className="text-3xl md:text-4xl font-serif text-primary">İlgili Yazılar</h2>
              </div>
              <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-primary/60 hover:text-accent transition-colors">
                <span>Tüm Yazılar</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {post.related.map((rel, index) => (
                <motion.article key={rel.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Link href={`/blog/${rel.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cover(rel, index)} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {rel.category && <span className="text-accent text-xs font-medium">{rel.category}</span>}
                    <h3 className="text-xl font-serif text-primary mt-2 group-hover:text-accent transition-colors">{rel.title}</h3>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-accent text-sm tracking-widest uppercase mb-4">Bir Adım Atın</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Profesyonel destek almak ister misiniz?</h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">Kaygı, stres veya diğer zorluklar için yardım almak güçlü bir adımdır.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="px-8 py-4 bg-accent text-primary font-medium rounded-full hover:bg-white transition-colors">Randevu Al</Link>
              <Link href="/#about" className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors">Hakkımda</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
