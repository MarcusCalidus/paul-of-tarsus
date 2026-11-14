/* Paul of Tarsus: level data for Chapter One, "Escape from Damascus".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints. */
LEVEL(1,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* Damascus by night, in D Hijaz: an oud over a drone, a frame drum, and a ney that enters in the second half.
   In the watched street (mood "tense") only the drone, a heartbeat on the drum and two low notes are left.
   When Paul is safely outside the wall (mood "hope") the ney plays an octave higher. */
const _=null,
 NEY=[[[0,4,6],[6,5,2],[8,4,4],[12,3,2],[14,2,2]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,4,12]],
  [[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,5,2],[2,4,2],[4,3,4],[8,2,4],[12,1,4]],[[0,2,3],[3,1,1],[4,0,4],[8,1,2],[10,2,2],[12,1,4]],[[0,0,14]]],
 MUSIC={dt:.17,root:50,scale:[0,1,4,5,7,8,10],bars:16,tracks:[
  {drone:[-12],every:32},
  {inst:'oud',moods:['calm','hope'],prog:'AABACABA',seq:{A:[0,_,4,_,7,_,4,_,0,_,4,_,8,_,7,_],B:[3,_,5,_,7,_,5,_,3,_,5,_,9,_,7,_],C:[1,_,3,_,5,_,3,_,1,_,4,_,6,_,4,_]}},
  {inst:'oud',moods:['tense'],seq:{A:[0,_,_,_,_,_,_,_,_,_,1,_,_,_,_,_]},vol:.8},
  {drum:1,moods:['calm','hope'],seq:{A:'d.t...t.d...t.k.'}},
  {drum:1,moods:['tense'],seq:{A:'d.......d.......'},vol:1.35},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:NEY},
  {inst:'ney',moods:['hope'],from:8,oct:24,lines:NEY}]};

/* ============ ART ============ */
/* A large reed basket. x,y = bottom-left; 28 wide, 24 tall. L tints the colors for the light in the room. */
function basketArt(g,x,y,strong,L){L=L||(c=>c);const m=x+14,hw=t=>9.5+4.5*Math.sin(Math.min(1,t/.62)*1.5708),p=[];
  for(let j=0;j<=22;j++)p.push(m-hw(j/22),y-j);for(let j=22;j>=0;j--)p.push(m+hw(j/22),y-j);
  oval(g,m+2,y,15,2.2,'rgba(0,0,0,.32)');
  clipTo(g,()=>poly(g,p),()=>{R(g,x,y-23,28,23,L('#7a5a28'));
    for(let j=0;j<46;j++){const yy=y-.5-j*.5;if(j%2)R(g,x,yy,28,.5,L('#8e6c34'));
      for(let i=(j>>1)%2*2.5+(j%2)*.5;i<28;i+=5)R(g,x+i,yy,2.5,.5,L(j%2?'#c9a258':'#b48e48'))}
    for(let i=2.5;i<28;i+=5)R(g,x+i,y-23,.5,23,'rgba(40,24,8,.35)');
    g.fillStyle=lg(g,x,0,x+28,0,[[0,'rgba(20,10,0,.3)'],[.28,'rgba(255,225,160,.2)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(20,10,0,.55)']]);g.fillRect(x,y-23,28,23);
    ao(g,x,y-6,28,6,'b',.35)});
  R(g,x-.5,y-24.5,29,2.5,L('#6a4c20'));R(g,x,y-25,28,1,L('#d2ac60'));for(let i=0;i<28;i+=2)R(g,x+i,y-24,1,1.5,L('#a88442'));
  if(strong){const s=L('#4a2c18'),h=L('#7a4e2c');for(const sx of[x+5,x+21]){R(g,sx,y-31,2.5,30,s);R(g,sx,y-31,.5,30,h);for(let j=3;j<22;j+=3)R(g,sx+1,y-j,.5,1,L('#d8c9a0'))}
    R(g,x+5,y-32,18.5,2.5,s);R(g,x+5,y-32,18.5,.5,h)}
  else{const f=L('#a08a56');stroke(g,[x+4.5,y-25,x+4.5,y-28.5,x+8,y-29.5],f,.7);stroke(g,[x+9.5,y-25,x+9.5,y-27.5],f,.7);stroke(g,[x+23.5,y-25,x+23.5,y-28.5,x+20,y-29.5],f,.7);
    R(g,x+8,y-30,.5,1.5,f);R(g,x+19.5,y-30,.5,1.5,f)}}
/* A coil of rope hanging from a peg at x,y. */
function coilArt(g,x,y,n,L,c){c=c||'#b89a5a';L=L||(k=>k);R(g,x-.5,y-5,1.5,5,L(tint(c,-.2)));
  for(let i=0;i<n;i++){const yy=y+i*2,cc=L(i%2?tint(c,-.22):c);g.strokeStyle=L(tint(c,-.5));g.lineWidth=2.6;g.beginPath();g.ellipse(x+.5,yy+1.2,4.6,1.9,0,0,6.2832);g.stroke();
    g.strokeStyle=cc;g.lineWidth=1.6;g.stroke();for(let a=0;a<8;a++){const q=a/8*6.2832;R(g,x+.5+Math.cos(q)*4.6-.25,yy+1.2+Math.sin(q)*1.9-.25,.5,.5,L(tint(c,.3)))}}}
/* ---------- Eliab's workshop: lamplight, reeds and goat-hair cloth ---------- */
ART.workshop={w:320,
 light:()=>({amb:'#827488',lamps:[[157,60,140,'#d8a860']]}),
 paint(g){const r=rng(11),W='#c9a476',T='#6b4a2e';
  plaster(g,0,0,320,105,W,r,{patch:7,cracks:8,brick:'#a8744c',bot:-.2,t:.55});
  comp(g,'multiply',.55,()=>R(g,0,84,320,21,'#b89070'));R(g,0,83.5,320,.5,'rgba(70,36,12,.4)');
  /* ceiling: joists run toward the viewer over a wall plate */
  R(g,0,0,320,10,'#2a1d14');tex(g,'wood',.6,0,0,320,10);
  for(let i=-1;i<10;i++){const a=8+i*38,k=1.17,x0=160+(a-160)*k,x1=160+(a+7-160)*k;poly(g,[a,10,a+7,10,x1,0,x0,0],T);
    poly(g,[a+5,10,a+7,10,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,10,x0+.25,0],tint(T,.25),.5)}
  wood(g,0,9.5,320,3.5,'#5a3e28');ao(g,0,13,320,9,'t',.5);
  /* hanging from the joists: hoops of split willow and bunches of reed */
  for(const[hx,hy,n]of[[196,13,3],[304,13,2],[120,13,2]]){R(g,hx,hy,.5,6,'#3a2a1a');for(let i=0;i<n;i++){g.strokeStyle=i%2?'#a88a50':'#8a6e3c';g.lineWidth=1;g.beginPath();g.ellipse(hx+i*1.5,hy+11+i,5-i*.5,6-i*.4,0,0,6.2832);g.stroke()}}
  for(const hx of[36,268]){R(g,hx+2,13,.5,4,'#3a2a1a');for(let i=0;i<9;i++)stroke(g,[hx+i*.6,17,hx-3+i*1.4,31+r()*4],i%2?'#b09a5c':'#8a7844',.6);R(g,hx-.5,18.5,6,1.5,'#6a4a2c')}
  /* side walls close the room in */
  poly(g,[0,0,7,10,7,105,0,113],'#a8875f');poly(g,[320,0,313,10,313,105,320,113],'#9c7c56');ao(g,0,0,7,113,'l',.3);ao(g,313,0,7,113,'r',.3);
  /* floor: stone flags, fanning out from the far wall */
  pave(g,0,105,320,144,'#a89070',r,{vx:160,vy:74,rows:5,step:36,v:.09});ao(g,0,105,320,8,'t',.55);
  /* door to the street */
  R(g,7.5,33,39,73,'#8f7252');doorArt(g,10,36,34,70,'#8a5c34',r);R(g,7.5,104,39,2.5,'#8a7a64');R(g,7.5,104,39,.5,'#b0a088');
  /* high window: deep reveal, night sky, two upright bars */
  R(g,67,21,28,24,'#a88a62');poly(g,[67,21,71,25,71,41,67,45],'#7a6040');poly(g,[67,45,71,41,91,41,95,45],'#d8ba8c');
  g.fillStyle=lg(g,0,25,0,41,['#0a0e2c','#1a2456']);g.fillRect(71,25,20,16);for(const[sx,sy]of[[74,28],[79,33],[86,27],[88,36],[82,38],[76,37]])R(g,sx,sy,.5,.5,'#e8e8ff');
  R(g,77,25,1,16,'#241810');R(g,84.5,25,1,16,'#241810');ao(g,71,25,20,3,'t',.6);
  /* the seaming frame, a goat-hair tent panel laced into it */
  ao(g,46,46,14,60,'r',.3);wood(g,56,51,3,55,'#5e4026',1);wood(g,112,51,3,55,'#5e4026',1);wood(g,54,48,63,3,'#70502e');wood(g,57,97,58,2,'#4e3520');
  g.fillStyle=lg(g,60,0,111,0,['#241c18','#3a2e27','#4c3d31']);g.fillRect(60,53,51,43);
  inRect(g,60,53,51,43,()=>{tex(g,'vert',.6,60,53,51,43,'overlay',.5);for(let j=0;j<43;j+=1)R(g,60,53+j,51,.5,j%2?'rgba(0,0,0,.14)':'rgba(255,240,210,.05)');
    for(let i=0;i<5;i++){R(g,69.5+i*10,53,.5,43,'rgba(0,0,0,.45)');R(g,70+i*10,53,.5,43,'rgba(255,235,200,.1)')}
    ao(g,60,53,51,6,'t',.4);ao(g,60,88,51,8,'b',.35)});
  for(let i=0;i<13;i++){stroke(g,[61+i*4,51,63+i*4,54],'#cdbb90',.5)}for(let j=0;j<10;j++){stroke(g,[59,55+j*4,61,57+j*4],'#cdbb90',.5);stroke(g,[112,55+j*4,110,57+j*4],'#cdbb90',.5)}
  /* shelf with dye jars and cakes of beeswax */
  ao(g,128,47,60,7,'t',.4);wood(g,127,44,62,3,'#70502e');poly(g,[130,47,133,47,130,53],'#4e3520');poly(g,[186,47,183,47,186,53],'#4e3520');
  vessel(g,135,44,4,10,'#a8562e','jar',{bands:[[.5,'#5a2a16',1]]});vessel(g,146,44,3.4,8,'#8a744a','jug');vessel(g,177,44,4.2,11,'#8e4428','amph');
  R(g,169,41.5,5,2.5,'#c9a03c');R(g,169.5,39.5,4,2,'#d8b44c');R(g,169,41.5,5,.5,'#e8cc70');vessel(g,184.5,44,2.6,4,'#6f5a3a','bowl');
  /* reeds leaning in the corner by the bench */
  for(let i=0;i<16;i++){const bx=170+i*1.1+r()*1.5;stroke(g,[bx,105,bx+5+r()*4,50+r()*10],i%3?'#a8945a':'#857440',.7)}stroke(g,[173.5,82,190.5,81],'#7a5a34',1);stroke(g,[176,67,192.5,66],'#7a5a34',1);
  /* lamp stand */
  oval(g,152,106,9,2,'rgba(0,0,0,.35)');stroke(g,[151.5,98,146,106],'#3e2a1a',1.5);stroke(g,[151.5,98,157.5,106],'#3e2a1a',1.5);wood(g,150.5,72,2.5,33,'#4e3622',1);
  oval(g,151.6,71,4.6,1.4,'#6b4a2e');vessel(g,151.6,70.4,4.6,3.4,'#b06a3a','bowl',{noShadow:1});poly(g,[154.6,67.4,159,67,159.5,68.4,154.6,69.6],'#a05c30');R(g,156.5,66.5,1.5,1,'#3a2416');
  /* stool */
  oval(g,127.5,119.5,10,2,'rgba(0,0,0,.4)');stroke(g,[122,111,120.5,119],'#3e2a1a',1.6);stroke(g,[133,111,134.5,119],'#3e2a1a',1.6);stroke(g,[127.5,111,127.5,118],'#2e1e12',1.4);
  wood(g,119.5,108,16,3,'#7a5632');R(g,119.5,110.5,16,.5,'#3e2a1a');
  /* workbench, with a peg rail above it */
  wood(g,211,38,82,2.6,'#70502e');ao(g,211,40.6,82,4,'t',.35);for(const px of[222,250,278]){R(g,px,37.5,2.5,4,'#3e2a1a');R(g,px,37.5,2.5,.5,'#8a6842')}
  stroke(g,[251.3,41,250,44,252.6,44,251.3,41],'#3a2a1a',.6);wood(g,250,43.5,2.6,10,'#a67c4a',1);wood(g,246.3,53,10,5,'#8a6238');R(g,246.3,53,.5,5,'#b08a56');
  R(g,206,86,78,21,'rgba(20,10,6,.6)');wood(g,212,88,4,17,'#3e2a1a',1);wood(g,273,88,4,17,'#3e2a1a',1);
  wood(g,206.5,86,6,21.5,'#6a4628',1);wood(g,277.5,86,6,21.5,'#6a4628',1);wood(g,212.5,96.5,65,2.6,'#553820');
  vessel(g,236,107,6.5,8,'#6a5030','bowl');for(let i=0;i<7;i++)stroke(g,[246+i*1.6,106.5,262+i*1.5,95+i*.4],i%2?'#8a7844':'#6e6036',.7);
  wood(g,202,80,86,5,'#9a6e40');R(g,202,84.5,86,2,'#5e4026');R(g,202,80,86,.5,'#c89a62');
  for(let i=0;i<14;i++){const sx=206+r()*78;stroke(g,[sx,81+r()*3,sx+2+r()*5,81+r()*3],'rgba(50,28,10,.5)',.5)}
  ao(g,200,107,92,3,'t',.3);
  /* light: one small lamp, and the moon through the high window */
  lightmap(g,320,'#4e4058',l=>{pool(l,157,62,165,120,'#ffca84',.95);pool(l,157,64,70,56,'#ffe2a8',.8);pool(l,157,121,130,30,'#d89850',.55);
    comp(l,'lighter',.3,()=>poly(l,[71,26,91,26,128,140,84,144],lg(l,0,30,0,140,['rgba(120,150,255,.5)','rgba(120,150,255,.15)'])));
    comp(l,'multiply',1,()=>{ao(l,0,0,60,144,'l',.45,'#1a1030');ao(l,262,0,58,144,'r',.5,'#1a1030');ao(l,0,0,320,26,'t',.5,'#1a1030');ao(l,0,128,320,16,'b',.35,'#1a1030')})});
  pool(g,157,64,26,20,'#ff9c40',.4)},
 fore(g){const r=rng(12);
  /* near the viewer: a stack of finished baskets, and a jar */
  for(const[bx,by,bw,bh]of[[-6,146,30,17],[-3,131,24,13]]){poly(g,[bx,by,bx+bw,by,bx+bw+2,by-bh,bx-2,by-bh],'#2a1c14');
    for(let j=1;j<bh;j+=1.5)for(let i=(j%3)*1.5;i<bw+2;i+=4)R(g,bx-1+i,by-j,2,.5,'#4a3422');R(g,bx-2.5,by-bh-1.5,bw+5,2,'#3a281a');R(g,bx-2,by-bh-1.5,bw+4,.5,'#6a4c30')}
  vessel(g,309,150,11,26,'#3a2418','pithos',{noShadow:1});ao(g,296,122,24,22,'r',.4)},
 draw(g,t){const id='workshop',L=(x,y)=>{const l=lightAt(id,x,y+18);return c=>l?mul(c,l):c};
  if(!F.gotRope)coilArt(g,223,46,5,L(223,50));
  if(!F.gotSkin){const k=L(279,50);R(g,279,41,.6,4,k('#4a3020'));oval(g,279.5,52.5,4.4,6.4,k('#5a3a20'));oval(g,278.6,51.8,3.4,5.4,k('#7a5230'));oval(g,277.6,50.5,1.2,2.6,k('#a07848'));
    R(g,278,44.5,3,3,k('#4a2f1a'));R(g,278,44.5,3,.5,k('#c9a14a'))}
  if(!F.gotKnife){const k=L(219,80);oval(g,220,80.6,8,1.4,'rgba(0,0,0,.35)');g.fillStyle=k('#d0d0dc');g.beginPath();g.ellipse(219.5,79.2,5.5,2.6,0,0,3.1416);g.fill();
    R(g,214,79.2,11,.5,k('#f4f4ff'));R(g,218,76,3.2,3.4,k('#7a4a24'));R(g,217.4,75,4.4,1.4,k('#9a6a38'))}
  if(!F.gotCloth){const k=L(252,78);oval(g,254,82.4,17,1.6,'rgba(0,0,0,.4)');g.fillStyle=lg(g,0,74.5,0,82.5,[k('#4a3c32'),k('#2a221c'),k('#120d0b')]);g.fillRect(238,74.5,30,8);
    for(let i=0;i<30;i+=2.5)R(g,238+i,74.5,.5,8,'rgba(0,0,0,.28)');oval(g,238,78.5,2.4,4,k('#2e251f'));oval(g,268,78.5,2.4,4,k('#18120e'));
    g.strokeStyle=k('#5a4a3c');g.lineWidth=.5;for(const rr of[1,2.4,3.6]){g.beginPath();g.ellipse(238,78.5,rr*.6,rr,0,0,6.2832);g.stroke()}}
  if(!F.gotThread){const k=L(162,40);R(g,159,38,7,6,k('#e2d4aa'));for(let i=0;i<6;i++)R(g,159,38.5+i,7,.5,k(i%2?'#b5a67c':'#efe2bc'));R(g,158,37,9,1.2,k('#8a5a2c'));R(g,158,43.4,9,1.2,k('#6a4020'));R(g,165,38,1,6,'rgba(0,0,0,.25)')}
  if(!F.gotBasket)basketArt(g,290,110,false,L(304,100));
  flame(g,157,66,t);pool(g,157,63,22+Math.sin(t/190)*1.5,17,'#ff9838',.16+.03*Math.sin(t/83))},
 front(){}};
