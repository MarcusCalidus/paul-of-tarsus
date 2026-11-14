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
 MUSIC={dt:.155,root:55,scale:[0,2,4,5,7,9,10],bars:16,tracks:[
  {inst:'lyre',prog:'AABACADA',len:2,seq:{A:[0,_,2,4,_,2,7,_,4,_,2,4,_,2,4,_],B:[-1,_,1,3,_,1,6,_,3,_,1,3,_,1,3,_],C:[3,_,5,7,_,5,10,_,7,_,5,7,_,5,7,_],D:[4,_,6,8,_,6,11,_,8,_,6,8,_,6,8,_]}},
  {inst:'bass',prog:'AABACADA',len:5,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-8,_,_,_,_,_,_,_,-4,_,_,_,_,_,_,_],C:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],D:[-3,_,_,_,_,_,_,_,-6,_,_,_,_,_,-5,_]}},
  {drum:1,moods:['calm'],seq:{A:'d..k..t.d.k.t...'},vol:.7},
  {drum:1,moods:['hope'],prog:'AB',seq:{A:'d.sk.st.d.sk.st.',B:'d.sk.st.d.skcstc'}},
  {inst:'aulos',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
/* What is seen through a city gate: sky, hills and the road running on. */
function gateView(g,x,y,w,h){g.save();arch(g,x,y,w,h);g.clip();sky(g,480,y+h-20,['#5a98d8','#a8cdea','#dfeaf0']);
  ridge(g,x,x+w,y+h-12,q=>7+3*Math.sin(q/5),['#8ea284','#a8b890']);ridge(g,x,x+w,y+h-12,q=>3+2*Math.sin(q/3+1),['#7c9668','#8fa87a']);
  R(g,x,y+h-12,w,12,'#b8c090');poly(g,[x+w*.5-1,y+h-12,x+w*.5+1.5,y+h-12,x+w*.95,y+h,x+w*.2,y+h],'#ead9ae');
  ao(g,x,y,w,10,'t',.55,'#2a2440');ao(g,x,y,5,h,'l',.5,'#2a2440');ao(g,x+w-4,y,4,h,'r',.35,'#2a2440');g.restore()}
/* A hank of goat-hair cloth rolled on itself: x,y left end of the roll, w long. */
function bolt(g,x,y,w,hh,c){c=c||'#2a211c';oval(g,x+w/2+2,y+hh+.4,w/2+3,1.4,'rgba(40,30,60,.35)');g.fillStyle=lg(g,0,y,0,y+hh,[tint(c,.3),c,tint(c,-.5)]);g.fillRect(x,y,w,hh);
  for(let i=0;i<w;i+=2.5)R(g,x+i,y,.5,hh,'rgba(0,0,0,.25)');oval(g,x,y+hh/2,hh*.32,hh/2,tint(c,.12));oval(g,x+w,y+hh/2,hh*.32,hh/2,tint(c,-.35));
  g.strokeStyle=tint(c,.4);g.lineWidth=.5;for(const q of[.3,.62]){g.beginPath();g.ellipse(x,y+hh/2,hh*.32*q,hh/2*q,0,0,6.2832);g.stroke()}}
/* ---------- Tarsus: Saul's stall, the Taurus behind the city ---------- */
ART.tarsus={w:320,
 paint(g){const r=rng(113),SH='#8f95c8',ST='#d8c8a0';
  sky(g,320,76,['#3a78c8','#66a0dc','#9cc4ea','#d0e2ee']);cloud(g,150,12,56,9,r);cloud(g,262,24,40,7,r);cloud(g,40,16,34,6,r);
  /* the Taurus, snow on its heads */
  const mt=x=>26+9*Math.sin(x/37+.6)+6*Math.sin(x/15+2)+3*Math.sin(x/6)+2*Math.sin(x/2.3);ridge(g,0,320,74,mt,['#7f90b8','#9aa8c4','#b4bccc']);
  for(let x=0;x<320;x+=.5){const h=mt(x);if(h>27)R(g,x,74-h,.5,Math.min(9,(h-27)*.9)+Math.sin(x*1.7)*1.2,'#f4f7fc');if(Math.sin(x*.9)>.6)R(g,x,74-h+6+Math.sin(x)*2,.5,6,'rgba(90,104,150,.35)')}
  ridge(g,0,320,74,x=>10+4*Math.sin(x/28+2)+2*Math.sin(x/9),['#8ea27c','#a2b48c']);for(let i=0;i<60;i++)oval(g,r()*320,66+r()*8,1.4+r(),.8,'#7a906a');
  for(const[hx,hy,hw,hh]of[[150,50,34,16],[196,46,26,20],[226,52,18,14]]){R(g,hx,hy,hw,hh,'#e2d6b4');R(g,hx,hy,hw,1.4,'#b8603c');R(g,hx+hw-4,hy+1.4,4,hh,'#b9b4b8');R(g,hx+hw*.3,hy+5,3,5,'#7a6c58')}
  cypress(g,134,64,13);cypress(g,232,64,15);cypress(g,244,64,10);comp(g,'screen',.22,()=>R(g,0,40,320,36,'#c8d8ee'));
  /* city wall and the east gate */
  ashlar(g,112,62,208,42,ST,r,{bw:13,bh:6,v:.09,t:.35});for(let i=112;i<320;i+=9){R(g,i,58.5,5.5,3.5,ST);R(g,i,58.5,5.5,.5,'#f4e8c8')}
  ashlar(g,268,46,52,58,'#e0d0a8',r,{bw:12,bh:6,v:.09});for(let i=268;i<320;i+=8){R(g,i,41.5,5,4.5,'#e0d0a8');R(g,i,41.5,5,.5,'#f8eccc')}R(g,268,45.5,52,1,'#a8987a');poly(g,[268,41.5,262,45,262,104,268,104],'#a8a0b0');
  arch(g,278,64,32,40,'#c2b28c');gateView(g,280,66,28,38);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,294+Math.cos(a)*16-.3,80+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* my workshop: an open front under an awning of my own cloth */
  house(g,0,24,116,80,'#e2d0a4',r,{side:6,patch:4,cracks:5});windowArt(g,26,29,12,8,'#e2d0a4',{bars:2});windowArt(g,76,29,12,8,'#e2d0a4',{bars:2});
  R(g,10,50,98,54,'#cbb88c');g.fillStyle=lg(g,0,52,0,104,['#1e1612','#3a2c22']);g.fillRect(12,52,94,52);
  wood(g,17,66,58,2.2,'#6a4e34');vessel(g,24,66,3.6,9,'#8a4a2a','jar',{noShadow:1});vessel(g,34,66,3.2,7,'#6f5a3a','jug',{noShadow:1});bolt(g,46,60.4,22,5.6,'#30261f');
  R(g,85.4,56,1.6,3,'#5a4630');for(let i=0;i<3;i++){g.strokeStyle=i%2?'#b89a5a':'#8f7440';g.lineWidth=1.2;g.beginPath();g.arc(86.2,65,5-i*1.3,0,6.2832);g.stroke()}
  ao(g,12,52,94,12,'t',.6);ao(g,12,52,10,52,'l',.4);
  wood(g,6,44,3,62,'#6a4a2c',1);wood(g,110,44,3,62,'#6a4a2c',1);
  const aw=[3,40,117,40,119,50.6,1,50.6];poly(g,aw,'#2e2620');clipTo(g,()=>poly(g,aw),()=>{for(let i=0;i<120;i+=8)R(g,i,40,4,11,'#3c322a');tex(g,'vert',.5,0,40,120,11,'overlay',.5);ao(g,0,40,120,3,'t',.3);R(g,0,40,120,.6,'#5a4e42')});
  for(let i=0;i<118;i+=8)poly(g,[1+i,50.6,9+i,50.6,5+i,53],(i/8)%2?'#2e2620':'#3c322a');shade(g,[10,53,108,53,108,60,10,58],SH,.5);
  /* paving */
  pave(g,0,103,320,144,'#b8b0a0',r,{vx:170,vy:62,rows:5,step:32,v:.08});ao(g,0,103,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,320,41)});
  shade(g,[0,104,116,104,128,112,0,114],SH,.7);shade(g,[116,104,320,104,320,107,122,107],SH,.5);shade(g,[262,104,268,104,282,109,270,109],SH,.7);
  /* workbench in front of the stall */
  R(g,18,93,74,12,'rgba(30,20,30,.45)');wood(g,17.5,92,4.4,13.5,'#6a4e2c',1);wood(g,85.5,92,4.4,13.5,'#6a4e2c',1);wood(g,21.5,99,64.5,2.2,'#5a4226');
  wood(g,13,88,82,4.4,'#96703e');R(g,13,91.8,82,1.2,'#5a4226');for(let i=0;i<10;i++){const sx=16+r()*76;stroke(g,[sx,89+r()*2,sx+2+r()*4,89+r()*2],'rgba(50,28,10,.5)',.5)}
  bolt(g,54,82,28,6,'#2a211c');
  /* a tether post for Kleon's mule, and where the tent stands */
  wood(g,270.5,96,2.4,10,'#6a4a2c',1);oval(g,166,107.6,34,3,'rgba(50,40,90,.3)');
  pool(g,40,0,260,150,'#fff0c0',.15,'screen');ao(g,200,0,120,144,'r',.1,'#2a2050')},
 fore(g){const r=rng(114);vessel(g,306,152,13,36,'#6a3420','amph',{noShadow:1});sack(g,10,148,13,20,'#b8a880');sack(g,30,147,9,13,'#a89870');
  comp(g,'source-atop',.4,()=>R(g,0,0,320,144,'#34305a'))},
 draw(g,t){
  if(!F.gotLoops){const hd=[21,86.4,45,86,46.4,90,44,96.6,40,95,37,97.4,31,95.6,27,97.6,23,95,21.6,90];oval(g,34,97.6,13,1.2,'rgba(40,30,60,.3)');poly(g,hd,'#a8703e');
    clipTo(g,()=>poly(g,hd),()=>{g.fillStyle=lg(g,0,86,0,98,['#c8905a','#a8703e','#7a4e28']);g.fillRect(20,86,28,12);R(g,21,86.4,25,.8,'#deb07a')});stroke(g,[25,89,42,88.6],'#7a4e28',.5)}
  beast(g,252,110,-1,0,2);
  /* the tent on its frame */
  stroke(g,[168.5,49,140,106.5],'#5a3e22',1.6);stroke(g,[164.5,49,193,106.5],'#5a3e22',1.6);stroke(g,[168,49,139.5,106.5],'#9a7040',.5);
  if(F.gotTent){stroke(g,[152.5,82,180.5,82],'#5a3e22',1.4);stroke(g,[152.5,81.6,180.5,81.6],'#9a7040',.4);return}
  const tp=[166.5,57,191.5,106,141.5,106];poly(g,tp,'#241c18');clipTo(g,()=>poly(g,tp),()=>{g.fillStyle=lg(g,141,0,192,0,['#3e3229','#2a211c','#17110e']);g.fillRect(141,57,51,49);
    for(let j=0;j<49;j+=1)R(g,141,57+j,51,.5,j%2?'rgba(0,0,0,.16)':'rgba(255,240,210,.05)');for(let j=11;j<49;j+=12)R(g,141,57+j,51,.8,'rgba(90,76,62,.7)');
    stroke(g,[166.5,57,152,106],'rgba(0,0,0,.4)',.6);stroke(g,[166.5,57,180,106],'rgba(0,0,0,.4)',.6);stroke(g,[166.5,57,146,106],'rgba(255,240,210,.12)',.5)});
  stroke(g,[166.5,57,141.5,106],'#4e4034',.6);
  if(!F.seam){const sm=[166.5,70];for(let j=1;j<=9;j++)sm.push(166.5-(.6+j*.36),70+j*4);for(let j=9;j>=1;j--)sm.push(166.5+(.5+j*.34),70+j*4);poly(g,sm,'#c8b890');poly(g,sm.map((v,i)=>i%2?v:166.5+(v-166.5)*.45),'#eadfbe');
    R(g,163.6,80,.6,3,'#d8c9a0');R(g,170,92,.6,4,'#d8c9a0')}
  else for(let j=15;j<48;j+=3)R(g,166.2,57+j,.7,2,'#9a8a66');
  if(F.loopsOn)for(let i=0;i<7;i++){R(g,142+i*7.8,103.6,2,3.6,'#b07a48');R(g,142+i*7.8,103.6,.6,3.6,'#d8a26a');R(g,142+i*7.8,106.6,2,.8,'#7a4e28')}},
 front(){}};
