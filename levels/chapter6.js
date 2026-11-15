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
   garlands (mood "feast") the drum doubles, hands clap, and the pipe goes round and round on four notes. */
const _=null,
 TUNE=[[[0,4,4],[4,3,2],[6,4,2],[8,6,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,2,8]],[[0,4,2],[2,5,2],[4,6,4],[8,7,2],[10,6,2],[12,4,4]],[[0,5,4],[4,3,4],[8,4,8]],
  [[0,7,4],[4,8,2],[6,7,2],[8,6,4],[12,4,4]],[[0,5,4],[4,6,2],[6,4,2],[8,3,8]],[[0,2,2],[2,3,2],[4,4,2],[6,6,2],[8,4,4],[12,2,4]],[[0,1,4],[4,0,12]]],
 MUSIC={dt:.16,root:53,scale:[0,2,4,6,7,9,11],bars:16,tracks:[
  {inst:'lyre',moods:['hope'],prog:'ABACABCA',len:3,seq:{A:[0,_,4,_,7,_,4,_,2,_,4,_,7,_,4,_],B:[1,_,4,_,8,_,4,_,1,_,5,_,8,_,5,_],C:[-2,_,2,_,5,_,2,_,-1,_,3,_,6,_,3,_]}},
  {inst:'harp',moods:['calm'],prog:'ABACABCA',len:3,seq:{A:[0,_,_,4,_,_,7,_,_,_,4,_,_,_,2,_],B:[1,_,_,4,_,_,8,_,_,_,5,_,_,_,1,_],C:[-2,_,_,2,_,_,5,_,_,_,3,_,_,_,-1,_]},oct:12},
  {inst:'bass',moods:['hope','calm'],prog:'ABACABCA',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],C:[-9,_,_,_,_,_,_,_,-8,_,_,_,_,_,-6,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d..st.s.d.s.t.s.',B:'d..st.s.d.k.t.tk'}},
  {drum:1,moods:['calm'],seq:{A:'d.........t.....'},vol:.45},
  {drum:1,moods:['tense'],seq:{A:'d.......d..d....'},vol:.8},
  {drone:[0,7],every:32,moods:['tense']},
  {inst:'oud',moods:['tense'],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,3,_,_,_,_,_,4,_,_,_],B:[0,_,_,_,_,_,-1,_,_,_,3,_,_,_,_,_]},vol:.7},
  {drum:1,moods:['feast'],prog:'AB',seq:{A:'d.tkd.t.d.tkd.tc',B:'d.tkd.tcd.tkc.tc'},vol:1.1},
  {drum:1,moods:['feast'],seq:{A:'s.s.s.s.s.s.s.s.'},vol:.9},
  {drone:[0],every:16,moods:['feast'],vol:.6},
  {inst:'aulos',moods:['feast'],prog:'AAAB',len:2,oct:12,seq:{A:[4,_,6,_,4,_,3,_,4,_,6,_,7,_,6,_],B:[4,_,6,_,7,_,8,_,7,_,6,_,4,_,3,_]},vol:.9},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
const SH='#8f95c8';
/* What is seen through a city gate: sky, hills and the road running on. */
function gateView(g,x,y,w,h,st){g.save();arch(g,x,y,w,h);g.clip();sky(g,480,y+h-18,st||['#5a98d8','#a8cdea','#dfeaf0']);
  ridge(g,x,x+w,y+h-12,q=>9+3*Math.sin(q/5+1),['#a9b4c8','#c2cad4']);ridge(g,x,x+w,y+h-12,q=>3+2*Math.sin(q/3),['#98a86c','#a8b47c']);
  R(g,x,y+h-12,w,12,'#c4c08a');poly(g,[x+w*.45,y+h-12,x+w*.6,y+h-12,x+w*.95,y+h,x+w*.15,y+h],'#ead9ae');
  ao(g,x,y,w,10,'t',.55,'#2a2440');ao(g,x,y,5,h,'l',.5,'#2a2440');ao(g,x+w-4,y,4,h,'r',.35,'#2a2440');g.restore()}
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* rock: a stone sitting on the ground at x,y */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.5,x-w/2,y-h,w,h,'overlay',1)})}
/* poplar: a tall narrow tree, such as line every water channel of the plateau */
function poplar(g,x,y,h,c,r){R(g,x-.6,y-h*.24,1.3,h*.24,'#5a4630');foliage(g,x,y-h*.6,h*.11+1.6,h*.42,c||'#5f8a4a',r,h*2.4)}
/* bundles: what the two men carry between them: two bed rolls and a bag */
function bundles(g,x,y){for(const[dx,dy,w,hh,c]of[[0,-5,17,5,'#8a5a4a'],[4,-9.6,15,4.6,'#6f7a5a']]){oval(g,x+dx+w/2+2,y+dy+hh+.4,w/2+3,1.4,'rgba(40,30,60,.35)');g.fillStyle=lg(g,0,y+dy,0,y+dy+hh,[tint(c,.3),c,tint(c,-.5)]);g.fillRect(x+dx,y+dy,w,hh);
    for(let i=0;i<w;i+=2.5)R(g,x+dx+i,y+dy,.5,hh,'rgba(0,0,0,.22)');oval(g,x+dx,y+dy+hh/2,hh*.32,hh/2,tint(c,.12));oval(g,x+dx+w,y+dy+hh/2,hh*.32,hh/2,tint(c,-.35))}
  g.fillStyle=lg(g,x+22,0,x+33,0,['#3a302a','#2a211c','#17110e']);g.beginPath();g.ellipse(x+27.6,y-3.4,5.6,3.6,0,0,6.2832);g.fill();R(g,x+23,y-5,9,.6,'#8a7a5a')}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.55,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
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
function wagon(g,x,y,cov,load){oval(g,x+30,y+.6,36,2.2,'rgba(30,26,50,.35)');
  for(const wx of[x+13,x+47])oval(g,wx+2.4,y-6,5.4,5.6,'#33261a');
  wood(g,x,y-13.6,60,4.6,'#7a5a34');R(g,x,y-9,60,1,'#3a2a1a');R(g,x+60,y-12,13,1.6,'#6a4a2a');R(g,x+60,y-12,13,.5,'#a07a48');
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
ART.iconium={w:480,fp:1.3,
 paint(g){const r=rng(431),W='#e6d8b4',ST='#d8ccae';
  sky(g,480,72,['#3c7ac8','#6ea4dc','#a8cae6','#e2e8dc']);cloud(g,236,12,60,7,r);cloud(g,360,22,40,5,r);cloud(g,70,8,40,5,r);
  /* beyond the fountain: the plateau, its orchards, and the mountains that close it in */
  snowy(g,186,300,66,sultan6,['#7f90bc','#9eaccc','#c0c8cc'],33);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,68,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(186,34,114,34)});
  g.fillStyle=lg(g,0,64,0,104,['#b4bc7c','#a2b468','#8fa858']);g.fillRect(186,64,114,40);tex(g,'mott',.5,186,64,114,40,'overlay',1);
  for(let i=0;i<7;i++){const fx=188+i*15+r()*6,fy=67+r()*8;poly(g,[fx,fy,fx+20,fy-1,fx+26,fy+7,fx+3,fy+8],i%3===0?'rgba(214,196,110,.42)':i%3===1?'rgba(96,140,70,.36)':'rgba(170,130,84,.3)')}
  for(const[x,y]of[[200,80],[228,75],[260,79],[286,84],[244,84]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#6f8a58',r,20)}
  /* the street we came by, running back to the synagogue of the Jews */
  R(g,0,40,60,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,28,60,76);g.clip();sky(g,480,80,['#6ea4dc','#e2e8dc']);
  for(const[hx,hy,hw,hh,c]of[[0,42,18,62,'#d6caa8'],[42,48,18,56,'#e2d6b4'],[16,56,10,48,'#c8bc9c'],[32,60,9,44,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[18,104,42,104,33,74,27,74],'#e0d6ba');ao(g,0,28,60,12,'t',.2,'#2a2440');g.restore();
  /* Nathan's saddlery: a plastered house, its whole front open to the street under an awning */
  house(g,60,24,126,80,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,72,34,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,162,34,10,10,W,{bars:2,wood:'#6a4e2c'});
  R(g,84,56,84,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c211a','#4a382a']);g.fillRect(86,58,80,46);
  /* inside: a shelf of pack saddles, and hides rolled on the floor */
  wood(g,88,70,76,1.6,'#5a4226');for(const[sx,c]of[[94,'#8a5a34'],[110,'#a06a3c'],[126,'#7a4c2c'],[144,'#96643a']]){g.fillStyle=lg(g,sx,0,sx+11,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+5.5,70,5.6,4.6,0,Math.PI,0);g.fill();R(g,sx+1,66.4,9,.6,tint(c,.4))}
  for(const[sx,c]of[[96,'#9a6a40'],[108,'#7a5030'],[152,'#8a5c36']]){g.fillStyle=lg(g,0,96,0,104,[tint(c,.25),c,tint(c,-.45)]);g.fillRect(sx,97,10,7);oval(g,sx,100.5,1.6,3.5,tint(c,.15));oval(g,sx+10,100.5,1.6,3.5,tint(c,-.3))}
  /* harness on a bar across the opening: collars, girths and bridles, hanging */
  wood(g,84,58,84,1.8,'#7a5c36');for(const[sx,ln,c]of[[92,16,'#6a4424'],[99,22,'#8a5a30'],[118,13,'#5a3a20'],[137,20,'#7a4c28'],[158,15,'#6a4424']]){R(g,sx,59.8,1.2,ln,c);R(g,sx,59.8,.5,ln,tint(c,.3));oval(g,sx+.6,59.8+ln+1.6,1.8,1.8,c);oval(g,sx+.6,59.8+ln+1.6,.8,.8,'#231a15')}
  for(const sx of[108,147]){g.strokeStyle='#5a3a20';g.lineWidth=2.4;g.beginPath();g.ellipse(sx,67.6,3.8,6,0,0,6.2832);g.stroke();g.strokeStyle='#a8743e';g.lineWidth=.7;g.beginPath();g.ellipse(sx-.4,67.4,3.8,6,0,2.6,5);g.stroke()}
  ao(g,84,56,84,10,'t',.6);ao(g,84,56,7,48,'l',.45);
  wood(g,82,48,2.4,57,'#6a4e2c',1);wood(g,168,48,2.4,57,'#6a4e2c',1);awning(g,80,41,92,9,'#3f5a7a','#e6dcc4',8);shade(g,[80,104,172,104,180,111,88,111],SH,.5);
  /* the saddler's bench, out in the light */
  R(g,104,97,50,9,'rgba(40,30,60,.38)');wood(g,105,95,3,11,'#6a4e2c',1);wood(g,148,95,3,11,'#6a4e2c',1);wood(g,102,90,52,4.6,'#96703e');R(g,102,94.2,52,1.2,'#5a4226');
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
  wood(g,372,50,58,3.4,'#6a4e2c');R(g,372,53.2,58,.8,'#2a1c10');ao(g,377,55,48,12,'t',.6);ao(g,377,55,7,49,'l',.45);
  windowArt(g,318,46,9,9,ST,{bars:2});for(const x of[312,340]){oval(g,x,96,1.6,1.6,'#4a443c');oval(g,x,96,.8,.8,ST)}
  /* the south gate, and the road to Lycaonia */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#d8ceb4',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[300,104,438,104,446,109,308,109],SH,.45);shade(g,[0,104,60,104,60,107,0,110],SH,.5);shade(g,[186,104,222,104,226,107,190,107],SH,.4);
  pool(g,240,0,300,160,'#fff4d0',.14,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050')},
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
ART.lystra={w:480,fp:1.3,
 paint(g){const r=rng(443),ST='#c8b890',MB='#d8c49a',MB2='#cdb68a';
  sky(g,480,74,['#4080c8','#74aadc','#b0cee6','#e8e8d4']);cloud(g,290,12,56,7,r);cloud(g,410,22,40,5,r);cloud(g,170,8,36,5,r);
  /* the valley beyond the wall: hills, fields, and the Taurus far to the south */
  snowy(g,236,480,68,x=>22+8*Math.sin(x/61+3)+4*Math.sin(x/19)+2*Math.sin(x/7),['#7f90bc','#9eaccc','#c0c8cc'],28);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,40,0,70,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(236,40,244,30)});
  ridge(g,236,480,70,lyhill,['#8fa468','#a2b274']);
  g.fillStyle=lg(g,0,68,0,104,['#b8bc78','#a8b464','#98aa58']);g.fillRect(236,68,244,36);tex(g,'mott',.5,236,68,244,36,'overlay',1);
  for(let i=0;i<10;i++){const fx=238+i*24+r()*8,fy=71+r()*9;poly(g,[fx,fy,fx+26,fy-1,fx+33,fy+8,fx+3,fy+9],i%3===0?'rgba(226,204,112,.46)':i%3===1?'rgba(96,140,70,.36)':'rgba(176,136,86,.32)')}
  for(const[x,y]of[[252,82],[300,78],[328,84],[452,80],[470,86]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#6f8a58',r,20)}
  /* the wall of the colony, and the gate that leads out to the valley */
  ashlar(g,0,22,100,82,ST,r,{bw:12,bh:6,v:.1,t:.4});for(let i=0;i<98;i+=9){R(g,i,17.6,5.6,4.4,ST);R(g,i,17.6,5.6,.5,'#eadcb4')}R(g,0,21.6,100,1,'#98886a');
  arch(g,26,48,48,56,'#b2a27c');gateView(g,29,51,42,53);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,50+Math.cos(a)*24-.3,72+Math.sin(a)*24-1,.6,2.6,'#98886a')}
  poly(g,[100,17.6,105,21,105,104,100,104],'#9a94a8');
  /* a house of mud brick and timber, and beside it the house of Lois */
  house(g,105,32,58,72,MB2,r,{side:0,patch:4,cracks:5,beams:10,brick:'#a8875a'});windowArt(g,118,46,9,9,MB2,{bars:2,wood:'#6a4e2c'});R(g,138,66,18,38,'#bca67c');doorArt(g,140,68,14,36,'#6a4a2c',r,{pw:4.6});
  house(g,163,26,73,78,MB,r,{side:0,patch:3,cracks:4,beams:11,brick:'#a8875a'});windowArt(g,172,42,10,10,MB,{bars:2,wood:'#6a4e2c'});windowArt(g,216,42,10,10,MB,{bars:2,wood:'#6a4e2c'});
  R(g,187,60,28,44,'#c8b288');doorArt(g,190,63,22,41,'#7a5a3a',r);R(g,186,102.6,30,1.6,'#e0d2ac');
  stroke(g,[216,104,217,86,215,70,219,58],'#5a4630',1.2);foliage(g,206,57,15,4.6,'#5f8a4a',r,50);foliage(g,221,64,4.6,8,'#527c40',r,22);
  /* a low wall at the edge of the hill, and the country beyond it */
  ashlar(g,236,92,244,12,'#c4b48c',r,{bw:9,bh:4,v:.11,t:.34});R(g,236,91,244,1.4,'#e2d4aa');
  /* a farmer's stall against the last house: grain, and the fruit of the valley */
  house(g,392,36,88,68,MB2,r,{side:0,patch:3,cracks:4,beams:10,brick:'#a8875a'});windowArt(g,452,48,9,9,MB2,{bars:2,wood:'#6a4e2c'});R(g,404,68,18,36,'#bca67c');doorArt(g,406,70,14,34,'#6a4a2c',r,{pw:4.6});
  wood(g,428,56,2.2,50,'#6a4e2c',1);wood(g,476,56,2.2,50,'#6a4e2c',1);awning(g,426,50,54,8,'#8a6a3a','#e6dcc4',7);shade(g,[426,104,480,104,480,111,434,111],SH,.5);
  R(g,432,97,44,8,'rgba(40,30,60,.38)');wood(g,430,92,48,4,'#96703e');R(g,430,95.8,48,1,'#5a4226');
  for(const[bx,c]of[[436,'#b84a34'],[448,'#c9a23a'],[460,'#6a8a3a'],[471,'#8a4a6a']]){vessel(g,bx,92,4.6,4.4,'#a8844e','bowl',{noShadow:1});for(let i=0;i<6;i++)oval(g,bx-3+r()*6,86.6+r()*1.6,1.2,1,tint(c,(r()-.5)*.3))}
  sack(g,418,106,6,11,'#d8c698');sack(g,426,107,5.4,9,'#cdbb8c');
  /* the well: a curb of field stone, two posts and a beam. The rope is wound on the beam and runs slanting down to the curb: a rope hanging
     straight from the middle of the beam would make a T of it. */
  shade(g,[262,107,300,107,310,113,272,113],SH,.5);
  wood(g,265,72,2.4,24,'#6a4e2c',1);wood(g,293.6,72,2.4,24,'#6a4e2c',1);wood(g,262,70,36,2.6,'#7a5c36');
  ashlar(g,264,95,33,12,'#b8ac94',r,{bw:7,bh:4,v:.14,t:.4});oval(g,280.5,107,16.5,2.4,'#8a8270');oval(g,280.5,95,16.5,3.2,'#d8ceb6');oval(g,280.5,95.3,13.6,2.3,'#1e1a1c');
  for(let i=0;i<5;i++)R(g,275+i*1.6,69.6,1,3.4,i%2?'#8a7450':'#a8905e');stroke(g,[283,73,286,84,290,95.6],'#8a7450',.8);
  vessel(g,304,108,4,7,'#7a5a34','bowl',{noShadow:1});R(g,301.6,100.4,4.8,.8,'#5a4226');
  /* the ground: trodden earth, paved only round the well */
  earth(g,0,103,480,144,'#c8b48a',r,220);ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  for(let i=0;i<26;i++){const a=r()*6.28,d=18+r()*16;oval(g,280+Math.cos(a)*d*1.5,111+Math.abs(Math.sin(a))*d*.3,3+r()*2,1+r()*.6,r()<.5?'#b4a88e':'#d2c6aa')}
  shade(g,[0,104,105,104,120,112,0,114],SH,.55);shade(g,[105,104,236,104,242,108,111,108],SH,.4);
  pool(g,300,0,300,160,'#fff4d0',.14,'screen');ao(g,0,0,100,144,'l',.1,'#2a2050')},
 fore(g){const r=rng(444);/* a heap of straw, a wine jar, and thistles at the roadside */
  for(let i=0;i<70;i++){const sx=40+r()*60;stroke(g,[sx,152,sx+(r()-.5)*14,132+r()*10],r()<.5?'#c8b060':'#a89048',1)}
  vessel(g,560,152,10,26,'#5a2e1e','amph',{noShadow:1});rock(g,26,152,30,14,'#7a7468');
  for(let i=0;i<20;i++){const sx=590+r()*46;stroke(g,[sx,150,sx+(r()-.5)*5,136-r()*8],'#4f6c3a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* the man who has never walked: he sits by the well with his back to its curb, a blanket over his feet */
  if(!F.healed){g.save();g.beginPath();g.rect(300,60,40,50);g.clip();man(g,324,127.4,'lame',-1,0,null,0,0);g.restore();
    oval(g,316,111.4,20,2.2,'rgba(30,26,50,.3)');poly(g,[297,111,298,107.4,303,105.6,313,105.4,323,103.6,333,105.6,337,111],'#7a5a4a');poly(g,[297,111,298,107.4,303,105.6,313,105.4,323,103.6,322,111],'#94705c');
    for(let i=0;i<6;i++)R(g,302+i*5.6,106.8+(i%2)*.6,.6,3.6,'rgba(40,24,20,.4)');R(g,297,110.4,40,.9,'#5a4034')}
  /* the people of Lystra, when they come running: first they face the well, then the gate */
  if(G.crowd)CROWD.forEach(([id,x,y],i)=>man(g,x,y+((Math.floor(t/700)+i)%5===0?-.6:0),id,G.bulls?-1:1,0,null,G.crowd>1&&(Math.floor(t/500)+i)%3===0?1:0,7));
  /* the bulls, garlanded, brought to the gates (Acts 14:13) */
  /* side by side, the far one half a head in front, so that neither hides the other's head */
  if(G.bulls){cattle(g,51,112.6,1,0,'#d8c8b0',1);cattle(g,44,116.4,1,0,'#e6dccc',1)}},
 front(){}};
/* ---------- Outside Lystra, at dusk ---------- */
ART.outside={w:320,
 light:()=>({amb:'#e8b49c'}),
 paint(g){const r=rng(457);
  sky(g,320,86,['#27356e','#5a4f8e','#b0667a','#e8905a','#f6c878']);pool(g,70,84,90,26,'#ffe0a0',.5,'screen');
  for(const[cx,cy,w]of[[210,22,60],[110,36,44],[280,44,34]])cloud(g,cx,cy,w,5,r,'#f0a888','#6a5a94');
  ridge(g,0,320,84,x=>14+7*Math.sin(x/53+1)+3*Math.sin(x/19),['#5a4a7c','#74608a']);ridge(g,0,200,86,x=>6+3*Math.sin(x/23+2),['#4a4468','#5a5270']);
  /* Lystra on its low hill: the wall, the gate, a lamp already lit inside it */
  ridge(g,150,320,90,x=>Math.max(0,22-(x-262)*(x-262)/560),['#5c5270','#6a6078']);
  ashlar(g,196,46,124,34,'#8a7c88',r,{bw:10,bh:5,v:.08,t:.4,m:'#4a4058'});for(let i=196;i<320;i+=8)R(g,i,42.4,4.6,4,'#8a7c88');R(g,196,45.6,124,1,'#5a5068');
  for(const[hx,hy,hw,hh]of[[206,36,16,10],[232,32,14,14],[292,35,18,11]]){R(g,hx,hy,hw,hh,'#7a6c80');R(g,hx,hy-1.6,hw,2,'#6a4a50');R(g,hx+hw-3,hy,3,hh,'#5a5068')}
  R(g,252,40,26,40,'#94869a');for(let i=252;i<278;i+=6)R(g,i,36.4,3.6,4,'#94869a');arch(g,257,54,16,26,'#2a2238');pool(g,265,70,9,9,'#ffb860',.75,'screen');
  /* the valley floor: stubble, and the road that runs up to the gate */
  g.fillStyle=lg(g,0,80,0,110,['#7a6c68','#8a7a64','#96845e']);g.fillRect(0,80,320,30);tex(g,'mott',.5,0,80,320,30,'overlay',1);
  poly(g,[257,80,273,80,250,96,212,108,150,110,196,98,240,88],'#b89c78');
  earth(g,0,108,320,144,'#9a8468',r,160);ao(g,0,108,320,6,'t',.3,'#2a2048');
  for(let i=0;i<2;i++)stroke(g,[0,118+i*8,110,117+i*8,230,118.6+i*8,320,118+i*8],'rgba(70,56,60,.3)',.8);
  /* a wild pear, bare already, and the stones of a field wall that has fallen */
  stroke(g,[38,110,37,92,41,78,36,64],'#3a3040',3);stroke(g,[39,92,48,80,56,74],'#3a3040',1.6);stroke(g,[38,84,28,72,22,68],'#3a3040',1.6);stroke(g,[40,74,46,62,45,54],'#3a3040',1.2);stroke(g,[37,70,30,58],'#3a3040',1);
  for(const[x,y,w,h]of[[70,112,9,5],[82,113,7,4],[92,111.6,10,6],[104,113,6,3.6],[61,113.4,6,3.4]])rock(g,x,y,w,h,'#7c7078');
  /* the light is going: long shadows, and a warm edge on everything that faces west */
  comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['#f0d0b0','#c0a8c8']);g.fillRect(0,86,320,58)});pool(g,60,96,150,60,'#ffc890',.3,'screen');ao(g,200,0,120,144,'r',.2,'#1a1838')},
 fore(g){const r=rng(458);rock(g,300,150,34,16,'#4a4458');for(let i=0;i<40;i++){const sx=r()*320;stroke(g,[sx,150,sx+(r()-.5)*6,136-r()*8],r()<.5?'#5a5440':'#3a3848',.8)}
  comp(g,'source-atop',.5,()=>R(g,0,0,320,150,'#2a2450'))},
 draw(g,t){/* the stones that were thrown, lying where they fell */
  for(const[x,y,w,h]of[[118,127,5,3],[134,131,6,3.4],[150,124,4.6,2.6],[164,130,5.6,3],[176,126,4,2.4],[142,121,4,2.2],[126,134,5,2.8]])rock(g,x,y,w,h,'#8a7c7c');
  /* Paul, as they left him: face down, his mantle over him */
  if(G.down){const x=0,y=0,L='#e8b49c',sk=mul('#c08a5c',L),cl=mul('#6e4a2e',L),tu=mul('#c4b08a',L),hr=mul('#2a1a12',L);
    g.save();g.translate(132,129);g.scale(1,1.4);oval(g,x+25,y+.4,29,2,'rgba(20,16,40,.42)');
    R(g,x+41,y-3.5,9,2.5,sk);R(g,x+41,y-1.5,9,.5,tint(sk,-.3));R(g,x+49.5,y-5,2.5,5,sk);R(g,x+51.5,y-5,.5,5,'#2a1810');R(g,x+36,y-4.5,6,4.5,tu);R(g,x+36,y-1,6,1,tint(tu,-.3));
    poly(g,[x+7,y,x+8,y-4.6,x+14,y-6.6,x+26,y-7,x+35,y-5.6,x+38,y-3,x+38.6,y],cl);poly(g,[x+8,y-4.6,x+14,y-6.6,x+26,y-7,x+35,y-5.6,x+33,y-4.4,x+24,y-5.4,x+14,y-5],tint(cl,.22));
    for(const fx of[16,23,30])stroke(g,[x+fx,y-6.4,x+fx+1.6,y-.6],tint(cl,-.35),.6);R(g,x+7,y-1,31.5,1,tint(cl,-.45));
    R(g,x+10,y-2.5,9,2,sk);R(g,x+18.5,y-3,2.5,2.5,sk);R(g,x+10,y-.5,11,.5,tint(sk,-.35));
    oval(g,x+4,y-3.4,3.4,3.2,sk);poly(g,[x+.4,y-3.4,x+1.2,y-6,x+4,y-7,x+6.6,y-6,x+5,y-5,x+2.4,y-4.4,x+1.6,y-1.4],hr);oval(g,x+6.4,y-1.8,2,1.5,hr);g.restore()}
  pool(g,265,70,6+Math.sin(t/230),6,'#ffb860',.25,'screen')},
 front(){}};
/* ---------- Lystra: the house of Lois and Eunice ---------- */
ART.house={w:320,q:12,
 variant:()=>F.back?'d':'n',
 light:()=>F.back?{amb:'#f0e8dc'}:{amb:'#7c6f86',lamps:[[150,58,60,'#7a5420'],[92,96,46,'#7a3c14']]},
 paint(g,v){const r=rng(461),W='#d8c8a4',day=v==='d';
  plaster(g,0,0,320,104,W,r,{patch:4,cracks:6,brick:'#a8875a',t:.5});for(let i=14;i<320;i+=34)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* a window on the lane */
  windowArt(g,52,28,16,16,W,{dark:day?'#bfe0f4':'#141c3c',bars:2,wood:'#6a4e2c'});if(!day){R(g,57,33,1,1,'#f4f0d8');R(g,64,39,.6,.6,'#d8d4c0')}
  /* a niche for the lamp, and under it a shelf of household jars */
  arch(g,142,44,16,20,tint(W,-.34));arch(g,143.6,45.6,12.8,18.4,'#4a3828');R(g,146,60.6,8,2.4,'#b8733c');R(g,146,60.6,8,.6,'#e0a064');R(g,152.6,59.6,2.2,1.4,'#b8733c');
  wood(g,172,62,58,2.4,'#7a5c36');R(g,174,64.4,2,6,'#5a4226');R(g,226,64.4,2,6,'#5a4226');
  vessel(g,182,62,4,10,'#a05a34','jug');vessel(g,196,62,5,8,'#8a6a44','jar');vessel(g,210,62,3.6,9,'#b8733c','jug');vessel(g,222,62,4,6,'#7a5a3a','bowl');
  /* the hearth in the corner, built of field stone */
  ashlar(g,78,92,30,12,'#a89c88',r,{bw:7,bh:4,v:.14,t:.4});R(g,78,91,30,1.4,'#cfc4ac');R(g,82,94,22,8,'#1c1412');poly(g,[84,102,88,97,96,96,102,102],'#3a2a22');
  poly(g,[80,91,84,40,102,40,106,91],'rgba(30,20,20,.28)');
  /* a bench along the wall, with a blanket folded on it */
  R(g,6,92,62,12,'rgba(40,30,60,.3)');wood(g,6,86,62,4,'#8a6a40');wood(g,8,90,3,14,'#5a4226',1);wood(g,63,90,3,14,'#5a4226',1);
  g.fillStyle=lg(g,0,81,0,86,['#9a5a4a','#7a4438','#4a2a24']);g.fillRect(14,81.4,24,4.6);for(let i=0;i<24;i+=3)R(g,14+i,81.4,.5,4.6,'rgba(0,0,0,.2)');
  /* the door to the lane */
  R(g,266,48,34,56,'#c4b48e');doorArt(g,269,51,28,53,'#6a4a2c',r,{left:1});
  /* a great jar of water by the door */
  vessel(g,250,106,7,20,'#9a5a36','pithos');
  /* the floor: beaten earth, and a woven mat where the household eats */
  earth(g,0,103,320,144,'#b8a482',r,90);ao(g,0,103,320,6,'t',.4,'#3a3050');
  clipTo(g,()=>poly(g,[128,112,240,112,252,130,116,130]),()=>{R(g,116,112,136,18,'#9a6a4a');for(let i=0;i<6;i++)R(g,116,113.4+i*3,136,1.1,i%2?'#d8b878':'#5a3a2c');tex(g,'mott',.4,116,112,136,18,'overlay',1);ao(g,116,112,136,5,'t',.25)});
  /* a low table with the supper on it */
  R(g,168,122,44,3,'rgba(30,20,40,.4)');wood(g,170,112,40,3,'#96703e');wood(g,172,115,2.6,8,'#5a4226',1);wood(g,205,115,2.6,8,'#5a4226',1);
  if(!day){vessel(g,182,112,4.6,3.6,'#a8844e','bowl',{noShadow:1});g.fillStyle=lg(g,0,107,0,112,['#e8c078','#c9a060','#8a6630']);g.beginPath();g.ellipse(197,110.4,5.6,2.2,0,0,6.2832);g.fill()}
  if(day)lightmap(g,320,'#b8b0a8',l=>{pool(l,60,36,30,26,'#fff8e4',1);l.fillStyle=lg(l,0,44,0,140,['rgba(255,244,210,.5)','rgba(255,244,210,0)']);poly(l,[52,44,68,44,150,140,70,140]);l.fill();
      pool(l,283,80,40,60,'#fff4dc',.7);pool(l,160,120,170,44,'#fff0d8',.5)});
  else lightmap(g,320,'#5a5068',l=>{pool(l,150,56,64,50,'#ffc070',.95);pool(l,92,98,52,40,'#ff9a48',.8);pool(l,170,122,120,30,'#ffd090',.35);pool(l,60,36,16,14,'#8090c8',.5)})},
 fore(g){/* the edge of a storage chest, nearest us */
  R(g,0,134,58,10,'#3a2c20');R(g,0,134,58,.8,'#7a6248');R(g,56,134,2,10,'#241a12');R(g,262,138,58,6,'#3a2c20');R(g,262,138,58,.8,'#7a6248')},
 draw(g,t){if(!F.back){flame(g,153.6,59.4,t);pool(g,154,57,9+Math.sin(t/190),7,'#ffb050',.16);for(let i=0;i<3;i++)flame(g,88+i*5,100.6-(i%2),t+i*230,i===1);pool(g,93,97,16+Math.sin(t/160)*1.4,9,'#ff8a3a',.2)}
  else{/* the older men of Lystra and the rest of the congregation, come in from the lanes */
    for(const[id,x,y,d]of GATHER)man(g,x,y,id,d,0,'#f0e8dc',0,7)}},
 front(){}};
/* ---------- Derbe: the east road, after the harvest ---------- */
const taur6=x=>38+12*Math.sin(x/71+2.2)+6*Math.sin(x/27+1)+3*Math.sin(x/9);
ART.derbe={w:320,
 paint(g){const r=rng(467),ST='#d2c4a0';
  sky(g,320,80,['#3e7cc8','#74a8dc','#b4cee4','#ece8d0']);cloud(g,140,14,60,7,r);cloud(g,250,8,40,5,r);cloud(g,60,26,36,5,r);
  /* the Taurus, close now: the road east runs for the gap in it */
  snowy(g,60,320,76,taur6,['#7f8ebc','#9eaacb','#c2c8cc'],32);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,30,0,76,['rgba(226,222,200,0)','rgba(226,222,200,1)']);g.fillRect(60,30,260,46)});
  ridge(g,60,320,78,x=>8+4*Math.sin(x/31+1)+2*Math.sin(x/11),['#a0a878','#b2b486']);
  /* the wall and the east gate of Derbe */
  ashlar(g,0,26,78,78,ST,r,{bw:12,bh:6,v:.09,t:.35});for(let i=0;i<76;i+=9){R(g,i,21.6,5.6,4.4,ST);R(g,i,21.6,5.6,.5,'#f0e4c0')}R(g,0,25.6,78,1,'#a09070');
  arch(g,18,50,42,54,'#b8a880');g.save();arch(g,21,53,36,51);g.clip();R(g,21,53,36,51,'#cfc2a0');for(const[hx,hy,hw,hh,c]of[[21,62,12,42,'#d6caa8'],[44,58,13,46,'#e2d6b4'],[32,70,13,34,'#c8bc9c']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.2,'#b8603c')}
  poly(g,[28,104,52,104,44,84,36,84],'#e0d6ba');ao(g,21,53,36,12,'t',.55,'#2a2440');ao(g,21,53,5,51,'l',.5,'#2a2440');g.restore();
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,39+Math.cos(a)*21-.3,71+Math.sin(a)*21-1,.6,2.6,'#a09070')}poly(g,[78,21.6,83,25,83,104,78,104],'#a39cae');
  /* the fields: stubble as far as the hills, and one field already under the plow */
  g.fillStyle=lg(g,0,76,0,106,['#d0c084','#d6c074','#ccb468']);g.fillRect(83,76,237,30);tex(g,'mott',.5,83,76,237,30,'overlay',1);
  poly(g,[196,82,262,80,300,92,214,96],'rgba(120,84,54,.5)');for(let i=0;i<9;i++)stroke(g,[200+i*7,82.6-i*.2,220+i*9,95.6-i*.4],'rgba(70,46,30,.35)',.5);
  for(let i=0;i<120;i++){const sx=84+r()*236,sy=78+r()*27;R(g,sx,sy,.5,1+r()*1.4,r()<.5?'#e8d898':'#a89858')}
  /* the threshing floor: a ring of flat stones, a heap of grain and a heap of chaff */
  oval(g,152,97,40,6.4,'#b8ac90');oval(g,152,96.6,38,5.6,'#d8ccae');for(let i=0;i<18;i++){const a=i/18*6.2832;oval(g,152+Math.cos(a)*34,96.6+Math.sin(a)*4.8,3.4,1,i%2?'#c4b898':'#e6dcc0')}
  g.fillStyle=lg(g,128,0,152,0,['#f0d480','#d8b458','#a8843c']);poly(g,[126,96,139,84,152,96]);g.fill();g.fillStyle=lg(g,160,0,186,0,['#f4ecc8','#e2d6a8','#b8aa7c']);poly(g,[158,97,173,88,188,97]);g.fill();
  stroke(g,[190,97,198,80],'#6a4e2c',1);stroke(g,[196.4,80.6,199.6,80,201,84],'#8a6a40',.8);
  /* a milestone on the road east */
  oval(g,304,108.6,6,1.2,'rgba(50,40,90,.35)');g.fillStyle=lg(g,299,0,306,0,['#b8b0a0','#f0eade','#a8a094']);g.fillRect(299,94,7,14);oval(g,302.5,94.2,3.5,1.6,'#f0eade');for(const y of[98,100.4,102.8])R(g,300.6,y,3.8,.6,'#8a8474');
  /* the road */
  g.fillStyle=lg(g,0,104,0,128,['#d2c298','#e6d8b0','#d8c8a0']);g.fillRect(0,104,320,24);tex(g,'mott',.45,0,104,320,24,'overlay',1);R(g,83,104,237,.8,'#a89a74');
  for(let i=0;i<60;i++){const sx=r()*320,sy=106+r()*20;oval(g,sx,sy,1+r()*1.6,.5+r()*.4,r()<.5?'#bcae86':'#f0e4c0')}
  for(let i=0;i<2;i++)stroke(g,[0,113+i*8,100,112.6+i*8,220,113.6+i*8,320,113+i*8],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,127,0,144,['#b8a868','#a09858','#8a8848']);g.fillRect(0,127,320,17);tex(g,'mott',.5,0,127,320,17,'overlay',1);
  for(let i=0;i<180;i++){const sx=r()*320,sy=128+r()*16;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#d8c880':'#7a7a44',.5)}
  shade(g,[0,104,83,104,98,112,0,114],SH,.55);pool(g,210,0,240,150,'#fff0c8',.16,'screen');ao(g,0,0,70,144,'l',.1,'#2a2050')},
 fore(g){const r=rng(468);rock(g,22,150,30,14,'#8a8478');for(let i=0;i<40;i++){const sx=r()*320;stroke(g,[sx,150,sx+(r()-.5)*5,137-r()*7],r()<.5?'#a89850':'#c8b868',.8)}
  comp(g,'source-atop',.36,()=>R(g,0,0,320,150,'#34305a'))},
 draw(g,t){/* chaff on the wind; Zenon's wagon, loaded for the road east */
  for(let i=0;i<9;i++){const k=((t/2600+i*.111)%1);R(g,176+k*60+Math.sin(i*2.1)*6,90-k*14-Math.sin(k*9+i)*3,1,.6,`rgba(244,236,200,${.8*(1-k)})`)}
  /* the far ox, the wagon and its pole, the near ox, and the yoke that lies across both their necks */
  cattle(g,266,108.6,1,0,'#6f4630',0);wagon(g,174,110,-1,1);cattle(g,262,111,1,0,'#8a5a3a',0);
  R(g,275,79,5,2.5,'#5a3e22');R(g,275,79,5,.5,'#a8845a');R(g,279.5,77.5,1.5,1.5,'#5a3e22');bundles(g,60,112)},
 front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
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
  TI=actor('timothy','Timothy','#b8e0b0',186),EN=actor('eunice','Eunice','#a8d0f0',204),LO=actor('lois','Lois','#e8d0d8',170),LM=actor('lame','man from the well','#f0d0a0',124),
  PR=actor('priest','priest of Zeus','#e8e0f0',96),ZE=actor('zenon','Zenon','#f0b088',110);
Object.assign(ICON,{
  /* four corners of leather, lying one over another like dealt cards (never two by two: the gaps between them would make a plus sign) */
  corners(g){for(const[x,y]of[[2.6,11.6],[6.6,5.6],[10.4,12.4],[14,4]]){oval(g,x+4.2,y+7.4,4.4,1,'rgba(0,0,0,.35)');g.fillStyle=lg(g,x,y,x+7.4,y+7,['#c8905a','#a06a3a','#6a4222']);g.fillRect(x,y,7.4,7);R(g,x,y,7.4,.7,'#e0aa70');R(g,x,y+6.3,7.4,.7,'#4a2c14');
      oval(g,x+3.7,y+3.5,1.7,1.7,'#2a1a10');for(let i=1;i<7;i+=1.8){R(g,x+i,y+.9,.7,.5,'#e8dcc0');R(g,x+i,y+5.7,.7,.5,'#e8dcc0')}}},
  wcover(g){IH.roll(g,'#2a211c',7,10);for(const x of[4.4,16.6]){R(g,x,13.4,3.2,3,'#a8703c');R(g,x,13.4,3.2,.6,'#d09a5e');R(g,x+1.1,14.5,1,1,'#1a1008')}},
  silver(g){for(const[x,y]of[[8,15],[14.6,13.4],[11,9.6],[16.6,17.6]]){oval(g,x+.5,y+.9,3.5,2.7,'#5a5a66');g.fillStyle=lg(g,x-3,y-2,x+3,y+2,['#f4f4fa','#c4c4d0','#8a8a98']);g.beginPath();g.ellipse(x,y,3.4,2.6,0,0,6.2832);g.fill();
      g.strokeStyle='#9a9aa8';g.lineWidth=.5;g.beginPath();g.ellipse(x,y,2,1.4,0,0,6.2832);g.stroke()}}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#3e2a16',2.6);stroke(g,[4.2,20.2,18.6,3.2],'#a8804e',1);stroke(g,[5.4,20.8,19.6,4],'#5a3c20',.6);
  R(g,17.4,3,2.6,2.6,'#6a4a2a');R(g,3.4,19.8,2.2,2.2,'#2a1c10')};
Object.assign(ITEMS,{
  staff6:{name:"Barnabas's staff",icon:'staff',look:"Barnabas's walking staff, stout olive wood. It has forded a river, and it has more road in front of it than behind.",
    by:{barnabas:'My walking staff. It knows the way to more cities than I do.'}},
  corners:{name:'leather corners',look:'Four corners of girth leather, an eyelet punched in each. Nathan would take nothing for them.',
    by:{barnabas:'Four scraps of leather with a hole in each. Paul looks at them and sees a wagon cover.'}},
  cover:{name:'wagon cover',icon:'wcover',look:"The cover for Xanthos's wagon, finished: goat-hair cloth, with a leather eyelet at each corner. It was promised to him, and it is his.",
    by:{barnabas:"The carrier's wagon cover, rolled and tied. Paul sat up half the nights of a month over it."}},
  silver:{name:'silver coins',look:'The balance for the wagon cover, in silver. Xanthos counted it out to the last coin.',
    by:{barnabas:'The price of a wagon cover. Paul earned every coin of it.'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup6) */
const BY6={awl:"The tentmaker's awl. It has opened a seam, a sandal and a rope, and now it is at leather.",thread:'Waxed linen thread, and strong.',
  knife:'A knife for cloth and leather. I would only spoil good cloth with it.',tablets:'His wax tablets: people, work and Scripture, in a small hand.'};
const inIco=()=>G.room==='iconium',inLys=()=>G.room==='lystra',inOut=()=>G.room==='outside',inHouse=()=>G.room==='house',inDer=()=>G.room==='derbe',
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
  prov22:{ref:'Proverbs 22:3',text:'The shrewd one sees the danger and conceals himself, But the inexperienced keep right on going and suffer the consequences.'},
  isa42:{ref:'Isaiah 42:8',text:'I am Jehovah. That is my name; I give my glory to no one else, Nor my praise to graven images.'},
  ps146:{ref:'Psalm 146:5, 6',text:'Happy is the one who has the God of Jacob as his helper, Whose hope is in Jehovah his God, The Maker of heaven and earth, Of the sea, and of all that is in them.'},
  jer10:{ref:'Jeremiah 10:10',text:'But Jehovah is truly God. He is the living God and the eternal King.'},
  ps65:{ref:'Psalm 65:9',text:'You care for the earth, Making it abundantly fruitful and very rich. The stream from God is full of water; You provide grain for them, For that is how you prepared the earth.'},
  ps34:{ref:'Psalm 34:19',text:'Many are the hardships of the righteous one, But Jehovah rescues him from them all.'},
  ecc12:{ref:'Ecclesiastes 12:1',text:'Remember, then, your Grand Creator in the days of your youth, before the days of distress come.'}},
  ORDER=['prov22','isa42','ps146','jer10','ps65','ps34','ecc12'];
const quote=k=>T('"{text}" ({ref})',{text:T(PASS[k].text),ref:T(PASS[k].ref)});
/* ============ ICONIUM: a promise kept before the road is taken ============ */
/* The cover Paul promised a carrier is finished with four corners of leather, the saddler's gift. */
async function sew6(){
  const his=invOf(BN),i=his.indexOf('corners');if(i>=0){his.splice(i,1);toPaul('corners',1);await say(BN,'You will want these back, Paul. In my hands they are four scraps of leather.')}
  if(!has('corners'))return say(P,'I can stitch until dark, and the corners will still be cloth. They want leather: and I work in a saddler\'s shop.');
  await walk(P,128,113);P.dir=1;SFX.sew();
  await say(P,'A leather corner laid on each, stitched round twice with waxed thread, and the eyelet left open for the lashing...');SFX.sew();await wait(700);
  delItem('corners');F.sewn=1;addItem('cover',1);SFX.good();
  await say(P,'Done. Rolled, tied, and ready for his wagon.');
  await say(P,'Whatever Xanthos says of me tomorrow, he will not be able to say that I cheated him.',TH)}
async function leather(){if(F.leather)return say(NA,F.sewn?'You have had them, and used them well.':'You have them in your hand, brother. Four corners, and an eyelet in each.');
  await say(NA,'For the carrier\'s cover? Offcuts of girth leather, as thick as my finger. Wait: I will punch the eyelets myself.');
  F.leather=1;toPaul('corners');
  await say(NA,'Take them. I do not sell scraps to the man who brought me the good news.');
  await say(P,'Then I take them as from a brother, Nathan. Thank you.')}
/* The balance of the price goes to the brothers of a divided city: an optional kindness. */
async function alms(it){if(it!=='silver')return false;const me=PC();
  await say(me,me===P?'The balance for the cover, Nathan. Keep it for the brothers. When a city takes sides, some of them will lose their work for it.'
    :'Paul\'s silver, Nathan, and he wants it left here. When a city takes sides, some of the brothers will lose their work for it.');
  dropAll('silver');F.debt=1;SFX.good();
  await say(NA,'A month of his nights went into this silver.');
  await say(NA,'It will go where it is needed. I will see to that myself.')}
async function deliver(it){if(it!=='cover')return false;F.metXan=1;
  await say(P,'Your cover, Xanthos. Goat-hair cloth, double seams, and a leather eyelet at each corner. I said you would have it.');
  await say(XA,'...Today. You bring it today, and finished.');
  await say(XA,'They told me you were a swindler. A swindler would be on the south road by now, with my silver in his belt.');
  await say(P,'I am taking the south road, and soon. That is why you have your cover today.');
  delItem('cover');F.paid=1;addItem('silver');
  await say(XA,'Here is the balance. Counted. I will not have it said that Xanthos was in debt to you.');
  await say(XA,'I am still for the rulers. But I shall remember who kept his word in this street, and who only talked.');
  await say(P,'He has not changed sides. He has seen one thing that the talk did not prepare him for. It is a beginning.',TH)}
/* Tatia's household is divided, like her city. It is Barnabas she asks. */
async function comfort6(){
  await say(TA,'Barnabas. They say you are leaving today, before the stones come.');
  await say(TA,'My husband is for the rulers. He has forbidden the name of Jesus in his house. And now the two men who taught me that name are going away.');
  await ask(BN,TA,'You stood against their talk for weeks. Why do you go now? And what do I do when you are gone?',[
    {q:'It is no rumor. Nathan had it from a man who was there.',r:['I do not doubt the stones, Barnabas. I am asking about tomorrow, and the day after.']},
    {q:'There are cities in Lycaonia that have never heard.',r:['And this one has heard, so it can be left? That is cold comfort for those of us who listened.']},
    {q:'Words we answered. From stones, our Lord said: flee.',ok:1,
      p:['While it was words, Tatia, we stayed and answered them. But our Lord told those he sent out: "When they persecute you in one city, flee to another." (Matthew 10:23)',
        'We take ourselves away, not the word. That stays here with you, and with a great multitude besides.',
        'As for your husband: do not answer his talk with more talk. Let him see what the good news has made of his wife. Slander does not last long beside that.'],
      r:['Not talk. What he sees. ...He ordered a cover from your friend, did you know? He says he will never see it.',
        'Perhaps today he will see something he did not expect. Go in peace, Barnabas. I will be here when you come back.']}]);
  F.tatia=1;SFX.good()}
async function leave6(){const me=PC();
  if(!F.paid)return say(me,me===P?(F.sewn?'With a finished cover under my arm, and its owner twenty paces away? First it goes to Xanthos.':'Not while a man in this street has paid me for a cover he does not have. I finish it first.')
    :'Paul has a debt of work in this street. He will not go before it is paid, and I would not ask him to.');
  if(!F.tatia)return say(me,me===P?'Tatia is still at the fountain, with a question in her face. It is Barnabas she wants to ask.':'Tatia is waiting at the fountain. I will not leave before I have heard her.');
  await say(me,me===P?'Nothing is owed here now, and nothing is left unsaid. South, Barnabas: to the cities of Lycaonia.':'The shrewd one sees the danger, Paul. South, then: to the cities of Lycaonia.');return travel()}
NA.hs={name:'Nathan',actor:NA,
  look:'Nathan, a saddler of Iconium and a son of Israel. He gave me a corner of his bench the week we came, and he has been a brother ever since.',
  give:alms,
  show:{corners:'Girth leather. It will outlast the cloth it is sewn to.',cover:()=>say(NA,'A cover a man could cross the plateau under. Xanthos speaks against you in every street. Give it to him all the same.'),
    tablets:'You read to me from those the first Sabbath. I have not been the same man since.',awl:'I own a dozen awls, and none that has traveled as far as that one.',
    knife:'A half-moon knife. We are nearly of one trade, you and I.',thread:'Good thread. Mine is thicker: I sew for mules.','*':'Keep it by you, brother. You will be on the road by evening.'},
  ask:{plot:['Tomorrow, when the market fills. The rulers of the synagogue, and men of the nations with them.','They agree on nothing else in this city, Paul. They agree on you.'],cover:leather},
  talk:()=>talkTree([
    {q:'Who told you of it?',a:()=>say(NA,'A man who is for the rulers, and who still could not stomach stones. He would not give me his name to give to you.')},
    {q:'Have you leather to spare for four corners?',if:()=>!F.leather,a:leather},
    {q:'What becomes of you when we are gone?',once:1,a:async()=>{await say(NA,'I shall mend harness, meet with the brothers, and be looked at sideways in the synagogue.');await say(NA,'A great multitude believed here, Paul. Jews and Greeks. You do not leave an empty house behind you.')}},
    {q:'Peace to you, Nathan.',bye:1}]),
  as:{barnabas:{look:'Nathan the saddler. He risked his own skin to bring us that warning.',give:alms,
    talk:()=>say(NA,F.paid?'Go quickly, Barnabas, and go by the south gate. Nobody is watching it yet.':'Paul will not go until that cover is in the carrier\'s hands. You know him better than I do. Help him to be quick.'),
    show:{staff6:'Olive wood. If you ever want a strap on it, come to me.','*':'Keep it by you, Barnabas.'}}}};
XA.hs={name:'Xanthos',actor:XA,
  look:()=>say(P,F.paid?'Xanthos. He looks from his wagon to me, and back, as if one of us must be a mistake.':'Xanthos the carrier: wagons to the coast and back. He ordered a cover from me a month ago. Since then he has taken the side of the rulers.'),
  give:deliver,
  show:{corners:'Scraps of leather. Is that what my silver has bought?',silver:'It is yours. You earned it. Do not hold it up to me.',tablets:'Jewish writing. Keep it away from my wife.',
    awl:'A tool. I have seen a tool before. I have not yet seen my cover.',knife:'Put that away in my yard.','*':'I ordered a wagon cover, tentmaker. Nothing else.'},
  ask:{plot:()=>say(XA,'I know nothing of any stones. ...Be gone from this city by morning, tentmaker. That is all I will say, and more than I should.'),
    cover:()=>say(XA,'Four corners short? So it is not finished. I thought as much.')},
  talk:async()=>{if(F.paid)return say(XA,'I have my cover, and I have nothing to say against your work. Leave it at that.');
    if(!F.metXan){F.metXan=1;await say(XA,'You. I wonder that you show your face in this street, tentmaker.');
      await say(XA,'I hear what is said of you two. That you set sons against fathers, and wives against husbands. My own wife has not been the same since she heard you.');
      await say(P,'I owe you a wagon cover, Xanthos. You paid me half its price. You shall have the whole of the cover.');
      await say(XA,'Shall I? The talk is that you will be gone by morning, and my silver with you.')}
    return talkTree([
      {q:'When did you want the cover?',a:()=>say(XA,'Before my wagons leave for the coast. Three days. I do not expect to see it.')},
      {q:'What do they say of us?',a:async()=>{await say(XA,'That you are swindlers who live off simple people. The rulers of the synagogue say so, and they are respectable men.');await say(P,'I cannot stop a mouth. But I can finish a cover.',TH)}},
      {q:'You will have it.',bye:1}])},
  as:{barnabas:{look:'The carrier. He believes every word that is said against us, and he has never once heard us himself.',
    give:async it=>{if(it!=='cover')return false;await say(XA,'From his hand, not yours. He took my silver. Let him bring me my goods.')},
    talk:()=>say(XA,F.paid?'Your friend kept his word. I did not expect it. Now take him out of my street.':'It is your friend who owes me a cover, not you. Though by all I hear, you are no better.'),
    show:{staff6:'A walking staff. You will need it sooner than you think.','*':'I have no business with you.'}}}};
TA.hs={name:'Tatia',actor:TA,
  look:()=>say(P,F.tatia?'Tatia. She has stopped looking over her shoulder at the yard.':'Tatia, the wife of Xanthos. She was among the first of the Greeks here to believe, and she has come to this fountain every day since to hear more.'),
  show:{cover:()=>say(TA,'My husband\'s wagon cover! He told me this morning that he had been robbed of the price of it.'),silver:'So he paid you. Then he has seen it. ...I should like to have seen his face.',
    tablets:'I cannot read your letters, Paul. But I remember every word you read out to us.',corners:'Leather? I know wool. Leather I leave to my husband\'s men.','*':'Put it away, Paul. People are watching the two of us today.'},
  ask:{plot:'The whole fountain knows it. Some of the women would not stand beside me this morning.',cover:'For my husband\'s wagon? He says he will never see it.'},
  talk:async()=>{if(F.tatia)return say(TA,'Go safely, both of you. I know what to do now.');
    await say(TA,'Paul. Is it true? They say at the fountain that you are leaving us.');await say(P,'It is true, Tatia. Today.');
    await say(TA,'Then I must ask something, and I would rather ask your friend. They call him the Son of Comfort, and I have need of some.')},
  as:{barnabas:{look:()=>say(BN,F.tatia?'Tatia. She will do well. Better than her husband deserves.':'Tatia, with her jar still empty. She did not come to the fountain for water.'),
    talk:()=>F.tatia?say(TA,'What he sees, not what I say. I have it by heart, Barnabas.'):comfort6(),
    show:{staff6:'You are packed for the road already.','*':'Keep it, Barnabas. You will need all you have.'}}}};
ROOMS.iconium={walk:[16,464,110,138],mood:'tense',amb:{crowd:.4,fountain:.7,birds:.3,hammer:.3,leaves:.3},hs:[
  {name:'mountains',x:188,y:26,w:110,h:24,wx:244,look:'Mountains on every side of this plain, and snow on them. Iconium sits in the middle like a well-watered garden.'},
  {name:'street to the synagogue',x:0,y:36,w:60,h:68,wx:42,wy:113,dir:-1,look:['The street to the synagogue of the Jews. We spoke there for weeks, and a great multitude believed.','By tomorrow that street will be full of men with stones in their hands.'],
    use:'Back to the synagogue, today? No. Everything we had to say there has been said.',open:'Back to the synagogue, today? No. Everything we had to say there has been said.'},
  {name:'saddlery',x:84,y:56,w:84,h:30,wx:126,wy:113,look:'Nathan\'s shop: pack saddles, collars, girths and bridles. Every caravan that crosses the plateau buys something here.',pickup:'They are Nathan\'s living.'},
  {name:"saddler's bench",x:102,y:86,w:52,h:19,wx:128,wy:113,vis:()=>!!F.sewn,look:'Nathan\'s bench, and for a month my corner of it. It is clear now.',use:'My work at this bench is done.'},
  {name:'unfinished cover',x:102,y:80,w:52,h:25,wx:128,wy:113,vis:()=>!F.sewn,
    look:['The cover for Xanthos\'s wagon: goat-hair cloth, cut to measure, and every seam closed.','Only the corners are wanting. That is where the lashings pull, and cloth alone would tear out in the first wind off the plateau. Each corner wants an eyelet of leather.'],
    pickup:'Not before it is finished. I will not hand a man nine tenths of what I promised him.',
    use:()=>F.leather?sew6():say(P,'The corners want leather, and I have none. But this is a saddler\'s shop.'),
    useWith:async it=>{if(it==='corners'||it==='awl'||it==='thread')return sew6();if(it==='knife')return say(P,'It is cut to the measure of his wagon. I will not take a thumb\'s breadth off it.');return false}},
  {name:'fountain',x:220,y:64,w:50,h:44,wx:246,wy:114,look:'The fountain at the crossroads. This plateau is full of water: it comes down from the mountains on every side.',
    use:'I drink. Cold, and sweet. I shall miss this water on the road.',pickup:'A fountain stays where it is.'},
  {name:'poplars',x:190,y:40,w:24,h:50,wx:204,look:'Poplars. Wherever a channel runs on this plain, a line of them stands over it.'},
  {name:'poplars',x:276,y:38,w:22,h:52,wx:286,look:'Poplars. Wherever a channel runs on this plain, a line of them stands over it.'},
  {name:"Xanthos's wagon",x:308,y:72,w:74,h:38,wx:344,wy:114,look:()=>say(P,F.paid?'The cover is on its hoops, and laced down at all four corners. It will keep the rain off his loads for ten years.':'A good wagon, with four bare hoops and no cover. It is waiting for mine.'),
    pickup:'Take a wagon?',useWith:async it=>it==='cover'?say(P,'It is his wagon. The cover goes into his hands, and he may hang it himself.'):false},
  {name:'gateway of the yard',x:375,y:53,w:52,h:51,wx:400,wy:113,look:'The yard of Xanthos the carrier: bales, jars, and wagons for the coast road.',use:'I have no business in his yard. Only with him.',open:'I have no business in his yard. Only with him.'},
  {name:'south gate',x:444,y:54,w:32,h:50,wx:458,wy:113,dir:1,look:async()=>{await say(P,'The south gate. Beyond it the road runs down into Lycaonia: to Lystra, and to Derbe.');await say(P,quote('prov22'))},exit:leave6}]};
/* ============ LYSTRA: a man who had never walked, and a crowd that would make gods of two men ============ */
async function lysIntro(){if(F.healed)return;
  await say(BN,'A small town, Paul, and I see no synagogue. Where do we begin, with no reading to be asked up after?');
  await say(P,'Where the town itself gathers. There is a well.');
  await say(P,'And a man sitting beside it, who has not taken his eyes off us since we came in at the gate.',TH)}
/* Paul speaks at the well (Acts 14:8-10). The healing is told as the account tells it; what follows from it is the trouble of this place. */
async function speak6(){if(F.healed)return say(PC(),'It has been said, and seen. Now they must be made to understand it.');
  if(!F.metTim)return say(PC(),PC()===P?'To whom? I do not yet know who lives in this town, or what they have ever heard. That boy with the jar is listening to our Greek.':'Paul should know first who lives here. That boy with the jar is listening to every word of our Greek.');
  playAs(P);await Promise.all([walk(P,262,118),walk(BN,244,124)]);P.dir=1;BN.dir=1;
  await say(P,'People of Lystra! We are travelers, and we bring good news to this town.');
  await narr('Now in Lystra there was a man sitting down whose feet were crippled. He was lame from birth and had never walked. (Acts 14:8)',{dur:8000});
  await narr('This man was listening to Paul as he was speaking. Paul, looking intently at him and seeing that he had faith to be made well, said with a loud voice: (Acts 14:9, 10)',{dur:9500});
  await say(P,'"Stand up on your feet." (Acts 14:10)');
  F.healed=1;place(LM,'lystra',322,112,-1);SFX.good();
  await narr('So the man leaped up and began walking. (Acts 14:10)',{dur:4500});
  await walk(LM,300,122);await walk(LM,344,118);LM.dir=-1;
  G.crowd=1;AU.mood='tense';SFX.alert();
  await narr('When the crowds saw what Paul had done, they cried out in the Lycaonian language. (Acts 14:11)',{dur:6500});
  await say(P,'What are they shouting, Barnabas? That is not Greek.');
  await say(BN,'Not one word of it. But look at their faces, Paul. That is not how men look at two travelers.');
  await say(P,'I cannot answer what I do not understand. Someone in this town must have both tongues.',TH)}
/* hear: one of the household of Lois, who speak Greek and Lycaonian, tells them what the crowd is saying, and what is coming to the gate. */
async function hear(A){if(F.heard)return say(A,'They are at the gate with the bulls! You must stop them!');
  await say(A,A===TI?'They are shouting in Lycaonian, sir. They are saying...':'They are shouting in their own tongue. They are saying...');
  await narr('"The gods have become like humans and have come down to us!" (Acts 14:11)',{dur:6000});
  await say(A,'There is an old story in these hills: that Zeus and Hermes came here once in the likeness of men, and that only two old people took them in.');
  await say(A,'They think it has happened again.');
  await narr('And they started calling Barnabas Zeus, but Paul Hermes, since he was taking the lead in speaking. (Acts 14:12)',{dur:7500});
  await say(BN,'Zeus? They cannot mean it, Paul.');
  G.bulls=1;G.crowd=2;AU.mood='feast';place(PR,'lystra',94,117,1);
  await narr('And the priest of Zeus, whose temple was at the entrance of the city, brought bulls and garlands to the gates and wanted to offer sacrifices with the crowds. (Acts 14:13)',{dur:10000});
  await say(A,A===TI?'Bulls, sir, with garlands on them. They mean to sacrifice. To you.':'Bulls, with garlands on them. They mean to sacrifice. To the two of you.');
  F.heard=1;
  await say(P,quote('isa42'),TH);
  await say(P,'His glory, handed to a tentmaker and a Levite at a town gate. Not while I have breath to stop it.',TH)}
/* stop6: at the gate (Acts 14:14-18). The player chooses how Paul begins, to whom he turns them, and what witness he names. */
async function stop6(){playAs(P);
  await narr('However, when the apostles Barnabas and Paul heard of it, they ripped their garments and leaped out into the crowd and cried out: (Acts 14:14)',{dur:9000});
  SFX.cut();await Promise.all([walk(P,116,118),walk(BN,138,123)]);P.dir=1;BN.dir=1;SFX.cut();
  await think('They take us for gods. How do I begin?',[
    {q:'We are Jews, and our Law forbids this.',no:'True. And the Law of Moses is nothing to them: they have never heard it read.'},
    {q:'Stop! This is an offense against God.',no:'True again. But to them a god offended is a god who wants a bigger sacrifice.'},
    {q:'We too are humans, with the same infirmities as you.',ok:1}]);
  await say(P,'"Men, why are you doing these things? We too are humans having the same infirmities as you have." (Acts 14:15)');
  await say(BN,'Look at us! We tire, we hunger, we fall ill, the same as you!');
  await think('Now: to whom do I turn them? They know nothing of Abraham, and nothing of Moses.',[
    {q:'As it is written in the Psalms...',no:'Written where? No psalm was ever read aloud in this town. I must say what the psalm says, and leave out its name.'},
    {q:'To the God of Abraham, Isaac and Jacob.',no:'Three names they have never heard. I must begin further back than Abraham.'},
    {q:'To the living God, who made heaven, earth and sea.',ok:1}]);
  await say(P,'"And we are declaring the good news to you, for you to turn from these vain things to the living God, who made the heaven and the earth and the sea and all the things in them." (Acts 14:15)');
  await say(BN,'"In past generations he permitted all the nations to go on in their ways," (Acts 14:16)');
  await think('They will ask how they were to know him. What witness has he given to farmers in a valley?',[
    {q:'The Law and the Prophets.',no:'His witness to Israel. It was never read in this valley.'},
    {q:'The man from the well, on his feet.',no:'They have seen it. It is what set them shouting for Zeus. A sign needs someone to say whose it is.'},
    {q:'Rain from heaven, and fruitful seasons.',ok:1}]);
  await say(P,'"although he did not leave himself without witness in that he did good, giving you rains from heaven and fruitful seasons, satisfying you with food and filling your hearts with gladness." (Acts 14:17)');
  PR.dir=-1;await say(PR,'You will not have the bulls? ...Then I do not know what you are.');
  walk(PR,20,118);await wait(900);G.bulls=0;G.crowd=1;AU.mood='tense';PR.room=null;
  await narr('And yet despite saying these things, they barely restrained the crowds from sacrificing to them. (Acts 14:18)',{dur:7500});
  F.stopped=1;SFX.good();
  await say(TI,'They are going home, sir. Some of them are angry. And some of them are asking who the living God is.');
  await say(P,'Then tomorrow we shall be at the well, to tell them.');
  return stoned()}
/* What followed is told as Acts tells it (14:19, 20). Nothing of it is shown, and nothing the player does prevents it. */
async function stoned(){await fade(1,700);G.crowd=0;G.bulls=0;AU.mood='tense';
  await narr('How long they went on declaring the good news in Lystra, the account does not say. But there were disciples in that town when they left it.',{dur:8500});
  await narr('But Jews arrived from Antioch and Iconium and persuaded the crowds, and they stoned Paul and dragged him outside the city, imagining that he was dead. (Acts 14:19)',{dur:11000});
  for(const a of[NA,XA,TA,PR,ZE])a.room=null;G.down=1;enterRoom('outside',-80,127,1);
  for(const[a,x,y]of[[BN,262,112],[TI,268,114],[EN,258,116],[LO,266,118],[LM,272,113]])place(a,'outside',x,y,-1);G.cam=0;await fade(0,900);
  await Promise.all([walk(BN,120,125),walk(TI,194,123),walk(EN,210,130),walk(LO,104,131),walk(LM,226,124)]);BN.dir=1;LO.dir=1;TI.dir=EN.dir=LM.dir=-1;
  await narr('However, when the disciples surrounded him, he got up... (Acts 14:20)',{dur:6000});
  G.down=0;place(P,'outside',156,127,1);P.bow=true;await wait(1100);P.bow=false;SFX.good();
  await say(BN,'Paul! ...He is breathing. He is getting up!');
  await say(TI,'They said you were dead, sir. They were so sure of it that they went home.');
  await say(P,'Not dead. Stoned, and sore from head to foot, and on my feet.');
  await say(P,quote('ps34'));
  await say(EN,'The road to Derbe is behind you, Paul. Nobody would blame you for taking it tonight.');
  await say(P,'Tonight, in the dark, like a man with something to hide? The disciples live inside that gate. So does everyone who threw a stone.',TH);
  place6('outside');codeBtn()}
async function gate6(){const me=PC();
  if(!F.healed)return say(me,me===P?'We have only just come in by it. Nothing has been said in Lystra yet.':'We have only just come in. Paul has not opened his mouth here yet.');
  if(!F.heard)return say(me,me===P?'Something is making ready out there, and I do not know what. First I must learn what these people are shouting.':'Whatever is coming to that gate, we should know its name before we walk into it. Someone here must speak both tongues.');
  return stop6()}
TI.hs={name:'Timothy',actor:TI,
  look:()=>say(P,inOut()?'Timothy. He has not moved from my side since I stood up.':night()?'Timothy. He ought to be asleep, and he is watching every stitch.':F.back?'Timothy. A few months older, and a good deal steadier.'
    :F.metTim?'Timothy, the son of Eunice. He was taught the holy writings from infancy, and it shows in how he listens.':'A boy with a water jar, some years short of a man. He is listening to our Greek as if he had been waiting for it.'),
  give:async it=>{if(it!=='tablets'||!night())return false;if(F.copy)return say(TI,'I have it by heart now, sir. I said it over until the lamp burned low.');
    await say(TI,'May I read them, sir? ...This one I know. My grandmother taught it to me before I could reach the well rope.');
    await say(TI,quote('ecc12'));F.copy=1;SFX.good();
    await say(P,'Keep hold of it, Timothy. You are young, and today you saw what the days of distress can look like. Remember him now.')},
  show:{tablets:()=>say(TI,F.back?'I can say every passage on them now, sir. Ask me one.':'The holy writings, sir? In wax? My mother has only what she carries in her head.'),
    awl:'Is that what you sew tents with, sir? May I hold it?',thread:'My grandmother spins. Not as fine as that.',knife:'It is shaped like the new moon.','*':'Is it from Tarsus, sir? I have never been further than Iconium.'},
  ask:{tongue:()=>hear(TI),east:'Tarsus is your home, sir, is it not? ...I should not ask you to stay. But I am glad you did.'},
  talk:async()=>{
    if(inOut())return say(TI,'Lean on me, sir. I am stronger than I look.');
    if(night())return talkTree([
      {q:'You saw all of it today, Timothy.',a:async()=>{await say(TI,'I saw them bring garlands for you, sir. And I saw the same hands pick up stones. How can they be the same people?');
        await say(P,'They are the same people. That is why we would not have their garlands. What a crowd gives in an hour, it takes back in an hour.')}},
      {q:'Are you afraid?',once:1,a:async()=>{await say(TI,'Yes, sir. ...But you went back in through the gate.');await say(P,'I am often afraid, Timothy. The question is not whether we are afraid. It is whom we trust.')}},
      {q:'Sleep now, Timothy.',bye:1}]);
    if(F.back)return say(TI,F.strong?'Through many tribulations. I will remember who said it, sir, and where he had been.':'They throw clods at me on the way to the well, sir. I go to the well all the same.');
    if(!F.metTim){F.metTim=1;await say(TI,'Peace to you, sirs. You are Jews? My mother is a Jewess. My name is Timothy.');
      await say(P,'Peace, Timothy. Paul, of Tarsus, and Barnabas, of Cyprus. Is there a synagogue in Lystra?');
      await say(TI,'No, sir. There are too few of us. My mother and my grandmother taught me the holy writings at home, from the time I could listen.');
      await say(TI,'My father is a Greek. And most people here are Lycaonians: they speak Greek to the soldiers, and their own tongue to each other.')}
    if(F.healed)return hear(TI);
    return talkTree([
      {q:'Where do the people of Lystra gather?',a:()=>say(TI,'At the well, sir. Everybody comes to the well, and nobody is in a hurry there.')},
      {q:'Who is the man sitting by the well?',a:()=>say(TI,'He has sat there every day of my life, sir. His feet were crippled when he was born. He has never taken a step.')},
      {q:'What did your mother teach you?',once:1,a:async()=>{await say(TI,'The Law, sir, and the Psalms, and the Prophets. She says that a boy who knows them will know the Messiah when he comes.');await say(P,'She is right. And I have news of him, Timothy.')}},
      {q:'Stay near us, Timothy.',bye:1}])},
  as:{barnabas:{look:()=>say(BN,F.back?'Timothy. Paul looks at that boy the way a craftsman looks at good cloth.':'A boy who listens with his whole face. Somebody has taught him well.'),
    talk:async()=>{if(inLys()&&!F.metTim){F.metTim=1;await say(TI,'Peace to you, sir. You are Jews? My mother is a Jewess. My name is Timothy.');
        await say(BN,'Peace, Timothy. Barnabas, of Cyprus, and my friend is Paul, of Tarsus. Have you a synagogue here?');
        return say(TI,'No, sir. There are too few of us. My mother and my grandmother taught me the holy writings at home. Most people here speak Lycaonian, and Greek only to strangers.')}
      if(inLys()&&F.healed)return hear(TI);
      return say(TI,inOut()?'He stood up, sir. I saw him stand up.':night()?'Is it true that you sold a piece of land, sir, and gave away all of the price?':F.back?'You came back, sir. Both of you.':'Everybody comes to the well, sir. If you have something to say to Lystra, say it there.')},
    show:{staff6:'Did you really carry a rope across a river on that, sir?','*':'Is it from Cyprus, sir?'}}}};
EN.hs={name:'Eunice',actor:EN,
  look:()=>say(P,inOut()?'Eunice. She came out past the gate of her own town to stand over a stranger\'s body.':night()?'Eunice. She has given us her own supper, and she will not hear of thanks.':F.back?(F.strong?'Eunice. Her faith is without hypocrisy: what she is by lamplight, she is in the street.':'Eunice. These months have cost her something, and she is still here.')
    :'A woman of Israel, by her dress, at the door of a house in a Lycaonian town.'),
  show:{tablets:'Written out! I have carried those words in my head for thirty years, and taught them to my son from it.',awl:'A craftsman\'s tool. My husband would understand you better than he understands me.',
    thread:()=>say(EN,night()?'Let me mend them, Paul. You can hardly lift your arm. ...No. I see that you will not.':'Good thread. You could hang a door on it.'),'*':'Put it by, Paul. You are a guest here.'},
  ask:{tongue:()=>hear(EN),east:'The short road home. And you are here instead.'},
  talk:async()=>{
    if(inOut())return say(EN,'Come into the city, or go on to Derbe: I will not tell you which. But you will not lie in a field tonight, either way.');
    if(night())return talkTree([
      {q:'Where is your husband?',a:async()=>{await say(EN,'With the flocks, until the new moon. He is a Greek, Paul, and he does not believe. He lets me keep the Sabbath, and he shakes his head.');await say(EN,'What he will say when he hears who slept under his roof, I do not know.')}},
      {q:'You have taught your son well.',once:1,a:()=>say(EN,'My mother taught me, and I taught him. We had no synagogue and no scroll: only what we remembered. It seems that it was enough to know the truth when it came.')},
      {q:'Thank you for this roof, Eunice.',bye:1}]);
    if(F.back)return F.strong?say(EN,'Through them, not round them. We will remain, Paul.'):strengthen();
    if(F.healed)return hear(EN);
    await say(EN,'Strangers, and Jews! Peace to you. I am Eunice, and that is my mother, Lois. You have met my son already, I think: he meets everybody.');
    return say(EN,'There is no house of prayer in Lystra. If you have something to say here, the well is the place for it.')},
  as:{barnabas:{look:'Eunice. A believing woman in an unbelieving house. I have known a few, and they are made of oak.',
    talk:()=>inLys()&&F.healed?hear(EN):F.back&&!F.strong?say(EN,'It is Paul I must ask, Barnabas. It was Paul they stoned, and Paul who came back.')
      :say(EN,inOut()?'Take his other arm, Barnabas.':night()?'Eat, Barnabas. You have not sat down since the gate.':F.back?'You are both thinner. Derbe did not feed you.':'Peace to you. If you have something to say to this town, the well is the place.'),
    show:{staff6:'Lean it by the door.','*':'Put it by, Barnabas. You are a guest here.'}}}};
LO.hs={name:'Lois',actor:LO,
  look:()=>say(P,inOut()?'Lois. She has knelt down in the stubble beside me, at her age.':night()?'Lois. She washed my cuts without one question, as if men were carried in from stonings every week.':F.back?'Lois. A grandmother whose faith her grandson can lean his whole weight on.'
    :'An old woman at the door, with eyes that miss nothing. She has the look of one who has waited a long time for something.'),
  show:{tablets:'My eyes are past reading, child. Say it to me, and I will tell you whether you have it right.',thread:'I spun for this household for fifty years. That is good thread.','*':'Keep your things about you. In this town they will be looked at.'},
  ask:{tongue:()=>hear(LO),east:'You came back to us instead. I have lived long enough to know what that is worth.'},
  talk:async()=>{
    if(inOut())return say(LO,'Slowly. On your feet, and slowly. I have water and oil at home, and a lamp.');
    if(night())return say(LO,F.mended?'Now lie down, the two of you. I did not wash those cuts so that you could sit up until dawn.':'Sit still. And when I have done, do something about those garments: you look like two men who have been in a war.');
    if(F.back)return say(LO,F.strong?'I taught my daughter the Scriptures, and she taught her son. Now I see what it was all for.':'We are still here, Paul. Fewer than came to the well, and more than they expected. Speak to my daughter: she carries the most.');
    if(F.healed)return hear(LO);
    return say(LO,'Peace to you, strangers. Lois. I have lived in Lystra longer than you have been alive, and I have never seen it listen to anyone. Try the well.')},
  as:{barnabas:{look:'Lois. I think she has prayed for this town since before I was born.',
    talk:()=>inLys()&&F.healed?hear(LO):say(LO,inOut()?'Help him up, son. Gently.':night()?'Eat. Then sleep. You can thank me in the morning by being rested.':F.back?'You brought him back to us. That was well done.':'Peace to you. If you want this town\'s ear, try the well.'),
    show:{staff6:'A good stick. I shall want one like it before long.','*':'Keep your things about you.'}}}};
LM.hs={name:'man from the well',actor:LM,
  look:()=>say(P,F.back?'The man from the well. He walks to it now, like anyone else, and carries water home for his neighbors.':inOut()?'The man from the well. He walked out here on the feet he was given, to stand by me.':'The man who had never walked. He cannot keep still: he tries his feet on every stone of the place.'),
  show:{'*':'Yours, sir. Good. I walk!'},
  talk:async()=>{if(inLys()&&!F.heard){await say(LM,'They say... you, sir... gods! Zeus! Hermes! I walk!');return say(P,'Gods? I hope that I have misheard him. I need someone who has both tongues.',TH)}
    return say(LM,F.back?'I carry water now, sir. For the old ones. With my own feet.':inOut()?'You said: stand up. I stand, sir. Here.':'I walk, sir! Look! I walk!')},
  as:{barnabas:{look:'The man from the well. I have seen many things on this journey. I had not seen that.',talk:()=>say(LM,F.back?'With my own feet, sir!':'I walk, sir! I walk!'),show:{'*':'Yours, sir. Good.'}}}};
PR.hs={name:'priest of Zeus',actor:PR,look:'The priest of Zeus, all in white, with the bulls behind him. He looks like a man whose great day has come at last.',
  show:{'*':'An offering? It is we who bring the offerings, lord.'},talk:stop6,
  as:{barnabas:{look:'The priest. He keeps bowing in my direction. I could sink into the ground.',talk:stop6,show:{'*':'An offering? It is we who bring the offerings, lord.'}}}};
ROOMS.lystra={walk:[16,464,110,138],get mood(){return G.bulls?'feast':F.healed?'tense':'hope'},amb:()=>G.crowd?{crowd:.9,wind:.3,birds:.2}:{birds:.5,wind:.35,crickets:.3,crowd:.12},enter:lysIntro,hs:[
  {name:'hills',x:238,y:44,w:240,h:24,wx:360,look:'Low hills round a secluded valley, and the Taurus far off to the south. No main road comes through here.'},
  {name:'fields',x:300,y:68,w:92,h:22,wx:350,look:async()=>{await say(P,'Fields, orchards and good pasture. The valley is well watered, and whoever farms it does not go hungry.');await say(P,quote('ps65'))}},
  {name:'city wall',x:0,y:18,w:100,h:28,wx:76,look:'The wall of Lystra. Caesar made a colony of this town, and put soldiers in it against the mountain tribes.'},
  {name:'city gate',x:26,y:48,w:48,h:56,wx:98,wy:116,dir:-1,look:()=>say(P,G.bulls?'Bulls at the gates, garlanded for sacrifice, and half the town behind them.':'The gate of Lystra. The road outside it runs down past a temple of Zeus, at the entrance of the city.'),exit:gate6},
  {name:'bulls',x:24,y:84,w:58,h:34,wx:112,wy:118,dir:-1,vis:()=>!!G.bulls,look:'Two white bulls with garlands round their necks. They are meant for us: for a tentmaker and a Levite.',use:stop6,pickup:'They are not mine, and what they were brought for is not mine either.'},
  {name:'door of a house',x:140,y:68,w:14,h:36,wx:147,wy:112,look:'A house of mud brick, with its door shut.',use:'It is not my house.',open:'It is not my house.'},
  {name:"door of Lois's house",x:190,y:63,w:22,h:41,wx:201,wy:112,look:'The door of a house where the Sabbath is kept. There is no other like it in the street.',use:'I will go in when I am asked in.',open:'I will go in when I am asked in.'},
  {name:'well',x:262,y:70,w:36,h:38,wx:262,wy:118,dir:1,def:'use',look:['The well of Lystra. The whole town comes here, sooner or later, and stays to talk.','With no synagogue, this is where a stranger can be heard.'],use:speak6,pickup:'The bucket belongs to the well.'},
  {name:'man sitting by the well',x:304,y:84,w:36,h:28,wx:290,wy:120,dir:1,vis:()=>!F.healed,look:['A man sitting on the ground with a blanket over his feet. They are crippled: he has been lame from birth.','He is listening. And not as a man listens who is only passing the time.'],
    talk:()=>say(P,F.metTim?'He answers with a few words of Greek, and never takes his eyes from my face. I should say what I came to say, where he can hear it.':'He nods to me, and waits. I do not yet know who lives in this town. That boy with the jar could tell me.'),
    use:'I have no silver for him, and it is not silver that he is waiting for.',pickup:'A man is not picked up like a bundle.'},
  {name:'farm stall',x:426,y:50,w:54,h:56,wx:440,wy:114,look:'Grain, figs, pomegranates and olives: the fruit of one valley in one season. Somebody has been good to Lystra.',pickup:'It is the farmer\'s living.'}]};
/* ---------- Outside the city: he got up ---------- */
async function enterCity(){playAs(P);
  await say(P,'I am going back in. Through the gate, on my own feet, where anyone may see me.');
  await say(BN,'Then I go in beside you.');
  walk(BN,262,114);await walk(P,250,112);await fade(1,600);AU.mood='calm';
  await narr('...and entered the city. (Acts 14:20)',{dur:5000});
  enterRoom('house',...ENT.house);place6('house');codeBtn();await fade(0,700);
  await narr('Lois and Eunice took them in for the night.',{dur:4000});
  await say(LO,'Sit. Not one word until I have washed those cuts.');
  await say(BN,'We ripped our garments at the gate, Paul, and we have gone about ever since like two beggars. And today has not improved yours.');
  await say(P,'Torn from the neck to the belt, both of them. In the morning we leave for Derbe. Not like this.',TH)}
const derbeRoad=()=>say(PC(),PC()===P?'Tonight, in the dark? The disciples are inside that gate. I will not slip away from them like a thief.':'Not without a word to the disciples, and not while he can hardly stand. He will want to go in. I know him.');
ROOMS.outside={walk:[16,304,112,138],mood:'tense',amb:{wind:.6,crickets:.6,owl:.3},hs:[
  {name:'hills',x:0,y:60,w:150,h:22,wx:80,look:'The hills are going dark. Somewhere beyond them is Derbe, and the road to it starts here.'},
  {name:'Lystra',x:196,y:30,w:124,h:22,wx:240,look:['Lystra, on its low hill. At noon they would have sacrificed bulls to me there. Before evening they dragged me out by the heels.','And still there are disciples inside that wall.']},
  {name:'city gate',x:254,y:52,w:24,h:30,wx:250,wy:113,dir:1,look:'The gate. A lamp is burning in it. They did not trouble to shut it behind me.',exit:enterCity},
  {name:'bare tree',x:18,y:52,w:42,h:58,wx:60,wy:116,look:'A wild pear, bare already. Winter is not far off.'},
  {name:'stones',x:112,y:118,w:72,h:18,wx:150,wy:130,look:['Stones. Once I stood by, and guarded the outer garments of the men who stoned Stephen. (Acts 7:58; 22:20)','Today I learned what the other side of that is like. I do not think I am meant to forget it.'],pickup:'No. Let them lie where they fell.'},
  {name:'road to Derbe',x:0,y:104,w:20,h:34,wx:22,wy:124,dir:-1,look:'The road to Derbe.',exit:derbeRoad}]};
/* ---------- The house of Lois: one night, and a visit months later ---------- */
/* mend6: by lamplight, the garments they ripped at the gate are made whole. */
async function mend6(it){if(!night()||!['awl','thread'].includes(it))return false;
  if(F.mended)return say(BN,'It is mended, Paul, and better than new. Lie down.');
  await say(P,'Off with that mantle, Barnabas, and hold the lamp where I can see.');
  await Promise.all([walk(P,176,120),walk(BN,150,118)]);P.dir=-1;BN.dir=1;P.bow=true;
  SFX.sew();await say(P,'A tear along the weave is soon closed: a row of small stitches, drawn tight, and it is stronger there than anywhere else.');SFX.sew();await wait(700);
  await say(P,'And now my own... There. Nobody on the Derbe road will know what these two garments were torn for.');
  P.bow=false;F.mended=1;SFX.good();
  await say(BN,'Stoned by day, and sewing by lamplight the same night. Paul, lie down.');
  await say(EN,'I have never seen a man so set on leaving a place tidy.')}
/* strengthen: on the way back, the disciples are told the truth about the road (Acts 14:22). */
async function strengthen(){
  await say(EN,'Since you left, the stall keepers will not sell to us. The boys throw clods at Timothy on his way to the well. My husband says it is what comes of listening to strangers.');
  await quiz(EN,'We believed, and we were glad. Nobody told us it would be like this. Will it always be so, Paul?',[
    {q:'In Derbe no one lifted a hand against us.',r:['Then Derbe is fortunate. I live in Lystra.']},
    {q:'I was on my feet again the same evening.',r:['You were. I saw it, and I thanked God for it. But I am a woman with a boy and an unbelieving husband, and I am asked to stand up every day.']},
    {q:'I will not tell you that it gets easier.',ok:1,
      p:['I will not tell you that it gets easier, Eunice. It would not be true, and you would find it out.','"We must enter into the Kingdom of God through many tribulations." (Acts 14:22)',
        'Many. But not without end, and not alone. The Lord rescued me that day in the field, and he has not let go of one of you. Remain in the faith.'],
      r:['Through them. Not round them. ...I think I knew it, the night you sat sewing by our lamp with the blood still in your hair.','Then we remain. My mother, and my son, and I.']}]);
  F.strong=1;SFX.good();
  await narr('There they strengthened the disciples, encouraging them to remain in the faith. (Acts 14:22)',{dur:6500});
  await say(BN,'The older men are here, Paul, and the whole congregation with them. It is time.')}
async function houseDoor(){const me=PC();
  if(F.back)return F.strong?finale6():say(me,me===P?'We came all the way back for them. I will not go before they have heard what we came to say.':'Not yet. Eunice has something to ask, and it is Paul she is asking.');
  if(!F.mended)return say(me,me===P?'On the next day, yes. But I will not walk Barnabas to Derbe through this cold in a mantle torn to the belt. I have thread.':'To Derbe, in the morning. Though I would give a good deal for a mantle that closed.');
  await fade(1,500);await narr('On the next day he left with Barnabas for Derbe. (Acts 14:20)',{dur:5500});await fade(0,300);return travel()}
async function backIntro(){if(!F.back||F.strong)return;
  await say(LO,'Paul! Barnabas! We did not think to see either of you in Lystra again.');
  await say(TI,'You came in at the same gate, sir.');
  await say(EN,'Sit down, both of you. There is much to tell, and not all of it is good.')}
ROOMS.house={walk:[16,304,110,136],mood:'calm',amb:()=>F.back?{birds:.3,crowd:.1}:{fire:.5,crickets:.3,owl:.2},enter:backIntro,hs:[
  {name:'window',x:48,y:24,w:24,h:26,wx:64,look:()=>say(P,F.back?'Daylight, and the lane. Children are playing in it. Not one of them has thrown anything today.':'Night over Lystra. The street is quiet now, as if nothing had happened in it.')},
  {name:'lamp',x:140,y:42,w:20,h:24,wx:150,look:()=>say(P,F.back?'The lamp in its niche. It was by this lamp that I mended two garments.':'One lamp, in a niche. It is light enough to sew by.'),pickup:'It gives light to the whole house where it stands.'},
  {name:'shelf',x:172,y:48,w:60,h:18,wx:200,look:'Jars of oil, meal and olives. It is a careful household, and not a rich one.',pickup:'It is their winter store.'},
  {name:'hearth',x:76,y:88,w:34,h:18,wx:112,wy:114,dir:-1,look:()=>say(P,F.back?'The hearth is swept and cold. It is a fast day in this house.':'A fire of thorn wood. It is the first warmth I have felt since noon.'),use:'I warm my hands. Every finger still works. I have reason to be grateful.'},
  {name:'bench',x:6,y:78,w:62,h:26,wx:60,wy:114,dir:-1,look:'A bench, and a blanket folded on it. They have given us the best place in the house.',use:()=>say(P,F.back?'Not yet. There is something to be said first.':night()&&F.mended?'Soon. One more look round this room, and then I shall sleep.':'Not with those garments still hanging open.')},
  {name:'water jar',x:242,y:84,w:16,h:24,wx:236,wy:114,dir:1,look:'A great jar of water. Timothy carried every drop of it from the well.',pickup:'It would take two of us.'},
  {name:'table',x:168,y:104,w:44,h:20,wx:160,wy:124,dir:1,look:()=>say(P,F.back?'The table is bare. They are fasting with us today.':'Bread, olives and a bowl of milk. They set their own supper in front of us.'),pickup:'I have eaten. The rest is theirs.'},
  {name:'door to the lane',x:269,y:51,w:28,h:53,wx:272,wy:113,dir:1,look:'The door to the lane.',exit:houseDoor}]};
/* ============ DERBE: the short road home, and the other road ============ */
async function derIntro(){
  await say(ZE,'Barnabas! Paul! I looked for you at the gate. My wagon is loaded, and the oxen are yoked.');
  await say(ZE,'Tomorrow I go east, by the Roman road through the mountains to Tarsus, before the snow shuts the pass. There is room on the load for two.');
  await say(BN,'Tarsus, Paul. Your own city. And from Tarsus it is a short road home to Antioch.');
  await say(P,'The short way home, offered to us by a brother. And behind us, three cities full of disciples a few months old.',TH)}
const eastNo=()=>say(PC(),PC()===P?'The short way home: through the gap in the Taurus to Tarsus, and from Tarsus to Antioch. But behind us are disciples a few months old in the faith, and no one has been back to them. Not that way, Zenon. Not yet.'
  :'East, to Tarsus, and home? My feet would thank me. But I keep seeing the faces we left behind us. Not that way.');
ZE.hs={name:'Zenon',actor:ZE,
  look:'Zenon, a carter of Derbe. He heard us on his own threshing floor, and was among the first in this city to believe.',
  show:{tablets:'I cannot read, brother. Say one to me while I grease the axle.',awl:'If my harness gives out in the pass, I shall wish I had you beside me.',thread:'Strong stuff. I have traces on these oxen that are weaker.',knife:'Mind the ox. He is nervous of blades.','*':'Stow it on the load if you are coming. If you are coming.'},
  ask:{east:['A good road, and a well-traveled one: a Roman road. Through the gap in the Taurus, and down into Cilicia.','Then Tarsus, and from Tarsus the coast road to Antioch. You could sleep in your own beds before midwinter.']},
  talk:()=>talkTree([
    {q:'What is the road to Tarsus like?',a:async()=>{await say(ZE,'A good road, and a well-traveled one: a Roman road. Through the gap in the Taurus, and down into Cilicia.');await say(ZE,'But the snow shuts that gap. Another week or two, and nothing on wheels will go through until spring.')}},
    {q:'What will the brothers here do when we are gone?',a:async()=>{await say(ZE,'We meet on my threshing floor. There are quite a few of us now, and not one of us a season older in the faith than the rest.');await say(P,'Quite a few, and no one has troubled them. Derbe has been kind to us.')}},
    {q:'Thank you for the offer, Zenon.',bye:1}]),
  as:{barnabas:{look:'Zenon. A plain man with a loaded wagon and an honest offer.',talk:()=>say(ZE,'Room for two, Barnabas, and the oxen will not notice you. Talk to your friend.'),show:{staff6:'You would not need that on my wagon.','*':'Stow it on the load, if you are coming.'}}}};
ROOMS.derbe={walk:[16,304,110,138],mood:'hope',amb:{wind:.5,birds:.4,crickets:.3,hooves:.2},enter:derIntro,hs:[
  {name:'mountains',x:90,y:20,w:230,h:34,wx:220,look:'The Taurus, with new snow on it. Through that gap lies Cilicia, and Tarsus, where I was born.'},
  {name:'east gate of Derbe',x:18,y:50,w:42,h:54,wx:52,wy:113,dir:-1,look:'The east gate of Derbe. We declared the good news in that city and no one raised a hand against us.',
    use:'There are disciples enough in Derbe to go on without us. The question now is which road we take out of it.',open:'There are disciples enough in Derbe to go on without us. The question now is which road we take out of it.'},
  {name:'threshing floor',x:112,y:82,w:82,h:20,wx:150,wy:113,look:['Zenon\'s threshing floor: the harvest is in, and the grain is heaped.','Rains from heaven and fruitful seasons. Here they heard it gladly, and no one brought a bull.']},
  {name:'plowed field',x:198,y:78,w:92,h:12,wx:240,look:'One field under the plow already, waiting for the early rain.'},
  {name:'wagon',x:174,y:78,w:72,h:32,wx:166,wy:117,dir:1,look:'Zenon\'s wagon, loaded with grain for Tarsus. There is room on top for two men, if they do not mind the sacks.',pickup:'It is Zenon\'s, and it is loaded.',use:'Climb up, and ride home? Not before I have looked back down the road we came.'},
  {name:'oxen',x:248,y:78,w:40,h:34,wx:240,wy:120,dir:1,look:'A yoke of brown oxen. They are for a wagon, these: no one has hung a garland on them.',pickup:'They are Zenon\'s.'},
  {name:'milestone',x:297,y:91,w:10,h:18,wx:290,wy:122,dir:1,look:'A milestone. From here the road is counted east, to Tarsus.'},
  {name:'our baggage',x:58,y:98,w:38,h:14,wx:84,wy:115,dir:-1,look:'Two bed rolls and a bag. They have crossed a sea, a mountain and a river, and been thrown out of a city gate.',pickup:'When we have chosen our road.'},
  {name:'road',x:308,y:100,w:12,h:38,wx:302,wy:126,dir:1,look:'The road. East, it runs to Tarsus and home. West, it runs back the way we came.',exit:()=>travel()}]};
/* ============ BARNABAS AND PAUL, AS EACH SEES THE OTHER ============ */
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const BARN6={noCraft:"That is the tentmaker's trade, not mine. I would only spoil it.",
  def:{look:'I see nothing there that needs me.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',
    use:"That is the tentmaker's trade, not mine.",open:'It does not open.',talk:'I would get no answer.',give:'First I should choose something to give.'}};
const BN6={name:'Barnabas',actor:BN,
  look:()=>say(P,inIco()?'Barnabas. He has his staff in his hand already, and he is not hurrying me.'
    :inLys()?(G.bulls?'Barnabas. They are calling him Zeus, and he looks as if the ground had opened under him.':F.healed?'Barnabas. He is watching the crowd, and he likes it no better than I do.':'Barnabas. He looks round a town with no synagogue in it, and then at me.')
    :inOut()?'Barnabas. He has hardly spoken. He does not need to.'
    :night()?(F.mended?'Barnabas, mended and fed, and half asleep where he sits.':'Barnabas. His mantle hangs open from the neck to the belt: he tore it with his own hands, at the gate.')
    :inDer()?'Barnabas. He looks east, toward home. And then back, the way we came.':'Barnabas. The Son of Comfort, in a house that needs some.'),
  give:mend6,
  show:{corners:'Four scraps of leather. You see a wagon cover in them, and I believe you.',cover:'Finished? Then put it into his hands, Paul, and let us be gone.',
    silver:()=>say(BN,F.tatia?'His balance, paid to the last coin. Tatia will hear of that at home.':'So he paid. A hard man, but he pays.'),
    awl:'Your awl. I have never known you a day without it.',thread:()=>say(BN,night()&&!F.mended?'Thread. Paul, if you have any pity, use it on this mantle.':'Good thread. It has held a great deal together.'),
    knife:'Put it to work, brother. I will hold whatever needs holding.',tablets:'Read me one of them when we stop for the night.','*':'Keep it, brother. You will find a use for it.'},
  ask:{plot:'I believe Nathan. And I would sooner be thought a coward in Iconium than be of no use in Lystra.',cover:'Ask the saddler. A man who makes girths for mules must have leather to spare.',
    tongue:'It is no tongue I ever heard in Cyprus, Paul, or in Jerusalem. Ask someone who was born here.',
    east:'My feet say east. ...But I keep seeing Joel at his blue door, and that boy in Lystra, and Tatia at her fountain. Nobody has been back to any of them.'},
  talk:()=>inIco()?talkTree([
      {q:'Are we running away, Barnabas?',a:async()=>{await say(BN,'From words we never ran. We have stood in this city for weeks and answered every one of them.');await say(BN,quote('prov22'))}},
      {q:'What is still to do here?',a:()=>say(BN,!F.sewn?'Your cover, Paul. I know you will not leave a seam of it undone.':!F.paid?'Put that cover into the carrier\'s hands.':!F.tatia?'Tatia is waiting at the fountain. I think she wants a word with me.':'Nothing. The south gate is open.')},
      {q:'Be ready, brother.',bye:1}])
    :inLys()?talkTree([
      {q:'What do you make of this town?',a:()=>say(BN,F.healed?'I make of it that we are in more danger from its love than we ever were from the hatred of Iconium.':'Farmers and soldiers. Not one of them has ever heard a psalm. You will have to begin somewhere else, Paul.')},
      {q:'Where shall we begin?',if:()=>!F.healed,a:()=>say(BN,'Ask someone who lives here. That boy with the jar has been listening to us since the gate.')},
      {q:'Stay close.',bye:1}])
    :inOut()?say(BN,'I thought I had lost you, Paul. I stood in that gate and I thought it was finished. ...Lean on me. Where are we going?')
    :night()?talkTree([
      {q:'How do I look to you?',once:1,a:async()=>{await say(BN,'Like a man who was stoned. Like a man who then got up and walked back into the city that did it.');await say(BN,'I do not know which of the two frightens me more.')}},
      {q:'Tomorrow: Derbe.',a:()=>say(BN,F.mended?'Tomorrow, Derbe. Tonight, sleep.':'Tomorrow, Derbe. And I will walk there with my mantle flapping like a tent door, unless a certain tentmaker takes pity on me.')},
      {q:'Rest, brother.',bye:1}])
    :inDer()?talkTree([
      {q:'What do you say, Barnabas: east, or back?',a:()=>say(BN,BN6.ask.east)},
      {q:'They threw us out of every one of those cities.',once:1,a:async()=>{await say(BN,'They did. And in every one of them we left people who believed us.');await say(BN,'I was sent to Antioch once, to see whether the work there was real. Somebody ought to do as much for these.')}},
      {q:'Let us look at the road.',bye:1}])
    :talkTree([
      {q:'What do you see in this house?',a:()=>say(BN,'A congregation. Small, and not one of them was a believer when we came through that gate. And they have held together while we were away.')},
      {q:'Stand with me, brother.',bye:1}])};
/* Paul, as Barnabas sees him and talks to him */
const PAUL6={name:'Paul',actor:P,as:{barnabas:{
  look:()=>say(BN,inIco()?'Paul. Men are gathering stones for him, and he is worrying about four corners of a wagon cover.'
    :inLys()?(G.bulls?'Paul. They call him Hermes. I have never seen him so angry, or so careful.':'Paul. He is looking at this town the way he looks at a length of cloth: for where to begin.')
    :inOut()?'Paul. On his feet. I do not understand it, and I do not need to.':night()?'Paul. There is blood in his hair, and he is threading a needle.':inDer()?'Paul. He has not once looked east.':'Paul. He came back for these people. I knew he would.'),
  give:async it=>{if(!['corners','cover','silver'].includes(it))return false;const inv=invOf(BN),i=inv.indexOf(it);if(i>=0)inv.splice(i,1);toPaul(it);return say(BN,'This is yours, Paul. I was only carrying it.')},
  talk:()=>talkTree([
    {q:'What can I do to help?',a:()=>say(P,inIco()?(!F.paid?'Leave the cover to me. But go and speak to Tatia: it is you she wants.':!F.tatia?'Speak to Tatia, at the fountain. It is you she wants to ask.':'Nothing more. Take up your staff.')
      :inLys()?(!F.healed?'Stand beside me at the well, when I speak.':!F.heard?'Find me someone who understands what they are shouting.':'Come with me to the gate. They must hear it from both of us.')
      :inOut()?'Give me your arm as far as the gate. After that I will walk.':night()?(F.mended?'Sleep. So will I.':'Take off that mantle, and bring it to the lamp.')
      :inDer()?'Tell me that I am not wrong to turn my back on Tarsus.':F.strong?'Stand with me while we commit them to Jehovah.':'Sit by Lois. She has carried this household on her prayers.')},
    {q:'They called me Zeus, Paul.',if:()=>!!F.stopped,once:1,a:async()=>{await say(P,'And me Hermes, because I talk. By evening they had thought better of it.');await say(BN,'I prefer the stones. A man knows where he is with stones.')}},
    {q:'I will leave you to it.',bye:1}]),
  show:{staff6:()=>say(P,inOut()?'Lend it to me as far as the gate, Barnabas. ...No. I will walk in without it.':'Keep your staff by you, Barnabas. There is a long road yet.'),'*':'Keep it by you, Barnabas.'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'plot',q:'They mean to stone us tomorrow.',if:inIco},
  {id:'cover',q:"Xanthos's wagon cover wants four leather corners.",if:()=>inIco()&&!F.sewn},
  {id:'tongue',q:'What are the people shouting?',if:()=>inLys()&&F.healed&&!F.heard},
  {id:'east',q:'A road runs east from here to Tarsus, and home.',if:inDer}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inIco()?'The Son of Comfort. In a divided city, people bring him what they cannot say to me.':inDer()?'He would like to go home. He will not say so until I do.':'They called him Zeus, and he tore his mantle from the neck to the belt.'},
    {name:'Nathan',note:'A saddler of Iconium, a Jew who believes. He brought us word of the stones.',if:inIco},
    {name:'Xanthos',note:()=>F.paid?'He has his cover, to the last eyelet. He is still for the rulers, and a little less sure of what they told him.':'A carrier of Iconium. He paid me half the price of a wagon cover, and he takes me for a swindler.',if:()=>inIco()&&(F.metXan||F.paid)},
    {name:'Tatia',note:()=>F.tatia?'The wife of Xanthos. She knows now why we go, and what stays behind with her.':'The wife of Xanthos, and a believer. Her house is divided, like her city.',if:inIco},
    {name:'Timothy',note:()=>F.back?'He saw the garlands and the stones in one day, and he is still here.':'The son of Eunice, taught the holy writings from infancy. His father is a Greek. He speaks Lycaonian.',if:()=>atLystra()&&F.metTim},
    {name:'Eunice',note:()=>F.strong?'She asked whether it would always be so, and she was told the truth.':'A Jewess of Lystra, the mother of Timothy. Her husband does not believe.',if:()=>atLystra()&&F.metTim},
    {name:'Lois',note:'The mother of Eunice. What Timothy knows of the Scriptures began with her.',if:()=>atLystra()&&F.metTim},
    {name:'The man from the well',note:'Lame from birth, he had never walked. He had faith to be made well. (Acts 14:8, 9)',if:()=>atLystra()&&F.healed},
    {name:'Zenon',note:'A carter of Derbe, and a disciple. He offered us the short road home.',if:inDer}],
  tasks:[
    {t:"Finish the cover I promised Xanthos. Its corners want leather.",if:()=>inIco()&&!F.sewn},
    {t:"Put the finished cover into Xanthos's hands.",if:()=>inIco()&&F.sewn&&!F.paid},
    {t:'Tatia has a question. Barnabas is the one she wants to ask.',if:()=>inIco()&&!F.tatia},
    {t:'Leave Iconium by the south gate, before tomorrow.',if:()=>inIco()&&F.paid&&F.tatia},
    {t:'Find out who lives in Lystra, and where a stranger can speak.',if:()=>inLys()&&!F.healed},
    {t:'Find out what the crowd is shouting.',if:()=>inLys()&&F.healed&&!F.heard},
    {t:'Stop the sacrifice at the gate.',if:()=>inLys()&&F.heard&&!F.stopped},
    {t:'Go back into the city.',if:inOut},
    {t:'Mend the garments we ripped at the gate.',if:()=>night()&&!F.mended},
    {t:'In the morning: Derbe.',if:()=>night()&&F.mended},
    {t:'Choose the road out of Derbe.',if:inDer},
    {t:'Strengthen the disciples in Lystra.',if:()=>inHouse()&&F.back&&!F.strong},
    {t:'Entrust them to Jehovah, and take the road home.',if:()=>inHouse()&&F.back&&F.strong}],
  scripture:ORDER.map(k=>PASS[k])};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  iconium:{'mountains':{look:'Snow on the mountains, and water running everywhere below them. A good country. I am sorry to leave it like this.'},
    'street to the synagogue':{look:'The street to the synagogue. We went up it every Sabbath for weeks.',use:'Not today. Everything we had to say there has been said.',open:'Not today. Everything we had to say there has been said.'},
    'saddlery':{look:'Nathan\'s shop. It smells of leather and wax, like Paul\'s corner of it.'},"saddler's bench":{look:'The bench is clear. He finished it.'},
    'unfinished cover':{look:'The carrier\'s wagon cover. Paul has sat up half the nights of a month over it, and it still wants its corners.',use:BARN6.noCraft,pickup:'It is Paul\'s work, and Paul\'s promise.'},
    'fountain':{look:'Good water. Half the talk of Iconium is carried on round this basin.',use:'I drink. It is cold enough to hurt the teeth.'},'poplars':{look:'Poplars. They grow where the water is, and so do cities.'},
    "Xanthos's wagon":{look:()=>say(BN,F.paid?'Paul\'s cover, on the wagon of a man who calls him a swindler. Let him explain that to his friends.':'A wagon with bare hoops. It is waiting for the cover.')},
    'gateway of the yard':{look:'The carrier\'s yard. Tatia lives behind it.',use:'I have no business in there.',open:'I have no business in there.'},
    'south gate':{look:'The south gate, and the road into Lycaonia. I should like to be through it before the market fills tomorrow.'}},
  lystra:{'hills':{look:'A quiet valley. Nobody would come here who was not looking for it.'},'fields':{look:'Good land, and well watered. They want for nothing here but the knowledge of who gave it.'},
    'city wall':{look:'A Roman wall round a Lycaonian town.'},
    'city gate':{look:()=>say(BN,G.bulls?'Bulls. Garlands. And they are looking at me. I could sink into the ground.':'The gate we came in by.')},'bulls':{look:'White bulls, garlanded. I have seen sacrifices at Jerusalem all my life. Never one meant for me.',use:stop6},
    'door of a house':{look:'Somebody\'s door. It is shut.',use:'It is not my house.',open:'It is not my house.'},"door of Lois's house":{look:'A door with a household of faith behind it. One feels it.',use:'I will go in when I am asked.',open:'I will go in when I am asked.'},
    'well':{look:'The well. In a town without a synagogue, it is the nearest thing to one.',use:speak6},
    'man sitting by the well':{look:'A man who cannot walk. He watches Paul as if Paul were carrying something for him.',talk:'He nods, and looks past me at Paul.',use:'I have nothing in my purse that he wants.'},
    'farm stall':{look:'Figs, olives, grain. A generous valley.'}},
  outside:{'hills':{look:'It is getting dark. I do not want him out here when it is.'},'Lystra':{look:'Lystra. I stood inside that gate and could do nothing.'},
    'city gate':{look:'The gate. They have gone home, every one of them.'},'bare tree':{look:'A bare tree, and winter coming.'},
    'stones':{look:'I will not count them.',pickup:'No.'},'road to Derbe':{look:'The Derbe road. Tomorrow, perhaps. Not tonight.'}},
  house:{'window':{look:()=>say(BN,F.back?'The lane, in daylight. It looks like any other lane.':'The street is quiet. A few hours ago it was full of people looking for stones.')},'lamp':{look:'A small lamp. It is doing a great deal of work tonight.'},
    'shelf':{look:'Their winter store. And they have fed two strangers out of it.'},'hearth':{look:()=>say(BN,F.back?'Cold and swept. They are fasting with us.':'A good fire.'),use:'I warm my hands. I had not known how cold they were.'},
    'bench':{look:'A bench and a blanket. It looks to me like a king\'s bed.',use:()=>say(BN,F.back?'Not yet.':F.mended?'In a moment. I want to see Paul lie down first.':'In this mantle I should catch my death. Paul has thread.')},
    'water jar':{look:'Water, carried from the well where it all began.'},'table':{look:()=>say(BN,F.back?'An empty table. A fast day.':'Their supper, set in front of us.')},'door to the lane':{look:'The door to the lane.'}},
  derbe:{'mountains':{look:'The Taurus again. Through that gap lies Tarsus, and beyond Tarsus, home.'},'east gate of Derbe':{look:'Derbe. Not one stone, in all the time we were here.',use:'We have done what we came to do in Derbe.',open:'We have done what we came to do in Derbe.'},
    'threshing floor':{look:'Zenon\'s threshing floor. The congregation of Derbe meets on it.'},'plowed field':{look:'Someone is ready for the early rain.'},
    'wagon':{look:'Room for two on top of the grain. I can feel the sacks under my back already.',use:'Not unless Paul says so. And he will not.'},'oxen':{look:'Patient beasts. They would have us in Tarsus without one blister.'},
    'milestone':{look:'The miles to Tarsus. Fewer than the miles behind us.'},'our baggage':{look:'Our bundles. They are lighter than they were, and so are we.',pickup:'When we know which way they are going.'},
    'road':{look:'One road, and two ways along it.'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ PLACING THE CAST, SETUP ============ */
/* ENT: where Paul stands when a room is entered by a code. */
const ENT={iconium:[178,124,1],get lystra(){return F.healed?[262,126,1]:[112,124,1]},outside:[156,127,1],house:[236,124,-1],derbe:[120,124,1]};
/* place6: put everyone where the story has them, for the room the two men are in. They keep together throughout. */
function place6(room){const o=other(),e=ENT[room];for(const a of[NA,XA,TA,TI,EN,LO,LM,PR,ZE])a.room=null;G.crowd=0;G.bulls=0;G.down=0;
  place(o,room,e[0]-e[2]*26,e[1]+2,e[2]);
  if(room==='iconium'){place(NA,room,92,114,1);place(TA,room,278,116,-1);place(XA,room,400,117,-1)}
  else if(room==='lystra'){place(TI,room,224,119,1);place(EN,room,204,115,1);place(LO,room,180,113,1);
    if(F.healed){place(LM,room,344,118,-1);G.crowd=F.heard?2:1}
    if(F.heard){G.bulls=1;place(PR,room,94,117,1)}}
  else if(room==='outside'){place(TI,room,194,123,-1);place(EN,room,210,130,-1);place(LO,room,104,131,1);place(LM,room,226,124,-1)}
  else if(room==='house'){place(LO,room,120,116,1);place(EN,room,214,117,-1);place(TI,room,90,124,1);if(F.back)place(LM,room,176,114,-1)}
  else if(room==='derbe')place(ZE,room,158,119,-1)}
function setup6(){BN.hs=BN6;P.hs=PAUL6;P.called='Paul';Object.assign(BN,BARN6);BN.speed=0;BN.free=false;for(const id in BY6)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY6[id];
  place6('iconium');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,barnabas:['staff6']};drawInv()}
/* ============ SCENES: intro, the roads, ending; PRAYER HINTS ============ */
/* arrive6: after the map has drawn a leg, and before the room is shown: who is there, and what the account says of the road. */
async function arrive6(to,from){
  if(to==='lystra'&&from==='iconium'){dropAll('silver');place6('lystra');
    await narr('...and they fled to the cities of Lycaonia, Lystra and Derbe, and to the surrounding country. There they went on declaring the good news. (Acts 14:6, 7)',{dur:9500});
    await narr('Lystra lay a day\'s walk to the south: a Roman colony in a secluded valley, where the people still spoke Lycaonian among themselves.',{dur:8500})}
  else if(to==='derbe'){place6('derbe');
    await narr('Derbe lay about 100 kilometers further on: the easternmost city of the province.',{dur:6500});
    await narr('There they declared the good news, and made quite a few disciples. (Acts 14:21)',{dur:6000});
    await narr('No one followed them there with stones. And the year was turning toward winter.',{dur:6000})}
  else if(to==='lystra'){F.back=1;place6('house');AU.mood='calm';
    await narr('After declaring the good news to that city and making quite a few disciples, they returned to Lystra, Iconium, and Antioch. (Acts 14:21)',{dur:9500});
    await narr('They went back by the road they had come, into the very cities where the stones had been.',{dur:6500})}}
async function start6(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(6);G.end={};G.scene=null;enterRoom('iconium',...ENT.iconium);place(NA,'iconium',30,116,1);codeBtn();await fade(0,600);
    await narr('Iconium, in the province of Galatia, about 47 C.E.',{dur:3200});
    await narr('Now in Iconium they entered together into the synagogue of the Jews and spoke in such a manner that a great multitude of both Jews and Greeks became believers. (Acts 14:1)',{dur:10000});
    await narr('But the Jews who did not believe stirred up and wrongly influenced the people of the nations against the brothers. (Acts 14:2)',{dur:8000});
    await narr('So they spent considerable time speaking with boldness by the authority of Jehovah. (Acts 14:3)',{dur:6500});
    await narr('However, the multitude of the city was divided; some were for the Jews but others for the apostles. (Acts 14:4)',{dur:7500});
    await walk(NA,128,118);NA.dir=1;P.dir=-1;BN.dir=-1;
    await say(NA,'Paul! Barnabas! Leave the bench and listen. I have it from a man who was in the room.');
    await say(NA,'The rulers of the synagogue and the men of the city have agreed at last, they who agree on nothing. Tomorrow, when the market fills, they mean to lay hands on you both. And they are bringing stones.');
    await narr('When both the people of the nations and the Jews with their rulers made an attempt to treat them insolently and stone them, they were informed of it. (Acts 14:5, 6)',{dur:10000});
    await say(BN,'Stones. Their words we have answered for weeks, Paul. Stones are another matter.');
    await say(P,'They are. We go today: south, into Lycaonia. But not like men who run from their debts.');
    await walk(NA,92,114);NA.dir=1;
    await say(P,'The cover for Xanthos\'s wagon lies on that bench, half paid for and nine parts finished. I gave him my word for it before this city took sides.',TH)},true)}
/* The way home (Acts 14:23-27). The road back is the road they came, so the map does not draw it twice: the light walks it, city by city. */
async function finale6(){playAs(P);AU.mood='calm';await Promise.all([walk(P,156,126),walk(BN,140,131)]);P.dir=1;BN.dir=1;
  for(const a of[P,BN,TI,EN,LO,LM])a.bow=true;
  await narr('Moreover, they appointed elders for them in each congregation, offering prayer with fasting, and they entrusted them to Jehovah, in whom they had become believers. (Acts 14:23)',{dur:11500});
  for(const a of[P,BN,TI,EN,LO,LM])a.bow=false;
  await say(P,'Older men of your own now, to shepherd you when we are gone. And over them, and over every one of you, Jehovah.');
  await say(TI,'Will you come again, sir?');
  await say(P,'If Jehovah permits it, Timothy. Until then, hold on to what you have learned, and remember from whom you learned it.');
  await say(LO,'Go in peace, both of you. This door will be open.');
  P.dir=1;walk(BN,292,118);await walk(P,272,113);await fade(1,700);AU.mood='hope';
  await narr('So it was in Lystra, and in Iconium, and in Antioch: the disciples strengthened, and elders appointed in each congregation. (Acts 14:21-23)',{dur:9500});
  try{const M=await need('map');await M.journey(HOME,{view:'north',instant:1});codeBtn();await fade(0,700);
    for(const id of['lystra','iconium','antiochp','perga']){M.state.pulse=id;tone({f:1175,d:.18,type:'sine',v:.05,echo:1});await wait(1000)}
    await narr('Then they went through Pisidia and came into Pamphylia, and after proclaiming the word in Perga, they went down to Attalia. (Acts 14:24, 25)',{dur:9500});
    await M.go('perga','attalia');
    await narr('From there they sailed off for Antioch, where they had been entrusted to the undeserved kindness of God for the work they had now completed. (Acts 14:26)',{dur:10500});
    await M.go('attalia','seleucia');await M.go('seleucia','antioch')}catch(e){console.error(e);await fade(0,400)}
  await narr('When they had arrived and had gathered the congregation together, they related the many things God had done by means of them, and that he had opened to the nations the door to faith. (Acts 14:27)',{dur:12500});
  await narr('Years later Paul would remind Timothy of "the persecutions and sufferings such as I experienced in Antioch, in Iconium, in Lystra." (2 Timothy 3:11)',{dur:9500});
  endScreen({title:'The Door to Faith',text:'Paul paid what he owed before he fled, would not take a garland that belonged to the living God, and walked back in through the gate of the city that stoned him. Then he took the long road home, by way of every disciple.',
    extra:[F.debt&&'Silver left for the brothers in Iconium',F.copy&&'A passage read with young Timothy'].filter(Boolean),
    based:'Based on Acts 14:1-28 and 2 Timothy 1:5; 3:10, 11, 15. Supporting characters and dialogue are imaginative; the events are from the Scriptures. Acts does not say when Lois, Eunice and Timothy became believers; it was likely during this first stay in Lystra.',
    go:'Click to continue to Chapter Seven',code:['Chapter Seven code: {code}',codeOf(7,0)]});
  await wait(1500);ov.onclick=()=>startChapter(7);await new Promise(()=>{})}
/* HOME: the roads already travelled, as the closing map shows them. The crossing from Paphos to Perga is left off: the voyage home passes
   north of Cyprus, and two routes on the map must not cross. */
const HOME=[['perga','antiochp'],['antiochp','iconium'],['iconium','lystra'],['lystra','derbe']];
function hint6(){const b=PC()!==P,craft=['craft6',["That is the tentmaker's craft, not mine. A good partner knows when to step back.",'Paul should do this part. I can leave it to him; he is never far away.']];
  if(inIco()){
    if(!F.sewn)return b?craft:F.leather?['sew6',['I have the leather now. Four corners, four eyelets, and the cover is what I promised.','I should use the leather corners with the unfinished cover.']]
      :['leather6',['The corners of the cover want leather. And I work in the shop of a saddler who is my brother.','I should talk to Nathan, and ask him for leather for the four corners.']];
    if(!F.paid)return b?['paid6b',['The cover is finished. It is Paul\'s to deliver: he gave his word for it.','Paul should give the wagon cover to Xanthos. If I am carrying it, I can give it to him.']]
      :['paid6',['A promise is kept when the work is in the other man\'s hands, whatever he thinks of me.','I should give the wagon cover to Xanthos.']];
    if(!F.tatia)return b?['tatia6b',['Tatia does not doubt the danger. She needs to know why we go, and what stays behind.','I should talk to Tatia, and tell her what our Lord said to those he sent out.']]
      :['tatia6',['Tatia has a question, and it is Barnabas she wants to ask. He is well named.','Barnabas should talk to Tatia. I can let him.']];
    return['go6',['Nothing is owed here, and nothing is left unsaid. The shrewd one sees the danger.','We can leave by the south gate, and choose Lystra on the map.']]}
  if(inLys()){
    if(!F.metTim)return['tim6',['A town with no synagogue. Before anything is said here, we should learn who lives in it.','I should talk to the boy with the water jar.']];
    if(!F.healed)return b?['well6b',['Everyone comes to the well. And Paul is the one to speak there.','Paul should use the well.']]:['well6',['With no synagogue, the well is where a stranger can be heard.','I should use the well, and speak.']];
    if(!F.heard)return['hear6',['No one can answer what he does not understand. The household of Lois has both tongues.','I should talk to Timothy, and ask what the people are shouting.']];
    return['stop6',['They would give to two men what belongs to the living God. It must be stopped, and in words that farmers can follow.',b?'We should go to the city gate, both of us.':'I should go to the city gate.']]}
  if(inOut())return['in6',['The disciples are inside that gate. They must not be left without a word, as if there were something to hide.','We should go in at the city gate.']];
  if(inHouse()){
    if(F.back)return F.strong?['home6',['They have been strengthened. What remains is to entrust them to Jehovah, and to take the road.','We can leave by the door to the lane.']]
      :b?['strong6b',['It is Paul whom Eunice is asking. It was Paul they stoned.','Paul should talk to Eunice.']]:['strong6',['Eunice must not be told that it will be easy. She must be told the truth, and that she is not alone in it.','I should talk to Eunice.']];
    if(!F.mended)return b?craft:['mend6',['We ripped our garments at the gate. I have an awl and thread, and there is a lamp.','I should use the thread on Barnabas, and mend what we tore.']];
    return['derbe6',['Mended, fed, and alive. Tomorrow: Derbe.','We can leave by the door to the lane, and choose Derbe on the map.']]}
  return['back6',['The short way home lies east. But the disciples lie behind us, and no one has been back to them.','We can take the road, and choose Lystra on the map.']]}
/* ============ CHAPTER DEFINITION ============ */
return{rooms:['iconium','lystra','outside','house','derbe'],setup:setup6,start:start6,hint:hint6,music:MUSIC,topics:TOPICS,tablets:TABLETS,
  /* painters: the chapter's animal, for the playtest, which checks that every part of it is attached and shows it enlarged */
  painters:{ox},
  /* Iconium, Lystra and Derbe lie north of the map's usual window, so this chapter looks through the northern one */
  view:'north',
  places:{
    antiochp:{room:'-',if:()=>false,no:()=>say(PC(),inDer()?'Antioch, yes: the last of the three. Lystra lies first on the way back, and then Iconium.':'They threw us outside its boundaries, and the disciples there are full of joy. Our road lies on.')},
    iconium:{room:'iconium',x:178,y:124,dir:1,if:()=>false,no:()=>say(PC(),inDer()?'Iconium, yes. But Lystra lies first on the way back. One city at a time.':'There are stones waiting for us in Iconium. Not yet.')},
    lystra:{get room(){return atLystra()?G.room:inDer()?'house':'lystra'},get x(){return ENT[this.room][0]},get y(){return ENT[this.room][1]},get dir(){return ENT[this.room][2]},if:()=>inIco()||inDer()},
    derbe:{room:'derbe',x:120,y:124,dir:1,if:night,no:'Derbe lies beyond Lystra, and Lystra has not heard either. One city at a time.'},
    tarsus:{room:'-',hide:()=>!inDer(),if:()=>false,no:eastNo}},
  way:()=>[['antiochp','iconium']].concat(inIco()?[]:[['iconium','lystra']],inDer()||F.back?[['lystra','derbe']]:[]),arrive:arrive6,
  flags:['leather','sewn','paid','debt','tatia','metXan','metTim','healed','heard','stopped','mended','copy','back','strong'],
  codeBits:{flags:20,rooms:3,share:9},party:['paul','barnabas'],home:{staff6:'barnabas'},share:['awl','thread','knife','tablets','staff6','corners','cover','silver'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.leather&&!F.sewn,'corners');add(F.sewn&&!F.paid,'cover');add(F.paid&&!F.debt&&room==='iconium','silver');inv.push('staff6');return inv},
  place:place6}
});
