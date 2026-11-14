import { esc } from './dom.js';

// Editorial evidence map based on docs/CHALLENGE_DATA_REVIEW.md. The statuses
// describe what each bundled table can support, not the quality of a system.
const profiles = {
  'PSI-20': { flame: 'partial', conditions: 'direct' },
  'PSI-21': { flame: 'partial', conditions: 'direct' },
  'PSI-22': { flame: 'partial', conditions: 'direct' },
  'PSI-23': { flame: 'partial', conditions: 'direct' },
  'PSI-25': { material: 'direct', suppression: 'partial', conditions: 'direct' },
  'PSI-26': { material: 'conditions', suppression: 'conditions', conditions: 'partial' },
  'PSI-39': { flame: 'conditions', conditions: 'direct' },
  'PSI-47': { smoke: 'partial', conditions: 'partial' },
  'PSI-68': { flame: 'conditions', suppression: 'conditions', conditions: 'direct' },
  'PSI-69': { flame: 'direct', suppression: 'direct', conditions: 'direct' },
  'PSI-98': { material: 'partial', conditions: 'partial' },
  'PSI-99': { material: 'partial', conditions: 'partial' },
  'PSI-100': { material: 'conditions', conditions: 'direct' },
  'PSI-101': { smoke: 'direct', conditions: 'direct' },
  'PSI-102': { material: 'direct', smoke: 'partial', conditions: 'partial' },
  'PSI-107': { flame: 'partial', conditions: 'direct' },
};

const labels = {
  en: {
    title: 'Evidence coverage by investigation',
    sub: 'A quick map of what the bundled source tables contain. Statuses reflect the source review, not safety performance.',
    study: 'NASA PSI investigation',
    flame: 'Flame / ignition',
    material: 'Materials / fires',
    smoke: 'Smoke / aerosol',
    suppression: 'Extinction / suppression',
    conditions: 'Test conditions',
    direct: 'Measured values or source outcomes',
    partial: 'Limited or indirect rows',
    conditionsOnly: 'Conditions / metadata only',
    none: 'No bundled evidence in this domain',
    directShort: 'Measured',
    partialShort: 'Limited',
    conditionsShort: 'Conditions',
    noneShort: '—',
    source: 'NASA PSI record ↗',
    note: 'Rows stay within their own investigation; a cell is not a cross-study score.',
  },
  ar: {
    title: 'خريطة تغطية الأدلة حسب التحقيق',
    sub: 'ملخص سريع لمحتوى الجداول الأصلية المرفقة. الحالات مبنية على مراجعة المصدر ولا تمثل أداء السلامة.',
    study: 'تحقيق NASA PSI',
    flame: 'اللهب / الاشتعال',
    material: 'المواد / الحرائق',
    smoke: 'الدخان / الهباء',
    suppression: 'الانطفاء / الإخماد',
    conditions: 'ظروف الاختبار',
    direct: 'قيم مقاسة أو نتائج في المصدر',
    partial: 'صفوف محدودة أو غير مباشرة',
    conditionsOnly: 'ظروف / بيانات وصفية فقط',
    none: 'لا دليل مرفق في هذا المجال',
    directShort: 'مقاس',
    partialShort: 'محدود',
    conditionsShort: 'ظروف',
    noneShort: '—',
    source: 'سجل NASA PSI ↗',
    note: 'تبقى الصفوف ضمن تحقيقها؛ الخلايا ليست درجة مقارنة بين الدراسات.',
  },
};

export function renderEvidenceCoverage(investigations, lang = 'en') {
  const l = labels[lang === 'ar' ? 'ar' : 'en'];
  const columns = ['flame', 'material', 'smoke', 'suppression', 'conditions'];
  const table = investigations
    .map((study) => {
      const p = profiles[study.id] || {};
      const cells = columns
        .map((key) => {
          const status = p[key] || 'none';
          const name =
            status === 'direct'
              ? l.direct
              : status === 'partial'
                ? l.partial
                : status === 'conditions'
                  ? l.conditionsOnly
                  : l.none;
          const short =
            status === 'direct'
              ? l.directShort
              : status === 'partial'
                ? l.partialShort
                : status === 'conditions'
                  ? l.conditionsShort
                  : l.noneShort;
          return `<td><span class="coverage-cell coverage-${status}" title="${esc(name)}" aria-label="${esc(name)}">${esc(short)}</span></td>`;
        })
        .join('');
      return `<tr><th scope="row"><a href="${esc(study.sourceUrl)}" target="_blank" rel="noreferrer">${esc(study.id)} · ${esc(study.title)} ↗</a></th>${cells}</tr>`;
    })
    .join('');
  return `<section class="card evidence-coverage" aria-labelledby="coverage-title"><div class="card-head"><div><h3 id="coverage-title">${l.title}</h3><p class="sub">${l.sub}</p></div><span class="tag">${investigations.length} ${lang === 'ar' ? 'جداول' : 'bundled tables'}</span></div><div class="table-wrap"><table><thead><tr><th scope="col">${l.study}</th>${columns.map((key) => `<th scope="col">${l[key]}</th>`).join('')}</tr></thead><tbody>${table}</tbody></table></div><div class="coverage-legend"><span><i class="coverage-swatch coverage-direct"></i>${l.direct}</span><span><i class="coverage-swatch coverage-partial"></i>${l.partial}</span><span><i class="coverage-swatch coverage-conditions"></i>${l.conditionsOnly}</span><span><i class="coverage-swatch coverage-none"></i>${l.none}</span></div><p class="sub">${l.note}</p></section>`;
}
