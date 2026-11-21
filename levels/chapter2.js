/* Paul of Tarsus: level data for Chapter Two, "A Friend in Jerusalem".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints. */
LEVEL(2,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* Jerusalem by day, in A Dorian: a lyre, a soft drum with a finger cymbal, and a ney that comes and goes (mood "calm").
   At the harbor (mood "hope") the same notes turn toward G major: a harp rocks in threes like the swell, with a bass and a brighter tune. */
const _=null,
 MUSIC={dt:.19,root:57,scale:[0,2,3,5,7,9,10],bars:16,tracks:[
  {drone:[-12],every:64,vol:.5,moods:['calm']},
  {inst:'lyre',moods:['calm'],prog:'AABACDAA',seq:{A:[0,_,2,_,4,_,7,_,4,_,2,_,4,_,2,_],B:[-1,_,1,_,3,_,6,_,3,_,1,_,3,_,1,_],C:[3,_,5,_,7,_,10,_,7,_,5,_,7,_,5,_],D:[4,_,6,_,8,_,6,_,4,_,6,_,8,_,6,_]}},
  {drum:1,moods:['calm'],prog:'AB',seq:{A:'d.....t.d...t...',B:'d.....t.d.b.t...'},vol:.8,group:[3,3,2,4,4]},
  {inst:'ney',moods:['calm'],from:4,oct:12,lines:[[[0,4,4],[4,5,2],[6,4,2],[8,2,6]],[[0,1,4],[4,2,2],[6,3,2],[8,4,8]],[[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,2,4],[4,1,4],[8,0,8]],[],[],[],[],
    [[0,4,3],[3,5,1],[4,7,4],[8,6,4],[12,4,4]],[[0,5,4],[4,4,2],[6,3,2],[8,2,8]],[[0,3,4],[4,2,2],[6,1,2],[8,2,4],[12,1,4]],[[0,0,14]]]},
  {inst:'harp',moods:['hope'],group:[3,3,2],prog:'GCGDGCDG',seq:{G:[-1,_,_,1,_,_,3,_,6,_,_,3,_,_,1,_],C:[2,_,_,4,_,_,6,_,9,_,_,6,_,_,4,_],D:[3,_,_,5,_,_,7,_,10,_,_,7,_,_,5,_]}},
  {inst:'bass',moods:['hope'],group:[3,3,2],prog:'GCGDGCDG',seq:{G:[-8,_,_,_,_,_,_,_,-8,_,_,_,_,_,-4,_],C:[-5,_,_,_,_,_,_,_,-5,_,_,_,_,_,-8,_],D:[-4,_,_,_,_,_,_,_,-4,_,_,_,_,_,-6,_]},len:5},
  {drum:1,moods:['hope'],group:[3,3,2],prog:'AB',seq:{A:'d..t..t.d..t..k.',B:'d..t..t.d..t.bk.'},vol:.8},
  {inst:'ney',moods:['hope'],loop:8,oct:12,lines:[[[0,6,6],[6,8,2],[8,10,8]],[[0,9,4],[4,8,4],[8,6,8]],[[0,8,6],[6,10,2],[8,13,8]],[[0,12,4],[4,10,4],[8,7,8]],
    [[0,6,6],[6,8,2],[8,10,4],[12,13,4]],[[0,11,4],[4,9,4],[8,8,4],[12,6,4]],[[0,7,4],[4,8,4],[8,10,4],[12,12,4]],[[0,13,14]]]}]};

/* ============ ART ============ */
/* A cart wheel with eight spokes. */
function wheelArt(g,x,y,rr){rr=rr||7;g.lineWidth=2;g.strokeStyle='#4a3320';g.beginPath();g.arc(x+.5,y+.5,rr,0,6.2832);g.stroke();g.lineWidth=1;g.strokeStyle='#8a6638';g.beginPath();g.arc(x+.5,y+.5,rr-.3,3.3,5.6);g.stroke();
  for(let a=0;a<8;a++){const q=a*.7854+.2;stroke(g,[x+.5,y+.5,x+.5+Math.cos(q)*(rr-.8),y+.5+Math.sin(q)*(rr-.8)],a%2?'#6a4a2a':'#7a5632',1)}oval(g,x+.5,y+.5,2,2,'#3a2414');oval(g,x+.2,y+.2,.9,.9,'#8a6638')}
function cartArt(g){oval(g,178,106,34,2.6,'rgba(40,30,70,.3)');
  wood(g,198,89.5,19,2.2,'#7a5632');R(g,215,88.5,2.5,4.2,'#5a3e22');
  if(!F.wheelOn){ashlar(g,151,97,14,9.5,'#b0a58c',rng(9),{bw:7,bh:4.8});R(g,151,97,14,.6,'#d8ceb4');R(g,156,94.8,3,2.4,'#3a2414')}
  wood(g,153,94.5,44,2.2,'#4e3520');
  /* load: sacks of grain and a jar of oil */
  sack(g,162,84.5,7.5,11,'#cdbb8c');sack(g,177,84.5,8.5,13,'#d8c698');sack(g,169.5,79,6,8,'#c4b282');vessel(g,190,84.5,4.2,11,'#a8562e','jar',{noShadow:1});
  boards(g,150,84,50,10,5,'#9a6e40',rng(8));R(g,150,84,50,1.2,'#b88a52');R(g,150,92.6,50,1.6,'#5a3e22');R(g,150,84,1.5,10,'#6a4a2c');R(g,198.5,84,1.5,10,'#6a4a2c');
  wheelArt(g,190,98);if(F.wheelOn)wheelArt(g,160,98);
  if(F.cartFixed){R(g,159.6,95.6,1.8,5,'#e6cfa0');R(g,159.6,95.6,.6,5,'#fff0c8')}}
/* ---------- Jerusalem: a street by day, the temple above the roofs ---------- */
ART.jerusalem={w:480,fp:1.3,
 paint(g){const r=rng(71),ST='#ecdcb4',SH='#8f95c8';
  sky(g,480,80,['#3f7cc8','#6aa2de','#9cc4ea','#d2e2ee']);cloud(g,96,16,60,10,r);cloud(g,346,22,76,11,r);cloud(g,236,9,36,6,r);
  /* the Mount of Olives, hazy in the east */
  ridge(g,0,480,78,x=>18+6*Math.sin(x/70+1)+3*Math.sin(x/19),['#a8b89a','#bcc8a8']);for(let i=0;i<90;i++){const tx=r()*480,ty=66+r()*10;oval(g,tx,ty,1.2+r(),.7,'#8ea27e')}
  /* the temple on its mount */
  ashlar(g,128,44,112,22,'#e2d6b6',r,{bw:10,bh:4.5,v:.06,t:.25});R(g,128,43,112,1.5,'#f6eed6');
  R(g,144,30,74,3,'#f4ecd6');R(g,144,33,74,11,'#c9bd9e');for(let i=0;i<13;i++){R(g,146+i*5.6,33,2.4,11,'#f8f2e0');R(g,148+i*5.6,33,.6,11,'#d2c8ac')}R(g,144,29,74,1,'#d9a441');
  g.fillStyle=lg(g,166,0,196,0,['#fffaea','#f6eed8','#dccfae']);g.fillRect(166,9,30,35);R(g,163,6,36,4,'#fffcf0');R(g,163,5.4,36,1,'#e0aa3c');R(g,163,10,36,1,'#e0aa3c');
  R(g,176.5,21,9,23,'#7a5a2c');R(g,177.5,22,7,22,'#5a3e1c');R(g,176.5,20,9,1.2,'#e0aa3c');for(let i=0;i<4;i++)R(g,167.5+i*8.6,12,1.4,32,'rgba(190,170,130,.5)');
  pool(g,181,12,50,24,'#fff6d8',.3,'screen');
  /* roofs of the upper city, pale with distance */
  for(const[hx,hy,hw,hh]of[[60,52,26,14],[92,48,22,18],[246,50,26,16],[420,46,30,20],[272,20,0,0]]){if(!hw)continue;R(g,hx,hy,hw,hh,'#d8cdb0');R(g,hx,hy,hw,1,'#efe6cc');R(g,hx+hw-3,hy,3,hh,'#b9b4b0');R(g,hx+4,hy+5,2.5,3.5,'#8a8478')}
  comp(g,'screen',.35,()=>R(g,0,40,480,30,'#c8d8ee'));
  /* the city wall behind the street */
  ashlar(g,0,64,480,40,'#d2c4a0',r,{bw:13,bh:6,v:.08,t:.35});for(let i=0;i<480;i+=9){R(g,i,60.5,5.5,3.5,'#d2c4a0');R(g,i,60.5,5.5,.5,'#f0e6c8')}
  comp(g,'multiply',.5,()=>R(g,0,64,480,40,'#c0c4e0'));
  /* the gate I came in by */
  ashlar(g,0,22,58,82,ST,r,{bw:14,bh:7,v:.1});for(let i=0;i<58;i+=10){R(g,i,16.5,6,5.5,ST);R(g,i,16.5,6,.6,'#fff6da');R(g,i+5.4,16.5,.6,5.5,'#b0a078')}R(g,0,21.5,58,1,'#a89870');
  poly(g,[58,16.5,64,20,64,104,58,104],'#a8a0a8');arch(g,11,46,36,58,'#c9b98f');arch(g,13,48,32,56,'#2a2230');
  g.fillStyle=lg(g,0,60,0,104,['#30283a','#5a5068']);arch(g,15,50,28,54);g.fill();R(g,15,96,28,8,'#8a8296');poly(g,[13,48,19,54,19,104,13,104],'#4a4254');
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,29+Math.cos(a)*18-1,46+18+Math.sin(a)*18-1,.6,3,'#a89870')}
  /* house of the widows' neighbors, where the cart has stopped */
  house(g,118,42,134,62,'#eadbb4',r,{side:7,patch:4});windowArt(g,140,52,10,12,'#eadbb4',{bars:2});windowArt(g,222,52,10,12,'#eadbb4',{bars:2});
  for(let i=0;i<34;i++){const vx=119+r()*9,vy=60+r()*42;oval(g,vx,vy,1.6,1.1,r()<.5?'#5a7a44':'#74985a')}stroke(g,[121,104,123,80,121,62],'#5a4630',.6);
  /* the house where the disciples meet */
  house(g,268,28,152,76,'#f0e2bc',r,{side:8,patch:5,cracks:6});
  R(g,309,47,46,57,'#d8c8a0');R(g,309,47,46,2.5,'#f8eed2');doorArt(g,314,52,36,52,'#8a6a40',r,{pw:6});R(g,325.5,65.5,13,9,'#3a2a1a');R(g,326.5,66.5,11,7,'#1c140e');for(let i=0;i<4;i++)R(g,328+i*2.6,66.5,.7,7,'#6a4e2c');
  R(g,308,102,48,2.5,'#cfc198');R(g,308,102,48,.5,'#f4ead0');
  windowArt(g,371,37,24,18,'#f0e2bc',{lattice:1,wood:'#8a6a40'});windowArt(g,286,40,14,16,'#f0e2bc',{shut:1});
  oval(g,296,104.5,13,1.6,'rgba(50,40,90,.3)');R(g,285.5,97,3,7,'#b8aa88');R(g,302,97,3,7,'#b8aa88');R(g,283.5,94,23,3.2,'#e0d4b2');R(g,283.5,94,23,.6,'#fbf4dc');R(g,283.5,96.8,23,.6,'#8a7e62');
  vessel(g,360,104,4.5,11,'#a8562e','jar');
  house(g,432,46,48,58,'#e2d4ac',r,{patch:2});windowArt(g,446,58,10,12,'#e2d4ac',{bars:2});
  /* the lane between the houses lies in shade */
  shade(g,[252,45,268,36,268,104,252,104],SH,.9);shade(g,[420,50,432,46,432,104,420,104],SH,.9);
  /* paving */
  pave(g,0,103,480,144,'#e0d2ac',r,{vx:240,vy:62,rows:5,step:34,v:.08});ao(g,0,103,480,5,'t',.3,'#5a4a70');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  /* shadows fall to the right of whatever stands in the sun */
  shade(g,[58,104,64,104,96,112,84,114,58,110],SH,.75);shade(g,[252,104,268,104,290,110,262,110],SH,.8);shade(g,[420,104,432,104,452,109,430,109],SH,.8);
  shade(g,[118,104,252,104,258,107.5,124,107.5],SH,.5);shade(g,[268,104,420,104,426,107.5,274,107.5],SH,.5);shade(g,[432,104,480,104,480,107.5,438,107.5],SH,.5);
  /* the old olive tree */
  comp(g,'multiply',.75,()=>oval(g,100,108,24,3.6,SH));
  for(const p of[[84,105,83,92,86,80,84,70],[88,105,90,90,88,78],[86,84,78,74,74,66],[87,80,96,70,100,60],[86,76,88,64]])stroke(g,p,'#4e3c28',p.length>6?3:1.8);
  stroke(g,[84.5,104,83.5,92,86,80],'#7a6444',.7);
  foliage(g,76,62,13,8,'#6f8a5c',r,70);foliage(g,98,55,14,9,'#7a9666',r,80);foliage(g,88,48,12,7,'#86a272',r,60);foliage(g,86,60,10,6,'#62804f',r,40);
  /* sunlight over everything, and a little dust in the air */
  pool(g,60,0,300,160,'#fff0c0',.16,'screen');ao(g,0,0,480,144,'r',.12,'#2a2050')},
 fore(g){const r=rng(72);
  /* baskets of figs and a water jar at the gate; an awning corner and crates on the market side */
  vessel(g,12,150,11,32,'#7a3e22','amph',{noShadow:1});for(const[bx,bw,bh]of[[38,15,12],[62,11,9]]){vessel(g,bx,147,bw,bh,'#8a6a34','bowl',{noShadow:1});
    for(let i=0;i<14;i++)oval(g,bx-bw+2+r()*(bw*2-4),147-bh-r()*2.5,1.6,1.3,r()<.5?'#5a2a4a':'#7a3e60')}
  awning(g,470,-2,56,22,'#a8443a','#e8dcc0',8);R(g,468,-2,2,150,'#4e3520');R(g,468,-2,.6,150,'#8a6238');
  for(const[bx,by,bw,bh]of[[486,146,36,18],[494,129,24,13]]){boards(g,bx,by-bh,bw,bh,6,'#7a5632',r);R(g,bx,by-bh,bw,1,'#b88a52');R(g,bx,by-1.5,bw,1.5,'#4e3520')}
  comp(g,'source-atop',.42,()=>R(g,0,0,524,144,'#3a3564'))},
 draw(g){if(!F.gotStick){oval(g,108,108.6,10,1.2,'rgba(50,40,90,.3)');stroke(g,[99,108,107,105.6,116.5,104.4],'#5a3e22',1.6);stroke(g,[99,107.6,107,105.2,116.5,104],'#8a6a3c',.6);
    stroke(g,[107,105.5,110,102.5],'#6a4a2a',.8);oval(g,110.5,102.3,1.8,1,'#6f8a5c');oval(g,116.5,103.2,1.8,1,'#7a9666');oval(g,113.5,104.6,1.4,.8,'#5f7a4a')}
  cartArt(g);if(!F.wheelOn){oval(g,136,103,7,1.6,'rgba(50,40,90,.3)');wheelArt(g,134,95)}},front(){}};
