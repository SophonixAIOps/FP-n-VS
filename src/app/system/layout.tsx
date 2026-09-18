import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

const sections = [
  { href: "/system/typography", label: "Typography" },
  { href: "/system/color", label: "Colour" },
  { href: "/system/imagery", label: "Imagery" },
  { href: "/system/motion", label: "Motion" },
  { href: "/system/components", label: "Components" },
  { href: "/system/layout-system", label: "Layout" },
];

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell
      surface="light"
      cta={false}
      footerNav={
        <nav
          aria-label="Specimens"
          className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end"
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
      }
    >
      {children}
    </SiteShell>
  );
}
