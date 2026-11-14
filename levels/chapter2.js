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
  {drum:1,moods:['calm'],prog:'AB',seq:{A:'d.....t.d...t...',B:'d.....t.d.b.t...'},vol:.8},
  {inst:'ney',moods:['calm'],from:4,oct:12,lines:[[[0,4,4],[4,5,2],[6,4,2],[8,2,6]],[[0,1,4],[4,2,2],[6,3,2],[8,4,8]],[[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,2,4],[4,1,4],[8,0,8]],[],[],[],[],
    [[0,4,3],[3,5,1],[4,7,4],[8,6,4],[12,4,4]],[[0,5,4],[4,4,2],[6,3,2],[8,2,8]],[[0,3,4],[4,2,2],[6,1,2],[8,2,4],[12,1,4]],[[0,0,14]]]},
  {inst:'harp',moods:['hope'],prog:'GCGDGCDG',seq:{G:[-1,_,_,1,_,_,3,_,6,_,_,3,_,_,1,_],C:[2,_,_,4,_,_,6,_,9,_,_,6,_,_,4,_],D:[3,_,_,5,_,_,7,_,10,_,_,7,_,_,5,_]}},
  {inst:'bass',moods:['hope'],prog:'GCGDGCDG',seq:{G:[-8,_,_,_,_,_,_,_,-8,_,_,_,_,_,-4,_],C:[-5,_,_,_,_,_,_,_,-5,_,_,_,_,_,-8,_],D:[-4,_,_,_,_,_,_,_,-4,_,_,_,_,_,-6,_]},len:5},
  {drum:1,moods:['hope'],prog:'AB',seq:{A:'d..t..t.d..t..k.',B:'d..t..t.d..t.bk.'},vol:.8},
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
  mattan:{skin:'#c08a5c',hair:'#4a2f1a',beard:'#4a2f1a',tunic:'#7a6a9a',cloak:'#c8b88a',belt:'#3a2414',long:1,ph:1900}});
const BN=actor('barnabas','Barnabas','#f0b070',128),CE=actor('cephas','Cephas','#8ec8f0',108),JA=actor('james','James','#d8c8f0',122),
  CP=actor('captain','the captain','#f09080',100),FI=actor('fisher','the fisherman','#b8e0c0',140),MT=actor('mattan','Mattan','#e8d890',126);
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
  stick:{name:'olive branch',look:'A pruned olive branch, seasoned and straight-grained. Good wood for a peg.'},
  peg:{name:'wooden peg',look:'A stout peg with a tapered point. I have carved a thousand like it, for tents.'},
  provisions:{name:'provisions',look:'Bread and dried figs from the brothers in Jerusalem, for the voyage.'},
  twine:{name:'tarred twine',look:'Tarred twine, thick as a bowstring. It will hold a seam against the wind.'},
  sailpatch:{name:'sailcloth patch',look:'A sound piece of sailcloth, cut from a worn-out sail.'}});
Object.assign(COMBO,{
  'knife+stick':async()=>{SFX.cut();await say(P,'A square shank, a tapered point...');delItem('stick');addItem('peg');F.peg=1;
    await say(P,'I have carved a thousand tent pegs. This one will hold a wheel instead.')},
  'knife+peg':()=>say(P,'It is the right shape already.'),
  'awl+stick':()=>say(P,'An awl only makes holes. The branch needs a blade.'),
  'awl+twine':()=>say(P,'Ready. Now, what needs sewing?'),
  'sailpatch+twine':()=>say(P,'The patch must be sewn onto the torn sail itself.'),
  'awl+sailpatch':()=>say(P,'The patch must be sewn onto the torn sail itself.'),
  'sailpatch+thread':()=>say(P,'My thread is for tent seams. A sail under wind would snap it.'),
  'knife+sailpatch':()=>say(P,'It is large enough to cover the tear. I will leave it whole.'),
  'knife+provisions':()=>say(P,'I will break the bread when it is time to eat it.')});
