import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { ofkeStresTerapisiContent } from "@/lib/therapy/ofke-stres-terapisi";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: ofkeStresTerapisiContent.metaTitle,
  description: ofkeStresTerapisiContent.metaDescription,
  alternates: { canonical: `/${ofkeStresTerapisiContent.slug}` },
};

export default async function OfkeStresTerapisiPage() {
  const settings = await getSettings();
  return <TherapyPage content={ofkeStresTerapisiContent} settings={settings} />;
}
