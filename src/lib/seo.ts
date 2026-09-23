import type { Metadata } from "next";
import { images, socialImage } from "@/lib/images";
import { STUDIO_NAME } from "@/lib/studio";

/**
 * One description of one page, in the four places that each want to hear it
 * slightly differently.
 *
 * This exists because of a sharp edge in the metadata API: a route that sets
 * `openGraph` at all *replaces* the parent's `openGraph` entirely — it does not
 * merge field by field. So a page declaring nothing but an Open Graph title
 * silently drops the inherited card image, site name and locale, and the miss
 * is invisible until you read the rendered `<head>`. Rather than repeat the
 * unchanging fields on every route and hope none of them drifts, each route
 * states only what is genuinely its own and this composes the rest.
 */

/**
 * The photograph every social card falls back to. The site's opening frame, so
 * a shared link previews with the same image the visitor lands on.
 */
export const ogImage = {
  url: socialImage(images.hero.id),
  width: 1200,
  height: 630,
  alt: images.hero.alt,
};

export function pageMetadata({
  title,
  description,
  path,
  socialDescription = description,
  absoluteTitle = false,
}: {
  /** Short and page-specific; the brand suffix is added by the title template. */
  title: string;
  description: string;
  /** Route path with a leading slash. Resolved against `metadataBase`. */
  path: string;
  /** A shorter line where a card would otherwise truncate mid-sentence. */
  socialDescription?: string;
  /** For the homepage, where the brand leads rather than trails. */
  absoluteTitle?: boolean;
}): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${STUDIO_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: STUDIO_NAME,
      locale: "en",
      url: path,
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
  };
}
