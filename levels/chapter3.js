/* Paul of Tarsus: level data for Chapter Three, "Called to Antioch".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints. */
LEVEL(3,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A Greek-speaking city in G Mixolydian: a quick lyre figure over a walking bass, a hand drum, and an aulos (a reed pipe).
   At the workbench and in the courtyard (mood "calm") the pipe waits for the second half; in the busy street and on the road
   (mood "hope") it plays throughout, with a shaker and hand claps. */
const _=null,
 TUNE=[[[0,4,2],[2,5,2],[4,7,4],[8,5,2],[10,4,2],[12,2,4]],[[0,4,4],[4,2,2],[6,1,2],[8,0,8]],[[0,3,2],[2,4,2],[4,5,4],[8,7,2],[10,5,2],[12,4,4]],[[0,2,4],[4,1,4],[8,2,8]],
  [[0,7,4],[4,8,2],[6,7,2],[8,5,4],[12,4,4]],[[0,6,4],[4,5,2],[6,4,2],[8,3,8]],[[0,4,2],[2,5,2],[4,7,2],[6,8,2],[8,9,4],[12,7,4]],[[0,8,4],[4,7,12]]],
 MUSIC={dt:.155,root:55,scale:[0,2,4,5,7,9,10],bars:16,group:[3,3,2],tracks:[
  {inst:'lyre',prog:'AABACADA',len:2,seq:{A:[0,_,2,4,_,2,7,_,4,_,2,4,_,2,4,_],B:[-1,_,1,3,_,1,6,_,3,_,1,3,_,1,3,_],C:[3,_,5,7,_,5,10,_,7,_,5,7,_,5,7,_],D:[4,_,6,8,_,6,11,_,8,_,6,8,_,6,8,_]}},
  {inst:'bass',prog:'AABACADA',len:5,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-8,_,_,_,_,_,_,_,-4,_,_,_,_,_,_,_],C:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],D:[-3,_,_,_,_,_,_,_,-6,_,_,_,_,_,-5,_]}},
  {drum:1,moods:['calm'],seq:{A:'d..k..t.d.k.t...'},vol:.7,group:[3,3,2,2,2,4]},
  {drum:1,moods:['hope'],prog:'AB',seq:{A:'d.sk.st.d.sk.st.',B:'d.sk.st.d.skcstc'}},
  {inst:'aulos',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
/* materials and light to the standard of Chapter Fifteen's room of Gaius (shared/materials.js): quiet directional grain on every board and
   beam, two-tone cracks set by hand high on the walls, soft contact shadows in three passes, and dyes drawn a little toward earth colors */
const{plank:plank3,board:board3,crack:crack3,skipCracks:skipCracks3,shadow:shadow3,earth:earth3}=SHARED.materials;
/* the day's sky and the roof tiles, drawn a little toward their own grey, so that they sit among the stone, plaster and earth of the rest */
const SKY3=c=>c.map(k=>earth3(k,.12)),TR=earth3('#c0603c',.14),TD=earth3('#a84c2c',.14),TL=earth3('#e08a60',.14),TE=earth3('#7a3620',.1);
/* What is seen through the gates of Tarsus and Antioch: green hills, and the road running on. Each gate adds the horizon and the sky of its own scene. */
const GATE3={far:['#8ea284','#a8b890'],near:['#7c9668','#8fa87a'],land:'#b8c090',road:'#ead9ae'};
/* A hank of goat-hair cloth rolled on itself: x,y the top of its left end, w long. Of its two ends only the one turned toward the middle of the
   picture shows, the right one (clothRoll); its soft shadow lies under it. */
function bolt(g,x,y,w,hh,c){c=c||'#2a211c';shadow3(g,x+w/2+1.5,y+hh+.3,w/2+1.5,1.1,.42,'#281e30');clothRoll(g,x,y+hh,w,hh,tint(c,.06),{near:1,k:.3,face:.22,hi:1})}
/* ---------- Tarsus: Saul's stall, the Taurus behind the city ---------- */
ART.tarsus={w:320,q:12,
 /* the morning sun from the left: shadows fall to the right and a little toward us, as the stall's and the posts' do */
 light:{amb:'#ffffff',sun:[14,6,.4]},
 paint(g){const r=rng(113),SH='#8f95c8',ST='#d8c8a0';
  sky(g,320,76,SKY3(['#3a78c8','#66a0dc','#9cc4ea','#d0e2ee']));cloud(g,150,12,56,9,r);cloud(g,262,24,40,7,r);cloud(g,40,16,34,6,r);
  /* the Taurus, snow on its heads */
  const mt=x=>26+9*Math.sin(x/37+.6)+6*Math.sin(x/15+2)+3*Math.sin(x/6)+2*Math.sin(x/2.3);ridge(g,0,320,74,mt,['#7f90b8','#9aa8c4','#b4bccc']);
  for(let x=0;x<320;x+=.5){const h=mt(x);if(h>27)R(g,x,74-h,.5,Math.min(9,(h-27)*.9)+Math.sin(x*1.7)*1.2,'#f4f7fc');if(Math.sin(x*.9)>.6)R(g,x,74-h+6+Math.sin(x)*2,.5,6,'rgba(90,104,150,.35)')}
  ridge(g,0,320,74,x=>10+4*Math.sin(x/28+2)+2*Math.sin(x/9),['#8ea27c','#a2b48c']);for(let i=0;i<60;i++)oval(g,r()*320,66+r()*8,1.4+r(),.8,'#7a906a');
  for(const[hx,hy,hw,hh]of[[150,50,34,16],[196,46,26,20],[226,52,18,14]]){R(g,hx,hy,hw,hh,'#e2d6b4');R(g,hx,hy,hw,1.4,'#b8603c');R(g,hx+hw-4,hy+1.4,4,hh,'#b9b4b8');R(g,hx+hw*.3,hy+5,3,5,'#7a6c58')}
  cypress(g,134,64,13);cypress(g,232,64,15);cypress(g,244,64,10);comp(g,'screen',.22,()=>R(g,0,40,320,36,'#c8d8ee'));
  /* city wall and the east gate */
  ashlar(g,112,62,208,42,ST,r,{bw:13,bh:6,v:.09,t:.35});for(let i=112;i<320;i+=9){R(g,i,58.5,5.5,3.5,ST);R(g,i,58.5,5.5,.5,'#f4e8c8')}
  ashlar(g,268,46,52,58,'#e0d0a8',r,{bw:12,bh:6,v:.09});for(let i=268;i<320;i+=8){R(g,i,41.5,5,4.5,'#e0d0a8');R(g,i,41.5,5,.5,'#f8eccc')}R(g,268,45.5,52,1,'#a8987a');poly(g,[268,41.5,262,45,262,104,268,104],'#a8a0b0');
  arch(g,278,64,32,40,'#c2b28c');gateView(g,280,66,28,38,{...GATE3,hz:74,sky:[76,SKY3(['#3a78c8','#66a0dc','#9cc4ea','#d0e2ee'])],rise:4});ao(g,280,66,4,38,'l',.3,'#2a2440');for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,294+Math.cos(a)*16-.3,80+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* my workshop: an open front under an awning of my own cloth */
  /* the plaster's random cracks give way to cracks set by hand, high on the wall where they run to no head; the random draws they used are
     still taken (skipCracks3), so everything else keeps its place */
  house(g,0,24,116,80,'#e2d0a4',r,{side:6,patch:4,cracks:0,t:.38});skipCracks3(r,5);{const rb=rng(1131);for(const[x,y,n]of[[14,27,3],[60,26.4,3],[101,27,2]])crack3(g,x,y,n,rb)}windowArt(g,26,29,12,8,'#e2d0a4',{bars:2});windowArt(g,76,29,12,8,'#e2d0a4',{bars:2});
  R(g,10,50,98,54,'#cbb88c');g.fillStyle=lg(g,0,52,0,104,['#1e1612','#3a2c22']);g.fillRect(12,52,94,52);
  const rw=rng(1137);board3(g,17,66,58,2.2,'#6a4e34',rw);ao(g,17,68.2,58,3,'t',.3,'#0c0808');vessel(g,24,66,3.6,9,'#8a4a2a','jar',{noShadow:1});vessel(g,34,66,3.2,7,'#6f5a3a','jug',{noShadow:1});bolt(g,46,60.4,22,5.6,'#30261f');
  R(g,85.4,56,1.6,3,'#5a4630');for(let i=0;i<3;i++){g.strokeStyle=i%2?'#b89a5a':'#8f7440';g.lineWidth=1.2;g.beginPath();g.arc(86.2,65,5-i*1.3,0,6.2832);g.stroke()}
  ao(g,12,52,94,12,'t',.6);ao(g,12,52,10,52,'l',.4);ao(g,94,52,12,52,'r',.3);ao(g,12,96,94,8,'b',.4,'#0c0808');
  board3(g,6,44,3,62,'#6a4a2c',rw,1);board3(g,110,44,3,62,'#6a4a2c',rw,1);shadow3(g,8,105.4,3.6,1.2,.4);shadow3(g,112,105.4,3.6,1.2,.4);
  const aw=[3,40,117,40,119,50.6,1,50.6];poly(g,aw,'#2e2620');clipTo(g,()=>poly(g,aw),()=>{for(let i=0;i<120;i+=8)R(g,i,40,4,11,'#3c322a');tex(g,'vert',.5,0,40,120,11,'overlay',.5);ao(g,0,40,120,3,'t',.3);R(g,0,40,120,.6,'#5a4e42')});
  for(let i=0;i<118;i+=8)poly(g,[1+i,50.6,9+i,50.6,5+i,53],(i/8)%2?'#2e2620':'#3c322a');shade(g,[10,53,108,53,108,60,10,58],SH,.5);
  /* paving */
  pave(g,0,103,320,144,'#b8b0a0',r,{vx:170,vy:62,rows:5,step:32,v:.08});ao(g,0,103,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,320,41)});
  shade(g,[0,104,116,104,128,112,0,114],SH,.7);shade(g,[116,104,320,104,320,107,122,107],SH,.5);shade(g,[262,104,268,104,282,109,270,109],SH,.7);
  /* workbench in front of the stall */
  R(g,18,93,74,12,'rgba(30,20,30,.32)');ao(g,18,92,74,4,'t',.3,'#0c0808');shadow3(g,54,105.4,40,1.4,.36);
  board3(g,17.5,92,4.4,13.5,'#6a4e2c',rw,1);board3(g,85.5,92,4.4,13.5,'#6a4e2c',rw,1);board3(g,21.5,99,64.5,2.2,'#5a4226',rw);
  board3(g,13,88,82,4.4,'#96703e',rw);R(g,13,91.8,82,1.2,'#5a4226');for(let i=0;i<10;i++){const sx=16+r()*76;stroke(g,[sx,89+r()*2,sx+2+r()*4,89+r()*2],'rgba(50,28,10,.5)',.5)}
  bolt(g,54,82,28,6,'#2a211c');
  /* a tether post for Kleon's mule, and where the tent stands */
  shadow3(g,273,105.8,4,1.2,.4);board3(g,270.5,96,2.4,10,'#6a4a2c',rw,1);  shadow3(g,166,107.4,30,2.2,.34,'#2a2050');
  /* the light of the morning, from the left and in front: the sky and the far hills keep the full day; the house front above the awning, the
     city wall, the gate tower and the paving each take the sun, and the stall under its awning, the foot of the walls and the near paving
     lie in the day's own cool shade */
  lightmap(g,320,'#e2dee8',l=>{R(l,0,0,320,56,'#ffffff');l.fillStyle=lg(l,0,56,0,78,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,56,320,22);
    pool(l,62,34,92,30,'#fff8ee',.6);pool(l,196,80,150,36,'#fff6e8',.6);pool(l,294,72,40,44,'#fff4e2',.45);pool(l,172,122,190,26,'#fff2dc',.6);
    pool(l,58,96,46,14,'#f0dcc0',.22);
    comp(l,'multiply',1,()=>{ao(l,12,52,94,26,'t',.32,'#4a4468');ao(l,0,94,320,12,'b',.12,'#4a4468');ao(l,0,128,320,16,'b',.18,'#4a4468')})});
  pool(g,40,0,260,150,'#fff0c0',.15,'screen');ao(g,200,0,120,144,'r',.1,'#2a2050')},
 fore(g){const r=rng(114);vessel(g,306,152,13,36,'#6a3420','amph',{noShadow:1});sack(g,10,148,13,20,'#b8a880');sack(g,30,147,9,13,'#a89870');
  comp(g,'source-atop',.4,()=>R(g,0,0,320,144,'#34305a'))},
 draw(g,t){
  if(!F.gotLoops){const hd=[21,86.4,45,86,46.4,90,44,96.6,40,95,37,97.4,31,95.6,27,97.6,23,95,21.6,90];oval(g,34,97.6,13,1.2,'rgba(40,30,60,.3)');poly(g,hd,'#a8703e');
    clipTo(g,()=>poly(g,hd),()=>{g.fillStyle=lg(g,0,86,0,98,['#c8905a','#a8703e','#7a4e28']);g.fillRect(20,86,28,12);R(g,21,86.4,25,.8,'#deb07a')});stroke(g,[25,89,42,88.6],'#7a4e28',.5)}
  /* Kleon's mule stands with its head by the tether post, toward the east gate and the mountain road */
  SHARED.beasts.mule(g,244,110,1,SHARED.beasts.pose('mule3',0),2);
  /* the tent on its frame. The two poles meet at the top and do not cross there, and no band runs across the cloth, so that the seam's
     stitches, which run down its middle, cross nothing */
  stroke(g,[166.5,49.4,140,106.5],'#5a3e22',1.6);stroke(g,[166.5,49.4,193,106.5],'#5a3e22',1.6);stroke(g,[166,49.6,139.5,106.5],'#9a7040',.5);
  if(F.gotTent){stroke(g,[152.5,82,180.5,82],'#5a3e22',1.4);stroke(g,[152.5,81.6,180.5,81.6],'#9a7040',.4);return}
  const tp=[166.5,57,191.5,106,141.5,106];poly(g,tp,'#241c18');clipTo(g,()=>poly(g,tp),()=>{g.fillStyle=lg(g,141,0,192,0,['#3e3229','#2a211c','#17110e']);g.fillRect(141,57,51,49);
    for(let j=0;j<49;j+=1)R(g,141,57+j,51,.5,j%2?'rgba(0,0,0,.16)':'rgba(255,240,210,.05)');
    stroke(g,[166.5,57,152,106],'rgba(0,0,0,.4)',.6);stroke(g,[166.5,57,180,106],'rgba(0,0,0,.4)',.6);stroke(g,[166.5,57,146,106],'rgba(255,240,210,.12)',.5)});
  stroke(g,[166.5,57,141.5,106],'#4e4034',.6);
  if(!F.seam){const sm=[166.5,70];for(let j=1;j<=9;j++)sm.push(166.5-(.6+j*.36),70+j*4);for(let j=9;j>=1;j--)sm.push(166.5+(.5+j*.34),70+j*4);poly(g,sm,'#c8b890');poly(g,sm.map((v,i)=>i%2?v:166.5+(v-166.5)*.45),'#eadfbe');
    R(g,163.6,80,.6,3,'#d8c9a0');R(g,170,92,.6,4,'#d8c9a0')}
  else for(let j=15;j<48;j+=3)R(g,166.2,57+j,.7,2,'#9a8a66');
  if(F.loopsOn)for(let i=0;i<7;i++){R(g,142+i*7.8,103.6,2,3.6,'#b07a48');R(g,142+i*7.8,103.6,.6,3.6,'#d8a26a');R(g,142+i*7.8,106.6,2,.8,'#7a4e28')}},
 front(){}};
