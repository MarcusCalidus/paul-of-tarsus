/* Paul of Tarsus: level data for Chapter Six, "The Door to Faith".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   The rest of the first missionary journey (Acts 14:1-28): Iconium, Lystra, Derbe, back the way they came to strengthen the disciples, and
   home by Perga and Attalia to Antioch. The travel map (shared/map.js) leads from city to city, through its northern window. */
LEVEL(6,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A tune for a high, well-watered plain, in F Lydian: a lyre in even fours over a bass, a frame drum, and a reed pipe carrying the tune
   (mood "hope": the streets and the roads). Indoors (mood "calm") a harp takes the lyre's place and a ney the pipe's. When stones are
   spoken of (mood "tense") only a drone, a slow drum and a few notes of the oud remain. And when a whole town runs to the gate with
   garlands (mood "feast") the drum doubles, hands clap, a drone sounds the keynote, and the pipe goes round and round on four notes while its
   second pipe holds the keynote under it (hold:0). */
const _=null,
 TUNE=[[[0,4,4],[4,3,2],[6,4,2],[8,6,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,2,8]],[[0,4,2],[2,5,2],[4,6,4],[8,7,2],[10,6,2],[12,4,4]],[[0,5,4],[4,3,4],[8,4,8]],
  [[0,7,4],[4,8,2],[6,7,2],[8,6,4],[12,4,4]],[[0,5,4],[4,6,2],[6,4,2],[8,3,8]],[[0,2,2],[2,3,2],[4,4,2],[6,6,2],[8,4,4],[12,2,4]],[[0,1,4],[4,0,12]]],
 MUSIC={dt:.16,root:53,scale:[0,2,4,6,7,9,11],bars:16,tracks:[
  {inst:'lyre',moods:['hope'],prog:'ABACABCA',len:3,seq:{A:[0,_,4,_,7,_,4,_,2,_,4,_,7,_,4,_],B:[1,_,4,_,8,_,4,_,1,_,5,_,8,_,5,_],C:[-2,_,2,_,5,_,2,_,-1,_,3,_,6,_,3,_]}},
  {inst:'harp',moods:['calm'],group:[3,3,4,4,2],prog:'ABACABCA',len:3,seq:{A:[0,_,_,4,_,_,7,_,_,_,4,_,_,_,2,_],B:[1,_,_,4,_,_,8,_,_,_,5,_,_,_,1,_],C:[-2,_,_,2,_,_,5,_,_,_,3,_,_,_,-1,_]},oct:12},
  {inst:'bass',moods:['hope','calm'],prog:'ABACABCA',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],C:[-9,_,_,_,_,_,_,_,-8,_,_,_,_,_,-6,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d..st.s.d.s.t.s.',B:'d..st.s.d.k.t.tk'}},
  {drum:1,moods:['calm'],seq:{A:'d.........t.....'},vol:.45},
  {drum:1,moods:['tense'],seq:{A:'d.......d..d....'},vol:.8,group:[3,3,2]},
  {drone:[0,7],every:32,moods:['tense']},
  {inst:'oud',moods:['tense'],group:[3,3,2,2,2,4],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,3,_,_,_,_,_,4,_,_,_],B:[0,_,_,_,_,_,-1,_,_,_,3,_,_,_,_,_]},vol:.7},
  {drum:1,moods:['feast'],prog:'AB',seq:{A:'d.tkd.t.d.tkd.tc',B:'d.tkd.tcd.tkc.tc'},vol:1.1},
  {drum:1,moods:['feast'],seq:{A:'s.s.s.s.s.s.s.s.'},vol:.9},
  {drone:[0],every:16,moods:['feast'],vol:.6},
  {inst:'aulos',moods:['feast'],hold:0,prog:'AAAB',len:2,oct:12,seq:{A:[4,_,6,_,4,_,3,_,4,_,6,_,7,_,6,_],B:[4,_,6,_,7,_,8,_,7,_,6,_,4,_,3,_]},vol:.9},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
/* The shared materials (shared/materials.js): quiet grain on wood, two-tone cracks set by hand, soft contact shadows, earth colors.
   This chapter has an earth() of its own, the trodden ground, so the shared one is earth6 here. */
const{plank:plank6,board:board6,crack:crack6,skipCracks:skipCracks6,shadow:shadow6,earth:earth6,joistAO:joistAO6}=SHARED.materials;
/* joists6: the ceiling seen from below at its edge, as in Chapter One's workshop: dark boards, and the joists running toward us in
   perspective from the wall plate (y = U) to the top of the picture, each with the soft shade of the boards beside it. They stand in pairs
   about the middle, so that none rises upright from the plate, and no square beam end sits on it to make a T; the room lays the plate over
   their feet. rj: a seed of its own. burn6: the draws that board() took for the square beam ends the room used to show, taken on a scrap
   canvas, so that everything the room draws after them stays where it was */
function joists6(g,U,step,rj,c){c=c||{};const T=c.joist||'#6b4a2e',k=1.17;
  if(c.boards!==0){plank6(g,0,0,320,U,c.boards||'#33251a',rj,0);ao(g,0,0,320,U*.7,'t',.45,'#0c0808')}
  let a=160+step/2-3.5;while(a>-step)a-=step;
  for(;a<330;a+=step){const x0=160+(a-160)*k,x1=160+(a+7-160)*k,P=[a,U,a+7,U,x1,0,x0,0];joistAO6(g,a,x0,7,U,'#0c0808');poly(g,P,T);
    clipTo(g,()=>poly(g,P),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,U,'overlay',.5));
    poly(g,[a+5,U,a+7,U,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,U,x0+.25,0],tint(T,.25),.5)}
  ao(g,0,U-2.5,320,2.5,'b',.3,'#0c0808')}
function burn6(r,x0,step,w,h){const d=mk(4,4)[1];for(let i=x0;i<320;i+=step)board6(d,i,0,w,h,'#5a4226',r,1)}
/* SKY6: a sky drawn a little toward its own grey, so that it sits among the earth and mineral colors of walls and fields */
const SKY6=st=>st.map(c=>earth6(c,.14));
/* sunlight6: the light of a day on the plateau, from the left and high: the sky and the far country keep it full, what faces the sun takes
   it in soft pools (pools: [x, y, rx, ry, strength]), and the near ground falls off a little toward us. top: where the sky's full light ends. */
function sunlight6(g,w,top,pools,more){lightmap(g,w,'#e2dee8',l=>{R(l,0,0,w,top,'#ffffff');l.fillStyle=lg(l,0,top,0,top+20,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,top,w,20);
  for(const[x,y,rx,ry,a]of pools)pool(l,x,y,rx,ry,'#fff6e6',a);if(more)more(l);
  comp(l,'multiply',1,()=>{ao(l,0,96,w,10,'b',.1,'#4a4468');ao(l,0,128,w,16,'b',.18,'#4a4468')})})}
const SH='#8f95c8';
/* What is seen through the gates of Lycaonia: the plateau, with blue ranges round it. Each gate adds the horizon and the sky of its own scene. */
const GATE6={far:['#8f9ec4','#b4bfd2'],near:['#8fa468','#a2b274'],land:'#a8b464',road:'#ead9ae'};
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* rock: a stone sitting on the ground at x,y */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.34,x-w/2,y-h,w,h,'overlay',1);
    ao(g,x-w/2,y-h*.3,w,h*.3,'b',.22,'#1a1630')})}
/* poplar: a tall narrow tree, such as line every water channel of the plateau */
function poplar(g,x,y,h,c,r){R(g,x-.6,y-h*.24,1.3,h*.24,'#5a4630');foliage(g,x,y-h*.6,h*.11+1.6,h*.42,c||'#5f8a4a',r,h*2.4)}
/* bundles: what the two men carry between them: two bed rolls and a bag. A roll shows one end only, the one toward the middle of the road,
   and nothing is tied across it. */
function bundles(g,x,y){shadow6(g,x+17,y,18,1.4,.4,'#282040');
  for(const[dx,dy,w,hh,c]of[[0,-5,17,5,'#8a5a4a'],[4,-9.6,15,4.6,'#6f7a5a']])clothRoll(g,x+dx,y+dy+hh,w,hh,c,{near:1,hi:1});
  g.fillStyle=lg(g,x+22,0,x+33,0,['#3a302a','#2a211c','#17110e']);g.beginPath();g.ellipse(x+27.6,y-3.4,5.6,3.6,0,0,6.2832);g.fill();R(g,x+23,y-5,9,.6,'#8a7a5a')}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.34,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.4);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.5+k*1.3;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.24));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.3,s*.3,'rgba(40,36,70,.22)')}}
/* An ox or a bull, in the pixel manner of the engine's pack donkey and seen from the side. c: its coat. gar: a garland of leaves round its neck.
   Every part grows out of the one before it: the tail is set on at the top of the rump and lies along it before it hangs free, the crest of
   the shoulders sits on the back, and the neck is painted in the same bands of tone as the body it comes out of, so that no seam shows. */
const OX_HEAD=["......www.............","....wwW.ww............","...wwW................","...wWhhhhhhh..........",".eehhHHHHHhhh.........","eEehHHHHHHHhhh........",".eehHHHkHHHHHhhh......",
  "..dhHHHHHHHHHHhhhh....","..dhhHHHHHHHHHHhhhmm..","..dhhhHHHHHHHHHhhmmmm.","...dhhhhHHHHHHhhmmmMmm","...ddhhhhhhhhhhhmmMMmm","....ddhhhhhhhhhhmmmnmm",".....dddhhhhhhhhmmmmm.",".......ddddhhhhdmmmm..","...........dddd.mmm..."];
function ox(g,x,y,dir,fr,c,gar){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
  const px=(a,b,col,w,h)=>{g.fillStyle=col;g.fillRect(a,b,w||1,h||1)},D=ramp(c),hoof='#2a2018',s=fr===1?3:fr===3?-3:0,o=fr%2?-1:0;
  /* hw: the half-width of the barrel of the body in each row. band: the tone a row is painted in, for the body and the neck alike. */
  const hw=yy=>{const dy=(yy+43.5)/16.5;return Math.round(34*Math.sqrt(Math.max(0,1-dy*dy*.9)))},band=yy=>yy<-55?1:yy<-46?2:yy<-35?3:4;
  /* back: the line of the back, rising to the crest of the shoulders */
  const back=xx=>-60-2.6*Math.exp(-Math.pow((xx-18)/7,2));
  /* a leg: the far ones start under the belly. The near ones start higher, inside the body, and are painted in the body's own tones as far
     down as the belly, so that haunch and shoulder grow out of it instead of being laid on top */
  const leg=(lx,sh,far)=>{const y0=(far?-30:-37)+o,n=-3-y0;for(let i=0;i<n;i++){const yy=y0+i-o,t=i/(n-1),cx=lx+Math.round(sh*t*t),w=t<.36?9:t<.64?7:6,x0=cx+(t<.36?0:1);
      for(let k=0;k<w;k++){const u=(k+.5)/w;px(x0+k,y0+i,D[!far&&yy<-27?Math.min(4,band(yy)+(u<.22?1:0)):Math.min(4,(u<.22?4:u<.5?3:u<.82?2:1)+(far?1:0))])}}
    px(lx+Math.round(sh)+1,-3,hoof,7,3);px(lx+Math.round(sh)+6,-3,'#4a3a2c',2)};
  leg(-22,s,1);leg(17,-s,1);
  /* the tail */
  for(let yy=-57;yy<=-24;yy++){const i=yy+57,tuft=yy>-31;px(tuft?-38:yy<-44?-hw(yy)-3:-37,yy+o,tuft?hoof:D[i%4?3:4],tuft?4:2)}
  /* the body: a deep barrel, lit along the back */
  for(let yy=-60;yy<=-27;yy++){const w=hw(yy);for(let xx=-w-1;xx<=w-1;xx++)px(xx,yy+o,D[Math.min(4,band(yy)+(xx<-w+3?1:0))])}
  /* the crest of the shoulders, on the line of the back */
  for(let xx=2;xx<20;xx++){const yb=Math.round(back(xx));let top=-60;while(hw(top)<xx+1)top++;if(top>yb)px(xx,yb+o,D[1],1,top-yb)}
  leg(-30,-s,0);leg(23,s,0);
  /* a thick neck, from the shoulders to the poll, with the dewlap hanging under it */
  for(let xx=20;xx<=44;xx++){const t=(xx-20)/24,y0=Math.round(back(xx)+2*t),y1=Math.round(-29-19*t+1.8*Math.sin(t*Math.PI));
    for(let yy=y0;yy<=y1;yy++)px(xx,yy+o,D[yy===y0?1:yy>=y1-1?4:band(yy)])}
  /* the head, carried low and forward: one horn in a crescent, an ear behind it, a broad pale muzzle */
  stamp(g,OX_HEAD,38,-62+o,{h:D[2],H:D[1],d:D[3],e:D[3],E:mix(c,'#6a4a40',.55),k:'#1a120c',m:mix(c,'#d8c8b8',.5),M:'#e6dccc',n:hoof,w:'#efe4c8',W:'#b8a888'});
  /* a garland: leaves and a few yellow flowers in a band round the neck, hanging a little below the throat */
  if(gar)for(let i=0;i<11;i++){const gx=28+Math.round(i*.75),gy=-61+o+i*2;px(gx,gy,i%2?'#4f7a3a':'#6f9a4a',6,2);px(gx+1,gy,'#8fb45a',2);if(i%3===1)px(gx+3,gy,'#f0d060',2,2)}
  g.restore()}
const cattle=(g,x,y,dir,fr,c,gar,lit)=>figure(g,x,y,lit,'ox'+dir+fr+c+(gar?'g':''),s=>ox(s,0,0,dir,fr,c,gar),17);
/* wagon: a four-wheeled wagon with solid wheels, its bed at x, standing on the ground at y. cov: 1 the cover is on its hoops, 0 the hoops stand bare, -1 an open wagon with no hoops. load: sacks on its bed. */
function wagon(g,x,y,cov,load){shadow6(g,x+30,y+.6,32,1.9,.42,'#1e1a34');
  for(const wx of[x+13,x+47])oval(g,wx+2.4,y-6,5.4,5.6,'#33261a');
  board6(g,x,y-13.6,60,4.6,'#7a5a34',rng(611));R(g,x,y-9,60,1,'#3a2a1a');R(g,x+60,y-12,13,1.6,'#6a4a2a');R(g,x+60,y-12,13,.5,'#a07a48');
  if(load)for(const[sx,sw,sh,sc]of[[x+10,6.4,10,'#cdbb8c'],[x+23,7,12,'#d8c698'],[x+37,6.6,11,'#c4b284'],[x+50,6,9.6,'#d2c090']])sack(g,sx,y-13.6,sw,sh,sc);
  if(cov>0){g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath();g.fillStyle=lg(g,0,y-34,0,y-13,['#51443a','#2e2620','#1a1410']);g.fill();
    clipTo(g,()=>{g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath()},()=>{for(let i=0;i<5;i++){const hx=x+6+i*12;g.fillStyle='rgba(255,236,200,.1)';g.fillRect(hx,y-34,1,21)}
      tex(g,'mott',.4,x,y-36,60,24,'overlay',1);ao(g,x,y-22,60,9,'b',.4)});
    for(const cx of[x+1.6,x+55.2]){R(g,cx,y-17,3.2,3,'#a8703c');R(g,cx,y-17,3.2,.6,'#d09a5e');R(g,cx+1.1,y-15.9,1,1,'#2a1a10')}}
  else if(!cov)for(let i=0;i<4;i++){const hx=x+4+i*16.4;g.strokeStyle='#4a3620';g.lineWidth=1.5;g.beginPath();g.moveTo(hx,y-13.6);g.bezierCurveTo(hx,y-37,hx+5,y-37,hx+5,y-13.6);g.stroke();
    g.strokeStyle='#a8875a';g.lineWidth=.6;g.beginPath();g.moveTo(hx,y-13.6);g.bezierCurveTo(hx,y-37,hx+5,y-37,hx+5,y-13.6);g.stroke()}
  for(const wx of[x+13,x+47]){oval(g,wx,y-6,6.2,6.2,'#4a341e');oval(g,wx,y-6,5,5,'#8a6638');oval(g,wx-.8,y-6.8,3.6,3.6,'#9a7646');stroke(g,[wx-4.2,y-8.4,wx+4.2,y-8.4],'#5a4026',.5);stroke(g,[wx-4.2,y-3.6,wx+4.2,y-3.6],'#5a4026',.5);oval(g,wx,y-6,1.5,1.5,'#33261a')}}
