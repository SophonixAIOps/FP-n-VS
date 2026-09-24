import { ogImage } from "@/lib/seo";
import { SITE_URL, studio } from "@/lib/studio";

/**
 * STRUCTURED DATA
 *
 * Everything a crawler is told about the studio as an entity, built from the
 * business profile in `studio.ts` and from nothing else. No literal is written
 * twice here; if a value is not in that profile it does not reach a crawler.
 *
 * The governing rule is that a field is emitted only when it is populated. An
 * absent property is read as "not stated", which is true. An empty or invented
 * one is read as a claim, which would not be — and unlike most SEO mistakes,
 * fabricated local data is actively penalised rather than merely ignored.
 */

/**
 * Stable identifiers, so every node can point at the studio rather than
 * describing it again. Two nodes naming the same business without an `@id`
 * between them are read as two businesses.
 */
export const studioId = `${SITE_URL}/#studio`;
const websiteId = `${SITE_URL}/#website`;

/**
 * The studio itself.
 *
 * The type is chosen by the data, not by ambition. With a verified address it
 * is a `PhotographStudio` — schema.org's photography-specific subtype of
 * `LocalBusiness`, which is what makes a business eligible for local results.
 * Without one it is an `Organization`, because a LocalBusiness that cannot say
 * where it is is precisely the markup search engines treat as spam.
 *
 * So the upgrade is a data change, not a code change: fill in `location` in
 * `studio.ts` and the type, the address and the geo point all follow. Nothing
 * here needs editing.
 *
 * `logo` is absent and should stay absent. The identity is the typographic
 * wordmark, which is markup rather than a file — there is no image to point
 * at, and rendering one purely to satisfy a schema property would be inventing
 * an asset. `image` carries the social card instead, which is a real
 * photograph at a URL that resolves.
 */
function businessNode() {
  const { location, serviceArea, openingHours, socialProfiles } = studio;

  return {
    "@type": location ? "PhotographStudio" : "Organization",
    "@id": studioId,
    name: studio.name,
    url: studio.url,
    description: studio.description,
    image: ogImage.url,
    ...(studio.email && { email: studio.email }),
    ...(studio.telephone && { telephone: studio.telephone }),
    ...(location && {
      address: {
        "@type": "PostalAddress",
        ...(location.streetAddress && { streetAddress: location.streetAddress }),
        addressLocality: location.addressLocality,
        ...(location.addressRegion && { addressRegion: location.addressRegion }),
        ...(location.postalCode && { postalCode: location.postalCode }),
        addressCountry: location.addressCountry,
      },
      ...(location.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.geo.latitude,
          longitude: location.geo.longitude,
        },
      }),
    }),
    /*
     * Independent of `location`: a studio can travel to a region it has no
     * address in, and for wedding work that is the normal case.
     */
    ...(serviceArea.length > 0 && {
      areaServed: serviceArea.map((area) => ({
        "@type": area.type,
        name: area.name,
      })),
    }),
    ...(openingHours.length > 0 && {
      openingHoursSpecification: openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      })),
    }),
    ...(socialProfiles.length > 0 && { sameAs: socialProfiles }),
  };
}

/** The site, published by the studio above. */
function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: studio.name,
    url: studio.url,
    inLanguage: "en",
    publisher: { "@id": studioId },
  };
}

/**
 * The pair every page carries. `aggregateRating`, `review` and `award` are
 * deliberately not here and must not be added until there is real data behind
 * them — rating markup invented for a demo is the one thing in this file that
 * could mislead a person rather than just a crawler.
 */
export function studioGraph() {
  return [businessNode(), webSiteNode()];
}

/**
 * What the studio offers, one node per service, for the services page only.
 *
 * This answers the question the page itself answers — "do they do the thing I
 * need?" — using the same names and the same sentences a reader sees, so there
 * is nothing in the markup that is not also on the page. `url` points at the
 * anchor the service index already links to, so each node resolves to the
 * section describing it.
 *
 * No `offers`, no `priceRange`, no `availability`: the studio publishes no
 * prices, and a price range guessed to fill a property would be a claim about
 * money. `provider` is a reference rather than a repeat of the business, so
 * six services describe one studio instead of six.
 */
export function serviceGraph(
  services: readonly { slug: string; name: string; description: string }[]
) {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services#${service.slug}`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${SITE_URL}/services#${service.slug}`,
    provider: { "@id": studioId },
  }));
}
