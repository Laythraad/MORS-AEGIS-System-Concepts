const FLOW_SOURCE = 'https://ntrs.nasa.gov/citations/20130012832';
const SHAPE_SOURCE = 'https://ntrs.nasa.gov/api/citations/20030062163/downloads/20030062163.pdf';

// Approximate coordinates digitized from the NASA-published plot on slide 30.
// Preserve the source's signed velocity convention: negative = concurrent,
// positive = opposed. These are not NASA's native machine-readable records.
const FLOW_POINTS = [
  { u: -22, spread: 4.98, series: '2 cm · concurrent' },
  { u: -10, spread: 2.55, series: '2 cm · concurrent' },
  { u: -5, spread: 1.56, series: '2 cm · concurrent' },
  { u: -19, spread: 2.85, series: '1 cm · concurrent' },
  { u: -11, spread: 1.69, series: '1 cm · concurrent' },
  { u: 1.5, spread: 0.62, series: '2 cm · opposed' },
  { u: 2, spread: 0.82, series: '2 cm · opposed' },
  { u: 4, spread: 1.07, series: '2 cm · opposed' },
  { u: 6.5, spread: 1.13, series: '2 cm · opposed' },
  { u: 9, spread: 1.22, series: '2 cm · opposed' },
  { u: 10, spread: 1.42, series: '2 cm · opposed' },
  { u: 20, spread: 1.48, series: '2 cm · opposed' },
  { u: 47, spread: 1.12, series: '2 cm · opposed' },
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

function axisChart({ id, title, xLabel, yLabel, xMin, xMax, yMin, yMax, xTicks, yTicks, marks, captions, ar }) {
  const width = 760;
  const height = 420;
  const left = 74;
  const right = 28;
  const top = 36;
  const bottom = 70;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const sx = (x) => left + ((x - xMin) / (xMax - xMin)) * plotW;
  const sy = (y) => top + (1 - (y - yMin) / (yMax - yMin)) * plotH;
  const grid = [
    ...xTicks.map((tick) => `<line x1="${sx(tick)}" y1="${top}" x2="${sx(tick)}" y2="${top + plotH}" class="ext-grid"/><text x="${sx(tick)}" y="${top + plotH + 20}" text-anchor="middle" class="ext-tick">${tick}</text>`),
    ...yTicks.map((tick) => `<line x1="${left}" y1="${sy(tick)}" x2="${left + plotW}" y2="${sy(tick)}" class="ext-grid"/><text x="${left - 12}" y="${sy(tick) + 4}" text-anchor="end" class="ext-tick">${tick}</text>`),
  ].join('');
  const content = marks({ sx, sy, plotW, plotH, left, top, ar });
  return `<svg class="external-nasa-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(captions.description)}</desc>${grid}<line x1="${left}" y1="${top + plotH}" x2="${left + plotW}" y2="${top + plotH}" class="ext-axis"/><line x1="${left}" y1="${top}" x2="${left}" y2="${top + plotH}" class="ext-axis"/><text x="${left + plotW / 2}" y="${height - 16}" text-anchor="middle" class="ext-label">${esc(xLabel)}</text><text x="18" y="${top + plotH / 2}" transform="rotate(-90 18 ${top + plotH / 2})" text-anchor="middle" class="ext-label">${esc(yLabel)}</text>${content}</svg>`;
}

function renderFlowChart(ar) {
  const enSeries = [
    { key: '2 cm · concurrent', color: '#55c4ee', label: ar ? '2 سم · جريان متزامن' : '2 cm · concurrent' },
    { key: '1 cm · concurrent', color: '#a78bfa', label: ar ? '1 سم · جريان متزامن' : '1 cm · concurrent' },
    { key: '2 cm · opposed', color: '#f1a65a', label: ar ? '2 سم · جريان معاكس' : '2 cm · opposed' },
  ];
  return axisChart({
    id: 'nasa-flow-spread',
    title: ar ? 'سرعة التدفق القسري ومعدل انتشار اللهب' : 'Forced-flow velocity and flame-spread rate',
    xLabel: ar ? 'سرعة التدفق القسري الموقّعة (سم/ث)' : 'Signed forced-flow velocity (cm/s)',
    yLabel: ar ? 'معدل انتشار اللهب (مم/ث)' : 'Flame-spread rate (mm/s)',
    xMin: -50, xMax: 50, yMin: 0, yMax: 6,
    xTicks: [-40, -20, 0, 20, 40], yTicks: [0, 1, 2, 3, 4, 5, 6], ar,
    captions: { description: ar ? 'نقاط رقمية تقريبية من مخطط NASA BASS في الشريحة 30؛ السرعات السالبة تمثل الجريان المتزامن والموجبة الجريان المعاكس.' : 'Approximate digitized points from the NASA BASS plot on slide 30; negative velocities are concurrent flow and positive velocities are opposed flow.' },
    marks: ({ sx, sy, left, top, plotW, plotH }) => {
      const lines = enSeries.map((series) => {
        const points = FLOW_POINTS.filter((point) => point.series === series.key).sort((a, b) => a.u - b.u);
        const coordinates = points.map((point) => `${sx(point.u)},${sy(point.spread)}`).join(' ');
        return `<polyline points="${coordinates}" fill="none" stroke="${series.color}" stroke-width="2" opacity=".78"/>${points.map((point) => `<circle cx="${sx(point.u)}" cy="${sy(point.spread)}" r="5" fill="${series.color}" stroke="var(--surface)" stroke-width="1.5"><title>${esc(series.label)} · U=${point.u} cm/s · Vf≈${point.spread} mm/s</title></circle>`).join('')}`;
      }).join('');
      const legend = enSeries.map((series, index) => `<g transform="translate(${left + 12 + index * 218},${top + plotH + 46})"><circle r="5" fill="${series.color}"/><text x="10" y="4" class="ext-legend">${esc(series.label)}</text></g>`).join('');
      const zeroX = sx(0);
      const directionLabels = `<text x="${sx(-27)}" y="${top - 12}" text-anchor="middle" class="ext-note">${ar ? 'متزامن مع اتجاه الانتشار' : 'concurrent with spread'}</text><text x="${sx(27)}" y="${top - 12}" text-anchor="middle" class="ext-note">${ar ? 'معاكس لاتجاه الانتشار' : 'opposed to spread'}</text><line x1="${zeroX}" y1="${top}" x2="${zeroX}" y2="${top + plotH}" stroke="var(--muted)" stroke-dasharray="4 4" opacity=".7"/>`;
      return `${directionLabels}${lines}${legend}`;
    },
  });
}

function renderSphericityChart(ar) {
  return axisChart({
    id: 'nasa-gravity-sphericity',
    title: ar ? 'الجاذبية مقابل استدارة اللهب · حالة NASA واحدة' : 'Gravity vs. flame sphericity · one NASA case',
    xLabel: ar ? 'نظام الجاذبية المرجعي (0g إلى 1g)' : 'Reference gravity regime (0g to 1g)',
    yLabel: ar ? 'الاستدارة Dₓ / D_z (بلا وحدة)' : 'Sphericity Dₓ / D_z (dimensionless)',
    xMin: 0, xMax: 1.15, yMin: 0.3, yMax: 1.2,
    xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0.4, 0.6, 0.8, 1.0, 1.2], ar,
    captions: { description: ar ? 'نقطة زرقاء: قياس تجريبي منشور للاستدارة 1.0 في تجربة برج الإسقاط بعد نصف ثانية؛ مستوى الجاذبية المتبقي لم يُقَس في التقرير. نقطة برتقالية: قراءة تقريبية من محاكاة NASA عند 1g قبل الإسقاط. مقارنة بين رصد ونموذج، لا سلسلة قياسات ولا علاقة ملائمة.' : 'Blue point: reported experimental sphericity of 1.0, 0.5 seconds after drop; residual gravity was not measured in the report. Orange point: approximate NASA simulation read-off at 1g before drop. This compares an observation with a model; it is not a measured series or fitted relationship.' },
    marks: ({ sx, sy, left, top, plotW, plotH, ar: rtl }) => {
      const modelX = sx(1);
      const modelY = sy(0.39);
      const measuredX = sx(0);
      const measuredY = sy(1.0);
      return `<rect x="${sx(0)}" y="${top}" width="${sx(0.04) - sx(0)}" height="${plotH}" fill="#55c4ee" opacity=".10"/><circle cx="${measuredX + 7}" cy="${measuredY}" r="7" fill="#55c4ee" stroke="var(--surface)" stroke-width="2"><title>${rtl ? 'قياس تجريبي منشور' : 'Reported experimental measurement'} · microgravity drop tower; residual g unreported · t=0.5 s · sphericity=1.0</title></circle><path d="M ${modelX} ${modelY - 8} L ${modelX + 8} ${modelY} L ${modelX} ${modelY + 8} L ${modelX - 8} ${modelY} Z" fill="#f1a65a" stroke="var(--surface)" stroke-width="1.5"><title>${rtl ? 'محاكاة تقريبية مقروءة من الشكل 6' : 'Approximate model read-off from figure 6'} · 1g pre-drop · sphericity≈0.39</title></path><text x="${measuredX + 16}" y="${measuredY - 12}" class="ext-note">μg · 1.0</text><text x="${modelX - 10}" y="${modelY - 13}" text-anchor="end" class="ext-note">1g · ≈0.39</text><g transform="translate(${left + 12},${top + plotH + 42})"><circle cx="6" cy="0" r="6" fill="#55c4ee"/><text x="18" y="4" class="ext-legend">${rtl ? 'قياس برج إسقاط؛ g المتبقي غير مذكور' : 'Drop-tower experiment; residual g unreported'}</text><path d="M 390 -7 L 397 0 L 390 7 L 383 0 Z" fill="#f1a65a"/><text x="406" y="4" class="ext-legend">${rtl ? 'محاكاة 1g تقريبية قبل الإسقاط' : 'Approximate 1g pre-drop simulation'}</text></g>`;
    },
  });
}

