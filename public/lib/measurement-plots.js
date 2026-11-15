import { esc } from './dom.js';

const FIELDS = [
  { key: 'oxygen_mole_fraction', en: 'Oxygen mole fraction', ar: 'الكسر المولي للأكسجين', unit: '%', scale: 100 },
  { key: 'pressure_mmHg', en: 'Ambient pressure', ar: 'الضغط المحيط', unit: 'mmHg', scale: 1 },
  { key: 'initial_droplet_diameter_mm', en: 'Initial droplet diameter', ar: 'قطر القطرة الابتدائي', unit: 'mm', scale: 1 },
  { key: 'visible_flame_extinction_diameter_mm', en: 'Visible flame extinction diameter', ar: 'قطر انطفاء اللهب المرئي', unit: 'mm', scale: 1 },
  { key: 'burning_rate_mm_s', en: 'Droplet burning-rate constant', ar: 'ثابت معدل احتراق القطرة', unit: 'mm²/s', scale: 1 },
  { key: 'burn_time_s', en: 'Burn duration', ar: 'مدة الاحتراق', unit: 's', scale: 1 },
];

const fieldLabel = (field, ar) => `${ar ? field.ar : field.en} · ${field.unit}`;
const optionMarkup = (ar, selected) => FIELDS.map((field) => `<option value="${field.key}"${field.key === selected ? ' selected' : ''}>${esc(fieldLabel(field, ar))}</option>`).join('');

export function measurementPlotStudioMarkup(lang = 'en') {
  const ar = lang === 'ar';
  return `<section class="measurement-plot-studio card" data-measurement-plot-studio>
    <div class="card-head"><div><span class="eyebrow">NASA PSI-69 · FLEX</span><h2>${ar ? 'استوديو رسم القياسات' : 'Measurement Plot Studio'}</h2><p class="sub">${ar ? 'ارسم القياسات الخام بمحاور تختارها، وافحص كل نقطة. لا ندمج أنواع الوقود أو ظروف الاختبار بصمت.' : 'Plot measured source rows on axes you choose and inspect every point. Fuel and test conditions are never silently pooled.'}</p></div><span class="tag obs">${ar ? 'قياسات مرصودة' : 'OBSERVED MEASUREMENTS'}</span></div>
    <div class="toolbar plot-studio-controls">
      <label>${ar ? 'المحور الأفقي' : 'X axis'}<select data-plot-x>${optionMarkup(ar, 'oxygen_mole_fraction')}</select></label>
      <label>${ar ? 'المحور العمودي' : 'Y axis'}<select data-plot-y>${optionMarkup(ar, 'burning_rate_mm_s')}</select></label>
      <label>${ar ? 'الوقود' : 'Fuel'}<select data-plot-fuel><option value="">${ar ? 'كل أنواع الوقود' : 'All fuels'}</option></select></label>
      <label>${ar ? 'النتيجة' : 'Test outcome'}<select data-plot-outcome><option value="">${ar ? 'كل النتائج' : 'All outcomes'}</option></select></label>
      <label class="plot-fit-toggle"><input type="checkbox" data-plot-fit> ${ar ? 'خط ملاءمة وصفي' : 'Descriptive linear fit'}</label>
      <div class="plot-zoom-controls"><button type="button" class="outline-btn" data-plot-action="zoom-in" aria-label="${ar ? 'تكبير' : 'Zoom in'}">＋</button><button type="button" class="outline-btn" data-plot-action="zoom-out" aria-label="${ar ? 'تصغير' : 'Zoom out'}">−</button><button type="button" class="outline-btn" data-plot-action="reset">${ar ? 'إعادة المقياس' : 'Reset scale'}</button></div>
    </div>
    <div class="measurement-plot" data-measurement-plot role="region" aria-label="${ar ? 'مخطط قياسات FLEX تفاعلي' : 'Interactive FLEX measurements plot'}"></div>
    <p class="sub" data-plot-summary aria-live="polite"></p>
    <div class="callout warn">${ar ? 'تسميات المحاور والوحدات من جدول NASA PSI-69. خط الملاءمة يحسب بطريقة المربعات الصغرى للاستكشاف فقط؛ اختلاف الضغط وتركيب الغاز وحجم القطرة يمنع تفسيره كأثر سببي أو قانون عام. هذه قياسات احتراق قطرات، وليست سرعة انتشار حريق مادة صلبة.' : 'Axis names and units follow the NASA PSI-69 table. The least-squares fit is exploratory only; varying pressure, gas composition, and droplet size prevent causal or universal interpretation. These are droplet-combustion measurements, not solid-material flame-spread speeds.'} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-69" target="_blank" rel="noreferrer">NASA PSI-69 ↗</a></div>
  </section>
  <section class="evidence-tree card" aria-labelledby="evidence-tree-title"><div class="card-head"><div><span class="eyebrow">TRACEABLE INTERPRETATION</span><h2 id="evidence-tree-title">${ar ? 'شجرة انتقال الدليل' : 'Evidence-to-claim tree'}</h2><p class="sub">${ar ? 'كل استنتاج يسير عبر شروط واضحة من القياس إلى حدود التعميم.' : 'Every conclusion follows explicit steps from measurements to the limits of generalization.'}</p></div></div><div class="evidence-tree-root">${ar ? 'مصدر NASA PSI-69 · تجارب FLEX' : 'NASA PSI-69 · FLEX experiments'}</div><div class="evidence-tree-branches"><article><b>${ar ? 'ظروف الاختبار' : 'Test conditions'}</b><span>${ar ? 'وقود · O₂/N₂/CO₂/He · ضغط · حجم القطرة' : 'Fuel · O₂/N₂/CO₂/He · pressure · droplet size'}</span></article><article><b>${ar ? 'قياسات المصدر' : 'Source measurements'}</b><span>${ar ? 'قطر اللهب المرئي · ثابت الاحتراق · زمن الاحتراق · النتيجة' : 'Visible flame diameter · burning-rate constant · burn time · outcome'}</span></article></div><div class="evidence-tree-leaves"><article><b>${ar ? 'يجوز وصفه' : 'Supported description'}</b><span>${ar ? 'توزيع الصفوف والعلاقات داخل الشروط المعلنة' : 'Distributions and associations within stated conditions'}</span></article><article class="warn-leaf"><b>${ar ? 'لا يجوز استنتاجه' : 'Not established'}</b><span>${ar ? 'سببية مؤكدة · احتمال خطر عام · سلوك كل لهب أو مهمة فضائية' : 'Causation · universal hazard probability · behavior of every flame or mission'}</span></article></div></section>`;
}

