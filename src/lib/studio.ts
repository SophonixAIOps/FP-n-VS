/**
 * The studio's own details.
 *
 * Fictional, and deliberately the only place they are written down — the footer
 * and the inquiry page both read from here so the address shown on the page can
 * never drift from the one a `mailto:` actually opens.
 */

export const STUDIO_NAME = "Frame & Story Studio";

export const STUDIO_EMAIL = "hello@frameandstory.studio";

/**
 * Where the site believes it lives. Canonical URLs, the sitemap, robots and
 * every absolute Open Graph URL are all derived from this one value.
 *
 * `.example` is reserved by RFC 2606 and can never be registered, so the
 * fallback is a placeholder that is impossible to mistake for a real studio —
 * which matters more here than convenience, because a wrong canonical is worse
 * than an obviously absent one.
 *
 * To deploy for real, set `NEXT_PUBLIC_SITE_URL` to the production origin with
 * no trailing slash. It is read at build time and must be public: canonical
 * tags and the sitemap are part of the rendered output, so there is nothing
 * secret about it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.framestorystudio.example";

/**
 * Kebab-cases a service name so a link can carry it to the inquiry form.
 *
 * Both ends of that link go through this function — the catalogue when it
 * writes `?service=`, the form when it reads one back — so a rename on one side
 * cannot quietly stop matching the other.
 */
export function serviceSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
