import { esc } from './dom.js';

const NS = 'http://www.w3.org/2000/svg';
const COLORS = ['#1688be', '#d59a3d', '#39a77e', '#7d73d3', '#d36d7c', '#5077a8'];

function linearFit(points) {
  if (points.length < 3) return null;
  const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  const variance = points.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
  if (!variance) return null;
  const slope = points.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0) / variance;
  const intercept = meanY - slope * meanX;
  const total = points.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0);
  const residual = points.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
  return { slope, intercept, r2: total ? 1 - residual / total : 1 };
}

function tick(value, digits = 3) {
  return Number(value.toFixed(digits)).toString();
}

export function shouldDismissChartTooltip(pointerType, pinned) {
  return pointerType !== 'touch' && !pinned;
}

export function chartTooltipPosition({ clientX, clientY, viewportRect, tooltipRect, offset = 12, padding = 4 }) {
  const availableWidth = Math.max(0, viewportRect.width - padding * 2);
  const availableHeight = Math.max(0, viewportRect.height - padding * 2);
  const width = Math.min(tooltipRect.width || 240, availableWidth);
  const height = Math.min(tooltipRect.height || 64, availableHeight);
  const relativeX = clientX - viewportRect.left;
  const relativeY = clientY - viewportRect.top;
  let left = relativeX + offset;
  let top = relativeY + offset;
  if (left + width > viewportRect.width - padding) left = relativeX - width - offset;
  if (top + height > viewportRect.height - padding) top = relativeY - height - offset;
  return {
    left: Math.max(padding, Math.min(viewportRect.width - width - padding, left)),
    top: Math.max(padding, Math.min(viewportRect.height - height - padding, top)),
  };
}

