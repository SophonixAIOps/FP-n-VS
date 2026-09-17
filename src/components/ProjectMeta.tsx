import { cn } from "@/lib/cn";
import { Meta, SectionHeading } from "./Typography";
import { EditorialLink } from "./EditorialLink";

/**
 * The information rail that accompanies a piece of work.
 *
 * Every field is optional and nothing is invented to fill a gap — an empty
 * location simply collapses. Category, location and date are joined into a
 * single credit line so the block stays quiet next to the photograph.
 */

export type ProjectMetaProps = {
  title: string;
  category?: string;
  location?: string;
  date?: string;
  description?: string;
  href?: string;
  /** Sets the type against a dark ground. */
  tone?: "dark" | "light";
  /** Visual size of the title. */
  level?: "h3" | "h2" | "display-md";
  className?: string;
};

export function ProjectMeta({
  title,
  category,
  location,
  date,
  description,
  href,
  tone = "dark",
  level = "h3",
  className,
}: ProjectMetaProps) {
  const credit = [category, location, date].filter(Boolean).join(" · ");
  const light = tone === "light";

  return (
    <div
      className={cn(
        "border-t pt-4",
        light ? "border-border-inverse" : "border-border",
        className
      )}
    >
      <SectionHeading
        level={level}
        as="h3"
        className={light ? "text-text-inverse" : undefined}
      >
        {title}
      </SectionHeading>

      {credit && (
        <Meta className={cn("mt-3 block", light && "text-text-inverse-muted")}>
          {credit}
        </Meta>
      )}

      {description && (
        <p
          className={cn(
            "type-small mt-4 max-w-[46ch] text-pretty",
            light ? "text-text-inverse-muted" : "text-text-muted"
          )}
        >
          {description}
        </p>
      )}

      {href && (
        <EditorialLink href={href} tone={tone} className="mt-6">
          View project
        </EditorialLink>
      )}
    </div>
  );
}
