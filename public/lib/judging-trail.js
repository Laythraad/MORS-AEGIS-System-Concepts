import { esc } from './dom.js';

export function judgingTrail(evidence, lang = 'en') {
  const ar = lang === 'ar';
  const inventoryCount = esc(evidence.officialInventory.total);
  const tableCount = esc(evidence.investigations.length);
  const rowCount = esc(evidence.recordCountAcrossFiles);
  const steps = ar
    ? [
        {
          number: '01',
          title: 'اكتشف الدليل',
          body: `ابدأ بفهرس NASA PSI: ${inventoryCount} تحقيقاً، منها ${tableCount} جداول أصلية مرفقة ببصمات تحقق. كل دراسة تبقى مستقلة.`,
          action: 'افتح فهرس الأدلة ←',
          page: 'Challenge Evidence',
        },
        {
          number: '02',
          title: 'افحص القياسات',
          body: `استكشف ${rowCount} صف مصدر عبر مخططات تفاعلية بحسب الدراسة، وافتح تفاصيل النقطة وظروفها دون دمج تجارب مختلفة.`,
          action: 'اعرض المخططات ←',
          page: 'Chart Guide',
        },
        {
          number: '03',
          title: 'حوّلها إلى سؤال',
          body: 'اربط ما تدعمه القياسات بأسئلة قابلة للاختبار حول المواد والكشف والإخماد. المفاهيم الهندسية فرضيات بحثية وليست عتاداً معتمداً.',
          action: 'استكشف أسئلة السلامة ←',
          page: 'Safety Insights',
          extraAction: 'شاهد مفاهيم 3D',
          extraPage: '3D Models',
        },
      ]
    : [
        {
          number: '01',
          title: 'Find the evidence',
          body: `Start with the NASA PSI index: ${inventoryCount} investigations, including ${tableCount} bundled original tables with verified hashes. Each study stays separate.`,
          action: 'Open source evidence →',
          page: 'Challenge Evidence',
        },
        {
          number: '02',
          title: 'Inspect measurements',
          body: `Explore ${rowCount} source rows through study-specific interactive plots; inspect point details and conditions without pooling unlike experiments.`,
          action: 'Open interactive plots →',
          page: 'Chart Guide',
        },
        {
          number: '03',
          title: 'Turn evidence into a question',
          body: 'Connect what measurements support to testable questions about materials, detection, and suppression. Engineering concepts remain research hypotheses, not qualified hardware.',
          action: 'Open bounded safety questions →',
          page: 'Safety Insights',
          extraAction: 'Explore 3D concepts',
          extraPage: '3D Models',
        },
      ];
  const heading = ar ? 'مسار عرض تحكيمي · ٩٠ ثانية' : '90-second judging path';
  const intro = ar
    ? 'ثلاث خطوات تُظهر كيف ينتقل المشروع من مصدر NASA إلى فحص القياس ثم إلى سؤال سلامة قابل للاختبار.'
    : 'Three short stops show how the project moves from NASA sources to inspected measurements to a testable safety question.';
  const pitch = ar
    ? 'تميّزنا: نجعل دليل NASA قابلاً للتتبع من صف المصدر إلى التحليل، ثم نوضح حدوده قبل صياغة سؤال هندسي.'
    : 'Our edge: trace NASA evidence from source row through analysis, make its limits visible, then frame a testable engineering question.';

  return `<section class="card judging-trail" aria-labelledby="judgingTrailTitle">
    <div class="card-head"><div><span class="eyebrow">MORS AEGIS · LIVE DEMO</span><h2 id="judgingTrailTitle">${heading}</h2><p class="sub">${intro}</p></div><span class="tag">90 s</span></div>
    <div class="grid three judging-trail-steps">${steps
      .map(
        (step) =>
          `<article class="judging-trail-step"><span class="stepnum">${step.number}</span><h3>${step.title}</h3><p class="sub">${step.body}</p><button class="outline-btn" data-go="${esc(step.page)}">${step.action}</button>${step.extraAction ? `<button class="text-btn" data-go="${esc(step.extraPage)}">${step.extraAction} →</button>` : ''}</article>`,
      )
      .join('')}</div>
    <p class="callout judging-trail-pitch">${pitch}</p>
  </section>`;
}
