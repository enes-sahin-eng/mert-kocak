export interface TherapyFeature {
  title: string;
  description: string;
}

export interface TherapyProcessStep {
  title: string;
  description: string;
}

export interface TherapyFaqItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

/**
 * Sayfa içinde gösterilen bilgilendirme/uyarı bloğu.
 * Örn. yas sayfasındaki kriz yönlendirmesi. Opsiyoneldir.
 */
export interface TherapyNotice {
  title: string;
  text: string;
}

export interface TherapyPageContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;

  introHeading: string;
  introParagraphs: string[];

  notice?: TherapyNotice;

  featuresHeading: string;
  features: TherapyFeature[];

  processHeading: string;
  processSteps: TherapyProcessStep[];

  whoForHeading: string;
  whoForItems: TherapyFeature[];

  faq: TherapyFaqItem[];
}
