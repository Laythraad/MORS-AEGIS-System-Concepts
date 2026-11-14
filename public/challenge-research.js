import { esc, pageHead, stat } from './lib/dom.js';
import { get } from './lib/api.js';
import { renderEvidenceCoverage } from './lib/evidence-coverage.js';
import { flameScene3d } from './lib/flame-scene3d.js';

const studyNotes = {
  'PSI-20': 'ACME BRE · gaseous flames and burning-rate emulator test conditions',
  'PSI-21': 'ACME CLD · coflow laminar diffusion flame test inventory',
  'PSI-22': 'ACME E-FIELD · electric-field diffusion flame test inventory',
  'PSI-23': 'ACME s-Flame · spherical diffusion flame test inventory',
  'PSI-25': 'BASS-II · solid-fuel burning and suppression',
  'PSI-26': 'BASS · solid-fuel burning and suppression',
  'PSI-39': 'CFI · Cool Flames Investigation test conditions',
  'PSI-47': 'DAFT · dust and aerosol measurement sessions',
  'PSI-68': 'FLEX-2 · droplet-combustion test envelope',
  'PSI-69': 'FLEX · liquid-droplet flames and gaseous suppressants',
  'PSI-98': 'SAFFIRE-I · spacecraft fire and material flammability',
  'PSI-99': 'SAFFIRE-II · spacecraft fire and flame spread',
  'PSI-100': 'SAFFIRE-III · spacecraft fire and flame spread',
  'PSI-101': 'SAME-R · smoke and aerosol measurements',
  'PSI-102': 'SAME · smoke and aerosol measurements',
  'PSI-107': 'SPICE · Smoke Point In Co-flow Experiment'
};
const studyNotesArabic = {
  'PSI-20': 'ACME BRE · شروط تجارب اللهب الغازي ومحاكي معدل الاحتراق',
  'PSI-21': 'ACME CLD · فهرس تجارب لهب الانتشار المتوازي',
  'PSI-22': 'ACME E-FIELD · فهرس تجارب لهب الانتشار تحت تأثير المجال الكهربائي',
  'PSI-23': 'ACME s-Flame · فهرس تجارب لهب الانتشار الكروي',
  'PSI-25': 'BASS-II · احتراق المواد الصلبة وإخمادها',
  'PSI-26': 'BASS · احتراق المواد الصلبة وإخمادها',
  'PSI-39': 'CFI · شروط تجارب اللهب البارد',
  'PSI-47': 'DAFT · جلسات قياس الغبار والهباء الجوي',
  'PSI-68': 'FLEX-2 · نطاق تجارب احتراق القطرات',
  'PSI-69': 'FLEX · لهب القطرات السائلة وغازات الإخماد',
  'PSI-98': 'SAFFIRE-I · حريق المركبة الفضائية وقابلية احتراق المواد',
  'PSI-99': 'SAFFIRE-II · حريق المركبة الفضائية وانتشار اللهب',
  'PSI-100': 'SAFFIRE-III · حريق المركبة الفضائية وانتشار اللهب',
  'PSI-101': 'SAME-R · قياسات الدخان والهباء الجوي',
  'PSI-102': 'SAME · قياسات الدخان والهباء الجوي',
  'PSI-107': 'SPICE · تجربة نقطة الدخان في الجريان المتوازي'
};

const analysisNotesArabic = {
  'PSI-20': 'صفوف ملخصات يومية؛ العدد يصف صف الملخص ولا يمثل تجارب لهب فردية. تسميات الأكسجين غير الطبيعية محفوظة ولا تُربط بنتيجة فردية.',
  'PSI-21': 'الصفوف ملخصات أيام اختبار. تُحفظ حقول MFC ووحداتها كما وردت؛ ولا يعزل هذا الوصف أثر الوقود أو التدفق.',
  'PSI-22': 'تُلخّص الخلايا الرقمية فقط، وتظل الصفوف الفارغة أو التعليقات ضمن فهرس المصدر. لا ينتج عنها نموذج استجابة لكل لهب.',
  'PSI-23': 'الصفوف ملخصات أيام اختبار؛ حُفظت علامة النجمة وترميز المصدر. لا تُستنتج بنية اللهب أو سرعة الإخماد من هذا الجدول.',
  'PSI-25': 'هذه نطاقات قراءات المصدر عبر صفوف الاختبارات، وليست أثرًا معزولًا للأكسجين. تختلف المواد والتدفقات وظروف الإشعال؛ وأُبقيت قراءات CO السالبة كما وردت.',
  'PSI-26': 'هذا التصدير فهرس للعينات والمواد دون نتيجة رقمية لانتشار اللهب أو الاحتراق؛ يفيد في اكتشاف الدراسات وتوثيقها لا في ترتيب المخاطر.',
  'PSI-39': 'حقول تركيب للجو المحيط وليست نتائج احتراق. لا تذكر عناوين الأعمدة الوحدات؛ لذلك لا نحول القيم ولا نستخدمها كدرجات قابلية اشتعال.',
  'PSI-47': 'يحتوي هذا التصدير وصف جلستي قياس غبار/هباء فقط ولا يتضمن نتيجة احتراق رقمية.',
  'PSI-68': 'هذا جدول نطاقات للاختبار وليس قياسات فردية؛ تُحفظ النصوص والنطاقات كما هي ولا تحسب منها إحصاءات.',
  'PSI-69': 'استخدم منضدة FLEX للتحليل بحسب ظروف الاختبار. هذا الثابت خاص باحتراق القطرة السائلة وفق قانون d² وليس سرعة انتشار حريق مادة صلبة.',
  'PSI-98': 'أُدرج صفا العينة S# فقط؛ إدخالات F# مراجع تصوير لتدفق ما قبل الاختبار. عينتان لا تكفيان لإثبات أثر اتجاه الجريان.',
  'PSI-99': 'تتضمن صفوف العينات تسميات وصفية وأطوالًا مختلطة. حقل الجاذبية مكتوب “?-g”؛ لذلك لم نصنفه على أنه جاذبية صغرى ولم ندمج قيمه.',
  'PSI-100': 'يصف الصفان شروط عينتي SIBAL ومعرفات الكاميرا، ومنها جريان 30 cm/s باتجاهين. لا يحتوي الجدول نتيجة مقاسة لانتشار اللهب.',
  'PSI-101': 'هذه حقول نقل وقياس للدخان والهباء، وليست سرعة انتشار لهب. تتكرر معرفات الاختبار وتختلف البيانات الناقصة، فلا تعامل الصفوف كحرائق مستقلة.',
  'PSI-102': 'أُبقيت قياسات فقدان كتلة Teflon الأربعة كما وردت. تختلف سرعة الهواء ومدة التعتيق؛ المتوسط وصفي وليس معدل انتشار لهب.',
  'PSI-107': 'سجل SPICE ذو 469 صفًا يكرر أوقات الحدث عبر ظروف التشغيل. تلخص القيم مدخلات المصدر ولا تمثل حرائق مستقلة أو علاقة سببية؛ وفُحص ترتيب أوقات الاشتعال والانطفاء منفصلًا.'
};