/* ---------- The upper room: morning sun through one window ---------- */
ART.upper={w:320,
 light:()=>({amb:'#cbbfb4',lamps:[[250,96,90,'#5a5038']]}),
 paint(g){const r=rng(83),W='#e6d4a8',T='#7a5632';
  plaster(g,0,0,320,105,W,r,{patch:4,cracks:6,brick:'#c0a070',bot:-.12,t:.45});
  comp(g,'multiply',.5,()=>R(g,0,86,320,19,'#d6b890'));R(g,0,85.5,320,.5,'rgba(110,70,30,.4)');for(let i=0;i<320;i+=8){R(g,i,83,4,1.6,'#a8503a');R(g,i+4,83,4,1.6,'#3f6a8a')}
  R(g,0,0,320,10,'#3a2a1c');tex(g,'wood',.6,0,0,320,10);
  for(let i=-1;i<10;i++){const a=8+i*38,k=1.17,x0=160+(a-160)*k,x1=160+(a+7-160)*k;poly(g,[a,10,a+7,10,x1,0,x0,0],T);poly(g,[a+5,10,a+7,10,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,10,x0+.25,0],tint(T,.25),.5)}
  wood(g,0,9.5,320,3.5,'#6a4a2c');ao(g,0,13,320,8,'t',.35);
  poly(g,[0,0,7,10,7,105,0,113],'#c2b088');poly(g,[320,0,313,10,313,105,320,113],'#cdbb92');ao(g,0,0,7,113,'l',.25);
  /* floor: clay tiles, a woven rug */
  pave(g,0,105,320,144,'#b98a5c',r,{vx:160,vy:74,rows:6,step:24,v:.09,joint:'#7a5636'});ao(g,0,105,320,7,'t',.4);
  const rug=[62,123,122,123,128,134,56,134];poly(g,rug,'#8a3a30');clipTo(g,()=>poly(g,rug),()=>{for(let j=0;j<11;j++){const c=['#8a3a30','#c9a14a','#2f5a6a','#e0d2b0','#8a3a30'][Math.floor(j/2.2)%5];R(g,50,123+j,84,1,tint(c,(j%2)*-.1))}
    for(let i=0;i<20;i++){R(g,58+i*3.6,126,1.6,1.6,'#e0d2b0');R(g,59.8+i*3.6,130,1.6,1.6,'#c9a14a')}tex(g,'grain',.25,50,123,84,12)});
  for(let i=0;i<24;i++){R(g,56+i*3,134,.6,1.6,'#d8c9a0');R(g,62+i*2.5,121.6,.6,1.4,'#d8c9a0')}
  /* door to the city */
  R(g,9.5,35,39,71,'#cdbb92');doorArt(g,12,38,34,68,'#96703e',r);R(g,9.5,104,39,2.5,'#a89a80');R(g,9.5,104,39,.5,'#d2c6aa');
  /* shelf of scrolls: pigeonholes, each scroll with its tag */
  ao(g,68,50,60,7,'t',.3);R(g,69,34,58,13,'#4a3320');wood(g,68,46,60,3,'#7a5632');wood(g,68,32.5,60,2,'#7a5632');for(let i=0;i<=4;i++)wood(g,68+i*14.5,34,1.6,12,'#6a4a2c',1);
  for(let i=0;i<4;i++)for(const[ox,oy]of[[4.2,43],[9.6,43],[6.9,39.4]]){const sx=69.6+i*14.5+ox,sy=oy;oval(g,sx,sy,2.4,2.3,'#cfc4a4');oval(g,sx,sy,1.5,1.4,'#f2ead2');oval(g,sx,sy,.5,.5,'#8a6a40');if((i+ox|0)%2)R(g,sx+1,sy+1.6,1.2,2.4,'#a8503a')}
  poly(g,[71,49,74,49,71,55],'#5a3e24');poly(g,[125,49,122,49,125,55],'#5a3e24');
  /* niche with a water jar, and an oil lamp hung on the wall */
  R(g,180,44,20,28,'#b8a47c');arch(g,182,46,16,26,'#8a7650');ao(g,182,46,16,8,'t',.4);vessel(g,190,72,5,13,'#a8562e','jug',{noShadow:1});R(g,180,72,20,1.6,'#f4e8c8');
  /* window on the temple */
  R(g,223,27,54,46,'#f4e6c0');R(g,226,30,48,40,'#a8946c');
  inRect(g,230,34,40,32,()=>{sky(g,320,66,['#4a88d0','#8ebce6','#d6e6f0']);R(g,230,58,40,8,'#cfc39a');for(let i=0;i<40;i+=5){R(g,230+i,54+((i*7)%3),4.4,12,i%10?'#dccfa8':'#c8ba92');R(g,230+i,54+((i*7)%3),4.4,.6,'#f4ecd4')}
    R(g,236,49,28,6,'#e2d6b6');for(let i=0;i<7;i++)R(g,237+i*4,49.6,1.6,5,'#f8f2e0');g.fillStyle=lg(g,242,0,256,0,['#fffaea','#e6dab8']);g.fillRect(242,38,14,12);R(g,240.5,36.6,17,1.8,'#fffcf0');R(g,240.5,36.2,17,.6,'#e0aa3c');R(g,247,43,4,7,'#7a5a2c');
    pool(g,250,40,30,20,'#fff6d8',.35,'screen')});
  ao(g,230,34,40,4,'t',.35);ao(g,230,34,4,32,'l',.3);boards(g,224,31,6,37,3,'#8a6238',r);boards(g,270,31,6,37,3,'#8a6238',r);R(g,221,70,58,3,'#f8eccc');R(g,221,73,58,1,'#8a7850');ao(g,221,74,58,5,'t',.25);
  /* low table: the scroll of Isaiah, a lamp, bread */
  R(g,132,99,66,10,'rgba(40,24,10,.45)');wood(g,132,98,3.5,11.5,'#6a4a2c',1);wood(g,194.5,98,3.5,11.5,'#6a4a2c',1);wood(g,127,94,76,4.4,'#96703e');R(g,127,97.8,76,1,'#5a3e24');
  R(g,147,91.4,22,2.8,'#f2ead2');for(let i=0;i<6;i++)R(g,149.5+i*3.2,92.2,2.2,.5,'#6a5a48');for(let i=0;i<5;i++)R(g,150+i*3.4,93.2,2,.5,'#6a5a48');
  oval(g,145.6,92.6,1.8,2.4,'#b89a64');oval(g,170.4,92.6,1.8,2.4,'#b89a64');oval(g,145.6,92.6,.7,1,'#6a4a2c');oval(g,170.4,92.6,.7,1,'#6a4a2c');
  vessel(g,183,94,4.2,3,'#b06a3a','bowl',{noShadow:1});poly(g,[186,91.4,190,91.2,190.4,92.4,186,93.2],'#a05c30');oval(g,136,92.8,4.6,1.6,'#c9a060');oval(g,135.6,92.4,3.8,1.1,'#e0bc7c');
  for(const[cxx,c]of[[120,'#8a3a30'],[208,'#2f5a6a']]){oval(g,cxx,109.6,9,1.6,'rgba(40,24,10,.4)');g.fillStyle=lg(g,0,104,0,110,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(cxx,107,8,3,0,0,6.2832);g.fill();stroke(g,[cxx-6,106.4,cxx+6,106.4],'#c9a14a',.5)}
  /* bench with a worn cushion */
  R(g,284,97,30,12,'rgba(40,24,10,.45)');wood(g,284,96,3.4,13,'#6a4a2c',1);wood(g,311,96,3.4,13,'#6a4a2c',1);wood(g,281,92,36,4.4,'#96703e');R(g,281,95.8,36,1,'#5a3e24');
  g.fillStyle=lg(g,0,87,0,92.4,['#c06a50','#a8503a','#7a3424']);g.beginPath();g.ellipse(297,90,13,3,0,0,6.2832);g.fill();stroke(g,[286,89.4,308,89.4],'#d88a70',.5);
  /* daylight: bright by the window, a shaft of sun on the floor */
  lightmap(g,320,'#b9aca0',l=>{pool(l,250,52,150,110,'#fff0c8',.75);comp(l,'lighter',.9,()=>poly(l,[230,66,270,66,292,142,196,142],lg(l,0,66,0,142,['rgba(255,236,180,.15)','rgba(255,236,180,.8)'])));
    comp(l,'multiply',1,()=>{ao(l,0,0,70,144,'l',.4,'#3a3050');ao(l,0,0,320,22,'t',.35,'#3a3050');ao(l,0,130,320,14,'b',.25,'#3a3050')})});
  comp(g,'screen',.2,()=>poly(g,[230,34,270,34,292,142,196,142],lg(g,0,34,0,142,['rgba(255,240,200,.9)','rgba(255,240,200,.1)'])));pool(g,250,50,34,26,'#fff4d0',.25,'screen')},
 fore(g){vessel(g,9,152,12,34,'#5a2e1c','pithos',{noShadow:1});g.fillStyle=lg(g,0,128,0,144,['#6a3024','#3a1a14']);g.beginPath();g.ellipse(308,142,20,10,0,0,6.2832);g.fill();stroke(g,[292,138,320,136],'#a8603c',.6)},
 draw(g,t){flame(g,189.6,90,t);pool(g,189,88,9+Math.sin(t/190),7,'#ffb050',.14)},front(){}};
/* ---------- Caesarea: the harbor, late in the day ---------- */
function shipArt(g,X,t,st,sh){const y=Math.round(Math.sin(t/900)*2)/2,H=(a,b,w,h,c)=>R(g,X+a,b+y,w,h,c),PL=(p,c)=>poly(g,p.map((v,i)=>i%2?v+y:v+X),c),SK=(p,c,w)=>stroke(g,p.map((v,i)=>i%2?v+y:v+X),c,w);
  /* the mast stops at the yard, and the yard hangs a little askew */
  SK([350.5,18,254,76],'#4a3a2a',.6);SK([350.5,18,444,70],'#4a3a2a',.6);H(349,18,3.2,62,'#5a3c22');H(349,18,1,62,'#9a7040');
  if(st===1){PL([306,73.4,396,71.4,396,73.8,306,75.8],'#5a3c22')}
  else{PL([305,20.6,397,17,397,19.4,305,23],'#5a3c22');SK([305,20.8,397,17.2],'#9a7040',.5)}
  if(st===0){const f=Math.sin(t/420)*.8;
    PL([309,23,371,20.6,372,30,368,36+f,371,44,366,50+f,369,58,364,60,311,61],'#dccfb0');PL([378,20.4,394,19.6,393,58,381,57,383,48+f,379,40,382,30],'#d2c5a6');
    for(let i=0;i<5;i++)SK([315+i*11,22.8-i*.4,316+i*11,61],'#b8ad90',.5);SK([386,20,387,58],'#b8ad90',.5);
    g.fillStyle=lg(g,X+309,0,X+372,0,['rgba(120,90,60,.3)','rgba(255,240,210,.05)','rgba(120,90,60,.22)']);g.fillRect(X+309,20+y,63,42)}
  else if(st===2){const sp=[309,22];for(let j=0;j<=10;j++)sp.push(307-Math.sin(j/10*3.1416)*5,22+j*4);for(let i=0;i<=10;i++)sp.push(307+i*8.6,62+Math.sin(i/10*3.1416)*3);for(let j=10;j>=0;j--)sp.push(394+Math.sin(j/10*3.1416)*5,19+j*4.3);
    PL(sp,'#e6dabc');for(let i=1;i<8;i++)SK([309+i*10.6,22-i*.4,307+i*11,63],'#c2b698',.5);
    g.fillStyle=lg(g,X+302,0,X+400,0,['rgba(120,90,60,.35)','rgba(255,244,214,.12)','rgba(120,90,60,.28)']);g.beginPath();const q=sp.map((v,i)=>i%2?v+y:v+X);g.moveTo(q[0],q[1]);for(let i=2;i<q.length;i+=2)g.lineTo(q[i],q[i+1]);g.fill();
    H(346,36,14,10,'#cfc2a2');for(let i=0;i<14;i+=2.5){H(346+i,36,1,.6,'#5a4a36');H(346+i,45.4,1,.6,'#5a4a36')}for(let j=0;j<10;j+=2.5){H(346,36+j,.6,1,'#5a4a36');H(359.4,36+j,.6,1,'#5a4a36')}}
  if(sh.paul)man(g,X+300,92+y,'paul',-1,0,'#f0d8c0',Math.floor(t/600)%2,0);
  if(sh.capt)man(g,X+410,92+y,'captain',-1,0,'#f0d8c0',0,0);
  /* hull */
  const hull=[238,62,245,62,251,77,439,77,447,60,454,57,453,68,446,95,436,101,258,101,246,95,240,80];
  g.fillStyle=lg(g,0,60+y,0,101+y,['#8a5c34','#6e4628','#3e2616']);g.beginPath();hull.forEach((v,i)=>{if(i%2)return;i?g.lineTo(X+v,hull[i+1]+y):g.moveTo(X+v,hull[i+1]+y)});g.closePath();g.fill();
  SK([240,64,247,78.6,441,78.6,449,61],'#3a2414',1.4);SK([243,82,444,82],'#c9a14a',1.8);SK([243,83.4,444,83.4],'#8a6a24',.6);
  for(let j=0;j<4;j++)SK([245+j,87+j*3.6,445-j*1.6,87+j*3.6],'#3a2414',.5);for(let i=0;i<12;i++)H(262+i*15,84.5,.6,14,'rgba(30,16,8,.35)');
  SK([239.5,62,246,62],'#b88a52',.8);SK([447.6,60,454,57.4],'#b88a52',.8);PL([246,70,240,96,243,97,249,71],'#5a3c22');PL([240,95,238,103,243,104,244,96],'#6e4628');
  if(!X){PL([266,83,274,83,292,104.5,282,104.5],'#8a6238');for(let i=0;i<6;i++)SK([268+i*3,86.6+i*3.6,277+i*3,86.6+i*3.6],'#5a3e22',.6);SK([266,83,282,104.5],'#b88a52',.5)}
  else for(let i=0;i<7;i++)R(g,X+236-i*9-(t/60%9),98.5+(i%2),6-i*.5,.6,'#e6f2f4')}
ART.harbor={w:480,fp:1.3,
 light:()=>({amb:'#f4dcc4'}),
 paint(g){const r=rng(97),SH='#8a86b8';
  /* sky and sea: the sun is low over the water */
  sky(g,480,62,['#2f62a8','#5a8cc4','#9ab4d0','#e4c8a4','#fbcf8c']);pool(g,150,47,150,60,'#ffd890',.6,'screen');pool(g,150,47,40,26,'#fff0c0',.7,'screen');oval(g,150,47,8,8,'#fff6d0');
  for(const[cx0,cy,cw]of[[150,22,70],[330,13,80],[60,34,40],[420,30,50]]){pool(g,cx0,cy+1.5,cw,4,'#c88a70',.5,'source-over');pool(g,cx0,cy,cw*.9,3,'#ffe6c0',.8,'source-over')}
  g.fillStyle=lg(g,0,60,0,104,['#e0b488','#6f9cb4','#3f7a9c','#2c5f84','#1f4a6c']);g.fillRect(0,60,480,44);
  for(let i=0;i<260;i++){const sy=61+r()*r()*42,k=(sy-60)/44;R(g,r()*480,sy,2+k*6+r()*4,.5,r()<.5?'rgba(190,225,235,.5)':'rgba(20,50,80,.35)')}
  for(let i=0;i<90;i++){const sy=61+r()*40,k=(sy-60)/44,w=6+k*30;R(g,150-w/2+r()*w-2,sy,2+r()*5,.5+k*.5,r()<.6?'#ffe6a8':'#fff8dc')}
  /* the breakwater, its tower and beacon, ships far out */
  for(const[sx,sy]of[[256,57],[388,58],[462,57.4]]){poly(g,[sx-2.5,sy,sx+2.5,sy,sx+2,sy+1.4,sx-2,sy+1.4],'#4a4a5c');poly(g,[sx-1.6,sy-.4,sx-1.2,sy-4.6,sx+1.8,sy-.6],'#e8dcc4')}
  ashlar(g,170,54,310,6.5,'#c0ae8c',r,{bw:9,bh:3.4,v:.08,t:.25});for(let i=170;i<480;i+=12){R(g,i,51.6,7,2.6,'#c0ae8c');R(g,i,51.6,7,.5,'#f0dcb0')}R(g,170,59.6,310,1.4,'#6a6468');
  ashlar(g,205.5,29,13,27,'#d6c4a0',r,{bw:6,bh:3.6,v:.08,t:.25});R(g,203.5,27,17,2.6,'#ecdcb8');R(g,207.5,21,9,6,'#bca888');R(g,205.5,29,2.5,27,'rgba(60,50,90,.35)');R(g,210,36,3,5,'#3a3440');
  R(g,300,44,10,11,'#c8b694');R(g,300,43,10,1.4,'#b85a3a');R(g,420,42,12,13,'#c8b694');R(g,420,41,12,1.4,'#b85a3a');R(g,300,44,2.5,11,'rgba(60,50,90,.3)');R(g,420,42,3,13,'rgba(60,50,90,.3)');
  comp(g,'screen',.25,()=>R(g,0,40,480,24,'#ffd8a0'));
  /* the grain warehouse */
  house(g,0,28,112,76,'#decca4',r,{side:7,patch:5,cracks:6,beams:0});for(let i=0;i<116;i+=5.5){R(g,i,23,5,5.5,i%11?'#c0603c':'#a84c2c');R(g,i,23,5,.6,'#e08a60');R(g,i+4.5,23,.6,5.5,'#7a3620')}R(g,0,28.4,113,1.2,'rgba(60,30,20,.5)');
  for(let i=0;i<2;i++){const ax=13+i*46;arch(g,ax-1.5,52.5,33,52,'#c2b08a');arch(g,ax,54,30,50,'#2a2028');g.save();arch(g,ax,54,30,50);g.clip();boards(g,ax,54,30,50,5,i?'#7a5632':'#5a4028',r);if(!i){R(g,ax+16,54,14,50,'#1a1418');sack(g,ax+22,104,5,8,'#bfae84')}ao(g,ax,54,30,12,'t',.6);g.restore()}
  windowArt(g,48,36,10,9,'#decca4',{bars:2});
  /* the quay */
  pave(g,0,103,480,144,'#cfbe98',r,{vx:150,vy:58,rows:5,step:36,v:.09});ao(g,0,103,112,5,'t',.3,'#4a3a60');
  R(g,112,100,368,3.4,'#a8987a');R(g,112,100,368,.6,'#f0e0bc');R(g,112,103.2,368,.8,'#5a5258');
  comp(g,'soft-light',.9,()=>{g.fillStyle=rg(g,150,104,260,['rgba(255,214,140,.95)','rgba(255,200,120,.3)','rgba(90,70,120,.5)']);g.fillRect(0,100,480,44)});
  /* long shadows reach toward us, away from the sun */
  const cast=(x,w,len)=>shade(g,[x,104,x+w,104,x+w+(x+w-150)*len/46,104+len,x+(x-150)*len/46,104+len],SH,.55);
  for(const x of[236,300,420]){cast(x-1,8,16);oval(g,x+3,104,4.6,1.2,'rgba(40,30,60,.5)');g.fillStyle=lg(g,x-1,0,x+7,0,['#8a7a66','#5a4c40','#3a302c']);g.fillRect(x,96,6,8);R(g,x-1,94.6,8,2,'#6a5a4a');R(g,x-1,94.6,8,.6,'#e8c898')}
  cast(115,3,26);cast(165,3,26);cast(430,46,12);shade(g,[0,104,112,104,96,112,0,112],SH,.5);
  /* heap of old sailcloth */
  oval(g,46,107,30,3,'rgba(40,30,60,.4)');for(const[hx,hy,hw,hh,c]of[[44,104,25,8,'#c4b694'],[34,99,15,6.5,'#d8caa8'],[55,100,13,5.5,'#b4a684'],[46,95,10,4.4,'#e2d6b6']]){g.fillStyle=lg(g,hx-hw,0,hx+hw,0,[tint(c,.2),c,tint(c,-.32)]);g.beginPath();g.ellipse(hx,hy,hw,hh,0,Math.PI,0);g.fill()}
  for(const p of[[24,103,40,96,60,100],[30,99,44,95,52,97],[40,104,52,99,66,103],[22,104,30,100]])stroke(g,p,'#8a7c5c',.5);
  /* nets hung to dry */
  wood(g,115.4,62,2.6,43,'#6a4e34',1);wood(g,165.4,62,2.6,43,'#6a4e34',1);wood(g,113,61,57,2.4,'#7a5a3c');
  inRect(g,118,63.4,47.4,38,()=>{for(let i=-40;i<50;i+=3.4){stroke(g,[118+i,63.4,118+i+38,101.4],'rgba(40,70,74,.75)',.5);stroke(g,[118+i+38,63.4,118+i,101.4],'rgba(40,70,74,.75)',.5)}
    g.fillStyle=lg(g,0,63,0,101,['rgba(255,220,160,.12)','rgba(20,40,50,.18)']);g.fillRect(118,63,48,39)});
  for(let i=0;i<7;i++)oval(g,121+i*7,101.6+Math.sin(i*1.7),1.5,1.5,i%2?'#b85a3a':'#c8743c');R(g,118,63,47.4,1,'#3f5a5a');
  /* cargo waiting to be loaded */
  for(let i=0;i<3;i++)vessel(g,436+i*10.5,109,4.4,15,['#a05a34','#8a4a2a','#b0683c'][i],'amph');
  oval(g,470,109,10,1.6,'rgba(40,30,60,.45)');boards(g,462,96,15,13,5,'#8a6a40',r);R(g,462,96,15,1.2,'#c89a5c');R(g,462,107.8,15,1.2,'#4e3520');R(g,462,101.6,15,1,'#5a4226');
  pool(g,150,47,330,120,'#ffcf88',.14,'screen');ao(g,300,0,180,144,'r',.2,'#1a1840')},
 fore(g){const r=rng(98);
  /* a mooring post and a coil of hawser close by; a fisherman's baskets at the other end */
  g.fillStyle=lg(g,2,0,20,0,['#2a2028','#4a3830','#1a1418']);g.fillRect(4,108,15,40);R(g,2,105,19,4,'#3a2c2a');R(g,2,105,19,.8,'#c8946a');
  for(let i=0;i<4;i++){g.strokeStyle=i%2?'#3a3028':'#52463a';g.lineWidth=3;g.beginPath();g.ellipse(48,139-i*2.6,16-i,4.2,0,0,6.2832);g.stroke()}
  for(const[bx,bw,bh]of[[496,16,14],[516,10,10]]){vessel(g,bx,148,bw,bh,'#4a3a2a','bowl',{noShadow:1});for(let i=0;i<10;i++)oval(g,bx-bw+3+r()*(bw*2-6),148-bh-r()*2,2.4,1,'#6a8a94')}},
 draw(g,t){flame(g,211.6,20,t);pool(g,212,18,9+Math.sin(t/200),7,'#ff9a40',.2);
  for(let i=0;i<6;i++){const k=(Math.floor(t/260)+i*3)%8;R(g,116+((i*37)%70),64+((i*13+k*5)%36),3+k%3,.6,'#fff0c0')}
  const sh=G.ship||{ox:0},st=F.sailUp?2:F.sailDown?1:0;
  R(g,sh.ox+242,100.6,206,1,'rgba(20,40,60,.5)');for(let i=0;i<9;i++)R(g,sh.ox+246+i*23+Math.sin(t/500+i)*2,101.6,9,.6,'rgba(220,240,244,.6)');
  shipArt(g,sh.ox,t,st,sh);
  if(st===1){const sp=[300,104.5,404,104,406,113.4,298,113.8];poly(g,sp,'#dccfb0');clipTo(g,()=>poly(g,sp),()=>{for(let i=13;i<104;i+=13)R(g,300+i,104,.6,10,'#b8ad90');
      g.fillStyle=lg(g,0,104,0,114,['rgba(255,244,214,.3)','rgba(110,90,70,.3)']);g.fillRect(298,104,108,10);for(const fx of[318,362,388])stroke(g,[fx,105,fx+6,113],'rgba(120,100,80,.4)',.6)});
    R(g,298,113.4,108,.8,'rgba(40,30,60,.45)');
    if(F.sailMended){R(g,340,105.4,18,7.4,'#cabd9c');for(let i=0;i<18;i+=2.6){R(g,340+i,105.4,1,.6,'#4a3a2a');R(g,340+i,112.2,1,.6,'#4a3a2a')}for(let j=0;j<7;j+=2.4){R(g,340,105.4+j,.6,1,'#4a3a2a');R(g,357.4,105.4+j,.6,1,'#4a3a2a')}}
    else{const tr=[338,105.2];for(let i=1;i<=9;i++)tr.push(338+i*2+(i%2?1.2:-.8),105.2+i*.9);stroke(g,tr,'#5a4a3c',1.4);stroke(g,tr.map((v,i)=>i%2?v:v+1),'#8a7c5c',.5)}}},front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  cephas:{skin:'#b07848',hair:'#6a5a4a',beard:'#7a6a58',tunic:'#3f6a8a',cloak:'#8a7a5a',belt:'#3a2414',long:1,brow:'#3a2a1a',ph:1300},
  james:{skin:'#bd8a5a',hair:'#2a1a12',beard:'#2a1a12',longBeard:1,tunic:'#e0d6bc',cloak:'#6a5a7a',belt:'#4a3a24',long:1,ph:2900},
  captain:{skin:'#a06a40',wrap:'#b03a2a',beard:'#2a2a2a',tunic:'#3a5a5a',belt:'#c9a14a',trim:'#22383a',brow:'#1a1a1a',ph:700},
  fisher:{skin:'#a8703f',hair:'#d0d0d0',beard:'#d8d8d8',bald:1,brow:'#909090',tunic:'#8a8a6a',belt:'#4a3a24',ph:3700},
  mattan:{skin:'#c08a5c',hair:'#4a2f1a',beard:'#4a2f1a',tunic:'#7a6a9a',cloak:'#c8b88a',belt:'#3a2414',long:1,ph:1900},
  /* two Greek-speaking Jews: a white tunic and a blue mantle in the Greek manner; ochre and dark red */
  dositheus:{skin:'#b88458',hair:'#6a5a4a',beard:'#7a6a58',brow:'#4a3a2a',tunic:'#ddd4be',cloak:'#46557a',belt:'#4a3a24',trim:'#8a8270',long:1,ph:2400},
  ariston:{skin:'#c49064',hair:'#2a1a12',beard:'#2a1a12',tunic:'#c49a58',cloak:'#7a3434',belt:'#3a2414',trim:'#5a2a1e',long:1,ph:3500}});
