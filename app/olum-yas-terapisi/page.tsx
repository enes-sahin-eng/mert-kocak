import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { olumYasTerapisiContent } from "@/lib/therapy/olum-yas-terapisi";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    olumYasTerapisiContent.slug,
    olumYasTerapisiContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function OlumYasTerapisiPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(olumYasTerapisiContent.slug, olumYasTerapisiContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
