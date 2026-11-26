/* Paul of Tarsus: Paul's wax tablets, shared by every chapter. Loaded the first time the tablets are opened (see need() in index.html).
   Two leaves of dark wax in a wooden frame, tied at the middle: on the left the people Paul has met and the tasks still open,
   on the right the Scriptures he keeps before him. Each chapter supplies the entries as data, in its definition:
     tablets:{people:[{name, note, if}], tasks:[{t, if}], scripture:[{ref, gist, if}], notes:{title, none, list:[{t, if}]}}
   notes is optional: a third list with a heading of its own, under the Scriptures, for what a chapter has Paul write down as he goes
   (what he saw in Athens, in Chapter Eleven).
   name, note and t may be functions; if is an optional condition on the story (usually on its flags). A passage is a note in Paul's
   own words (gist), with its reference: no wording is copied out of a translation, and it is shown without quotation marks, because a
   paraphrase is never presented as a quotation (CONTRIBUTING section 1). All of it is English, and is
   translated as it is shown (T in index.html), so the tablets are drawn again when the language changes. */
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
const val=x=>typeof x==='function'?x():x,on=e=>!e.if||e.if(),txt=t=>esc(T(val(t)));
const list=(a,f,none)=>a.length?a.map(f).join(''):`<p class="none">${none}</p>`;
let closer=null,shown=null;
addEventListener('keydown',e=>{if(closer&&[' ','Escape','Enter','.'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();closer()}},true);
/* draw: the entries as they stand now, in the player's language. A passage is Paul's own note, so it stands without quotation marks. */
function draw(d){const ppl=(d.people||[]).filter(on),todo=(d.tasks||[]).filter(on),scr=(d.scripture||[]).filter(on);
  el.innerHTML='<div class="leaf"><h3>'+T('PEOPLE')+'</h3>'+list(ppl,p=>`<p><b>${txt(p.name)}</b>: ${txt(p.note)}</p>`,T('no_one_yet'))+
    '<h3>'+T('still_to_do')+'</h3>'+list(todo,t=>`<p>&bull; ${txt(t.t)}</p>`,T('nothing_left_undone'))+'</div>'+
    '<div class="leaf"><h3>'+T('SCRIPTURES')+'</h3>'+list(scr,s=>`<p>${txt(s.gist)} <span class="ref">(${txt(s.ref)})</span></p>`,T('nothing_written_yet'))+
    (d.notes?'<h3>'+txt(d.notes.title)+'</h3>'+list((d.notes.list||[]).filter(on),t=>`<p>&bull; ${txt(t.t)}</p>`,txt(d.notes.none||'nothing_written_yet')):'')+'</div>'+
    '<i class="tie" style="top:28%"></i><i class="tie" style="top:66%"></i><div class="foot">'+T('click_or_press_space_to_close')+'</div>'}
/* open: show the tablets with the chapter's entries as they stand now, and resolve when the player closes them. */
function open(d){shown=d;draw(d);
  noise({d:.09,v:.2,f:380,q:1.4,type:'lowpass'});tone({f:150,to:110,d:.08,type:'triangle',v:.05});
  return new Promise(res=>{closer=()=>{closer=null;shown=null;el.classList.remove('on');el.onclick=null;SFX.click();res()};
    el.onclick=e=>{e.stopPropagation();if(closer)closer()};el.classList.add('on');for(const l of el.querySelectorAll('.leaf'))l.scrollTop=0})}
/* redraw: the open tablets again, in another language */
const redraw=()=>{if(shown)draw(shown)};
/* ---------- Luke's marks (Chapters Twenty-Two and Twenty-Three) ----------
   Luke keeps the dark days of the storm on a wax tablet of his own (Acts 27:20; the publications say Luke may well have kept notes; the
   tablet and its marks are invented). Both chapters draw his marks with these two painters, so that the tablet that Chapter Twenty-Three
   finds carried in is the one Chapter Twenty-Two wrote. They draw on any canvas, in room pixels, and change nothing else in this file.
   A scratch in the wax is a thin pale line (the wax cut away shows the paler wax under it, catching the light) with its groove's dark
   shade half a pixel below and to the right of it, a little uneven along its length (seeded, so it is the same each time).
     scratch(g, pts, o)         a scratch along the polyline pts [x, y, ...]; o.seed, o.c (pale, #d2bf94), o.dk (shade, #140a04), o.a (1)
     lukeMark(g, cx, cy, kind, o)   one day's mark, its middle at cx, cy: kind 0 only the day (nothing is drawn), 1 south-west, 2 west,
                                3 north-west. A short line 14·k long with a small solid wedge at its western (left) end, pointing west
                                along the line: the west end 5·k lower than the east end for south-west, level for west, 5·k higher for
                                north-west. The wedge is a filled triangle, 3·k from its base to its point and 3·k across its base,
                                never an arrowhead with a crossbar. o.k the scale (1), o.seed
     lukeLine(g, x, y, kinds, o)    the line the marks make, from the point x, y (Cauda) westward, one piece for each day in order:
                                south-west 30·k left and 7·k down, west 30·k left, north-west 30·k left and 7·k up; a day with only
                                the day leaves a gap of 14·k in the line with a small square dot (1.5·k) in its middle. It only runs
                                west, so it never crosses itself. A small square (2·k) marks the start. o.k the scale (1), o.seed.
                                Returns the point where it ends, [x, y].
   Chapter Twenty-Two draws the marks at k 1 in the columns of the days and the line at k .64 below them; Chapter Twenty-Three draws the
   line at k 1. */
const LUKE={c:'#d2bf94',dk:'#140a04'};
function scratch(g,pts,o){o=o||{};const r=rng(o.seed||2271),c=o.c||LUKE.c,dk=o.dk||LUKE.dk,a=o.a==null?1:o.a,q=[];
  for(let i=0;i<pts.length-2;i+=2){const x0=pts[i],y0=pts[i+1],x1=pts[i+2],y1=pts[i+3],L=Math.hypot(x1-x0,y1-y0),n=Math.max(1,Math.round(L/3)),nx=-(y1-y0)/(L||1),ny=(x1-x0)/(L||1);
    for(let j=i?1:0;j<=n;j++){const t=j/n,w=j&&j<n?(r()-.5)*.35:0;q.push(x0+(x1-x0)*t+nx*w,y0+(y1-y0)*t+ny*w)}}
  g.save();g.globalAlpha=a*.6;stroke(g,q.map((v,i)=>v+.5),dk,.6);g.globalAlpha=a;stroke(g,q,c,.55);g.restore()}
function lukeMark(g,cx,cy,kind,o){o=o||{};if(!kind)return;const k=o.k||1,d=kind===1?2.5*k:kind===3?-2.5*k:0,E=[cx+7*k,cy-d],W=[cx-7*k,cy+d],
    L=Math.hypot(W[0]-E[0],W[1]-E[1]),ux=(W[0]-E[0])/L,uy=(W[1]-E[1])/L,nx=-uy,ny=ux,s=o.seed||2272+kind*7;
  scratch(g,[E[0],E[1],W[0]+ux*.4,W[1]+uy*.4],{seed:s,a:o.a});
  const tip=[W[0]+ux*3*k,W[1]+uy*3*k],b0=[W[0]+nx*1.5*k,W[1]+ny*1.5*k],b1=[W[0]-nx*1.5*k,W[1]-ny*1.5*k];
  g.save();if(o.a!=null)g.globalAlpha=o.a;poly(g,[tip[0]+.5,tip[1]+.5,b0[0]+.5,b0[1]+.5,b1[0]+.5,b1[1]+.5],rgba(LUKE.dk,.6));poly(g,[tip[0],tip[1],b0[0],b0[1],b1[0],b1[1]],LUKE.c);g.restore()}
function lukeLine(g,x,y,kinds,o){o=o||{};const k=o.k||1,s=o.seed||2280;let px=x,py=y,run=[px,py];
  const dot=(x,y,w)=>{R(g,x-w/2+.5,y-w/2+.5,w,w,rgba(LUKE.dk,.6));R(g,x-w/2,y-w/2,w,w,LUKE.c)};
  dot(px,py,2*k);
  kinds.forEach((m,i)=>{if(!m){if(run.length>2)scratch(g,run,{seed:s+i});px-=14*k;dot(px+7*k,py,1.5*k);run=[px,py];return}
    px-=30*k;py+=m===1?7*k:m===3?-7*k:0;run.push(px,py)});
  if(run.length>2)scratch(g,run,{seed:s+99});return[px,py]}

return{open,redraw,el,scratch,lukeMark,lukeLine};
})();
