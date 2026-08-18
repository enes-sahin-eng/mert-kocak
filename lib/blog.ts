import { API_BASE_URL } from "@/lib/api";
import type { AuthorInfo } from "@/lib/settings";

export interface PostListItem {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  categorySlug: string | null;
  coverImage: string | null;
  tags: string[];
  readTime: string;
  featured: boolean;
  date: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostSeo {
  metaTitle: string;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
}

export interface Post extends PostListItem {
  content: string | null;
  faq: FaqItem[];
  author: AuthorInfo;
  seo: PostSeo;
  related: PostListItem[];
  updatedAt: string | null;
}

export interface BlogCategory {
  name: string;
  slug: string;
  postsCount: number | null;
}

interface Paginated<T> {
  data: T[];
  meta?: { current_page: number; last_page: number; total: number };
}

async function safeJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/** Yayınlanmış yazılar (sayfalı). Opsiyonel kategori filtresi. */
export async function getPosts(opts: {
  category?: string;
  page?: number;
} = {}): Promise<{ posts: PostListItem[]; lastPage: number }> {
  const params = new URLSearchParams();
  if (opts.category) params.set("category", opts.category);
  if (opts.page) params.set("page", String(opts.page));
  const qs = params.toString() ? `?${params.toString()}` : "";

  const json = await safeJson<Paginated<PostListItem>>(
    `${API_BASE_URL}/api/posts${qs}`,
    { data: [], meta: { current_page: 1, last_page: 1, total: 0 } },
  );
  return { posts: json.data ?? [], lastPage: json.meta?.last_page ?? 1 };
}

/** Tüm yayınlanmış yazılar (sitemap için sayfaları gezer). */
export async function getAllPosts(): Promise<PostListItem[]> {
  const first = await getPosts({ page: 1 });
  let all = first.posts;
  for (let page = 2; page <= first.lastPage; page++) {
    const next = await getPosts({ page });
    all = all.concat(next.posts);
  }
  return all;
}

/** Öne çıkan yazılar. */
export async function getFeaturedPosts(): Promise<PostListItem[]> {
  const json = await safeJson<{ data: PostListItem[] }>(
    `${API_BASE_URL}/api/posts?featured=1`,
    { data: [] },
  );
  return json.data ?? [];
}

/** Tek yazı (slug). Bulunamazsa null. */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/posts/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { data: Post };
    return json.data ?? null;
  } catch {
    return null;
  }
}

/** Blog kategorileri (yayınlanmış yazı sayısıyla). */
export async function getCategories(): Promise<BlogCategory[]> {
  const json = await safeJson<{ data: BlogCategory[] }>(
    `${API_BASE_URL}/api/categories`,
    { data: [] },
  );
  return json.data ?? [];
}
