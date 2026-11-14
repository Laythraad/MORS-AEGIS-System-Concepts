import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const INVENTORY = resolve(ROOT, 'ms02-connectors/challenge-data/psi_combustion_inventory.json');
const OUTPUT = resolve(ROOT, 'ms02-connectors/challenge-data/psi_file_index.json');
const inventory = JSON.parse(await readFile(INVENTORY, 'utf8'));
const endpoint = 'https://psi.nasa.gov/geode-py/ws/files/v2';
const candidateVersions = ['4', '5', '3', '2', '1', '6', '7', '8'];

function flatten(nodes, parent = []) {
  const result = [];
  for (const node of nodes || []) {
    // The PSI API returns directory nodes without a `directory` flag; infer
    // them from their trailing slash and nested files array.
    const isDirectory = Boolean(node.directory || node.key?.endsWith('/') || (node.files?.length && !node.id));
    const path = isDirectory ? [...parent, node.displayName || node.key || ''] : parent;
    if (isDirectory) result.push(...flatten(node.files, path));
    else result.push({
      name: node.key?.split('/').at(-1) || node.displayName || '',
      key: node.key || '',
      category: node.sortingCategory || path.at(-1) || '',
      path: path.join('/'),
      bytes: Number.isFinite(node.bytes_size) ? node.bytes_size : null,
      restricted: Boolean(node.restricted || node.restrictedAccess),
      status: node.status || '',
      fileId: node.id || '',
      sourceFileVersion: Number.isInteger(node.version) ? node.version : null,
      updated: node.updated || ''
    });
  }
  return result;
}

async function getStudyFiles(studyId) {
  const errors = [];
  for (const version of candidateVersions) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ folder: '', fileType: 'study', studyId, version, obfuscationcode: '' }),
      signal: AbortSignal.timeout(20_000)
    });
    if (response.ok) {
      const tree = await response.json();
      return { version, files: flatten(tree.files), errors };
    }
    const message = (await response.text()).slice(0, 500);
    errors.push({ version, status: response.status, message });
    if (response.status !== 400 || !/version/i.test(message)) break;
  }
  return { version: null, files: [], errors };
}

const records = [];
for (const item of inventory.records) {
  const result = await getStudyFiles(item.id);
  const totalBytes = result.files.reduce((sum, file) => sum + (file.bytes || 0), 0);
  const experimentalTables = result.files.filter(file =>
    file.category.toLowerCase() === 'experimental table' && file.name.toLowerCase().endsWith('.csv'));
  const categoryCounts = Object.fromEntries([...new Set(result.files.map(file => file.category || 'Uncategorized'))]
    .sort((a, b) => a.localeCompare(b))
    .map(category => [category, result.files.filter(file => (file.category || 'Uncategorized') === category).length]));
  records.push({
    id: item.id,
    title: item.title,
    nasaRecordUrl: item.nasaRecordUrl,
    fileManifestVersion: result.version,
    listedFileCount: result.files.length,
    accessibleFileCount: result.files.filter(file => !file.restricted && file.status !== 'inactive').length,
    experimentalTableCount: experimentalTables.length,
    experimentalTables,
    categoryCounts,
    listedFiles: result.files,
    totalListedBytes: totalBytes,
    discoveryErrors: result.errors
  });
  console.log(`${item.id}: PSI manifest v${result.version || '?'} · ${result.files.length} listed · ${experimentalTables.length} experimental CSV table(s)`);
}

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify({
  source: 'NASA PSI study-file listing endpoint',
  endpoint,
  method: 'POST fileType=study; complete listed-file metadata only; no file payloads downloaded',
  retrievedAtUtc: new Date().toISOString(),
  studyCount: records.length,
  records
}, null, 2)}\n`);
console.log(`Saved file manifest index for ${records.length} NASA PSI studies to ${OUTPUT}`);
