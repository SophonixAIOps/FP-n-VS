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
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
