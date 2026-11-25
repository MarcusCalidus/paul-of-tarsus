/* Paul of Tarsus: the lane map, a city seen from above, loaded on demand (a chapter names it in its line of the manifest: needs:['lanes']).
   A room of its own kind: taller and wider than the view, which follows whoever is played across and up and down (G.camY), and which the
   player may zoom (G.zoom: two fingers, the mouse wheel, + and -). It is seen at a slant from above, as the city maps of the early-1990s
   adventures were: every house stands up from its ground, its front wall of one or two storeys towards us, with its door and windows, and
   its roof above, so that it hides the lane behind it; while whoever is played walks behind a house, the house fades, so that he is never
   lost from sight. People are figures of their own (FOLK), drawn by hand pixel by pixel like the room figures, about fourteen room pixels
   tall, and lit by the sun or the shade of the house beside them. A click walks him along the lanes by the shortest way he knows, and the
   way is shown as a row of dots up to a small diamond where it ends: he knows the lanes he has seen, on the screen where no house hides
   them, and those round every corner he has come by. Everything the room can do still works on it: Look and the other verbs, Pray, the
   names under Tab, the safe-point code; the engine hands it the walking (route), the moving (tick) and the drawing of the people in it
   (drawActor), through ROOMS[id].plan.

     make(id, def)   registers ART[id] and ROOMS[id] and returns the map, M. def:
       w, h          the size of the city in room pixels; seed, which makes its houses; lot: about how far apart the houses stand;
                     grid: its streets cross at right angles, as those of Ephesus did (the exception in CONTRIBUTING section 3);
                     height(house): the height of a house's front, where the chapter wants it otherwise (in room pixels)
       lanes         [{pts:[x,y, x,y, ...], w, kind:'earth'|'paved', rough}]: the ways that can be walked, as lines with a width. No lane
                     crosses another, and no two end on the same point of a third from opposite sides: a crossing seen from above is a
                     plus sign (CONTRIBUTING section 3). The playtest checks it (crossings).
       open          [{poly:[x,y, ...], kind:'square'|'earth'}]: squares and yards that can be walked
       keep          [{poly}]: ground that is neither house nor lane, such as a theater or the sea: the chapter paints it (paint)
       bridges       [{x, y, w, d, H, gap:[x0, x1]}]: covered passages, houses built over a lane, with an archway where it runs through
       marks         [{x, y, paint(g, v, [top, foot])}]: what the chapter paints on the front of the house that stands at x, y (a door,
                     shutters); top and foot are the rows of that front at x
       solid         [[x,y,w,h], ...]: things on a lane that nobody walks through (a stall, a fountain); block: {variant: [[x,y,w,h], ...]}:
                     the same, in one variant of the map only (a gate that is shut, a stall overturned)
       variant()     which picture and which ways hold now, such as 'surge' or 'quiet'
       paint(g, v, M), props: what the chapter paints on the ground in variant v, and what of it stands up among the people
                     (as a room's props: {y, shape(g, v)}); draw(g, ts, M), front(g, ts, M): what moves (a cat on a wall)
       cue(house, v)  how the windows of a house stand in variant v: 'open', 'shut' or 'head' (a face looks out)
       crowd:        {variant: {sinks:{name:[[x,y], ...]}, sources:[{x, y, rate, on, off, ph, to}], pace, max}}: where people make for, and
                     where they come from, in waves: rate a second while a wave lasts (on seconds), then a pause (off seconds). Nobody
                     appears out of the open ground: a source with x, y lies where a street comes in from beyond the map, or in a gate; a
                     source with doors:[x, y] and r sends them out of the doors of the houses within r of that place, never out of a house
                     whose shutters are bolted (cue), and the door stands open behind each for a moment
       zones         [{x, y, w, h, enter()}]: places the chapter is told of when whoever is played walks into them (a court, say)
       jams          {variant: [{x, y, w, h, face, say}]}: narrow streets packed with people who cannot get through themselves; nobody
                     passes them
       obstacles     {variant: [{x, y, w, h, say}]}: what blocks a way in a variant (a gate, an overturned stall), with the line that says
                     what it is; whoever is played says it when he stops before it, as he does before a jam
       flat, ew      how often a roof is flat (0.1), and how wide a house must be against its depth for its ridge to run east and west (0.85)
       targets       {name:[x, y]}: places whose distance along the lanes the chapter asks for (dist), as the sound does
       pace(a)       'run' or 'walk', for whoever is played; press(): someone was pressed back by the crowd (the chapter may say so)
       room          the room's own fields: hs, mood, amb, enter, space ...
     M.dist(name, x, y)    how far a place lies from x, y along the lanes, in room pixels (Infinity if no way leads there)
     M.near(x, y, r)       how many people of the crowd stand within r
     M.walkable(x, y), M.route(a, x, y, all): the way (all: by every lane, not only those he knows), M.reset(): the crowd starts again,
     M.doors: the doors of the houses, [{x, y, h, house}], M.seeAll: he knows every lane (for a test)
   The figures: FOLK draws the people of the map from their room look (LOOK): a man in a tunic and mantle, a man in a belted tunic, a woman
   with her mantle over her head. Every frame is a small pixel map, set down by hand: the head, the body and the legs each have their own,
   for three ways of facing (towards us, away, to the side; the other side is its mirror), standing, four moments of a walk and four of a run.
   Nobody's arm stands out from his body, and the legs open like a pair of compasses and never cross (CONTRIBUTING section 3). */