/* ---------- The street by night: moonlight, one lit window, a soldier's brazier ---------- */
function awningCloth(g,p,c,r){clipTo(g,()=>poly(g,p),()=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
    R(g,x0,y0,x1-x0,y1-y0,c);for(let i=0;i<x1-x0;i+=7)R(g,x0+i,y0,3.5,y1-y0,tint(c,-.25));
    for(let i=0;i<x1-x0;i+=7)R(g,x0+i+3.5,y0,.5,y1-y0,tint(c,.12));ao(g,x0,y0,x1-x0,Math.min(4,y1-y0),'t',.45)})}
ART.street={w:480,fp:1.3,
 light:()=>({amb:'#7f88b8',lamps:[[248,98,80,'#c08444'],[92,112,44,'#9a7038']],shade:F.awning?[[402,476,'#6c6c98']]:[]}),
 paint(g){const r=rng(23);
  /* sky, moon, hills */
  g.fillStyle=lg(g,0,0,0,86,['#05071a','#0b1030','#18214f','#2b3a72']);g.fillRect(0,0,480,86);
  for(let i=0;i<190;i++){const b=r(),sx=r()*480,sy=r()*r()*74;R(g,sx,sy,b>.93?1:.5,b>.93?1:.5,b>.9?'#ffffff':b>.5?'#b9c2f0':'#6f78b4')}
  pool(g,402,16,60,44,'#5a6cc0',.5);pool(g,402,16,22,20,'#aab8f0',.5);oval(g,402,16,7.5,7.5,'#f2eed8');oval(g,399.5,14,2,1.6,'#d2ceb6');oval(g,405,19.5,1.4,1.1,'#d2ceb6');oval(g,403.5,12,1,.8,'#dcd8c0');
  for(const[cx0,cy,cw]of[[350,26,60],[440,10,44],[120,20,70],[250,12,50]])pool(g,cx0,cy,cw,3.5,'#5a68a8',.35,'screen');
  ridge(g,0,480,86,x=>30+7*Math.sin(x/53)+3*Math.sin(x/17+1),['#1c2658','#131a42']);
  /* the far city wall and its gate, torches burning */
  ashlar(g,0,48,480,38,'#232c5e',r,{bw:9,bh:4,v:.07,t:.2,m:'#161c44'});for(let i=0;i<480;i+=8)R(g,i,45,5,3.5,'#232c5e');
  for(const tx of[181,222]){ashlar(g,tx,31,17,55,'#2a3468',r,{bw:7,bh:4,v:.08,t:.2,m:'#181e48'});for(let i=0;i<17;i+=6)R(g,tx+i,28,4,3.5,'#2a3468');R(g,tx+16,31,1,55,'#141a40');R(g,tx+6,40,3,5,'#0a0d24')}
  ashlar(g,198,39,24,47,'#262f62',r,{bw:7,bh:4,v:.08,t:.2,m:'#181e48'});R(g,198,37.5,24,2,'#343e78');
  R(g,203.5,55,13,31,'#06081a');oval(g,210,55,6.5,5.5,'#06081a');R(g,205,60,10,26,'#0d1026');
  pool(g,200,52,16,14,'#ff8a3c',.55);pool(g,220,52,16,14,'#ff8a3c',.55);R(g,199.5,51,1,5,'#3a2a1a');R(g,219.5,51,1,5,'#3a2a1a');
  ao(g,0,70,480,16,'b',.5,'#0a0d26');
  /* everything near is painted in daylight colors, then lit: moonlight, the window, the brazier */
  litLayer(g,480,'#565f98',l=>{
    /* cypresses and a palm behind the low wall */
    for(const[tx,th]of[[150,44],[158,36],[230,30]]){oval(l,tx,88-th/2,3.6,th/2,'#3a5a3a');oval(l,tx-.8,88-th/2-2,2,th/2-3,'#4c7048')}
    /* Eliab's house */
    plaster(l,0,30,140,74,'#d8c4a2',r,{patch:5,cracks:6,brick:'#a8845c'});poly(l,[140,30,147,34,147,102,140,104],'#9a8a70');
    R(l,-1,26.5,142,4,'#e6d6b6');R(l,-1,30,142,1,'#8a785c');for(let i=6;i<138;i+=12){R(l,i,34,2.5,2.5,'#6a4a2c');R(l,i,36.5,2.5,2.5,'rgba(0,0,0,.3)')}
    for(let i=0;i<5;i++){const sx=10+r()*120;g.fillStyle='#000';l.fillStyle=lg(l,0,31,0,58,['rgba(70,50,30,.3)','rgba(70,50,30,0)']);l.fillRect(sx,31,2+r()*3,20+r()*8)}
    R(l,24,39,40,65,'#b8a480');doorArt(l,28,42,32,60,'#7a5230',r);R(l,22,100.5,44,3.5,'#a89a80');R(l,22,100.5,44,.5,'#d8ccb0');
    R(l,79,49,26,24,'#b8a480');poly(l,[79,73,83,70,101,70,105,73],'#e8d8b4');R(l,83,53,18,17,'#3a2a1c');
    /* low wall across the gap */
    ashlar(l,140,84,96,20,'#bcae90',r,{bw:13,bh:6});R(l,139,82.5,98,2.5,'#d6c8a8');R(l,139,85,98,.5,'#7a6e58');
    for(let i=0;i<26;i++){const vx=206+r()*28,vy=84+r()*12;oval(l,vx,vy,1.6,1.1,r()<.5?'#4a6a3a':'#5c8048')}
    /* the house of the wool merchant's neighbors, and beyond the alley, another */
    plaster(l,236,24,189,80,'#cfbd9c',r,{patch:6,cracks:8,brick:'#a07c56'});R(l,235,20.5,191,4,'#dfcfae');R(l,235,24,191,1,'#84745a');
    for(let i=242;i<422;i+=13){R(l,i,28,2.5,2.5,'#6a4a2c');R(l,i,30.5,2.5,2.5,'rgba(0,0,0,.3)')}
    for(const wx of[262,300]){R(l,wx-1.5,38.5,15,17,'#a8987a');R(l,wx,40,12,14,'#1a1612');boards(l,wx,40,5.5,14,2.8,'#6a4a2c',r);R(l,wx-2,54,16,1.5,'#e0d0b0')}
    poly(l,[236,24,236,104,231,102,231,28],'#8f8068');
    plaster(l,455,34,25,70,'#c6b494',r,{patch:1,cracks:2});R(l,454,30.5,27,4,'#d8c8a8');
    /* the alley between them */
    R(l,425,38,30,66,'#0c0a14');poly(l,[425,38,433,48,433,98,425,104],'#55493a');poly(l,[455,38,448,48,448,98,455,104],'#6e6250');
    R(l,433,48,15,50,'#1a1826');R(l,436,60,9,38,'#2e3050');poly(l,[425,104,433,98,448,98,455,104],'#6e6654');ao(l,425,38,30,22,'t',.6);
    /* paving */
    pave(l,0,103,480,144,'#b6aa92',r,{vx:240,vy:64,rows:5,step:36,v:.1});ao(l,0,103,480,7,'t',.5);
    /* the well */
    oval(l,190,109,22,3.5,'rgba(0,0,0,.4)');clipTo(l,()=>{l.beginPath();l.rect(172,94,35,10);l.ellipse(189.5,104,17.5,5,0,0,6.2832)},()=>{ashlar(l,172,92,35,18,'#b0a48e',r,{bw:8,bh:4.5});
      l.fillStyle=lg(l,172,0,207,0,[[0,'rgba(0,0,0,.3)'],[.3,'rgba(255,255,255,.12)'],[1,'rgba(0,0,0,.5)']]);l.fillRect(172,92,35,18)});
    oval(l,189.5,94,17.5,4,'#d2c6ac');oval(l,189.5,94.3,13.5,2.8,'#141018');
    wood(l,174,69,3,25,'#6a4a2c',1);wood(l,201,69,3,25,'#6a4a2c',1);wood(l,171,67,36,3,'#7a5632');oval(l,189.5,68.5,4,2.4,'#8a6238');for(let i=0;i<4;i++)R(l,186.5+i*1.6,66.5,.8,4,'#c8aa68');
    R(l,189,71,.6,13,'#c8aa68');poly(l,[185.5,84,193.5,84,192.5,91,186.5,91],'#7a5632');R(l,185.5,84,8,1,'#a88252');R(l,185.5,87,8,.6,'#3a2a1a');
    /* the merchant's stall */
    R(l,346,94,56,15,'rgba(10,6,4,.5)');wood(l,342,48,3,62,'#6a4a2c',1);wood(l,402,48,3,62,'#6a4a2c',1);wood(l,340,47,67,3,'#7a5632');
    boards(l,346,94,56,15,7,'#6a4a2c',r);wood(l,344,90,60,4.5,'#8a6238');
    for(const[bx,c]of[[356,'#8a3f78'],[368,'#3f66a0'],[380,'#c89a30']]){oval(l,bx,89.5,6,1,'rgba(0,0,0,.4)');oval(l,bx,86,5.6,4.4,tint(c,-.3));oval(l,bx-.8,85.2,4.6,3.6,c);oval(l,bx-1.8,84,2.2,1.6,tint(c,.3));
      for(let i=0;i<5;i++)stroke(l,[bx-4+i*2,83+r()*2,bx-3+i*2,88],tint(c,-.4),.4)}
    vessel(l,393,90,4,10,'#a8562e','jar',{noShadow:1});
    /* the brazier */
    oval(l,248,112.5,10,2,'rgba(0,0,0,.4)');stroke(l,[243,103,241,112],'#1a1418',1.4);stroke(l,[253,103,255,112],'#1a1418',1.4);stroke(l,[248,103,248,111],'#1a1418',1.2);
    poly(l,[240.5,99,255.5,99,253,104,243,104],'#3a2e34');R(l,240,98,16,1.5,'#5a4a50')},
   m=>{pool(m,248,98,95,70,'#ffb060',.95);pool(m,248,112,80,18,'#ffa050',.6);
    comp(m,'lighter',.75,()=>poly(m,[83,70,101,70,128,136,58,136],lg(m,0,70,0,136,['rgba(255,190,100,.2)','rgba(255,180,90,.85)','rgba(255,170,80,.15)'])));
    pool(m,92,60,34,30,'#ffb868',.5);pool(m,402,16,260,150,'#5a6aa8',.28);
    comp(m,'multiply',1,()=>{ao(m,0,0,50,144,'l',.4,'#0c0a24');ao(m,430,0,50,144,'r',.35,'#0c0a24');ao(m,0,126,480,18,'b',.35,'#0c0a24');
      for(const[x0,x1]of[[0,140],[236,425],[455,480]])ao(m,x0,90,x1-x0,14,'b',.35,'#0c0a24')})});
  /* what gives light of its own: the window and the coals */
  g.fillStyle=lg(g,0,53,0,70,['#ffd884','#f0a040']);g.fillRect(83,53,18,17);pool(g,92,61,10,9,'#fff0b0',.5);
  for(let i=0;i<4;i++)R(g,85.5+i*4.5,53,1,17,'#3a2416');R(g,83,58.5,18,1,'#3a2416');R(g,83,64.5,18,1,'#3a2416');pool(g,92,62,26,22,'#ff9c40',.3);
  for(let i=0;i<7;i++)R(g,242+i*2,98,1.5,1,i%2?'#ff7028':'#ffb040');pool(g,248,97,18,14,'#ff8030',.4)},
 fore(g){/* close to the viewer: jars and a cart shaft on the left, crates on the right, palm fronds overhead */
  vessel(g,10,150,10,30,'#141018','amph',{noShadow:1});vessel(g,29,148,7,18,'#1a1420','jar',{noShadow:1});
  const r=rng(24);for(const[bx,by,bw,bh]of[[484,146,40,20],[494,127,26,15]]){boards(g,bx,by-bh,bw,bh,6.5,'#3a3048',r);R(g,bx,by-bh,bw,1.2,'#5a5078');R(g,bx,by-1.6,bw,1.6,'#1c1628');R(g,bx,by-bh/2-.5,bw,1,'#241c34')}
  for(let i=0;i<7;i++){const a=.2+i*.2,L=50+(i%3)*12,ox=528,oy=-10,p=[ox,oy];for(let k=1;k<=12;k++){const q=k/12;p.push(ox-Math.cos(a)*L*q,oy+Math.sin(a)*L*q+q*q*16)}
    stroke(g,p,'#0e121c',1.4);for(let k=2;k<=12;k++){const x=p[k*2],y=p[k*2+1],n=6-k*.25;stroke(g,[x,y,x-n*.5,y+n],'#121826',1);stroke(g,[x,y,x+n*.6,y+n*.8],'#182234',1)}}},
 draw(g,t){
  flame(g,199.5,49,t+70);flame(g,219.5,49,t);pool(g,210,50,20+Math.sin(t/210),12,'#ff8a3c',.1);
  pool(g,92,61,20+Math.sin(t/230),17,'#ffb050',.1);
  flame(g,245,97,t,1);flame(g,249.5,97.5,t+50,1);pool(g,248,95,36+Math.sin(t/170)*2,28,'#ff8a3c',.13+.03*Math.sin(t/90));
  if(!F.awning){awningCloth(g,[345,51,367,51,366,58,362,60,361,69,356,75,352,68,349,70,347,62,345,63],'#58303a',0);awningCloth(g,[384,51,402,51,402,55,399,60,394,56,389,60,385,55],'#58303a',0);
    stroke(g,[367,51,372,55,378,53,384,51],'#3a2028',.6)}
  else{awningCloth(g,[343,50,407,50,407,58,343,58],'#58303a',0);for(let i=0;i<64;i+=7)poly(g,[343+i,58,350+i,58,346.5+i,61],(i/7)%2?'#42222c':'#58303a')}},
 front(g){if(F.awning){awningCloth(g,[404,51,461,51,461,113,404,113],'#4a2832',0);ao(g,404,51,57,62,'l',.25);ao(g,404,95,57,18,'b',.4);
    R(g,404,49.5,57,1.6,'#b89a5a');R(g,404,50.8,57,.5,'#6a5630');R(g,425.5,73.5,10,9,'#18141a');for(let i=0;i<10;i+=2)R(g,425.5+i,73.5,1,.6,'#8a806a');for(let i=0;i<9;i+=2)R(g,425.5,73.5+i,.6,1,'#8a806a');
    for(let i=0;i<57;i+=7)poly(g,[404+i,113,411+i,113,407.5+i,115.5],'#3a1e28')}}};
