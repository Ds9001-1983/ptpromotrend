import type { MetadataRoute } from "next";
import { kategorien } from "@/content/kategorien";
import { site } from "@/content/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const statisch = ["", "/werbeartikel", "/ueber-annette", "/kontakt"].map(
    (p) => ({
      url: `${site.domain}${p}/`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    }),
  );
  const kats = kategorien.map((k) => ({
    url: `${site.domain}/werbeartikel/${k.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  return [...statisch, ...kats];
}
