import type { Metadata } from "next";
import { SpecSection, SpecRow, SpecNote } from "@/components/specimen/Spec";
import { Eyebrow, Lead, Meta, SectionHeading } from "@/components/Typography";
import { Wordmark } from "@/components/Wordmark";
import { EditorialLink, EditorialButton } from "@/components/EditorialLink";
import { MagneticButton } from "@/components/MagneticButton";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-content px-gutter py-section-sm">
      <header className="mb-20">
        <Eyebrow rule>Specimen 05</Eyebrow>
        <SectionHeading level="display-lg" as="h1" className="mt-6">
          Components.
        </SectionHeading>
        <Lead className="mt-8">
          Square corners, thin rules, small type. The interface is a frame around
          the photography — if a control is drawing attention on its own, it is
          wrong.
        </Lead>
      </header>

      <SpecSection
        number="01"
        title="Wordmark"
        description="Typographic only. The italic ampersand is the entire identity — no mark, no monogram, no rule."
      >
        <SpecRow label="On light" note="tone=dark">
          <div className="flex flex-wrap items-end gap-12 bg-bg py-4">
            <Wordmark size="sm" tone="dark" />
            <Wordmark size="md" tone="dark" />
            <Wordmark size="lg" tone="dark" />
          </div>
        </SpecRow>

        <SpecRow label="On dark" note="tone=light">
          <div className="flex flex-wrap items-end gap-12 bg-bg-dark p-8">
            <Wordmark size="sm" tone="light" />
            <Wordmark size="md" tone="light" />
            <Wordmark size="lg" tone="light" />
          </div>
        </SpecRow>

        <SpecRow label="Over photography" note="tone=light + scrim">
          <div className="relative overflow-hidden bg-ink-900">
            <img
              src={`https://images.unsplash.com/${images.hero.id}?auto=format&fit=crop&ar=21%3A9&crop=entropy&w=1280&q=74`}
              alt=""
              className="aspect-panorama w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-ink-900/15"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Wordmark size="lg" tone="light" withDescender className="items-center" />
            </div>
          </div>
          <p className="type-caption mt-3">
            A scrim is mandatory over photography. Legibility never depends on
            which image happens to load.
          </p>
        </SpecRow>

        <SpecRow label="With descender" note="footer, inquiry">
          <Wordmark size="md" tone="dark" withDescender />
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="02"
        title="Links"
        description="An underline that wipes in and an arrow that nudges. Both at once give the link direction."
      >
        <SpecRow label="Editorial link" note="hover to see">
          <div className="flex flex-wrap gap-10">
            <EditorialLink href="/system/imagery">View our work</EditorialLink>
            <EditorialLink href="/system/typography" arrow={false}>
              Read the spec
            </EditorialLink>
          </div>
        </SpecRow>

        <SpecRow label="On dark" note="tone=light">
          <div className="bg-bg-dark p-8">
            <EditorialLink href="/system/color" tone="light">
              View our work
            </EditorialLink>
          </div>
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="03"
        title="Buttons"
        description="Three variants, two tones. Square-cornered by design — rounded pills read as SaaS UI."
      >
        <SpecRow label="Variants" note="solid · outline · ghost">
          <div className="flex flex-wrap items-center gap-5">
            <EditorialButton href="/">Begin an inquiry</EditorialButton>
            <EditorialButton href="/" variant="outline">
              See the work
            </EditorialButton>
            <EditorialButton href="/" variant="ghost">
              Learn more
            </EditorialButton>
          </div>
        </SpecRow>

        <SpecRow label="On dark" note="tone=light">
          <div className="flex flex-wrap items-center gap-5 bg-bg-dark p-8">
            <EditorialButton href="/" tone="light">
              Begin an inquiry
            </EditorialButton>
            <EditorialButton href="/" tone="light" variant="outline">
              See the work
            </EditorialButton>
            <EditorialButton href="/" tone="light" variant="ghost">
              Learn more
            </EditorialButton>
          </div>
        </SpecRow>

        <SpecRow label="States" note="idle → loading → success → error">
          <div className="flex flex-wrap items-center gap-5">
            <EditorialButton>Send</EditorialButton>
            <EditorialButton state="loading">Send</EditorialButton>
            <EditorialButton state="success">Send</EditorialButton>
            <EditorialButton state="error">Send</EditorialButton>
            <EditorialButton disabled>Send</EditorialButton>
          </div>
          <p className="type-caption mt-4">
            Loading, success and error swap the label as well as the treatment —
            colour alone is never the only signal.
          </p>
        </SpecRow>

        <SpecRow label="Magnetic" note="desktop pointer only">
          <MagneticButton>Inquire &rarr;</MagneticButton>
          <p className="type-caption mt-4">
            Leans toward the pointer at a quarter of the offset. Inert on touch,
            off entirely under reduced motion. If you can clearly see it move, it
            is turned up too high.
          </p>
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="04"
        title="Focus"
        description="Tab through this page. Every interactive element takes the same visible ring."
      >
        <SpecRow label="Focus ring" note="2px accent · 3px offset">
          <div className="flex flex-wrap items-center gap-6">
            <EditorialButton>Focus me</EditorialButton>
            <EditorialLink href="/">And me</EditorialLink>
            <button
              type="button"
              className="type-nav border border-border-strong px-5 py-3"
            >
              And me
            </button>
          </div>
        </SpecRow>

        <div className="mt-10">
          <SpecNote>
            Applied via <code className="font-mono">:focus-visible</code>, so it
            appears for keyboard users and stays out of the way for pointer
            users. It is never removed — including on the portfolio frames, where
            tabbing to a project triggers the same overlay that hovering does.
          </SpecNote>
        </div>
      </SpecSection>

      <SpecSection
        number="05"
        title="Header"
        description="Fixed at the top of this page. Scroll to watch it settle from transparent into the ivory bar."
      >
        <ul className="type-small grid gap-2 text-text-muted">
          {[
            "Transparent with no border over a hero, so photography runs to the top edge",
            "Past 24px it takes an ivory background, a hairline border and a 2px blur",
            "Text resolves to dark once settled — contrast never depends on the image behind it",
            "Nav links sit at 65% opacity and come up to full on hover, with a rule that wipes in",
            "The active route holds its rule open permanently",
            "Below md the links collapse into the Menu trigger",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SpecSection>

      <SpecSection
        number="06"
        title="Mobile menu"
        description="Narrow the window below 768px and open Menu. Not a dropdown — a full editorial overlay."
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-bg p-7">
            <Eyebrow>Motion</Eyebrow>
            <ul className="type-small mt-5 grid gap-2 text-text-muted">
              {[
                "Panel wipes up over the page via clip-path, 720ms",
                "Links rise in sequence, 70ms apart, at Display M scale",
                "Dismiss wipes back down at 420ms",
                "Both collapse to a plain fade under reduced motion",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-bg p-7">
            <Eyebrow>Accessibility</Eyebrow>
            <ul className="type-small mt-5 grid gap-2 text-text-muted">
              {[
                "role=dialog with aria-modal and a label",
                "Focus moves to Close on open, back to the trigger on dismiss",
                "Tab is trapped within the panel",
                "Escape dismisses; background scroll is locked",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        number="07"
        title="Cursor"
        description="Desktop only. Move over a portfolio frame on the Imagery specimen, or the inquiry button above."
      >
        <SpecRow label="States" note="dot → labelled disc">
          <div className="flex flex-wrap items-center gap-4">
            {["view", "play", "inquire"].map((label) => (
              <span
                key={label}
                className="type-eyebrow flex h-[76px] w-[76px] items-center justify-center rounded-pill border border-border-strong"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="type-caption mt-4">
            8px dot at rest, 76px labelled disc over anything carrying{" "}
            <code className="font-mono">data-cursor</code>. Mounts only for fine
            pointers that can hover, and never under reduced motion — touch users
            keep the native cursor untouched.
          </p>
        </SpecRow>
      </SpecSection>

      <SpecSection
        number="08"
        title="Metadata rail"
        description="The caption pattern used beneath every framed image."
      >
        <div className="flex items-baseline justify-between gap-6 border-t border-border pt-3">
          <Meta className="text-text">Evening Walk</Meta>
          <Meta>Cascais, Portugal · 2024</Meta>
        </div>
      </SpecSection>
    </div>
  );
}
