import Link from "next/link";
import { Header } from "@/components/Header";

const sections = [
  { href: "/system/typography", label: "Typography" },
  { href: "/system/color", label: "Colour" },
  { href: "/system/imagery", label: "Imagery" },
  { href: "/system/motion", label: "Motion" },
  { href: "/system/components", label: "Components" },
];

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header tone="dark" />

      <main className="flex-1 pt-[var(--header-height)]">{children}</main>

      <footer className="border-t border-border">
        <nav
          aria-label="Specimens"
          className="mx-auto flex max-w-wide flex-wrap items-center gap-x-8 gap-y-3 px-gutter py-10"
        >
          <Link href="/" className="type-meta text-text">
            &larr; Index
          </Link>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="type-meta transition-opacity hover:opacity-60"
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