const BN=actor('barnabas','Barnabas','#f0b070',128),CE=actor('cephas','Cephas','#8ec8f0',108),JA=actor('james','James','#d8c8f0',122),
  CP=actor('captain','the_captain','#f09080',100),FI=actor('fisher','the_fisherman','#b8e0c0',140),MT=actor('mattan','Mattan','#e8d890',126),
  DS=actor('dositheus','Dositheus','#b8c8f0',112),AR=actor('ariston','Ariston','#f0b8a0',138);
const DK={x:332,y:100,color:'#f4c0a8',pitch:255,room:'jerusalem'};
SFX.knock=()=>{for(let i=0;i<3;i++)noise({t:now()+i*.18,d:.07,v:.32,f:220,type:'lowpass'})};
Object.assign(ICON,{
  stick(g){stroke(g,[4.4,19.6,12,12.4,19.6,5],'#4e3620',2.4);stroke(g,[4.2,19.2,11.8,12,19.4,4.6],'#9a7648',.8);stroke(g,[12,12.4,16.6,13.6],'#5a3e22',1.2);
    for(const[x,y,a]of[[17.8,13.4,.3],[20,3.6,-.7],[14.6,7,-1.2]]){g.save();g.translate(x,y);g.rotate(a);oval(g,0,0,2.4,1.1,'#6f8a58');oval(g,-.4,-.3,1.4,.5,'#9cb682');g.restore()}},
  peg(g){g.fillStyle=lg(g,9.4,0,15,0,['#e0c090','#b08a56','#7a5a34']);poly(g,[9.4,5.6,15,5.6,14.6,16.6,12.2,22,9.8,16.6]);g.fill();R(g,8.4,3.6,7.6,2.6,'#8a6a3a');R(g,8.4,3.6,7.6,.7,'#c8a470');
    stroke(g,[10.8,7,10.8,16],'#f0d8a8',.6);R(g,9.6,9.4,5.2,.7,'#7a5a34')},
  provisions(g){g.fillStyle=lg(g,0,9.4,0,18,['#e8c078','#c9a060','#8a6630']);g.beginPath();g.ellipse(10,14,7.6,4.4,0,0,6.2832);g.fill();for(const x of[6.6,10,13.4])stroke(g,[x-1,12.4,x+1,15.4],'#8a6630',.6);
    stroke(g,[4.6,12,9,10.2,14.6,11.6],'#f4d898',.6);for(const[x,y,c]of[[17.4,17.4,'#5a2a4a'],[19.6,12.6,'#6a3458'],[15,19.4,'#4a2240']]){oval(g,x,y,2.6,2.2,c);oval(g,x-.7,y-.7,.9,.7,'#9a5a84');R(g,x-.2,y-2.8,.6,1,'#5a4a2a')}},
  twine(g){g.beginPath();g.arc(12,13,7,0,6.2832);g.fillStyle=rg(g,9.6,10.4,9,['#a48c56','#7a6638','#3e3218']);g.fill();for(let i=-6;i<7;i+=2){stroke(g,[8+i*.9,7+Math.abs(i)*.4,16+i*.9,19-Math.abs(i)*.4],'rgba(40,30,12,.55)',.6);stroke(g,[8.6+i*.9,7+Math.abs(i)*.4,16.6+i*.9,19-Math.abs(i)*.4],'rgba(220,196,140,.35)',.4)}
    stroke(g,[17,17.6,19,19.4,21.4,21.6],'#8a7444',1)},
  sailpatch(g){IH.square(g,'#dccfb0',5,6,14,12.4);stroke(g,[5,6,19,6],'#f4ecd4',.7);for(let i=6;i<19;i+=2.4)R(g,i,18.4,.7,1.6,'#b8ad90');stroke(g,[8.6,9.6,15.4,9.6],'#b8ad90',.6);stroke(g,[8.6,13.4,15.4,13.4],'#b8ad90',.6)}});