/* ---------- Naomi's upper room on the city wall: lamplight first, then darkness and the moon ---------- */
ART.house={w:320,
 variant:()=>F.lampOut?(F.shutters?'moon':'dark'):'lamp',
 light:()=>F.lampOut?(F.shutters?{amb:'#4a5484',lamps:[[216,104,70,'#5a6aa8']]}:{amb:'#444a74'}):{amb:'#827488',lamps:[[104,56,135,'#d8a860']]},
 paint(g,v){const r=rng(37),S='#b4a894',T='#6b4a2e';
  ashlar(g,0,0,320,105,S,r,{bw:24,bh:11.5,v:.1,t:.5});
  /* ceiling joists over a great cedar beam */
  R(g,0,0,320,9,'#2a1d14');tex(g,'wood',.6,0,0,320,9);
  for(let i=-1;i<9;i++){const a=14+i*44,k=1.16,x0=160+(a-160)*k,x1=160+(a+7-160)*k;poly(g,[a,9,a+7,9,x1,0,x0,0],T);poly(g,[a+5,9,a+7,9,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,9,x0+.25,0],tint(T,.25),.5)}
  wood(g,0,8.5,320,3,'#5a3e28');ao(g,0,11.5,320,7,'t',.45);
  wood(g,170,19,92,8,'#7a5232');R(g,170,19,92,1,'#a67848');R(g,170,26,92,1,'#3e2a1a');ao(g,170,27,92,5,'t',.45);
  for(const cx0 of[170,254]){poly(g,[cx0,27,cx0+8,27,cx0+8,31,cx0+3,34,cx0,34],'#8f8474');R(g,cx0,27,8,.5,'#c8bca8')}
  poly(g,[0,0,7,9,7,105,0,113],'#8f8574');poly(g,[320,0,313,9,313,105,320,113],'#857b6a');ao(g,0,0,7,113,'l',.3);ao(g,313,0,7,113,'r',.3);
  /* floorboards running toward the viewer */
  pave(g,0,105,320,144,'#8a6a46',r,{vx:160,vy:70,rows:2,step:15,v:.1,p:1.2,t:.3});tex(g,'vert',.35,0,105,320,39,'overlay',.5);ao(g,0,105,320,8,'t',.55);
  /* stairs down to the alley */
  R(g,9.5,35,37,71,'#9a9080');R(g,12,38,32,68,'#08060c');poly(g,[12,38,18,44,18,106,12,106],'#3a3440');
  for(let i=0;i<5;i++){R(g,18+i*2.5,92+i*3,26-i*2.5,3.2,tint('#4a4450',-i*.12));R(g,18+i*2.5,92+i*3,26-i*2.5,.5,'#6a6474')}
  wood(g,9.5,34,37,3,'#5a3e28');ao(g,12,38,32,14,'t',.7);
  /* lamp niche */
  R(g,89,48,20,21,'#7a7062');oval(g,99,49,10,4,'#7a7062');R(g,91,50,16,17,'#2a2420');oval(g,99,51,8,3.4,'#2a2420');R(g,89,67.5,20,1.6,'#cfc4b0');
  vessel(g,98,67,4.6,3.4,'#b06a3a','bowl',{noShadow:1});poly(g,[101.5,64,106,63.6,106.5,65,101.5,66],'#a05c30');R(g,104,63,1.5,1,'#3a2416');
  /* a woven hanging, and a shelf of bowls */
  R(g,126,40,34,1.5,'#5a3e28');for(let j=0;j<32;j++){const c=['#8a3a30','#c9a14a','#2f5a6a','#e0d2b0'][(j>>2)%4];R(g,127,41.5+j,32,1,tint(c,(j%2)*-.12))}
  for(let i=0;i<8;i++)R(g,127.5+i*4.2,73.5,1,3,'#c9a14a');ao(g,127,41.5,32,32,'r',.25);
  wood(g,262,52,36,2.5,'#70502e');ao(g,262,54.5,36,5,'t',.35);vessel(g,270,52,4.5,4.5,'#a8562e','bowl');vessel(g,282,52,3.4,8,'#8a744a','jug');vessel(g,292,52,3.6,6,'#6f5a3a','jar');
  /* the window: its frame and sill (the shutters and the view are drawn live) */
  R(g,189,29,54,60,'#c8bca8');R(g,192,32,48,54,'#8a8070');R(g,196,36,40,46,'#0c0a14');R(g,187,86,58,3.5,'#d6cab6');R(g,187,89.5,58,1,'#6a6254');ao(g,187,90.5,58,5,'t',.3);
  /* table: bread and a cup */
  R(g,121,100,38,9,'rgba(10,6,4,.5)');wood(g,121.5,100,3,9.5,'#5a3c22',1);wood(g,155.5,100,3,9.5,'#5a3c22',1);wood(g,117,96,46,4.2,'#8a6238');R(g,117,99.6,46,1,'#4e3520');
  oval(g,130,95.2,5.5,2,'#b88a48');oval(g,129.4,94.6,4.6,1.5,'#d8ae6a');stroke(g,[127,94.6,132,94.6],'#a07838',.5);vessel(g,146,96,2.4,6,'#9a5230','jug',{noShadow:1});
  /* rolled sleeping mat, storage jars */
  oval(g,69,108.5,15,1.6,'rgba(0,0,0,.4)');g.fillStyle=lg(g,0,101,0,108,['#9a8a5c','#6f6240','#463c26']);g.fillRect(56,101,26,7.5);for(let i=0;i<26;i+=2)R(g,56+i,101,.5,7.5,'rgba(0,0,0,.22)');
  oval(g,56,104.7,2.2,3.7,'#7a6c46');oval(g,82,104.7,2.2,3.7,'#4e4430');for(const rr of[1,2.2])stroke(g,[56-rr*.5,104.7-rr,56+rr*.5,104.7+rr],'#5a4e32',.4);R(g,62,101,1.2,7.5,'#6a3a2a');R(g,75,101,1.2,7.5,'#6a3a2a');
  vessel(g,284,110,7,16,'#a8562e','pithos');vessel(g,297,110,6,14,'#8a744a','jar');vessel(g,308,108,5.5,15,'#8e4428','amph');
  if(v==='lamp'){lightmap(g,320,'#4e4058',l=>{pool(l,104,58,165,120,'#ffca84',.95);pool(l,104,60,64,52,'#ffe2a8',.8);pool(l,112,120,120,28,'#d89850',.5);
      comp(l,'multiply',1,()=>{ao(l,250,0,70,144,'r',.5,'#1a1030');ao(l,0,0,320,24,'t',.5,'#1a1030');ao(l,0,128,320,16,'b',.35,'#1a1030')})});pool(g,104,60,24,18,'#ff9c40',.4)}
  else lightmap(g,320,v==='moon'?'#343a66':'#2c3058',l=>{if(v==='moon'){pool(l,216,58,62,56,'#8fa4e8',.55);
      comp(l,'lighter',.8,()=>poly(l,[196,86,236,86,268,144,160,144],lg(l,0,86,0,144,['rgba(130,155,240,.25)','rgba(130,155,240,.75)'])))}
    comp(l,'multiply',1,()=>{ao(l,0,0,60,144,'l',.45,'#0c0a24');ao(l,270,0,50,144,'r',.4,'#0c0a24');ao(l,0,0,320,22,'t',.4,'#0c0a24')})})},
 fore(g){vessel(g,8,152,12,30,'#1c1418','pithos',{noShadow:1});poly(g,[300,144,322,144,322,120,304,122],'#1c1418');R(g,303,121.5,19,1.5,'#3a2a26');for(let i=0;i<5;i++)R(g,305+i*3.6,124,.6,20,'#2e2220')},
 draw(g,t){const L=(x,y)=>{const l=lightAt('house',x,y+18);return c=>l?mul(c,l):c},k=L(216,60);
  if(F.shutters){g.fillStyle=lg(g,0,36,0,82,['#0a1034','#1c2a62','#34447e']);g.fillRect(196,36,40,46);
    [[201,41],[209,50],[222,39],[230,47],[216,56],[204,60],[227,58]].forEach((p,i)=>R(g,p[0],p[1],.6,.6,(Math.floor(t/600)+i)%5?'#e4e4ff':'#7a80b8'));
    const hp0=[196,82];for(let x=0;x<=40;x++)hp0.push(196+x,82-(7+2*Math.sin(x/6)+1.5*Math.sin(x/2.7)));hp0.push(236,82);poly(g,hp0,'#0e1434');
    const hp1=[196,82];for(let x=0;x<=40;x++)hp1.push(196+x,82-(3+1.5*Math.sin(x/4+2)));hp1.push(236,82);poly(g,hp1,'#080c22');
    ao(g,196,36,40,5,'t',.5);boards(g,187,35,9,48,3,k('#7a5230'),rng(5));boards(g,236,35,9,48,3,k('#6a4628'),rng(6));R(g,187,35,9,.6,k('#a67848'));R(g,236,35,9,.6,k('#a67848'))}
  else{boards(g,196,36,40,46,5,k('#7a5230'),rng(5));for(const by of[46,70]){R(g,196,by,40,2.2,k('#2a2420'));R(g,196,by,40,.5,k('#5a5048'))}
    R(g,203,57,26,2.6,k('#5a3e24'));R(g,203,57,26,.6,k('#8a6238'));ao(g,196,36,40,5,'t',.5)}
  if(!F.lampOut){flame(g,104.5,62.5,t);pool(g,104,59,22+Math.sin(t/190)*1.5,17,'#ff9838',.16+.03*Math.sin(t/83))}
  if(F.ropeTied){const rp=k('#b89a5a'),rd=k('#8f7440');for(let i=0;i<3;i++){R(g,212.5+i*2.4,18.5,2,9.5,i%2?rd:rp);R(g,212.5+i*2.4,18.5,.5,9.5,k('#d8bc7a'))}
    if(F.basketOn)stroke(g,[216.5,28,216.5,57],rp,1);
    else{stroke(g,[216.5,28,216.5,84,250,104],rp,1);coilArt(g,254,103,3,L(254,100))}}
  if(F.basketOn)basketArt(g,202,88,true,k)},
 front(){}};