SHARED.lanes=(()=>{
"use strict";
const CS=2;                                   /* a cell of the walk grid, in room pixels */
const BUILT=0,EARTH=1,PAVED=2,SQUARE=3,KEEP=4,COURT=5;
const OPEN=k=>k===EARTH||k===PAVED||k===SQUARE;
const PACE={run:49,walk:26},STRIDE={run:29,walk:21};   /* room pixels a second; room pixels for two steps */

/* --- noise: a lattice of values smoothly read, and a hash for one value per spot --- */
function lattice(seed,n){const r=rng(seed),a=new Float32Array(n*n);for(let i=0;i<a.length;i++)a[i]=r();a.n=n;return a}
function vn(a,x,y){const n=a.n,x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy),
  at=(i,j)=>a[(((j%n)+n)%n)*n+(((i%n)+n)%n)];return(at(x0,y0)*(1-sx)+at(x0+1,y0)*sx)*(1-sy)+(at(x0,y0+1)*(1-sx)+at(x0+1,y0+1)*sx)*sy}
const hash2=(x,y,s)=>{let h=Math.imul(x|0,374761393)+Math.imul(y|0,668265263)+Math.imul(s|0,982451653)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};

/* ============ THE GROUND: what each room pixel is ============ */
function fillPoly(K,W,H,p,k,keepPaved){let y0=H,y1=0;for(let i=1;i<p.length;i+=2){y0=Math.min(y0,p[i]);y1=Math.max(y1,p[i])}
  for(let y=Math.max(0,Math.floor(y0));y<=Math.min(H-1,Math.ceil(y1));y++){const yc=y+.5,xs=[];
    for(let i=0,n=p.length/2;i<n;i++){const ax=p[2*i],ay=p[2*i+1],bx=p[2*((i+1)%n)],by=p[2*((i+1)%n)+1];if((ay<=yc)!==(by<=yc))xs.push(ax+(yc-ay)/(by-ay)*(bx-ax))}
    xs.sort((a,b)=>a-b);for(let j=0;j+1<xs.length;j+=2)for(let x=Math.max(0,Math.ceil(xs[j]-.5));x<=Math.min(W-1,Math.floor(xs[j+1]-.5));x++){const i=y*W+x;if(!(keepPaved&&K[i]===PAVED))K[i]=k}}}
const inPoly=(p,x,y)=>{let c=false;for(let i=0,n=p.length/2,j=n-1;i<n;j=i++){const xi=p[2*i],yi=p[2*i+1],xj=p[2*j],yj=p[2*j+1];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
function ground(def){const W=def.w,H=def.h,K=new Uint8Array(W*H),nz=lattice((def.seed||1)*7+3,64);
  for(const z of def.keep||[])fillPoly(K,W,H,z.poly,KEEP);
  /* the lanes: a line with a width, whose edges wander a little (rough) as the house fronts along it do, mostly outward, so that a lane is never
     pinched shut; a paved street keeps straight edges */
  const lane=(L,k)=>{const p=L.pts,ro=L.rough==null?(k===PAVED?0:1):L.rough;let along=0;
    for(let i=2;i<p.length;i+=2){const ax=p[i-2],ay=p[i-1],bx=p[i],by=p[i+1],dx=bx-ax,dy=by-ay,len=Math.hypot(dx,dy)||1,hw=L.w/2+1.5;
      const x0=Math.max(0,Math.floor(Math.min(ax,bx)-hw)),x1=Math.min(W-1,Math.ceil(Math.max(ax,bx)+hw)),y0=Math.max(0,Math.floor(Math.min(ay,by)-hw)),y1=Math.min(H-1,Math.ceil(Math.max(ay,by)+hw));
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const px=x+.5,py=y+.5,t=clamp(((px-ax)*dx+(py-ay)*dy)/(len*len),0,1),d=Math.hypot(px-ax-dx*t,py-ay-dy*t),
        side=(px-ax)*dy-(py-ay)*dx>0?17:0,j=ro?(vn(nz,(along+t*len)*.16,side+(L.seed||i))-.25)*2.2*ro:0;
        if(d<=L.w/2+j){const q=y*W+x;if(k===PAVED||K[q]!==PAVED&&K[q]!==SQUARE)K[q]=k}}
      along+=len}};
  for(const L of def.lanes)if(L.kind!=='paved')lane(L,EARTH);
  for(const L of def.lanes)if(L.kind==='paved')lane(L,PAVED);
  for(const o of def.open||[])fillPoly(K,W,H,o.poly,o.kind==='earth'?EARTH:SQUARE,true);
  return K}

/* ============ THE HOUSES: the built ground is cut into houses, each with its roof, its height and its front ============ */
const ROOFS=['#a2604a','#9a5e4c','#a86a52','#8e6254','#a46650','#97685a','#b07460','#86645a','#9c5a44'],
  FLAT=['#b9ab90','#c2b498','#b0a088'],WALLS=['#e0d4ba','#d6c4a2','#cdb490','#e6dac6','#d4c2a8','#dacbae','#c8ae8c'];
/* houses: the built ground is laid out in rows of houses, each a box of its own width, the rows a little uneven so that no seam runs on
   across the city; a lane that runs through a box leaves a house on either side of it, and a sliver too small for a house joins its neighbour */
function houses(def,K){const W=def.w,H=def.h,S=def.lot||15,r=rng((def.seed||1)*31+7),rects=[];
  for(let y=-Math.round(r()*8);y<H;){const rh=Math.round(S*.8+r()*S*.55);for(let x=-Math.round(r()*14);x<W;){const w=Math.round(S*.7+r()*S*.95),t=y+Math.round((r()-.5)*4),b=y+rh+Math.round((r()-.5)*4);
      if(rh>=S*1.15&&r()<.3){const m=t+Math.round((b-t)*(.4+r()*.2)),w2=Math.round(w*(.5+r()*.5));rects.push([x,t,w,m-t]);rects.push([x,m,w2,b-m]);if(w2<w)rects.push([x+w2,m,w-w2,b-m])}
      else rects.push([x,t,w,b-t]);x+=w}y+=rh}
  /* every built pixel belongs to the first box that holds it, else to the nearest box */
  const own=new Int32Array(W*H).fill(-1),G=16,buck=new Map();
  rects.forEach((q,i)=>{for(let gy=Math.floor(q[1]/G);gy<=Math.floor((q[1]+q[3])/G);gy++)for(let gx=Math.floor(q[0]/G);gx<=Math.floor((q[0]+q[2])/G);gx++){const k=gx*4096+gy;let l=buck.get(k);if(!l)buck.set(k,l=[]);l.push(i)}});
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(K[i]!==BUILT)continue;let best=1e9,bi=-1,inside=-1;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const l=buck.get((Math.floor(x/G)+dx)*4096+Math.floor(y/G)+dy);if(!l)continue;
      for(const j of l){const q=rects[j],d=Math.max(q[0]-x-.5,x+.5-q[0]-q[2],q[1]-y-.5,y+.5-q[1]-q[3]);if(d<0){if(inside<0||j<inside)inside=j}else if(d<best){best=d;bi=j}}}
    own[i]=inside>=0?inside:bi}
  const hid=new Int32Array(W*H),HS=[null],px=[null];
  for(let i=0;i<W*H;i++){if(own[i]<0||hid[i])continue;const id=HS.length,list=[i],st=[i];hid[i]=id;
    while(st.length){const q=st.pop(),x=q%W,y=(q/W)|0;for(const n of[x>0?q-1:-1,x<W-1?q+1:-1,y>0?q-W:-1,y<H-1?q+W:-1])if(n>=0&&!hid[n]&&own[n]===own[i]){hid[n]=id;list.push(n);st.push(n)}}
    HS.push({id,box:rects[own[i]]});px.push(list)}
  for(let id=1;id<HS.length;id++){const L=px[id];if(!L||L.length>=26)continue;let to=0;
    for(const q of L){const x=q%W;for(const n of[x>0?q-1:-1,x<W-1?q+1:-1,q-W,q+W])if(n>=0&&n<W*H&&hid[n]&&hid[n]!==id&&px[hid[n]]){to=hid[n];break}if(to)break}
    if(to){for(const q of L){hid[q]=to;px[to].push(q)}px[id]=null;HS[id]=null}}
  /* where four roofs would meet at one corner (a plus sign of seams), the house below on the right gives a notch of two pixels to its left
     neighbour, so that the seams jog */
  for(let pass=0;pass<3;pass++){let n=0;for(let y=1;y<H-2;y++)for(let x=1;x<W-2;x++){const i=y*W+x,a=hid[i-W-1],b=hid[i-W],c=hid[i-1],d=hid[i];
      if(!a||!b||!c||!d||new Set([a,b,c,d]).size<4||!px[c]||!px[d])continue;
      for(const q of[i,i+1,i+W,i+W+1])if(hid[q]===d&&K[q]===BUILT){hid[q]=c;px[c].push(q);const L=px[d],k=L.indexOf(q);if(k>=0)L.splice(k,1)}n++}
    if(!n)break}
  for(let id=1;id<HS.length;id++){const L=px[id];if(!L||!L.length){HS[id]=null;continue}let x0=W,y0=H,x1=0,y1=0;for(const q of L){const x=q%W,y=(q/W)|0;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    /* hw: how tall the house's front wall stands, in room pixels: one storey or two, as in the city maps of those games */
    const h=HS[id],bw=x1-x0+1,bh=y1-y0+1,flat=r()<(def.flat==null?.1:def.flat),hw0=r()<.4?8+Math.round(r()*4)/2:11.5+Math.round(r()*5)/2;Object.assign(h,{x0,y0,x1,y1,n:L.length,ew:bw>=bh*(def.ew||.85),hw:hw0,flat,
      roof:flat?FLAT[(r()*FLAT.length)|0]:ROOFS[(r()*ROOFS.length)|0],wall:WALLS[(r()*WALLS.length)|0],seed:(r()*1e6)|0});
    /* now and then a walled yard with a tree in it instead of a house */
    if(L.length>=90&&L.length<=420&&r()<.06){h.yard=true;h.flat=false;h.hw=2.5}
    /* a large house is built round a court open to the sky, where the chapter wants it (def.courts): where the houses stand tall, the
       court's floor is hidden behind its own south wing, and only its inner wall shows, so the demo has none */
    else if(def.courts&&bw>=22&&bh>=19&&L.length>=bw*bh*.85&&r()<.38){const cx0=x0+Math.round(bw*.33),cx1=x1-Math.round(bw*.33),cy0=y0+Math.round(bh*.3),cy1=y1-Math.round(bh*.4);
      if(cx1-cx0>=4&&cy1-cy0>=3){let all=true;for(let y=cy0-1;y<=cy1+1&&all;y++)for(let x=cx0-1;x<=cx1+1;x++)if(hid[y*W+x]!==id){all=false;break}
        if(all){h.court=[cx0,cy0,cx1,cy1];h.flat=false;h.roof=ROOFS[(r()*ROOFS.length)|0];for(let y=cy0;y<=cy1;y++)for(let x=cx0;x<=cx1;x++)K[y*W+x]=COURT}}}}
  if(def.height)for(const h of HS)if(h&&!h.yard){const v=def.height(h);if(v!=null)h.hw=v}
  return{hid,HS}}

/* ============ PAINTING ============ */
const SHADE=[.66,.62,.7];   /* the sun's shadow, multiplied in: a little cool */
/* fronts: for each house pixel, how many pixels of the same roof lie below it (dn), above it (up), to the left (lf) and to the right (rt),
   and what ends the run below: open ground (1) or another house (2). Then each house's front, where its run ends on open ground, is given
   its door and its windows (feat): windows two columns wide on the ground floor, and on a house of two storeys windows above, set between
   those below and never over them, so that four of them never stand two by two. The doors are listed (doors): the crowd steps out of them.
   Worked out once, when the map is made. */
const DOORH=7;   /* how tall a door is, in room pixels: about half a figure, as in the city maps of those games (def.doorH; def.door and def.win:
                    how many room pixels wide a door and a window are, 2 by default; def.winH: how tall a window is, 2.5) */
function fronts(M){const def=M.def,W=def.w,H=def.h,K=M.K,{hid,HS}=M.H,isH=i=>K[i]===BUILT&&hid[i]>0;
  const dn=new Int16Array(W*H),up=new Int16Array(W*H),lf=new Int16Array(W*H),rt=new Int16Array(W*H),end=new Uint8Array(W*H),below=new Int32Array(W*H);
  for(let x=0;x<W;x++){for(let y=H-1;y>=0;y--){const i=y*W+x;if(!isH(i))continue;const b=y<H-1?i+W:-1;if(b>=0&&isH(b)&&hid[b]===hid[i]){dn[i]=dn[b]+1;end[i]=end[b];below[i]=below[b]}else{dn[i]=0;end[i]=b<0?2:isH(b)?2:K[b]===KEEP?2:1;below[i]=b>=0&&isH(b)?hid[b]:0}}
    for(let y=0;y<H;y++){const i=y*W+x;if(!isH(i))continue;const a=i-W;up[i]=y>0&&isH(a)&&hid[a]===hid[i]?up[a]+1:0}}
  for(let y=0;y<H;y++){for(let x=0;x<W;x++){const i=y*W+x;if(!isH(i))continue;lf[i]=x>0&&isH(i-1)&&hid[i-1]===hid[i]?lf[i-1]+1:0}
    for(let x=W-1;x>=0;x--){const i=y*W+x;if(!isH(i))continue;rt[i]=x<W-1&&isH(i+1)&&hid[i+1]===hid[i]?rt[i+1]+1:0}}
  const feat=new Uint8Array(W*H),doors=[],DW=def.door||2,WW=def.win||2,PER=2*WW+1,DH=def.doorH||DOORH;   /* feat: 1 door, 2 window above, 3 window below */
  for(let id=1;id<HS.length;id++){const h=HS[id];if(!h||h.yard)continue;const r=rng(h.seed),cols=[];
    for(let x=h.x0;x<=h.x1;x++){let best=-1;for(let y=h.y1;y>=h.y0;y--){const i=y*W+x;if(hid[i]===id&&K[i]===BUILT&&dn[i]===0&&end[i]===1){best=i;break}}cols.push(best)}
    let run=[];const flush=()=>{if(run.length>=DW+3){const L=run.length,door=L>=DW+4&&r()<.85?1+((r()*(L-DW-2))|0):-99,free=k=>k>0&&k<L-1&&(k<door-1||k>door+DW);
        for(let k=0;k<L;k++){const i=run[k],m=(k+h.seed)%PER;if(k>=door&&k<door+DW)feat[i]=1;
          else if(h.hw>=11&&m>=1&&m<=WW&&free(k))feat[i]=2;else if(h.hw>=6&&m>WW&&m<=2*WW&&free(k))feat[i]=3}
        if(door>=0){const i=run[door],x=i%W,y=(i/W)|0;if(run[door+DW-1]===i+DW-1)doors.push({x,y,w:DW,h:Math.min(h.hw-2,DH),house:h})}}run=[]};
    for(const i of cols){if(i>=0&&(!run.length||i===run[run.length-1]+1))run.push(i);else{flush();if(i>=0)run.push(i)}}flush()}
  return{dn,up,lf,rt,end,below,feat,doors}}
/* the ground: the lanes paved with small stones, the streets with slabs, the squares with great ones, darker at the foot of a wall and in
   the shadow the houses throw to the east, away from the sun in the west-south-west. Under a house the ground is never seen. The courses of
   the paving run one way; the stones of a course differ in tone, and no joint is drawn across a course. */
function paintGround(M,g,v){const def=M.def,W=def.w,H=def.h,K=M.K,{hid,HS}=M.H,W2=W*2,H2=H*2,im=g.createImageData(W2,H2),d=im.data,
  nzA=lattice((def.seed||1)*13+1,32),nzB=lattice((def.seed||1)*17+5,64),hAt=(x,y)=>x<0||y<0||x>=W||y>=H?0:K[y*W+x]===BUILT?hid[y*W+x]:0;
  const far=new Float32Array(W*H);for(let i=0;i<W*H;i++)far[i]=K[i]===BUILT||K[i]===KEEP?0:99;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(!far[i])continue;let m=far[i];if(x>0)m=Math.min(m,far[i-1]+1);if(y>0)m=Math.min(m,far[i-W]+1);if(x>0&&y>0)m=Math.min(m,far[i-W-1]+1.4);if(x<W-1&&y>0)m=Math.min(m,far[i-W+1]+1.4);far[i]=m}
  for(let y=H-1;y>=0;y--)for(let x=W-1;x>=0;x--){const i=y*W+x;if(!far[i])continue;let m=far[i];if(x<W-1)m=Math.min(m,far[i+1]+1);if(y<H-1)m=Math.min(m,far[i+W]+1);if(x<W-1&&y<H-1)m=Math.min(m,far[i+W+1]+1.4);if(x>0&&y<H-1)m=Math.min(m,far[i+W-1]+1.4);far[i]=m}
  const sun=new Uint8Array(W*H);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(K[i]===BUILT)continue;for(let k=1;k<=12;k++){const id=hAt(x-k,y+Math.round(k*.42));if(id&&HS[id]&&k<=HS[id].hw*.8+1){sun[i]=1;break}}}
  M.sun=sun;
  const LANE=hex(def.earth||'#d2c6aa'),PAVEDC=hex(def.paved||'#dcd2ba'),SQC=hex(def.square||'#d6cbb0'),COURTC=hex('#cabd9e'),UNDER=[92,78,66];
  for(let Y=0;Y<H2;Y++)for(let X=0;X<W2;X++){const x=X>>1,y=Y>>1,i=y*W+x,k=K[i],o=(Y*W2+X)*4;
    if(k===KEEP)continue;
    if(k===BUILT){d[o]=UNDER[0];d[o+1]=UNDER[1];d[o+2]=UNDER[2];d[o+3]=255;continue}
    let c,kk;const n1=vn(nzA,x*.07,y*.07)-.5,gr=hash2(X,Y,7)-.5;
    /* courses: small stones in the lanes, slabs in the streets, great ones in the squares and courts */
    const big=k===SQUARE||k===COURT,rh=k===EARTH?3:big?6:4,sl=k===EARTH?4:big?8:6,row=Math.floor(Y/rh),off=hash2(row,0,rh)*sl,col=Math.floor((X+off)/sl);
    c=k===COURT?COURTC:k===SQUARE?SQC:k===PAVED?PAVEDC:LANE;kk=1+(hash2(col,row,rh*7+1)-.5)*(k===EARTH?.16:.1)+n1*.07+gr*.04;
    if(Y%rh===0)kk*=1.06;else if(Y%rh===rh-1)kk*=.94;
    const f=far[i];kk*=f<1.2?.74:f<2.2?.86:f<3.2?.94:1;
    if(sun[i]){d[o]=c[0]*kk*SHADE[0];d[o+1]=c[1]*kk*SHADE[1];d[o+2]=c[2]*kk*SHADE[2]}else{d[o]=c[0]*kk;d[o+1]=c[1]*kk;d[o+2]=c[2]*kk}d[o+3]=255}
  g.save();g.setTransform(1,0,0,1,0,0);const[c2,g2]=mk(W2,H2);g2.putImageData(im,0,0);g.drawImage(c2,0,0);g.restore()}

/* ============ THE HOUSES STAND UP ============
   A house is seen at a slant from above, as in the city maps of those games: its roof lies as high above its ground as its front wall is
   tall (hw), so that it covers the ground behind it, and whoever walks there is hidden by it. Each house is painted once for each variant
   into a sprite of its own: its front wall, plaster over a course of dark stone, under the eaves of its roof, with its door and windows, and
   its roof of tiles that run down each slope. The sprite is cut into strips of columns whose front stands on the same row, and each strip
   takes its place among the people by that row, as a room's props do. While whoever is played walks behind a house, it fades (FADE), so
   that he is never lost from sight. A covered passage (def.bridges) is the same: a house built over a lane, with an archway in its front. */
