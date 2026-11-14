/* Paul of Tarsus: the travel map, shared by every chapter and loaded on demand (see need() in index.html).
   A painted map of the eastern Mediterranean, our own: the coasts are rough real coordinates in an equirectangular projection,
   painted like the rooms (gradients, texture, relief, then the ordered dither). Cities are round dots. There are no grid lines,
   no compass and no markers, and the routes are laid out so that they never cross.

     journey(route, o)   between scenes: earlier legs are shown, the new ones draw themselves as dotted lines, city by city,
                         with a music sting. route: [[from, to, 'new sea'], ...]; 'new' legs animate, 'sea' legs follow waypoints.
     pick(ids, here)     for a hub chapter: the places as dots; resolves with the place the player clicks, or null (Esc).
     go(from, to)        draw one leg and arrive.
     where(id)           a place's position on the map, in view pixels. */
SHARED.map=(()=>{
"use strict";
const W=320,H=144,LON0=23.2,LAT0=37.45,KX=18.4,KY=22.15;
const xy=(lon,lat)=>[(lon-LON0)*KX,(LAT0-lat)*KY];
const pts=a=>{const o=[];for(let i=0;i<a.length;i+=2)o.push(...xy(a[i],a[i+1]));return o};
/* places: lon, lat, the side the name goes on, and dy to raise or lower a name clear of a line. Names, here and below, are English and
   translated as they are drawn (T); a name may be longer in another language, and the playtest checks that none crosses a line. */
const PLACES={
  damascus:{name:'Damascus',at:[36.29,33.51],lab:'r'},jerusalem:{name:'Jerusalem',at:[35.22,31.78],lab:'r',dy:-2},
  caesarea:{name:'Caesarea',at:[34.89,32.50],lab:'l'},tarsus:{name:'Tarsus',at:[34.89,36.92],lab:'l'},
  antioch:{name:'Antioch',at:[36.16,36.20],lab:'r'},
  tyre:{name:'Tyre',at:[35.20,33.27],lab:'r',minor:1},salamis:{name:'Salamis',at:[33.90,35.18],lab:'l',minor:1},
  paphos:{name:'Paphos',at:[32.42,34.76],lab:'l',minor:1},alexandria:{name:'Alexandria',at:[29.92,31.20],lab:'r',minor:1}};
/* waypoints for legs that do not run straight: by sea up the coast and east of Cyprus; by road round the Gulf of Issus */
const VIA={'caesarea-tarsus':[34.42,33.3,34.5,34.7,34.88,35.75],'tarsus-antioch':[35.6,37.02,36.2,37.03,36.32,36.7,36.3,36.45]};
/* region names sit where no coast, lake or route runs through them */
const REGIONS=[{name:'CILICIA',at:[32.7,36.72]},{name:'SYRIA',at:[37.6,35.2]},{name:'CYPRUS',at:[33.2,34.35],sea:1}];
/* the coast of the mainland, from the Aegean round Asia Minor, down the Syrian and Phoenician coast, and west along Egypt */
const COAST=pts([27.2,37.45,27.25,37.3,27.6,37.12,27.45,36.98,28.0,36.98,28.25,36.84,27.42,36.72,28.1,36.74,28.6,36.74,28.92,36.64,29.12,36.6,29.35,36.26,
  29.66,36.15,30.15,36.25,30.46,36.32,30.56,36.64,30.72,36.88,31.02,36.85,31.42,36.74,31.76,36.55,32.02,36.5,32.3,36.22,32.62,36.08,32.96,36.1,33.32,36.14,
  33.66,36.2,33.96,36.3,34.16,36.45,34.46,36.7,34.66,36.8,34.92,36.74,35.3,36.6,35.56,36.58,35.76,36.75,35.96,36.86,36.16,36.95,36.2,36.72,36.06,36.56,
  35.96,36.36,35.95,36.1,35.84,35.86,35.75,35.52,35.92,35.35,35.95,35.18,35.87,34.9,35.8,34.45,35.65,34.25,35.63,34.12,35.48,33.9,35.44,33.7,35.36,33.56,
  35.2,33.28,35.12,33.1,35.07,32.92,34.96,32.84,34.93,32.68,34.89,32.5,34.85,32.33,34.75,32.06,34.64,31.8,34.55,31.67,34.45,31.52,34.24,31.32,33.8,31.13,
  33.2,31.15,32.75,31.08,32.55,31.05,32.3,31.26,31.85,31.52,31.5,31.56,31.0,31.6,30.6,31.5,30.36,31.46,30.06,31.32,29.9,31.2,29.5,31.04,29.3,30.95]);
const LAND=COAST.concat(pts([40.6,30.95,40.6,37.45]));
const ISLES=[
  pts([32.27,35.08,32.6,35.18,32.95,35.38,33.4,35.34,33.9,35.37,34.3,35.55,34.59,35.69,34.2,35.45,33.95,35.27,34.05,35.0,33.62,34.88,33.02,34.62,32.62,34.68,32.4,34.75]),
  pts([23.55,35.3,23.6,35.58,24.0,35.52,24.3,35.37,24.9,35.42,25.4,35.32,25.72,35.2,26.1,35.22,26.3,35.31,26.22,35.04,25.73,35.0,25.0,34.95,24.72,34.94,24.3,35.15,23.9,35.25]),
  pts([27.7,36.15,28.0,36.45,28.25,36.4,28.2,36.1,27.85,35.9,27.7,35.98]),pts([27.08,35.42,27.22,35.4,27.25,35.85,27.12,35.86]),
  pts([26.86,36.86,27.3,36.9,27.36,36.8,26.95,36.78]),pts([25.36,37.14,25.56,37.12,25.52,36.98,25.36,36.96]),pts([25.26,36.48,25.46,36.44,25.42,36.36,25.28,36.36]),
  pts([24.32,36.76,24.56,36.78,24.52,36.66,24.36,36.64]),pts([25.74,36.9,26.0,36.86,25.98,36.8,25.74,36.82]),pts([26.28,36.62,26.44,36.6,26.38,36.52,26.26,36.54])];
const LAKES=[pts([35.46,31.77,35.6,31.76,35.6,31.4,35.52,31.08,35.38,31.12,35.42,31.5]),pts([35.54,32.9,35.64,32.88,35.62,32.72,35.54,32.74])];
/* ranges of hills and mountains: a line of small peaks, each lit on its north-western face */
const RANGES=[[29.2,37.25,30.4,37.15,31.4,37.05,32.4,36.95,33.4,36.98,34.3,37.25,35.0,37.35],[35.75,37.3,36.3,37.05,36.38,36.6,36.3,36.3],
  [35.95,34.55,35.86,34.1,35.7,33.62],[36.42,34.28,36.2,33.86,35.9,33.38],[35.22,32.6,35.24,32.2,35.2,31.92,35.1,31.5],
  [32.7,34.98,33.05,34.92],[23.9,35.28,24.5,35.25,25.0,35.17,25.6,35.08],[36.95,36.55,37.4,36.3]];
function poly(g,p){g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()}
function line(g,p){g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1])}
function paint(g){const r=rng(1913),lands=[LAND,...ISLES];
  /* the sea: deep in the open water, lighter toward the east and the coasts */
  g.fillStyle=lg(g,0,0,W,H,['#1c4772','#255a88','#2f6d98']);g.fillRect(0,0,W,H);tex(g,'mott',.42,0,0,W,H,'overlay',1);
  for(let i=0;i<260;i++){const x=r()*W,y=r()*H;R(g,x,y,1.5+r()*3,.5,rgba(r()<.5?'#6aa6c8':'#163a60',.35))}
  g.lineJoin='round';g.lineCap='round';
  for(const[w,a]of[[11,.07],[7,.1],[4.5,.14],[2.4,.22],[1.2,.35]])for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=w;g.strokeStyle=rgba('#8cd2d2',a);g.stroke()}
  /* the land: ochre and dust, greener along the coasts and in the Nile delta, sand toward the deserts */
  clipTo(g,()=>{g.beginPath();for(const p of lands){g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()}},()=>{
    g.fillStyle=lg(g,0,0,0,H,['#a88a52','#b8995c','#c4a466']);g.fillRect(0,0,W,H);
    for(const[x,y,rx,ry]of[[300,92,70,42],[205,152,60,22],[60,150,90,30],[318,40,40,30]])pool(g,x,y,rx,ry,'#e2cc98',.75,'source-over');
    for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=9;g.strokeStyle=rgba('#6f8a44',.32);g.stroke();g.lineWidth=4;g.strokeStyle=rgba('#62803c',.3);g.stroke()}
    pool(g,...xy(31.0,31.15),26,9,'#5f8a40',.55,'source-over');
    tex(g,'mott',.55,0,0,W,H,'overlay',1);tex(g,'grain',.16,0,0,W,H,'overlay',.5);
    for(let i=0;i<500;i++){const x=r()*W,y=r()*H;oval(g,x,y,.6+r()*1.4,.4+r()*.6,rgba(r()<.5?'#d8c08a':'#7a6a3c',.28))}
    /* relief: small peaks along each range, light on the north-west face and shadow on the south-east */
    for(const rg of RANGES){const q=pts(rg);for(let i=0;i<q.length-2;i+=2){const x0=q[i],y0=q[i+1],x1=q[i+2],y1=q[i+3],n=Math.max(2,Math.round(Math.hypot(x1-x0,y1-y0)/3.2));
      for(let k=0;k<n;k++){const t=k/n,x=x0+(x1-x0)*t+(r()-.5)*2.4,y=y0+(y1-y0)*t+(r()-.5)*2,w=1.8+r()*1.2,h=2.2+r()*1.6;
        g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-h);g.lineTo(x+w,y);g.closePath();g.fillStyle='#7a5c38';g.fill();
        g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-h);g.lineTo(x+w*.15,y);g.closePath();g.fillStyle='#d6be88';g.fill();
        if(rg[1]>36.9&&r()<.5){g.beginPath();g.moveTo(x-w*.32,y-h*.66);g.lineTo(x,y-h);g.lineTo(x+w*.3,y-h*.7);g.closePath();g.fillStyle='#f4f0e6';g.fill()}}}}
    for(const p of LAKES){poly(g,p);g.fillStyle='#2f6d98';g.fill();g.lineWidth=.6;g.strokeStyle=rgba('#8cd2d2',.6);g.stroke()}});
  /* the edge of the land, darker on the shadow side */
  for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=.7;g.strokeStyle='#5a4428';g.stroke()}
  ao(g,0,0,W,18,'t',.35,'#0a1428');ao(g,0,H-16,W,16,'b',.3,'#0a1428');ao(g,0,0,22,H,'l',.4,'#0a1428');ao(g,W-14,0,14,H,'r',.25,'#0a1428')}
