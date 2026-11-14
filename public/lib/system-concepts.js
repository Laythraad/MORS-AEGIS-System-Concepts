const copy = {
  en: {
    title: 'Research system concepts',
    intro:
      'Concepts inspired by the Flame in Freefall work. The diagrams explain questions and measurement ideas; they are not qualified hardware or validated suppression systems.',
    model: 'HARBOR · perimeter observation concept',
    modelIntro:
      'Browse and rotate the original GLB concept models in your browser. The models show research concepts, not qualified hardware.',
    orbit: 'Drag to rotate · scroll to zoom · use arrow keys to navigate controls',
    spin: 'Auto-rotate',
    reset: 'Reset camera',
    select: 'Choose a 3D concept',
    download: 'Download selected GLB',
    gallery: 'Download Blender gallery',
    modelLoaded: '3D model ready',
    modelLoading: 'Loading 3D model…',
    labelRing: 'Perimeter sensor ring',
    labelHood: 'Test hood / enclosure',
    labelBase: 'Mounting frame',
    concern: 'ENGINEERING BOUNDARY',
    concernText:
      'The current Blender report records about 15 mm minimum sampled surface separation and no sampled BVH overlap for this assembly pose. This is only a visual CAD check; it does not assess manufacturing tolerance, deflection, loads, installation envelope, thermal behavior, or flight qualification.',
    pathway: '2D · candidate extinction pathways',
    pathwayIntro:
      'A proposed comparison framework for controlled tests: change one transport or boundary condition at a time and record the response. Pathways below are hypotheses and measurement prompts, not proven suppression outcomes.',
    oxygen: 'Oxygen availability',
    oxygenText: 'Candidate variable: local oxidizer concentration. Measure concentration and flow independently.',
    flow: 'Forced flow',
    flowText: 'Candidate variable: imposed ventilation velocity and direction. Do not infer it from flame shape.',
    heat: 'Heat transfer',
    heatText: 'Candidate response: temperature history and heat loss at defined locations.',
    fuel: 'Fuel boundary',
    fuelText: 'Candidate variable: fuel form, exposed area, and supply condition, controlled per test protocol.',
    source: 'Evidence and design boundary',
    sourceText:
      'NASA research motivates the scientific questions. These concepts are MORS research proposals; the cited studies did not test or endorse these devices.',
    ntrs: 'NASA NTRS · SoFIE-GEL investigation',
    psi: 'NASA PSI · Combustion Science',
    note: 'PSI-69 droplet burning-rate measurements do not validate solid-material behavior or these proposed system concepts.',
    status: 'Concept only · no prototype test or qualification',
  },
  ar: {
    title: 'تصاميم أنظمة بحثية',
    intro:
      'أفكار مستلهمة من عمل Flame in Freefall. تشرح الرسومات أسئلة البحث وأفكار القياس؛ وليست عتاداً مؤهلاً أو أنظمة إخماد مثبتة.',
    model: 'HARBOR · مفهوم رصد محيطي',
    modelIntro: 'تصفّح نماذج GLB الأصلية ودوّرها في المتصفح. النماذج مفاهيم بحثية وليست عتاداً مؤهلاً.',
    orbit: 'اسحب للتدوير · كبّر بعجلة الفأرة · استخدم Tab للتنقل بين الأزرار',
    spin: 'تدوير تلقائي',
    reset: 'إعادة زاوية الكاميرا',
    select: 'اختر تصميماً ثلاثي الأبعاد',
    download: 'تنزيل نموذج GLB المختار',
    gallery: 'تنزيل معرض Blender',
    modelLoaded: 'النموذج الثلاثي الأبعاد جاهز',
    modelLoading: 'جارٍ تحميل النموذج الثلاثي الأبعاد…',
    labelRing: 'حلقة حساسات محيطية',
    labelHood: 'غطاء / حيز الاختبار',
    labelBase: 'إطار تثبيت',
    concern: 'حدود التحقق الهندسي',
    concernText:
      'يسجل تقرير Blender الحالي فاصلاً سطحياً أدنى يقارب ١٥ مم دون تداخل BVH مرصود في وضعية التجميعة. هذا فحص CAD بصري فقط؛ لا يقيّم سماحات التصنيع أو الانحراف أو الأحمال أو حيز التركيب أو السلوك الحراري أو التأهيل للطيران.',
    pathway: '٢D · مسارات إخماد محتملة',
    pathwayIntro:
      'إطار مقارنة مقترح لاختبارات مضبوطة: تغيير شرط انتقال أو حدّي واحد في كل مرة وتسجيل الاستجابة. المسارات أدناه فرضيات ومحفزات للقياس، وليست نتائج إخماد مثبتة.',
    oxygen: 'توفر الأكسجين',
    oxygenText: 'متغير محتمل: تركيز المؤكسد محلياً. يقاس التركيز والجريان كلٌّ على حدة.',
    flow: 'الجريان القسري',
    flowText: 'متغير محتمل: سرعة التهوية المفروضة واتجاهها. لا يُستنتج من شكل اللهب.',
    heat: 'انتقال الحرارة',
    heatText: 'استجابة محتملة: سجل الحرارة وفقدها عند مواضع محددة.',
    fuel: 'حدود الوقود',
    fuelText: 'متغير محتمل: شكل الوقود ومساحته المكشوفة وظروف تغذيته، وفق بروتوكول الاختبار.',
    source: 'الأدلة وحدود التصميم',
    sourceText:
      'تُلهم أبحاث NASA الأسئلة العلمية. هذه المقترحات البحثية من MORS؛ الدراسات المرتبطة لم تختبر هذه الأجهزة ولم تعتمدها.',
    ntrs: 'NASA NTRS · تحقيق SoFIE-GEL',
    psi: 'NASA PSI · علوم الاحتراق',
    note: 'قياسات معدل احتراق القطرات في PSI-69 لا تتحقق من سلوك المواد الصلبة أو من مفاهيم الأنظمة المقترحة هنا.',
    status: 'مفهوم فقط · لا اختبار لنموذج أولي أو تأهيل',
  },
};

