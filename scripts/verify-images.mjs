// Dev utility: checks that every candidate Unsplash photo ID resolves.
// Run with: node scripts/verify-images.mjs
const ids = process.argv.slice(2);

const results = await Promise.all(
  ids.map(async (id) => {
    const url = `https://images.unsplash.com/${id}?w=200&q=60`;
    try {
      const res = await fetch(url, { method: "GET" });
      return { id, ok: res.ok, status: res.status };
    } catch (e) {
      return { id, ok: false, status: String(e.message ?? e) };
    }
  })
);

for (const r of results) {
  console.log(`${r.ok ? "OK  " : "FAIL"} ${r.status}  ${r.id}`);
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} valid`);
