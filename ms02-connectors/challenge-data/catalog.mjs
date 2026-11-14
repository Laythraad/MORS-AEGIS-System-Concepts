import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseCSV } from '../../ms05-analysis/analysis.mjs';

const MANIFEST_PATH = fileURLToPath(new URL('./source_manifest.json', import.meta.url));
const RAW_ROOT = new URL('./raw/', import.meta.url);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const manifestPromise = readFile(MANIFEST_PATH, 'utf8').then(JSON.parse);
const inventoryPromise = readFile(new URL('./psi_combustion_inventory.json', import.meta.url), 'utf8').then(JSON.parse);
const fileIndexPromise = readFile(new URL('./psi_file_index.json', import.meta.url), 'utf8').then(JSON.parse);
let catalogCache;

function triageInventoryRecord(record, rawTableBundled) {
  const topic = `${record.title} ${record.acronym} ${record.subResearchArea} ${record.objectives} ${record.approach}`.toLowerCase();
  const crewTerms = /spacecraft fire|fire safety|flammab|fire detect|smoke|suppress|extinguish|flame spread/.test(topic);
  const relevanceScore = crewTerms ? 3 : /combustion|flame|fire/.test(topic) ? 2 : 1;
  const environmentMetadata = `${record.projectType} ${record.flightPlatform}`.toLowerCase();
  const environmentScore = /microgravity|reduced gravity|iss|space shuttle|free[- ]?flyer|aircraft|drop tower/.test(environmentMetadata) ? 2 : 0;
  const dataScore = rawTableBundled ? 3 : 0;
  const missionRelevanceScore = relevanceScore + environmentScore;
  return {
    relevanceScore,
    environmentScore,
    dataAvailabilityScore: dataScore,
    missionRelevanceScore,
    missionRelevanceMax: 5,
    scoreMeaning: 'Metadata heuristic for relevance to crew fire-safety environments; not an experimental hazard ranking.',
    scoreFactors: [
      crewTerms ? 'metadata matches crew fire-safety topics (3/3)' : 'general combustion relevance from official research-area filter (1–2/3)',
      environmentScore ? 'spaceflight/reduced-gravity context in PSI metadata (2/2)' : 'no flight/reduced-gravity context identified in PSI metadata (0/2)',
      rawTableBundled ? 'source table bundled (secondary tie-break only)' : 'no source table bundled (metadata only; secondary tie-break)'
    ]
  };
}

function fieldAudit(rows, headers) {
  return headers.map(name => {
    const values = rows.map(row => row[name]);
    const present = values.filter(value => value !== null && value !== undefined && value !== '').map(String);
    const numeric = present.map(value => {
      const normalized = value.trim();
      return /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(normalized) ? Number(normalized) : null;
    });
    const numbers = numeric.filter(Number.isFinite);
    return {
      name,
      nonEmpty: present.length,
      missing: rows.length - present.length,
      numericOnlyCount: numbers.length,
      numericRange: numbers.length === present.length && numbers.length
        ? { min: Math.min(...numbers), max: Math.max(...numbers) }
        : null
    };
  });
}

function classifySourceRows(id, rows) {
  if (id === 'PSI-98') {
    const counts = { experimentSamples: 0, flowVisualizationReferences: 0 };
    for (const row of rows) {
      if (/^S\d+$/i.test(String(row['Sample Number'] || ''))) counts.experimentSamples++;
      else if (/^F\d/i.test(String(row['Sample Number'] || ''))) counts.flowVisualizationReferences++;
    }
    return { counts, basis: 'PSI-98 source sample labels: S# are material-fire samples; F# are explicitly named pre-test flow visualisation records.' };
  }
  if (id === 'PSI-99') {
    const counts = { sampleEntries: 0, flowVisualizationReferences: 0, noteRows: 0 };
    for (const row of rows) {
      const sample = String(row['Sample Number'] || '');
      if (/^\d+-\d+$/.test(sample)) counts.sampleEntries++;
      else if (/^F\d/i.test(sample)) counts.flowVisualizationReferences++;
      else if (/^Note\s+\d+/i.test(sample)) counts.noteRows++;
    }
    return { counts, basis: 'PSI-99 Sample Number prefixes: numbered sample rows, F# flow-visualisation references, and Note # explanatory rows.' };
  }
  if (id === 'PSI-102') {
    const measured = rows.filter(row => /^\d+$/.test(String(row['Sample #'] || ''))
      && typeof row['Weight loss rate (mg/min)'] === 'string'
      && row['Weight loss rate (mg/min)'].trim() !== ''
      && Number.isFinite(Number(row['Weight loss rate (mg/min)'])));
    return { counts: { sourceRows: rows.length, entriesWithNumericWeightLoss: measured.length, descriptiveCrossReferenceRows: rows.length - measured.length }, basis: 'Weight-loss entries are counted only when the source cell is a finite number; material descriptions such as “same conditions as 1-4” remain references.' };
  }
  return { counts: { sourceRows: rows.length }, basis: 'Source rows are counted without asserting a normalized one-row-one-test schema.' };
}