export function renderExternalNASAPlots(lang = 'en') {
  const ar = lang === 'ar';
  return `<section class="insight-chart-block external-nasa-evidence"><h3>${ar ? 'دراسات NASA إضافية خارج جداول التحدي' : 'Additional NASA studies beyond the challenge tables'}</h3><p class="sub">${ar ? 'أُضيفت هذه المراجع لأن ملفات PSI المرفقة لا تغطي هذين المحورين. تبقى منفصلة عن بيانات التحدي ولا تدخل في إحصاءاته.' : 'These studies extend two gaps in the bundled PSI tables. They remain separate from challenge data and are not included in its record counts.'}</p><div class="grid two"><article class="card external-chart-card"><div class="eyebrow">NASA BASS · ${ar ? 'نقاط مُرقمنة' : 'DIGITIZED PLOT'}</div><h4>${ar ? 'التهوية القسرية مقابل انتشار اللهب' : 'Forced airflow vs. flame spread'}</h4>${renderFlowChart(ar)}<p class="sub">${ar ? 'تقريب يدوي لنقاط الشكل المنشور؛ عدم اليقين البصري يقارب ±1 سم/ث و±0.15 مم/ث. العينات نسيج قطني-زجاجي في الجاذبية الصغرى، بعرض 1 أو 2 سم. المحور الموقّع يميز الجريان المتزامن (سالب) والمعاكس (موجب). لا تُعمم القيم على وقود أو هندسة أخرى.' : 'Manual approximation of published plot points; visual read-off uncertainty is about ±1 cm/s and ±0.15 mm/s. Samples were cotton/fiberglass fabric in microgravity, 1 or 2 cm wide. Signed velocity distinguishes concurrent (negative) from opposed (positive) flow. Do not generalize to other fuels or geometries.'}<br><a href="${FLOW_SOURCE}" target="_blank" rel="noreferrer">${ar ? 'سجل NASA NTRS · العرض والشكل الأصلي ↗' : 'NASA NTRS record · presentation and original figure ↗'}</a></p></article><article class="card external-chart-card"><div class="eyebrow">NASA DROP-TOWER STUDY · ${ar ? 'قياس + محاكاة' : 'MEASUREMENT + MODEL'}</div><h4>${ar ? 'استجابة شكل اللهب لتغير الجاذبية' : 'Flame-shape response to changing gravity'}</h4>${renderSphericityChart(ar)}<p class="sub">${ar ? 'الاستدارة هي نسبة القطر الأفقي إلى العمودي. التقرير يذكر قياساً تجريبياً 1.0 عند 0.5 ثانية بعد الإسقاط؛ النقطة الزرقاء قياس منشور (1.0 بعد نصف ثانية)؛ التسارع المتبقي لم يذكره التقرير. البرتقالية قراءة تقريبية من محاكاة 1g قبل الإسقاط. نميز بين الرصد والمحاكاة، ولا تكفي نقطتان لتحديد قانون للجاذبية. الحالة لهب انتشار من موقد كروي بخليط H₂/CH₄/N₂، وليست قاعدة لكل الحرائق.' : 'Sphericity is horizontal-to-vertical flame diameter. Blue is the reported experimental sphericity (1.0 at 0.5 s after drop); residual acceleration was not reported. Orange is an approximate read-off of the model at 1g immediately before drop. Observation and simulation are intentionally shown with different symbols; two points do not establish a fitted gravity law. This was an H₂/CH₄/N₂ burner-generated diffusion flame, not a universal fire result.'}<br><a href="${SHAPE_SOURCE}" target="_blank" rel="noreferrer">${ar ? 'تقرير NASA NTRS · الشكل 6 والبيانات ↗' : 'NASA NTRS report · figure 6 and reported data ↗'}</a> · <a href="https://coewww.rutgers.edu/~sdytse/papers/2001-C%26F_SphrclDiffFlm.pdf" target="_blank" rel="noreferrer">${ar ? 'البحث التجريبي الأصلي ↗' : 'Original experimental paper ↗'}</a></p></article></div><div class="callout">${ar ? 'قراءة مشتركة: ضعف الطفو يقرّب اللهب الانتشاري الساكن من التناظر الكروي، لكن التدفق القسري يظل قادراً على تغيير الانتشار والشكل. وتذكر دراسة NASA مستقلة للجاذبية الجزئية أن اللهب صار أطول وأضيق وأكثر سطوعاً مع زيادة الجاذبية؛ لكن ملخصها وصفي ولا يعطي أرقام استدارة، لذلك لم نرسم سلسلة رقمية منها (<a href="https://ntrs.nasa.gov/citations/20170011213" target="_blank" rel="noreferrer">NASA NTRS 20170011213 ↗</a>). تبقى كل الدراسات الإضافية منفصلة عن PSI ولا تُدمج معها.' : 'Read together: weaker buoyancy allows a quiescent diffusion flame to approach spherical symmetry, while forced flow still changes spread and shape. A separate NASA partial-gravity centrifuge study also reported flames becoming longer, narrower, and brighter as gravity increased; its abstract reports qualitative shape, not numerical sphericity, so it is not plotted as a numeric series (<a href="https://ntrs.nasa.gov/citations/20170011213" target="_blank" rel="noreferrer">NASA NTRS 20170011213 ↗</a>). All supplementary studies remain independent of challenge PSI records and must not be pooled across experiments.'}</div></section>`;
}

