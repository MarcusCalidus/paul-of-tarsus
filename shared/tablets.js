/* Paul of Tarsus: Paul's wax tablets, shared by every chapter. Loaded the first time the tablets are opened (see need() in index.html).
   Two leaves of dark wax in a wooden frame, tied at the middle: on the left the people Paul has met and the tasks still open,
   on the right the Scriptures he keeps before him. Each chapter supplies the entries as data, in its definition:
     tablets:{people:[{name, note, if}], tasks:[{t, if}], scripture:[{ref, text, if}]}
   name, note and t may be functions; if is an optional condition on the story (usually on its flags). */
SHARED.tablets=(()=>{
"use strict";
const style=document.createElement('style');
style.textContent=`
#tablets{position:absolute;z-index:5;inset:calc(var(--s)*5px) calc(var(--s)*9px);display:none;gap:calc(var(--s)*5px);padding:calc(var(--s)*5px) calc(var(--s)*5px) calc(var(--s)*7px);
  cursor:pointer;background:#4a3018 var(--wood);background-size:calc(var(--s)*128px) calc(var(--s)*32px);image-rendering:pixelated;
  box-shadow:0 0 0 calc(var(--s)*1px) #120a04,0 calc(var(--s)*2px) calc(var(--s)*8px) rgba(0,0,0,.85),
    inset var(--px) var(--px) 0 rgba(255,214,140,.35),inset calc(var(--px)*-1) calc(var(--px)*-1) 0 rgba(0,0,0,.7)}
#tablets.on{display:flex}
#tablets .leaf{flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#6a4a2a #1a120c;padding:calc(var(--s)*3px) calc(var(--s)*4px);
  background:#2a1f16 var(--wax);background-size:calc(var(--s)*64px) calc(var(--s)*64px);color:#d8c69a;
  box-shadow:inset calc(var(--s)*1px) calc(var(--s)*1px) 0 #0c0703,inset calc(var(--s)*-1px) calc(var(--s)*-1px) 0 rgba(255,214,140,.16);
  font-size:calc(var(--s)*4.3px);line-height:1.32;text-shadow:0 calc(var(--px)*-1) 0 rgba(0,0,0,.8),0 var(--px) 0 rgba(255,236,190,.13)}
#tablets h3{margin:0 0 calc(var(--s)*1.5px);font-size:calc(var(--s)*5px);letter-spacing:.16em;color:#ecd79c}
#tablets h3~h3{margin-top:calc(var(--s)*3px)}
#tablets p{margin:0 0 calc(var(--s)*1.4px)}
#tablets b{color:#f2e2b4}
#tablets .ref{color:#d0a850;white-space:nowrap}
#tablets .none{opacity:.55}
#tablets .tie{position:absolute;left:50%;width:calc(var(--s)*3px);height:calc(var(--s)*4px);margin-left:calc(var(--s)*-1.5px);background:#6a4424;
  box-shadow:inset var(--px) var(--px) 0 rgba(255,214,140,.3),0 0 0 var(--px) #1a0e06}
#tablets .foot{position:absolute;bottom:calc(var(--s)*1px);left:0;right:0;text-align:center;font-size:calc(var(--s)*3.6px);color:#e0c890;text-shadow:var(--px) var(--px) 0 #000}`;
document.head.appendChild(style);
/* the wax: dark and mottled, with faint level strokes where earlier writing was smoothed over. The strokes all run one way. */
const[wc,wg]=mk(128,128),r=rng(4242);R(wg,0,0,128,128,'#2c2117');tex(wg,'mott',.55,0,0,128,128,'overlay',1);tex(wg,'grain',.18,0,0,128,128,'overlay',.5);
for(let i=0;i<70;i++)R(wg,r()*120,r()*126,3+r()*14,.5+r()*.5,`rgba(${r()<.5?'255,232,190':'0,0,0'},${.03+r()*.05})`);
const el=document.createElement('div');el.id='tablets';el.style.setProperty('--wax',`url(${wc.toDataURL()})`);$('#view').appendChild(el);
const val=x=>typeof x==='function'?x():x,on=e=>!e.if||e.if(),esc=t=>String(val(t)).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
const list=(a,f,none)=>a.length?a.map(f).join(''):`<p class="none">${none}</p>`;
let closer=null;
addEventListener('keydown',e=>{if(closer&&[' ','Escape','Enter','.'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();closer()}},true);
/* open: show the tablets with the chapter's entries as they stand now, and resolve when the player closes them. */
function open(d){const ppl=(d.people||[]).filter(on),todo=(d.tasks||[]).filter(on),scr=(d.scripture||[]).filter(on);
  el.innerHTML='<div class="leaf"><h3>PEOPLE</h3>'+list(ppl,p=>`<p><b>${esc(p.name)}</b>: ${esc(p.note)}</p>`,'No one yet.')+
    '<h3>STILL TO DO</h3>'+list(todo,t=>`<p>&bull; ${esc(t.t)}</p>`,'Nothing left undone.')+'</div>'+
    '<div class="leaf"><h3>SCRIPTURES</h3>'+list(scr,s=>`<p>&ldquo;${esc(s.text)}&rdquo; <span class="ref">(${esc(s.ref)})</span></p>`,'Nothing written yet.')+'</div>'+
    '<i class="tie" style="top:28%"></i><i class="tie" style="top:66%"></i><div class="foot">Click or press Space to close</div>';
  noise({d:.09,v:.2,f:380,q:1.4,type:'lowpass'});tone({f:150,to:110,d:.08,type:'triangle',v:.05});
  return new Promise(res=>{closer=()=>{closer=null;el.classList.remove('on');el.onclick=null;SFX.click();res()};
    el.onclick=e=>{e.stopPropagation();if(closer)closer()};el.classList.add('on');for(const l of el.querySelectorAll('.leaf'))l.scrollTop=0})}
return{open,el};
})();