/* ---------- Outside the wall (title and ending): open country under the moon ---------- */
ART.wall={w:320,paint(g){const r=rng(51);
  g.fillStyle=lg(g,0,0,0,116,['#05071a','#0a0f2e','#141c4a','#263468','#3a4a86']);g.fillRect(0,0,320,116);
  for(let i=0;i<230;i++){const b=r(),sx=r()*320,sy=r()*r()*100;R(g,sx,sy,b>.94?1:.5,b>.94?1:.5,b>.9?'#ffffff':b>.5?'#b9c2f0':'#6f78b4')}
  pool(g,262,24,80,60,'#5a6cc0',.5);pool(g,262,24,28,26,'#aab8f0',.5);oval(g,262,24,9.5,9.5,'#f4f0da');oval(g,258.5,21.5,2.6,2,'#d6d2ba');oval(g,266,28,2,1.4,'#d6d2ba');oval(g,264,19,1.3,1,'#dedac2');
  for(const[cx0,cy,cw]of[[210,34,60],[300,14,40],[170,60,50]])pool(g,cx0,cy,cw,3.5,'#6674b4',.3,'screen');
  /* hills, fold on fold, and the road going south */
  ridge(g,150,320,116,x=>22+8*Math.sin(x/41+2)+4*Math.sin(x/13),['#232e62','#1a2250']);
  ridge(g,150,320,116,x=>10+6*Math.sin(x/23)+4*Math.sin(x/9+1)+(x>230&&x<290?8-Math.abs(x-260)/4:0),['#2c3a72','#18204a']);
  for(let i=0;i<40;i++){const tx=152+r()*166,ty=104+r()*10;oval(g,tx,ty,1.5+r()*2,1+r(),'#101838')}
  g.fillStyle=lg(g,0,112,0,144,['#1e2648','#161c38','#0e1226']);g.fillRect(0,112,320,32);tex(g,'mott',.5,0,112,320,32,'overlay',1);
  /* the road south: wide at the foot of the wall, a thread by the time it reaches the hills */
  const road=[],cy=k=>124+6*Math.sin(k*3)-8*k;for(let i=0;i<=40;i++){const k=i/40*1.4-.25;road.push(112+150*k,cy(k)-1-5*(1-k/1.15)*.6)}
  for(let i=40;i>=0;i--){const k=i/40*1.4-.25;road.push(112+150*k,cy(k)+2.5+9*Math.max(0,1-k/1.15))}
  poly(g,road,'#3d4470');clipTo(g,()=>poly(g,road),()=>{tex(g,'mott',.55,60,100,260,44);ao(g,60,108,260,10,'t',.25,'#0a0c24')});
  for(const[bx,by,bw]of[[180,123,6],[290,134,9],[236,138,7],[200,140,5]]){oval(g,bx,by,bw,bw*.45,'#1c2244');oval(g,bx-1,by-.8,bw*.7,bw*.3,'#2c3460')}
  R(g,224,98,2.5,18,'#141024');foliage(g,225,93,11,8,'#1e3440',r,50);foliage(g,217,97,6,4.5,'#1a2c38',r,20);
  /* the wall runs away to a far tower; the near stretch faces us, with Naomi's house built out over it */
  const side=[146,10,236,56,236,113,146,123],sy=(x,f)=>{const k=(x-146)/90;return 10+46*k+(113-57*k+10*(1-k))*f};
  poly(g,side,'#4a5486');clipTo(g,()=>poly(g,side),()=>{for(let j=1;j<12;j++)stroke(g,[146,sy(146,j/12),236,sy(236,j/12)],'#2c3360',.5);
    for(let j=0;j<12;j++)for(let i=0,x=146+(j%2)*5;x<236;i++,x+=11-i*.55){stroke(g,[x,sy(x,j/12),x,sy(x,(j+1)/12)],'#2c3360',.5)}
    tex(g,'mott',.45,146,10,92,114);ao(g,146,92,92,32,'b',.45,'#0a0c24');ao(g,146,10,92,114,'r',.25,'#0a0c24')});
  for(let i=0;i<9;i++){const x=148+i*10-i*i*.25,k=(x-146)/90;R(g,x,10+46*k-4+k*1.6,5-k*2.4,4.5-k*1.6,'#4a5486')}
  ashlar(g,234,47,13,66,'#404a7c',r,{bw:6,bh:4,v:.08,t:.3,m:'#262c58'});for(let i=0;i<13;i+=5)R(g,234+i,44,3.5,3.5,'#404a7c');R(g,246,47,1,66,'#20264c');R(g,238.5,58,2,4,'#0a0c20');
  const far=[247,62,300,84,300,110,247,113];poly(g,far,'#3a4274');clipTo(g,()=>poly(g,far),()=>{for(let j=1;j<9;j++)stroke(g,[247,62+j*5.7,300,84+j*2.9],'#272e58',.5);
    tex(g,'mott',.4,247,60,54,54);ao(g,247,96,54,18,'b',.4,'#0a0c24')});for(let i=0;i<6;i++)R(g,250+i*8,61+i*3.3,3,2.5,'#3a4274');R(g,298,78,6,32,'#2c3462');R(g,298,78,6,.6,'#5a629a');
  ashlar(g,0,10,146,113,'#4a4f78',r,{bw:21,bh:10,v:.1,t:.45,m:'#22264a'});for(let i=0;i<146;i+=10)ashlar(g,i,4.5,6,6,'#4a4f78',r,{bw:6,bh:6,t:.3,m:'#22264a'});
  ao(g,0,84,146,39,'b',.45,'#0a0c24');ao(g,0,10,30,113,'l',.35,'#0a0c24');R(g,145,10,1,113,'#6a70a0');
  plaster(g,70,0,66,48,'#5c6090',r,{patch:3,cracks:4,brick:'#3a3e66',t:.4});poly(g,[136,0,141,3,141,45,136,48],'#33385e');R(g,69,46.5,68,2.5,'#2c3058');
  for(let i=0;i<5;i++){poly(g,[73+i*14,49,78+i*14,49,78+i*14,52,75+i*14,55,73+i*14,55],'#383c66');R(g,73+i*14,49,5,.5,'#6a70a0')}ao(g,70,55,66,10,'t',.4,'#0a0c24');
  R(g,92,16,26,28,'#3a3e66');R(g,94,18,22,24,'#2a2e56');R(g,96,20,18,20,'#05040c');R(g,91,43.5,28,2.2,'#7a80b0');ao(g,96,20,18,4,'t',.6);
  /* bushes at the foot of the wall */
  foliage(g,60,123,15,5,'#141c34',r,50);foliage(g,24,125,11,4,'#101830',r,30);foliage(g,128,124,8,3,'#182040',r,20);
  pool(g,262,24,300,170,'#7080c8',.1)},
 draw(){},front(){}};