const FADE=.35;
function sprite(M,h,v){const def=M.def,W=def.w,K=M.K,{hid,HS}=M.H,{dn,up,lf,rt,feat}=M.F,cue=def.cue||(()=>'shut'),s=cue(h,v),
  Hh=h.hw,X0=h.x0,X1=h.x1,T=Math.floor(h.y0-Hh),B=h.y1,cw=(X1-X0+1)*2,ch=(B-T+1)*2,[c,g]=mk(cw,ch),im=g.createImageData(cw,ch),d=im.data,
  nzA=M.nzA,nzB=M.nzB,R0=hex(h.roof),W0=hex(h.wall),isH=i=>K[i]===BUILT&&hid[i]>0,hAt=(x,y)=>x<0||y<0||x>=W||y>=def.h?0:K[y*W+x]===BUILT?hid[y*W+x]:0,
  strips=[],wall={};let cur=null;
  const put=(X,Y,col,k)=>{if(X<0||Y<0||X>=cw||Y>=ch)return;const o=(Y*cw+X)*4;d[o]=Math.min(255,col[0]*k);d[o+1]=Math.min(255,col[1]*k);d[o+2]=Math.min(255,col[2]*k);d[o+3]=255};
  /* the roof, at one canvas pixel: the footprint pixel i that it lies over, sx, sy its quarter */
  const roof=(X,Y,i,x,y,sx,sy)=>{const WX=x*2+sx,WY=T*2+Y;
    if(h.yard){const eL=lf[i]+sx*.5<.6,eR=rt[i]+(1-sx)*.5<.6,eU=up[i]+sy*.5<.6,eD=dn[i]+(1-sy)*.5<.6;
      let kk=1+(vn(nzA,x*.25,y*.25)-.5)*.22+(hash2(WX,WY,h.seed)-.5)*.1;const col=eL||eU?[214,202,176]:eR||eD?[150,138,116]:vn(nzB,x*.4,y*.4)>.55?[118,122,74]:[150,132,90];
      if(!(eL||eU||eR||eD)&&(lf[i]<1.5||up[i]<1.5))kk*=.8;put(X,Y,col,kk);return}
    const dDn=dn[i]+(1-sy)*.5,dUp=up[i]+sy*.5,dL=lf[i]+sx*.5,dR=rt[i]+(1-sx)*.5;let face,ridge=false;
    if(h.court){const m=Math.min(dUp*1.25,dDn,dL,dR);face=m===dUp*1.25?'N':m===dDn?'S':m===dL?'W':'E'}
    else if(h.ew){const L=dUp+dDn,rp=L*.42;face=dUp<rp?'N':'S';ridge=Math.abs(dUp-rp)<.5}
    else{const L=dL+dR,rp=L*.5;face=dL<rp?'W':'E';ridge=Math.abs(dL-rp)<.5}
    const edge=dDn<.6;let kk;
    if(h.flat){kk=1+(vn(nzA,x*.2,y*.2)-.5)*.1+(hash2(WX,WY,h.seed)-.5)*.05;if(dL<.6||dUp<.6)kk*=1.07;if(dR<.6)kk*=.84;if(edge)kk*=.7;if(dL>=.6&&dL<1.1||dUp>=.6&&dUp<1.1)kk*=.9}
    else{/* the slopes as the sun in the west-south-west finds them, clearly apart, as in the city maps of those games: the south and west
         slopes lit, the north and east ones in shade; a bright ridge, the back edge of the roof catching the light, a dark line at the eaves */
      kk=face==='S'?1.06:face==='W'?1.1:face==='N'?.68:.64;
      /* the cover tiles run down each slope and stop short of the ridge, so that no stripe crosses it */
      if(ridge)kk*=1.22;else if(face==='N'||face==='S'){if(WX%3===0)kk*=.88}else if(WY%3===0)kk*=.88;
      if(edge)kk*=.55;else if(dUp<.6)kk*=1.12;kk*=1+(vn(nzA,x*.12,y*.12)-.5)*.14+(hash2(WX,WY,h.seed)-.5)*.05}
    /* a seam where two roofs meet, on the shadow side; the shade of a taller house to the west */
    if(sx&&x<W-1&&isH(i+1)&&hid[i+1]!==h.id)kk*=.6;if(sy&&isH(i+W)&&hid[i+W]!==h.id)kk*=.65;
    for(let q=1;q<=6;q++){const A=hAt(x-q,y+Math.round(q*.42));if(A&&A!==h.id&&HS[A]&&HS[A].hw-h.hw>=q*.8){kk*=.74;break}}
    put(X,Y,R0,kk)};
  /* the front wall, at one canvas pixel: u its height above the ground, ib the house's lowest pixel in this column */
  const DH=def.doorH||DOORH,WH=def.winH||2.5;
  const win=(X,Y,sx,top)=>{if(s==='shut')put(X,Y,[112,78,48],sx?.84:1);else if(s==='head'&&top)put(X,Y,hex('#b07a52'),1);else put(X,Y,top?[58,48,44]:[78,66,58],sx?.86:1.04)};
  const front=(X,Y,u,ib,x,sx)=>{let kk=.98+(vn(nzB,x*.5,(T*2+Y)*.25)-.5)*.07+(hash2(x*2+sx,T*2+Y,h.seed)-.5)*.04;const east=rt[ib]+(1-sx)*.5<1.1,west=lf[ib]+sx*.5<.6;
    if(u>Hh-.5)kk*=1.08;else if(u>Hh-1.5)kk*=.72;else if(u<1)kk*=.78;else if(u<1.5)kk*=.9;
    if(east)kk*=.8;else if(west)kk*=1.05;
    const fi=feat[ib];
    if(fi===1&&u<Math.min(Hh-2.5,DH)){if(s==='open'&&u<Math.min(Hh-2.5,DH)-.5)put(X,Y,[48,38,34],sx?.9:1.05);else put(X,Y,[102,70,44],sx?.92:.74);return}
    if(fi===2&&u>Hh-3.5-WH&&u<Hh-3.5){win(X,Y,sx,u>Hh-3.5-WH/2);return}
    if(fi===3&&u>2.5&&u<2.5+WH){win(X,Y,sx,false);return}
    put(X,Y,W0,kk)};
  for(let x=X0;x<=X1;x++){const runs=[];let a=-1;
    for(let y=h.y0;y<=B+1;y++){const on=y<=B&&hid[y*W+x]===h.id&&K[y*W+x]===BUILT;if(on&&a<0)a=y;else if(!on&&a>=0){runs.push([a,y-1]);a=-1}}
    if(!runs.length){cur=null;continue}
    const fr=runs[runs.length-1][1],top=runs[0][0]-Hh;wall[x]=[fr+1-Hh,fr];
    if(cur&&cur.front===fr&&cur.x1===x-1){cur.x1=x;cur.top=Math.min(cur.top,top)}else strips.push(cur={x0:x,x1:x,front:fr,top});
    for(const[a,b]of runs){const Y0=Math.round((a-Hh-T)*2),Y1=Math.round((b+1-Hh-T)*2),Y2=(b+1-T)*2;
      for(let sx=0;sx<2;sx++){const X=(x-X0)*2+sx;
        for(let Y=Math.max(0,Y0);Y<Y1;Y++){const yf=clamp(Math.floor(T+Hh+Y/2),a,b);roof(X,Y,yf*W+x,x,yf,sx,Y&1)}
        for(let Y=Math.max(0,Y1);Y<Y2;Y++)front(X,Y,(b+1)-(T+(Y+.5)/2),b*W+x,x,sx)}}}
  g.putImageData(im,0,0);
  return{c,g,X0,X1,T,B,strips,wall,alpha:1,h}}
/* bridge: a house built over a lane, a covered passage: its front has an archway where the lane runs through it, dark inside */
function bridge(M,b,v){const Hh=b.H,X0=b.x,X1=b.x+b.w-1,T=Math.floor(b.y-Hh),B=b.y+b.d-1,cw=b.w*2,ch=(B-T+1)*2,[c,g]=mk(cw,ch),im=g.createImageData(cw,ch),d=im.data,
  R0=hex(b.roof||'#a2604a'),W0=hex(b.wall||'#e2d4b6'),A=b.arch||Math.min(Hh-3,DOORH+1),g0=b.gap[0],g1=b.gap[1],mid=(g0+g1)/2,half=(g1-g0)/2,wall={};
  const put=(X,Y,col,k)=>{const o=(Y*cw+X)*4;d[o]=Math.min(255,col[0]*k);d[o+1]=Math.min(255,col[1]*k);d[o+2]=Math.min(255,col[2]*k);d[o+3]=255};
  for(let X=0;X<cw;X++){const x=X0+X/2,sx=X&1;wall[Math.floor(x)]=[B+1-Hh,B];
    for(let Y=0;Y<ch;Y++){const y=T+(Y+.5)/2,u=B+1-y;
      if(u>Hh){/* the roof: its ridge along it, the north slope in shade, the tiles running down each slope */
        const r=(y-(b.y-Hh))/b.d;let kk=r<.42?.82:1;if(Math.abs(r-.42)<.5/b.d)kk=1.12;else if(X%3===0)kk*=.92;if(r>1-.6/b.d)kk*=.66;if(X<1)kk*=1.06;put(X,Y,R0,kk*(1+(hash2(X+X0*2,Y,7)-.5)*.06));continue}
      /* the front: the archway, round at its top, dark within; plaster round it, its edge lit on the west side */
      const dx=Math.abs(x+.25-mid)/Math.max(1,half),inArch=x>=g0&&x<g1+1&&u<A-Math.max(0,(dx-.55))*2.4;
      if(inArch){put(X,Y,[34,26,24],1-Math.max(0,(A-u))*.02);continue}
      let kk=.98+(hash2(X+X0*2,Y,11)-.5)*.05;if(u>Hh-.5)kk*=1.08;else if(u>Hh-1.5)kk*=.72;else if(u<1)kk*=.78;if(X>=cw-2)kk*=.8;
      const nearArch=x>=g0-.5&&x<g1+1.5&&u<A+.6&&!inArch;if(nearArch)kk*=x<mid?1.08:.86;put(X,Y,W0,kk)}}
  g.putImageData(im,0,0);
  return{c,g,X0,X1,T,B,strips:[{x0:X0,x1:X1,front:B,top:T}],wall,alpha:1,bridge:b}}
/* sprites: every house and every covered passage of a variant, painted, marked (def.marks: a chapter's own doors and shutters, painted
   on the wall they lie on) and finished as the backdrops are */
function sprites(M,v){if(M.S[v])return M.S[v];const out=[];
  for(const h of M.H.HS)if(h)out.push(sprite(M,h,v));
  for(const b of M.def.bridges||[])out.push(bridge(M,b,v));
  for(const m of M.def.marks||[]){const s=out.find(s=>s.wall[m.x]&&m.y>=s.wall[m.x][0]-.5&&m.y<=s.wall[m.x][1]+.5);if(!s)continue;
    const g=s.g;g.save();g.globalCompositeOperation='source-atop';g.scale(2,2);g.translate(-s.X0,-s.T);m.paint(g,v,s.wall[m.x],s);g.restore()}
  for(const s of out){finish(s.c,s.g,M.def.q||12);delete s.g}
  return M.S[v]=out}
/* cover: the ground that a house or a passage hides from view, which the runner does not see from afar (see route) */
function cover(M){const def=M.def,W=def.w,H=def.h,K=M.K,{hid,HS}=M.H,cov=new Uint8Array(W*H);
  for(let x=0;x<W;x++){let a=-1,id=0;for(let y=0;y<=H;y++){const j=y<H&&K[y*W+x]===BUILT?hid[y*W+x]:0;
      if(j!==id){if(id&&HS[id]){const Hh=HS[id].hw;for(let yy=Math.max(0,Math.floor(a-Hh));yy<y;yy++)cov[yy*W+x]=1}id=j;a=y}}}
  for(const b of def.bridges||[])for(let x=b.x;x<b.x+b.w;x++)for(let y=Math.max(0,Math.floor(b.y-b.H));y<b.y+b.d;y++)cov[y*W+x]=1;
  return cov}

/* ============ THINGS PAINTED ON THE CITY: helpers a chapter uses in its paint ============ */
/* stall: a market stall from above, its awning in stripes that run one way, the front of its counter below it, and its wares on a board in
   front. down: overturned, the awning slipped and the board on its side, its wares spilled in a row. */
function stall(g,x,y,w,d,c1,c2,down){const r=rng(Math.round(x*7+y*13));
  if(down){/* the frame on its side: the awning lies flat and askew on the ground, the board beside it, the wares spilled */
    poly(g,[x,y+d*.4,x+w,y+d*.1,x+w+1,y+d*.8,x+1,y+d*1.1],'rgba(0,0,0,.25)');
    for(let i=0;i<w;i+=2){const cc=(i/2)%2?c2:c1;poly(g,[x+i,y+d*.4-i*.3/w*d,x+Math.min(w,i+2),y+d*.4-Math.min(w,i+2)*.3/w*d,x+Math.min(w,i+2)+.6,y+d*.95-Math.min(w,i+2)*.3/w*d,x+i+.6,y+d*.95-i*.3/w*d],cc)}
    R(g,x+1,y+d*1.1,w-1,1,'#6a4a2c');R(g,x+1,y+d*1.1+1,w-1,.5,'#3e2a18');
    for(let i=0;i<4;i++)R(g,x+2+i*(w-4)/3+r(),y+d*1.4+r(),1,1,['#9a6a40','#b08850','#7a5a3a'][i%3]);return}
  R(g,x+.5,y+d,w,1.5,'rgba(0,0,0,.28)');
  for(let i=0;i<w;i+=2){const cc=(i/2)%2?c2:c1;g.fillStyle=lg(g,0,y,0,y+d,[tint(cc,.12),cc,tint(cc,-.18)]);g.fillRect(hp(x+i),hp(y),hp(Math.min(2,w-i)),hp(d))}
  R(g,x,y+d-.5,w,.5,'rgba(0,0,0,.3)');R(g,x,y+d,w,1.5,'#7a5432');R(g,x,y+d+1,w,.5,'#4a3220')}