Object.assign(ITEMS,{
  stick:{name:'olive_branch',look:'pruned_olive_branch_seasoned_and_straight_grained'},
  peg:{name:'wooden_peg',look:'stout_peg_with_a_tapered_point'},
  provisions:{name:'provisions',look:'bread_and_dried_figs_from_the_brothers'},
  twine:{name:'tarred_twine',look:'tarred_twine_thick_as_a_bowstring'},
  sailpatch:{name:'sailcloth_patch',look:'sound_piece_of_sailcloth'}});
Object.assign(COMBO,{
  'knife+stick':async()=>{SFX.cut();await say(P,'square_shank_a_tapered_point');delItem('stick');addItem('peg');F.peg=1;
    await say(P,'i_have_carved_a_thousand_tent_pegs')},
  'knife+peg':()=>say(P,'it_is_the_right_shape_already'),
  'awl+stick':()=>say(P,'awl_only_makes_holes'),
  'awl+twine':()=>say(P,'ready_q'),
  'sailpatch+twine':()=>say(P,'patch_must_be_sewn_onto_the_torn'),
  'awl+sailpatch':()=>say(P,'patch_must_be_sewn_onto_the_torn'),
  'sailpatch+thread':()=>say(P,'my_thread_is_for_tent_seams'),
  'knife+sailpatch':()=>say(P,'it_is_large_enough_to_cover'),
  'knife+provisions':()=>say(P,'i_will_break_the_bread')});