function miniBasket(g,x,y,rider){stroke(g,[x-6,y-11,x,y-22],'#b89a5a',.8);stroke(g,[x+6,y-11,x,y-22],'#b89a5a',.8);
  if(rider){R(g,x-3,y-18,6,7,'#b8845a');R(g,x-3.5,y-19,7,2.6,'#2a1a12');R(g,x-1,y-13.5,4,3,'#2a1a12');R(g,x-5,y-12.5,10,3,'#6a4a30');R(g,x+1,y-16,1,1,'#1a100a')}
  const p=[];for(let j=0;j<=10;j++)p.push(x-8.5+j*.25*(j<5?1:0)-(j>=5?-1.25-(j-5)*.5:0),y-11+j);for(let j=10;j>=0;j--)p.push(x+8.5-(j<5?j*.25:1.25+(j-5)*.5),y-11+j);
  clipTo(g,()=>poly(g,p),()=>{R(g,x-9,y-11,18,11,'#7a5c2c');for(let j=0;j<22;j++)for(let i=(j>>1)%2*2;i<18;i+=4)R(g,x-9+i,y-11+j*.5,2,.5,j%2?'#b08c48':'#96763a');
    g.fillStyle=lg(g,x-9,0,x+9,0,['rgba(0,0,0,.3)','rgba(255,230,170,.15)','rgba(0,0,0,.5)']);g.fillRect(x-9,y-11,18,11)});
  R(g,x-9,y-12,18,2,'#6f5226');R(g,x-8.5,y-12.5,17,.8,'#c9a55a');R(g,x-5,y-11,1.5,10,'#3a2416');R(g,x+3.5,y-11,1.5,10,'#3a2416')}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  eliab:{skin:'#b88458',hair:'#a8a8a8',beard:'#bcbcbc',longBeard:1,bald:1,brow:'#8a8a8a',tunic:'#7a8a6a',cloak:'#44543e',long:1,belt:'#4a3a24',trim:'#56634a',ph:900},
  naomi:{skin:'#c49268',veil:'#8a4a5a',tunic:'#4f7480',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#c9a14a',brow:'#3a2414',ph:1700},
  jesse:{skin:'#c49268',hair:'#3a2414',tunic:'#a89060',belt:'#5a3a20',h:8,slim:1,trim:'#7a6238',ph:2600},
  guard:{skin:'#a87850',helm:'#b08a3c',beard:'#1a100a',tunic:'#7a2a2a',cloak:'#3a3550',cape:1,belt:'#b08a3c',spear:1,armor:'#5a3a22',trim:'#c9a14a',brow:'#1a100a',ph:3300},
  zakkai:{skin:'#b07a4c',wrap:'#d2c296',beard:'#4a3a2a',tunic:'#4a5a8a',stripe:'#3a4873',long:1,belt:'#c9a14a',trim:'#c9a14a',longSleeve:1,brow:'#3a2a1a',ph:2100}});
actor('eliab','Eliab','#a8d8a0',118);actor('naomi','Naomi','#f0a8c0',250);actor('jesse','Jesse','#f0c878',215);
actor('guard','the guard','#f08070',96);actor('zakkai','the merchant','#90b8f0',132);
Object.assign(ICON,{
  pouch(g){IH.bag(g,'#8a5830',12,15,7.6,6.4);R(g,11,3.4,2,3,'#c9a14a');stroke(g,[8,8.8,5,11],'#c9a14a',.7);stroke(g,[16,8.8,19,11.4],'#c9a14a',.7)},
  patch(g){IH.square(g,'#2a211c',6,6.6,12,11.4,'#8a806a');for(let i=6.6;i<18;i+=1.6){R(g,i,5.6,.6,1.2,'#3a3028');R(g,i,17.8,.6,1.2,'#3a3028')}},
  strips(g){for(let k=0;k<3;k++){const p=[],q=[];for(let j=0;j<=16;j++){const x=6.4+k*5.2+Math.sin(j/2.5+k)*1.5;p.push(x,4+j);q.unshift(x+3,4+j)}poly(g,p.concat(q),k%2?'#2a211c':'#3a2e26');
      stroke(g,p,'#5a4a3c',.5);for(let j=2;j<16;j+=3)R(g,6.4+k*5.2+Math.sin(j/2.5+k)*1.5+.6,4+j,1.8,.5,'rgba(0,0,0,.4)')}},
  rope(g){IH.coil(g,['#b89a5a','#a08448','#b89a5a','#8f7440'],12,8.6,6.2,2.4,2.8);stroke(g,[17.6,17.4,19.4,21.4],'#b89a5a',1.4)},
  longrope(g){IH.coil(g,['#b89a5a','#a08448','#b89a5a','#4a3c32','#3a2e26','#4a3c32'],12,6,7.6,2.4,2.7);stroke(g,[19,19.6,20.4,22.4],'#3a2e26',1.4)},
  basket(g){IH.basket(g);stroke(g,[6,6,6,3.2,8.4,2.6],'#a08a56',.8);stroke(g,[18,6,18,3.2,15.6,2.6],'#a08a56',.8)},
  strongbasket(g){IH.basket(g);for(const x of[6.6,15.4]){R(g,x,2.6,2.2,17.4,'#4a2c18');R(g,x,2.6,.6,17.4,'#8a5a34');for(let j=9;j<19;j+=2.6)R(g,x+.9,j,.5,1,'#d8c9a0')}R(g,6.6,1.6,11,2.2,'#4a2c18');R(g,6.6,1.6,11,.6,'#8a5a34')},
  straps(g){[[3.6,6.4,'#7a4a26'],[5.6,11.6,'#8a5830'],[2.8,16.8,'#6a3e1e']].forEach(([x,y,c],i)=>{g.fillStyle=lg(g,0,y,0,y+3.2,[tint(c,.25),c,tint(c,-.35)]);g.fillRect(x,y,15.6,3.2);
      for(let j=x+2;j<x+14;j+=2.6)R(g,j,y+1.3,.7,.7,'#2e1a0c');const bx=i===1?x-1:x+14.6;R(g,bx,y-.4,3,4,'#c9a14a');R(g,bx+.8,y+.5,1.4,2.2,'#4a2c18');R(g,bx,y-.4,3,.7,'#f0d890')})},
  skin(g){g.beginPath();g.ellipse(12,14.4,5.2,7,.12,0,6.2832);g.fillStyle=lg(g,6,0,18,0,['#9a6c40','#7a5230','#3e2814']);g.fill();R(g,10.2,4.2,3.6,3.6,'#4a2f1a');R(g,10.8,3,2.4,1.4,'#c9a14a');
    stroke(g,[13.8,5.6,18.6,9,19.4,14],'#3a2414',.9);stroke(g,[8.6,11,8.2,16.4],'#b08454',.7);stroke(g,[9,19.4,12,21,15,19.6],'rgba(0,0,0,.35)',.6)},
  skinfull(g){g.beginPath();g.ellipse(12,14,7,7.4,.1,0,6.2832);g.fillStyle=lg(g,4,0,20,0,['#a4764a','#7a5230','#3e2814']);g.fill();R(g,10.2,3.6,3.6,3.6,'#4a2f1a');R(g,10.8,2.4,2.4,1.4,'#c9a14a');
    stroke(g,[13.8,5,19.4,8.6,20.6,14],'#3a2414',.9);stroke(g,[7.2,10.6,6.8,16.6],'#c09460',.8);poly(g,[16.4,15,17.8,18.2,16.4,19.6,15,18.2],'#7ec0f0');R(g,16,17.6,.7,.9,'#e0f4ff')}});
Object.assign(ITEMS,{
  pouch:{name:'tool pouch',look:'My leather tool pouch, tied shut. A tentmaker is never far from his tools.',
    open:async()=>{await say(P,'I untie the pouch. My awl, just where it belongs.');delItem('pouch');addItem('awl');F.gotAwl=1}},
  cloth:{name:'goat-hair cloth',look:'The dark goat-hair cloth of Cilicia, my home province. Tough enough for any tent.'},
  patch:{name:'cloth patch',look:'A square of goat-hair cloth, cut to cover a tear.'},
  strips:{name:'cloth strips',look:'Long strips of goat-hair cloth. Braided, they would be as strong as rope.'},
  rope:{name:'short rope',look:'Good rope, but far too short to reach from a window in the wall to the ground.'},
  longrope:{name:'long rope',look:'Rope spliced to a braided goat-hair cord. Long enough now, and every knot is sound.'},
  basket:{name:'large basket',look:'A big provision basket of woven reeds. The carrying loops are worn nearly through.'},
  strongbasket:{name:'reinforced basket',look:"Leather straps cradle the basket from rim to rim. It will bear a man's weight."},
  straps:{name:'leather straps',look:'Old harness straps. Worn, but the leather is thick and sound.'},
  skin:{name:'waterskin',look:'My waterskin. Empty.'},
  skinfull:{name:'full waterskin',look:'My waterskin, heavy with cool well water.'}});
async function reinforce(){
  if(!has('straps'))return say(P,'Thread alone will not hold a man. The basket needs strong bands beneath it. Leather, perhaps.');
  if(!has('awl'))return say(P,'I need my awl to pierce the leather.');
  if(!has('thread'))return say(P,'I have nothing to stitch with.');
  SFX.sew();await say(P,'Two straps under the base, crossed, and stitched up each side to the rim...');SFX.sew();await wait(700);
  delItem('basket');delItem('straps');addItem('strongbasket',1);F.strong=1;SFX.good();
  await say(P,'There. It would carry a full load of grain. Or one tentmaker.')}