/* colonnade: a roofed walk along a street, from above: its roof of tiles that run down its slope, and where it faces the street on its
   south side, the columns under the deep edge of its roof, each a short shaft with no cross-piece */
function colonnade(g,x,y,w,d,face,c){c=c||'#ad5a36';const N=face==='N';
  g.fillStyle=lg(g,0,y,0,y+d,N?[tint(c,-.25),c]:[c,tint(c,-.12)]);g.fillRect(hp(x),hp(y),hp(w),hp(d));
  for(let i=0;i<w;i+=1.5)R(g,x+i,y,.5,d,'rgba(0,0,0,.1)');
  if(!N){R(g,x,y+d-.5,w,.5,'rgba(40,20,10,.5)');R(g,x,y+d,w,2.5,'rgba(30,20,30,.35)');for(let i=1.5;i<w-1;i+=4){R(g,x+i,y+d,1,2.5,'#e6dcc6');R(g,x+i+.5,y+d,.5,2.5,'#bfb39a')}}
  else R(g,x,y,w,.5,'rgba(255,240,210,.25)')}
/* a tree in a court, from above: a crown of leaf clumps lit from the left, never round as a ring */
function tree(g,x,y,rx,ry,c){c=c||'#4c6a38';const r=rng(Math.round(x*31+y*17));R(g,x+1,y+ry*.6,rx*1.2,ry*.5,'rgba(20,20,40,.3)');
  for(let i=0;i<14;i++){const a=r()*6.283,q=Math.sqrt(r()),px=x+Math.cos(a)*q*rx*.75,py=y+Math.sin(a)*q*ry*.75,s=1.3+r()*1.4;oval(g,px,py,s,s*.85,tint(c,-.2+(px<x?.1:-.1)+(py<y?.08:-.06)))}
  for(let i=0;i<8;i++){const px=x-rx*.4+r()*rx*.6,py=y-ry*.5+r()*ry*.6;R(g,px,py,1,1,tint(c,.22))}}

/* hill: rough ground that rises, inside a polygon: a height of its own, lit by the same sun as the city, with rock where it is steep and
   scrub where it is not. o.rise: how it climbs ([dx, dy], per room pixel); o.seed. */
function hill(g,p,o){o=o||{};let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
  x0=Math.floor(x0);y0=Math.floor(y0);x1=Math.ceil(x1);y1=Math.ceil(y1);const w=(x1-x0)*2,h=(y1-y0)*2,[c,cg]=mk(w,h),im=cg.createImageData(w,h),d=im.data,
    A=lattice((o.seed||5)*3+1,32),B=lattice((o.seed||5)*5+2,32),C2=lattice((o.seed||5)*7+3,64),rise=o.rise||[.08,0],
    ht=(x,y)=>vn(A,x*.035,y*.035)*14+vn(B,x*.09,y*.09)*5+vn(C2,x*.3,y*.3)*1.2+x*rise[0]+y*rise[1],
    G0=hex(o.ground||'#a8966a'),RK=hex('#c2b698'),SC=hex('#6e7046');
  for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++){const x=x0+X/2,y=y0+Y/2,e=ht(x,y),gx=ht(x+.5,y)-ht(x-.5,y),gy=ht(x,y+.5)-ht(x,y-.5),
      lit=clamp(.86-gx*.5+gy*.22,.55,1.2),steep=Math.hypot(gx,gy),veg=vn(B,x*.16+40,y*.16)+(hash2(X,Y,3)-.5)*.12,i=(Y*w+X)*4;
    let col=G0;if(steep>.9)col=RK;else if(veg>.7)col=SC;const k=lit*(1+(hash2(X,Y,9)-.5)*.08)*(veg>.7&&steep<=.9?.88+(veg-.7)*.6:1);
    d[i]=col[0]*k;d[i+1]=col[1]*k;d[i+2]=col[2]*k;d[i+3]=255}
  cg.putImageData(im,0,0);clipTo(g,()=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()},()=>g.drawImage(c,x0,y0,w/2,h/2))}
/* crown: a tree seen from above: leaf clumps lit from the west, its shadow thrown to the east, never a ring */
function crown(g,x,y,s,c){c=c||'#4a6038';const r=rng(Math.round(x*31+y*17));for(let i=0;i<7;i++){const a=r()*6.283,q=r()*s*.6;oval(g,x+s*.7+Math.cos(a)*q,y-s*.3+Math.sin(a)*q*.8,s*.5,s*.4,'rgba(30,26,40,.28)')}
  for(let i=0;i<12;i++){const a=r()*6.283,q=Math.sqrt(r())*s*.7,px=x+Math.cos(a)*q,py=y+Math.sin(a)*q*.85,k=s*(.3+r()*.25);oval(g,px,py,k,k*.85,tint(c,(px<x?.08:-.12)+(py<y?.06:-.04)))}
  for(let i=0;i<5;i++)R(g,x-s*.5+r()*s*.5,y-s*.5+r()*s*.5,.5,.5,tint(c,.28))}

/* ============ THE WALK GRID: cells of two room pixels, and the ways through them ============ */
/* jams: in a variant, narrow streets packed with people who cannot get through themselves (def.jams: {variant: [{x, y, w, h, face}]}).
   Nobody passes them, whoever is played included: he has to find another way. */
const jamsOf=(def,v)=>(def.jams&&def.jams[v])||[];
function grid(M,v){if(M.G[v])return M.G[v];const def=M.def,W=def.w,H=def.h,GW=Math.ceil(W/CS),GH=Math.ceil(H/CS),K=M.K;
  const ok=new Uint8Array(W*H);for(let i=0;i<W*H;i++)ok[i]=OPEN(K[i])?1:0;
  for(const b of(def.solid||[]).concat((def.block&&def.block[v])||[],jamsOf(def,v).map(j=>[j.x,j.y,j.w,j.h])))for(let y=Math.max(0,Math.floor(b[1]));y<Math.min(H,Math.ceil(b[1]+b[3]));y++)for(let x=Math.max(0,Math.floor(b[0]));x<Math.min(W,Math.ceil(b[0]+b[2]));x++)ok[y*W+x]=0;
  /* how far each pixel lies from anything that cannot be walked: a figure keeps a pixel and a half from every wall */
  const dist=new Float32Array(W*H);for(let i=0;i<W*H;i++)dist[i]=ok[i]?99:0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(!dist[i])continue;let m=dist[i];if(x>0)m=Math.min(m,dist[i-1]+1);if(y>0)m=Math.min(m,dist[i-W]+1);if(x>0&&y>0)m=Math.min(m,dist[i-W-1]+1.41);if(x<W-1&&y>0)m=Math.min(m,dist[i-W+1]+1.41);if(!x||!y||x===W-1)m=Math.min(m,1);dist[i]=m}
  for(let y=H-1;y>=0;y--)for(let x=W-1;x>=0;x--){const i=y*W+x;if(!dist[i])continue;let m=dist[i];if(x<W-1)m=Math.min(m,dist[i+1]+1);if(y<H-1)m=Math.min(m,dist[i+W]+1);if(x<W-1&&y<H-1)m=Math.min(m,dist[i+W+1]+1.41);if(x>0&&y<H-1)m=Math.min(m,dist[i+W-1]+1.41);if(y===H-1)m=Math.min(m,1);dist[i]=m}
  const cell=new Uint8Array(GW*GH),wall=new Float32Array(GW*GH);
  for(let cy=0;cy<GH;cy++)for(let cx=0;cx<GW;cx++){const x=Math.min(W-1,cx*CS+1),y=Math.min(H-1,cy*CS+1),dd=Math.min(dist[y*W+x],dist[Math.max(0,y-1)*W+Math.max(0,x-1)]);
    cell[cy*GW+cx]=dd>=1.5?1:0;wall[cy*GW+cx]=dd}
  /* parts that hang together (as a walk goes: no corner is cut), so that a click on a place no way reaches leads to the nearest place that one does */
  const comp=new Int32Array(GW*GH);let nc=0;
  for(let i=0;i<GW*GH;i++){if(!cell[i]||comp[i])continue;nc++;const st=[i];comp[i]=nc;while(st.length){const q=st.pop(),x=q%GW;for(const n of[x>0?q-1:-1,x<GW-1?q+1:-1,q-GW,q+GW])if(n>=0&&n<GW*GH&&cell[n]&&!comp[n]){comp[n]=nc;st.push(n)}}}
  return M.G[v]={GW,GH,cell,comp,wall,F:{}}}
const cOf=(g,x,y)=>clamp(Math.floor(y/CS),0,g.GH-1)*g.GW+clamp(Math.floor(x/CS),0,g.GW-1);
const cXY=(g,c)=>[(c%g.GW)*CS+CS/2,Math.floor(c/g.GW)*CS+CS/2];
/* nearest: the walkable cell nearest to x, y (in part c, if given), in rings outward */
function nearest(g,x,y,c){const cx=clamp(Math.floor(x/CS),0,g.GW-1),cy=clamp(Math.floor(y/CS),0,g.GH-1);
  for(let r=0;r<80;r++){let best=-1,bd=1e9;for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){if(Math.max(Math.abs(i),Math.abs(j))!==r)continue;const X=cx+i,Y=cy+j;if(X<0||Y<0||X>=g.GW||Y>=g.GH)continue;const q=Y*g.GW+X;
    if(g.cell[q]&&(!c||g.comp[q]===c)){const[px,py]=cXY(g,q),dd=Math.hypot(px-x,py-y);if(dd<bd){bd=dd;best=q}}}if(best>=0)return best}return -1}
/* a heap for the searches below */
function heap(){const a=[],f=[];return{get size(){return a.length},push(i,v){a.push(i);f.push(v);let k=a.length-1;while(k){const p=(k-1)>>1;if(f[p]<=f[k])break;[a[p],a[k]]=[a[k],a[p]];[f[p],f[k]]=[f[k],f[p]];k=p}},
  pop(){const top=a[0],li=a.pop(),lv=f.pop();if(a.length){a[0]=li;f[0]=lv;let k=0;for(;;){const l=2*k+1,r=l+1;let m=k;if(l<a.length&&f[l]<f[m])m=l;if(r<a.length&&f[r]<f[m])m=r;if(m===k)break;[a[m],a[k]]=[a[k],a[m]];[f[m],f[k]]=[f[k],f[m]];k=m}}return top}}}
const NB=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];
/* The costs of the searches below are kept in 64 bits: kept in 32, a cost rounded up would be found better again and again, for ever. */
/* astar: the cells of the shortest way from s to t; a step close to a wall costs a little more, so that a way keeps to the middle of a lane */
function astar(g,s,t,known){const{GW,GH,cell,wall}=g,cost=new Float64Array(GW*GH).fill(Infinity),from=new Int32Array(GW*GH).fill(-1),h=heap(),tx=t%GW,ty=(t/GW)|0;
  const est=q=>{const dx=Math.abs(q%GW-tx),dy=Math.abs(((q/GW)|0)-ty);return(dx+dy+(1.414-2)*Math.min(dx,dy))};
  cost[s]=0;h.push(s,est(s));
  while(h.size){const q=h.pop();if(q===t)break;const x=q%GW,y=(q/GW)|0;
    for(const[dx,dy,c]of NB){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=GW||Y>=GH)continue;const n=Y*GW+X;if(!cell[n]||known&&!known[n]&&n!==t)continue;if(dx&&dy&&(!cell[y*GW+X]||!cell[Y*GW+x]))continue;
      const nc=cost[q]+c*(wall[n]<3?1.5:wall[n]<4.5?1.15:1);if(nc<cost[n]){cost[n]=nc;from[n]=q;h.push(n,nc+est(n))}}}
  if(s!==t&&from[t]<0)return null;const p=[t];let q=t;while(q!==s){q=from[q];p.push(q)}return p.reverse()}
/* steps: how many cells each known cell lies from s along the known cells (a long way round to a place counts against it) */
function steps(g,s,known){const{GW,GH,cell}=g,d=new Int32Array(GW*GH).fill(1e6),st=[s];d[s]=0;
  for(let k=0;k<st.length;k++){const q=st[k],x=q%GW,y=(q/GW)|0;for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=GW||Y>=GH)continue;const n=Y*GW+X;
    if(d[n]<1e6||!cell[n]||!known[n])continue;if(dx&&dy&&(!cell[y*GW+X]||!cell[Y*GW+x]))continue;d[n]=d[q]+1;st.push(n)}}return d}
/* reach: the cells he can reach from s by the cells he knows */
function reach(g,s,known){const{GW,GH,cell}=g,r=new Uint8Array(GW*GH),st=[s];r[s]=1;
  while(st.length){const q=st.pop(),x=q%GW,y=(q/GW)|0;for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=GW||Y>=GH)continue;const n=Y*GW+X;
    if(r[n]||!cell[n]||!known[n])continue;if(dx&&dy&&(!cell[y*GW+X]||!cell[Y*GW+x]))continue;r[n]=1;st.push(n)}}return r}
/* clear: a straight line from one point to another that keeps on walkable cells (which already lie a figure's half width from every wall);
   its first two pixels are not looked at, since whoever is played may stand a hair off them after the crowd has pressed him */