function setup2(){place(BN,'jerusalem',228,118,-1);place(CE,'upper',168,120,-1);place(JA,'upper',212,123,-1);
  place(CP,'harbor',262,122,-1);place(FI,'harbor',186,116,-1);place(MT,'harbor',214,130,1);G.inv=['awl','thread','knife'];drawInv()}
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
async function knock(){SFX.knock();await wait(600);
  if(F.told){await say(BN,'It is Barnabas! Open, sister, and do not be afraid.');await say(DK,'Barnabas? But the man beside you...');
    await say(BN,'I will answer for him. Let us in, and let the brothers hear him for themselves.');SFX.door();await say(DK,'...If you say so. Come up.');
    return go('upper',56,120,1)}
  if(F.knocked){await say(DK,'Please, go away. No one here will open to you.');
    return say(P,'Knocking louder will not help. I need someone they trust to speak for me.',TH)}
  F.knocked=1;await say(DK,'Who is there?');await say(P,'Saul, of Tarsus. I have come to join the brothers.');
  await say(DK,'Saul of... the one who dragged our brothers off to prison?');await say(DK,'Go away. Please. We know what you are.');
  await say(P,'I cannot blame her. I gave them every reason to fear me.',TH)}
async function liftWheel(){if(!F.metBarn)return say(P,'It belongs to that man and his cart. I should speak to him before I touch it.');
  await say(P,'Take the other side, friend. Together, now!');await walk(BN,170,116);SFX.creak();await fade(1,220);F.wheelOn=1;await wait(250);await fade(0,220);
  await say(BN,'It is on! But with no pin through the axle, it will roll off again before I reach the corner.');await walk(BN,228,118);BN.dir=-1}
async function barnStory(){
  await say(BN,'It holds! Friend, you have the hands of a craftsman and the heart of a brother.');
  await say(BN,'I am Joseph, a Levite from Cyprus. The apostles call me Barnabas. And you?');
  await say(P,'I am Saul. Of Tarsus.');await walk(BN,240,118);BN.dir=-1;
  await say(BN,'Saul... the Saul who carried letters to Damascus, to bring the disciples back in bonds?');
  await quiz(BN,'Is it true, then?',[
    {q:'I acted in ignorance. Any man with my training would have done the same.',r:['Perhaps. But that is a man still defending himself.']},
    {q:'Yes. I persecuted the congregation, and I was wrong.',ok:1,p:['Yes. I persecuted the congregation of God, and I was wrong.','I was a blasphemer and an insolent man. I will not pretend otherwise.'],r:['...You do not soften it. Good.']},
    {q:'That is behind me. What matters is that I am here now.',r:['Those who lost family to your arrests cannot set it aside so quickly.']}]);
  await quiz(BN,'Then what turned you around?',[
    {q:'It is a long story. Must I tell all of it here in the street?',r:['If you want that door to open, yes. Tell me in detail.']},
    {q:'Ask the brothers in Damascus. They will tell you.',r:['Damascus is many days away, and you are standing here. Tell me yourself.']},
    {q:'On the road to Damascus, the Lord Jesus spoke to me.',ok:1,p:['Near Damascus a light from heaven flashed around me, and the Lord Jesus spoke to me.','For three days I could not see, until a disciple named Ananias was sent to me.'],
      r:['Blind for three days, and then a brother sent to open your eyes... That sounds like our Lord.']}]);
  await quiz(BN,'And since then?',[
    {q:'I spoke in the name of Jesus in Damascus, until I had to flee.',ok:1,p:['In Damascus I spoke openly in the name of Jesus, until there was a plot against my life.',"The brothers lowered me down the city wall in a basket. Hardly a hero's exit."],
      r:['Ha! A basket. No man invents a story like that to make himself look great.']},
    {q:'I have worked harder than most. Surely that counts for something.',r:['It may. But a man who recommends himself convinces no one.']},
    {q:'I would rather speak of that only to the apostles.',r:['They will ask why I trust you. Give me something to tell them.']}]);
  await say(BN,'I believe you, Saul. And the brothers will hear it from me.');await say(BN,'Come. They know my voice at that door.');
  F.told=1;await walk(BN,360,114);BN.dir=-1}
