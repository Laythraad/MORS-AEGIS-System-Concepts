import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { FLEX_CHART_GUIDE } from '../public/lib/chart-guide.js';

const app = await readFile(new URL('../public/app.js', import.meta.url), 'utf8');

test('the chart guide documents every PSI-69 Workbench plot in English and Arabic', () => {
  assert.equal(FLEX_CHART_GUIDE.length, 6);
  assert.equal(new Set(FLEX_CHART_GUIDE.map(({ id }) => id)).size, 6);
  for (const chart of FLEX_CHART_GUIDE) {
    assert.ok(chart.id && chart.xKey && chart.yKey && chart.xUnit && chart.yUnit);
    for (const copy of ['title', 'xLabel', 'yLabel', 'question', 'use', 'limit']) {
      assert.ok(chart[copy]?.en?.trim(), `${chart.id} needs English ${copy}`);
      assert.ok(chart[copy]?.ar?.trim(), `${chart.id} needs Arabic ${copy}`);
    }
  }
});

test('the dedicated chart-guide page includes both Overview views and all interactive plots', () => {
  assert.match(app, /\['Chart Guide', 'Chart purposes, variables & limits'/);
  assert.match(app, /'Chart Guide': chartGuidePage/);
  assert.match(app, /chartSVG\(dataset\.rows, 'burning_rate_mm_s'/);
  assert.match(app, /\$\{flexScatterPanel\(\)\}/);
  assert.match(app, /scientificChartGallery\(dataset\.rows, \{ explain: true \}\)/);
  assert.match(app, /if \(name === 'Overview' \|\| name === 'Chart Guide'\) bindFlexScatter\(c\)/);
  assert.match(app, /NASA PSI-69 · DOI 10\.60555\/mbq8-0451/);
});
