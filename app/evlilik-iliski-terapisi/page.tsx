import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { evlilikIliskiTerapisiContent } from "@/lib/therapy/evlilik-iliski-terapisi";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    evlilikIliskiTerapisiContent.slug,
    evlilikIliskiTerapisiContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function EvlilikIliskiTerapisiPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(evlilikIliskiTerapisiContent.slug, evlilikIliskiTerapisiContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
