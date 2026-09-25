import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/Typography";

/**
 * Presentation scaffolding for the design-system specimens.
 *
 * These are proofs, not production components. Nothing in this folder should be
 * imported by a real page — the specimens exist so the visual language can be
 * checked in isolation before any page is built on top of it.
 */

export function SpecSection({
  title,
  number,
  description,
  children,
  className,
}: {
  title: string;
  number: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-border py-section-sm", className)}>
      <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex items-baseline gap-5">
          <span className="type-meta tabular-nums">{number}</span>
          <h2 className="type-h2 font-display">{title}</h2>
        </div>
        {description && (
          <p className="type-small max-w-[46ch] text-text-muted">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

export function SpecRow({
  label,
  note,
  children,
  className,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5 border-t border-border/60 py-8 md:grid-cols-[13rem_1fr] md:gap-10",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <Eyebrow>{label}</Eyebrow>
        {note && (
          <span className="type-caption font-mono text-[0.6875rem]">{note}</span>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function SpecNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-small max-w-[60ch] border-l-2 border-accent pl-5 text-text-muted">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * `sizes` for a twelve-column `EditorialGrid` inside a `content` container,
 * which is the measure every specimen is set to.
 *
 * `slotSizes` from `@/lib/images` is the production equivalent and assumes the
 * wider gallery container, so reusing it here would over-state every frame on
 * these pages by roughly a quarter. Same arithmetic, narrower box: the content
 * container is min(90vw, 1080px), and a slot of n columns with 24px gaps comes
 * to n/12 of that plus 2n − 24.
 */
export function specSlotSizes(desktop: number, mobile: number = 12): string {
  const slot = (span: number) => {
    const offset = 2 * span - 24;
    const vw = Number(((span / 12) * 90).toFixed(2));
    return {
      cap: Math.round((span / 12) * 1080 + offset),
      fluid: offset
        ? `calc(${vw}vw ${offset > 0 ? "+" : "-"} ${Math.abs(offset)}px)`
        : `${vw}vw`,
    };
  };

  const d = slot(desktop);
  return `(min-width: 75rem) ${d.cap}px, (min-width: 48rem) ${d.fluid}, ${slot(mobile).fluid}`;
}

/** The content column of a `SpecRow`: the container box less the 13rem label rail and its gap. */
export const SPEC_ROW_SIZES =
  "(min-width: 75rem) 832px, (min-width: 48rem) calc(90vw - 248px), 90vw";

/** One column of a two-up `md:grid-cols-2` with a 2rem gap. */
export const SPEC_HALF_SIZES =
  "(min-width: 75rem) 524px, (min-width: 48rem) calc(45vw - 16px), 90vw";
