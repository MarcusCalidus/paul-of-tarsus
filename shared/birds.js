/* Paul of Tarsus: the birds of the open air, shared by the rooms of every chapter.
   Loaded on demand when a chapter lists 'birds' in CHAP[n].needs (see need() in index.html), and kept for offline play by shared/pwa.js.

   A room asks for birds with ROOMS[id].birds: an object, or a function that returns one (or nothing) for the state of the story, so that
   no bird flies at night, in rain or in a storm. The engine calls draw() every frame, after the backdrop and before the room's own
   moving things; a cutscene that paints a room calls draw(g,t,id,cfg) itself. What a room may name, all in room pixels:
     gulls:[x,y,w,h]       three gulls that wheel over a harbor, inside that stretch of open sky (n: gullsN)
     stand:[[x,y,d],...]   gulls standing on a quay's edge, feet at x,y, facing d; with huddle:true they sit hunched against the rain
     prey:[x,y,w,h]        a bird of prey circling slowly, high over open country (prey2:true for a second one, farther off)
     swallows:[x,y,w,h]    swallows darting low over water
     lark:[x,y,h]          a lark that rises from the field at x,y, hangs singing h pixels up, drops, and after a while rises again
     storks:[y,dy,x0,x1]   now and then a loose line of storks crosses the sky at about y, each dy lower than the one before, flying
                           north (in spring only: the room says when); seen only between x0 and x1 if they are given
     perch:[{k,y,x:[..],d:[..]}]  sparrows (k:'sparrow') on a roof or doves (k:'dove') on a wall top, set outside the walkable strip.
                           They peck and turn their heads; when whoever is played comes within reach (r, 34 by default) they fly up and
                           away, and come back some while after he has gone.
   Every kind can be looked at: draw() keeps what is in sight, and the hotspots it adds to the room (at the start of ROOMS[id].hs, so that
   anything the room names itself wins) follow it. Looking at a bird is done from where one stands: nobody walks after a gull.
   Birds change nothing in the story's state and nothing in a safe-point code.

   Shapes (CONTRIBUTING section 3): a bird in flight is a bent line of pixels, its wings up or down or in a shallow V, never a level
   stroke with a body or a tail across it, which is a cross. A bird of prey soars with its wings in a shallow V and no tail below them.
   A sitting bird shows no legs. Every shape is drawn in half pixels (HR) by hand, never scaled from another. */
