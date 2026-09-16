import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The site's link and button language.
 *
 * Micro-interactions only: a rule that draws itself, an arrow that shifts a
 * few pixels. Nothing scales, bounces or changes colour dramatically. All of it
 * is CSS transition, so it costs nothing and degrades to a plain state under
 * reduced motion.
 */

type Tone = "dark" | "light";

/* -------------------------------------------------------------------------- */

type EditorialLinkProps = {
  children: React.ReactNode;
  href: string;
  /** Appends a trailing arrow that moves on hover. */
  arrow?: boolean;
  tone?: Tone;
  className?: string;
};

/**
 * Inline text link. The underline wipes in from the left on hover and the
 * arrow nudges right — the two together give it direction.
 */
export function EditorialLink({
  children,
  href,
  arrow = true,
  tone = "dark",
  className,
}: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link type-nav inline-flex items-center gap-2",
        "transition-opacity duration-[var(--duration-fast)] ease-editorial",
        "hover:opacity-70",
        tone === "light" ? "text-text-inverse" : "text-text",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current",
            "transition-transform duration-[var(--duration-standard)] ease-editorial",
            "group-hover/link:scale-x-100"
          )}
        />
      </span>

      {arrow && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block translate-x-0",
            "transition-transform duration-[var(--duration-standard)] ease-editorial",
            "group-hover/link:translate-x-1"
          )}
        >
          &rarr;
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonState = "idle" | "loading" | "success" | "error";

type EditorialButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  tone?: Tone;
  state?: ButtonState;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

const variantClasses: Record<ButtonVariant, Record<Tone, string>> = {
  solid: {
    dark: "bg-ink-900 text-text-inverse hover:bg-ink-700",
    light: "bg-ivory-100 text-text hover:bg-ivory-200",
  },
  outline: {
    dark: "border border-border-strong text-text hover:border-ink-900",
    light: "border border-border-inverse text-text-inverse hover:border-ivory-100",
  },
  ghost: {
    dark: "text-text hover:opacity-70",
    light: "text-text-inverse hover:opacity-70",
  },
};

/**
 * Primary action. Square-cornered by design — rounded pills read as SaaS UI.
 * Covers the full interaction state set: hover, focus, active, disabled,
 * loading, success and error.
 */
export function EditorialButton({
  children,
  href,
  variant = "solid",
  tone = "dark",
  state = "idle",
  disabled = false,
  type = "button",
  onClick,
  className,
}: EditorialButtonProps) {
  const isBusy = state === "loading";
  const isDisabled = disabled || isBusy;

  const classes = cn(
    "group/btn type-nav inline-flex items-center justify-center gap-3",
    "px-7 py-4 rounded-none select-none",
    "transition-all duration-[var(--duration-standard)] ease-editorial",
    "active:translate-y-px",
    variantClasses[variant][tone],
    state === "success" && "bg-success text-text-inverse",
    state === "error" && "bg-error text-text-inverse",
    isDisabled && "pointer-events-none opacity-40",
    className
  );

  const content = (
    <>
      <span>
        {state === "loading"
          ? "Sending"
          : state === "success"
            ? "Received"
            : state === "error"
              ? "Try again"
              : children}
      </span>

      {isBusy ? (
        <span
          aria-hidden="true"
          className="inline-block h-1 w-1 animate-pulse rounded-pill bg-current"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-[var(--duration-standard)] ease-editorial group-hover/btn:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} data-cursor="inquire">
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isBusy}
      className={classes}
    >
      {content}
    </button>
  );
}
