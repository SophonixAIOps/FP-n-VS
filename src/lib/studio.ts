/**
 * The studio's own details.
 *
 * Fictional, and deliberately the only place they are written down — the footer
 * and the inquiry page both read from here so the address shown on the page can
 * never drift from the one a `mailto:` actually opens.
 */

export const STUDIO_EMAIL = "hello@frameandstory.studio";

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
