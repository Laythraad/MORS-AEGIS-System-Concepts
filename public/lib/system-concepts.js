const copy = {
  en: {
    title: 'Research system concepts',
    intro: 'Concepts inspired by the Flame in Freefall work. The diagrams explain questions and measurement ideas; they are not qualified hardware or validated suppression systems.',
    model: 'HARBOR · perimeter observation concept',
    modelIntro: 'A schematic reconstruction from the related research notes. It is not the original Blender model and is not to scale.',
    orbit: 'Drag to rotate · arrow keys also work',
    exploded: 'Exploded view', airflow: 'Show airflow', reset: 'Reset view',
    labelRing: 'Perimeter sensor ring', labelHood: 'Test hood / enclosure', labelBase: 'Mounting frame',
    concern: 'OPEN ENGINEERING ISSUE',
    concernText: 'The related Blender checks reported ring-to-hood intersections. Mechanical clearance is unresolved. This schematic cannot establish fit, fabrication tolerances, load capacity, thermal performance, or flight suitability.',
    pathway: '2D · candidate extinction pathways',
    pathwayIntro: 'A proposed comparison framework for controlled tests: change one transport or boundary condition at a time and record the response. Pathways below are hypotheses and measurement prompts, not proven suppression outcomes.',
    oxygen: 'Oxygen availability', oxygenText: 'Candidate variable: local oxidizer concentration. Measure concentration and flow independently.',
    flow: 'Forced flow', flowText: 'Candidate variable: imposed ventilation velocity and direction. Do not infer it from flame shape.',
    heat: 'Heat transfer', heatText: 'Candidate response: temperature history and heat loss at defined locations.',
    fuel: 'Fuel boundary', fuelText: 'Candidate variable: fuel form, exposed area, and supply condition, controlled per test protocol.',
    source: 'Evidence and design boundary',
    sourceText: 'NASA research motivates the scientific questions. These concepts are MORS research proposals; the cited studies did not test or endorse these devices.',
    ntrs: 'NASA NTRS · SoFIE-GEL investigation', psi: 'NASA PSI · Combustion Science',
    note: 'PSI-69 droplet burning-rate measurements do not validate solid-material behavior or these proposed system concepts.',
    status: 'Concept only · no prototype test or qualification',
  },
  ar: {
    title: 'تصاميم أنظمة بحثية',
    intro: 'أفكار مستلهمة من عمل Flame in Freefall. تشرح الرسومات أسئلة البحث وأفكار القياس؛ وليست عتاداً مؤهلاً أو أنظمة إخماد مثبتة.',
    model: 'HARBOR · مفهوم رصد محيطي',
    modelIntro: 'إعادة رسم تخطيطية من ملاحظات البحث المرتبطة. ليست ملف Blender الأصلي وليست بمقياس هندسي.',
    orbit: 'اسحب للتدوير · ويمكن استخدام الأسهم',
    exploded: 'عرض الأجزاء منفصلة', airflow: 'إظهار مسار الهواء', reset: 'إعادة العرض',
    labelRing: 'حلقة حساسات محيطية', labelHood: 'غطاء / حيز الاختبار', labelBase: 'إطار تثبيت',
    concern: 'مسألة هندسية غير محسومة',
    concernText: 'أظهرت فحوص Blender المرتبطة تقاطعاً بين الحلقة والغطاء. الخلوص الميكانيكي غير محسوم. لا يثبت هذا الرسم الملاءمة أو سماحات التصنيع أو تحمل الأحمال أو الأداء الحراري أو صلاحية الطيران.',
    pathway: '٢D · مسارات إخماد محتملة',
    pathwayIntro: 'إطار مقارنة مقترح لاختبارات مضبوطة: تغيير شرط انتقال أو حدّي واحد في كل مرة وتسجيل الاستجابة. المسارات أدناه فرضيات ومحفزات للقياس، وليست نتائج إخماد مثبتة.',
    oxygen: 'توفر الأكسجين', oxygenText: 'متغير محتمل: تركيز المؤكسد محلياً. يقاس التركيز والجريان كلٌّ على حدة.',
    flow: 'الجريان القسري', flowText: 'متغير محتمل: سرعة التهوية المفروضة واتجاهها. لا يُستنتج من شكل اللهب.',
    heat: 'انتقال الحرارة', heatText: 'استجابة محتملة: سجل الحرارة وفقدها عند مواضع محددة.',
    fuel: 'حدود الوقود', fuelText: 'متغير محتمل: شكل الوقود ومساحته المكشوفة وظروف تغذيته، وفق بروتوكول الاختبار.',
    source: 'الأدلة وحدود التصميم',
    sourceText: 'تُلهم أبحاث NASA الأسئلة العلمية. هذه المقترحات البحثية من MORS؛ الدراسات المرتبطة لم تختبر هذه الأجهزة ولم تعتمدها.',
    ntrs: 'NASA NTRS · تحقيق SoFIE-GEL', psi: 'NASA PSI · علوم الاحتراق',
    note: 'قياسات معدل احتراق القطرات في PSI-69 لا تتحقق من سلوك المواد الصلبة أو من مفاهيم الأنظمة المقترحة هنا.',
    status: 'مفهوم فقط · لا اختبار لنموذج أولي أو تأهيل',
  },
};