const studyAnalysisPlans = {
  'PSI-20': { metrics: [['Flames Ignited', 'reported ignition count']], contextFields: ['Burner Size (mm)', 'Fuel Bottle', 'Oxygen Conc (percent)'], note: 'Rows are day-level summaries. The count describes the source summary row, not an individual flame trial; oxygen labels include malformed source tokens and are not paired to individual outcomes.' },
  'PSI-21': { metrics: [['Flames ignited', 'reported ignition count']], contextFields: ['Fuel Bottle', 'Fuel conc. Range', 'Fuel MFC', 'N2 MFC'], note: 'Rows are test-day summaries. MFC fields retain source labels and units are not inferred; this descriptive count does not isolate a fuel or flow effect.' },
  'PSI-22': { metrics: [['Flames Ignited', 'reported ignition count']], contextFields: ['Mesh Polarity', 'Fuel Bottle', 'Fuel Conc'], note: 'Only numeric source cells are summarized; blank/comment rows remain part of the table inventory. These summaries are not a per-flame response model.' },
  'PSI-23': { metrics: [['Flames Ignited*', 'reported ignition count']], contextFields: ['Atmosphere*', 'Fuel Bottle'], note: 'Rows summarize test days. The asterisk and source notation are preserved; no flame-structure or extinction rate is computed from this table.' },
  'PSI-25': { metrics: [
    ['Calibrated  initial O2 % by vol', '% by volume'], ['Calibrated final O2 % by vol', '% by volume'],
    ['Initial CO2 % by vol', '% by volume'], ['Final CO2 % by vol', '% by volume'],
    ['Initial CO (ppm)', 'ppm'], ['Final CO (ppm)', 'ppm']
  ], contextFields: ['Fuel Sample Material', 'Calibrated  initial O2 % by vol'], note: 'Summaries describe reported source readings across test rows. Material, fan/air display, ignition, and other conditions vary; ranges do not isolate an oxygen or gas effect. Negative CO readings are retained as source values, not clipped.' },
  'PSI-26': { metrics: [], contextFields: ['Fuel Sample Material'], note: 'This export is a sample/material inventory without a numeric flame-spread or burning outcome. It supports discovery and provenance, not quantitative hazard ranking.' },
  'PSI-39': { metrics: [['Oxygen', 'source unit not stated in this table'], ['Nitrogen', 'source unit not stated in this table'], ['Helium', 'source unit not stated in this table']], contextFields: ['Pressure', 'Oxygen', 'Nitrogen', 'Helium', 'Fiber', 'Fuel'], note: 'These are ambient-composition condition fields, not combustion outcomes. The source table does not state units in the column labels; values are not converted or treated as flammability scores.' },
  'PSI-47': { metrics: [], contextFields: ['Hardware Description', 'Sample Material', 'Sampled Location'], note: 'This export contains two dust/aerosol sampling session descriptions and no numeric combustion outcome.' },
  'PSI-68': { metrics: [], contextFields: ['Sample (Fuel Type)', 'Ambient Gas Mixture', 'Oxygen Mole Fraction', 'Ambient Pressure (atm)', 'Flow Velocity (cm/s)'], note: 'This is a test-envelope table with ranges and semicolon-delimited alternatives, not individual test observations. Range strings are preserved; no statistics are computed from them.' },
  'PSI-69': { metrics: [], note: 'Use the FLEX Analysis Workbench for condition-stratified analysis. The liquid-droplet d²-law burning-rate constant is not solid-fuel flame-spread speed.' },
  'PSI-98': { metrics: [['Burn Time (s)', 's']], contextFields: ['Material', 'Air Flow (cm/s)', 'Percent O2', 'Flow Direction'], rowFilter: row => /^S\d+$/i.test(String(row['Sample Number'] || '')), note: 'Only the two S# material-fire sample rows are included; F# entries are pre-test flow visualisation references. Two samples cannot establish a reliable flow-direction effect.' },
  'PSI-99': { metrics: [], contextFields: ['Material', 'Air Flow (cm/s)', 'Percent O2 (Note 1)', 'Flow Direction', '?-g Burn Length', '1-g Spread Rate'], note: 'Nine sample entries contain mixed categorical and length labels. The microgravity outcome header is “?-g”; gravity assignment is unresolved, so no 0-g classification or pooled numeric result is produced.' },
  'PSI-100': { metrics: [], contextFields: ['Material', 'Air Flow', 'Direction'], note: 'The two rows describe SIBAL sample conditions and camera IDs, including 30 cm/s concurrent/opposed flow. No measured flame-spread outcome is present in this table.' },
  'PSI-101': { metrics: [['Inlet velocity (cm/s)', 'cm/s'], ['Rt/R0', 'ratio as published'], ['Net aging time (sec)', 's']], contextFields: ['Sample Type', 'Inlet velocity (cm/s)', 'Description'], note: 'These are smoke/aerosol transport and measurement fields, not flame-spread outcomes. Repeated test identifiers and missing conditions preclude treating rows as independent burns.' },
  'PSI-102': { metrics: [['Weight loss rate (mg/min)', 'mg/min']], contextFields: ['Sample Material', 'Air Flow (cm/s)', 'Aging Duration (minutes)'], note: 'Four numeric Teflon entries are retained as reported. Rows have different airflow and aging-duration settings; the mean is descriptive and is not a flame-spread rate.' },
  'PSI-107': { metrics: [['Nozzle (mm)', 'mm'], ['Fuel Rate (mg/s)', 'mg/s'], ['Air Rate (cm/s)', 'cm/s']], contextFields: ['Fuel', 'Nozzle (mm)', 'Fuel Rate (mg/s)', 'Air Rate (cm/s)'], note: 'The 469-row SPICE test log repeats event times across operating-condition rows. These numeric summaries describe source entries, not independent fires or causal responses; time chronology is audited separately.' }
};