/* oilJar: Theron's big two-handled jar, sealed with a clay stopper. Painted from the vessel toolkit, handles as short curved strokes. */
function oilJar(g,x,y,L){L=L||(c=>c);vessel(g,x,y,5.6,16,L('#a25a30'),'amph');for(const d of[-1,1])stroke(g,[x+d*2.6,y-14.6,x+d*5.6,y-13.4,x+d*5.2,y-10.6],L('#6e3a1c'),.9);
  R(g,x-1.6,y-17.4,3.2,1.8,L('#cbb48a'));R(g,x-1.6,y-17.4,3.2,.5,L('#ecd8b0'));R(g,x-.5,y-16.6,1,.8,L('#8a4a2a'))}
/* ---------- Antioch: the courtyard where the congregation meets ---------- */
ART.court={w:320,q:12,
 /* the day from the left: short shadows to the right and toward us, as the porch's and the walls' */
 light:{amb:'#ffffff',sun:[10,5,.4]},
 paint(g){const r=rng(131),SH='#8f95c8',W='#e6d6ac';
  sky(g,320,40,SKY3(['#3f7ecc','#74aade','#a8cdea']));cloud(g,210,7,40,6,r);
  ridge(g,92,320,36,x=>10+8*Math.sin(x/70+.4)+2*Math.sin(x/13),['#8ea27c','#a6b68e']);
  for(let x=150;x<320;x+=.5){const h=10+8*Math.sin(x/70+.4)+2*Math.sin(x/13);R(g,x,36-h-2,.5,3,'#e2d8c0');if(Math.floor(x)%6<3)R(g,x,36-h-3.2,.5,1.2,'#e2d8c0');if(Math.floor(x)%44===0)R(g,x,36-h-5,3,6.5,'#ece2ca')}
  cypress(g,118,32,13);cypress(g,268,32,12);cypress(g,280,32,9);
  /* the courtyard wall, tiles along its top */
  /* the plaster's random cracks give way to cracks set by hand, high on the walls, where they run to no head (skipCracks3 keeps the rest in place) */
  plaster(g,92,32,228,72,W,r,{patch:5,cracks:0,brick:'#b89468',t:.38});skipCracks3(r,7);
  /* one of its patches fell behind the legs of the table, where each leg crossed its courses of brick. It is painted over with the wall's own
     plaster, which draws nothing from r, and a small patch is set by hand high on the open wall beyond the arbor instead, above the heads of whoever stands
     at the back of the court, so that the room keeps its draws */
  inRect(g,145.5,88,28.5,23,()=>plaster(g,92,32,228,72,W,r,{cracks:0,t:.38}));
  {const rp=rng(1319),v=[(212-92)/228,((46-32)/72-.15)/.8,(8.5-6)/12,(4.5-4)/7];inRect(g,202.5,40.5,21,11.5,()=>plaster(g,92,32,228,72,W,()=>v.length?v.shift():rp(),{patch:1,cracks:0,brick:'#b89468',t:.38}))}for(let i=92;i<320;i+=5.5){R(g,i,27.5,5,5.5,(i|0)%11?TR:TD);R(g,i,27.5,5,.6,TL);R(g,i+4.5,27.5,.6,5.5,TE)}
  ao(g,92,33,228,5,'t',.25,'#3a3060');ao(g,92,92,228,12,'b',.22,'#4a3424');ao(g,92,100,228,4,'b',.2,'#2a2030');
  {const rb=rng(1311);for(const[x,y,n]of[[204,35,3],[226,36,2],[266,34.6,3]])crack3(g,x,y,n,rb)}
  /* the house: a tiled porch on two columns */
  plaster(g,0,0,96,104,'#ecdcb4',r,{patch:3,cracks:0,t:.38});skipCracks3(r,5);{const rb=rng(1313);for(const[x,y,n]of[[9,2,3],[49,1.6,2],[88,3,3]])crack3(g,x,y,n,rb)}
  poly(g,[96,0,100,2,100,102,96,104],'#a8a0b0');ao(g,100,32,10,72,'l',.26,'#2a2440');
  for(const x of[24,58])windowArt(g,x,12,16,15,'#ecdcb4',{bars:3,wood:'#8a6a40'});
  R(g,31,53,38,51,'#d8c8a0');doorArt(g,34,56,32,48,'#8a6a40',r);
  shade(g,[0,48,102,48,102,62,96,66,0,70],SH,.75);
  for(let i=0;i<104;i+=5.5){R(g,i,38,5,8.5,(i|0)%11?TR:TD);R(g,i,38,5,.8,TL);R(g,i+4.5,38,.6,8.5,TE)}R(g,0,46.5,104,1.6,'#6a3a22');const rw=rng(1317);board3(g,0,48,104,1.6,'#7a5632',rw);ao(g,0,49.6,100,6,'t',.3,'#2a2030');
  for(const x of[10,84]){g.fillStyle=lg(g,x,0,x+8,0,['#cfc6b0','#fbf6e6','#efe6cc','#b8b0a4']);g.fillRect(x,50,8,54);R(g,x-1.5,48.6,11,2.4,'#f8f2e0');R(g,x-1.5,102,11,3,'#d6ccb0');R(g,x-1.5,102,11,.6,'#fbf6e6');for(let j=0;j<3;j++)R(g,x+2+j*2,52,.5,49,'rgba(120,110,100,.25)');ao(g,x,50.9,8,3,'t',.28,'#2a2030');shadow3(g,x+4,105.2,6.4,1.2,.3)}
  vessel(g,75,106,6,19,'#a05a34','pithos');
  /* the gate to the street. Across the street stands its colonnade, and the back wall of that colonnade closes the view: no ground runs on
     behind the columns to a horizon of its own, and no level line lies behind them for a column to stand across. */
  R(g,280,40,40,64,'#d6c69e');for(let i=280;i<320;i+=5.5){R(g,i,36,5,5,(i|0)%11?TR:TD);R(g,i,36,5,.6,TL)}poly(g,[280,36,275,39,275,104,280,104],'#a8a0b0');
  arch(g,284,52,32,52,'#c2b28c');g.save();arch(g,286,54,28,50);g.clip();sky(g,320,80,SKY3(['#74aade','#cfe2ee']));R(g,286,64,28,34,'#8f8894');R(g,297.6,80,4.8,16,'#2a2430');R(g,286,60,28,4,'#e2dac4');R(g,286,58.4,28,1.6,'#b8603c');
  for(const cxx of[291,304]){g.fillStyle=lg(g,cxx,0,cxx+5,0,['#d8d0bc','#fbf7ea','#c8c0b0']);g.fillRect(cxx,64,5,34);R(g,cxx-1,96,7,2,'#d8d0bc')}R(g,286,98,28,6,'#cfc8b6');
  ao(g,286,54,28,9,'t',.5,'#2a2440');ao(g,286,54,5,50,'l',.45,'#2a2440');g.restore();
  /* peg rail with the old pack bags, a tether ring. Each bag is worn through in two places, a long rip and a short one that slants, so that
     no tear stands under another as a T; the ring's hole is a small square */
  board3(g,234,43,26,2.2,'#7a5632',rw);R(g,240,44.6,1.6,3,'#5a4226');R(g,252,44.6,1.6,3,'#5a4226');
  for(const[bx,bw,bh,c]of[[238,7,17,'#4a4038'],[249,8,19,'#40362e']]){poly(g,[bx,48,bx+bw,48,bx+bw+.6,48+bh,bx+bw*.6,48+bh+2.4,bx-.4,48+bh],c);R(g,bx,48,bw,1,tint(c,.3));for(let j=2;j<bh;j+=2)for(let i=(j%4)/2;i<bw;i+=2.5)R(g,bx+i,48+j,1,.5,tint(c,.2));
    R(g,bx+2,48+bh*.45,3+r()*2,.8,W);stroke(g,[bx+bw-1.4,48+bh*.66,bx+bw-2.8,48+bh*.82],W,.7);stroke(g,[bx+1,48+bh,bx+.4,48+bh+3.4],c,.6);stroke(g,[bx+bw-2,48+bh+1,bx+bw-1.6,48+bh+4.4],c,.6)}
  shade(g,[236,50,262,50,264,72,238,72],SH,.3);oval(g,232.5,85.5,2,2,'#5a5650');R(g,232,85,1,1,W);
  /* paving */
  pave(g,0,104,320,144,'#d6c49a',r,{vx:160,vy:66,rows:5,step:34,v:.08});ao(g,0,104,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,105,320,39)});
  shade(g,[0,105,100,105,112,111,0,113],SH,.6);shade(g,[275,105,280,105,292,110,282,110],SH,.6);
  /* the vine arbor and the dappled shade under it; its two posts stand at the very ends of its beam */
  shade(g,[98,105,190,105,200,119,104,119],SH,.4);comp(g,'screen',.35,()=>{for(let i=0;i<40;i++){const sx=104+r()*88,sy=106.5+r()*11;oval(g,sx,sy,1.5+r()*3,.5+r()*.8,'#fff0c8')}});shade(g,[100,44,188,44,190,104,98,104],SH,.28);
  shadow3(g,100.5,105.6,4,1.2,.4);shadow3(g,185.5,105.6,4,1.2,.4);board3(g,99,42,3,64,'#6a4e2c',rw,1);board3(g,184,42,3,64,'#6a4e2c',rw,1);board3(g,99,40,88,3,'#7a5c36',rw);ao(g,99,43,88,3,'t',.3,'#1a1420');
  for(let i=0;i<8;i++)board3(g,102+i*11.6,36.6,2.2,3.6,'#5a4226',rw,1);
  stroke(g,[101.5,104,103,84,101.6,66,104,50,111,42],'#5a4630',1.2);stroke(g,[103,70,106,60,115,48],'#5a4630',.8);
  foliage(g,122,39,22,6.5,'#5f8a4a',r,90);foliage(g,160,38,26,7,'#6a9652',r,110);foliage(g,142,43,16,4,'#527c40',r,50);foliage(g,105,56,4,9,'#5f8a4a',r,20);
  for(const[vx,vy]of[[123,47],[150,48],[168,46],[136,49]])for(let k=0;k<7;k++)oval(g,vx+(k%3)-1,vy+Math.floor(k/3)*1.6+(k>5?1.4:0),1,1,k%2?'#6a3e68':'#4f2e52');
  /* bench and table in the shade */
  R(g,114,100,22,7,'rgba(40,30,60,.28)');ao(g,114,99.8,22,3,'t',.3,'#1a1420');shadow3(g,125,107,14,1.4,.4);
  board3(g,114,99,3,8,'#5a4226',rw,1);board3(g,133,99,3,8,'#5a4226',rw,1);board3(g,111.5,96,27,3.4,'#96703e',rw);R(g,111.5,99,27,.8,'#5a4226');
  R(g,147,96,28,11,'rgba(40,30,60,.28)');ao(g,147,95.6,28,4,'t',.32,'#1a1420');shadow3(g,161,107.4,18,1.5,.42);
  board3(g,147,95,3,12.5,'#5a4226',rw,1);board3(g,172,95,3,12.5,'#5a4226',rw,1);board3(g,143.5,91,35,4,'#96703e',rw);R(g,143.5,94.6,35,1,'#5a4226');
  /* the light of the day, from the left: the sky and the hills keep it full; the upper wall of the house, the courtyard wall beyond the arbor,
     the gate's front and the open paving take the sun; under the porch, under the vine and in the corners the shade is cool */
  lightmap(g,320,'#e0dce8',l=>{R(l,0,0,320,30,'#ffffff');l.fillStyle=lg(l,0,30,0,46,['#ffffff','rgba(255,255,255,0)']);l.fillRect(92,30,228,16);
    pool(l,48,22,74,30,'#fff8ee',.6);pool(l,236,66,90,44,'#fff6e8',.6);pool(l,300,70,30,40,'#fff4e2',.4);pool(l,210,124,150,26,'#fff2dc',.62);pool(l,60,128,70,14,'#fff0d8',.4);
    pool(l,150,84,50,26,'#f0e6d0',.22);
    comp(l,'multiply',1,()=>{ao(l,0,48,100,30,'t',.3,'#4a4468');ao(l,0,94,320,12,'b',.12,'#4a4468');ao(l,0,128,320,16,'b',.16,'#4a4468')})});
  pool(g,60,0,260,150,'#fff0c0',.14,'screen');ao(g,0,120,320,24,'b',.12,'#2a2050')},
 fore(g){const r=rng(132);/* a potted bay tree and a bench end, close by */
  vessel(g,14,150,11,16,'#7a4024','bowl',{noShadow:1});foliage(g,14,118,13,16,'#3a5a34',r,160);foliage(g,22,106,8,9,'#456a3c',r,60);
  vessel(g,304,150,10,26,'#6a3420','jar',{noShadow:1});comp(g,'source-atop',.38,()=>R(g,0,0,320,144,'#34305a'))},
 draw(g){
  /* on the table: two wax tablets, and the purse */
  for(const[tx,ty]of[[148,88.4],[158,89]]){R(g,tx,ty,8.6,2.8,'#6a4424');R(g,tx+.8,ty+.5,7,1.6,'#2a2018');R(g,tx+1.4,ty+1,5,.5,'#8a7a5a');R(g,tx,ty,8.6,.5,'#a87a48')}
  if(!G.meet){oval(g,172,91,4,1,'rgba(40,30,60,.35)');g.fillStyle=lg(g,168,0,176,0,['#c8a470','#b08a56','#7a5c34']);g.beginPath();g.ellipse(171.6,88,3.6,3.2,0,0,6.2832);g.fill();R(g,170,83,3.4,2.6,'#8a6a3a');R(g,169.4,85.2,4.6,1,'#5a4226');
    if(F.sealed){R(g,168.6,85.2,6.4,1,'#3a2414');oval(g,172,85.8,1.4,1.3,'#b8402a');oval(g,171.7,85.5,.5,.5,'#e87a5a')}}
  if(!G.meet&&!F.loaded){oval(g,216,109.6,26,2.4,'rgba(40,30,60,.35)');vessel(g,199,108,4.6,12,'#8a4a2a','jar',{noShadow:1});sack(g,212,103,8,13,'#cdbb8c');sack(g,227,104,9,15,'#d8c698');sack(g,219,93.4,6.6,9.6,'#c4b282');
    vessel(g,232.6,110,4.4,11,'#a05a34','jug',{noShadow:1});vessel(g,207,108,5.6,5.6,'#8a6a34','bowl',{noShadow:1});for(let k=0;k<8;k++)oval(g,203.6+(k%4)*2.2,101.6+(k>3?-1:0)+(k%2)*.5,1.2,1,k%2?'#5a2a4a':'#6a3458')}
  if(F.jar&&!F.loaded)oilJar(g,190,112);
  stroke(g,[233,86.4,238,89,244,88],'#8a7a5a',.7);SHARED.beasts.donkey(g,262,110,-1,SHARED.beasts.pose('donkey3',0),F.loaded?2:F.bagsOn?1:0)},
 front(){}};
