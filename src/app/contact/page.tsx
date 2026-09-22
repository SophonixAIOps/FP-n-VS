import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Section, SplitLayout } from "@/components/Layout";
import { Eyebrow, Lead, SectionHeading } from "@/components/Typography";
import { EditorialButton, EditorialLink } from "@/components/EditorialLink";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";
import { images } from "@/lib/images";
import { STUDIO_EMAIL } from "@/lib/studio";

/**
 * The inquiry page.
 *
 * A private note rather than a contact form: the left column says who is being
 * written to and the right column is where you write. The form carries no
 * container of its own — no card, no panel, no shadow — so it reads as part of
 * the page rather than a widget dropped onto it.
 *
 * The footer invitation is dropped here. It links to this page, and a page
 * cannot usefully invite you to itself.
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your story — weddings, events, portraits and brand work. Write to Frame & Story Studio and we will take it from there.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Tell us about your story — weddings, events, portraits and brand work.",
  },
};

/**
 * Reading `searchParams` opts this route into dynamic rendering, which is the
 * price of the catalogue being able to preselect a service. It buys a
 * preselection that is present in the server-rendered HTML — so it survives
 * JavaScript being off, needs no Suspense boundary, and never flashes a
 * fallback in place of the form. There is no data behind this page, so the
 * render itself costs nothing.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const requested = (await searchParams).service;

  return (
    <SiteShell activeHref="/contact" cta={false}>
      <Section space="lg">
        <SplitLayout
          ratio="even"
          gap="lg"
          primary={
            <div>
              <header>
                <Eyebrow rule>Let&rsquo;s begin</Eyebrow>
                <SectionHeading level="display-lg" as="h1" className="mt-6 max-w-[14ch]">
                  Tell Us About Your Story.
                </SectionHeading>
                <Lead className="mt-8">
                  A wedding, an evening worth keeping, a portrait long overdue,
                  a brand that deserves better pictures — whatever it is, start
                  by telling us about it in your own words.
                </Lead>
              </header>

              <Reveal className="mt-14 lg:mt-20">
                <EditorialImage
                  image={images.details[2]}
                  size="offset"
                  reveal="maskUp"
                />
              </Reveal>
            </div>
          }
          secondary={
            // The header would otherwise sit over the top of the form when the
            // closing button brings you back up to it.
            <div
              id="inquiry"
              className="scroll-mt-[calc(var(--header-height)+2rem)] lg:pt-2"
            >
              <InquiryForm
                service={typeof requested === "string" ? requested : undefined}
              />
            </div>
          }
        />
      </Section>

      <Section surface="muted" space="md">
        <SplitLayout
          ratio="even"
          gap="lg"
          primary={
            <div>
              <Eyebrow rule>What happens next</Eyebrow>
              <p className="type-body-lg mt-7 max-w-[40ch] text-pretty">
                You write, we read it properly, and we reply with whatever we
                still need to understand — the date, the place, who will be
                there. Everything after that is a conversation rather than a
                form. We take on a small number of stories at a time, so nothing
                is settled until it is clearly right for both of us.
              </p>
            </div>
          }
          secondary={
            <div>
              <Eyebrow rule>Write to us directly</Eyebrow>
              <p className="type-h3 mt-7 font-display">
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="underline decoration-1 underline-offset-8 transition-opacity duration-(--duration-fast) ease-editorial hover:opacity-70"
                >
                  {STUDIO_EMAIL}
                </a>
              </p>
              <p className="type-helper mt-6 max-w-[40ch]">
                Frame &amp; Story Studio is a fictional studio built for this
                demonstration, so there is no telephone and no address to list.
                The email above opens in your own mail app.
              </p>
            </div>
          }
        />
      </Section>

      <Section space="md" container="narrow">
        <Reveal>
          <SectionHeading level="display-md" as="h2" className="max-w-[20ch]">
            The best stories usually begin with a{" "}
            <span className="type-emphasis">simple</span> conversation.
          </SectionHeading>

          {/*
           * The button goes back up to the form; the link is the way out for
           * anyone who arrived here before they were ready to write.
           */}
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <EditorialButton href="#inquiry">
              Start a Conversation
            </EditorialButton>
            <EditorialLink href="/portfolio">View Our Work</EditorialLink>
          </div>
        </Reveal>
      </Section>
    </SiteShell>
  );
}
