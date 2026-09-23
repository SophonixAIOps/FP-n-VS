import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/Layout";
import { Eyebrow, Lead, SectionHeading } from "@/components/Typography";
import { EditorialButton, EditorialLink } from "@/components/EditorialLink";

/**
 * Not found.
 *
 * Built from the same parts as every other page — the shell, a section, an
 * eyebrow, a display heading — so arriving here reads as a wrong turn inside
 * the studio rather than a fall out of it.
 *
 * Nothing on this page is wrapped in `Reveal`. Everywhere else a reveal is
 * part of how the work is presented; here it would mean waiting to be told
 * where to go next, which is the one thing someone who mistyped a URL should
 * not have to do.
 *
 * The footer's invitation band is suppressed for the same reason the contact
 * page suppresses it: the three routes below are already the offer, and making
 * it twice on a page of four links would be the only loud thing here.
 */
export default function NotFound() {
  return (
    <SiteShell cta={false}>
      <Section space="lg" container="narrow">
        <Eyebrow rule>Error 404</Eyebrow>

        <SectionHeading level="display-lg" as="h1" className="mt-6 max-w-[16ch]">
          This frame doesn&rsquo;t exist.
        </SectionHeading>

        <Lead className="mt-8">
          The page you were looking for has moved, or the address has a
          character out of place. Let&rsquo;s get you back to the story.
        </Lead>

        {/*
         * Two rows rather than one wrapping row: all three fit on a line only
         * above ~1500px, so a single row reads as an accident at every width
         * anyone actually uses. The button takes the line it is on.
         */}
        <div className="mt-12">
          <EditorialButton href="/">Back to the Homepage</EditorialButton>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
            <EditorialLink href="/portfolio">View Our Work</EditorialLink>
            <EditorialLink href="/services">Explore Services</EditorialLink>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
