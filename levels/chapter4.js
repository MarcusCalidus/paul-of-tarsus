/* Paul of Tarsus: level data for Chapter Four, "Sent Out to Cyprus".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   It is the first hub chapter: Seleucia, Salamis and Paphos are places on the travel map (shared/map.js), and the way out of a
   town opens the map. A place opens when the story reaches it, and the road never leads back. */
LEVEL(4,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A sea crossing in E Aeolian: a harp rocks in three, three and two like a hull on a swell, over a slow bass and a frame drum.
   In the synagogue and at sea (mood "calm") a ney takes the tune in the second half; in the harbors (mood "hope") a reed pipe plays it
   throughout, with a shaker. Before the proconsul (mood "tense") only a drone, a slow drum and a few notes of the lyre remain. */
const _=null,
 TUNE=[[[0,4,4],[4,5,2],[6,4,2],[8,2,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,4,2],[6,5,2],[8,6,4],[12,4,4]],[[0,5,4],[4,4,4],[8,4,8]],
  [[0,7,4],[4,6,2],[6,5,2],[8,4,4],[12,2,4]],[[0,3,4],[4,4,2],[6,5,2],[8,4,8]],[[0,2,2],[2,3,2],[4,4,2],[6,6,2],[8,7,4],[12,6,4]],[[0,4,4],[4,2,4],[8,0,8]]],
 MUSIC={dt:.17,root:52,scale:[0,2,3,5,7,8,10],bars:16,tracks:[
  {inst:'harp',moods:['calm','hope'],prog:'AABAACDA',len:3,seq:{A:[0,_,_,2,_,_,4,_,7,_,_,4,_,_,2,_],B:[-1,_,_,1,_,_,3,_,6,_,_,3,_,_,1,_],C:[2,_,_,4,_,_,6,_,9,_,_,6,_,_,4,_],D:[-2,_,_,0,_,_,2,_,5,_,_,2,_,_,0,_]}},
  {inst:'bass',moods:['calm','hope'],prog:'AABAACDA',len:5,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-8,_,_,_,_,_,_,_,-4,_,_,_,_,_,_,_],C:[-5,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],D:[-9,_,_,_,_,_,_,_,-5,_,_,_,_,_,-4,_]}},
  {drum:1,moods:['calm'],seq:{A:'d..k..t.d..k..t.'},vol:.6},
  {drum:1,moods:['hope'],prog:'AB',seq:{A:'d.sk.st.d.sk.st.',B:'d.sk.st.d.skbst.'}},
  {drum:1,moods:['tense'],seq:{A:'d.......d.d.....'},vol:.8},
  {drone:[0,7],every:32,moods:['tense']},
  {inst:'lyre',moods:['tense'],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,_,_,_,_,1,_,_,_,_,_],B:[0,_,_,_,_,_,_,_,_,_,-1,_,2,_,_,_]},vol:.7},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
const SH='#8f95c8';
/* What is seen through a city gate: sky, hills and the road running on. */
function gateView(g,x,y,w,h){g.save();arch(g,x,y,w,h);g.clip();sky(g,480,y+h-18,['#5a98d8','#a8cdea','#dfeaf0']);
  ridge(g,x,x+w,y+h-12,q=>8+3*Math.sin(q/5+1),['#9aa890','#b0ba98']);ridge(g,x,x+w,y+h-12,q=>3+2*Math.sin(q/3),['#86a070','#98b082']);
  R(g,x,y+h-12,w,12,'#c2c494');poly(g,[x+w*.45,y+h-12,x+w*.6,y+h-12,x+w*.95,y+h,x+w*.15,y+h],'#ead9ae');
  ao(g,x,y,w,10,'t',.55,'#2a2440');ao(g,x,y,5,h,'l',.5,'#2a2440');ao(g,x+w-4,y,4,h,'r',.35,'#2a2440');g.restore()}
/* a strip of sea between y0 and y1, lighter toward the horizon, with glints */
function seaArt(g,x,y0,w,y1,r,st){g.fillStyle=lg(g,0,y0,0,y1,st||['#a9cbd6','#62a0bc','#3f80a6','#2f6a92','#245a80']);g.fillRect(x,y0,w,y1-y0);
  for(let i=0;i<w*.6;i++){const k=r()*r(),sy=y0+1+k*(y1-y0-2);R(g,x+r()*w,sy,2+k*6+r()*4,.5,r()<.55?'rgba(214,238,244,.5)':'rgba(20,50,84,.35)')}}
/* a roll of bedding or cloth lying on the ground: x,y the left end, w long */
function roll(g,x,y,w,hh,c){oval(g,x+w/2+2,y+hh+.4,w/2+3,1.4,'rgba(40,30,60,.35)');g.fillStyle=lg(g,0,y,0,y+hh,[tint(c,.3),c,tint(c,-.5)]);g.fillRect(x,y,w,hh);
  for(let i=0;i<w;i+=2.5)R(g,x+i,y,.5,hh,'rgba(0,0,0,.22)');oval(g,x,y+hh/2,hh*.32,hh/2,tint(c,.12));oval(g,x+w,y+hh/2,hh*.32,hh/2,tint(c,-.35))}
/* the travelers' baggage, which John Mark looks after: two bed rolls, a leather bag, a food bag and a water flask */
function baggage(g,x,y){roll(g,x,y-5,17,5,'#8a5a4a');roll(g,x+3,y-9.6,15,4.6,'#6f7a5a');
  g.fillStyle=lg(g,x+20,0,x+31,0,['#a8703e','#8a5830','#5a3618']);g.beginPath();g.ellipse(x+25.6,y-4.4,5.6,4.6,0,0,6.2832);g.fill();R(g,x+23,y-10,5.2,2.6,'#7a4e28');R(g,x+22.4,y-8,6.4,1,'#3e2612');
  sack(g,x+36,y,3.6,6.4,'#cdbb8c');vessel(g,x+43,y,2.2,6.6,'#7a5a3a','jug',{noShadow:1})}
/* The ship for Cyprus: a round-bellied merchantman, bow to the left, with a plain curved sternpost and no figurehead.
   In harbor the yard is lowered to the rail with the sail furled on it, and the mast stands bare between its stays. Under sail (o.sail)
   the mast stops at the yard, so that the two never make a cross. o.plank: the gangplank to the quay; o.tent: our shelter on the
   foredeck; o.figs: a painter for the people on deck, who stand behind the rail. */
function ship(g,X,Y,t,o){o=o||{};const y=Y+Math.round(Math.sin(t/900)*2)/2,PL=(p,c)=>poly(g,p.map((v,i)=>i%2?v+y:v+X),c),SK=(p,c,w)=>stroke(g,p.map((v,i)=>i%2?v+y:v+X),c,w),H=(a,b,w,h,c)=>R(g,X+a,b+y,w,h,c);
  /* stays and mast */
  SK([97.5,13.4,6,60],'#4a3a2a',.6);SK([97.5,13.4,203,54],'#4a3a2a',.6);H(96,13.4,3.2,64,'#5a3c22');H(96,13.4,1,64,'#9a7040');
  if(o.sail){PL([50,15.4,146,11,146,13.6,50,18],'#5a3c22');SK([50,15.6,146,11.2],'#9a7040',.5);const sp=[53,17];for(let j=0;j<=10;j++)sp.push(51-Math.sin(j/10*3.1416)*6,17+j*4.4);for(let i=0;i<=10;i++)sp.push(51+i*9.2,61+Math.sin(i/10*3.1416)*3.5);for(let j=10;j>=0;j--)sp.push(143-Math.sin(j/10*3.1416)*4,13+j*4.8);
    PL(sp,'#e2d5b4');for(let i=1;i<8;i++)SK([53+i*11.4,17-i*.5,51+i*11.6,62.5],'#bfb292',.5);
    const q=sp.map((v,i)=>i%2?v+y:v+X);g.fillStyle=lg(g,X+45,0,X+146,0,['rgba(110,84,60,.34)','rgba(255,244,214,.1)','rgba(110,84,60,.3)']);g.beginPath();g.moveTo(q[0],q[1]);for(let i=2;i<q.length;i+=2)g.lineTo(q[i],q[i+1]);g.fill()}
  else{SK([28,74.6,156,73.4],'#5a3c22',1.6);for(let i=0;i<9;i++){const x0=34+i*13,yy=71.6-i*.1;PL([x0,yy+1,x0+3,yy,x0+10,yy,x0+13,yy+1,x0+12.4,yy+5.6,x0+.6,yy+5.6],i%2?'#cfc2a2':'#dccfb0');SK([x0+13,yy+.6,x0+12.6,yy+5.6],'#8a7c5c',.5)}}
  /* the steersman's cabin aft */
  H(160,63.6,31,13.4,'#7a5632');H(160,63.6,31,1,'#b88a52');H(159,62.4,33,1.6,'#4a3220');H(166,67.6,5,5,'#2a1c14');H(179,67.6,5,5,'#2a1c14');H(160,63.6,1.4,13.4,'rgba(30,16,8,.4)');
  /* our shelter on the foredeck: goat-hair cloth over a staff, its rope edge lashed down to the rail */
  if(o.tent){const tp=[22,77,34,62.6,72,62.6,84,77];PL(tp,'#241c18');g.fillStyle=lg(g,X+22,0,X+84,0,['#3e3229','#2a211c','#17110e']);g.beginPath();tp.forEach((v,i)=>{if(i%2)return;i?g.lineTo(X+v,tp[i+1]+y):g.moveTo(X+v,tp[i+1]+y)});g.fill();
    for(let j=64;j<77;j+=1.6)SK([34-(j-62.6)*.84,j,72+(j-62.6)*.84,j],j%3<1.6?'rgba(0,0,0,.2)':'rgba(255,240,210,.06)',.5);SK([30,62.4,76,62.4],'#a8804e',1);SK([30,63,76,63],'#5a3c20',.5);
    SK([22,77,34,62.6,72,62.6,84,77],'#8a7a5a',.7);for(const q of[26,40,66,80])SK([q,74.6,q+1,77.4],'#8a7a5a',.6)}
  if(o.figs)o.figs(X,y);
  /* hull */
  const hull=[0,60,7,58,13,76,196,76,204,57,212,52,211,66,203,93,190,101,22,101,9,94,2,78];
  g.fillStyle=lg(g,0,56+y,0,101+y,['#7a5230','#5e3e24','#33200f']);g.beginPath();hull.forEach((v,i)=>{if(i%2)return;i?g.lineTo(X+v,hull[i+1]+y):g.moveTo(X+v,hull[i+1]+y)});g.closePath();g.fill();
  SK([1.5,62,13.5,77.6,197,77.6,206,58],'#2e1c0e',1.4);SK([4,82,205,82],'#a8482c',2);SK([4,83.6,205,83.6],'#6a2a18',.6);SK([5,80.4,205,80.4],'#e2d2a8',.6);
  /* strakes, their butt joints staggered from one to the next like courses of brick */
  for(let j=0;j<4;j++){SK([7+j*1.4,87+j*3.6,204-j*1.8,87+j*3.6],'#2e1c0e',.5);for(let i=0;i<7;i++)H(26+i*26+(j%2)*13,84.4+j*3.6-(j?1:0),.6,j?3.6:2.6,'rgba(24,12,6,.4)')}
  SK([0,60,7,58],'#b88a52',.8);SK([204.6,57,212,52.4],'#b88a52',.8);
  /* the two steering oars, one to each side of the stern */
  PL([186,70,188.4,70,196,98,198,107,193,107,192,98],'#553720');PL([194,66,197,66,207,98,210,108,204,108,202,98],'#6e4a2a');
  if(o.plank){PL([40,77,49,77,31,104.5,21,104.5],'#8a6238');for(let i=0;i<6;i++)SK([40-i*3,80.6+i*3.6,48-i*3,80.6+i*3.6],'#5a3e22',.6);SK([49,77,31,104.5],'#b88a52',.5)}
  if(o.wake)for(let i=0;i<8;i++)R(g,X+214+i*9+(t/60%9),97.6+(i%2)+y,7-i*.6,.6,'#e6f2f4')}
