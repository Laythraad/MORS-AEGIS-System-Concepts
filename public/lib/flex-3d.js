import { esc } from './dom.js';

const outcomeColor = (row) => row.test_end === 'Extinction' ? '#42b883' : row.test_end === 'Disruption' ? '#e4a84c' : '#8c79d8';

export function flex3DMarkup(lang = 'en') {
  const ar = lang === 'ar';
  return `<article class="card flex-3d-card"><div class="card-head"><div><h3>${ar ? 'فضاء قياسات FLEX ثلاثي الأبعاد' : 'FLEX measured-data 3D space'}</h3><p class="sub">${ar ? 'الأكسجين × قطر القطرة الابتدائي × ثابت معدل الاحتراق' : 'Oxygen × initial droplet diameter × burning-rate constant'}</p></div><span class="tag obs">NASA PSI-69 · OBSERVED</span></div><canvas class="flex-3d-canvas" tabindex="0" role="img" aria-label="${ar ? 'مخطط ثلاثي الأبعاد تفاعلي لقياسات NASA FLEX' : 'Interactive 3D plot of NASA FLEX measurements'}"></canvas><div class="flex-3d-tools"><button type="button" class="outline-btn" data-flex3d-reset>${ar ? 'إعادة العرض' : 'Reset view'}</button><span class="sub" data-flex3d-selection role="status" aria-live="polite">${ar ? 'اسحب للتدوير · اختر نقطة للتفاصيل' : 'Drag to rotate · select a point for details'}</span></div><p class="sub">${ar ? 'كل نقطة صف تجريبي أصلي؛ اللون يميز نتيجة الاختبار. المنظور ثلاثي الأبعاد للتنظيم البصري فقط. لا يثبت الارتباط السببية ولا يجمع نتائج وقود أو مخففات مختلفة كنظام واحد.' : 'Each point is an original test row; color marks reported test outcome. 3D perspective is a viewing aid only. Association is not causation, and different fuels/diluents are not one interchangeable system.'}</p></article>`;
}

export function bindFlex3DPlot(root, rows, lang = 'en') {
  const canvas = root.querySelector('.flex-3d-canvas');
  if (!canvas || !Array.isArray(rows)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const data = rows.filter((r) => Number.isFinite(r.oxygen_mole_fraction) && Number.isFinite(r.initial_droplet_diameter_mm) && Number.isFinite(r.burning_rate_mm_s));
  if (!data.length) return;
  const ranges = ['oxygen_mole_fraction', 'initial_droplet_diameter_mm', 'burning_rate_mm_s'].map((k) => [Math.min(...data.map((r) => r[k])), Math.max(...data.map((r) => r[k]))]);
  let yaw = -0.62, pitch = 0.35, points = [], drag = null;
  const labels = lang === 'ar' ? ['O₂ الكسر المولي', 'قطر ابتدائي · mm', 'ثابت الاحتراق · mm²/s'] : ['O₂ mole fraction', 'Initial diameter · mm', 'Burning rate · mm²/s'];
  function project(row, width, height) {
    const values = [row.oxygen_mole_fraction, row.initial_droplet_diameter_mm, row.burning_rate_mm_s];
    const v = values.map((x, i) => ((x - ranges[i][0]) / (ranges[i][1] - ranges[i][0] || 1) - 0.5) * 2);
    const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
    const z1 = v[2] * Math.cos(pitch) - y1 * Math.sin(pitch), y2 = v[2] * Math.sin(pitch) + y1 * Math.cos(pitch);
    const scale = Math.min(width, height) * 0.27 / (2.8 - z1 * 0.28);
    return { x: width * 0.5 + x1 * scale, y: height * 0.51 - y2 * scale, depth: z1, row };
  }
  function draw() {
    const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!rect.width || !rect.height) return;
    canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height; ctx.clearRect(0, 0, w, h); ctx.font = '11px system-ui';
    const corners = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const projectV = (v) => { const x=v[0]*Math.cos(yaw)-v[1]*Math.sin(yaw), y=v[0]*Math.sin(yaw)+v[1]*Math.cos(yaw), z=v[2]*Math.cos(pitch)-y*Math.sin(pitch), y2=v[2]*Math.sin(pitch)+y*Math.cos(pitch), s=Math.min(w,h)*.27/(2.8-z*.28); return [w*.5+x*s,h*.51-y2*s]; };
    ctx.strokeStyle = 'rgba(90,145,175,.42)'; ctx.lineWidth = 1;
    for (let i=0;i<8;i++) for (let j=i+1;j<8;j++) if (corners[i].filter((v,k)=>v!==corners[j][k]).length===1) { const a=projectV(corners[i]),b=projectV(corners[j]); ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.stroke(); }
    const axis = [[[-1,-1,-1],[1,-1,-1],labels[0]],[[-1,-1,-1],[-1,1,-1],labels[1]],[[-1,-1,-1],[-1,-1,1],labels[2]]];
    ctx.fillStyle = '#a9c3d2'; axis.forEach(([a,b,label])=>{const p=projectV(a),q=projectV(b);ctx.fillText(label,q[0]-45,q[1]+18);});
    points=data.map(r=>project(r,w,h)).sort((a,b)=>a.depth-b.depth);
    points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,3.4,0,Math.PI*2);ctx.fillStyle=outcomeColor(p.row);ctx.globalAlpha=.78;ctx.fill();ctx.globalAlpha=1;});
  }
  const show = (p) => { const r=p.row, text=`${r.id || `Test ${r.test}`} · ${r.fuel || 'Fuel unreported'} · O₂ ${(r.oxygen_mole_fraction*100).toFixed(1)}% · d₀ ${r.initial_droplet_diameter_mm} mm · K ${r.burning_rate_mm_s} mm²/s · ${r.test_end || 'Outcome unreported'} · ${r.pressure_mmHg ?? '—'} mmHg`; root.querySelector('[data-flex3d-selection]').textContent=text; };
  canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>2)drag.moved=true;yaw+=dx*.008;pitch=Math.max(-1.15,Math.min(1.15,pitch+dy*.008));drag.x=e.clientX;drag.y=e.clientY;draw();});
  canvas.addEventListener('pointerup',e=>{if(drag&&!drag.moved){const x=e.clientX-canvas.getBoundingClientRect().left,y=e.clientY-canvas.getBoundingClientRect().top;const nearest=points.reduce((best,p)=>Math.hypot(p.x-x,p.y-y)<best.d?{p,d:Math.hypot(p.x-x,p.y-y)}:best,{p:null,d:16});if(nearest.p)show(nearest.p);}drag=null;});
  canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')yaw-=.12;else if(e.key==='ArrowRight')yaw+=.12;else if(e.key==='ArrowUp')pitch=Math.min(1.15,pitch+.12);else if(e.key==='ArrowDown')pitch=Math.max(-1.15,pitch-.12);else return;e.preventDefault();draw();});
  root.querySelector('[data-flex3d-reset]')?.addEventListener('click',()=>{yaw=-.62;pitch=.35;draw();});
  new ResizeObserver(draw).observe(canvas); draw();
  const legend=document.createElement('p');legend.className='sub flex-3d-legend';legend.innerHTML=`<span style="color:#42b883">● ${esc(lang==='ar'?'انطفاء':'Extinction')}</span> &nbsp; <span style="color:#e4a84c">● ${esc(lang==='ar'?'اضطراب':'Disruption')}</span> &nbsp; <span style="color:#8c79d8">● ${esc(lang==='ar'?'استمرار/أخرى':'Sustained/other')}</span>`;canvas.after(legend);
}