ROOMS.jerusalem={walk:[16,466,110,138],mood:'calm',amb:{birds:.5,crowd:.35,wind:.15,hooves:.25},hs:[
  {name:'city gate',x:0,y:22,w:58,h:82,wx:44,wy:114,dir:-1,look:'The gate I came in by. The road from Damascus was long.',use:'I did not walk all this way to turn back.'},
  {name:'temple',x:150,y:6,w:64,h:34,wx:180,look:['The temple, gleaming above the rooftops.','I studied in its shadow, at the feet of Gamaliel. How much I thought I knew.']},
  {name:'olive tree',x:66,y:44,w:44,h:58,wx:98,wy:114,look:'An old olive tree. Someone has pruned it recently.',pickup:'The tree is not mine to cut.'},
  {name:'pruned branch',x:96,y:100,w:24,h:10,wx:108,wy:116,vis:()=>!F.gotStick,look:"A pruned olive branch, left on the ground for anyone's fire.",pickup:take('gotStick','stick','Seasoned olive wood. Hard and straight-grained.')},
  {name:'loose wheel',x:124,y:84,w:20,h:24,wx:148,wy:114,dir:-1,vis:()=>!F.wheelOn,look:'A cart wheel, leaning on the wall. The pin that held it on the axle has sheared off.',pickup:'It is too heavy for one man.',use:liftWheel},
  {name:'handcart',x:148,y:68,w:68,h:40,wx:176,wy:116,
    look:()=>say(P,F.cartFixed?'Sound again, and ready to roll.':F.wheelOn?'The wheel is back on its axle, but nothing holds it there.':'A handcart loaded with grain and oil. It sits crippled on a stone block, one wheel off.'),
    pickup:"It is another man's cart, and another man's errand.",
    use:()=>say(P,!F.metBarn?'I should speak to its owner first.':F.wheelOn?'The axle needs a new pin to keep the wheel on.':'It needs its wheel back on, and a pin to keep it there.'),
    useWith:async it=>{if(it==='stick')return say(P,'The branch is too thick for the pin hole. It needs shaping first.');
      if(it==='awl'||it==='thread')return say(P,'No stitch will hold a wheel on.');if(it!=='peg')return false;
      if(!F.wheelOn)return say(P,'The wheel must be on the axle before a pin can hold it.');
      SFX.door();delItem('peg');F.cartFixed=1;await say(P,'Through the axle, and a tap to seat it. Like pegging a tent in hard ground.');return barnStory()}},
  {name:'bench',x:282,y:90,w:26,h:14,look:'A stone bench by the door. I do not think I would be welcome to sit.'},
  {name:'door of the house',x:312,y:50,w:40,h:54,wx:330,wy:112,look:'A plain, solid door. Disciples of the Lord meet in the room above.',use:knock,open:knock,talk:knock},
  {name:'latticed window',x:368,y:34,w:30,h:24,wx:380,look:'A latticed window. I think someone is watching from behind it.'},
  {name:'street to the markets',x:462,y:60,w:18,h:60,wx:456,wy:120,look:'The street runs on toward the markets and the temple mount.',use:'My business is at that door first.'}]};
BN.hs={get name(){return F.cartFixed||G.room!=='jerusalem'?'Barnabas':'man with the handcart'},actor:BN,
  look:()=>say(P,G.room==='upper'?'Barnabas. He staked his own good name on my word.':F.cartFixed?'Barnabas: "Son of Comfort", they call him. I can see why.':'A man in a red tunic, struggling with a loaded handcart.'),
  give:async()=>{await say(BN,'Keep it, friend. You may need it yet.')},
  talk:async()=>{if(G.room==='upper')return say(BN,'Someone once spoke up for me, Saul. Now go and prove me right.');
    if(F.told)return say(BN,'Come, Saul. The door.');if(F.cartFixed)return barnStory();
    if(!F.metBarn){F.metBarn=1;await say(P,'Peace to you. May I help?');await say(BN,'Peace! You may, if you have a wheelwright hidden in your cloak.');
      await say(BN,'This grain and oil is for the widows. The wheel came off, the pin is snapped, and they are waiting.');
      return say(P,'I am no wheelwright. But I work with my hands. Let me see what can be done.')}
    await talkTree([
      {q:'What happened to the cart?',a:()=>say(BN,'The pin sheared through and the wheel rolled off. I need a new pin, and a second pair of arms to lift.')},
      {q:'Who is the food for?',a:()=>say(BN,'For the widows among the disciples. No one among us should be in need.')},
      {q:'Do you know the people in that house?',a:async()=>{await say(BN,'Know them? I am on my way to them. Why do you ask, friend?');await say(P,'I will tell you. When your hands are free.')}},
      {q:'I will see what I can do.',bye:1}])}};
