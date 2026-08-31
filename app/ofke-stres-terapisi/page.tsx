import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { ofkeStresTerapisiContent } from "@/lib/therapy/ofke-stres-terapisi";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    ofkeStresTerapisiContent.slug,
    ofkeStresTerapisiContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function OfkeStresTerapisiPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(ofkeStresTerapisiContent.slug, ofkeStresTerapisiContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
