/* Paul of Tarsus: level data for Chapter Five, "A Light of Nations".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   The road runs from Perga up through the Taurus to Antioch in Pisidia (Acts 13:13-52). The travel map (shared/map.js) leads from Perga
   to Antioch, through its northern window; on the way the road is cut by a river, and the chapter ends outside the boundaries of Antioch. */
LEVEL(5,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A walking tune in D Phrygian, the mode named after the country Antioch borders on: a lyre steps in even fours over a bass, a frame drum
   keeps the pace of a pack train, and a reed pipe carries the tune (mood "hope": the road, the square). In the synagogue (mood "calm")
   the drum drops to a heartbeat and a ney takes the tune in the second half. At the ford and before the opposers (mood "tense") only a
   drone, a slow drum and a few notes of the oud remain. */
const _=null,
 TUNE=[[[0,4,4],[4,5,2],[6,4,2],[8,3,4],[12,4,4]],[[0,2,4],[4,1,2],[6,0,2],[8,0,8]],[[0,0,2],[2,2,2],[4,3,4],[8,4,2],[10,5,2],[12,4,4]],[[0,3,4],[4,2,4],[8,1,8]],
  [[0,7,4],[4,6,2],[6,5,2],[8,4,4],[12,5,4]],[[0,4,4],[4,3,2],[6,2,2],[8,3,8]],[[0,2,2],[2,3,2],[4,4,2],[6,2,2],[8,1,4],[12,2,4]],[[0,1,4],[4,0,12]]],
 MUSIC={dt:.165,root:50,scale:[0,1,3,5,7,8,10],bars:16,tracks:[
  {inst:'lyre',moods:['hope','calm'],prog:'AABAACBA',len:3,seq:{A:[0,_,4,_,7,_,4,_,0,_,4,_,7,_,4,_],B:[1,_,5,_,8,_,5,_,1,_,5,_,8,_,5,_],C:[3,_,7,_,10,_,7,_,2,_,6,_,9,_,6,_]}},
  {inst:'bass',moods:['hope','calm'],prog:'AABAACBA',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_],C:[-4,_,_,_,_,_,_,_,-5,_,_,_,_,_,-6,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d.s.t.s.d.s.t.sk',B:'d.s.t.s.d.k.t.tk'}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.5},
  {drum:1,moods:['tense'],seq:{A:'d.....d.........'},vol:.8,group:[3,3,2]},
  {drone:[0,7],every:32,moods:['tense']},
  {inst:'oud',moods:['tense'],group:[3,3,2,2,2,4],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,1,_,_,_,_,_,0,_,_,_],B:[0,_,_,_,_,_,-1,_,_,_,1,_,_,_,_,_]},vol:.7},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
/* materials and light shared with every chapter (shared/materials.js, the standard of Chapter Fifteen's room of Gaius): quiet grain, two-tone
   cracks set by hand, contact shadows in three steps of alpha, and dyes and painted blues drawn a little toward earth and mineral colors */
const{plank:plank5,board:board5,crack:crack5,skipCracks:skipCracks5,shadow:shadow5,earth:earth5}=SHARED.materials;
const SH='#8f95c8',SKY5=c=>c.map(k=>earth5(k,.12)),TR5=earth5('#c0603c',.14),TD5=earth5('#a84c2c',.14),TL5=earth5('#e08a60',.14),TE5=earth5('#7a3620',.1),RT5=earth5('#b8603c',.14);
/* What is seen through the east gate of Antioch: the plateau, blue ranges round it, and the road running on. The gate adds the horizon and the sky of its scene. */
const GATE5={far:['#a9b4c8','#c2cad4'],near:['#a8a878','#b8b488'],land:'#cdc296',road:'#ead9ae'};
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* crag: a face of bare limestone inside the outline p: bedded, cracked, lit from the upper left. Each crack is cut in two tones, the dark of
   the cut and a lit lip beside it, and stops short of the next bedding line below it, so that no crack runs across a bed and none makes a
   cross with a bedding line (the random draws are all still taken, so the rest of the face keeps its place) */
function crag(g,p,c,r,o){o=o||{};let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
  clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.16),c,tint(c,-.22)]);g.fillRect(x0,y0,x1-x0,y1-y0);tex(g,'mott',.42,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'vert',.17,x0,y0,x1-x0,y1-y0,'overlay',.5);
    const sl=o.dip||0,beds=[];
    for(let j=y0+3+r()*4;j<y1;j+=4+r()*7){const q=[x0,j+(r()-.5)*3];beds.push(j);for(let x=x0+8;x<=x1+8;x+=8+r()*10)q.push(x,j+(x-x0)*sl+(r()-.5)*2.4);stroke(g,q,rgba('#2a2438',.22),.6);stroke(g,q.map((v,i)=>i%2?v+.7:v),rgba('#fff6e0',.14),.5)}
    for(let k=0;k<(x1-x0)*(y1-y0)/420;k++){let qx=x0+r()*(x1-x0),qy=y0+r()*(y1-y0)*.8;let nb=1e9,pb=-1e9;for(const j of beds){const b=j+(qx-x0)*sl;if(b>qy&&b<nb)nb=b;if(b<=qy&&b>pb)pb=b}qy=Math.max(qy,pb+2.8);const q=[qx,qy];let on=qy<nb-4;
      for(let s=0;s<3+r()*4;s++){const px=qx,py=qy;qx+=(r()-.5)*4;qy+=2+r()*5;if(!on)continue;if(qy>nb-2.8){const f=(nb-2.8-py)/(qy-py);if(f>0)q.push(px+(qx-px)*f,nb-2.8);on=false}else q.push(qx,qy)}
      if(q.length>3){stroke(g,q,rgba('#1e1a2c',.3),.5);stroke(g,q.map((v,i)=>i%2?v:v+.5),rgba('#fff6e0',.13),.5)}}
    if(o.shade)ao(g,x0,y0,x1-x0,y1-y0,o.shade,.3,'#2a2848')})}
/* rock: a boulder sitting on the ground at x,y */
function rock(g,x,y,w,h,c){shadow5(g,x+w*.1,y,w*.56,Math.max(1,h*.14),.4,'#1e1a32');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.36,x-w/2,y-h,w,h,'overlay',1);
    ao(g,x-w/2,y-Math.max(1.5,h*.22),w,Math.max(1.5,h*.22),'b',.28,'#1e1a32')})}
/* bundles: what the two men carry between them: two bed rolls and a bag. A bed roll lies on its side and shows one end, the one turned to the
   middle of the picture, and nothing is tied across it (clothRoll) */
function bundles(g,x,y){const near=x<200?1:-1;shadow5(g,x+12,y+.2,14,1.4,.42,'#281e30');
  for(const[dx,dy,w,hh,c]of[[0,-5,17,5,earth5('#8a5a4a',.1)],[4,-9.6,15,4.6,earth5('#6f7a5a',.1)]])clothRoll(g,x+dx,y+dy+hh,w,hh,c,{near,k:.32,face:.18,hi:1});
  shadow5(g,x+38,y+.2,6,1.2,.4,'#281e30');sack(g,x+27,y,4,7,'#cdbb8c');g.fillStyle=lg(g,x+33,0,x+44,0,['#3a302a','#2a211c','#17110e']);g.beginPath();g.ellipse(x+38.6,y-3.4,5.6,3.6,0,0,6.2832);g.fill();R(g,x+34,y-5,9,.6,'#8a7a5a')}