ROOMS.upper={walk:[24,300,112,138],mood:'calm',amb:{birds:.25,crowd:.12},
  enter:async()=>{place(BN,'upper',96,124,1);await say(BN,'Cephas, James: this is Saul of Tarsus. Before you answer, hear me.');
    await narr('Barnabas told them in detail how Saul had seen the Lord on the road, and how in Damascus he had spoken boldly in the name of Jesus. (Acts 9:27)',{dur:8000});
    await say(CE,'Saul. I too know what it is to fail my Lord, and to be shown mercy.');await say(CE,'Stay in my house, brother. We have much to speak about.');
    await say(JA,'If Jehovah has opened this door, we will not be the ones to shut it.');await say(P,'Brothers... thank you. I do not deserve this.')},
  hs:[
  {name:'door to the city',x:12,y:38,w:34,h:68,wx:34,wy:113,dir:-1,look:'The door to the street, and to a city full of synagogues where I am known.',exit:()=>leaveUpper()},
  {name:'shelf of scrolls',x:70,y:36,w:56,h:18,wx:98,look:'Scrolls of the Law and the Prophets. Every one of them points to the Christ. How did I not see it?',pickup:'They belong to the congregation.'},
  {name:'table',x:128,y:86,w:74,h:24,wx:164,wy:114,look:'A low table. Bread, a lamp and the Scriptures: all a household needs.'},
  {name:'open scroll',x:142,y:86,w:32,h:9,wx:158,wy:114,look:['The scroll of Isaiah, open on the table.','"A light of nations." I have read those words all my life. Now they read differently.'],pickup:'It belongs to the congregation.'},
  {name:'window',x:224,y:30,w:52,h:44,wx:250,look:'The temple, bright in the sun. So near to this room, and yet so few there will listen.'},
  {name:'bench',x:280,y:84,w:38,h:24,wx:290,wy:114,look:'A bench with a worn cushion. Many long conversations have happened here.'}]};
CE.hs={name:'Cephas',actor:CE,look:'Cephas, whom many call Peter. A fisherman from Galilee, and an apostle of the Lord.',
  give:async()=>{await say(CE,'Keep it. A guest brings nothing but himself.')},
  talk:()=>talkTree([
    {q:'Tell me about the Lord.',a:async()=>{await say(CE,'Fifteen days will not be enough, Saul. But sit, and I will begin where he found me:');await say(CE,'on a beach in Galilee, mending nets.')}},
    {q:'The disciples in this city fear me.',a:()=>say(CE,'Fear fades when people see fruit. Give them time, and give them reasons.')},
    {q:'I will speak with you again.',bye:1}])};
JA.hs={name:'James',actor:JA,look:"James, the Lord's brother. Quiet, and listening closely.",
  give:async()=>{await say(JA,'There are others who need it more. But thank you.')},
  talk:()=>talkTree([
    {q:"You are the Lord's brother.",a:async()=>{await say(JA,'I grew up in the same house, and for years I did not put faith in him.');await say(JA,'So I do not judge a man by how late he came to it.')}},
    {q:'What should I do now?',a:()=>say(JA,'What you did in Damascus: speak. And listen to the brothers when they tell you it is time to go.')},
    {q:'Thank you, James.',bye:1}])};
/* ---------- Caesarea harbor ---------- */
const SEW=['awl','twine','sailpatch','thread'];
async function mendSail(it){if(!SEW.includes(it))return false;
  if(it==='thread')return say(P,'My thread is for tent seams. A sail under wind would snap it. I need something heavier.');
  if(!has('sailpatch'))return say(P,'The tear is too long to draw closed. It needs a patch of sound sailcloth.');
  if(!has('twine'))return say(P,'I have a patch, but nothing strong enough to sew it on with.');
  return finale2()}
async function lowerSail(){if(!F.metCapt)return say(P,"I should not touch a ship's rigging without her captain's word.");
  await say(P,'Easy... paying it out, hand over hand.');SFX.creak();await fade(1,220);F.sailDown=1;await wait(250);await fade(0,220);SFX.creak();
  await say(CP,'Gently done. You have hauled a line before.');await say(P,'Tent ropes, mostly.')}
