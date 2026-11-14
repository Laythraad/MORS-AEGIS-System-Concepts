import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { challengeEvidenceCatalog } from '../ms02-connectors/challenge-data/catalog.mjs';

const output = fileURLToPath(new URL('../ms02-connectors/challenge-data/quality_report.json', import.meta.url));
const catalog = await challengeEvidenceCatalog();
if (catalog.investigations.some(item => item.sourceIntegrity !== 'VERIFIED')) {
  throw new Error('At least one NASA PSI table failed its manifest integrity check.');
}
const report = {
  generatedAt: new Date().toISOString(),
  source: catalog.source,
  officialInventory: catalog.officialInventory,
  method: 'Verify source byte count and SHA-256; parse RFC 4180 CSV; inventory rows, fields and missing cells. No unit harmonization, imputation, or cross-investigation pooling.',
  investigations: catalog.investigations,
  findings: catalog.findings,
  supportingAssets: catalog.supportingAssets,
  recordCountAcrossFiles: catalog.recordCountAcrossFiles,
  recordCountNote: catalog.recordCountNote,
  scopeExclusions: catalog.scopeExclusions
};
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Wrote verified source inventory: ${output}`);
console.log(`${report.investigations.length} tables · ${report.supportingAssets.length} supporting files · ${report.recordCountAcrossFiles} separate source rows (not pooled)`);