export function renderSystemConcepts(lang = 'en') {
  const x = copy[lang === 'ar' ? 'ar' : 'en'];
  const t = (key) => x[key];
  return `<div class="system-concepts">
    <div class="page-head"><div><div class="eyebrow">MORS AEGIS · FLAME IN FREEFALL</div><h2>${t('title')}</h2><p class="sub">${t('intro')}</p></div></div>
    <article class="card concept-card"><div class="card-head"><div><h3>${t('model')}</h3><p class="sub">${t('modelIntro')}</p></div><span class="concept-badge">${t('status')}</span></div>
      <div class="concept-controls" role="group" aria-label="${t('model')}"><button class="outline-btn" type="button" data-concept-explode aria-pressed="false">${t('exploded')}</button><button class="outline-btn active" type="button" data-concept-air aria-pressed="true">${t('airflow')}</button><button class="quiet-btn" type="button" data-concept-reset>${t('reset')}</button><span class="sub">${t('orbit')}</span></div>
      <div class="concept-stage" data-exploded="false" data-air="true" tabindex="0" role="application" aria-label="${t('model')} — ${t('orbit')}">
        <svg class="harbor-svg" viewBox="0 0 820 430" aria-labelledby="harbor-title harbor-desc" role="img"><title id="harbor-title">${t('model')}</title><desc id="harbor-desc">${t('modelIntro')}</desc>
          <defs><linearGradient id="hoodFill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#6dd8e8" stop-opacity=".24"/><stop offset="1" stop-color="#1685a0" stop-opacity=".08"/></linearGradient><marker id="airArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#1aa6ca"/></marker></defs>
          <g class="harbor-assembly"><g class="hood"><path d="M250 115 510 115 610 175 350 175Z"/><path d="M250 115V300L350 360V175"/><path d="M350 360H610V175"/><path d="M510 115V300L610 360"/><path d="M250 300 510 300 610 360"/><path class="hood-panel" d="M275 137 492 137 575 187 358 187Z"/></g>
          <g class="frame"><path d="M205 365H640M225 352l-25 18m415-18 25 18M252 318v46m274-46v46"/></g>
          <g class="sensor-ring"><ellipse cx="430" cy="196" rx="213" ry="84"/><ellipse cx="430" cy="196" rx="213" ry="84" transform="translate(0 28) scale(1 .78)"/><path d="M217 196v22m71-51v22m71-40v22m71-37v22m71-18v22m71-4v22m71 23v22"/>{Array.from({length:12},(_,i)=>{const a=(Math.PI*2*i)/12;const cx=430+213*Math.cos(a),cy=196+84*Math.sin(a);return '<circle class="sensor-dot" cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="5"/>'}).join('')}</g>
          <g class="air-stream"><path d="M130 226C205 210 247 225 305 228"/><path d="M676 242C608 226 573 231 531 238"/><path d="M410 390V311"/></g></g>
          <g class="labels"><text x="505" y="86">${t('labelRing')}</text><path d="M500 91 536 145"/><text x="62" y="149">${t('labelHood')}</text><path d="M175 153 267 174"/><text x="628" y="388">${t('labelBase')}</text><path d="m635 376-32-18"/></g>
        </svg>
      </div><p class="sub concept-hint" aria-live="polite">${t('orbit')}</p><div class="callout warn"><b>${t('concern')}:</b> ${t('concernText')}</div></article>
    <article class="card concept-card"><div class="card-head"><div><h3>${t('pathway')}</h3><p class="sub">${t('pathwayIntro')}</p></div><span class="concept-badge">${t('status')}</span></div>
      <svg class="pathway-svg" viewBox="0 0 900 300" role="img" aria-label="${t('pathway')}"><defs><marker id="pathArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#64bddd"/></marker></defs><rect class="path-core" x="370" y="105" width="160" height="90" rx="20"/><text class="path-core-text" x="450" y="141">${lang==='ar'?'حجم اختبار':'TEST VOLUME'}</text><text class="path-core-sub" x="450" y="166">${lang==='ar'?'مقترح للقياس':'PROPOSED MEASUREMENTS'}</text>
      <path class="path-link" d="M365 122 245 72"/><path class="path-link" d="M535 122 655 72"/><path class="path-link" d="M365 178 245 228"/><path class="path-link" d="M535 178 655 228"/>
      <g class="path-node"><rect x="20" y="28" width="230" height="82" rx="14"/><text x="135" y="60">${t('oxygen')}</text><text class="path-small" x="135" y="83">O₂ · ΔC (measure)</text></g><g class="path-node"><rect x="650" y="28" width="230" height="82" rx="14"/><text x="765" y="60">${t('flow')}</text><text class="path-small" x="765" y="83">u · direction (measure)</text></g><g class="path-node"><rect x="20" y="190" width="230" height="82" rx="14"/><text x="135" y="222">${t('heat')}</text><text class="path-small" x="135" y="245">T(t) · q (measure)</text></g><g class="path-node"><rect x="650" y="190" width="230" height="82" rx="14"/><text x="765" y="222">${t('fuel')}</text><text class="path-small" x="765" y="245">form · area · feed</text></g></svg>
      <div class="grid two concept-notes"><div><h4>${t('oxygen')}</h4><p class="sub">${t('oxygenText')}</p></div><div><h4>${t('flow')}</h4><p class="sub">${t('flowText')}</p></div><div><h4>${t('heat')}</h4><p class="sub">${t('heatText')}</p></div><div><h4>${t('fuel')}</h4><p class="sub">${t('fuelText')}</p></div></div></article>
    <article class="card"><h3>${t('source')}</h3><p class="sub">${t('sourceText')}</p><div class="list-row"><span><a href="https://ntrs.nasa.gov/citations/20240007628" target="_blank" rel="noopener noreferrer">${t('ntrs')} ↗</a></span><span>NASA Technical Reports Server</span></div><div class="list-row"><span><a href="https://psi.nasa.gov/" target="_blank" rel="noopener noreferrer">${t('psi')} ↗</a></span><span>NASA Physical Sciences Informatics</span></div><div class="callout">${t('note')}</div></article>
  </div>`;
}