/* ---------- Antioch: the courtyard where the congregation meets ---------- */
ART.court={w:320,
 paint(g){const r=rng(131),SH='#8f95c8',W='#e6d6ac';
  sky(g,320,40,['#3f7ecc','#74aade','#a8cdea']);cloud(g,210,7,40,6,r);
  ridge(g,92,320,36,x=>10+8*Math.sin(x/70+.4)+2*Math.sin(x/13),['#8ea27c','#a6b68e']);
  for(let x=150;x<320;x+=.5){const h=10+8*Math.sin(x/70+.4)+2*Math.sin(x/13);R(g,x,36-h-2,.5,3,'#e2d8c0');if(Math.floor(x)%6<3)R(g,x,36-h-3.2,.5,1.2,'#e2d8c0');if(Math.floor(x)%44===0)R(g,x,36-h-5,3,6.5,'#ece2ca')}
  cypress(g,118,32,13);cypress(g,268,32,12);cypress(g,280,32,9);
  /* the courtyard wall, tiles along its top */
  plaster(g,92,32,228,72,W,r,{patch:5,cracks:7,brick:'#b89468'});for(let i=92;i<320;i+=5.5){R(g,i,27.5,5,5.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,27.5,5,.6,'#e08a60');R(g,i+4.5,27.5,.6,5.5,'#7a3620')}
  ao(g,92,33,228,5,'t',.25,'#3a3060');ao(g,92,92,228,12,'b',.22,'#4a3424');
  /* the house: a tiled porch on two columns */
  plaster(g,0,0,96,104,'#ecdcb4',r,{patch:3,cracks:5});poly(g,[96,0,100,2,100,102,96,104],'#a8a0b0');
  for(const x of[24,58])windowArt(g,x,12,16,15,'#ecdcb4',{bars:3,wood:'#8a6a40'});
  R(g,31,53,38,51,'#d8c8a0');doorArt(g,34,56,32,48,'#8a6a40',r);
  shade(g,[0,48,102,48,102,62,96,66,0,70],SH,.75);
  for(let i=0;i<104;i+=5.5){R(g,i,38,5,8.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,38,5,.8,'#e08a60');R(g,i+4.5,38,.6,8.5,'#7a3620')}R(g,0,46.5,104,1.6,'#6a3a22');wood(g,0,48,104,1.6,'#7a5632');
  for(const x of[10,84]){g.fillStyle=lg(g,x,0,x+8,0,['#cfc6b0','#fbf6e6','#efe6cc','#b8b0a4']);g.fillRect(x,50,8,54);R(g,x-1.5,48.6,11,2.4,'#f8f2e0');R(g,x-1.5,102,11,3,'#d6ccb0');R(g,x-1.5,102,11,.6,'#fbf6e6');for(let j=0;j<3;j++)R(g,x+2+j*2,52,.5,49,'rgba(120,110,100,.25)')}
  vessel(g,75,106,6,19,'#a05a34','pithos');
  /* the gate to the street */
  R(g,280,40,40,64,'#d6c69e');for(let i=280;i<320;i+=5.5){R(g,i,36,5,5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.6,'#e08a60')}poly(g,[280,36,275,39,275,104,280,104],'#a8a0b0');
  arch(g,284,52,32,52,'#c2b28c');g.save();arch(g,286,54,28,50);g.clip();sky(g,320,80,['#74aade','#cfe2ee']);R(g,286,84,28,20,'#dcd5c3');R(g,286,60,28,4,'#e2dac4');R(g,286,58.4,28,1.6,'#b8603c');
  for(const cxx of[291,304]){g.fillStyle=lg(g,cxx,0,cxx+5,0,['#d8d0bc','#fbf7ea','#c8c0b0']);g.fillRect(cxx,64,5,34);R(g,cxx-1,96,7,2,'#d8d0bc')}R(g,286,98,28,6,'#cfc8b6');
  ao(g,286,54,28,9,'t',.5,'#2a2440');ao(g,286,54,5,50,'l',.45,'#2a2440');g.restore();
  /* peg rail with the old pack bags, a tether ring */
  wood(g,234,43,26,2.2,'#7a5632');R(g,240,44.6,1.6,3,'#5a4226');R(g,252,44.6,1.6,3,'#5a4226');
  for(const[bx,bw,bh,c]of[[238,7,17,'#4a4038'],[249,8,19,'#40362e']]){poly(g,[bx,48,bx+bw,48,bx+bw+.6,48+bh,bx+bw*.6,48+bh+2.4,bx-.4,48+bh],c);R(g,bx,48,bw,1,tint(c,.3));for(let j=2;j<bh;j+=2)for(let i=(j%4)/2;i<bw;i+=2.5)R(g,bx+i,48+j,1,.5,tint(c,.2));
    R(g,bx+2,48+bh*.45,3+r()*2,.8,W);R(g,bx+bw-3,48+bh*.7,.8,3,W);stroke(g,[bx+1,48+bh,bx+.4,48+bh+3.4],c,.6);stroke(g,[bx+bw-2,48+bh+1,bx+bw-1.6,48+bh+4.4],c,.6)}
  shade(g,[236,50,262,50,264,72,238,72],SH,.3);oval(g,232.5,85.5,2,2,'#5a5650');oval(g,232.5,85.5,1,1,W);
  /* paving */
  pave(g,0,104,320,144,'#d6c49a',r,{vx:160,vy:66,rows:5,step:34,v:.08});ao(g,0,104,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,105,320,39)});
  shade(g,[0,105,100,105,112,111,0,113],SH,.6);shade(g,[275,105,280,105,292,110,282,110],SH,.6);
  /* the vine arbor and the dappled shade under it */
  shade(g,[98,105,190,105,200,119,104,119],SH,.4);comp(g,'screen',.35,()=>{for(let i=0;i<40;i++){const sx=104+r()*88,sy=106.5+r()*11;oval(g,sx,sy,1.5+r()*3,.5+r()*.8,'#fff0c8')}});shade(g,[100,44,188,44,190,104,98,104],SH,.28);
  wood(g,106,42,3,64,'#6a4e2c',1);wood(g,176,42,3,64,'#6a4e2c',1);wood(g,99,40,88,3,'#7a5c36');for(let i=0;i<8;i++)wood(g,102+i*11.6,36.6,2.2,3.6,'#5a4226');
  stroke(g,[108.5,104,110,84,108.6,66,111,50,118,42],'#5a4630',1.2);stroke(g,[110,70,113,60,122,48],'#5a4630',.8);
  foliage(g,122,39,22,6.5,'#5f8a4a',r,90);foliage(g,160,38,26,7,'#6a9652',r,110);foliage(g,142,43,16,4,'#527c40',r,50);foliage(g,112,56,4,9,'#5f8a4a',r,20);
  for(const[vx,vy]of[[123,47],[150,48],[168,46],[136,49]])for(let k=0;k<7;k++)oval(g,vx+(k%3)-1,vy+Math.floor(k/3)*1.6+(k>5?1.4:0),1,1,k%2?'#6a3e68':'#4f2e52');
  /* bench and table in the shade */
  R(g,114,100,22,7,'rgba(40,30,60,.4)');wood(g,114,99,3,8,'#5a4226',1);wood(g,133,99,3,8,'#5a4226',1);wood(g,111.5,96,27,3.4,'#96703e');R(g,111.5,99,27,.8,'#5a4226');
  R(g,147,96,28,11,'rgba(40,30,60,.4)');wood(g,147,95,3,12.5,'#5a4226',1);wood(g,172,95,3,12.5,'#5a4226',1);wood(g,143.5,91,35,4,'#96703e');R(g,143.5,94.6,35,1,'#5a4226');
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
  stroke(g,[233,86.4,238,89,244,88],'#8a7a5a',.7);beast(g,262,110,-1,0,F.loaded?2:F.bagsOn?1:0)},
 front(){}};
