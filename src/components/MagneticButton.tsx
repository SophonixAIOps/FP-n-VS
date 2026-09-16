"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * A control that leans very slightly toward the pointer.
 *
 * Deliberately weak — `strength` is a fraction of the distance from centre, not
 * a jump to it. If you can clearly see it move, it is turned up too high.
 *
 * Pointer-driven, so it is inert on touch devices and switched off entirely
 * under reduced motion.
 */

type MagneticButtonProps = {
  children: React.ReactNode;
  /** Fraction of pointer offset applied. Keep at or below 0.35. */
  strength?: number;
  className?: string;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  strength = 0.25,
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={reduced ? undefined : { x: springX, y: springY }}
      className={cn(
        "type-nav inline-flex items-center justify-center gap-3",
        "border border-border-strong px-7 py-4",
        "transition-colors duration-[var(--duration-standard)] ease-editorial",
        "hover:border-ink-900",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