ROOMS.harbor={walk:[16,466,110,138],mood:'hope',amb:{waves:.8,gulls:.6,wind:.3,creak:.5},hs:[
  {name:'warehouse',x:0,y:24,w:112,h:66,wx:60,look:'Grain warehouses. Caesarea feeds half the coast.'},
  {name:'heap of old sailcloth',x:18,y:90,w:52,h:18,wx:48,wy:114,look:'Worn-out sails, heaped for rag. Some of the cloth is still sound.',
    pickup:()=>say(P,F.gotPatch?'I have all I need from it.':'A whole sail is far too heavy. I only need one sound piece of it.'),
    use:()=>say(P,F.gotPatch?'I have all I need from it.':'I would need a blade to take a piece of it.'),
    useWith:async it=>{if(it!=='knife')return false;if(F.gotPatch)return say(P,'One patch is enough.');
      SFX.cut();F.gotPatch=1;addItem('sailpatch');await say(P,'I cut a broad square from the soundest corner.')}},
  {name:'drying nets',x:114,y:62,w:56,h:42,wx:142,wy:114,look:'Fishing nets, hung up to dry and mend.',pickup:"They are a man's livelihood."},
  {name:'sea',x:172,y:60,w:68,h:36,wx:206,look:'The Great Sea. Beyond it lie Cyprus, Cilicia, Greece... nations far away.'},
  {name:'harbor tower',x:202,y:20,w:20,h:38,wx:212,look:'The tower on the breakwater. Its fire guides ships in by night.'},
  {name:'cargo',x:428,y:86,w:50,h:24,wx:440,wy:116,look:'Jars of oil and wine, waiting to be loaded.',pickup:'That would be stealing.'},
  {name:'ship',x:240,y:56,w:214,h:44,wx:300,wy:112,
    look:()=>say(P,F.sailDown?'A sturdy coasting ship, waiting on her sail.':'A sturdy coasting ship. Her sail hangs in two pieces from the yard.'),
    use:"I cannot board without the captain's leave."},
  {name:'torn sail',x:308,y:16,w:86,h:46,wx:350,wy:112,vis:()=>!F.sailDown,look:'Ripped nearly from top to bottom. No ship sails far on that.',
    use:'I cannot reach it up there. It must come down first.',useWith:async it=>SEW.includes(it)?say(P,'I cannot sew it up there. It must come down first.'):false},
  {name:'halyard',x:340,y:60,w:22,h:20,wx:350,wy:112,vis:()=>!F.sailDown,look:'The halyard, made fast at the foot of the mast. It raises and lowers the yard.',use:lowerSail,pickup:'It is holding up the yard.'},
  {name:'torn sail',x:298,y:102,w:108,h:13,wx:350,wy:122,vis:()=>F.sailDown,look:'Spread on the quay, the tear is as long as a man. But the cloth around it is strong.',
    pickup:'It is far too heavy, and it is not mine.',use:'It needs a patch, heavy twine, and a tool to drive the stitches.',useWith:mendSail}]};
CP.hs={name:'the captain',actor:CP,look:'The master of the ship. He keeps glancing at the sky, judging the wind.',
  give:async()=>{await say(CP,'Keep your things. What I need is a sail.')},
  talk:async()=>{if(!F.metCapt){F.metCapt=1;await say(P,'Peace to you, captain. Is this the ship for Tarsus?');
      await say(CP,'She is, when she has a sail. A squall off Dor split it from top to bottom.');
      await say(CP,'My sailmaker is ashore in Joppa, and the wind will not wait for him.');
      await say(P,'I am a tentmaker. Heavy cloth and I are old friends. Let me mend it.');
      return say(CP,'A tentmaker! Mend it before the evening wind, and you sail to Tarsus without paying a coin. Bring the yard down by the halyard.')}
    await talkTree([
      {q:'What will the sail need?',a:()=>say(CP,'A patch of sound sailcloth, and tarred twine. Not thread: thread parts in the first gust.')},
      {q:'Where can I find those?',a:async()=>{await say(CP,'There is old sailcloth heaped by the warehouse. Take what you like.');await say(CP,'Twine... ask the old fisherman. He hoards it like silver.')}},
      {q:'I will get to work.',bye:1}])}};
FI.hs={name:'the fisherman',actor:FI,look:'An old fisherman mending his nets. His hands never stop moving.',
  give:async it=>{if(it!=='provisions')return false;
    await say(P,'You have not eaten since dawn. Here: bread and figs.');await say(FI,'You would give a stranger your food for the voyage?');
    await say(P,'There will be bread in Tarsus. You are hungry now.');SFX.good();delItem('provisions');F.gotTwine=1;addItem('twine',1);
    await say(FI,'Then take this ball of twine, tentmaker. A gift for a gift.')},
  talk:async()=>{if(F.gotTwine)return say(FI,'Fair winds to you, friend. And thank you.');
    await say(P,'Peace to you. You are hard at work.');await say(FI,'Since before dawn. Nets tear faster than an old man can mend them, and I have not stopped to eat.');
    await talkTree([
      {q:'What do you mend nets with?',a:async()=>{await say(FI,'Tarred twine. Nothing else lasts in salt water.');await say(FI,'I have a ball to spare, if I had a reason to spare it.')}},
      {q:'Is that ship bound for Tarsus?',a:()=>say(FI,'So her captain says. If he can ever hang a sail on her.')},
      {q:'Peace to you.',bye:1}])}};