Object.assign(COMBO,{
  'cloth+knife':async()=>{SFX.cut();await say(P,'Following the weave... one square patch, and the rest in long strips.');
    delItem('cloth');addItem('patch',1);addItem('strips');F.cutCloth=1},
  'rope+strips':async()=>{SFX.sew();await say(P,'I braid the strips three-fold into a cord, then splice it to the rope.');
    delItem('rope');delItem('strips');addItem('longrope',1);F.longRope=1;SFX.good();
    await say(P,'"A threefold cord cannot quickly be torn apart." (Ecclesiastes 4:12) Now it will reach the ground.')},
  'awl+basket':reinforce,'basket+straps':reinforce,'basket+thread':reinforce,
  'awl+straps':()=>say(P,'The straps must be sewn onto something that needs their strength.'),
  'straps+thread':()=>say(P,'The straps must be sewn onto something that needs their strength.'),
  'knife+rope':()=>say(P,'Cut it? It is too short already.'),
  'awl+patch':()=>say(P,'A patch needs a tear to cover.'),'patch+thread':()=>say(P,'A patch needs a tear to cover.'),
  'awl+cloth':()=>say(P,'The cloth must be cut to shape before any stitching.'),
  'cloth+thread':()=>say(P,'The cloth must be cut to shape before any stitching.'),
  'cloth+rope':()=>say(P,'The cloth is too broad to join to a rope. It would need to be cut into strips.'),
  'knife+strips':()=>say(P,'They are narrow enough.'),'knife+patch':()=>say(P,'It is the right size already.'),
  'basket+rope':()=>say(P,'Neither the rope nor the basket is ready for that yet.'),
  'basket+longrope':()=>say(P,'The rope is ready. The basket is not: its loops would tear away.'),
  'longrope+strongbasket':()=>say(P,'I will join them at the window, once the rope is anchored.'),
  'rope+strongbasket':()=>say(P,'The rope is still far too short.'),
  'knife+longrope':()=>say(P,'After all that work? No.')});
/* ============ PRAYER HINTS ============ */
function hint(){
  if(!F.gotAwl)return['pouch',['A craftsman should know what he carries. My own tools are close at hand.','My tool pouch is tied shut. I should open it.']];
  const m=[];if(!F.gotKnife||!F.gotCloth)m.push('the workbench');if(!F.gotThread)m.push('the shelf');if(!F.gotRope)m.push('the pegs on the wall');if(!F.gotBasket)m.push('the corner by the bench');
  if(m.length)return['gather',["Eliab said to take what I need. A tentmaker's eye should miss nothing in his workshop: blade, cloth, thread, rope, basket.",
    'Something useful still waits in the workshop. I should look to '+m.join(', and ')+'.']];
  if(!F.cutCloth)return['cut',['Whole cloth serves no one. What does a tentmaker do first with a bolt of cloth?','My knife can cut the goat-hair cloth into useful pieces.']];
  if(!F.longRope)return['braid',['The rope is too short, yet I hold the makings of more. Strands woven together are stronger than one.','I can braid the cloth strips and splice them onto the short rope.']];
  if(!F.awning)return F.metZakkai?['mend',["The merchant's trouble is one my own hands know how to mend. Kindness can open a way where force cannot.",'His torn awning needs a patch, thread, and my awl.']]
    :['street',['The way to the wall is watched. Yet not everyone in the street is an opposer. A neighbor in need may be close by.','I should go out and speak with the merchant at his stall.']];
  if(!F.strong)return['straps',['The basket must not fail. What I was given in thanks is strong, and my tools can join strong things together.','I can stitch the leather straps onto the basket with awl and thread.']];
  if(!F.inHouse)return['alley',['The soldier guards the alley, but he cannot watch what he cannot see. I need not confront him.','The hung awning shadows the alley mouth. I can slip behind it toward the wall quarter.']];
  if(!F.lampOut)return['lamp',['A window toward freedom can also be a beacon to watchmen. What here would betray us in the dark?','The lamp should be put out before the shutters are opened.']];
  if(!F.shutters)return['shut',['The way out is before me. It is only closed.','Now that the room is dark, I can open the shutters.']];
  if(!F.ropeTied)return['beam',['A rope is only as sure as what holds it. Something in this room has borne weight for generations.','I should tie the long rope to the roof beam above the window.']];
  if(!F.basketOn)return['hang',['All is nearly ready. The basket and the rope must become one.','I should fasten the reinforced basket to the rope at the window.']];
  return['end',['Jehovah has provided helpers and a way out. It is time to trust, and go.']]}
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'basket',q:'The basket loops are frayed through.',if:()=>F.gotBasket&&!F.strong},
  {id:'rope',q:'My rope is far too short.',if:()=>F.gotRope&&!F.longRope},
  {id:'awning',q:"The merchant's awning is torn.",if:()=>F.metZakkai&&!F.awning},
  {id:'thirst',q:'The soldier in the street is thirsty.',if:()=>F.metZakkai&&!F.kind}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Eliab',note:'A basket weaver, and a faithful brother. He is hiding me in his workshop.'},
    {name:'The soldier',note:"One of the governor's men. He watches the alley to the wall quarter.",if:()=>F.metZakkai||F.kind||F.inHouse},
    {name:'The merchant',note:()=>F.awning?'A wool merchant. His awning is mended, and it shades the alley.':'A wool merchant. The wind split his awning from pole to hem.',if:()=>F.metZakkai},
    {name:'Naomi',note:'A widow. Her upper room is built on the city wall itself.',if:()=>F.inHouse}],
  tasks:[
    {t:'Untie my tool pouch.',if:()=>!F.gotAwl},
    {t:'Gather what a tentmaker needs from the workshop.',if:()=>!(F.gotKnife&&F.gotCloth&&F.gotThread&&F.gotRope&&F.gotBasket)},
    {t:'Make a rope long enough to reach the ground.',if:()=>!F.longRope},
    {t:'Make the basket strong enough to carry a man.',if:()=>!F.strong},
    {t:"Help the merchant with his awning.",if:()=>F.metZakkai&&!F.awning},
    {t:"Reach Naomi's house in the wall quarter, without a quarrel.",if:()=>!F.inHouse},
    {t:'Let no light show from the window.',if:()=>F.inHouse&&!F.lampOut},
    {t:'Make the rope fast to something that will hold.',if:()=>F.inHouse&&!F.ropeTied},
    {t:'Fasten the basket to the rope, and open the way out.',if:()=>F.inHouse&&!(F.basketOn&&F.shutters)}],
  scripture:[
    {ref:'Proverbs 3:5, 6',text:'Trust in Jehovah with all your heart, And do not rely on your own understanding. In all your ways take notice of him, And he will make your paths straight.'},
    {ref:'Proverbs 15:1',text:'A mild answer turns away rage, But a harsh word stirs up anger.'},
    {ref:'Proverbs 25:21',text:'If your enemy is hungry, give him bread to eat; If he is thirsty, give him water to drink.'},
    {ref:'Ecclesiastes 4:12',text:'A threefold cord cannot quickly be torn apart.'}]};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
const E=ACT.eliab,Z=ACT.zakkai,GD=ACT.guard,N=ACT.naomi,J=ACT.jesse;
/* ---------- Workshop ---------- */
ROOMS.workshop={walk:[22,300,112,138],mood:'calm',amb:{crickets:.22,fire:.22},hs:[
  {name:'door to the street',x:10,y:36,w:34,h:70,wx:30,wy:113,dir:-1,look:'The door to the street. Beyond it, the city is being watched.',exit:()=>go('street',46,114,1)},
  {name:'tent panel on the frame',x:54,y:48,w:63,h:58,look:'A tent panel stretched for seaming. Eliab lets me work here to earn my bread.',pickup:'That panel is promised to a customer. There is a spare bolt on the bench.'},
  {name:'high window',x:70,y:24,w:22,h:18,look:'Night has fallen over Damascus. Somewhere out there, men are watching the gates for me.'},
  {name:'shelf',x:128,y:30,w:60,h:18,wx:150,look:'Jars of dye and beeswax.',pickup:'I have no use for dye tonight.'},
  {name:'spool of thread',x:156,y:35,w:12,h:10,wx:160,vis:()=>!F.gotThread,look:'A spool of waxed linen thread.',pickup:take('gotThread','thread','Waxed thread. Good and strong.')},
  {name:'oil lamp',x:143,y:58,w:16,h:48,wx:134,dir:1,look:'A small clay lamp. Its light is enough to work by.',pickup:'Eliab needs its light, and I do not.',use:'It burns well enough.'},
  {name:'stool',x:118,y:106,w:18,h:14,look:'A work stool. I have spent many hours on it, needle in hand.'},
  {name:'workbench',x:204,y:80,w:82,h:27,wy:113,look:'A scarred old workbench. Honest work has been done here.'},
  {name:"tentmaker's knife",x:211,y:73,w:16,h:10,wx:220,wy:113,vis:()=>!F.gotKnife,look:'A half-moon knife for cutting cloth and leather.',pickup:take('gotKnife','knife','Sharp. A good tool, for good work.')},
  {name:'bolt of goat-hair cloth',x:234,y:70,w:38,h:13,wx:252,wy:113,vis:()=>!F.gotCloth,look:'Dark goat-hair cloth, the kind woven in Cilicia, my home province. Tents are made of it.',pickup:take('gotCloth','cloth','Heavy and tough. This I know how to work.')},
  {name:'coil of rope',x:215,y:38,w:16,h:20,wx:224,wy:113,vis:()=>!F.gotRope,look:'A coil of rope on a peg. Not a long one.',pickup:take('gotRope','rope','Sound rope. But much too short to reach the foot of the city wall.')},
  {name:'mallet',x:245,y:38,w:13,h:20,wx:252,wy:113,look:'A mallet for driving tent pegs. I will not need it tonight.',pickup:'Too heavy to carry without a reason.'},
  {name:'waterskin',x:272,y:40,w:14,h:20,wx:274,wy:113,vis:()=>!F.gotSkin,look:'My waterskin, hanging where I left it. Empty.',pickup:take('gotSkin','skin','Empty. Still, a traveler should not leave it behind.')},
  {name:'large basket',x:288,y:80,w:30,h:32,wx:284,wy:114,dir:1,vis:()=>!F.gotBasket,look:'A large provision basket, big enough to hold a man. But its carrying loops are frayed.',
    pickup:take('gotBasket','basket','I can carry it. But those worn loops must be made strong before I trust my life to them.'),
    useWith:async()=>{await say(P,'I had better pick it up and look it over first.')}}]};
E.hs={name:'Eliab',actor:E,look:'Eliab, a basket weaver and a faithful brother. He has risked much to shelter me.',
  show:{pouch:'Your tools are in there, Saul. Untie it, and let us see what a tentmaker can do.',
    awl:'The awl that has stitched half the tents in Cilicia. Do not lose it tonight.',
    thread:'Waxed linen. Good for a seam. For the weight of a man you will want more than thread alone.',
    knife:'Mind that edge. Cut the cloth, not your fingers.',
    cloth:'Good Cilician cloth. But a whole bolt is no use to anyone. Cut it to the job.',
    patch:'A neat square. Something somewhere is torn, and you mean to mend it.',
    strips:'Twist those together and you have cord. You know that better than I do.',
    rope:'It was long enough for my baskets. Not for a city wall.',
    longrope:'Now that will reach the ground. I would trust my own neck to those knots.',
    basket:['My best basket, and I have worn its loops through.','Reeds alone will not carry a man. It wants something stronger underneath.'],
    strongbasket:'Leather, sewn from rim to rim. I wove that basket, and now I hardly know it.',
    straps:'Harness leather! Thick enough to carry a man, if it is sewn on well.',
    skin:'Empty? The well is just across the street. A traveler should not set out dry.',
    skinfull:'Fresh from the well. Keep it for the road, unless someone needs it more than you.',
    tablets:'Your tablets. Write down the brothers who helped you tonight, and thank Jehovah for every one of them.',
    '*':'Keep it, brother. You will need it more than I.'},
  ask:{basket:'I know. I wove it, and then I wore it out. Reeds alone will not bear a man; it wants leather beneath it.',
    rope:'Then make it longer. You have cloth, and a tentmaker knows how cloth becomes cord.',
    thirst:['Is he? He stands there to catch you, Saul.','And yet it is written: "If he is thirsty, give him water to drink." (Proverbs 25:21)']},
  talk:()=>talkTree([
    {q:'Tell me the plan once more.',a:async()=>{await say(E,"Sister Naomi's house is built on the city wall. Her upper window looks out over open country.");
      await say(E,'We lower you from it in a basket, by night. The gates will never see you.')}},
    {q:'What will we need?',a:async()=>{await say(E,'A basket that will not fail, and a rope long enough to reach the ground. Mine are neither. Not yet.');
      await say(E,'But you are a tentmaker, Saul. Take anything here that helps.')}},
    {q:'What of the soldiers?',a:async()=>{await say(E,'The governor under King Aretas has men at every gate. One stands in our own street, by the alley to the wall quarter.');
      await say(E,'Do not quarrel with him. A mild answer will serve better than a bold one.')}},
    {q:'Why do you risk so much for me?',once:1,a:async()=>{await say(E,'You came to Damascus to bind us, and the Lord turned you around. How could we not help our brother?');
      await say(P,'I do not deserve such kindness.');await say(E,'None of us do. That is why it is called undeserved kindness.')}},
    {q:'I must get to work.',bye:1,a:async()=>{await say(E,"Jehovah be with you. I will gather the brothers and meet you at Naomi's.")}}])};