function setup2(){P.called='Saul';place(BN,'jerusalem',228,118,-1);place(CE,'upper',168,120,-1);place(JA,'upper',212,123,-1);
  place(CP,'harbor',262,122,-1);place(FI,'harbor',186,116,-1);place(MT,'harbor',214,130,1);G.inv=['awl','thread','knife','tablets'];drawInv()}
/* in Jerusalem, while Saul speaks in the synagogues, the two who dispute with him wait in the street */
const disputers=()=>{place(DS,'jerusalem',252,118,1);place(AR,'jerusalem',226,123,1)};
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
/* The passages are the ones Paul answers with in the dispute. Each is a note in his own words (gist), checked against the New World
   Translation (Study Edition) and never copied from it: see CONTRIBUTING section 1. */
const PASS={
  deut:{ref:'deuteronomy_18_15',short:'prophet_like_moses',gist:'moses_told_israel_that_jehovah'},
  ps16:{ref:'psalm_16_10',short:'not_abandoned_to_the_grave',gist:'davids_hope_jehovah_would'},
  prov16:{ref:'proverbs_16_9',short:'jehovah_guides_a_mans_steps',gist:'in_his_heart_a_man_maps'},
  prov28:{ref:'proverbs_28_13',short:'mercy_for_the_one_who_confesses',gist:'nobody_prospers_by_hiding'},
  isa49:{ref:'isaiah_49_6',short:'light_of_nations_2',gist:'to_carry_my_salvation_to_the_remotest'},
  isa53:{ref:'isaiah_53_5',short:'pierced_because_of_our_transgression',gist:'our_transgression_is_why'}};
