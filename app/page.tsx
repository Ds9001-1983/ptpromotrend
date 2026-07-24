import type { Metadata } from "next";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { IntroStatement } from "@/components/sections/home/IntroStatement";
import { CategoryShowcase } from "@/components/sections/home/CategoryShowcase";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { ProjectsGallery } from "@/components/sections/home/ProjectsGallery";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { ContactCTA } from "@/components/sections/home/ContactCTA";
import { site } from "@/content/site-config";

export const metadata: Metadata = {
  title:
    "Werbeartikel aus Wiehl im Oberbergischen | PROMOtrend – Annette Herrmann",
  description:
    "Werbeartikel, Werbemittel und Mitarbeiterbekleidung mit deinem Logo — kuratiert aus über 100.000 Artikeln, persönlich beraten von Annette Herrmann aus Wiehl. Schreib ihr direkt per WhatsApp.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.domain,
  telephone: "+492262752789",
  email: site.email,
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  areaServed: ["Wiehl", "Oberbergischer Kreis", "Gummersbach", "Köln"],
  description:
    "Werbeartikel, Werbemittel und Mitarbeiterbekleidung mit Logo — persönliche Beratung durch Annette Herrmann, über 100.000 Artikel im Zugriff.",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSequence />
      <IntroStatement />
      <CategoryShowcase />
      <ProcessSection />
      <ProjectsGallery />
      <AboutTeaser />
      <ContactCTA />
    </main>
  );
}