/* ---------- Street ---------- */
const MEND=['awl','thread','patch'];
async function mend(it){if(!MEND.includes(it))return false;
  if(!has('patch'))return say(P,has('cloth')?'The tear needs a patch. I must cut one from my goat-hair cloth first.':'The tear is too wide to draw closed. It needs a patch of strong cloth.');
  if(!has('awl'))return say(P,'I cannot pierce this heavy cloth without my awl.');
  if(!has('thread'))return say(P,'I have an awl, but nothing to stitch with.');
  await say(P,'Hold the edge taut for me, friend.');SFX.sew();await wait(900);SFX.sew();
  await say(P,'A patch beneath, a flat seam over... as I learned it in Tarsus.');
  delItem('patch');SFX.good();await say(Z,'Stronger than new! Help me hang it across to the wall.');
  await fade(1,220);F.awning=1;await wait(300);await fade(0,220);
  await say(Z,'I have no coin tonight. But take these old harness straps. Good thick leather.');addItem('straps');
  await say(P,'Thank you. They may be exactly what I need.');
  await say(P,'The awning throws the alley mouth into shadow. From his brazier, the soldier cannot see it.',{thought:1,color:'#cfe2ff'})}
ROOMS.street={walk:[16,466,112,138],mood:'tense',amb:{crickets:.7,wind:.3,fire:.5,owl:.5},hs:[
  {name:"Eliab's door",x:28,y:42,w:32,h:60,wx:44,wy:113,look:"The door of Eliab's workshop.",exit:()=>go('workshop',34,116,1)},
  {name:'lit window',x:82,y:52,w:20,h:18,look:"Lamplight from Eliab's workshop. A small, brave light."},
  {name:'city gate',x:178,y:28,w:62,h:50,wx:208,wy:113,look:['The city gate. Torches burn there, and men keep watch day and night.','I will not be leaving Damascus by that road.']},
  {name:'well',x:170,y:66,w:38,h:44,wx:188,wy:114,look:'The neighborhood well. The water is cold and sweet.',use:'I would need something to carry the water in.',pickup:'A well stays where it is dug.',
    useWith:async it=>{if(it==='skin'){SFX.splash();F.water=1;delItem('skin');addItem('skinfull',1);await say(P,'I lower the bucket and fill my waterskin.')}
      else if(it==='skinfull')await say(P,'It is already full.');else return false}},
  {name:'brazier',x:239,y:92,w:17,h:20,wx:226,dir:1,look:"The soldier's brazier. A small comfort on a long, cold watch.",pickup:'It is hot. And it is not mine.',use:'I am warm enough from walking.'},
  {name:"merchant's stall",x:346,y:78,w:56,h:30,wx:372,wy:113,look:'Bundles of dyed wool in purple, blue and saffron. The night dew would ruin them.',pickup:'That would be stealing.'},
  {name:'torn awning',x:344,y:50,w:60,h:26,wx:366,wy:113,vis:()=>!F.awning,look:'The awning is split from pole to hem. It hangs in tatters from the frame.',
    pickup:'It is not mine to take. But perhaps it is mine to mend.',use:'It needs mending: a patch of cloth, thread, and an awl to drive the stitches.',useWith:mend},
  {name:'mended awning',x:404,y:50,w:56,h:64,wx:392,wy:114,vis:()=>F.awning,look:'My patch holds well. The awning hangs like a dark wall between the stall and the alley.',pickup:'The merchant needs it. And tonight, so do I.'},
  {name:'alley to the wall quarter',x:425,y:40,w:30,h:72,get wx(){return F.awning?440:398},wy:112,dir:1,look:"A narrow alley running toward the city wall. Naomi's house lies that way.",
    exit:async()=>{if(F.awning){await say(P,'Behind the awning the alley lies in shadow. Quietly, now...',{thought:1,color:'#cfe2ff'});await walk(P,440,112);return go('house',52,118,1)}
      SFX.alert();GD.dir=1;await say(GD,'Halt! The wall quarter is closed tonight. Orders of the governor.');
      await say(P,'As you say. Peace to you.');await walk(P,372,122);P.dir=1;
      await say(P,'He watches that alley closely. I must pass unseen, and without a quarrel.',{thought:1,color:'#cfe2ff'})}}]};
GD.hs={name:'the guard',actor:GD,look:'A soldier of the governor, posted to watch the alley. He looks cold, tired and thirsty.',
  talk:async()=>{if(F.kind)return say(GD,'Move along, tentmaker. ...And thank you for the water.');
    await say(P,'Peace to you. A cold night for a long watch.');
    await say(GD,'Cold, and dry. My waterskin was empty by the second watch, and I may not leave my post.');
    await say(GD,'Now move along. No one enters the wall quarter tonight.');return talkTree([{q:'Peace to you.',bye:1}],{quiet:1})},
  show:{pouch:'Tools? Keep them. I am not buying.',awl:'Put that away. It has been a long night.',thread:'I am a soldier, not a seamstress.',
    knife:'Put that blade away, tentmaker. Slowly.',cloth:'Cloth. Do I look as if I need cloth? I need a drink.',patch:'A rag. Keep it.',
    strips:'Rags. You are a strange one.',rope:'What would I want with rope?',longrope:'That is a lot of rope for one man. Move along.',
    basket:'Fill it at the market in the morning. Not here.',strongbasket:'A basket in a harness. Sell it in the morning.',
    straps:'Harness straps. Have you got a mule hidden somewhere?',skin:'Empty. Like mine. A fine pair we make.',
    tablets:'Writing? Write down that the night is cold and the guard is thirsty.',
    '*':'Move along, tentmaker. I am not trading.'},
  ask:{awning:'So I have heard, all evening. Let him mend it, and let me have some quiet.'},
  give:async it=>{if(it==='skin')return say(P,'An empty waterskin would be a poor gift.');if(it!=='skinfull')return false;
    await say(P,'You are thirsty. Here. It is fresh from the well.');SFX.splash();await wait(700);
    await say(GD,'...Most in this city curse us as they pass. Why would you do this?');
    await say(P,'If a man is thirsty, I give him something to drink. That is all.');
    await say(GD,'Hm. Then you have my thanks, stranger. I still cannot let you into the alley.');
    F.kind=1;F.water=0;delItem('skinfull');addItem('skin',1)}};
Z.hs={name:'the merchant',actor:Z,look:'A wool merchant, fretting over his stall.',
  give:async it=>{if(!MEND.includes(it)||F.awning)return false;await say(P,'He does not need my tools. His awning needs my hands.')},
  show:{pouch:"A tentmaker's pouch. I hope there is an awl in it.",awl:'The awl that saved my wool! Keep it sharp, friend.',thread:'Not one stitch has given. Good thread, that.',
    knife:'A fine blade. The wind cut my awning cleaner than that.',
    cloth:'Goat-hair cloth! A square of that would cover my tear twice over.',
    strips:'Ribbons? My awning wants a patch, friend, not ribbons.',
    rope:'Too short to hang anything from. I have tried.',
    longrope:'Now that is a rope. You could hang an awning across the whole street with it.',
    basket:'Those loops will not last the week. You want leather under a basket like that.',
    strongbasket:'My old straps, doing honest work again. I am glad of it.',
    straps:'They served my mule for ten years. May they serve you as well.',
    skin:'Empty? The well is just there.',
    skinfull:'Water. That soldier has been grumbling for a drink since the second watch.',
    tablets:()=>say(Z,F.awning?'Write it down, tentmaker: Zakkai owes you a debt.':'Write this down, then: one awning, torn from pole to hem.'),
    '*':'Not tonight, friend. My mind is on my wool.'},
  ask:{basket:'Leather is what you want for weight, not more reeds.',rope:'Every rope in this street is holding something up tonight. Mine included.',
    thirst:'So he keeps telling me. I sell wool, not water.'},
  talk:async()=>{if(F.awning){await say(Z,'A stitch like that will outlast the cloth! Go in peace, tentmaker.');return talkTree([{q:'Peace to you.',bye:1}],{quiet:1})}
    if(!F.metZakkai){F.metZakkai=1;await say(P,'Peace to you. You are at your stall late.');
      await say(Z,'Peace? The wind split my awning from pole to hem today!');
      await say(Z,'If I cannot hang it across to that wall, the night dew will ruin my dyed wool.');
      await say(P,'I am a tentmaker by trade. Perhaps I can be of use.');
      await say(Z,'Truly? I have no coin tonight... but mend it, and I will find some way to repay you.');
      await say(Z,'And mind that soldier. He has grumbled at my stall all night that his waterskin is empty.')}
    await talkTree([
      {q:'What does the awning need?',a:()=>say(Z,'A patch of strong cloth over the tear, and someone who sews straighter than I do.')},
      {q:'What do you know of the soldier?',a:async()=>{await say(Z,'Posted since sundown to watch the alley. He stops everyone who goes near it.');
        await say(Z,'He grumbles that his waterskin is empty. I keep my distance.')}},
      {q:'Peace to you.',bye:1}])}};
/* ---------- Naomi's upper room ---------- */
async function hangBasket(it){
  if(it==='basket')return say(P,'With those frayed loops? It would drop me at the foot of the wall. It must be reinforced first.');
  if(!F.ropeTied)return say(P,'First the rope must be anchored to something that will not give way.');
  SFX.creak();delItem('strongbasket');F.basketOn=1;await say(P,'The rope through both straps, and a double knot.');return checkFinal()}
async function shutters(){if(F.shutters)return say(P,'They are already open.');
  if(!F.lampOut){SFX.alert();await say(N,'Wait, brother! Not with the lamp burning.');
    return say(N,'A lit window high on the wall? The watchmen would see it at once.')}
  SFX.creak();F.shutters=1;await say(P,'Slowly... quietly. The night air is cold.');return checkFinal()}