function clear(g,ax,ay,bx,by){const L=Math.hypot(bx-ax,by-ay),n=Math.ceil(L/(CS*.4));
  for(let k=0;k<=n;k++){const t=k/Math.max(1,n);if(t*L<2&&L>2)continue;if(!g.cell[cOf(g,ax+(bx-ax)*t,ay+(by-ay)*t)])return false}return true}
/* field: how far every cell lies from the nearest of some places, along the lanes (Dijkstra). wide:1 makes a crowd keep to the middle of a street. */
function field(g,pts,wide){const{GW,GH,cell,wall}=g,f=new Float64Array(GW*GH).fill(Infinity),h=heap();
  for(const[x,y]of pts){const c=nearest(g,x,y);if(c>=0){f[c]=0;h.push(c,0)}}
  while(h.size){const q=h.pop(),x=q%GW,y=(q/GW)|0;for(const[dx,dy,c]of NB){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=GW||Y>=GH)continue;const n=Y*GW+X;if(!cell[n])continue;if(dx&&dy&&(!cell[y*GW+X]||!cell[Y*GW+x]))continue;
    const nc=f[q]+c*CS*(wide?1+1.6/Math.max(.8,wall[n]-1):1);if(nc<f[n]){f[n]=nc;h.push(n,nc)}}}
  return f}

/* ============ THE FIGURES OF THE MAP ============ */
/* Each part is a small pixel map, one character to a canvas pixel (half a room pixel). The letters name tones:
   h H d: hair (base, light, shadow); s S z: skin; e: an eye; c: chin, which is beard where there is one; t T u U: tunic; m M n: mantle;
   v V w: a mantle drawn over the head; b: belt; f: sandal. Rows are given from the top; a part's columns from x = 0 of a twelve-column
   figure. Legs are drawn from the ground up, the body sits on top of them, and the head on the body, so that a leg map one row taller lifts
   the whole figure: the walk's bob. A figure stands about fourteen room pixels tall, as the people of the oblique prototype did: a head
   large enough to tell which way he faces, and no face to read. */
const FOLKMAP={
  head:{
    S:["....hhhh....","...hHHHHh...","...hHhhhhd..","...zSSSssd..","...zeSSesz..","...zsSSssz..","....zccz...."],
    N:["....hhhh....","...hHHHHh...","...hHhhhhd..","...hHhhhhd..","...zhhhhhd..","...zhhhhhz..","....zhhz...."],
    E:["....hhhh....","...hhHHHh...","...hhhhhss..","...hhhhSSs..","...hhhzSes..","...hhzsSss..","....hzccs..."]},
  veil:{
    S:["....vvvv....","...vVVVVvv..","...vVsSSsw..","...vVeSesw..","...vVsSSsw..","..vVvzssvvw.","..vVvvvvvvw."],
    N:["....vvvv....","...vVVVVvv..","...vVvvvvw..","...vVvvvvw..","...vVvvvvw..","..vVvvvvvvw.","..vVvvvvvvw."],
    E:["....vvvv....","...vvVVVv...","...vvvvsSs..","...vvvvSes..","...vvvvsSs..","..vvvvvzs...","..vvvvvvw..."]},
  /* bodies: m a man in tunic and mantle, t a man in a belted tunic, v a woman, her mantle over head and shoulders. stand, and run:
     the forearms bent and the hands before the chest, within the body. Seen from the front, a mantle is closed: the man's tunic shows only
     at his shoulder, where the mantle leaves it free, and nothing runs down the middle of it, which a hand before it would cross. Side bodies have the near arm forward (f) or back (k) as he walks,
     never beyond the edge of the body; in a run the forearm is bent before the chest (run) or the elbow drawn back (run2). */
  m:{S:{stand:["...nmmttn...","..nMMmmttn..","..nMMmmmtn..","..nMmmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..sMmmmmms..","..nmmmmmmn..","...mmmmmn...","...tttttu...","...tTtttu...","...ttttuu..."],
        run:["...nmmttn...","..nMMmmttn..","..nMMmmmtn..","..nMmssmmn..","..nMmmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..nmmmmmmn..","...mmmmmn...","...tttttu...","...tTtttu...","...ttttuu..."]},
     N:{stand:["...nmmmmn...","..nMMmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..sMmmmmms..","..nmmmmmmn..","...mmmmmn...","...tttttu...","...tTtttu...","...ttttuu..."],
        run:["...nmmmmn...","..nMMmmmmn..","..nMmmmmmn..","..nMmmmmmn..","..sMmmmmms..","..nMmmmmmn..","..nMmmmmmn..","..nmmmmmmn..","...mmmmmn...","...tttttu...","...tTtttu...","...ttttuu..."]},
     E:{stand:["....tmmn....","...MMmmnn...","...MMmmnn...","...MmmMnn...","...Mmmmnn...","...Mmmmnn...","...Mmmsnn...","...mmmmnn...","....mmmn....","....tttu....","....tTtu....","....ttuu...."],
        f:["....tmmn....","...MMmmnn...","...MMmmnn...","...MmmMnn...","...Mmmmnn...","...Mmmmns...","...mmmmnn...","...mmmmnn...","....mmmn....","....tttu....","....tTtu....","....ttuu...."],
        k:["....tmmn....","...MMmmnn...","...MMmmnn...","...MmmMnn...","...Mmmmnn...","...smmmnn...","...mmmmnn...","...mmmmnn...","....mmmn....","....tttu....","....tTtu....","....ttuu...."],
        run:["....tmmn....","...MMmmnn...","...MMmmnn...","...Mmmmmss..","...MmmMnn...","...Mmmmnn...","...mmmmnn...","...mmmmnn...","....mmmn....","....tttu....","....tTtu....","....ttuu...."],
        run2:["....tmmn....","...MMmmnn...","...MMmmnn...","...sMmMnn...","...sMmmnn...","...Mmmmnn...","...mmmmnn...","...mmmmnn...","....mmmn....","....tttu....","....tTtu....","....ttuu...."]}},
  t:{S:{stand:["...tTTttt...","..tTTTtttu..",".stTTttttus.",".stTTttttus.",".sTTtttttus.",".zTTtttttuz.","..bbbbbbbb..","..tTTttttu..","..tTTttttu..","..tTtttttu..","..tTttttuu..","..ttttttuu.."],
        run:["...tTTttt...","..tTTTtttu..",".stTTttttus.",".stTTttttus.","..tTssssttu.","..tTTttttu..","..bbbbbbbb..","..tTTttttu..","..tTTttttu..","..tTtttttu..","..tTttttuu..","..ttttttuu.."]},
     N:{stand:["...tttttt...","..tTTttttu..",".stTTttttus.",".stTTttttus.",".sTTtttttus.",".zTTtttttuz.","..bbbbbbbb..","..tTTttttu..","..tTTttttu..","..tTtttttu..","..tTttttuu..","..ttttttuu.."],
        run:["...tttttt...","..tTTttttu..",".stTTttttus.",".stTTttttus.","..tTTttttu..","..tTTttttu..","..bbbbbbbb..","..tTTttttu..","..tTTttttu..","..tTtttttu..","..tTttttuu..","..ttttttuu.."]},
     E:{stand:["....tttu....","...TTtttu...","...TTtstu...","...TTtstu...","...TTtstu...","...TTtztu...","...bbbbbb...","...TTtttu...","...TTtttu...","...Tttttu...","...Ttttuu...","...tttuuu..."],
        f:["....tttu....","...TTtttu...","...TTtstu...","...TTttsu...","...TTtttz...","...TTtttu...","...bbbbbb...","...TTtttu...","...TTtttu...","...Tttttu...","...Ttttuu...","...tttuuu..."],
        k:["....tttu....","...TTtttu...","...TTtstu...","...TTsttu...","...Tztttu...","...TTtttu...","...bbbbbb...","...TTtttu...","...TTtttu...","...Tttttu...","...Ttttuu...","...tttuuu..."],
        run:["....tttu....","...TTtttu...","...TTtstu...","...TTtssss..","...TTtttu...","...TTtttu...","...bbbbbb...","...TTtttu...","...TTtttu...","...Tttttu...","...Ttttuu...","...tttuuu..."],
        run2:["....tttu....","...TTtttu...","...TTtstu...","...sTtttu...","...sTtttu...","...TTtttu...","...bbbbbb...","...TTtttu...","...TTtttu...","...Tttttu...","...Ttttuu...","...tttuuu..."]}},
  v:{S:{stand:["..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","..vVvssvvw..","..vVvvvvvw..","..vVvvvvvw..","...vvvvvw...","...TtttuU...","...Tttttu...","...Tttttu...","...Tttttu...","..Ttttttuu..","..tttttttu.."],
        run:["..vVvvvvvw..","..vVvvvvvw..","..vVvssvvw..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","...vvvvvw...","...TtttuU...","...Tttttu...","...Tttttu...","...Tttttu...","..Ttttttuu..","..tttttttu.."]},
     N:{stand:["..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","..sVvvvvvs..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","...vvvvvw...","...Tttttu...","...Tttttu...","...Tttttu...","...Tttttu...","..Ttttttuu..","..tttttttu.."],
        run:["..vVvvvvvw..","..vVvvvvvw..","..sVvvvvvs..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","..vVvvvvvw..","...vvvvvw...","...Tttttu...","...Tttttu...","...Tttttu...","...Tttttu...","..Ttttttuu..","..tttttttu.."]},
     E:{stand:["..vvVvvw....","..vVVvvw....","..vVvvsw....","..vVvvsw....","..vVvvvw....","..vVvvvw....","..vVvvvw....","...vvvw.....","...Tttuu....","...Tttuu....","...Tttuu....","...Tttuu....","...Ttttu....","...ttttu...."],
        f:["..vvVvvw....","..vVVvvw....","..vVvvvw....","..vVvvvs....","..vVvvvw....","..vVvvvw....","..vVvvvw....","...vvvw.....","...Tttuu....","...Tttuu....","...Tttuu....","...Tttuu....","...Ttttu....","...ttttu...."],
        k:["..vvVvvw....","..vVVvvw....","..vVvvvw....","..sVvvvw....","..vVvvvw....","..vVvvvw....","..vVvvvw....","...vvvw.....","...Tttuu....","...Tttuu....","...Tttuu....","...Tttuu....","...Ttttu....","...ttttu...."],
        run:["..vvVvvw....","..vVVvvw....","..vVvvvss...","..vVvvvw....","..vVvvvw....","..vVvvvw....","..vVvvvw....","...vvvw.....","...Tttuu....","...Tttuu....","...Tttuu....","...Tttuu....","...Ttttu....","...ttttu...."],
        run2:["..vvVvvw....","..vVVvvw....","..sVvvvw....","..sVvvvw....","..vVvvvw....","..vVvvvw....","..vVvvvw....","...vvvw.....","...Tttuu....","...Tttuu....","...Tttuu....","...Tttuu....","...Ttttu....","...ttttu...."]}},
  /* legs, from the hem down to the ground: k the shins under a tunic to the knee, L the feet under a robe to the ground. In the side view the
     legs open from one hip like a pair of compasses and never cross; a step begins and ends short (s1, s2). */
  legs:{
    k:{S:{stand:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....ff.ff..."],
          w1:["....zz.zz...","....zz.zz...","....zz.ff...","....zz......","....ff......"],p1:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....ff.ff..."],
          w2:["....zz.zz...","....zz.zz...","....ff.zz...",".......zz...",".......ff..."],p2:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....ff.ff..."],
          r1:["....zz.zz...","....zz.zz...","....ff.zz...",".......zz...",".......zz...",".......ff..."],f1:["....zz.zz...","....zz.zz...","....zz.zz...","....ff.zz...",".......ff..."],
          r2:["....zz.zz...","....zz.zz...","....zz.ff...","....zz......","....zz......","....ff......"],f2:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.ff...","....ff......"],
          s1:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....ff.ff..."],s2:["....zz.zz...","....zz.zz...","....zz.zz...","....zz.zz...","....ff.ff..."]},
       E:{stand:[".....zz.....",".....zz.....",".....zz.....",".....zz.....",".....fff...."],
          w1:[".....zz.....","....zzzz....","....z..z....","...zz..zz...","...f....ff.."],p1:[".....zz.....",".....zz.....",".....zz.....",".....zz.....",".....zz.....",".....fff...."],
          w2:[".....zz.....","....zzzz....","....z..z....","...zz..zz...","...f....ff.."],p2:[".....zz.....",".....zz.....",".....zz.....",".....zzz....",".....z.z....",".....f.ff..."],
          r1:[".....zz.....","....zzzz....","...zz..zz...","..zz....zz..","..z......z..",".ff......ff."],f1:[".....zz.....","....zzzz....","...zz..zz...","...z....zz..","...ff....ff."],
          r2:[".....zz.....","....zzzz....","...zz..zz...","..zz....zz..","..z......z..",".ff......ff."],f2:[".....zz.....","....zzzz....","...zz..zz...","...z....zz..","...ff....ff."],
          s1:[".....zz.....",".....zz.....","....zzzz....","....z..z....","....f..ff..."],s2:[".....zz.....",".....zz.....","....zzzz....","....z..z....","....f..ff..."]}},
    L:{S:{stand:["....ff.ff..."],w1:["....tt.ff...","....ff......"],p1:["....tt.tt...","....ff.ff..."],w2:["....ff.tt...",".......ff..."],p2:["....tt.tt...","....ff.ff..."],
          r1:["....tt.ff...","....ff......"],f1:["....tt.tt...","....ff.ff..."],r2:["....ff.tt...",".......ff..."],f2:["....tt.tt...","....ff.ff..."],s1:["....ff.ff..."],s2:["....ff.ff..."]},
       E:{stand:["....fff....."],w1:["...f...ff..."],p1:["....ttt.....","....fff....."],w2:["...f...ff..."],p2:["....ttt.....","....fff....."],
          r1:["...ff..ff..."],f1:["....ttt.....","...f...ff..."],r2:["...ff..ff..."],f2:["....ttt.....","...f...ff..."],s1:["...ff.ff...."],s2:["...ff.ff...."]}}}};
/* the back view is drawn as the front view for the legs */
for(const len of['k','L'])FOLKMAP.legs[len].N=FOLKMAP.legs[len].S;
/* how a figure of the map is dressed, from its room look */
const kindOf=o=>o.veil||o.fem?'v':o.cloak||o.himation?'m':'t';
const FW=12,FH=28;   /* a figure's box in canvas pixels; its feet stand on the lowest row, at x = 5.5 */
const SPRM=new Map();let KN=0;
/* folk: one pose of a look as a small canvas, built once: legs, body and head set down by hand, then the edge on the side away from the sun
   darkened, as the room figures are */
function folk(o,dir,fr,arms,talk){if(!o.mapKey)o.mapKey='k'+(++KN);const key=o.mapKey+'|'+dir+fr+arms+(talk?'t':'');let c=SPRM.get(key);if(c)return c;
  if(SPRM.size>900)SPRM.clear();const P=pal(o),k=kindOf(o),len=k==='v'?'L':'k',S=P.sk,T=P.tu,C=P.cl||P.tu,Ha=P.ha,V=P.hd&&o.veil?P.hd:C,Be=P.be||P.sk,
    L={h:Ha[2],H:Ha[1],d:Ha[3],s:S[2],S:S[1],z:S[3],e:'#2a1a14',c:o.beard?Be[2]:S[2],t:T[2],T:T[1],u:T[3],U:T[0],m:C[2],M:C[1],n:C[3],v:V[2],V:V[1],w:V[3],b:(P.bt||P.le)[2],f:'#3a2418',l:S[3]};
  [c]=mk(FW,FH);const g=c.getContext('2d'),D=dir==='W'?'E':dir;
  const legs=FOLKMAP.legs[len][D][fr]||FOLKMAP.legs[len][D].stand,body=FOLKMAP[k][D][arms]||FOLKMAP[k][D].stand,head=(k==='v'?FOLKMAP.veil:FOLKMAP.head)[D];
  const lt=FH-legs.length,bt=lt-body.length,ht=bt-head.length+(talk?1:0);
  const put=(m,y0)=>{for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++){const col=L[m[j][i]];if(col){g.fillStyle=col;g.fillRect(i,y0+j,1,1)}}};
  put(legs,lt);put(body,bt);put(head,ht);
  /* the side away from the sun (the right) a tone darker at the edge, so that a figure stands out from the ground without an outline */
  const im=g.getImageData(0,0,FW,FH),d=im.data;for(let y=0;y<FH;y++)for(let x=FW-1;x>=0;x--){const i=(y*FW+x)*4;if(d[i+3]){if(x===FW-1||!d[i+7]){d[i]*=.68;d[i+1]*=.68;d[i+2]*=.72}}}
  g.putImageData(im,0,0);
  if(dir==='W'){const[m,mg]=mk(FW,FH);mg.translate(FW-1,0);mg.scale(-1,1);mg.drawImage(c,0,0);c=m}
  SPRM.set(key,c);return c}
