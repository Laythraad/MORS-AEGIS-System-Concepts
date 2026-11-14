export function flameScene3d(lang = 'en') {
  const ar = lang === 'ar';
  return `<article class="card flame-scene-card"><div class="card-head"><div><h2>${ar ? 'مشهد ثلاثي الأبعاد لانتقال الحرارة والجريان' : '3D heat-transport and airflow scene'}</h2><p class="sub">${ar ? 'غيّر الحالة واسحب أو استخدم الأسهم لتدوير النموذج. يشرح المفهوم ولا يعرض بيانات تجربة أو نظام إخماد مُختبراً.' : 'Change the conceptual state, then drag or use arrow keys to rotate. This is an explanatory model, not experimental data or a tested suppression system.'}</p></div><span class="badge-sim">${ar ? 'رسم توضيحي · ليس قياساً' : 'ILLUSTRATIVE · NOT MEASURED'}</span></div><div class="scene-controls" role="group" aria-label="${ar ? 'حالة المشهد' : 'Scene state'}"><button type="button" class="outline-btn active" data-scene-gravity="earth">${ar ? 'جاذبية أرضية' : 'Earth gravity'}</button><button type="button" class="outline-btn" data-scene-gravity="micro">${ar ? 'جاذبية صغرى' : 'Microgravity'}</button><button type="button" class="outline-btn active" data-scene-air="on">${ar ? 'تهوية مفروضة: تشغيل' : 'Forced airflow: on'}</button><button type="button" class="outline-btn" data-scene-air="off">${ar ? 'تهوية مفروضة: إيقاف' : 'Forced airflow: off'}</button><button type="button" class="quiet-btn" data-scene-reset>${ar ? 'إعادة زاوية العرض' : 'Reset view'}</button></div><div class="scene3d-stage" tabindex="0" role="group" aria-label="${ar ? 'مشهد ثلاثي الأبعاد، اسحب لتدويره' : 'Interactive 3D schematic; drag to rotate'}"><div class="scene3d-room" data-gravity="earth" data-air="on"><div class="scene-cube"><i class="cube-face cube-front"></i><i class="cube-face cube-back"></i><i class="cube-face cube-left"></i><i class="cube-face cube-right"></i><i class="cube-face cube-top"></i><i class="cube-face cube-bottom"></i></div><div class="scene-flame"><i></i><i></i><i></i></div><div class="scene-plume"><i></i><i></i><i></i></div><div class="scene-streams"><i></i><i></i><i></i><i></i></div><div class="scene-fan"><b></b><b></b><b></b><span></span></div><div class="scene-caption scene-label-earth">${ar ? 'طفو / حمل طبيعي' : 'BUOYANCY / NATURAL CONVECTION'}</div><div class="scene-caption scene-label-micro">${ar ? 'انتشار + تهوية عند وجودها' : 'DIFFUSION + FORCED FLOW IF PRESENT'}</div></div></div><p class="sub scene-state-note" aria-live="polite">${ar ? 'يضعف الحمل الطبيعي في الجاذبية الصغرى؛ لا تختفي حركة الهواء القسرية.' : 'Natural convection weakens in microgravity; forced airflow can remain.'}</p><div class="callout">${ar ? 'مخطط مفاهيمي بلا مقياس كمي. شكل اللهب ومسارات الجريان هنا ليست محاكاة CFD ولا صوراً من NASA؛ أربط التصاميم العملية للإخماد ببياناتها ومصادرها عند إضافتها.' : 'Conceptual and not to scale. Flame shape and flow paths are not CFD results or NASA imagery. Suppression designs can be added later as a separate, source-linked layer.'} <a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA fire-safety research ↗</a></div></article>`;
}

export function bindFlameScene3d(root, lang = 'en') {
  const stage = root.querySelector('.scene3d-stage');
  const room = root.querySelector('.scene3d-room');
  const note = root.querySelector('.scene-state-note');
  if (!stage || !room) return;
  let rx = -16,
    ry = -28,
    dragging = false,
    sx = 0,
    sy = 0;
  const applyRotation = () => {
    room.style.setProperty('--rx', `${rx}deg`);
    room.style.setProperty('--ry', `${ry}deg`);
  };
  applyRotation();
  root.querySelectorAll('[data-scene-gravity]').forEach((button) =>
    button.addEventListener('click', () => {
      room.dataset.gravity = button.dataset.sceneGravity;
      root.querySelectorAll('[data-scene-gravity]').forEach((item) => item.classList.toggle('active', item === button));
      if (note)
        note.textContent =
          lang === 'ar'
            ? room.dataset.gravity === 'earth'
              ? 'في هذا الرسم المفاهيمي يظهر مسار صاعد للغاز الساخن بفعل الطفو.'
              : 'يضعف الحمل الطبيعي في الجاذبية الصغرى؛ لا تختفي حركة الهواء القسرية.'
            : room.dataset.gravity === 'earth'
              ? 'The conceptual plume indicates hot-gas buoyancy.'
              : 'Natural convection weakens in microgravity; forced airflow can remain.';
    }),
  );
  root.querySelectorAll('[data-scene-air]').forEach((button) =>
    button.addEventListener('click', () => {
      room.dataset.air = button.dataset.sceneAir;
      root.querySelectorAll('[data-scene-air]').forEach((item) => item.classList.toggle('active', item === button));
    }),
  );
  root.querySelector('[data-scene-reset]')?.addEventListener('click', () => {
    rx = -16;
    ry = -28;
    applyRotation();
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
  stage.addEventListener('pointerup', () => {
    dragging = false;
  });
  stage.addEventListener('pointercancel', () => {
    dragging = false;
  });
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
