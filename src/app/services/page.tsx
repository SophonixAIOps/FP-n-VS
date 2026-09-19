import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { EditorialGrid, GridItem, Section } from "@/components/Layout";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";
import { EditorialButton, EditorialLink } from "@/components/EditorialLink";
import { Reveal } from "@/components/Reveal";
import {
  ServiceEntry,
  type Service,
  type ServiceLayout,
} from "@/components/ServiceEntry";
import { ServiceIndex } from "@/components/ServiceIndex";
import { images } from "@/lib/images";

/**
 * Services.
 *
 * An editorial catalogue of ways a story can be captured, not a price list and
 * not six cards. Each entry keeps the same parts — a number, a name, a short
 * description, one photograph and the medium it is made in — and changes how
 * they are arranged, so the page has a rhythm rather than a template.
 *
 * The whole thing is a server component. The only client code on the page is
 * the reveal wrappers and the image primitive, which are shared with every
 * other page; nothing here needs state, and the index is six anchors.
 */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding photography and wedding videography, event coverage, portrait and family sessions, and commercial photography — stills and film made to preserve how something felt, not only how it looked.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Services",
    description:
      "Wedding photography and wedding videography, event coverage, portrait and family sessions, and commercial photography.",
  },
};

/* -------------------------------------------------------------------------- */

/**
 * The catalogue.
 *
 * Every photograph is drawn from the existing manifest and chosen for what it
 * actually shows — celebration, movement, a room full of people, one face, a
 * group together, a dressed space. Nothing here is captioned as a commission;
 * the disclosure in the opening block says what the imagery is.
 */
const services: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    description:
      "Photography that keeps the atmosphere of the day — the people who came, the hours in between, and the moments nobody thought to arrange.",
    medium: ["Photography", "Storytelling"],
    image: images.portfolio[2],
    reveal: "maskUp",
    link: { label: "Weddings in the archive", href: "/portfolio/weddings" },
  },
  {
    slug: "wedding-videography",
    name: "Wedding Videography",
    description:
      "A film carries what a still cannot: movement, sound, the way a room changes when someone starts to speak. Cut to how the day felt rather than the order it happened in.",
    medium: ["Film", "Sound", "Motion"],
    image: images.cta,
    reveal: "clipExpand",
  },
  {
    slug: "events",
    name: "Events",
    description:
      "Parties, milestones and the gatherings that only happen once — photographed for the energy in the room and the people who filled it.",
    medium: ["Photography", "Documentary"],
    image: images.portfolio[3],
    reveal: "maskRight",
    link: { label: "Events in the archive", href: "/portfolio/events" },
  },
  {
    slug: "portraits",
    name: "Portraits",
    description:
      "Unhurried sessions, made somewhere that already means something to you, so what ends up in frame is a person rather than a pose.",
    medium: ["Photography", "Portrait Sessions"],
    image: images.portfolio[7],
    reveal: "scaleFade",
    link: { label: "Portraits in the archive", href: "/portfolio/portraits" },
  },
  {
    slug: "family",
    name: "Family",
    description:
      "Everyone together, at whatever age they happen to be right now. Ordinary afternoons photographed honestly, because those are the ones you miss later.",
    medium: ["Photography", "Family Sessions"],
    image: images.portfolio[5],
    reveal: "maskUp",
  },
  {
    slug: "commercial",
    name: "Commercial",
    description:
      "Products, spaces and the people behind them, photographed with the same attention we bring to a wedding — for brands that care how their work is seen.",
    medium: ["Photography", "Brand & Editorial"],
    image: images.details[3],
    ar: { desktop: "panorama", mobile: "wide" },
    reveal: "maskRight",
  },
];

/**
 * Composition per entry. Read down the column: frame right, then the dark film
 * band, then frame left, a small inset frame, a wide frame left, and a
 * panorama across the measure to close. No two neighbours are arranged alike.
 */
const composition: ServiceLayout[] = [
  "media-right",
  "media-below",
  "media-left",
  "media-right-inset",
  "media-left-wide",
  "media-below",
];

const [weddings, film, ...stills] = services;

/* -------------------------------------------------------------------------- */

const experience = [
  { name: "Meet", description: "We learn what matters to you." },
  {
    name: "Plan",
    description: "We shape the visual direction around your story.",
  },
  {
    name: "Create",
    description:
      "We photograph and film with intention, attention, and room for real moments.",
  },
  {
    name: "Deliver",
    description:
      "Your finished photographs and films become something you can return to.",
  },
];

/** Placed by hand so the four steps stagger rather than sit in a tidy 2×2. */
const stepPlacement = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-4 md:col-start-8 md:mt-12",
  "md:col-span-4 md:col-start-2 md:mt-24",
  "md:col-span-5 md:col-start-7 md:mt-12",
];

/* -------------------------------------------------------------------------- */

