// Download the small, public Experimental table CSV files from the official
// NASA PSI Combustion Science investigation manifests. No videos or archives.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = resolve(ROOT, 'ms02-connectors/challenge-data');
const INDEX = JSON.parse(await readFile(resolve(DATA, 'psi_file_index.json'), 'utf8'));
const INVENTORY = JSON.parse(await readFile(resolve(DATA, 'psi_combustion_inventory.json'), 'utf8'));
const MANIFEST_PATH = resolve(DATA, 'source_manifest.json');
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const knownFiles = new Set(manifest.tables.map(item => `${item.investigation_id}/${item.source_filename}`));
const inventoryById = new Map(INVENTORY.records.map(item => [item.id, item]));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const downloadEndpoint = 'https://psi.nasa.gov/geode-py/ws/studies';

for (const record of INDEX.records) {
  const study = inventoryById.get(record.id);
  for (const file of record.experimentalTables || []) {
    if (knownFiles.has(`${record.id}/${file.name}`)) continue;
    if (file.restricted || file.status !== 'active') throw new Error(`${record.id}/${file.name} is not listed as public and active.`);
    if (!Number.isInteger(file.bytes) || file.bytes < 1 || file.bytes > 5_000_000) {
      throw new Error(`Unexpected PSI file size for ${record.id}/${file.name}: ${file.bytes}`);
    }

    if (!Number.isInteger(file.sourceFileVersion) || file.sourceFileVersion < 1) {
      throw new Error(`Missing NASA PSI file version for ${record.id}/${file.name}`);
    }
    const rawDir = resolve(DATA, 'raw');
    const rawPath = resolve(rawDir, file.name);
    let bytes;
    try {
      // Recover safely if a previous run downloaded a file before a later file
      // failed validation, without overwriting that existing source file.
      bytes = await readFile(rawPath);
      if (bytes.length !== file.bytes) throw new Error(`Existing local file has an unexpected size: ${rawPath}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const endpoint = new URL(`${downloadEndpoint}/${record.id}/download`);
      endpoint.searchParams.set('file', file.name);
      endpoint.searchParams.set('version', String(file.sourceFileVersion));
      endpoint.searchParams.set('redirect', 'false');
      const pointer = await fetch(endpoint, { signal: AbortSignal.timeout(30_000) });
      if (!pointer.ok) throw new Error(`NASA PSI pointer HTTP ${pointer.status} for ${record.id}/${file.name}`);
      const signedUrl = (await pointer.text()).trim();
      const signed = new URL(signedUrl);
      if (signed.protocol !== 'https:' || !signed.hostname.endsWith('.amazonaws.com')) {
        throw new Error(`Unexpected file host for ${record.id}/${file.name}`);
      }
      const response = await fetch(signed, { signal: AbortSignal.timeout(60_000) });
      if (!response.ok) throw new Error(`NASA PSI download HTTP ${response.status} for ${record.id}/${file.name}`);
      bytes = Buffer.from(await response.arrayBuffer());
    }
    if (bytes.length !== file.bytes) {
      throw new Error(`NASA PSI size mismatch for ${record.id}/${file.name}: expected ${file.bytes}, got ${bytes.length}`);
    }

    const item = {
      investigation_id: record.id,
      investigation_title: study?.title || record.title,
      investigation_version: Number(record.fileManifestVersion) || null,
      doi: null,
      license: 'Public NASA PSI repository file; consult the linked source record for rights metadata.',
      source_record: study?.nasaRecordUrl || record.nasaRecordUrl,
      source_filename: file.name,
      source_file_version: file.sourceFileVersion,
      bytes: bytes.length,
      sha256: sha256(bytes),
      content_type: 'text/csv',
      local_path: `ms02-connectors/challenge-data/raw/${file.name}`,
      package_path: `ms02-connectors/challenge-data/raw/${file.name}`
    };
    await mkdir(rawDir, { recursive: true });
    try { await writeFile(rawPath, bytes, { flag: 'wx' }); }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
    manifest.tables.push(item);
    knownFiles.add(`${record.id}/${file.name}`);
    console.log(`${record.id}: downloaded ${file.name} (${bytes.length} bytes; sha256 ${item.sha256.slice(0, 12)}…)`);
  }
}

manifest.table_manifest_retrieved_at_utc = new Date().toISOString();
await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`PSI tables now bundled: ${manifest.tables.length}`);