/* ---------- Antioch: the colonnaded street under Mount Silpius ---------- */
ART.antioch={w:480,fp:1.3,q:12,
 /* the day from the left: short shadows to the right and toward us, as the columns' */
 light:{amb:'#ffffff',sun:[9,4,.4]},
 paint(g){const r=rng(149),SH='#8f95c8',MB='#f4eede';
  sky(g,480,70,SKY3(['#3a78c8','#66a0dc','#9cc4ea','#d4e4ee']));cloud(g,150,10,60,9,r);cloud(g,60,15,36,6,r);cloud(g,330,8,44,6,r);
  /* Mount Silpius, the city wall climbing over its shoulder */
  const mt=x=>{const k=x/480;return 10+36*k*k*(3-2*k)+3*Math.sin(x/21)+2*Math.sin(x/7)};ridge(g,0,480,66,mt,['#8ea27c','#a2b48c','#b6c29c']);
  for(let i=0;i<160;i++){const tx=r()*480,ty=66-r()*mt(tx)*.9;oval(g,tx,ty,1.4+r()*1.6,.8+r()*.6,r()<.5?'#7a906a':'#9cae84')}
  for(let x=170;x<480;x+=.5){const h=mt(x);R(g,x,66-h+3,.5,3.4,'#e6dcc4');if(Math.floor(x)%6<3)R(g,x,66-h+1.8,.5,1.2,'#e6dcc4');if(Math.floor(x)%62===0){R(g,x,66-h-1.6,4,8,'#efe6d0');R(g,x+3,66-h-1.6,1,8,'#b8b4bc')}}
  comp(g,'screen',.2,()=>R(g,0,20,480,46,'#c8d8ee'));
  /* the house of the congregation, and the gate to its courtyard */
  /* the plaster's random cracks give way to cracks set by hand, high on the walls, where they run to no head (skipCracks3 keeps the rest in place) */
  house(g,0,20,112,84,'#ecdcb4',r,{side:6,patch:4,cracks:0,beams:0,t:.38});skipCracks3(r,6);{const rb=rng(1491);for(const[x,y,n]of[[8,23,3],[60,22.6,3],[100,24,2]])crack3(g,x,y,n,rb)}for(let i=0;i<116;i+=5.5){R(g,i,15,5,5.5,(i|0)%11?TR:TD);R(g,i,15,5,.6,TL);R(g,i+4.5,15,.6,5.5,TE)}
  for(const x of[72,90])windowArt(g,x,32,12,14,'#ecdcb4',{bars:2,wood:'#8a6a40'});
  R(g,14,42,48,62,'#d6c69e');R(g,14,42,48,2,'#f4e8c8');arch(g,20,52,36,52,'#c2b28c');g.save();arch(g,22,54,32,50);g.clip();R(g,22,54,32,50,'#e6d6ac');R(g,22,88,32,16,'#d6c49a');
  const rw=rng(1497);board3(g,28,66,2,24,'#6a4e2c',rw,1);board3(g,46,66,2,24,'#6a4e2c',rw,1);R(g,26,65,24,2,'#7a5c36');foliage(g,38,63,13,6,'#5f8a4a',r,50);ao(g,22,54,32,10,'t',.55,'#2a2440');ao(g,22,54,6,50,'l',.5,'#2a2440');g.restore();
  /* the colonnade: tiled roof, marble architrave, shops in its shade, a column every few paces */
  for(let i=112;i<430;i+=5.5){R(g,i,29.5,5,7.5,(i|0)%11?TR:TD);R(g,i,29.5,5,.7,TL);R(g,i+4.5,29.5,.6,7.5,TE)}
  g.fillStyle=lg(g,0,37,0,43.5,['#fdfaf0','#ece4d0','#c8c0ac']);g.fillRect(112,37,318,6.5);for(let i=114;i<430;i+=4)R(g,i,40.4,2,1.6,'#d2cab6');
  plaster(g,112,43.5,318,60.5,'#b9ae96',r,{patch:4,cracks:0,brick:'#8a7a62',t:.32});skipCracks3(r,5);{const rb=rng(1493);for(const[x,y,n]of[[240,46,2],[296,45.6,3],[420,46,2]])crack3(g,x,y,n,rb,.8)}
  comp(g,'multiply',.75,()=>R(g,112,43.5,318,60.5,'#a8a8cc'));ao(g,112,43.5,318,9,'t',.32,'#2a2440');ao(g,112,96,318,8,'b',.26,'#2a2440');
  for(let x=131;x<420;x+=60){R(g,x-2.5,55.5,25,48.5,'#8a8296');arch(g,x,58,20,46,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');for(let i=0;i<3;i++)vessel(g,x+5+i*5,104,2,5+i,'#6a4636','jar',{noShadow:1});ao(g,x,58,20,14,'t',.6);ao(g,x,58,4,46,'l',.3)}
  for(let x=116;x<436;x+=30){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cfc7b4',MB,'#fffdf4','#ded6c2','#aea8a4']);g.fillRect(x,45.5,7,56);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,47,.5,53,'rgba(120,112,104,.28)');R(g,x-1.2,43.5,9.4,2.6,MB);R(g,x-1.2,45.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#e2dac6');R(g,x-1.2,100.4,9.4,.6,'#fffdf4');ao(g,x,46.1,7,3,'t',.3,'#2a2440')}
  /* the south gate */
  ashlar(g,430,20,50,84,'#e4d6b0',r,{bw:13,bh:6.4,v:.09});for(let i=430;i<480;i+=8){R(g,i,15.5,5,4.5,'#e4d6b0');R(g,i,15.5,5,.5,'#f8eccc')}R(g,430,19.6,50,1,'#a8987a');poly(g,[430,15.5,424,19,424,104,430,104],'#a8a0b0');
  arch(g,438,54,36,50,'#c2b28c');gateView(g,440,56,32,48,{...GATE3,hz:66,sky:[70,SKY3(['#3a78c8','#66a0dc','#9cc4ea','#d4e4ee'])]});ao(g,440,56,4,48,'l',.3,'#2a2440');for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,456+Math.cos(a)*18-.3,72+Math.sin(a)*18-1,.6,2.6,'#a8987a')}
  /* paving of pale stone */
  pave(g,0,103,480,144,'#e6dfce',r,{vx:240,vy:62,rows:5,step:36,v:.07,joint:'#a8a092'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,112,104,124,111,0,113],SH,.6);shade(g,[112,104,430,104,436,108,118,108],SH,.4);shade(g,[424,104,430,104,444,110,432,110],SH,.6);
  /* Xanthe's thread stall */
  /* Xanthe's stall and Theron's each hang a plain back cloth between their posts, so that no column of the colonnade stands across a rail,
     a shelf or a table of theirs; its folds run one way only, up and down */
  const backCloth=(x0,x1,y0,y1,c)=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,-.08)]);g.fillRect(x0,y0,x1-x0,y1-y0);
    inRect(g,x0,y0,x1-x0,y1-y0,()=>{tex(g,'vert',.22,x0,y0,x1-x0,y1-y0,'overlay',.5);for(let i=x0+2.5;i<x1;i+=5.5){R(g,i,y0,1.6,y1-y0,rgba(tint(c,-.3),.35));R(g,i+1.6,y0,.5,y1-y0,rgba(tint(c,.2),.3))}
      ao(g,x0,y0,x1-x0,6,'t',.4,'#1a1420');ao(g,x0,y1-8,x1-x0,8,'b',.3,'#1a1420')})};
  shade(g,[150,104,230,104,238,112,158,112],SH,.55);backCloth(154.4,226,51,104,earth3('#857560',.1));
  board3(g,152,50,2.4,56,'#6a4e2c',rw,1);board3(g,226,50,2.4,56,'#6a4e2c',rw,1);board3(g,150,52.4,80,2,'#7a5c36',rw);awning(g,149,44,82,8,'#e2d2a8',earth3('#b06a4a',.14),8);
  [[160,'#e6dcc0'],[169,'#8a6a40'],[178,'#3a302a'],[187,'#e6dcc0'],[197,earth3('#a8503a',.18)],[207,earth3('#c9a23a',.2)],[217,earth3('#5a7a5a',.12)]].forEach(([x,c])=>{R(g,x+.2,54.4,.6,3,'#5a4226');
    g.fillStyle=lg(g,x-3,0,x+4,0,[tint(c,-.3),c,tint(c,.25),tint(c,-.2)]);g.beginPath();g.ellipse(x+.5,63.5,3.4,6.4,0,0,6.2832);g.fill();for(let j=0;j<5;j++)stroke(g,[x-2.2+j*1.2,58.4,x-1.8+j*1.1,68.6],tint(c,-.35),.4)});
  R(g,160,94,58,11,'rgba(40,30,60,.28)');ao(g,160,92.6,58,4,'t',.32,'#1a1420');shadow3(g,189,105.6,30,1.5,.4);
  board3(g,160.6,94,3,11.5,'#6a4e2c',rw,1);board3(g,214,94,3,11.5,'#6a4e2c',rw,1);board3(g,157.5,88,63,4.4,'#96703e',rw);R(g,157.5,92,63,1.2,'#5a4226');shadow3(g,153.2,105.8,3.4,1.1,.4);shadow3(g,227.2,105.8,3.4,1.1,.4);
  ['#e6dcc0','#d8c9a0','#8a6a40','#e6dcc0','#3a302a'].forEach((c,i)=>{const sx=164+i*7;g.fillStyle=lg(g,sx,0,sx+4,0,[tint(c,.2),c,tint(c,-.3)]);g.fillRect(sx,83,4,5);R(g,sx-.8,82.2,5.6,1,'#8a5a2c');R(g,sx-.8,87.2,5.6,1,'#6a4020')});
  vessel(g,208.5,88,8,5,'#8a6a34','bowl',{noShadow:1});for(let k=0;k<9;k++)oval(g,203+(k%5)*2.6,82+(k>4?-1.6:0),2,1.5,k%2?'#f4ecd6':'#e0d6bc');
  /* the fountain. A column of the colonnade stands behind it: its cap is no wider than its shaft, so that the column does not stand on a
     crossbar */
  shadow3(g,268,105.6,19,2,.42);g.fillStyle=lg(g,260,0,274,0,['#c8c0ac','#f0eada','#b4aca0']);g.fillRect(260,62,14,32);R(g,259.4,59.6,15.2,3,MB);R(g,259.4,62.4,15.2,.6,'#a8a094');
  R(g,264.6,75,5,4,'#8a8474');oval(g,267,77,1.4,1.4,'#3a3630');
  g.fillStyle=lg(g,250,0,284,0,['#bcb4a0','#eee8d8','#d6cebc','#9c968c']);g.fillRect(250,92,34,13);R(g,249,91,36,2.2,MB);R(g,249,93,36,.6,'#a8a094');R(g,252,93.6,30,1.8,'#5f9cc0');R(g,250,103.4,34,1.6,'#a8a094');
  /* Theron's pottery stall */
  shade(g,[310,104,398,104,406,112,318,112],SH,.55);backCloth(314.6,393,50,92,earth3('#b8a684',.1));
  board3(g,312,48,2.6,58,'#6a4e2c',rw,1);board3(g,393,48,2.6,58,'#6a4e2c',rw,1);awning(g,309,42,90,9,earth3('#3f6a8a',.22),'#ece4d0',8);
  board3(g,317,66,74,2.2,'#7a5c36',rw);ao(g,317,68.2,74,3,'t',.3,'#1a1420');['#a05a34','#8a4a2a','#b86a3c','#7a3d24','#a05a34','#c07a48'].forEach((c,i)=>vessel(g,323+i*12,66,3.6+(i%2)*.6,10-(i%3),c,['jar','amph','jug'][i%3],{noShadow:1}));
  /* the counter's front: upright planks, each with its own tone and a grain that runs along it */
  for(let i=0;i<78;i+=7){const ww=Math.min(7,78-i),c=tint('#7a5c36',(rw()-.5)*.2);plank3(g,316+i,91,ww,14,c,rw,1);R(g,316+i,91,.5,14,tint(c,.18));R(g,316+i+ww-.5,91,.5,14,tint(c,-.4))}
  ao(g,316,91,78,4,'t',.4,'#1a1420');shadow3(g,355,105.6,42,1.5,.4);board3(g,314,88,82,3.6,'#96703e',rw);R(g,314,91.2,82,1,'#4a3620');
  vessel(g,324,88,4,10,'#b86a3c','jar',{noShadow:1});vessel(g,337,88,3.6,9,'#8a4a2a','jug',{noShadow:1});for(let i=0;i<3;i++)vessel(g,356.5,88-i*1.8,6-i*.6,2.6,i%2?'#a05a34':'#c07a48','bowl',{noShadow:1});
  vessel(g,373,88,4,9,'#a05a34','amph',{noShadow:1});vessel(g,384,88,3.6,10,'#7a3d24','jar',{noShadow:1});vessel(g,404.5,106,6,19,'#a05a34','pithos');vessel(g,417,106,4.6,13,'#8a4a2a','jar');
  /* the light of the day, from the left: the sky and the mountain keep it full; the house of the congregation, the column fronts, the
     fountain, the gate tower and the open street take the sun; the colonnade's back wall, the stalls' insides and the near paving lie in
     the day's own cool shade */
  lightmap(g,480,'#e0dce8',l=>{R(l,0,0,480,40,'#ffffff');l.fillStyle=lg(l,0,40,0,64,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,40,480,24);
    pool(l,56,52,80,46,'#fff8ee',.6);pool(l,270,64,190,30,'#fff6e8',.42);pool(l,268,84,30,26,'#fff4e4',.4);pool(l,455,60,40,50,'#fff4e2',.5);
    pool(l,240,122,280,26,'#fff2dc',.62);pool(l,190,80,40,22,'#f0dcc0',.18);pool(l,354,80,44,22,'#f0dcc0',.18);
    comp(l,'multiply',1,()=>{ao(l,112,43,318,22,'t',.22,'#4a4468');ao(l,0,94,480,12,'b',.12,'#4a4468');ao(l,0,128,480,16,'b',.16,'#4a4468')})});
  pool(g,80,0,300,160,'#fff0c0',.14,'screen');ao(g,340,0,140,144,'r',.08,'#2a2050')},
 fore(g){const r=rng(150);/* passers-by have left their loads at the street's edge: baskets, a jar, and the base of the next column */
  g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  for(const[bx,bw,bh]of[[52,13,11],[494,15,13]]){vessel(g,bx,148,bw,bh,'#6a5230','bowl',{noShadow:1});for(let i=0;i<12;i++)oval(g,bx-bw+3+r()*(bw*2-6),148-bh-r()*2.4,1.8,1.4,r()<.5?'#a8503a':'#c9a23a')}
  vessel(g,518,152,10,30,'#5a2e1e','amph',{noShadow:1});comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){if(!F.jar)depth(113,()=>oilJar(g,426,113));const f=t/90;R(g,266.2,79,1.8,14,'#a8d8ec');for(let i=0;i<4;i++)R(g,266.2,79+((f+i*3.6)%14),1.8,1.4,'#f0fafe');
  for(let i=0;i<4;i++){const k=((t/400+i*.25)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(267.1,94.5,1.5+k*9,.3+k*.7,0,0,6.2832);g.stroke()}},
 front(){}};
