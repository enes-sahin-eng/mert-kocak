import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { depresyonTerapisiContent } from "@/lib/therapy/depresyon-terapisi";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    depresyonTerapisiContent.slug,
    depresyonTerapisiContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function DepresyonTerapisiPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(depresyonTerapisiContent.slug, depresyonTerapisiContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
