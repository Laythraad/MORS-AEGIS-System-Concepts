import { esc } from './dom.js';

const VARIABLES = [
  { key: 'oxygen_mole_fraction', en: 'O₂ mole fraction', ar: 'الكسر المولي O₂', unit: '%', factor: 100 },
  { key: 'pressure_mmHg', en: 'Ambient pressure', ar: 'الضغط المحيط', unit: 'mmHg' },
  { key: 'initial_droplet_diameter_mm', en: 'Initial droplet diameter', ar: 'قطر القطرة الابتدائي', unit: 'mm' },
  { key: 'visible_flame_extinction_diameter_mm', en: 'Visible flame extinction diameter', ar: 'قطر انطفاء اللهب المرئي', unit: 'mm' },
  { key: 'burning_rate_mm_s', en: 'Droplet burning-rate constant', ar: 'ثابت معدل احتراق القطرة', unit: 'mm²/s' },
  { key: 'burn_time_s', en: 'Burn time', ar: 'زمن الاحتراق', unit: 's' },
];
const colorFor = (row) => row.test_end === 'Extinction' ? '#42b883' : row.test_end === 'Disruption' ? '#e4a84c' : '#8c79d8';
const labelFor = (item, ar) => `${ar ? item.ar : item.en} · ${item.unit}`;
const choices = (ar, selected) => VARIABLES.map((item) => `<option value="${item.key}"${item.key === selected ? ' selected' : ''}>${esc(labelFor(item, ar))}</option>`).join('');

export function flex3DMarkup(lang = 'en') {
  const ar = lang === 'ar';
  return `<article class="card flex-3d-card"><div class="card-head"><div><h3>${ar ? 'فضاء قياسات FLEX ثلاثي الأبعاد' : 'FLEX measured-data 3D space'}</h3><p class="sub">${ar ? 'اختر أي ثلاثة حقول رقمية؛ مواضع النقاط تعكس القيم الفعلية بعد تطبيع العرض فقط.' : 'Choose any three numeric fields. Point positions use the measured values; only display coordinates are normalized.'}</p></div><span class="tag obs">NASA PSI-69 · OBSERVED</span></div>
  <div class="toolbar plot-studio-controls flex-3d-controls"><label>${ar ? 'محور X' : 'X axis'}<select data-flex3d-axis="x">${choices(ar, 'oxygen_mole_fraction')}</select></label><label>${ar ? 'محور Y' : 'Y axis'}<select data-flex3d-axis="y">${choices(ar, 'initial_droplet_diameter_mm')}</select></label><label>${ar ? 'محور Z' : 'Z axis'}<select data-flex3d-axis="z">${choices(ar, 'burning_rate_mm_s')}</select></label><label>${ar ? 'الوقود' : 'Fuel'}<select data-flex3d-fuel><option value="">${ar ? 'كل الأنواع' : 'All fuels'}</option></select></label><label>${ar ? 'النتيجة' : 'Outcome'}<select data-flex3d-outcome><option value="">${ar ? 'كل النتائج' : 'All outcomes'}</option></select></label></div>
  <div class="flex-3d-axis-readout" data-flex3d-axis-readout aria-live="polite"></div><canvas class="flex-3d-canvas" tabindex="0" role="img" aria-label="${ar ? 'مخطط ثلاثي الأبعاد تفاعلي لقياسات NASA FLEX' : 'Interactive 3D plot of NASA FLEX measurements'}"></canvas><div class="flex-3d-tools"><button type="button" class="outline-btn" data-flex3d-zoom="in" aria-label="${ar ? 'تكبير المخطط ثلاثي الأبعاد' : 'Zoom 3D plot in'}">＋</button><button type="button" class="outline-btn" data-flex3d-zoom="out" aria-label="${ar ? 'تصغير المخطط ثلاثي الأبعاد' : 'Zoom 3D plot out'}">−</button><button type="button" class="outline-btn" data-flex3d-reset>${ar ? 'إعادة العرض' : 'Reset view'}</button><span class="sub" data-flex3d-selection role="status" aria-live="polite">${ar ? 'اسحب للتدوير · استخدم أزرار التكبير · اختر نقطة لقراءة قيم المصدر' : 'Drag to rotate · use zoom controls · select a point to read source values'}</span></div><p class="sub" data-flex3d-count></p><p class="sub">${ar ? 'تغيير المحاور يبدل العرض فقط ولا يغيّر التجربة. كل نقطة صف NASA PSI-69؛ الألوان تمثل حالة الاختبار. ليست هذه محاكاة لهب ولا تمثيلاً سببياً.' : 'Changing axes changes only the view, not the experiment. Each point is a NASA PSI-69 row; colors show reported test outcome. This is neither a flame simulation nor a causal model.'}</p></article>`;
}