/* ---------- Antioch: the colonnaded street under Mount Silpius ---------- */
ART.antioch={w:480,fp:1.3,
 paint(g){const r=rng(149),SH='#8f95c8',MB='#f4eede';
  sky(g,480,70,['#3a78c8','#66a0dc','#9cc4ea','#d4e4ee']);cloud(g,150,10,60,9,r);cloud(g,60,15,36,6,r);cloud(g,330,8,44,6,r);
  /* Mount Silpius, the city wall climbing over its shoulder */
  const mt=x=>{const k=x/480;return 10+36*k*k*(3-2*k)+3*Math.sin(x/21)+2*Math.sin(x/7)};ridge(g,0,480,66,mt,['#8ea27c','#a2b48c','#b6c29c']);
  for(let i=0;i<160;i++){const tx=r()*480,ty=66-r()*mt(tx)*.9;oval(g,tx,ty,1.4+r()*1.6,.8+r()*.6,r()<.5?'#7a906a':'#9cae84')}
  for(let x=170;x<480;x+=.5){const h=mt(x);R(g,x,66-h+3,.5,3.4,'#e6dcc4');if(Math.floor(x)%6<3)R(g,x,66-h+1.8,.5,1.2,'#e6dcc4');if(Math.floor(x)%62===0){R(g,x,66-h-1.6,4,8,'#efe6d0');R(g,x+3,66-h-1.6,1,8,'#b8b4bc')}}
  comp(g,'screen',.2,()=>R(g,0,20,480,46,'#c8d8ee'));
  /* the house of the congregation, and the gate to its courtyard */
  house(g,0,20,112,84,'#ecdcb4',r,{side:6,patch:4,cracks:6,beams:0});for(let i=0;i<116;i+=5.5){R(g,i,15,5,5.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,15,5,.6,'#e08a60');R(g,i+4.5,15,.6,5.5,'#7a3620')}
  for(const x of[72,90])windowArt(g,x,32,12,14,'#ecdcb4',{bars:2,wood:'#8a6a40'});
  R(g,14,42,48,62,'#d6c69e');R(g,14,42,48,2,'#f4e8c8');arch(g,20,52,36,52,'#c2b28c');g.save();arch(g,22,54,32,50);g.clip();R(g,22,54,32,50,'#e6d6ac');R(g,22,88,32,16,'#d6c49a');
  wood(g,28,66,2,24,'#6a4e2c',1);wood(g,46,66,2,24,'#6a4e2c',1);R(g,26,65,24,2,'#7a5c36');foliage(g,38,63,13,6,'#5f8a4a',r,50);ao(g,22,54,32,10,'t',.55,'#2a2440');ao(g,22,54,6,50,'l',.5,'#2a2440');g.restore();
  /* the colonnade: tiled roof, marble architrave, shops in its shade, a column every few paces */
  for(let i=112;i<430;i+=5.5){R(g,i,29.5,5,7.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,29.5,5,.7,'#e08a60');R(g,i+4.5,29.5,.6,7.5,'#7a3620')}
  g.fillStyle=lg(g,0,37,0,43.5,['#fdfaf0','#ece4d0','#c8c0ac']);g.fillRect(112,37,318,6.5);for(let i=114;i<430;i+=4)R(g,i,40.4,2,1.6,'#d2cab6');
  plaster(g,112,43.5,318,60.5,'#b9ae96',r,{patch:4,cracks:5,brick:'#8a7a62',t:.4});comp(g,'multiply',.75,()=>R(g,112,43.5,318,60.5,'#a8a8cc'));
  for(let x=131;x<420;x+=60){R(g,x-2.5,55.5,25,48.5,'#8a8296');arch(g,x,58,20,46,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');for(let i=0;i<3;i++)vessel(g,x+5+i*5,104,2,5+i,'#6a4636','jar',{noShadow:1});ao(g,x,58,20,14,'t',.6)}
  for(let x=116;x<436;x+=30){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cfc7b4',MB,'#fffdf4','#ded6c2','#aea8a4']);g.fillRect(x,45.5,7,56);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,47,.5,53,'rgba(120,112,104,.28)');R(g,x-1.2,43.5,9.4,2.6,MB);R(g,x-1.2,45.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#e2dac6');R(g,x-1.2,100.4,9.4,.6,'#fffdf4')}
  /* the south gate */
  ashlar(g,430,20,50,84,'#e4d6b0',r,{bw:13,bh:6.4,v:.09});for(let i=430;i<480;i+=8){R(g,i,15.5,5,4.5,'#e4d6b0');R(g,i,15.5,5,.5,'#f8eccc')}R(g,430,19.6,50,1,'#a8987a');poly(g,[430,15.5,424,19,424,104,430,104],'#a8a0b0');
  arch(g,438,54,36,50,'#c2b28c');gateView(g,440,56,32,48);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,456+Math.cos(a)*18-.3,72+Math.sin(a)*18-1,.6,2.6,'#a8987a')}
  /* paving of pale stone */
  pave(g,0,103,480,144,'#e6dfce',r,{vx:240,vy:62,rows:5,step:36,v:.07,joint:'#a8a092'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,112,104,124,111,0,113],SH,.6);shade(g,[112,104,430,104,436,108,118,108],SH,.4);shade(g,[424,104,430,104,444,110,432,110],SH,.6);
  /* Xanthe's thread stall */
  shade(g,[150,104,230,104,238,112,158,112],SH,.55);wood(g,152,50,2.4,56,'#6a4e2c',1);wood(g,226,50,2.4,56,'#6a4e2c',1);wood(g,150,52.4,80,2,'#7a5c36');awning(g,149,44,82,8,'#e2d2a8','#b06a4a',8);
  [[160,'#e6dcc0'],[169,'#8a6a40'],[178,'#3a302a'],[187,'#e6dcc0'],[197,'#a8503a'],[207,'#c9a23a'],[217,'#5a7a5a']].forEach(([x,c])=>{R(g,x+.2,54.4,.6,3,'#5a4226');
    g.fillStyle=lg(g,x-3,0,x+4,0,[tint(c,-.3),c,tint(c,.25),tint(c,-.2)]);g.beginPath();g.ellipse(x+.5,63.5,3.4,6.4,0,0,6.2832);g.fill();for(let j=0;j<5;j++)stroke(g,[x-2.2+j*1.2,58.4,x-1.8+j*1.1,68.6],tint(c,-.35),.4)});
  R(g,160,94,58,11,'rgba(40,30,60,.4)');wood(g,160.6,94,3,11.5,'#6a4e2c',1);wood(g,214,94,3,11.5,'#6a4e2c',1);wood(g,157.5,88,63,4.4,'#96703e');R(g,157.5,92,63,1.2,'#5a4226');
  ['#e6dcc0','#d8c9a0','#8a6a40','#e6dcc0','#3a302a'].forEach((c,i)=>{const sx=164+i*7;g.fillStyle=lg(g,sx,0,sx+4,0,[tint(c,.2),c,tint(c,-.3)]);g.fillRect(sx,83,4,5);R(g,sx-.8,82.2,5.6,1,'#8a5a2c');R(g,sx-.8,87.2,5.6,1,'#6a4020')});
  vessel(g,208.5,88,8,5,'#8a6a34','bowl',{noShadow:1});for(let k=0;k<9;k++)oval(g,203+(k%5)*2.6,82+(k>4?-1.6:0),2,1.5,k%2?'#f4ecd6':'#e0d6bc');
  /* the fountain */
  oval(g,268,106,20,2.4,'rgba(40,30,60,.4)');g.fillStyle=lg(g,260,0,274,0,['#c8c0ac','#f0eada','#b4aca0']);g.fillRect(260,62,14,32);R(g,258,59.6,18,3,MB);R(g,258,62.4,18,.6,'#a8a094');
  R(g,264.6,75,5,4,'#8a8474');oval(g,267,77,1.4,1.4,'#3a3630');
  g.fillStyle=lg(g,250,0,284,0,['#bcb4a0','#eee8d8','#d6cebc','#9c968c']);g.fillRect(250,92,34,13);R(g,249,91,36,2.2,MB);R(g,249,93,36,.6,'#a8a094');R(g,252,93.6,30,1.8,'#5f9cc0');R(g,250,103.4,34,1.6,'#a8a094');
  /* Theron's pottery stall */
  shade(g,[310,104,398,104,406,112,318,112],SH,.55);wood(g,312,48,2.6,58,'#6a4e2c',1);wood(g,393,48,2.6,58,'#6a4e2c',1);awning(g,309,42,90,9,'#3f6a8a','#ece4d0',8);
  wood(g,317,66,74,2.2,'#7a5c36');['#a05a34','#8a4a2a','#b86a3c','#7a3d24','#a05a34','#c07a48'].forEach((c,i)=>vessel(g,323+i*12,66,3.6+(i%2)*.6,10-(i%3),c,['jar','amph','jug'][i%3],{noShadow:1}));
  boards(g,316,91,78,14,7,'#7a5c36',r);wood(g,314,88,82,3.6,'#96703e');R(g,314,91.2,82,1,'#4a3620');
  vessel(g,324,88,4,10,'#b86a3c','jar',{noShadow:1});vessel(g,337,88,3.6,9,'#8a4a2a','jug',{noShadow:1});for(let i=0;i<3;i++)vessel(g,356.5,88-i*1.8,6-i*.6,2.6,i%2?'#a05a34':'#c07a48','bowl',{noShadow:1});
  vessel(g,373,88,4,9,'#a05a34','amph',{noShadow:1});vessel(g,384,88,3.6,10,'#7a3d24','jar',{noShadow:1});vessel(g,404.5,106,6,19,'#a05a34','pithos');vessel(g,417,106,4.6,13,'#8a4a2a','jar');
  pool(g,80,0,300,160,'#fff0c0',.14,'screen');ao(g,340,0,140,144,'r',.08,'#2a2050')},
 fore(g){const r=rng(150);/* passers-by have left their loads at the street's edge: baskets, a jar, and the base of the next column */
  g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  for(const[bx,bw,bh]of[[52,13,11],[494,15,13]]){vessel(g,bx,148,bw,bh,'#6a5230','bowl',{noShadow:1});for(let i=0;i<12;i++)oval(g,bx-bw+3+r()*(bw*2-6),148-bh-r()*2.4,1.8,1.4,r()<.5?'#a8503a':'#c9a23a')}
  vessel(g,518,152,10,30,'#5a2e1e','amph',{noShadow:1});comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){const f=t/90;R(g,266.2,79,1.8,14,'#a8d8ec');for(let i=0;i<4;i++)R(g,266.2,79+((f+i*3.6)%14),1.8,1.4,'#f0fafe');
  for(let i=0;i<4;i++){const k=((t/400+i*.25)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(267.1,94.5,1.5+k*9,.3+k*.7,0,0,6.2832);g.stroke()}},
 front(){}};
/* ---------- The road south (ending) ---------- */
ART.road={w:320,paint(g){const r=rng(167);
  sky(g,320,96,['#3f7ecc','#6ea6de','#a2c8ea','#dbe6ea','#dbe6ea']);cloud(g,222,13,62,9,r);cloud(g,146,25,40,6,r);cloud(g,60,10,30,5,r);
  ridge(g,0,320,80,x=>20+8*Math.sin(x/41+2)+4*Math.sin(x/13),['#9cacca','#b4c0d4']);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,44,0,82,['rgba(208,220,238,0)','rgba(208,220,238,1)']);g.fillRect(0,44,320,38)});
  /* Antioch behind us, under its mountain */
  ridge(g,0,170,80,x=>Math.max(0,36-x*x/760+2*Math.sin(x/9)),['#8ea27c','#a6b68e']);for(let x=0;x<118;x+=.5){const h=36-x*x/760+2*Math.sin(x/9);R(g,x,80-h+3,.5,2.6,'#e6dcc4');if(Math.floor(x)%5<2)R(g,x,80-h+2,.5,1,'#e6dcc4')}
  ashlar(g,0,62,116,18,'#e2d6b8',r,{bw:9,bh:4,v:.07,t:.25});for(let i=0;i<116;i+=7)R(g,i,59,4,3.4,'#e2d6b8');
  R(g,86,52,14,28,'#ece2c6');for(let i=86;i<100;i+=5)R(g,i,49,3,3.4,'#ece2c6');R(g,97,52,3,28,'#bcb8c0');arch(g,89.6,66,6.8,14,'#4a4050');
  for(const[hx,hy,hw,hh]of[[14,54,16,8],[40,50,20,12],[64,55,12,7]]){R(g,hx,hy,hw,hh,'#ece2c6');R(g,hx,hy-2,hw,2.2,'#b8603c');R(g,hx+hw-3,hy,3,hh,'#bcb8c0')}
  /* fields and olive groves */
  ridge(g,0,320,110,x=>28+6*Math.sin(x/50+1)+3*Math.sin(x/17+2),['#a8be84','#96b074']);ridge(g,0,320,110,x=>13+4*Math.sin(x/33)+2*Math.sin(x/11),['#8eaa6c','#80a060']);
  for(let i=0;i<8;i++){const fx=20+i*38+r()*10;poly(g,[fx,92,fx+22,90,fx+26,98,fx+2,100],i%2?'rgba(200,190,110,.35)':'rgba(110,150,80,.35)')}
  for(const[x,y]of[[150,88],[176,93],[204,86],[262,90],[300,95],[30,92],[70,96],[232,99]]){oval(g,x+2,y+3.6,6,1.2,'rgba(50,60,90,.35)');R(g,x-.4,y+1,1.2,3,'#5a4630');foliage(g,x,y-.6,5.4,3.4,'#6f8a58',r,24)}
  cypress(g,238,98,11);cypress(g,128,100,10);cypress(g,134,101,7);
  /* the road, and the verge nearest us */
  g.fillStyle=lg(g,0,106,0,127,['#d2c298','#e6d8b0','#dccca2']);g.fillRect(0,106,320,21);tex(g,'mott',.45,0,106,320,21,'overlay',1);R(g,0,106,320,.8,'#a89a74');
  for(let i=0;i<60;i++){const sx=r()*320,sy=108+r()*17;oval(g,sx,sy,1+r()*1.6,.5+r()*.4,r()<.5?'#bcae86':'#f0e4c0')}
  for(let i=0;i<2;i++)stroke(g,[0,113+i*7,80,112.6+i*7,200,113.6+i*7,320,113+i*7],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,126,0,144,['#86a064','#6c8a50','#56743e']);g.fillRect(0,126,320,18);tex(g,'mott',.5,0,126,320,18,'overlay',1);
  for(let i=0;i<220;i++){const sx=r()*320,sy=127+r()*17;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#9ab878':'#4f6c3a',.5)}
  for(let i=0;i<22;i++){const sx=r()*320,sy=130+r()*12;oval(g,sx,sy,.9,.9,r()<.5?'#e8d070':'#e0e0f0')}
  /* a milestone */
  oval(g,275,108.6,6,1.2,'rgba(50,40,90,.35)');g.fillStyle=lg(g,270,0,276,0,['#b8b0a0','#eee8dc','#a8a094']);g.fillRect(270,95.5,6,13);oval(g,273,95.6,3,1.4,'#eee8dc');R(g,271.6,99,2.8,.6,'#8a8474');R(g,271.6,101,2.8,.6,'#8a8474');
  pool(g,60,0,300,150,'#fff0c0',.14,'screen')},
 fore(g){const r=rng(168);foliage(g,14,138,22,9,'#3f5a34',r,120);foliage(g,304,140,20,8,'#3a5430',r,100);for(let i=0;i<30;i++){const sx=r()*320;stroke(g,[sx,144,sx+(r()-.5)*4,136-r()*5],'#34502c',.8)}},
 draw(){},front(){}};