/* ---------- Iconium: the saddlers' street, where two roads cross ---------- */
const sultan6=x=>30+8*Math.sin(x/57+1)+4*Math.sin(x/21+2)+2*Math.sin(x/7);
ART.iconium={w:480,fp:1.3,q:12,
 paint(g){const r=rng(431),rw=rng(4311),rc=rng(4312),W='#e6d8b4',ST='#d8ccae';
  sky(g,480,72,SKY6(['#3c7ac8','#6ea4dc','#a8cae6','#e2e8dc']));cloud(g,236,12,60,7,r);cloud(g,360,22,40,5,r);cloud(g,70,8,40,5,r);
  /* beyond the fountain: the plateau, its orchards, and the mountains that close it in */
  snowy(g,186,300,66,sultan6,['#7f90bc','#9eaccc','#c0c8cc'],33);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,68,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(186,34,114,34)});
  g.fillStyle=lg(g,0,64,0,104,['#b4bc7c','#a2b468','#8fa858']);g.fillRect(186,64,114,40);tex(g,'mott',.5,186,64,114,40,'overlay',1);
  for(let i=0;i<7;i++){const fx=188+i*15+r()*6,fy=67+r()*8;poly(g,[fx,fy,fx+20,fy-1,fx+26,fy+7,fx+3,fy+8],i%3===0?'rgba(214,196,110,.42)':i%3===1?'rgba(96,140,70,.36)':'rgba(170,130,84,.3)')}
  for(const[x,y]of[[200,80],[228,75],[260,79],[286,84],[244,84]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#6f8a58',r,20)}
  /* the street we came by, running back to the synagogue of the Jews. A house front stands across its far end, its roof at the level the
     paving runs to: a street must not end in the sky below that level. */
  R(g,0,40,60,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,28,60,76);g.clip();sky(g,480,80,SKY6(['#6ea4dc','#e2e8dc']));
  R(g,24,64,10,40,'#d6d0c2');R(g,24,62,10,2.4,'#b8603c');R(g,24,72.4,10,1.6,'rgba(60,50,90,.2)');
  for(const[hx,hy,hw,hh,c]of[[0,42,18,62,'#d6caa8'],[42,48,18,56,'#e2d6b4'],[16,56,10,48,'#c8bc9c'],[32,60,9,44,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[18,104,42,104,33,74,27,74],'#e0d6ba');ao(g,0,28,60,12,'t',.2,'#2a2440');g.restore();
  /* Nathan's saddlery: a plastered house, its whole front open to the street under an awning */
  /* the plaster's random cracks are set by hand now, high on the wall where they run to no head; their draws are still taken */
  house(g,60,24,126,80,W,r,{side:0,patch:3,cracks:0,beams:0});skipCracks6(r,5);
  for(const[x,y,n]of[[66,27,3],[100,26.6,3],[148,27.4,3],[181,28,4]])crack6(g,x,y,n,rc,.9);
  /* the two upper windows sit high under the eaves, their sills clear above the awning; the ends of the roof beams run along the
     wall between them, as house() would set them, and none where a window is */
  for(let i=66;i<182;i+=12)if(i!==78&&i!==162){R(g,i,28,2.5,2.5,'#6a4a2c');R(g,i,28,2.5,.5,'#a67c4a');poly(g,[i+.5,30.5,i+3,30.5,i+4.5,34,i+2,34],'rgba(50,40,90,.28)')}
  windowArt(g,72,28,10,9,W,{bars:2,wood:'#6a4e2c'});windowArt(g,162,28,10,9,W,{bars:2,wood:'#6a4e2c'});
  R(g,84,56,84,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c211a','#4a382a']);g.fillRect(86,58,80,46);
  /* inside: a shelf of pack saddles, low enough that nothing hanging from the bar reaches it, and hides rolled on the floor, each showing
     the one end that is turned to the middle of the shop */
  ao(g,86,80,80,6,'t',.3,'#0c0806');board6(g,88,80,76,1.6,'#5a4226',rw);R(g,90,81.6,72,1,'rgba(10,6,4,.4)');
  for(const[sx,c]of[[94,'#8a5a34'],[110,'#a06a3c'],[126,'#7a4c2c'],[144,'#96643a']]){g.fillStyle=lg(g,sx,0,sx+11,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+5.5,80,5.6,4.6,0,Math.PI,0);g.fill();R(g,sx+1,76.4,9,.6,tint(c,.4))}
  for(const[sx,c]of[[96,'#9a6a40'],[108,'#7a5030'],[152,'#8a5c36']]){shadow6(g,sx+5,104,6,1,.4,'#0c0806');clothRoll(g,sx,104,10,7,tint(c,.04),{near:sx<126?1:-1,hi:1})}
  /* harness on a bar across the opening: girths and bridles, each hung by a strap whose two ends part downward from the bar to its buckle,
     and two collars, hung on the bar by their tops */
  board6(g,84,58,84,1.8,'#7a5c36',rw);
  for(const[sx,ln,c]of[[92,11,'#6a4424'],[99,15,'#8a5a30'],[118,9,'#5a3a20'],[137,14,'#7a4c28'],[158,10,'#6a4424']]){const y0=59.8,y1=y0+ln,s=1.1+ln*.04;
    poly(g,[sx,y0,sx+1.2,y0,sx+1.2+s,y1,sx+.2+s,y1],tint(c,-.12));poly(g,[sx,y0,sx+1.2,y0,sx+1-s,y1,sx-s,y1],c);stroke(g,[sx+.2,y0,sx-s+.2,y1],tint(c,.3),.4);
    R(g,sx-s-.4,y1,2*s+2,2.2,tint(c,-.2));R(g,sx-s-.4,y1,2*s+2,.5,'#b89858');R(g,sx-.1,y1+.7,1.4,.8,'#231a15')}
  for(const sx of[108,147]){g.strokeStyle='#5a3a20';g.lineWidth=2.4;g.beginPath();g.ellipse(sx,65.8,3.8,6,0,0,6.2832);g.stroke();g.strokeStyle='#a8743e';g.lineWidth=.7;g.beginPath();g.ellipse(sx-.4,65.6,3.8,6,0,2.6,5);g.stroke()}
  ao(g,84,56,84,10,'t',.6);ao(g,84,56,7,48,'l',.45);ao(g,160,56,8,48,'r',.3);ao(g,84,96,84,8,'b',.35,'#0c0806');
  board6(g,82,48,2.4,57,'#6a4e2c',rw,1);board6(g,168,48,2.4,57,'#6a4e2c',rw,1);awning(g,80,41,92,9,earth6('#3f5a7a',.3),'#e6dcc4',8);ao(g,82,50,90,4,'t',.3,'#1a1420');shade(g,[80,104,172,104,180,111,88,111],SH,.5);
  /* the saddler's bench, out in the light */
  shadow6(g,129,105.6,26,1.6,.5,'#282040');R(g,104,95,50,10,'rgba(40,30,60,.16)');board6(g,105,95,3,11,'#6a4e2c',rw,1);board6(g,148,95,3,11,'#6a4e2c',rw,1);board6(g,102,90,52,4.6,'#96703e',rw);R(g,102,94.2,52,1.2,'#5a4226');
  /* a low wall along the water, and the poplars that drink from it */
  ashlar(g,186,92,114,12,'#cdbf9c',r,{bw:9,bh:4,v:.1,t:.3});R(g,186,91,114,1.4,'#eadcb6');
  poplar(g,196,92,50,'#5f8a4a',r);poplar(g,205,92,40,'#6a9450',r);poplar(g,290,92,54,'#5a8446',r);poplar(g,281,92,38,'#679252',r);
  /* the fountain: a spout in a stone pier, and a round basin worn by two hundred years of jars */
  shade(g,[222,106,270,106,280,112,232,112],SH,.5);g.fillStyle=lg(g,238,0,250,0,['#b8ae98','#eee6d0','#a8a090']);g.fillRect(238,66,12,32);R(g,236.6,64,14.8,2.6,'#f2ead6');R(g,236.6,66.4,14.8,.6,'#a8a094');
  R(g,241,80,6,3,'#7a7466');oval(g,244,81.6,1.4,1.3,'#2e2a26');
  g.fillStyle=lg(g,220,0,268,0,['#b0a690','#ece4cc','#d2c8b0','#928a78']);g.fillRect(220,95,48,11);oval(g,244,106,24,3,'#928a78');oval(g,244,95,24,3.6,'#f2ead6');oval(g,244,95.3,21.6,2.8,'#4f8cb4');oval(g,238,94.8,9,1.1,'#86bcd8');
  /* the yard of Xanthos the carrier: a wall of dressed stone, and a gateway wide enough for a loaded wagon */
  ashlar(g,300,34,138,70,ST,r,{bw:13,bh:6.4,v:.08,t:.3});for(let i=300;i<438;i+=9){R(g,i,30,5.6,4,ST);R(g,i,30,5.6,.5,'#f4e8c8')}R(g,300,33.6,138,1,'#a8987a');
  R(g,372,50,58,54,'#b8ac90');R(g,375,53,52,51,'#2a2018');g.fillStyle=lg(g,0,53,0,104,['#3a2e24','#6a5a44']);g.fillRect(377,55,48,49);
  for(const[sx,sy,sw,sh,c]of[[384,104,5,9,'#b8a880'],[394,104,5.6,11,'#c8b890'],[414,104,4.6,8,'#a89870']])sack(g,sx,sy,sw,sh,c);vessel(g,404,104,4,12,'#8a4a2a','amph',{noShadow:1});
  board6(g,372,50,58,3.4,'#6a4e2c',rw);R(g,372,53.2,58,.8,'#2a1c10');ao(g,377,55,48,12,'t',.6);ao(g,377,55,7,49,'l',.45);ao(g,418,55,7,49,'r',.3);ao(g,377,96,48,8,'b',.3,'#0c0806');
  /* tethering rings in the wall: small, so they are square, and a stone's shade under each */
  windowArt(g,318,46,9,9,ST,{bars:2});for(const x of[312,340]){R(g,x-1.4,94.6,2.8,2.8,'#4a443c');R(g,x-.5,95.5,1,1,tint(ST,-.06));R(g,x-1.4,97.4,2.8,.6,'rgba(40,30,50,.25)')}
  /* the south gate, and the road to Lycaonia */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48,{...GATE6,hz:66,sky:[72,SKY6(['#3c7ac8','#6ea4dc','#a8cae6','#e2e8dc'])]});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  ao(g,444,70,4,34,'l',.3,'#2a2440');ao(g,433,22,5,82,'r',.2,'#2a2440');
  /* paving */
  pave(g,0,103,480,144,'#d8ceb4',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88',t:.26});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[300,104,438,104,446,109,308,109],SH,.45);shade(g,[0,104,60,104,60,107,0,110],SH,.5);shade(g,[186,104,222,104,226,107,190,107],SH,.4);
  /* the light of the day: the sky, the plateau and the mountains keep it full; the saddler's front, the carrier's wall, the gate and the
     open paving take the sun; the lane behind us, the shop under its awning and the near paving lie in the day's cool shade */
  sunlight6(g,480,40,[[124,40,70,24,.6],[243,80,62,30,.7],[372,66,80,40,.55],[458,60,30,44,.5],[240,120,250,22,.62],[56,118,60,12,.3]],
    l=>{l.fillStyle='#ffffff';l.fillRect(186,0,114,92);comp(l,'multiply',1,()=>{ao(l,0,28,60,76,'l',.2,'#4a4468');R(l,84,52,84,52,'#ece6f0')})});
  pool(g,240,0,300,160,'#fff4d0',.1,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050')},
 fore(g){const r=rng(432);/* a wine jar and a heap of pack saddles at the street's edge */
  vessel(g,34,152,11,30,'#5a2e1e','amph',{noShadow:1});
  for(const[sx,c]of[[470,'#6a4428'],[494,'#7a5030']]){g.fillStyle=lg(g,sx,0,sx+26,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+13,150,14,13,0,Math.PI,0);g.fill()}
  sack(g,80,152,12,17,'#a8a090');for(let i=0;i<16;i++){const sx=540+r()*60;stroke(g,[sx,150,sx+(r()-.5)*5,138-r()*6],'#4f6c3a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* water from the spout, and rings on the basin */
  const f=t/90;R(g,243.2,83,1.6,11,'#a8d8ec');for(let i=0;i<3;i++)R(g,243.2,83+((f+i*3.4)%10),1.6,1.2,'#f0fafe');
  for(let i=0;i<3;i++){const k=((t/460+i*.33)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(244,95.2,1.4+k*12,.3+k*1.6,0,0,6.2832);g.stroke()}
  /* the cover for the wagon: on the bench until it is finished, on the wagon once it is delivered */
  if(!F.sewn){g.fillStyle=lg(g,0,84,0,91,['#4a3e34','#2e2620','#1a1410']);g.beginPath();g.moveTo(106,90.4);g.bezierCurveTo(108,82,124,81,130,85);g.bezierCurveTo(138,80,148,83,150,90.4);g.closePath();g.fill();
    poly(g,[146,88,154,92,154,100,149,95],'#241c18');for(let i=0;i<40;i+=3)R(g,108+i,85+Math.sin(i)*1.2,.5,5,'rgba(255,240,210,.08)');R(g,151.4,97,2.2,2.2,'#6a5a48')}
  wagon(g,310,110,!!F.paid,0)},
 front(){}};
/* ---------- Lystra: the open place inside the gate, where the well is ---------- */
const lyhill=x=>14+6*Math.sin(x/43+2)+3*Math.sin(x/17)+1.4*Math.sin(x/6);
ART.lystra={w:480,fp:1.3,q:12,
 paint(g){const r=rng(443),rw=rng(4431),rc=rng(4432),ST='#c8b890',MB='#d8c49a',MB2='#cdb68a';
  sky(g,480,74,SKY6(['#4080c8','#74aadc','#b0cee6','#e8e8d4']));cloud(g,290,12,56,7,r);cloud(g,410,22,40,5,r);cloud(g,170,8,36,5,r);
  /* the valley beyond the wall: hills, fields, and the Taurus far to the south */
  snowy(g,236,480,68,x=>22+8*Math.sin(x/61+3)+4*Math.sin(x/19)+2*Math.sin(x/7),['#7f90bc','#9eaccc','#c0c8cc'],28);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,40,0,70,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(236,40,244,30)});
  ridge(g,236,480,70,lyhill,['#8fa468','#a2b274']);
  g.fillStyle=lg(g,0,68,0,104,['#b8bc78','#a8b464','#98aa58']);g.fillRect(236,68,244,36);tex(g,'mott',.5,236,68,244,36,'overlay',1);
  for(let i=0;i<10;i++){const fx=238+i*24+r()*8,fy=71+r()*9;poly(g,[fx,fy,fx+26,fy-1,fx+33,fy+8,fx+3,fy+9],i%3===0?'rgba(226,204,112,.46)':i%3===1?'rgba(96,140,70,.36)':'rgba(176,136,86,.32)')}
  for(const[x,y]of[[252,82],[300,78],[328,84],[452,80],[470,86]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#6f8a58',r,20)}
  /* the wall of the colony, and the gate that leads out to the valley */
  ashlar(g,0,22,100,82,ST,r,{bw:12,bh:6,v:.1,t:.4});for(let i=0;i<98;i+=9){R(g,i,17.6,5.6,4.4,ST);R(g,i,17.6,5.6,.5,'#eadcb4')}R(g,0,21.6,100,1,'#98886a');
  arch(g,26,48,48,56,'#b2a27c');gateView(g,29,51,42,53,{...GATE6,hz:69,sky:[74,SKY6(['#4080c8','#74aadc','#b0cee6','#e8e8d4'])],rise:6});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,50+Math.cos(a)*24-.3,72+Math.sin(a)*24-1,.6,2.6,'#98886a')}
  ao(g,29,72,5,32,'l',.3,'#2a2440');
  poly(g,[100,17.6,105,21,105,104,100,104],'#9a94a8');
  /* a house of mud brick and timber, and beside it the house of Lois. The plaster's random cracks are set by hand now, high on the walls
     where they run to no head (their draws are still taken), and no iron band lies across the planks of a door. */
  house(g,105,32,58,72,MB2,r,{side:0,patch:4,cracks:0,beams:10,brick:'#a8875a'});skipCracks6(r,5);for(const[x,y,n]of[[110,37,3],[148,38,2]])crack6(g,x,y,n,rc,.9);
  windowArt(g,118,46,9,9,MB2,{bars:2,wood:'#6a4e2c'});R(g,138,66,18,38,'#bca67c');doorArt(g,140,68,14,36,'#6a4a2c',r,{pw:4.6,bands:[]});
  house(g,163,26,73,78,MB,r,{side:0,patch:3,cracks:0,beams:11,brick:'#a8875a'});skipCracks6(r,4);for(const[x,y,n]of[[167,31,3],[198,30.4,3],[231,32,3]])crack6(g,x,y,n,rc,.9);
  windowArt(g,172,42,10,10,MB,{bars:2,wood:'#6a4e2c'});windowArt(g,216,42,10,10,MB,{bars:2,wood:'#6a4e2c'});
  R(g,187,60,28,44,'#c8b288');doorArt(g,190,63,22,41,'#7a5a3a',r,{bands:[]});R(g,186,102.6,30,1.6,'#e0d2ac');
  stroke(g,[216,104,217,86,215,70,219,58],'#5a4630',1.2);foliage(g,206,57,15,4.6,'#5f8a4a',r,50);foliage(g,221,64,4.6,8,'#527c40',r,22);
  /* a low wall at the edge of the hill, and the country beyond it */
  ashlar(g,236,92,244,12,'#c4b48c',r,{bw:9,bh:4,v:.11,t:.34});R(g,236,91,244,1.4,'#e2d4aa');
  /* a farmer's stall against the last house: grain, and the fruit of the valley */
  house(g,392,36,88,68,MB2,r,{side:0,patch:3,cracks:0,beams:10,brick:'#a8875a'});skipCracks6(r,4);for(const[x,y,n]of[[398,41,3],[436,40.6,2]])crack6(g,x,y,n,rc,.9);
  windowArt(g,452,48,9,9,MB2,{bars:2,wood:'#6a4e2c'});R(g,404,68,18,36,'#bca67c');doorArt(g,406,70,14,34,'#6a4a2c',r,{pw:4.6,bands:[]});
  board6(g,428,56,2.2,50,'#6a4e2c',rw,1);board6(g,476,56,2.2,50,'#6a4e2c',rw,1);awning(g,426,50,54,8,'#8a6a3a','#e6dcc4',7);ao(g,428,58,52,5,'t',.3,'#1a1420');shade(g,[426,104,480,104,480,111,434,111],SH,.5);
  shadow6(g,454,104.6,23,1.6,.5,'#282040');R(g,432,96,44,8,'rgba(40,30,60,.16)');board6(g,430,92,48,4,'#96703e',rw);R(g,430,95.8,48,1,'#5a4226');ao(g,430,96.8,48,3,'t',.3,'#1a1420');
  for(const[bx,c]of[[436,'#b84a34'],[448,'#c9a23a'],[460,'#6a8a3a'],[471,'#8a4a6a']]){vessel(g,bx,92,4.6,4.4,'#a8844e','bowl',{noShadow:1});for(let i=0;i<6;i++)oval(g,bx-3+r()*6,86.6+r()*1.6,1.2,1,tint(c,(r()-.5)*.3))}
  sack(g,418,106,6,11,'#d8c698');sack(g,426,107,5.4,9,'#cdbb8c');
  /* the well: a curb of field stone, two posts and a beam. The rope is wound on the beam and runs slanting down to the curb: a rope hanging
     straight from the middle of the beam would make a T of it. */
  shade(g,[262,107,300,107,310,113,272,113],SH,.5);
  board6(g,265,72,2.4,24,'#6a4e2c',rw,1);board6(g,293.6,72,2.4,24,'#6a4e2c',rw,1);board6(g,262,70,36,2.6,'#7a5c36',rw);ao(g,265,72.6,31,2,'t',.25,'#1a1420');
  ashlar(g,264,95,33,12,'#b8ac94',r,{bw:7,bh:4,v:.14,t:.4});oval(g,280.5,107,16.5,2.4,'#8a8270');oval(g,280.5,95,16.5,3.2,'#d8ceb6');oval(g,280.5,95.3,13.6,2.3,'#1e1a1c');
  ao(g,264,103,33,4,'b',.25,'#2a2030');
  /* the rope wound on the beam: one swelling of coils, their turns slanting, nothing standing up across the beam */
  {const x0=274.6,x1=283,y0=69.4,y1=73.2;R(g,x0,y0,x1-x0,y1-y0,'#8a7450');R(g,x0,y0,x1-x0,.6,'#b8a070');R(g,x0,y1-.6,x1-x0,.6,'#5a4a30');
    clipTo(g,()=>{g.beginPath();g.rect(x0,y0,x1-x0,y1-y0)},()=>{for(let i=-4;i<x1-x0;i+=1.6)stroke(g,[x0+i,y1,x0+i+3.8,y0],'rgba(60,44,24,.45)',.4)})}
  stroke(g,[283,73,286,84,290,95.6],'#8a7450',.8);
  vessel(g,304,108,4,7,'#7a5a34','bowl',{noShadow:1});shadow6(g,305,108.2,5,1,.4,'#282040');R(g,301.6,100.4,4.8,.8,'#5a4226');
  /* the ground: trodden earth, paved only round the well */
  earth(g,0,103,480,144,'#c8b48a',r,220);ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  for(let i=0;i<26;i++){const a=r()*6.28,d=18+r()*16;oval(g,280+Math.cos(a)*d*1.5,111+Math.abs(Math.sin(a))*d*.3,3+r()*2,1+r()*.6,r()<.5?'#b4a88e':'#d2c6aa')}
  shade(g,[0,104,105,104,120,112,0,114],SH,.55);shade(g,[105,104,236,104,242,108,111,108],SH,.4);
  /* the light of the day: the sky and the valley keep it full; the houses, the well and the open ground take the sun; the wall's foot, the
     doorways and the stall under its awning lie in the day's cool shade */
  sunlight6(g,480,40,[[180,52,90,34,.58],[60,40,56,22,.5],[280,96,40,20,.5],[440,62,50,30,.5],[270,122,250,22,.62]],
    l=>{l.fillStyle='#ffffff';l.fillRect(236,0,244,92);comp(l,'multiply',1,()=>{ao(l,0,22,30,82,'l',.14,'#4a4468');ao(l,426,58,54,46,'t',.14,'#4a4468')})});
  pool(g,300,0,300,160,'#fff4d0',.1,'screen');ao(g,0,0,100,144,'l',.1,'#2a2050')},
 fore(g){const r=rng(444);/* a heap of straw, a wine jar, and thistles at the roadside */
  for(let i=0;i<70;i++){const sx=40+r()*60;stroke(g,[sx,152,sx+(r()-.5)*14,132+r()*10],r()<.5?'#c8b060':'#a89048',1)}
  vessel(g,560,152,10,26,'#5a2e1e','amph',{noShadow:1});rock(g,26,152,30,14,'#7a7468');
  for(let i=0;i<20;i++){const sx=590+r()*46;stroke(g,[sx,150,sx+(r()-.5)*5,136-r()*8],'#4f6c3a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* the man who has never walked: he sits by the well with his back to its curb, a blanket over his feet */
  if(!F.healed)depth(111.4,()=>{g.save();g.beginPath();g.rect(300,60,40,50);g.clip();man(g,324,127.4,'lame',-1,0,null,0,0);g.restore();
    oval(g,316,111.4,20,2.2,'rgba(30,26,50,.3)');poly(g,[297,111,298,107.4,303,105.6,313,105.4,323,103.6,333,105.6,337,111],'#7a5a4a');poly(g,[297,111,298,107.4,303,105.6,313,105.4,323,103.6,322,111],'#94705c');
    for(let i=0;i<6;i++)R(g,302+i*5.6,106.8+(i%2)*.6,.6,3.6,'rgba(40,24,20,.4)');R(g,297,110.4,40,.9,'#5a4034')});
  /* the people of Lystra, when they come running: first they face the well, then the gate */
  if(G.crowd)CROWD.forEach(([id,x,y],i)=>man(g,x,y+((Math.floor(t/700)+i)%5===0?-.6:0),id,G.bulls?-1:1,0,null,G.crowd>1&&(Math.floor(t/500)+i)%3===0?1:0,7));
  /* the bulls, garlanded, brought to the gates (Acts 14:13) */
  /* side by side, the far one half a head in front, so that neither hides the other's head */
  if(G.bulls){cattle(g,51,112.6,1,0,'#d8c8b0',1);cattle(g,44,116.4,1,0,'#e6dccc',1)}},
 front(){}};
/* ---------- Outside Lystra, at dusk ---------- */
ART.outside={w:320,q:12,
 /* the stones at the roadside that lie a little way out on the ground */
 props:[[82,113,7,4],[104,113,6,3.6],[61,113.4,6,3.4]].map(([x,y,w,h])=>({y,shape:g=>rock(g,x,y,w,h,'#7c7078')})),
 light:()=>({amb:'#e8b49c'}),
 paint(g){const r=rng(457);
  sky(g,320,86,SKY6(['#27356e','#5a4f8e','#b0667a','#e8905a','#f6c878']));pool(g,70,84,90,26,'#ffe0a0',.5,'screen');
  for(const[cx,cy,w]of[[210,22,60],[110,36,44],[280,44,34]])cloud(g,cx,cy,w,5,r,'#f0a888','#6a5a94');
  ridge(g,0,320,84,x=>14+7*Math.sin(x/53+1)+3*Math.sin(x/19),['#5a4a7c','#74608a']);ridge(g,0,200,86,x=>6+3*Math.sin(x/23+2),['#4a4468','#5a5270']);
  /* Lystra on its low hill: the wall, the gate, a lamp already lit inside it */
  ridge(g,150,320,90,x=>Math.max(0,22-(x-262)*(x-262)/560),['#5c5270','#6a6078']);
  ashlar(g,196,46,124,34,'#8a7c88',r,{bw:10,bh:5,v:.08,t:.4,m:'#4a4058'});for(let i=196;i<320;i+=8)R(g,i,42.4,4.6,4,'#8a7c88');R(g,196,45.6,124,1,'#5a5068');
  for(const[hx,hy,hw,hh]of[[206,36,16,10],[232,32,14,14],[292,35,18,11]]){R(g,hx,hy,hw,hh,'#7a6c80');R(g,hx,hy-1.6,hw,2,'#6a4a50');R(g,hx+hw-3,hy,3,hh,'#5a5068')}
  /* the gate: an opening in the wall, its dressed stones flush with the wall's top, under the wall's own battlement, so that no tower
     rises from the middle of the wall */
  R(g,252,46.6,26,33.4,'#94869a');arch(g,257,54,16,26,'#2a2238');
  /* the lamp inside the gate: its light lies long and low across the gateway's floor, never round where a head could come */
  clipTo(g,()=>arch(g,257,54,16,26),()=>{pool(g,265,76,10,4,'#ffb860',.8,'screen');pool(g,265,72,6,3,'#ffd8a0',.4,'screen');ao(g,257,54,16,8,'t',.5,'#0c0814')});
  /* the valley floor: stubble, and the road that runs up to the gate */
  g.fillStyle=lg(g,0,80,0,110,['#7a6c68','#8a7a64','#96845e']);g.fillRect(0,80,320,30);tex(g,'mott',.32,0,80,320,30,'overlay',1);tex(g,'wood',.12,0,80,320,30,'overlay',.5);
  poly(g,[257,80,273,80,250,96,212,108,150,110,196,98,240,88],'#b89c78');
  earth(g,0,108,320,144,'#9a8468',r,160);ao(g,0,108,320,6,'t',.3,'#2a2048');
  for(let i=0;i<2;i++)stroke(g,[0,118+i*8,110,117+i*8,230,118.6+i*8,320,118+i*8],'rgba(70,56,60,.3)',.8);
  /* a wild pear, bare already, and the stones of a field wall that has fallen */
  stroke(g,[38,110,37,92,41,78,36,64],'#3a3040',3);stroke(g,[39,92,48,80,56,74],'#3a3040',1.6);stroke(g,[38,84,28,72,22,68],'#3a3040',1.6);stroke(g,[40,74,46,62,45,54],'#3a3040',1.2);stroke(g,[37,70,30,58],'#3a3040',1);
  for(const[x,y,w,h]of[[70,112,9,5],[82,113,7,4],[92,111.6,10,6],[104,113,6,3.6],[61,113.4,6,3.4]])rock(g,x,y,w,h,'#7c7078');
  /* the light is going: long shadows, and a warm edge on everything that faces west */
  comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['#f0d0b0','#c0a8c8']);g.fillRect(0,86,320,58)});
  /* the light that is left: the sky keeps all of it; the afterglow low in the west warms the stubble and the side of everything that faces
     it, the wall of Lystra takes a last warm edge, the east and the ground nearest us go into the dusk */
  lightmap(g,320,'#c8b8c8',l=>{R(l,0,0,320,80,'#ffffff');l.fillStyle=lg(l,0,80,0,94,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,80,320,14);
    pool(l,70,98,140,34,'#ffe4c8',.75);pool(l,150,118,150,20,'#f8dcc8',.5);pool(l,232,62,60,20,'#f0d8d0',.4);pool(l,42,92,30,26,'#ffe0c0',.4);
    comp(l,'multiply',1,()=>{ao(l,196,40,124,46,'r',.22,'#3a3458');ao(l,0,124,320,20,'b',.3,'#3a3458')})});
  pool(g,60,96,150,60,'#ffc890',.24,'screen');ao(g,200,0,120,144,'r',.2,'#1a1838')},
 fore(g){const r=rng(458);rock(g,300,150,34,16,'#4a4458');for(let i=0;i<40;i++){const sx=r()*320;stroke(g,[sx,150,sx+(r()-.5)*6,136-r()*8],r()<.5?'#5a5440':'#3a3848',.8)}
  comp(g,'source-atop',.5,()=>R(g,0,0,320,150,'#2a2450'))},
 draw(g,t){/* the stones that were thrown, lying where they fell */
  for(const[x,y,w,h]of[[118,127,5,3],[134,131,6,3.4],[150,124,4.6,2.6],[164,130,5.6,3],[176,126,4,2.4],[142,121,4,2.2],[126,134,5,2.8]])depth(y,()=>rock(g,x,y,w,h,'#8a7c7c'));
  /* Paul, as they left him: face down, his mantle over him. Those who stand around him stand behind him or before him, by where their feet are */
  if(G.down)depth(129,()=>{const x=0,y=0,L='#e8b49c',sk=mul('#c08a5c',L),cl=mul('#6e4a2e',L),tu=mul('#c4b08a',L),hr=mul('#2a1a12',L);
    g.save();g.translate(132,129);g.scale(1,1.4);oval(g,x+25,y+.4,29,2,'rgba(20,16,40,.42)');
    R(g,x+41,y-3.5,9,2.5,sk);R(g,x+41,y-1.5,9,.5,tint(sk,-.3));R(g,x+49.5,y-5,2.5,5,sk);R(g,x+51.5,y-5,.5,5,'#2a1810');R(g,x+36,y-4.5,6,4.5,tu);R(g,x+36,y-1,6,1,tint(tu,-.3));
    poly(g,[x+7,y,x+8,y-4.6,x+14,y-6.6,x+26,y-7,x+35,y-5.6,x+38,y-3,x+38.6,y],cl);poly(g,[x+8,y-4.6,x+14,y-6.6,x+26,y-7,x+35,y-5.6,x+33,y-4.4,x+24,y-5.4,x+14,y-5],tint(cl,.22));
    for(const fx of[16,23,30])stroke(g,[x+fx,y-6.4,x+fx+1.6,y-.6],tint(cl,-.35),.6);R(g,x+7,y-1,31.5,1,tint(cl,-.45));
    R(g,x+10,y-2.5,9,2,sk);R(g,x+18.5,y-3,2.5,2.5,sk);R(g,x+10,y-.5,11,.5,tint(sk,-.35));
    oval(g,x+4,y-3.4,3.4,3.2,sk);poly(g,[x+.4,y-3.4,x+1.2,y-6,x+4,y-7,x+6.6,y-6,x+5,y-5,x+2.4,y-4.4,x+1.6,y-1.4],hr);oval(g,x+6.4,y-1.8,2,1.5,hr);g.restore()});
  g.save();arch(g,257,54,16,26);g.clip();pool(g,265,76,7+Math.sin(t/230),3,'#ffb860',.25,'screen');g.restore()},
 front(){}};
/* ---------- Lystra: the house of Lois and Eunice ---------- */
/* the low table of the house at Lystra, and the supper on it by night. It stands out on the mat, so it is a prop as well: whoever walks behind it is hidden by it */
function lowTable(g,day){const rt=rng(4621);board6(g,170,112,40,3,'#96703e',rt);board6(g,172,115,2.6,8,'#5a4226',rt,1);board6(g,205,115,2.6,8,'#5a4226',rt,1);
  if(!day){vessel(g,182,112,4.6,3.6,'#a8844e','bowl',{noShadow:1});g.fillStyle=lg(g,0,107,0,112,['#e8c078','#c9a060','#8a6630']);g.beginPath();g.ellipse(197,110.4,5.6,2.2,0,0,6.2832);g.fill()}}
ART.house6={w:320,q:12,
 variant:()=>F.back?'d':'n',
 props:[{y:123,shape:(g,v)=>lowTable(g,v==='d')}],
 light:()=>F.back?{amb:'#f0e8dc',wallY:103}:{amb:'#7c6f86',wallY:103,wall:[[0,52,103,11],[52,68,103,45],[68,320,103,11]],lamps:[[150,58,60,'#7a5420',103,59.4],[92,96,46,'#7a3c14',103,100]]},
 paint(g,v){const r=rng(461),rw=rng(4611),rc=rng(4612),W='#d8c8a4',day=v==='d';
  /* the plaster's random cracks are set by hand now, high on the wall where they run to no head; their draws are still taken */
  plaster(g,0,0,320,104,W,r,{patch:4,cracks:0,brick:'#a8875a',t:.36});skipCracks6(r,6);
  for(const[x,y,n]of[[24,15,4],[118,14.6,3],[196,15.4,4],[246,16,3],[306,15,3]])crack6(g,x,y,n,rc);
  /* the ceiling, seen from below at its edge: the boards dark between the joists, the joists running toward us, and the wall plate they
     lie on */
  plank6(g,0,0,320,8,'#3e2e22',rw);ao(g,0,0,320,4,'t',.4,'#0c0808');
  joists6(g,8.5,36,rng(4614),{boards:0});burn6(rw,14,34,6,8);
  board6(g,0,8,320,2.4,'#6a4e2c',rw);ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* a window on the lane */
  windowArt(g,52,28,16,16,W,{dark:day?'#bfe0f4':'#141c3c',bars:2,wood:'#6a4e2c'});if(!day){R(g,57,33,1,1,'#f4f0d8');R(g,64,39,.6,.6,'#d8d4c0')}
  /* a niche for the lamp, and under it a shelf of household jars */
  arch(g,142,44,16,20,tint(W,-.34));arch(g,143.6,45.6,12.8,18.4,'#4a3828');clipTo(g,()=>arch(g,143.6,45.6,12.8,18.4),()=>ao(g,143.6,45.6,12.8,8,'t',.5,'#0c0808'));
  R(g,146,60.6,8,2.4,'#b8733c');R(g,146,60.6,8,.6,'#e0a064');R(g,152.6,59.6,2.2,1.4,'#b8733c');
  board6(g,172,62,58,2.4,'#7a5c36',rw);ao(g,172,64.4,58,4,'t',.3,'#2a2030');R(g,174,64.4,2,6,'#5a4226');R(g,226,64.4,2,6,'#5a4226');
  vessel(g,182,62,4,10,'#a05a34','jug');vessel(g,196,62,5,8,'#8a6a44','jar');vessel(g,210,62,3.6,9,'#b8733c','jug');vessel(g,222,62,4,6,'#7a5a3a','bowl');
  /* the hearth in the corner, built of field stone */
  ashlar(g,78,92,30,12,'#a89c88',r,{bw:7,bh:4,v:.14,t:.3});R(g,78,91,30,1.4,'#cfc4ac');R(g,82,94,22,8,'#1c1412');poly(g,[84,102,88,97,96,96,102,102],'#3a2a22');ao(g,82,94,22,3,'t',.5,'#000000');
  poly(g,[80,91,84,40,102,40,106,91],'rgba(30,20,20,.28)');
  /* a bench along the wall, its legs at its ends, with a blanket folded on it: three thicknesses of one width, the fold at the left */
  shadow6(g,37,104,32,1.6,.5,'#201828');R(g,6,90,62,14,'rgba(40,30,60,.14)');board6(g,6,86,62,4,'#8a6a40',rw);ao(g,8,90,58,4,'t',.35,'#1a1420');board6(g,8,90,3,14,'#5a4226',rw,1);board6(g,63,90,3,14,'#5a4226',rw,1);
  {const b='#8a5446';R(g,37.4,82,1.4,4,'rgba(30,22,30,.25)');for(let i=0;i<3;i++){const yy=86-(i+1)*1.54;R(g,14,yy,24,1.54,tint(b,i*.06-.04));R(g,14,yy,24,.5,tint(b,.22));R(g,14,yy+1.04,24,.5,tint(b,-.35))}R(g,13.6,81.4,.8,4.6,tint(b,.1))}
  /* the door to the lane: three planks in their frame, nothing laid across them */
  R(g,266,48,34,56,'#c4b48e');doorArt(g,269,51,28,53,'#6a4a2c',r,{left:1,bands:[]});
  /* a great jar of water by the door */
  vessel(g,250,106,7,20,'#9a5a36','pithos');
  /* the floor: beaten earth, and a woven mat where the household eats. Its few stripes are soft and lie only at its ends, beyond the
     table's legs, so that no leg stands across a band */
  earth(g,0,103,320,144,'#b8a482',r,90);ao(g,0,103,320,6,'t',.4,'#3a3050');ao(g,0,92,320,12,'b',.18,'#2a2030');
  clipTo(g,()=>poly(g,[128,112,240,112,252,130,116,130]),()=>{R(g,116,112,136,18,'#9a6a4a');for(const[y,c]of[[113.4,'#b08a5c'],[125.6,'#7a5040'],[127.8,'#b08a5c']])R(g,116,y,136,1.1,c);tex(g,'mott',.3,116,112,136,18,'overlay',1);ao(g,116,112,136,5,'t',.25)});
  /* a low table with the supper on it */
  shadow6(g,190,123.4,22,1.6,.55,'#1e1428');lowTable(g,day);
  /* the light: by day the window's shaft and the open door; by night the lamp in its niche, which lights outward and downward and leaves
     the wall above its arch in shade, and the fire on the hearth. In both the corners, the ceiling and the foot of the walls are darker. */
  const corners=l=>comp(l,'multiply',1,()=>{ao(l,0,0,30,104,'l',.3,'#3a3050');ao(l,290,0,30,104,'r',.24,'#3a3050');ao(l,0,0,320,22,'t',.3,'#3a3050');ao(l,0,128,320,16,'b',.26,'#3a3050')});
  if(day)lightmap(g,320,'#b8b0a8',l=>{pool(l,60,36,30,26,'#fff8e4',1);l.fillStyle=lg(l,0,44,0,140,['rgba(255,244,210,.5)','rgba(255,244,210,0)']);poly(l,[52,44,68,44,150,140,70,140]);l.fill();
      pool(l,283,80,40,60,'#fff4dc',.7);pool(l,160,120,170,44,'#fff0d8',.5);pool(l,110,126,44,10,'#fff6e4',.4);corners(l)});
  else lightmap(g,320,'#5a5068',l=>{nicheLight(l,150,62,62,34,'#ffc070',.95);pool(l,92,98,52,40,'#ff9a48',.8);pool(l,92,86,30,10,'#ff9a48',.3);pool(l,170,122,120,30,'#ffd090',.35);pool(l,60,36,16,14,'#8090c8',.5);corners(l)})},
 fore(g){/* the edge of a storage chest, nearest us */
  const rf=rng(4613);board6(g,0,134,58,10,'#3a2c20',rf);R(g,0,134,58,.8,'#7a6248');R(g,56,134,2,10,'#241a12');board6(g,262,138,58,6,'#3a2c20',rf);R(g,262,138,58,.8,'#7a6248')},
 draw(g,t){if(!F.back){flame(g,153.6,59.4,t);pool(g,152.6,61,7+Math.sin(t/190),3,'#ffb050',.16);for(let i=0;i<3;i++)flame(g,88+i*5,100.6-(i%2),t+i*230,i===1);pool(g,93,97,16+Math.sin(t/160)*1.4,9,'#ff8a3a',.2)}
  else{/* the older men of Lystra and the rest of the congregation, come in from the lanes */
    for(const[id,x,y,d]of GATHER)man(g,x,y,id,d,0,'#f0e8dc',0,7)}},
 front(){}};
/* ---------- Derbe: the east road, after the harvest ---------- */
const taur6=x=>38+12*Math.sin(x/71+2.2)+6*Math.sin(x/27+1)+3*Math.sin(x/9);
ART.derbe={w:320,q:12,
 paint(g){const r=rng(467),ST='#d2c4a0';
  sky(g,320,80,SKY6(['#3e7cc8','#74a8dc','#b4cee4','#ece8d0']));cloud(g,140,14,60,7,r);cloud(g,250,8,40,5,r);cloud(g,60,26,36,5,r);
  /* the Taurus, close now: the road east runs for the gap in it */
  snowy(g,60,320,76,taur6,['#7f8ebc','#9eaacb','#c2c8cc'],32);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,30,0,76,['rgba(226,222,200,0)','rgba(226,222,200,1)']);g.fillRect(60,30,260,46)});
  ridge(g,60,320,78,x=>8+4*Math.sin(x/31+1)+2*Math.sin(x/11),['#a0a878','#b2b486']);
  /* the wall and the east gate of Derbe */
  ashlar(g,0,26,78,78,ST,r,{bw:12,bh:6,v:.09,t:.35});for(let i=0;i<76;i+=9){R(g,i,21.6,5.6,4.4,ST);R(g,i,21.6,5.6,.5,'#f0e4c0')}R(g,0,25.6,78,1,'#a09070');
  arch(g,18,50,42,54,'#b8a880');g.save();arch(g,21,53,36,51);g.clip();R(g,21,53,36,51,'#cfc2a0');for(const[hx,hy,hw,hh,c]of[[21,62,12,42,'#d6caa8'],[44,58,13,46,'#e2d6b4'],[32,70,13,34,'#c8bc9c']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.2,'#b8603c')}
  poly(g,[28,104,52,104,44,84,36,84],'#e0d6ba');ao(g,21,53,36,12,'t',.55,'#2a2440');ao(g,21,53,5,51,'l',.5,'#2a2440');ao(g,21,96,36,8,'b',.22,'#2a2440');g.restore();
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,39+Math.cos(a)*21-.3,71+Math.sin(a)*21-1,.6,2.6,'#a09070')}poly(g,[78,21.6,83,25,83,104,78,104],'#a39cae');
  /* the fields: stubble as far as the hills, and one field already under the plow */
  g.fillStyle=lg(g,0,76,0,106,['#d0c084','#d6c074','#ccb468']);g.fillRect(83,76,237,30);tex(g,'mott',.34,83,76,237,30,'overlay',1);
  poly(g,[196,82,262,80,300,92,214,96],'rgba(120,84,54,.5)');for(let i=0;i<9;i++)stroke(g,[200+i*7,82.6-i*.2,220+i*9,95.6-i*.4],'rgba(70,46,30,.35)',.5);
  for(let i=0;i<120;i++){const sx=84+r()*236,sy=78+r()*27;R(g,sx,sy,.5,1+r()*1.4,r()<.5?'#e8d898':'#a89858')}
  /* the threshing floor: a ring of flat stones, a heap of grain and a heap of chaff */
  oval(g,152,97,40,6.4,'#b8ac90');oval(g,152,96.6,38,5.6,'#d8ccae');for(let i=0;i<18;i++){const a=i/18*6.2832;oval(g,152+Math.cos(a)*34,96.6+Math.sin(a)*4.8,3.4,1,i%2?'#c4b898':'#e6dcc0')}
  g.fillStyle=lg(g,128,0,152,0,['#f0d480','#d8b458','#a8843c']);poly(g,[126,96,139,84,152,96]);g.fill();g.fillStyle=lg(g,160,0,186,0,['#f4ecc8','#e2d6a8','#b8aa7c']);poly(g,[158,97,173,88,188,97]);g.fill();
  stroke(g,[190,97,198,80],'#6a4e2c',1);stroke(g,[196.4,80.6,199.6,80,201,84],'#8a6a40',.8);
  /* a milestone on the road east */
  shadow6(g,304,108.6,6,1.2,.4,'#2a2050');g.fillStyle=lg(g,299,0,306,0,['#b8b0a0','#f0eade','#a8a094']);g.fillRect(299,94,7,14);oval(g,302.5,94.2,3.5,1.6,'#f0eade');for(const y of[98,100.4,102.8])R(g,300.6,y,3.8,.6,'#8a8474');
  /* the road */
  g.fillStyle=lg(g,0,104,0,128,['#d2c298','#e6d8b0','#d8c8a0']);g.fillRect(0,104,320,24);
  /* the road's dust: a low mottle and the grain of the wheels and feet that run along it, never across */
  tex(g,'mott',.24,0,104,320,24,'overlay',1);tex(g,'wood',.16,0,104,320,24,'overlay',.5);R(g,83,104,237,.8,'#a89a74');
  for(let i=0;i<60;i++){const sx=r()*320,sy=106+r()*20;oval(g,sx,sy,1+r()*1.6,.5+r()*.4,r()<.5?'#bcae86':'#f0e4c0')}
  for(let i=0;i<2;i++)stroke(g,[0,113+i*8,100,112.6+i*8,220,113.6+i*8,320,113+i*8],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,127,0,144,['#b8a868','#a09858','#8a8848']);g.fillRect(0,127,320,17);tex(g,'mott',.3,0,127,320,17,'overlay',1);tex(g,'vert',.14,0,127,320,17,'overlay',.5);
  for(let i=0;i<180;i++){const sx=r()*320,sy=128+r()*16;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#d8c880':'#7a7a44',.5)}
  shade(g,[0,104,83,104,98,112,0,114],SH,.55);
  /* the light of the day: the sky and the Taurus keep it full; the stubble, the threshing floor and the road lie in the sun, a cloud throws
     its soft shade across the far fields, and the town wall, turned from the sun, and the near verge are a little cooler */
  sunlight6(g,320,62,[[190,94,130,16,.6],[150,116,170,14,.6],[40,46,40,30,.3]],
    l=>comp(l,'multiply',1,()=>{pool(l,250,84,40,5,'#c4c2d2',.45,'source-over');ao(l,0,26,83,78,'r',.12,'#4a4468')}));
  pool(g,210,0,240,150,'#fff0c8',.12,'screen');ao(g,0,0,70,144,'l',.1,'#2a2050')},
 fore(g){const r=rng(468);rock(g,22,150,30,14,'#8a8478');for(let i=0;i<40;i++){const sx=r()*320;stroke(g,[sx,150,sx+(r()-.5)*5,137-r()*7],r()<.5?'#a89850':'#c8b868',.8)}
  comp(g,'source-atop',.36,()=>R(g,0,0,320,150,'#34305a'))},
 draw(g,t){/* chaff on the wind; Zenon's wagon, loaded for the road east */
  for(let i=0;i<9;i++){const k=((t/2600+i*.111)%1);R(g,176+k*60+Math.sin(i*2.1)*6,90-k*14-Math.sin(k*9+i)*3,1,.6,`rgba(244,236,200,${.8*(1-k)})`)}
  /* the far ox, the wagon and its pole, the near ox, and the yoke that lies across both their necks */
  depth(111,()=>{cattle(g,266,108.6,1,0,'#6f4630',0);wagon(g,174,110,-1,1);cattle(g,262,111,1,0,'#8a5a3a',0);
    R(g,275,79,5,2.5,'#5a3e22');R(g,275,79,5,.5,'#a8845a');R(g,279.5,77.5,1.5,1.5,'#5a3e22')});depth(112,()=>bundles(g,60,112))},
 front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#58483a',beard:'#58483a',grey:'#8a8076',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  /* a saddler of Iconium, a Jew: a head cloth, and a tunic the color of his own leather */
  nathan:{skin:'#b47e52',wrap:'#c8b48a',beard:'#3a2a1a',brow:'#2a1a12',tunic:'#8a5a34',belt:'#3a2414',trim:'#5a3a20',ph:1300},
  /* a Greek carrier of Iconium: bareheaded, a short beard, a good mantle */
  xanthos:{skin:'#c69870',hair:'#6a5030',beard:'#6a5030',brow:'#4a3420',tunic:'#d8c890',cloak:'#7a3f2a',long:1,belt:'#5a3a20',trim:'#8a6a2a',ph:2100},
  tatia:{skin:'#d0a27a',veil:'#c8a25a',tunic:'#5f7a6a',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#c8b890',brow:'#3a2414',ph:700},
  /* a boy of Lystra, some years short of a man's height */
  timothy:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,h:1,ph:1700},
  eunice:{skin:'#c89a70',veil:'#7a8ab0',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#5a6a8a',brow:'#3a2414',ph:2500},
  lois:{skin:'#b88a62',veil:'#e2dccb',tunic:'#6a5a70',long:1,belt:'#4a3a24',slim:1,longSleeve:1,trim:'#8a7a8a',brow:'#8a8a8a',ph:3100},
  lame:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#9a8a6a',belt:'#3a2a1a',trim:'#6a5a3a',brow:'#1a1210',ph:400},
  /* the priest of Zeus: white from head to foot, and no image or emblem on him */
  priest:{skin:'#c08c5c',wrap:'#f0ece0',beard:'#b8b8b8',brow:'#7a7a7a',tunic:'#f0ece0',long:1,belt:'#c9a23a',trim:'#c9a23a',ph:2900},
  /* a carter of Derbe */
  zenon:{skin:'#9a6238',hair:'#2a1a12',beard:'#2a1a12',tunic:'#6f7a5a',belt:'#2e2016',trim:'#4a5a3a',brow:'#1a1210',ph:1500},
  /* the people of Lystra, and the older men of the congregation there */
  lyc1:{skin:'#b47a4a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#b08a4a',belt:'#3a2414',ph:0},lyc2:{skin:'#c08c5c',wrap:'#8a5a3a',tunic:'#8a9a7a',belt:'#4a3a24',ph:0},
  lyc3:{skin:'#c89a70',veil:'#a8603a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},lyc4:{skin:'#a8703f',hair:'#4a3a2a',beard:'#5a4a3a',tunic:'#9a6a4a',belt:'#2e2016',ph:0},
  lyc5:{skin:'#c08c5c',hair:'#3a2a1a',tunic:'#c8b888',belt:'#4a3a24',slim:1,ph:0},lyc6:{skin:'#c49268',veil:'#6a7a4a',tunic:'#7a6a8a',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},
  eld1:{skin:'#b47e52',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#a89068',cloak:'#5a6a7a',long:1,belt:'#4a3a24',ph:0},
  eld2:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#6a5a4a',brow:'#3a2a1a',tunic:'#8a7a5a',long:1,belt:'#3a2414',ph:0}});
/* CROWD: the people who come running in Lystra; GATHER: the congregation in the house of Lois, months later */
const CROWD=[];for(let i=0;i<14;i++)CROWD.push(['lyc'+(i*5%6+1),116+i*10.2+(i%3)*1.4,i%2?107.4:110.8]);
const GATHER=[['eld1',34,117,1],['eld2',58,123,1],['lyc3',22,131,1],['lyc6',304,132,-1]];
const BN=actor('barnabas','Barnabas','#f0b070',128),NA=actor('nathan','Nathan','#e8d890',116),XA=actor('xanthos','Xanthos','#f0c0a0',104),TA=actor('tatia','Tatia','#e0c8f0',200),
  TI=actor('timothy','Timothy','#b8e0b0',186),EN=actor('eunice','Eunice','#a8d0f0',204),LO=actor('lois','Lois','#e8d0d8',170),LM=actor('lame','man_from_the_well','#f0d0a0',124),
  PR=actor('priest','priest_of_zeus','#e8e0f0',96),ZE=actor('zenon','Zenon','#f0b088',110);
Object.assign(ICON,{
  /* four corners of leather, lying one over another like dealt cards (never two by two: the gaps between them would make a plus sign) */
  corners(g){for(const[x,y]of[[2.6,11.6],[6.6,5.6],[10.4,12.4],[14,4]]){oval(g,x+4.2,y+7.4,4.4,1,'rgba(0,0,0,.35)');g.fillStyle=lg(g,x,y,x+7.4,y+7,['#c8905a','#a06a3a','#6a4222']);g.fillRect(x,y,7.4,7);R(g,x,y,7.4,.7,'#e0aa70');R(g,x,y+6.3,7.4,.7,'#4a2c14');
      oval(g,x+3.7,y+3.5,1.7,1.7,'#2a1a10');for(let i=1;i<7;i+=1.8){R(g,x+i,y+.9,.7,.5,'#e8dcc0');R(g,x+i,y+5.7,.7,.5,'#e8dcc0')}}},
  wcover(g){IH.roll(g,'#4a3e36',7,10);for(const x of[4.4,16.6]){R(g,x,13.4,3.2,3,'#a8703c');R(g,x,13.4,3.2,.6,'#d09a5e');R(g,x+1.1,14.5,1,1,'#1a1008')}},
  silver(g){for(const[x,y]of[[8,15],[14.6,13.4],[11,9.6],[16.6,17.6]]){oval(g,x+.5,y+.9,3.5,2.7,'#5a5a66');g.fillStyle=lg(g,x-3,y-2,x+3,y+2,['#f4f4fa','#c4c4d0','#8a8a98']);g.beginPath();g.ellipse(x,y,3.4,2.6,0,0,6.2832);g.fill();
      g.strokeStyle='#9a9aa8';g.lineWidth=.5;g.beginPath();g.ellipse(x,y,2,1.4,0,0,6.2832);g.stroke()}}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#462e16',3);stroke(g,[4.6,20.6,19,3.6],'#8c683c',2);stroke(g,[4.1,20.1,18.5,3.1],'#e2c288',.9);
  R(g,17.2,2.8,3,3,'#c49a5c');R(g,17.4,2.8,1.8,1.2,'#f2d8a2');R(g,3.3,19.7,2.4,2.4,'#9c968c');R(g,3.5,19.7,1.2,1,'#d4cec4')};
Object.assign(ITEMS,{
  staff6:{name:'barnabass_staff',icon:'staff',look:'barnabass_walking_staff_stout_olive_wood_it_has',
    by:{barnabas:'my_walking_staff_it'}},
  corners:{name:'leather_corners',look:'four_corners_of_girth_leather',
    by:{barnabas:'four_scraps_of_leather'}},
  cover:{name:'wagon_cover',icon:'wcover',look:'cover_for_xanthoss_wagon',
    by:{barnabas:'carriers_wagon_cover_rolled_and_tied'}},
  silver:{name:'silver_coins',look:'balance_for_the_wagon_cover_in_silver',
    by:{barnabas:'price_of_a_wagon_cover'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup6) */
const BY6={awl:'tentmakers_awl_it',thread:'waxed_linen_thread_and_strong',
  knife:'knife_for_cloth_and_leather',tablets:'his_wax_tablets_people'};
const inIco=()=>G.room==='iconium',inLys=()=>G.room==='lystra',inOut=()=>G.room==='outside',inHouse=()=>G.room==='house6',inDer=()=>G.room==='derbe',
  night=()=>inHouse()&&!F.back,atLystra=()=>inLys()||inOut()||inHouse(),other=()=>PC()===P?BN:P;
/* toPaul: something handed to Paul, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function dropAll(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line] pairs. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1]):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* think: Paul weighs what to say next. A choice that would not serve his hearers is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* ============ SCRIPTURE: the passages on the tablets ============ */
const PASS={
  prov22:{ref:'proverbs_22_3',gist:'shrewd_man_notices_danger'},
  isa42:{ref:'isaiah_42_8',gist:'i_am_jehovah_that_is_the_name'},
  ps146:{ref:'psalm_146_5_6',gist:'happy_is_the_man_whose'},
  jer10:{ref:'jeremiah_10_10',gist:'jehovah_though_is_god_in_truth'},
  ps65:{ref:'psalm_65_9',gist:'you_look_after_the_earth'},
  ps34:{ref:'psalm_34_19',gist:'however_many_hardships'},
  ecc12:{ref:'ecclesiastes_12_1',gist:'keep_your_grand_creator'}},
  ORDER=['prov22','isa42','ps146','jer10','ps65','ps34','ecc12'];
const quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ ICONIUM: a promise kept before the road is taken ============ */
/* The cover Paul promised a carrier is finished with four corners of leather, the saddler's gift. */
async function sew6(){
  const his=invOf(BN),i=his.indexOf('corners');if(i>=0){his.splice(i,1);toPaul('corners',1);await say(BN,'you_will_want_these_back_paul')}
  if(!has('corners'))return say(P,'i_can_stitch_until_dark');
  await walk(P,128,113);P.dir=1;SFX.sew();
  await say(P,'leather_corner_laid_on_each');SFX.sew();await wait(700);
  delItem('corners');F.sewn=1;addItem('cover',1);SFX.good();
  await say(P,'done_said');
  await say(P,'whatever_xanthos_says_of_me',TH)}
async function leather(){if(F.leather)return say(NA,F.sewn?'you_have_had_them_and_used':'you_have_them_in_your_hand_brother');
  await say(NA,'for_the_carriers_cover');
  F.leather=1;toPaul('corners');
  await say(NA,'take_them');
  await say(P,'i_take_them_as_from_a_brother')}
/* The balance of the price goes to the brothers of a divided city: an optional kindness. */
async function alms(it){if(it!=='silver')return false;const me=PC();
  await say(me,me===P?'balance_for_the_cover_nathan'
    :'pauls_silver_nathan_and_he');
  dropAll('silver');F.debt=1;SFX.good();
  await say(NA,'month_of_his_nights_went');
  await say(NA,'it_will_go_where_it_is_needed')}
async function deliver(it){if(it!=='cover')return false;F.metXan=1;
  await say(P,'your_cover_xanthos');
  await say(XA,'today_said');
  await say(XA,'they_told_me_you_were_a_swindler');
  await say(P,'i_am_taking_the_south_road');
  delItem('cover');F.paid=1;addItem('silver');
  await say(XA,'here_is_the_balance');
  await say(XA,'i_am_still_for_the_rulers');
  await say(P,'he_has_not_changed_sides',TH)}
/* Tatia's household is divided, like her city. It is Barnabas she asks. */
async function comfort6(){
  await say(TA,'barnabas_they');
  await say(TA,'my_husband_is_for_the_rulers');
  await ask(BN,TA,'you_stood_against_their_talk_for_weeks',[
    {q:'it_is_no_rumor',r:['i_do_not_doubt_the_stones_barnabas']},
    {q:'there_are_cities_in_lycaonia',r:['this_one_has_heard_so_it']},
    {q:'we_answered_their_words',ok:1,
      p:['while_it_was_matthew_10_23',
        'we_take_ourselves_away_not_the_word',
        'as_for_your_husband_do'],
      r:['not_talk',
        'perhaps_today_he_will_see']}]);
  F.tatia=1;SFX.good()}
async function leave6(){const me=PC();
  if(!F.paid)return say(me,me===P?(F.sewn?'with_a_finished_cover_under_my_arm':'not_while_a_man_in_this_street')
    :'paul_has_a_debt_of_work');
  if(!F.tatia)return say(me,me===P?'tatia_is_still_at_the_fountain':'tatia_is_waiting_at_the_fountain');
  await say(me,me===P?'nothing_is_owed_here_now':'shrewd_man_notices_danger_paul');return travel()}
NA.hs={name:'Nathan',actor:NA,
  look:'nathan_a_saddler_of_iconium',
  give:alms,
  show:{corners:'girth_leather',cover:()=>say(NA,'cover_a_man_could_cross'),
    tablets:'you_read_to_me_from_those_the_first',awl:'i_own_a_dozen_awls_and_none',
    knife:'half_moon_knife',thread:'good_thread_mine','*':'keep_it_by_you_brother'},
  ask:{plot:['tomorrow_when_the_market_fills','they_agree_on_nothing_else'],cover:leather},
  talk:()=>talkTree([
    {q:'who_told_you_of_it',a:()=>say(NA,'man_who_is_for_the_rulers')},
    {q:'have_you_leather_to_spare',if:()=>!F.leather,a:leather},
    {q:'what_becomes_of_you_when_we',once:1,a:async()=>{await say(NA,'i_shall_mend_harness_meet');await say(NA,'great_number_believed_here_paul')}},
    {q:'peace_to_you_nathan',bye:1}]),
  as:{barnabas:{look:'nathan_the_saddler',give:alms,
    talk:()=>say(NA,F.paid?'go_quickly_barnabas_and_go':'paul_will_not_go_until'),
    show:{staff6:'olive_wood_if','*':'keep_it_by_you_barnabas'}}}};
XA.hs={name:'Xanthos',actor:XA,
  look:()=>say(P,F.paid?'xanthos_said':'xanthos_the_carrier_wagons'),
  give:deliver,
  show:{corners:'scraps_of_leather',silver:'it_is_yours',tablets:'jewish_writing',
    awl:'a_tool',knife:'put_that_away_in_my_yard','*':'i_ordered_a_wagon_cover_tentmaker'},
  ask:{plot:()=>say(XA,'i_know_nothing_of_any_stones'),
    cover:()=>say(XA,'four_corners_short')},
  talk:async()=>{if(F.paid)return say(XA,'i_have_my_cover_and_i_have');
    if(!F.metXan){F.metXan=1;await say(XA,'you_said');
      await say(XA,'i_hear_what_is_said_of_you');
      await say(P,'i_owe_you_a_wagon_cover_xanthos');
      await say(XA,'shall_i')}
    return talkTree([
      {q:'when_did_you_want_the_cover',a:()=>say(XA,'before_my_wagons_leave_for_the_coast')},
      {q:'what_do_they_say_of_us',a:async()=>{await say(XA,'that_you_are_swindlers');await say(P,'i_cannot_stop_a_mouth',TH)}},
      {q:'you_will_have_it',bye:1}])},
  as:{barnabas:{look:'the_carrier',
    give:async it=>{if(it!=='cover')return false;await say(XA,'from_his_hand_not_yours')},
    talk:()=>say(XA,F.paid?'your_friend_kept_his_word':'it_is_your_friend_who_owes'),
    show:{staff6:'walking_staff','*':'i_have_no_business_with_you'}}}};
TA.hs={name:'Tatia',actor:TA,
  look:()=>say(P,F.tatia?'tatia_said':'tatia_the_wife_of_xanthos'),
  show:{cover:()=>say(TA,'my_husbands_wagon_cover'),silver:'he_paid_you',
    tablets:'i_cannot_read_your_letters_paul',corners:'leather_i','*':'put_it_away_paul'},
  ask:{plot:'whole_fountain_knows_it',cover:'for_my_husbands_wagon'},
  talk:async()=>{if(F.tatia)return say(TA,'go_safely_both_of_you');
    await say(TA,'paul_is');await say(P,'it_is_true_tatia');
    await say(TA,'i_must_ask_something_and_i')},
  as:{barnabas:{look:()=>say(BN,F.tatia?'tatia_she':'tatia_with_her_jar_still_empty'),
    talk:()=>F.tatia?say(TA,'what_he_sees_not_what_i_say'):comfort6(),
    show:{staff6:'you_are_packed_for_the_road_already','*':'keep_it_barnabas_you'}}}};
/* the hidden treasure (index.html, treasure): once the cover is on Xanthos's wagon, the tentmaker tries its corners with his awl, out of habit */
async function awl6(){await say(P,'out_of_habit_i_run_the_point');
  await say(P,'whether_or_not_he_ever');treasure()}
ROOMS.iconium={space:0.9,walk:[16,464,110,138],mood:'tense',amb:{crowd:.4,fountain:.7,birds:.3,hammer:.3,leaves:.3},hs:[
  {name:'mountains',x:188,y:26,w:110,h:24,wx:244,look:'mountains_on_every_side'},
  {name:'street_to_the_synagogue',x:0,y:36,w:60,h:68,wx:42,wy:113,dir:-1,look:['street_to_the_synagogue_of_the_jews','by_tomorrow_that_street'],
    use:'back_to_the_synagogue_today',open:'back_to_the_synagogue_today'},
  {name:'saddlery',x:84,y:56,w:84,h:30,wx:126,wy:113,look:'nathans_shop_pack_saddles',pickup:'they_are_nathans_living'},
  {name:'saddlers_bench',x:102,y:86,w:52,h:19,wx:128,wy:113,vis:()=>!!F.sewn,look:'nathans_bench_and_for_a_month',use:'my_work_at_this_bench_is_done'},
  {name:'unfinished_cover',x:102,y:80,w:52,h:25,wx:128,wy:113,vis:()=>!F.sewn,
    look:['the_cover_for_xanthoss_wagon','only_the_corners_are_unfinished'],
    pickup:'not_before_it_is_finished',
    use:()=>F.leather?sew6():say(P,'corners_need_leather_and_i_have_none'),
    useWith:async it=>{if(it==='corners'||it==='awl'||it==='thread')return sew6();if(it==='knife')return say(P,'it_is_cut_to_the_measure');return false}},
  {name:'fountain',x:220,y:64,w:50,h:44,wx:246,wy:114,look:'fountain_at_the_crossroads',
    use:'i_drink',pickup:'fountain_stays_where_it_is'},
  {name:'poplars',x:190,y:40,w:24,h:50,wx:204,look:'poplars_said'},
  {name:'poplars',x:276,y:38,w:22,h:52,wx:286,look:'poplars_said'},
  {name:'xanthoss_wagon',x:308,y:72,w:74,h:38,wx:344,wy:114,look:()=>say(P,F.paid?'cover_is_on_its_hoops_and_laced':'good_wagon_with_four_bare'),
    pickup:'take_a_wagon',useWith:async it=>it==='cover'?say(P,'it_is_his_wagon'):it==='awl'&&F.paid?awl6():false},
  {name:'gateway_of_the_yard',x:375,y:53,w:52,h:51,wx:400,wy:113,look:'yard_of_xanthos_the_carrier',use:'i_have_no_business_in_his_yard',open:'i_have_no_business_in_his_yard'},
  {name:'south_gate',x:444,y:54,w:32,h:50,wx:458,wy:113,dir:1,look:async()=>{await say(P,'the_south_gate');await say(P,quote('prov22'))},exit:leave6}]};
/* ============ LYSTRA: a man who had never walked, and a crowd that would make gods of two men ============ */
async function lysIntro(){if(F.healed)return;
  await say(BN,'small_town_paul_and_i_see');
  await say(P,'where_the_town_itself_gathers');
  await say(P,'man_sitting_beside_it_who',TH)}
/* Paul speaks at the well (Acts 14:8-10). The healing is told as the account tells it; what follows from it is the trouble of this place. */
async function speak6(){if(F.healed)return say(PC(),'it_has_been_said_and_seen');
  if(!F.metTim)return say(PC(),PC()===P?'to_whom':'paul_should_know_first_who_lives_here');
  playAs(P);await Promise.all([walk(P,262,118),walk(BN,244,124)]);P.dir=1;BN.dir=1;
  await say(P,'people_of_lystra',{to:null});
  await narr('one_man_in_lystra_acts_14_8',{dur:8000});
  await narr('he_was_listening_while_paul_spoke_acts_14_9_10',{dur:9500});
  await say(P,'get_up_and_stand_on_your_feet_acts_14_10');
  F.healed=1;place(LM,'lystra',322,112,-1);SFX.good();
  await narr('at_that_the_man_acts_14_10',{dur:4500});
  await walk(LM,300,122);await walk(LM,344,118);LM.dir=-1;
  G.crowd=1;AU.mood='tense';SFX.alert();
  await narr('crowds_saw_what_acts_14_11',{dur:6500});
  await say(P,'what_are_they_shouting_barnabas',{to:BN});
  await say(BN,'not_one_word_of_it');
  await say(P,'i_cannot_answer_what_i',TH)}
/* hear: one of the household of Lois, who speak Greek and Lycaonian, tells them what the crowd is saying, and what is coming to the gate. */
async function hear(A){if(F.heard)return say(A,'they_are_at_the_gate_with_the_bulls');
  await say(A,A===TI?'they_are_shouting_in_lycaonian_sir':'they_are_shouting_in_their_own_tongue');
  await narr('gods_they_cried_acts_14_11',{dur:6000});
  await say(A,'there_is_an_old_story_in_these_hills');
  await say(A,'they_think_it_has_happened_again');
  await narr('barnabas_they_began_acts_14_12',{dur:7500});
  await say(BN,'zeus_said');
  G.bulls=1;G.crowd=2;AU.mood='feast';place(PR,'lystra',94,117,1);
  await narr('temple_of_zeus_acts_14_13',{dur:10000});
  await say(A,A===TI?'bulls_sir_with_garlands_on_them':'bulls_with_garlands_on_them');
  F.heard=1;
  await say(P,quote('isa42'),TH);
  await say(P,'jehovahs_glory_handed_to_a_tentmaker',TH)}
/* stop6: at the gate (Acts 14:14-18). The player chooses how Paul begins, to whom he turns them, and what witness he names. */
async function stop6(){playAs(P);
  await narr('when_word_of_this_reached_acts_14_14',{dur:9000});
  SFX.cut();await Promise.all([walk(P,116,118),walk(BN,138,123)]);P.dir=1;BN.dir=1;SFX.cut();
  await think('they_take_us_for_gods',[
    {q:'we_are_jews_and_our_law',no:'true_said'},
    {q:'stop_said',no:'true_again'},
    {q:'we_are_only_human_with_the_same',ok:1}]);
  await say(P,'men_why_do_you_do_this_we_acts_14_15',{to:null});
  await say(BN,'look_at_us',{to:null});
  await think('now_to_whom_do_i_turn_them',[
    {q:'as_it_is_written_in_the_psalms',no:'written_where'},
    {q:'to_the_god_of_abraham_isaac',no:'three_names_they_have_never_heard'},
    {q:'to_the_living_god_who_made',ok:1}]);
  await say(P,'we_bring_you_acts_14_15',{to:null});
  await say(BN,'in_the_generations_acts_14_16',{to:null});
  await think('they_will_ask_how_they',[
    {q:'law_and_the_prophets',no:'his_witness_to_israel'},
    {q:'man_from_the_well_on_his_feet',no:'they_have_seen_it'},
    {q:'rain_from_heaven_and_seasons_of_harvest',ok:1}]);
  await say(P,'even_so_there_acts_14_17',{to:null});
  PR.dir=-1;await say(PR,'you_will_not_have_the_bulls');
  walk(PR,20,118);await wait(900);G.bulls=0;G.crowd=1;AU.mood='tense';PR.room=null;
  await narr('crowds_would_still_have_sacrificed_to_them_acts_14_18',{dur:8000});
  F.stopped=1;SFX.good();
  await say(TI,'they_are_going_home_sir');
  await say(P,'tomorrow_we_shall_be_at_the_well');
  return stoned()}
/* What followed is told as Acts tells it (14:19, 20). Nothing of it is shown, and nothing the player does prevents it. */
async function stoned(){await fade(1,700);G.crowd=0;G.bulls=0;AU.mood='tense';
  await narr('how_long_they_went_on_declaring',{dur:8500});
  await narr('jews_came_from_antioch_acts_14_19',{dur:11000});
  for(const a of[NA,XA,TA,PR,ZE])a.room=null;G.down=1;enterRoom('outside',-80,127,1);
  for(const[a,x,y]of[[BN,262,112],[TI,268,114],[EN,258,116],[LO,266,118],[LM,272,113]])place(a,'outside',x,y,-1);G.cam=0;await fade(0,900);
  await Promise.all([walk(BN,120,125),walk(TI,194,123),walk(EN,210,130),walk(LO,104,131),walk(LM,226,124)]);BN.dir=1;LO.dir=1;TI.dir=EN.dir=LM.dir=-1;
  await narr('disciples_gathered_around_acts_14_20',{dur:6000});
  G.down=0;place(P,'outside',156,127,1);P.bow=true;await wait(1100);P.bow=false;SFX.good();
  await say(BN,'paul_ex');
  await say(TI,'they_said_you_were_dead_sir');
  await say(P,'not_dead');
  await say(P,quote('ps34'));
  await say(EN,'road_to_derbe_is_behind_you_paul');
  await say(P,'tonight_in_the_dark_like',TH);
  place6('outside');codeBtn()}
async function gate6(){const me=PC();
  if(!F.healed)return say(me,me===P?'we_have_only_just_come_said':'we_have_only_just_come_in_paul');
  if(!F.heard)return say(me,me===P?'something_is_making_ready':'whatever_is_coming_to_that_gate');
  return stop6()}
TI.hs={name:'Timothy',actor:TI,
  look:()=>say(P,inOut()?'timothy_said':night()?'timothy_he':F.back?'timothy_a'
    :F.metTim?'timothy_the_son_of_eunice':'boy_with_a_water_jar_some'),
  give:async it=>{if(it!=='tablets'||!night())return false;if(F.copy)return say(TI,'i_have_it_by_heart_now_sir');
    await say(TI,'may_i_read_them_sir');
    await say(TI,quote('ecc12'));F.copy=1;SFX.good();
    await say(P,'keep_hold_of_it_timothy')},
  show:{tablets:()=>say(TI,F.back?'i_can_say_every_passage':'holy_writings_sir'),
    awl:'is_that_what_you_sew_tents',thread:'my_grandmother_spins',knife:'it_is_shaped_like_the_new_moon','*':'is_it_from_tarsus_sir'},
  ask:{tongue:()=>hear(TI),east:'tarsus_is_your_home_sir'},
  talk:async()=>{
    if(inOut())return say(TI,'lean_on_me_sir');
    if(night())return talkTree([
      {q:'you_saw_the_garlands_timothy',a:async()=>{await say(TI,'i_saw_them_bring_garlands');
        await say(P,'they_are_the_same_people')}},
      {q:'are_you_afraid',once:1,a:async()=>{await say(TI,'yes_sir');await say(P,'i_am_often_afraid_timothy')}},
      {q:'sleep_now_timothy',bye:1}]);
    if(F.back)return say(TI,F.strong?'through_many_tribulations':'they_throw_clods_at_me');
    if(!F.metTim){F.metTim=1;await say(TI,'peace_to_you_sirs');
      await say(P,'peace_timothy');
      await say(TI,'no_sir');
      await say(TI,'my_father_is_a_greek')}
    if(F.healed)return hear(TI);
    return talkTree([
      {q:'where_do_the_people_of_lystra_gather',a:()=>say(TI,'at_the_well_sir')},
      {q:'who_is_the_man_sitting',a:()=>say(TI,'he_has_sat_there_every')},
      {q:'what_did_your_mother_teach_you',once:1,a:async()=>{await say(TI,'law_sir_and_the_psalms');await say(P,'she_is_right')}},
      {q:'stay_near_us_timothy',bye:1}])},
  as:{barnabas:{look:()=>say(BN,F.back?'timothy_paul':'boy_who_listens_with_his_whole_face'),
    talk:async()=>{if(inLys()&&!F.metTim){F.metTim=1;await say(TI,'peace_to_you_sir');
        await say(BN,'peace_timothy_q');
        return say(TI,'no_sir_said')}
      if(inLys()&&F.healed)return hear(TI);
      return say(TI,inOut()?'he_stood_up_sir':night()?'is_it_true_that_you_sold':F.back?'you_came_back_sir':'everybody_comes_to_the_well_sir')},
    show:{staff6:'did_you_really_carry_a_rope','*':'is_it_from_cyprus_sir'}}}};
EN.hs={name:'Eunice',actor:EN,
  look:()=>say(P,inOut()?'eunice_said':night()?'eunice_she':F.back?(F.strong?'eunice_her':'eunice_these')
    :'woman_of_israel_by_her_dress'),
  show:{tablets:'written_out_i',awl:'a_craftsmans_tool',
    thread:()=>say(EN,night()?'let_me_mend_them_paul':'good_thread_you'),'*':'put_it_by_paul'},
  ask:{tongue:()=>hear(EN),east:'short_road_home'},
  talk:async()=>{
    if(inOut())return say(EN,'come_into_the_city_or_go');
    if(night())return talkTree([
      {q:'where_is_your_husband',a:async()=>{await say(EN,'with_the_flocks_until_the_new_moon');await say(EN,'what_he_will_say_when_he')}},
      {q:'you_have_taught_your_son_well',once:1,a:()=>say(EN,'my_mother_taught_me_and_i')},
      {q:'thank_you_for_this_roof_eunice',bye:1}]);
    if(F.back)return F.strong?say(EN,'through_them_not_round_them'):strengthen();
    if(F.healed)return hear(EN);
    await say(EN,'strangers_and_jews');
    return say(EN,'there_is_no_house_of_prayer')},
  as:{barnabas:{look:'eunice_a',
    talk:()=>inLys()&&F.healed?hear(EN):F.back&&!F.strong?say(EN,'it_is_paul_i_must_ask_barnabas_said')
      :say(EN,inOut()?'take_his_other_arm_barnabas':night()?'eat_barnabas':F.back?'you_are_both_thinner':'peace_to_you_if'),
    show:{staff6:'lean_it_by_the_door','*':'put_it_by_barnabas'}}}};
LO.hs={name:'Lois',actor:LO,
  look:()=>say(P,inOut()?'lois_said':night()?'lois_she':F.back?'lois_a'
    :'old_woman_at_the_door_with_eyes'),
  show:{tablets:'my_eyes_are_past_reading_child',thread:'i_spun_for_this_household','*':'keep_your_things_about_you'},
  ask:{tongue:()=>hear(LO),east:'you_came_back_to_us_instead'},
  talk:async()=>{
    if(inOut())return say(LO,'slowly_on');
    if(night())return say(LO,F.mended?'now_lie_down_the_two_of_you':'sit_still');
    if(F.back)return say(LO,F.strong?'i_taught_my_daughter_the_scriptures':'we_are_still_here_paul');
    if(F.healed)return hear(LO);
    return say(LO,'peace_to_you_strangers_said')},
  as:{barnabas:{look:'lois_i',
    talk:()=>inLys()&&F.healed?hear(LO):say(LO,inOut()?'help_him_up_son':night()?'eat_said':F.back?'you_brought_him_back_to_us':'peace_to_you_if_you'),
    show:{staff6:'good_stick','*':'keep_your_things_about_you_said'}}}};
LM.hs={name:'man_from_the_well',actor:LM,
  look:()=>say(P,F.back?'the_man_from_the_well':inOut()?'man_from_the_well_said':'man_who_had_never_walked'),
  show:{'*':'yours_sir'},
  talk:async()=>{if(inLys()&&!F.heard){await say(LM,'they_say');return say(P,'gods_said',TH)}
    return say(LM,F.back?'i_carry_water_now_sir':inOut()?'you_said_stand_up_i':'i_walk_sir')},
  as:{barnabas:{look:'man_from_the_well_i',talk:()=>say(LM,F.back?'with_my_own_feet_sir':'i_walk_sir_ex'),show:{'*':'yours_sir_said'}}}};
PR.hs={name:'priest_of_zeus',actor:PR,look:'priest_of_zeus_all_in_white',
  show:{'*':'an_offering'},talk:stop6,
  as:{barnabas:{look:'the_priest',talk:stop6,show:{'*':'an_offering'}}}};
ROOMS.lystra={space:0.8,walk:[16,464,110,138],get mood(){return G.bulls?'feast':F.healed?'tense':'hope'},amb:()=>G.crowd?{crowd:.9,wind:.3,birds:.2}:{birds:.5,wind:.35,crickets:.3,crowd:.12},enter:lysIntro,hs:[
  {name:'hills',x:238,y:44,w:240,h:24,wx:360,look:'low_hills_round_a_secluded'},
  {name:'fields',x:300,y:68,w:92,h:22,wx:350,look:async()=>{await say(P,'fields_orchards_and_good_pasture');await say(P,quote('ps65'))}},
  {name:'city_wall',x:0,y:18,w:100,h:28,wx:76,look:'wall_of_lystra'},
  {name:'city_gate',x:26,y:48,w:48,h:56,wx:98,wy:116,dir:-1,look:()=>say(P,G.bulls?'bulls_at_the_gates_garlanded':'gate_of_lystra'),exit:gate6},
  {name:'bulls',x:24,y:84,w:58,h:34,wx:112,wy:118,dir:-1,vis:()=>!!G.bulls,look:'two_white_bulls_with_garlands',use:stop6,pickup:'they_are_not_mine_and_what'},
  {name:'door_of_a_house',x:140,y:68,w:14,h:36,wx:147,wy:112,look:'house_of_mud_brick_with_its_door',use:'it_is_not_my_house',open:'it_is_not_my_house'},
  {name:'door_of_loiss_house',x:190,y:63,w:22,h:41,wx:201,wy:112,look:'door_of_a_house_where_the_sabbath',use:'i_will_go_in_when_i_am',open:'i_will_go_in_when_i_am'},
  {name:'well',x:262,y:70,w:36,h:38,wx:262,wy:118,dir:1,def:'use',look:['well_of_lystra','with_no_synagogue_this_is'],use:speak6,pickup:'bucket_belongs_to_the_well'},
  {name:'man_sitting_by_the_well',x:304,y:84,w:36,h:28,wx:290,wy:120,dir:1,vis:()=>!F.healed,look:['man_sitting_on_the_ground','he_is_listening'],
    talk:()=>say(P,F.metTim?'he_answers_with_a_few_words':'he_nods_to_me_and_waits'),
    use:'i_have_no_silver_for_him',pickup:'man_is_not_picked_up_like'},
  {name:'farm_stall',x:426,y:50,w:54,h:56,wx:440,wy:114,look:'grain_figs_pomegranates',pickup:'it_is_the_farmers_living'}]};
/* ---------- Outside the city: he got up ---------- */
async function enterCity(){playAs(P);
  await say(P,'i_am_going_back_in_through');
  await say(BN,'i_go_in_beside_you');
  walk(BN,262,114);await walk(P,250,112);await fade(1,600);AU.mood='calm';
  await narr('went_into_the_city_acts_14_20',{dur:5000});
  enterRoom('house6',...ENT.house6);place6('house6');codeBtn();await fade(0,700);
  await narr('lois_and_eunice_took_them',{dur:4000});
  await say(LO,'sit_said');
  await say(BN,'we_ripped_our_garments');
  await say(P,'torn_from_the_neck_to_the_belt',TH)}
const derbeRoad=()=>say(PC(),PC()===P?'tonight_in_the_dark':'not_without_a_word_to_the_disciples');
ROOMS.outside={space:0.5,walk:[16,304,112,138],mood:'tense',amb:{wind:.6,crickets:.6,owl:.3},hs:[
  {name:'hills',x:0,y:60,w:150,h:22,wx:80,look:'hills_are_going_dark'},
  {name:'Lystra',x:196,y:30,w:124,h:22,wx:240,look:['lystra_on_its_low_hill','still_there_are_disciples_inside_that_wall']},
  {name:'city_gate',x:254,y:52,w:24,h:30,wx:250,wy:113,dir:1,look:'the_gate',exit:enterCity},
  {name:'bare_tree',x:18,y:52,w:42,h:58,wx:60,wy:116,look:'wild_pear_bare_already'},
  {name:'stones',x:112,y:118,w:72,h:18,wx:150,wy:130,look:['stones_acts_7_58_22_20','today_i_learned_what_the_other'],pickup:'no_let'},
  {name:'road_to_derbe',x:0,y:104,w:20,h:34,wx:22,wy:124,dir:-1,look:'the_road_to_derbe',exit:derbeRoad}]};
/* ---------- The house of Lois: one night, and a visit months later ---------- */
/* mend6: by lamplight, the garments they ripped at the gate are made whole. */
async function mend6(it){if(!night()||!['awl','thread'].includes(it))return false;
  if(F.mended)return say(BN,'it_is_mended_paul_and_better');
  await say(P,'off_with_that_mantle_barnabas');
  await Promise.all([walk(P,176,120),walk(BN,150,118)]);P.dir=-1;BN.dir=1;P.bow=true;
  SFX.sew();await say(P,'tear_along_the_weave_is');SFX.sew();await wait(700);
  await say(P,'now_my_own');
  P.bow=false;F.mended=1;SFX.good();
  await say(BN,'stoned_by_day_and_sewing');
  await say(EN,'i_have_never_seen_a_man')}
/* strengthen: on the way back, the disciples are told the truth about the road (Acts 14:22). */
async function strengthen(){
  await say(EN,'since_you_left_the_stall');
  await quiz(EN,'we_believed_and_we_were_glad',[
    {q:'in_derbe_no_one_lifted',r:['derbe_is_fortunate']},
    {q:'i_was_on_my_feet_again',r:['you_were']},
    {q:'i_will_not_tell_you_that_it',ok:1,
      p:['i_will_not_tell_you_that_it_said','it_is_through_acts_14_22',
        'many_but'],
      r:['through_them','we_hold_to_it']}]);
  F.strong=1;SFX.good();
  await narr('in_those_cities_acts_14_22',{dur:6500});
  await say(BN,'older_men_are_here_paul')}
async function houseDoor(){const me=PC();
  if(F.back)return F.strong?finale6():say(me,me===P?'we_came_all_the_way_back':'not_yet_eunice');
  if(!F.mended)return say(me,me===P?'on_the_next_day_yes':'to_derbe_in_the_morning');
  await fade(1,500);await narr('day_after_he_acts_14_20',{dur:5500});await fade(0,300);return travel()}
async function backIntro(){if(!F.back||F.strong)return;
  await say(LO,'paul_barnabas');
  await say(TI,'you_came_in_at_the_same');
  await say(EN,'sit_down_both_of_you')}
ROOMS.house6={space:1.25,walk:[16,304,110,136],mood:'calm',amb:()=>F.back?{birds:.3,crowd:.1}:{fire:.5,crickets:.3,owl:.2},enter:backIntro,hs:[
  {name:'window',x:48,y:24,w:24,h:26,wx:64,look:()=>say(P,F.back?'daylight_and_the_lane':'night_over_lystra')},
  {name:'lamp',x:140,y:42,w:20,h:24,wx:150,look:()=>say(P,F.back?'lamp_in_its_niche':'one_lamp_in_a_niche'),pickup:'it_gives_light_to_the_whole_said'},
  {name:'shelf',x:172,y:48,w:60,h:18,wx:200,look:'jars_of_oil_meal_and_olives',pickup:'it_is_their_winter_store'},
  {name:'hearth',x:76,y:88,w:34,h:18,wx:112,wy:114,dir:-1,look:()=>say(P,F.back?'hearth_is_swept_and_cold':'fire_of_thorn_wood'),use:'i_warm_my_hands'},
  {name:'bench',x:6,y:78,w:62,h:26,wx:60,wy:114,dir:-1,look:'bench_and_a_blanket_folded_on_it',use:()=>say(P,F.back?'not_yet_there':night()&&F.mended?'soon_one':'not_with_those_garments_still_hanging_open')},
  {name:'water_jar',x:242,y:84,w:16,h:24,wx:236,wy:114,dir:1,look:'great_jar_of_water',pickup:'it_would_take_two_of_us'},
  {name:'table',x:168,y:104,w:44,h:20,wx:160,wy:124,dir:1,look:()=>say(P,F.back?'table_is_bare':'bread_olives_and_a_bowl_of_milk'),pickup:'i_have_eaten'},
  {name:'door_to_the_lane',x:269,y:51,w:28,h:53,wx:272,wy:113,dir:1,look:'the_door_to_the_lane',exit:houseDoor}]};
/* ============ DERBE: the short road home, and the other road ============ */
async function derIntro(){
  await say(ZE,'barnabas_paul');
  await say(ZE,'tomorrow_i_go_east_by_the_roman');
  await say(BN,'tarsus_paul');
  await say(P,'short_way_home_offered',TH)}
const eastNo=()=>say(PC(),PC()===P?'short_way_home_through'
  :'east_to_tarsus_and_home');
ZE.hs={name:'Zenon',actor:ZE,
  look:'zenon_a_carter_of_derbe',
  show:{tablets:'i_cannot_read_brother',awl:'if_my_harness_gives_out_in_the_pass',thread:'strong_stuff',knife:'mind_the_ox','*':'stow_it_on_the_load_if_you'},
  ask:{east:['good_road_and_a_well_traveled','tarsus_and_from_tarsus']},
  talk:()=>talkTree([
    {q:'what_is_the_road_to_tarsus_like',a:async()=>{await say(ZE,'good_road_and_a_well_traveled');await say(ZE,'snow_shuts_that_gap_another')}},
    {q:'what_will_the_brothers',a:async()=>{await say(ZE,'we_meet_on_my_threshing_floor');await say(P,'quite_a_few_and_no_one')}},
    {q:'thank_you_for_the_offer_zenon',bye:1}]),
  as:{barnabas:{look:'zenon_said',talk:()=>say(ZE,'room_for_two_barnabas_and_the_oxen'),show:{staff6:'you_would_not_need_that_on_my_wagon','*':'stow_it_on_the_load_if_you_said'}}}};
ROOMS.derbe={space:0.5,walk:[16,304,110,138],mood:'hope',amb:{wind:.5,birds:.4,crickets:.3,hooves:.2},enter:derIntro,hs:[
  {name:'mountains',x:90,y:20,w:230,h:34,wx:220,look:'taurus_with_new_snow_on_it'},
  {name:'east_gate_of_derbe',x:18,y:50,w:42,h:54,wx:52,wy:113,dir:-1,look:'the_east_gate_of_derbe',
    use:'there_are_disciples_enough',open:'there_are_disciples_enough'},
  {name:'threshing_floor',x:112,y:82,w:82,h:20,wx:150,wy:113,look:['zenons_threshing_floor','rain_from_heaven_and_seasons_of_harvest_said']},
  {name:'plowed_field',x:198,y:78,w:92,h:12,wx:240,look:'one_field_under_the_plow'},
  {name:'wagon',x:174,y:78,w:72,h:32,wx:166,wy:117,dir:1,look:'zenons_wagon_loaded_with_grain_for_tarsus',pickup:'it_is_zenons_and_it_is_loaded',use:'climb_up_and_ride_home'},
  {name:'oxen',x:248,y:78,w:40,h:34,wx:240,wy:120,dir:1,look:'yoke_of_brown_oxen',pickup:'they_are_zenons',
    use:'i_scratch_one_of_the_oxen'},
  {name:'milestone',x:297,y:91,w:10,h:18,wx:290,wy:122,dir:1,look:'milestone_from'},
  {name:'our_baggage',x:58,y:98,w:38,h:14,wx:84,wy:115,dir:-1,look:'two_bed_rolls_and_a_bag',pickup:'when_we_have_chosen_our_road'},
  {name:'road',x:308,y:100,w:12,h:38,wx:302,wy:126,dir:1,look:'the_road',exit:()=>travel()}]};
/* ============ BARNABAS AND PAUL, AS EACH SEES THE OTHER ============ */
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const BARN6={noCraft:'that_is_the_tentmakers_trade_not_mine',
  def:{look:'i_see_nothing_there_that_needs_me',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_the_tentmakers_trade_not_mine_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
const BN6={name:'Barnabas',actor:BN,
  look:()=>say(P,inIco()?'barnabas_he_has_his'
    :inLys()?(G.bulls?'barnabas_they_are':F.healed?'barnabas_he_is_watching':'barnabas_he_looks')
    :inOut()?'barnabas_he_has_hardly'
    :night()?(F.mended?'barnabas_mended_and_fed':'barnabas_his')
    :inDer()?'barnabas_he_looks_east':'barnabas_the'),
  give:mend6,
  show:{corners:'four_scraps_of_leather_said',cover:'finished_then',
    silver:()=>say(BN,F.tatia?'his_balance_paid_to_the_last_coin':'he_paid'),
    awl:'your_awl',thread:()=>say(BN,night()&&!F.mended?'thread_paul':'good_thread_it_has'),
    knife:'put_it_to_work_brother_said',tablets:'read_me_one_of_them_when_we','*':'keep_it_brother_said'},
  ask:{plot:'i_believe_nathan',cover:'ask_the_saddler',
    tongue:'it_is_no_tongue_i_ever',
    east:'my_feet_say_east'},
  talk:()=>inIco()?talkTree([
      {q:'are_we_running_away_barnabas',a:async()=>{await say(BN,'from_words_we_never_ran');await say(BN,quote('prov22'))}},
      {q:'what_is_still_to_do_here',a:()=>say(BN,!F.sewn?'your_cover_paul':!F.paid?'put_that_cover_into_the_carriers_hands':!F.tatia?'tatia_is_waiting_at_the_fountain_said':'nothing_the')},
      {q:'be_ready_brother',bye:1}])
    :inLys()?talkTree([
      {q:'what_do_you_make_of_this_town',a:()=>say(BN,F.healed?'i_make_of_it_that_we_are':'farmers_and_soldiers')},
      {q:'where_shall_we_begin',if:()=>!F.healed,a:()=>say(BN,'ask_someone_who_lives_here')},
      {q:'stay_close',bye:1}])
    :inOut()?say(BN,'i_thought_i_had_lost_you_paul')
    :night()?talkTree([
      {q:'how_do_i_look_to_you',once:1,a:async()=>{await say(BN,'like_a_man_who_was_stoned');await say(BN,'i_do_not_know_which_of_the_two')}},
      {q:'tomorrow_derbe_ask',a:()=>say(BN,F.mended?'tomorrow_derbe':'tomorrow_derbe_said')},
      {q:'rest_brother',bye:1}])
    :inDer()?talkTree([
      {q:'what_do_you_say_barnabas',a:()=>say(BN,BN6.ask.east)},
      {q:'they_threw_us_out_of_every',once:1,a:async()=>{await say(BN,'they_did');await say(BN,'i_was_sent_to_antioch_once')}},
      {q:'let_us_look_at_the_road',bye:1}])
    :talkTree([
      {q:'what_do_you_see_in_this_house',a:()=>say(BN,'a_congregation')},
      {q:'stand_with_me_brother',bye:1}])};
/* Paul, as Barnabas sees him and talks to him */
const PAUL6={name:'Paul',actor:P,as:{barnabas:{
  look:()=>say(BN,inIco()?'paul_men'
    :inLys()?(G.bulls?'paul_they':'paul_he_is')
    :inOut()?'paul_on_his':night()?'paul_there':inDer()?'paul_he_has':'paul_he_came'),
  give:async it=>{if(!['corners','cover','silver'].includes(it))return false;const inv=invOf(BN),i=inv.indexOf(it);if(i>=0)inv.splice(i,1);toPaul(it);return say(BN,'this_is_yours_paul')},
  talk:()=>talkTree([
    {q:'what_can_i_do_to_help',a:()=>say(P,inIco()?(!F.paid?'leave_the_cover_to_me':!F.tatia?'speak_to_tatia_at_the_fountain':'nothing_more_take')
      :inLys()?(!F.healed?'stand_beside_me_at_the_well':!F.heard?'find_me_someone_who_understands':'come_with_me_to_the_gate')
      :inOut()?'give_me_your_arm_as_far':night()?(F.mended?'sleep_said':'take_off_that_mantle_and_bring')
      :inDer()?'tell_me_that_i_am_not_wrong':F.strong?'stand_with_me_while_we':'sit_by_lois')},
    {q:'they_called_me_zeus_paul',if:()=>!!F.stopped,once:1,a:async()=>{await say(P,'me_hermes_because_i_did_the_talking');await say(BN,'i_tore_my_mantle_when_i')}},
    {q:'i_will_leave_you_to_it',bye:1}]),
  show:{staff6:()=>say(P,inOut()?'lend_it_to_me_as_far_as_the_gate':'keep_your_staff_by_you_barnabas_there'),'*':'keep_it_by_you_barnabas'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'plot',q:'they_mean_to_stone_us_tomorrow',if:inIco},
  {id:'cover',q:'xanthoss_wagon_cover_needs_four_leather_corners',if:()=>inIco()&&!F.sewn},
  {id:'tongue',q:'what_are_the_people_shouting',if:()=>inLys()&&F.healed&&!F.heard},
  {id:'east',q:'road_runs_east_from_here',if:inDer}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inIco()?'son_of_comfort':inDer()?'he_would_like_to_go_home':'they_called_him_zeus_and_he'},
    {name:'Nathan',note:'saddler_of_iconium_a_jew_who_believes',if:inIco},
    {name:'Xanthos',note:()=>F.paid?'he_has_his_cover_to_the_last':'carrier_of_iconium',if:()=>inIco()&&(F.metXan||F.paid)},
    {name:'Tatia',note:()=>F.tatia?'wife_of_xanthos':'wife_of_xanthos_and_a_believer',if:inIco},
    {name:'Timothy',note:()=>F.back?'he_saw_the_garlands_and_then':'son_of_eunice_taught_the_holy',if:()=>atLystra()&&F.metTim},
    {name:'Eunice',note:()=>F.strong?'she_asked_whether_it_would':'jewish_woman_of_lystra',if:()=>atLystra()&&F.metTim},
    {name:'Lois',note:'mother_of_eunice',if:()=>atLystra()&&F.metTim},
    {name:'man_from_the_well_2',note:'lame_since_he_acts_14_8_9',if:()=>atLystra()&&F.healed},
    {name:'Zenon',note:'carter_of_derbe_and_a_disciple',if:inDer}],
  tasks:[
    {t:'finish_the_cover_i_promised_xanthos',if:()=>inIco()&&!F.sewn},
    {t:'put_the_finished_cover_into_xanthoss_hands',if:()=>inIco()&&F.sewn&&!F.paid},
    {t:'tatia_has_a_question',if:()=>inIco()&&!F.tatia},
    {t:'leave_iconium_by_the_south',if:()=>inIco()&&F.paid&&F.tatia},
    {t:'find_out_who_lives_in_lystra',if:()=>inLys()&&!F.healed},
    {t:'find_out_what_the_crowd_is_shouting',if:()=>inLys()&&F.healed&&!F.heard},
    {t:'stop_the_sacrifice_at_the_gate',if:()=>inLys()&&F.heard&&!F.stopped},
    {t:'go_back_into_the_city',if:inOut},
    {t:'mend_the_garments_we_ripped',if:()=>night()&&!F.mended},
    {t:'in_the_morning_derbe',if:()=>night()&&F.mended},
    {t:'choose_the_road_out_of_derbe',if:inDer},
    {t:'strengthen_the_disciples_in_lystra',if:()=>inHouse()&&F.back&&!F.strong},
    {t:'entrust_them_to_jehovah',if:()=>inHouse()&&F.back&&F.strong}],
  scripture:ORDER.map(k=>PASS[k])};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  iconium:{'mountains':{look:'snow_on_the_mountains_and_water'},
    'street_to_the_synagogue':{look:'the_street_to_the_synagogue',use:'not_today',open:'not_today'},
    'saddlery':{look:'nathans_shop'},'saddlers_bench':{look:'bench_is_clear'},
    'unfinished_cover':{look:'carriers_wagon_cover',use:BARN6.noCraft,pickup:'it_is_pauls_work_and_pauls_promise'},
    'fountain':{look:'good_water',use:'i_drink_said'},'poplars':{look:'poplars_they'},
    'xanthoss_wagon':{look:()=>say(BN,F.paid?'pauls_cover_on_the_wagon':'wagon_with_bare_hoops')},
    'gateway_of_the_yard':{look:'carriers_yard',use:'i_have_no_business_in_there',open:'i_have_no_business_in_there'},
    'south_gate':{look:'south_gate_and_the_road_into_lycaonia'}},
  lystra:{'hills':{look:'quiet_valley'},'fields':{look:'good_land_and_well_watered'},
    'city_wall':{look:'roman_wall_round_a_lycaonian_town'},
    'city_gate':{look:()=>say(BN,G.bulls?'bulls_said':'gate_we_came_in_by')},'bulls':{look:'white_bulls_garlanded',use:stop6},
    'door_of_a_house':{look:'somebodys_door',use:'it_is_not_my_house',open:'it_is_not_my_house'},'door_of_loiss_house':{look:'door_with_a_household_of_faith',use:'i_will_go_in_when_i_am_said',open:'i_will_go_in_when_i_am_said'},
    'well':{look:'the_well',use:speak6},
    'man_sitting_by_the_well':{look:'man_who_cannot_walk',talk:'he_nods_and_looks_past',use:'i_have_nothing_in_my_purse'},
    'farm_stall':{look:'figs_olives_grain'}},
  outside:{'hills':{look:'it_is_getting_dark'},'Lystra':{look:'lystra_said'},
    'city_gate':{look:'gate_said'},'bare_tree':{look:'bare_tree_and_winter_coming'},
    'stones':{look:'i_will_not_count_them',pickup:'no_2'},'road_to_derbe':{look:'derbe_road'}},
  house6:{'window':{look:()=>say(BN,F.back?'lane_in_daylight':'street_is_quiet')},'lamp':{look:'small_lamp'},
    'shelf':{look:'their_winter_store'},'hearth':{look:()=>say(BN,F.back?'cold_and_swept':'good_fire'),use:'i_warm_my_hands_said'},
    'bench':{look:'bench_and_a_blanket',use:()=>say(BN,F.back?'not_yet_2':F.mended?'in_a_moment_said':'in_this_mantle_i_should')},
    'water_jar':{look:'water_carried_from_the_well'},'table':{look:()=>say(BN,F.back?'empty_table':'their_supper_set_in_front_of_us')},'door_to_the_lane':{look:'the_door_to_the_lane'}},
  derbe:{'mountains':{look:'taurus_again'},'east_gate_of_derbe':{look:'derbe_said',use:'we_have_done_what_we_came',open:'we_have_done_what_we_came'},
    'threshing_floor':{look:'zenons_threshing_floor_said'},'plowed_field':{look:'someone_is_ready_for_the_early_rain'},
    'wagon':{look:'room_for_two_on_top_of_the_grain',use:'not_unless_paul_says_so_and_he'},'oxen':{look:'patient_beasts'},
    'milestone':{look:'miles_to_tarsus'},'our_baggage':{look:'our_bundles',pickup:'when_we_know_which_way'},
    'road':{look:'one_road_and_two_ways_along_it'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ PLACING THE CAST, SETUP ============ */
/* ENT: where Paul stands when a room is entered by a code. */
const ENT={iconium:[178,124,1],get lystra(){return F.healed?[262,126,1]:[112,124,1]},outside:[156,127,1],house6:[236,124,-1],derbe:[120,124,1]};
/* place6: put everyone where the story has them, for the room the two men are in. They keep together throughout. */
function place6(room){const o=other(),e=ENT[room];for(const a of[NA,XA,TA,TI,EN,LO,LM,PR,ZE])a.room=null;G.crowd=0;G.bulls=0;G.down=0;
  place(o,room,e[0]-e[2]*26,e[1]+2,e[2]);
  if(room==='iconium'){place(NA,room,92,114,1);place(TA,room,278,116,-1);place(XA,room,400,117,-1)}
  else if(room==='lystra'){place(TI,room,224,119,1);place(EN,room,204,115,1);place(LO,room,180,113,1);
    if(F.healed){place(LM,room,344,118,-1);G.crowd=F.heard?2:1}
    if(F.heard){G.bulls=1;place(PR,room,94,117,1)}}
  else if(room==='outside'){place(TI,room,194,123,-1);place(EN,room,210,130,-1);place(LO,room,104,131,1);place(LM,room,226,124,-1)}
  else if(room==='house6'){place(LO,room,120,116,1);place(EN,room,214,117,-1);place(TI,room,90,124,1);if(F.back)place(LM,room,176,114,-1)}
  else if(room==='derbe')place(ZE,room,158,119,-1)}
function setup6(){BN.hs=BN6;P.hs=PAUL6;P.called='Paul';Object.assign(BN,BARN6);BN.speed=0;BN.free=false;for(const id in BY6)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY6[id];
  place6('iconium');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,barnabas:['staff6']};drawInv()}
/* ============ SCENES: intro, the roads, ending; PRAYER HINTS ============ */
/* arrive6: after the map has drawn a leg, and before the room is shown: who is there, and what the account says of the road. */
async function arrive6(to,from){
  if(to==='lystra'&&from==='iconium'){dropAll('silver');place6('lystra');
    await narr('they_escaped_to_lystra_acts_14_6_7',{dur:9500});
    await narr('lystra_lay_a_days_walk',{dur:8500})}
  else if(to==='derbe'){place6('derbe');
    await narr('derbe_lay_about_100_kilometers',{dur:6500});
    await narr('there_they_told_acts_14_21',{dur:6000});
    await narr('no_one_followed_them_there_with_stones',{dur:6000})}
  else if(to==='lystra'){F.back=1;place6('house6');AU.mood='calm';
    await narr('when_that_city_acts_14_21',{dur:9500});
    await narr('they_went_back_by_the_road',{dur:6500})}}
async function start6(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(6);G.end={};G.scene=null;enterRoom('iconium',...ENT.iconium);place(NA,'iconium',30,116,1);codeBtn();await fade(0,600);
    await narr('iconium_in_the_province',{dur:3200});
    await narr('in_iconium_the_two_acts_14_1',{dur:10000});
    await narr('jews_who_did_acts_14_2',{dur:8000});
    await narr('it_was_on_jehovahs_acts_14_3',{dur:12500});
    await narr('people_of_the_city_acts_14_4',{dur:7500});
    await walk(NA,128,118);NA.dir=1;P.dir=-1;BN.dir=-1;
    await say(NA,'paul_barnabas_leave');
    await say(NA,'rulers_of_the_synagogue');
    await narr('people_of_the_nations_acts_14_5_6',{dur:10000});
    await say(BN,'stones_said');
    await say(P,'they_are');
    await walk(NA,92,114);NA.dir=1;
    await say(P,'cover_for_xanthoss_wagon_said',TH)},true)}
/* The way home (Acts 14:23-27). The road back is the road they came, so the map does not draw it twice: the light walks it, city by city. */
async function finale6(){playAs(P);AU.mood='calm';await Promise.all([walk(P,156,126),walk(BN,140,131)]);P.dir=1;BN.dir=1;
  for(const a of[P,BN,TI,EN,LO,LM])a.bow=true;
  await narr('in_every_congregation_acts_14_23',{dur:11500});
  for(const a of[P,BN,TI,EN,LO,LM])a.bow=false;
  await say(P,'elders_of_your_own_now');
  await say(TI,'will_you_come_again_sir');
  await say(P,'if_jehovah_permits_it_timothy');
  await say(LO,'go_in_peace_both_of_you');
  P.dir=1;walk(BN,292,118);await walk(P,272,113);await fade(1,700);AU.mood='hope';
  await narr('it_was_in_lystra_acts_14_21_23',{dur:9500});
  try{const M=await need('map');await M.journey(HOME,{view:'north',instant:1});codeBtn();await fade(0,700);
    for(const id of['lystra','iconium','antiochp','perga']){M.state.pulse=id;tone({f:1175,d:.18,type:'sine',v:.05,echo:1});await wait(1000)}
    await narr('their_road_took_acts_14_24_25',{dur:9500});
    await M.go('perga','attalia');
    await narr('from_attalia_they_sailed_for_antioch_acts_14_26',{dur:10500});
    await M.go('attalia','seleucia');await M.go('seleucia','antioch')}catch(e){console.error(e);await fade(0,400)}
  await narr('once_there_they_acts_14_27',{dur:12500});
  await narr('years_later_paul_2_timothy_3_11',{dur:9500});
  endScreen({title:'the_door_to_faith',text:'paul_paid_what_he_owed',
    extra:[F.debt&&'silver_left_for_the_brothers_in_iconium',F.copy&&'passage_read_with_young_timothy'].filter(Boolean),
    based:'based_on_acts_14_1_28_and_2',
    go:'click_to_continue_to_chapter_seven',code:['chapter_seven_code_code',codeOf(7,0)]});
  await wait(1500);ov.onclick=()=>startChapter(7);await new Promise(()=>{})}
/* HOME: the roads already travelled, as the closing map shows them. The crossing from Paphos to Perga is left off: the voyage home passes
   north of Cyprus, and two routes on the map must not cross. */
const HOME=[['perga','antiochp'],['antiochp','iconium'],['iconium','lystra'],['lystra','derbe']];
function hint6(){const b=PC()!==P,craft=['craft6',['that_is_the_tentmakers_craft_not_mine','paul_should_do_this_part']];
  if(inIco()){
    if(!F.sewn)return b?craft:F.leather?['sew6',['i_have_the_leather_now','i_should_use_the_leather_said']]
      :['leather6',['corners_of_the_cover_need_leather','i_should_talk_to_nathan']];
    if(!F.paid)return b?['paid6b',['cover_is_finished','paul_should_give_the_wagon']]
      :['paid6',['promise_is_kept_when_the_work','i_should_give_the_wagon']];
    if(!F.tatia)return b?['tatia6b',['tatia_does_not_doubt_the_danger','i_should_talk_to_tatia']]
      :['tatia6',['tatia_has_a_question_and_it','barnabas_should_talk_to_tatia']];
    return['go6',['nothing_is_owed_here_and_nothing','we_can_leave_by_the_south']]}
  if(inLys()){
    if(!F.metTim)return['tim6',['town_with_no_synagogue','i_should_talk_to_the_boy']];
    if(!F.healed)return b?['well6b',['everyone_comes_to_the_well','paul_should_use_the_well']]:['well6',['with_no_synagogue_the_well','i_should_use_the_well_and_speak']];
    if(!F.heard)return['hear6',['no_one_can_answer_what','i_should_talk_to_timothy']];
    return['stop6',['they_would_give_to_two',b?'we_should_go_to_the_city':'i_should_go_to_the_city_gate']]}
  if(inOut())return['in6',['disciples_are_inside_that_gate','we_should_go_in_at_the_city']];
  if(inHouse()){
    if(F.back)return F.strong?['home6',['they_have_been_strengthened','we_can_leave_by_the_door']]
      :b?['strong6b',['it_is_paul_whom_eunice_is_asking','paul_should_talk_to_eunice']]:['strong6',['eunice_must_not_be_told','i_should_talk_to_eunice']];
    if(!F.mended)return b?craft:['mend6',['we_ripped_our_garments_at_the_gate','i_should_use_the_thread']];
    return['derbe6',['mended_fed_and_alive','we_can_leave_by_the_door_said']]}
  return['back6',['short_way_home_lies_east','we_can_take_the_road_and_choose']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={nod:['yes_sir'],
  shake:['no_sir',
  'no_sir_said',
  'no_let',
  'no_2']};
return{acting:ACTING,rooms:['iconium','lystra','outside','house6','derbe'],setup:setup6,start:start6,hint:hint6,music:MUSIC,topics:TOPICS,tablets:TABLETS,
  /* painters: the chapter's animal, for the playtest, which checks that every part of it is attached and shows it enlarged */
  painters:{ox},
  /* Iconium, Lystra and Derbe lie north of the map's usual window, so this chapter looks through the northern one */
  view:'north',
  places:{
    antiochp:{room:'-',if:()=>false,no:()=>say(PC(),inDer()?'antioch_yes_the_last_of_the_three':'they_threw_us_outside_its_boundaries')},
    iconium:{room:'iconium',x:178,y:124,dir:1,if:()=>false,no:()=>say(PC(),inDer()?'iconium_yes':'there_are_stones_waiting')},
    lystra:{get room(){return atLystra()?G.room:inDer()?'house6':'lystra'},get x(){return ENT[this.room][0]},get y(){return ENT[this.room][1]},get dir(){return ENT[this.room][2]},if:()=>inIco()||inDer()},
    derbe:{room:'derbe',x:120,y:124,dir:1,if:night,no:'derbe_lies_beyond_lystra'},
    tarsus:{room:'-',hide:()=>!inDer(),if:()=>false,no:eastNo}},
  way:()=>[['antiochp','iconium']].concat(inIco()?[]:[['iconium','lystra']],inDer()||F.back?[['lystra','derbe']]:[]),arrive:arrive6,
  flags:['leather','sewn','paid','debt','tatia','metXan','metTim','healed','heard','stopped','mended','copy','back','strong'],
  codeBits:{flags:20,rooms:3,share:9},party:['paul','barnabas'],home:{staff6:'barnabas'},share:['awl','thread','knife','tablets','staff6','corners','cover','silver'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.leather&&!F.sewn,'corners');add(F.sewn&&!F.paid,'cover');add(F.paid&&!F.debt&&room==='iconium','silver');inv.push('staff6');return inv},
  place:place6}
});
