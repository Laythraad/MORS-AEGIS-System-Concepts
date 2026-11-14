import { esc } from './lib/dom.js';
import { get } from './lib/api.js';
import { chartControlLabels, scientificSourceScatter } from './lib/interactive-charts.js';
import { SOURCE_STUDY_CHARTS, SOURCE_STUDY_NO_PLOT_REASON, sourceChartsForStudy } from './lib/source-chart-guide.js';

const tableCache = new Map();

export function loadStudyTable(id) {
  if (!tableCache.has(id)) {
    tableCache.set(id, get('/api/challenge/table?id=' + encodeURIComponent(id)));
  }
  return tableCache.get(id);
}

function parseSourceNumber(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function sourceLabel(row, index, config, lang) {
  const sourceRow = (lang === 'ar' ? 'صف المصدر ' : 'Source row ') + (index + 1);
  const identity = config.rowIdField && row[config.rowIdField]
    ? sourceRow + ' · ' + config.rowIdField + ': ' + String(row[config.rowIdField])
    : sourceRow;
  const fields = (config.detailFields || [])
    .filter((field) => row[field] !== null && row[field] !== undefined && String(row[field]).trim() !== '')
    .map((field) => field + ': ' + String(row[field]));
  return [identity].concat(fields).join(' · ');
}

function sourcePlotData(rows, config, lang) {
  const filtered = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => config.rowFilter !== 'sample-only' || /^S\d+$/i.test(String(row['Sample Number'] || '')));
  const valid = [];
  for (const { row, index } of filtered) {
    const category = config.xCategory ? String(row[config.xField] ?? '').trim() : null;
    const x = config.xCategory ? null : parseSourceNumber(row[config.xField]);
    const y = parseSourceNumber(row[config.yField]);
    if ((!config.xCategory && x === null) || (config.xCategory && !category) || y === null) continue;
    valid.push({
      rawX: config.xCategory ? category : x,
      x,
      y,
      group: config.groupField ? String(row[config.groupField] || 'Unreported') : '',
      label: sourceLabel(row, index, config, lang),
    });
  }
  let entries = valid;
  if (config.aggregateDuplicates) {
    const merged = new Map();
    for (const record of valid) {
      const key = JSON.stringify([record.rawX, record.y, record.group]);
      const current = merged.get(key) || { ...record, count: 0, labels: [] };
      current.count += 1;
      if (current.labels.length < 6) current.labels.push(record.label);
      merged.set(key, current);
    }
    entries = [...merged.values()];
  } else {
    entries = valid.map((record) => ({ ...record, count: 1, labels: [record.label] }));
  }
  const categories = config.xCategory
    ? [...new Set(entries.map((entry) => entry.rawX))].sort((a, b) => {
        if (config.categorySort === 'numeric') {
          const left = Number.parseFloat(a);
          const right = Number.parseFloat(b);
          return left - right || a.localeCompare(b);
        }
        return a.localeCompare(b, undefined, { numeric: true });
      })
    : null;
  const categoryIndex = new Map((categories || []).map((value, index) => [value, index]));
  const categoryOffsets = new Map();
  const points = entries.map((entry) => {
    let x = entry.x;
    if (categories) {
      const index = categoryIndex.get(entry.rawX);
      const occurrence = categoryOffsets.get(index) || 0;
      categoryOffsets.set(index, occurrence + 1);
      const jitter = ((occurrence % 5) - 2) * 0.055;
      x = index + jitter;
    }
    const references = entry.labels.map((value) => value);
    const more = entry.count > references.length ? (lang === 'ar' ? ' · و' : ' · +') + (entry.count - references.length) + (lang === 'ar' ? ' سجلات أخرى' : ' more records') : '';
    const grouped = entry.group ? (lang === 'ar' ? 'المجموعة: ' : 'Group: ') + entry.group + ' · ' : '';
    const countLabel = entry.count > 1
      ? (lang === 'ar' ? 'مطابقات المصدر: ' : 'Matching source rows: ') + entry.count + ' · '
      : '';
    return {
      x,
      y: entry.y,
      xDisplay: String(entry.rawX),
      group: entry.group,
      count: entry.count,
      info: countLabel + grouped + references.join(' | ') + more,
    };
  });
  return { points, categories, validRows: valid.length };
}

