import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { depresyonTerapisiContent } from "@/lib/therapy/depresyon-terapisi";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: depresyonTerapisiContent.metaTitle,
  description: depresyonTerapisiContent.metaDescription,
  alternates: { canonical: `/${depresyonTerapisiContent.slug}` },
};

export default async function DepresyonTerapisiPage() {
  const settings = await getSettings();
  return <TherapyPage content={depresyonTerapisiContent} settings={settings} />;
}