/* ---------- The road south (ending) ---------- */
ART.road={w:320,q:12,
 /* the sun high on the left: the trees and the milestone throw short shadows to the right and a little toward us, as in the chapter's rooms */
 light:{amb:'#ffffff',sun:[9,4,.4]},
 paint(g){const r=rng(167);
  sky(g,320,96,SKY3(['#3f7ecc','#6ea6de','#a2c8ea','#dbe6ea','#dbe6ea']));cloud(g,222,13,62,9,r);cloud(g,146,25,40,6,r);cloud(g,60,10,30,5,r);
  ridge(g,0,320,80,x=>20+8*Math.sin(x/41+2)+4*Math.sin(x/13),['#9cacca','#b4c0d4']);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,44,0,82,['rgba(208,220,238,0)','rgba(208,220,238,1)']);g.fillRect(0,44,320,38)});
  /* Antioch behind us, under its mountain */
  ridge(g,0,170,80,x=>Math.max(0,36-x*x/760+2*Math.sin(x/9)),['#8ea27c','#a6b68e']);for(let x=0;x<118;x+=.5){const h=36-x*x/760+2*Math.sin(x/9);R(g,x,80-h+3,.5,2.6,'#e6dcc4');if(Math.floor(x)%5<2)R(g,x,80-h+2,.5,1,'#e6dcc4')}
  /* the wall ends at its gate tower, so that no tower rises from the middle of a wall (the wall's random draws are all still taken) */
  clipTo(g,()=>{g.beginPath();g.rect(0,40,100,40)},()=>ashlar(g,0,62,116,18,'#e2d6b8',r,{bw:9,bh:4,v:.07,t:.25}));for(let i=0;i<96;i+=7)R(g,i,59,4,3.4,'#e2d6b8');
  R(g,86,52,14,28,'#ece2c6');for(let i=86;i<100;i+=5)R(g,i,49,3,3.4,'#ece2c6');R(g,97,52,3,28,'#bcb8c0');arch(g,89.6,66,6.8,14,'#4a4050');
  for(const[hx,hy,hw,hh]of[[14,54,16,8],[40,50,20,12],[64,55,12,7]]){R(g,hx,hy,hw,hh,'#ece2c6');R(g,hx,hy-2,hw,2.2,'#b8603c');R(g,hx+hw-3,hy,3,hh,'#bcb8c0')}
  /* fields and olive groves */
  ridge(g,0,320,110,x=>28+6*Math.sin(x/50+1)+3*Math.sin(x/17+2),['#a8be84','#96b074']);ridge(g,0,320,110,x=>13+4*Math.sin(x/33)+2*Math.sin(x/11),['#8eaa6c','#80a060']);
  for(let i=0;i<8;i++){const fx=20+i*38+r()*10;poly(g,[fx,92,fx+22,90,fx+26,98,fx+2,100],i%2?'rgba(200,190,110,.35)':'rgba(110,150,80,.35)')}
  for(const[x,y]of[[150,88],[176,93],[204,86],[262,90],[300,95],[30,92],[70,96],[232,99]]){shadow3(g,x+2,y+3.6,5.4,1.2,.36,'#2a3048');R(g,x-.4,y+1,1.2,3,'#5a4630');foliage(g,x,y-.6,5.4,3.4,'#6f8a58',r,24)}
  cypress(g,238,98,11);cypress(g,128,100,10);cypress(g,134,101,7);
  /* the road, and the verge nearest us */
  g.fillStyle=lg(g,0,106,0,127,['#d2c298','#e6d8b0','#dccca2']);g.fillRect(0,106,320,21);
  /* the road's dust: a low mottle and the grain of the wheels and feet that run along it, never across */
  tex(g,'mott',.22,0,106,320,21,'overlay',1);tex(g,'wood',.16,0,106,320,21,'overlay',.5);R(g,0,106,320,.8,'#a89a74');
  for(let i=0;i<60;i++){const sx=r()*320,sy=108+r()*17;oval(g,sx,sy,1+r()*1.6,.5+r()*.4,r()<.5?'#bcae86':'#f0e4c0')}
  for(let i=0;i<2;i++)stroke(g,[0,113+i*7,80,112.6+i*7,200,113.6+i*7,320,113+i*7],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,126,0,144,['#86a064','#6c8a50','#56743e']);g.fillRect(0,126,320,18);tex(g,'mott',.3,0,126,320,18,'overlay',1);tex(g,'vert',.14,0,126,320,18,'overlay',.5);
  for(let i=0;i<220;i++){const sx=r()*320,sy=127+r()*17;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#9ab878':'#4f6c3a',.5)}
  for(let i=0;i<22;i++){const sx=r()*320,sy=130+r()*12;oval(g,sx,sy,.9,.9,r()<.5?'#e8d070':'#e0e0f0')}
  /* a milestone */
  shadow3(g,275,108.6,6,1.2,.38,'#2a2050');g.fillStyle=lg(g,270,0,276,0,['#b8b0a0','#eee8dc','#a8a094']);g.fillRect(270,95.5,6,13);oval(g,273,95.6,3,1.4,'#eee8dc');R(g,271.6,99,2.8,.6,'#8a8474');R(g,271.6,101,2.8,.6,'#8a8474');
  /* the light of the day: the sky and the far hills keep it full; the fields and the road lie in the sun, two clouds throw their soft
     shade across the far fields, and the near verge is a little cooler */
  lightmap(g,320,'#e4e0ea',l=>{R(l,0,0,320,80,'#ffffff');l.fillStyle=lg(l,0,80,0,96,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,80,320,16);
    pool(l,160,100,200,20,'#fff8ec',.7);pool(l,170,116,190,14,'#fff4e0',.7);pool(l,60,90,70,12,'#fff6e8',.4);
    comp(l,'multiply',1,()=>{pool(l,226,94,40,5,'#b8b8cc',.5,'source-over');pool(l,92,98,30,4,'#c0c0d2',.4,'source-over');ao(l,0,130,320,14,'b',.16,'#4a4468')})});
  pool(g,60,0,300,150,'#fff0c0',.14,'screen')},
 fore(g){const r=rng(168);foliage(g,14,138,22,9,'#3f5a34',r,120);foliage(g,304,140,20,8,'#3a5430',r,100);for(let i=0;i<30;i++){const sx=r()*320;stroke(g,[sx,144,sx+(r()-.5)*4,136-r()*5],'#34502c',.8)}},
 draw(){},front(){}};
