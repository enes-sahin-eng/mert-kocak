import type { Metadata } from "next";
import TherapyPage from "@/components/therapy/TherapyPage";
import { bireyselTerapiContent } from "@/lib/therapy/bireysel-terapi";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: bireyselTerapiContent.metaTitle,
  description: bireyselTerapiContent.metaDescription,
  alternates: { canonical: `/${bireyselTerapiContent.slug}` },
};

export default async function BireyselTerapiPage() {
  const settings = await getSettings();
  return <TherapyPage content={bireyselTerapiContent} settings={settings} />;
}
