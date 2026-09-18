import Link from "next/link";
import { cn } from "@/lib/cn";
import { workCategories, type CategorySlug } from "@/lib/images";

/**
 * The archive filter.
 *
 * Real links to prerendered routes rather than buttons over a client-side list.
 * That is what keeps the filter working with JavaScript unavailable — and it
 * comes with keyboard support, back-button behaviour and a linkable URL for
 * every view, none of which would need writing.
 *
 * The rule under the active item is the same one the header uses: held open
 * permanently for the current category, wiping in from the left on hover. The
 * active state is carried by ink weight *and* the rule, never colour alone.
 */

export function categoryHref(slug: CategorySlug): string {
  return slug === "all" ? "/portfolio" : `/portfolio/${slug}`;
}

export function CategoryNav({
  active,
  className,
}: {
  active: CategorySlug;
  className?: string;
}) {
  return (
    <nav aria-label="Filter the archive by category" className={className}>
      {/* Wraps rather than scrolls: six short labels fit in two lines at 320px,
          and nothing ends up parked off-screen where it can be missed. */}
      <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {workCategories.map(({ slug, label }) => {
          const current = slug === active;

          return (
            <li key={slug}>
              <Link
                href={categoryHref(slug)}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "type-nav group/cat relative inline-block py-2",
                  "transition-opacity duration-[var(--duration-fast)] ease-editorial",
                  current ? "opacity-100" : "opacity-55 hover:opacity-100"
                )}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current",
                    "transition-transform duration-[var(--duration-standard)] ease-editorial",
                    current ? "scale-x-100" : "scale-x-0 group-hover/cat:scale-x-100"
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