const ORDER=Object.keys(PASS);
const TABLETS={
  people:[
    {name:'sister_at_the_door',note:'she_remembers_what_i_did',if:()=>F.knocked&&!F.told},
    {name:()=>F.cartFixed?'Barnabas':'man_with_a_handcart',note:()=>F.cartFixed?'joseph_a_levite_from_cyprus':'he_is_taking_grain_and_oil',if:()=>F.metBarn},
    {name:'Cephas',note:'apostle_whom_many_call_peter',if:()=>F.upper},
    {name:'James',note:'brother_of_the_lord',if:()=>F.upper},
    {name:'Dositheus',note:'greek_speaking_jew_from_cilicia',if:()=>F.preach},
    {name:'Ariston',note:'greek_speaking_jew_from_alexandria',if:()=>F.preach},
    {name:'Mattan',note:'one_of_the_brothers_who',if:()=>G.room==='harbor'},
    {name:'captain_2',note:'master_of_the_only_ship',if:()=>F.metCapt},
    {name:'fisherman_2',note:'old_man_mending_nets',if:()=>G.room==='harbor'}],
  tasks:[
    {t:'join_the_disciples_who',if:()=>!F.told},
    {t:'help_the_man_with_the_handcart',if:()=>F.metBarn&&!F.cartFixed},
    {t:'speak_in_the_name_of_the_lord',if:()=>F.upper&&!F.preach},
    {t:'answer_the_greek_speaking',if:()=>F.preach&&G.room!=='harbor'},
    {t:'find_a_passage_to_tarsus',if:()=>G.room==='harbor'&&!F.metCapt},
    {t:'bring_the_torn_sail_down',if:()=>F.metCapt&&!F.sailDown},
    {t:'find_a_patch_of_sound_sailcloth',if:()=>F.metCapt&&!F.gotPatch},
    {t:'find_something_stronger',if:()=>F.metCapt&&!F.gotTwine}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'barnabas',q:'barnabas_spoke_up_for_me',if:()=>F.told},
  {id:'sail',q:'captains_sail_is_torn',if:()=>F.metCapt},
  {id:'twine',q:'captain_says_there_is_tarred',if:()=>F.metCapt&&!F.gotTwine}];
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
async function knock(){SFX.knock();await wait(600);
  if(F.preach){SFX.door();return go('upper',56,120,1)}
  if(F.told){await say(BN,'it_is_barnabas');await say(DK,'barnabas_said',{to:BN});
    await say(BN,'i_will_answer_for_him');SFX.door();await say(DK,'if_you_say_so_come');
    return go('upper',56,120,1)}
  if(F.knocked){await say(DK,'please_go_away');
    return say(P,'knocking_louder_will_not_help',TH)}
  F.knocked=1;await say(DK,'who_is_there');await say(P,'saul_of_tarsus');
  await say(DK,'saul_of_the_one');await say(DK,'go_away');
  await say(P,'i_cannot_blame_her_i',TH)}
async function liftWheel(){if(!F.metBarn)return say(P,'it_belongs_to_that_man');
  await say(P,'take_the_other_side_friend',{to:BN});await walk(BN,170,116);SFX.creak();await fade(1,220);F.wheelOn=1;await wait(250);await fade(0,220);
  await say(BN,'it_is_on_but_with_no');await walk(BN,228,118);BN.dir=-1}
async function barnStory(){
  await say(BN,'it_holds');
  await say(BN,'i_am_joseph_a_levite_from_cyprus');
  await say(P,'i_am_saul');await walk(BN,240,118);BN.dir=-1;
  await say(BN,'saul_q');
  await quiz(BN,'is_it_true_then',[
    {q:'i_acted_in_ignorance',r:['perhaps_said']},
    {q:'yes_said',ok:1,p:['yes_i','i_was_a_blasphemer_and_an_insolent'],r:['you_do_not_soften_it']},
    {q:'that_is_behind_me',r:['those_who_lost_family_to_your_arrests']}]);
  await quiz(BN,'what_turned_you_around',[
    {q:'it_is_a_long_story',r:['if_you_want_that_door_to_open']},
    {q:'ask_the_brothers_in_damascus',r:['damascus_is_many_days_away']},
    {q:'on_the_road_to_damascus',ok:1,p:['near_damascus_a_light_from_heaven','for_three_days_i_could'],
      r:['blind_for_three_days_and_then']}]);
  await quiz(BN,'since_then',[
    {q:'i_spoke_in_the_name_of_jesus',ok:1,p:['in_damascus_i_spoke_openly','brothers_lowered_me_down'],
      r:['ha_said']},
    {q:'i_have_worked_harder_than_most',r:['it_may']},
    {q:'i_would_rather_speak_of_that_only',r:['they_will_ask_why_i_trust_you']}]);
  await say(BN,'i_believe_you_saul');await say(BN,'come_said');
  F.told=1;await walk(BN,360,114);BN.dir=-1}
ROOMS.jerusalem={space:0.9,walk:[16,466,110,138],mood:'calm',amb:{birds:.5,crowd:.35,wind:.15,hooves:.25},hs:[
  {name:'city_gate',x:0,y:22,w:58,h:82,wx:44,wy:114,dir:-1,look:'gate_i_came_in_by_the_road',use:'i_did_not_walk_all_this_way'},
  {name:'temple',x:150,y:6,w:64,h:34,wx:180,look:['temple_gleaming_above_the_rooftops','i_studied_in_its_shadow']},
  {name:'olive_tree',x:66,y:44,w:44,h:58,wx:98,wy:114,look:'old_olive_tree',pickup:'tree_is_not_mine_to_cut'},
  {name:'pruned_branch',x:96,y:100,w:24,h:10,wx:108,wy:116,vis:()=>!F.gotStick,look:'pruned_olive_branch_left',pickup:take('gotStick','stick','seasoned_olive_wood')},
  {name:'loose_wheel',x:124,y:84,w:20,h:24,wx:148,wy:114,dir:-1,vis:()=>!F.wheelOn,look:'cart_wheel_leaning_on_the_wall',pickup:'it_is_too_heavy_for_one_man',use:liftWheel},
  {name:'handcart',x:148,y:68,w:68,h:40,wx:176,wy:116,
    look:()=>say(P,F.cartFixed?'sound_again_and_ready_to_roll':F.wheelOn?'wheel_is_back_on_its_axle':'handcart_loaded_with_grain_and_oil'),
    pickup:'it_is_another_mans_cart',
    use:()=>say(P,!F.metBarn?'i_should_speak_to_its_owner_first':F.wheelOn?'axle_needs_a_new_pin_to_keep':'it_needs_its_wheel_back'),
    useWith:async it=>{if(it==='stick')return say(P,'branch_is_too_thick_for_the_pin');
      if(it==='awl'||it==='thread')return say(P,'no_stitch_will_hold_a_wheel_on');if(it!=='peg')return false;
      if(!F.wheelOn)return say(P,'wheel_must_be_on_the_axle');
      SFX.door();delItem('peg');F.cartFixed=1;await say(P,'through_the_axle_and_a_tap');return barnStory()}},
  {name:'bench',x:282,y:90,w:26,h:14,look:'stone_bench_by_the_door'},
  {name:'door_of_the_house',def:'open',x:312,y:50,w:40,h:54,wx:330,wy:112,look:'plain_solid_door',use:knock,open:knock,talk:knock},
  {name:'latticed_window',x:368,y:34,w:30,h:24,wx:380,look:'a_latticed_window'},
  /* the hidden treasure (CONTRIBUTING section 2): the baskets of figs painted in the foreground by the gate. It changes nothing. */
  {name:'baskets_of_figs',x:24,y:131,w:52,h:13,wx:86,wy:134,dir:-1,look:'baskets_of_figs_from_the_market',
    pickup:'they_are_for_sale',
    use:async()=>{await say(P,'no_thank_you');treasure()}},
  {name:'street_to_the_markets',x:462,y:60,w:18,h:60,wx:456,wy:120,look:'street_runs_on_toward_the_markets',
    use:()=>say(P,F.preach?'not_before_i_have_answered':'my_business_is_at_that_door_first')}]};
BN.hs={get name(){return F.cartFixed||G.room!=='jerusalem'?'Barnabas':'man_with_the_handcart'},actor:BN,
  look:()=>say(P,G.room==='upper'?'barnabas_he':F.cartFixed?'barnabas_a_son_of_comfort':'man_in_a_red_tunic_struggling'),
  show:{awl:()=>say(BN,G.room==='upper'?'keep_it_busy_brother':'an_awl'),
    thread:()=>say(BN,G.room==='upper'?'keep_it_for_your_trade_saul':'thread_will_not_hold_a_wheel'),
    knife:()=>say(BN,G.room==='upper'?'put_it_away_brother':'good_blade'),
    stick:'olive_wood',
    tablets:()=>say(BN,F.told?'fill_them_well_saul':'wax_tablets_said'),
    peg:()=>say(BN,F.wheelOn?'that_will_do_for_a_pin':'fine_pin'),
    '*':'keep_it_friend_said'},
  talk:async()=>{if(G.room==='upper')return say(BN,'someone_once_spoke_up_for_me_saul');
    if(F.told)return say(BN,'come_saul');if(F.cartFixed)return barnStory();
    if(!F.metBarn){F.metBarn=1;await say(P,'peace_to_you_q');await say(BN,'peace_said');
      await say(BN,'this_grain_and_oil_is_for_the_widows');
      return say(P,'i_am_no_wheelwright')}
    await talkTree([
      {q:'what_happened_to_the_cart',a:()=>say(BN,'pin_sheared_through_and_the_wheel')},
      {q:'who_is_the_food_for',a:()=>say(BN,'for_the_widows_among_the_disciples')},
      {q:'do_you_know_the_people',a:async()=>{await say(BN,'know_them');await say(P,'i_will_tell_you')}},
      {q:'i_will_see_what_i_can_do',bye:1}])}};
