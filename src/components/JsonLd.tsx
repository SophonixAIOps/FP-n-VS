/**
 * A JSON-LD block.
 *
 * A plain `<script>` rather than anything from `next/script`: this is data, not
 * behaviour. It ships no client JavaScript, is never parsed or executed by the
 * browser, and is written into the server-rendered HTML where a crawler reads
 * it without running anything.
 *
 * `<` is escaped because a name or description could one day contain one, and a
 * raw `</script>` inside the payload would close this tag early and turn the
 * rest of the graph into markup.
 */
export function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