function roadScene(g,t){backdrop(g,'road');const x=-50+420*((G.trek||{}).k||0),f=Math.floor(t/150)%4;
  man(g,x+46,121,'barnabas',1,f);beast(g,x+8,120,1,f,2);man(g,x-30,122,'paul',1,(f+2)%4);g.drawImage(fg('road'),0,0,320,VH)}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  kleon:{skin:'#a87048',wrap:'#c8a050',beard:'#3a2a1a',tunic:'#7a5a3e',stripe:'#644830',belt:'#2e2016',trim:'#4a3424',brow:'#2a1a12',ph:1100},
  agabus:{skin:'#b88458',hair:'#8e8e8e',beard:'#a6a6a6',longBeard:1,brow:'#6e6e6e',tunic:'#a8b0a0',cloak:'#5a4634',long:1,belt:'#4a3a24',ph:2300},
  lucius:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',trim:'#8a6a1a',brow:'#120c0a',ph:3100},
  xanthe:{skin:'#c89a70',veil:'#5a7a5a',tunic:'#a86a4a',long:1,belt:'#d8c9a0',slim:1,longSleeve:1,trim:'#d8c9a0',brow:'#3a2414',ph:400},
  theron:{skin:'#c49268',hair:'#5a4630',tunic:'#e8e0cc',belt:'#8a4a2a',trim:'#3f6a8a',ph:2700}});
const BN=actor('barnabas','Barnabas','#f0b070',128),KL=actor('kleon','Kleon','#e0b470',112),AG=actor('agabus','Agabus','#dfe4d0',104),LU=actor('lucius','Lucius','#f2cc5a',120),
  XA=actor('xanthe','Xanthe','#b4e0a4',240),TN=actor('theron','Theron','#a4d0ee',165);
SFX.bray=()=>{tone({f:520,to:300,d:.22,type:'sawtooth',v:.06});tone({f:230,to:150,t:now()+.24,d:.4,type:'sawtooth',v:.07})};
Object.assign(ICON,{
  loops(g){for(let k=0;k<3;k++){const x=4.6+k*5.6,y=4.6+k*2;g.lineWidth=2.2;g.strokeStyle='#6a4424';g.beginPath();g.ellipse(x+2.4,y+5.6,2.2,5.2,0,0,6.2832);g.stroke();g.lineWidth=1.2;g.strokeStyle='#b07a48';g.stroke();
      stroke(g,[x+.6,y+2.6,x+.6,y+8.4],'#deb07a',.5);R(g,x+1,y+10.2,2.8,1.4,'#7a4e28')}},
  tent(g){IH.roll(g,'#2a211c',8.4,8.6);for(const x of[8,15]){R(g,x,7.6,1.8,10.2,'#b89a5a');R(g,x,7.6,.6,10.2,'#dcc080')}stroke(g,[8.8,7.6,7.2,4.6],'#b89a5a',.8);stroke(g,[15.8,7.6,17.6,5],'#b89a5a',.8)},
  panels(g){IH.square(g,'#221a16',4,4.6,13,9.4);IH.square(g,'#2e2620',8,10.6,13,9.4);R(g,8,10.6,13,.7,'#5a4e42');R(g,4,4.6,13,.7,'#4a4038')},
  spool(g){g.fillStyle=lg(g,6.6,0,17.4,0,['#c4b894','#f4ecd6','#e6dcc0','#a89c7a']);g.fillRect(6.6,6.2,10.8,12);for(let i=0;i<7;i++)R(g,6.6,7+i*1.7,10.8,.6,'rgba(120,108,76,.45)');
    for(const y of[4,17.8]){g.fillStyle=lg(g,4.6,0,19.4,0,['#6a4020','#b07a44','#8a5a2c','#4a2c14']);g.fillRect(4.6,y,14.8,2.4);R(g,4.6,y,14.8,.6,'#c8945a')}stroke(g,[17.4,12.6,19.6,16,21,21.4],'#efe6cc',.8)},
  bags(g){R(g,3.6,6.4,16.8,4,'#3e332a');R(g,3.6,6.4,16.8,.7,'#5a4e42');for(const x of[2.8,13]){const p=[x,10,x+8.2,10,x+8.6,19.4,x+6.4,21.4,x+1.8,21.4,x-.4,19.4];clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,x,0,x+9,0,['#3a2e26','#221a16','#120d0b']);g.fillRect(x-1,10,10,12);
        for(let j=0;j<12;j+=1.6)for(let i=(j*2%3);i<10;i+=3)R(g,x-1+i,10+j,1,.5,'#4a3e34')});R(g,x,10,8.2,.7,'#5a4e42')}
    R(g,6,6.4,1.4,5.6,'#9a7448');R(g,16.6,6.4,1.4,5.6,'#9a7448')},
  wages(g){IH.bag(g,'#b08a56',11.6,15,6.2,5.4);R(g,10.6,5.6,2,2.8,'#c9a14a');for(const[x,y,c]of[[19,20.4,'#d8d8e4'],[5,20.8,'#c4c4d2'],[20.4,17.6,'#e4e4f0']]){oval(g,x,y,2.6,1.2,'#7a7a8a');oval(g,x,y-.5,2.6,1.2,c);stroke(g,[x-1.4,y-.7,x+.8,y-1],'#ffffff',.4)}}});
Object.assign(ITEMS,{
  loops:{name:'leather loops',look:'Loops of thick oxhide. Sewn to the hem, they will hold a tent peg against any mountain wind.'},
  tent:{name:'finished tent',look:"Kleon's tent, rolled and tied. Every seam doubled, and leather at every peg."},
  bolt:{name:'goat-hair cloth',icon:'cloth',look:'The last of the goat-hair cloth I carried from Tarsus. It swells in the rain and sheds it.'},
  panels:{name:'cloth panels',look:'Goat-hair cloth, cut into panels for a pair of pack bags.'},
  spool:{name:"Xanthe's thread",look:'Waxed linen thread, doubled and strong. Xanthe gave the best spool she had.'},
  bags:{name:'pack bags',look:'Two deep bags of goat-hair cloth, joined by a broad band to lie across a pack saddle.'},
  wages:{name:'my savings',look:'A little silver: what my awl has earned this year in Antioch, beyond my needs.'}});