ROOMS.upper={space:1.25,walk:[24,300,112,138],mood:'calm',amb:{birds:.25,crowd:.12},
  enter:async()=>{if(F.upper)return;F.upper=1;place(BN,'upper',96,124,1);await say(BN,'cephas_james_this_is_saul_of_tarsus',{to:CE});
    await narr('barnabas_stood_up_for_saul_acts_9_27',{dur:9500});
    await say(CE,'saul_i');await say(CE,'stay_in_my_house_brother');
    await say(JA,'if_jehovah_has_opened_this_door');await say(P,'brothers_said')},
  hs:[
  {name:'door_to_the_city',x:12,y:38,w:34,h:68,wx:34,wy:113,dir:-1,look:'door_to_the_street_and_to_a_city',exit:()=>leaveUpper()},
  {name:'shelf_of_scrolls',x:70,y:36,w:56,h:18,wx:98,look:'scrolls_of_the_law_and_the_prophets',pickup:'they_belong_to_the_congregation'},
  {name:'table',x:128,y:86,w:74,h:24,wx:164,wy:114,look:'low_table'},
  {name:'open_scroll',x:142,y:86,w:32,h:9,wx:158,wy:114,look:['scroll_of_isaiah_isaiah_49_6','i_have_read_those_words'],pickup:'it_belongs_to_the_congregation'},
  {name:'window',x:224,y:30,w:52,h:44,wx:250,look:'temple_bright_in_the_sun'},
  {name:'bench',x:280,y:84,w:38,h:24,wx:290,wy:114,look:'bench_with_a_worn_cushion'}]};
CE.hs={name:'Cephas',actor:CE,look:'cephas_whom_many_call_peter',
  show:{awl:'tentmakers_awl_matthew_4_18_19',
    thread:'good_linen',
    knife:'put_it_away_brother_john_18_10_11',
    tablets:'write_down_what_i_tell',
    '*':'keep_it'},
  ask:{barnabas:['you_have_a_good_friend_saul_acts_4_36_37','when_barnabas_speaks_for_a_man']},
  talk:()=>talkTree([
    {q:'tell_me_about_the_lord',a:async()=>{await say(CE,'fifteen_days_will_not_be_enough_saul');await say(CE,'by_the_sea_of_galilee_casting')}},
    {q:'disciples_in_this_city_fear_me',a:()=>say(CE,'fear_fades_when_people_see_fruit')},
    {q:'i_will_speak_with_you_again',bye:1}])};
JA.hs={name:'James',actor:JA,look:'james_the_lords_brother',
  show:{awl:'my_brother_worked_with_his_hands_too_mark_6_1_3',
    thread:'keep_it_for_your_trade_saul_said',knife:'tool_for_making_things',
    tablets:'scriptures_on_wax',
    '*':'there_are_others_who_need_it_more'},
  ask:{barnabas:'apostles_named_him_acts_4_36'},
  talk:()=>talkTree([
    {q:'you_are_the_lords_brother',a:async()=>{await say(JA,'i_grew_up_in_the_same_house');await say(JA,'i_do_not_judge_a_man_by_how')}},
    {q:'what_should_i_do_now',a:()=>say(JA,'what_you_did_in_damascus_speak')},
    {q:'thank_you_james',bye:1}])};
/* ---------- Caesarea harbor ---------- */
const SEW=['awl','twine','sailpatch','thread'];
async function mendSail(it){if(!SEW.includes(it))return false;
  if(it==='thread')return say(P,'my_thread_is_for_tent_seams_said');
  if(!has('sailpatch'))return say(P,'tear_is_too_long_to_draw_closed');
  if(!has('twine'))return say(P,'i_have_a_patch_but_nothing');
  return finale2()}
async function lowerSail(){if(!F.metCapt)return say(P,'i_should_not_touch_a_ships');
  await say(P,'easy_said');SFX.creak();await fade(1,220);F.sailDown=1;await wait(250);await fade(0,220);SFX.creak();
  await say(CP,'gently_done');await say(P,'tent_ropes_mostly')}
ROOMS.harbor={space:0.6,walk:[16,466,110,138],mood:'hope',amb:{waves:.8,gulls:.6,wind:.3,creak:.5},hs:[
  {name:'warehouse',x:0,y:24,w:112,h:66,wx:60,look:'grain_warehouses'},
  {name:'heap_of_old_sailcloth',x:18,y:90,w:52,h:18,wx:48,wy:114,look:'worn_out_sails_heaped_for_rag',
    pickup:()=>say(P,F.gotPatch?'i_have_all_i_need_from_it':'whole_sail_is_far_too_heavy'),
    use:()=>say(P,F.gotPatch?'i_have_all_i_need_from_it':'i_would_need_a_blade_to_take'),
    useWith:async it=>{if(it!=='knife')return false;if(F.gotPatch)return say(P,'one_patch_is_enough');
      SFX.cut();F.gotPatch=1;addItem('sailpatch');await say(P,'i_cut_a_broad_square_from_the_soundest')}},
  {name:'drying_nets',x:114,y:62,w:56,h:42,wx:142,wy:114,look:'fishing_nets_hung_up_to_dry',pickup:'they_are_a_mans_livelihood'},
  {name:'sea',x:172,y:60,w:68,h:36,wx:206,look:'the_great_sea'},
  {name:'harbor_tower',x:202,y:20,w:20,h:38,wx:212,look:'tower_on_the_breakwater'},
  {name:'cargo',x:428,y:86,w:50,h:24,wx:440,wy:116,look:'jars_of_oil_and_wine_waiting',pickup:'that_would_be_stealing'},
  {name:'ship',x:240,y:56,w:214,h:44,wx:300,wy:112,
    look:()=>say(P,F.sailDown?'sturdy_coasting_ship_waiting_on_her_sail':'sturdy_coasting_ship'),
    use:'i_cannot_board_without_the_captains_leave'},
  {name:'torn_sail',x:308,y:16,w:86,h:46,wx:350,wy:112,vis:()=>!F.sailDown,look:'ripped_nearly_from_top_to_bottom',
    use:'i_cannot_reach_it_up_there',useWith:async it=>SEW.includes(it)?say(P,'i_cannot_sew_it_up_there'):false},
  {name:'halyard',x:340,y:60,w:22,h:20,wx:350,wy:112,vis:()=>!F.sailDown,look:'halyard_made_fast_at_the_foot',use:lowerSail,pickup:'it_is_holding_up_the_yard'},
  {name:'torn_sail',x:298,y:102,w:108,h:13,wx:350,wy:122,vis:()=>F.sailDown,look:'spread_on_the_quay_the_tear',
    pickup:'it_is_far_too_heavy_and_it',use:'it_needs_a_patch_heavy',useWith:mendSail}]};
CP.hs={name:'the_captain',actor:CP,look:'master_of_the_ship',
  show:{awl:'awl_near_enough_a_sailmakers',
    thread:'thread_said',knife:'sharp_good',
    provisions:'keep_your_bread',sailpatch:'sound_cloth',
    twine:'tarred_twine_said',
    tablets:'can_you_write_a_sail_back_together',
    '*':'keep_your_things'},
  ask:{barnabas:'never_heard_of_him',sail:'it_is'},
  talk:async()=>{if(!F.metCapt){F.metCapt=1;await say(P,'peace_to_you_captain');
      await say(CP,'she_is_when_she_has_a_sail');
      await say(CP,'my_sailmaker_is_ashore');
      await say(P,'i_am_a_tentmaker');
      return say(CP,'a_tentmaker')}
    await talkTree([
      {q:'what_will_the_sail_need',a:()=>say(CP,'patch_of_sound_sailcloth_and_tarred_twine')},
      {q:'where_can_i_find_those',a:async()=>{await say(CP,'there_is_old_sailcloth');await say(CP,'twine_said')}},
      {q:'i_will_get_to_work',bye:1}])}};
FI.hs={name:'the_fisherman',actor:FI,look:'old_fisherman_mending_his_nets',
  show:{awl:'good_awl',thread:'linen_said',
    knife:'sharp_mind',sailpatch:'sailcloth_said',
    twine:'use_it_well_friend',tablets:'letters_said','*':'no_no'},
  ask:{barnabas:'i_know_no_barnabas',sail:'whole_harbor_heard_a_squall',
    twine:['he_talks_too_much_that_captain','i_could_spare_a_ball_it']},
  give:async it=>{if(it!=='provisions')return false;
    await say(P,'you_have_not_eaten_since_dawn');await say(FI,'you_would_give_a_stranger');
    await say(P,'there_will_be_bread_in_tarsus');SFX.good();delItem('provisions');F.gotTwine=1;addItem('twine',1);
    await say(FI,'take_this_ball_of_twine_tentmaker')},
  talk:async()=>{if(F.gotTwine){await say(FI,'fair_winds_to_you_friend');return talkTree([{q:'peace_to_you_said',bye:1}],{quiet:1})}
    await say(P,'peace_to_you_you_are');await say(FI,'since_before_dawn');
    await talkTree([
      {q:'what_do_you_mend_nets_with',a:async()=>{await say(FI,'tarred_twine_nothing');await say(FI,'i_could_spare_a_ball_if_i')}},
      {q:'is_that_ship_bound_for_tarsus',a:()=>say(FI,'her_captain_says')},
      {q:'peace_to_you_said',bye:1}])}};
MT.hs={name:'Mattan',actor:MT,look:'mattan_one_of_the_brothers',
  show:{awl:'you_and_your_awl',thread:'is_that_strong_enough_for_a_sail',
    knife:'careful_with_that_brother',provisions:'that_is_your_bread_for_the_voyage',
    sailpatch:'big_patch',twine:'tarred_twine_it',
    tablets:'keep_them_safe_brother','*':'no_brother_said'},
  ask:{barnabas:'barnabas_told_the_whole',
    sail:'if_anyone_in_caesarea_can',
    twine:'from_the_old_man_by_the_nets'},
  talk:()=>talkTree([
    {q:'will_the_congregation_be_safe',a:()=>say(MT,'with_you_gone_the_opposers')},
    {q:'i_had_hoped_to_stay_in_jerusalem',a:async()=>{await say(MT,'we_hoped_to_keep_you');await say(MT,'go_where_the_lord_sends_you')}},
    {q:'let_me_see_about_that_ship',bye:1}])};
/* ============ SCENES: intro, journey, ending; PRAYER HINTS ============ */
async function start2(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(2);G.scene=null;G.end={};enterRoom('jerusalem',24,122,1);codeBtn();await fade(0,600);
    await narr('jerusalem_some_time_later',{dur:2800});
    await narr('three_years_ago_saul_left');
    await walk(P,96,122);
    await say(P,'jerusalem_said');
    await say(P,'disciples_meet_in_the_upper')},true)}
