import test from 'node:test';
import assert from 'node:assert/strict';
import {
  chartTooltipPosition,
  clampChartView,
  bindInteractiveCharts,
  panChartView,
  pointerDeltaToChart,
  scientificScatter,
  shouldDismissChartTooltip,
  zoomChartView,
} from '../public/lib/interactive-charts.js';

class FakeElement {
  constructor(className = '') {
    this.className = className;
    this.dataset = {};
    this.style = {};
    this.hidden = false;
    this.textContent = '';
    this.attributes = {};
    this.listeners = new Map();
    this.children = [];
    this.classList = { toggle: () => {} };
  }

  addEventListener(type, callback) {
    this.listeners.set(type, [...(this.listeners.get(type) || []), callback]);
  }

  dispatch(type, properties = {}) {
    const event = { type, target: this, pointerType: 'mouse', ...properties };
    for (const callback of this.listeners.get(type) || []) callback(event);
    return event;
  }

  closest(selector) {
    return selector === '.chart-point' && this.className.split(' ').includes('chart-point') ? this : null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === 'viewBox') {
      const [x, y, width, height] = String(value).split(/\s+/).map(Number);
      this.viewBox.baseVal = { x, y, width, height };
    }
  }

  getAttribute(name) {
    return this.attributes[name] || null;
  }

  getBoundingClientRect() {
    return { left: 0, top: 0, width: this.className === 'chart-tooltip' ? 220 : 800, height: this.className === 'chart-tooltip' ? 80 : 400 };
  }

  createSVGPoint() {
    return { x: 0, y: 0, matrixTransform() { return { x: this.x, y: this.y }; } };
  }

  getScreenCTM() {
    return { inverse: () => ({}) };
  }

  setPointerCapture() {}

  append(element) {
    element.parent = this;
    this.children.push(element);
  }

  remove() {
    if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this);
  }

  get lastElementChild() {
    return this.children.at(-1) || null;
  }
}

function makeFakeChart() {
  const panel = new FakeElement('scientific-chart');
  const svg = new FakeElement('scientific-plot');
  svg.viewBox = { baseVal: { x: 0, y: 0, width: 800, height: 400 } };
  svg.querySelector = (selector) => selector === '.chart-annotations' ? annotations : null;
  svg.querySelectorAll = () => [];
  const annotations = new FakeElement('chart-annotations');
  const viewport = new FakeElement('chart-viewport');
  const tooltip = new FakeElement('chart-tooltip');
  const selection = new FakeElement('chart-selection');
  const selectionText = new FakeElement();
  const drawButton = new FakeElement();
  drawButton.dataset = { chartAction: 'draw', idleLabel: 'Draw', activeLabel: 'Drawing' };
  const undoButton = new FakeElement();
  undoButton.dataset = { chartAction: 'undo' };
  const zoomButton = new FakeElement();
  zoomButton.dataset = { chartAction: 'zoom-in' };
  const resetButton = new FakeElement();
  resetButton.dataset = { chartAction: 'reset' };
  const controls = [drawButton, undoButton, zoomButton, resetButton];
  panel.querySelector = (selector) => ({
    svg,
    '.chart-tooltip': tooltip,
    '.chart-selection': selection,
    '[data-chart-selection-text]': selectionText,
    '.chart-viewport': viewport,
  })[selector] || null;
  panel.querySelectorAll = (selector) => selector === '[data-chart-action]' ? controls : [];
  const root = { querySelectorAll: (selector) => selector === '[data-chart-panel]' ? [panel] : [] };
  return { root, panel, svg, tooltip, selection, selectionText, drawButton, undoButton, zoomButton, resetButton, annotations };
}

test('chart controls zoom, pan, reveal persistent source details, and draw an undoable guide line', () => {
  const priorDocument = globalThis.document;
  globalThis.document = { createElementNS: () => new FakeElement('chart-user-line') };
  try {
    const chart = makeFakeChart();
    bindInteractiveCharts(chart.root);

    chart.zoomButton.dispatch('click');
    assert.ok(chart.svg.viewBox.baseVal.width < 800);
    chart.resetButton.dispatch('click');
    assert.deepEqual(chart.svg.viewBox.baseVal, { x: 0, y: 0, width: 800, height: 400 });

    const point = new FakeElement('chart-point');
    point.dataset.info = 'PSI-69 · test 12 · O₂ 21%';
    chart.svg.dispatch('pointerdown', { target: point, pointerId: 1, clientX: 200, clientY: 100 });
    assert.equal(chart.selection.hidden, false);
    assert.equal(chart.selectionText.textContent, point.dataset.info);

    chart.zoomButton.dispatch('click');
    chart.svg.dispatch('pointerdown', { target: chart.svg, pointerId: 2, clientX: 400, clientY: 200, preventDefault() {} });
    chart.svg.dispatch('pointermove', { target: chart.svg, pointerId: 2, clientX: 300, clientY: 150 });
    assert.notDeepEqual(chart.svg.viewBox.baseVal, { x: 0, y: 0, width: 800, height: 400 });
    chart.svg.dispatch('pointerup', { target: chart.svg, pointerId: 2 });

    chart.drawButton.dispatch('click');
    chart.svg.dispatch('pointerdown', { target: chart.svg, pointerId: 3, clientX: 100, clientY: 100, preventDefault() {} });
    chart.svg.dispatch('pointermove', { target: chart.svg, pointerId: 3, clientX: 280, clientY: 220 });
    chart.svg.dispatch('pointerup', { target: chart.svg, pointerId: 3 });
    assert.equal(chart.annotations.children.length, 1);
    assert.equal(chart.annotations.children[0].getAttribute('x2'), '280');
    chart.undoButton.dispatch('click');
    assert.equal(chart.annotations.children.length, 0);
  } finally {
    if (priorDocument === undefined) delete globalThis.document;
    else globalThis.document = priorDocument;
  }
});

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

test('zoom preserves its pointer anchor and pan cannot lose the data off-canvas', () => {
  const original = { x: 0, y: 0, width: 800, height: 400 };
  const zoomed = zoomChartView(original, 0.5, 300, 200, original);
  assert.deepEqual(zoomed, { x: 150, y: 100, width: 400, height: 200 });
  assert.deepEqual(zoomChartView(zoomed, 2, 300, 200, original), original);
  assert.deepEqual(panChartView(zoomed, -1000, -1000, original), { ...zoomed, x: 0, y: 0 });
  assert.deepEqual(panChartView(zoomed, 1000, 1000, original), { ...zoomed, x: 400, y: 200 });
  assert.deepEqual(clampChartView({ x: 900, y: 900, width: 1, height: 1 }, original), {
    x: 700,
    y: 350,
    width: 100,
    height: 50,
  });
});

test('pan maps pointer movement through the SVG aspect-ratio letterboxing', () => {
  assert.deepEqual(
    pointerDeltaToChart({ deltaX: 0, deltaY: 17.5, rect: { width: 350, height: 210 }, view: { width: 800, height: 400 } }),
    { x: 0, y: 40 },
  );
  assert.deepEqual(
    pointerDeltaToChart({ deltaX: 100, deltaY: 50, rect: { width: 800, height: 400 }, view: { width: 800, height: 400 } }),
    { x: 100, y: 50 },
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
  assert.match(html, /class="chart-selection"/);
  assert.match(html, /data-chart-selection-text/);
});