function renderChartCard(config, plotData, lang, sourceUrl, sourceRowCount) {
  const ar = lang === 'ar';
  const title = config.title[lang];
  const question = config.question[lang];
  const purpose = config.purpose[lang];
  const limit = config.limit[lang];
  const labels = chartControlLabels(lang);
  const notes = [];
  if (config.aggregateDuplicates) {
    notes.push(ar
      ? 'حجم الدائرة يزداد مع عدد صفوف المصدر ذات القيم المطابقة.'
      : 'Bubble size increases with the number of source rows sharing the same plotted values.');
  }
  if (config.xCategory) {
    notes.push(ar
      ? 'الإزاحة الأفقية الصغيرة لإظهار التداخل بصرية فقط؛ التسمية الدقيقة ظاهرة في التفاصيل.'
      : 'Small horizontal offsets reveal overlapping category points; the offset is visual only and the exact label is shown in point details.');
  }
  const chart = scientificSourceScatter({
    points: plotData.points,
    xLabel: config.xField,
    yLabel: config.yField,
    xUnit: config.xUnit,
    yUnit: config.yUnit,
    categories: plotData.categories,
    identityReference: Boolean(config.identityReference),
    labels,
    sourceRowCount,
    validRowCount: plotData.validRows,
    captionNote: notes.join(' '),
  });
  const sourceLink = sourceUrl
    ? '<a href="' + esc(sourceUrl) + '" target="_blank" rel="noreferrer">NASA PSI ↗</a>'
    : '';
  return [
    '<article class="card source-chart-card" data-source-chart="', esc(config.id), '">',
    '<h3>', esc(title), '</h3>',
    '<div class="grid three chart-explanation">',
    '<p class="sub"><b>', ar ? 'السؤال' : 'Question', '</b><br>', esc(question), '</p>',
    '<p class="sub"><b>', ar ? 'الغرض' : 'Purpose', '</b><br>', esc(purpose), '</p>',
    '<p class="sub"><b>', ar ? 'حدود التفسير' : 'Interpretation limit', '</b><br>', esc(limit), '</p>',
    '</div>',
    '<p class="sub source-chart-fields">', ar ? 'حقول NASA PSI الأصلية: ' : 'Original NASA PSI fields: ',
    esc(config.xField), ' → ', esc(config.yField), sourceLink ? ' · ' + sourceLink : '', '</p>',
    chart,
    '</article>',
  ].join('');
}

export function renderSourceStudyCharts(studyId, rows, lang = 'en', sourceUrl = '') {
  const ar = lang === 'ar';
  const configs = sourceChartsForStudy(studyId);
  if (!configs.length) {
    const reason = SOURCE_STUDY_NO_PLOT_REASON[studyId];
    if (!reason) return '';
    return '<div class="callout">' + esc(reason[lang]) + '</div>';
  }
  const charts = configs.map((config) => {
    const plotData = sourcePlotData(rows, config, lang);
    if (plotData.validRows < 2) {
      return '<article class="card"><h3>' + esc(config.title[lang]) + '</h3><p class="sub">' +
        (ar ? 'لا توجد أزواج رقمية كافية في خلايا المصدر لهذا الرسم؛ بقيت القيم كما هي.' : 'The source cells do not contain enough numeric pairs for this plot; values remain unchanged.') +
        '</p></article>';
    }
    return renderChartCard(config, plotData, lang, sourceUrl, rows.length);
  });
  return [
    '<section class="study-source-charts"><div class="section-title"><div><h3>',
    ar ? 'مخططات هذه الدراسة' : 'Plots for this investigation',
    '</h3><p class="sub">',
    ar ? 'رسوم مستقلة من حقول هذا الجدول فقط؛ لا تُدمج مع تحقيق آخر.' : 'Separate plots from this table only; no rows are pooled with another investigation.',
    '</p></div><span class="tag">',
    configs.length,
    ar ? ' مخططات' : ' plots',
    '</span></div><div class="grid two">',
    charts.join(''),
    '</div></section>',
  ].join('');
}

export async function renderSourceChartGuide(lang = 'en') {
  const ar = lang === 'ar';
  const catalog = await get('/api/challenge/catalog');
  const studyIds = [...new Set(SOURCE_STUDY_CHARTS.map((chart) => chart.studyId))];
  const results = await Promise.all(studyIds.map(async (id) => {
    try {
      const table = await loadStudyTable(id);
      const item = catalog.investigations.find((study) => study.id === id);
      return renderSourceStudyCharts(id, table.rows, lang, item?.sourceUrl || '');
    } catch (error) {
      return '<article class="card"><h3>' + esc(id) + '</h3><div class="callout warn">' + esc(error.message) + '</div></article>';
    }
  }));
  const noPlotStudies = Object.entries(SOURCE_STUDY_NO_PLOT_REASON).map(([id, reason]) => {
    const item = catalog.investigations.find((study) => study.id === id);
    return '<article class="card"><div class="eyebrow">' + esc(id) + '</div><h3>' + esc(item?.title || id) + '</h3><p class="sub">' + esc(reason[lang]) + '</p></article>';
  });
  const totalCharts = SOURCE_STUDY_CHARTS.length;
  return [
    '<section class="chart-gallery source-chart-guide"><div class="section-title"><div><h2>',
    ar ? 'مخططات بقية جداول NASA PSI' : 'Plots from the other NASA PSI tables',
    '</h2><p>',
    ar
      ? 'تُعرض هنا ' + totalCharts + ' مخططاً عبر ' + studyIds.length + ' تحقيقات. يحتفظ كل مخطط بوحداته وحقوله وحدود تفسيره الخاصة.'
      : totalCharts + ' plots cover ' + studyIds.length + ' investigations. Each keeps its own source fields, units, and interpretation limits.',
    '</p></div></div><div class="source-chart-study-list">',
    results.join(''),
    '</div><h2 style="margin-top:24px">',
    ar ? 'جداول لا تنتج رسماً كمياً آمناً' : 'Tables without a defensible quantitative plot',
    '</h2><p class="sub">',
    ar
      ? 'هذه الجداول مرفقة في المكتبة وتظل قابلة للاستعراض؛ غياب الرسم يعكس نوع البيانات المنشورة، لا حذف البيانات.'
      : 'These tables remain available in the evidence library; the absence of a plot reflects the published data type, not omitted data.',
    '</p><div class="grid two source-chart-no-plot">',
    noPlotStudies.join(''),
    '</div></section>',
  ].join('');
}
