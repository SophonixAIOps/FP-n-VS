import type { Metadata } from "next";
import { SpecSection, SpecRow, SpecNote } from "@/components/specimen/Spec";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";
import { EditorialImage } from "@/components/EditorialImage";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Colour" };

/** The wide half of the closing `md:grid-cols-[1.2fr_1fr]` plate. */
const COLOUR_PLATE_SIZES =
  "(min-width: 75rem) 589px, (min-width: 48rem) 49vw, 90vw";

/**
 * Contrast figures are measured, not estimated — recompute if any value moves.
 * Every pairing used for text clears WCAG AA; `border-strong` clears 1.4.11 for
 * non-text UI boundaries.
 */

const semantic = [
  { token: "--color-bg", hex: "#FAF8F5", name: "Background", note: "Warm soft white. The default page." },
  { token: "--color-surface", hex: "#F1ECE4", name: "Surface", note: "Recessed panels, image placeholders." },
  { token: "--color-bg-dark", hex: "#14110F", name: "Background Dark", note: "Inverted sections, the mobile menu." },
  { token: "--color-text", hex: "#14110F", name: "Text", note: "17.74:1 on background." },
  { token: "--color-text-muted", hex: "#6E655C", name: "Text Muted", note: "5.38:1 on background." },
  { token: "--color-text-inverse", hex: "#FAF8F5", name: "Text Inverse", note: "17.74:1 on dark." },
  { token: "--color-text-inverse-muted", hex: "#A79D92", name: "Text Inverse Muted", note: "7.06:1 on dark." },
  { token: "--color-border", hex: "#DED7CC", name: "Border", note: "Decorative rules only." },
  { token: "--color-border-strong", hex: "#8A8178", name: "Border Strong", note: "3.61:1 — UI boundaries." },
  { token: "--color-accent", hex: "#8A6A47", name: "Accent", note: "4.68:1. Focus rings and small marks." },
];

const state = [
  { token: "--color-success", hex: "#4A6250", name: "Success", note: "6.28:1 on background." },
  { token: "--color-error", hex: "#8C4A3F", name: "Error", note: "6.26:1 on background." },
];

function Swatch({
  hex,
  name,
  token,
  note,
}: {
  hex: string;
  name: string;
  token: string;
  note: string;
}) {
  return (
    <div className="bg-bg">
      <div
        className="h-28 w-full border-b border-border"
        style={{ backgroundColor: hex }}
      />
      <div className="p-5">
        <p className="type-small font-medium text-text">{name}</p>
        <p className="type-caption mt-1 font-mono text-[0.6875rem]">{hex}</p>
        <p className="type-caption font-mono text-[0.6875rem] opacity-70">
          {token}
        </p>
        <p className="type-caption mt-2">{note}</p>
      </div>
    </div>
  );
}

export default function ColorPage() {
  return (
    <div className="mx-auto max-w-content px-gutter py-section-sm">
      <header className="mb-20">
        <Eyebrow rule>Specimen 02</Eyebrow>
        <SectionHeading level="display-lg" as="h1" className="mt-6">
          Colour.
        </SectionHeading>
        <Lead className="mt-8">
          A warm darkroom neutral. No pure black, no pure white — every value
          carries a little warmth so photographs sit inside the page rather than
          on top of it.
        </Lead>
      </header>

      <SpecSection
        number="01"
        title="Semantic tokens"
        description="What components consume. Never reach past these to a raw ramp value."
      >
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {semantic.map((swatch) => (
            <Swatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </SpecSection>

      <SpecSection
        number="02"
        title="State"
        description="Used only in forms. There is no colourful UI anywhere else on this site."
      >
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {state.map((swatch) => (
            <Swatch key={swatch.token} {...swatch} />
          ))}
        </div>
      </SpecSection>

      <SpecSection
        number="03"
        title="In use"
        description="The palette only makes sense next to a photograph. Here it is doing its actual job."
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-bg p-8 md:p-12">
            <Eyebrow rule>Light</Eyebrow>
            <h3 className="type-h1 mt-6 font-display">
              The light was going.
            </h3>
            <p className="type-body mt-5 max-w-[38ch] text-text-muted">
              Warm ivory ground, near-black text, a muted stone for anything
              secondary.
            </p>
            <div className="mt-8 flex items-baseline gap-5 border-t border-border pt-4">
              <Meta className="text-text">Last Light</Meta>
              <Meta>Umbria · 2024</Meta>
            </div>
          </div>

          <div className="bg-bg-dark p-8 md:p-12">
            <Eyebrow rule tone="light">
              Dark
            </Eyebrow>
            <h3 className="type-h1 mt-6 font-display text-text-inverse">
              And nobody moved.
            </h3>
            <p className="type-body mt-5 max-w-[38ch] text-text-inverse-muted">
              Inverted for full-bleed sections and the mobile menu. Same
              hierarchy, same restraint.
            </p>
            <div className="mt-8 flex items-baseline gap-5 border-t border-border-inverse pt-4">
              <Meta className="text-text-inverse">The Long Veil</Meta>
              <Meta className="text-text-inverse-muted">Wales · 2024</Meta>
            </div>
          </div>
        </div>

        <div className="mt-px grid gap-px border-x border-b border-border bg-border md:grid-cols-[1.2fr_1fr]">
          <div className="bg-bg">
            <EditorialImage
              image={images.hero}
              sizes={COLOUR_PLATE_SIZES}
              reveal="scaleFade"
              ar={{ desktop: "wide", mobile: "wide" }}
            />
          </div>
          <div className="flex flex-col justify-center bg-surface p-8 md:p-12">
            <p className="type-body-lg text-pretty text-text">
              The photograph brings the colour. The interface brings none.
            </p>
            <p className="type-small mt-5 text-text-muted">
              This is the whole principle. If a page looks flat with the images
              removed, that is correct.
            </p>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        number="04"
        title="Prohibited"
        description="Explicitly out of bounds, regardless of how well it might work elsewhere."
      >
        <SpecRow label="Never use" note="no exceptions">
          <ul className="type-small grid gap-2 text-text-muted sm:grid-cols-2">
            {[
              "Neon or fluorescent values",
              "Bright multi-stop gradients",
              "SaaS blue, indigo or violet",
              "Purple-to-pink AI gradients",
              "Heavy gold or metallic effects",
              "Vibrant multi-colour systems",
              "Pure #000 or pure #FFF",
              "Colour used to signal hierarchy",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-error">
                  &times;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SpecRow>

        <div className="mt-10">
          <SpecNote>
            Hierarchy is built from scale, weight and whitespace — never from
            colour. The accent exists for focus rings and the occasional small
            mark, and that is the extent of it.
          </SpecNote>
        </div>
      </SpecSection>
    </div>
  );
}