async function sewBags(){if(!has('spool'))return say(P,'I have the cloth and the awl, but my own spool is bare. I need strong thread, and a good deal of it.');
  SFX.sew();await say(P,'Two deep pockets, and a broad band between them to lie across the pack saddle...');SFX.sew();await wait(800);
  delItem('panels');delItem('spool');addItem('bags',1);F.bags=1;SFX.good();
  await say(P,'Goat-hair cloth swells in the rain and sheds it. Whatever the road brings, the grain will arrive dry.')}
Object.assign(COMBO,{
  'bolt+knife':async()=>{SFX.cut();await say(P,'Two broad panels, two narrow, and one long band. Following the weave.');delItem('bolt');addItem('panels');F.cutBolt=1},
  'awl+panels':sewBags,'panels+spool':sewBags,
  'awl+bolt':()=>say(P,'The cloth must be cut to shape before any stitching.'),'bolt+spool':()=>say(P,'The cloth must be cut to shape before any stitching.'),
  'awl+spool':()=>say(P,'Threaded and ready. Now, what needs stitching?'),
  'knife+panels':()=>say(P,'They are cut true already.'),'knife+spool':()=>say(P,'I will cut the thread as I sew, and not before.'),
  'awl+bags':()=>say(P,'Every seam is doubled. They are finished.'),'bags+knife':()=>say(P,'After all that work? No.'),
  'awl+loops':()=>say(P,"The loops belong on the hem of Kleon's tent."),'loops+thread':()=>say(P,"The loops belong on the hem of Kleon's tent."),
  'knife+loops':()=>say(P,'They are the right length already.'),'knife+tent':()=>say(P,'After a week of sewing? No.'),
  'awl+tent':()=>say(P,'It needs an owner now, not another stitch.'),'tent+thread':()=>say(P,'It needs an owner now, not another stitch.')});
function setup3(){BN.hs=BN3;place(BN,'tarsus',112,124,1);place(KL,'tarsus',224,119,-1);place(AG,'court',116,115,1);place(LU,'court',187,113,-1);
  place(XA,'antioch',190,116,1);place(TN,'antioch',354,116,-1);G.meet=0;G.trek=null;G.inv=['awl','thread','knife','tablets'];drawInv()}
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'kleon',q:"Kleon's caravan leaves at noon.",if:()=>F.metKleon&&!F.sold},
  {id:'famine',q:'Agabus foretold a great famine.',if:()=>G.room!=='tarsus'},
  {id:'thread',q:'I have no thread to sew the new bags.',if:()=>G.room!=='tarsus'&&!F.gotSpool}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const ant=()=>G.room!=='tarsus';
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>ant()?'A good man, and full of faith. A whole year we have taught side by side.':'He came all the way to Tarsus, searching every row of stalls for me.'},
    {name:'Kleon',note:'A caravan master, bound over the mountains. His tent is promised for noon.',if:()=>F.metKleon&&!ant()},
    {name:'Agabus',note:'A prophet from Jerusalem. He foretold a great famine.',if:ant},
    {name:'Lucius',note:'Lucius of Cyrene, a teacher here. He keeps the tally of the gifts.',if:ant},
    {name:'Theron',note:'A potter in the colonnaded street. He came to believe in that very street.',if:ant},
    {name:'Xanthe',note:'A widow who spins thread for her living. She came to believe this year.',if:ant}],
  tasks:[
    {t:"Close the last seam of Kleon's tent.",if:()=>!ant()&&!F.seam},
    {t:'Give the hem something a peg will not tear through.',if:()=>!ant()&&!F.loopsOn},
    {t:'Hand Kleon his tent, as I promised.',if:()=>!ant()&&!F.sold},
    {t:'Go with Barnabas to Antioch.',if:()=>!ant()&&F.sold},
    {t:'Make new pack bags for the relief.',if:()=>ant()&&!F.bags},
    {t:'Find strong thread to sew them with.',if:()=>ant()&&!F.gotSpool&&!F.bags},
    {t:'Put the bags on the donkey.',if:()=>ant()&&!F.bagsOn},
    {t:'See the gift counted and sealed before the brothers.',if:()=>ant()&&!F.sealed}],
  scripture:[
    {ref:'Psalm 15:4',text:'He does not go back on his promise, even when it is bad for him.'},
    {ref:'Ecclesiastes 4:9, 10',text:'Two are better than one because they have a good reward for their hard work. For if one of them falls, the other can help his partner up.'},
    {ref:'Proverbs 3:27',text:'Do not withhold good from those to whom you should give it If it is within your power to help.'},
    {ref:'Deuteronomy 15:11',text:'You should generously open up your hand to your afflicted and poor brother in your land.'}]};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
const tentNeeds=()=>!F.seam?'The last seam still gapes open. It needs closing, with awl and thread.':!F.loopsOn?'The seam is closed. The hem still needs loops for the pegs, of something tougher than cloth.':'';
async function sewSeam(){
  await say(P,'Barnabas, take that edge and hold it taut.');await walk(BN,146,113);BN.dir=1;
  await say(BN,'Like this? I am a Levite, Saul, not a tentmaker.');SFX.sew();await wait(800);SFX.sew();
  await say(P,'A flat seam, doubled over, so that no wind finds a way in.');F.seam=1;SFX.good();
  await say(BN,'Closed, from top to bottom. I can hardly see where it was.');await walk(BN,112,124);BN.dir=1}
async function sewLoops(){SFX.sew();await say(P,'One loop at every peg, and each stitched through twice...');SFX.sew();await wait(700);
  delItem('loops');F.loopsOn=1;SFX.good();await say(P,'Leather will hold where cloth tore. Now it is a tent I can put my name to.')}
async function leave3(){
  if(!F.sold){await say(P,'The road to Antioch. And I will take it.');return say(P,"But not with a promise left unfinished behind me. First, Kleon's tent.",TH)}
  await say(BN,'Your word is kept, Saul. Now will you come?');
  await say(P,'I will. My tools, and my last bolt of goat-hair cloth: a tentmaker does not travel empty-handed.');
  await say(P,'Tarsus is no obscure city. But my road does not end here.');
  walk(BN,276,116);await walk(P,292,112);await fade(1,700);const o={dur:7500};
  await narr('After he found him, Barnabas brought him to Antioch in Syria. (Acts 11:25, 26)',o);
  await narr('For a whole year they assembled with the congregation there and taught quite a crowd. (Acts 11:26)',o);
  await narr('It was first in Antioch that the disciples were by divine providence called Christians. (Acts 11:26)',o);
  await narr('In those days prophets came down from Jerusalem to Antioch. One of them was named Agabus. (Acts 11:27, 28)',o);
  G.meet=1;enterRoom('court',112,126,1);G.inv=CHAP[3].inv('court');drawInv();codeBtn();
  place(BN,'court',86,122,1);place(LU,'court',140,118,1);place(XA,'court',62,130,1);place(TN,'court',40,124,1);place(AG,'court',204,118,-1);await fade(0,700);
  await narr('Antioch. The congregation has gathered in the courtyard, as it has all this year.',{dur:4200});
  await say(AG,'Brothers and sisters. I must tell you what has been made known through the spirit.');
  await say(AG,'A great famine is about to come on the entire inhabited earth.');
  await say(TN,'On the whole earth? Then on Antioch too.');
  await say(LU,'And on Judea hardest of all. Many of the brothers there had little even before this.');
  await say(TN,'Then let us not wait until they are hungry. I will send what I can spare.');
  await say(LU,'So will my household. Let each one decide what he can afford, and let no one be pressed.');
  await say(BN,'And when it is gathered?');
  await say(LU,'Jerusalem sent you to us, Barnabas. Who better to carry our answer back? You, and Saul with you.');
  await say(P,'Gladly.');
  await narr('The disciples determined to send relief to the brothers living in Judea, each according to what he could afford. (Acts 11:29)',o);
  await fade(1,600);G.meet=0;place(XA,'antioch',190,116,1);place(TN,'antioch',354,116,-1);place(LU,'court',187,113,-1);place(AG,'court',116,115,1);
  place(BN,'court',92,124,1);place(P,'court',146,128,-1);
  await narr('In the days that followed, the gifts came in.',{dur:3200});await fade(0,600);
  await say(BN,'Look at it, Saul. Grain, figs, oil, silver: from Jews and Greeks alike.');
  await say(BN,'But it has weeks of road ahead of it, and our old pack bags are rotten through.');
  await say(LU,'And nothing leaves this courtyard uncounted. I am keeping the tally here at the table.');
  await say(P,'Then there is work here for a tentmaker. I have goat-hair cloth, a knife and an awl...');
  await say(P,"...and not an arm's length of thread. My spool ran out days ago.",TH)}
