import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { Eyebrow } from "./Typography";
import { EditorialButton } from "./EditorialLink";
import { STUDIO_EMAIL } from "@/lib/studio";

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
          <span className="type-meta">
            Photography via Unsplash, for demonstration
          </span>
        </div>
      </div>
    </footer>
  );
}