/* The three cross the picture in seventeen seconds (the tween that moves G.trek): their steps follow the road under them (walkFr, and beastFr for the donkey), each at his own stride. */
function roadScene(g,t){backdrop(g,'road');SHARED.birds.draw(g,t,'road',BIRDS_ROAD);const x=-50+420*((G.trek||{}).k||0),v=420/17;
  man(g,x+46,121,'barnabas',1,walkFr(LOOK.barnabas,x+50,v));SHARED.beasts.donkey(g,x+8,120,1,SHARED.beasts.frame.donkey(x+50,v),2);man(g,x-30,122,'paul',1,walkFr(LOOK.paul,x+62,v));g.drawImage(fg('road'),0,0,320,VH)}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#58483a',beard:'#58483a',grey:'#8a8076',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  kleon:{skin:'#a87048',wrap:'#c8a050',beard:'#3a2a1a',tunic:'#7a5a3e',belt:'#2e2016',trim:'#4a3424',brow:'#2a1a12',ph:1100},
  agabus:{skin:'#b88458',hair:'#8e8e8e',beard:'#a6a6a6',longBeard:1,brow:'#6e6e6e',tunic:'#a8b0a0',cloak:'#5a4634',long:1,belt:'#4a3a24',ph:2300},
  lucius:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',trim:'#8a6a1a',brow:'#120c0a',ph:3100},
  xanthe:{skin:'#c89a70',veil:'#5a7a5a',tunic:'#a86a4a',long:1,belt:'#d8c9a0',slim:1,longSleeve:1,trim:'#d8c9a0',brow:'#3a2414',ph:400},
  theron:{skin:'#c49268',hair:'#5a4630',tunic:'#e8e0cc',belt:'#8a4a2a',trim:'#3f6a8a',ph:2700}});
const BN=actor('barnabas','Barnabas','#f0b070',128),KL=actor('kleon','Kleon','#e0b470',112),AG=actor('agabus','Agabus','#dfe4d0',104),LU=actor('lucius','Lucius','#f2cc5a',120),
  XA=actor('xanthe','Xanthe','#b4e0a4',240),TN=actor('theron','Theron','#a4d0ee',165);
Object.assign(ICON,{
  loops(g){for(let k=0;k<3;k++){const x=4.6+k*5.6,y=4.6+k*2;g.lineWidth=2.2;g.strokeStyle='#6a4424';g.beginPath();g.ellipse(x+2.4,y+5.6,2.2,5.2,0,0,6.2832);g.stroke();g.lineWidth=1.2;g.strokeStyle='#b07a48';g.stroke();
      stroke(g,[x+.6,y+2.6,x+.6,y+8.4],'#deb07a',.5);R(g,x+1,y+10.2,2.8,1.4,'#7a4e28')}},
  tent(g){IH.roll(g,'#4a3e36',8.4,8.6);for(const x of[8,15]){R(g,x,7.6,1.8,10.2,'#b89a5a');R(g,x,7.6,.6,10.2,'#dcc080')}stroke(g,[8.8,7.6,7.2,4.6],'#b89a5a',.8);stroke(g,[15.8,7.6,17.6,5],'#b89a5a',.8)},
  panels(g){IH.square(g,'#403630',4,4.6,13,9.4);R(g,4,4.6,13,.8,'#7a6c5e');R(g,4,4.6,.7,9.4,'#6e6054');IH.square(g,'#52463e',8,10.6,13,9.4);R(g,8,10.6,13,.8,'#8c7e6e');R(g,8,10.6,.7,9.4,'#7c6e60')},
  spool(g){g.fillStyle=lg(g,6.6,0,17.4,0,['#c4b894','#f4ecd6','#e6dcc0','#a89c7a']);g.fillRect(6.6,6.2,10.8,12);for(let i=0;i<7;i++)R(g,6.6,7+i*1.7,10.8,.6,'rgba(120,108,76,.45)');
    for(const y of[4,17.8]){g.fillStyle=lg(g,4.6,0,19.4,0,['#6a4020','#b07a44','#8a5a2c','#4a2c14']);g.fillRect(4.6,y,14.8,2.4);R(g,4.6,y,14.8,.6,'#c8945a')}stroke(g,[17.4,12.6,19.6,16,21,21.4],'#efe6cc',.8)},
  bags(g){R(g,3.6,6.4,16.8,4,'#3e332a');R(g,3.6,6.4,16.8,.7,'#5a4e42');for(const x of[2.8,13]){const p=[x,10,x+8.2,10,x+8.6,19.4,x+6.4,21.4,x+1.8,21.4,x-.4,19.4];clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,x,0,x+9,0,['#3a2e26','#221a16','#120d0b']);g.fillRect(x-1,10,10,12);
        for(let j=0;j<12;j+=1.6)for(let i=(j*2%3);i<10;i+=3)R(g,x-1+i,10+j,1,.5,'#4a3e34')});R(g,x,10,8.2,.7,'#5a4e42')}
    R(g,6,6.4,1.4,5.6,'#9a7448');R(g,16.6,6.4,1.4,5.6,'#9a7448')},
  wages(g){IH.bag(g,'#b08a56',11.6,15,6.2,5.4);R(g,10.6,5.6,2,2.8,'#c9a14a');for(const[x,y,c]of[[19,20.4,'#d8d8e4'],[5,20.8,'#c4c4d2'],[20.4,17.6,'#e4e4f0']]){oval(g,x,y,2.6,1.2,'#7a7a8a');oval(g,x,y-.5,2.6,1.2,c);stroke(g,[x-1.4,y-.7,x+.8,y-1],'#ffffff',.4)}}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#462e16',3);stroke(g,[4.6,20.6,19,3.6],'#8c683c',2);stroke(g,[4.1,20.1,18.5,3.1],'#e2c288',.9);
  R(g,17.2,2.8,3,3,'#c49a5c');R(g,17.4,2.8,1.8,1.2,'#f2d8a2');R(g,3.3,19.7,2.4,2.4,'#9c968c');R(g,3.5,19.7,1.2,1,'#d4cec4')};
Object.assign(ITEMS,{
  staff:{name:'barnabass_staff',look:'barnabass_walking_staff_stout_olive_wood',
    by:{barnabas:'my_walking_staff'}},
  loops:{name:'leather_loops',look:'loops_of_thick_oxhide'},
  tent:{name:'finished_tent',look:'kleons_tent_rolled_and_tied'},
  bolt:{name:'goat_hair_cloth',icon:'cloth',look:'last_of_the_goat_hair_cloth'},
  panels:{name:'cloth_panels',look:'goat_hair_cloth_cut_into_panels'},
  spool:{name:'xanthes_thread',look:'waxed_linen_thread_doubled_and_strong'},
  bags:{name:'pack_bags',look:'two_deep_bags_of_goat_hair'},
  wages:{name:'my_savings',look:'little_silver_what_my_awl'}});
/* how Barnabas describes what he carries: everything but his staff belongs to Saul's trade or Saul's purse */
const BY3={awl:'sauls_awl',thread:'waxed_linen_thread',
  knife:'sauls_knife',tablets:'sauls_wax_tablets_people',
  loops:'leather_loops_for_the_pegs',tent:'kleons_tent_finished',
  bolt:'goat_hair_cloth_from_cilicia',panels:'cloth_panels_cut_for_bags',
  spool:'xanthes_thread_said',bags:'new_pack_bags',
  wages:'sauls_savings'},
  /* the tools are shared with other chapters, which word them in their own way: so these are set again whenever this chapter begins */
  by3=()=>{for(const id in BY3)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY3[id]};
async function sewBags(){if(!has('spool'))return say(P,'i_have_the_cloth_and_the_awl');
  SFX.sew();await say(P,'two_deep_pockets_and_a_broad');SFX.sew();await wait(800);
  delItem('panels');delItem('spool');addItem('bags',1);F.bags=1;SFX.good();
  await say(P,'goat_hair_cloth_swells')}
Object.assign(COMBO,{
  'bolt+knife':async()=>{SFX.cut();await say(P,'two_broad_panels_two_narrow');delItem('bolt');addItem('panels');F.cutBolt=1},
  'awl+panels':sewBags,'panels+spool':sewBags,
  'awl+bolt':()=>say(P,'cloth_must_be_cut_to_shape'),'bolt+spool':()=>say(P,'cloth_must_be_cut_to_shape'),
  'awl+spool':()=>say(P,'threaded_and_ready'),
  'knife+panels':()=>say(P,'they_are_cut_true_already'),'knife+spool':()=>say(P,'i_will_cut_the_thread_as_i'),
  'awl+bags':()=>say(P,'every_seam_is_doubled'),'bags+knife':()=>say(P,'after_all_that_work'),
  'awl+loops':()=>say(P,'loops_belong_on_the_hem'),'loops+thread':()=>say(P,'loops_belong_on_the_hem'),
  'knife+loops':()=>say(P,'they_are_the_right_length_already'),'knife+tent':()=>say(P,'after_a_week_of_sewing'),
  'awl+tent':()=>say(P,'it_needs_an_owner_now_not'),'tent+thread':()=>say(P,'it_needs_an_owner_now_not')});
function setup3(){BN.hs=BN3;P.hs=PAUL3;P.called='Saul';Object.assign(BN,BARN3);by3();place(BN,'tarsus',112,124,1);place(KL,'tarsus',224,119,-1);place(AG,'court',116,115,1);place(LU,'court',187,113,-1);
  place(XA,'antioch',190,116,1);place(TN,'antioch',354,116,-1);G.meet=0;G.trek=null;G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,barnabas:['staff']};drawInv()}
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to Saul */
const BARN3={noCraft:'that_is_sauls_trade_not_mine',
  def:{look:'saul_would_know_more_about_that_than_i',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_sauls_trade_not_mine_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
/* Saul, as Barnabas sees him and talks to him */
const PAUL3={name:'Saul',actor:P,as:{barnabas:{
  look:()=>say(BN,G.room==='tarsus'?'saul_give':'saul_a'),
  talk:()=>talkTree([
    {q:'what_can_i_do_to_help',a:()=>say(P,G.room==='tarsus'?(!F.seam?'take_the_far_edge_of_the_tent':F.sold?'walk_with_me_to_antioch':'keep_kleon_patient')
      :!F.jar?'come_to_therons_stall_with_me':'pray_for_the_road_brother')},
    {q:'you_work_too_hard_saul',once:1,a:()=>say(P,'do_you_barnabas_1_corinthians_9_6')},
    {q:'i_will_leave_you_to_it',bye:1}])}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'kleon',q:'kleons_caravan_leaves_at_noon',if:()=>F.metKleon&&!F.sold},
  {id:'famine',q:'agabus_foretold_a_great_famine',if:()=>G.room!=='tarsus'},
  {id:'thread',q:'i_have_no_thread_to_sew',if:()=>G.room!=='tarsus'&&!F.gotSpool}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const ant=()=>G.room!=='tarsus';
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>ant()?'good_man_filled_with_faith':'he_came_all_the_way_to_tarsus'},
    {name:'Kleon',note:'caravan_master_bound_over_the_mountains',if:()=>F.metKleon&&!ant()},
    {name:'Agabus',note:'prophet_from_jerusalem',if:ant},
    {name:'Lucius',note:'lucius_of_cyrene_a_teacher_here',if:ant},
    {name:'Theron',note:'potter_in_the_colonnaded_street',if:ant},
    {name:'Xanthe',note:'widow_who_spins_thread_for_her_living',if:ant}],
  tasks:[
    {t:'close_the_last_seam_of_kleons_tent',if:()=>!ant()&&!F.seam},
    {t:'give_the_hem_something',if:()=>!ant()&&!F.loopsOn},
    {t:'hand_kleon_his_tent_as_i_promised',if:()=>!ant()&&!F.sold},
    {t:'go_with_barnabas_to_antioch',if:()=>!ant()&&F.sold},
    {t:'make_new_pack_bags_for_the_relief',if:()=>ant()&&!F.bags},
    {t:'find_strong_thread_to_sew_them_with',if:()=>ant()&&!F.gotSpool&&!F.bags},
    {t:'put_the_bags_on_the_donkey',if:()=>ant()&&!F.bagsOn},
    {t:'bring_therons_oil_from_his_stall',if:()=>ant()&&!F.jar},
    {t:'see_the_gift_counted_and_sealed',if:()=>ant()&&!F.sealed}],
  scripture:[
    {ref:'psalm_15_4',gist:'what_he_has_promised_he'},
    {ref:'ecclesiastes_4_9_10',gist:'two_do_better_than_one'},
    {ref:'proverbs_3_27',gist:'when_you_are_able_to_help'},
    {ref:'deuteronomy_15_11',gist:'be_openhanded_and_generous'}]};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
