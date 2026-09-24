import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { Eyebrow } from "./Typography";
import { EditorialButton } from "./EditorialLink";
import { STUDIO_EMAIL, studio } from "@/lib/studio";

/**
 * The verified details, when there are any.
 *
 * Everything here is driven by the business profile and renders nothing while
 * those fields are empty — which they are, and must stay, until a real studio
 * fills them in. That is the readiness this needs: a place for a city and a
 * phone number to appear, not a placeholder standing where one will go.
 *
 * `<address>` is the element for the contact details of its nearest ancestor,
 * which is exactly what these are. Social links are labelled by their own
 * hostname rather than a lookup table of platform names, so adding a profile
 * to the config is the whole of adding a profile.
 */
function StudioDetails() {
  const { location, serviceArea, telephone, socialProfiles } = studio;
  const place = location
    ? [location.addressLocality, location.addressRegion]
        .filter(Boolean)
        .join(", ")
    : null;

  if (!place && !telephone && serviceArea.length === 0 && socialProfiles.length === 0) {
    return null;
  }

  return (
    <address className="type-meta flex flex-col gap-2 not-italic lg:items-end">
      {(place || telephone) && (
        <span>
          {place}
          {place && telephone && <span aria-hidden="true"> · </span>}
          {telephone && <a href={`tel:${telephone}`}>{telephone}</a>}
        </span>
      )}

      {serviceArea.length > 0 && (
        <span>
          Also working in {serviceArea.map((area) => area.name).join(", ")}
        </span>
      )}

      {socialProfiles.length > 0 && (
        <span className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
          {socialProfiles.map((href) => (
            <a
              key={href}
              href={href}
              rel="me noopener"
              className="transition-opacity duration-(--duration-fast) ease-editorial hover:opacity-70"
            >
              {new URL(href).hostname.replace(/^www\./, "")}
            </a>
          ))}
        </span>
      )}
    </address>
  );
}

/**
 * The closing frame of every page.
 *
 * Two bands: an invitation set at display scale on the dark ground, then a
 * hairline meta rail carrying the identity, an optional nav slot and the
 * colophon. Pages that already end on their own closing composition pass
 * `cta={false}` so the invitation is not made twice.
 */

type SiteFooterProps = {
  /** The invitation band. Drop it when the page already closes on a CTA. */
  cta?: boolean;
  /** Secondary links for the meta rail — specimen nav, legal, and the like. */
  children?: React.ReactNode;
  className?: string;
};

export function SiteFooter({ cta = true, children, className }: SiteFooterProps) {
  return (
    <footer className={cn("border-t border-border", className)}>
      {cta && (
        <div className="bg-bg-dark text-text-inverse">
          <div className="mx-auto max-w-wide px-gutter py-section">
            <Eyebrow tone="light" rule>
              Commissions
            </Eyebrow>

            <p className="type-display-md mt-7 max-w-[18ch] font-display">
              Let&rsquo;s make something worth{" "}
              <span className="type-emphasis">remembering</span>.
            </p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
              <EditorialButton href="/contact" tone="light">
                Book a Session
              </EditorialButton>

              <a
                href={`mailto:${STUDIO_EMAIL}`}
                className="type-nav text-text-inverse opacity-70 transition-opacity duration-(--duration-fast) ease-editorial hover:opacity-100"
              >
                {STUDIO_EMAIL}
              </a>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "mx-auto flex max-w-wide flex-col gap-8 px-gutter py-10",
          "lg:flex-row lg:items-end lg:justify-between",
          cta && "border-t border-border"
        )}
      >
        <Wordmark size="sm" tone="dark" withDescender />

        <div className="flex flex-col gap-6 lg:items-end">
          {children}
          <StudioDetails />
          <span className="type-meta">
            Photography via Unsplash, for demonstration
          </span>
        </div>
      </div>
    </footer>
  );
}