/* lit: the same pose, in the shade of a house */
const LIT=new WeakMap();
function shaded(c){let s=LIT.get(c);if(s)return s;const[m,g]=mk(FW,FH);g.drawImage(c,0,0);g.globalCompositeOperation='multiply';g.fillStyle='#8d90bc';g.fillRect(0,0,FW,FH);
  g.globalCompositeOperation='destination-in';g.drawImage(c,0,0);LIT.set(c,m);return m}
/* frameOf: the pose for a distance walked: a stride is four moments; the first and the last step are short ones */
function frameOf(run,gone,left,cycle){if(gone==null)return'stand';const ph=Math.floor((gone/cycle)*4)%4;
  if(!run&&(gone<cycle*.25||left!=null&&left<cycle*.25))return ph%2?'s2':'s1';
  return run?['r1','f1','r2','f2'][ph]:['w1','p1','w2','p2'][ph]}
/* armsOf: the arms for a pose: in a run the forearms are bent, in a walk seen from the side the near arm swings forward or back */
const armsOf=(run,fr,D)=>run&&fr!=='stand'?(D==='E'||D==='W'?(fr==='r1'||fr==='f1'?'run':'run2'):'run'):D==='E'||D==='W'?(fr==='w1'?'f':fr==='w2'?'k':'stand'):'stand';
/* a shadow on the ground under a figure: a low lozenge of rows, never a thin ellipse */
function foot(g,x,y){g.fillStyle='rgba(20,16,30,.28)';g.fillRect(hp(x-2.5),hp(y-.5),4,.5);g.fillRect(hp(x-3.5),hp(y),6,.5);g.fillRect(hp(x-2.5),hp(y+.5),4,.5)}

/* ============ THE KEYS: the arrow keys and W A S D steer on the map that is shown (see steer) ============ */
const KEYS={arrowleft:'left',a:'left',arrowright:'right',d:'right',arrowup:'up',w:'up',arrowdown:'down',s:'down'};
const plans=()=>Object.values(ROOMS).map(r=>r.plan).filter(Boolean);
addEventListener('keydown',e=>{if(e.target&&e.target.tagName==='INPUT'||e.ctrlKey||e.metaKey||e.altKey)return;const k=KEYS[e.key.toLowerCase()],pl=planOf(G.room);
  if(!k||!pl||G.scene)return;e.preventDefault();pl.keys.add(k)});
addEventListener('keyup',e=>{const k=KEYS[e.key.toLowerCase()];if(k)for(const p of plans())p.keys.delete(k)});
addEventListener('blur',()=>{for(const p of plans())p.keys.clear()});