const tentNeeds=()=>!F.seam?'last_seam_still_gapes_open':!F.loopsOn?'seam_is_closed':'';
/* The seam takes two men: Barnabas holds the far edge taut (played as Barnabas: use the tent), then Saul sews it. */
const holding=()=>F.held&&BN.room==='tarsus'&&Math.abs(BN.x-146)<4;
async function sewSeam(){
  if(!holding()){F.held=0;await say(P,'cloth_pulls_crooked_unless');
    if(BN.room==='tarsus')await say(BN,'show_me_where_to_stand_saul');return}
  await say(P,'hold_it_just_so_barnabas',{to:BN});SFX.sew();await wait(800);SFX.sew();
  await say(P,'flat_seam_doubled_over_so_that_no');F.seam=1;F.held=0;SFX.good();
  await say(BN,'closed_from_top_to_bottom');await walk(BN,112,124);BN.dir=1}
async function hold(){if(F.seam)return say(BN,'the_seam_is_closed');
  if(holding())return say(BN,'i_have_it');
  await walk(BN,146,113);BN.dir=1;F.held=1;await say(BN,'like_this_i');
  if(P.room==='tarsus')await say(P,'just_so_now')}
async function sewLoops(){SFX.sew();await say(P,'one_loop_at_every_peg_and_each');SFX.sew();await wait(700);
  delItem('loops');F.loopsOn=1;SFX.good();await say(P,'leather_will_hold_where_cloth_tore')}
async function leave3(){
  if(PC()!==P){if(!F.sold)return say(BN,'not_without_saul');playAs(P)}
  if(!F.sold){await say(P,'road_to_antioch');return say(P,'not_with_a_promise_left',TH)}
  await say(BN,'your_word_is_kept_saul');
  await say(P,'i_will');
  await say(P,'tarsus_is_not_a_city_anyone_overlooks');
  walk(BN,276,116);await walk(P,292,112);await fade(1,700);const o={dur:7500};
  await narr('barnabas_found_him_acts_11_25_26',o);
  await narr('sizable_crowd_was_acts_11_26',o);
  await narr('antioch_was_the_first_acts_11_26',o);
  await narr('about_that_time_acts_11_27_28',o);
  G.meet=1;enterRoom('court',112,126,1);dealInv('court');drawInv();codeBtn();
  place(BN,'court',86,122,1);place(LU,'court',140,118,1);place(XA,'court',62,130,1);place(TN,'court',40,124,1);place(AG,'court',204,118,-1);await fade(0,700);
  await narr('antioch_said',{dur:4200});
  await say(AG,'brothers_and_sisters',{to:null});
  await say(AG,'great_famine_is_coming',{to:null});
  await say(TN,'on_the_whole_earth',{to:AG});
  await say(LU,'on_judea_hardest_of_all',{to:TN});
  await say(TN,'let_us_not_wait_until_they');
  await say(LU,'will_my_household');
  await say(BN,'when_it_is_gathered',{to:LU});
  await say(LU,'jerusalem_sent_you_to_us_barnabas');
  await say(P,'gladly_said',{to:LU});
  await narr('disciples_resolved_that_relief_acts_11_29',o);
  await fade(1,600);G.meet=0;place(XA,'antioch',190,116,1);place(TN,'antioch',354,116,-1);place(LU,'court',187,113,-1);place(AG,'court',116,115,1);
  place(BN,'court',92,124,1);place(P,'court',146,128,-1);
  await narr('in_the_days_that_followed',{dur:3200});await fade(0,600);
  await say(BN,'look_at_it_saul');
  await say(BN,'it_has_weeks_of_road_ahead');
  await say(LU,'nothing_leaves_this_courtyard_uncounted');
  await say(P,'there_is_work_here_for_a_tentmaker');
  await say(P,'not_an_arms_length_of_thread',TH)}
ROOMS.tarsus={space:0.8,walk:[16,304,110,138],
  /* Kleon's mule, its hooves at the back edge of the strip */
  block:[[232,107,28,3]],
  mood:'calm',amb:{birds:.5,crowd:.25,wind:.2,hammer:.35},hs:[
  {name:'taurus_mountains',x:118,y:22,w:150,h:26,wx:190,look:['taurus_mountains_with_snow','road_through_the_cilician']},
  {name:'my_workshop',x:12,y:52,w:94,h:34,wx:58,wy:113,look:'my_stall_and_workshop'},
  {name:'awning',x:4,y:40,w:112,h:11,wx:58,wy:113,look:'goat_hair_cloth_of_my_own_sewing',pickup:'it_can_stay'},
  {name:'workbench',x:14,y:86,w:80,h:19,wx:58,wy:113,look:'my_workbench'},
  {name:'leather_hide',x:20,y:84,w:28,h:14,wx:36,wy:113,vis:()=>!F.gotLoops,look:'piece_of_oxhide_thick_and_well_tanned',
    pickup:'i_do_not_need_the_whole_hide',use:'it_would_take_a_blade_to_make',
    useWith:async it=>{if(it==='awl'||it==='thread')return say(P,'it_must_be_cut_before_anything');if(it!=='knife')return false;
      SFX.cut();F.gotLoops=1;addItem('loops');await say(P,'seven_strips_each_doubled_into_a_loop')}},
  {name:'bolt_of_goat_hair_cloth',x:50,y:80,w:36,h:9,wx:68,wy:113,look:'my_last_bolt_of_goat_hair_cloth',pickup:'it_comes_with_me_when_i_go',
    useWith:async it=>it==='knife'?say(P,'i_will_not_cut_it_without'):false},
  {name:'tent',x:139,y:56,w:55,h:50,wx:182,wy:113,dir:-1,vis:()=>!F.gotTent,get def(){return F.seam&&F.loopsOn?'pickup':'look'},
    look:()=>say(P,tentNeeds()||'finished_said'),
    use:()=>say(P,tentNeeds()||'it_is_finished'),
    pickup:async()=>{const n=tentNeeds();if(n){await say(P,'i_promised_kleon_a_finished');return say(P,n)}
      await fade(1,200);F.gotTent=1;addItem('tent');await fade(0,200);await say(P,'rolled_tight_and_tied')},
    useWith:async it=>{if(it==='loops')return sewLoops();if(it==='knife')return say(P,'cut_it_said');
      if(it!=='awl'&&it!=='thread')return false;
      if(!F.seam)return sewSeam();if(has('loops'))return sewLoops();
      return say(P,F.loopsOn?'it_is_finished_said':'seam_is_closed_said')}},
  {name:'tent_frame',x:139,y:52,w:55,h:54,wx:182,wy:113,dir:-1,vis:()=>F.gotTent,look:'frame_stands_empty'},
  {name:'pack_mule',x:224,y:62,w:50,h:48,wx:292,wy:117,dir:-1,look:'kleons_lead_mule_loaded',pickup:'it_is_not_mine',
    talk:async()=>{SHARED.beasts.speak('mule3','mule');await say(P,'it_has_nothing_to_say_that_kleon')}},
  {name:'east_gate',x:274,y:50,w:42,h:54,wx:292,wy:112,dir:1,look:'the_east_gate',exit:()=>leave3()}]};
KL.hs={name:'Kleon',actor:KL,look:()=>say(P,F.sold?'kleon_well_pleased_with_his_tent':'kleon_a_caravan_master'),
  show:{awl:'awl_is_not_a_tent_tentmaker',thread:()=>say(KL,F.seam?'thread_ex':'thread_good'),
    knife:'cut_me_nothing_tentmaker',loops:'leather_a',
    tablets:'write_this_down_one_tent',
    '*':'keep_your_tools_tentmaker'},
  give:async it=>{if(it!=='tent')return false;
    await say(P,'your_tent_kleon');
    await say(KL,'let_me_see');
    delItem('tent');F.sold=1;SFX.good();
    await say(KL,'man_came_to_fetch_you_away');
    await say(P,'there_is_your_tent_in_full');
    await say(P,'my_word_is_kept',TH)},
  talk:async()=>{if(F.sold)return say(KL,'may_your_road_be_as_sound');
    if(!F.metKleon){F.metKleon=1;await say(P,'peace_to_you_kleon');
      await say(KL,'nearly_is_no_shelter_in_the_cilician');
      await say(KL,'last_tent_i_bought_tore');
      await say(P,'it_will')}
    await talkTree([
      {q:'what_does_the_tent_still_lack',a:()=>say(KL,!F.seam?'you_tell_me':!F.loopsOn?'something_at_the_hem_that_a_peg':'nothing_that_i_can_see')},
      {q:'where_is_your_caravan_bound',a:async()=>{await say(KL,'up_through_the_gates_to_iconium');await say(KL,'up_there_a_man_lives_or_freezes')}},
      {q:'friend_has_come_to_take',once:1,a:async()=>{await say(KL,'tarsus_loses_a_good_needle');await say(P,'i_will_said')}},
      {q:'i_will_get_back_to_work',bye:1}])}};
const BN3={name:'Barnabas',actor:BN,
  look:()=>say(P,G.room==='tarsus'?'barnabas_he_walked':'barnabas_a'),
  show:{awl:()=>say(BN,G.room==='tarsus'?(F.seam?'put_it_to_work_brother':'your_awl_and_that_open_seam')
      :F.gotSpool?'good_awl_and_good_thread':'your_awl_and_no_thread_on_it'),
    thread:'thread_for_the_tent',
    knife:()=>say(BN,G.room==='tarsus'?'what_will_you_cut':'cloth_to_cut_and_bags_to_make'),
    loops:'leather_loops_said',tent:'it_is_kleon_who_is_waiting',
    bolt:'your_last_goat_hair_cloth_from_tarsus',
    panels:'bags_already_nearly',spool:'xanthes_thread_so',
    bags:'fine_work',wages:'lucius_keeps_the_tally_brother',
    tablets:()=>say(BN,G.room==='tarsus'?'still_scratching_notes_into_the_wax_saul':'put_the_relief_on_your_list_brother'),
    '*':'keep_it_brother_said'},
  ask:{kleon:'we_had_better_work_faster',
    famine:['antioch_answered_before','i_have_seen_many_congregations_saul']},
  talk:()=>G.room==='tarsus'?(F.sold?say(BN,'your_word_is_kept_saul_said'):talkTree([
      {q:'why_come_all_this_way_for_me',a:async()=>{await say(BN,'great_number_in_antioch_have_believed_saul');
        await say(BN,'they_need_someone_who_knows')}},
      {q:'how_did_you_find_me',a:async()=>{await say(BN,'not_quickly');await say(BN,'you_were_at_the_last_stall')}},
      {q:'first_i_must_finish_this_tent',a:()=>say(BN,!F.seam?'of_course':
        !F.loopsOn?'kleon_says_his_last_tent':'it_looks_finished_to_me')},
      {q:'give_me_a_little_time_brother',bye:1}])):talkTree([
    {q:'what_does_the_relief_still_need',a:async()=>{const n=[];if(!F.bagsOn)n.push(F.bags?'new_bags_hung_on_the_donkey':'new_pack_bags_to_carry_it');
      if(!F.jar)n.push('therons_oil_which_will');if(!F.sealed)n.push('tally_closed_and_the_purse_sealed');
      await say(BN,n.length?T('it_still_needs_list',{list:n.map(x=>T(x)).join(T('and_2'))}):'nothing_more');
      if(!F.gotSpool)await say(BN,'for_thread_try_xanthe_the_spinner')}},
    {q:'why_send_it_by_the_two',a:async()=>{await say(BN,'jerusalem_knows_me_and_antioch');await say(BN,'two_can_vouch_for_each_other')}},
    {q:'i_am_glad_you_came_looking',once:1,a:()=>say(BN,'am_i')},
    {q:'back_to_work',bye:1}])};
