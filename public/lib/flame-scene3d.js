import { bindFlameVolume } from './flame-volume.js';

export function flameScene3d(lang = 'en') {
  const ar = lang === 'ar';
  const labels = ar
    ? {
        title: 'مشهد ثلاثي الأبعاد لتغيّر اللهب والجريان',
        intro: 'غيّر حالة المصدر والجاذبية والهواء والرذاذ، ثم اسحب المشهد أو استخدم الأسهم لتدويره.',
        source: 'مصدر اللهب',
        on: 'تشغيل',
        off: 'إيقاف',
        gravity: 'الجاذبية',
        earth: 'أرضية',
        micro: 'صغرى',
        airflow: 'الهواء القسري',
        mist: 'رذاذ الماء',
        reset: 'إعادة زاوية العرض',
        stage: 'مشهد تفسيري ثلاثي الأبعاد، اسحب لتدويره',
        earthLabel: 'طفو · حمل طبيعي صاعد',
        microLabel: 'انتشار · حمل طبيعي أضعف',
        note: 'يتغير شكل اللهب إيضاحياً بحسب الحالة المختارة. الرذاذ لا يطفئ اللهب تلقائياً في هذا النموذج.',
        boundary:
          'رسم مفاهيمي متعدد الطبقات، بلا مقياس كمي. ليس محاكاة CFD ولا صورة من NASA ولا نتيجة تجربة. لا يستنتج إخماد الحريق أو أداء أي جهاز.',
        rendererReady: 'لهب حجمي تفاعلي · تمثيل نوعي',
        rendererFallback: 'عارض WebGL غير متاح · عرض طبقي احتياطي',
        pauseMotion: 'إيقاف الحركة',
        resumeMotion: 'استئناف الحركة',
        motionPaused: 'الحركة متوقفة',
        motionRunning: 'الحركة تعمل',
      }
    : {
        title: '3D flame and transport scene',
        intro: 'Change the source, gravity, airflow, and mist state, then drag or use arrow keys to rotate the volume.',
        source: 'Flame source',
        on: 'On',
        off: 'Off',
        gravity: 'Gravity',
        earth: 'Earth',
        micro: 'Microgravity',
        airflow: 'Forced airflow',
        mist: 'Water mist',
        reset: 'Reset view',
        stage: 'Interactive 3D explanatory scene; drag to rotate',
        earthLabel: 'BUOYANCY · UPWARD NATURAL CONVECTION',
        microLabel: 'DIFFUSION · WEAKER NATURAL CONVECTION',
        note: 'Flame shape changes illustratively with the selected state. Mist does not extinguish the flame in this model.',
        boundary:
          'Layered conceptual rendering with no quantitative scale. It is not CFD, NASA imagery, or an experiment result. It does not predict extinction or device performance.',
        rendererReady: 'Interactive volumetric flame · qualitative rendering',
        rendererFallback: 'WebGL viewer unavailable · layered fallback rendering',
        pauseMotion: 'Pause animation',
        resumeMotion: 'Resume animation',
        motionPaused: 'motion paused',
        motionRunning: 'motion running',
      };
  const group = (key, title, values, selected) =>
    `<div class="scene-control-group" role="group" aria-label="${title}"><span>${title}</span><div>${values
      .map(
        ([value, label]) =>
          `<button type="button" class="outline-btn${value === selected ? ' active' : ''}" data-scene-key="${key}" data-scene-value="${value}" aria-pressed="${value === selected}">${label}</button>`,
      )
      .join('')}</div></div>`;

  return `<article class="card flame-scene-card"><div class="card-head"><div><h2>${labels.title}</h2><p class="sub">${labels.intro}</p></div><span class="badge-sim">${ar ? 'توضيحي · ليس قياساً' : 'ILLUSTRATIVE · NOT MEASURED'}</span></div>
    <div class="scene-controls" aria-label="${ar ? 'حالات المشهد' : 'Scene conditions'}">
      ${group(
        'fire',
        labels.source,
        [
          ['on', labels.on],
          ['off', labels.off],
        ],
        'on',
      )}
      ${group(
        'gravity',
        labels.gravity,
        [
          ['earth', labels.earth],
          ['micro', labels.micro],
        ],
        'earth',
      )}
      ${group(
        'air',
        labels.airflow,
        [
          ['on', labels.on],
          ['off', labels.off],
        ],
        'on',
      )}
      ${group(
        'mist',
        labels.mist,
        [
          ['on', labels.on],
          ['off', labels.off],
        ],
        'off',
      )}
      <button type="button" class="quiet-btn" data-scene-motion>${labels.pauseMotion}</button>
      <button type="button" class="quiet-btn" data-scene-reset>${labels.reset}</button>
    </div>
    <div class="scene3d-stage" tabindex="0" role="group" aria-label="${labels.stage}">
      <div class="scene3d-room" data-fire="on" data-gravity="earth" data-air="on" data-mist="off" data-motion="paused">
        <div class="scene-cube" aria-hidden="true"><i class="cube-face cube-front"></i><i class="cube-face cube-back"></i><i class="cube-face cube-left"></i><i class="cube-face cube-right"></i><i class="cube-face cube-top"></i><i class="cube-face cube-bottom"></i></div>
        <div class="scene-plume" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="scene-streams" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <canvas class="scene-flame-volume" width="320" height="360" aria-hidden="true"></canvas>
        <div class="scene-flame" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="scene-source" aria-hidden="true"><i></i><b></b><span>${ar ? 'مصدر' : 'SOURCE'}</span></div>
        <div class="scene-droplets" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="scene-fan" aria-hidden="true"><div class="scene-fan-rotor"><b></b><b></b><b></b></div><span></span></div>
        <div class="scene-caption scene-label-earth">${labels.earthLabel}</div>
        <div class="scene-caption scene-label-micro">${labels.microLabel}</div>
      </div>
    </div>
    <p class="sub scene-state-note" aria-live="polite">${labels.note}</p>
    <div class="callout">${labels.boundary} <a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noopener noreferrer">NASA fire-safety research ↗</a></div></article>`;
}