function analyzeStudyTable(id, rows) {
  const plan = studyAnalysisPlans[id];
  if (!plan) return { status: 'not-configured', metrics: [], note: 'No study-specific analysis definition is available.' };
  const selectedRows = plan.rowFilter ? rows.filter(plan.rowFilter) : rows;
  const conditions = (plan.contextFields || []).map(field => {
    const counts = new Map();
    let missing = 0;
    for (const row of selectedRows) {
      const raw = row[field];
      if (raw === null || raw === undefined || String(raw) === '') { missing++; continue; }
      const value = String(raw);
      counts.set(value, (counts.get(value) || 0) + 1);
    }
    const distinct = [...counts.entries()].map(([value, count]) => ({ value, count }));
    return { field, distinctValueCount: distinct.length, values: distinct.slice(0, 8), omittedValueCount: Math.max(0, distinct.length - 8), missing };
  });
  const metrics = plan.metrics.map(([field, unit]) => {
    const values = selectedRows.map(row => {
      const raw = row[field];
      if (raw === null || raw === undefined || String(raw).trim() === '') return null;
      const value = Number(String(raw).trim());
      return Number.isFinite(value) ? value : null;
    });
    const observed = values.filter(Number.isFinite).sort((a, b) => a - b);
    const median = observed.length
      ? observed.length % 2
        ? observed[(observed.length - 1) / 2]
        : (observed[observed.length / 2 - 1] + observed[observed.length / 2]) / 2
      : null;
    return {
      field,
      unit,
      n: observed.length,
      missingOrNonNumeric: values.length - observed.length,
      min: observed.length ? observed[0] : null,
      median,
      max: observed.length ? observed.at(-1) : null,
      mean: observed.length ? observed.reduce((sum, value) => sum + value, 0) / observed.length : null,
      interpretation: 'Descriptive summary of numeric source cells only; it does not imply matched trials, independence, or causality.'
    };
  });
  return {
    status: metrics.length ? 'descriptive-source-summary' : id === 'PSI-69' ? 'dedicated-workbench' : 'metadata-or-conditions-only',
    sourceRows: rows.length,
    includedRows: selectedRows.length,
    metrics,
    conditions,
    note: plan.note,
    methods: 'Exact source field selection; blank and non-numeric cells excluded per field; no imputation, unit conversion, pooling, confidence intervals, or hypothesis tests.'
  };
}