/* ---------- The courtyard ---------- */
async function seal(){
  if(!F.jar)return say(LU,'not_yet_brother');
  await say(P,'lucius_add_this_to_the_gift');
  await say(LU,'you_are_already_carrying');
  await say(P,'carrying_it_is_my_assignment');delItem('wages');SFX.pick();
  await say(LU,'that_is_every_gift');
  await quiz(LU,'shall_i_simply_hand_it',[
    {q:'thank_you_said',r:['i_am_sure_you_would']},
    {q:'count_it_before_the_brothers',ok:1,
      p:['not_as_it_is',
        'before_jehovah_and_before_2_corinthians_8_21'],r:['well_said']},
    {q:'as_you_think_best',r:['here_yes']}]);
  await fade(1,300);F.sealed=1;await narr('silver_is_counted_aloud_before_the_brothers',{dur:6500});await fade(0,300);SFX.good();
  await say(LU,'one_tablet_stays_here_and_one');return checkFinal3()}
async function loadBags(it){if(it==='bolt'||it==='panels')return say(P,'loose_cloth_carries_nothing');if(it!=='bags')return false;
  SFX.creak();delItem('bags');F.bagsOn=1;await say(P,'easy_friend');
  await say(BN,'they_hang_as_if_they_had');return checkFinal3()}
async function checkFinal3(){if(F.bagsOn&&F.sealed)return finale3();
  return say(BN,F.bagsOn?'now_only_the_tally_is_still_open':'counted_and_sealed')}
ROOMS.court={walk:[16,304,112,138],
  /* Theron's oil jar, while it waits by the table to be loaded */
  block:()=>F.jar&&!F.loaded?[[185,109.5,10,2.5]]:[],
  mood:'calm',amb:{birds:.6,leaves:.5,crowd:.12},hs:[
  {name:'door_of_the_house',x:34,y:56,w:32,h:48,wx:52,wy:113,look:'the_door_of_the_house',
    use:'we_meet_out_here_where',open:'we_meet_out_here_where'},
  {name:'water_jar',x:68,y:86,w:14,h:20,wx:66,wy:113,look:'great_jar_of_water_by_the_door',pickup:'it_would_take_two_men_to_lift'},
  {name:'vine_arbor',x:100,y:30,w:88,h:22,wx:140,wy:114,look:'vine_trained_over_the_arbor',pickup:'grapes_are_not_ripe'},
  {name:'bench',x:112,y:94,w:28,h:12,wx:126,wy:113,look:'bench_worn_smooth'},
  {name:'table',x:144,y:82,w:36,h:25,wx:162,wy:114,look:()=>say(P,F.sealed?'two_wax_tablets_with_the_same':'luciuss_wax_tablets_and_a_purse'),
    pickup:'not_until_it_has_been_counted',useWith:async it=>it==='wages'?seal():false},
  {name:'gifts_of_the_congregation',x:194,y:80,w:44,h:30,wx:214,wy:115,vis:()=>!F.loaded,look:['sacks_of_grain_a_basket','some_households_brought'],
    pickup:'not_by_the_armful',useWith:async it=>it==='bags'?say(P,'bags_go_on_the_donkey_first'):false},
  {name:'old_pack_bags',x:236,y:42,w:24,h:30,wx:232,wy:113,dir:1,look:'congregations_old_pack_bags',pickup:'they_would_not_survive',
    useWith:async it=>['awl','spool','knife'].includes(it)?say(P,'there_is_no_sound_cloth'):false},
  {name:'donkey',x:238,y:72,w:42,h:40,wx:232,wy:116,dir:1,
    look:()=>say(P,F.bagsOn?'new_bags_across_his_saddle':'sturdy_pack_donkey_with_a_bare_saddle'),
    talk:async()=>{SHARED.beasts.speak('donkey3','donkey');await say(P,'he_listens_well_and_says_little')},pickup:'he_weighs_a_good_deal_more',
    use:()=>say(P,F.bagsOn?'he_is_ready':'he_cannot_carry_grain_on_a_bare'),useWith:loadBags},
  {name:'gate_to_the_street',x:284,y:44,w:32,h:60,wx:298,wy:113,dir:1,look:'gate_to_the_great_colonnaded_street',exit:()=>go('antioch',44,116,1)}]};
LU.hs={name:'Lucius',actor:LU,look:'lucius_of_cyrene_one_of_the_teachers',
  show:{awl:'i_count_you_sew',knife:'put_that_away_before_i',
    bolt:'for_the_bags',panels:'well_cut',
    spool:'thread_from_xanthe',
    bags:'bags_fit_for_the_road',
    tablets:'wax_tablets_a',
    '*':'that_is_yours_brother'},
  ask:{famine:'it_will_fall_hardest_on_judea',thread:'i_count_brother_i_do_not_spin'},
  give:async it=>it==='wages'?seal():false,
  talk:()=>talkTree([
    {q:'what_is_in_the_tally',a:()=>say(LU,F.sealed?'everything_counted_before':
      'every_sack_every_jar_and_every_coin')},
    {q:'you_are_from_cyrene',a:async()=>{await say(LU,'i_am');await say(LU,'they_had_the_hand_of_jehovah')}},
    {q:'is_every_gift_in',if:()=>!F.sealed,a:()=>say(LU,F.jar?'nearly_said':
      'all_but_therons_oil')},
    {q:'i_will_get_to_work',bye:1}])};
AG.hs={name:'Agabus',actor:AG,look:'agabus_one_of_the_prophets',
  show:{awl:'good_tool_for_good_work',knife:'keep_it_for_your_cloth_brother',bolt:'cloth_that_sheds_the_rain',
    panels:'sew_them_and_the_grain',spool:'thread_from_a_sister_in_the_street',
    bags:'strong_work',wages:'that_is_for_lucius_and_the_tally',
    tablets:'write_down_what_was_foretold_brother',
    '*':'i_need_nothing_brother'},
  ask:{thread:'ask_brother'},
  talk:()=>talkTree([
    {q:'when_will_the_famine_come',a:async()=>{await say(AG,'i_was_not_told_the_day_brother');await say(AG,'your_congregation_did_not')}},
    {q:'how_are_the_brothers_in_judea',a:async()=>{await say(AG,'many_have_little');await say(AG,'lean_year_will_fall_hardest_on_those')}},
    {q:'you_came_a_long_way_to_tell',once:1,a:()=>say(AG,'i_will_go_back_with_something')},
    {q:'peace_to_you_agabus',bye:1}])};
/* ---------- The street ---------- */
/* Theron's jar: both men at the stall, Barnabas's staff through the handles, one at each end (as in Numbers 13:23). */
async function carryJar(it){if(it!=='staff')return false;const me=PC(),other=me===P?BN:P;
  if(other.room!=='antioch')return say(me,me===P?'it_needs_a_man_at_each':'it_needs_a_man_at_each_said');
  await Promise.all([walk(me,410,118),walk(other,444,120)]);me.dir=1;other.dir=-1;
  await say(BN,'my_staff_through_both_handles');
  await say(P,'like_the_two_numbers_13_23');
  await say(TN,'gently_brothers');
  await fade(1,400);F.jar=1;SFX.creak();place(P,'court',176,126,-1);place(BN,'court',150,122,1);viewOf(PC());await wait(300);await fade(0,400);
  await say(LU,'therons_oil')}
async function xanthe(){
  await say(P,'peace_to_you_sister_xanthe');
  await say(XA,'peace_brother');
  await quiz(XA,'others_carry_in_sacks_of_grain',[
    {q:'you_are_excused_sister',r:['excused_said']},
    {q:'everyone_else_is_giving_something_sister',r:['everyone_else']},
    {q:'no_one_asks_for_what_you',ok:1,
      p:['no_one_asks_for_what_you_said',
        'gift_is_especially_2_corinthians_8_12'],
      r:['as_i_am_able']}]);
  await quiz(XA,'what_do_i_have_that_hungry',[
    {q:'jehovah_sees_your_heart',r:['i_know_that_he_does']},
    {q:'do_not_look_at_what_you_lack',ok:1,p:['do_not_look_at_what_you'],
      r:['thread_linen','no_one_can_eat_thread_brother']},
    {q:'little_enough_it_is_true',r:['thought_fills_no_bowl_in_judea']}]);
  await quiz(XA,'what_use_is_thread_in_a_famine',[
    {q:'not_much_perhaps',r:['it_would_lie_in_a_corner']},
    {q:'i_could_buy_it_from_you',r:['that_would_be_your_silver']},
    {q:'gift_has_no_bags_to_travel',ok:1,
      p:['gift_cannot_reach_judea',
        'i_have_the_cloth_and_the_awl_said'],
      r:['my_thread_holding_the_whole_gift_together','take_the_best_spool_i_have']}]);
  F.gotSpool=1;addItem('spool');await say(P,'i_will_tell_them');await say(P,'she_has_given_more_than_thread',TH)}
ROOMS.antioch={space:0.9,walk:[16,466,110,138],
  /* Theron's oil jar at the street's edge, until it is carried to the courtyard */
  block:()=>F.jar?[]:[[421,110.5,10,2.5]],
  mood:'hope',amb:{crowd:.6,fountain:.7,birds:.3,hooves:.3},hs:[
  {name:'mountain',x:230,y:4,w:200,h:24,wx:300,look:'mountain_above_the_city'},
  {name:'colonnade',x:112,y:30,w:318,h:28,wx:270,look:['great_street_of_antioch','in_its_shade_people_from_every']},
  {name:'gate_to_the_courtyard',x:16,y:44,w:44,h:60,wx:38,wy:112,dir:-1,look:'gate_of_the_house_where',exit:()=>go('court',296,116,-1)},
  {name:'thread_stall',x:150,y:44,w:80,h:60,wx:176,wy:114,look:'xanthes_stall_skeins_of_yarn',pickup:'that_would_be_stealing'},
  {name:'fountain',x:250,y:60,w:34,h:45,wx:266,wy:114,look:'water_from_the_springs',use:'cool_and_sweet',
    pickup:'i_have_nothing_to_carry_water_in_and_the'},
  {name:'pottery_stall',x:310,y:43,w:100,h:62,wx:340,wy:114,look:'therons_jars_bowls_and_lamps',pickup:'that_would_be_stealing_said'},
  {name:'therons_oil_jar',x:418,y:92,w:16,h:24,wx:410,wy:118,dir:1,vis:()=>!F.jar,
    look:['great_jar_of_oil_with_therons','it_is_a_load_for_two_men'],
    pickup:'not_alone',use:'it_needs_a_bar_through',useWith:carryJar},
  {name:'south_gate',x:436,y:20,w:44,h:84,wx:452,wy:112,dir:1,look:'road_south_down_the_coast',
    use:'not_yet',open:'it_stands_open'}]};
XA.hs={name:'Xanthe',actor:XA,look:()=>say(P,F.gotSpool?'xanthe_spinning_again_and_singing':'xanthe_a_widow_who_spins'),
  give:async it=>{if(it==='wages')return say(P,'it_is_not_my_silver_she_needs');
    if(it==='spool')return say(XA,'no_brother_it');return false},
  show:{awl:()=>say(XA,F.gotSpool?'threaded_with_my_thread_now_i_hope':'awl_with_no_thread_on_it'),
    knife:'sharp_blade',bolt:'goat_hair_cloth_from_cilicia_said',
    panels:()=>say(XA,F.gotSpool?'my_thread_is_waiting_for_those':'cut_for_sewing'),
    bags:'my_thread_in_every_seam',tablets:'you_can_read_and_write_brother','*':'no_brother_keep'},
  ask:{famine:'i_heard'},
  talk:async()=>{if(!F.gotSpool)return xanthe();await say(XA,F.bags?'my_thread_on_the_road_to_judea':'sew_well_brother');
    return talkTree([{q:'peace_to_you_sister',bye:1}],{quiet:1})}};