SHARED.birds=(()=>{
"use strict";

/* --- sky shapes, one string per row of half pixels, centred on the bird --- */
const GULL=[[["X.......X",".XX...XX.","...XXX..."],[".XX...XX.","X..XXX..X"],["...XXX...",".XX...XX.","X.......X"]],
  [["X.............X",".XX.........XX.","...XXX...XXX...","......XXX......"],["..XXX.....XXX..","XX...XXXXX...XX"],["......XXX......","...XXX...XXX...",".XX.........XX.","X.............X"]]];
/* a bird of prey soaring: broad wings in a shallow V with spread tips, a short body at the bottom of the V, nothing below it */
const PREY=["X.....................X","XX...................XX",".XXX...............XXX.","..XXXXX.........XXXXX..","....XXXXXX...XXXXXX....","........XXXXXXX........","..........XXX.........."];
/* a stork: long wings, white with black at the tips; up, level-bent, down */
const STORK=[["KK.....................KK",".KKW.................WKK.","...WWWW...........WWWW...",".......WWWW.....WWWW.....","...........WWWWW........."],
  ["...KWWWW.........WWWWK...","KKK.....WWWWWWWWW.....KKK"],
  [".........WWWWWWW.........","......WWW.......WWW......","...WWWW...........WWWW...",".KKW.................WKK.","KK.....................KK"]];
/* small birds on the wing: swallow, lark, sparrow and dove taking off */
const SMALL=[["X...X",".XXX."],["XXXXX"],[".XXX.","X...X"]];
const DOVEF=[["X.....X",".X...X.","..XXX.."],[".XXXXX.","X.....X"],["..XXX..",".X...X.","X.....X"]];
const LARK=[["X.X",".X."],[".X.","X.X"]];
function glyph(g,m,x,y,col,shear){const h=m.length;for(let j=0;j<h;j++){const row=m[j],w=row.length;for(let i=0;i<w;i++){const c=row[i];if(c==='.')continue;
  g.fillStyle=typeof col==='string'?col:col[c];const dy=shear?Math.round(shear*(i-(w>>1))):0;g.fillRect(x+(i-(w>>1))*.5,y+(j-(h>>1)+dy)*.5,.5,.5)}}}
const hp=v=>Math.round(v*2)/2;

/* --- sitting birds, facing right, in half pixels: rows of letters, each a colour; '.' is nothing --- */
/* a house sparrow: grey crown, chestnut nape, pale cheek, dark bib, streaked back, buff belly, the tail cocked up behind */
const SP={T:'#4a3626',B:'#8a6640',S:'#4a3424',W:'#a8784a',L:'#c4b496',H:'#86807a',C:'#e0d6c0',K:'#2e2620',N:'#8a5232',D:'#3a302a',E:'#141014'};
const SPARROW={sit:[".....HHHH..","....NHHEHK.","....NCCCD..","TTBBWWBCDL.",".TBSSWWBLL.","..BWWSSLLL.","...LLLLLL..","....LLLL..."],
  peck:["...........","...........","TT.........",".TBBWWBNHH.","..BSSWWNHEH","..BWWSSLCDK","...LLLLLL..","....LLLL..."],
  look:["....HHHH...","...KHEHN...","....DCCN...","TTBBWWBCL..",".TBSSWWBLL.","..BWWSSLLL.","...LLLLLL..","....LLLL..."]};
/* a rock dove: blue-grey, two dark bars on the wing, the neck green and purple, an orange eye, a dark band at the tail's end */
const DV={T:'#3e4250',G:'#7a7e8e',B:'#9ca0b0',W:'#4e5262',N:'#5e8a78',P:'#86688a',H:'#a8acba',K:'#3a3438',C:'#e8e4dc',E:'#d89040',L:'#b8bac6'};
const DOVE={sit:["...........HH..","..........HHEHK","..........NPHC.","..........NNP..","TTGGBBBBBBNNP..",".TTGBBWWBWWBL..","...GBBBWWBWWL..","....BBBBBBBLL..",".....LLLLLLL...","......LLLLL...."],
  peck:["...............","...............","...............","...............","TTGGBBBBBBNN...",".TTGBBWWBWWNPH.","...GBBBWWBWWPHE","....BBBBBBBLLHK",".....LLLLLLL...","......LLLLL...."],
  look:["..........HH...",".........KHEH..","..........HPN..","..........NNP..","TTGGBBBBBBNNP..",".TTGBBWWBWWBL..","...GBBBWWBWWL..","....BBBBBBBLL..",".....LLLLLLL...","......LLLLL...."]};
function sitter(g,m,pal,x,y,d){const h=m.length,w=m[0].length;g.fillStyle='rgba(30,24,40,.28)';g.fillRect(hp(x-w*.18),hp(y),hp(w*.36),.5);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const c=m[j][i];if(c==='.')continue;g.fillStyle=pal[c];
    const cx=d>0?x+(i-w/2)*.5:x+(w/2-i-1)*.5;g.fillRect(hp(cx),hp(y-(h-j)*.5),.5,.5)}}

/* a gull standing on the edge of a quay, after the two in Chapter Fifteen's Troas; hunched: head drawn in, against the rain */
function gullStand(g,x,y,d,hunch){const P=p=>p.map((v,i)=>i%2?y+v:x+d*v),Q=(a,b,w,h,c)=>{const l=hp(d>0?x+a:x-a-w),r=hp((d>0?x+a:x-a-w)+w);R(g,l,y+b,Math.max(.5,r-l),h,c)};
  R(g,d>0?x-1:x-4.6,y-.3,5.6,.6,'rgba(40,36,70,.3)');if(!hunch){Q(-.7,-1.5,.5,1.5,'#c89a48');Q(.5,-1.5,.5,1.5,'#a87c34')}
  const lift=hunch?1.2:0,Y=v=>v+lift;
  poly(g,P([-3.4,Y(-2.7),-1.6,Y(-4.3),1.4,Y(-4.5),2.7,Y(-3.5),2.2,Y(-2),-.6,Y(-1.4),-2.4,Y(-1.9)]),hunch?'#d8d4cc':'#f4f0e6');
  poly(g,P([-1.6,Y(-1.6),2,Y(-2.1),2.2,Y(-2.6),-1.8,Y(-2.2)]),'#c2bab4');
  poly(g,P([-3.6,Y(-3),-1.4,Y(-4.4),1,Y(-4.4),.5,Y(-3.1),-1.8,Y(-2.6)]),hunch?'#80868f':'#959ba6');poly(g,P([-4.8,Y(-2.5),-3.2,Y(-3.3),-2.8,Y(-2.4)]),'#34343e');
  if(hunch){Q(.9,-4.6,1.9,1.8,'#e6e2da');Q(2.8,-4,.9,.5,'#c89a3a')}else{Q(1.3,-5.8,1.9,2.2,'#f8f4ea');Q(3.2,-5.1,1.1,.6,'#dca43a')}}

/* --- state: perched flocks per room, and what is in sight this frame (for the hotspots) --- */
const ST={},SEEN={};
const hash=(a,b)=>{let h=(a*374761393+b*668265263)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
function flutter(n){if(typeof noise!=='function'||!AU.ctx)return;const t0=AU.ctx.currentTime;
  for(let i=0;i<6+n*2;i++)noise({t:t0+i*.045+Math.random()*.02,d:.05,v:.05,f:1700+Math.random()*900,q:1.6})}

function cfgOf(id,cfg){const c=cfg||ROOMS[id]&&ROOMS[id].birds;return typeof c==='function'?c():c}

function draw(g,t,id,cfg){const c=cfgOf(id,cfg),seen=SEEN[id]=[];if(!c)return;if(!cfg)attach(id);
  const s=t/1000,room=ART[id]?ART[id].w:320;
  /* gulls over a harbor: the paths of Chapter Fifteen, spread over the room's stretch of sky */
  if(c.gulls){const[x,y,w,h]=c.gulls,n=c.gullsN||3;
    for(let k=0;k<n;k++){const big=k===0?1:0,T=[26000,34000,21000,30000][k%4],ph=[0,2.1,4.2,1.1][k%4],
        cx=x+w*[.5,.68,.28,.82][k%4],cy=y+h*[.45,.25,.65,.4][k%4],ax=w*[.36,.25,.2,.15][k%4],ay=h*.22,a=t/T*6.2832+ph,
        bx=hp(cx+ax*Math.cos(a)),by=hp(cy+ay*Math.sin(2*a)),q=(s+ph*3)%9,m=GULL[big][q<2.4?[0,1,2,1][Math.floor(q/.15)%4]:1];
      glyph(g,m,bx,by,big?'#4e5a6c':'#667284');if(k===0)seen.push(['gulls',bx,by])}}
  if(c.stand){for(const[x,y,d]of c.stand)DQ?DQ.push([y,()=>gullStand(g,x,y,d,c.huddle)]):gullStand(g,x,y,d,c.huddle);
    const[x,y]=c.stand[0];seen.push([c.huddle?'huddle':'gull',x,y-3])}
  /* a bird of prey: one slow circle, seen from below and a little aside, so that it banks as it turns */
  if(c.prey){const[x,y,w,h]=c.prey;for(let k=0;k<(c.prey2?2:1);k++){const T=k?52000:41000,a=t/T*6.2832+(k?2.6:0),r=k?.6:1,
      bx=hp(x+w*(k?.25:.55)+w*.4*r*Math.cos(a)),by=hp(y+h*(k?.3:.5)+h*.35*r*Math.sin(a)),sh=.12*Math.cos(a)*(k?.6:1);
      glyph(g,k?PREY.slice(1,-1).map(r=>r.replace(/^.|.$/g,'.')):PREY,bx,by,k?'#6a6070':'#3e3430',sh);if(!k)seen.push(['prey',bx,by])}}
  /* swallows: quick, uneven sweeps low over the water, the wings flicking between strokes and short glides */
  if(c.swallows){const[x,y,w,h]=c.swallows;
    for(let k=0;k<3;k++){const p=k*2.3,bx=hp(x+w*(.5+.32*Math.sin(s/2.1*(1+k*.13)+p)+.16*Math.sin(s/.83+p*1.7))),
        by=hp(y+h*(.5+.35*Math.sin(s/1.37+p*2.1)+.12*Math.sin(s/.51+p))),f=Math.floor(s*14+k*3)%10,m=SMALL[f<6?[0,1,2,1,0,1][f]:1];
      glyph(g,m,bx,by,'#22263a');if(!k)seen.push(['swallows',bx,by])}}
  /* a lark: rises fluttering for six seconds, hangs singing for twelve, drops in a moment, and stays down for ten */
  if(c.lark){const[x,y,h]=c.lark,q=(s+7)%30;let up=-1;
    if(q<6)up=q/6;else if(q<18)up=1;else if(q<19.4)up=1-(q-18)/1.4;
    if(up>0){const bx=hp(x+Math.sin(s/3)*3*up),by=hp(y-h*up+Math.sin(s*1.3)*.8*(up===1));
      glyph(g,q>=18?SMALL[1]:LARK[Math.floor(s*18)%2],bx,by,'#5a4a3a');seen.push(['lark',bx,by])}}
  /* storks: every seventy seconds a loose line of six crosses the room in about thirty, mostly gliding */
  if(c.storks){const[y,dy,x0,x1]=c.storks,P=70,q=s%P;if(q<32){const dir=Math.floor(s/P)%2?1:-1,span=room+200;g.save();if(x0!=null){g.beginPath();g.rect(x0,0,x1-x0,VH);g.clip()}
      for(let k=0;k<6;k++){const u=q/30,bx0=-100+u*span-k*16-(k%2)*5,bx=hp(dir>0?bx0:room-bx0),by=hp(y+k*(dy||2.5)+Math.sin(s*.7+k)*1.2),
          f=Math.floor(s*2.4+k*1.7)%12,m=STORK[f<3?[0,1,2][f]:1];
        if(bx>-20&&bx<room+20){glyph(g,m,bx,by,{K:'#26242a',W:'#e4e0d6'});if((x0==null||bx>x0&&bx<x1)&&!seen.some(e=>e[0]==='storks'))seen.push(['storks',bx,by])}}g.restore()}}
  /* sitting birds */
  if(c.perch){const st=ST[id]||(ST[id]={t:0,f:[]}),pc=typeof PC==='function'?PC():null,here=pc&&pc.room===id&&!cfg;
    if(t-st.t>2000)st.f=[];st.t=t;
    c.perch.forEach((fl,fi)=>{const S=st.f[fi]||(st.f[fi]={m:'sit',t0:t}),r=fl.r||34,cx=fl.x.reduce((a,b)=>a+b,0)/fl.x.length,
        near=here&&Math.abs(pc.x-cx)<r;
      if(S.m==='sit'&&near){S.m='up';S.t0=t;S.dir=pc.x<cx?1:-1;flutter(fl.x.length)}
      else if(S.m==='up'&&t-S.t0>2600){S.m='away';S.t0=t;S.wait=22000+hash(fi,Math.floor(t/1000))*14000}
      else if(S.m==='away'&&t-S.t0>S.wait&&!near){S.m='down';S.t0=t}
      else if(S.m==='down'&&t-S.t0>2600){S.m='sit';S.t0=t}
      const pal=fl.k==='dove'?DV:SP,shape=fl.k==='dove'?DOVE:SPARROW;
      fl.x.forEach((bx,i)=>{const d0=(fl.d&&fl.d[i])||(i%2?-1:1);
        if(S.m==='sit'){const per=Math.floor((s+i*1.9)/2.7),h=hash(per,i+fi*7),q=(s+i*1.9)%2.7,
            m=h<.3&&q<.5?shape.peck:h>.8&&q<1.4?shape.look:shape.sit,d=h>.55&&h<.62?-d0:d0;
          sitter(g,m,pal,bx,fl.y,d)}
        else if(S.m!=='away'){const u=S.m==='up'?(t-S.t0)/2600:1-(t-S.t0)/2600,e=Math.pow(clamp(u,0,1),1.25),sp=.7+hash(i,fi)*.6,
            fx=hp(bx+S.dir*(e*160*sp+i*4*e)),fy=hp(fl.y-2-e*95*(.8+.4*hash(fi,i))),f=Math.floor(s*(fl.k==='dove'?11:15)+i*2)%4;
          if(u<.04)sitter(g,shape.sit,pal,bx,fl.y,d0);else glyph(g,(fl.k==='dove'?DOVEF:SMALL)[[0,1,2,1][f]],fx,fy,fl.k==='dove'?'#7c8090':'#6a5038')}});
      if(S.m==='sit')seen.push([fl.k==='dove'?'doves':'sparrows',cx,fl.y-2,fi])})}}

/* --- hotspots: one for each kind, placed where that kind is seen this frame --- */
const KIND={gulls:['gulls','gulls_over_the_harbor',12,6],gull:['gull','gull_on_the_quay_edge',10,8],huddle:['gulls','gulls_hunched_in_the_rain',10,8],
  prey:['bird_of_prey','bird_of_prey_circling',14,7],swallows:['swallows','swallows_over_the_water',12,8],lark:['lark','lark_climbing_and_singing',8,6],
  storks:['storks','storks_flying_north',16,8],sparrows:['sparrows','sparrows_on_the_roof',0,6],doves:['doves','doves_on_the_wall',0,7]};
const ATT=new Set();
function attach(id){if(ATT.has(id)||!ROOMS[id]||!ROOMS[id].hs)return;ATT.add(id);const list=[];
  for(const k in KIND)for(let fi=0;fi<((k==='sparrows'||k==='doves')?4:1);fi++){const[name,look,w0,h]=KIND[k],
      at=()=>(SEEN[id]||[]).find(e=>e[0]===k&&(e[3]==null||e[3]===fi)),
      wid=()=>{if(w0)return w0;const c=cfgOf(id),f=c&&c.perch&&c.perch[fi];return f?Math.max(...f.x)-Math.min(...f.x)+8:8};
    list.push({name,look,h,get x(){const e=at();return e?e[1]-wid()/2:-99},get y(){const e=at();return e?e[2]-h/2:-99},get w(){return wid()},
      get wx(){return PC().x},get wy(){return PC().y},vis:()=>!!at()})}
  ROOMS[id].hs.unshift(...list)}

return{draw,sheet:{GULL,PREY,STORK,SMALL,DOVEF,LARK,SPARROW,DOVE,SP,DV,sitter,glyph,gullStand}};
})();