/* ---------- Seleucia: the harbor of Antioch, in the morning ---------- */
ART.seleucia={w:480,fp:1.3,
 paint(g){const r=rng(211),ST='#d9cba6';
  sky(g,480,64,['#3f7cc6','#6ea4dc','#a6c8e6','#dfe9ec']);cloud(g,330,12,64,9,r);cloud(g,190,22,40,6,r);cloud(g,440,26,34,5,r);
  /* the mountain above the town, falling steeply to the sea */
  const mt=x=>Math.max(0,46-x*.21+5*Math.sin(x/23)+3*Math.sin(x/9+1));ridge(g,0,222,60,mt,['#7f94a8','#98aab0','#aebaae']);
  for(let i=0;i<70;i++){const tx=r()*200,ty=60-r()*mt(tx)*.8;oval(g,tx,ty,1.4+r()*1.6,.8+r()*.5,r()<.5?'#6f8a6a':'#8aa07c')}
  comp(g,'screen',.25,()=>R(g,0,24,480,38,'#c8d8ee'));
  /* the sea, and the mole that shelters the basin */
  seaArt(g,0,60,480,104,r);
  ashlar(g,128,55,166,6,'#c6b592',r,{bw:9,bh:3,v:.08,t:.25});for(let i=128;i<288;i+=11){R(g,i,52.8,6.4,2.4,'#c6b592');R(g,i,52.8,6.4,.5,'#efe0b8')}R(g,128,60.6,166,1.2,'#5f6470');
  ashlar(g,286,43,12,18,'#d2c19c',r,{bw:6,bh:3.4,v:.08,t:.25});R(g,284.5,41,15,2.4,'#e8d9b4');R(g,286,43,2.4,18,'rgba(60,50,90,.3)');
  /* the town wall and the gate to the Antioch road */
  ashlar(g,0,24,112,80,ST,r,{bw:13,bh:6.4,v:.09,t:.35});for(let i=0;i<112;i+=9){R(g,i,19.6,5.6,4.4,ST);R(g,i,19.6,5.6,.5,'#f4e8c8')}R(g,0,23.6,112,1,'#a8987a');
  poly(g,[112,19.6,119,23,119,104,112,104],'#a9a2b4');
  arch(g,22,52,40,52,'#c2b28c');gateView(g,24,54,36,50);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,42+Math.cos(a)*20-.3,72+Math.sin(a)*20-1,.6,2.6,'#a8987a')}
  windowArt(g,84,42,9,10,ST,{bars:2});
  /* the quay */
  pave(g,0,103,480,144,'#cdbd98',r,{vx:210,vy:58,rows:5,step:36,v:.09});ao(g,0,103,119,5,'t',.3,'#4a3a60');
  R(g,119,100,361,3.4,'#a8987a');R(g,119,100,361,.6,'#f0e0bc');R(g,119,103.2,361,.8,'#5a5258');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,112,104,128,112,0,114],SH,.6);
  /* mooring posts */
  for(const x of[236,444]){oval(g,x+3,104.4,4.6,1.2,'rgba(40,30,60,.5)');shade(g,[x+6,104,x+9,104,x+17,108.6,x+12,108.6],SH,.6);g.fillStyle=lg(g,x-1,0,x+7,0,['#8a7a66','#5a4c40','#3a302c']);g.fillRect(x,96,6,8);R(g,x-1,94.6,8,2,'#6a5a4a');R(g,x-1,94.6,8,.6,'#e8d8b8')}
  /* cargo for Cyprus: wine jars, sacks of grain */
  shade(g,[128,106,200,106,210,112,138,112],SH,.5);for(let i=0;i<4;i++)vessel(g,134+i*9.5,106,4.2,15-(i%2),['#a05a34','#8a4a2a','#b0683c','#96502e'][i],'amph');
  sack(g,177,106,7,11,'#cdbb8c');sack(g,190,107,8,13,'#d8c698');sack(g,184,97.4,6,8.6,'#c4b282');
  /* a coil of tarred cord beside the mooring post */
  oval(g,216,106,10,1.6,'rgba(40,30,60,.4)');for(let i=0;i<4;i++){g.strokeStyle=i%2?'#2e2620':'#463a2e';g.lineWidth=2.2;g.beginPath();g.ellipse(215,104.6-i*1.7,7.6-i*.5,2,0,0,6.2832);g.stroke()}stroke(g,[221,100,226,102.6,229,105.6],'#3a3028',.9);
  baggage(g,44,108);
  pool(g,330,0,300,150,'#fff0c0',.14,'screen');ao(g,0,0,110,144,'l',.1,'#2a2050')},
 fore(g){vessel(g,18,152,12,34,'#6a3420','amph',{noShadow:1});sack(g,42,148,10,15,'#a89870');
  for(let i=0;i<4;i++){g.strokeStyle=i%2?'#3a3028':'#52463a';g.lineWidth=3;g.beginPath();g.ellipse(500,139-i*2.6,16-i,4.2,0,0,6.2832);g.stroke()}
  comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){R(g,258,100.6,214,1,'rgba(20,40,60,.5)');for(let i=0;i<9;i++)R(g,262+i*24+Math.sin(t/500+i)*2,101.6,9,.6,'rgba(220,240,244,.6)');
  ship(g,262,0,t,{plank:1})},
 front(){}};
/* ---------- Salamis: the square between the harbor and the synagogue ---------- */
ART.salamis={w:480,fp:1.3,
 paint(g){const r=rng(233),LS='#e4d9bc',MB='#eee6d2',CU=['#c8743c','#b8632e','#d88a4a','#a85628'];
  sky(g,480,70,['#3a78c8','#66a0dc','#9cc4ea','#d6e6ee']);cloud(g,140,10,56,8,r);cloud(g,318,15,44,6,r);cloud(g,436,8,34,5,r);
  /* the harbor we landed in: the mole, and our ship at anchor with her sail furled */
  seaArt(g,0,60,112,104,r);ashlar(g,0,56,62,5,'#c6b592',r,{bw:9,bh:2.6,v:.08,t:.25});R(g,0,60.8,62,1,'#5f6470');
  R(g,91.6,51,1.4,25,'#5a3c22');stroke(g,[92.3,51,74,68.6],'#4a3a2a',.5);stroke(g,[92.3,51,110.6,66.6],'#4a3a2a',.5);poly(g,[80,73,104,72.4,104,75.4,80,76],'#dccfb0');
  poly(g,[72,69,77,68,80,76,105,76,109,67,112,66,112,81,80,81,75,78],'#5e3e24');R(g,77,77.6,35,1,'#a8482c');R(g,72,80.6,40,.8,'rgba(20,40,60,.5)');
  R(g,0,97,112,7,'#b8a888');R(g,0,97,112,.6,'#efe0bc');R(g,0,103.2,112,.8,'#5a5258');
  /* roofs of the city behind the marketplace */
  for(const[hx,hy,hw,hh]of[[118,12,30,16],[156,6,24,22],[200,14,34,14],[246,9,26,19]]){R(g,hx,hy,hw,hh,'#e6dcc0');R(g,hx,hy,hw,1.4,'#b8603c');R(g,hx+hw-4,hy+1.4,4,hh,'#b9b4b8');R(g,hx+hw*.3,hy+5,3,5,'#7a6c58')}
  cypress(g,190,28,15);cypress(g,240,28,12);cypress(g,282,28,16);comp(g,'screen',.2,()=>R(g,112,0,190,28,'#c8d8ee'));
  /* the stoa of the marketplace: a tiled roof on stone columns, shops in its shade */
  for(let i=112;i<300;i+=5.5){R(g,i,26,5,8,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,26,5,.7,'#e08a60');R(g,i+4.5,26,.6,8,'#7a3620')}
  g.fillStyle=lg(g,0,34,0,40.5,['#fdf8ea','#e8dfc8','#c4bca6']);g.fillRect(112,34,188,6.5);for(let i=114;i<300;i+=4)R(g,i,37.4,2,1.6,'#cfc6b0');
  plaster(g,112,40.5,188,63.5,'#b8ac92',r,{patch:3,cracks:4,brick:'#8a7a62',t:.4});comp(g,'multiply',.75,()=>R(g,112,40.5,188,63.5,'#a8a8cc'));
  for(let x=120;x<290;x+=56){R(g,x-2.5,53.5,25,50.5,'#8a8296');arch(g,x,56,20,48,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');ao(g,x,56,20,14,'t',.6)}
  for(let x=114;x<300;x+=28){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cbc2ac',MB,'#fffbee','#dbd2bc','#aaa4a0']);g.fillRect(x,42.5,7,59);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,44,.5,56,'rgba(120,112,104,.28)');R(g,x-1.2,40.5,9.4,2.6,MB);R(g,x-1.2,42.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#dfd6c0');R(g,x-1.2,100.4,9.4,.6,'#fffbee')}
  /* the coppersmith's stall: Cyprus copper, beaten into pots and pans */
  shade(g,[150,104,236,104,244,112,158,112],SH,.55);wood(g,152,50,2.4,56,'#6a4e2c',1);wood(g,231,50,2.4,56,'#6a4e2c',1);wood(g,150,52.4,86,2,'#7a5c36');awning(g,149,43,88,9,'#3f6a8a','#e6dcc4',8);
  [162,174,188,203,217].forEach((x,i)=>{R(g,x+.2,54.4,.6,3.4,'#5a4226');const c=CU[i%4],rr=3.4+(i%2);g.fillStyle=rg(g,x-1,60+rr-1.5,rr*1.6,[tint(c,.45),c,tint(c,-.45)]);g.beginPath();g.arc(x+.5,58+rr,rr,0,6.2832);g.fill()});
  R(g,160,94,66,11,'rgba(40,30,60,.4)');wood(g,160.6,94,3,11.5,'#6a4e2c',1);wood(g,220,94,3,11.5,'#6a4e2c',1);wood(g,157.5,88,69,4.4,'#96703e');R(g,157.5,92,69,1.2,'#5a4226');
  vessel(g,166,88,4,8,CU[0],'jug',{noShadow:1});vessel(g,178,88,5.6,6,CU[2],'bowl',{noShadow:1});vessel(g,191,88,4.2,10,CU[1],'jar',{noShadow:1});vessel(g,204,88,5,5,CU[3],'bowl',{noShadow:1});vessel(g,216,88,3.6,9,CU[2],'amph',{noShadow:1});
  for(const x of[166,178,191,204,216])R(g,x-1.6,82.4,1,2.4,'rgba(255,236,200,.7)');
  /* the synagogue: plain dressed stone, two steps and a door */
  house(g,304,28,126,76,LS,r,{stone:{bw:12,bh:6,v:.07,t:.3},beams:0});windowArt(g,318,40,10,10,LS,{bars:2});windowArt(g,406,40,10,10,LS,{bars:2});
  R(g,343,52,44,5.4,'#f1e8d0');R(g,343,52,44,.6,'#fffbee');R(g,343,57,44,.8,'#a59c86');R(g,346,57.8,38,46.2,'#d2c7aa');doorArt(g,350,60,30,44,'#6a4a2c',r);
  R(g,340,102,50,2.4,'#e6dcc2');R(g,340,102,50,.6,'#fffbee');R(g,336,104.2,58,2.6,'#dcd1b6');R(g,336,104.2,58,.6,'#fbf3dc');R(g,336,106.6,58,.8,'rgba(60,50,90,.4)');
  R(g,396,98,28,6,'rgba(40,30,60,.3)');R(g,396,95,28,3,'#d8cdb2');R(g,396,95,28,.6,'#fbf3dc');R(g,398,98,3.4,6,'#bdb298');R(g,418.6,98,3.4,6,'#bdb298');
  vessel(g,328,106,5.6,17,'#a05a34','pithos');shade(g,[304,104,336,104,330,110,304,110],SH,.4);
  /* the west gate, and the road across the island */
  ashlar(g,434,22,46,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=434;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,434,21.6,46,1,'#a8987a');poly(g,[434,17.6,429,21,429,104,434,104],'#a8a0b0');
  arch(g,440,54,34,50,'#c2b28c');gateView(g,442,56,30,48);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,457+Math.cos(a)*17-.3,71+Math.sin(a)*17-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#ddd2b8',r,{vx:250,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,112,103,368,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[112,104,300,104,306,108,118,108],SH,.4);shade(g,[429,104,434,104,448,110,436,110],SH,.6);
  pool(g,200,0,300,160,'#fff0c0',.14,'screen');ao(g,360,0,120,144,'r',.08,'#2a2050')},
 fore(g){const r=rng(234);/* the market spills to the street's edge: baskets of figs and pomegranates, a jar, a sack */
  for(const[bx,bw,bh]of[[46,14,12],[76,10,9]]){vessel(g,bx,148,bw,bh,'#6a5230','bowl',{noShadow:1});for(let i=0;i<12;i++)oval(g,bx-bw+3+r()*(bw*2-6),148-bh-r()*2.4,1.8,1.4,r()<.5?'#a8503a':'#6a3458')}
  vessel(g,506,152,10,30,'#5a2e1e','amph',{noShadow:1});sack(g,480,148,9,13,'#a89870');comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g){if(MK.room==='salamis')baggage(g,MK.x-52,MK.y-13)},
 front(){}};
/* ---------- Salamis: inside the synagogue ---------- */
ART.synagogue={w:320,
 light:()=>({amb:'#dccbb8',lamps:[[118,60,44,'#5a3a14'],[202,60,44,'#5a3a14']]}),
 paint(g){const r=rng(251),W='#e2d4b4',ST='#cfc3a6';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:5,brick:'#b89468'});
  for(let i=8;i<320;i+=28)wood(g,i,0,5,7,'#5a4226',1);wood(g,0,7,320,2.4,'#6a4e2c');ao(g,0,9.4,320,10,'t',.4,'#2a2030');
  /* two high windows, and two niches for the lamps */
  for(const x of[70,236])windowArt(g,x,24,14,18,W,{dark:'#bfe0f4',bars:2,wood:'#6a4e2c'});
  for(const x of[112,196]){arch(g,x-1,47,14,18,tint(W,-.3));arch(g,x,48,12,17,'#3a2c22');R(g,x-2,64.6,16,1.6,tint(W,.15));R(g,x-2,66.2,16,.6,tint(W,-.35));
    R(g,x+3,62,6,2.4,'#b8733c');R(g,x+3,62,6,.6,'#e0a064');R(g,x+8.6,61,2,1.4,'#b8733c')}
  /* the door to the square */
  R(g,5,50,30,54,'#cfc3a6');doorArt(g,8,53,24,51,'#6a4a2c',r,{left:1});
  /* the bench along the wall, where the people sit */
  const bench=(x,w)=>{R(g,x,91,w,13,'rgba(40,30,60,.3)');R(g,x,88,w,3.4,ST);R(g,x,88,w,.7,'#f0e6cc');R(g,x,91.4,w,12.6,'#b4a88c');R(g,x,91.4,w,1,'rgba(60,50,80,.35)')};
  bench(42,96);bench(286,34);
  /* the seats of the presiding officers, beside the chest and facing the people */
  R(g,186,71,54,18,'#d6cbb0');R(g,186,71,54,1,'#f4ead0');bench(184,58);for(const x of[184,211,238.6]){R(g,x,78,3.4,10,'#bdb196');R(g,x,78,3.4,.8,'#efe4c8')}
  /* the chest for the scrolls, under its cloth */
  R(g,250,96,32,8,'rgba(40,30,60,.35)');wood(g,252,62,28,40,'#6a4a2c',1);boards(g,254.4,67,23.2,31,5.8,'#8a6238',r);R(g,265.6,67,.8,31,'#3a2414');R(g,252,98,28,4,'#5a3e22');R(g,252,98,28,.6,'#9a7040');
  R(g,263.4,81,1.6,1.6,'#d8b860');R(g,267,81,1.6,1.6,'#d8b860');
  poly(g,[249,60,283,60,284,67.6,278,65.6,272,68.6,266,65.6,260,68.6,254,65.6,248,67.6],'#7a2f3a');R(g,249,60,34,1,'#a8505c');
  /* stone flags, and the platform for the reading with its desk */
  pave(g,0,103,320,144,'#c8b898',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  R(g,114,108,96,3,'rgba(30,20,40,.4)');poly(g,[116,98.6,204,98.6,210,103,110,103],'#a47a48');wood(g,110,103,100,5,'#8a6238');R(g,110,103,100,.6,'#c89a5c');
  poly(g,[150,99,170,99,168,86,152,86],'#6a4a2c');R(g,150,97.6,20,1.4,'#4a3220');poly(g,[148.6,86,171.4,86,169.4,82.6,150.6,82.6],'#8a6238');R(g,150.6,82.6,18.8,.6,'#c89a5c');
  R(g,153.4,83.2,13.2,2.2,'#ecdcb0');R(g,152.2,82.8,1.8,3,'#8a5a2c');R(g,166,82.8,1.8,3,'#8a5a2c');
  /* daylight from the windows, lamplight from the niches */
  lightmap(g,320,'#a09488',l=>{for(const x of[77,243]){pool(l,x,33,24,26,'#fff4d8',1);l.fillStyle=lg(l,0,42,0,140,['rgba(255,240,200,.45)','rgba(255,240,200,0)']);poly(l,[x-7,42,x+7,42,x+(x<160?44:-30),140,x+(x<160?-10:-84),140]);l.fill()}
    for(const x of[118,202])pool(l,x,60,36,32,'#ffc070',.8);pool(l,160,120,150,44,'#fff0d8',.4)})},
 fore(g){/* the backs of the nearest bench */
  R(g,0,138,104,6,'#3a3028');R(g,0,138,104,.8,'#7a6a58');R(g,216,138,104,6,'#3a3028');R(g,216,138,104,.8,'#7a6a58')},
 draw(g,t){for(const x of[112,196]){flame(g,x+8.6,60.6,t+x*7);pool(g,x+9,58,8+Math.sin(t/190+x),6,'#ffb050',.14)}},
 front(){}};
/* ---------- Paphos: the hall of the proconsul, open to the harbor ---------- */
ART.paphos={w:400,fp:1.25,
 light:()=>({amb:'#f0e2d2',shade:[[0,96,'#d8c8c4'],[306,400,'#e0d0c8']]}),
 paint(g){const r=rng(271),MB='#f1eadb',RED='#a8402e';
  /* the view between the columns: the harbor of Paphos inside its two moles */
  sky(g,400,54,['#3a78c8','#6aa2dc','#a4c8e8','#dbe8ee']);cloud(g,190,22,50,7,r);cloud(g,270,30,32,5,r);
  ridge(g,236,306,53,x=>Math.max(0,(x-236)*.14+1.5*Math.sin(x/6)),['#8ea284','#a8b890']);seaArt(g,96,53,210,84,r);
  ashlar(g,112,62,40,3.4,'#c6b592',r,{bw:8,bh:3.4,v:.08,t:.2});R(g,112,65.2,40,.8,'#5f6470');ashlar(g,188,62,36,3.4,'#c6b592',r,{bw:8,bh:3.4,v:.08,t:.2});R(g,188,65.2,36,.8,'#5f6470');
  for(const[sx,sy]of[[180,59],[250,61],[272,58.4]]){poly(g,[sx-2.5,sy,sx+2.5,sy,sx+2,sy+1.4,sx-2,sy+1.4],'#4a4a5c');poly(g,[sx-1.6,sy-.4,sx-1.2,sy-4.6,sx+1.8,sy-.6],'#ecdfc6')}
  /* the parapet */
  g.fillStyle=lg(g,0,82,0,104,['#e9e0cc','#d6ccb4','#bdb39c']);g.fillRect(96,82,210,22);
  /* the walls: red plaster above a dark dado */
  plaster(g,0,0,96,104,RED,r,{patch:0,cracks:3,t:.35});plaster(g,306,0,94,104,RED,r,{patch:0,cracks:3,t:.35});
  for(const[x,w]of[[0,96],[306,94]]){R(g,x,84,w,20,'#3a2a2c');R(g,x,82.6,w,1.4,'#e6d6a8');ao(g,x,60,w,24,'b',.18,'#2a1020')}
  poly(g,[96,12,100,14,100,104,96,104],'#7a3024');poly(g,[306,12,302,14,302,104,306,104],'#8a3628');
  /* entablature, and the shade under it */
  g.fillStyle=lg(g,0,0,0,12,['#cfc6b2','#f6f0e0']);g.fillRect(0,0,400,12);R(g,0,11,400,1.4,'#a8a090');for(let i=2;i<400;i+=5)R(g,i,7.4,2.4,2,'#d9d0bc');ao(g,0,12.4,400,10,'t',.35,'#2a2040');
  /* columns */
  for(const x of[104,164,228,290]){g.fillStyle=lg(g,x,0,x+8,0,['#cfc7b4',MB,'#fffdf4','#ded6c2','#aea8a4']);g.fillRect(x,15,8,87);for(let j=0;j<3;j++)R(g,x+1.8+j*2,17,.5,84,'rgba(120,112,104,.28)');
    R(g,x-1.4,12.4,10.8,3,MB);R(g,x-1.4,15.2,10.8,.6,'#a8a094');R(g,x-1.4,100.6,10.8,3.6,'#e2dac6');R(g,x-1.4,100.6,10.8,.6,'#fffdf4')}
  /* the door to the city */
  R(g,26,44,40,60,'#d8cdb4');R(g,26,44,40,1,'#fbf5e4');doorArt(g,30,48,32,56,'#6a4a2c',r,{left:1});
  /* a hanging behind the proconsul's seat, the dais, and the seat itself */
  for(let i=0;i<10;i++){const x=324+i*6.4,c=i%2?'#5a2848':'#6c3458';g.fillStyle=lg(g,0,16,0,84,[tint(c,.12),c,tint(c,-.3)]);g.fillRect(x,16,6.4,66+(i%2)*1.6)}R(g,322,14.6,68,2.4,'#8a6a2a');R(g,322,14.6,68,.6,'#d8b860');
  R(g,314,100,82,4.4,'#e4dcc8');R(g,314,100,82,.6,'#fffdf4');R(g,320,95.6,70,4.4,'#ebe4d2');R(g,320,95.6,70,.6,'#fffdf4');R(g,314,104.2,82,.8,'rgba(60,50,90,.4)');
  wood(g,343,56,26,28,'#6a4424',1);R(g,343,56,26,1.4,'#b88a52');R(g,345.6,60,20.8,20,'#5a3418');R(g,340,82,32,4,'#8a5a2c');R(g,340,82,32,.6,'#c8945a');R(g,342,79.6,28,2.6,'#7a2a4a');R(g,342,79.6,28,.6,'#a8507a');
  wood(g,340.6,86,3.4,9.6,'#5a3418',1);wood(g,368,86,3.4,9.6,'#5a3418',1);R(g,339,72,4.4,12,'#7a4e28');R(g,368.6,72,4.4,12,'#7a4e28');R(g,339,72,4.4,.8,'#c8945a');R(g,368.6,72,4.4,.8,'#c8945a');
  /* the proconsul's table: scrolls, a writing tablet, an inkpot */
  R(g,244,97,40,8,'rgba(40,30,60,.4)');wood(g,245,92,3,12.4,'#5a4226',1);wood(g,279,92,3,12.4,'#5a4226',1);wood(g,241.5,88,45,4,'#8a6238');R(g,241.5,91.6,45,1,'#4a3220');
  for(const[sx,c]of[[247,'#ecdcb0'],[253,'#e2d0a0'],[259,'#f0e4c0']]){R(g,sx,84.6,5,3.4,c);R(g,sx,84.6,5,.6,'#fff6dc');R(g,sx-.6,84.2,1.2,4.2,'#8a5a2c');R(g,sx+4.4,84.2,1.2,4.2,'#8a5a2c')}
  R(g,267,85.4,9,2.6,'#6a4424');R(g,267.8,85.9,7.4,1.4,'#2a2018');vessel(g,281,88,1.8,3.6,'#3a3a4a','jar',{noShadow:1});
  /* a brazier of bronze on three legs */
  oval(g,132,106,8,1.4,'rgba(40,30,60,.4)');stroke(g,[127,98,125,105.6],'#6a4a24',1);stroke(g,[137,98,139,105.6],'#6a4a24',1);stroke(g,[132,98,132.6,104.6],'#5a3e1e',1);vessel(g,132,98.6,6.6,5,'#b8863c','bowl',{noShadow:1});
  /* the floor: pale marble, the shadows of the columns across it */
  pave(g,0,103,400,144,'#e8e0d0',r,{vx:200,vy:62,rows:5,step:36,v:.1,joint:'#9c948a'});ao(g,0,103,400,5,'t',.3,'#4a4460');
  R(g,0,104.6,400,2,'rgba(138,58,48,.5)');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,400,41)});
  for(const x of[104,164,228,290])shade(g,[x,104,x+8,104,x+30,126,x+18,126],SH,.5);shade(g,[0,104,96,104,112,116,0,118],SH,.5);shade(g,[306,104,400,104,400,112,318,110],SH,.45);
  pool(g,200,40,170,120,'#fff0c0',.16,'screen');ao(g,0,0,60,144,'l',.14,'#2a1030');ao(g,340,0,60,144,'r',.1,'#2a1030')},
 fore(g){g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  g.fillStyle=lg(g,400,0,422,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(402,0,20,150);R(g,399,128,25,22,'#7a7488');R(g,399,128,25,1,'#d8d2d0');
  comp(g,'source-atop',.4,()=>R(g,0,0,430,150,'#34305a'))},
 draw(g,t){for(let i=0;i<5;i++){const k=(Math.floor(t/170)+i*3)%7;R(g,128+((i*5+k)%8),96.4+(k%2)*.5,1.4,.8,k<3?'#ffb040':'#e8581c')}pool(g,132,95,9+Math.sin(t/210),6,'#ff9a40',.12);
  if(MK.room==='paphos')baggage(g,MK.x-14,MK.y-12)},
 front(){}};