/* Leaving the upper room for the first time begins the fifteen days in Jerusalem (Acts 9:28; Galatians 1:18). After that the door
   simply leads back to the street, where two Greek-speaking Jews are waiting to dispute with him. */
async function leaveUpper(){if(F.preach)return go('jerusalem',330,116,1);
  await say(P,'there_are_synagogues_in_this_city');
  await say(BN,'go_saul');await fade(1,700);
  await narr('for_fifteen_days_acts_9_28_galatians_1_18',{dur:8000});
  F.preach=1;disputers();enterRoom('jerusalem',330,118,1);codeBtn();await fade(0,700);
  await say(DS,'saul_saul');P.dir=-1;
  await say(P,'men_from_the_synagogue',TH);
  await say(P,'passages_i_need_are_written',TH)}
/* ---------- Disputing with the Greek-speaking Jews (Acts 9:29) ----------
   Three objections. Every answer Paul can give is a passage from his tablets, said as his tablets have it, in his own words; a passage that
   does not meet the objection gets a reply, never a failure. The last objection is about Paul himself, and the answer is a confession. */
const label=k=>T('ref_short',{ref:T(PASS[k].ref),short:T(PASS[k].short)}),quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
function round(who,q,right,p,r,wrong){return quiz(who,q,ORDER.map(k=>k===right?{q:label(k),ok:1,p,r}:{q:label(k),p:[quote(k)],r:[wrong[k]]}))}
async function dispute(){DS.dir=1;AR.dir=1;
  await say(DS,'we_heard_you_in_the_synagogue');
  await say(AR,'answer_us_from_the_scriptures');
  await say(P,'ask_and_i_will_answer_from_the_scriptures');
  await round(DS,'law_says_that_a_man_who','isa53',
    ['isaiah_wrote_of_the_servant_isaiah_53_5','curse_he_bore_was_not_his_own_galatians_3_13'],
    ['isaiah','i_have_read_that_passage_many_times'],
    {deut:'prophet_like_moses_yes',ps16:'the_grave',
      prov16:'jehovah_directs_our_steps',
      prov28:'confession_said',
      isa49:'light_of_nations_said'});
  await round(AR,'he_died_and_was_buried_a_dead','ps16',
    ['david_wrote_that_jehovah_psalm_16_10',
      'yet_david_is_acts_2_29_31_13_35_37',
      'i_have_seen_him_myself'],
    ['davids_tomb_is_here_it_is_true','you_say_you_saw_a_dead'],
    {deut:'moses_died_too_saul',isa53:'wounds_and_healing',
      prov16:'your_nazarenes_steps_led',prov28:'we_are_not_speaking_of_you',isa49:'dead_man_is_a_light_to_no'});
  await round(DS,'we_are_from_cilicia_saul','prov28',
    ['it_is_true_acts_22_20',
      'i_will_not_cover_it_over_nobody_proverbs_28_13',
      'i_have_confessed_it_before'],
    ['he_does_not_even_deny_it'],
    {deut:'do_not_hide_behind_moses_saul',ps16:'stephen_is_in_his_grave',
      prov16:'your_own_steps_took_you',
      isa49:'nations_can_wait',isa53:'we_know_the_prophet'});
  await say(AR,'let_him_say_it_in_the_synagogue');
  await say(DS,'come_ariston',{to:AR});
  await Promise.all([walk(DS,-30,116),walk(AR,-30,122)]);DS.room=AR.room=null;
  return toCaesarea()}
async function toCaesarea(){const o={dur:8000};
  await narr('he_talked_and_debated_acts_9_29',o);
  place(BN,'jerusalem',330,112,1);SFX.door();await walk(BN,P.x-28,P.y);BN.dir=1;P.dir=-1;
  await say(BN,'saul_the');
  await say(BN,'you_have_said_what_you');
  await say(P,'james_told_me_i_would_hear');await fade(1,700);
  await narr('while_he_prayed_acts_22_17_21',o);
  await narr('once_the_brothers_acts_9_30',o);
  enterRoom('harbor',36,124,1);G.inv=CHAP[2].inv('harbor');drawInv();codeBtn();await fade(0,700);
  await narr('caesarea_the_great_harbor_on_the_coast',{dur:3000});await walk(P,170,128);
  await say(MT,'there_she_is_saul_the_only');await say(MT,'look_at_her_sail');
  await say(MT,'you_have_the_bread_and_figs');
  await say(P,'ship_that_cannot_sail_and_a_tentmaker')}
DS.hs={name:'Dositheus',actor:DS,wx:278,wy:119,look:'dositheus_a_greek_speaking_jew_from_cilicia',
  talk:dispute,
  show:{awl:'tentmakers_awl',thread:'we_did_not_come_to_buy_thread',
    knife:'put_that_away_said',tablets:'your_tablets_said',
    '*':'keep_it_said'}};
AR.hs={name:'Ariston',actor:AR,wx:278,wy:119,look:'ariston_a_greek_speaking_jew_from_alexandria',
  talk:async()=>{await say(AR,'dositheus_speaks_for_us_both');return dispute()},
  show:{awl:'every_pharisee_learns_a_trade',thread:'keep_your_thread_tentmaker',
    knife:'put_that_away_saul',tablets:'read_from_them_if_you_must',
    '*':'dositheus_asked_you_a_question'}};
async function finale2(){
  SFX.sew();await say(P,'patch_laid_under_the_tear');SFX.sew();await wait(800);
  await say(P,'every_stitch_pulled_tight_in_tarred_twine');delItem('sailpatch');delItem('twine');F.sailMended=1;SFX.good();
  await say(CP,'i_have_paid_sailmakers');
  await fade(1,300);F.sailUp=1;SFX.creak();await wait(450);await fade(0,300);
  await say(CP,'she_draws');
  await walk(MT,P.x-26,P.y+2);MT.dir=1;P.dir=-1;
  await say(MT,'this_is_where_we_part_brother');await say(P,'i_came_to_jerusalem_hoping_to_stay');
  await say(MT,'wherever_it_leads_you_do');
  await say(P,'greet_cephas_and_james_for_me');
  await walk(P,278,112);await fade(1,400);P.room=null;CP.room=null;G.ship={ox:0,paul:1,capt:1};await fade(0,400);
  walk(MT,262,120);await wait(900);
  const sail=tween(14000,k=>{G.ship.ox=Math.round(300*k*k)});
  await narr('brothers_sent_him_acts_9_30',{dur:6000});
  await narr('congregation_all_through_acts_9_31',{dur:9500});
  await sail;await journey();await narr('years_would_pass_in_tarsus_acts_11_25',{dur:6500});
  endScreen({title:'a_friend_in_jerusalem',text:'saul_forced_no_door',
    based:'based_on_acts_9_26_31_22',
    go:'click_to_continue_to_chapter_three',code:['chapter_three_code_code',codeOf(3,0)]});
  await wait(1500);ov.onclick=()=>startChapter(3);await new Promise(()=>{})}
function hint2(){
  if(F.preach&&G.room!=='harbor')return['reason',['they_want_answers_from_the_scriptures',
    'i_should_talk_to_dositheus']];
  if(G.room==='upper')return['upper',['i_am_among_brothers_at_last','when_i_am_ready_the_door']];
  if(G.room==='harbor'){
    if(!F.metCapt)return['capt',['ship_without_a_sail_and_a_tentmaker','i_should_speak_with_the_ships_captain']];
    if(!F.sailDown)return['halyard',['no_one_can_mend_what_is','halyard_at_the_foot_of_the_mast']];
    if(!F.gotPatch)return['patch',['sound_cloth_is_often_thrown','i_can_cut_a_patch_from_the_heap']];
    if(!F.gotTwine)return['twine',['man_who_has_what_i_need','old_fisherman_has_not_eaten']];
    return['sew',['everything_is_at_hand','i_should_sew_the_patch']]}
  if(F.told)return['door',['i_no_longer_stand_alone','barnabas_waits_at_the_door']];
  if(!F.knocked&&!F.metBarn)return['knock',['i_came_to_join_the_brothers','i_should_knock_at_the_door']];
  if(!F.metBarn)return['barn',['my_name_closes_that_door','i_should_speak_with_the_man']];
  if(!F.wheelOn)return['wheel',['some_loads_cannot_be_lifted_alone','loose_wheel_must_go_back']];
  if(!F.gotStick)return['stick',['wheel_needs_a_pin','there_is_a_pruned_branch']];
  if(!F.peg)return['peg',['good_wood_but_the_wrong_shape','my_knife_can_shape_the_olive']];
  return['fix',['peg_is_ready','i_should_fit_the_peg_to_the_handcarts']]}
/* ============ CHAPTER DEFINITION ============ */
const BNhs=BN.hs;
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={nod:['yes_i'],
  shake:['no_no',
  'no_brother_said']};
return{acting:ACTING,rooms:['jerusalem','upper','harbor'],setup:()=>{BN.hs=BNhs;setup2()},start:start2,hint:hint2,music:MUSIC,topics:TOPICS,tablets:TABLETS,
  route:[['damascus','jerusalem'],['jerusalem','caesarea','new'],['caesarea','tarsus','new sea']],
  place:room=>{if(F.told)place(BN,'jerusalem',360,114,-1);if(room==='upper'||F.preach)place(BN,'upper',96,124,1);if(room==='upper')F.upper=1;if(F.preach&&room==='jerusalem')disputers()},
    flags:['knocked','metBarn','gotStick','peg','wheelOn','cartFixed','told','metCapt','sailDown','gotPatch','gotTwine','upper','preach'],
    ent:{jerusalem:[40,120,1],upper:[56,120,1],harbor:[40,122,1]},
    inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
      add(F.gotStick&&!F.peg,'stick');add(F.peg&&!F.cartFixed,'peg');add(room==='harbor'&&!F.gotTwine,'provisions');
      add(F.gotPatch,'sailpatch');add(F.gotTwine,'twine');return inv}};
});