/* stoneGround: bare ground of rock and gravel between y0 and y1 */
function stoneGround(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.42,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.16,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.5);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.6+k*1.6;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.25));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.4,s*.3,'rgba(40,36,70,.25)')}}
/* ---------- Perga: the north road, outside the gate ---------- */
const taurus=x=>22+11*Math.sin(x/61+1.2)+5*Math.sin(x/23+.4)+2.4*Math.sin(x/8)-9*Math.exp(-Math.pow((x-388)/15,2));
ART.perga={w:480,fp:1.3,q:12,
 paint(g){const r=rng(331),ST='#d8c9a2';
  sky(g,480,72,SKY5(['#4583c8','#79aedc','#b4d0e4','#ece6c8']));cloud(g,170,10,58,7,r);cloud(g,318,20,40,5,r);cloud(g,450,9,36,5,r);
  /* the Taurus, a wall across the north, snow on its crest; the road climbs toward the notch of the pass */
  snowy(g,112,480,68,taurus,['#8f9ec4','#a9b6cc','#c6ccc8'],25);ridge(g,112,480,68,x=>9+4*Math.sin(x/37)+2*Math.sin(x/11+2)-5*Math.exp(-Math.pow((x-392)/18,2)),['#96a68a','#aab692']);
  comp(g,'screen',.34,()=>{g.fillStyle=lg(g,0,30,0,70,['rgba(236,226,196,0)','rgba(236,226,196,1)']);g.fillRect(112,30,368,40)});
  /* the plain of Pamphylia: fields, orchards, and the road across them */
  g.fillStyle=lg(g,0,66,0,104,['#b9bc84','#a8b472','#96aa62']);g.fillRect(112,66,368,38);tex(g,'mott',.38,112,66,368,38,'overlay',1);
  for(let i=0;i<9;i++){const fx=118+i*40+r()*12,fy=70+r()*8;poly(g,[fx,fy,fx+30,fy-1,fx+38,fy+9,fx+3,fy+11],i%3===0?'rgba(214,196,110,.4)':i%3===1?'rgba(96,140,70,.36)':'rgba(170,130,84,.3)')}
  poly(g,[452,104,480,104,480,96,430,84,404,74,394,68,391,68,398,74,420,85,440,96],'#e6d8b0');stroke(g,[452,104,440,96,420,85,398,74,391,68],'rgba(120,100,60,.4)',.5);
  for(const[x,y]of[[136,80],[160,88],[188,78],[216,86],[306,76],[332,84],[358,78],[250,74],[282,88],[380,90]]){oval(g,x+2,y+3.4,5.6,1.1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,5,3.2,'#6f8a58',r,22)}
  for(const[x,h]of[[232,12],[238,9],[346,11],[468,13],[474,9]])cypress(g,x,90,h);
  /* the wall of Perga and its north gate, a round tower beside it. Through the gate: a colonnade of the city, whose shaded back wall closes the view */
  ashlar(g,0,24,112,80,ST,r,{bw:13,bh:6.4,v:.09,t:.35});for(let i=0;i<86;i+=9){R(g,i,19.6,5.6,4.4,ST);R(g,i,19.6,5.6,.5,'#f4e8c8')}R(g,0,23.6,112,1,'#a8987a');
  g.fillStyle=lg(g,84,0,122,0,['#b8ab8a','#efe2bc','#dccfa8','#a39a84','#8a8478']);g.fillRect(84,12,38,92);inRect(g,84,12,38,92,()=>{for(let j=14;j<104;j+=6.4)R(g,84,j,38,.6,'rgba(70,56,40,.3)');
    for(let j=0;j<15;j++)for(let i=0;i<5;i++)R(g,87+i*8+(j%2)*4,14+j*6.4,.6,6.4,'rgba(70,56,40,.2)');tex(g,'mott',.32,84,12,38,92,'overlay',1)});
  for(let i=84;i<122;i+=8){R(g,i,7.6,5,4.4,'#e2d5b0');R(g,i,7.6,5,.5,'#f8eccc')}R(g,83,11.6,40,1.2,'#a8987a');windowArt(g,99,34,6,9,ST,{dark:'#241a16'});
  arch(g,26,50,44,54,'#c2b28c');g.save();arch(g,28,52,40,52);g.clip();sky(g,480,84,SKY5(['#6aa2dc','#cfe2ee']));R(g,28,60,40,33,'#8f8894');for(const x of[38.8,49.8])R(g,x,77,4,14.4,'#2a2430');R(g,28,93,40,11,'#d9d0bc');R(g,28,93,40,.6,'#efe8d6');
  for(const cxx of[33,44,55]){g.fillStyle=lg(g,cxx,0,cxx+4.6,0,['#d8d0bc','#fbf7ea','#c8c0b0']);g.fillRect(cxx,62,4.6,30);R(g,cxx-1,60,6.6,2,'#efe8d6');R(g,cxx-1,91,6.6,2,'#d8d0bc')}R(g,28,56,40,4,'#e6dec8');R(g,28,54.6,40,1.6,RT5);
  ao(g,28,52,40,11,'t',.55,'#2a2440');ao(g,28,52,6,52,'l',.5,'#2a2440');ao(g,64,52,4,52,'r',.35,'#2a2440');g.restore();
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,48+Math.cos(a)*22-.3,72+Math.sin(a)*22-1,.6,2.6,'#a8987a')}
  /* a low field wall along the road, with rings for tethering; the hole of each ring is a small square, so that it is no plus sign */
  ashlar(g,262,92,218,12,'#cdbf9c',r,{bw:9,bh:4,v:.1,t:.3});R(g,262,91,218,1.4,'#eadcb6');ao(g,262,92.4,218,2.4,'t',.16,'#4a4060');
  for(const x of[292,336,380]){oval(g,x,97.4,1.6,1.6,'#4a443c');R(g,x-.5,96.9,1,1,'#cdbf9c')}
  /* the watering trough, fed from a spout in a stone pier */
  shade(g,[196,105,254,105,262,111,204,111],SH,.5);g.fillStyle=lg(g,198,0,210,0,['#b8ae98','#eee6d0','#a8a090']);g.fillRect(198,72,12,32);R(g,196.6,70,14.8,2.6,'#f2ead6');R(g,196.6,72.4,14.8,.6,'#a8a094');
  R(g,203,84,5,3,'#7a7466');oval(g,205.5,85.6,1.3,1.3,'#2e2a26');
  g.fillStyle=lg(g,0,92,0,105,['#e6dcc4','#cfc4aa','#a89e88']);g.fillRect(196,92,56,13);R(g,195,91,58,2.2,'#f2ead6');R(g,195,93,58,.6,'#a8a094');R(g,198.6,93.6,50.8,1.8,'#5f9cc0');R(g,196,103.6,56,1.4,'#8a8272');
  /* a milestone where the road leaves the gate */
  shadow5(g,426,106.4,5.4,1.2,.44,'#322a5a');g.fillStyle=lg(g,421,0,428,0,['#b8b0a0','#f0eade','#a8a094']);g.fillRect(421,92,7,14);oval(g,424.5,92.2,3.5,1.6,'#f0eade');for(const y of[96,98.4,100.8])R(g,422.6,y,3.8,.6,'#8a8474');
  /* the road, paved as far as the trough */
  pave(g,0,103,480,144,'#d9caa2',r,{vx:230,vy:60,rows:5,step:36,v:.09});ao(g,0,103,119,5,'t',.3,'#4a3a60');
  comp(g,'soft-light',.55,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,236,190,0)','rgba(255,236,190,.95)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,122,104,138,112,0,114],SH,.6);shade(g,[262,104,480,104,480,108,268,108],SH,.4);
  /* a plane tree, the last deep shade before the climb */
  shade(g,[396,106,480,106,480,124,410,122],SH,.42);comp(g,'screen',.3,()=>{for(let i=0;i<26;i++)oval(g,404+r()*72,107.5+r()*14,1.4+r()*2.6,.5+r()*.7,'#fff0c8')});
  stroke(g,[461,104,460,84,463,66,459,50],'#6a5a48',4);stroke(g,[462,104,461.4,84,464.4,66,460.4,50],'#a8987e',1.2);stroke(g,[461,72,450,58,440,52],'#6a5a48',2);stroke(g,[462,64,472,52,478,46],'#6a5a48',2);
  foliage(g,452,40,30,14,'#5a8448',r,220);foliage(g,474,30,18,12,'#679252',r,110);foliage(g,430,50,16,8,'#4f7840',r,70);
  /* the shade gathers where the wall meets the tower, in the reveal of the gate and under the trough's lip */
  ao(g,72,24,12,80,'r',.2,'#3a3058');ao(g,26,50,6,54,'l',.16,'#3a3058');ao(g,196,95.4,56,3,'t',.22,'#3a3058');
  /* light: the morning sun from the left. The sky, the Taurus and the far plain keep the full day; the wall and its tower, the trough, the
     field wall and the open road take the sun in soft pools; the near road and the edges fall into the day's cool shade */
  lightmap(g,480,'#e0dce8',l=>{R(l,0,0,480,66,'#ffffff');R(l,112,66,368,22,'#ffffff');l.fillStyle=lg(l,0,88,0,104,['#ffffff','rgba(255,255,255,0)']);l.fillRect(112,88,368,16);
    l.fillStyle=lg(l,0,66,0,84,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,66,112,18);
    pool(l,44,62,84,46,'#fff8ee',.6);pool(l,104,46,26,58,'#fff4e2',.5);pool(l,226,98,48,14,'#fff6e8',.5);pool(l,360,98,110,10,'#fff4e4',.42);
    pool(l,240,122,270,24,'#fff2dc',.62);pool(l,120,118,70,12,'#f6e6cc',.3);
    comp(l,'multiply',1,()=>{pool(l,442,116,46,8,'#c4c0d6',.5,'source-over');ao(l,0,104,480,10,'b',.1,'#4a4468');ao(l,0,128,480,16,'b',.16,'#4a4468')})});
  pool(g,250,0,300,150,'#fff0c0',.12,'screen');ao(g,0,0,110,144,'l',.1,'#2a2050')},
 fore(g){const r=rng(332);/* oleander at the roadside, and a boulder */
  foliage(g,22,134,24,13,'#3f6a3c',r,170);for(let i=0;i<16;i++)oval(g,6+r()*36,124+r()*12,1.5,1.2,r()<.5?'#e88aa0':'#f4b0c0');
  rock(g,512,150,34,20,'#8a8478');for(let i=0;i<26;i++){const sx=460+r()*70;stroke(g,[sx,150,sx+(r()-.5)*5,138-r()*6],'#4f6c3a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){/* water running from the spout; the pack train at the wall; the bundles */
  const f=t/90;R(g,204.6,87,1.6,6,'#a8d8ec');for(let i=0;i<3;i++)R(g,204.6,87+((f+i*2.1)%6),1.6,1.2,'#f0fafe');
  for(let i=0;i<3;i++){const k=((t/420+i*.33)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(205.4,94.4,1.4+k*8,.3+k*.5,0,0,6.2832);g.stroke()}
  beast(g,300,109,-1,0,2);beast(g,344,108,1,0,2);beast(g,388,109.4,-1,0,2);bundles(g,126,108)},
 front(){}};
/* ---------- The ford: a river in the Taurus, where the road crosses it ---------- */
/* The river comes out at the foot of the cliff and runs toward us (RIV: its bed). NEAR and FAR: the tops of the two posts of the guide rope. */
const RIV=[230,60,248,60,254,69,257,78,263,91,269,104,274,116,279,129,285,144,193,144,198,131,201,117,205,104,213,91,221,78,226,69],NEAR=[193,99],FAR=[281,99];
ART.ford={w:480,fp:1.25,q:12,
 light:()=>({amb:'#e2e4f0'}),
 paint(g){const r=rng(347),LS='#b9b0a4',GR='#b4aa96';
  sky(g,480,46,SKY5(['#5088c8','#8fb8e0','#d0e0ea']));cloud(g,236,12,46,6,r);
  /* far peaks through the gap of the gorge */
  snowy(g,150,340,44,x=>16+12*Math.sin((x-150)/64*3.14)+4*Math.sin(x/9),['#a4b0cc','#c0c8d6'],19);comp(g,'screen',.3,()=>R(g,150,10,190,34,'#d0dcee'));
  /* the walls of the gorge: the cliff the river comes from, and a wall to either side */
  crag(g,[150,36,196,30,236,38,282,28,330,34,340,66,150,66],LS,r,{dip:.03});
  /* the floor of the gorge, running back to the foot of that cliff */
  stoneGround(g,150,62,190,106,tint(GR,-.14),r,110);ao(g,150,62,190,16,'t',.4,'#2a2848');
  crag(g,[0,0,150,0,166,10,172,30,160,52,176,74,168,104,0,104],tint(LS,-.08),r,{dip:.05,shade:'l'});
  crag(g,[330,0,480,0,480,104,316,104,304,80,318,56,308,30,322,10],tint(LS,.02),r,{dip:-.04,shade:'r'});
  shade(g,[0,0,150,0,166,10,172,30,160,52,176,74,168,104,0,104],'#a6a6bc',.42);
  /* the road beyond the ford, climbing the far wall to the pass */
  poly(g,[316,104,338,104,372,90,410,76,452,58,480,50,480,44,450,52,406,70,366,84,330,98],'#d6caac');stroke(g,[316,104,330,98,366,84,406,70,450,52,480,44],'rgba(60,50,80,.45)',.6);
  ao(g,316,44,164,60,'b',.16,'#2a2848');
  for(const[x,y,h]of[[18,34,20],[44,60,24],[70,26,17],[112,48,22],[138,84,18],[352,36,20],[386,58,16],[420,30,22],[456,82,19],[470,30,16]])pine(g,x,y,h);
  /* where the water breaks out under the cliff */
  poly(g,[224,64,228,50,236,46,246,48,254,64],'#1c1a26');poly(g,[229,64,232,54,238,51,245,54,250,64],'#dfeef2');
  /* the river bed */
  poly(g,RIV);g.fillStyle=lg(g,0,60,0,144,['#e8f4f4','#8fc4cc','#5a9cae','#3f7e98','#2f6684']);g.fill();
  clipTo(g,()=>poly(g,RIV),()=>{for(let i=0;i<150;i++){const k=r()*r(),sy=62+k*82,hw=10+k*36;R(g,239-hw+r()*hw*2,sy,2+k*7,.5+k*.4,r()<.6?'rgba(236,248,250,.6)':'rgba(20,56,80,.35)')}
    /* the ford itself: a shelf of shallow water, its stones just under the surface */
    comp(g,'screen',.3,()=>R(g,190,110,100,28,'#bfe6e6'));for(let i=0;i<22;i++)oval(g,202+r()*74,112+r()*24,2+r()*3,.8+r(),'rgba(96,120,120,.5)')});
  stroke(g,[226,69,221,78,213,91,205,104,201,117,198,131,193,144],'rgba(240,250,250,.7)',.8);stroke(g,[254,69,257,78,263,91,269,104,274,116,279,129,285,144],'rgba(240,250,250,.7)',.8);
  /* the banks: rock and gravel following the organic curve of the water's edge */
  clipTo(g,()=>{g.beginPath();g.moveTo(0,104);g.lineTo(205,104);g.lineTo(201,117);g.lineTo(198,131);g.lineTo(193,144);g.lineTo(0,144);g.closePath()},()=>stoneGround(g,0,104,207,144,GR,r,150));
  clipTo(g,()=>{g.beginPath();g.moveTo(269,104);g.lineTo(480,104);g.lineTo(480,144);g.lineTo(285,144);g.lineTo(279,129);g.lineTo(274,116);g.closePath()},()=>stoneGround(g,268,104,212,144,GR,r,150));
  /* water-smoothed cobbles and low bank scrub softening the shore */
  for(const[bx,by,bw,bh]of[[203,108,5,2.6],[198,121,6,3],[196,136,5.5,2.8],[271,109,5.5,2.8],[277,122,6,3],[283,137,5,2.6]])rock(g,bx,by,bw,bh,'#9a9284');
  for(const[tx,ty]of[[200,113],[194,129],[273,115],[281,132]])for(let i=0;i<4;i++)stroke(g,[tx+i*1.2,ty,tx+i*1.2+(r()-.5)*1.5,ty-2.5-r()*2],'#5a6e42',.55);
  poly(g,[0,112,150,110,196,116,192,132,0,136],'rgba(226,212,176,.4)');poly(g,[280,116,330,110,480,112,480,134,286,132],'rgba(226,212,176,.4)');
  ao(g,0,104,480,6,'t',.3,'#3a3460');shade(g,[0,104,170,104,186,116,0,122],SH,.5);
  /* the two posts of the guide rope, set in the rock */
  for(const[x]of[NEAR,FAR]){oval(g,x+2,110.4,5,1.3,'rgba(30,26,50,.4)');poly(g,[x-2.6,110,x-2,99,x+2,99,x+2.8,110],'#6a5238');poly(g,[x-2.6,110,x-2,99,x-.6,99,x-1,110],'#9a7c54');R(g,x-2,99,4,.6,'#b8986a');rock(g,x-6,111,7,4,'#9a9284');rock(g,x+6,111.4,6,3.4,'#8e8678')}
  rock(g,40,108,22,12,'#a8a092');rock(g,150,107,16,9,'#9c9486');rock(g,330,108,18,10,'#a39b8d');rock(g,444,107,24,13,'#a8a092');
  /* the shade gathers at the foot of each wall of the gorge and behind every boulder */
  ao(g,0,96,172,8,'b',.2,'#2a2848');ao(g,316,96,164,8,'b',.14,'#2a2848');
  /* light: the sun stands high over the right wall. The sky and the far peaks keep the full day; the cliff the river comes from, the right wall,
     the far bank and the shelf of the ford take the sun in soft pools; the left wall and the near bank lie in the gorge's cool shade */
  lightmap(g,480,'#d8d6e4',l=>{R(l,0,0,480,40,'#ffffff');l.fillStyle=lg(l,0,40,0,62,['#ffffff','rgba(255,255,255,0)']);l.fillRect(150,40,190,22);
    pool(l,240,50,110,26,'#fff8ec',.62);pool(l,406,46,110,74,'#fff4e2',.55);pool(l,396,122,120,20,'#fff2dc',.5);pool(l,239,122,64,24,'#f4f8fa',.42);
    pool(l,86,122,110,18,'#f0e8dc',.26);pool(l,239,86,30,30,'#f6f8fa',.3);
    comp(l,'multiply',1,()=>{ao(l,0,0,170,144,'l',.14,'#4a4468');ao(l,0,128,480,16,'b',.16,'#4a4468')})});
  pool(g,240,30,150,90,'#fff4d8',.14,'screen');ao(g,0,0,100,144,'l',.16,'#20203c');ao(g,400,0,80,144,'r',.1,'#20203c')},
 fore(g){rock(g,24,152,46,26,'#5c5868');rock(g,500,152,40,22,'#5c5868');pine(g,522,128,44,'#2a4034');comp(g,'source-atop',.42,()=>R(g,0,0,530,150,'#2c2a50'))},
 draw(g,t){/* the water, running toward us */
  g.save();poly(g,RIV);g.clip();for(let i=0;i<34;i++){const k=((t/1500+i*.137)%1),kk=k*k,sy=62+kk*82,hw=8+kk*38,sx=239+Math.sin(i*2.4)*hw*.9+Math.sin(t/300+i)*1.5;R(g,sx,sy,2+kk*6,.5+kk*.5,`rgba(240,250,252,${.75-k*.4})`)}
  for(let i=0;i<5;i++){const k=(t/260+i*1.3)%4;R(g,232+i*3.4,52+k*2.4,2,1.4,'rgba(255,255,255,.85)')}g.restore();
  pool(g,239,62,12+Math.sin(t/240),5,'#ffffff',.3,'screen');
  /* the guide rope: parted, then spliced and coiled at the near post, then carried over and made fast */
  const rope=(p,w)=>{stroke(g,p,'#2c241c',(w||1)+.8);stroke(g,p,'#7a664c',w||1)},W=G.wade;
  if(F.lineUp)rope([NEAR[0],NEAR[1]+.6,214,101.6,237,102.6,260,101.6,FAR[0],FAR[1]+.6]);
  else{if(W)rope([NEAR[0],NEAR[1]+.6,(NEAR[0]+W.x)/2,104+Math.min(8,(W.x-NEAR[0])*.08),W.x-3,W.y-23]);
    else if(F.spliced){rope([NEAR[0],NEAR[1]+.6,190,104,184,108.6]);for(let i=0;i<3;i++){g.strokeStyle=i%2?'#5a4a38':'#7a664c';g.lineWidth=1.6;g.beginPath();g.ellipse(180,110-i*1.3,5.6-i*.4,1.5,0,0,6.2832);g.stroke()}}
    else rope([NEAR[0],NEAR[1]+.6,196,105,200,110.6,207,113]);
    rope([FAR[0],FAR[1]+.6,278,106,274,112.6,270+Math.sin(t/260)*1.2,118,268+Math.sin(t/300)*1.6,124]);R(g,265,123.6,6,.8,'rgba(240,250,252,.8)')}
  /* the pack train: waiting on this bank, or safe on the other */
  const d=F.crossed?1:-1;beast(g,(F.crossed?372:84),108.6,1,0,2);beast(g,(F.crossed?414:44),109.4,d,0,2);if(!F.crossed)beast(g,124,108,1,0,2);else beast(g,452,108.4,1,0,2);
  depth(111,()=>bundles(g,F.crossed?332:134,111))},
 front(g,t){/* the river closes over the legs of a man who wades it */
  for(const a of[P,BN])if(a.room==='ford'&&a.x>199&&a.x<277){const d=Math.min(1,Math.min(a.x-199,277-a.x)/12),h=4+d*9;g.fillStyle=lg(g,0,a.y-h,0,a.y+1,['rgba(150,206,214,.7)','rgba(78,146,168,.94)']);g.fillRect(a.x-9,a.y-h,18,h+1.5);
    for(let i=0;i<3;i++)R(g,a.x-9+((t/80+i*7)%16),a.y-h+(i%2),4,.7,'rgba(245,252,252,.9)');R(g,a.x-10,a.y-h-.4,20,.8,'rgba(245,252,252,.55)')}}};
/* ---------- Antioch in Pisidia: the square between the wool market and the synagogue ---------- */
const sultan=x=>40+9*Math.sin(x/53+2)+5*Math.sin(x/19)+2.4*Math.sin(x/7+1);
ART.pisidia={w:480,fp:1.3,q:12,
 paint(g){const r=rng(367),rw=rng(371),LS='#e2d8c0',MB='#eee6d2',W='#e8dab4';
  sky(g,480,70,SKY5(['#3470c4','#629ad8','#9ec2e6','#d8e6ee']));cloud(g,96,9,54,7,r);cloud(g,262,16,46,6,r);cloud(g,420,8,40,6,r);
  /* the mountains north-east of the city, white half way down */
  snowy(g,0,480,62,sultan,['#93a2c8','#b2bcd0','#ccd0cc'],34);comp(g,'screen',.26,()=>R(g,0,6,480,58,'#d0dcee'));
  /* the street we came by, running down to the south gate. A house front stands across its far end, its roof at the level the paving runs to */
  R(g,0,40,58,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,30,58,74);g.clip();sky(g,480,80,SKY5(['#629ad8','#d8e6ee']));
  R(g,22,65,10,39,'#d6d0c2');R(g,22,63,10,2.4,RT5);R(g,22,72.4,10,1.6,'rgba(60,50,90,.2)');
  for(const[hx,hy,hw,hh,c]of[[0,44,16,60,'#d6caa8'],[40,50,18,54,'#e2d6b4'],[14,58,10,46,'#c8bc9c'],[30,62,10,42,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,RT5);R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[16,104,40,104,31,74,25,74],'#e0d6ba');ao(g,0,30,58,12,'t',.2,'#2a2440');g.restore();
  /* the wool market: a stoa with a tiled roof, shops in its shade */
  for(let i=58;i<246;i+=5.5){R(g,i,26,5,8,(i|0)%11?TR5:TD5);R(g,i,26,5,.7,TL5);R(g,i+4.5,26,.6,8,TE5)}
  g.fillStyle=lg(g,0,34,0,40.5,['#fdf8ea','#e8dfc8','#c4bca6']);g.fillRect(58,34,188,6.5);for(let i=60;i<246;i+=4)R(g,i,37.4,2,1.6,'#cfc6b0');
  plaster(g,58,40.5,188,63.5,'#b8ac92',r,{patch:3,cracks:0,brick:'#8a7a62',t:.3});skipCracks5(r,4);comp(g,'multiply',.75,()=>R(g,58,40.5,188,63.5,earth5('#a8a8cc',.2)));
  /* cracks cut by hand, high on the back wall of the stoa, where they run to no head (rc: a seed of their own) */
  {const rc=rng(377);for(const[x,y,n]of[[78,43.5,3],[214,44,3],[236,43,2]])crack5(g,x,y,n,rc)}ao(g,58,40.5,188,9,'t',.34,'#2a2440');
  for(let x=70;x<236;x+=56){R(g,x-2.5,53.5,25,50.5,'#8a8296');arch(g,x,56,20,48,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');ao(g,x,56,20,14,'t',.6)}
  for(let x=60;x<246;x+=28){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cbc2ac',MB,'#fffbee','#dbd2bc','#aaa4a0']);g.fillRect(x,42.5,7,59);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,44,.5,56,'rgba(120,112,104,.28)');R(g,x-1.2,40.5,9.4,2.6,MB);R(g,x-1.2,42.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#dfd6c0');R(g,x-1.2,100.4,9.4,.6,'#fffbee')}
  /* the wool stall: fleeces on the bar, bales beside the table, lengths of dyed cloth on it */
  /* the stall hangs a plain back cloth of undyed wool between its posts, so that no column of the stoa stands across its bar or its table;
     its folds run one way only, up and down */
  const backCloth=(x0,x1,y0,y1,c)=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,-.08)]);g.fillRect(x0,y0,x1-x0,y1-y0);
    inRect(g,x0,y0,x1-x0,y1-y0,()=>{tex(g,'vert',.22,x0,y0,x1-x0,y1-y0,'overlay',.5);for(let i=x0+2.5;i<x1;i+=5.5){R(g,i,y0,1.6,y1-y0,rgba(tint(c,-.3),.35));R(g,i+1.6,y0,.5,y1-y0,rgba(tint(c,.2),.3))}
      ao(g,x0,y0,x1-x0,6,'t',.4,'#1a1420');ao(g,x0,y1-8,x1-x0,8,'b',.3,'#1a1420')})};
  shade(g,[96,104,186,104,194,112,104,112],SH,.55);backCloth(100.4,181,51,104,earth5('#62564a',.1));
  board5(g,98,50,2.4,56,'#6a4e2c',rw,1);board5(g,181,50,2.4,56,'#6a4e2c',rw,1);board5(g,96,52.4,90,2,'#7a5c36',rw);awning(g,95,43,92,9,earth5('#8a3f3a',.16),'#e6dcc4',8);ao(g,96,54.4,90,4,'t',.3,'#1a1420');
  [108,121,134,147,160,172].forEach((x,i)=>{const c=i%3===0?'#efe8d8':i%3===1?'#d8ccb4':'#8a7a66';g.fillStyle=lg(g,x-4,0,x+5,0,[tint(c,-.25),c,tint(c,.2),tint(c,-.2)]);g.beginPath();g.ellipse(x+.5,62,4,7.6,0,0,6.2832);g.fill();
    for(let j=0;j<6;j++)oval(g,x-2+r()*5,56+r()*12,1.1,.8,tint(c,r()<.5?.25:-.18))});
  R(g,106,94,66,11,'rgba(40,30,60,.28)');ao(g,106,92.6,66,4,'t',.32,'#1a1420');shadow5(g,138,105.6,34,1.5,.4);
  board5(g,106.6,94,3,11.5,'#6a4e2c',rw,1);board5(g,166,94,3,11.5,'#6a4e2c',rw,1);board5(g,103.5,88,69,4.4,'#96703e',rw);R(g,103.5,92,69,1.2,'#5a4226');
  /* lengths of dyed cloth, rolled: each lies on its side and shows the end turned to the middle of the square (clothRoll) */
  ['#8a3f3a','#3f5a7a','#c9a23a','#5a7a5a','#6a3458'].forEach((c,i)=>{const sx=110+i*11.6;clothRoll(g,sx,88,9,5.4,earth5(c,.18),{near:1,k:.28,face:.2,hi:1})});
  shadow5(g,187,106.4,13,1.6,.36);sack(g,180,106,7.6,13,'#efe8d8');sack(g,192,107,6.6,11,'#e2d8c4');sack(g,186,97,6,8.6,'#d8ccb4');
  /* Joel's house: plaster and a blue door, a vine over it */
  house(g,246,22,88,82,W,r,{side:0,patch:3,cracks:0,beams:11,t:.36});skipCracks5(r,5);
  {const rc=rng(379);for(const[x,y,n]of[[251,31,3],[294,31,3],[329,45,3]])crack5(g,x,y,n,rc)}windowArt(g,258,36,11,12,W,{bars:2,wood:'#6a4e2c'});windowArt(g,312,36,11,12,W,{bars:2,wood:'#6a4e2c'});
  R(g,283,58,34,46,'#d8caa4');doorArt(g,286,61,28,43,earth5('#3f5a7a',.14),r,{bands:[]});ao(g,283,58,34,4,'t',.2,'#2a2440');R(g,282,102.6,36,1.6,'#e6dcc2');
  stroke(g,[318,104,319,84,317,66,321,54],'#5a4630',1.2);foliage(g,304,53,17,5,'#5f8a4a',r,60);foliage(g,322,60,5,9,'#527c40',r,26);
  /* the synagogue: dressed stone, two steps and a door */
  house(g,334,26,104,78,LS,r,{stone:{bw:12,bh:6,v:.07,t:.3},beams:0});windowArt(g,346,40,10,10,LS,{bars:2});windowArt(g,416,40,10,10,LS,{bars:2});
  R(g,364,52,44,5.4,'#f1e8d0');R(g,364,52,44,.6,'#fffbee');R(g,364,57,44,.8,'#a59c86');R(g,367,57.8,38,46.2,'#d2c7aa');doorArt(g,371,60,30,44,'#6a4a2c',r,{bands:[]});ao(g,367,57.8,38,4,'t',.24,'#2a2440');
  R(g,361,102,50,2.4,'#e6dcc2');R(g,361,102,50,.6,'#fffbee');R(g,357,104.2,58,2.6,'#dcd1b6');R(g,357,104.2,58,.6,'#fbf3dc');R(g,357,106.6,58,.8,'rgba(60,50,90,.4)');
  vessel(g,348,106,5.6,17,earth5('#a05a34',.1),'pithos');shade(g,[334,104,357,104,351,110,334,110],SH,.4);
  /* the east gate, and the road to Iconium */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48,{...GATE5,seed:5,hz:66,sky:[70,SKY5(['#3470c4','#629ad8','#9ec2e6','#d8e6ee'])]});ao(g,444,54,4,50,'l',.22,'#2a2440');for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#ddd4bc',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,58,103,422,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[58,104,246,104,252,108,64,108],SH,.4);shade(g,[433,104,438,104,452,110,440,110],SH,.6);shade(g,[0,104,58,104,58,107,0,110],SH,.5);
  /* the shade gathers where Joel's house meets the stoa and the synagogue, and where the synagogue meets the wall of the gate */
  ao(g,246,26,5,78,'l',.16,'#2a2440');ao(g,334,30,5,74,'l',.14,'#2a2440');ao(g,433,22,6,82,'r',.12,'#2a2440');
  /* light: the sun from the left and high. The sky and the mountains keep the full day; the stoa's roof and columns, Joel's house, the
     synagogue's front and the open square take the sun in soft pools; the stall under its awning and the stoa's back wall lie in the cool
     shade, and so does the near paving */
  lightmap(g,480,'#e0dce8',l=>{R(l,0,0,480,40,'#ffffff');l.fillStyle=lg(l,0,40,0,62,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,40,480,22);
    pool(l,150,36,110,12,'#fff8ee',.55);pool(l,290,58,56,46,'#fff8ee',.6);pool(l,386,62,62,44,'#fff6e8',.55);pool(l,458,62,26,44,'#fff4e2',.45);pool(l,28,70,34,34,'#fff4e2',.45);
    pool(l,240,120,280,24,'#fff2dc',.62);pool(l,150,72,90,30,'#f0e6d8',.2);
    comp(l,'multiply',1,()=>{ao(l,96,52,92,40,'t',.18,'#4a4468');ao(l,0,94,480,12,'b',.1,'#4a4468');ao(l,0,128,480,16,'b',.16,'#4a4468')})});
  pool(g,220,0,300,160,'#fff4d0',.12,'screen');ao(g,380,0,100,144,'r',.07,'#2a2050')},
 fore(g){const r=rng(368);/* bales of wool at the street's edge, and the base of a column */
  g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  sack(g,62,150,14,20,'#b8b0a0');sack(g,88,152,11,16,'#a8a090');vessel(g,508,152,10,28,'#5a2e1e','amph',{noShadow:1});sack(g,484,150,9,14,'#b0a898');
  comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){/* the drover's panniers of salt fish; in the week, the tentmaker's bench by Joel's door; on the next Sabbath, nearly all the city */
  for(const x of[204,220]){vessel(g,x,108,6,8,'#7a6038','bowl',{noShadow:1});for(let i=0;i<7;i++)oval(g,x-4+i*1.3,99.6+(i%2)*.6,1.7,.7,i%2?'#aab4bc':'#8a949c')}
  if(F.spoke1&&!F.out){const rb=rng(381);shadow5(g,269,106.2,15,1.4,.42);R(g,256,100,26,7,'rgba(40,30,60,.2)');board5(g,256.6,97,2.6,9,'#5a4226',rb,1);board5(g,279,97,2.6,9,'#5a4226',rb,1);board5(g,254,93.6,30,3.4,'#96703e',rb);R(g,254,96.6,30,.8,'#5a4226');
    g.fillStyle=lg(g,0,89,0,94,['#3e3229','#2a211c','#17110e']);g.fillRect(257,89.6,22,4);poly(g,[279,90,286,96,286,101,279,94],'#241c18');for(let i=0;i<22;i+=2.4)R(g,257+i,89.6,.5,4,'rgba(255,240,210,.08)')}
  if(G.crowd)CROWD.forEach(([id,x,y,d],i)=>man(g,x,y+((Math.floor(t/900)+i)%7===0?-.5:0),id,d,0,null,0,7))},
 front(){}};
/* ---------- Antioch in Pisidia: inside the synagogue ---------- */
ART.synp={w:320,q:12,
 light:()=>({amb:'#d6ccc4',lamps:[[98,54,44,'#5a3a14'],[222,54,44,'#5a3a14']]}),
 paint(g){const r=rng(383),rw=rng(389),ST='#d4c9ae',W='#dcd0b4';
  /* the wall, and the ends of the roof beams on the wall plate; the shade gathers beside each beam end and under the plate */
  ashlar(g,0,0,320,104,W,r,{bw:22,bh:9,v:.06,t:.3});ao(g,0,0,320,7,'t',.3,'#2a2030');
  for(let i=10;i<320;i+=30){ao(g,i-3,0,3,7,'r',.22,'#2a2030');ao(g,i+6,0,3,7,'l',.16,'#2a2030');board5(g,i,0,6,7,'#5a4226',rw,1)}
  board5(g,0,7,320,2.4,'#6a4e2c',rw);ao(g,0,9.4,320,12,'t',.42,'#2a2030');ao(g,0,9.4,320,3,'t',.24,'#1a1420');
  /* three high windows */
  for(const x of[58,153,248])windowArt(g,x,20,14,16,W,{dark:'#bfe0f4',bars:2,wood:'#6a4e2c'});
  /* two pilasters, a lamp on a bracket beside each */
  for(const x of[112,202]){ao(g,x-4,12,4,92,'r',.16,'#2a2030');ao(g,x+8,12,4,92,'l',.22,'#2a2030');g.fillStyle=lg(g,x,0,x+8,0,['#bdb39a','#f2ead2','#d8ceb4','#a49c88']);g.fillRect(x,12,8,92);
    R(g,x-1.4,10,10.8,3,'#f4ecd6');ao(g,x,13,8,3,'t',.24,'#2a2030');R(g,x-1.4,100,10.8,4,'#cfc5aa');R(g,x-1.4,100,10.8,.6,'#f4ecd6')}
  for(const x of[92,216]){poly(g,[x,58,x+12,58,x+12,59.6,x+9,63.4,x+3,63.4,x,59.6],'#bdb196');R(g,x,58,12,.6,'#f0e6cc');poly(g,[x+3,63.4,x+9,63.4,x+8,64.6,x+4,64.6],'#9a917c');
    R(g,x+3,55.6,6,2.4,'#b8733c');R(g,x+3,55.6,6,.6,'#e0a064');R(g,x+8.6,54.6,2,1.4,'#b8733c')}
  /* the chest of the scrolls. It is no part of the building: a chest that is carried in and put in position for worship (Insight,
     "Synagogue"). So it stands free on a low stand against the wall, a ring at either end to carry it by (square, so that no small round shape turns into a plus), and a blue cloth laid over its lid.
     Nothing crosses it: the planks run its whole length, the cloth covers its whole lid, and the stand has no rail between its legs. */
  shade(g,[29,104,65,104,72,109,36,109],SH,.5);R(g,31,84,33,20,'rgba(40,30,60,.16)');ao(g,31,87.6,33,5,'t',.3,'#1a1420');shadow5(g,47,104.2,17,1.4,.42);
  board5(g,33.6,87,3,17,'#5a4226',rw,1);board5(g,57.4,87,3,17,'#5a4226',rw,1);board5(g,31,84.6,32,3,'#7a5c36',rw);R(g,31,84.6,32,.6,'#b89460');R(g,31,87,32,.6,'#3e2c18');
  /* its planks run its whole length, each with a quiet grain that stops at its own joint */
  for(const[y0,y1]of[[68,73.6],[73.6,79],[79,84.6]])plank5(g,33,y0,28,y1-y0,tint('#7e5a30',(73.6-y0)*.014),rw);ao(g,33,79,28,5.6,'b',.22,'#1a1420');
  for(const y of[73.6,79])R(g,33,y,28,.6,'#3a2414');R(g,33,68,1,16.6,'#a88250');R(g,60,68,1,16.6,'#4a3220');
  for(const x of[36,55]){R(g,x-.5,75,4,3.5,'#3a2414');R(g,x,74.5,3,3,'#d8b860');R(g,x,74.5,3,.5,'#f0d890');R(g,x+1,75.5,1,1,'#5e4022')}
  poly(g,[31.4,71,31.8,66.6,35,64,47,63.2,59,64,62.2,66.6,62.6,71,58,70,52.6,71.4,47,70,41.4,71.4,36,70]);g.fillStyle=lg(g,0,63,0,71.4,['#6c8cae','#4a6a8c','#34506e']);g.fill();
  stroke(g,[32,66.6,35,64.2,47,63.5,59,64.2,62,66.6],'#9cb8d4',.6);
  /* benches of stone in two steps along the wall, where the people sit */
  const bench=(x,w,y)=>{ao(g,x,y-4,w,4,'b',.16,'#2a2030');R(g,x,y+3,w,104-y-3,'rgba(40,30,60,.25)');R(g,x,y,w,3.4,ST);R(g,x,y,w,.7,'#f0e6cc');R(g,x,y+3.4,w,104-y-3.4,'#b4a88c');
    inRect(g,x,y+3.4,w,104-y-3.4,()=>tex(g,'mott',.24,x,y+3.4,w,104-y-3.4,'overlay',1));R(g,x,y+3.4,w,1,'rgba(60,50,80,.35)');ao(g,x,y+3.4,w,3,'t',.22,'#2a2030')};
  bench(214,66,80);bench(206,74,90);
  /* the seats of the presiding officers, beside the chest and facing the people */
  /* the arms of the seats stand at their ends only, so that no post rises from the middle of the bench */
  R(g,72,71,38,18,'#d6cbb0');R(g,72,71,38,1,'#f4ead0');bench(70,42,88);for(const x of[70,108.6]){R(g,x,78,3.4,10,'#bdb196');R(g,x,78,3.4,.8,'#efe4c8')}
  /* the door to the square */
  R(g,283,50,30,54,'#cfc3a6');doorArt(g,286,53,24,51,'#6a4a2c',r,{bands:[]});ao(g,283,50,30,4,'t',.24,'#2a2030');
  /* stone flags, and the platform for the reading with its desk */
  pave(g,0,103,320,144,'#c4b89c',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  shadow5(g,166,108.6,50,2,.46,'#1e1428');poly(g,[124,98.6,208,98.6,214,103,118,103],'#a47a48');clipTo(g,()=>poly(g,[124,98.6,208,98.6,214,103,118,103]),()=>tex(g,'wood',.16,118,98,96,5,'overlay',.5));
  board5(g,118,103,96,5,'#8a6238',rw);R(g,118,103,96,.6,'#c89a5c');ao(g,118,103.6,96,2,'t',.2,'#1a1420');
  poly(g,[156,99,176,99,174,86,158,86],'#6a4a2c');R(g,156,97.6,20,1.4,'#4a3220');poly(g,[154.6,86,177.4,86,175.4,82.6,156.6,82.6],'#8a6238');R(g,156.6,82.6,18.8,.6,'#c89a5c');
  R(g,159.4,83.2,13.2,2.2,'#ecdcb0');R(g,158.2,82.8,1.8,3,'#8a5a2c');R(g,172,82.8,1.8,3,'#8a5a2c');
  /* daylight from the windows, lamplight from the brackets */
  /* light: the day through the three windows, each falling in a shaft to the floor; the two lamps, whose brackets keep their light from the
     wall above them, so that it spreads low and long and falls downward; and what the light reaches: the chest, the seats, the platform and
     its desk, the benches. The ceiling, the corners and the near floor lie in the room's own shade */
  lightmap(g,320,'#9a9088',l=>{for(const x of[65,160,255]){pool(l,x,28,24,24,'#fff4d8',1);l.fillStyle=lg(l,0,36,0,140,['rgba(255,240,200,.42)','rgba(255,240,200,0)']);poly(l,[x-7,36,x+7,36,x+(x<160?40:x>160?-24:22),140,x+(x<160?-14:x>160?-78:-22),140]);l.fill()}
    for(const x of[98,222]){pool(l,x,58,38,16,'#ffc070',.72);pool(l,x,80,42,13,'#ffb464',.34);pool(l,x,56,12,6,'#ffe0a0',.4)}pool(l,160,120,150,44,'#fff0d8',.4);
    pool(l,48,80,30,24,'#f4dcb4',.26);pool(l,90,84,26,16,'#ffcf90',.24);pool(l,166,92,30,14,'#ffe8c0',.3);pool(l,246,90,40,14,'#ffcf90',.22);
    comp(l,'multiply',1,()=>{ao(l,0,0,320,20,'t',.3,'#1a1030');ao(l,0,0,30,144,'l',.3,'#1a1030');ao(l,290,0,30,144,'r',.26,'#1a1030');ao(l,0,128,320,16,'b',.3,'#1a1030')})})},
 fore(g){/* the backs of the nearest bench */
  R(g,0,138,104,6,'#3a3028');R(g,0,138,104,.8,'#7a6a58');R(g,216,138,104,6,'#3a3028');R(g,216,138,104,.8,'#7a6a58')},
 draw(g,t){for(const x of[92,216]){flame(g,x+8.6,54.2,t+x*7);pool(g,x+9,52,8+Math.sin(t/190+x),6,'#ffb050',.14)}},
 front(){}};
/* ---------- Outside the boundaries of Antioch: the road to Iconium ---------- */
ART.border={w:320,q:12,
 paint(g){const r=rng(397);
  sky(g,320,84,SKY5(['#3a76c6','#70a4da','#b0cde8','#e4e8e0']));cloud(g,236,14,70,10,r);cloud(g,120,26,46,6,r);cloud(g,300,32,34,5,r);cloud(g,40,10,36,5,r);
  snowy(g,0,320,76,x=>20+10*Math.sin(x/47+4)+5*Math.sin(x/17)+2*Math.sin(x/6),['#97a6ca','#b6c0d2','#d0d4cc'],19);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,40,0,78,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(0,40,320,38)});
  /* Antioch behind us, on its rise: the wall, the east gate, the roofs */
  ridge(g,0,170,80,x=>Math.max(0,16-x*x/1500+1.6*Math.sin(x/9)),['#a8ac86','#b8b890']);
  /* the wall ends at the gate tower, so that no tower rises from the middle of a wall; beyond it the rise hides the rest (the wall's random
     draws are all still taken, so the rest of the picture keeps its place) */
  clipTo(g,()=>{g.beginPath();g.rect(0,40,92,40)},()=>ashlar(g,4,62,112,14,'#e2d6b8',r,{bw:9,bh:4,v:.07,t:.25}));for(let i=4;i<76;i+=7)R(g,i,59,4,3.4,'#e2d6b8');
  R(g,78,54,14,22,'#ece2c6');for(let i=78;i<92;i+=5)R(g,i,51,3,3.4,'#ece2c6');R(g,89,54,3,22,'#bcb8c0');arch(g,81.6,64,6.8,12,'#4a4050');ao(g,72,62,6,14,'r',.2,'#3a3058');
  for(const[hx,hy,hw,hh]of[[12,54,16,8],[36,50,18,12],[58,55,12,7]]){R(g,hx,hy,hw,hh,'#ece2c6');R(g,hx,hy-2,hw,2.2,RT5);R(g,hx+hw-3,hy,3,hh,'#bcb8c0')}
  /* the high plain in spring: fields and fallow, a line of poplars along a stream */
  g.fillStyle=lg(g,0,76,0,108,['#c8c08c','#cdbf7e','#c4b470']);g.fillRect(0,76,320,32);tex(g,'mott',.38,0,76,320,32,'overlay',1);
  for(let i=0;i<9;i++){const fx=r()*300,fy=79+r()*20;poly(g,[fx,fy,fx+34,fy-1.6,fx+42,fy+7,fx+4,fy+9],i%3===0?'rgba(150,120,70,.32)':i%3===1?'rgba(226,206,120,.4)':'rgba(120,150,84,.3)')}
  /* a meandering stream that comes out of the distance at the foot of the city's rise as a thread, widens as it nears and runs off at the
     right edge, lined with clustered organic poplars and scrub */
  stroke(g,[126,78.2,136,80.6,146,84,155,88.2,162,92.2],'rgba(116,168,198,.5)',.5);
  poly(g,[162,92,198,91.4,240,92.8,284,90.4,320,89.4,320,91.8,284,92.4,240,94.4,198,92.6,162,92.6],'rgba(116,168,198,.62)');
  stroke(g,[172,92,208,91.8,246,93.2,290,91,320,90.2],'rgba(214,238,246,.42)',.5);
  const poplars=[[198,92,14,'#537444',-.3],[207,91.5,19,'#4b6c3e',.2],[214,92.2,11,'#62824d',-.1],
    [232,93,17,'#567846',.3],[241,92.5,21,'#49683c',-.2],[249,93.2,13,'#648650',.15],
    [268,91.2,16,'#527242',-.25],[277,90.6,19,'#5d7e4a',.2],[288,90.2,12,'#4b6a3e',-.1],[302,89.8,15,'#5a7a48',.15]];
  for(const[tx,ty,th,tc,ln]of poplars){
    oval(g,tx+2.4,ty+.5,3.2+th*.08,.9,'rgba(52,58,74,.28)');
    stroke(g,[tx,ty,tx+ln*2.2,ty-th*.32],'#4a3a28',.9);
    for(let k=0;k<4;k++){const f=k/3,rx=Math.max(1.4,(3.6-f*2.1)*(th/16)),ry=th*.22;
      foliage(g,tx+ln*f*2.5+(r()-.5)*.8,ty-th*(.26+f*.58),rx,ry,tint(tc,(f-.4)*.14),r,12)}}
  for(const[bx,by,bw]of[[186,93,6],[222,93.2,7],[259,92.4,8],[295,91,7]])foliage(g,bx,by-1,bw,2.4,'#66844e',r,14);
  poly(g,[85,76,89,76,120,92,200,106,150,106,96,90],'#e4d6ae');
  /* the road, and the verge nearest us */
  g.fillStyle=lg(g,0,106,0,128,['#d6c69c','#e8dab2','#dccca2']);g.fillRect(0,106,320,22);tex(g,'mott',.32,0,106,320,22,'overlay',1);inRect(g,0,106,320,22,()=>tex(g,'wood',.12,0,106,320,22,'overlay',.5));R(g,0,106,320,.8,'#a89a74');
  /* the grit of the road: short flat dabs that run along it (no tiny ellipse, which would come out as a plus sign) */
  for(let i=0;i<60;i++){const sx=r()*320,sy=108+r()*18,w=1+r()*1.6,h=.5+r()*.4,c=r()<.5?'#bcae86':'#f0e4c0';R(g,sx-w,sy-h/2,w*2,Math.max(.5,h),c)}
  for(let i=0;i<2;i++)stroke(g,[0,114+i*7,100,113.6+i*7,220,114.6+i*7,320,114+i*7],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,127,0,144,['#a8a868','#909a58','#788648']);g.fillRect(0,127,320,17);tex(g,'mott',.38,0,127,320,17,'overlay',1);inRect(g,0,127,320,17,()=>tex(g,'vert',.14,0,127,320,17,'overlay',.5));
  for(let i=0;i<200;i++){const sx=r()*320,sy=128+r()*16;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#c8c080':'#6a7a44',.5)}
  /* the boundary stone of the city */
  /* its weathering lies on the stone only, and the shade gathers at its foot */
  shadow5(g,104,108.2,8.4,1.6,.46,'#322a5a');g.fillStyle=lg(g,97,0,109,0,['#aaa294','#ece6d8','#d0c8b8','#928a7e']);g.fillRect(97,90,12,18);g.beginPath();g.ellipse(103,90.2,6,3,0,Math.PI,0);g.fill();
  for(const y of[93.6,96,98.4])R(g,99.6,y,6.8,.6,'#8a8474');clipTo(g,()=>{g.beginPath();g.rect(97,90,12,18);g.ellipse(103,90.2,6,3,0,Math.PI,0)},()=>{tex(g,'mott',.32,96,86,14,22,'overlay',1);ao(g,97,103,12,5,'b',.22,'#3a3058')});
  shade(g,[108,108,112,108,126,112,116,112],SH,.5);
  /* light: the afternoon sun. The sky, the mountains and the far plain keep the full day; the city on its rise, the poplars and the road
     take the sun in soft pools; two cloud shadows lie on the plain, and the near verge falls into the cool shade */
  lightmap(g,320,'#e2dee8',l=>{R(l,0,0,320,78,'#ffffff');l.fillStyle=lg(l,0,78,0,96,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,78,320,18);
    pool(l,60,66,60,16,'#fff8ee',.55);pool(l,250,86,80,14,'#fff6e8',.45);pool(l,160,116,200,14,'#fff2dc',.68);pool(l,104,100,20,12,'#fff6e8',.4);
    comp(l,'multiply',1,()=>{pool(l,214,96,40,4.6,'#bcbccc',.5,'source-over');pool(l,52,100,30,4,'#c0c0d2',.4,'source-over');ao(l,0,128,320,16,'b',.18,'#4a4468')})});
  pool(g,220,10,240,140,'#fff4d0',.12,'screen')},
 fore(g){const r=rng(398);rock(g,18,150,30,15,'#8a8478');for(let i=0;i<34;i++){const sx=r()*320;stroke(g,[sx,150,sx+(r()-.5)*5,137-r()*7],r()<.5?'#6a7a44':'#8a8a50',.8)}
  comp(g,'source-atop',.34,()=>R(g,0,0,320,150,'#34305a'))},
 draw(g){bundles(g,262,112);/* an attendant of the men who brought them out, standing by until they are gone */
  man(g,48,121,'guard5',1,0,null,0,7)},
 front(g,t){/* the dust of the road, shaken from their feet */
  if(G.dust)for(const a of[P,BN])for(let i=0;i<7;i++){const k=((t/700+i*.143)%1);pool(g,a.x-6+i*2+Math.sin(i*3)*3,a.y-2-k*9,2.4+k*4,1.2+k*2,'#b89a68',.7*(1-k),'source-over')}}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#58483a',beard:'#58483a',grey:'#8a8076',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  mark:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#8aa08a',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',slim:1,ph:900},
  /* a drover of the mountain road: a felt cap, a short tunic the color of the dust */
  papias:{skin:'#9a6238',wrap:'#7a5a3a',beard:'#2a1a12',tunic:'#a8763e',belt:'#2e2016',trim:'#6a4a26',brow:'#1a1210',ph:1500},
  /* a Greek of Antioch: clean-shaven and bareheaded, a pale tunic and a sea-green mantle */
  eumenes:{skin:'#c89a70',hair:'#4a3420',brow:'#3a2616',tunic:'#e2dccb',cloak:'#3f6a6a',long:1,belt:'#5a3a20',trim:'#8a8270',ph:2300},
  joel:{skin:'#b8845a',wrap:'#d8cdb0',beard:'#3a2a1a',brow:'#2a1a12',tunic:'#b08a3e',cloak:'#46557a',long:1,belt:'#4a3a24',trim:'#7a5a22',ph:3300},
  hanan:{skin:'#b47e52',wrap:'#efe8d8',beard:'#b8b8b8',longBeard:1,brow:'#7a7a7a',tunic:'#6a2f3a',cloak:'#e2d8c0',long:1,belt:'#c9a23a',trim:'#c9a23a',ph:2700},
  ammia:{skin:'#d0a27a',veil:'#e6dcec',tunic:'#6a4a8a',long:1,belt:'#c9a23a',slim:1,longSleeve:1,trim:'#c9a23a',brow:'#3a2414',ph:900},
  straton:{skin:'#c69870',hair:'#8a8a8a',beard:'#9a9a9a',brow:'#5a5a5a',tunic:'#efe9da',cloak:'#8a3a2e',long:1,belt:'#8a6a2a',trim:'#8a6a2a',ph:1900},
  /* an attendant of the principal men: he carries no weapon */
  guard5:{skin:'#b0784a',hair:'#2a1a12',tunic:'#8a8a7a',belt:'#3a2414',trim:'#5a5a4a',brow:'#1a1210',ph:0},
  /* the people of the city, seen on the second Sabbath */
  town1:{skin:'#c49064',hair:'#3a2616',beard:'#3a2616',tunic:'#c07a3a',belt:'#3a2414',ph:0},
  town2:{skin:'#b8845a',hair:'#2a1a12',tunic:'#7a8a9a',cloak:'#c8b890',long:1,belt:'#4a3a24',ph:0},
  town3:{skin:'#c89a70',veil:'#a8503a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},
  town4:{skin:'#a8703f',wrap:'#3f6a8a',beard:'#5a5a5a',tunic:'#8a7a5a',belt:'#2e2016',ph:0},
  town5:{skin:'#c08c5c',hair:'#6a5a4a',tunic:'#e2dccb',cloak:'#7a3434',long:1,belt:'#4a3a24',ph:0},
  town6:{skin:'#c49268',veil:'#5a7a5a',tunic:'#4f7480',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},
  town7:{skin:'#b47e54',hair:'#8e8a84',beard:'#9c9890',tunic:'#9a8c72',cloak:'#5a6448',long:1,belt:'#4a3a24',ph:0},
  town8:{skin:'#cc9e74',veil:'#c8a862',tunic:'#7c5048',long:1,belt:'#5a3a24',slim:1,longSleeve:1,ph:0},
  town9:{skin:'#b88052',hair:'#261810',tunic:'#6c7a56',belt:'#3a2414',slim:1,ph:0},
  town10:{skin:'#c29064',wrap:'#b8986c',beard:'#3a2818',tunic:'#c8b48a',cloak:'#485c74',long:1,belt:'#4a3a24',ph:0},
  town11:{skin:'#ca9a72',veil:'#6a5478',tunic:'#e4dac2',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},
  town12:{skin:'#aa7448',hair:'#4a3828',beard:'#4a3828',tunic:'#a46040',cloak:'#c8bc9e',long:1,belt:'#3a2414',ph:0}});
/* CROWD: the people who fill the square on the second Sabbath: varied looks, organic clustering, sorted back-to-front by y */
const CROWD=[
  ['town4',144,107.2,1],['town11',157,111.0,1],['town7',168,106.8,1],['town9',178,112.2,1],
  ['town3',190,108.0,1],['town12',202,111.6,1],['town6',213,106.6,1],['town1',223,112.4,1],
  ['town10',236,107.6,1],['town8',248,111.8,1],['town2',259,106.8,1],['town5',271,111.2,1],
  ['town4',282,107.8,1],['town11',293,112.0,1],['town9',306,106.8,1],['town7',318,110.4,1],
  ['town3',329,107.2,1],['town12',340,111.4,1],['town6',351,106.8,1],['town10',362,110.2,1]
].sort((a,b)=>a[2]-b[2]);
const BN=actor('barnabas','Barnabas','#f0b070',128),MK=actor('mark','john_mark','#b8e0b0',176),PA=actor('papias','Papias','#f0b088',112),EU=actor('eumenes','Eumenes','#a8e0d8',140),
  JO=actor('joel','Joel','#e8d890',120),HA=actor('hanan','Hanan','#e8c0c8',98),AM=actor('ammia','Ammia','#e0c8f0',196),SN=actor('straton','Straton','#f0d0b0',104);
Object.assign(ICON,{
  thong(g){stroke(g,[4,7,8,5,13,7.4,18,5.6,20.4,8,17,12,11,11,6,13.6,4.4,17,8,19.6,14,18,19.6,19.4],'#3a2414',3);stroke(g,[4,7,8,5,13,7.4,18,5.6,20.4,8,17,12,11,11,6,13.6,4.4,17,8,19.6,14,18,19.6,19.4],'#a8703c',1.6);
    stroke(g,[4.4,6.6,8,4.6,13,7,18,5.2],'#d09a5e',.5)},
  bread(g){g.fillStyle=lg(g,0,7,0,17,['#e8c078','#c9a060','#8a6630']);g.beginPath();g.ellipse(10.4,12,7.8,4.8,0,0,6.2832);g.fill();for(const x of[7,10.4,13.8])stroke(g,[x-1,10.2,x+1,13.6],'#8a6630',.7);
    for(const[x,y]of[[16,17.4],[19,15.6],[18.6,19.2]]){oval(g,x,y,2,1.7,'#5a3458');oval(g,x-.5,y-.5,.7,.6,'#8a5a86')}},
  roof(g){IH.square(g,'#423832',3.6,7,16.8,11);g.strokeStyle='#b8a682';g.lineWidth=1;g.strokeRect(3.6,7,16.8,11);
    for(const[x,y]of[[2.4,5.8],[19.2,5.8],[2.4,16.8],[19.2,16.8]]){g.strokeStyle='#dcd0aa';g.lineWidth=.9;g.beginPath();g.arc(x+1.2,y+1.2,1.6,0,6.2832);g.stroke()}R(g,3.6,12,16.8,.8,'#6e5e50')},
  line(g){IH.coil(g,['#7a6852','#9c866a','#7a6852','#a89274'],12,8.4,7.4,2.6,2.7);stroke(g,[18.6,17,21,19,21.6,21.6],'#9c866a',1.4)}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#462e16',3);stroke(g,[4.6,20.6,19,3.6],'#8c683c',2);stroke(g,[4.1,20.1,18.5,3.1],'#e2c288',.9);
  R(g,17.2,2.8,3,3,'#c49a5c');R(g,17.4,2.8,1.8,1.2,'#f2d8a2');R(g,3.3,19.7,2.4,2.4,'#9c968c');R(g,3.5,19.7,1.2,1,'#d4cec4')};
Object.assign(ITEMS,{
  staff5:{name:'barnabass_staff',icon:'staff',look:'barnabass_walking_staff_stout_olive_wood_it',
    by:{barnabas:'my_walking_staff_on'}},
  bread:{name:'bread_and_figs',look:'food_bag_flat_loaves_and_dried_figs',
    by:{barnabas:'bread_and_figs_said'}},
  thong:{name:'leather_thong',look:'long_thong_of_ox_hide_supple',
    by:{barnabas:'strip_of_ox_hide'}},
  roof:{name:'tent_roof',look:'roof_i_sewed_for_a_ships',
    by:{barnabas:'roof_paul_sewed_at_seleucia'}},
  line:{name:'tarred_rope',look:'rope_out_of_the_edge_of_our_roof',
    by:{barnabas:'rope_out_of_our_roof'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup5) */
const BY5={awl:'tentmakers_awl_said',thread:'waxed_linen_thread_and_strong',
  knife:'knife_for_cloth_and_leather',tablets:'his_wax_tablets_people'};
const inPerga=()=>G.room==='perga',inFord=()=>G.room==='ford',inAnt=()=>G.room==='pisidia'||G.room==='synp',inOut=()=>G.room==='border',
  week=()=>!!F.spoke1&&!F.out,allThree=()=>!!(F.eum&&F.joel&&F.pap),other=()=>PC()===P?BN:P;
/* toPaul: something handed to Paul, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function dropAll(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* The rope sewn into the edge of the roof at Seleucia comes out again, stitch by stitch, at the ford. */
async function unpick(){
  if(!inFord())return say(P,'take_our_roof_to_pieces');
  SFX.cut();await say(P,'stitch_by_stitch_the_way');SFX.cut();await wait(700);
  delItem('roof');addItem('line',1);F.gotLine=1;SFX.good();
  await say(P,'out_it_comes_tarred_sound')}
/* The parted guide rope is made whole with a long splice, the awl opening the strands. */
async function splice(){
  SFX.sew();await say(P,'awl_to_open_the_strands');SFX.sew();await wait(800);
  delItem('line');F.spliced=1;SFX.good();
  await say(P,'long_splice');
  await say(P,'long_enough_to_reach_the_far',TH)}
const needRope=()=>say(P,'rope_needs_joining_to_the_half');
Object.assign(COMBO,{
  'knife+roof':unpick,'awl+roof':unpick,'roof+thread':()=>say(P,'it_needs_no_mending'),
  'awl+line':needRope,'line+thread':needRope,'knife+line':()=>say(P,'cut_it_i'),
  'awl+thong':()=>say(P,'thong_needs_a_sandal_to_go_into_and_the'),'thong+thread':()=>say(P,'thong_needs_a_sandal_to_go_into_and_the'),
  'knife+thong':()=>say(P,'it_is_the_right_length'),
  'bread+knife':()=>say(P,'i_will_break_the_bread'),'line+roof':()=>say(P,'i_have_only_just_parted_them'),
  'line+thong':()=>say(P,'leather_to_rope'),'roof+thong':()=>say(P,'roof_has_loops_enough')});
/* ENT: where Paul stands when a room is entered by a code. At the ford that depends on the bank he has reached; in Antioch, on the week. */
const ENT={perga:[176,124,1],get ford(){return F.crossed?[344,124,1]:[150,124,1]},get pisidia(){return week()?[268,113,-1]:[120,124,1]},synp:[264,122,-1],border:[236,124,-1]};
/* place5: put everyone where the story has them, for the room the two men are in. They travel together, except across the river. */
function place5(room){const o=other(),e=ENT[room];for(const a of[MK,PA,EU,JO,HA,AM,SN])a.room=null;
  if(room!=='ford')place(o,room,e[0]-e[2]*26,e[1]+2,e[2]);
  if(room==='perga'){place(MK,room,...(F.markTold?[84,121,1]:[112,120,1]));place(PA,room,262,117,-1);place(EU,room,420,120,-1)}
  else if(room==='ford'){const far=!!F.crossed;place(PA,room,far?404:100,119,1);place(EU,room,far?438:62,123,1);
    place(BN,room,far||F.lineUp?310:124,far||F.lineUp?123:126,F.lineUp&&!far?-1:1);if(o===P)place(P,room,...e)}
  else if(room==='pisidia'){place(EU,room,140,118,1);place(PA,room,228,119,-1);if(week())place(JO,room,318,119,-1)}
  else if(room==='synp'){place(HA,room,92,114,1);place(JO,room,218,116,-1);place(AM,room,240,112,-1);place(EU,room,308,134,-1)}
  else if(room==='border'){place(SN,room,72,119,1);place(PA,room,138,128,1);place(EU,room,166,122,1);place(JO,room,194,118,1)}}
function setup5(){BN.hs=BN5;P.hs=PAUL5;P.called='Paul';Object.assign(BN,BARN5);BN.speed=0;BN.free=false;for(const id in BY5)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY5[id];
  G.wade=null;G.crowd=0;G.dust=0;place5('perga');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,barnabas:['staff5']};drawInv()}
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const BARN5={noCraft:'that_is_the_tentmakers_trade_not_mine',
  def:{look:'i_see_nothing_there_that_needs_me',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_the_tentmakers_trade_not_mine_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
/* go5: through a door. The two men keep together, so the other follows. */
async function go5(room,x,y,dir){SFX.door();await fade(1);enterRoom(room,x,y,dir);place5(room);place(other(),room,x-dir*26,y+3,dir);await fade(0)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line] pairs. */
/* ask: someone asks, and the player answers from opts; k: the key to mix an answer by when its line is put together from parts (choose) */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q),{by:av.map(o=>o.k||o.q)})];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1]):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* mendSandal: Barnabas's strap, parted on the roads of Cyprus, gets a new thong before the climb. */
async function mendSandal(it){if(!inPerga()||F.shod||!['thong','awl','thread'].includes(it))return false;
  const his=invOf(BN),i=his.indexOf('thong');if(i>=0){his.splice(i,1);toPaul('thong',1);await say(BN,'you_will_want_this_back_paul')}
  if(!has('thong'))return say(P,'strap_has_parted_where');
  await say(P,'sit_on_the_edge_of_the_trough');
  await Promise.all([walk(BN,236,112),walk(P,214,116)]);BN.dir=-1;P.dir=1;BN.bow=true;
  SFX.sew();await say(P,'old_strap_out_the_new_thong');SFX.sew();await wait(700);
  BN.bow=false;delItem('thong');F.shod=1;SFX.good();
  await say(BN,'it_grips_like_a_new_one');
  await say(P,'tentmaker_works_in_leather')}
/* Paul, as Barnabas sees him and talks to him */
const PAUL5={name:'Paul',actor:P,as:{barnabas:{
  look:()=>say(BN,inPerga()?'paul_he':inFord()?'paul_give'
    :inOut()?'paul_put':'paul_the'),
  give:async it=>{if(it!=='thong')return false;const inv=invOf(BN),i=inv.indexOf('thong');if(i>=0)inv.splice(i,1);toPaul('thong');return say(BN,'take_this_paul')},
  talk:()=>talkTree([
    {q:'what_can_i_do_to_help',a:()=>say(P,inPerga()?(!F.metPap?'ask_the_drover_about_the_road':!F.markTold?'speak_to_your_cousin'
        :!F.shod?'sit_down_and_let_me_see':'nothing_more_the')
      :inFord()?(!F.spliced?'keep_the_others_calm_while':!F.lineUp?'carry_the_end_across_for_me':!F.crossed?'stay_where_you_are_and_watch':'lead_the_way_up_to_the_pass')
      :inOut()?(!F.cheered?'stand_with_me_while_i_speak':'nothing_more_there')
      :(!F.spoke1?'sit_beside_me_and_wait':!F.joel?'talk_to_joel':!allThree()?'pray_for_me_brother':'stand_beside_me_on_the_sabbath'))},
    {q:'they_listen_to_you_now',once:1,a:async()=>{await say(P,'does_that_trouble_you_barnabas');await say(BN,'trouble_me')}},
    {q:'i_will_leave_you_to_it',bye:1}]),
  show:{staff5:()=>say(P,inFord()&&F.spliced&&!F.lineUp?'your_staff_said':'keep_your_staff_by_you_barnabas_that'),'*':'keep_it_by_you_barnabas'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'road',q:'they_say_no_one_climbs',if:()=>inPerga()&&F.metPap},
  {id:'sandal',q:'barnabass_sandal_strap_has_parted',if:()=>inPerga()&&!F.shod},
  {id:'mark',q:'john_mark_has_gone_back_to_jerusalem',if:()=>F.markTold&&!inPerga()&&!inOut()},
  {id:'rope',q:'guide_rope_at_the_ford_has_parted',if:()=>inFord()&&!F.lineUp},
  {id:'sabbath',q:'how_does_a_visitor_come',if:()=>inAnt()&&!F.spoke1},
  {id:'again',q:'they_have_asked_us_to_speak',if:()=>week()}];
/* ============ SCRIPTURE: the passages on the tablets. short: how a passage is named when it is offered as an answer.
   road: a passage for the journey, which is not among the answers when Paul speaks of the Christ. ============ */
const PASS={
  ps121:{ref:'psalm_121_1_2',short:'help_from_jehovah',road:1,gist:'i_look_up_toward_the_mountains'},
  ecc4:{ref:'ecclesiastes_4_9_10',short:'two_are_better_than_one',road:1,gist:'two_do_better_than_one'},
  isa43:{ref:'isaiah_43_2',short:'through_the_rivers',road:1,gist:'when_your_way_leads_through'},
  ps2:{ref:'psalm_2_7',short:'you_are_my_son',gist:'i_announce_what_jehovah'},
  isa55:{ref:'isaiah_55_3',short:'loyal_love_toward_david',gist:'turn_your_ear_my_way_and_draw'},
  ps16:{ref:'psalm_16_10',short:'not_abandoned_to_the_grave',gist:'davids_hope_jehovah_would'},
  hab1:{ref:'habakkuk_1_5',short:'you_will_not_believe_it',gist:'search_among_the_nations'},
  isa56:{ref:'isaiah_56_3',short:'word_for_the_foreigner',gist:'if_a_foreigner_has_attached'},
  isa49:{ref:'isaiah_49_6',short:'light_of_nations_2',gist:'raising_up_jacobs_tribes'}},
  ORDER=['ps121','ecc4','isa43','ps2','isa55','ps16','hab1','isa56','isa49'],TALK=ORDER.filter(k=>!PASS[k].road);
const label=k=>T('ref_short',{ref:T(PASS[k].ref),short:T(PASS[k].short)}),quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inAnt()||inOut()?'named_first_when_we_were_sent_out_he':'levite_of_cyprus_the_son_of_comfort'},
    {name:'john_mark',note:()=>F.markTold?'he_has_left_us_and_returned':'cousin_of_barnabas_our_attendant',if:()=>inPerga()||inFord()},
    {name:'Papias',note:()=>F.pap?'a_drover':'drover_of_the_mountain',if:()=>F.metPap},
    {name:'Eumenes',note:()=>F.eum?'no_longer_by_the_door':'wool_merchant_of_antioch',if:()=>F.metEum},
    {name:'Joel',note:()=>F.joel?'he_has_opened_his_house':'jew_of_antioch',if:()=>F.spoke1},
    {name:'Hanan',note:()=>F.out?'he_asked_us_to_speak':'presiding_officer_of_the_synagogue_in_antioch',if:()=>F.spoke1},
    {name:'Ammia',note:'woman_of_high_standing',if:()=>F.spoke1}],
  tasks:[
    {t:'find_out_what_the_road',if:()=>inPerga()&&!F.metPap},
    {t:'find_out_what_weighs_on_john_mark',if:()=>inPerga()&&!F.markTold},
    {t:'mend_barnabass_sandal_before_the_climb',if:()=>inPerga()&&!F.shod},
    {t:'take_the_road_north_with_the_pack',if:()=>inPerga()&&F.metPap&&F.markTold&&F.shod},
    {t:'find_rope_enough_to_mend',if:()=>inFord()&&!F.gotLine},
    {t:'join_it_to_the_half_that_is',if:()=>inFord()&&F.gotLine&&!F.spliced},
    {t:'get_the_end_of_the_rope',if:()=>inFord()&&F.spliced&&!F.lineUp},
    {t:'bring_the_pack_train_over',if:()=>inFord()&&F.lineUp&&!F.crossed},
    {t:'go_on_over_the_pass',if:()=>inFord()&&F.crossed},
    {t:'go_into_the_synagogue_on_the_sabbath',if:()=>inAnt()&&!F.spoke1},
    {t:'answer_eumenes_is_this_for_a_greek',if:()=>week()&&!F.eum},
    {t:'joel_is_troubled',if:()=>week()&&!F.joel},
    {t:'answer_papias_what_is_it',if:()=>week()&&!F.pap},
    {t:'speak_again_on_the_next_sabbath',if:()=>week()&&allThree()},
    {t:'strengthen_the_disciples_before_we_go',if:()=>inOut()&&!F.cheered},
    {t:'shake_the_dust_from_our_feet',if:()=>inOut()&&F.cheered}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
/* ---------- Perga ---------- */
async function meetPap(me){F.metPap=1;
  await say(me,'peace_to_you_are');
  await say(PA,'you_are_looking_at_it');
  await say(PA,'papias_said');
  await say(PA,'hear_this_strangers');
  await say(PA,'walk_with_my_train_if_you_like');
  await say(PA,'i_take_no_one_who_cannot');
  await say(me,me===P?'company_for_the_road_then':'company_for_the_road',TH)}
/* John Mark leaves them. The account gives no reason (Acts 13:13), so none is given here. */
async function parting(){F.markTold=1;const b=other();MK.dir=PC().x>MK.x?1:-1;
  await say(MK,'paul_brother');
  if(b.room===G.room)await walk(b,MK.x+(PC().x>MK.x?46:-46),MK.y+3);b.dir=MK.x>b.x?1:-1;
  await say(MK,'i_am_not_going_up_into_the_mountains');
  await say(BN,'back_said');
  await say(MK,'i_know_cousin');
  await say(P,'i_wish_you_would_stay_with_the_work',{to:MK});
  await say(MK,'you_have_said_it_brother');
  await narr('there_john_parted_acts_13_13',{dur:5200});
  await narr('account_does_not_say_why',{dur:3200});
  await say(MK,'everything_is_counted');
  toPaul('roof');toPaul('bread',1);
  await say(MK,'this_a_thong');
  toPaul('thong');
  await say(BN,'go_safely_cousin');
  await say(MK,'i_will_see_you_onto_the_road');
  await walk(MK,84,121);MK.dir=1;
  await say(P,'he_gave_no_reason',TH)}
async function breadForMark(it){if(it!=='bread'||!F.markTold)return false;
  if(F.bread)return say(MK,'you_have_given_me_my_share');
  await say(P,'you_packed_this_bread_for_three');
  F.bread=1;SFX.good();
  await say(MK,'i_did_not_think_you_would');
  await say(P,'i_have_not_changed_my_mind',TH)}
MK.hs={name:'john_mark',actor:MK,
  look:()=>say(P,F.markTold?'john_mark_said':'john_mark_the_cousin_of_barnabas'),
  give:breadForMark,
  show:{thong:'ox_hide_from_the_sandal',roof:'i_rolled_it_dry_this_morning',
    bread:()=>say(MK,F.markTold?'it_is_yours_now_brother':'it_is_all_in_the_food_bag'),
    tablets:'i_used_to_think_i_would',awl:'i_will_carry_anything_you_like','*':'shall_i_pack_it_with_the_rest_said'},
  ask:{road:'i_heard_him',sandal:()=>say(MK,F.markTold?'that_is_what_the_thong_is_for_it':'i_saw_it_this_morning')},
  talk:()=>F.markTold?talkTree([
      {q:'how_will_you_travel',a:()=>say(MK,'down_to_the_coast_and_by_ship')},
      {q:'is_the_baggage_in_order',a:()=>say(MK,'two_bed_rolls_the_bundle')},
      {q:'go_in_peace_john_mark',bye:1}])
    :parting(),
  as:{barnabas:{look:()=>say(BN,F.markTold?'my_cousin':'my_cousin_said'),
    talk:()=>F.markTold?say(MK,'do_not_be_angry_with_me_cousin'):parting(),
    show:{staff5:'you_will_need_it_up_there_cousin','*':'it_is_not_mine_to_pack'}}}};
async function leave5(){const me=PC();
  if(!F.metPap)return say(me,me===P?'up_into_those_mountains':'i_would_not_start_up_that_road');
  if(!F.markTold)return say(me,me===P?'john_mark_has_not_stirred':'my_cousin_has_something');
  if(!F.shod){await say(BN,me===P?'go_on_like_this_paul_and_by_nightfall':'not_one_more_mile_on_this_sandal');
    return say(PA,'i_told_you')}
  await say(PA,'heat_is_breaking');return travel()}
PA.hs={name:'Papias',actor:PA,
  look:()=>say(P,inPerga()?'drover_burnt_as_brown_as_his_own':inFord()?'papias_he'
    :inOut()?'papias_he_has':'papias_among_his_panniers_of_salt_fish'),
  show:{thong:'good_ox_hide',roof:()=>say(PA,inFord()?'goat_hair_cloth_with_a_rope':'goat_hair_cloth_it_sheds_rain'),
    line:'tarred_and_sound_right_through',bread:'keep_it_for_the_pass',
    awl:'i_mend_my_own_harness_with_a_tool',knife:()=>say(PA,inPerga()?'keep_it_sheathed_near_my_beasts':'keep_it_sheathed_around_my_beasts'),tablets:'scratches_said','*':'it_is_your_load_friend_not_mine'},
  ask:{road:['alone_you_are_a_purse_on_two','i_have_never_lost_a_traveler'],
    sandal:'he_will_not_see_the_second_milestone',
    rope:'it_parts_every_few_years',
    mark:'boy_with_the_bundles',
    sabbath:'in_the_jews_house_of_prayer',
    again:()=>say(PA,F.pap?'i_know_said':'they_say_in_the_market')},
  talk:async()=>{
    if(inPerga()){if(!F.metPap)await meetPap(P);return talkTree([
      {q:'what_do_you_carry_up_to_antioch',a:async()=>{await say(PA,'salt_fish_oil_whatever');await say(PA,'antioch_lies_on_the_road')}},
      {q:'what_is_the_road_like',a:async()=>{await say(PA,'steep_and_narrow_wherever');await say(PA,'town_lies_higher_than_any')}},
      {q:'who_lives_in_antioch',a:()=>say(PA,'greeks_phrygians_and_a_good_many_jews')},
      {q:'we_will_be_ready',bye:1}])}
    if(inFord()){if(F.crossed)return say(PA,'on_your_feet_all_of_you');
      if(F.lineUp)return crossAll();
      return talkTree([
        {q:'is_there_no_other_crossing',a:()=>say(PA,'two_days_upstream_by_a_goat')},
        {q:'what_is_up_in_those_rocks',a:async()=>{await say(PA,'eyes_said');await say(PA,'they_will_not_come_down')}},
        {q:'i_will_see_what_can_be_done',bye:1}])}
    if(inOut())return say(PA,F.cheered?'go_well_tentmaker':'they_cannot_put_a_drover');
    if(week())return F.pap?say(PA,'drovers_yard_has_heard'):drover();
    return talkTree([
      {q:'where_can_two_travelers_sleep_tonight',a:()=>say(PA,'drovers_yard_behind_the_market')},
      {q:'how_is_trade',a:()=>say(PA,'they_were_waiting_for_me')},
      {q:'peace_to_you_papias',bye:1}])},
  as:{barnabas:{look:'the_drover',
    talk:async()=>{if(inPerga()&&!F.metPap)return meetPap(BN);
      await say(PA,inPerga()?'when_the_heat_breaks_i_said':inFord()?(F.lineUp&&!F.crossed?'you_carried_it_over_friend':'man_who_can_stand_in_that_water')
        :inOut()?'you_look_glad_friend':week()&&!F.pap?'it_is_the_tentmaker_i_want':'good_day_to_you_friend')},
    show:{staff5:'olive_wood_said','*':'it_is_your_load_friend_not_mine'}}}};
EU.hs={name:'Eumenes',actor:EU,
  look:()=>say(P,inPerga()?'traveler_of_some_means':inFord()?'eumenes_said'
    :G.room==='synp'?'eumenes_in_the_place_nearest_the_door':inOut()?'eumenes_he'
    :F.eum?'eumenes_at_his_stall':'eumenes_the_wool_merchant'),
  show:{tablets:()=>say(EU,'prophets_of_israel_in_wax'),
    roof:'goat_hair',line:'you_cut_that_out_of_your_own',
    bread:'keep_it_i_have',awl:'craftsmans_tool','*':'i_deal_in_wool_friend'},
  ask:{road:'he_is_right',
    rope:'i_cannot_swim_paul',
    mark:'young_man_with_the_bundles',
    sabbath:['visitor_takes_a_seat_like_anyone_else','they_often_do_when_the_visitor'],
    again:()=>say(EU,F.eum?'i_have_told_half_the_wool_market':'i_heard_them_ask')},
  talk:async()=>{
    if(inPerga()){if(!F.metEum){F.metEum=1;await say(EU,'eumenes_of_antioch_in_pisidia');
        await say(P,'paul_of_tarsus_a_tentmaker')}
      return talkTree([
        {q:'what_is_antioch_like',a:async()=>{await say(EU,'high_and_cold_at_night');await say(EU,'we_belong_to_the_province')}},
        {q:'are_there_jews_in_antioch',a:async()=>{await say(EU,'many_said');await say(EU,'they_call_people_like_me')}},
        {q:'until_the_road_then',bye:1}])}
    if(inFord())return F.crossed?say(EU,'i_crossed_that_river_on_my_own')
      :say(EU,F.lineUp?'line_from_post_to_post':'i_have_crossed_here_a_dozen');
    if(G.room==='synp')return say(EU,'this_is_my_place_by_the_door');
    if(inOut())return F.cheered?say(EU,'go_in_peace'):comfort();
    if(week())return F.eum?say(EU,'fullers_are_coming_and_the_dyers'):greek();
    return talkTree([
      {q:'is_this_your_stall',a:()=>say(EU,'my_fathers_before_me')},
      {q:'where_is_the_synagogue',a:()=>say(EU,'house_of_dressed_stone')},
      {q:'peace_to_you_eumenes',bye:1}])},
  as:{barnabas:{look:()=>say(BN,'eumenes_a'),
    talk:()=>say(EU,inOut()?(F.cheered?'go_in_peace_barnabas':'barnabas_what')
      :week()&&!F.eum?'it_is_paul_i_must_ask_barnabas':'peace_to_you_barnabas'),
    show:{staff5:'staff_that_crossed_the_river','*':'i_deal_in_wool_friend'}}}};
const BN5={name:'Barnabas',actor:BN,
  look:()=>say(P,inPerga()?(F.shod?'barnabas_shod_again_and_ready':'barnabas_he_is')
    :inFord()?(F.lineUp&&!F.crossed?'barnabas_on_the_far_bank':'barnabas_he_is_measuring')
    :inOut()?'barnabas_thrown':'barnabas_he_has'),
  give:mendSandal,
  show:{thong:'ox_hide',roof:'our_roof',line:'the_rope_out_of_our_roof',
    bread:()=>say(BN,F.bread?'you_gave_him_his_share':'bread_and_figs_for_three'),awl:'your_awl',thread:'good_thread_it',
    knife:'put_it_to_work_brother_said',tablets:'read_me_something_from_them_said','*':'keep_it_brother_said'},
  ask:{road:'he_is_right_paul',
    sandal:'it_parted_on_the_last_mile',
    mark:'he_is_my_cousin_paul',
    rope:'i_am_no_hand_with_a_rope',
    sabbath:'as_in_any_synagogue',
    again:'they_asked_and_they_meant_it'},
  talk:()=>inPerga()?talkTree([
      {q:'what_do_you_know_of_this_road',a:async()=>{await say(BN,'only_what_every_sailor');await say(BN,'that_beyond_them_lies_a_high')}},
      {q:'what_do_we_still_need',a:()=>say(BN,!F.metPap?'word_with_someone_who_knows_the_road':!F.markTold?'word_with_john_mark':!F.shod?'sandal_that_will_stay_on_my_foot':'nothing_i')},
      {q:'how_is_your_foot',once:1,a:()=>say(BN,F.shod?'better_shod_than_it_has':'foot_is_sound')},
      {q:'let_us_get_on',bye:1}])
    :inFord()?talkTree([
      {q:'what_do_you_make_of_the_river',a:()=>say(BN,'it_is_cold_it_is_fast_and_it')},
      {q:'of_those_rocks',a:()=>say(BN,'i_make_of_them_that_we')},
      {q:'stand_ready_brother',bye:1}])
    :inOut()?talkTree([
      {q:'are_you_sorry_we_came',a:()=>say(BN,'sorry_said')},
      {q:'let_us_finish_here',bye:1}])
    :talkTree([
      {q:'what_do_you_make_of_this_city',a:()=>say(BN,F.spoke1?'it_listens':'it_is_full_of_people_who')},
      {q:'how_do_i_look_to_you',once:1,a:async()=>{await say(BN,'like_a_man_who_waded_a_river');await say(P,'i_will_rest')}},
      {q:'stay_close_brother',bye:1}])};
ROOMS.perga={space:0.6,walk:[16,464,110,138],mood:'hope',amb:{crickets:.5,birds:.4,wind:.2,hooves:.5},hs:[
  {name:'mountains',x:120,y:6,w:330,h:40,wx:300,look:['taurus_said','i_look_up_toward_psalm_121_1']},
  {name:'city_wall',x:0,y:18,w:122,h:30,wx:76,look:'wall_of_perga_a_prominent'},
  {name:'north_gate_of_perga',x:26,y:50,w:44,h:54,wx:48,wy:112,look:'the_north_gate_of_perga',
    use:'our_road_lies_the_other',open:'our_road_lies_the_other'},
  {name:'plain',x:124,y:66,w:136,h:24,wx:190,look:'orchards_and_fields_and_the_heat'},
  {name:'watering_trough',x:194,y:70,w:60,h:36,wx:224,wy:113,look:'stone_trough_fed_from_a_spring',
    use:'i_drink_and_wash_the_dust',pickup:'it_is_a_trough'},
  {name:'pack_donkeys',x:280,y:74,w:128,h:30,wx:330,wy:114,look:['papiass_train_tethered','they_have_climbed_that_road'],pickup:'they_are_the_drovers_and_every'},
  {name:'milestone',x:419,y:89,w:11,h:18,wx:410,wy:113,look:'a_milestone'},
  {name:'plane_tree',x:426,y:24,w:54,h:44,wx:440,wy:116,look:'plane_tree_the_last_deep'},
  {name:'our_baggage',x:124,y:96,w:48,h:13,wx:150,wy:114,look:()=>say(P,F.markTold?'two_bed_rolls_and_a_bundle':'bed_rolls_the_bundle_and_the_food'),
    pickup:()=>say(P,F.markTold?'when_we_set_out_one':'john_mark_has_it_in_hand_said')},
  {name:'road_north',x:440,y:70,w:40,h:36,wx:462,wy:118,dir:1,look:'road_north_across_the_plain',exit:leave5}]};
/* ---------- The ford ---------- */
async function fordIntro(){
  await narr('on_the_fourth_day_the_road',{dur:3600});
  await say(PA,'hold_the_beasts');
  await say(PA,'it_rained_in_the_mountains');
  await say(EU,'we_wait_for_the_river_to_fall',{to:PA});
  await say(PA,'two_days');
  await say(P,'parted_rope_a_river_and_two_posts',TH)}
/* wade: Barnabas carries the end of the rope across on his staff, and Paul holds the line from the near post. */
async function wade(){
  if(F.lineUp)return say(BN,'line_is_up_and_i_am_on_the_right');
  if(!F.spliced)return say(BN,'with_my_staff_i_might_stand');
  if(!invOf(BN).includes('staff5'))return say(BN,'my_staff_first_paul');
  await say(BN,'my_staff_for_a_third_leg');
  await Promise.all([walk(P,172,120),walk(BN,186,125)]);P.dir=1;BN.free=true;BN.speed=22;const W=G.wade={x:BN.x,y:BN.y},tick=setInterval(()=>{W.x=BN.x;W.y=BN.y},40);
  SFX.splash();await walk(BN,236,125);SFX.splash();
  await say(BN,'it_pulls_like_an_ox');
  await say(P,'i_have_you');await say(P,quote('isa43'));
  SFX.splash();await walk(BN,288,124);clearInterval(tick);BN.speed=0;BN.free=false;await walk(BN,300,122);BN.dir=-1;
  G.wade=null;F.lineUp=1;SFX.good();
  await say(BN,'twice_round_the_post_and_hauled_tight');
  await say(P,'if_either_falls_ecclesiastes_4_10');
  await say(P,'now_the_train_can_cross',TH)}
async function crossAll(){playAs(P);
  await say(PA,'a_line');
  await fade(1,500);F.crossed=1;place5('ford');place(P,'ford',344,124,1);G.cam=clamp(P.x-160,0,ART.ford.w-VW);SFX.splash();
  await narr('one_by_one_they_crossed',{dur:6500});await fade(0,500);
  await say(EU,'you_took_your_own_roof');
  await say(P,'roof_can_be_sewn_again');
  await say(PA,'leave_it_on_the_posts')}
const overPass=()=>F.crossed?toAntioch():say(PC(),PC()===P?'not_without_the_others':'not_without_paul_and_not');
const river=async it=>{if(it==='roof')return say(P,'roof_will_not_get_us_over_but_what');
  if(it==='staff5')return say(P,'staff_is_cut_to_his_hand');
  if(it==='line')return say(P,F.spliced?'it_is_joined_already':'thrown_from_here_it_would');return false};
/* the hidden treasure (index.html, treasure): Paul calls across the gorge, and the cliff gives the name back three times, each fainter and later */
function echo5(){if(!AU.ctx)return;const t0=now()+.05;for(let k=1;k<=3;k++)[[0,392],[.17,330],[.34,294]].forEach(([o,f])=>tone({f:f*(1-k*.004),t:t0+k*.62+o,d:.15,type:'triangle',v:.07*Math.pow(.5,k)}))}
async function call5(){await say(P,'barnabas_ex');echo5();await wait(2300);
  await say(BN,F.lineUp&&!F.crossed?'i_can_hear_you_paul':'i_am_right_here_paul');
  await say(PA,'every_man_up_in_those_rocks');await say(P,'i_will_keep_my_voice_for_antioch');treasure()}
ROOMS.ford={space:0.7,get walk(){return PC().x>240?[300,464,112,138]:[16,186,112,138]},mood:'tense',amb:{fountain:.9,waves:.6,wind:.45,birds:.15},enter:fordIntro,hs:[
  {name:'pass',x:404,y:36,w:76,h:40,wx:440,look:'road_climbs_on_beyond_the_ford'},
  {name:'rocks_above_the_road',x:330,y:0,w:150,h:34,wx:400,look:['something_moved_up_among_those_rocks','perhaps_not']},
  {name:'cliff',x:150,y:10,w:190,h:36,wx:176,look:'river_does_not_run_down',talk:call5},
  {name:'pines',x:0,y:8,w:150,h:80,wx:90,look:'mountain_pines_rooted_in_cracks'},
  {name:'river',x:200,y:48,w:78,h:96,wx:166,wy:126,dir:1,look:['cold_water_swollen_with_rain','it_runs_like_a_mill_race'],
    use:()=>F.lineUp&&!F.crossed?crossAll():say(P,F.crossed?'i_have_crossed_it_once'
      :F.spliced?'i_have_a_rope_that_will':'alone_and_with_no_line'),
    useWith:river,pickup:'i_could_sooner_pick_up_the_road'},
  {name:'near_post',x:186,y:94,w:14,h:18,wx:172,wy:120,dir:1,look:()=>say(P,F.lineUp?'line_is_fast_at_this_end':F.spliced?'rope_is_whole_again_and_coiled'
      :'oak_post_set_in_the_rock'),
    pickup:'it_is_made_fast_here_and_here',use:()=>say(P,F.spliced?'it_is_spliced':'half_a_rope'),
    useWith:async it=>{if(F.spliced)return say(P,'splice_is_made');
      if(it==='line')return splice();if(it==='roof')return say(P,'not_the_cloth_the_rope');
      if(it==='awl'||it==='thread')return say(P,'awl_will_open_the_strands');
      if(it==='knife')return say(P,'trim_the_frayed_end_yes');return false}},
  {name:'far_post',x:274,y:94,w:14,h:18,wx:166,wy:126,dir:1,look:()=>say(P,F.lineUp?'barnabas_made_it_fast_twice':'other_post_and_the_other')},
  {name:'pack_donkeys',x:30,y:76,w:112,h:32,wx:110,wy:116,vis:()=>!F.crossed,look:'loaded_to_the_ears_with_salt',pickup:'they_are_the_drovers'},
  {name:'pack_donkeys',x:358,y:76,w:112,h:32,wx:380,wy:116,vis:()=>!!F.crossed,look:'every_beast_is_over_and_every',pickup:'they_are_the_drovers'},
  {name:'road_to_the_pass',x:452,y:84,w:28,h:28,wx:462,wy:118,dir:1,look:'road_on_up_to_the_pass',exit:overPass}]};
/* ---------- Antioch in Pisidia ---------- */
async function toAntioch(){playAs(P);await fade(1,600);AU.mood='hope';
  await narr('beyond_the_pass_the_road',{dur:6500});
  await narr('two_of_them_traveled_acts_13_14',{dur:6000});
  for(const id of['bread','roof','line'])dropAll(id);enterRoom('pisidia',...ENT.pisidia);place5('pisidia');codeBtn();await fade(0,600);
  await narr('antioch_in_pisidia_a_city',{dur:4200});
  await say(EU,'antioch_my');
  await say(PA,'every_one_of_them_buying_salt_fish');
  await say(BN,'paul_you_are_shivering');
  await say(P,'river_went_through_me_and_the_cold');
  await say(EU,'tomorrow_is_the_sabbath');
  await say(P,'tomorrow_we_go_in_and_take')}
async function synDoor(){const me=PC();
  if(!F.spoke1)return go5('synp',264,122,-1);
  if(!allThree())return say(me,me===P?'it_is_not_the_sabbath_yet':'not_until_the_sabbath');
  return sabbath2()}
/* think: Paul weighs what to say next. A choice that would not serve his hearers is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q),{by:av.map(o=>o.k||o.q)})];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* passages: the choices for one point of the talk, from the passages named; ok lists those that carry the point */
const passages=(ks,ok)=>ks.map(k=>ok.includes(k)?{q:label(k),k,ok:1}:{q:label(k),k,no:NOT[k]});
const NOT={isa55:'loyal_love_promised_to_david',ps16:'not_abandoned_to_the_grave_said',
  hab1:'warning_comes_last_if_it',isa56:'that_is_for_a_man_who_thinks',isa49:'light_of_nations_not'};
/* The first Sabbath (Acts 13:14-43). They take a seat and wait to be asked; then Paul chooses whom he addresses, and the passages he quotes. */
async function sabbath1(){playAs(P);
  await Promise.all([walk(P,258,126),walk(BN,282,128)]);P.dir=-1;BN.dir=-1;
  await narr('when_the_sabbath_acts_13_14',{dur:6000});
  await walk(HA,166,110);HA.dir=1;
  await narr('law_and_the_prophets_were_read_aloud_acts_13_15',{dur:7500});
  await walk(HA,92,114);HA.dir=1;
  await say(HA,'brothers_if_there_acts_13_15');
  await walk(P,166,111);P.dir=1;
  await narr('paul_rose_and_with_a_movement_acts_13_16',{dur:4500});
  await think('israelites_and_among_them',[
    {q:'listen_israelites',no:'leave_those_who_fear_god_to_overhear'},
    {q:'listen_men_of_antioch',no:'they_did_not_come_here'},
    {q:'listen_israelites_and_listen',ok:1}]);
  await say(P,'listen_israelites_and_listen_acts_13_16');
  await say(EU,'all_the_rest_who_fear_god',{to:null});
  await say(P,'god_of_israel_acts_13_17_19');
  await say(P,'he_gave_them_judges_and_then_kings_acts_13_20_22');
  await say(P,'god_has_done_acts_13_23');
  await say(JO,'a_savior',{to:null});
  await say(P,'jerusalem_and_its_rulers_acts_13_27_28');
  await say(P,'he_was_taken_acts_13_29');
  await say(P,'god_raised_him_acts_13_30_31');
  await think('raised_up_and_so_the_promise',passages(TALK,['ps2']));
  await say(P,'by_raising_jesus_acts_13_33');
  await think('raised_and_never_to_go',passages(TALK.filter(k=>k!=='ps2'),['isa55','ps16']));
  await say(P,'god_promised_you_acts_13_34');
  await say(P,'another_psalm_says_acts_13_35');
  await say(P,'david_died_and_his_body_did_decay_acts_13_36_37');
  await say(P,'know_this_brothers_acts_13_38');
  await say(P,'law_of_moses_acts_13_39');
  await say(EU,'everyone_who_believes',{to:null});
  await think('they_have_heard_the_good_news',passages(['hab1','isa56','isa49'],['hab1']));
  await say(P,'take_care_that_the_saying_acts_13_40');
  await say(P,'you_scorners_acts_13_41');
  await walk(P,258,126);P.dir=-1;
  await narr('as_the_two_went_acts_13_42',{dur:8000});
  await say(HA,'you_have_given_this_house');
  await say(JO,'until_then_you_lodge_with_me');
  await say(EU,'paul_may');
  await narr('many_jews_went_acts_13_43',{dur:7000});
  F.spoke1=1;SFX.good();await fade(1,600);enterRoom('pisidia',...ENT.pisidia);place5('pisidia');codeBtn();await fade(0,600);
  await narr('all_that_week_paul_worked',{dur:6500});
  await say(BN,'three_days_paul_and_you');
  await say(P,'eumenes_at_his_stall_papias',TH)}
const weekDone=async()=>{if(allThree()){await say(BN,'it_is_the_day_before_the_sabbath');await say(P,'tomorrow_the_synagogue_again',TH)}};
/* The week between the Sabbaths: three hearers, and each is answered in the way he can follow. */
async function greek(){
  await say(EU,'paul_on');
  await say(EU,'for_eleven_years_i_have');
  await say(EU,'i_keep_the_sabbath_and_i');
  await quiz(EU,'tell_me_plainly',[
    {q:'you_heard_me_rightly',r:['word_in_a_talk_paul']},
    {q:'it_was_promised_to_israel',r:['i_have_always_been_told']},
    {q:'let_me_show_you_what_is',ok:1,
      p:['do_not_take_my_word_for_it',quote('isa56'),
        'what_i_said_on_the_sabbath_acts_13_39'],
      r:['let_him_not_say_it',
        'my_brother_must_hear_this_and_the_fullers']}]);
  F.eum=1;SFX.good();return weekDone()}
async function drover(){
  await say(PA,'tentmaker_said');
  await say(PA,'i_am_no_jew_and_no_god');
  await quiz(PA,'what_is_it_to_a_man_who',[
    {q:'come_to_the_synagogue_on_the_sabbath',r:['into_the_jews_house_of_prayer']},
    {q:'it_is_all_written_in_the_prophets',r:['i_cannot_read_tentmaker']},
    {q:'god_i_speak_of_made_the_mountains',ok:1,
      p:['the_god_i_speak_of_made_the_mountains',
        'he_has_done_you_good_all'],
      r:['one_who_made_the_mountains',
        'i_will_hear_the_rest_of_it']}]);
  F.pap=1;SFX.good();return weekDone()}
async function troubled(){
  await say(JO,'barnabas_a_word');
  await say(JO,'hanan_came_to_my_dye_shop');
  await say(JO,'he_did_not_say_that_i_must');
  await ask(BN,JO,'if_this_goes_on_it_may',[
    {q:'hanan_asked_us_to_speak',r:['he_may']},
    {q:'i_sold_a_piece_of_land',r:['piece_of_land']},
    {q:'what_you_were_given_is_undeserved_kindness',ok:1,
      p:['what_you_heard_on_the_sabbath','whatever_it_costs_acts_13_43'],
      r:['hold_on_to_it','my_door_stays_open']}]);
  F.joel=1;SFX.good();return weekDone()}
JO.hs={name:'Joel',actor:JO,
  look:()=>say(P,G.room==='synp'?'man_of_my_own_people_with_dye':inOut()?'joel_said'
    :F.joel?'joel_at_his_open_door':'joel_our_host'),
  show:{tablets:'may_i',awl:'honest_tool','*':'put_it_by_brother'},
  ask:{sabbath:'visitor_takes_a_seat',
    mark:'young_man_who_turned_back',
    again:()=>say(JO,F.joel?'i_shall_be_there_to_hear':'yes_the')},
  talk:async()=>{if(G.room==='synp'){await say(JO,'peace_to_you_visitors');return say(JO,'from_the_coast_by_the_dust')}
    if(inOut())return say(JO,F.cheered?'we_will_go_on_meeting_in_my_house':'i_have_no_words_paul');
    return F.joel?say(JO,'my_door_is_open_paul_and_it'):say(JO,'it_is_good_to_have_you')},
  as:{barnabas:{look:()=>say(BN,F.joel||!week()?'joel_a':'joel_he'),
    talk:()=>G.room==='synp'?say(JO,'levite'):inOut()?say(JO,F.cheered?'hold_on_to_it_you_told_me':'you_told_me_it_would_cost')
      :F.joel?say(JO,'hold_on_to_it_said'):troubled(),
    show:{staff5:'staff_that_carried_a_rope','*':'put_it_by_brother_said'}}}};
HA.hs={name:'Hanan',actor:HA,look:()=>say(P,G.room==='synp'?'presiding_officer_of_the_synagogue':'hanan_said'),
  show:{tablets:'prophets_in_wax','*':'this_is_a_house_of_reading'},
  ask:{sabbath:'visitor_takes_his_seat'},
  talk:async()=>{if(G.room!=='synp')return say(HA,'i_have_said_what_i_have');
    await say(HA,'peace_to_you_strangers');
    await say(P,'peace_to_you_we_are');
    await say(HA,'from_abroad')},
  as:{barnabas:{look:'presiding_officer',talk:()=>say(HA,'levite_they_tell_me'),show:{'*':'put_it_away_levite'}}}};
AM.hs={name:'Ammia',actor:AM,look:'woman_of_standing_by_her_dress',
  show:{'*':'workmans_things'},
  ask:{sabbath:'i_could_not_tell_you'},
  talk:async()=>{await say(AM,'ammia_said');await say(AM,'i_come_here_for_the_reading')},
  as:{barnabas:{look:'a_woman_of_high_standing',talk:()=>say(AM,'you_are_strangers_here'),show:{'*':'they_have_no_place_in_this_house'}}}};
ROOMS.pisidia={space:0.8,walk:[16,464,110,138],mood:'hope',amb:{crowd:.5,birds:.3,wind:.3,hammer:.2,hooves:.3},hs:[
  {name:'mountains',x:60,y:2,w:370,h:20,wx:240,look:'snow_on_them_halfway_down'},
  {name:'street_to_the_south_gate',x:0,y:36,w:58,h:68,wx:40,wy:113,dir:-1,look:'street_we_came_in_by_from_the_south',
    use:'back_down_to_the_coast',open:'back_down_to_the_coast'},
  {name:'wool_market',x:58,y:24,w:188,h:18,wx:150,look:'stoa_full_of_wool_fleeces'},
  {name:'wool_stall',x:96,y:43,w:90,h:63,wx:150,wy:114,look:['fleeces_on_the_bar_bales','sheeps_wool_not_goat_hair'],pickup:'it_is_eumeness_wool_not_mine'},
  {name:'panniers_of_salt_fish',x:196,y:96,w:32,h:13,wx:210,wy:114,look:'salt_fish_from_the_coast_of_pamphylia',pickup:'they_are_papiass_living'},
  {name:'tentmakers_bench',x:252,y:86,w:34,h:22,wx:266,wy:113,dir:-1,vis:week,look:['bench_at_joels_door_and_a_length','man_can_sew_and_answer'],
    use:'few_more_spans_of_seam',pickup:'it_is_half_a_tent_and_it'},
  {name:'door_of_joels_house',x:286,y:61,w:28,h:43,wx:300,wy:113,look:()=>say(P,week()?'joels_door':'house_with_a_blue_door'),
    use:()=>say(P,week()?'not_while_there_is_light':'it_is_not_my_house_and_i'),
    open:()=>say(P,week()?'it_is_open_already':'it_is_not_my_house_and_i')},
  {name:'synagogue',x:334,y:22,w:104,h:28,wx:386,look:'synagogue_of_antioch_dressed'},
  {name:'water_jar',x:341,y:87,w:14,h:20,wx:352,wy:113,look:'great_jar_of_water_beside',pickup:'it_would_take_two_men_to_lift'},
  {name:'door_of_the_synagogue',x:371,y:60,w:30,h:44,wx:386,wy:112,look:()=>say(P,F.spoke1?'door_of_the_synagogue_said':'door_of_the_synagogue_tomorrow'),exit:synDoor},
  {name:'east_gate',x:444,y:50,w:32,h:54,wx:458,wy:113,dir:1,look:'east_gate_said',
    exit:()=>say(PC(),PC()===P?(week()?'not_while_a_whole_city':'we_have_only_just_come'):'not_yet_said')}]};
ROOMS.synp={space:1.5,walk:[16,304,110,136],mood:'calm',amb:{crowd:.14,fire:.15},hs:[
  {name:'door_to_the_square',x:286,y:53,w:24,h:51,wx:288,wy:113,dir:1,look:'the_door_to_the_square',exit:()=>go5('pisidia',386,116,-1)},
  {name:'window',x:54,y:16,w:22,h:24,wx:70,look:'high_window_said'},
  {name:'window',x:149,y:16,w:22,h:24,wx:160,look:'high_window_said'},
  {name:'window',x:244,y:16,w:22,h:24,wx:250,look:'high_window_said'},
  {name:'lamp',x:90,y:48,w:16,h:14,wx:112,look:'lamp_on_a_bracket_burning',pickup:'it_gives_light_to_the_whole'},
  {name:'lamp',x:214,y:48,w:16,h:14,wx:206,look:'lamp_on_a_bracket_burning',pickup:'it_gives_light_to_the_whole'},
  {name:'chest_of_the_scrolls',x:29,y:61,w:36,h:43,wx:60,wy:113,look:['chest_of_the_scrolls_carried','law_the_prophets_and_the_psalms'],
    open:'it_is_not_mine_to_open',use:'it_is_not_mine_to_open',pickup:'it_is_not_mine_to_open'},
  {name:'seats_of_the_presiding_officers',x:70,y:70,w:44,h:34,wx:124,wy:114,dir:-1,look:'seats_of_the_presiding'},
  {name:'reading_platform',x:118,y:80,w:96,h:28,wx:166,wy:113,look:['platform_and_the_reading','any_son_of_israel_may_be'],
    use:'unasked_said',pickup:'scroll_belongs_to_the_synagogue'},
  {name:'bench',x:250,y:78,w:32,h:26,wx:258,wy:126,dir:-1,def:'use',look:'benches_of_stone_in_two',use:sabbath1}]};
/* ---------- The next Sabbath, and what came of it (Acts 13:44-50) ---------- */
const WRONG={ps2:'psalm_for_the_king_of_israel',isa55:'promised_to_david',ps16:'you_said_all_that_last_sabbath',
  hab1:'you_warn_us',isa56:'foreigner_who_has_attached'};
async function sabbath2(){playAs(P);await fade(1,500);G.crowd=1;AU.mood='tense';
  place(P,'pisidia',386,116,-1);place(BN,'pisidia',410,119,-1);place(HA,'pisidia',442,118,-1);place(AM,'pisidia',462,122,-1);place(EU,'pisidia',330,121,1);place(PA,'pisidia',304,125,1);place(JO,'pisidia',350,127,1);
  G.cam=160;await fade(0,500);
  await narr('week_later_on_the_sabbath_acts_13_44',{dur:7000});
  await say(EU,'fullers_are_here_paul_and_the_dyers');
  await say(PA,'every_drover_from_the_yard');
  P.dir=1;BN.dir=1;
  await say(HA,'greeks_on_the_steps_of_the_house');
  await say(HA,'he_fetches_them_here_in_a_week');
  await narr('sight_of_the_crowds_acts_13_45',{dur:9000});
  await ask(P,HA,'promises_were_given_to_israel',TALK.map(k=>k==='isa49'?{q:label(k),k,ok:1,
      p:['it_is_written_in_isaiah'],r:['light_of_you']}
    :{q:label(k),k,p:[quote(k)],r:[WRONG[k]]}));
  await narr('paul_and_barnabas_answered_them_boldly_acts_13_46',{dur:5000});
  await say(P,'word_of_god_had_acts_13_46');
  await say(BN,'now_we_go_to_the_nations_acts_13_46');
  P.dir=-1;
  await say(P,'for_this_is_what_acts_13_47');
  SFX.good();AU.mood='hope';
  await narr('people_of_the_nations_acts_13_48',{dur:10000});
  await say(EU,'light_of_nations_q');
  await say(PA,'i_heard_it');
  await narr('from_one_end_acts_13_49',{dur:6500});
  await say(HA,'lady_ammia');
  await say(AM,'it_is_not');
  await fade(1,700);G.crowd=0;AU.mood='tense';
  await narr('jews_worked_on_the_god_acts_13_50',{dur:11000});
  F.out=1;enterRoom('border',...ENT.border);place5('border');codeBtn();await fade(0,700);
  await say(SN,'that_stone_is_the_boundary_of_antioch');
  await say(SN,'you_have_unsettled_a_quiet_town');
  await say(JO,'they_would_not_let_us_walk');
  await say(P,'put_out_like_thieves',TH)}
/* ---------- Outside the boundaries ---------- */
async function comfort(){
  await say(EU,'they_have_put_you_out_like');
  await quiz(EU,'what_becomes_of_us_now',[
    {q:'we_did_nothing_to_deserve_this',r:['i_know_it']},
    {q:'come_with_us_to_iconium',r:['leave_joel_and_the_fullers']},
    {q:'it_was_never_our_word_eumenes',ok:1,
      p:['it_was_never_our_word_eumenes_said',
        'they_can_put_two_men_out_past'],
      r:['not_in_you','we_are_not_left_with_nothing']}]);
  F.cheered=1;SFX.good();
  await say(JO,'we_will_meet_in_my_house');
  await say(PA,'i_carry_more_than_salt')}
const dust=()=>F.cheered?finale5():say(PC(),PC()===P?'not_yet_they':'not_yet_paul');
SN.hs={name:'Straton',actor:SN,look:'straton_one_of_the_leading',
  show:{'*':'i_want_nothing_of_yours'},talk:()=>say(SN,'i_have_nothing_more_to_say'),
  as:{barnabas:{look:'one_of_the_leading_men',talk:()=>say(SN,'order_stands_for_both_of_you'),show:{'*':'i_want_nothing_of_yours_said'}}}};
ROOMS.border={space:0.5,walk:[16,304,112,138],mood:'tense',amb:{wind:.6,birds:.4,crickets:.2},hs:[
  {name:'mountains',x:0,y:30,w:320,h:22,wx:200,look:'same_mountains_that_stood_over_the_square'},
  {name:'Antioch',x:2,y:48,w:118,h:30,wx:120,look:['antioch_on_its_rise','there_are_disciples_inside_that_wall_now']},
  {name:'poplars',x:198,y:72,w:92,h:22,wx:240,look:'poplars_along_a_stream'},
  {name:'our_baggage',x:260,y:100,w:48,h:13,wx:250,wy:116,dir:1,look:'two_bed_rolls_and_a_bundle_said',pickup:'in_a_moment'},
  {name:'boundary_stone',x:94,y:86,w:18,h:24,wx:128,wy:116,dir:-1,def:'use',look:'boundary_stone_of_antioch',use:dust,pickup:'it_marks_their_boundary'},
  {name:'road_to_iconium',x:296,y:84,w:24,h:44,wx:300,wy:122,dir:1,look:'road_southeast_to_iconium',exit:dust}]};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  perga:{'mountains':{look:'taurus_i'},'city_wall':{look:'perga_said'},
    'north_gate_of_perga':{look:'gate_back_into_perga_and_to_the_coast',use:'not_that_way_said',open:'not_that_way_said'},
    'plain':{look:'good_land_and_hot_already'},'watering_trough':{look:'good_trough_and_cold_water',use:'i_drink_my_fill'},
    'pack_donkeys':{look:'thirty_beasts_and_every_one_loaded'},'milestone':{look:'milestone_said'},
    'plane_tree':{look:'shade_said'},
    'our_baggage':{look:()=>say(BN,F.markTold?'the_bundles':'john_mark_has_it_all_in_order'),pickup:'when_we_go_i_take_my_share'},'road_north':{look:'the_road_north'}},
  ford:{'pass':{look:'the_pass'},'rocks_above_the_road':{look:'someone_is_up_there'},
    'cliff':{look:'river_comes_straight_out_of_the_rock'},'pines':{look:'pines_growing_out_of_bare_stone'},
    'river':{look:'cold_fast_and_not_as_deep',use:wade,useWith:async it=>it==='staff5'?wade():false},
    'near_post':{look:()=>say(BN,F.lineUp?'fast_at_both_ends':F.spliced?'paul_has_made_the_rope_whole':'half_a_rope_said'),use:wade,useWith:async it=>it==='staff5'?wade():false},
    'far_post':{look:()=>say(BN,F.lineUp?'i_tied_it_myself_twice':'the_far_post'),use:wade,useWith:async it=>it==='staff5'?wade():false},
    'pack_donkeys':{look:'they_do_not_like_the_sound'},'road_to_the_pass':{look:'road_on_up_to_the_pass'}},
  pisidia:{'mountains':{look:'snow_in_sight_of_a_market'},'street_to_the_south_gate':{look:'street_from_the_south_gate',use:'we_are_not_going_back_that_way',open:'we_are_not_going_back_that_way'},
    'wool_market':{look:'wool_wool_and_more_wool'},'wool_stall':{look:'eumenes_keeps_a_tidy_stall'},
    'panniers_of_salt_fish':{look:'salt_fish_that_crossed'},
    'tentmakers_bench':{look:'pauls_bench',use:BARN5.noCraft},
    'door_of_joels_house':{look:()=>say(BN,week()?'joels_door_said':'a_house_with_a_blue_door'),use:'i_will_go_in_when_our_host',open:'i_will_go_in_when_our_host'},
    'synagogue':{look:'synagogue_of_dressed_stone'},'water_jar':{look:'water_for_washing_by_the_door'},
    'door_of_the_synagogue':{look:'door_of_the_synagogue_2'},'east_gate':{look:'east_gate_and_the_road_to_iconium'}},
  synp:{'door_to_the_square':{look:'the_door_to_the_square'},'window':{look:'light_falls_just_where_the_reader_stands'},'lamp':{look:'lamp_kept_burning'},
    'chest_of_the_scrolls':{look:'the_chest_of_the_scrolls',open:'it_is_in_the_keeping_of_the_synagogue',use:'it_is_in_the_keeping_of_the_synagogue'},
    'seats_of_the_presiding_officers':{look:'seats_of_the_presiding_officers_said'},
    'reading_platform':{look:'the_platform',use:'it_is_paul_who_should_stand'},
    'bench':{look:'room_for_two_on_the_lower_bench',use:sabbath1}},
  border:{'mountains':{look:'mountains_have_not_moved'},'Antioch':{look:'antioch_i'},
    'poplars':{look:'poplars_bending_to_the_wind'},'our_baggage':{look:'they_threw_our_bundles_out_after_us'},
    'boundary_stone':{look:'their_boundary',use:dust},'road_to_iconium':{look:'the_road_to_iconium'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ SCENES: intro, the road, ending; PRAYER HINTS ============ */
const LABELS={salamis:{lab:'r',dy:4.2},paphos:{lab:'l',dy:2.6}},VOYAGE=[['antioch','seleucia'],['seleucia','salamis','sea'],['salamis','paphos'],['paphos','perga','new sea']];
/* arrive5: after the map has drawn the way up from Perga. The road does not reach Antioch at once: it comes down to a river first. */
async function arrive5(to){if(to!=='antiochp')return;MK.room=null;enterRoom('ford',...ENT.ford);place5('ford');
  await narr('from_perga_the_road_climbed',{dur:7000});
  await narr('those_mountains_were_known',{dur:8500});
  await narr('years_later_paul_2_corinthians_11_26',{dur:7000})}
async function start5(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(5);G.end={};enterRoom('perga',...ENT.perga);codeBtn();
    try{await need('map');await SHARED.map.journey(VOYAGE,{labels:LABELS,view:'north',text:['paul_and_those_with_him_acts_13_13']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;setScore(MUSIC);AU.mood=ROOMS.perga.mood;AU.amb=ROOMS.perga.amb;codeBtn();await fade(0,600);
    await narr('perga_in_pamphylia_about_47_c_e',{dur:3000});
    await say(BN,'north_road_paul');
    await say(P,'that_is_our_road');
    await say(MK,'bed_rolls_are_here_cousin',{to:BN});
    await say(P,'john_mark_has_hardly_spoken',TH)},true)}
async function finale5(){playAs(P);await wait(300);
  await say(P,'one_thing_remains_barnabas_luke_9_5');
  await Promise.all([walk(P,238,123),walk(BN,264,126)]);P.dir=-1;BN.dir=-1;P.bow=BN.bow=true;G.dust=1;SFX.step();await wait(500);SFX.step();await wait(1300);
  await narr('against_those_who_acts_13_51',{dur:6500});
  P.bow=BN.bow=false;G.dust=0;
  await say(BN,'not_in_anger_paul');
  await say(P,'no_they');
  await say(JO,'go_in_peace_said');
  P.dir=1;BN.dir=1;walk(BN,318,125);await walk(P,300,122);await fade(1,600);AU.mood='hope';
  await narr('as_for_the_disciples_acts_13_52',{dur:6500});
  await journey();await narr('iconium_lay_about_140_acts_14_21',{dur:7000});
  endScreen({title:'a_light_of_nations',text:'paul_took_his_own_roof',
    extra:F.bread?['bread_shared_with_john']:[],
    based:'based_on_acts_13_13_52',
    go:'click_to_continue_to_chapter_six',code:['chapter_six_code_code',codeOf(6,0)]});
  await wait(1500);ov.onclick=()=>startChapter(6);await new Promise(()=>{})}
function hint5(){const b=PC()!==P,craft=['craft5',['that_is_the_tentmakers_craft_not_mine','paul_should_do_this_part']];
  if(inPerga()){
    if(!F.metPap)return['road5',['two_men_do_not_walk_into_those_mountains','i_should_talk_to_the_drover']];
    if(!F.markTold)return b?['mark5b',['my_cousin_has_not_been','i_should_talk_to_john_mark']]
      :['mark5',['john_mark_stands_by_the_bundles','i_should_talk_to_john_mark']];
    if(!F.shod)return b?['shoe5b',['strap_is_beyond_me','paul_should_use_the_leather']]
      :['shoe5',['barnabas_cannot_climb_on_a_parted_strap','i_should_use_the_leather']];
    return['go5',['drover_is_ready_and_so_are_we','we_can_take_the_road_north']]}
  if(inFord()){
    if(!F.gotLine)return b?craft:['rope5',['guide_rope_is_short_by_half','i_can_take_the_rope_out_of_the_edge']];
    if(!F.spliced)return b?craft:['splice5',['i_have_rope_enough_now','i_should_use_the_tarred']];
    if(!F.lineUp)return b?['wade5b',['paul_has_made_the_rope_whole_said','i_should_use_my_staff_with_the_river']]
      :['wade5',['rope_will_reach_but_it','barnabas_should_carry_it_across']];
    if(!F.crossed)return b?['cross5b',['i_am_over_and_the_line','paul_should_talk_to_the_drover_now']]
      :['cross5',['line_is_up_from_post_to_post','i_should_talk_to_papias']];
    return['pass5',['everyone_is_over_and_the_light','we_can_take_the_road_up_to_the_pass']]}
  if(inOut()){
    if(!F.cheered)return b?['cheer5b',['it_is_paul_whom_eumenes_is_asking','paul_should_talk_to_eumenes']]
      :['cheer5',['they_are_afraid_of_being','i_should_talk_to_eumenes']];
    return['dust5',['one_thing_is_left_to_do','i_should_use_the_boundary']]}
  if(!F.spoke1)return G.room==='synp'?['seat5',['visitor_does_not_ask_for_the_platform',b?'paul_and_i_should_take_a_seat':'i_should_use_the_bench_and_wait']]
    :['syn5',['tomorrow_is_the_sabbath_said','we_can_go_in_at_the_door']];
  if(b){if(!F.joel)return['joel5b',['joel_has_tasted_something','i_should_talk_to_joel_and_urge']];
    return allThree()?['sab5',['week_is_over_and_the_city','we_can_go_to_the_door_of_the_synagogue']]:['paul5b',['others_are_asking_for_paul','paul_should_talk_to_eumenes_said']]}
  if(!F.eum)return['eum5',['eumenes_wants_more_than_my_word','i_should_talk_to_eumenes_said']];
  if(!F.pap)return['pap5',['papias_has_never_heard_the_prophets_read','i_should_talk_to_papias_said']];
  if(!F.joel)return['joel5',['joel_will_not_tell_me_what','barnabas_should_talk_to_joel']];
  return['sab5',['week_is_over_and_the_city','we_can_go_to_the_door_of_the_synagogue']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={nod:['yes_the'],
  shake:['no_they']};
return{acting:ACTING,rooms:['perga','ford','pisidia','synp','border'],setup:setup5,start:start5,hint:hint5,music:MUSIC,topics:TOPICS,tablets:TABLETS,
  /* Antioch in Pisidia and Iconium lie north of the map's usual window, so this chapter looks through the northern one. The whole of the
     first journey so far is on it; the chapter's own road draws itself at the end */
  view:'north',route:VOYAGE.map(l=>l.slice(0,2)).concat([['perga','antiochp','new'],['antiochp','iconium','new']]),
  /* names that would lie across this chapter's routes on their usual side */
  labels:LABELS,
  places:{
    paphos:{room:'-',if:()=>false,no:'we_put_out_to_sea_from_paphos'},
    perga:{room:'perga',x:176,y:124,dir:1},
    antiochp:{room:'pisidia',x:120,y:124,dir:1,if:inPerga},
    iconium:{room:'border',x:236,y:124,dir:-1,if:()=>false,no:'iconium_lies_far_beyond'}},
  way:()=>VOYAGE.map(l=>l.slice(0,2)),arrive:arrive5,
  flags:['metPap','metEum','markTold','bread','shod','gotLine','spliced','lineUp','crossed','spoke1','eum','joel','pap','out','cheered'],
  codeBits:{flags:20,rooms:3,share:9},party:['paul','barnabas'],home:{staff5:'barnabas'},share:['awl','thread','knife','tablets','bread','thong','roof','line','staff5'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)},low=room==='perga'||room==='ford';
    add(F.markTold&&low,'bread');add(F.markTold&&!F.shod,'thong');add(F.markTold&&low&&!F.gotLine,'roof');add(F.gotLine&&!F.spliced,'line');inv.push('staff5');return inv},
  place:place5}
});
