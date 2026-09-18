"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * Restraint is the whole brief. A wordmark, four links, one call to action, and
 * nothing else. It sits over a full-screen hero with no background at all, then
 * settles into an ivory bar once the reader scrolls past the first frame.
 *
 * `tone` sets the resting colour while transparent — pass "light" when the
 * header opens over dark photography. After the scroll threshold it always
 * resolves to the light background with dark text, so contrast never depends on
 * whatever image happens to be behind it.
 */

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 24;

type HeaderProps = {
  /** Colour while the header is still transparent. */
  tone?: "light" | "dark";
  /** Currently active route, for the nav marker. */
  activeHref?: string;
};

export function Header({ tone = "dark", activeHref }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Once scrolled the bar is always ivory, so text is always dark.
  const onLight = scrolled || tone === "dark";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0",
          "h-[var(--header-height)]",
          "transition-[background-color,border-color,color] duration-[var(--duration-slow)] ease-editorial",
          // Opaque, not translucent: at 92% a 2px blur is not enough to stop
          // display-scale serif underneath from reading straight through the bar.
          scrolled
            ? "border-b border-border bg-bg"
            : "border-b border-transparent bg-transparent",
          onLight ? "text-text" : "text-text-inverse"
        )}
        style={{ zIndex: "var(--z-header)" }}
      >
        <div className="mx-auto flex h-full max-w-wide items-center justify-between px-gutter">
          <Link
            href="/"
            aria-label="Frame & Story Studio, home"
            className="transition-opacity duration-[var(--duration-fast)] hover:opacity-70"
          >
            <Wordmark size="sm" tone="inherit" />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => {
                const active = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "type-nav group/nav relative inline-block py-2",
                        "transition-opacity duration-[var(--duration-fast)] ease-editorial",
                        active ? "opacity-100" : "opacity-65 hover:opacity-100"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current",
                          "transition-transform duration-[var(--duration-standard)] ease-editorial",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              data-cursor="inquire"
              className={cn(
                "type-nav group/cta hidden items-center gap-2 border px-5 py-2.5 md:inline-flex",
                "transition-colors duration-[var(--duration-standard)] ease-editorial",
                onLight
                  ? "border-border-strong hover:border-ink-900"
                  : "border-white/35 hover:border-white"
              )}
            >
              Inquire
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-standard)] ease-editorial group-hover/cta:translate-x-1"
              >
                &rarr;
              </span>
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="type-nav -mr-2 p-2 md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        triggerRef={triggerRef}
      />
    </>
  );
}
