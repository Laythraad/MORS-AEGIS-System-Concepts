import test from 'node:test';
import assert from 'node:assert/strict';
import { chartTooltipPosition, scientificScatter, shouldDismissChartTooltip } from '../public/lib/interactive-charts.js';

test('touch and selected-point details stay open until the user moves to another chart action', () => {
  assert.equal(shouldDismissChartTooltip('touch', false), false);
  assert.equal(shouldDismissChartTooltip('touch', true), false);
  assert.equal(shouldDismissChartTooltip('mouse', true), false);
  assert.equal(shouldDismissChartTooltip('mouse', false), true);
});

test('point details remain inside the chart viewport near each edge', () => {
  const viewportRect = { left: 10, top: 20, width: 500, height: 300 };
  const tooltipRect = { width: 280, height: 60 };
  assert.deepEqual(
    chartTooltipPosition({ clientX: 460, clientY: 290, viewportRect, tooltipRect }),
    { left: 158, top: 198 },
  );
  assert.deepEqual(
    chartTooltipPosition({
      clientX: 15,
      clientY: 25,
      viewportRect,
      tooltipRect: { width: 140, height: 50 },
    }),
    { left: 17, top: 17 },
  );
});

test('scatter points expose keyboard focus and the plot explains its controls', () => {
  const labels = Object.fromEntries(
    [
      'controls', 'zoomIn', 'zoomOut', 'reset', 'fitLine', 'drawLine', 'drawLineActive',
      'undo', 'fit', 'fitUnavailable', 'fitNote', 'rows', 'interactionHint',
    ].map((key) => [key, key]),
  );
  const html = scientificScatter({
    rows: [
      { id: 'A', test: 1, fuel: 'Heptane', oxygen_mole_fraction: 0.21, burning_rate_mm_s: 0.4, pressure_mmHg: 760 },
      { id: 'B', test: 2, fuel: 'Heptane', oxygen_mole_fraction: 0.25, burning_rate_mm_s: 0.5, pressure_mmHg: 760 },
      { id: 'C', test: 3, fuel: 'Heptane', oxygen_mole_fraction: 0.3, burning_rate_mm_s: 0.6, pressure_mmHg: 760 },
    ],
    xKey: 'oxygen_mole_fraction',
    yKey: 'burning_rate_mm_s',
    xLabel: 'Oxygen fraction',
    yLabel: 'Burning rate',
    xUnit: '1',
    yUnit: 'mm²/s',
    labels,
  });

  assert.equal((html.match(/role="button"/g) || []).length, 3);
  assert.match(html, /class="chart-interaction-hint"[^>]*>interactionHint</);
  assert.match(html, /aria-live="polite"/);
});