/* ============ THE MAP ============ */
function make(id,def){
  const M={id,def,G:{},S:{},SEEN:{},crowd:[],dust:[],hits:[],t:0,warm:null,pressT:-99,pushT:0,lookT:0,keys:new Set()};
  M.K=ground(def);M.H=houses(def,M.K);M.F=fronts(M);M.doors=M.F.doors;M.cov=cover(M);
  /* the people of each jam, packed shoulder to shoulder: most face the way they want to go, a few look back or about them */
  M.J={};for(const v in def.jams||{}){const r=rng((def.seed||1)*7+v.length),out=M.J[v]=[];
    for(const j of def.jams[v])for(let y=j.y+3;y<=j.y+j.h-.5;y+=3)for(let x=j.x+2+(y%6<3?0:2);x<=j.x+j.w-2;x+=4.2){const q=r(),back={E:'W',W:'E',N:'S',S:'N'}[j.face||'E'];
      out.push({x:x+(r()-.5)*1.4,y:y+(r()-.5)*1,look:(def.folk||FOLK)[(r()*(def.folk||FOLK).length)|0],D:q<.72?j.face||'E':q<.86?back:q<.93?'S':'N',ph:r()*9,jam:j})}}
  M.nzA=lattice((def.seed||1)*13+1,32);M.nzB=lattice((def.seed||1)*17+5,64);
  const vNow=()=>def.variant?def.variant():'';
  const g=()=>grid(M,vNow());
  M.walkable=(x,y)=>{const G=g();return!!G.cell[cOf(G,x,y)]};
  /* known: the cells whoever is played knows in this variant: the lanes he has seen on the screen where no house hides them, and those round
     every corner he has come by (see look) */
  const known=Q=>{const v=vNow();return M.SEEN[v]||(M.SEEN[v]=new Uint8Array(Q.GW*Q.GH))};
  /* route: the points to pass on the way to x, y; the way ends where x, y is, or on the walkable place nearest to it that can be reached.
     Whoever is played, when the player clicks, goes only by the lanes he knows: where none of them leads to x, y, he goes as near to it as
     they take him, and the way is partial (the engine then does not act on what was clicked). A script, or all, takes every lane. */
  M.route=(a,x,y,all)=>{const Q=g(),mine=!all&&a===PC()&&!G.busy;if(mine)M.want=null;let s=cOf(Q,a.x,a.y);if(!Q.cell[s])s=nearest(Q,a.x,a.y);if(s<0)return null;const cp=Q.comp[s];
    let t=cOf(Q,x,y),exact=Q.cell[t]&&Q.comp[t]===cp;if(!exact){t=nearest(Q,x,y,cp);if(t<0)return null}
    let kn=null,partial=false;
    if(!all&&!M.seeAll&&a===PC()&&!G.busy){kn=known(Q);kn[s]=1;const r=reach(Q,s,kn);
      if(!r[t]){const far=steps(Q,s,kn);let best=-1,bd=1e9;for(let i=0;i<r.length;i++)if(r[i]){const[px,py]=cXY(Q,i),dd=Math.hypot(px-x,py-y)+far[i]*CS*.4;if(dd<bd){bd=dd;best=i}}
        if(best<0)return null;t=best;exact=false;partial=true}}
    const end=exact?[x,y]:cXY(Q,t);if(mine)M.want={x,y,short:!exact||partial};
    if(s===t){const r=Math.hypot(end[0]-a.x,end[1]-a.y)<.5?[]:[end];r.partial=partial;return r}
    const p=astar(Q,s,t,kn);if(!p)return null;const pts=p.map(c=>cXY(Q,c));pts[pts.length-1]=end;
    /* string-pulling: from where he is, go straight to the farthest point that a straight line reaches */
    const out=[];let cx=a.x,cy=a.y,i=0;while(i<pts.length-1){let j=Math.min(pts.length-1,i+90);while(j>i+1&&!clear(Q,cx,cy,pts[j][0],pts[j][1]))j--;out.push(pts[j]);[cx,cy]=pts[j];i=j}
    if(!out.length)out.push(end);out.partial=partial;return out};
  M.dist=(name,x,y)=>{const G=g(),f=G.F['t:'+name]||(G.F['t:'+name]=field(G,[def.targets[name]],0)),c=cOf(G,x,y);return G.cell[c]?f[c]:f[nearest(G,x,y)]};
  M.near=(x,y,r)=>{let n=0;for(const a of M.crowd)if(Math.abs(a.x-x)<r&&Math.abs(a.y-y)<r&&Math.hypot(a.x-x,a.y-y)<r)n++;return n};
  M.reset=()=>{M.crowd.length=0;M.dust.length=0;M.warm=null;M.SEEN={}};
  /* how fast whoever is played goes on the map, and how far two steps carry him */
  M.runs=a=>(def.pace?def.pace(a):'walk')==='run';
  M.pace=a=>PACE[M.runs(a)?'run':'walk'];
  M.stride=(a,v)=>STRIDE[M.runs(a)?'run':'walk'];
  M.fig=[3.5,14];
  /* face: after walking up to a thing, he turns to it, also up or down the map */
  M.face=(a,x,y)=>{const dx=x-a.x,dy=y-a.y;a.pface=Math.abs(dy)>Math.abs(dx)*.9&&Math.abs(dy)>3?(dy<0?'N':'S'):null;a.pfaceAt=[a.x,a.y]};

  /* --- the crowd --- */
  const crowdDef=()=>(def.crowd||{})[vNow()]||null;
  const sinkField=(G,name,pts)=>G.F['s:'+name]||(G.F['s:'+name]=field(G,pts,1));
  let src=[];
  /* doorsOf: the doors a source sends people out of: within r of its place, of houses whose shutters are not bolted, onto a lane that
     reaches where they make for */
  const doorsOf=(G,s,v)=>{const k='d:'+v;if(s[k])return s[k];const cue=def.cue||(()=>'open'),f=sinkField(G,s.to,crowdDef().sinks[s.to]);
    return s[k]=M.doors.filter(d=>{if(Math.hypot(d.x+d.w/2-s.doors[0],d.y-s.doors[1])>s.r||cue(d.house,v)==='shut')return false;const c=cOf(G,d.x+d.w/2,d.y+2.5);return G.cell[c]&&isFinite(f[c])})};
  function spawn(G,cd,dt){if(M.crowd.length>=(cd.max||160))return;const v=vNow();
    cd.sources.forEach((s,k)=>{const per=(s.on||10)+(s.off||0),ph=((M.t+(s.ph||0))%per+per)%per;if(ph>(s.on||10))return;
      src[k]=(src[k]||0)+s.rate*dt;while(src[k]>=1){src[k]--;let x,y,door=null;
        /* out of a door: he steps out at the foot of the wall, and the door stands open behind him for a moment */
        if(s.doors){const L=doorsOf(G,s,v);if(!L.length)continue;door=L[(Math.random()*L.length)|0];x=door.x+door.w/2;y=door.y+2.5}
        /* or in along a street from beyond the map, or through a gate */
        else{const r=s.r||3;x=s.x+(Math.random()-.5)*2*r;y=s.y+(Math.random()-.5)*2*r}
        if(!G.cell[cOf(G,x,y)]||M.crowd.some(a=>Math.abs(a.x-x)<4&&Math.abs(a.y-y)<4))continue;
        const looks=def.folk||FOLK;M.crowd.push({x,y,dx:0,dy:door?1:0,lo:Math.random()*2-1,gone:Math.random()*40,look:looks[(Math.random()*looks.length)|0],to:s.to,stuck:0,side:Math.random()<.5?-1:1,t0:M.t,
          from:door?'door':'edge',door})}})}
  function step(dt){const cd=crowdDef();if(!cd){M.crowd.length=0;return}const G=g(),pc=PC(),pcIn=pc.room===id,v=PACE[cd.pace||'run'];
    spawn(G,cd,dt);
    const hash=new Map(),key=(x,y)=>(Math.floor(x/6)<<12)^Math.floor(y/6);
    for(const a of M.crowd){const k=key(a.x,a.y);let l=hash.get(k);if(!l)hash.set(k,l=[]);l.push(a)}
    const around=(x,y)=>{const out=[];for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const l=hash.get(key(x+i*6,y+j*6));if(l)out.push(...l)}return out};
    for(const a of M.crowd){const f=sinkField(G,a.to,cd.sinks[a.to]),c=cOf(G,a.x,a.y),here=G.cell[c]?f[c]:Infinity;
      /* the way on: towards the neighbouring cell two steps off that lies nearest to where they make for */
      let bx=0,by=0,bf=here;const cx=c%G.GW,cy=(c/G.GW)|0;
      for(const[dx,dy]of NB){const X=cx+dx*2,Y=cy+dy*2;if(X<0||Y<0||X>=G.GW||Y>=G.GH)continue;const n=Y*G.GW+X;if(G.cell[n]&&f[n]<bf){bf=f[n];bx=dx;by=dy}}
      if(here<5||!isFinite(here)&&a.stuck>1){a.gone=-1;continue}
      let L=Math.hypot(bx,by);if(L){bx/=L;by/=L}
      a.dx=a.dx*.75+bx*.25;a.dy=a.dy*.75+by*.25;L=Math.hypot(a.dx,a.dy)||1;const ux=a.dx/L,uy=a.dy/L;
      /* who is ahead: one going the same way is followed; one in the way is passed on the side that is free, a step aside */
      let k=1,side=0,sx=0,sy=0;const others=around(a.x,a.y);if(pcIn)others.push(pc);
      for(const o of others){if(o===a)continue;const rx=o.x-a.x,ry=o.y-a.y,d=Math.hypot(rx,ry);if(d<.01||d>6)continue;const ahead=rx*ux+ry*uy,lat=-rx*uy+ry*ux;
        if(ahead>0&&d<5){const same=o!==pc&&o.dx*ux+o.dy*uy>.5*Math.hypot(o.dx,o.dy);if(same){k=Math.min(k,clamp((d-2.6)/2.4,0,1));side+=lat>0?-.6:.6}else{side+=lat>0?-1:1;k=Math.min(k,o===pc?.35:.55)}}
        if(d<3.2){sx-=rx/d*(3.2-d);sy-=ry/d*(3.2-d)}}
      /* close to where they make for, the ways in are narrow and the crowd stands packed before them: it shuffles on */
      /* and each leans a little to one side or the other, which changes as he goes, so that a stream fills its street and is not a file */
      a.lo=clamp(a.lo+(Math.random()-.5)*dt*1.8,-1,1);
      const jam=cd.jam?clamp(here/cd.jam,.18,1):1,sd=side?Math.sign(side):0;let vx=(ux*k-uy*(sd*.7+a.lo*.3))*v*jam+sx*5,vy=(uy*k+ux*(sd*.7+a.lo*.3))*v*jam+sy*5;
      const nx=a.x+vx*dt,ny=a.y+vy*dt;let mx=a.x,my=a.y;
      if(G.cell[cOf(G,nx,ny)]){mx=nx;my=ny}else if(G.cell[cOf(G,nx,a.y)])mx=nx;else if(G.cell[cOf(G,a.x,ny)])my=ny;
      const moved=Math.hypot(mx-a.x,my-a.y);a.stuck=moved<v*jam*dt*.15?a.stuck+dt:0;if(a.stuck>4)a.gone=-1;
      if(moved>.001){a.mx=(mx-a.x)/moved;a.my=(my-a.y)/moved;a.gone+=moved;a.still=0}else a.still=(a.still||0)+dt;a.x=mx;a.y=my;
      if(M.dustOn&&moved>.01&&Math.random()<dt*.9)M.dust.push({x:a.x+(Math.random()-.5)*3,y:a.y+.5,t:0})}
    M.crowd=M.crowd.filter(a=>a.gone>=0);
    for(const p of M.dust){p.t+=dt;p.y-=dt*1.5}M.dust=M.dust.filter(p=>p.t<1.4)}
  /* pressed: the crowd presses whoever is played back the way it goes. Everyone of it who comes up against him is counted once: three within
     a second and a half, coming against him as he walks, or across his way, or into him as he stands in the stream, and he staggers back a step
     or two, the way he was going is given up, and the chapter may have him say so. In a gap between two waves, and among the few who come
     down a back lane, nobody presses him. */
  function press(dt){const pc=PC(),cd=crowdDef();if(!cd||pc.room!==id)return;
    if(M.pushT>0){M.pushT-=dt;if(M.pushT<=0)pc.pushed=0;return}
    const w=pc.walk,tx=w?w.x-pc.x:0,ty=w?w.y-pc.y:0,L=Math.hypot(tx,ty),mx=L>.3?tx/L:0,my=L>.3?ty/L:0;let ax=0,ay=0,an=0;
    for(const a of M.crowd){const rx=a.x-pc.x,ry=a.y-pc.y;if(Math.abs(rx)>8||Math.abs(ry)>8){a.hit=0;continue}const d=Math.hypot(rx,ry);if(d>7){a.hit=0;continue}
      const al=Math.hypot(a.dx,a.dy)||1,ux=a.dx/al,uy=a.dy/al;if(a.still<.6){ax+=ux;ay+=uy;an++}
      if(d<4.5&&!a.hit&&a.still<.6){const dot=ux*mx+uy*my;if(L<=.3||dot<.35){a.hit=1;M.hits.push(M.t)}}}
    M.hits=M.hits.filter(t=>M.t-t<1.5);if(M.hits.length<3||!an)return;M.hits.length=0;
    const al=Math.hypot(ax,ay)||1,Q=g();let px=pc.x+ax/al*7,py=pc.y+ay/al*7;if(!Q.cell[cOf(Q,px,py)]){const c=nearest(Q,px,py,Q.comp[cOf(Q,pc.x,pc.y)]);if(c<0)return;[px,py]=cXY(Q,c)}
    if(w){w.res(false)}pc.walk={x:px,y:py,path:[],rest:0,res:()=>{}};pc.pushed=1;M.pushT=.5;
    if(def.press&&M.t-M.pressT>7){M.pressT=M.t;def.press()}}
  /* keys: the arrow keys or W A S D steer whoever is played on the map, a few steps at a time, sliding along a wall */
  /* stopped: whoever is played has stopped before something that blocks his way (def.obstacles of the variant, and its jams), because a
     click could not take him where it was meant to, or because he steers into it: he says what it is (its say), once each time he comes
     up to it. A click past it that a way round reaches needs no word: the way is not blocked. */
  const obstaclesOf=v=>((def.obstacles&&def.obstacles[v])||[]).concat(jamsOf(def,v)).filter(o=>o.say);
  function stopped(){const pc=PC();if(pc.room!==id)return;const was=M.wasWalking;M.wasWalking=!!pc.walk;if(G.busy||G.scene)return;
    const short=was&&!pc.walk&&M.want&&M.want.short,steer=M.keys.size&&!pc.walk&&M.steerFail;
    const near=obstaclesOf(vNow()).find(o=>pc.x>=o.x-9&&pc.x<=o.x+o.w+9&&pc.y>=o.y-9&&pc.y<=o.y+o.h+9);
    if(M.said&&(!near||near!==M.said)&&Math.hypot(pc.x-M.saidAt[0],pc.y-M.saidAt[1])>24)M.said=null;
    if(!near||!(short||steer)||M.said===near)return;M.want=null;M.said=near;M.saidAt=[pc.x,pc.y];cut(()=>say(pc,near.say))}
  function steer(){const pc=PC();if(pc.room!==id||!M.keys.size||G.busy||G.scene||M.pushT>0)return;
    const k=M.keys;let x=(k.has('right')?1:0)-(k.has('left')?1:0),y=(k.has('down')?1:0)-(k.has('up')?1:0);if(!x&&!y)return;const L=Math.hypot(x,y);x/=L;y/=L;
    const Q=g(),ok=(dx,dy)=>clear(Q,pc.x,pc.y,pc.x+dx*6,pc.y+dy*6);let dx=x,dy=y;
    M.steerFail=false;if(!ok(dx,dy)){if(x&&ok(Math.sign(x),0)){dx=Math.sign(x);dy=0}else if(y&&ok(0,Math.sign(y))){dx=0;dy=Math.sign(y)}else{M.steerFail=true;return}}
    const w=pc.walk;if(w&&!w.key)w.res(false);pc.walk={x:pc.x+dx*6,y:pc.y+dy*6,path:[],rest:0,key:1,res:w&&w.key?w.res:()=>{}};G.hover=null}
  /* zones: places the chapter wants to know about when whoever is played walks into them (def.zones: [{x, y, w, h, enter()}]) */
  function zones(){const pc=PC();for(const z of def.zones||[]){const inz=pc.room===id&&pc.x>=z.x&&pc.x<z.x+z.w&&pc.y>=z.y&&pc.y<z.y+z.h;
    if(inz&&!z.inside&&z.enter)z.enter(pc);z.inside=inz}}
  /* look: what whoever is played comes to know: the lanes within eighteen cells of him along the lanes, round every corner, and on the
     screen the open ground that no house hides */
  function look(dt){const pc=PC();if(pc.room!==id||G.room!==id)return;M.lookT-=dt;if(M.lookT>0)return;M.lookT=.2;
    const Q=g(),S=known(Q),{GW,GH,cell}=Q,s0=cOf(Q,pc.x,pc.y),dist=new Map([[s0,0]]),st=[s0];S[s0]=1;
    for(let k=0;k<st.length;k++){const q=st[k],dq=dist.get(q);if(dq>=18)continue;const x=q%GW,y=(q/GW)|0;
      for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=GW||Y>=GH)continue;const n=Y*GW+X;if(!cell[n]||dist.has(n))continue;dist.set(n,dq+1);S[n]=1;st.push(n)}}
    const z=G.zoom||1,x0=Math.max(0,Math.floor(G.cam/CS)),x1=Math.min(GW-1,Math.ceil((G.cam+VW/z)/CS)),y0=Math.max(0,Math.floor(G.camY/CS)),y1=Math.min(GH-1,Math.ceil((G.camY+VH/z)/CS));
    for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const i=y*GW+x;if(cell[i]&&!S[i]&&!M.cov[Math.min(def.h-1,y*CS+1)*def.w+Math.min(def.w-1,x*CS+1)])S[i]=1}}
  /* fades: a house fades while whoever is played walks behind it, and comes back when he is out from behind it */
  function fades(dt){const pc=PC(),S=M.S[vNow()];if(!S)return;const k=Math.min(1,dt*10),inn=pc.room===id&&G.room===id;M.over=[];
    for(const s of S){let to=1,fr=-1;if(inn&&pc.x+3>s.X0&&pc.x-3<s.X1+1&&pc.y>s.T&&pc.y<s.B+1)for(const st of s.strips)if(pc.y<st.front+.5&&pc.y>st.top&&pc.x+3>st.x0&&pc.x-3<st.x1+1){to=FADE;fr=Math.max(fr,st.front)}
      s.alpha+=(to-s.alpha)*k;if(Math.abs(to-s.alpha)<.01)s.alpha=to;if(s.alpha<1&&fr>=0)M.over.push([fr,s])}}
  M.tick=(dt,ts)=>{const v=vNow();if(M.warm!==v){M.reset();M.warm=v;sprites(M,v);M.dustOn=!!(crowdDef()&&crowdDef().dust);if(crowdDef()){for(let i=0;i<300;i++){M.t+=.1;step(.1)}}}
    M.t+=dt;step(dt);press(dt);steer();stopped();zones();look(dt);fades(dt)};

  /* --- drawing --- */
  const facingOf=o=>{if(o.walk&&!o.pushed&&o.mvx!=null){const x=o.mvx,y=o.mvy;return Math.abs(y)>Math.abs(x)*1.15?(y<0?'N':'S'):x<0?'W':'E'}
    if(o.pushed&&o.mvx!=null){const x=-o.mvx,y=-o.mvy;return Math.abs(y)>Math.abs(x)*1.15?(y<0?'N':'S'):x<0?'W':'E'}
    if(o.pface&&o.pfaceAt&&Math.abs(o.pfaceAt[0]-o.x)<1&&Math.abs(o.pfaceAt[1]-o.y)<1)return o.pface;return facing(o)<0?'W':'E'};
  function drawFolk(gx,o,x,y,D,fr,run,talk,bare){const c=folk(o,D,fr,armsOf(run,fr,D),talk),i=Math.floor(clamp(y,0,def.h-1))*def.w+Math.floor(clamp(x,0,def.w-1)),dark=M.sun&&M.sun[i];
    if(!bare)foot(gx,x,y);gx.drawImage(dark?shaded(c):c,hp(x)-3,hp(y)-FH/2+.5,FW/2,FH/2)}
  M.drawActor=(gx,o,ts)=>{const run=M.runs(o)&&!o.pushed,D=facingOf(o),w=o.walk,gone=o.gait?o.gait.gone:null,left=w?Math.hypot(w.x-o.x,w.y-o.y)+(w.rest||0):null,
      fr=w&&!o.pushed?frameOf(run,gone,w.key?null:left,STRIDE[run?'run':'walk']):o.pushed?'p1':'stand',x=o.x,y=o.y,talk=o.talk&&Math.floor(ts/150)%2;
    /* among the houses by the row he stands on, as the crowd is: drawn at once, every house strip would lie over him, and a wall just
       north of him would hide his head and body */
    depth(y,()=>drawFolk(gx,o.look,x,y,D,fr,run,talk));
    /* behind a house that has faded, whoever is played is drawn again over it, as the house fades: at a third of its colour a pale
       roof still lies over him and washes out his mantle, and he would be lost but for his head and his feet */
    if(o===PC()&&M.over&&M.over.length){const[fr0,s]=M.over.reduce((a,b)=>b[0]>a[0]?b:a),k=clamp((1-s.alpha)/(1-FADE),0,1);
      depth(fr0+.6,()=>{gx.globalAlpha=k;drawFolk(gx,o.look,x,y,D,fr,run,talk,1);gx.globalAlpha=1})}};
  M.draw=(gx,ts)=>{const z=G.zoom||1,cam=G.cam,cy=G.camY,vw=VW/z,vh=VH/z,cd=crowdDef(),run=cd&&(cd.pace||'run')==='run',v=vNow();
    for(const p of M.dust){const a=.32*(1-p.t/1.4);gx.fillStyle=`rgba(196,170,128,${a})`;gx.fillRect(hp(p.x),hp(p.y-1-p.t*2),1,1)}
    /* the way whoever is played walks after a click: a row of dots on the ground, and a small diamond where it ends, never a cross */
    const pc=PC(),w=pc.room===id&&pc.walk;
    if(w&&!w.key&&!pc.pushed&&!G.busy){const pts=[[pc.x,pc.y],[w.x,w.y],...(w.path||[])];let carry=2.5;
      for(let i=1;i<pts.length;i++){const[ax,ay]=pts[i-1],[bx,by]=pts[i],L=Math.hypot(bx-ax,by-ay);let t=carry;
        for(;t<L;t+=5){const x=ax+(bx-ax)*t/L,y=ay+(by-ay)*t/L;R(gx,x-.5,y,1.5,1,'rgba(22,14,8,.5)');R(gx,x-.5,y-.5,1,1,'#f0c858')}carry=t-L}
      const[ex,ey]=pts[pts.length-1],rr=Math.floor(ts/220)%2?4:3;
      for(let dx=-rr;dx<=rr;dx++){const dy=rr-Math.abs(dx);for(const sy of dy?[-1,1]:[1]){R(gx,ex+dx*.5,ey+sy*Math.round(dy*.7)*.5+.5,.5,.5,'rgba(22,14,8,.5)');R(gx,ex+dx*.5,ey+sy*Math.round(dy*.7)*.5,.5,.5,'#fff0a8')}}}
    /* the houses, strip by strip, each among the people by the row its front stands on; faded while he is behind one */
    for(const s of sprites(M,v)){if(s.X1<cam-2||s.X0>cam+vw+2||s.B<cy-2||s.T>cy+vh+16)continue;
      for(const st of s.strips)depth(st.front+.5,()=>{const a=s.alpha;if(a<.999)gx.globalAlpha=a;
        gx.drawImage(s.c,(st.x0-s.X0)*2,0,(st.x1-st.x0+1)*2,(st.front+1-s.T)*2,st.x0,s.T,st.x1-st.x0+1,st.front+1-s.T);if(a<.999)gx.globalAlpha=1})}
    /* the people of the jams: they stand, step from foot to foot now and then, and turn their heads */
    for(const a of M.J[v]||[]){if(a.x<cam-8||a.x>cam+vw+8||a.y<cy-4||a.y>cy+vh+16)continue;const k=Math.floor(M.t*.7+a.ph),turn=k%7===3,shift=(k%5===1);
      depth(a.y,()=>drawFolk(gx,a.look,a.x,a.y,turn?{E:'S',W:'S',N:'E',S:'W'}[a.D]:a.D,shift?'p1':'stand',false,0))}
    /* a door that someone has just stepped out of stands open */
    for(const a of M.crowd)if(a.door&&M.t-a.t0<.9){const d=a.door;depth(d.y+.6,()=>R(gx,d.x,d.y+1-d.h,d.w,d.h,'#241a14'))}
    for(const a of M.crowd){if(a.x<cam-8||a.x>cam+vw+8||a.y<cy-4||a.y>cy+vh+14)continue;
      const o=a.look;
      const L=Math.hypot(a.mx||0,a.my||0)>.5?[a.mx,a.my]:[a.dx,a.dy],D=Math.abs(L[1])>Math.abs(L[0])*1.15?(L[1]<0?'N':'S'):L[0]<0?'W':'E',fr=a.still>.25?'stand':frameOf(run,a.gone+50,null,STRIDE[run?'run':'walk']);
      depth(a.y,()=>drawFolk(gx,o,a.x,a.y,D,fr,run,0))}
    if(def.draw)def.draw(gx,ts,M)};
  M.front=(gx,ts)=>{if(def.front)def.front(gx,ts,M)};

  /* --- the room --- */
  ART[id]={w:def.w,h:def.h,q:def.q||12,variant:def.variant,
    paint:(gx,v)=>{paintGround(M,gx,v);if(def.paint)def.paint(gx,v,M)},
    draw:(gx,ts)=>M.draw(gx,ts),front:(gx,ts)=>M.front(gx,ts),props:def.props};
  ROOMS[id]=Object.assign({walk:[0,def.w,0,def.h],hs:[],space:.55,mood:'calm'},def.room||{},{plan:M});
  return M}

