import { cn } from "@/lib/cn";

/**
 * The contents rail for the services catalogue.
 *
 * Plain in-page anchors, set once near the top rather than pinned to the
 * viewport. A sticky index would have to sit over the photography at every
 * width and would be the loudest element on a page whose whole argument is
 * restraint — this gets the reader to a service in one click and then stops
 * existing. It needs no JavaScript, tabs in reading order, and wraps instead of
 * scrolling so nothing ends up parked off-screen at 320px.
 */

export function ServiceIndex({
  items,
  className,
}: {
  items: { slug: string; name: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Jump to a service" className={className}>
      <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
        {items.map((item, index) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className={cn(
                "type-nav group/idx inline-flex items-baseline gap-2 py-2",
                "opacity-55 transition-opacity duration-(--duration-fast) ease-editorial",
                "hover:opacity-100 focus-visible:opacity-100"
              )}
            >
              <span aria-hidden="true" className="tabular-nums opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="relative">
                {item.name}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current",
                    "transition-transform duration-(--duration-standard) ease-editorial",
                    "group-hover/idx:scale-x-100"
                  )}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