let baked=null;const art=()=>baked||(baked=bake(W,paint,10));
/* a leg as a path of points, through its waypoints, then sampled every couple of pixels for the dotted line */
const at=id=>xy(...PLACES[id].at);
function path(a,b){const v=VIA[a+'-'+b]||VIA[b+'-'+a],raw=[at(a)];if(v){const q=pts(v);if(VIA[a+'-'+b])for(let i=0;i<q.length;i+=2)raw.push([q[i],q[i+1]]);
    else for(let i=q.length-2;i>=0;i-=2)raw.push([q[i],q[i+1]])}raw.push(at(b));
  const out=[];for(let i=0;i<raw.length-1;i++){const[x0,y0]=raw[i],[x1,y1]=raw[i+1],p0=raw[i-1]||raw[i],p3=raw[i+2]||raw[i+1];
    for(let k=0;k<12;k++){const t=k/12,t2=t*t,t3=t2*t,c=(u0,u1,u2,u3)=>.5*(2*u1+(-u0+u2)*t+(2*u0-5*u1+4*u2-u3)*t2+(-u0+3*u1-3*u2+u3)*t3);out.push([c(p0[0],x0,x1,p3[0]),c(p0[1],y0,y1,p3[1])])}}
  out.push(at(b));const dots=[];let s=0;
  for(let i=1;i<out.length;i++){const[x0,y0]=out[i-1],[x1,y1]=out[i],d=Math.hypot(x1-x0,y1-y0);for(;s<=d;s+=2.6)dots.push([x0+(x1-x0)*(d?s/d:0),y0+(y1-y0)*(d?s/d:0)]);s-=d}
  return dots}
