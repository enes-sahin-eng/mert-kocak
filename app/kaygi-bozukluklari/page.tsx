import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { kaygiBozukluklariContent } from "@/lib/therapy/kaygi-bozukluklari";
import { getTherapyPageContent } from "@/lib/therapyPage";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTherapyPageContent(
    kaygiBozukluklariContent.slug,
    kaygiBozukluklariContent,
  );
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function KaygiBozukluklariPage() {
  const [content, settings] = await Promise.all([
    getTherapyPageContent(kaygiBozukluklariContent.slug, kaygiBozukluklariContent),
    getSettings(),
  ]);
  return <TherapyPage content={content} settings={settings} />;
}
