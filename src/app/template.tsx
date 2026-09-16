import { PageTransition } from "@/components/PageTransition";

/**
 * `template.tsx` remounts on every navigation, which is what drives the route
 * transition. A `layout.tsx` would persist and never re-fire.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