export function scientificScatter({
  rows,
  xKey,
  yKey,
  xLabel,
  yLabel,
  xUnit = '',
  yUnit = '',
  xFactor = 1,
  yFactor = 1,
  groupKey = 'fuel',
  labels,
}) {
  const points = rows
    .filter((row) => Number.isFinite(row[xKey]) && Number.isFinite(row[yKey]))
    .map((row) => ({
      row,
      x: row[xKey] * xFactor,
      y: row[yKey] * yFactor,
      group: String(row[groupKey] || 'Unreported'),
    }));
  if (!points.length) return '<div class="empty">No source rows contain both measurements.</div>';

  const base = { x: 0, y: 0, width: 800, height: 400 };
  const plot = { left: 86, right: 26, top: 24, bottom: 67 };
  const xMin = Math.min(...points.map((point) => point.x));
  const xMax = Math.max(...points.map((point) => point.x));
  const yMin = Math.min(0, ...points.map((point) => point.y));
  const yMax = Math.max(...points.map((point) => point.y));
  const xPad = (xMax - xMin) * 0.04 || Math.max(Math.abs(xMin) * 0.04, 0.01);
  const yPad = (yMax - yMin) * 0.06 || Math.max(Math.abs(yMax) * 0.06, 0.01);
  const domain = { xMin: xMin - xPad, xMax: xMax + xPad, yMin, yMax: yMax + yPad };
  const sx = (value) =>
    plot.left + ((value - domain.xMin) / (domain.xMax - domain.xMin)) * (base.width - plot.left - plot.right);
  const sy = (value) =>
    base.height -
    plot.bottom -
    ((value - domain.yMin) / (domain.yMax - domain.yMin || 1)) * (base.height - plot.top - plot.bottom);
  const groups = [...new Set(points.map((point) => point.group))];
  const colorByGroup = new Map(groups.map((group, index) => [group, COLORS[index % COLORS.length]]));
  const fits = groups.map((group) => [group, linearFit(points.filter((point) => point.group === group))]);
  const grid = Array.from({ length: 6 }, (_, index) => {
    const x = domain.xMin + ((domain.xMax - domain.xMin) * index) / 5;
    const y = domain.yMin + ((domain.yMax - domain.yMin) * index) / 5;
    return `<line x1="${sx(x)}" y1="${plot.top}" x2="${sx(x)}" y2="${base.height - plot.bottom}" class="chart-gridline"/><line x1="${plot.left}" y1="${sy(y)}" x2="${base.width - plot.right}" y2="${sy(y)}" class="chart-gridline"/><text x="${sx(x)}" y="${base.height - plot.bottom + 19}" class="chart-tick" text-anchor="middle">${tick(x)}</text><text x="${plot.left - 10}" y="${sy(y) + 4}" class="chart-tick" text-anchor="end">${tick(y)}</text>`;
  }).join('');
  const marks = points
    .map(({ row, x, y, group }) => {
      const info = `${row.id || `Test ${row.test}`} · ${row.fuel || 'Fuel unreported'} · ${xLabel}: ${tick(x)} ${xUnit} · ${yLabel}: ${tick(y)} ${yUnit} · O₂ ${(row.oxygen_mole_fraction * 100).toFixed(1)}% · ${row.pressure_mmHg ?? '—'} mmHg · ${row.test_end || 'End state unreported'}`;
      return `<circle class="chart-point" cx="${sx(x)}" cy="${sy(y)}" r="5" fill="${colorByGroup.get(group)}" fill-opacity=".82" tabindex="0" role="button" aria-label="${esc(info)}" data-info="${esc(info)}"><title>${esc(info)}</title></circle>`;
    })
    .join('');
  const legend = groups
    .map((group) => `<span><i style="--legend-color:${colorByGroup.get(group)}"></i>${esc(group)}</span>`)
    .join('');
  const fitted = fits.filter(([, fit]) => fit);
  const fitSummary = fitted.length
    ? `${labels.fit}: ${fitted.map(([group, fit]) => `${group}: y = ${tick(fit.intercept)} + ${tick(fit.slope)}x, R² = ${fit.r2.toFixed(3)} (n=${points.filter((point) => point.group === group).length})`).join(' · ')}`
    : `${labels.fitUnavailable}`;
  const trend = fitted
    .map(
      ([group, fit]) =>
        `<line class="chart-trendline" stroke="${colorByGroup.get(group)}" x1="${sx(domain.xMin)}" y1="${sy(fit.intercept + fit.slope * domain.xMin)}" x2="${sx(domain.xMax)}" y2="${sy(fit.intercept + fit.slope * domain.xMax)}" visibility="hidden"/>`,
    )
    .join('');

  return `<section class="scientific-chart" data-chart-panel><div class="chart-toolbar" role="group" aria-label="${esc(labels.controls)}"><button type="button" data-chart-action="zoom-in" aria-label="${esc(labels.zoomIn)}">＋</button><button type="button" data-chart-action="zoom-out" aria-label="${esc(labels.zoomOut)}">−</button><button type="button" data-chart-action="reset">${esc(labels.reset)}</button>${fitted.length ? `<button type="button" data-chart-action="fit" aria-pressed="false">${esc(labels.fitLine)}</button>` : ''}<button type="button" data-chart-action="draw" aria-pressed="false" data-idle-label="${esc(labels.drawLine)}" data-active-label="${esc(labels.drawLineActive)}">${esc(labels.drawLine)}</button><button type="button" data-chart-action="undo">${esc(labels.undo)}</button></div><p class="chart-interaction-hint">${esc(labels.interactionHint || '')}</p><div class="chart-viewport"><svg class="scientific-plot" viewBox="${base.x} ${base.y} ${base.width} ${base.height}" role="group" aria-label="${esc(`${xLabel} versus ${yLabel}`)}"><g class="chart-grid">${grid}</g><line x1="${plot.left}" y1="${base.height - plot.bottom}" x2="${base.width - plot.right}" y2="${base.height - plot.bottom}" class="chart-axis"/><line x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${base.height - plot.bottom}" class="chart-axis"/><g class="chart-trend">${trend}</g><g class="chart-annotations"></g><g>${marks}</g><text x="${(plot.left + base.width - plot.right) / 2}" y="${base.height - 12}" class="chart-axis-label" text-anchor="middle">${esc(xLabel)}${xUnit ? ` (${esc(xUnit)})` : ''}</text><text transform="translate(18 ${(plot.top + base.height - plot.bottom) / 2}) rotate(-90)" class="chart-axis-label" text-anchor="middle">${esc(yLabel)}${yUnit ? ` (${esc(yUnit)})` : ''}</text></svg><div class="chart-tooltip" role="status" aria-live="polite" hidden></div></div><div class="chart-legend">${legend}</div><p class="sub chart-caption">${esc(labels.rows)}: n=${points.length}/${rows.length} · ${esc(labels.fitNote)} ${esc(fitSummary)}</p></section>`;
}

