import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { olumYasTerapisiContent } from "@/lib/therapy/olum-yas-terapisi";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: olumYasTerapisiContent.metaTitle,
  description: olumYasTerapisiContent.metaDescription,
  alternates: { canonical: `/${olumYasTerapisiContent.slug}` },
};

export default async function OlumYasTerapisiPage() {
  const settings = await getSettings();
  return <TherapyPage content={olumYasTerapisiContent} settings={settings} />;
}