const ST={legs:[],seen:new Set(),pulse:null,places:null,hover:null,boxes:[]};
/* box: note where a name was drawn, so that the playtest can check that no name crosses a coast or a route, in any language */
const box=(g,s,x,y,sz)=>ST.boxes.push([x,y-sz*.45,x+g.measureText(s).width,y+sz*.45,s]);
function label(g,s,x,y,side,col,sz){sz=sz||4.6;g.font=`bold ${sz}px "Lucida Console",Monaco,"Courier New",monospace`;g.textBaseline='middle';
  const w=g.measureText(s).width,tx=side==='r'?x+3.2:side==='l'?x-3.2-w:x-w/2,ty=side==='t'?y-5:side==='b'?y+5:y;box(g,s,tx,ty,sz);
  g.fillStyle='rgba(8,6,10,.85)';for(const[dx,dy]of[[.5,0],[-.5,0],[0,.5],[0,-.5],[.5,.5]])g.fillText(s,tx+dx,ty+dy);g.fillStyle=col;g.fillText(s,tx,ty)}
function dot(g,x,y,lit){oval(g,x,y,1.9,1.9,'#1a0e08');oval(g,x,y,1.15,1.15,lit?'#f4dc8a':'#c8b48a')}
/* draw: the baked map, then everything that moves: the routes, the city dots and their names */
function draw(g,t){g.drawImage(art(),0,0,W,H);ST.boxes=[];const sea=T('THE GREAT SEA').split('').join(' ');
  g.font='italic bold 5px "Lucida Console",Monaco,monospace';g.textBaseline='middle';g.fillStyle='rgba(190,224,236,.55)';g.fillText(sea,92,84);box(g,sea,92,84,5);
  for(const{name,at:[lon,lat],sea}of REGIONS){const[x,y]=xy(lon,lat),s=T(name);g.font='bold 4.2px "Lucida Console",Monaco,monospace';g.fillStyle=sea?'rgba(190,224,236,.55)':'rgba(70,46,20,.6)';const sp=s.split('').join(' ');g.fillText(sp,x-s.length*2.3,y);box(g,sp,x-s.length*2.3,y,4.2)}
  for(const L of ST.legs){const n=Math.floor(L.dots.length*L.k);for(let i=0;i<n;i++){const[x,y]=L.dots[i];R(g,x-.6,y-.6,1.2,1.2,'#5a140c');R(g,x-.35,y-.35,.7,.7,L.k<1&&i>n-4?'#ffe0a0':'#d84a32')}}
  const show=new Set(ST.places||Object.keys(PLACES).filter(k=>PLACES[k].minor||ST.seen.has(k)));
  for(const k of show){const p=PLACES[k],[x,y]=at(k),main=!p.minor||ST.places;dot(g,x,y,ST.seen.has(k)||ST.hover===k);
    label(g,T(p.name),x,y+(p.dy||0),p.lab,main?(ST.hover===k?'#ffffff':'#f4e4b8'):'rgba(232,220,190,.62)',main?4.8:4)}
  if(ST.pulse){const[x,y]=at(ST.pulse),k=(t/900)%1;g.strokeStyle=`rgba(255,226,150,${.9*(1-k)})`;g.lineWidth=.6;g.beginPath();g.arc(x,y,2.4+k*6,0,6.2832);g.stroke()}
  if(ST.places){g.font='bold 4.4px "Lucida Console",Monaco,monospace';g.fillStyle='rgba(244,228,184,.9)';/* the hint stands in open sea, clear of the coast of Egypt */
    const s=T('Click a place to travel there. Esc to stay.');g.fillText(s,8,H-14);box(g,s,8,H-14,4.4)}}