export default function ServicesPage() {
  return (
    <SiteShell activeHref="/services" cta={false}>
      {/*
       * 1 — The opening. Title across the left, the note and the disclosure
       * across the gutter: an editorial spread, not a centred hero.
       */}
      <Section space="md" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={7}>
            <Reveal trigger="mount">
              <Eyebrow rule>What We Capture</Eyebrow>
              <SectionHeading
                level="display-lg"
                as="h1"
                className="mt-7 max-w-[14ch]"
              >
                For Every Chapter Worth{" "}
                <span className="type-emphasis">Remembering</span>.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={4} start={9} offsetTop="sm">
            <Reveal trigger="mount" delay={0.12}>
              <Lead>
                Photography and film for the occasions that happen once — and
                for the ordinary days worth keeping too.
              </Lead>
              <Meta className="mt-8 block max-w-[42ch]">
                An illustrative build. The photographs are licensed via Unsplash
                and stand in for commissioned work.
              </Meta>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 2 — The contents. */}
      <Section space="none" container="wide">
        <Reveal trigger="mount" delay={0.2}>
          <ServiceIndex
            items={services}
            className="border-t border-border pt-6"
          />
        </Reveal>
      </Section>

      {/* 3 — 01 Weddings. */}
      <Section space="md" container="wide">
        <ServiceEntry service={weddings} index={0} layout={composition[0]} />
      </Section>

      {/*
       * 4 — The turn from stills to film, and the film service itself, sharing
       * one dark band. Putting them together is what makes the relationship
       * structural instead of a sentence about it: the page goes quiet and
       * dark for exactly as long as the moving work lasts, then comes back.
       */}
      <Section space="md" surface="dark" container="wide">
        <Reveal>
          <p className="type-display-md max-w-[20ch] text-balance">
            Some moments belong in a frame. Others deserve to{" "}
            <span className="type-emphasis">move</span>.
          </p>
        </Reveal>

        <div className="mt-section-sm">
          <ServiceEntry
            service={film}
            index={1}
            layout={composition[1]}
            tone="light"
          />
        </div>
      </Section>

      {/* 5 — 03 to 06, back on the ivory ground. */}
      <Section space="md" container="wide">
        {stills.map((service, index) => (
          // `space-y-section` looks like it should work and silently resolves to
          // zero — Tailwind's spacing-scale utilities take a number, not one of
          // the named --spacing-* tokens. The margin goes on the element.
          <div key={service.slug} className={index > 0 ? "mt-section" : undefined}>
            <ServiceEntry
              service={service}
              index={index + 2}
              layout={composition[index + 2]}
            />
          </div>
        ))}
      </Section>

      {/* 6 — The invitation that belongs to this page. */}
      <Section space="md" surface="muted" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={7}>
            <Reveal>
              <Eyebrow rule>Enquiries</Eyebrow>
              <SectionHeading
                level="display-md"
                as="h2"
                className="mt-7 max-w-[14ch]"
              >
                Let&rsquo;s Capture What{" "}
                <span className="type-emphasis">Matters</span>.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={4} start={9} offsetTop="sm">
            <Reveal delay={0.08}>
              <Lead>
                Tell us what you&rsquo;re planning — the date, the place, who
                will be there, and the kind of story you want to keep.
              </Lead>
            </Reveal>
          </GridItem>

          <GridItem span={12}>
            <Reveal
              delay={0.12}
              className="flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <EditorialButton href="/contact">Book a Session</EditorialButton>
              <EditorialLink href="/portfolio">View Our Work</EditorialLink>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 7 — What happens once you do. Four steps, staggered rather than tabular. */}
      <Section space="md" container="wide">
        <EditorialGrid>
          <GridItem span={6}>
            <Reveal>
              <Eyebrow rule>The Experience</Eyebrow>
              <SectionHeading level="display-md" as="h2" className="mt-6">
                Thoughtful From First Frame to Final Story.
              </SectionHeading>
            </Reveal>
          </GridItem>

          <GridItem span={12} className="mt-4 md:mt-20">
            <ol className="grid grid-cols-12 gap-x-6 gap-y-12">
              {experience.map((step, index) => (
                <li
                  key={step.name}
                  className={`col-span-12 ${stepPlacement[index]}`}
                >
                  <Reveal delay={index * 0.05}>
                    <div className="border-t border-border pt-6">
                      <Meta className="tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </Meta>
                      <h3 className="type-h2 mt-5">{step.name}</h3>
                      <p className="type-body mt-4 max-w-[36ch] text-text-muted">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </GridItem>
        </EditorialGrid>
      </Section>

      {/* 8 — The site's closing invitation, in the established wording. */}
      <Section space="lg" surface="dark" container="wide">
        <EditorialGrid className="gap-y-10">
          <GridItem span={8}>
            <Reveal>
              <Eyebrow tone="light" rule>
                Commissions
              </Eyebrow>
              <h2 className="type-display-md mt-7 max-w-[15ch]">
                Your Story Is Happening Now. Let&rsquo;s{" "}
                <span className="type-emphasis">Capture</span> It.
              </h2>
            </Reveal>
          </GridItem>

          <GridItem span={10}>
            <Reveal
              delay={0.1}
              className="flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <EditorialButton href="/contact" tone="light">
                Book a Session
              </EditorialButton>
              <EditorialLink href="/portfolio" tone="light">
                View Our Work
              </EditorialLink>
            </Reveal>
          </GridItem>
        </EditorialGrid>
      </Section>
    </SiteShell>
  );
}