/* the people of a crowd, in the dyes and the undyed wool of the period: men in tunic and mantle, men in a belted tunic, women with the
   mantle over the head */
const FOLK=[
  {skin:'#b98258',tunic:'#cdbb96',cloak:'#8a3a2a',hair:'#2a1a12',beard:'#2a1a12'},
  {skin:'#a8744c',tunic:'#b9a27c',cloak:'#5a5a72',hair:'#3a2a1c',beard:'#3a2a1c'},
  {skin:'#c08a5c',tunic:'#d8ccb0',cloak:'#6e5a3a',hair:'#1e140e'},
  {skin:'#b07a50',tunic:'#9a6a44',hair:'#2a1a12',belt:'#3a2414'},
  {skin:'#c49064',tunic:'#c8b48c',hair:'#4a3020',belt:'#5a3a20'},
  {skin:'#9e6c46',tunic:'#7a5a40',hair:'#1a120c',belt:'#3a2414'},
  {skin:'#c4926a',tunic:'#b8a888',veil:'#7a3e34',cloak:'#7a3e34',hair:'#2a1a12'},
  {skin:'#b8865e',tunic:'#a89070',veil:'#4e5a6e',cloak:'#4e5a6e',hair:'#2a1a12'},
  {skin:'#c08e66',tunic:'#cfc0a0',veil:'#b8a27a',cloak:'#b8a27a',hair:'#2a1a12'},
  {skin:'#ae7a52',tunic:'#cbb894',cloak:'#3e4e3a',hair:'#5a5048',beard:'#6a625a',grey:'#8a827a'},
  {skin:'#b48058',tunic:'#a4503a',hair:'#2a1a12',belt:'#3a2414'},
  {skin:'#bc8860',tunic:'#ddd2bc',cloak:'#a06a3a',hair:'#3a2a1c',beard:'#3a2a1c'}];

return{make,stall,colonnade,tree,hill,crown,FOLK,FOLKMAP,folk,FADE,sprites,kinds:{BUILT,EARTH,PAVED,SQUARE,KEEP,COURT},
  /* for the playtest: the poses of a look as a sheet, and the lanes of a map that cross */
  sheet(o,z){const dirs=['S','N','E','W'],frs=['stand','s1','w1','p1','w2','p2','r1','f1','r2','f2'],[c,g]=mk(frs.length*(FW+2)*z,dirs.length*(FH+2)*z);g.imageSmoothingEnabled=false;
    g.fillStyle='#a37b54';g.fillRect(0,0,c.width,c.height);
    dirs.forEach((D,j)=>frs.forEach((f,i)=>{const run=f[0]==='r'||f[0]==='f',s=folk(o,D,f,armsOf(run,f,D),0);
      g.drawImage(s,(i*(FW+2)+1)*z,(j*(FH+2)+1)*z,FW*z,FH*z)}));return c},
  crossings(def){const L=def.lanes.map(l=>l.pts),out=[],seg=(p,i)=>[p[i-2],p[i-1],p[i],p[i+1]];
    const X=(a,b)=>{const[x1,y1,x2,y2]=a,[x3,y3,x4,y4]=b,d=(x2-x1)*(y4-y3)-(y2-y1)*(x4-x3);if(Math.abs(d)<1e-9)return null;const t=((x3-x1)*(y4-y3)-(y3-y1)*(x4-x3))/d,u=((x3-x1)*(y2-y1)-(y3-y1)*(x2-x1))/d;return t>.02&&t<.98&&u>.02&&u<.98?[x1+t*(x2-x1),y1+t*(y2-y1)]:null};
    for(let a=0;a<L.length;a++)for(let b=a+1;b<L.length;b++)for(let i=2;i<L[a].length;i+=2)for(let j=2;j<L[b].length;j+=2){const p=X(seg(L[a],i),seg(L[b],j));if(p)out.push([a,b,p.map(Math.round)])}
    return out},
  /* fourWays: places where four ways meet: four ends or bends at one point, or two lanes that come to a third from opposite sides at the
     same place along it. Each is a plus sign seen from above (CONTRIBUTING section 3). */
  fourWays(def){const Ls=def.lanes,pts=[],out=[];
    Ls.forEach((l,k)=>{const p=l.pts,n=p.length/2;for(let i=0;i<n;i++)pts.push({x:p[2*i],y:p[2*i+1],k,deg:i===0||i===n-1?1:2})});
    for(const a of pts){let deg=0;const who=new Set();for(const b of pts)if(Math.hypot(a.x-b.x,a.y-b.y)<3){deg+=b.deg;who.add(b.k)}if(deg>=4)out.push(['point',[...who],[a.x,a.y]])}
    const touch=[];Ls.forEach((l,k)=>{const p=l.pts;for(const e of[[p[0],p[1],p[2],p[3]],[p[p.length-2],p[p.length-1],p[p.length-4],p[p.length-3]]])
      Ls.forEach((m,j)=>{if(j===k)return;const q=m.pts;let along=0;for(let i=2;i<q.length;i+=2){const ax=q[i-2],ay=q[i-1],bx=q[i],by=q[i+1],dx=bx-ax,dy=by-ay,len=Math.hypot(dx,dy),
          t=((e[0]-ax)*dx+(e[1]-ay)*dy)/(len*len),d=Math.abs((e[0]-ax)*dy-(e[1]-ay)*dx)/len;
          if(t>.02&&t<.98&&d<m.w/2+2&&Math.hypot(e[0]-q[0],e[1]-q[1])>3&&Math.hypot(e[0]-q[q.length-2],e[1]-q[q.length-1])>3){const side=Math.sign((e[2]-ax)*dy-(e[3]-ay)*dx);touch.push({k,j,pos:along+t*len,side,w:l.w,at:[e[0],e[1]]})}along+=len}})});
    for(let i=0;i<touch.length;i++)for(let j=i+1;j<touch.length;j++){const a=touch[i],b=touch[j];if(a.j===b.j&&a.k!==b.k&&a.side!==b.side&&Math.abs(a.pos-b.pos)<(a.w+b.w)/2+6)out.push(['across',[a.k,b.k,a.j],a.at])}
    return out},
  /* corners: places where four roofs meet at one corner, which from above is a plus sign of seams */
  corners(M){const{hid}=M.H,W=M.def.w,H=M.def.h,K=M.K,out=[];for(let y=0;y<H-1;y++)for(let x=0;x<W-1;x++){const i=y*W+x,a=hid[i],b=hid[i+1],c=hid[i+W],d=hid[i+W+1];
    if(a&&b&&c&&d&&K[i]===BUILT&&K[i+1]===BUILT&&K[i+W]===BUILT&&K[i+W+1]===BUILT&&new Set([a,b,c,d]).size===4)out.push([x+1,y+1])}return out}}})();