function sting(){const t=now()+.06;if(!AU.ctx)return;DRUMS.d(t,1.3);DRUMS.d(t+.36,.9);INST.drone(mtof(50),t,2.6,.8);
  [62,66,69,74].forEach((m,i)=>INST.harp(mtof(m),t+i*.13,.5,1.3));[74,76,78,81,78].forEach((m,i)=>INST.ney(mtof(m),t+.62+i*.2,i===4?.9:.34,.9))}
const arrive=()=>{tone({f:1175,d:.18,type:'sine',v:.05,echo:1});tone({f:1568,t:now()+.08,d:.22,type:'sine',v:.035,echo:1})};
function show(){G.scene=draw;setScore(null);AU.amb={wind:.25,waves:.25}}
/* journey: between scenes. Fades to the map, shows the legs already travelled, then draws the new ones, city by city. */
async function journey(route,o){o=o||{};ST.places=null;ST.hover=null;ST.legs=[];ST.seen=new Set();ST.pulse=null;
  for(const[a,b,kind]of route){const k=/new/.test(kind||'')?0:1;ST.legs.push({a,b,k,dots:path(a,b)});if(k){ST.seen.add(a);ST.seen.add(b)}}
  const first=ST.legs.find(L=>!L.k);if(first)ST.seen.add(first.a);
  if(o.instant){show();for(const L of ST.legs){L.k=1;ST.seen.add(L.a);ST.seen.add(L.b)}ST.pulse=route[route.length-1][1];return}
  await fade(1,450);show();codeBtn();await fade(0,550);sting();await wait(700);
  for(const L of ST.legs)if(!L.k){ST.pulse=L.a;await tween(o.speed||1900,k=>{L.k=k});ST.seen.add(L.b);arrive();ST.pulse=L.b;await wait(350)}
  if(o.text)for(const s of[].concat(o.text))await narr(s,{dur:Math.max(3200,1600+s.length*60)})}
