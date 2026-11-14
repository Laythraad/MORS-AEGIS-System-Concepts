import test from 'node:test';
import assert from 'node:assert/strict';
import { challengeEvidenceCatalog, challengeEvidenceTable } from '../ms02-connectors/challenge-data/catalog.mjs';

const expected = new Map([
  ['PSI-20', 18], ['PSI-21', 32], ['PSI-22', 32], ['PSI-23', 18],
  ['PSI-25', 129], ['PSI-26', 122], ['PSI-69', 274], ['PSI-98', 4],
  ['PSI-39', 87], ['PSI-47', 2], ['PSI-68', 8], ['PSI-99', 15],
  ['PSI-100', 2], ['PSI-101', 109], ['PSI-102', 8], ['PSI-107', 469]
]);

test('challenge catalogue separates the complete PSI inventory from sixteen bundled source tables', async () => {
  const catalog = await challengeEvidenceCatalog();
  assert.deepEqual(catalog.investigations.map(item => item.id), [...expected.keys()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
  assert.equal(catalog.investigations.length, 16);
  assert.equal(catalog.officialInventory.total, 24);
  assert.equal(catalog.officialInventory.records.length, 24);
  assert.equal(catalog.officialInventory.records.filter(item => item.rawTableBundled).length, 16);
  assert.ok(catalog.officialInventory.records.some(item => item.id === 'PSI-10' && !item.rawTableBundled));
  assert.equal(catalog.recordCountAcrossFiles, 1329);
  assert.ok(catalog.investigations.every(item => item.sourceIntegrity === 'VERIFIED'));
  assert.equal(catalog.supportingAssets.length, 8);
  assert.ok(catalog.supportingAssets.every(item => item.sourceIntegrity === 'VERIFIED'));
  assert.ok(catalog.investigations.every(item => item.sourceUrl.startsWith('https://psi.nasa.gov/')));
  assert.equal(catalog.findings.find(item => item.id === 'PSI-25-O2-range').value, '13.6–22.2 % by volume');
  assert.match(catalog.findings.find(item => item.id === 'PSI-98-direction-pair').value, /420 s.*70 s/);
  assert.match(catalog.findings.find(item => item.id === 'PSI-102-teflon-loss').value, /mean 1.75 mg\/min/);
  const spiceIntervals = catalog.findings.find(item => item.id === 'PSI-107-clock-interval-audit');
  assert.match(spiceIntervals.value, /469 source rows · 118 unique date\/ignition\/flame-off pairs · 3 pairs/);
  assert.match(spiceIntervals.interpretation, /median of 85 s \(range 17–655 s\)/);
  assert.deepEqual(catalog.investigations.find(item => item.id === 'PSI-98').rowClassification.counts,
    { experimentSamples: 2, flowVisualizationReferences: 2 });
  assert.deepEqual(catalog.investigations.find(item => item.id === 'PSI-99').rowClassification.counts,
    { sampleEntries: 9, flowVisualizationReferences: 2, noteRows: 4 });
  assert.deepEqual(catalog.investigations.find(item => item.id === 'PSI-102').rowClassification.counts,
    { sourceRows: 8, entriesWithNumericWeightLoss: 4, descriptiveCrossReferenceRows: 4 });
});

test('each challenge source table parses without normalizing its study-specific fields', async () => {
  for (const [id, rowCount] of expected) {
    const table = await challengeEvidenceTable(id);
    assert.equal(table.rows.length, rowCount, id);
    assert.ok(table.headers.length > 0, id);
    assert.ok(table.sourceSha256.length === 64, id);
  }
  const flex = await challengeEvidenceTable('PSI-69');
  assert.ok(flex.headers.includes('Burning rate; mm'));
  assert.equal(typeof flex.rows[0]['Burning rate; mm'], 'string');
});

test('investigation-lab summaries use study-specific fields and preserve scientific limits', async () => {
  const catalog = await challengeEvidenceCatalog();
  const byId = new Map(catalog.investigations.map(item => [item.id, item.studyAnalysis]));
  assert.equal(byId.get('PSI-20').metrics.find(metric => metric.field === 'Flames Ignited').n, 18);
  const breOxygen = byId.get('PSI-20').conditions.find(condition => condition.field === 'Oxygen Conc (percent)');
  assert.ok(breOxygen.values.some(value => value.value === '2100%'));
  assert.ok(breOxygen.values.some(value => value.value === '3400%'));
  const flex2Envelope = byId.get('PSI-68').conditions.find(condition => condition.field === 'Ambient Pressure (atm)');
  assert.equal(flex2Envelope.values[0].value, '0.5; 1.0; 1.5; 2.0; or 3.0');
  const bass = byId.get('PSI-25').metrics.find(metric => metric.field === 'Initial CO (ppm)');
  assert.equal(bass.n, 126);
  assert.equal(bass.min, -3);
  assert.equal(bass.max, 950);
  assert.equal(byId.get('PSI-98').includedRows, 2);
  assert.ok(byId.get('PSI-98').conditions.every(condition => condition.missing === 0));
  assert.equal(byId.get('PSI-98').metrics.find(metric => metric.field === 'Burn Time (s)').n, 2);
  assert.equal(byId.get('PSI-69').status, 'dedicated-workbench');
  assert.equal(byId.get('PSI-69').metrics.length, 0);
  assert.equal(byId.get('PSI-99').status, 'metadata-or-conditions-only');
  assert.match(byId.get('PSI-99').note, /“\?-g”/);
  assert.equal(byId.get('PSI-102').metrics.find(metric => metric.field === 'Weight loss rate (mg/min)').mean, 1.75);
  assert.equal(byId.get('PSI-107').metrics.find(metric => metric.field === 'Fuel Rate (mg/s)').n, 457);
  assert.ok(catalog.investigations.every(item => item.studyAnalysis && item.studyAnalysis.sourceRows === item.rowCount));
});

test('unknown investigation IDs do not resolve to unrelated datasets', async () => {
  assert.equal(await challengeEvidenceTable('FIRMS'), null);
  assert.equal(await challengeEvidenceTable('OTHER-CHALLENGE'), null);
});