MT.hs={name:'Mattan',actor:MT,look:'Mattan, one of the brothers who brought me down from Jerusalem.',
  give:async()=>{await say(MT,'No, brother. That is for your journey.')},
  talk:()=>talkTree([
    {q:'Will the congregation be safe?',a:()=>say(MT,'With you gone, the opposers will lose interest. I think there will be peace for a while.')},
    {q:'I had hoped to stay in Jerusalem.',a:async()=>{await say(MT,'And we hoped to keep you. But a living brother in Tarsus is worth more than a dead one here.');await say(MT,'Go where the Lord sends you.')}},
    {q:'Let me see about that ship.',bye:1}])};
/* ============ SCENES: intro, journey, ending; PRAYER HINTS ============ */
async function start2(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(2);G.scene=null;G.end={};enterRoom('jerusalem',24,122,1);codeBtn();await fade(0,600);
    await narr('Jerusalem, some time later.',{dur:2800});
    await narr('Three years ago Saul left this city to hunt the disciples of the Lord. Now he returns as one of them.');
    await walk(P,96,122);
    await say(P,'Jerusalem. I know these streets... and the doors I once had broken open.');
    await say(P,'The disciples meet in the upper room of that house. I must try to join them.')},true)}
async function leaveUpper(){
  await say(P,'There are synagogues in this city where I am known. Let me speak there, in the name of the Lord.');
  await say(BN,'Go, Saul. Speak as you did in Damascus.');await fade(1,700);const o={dur:8000};
  await narr('Paul stayed with Cephas for fifteen days, moving about freely in Jerusalem and speaking boldly in the name of the Lord. (Acts 9:28; Galatians 1:18)',o);
  await narr('But the Greek-speaking Jews with whom he disputed made attempts to do away with him. (Acts 9:29)',o);
  await narr('While he was praying in the temple, the Lord directed him to leave Jerusalem quickly: he would be sent to nations far away. (Acts 22:17-21)',o);
  await narr('When the brothers found out about the plot, they brought him down to Caesarea, to send him off to Tarsus. (Acts 9:30)',o);
  enterRoom('harbor',36,124,1);G.inv=CHAP[2].inv('harbor');drawInv();codeBtn();await fade(0,700);
  await narr('Caesarea, the great harbor on the coast.',{dur:3000});await walk(P,170,128);
  await say(MT,'There she is, Saul: the only ship in harbor bound for Cilicia.');await say(MT,'But look at her sail. She is going nowhere like that.');
  await say(MT,'You have the bread and figs the brothers packed for your voyage. I only wish we could give you a ship as well.');
  await say(P,'A ship that cannot sail, and a tentmaker who must. Let us see her captain.')}
async function finale2(){
  SFX.sew();await say(P,'A patch laid under the tear, a flat seam doubled over it...');SFX.sew();await wait(800);
  await say(P,'...and every stitch pulled tight in tarred twine.');delItem('sailpatch');delItem('twine');F.sailMended=1;SFX.good();
  await say(CP,'I have paid sailmakers for worse work than that. Haul away!');
  await fade(1,300);F.sailUp=1;SFX.creak();await wait(450);await fade(0,300);
  await say(CP,'She draws! Come aboard, tentmaker. We sail on this wind.');
  await walk(MT,P.x-26,P.y+2);MT.dir=1;P.dir=-1;
  await say(MT,'This is where we part, brother.');await say(P,'I came to Jerusalem hoping to stay. It seems my road leads elsewhere.');
  await say(MT,'Wherever it leads, you do not walk it alone now. And Barnabas says he will not forget where Tarsus is.');
  await say(P,'Greet Cephas and James for me. Tell them a persecutor found brothers.');
  await walk(P,278,112);await fade(1,400);P.room=null;CP.room=null;G.ship={ox:0,paul:1,capt:1};await fade(0,400);
  walk(MT,262,120);await wait(900);
  const sail=tween(14000,k=>{G.ship.ox=Math.round(300*k*k)});
  await narr('So the brothers sent him off to Tarsus. (Acts 9:30)',{dur:6000});
  await narr('The congregation throughout Judea, Galilee and Samaria then entered into a period of peace, and it was built up. (Acts 9:31)',{dur:8000});
  await sail;await narr('Years would pass in Tarsus. Then, one day, a friend would come looking for him. (Acts 11:25)',{dur:6500});
  SFX.win();ov.className='on end';ov.innerHTML='<h2>CHAPTER COMPLETE</h2><h1 style="font-size:calc(var(--s)*12px)">A Friend in Jerusalem</h1>'+
    '<p>Paul forced no door. A friend spoke for him, and honest words and honest work did the rest.</p>'+
    `<p>Prayers for wisdom: ${G.prays}</p>`+
    '<p class="small">Based on Acts 9:26-31; 22:17-21 and Galatians 1:18, 19. Supporting characters and dialogue are imaginative; the events are from the Scriptures.</p>'+
    '<p class="go">Click to continue to Chapter Three</p><p class="small">Chapter Three code: '+codeOf(3,0)+'</p>';
  await wait(1500);ov.onclick=()=>startChapter(3);await new Promise(()=>{})}