/* pick: a hub chapter's places as dots; hovering lights a name, a click resolves with that place, Esc or right-click with null */
function pick(ids,here){ST.places=ids;ST.legs=[];ST.seen=new Set([here]);ST.pulse=here;ST.hover=null;show();
  const vp=$('#view'),pos=e=>{const r=vp.getBoundingClientRect();return[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]},
    near=e=>{const[x,y]=pos(e);let best=null,bd=7;for(const k of ids){const[px,py]=at(k),d=Math.hypot(px-x,py-y);if(d<bd){bd=d;best=k}}return best};
  return new Promise(res=>{const end=v=>{vp.removeEventListener('click',ck,true);vp.removeEventListener('mousemove',mv,true);vp.removeEventListener('contextmenu',no,true);removeEventListener('keydown',kd,true);ST.places=null;res(v)},
    ck=e=>{e.stopImmediatePropagation();const k=near(e);if(k)end(k)},mv=e=>{ST.hover=near(e)},no=e=>{e.preventDefault();e.stopImmediatePropagation();end(null)},
    kd=e=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();end(null)}};
    vp.addEventListener('click',ck,true);vp.addEventListener('mousemove',mv,true);vp.addEventListener('contextmenu',no,true);addEventListener('keydown',kd,true)})}
/* go: draw one leg from a to b on the map that is showing, and arrive */
async function go(a,b){const L={a,b,k:0,dots:path(a,b)};ST.legs.push(L);ST.seen.add(a);ST.pulse=a;show();await tween(1500,k=>{L.k=k});ST.seen.add(b);arrive();ST.pulse=b;await wait(500)}
const where=id=>at(id);
/* lines: every thin line on the map that a name must not cross: the coasts, the islands and the lakes, as lists of points */
const lines=()=>[COAST,...ISLES.map(p=>p.concat(p.slice(0,2))),...LAKES.map(p=>p.concat(p.slice(0,2)))];
return{journey,pick,go,where,lines,places:PLACES,state:ST,draw};
})();