function triageFactorLabels(item, ar) {
  const { relevanceScore, environmentScore, dataAvailabilityScore } = item.triage;
  if (!ar) return item.triage.scoreFactors;
  const relevance = relevanceScore === 3
    ? 'مطابقة مباشرة لموضوع سلامة حريق الطاقم (3/3)'
    : relevanceScore === 2
      ? 'صلة عامة بالاحتراق أو اللهب (2/3)'
      : 'تحقيق ضمن فهرس علوم الاحتراق الرسمي (1/3)';
  const environment = environmentScore
    ? 'سياق فضائي أو جاذبية منخفضة مذكور في بيانات PSI (2/2)'
    : 'لم يُحدّد سياق طيران أو جاذبية منخفضة في البيانات الوصفية (0/2)';
  const availability = dataAvailabilityScore
    ? 'الجدول التجريبي الأصلي مرفق ومتحقق من بصمته؛ يكسر التعادل فقط'
    : 'لا يوجد جدول تجريبي أصلي مرفق محلياً؛ بيانات وصفية فقط ويكسر التعادل';
  return [relevance, environment, availability];
}

function genericTable(rows, headers) {
  const shown = headers.slice(0, 8);
  return `<div class="table-wrap"><table><thead><tr>${shown.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${shown.map(h => `<td>${esc(row[h] ?? '—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export async function renderChallengeLibrary(lang = 'en') {
  const data = await get('/api/challenge/catalog');
  const ar = lang === 'ar';
  const cards = data.investigations.map(item => `<article class="card evidence-card">
    <div class="card-head"><div><span class="eyebrow">${esc(item.id)} · NASA PSI</span><h3>${esc(item.title)}</h3><p class="sub">${esc(ar ? studyNotesArabic[item.id] || '' : studyNotes[item.id] || '')}</p></div><span class="tag ${item.sourceIntegrity === 'VERIFIED' ? 'obs' : 'warn'}">${esc(item.sourceIntegrity)}</span></div>
    <div class="list-row"><span>${ar ? 'سجلات الجدول' : 'Source table rows'}</span><b>${item.rowCount}</b></div>
    <div class="list-row"><span>${ar ? 'تصنيف السجلات' : 'Source row classes'}</span><b>${Object.entries(item.rowClassification.counts).map(([key, value]) => `${esc(key)}: ${value}`).join(' · ')}</b></div>
    <div class="list-row"><span>${ar ? 'أعمدة المصدر' : 'Source fields'}</span><b>${item.headers.length}</b></div>
    <div class="list-row"><span>DOI</span>${item.doi ? `<a class="mono" href="https://doi.org/${encodeURIComponent(item.doi)}" target="_blank" rel="noreferrer">${esc(item.doi)} ↗</a>` : `<span class="sub">${ar ? 'غير متوفر في بيانات الفهرس؛ راجع سجل PSI' : 'Not provided in inventory metadata; see PSI record'}</span>`}</div>
    <div class="list-row"><span>${ar ? 'الترخيص' : 'License'}</span><b>${esc(item.license)}</b></div>
    <details class="field-details"><summary>${ar ? 'حقول القياس والنقص' : 'Fields and missingness'}</summary><div class="field-list">${item.fields.map(f => `<div class="list-row"><span>${esc(f.name)}</span><b>${f.nonEmpty}/${item.rowCount} · ${f.missing} missing</b></div>`).join('')}</div></details>
    <div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? 'سجل NASA PSI' : 'NASA PSI record'} ↗</a><button class="outline-btn" data-investigation="${esc(item.id)}">${ar ? 'استعراض الصفوف' : 'Inspect source rows'}</button></div>
    <div id="source-table-${esc(item.id)}"></div>
  </article>`).join('');
  const rankedInventory = [...data.officialInventory.records].sort((a, b) => b.triage.missionRelevanceScore - a.triage.missionRelevanceScore || b.triage.dataAvailabilityScore - a.triage.dataAvailabilityScore || a.id.localeCompare(b.id, undefined, { numeric: true }));
  const inventory = rankedInventory.map((item, index) => {
    const fileStatus = item.rawTableBundled ? (ar ? 'الجدول مرفق' : 'TABLE BUNDLED') : item.psiFileManifest?.retrieved ? (ar ? 'الفهرس متاح · لا جدول محلي' : 'FILE INDEXED · NO LOCAL TABLE') : (ar ? 'الفهرس غير متاح' : 'FILE INDEX UNAVAILABLE');
    const fileDetails = item.psiFileManifest?.retrieved ? `${item.psiFileManifest.listedFileCount} ${ar ? 'ملفاً في الفهرس' : 'files listed'} · ${item.psiFileManifest.experimentalTableCount} ${ar ? 'جداول تجريبية' : 'experimental tables'}` : (ar ? 'لم يُرجع endpoint ملفّات لهذا السجل في لقطة الفهرس' : 'The file-list endpoint returned no manifest in this snapshot; this does not prove no files exist.');
    return `<article class="inventory-card"><div class="inventory-row"><span><b>#${index + 1} · ${esc(item.id)} · ${esc(item.acronym || item.title)}</b><small>${esc(item.title)} · ${esc(item.subResearchArea || 'Combustion Science')} · ${esc(item.projectType || 'Type not specified')}</small></span><span class="inventory-status ${item.rawTableBundled ? 'available' : 'metadata'}">${fileStatus}</span><span class="inventory-score">${item.triage.missionRelevanceScore}/5<small>${ar ? 'صلة المهمة' : 'mission fit'}</small></span><a href="${esc(item.nasaRecordUrl)}" target="_blank" rel="noreferrer">NASA PSI ↗</a></div><div class="inventory-factors">${triageFactorLabels(item, ar).map(reason => `<span>${esc(reason)}</span>`).join(' · ')}</div><p class="sub">${esc(fileDetails)}</p><details><summary>${ar ? 'أهداف وطريقة الدراسة' : 'Study objectives and approach'}</summary><p><b>${ar ? 'الأهداف' : 'Objectives'}</b><br>${esc(item.objectives || 'Not provided in returned PSI metadata.')}</p><p><b>${ar ? 'الطريقة' : 'Approach'}</b><br>${esc(item.approach || 'Not provided in returned PSI metadata.')}</p>${item.hypothesis ? `<p><b>${ar ? 'الفرضية المسجلة' : 'Recorded hypothesis'}</b><br>${esc(item.hypothesis)}</p>` : ''}<p class="sub">${esc(item.keywords || '')}</p></details></article>`;
  }).join('');
  const findings = data.findings.map(item => `<article class="card"><div class="card-head"><div><span class="eyebrow">${esc(item.investigationId)} · ${esc(item.evidence)}</span><h3>${esc(item.title)}</h3></div><span class="tag">n=${esc(item.n)}</span></div><b>${esc(item.value)}</b><p class="sub">${esc(item.interpretation)}</p></article>`).join('');
  const bundledCount = data.investigations.length;
  const archive = data.fileArchiveInventory;
  const archiveTB = (archive.reportedBytes / 1e12).toFixed(2);
  const archiveCoverageNote = ar
    ? 'فيديو التحدي يصف مستودع PSI الكامل بنحو 12 تيرابايت؛ أما هذا المجموع فيخص الفهارس التي استجابت هنا فقط، وليس تنزيل الأرشيف الكامل.'
    : 'The challenge video describes the full PSI repository as roughly 12 TB; this total covers only the file manifests returned in this snapshot, not the full downloaded archive.';
  const archiveCategories = archive.categories.map(item => `<div class="list-row"><span>${esc(item.category)} · ${item.fileCount.toLocaleString()} ${ar ? 'ملف' : 'files'}</span><b>${(item.reportedBytes / 1e9).toFixed(2)} GB</b></div>`).join('');
  return `${pageHead(ar ? 'بيانات تحدي اللهب في الجاذبية الصغرى' : 'Flame in Freefall · NASA PSI Evidence', ar ? 'فهرس NASA PSI الرسمي مع فرز شفاف لمدى صلة التحقيقات بسلامة الطاقم.' : 'Official NASA PSI Combustion Science inventory with transparent mission-relevance ranking and source-checked findings.')}<div class="grid stats">${stat(ar ? 'تحقيقات في الفهرس' : 'PSI INVESTIGATIONS', data.officialInventory.total, 'Official NASA PSI · Combustion Science', '◉')}${stat(ar ? 'جداول مرفقة' : 'TABLES BUNDLED', bundledCount, 'Original table files checksum verified', '▤')}${stat(ar ? 'صفوف الجداول' : 'SOURCE ROWS', data.recordCountAcrossFiles, 'Separate tables; never pooled', '▤')}${stat(ar ? 'ملفات داعمة' : 'SUPPORTING ASSETS', data.supportingAssets.length, 'Selected imagery, telemetry, and documents', '↗')}</div>${renderEvidenceCoverage(data.investigations, lang)}<article class="card" style="margin-top:15px"><h3>${ar ? 'حجم أرشيف NASA PSI حسب الفهارس' : 'NASA PSI archive inventory'}</h3><p class="sub">${ar ? `استلمنا بيانات وصفية لـ ${archive.listedFileCount.toLocaleString()} ملفاً عبر ${archive.manifestsRetrieved} فهرس دراسة؛ مجموع أحجام الملفات المعلنة ${archiveTB} تيرابايت. هذا وصف للأرشيف وليس تنزيل محتوياته.` : `Metadata lists ${archive.listedFileCount.toLocaleString()} files across ${archive.manifestsRetrieved} retrieved study manifests; the reported file sizes sum to ${archiveTB} TB. This is archive inventory metadata, not a download of those contents.`}</p>${archiveCategories}<p class="sub">${esc(archiveCoverageNote)}</p><div class="callout warn">${ar ? `${archive.manifestsUnavailable} فهارس من أصل ${data.officialInventory.total} لم تُرجع قائمة ملفات في لقطة الاستعلام؛ لا يعني ذلك أن NASA لا تملك ملفات لتلك التحقيقات. لم ننزّل مجموعة Raw Data الضخمة تلقائياً.` : `${archive.manifestsUnavailable} of ${data.officialInventory.total} study manifests returned no file listing in this snapshot; this does not mean NASA has no files for those investigations. The multi-terabyte Raw Data collection was not downloaded automatically.`}</div></article><div class="callout warn">${ar ? `أُرفق ${bundledCount} جدولاً تجريبياً أصلياً مع بصمات تحقق. التحقيقات الأخرى تبقى بياناتها الوصفية وروابطها ظاهرة؛ وحالة فهرس الملفات موضحة في القائمة.` : `${bundledCount} original experimental tables are bundled and checksum-verified. Other investigations remain visible with metadata and source links; their file-index retrieval status is shown below.`}</div><div class="callout">${ar ? 'درجة صلة المهمة = مطابقة موضوع سلامة الطاقم (1–3) + سياق طيران/جاذبية صغرى (0 أو 2). توفر الجدول ظاهر منفصلاً ويكسر التعادل فقط؛ الدرجة ليست خطورة أو قابلية اشتعال.' : 'Mission relevance = crew-fire-safety topic match (1–3) + flight/reduced-gravity context (0 or 2). Table availability is shown separately and only breaks ties; the score is not hazard or flammability.'}</div><details class="card" style="margin:15px 0"><summary><b>${ar ? 'ترتيب تحقيقات NASA PSI حسب صلة المهمة وأهدافها' : 'NASA PSI studies ranked by mission relevance with objectives'}</b> · ${data.officialInventory.total}</summary><div class="inventory-list">${inventory}</div><p class="sub">${ar ? 'الأهداف والمنهج من بيانات NASA PSI الوصفية؛ لا تُعرض على أنها نتائج مقاسة.' : 'Objectives and approaches are NASA PSI metadata, not measured findings. Ground/model and flight investigations are identified separately.'}</p></details><h2>${ar ? 'نتائج مدعومة بالجداول المرفقة' : 'Findings supported by bundled source tables'}</h2><div class="grid two">${findings}</div><div class="callout warn" style="margin-top:15px">${ar ? 'لا تجمع الصفوف بين التحقيقات؛ مجموع الصفوف فهرس ملفات فقط وليس عينة علمية موحدة.' : 'Do not pool rows across studies. The summed row count is a file inventory, not one scientific sample.'}</div><h2>${ar ? 'الجداول التجريبية الأصلية المرفقة' : 'Bundled original experimental tables'}</h2><div class="grid two evidence-grid">${cards}</div><article class="card" style="margin-top:15px"><h3>${ar ? 'ملفات القياس والمستندات' : 'Supporting measurements and documents'}</h3>${data.supportingAssets.map(a => `<div class="list-row"><span>${esc(a.investigationId)} · ${esc(a.filename)}${a.rowCount ? ` · ${a.rowCount} rows × ${a.headers.length} fields` : ''}</span><a href="${esc(a.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI · ${esc(a.category)} · ${esc(a.sourceIntegrity)} ↗</a></div>`).join('')}</article>`;
}
export function bindChallengeLibrary(root, lang = 'en') {
  root.querySelectorAll('[data-investigation]').forEach(button => {
    button.onclick = async () => {
      const id = button.dataset.investigation;
      const target = [...root.querySelectorAll('[id^="source-table-"]')].find(element => element.id === `source-table-${id}`);
      if (target.dataset.loaded === 'true') { target.hidden = !target.hidden; return; }
      button.disabled = true;
      button.textContent = lang === 'ar' ? 'جارٍ تحميل المصدر…' : 'Loading source…';
      try {
        const data = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
        target.innerHTML = `<div class="source-table-result"><p class="sub">${esc(data.rows.length)} rows · ${esc(data.headers.length)} source fields · SHA-256 <code>${esc(data.sourceSha256)}</code></p>${genericTable(data.rows.slice(0, 24), data.headers)}<p class="sub">Showing first ${Math.min(24, data.rows.length)} rows and first ${Math.min(8, data.headers.length)} fields. ${esc(data.note)}</p></div>`;
        target.dataset.loaded = 'true';
      } catch (error) {
        target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
      } finally {
        button.disabled = false;
        button.textContent = lang === 'ar' ? 'استعراض الصفوف' : 'Inspect source rows';
      }
    };
  });
}

function studyAnalysisMarkup(item, ar) {
  const analysis = item.studyAnalysis;
  const title = ar ? (studyNotesArabic[item.id] || item.title) : item.title;
  if (!analysis) return `<div class="callout warn">${ar ? 'لا يتوفر تعريف تحليل لهذه الدراسة.' : 'No study-specific analysis definition is available.'}</div>`;
  const dedicated = analysis.status === 'dedicated-workbench';
  const metrics = analysis.metrics.map(metric => {
    const enoughForMean = metric.n >= 5 && Number.isFinite(metric.mean);
    return `<article class="card metric"><div class="label">${esc(metric.field)}</div><strong>${metric.min === null ? '—' : `${metric.min}–${metric.max}`}</strong><small>${esc(metric.unit)} · n=${metric.n} · ${ar ? 'وسيط' : 'median'} ${metric.median ?? '—'}</small>${enoughForMean ? `<p class="sub">${ar ? 'المتوسط الوصفي' : 'Descriptive mean'} ${metric.mean.toFixed(3)}</p>` : ''}<p class="sub">${ar ? 'مفقود/غير رقمي' : 'Missing/non-numeric'}: ${metric.missingOrNonNumeric}</p></article>`;
  }).join('');
  const conditions = (analysis.conditions || []).map(condition => {
    const values = condition.values.map(entry => `<code>${esc(entry.value)}</code> <small>× ${entry.count}</small>`).join(' · ');
    const omitted = condition.omittedValueCount
      ? ` · ${ar ? `وقيم أخرى ${condition.omittedValueCount}` : `${condition.omittedValueCount} more distinct values`}`
      : '';
    return `<div class="list-row"><span><b>${esc(condition.field)}</b><br><small>${ar ? `قيم مميزة ${condition.distinctValueCount} · مفقود ${condition.missing}` : `${condition.distinctValueCount} distinct values · ${condition.missing} missing`}</small></span><span>${values || '—'}${omitted}</span></div>`;
  }).join('');
  const note = ar ? analysisNotesArabic[item.id] || 'هذا تلخيص وصفي لخلايا المصدر فقط؛ لا يثبت السببية ولا يدمج الدراسات.' : analysis.note;
  const limitations = ar
    ? 'لا تعويض للقيم المفقودة، ولا دمج بين التحقيقات، ولا فواصل ثقة أو اختبارات فرضيات. الوحدات وأسماء الحقول محفوظة من المصدر.'
    : analysis.methods;
  const special = dedicated
    ? `<button class="outline-btn" data-go="Analysis Workbench">${ar ? 'افتح تحليل FLEX المفصل ←' : 'Open detailed FLEX analysis →'}</button>`
    : '';
  const statusTag = dedicated
    ? (ar ? 'تحليل مفصل متاح' : 'DETAILED ANALYSIS AVAILABLE')
    : analysis.metrics.length ? (ar ? 'تلخيص وصفي' : 'DESCRIPTIVE') : (ar ? 'بيانات وصفية/شروط' : 'NO SAFE OUTCOME SUMMARY');
  const noMetric = dedicated
    ? `<div class="callout">${ar ? 'لهذا التحقيق منضدة تحليل تفصيلية خاصة؛ استخدمها بدل ملخص عام.' : 'This investigation has its own detailed analysis workbench; use it instead of a generic summary.'}</div>`
    : analysis.metrics.length === 0
      ? `<div class="callout warn">${ar ? 'لا توجد نتيجة رقمية قابلة للتلخيص بأمان من الجدول المرفق. راجع سبب ذلك أدناه وافتح سجل NASA PSI.' : 'No numeric outcome can be summarized safely from this bundled table. See the study-specific reason below and inspect the NASA PSI record.'}</div>`
    : '';
  return `<div class="card-head"><div><span class="eyebrow">${esc(item.id)} · NASA PSI · ${analysis.includedRows}/${analysis.sourceRows} ${ar ? 'صفًا مشمولًا' : 'rows included'}</span><h3>${esc(title)}</h3></div><span class="tag ${analysis.metrics.length || dedicated ? 'comp' : 'warn'}">${statusTag}</span></div>${metrics ? `<div class="grid three">${metrics}</div>` : ''}${conditions ? `<details class="card" style="margin:12px 0"><summary><b>${ar ? 'شروط التجربة كما وردت في NASA PSI' : 'NASA PSI experiment conditions (verbatim)'}</b></summary><div class="field-list">${conditions}</div><p class="sub">${ar ? 'قيم المصدر الأصلية؛ لم تُوحّد الوحدات ولم تُفسر كنواتج.' : 'Original source values; units are not harmonized and condition labels are not interpreted as outcomes.'}</p></details>` : ''}${noMetric}<p class="sub">${esc(note)}</p><div class="callout">${esc(limitations)}</div><div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? 'سجل NASA PSI' : 'NASA PSI record'} ↗</a>${special}<button class="outline-btn" data-study-rows="${esc(item.id)}">${ar ? 'استعراض صفوف المصدر' : 'Inspect source rows'}</button></div><div id="study-source-rows"></div>`;
}

export async function renderInvestigationLab(lang = 'en') {
  const data = await get('/api/challenge/catalog');
  const ar = lang === 'ar';
  const selected = data.officialInventory.records.find(item => item.rawTableBundled) || data.officialInventory.records[0];
  const rows = data.officialInventory.records.map(item => `<option value="${esc(item.id)}" ${item.id === selected?.id ? 'selected' : ''}>${esc(item.id)} · ${esc(ar ? studyNotesArabic[item.id] || item.acronym || item.title : item.acronym || item.title)}${item.rawTableBundled ? '' : (ar ? ' · بيانات وصفية فقط' : ' · metadata only')}</option>`).join('');
  const firstTable = data.investigations.find(item => item.id === selected?.id);
  return `${pageHead(ar ? 'مختبر تحقيقات NASA PSI' : 'NASA PSI Investigation Lab', ar ? 'تحليل وصفي لكل جدول متاح، مع عرض حدود القياس ومنع دمج تجارب غير متوافقة.' : 'Study-specific descriptive summaries for available PSI tables, with explicit measurement limits and no cross-study pooling.')}<article class="card"><div class="toolbar"><label class="field-label" for="studySelect">${ar ? 'اختر تحقيقًا من فهرس NASA PSI' : 'Select an investigation from the NASA PSI index'}</label><select class="field" id="studySelect">${rows}</select></div><p class="sub">${ar ? 'الفهرس الكامل' : 'Full inventory'}: ${data.officialInventory.total} ${ar ? 'تحقيقًا' : 'investigations'} · ${data.investigations.length} ${ar ? 'جداول أصلية مرفقة' : 'original tables bundled'}. ${ar ? 'الترتيب ليس درجة خطورة؛ كل إحصاء يبقى ضمن دراسته.' : 'Priority is not a hazard score; all summaries stay inside their source study.'}</p><div class="callout warn">${ar ? 'الأرقام الملخصة وصفية فقط؛ لا تعني صفوفًا مستقلة أو أثرًا سببيًا. افتح صفحة الأدلة لقراءة النص الكامل للأهداف والطرق من NASA PSI.' : 'Summaries are descriptive only; they do not imply independent rows or causal effects. Open Challenge Evidence for full NASA PSI objectives and approaches.'}</div></article><section id="studyAnalysisPanel" style="margin-top:15px">${firstTable ? studyAnalysisMarkup(firstTable, ar) : `<div class="callout warn">${ar ? 'لا يوجد جدول محلي لهذا التحقيق في لقطة الملفات الحالية.' : 'No local table is available for this investigation in the current file-index snapshot.'}</div>`}</section>`;
}

export function bindInvestigationLab(root, lang = 'en') {
  const ar = lang === 'ar';
  let dataPromise;
  const loadData = () => dataPromise ||= get('/api/challenge/catalog');
  const select = root.querySelector('#studySelect');
  const panel = root.querySelector('#studyAnalysisPanel');
  if (!select || !panel) return;
  const renderSelected = async () => {
    const data = await loadData();
    const id = select.value;
    const item = data.investigations.find(study => study.id === id);
    if (!item) {
      const metadata = data.officialInventory.records.find(study => study.id === id);
      panel.innerHTML = `<article class="card"><div class="card-head"><h3>${esc(metadata?.title || id)}</h3><span class="tag warn">${ar ? 'لا يوجد جدول محلي' : 'NO LOCAL TABLE'}</span></div><p class="sub">${ar ? 'لم يُرجع فهرس NASA PSI جدولًا تجريبيًا لهذا التحقيق في اللقطة الحالية. هذا لا يثبت عدم وجود ملفات أخرى لدى NASA.' : 'The NASA PSI file-index snapshot returned no experimental table for this investigation. This does not prove NASA has no other files.'}</p><a class="outline-btn" href="${esc(metadata?.nasaRecordUrl || '#')}" target="_blank" rel="noreferrer">NASA PSI ↗</a></article>`;
      return;
    }
    panel.innerHTML = studyAnalysisMarkup(item, ar);
    const button = panel.querySelector('[data-study-rows]');
    if (button) button.onclick = async () => {
      const target = panel.querySelector('#study-source-rows');
      if (target.dataset.loaded === 'true') { target.hidden = !target.hidden; return; }
      button.disabled = true;
      try {
        const table = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
        target.innerHTML = `<div class="source-table-result"><p class="sub">${table.rows.length} ${ar ? 'صفًا' : 'source rows'} · ${table.headers.length} ${ar ? 'حقول' : 'fields'} · SHA-256 <code>${esc(table.sourceSha256)}</code></p>${genericTable(table.rows.slice(0, 24), table.headers)}<p class="sub">${ar ? 'عرض أول 24 صفًا وأول 8 حقول فقط؛ الملف الأصلي يبقى محفوظًا كما ورد.' : `Showing first ${Math.min(24, table.rows.length)} rows and first ${Math.min(8, table.headers.length)} fields; source bytes remain unchanged.`}</p></div>`;
        target.dataset.loaded = 'true';
      } catch (error) {
        target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
      } finally { button.disabled = false; }
    };
  };
  select.onchange = renderSelected;
}

function electricFieldNote(ar) {
  return `<article class="card" style="margin-top:15px"><h2>${ar ? 'اللهب تحت تأثير المجال الكهربائي · PSI-22' : 'Electric-field flame demonstration · PSI-22'}</h2><p>${ar ? 'يعرض فيديو التحدي تجربة لهب المجال الكهربائي: يحرك المجال الأيونات داخل اللهب، وتنقل تصادماتها جزءاً من الزخم إلى الغاز المتعادل، فينشأ جريان أيوني يمكنه تغيير شكل اللهب رغم ضعف الطفو.' : 'The challenge video shows the E-FIELD flame experiment: an electric field moves ions in the flame; collisions transfer momentum to neutral gas and create an ionic wind that can reshape the flame even when buoyancy is weak.'}</p><div class="equation"><b>${ar ? 'قوة كهربائية حجمية على الشحنة' : 'Electric body force on charge'}</b><code>fₑ = ρₑ E</code><p class="sub">${ar ? 'ρₑ كثافة الشحنة الحجمية وE شدة المجال الكهربائي. هذه علاقة للقوة على الشحنات؛ انتقال الزخم إلى الغاز يعتمد على اقتران الأيونات بالجزيئات المتعادلة.' : 'ρₑ is volumetric charge density and E is electric-field strength. This is the force on charged species; momentum transfer to neutral gas depends on ion–neutral coupling.'}</p></div><div class="callout warn">${ar ? 'هذا مثال على نقل قسري للزخم، وليس محاكاة للجاذبية القمرية أو قياساً عند 1/6 g. لا يستنتج المشروع جرياناً أو قوة من جدول PSI-22 دون حقول معايرة مناسبة.' : 'This is an example of forced momentum transport, not a simulation of lunar gravity or a measurement at 1/6 g. The project does not infer flow or force from PSI-22 without suitable calibrated fields.'} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-22" target="_blank" rel="noreferrer">${ar ? 'سجل NASA PSI-22 ↗' : 'NASA PSI-22 record ↗'}</a></div></article>`;
}

export function renderFlamePhysics(lang = 'en') {
  const ar = lang === 'ar';
  const earthLabel = ar ? 'الأرض: الطفو يصنع تياراً طبيعياً' : 'Earth: buoyancy drives natural convection';
  const microLabel = ar ? 'الجاذبية الصغرى: الانتشار والتهوية القسرية' : 'Microgravity: diffusion and forced ventilation';
  const science = ar
    ? `<h2>ما الذي يتغير فيزيائياً؟</h2><p>في الجاذبية الأرضية، تسخّن اللهب الغاز فتقل كثافته؛ ومع الجاذبية يظهر دفع الطفو ويرتفع الغاز الساخن، وتدخل غازات أبرد إلى منطقة التفاعل. في الجاذبية الصغرى يضعف هذا الحمل الطبيعي بشدة، لكن الحركة لا تختفي: الانتشار الجزيئي وحركة المراوح أو تدفق الوقود تظل تنقل المادة والحرارة.</p><p>لذلك قد يصبح اللهب الانتشاري شبه كروي في جو ساكن، وقد يتغير شكله وانتشاره عند وجود تهوية. ليس كل لهب في الفضاء كرة، ولا تعني الجاذبية الصغرى انعدام الأكسجين أو انعدام كل حركة.</p>`
    : `<h2>What changes physically?</h2><p>On Earth, heating makes gases less dense; gravity then drives buoyant motion. Hot products rise while cooler reactants are drawn toward the reaction zone. In microgravity, buoyancy-driven natural convection is strongly reduced, but motion does not vanish: molecular diffusion, fan-driven ventilation, and fuel flow still transport species and heat.</p><p>A diffusion flame can become nearly spherical in a quiescent environment, while ventilation changes its shape and spread. Not every space flame is a sphere, and microgravity does not remove oxygen or all fluid motion.</p>`;
  return `${pageHead(ar ? 'فيزياء اللهب' : 'Flame Physics', ar ? 'مقارنة علمية بين الجاذبية الأرضية والجاذبية الصغرى، مع تمييز الحمل الطبيعي عن التهوية القسرية.' : 'A physics-grounded comparison of buoyant natural convection, diffusion, and forced ventilation.')}<article class="card"><div class="flame-compare"><section><h3>${earthLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? 'مخطط اللهب وتيار الطفو على الأرض' : 'Schematic flame and buoyancy flow on Earth'}"><defs><marker id="arrUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,8 L4,0 L8,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker><linearGradient id="earthFlame" x1="0" x2="0" y1="1" y2="0"><stop stop-color="#ffd56c"/><stop offset=".62" stop-color="#ff7c52"/><stop offset="1" stop-color="#e94b55"/></linearGradient></defs><path d="M180 200 C142 164 171 134 169 103 C196 127 188 75 204 48 C233 96 246 120 224 160 C214 179 200 194 180 200Z" fill="url(#earthFlame)"/><path d="M180 105 C180 79 180 57 180 28" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M94 63 C76 110 84 160 128 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M266 63 C284 110 276 160 232 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? 'عمود غاز ساخن ↑ · دخول هواء أبرد ↓' : 'hot plume ↑ · cool air in ↓'}</text></svg><p class="sub">${ar ? 'قد يميل اللهب إلى الاستطالة أو الوميض بحسب الموقد والجريان؛ الرسم تخطيطي.' : 'Elongated / flickering tendencies depend on burner and flow; the diagram is schematic.'}</p></section><section><h3>${microLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? 'مخطط لهب انتشاري في الجاذبية الصغرى' : 'Schematic diffusion flame under microgravity'}"><defs><radialGradient id="roundFlame"><stop stop-color="#ffe59b"/><stop offset=".47" stop-color="#ff995e"/><stop offset=".82" stop-color="#b760ff"/><stop offset="1" stop-color="#66cdf2" stop-opacity=".15"/></radialGradient><marker id="arrFlow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker></defs><circle cx="180" cy="121" r="56" fill="url(#roundFlame)"/><path d="M62 121 H108 M298 121 H252 M180 35 V65 M180 207 V177" stroke="#4bc8ed" stroke-width="2.5" marker-end="url(#arrFlow)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? 'انتشار + تدفق هواء مفروض إن وُجد' : 'oxidizer diffusion · airflow if present'}</text></svg><p class="sub">${ar ? 'قد يصبح اللهب الانتشاري مستديراً عند ضعف الجريان؛ وتظل التهوية المفروضة مؤثرة في انتقال المادة والحرارة.' : 'A rounded diffusion flame is possible in low-flow microgravity; imposed ventilation still shapes transport.'}</p></section></div><div class="callout">${ar ? 'رسم توضيحي تخطيطي، وليس صورة من تجربة NASA أو صورة لهب مقاسة. التفسير الفيزيائي:' : 'Illustrative schematic, not a NASA experiment photograph or a measured flame image. Physical explanation:'} <a href="https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA combustion and fire safety ↗</a></div></article><div class="grid two" style="margin-top:15px"><article class="card">${science}<div class="equation"><b>${ar ? 'شدة الطفو · عدد غراشوف' : 'Buoyancy strength · Grashof number'}</b><code>Gr = g β ΔT L³ / ν²</code><p class="sub">${ar ? 'يقارن تأثير الطفو بالتأثيرات اللزجة. عندما تقترب الجاذبية الفعالة g من الصفر يضعف دفع الحمل الطبيعي؛ ولا يمثّل Gr نموذجاً كاملاً للحريق.' : 'Compares buoyancy to viscous effects. As effective gravity g approaches zero, buoyant natural-convection forcing shrinks; Gr is not a complete fire model.'}</p></div><div class="equation"><b>${ar ? 'الحمل القسري مقابل الانتشار · عدد بيكليه' : 'Advection versus diffusion · Péclet number'}</b><code>Pe = U L / D</code><p class="sub">${ar ? 'يمثل U سرعة الجريان المفروض، وL مقياس طول، وD معامل انتشار الأنواع الكيميائية. قد تُبقي المراوح Pe غير صفري في الجاذبية الصغرى.' : 'U is imposed flow speed, L a length scale, and D a species diffusivity. Fan-driven airflow can keep Pe nonzero in microgravity.'}</p></div></article><article class="card"><h2>${ar ? 'الأكسجين وسلامة الطاقم' : 'Oxygen and crew safety'}</h2><p>${ar ? 'زيادة نسبة الأكسجين أو ضغطه الجزئي قد توسّع قابلية المواد للاشتعال وتسرّع الاحتراق. لكن ضغط المقصورة وتركيب غازها يحددهما توازن طبي وهندسي، وليس قراراً بإضافة الأكسجين بلا قيود.' : 'Increasing oxygen fraction or partial pressure can widen material flammability and intensify combustion. Cabin pressure and composition are a medical and engineering trade, not a simple instruction to add oxygen without limits.'}</p><div class="equation"><b>${ar ? 'الضغط الجزئي للأكسجين' : 'Oxygen partial pressure'}</b><code>pO₂ = xO₂ · Ptotal</code><p class="sub">${ar ? 'لا تكفي الكسر المولي للأكسجين وحدها؛ فالضغط الكلي وظروف المادة والاختبار مهمة أيضاً.' : 'The oxygen mole fraction alone is not enough: total pressure and material/test conditions matter.'}</p></div><div class="callout warn">${ar ? 'تصحيح مهم: تقليل خطر داء تخفيف الضغط قبل السير الفضائي يرتبط بإجراءات إزالة النيتروجين والضغط والوقت؛ لا يعني ذلك أن المقصورة تُزاد أكسجيناً دائماً. توثّق NASA أن الأجواء الغنية بالأكسجين ترفع مخاطر الحريق.' : 'Important correction: reducing decompression-sickness risk before an EVA involves denitrogenation, pressure, and timing protocols; it does not mean the cabin is simply kept oxygen-enriched. NASA documents the fire hazards of oxygen-rich atmospheres.'}</div><p class="sub">${ar ? 'المراجع: ' : 'References: '}<a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">NASA-STD-3001 Vol. 2 ↗</a> · <a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">NASA Fire Protection technical brief ↗</a></p></article></div><article class="card" style="margin-top:15px"><h2>${ar ? 'معادلات البحث وحدوده' : 'Research equations and limits'}</h2><div class="grid three"><div class="equation"><b>${ar ? 'قانون مربع قطر القطرة السائلة' : 'Liquid-droplet d² law'}</b><code>D²(t) = D₀² − Kt</code><p class="sub">${ar ? 'علاقة نموذجية عند تحقق افتراضات احتراق القطرة شبه المستقر. يعتمد K على ظروف الاختبار؛ ولا يُستخدم لسرعة انتشار لهب المواد الصلبة أو عند غياب تعريف ووحدات واضحة.' : 'A model under stated quasi-steady droplet-burning assumptions. K is condition-dependent; do not apply it to solid-material flame spread or infer K where units/definitions are absent.'}</p></div><div class="equation"><b>${ar ? 'نسبة تسارع الجاذبية' : 'Gravitational acceleration ratio'}</b><code>g* = g_eff / g₀</code><p class="sub">${ar ? 'استخدم التسارع وعدم اليقين اللذين أبلغت عنهما التجربة. «الجاذبية الصغرى» بيئة تشغيلية، وليست بالضرورة g = 0 رياضياً.' : 'Use the experiment\'s reported acceleration and uncertainty. “Microgravity” is an operational environment, not mathematical g = 0.'}</p></div><div class="equation"><b>${ar ? 'عوامل التحكم بالحريق' : 'Fire-control framing'}</b><code>risk = f(fuel, oxidizer, ignition, flow, geometry)</code><p class="sub">${ar ? 'قائمة عوامل تصورية وليست معادلة احتمالية معايرة. يعرض المشروع الأدلة وظروف الاختبار ولا يصدر أوامر تشغيلية للإخماد.' : 'A conceptual factor list, not a calibrated probability equation. The project reports evidence and test conditions; it does not issue operational suppression commands.'}</p></div></div></article>${electricFieldNote(ar)}${flameScene3d(lang)}`;
}

export function renderMissionAtmospheres(lang = 'en') {
  const ar = lang === 'ar';
  const cases = [
    { en: 'Earth / ISS reference', ar: 'مرجع الأرض / محطة الفضاء', p: 14.7, o: 21, noteEn: 'Nominal sea-level / ISS atmosphere; reference condition.', noteAr: 'جو اسمي عند مستوى سطح البحر / محطة الفضاء؛ حالة مرجعية.' },
    { en: 'Shuttle campout atmosphere', ar: 'جو التحضير للـ EVA في المكوك', p: 10.2, o: 26.5, noteEn: 'A lower-pressure EVA preparation atmosphere used in shuttle operations.', noteAr: 'جو أقل ضغطاً استُخدم للتحضير للسير الفضائي في عمليات المكوك.' },
    { en: 'Exploration atmosphere concept', ar: 'تصور جو الاستكشاف', p: 8.2, o: 34, noteEn: 'A NASA exploration design concept for habitats / surface vehicles; not a universal or final flight setting.', noteAr: 'تصور تصميمي لناسا للمساكن أو المركبات السطحية؛ ليس إعداداً موحداً أو نهائياً لكل رحلة.' },
    { en: 'US EVA suit reference', ar: 'مرجع بدلة السير الفضائي الأمريكية', p: 4.3, o: 100, noteEn: 'Low-pressure pure-oxygen suit environment; operational protocols remain mission-specific.', noteAr: 'بيئة بدلة منخفضة الضغط وأكسجين نقي؛ إجراءات التشغيل تختلف حسب المهمة.' }
  ];
  const rows = cases.map(c => `<tr><td><b>${ar ? c.ar : c.en}</b><br><small>${ar ? c.noteAr : c.noteEn}</small></td><td>${c.p.toFixed(1)} psia</td><td>${c.o}%</td><td>${(c.p * c.o / 100).toFixed(2)} psia</td></tr>`).join('');
  const title = ar ? 'أجواء المهمات وانتقال الطاقم' : 'Mission Atmospheres & EVA Transitions';
  return `${pageHead(title, ar ? 'مقارنة الضغط ونسبة الأكسجين وضغطه الجزئي، ولماذا ترتبط خيارات الجو بتهيئة الطاقم ومخاطر الحريق.' : 'Compare total pressure, oxygen fraction, and dry-gas oxygen partial pressure—and why atmosphere choices couple EVA preparation with fire safety.')}<div class="callout warn">${ar ? 'هذه ظروف مرجعية وتصميمية من وثائق ناسا، وليست وصفة جو لمركبة أو ادعاءً بأن إعداداً واحداً قد اعتُمد لكل مهمة قمرية.' : 'These are reference and design-study conditions from NASA documents, not a prescribed vehicle atmosphere or a claim that one setting is final for every lunar mission.'}</div><article class="card" style="margin-top:15px"><h2>${ar ? 'مقارنة مرجعية' : 'Reference atmosphere cases'}</h2><div class="table-wrap"><table><thead><tr><th>${ar ? 'الحالة' : 'Case'}</th><th>${ar ? 'الضغط الكلي' : 'Total pressure'}</th><th>${ar ? 'الأكسجين حجماً' : 'O₂ by volume'}</th><th>${ar ? 'ضغط O₂ الجزئي الجاف المحسوب' : 'Computed dry-gas pO₂'}</th></tr></thead><tbody>${rows}</tbody></table></div><p class="sub">${ar ? 'الحساب: ضغط O₂ الجزئي = الكسر المولي للأكسجين × الضغط الكلي. النتائج مشتقة حسابياً من قيم الضغط والتركيب المنشورة، وليست قياسات PSI.' : 'Calculation: oxygen partial pressure = oxygen mole fraction × total pressure. Values are calculated from the cited pressure/composition inputs; they are not PSI experiment measurements.'}</p></article><div class="grid two" style="margin-top:15px"><article class="card"><h2>${ar ? 'لماذا يتغير جو المقصورة قبل EVA؟' : 'Why change a cabin atmosphere before EVA?'}</h2><p>${ar ? 'عند خفض الضغط للانتقال إلى بدلة السير الفضائي، قد يسبب النيتروجين الذائب في الأنسجة خطر داء تخفيف الضغط. بروتوكولات إزالة النيتروجين قبل الخروج، بما فيها تنفس الأكسجين وتوقيت الانتقال والضغط، تقلل الخطر. لذلك تدرس ناسا أجواء استكشاف بضغط كلي أقل ونسبة O₂ أعلى لتقليل عبء التحضير؛ هذه موازنة طبية وتشغيلية وهندسية وليست قاعدة أن المقصورة تُغنى بالأكسجين دائماً.' : 'Reducing pressure for an EVA suit transition can create decompression-sickness risk from inert nitrogen dissolved in body tissues. Prebreathe / denitrogenation protocols, transition pressure, and timing manage that risk. NASA studies lower-pressure, higher-O₂ exploration atmospheres to reduce EVA preparation burden; this is a medical, operational, and engineering trade—not a rule that cabins are always oxygen-enriched.'}</p><p class="sub">${ar ? 'المتغيرات الطبية تشمل الضغط الجزئي المستنشق وبخار الماء؛ الجدول أعلاه يعرض ضغط الأكسجين في خليط الغاز الجاف للتوضيح فقط.' : 'Physiological inspired oxygen also depends on water-vapor pressure and the breathing protocol; the table uses dry-gas partial pressure as a clear atmosphere comparison only.'}</p></article><article class="card"><h2>${ar ? 'لماذا هذا مهم للاحتراق؟' : 'Why this matters to combustion'}</h2><p>${ar ? 'في المثال التصميمي 8.2 psia و34% O₂، يبقى pO₂ الجاف قريباً من مرجع 14.7 psia و21% O₂، لكن نسبة الأكسجين أعلى بكثير. تشابه pO₂ لا يجعل قابلية الاشتعال متطابقة: الاحتراق يتأثر بنسبة الأكسجين والضغط الكلي والغاز المخفف والوقود والهندسة والتدفق ومصدر الإشعال.' : 'In the 8.2-psia / 34%-O₂ design case, dry-gas pO₂ is near the 14.7-psia / 21%-O₂ reference, while oxygen fraction is much higher. Similar pO₂ does not mean equivalent flammability: combustion also depends on oxygen concentration, total pressure, diluent, fuel, geometry, flow, and ignition.'}</p><div class="callout">${ar ? 'بيانات NASA PSI-20 (ACME BRE) تذكر 21%, 26.5%, 34% و40% ضمن ملخصات أيام الاختبار، لكنها لا تسجل الضغط لكل ملخص؛ لذلك لا تصلح وحدها لربط الأكسجين بالضغط أو استنتاج حد اشتعال.' : 'NASA PSI-20 (ACME BRE) day summaries include oxygen-concentration entries such as 21%, 26.5%, 34%, and 40%, but pressure is not resolved for each summary. They cannot alone establish a pressure–oxygen relationship or a flammability limit.'}</div></article></div><article class="card" style="margin-top:15px"><h2>${ar ? 'دلالات البحث لسلامة الحريق' : 'Research implications for fire safety'}</h2><ol><li>${ar ? 'اختبار المواد نفسها عند نطاقات O₂ والضغط الخاصة بكل تصميم، مع الإبلاغ عن الاشتعال والاستمرار والإخماد.' : 'Test the actual materials across each design’s oxygen and pressure envelope; report ignition, sustained burning, and extinction separately.'}</li><li>${ar ? 'تغيير متغير واحد أو بناء تصميم تجريبي متعدد العوامل، حتى يمكن فصل أثر O₂ عن الضغط والتهوية.' : 'Use controlled or factorial experiments to separate oxygen-fraction effects from pressure and ventilation effects.'}</li><li>${ar ? 'تقييم التهوية والكشف والإخماد معاً؛ ضعف الطفو لا يلغي التدفق القسري أو انتقال الدخان.' : 'Evaluate ventilation, detection, and suppression together; weak buoyancy does not remove forced flow or smoke transport.'}</li></ol><p class="sub">${ar ? 'الجدول يضم ظروفاً تاريخية أو تصميمية من مصادر NASA؛ بيانات التجارب الأساسية في المشروع تبقى ملفات NASA PSI، ولا يُستنتج منه ترتيب خطر معتمد.' : 'The table mixes historical and design-study contexts from NASA sources. The project’s primary experimental evidence remains NASA PSI; these scenarios do not establish a certified hazard ranking.'}</p><div class="list-row"><span>NASA OCHMO-TB-003 · Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${ar ? 'فتح المصدر ↗' : 'Open source ↗'}</a></div><div class="list-row"><span>NASA 2026 · Lunar and Planetary Science Conference atmosphere presentation</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS ↗</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 · Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? 'فتح المصدر ↗' : 'Open source ↗'}</a></div><div class="list-row"><span>Primary experiment context · NASA PSI-20 / ACME BRE</span><a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-20" target="_blank" rel="noreferrer">NASA PSI ↗</a></div></article>`;
}

export function renderSafetyInsights(lang = 'en') {
  const ar = lang === 'ar';
  const cards = ar ? [
    ['1 · إدارة جو المقصورة والمواد', 'تحديد نطاق أكسجين وضغط يفي بمتطلبات الطاقم والتحضير للسير الفضائي، من دون إثراء غير مبرر؛ ثم تأهيل المواد نفسها ضمن نطاق التركيب والضغط والتهوية المقصود. لا تكفي شهادة المادة في هواء الأرض وحده.', 'NASA-STD-3001 · موازنة صحة الطاقم والحريق؛ PSI-25 · BASS-II لبيانات المواد والاختبار.'],
    ['2 · التحكم بمصادر الإشعال', 'إدارة الطاقة والحرارة، وإزالة تراكم الألياف والغبار والمواد القابلة للاشتعال، والتحقق من المعدات التي قد تولّد شرراً أو أسطحاً ساخنة.', 'NASA Fire Protection · الوقاية جزء من منظومة الحماية.'],
    ['3 · كشف الدخان والغازات', 'تحديد الكواشف وفق مسارات تهوية المقصورة. في الجاذبية الصغرى لا يصعد الدخان تلقائياً إلى السقف؛ حركة الهواء القسرية مهمة. استخدم مؤشرات مناسبة مثل الجسيمات وCO وفق تصميم النظام.', 'PSI-98 / 99 / 100 وPSI-101 / 102 · انتشار الدخان والهباء موضوع مستقل عن سرعة اللهب.'],
    ['4 · الإخماد والاستجابة', 'اختبار وسيلة الإخماد على نوع الوقود والهندسة والضغط وxO₂ وتدفق التهوية الفعلية، ثم تدريب الطاقم على العزل والاستجابة. لا توجد وسيلة واحدة يمكن تعميمها من صفين أو تجربة مختلفة.', 'NASA OCHMO-TB-008 · الوقاية والكشف والاستجابة والإخماد معاً.']
  ] : [
    ['1 · Manage cabin atmosphere and materials', 'Keep oxygen fraction and total pressure within the minimum validated mission and crew-health envelope; do not enrich without a defined need. Then qualify the actual materials across that composition, pressure, and ventilation range. Terrestrial-air qualification alone is not enough.', 'NASA-STD-3001 · crew-health/fire trade; PSI-25 · BASS-II material-test evidence.'],
    ['2 · Control ignition sources', 'Manage electrical and thermal energy, remove lint, dust, and combustible accumulation, and qualify equipment that can create sparks or hot surfaces.', 'NASA Fire Protection · prevention is one layer of an integrated safety strategy.'],
    ['3 · Detect smoke and gases', 'Place detectors with cabin ventilation paths in mind. In microgravity smoke does not rise to a ceiling by buoyancy; forced airflow shapes transport. Use validated particle and CO detection suited to the vehicle.', 'PSI-98 / 99 / 100 and PSI-101 / 102 address spacecraft fire/smoke evidence, not a universal flame-speed metric.'],
    ['4 · Suppress and respond', 'Test suppressant delivery against the actual fuel, geometry, oxygen fraction, pressure, and ventilation. Train isolation and response procedures. Two trials or a different experiment cannot establish a universal best suppressant.', 'NASA OCHMO-TB-008 · prevention, detection, response, and suppression belong together.']
  ];
  const ref = ar ? 'مبادئ تصميم بحثية وليست إجراءات تشغيل أو وصفات لجو المركبة.' : 'Research design implications only; these are not vehicle operating procedures or cabin-atmosphere prescriptions.';
  return `${pageHead(ar ? 'استنتاجات سلامة الحريق' : 'Fire Safety Insights', ar ? 'تحويل الأدلة إلى أسئلة تصميم قابلة للاختبار من دون ادعاء تصديق أو تصنيف خطر عام.' : 'Turn NASA evidence into testable design actions without claiming certification or a universal hazard ranking.')}<div class="equation"><b>${ar ? 'ضغط الأكسجين الجزئي' : 'Oxygen partial pressure'}</b><code>pO₂ = xO₂ · Ptotal</code><p class="sub">${ar ? 'نسبة الأكسجين وحدها لا تكفي لوصف الجو. تغيّر الضغط أو التركيب قد يغيّر حدود الاشتعال؛ لا نوصي بإعدادات جو للطاقم.' : 'Oxygen fraction alone does not define the atmosphere. Changing total pressure or composition changes flammability conditions; this dashboard does not prescribe crew atmosphere settings.'}</p></div><div class="grid two safety-grid">${cards.map(([title, body, evidence]) => `<article class="card safety-card"><span class="tag comp">${ar ? 'إجراء وقائي' : 'DESIGN CONTROL'}</span><h2>${title}</h2><p>${body}</p><div class="callout">${evidence}</div></article>`).join('')}</div><article class="card" style="margin-top:15px"><h2>${ar ? 'أسئلة اختبار قابلة للتنفيذ' : 'Actionable qualification questions'}</h2><ol><li>${ar ? 'هل المادة نفسها اختُبرت عند ضغط الأكسجين المتوقع، لا عند نسبة O₂ وحدها؟' : 'Was the exact material tested at the expected oxygen partial pressure, not oxygen fraction alone?'}</li><li>${ar ? 'هل اتجاه وسرعة التهوية وموضع الكاشف مطابق لبيئة الاستخدام؟' : 'Do airflow speed/direction and detector location match the intended environment?'}</li><li>${ar ? 'هل نتيجة الإخماد تقيس إطفاء اللهب المرئي وتوقف التفاعل الكيميائي كلٌّ على حدة؟' : 'Does the suppression outcome separately measure visible-flame extinction and cessation of chemical reaction?'}</li><li>${ar ? 'هل عدد التكرارات وعدم اليقين كافيان قبل تعميم الاستنتاج؟' : 'Are replication and uncertainty adequate before generalizing the result?'}</li></ol><p class="sub">${ref}</p><div class="list-row"><span>NASA OCHMO-TB-008 · Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${ar ? 'فتح المصدر ↗' : 'Open source ↗'}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 · Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? 'فتح المصدر ↗' : 'Open source ↗'}</a></div><div class="list-row"><span>NASA combustion and fire safety investigations</span><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">${ar ? 'فتح المصدر ↗' : 'Open source ↗'}</a></div></article>`;
}