/* ---------- Antioch: the room where the congregation fasted and prayed (opening scene) ---------- */
ART.sendoff={w:320,paint(g){const r=rng(291),W='#e6d6ac';
  plaster(g,0,0,320,104,W,r,{patch:3,cracks:6,brick:'#b89468'});for(let i=10;i<320;i+=30)wood(g,i,0,6,6,'#5a4226',1);wood(g,0,6,320,2.4,'#6a4e2c');ao(g,0,8.4,320,10,'t',.35,'#2a2030');
  windowArt(g,236,24,20,22,W,{bars:3,dark:'#8fc0e8',wood:'#8a6a40'});R(g,21,43,36,61,'#d8c8a0');doorArt(g,24,46,30,58,'#8a6a40',r);
  arch(g,120,46,13,17,tint(W,-.3));arch(g,121,47,11,16,'#3a2c22');R(g,119,62.6,15,1.6,tint(W,.15));R(g,124,60,6,2.4,'#b8733c');R(g,124,60,6,.6,'#e0a064');
  R(g,150,96,60,8,'rgba(40,30,60,.3)');wood(g,152,93,3,11,'#5a4226',1);wood(g,205,93,3,11,'#5a4226',1);wood(g,148,89,64,4,'#96703e');R(g,148,92.6,64,1,'#5a4226');
  for(const[sx,c]of[[158,'#ecdcb0'],[168,'#e2d0a0']]){R(g,sx,85.6,7,3.4,c);R(g,sx-.6,85.2,1.2,4.2,'#8a5a2c');R(g,sx+6.4,85.2,1.2,4.2,'#8a5a2c')}
  pave(g,0,103,320,144,'#cdbb94',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  poly(g,[70,112,250,112,268,136,52,136],'#8a4a3a');poly(g,[74,114,246,114,262,134,58,134],'#a25a44');for(let i=0;i<9;i++)stroke(g,[78+i*20,114,64+i*23.6,134],'rgba(60,20,16,.3)',.6);
  lightmap(g,320,'#b4a698',l=>{pool(l,246,35,30,30,'#fff4d8',1);l.fillStyle=lg(l,0,46,0,140,['rgba(255,240,200,.5)','rgba(255,240,200,0)']);poly(l,[236,46,256,46,216,140,130,140]);l.fill();pool(l,126,58,36,30,'#ffc070',.7);pool(l,160,120,150,44,'#fff0d8',.4)})},
 draw(){},front(){}};
/* ---------- The crossing: evening on the sea, Cyprus ahead (voyage scene) ---------- */
ART.voyage={w:320,q:10,paint(g){const r=rng(307);
  sky(g,320,86,['#22386a','#45588e','#8f7696','#e09a72','#f8c680']);pool(g,58,86,130,54,'#ffd890',.55,'screen');pool(g,58,84,34,22,'#fff0c0',.7,'screen');oval(g,58,83,7,7,'#fff2c8');
  for(const[cx0,cy,cw]of[[70,40,70],[210,26,90],[280,52,50],[150,60,44]]){pool(g,cx0,cy+1.6,cw,4,'#7a5a84',.5,'source-over');pool(g,cx0,cy,cw*.9,3,'#ffc898',.75,'source-over')}
  for(let i=0;i<26;i++){const sx=120+r()*200,sy=2+r()*26;R(g,sx,sy,.5,.5,'#f4f0ff')}
  /* the long arm of Cyprus on the horizon */
  ridge(g,0,170,86,x=>Math.max(0,3.4+2.6*Math.sin(x/19)+1.2*Math.sin(x/6)-Math.max(0,x-120)*.1),['#5a5684','#6e6690']);
  g.fillStyle=lg(g,0,86,0,144,['#f0b080','#8a94b0','#3f6c96','#244c78','#16345c']);g.fillRect(0,86,320,58);
  for(let i=0;i<300;i++){const k=r()*r(),sy=87+k*56;R(g,r()*320,sy,2+k*8+r()*4,.5+k*.4,r()<.5?'rgba(190,210,235,.45)':'rgba(10,30,60,.4)')}
  for(let i=0;i<70;i++){const k=r(),sy=87+k*40,w=5+k*34;R(g,58-w/2+r()*w,sy,2+r()*5,.5+k*.5,r()<.6?'#ffdc9c':'#fff4d0')}},
 draw(){},front(){}};
/* The opening scene: the prophets and teachers of Antioch lay their hands on Barnabas and Saul (G.send.lay). */
const pose=(g,x,y,id,dir,bow,ges)=>figure(g,x,y,'#dccbb8',id+dir+'s'+bow+ges,s=>person(s,0,0,LOOK[id],dir,0,0,bow,ges,bow));
function sendoffScene(g){backdrop(g,'sendoff');const lay=(G.send||{}).lay?1:0;
  pose(g,74,124,'mark',1,lay,0);pose(g,118,121,'symeon',1,0,lay);pose(g,236,122,'manaen',-1,0,lay);
  pose(g,148,127,'barnabas',1,lay,0);pose(g,176,128,'paul',-1,lay,0);pose(g,206,125,'lucius',-1,0,lay)}
/* The crossing: the ship runs west before the wind, our shelter rigged on her foredeck (G.sea.k: 0 to 1). */
function voyageScene(g,t){backdrop(g,'voyage');const k=(G.sea||{}).k||0,X=Math.round(118-86*k),lit='#f0c8a8';
  ship(g,X,30,t,{sail:1,tent:1,wake:1,figs:(x,y)=>{man(g,x+112,y+91,'barnabas',-1,0,lit,0,0);man(g,x+128,y+92,'paul',-1,0,lit,Math.floor(t/700)%2,0);man(g,x+150,y+91,'mark',-1,0,lit,0,0)}});
  const y=30+Math.round(Math.sin(t/900)*2)/2;R(g,X-6,y+100.4,224,1.2,'rgba(12,30,56,.5)');for(let i=0;i<10;i++)R(g,X-4+i*22+Math.sin(t/500+i)*2,y+101.6,9,.6,'rgba(230,240,246,.6)');
  for(let i=0;i<5;i++)R(g,X-10-i*7+(t/70%7),y+96+(i%2)*1.6,6-i,.6,'#f4f8fa')}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  mark:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#8aa08a',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',slim:1,ph:900},
  kallias:{skin:'#9c6238',wrap:'#3f6a8a',beard:'#3a2a1a',tunic:'#b8643c',belt:'#2e2016',trim:'#7a3a20',brow:'#1a1210',ph:1500},
  jair:{skin:'#b88458',hair:'#d8d8d8',beard:'#e2e2e2',longBeard:1,bald:1,brow:'#a0a0a0',tunic:'#8a7a9a',cloak:'#c8b890',long:1,belt:'#4a3a24',ph:2100},
  zadok:{skin:'#b47e52',wrap:'#e6dcc0',beard:'#6a5a4a',longBeard:1,brow:'#4a3a2a',tunic:'#3f5a7a',cloak:'#d8cdb0',long:1,belt:'#8a6a2a',trim:'#c9a23a',ph:2600},
  philon:{skin:'#c49064',hair:'#3a2616',beard:'#3a2616',tunic:'#c07a3a',cloak:'#5a6a4a',long:1,belt:'#3a2414',trim:'#7a4a1e',ph:3300},
  /* a Roman governor sent by the Senate: no armor and no sword, a white robe with a purple hem */
  sergius:{skin:'#d0a078',hair:'#5a4a3a',brow:'#3a2a1a',tunic:'#f0ece0',cloak:'#f6f2e8',long:1,trim:'#7a2a4a',ph:1700},
  elymas:{skin:'#b07a50',wrap:'#5a2a5a',beard:'#1a1210',longBeard:1,brow:'#120c0a',tunic:'#2e3a5a',cloak:'#8a2a3a',long:1,belt:'#c9a23a',trim:'#c9a23a',longSleeve:1,ph:800},
  /* seen only in the opening scene */
  symeon:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',tunic:'#d8c9a0',cloak:'#7a5a3a',long:1,belt:'#4a3a24',ph:0},
  manaen:{skin:'#c09064',hair:'#8a8a8a',beard:'#9a9a9a',brow:'#6a6a6a',tunic:'#e6dcc8',cloak:'#6a3a4a',long:1,belt:'#8a6a2a',trim:'#8a6a2a',ph:0},
  lucius:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',trim:'#8a6a1a',brow:'#120c0a',ph:3100}});
const BN=actor('barnabas','Barnabas','#f0b070',128),MK=actor('mark','John Mark','#b8e0b0',176),KA=actor('kallias','Kallias','#f0a080',104),JR=actor('jair','Jair','#d8d0f0',96),
  ZA=actor('zadok','Zadok','#e8dca8',110),PH=actor('philon','Philon','#f0b890',132),SP=actor('sergius','Sergius Paulus','#f2e6c8',118),EL=actor('elymas','Bar-Jesus','#e0a8d8',92);
Object.assign(ICON,{
  cord(g){IH.coil(g,['#5a4a38','#7a664c','#5a4a38','#84705a'],12,8.4,7.4,2.6,2.7);stroke(g,[18.6,17,21,19,21.6,21.6],'#7a664c',1.4)},
  shelter(g){IH.square(g,'#221a16',3.6,7,16.8,11);g.strokeStyle='#8a7a5a';g.lineWidth=1;g.strokeRect(3.6,7,16.8,11);
    for(const[x,y]of[[2.4,5.8],[19.2,5.8],[2.4,16.8],[19.2,16.8]]){g.strokeStyle='#b8a880';g.lineWidth=.9;g.beginPath();g.arc(x+1.2,y+1.2,1.6,0,6.2832);g.stroke()}
    R(g,3.6,12,16.8,.7,'#3e3229')}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#3e2a16',2.6);stroke(g,[4.2,20.2,18.6,3.2],'#a8804e',1);stroke(g,[5.4,20.8,19.6,4],'#5a3c20',.6);
  R(g,17.4,3,2.6,2.6,'#6a4a2a');R(g,3.4,19.8,2.2,2.2,'#2a1c10')};
Object.assign(ITEMS,{
  bstaff:{name:"Barnabas's staff",icon:'staff',look:"Barnabas's walking staff, stout olive wood. It has seen more roads than I have.",
    by:{barnabas:'My walking staff. It is going home to Cyprus, as I am.'}},
  haircloth:{name:'goat-hair cloth',icon:'cloth',look:'Goat-hair cloth, bought with what my awl earned in Antioch. A tentmaker does not travel without it.',
    by:{barnabas:'Goat-hair cloth. The tentmaker never travels without it.'}},
  cord:{name:'tarred cord',look:"A length of ship's cord, tarred against the salt. Enough to run round the edge of a tent.",
    by:{barnabas:"Tarred cord, off the shipmaster's coil."}},
  shelter:{name:'deck shelter',look:'A roof of goat-hair cloth with a rope sewn into its edge, and a loop at each corner to lash it to the rail.',
    by:{barnabas:'A roof for a deck. I have watched tents made all my life, and never one like it.'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup4) */
const BY4={awl:"The tentmaker's awl. In his hand it is a wonder; in mine, a danger.",thread:'Waxed linen thread, and strong.',
  knife:'A knife for cloth and leather. I would only spoil good cloth with it.',tablets:'His wax tablets: people, work and Scripture, in a small hand.'};
async function sewShelter(){
  if(!has('cord')){await say(P,'I could hem this in an hour. But a tent on a deck cannot be pegged down: there is no ground under it.');
    return say(P,'It will have to be lashed to the rail. For that it needs a rope sewn into its edge, and a loop at every corner.',TH)}
  SFX.sew();await say(P,'The tarred cord laid along the edge, the cloth folded over it, and every stitch drawn tight...');SFX.sew();await wait(800);
  delItem('haircloth');delItem('cord');addItem('shelter',1);F.shelter=1;SFX.good();
  await say(P,'A loop at each corner, to lash it to the rail. And I have cut nothing off its width: there is room under it for more than three.')}
const edge=()=>say(P,'The cord belongs in the edge of the cloth. That is where a deck roof takes the strain.');
Object.assign(COMBO,{
  'awl+haircloth':sewShelter,'cord+haircloth':sewShelter,'haircloth+thread':sewShelter,
  'haircloth+knife':()=>say(P,'It is the right size as it is. A roof for a deck wants every span of it.'),
  'awl+cord':edge,'cord+thread':edge,'cord+knife':()=>say(P,'It is cut to length already.'),
  'awl+shelter':()=>say(P,'Every stitch is tight. It only wants a deck under it.'),'shelter+thread':()=>say(P,'Every stitch is tight. It only wants a deck under it.'),
  'knife+shelter':()=>say(P,'After all that work? No.'),
  'bstaff+shelter':()=>say(P,"A staff for a ridge pole! That is how we will rig it, once we are aboard."),
  'bstaff+haircloth':()=>say(P,'A staff will make the ridge pole, in good time. First the cloth needs its edge.'),
  'bstaff+knife':()=>say(P,"Whittle Barnabas's staff? He would walk to Paphos without me.")});
const ENT={seleucia:[150,124,1],salamis:[150,122,1],synagogue:[60,120,1],paphos:[150,124,1]},
  MARK={seleucia:[96,122,1],salamis:[292,124,-1],synagogue:[292,124,-1],paphos:[58,124,1]};
/* place4: put everyone where the story has them, for the room the party is in. Barnabas, Saul and John Mark travel together. */
function place4(room){P.called=F.heard?'Paul':'Saul';const e=ENT[room],o=PC()===P?BN:P;place(o,room,e[0]-26,e[1]+2,e[2]);
  const m=MARK[room];place(MK,room==='synagogue'?'salamis':room,...m);place(JR,room==='seleucia'?'seleucia':'synagogue',room==='seleucia'?176:88,room==='seleucia'?118:116,1)}
function setup4(){BN.hs=BN4;P.hs=PAUL4;P.called='Saul';Object.assign(BN,BARN4);for(const id in BY4)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY4[id];
  place(BN,'seleucia',124,126,1);place(MK,'seleucia',96,122,1);place(KA,'seleucia',334,116,-1);place(JR,'seleucia',176,118,1);
  place(ZA,'synagogue',214,113,-1);place(PH,'synagogue',296,122,-1);place(SP,'paphos',330,113,-1);place(EL,'paphos',366,119,-1);EL.speed=0;
  G.send=null;G.sea=null;G.inv=['awl','thread','knife','tablets','haircloth'];G.invs={paul:G.inv,barnabas:['bstaff']};drawInv()}
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const BARN4={noCraft:"That is the tentmaker's trade, not mine. I would only spoil it.",
  def:{look:'I see nothing there that needs me.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',
    use:"That is the tentmaker's trade, not mine.",open:'It does not open.',talk:'I would get no answer.',give:'First I should choose something to give.'}};
const inSel=()=>G.room==='seleucia',inPaph=()=>G.room==='paphos',inSal=()=>!inSel()&&!inPaph();
/* go4: through a door. The two men keep together, so the other follows. */
async function go4(room,x,y,dir){SFX.door();await fade(1);enterRoom(room,x,y,dir);place(PC()===P?BN:P,room,x-dir*26,y+3,dir);await fade(0)}
/* quizAs: the engine's quiz, answered by whoever is played. ask: the same, but a reply may come from anyone present: r lists lines, or [actor, line] pairs. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1]):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* Saul, as Barnabas sees him and talks to him */
const PAUL4={get name(){return F.heard?'Paul':'Saul'},actor:P,as:{barnabas:{
  look:()=>say(BN,inSel()?'Saul. Sent out this morning, and already looking for work for his hands.':inPaph()?'Paul. He looks a proconsul in the eye as he would a fisherman.':'Saul. On my island at last. I have wanted to show it to him for a year.'),
  talk:()=>talkTree([
    {q:'What can I do to help?',a:()=>say(P,inSel()?(!F.metKal?'Come with me to the shipmaster. You know how Cyprus men bargain.':!F.shelter?'Keep John Mark company. The roof is my part.'
        :!F.jairOk?(F.jairB?'You have done it already. The rest I must say to him myself.':'The old man will not speak to me. He may speak to you.'):'Nothing more. Lead the way aboard.')
      :inPaph()?(!F.ob1?'Tell the proconsul where you were born. I cannot.':'Stand beside me. That is help enough.')
      :(!F.vouched?'Speak to the presiding officer for me. Here you are known, and I am not.':!F.spoke?'Pray for me, brother, while I speak.':'Show me the road to Paphos.'))},
    {q:'Are you content to follow my lead on this island?',once:1,if:()=>!inPaph(),a:()=>say(P,'More than content. It is your island, Barnabas. I am glad to be shown it.')},
    {q:'I will leave you to it.',bye:1}]),
  show:{bstaff:()=>say(P,inSel()?'Keep your staff by you, Barnabas. I have a use in mind for it, once we are aboard.':'Keep your staff by you, Barnabas. We have a good deal of road before us.'),'*':'Keep it by you, Barnabas.'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'roof',q:'We need a shelter for the deck.',if:()=>inSel()&&F.metKal&&!F.shelter},
  {id:'oldman',q:'An old man of Salamis sails with us.',if:()=>inSel()&&F.metKal&&!F.jairOk},
  {id:'hearing',q:'How does a stranger get a hearing here?',if:()=>inSal()&&!F.spoke},
  {id:'elymas',q:'Who is the man beside the proconsul?',if:()=>inPaph()}];
/* ============ SCRIPTURE: the passages on the tablets. short: how a passage is named when it is offered as an answer ============ */
const PASS={
  ps133:{ref:'Psalm 133:1',short:'brothers dwelling in unity',text:'Look! How good and how pleasant it is For brothers to dwell together in unity!'},
  isa42:{ref:'Isaiah 42:4',short:'the islands keep waiting',text:'He will not grow dim or be crushed until he establishes justice in the earth; And the islands keep waiting for his law.'},
  sam7:{ref:'2 Samuel 7:12',short:'the offspring of David',text:'When your days come to an end and you are laid to rest with your forefathers, then I will raise up your offspring after you, your own son, and I will firmly establish his kingdom.'},
  ps16:{ref:'Psalm 16:10',short:'not left in the Grave',text:'For you will not leave me in the Grave. You will not allow your loyal one to see the pit.'},
  hos14:{ref:'Hosea 14:9',short:'the ways of Jehovah are upright',text:'For the ways of Jehovah are upright, And the righteous will walk in them; But the transgressors will stumble in them.'},
  deut18:{ref:'Deuteronomy 18:10',short:'no one who practices magic',text:'There should not be found in you anyone who makes his son or his daughter pass through the fire, anyone who employs divination, anyone practicing magic, anyone who looks for omens, a sorcerer'},
  dan2:{ref:'Daniel 2:27, 28',short:'a God who reveals secrets',text:'None of the wise men, conjurers, magic-practicing priests, or astrologers are able to tell the king the secret that he is asking. But there is a God in the heavens who is a Revealer of secrets'}},
  ORDER=['ps133','isa42','sam7','ps16','hos14','deut18','dan2'];
const label=k=>T('{ref}: {short}',{ref:T(PASS[k].ref),short:T(PASS[k].short)}),quote=k=>T('"{text}" ({ref})',{text:T(PASS[k].text),ref:T(PASS[k].ref)});
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inSel()?'Joseph, a Levite, born on Cyprus. The apostles named him Barnabas.':'On his own island he knows every door, and every door knows him.'},
    {name:'John Mark',note:'The cousin of Barnabas, from Jerusalem. He serves as our attendant, and forgets nothing.'},
    {name:'Kallias',note:'Master of the ship for Salamis. Water he gives; a roof we must bring.',if:()=>F.metKal&&inSel()},
    {name:'Jair',note:()=>F.jairOk?'A disciple of Salamis. He has forgiven me more than I could ask.':'An old man of Salamis. He knows my name, and turns away from it.',if:()=>F.metJair||F.jairB},
    {name:'Zadok',note:'He presides in a synagogue of Salamis. A careful man, and a fair one.',if:()=>F.metZad||F.vouched},
    {name:'Philon',note:'A merchant of Salamis. He questions everything, and means to search it out.',if:()=>F.spoke},
    {name:'Sergius Paulus',note:'Proconsul of Cyprus, an intelligent man. He asked to hear the word of God.',if:()=>F.heard},
    {name:'Bar-Jesus',note:'They call him Elymas, the Sorcerer. He does not want the proconsul to hear us.',if:()=>F.heard}],
  tasks:[
    {t:'Find a ship for Cyprus.',if:()=>inSel()&&!F.metKal},
    {t:'Make a shelter for the deck.',if:()=>inSel()&&F.metKal&&!F.shelter},
    {t:'Find something to lash it down with.',if:()=>inSel()&&F.metKal&&!F.gotCord&&!F.shelter},
    {t:'Make peace with the old man before we sail.',if:()=>inSel()&&(F.metJair||F.jairB)&&!F.jairOk},
    {t:'Go aboard, and sail for Salamis.',if:()=>inSel()&&F.shelter&&F.jairOk},
    {t:'Get a hearing in the synagogue.',if:()=>inSal()&&!F.vouched},
    {t:'Give a word of encouragement after the reading.',if:()=>inSal()&&F.vouched&&!F.spoke},
    {t:'Take the road west, to Paphos.',if:()=>inSal()&&F.spoke},
    {t:'Answer the proconsul: what is Cyprus to us?',if:()=>inPaph()&&!F.ob1},
    {t:'Answer the proconsul: what do we want of him?',if:()=>inPaph()&&F.ob1&&!F.ob2},
    {t:'Answer Elymas from the Scriptures.',if:()=>inPaph()&&F.ob2}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
/* ---------- Seleucia ---------- */
async function meetKal(me){F.metKal=1;
  await say(me,'Peace to you, shipmaster. They tell us you are bound for Cyprus.');
  await say(KA,'For Salamis, as soon as the last jar is stowed and the wind serves. With a fair wind the second sunrise finds us there.');
  await say(me,'There are three of us. The young man with the baggage has our fare.');
  await say(KA,'Then I have deck room for three. But hear the rest before you pay.');
  await say(KA,'A passenger gets drinking water from me, and nothing else. No bread, no bed and no roof.');
  await say(KA,'You sleep on the deck, and the spray comes over the bow all night. Bring a shelter, or be wet until Cyprus.');
  await say(KA,'If it wants lashing down, there is tarred cord in that coil by the mooring post. Cut what you need.');
  await say(me,me===P?"A roof for a ship's deck. That is work for a tentmaker.":"A roof for a ship's deck... I know a tentmaker.",TH)}
async function board(){const me=PC(),o=me===P?BN:P;
  if(!F.metKal)return say(KA,'Not so fast, friend! Nobody walks up my plank before I know who he is.');
  if(!F.shelter)return say(KA,F.gotCord?'You have the cord. Now make your roof, passenger. I am not sailing before the jars are stowed.':'Aboard already, and no roof? I told you: the spray comes over the bow all night.');
  if(!F.jairOk){await say(o,me===P?'Saul. The old man by the jars sails with us, and he has not one word for you. Let us not carry that aboard.'
      :'Barnabas, wait. The old man by the jars will not look at me. I would rather mend that on the quay than carry it aboard.');return}
  await say(KA,'The last jar is stowed, and the wind is coming round. Aboard, all of you!');return travel()}
KA.hs={name:'Kallias',actor:KA,look:'Kallias, master of the ship for Salamis. He watches every jar that goes aboard, and the sky between jars.',
  show:{haircloth:'Goat-hair cloth? It sheds water, I will say that for it. Make a roof of it, and lash it well.',
    cord:'That is my cord, and you are welcome to it. Lash your roof to the rail, mind, and not to my mast.',
    shelter:'A rope sewn into the edge, and a loop at every corner. You have rigged a tent before, passenger.',
    awl:'A sailmaker uses a needle. But I dare say that does the same work.',knife:'Keep that well away from my rigging.',
    tablets:'Write this down: we sail when the wind serves, and not before.','*':'Stow it with your baggage. Deck room is short.'},
  ask:{roof:['A tent cannot be pegged to a deck, passenger. Sew a rope into its edge, and lash it to my rail.','The coil by the mooring post. Cut what you need.'],
    oldman:'He paid his fare and he sits quietly. That is all I ask of a passenger.'},
  talk:async()=>{if(!F.metKal)await meetKal(P);
    await talkTree([
      {q:'What do you carry to Cyprus?',a:async()=>{await say(KA,'Wine and oil from Syria, and grain. I come back low in the water with Cyprus copper.');await say(KA,'And passengers, when they do not mind the deck.')}},
      {q:'How long is the crossing?',a:()=>say(KA,'A day and a night, and a little more, if the wind is kind. If it is not, do not ask me.')},
      {q:'Who else is sailing?',a:async()=>{await say(KA,'The old man by the jars. A Jew of Salamis, going home.');await say(KA,'He asked me for nothing. And I do not think he has a roof either.')}},
      {q:'We will be ready.',bye:1}])},
  as:{barnabas:{look:'A Cyprus shipmaster, or I never saw one. He will have agreed a price for every plank of that deck.',
    talk:async()=>{if(!F.metKal)return meetKal(BN);await say(KA,F.shelter?'Your friend has made his roof. I sail when the jars are stowed.':'Deck room for three, as I said. And a roof of your own, or a wet night.')},
    show:{bstaff:'A good staff. Lash it down at sea, or it goes over the side.','*':'Stow it with your baggage. Deck room is short.'}}}};
async function jairSaul(){
  if(F.jairOk)return talkTree([
    {q:'How long have you lived in Salamis?',a:async()=>{await say(JR,'I was born there. I lived in Jerusalem for some years, and I came to believe there.');await say(JR,'When we were scattered, I went home, and I told my own people what I had heard. (Acts 11:19)')}},
    {q:'Are there other disciples on Cyprus?',a:()=>say(JR,'A few, here and there. We spoke the word only to the Jews. I think you two have been sent to do more than that.')},
    {q:'Peace to you, Jair.',bye:1}]);
  if(!F.jairB){F.metJair=1;await say(P,'Peace to you, father. I hear we are to share a deck as far as Salamis.');
    await say(JR,'Peace.');await say(JR,'You are Saul. Saul of Tarsus.');await say(P,'I am.');
    await say(JR,'Then forgive an old man. I find I have nothing to say.');
    return say(P,'He knows my name. And whatever he knows of me, it has closed his mouth.',TH)}
  await say(P,'Jair. Barnabas tells me you are willing to hear me.');
  await say(JR,'I am willing to hear what you have to say about one night in Jerusalem. Mine was one of the doors you came through.');
  await quiz(JR,'So. What do you say about it, Saul of Tarsus?',[
    {q:'That is all behind me now. Let us look to the work ahead.',r:['Behind you. It is not behind me. I have lived on Cyprus ever since because of it.']},
    {q:'Jehovah has shown me mercy for it. I hope that you can, too.',r:['I do not doubt his mercy. But you have told me what he did, and what I should do. Not what you did.']},
    {q:'I did it. I dragged men and women out of their houses. I was wrong.',ok:1,
      p:['I did it. I went into one house after another, I dragged out men and women, and I handed them over to prison. (Acts 8:3)',
        'I was wrong, Jair. I cannot give you back your house, or the years. I can only say so to your face.'],
      r:['To my face.','In all these years, no one who came through my door that night has said as much.']}]);
  await say(JR,'In Judea they used to say: "The man who formerly persecuted us is now declaring the good news about the faith that he formerly devastated." (Galatians 1:23)');
  await say(JR,'I heard it, and I did not know whether to believe it. Now I have heard it from you.');
  F.jairOk=1;SFX.good();await say(JR,'Peace to you, brother Saul. And this time I mean it.');
  await say(P,F.shelter?'An old man, a night at sea, and no roof of his own. It is as well that I cut ours wide.':'An old man, a night at sea, and no roof of his own. Whatever I sew, I will sew it wide.',TH)}
async function jairBarn(){
  if(F.jairOk)return say(JR,'Joseph. You always did bring people together. They named you well.');
  if(F.jairB)return say(JR,'Let him come and say it to my face, Joseph. I will hear him.');
  await say(BN,'Peace to you, father. Do I not know you? Jair, of Salamis. You were in Jerusalem, in the first days.');
  await say(JR,'Joseph the Levite! Barnabas, the apostles named you. I knew you by your walk.');
  await say(JR,'I was in Jerusalem until the day they stoned Stephen. Then the persecution came, and we were scattered. I went home to Cyprus. (Acts 8:1; 11:19)');
  await say(JR,'And the man who drove us out is standing beside your baggage.');
  await ask(BN,JR,'Why should I share a deck with Saul of Tarsus?',[
    {q:'That was many years ago, Jair. It is time to forget it.',r:['I forget a great deal at my age, Joseph. Not that night.']},
    {q:'The holy spirit itself has sent him out. Who are we to object?',r:['I do not object to the holy spirit. I asked you about the man.']},
    {q:'I asked the same question once. Then I heard him out.',ok:1,
      p:['I asked the same question once, in Jerusalem, when every disciple there was afraid of him. So I heard him out. (Acts 9:26, 27)',
        'He did not excuse himself to me by one word. He will not to you. Let him tell you himself.'],
      r:['You heard him out. You were always a fairer man than I am.','Very well. Let him come and say it to my face. I will hear him.']}]);
  F.jairB=1;if(P.room===G.room){BN.dir=P.x>BN.x?1:-1;await say(BN,'He will hear you, Saul. The rest is yours to say.')}}
JR.hs={name:'Jair',actor:JR,
  look:()=>say(P,inSel()?(F.jairOk?'Jair, of Salamis. One of those I scattered. He calls me brother now.':F.metJair||F.jairB?'Jair. He looks out to sea, so as not to look at me.':'An old man with a small bundle, waiting to go aboard. He keeps glancing this way.')
    :'Jair, at home in his own synagogue, and glad to see us in it.'),
  show:{shelter:()=>say(JR,F.jairOk?'A roof, at sea. I have crossed this water many times, and never once dry.':'It is nothing to me.'),
    tablets:()=>say(JR,F.jairOk||!inSel()?'You write the Scriptures on wax, to carry them with you? I carry mine in here. But my memory is not what it was.':'It is nothing to me.'),
    '*':()=>say(JR,F.jairOk||!inSel()?'Keep it, brother. I need very little.':'It is nothing to me.')},
  ask:{roof:()=>say(JR,F.jairOk?'A dry night on this crossing would be a new thing to me.':'That is your affair.'),
    hearing:['Zadok presides here. He trusts what he knows.','And he has known the house of Joseph the Levite since he was a boy.']},
  talk:()=>inSel()?jairSaul():talkTree([
    {q:'Is this your synagogue?',a:()=>say(JR,'Since I was a child. I have told them what I believe, these many years. Some listen. Zadok listens, and says nothing.')},
    {q:'Will they hear us?',a:()=>say(JR,F.spoke?'They have heard you. Now they will read, and argue, and read again. That is our way.':'If Zadok gives you the platform, they will hear you. They are fair people.')},
    {q:'Peace to you, Jair.',bye:1}]),
  as:{barnabas:{look:()=>say(BN,F.jairB||F.jairOk||!inSel()?'Jair, of Salamis. We broke bread together in Jerusalem, in the first days.':'I know that face. From Jerusalem, years ago.'),
    talk:()=>inSel()?jairBarn():say(JR,F.spoke?'They heard him, Joseph. That is more than I ever managed.':'Speak to Zadok, Joseph. He remembers your family.'),
    show:{'*':'Keep it, Joseph. I need very little.'}}}};
MK.hs={name:'John Mark',actor:MK,
  look:()=>say(P,'John Mark, the cousin of Barnabas. He came up from Jerusalem with us, and he carries more than his share. (Colossians 4:10)'),
  show:{haircloth:'I wondered why that bundle was so heavy. Now I know.',cord:'Tarred cord? I will keep it away from the bread.',
    shelter:'A roof! Then the bed rolls will stay dry. I had been worrying about that.',tablets:'I should keep notes, as you do. There will be a great deal to remember.',
    awl:'I will carry anything you like. But not that: it is yours.','*':'Shall I pack it with the rest?'},
  ask:{roof:'I have bread, figs and water for three, and the bed rolls. A roof I did not think of.',
    oldman:'He has been watching you, brother Saul. Not unkindly, I think. But not gladly either.',
    hearing:'In Jerusalem a visitor waits to be asked. I expect it is the same here.',
    elymas:['They call him Elymas: the Sorcerer. His own name is Bar-Jesus.','The servants say the proconsul decides nothing without asking him first.']},
  talk:()=>talkTree([
    {q:'Is everything packed?',a:()=>say(MK,'Bed rolls, a change of clothing, the water flask, bread and figs, and the purse. I counted twice.')},
    {q:'You came up from Jerusalem with us.',a:async()=>{await say(MK,"From my mother's house. The congregation there used to meet under her roof. (Acts 12:12)");await say(MK,'When you and Barnabas went back to Antioch, you took me along. I mean to be useful. (Acts 12:25)')}},
    {q:'You carry more than your share.',once:1,a:()=>say(MK,'You two have the speaking to do. Leave the bread and the bundles to me.')},
    {q:'Thank you, John Mark.',bye:1}]),
  as:{barnabas:{look:'My cousin, John Mark. He carries the bags as if they held gold.',
    talk:()=>say(MK,inSel()?'Everything is here, cousin. I have never been to Cyprus. Is it as fine as you say?':inPaph()?'I will wait here by the door, cousin. I never thought to stand in such a house.':'So this is Salamis! You did not tell me it was so large, cousin.'),
    show:{bstaff:'Shall I carry it, cousin? No? I thought not.','*':'Shall I pack it with the rest, cousin?'}}}};
const BN4={name:'Barnabas',actor:BN,
  look:()=>say(P,inSel()?'Barnabas. Cyprus is his own island, and he has not stopped smiling since we were sent off.':inPaph()?'Barnabas. He stands before a proconsul as easily as before a fisherman.'
    :'Barnabas, a Levite and a native of this island. Here he is the one who knows every door. (Acts 4:36)'),
  show:{haircloth:'Goat-hair cloth. I have seen what you make of that.',cord:"Ship's cord? That is thicker than anything you have sewn before.",
    shelter:'A roof for four, I think. You cut it wide.',awl:'Your awl. I have never known you a day without it.',thread:'Good thread. It held a whole gift together, all the way to Judea.',
    knife:'Put it to work, brother. I will hold whatever needs holding.',tablets:'Read me something from them when we are at sea.','*':'Keep it, brother. You will find a use for it.'},
  ask:{roof:'You have cloth, an awl and thread. What does a tent lack, on a deck with no ground to peg it to?',
    oldman:'I know that face. From Jerusalem, years ago. Let me speak with him.',
    hearing:'I was born on this island. Let me speak to the presiding officer first.',
    elymas:'A Jew, and he lives by what the Law forbids. He will not want the proconsul to hear us.'},
  talk:()=>inSel()?talkTree([
      {q:'What is Cyprus like?',a:async()=>{await say(BN,'Mountains in the southwest, another range along the north coast, and a broad plain between them. And copper: the metal is named after the island.');
        await say(BN,'And many Jews live there. Salamis alone has more than one synagogue.')}},
      {q:'What do we still need for the crossing?',a:()=>say(BN,!F.metKal?'A word with the shipmaster, first of all. He is the one by the gangplank.':!F.shelter?'A roof for the deck, he says. You are the tentmaker.'
        :!F.jairOk?'Peace with the old man by the jars. I would not sail without it.':'Nothing. We can go aboard.')},
      {q:'Are you glad to be going home?',once:1,a:()=>say(BN,'Glad? I left Cyprus a Levite with a field to my name. I am going back with good news for the whole island.')},
      {q:'Let us get on.',bye:1}])
    :inPaph()?talkTree([
      {q:'What do you make of the proconsul?',a:()=>say(BN,'He listens before he speaks. I have not met many rulers of whom I could say that.')},
      {q:'And of the man beside him?',a:()=>say(BN,'He is afraid. A man who is paid for his advice does not like to hear better advice given away.')},
      {q:'Stand by me, brother.',bye:1}])
    :talkTree([
      {q:'Where do we begin?',a:()=>say(BN,!F.vouched?'In the synagogue. Zadok presides there. He will not know your face, but he may know mine.':!F.spoke?'With you, on the platform. Zadok is waiting for you to come to him.':'On the road west. All the way to Paphos.')},
      {q:'Did you know this city as a boy?',once:1,a:async()=>{await say(BN,'Every street of it. More trade passes through Salamis than through any other town on the island.');await say(BN,'I never thought I would come back to it with a message like this one.')}},
      {q:'Lead on.',bye:1}])};
ROOMS.seleucia={walk:[16,464,110,138],mood:'hope',amb:{waves:.6,gulls:.6,creak:.5,crowd:.2},hs:[
  {name:'mountain',x:120,y:14,w:100,h:36,wx:170,look:['The mountain stands with its feet in the sea, and the town wall climbs half way up it.','Seleucia is a fortress as much as a harbor.']},
  {name:'town wall',x:0,y:18,w:112,h:32,wx:70,look:'Walls of dressed stone. Antioch keeps its harbor well guarded.'},
  {name:'gate to the Antioch road',x:22,y:52,w:40,h:52,wx:42,wy:112,look:'The road back to Antioch: half a day on foot.',
    use:'They laid their hands on us and sent us off. I will not walk back through that gate until the work is done.',
    open:'They laid their hands on us and sent us off. I will not walk back through that gate until the work is done.'},
  {name:'mole',x:128,y:42,w:172,h:20,wx:214,look:'A mole of great stones shelters the basin. Beyond it lie the open sea, and Cyprus.'},
  {name:'cargo',x:128,y:86,w:70,h:22,wx:160,wy:114,look:'Jars of Syrian wine and oil, and sacks of grain, waiting to go aboard.',pickup:"It is the shipmaster's cargo, and none of mine."},
  {name:'coil of cord',x:205,y:96,w:26,h:11,wx:218,wy:113,look:"Ship's cord, tarred against the salt. Thinner than my wrist, and stronger than any thread I own.",
    pickup:()=>say(P,F.gotCord?'I have all I need of it.':F.metKal?'The whole coil? I need a few arm-spans, cut clean.':'It belongs to the ship. I will not help myself.'),
    use:()=>say(P,F.gotCord?'I have all I need of it.':'It would take a blade to make anything of it.'),
    useWith:async it=>{if(it!=='knife')return false;if(F.gotCord)return say(P,'I have cut what I need.');if(!F.metKal)return say(P,'It belongs to the ship. I will not cut it unasked.');
      SFX.cut();F.gotCord=1;addItem('cord');await say(P,'Enough to run round the whole edge, with four loops over. Cut clean, as the shipmaster said.')}},
  {name:'our baggage',x:42,y:96,w:48,h:13,wx:66,wy:114,look:'Bed rolls, a leather bag, bread and figs, a water flask. John Mark has packed for three, and forgotten nothing.',
    pickup:'John Mark has it in hand. An attendant who is not trusted with the baggage is no attendant.'},
  {name:'ship',x:262,y:10,w:214,h:66,wx:350,wy:112,look:['A round-bellied merchant ship, loading for Cyprus. Her sail is furled, and her two steering oars are lashed up.','Cargo below, and whatever passengers will fit on her deck.']},
  {name:'gangplank',x:282,y:77,w:30,h:27,wx:290,wy:112,dir:1,look:'The gangplank. The way to Cyprus begins with twelve steps of wet timber.',exit:()=>board()}]};
/* ---------- Salamis ---------- */
async function landed(){if(F.landed)return;F.landed=1;
  await narr('Salamis, on the eastern shore of Cyprus.',{dur:3200});
  await say(BN,'Salamis! I ran about this harbor as a boy. For trade and for learning, it is the first city of the island.');
  await say(JR,'And it has more than one synagogue. Mine is the one across the square. I am going there now, for the reading.');
  await say(JR,'Zadok presides there. A careful man. He will want to know who you are before he lets a stranger speak.');
  await walk(JR,365,113);SFX.door();place(JR,'synagogue',88,116,1);
  await say(P,'The word of God, first in the synagogues of the Jews. Let us begin where the Law and the Prophets are read.')}
const westRoad=()=>F.spoke?travel():say(PC(),PC()===P?'The road west, right across the island. But we did not come to Salamis to walk through it.':'The road to Paphos. I know every bend of it. But first, the synagogues of Salamis.');
ROOMS.salamis={walk:[16,464,110,138],mood:'hope',amb:{crowd:.55,gulls:.4,waves:.3,hammer:.4,birds:.2},enter:landed,hs:[
  {name:'harbor',x:0,y:44,w:110,h:58,wx:62,look:["The harbor of Salamis, and Kallias's ship riding at anchor with her sail furled.",'A day and a night under a roof of goat-hair cloth. I have slept worse on dry land.']},
  {name:'rooftops of Salamis',x:112,y:2,w:186,h:23,wx:210,look:'Salamis. For trade and for learning the first city of Cyprus, though the proconsul sits in Paphos.'},
  {name:'marketplace',x:112,y:26,w:188,h:17,wx:206,look:'The stoa of the marketplace, shop after shop in its shade.'},
  {name:"coppersmith's stall",x:150,y:43,w:86,h:63,wx:194,wy:114,look:['Pots and pans of Cyprus copper, beaten thin and bright.','Barnabas says the metal takes its very name from this island.'],pickup:'That would be stealing.'},
  {name:'synagogue',x:304,y:24,w:126,h:28,wx:366,look:'A synagogue of plain dressed stone. Salamis has more than one: the Jews of this city are many.'},
  {name:'water jar',x:321,y:87,w:14,h:20,wx:334,wy:113,look:'A great jar of water beside the door.',pickup:'It would take two men to lift.'},
  {name:'door of the synagogue',x:350,y:60,w:30,h:44,wx:365,wy:112,look:'The door of the synagogue. It stands open at the hours of reading and prayer.',exit:()=>go4('synagogue',60,120,1)},
  {name:'west gate',x:440,y:50,w:36,h:54,wx:456,wy:112,dir:1,look:'The west gate. From here the road runs across the whole island, as far as Paphos.',exit:westRoad}]};
/* ---------- The synagogue ---------- */
async function vouch(){
  if(F.spoke)return say(ZA,'I am still reading, Joseph. Come back in a year, and ask me what I found.');
  if(F.vouched)return say(ZA,'After the reading, Joseph. Tell your friend to come to me when he is ready.');
  await say(BN,'Peace to you, Zadok. Do you remember the house of Joseph the Levite?');
  await say(ZA,'Joseph! The Levite who went up to Jerusalem, and stayed. Your family sat on that very bench.');
  await say(ZA,'And the man with you?');await say(BN,'Saul, of Tarsus. He has something to say that this synagogue should hear.');
  await ask(BN,ZA,'Many men have something to say. Why should I give him the platform?',[
    {q:'He was educated at the feet of Gamaliel. You will not hear better.',r:['Learned men have misled synagogues before now, Joseph. Learning is not what I asked about.']},
    {q:'Because every Jew on this island needs to hear it.',r:['Needs to? That is for me to judge, when I know what it is.']},
    {q:'Let him speak after the reading, and test every word by the scroll.',ok:1,
      p:['Have the Law and the Prophets read, as you always do. Then let him speak, and test every word of it by the scroll.','If it is not written there, send us both away.'],
      r:['By the scroll. That is fair.','A man who asks to be tested by what is written, I cannot well refuse. After the reading, then: let him come to me when he is ready.']}]);
  F.vouched=1;SFX.good();if(P.room===G.room){BN.dir=P.x>BN.x?1:-1;await say(BN,'The platform is yours after the reading, Saul. Go to him when you are ready.')}}
/* part: one step of the talk. Saul thinks what comes next; a choice that runs ahead of his hearers is answered by them, and set aside. */
async function part(think,opts){let av=opts.slice();
  for(;;){await say(P,think,TH);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p)await say(P,l);for(const[a,l]of o.r)await say(a,l);if(o.ok)return;av=av.filter(x=>x!==o)}}
async function speak(){
  await say(ZA,'Take your seats, all of you. The reading today is from the prophet Isaiah.');
  await Promise.all([walk(ZA,160,110),walk(P,118,124),walk(BN,54,128)]);ZA.dir=-1;P.dir=1;BN.dir=1;
  await say(ZA,'"Look! My servant, whom I support! My chosen one, whom I have approved!" (Isaiah 42:1)');
  await say(ZA,quote('isa42'));
  await walk(ZA,214,113);ZA.dir=-1;
  await say(ZA,'Brothers, visitors: if you have a word of encouragement for the people, say it.');
  await walk(P,160,111);P.dir=-1;
  await part('A word of encouragement. Where do I begin?',[
    {q:'The one you wait for has come, and Jerusalem did not know him.',p:['Men, brothers: the one you are waiting for has already come, and the rulers in Jerusalem did not recognize him.'],
      r:[[PH,'He begins with an accusation! And against Jerusalem!'],[ZA,'Stranger, we do not yet know of whom you speak. Begin where we can follow you.']]},
    {q:'I was educated at the feet of Gamaliel, and still I was wrong.',p:['Men, brothers: I was educated at the feet of Gamaliel, and still I was wrong about the greatest matter of all.'],
      r:[[PH,'Is it himself he has come to tell us about?'],[ZA,'The reading was about the servant of Jehovah, visitor. Not about you.']]},
    {q:'You have just heard it read: the islands keep waiting.',ok:1,
      p:['Men, brothers. You have just heard it read: the islands keep waiting for his law.',
        'You are an island, and you have waited a long time. Let me begin with the God who chose our forefathers, and who keeps every promise he makes.'],
      r:[[PH,'That is true enough. We have waited.'],[ZA,'Go on.']]}]);
  await part('They are with me. What comes next?',[
    {q:'The Law of Moses could never declare you guiltless.',p:['Brothers, there are things from which the Law of Moses could never declare you guiltless.'],
      r:[[PH,'Now he speaks against Moses!'],[ZA,'You are far ahead of us, visitor. What has that to do with the servant?']]},
    {q:'God promised David an offspring whose kingdom would stand.',ok:1,
      p:['He brought our forefathers out of Egypt, and in time he gave them David as king.','And to David he promised an offspring whose kingdom he would firmly establish. (2 Samuel 7:12)'],
      r:[[JR,'The son of David. Yes.'],[ZA,'Every child here knows that promise. Go on.']]},
    {q:'This good news is for the nations as well.',p:['And this good news is not for Israel alone. It is for the nations as well.'],
      r:[[PH,'For the Greeks? Before we have so much as heard what it is?'],[ZA,'First tell us what it is, visitor. Then we may speak of whom it is for.']]}]);
  await part('The promise is before them. Now, the one in whom it is kept.',[
    {q:'The apostles have done many signs and wonders.',p:['Through the hands of the apostles in Jerusalem, many signs and wonders have occurred among the people. (Acts 5:12)'],
      r:[[PH,'Paphos is full of men who do wonders, for a fee.'],[ZA,'You asked to be tested by the scroll, visitor. Not by wonders.']]},
    {q:"From David's offspring God brought a savior, and raised him up.",ok:1,
      p:['From the offspring of David, as he promised, God has brought to Israel a savior: Jesus of Nazareth.',
        'They put him to death in Jerusalem, and laid him in a tomb. But God raised him up from the dead, and many saw him.',
        'David wrote: "You will not allow your loyal one to see the pit." David died, and was buried. This one, God raised up. (Psalm 16:10)'],
      r:[[PH,'Raised from the dead. If that were so, it would change everything.'],[JR,'It is so. I was in Jerusalem. I knew men who saw him.'],[ZA,'Let him finish, Jair.']]},
    {q:'Take care: the Prophets warn those who will not believe.',p:['Beware, brothers. The Prophets speak of something that will happen in your days, that you will not believe even if it is told to you. (Habakkuk 1:5)'],
      r:[[PH,'He threatens us before he has told us anything!'],[ZA,'A warning comes last, visitor, if it comes at all.']]}]);
  await part('They have heard who he is. What do I leave with them?',[
    {q:'Whoever rejects this judges himself unworthy of life.',p:['Whoever rejects this word judges himself unworthy of everlasting life.'],
      r:[[PH,'We have not rejected anything yet!'],[ZA,'No one here has refused you, visitor. Do not answer what has not been said.']]},
    {q:'That is all. Now we must be on our way across the island.',p:['That is what I came to say. Now we must be on our way across the island.'],
      r:[[ZA,'You tell us that the Christ has come, and then you speak of the road? Finish what you began.']]},
    {q:'Through him, forgiveness of sins is proclaimed to you.',ok:1,
      p:['So let it be known to you, brothers: through this one a forgiveness of sins is being proclaimed to you.',
        'You said you would test it by the scroll, Zadok. Do. Search it, and see whether these things are so.'],
      r:[[ZA,'You have given us a great deal to search, Saul of Tarsus. I will not say yes or no today. I will read.'],
        [PH,'So will I. And I will come and tell you if I find it otherwise.'],
        [JR,'And any who want to hear more today, come home with me. My house is small, but the door is open.']]}]);
  F.spoke=1;SFX.good();await fade(1,500);place(P,'synagogue',126,122,-1);place(BN,'synagogue',100,126,1);
  await narr('They began proclaiming the word of God in the synagogues of the Jews: in that one, and in the others of Salamis. (Acts 13:5)',{dur:7500});await fade(0,500);
  await say(BN,'One end of the island has heard, Saul. The other is many days away on foot. The west gate, when you are ready.')}
ZA.hs={name:'Zadok',actor:ZA,look:'Zadok, a presiding officer of the synagogue. He weighs a stranger as a merchant weighs silver.',
  show:{tablets:'Wax tablets. And what is written on them: your own words, or the words of the Prophets?',awl:'A craftsman. Good. A man who works with his hands does not talk for his bread.',
    '*':'This is a house of reading and prayer, stranger. Put it away.'},
  ask:{hearing:'By being known to me, stranger. Or by being spoken for by someone who is.'},
  talk:async()=>{if(F.spoke)return say(ZA,'I am reading, Saul of Tarsus. I have been reading since you sat down.');
    if(F.vouched)return speak();F.metZad=1;
    await say(P,'Peace to you. We are visitors, come from Antioch in Syria.');
    await say(ZA,'Peace to you, stranger. You are welcome to a seat, as every son of Israel is.');
    await say(ZA,'The platform is another matter. I do not know you, and I answer for what is said from it.');
    await say(P,'He does not know me. But he may well know a Levite who was born on this island.',TH)},
  as:{barnabas:{look:'Zadok. He was a young man on that bench when I was a boy on this one.',talk:vouch,show:{'*':'Put it away, Joseph. We will talk of the road afterward.'}}}};
PH.hs={name:'Philon',actor:PH,look:()=>say(P,F.spoke?'Philon. He is still frowning, but now it is over a scroll.':'A merchant, by his dress. He looks at strangers as if they owed him an answer.'),
  show:{tablets:'You carry the Prophets in wax? I carry the price of copper in mine.','*':'I am not buying today, stranger.'},
  ask:{hearing:'Do not ask me. Ask Zadok. Though I warn you: I shall have questions.'},
  talk:async()=>{await say(PH,F.spoke?'I said I would search it out, and I will. Do not think you have persuaded me. You have only made me curious.':'Philon, of Salamis. I deal in copper. And you are?');
    if(!F.spoke){await say(P,'Saul, of Tarsus. A tentmaker.');await say(PH,'A tentmaker, come to a synagogue in Cyprus. Then you have not come to sell tents.')}},
  as:{barnabas:{look:'Philon. His father sold copper too, and argued just as well.',talk:()=>say(PH,'The son of the Levite! They said you had sold up and gone to Jerusalem for good.'),show:{'*':'I am not buying today.'}}}};
ROOMS.synagogue={walk:[16,304,110,136],mood:'calm',amb:{crowd:.12,fire:.15},hs:[
  {name:'door to the square',x:8,y:53,w:24,h:51,wx:32,wy:113,dir:-1,look:'The door to the square.',exit:()=>go4('salamis',365,116,-1)},
  {name:'window',x:66,y:20,w:22,h:26,wx:92,look:'A high window. The light falls where the reader stands.'},
  {name:'window',x:232,y:20,w:22,h:26,wx:228,look:'A high window. The light falls where the reader stands.'},
  {name:'lamp',x:109,y:46,w:18,h:22,wx:118,look:'A lamp in a niche of the wall, burning even at noon.',pickup:'It gives light to the whole house where it is.'},
  {name:'lamp',x:193,y:46,w:18,h:22,wx:186,look:'A lamp in a niche of the wall, burning even at noon.',pickup:'It gives light to the whole house where it is.'},
  {name:'bench',x:42,y:86,w:96,h:18,wx:112,wy:113,look:['A bench along the wall, worn smooth by generations.','The people sit on three sides, and the reader stands in the middle.'],
    use:()=>say(P,F.spoke?'I have sat, and I have spoken. Now the road.':'Soon. First I have a question to settle with the presiding officer.')},
  {name:'reading platform',x:110,y:80,w:100,h:28,wx:160,wy:112,look:['The platform and the reading desk. A scroll of the Prophets lies open on it.','Any son of Israel may be asked to read here, or to speak. But he must be asked.'],
    use:()=>say(P,F.spoke?'I have said what I came to say here.':F.vouched?'Zadok will call me up after the reading. I should tell him that I am ready.':'Uninvited? No. The platform is in the keeping of the presiding officer.'),
    pickup:'The scroll belongs to the synagogue, and so does every word in it.'},
  {name:'seats of the presiding officers',x:184,y:70,w:58,h:34,wx:176,wy:113,look:'The seats of the presiding officers, beside the chest and facing the people.'},
  {name:'chest of the scrolls',x:248,y:58,w:38,h:46,wx:262,wy:113,look:['The chest where the scrolls are kept: the Law, the Prophets, the Psalms.','Everything I have to say in this city is written in there already.'],
    open:'It is not mine to open. The scrolls are in the keeping of the synagogue.',use:'It is not mine to open. The scrolls are in the keeping of the synagogue.',pickup:'It is not mine to open. The scrolls are in the keeping of the synagogue.'}]};
/* ---------- Paphos ---------- */
/* The hearing. Elymas raises three objections, and each is answered in its own way: the first by Barnabas, who was born on the island;
   the second by Paul's trade, shown rather than argued; the third from the Scriptures. Then the account takes its course (Acts 13:8-12). */
async function hearing0(){if(F.heard)return;
  await say(SP,'So you are the two men who have talked their way from one end of my province to the other. Come nearer.');
  await say(SP,'I am told you teach of a God who made heaven and earth, and of a man he raised from the dead. I want to hear it for myself.');
  await say(EL,'Proconsul, is this wise? You have me to tell you what tomorrow holds.');
  await say(SP,'I have you, Elymas. And today I have them as well. Your names?');
  await say(BN,'Barnabas, sir.');
  await say(P,'Saul, of Tarsus. But I was born a Roman, and among Romans I go by my Roman name: Paul.');
  await say(SP,'Paulus? That is my own name. Sergius Paulus.');
  await say(P,'I have had it as long as I can remember, sir.');F.heard=1;P.called='Paul';
  await narr('From this point on, the account calls him Paul. (Acts 13:9)',{dur:4200});
  await say(EL,'Proconsul, look at them. Two vagrants from Syria, with the dust of the road to their knees.');
  await say(EL,'Such men sail in, stir up a city, and are gone before the reckoning.');
  await say(SP,'It is a fair question. What is Cyprus to you two, that you walk the length of it?')}
async function sayFee(){await say(EL,'And what will this teaching cost you, Proconsul? No man walks the length of an island for nothing.');
  await say(EL,'Ask them their fee before you hear another word.');
  await say(SP,'Another fair question. Every teacher who has stood where you stand wanted something of me. What do you two want?')}
async function hearPaul(){
  if(!F.ob1){await say(P,'Sir, I set foot on Cyprus for the first time at Salamis, not many weeks ago.');
    await say(SP,'Then you are a stranger here, as Elymas says.');
    return say(P,'I am. But Barnabas is not: he was born on this island. This answer is his to give.',TH)}
  if(!F.ob2){await say(P,'We ask nothing of you, sir. Not one coin.');
    await say(EL,'Words, Proconsul. Every beggar says as much, until the purse is open.');
    return say(P,'He is right about one thing: words cost nothing. What do I carry that shows how I earn my bread?',TH)}
  return daniel()}
async function hearBarn(){
  if(F.ob2)return say(SP,'It is your friend Elymas has challenged now, Barnabas. Let him answer.');
  if(F.ob1){await say(BN,'Nothing, sir. I sold my land years ago, and I have never missed it. (Acts 4:37)');
    return say(SP,'A generous man. But it is your friend Elymas is looking at.')}
  await say(BN,'Sir, I am no stranger here. I am Joseph, a Levite, and Cyprus is where I was born. (Acts 4:36)');
  await say(BN,'I know the road from Salamis to Paphos as I know my own hand. I have come home, with the best news I ever carried.');
  await say(SP,'A son of the island. That alters things. Elymas, you told me they were foreigners.');
  await say(EL,'One of them is, Proconsul! One of them is.');F.ob1=1;SFX.good();return sayFee()}
async function showTools(it){if(!['awl','knife','thread'].includes(it)||!F.ob1||F.ob2)return false;
  await say(P,it==='awl'?'This is my answer, sir. An awl. I am a tentmaker.':it==='knife'?"This is my answer, sir. A tentmaker's knife. That is my trade.":'This is my answer, sir. Waxed thread. I am a tentmaker.');
  await say(P,'Wherever I teach, I work with my own hands for my bread. I ask you for nothing, and I will take nothing.');
  await say(SP,"A craftsman's hands. I noticed them when you came in.");
  await say(SP,'Elymas, you are paid by this house. This man has walked across my island at his own cost.');F.ob2=1;SFX.good();
  await say(EL,'Proconsul, I am of their own nation. I know their writings better than any tentmaker does. Let me tell you what is in them.');
  await say(EL,'Their prophet Daniel served the king of Babylon as chief of the magic-practicing priests. He did there what I do here. My art is in their own holy books.');
  return daniel()}
async function daniel(){
  await ask(P,SP,'Is that written, Paulus? Was your prophet a sorcerer?',ORDER.map(k=>k==='dan2'?{q:label(k),ok:1,
      p:['It is written that the king of Babylon gave Daniel that title. (Daniel 4:9) And it is written what Daniel himself said to that king:',quote(k),
        "Daniel never claimed the sorcerer's art, sir. He said that it could not do what the king asked, and he gave the credit to God."],
      r:['So the man himself denied the art, to the face of his own king.','Elymas, that part you did not tell me.']}
    :{q:label(k),p:[quote(k)].concat(k==='deut18'?['That is the Law of Moses, sir. It forbids to Israel everything this man lives by.']:[]),r:[{
      ps133:[SP,'Unity among brothers. You two are a fair example of it. But what of Daniel?'],
      isa42:[SP,'A fine saying about islands, and I govern one. But it does not answer him.'],
      sam7:[SP,'That concerns a king of yours. I asked about Daniel.'],
      ps16:[EL,'He changes the subject, Proconsul! I spoke of Daniel.'],
      hos14:[EL,'Upright ways! Daniel was chief of the magic-practicing priests. Is that written, or is it not?'],
      deut18:[EL,'And yet your Daniel held the office, Paulus! Did your own prophet break your Law?']}[k]]}));
  return finale4()}
SP.hs={name:'Sergius Paulus',actor:SP,look:'Sergius Paulus, proconsul of Cyprus. No armor and no sword: a governor sent by the Senate, with a table full of books.',
  give:showTools,
  show:{awl:"A workman's tool. So you are a craftsman. I will remember that.",knife:"A workman's tool. So you are a craftsman. I will remember that.",
    thread:"A workman's tool. So you are a craftsman. I will remember that.",
    tablets:'Your notes? I keep tablets of the same kind. A man who writes a thing down means to be held to it.','*':'Keep it. I want nothing from you but an answer.'},
  ask:{elymas:['Bar-Jesus. My household calls him Elymas.','He advises me. Today I am taking advice from more than one quarter.']},
  talk:hearPaul,
  as:{barnabas:{look:'The proconsul. A Roman who would rather listen than command. I did not expect that.',talk:hearBarn,
    show:{bstaff:'A well-worn staff. You walked the whole island, then.','*':'Keep it. I want nothing from you but an answer.'}}}};
EL.hs={name:'Bar-Jesus',actor:EL,wx:296,wy:124,look:'Bar-Jesus, whom they call Elymas: the Sorcerer. A Jew, who lives by what the Law forbids. He never takes his eyes off the proconsul. (Acts 13:6, 8)',
  show:{tablets:'Scratches in wax. I read what is written in the heavens.','*':'Take it away. I do not handle the tools of common men.'},
  talk:()=>say(EL,'I have nothing to say to you. What I have to say, I say to the proconsul.'),
  as:{barnabas:{look:'The one they call Elymas. He watches the proconsul as a merchant watches his best customer.',
    talk:()=>say(EL,'A Levite, are you? Then go back to your temple, and leave the governing of Cyprus to those who understand it.'),show:{'*':'Take it away.'}}}};
ROOMS.paphos={walk:[16,384,110,138],mood:'tense',amb:{waves:.35,fire:.35,gulls:.25},enter:hearing0,hs:[
  {name:'door to the city',x:30,y:48,w:32,h:56,wx:48,wy:112,dir:-1,look:'The door to the city. We were brought in by it an hour ago, dust and all.',
    use:'The proconsul has called for us, and he has not finished. I will not walk out on a man who wants to hear the word of God.',
    open:'The proconsul has called for us, and he has not finished. I will not walk out on a man who wants to hear the word of God.'},
  {name:'harbor of Paphos',x:112,y:16,w:178,h:64,wx:200,wy:112,look:['The harbor of Paphos between its two moles, and the open sea beyond.','From here the ships sail north, for the coast of Pamphylia.']},
  {name:'brazier',x:122,y:90,w:20,h:17,wx:150,wy:113,dir:-1,look:'A bronze brazier. Even the coals in this house are tended by a servant.',pickup:'It is hot, and it is not mine.'},
  {name:"proconsul's table",x:241,y:82,w:46,h:22,wx:262,wy:113,look:['Scrolls in Greek and in Latin, a writing tablet, an inkpot.','A governor who reads. No wonder he wants to hear for himself.'],
    pickup:"They are the proconsul's. And I have reading enough on my own tablets."},
  {name:"proconsul's seat",x:338,y:54,w:36,h:42,wx:308,wy:113,look:'The seat of the governor of Cyprus. He has left it, to hear us standing as we stand.'}]};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  seleucia:{'mountain':{look:'The mountain above Seleucia. I have watched it sink into the sea behind a ship more than once.'},'town wall':{look:"Seleucia's wall. Antioch would starve without this harbor."},
    'gate to the Antioch road':{look:'The road to Antioch. We came down it this morning, with the whole congregation behind us in prayer.',use:'Not that way. Not until the work is done.',open:'Not that way. Not until the work is done.'},
    'mole':{look:'The mole, and beyond it the sea road home.'},'cargo':{look:'Wine, oil and grain for Cyprus. The island sends back copper.'},
    'coil of cord':{look:"Ship's cord, tarred. Saul will know what to make of it.",useWith:async()=>say(BN,BARN4.noCraft)},
    'our baggage':{look:'John Mark has packed as if we were going to the ends of the earth. Perhaps we are.'},
    'ship':{look:'A Cyprus trader. I crossed in one like her as a boy, wet to the skin.'}},
  salamis:{'harbor':{look:'I learned to swim in that harbor. And to stay out of the way of the stevedores.'},'rooftops of Salamis':{look:'Salamis. I could find my way through it with my eyes shut.'},
    'marketplace':{look:'The marketplace. It was never this crowded when I was a boy. Or else I was smaller.'},
    "coppersmith's stall":{look:'Cyprus copper. The whole world calls the metal by the name of my island.'},
    'synagogue':{look:'The synagogue of my boyhood. The same stone, the same two steps.'},'water jar':{look:'The same jar, I do believe. Or its grandchild.'},
    'door of the synagogue':{look:'I have not been through that door for many years.'},'west gate':{look:'The road to Paphos. Many days on foot, and not one of them dull.'}},
  synagogue:{'door to the square':{look:'The door to the square.'},'window':{look:'The light still falls where the reader stands.'},'lamp':{look:'It was my task, as a boy, to see that those lamps never went dry.'},
    'bench':{look:'My family sat just there. I can still feel the edge of that bench behind my knees.'},
    'reading platform':{look:'I read from that desk as a young man, and trembled the whole time.',use:()=>say(BN,F.spoke?'It has been well used today.':'It is Saul who should stand there today, not I.')},
    'seats of the presiding officers':{look:'The seats of the presiding officers. Zadok has earned his.'},
    'chest of the scrolls':{look:'The chest of the scrolls. Everything we have come to say is in there already.',open:'It is in the keeping of the synagogue.',use:'It is in the keeping of the synagogue.'}},
  paphos:{'door to the city':{look:'The door we came in by.',use:'We do not walk out on a man who wants to hear the word of God.',open:'We do not walk out on a man who wants to hear the word of God.'},
    'harbor of Paphos':{look:'The harbor of Paphos. The Roman governors have their seat here now, not in Salamis.'},'brazier':{look:'A brazier. The nights are cool at this end of the island.'},
    "proconsul's table":{look:"More books than I have seen since Jerusalem. This governor reads."},"proconsul's seat":{look:'The seat of the governor. He is not sitting in it.'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ SCENES: intro, the journeys, ending; PRAYER HINTS ============ */
/* arrive4: after the map has drawn the way. By sea to Salamis: the crossing, under the roof Saul sewed. By road to Paphos: the island. */
async function arrive4(to){place4(G.room);for(const a of party()){const inv=invOf(a),i=inv.indexOf('shelter');if(i>=0)inv.splice(i,1)}drawInv();
  if(to==='salamis'){place(JR,'salamis',330,118,-1);const sea=G.sea={k:0};G.scene=voyageScene;AU.mood='calm';AU.amb={waves:.8,wind:.5,creak:.5};await fade(0,600);
    tween(30000,k=>{sea.k=k});
    await narr('They sailed away to Cyprus. (Acts 13:4)',{dur:4500});
    await narr('A merchant ship gave its passengers water, and nothing more. They slept on the deck, and ate what they had brought with them.',{dur:7000});
    await say(BN,'My staff for a ridge pole, and your rope edge lashed to the rail. It stands, Saul!');
    await say(P,'There is a place under it for you tonight, Jair.');
    await say(JR,'Under the roof of Saul of Tarsus. I did not expect to live to say that. I will take it, brother.');
    await say(MK,'Bread and figs for four, then. I packed for three, but it will stretch.');
    await narr('Ahead lay Cyprus: the island where Barnabas was born. (Acts 4:36)',{dur:5000});
    await fade(1,500);G.scene=null;G.sea=null;AU.mood=ROOMS.salamis.mood;AU.amb=ROOMS.salamis.amb}
  if(to==='paphos'){const o={dur:7500};
    await narr('They went through the whole island as far as Paphos: at least 150 kilometers on foot. (Acts 13:6)',o);
    await narr("At night the roof that Saul had sewn for a ship's deck stood beside the road, on Barnabas's staff.",{dur:6000});
    await narr('In Paphos they met a Jewish man named Bar-Jesus, who was a sorcerer and a false prophet. (Acts 13:6)',o);
    await narr('He was with the proconsul Sergius Paulus, an intelligent man. Calling Barnabas and Saul to him, this man was eager to hear the word of God. (Acts 13:7)',{dur:9000})}}
async function start4(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(4);G.end={};enterRoom('seleucia',...ENT.seleucia);G.send={lay:0};G.scene=sendoffScene;AU.mood='calm';AU.amb={birds:.3,wind:.15};codeBtn();await fade(0,600);
    await narr('Antioch in Syria, about 47 C.E.',{dur:2800});
    await narr('In the congregation there were prophets and teachers: Barnabas, Symeon who was called Niger, Lucius of Cyrene, Manaen, and Saul. (Acts 13:1)',{dur:8000});
    await narr('As they were ministering to Jehovah and fasting, the holy spirit said: "Set aside for me Barnabas and Saul for the work to which I have called them." (Acts 13:2)',{dur:9500});
    G.send.lay=1;SFX.pray();await wait(900);
    await narr('Then after fasting and praying, they laid their hands on them and sent them off. (Acts 13:3)',{dur:7000});
    await fade(1,600);G.scene=null;G.send=null;AU.mood=ROOMS.seleucia.mood;AU.amb=ROOMS.seleucia.amb;codeBtn();await fade(0,600);
    await narr('So these men, sent out by the holy spirit, went down to Seleucia, the harbor of Antioch. They had John Mark with them as an attendant. (Acts 13:4, 5)',{dur:9000});
    await say(BN,'Seleucia, Saul. And beyond that water lies Cyprus: the island where I was born.');
    await say(MK,'The bed rolls, the food bag, the water flask and the purse. Everything is here, cousin.');
    await say(P,'Then all we lack is a ship. That one is taking on cargo. Let us ask her master where she is bound.')},true)}
async function finale4(){playAs(P);await wait(300);
  await say(EL,'Proconsul, enough! Send these men away, and hear no more of this. Nothing good will come to you from their God!');
  await narr('But Elymas the sorcerer began opposing them, trying to turn the proconsul away from the faith. (Acts 13:8)',{dur:7000});
  await walk(P,300,120);P.dir=1;
  await narr('Then Saul, also called Paul, becoming filled with holy spirit, looked at him intently. (Acts 13:9)',{dur:6500});
  await say(P,'O man full of every sort of fraud and every sort of villainy, you son of the Devil, you enemy of everything righteous,');
  await say(P,'will you not quit distorting the right ways of Jehovah? (Acts 13:10)');
  await say(P,"Look! Jehovah's hand is upon you, and you will be blind, not seeing the sunlight for a time. (Acts 13:11)");
  EL.bow=true;await wait(700);
  await narr('Instantly a thick mist and darkness fell on him, and he went around trying to find someone to lead him by the hand. (Acts 13:11)',{dur:8500});
  EL.speed=24;await walk(EL,352,128);await say(EL,'A hand. Someone, give me your hand...');await walk(EL,330,134);await fade(1,400);EL.room=null;EL.bow=false;EL.speed=0;await fade(0,400);
  await say(SP,'Every morning that man told me what the day would bring. He did not see this coming.');
  await say(SP,'And you, Paulus: you asked me for nothing, and you hid nothing. Go on. Tell me the rest.');
  await fade(1,600);AU.mood='hope';
  await narr('Then the proconsul, on seeing what had happened, became a believer, for he was astounded at the teaching of Jehovah. (Acts 13:12)',{dur:8500});
  await journey();await narr('From Paphos, Paul and his companions would put out to sea for Asia Minor. (Acts 13:13)',{dur:6000});
  endScreen({title:'Sent Out to Cyprus',text:"Paul sewed a roof for a ship's deck, and shared it with a man he had once driven from his home. Before a governor he asked for nothing, hid nothing, and answered from the Scriptures.",
    based:'Based on Acts 13:1-12; 4:36, 37; 8:1-3; 11:19 and Galatians 1:23. Supporting characters and dialogue are imaginative; the events are from the Scriptures.',
    go:'Click to return to the title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}
function hint4(){const b=PC()!==P,craft=['craft4',["That is the tentmaker's craft, not mine. A good partner knows when to step back.",'Saul should do this part. I can leave it to him; he is never far away.']];
  if(inSel()){
    if(!F.metKal)return['kal4',['We were sent off to cross the sea. Someone on this quay decides who goes aboard.','I should talk to the shipmaster by the gangplank.']];
    if(!F.shelter)return b?craft:!F.gotCord?['cord4',['A tent on a deck cannot be pegged down: it has to be lashed to the rail. Its edge needs something stronger than thread. The shipmaster spoke of a coil.',
        'My knife can cut a length from the coil of tarred cord by the mooring post.']]
      :['sew4',['Cloth, cord, awl and thread. Everything is at hand. Now, the work itself.','I can sew the tarred cord into the edge of the goat-hair cloth with my awl.']];
    if(!F.jairOk)return F.jairB?(b?['own4b',['I have said my part. The rest only Saul can say.','Saul should talk to Jair himself now.']]
        :['own4',['He will hear me now. He does not want an excuse, or a sermon. He wants the truth, from the man who did it.','I should talk to Jair, and say plainly what I did. Nothing more.']])
      :b?['jair4b',['The old man will not speak to Saul. But I think I know his face, from Jerusalem.','I should talk to the old man by the jars, and tell him what I saw for myself.']]
      :['jair4',['The old man knows my name, and it has closed his mouth. I cannot open it. But there is a man here whom everyone trusts.','Barnabas should speak with the old man first. I can let him.']];
    return['board4',['The roof is sewn, and there is peace on the quay. The wind will not wait for us.','We can go up the gangplank, and choose Salamis on the map.']]}
  if(inSal()){
    if(!F.vouched)return b?['zad4b',['Zadok guards his platform, and he is right to. What can a careful man not refuse?','I should talk to Zadok in the synagogue, and ask only that Saul be tested by the scroll.']]
      :['zad4',['A stranger does not climb a platform unasked. And in this city I am the stranger. Barnabas is not.','Barnabas should speak to Zadok, the presiding officer in the synagogue.']];
    if(!F.spoke)return b?['speak4b',['I have opened the door. Saul must walk through it.','Saul should talk to Zadok now.']]
      :['speak4',['A word of encouragement has an order. Begin where they are, with what has just been read. Do not run ahead of them.',
        'I should talk to Zadok. Then: the reading first, the promise to David, the one in whom it is kept, and last what it means for them.']];
    return['west4',['Salamis has heard. The island is long, and the word is for all of it.','We can leave by the west gate, and choose Paphos on the map.']]}
  if(!F.ob1)return b?['isle4b',['He calls us strangers. I was born on this island.','I should talk to the proconsul myself.']]
    :['isle4',['He asks what Cyprus is to us. To me it is new. But Barnabas was born here.','Barnabas should answer the proconsul. I can let him.']];
  if(!F.ob2)return b?['fee4b',['It is Paul whom Elymas doubts, not me. And Paul can show how he lives.','Paul should show the proconsul the tools of his trade.']]
    :['fee4',['He says we want money. To say no is only words. What do I carry that shows how I earn my bread?','I should show the proconsul my awl.']];
  return b?['dan4b',['Elymas twists the Scriptures before a man who cannot check them. Paul has them on his tablets.','Paul should answer the proconsul.']]
    :['dan4',['He twists the Scriptures before a man who cannot check them. Daniel answered this himself, to the face of a king.','I should talk to the proconsul, and answer with Daniel 2:27, 28.']]}
/* ============ CHAPTER DEFINITION ============ */
return{rooms:['seleucia','salamis','synagogue','paphos'],setup:setup4,start:start4,hint:hint4,music:MUSIC,scenes:{sendoff:sendoffScene,voyage:voyageScene},topics:TOPICS,tablets:TABLETS,
  /* the first missionary journey is drawn on its own: the sea lane from Caesarea to Tarsus (Chapter Two) runs between Cyprus and Syria,
     where the ship from Seleucia must pass, and routes on the map never cross */
  route:[['antioch','seleucia','new'],['seleucia','salamis','new sea'],['salamis','paphos','new']],
  /* names that would lie across this chapter's routes on their usual side */
  labels:{salamis:{lab:'r',dy:4.2}},
  places:{
    seleucia:{room:'seleucia',x:300,y:122,dir:-1,if:()=>false,no:'We were sent out, not back. Antioch will hear about Cyprus when the work is done.'},
    salamis:{room:'salamis',x:150,y:122,dir:1,if:()=>inSel()},
    paphos:{room:'paphos',x:150,y:124,dir:1,if:()=>G.room==='salamis'&&F.spoke,no:'Paphos lies at the far end of the island, and this ship goes only to Salamis. The whole island lies between: so much the better.'}},
  way:()=>inSel()?[]:[['seleucia','salamis']],arrive:arrive4,
  flags:['metKal','gotCord','shelter','metJair','jairB','jairOk','landed','metZad','vouched','spoke','heard','ob1','ob2'],
  codeBits:{rooms:3,share:10},party:['paul','barnabas'],home:{bstaff:'barnabas'},share:['awl','thread','knife','tablets','haircloth','cord','shelter','bstaff'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)},sel=room==='seleucia';
    add(sel&&!F.shelter,'haircloth');add(sel&&F.gotCord&&!F.shelter,'cord');add(sel&&F.shelter,'shelter');inv.push('bstaff');return inv},
  place:place4}
});