export const EXTERNAL_NASA_SOURCES = [
  {
    title: 'Flammability Aspects of a Cotton-Fiberglass Fabric in Opposed and Concurrent Airflow in Microgravity',
    date: '2012 · NASA NTRS document 20130012832',
    url: FLOW_SOURCE,
    method: 'ISS microgravity wind-tunnel tests; cotton/fiberglass fabric; opposed and concurrent flow; 1 cm and 2 cm samples.',
    use: 'Approximate point digitization from the presentation plot on slide 30 for airflow velocity vs. flame spread rate.',
    limit: 'Points are manually digitized from a plotted figure (not native table data); signed velocity and flow direction are preserved; one fuel geometry only.',
  },
  {
    title: 'Simulation of Combustion Systems with Realistic G-Jitter · final progress report',
    date: '2003 · NASA NTRS document 20030062163 · NASA-funded report',
    url: SHAPE_SOURCE,
    method: 'NASA 2.2-second drop-tower spherical diffusion flame; hydrogen/methane/nitrogen mixture; numerical gravity-step response.',
    use: 'Figure 6 reports experimental sphericity 1.0 at t = 0.5 s after drop; its model curve gives the comparison point near 0.39 immediately before drop at 1g.',
    limit: 'The 1g value is approximate model output; the microgravity value is the reported experiment. Actual residual gravity was not measured. They are not matched repeated measurements, and must not be used to fit a universal gravity trend.',
  },
  {
    title: 'Microgravity Burner-Generated Spherical Diffusion Flames: Experiment and Computation',
    date: '2001 · Combustion and Flame 125(4), 1265–1278 · DOI 10.1016/S0010-2180(01)00247-4',
    url: 'https://coewww.rutgers.edu/~sdytse/papers/2001-C%26F_SphrclDiffFlm.pdf',
    method: 'NASA Glenn 2.2-second drop tower; spherical porous burner with H₂/CH₄/N₂ in atmospheric air; flame shape imaged through the 1g-to-microgravity transition.',
    use: 'Primary experimental paper underlying the reported sphericity measurement and figure 6 reference.',
    limit: 'A specific burner mixture and transient drop-tower case; it does not establish one shape law for every flame.',
  },
  {
    title: 'Centrifuge in Free Fall: Combustion at Partial Gravity · NASA NTRS 20170011213',
    date: '2017 · NASA Glenn Research Center presentation',
    url: 'https://ntrs.nasa.gov/citations/20170011213',
    method: 'NASA 5.18-second drop-tower centrifuge; 23 simulated candle tests at partial gravity with heptane and ethanol.',
    use: 'Independent qualitative context: flames became longer, narrower, and brighter as gravity increased.',
    limit: 'The NASA abstract reports qualitative morphology, not a numeric sphericity-versus-gravity table; no numeric points are fabricated from it.',
  },
];