export function bindInteractiveCharts(root) {
  root.querySelectorAll('[data-chart-panel]').forEach((panel) => {
    if (panel.dataset.bound === 'true') return;
    panel.dataset.bound = 'true';
    const svg = panel.querySelector('svg');
    const tooltip = panel.querySelector('.chart-tooltip');
    const initial = svg.viewBox.baseVal;
    const original = { x: initial.x, y: initial.y, width: initial.width, height: initial.height };
    const annotations = svg.querySelector('.chart-annotations');
    let drawing = false;
    let drag = null;
    let lineStart = null;
    let tooltipPinned = false;
    const view = () => svg.viewBox.baseVal;
    const setView = (next) => svg.setAttribute('viewBox', `${next.x} ${next.y} ${next.width} ${next.height}`);
    const showPoint = (mark, event) => {
      tooltip.textContent = mark.dataset.info;
      tooltip.hidden = false;
      const box = panel.querySelector('.chart-viewport').getBoundingClientRect();
      const keyboardClick = event.type === 'click' && event.detail === 0;
      const bounds = chartTooltipPosition({
        clientX: keyboardClick ? box.left + box.width / 2 : event.clientX,
        clientY: keyboardClick ? box.top + box.height / 2 : event.clientY,
        viewportRect: box,
        tooltipRect: tooltip.getBoundingClientRect(),
      });
      tooltip.style.left = `${bounds.left}px`;
      tooltip.style.top = `${bounds.top}px`;
    };
    const point = (event) => {
      const p = svg.createSVGPoint();
      p.x = event.clientX;
      p.y = event.clientY;
      return p.matrixTransform(svg.getScreenCTM().inverse());
    };
    const zoom = (factor, anchorX = view().x + view().width / 2, anchorY = view().y + view().height / 2) => {
      const current = view();
      const width = Math.max(100, Math.min(original.width * 8, current.width * factor));
      const height = Math.max(70, Math.min(original.height * 8, current.height * factor));
      const rx = (anchorX - current.x) / current.width;
      const ry = (anchorY - current.y) / current.height;
      setView({ x: anchorX - width * rx, y: anchorY - height * ry, width, height });
    };
    panel.querySelectorAll('[data-chart-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.chartAction;
        if (action === 'zoom-in') zoom(0.78);
        if (action === 'zoom-out') zoom(1.28);
        if (action === 'reset') setView(original);
        if (action === 'fit') {
          const lines = [...svg.querySelectorAll('.chart-trendline')];
          const visible = lines.some((line) => line.getAttribute('visibility') !== 'visible');
          lines.forEach((line) => line.setAttribute('visibility', visible ? 'visible' : 'hidden'));
          button.setAttribute('aria-pressed', String(visible));
        }
        if (action === 'draw') {
          drawing = !drawing;
          button.setAttribute('aria-pressed', String(drawing));
          button.textContent = drawing ? button.dataset.activeLabel : button.dataset.idleLabel;
          svg.classList.toggle('drawing-line', drawing);
          lineStart = null;
        }
        if (action === 'undo') annotations.lastElementChild?.remove();
      });
    });
    svg.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        const p = point(event);
        zoom(event.deltaY < 0 ? 0.88 : 1.14, p.x, p.y);
      },
      { passive: false },
    );
    svg.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.chart-point')) {
        tooltipPinned = true;
        showPoint(event.target.closest('.chart-point'), event);
        return;
      }
      tooltipPinned = false;
      tooltip.hidden = true;
      const p = point(event);
      if (drawing) {
        lineStart = p;
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('class', 'chart-user-line');
        line.setAttribute('x1', p.x);
        line.setAttribute('y1', p.y);
        line.setAttribute('x2', p.x);
        line.setAttribute('y2', p.y);
        annotations.append(line);
        drag = { kind: 'draw', pointerId: event.pointerId, line };
      } else {
        drag = { kind: 'pan', pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: { ...view() } };
      }
      svg.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    svg.addEventListener('pointermove', (event) => {
      const mark = event.target.closest?.('.chart-point');
      if (mark && event.pointerType !== 'touch') {
        tooltipPinned = false;
        showPoint(mark, event);
      }
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (drag.kind === 'draw') {
        const p = point(event);
        drag.line.setAttribute('x2', p.x);
        drag.line.setAttribute('y2', p.y);
      } else {
        const rect = svg.getBoundingClientRect();
        const dx = ((event.clientX - drag.x) * drag.view.width) / rect.width;
        const dy = ((event.clientY - drag.y) * drag.view.height) / rect.height;
        setView({ ...drag.view, x: drag.view.x - dx, y: drag.view.y - dy });
        if (tooltip) tooltip.hidden = true;
      }
    });
    const stop = (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (drag.kind === 'draw' && lineStart) {
        const end = point(event);
        if (Math.hypot(end.x - lineStart.x, end.y - lineStart.y) < 4) drag.line.remove();
      }
      drag = null;
      lineStart = null;
    };
    svg.addEventListener('pointerup', stop);
    svg.addEventListener('pointercancel', stop);
    svg.addEventListener('click', (event) => {
      const mark = event.target.closest?.('.chart-point');
      if (!mark) return;
      tooltipPinned = true;
      showPoint(mark, event);
    });
    svg.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      tooltipPinned = false;
      tooltip.hidden = true;
    });
    svg.addEventListener('pointerleave', (event) => {
      if (tooltip && shouldDismissChartTooltip(event.pointerType, tooltipPinned)) tooltip.hidden = true;
    });
  });
}