export function bindMeasurementPlotStudio(root, rows, lang = 'en') {
  const studio = root.querySelector('[data-measurement-plot-studio]');
  if (!studio || !Array.isArray(rows)) return;
  const ar = lang === 'ar';
  const xSelect = studio.querySelector('[data-plot-x]');
  const ySelect = studio.querySelector('[data-plot-y]');
  const fuelSelect = studio.querySelector('[data-plot-fuel]');
  const outcomeSelect = studio.querySelector('[data-plot-outcome]');
  const fitToggle = studio.querySelector('[data-plot-fit]');
  const plot = studio.querySelector('[data-measurement-plot]');
  const summary = studio.querySelector('[data-plot-summary]');
  let zoom = 1;
  [...new Set(rows.map((row) => row.fuel).filter(Boolean))].sort().forEach((fuel) => fuelSelect.add(new Option(fuel, fuel)));
  [...new Set(rows.map((row) => row.test_end).filter(Boolean))].sort().forEach((outcome) => outcomeSelect.add(new Option(outcome, outcome)));

  const draw = () => {
    const xField = FIELDS.find((item) => item.key === xSelect.value);
    const yField = FIELDS.find((item) => item.key === ySelect.value);
    const filtered = rows.filter((row) => (!fuelSelect.value || row.fuel === fuelSelect.value) && (!outcomeSelect.value || row.test_end === outcomeSelect.value));
    const points = filtered.filter((row) => Number.isFinite(row[xField.key]) && Number.isFinite(row[yField.key])).map((row) => ({ row, x: row[xField.key] * xField.scale, y: row[yField.key] * yField.scale }));
    if (points.length < 2) {
      plot.innerHTML = `<div class="empty">${ar ? 'لا توجد صفوف كافية تحتوي القيمتين المختارتين.' : 'Not enough source rows contain both selected measurements.'}</div>`;
      summary.textContent = `${ar ? 'صفوف صالحة' : 'Valid rows'}: n=${points.length}/${filtered.length}`;
      return;
    }
    const width = 820, height = 440, p = { left: 82, right: 24, top: 24, bottom: 70 };
    const xmin = Math.min(...points.map((item) => item.x)), xmax = Math.max(...points.map((item) => item.x));
    const ymin = Math.min(...points.map((item) => item.y)), ymax = Math.max(...points.map((item) => item.y));
    const xpad = (xmax - xmin) * .06 || Math.max(Math.abs(xmin) * .06, .01);
    const ypad = (ymax - ymin) * .08 || Math.max(Math.abs(ymin) * .08, .01);
    const xcenter=(xmin+xmax)/2, ycenter=(ymin+ymax)/2;
    const domain = { x0: xcenter-(xmax-xmin+2*xpad)/(2*zoom), x1: xcenter+(xmax-xmin+2*xpad)/(2*zoom), y0: ycenter-(ymax-ymin+2*ypad)/(2*zoom), y1: ycenter+(ymax-ymin+2*ypad)/(2*zoom) };
    const sx = (x) => p.left + (x - domain.x0) / (domain.x1 - domain.x0) * (width - p.left - p.right);
    const sy = (y) => height - p.bottom - (y - domain.y0) / (domain.y1 - domain.y0) * (height - p.top - p.bottom);
    const ticks = Array.from({ length: 6 }, (_, index) => index / 5);
    const grid = ticks.map((ratio) => {
      const x = domain.x0 + (domain.x1 - domain.x0) * ratio, y = domain.y0 + (domain.y1 - domain.y0) * ratio;
      return `<line x1="${sx(x)}" y1="${p.top}" x2="${sx(x)}" y2="${height-p.bottom}" class="chart-gridline"/><line x1="${p.left}" y1="${sy(y)}" x2="${width-p.right}" y2="${sy(y)}" class="chart-gridline"/><text x="${sx(x)}" y="${height-p.bottom+20}" class="chart-tick" text-anchor="middle">${Number(x.toPrecision(3))}</text><text x="${p.left-9}" y="${sy(y)+4}" class="chart-tick" text-anchor="end">${Number(y.toPrecision(3))}</text>`;
    }).join('');
    const groups = [...new Set(points.map(({ row }) => row.fuel || 'Unreported'))];
    const palette = ['#1688be','#d59a3d','#39a77e','#7d73d3','#d36d7c','#5077a8'];
    const colors = new Map(groups.map((group, index) => [group, palette[index % palette.length]]));
    const marks = points.map(({ row, x, y }) => {
      const details = `${row.id || `Test ${row.test}`} · ${row.fuel || 'Fuel unreported'} · ${fieldLabel(xField, ar)}: ${Number(x.toPrecision(5))} · ${fieldLabel(yField, ar)}: ${Number(y.toPrecision(5))} · O₂ ${(row.oxygen_mole_fraction * 100).toFixed(1)}% · ${row.pressure_mmHg ?? '—'} mmHg · ${row.test_end || 'Outcome unreported'}`;
      return `<circle cx="${sx(x)}" cy="${sy(y)}" r="5" fill="${colors.get(row.fuel || 'Unreported')}" fill-opacity=".82" tabindex="0" role="img" aria-label="${esc(details)}"><title>${esc(details)}</title></circle>`;
    }).join('');
    let fitMarkup = '', fitText = ar ? 'لم يحسب خط ملاءمة.' : 'No fit calculated.';
    if (fitToggle.checked) {
      const summaries = [];
      groups.forEach((group) => {
        const subset = points.filter(({ row }) => (row.fuel || 'Unreported') === group);
        if (subset.length < 3) return;
        const mx = subset.reduce((sum, point) => sum + point.x, 0) / subset.length;
        const my = subset.reduce((sum, point) => sum + point.y, 0) / subset.length;
        const variance = subset.reduce((sum, point) => sum + (point.x - mx) ** 2, 0);
        if (!variance) return;
        const slope = subset.reduce((sum, point) => sum + (point.x - mx) * (point.y - my), 0) / variance;
        const intercept = my - slope * mx;
        const total = subset.reduce((sum, point) => sum + (point.y - my) ** 2, 0);
        const residual = subset.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
        const r2 = total ? 1 - residual / total : 1;
        const groupMin = Math.min(...subset.map((point) => point.x)), groupMax = Math.max(...subset.map((point) => point.x));
        fitMarkup += `<line x1="${sx(groupMin)}" y1="${sy(intercept+slope*groupMin)}" x2="${sx(groupMax)}" y2="${sy(intercept+slope*groupMax)}" class="chart-trendline" stroke="${colors.get(group)}" visibility="visible"/>`;
        summaries.push(`${group}: R²=${r2.toFixed(3)} (n=${subset.length})`);
      });
      fitText = summaries.length ? `${ar ? 'ملاءمة OLS استكشافية حسب الوقود' : 'Exploratory OLS by fuel'} · ${summaries.join(' · ')}` : (ar ? 'لا تكفي 3 نقاط بوقود واحد لحساب الملاءمة.' : 'No fuel group has at least 3 points for a fit.');
    }
    const legend = groups.map((group) => `<span><i style="--legend-color:${colors.get(group)}"></i>${esc(group)}</span>`).join('');
    plot.innerHTML = `<div class="chart-legend">${legend}</div><svg class="measurement-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(fieldLabel(xField, ar))} versus ${esc(fieldLabel(yField, ar))}"><g>${grid}</g><line class="chart-axis" x1="${p.left}" y1="${height-p.bottom}" x2="${width-p.right}" y2="${height-p.bottom}"/><line class="chart-axis" x1="${p.left}" y1="${p.top}" x2="${p.left}" y2="${height-p.bottom}"/>${fitMarkup}${marks}<text x="${(p.left+width-p.right)/2}" y="${height-15}" class="chart-axis-label" text-anchor="middle">${esc(fieldLabel(xField, ar))}</text><text transform="translate(18 ${(p.top+height-p.bottom)/2}) rotate(-90)" class="chart-axis-label" text-anchor="middle">${esc(fieldLabel(yField, ar))}</text></svg>`;
    summary.textContent = `${ar ? 'صفوف صالحة' : 'Valid source rows'}: n=${points.length}/${filtered.length} · ${fitText}`;
  };
  [xSelect,ySelect,fuelSelect,outcomeSelect,fitToggle].forEach((control) => control.addEventListener('change', draw));
  studio.querySelectorAll('[data-plot-action]').forEach((button)=>button.addEventListener('click',()=>{const action=button.dataset.plotAction;zoom=action==='zoom-in'?Math.min(8,zoom*1.35):action==='zoom-out'?Math.max(.25,zoom/1.35):1;draw();}));
  draw();
}
