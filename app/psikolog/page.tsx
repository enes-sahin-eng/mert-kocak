import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import TherapyFaq from "@/components/therapy/TherapyFaq";
import { getSettings } from "@/lib/settings";
import { absoluteUrl, jsonLdScript, SITE_NAME } from "@/lib/seo";
import { articleHtml, faq, heroEyebrow, heroTitle, metaDescription, metaTitle } from "./content";

// GEÇİCİ: Bu sayfa blog CMS'i ile uyumlu olmadığı için ayrı, elle yazılmış
// bir sayfa (bkz. ./content.ts). Panelden yönetilmiyor.

const PAGE_SLUG = "psikolog";

export const metadata: Metadata = {
  // absolute: sitenin genel "%s | Mert Koçak" şablonunu bu sayfada devre dışı
  // bırakır, çünkü verilen başlık zaten sonunda "Mert Koçak" içeriyor.
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: `/${PAGE_SLUG}` },
  openGraph: {
    type: "article",
    title: heroTitle,
    description: metaDescription,
    url: absoluteUrl(`/${PAGE_SLUG}`),
    siteName: SITE_NAME,
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: heroTitle,
    description: metaDescription,
  },
};

function buildJsonLd() {
  const pageUrl = absoluteUrl(`/${PAGE_SLUG}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: heroTitle,
        description: metaDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": absoluteUrl("/#website") },
        author: { "@id": absoluteUrl("/#person") },
        publisher: { "@id": absoluteUrl("/#business") },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Psikolog", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: "tr-TR",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export default async function PsikologPage() {
  const settings = await getSettings();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildJsonLd()) }}
      />
      <Navbar logo={settings.logo} />

      <section className="bg-primary px-6 md:px-8 pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-5">
            {heroEyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            {heroTitle}
          </h1>
        </div>
      </section>

      <section className="relative bg-[#f5f3ef] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-primary prose-headings:font-normal prose-headings:scroll-mt-24
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-primary/70 prose-p:leading-relaxed
              prose-a:text-accent-ink prose-a:no-underline hover:prose-a:underline
              prose-strong:text-primary prose-strong:font-medium
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-primary/5
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-blockquote:not-italic prose-blockquote:text-primary/80
              prose-ul:text-primary/70 prose-ol:text-primary/70
              prose-li:marker:text-accent-ink
              prose-thead:border-primary/10
              prose-th:text-primary prose-th:font-medium
              prose-td:text-primary/70 prose-td:align-top
              [&_.lead]:text-xl [&_.lead]:text-primary/80 [&_.lead]:leading-relaxed [&_.lead]:mb-8
              [&_table_caption]:caption-top [&_table_caption]:text-left [&_table_caption]:mb-3
              [&_table_caption]:text-primary/60 [&_table_caption]:text-base [&_table_caption]:font-medium
              [&_table_caption]:not-italic
            "
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        </div>
      </section>

      <TherapyFaq items={faq} />

      <Contact settings={settings} />
    </main>
  );
}
