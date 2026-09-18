"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { menuItem, menuOverlay, reducedVariants, staggerContainer } from "@/lib/motion";
import { Wordmark } from "./Wordmark";
import type { NavItem } from "./Header";

/**
 * Full-screen editorial menu overlay.
 *
 * Not a dropdown. The panel wipes up over the page via clip-path, then the
 * links rise in sequence at display scale — the menu is a composition in its
 * own right.
 *
 * Accessibility is doing real work here: focus moves into the panel on open and
 * returns to the trigger on close, Tab is trapped inside while it is open,
 * Escape dismisses, and background scroll is locked. Under reduced motion the
 * wipe and the stagger both collapse to a plain fade.
 */

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  /** The control that opened the menu. Focus returns here on close. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ open, onClose, items, triggerRef }: MobileNavProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus in on open, and back to the trigger on close. The guard matters:
  // without it the closed branch also runs on mount, stealing focus to the Menu
  // trigger on every page load.
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      closeRef.current?.focus();
    } else if (hasOpened.current) {
      triggerRef.current?.focus();
    }
    // Focus should only move in response to the open state changing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape to dismiss, Tab trapped within the panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 bg-bg-dark text-text-inverse"
          style={{ zIndex: "var(--z-menu)" }}
          variants={reduced ? reducedVariants : menuOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex h-full flex-col">
            <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between px-gutter">
              <Wordmark size="sm" tone="light" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="type-nav -mr-2 p-2 text-text-inverse transition-opacity duration-[var(--duration-fast)] hover:opacity-60"
              >
                Close
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col justify-center gap-2 px-gutter pb-20"
              variants={reduced ? reducedVariants : staggerContainer(0.07, 0.2)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {items.map((item) => (
                <motion.div
                  key={item.href}
                  variants={reduced ? reducedVariants : menuItem}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="type-display-md block py-2 font-display text-text-inverse transition-opacity duration-[var(--duration-fast)] hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="shrink-0 border-t border-border-inverse px-gutter py-6"
              variants={reduced ? reducedVariants : menuItem}
            >
              <a
                href="mailto:hello@frameandstory.studio"
                className="type-nav text-text-inverse opacity-70 transition-opacity hover:opacity-100"
              >
                hello@frameandstory.studio
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