ROOMS.tarsus={walk:[16,304,110,138],mood:'calm',amb:{birds:.5,crowd:.25,wind:.2,hammer:.35},hs:[
  {name:'Taurus mountains',x:118,y:22,w:150,h:26,wx:190,look:['The Taurus mountains, with snow on them even now.','The road through the Cilician Gates climbs straight into them. Kleon will need a sound tent up there.']},
  {name:'my workshop',x:12,y:52,w:94,h:34,wx:58,wy:113,look:'My stall and workshop. Tents have gone out from under this awning to half of Cilicia.'},
  {name:'awning',x:4,y:40,w:112,h:11,wx:58,wy:113,look:'Goat-hair cloth of my own sewing. It has kept sun and rain off this bench for years.',pickup:'It can stay. Whoever takes this stall after me will be glad of it.'},
  {name:'workbench',x:14,y:86,w:80,h:19,wx:58,wy:113,look:'My workbench. The marks of every tent I have cut are on it.'},
  {name:'leather hide',x:20,y:84,w:28,h:14,wx:36,wy:113,vis:()=>!F.gotLoops,look:'A piece of oxhide, thick and well tanned. Tougher than any cloth.',
    pickup:'I do not need the whole hide. A few strips of it, perhaps, cut to length.',use:'It would take a blade to make anything of it.',
    useWith:async it=>{if(it==='awl'||it==='thread')return say(P,'It must be cut before anything can be sewn.');if(it!=='knife')return false;
      SFX.cut();F.gotLoops=1;addItem('loops');await say(P,'Seven strips, each doubled into a loop. One for every peg.')}},
  {name:'bolt of goat-hair cloth',x:50,y:80,w:36,h:9,wx:68,wy:113,look:'My last bolt of goat-hair cloth. Cilicium, they call it, after this province.',pickup:"It comes with me when I go. But first, Kleon's tent.",
    useWith:async it=>it==='knife'?say(P,'I will not cut it without a purpose. The tent needs leather now, not more cloth.'):false},
  {name:'tent',x:139,y:56,w:55,h:50,wx:182,wy:113,dir:-1,vis:()=>!F.gotTent,get def(){return F.seam&&F.loopsOn?'pickup':'look'},
    look:()=>say(P,tentNeeds()||'Finished. Every seam doubled, and leather at every peg. Kleon will not be let down by it.'),
    use:()=>say(P,tentNeeds()||'It is finished. It only needs rolling up and handing over.'),
    pickup:async()=>{const n=tentNeeds();if(n){await say(P,'I promised Kleon a finished tent, not most of one.');return say(P,n)}
      await fade(1,200);F.gotTent=1;addItem('tent');await fade(0,200);await say(P,'Rolled tight and tied. A week of work, and it sits on one shoulder.')},
    useWith:async it=>{if(it==='loops')return sewLoops();if(it==='knife')return say(P,'Cut it? I have spent a week sewing it.');
      if(it!=='awl'&&it!=='thread')return false;
      if(!F.seam)return sewSeam();if(has('loops'))return sewLoops();
      return say(P,F.loopsOn?'It is finished. Not one more stitch.':'The seam is closed. Now the hem needs loops for the pegs, of something tougher than cloth.')}},
  {name:'tent frame',x:139,y:52,w:55,h:54,wx:182,wy:113,dir:-1,vis:()=>F.gotTent,look:'The frame stands empty. A strange sight, after all these years.'},
  {name:'pack mule',x:227,y:68,w:42,h:42,wx:240,wy:122,look:"Kleon's lead mule, loaded for the mountain road and impatient to be gone.",pickup:'It is not mine. And I think it bites.',
    talk:async()=>{SFX.bray();await say(P,'It has nothing to say that Kleon has not said already.')}},
  {name:'east gate',x:274,y:50,w:42,h:54,wx:292,wy:112,dir:1,look:'The east gate. Beyond it the road runs on to Antioch in Syria.',exit:()=>leave3()}]};
KL.hs={name:'Kleon',actor:KL,look:()=>say(P,F.sold?'Kleon, well pleased with his tent, and making ready to leave.':'Kleon, a caravan master. His mules are loaded, and he keeps looking at the sun.'),
  show:{awl:'An awl is not a tent, tentmaker.',thread:()=>say(KL,F.seam?'Thread? The seam is closed. Now see to the pegs!':'Thread. Good. Is that seam closed yet? I can see daylight through it.'),
    knife:'Cut me nothing, tentmaker. Finish me something.',loops:'Leather! A peg will not tear through that. Sew them on, and quickly.',
    tablets:'Write this down: one tent, due at noon.',
    '*':'Keep your tools, tentmaker. It is my tent I am waiting for.'},
  give:async it=>{if(it!=='tent')return false;
    await say(P,'Your tent, Kleon. Finished, as I said it would be.');
    await say(KL,'Let me see... Leather at every peg. And a seam I cannot find with my thumbnail.');
    delItem('tent');F.sold=1;SFX.good();
    await say(KL,'A man came to fetch you away, and still you would not hurry it. Here is your price, in full.');
    await say(P,'And there is your tent, in full. Peace to you on the mountain road.');
    await say(P,'My word is kept. Now I am free to give another.',TH)},
  talk:async()=>{if(F.sold)return say(KL,'May your road be as sound as your seams, tentmaker.');
    if(!F.metKleon){F.metKleon=1;await say(P,'Peace to you, Kleon. Your tent is nearly ready.');
      await say(KL,'Nearly is no shelter in the Cilician Gates, tentmaker. My caravan leaves at noon.');
      await say(KL,'The last tent I bought tore loose at the pegs in the first mountain wind. Make this one hold.');
      await say(P,'It will. You have my word.')}
    await talkTree([
      {q:'What does the tent still lack?',a:()=>say(KL,!F.seam?'You tell me! I can see daylight through the front of it.':!F.loopsOn?'Something at the hem that a peg will not tear through. Cloth loops are no good to me.':'Nothing that I can see. Roll it up and hand it over!')},
      {q:'Where is your caravan bound?',a:async()=>{await say(KL,'Up through the Gates to Iconium, and on from there. Cold roads.');await say(KL,'Up there a man lives or freezes by his tent.')}},
      {q:'A friend has come to take me to Antioch.',once:1,a:async()=>{await say(KL,'Then Tarsus loses a good needle. But you finish mine first!');await say(P,'I will. I said so.')}},
      {q:'I will get back to work.',bye:1}])}};
const BN3={name:'Barnabas',actor:BN,
  look:()=>say(P,G.room==='tarsus'?'Barnabas. He walked the length of Tarsus to find one tentmaker.':'Barnabas. A year of work side by side, and he still gives everyone else the credit.'),
  show:{awl:()=>say(BN,G.room==='tarsus'?(F.seam?'Put it to work, brother. Kleon is watching the sun.':'Your awl, and that open seam. Tell me where to hold.')
      :F.gotSpool?'A good awl and good thread. The rest is your trade, brother.':'Your awl, and no thread on it. Xanthe the spinner keeps a stall out in the street.'),
    thread:'Thread for the tent? Then let us finish it before noon.',
    knife:()=>say(BN,G.room==='tarsus'?"What will you cut? Kleon's last tent tore loose at the pegs, he says.":'Cloth to cut, and bags to make. I will leave that to the tentmaker.'),
    loops:'Leather loops! A peg will not tear through those.',tent:'It is Kleon who is waiting for that, not I.',
    bolt:'Your last goat-hair cloth from Tarsus. Bags of that would shed the rain all the way to Judea.',
    panels:'Bags already, nearly. They only want sewing.',spool:"Xanthe's thread! So she did have something to give.",
    bags:'Fine work! Hang them on the donkey, and let us see them filled.',wages:'Lucius keeps the tally, brother. Give it to him.',
    tablets:()=>say(BN,G.room==='tarsus'?'Still scratching notes into the wax, Saul? Write this down: Barnabas is waiting.':'Put the relief on your list, brother. It is the most important thing on it.'),
    '*':'Keep it, brother. You will find a use for it.'},
  ask:{kleon:'Then we had better work faster than we talk. Show me where to hold.',
    famine:['And Antioch answered before anyone in Judea went hungry.','I have seen many congregations, Saul. I have not often seen that.']},
  talk:()=>G.room==='tarsus'?(F.sold?say(BN,'Your word is kept, Saul. The east gate, and then the road.'):talkTree([
      {q:'Why come all this way for me?',a:async()=>{await say(BN,'A great number in Antioch have believed, Saul. Greek-speaking people, many of them, who never sat in a synagogue.');
        await say(BN,'They need someone who knows the Scriptures and can reason with Greeks. I thought of one man.')}},
      {q:'How did you find me?',a:async()=>{await say(BN,'Not quickly! I asked at the synagogue, at the river harbor, and along every row of tentmakers in Tarsus.');await say(BN,'You were at the last stall of the last row.')}},
      {q:'First I must finish this tent.',a:()=>say(BN,!F.seam?'Of course. I would think less of you if you did not. Start on that open seam, and tell me where to hold.':
        !F.loopsOn?'Kleon says his last tent tore loose at the pegs. What do you have that is stronger than cloth?':'It looks finished to me. Kleon is waiting for it.')},
      {q:'Give me a little time, brother.',bye:1}])):talkTree([
    {q:'What does the relief still need?',a:async()=>{const n=[];if(!F.bagsOn)n.push(F.bags?'the new bags hung on the donkey':'new pack bags to carry it');if(!F.sealed)n.push('the tally closed and the purse sealed');
      await say(BN,n.length?'It still needs '+n.join(', and ')+'.':'Nothing more. We are ready.');
      if(!F.gotSpool)await say(BN,'For thread, try Xanthe the spinner, out in the street. Though she has not come near the courtyard since the gifts began.')}},
    {q:'Why send it by the two of us?',a:async()=>{await say(BN,'Jerusalem knows me, and Antioch knows us both. A gift should travel with men whom both ends can trust.');await say(BN,'And two can vouch for each other. I would not want to carry it alone.')}},
    {q:'I am glad you came looking for me.',once:1,a:()=>say(BN,'So am I. There has not been one day of this year that I regretted that walk.')},
    {q:'Back to work.',bye:1}])};
/* ---------- The courtyard ---------- */
async function seal(){
  await say(P,'Lucius, add this to the gift. It is what my awl has earned this year, beyond my needs.');
  await say(LU,'You are already carrying it all to Judea, Saul. Is that not gift enough?');
  await say(P,'Carrying it is my assignment. This is my gift. Each according to what he can afford.');delItem('wages');SFX.pick();
  await say(LU,'Then that is every gift. Take the purse as it is, brother. You are trusted here.');
  await quiz(LU,'Shall I simply hand it over to you?',[
    {q:'Thank you. Barnabas and I will keep a careful count on the road.',r:['I am sure you would. But what could you show a man in Judea who asked how much left Antioch?']},
    {q:'Count it before the brothers, write the sum twice, and seal the purse.',ok:1,
      p:['Not as it is. Count it here, before the brothers, and write the sum twice: one list to stay in Antioch, one to travel with the purse. Then seal it.',
        'We care for everything honestly, not only in the sight of Jehovah but also in the sight of men.'],r:['Well said. Then let us do exactly that.']},
    {q:'As you think best. Among brothers, trust is seal enough.',r:['Here, yes. But this gift will pass through many hands before it is bread on a table.']}]);
  await fade(1,300);F.sealed=1;await narr('The silver is counted aloud before the brothers. The sum is written on two tablets, and the purse is tied and sealed.',{dur:6500});await fade(0,300);SFX.good();
  await say(LU,'One tablet stays here, and one goes with you. No one will be able to find fault with this gift, or with the men who carry it.');return checkFinal3()}
async function loadBags(it){if(it==='bolt'||it==='panels')return say(P,'Loose cloth carries nothing. It must be sewn into bags first.');if(it!=='bags')return false;
  SFX.creak();delItem('bags');F.bagsOn=1;await say(P,'Easy, friend. Across the saddle, and the girth drawn snug.');
  await say(BN,'They hang as if they had grown there. And room in them for every sack.');return checkFinal3()}
async function checkFinal3(){if(F.bagsOn&&F.sealed)return finale3();
  return say(BN,F.bagsOn?'Now only the tally is still open. Lucius is waiting at the table.':'Counted and sealed. Now it only needs something to travel in.')}
