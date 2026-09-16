import type { Metadata } from "next";
import { SpecSection, SpecRow, SpecNote } from "@/components/specimen/Spec";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";

export const metadata: Metadata = { title: "Typography" };

const displaySteps = [
  { cls: "type-display-xl", name: "Display XL", token: "clamp(3.25rem → 10.5rem)", use: "Hero only. One per page." },
  { cls: "type-display-lg", name: "Display L", token: "clamp(2.75rem → 7rem)", use: "Section openers, closing statement." },
  { cls: "type-display-md", name: "Display M", token: "clamp(2.25rem → 4.5rem)", use: "Mobile menu links, pull quotes." },
  { cls: "type-h1", name: "H1", token: "clamp(2rem → 3.5rem)", use: "Page title below the hero." },
  { cls: "type-h2", name: "H2", token: "clamp(1.75rem → 2.625rem)", use: "Standard section heading." },
  { cls: "type-h3", name: "H3", token: "clamp(1.31rem → 1.75rem)", use: "Project titles, service names." },
];

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-content px-gutter py-section-sm">
      <header className="mb-20">
        <Eyebrow rule>Specimen 01</Eyebrow>
        <SectionHeading level="display-lg" as="h1" className="mt-6">
          Typography.
        </SectionHeading>
        <Lead className="mt-8">
          Instrument Serif carries the emotion. Inter carries the information.
          Two families, one weight each — the hierarchy comes from scale, not
          from adding fonts.
        </Lead>
      </header>

      <SpecSection
        number="01"
        title="The pairing"
        description="A high-contrast modern serif against a neutral grotesque. The serif is never used below H3; the sans is never used above it."
      >
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          <div className="bg-bg p-8 md:p-12">
            <Meta>Display · Instrument Serif · 400</Meta>
            <p className="type-display-md mt-6 font-display">
              Aa Bb Cc
            </p>
            <p className="type-h3 mt-6 font-display text-text-muted">
              ABCDEFGHIJKLM
              <br />
              abcdefghijklm 0123456789
            </p>
            <p className="type-small mt-8 text-text-muted">
              Tight apertures and high stroke contrast. Reads contemporary and
              gallery-like rather than traditionally bridal.
            </p>
          </div>

          <div className="bg-bg p-8 md:p-12">
            <Meta>Interface · Inter · 400 / 500</Meta>
            <p className="mt-6 text-[3rem] leading-none">Aa Bb Cc</p>
            <p className="type-h3 mt-6 font-sans text-text-muted">
              ABCDEFGHIJKLM
              <br />
              abcdefghijklm 0123456789
            </p>
            <p className="type-small mt-8 text-text-muted">
              Deliberately invisible. Holds up at 11px with wide tracking, which
              is where most of the interface lives.
            </p>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        number="02"
        title="Display scale"
        description="Fluid across the viewport. Headlines are compositional elements — at the top of the scale they are meant to be looked at before they are read."
      >
        {displaySteps.map((step) => (
          <SpecRow key={step.name} label={step.name} note={step.token}>
            <p className={`${step.cls} text-balance`}>
              Stories worth remembering
            </p>
            <p className="type-caption mt-4">{step.use}</p>
          </SpecRow>
        ))}
      </SpecSection>

      <SpecSection
        number="03"
        title="Text and interface"
        description="Everything below H3. Kept small, quiet and tightly tracked so it never argues with the photography."
      >
        <SpecRow label="Body Large" note="clamp(1.06rem → 1.25rem) / 1.62">
          <p className="type-body-lg max-w-[46ch]">
            We photograph the parts of a day that are easy to miss. The hand on a
            shoulder, the look across a room, the light going soft at the end.
          </p>
        </SpecRow>

        <SpecRow label="Body" note="1rem / 1.68">
          <p className="type-body max-w-[62ch]">
            The standard reading size. Measure is capped around 62 characters —
            beyond that the eye loses the line, and on a site this wide it is
            easy to let a paragraph run far too far.
          </p>
        </SpecRow>

        <SpecRow label="Small" note="0.875rem / 1.6">
          <p className="type-small max-w-[62ch]">
            Secondary information, form help text, footnotes.
          </p>
        </SpecRow>

        <SpecRow label="Caption" note="0.8125rem · muted">
          <p className="type-caption">Umbria, Italy — September</p>
        </SpecRow>

        <SpecRow label="Eyebrow" note="0.6875rem · 0.22em · upper">
          <div className="flex flex-col gap-4">
            <Eyebrow>Selected Work</Eyebrow>
            <Eyebrow rule>Selected Work</Eyebrow>
          </div>
        </SpecRow>

        <SpecRow label="Navigation" note="0.8125rem · 0.14em · upper">
          <span className="type-nav">Work · Services · Studio · Contact</span>
        </SpecRow>

        <SpecRow label="Metadata" note="0.75rem · 0.08em · upper">
          <Meta>01 · Cascais, Portugal · 2024</Meta>
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="04"
        title="Editorial setting"
        description="How the scale behaves in composition rather than in a list."
      >
        <div className="border border-border bg-surface p-8 md:p-16">
          <Eyebrow rule>Chapter One</Eyebrow>
          <h2 className="type-display-lg mt-8 max-w-[13ch] text-balance">
            The light was going and nobody{" "}
            <span className="type-emphasis">moved</span>.
          </h2>
          <p className="type-body-lg mt-10 max-w-[42ch] text-text-muted text-pretty">
            Forty minutes before sunset, in a courtyard outside Perugia, with
            eighty people holding their breath.
          </p>
          <div className="mt-12 flex items-baseline gap-6 border-t border-border-strong pt-5">
            <Meta className="text-text">Last Light</Meta>
            <Meta>Umbria, Italy · 2024</Meta>
          </div>
        </div>

        <div className="mt-10">
          <SpecNote>
            The italic is the one permitted flourish — a single emphasised word
            inside a headline. Never a whole line, never a paragraph, never the
            interface face.
          </SpecNote>
        </div>
      </SpecSection>

      <SpecSection
        number="05"
        title="Rules"
        description="What keeps the system from drifting once pages start getting built."
      >
        <ul className="grid gap-px border border-border bg-border md:grid-cols-2">
          {[
            ["One Display XL per page", "It stops being a hero if it repeats."],
            ["Never set the serif below H3", "It gets fragile and starts to look like a wedding invitation."],
            ["Cap the measure at ~62ch", "Body copy that runs the full width reads as a document, not an edition."],
            ["Two weights, maximum", "Regular and medium. Bold display type competes with the photography."],
            ["Tracking opens as size drops", "Small caps-style labels need air; headlines need none."],
            ["Use text-balance on headlines", "Stops a stray single word dropping to its own line."],
          ].map(([rule, why]) => (
            <li key={rule} className="bg-bg p-7">
              <p className="type-small font-medium text-text">{rule}</p>
              <p className="type-small mt-2 text-text-muted">{why}</p>
            </li>
          ))}
        </ul>
      </SpecSection>
    </div>
  );
}
