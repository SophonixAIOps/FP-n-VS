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