function hint2(){
  if(G.room==='upper')return['upper',['I am among brothers at last. There is much to learn here, and then much to do.','When I am ready, the door leads out to the city and its synagogues.']];
  if(G.room==='harbor'){
    if(!F.metCapt)return['capt',['A ship without a sail, and a tentmaker without a passage. Each may be the answer to the other.',"I should speak with the ship's captain."]];
    if(!F.sailDown)return['halyard',['No one can mend what is out of reach.','The halyard at the foot of the mast will lower the sail.']];
    if(!F.gotPatch)return['patch',['Sound cloth is often thrown out with the worn. A trained eye can tell them apart.','I can cut a patch from the heap of old sailcloth by the warehouse.']];
    if(!F.gotTwine)return['twine',['The man who has what I need has a need of his own. Giving comes before receiving.','The old fisherman has not eaten. I could share my provisions with him.']];
    return['sew',['Everything is at hand. Now, the work itself.','I should sew the patch onto the torn sail with the twine and my awl.']]}
  if(F.told)return['door',['I no longer stand alone. A trusted voice is ready to speak for me.','Barnabas waits at the door of the house. I should go and knock.']];
  if(!F.knocked&&!F.metBarn)return['knock',['I came to join the brothers. The first step is the plainest one: ask.','I should knock at the door of the house where the disciples meet.']];
  if(!F.metBarn)return['barn',["My name closes that door. Perhaps a stranger's need will open another. Who nearby could use a pair of hands?",'I should speak with the man struggling with his handcart.']];
  if(!F.wheelOn)return['wheel',['Some loads cannot be lifted alone. That is true of wheels, and of more than wheels.','The loose wheel must go back on the axle. With its owner helping, I can lift it.']];
  if(!F.gotStick)return['stick',['A wheel needs a pin. What does a tentmaker know how to make from a piece of wood?','There is a pruned branch lying under the olive tree.']];
  if(!F.peg)return['peg',['Good wood, but the wrong shape. My hands know the right one.','My knife can shape the olive branch into a peg.']];
  return['fix',['The peg is ready. It belongs where the old pin sheared off.',"I should fit the peg to the handcart's axle."]]}
/* ============ CHAPTER DEFINITION ============ */
const BNhs=BN.hs;
return{rooms:['jerusalem','upper','harbor'],setup:()=>{BN.hs=BNhs;setup2()},start:start2,hint:hint2,music:MUSIC,
  place:room=>{if(F.told)place(BN,'jerusalem',360,114,-1);if(room==='upper')place(BN,'upper',96,124,1)},
    flags:['knocked','metBarn','gotStick','peg','wheelOn','cartFixed','told','metCapt','sailDown','gotPatch','gotTwine'],
    ent:{jerusalem:[40,120,1],upper:[56,120,1],harbor:[40,122,1]},
    inv(room){const inv=['awl','thread','knife'],add=(c,id)=>{if(c)inv.push(id)};
      add(F.gotStick&&!F.peg,'stick');add(F.peg&&!F.cartFixed,'peg');add(room==='harbor'&&!F.gotTwine,'provisions');
      add(F.gotPatch,'sailpatch');add(F.gotTwine,'twine');return inv}};
});