export function bindFlex3DPlot(root, rows, lang = 'en') {
  const canvas = root.querySelector('.flex-3d-canvas');
  if (!canvas || !Array.isArray(rows)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const ar = lang === 'ar';
  const selectors = Object.fromEntries(['x','y','z'].map((axis) => [axis, root.querySelector(`[data-flex3d-axis="${axis}"]`)]));
  const fuel = root.querySelector('[data-flex3d-fuel]'), outcome = root.querySelector('[data-flex3d-outcome]');
  const count = root.querySelector('[data-flex3d-count]'), selection = root.querySelector('[data-flex3d-selection]');
  const axisReadout = root.querySelector('[data-flex3d-axis-readout]');
  [...new Set(rows.map((row) => row.fuel).filter(Boolean))].sort().forEach((item) => fuel.add(new Option(item, item)));
  [...new Set(rows.map((row) => row.test_end).filter(Boolean))].sort().forEach((item) => outcome.add(new Option(item, item)));
  let yaw = -.62, pitch = .35, zoom = 1, points = [], drag = null, filteredRows = [];
  const valuesFor = (row, axes) => axes.map((item) => row[item.key] * (item.factor || 1));
  const project = (values, ranges, width, height) => {
    const v = values.map((x, i) => ((x-ranges[i][0])/(ranges[i][1]-ranges[i][0] || 1)-.5)*2);
    const x1=v[0]*Math.cos(yaw)-v[1]*Math.sin(yaw), y1=v[0]*Math.sin(yaw)+v[1]*Math.cos(yaw);
    const z1=v[2]*Math.cos(pitch)-y1*Math.sin(pitch), y2=v[2]*Math.sin(pitch)+y1*Math.cos(pitch);
    const scale=Math.min(width,height)*.31*zoom/(2.8-z1*.28);
    return {x:width*.5+x1*scale,y:height*.52-y2*scale,depth:z1};
  };
  const render = () => {
    const axes = ['x','y','z'].map((axis) => VARIABLES.find((item) => item.key === selectors[axis].value));
    const rect=canvas.getBoundingClientRect(), dpr=Math.min(window.devicePixelRatio||1,2);
    if(!rect.width||!rect.height)return;
    canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const w=rect.width,h=rect.height;ctx.clearRect(0,0,w,h);ctx.font='11px system-ui';
    filteredRows=rows.filter((row)=>(!fuel.value||row.fuel===fuel.value)&&(!outcome.value||row.test_end===outcome.value));
    const data=filteredRows.filter((row)=>axes.every((axis)=>Number.isFinite(row[axis.key])));
    if(!data.length){points=[];ctx.fillStyle='#a9c3d2';ctx.textAlign='center';ctx.fillText(ar?'لا توجد صفوف مكتملة للمحاور المختارة':'No complete rows for the selected axes',w/2,h/2);count.textContent=ar?'لا توجد صفوف صالحة بعد التصفية.':'No valid rows after filtering.';return;}
    const ranges=axes.map((axis)=>{const v=data.map((row)=>row[axis.key]*(axis.factor||1));return [Math.min(...v),Math.max(...v)];});
    if (axisReadout) axisReadout.innerHTML = axes.map((axis, index) => `<div class="flex-3d-axis-item"><b>${['X','Y','Z'][index]}</b><span>${esc(labelFor(axis, ar))}</span><small>${ranges[index][0].toPrecision(3)} – ${ranges[index][1].toPrecision(3)} ${esc(axis.unit)}</small></div>`).join('');
    const corners=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    ctx.strokeStyle='rgba(90,145,175,.38)';ctx.lineWidth=1;
    for(let i=0;i<8;i++)for(let j=i+1;j<8;j++)if(corners[i].filter((v,k)=>v!==corners[j][k]).length===1){const a=project(corners[i],corners.map(()=>[-1,1]),w,h),b=project(corners[j],corners.map(()=>[-1,1]),w,h);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    points=data.map((row)=>({row,...project(valuesFor(row,axes),ranges,w,h)})).sort((a,b)=>a.depth-b.depth);
    points.forEach((point)=>{ctx.beginPath();ctx.arc(point.x,point.y,4,0,Math.PI*2);ctx.fillStyle=colorFor(point.row);ctx.globalAlpha=.82;ctx.fill();ctx.globalAlpha=1;});
    count.textContent=`${ar?'صفوف معروضة':'Valid plotted rows'}: n=${points.length}/${filteredRows.length} · ${ar?'تُستبعد القيم المفقودة من المحاور المختارة فقط':'Rows missing any selected axis are omitted only from this view'}`;
  };
  const show = (point) => {const r=point.row;selection.textContent=`${r.id||`Test ${r.test}`} · ${r.fuel||'—'} · O₂ ${Number.isFinite(r.oxygen_mole_fraction)?(r.oxygen_mole_fraction*100).toFixed(1)+'%':'—'} · P ${r.pressure_mmHg??'—'} mmHg · d₀ ${r.initial_droplet_diameter_mm??'—'} mm · dₑ ${r.visible_flame_extinction_diameter_mm??'—'} mm · K ${r.burning_rate_mm_s??'—'} mm²/s · t ${r.burn_time_s??'—'} s · ${r.test_end||'—'}`;};
  Object.values(selectors).forEach((control)=>control.addEventListener('change',render));fuel.addEventListener('change',render);outcome.addEventListener('change',render);
  canvas.addEventListener('pointerdown',(event)=>{drag={x:event.clientX,y:event.clientY,moved:false};canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',(event)=>{if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>2)drag.moved=true;yaw+=dx*.008;pitch=Math.max(-1.15,Math.min(1.15,pitch+dy*.008));drag.x=event.clientX;drag.y=event.clientY;render();});
  const stop=(event)=>{if(!drag)return;if(!drag.moved){const x=event.clientX-canvas.getBoundingClientRect().left,y=event.clientY-canvas.getBoundingClientRect().top;const nearest=points.reduce((best,p)=>Math.hypot(p.x-x,p.y-y)<best.d?{p,d:Math.hypot(p.x-x,p.y-y)}:best,{p:null,d:18});if(nearest.p)show(nearest.p);}drag=null;};
  canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',()=>{drag=null;});
  canvas.addEventListener('wheel',(event)=>{event.preventDefault();zoom=Math.max(.65,Math.min(1.75,zoom*(event.deltaY<0?1.08:.92)));render();},{passive:false});
  root.querySelectorAll('[data-flex3d-zoom]').forEach((button)=>button.addEventListener('click',()=>{zoom=Math.max(.65,Math.min(1.75,zoom*(button.dataset.flex3dZoom==='in'?1.16:.86)));render();}));
  canvas.addEventListener('keydown',(event)=>{if(event.key==='ArrowLeft')yaw-=.12;else if(event.key==='ArrowRight')yaw+=.12;else if(event.key==='ArrowUp')pitch=Math.min(1.15,pitch+.12);else if(event.key==='ArrowDown')pitch=Math.max(-1.15,pitch-.12);else return;event.preventDefault();render();});
  root.querySelector('[data-flex3d-reset]')?.addEventListener('click',()=>{yaw=-.62;pitch=.35;zoom=1;selection.textContent=ar?'اسحب للتدوير · عجلة الفأرة للتكبير · اختر نقطة لقراءة قيم المصدر':'Drag to rotate · wheel to zoom · select a point to read source values';render();});
  new ResizeObserver(render).observe(canvas);render();
  const legend=document.createElement('p');legend.className='sub flex-3d-legend';legend.innerHTML=`<span style="color:#42b883">● ${esc(ar?'انطفاء':'Extinction')}</span> &nbsp; <span style="color:#e4a84c">● ${esc(ar?'اضطراب':'Disruption')}</span> &nbsp; <span style="color:#8c79d8">● ${esc(ar?'استمرار/أخرى':'Sustained/other')}</span>`;canvas.after(legend);
}
