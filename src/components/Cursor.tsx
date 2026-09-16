"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Custom desktop cursor.
 *
 * A small dot by default. Over anything carrying `data-cursor`, it grows into a
 * labelled disc — VIEW on portfolio frames, PLAY on film, INQUIRE on calls to
 * action.
 *
 * Strictly an enhancement. It only mounts on devices with a fine pointer and
 * hover, and never under reduced motion, so touch users and anyone who has
 * asked for less movement get the native cursor untouched. The native cursor is
 * only hidden once this one is actually running — if it fails, the page is
 * still usable.
 */

const LABELS: Record<string, string> = {
  view: "View",
  play: "Play",
  inquire: "Inquire",
};

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });

  useEffect(() => {
    // Only for precise pointers that can actually hover.
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as Element | null)?.closest?.(
        "[data-cursor]"
      );
      const key = target?.getAttribute("data-cursor") ?? null;
      setLabel(key && key in LABELS ? key : null);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduced, x, y]);

  // Hide the system cursor only while ours is live.
  useEffect(() => {
    if (!enabled || reduced) return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  const isLabelled = label !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 hidden md:block"
      style={{ x: springX, y: springY, zIndex: "var(--z-cursor)" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: duration.fast }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-ivory-100 mix-blend-difference"
        animate={{
          width: isLabelled ? 76 : 8,
          height: isLabelled ? 76 : 8,
        }}
        transition={{ duration: duration.standard, ease: ease.editorial }}
      >
        <AnimatePresence>
          {isLabelled && (
            <motion.span
              key={label}
              className="type-eyebrow text-ink-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
            >
              {LABELS[label]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