ROOMS.court={walk:[16,304,112,138],mood:'calm',amb:{birds:.6,leaves:.5,crowd:.12},hs:[
  {name:'door of the house',x:34,y:56,w:32,h:48,wx:52,wy:113,look:'The door of the house. Its owner opened this courtyard to the congregation, and it has been full ever since.',
    use:'We meet out here, where there is room for everyone.',open:'We meet out here, where there is room for everyone.'},
  {name:'water jar',x:68,y:86,w:14,h:20,wx:66,wy:113,look:'A great jar of water by the door, for washing the dust off. Everyone is welcomed the same way here.',pickup:'It would take two men to lift.'},
  {name:'vine arbor',x:100,y:30,w:88,h:22,wx:140,wy:114,look:'A vine trained over the arbor. For a whole year we have taught in its shade.',pickup:'The grapes are not ripe. And they are not mine.'},
  {name:'bench',x:112,y:94,w:28,h:12,wx:126,wy:113,look:'A bench worn smooth. Jews and Greeks have sat on it side by side to hear the word.'},
  {name:'table',x:144,y:82,w:36,h:25,wx:162,wy:114,look:()=>say(P,F.sealed?'Two wax tablets with the same sum on each, and the purse, tied and sealed.':"Lucius's wax tablets, and a purse of silver. Nothing has been closed or sealed yet."),
    pickup:'Not until it has been counted before the brothers.',useWith:async it=>it==='wages'?seal():false},
  {name:'gifts of the congregation',x:194,y:80,w:44,h:30,wx:214,wy:115,vis:()=>!F.loaded,look:['Sacks of grain, a basket of dried figs, jars of oil.','Some households brought a sackful and some a handful. Each according to what they could afford.'],
    pickup:'Not by the armful. It needs bags, and a donkey to bear them.',useWith:async it=>it==='bags'?say(P,'The bags go on the donkey first. Then they can be filled.'):false},
  {name:'old pack bags',x:236,y:42,w:24,h:30,wx:232,wy:113,dir:1,look:"The congregation's old pack bags. The cloth has rotted along every fold.",pickup:'They would not survive being lifted off the peg.',
    useWith:async it=>['awl','spool','knife'].includes(it)?say(P,'There is no sound cloth left in them to hold a stitch. The gift needs new bags.'):false},
  {name:'donkey',x:238,y:72,w:42,h:40,wx:232,wy:116,dir:1,
    look:()=>say(P,F.bagsOn?'New bags across his saddle, and he bears them without complaint.':'A sturdy pack donkey with a bare saddle. He has walked the road to Judea before.'),
    talk:async()=>{SFX.bray();await say(P,'He listens well, and says little. A fine traveling companion.')},pickup:'He weighs a good deal more than I do.',
    use:()=>say(P,F.bagsOn?'He is ready. He is only waiting for us.':'He cannot carry grain on a bare saddle. He needs pack bags.'),useWith:loadBags},
  {name:'gate to the street',x:284,y:44,w:32,h:60,wx:298,wy:113,dir:1,look:'The gate to the great colonnaded street.',exit:()=>go('antioch',44,116,1)}]};
LU.hs={name:'Lucius',actor:LU,look:'Lucius of Cyrene, one of the teachers in the congregation. He is keeping the tally of the gifts.',
  show:{awl:'I count; you sew. Let each of us keep to his trade.',knife:'Put that away before I write it on the list.',
    bolt:'For the bags? Good. The old ones would not survive the gate.',panels:'Well cut. I would not know where to begin.',
    spool:'Thread from Xanthe? Then her gift will be in every seam. No list could hold it better.',
    bags:'Bags fit for the road. Hang them on the donkey, and let us fill them.',
    tablets:'Wax tablets! A man after my own heart. Every gift goes on mine.',
    '*':'That is yours, brother. Keep it, unless you mean to add it to the gift.'},
  ask:{famine:'It will fall hardest on Judea. That is why I count so carefully.',thread:'I count, brother, I do not spin. But the street is full of stalls.'},
  give:async it=>it==='wages'?seal():false,
  talk:()=>talkTree([
    {q:'What is in the tally?',a:()=>say(LU,F.sealed?'Everything: counted before the brothers, written twice, and sealed. No one can find fault with it.':
      'Every sack, every jar and every coin. What was given, but not who gave it. Some brought much and some little, and the list does not say which.')},
    {q:'You are from Cyrene.',a:async()=>{await say(LU,'I am. Men of Cyprus and Cyrene were the first to speak to the Greek-speaking people of this city.');await say(LU,'The hand of Jehovah was with them. Look around this courtyard.')}},
    {q:'Is every gift in?',if:()=>!F.sealed,a:()=>say(LU,'Nearly. If you mean to add anything of your own, brother, now is the time. Then I can close the tally.')},
    {q:'I will get to work.',bye:1}])};
AG.hs={name:'Agabus',actor:AG,look:'Agabus, one of the prophets who came down from Jerusalem. He speaks plainly and wastes no words.',
  show:{awl:'A good tool for good work. Use it.',knife:'Keep it for your cloth, brother.',bolt:'Cloth that sheds the rain. The road to Judea will test it.',
    panels:'Sew them, and the grain will travel dry.',spool:'Thread from a sister in the street? Then her gift will travel the whole road to Judea.',
    bags:'Strong work. They will carry the grain to Judea.',wages:'That is for Lucius and the tally, not for me.',
    tablets:'Write down what was foretold, brother. And then write down what Antioch did about it.',
    '*':'I need nothing, brother. Let it go to Judea.'},
  ask:{thread:'Then ask, brother. This congregation is not short of willing hands.'},
  talk:()=>talkTree([
    {q:'When will the famine come?',a:async()=>{await say(AG,'I was not told the day, brother. I said what was made known to me, and no more than that.');await say(AG,'But your congregation did not wait to be told the day. That was wise.')}},
    {q:'How are the brothers in Judea?',a:async()=>{await say(AG,'Many have little. Some lost homes and livelihoods in the persecution, years ago, and never recovered them.');await say(AG,'A lean year will fall hardest on those.')}},
    {q:'You came a long way to tell us.',once:1,a:()=>say(AG,'And I will go back with something to tell Jerusalem: that Antioch answered with open hands.')},
    {q:'Peace to you, Agabus.',bye:1}])};
/* ---------- The street ---------- */
async function xanthe(){
  await say(P,'Peace to you, sister Xanthe.');
  await say(XA,'Peace, brother Saul. You have come about the gift for Judea. I know: I have brought nothing.');
  await quiz(XA,'The others carry in sacks of grain. I earn two small coins a day. What could I give?',[
    {q:'Then you are excused, sister. Let those who have more give more.',r:['Excused. Yes... that is the very word I was afraid of.']},
    {q:'In a time like this, everyone must give something.',r:["Must? Then it is a tax, like Caesar's. I had hoped it was something else."]},
    {q:'No one asks for what you do not have. Each gives what he can afford.',ok:1,
      p:['No one asks for what you do not have, Xanthe. Each according to what he can afford: that is what the congregation determined.',
        'Where the readiness is there first, a gift is welcome for what a person has, not for what a person does not have.'],
      r:['According to what I can afford... Then even a little would truly be mine to give.']}]);
  await quiz(XA,'But what do I have that hungry people need?',[
    {q:'Jehovah sees your heart. Let that be enough for you.',r:['I know that he does. But I wanted my hands to have a share in it, and not only my heart.']},
    {q:'Do not look at what you lack. What is in your hands?',ok:1,p:['Do not look at what you lack, sister. What is in your hands? Show me what you make.'],
      r:['Thread. Linen thread, waxed and doubled, the strongest in this street.','But no one can eat thread, brother.']},
    {q:'Little enough, it is true. But it is the thought that counts.',r:['A thought fills no bowl in Judea.']}]);
  await quiz(XA,'What use is thread in a famine?',[
    {q:'Not much, perhaps. But bring it anyway. No gift is turned away.',r:['Then it would lie in a corner of the courtyard: a gift that nobody needed.']},
    {q:'I could buy it from you. Then you would have coins to give.',r:['That would be your silver passing through my hand, brother. It is kind. But it would not be my gift.']},
    {q:'The gift has no bags to travel in, and I have no thread to sew them.',ok:1,
      p:['The gift cannot reach Judea without pack bags, and the old ones are rotten through.',
        "I have the cloth and the awl, and not an arm's length of thread. Yours would hold every sack of it together, all the way to Jerusalem."],
      r:['My thread, holding the whole gift together?','Then take the best spool I have, and take it gladly! Tell the brothers in Judea that a spinner in Antioch thought of them.']}]);
  F.gotSpool=1;addItem('spool');await say(P,'I will tell them. Thank you, sister.');await say(P,'She has given more than thread. And now I can sew.',TH)}
ROOMS.antioch={walk:[16,466,110,138],mood:'hope',amb:{crowd:.6,fountain:.7,birds:.3,hooves:.3},hs:[
  {name:'Mount Silpius',x:230,y:4,w:200,h:24,wx:300,look:'Mount Silpius, with the city wall climbing over its shoulder.'},
  {name:'colonnade',x:112,y:30,w:318,h:28,wx:270,look:['The great street of Antioch, paved and colonnaded from end to end.','In its shade, people from every nation pass each other all day long. Many of them have stopped to listen.']},
  {name:'gate to the courtyard',x:16,y:44,w:44,h:60,wx:38,wy:112,dir:-1,look:'The gate of the house where the congregation meets.',exit:()=>go('court',296,116,-1)},
  {name:'thread stall',x:150,y:44,w:80,h:60,wx:176,wy:114,look:"Xanthe's stall: skeins of yarn in every color, and spools of waxed linen thread.",pickup:'That would be stealing.'},
  {name:'fountain',x:250,y:60,w:34,h:45,wx:266,wy:114,look:'Water from the springs above the city, running day and night.',use:'Cool and sweet. A year here, and I still marvel at it.',
    pickup:'I have nothing to carry water in. And the road is not today.'},
  {name:'pottery stall',x:310,y:43,w:100,h:62,wx:340,wy:114,look:"Theron's jars, bowls and lamps. Plain, sound work, like the man.",pickup:'That would be stealing.'},
  {name:'south gate',x:436,y:20,w:44,h:84,wx:452,wy:112,dir:1,look:'The road south: down the coast, and at the end of it, Judea.',
    use:'Not yet. The gift is not ready for the road.',open:'It stands open. It is the gift that is not ready.'}]};