export async function renderSystemConcepts(lang = 'en') {
  const x = copy[lang === 'ar' ? 'ar' : 'en'];
  const t = (key) => x[key];
  await import('/vendor/model-viewer.min.js');
  const response = await fetch('/models/catalog.json');
  if (!response.ok) throw new Error('3D model catalog is unavailable.');
  const models = await response.json();
  const featured = [
    'HARBOR-PERIMETER-SCAN-assembly.glb',
    'HARBOR-perimeter-sensor-ring.glb',
    'HARBOR-DOCK-MIST-robot.glb',
    'PULSE-MIST-cassette.glb',
    'VAPOR-TRACE-spool.glb',
  ];
  const ordered = [
    ...featured.map((name) => models.find((model) => model.file === name)).filter(Boolean),
    ...models.filter((model) => !featured.includes(model.file)),
  ];
  const selected = ordered[0];
  return `<div class="system-concepts">
    <div class="page-head"><div><div class="eyebrow">MORS AEGIS · FLAME IN FREEFALL</div><h2>${t('title')}</h2><p class="sub">${t('intro')}</p></div></div>
    <article class="card concept-card"><div class="card-head"><div><h3>${t('model')}</h3><p class="sub">${t('modelIntro')}</p></div><span class="concept-badge">${ordered.length} ${lang === 'ar' ? 'نموذجاً ثلاثي الأبعاد' : '3D models'}</span></div>
      <div class="concept-controls" role="group" aria-label="${t('model')}"><label class="model-picker">${t('select')}<select id="conceptModel">${ordered.map((model) => `<option value="${model.file}"${model.file === selected.file ? ' selected' : ''}>${model.title}</option>`).join('')}</select></label><button class="outline-btn" type="button" data-model-spin aria-pressed="false">${t('spin')}</button><button class="quiet-btn" type="button" data-model-reset>${t('reset')}</button><span class="sub">${t('orbit')}</span></div>
      <model-viewer id="conceptViewer" class="model-viewer" src="/models/${selected.file}" alt="${selected.title} — ${t('status')}" camera-controls shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>
      <div class="concept-model-meta"><span id="modelStatus" class="sub" role="status" aria-live="polite">${t('modelLoading')}</span><a id="modelDownload" class="outline-btn" href="/models/${selected.file}" download>${t('download')}</a><a class="outline-btn" href="/models/FLAME-IN-FREEFALL-3D-GALLERY.blend" download>${t('gallery')}</a></div>
      <div class="callout warn"><b>${t('concern')}:</b> ${t('concernText')} <a href="/models/methods/harbor_perimeter_scan_clearance.json" target="_blank" rel="noopener noreferrer">${lang === 'ar' ? 'تقرير الفحص' : 'View clearance report'} ↗</a></div></article>
    <article class="card concept-card"><div class="card-head"><div><h3>${t('pathway')}</h3><p class="sub">${t('pathwayIntro')}</p></div><span class="concept-badge">${t('status')}</span></div>
      <svg class="pathway-svg" viewBox="0 0 900 300" role="img" aria-label="${t('pathway')}"><defs><marker id="pathArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#64bddd"/></marker></defs><rect class="path-core" x="370" y="105" width="160" height="90" rx="20"/><text class="path-core-text" x="450" y="141">${lang === 'ar' ? 'حجم اختبار' : 'TEST VOLUME'}</text><text class="path-core-sub" x="450" y="166">${lang === 'ar' ? 'مقترح للقياس' : 'PROPOSED MEASUREMENTS'}</text>
      <path class="path-link" d="M365 122 245 72"/><path class="path-link" d="M535 122 655 72"/><path class="path-link" d="M365 178 245 228"/><path class="path-link" d="M535 178 655 228"/>
      <g class="path-node"><rect x="20" y="28" width="230" height="82" rx="14"/><text x="135" y="60">${t('oxygen')}</text><text class="path-small" x="135" y="83">O₂ · ΔC (measure)</text></g><g class="path-node"><rect x="650" y="28" width="230" height="82" rx="14"/><text x="765" y="60">${t('flow')}</text><text class="path-small" x="765" y="83">u · direction (measure)</text></g><g class="path-node"><rect x="20" y="190" width="230" height="82" rx="14"/><text x="135" y="222">${t('heat')}</text><text class="path-small" x="135" y="245">T(t) · q (measure)</text></g><g class="path-node"><rect x="650" y="190" width="230" height="82" rx="14"/><text x="765" y="222">${t('fuel')}</text><text class="path-small" x="765" y="245">form · area · feed</text></g></svg>
      <div class="grid two concept-notes"><div><h4>${t('oxygen')}</h4><p class="sub">${t('oxygenText')}</p></div><div><h4>${t('flow')}</h4><p class="sub">${t('flowText')}</p></div><div><h4>${t('heat')}</h4><p class="sub">${t('heatText')}</p></div><div><h4>${t('fuel')}</h4><p class="sub">${t('fuelText')}</p></div></div>
      <div class="list-row"><span>EXTINCTION-PATHWAY-MAP · GLB</span><a href="/models/EXTINCTION-PATHWAY-MAP-rig.glb" download>${lang === 'ar' ? 'تنزيل النموذج ثلاثي الأبعاد' : 'Download 3D rig'} ↗</a></div><div class="list-row"><span>EXTINCTION-PATHWAY-MAP · method</span><a href="/models/methods/extinction_pathway_map_method_ar.md" target="_blank" rel="noopener noreferrer">${lang === 'ar' ? 'المنهج والحدود' : 'Method and limits'} ↗</a></div></article>
    <article class="card"><h3>${t('source')}</h3><p class="sub">${t('sourceText')}</p>
      <div class="list-row"><span>NASA PSI-25 · BASS-II</span><a href="https://psi.nasa.gov/physci/repo/investigation/PSI-25" target="_blank" rel="noopener noreferrer">NASA PSI ↗</a></div>
      <div class="list-row"><span>NASA NTRS 20130000582 · local jet/wake</span><a href="https://ntrs.nasa.gov/citations/20130000582" target="_blank" rel="noopener noreferrer">NASA NTRS ↗</a></div>
      <div class="list-row"><span>NASA NTRS 20240007628 · SoFIE-GEL</span><a href="https://ntrs.nasa.gov/citations/20240007628" target="_blank" rel="noopener noreferrer">NASA NTRS ↗</a></div>
      <div class="list-row"><span>NASA MIST · NASA NTRS 20040053582</span><a href="https://ntrs.nasa.gov/citations/20040053582" target="_blank" rel="noopener noreferrer">NASA NTRS ↗</a></div>
      <div class="list-row"><span>NASA FWM PFE · NTRS 20110012300</span><a href="https://ntrs.nasa.gov/citations/20110012300" target="_blank" rel="noopener noreferrer">NASA NTRS ↗</a></div>
      <div class="callout">${t('note')}</div><a href="/models/methods/harbor_perimeter_scan_method_ar.md" target="_blank" rel="noopener noreferrer">HARBOR measurement method ↗</a> · <a href="/models/methods/pulse_mist_method_ar.md" target="_blank" rel="noopener noreferrer">PULSE-MIST method ↗</a> · <a href="/models/methods/vapor_trace_method_ar.md" target="_blank" rel="noopener noreferrer">VAPOR-TRACE method ↗</a></article>
  </div>`;
}