async function buildChallengeEvidenceCatalog() {
  const manifest = await manifestPromise;
  const officialInventory = await inventoryPromise;
  const fileIndex = await fileIndexPromise;
  const listedFileRecords = fileIndex.records || [];
  const fileCategories = new Map();
  for (const record of listedFileRecords) for (const file of record.listedFiles || []) {
    const category = file.category || 'Uncategorized';
    const current = fileCategories.get(category) || { fileCount: 0, reportedBytes: 0 };
    current.fileCount++;
    current.reportedBytes += file.bytes || 0;
    fileCategories.set(category, current);
  }
  const fileIndexById = new Map(listedFileRecords.map(record => [record.id, record]));
  const investigations = [];
  const sourceRowsById = new Map();
  for (const item of manifest.tables) {
    const bytes = await readFile(new URL(encodeURIComponent(item.source_filename).replaceAll('%2F', '/'), RAW_ROOT));
    const actualHash = sha256(bytes);
    const rows = parseCSV(bytes.toString('utf8'), { preserveStrings: true });
    sourceRowsById.set(item.investigation_id, rows);
    const headers = rows.length ? Object.keys(rows[0]) : [];
    investigations.push({
      id: item.investigation_id,
      title: item.investigation_title,
      doi: item.doi,
      license: item.license || 'Not stated in the PSI inventory metadata; consult the linked record.',
      sourceUrl: item.source_record,
      sourceFilename: item.source_filename,
      sourceBytes: item.bytes,
      sha256: actualHash,
      sourceIntegrity: actualHash === item.sha256 && bytes.length === item.bytes ? 'VERIFIED' : 'MISMATCH',
      rowCount: rows.length,
      studyAnalysis: analyzeStudyTable(item.investigation_id, rows),
      rowClassification: classifySourceRows(item.investigation_id, rows),
      headers,
      fields: fieldAudit(rows, headers),
      dataBoundary: 'This is one investigation table. Rows are not pooled with other investigations; units and field meanings stay source-specific.'
    });
  }
  investigations.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  const breRows = sourceRowsById.get('PSI-20') || [];
  const breOxygenTokens = breRows.flatMap(row => String(row['Oxygen Conc (percent)'] || '').split(';').map(value => value.trim())).filter(Boolean);
  const breOxygenValues = [...new Set(breOxygenTokens.filter(value => Number.isFinite(Number(value))).map(Number))].sort((a, b) => a - b);
  const breMalformedOxygen = [...new Set(breOxygenTokens.filter(value => !Number.isFinite(Number(value))))];
  const numericCells = (rows, field) => rows.map(row => row[field] === null ? null : Number(String(row[field]).trim())).filter(Number.isFinite);
  const oxygenValues = numericCells(sourceRowsById.get('PSI-25') || [], 'Calibrated  initial O2 % by vol');
  const sameValues = numericCells(sourceRowsById.get('PSI-102') || [], 'Weight loss rate (mg/min)');
  const flexRows = sourceRowsById.get('PSI-69') || [];
  const spiceRows = sourceRowsById.get('PSI-107') || [];
  const spiceTimePairs = new Map();
  const clockSeconds = value => {
    const match = /^(\d{1,2}):(\d{2}):(\d{2})$/.exec(String(value || '').trim());
    return match ? Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) : null;
  };
  for (const row of spiceRows) {
    const ignition = clockSeconds(row['GMT ignition']);
    const flameOff = clockSeconds(row['GMT  Flame Off']);
    if (ignition === null || flameOff === null) continue;
    const key = [row['GMT date'], row['GMT ignition'], row['GMT  Flame Off']].join('|');
    if (!spiceTimePairs.has(key)) spiceTimePairs.set(key, { seconds: flameOff - ignition });
  }
  const spicePairs = [...spiceTimePairs.values()];
  const spiceValidIntervals = spicePairs.map(pair => pair.seconds).filter(seconds => seconds >= 0).sort((a, b) => a - b);
  const spiceMedianInterval = spiceValidIntervals.length
    ? spiceValidIntervals[Math.floor((spiceValidIntervals.length - 1) / 2)]
    : null;
  const flexFuels = [...new Set(flexRows.map(row => row.Fuel).filter(Boolean))];
  const saffireRows = sourceRowsById.get('PSI-98') || [];
  const saffiSamples = saffireRows.filter(row => /^S\d+$/i.test(String(row['Sample Number'] || '')));
  const saffireBurnTimes = saffiSamples.map(row => ({
    sample: row['Sample Number'], direction: row['Flow Direction'], burnTimeSeconds: Number(row['Burn Time (s)'])
  })).filter(row => Number.isFinite(row.burnTimeSeconds));
  const findings = [
    {
      id: 'PSI-20-bre-summary', investigationId: 'PSI-20', evidence: 'OBSERVED · SUMMARY TABLE',
      title: 'ACME BRE reports test-day summaries',
      value: `${sourceRowsById.get('PSI-20')?.length || 0} rows · burner/fuel conditions and flames ignited`, n: sourceRowsById.get('PSI-20')?.length || 0,
      interpretation: 'Rows summarize test days rather than individual flames. Pressure details are incomplete in this table; do not use its oxygen settings as a controlled oxygen-response curve.'
    },
    ...(breOxygenValues.length ? [{
      id: 'PSI-20-bre-oxygen-entries', investigationId: 'PSI-20', evidence: 'OBSERVED SOURCE LABELS',
      title: 'BRE summaries include elevated-oxygen test concentrations',
      value: `${breOxygenValues.join('%, ')}% by volume${breMalformedOxygen.length ? ` · malformed source tokens preserved: ${breMalformedOxygen.map(value => `“${value}”`).join(', ')}` : ''}`,
      n: breOxygenTokens.length,
      interpretation: 'These are approximate concentration labels across day-level summaries, not individual test outcomes. The file notes that chamber pressures varied but does not resolve them by summary; malformed labels such as 2100% and 3400% are preserved, not silently repaired. This cannot establish a flammability limit or isolate oxygen from pressure, fuel, burner, and flow.'
    }] : []),
    {
      id: 'PSI-21-cld-summary', investigationId: 'PSI-21', evidence: 'SOURCE-LABEL CAVEAT',
      title: 'CLD table is a test-day ignition summary',
      value: `${sourceRowsById.get('PSI-21')?.length || 0} rows · MFC/fuel concentration summaries`, n: sourceRowsById.get('PSI-21')?.length || 0,
      interpretation: 'The source contains labels such as CH5 and CH6 that look malformed. Preserve them verbatim until checked against the official study files; the rows are not flame-speed measurements.'
    },
    {
      id: 'PSI-22-efield-summary', investigationId: 'PSI-22', evidence: 'OBSERVED · SUMMARY TABLE',
      title: 'E-FIELD table records ignition counts by test condition',
      value: `${sourceRowsById.get('PSI-22')?.length || 0} source rows · polarity, fuel concentration and ignition counts`, n: sourceRowsById.get('PSI-22')?.length || 0,
      interpretation: 'It is not a per-flame response dataset. Blank/comment rows and counts remain tied to the source layout; do not infer electric-field effect size from raw row totals.'
    },
    {
      id: 'PSI-23-sflame-summary', investigationId: 'PSI-23', evidence: 'SOURCE-LABEL CAVEAT',
      title: 's-Flame table summarizes ignition by test day',
      value: `${sourceRowsById.get('PSI-23')?.length || 0} rows · atmosphere and fuel labels`, n: sourceRowsById.get('PSI-23')?.length || 0,
      interpretation: 'Strings such as N3/N4 are retained exactly as published. The table provides summary counts and conditions, not individual flame structure or extinction measurements.'
    },
    {
      id: 'PSI-39-cfi-conditions', investigationId: 'PSI-39', evidence: 'OBSERVED CONDITIONS',
      title: 'CFI rows describe fuel and ambient conditions',
      value: `${sourceRowsById.get('PSI-39')?.length || 0} rows · oxygen/inert mixture and fuel metadata`, n: sourceRowsById.get('PSI-39')?.length || 0,
      interpretation: 'The experimental table has condition fields but no flame-spread or extinction outcome column. It supports study discovery and context, not a material fire-risk score.'
    },
    {
      id: 'PSI-47-daft-context', investigationId: 'PSI-47', evidence: 'MEASUREMENT-SCOPE',
      title: 'DAFT contains aerosol sampling session descriptions',
      value: `${sourceRowsById.get('PSI-47')?.length || 0} session rows · dust/aerosol sampling`, n: sourceRowsById.get('PSI-47')?.length || 0,
      interpretation: 'This source informs particle/detector context. It is not a combustion or flame-propagation experiment.'
    },
    {
      id: 'PSI-68-flex2-envelope', investigationId: 'PSI-68', evidence: 'OBSERVED TEST ENVELOPE',
      title: 'FLEX-2 table specifies condition ranges',
      value: `${sourceRowsById.get('PSI-68')?.length || 0} rows · fuels, oxygen, pressure, temperature and flow ranges`, n: sourceRowsById.get('PSI-68')?.length || 0,
      interpretation: 'Ranges in this overview are not individual observations or measured outcome values. Keep them separate from PSI-69 FLEX data.'
    },
    {
      id: 'PSI-107-spice-log', investigationId: 'PSI-107', evidence: 'OBSERVED · TEST LOG',
      title: 'SPICE provides a large source test log',
      value: `${sourceRowsById.get('PSI-107')?.length || 0} rows · fuel/nozzle and fuel/air flow fields`, n: sourceRowsById.get('PSI-107')?.length || 0,
      interpretation: 'The file carries ignition/flame-off timing and operating conditions but does not define a universal flame-spread metric. Preserve its chronology and units; do not rank it directly against FLEX or BASS.'
    },
    ...(spiceValidIntervals.length ? [{
      id: 'PSI-107-clock-interval-audit', investigationId: 'PSI-107', evidence: 'COMPUTED · SOURCE-TIME CHECK',
      title: 'SPICE log contains repeated time pairs and chronology flags',
      value: `${spiceRows.length} source rows · ${spicePairs.length} unique date/ignition/flame-off pairs · ${spicePairs.length - spiceValidIntervals.length} pairs have flame-off earlier than ignition`, n: spiceValidIntervals.length,
      interpretation: `For the ${spiceValidIntervals.length} pairs with non-negative same-day clock differences, the derived ignition-to-flame-off interval has a median of ${spiceMedianInterval} s (range ${spiceValidIntervals[0]}–${spiceValidIntervals.at(-1)} s). Multiple source rows repeat the same time pair, so they are deduplicated for this check. Reversed pairs are excluded, not wrapped across midnight or silently corrected. This is a source-time audit, not a calibrated flame-spread rate or an independent-trial count.`
    }] : []),
    ...(flexRows.length ? [{
      id: 'PSI-69-condition-strata', investigationId: 'PSI-69', evidence: 'OBSERVED · ANALYSIS BOUNDARY',
      title: 'FLEX is the largest locally bundled outcome table',
      value: `${flexRows.length} source rows · ${flexFuels.join(' and ')} · multiple ambient atmospheres`, n: flexRows.length,
      interpretation: 'The table reports liquid-droplet burning/extinction measurements. Analyze within fuel, pressure and diluent strata; its d²-law constant is not a solid-fuel spread speed and the pooled mean is not a spacecraft-wide fire rate.'
    }] : []),
    ...(oxygenValues.length ? [{
      id: 'PSI-25-O2-range', investigationId: 'PSI-25', evidence: 'OBSERVED + COMPUTED',
      title: 'BASS-II initial oxygen entries span a reported range',
      value: `${Math.min(...oxygenValues)}–${Math.max(...oxygenValues)} % by volume`, n: oxygenValues.length,
      interpretation: 'This is a range across source entries, not an isolated oxygen effect: material, fan/air displays, ignition and test conditions also vary. Do not treat the endpoints as universal flammability limits.'
    }] : []),
    ...(saffireBurnTimes.length ? [{
      id: 'PSI-98-direction-pair', investigationId: 'PSI-98', evidence: 'OBSERVED',
      title: 'SAFFIRE-I reports two SIBAL sample burn times under opposite flow directions',
      value: saffireBurnTimes.map(row => `${row.sample} ${row.direction}: ${row.burnTimeSeconds} s`).join(' · '), n: saffireBurnTimes.length,
      interpretation: 'Two samples are insufficient for a reliable direction effect. Keep airflow, sample, ignition, and the source definition of “burn time” attached; this is not a universal spread-rate comparison.'
    }] : []),
    ...(sameValues.length ? [{
      id: 'PSI-102-teflon-loss', investigationId: 'PSI-102', evidence: 'OBSERVED + COMPUTED',
      title: 'SAME numeric Teflon weight-loss entries',
      value: `${sameValues.join(', ')} mg/min · arithmetic mean ${sameValues.reduce((sum, value) => sum + value, 0) / sameValues.length} mg/min`, n: sameValues.length,
      interpretation: 'The entries do not share identical airflow and aging-duration settings. This descriptive mean cannot establish an airflow effect or stand in for flame-spread rate.'
    }] : []),
    {
      id: 'PSI-100-conditions-only', investigationId: 'PSI-100', evidence: 'OBSERVED CONDITIONS',
      title: 'SAFFIRE-III table specifies two airflow-direction conditions',
      value: 'SIBAL fabric · 30 cm/s · concurrent and opposed', n: 2,
      interpretation: 'The two source rows describe conditions and camera IDs; this table does not provide measured flame-spread outcomes. It cannot support a direction ranking.'
    },
    {
      id: 'PSI-99-header-caveat', investigationId: 'PSI-99', evidence: 'SOURCE-LABEL LIMIT',
      title: 'SAFFIRE-II source uses an ambiguous gravity header',
      value: '“?-g Burn Length” and “?-g Spread Length”', n: 15,
      interpretation: 'Preserve the NASA PSI header as published until supporting source-file nomenclature resolves it; do not silently rewrite it as “0-g”.'
    },
    {
      id: 'PSI-26-metadata', investigationId: 'PSI-26', evidence: 'SOURCE-COVERAGE GAP',
      title: 'BASS table is a sample/material inventory in this export',
      value: '6 source fields · no numeric flame-spread outcome column', n: sourceRowsById.get('PSI-26')?.length || 0,
      interpretation: 'Useful for investigation discovery and provenance, but insufficient by itself for a quantitative hazard ranking.'
    },
    {
      id: 'PSI-101-aerosol', investigationId: 'PSI-101', evidence: 'MEASUREMENT-SCOPE',
      title: 'SAME-R contributes smoke/aerosol evidence, not flame-spread speed',
      value: 'Inlet velocity, Rt/R0, aging, mixing and duration fields', n: sourceRowsById.get('PSI-101')?.length || 0,
      interpretation: 'Keep aerosol transport and detector-relevant evidence distinct from flame propagation outcomes.'
    }
  ];
  return {
    source: manifest.source,
    purpose: 'Official NASA PSI Combustion Science investigation inventory, with a separately identified bundle of source tables.',
    retrievedAt: manifest.table_manifest_retrieved_at_utc,
    officialInventory: {
      source: officialInventory.source,
      endpoint: officialInventory.endpoint,
      retrievedAt: officialInventory.retrievedAtUtc,
      total: officialInventory.total,
      records: officialInventory.records.map(record => ({
        id: record.id,
        title: record.title,
        acronym: record.acronym,
        subResearchArea: record.subResearchArea,
        projectType: record.projectType,
        flightPlatform: record.flightPlatform,
        relatedInvestigations: record.relatedInvestigations,
        objectives: record.objectives,
        approach: record.approach,
        hypothesis: record.hypothesis,
        keywords: record.keywords,
        nasaRecordUrl: record.nasaRecordUrl,
        rawTableBundled: manifest.tables.some(table => table.investigation_id === record.id),
        psiFileManifest: fileIndexById.has(record.id) ? {
          retrieved: Boolean(fileIndexById.get(record.id).fileManifestVersion),
          version: fileIndexById.get(record.id).fileManifestVersion,
          listedFileCount: fileIndexById.get(record.id).listedFileCount,
          accessibleFileCount: fileIndexById.get(record.id).accessibleFileCount,
          experimentalTableCount: fileIndexById.get(record.id).experimentalTableCount,
          reportedBytes: fileIndexById.get(record.id).totalListedBytes
        } : { retrieved: false, version: null, listedFileCount: 0, accessibleFileCount: 0, experimentalTableCount: 0, reportedBytes: 0 },
        triage: triageInventoryRecord(record, manifest.tables.some(table => table.investigation_id === record.id))
      }))
    },
    fileArchiveInventory: {
      source: fileIndex.source,
      endpoint: fileIndex.endpoint,
      retrievedAt: fileIndex.retrievedAtUtc,
      investigationCount: listedFileRecords.length,
      manifestsRetrieved: listedFileRecords.filter(record => record.fileManifestVersion).length,
      manifestsUnavailable: listedFileRecords.filter(record => !record.fileManifestVersion).length,
      listedFileCount: listedFileRecords.reduce((sum, record) => sum + record.listedFileCount, 0),
      reportedBytes: listedFileRecords.reduce((sum, record) => sum + record.totalListedBytes, 0),
      categories: [...fileCategories.entries()].map(([category, counts]) => ({ category, ...counts })).sort((a, b) => b.reportedBytes - a.reportedBytes),
      note: 'Listed-file metadata for retrieved PSI study manifests only; file payloads are not downloaded by this inventory. Reported sizes include very large raw imagery/video collections. Eight of 24 investigation manifests returned no listing in this snapshot; this does not prove those investigations have no files.'
    },
    investigations,
    findings,
    supportingAssets: await Promise.all(manifest.selected_assets.map(async item => {
      const bytes = await readFile(new URL(encodeURIComponent(item.source_filename).replaceAll('%2F', '/'), RAW_ROOT));
      const digest = sha256(bytes);
      const isCsv = item.source_filename.toLowerCase().endsWith('.csv');
      const rows = isCsv ? parseCSV(bytes.toString('utf8'), { preserveStrings: true }) : null;
      const headers = rows?.length ? Object.keys(rows[0]) : [];
      return {
        investigationId: item.investigation_id,
        doi: item.doi,
        sourceUrl: item.source_record,
        filename: item.source_filename,
        category: item.source_category || 'Supporting documentation or imagery',
        bytes: bytes.length,
        sha256: digest,
        license: item.license,
        sourceIntegrity: digest === item.sha256 && bytes.length === item.bytes ? 'VERIFIED' : 'MISMATCH',
      ...(rows ? { rowCount: rows.length, headers, fields: fieldAudit(rows, headers), recordType: 'unmapped raw telemetry rows' } : {})
      };
    })),
    recordCountAcrossFiles: investigations.reduce((sum, item) => sum + item.rowCount, 0),
    recordCountNote: 'Sum of rows physically present in the separate source tables; not a pooled scientific sample.',
    scopeExclusions: manifest.scope_exclusions
  };
}

export async function challengeEvidenceCatalog() {
  catalogCache ??= buildChallengeEvidenceCatalog();
  return catalogCache;
}

export async function challengeEvidenceTable(id) {
  const manifest = await manifestPromise;
  const item = manifest.tables.find(record => record.investigation_id === id);
  if (!item) return null;
  const bytes = await readFile(new URL(encodeURIComponent(item.source_filename).replaceAll('%2F', '/'), RAW_ROOT));
  const digest = sha256(bytes);
  if (digest !== item.sha256 || bytes.length !== item.bytes) throw new Error(`Source integrity check failed for ${id}.`);
  const rows = parseCSV(bytes.toString('utf8'), { preserveStrings: true });
  return {
    id: item.investigation_id,
    title: item.investigation_title,
    doi: item.doi,
    license: item.license || 'Not stated in the PSI inventory metadata; consult the linked record.',
    sourceUrl: item.source_record,
    sourceFilename: item.source_filename,
    sourceSha256: digest,
    headers: rows.length ? Object.keys(rows[0]) : [],
    rows,
    note: 'Original CSV bytes are preserved and checksum-verified. Parsed view trims outer whitespace and represents blank cells as null; it otherwise preserves cell values as strings and does not harmonize units or combine investigations.'
  };
}