XA.hs={name:'Xanthe',actor:XA,look:()=>say(P,F.gotSpool?'Xanthe, spinning again, and singing under her breath.':'Xanthe, a widow who spins thread for her living. She came to believe this year. Today she looks troubled.'),
  give:async it=>{if(it==='wages')return say(P,'It is not my silver she needs. That would only tell her that her own gift does not count.');
    if(it==='spool')return say(XA,'No, brother! It is given. Use it.');return false},
  show:{awl:()=>say(XA,F.gotSpool?'Threaded with my thread now, I hope!':'An awl with no thread on it. Is that what troubles you, brother?'),
    knife:'A sharp blade. Mine is only a little one, for cutting thread.',bolt:'Goat-hair cloth from Cilicia. That will want strong thread.',
    panels:()=>say(XA,F.gotSpool?'My thread is waiting for those.':'Cut for sewing... And what will you sew them with, brother?'),
    bags:'My thread in every seam! I can hardly believe it.',tablets:'You can read and write, brother? I only know thread.','*':'No, brother. Keep it.'},
  ask:{famine:'I heard. And now a little of my thread will go to meet it.'},
  talk:async()=>{if(!F.gotSpool)return xanthe();await say(XA,F.bags?'My thread, on the road to Judea. Who would have thought it?':'Sew well, brother Saul. I waxed that thread myself.');
    return talkTree([{q:'Peace to you, sister.',bye:1}],{quiet:1})}};
TN.hs={name:'Theron',actor:TN,look:'Theron, a potter. He first heard the good news in this very street, and he has not stopped talking about it since.',
  show:{awl:'I work with clay, you with cloth. But we serve the same Lord.',knife:'I cut my clay with a wire. Yours is sharper.',
    bolt:'Cloth for the relief? You will want good thread for that. Xanthe spins the best in the street.',
    panels:'Sew them strong. My oil jars will be riding in them!',spool:"Xanthe's! So she gave after all. I knew she would, once she saw a reason.",
    bags:'Those will carry my jars to Judea, and not one will crack.',wages:'Give it to Lucius, brother. He will count it twice.',
    tablets:'Write down that a potter in Antioch is a Christian, and glad of the name.',
    '*':'Keep it, brother. I deal in clay.'},
  ask:{famine:'Then Judea will need oil as well as grain. I sent my best jars.'},
  talk:()=>talkTree([
    {q:'How did you come to believe?',a:async()=>{await say(TN,'Men from Cyprus and Cyrene came to Antioch. They did not speak only to the Jews: they spoke to us Greeks about the Lord Jesus.');
      await say(TN,'A great number of us believed. Then Barnabas came, and then he went and fetched you.')}},
    {q:'What do you tell your customers?',a:async()=>{await say(TN,'That I am a Christian! It is the name we are known by here, and I say it gladly.');await say(P,'It is a name worth living up to.')}},
    {q:'Has Xanthe been to the courtyard?',if:()=>!F.gotSpool,a:async()=>{await say(TN,'Not since the gifts began to come in. She sits at her stall and will not look up.');await say(TN,'I offered to carry her gift over with mine. She said she had none to carry.')}},
    {q:'Is your own gift ready?',a:()=>say(TN,'My oil jars went to the courtyard at dawn. A potter cannot send much, but he can send it well sealed.')},
    {q:'Peace to you, Theron.',bye:1}])};
/* ============ SCENES: intro, ending; PRAYER HINTS ============ */
async function start3(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(3);G.scene=null;G.end={};enterRoom('tarsus',150,122,-1);place(BN,'tarsus',-14,124,1);codeBtn();await fade(0,600);
    await narr('Tarsus in Cilicia, about 45 C.E.',{dur:2800});
    await narr('For years Saul has been declaring the good news in the regions of Syria and Cilicia. (Galatians 1:21-23)');
    await narr('Meanwhile, in Antioch of Syria, a great number of Greek-speaking people have become believers, and Jerusalem has sent Barnabas to them. (Acts 11:20-22)');
    await narr('Barnabas knows who could help. He sets out for Tarsus to make a thorough search for Saul. (Acts 11:25)');
    await say(BN,'Saul! Saul of Tarsus!');await walk(BN,112,124);
    await say(BN,'I have asked for you along every row of tentmakers in this city. And here you are, at the very last stall.');
    await say(P,'Barnabas! Peace to you, my brother. What brings you all the way to Tarsus?');
    await say(BN,'Antioch. A great number there have believed, Saul, and there is more teaching to do than one man can manage. Come back with me.');
    await say(P,'I will come.');
    await say(P,'But I promised Kleon the caravan master his tent by noon, and it is not finished. My Yes must mean yes.');
    await say(BN,'Then show me where to hold. Four hands are quicker than two.')},true)}
async function finale3(){AU.mood='hope';await wait(400);
  await say(BN,'The bags are on, and the gift is counted and sealed. Saul, we are ready for the road.');
  place(XA,'court',300,114,-1);place(TN,'court',304,120,-1);SFX.door();await Promise.all([walk(XA,216,128),walk(TN,244,134)]);
  await say(TN,'We could not let you leave without a farewell. Half the congregation is waiting at the gate.');
  await fade(1,300);F.loaded=1;SFX.creak();await wait(450);await fade(0,300);
  await say(LU,"Grain and figs in the bags, and the sealed purse in your own keeping, Barnabas. To the elders in Judea, by your hand and Saul's.");
  await say(XA,'And my thread in every seam of it. I did have something to give.');
  await say(AG,'I brought you hard news, and you answered it with open hands. The brothers in Judea will thank Jehovah for Antioch.');
  await say(P,'Jews and Greeks, potters and spinners: one congregation, and one gift. Before we go, let us pray.');
  const d=$('#dim'),all=[P,BN,LU,AG,XA,TN];d.style.opacity=.5;all.forEach(a=>a.bow=true);SFX.pray();await wait(900);
  await narr('Together they ask Jehovah to bless the gift, and to guard those who carry it.',{dur:4200,color:'#cfe2ff'});
  all.forEach(a=>a.bow=false);d.style.opacity=0;await wait(500);
  await say(BN,'Come, brother. Judea is a long walk.');
  walk(BN,280,118);await walk(P,296,114);await fade(1,600);
  G.scene=roadScene;G.trek={k:0};codeBtn();AU.amb={birds:.7,wind:.4,leaves:.4};await fade(0,600);
  const trek=tween(17000,k=>{G.trek.k=k});
  await narr('So they sent the relief to the elders in Judea by the hand of Barnabas and Saul. (Acts 11:30)',{dur:6500});
  await narr('The great famine came, as foretold, in the time of Claudius. The brothers in Judea did not face it alone. (Acts 11:28)',{dur:8000});
  await trek;
  await narr('After fully carrying out the relief work in Jerusalem, Barnabas and Saul returned and took along with them John, the one also called Mark. (Acts 12:25)',{dur:9000});
  await narr('And in Antioch, a far longer road was about to open. (Acts 13:1-3)',{dur:5500});
  SFX.win();ov.className='on end';ov.innerHTML='<h2>CHAPTER COMPLETE</h2><h1 style="font-size:calc(var(--s)*12px)">Called to Antioch</h1>'+
    '<p>Paul kept his word, worked with his hands, and helped a sister find what she had to give. The gift was carried honestly, in the sight of Jehovah and of men.</p>'+
    `<p>Prayers for wisdom: ${G.prays}</p>`+
    '<p class="small">Based on Acts 11:19-30; 12:25 and 2 Corinthians 8:12, 20, 21. Supporting characters and dialogue are imaginative; the events are from the Scriptures.</p>'+
    '<p class="go">Click to return to the title</p>';
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}
function hint3(){
  if(G.room==='tarsus'){
    if(!F.seam)return['seam3',['I gave Kleon my word, and a word is kept when the work is finished. What is still open on that tent?','The last seam of the tent gapes open. My awl can close it.']];
    if(!F.gotLoops)return['hide3',["A tent is only as sure as its hold on the ground. Kleon's last one tore at the pegs. What on my bench is tougher than cloth?",'My knife can cut peg loops from the leather hide on the workbench.']];
    if(!F.loopsOn)return['loops3',['The loops are cut. But they do no good in my hand.','I should sew the leather loops onto the tent.']];
    if(!F.gotTent)return['take3',['The work is done. What remains is to hand it over.','I should pick up the finished tent from its frame.']];
    if(!F.sold)return['sell3',["A promise is kept when the thing promised is in the other man's hands.",'I should give the finished tent to Kleon.']];
    return['go3',['My word here is kept. A brother is waiting, and so is a congregation.','Barnabas and I can leave by the east gate, toward Antioch.']]}
  if(!F.bags){
    if(!F.cutBolt)return['cut3',['The gift cannot travel in rotten bags. What does a tentmaker do first with a bolt of cloth?','My knife can cut the goat-hair cloth into panels for new pack bags.']];
    if(!F.gotSpool)return['xan3',['Cloth and an awl, and nothing to join them. And one sister stays away from the courtyard, sure that she has nothing to give.',
      'Xanthe the spinner keeps a stall in the street. She needs neither pressing nor pity, only to see that her thread is needed.']];
    return['sew3',['Cloth, awl and thread: everything is at hand. Now, the work itself.',"I can sew the cloth panels into pack bags with my awl and Xanthe's thread."]]}
  if(!F.bagsOn)return['load3',['The bags are finished. They are no use on my shoulder.','I should hang the pack bags on the donkey in the courtyard.']];
  if(!F.sealed)return['seal3',['A gift carried by my hand must be beyond reproach, in the sight of Jehovah and of men. And I have something of my own to add.',
    'I should give my savings to Lucius, and ask that everything be counted and sealed before the brothers.']];
  return['end3',['Everything is ready. It is time to go.']]}
/* ============ CHAPTER DEFINITION ============ */
return{rooms:['tarsus','court','antioch'],setup:setup3,start:start3,hint:hint3,music:MUSIC,scenes:{road:roadScene},topics:TOPICS,tablets:TABLETS,
  flags:['metKleon','seam','gotLoops','loopsOn','gotTent','sold','cutBolt','gotSpool','bags','bagsOn','sealed'],
  ent:{tarsus:[150,122,1],court:[146,128,-1],antioch:[46,116,1]},
  inv(room){const ant=room!=='tarsus',inv=ant?['awl','knife','tablets']:['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.gotLoops&&!F.loopsOn,'loops');add(F.gotTent&&!F.sold,'tent');add(ant&&!F.cutBolt,'bolt');add(F.cutBolt&&!F.bags,'panels');
    add(F.gotSpool&&!F.bags,'spool');add(F.bags&&!F.bagsOn,'bags');add(ant&&!F.sealed,'wages');return inv},
  place(room){if(room!=='tarsus')place(BN,'court',92,124,1)}}
});
