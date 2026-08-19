import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { kaygiBozukluklariContent } from "@/lib/therapy/kaygi-bozukluklari";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: kaygiBozukluklariContent.metaTitle,
  description: kaygiBozukluklariContent.metaDescription,
  alternates: { canonical: `/${kaygiBozukluklariContent.slug}` },
};

export default async function KaygiBozukluklariPage() {
  const settings = await getSettings();
  return <TherapyPage content={kaygiBozukluklariContent} settings={settings} />;
}
