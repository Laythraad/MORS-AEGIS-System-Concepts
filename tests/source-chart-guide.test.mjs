import test from 'node:test';
import assert from 'node:assert/strict';
import { challengeEvidenceTable } from '../ms02-connectors/challenge-data/catalog.mjs';
import {
  SOURCE_STUDY_CHARTS,
  SOURCE_STUDY_NO_PLOT_REASON,
} from '../public/lib/source-chart-guide.js';
import { renderSourceStudyCharts } from '../public/source-charts.js';

test('every source-table chart uses real fields and renders from its own NASA table', async () => {
  assert.equal(SOURCE_STUDY_CHARTS.length, 16);
  const studyIds = [...new Set(SOURCE_STUDY_CHARTS.map(({ studyId }) => studyId))];
  let renderedCharts = 0;

  for (const studyId of studyIds) {
    const table = await challengeEvidenceTable(studyId);
    assert.ok(table, `missing bundled table ${studyId}`);
    const configs = SOURCE_STUDY_CHARTS.filter((chart) => chart.studyId === studyId);
    for (const chart of configs) {
      assert.ok(table.headers.includes(chart.xField), `${chart.id} x field is absent from ${studyId}`);
      assert.ok(table.headers.includes(chart.yField), `${chart.id} y field is absent from ${studyId}`);
    }

    const html = renderSourceStudyCharts(studyId, table.rows, 'en', table.sourceUrl);
    for (const chart of configs) {
      assert.ok(html.includes(`data-source-chart="${chart.id}"`), `${chart.id} did not render`);
      assert.ok(html.includes('data-chart-panel'), `${chart.id} is not interactive`);
      renderedCharts++;
    }
  }

  assert.equal(renderedCharts, 16);
});

test('tables without numeric plots remain documented rather than silently dropped', () => {
  assert.deepEqual(Object.keys(SOURCE_STUDY_NO_PLOT_REASON).sort(), [
    'PSI-100',
    'PSI-26',
    'PSI-47',
    'PSI-68',
    'PSI-99',
  ]);
  for (const reason of Object.values(SOURCE_STUDY_NO_PLOT_REASON)) {
    assert.ok(reason.en.trim());
    assert.ok(reason.ar.trim());
  }
});
