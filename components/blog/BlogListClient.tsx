"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/Footer";
import type { BlogCategory, PostListItem } from "@/lib/blog";
import type { SiteSettings } from "@/lib/settings";
import { subscribeNewsletter } from "@/lib/newsletter";

const newsletterSchema = z.object({
  email: z.string().min(1, "E-posta adresi gerekli").email("Geçerli bir e-posta adresi girin"),
});

function cover(post: PostListItem, index: number): string {
  return post.coverImage ?? `/therapy-${(index % 6) + 1}.jpg`;
}

export default function BlogListClient({
  featuredPosts,
  posts,
  categories,
  activeCategory,
  currentPage,
  lastPage,
  settings,
}: {
  featuredPosts: PostListItem[];
  posts: PostListItem[];
  categories: BlogCategory[];
  activeCategory: string | null;
  currentPage: number;
  lastPage: number;
  settings: SiteSettings;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
    <main className="min-h-screen bg-[#f5f3ef]">
      <BlogNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-accent" />
          <div className="absolute bottom-20 right-40 w-32 h-32 rounded-full border border-accent/50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-accent text-sm tracking-widest uppercase mb-4">Blog</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
              Zihinsel Sağlık
              <br />
              <span className="text-white/60">Yazıları</span>
            </h1>
            <p className="mt-6 text-white/60 text-lg max-w-xl">
              Psikoloji, terapi ve kişisel gelişim hakkında bilgilendirici içerikler.
            </p>
          </motion.div>

          {/* Kategori filtreleri (linkler → SSR filtre) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                !activeCategory ? "bg-accent text-primary" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              Tümü
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?kategori=${category.slug}`}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeCategory === category.slug
                    ? "bg-accent text-primary"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Öne çıkan yazılar */}
      {featuredPosts.length > 0 && (
        <section className="px-6 md:px-16 py-20 bg-[#f5f3ef]">
          <div className="max-w-7xl mx-auto">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-primary/40 text-xs tracking-widest uppercase mb-8">
              Öne Çıkan Yazılar
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cover(post, index)} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-medium rounded-full mb-3">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-primary/60 text-sm line-clamp-2 max-w-md">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-primary/40 text-sm shrink-0 ml-4">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-primary/30" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tüm yazılar */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-between mb-12">
            <p className="text-primary/40 text-xs tracking-widest uppercase">
              {activeCategory ? `${activeCategory} Yazıları` : "Tüm Yazılar"}
            </p>
            <div className="h-px flex-1 bg-primary/10 mx-8" />
            <p className="text-primary/40 text-sm">{posts.length} yazı</p>
          </motion.div>

          {posts.length === 0 ? (
            <p className="text-center text-primary/40 py-16">Bu kategoride henüz yazı yok.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cover(post, index)} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && <span className="text-accent text-xs font-medium">{post.category}</span>}
                      <span className="w-1 h-1 rounded-full bg-primary/20" />
                      <span className="text-primary/40 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-serif text-primary leading-snug mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                    <p className="text-primary/50 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <p className="text-primary/30 text-xs">{post.date}</p>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Sayfalama */}
          {lastPage > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              {currentPage > 1 && (
                <Link
                  href={`/blog?${activeCategory ? `kategori=${activeCategory}&` : ""}page=${currentPage - 1}`}
                  className="px-6 py-3 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Önceki
                </Link>
              )}
              <span className="text-primary/40 text-sm">{currentPage} / {lastPage}</span>
              {currentPage < lastPage && (
                <Link
                  href={`/blog?${activeCategory ? `kategori=${activeCategory}&` : ""}page=${currentPage + 1}`}
                  className="px-6 py-3 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Daha Fazla Yazı
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Bülten */}
      <section className="px-6 md:px-16 py-24 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-accent text-sm tracking-widest uppercase mb-4">Bülten</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Yeni yazılardan haberdar olun</h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">
              Zihinsel sağlık ve kişisel gelişim hakkında içerikler için bültene abone olun.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="E-posta adresiniz"
                    className={`w-full px-6 py-4 bg-white/10 border rounded-full text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                      error ? "border-red-400" : "border-white/20 focus:border-accent"
                    }`}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-accent text-primary font-medium rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? "Gönderiliyor" : "Abone Ol"}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-3 text-red-400 text-sm">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 p-4 bg-accent/20 border border-accent/30 rounded-2xl">
                    <p className="text-accent text-sm">Bültene başarıyla abone oldunuz!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
