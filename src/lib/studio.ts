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

/* ---------------------------------------------------------------------------
   THE BUSINESS PROFILE
   ---------------------------------------------------------------------------
   One object describing the studio as an entity, read by the footer, the
   inquiry page and every structured-data node. Nothing below is duplicated
   anywhere else in the codebase.

   The rule this file enforces, and the reason the types look the way they do:
   a field is either VERIFIED or ABSENT. There is no third state. Absent is
   `null` for single values and `[]` for lists — never a placeholder string,
   because `"YOUR_CITY"` is one careless render away from being printed on a
   page or emitted into a schema a crawler will believe. `null` cannot be
   printed by accident; TypeScript makes you handle it.

   Everything unverified is therefore empty today. Filling any of it in is the
   whole job of deploying this for a real studio, and each field below says
   what it needs. Do not fill one in to make the schema look fuller — an
   Organization with four true facts outranks a LocalBusiness with twelve
   invented ones, and invented local data is the one SEO mistake that can get a
   real business penalised rather than merely ignored.
   --------------------------------------------------------------------------- */

/** ISO 8601 24-hour time, e.g. `09:00`. */
type Time = `${number}${number}:${number}${number}`;

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type StudioLocation = {
  /** Street and number. Omit for a business with no address open to visitors. */
  streetAddress?: string;
  /** The city or town. Required — a location without one is not a location. */
  addressLocality: string;
  /** State, province or county, where the postal convention uses one. */
  addressRegion?: string;
  postalCode?: string;
  /** ISO 3166-1 alpha-2, e.g. `GB`. Not the country's printed name. */
  addressCountry: string;
  /**
   * Only from a verified pin on the actual premises. Never derived from the
   * city name, and never from where the site happens to be hosted.
   */
  geo?: { latitude: number; longitude: number };
};

/**
 * Somewhere the studio will travel to work. Distinct from `location`, which is
 * where it is based — a studio can serve a region it has no address in, and
 * that is the normal case for wedding photography.
 */
export type ServiceArea = {
  /** As a person would say it: `Somerset`, not `Somerset, United Kingdom`. */
  name: string;
  /** The schema.org place type, which decides how a crawler resolves `name`. */
  type: "City" | "State" | "Country" | "AdministrativeArea";
};

export type OpeningHours = {
  days: Weekday[];
  opens: Time;
  closes: Time;
};

export type BusinessProfile = {
  name: string;
  description: string;
  url: string;
  email: string | null;
  /** E.164 with the country code, e.g. `+441234567890`. */
  telephone: string | null;
  /** Where the studio is based. `null` until an address is verified. */
  location: StudioLocation | null;
  /** Where it will travel to. Empty until verified. */
  serviceArea: ServiceArea[];
  /**
   * Empty is the honest answer for an appointment-only studio, and stays
   * empty unless real published hours exist. Generic office hours invented to
   * populate a schema are worse than no hours: they tell someone the studio is
   * open when it is not.
   */
  openingHours: OpeningHours[];
  /** Absolute URLs to profiles the studio actually controls. */
  socialProfiles: string[];
};

export const studio: BusinessProfile = {
  name: STUDIO_NAME,
  description:
    "A photography and film studio working with couples, families and brands.",
  url: SITE_URL,
  email: STUDIO_EMAIL,

  telephone: null,
  location: null,
  serviceArea: [],
  openingHours: [],
  socialProfiles: [],
};

/* -------------------------------------------------------------------------- */

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
