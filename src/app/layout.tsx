import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Cursor } from "@/components/Cursor";
import { JsonLd } from "@/components/JsonLd";
import { studioGraph } from "@/lib/schema";
import { SITE_URL, STUDIO_NAME } from "@/lib/studio";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Only what is true of every route. The brand suffix lives in `template`, so
 * no page writes the studio name into its own title.
 *
 * Open Graph, Twitter and canonicals are deliberately *not* here: they are
 * per-page by nature, and a parent value would be wholly replaced rather than
 * merged the moment a page set its own. `pageMetadata` composes them instead.
 * Anything without a canonical — the specimen pages — is better off with none
 * than with an inherited one pointing at the homepage.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STUDIO_NAME} | Photography & Cinematic Films`,
    template: `%s | ${STUDIO_NAME}`,
  },
  description:
    "Frame & Story Studio creates authentic photography and cinematic films for weddings, events, portraits, families and brands.",
  applicationName: STUDIO_NAME,
  /*
   * Only the preview hints. `index: true` is the default and stating it here
   * caused real harm: the not-found page adds its own `noindex`, and a page
   * carrying both directives is a page arguing with itself. A `googleBot`
   * block made it worse — a crawler-specific tag outranks the generic one, so
   * the 404 was telling Googlebot to index it.
   *
   * These two are on the generic tag rather than a Google-only one because
   * every crawler that honours them should see them. Large image previews are
   * the point on a site that is mostly photographs.
   */
  robots: {
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
         * The studio and the site it publishes, on every route. Pages that can
         * say something more specific — the services catalogue — add a second
         * block of their own that points back at the studio by `@id`.
         */}
        <JsonLd graph={studioGraph()} />
        {/*
         * Motion serialises every `initial` state as an inline style, so without
         * JS the entry veil never retracts and the page renders blank. These
         * overrides land the content in its resting state instead.
         */}
        <noscript>
          <style>{`
            [data-reveal],[data-drift],[data-page-enter]{
              opacity:1!important;transform:none!important;clip-path:none!important;
            }
            [data-page-veil]{display:none!important}
          `}</style>
        </noscript>
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