TN.hs={name:'Theron',actor:TN,look:'theron_a_potter',
  show:{awl:'i_work_with_clay_you_with_cloth',knife:'i_cut_my_clay_with_a_wire',
    bolt:'cloth_for_the_relief',
    panels:'sew_them_strong',spool:'xanthes',
    bags:'those_will_carry_my_jars',wages:'give_it_to_lucius_brother',
    staff:'that_would_do_for_a_bar',
    tablets:'write_down_that_a_potter',
    '*':'keep_it_brother_i'},
  ask:{famine:'judea_will_need_oil_as_well'},
  talk:()=>talkTree([
    {q:'how_did_you_come_to_believe',a:async()=>{await say(TN,'men_from_cyprus_and_cyrene');
      await say(TN,'great_number_of_us_believed')}},
    {q:'what_do_you_tell_your_customers',a:async()=>{await say(TN,'that_i_am_a_christian');await say(P,'it_is_a_name_worth_living')}},
    {q:'has_xanthe_been_to_the_courtyard',if:()=>!F.gotSpool,a:async()=>{await say(TN,'not_since_the_gifts_began');await say(TN,'i_offered_to_carry_her_gift')}},
    {q:'is_your_own_gift_ready',a:()=>say(TN,F.jar?'it_went_to_the_courtyard':
      'my_best_jar_of_oil_sealed')},
    {q:'peace_to_you_theron',bye:1}])};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
KL.hs.as={barnabas:{look:'kleon_the_caravan_master',
  talk:()=>say(KL,F.sold?'take_your_tentmaker_then':'you_are_the_one_who_came'),
  show:{tent:'let_the_tentmaker_hand','*':'keep_it_friend_it'}}};
AG.hs.as={barnabas:{look:'agabus_said',
  talk:()=>say(AG,'barnabas_jerusalem'),show:{'*':'keep_it_barnabas'}}};
LU.hs.as={barnabas:{look:'lucius_of_cyrene_with_his_tally',
  talk:()=>say(LU,F.sealed?'counted_and_sealed_barnabas':!F.jar?'therons_oil_has_not_come_in_yet':'saul_says_he_has_something_to_add'),
  show:{wages:'that_is_sauls_own_barnabas','*':'if_it_is_for_the_relief'}}};
XA.hs.as={barnabas:{look:()=>say(BN,F.gotSpool?'xanthe_singing_over_her_spinning_again':'xanthe_the_spinner'),
  talk:async()=>{if(F.gotSpool)return say(XA,'barnabas_tell');
    await say(XA,'barnabas_brother');await say(BN,'only_to_greet_you_sister')},
  show:{'*':'no_brother_keep'}}};
TN.hs.as={barnabas:{look:'theron_the_potter',
  talk:()=>say(TN,F.jar?'my_jar_is_in_good_hands_barnabas':'barnabas_my'),
  show:{staff:'your_staff','*':'keep_it_barnabas_said'}}};
const AS_B={
  tarsus:{'taurus_mountains':{look:'the_taurus'},
    'my_workshop':{look:'sauls_stall'},'awning':{look:'goat_hair_cloth_sauls'},
    /* the hidden treasure (CONTRIBUTING section 2): Barnabas, played, sits down at Saul's bench. It changes nothing. */
    'workbench':{look:'scarred_by_years_of_cutting',use:async()=>{await say(BN,'i_sit_down_at_sauls_bench');
      await say(BN,'i_had_better_get_up_again');treasure()}},'leather_hide':{look:'thick_oxhide'},
    'bolt_of_goat_hair_cloth':{look:'goat_hair_cloth_cilicium'},
    'tent':{look:()=>say(BN,F.seam?'seam_is_closed_i':'one_seam_still_gapes_open'),
      use:hold,pickup:hold,useWith:async it=>say(BN,'stitching_is_sauls_work')},
    'tent_frame':{look:'empty_now'},
    'pack_mule':{look:'kleons_mule',talk:async()=>{SHARED.beasts.speak('mule3','mule');await say(BN,'it_has_nothing_to_say_to_a_levite')}}},
  court:{'door_of_the_house':{look:'house_of_a_brother_who'},
    'water_jar':{look:'water_for_washing_off_the_dust'},'vine_arbor':{look:'whole_year_we_have_taught'},
    'bench':{look:'jews_and_greeks_side_by_side'},
    'table':{look:()=>say(BN,F.sealed?'counted_written_twice_and_sealed':'luciuss_tally_and_the_purse'),useWith:async it=>say(BN,it==='wages'?'that_is_sauls_to_give_not_mine':'lucius_would_only_count_it')},
    'gifts_of_the_congregation':{look:'grain_figs_and_oil_from_jews'},
    'old_pack_bags':{look:'rotten_through'},
    'donkey':{look:'he_has_walked_the_road',talk:async()=>{SHARED.beasts.speak('donkey3','donkey');await say(BN,'fine_traveling_companion')},
      useWith:async it=>say(BN,it==='bags'?'saul_sewed_them_so_let':'he_has_no_use_for_that')}},
  antioch:{'mountain':{look:'the_mountain_above_the_city'},
    'colonnade':{look:'when_i_first_acts_11_23'},
    'thread_stall':{look:'xanthes_stall'},'fountain':{look:'water_from_the_springs_above_the_city'},
    'pottery_stall':{look:'therons_stall'},'south_gate':{look:'road_to_judea'},
    'therons_oil_jar':{look:'therons_jar_sealed_for_the_relief',
      pickup:'not_alone_and_not_without',use:'it_needs_a_bar_through_said',useWith:carryJar}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ SCENES: intro, ending; PRAYER HINTS ============ */
async function start3(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(3);G.scene=null;G.end={};enterRoom('tarsus',150,122,-1);place(BN,'tarsus',-14,124,1);codeBtn();await fade(0,600);
    await narr('tarsus_in_cilicia_about_45_c_e',{dur:2800});
    await narr('for_years_saul_galatians_1_21_23');
    await narr('meanwhile_in_antioch_acts_11_20_22');
    await narr('barnabas_knows_who_could_help_acts_11_25');
    await say(BN,'saul_ex');await walk(BN,112,124);
    await say(BN,'i_have_asked_for_you_along');
    await say(P,'barnabas_q');
    await say(BN,'antioch_a');
    await say(P,'i_will_come');
    await say(P,'i_promised_kleon_the_caravan');
    await say(BN,'show_me_where_to_hold')},true)}
async function finale3(){playAs(P);AU.mood='hope';await wait(400);
  await say(BN,'bags_are_on_and_the_gift');
  place(XA,'court',300,114,-1);place(TN,'court',304,120,-1);SFX.door();await Promise.all([walk(XA,216,128),walk(TN,244,134)]);
  await say(TN,'we_could_not_let_you_leave');
  await fade(1,300);F.loaded=1;SFX.creak();await wait(450);await fade(0,300);
  await say(LU,'grain_and_figs_in_the_bags',{to:BN});
  await say(XA,'my_thread_in_every_seam_of_it');
  await say(AG,'i_brought_you_hard_news');
  await say(P,'jews_and_greeks_potters');
  const d=$('#dim'),all=[P,BN,LU,AG,XA,TN];d.style.opacity=.5;all.forEach(a=>a.bow=true);SFX.pray();await wait(900);
  await narr('together_they_ask_jehovah',{dur:4200,color:'#cfe2ff'});
  all.forEach(a=>a.bow=false);d.style.opacity=0;await wait(500);
  await say(BN,'come_brother');
  walk(BN,280,118);await walk(P,296,114);await fade(1,600);
  G.scene=roadScene;G.trek={k:0};codeBtn();AU.amb={birds:.7,wind:.4,leaves:.4};await fade(0,600);
  const trek=tween(17000,k=>{G.trek.k=k});
  await narr('disciples_sent_their_relief_acts_11_30',{dur:6500});
  await narr('great_famine_came_acts_11_28',{dur:8000});
  await trek;
  await narr('john_mark_went_acts_12_25',{dur:9000});
  await journey();await narr('in_antioch_a_far_acts_13_1_3',{dur:5500});
  endScreen({title:'called_to_antioch_2',text:'saul_kept_his_word_worked',
    based:'based_on_acts_11_19_30',
    go:'click_to_continue_to_chapter_four',code:['chapter_four_code_code',codeOf(4,0)]});
  await wait(1500);ov.onclick=()=>startChapter(4);await new Promise(()=>{})}
function hint3(){const b=PC()!==P,saul=['saul3',['that_is_sauls_craft_not_mine','saul_should_do_this_part']];
  if(G.room==='tarsus'&&!F.seam)return b?(holding()?['seam3b',['i_have_the_far_edge','saul_can_sew_the_seam_now']]
      :['hold3b',['saul_says_a_seam_sews_straight','i_should_use_the_tent_and_hold']])
    :holding()?['seam3',['barnabas_has_the_far_edge','i_can_close_the_seam_with_my_awl']]
    :['hold3',['seam_sews_straight_only','barnabas_could_hold_the_far']];
  if(b){if(G.room==='tarsus')return F.sold?['go3b',['saul_has_kept_his_word','saul_and_i_can_leave_by_the_east']]:saul;
    return F.jar?saul:['jar3b',['therons_jar_needs_two_men','saul_and_i_must_both_be']]}
  if(G.room==='tarsus'){
    if(!F.gotLoops)return['hide3',['tent_is_only_as_sure_as_its_hold','my_knife_can_cut_peg_loops']];
    if(!F.loopsOn)return['loops3',['loops_are_cut','i_should_sew_the_leather']];
    if(!F.gotTent)return['take3',['work_is_done','i_should_pick_up_the_finished']];
    if(!F.sold)return['sell3',['promise_is_kept_when_the_thing','i_should_give_the_finished']];
    return['go3',['my_word_here_is_kept','barnabas_and_i_can_leave']]}
  if(!F.bags){
    if(!F.cutBolt)return['cut3',['gift_cannot_travel_in_rotten_bags','my_knife_can_cut_the_goat_said']];
    if(!F.gotSpool)return['xan3',['cloth_and_an_awl_and_nothing',
      'xanthe_the_spinner_keeps']];
    return['sew3',['cloth_awl_and_thread_everything','i_can_sew_the_cloth_panels']]}
  if(!F.jar)return['jar3',['therons_oil_is_a_load_for_two','barnabas_and_i_must_both']];
  if(!F.bagsOn)return['load3',['bags_are_finished','i_should_hang_the_pack']];
  if(!F.sealed)return['seal3',['gift_carried_by_my_hand',
    'i_should_give_my_savings']];
  return['end3',['everything_is_ready']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_brother_it',
  'no_brother_keep',
  'no_brother_keep']};
/* Birds (shared/birds.js): gulls over the harbors, birds of prey, swallows and larks over open country, sparrows and doves on the
   roofs and walls of the towns; by day and in fair weather only. Scenery: they change nothing in the story. */
ROOMS.tarsus.birds={perch:[{k:'sparrow',y:20,x:[30,40,52]},{k:'dove',y:59,x:[150.5,168.5],d:[1,-1]}]};
ROOMS.court.birds={perch:[{k:'sparrow',y:28,x:[190,200,212]},{k:'dove',y:33,x:[290,306],d:[-1,1]}]};
ROOMS.antioch.birds={perch:[{k:'sparrow',y:16,x:[40,50,62]},{k:'dove',y:30,x:[250,266],d:[1,-1]}]};
const BIRDS_ROAD={prey:[150,36,150,14],lark:[230,88,28]};

return{acting:ACTING,rooms:['tarsus','court','antioch'],setup:setup3,start:start3,hint:hint3,music:MUSIC,scenes:{road:roadScene},topics:TOPICS,tablets:TABLETS,
  route:[['damascus','jerusalem'],['jerusalem','caesarea'],['caesarea','tarsus','sea'],['tarsus','antioch','new']],
  flags:['metKleon','seam','gotLoops','loopsOn','gotTent','sold','cutBolt','gotSpool','bags','bagsOn','sealed','held','jar'],
  party:['paul','barnabas'],home:{staff:'barnabas'},share:['awl','thread','knife','tablets','loops','tent','bolt','panels','spool','bags','wages','staff'],
  ent:{tarsus:[150,122,1],court:[146,128,-1],antioch:[46,116,1]},
  inv(room){const ant=room!=='tarsus',inv=ant?['awl','knife','tablets']:['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.gotLoops&&!F.loopsOn,'loops');add(F.gotTent&&!F.sold,'tent');add(ant&&!F.cutBolt,'bolt');add(F.cutBolt&&!F.bags,'panels');
    add(F.gotSpool&&!F.bags,'spool');add(F.bags&&!F.bagsOn,'bags');add(ant&&!F.sealed,'wages');inv.push('staff');return inv},
  place(room){if(room!=='tarsus')place(BN,'court',92,124,1);else if(F.held)place(BN,'tarsus',146,113,1)}}
});