async function checkFinal(){if(F.ropeTied&&F.basketOn&&F.shutters&&F.lampOut)return finale()}
ROOMS.house={walk:[24,300,112,138],mood:'calm',floor:'wood',amb:()=>F.shutters?{crickets:.6,wind:.5,owl:.3}:{crickets:.18,wind:.15,fire:F.lampOut?0:.2},
  enter:async()=>{if(F.inHouse)return;F.inHouse=1;await say(N,'Brother Saul! Come in, quickly. Jesse told me to expect you.');
    await say(N,'There is the window. Everything beyond it is outside the city.');
    await say(N,'The rope must be made fast and the basket ready before the others come.')},
  hs:[
  {name:'stairs to the alley',x:12,y:38,w:32,h:68,wx:32,wy:113,dir:-1,look:'Steps leading down to the alley.',exit:()=>go('street',440,114,-1)},
  {name:'sleeping mat',x:54,y:98,w:30,h:12,look:'A rolled sleeping mat. I will not be sleeping tonight.'},
  {name:'oil lamp',x:88,y:46,w:22,h:24,wx:100,wy:113,look:()=>say(P,F.lampOut?'The lamp is out. Moonlight will have to do.':'A lamp burning in a wall niche. Its light fills the room, and would shine from any open window.'),
    pickup:'Naomi will need it after I am gone.',
    use:async()=>{if(F.lampOut)return say(P,'Better to leave it dark.');SFX.snuff();F.lampOut=1;await say(P,'I pinch out the wick. Darkness. But our eyes will soon adjust.')}},
  {name:'table',x:116,y:86,w:48,h:24,look:'Bread and a cup, set out for a guest. Naomi has thought of everything.',pickup:'I have no appetite now. On the road I may regret that.'},
  {get name(){return F.shutters?'window':'shutters'},get def(){return F.shutters?'look':'open'},x:187,y:32,w:58,h:56,wx:216,wy:113,
    look:()=>say(P,F.shutters?'Open country, silver under the moon. And a long way down.':'Stout wooden shutters, barred from inside. Beyond them is the outer face of the city wall.'),
    open:shutters,use:shutters,
    useWith:async it=>{if(it==='basket'||it==='strongbasket')return hangBasket(it);
      if(it==='rope'||it==='longrope')return say(P,'The window frame is only wood and plaster. The rope needs a stronger anchor.');return false}},
  {name:'rope',x:210,y:28,w:12,h:58,wx:216,wy:113,vis:()=>F.ropeTied&&!F.basketOn,look:'Anchored to the beam. Now it needs something to carry me.',
    useWith:async it=>(it==='basket'||it==='strongbasket')?hangBasket(it):false},
  {name:'roof beam',x:176,y:16,w:80,h:14,wx:216,wy:113,look:'A thick cedar beam set deep into the stone. It has held this roof up for generations.',use:'I have no reason to hang from it myself.',
    useWith:async it=>{if(it==='rope')return say(P,'This rope would leave me dangling halfway down the wall. It must be much longer.');
      if(it!=='longrope')return false;
      SFX.creak();delItem('longrope');F.ropeTied=1;await say(P,'Twice around the beam, and a hitch that tightens under load.');await say(P,'It will hold.');return checkFinal()}},
  {name:'storage jars',x:276,y:92,w:36,h:20,look:'Oil, grain and lentils. A modest household, generously shared.'}]};
N.hs={name:'Naomi',actor:N,look:'Sister Naomi. A widow who has opened her home, and risked it, for the congregation.',
  show:{pouch:'Your tools, brother? Then there is still work to do.',awl:'Keep it close. You may need it before the night is out.',
    thread:'Good thread. Is anything still to be sewn?',knife:'Put it away, brother, unless something here truly needs cutting.',
    cloth:'Goat-hair cloth. It will not reach the ground as it is, brother.',patch:'A patch? Our trouble tonight is not a tear.',
    strips:'Strips of cloth... braided, they make a cord. My mother made them so.',
    rope:'That will not reach the ground. It will not reach halfway.',
    longrope:'That will reach. Tie it to something stronger than my window frame.',
    basket:'Those loops are worn through. I will not lower a brother in that.',
    strongbasket:'Now that is a basket I would trust with a brother.',
    straps:'Leather. Sewn under the basket, that would hold.',
    skin:'Empty, brother? The road to Jerusalem is long and dry.',skinfull:'Good. You will need it on the road.',
    tablets:'Keep them dry on the road, brother. Wax remembers what men forget.',
    '*':'No, brother. Keep what you have for the road.'},
  ask:{basket:'Then it must be made strong before it carries anyone out of my window.',rope:'Then it is no use to us. It is a long way down, brother.',
    thirst:'Then someone should give him a drink. Even a soldier is somebody\'s son.'},
  talk:()=>talkTree([
    {q:'Is it safe here?',a:async()=>{await say(N,'As safe as anywhere in Damascus tonight. The watchmen walk the wall above, but they look outward, toward the roads.');
      await say(N,'Only a light would draw their eyes down here.')}},
    {q:'How far is it to the ground?',a:()=>say(N,'Far enough that I do not like to look. A short rope will not do, brother.')},
    {q:'Where are the brothers?',a:()=>say(N,'Eliab and young Jesse are coming by the rooftops. They will be here when the basket is ready.')},
    {q:'Thank you for opening your home.',once:1,a:async()=>{await say(N,'You once came to this city to take us away in bonds. Now you are my brother.');await say(N,'Jehovah does such things.')}},
    {q:'I will make ready.',bye:1}])};
function setup(){place(E,'workshop',196,118,-1);place(GD,'street',270,118,1);place(Z,'street',328,116,-1);place(N,'house',172,120,-1);
  G.inv=['pouch','tablets'];drawInv()}
/* ============ SCENES: intro, finale, chapter complete ============ */
function wallScene(g,t){backdrop(g,'wall');const S=G.end||{};
  for(let i=0;i<6;i++)if((Math.floor(t/500)+i)%4===0)R(g,160+i*27,12+(i*17)%40,1,1,'#0a0f2e');
  if(S.heads){R(g,99,35.5,3,4,'#8a6a58');R(g,99,34.5,3,1.2,'#8a8a94');R(g,108,36.5,3,3.5,'#927058');R(g,108,35.5,3,1.2,'#2a1c18')}
  if(S.by!=null){stroke(g,[105.5,41,105.5,S.by-22],'#b89a5a',.8);miniBasket(g,105.5,S.by,S.rider)}
  if(S.px!=null){const x=hp(S.px),y=hp(S.py),f=Math.floor(t/160)%2;oval(g,x+1.5,y,4,1,'rgba(0,0,0,.4)');
    R(g,x,y-9,3,3,'#8f6a50');R(g,x-.5,y-10,4,1.4,'#1e1410');R(g,x+2,y-7.5,1,1.2,'#1e1410');R(g,x-1,y-6,5,4,'#4e3c36');R(g,x-1,y-6,1.5,4,'#3a2c2a');R(g,x+(f?0:1),y-2,1,2,'#7a5a46');R(g,x+(f?2:1),y-2,1,2,'#7a5a46')}}
async function start(){ov.onclick=null;ov.className='';audioInit();SFX.good();G.started=performance.now();setChapter(1);
  await cut(async()=>{await wait(500);
    await narr('Damascus, about 36 C.E.',{dur:2800});
    await narr('Saul of Tarsus, later known as the apostle Paul, once came to this city to arrest the disciples of Jesus.');
    await narr('Now he himself preaches in the synagogues that Jesus is the Son of God.');
    await narr('Opposers have plotted to do away with him. The governor under King Aretas guards the city, and the gates are watched day and night.');
    await narr('But tonight, the brothers have a plan.',{dur:2800});
    await fade(1,500);G.scene=null;enterRoom('workshop',58,118,1);await fade(0,500);
    await say(E,'Brother Saul! Come away from the door.');await walk(P,152,122);
    await say(E,"The gates are watched. But Sister Naomi's house stands on the city wall itself.");
    await say(E,'Tonight we lower you from her window. We need a basket that will hold, and a rope that will reach.');
    await say(E,'Mine will do neither as they are. But you are the tentmaker. Take whatever you need.');
    await say(P,'Then let us not be anxious. Jehovah gives wisdom, and he has given me a trade.')},true)}
async function finale(){AU.mood='calm';await wait(500);
  place(E,'house',30,116,1);place(J,'house',26,120,1);SFX.door();
  await Promise.all([walk(E,84,122),walk(J,58,126)]);P.dir=-1;N.dir=-1;
  await say(E,'The rooftops are clear. It is time, brother.');
  await say(J,'The watch on the wall has just passed. We have until they come around again.');
  N.dir=1;await say(N,'Take this bread for the road. Jerusalem is many days away.');N.dir=-1;
  await say(P,'Brothers, sister: you have risked everything for me. Before I go, let us pray.');
  const d=$('#dim');d.style.opacity=.5;[P,E,J,N].forEach(a=>a.bow=true);SFX.pray();await wait(900);
  await narr('Together they thank Jehovah, and ask him to guide the steps ahead.',{dur:4200,color:'#cfe2ff'});
  [P,E,J,N].forEach(a=>a.bow=false);d.style.opacity=0;await wait(500);
  await say(P,'I entered this city through its gate, with letters and proud plans. I leave it through a window, in a basket.');
  await say(E,'And with more brothers than you came with. Hold tight, Saul. We will not let go.');
  await walk(P,216,113);await fade(1,600);
  G.scene=wallScene;G.end={heads:1,by:46,rider:1};codeBtn();AU.mood='hope';AU.amb={crickets:.8,wind:.5};await fade(0,600);
  const creak=setInterval(()=>SFX.creak(),1300);
  const down=tween(11000,k=>{G.end.by=46+74*(k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2)});
  await narr('His disciples took him and let him down by night through an opening in the wall, lowering him in a basket. (Acts 9:25)',{dur:7500});
  await down;clearInterval(creak);await wait(600);
  G.end.rider=0;G.end.px=112;G.end.py=124;SFX.step();await wait(700);
  const off=tween(9000,k=>{G.end.px=112+150*k;G.end.py=124+6*Math.sin(k*3)-k*8});
  await narr("So Paul escaped the governor's hands: not by force, and not by a miracle, but by the courage of his brothers and trust in Jehovah. (2 Corinthians 11:32, 33)",{dur:8000});
  await off;G.end.px=null;G.end.heads=0;
  await narr('The road to Jerusalem lay ahead, and beyond it, many more.',{dur:3800});
  SFX.win();const s=Math.round((performance.now()-G.started)/1000);
  ov.className='on end';ov.innerHTML='<h2>CHAPTER COMPLETE</h2><h1 style="font-size:calc(var(--s)*12px)">Escape from Damascus</h1>'+
    '<p>Paul used the skill of his hands, accepted the help of his brothers, and relied on Jehovah.</p>'+
    `<p>Time: ${Math.floor(s/60)}m ${s%60}s &middot; Prayers for wisdom: ${G.prays}`+(F.kind?' &middot; Kindness shown to an opposer':'')+'</p>'+
    '<p class="small">Based on Acts 9:23-25 and 2 Corinthians 11:32, 33. Supporting characters and dialogue are imaginative; the event is from the Scriptures.</p>'+
    '<p class="go">Click to continue to Chapter Two</p><p class="small">Chapter Two code: '+codeOf(2,0)+'</p>';
  await wait(1500);ov.onclick=()=>startChapter(2);
  await new Promise(()=>{})}
/* ============ CHAPTER DEFINITION ============ */
return{rooms:['workshop','street','house'],setup,start,hint,music:MUSIC,scenes:{wall:wallScene},topics:TOPICS,tablets:TABLETS,
    flags:['gotAwl','gotThread','gotKnife','gotCloth','gotRope','gotSkin','gotBasket','cutCloth','longRope','metZakkai','kind',
      'awning','strong','inHouse','lampOut','shutters','ropeTied','basketOn','water'],
    ent:{workshop:[60,118,1],street:[46,114,1],house:[52,118,1]},
    inv(){const inv=['tablets'],add=(c,id)=>{if(c)inv.push(id)};
      add(!F.gotAwl,'pouch');add(F.gotAwl,'awl');add(F.gotThread,'thread');add(F.gotKnife,'knife');
      add(F.gotCloth&&!F.cutCloth,'cloth');add(F.cutCloth&&!F.awning,'patch');add(F.cutCloth&&!F.longRope,'strips');
      add(F.gotRope&&!F.longRope,'rope');add(F.longRope&&!F.ropeTied,'longrope');
      add(F.gotBasket&&!F.strong,'basket');add(F.awning&&!F.strong,'straps');add(F.strong&&!F.basketOn,'strongbasket');
      add(F.gotSkin,F.water?'skinfull':'skin');return inv}};
});
