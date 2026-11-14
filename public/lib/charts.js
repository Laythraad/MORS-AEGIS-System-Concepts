import { esc } from './dom.js';
// Dependency-free inline SVG charts.
export function chartSVG(rows, key, label, unit, color = '#258cb4') {
  const vals = rows.map((r) => r[key]).filter(Number.isFinite);
  if (!vals.length) return `<div class="empty">No measured values for ${label}.</div>`;
  const w = 640,
    h = 210,
    p = { l: 48, r: 12, t: 16, b: 38 },
    min = Math.min(0, ...vals),
    max = Math.max(...vals) * 1.12 || 1,
    xx = (i) => p.l + (i * (w - p.l - p.r)) / Math.max(1, rows.length - 1),
    yy = (v) => h - p.b - ((v - min) / (max - min)) * (h - p.t - p.b);
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} in ${unit}"><g stroke="var(--line)" stroke-width="1"><line x1="${p.l}" y1="${h - p.b}" x2="${w - p.r}" y2="${h - p.b}"/><line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${h - p.b}"/><line x1="${p.l}" y1="${yy(max * 0.5)}" x2="${w - p.r}" y2="${yy(max * 0.5)}" stroke-dasharray="3 4"/></g><text x="5" y="15" fill="var(--muted)" font-size="9">${esc(label)} (${esc(unit)})</text>${rows.map((r, i) => (Number.isFinite(r[key]) ? `<circle cx="${xx(i)}" cy="${yy(Number(r[key]))}" r="4.2" fill="${color}"><title>${esc(r.id || r.test)} · ${Number(r[key]).toFixed(3)} ${unit}</title></circle>` : '')).join('')}<text x="${p.l}" y="${h - 9}" fill="var(--muted)" font-size="9">${esc(rows[0].id || rows[0].date || 'Record 1')}</text><text x="${w - p.r}" y="${h - 9}" text-anchor="end" fill="var(--muted)" font-size="9">${esc(rows.at(-1).id || rows.at(-1).date || 'Record ' + rows.length)}</text><text x="${p.l - 8}" y="${yy(max * 0.5) + 3}" text-anchor="end" fill="var(--muted)" font-size="9">${(max * 0.5).toFixed(2)}</text><text x="${p.l - 8}" y="${yy(min) + 3}" text-anchor="end" fill="var(--muted)" font-size="9">${min.toFixed(2)}</text></svg>`;
}

// PSI-69 only: retain the original test rows and put oxygen fraction against
// NASA's droplet d²-law burning-rate constant. This is descriptive, not causal.
export function flexOxygenScatterSVG(rows, labelX, labelY) {
  const points = rows.filter((r) => Number.isFinite(r.oxygen_mole_fraction) && Number.isFinite(r.burning_rate_mm_s));
  if (!points.length) return `<div class="empty">No rows have both oxygen fraction and burning-rate values.</div>`;
  const w = 760,
    h = 300,
    p = { l: 64, r: 20, t: 24, b: 52 };
  const xs = points.map((r) => r.oxygen_mole_fraction * 100);
  const ys = points.map((r) => r.burning_rate_mm_s);
  const xmin = Math.min(...xs),
    xmax = Math.max(...xs),
    ymin = Math.min(0, ...ys),
    ymax = Math.max(...ys) * 1.08 || 1;
  const dx = xmax - xmin || 1;
  const xx = (v) => p.l + ((v - xmin) / dx) * (w - p.l - p.r);
  const yy = (v) => h - p.b - ((v - ymin) / (ymax - ymin || 1)) * (h - p.t - p.b);
  const ticks = 4;
  const grid = Array.from({ length: ticks + 1 }, (_, i) => {
    const y = ymin + ((ymax - ymin) * i) / ticks;
    return `<line x1="${p.l}" y1="${yy(y)}" x2="${w - p.r}" y2="${yy(y)}" stroke="var(--line)"/><text x="${p.l - 9}" y="${yy(y) + 3}" text-anchor="end" fill="var(--muted)" font-size="10">${y.toFixed(2)}</text>`;
  }).join('');
  const circles = points
    .map((r) => {
      const x = r.oxygen_mole_fraction * 100,
        y = r.burning_rate_mm_s;
      const color = r.test_end === 'Extinction' ? '#39a77e' : r.test_end === 'Disruption' ? '#d59a3d' : '#7d73d3';
      return `<circle cx="${xx(x)}" cy="${yy(y)}" r="4.2" fill="${color}" fill-opacity=".8" stroke="var(--surface)" stroke-width="1"><title>${esc(r.id)} · ${esc(r.fuel)} · O₂ ${x.toFixed(1)}% · K ${y.toFixed(3)} mm²/s · ${esc(r.pressure_mmHg ?? '—')} mmHg · ${esc(r.test_end)}</title></circle>`;
    })
    .join('');
  return `<svg class="chart flex-scatter" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(labelX)} against ${esc(labelY)}"><g>${grid}</g><line x1="${p.l}" y1="${h - p.b}" x2="${w - p.r}" y2="${h - p.b}" stroke="var(--muted)"/><line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${h - p.b}" stroke="var(--muted)"/>${circles}<text x="${(p.l + w - p.r) / 2}" y="${h - 12}" text-anchor="middle" fill="var(--muted)" font-size="11">${esc(labelX)}</text><text transform="translate(16 ${(p.t + h - p.b) / 2}) rotate(-90)" text-anchor="middle" fill="var(--muted)" font-size="11">${esc(labelY)}</text><text x="${xx(xmin)}" y="${h - p.b + 19}" text-anchor="middle" fill="var(--muted)" font-size="10">${xmin.toFixed(1)}%</text><text x="${xx(xmax)}" y="${h - p.b + 19}" text-anchor="middle" fill="var(--muted)" font-size="10">${xmax.toFixed(1)}%</text></svg>`;
}
