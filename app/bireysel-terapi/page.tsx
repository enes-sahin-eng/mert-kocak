import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { bireyselTerapiContent } from "@/lib/therapy/bireysel-terapi";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    bireyselTerapiContent.slug,
    bireyselTerapiContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function BireyselTerapiPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(bireyselTerapiContent.slug, bireyselTerapiContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
