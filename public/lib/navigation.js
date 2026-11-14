export function filterNavEntries(entries, query, aliases = {}) {
  const needle = String(query || '')
    .trim()
    .toLowerCase();
  if (!needle) return entries;
  return entries.filter(([name, label]) =>
    [name, label, aliases[name] || ''].some((value) => String(value).toLowerCase().includes(needle)),
  );
}