export function bindSystemConcepts(root, lang = 'en') {
  const stage = root.querySelector('.concept-stage');
  if (!stage) return;
  const explode = root.querySelector('[data-concept-explode]');
  const air = root.querySelector('[data-concept-air]');
  const reset = root.querySelector('[data-concept-reset]');
  let rx = -10, ry = -16, down = false, x0 = 0, y0 = 0;
  const apply = () => { stage.style.setProperty('--rx', `${rx}deg`); stage.style.setProperty('--ry', `${ry}deg`); };
  apply();
  explode?.addEventListener('click', () => { const value = stage.dataset.exploded !== 'true'; stage.dataset.exploded = String(value); explode.setAttribute('aria-pressed', String(value)); });
  air?.addEventListener('click', () => { const value = stage.dataset.air !== 'true'; stage.dataset.air = String(value); air.setAttribute('aria-pressed', String(value)); air.classList.toggle('active', value); });
  reset?.addEventListener('click', () => { rx = -10; ry = -16; stage.dataset.exploded = 'false'; stage.dataset.air = 'true'; explode?.setAttribute('aria-pressed','false'); air?.setAttribute('aria-pressed','true'); air?.classList.add('active'); apply(); });
  stage.addEventListener('pointerdown', (e) => { down = true; x0 = e.clientX; y0 = e.clientY; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointerup', () => { down = false; });
  stage.addEventListener('pointercancel', () => { down = false; });
  stage.addEventListener('pointermove', (e) => { if (!down) return; ry += (e.clientX - x0) * .45; rx -= (e.clientY - y0) * .35; x0 = e.clientX; y0 = e.clientY; apply(); });
  stage.addEventListener('keydown', (e) => { if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) return; e.preventDefault(); if(e.key==='ArrowLeft') ry-=7; if(e.key==='ArrowRight') ry+=7; if(e.key==='ArrowUp') rx-=7; if(e.key==='ArrowDown') rx+=7; apply(); });
  stage.querySelector('svg')?.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
}
