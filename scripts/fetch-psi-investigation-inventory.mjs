import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'ms02-connectors/challenge-data/psi_combustion_inventory.json');
const endpoint = new URL('https://psi.nasa.gov/geode-py/ws/repo/search');
endpoint.searchParams.set('source', 'psi');
endpoint.searchParams.set('type', 'investigation');
endpoint.searchParams.set('size', '100');
endpoint.searchParams.set('sort', 'Accession');
endpoint.searchParams.set('order', 'asc');
endpoint.searchParams.append('ffield', 'Research Area');
endpoint.searchParams.append('fvalue', 'combustion science');

const response = await fetch(endpoint, { headers: { accept: 'application/json' } });
if (!response.ok) throw new Error(`NASA PSI inventory request failed: HTTP ${response.status}`);
const result = await response.json();
const total = result.hits?.total;
const records = (result.hits?.hits || []).map(({ _source: item }) => ({
  id: item.Accession,
  title: item.Title,
  acronym: item.Acronym || '',
  subResearchArea: item['SubResearch Area'] || '',
  projectType: item['Project Type'] || '',
  flightPlatform: item['Flight Platform'] || '',
  keywords: item.Keywords || '',
  objectives: item.Objectives || '',
  approach: item.Approach || '',
  hypothesis: item.Hypothesis || '',
  relatedInvestigations: item['Related Investigations'] || '',
  nasaRecordUrl: `https://psi.nasa.gov/physci/repo/data/investigations/${item.Accession}`
})).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

if (!Number.isInteger(total) || records.length !== total) {
  throw new Error(`Expected complete PSI result set; API reports ${total}, received ${records.length}.`);
}

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify({
  source: 'NASA Physical Sciences Informatics (PSI) repository',
  endpoint: endpoint.toString(),
  filter: { researchArea: 'Combustion Science', dataSource: 'psi', dataType: 'investigation' },
  retrievedAtUtc: new Date().toISOString(),
  total,
  note: 'This is a metadata inventory from the official NASA PSI search. It does not imply every investigation raw data file is bundled or directly comparable.',
  records
}, null, 2)}\n`);
console.log(`Saved ${records.length} NASA PSI Combustion Science investigation records to ${OUTPUT}`);
