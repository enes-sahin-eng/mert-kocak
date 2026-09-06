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
import { getVideos } from "@/lib/videos";
import {
  absoluteUrl,
  jsonLdScript,
  SITE_NAME,
  SITE_TAGLINE,
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_PRICE_RANGE,
  buildOpeningHours,
} from "@/lib/seo";

function buildHomeJsonLd(settings: SiteSettings) {
  // sameAs: linkedin yerine youtube kullanılıyor (bkz. lib/settings.ts).
  const sameAs = [settings.social.instagram, settings.social.youtube].filter(Boolean);
  const image = settings.author.image ?? undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        // Google, arama sonuçlarında gösterdiği "site adı"nı bu alanlardan
        // seçiyor; alternateName ikinci bir aday sunar. publisher ise siteyi
        // işletme varlığına bağlar (aksi halde WebSite tek başına durur).
        alternateName: `${SITE_TAGLINE} ${SITE_NAME}`,
        publisher: { "@id": absoluteUrl("/#business") },
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
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
          width: 1024,
          height: 1024,
        },
        description: settings.author.bio ?? undefined,
        telephone: settings.phoneLink || settings.phone || undefined,
        email: settings.email || undefined,
        priceRange: BUSINESS_PRICE_RANGE,
        address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
        geo: { "@type": "GeoCoordinates", ...BUSINESS_GEO },
        openingHoursSpecification: buildOpeningHours(settings.contact.workingHours),
        areaServed: "İstanbul",
        sameAs,
        founder: { "@id": absoluteUrl("/#person") },
      },
    ],
  };
}

export default async function Home() {
  const [settings, therapies, testimonials, videos] = await Promise.all([
    getSettings(),
    getTherapies(),
    getTestimonials(),
    getVideos(),
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildHomeJsonLd(settings)) }}
      />
      <Navbar logo={settings.logo} />
      <Hero settings={settings} />
      <About settings={settings} />
      <Therapies therapies={therapies} />
      <Testimonials testimonials={testimonials} settings={settings} />
      <VideoStories videos={videos} section={settings.videos} />
      <Contact settings={settings} />
    </main>
  );
}
