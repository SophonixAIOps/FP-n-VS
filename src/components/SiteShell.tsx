import { cn } from "@/lib/cn";
import { Header } from "./Header";
import { SiteFooter } from "./SiteFooter";

/**
 * Header, main and footer, composed once.
 *
 * A page states its ground a single time and the shell derives the rest:
 * `surface` is the ground the header rests on, so it settles the header's ink
 * too — see DESIGN.md §13, `tone` is ink and `surface` is ground.
 *
 * `surface="dark"` also drops the top padding on `main`. A dark ground here
 * means the page opens on full-bleed photography, and §10 requires that
 * photography run under the transparent header to the top edge. A light ground
 * gets the header's height back as padding so content clears the bar.
 */

type SiteShellProps = {
  children: React.ReactNode;
  /** The ground the header opens over. */
  surface?: "light" | "dark";
  /** Current route, for the nav marker. */
  activeHref?: string;
  /** The footer invitation. Drop it when the page already closes on a CTA. */
  cta?: boolean;
  /** Secondary links for the footer meta rail. */
  footerNav?: React.ReactNode;
};

export function SiteShell({
  children,
  surface = "light",
  activeHref,
  cta = true,
  footerNav,
}: SiteShellProps) {
  const overPhotography = surface === "dark";

  return (
    <>
      <Header tone={overPhotography ? "light" : "dark"} activeHref={activeHref} />

      <main className={cn("flex-1", !overPhotography && "pt-(--header-height)")}>
        {children}
      </main>

      <SiteFooter cta={cta}>{footerNav}</SiteFooter>
    </>
  );
}
