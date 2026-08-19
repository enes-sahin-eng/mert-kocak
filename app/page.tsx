import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Therapies from "@/components/Therapies";
import Testimonials from "@/components/Testimonials";
import VideoStories from "@/components/VideoStories";
import Contact from "@/components/Contact";
import { getSettings, type SiteSettings } from "@/lib/settings";
import { getTherapies } from "@/lib/therapies";
import { getTestimonials } from "@/lib/testimonials";
import { absoluteUrl, jsonLdScript, SITE_NAME } from "@/lib/seo";

function buildHomeJsonLd(settings: SiteSettings) {
  const sameAs = [settings.social.instagram, settings.social.linkedin].filter(Boolean);
  const image = settings.author.image ?? undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        inLanguage: "tr-TR",
      },
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: settings.author.name,
        jobTitle: settings.author.title,
        description: settings.author.bio ?? undefined,
        image,
        url: absoluteUrl("/"),
        sameAs,
        worksFor: { "@id": absoluteUrl("/#business") },
      },
      {
        "@type": ["LocalBusiness", "MedicalBusiness"],
        "@id": absoluteUrl("/#business"),
        name: `${settings.author.name} — ${settings.author.title}`,
        url: absoluteUrl("/"),
        image,
        telephone: settings.phoneLink || settings.phone || undefined,
        email: settings.email || undefined,
        address: settings.address
          ? { "@type": "PostalAddress", addressLocality: settings.address, addressCountry: "TR" }
          : undefined,
        areaServed: settings.address || "İstanbul",
        sameAs,
        founder: { "@id": absoluteUrl("/#person") },
      },
    ],
  };
}

export default async function Home() {
  const [settings, therapies, testimonials] = await Promise.all([
    getSettings(),
    getTherapies(),
    getTestimonials(),
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildHomeJsonLd(settings)) }}
      />
      <Navbar />
      <Hero settings={settings} />
      <About settings={settings} />
      <Therapies therapies={therapies} />
      <Testimonials testimonials={testimonials} settings={settings} />
      <VideoStories />
      <Contact settings={settings} />
    </main>
  );
}
