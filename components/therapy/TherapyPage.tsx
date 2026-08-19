import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import TherapyHero from "./TherapyHero";
import TherapyIntro from "./TherapyIntro";
import TherapyNotice from "./TherapyNotice";
import TherapyFeatures from "./TherapyFeatures";
import TherapyProcess from "./TherapyProcess";
import TherapyWhoFor from "./TherapyWhoFor";
import TherapyFaq from "./TherapyFaq";
import type { TherapyPageContent } from "@/lib/therapy/types";
import type { SiteSettings } from "@/lib/settings";
import { absoluteUrl, jsonLdScript, SITE_NAME } from "@/lib/seo";

function buildTherapyJsonLd(content: TherapyPageContent) {
  const pageUrl = absoluteUrl(`/${content.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle,
        description: content.metaDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": `${pageUrl}#therapy` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        provider: { "@id": absoluteUrl("/#business") },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Terapiler",
            item: absoluteUrl("/#therapies"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.heroTitle,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "MedicalTherapy",
        "@id": `${pageUrl}#therapy`,
        name: content.heroTitle,
        description: content.metaDescription,
        url: pageUrl,
        provider: {
          "@type": ["LocalBusiness", "MedicalBusiness"],
          "@id": absoluteUrl("/#business"),
          name: SITE_NAME,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: "tr-TR",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.link ? `${item.answer} ${item.link.text}` : item.answer,
          },
        })),
      },
    ],
  };
}

export default function TherapyPage({
  content,
  settings,
}: {
  content: TherapyPageContent;
  settings: SiteSettings;
}) {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildTherapyJsonLd(content)) }}
      />
      <Navbar />
      <TherapyHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
      />
      <TherapyIntro heading={content.introHeading} paragraphs={content.introParagraphs} />
      {content.notice && <TherapyNotice notice={content.notice} />}
      <TherapyFeatures heading={content.featuresHeading} features={content.features} />
      <TherapyProcess heading={content.processHeading} steps={content.processSteps} />
      <TherapyWhoFor heading={content.whoForHeading} items={content.whoForItems} />
      <TherapyFaq items={content.faq} />
      <Contact settings={settings} />
    </main>
  );
}
