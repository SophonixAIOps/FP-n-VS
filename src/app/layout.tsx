import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Cursor } from "@/components/Cursor";
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

export const metadata: Metadata = {
  title: {
    default: "Frame & Story Studio",
    template: "%s — Frame & Story Studio",
  },
  description:
    "Photography and film for people who want to remember how it felt, not just how it looked.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
