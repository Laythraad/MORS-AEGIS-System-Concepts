// Refresh table-file versions from the official PSI study manifests.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const INDEX_PATH = resolve(ROOT, 'ms02-connectors/challenge-data/psi_file_index.json');
const index = JSON.parse(await readFile(INDEX_PATH, 'utf8'));
for (const record of index.records.filter(item => item.experimentalTables?.length)) {
  const response = await fetch('https://psi.nasa.gov/geode-py/ws/files/v2', {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ folder: '', fileType: 'study', studyId: record.id, version: record.fileManifestVersion, obfuscationcode: '' }),
    signal: AbortSignal.timeout(30_000)
  });
  if (!response.ok) throw new Error(`${record.id} file manifest: HTTP ${response.status}`);
  const tree = await response.json();
  const files = [];
  const visit = nodes => { for (const node of nodes || []) { if (node.key?.endsWith('/')) visit(node.files); else files.push(node); } };
  visit(tree.files);
  for (const table of record.experimentalTables) {
    const source = files.find(file => file.key === table.key);
    if (!source) throw new Error(`Table disappeared from ${record.id} PSI file manifest: ${table.key}`);
    table.sourceFileVersion = source.version;
    table.bytes = Number(source.bytes_size);
    table.updated = source.updated;
  }
  console.log(`${record.id}: ${record.experimentalTables.map(file => `v${file.sourceFileVersion} ${file.name}`).join(', ')}`);
}
index.retrievedAtUtc = new Date().toISOString();
await writeFile(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`);