export function bindSystemConcepts(root, lang = 'en') {
  const viewer = root.querySelector('#conceptViewer');
  const picker = root.querySelector('#conceptModel');
  const status = root.querySelector('#modelStatus');
  const download = root.querySelector('#modelDownload');
  const spin = root.querySelector('[data-model-spin]');
  const reset = root.querySelector('[data-model-reset]');
  if (!viewer || !picker) return;
  const ready = copy[lang === 'ar' ? 'ar' : 'en'].modelLoaded;
  const loading = copy[lang === 'ar' ? 'ar' : 'en'].modelLoading;
  viewer.addEventListener('load', () => {
    if (status) status.textContent = ready;
  });
  viewer.addEventListener('error', () => {
    if (status)
      status.textContent =
        lang === 'ar'
          ? 'تعذر تحميل هذا النموذج. استخدم رابط التنزيل المباشر.'
          : 'Could not load this model. Use the direct download link.';
  });
  if (viewer.loaded && status) status.textContent = ready;
  picker.addEventListener('change', () => {
    const file = picker.value;
    viewer.src = `/models/${encodeURIComponent(file)}`;
    viewer.alt = `${picker.selectedOptions[0]?.textContent || file} — ${copy[lang === 'ar' ? 'ar' : 'en'].status}`;
    if (download) download.href = `/models/${encodeURIComponent(file)}`;
    if (status) status.textContent = loading;
  });
  spin?.addEventListener('click', () => {
    viewer.autoRotate = !viewer.autoRotate;
    spin.setAttribute('aria-pressed', String(viewer.autoRotate));
    spin.classList.toggle('active', viewer.autoRotate);
  });
  reset?.addEventListener('click', () => {
    viewer.cameraOrbit = 'auto auto auto';
    viewer.fieldOfView = 'auto';
    viewer.jumpCameraToGoal();
    viewer.resetTurntableRotation();
  });
}
