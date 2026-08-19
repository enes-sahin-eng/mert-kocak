import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { evlilikIliskiTerapisiContent } from "@/lib/therapy/evlilik-iliski-terapisi";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: evlilikIliskiTerapisiContent.metaTitle,
  description: evlilikIliskiTerapisiContent.metaDescription,
  alternates: { canonical: `/${evlilikIliskiTerapisiContent.slug}` },
};

export default async function EvlilikIliskiTerapisiPage() {
  const settings = await getSettings();
  return <TherapyPage content={evlilikIliskiTerapisiContent} settings={settings} />;
}