export function bindFlameScene3d(root, lang = 'en') {
  const stage = root.querySelector('.scene3d-stage');
  const room = root.querySelector('.scene3d-room');
  const scene = stage?.closest('.flame-scene-card');
  const note = scene?.querySelector('.scene-state-note');
  if (!stage || !room || !scene) return;

  const prefersReducedMotion =
    typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  let motionPaused = prefersReducedMotion;
  const motionButton = scene.querySelector('[data-scene-motion]');
  const motionLabels =
    lang === 'ar'
      ? { pause: 'إيقاف الحركة', resume: 'استئناف الحركة', paused: 'الحركة متوقفة', running: 'الحركة تعمل' }
      : { pause: 'Pause animation', resume: 'Resume animation', paused: 'motion paused', running: 'motion running' };
  const rendererReady =
    lang === 'ar' ? 'لهب حجمي تفاعلي · تمثيل نوعي' : 'Interactive volumetric flame · qualitative rendering';
  const rendererFallback =
    lang === 'ar' ? 'عارض WebGL غير متاح · عرض طبقي احتياطي' : 'WebGL viewer unavailable · layered fallback rendering';
  const volume = bindFlameVolume(stage.querySelector('.scene-flame-volume'), room);
  if (volume) room.classList.add('scene-volume-ready');

  let rx = -16;
  let ry = -28;
  let dragging = false;
  let sx = 0;
  let sy = 0;
  const applyRotation = () => {
    room.style.setProperty('--rx', `${rx}deg`);
    room.style.setProperty('--ry', `${ry}deg`);
    room.style.setProperty('--rx-inverse', `${-rx}deg`);
    room.style.setProperty('--ry-inverse', `${-ry}deg`);
    volume?.setRotation(rx, ry);
  };
  const updateState = () => {
    const ar = lang === 'ar';
    const state = {
      fire: room.dataset.fire === 'on' ? (ar ? 'مشغّل' : 'on') : ar ? 'متوقف' : 'off',
      gravity: room.dataset.gravity === 'earth' ? (ar ? 'أرضية' : 'Earth') : ar ? 'صغرى' : 'microgravity',
      air: room.dataset.air === 'on' ? (ar ? 'مفعل' : 'on') : ar ? 'متوقف' : 'off',
      mist: room.dataset.mist === 'on' ? (ar ? 'ظاهر' : 'shown') : ar ? 'غير ظاهر' : 'off',
      motion: motionPaused ? motionLabels.paused : motionLabels.running,
    };
    if (note)
      note.textContent = ar
        ? `المصدر ${state.fire} · الجاذبية ${state.gravity} · الهواء القسري ${state.air} · الرذاذ ${state.mist} · ${state.motion}. يتغير الرسم نوعياً فقط؛ لا يحسب الإخماد. ${volume ? rendererReady : rendererFallback}`
        : `Source ${state.fire} · gravity ${state.gravity} · forced airflow ${state.air} · mist ${state.mist} · ${state.motion}. The illustration is qualitative; extinction is not calculated. ${volume ? rendererReady : rendererFallback}`;
    volume?.update();
    for (const button of scene.querySelectorAll('[data-scene-key]')) {
      const active = room.dataset[button.dataset.sceneKey] === button.dataset.sceneValue;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  };
  const applyMotion = () => {
    room.dataset.motion = motionPaused ? 'paused' : 'running';
    if (motionButton) motionButton.textContent = motionPaused ? motionLabels.resume : motionLabels.pause;
    if (motionPaused) volume?.pause();
    else volume?.resume();
  };
  applyRotation();
  applyMotion();
  updateState();

  scene.querySelectorAll('[data-scene-key]').forEach((button) => {
    button.addEventListener('click', () => {
      room.dataset[button.dataset.sceneKey] = button.dataset.sceneValue;
      updateState();
    });
  });
  motionButton?.addEventListener('click', () => {
    motionPaused = !motionPaused;
    applyMotion();
    updateState();
  });
  scene.querySelector('[data-scene-reset]')?.addEventListener('click', () => {
    rx = -16;
    ry = -28;
    applyRotation();
    stage.focus();
  });
  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    sx = event.clientX;
    sy = event.clientY;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    ry += (event.clientX - sx) * 0.45;
    rx = Math.max(-65, Math.min(30, rx - (event.clientY - sy) * 0.35));
    sx = event.clientX;
    sy = event.clientY;
    applyRotation();
  });
  const stopDrag = () => {
    dragging = false;
  };
  stage.addEventListener('pointerup', stopDrag);
  stage.addEventListener('pointercancel', stopDrag);
  stage.addEventListener('lostpointercapture', stopDrag);
  stage.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 12 : 5;
    if (event.key === 'ArrowLeft') ry -= step;
    else if (event.key === 'ArrowRight') ry += step;
    else if (event.key === 'ArrowUp') rx = Math.max(-65, rx - step);
    else if (event.key === 'ArrowDown') rx = Math.min(30, rx + step);
    else return;
    event.preventDefault();
    applyRotation();
  });
}
