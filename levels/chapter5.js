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
const SH='#8f95c8';
/* What is seen through the east gate of Antioch: the plateau, blue ranges round it, and the road running on. The gate adds the horizon and the sky of its scene. */
const GATE5={far:['#a9b4c8','#c2cad4'],near:['#a8a878','#b8b488'],land:'#cdc296',road:'#ead9ae'};
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* crag: a face of bare limestone inside the outline p: bedded, cracked, lit from the upper left */
function crag(g,p,c,r,o){o=o||{};let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
  clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.16),c,tint(c,-.22)]);g.fillRect(x0,y0,x1-x0,y1-y0);tex(g,'mott',.7,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'vert',.3,x0,y0,x1-x0,y1-y0,'overlay',.5);
    for(let j=y0+3+r()*4;j<y1;j+=4+r()*7){const q=[x0,j+(r()-.5)*3],sl=o.dip||0;for(let x=x0+8;x<=x1+8;x+=8+r()*10)q.push(x,j+(x-x0)*sl+(r()-.5)*2.4);stroke(g,q,rgba('#2a2438',.26),.6);stroke(g,q.map((v,i)=>i%2?v+.7:v),rgba('#fff6e0',.16),.5)}
    for(let k=0;k<(x1-x0)*(y1-y0)/420;k++){let qx=x0+r()*(x1-x0),qy=y0+r()*(y1-y0)*.8;const q=[qx,qy];for(let s=0;s<3+r()*4;s++){qx+=(r()-.5)*4;qy+=2+r()*5;q.push(qx,qy)}stroke(g,q,rgba('#1e1a2c',.34),.5)}
    if(o.shade)ao(g,x0,y0,x1-x0,y1-y0,o.shade,.3,'#2a2848')})}
/* rock: a boulder sitting on the ground at x,y */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(1,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.5,x-w/2,y-h,w,h,'overlay',1)})}
/* pine: a mountain pine in three tiers of needles, darker below */
function pine(g,x,y,h,c){c=c||'#3c5a44';R(g,x-.6,y-h*.3,1.4,h*.3,'#4a3626');for(let i=0;i<3;i++){const yy=y-h*(.24+i*.24),w=h*(.3-i*.07);
    poly(g,[x-w,yy,x,yy-h*.34,x+w,yy],tint(c,-.12+i*.1));poly(g,[x-w,yy,x,yy-h*.34,x-w*.1,yy],tint(c,.1+i*.1))}}
/* bundles: what the two men carry between them: two bed rolls and a bag */
function bundles(g,x,y){for(const[dx,dy,w,hh,c]of[[0,-5,17,5,'#8a5a4a'],[4,-9.6,15,4.6,'#6f7a5a']]){oval(g,x+dx+w/2+2,y+dy+hh+.4,w/2+3,1.4,'rgba(40,30,60,.35)');g.fillStyle=lg(g,0,y+dy,0,y+dy+hh,[tint(c,.3),c,tint(c,-.5)]);g.fillRect(x+dx,y+dy,w,hh);
    for(let i=0;i<w;i+=2.5)R(g,x+dx+i,y+dy,.5,hh,'rgba(0,0,0,.22)');oval(g,x+dx,y+dy+hh/2,hh*.32,hh/2,tint(c,.12));oval(g,x+dx+w,y+dy+hh/2,hh*.32,hh/2,tint(c,-.35))}
  sack(g,x+27,y,4,7,'#cdbb8c');g.fillStyle=lg(g,x+33,0,x+44,0,['#3a302a','#2a211c','#17110e']);g.beginPath();g.ellipse(x+38.6,y-3.4,5.6,3.6,0,0,6.2832);g.fill();R(g,x+34,y-5,9,.6,'#8a7a5a')}
/* stoneGround: bare ground of rock and gravel between y0 and y1 */
function stoneGround(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.6,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.16,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.5);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.6+k*1.6;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.25));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.4,s*.3,'rgba(40,36,70,.25)')}}
/* ---------- Perga: the north road, outside the gate ---------- */
const taurus=x=>22+11*Math.sin(x/61+1.2)+5*Math.sin(x/23+.4)+2.4*Math.sin(x/8)-9*Math.exp(-Math.pow((x-388)/15,2));
ART.perga={w:480,fp:1.3,
 paint(g){const r=rng(331),ST='#d8c9a2';
  sky(g,480,72,['#4583c8','#79aedc','#b4d0e4','#ece6c8']);cloud(g,170,10,58,7,r);cloud(g,318,20,40,5,r);cloud(g,450,9,36,5,r);
  /* the Taurus, a wall across the north, snow on its crest; the road climbs toward the notch of the pass */
  snowy(g,112,480,68,taurus,['#8f9ec4','#a9b6cc','#c6ccc8'],25);ridge(g,112,480,68,x=>9+4*Math.sin(x/37)+2*Math.sin(x/11+2)-5*Math.exp(-Math.pow((x-392)/18,2)),['#96a68a','#aab692']);
  comp(g,'screen',.34,()=>{g.fillStyle=lg(g,0,30,0,70,['rgba(236,226,196,0)','rgba(236,226,196,1)']);g.fillRect(112,30,368,40)});
  /* the plain of Pamphylia: fields, orchards, and the road across them */
  g.fillStyle=lg(g,0,66,0,104,['#b9bc84','#a8b472','#96aa62']);g.fillRect(112,66,368,38);tex(g,'mott',.5,112,66,368,38,'overlay',1);
  for(let i=0;i<9;i++){const fx=118+i*40+r()*12,fy=70+r()*8;poly(g,[fx,fy,fx+30,fy-1,fx+38,fy+9,fx+3,fy+11],i%3===0?'rgba(214,196,110,.4)':i%3===1?'rgba(96,140,70,.36)':'rgba(170,130,84,.3)')}
  poly(g,[452,104,480,104,480,96,430,84,404,74,394,68,391,68,398,74,420,85,440,96],'#e6d8b0');stroke(g,[452,104,440,96,420,85,398,74,391,68],'rgba(120,100,60,.4)',.5);
  for(const[x,y]of[[136,80],[160,88],[188,78],[216,86],[306,76],[332,84],[358,78],[250,74],[282,88],[380,90]]){oval(g,x+2,y+3.4,5.6,1.1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,5,3.2,'#6f8a58',r,22)}
  for(const[x,h]of[[232,12],[238,9],[346,11],[468,13],[474,9]])cypress(g,x,90,h);
  /* the wall of Perga and its north gate, a round tower beside it. Through the gate: a colonnade of the city, whose shaded back wall closes the view */
  ashlar(g,0,24,112,80,ST,r,{bw:13,bh:6.4,v:.09,t:.35});for(let i=0;i<86;i+=9){R(g,i,19.6,5.6,4.4,ST);R(g,i,19.6,5.6,.5,'#f4e8c8')}R(g,0,23.6,112,1,'#a8987a');
  g.fillStyle=lg(g,84,0,122,0,['#b8ab8a','#efe2bc','#dccfa8','#a39a84','#8a8478']);g.fillRect(84,12,38,92);inRect(g,84,12,38,92,()=>{for(let j=14;j<104;j+=6.4)R(g,84,j,38,.6,'rgba(70,56,40,.3)');
    for(let j=0;j<15;j++)for(let i=0;i<5;i++)R(g,87+i*8+(j%2)*4,14+j*6.4,.6,6.4,'rgba(70,56,40,.2)');tex(g,'mott',.4,84,12,38,92,'overlay',1)});
  for(let i=84;i<122;i+=8){R(g,i,7.6,5,4.4,'#e2d5b0');R(g,i,7.6,5,.5,'#f8eccc')}R(g,83,11.6,40,1.2,'#a8987a');windowArt(g,99,34,6,9,ST,{dark:'#241a16'});
  arch(g,26,50,44,54,'#c2b28c');g.save();arch(g,28,52,40,52);g.clip();sky(g,480,84,['#6aa2dc','#cfe2ee']);R(g,28,60,40,33,'#8f8894');for(const x of[38.8,49.8])R(g,x,77,4,14.4,'#2a2430');R(g,28,93,40,11,'#d9d0bc');R(g,28,93,40,.6,'#efe8d6');
  for(const cxx of[33,44,55]){g.fillStyle=lg(g,cxx,0,cxx+4.6,0,['#d8d0bc','#fbf7ea','#c8c0b0']);g.fillRect(cxx,62,4.6,30);R(g,cxx-1,60,6.6,2,'#efe8d6');R(g,cxx-1,91,6.6,2,'#d8d0bc')}R(g,28,56,40,4,'#e6dec8');R(g,28,54.6,40,1.6,'#b8603c');
  ao(g,28,52,40,11,'t',.55,'#2a2440');ao(g,28,52,6,52,'l',.5,'#2a2440');ao(g,64,52,4,52,'r',.35,'#2a2440');g.restore();
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,48+Math.cos(a)*22-.3,72+Math.sin(a)*22-1,.6,2.6,'#a8987a')}
  /* a low field wall along the road, with rings for tethering */
  ashlar(g,262,92,218,12,'#cdbf9c',r,{bw:9,bh:4,v:.1,t:.3});R(g,262,91,218,1.4,'#eadcb6');for(const x of[292,336,380]){oval(g,x,97.4,1.6,1.6,'#4a443c');oval(g,x,97.4,.8,.8,'#cdbf9c')}
  /* the watering trough, fed from a spout in a stone pier */
  shade(g,[196,105,254,105,262,111,204,111],SH,.5);g.fillStyle=lg(g,198,0,210,0,['#b8ae98','#eee6d0','#a8a090']);g.fillRect(198,72,12,32);R(g,196.6,70,14.8,2.6,'#f2ead6');R(g,196.6,72.4,14.8,.6,'#a8a094');
  R(g,203,84,5,3,'#7a7466');oval(g,205.5,85.6,1.3,1.3,'#2e2a26');
  g.fillStyle=lg(g,0,92,0,105,['#e6dcc4','#cfc4aa','#a89e88']);g.fillRect(196,92,56,13);R(g,195,91,58,2.2,'#f2ead6');R(g,195,93,58,.6,'#a8a094');R(g,198.6,93.6,50.8,1.8,'#5f9cc0');R(g,196,103.6,56,1.4,'#8a8272');
  /* a milestone where the road leaves the gate */
  oval(g,426,106.6,6,1.2,'rgba(50,40,90,.35)');g.fillStyle=lg(g,421,0,428,0,['#b8b0a0','#f0eade','#a8a094']);g.fillRect(421,92,7,14);oval(g,424.5,92.2,3.5,1.6,'#f0eade');for(const y of[96,98.4,100.8])R(g,422.6,y,3.8,.6,'#8a8474');
  /* the road, paved as far as the trough */
  pave(g,0,103,480,144,'#d9caa2',r,{vx:230,vy:60,rows:5,step:36,v:.09});ao(g,0,103,119,5,'t',.3,'#4a3a60');
  comp(g,'soft-light',.55,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,236,190,0)','rgba(255,236,190,.95)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,122,104,138,112,0,114],SH,.6);shade(g,[262,104,480,104,480,108,268,108],SH,.4);
  /* a plane tree, the last deep shade before the climb */
  shade(g,[396,106,480,106,480,124,410,122],SH,.42);comp(g,'screen',.3,()=>{for(let i=0;i<26;i++)oval(g,404+r()*72,107.5+r()*14,1.4+r()*2.6,.5+r()*.7,'#fff0c8')});
  stroke(g,[461,104,460,84,463,66,459,50],'#6a5a48',4);stroke(g,[462,104,461.4,84,464.4,66,460.4,50],'#a8987e',1.2);stroke(g,[461,72,450,58,440,52],'#6a5a48',2);stroke(g,[462,64,472,52,478,46],'#6a5a48',2);
  foliage(g,452,40,30,14,'#5a8448',r,220);foliage(g,474,30,18,12,'#679252',r,110);foliage(g,430,50,16,8,'#4f7840',r,70);
  pool(g,250,0,300,150,'#fff0c0',.16,'screen');ao(g,0,0,110,144,'l',.1,'#2a2050')},
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
const RIV=[230,60,248,60,256,78,270,104,284,144,194,144,204,104,222,78],NEAR=[193,99],FAR=[281,99];
ART.ford={w:480,fp:1.25,
 light:()=>({amb:'#e2e4f0'}),
 paint(g){const r=rng(347),LS='#b9b0a4',GR='#b4aa96';
  sky(g,480,46,['#5088c8','#8fb8e0','#d0e0ea']);cloud(g,236,12,46,6,r);
  /* far peaks through the gap of the gorge */
  snowy(g,150,340,44,x=>16+12*Math.sin((x-150)/64*3.14)+4*Math.sin(x/9),['#a4b0cc','#c0c8d6'],19);comp(g,'screen',.3,()=>R(g,150,10,190,34,'#d0dcee'));
  /* the walls of the gorge: the cliff the river comes from, and a wall to either side */
  crag(g,[150,36,196,30,236,38,282,28,330,34,340,66,150,66],LS,r,{dip:.03});
  /* the floor of the gorge, running back to the foot of that cliff */
  stoneGround(g,150,62,190,106,tint(GR,-.14),r,110);ao(g,150,62,190,16,'t',.4,'#2a2848');
  crag(g,[0,0,150,0,166,10,172,30,160,52,176,74,168,104,0,104],tint(LS,-.08),r,{dip:.05,shade:'l'});
  crag(g,[330,0,480,0,480,104,316,104,304,80,318,56,308,30,322,10],tint(LS,.02),r,{dip:-.04,shade:'r'});
  shade(g,[0,0,150,0,166,10,172,30,160,52,176,74,168,104,0,104],SH,.42);
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
  stroke(g,[222,78,204,104,194,144],'rgba(240,250,250,.7)',.8);stroke(g,[256,78,270,104,284,144],'rgba(240,250,250,.7)',.8);
  /* the banks: rock and gravel */
  clipTo(g,()=>{g.beginPath();g.moveTo(0,104);g.lineTo(204,104);g.lineTo(194,144);g.lineTo(0,144);g.closePath()},()=>stoneGround(g,0,104,206,144,GR,r,150));
  clipTo(g,()=>{g.beginPath();g.moveTo(270,104);g.lineTo(480,104);g.lineTo(480,144);g.lineTo(284,144);g.closePath()},()=>stoneGround(g,268,104,212,144,GR,r,150));
  poly(g,[0,112,150,110,196,116,192,132,0,136],'rgba(226,212,176,.4)');poly(g,[280,116,330,110,480,112,480,134,286,132],'rgba(226,212,176,.4)');
  ao(g,0,104,480,6,'t',.3,'#3a3460');shade(g,[0,104,170,104,186,116,0,122],SH,.5);
  /* the two posts of the guide rope, set in the rock */
  for(const[x]of[NEAR,FAR]){oval(g,x+2,110.4,5,1.3,'rgba(30,26,50,.4)');poly(g,[x-2.6,110,x-2,99,x+2,99,x+2.8,110],'#6a5238');poly(g,[x-2.6,110,x-2,99,x-.6,99,x-1,110],'#9a7c54');R(g,x-2,99,4,.6,'#b8986a');rock(g,x-6,111,7,4,'#9a9284');rock(g,x+6,111.4,6,3.4,'#8e8678')}
  rock(g,40,108,22,12,'#a8a092');rock(g,150,107,16,9,'#9c9486');rock(g,330,108,18,10,'#a39b8d');rock(g,444,107,24,13,'#a8a092');
  pool(g,240,30,150,90,'#fff4d8',.18,'screen');ao(g,0,0,100,144,'l',.16,'#20203c');ao(g,400,0,80,144,'r',.1,'#20203c')},
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
ART.pisidia={w:480,fp:1.3,
 paint(g){const r=rng(367),LS='#e2d8c0',MB='#eee6d2',W='#e8dab4';
  sky(g,480,70,['#3470c4','#629ad8','#9ec2e6','#d8e6ee']);cloud(g,96,9,54,7,r);cloud(g,262,16,46,6,r);cloud(g,420,8,40,6,r);
  /* the mountains north-east of the city, white half way down */
  snowy(g,0,480,62,sultan,['#93a2c8','#b2bcd0','#ccd0cc'],34);comp(g,'screen',.26,()=>R(g,0,6,480,58,'#d0dcee'));
  /* the street we came by, running down to the south gate. A house front stands across its far end, its roof at the level the paving runs to */
  R(g,0,40,58,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,30,58,74);g.clip();sky(g,480,80,['#629ad8','#d8e6ee']);
  R(g,22,65,10,39,'#d6d0c2');R(g,22,63,10,2.4,'#b8603c');R(g,22,72.4,10,1.6,'rgba(60,50,90,.2)');
  for(const[hx,hy,hw,hh,c]of[[0,44,16,60,'#d6caa8'],[40,50,18,54,'#e2d6b4'],[14,58,10,46,'#c8bc9c'],[30,62,10,42,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[16,104,40,104,31,74,25,74],'#e0d6ba');ao(g,0,30,58,12,'t',.2,'#2a2440');g.restore();
  /* the wool market: a stoa with a tiled roof, shops in its shade */
  for(let i=58;i<246;i+=5.5){R(g,i,26,5,8,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,26,5,.7,'#e08a60');R(g,i+4.5,26,.6,8,'#7a3620')}
  g.fillStyle=lg(g,0,34,0,40.5,['#fdf8ea','#e8dfc8','#c4bca6']);g.fillRect(58,34,188,6.5);for(let i=60;i<246;i+=4)R(g,i,37.4,2,1.6,'#cfc6b0');
  plaster(g,58,40.5,188,63.5,'#b8ac92',r,{patch:3,cracks:4,brick:'#8a7a62',t:.4});comp(g,'multiply',.75,()=>R(g,58,40.5,188,63.5,'#a8a8cc'));
  for(let x=70;x<236;x+=56){R(g,x-2.5,53.5,25,50.5,'#8a8296');arch(g,x,56,20,48,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');ao(g,x,56,20,14,'t',.6)}
  for(let x=60;x<246;x+=28){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cbc2ac',MB,'#fffbee','#dbd2bc','#aaa4a0']);g.fillRect(x,42.5,7,59);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,44,.5,56,'rgba(120,112,104,.28)');R(g,x-1.2,40.5,9.4,2.6,MB);R(g,x-1.2,42.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#dfd6c0');R(g,x-1.2,100.4,9.4,.6,'#fffbee')}
  /* the wool stall: fleeces on the bar, bales beside the table, lengths of dyed cloth on it */
  shade(g,[96,104,186,104,194,112,104,112],SH,.55);wood(g,98,50,2.4,56,'#6a4e2c',1);wood(g,181,50,2.4,56,'#6a4e2c',1);wood(g,96,52.4,90,2,'#7a5c36');awning(g,95,43,92,9,'#8a3f3a','#e6dcc4',8);
  [108,121,134,147,160,172].forEach((x,i)=>{const c=i%3===0?'#efe8d8':i%3===1?'#d8ccb4':'#8a7a66';g.fillStyle=lg(g,x-4,0,x+5,0,[tint(c,-.25),c,tint(c,.2),tint(c,-.2)]);g.beginPath();g.ellipse(x+.5,62,4,7.6,0,0,6.2832);g.fill();
    for(let j=0;j<6;j++)oval(g,x-2+r()*5,56+r()*12,1.1,.8,tint(c,r()<.5?.25:-.18))});
  R(g,106,94,66,11,'rgba(40,30,60,.4)');wood(g,106.6,94,3,11.5,'#6a4e2c',1);wood(g,166,94,3,11.5,'#6a4e2c',1);wood(g,103.5,88,69,4.4,'#96703e');R(g,103.5,92,69,1.2,'#5a4226');
  ['#8a3f3a','#3f5a7a','#c9a23a','#5a7a5a','#6a3458'].forEach((c,i)=>{const sx=110+i*11.6;g.fillStyle=lg(g,0,82.6,0,88,[tint(c,.3),c,tint(c,-.4)]);g.fillRect(sx,82.6,9,5.4);for(let k=0;k<9;k+=2)R(g,sx+k,82.6,.5,5.4,'rgba(0,0,0,.2)');oval(g,sx,85.3,1.4,2.7,tint(c,.15));oval(g,sx+9,85.3,1.4,2.7,tint(c,-.35))});
  sack(g,180,106,7.6,13,'#efe8d8');sack(g,192,107,6.6,11,'#e2d8c4');sack(g,186,97,6,8.6,'#d8ccb4');
  /* Joel's house: plaster and a blue door, a vine over it */
  house(g,246,22,88,82,W,r,{side:0,patch:3,cracks:5,beams:11});windowArt(g,258,36,11,12,W,{bars:2,wood:'#6a4e2c'});windowArt(g,312,36,11,12,W,{bars:2,wood:'#6a4e2c'});
  R(g,283,58,34,46,'#d8caa4');doorArt(g,286,61,28,43,'#3f5a7a',r);R(g,282,102.6,36,1.6,'#e6dcc2');
  stroke(g,[318,104,319,84,317,66,321,54],'#5a4630',1.2);foliage(g,304,53,17,5,'#5f8a4a',r,60);foliage(g,322,60,5,9,'#527c40',r,26);
  /* the synagogue: dressed stone, two steps and a door */
  house(g,334,26,104,78,LS,r,{stone:{bw:12,bh:6,v:.07,t:.3},beams:0});windowArt(g,346,40,10,10,LS,{bars:2});windowArt(g,416,40,10,10,LS,{bars:2});
  R(g,364,52,44,5.4,'#f1e8d0');R(g,364,52,44,.6,'#fffbee');R(g,364,57,44,.8,'#a59c86');R(g,367,57.8,38,46.2,'#d2c7aa');doorArt(g,371,60,30,44,'#6a4a2c',r);
  R(g,361,102,50,2.4,'#e6dcc2');R(g,361,102,50,.6,'#fffbee');R(g,357,104.2,58,2.6,'#dcd1b6');R(g,357,104.2,58,.6,'#fbf3dc');R(g,357,106.6,58,.8,'rgba(60,50,90,.4)');
  vessel(g,348,106,5.6,17,'#a05a34','pithos');shade(g,[334,104,357,104,351,110,334,110],SH,.4);
  /* the east gate, and the road to Iconium */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48,{...GATE5,seed:5,hz:66,sky:[70,['#3470c4','#629ad8','#9ec2e6','#d8e6ee']]});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#ddd4bc',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,58,103,422,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[58,104,246,104,252,108,64,108],SH,.4);shade(g,[433,104,438,104,452,110,440,110],SH,.6);shade(g,[0,104,58,104,58,107,0,110],SH,.5);
  pool(g,220,0,300,160,'#fff4d0',.14,'screen');ao(g,380,0,100,144,'r',.07,'#2a2050')},
 fore(g){const r=rng(368);/* bales of wool at the street's edge, and the base of a column */
  g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  sack(g,62,150,14,20,'#b8b0a0');sack(g,88,152,11,16,'#a8a090');vessel(g,508,152,10,28,'#5a2e1e','amph',{noShadow:1});sack(g,484,150,9,14,'#b0a898');
  comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){/* the drover's panniers of salt fish; in the week, the tentmaker's bench by Joel's door; on the next Sabbath, nearly all the city */
  for(const x of[204,220]){vessel(g,x,108,6,8,'#7a6038','bowl',{noShadow:1});for(let i=0;i<7;i++)oval(g,x-4+i*1.3,99.6+(i%2)*.6,1.7,.7,i%2?'#aab4bc':'#8a949c')}
  if(F.spoke1&&!F.out){R(g,256,100,26,7,'rgba(40,30,60,.35)');wood(g,256.6,97,2.6,9,'#5a4226',1);wood(g,279,97,2.6,9,'#5a4226',1);wood(g,254,93.6,30,3.4,'#96703e');R(g,254,96.6,30,.8,'#5a4226');
    g.fillStyle=lg(g,0,89,0,94,['#3e3229','#2a211c','#17110e']);g.fillRect(257,89.6,22,4);poly(g,[279,90,286,96,286,101,279,94],'#241c18');for(let i=0;i<22;i+=2.4)R(g,257+i,89.6,.5,4,'rgba(255,240,210,.08)')}
  if(G.crowd)CROWD.forEach(([id,x,y,d],i)=>man(g,x,y+((Math.floor(t/900)+i)%7===0?-.5:0),id,d,0,null,0,7))},
 front(){}};
/* ---------- Antioch in Pisidia: inside the synagogue ---------- */
ART.synp={w:320,
 light:()=>({amb:'#d6ccc4',lamps:[[98,54,44,'#5a3a14'],[222,54,44,'#5a3a14']]}),
 paint(g){const r=rng(383),ST='#d4c9ae',W='#dcd0b4';
  ashlar(g,0,0,320,104,W,r,{bw:22,bh:9,v:.06,t:.4});for(let i=10;i<320;i+=30)wood(g,i,0,6,7,'#5a4226',1);wood(g,0,7,320,2.4,'#6a4e2c');ao(g,0,9.4,320,12,'t',.42,'#2a2030');
  /* three high windows */
  for(const x of[58,153,248])windowArt(g,x,20,14,16,W,{dark:'#bfe0f4',bars:2,wood:'#6a4e2c'});
  /* two pilasters, a lamp on a bracket beside each */
  for(const x of[112,202]){g.fillStyle=lg(g,x,0,x+8,0,['#bdb39a','#f2ead2','#d8ceb4','#a49c88']);g.fillRect(x,12,8,92);R(g,x-1.4,10,10.8,3,'#f4ecd6');R(g,x-1.4,100,10.8,4,'#cfc5aa');R(g,x-1.4,100,10.8,.6,'#f4ecd6')}
  for(const x of[92,216]){poly(g,[x,58,x+12,58,x+12,59.6,x+9,63.4,x+3,63.4,x,59.6],'#bdb196');R(g,x,58,12,.6,'#f0e6cc');poly(g,[x+3,63.4,x+9,63.4,x+8,64.6,x+4,64.6],'#9a917c');
    R(g,x+3,55.6,6,2.4,'#b8733c');R(g,x+3,55.6,6,.6,'#e0a064');R(g,x+8.6,54.6,2,1.4,'#b8733c')}
  /* the chest of the scrolls. It is no part of the building: a chest that is carried in and put in position for worship (Insight,
     "Synagogue"). So it stands free on a low stand against the wall, a ring at either end to carry it by (square, so that no small round shape turns into a plus), and a blue cloth laid over its lid.
     Nothing crosses it: the planks run its whole length, the cloth covers its whole lid, and the stand has no rail between its legs. */
  shade(g,[29,104,65,104,72,109,36,109],SH,.5);R(g,31,84,33,20,'rgba(40,30,60,.22)');
  wood(g,33.6,87,3,17,'#5a4226',1);wood(g,57.4,87,3,17,'#5a4226',1);wood(g,31,84.6,32,3,'#7a5c36');R(g,31,84.6,32,.6,'#b89460');R(g,31,87,32,.6,'#3e2c18');
  g.fillStyle=lg(g,0,68,0,84.6,['#96703e','#7e5a30','#5e4022']);g.fillRect(33,68,28,16.6);inRect(g,33,68,28,16.6,()=>tex(g,'wood',.5,33,68,28,16.6,'overlay',.5));
  for(const y of[73.6,79])R(g,33,y,28,.6,'#3a2414');R(g,33,68,1,16.6,'#a88250');R(g,60,68,1,16.6,'#4a3220');
  for(const x of[36,55]){R(g,x-.5,75,4,3.5,'#3a2414');R(g,x,74.5,3,3,'#d8b860');R(g,x,74.5,3,.5,'#f0d890');R(g,x+1,75.5,1,1,'#5e4022')}
  poly(g,[31.4,71,31.8,66.6,35,64,47,63.2,59,64,62.2,66.6,62.6,71,58,70,52.6,71.4,47,70,41.4,71.4,36,70]);g.fillStyle=lg(g,0,63,0,71.4,['#6c8cae','#4a6a8c','#34506e']);g.fill();
  stroke(g,[32,66.6,35,64.2,47,63.5,59,64.2,62,66.6],'#9cb8d4',.6);
  /* benches of stone in two steps along the wall, where the people sit */
  const bench=(x,w,y)=>{R(g,x,y+3,w,104-y-3,'rgba(40,30,60,.25)');R(g,x,y,w,3.4,ST);R(g,x,y,w,.7,'#f0e6cc');R(g,x,y+3.4,w,104-y-3.4,'#b4a88c');R(g,x,y+3.4,w,1,'rgba(60,50,80,.35)')};
  bench(214,66,80);bench(206,74,90);
  /* the seats of the presiding officers, beside the chest and facing the people */
  R(g,72,71,38,18,'#d6cbb0');R(g,72,71,38,1,'#f4ead0');bench(70,42,88);for(const x of[70,89.4,108.6]){R(g,x,78,3.4,10,'#bdb196');R(g,x,78,3.4,.8,'#efe4c8')}
  /* the door to the square */
  R(g,283,50,30,54,'#cfc3a6');doorArt(g,286,53,24,51,'#6a4a2c',r);
  /* stone flags, and the platform for the reading with its desk */
  pave(g,0,103,320,144,'#c4b89c',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  R(g,122,108,92,3,'rgba(30,20,40,.4)');poly(g,[124,98.6,208,98.6,214,103,118,103],'#a47a48');wood(g,118,103,96,5,'#8a6238');R(g,118,103,96,.6,'#c89a5c');
  poly(g,[156,99,176,99,174,86,158,86],'#6a4a2c');R(g,156,97.6,20,1.4,'#4a3220');poly(g,[154.6,86,177.4,86,175.4,82.6,156.6,82.6],'#8a6238');R(g,156.6,82.6,18.8,.6,'#c89a5c');
  R(g,159.4,83.2,13.2,2.2,'#ecdcb0');R(g,158.2,82.8,1.8,3,'#8a5a2c');R(g,172,82.8,1.8,3,'#8a5a2c');
  /* daylight from the windows, lamplight from the brackets */
  lightmap(g,320,'#9c9288',l=>{for(const x of[65,160,255]){pool(l,x,28,24,24,'#fff4d8',1);l.fillStyle=lg(l,0,36,0,140,['rgba(255,240,200,.42)','rgba(255,240,200,0)']);poly(l,[x-7,36,x+7,36,x+(x<160?40:x>160?-24:22),140,x+(x<160?-14:x>160?-78:-22),140]);l.fill()}
    for(const x of[98,222])pool(l,x,54,36,32,'#ffc070',.8);pool(l,160,120,150,44,'#fff0d8',.4)})},
 fore(g){/* the backs of the nearest bench */
  R(g,0,138,104,6,'#3a3028');R(g,0,138,104,.8,'#7a6a58');R(g,216,138,104,6,'#3a3028');R(g,216,138,104,.8,'#7a6a58')},
 draw(g,t){for(const x of[92,216]){flame(g,x+8.6,54.2,t+x*7);pool(g,x+9,52,8+Math.sin(t/190+x),6,'#ffb050',.14)}},
 front(){}};
/* ---------- Outside the boundaries of Antioch: the road to Iconium ---------- */
ART.border={w:320,
 paint(g){const r=rng(397);
  sky(g,320,84,['#3a76c6','#70a4da','#b0cde8','#e4e8e0']);cloud(g,236,14,70,10,r);cloud(g,120,26,46,6,r);cloud(g,300,32,34,5,r);cloud(g,40,10,36,5,r);
  snowy(g,0,320,76,x=>20+10*Math.sin(x/47+4)+5*Math.sin(x/17)+2*Math.sin(x/6),['#97a6ca','#b6c0d2','#d0d4cc'],19);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,40,0,78,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(0,40,320,38)});
  /* Antioch behind us, on its rise: the wall, the east gate, the roofs */
  ridge(g,0,170,80,x=>Math.max(0,16-x*x/1500+1.6*Math.sin(x/9)),['#a8ac86','#b8b890']);
  ashlar(g,4,62,112,14,'#e2d6b8',r,{bw:9,bh:4,v:.07,t:.25});for(let i=4;i<116;i+=7)R(g,i,59,4,3.4,'#e2d6b8');
  R(g,78,54,14,22,'#ece2c6');for(let i=78;i<92;i+=5)R(g,i,51,3,3.4,'#ece2c6');R(g,89,54,3,22,'#bcb8c0');arch(g,81.6,64,6.8,12,'#4a4050');
  for(const[hx,hy,hw,hh]of[[12,54,16,8],[36,50,18,12],[58,55,12,7]]){R(g,hx,hy,hw,hh,'#ece2c6');R(g,hx,hy-2,hw,2.2,'#b8603c');R(g,hx+hw-3,hy,3,hh,'#bcb8c0')}
  /* the high plain in spring: fields and fallow, a line of poplars along a stream */
  g.fillStyle=lg(g,0,76,0,108,['#c8c08c','#cdbf7e','#c4b470']);g.fillRect(0,76,320,32);tex(g,'mott',.5,0,76,320,32,'overlay',1);
  for(let i=0;i<9;i++){const fx=r()*300,fy=79+r()*20;poly(g,[fx,fy,fx+34,fy-1.6,fx+42,fy+7,fx+4,fy+9],i%3===0?'rgba(150,120,70,.32)':i%3===1?'rgba(226,206,120,.4)':'rgba(120,150,84,.3)')}
  for(let i=0;i<9;i++)cypress(g,206+i*9+r()*3,92-i*.5,12+r()*5,'#5a7a4a');stroke(g,[198,94,242,91,292,89],'rgba(120,170,200,.6)',1);
  poly(g,[85,76,89,76,120,92,200,106,150,106,96,90],'#e4d6ae');
  /* the road, and the verge nearest us */
  g.fillStyle=lg(g,0,106,0,128,['#d6c69c','#e8dab2','#dccca2']);g.fillRect(0,106,320,22);tex(g,'mott',.45,0,106,320,22,'overlay',1);R(g,0,106,320,.8,'#a89a74');
  for(let i=0;i<60;i++){const sx=r()*320,sy=108+r()*18;oval(g,sx,sy,1+r()*1.6,.5+r()*.4,r()<.5?'#bcae86':'#f0e4c0')}
  for(let i=0;i<2;i++)stroke(g,[0,114+i*7,100,113.6+i*7,220,114.6+i*7,320,114+i*7],'rgba(150,130,90,.35)',.8);
  g.fillStyle=lg(g,0,127,0,144,['#a8a868','#909a58','#788648']);g.fillRect(0,127,320,17);tex(g,'mott',.5,0,127,320,17,'overlay',1);
  for(let i=0;i<200;i++){const sx=r()*320,sy=128+r()*16;stroke(g,[sx,sy,sx+(r()-.5)*2,sy-2-r()*3],r()<.5?'#c8c080':'#6a7a44',.5)}
  /* the boundary stone of the city */
  oval(g,104,108.4,9,1.6,'rgba(50,40,90,.4)');g.fillStyle=lg(g,97,0,109,0,['#aaa294','#ece6d8','#d0c8b8','#928a7e']);g.fillRect(97,90,12,18);g.beginPath();g.ellipse(103,90.2,6,3,0,Math.PI,0);g.fill();
  for(const y of[93.6,96,98.4])R(g,99.6,y,6.8,.6,'#8a8474');tex(g,'mott',.4,96,86,14,22,'overlay',1);
  shade(g,[108,108,112,108,126,112,116,112],SH,.5);
  pool(g,220,10,240,140,'#fff4d0',.15,'screen')},
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
  town1:{skin:'#c49064',hair:'#3a2616',beard:'#3a2616',tunic:'#c07a3a',belt:'#3a2414',ph:0},town2:{skin:'#b8845a',hair:'#2a1a12',tunic:'#7a8a9a',cloak:'#c8b890',long:1,belt:'#4a3a24',ph:0},
  town3:{skin:'#c89a70',veil:'#a8503a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},town4:{skin:'#a8703f',wrap:'#3f6a8a',beard:'#5a5a5a',tunic:'#8a7a5a',belt:'#2e2016',ph:0},
  town5:{skin:'#c08c5c',hair:'#6a5a4a',tunic:'#e2dccb',cloak:'#7a3434',long:1,belt:'#4a3a24',ph:0},town6:{skin:'#c49268',veil:'#5a7a5a',tunic:'#4f7480',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0}});
/* CROWD: the people who fill the square on the second Sabbath: a look for each, and where he or she stands */
const CROWD=[];for(let i=0;i<20;i++)CROWD.push(['town'+(i*5%6+1),142+i*10.6+(i%3)*1.6,i%2?107.6:111.4,1]);
const BN=actor('barnabas','Barnabas','#f0b070',128),MK=actor('mark','John Mark','#b8e0b0',176),PA=actor('papias','Papias','#f0b088',112),EU=actor('eumenes','Eumenes','#a8e0d8',140),
  JO=actor('joel','Joel','#e8d890',120),HA=actor('hanan','Hanan','#e8c0c8',98),AM=actor('ammia','Ammia','#e0c8f0',196),SN=actor('straton','Straton','#f0d0b0',104);
Object.assign(ICON,{
  thong(g){stroke(g,[4,7,8,5,13,7.4,18,5.6,20.4,8,17,12,11,11,6,13.6,4.4,17,8,19.6,14,18,19.6,19.4],'#3a2414',3);stroke(g,[4,7,8,5,13,7.4,18,5.6,20.4,8,17,12,11,11,6,13.6,4.4,17,8,19.6,14,18,19.6,19.4],'#a8703c',1.6);
    stroke(g,[4.4,6.6,8,4.6,13,7,18,5.2],'#d09a5e',.5)},
  bread(g){g.fillStyle=lg(g,0,7,0,17,['#e8c078','#c9a060','#8a6630']);g.beginPath();g.ellipse(10.4,12,7.8,4.8,0,0,6.2832);g.fill();for(const x of[7,10.4,13.8])stroke(g,[x-1,10.2,x+1,13.6],'#8a6630',.7);
    for(const[x,y]of[[16,17.4],[19,15.6],[18.6,19.2]]){oval(g,x,y,2,1.7,'#5a3458');oval(g,x-.5,y-.5,.7,.6,'#8a5a86')}},
  roof(g){IH.square(g,'#221a16',3.6,7,16.8,11);g.strokeStyle='#8a7a5a';g.lineWidth=1;g.strokeRect(3.6,7,16.8,11);
    for(const[x,y]of[[2.4,5.8],[19.2,5.8],[2.4,16.8],[19.2,16.8]]){g.strokeStyle='#b8a880';g.lineWidth=.9;g.beginPath();g.arc(x+1.2,y+1.2,1.6,0,6.2832);g.stroke()}R(g,3.6,12,16.8,.7,'#3e3229')},
  line(g){IH.coil(g,['#5a4a38','#7a664c','#5a4a38','#84705a'],12,8.4,7.4,2.6,2.7);stroke(g,[18.6,17,21,19,21.6,21.6],'#7a664c',1.4)}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#3e2a16',2.6);stroke(g,[4.2,20.2,18.6,3.2],'#a8804e',1);stroke(g,[5.4,20.8,19.6,4],'#5a3c20',.6);
  R(g,17.4,3,2.6,2.6,'#6a4a2a');R(g,3.4,19.8,2.2,2.2,'#2a1c10')};
Object.assign(ITEMS,{
  staff5:{name:"Barnabas's staff",icon:'staff',look:"Barnabas's walking staff, stout olive wood. It walked the length of Cyprus, and it is not tired yet.",
    by:{barnabas:'My walking staff. On a mountain road it is a third leg.'}},
  bread:{name:'bread and figs',look:'The food bag: flat loaves and dried figs. John Mark packed it, and packed it well.',
    by:{barnabas:'Bread and figs. My cousin packed them.'}},
  thong:{name:'leather thong',look:'A long thong of ox-hide, supple and new. John Mark bought it in Paphos, against the day a sandal gave way.',
    by:{barnabas:'A strip of ox-hide. In my hands it is only that.'}},
  roof:{name:'tent roof',look:"The roof I sewed for a ship's deck at Seleucia: goat-hair cloth, with a tarred rope in its edge. It has kept the dew off us ever since.",
    by:{barnabas:'The roof Paul sewed at Seleucia. I have slept dry under it from one end of Cyprus to the other.'}},
  line:{name:'tarred rope',look:'The rope out of the edge of our roof: tarred against the sea, and long enough to go right round a tent.',
    by:{barnabas:'The rope out of our roof. I hope Paul knows what he is doing.'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup5) */
const BY5={awl:"The tentmaker's awl. I have seen it open a seam, a sandal and a rope.",thread:'Waxed linen thread, and strong.',
  knife:'A knife for cloth and leather. I would only spoil good cloth with it.',tablets:'His wax tablets: people, work and Scripture, in a small hand.'};
const inPerga=()=>G.room==='perga',inFord=()=>G.room==='ford',inAnt=()=>G.room==='pisidia'||G.room==='synp',inOut=()=>G.room==='border',
  week=()=>!!F.spoke1&&!F.out,allThree=()=>!!(F.eum&&F.joel&&F.pap),other=()=>PC()===P?BN:P;
/* toPaul: something handed to Paul, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function dropAll(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* The rope sewn into the edge of the roof at Seleucia comes out again, stitch by stitch, at the ford. */
async function unpick(){
  if(!inFord())return say(P,'Take our roof to pieces? We will want it every night on that mountain.');
  SFX.cut();await say(P,'Stitch by stitch, the way it went in. I sewed this rope into the edge to hold a roof on a deck...');SFX.cut();await wait(700);
  delItem('roof');addItem('line',1);F.gotLine=1;SFX.good();
  await say(P,'...and out it comes: tarred, sound, and long enough. The cloth will still make a blanket. The rope has better work to do.')}
/* The parted guide rope is made whole with a long splice, the awl opening the strands. */
async function splice(){
  SFX.sew();await say(P,'The awl to open the strands, each one laid into its neighbor, and every end tucked under three times...');SFX.sew();await wait(800);
  delItem('line');F.spliced=1;SFX.good();
  await say(P,'A long splice. It will run through a hand without catching, and it is as strong as the rope on either side of it.');
  await say(P,'Long enough to reach the far post now. But a rope does not cross a river by itself.',TH)}
const needRope=()=>say(P,'The rope wants joining to the half that is left on the post. That is where it will do some good.');
Object.assign(COMBO,{
  'knife+roof':unpick,'awl+roof':unpick,'roof+thread':()=>say(P,'It needs no mending. I sewed it to last.'),
  'awl+line':needRope,'line+thread':needRope,'knife+line':()=>say(P,'Cut it? I shall need every span of it.'),
  'awl+thong':()=>say(P,'The thong wants a sandal to go into. And the sandal is on a foot.'),'thong+thread':()=>say(P,'The thong wants a sandal to go into. And the sandal is on a foot.'),
  'knife+thong':()=>say(P,'It is the right length for a strap as it is. I will not shorten it.'),
  'bread+knife':()=>say(P,'I will break the bread when it is time to eat it.'),'line+roof':()=>say(P,'I have only just parted them.'),
  'line+thong':()=>say(P,'Leather to rope? No. Each has its own work.'),'roof+thong':()=>say(P,'The roof has loops enough. The thong is for a sandal.')});
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
const BARN5={noCraft:"That is the tentmaker's trade, not mine. I would only spoil it.",
  def:{look:'I see nothing there that needs me.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',
    use:"That is the tentmaker's trade, not mine.",open:'It does not open.',talk:'I would get no answer.',give:'First I should choose something to give.'}};
/* go5: through a door. The two men keep together, so the other follows. */
async function go5(room,x,y,dir){SFX.door();await fade(1);enterRoom(room,x,y,dir);place5(room);place(other(),room,x-dir*26,y+3,dir);await fade(0)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line] pairs. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1]):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* mendSandal: Barnabas's strap, parted on the roads of Cyprus, gets a new thong before the climb. */
async function mendSandal(it){if(!inPerga()||F.shod||!['thong','awl','thread'].includes(it))return false;
  const his=invOf(BN),i=his.indexOf('thong');if(i>=0){his.splice(i,1);toPaul('thong',1);await say(BN,'You will want this back, Paul. In my hands it is only a strip of ox-hide.')}
  if(!has('thong'))return say(P,'The strap has parted where it passes under the sole. Thread alone will not hold that: it wants a new thong of leather.');
  await say(P,'Sit on the edge of the trough, Barnabas, and give me that foot.');
  await Promise.all([walk(BN,236,112),walk(P,214,116)]);BN.dir=-1;P.dir=1;BN.bow=true;
  SFX.sew();await say(P,'The old strap out, the new thong through the sole, and a stitch to lock it at either side...');SFX.sew();await wait(700);
  BN.bow=false;delItem('thong');F.shod=1;SFX.good();
  await say(BN,'It grips like a new one. You should have been a sandal maker, Paul.');
  await say(P,'A tentmaker works in leather as well as in cloth. Now you will keep up with any donkey on that road.')}
/* Paul, as Barnabas sees him and talks to him */
const PAUL5={name:'Paul',actor:P,as:{barnabas:{
  look:()=>say(BN,inPerga()?'Paul. He has not taken his eyes off those mountains since we came out of the gate.':inFord()?'Paul. Give him a broken thing and he grows calm. I have seen it before.'
    :inOut()?'Paul. Put out of the city like a thief, and already looking down the road to the next one.':'Paul. The climb has left its mark on him, and he will not hear of resting.'),
  give:async it=>{if(it!=='thong')return false;const inv=invOf(BN),i=inv.indexOf('thong');if(i>=0)inv.splice(i,1);toPaul('thong');return say(BN,'Take this, Paul. In your hands it is a sandal strap; in mine it is a strip of ox-hide.')},
  talk:()=>talkTree([
    {q:'What can I do to help?',a:()=>say(P,inPerga()?(!F.metPap?'Ask the drover about the road. You have a way with strangers that I lack.':!F.markTold?'Speak to your cousin. He will say to you what he will not say to me.'
        :!F.shod?'Sit down, and let me see to that sandal.':'Nothing more. The road is waiting.')
      :inFord()?(!F.spliced?'Keep the others calm while I see to this rope.':!F.lineUp?'Carry the end across for me. You have a staff, and I have none.':!F.crossed?'Stay where you are and watch the far post. I will send them over to you.':'Lead the way up to the pass.')
      :inOut()?(!F.cheered?'Stand with me while I speak to them. They are your disciples as much as mine.':'Nothing more. We have a gesture to make, and a road to walk.')
      :(!F.spoke1?'Sit beside me, and wait with me to be asked.':!F.joel?'Talk to Joel. Something weighs on him, and it is you he trusts with it.':!allThree()?'Pray for me, brother. There are more questions in this square than I have answers ready.':'Stand beside me on the Sabbath.'))},
    {q:'They listen to you now, Paul, more than to me.',once:1,a:async()=>{await say(P,'Does that trouble you, Barnabas? You were named first when we were sent out.');await say(BN,'Trouble me? I have waited to see it ever since I fetched you from Tarsus. Speak, and I will stand beside you.')}},
    {q:'I will leave you to it.',bye:1}]),
  show:{staff5:()=>say(P,inFord()&&F.spliced&&!F.lineUp?'Your staff! A third leg against that current. You are the man to carry the rope over, Barnabas.':'Keep your staff by you, Barnabas. That road will ask a good deal of it.'),'*':'Keep it by you, Barnabas.'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'road',q:'They say no one climbs to the pass alone.',if:()=>inPerga()&&F.metPap},
  {id:'sandal',q:"Barnabas's sandal strap has parted.",if:()=>inPerga()&&!F.shod},
  {id:'mark',q:'John Mark has gone back to Jerusalem.',if:()=>F.markTold&&!inPerga()&&!inOut()},
  {id:'rope',q:'The guide rope at the ford has parted.',if:()=>inFord()&&!F.lineUp},
  {id:'sabbath',q:'How does a visitor come to speak in the synagogue?',if:()=>inAnt()&&!F.spoke1},
  {id:'again',q:'They have asked us to speak again next Sabbath.',if:()=>week()}];
/* ============ SCRIPTURE: the passages on the tablets. short: how a passage is named when it is offered as an answer.
   road: a passage for the journey, which is not among the answers when Paul speaks of the Christ. ============ */
const PASS={
  ps121:{ref:'Psalm 121:1, 2',short:'help from Jehovah',road:1,gist:'I look up toward the mountains and ask where my help will come from. It comes from Jehovah, who made heaven and earth.'},
  ecc4:{ref:'Ecclesiastes 4:9, 10',short:'two are better than one',road:1,gist:'Two are better off than one, since their toil brings them a good return; and if either falls, the other can lift his companion up.'},
  isa43:{ref:'Isaiah 43:2',short:'through the rivers',road:1,gist:'When your way leads through water, I will be at your side; when you cross rivers, they will not close over you.'},
  ps2:{ref:'Psalm 2:7',short:'you are my son',gist:'I announce what Jehovah has decreed: he told me that I am his son, and that today he has become my father.'},
  isa55:{ref:'Isaiah 55:3',short:'loyal love toward David',gist:'Turn your ear my way and draw near to me; if you listen, you will stay alive. I will gladly bind myself to you by a covenant that lasts forever, in keeping with my acts of loyal love toward David, which can be relied on.'},
  ps16:{ref:'Psalm 16:10',short:'not abandoned to the Grave',gist:'You will not abandon me to the Grave, nor let the one who is loyal to you see the pit.'},
  hab1:{ref:'Habakkuk 1:5',short:'you will not believe it',gist:'Search among the nations and mark what you see; gaze, and be struck with wonder. In your own days a thing will be done that you will find beyond belief, even when you are told of it.'},
  isa56:{ref:'Isaiah 56:3',short:'a word for the foreigner',gist:'If a foreigner has attached himself to Jehovah, let him not say that Jehovah is sure to set him apart from his people.'},
  isa49:{ref:'Isaiah 49:6',short:'a light of nations',gist:'To be my servant who lifts up the tribes of Jacob and brings back those of Israel who were kept safe is too little. I have made you a light of nations as well, so that salvation from me may reach the farthest parts of the earth.'}},
  ORDER=['ps121','ecc4','isa43','ps2','isa55','ps16','hab1','isa56','isa49'],TALK=ORDER.filter(k=>!PASS[k].road);
const label=k=>T('{ref}: {short}',{ref:T(PASS[k].ref),short:T(PASS[k].short)}),quote=k=>T('{text} ({ref})',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inAnt()||inOut()?'Named first when we were sent out. He lets me take the lead, and has never once made me feel it.':'A Levite of Cyprus, the Son of Comfort. On a mountain road he is worth two men.'},
    {name:'John Mark',note:()=>F.markTold?'He has left us, and returned to Jerusalem. He gave no reason, and he forgot nothing.':'The cousin of Barnabas, our attendant. He has been very quiet since we landed.',if:()=>inPerga()||inFord()},
    {name:'Papias',note:()=>F.pap?'A drover. He had never set foot in a synagogue. Now he carries the word along every road he walks.':'A drover of the mountain road, with salt fish for Antioch. No one climbs to the pass alone, he says.',if:()=>F.metPap},
    {name:'Eumenes',note:()=>F.eum?'No longer by the door. He brings the whole wool market with him.':'A wool merchant of Antioch, a Greek who fears God. In the synagogue he keeps to the place by the door.',if:()=>F.metEum},
    {name:'Joel',note:()=>F.joel?'He has opened his house to us, and will not shut it again whatever it costs him.':'A Jew of Antioch. We lodge under his roof, and I work at his door.',if:()=>F.spoke1},
    {name:'Hanan',note:()=>F.out?'He asked us to speak. A week later he could not bear to see who had come to listen.':'A presiding officer of the synagogue in Antioch. He asked us to speak.',if:()=>F.spoke1},
    {name:'Ammia',note:'A woman of high standing in Antioch, who fears God. Her husband is one of the leading men of the city.',if:()=>F.spoke1}],
  tasks:[
    {t:'Find out what the road to Antioch is like, and who is taking it.',if:()=>inPerga()&&!F.metPap},
    {t:'Find out what weighs on John Mark.',if:()=>inPerga()&&!F.markTold},
    {t:"Mend Barnabas's sandal before the climb.",if:()=>inPerga()&&!F.shod},
    {t:'Take the road north, with the pack train.',if:()=>inPerga()&&F.metPap&&F.markTold&&F.shod},
    {t:'Find rope enough to mend the guide rope.',if:()=>inFord()&&!F.gotLine},
    {t:'Join it to the half that is left on the post.',if:()=>inFord()&&F.gotLine&&!F.spliced},
    {t:'Get the end of the rope across the river.',if:()=>inFord()&&F.spliced&&!F.lineUp},
    {t:'Bring the pack train over.',if:()=>inFord()&&F.lineUp&&!F.crossed},
    {t:'Go on, over the pass.',if:()=>inFord()&&F.crossed},
    {t:'Go into the synagogue on the Sabbath, and take a seat.',if:()=>inAnt()&&!F.spoke1},
    {t:'Answer Eumenes: is this for a Greek?',if:()=>week()&&!F.eum},
    {t:'Joel is troubled. Barnabas is the one he trusts.',if:()=>week()&&!F.joel},
    {t:'Answer Papias: what is it to a drover?',if:()=>week()&&!F.pap},
    {t:'Speak again on the next Sabbath.',if:()=>week()&&allThree()},
    {t:'Strengthen the disciples before we go.',if:()=>inOut()&&!F.cheered},
    {t:'Shake the dust from our feet, and take the road to Iconium.',if:()=>inOut()&&F.cheered}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
/* ---------- Perga ---------- */
async function meetPap(me){F.metPap=1;
  await say(me,'Peace to you. Are those your animals? We are looking for the road to Antioch in Pisidia.');
  await say(PA,'You are looking at it. North across the plain, up through the mountains, and no short way round.');
  await say(PA,'Papias. I carry salt fish and oil up to Antioch, and wool down again. I leave when the heat breaks.');
  await say(PA,'And hear this, strangers. Nobody climbs to that pass alone. The hills are full of men who live by what other men carry.');
  await say(PA,'Walk with my train if you like. Company is the only wall that road has.');
  await say(PA,'But I take no one who cannot keep up. And every beast I have is loaded: what you bring, you carry.');
  await say(me,me===P?'Company for the road, then. Now: can we keep up with it?':'Company for the road. And what we bring, we carry.',TH)}
/* John Mark leaves them. The account gives no reason (Acts 13:13), so none is given here. */
async function parting(){F.markTold=1;const b=other();MK.dir=PC().x>MK.x?1:-1;
  await say(MK,'Brother Paul. Cousin. I have something to say, and I would rather say it here than on the road.');
  if(b.room===G.room)await walk(b,MK.x+(PC().x>MK.x?46:-46),MK.y+3);b.dir=MK.x>b.x?1:-1;
  await say(MK,'I am not going up into the mountains with you. I am going back to Jerusalem.');
  await say(BN,'Back? John Mark, we have only just landed.');
  await say(MK,'I know, cousin. I have turned it over ever since Paphos. I am going back.');
  await say(P,'I wish you would stay with the work, John Mark. I will say that once, and plainly.');
  await say(MK,'You have said it, brother Paul. I am still going.');
  await narr('There John parted from them and went back to Jerusalem. (Acts 13:13)',{dur:5200});
  await narr('The account does not say why.',{dur:3200});
  await say(MK,'Everything is counted. The bed rolls are in the bundles. Here is the roof, and the food bag: bread and figs.');
  toPaul('roof');toPaul('bread',1);
  await say(MK,'And this. A thong of ox-hide. I bought it in Paphos, for the day a sandal gave way. That road will find the weak place in every strap.');
  toPaul('thong');
  await say(BN,'Go safely, cousin. Greet your mother for me, and the brothers who meet in her house.');
  await say(MK,'I will see you onto the road first. It is the last thing I can do for you.');
  await walk(MK,84,121);MK.dir=1;
  await say(P,'He gave no reason. And even now he has forgotten nothing.',TH)}
async function breadForMark(it){if(it!=='bread'||!F.markTold)return false;
  if(F.bread)return say(MK,'You have given me my share already, brother Paul. More than my share.');
  await say(P,'You packed this bread for three, John Mark. A third of it is yours. It is a long way to Jerusalem.');
  F.bread=1;SFX.good();
  await say(MK,'I did not think you would... Thank you, brother Paul.');
  await say(P,'I have not changed my mind about the work. But no brother of mine starts a journey hungry.',TH)}
MK.hs={name:'John Mark',actor:MK,
  look:()=>say(P,F.markTold?'John Mark. He is going back to Jerusalem, and he is waiting to see us onto the road first.':'John Mark, the cousin of Barnabas. He stands by the bundles and looks at the ground.'),
  give:breadForMark,
  show:{thong:'Ox-hide, from the sandal makers of Paphos. Keep it. It was always meant for you two.',roof:'I rolled it dry this morning. Fold it the same way, or the rope edge will chafe the cloth.',
    bread:()=>say(MK,F.markTold?'It is yours now, brother Paul. I counted the loaves for the road north, not for mine.':'It is all in the food bag. I counted it this morning.'),
    tablets:'I used to think I would fill a set like that with everything I saw on this journey.',awl:'I will carry anything you like. But not that: it is yours.','*':'Shall I pack it with the rest? ...No. That is not mine to do any longer.'},
  ask:{road:'I heard him. You will be safer with his train than alone, both of you.',sandal:()=>say(MK,F.markTold?'That is what the thong is for. It will go through the sole where the old strap went.':'I saw it this morning. I have something for it, in the bundles.')},
  talk:()=>F.markTold?talkTree([
      {q:'How will you travel?',a:()=>say(MK,'Down to the coast, and by ship to Caesarea. I have my fare. I took nothing from the common purse.')},
      {q:'Is the baggage in order?',a:()=>say(MK,'Two bed rolls, the bundle, the roof, the food bag, the water flask. Count them each night. I always did.')},
      {q:'Go in peace, John Mark.',bye:1}])
    :parting(),
  as:{barnabas:{look:()=>say(BN,F.markTold?'My cousin. I have known him since he was a child in his mother\'s house. I will not stop hoping for him.':'My cousin. Something is on his mind, and it has been there since Paphos.'),
    talk:()=>F.markTold?say(MK,'Do not be angry with me, cousin. And do not let him be.'):parting(),
    show:{staff5:'You will need it up there, cousin. More than you did on Cyprus.','*':'It is not mine to pack any longer, cousin.'}}}};
async function leave5(){const me=PC();
  if(!F.metPap)return say(me,me===P?'Up into those mountains, the three of us? First I should learn what that road is like, and who else is taking it.':'I would not start up that road before I had asked a man who knows it.');
  if(!F.markTold)return say(me,me===P?'John Mark has not stirred from the bundles. Something is on his mind. I will not set out before I know what.':'My cousin has something to say: I can see it in him. Not before I have heard it.');
  if(!F.shod){await say(BN,me===P?'Go on like this, Paul, and by nightfall I shall be a day behind you. This sandal strap has parted.':'Not one more mile on this sandal. The strap has parted, and Paul has the hands to mend it.');
    return say(PA,'I told you. I take no one who cannot keep up.')}
  await say(PA,'The heat is breaking. Fall in behind the last beast, you two, and keep close!');return travel()}
PA.hs={name:'Papias',actor:PA,
  look:()=>say(P,inPerga()?'A drover, burnt as brown as his own harness. He checks every girth twice.':inFord()?'Papias. He looks at the river, and then at the rocks above the road, and then at the river again.'
    :inOut()?'Papias. He has left his panniers in the market to walk out here with us.':'Papias, among his panniers of salt fish. He sells as he walks: without a wasted word.'),
  show:{thong:'Good ox-hide. Your young man knew what he was buying.',roof:()=>say(PA,inFord()?'Goat-hair cloth, with a rope in the hem. A rope! How long is it?':'Goat-hair cloth. It sheds rain, and you will meet rain up there.'),
    line:'Tarred, and sound right through. Where did a tentmaker come by ship\'s rope?',bread:'Keep it for the pass. There is nothing to buy between here and the plateau.',
    awl:'I mend my own harness with a tool like that. Not half so well, I dare say.',knife:'Keep it sheathed around my beasts.',tablets:'Scratches. I keep my accounts in my head, where no one can rob them.','*':'It is your load, friend, not mine.'},
  ask:{road:['Alone, you are a purse on two legs. Twenty men and thirty beasts are another matter: they let us pass.','I have never lost a traveler who kept up. I cannot speak for the ones who fell behind.'],
    sandal:'Then he will not see the second milestone. Mend it or leave him. I do not wait on the road.',
    rope:'It parts every few years. Then we sit here until the water falls, or until someone braver than I am takes a new line across.',
    mark:'The boy with the bundles? A pity. He packed a load better than most drovers do.',
    sabbath:'In the Jews\' house of prayer? Do not ask a drover. Ask the wool merchant: he goes there every week.',
    again:()=>say(PA,F.pap?'I know. I will be there, and I will not be alone.':'So they say in the market. They talk of little else.')},
  talk:async()=>{
    if(inPerga()){if(!F.metPap)await meetPap(P);return talkTree([
      {q:'What do you carry up to Antioch?',a:async()=>{await say(PA,'Salt fish, oil, whatever the ships bring to the coast. Up on the plateau they want all of it.');await say(PA,'Antioch lies on the road between Ephesus and Cilicia. Half the trade of the country walks through its gates.')}},
      {q:'What is the road like?',a:async()=>{await say(PA,'Steep, and narrow wherever a river has cut it. And cold at the top: you will want every cloak you own.');await say(PA,'The town lies higher than any you have seen from the deck of a ship.')}},
      {q:'Who lives in Antioch?',a:()=>say(PA,'Greeks, Phrygians, and a good many Jews. They have their own house of prayer there. Everybody speaks Greek, and buys salt fish.')},
      {q:'We will be ready.',bye:1}])}
    if(inFord()){if(F.crossed)return say(PA,'On your feet, all of you! The pass by nightfall, if these beasts are willing.');
      if(F.lineUp)return crossAll();
      return talkTree([
        {q:'Is there no other crossing?',a:()=>say(PA,'Two days upstream, by a goat track no loaded beast can climb. This is the ford, tentmaker. There is no other.')},
        {q:'What is up in those rocks?',a:async()=>{await say(PA,'Eyes. A train that sits still for a night at this ford is a train that has been counted.');await say(PA,'They will not come down on thirty beasts and their drovers. Not by daylight.')}},
        {q:'I will see what can be done.',bye:1}])}
    if(inOut())return say(PA,F.cheered?'Go well, tentmaker. I shall have something better than salt fish to carry down to Perga.':'They cannot put a drover out of the city: I leave of my own accord every month. But you two!');
    if(week())return F.pap?say(PA,'The drovers\' yard has heard it all twice over. On the Sabbath you will see for yourself.'):drover();
    return talkTree([
      {q:'Where can two travelers sleep tonight?',a:()=>say(PA,'The drovers\' yard, behind the market. It has a wall and a well, and it costs nothing. Say that Papias sent you.')},
      {q:'How is trade?',a:()=>say(PA,'They were waiting for me at the gate. Salt fish does not climb mountains by itself.')},
      {q:'Peace to you, Papias.',bye:1}])},
  as:{barnabas:{look:'The drover. He has the eyes of a man who counts his beasts in his sleep.',
    talk:async()=>{if(inPerga()&&!F.metPap)return meetPap(BN);
      await say(PA,inPerga()?'When the heat breaks, I said. Be ready, and be shod.':inFord()?(F.lineUp&&!F.crossed?'You carried it over, friend! Now let your tentmaker send us across to you.':'A man who can stand in that water is worth three who can talk about it.')
        :inOut()?'You look glad, friend. Thrown out, and glad! I shall have to think about that.':week()&&!F.pap?'It is the tentmaker I want to ask. He talks, and I have a question for a talker.':'Good day to you, friend. No lame feet today?')},
    show:{staff5:'Olive wood. It will see you over the pass.','*':'It is your load, friend, not mine.'}}}};
EU.hs={name:'Eumenes',actor:EU,
  look:()=>say(P,inPerga()?'A traveler of some means, in a Greek mantle. He is going up with the pack train as we are.':inFord()?'Eumenes. He has not said a word since he saw the river.'
    :G.room==='synp'?'Eumenes, in the place nearest the door. He stands there like a man who has had it for years.':inOut()?'Eumenes. He walked out here beside us, in front of the whole city.'
    :F.eum?'Eumenes, at his stall. He has sold very little wool this week, and talked a great deal.':'Eumenes, the wool merchant, at home among his bales and fleeces.'),
  show:{tablets:()=>say(EU,'The Prophets of Israel, in wax? In the synagogue I hear them read, and I have never once held a line of them in my hand.'),
    roof:'Goat-hair. We sell sheep\'s wool in Antioch, but I know good cloth when I see it.',line:'You cut that out of your own roof? For people you met four days ago?',
    bread:'Keep it. I have my own, and the pass is long.',awl:'A craftsman\'s tool. I buy and sell what other men make. I envy you that.','*':'I deal in wool, friend. That is beyond my judging.'},
  ask:{road:'He is right. I never make this journey except with a train. I have a wife who expects me home.',
    rope:'I cannot swim, Paul. I may as well tell you so now.',
    mark:'The young man with the bundles? I wondered. He counted them twice before he let them go.',
    sabbath:['A visitor takes a seat, like anyone else. After the reading, the presiding officers may send word and ask him to speak.','They often do, when the visitor is a Jew from abroad. They would never ask me.'],
    again:()=>say(EU,F.eum?'I have told half the wool market. The other half heard it from them.':'I heard them ask. I asked for the same thing myself, at the door.')},
  talk:async()=>{
    if(inPerga()){if(!F.metEum){F.metEum=1;await say(EU,'Eumenes, of Antioch in Pisidia. I deal in wool, and I am going home. You are for the mountains too?');
        await say(P,'Paul, of Tarsus, a tentmaker. And this is Barnabas. We are bound for your city.')}
      return talkTree([
        {q:'What is Antioch like?',a:async()=>{await say(EU,'High, and cold at night. The air is like well water after this coast.');await say(EU,'We belong to the province of Galatia, and we stand where Phrygia ends and Pisidia begins. Neither will own us, and both trade with us.')}},
        {q:'Are there Jews in Antioch?',a:async()=>{await say(EU,'Many. They have a synagogue, and I go to it every Sabbath. Not as a Jew: I am a Greek.');await say(EU,'They call people like me those who fear God. I listen to the Law and the Prophets, from the place nearest the door.')}},
        {q:'Until the road, then.',bye:1}])}
    if(inFord())return F.crossed?say(EU,'I crossed that river on my own feet. I shall be telling it to my grandchildren.')
      :say(EU,F.lineUp?'A line, from post to post. I can hold a line. Tell me when.':'I have crossed here a dozen times, always with a rope under my hand. Without one I would not put a foot in it.');
    if(G.room==='synp')return say(EU,'This is my place, by the door. No one sent me to it: I chose it myself, years ago. Go further in and sit down, Paul.');
    if(inOut())return F.cheered?say(EU,'Go in peace. We have everything you brought.'):comfort();
    if(week())return F.eum?say(EU,'The fullers are coming, and the dyers, and my own brother. I have never looked forward to a Sabbath so much.'):greek();
    return talkTree([
      {q:'Is this your stall?',a:()=>say(EU,'And my father\'s before me. Fleeces from the plateau, bales for the coast, and a little dyed cloth for those who can pay.')},
      {q:'Where is the synagogue?',a:()=>say(EU,'The house of dressed stone, with the two steps. Tomorrow is the Sabbath. You will find me by the door.')},
      {q:'Peace to you, Eumenes.',bye:1}])},
  as:{barnabas:{look:()=>say(BN,'Eumenes. A man who has listened for years, and has not yet been told that it was meant for him.'),
    talk:()=>say(EU,inOut()?(F.cheered?'Go in peace, Barnabas.':'Barnabas. What becomes of us now? ...No. Let Paul answer me. It was his word that I heard first.')
      :week()&&!F.eum?'It is Paul I must ask, Barnabas. It was something he said on the Sabbath.':'Peace to you, Barnabas. You carried that rope across like a man half your age.'),
    show:{staff5:'The staff that crossed the river. I shall remember it.','*':'I deal in wool, friend. That is beyond my judging.'}}}};
const BN5={name:'Barnabas',actor:BN,
  look:()=>say(P,inPerga()?(F.shod?'Barnabas, shod again, and ready for the mountain.':'Barnabas. He is favoring his left foot: the strap of that sandal has parted.')
    :inFord()?(F.lineUp&&!F.crossed?'Barnabas, on the far bank, wringing the river out of his robe. He is laughing.':'Barnabas. He is measuring that river with his eyes, and his staff with his hand.')
    :inOut()?'Barnabas. Thrown out of a city, and he looks like a man coming home from a feast.':'Barnabas. He has walked every step of this road beside me, and never once asked to walk in front.'),
  give:mendSandal,
  show:{thong:'Ox-hide. My cousin thinks of everything. He always did.',roof:'Our roof. I have grown fond of it.',line:'The rope out of our roof? Then you mean to hang it somewhere else.',
    bread:()=>say(BN,F.bread?'You gave him his share. I saw you, Paul. Thank you.':'Bread and figs for three. For two, now.'),awl:'Your awl. I have never known you a day without it.',thread:'Good thread. It has held a great deal together, since Antioch.',
    knife:'Put it to work, brother. I will hold whatever needs holding.',tablets:'Read me something from them when we stop for the night.','*':'Keep it, brother. You will find a use for it.'},
  ask:{road:'He is right, Paul. I have heard the same in every harbor: the Taurus is no road for two men alone.',
    sandal:'It parted on the last mile into Perga. Cyprus is a long island. Have you anything to mend it with?',
    mark:'He is my cousin, Paul. I will not stop hoping for him. Let us leave it there, you and I.',
    rope:'I am no hand with a rope. But I have a staff, and long legs, if those are any use to you.',
    sabbath:'As in any synagogue. We take a seat, and wait to be asked. They will see that we are strangers.',
    again:'They asked, and they meant it. The people of the nations too. Did you see their faces at the door?'},
  talk:()=>inPerga()?talkTree([
      {q:'What do you know of this road?',a:async()=>{await say(BN,'Only what every sailor says of it: that the mountains are full of robbers, and the rivers come down like walls.');await say(BN,'And that beyond them lies a high country full of cities.')}},
      {q:'What do we still need?',a:()=>say(BN,!F.metPap?'A word with someone who knows the road. That drover, by his beasts.':!F.markTold?'A word with John Mark. He has not been himself since Paphos.':!F.shod?'A sandal that will stay on my foot.':'Nothing. I am ready when you are.')},
      {q:'How is your foot?',once:1,a:()=>say(BN,F.shod?'Better shod than it has been since Salamis.':'The foot is sound. It is the sandal that has had enough of me.')},
      {q:'Let us get on.',bye:1}])
    :inFord()?talkTree([
      {q:'What do you make of the river?',a:()=>say(BN,'It is cold, it is fast, and it is not as deep as it looks. A man with a third leg might stand in it.')},
      {q:'And of those rocks?',a:()=>say(BN,'I make of them that we should be over this ford before dark.')},
      {q:'Stand ready, brother.',bye:1}])
    :inOut()?talkTree([
      {q:'Are you sorry we came?',a:()=>say(BN,'Sorry? Look at them, Paul. When we came over that pass, not one of them knew our Lord.')},
      {q:'Then let us finish here.',bye:1}])
    :talkTree([
      {q:'What do you make of this city?',a:()=>say(BN,F.spoke1?'It listens. I have not seen a city listen like this since Antioch in Syria.':'It is full of people who have never heard. That is all I need to know of a city.')},
      {q:'How do I look to you?',once:1,a:async()=>{await say(BN,'Like a man who waded a river and then climbed a mountain in a wet cloak. You should rest, Paul.');await say(P,'I will rest. On the Sabbath, on a bench, until I am asked to stand.')}},
      {q:'Stay close, brother.',bye:1}])};
ROOMS.perga={space:0.6,walk:[16,464,110,138],mood:'hope',amb:{crickets:.5,birds:.4,wind:.2,hooves:.5},hs:[
  {name:'mountains',x:120,y:6,w:330,h:40,wx:300,look:['The Taurus. From here it stands like a wall across the whole of the north.','I look up toward the mountains and ask where my help will come from. (Psalm 121:1)']},
  {name:'city wall',x:0,y:18,w:122,h:30,wx:76,look:'The wall of Perga, a prominent city of Pamphylia. We did not stay to see more of it than this.'},
  {name:'north gate of Perga',x:26,y:50,w:44,h:54,wx:48,wy:112,look:'The north gate of Perga. Behind it lie the city, and the way back down to the coast.',
    use:'Our road lies the other way: north, and up.',open:'Our road lies the other way: north, and up.'},
  {name:'plain',x:124,y:66,w:136,h:24,wx:190,look:'Orchards and fields, and the heat lying on them like a lid. This coast is a hot country.'},
  {name:'watering trough',x:194,y:70,w:60,h:36,wx:224,wy:113,look:'A stone trough, fed from a spring. Every beast bound for the mountains drinks here first.',
    use:'I drink, and wash the dust of the coast from my face. The water is cold. It has come down from up there.',pickup:'It is a trough. It stays where it is.'},
  {name:'pack donkeys',x:280,y:74,w:128,h:30,wx:330,wy:114,look:['Papias\'s train, tethered along the wall: salt fish in the panniers, oil in the skins.','They have climbed that road more often than any man here.'],pickup:'They are the drover\'s, and every one of them is loaded.'},
  {name:'milestone',x:419,y:89,w:11,h:18,wx:410,wy:113,look:'A milestone. From here the road is counted northward, mile after mile, into the mountains.'},
  {name:'plane tree',x:426,y:24,w:54,h:44,wx:440,wy:116,look:'A plane tree: the last deep shade before the climb.'},
  {name:'our baggage',x:124,y:96,w:48,h:13,wx:150,wy:114,look:()=>say(P,F.markTold?'Two bed rolls and a bundle. From now on Barnabas and I carry them between us, and count them ourselves.':'The bed rolls, the bundle and the food bag. John Mark has carried more than his share of them, all across Cyprus.'),
    pickup:()=>say(P,F.markTold?'When we set out. One roll for Barnabas, one for me, and the bundle by turns.':'John Mark has it in hand.')},
  {name:'road north',x:440,y:70,w:40,h:36,wx:462,wy:118,dir:1,look:'The road north: across the plain, and up into the Taurus.',exit:leave5}]};
/* ---------- The ford ---------- */
async function fordIntro(){
  await narr('On the fourth day the road came down to a river.',{dur:3600});
  await say(PA,'Hold the beasts! ...Look at that. The guide rope has parted.');
  await say(PA,'It rained in the mountains, and the river came down in the night. There hangs the near half, on its post. The far half is trailing in the water, over there.');
  await say(EU,'Then we wait for the river to fall?');
  await say(PA,'Two days. Perhaps three. And I do not like these rocks by night: men watch this ford.');
  await say(P,'A parted rope, a river, and two posts. This is a tentmaker\'s trouble before it is anyone else\'s.',TH)}
/* wade: Barnabas carries the end of the rope across on his staff, and Paul holds the line from the near post. */
async function wade(){
  if(F.lineUp)return say(BN,'The line is up, and I am on the right side of it.');
  if(!F.spliced)return say(BN,'With my staff I might stand in that water. But stand to do what? There is no rope long enough to carry over.');
  if(!invOf(BN).includes('staff5'))return say(BN,'My staff first, Paul. Without a third leg I would not stand a moment in that water.');
  await say(BN,'My staff for a third leg, the rope round my waist, and you on this bank to hold me if I go down. Pay it out slowly, Paul.');
  await Promise.all([walk(P,172,120),walk(BN,186,125)]);P.dir=1;BN.free=true;BN.speed=22;const W=G.wade={x:BN.x,y:BN.y},tick=setInterval(()=>{W.x=BN.x;W.y=BN.y},40);
  SFX.splash();await walk(BN,236,125);SFX.splash();
  await say(BN,'It pulls like an ox!');
  await say(P,'I have you. Lean on the staff, and take the next step.');await say(P,quote('isa43'));
  SFX.splash();await walk(BN,288,124);clearInterval(tick);BN.speed=0;BN.free=false;await walk(BN,300,122);BN.dir=-1;
  G.wade=null;F.lineUp=1;SFX.good();
  await say(BN,'Twice round the post, and hauled tight. It is fast, Paul!');
  await say(P,'If either falls, the other can lift his companion up. (Ecclesiastes 4:10)');
  await say(P,'Now the train can cross, a hand on the line. I should tell the drover.',TH)}
async function crossAll(){playAs(P);
  await say(PA,'A line! I had thought to be counting my losses by nightfall. One beast at a time, and every man a hand on the rope!');
  await fade(1,500);F.crossed=1;place5('ford');place(P,'ford',344,124,1);G.cam=clamp(P.x-160,0,ART.ford.w-VW);SFX.splash();
  await narr('One by one they crossed: the donkeys, the drover, the wool merchant, and last of all the tentmaker.',{dur:6500});await fade(0,500);
  await say(EU,'You took your own roof to pieces for a rope. For people you met four days ago.');
  await say(P,'A roof can be sewn again. And you held the line as well as any of us, Eumenes.');
  await say(PA,'Leave it on the posts. The next train through will bless whoever hung it. Now: the pass, before the light goes!')}
const overPass=()=>F.crossed?toAntioch():say(PC(),PC()===P?'Not without the others. There are thirty beasts and two men on the wrong side of that river.':'Not without Paul, and not without the train. I will wait by the post.');
const river=async it=>{if(it==='roof')return say(P,'A roof will not get us over. But what I sewed into its edge might.');
  if(it==='staff5')return say(P,'The staff is cut to his hand, and he has the longer legs. This part is for Barnabas.');
  if(it==='line')return say(P,F.spliced?'It is joined already.':'Thrown from here it would only go downstream. It must be joined to the rope on the post, and then carried over.');return false};
ROOMS.ford={space:0.7,get walk(){return PC().x>240?[300,464,112,138]:[16,186,112,138]},mood:'tense',amb:{fountain:.9,waves:.6,wind:.45,birds:.15},enter:fordIntro,hs:[
  {name:'pass',x:404,y:36,w:76,h:40,wx:440,look:'The road climbs on beyond the ford, and over the saddle between those two shoulders of rock.'},
  {name:'rocks above the road',x:330,y:0,w:150,h:34,wx:400,look:['Something moved, up among those rocks. A goat, perhaps.','Perhaps not. Papias has not taken his eyes off them.']},
  {name:'cliff',x:150,y:10,w:190,h:36,wx:176,look:'The river does not run down to this place. It bursts out at the foot of that cliff, full grown, as if the mountain had been struck.'},
  {name:'pines',x:0,y:8,w:150,h:80,wx:90,look:'Mountain pines, rooted in cracks a hand could not enter. They hold on. So shall we.'},
  {name:'river',x:200,y:48,w:78,h:96,wx:166,wy:126,dir:1,look:['Cold water, swollen with rain. It is not deep here: a shelf of stones lies just under the surface.','But it runs like a mill race, and below the ford the gorge drops away.'],
    use:()=>F.lineUp&&!F.crossed?crossAll():say(P,F.crossed?'I have crossed it once. That will do.'
      :F.spliced?'I have a rope that will reach now. But the man who carries it over needs a third leg against that current, and I have none.':'Alone, and with no line? It would have my feet from under me in three steps.'),
    useWith:river,pickup:'I could sooner pick up the road.'},
  {name:'near post',x:186,y:94,w:14,h:18,wx:172,wy:120,dir:1,look:()=>say(P,F.lineUp?'The line is fast at this end, and Barnabas has it fast at the other.':F.spliced?'The rope is whole again, and coiled at the foot of the post. It only wants carrying over.'
      :'An oak post set in the rock, with half a rope on it. The end is frayed like an old brush: it wore through on a stone.'),
    pickup:'It is made fast here, and here it should stay.',use:()=>say(P,F.spliced?'It is spliced. Now it must cross the river.':'Half a rope. It will not reach, whatever I do with my hands alone.'),
    useWith:async it=>{if(F.spliced)return say(P,'The splice is made. I will not touch it again.');
      if(it==='line')return splice();if(it==='roof')return say(P,'Not the cloth: the rope in its edge. I must have it out first.');
      if(it==='awl'||it==='thread')return say(P,'The awl will open the strands for a splice. But I have nothing to splice in: the rope is short by half a river.');
      if(it==='knife')return say(P,'Trim the frayed end, yes. And then it is shorter still.');return false}},
  {name:'far post',x:274,y:94,w:14,h:18,wx:166,wy:126,dir:1,look:()=>say(P,F.lineUp?'Barnabas made it fast: twice round the post, and hauled tight.':'The other post, and the other half of the rope, trailing in the water. It is out of reach by the width of a river.')},
  {name:'pack donkeys',x:30,y:76,w:112,h:32,wx:110,wy:116,vis:()=>!F.crossed,look:'Loaded to the ears with salt fish and oil. One slip in that water, and beast and load go down the gorge together.',pickup:'They are the drover\'s.'},
  {name:'pack donkeys',x:358,y:76,w:112,h:32,wx:380,wy:116,vis:()=>!!F.crossed,look:'Every beast is over, and every load is dry. Papias has counted them three times.',pickup:'They are the drover\'s.'},
  {name:'road to the pass',x:452,y:84,w:28,h:28,wx:462,wy:118,dir:1,look:'The road on, up to the pass.',exit:overPass}]};
/* ---------- Antioch in Pisidia ---------- */
async function toAntioch(){playAs(P);await fade(1,600);AU.mood='hope';
  await narr('Beyond the pass the road came down onto a high plain, some 1,100 meters above the sea.',{dur:6500});
  await narr('The two of them traveled on from Perga and reached Antioch in Pisidia. (Acts 13:14)',{dur:6000});
  for(const id of['bread','roof','line'])dropAll(id);enterRoom('pisidia',...ENT.pisidia);place5('pisidia');codeBtn();await fade(0,600);
  await narr('Antioch in Pisidia, a city of the province of Galatia.',{dur:4200});
  await say(EU,'Antioch! My own city. Greeks, Phrygians and Jews in one street, and every one of them speaking Greek.');
  await say(PA,'And every one of them buying salt fish. Go well, tentmaker. You will find me here in the market.');
  await say(BN,'Paul, you are shivering.');
  await say(P,'The river went through me, and the cold of the pass came after it. It will mend.');
  await say(EU,'Tomorrow is the Sabbath. The synagogue of the Jews is the stone house with the two steps, across the square.');
  await say(P,'Then tomorrow we go in and take a seat, Barnabas. And wait to be asked.')}
async function synDoor(){const me=PC();
  if(!F.spoke1)return go5('synp',264,122,-1);
  if(!allThree())return say(me,me===P?'It is not the Sabbath yet. And there are people in this square whose questions I have not answered.':'Not until the Sabbath. And there are people in this square who are still waiting for an answer.');
  return sabbath2()}
/* think: Paul weighs what to say next. A choice that would not serve his hearers is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* passages: the choices for one point of the talk, from the passages named; ok lists those that carry the point */
const passages=(ks,ok)=>ks.map(k=>ok.includes(k)?{q:label(k),ok:1}:{q:label(k),no:NOT[k]});
const NOT={isa55:'The loyal love promised to David. Yes: but that comes next. First, who he is.',ps16:'Not abandoned to the Grave. Yes: but that comes next. First, who he is.',
  hab1:'A warning comes last, if it comes at all.',isa56:'That is for a man who thinks he has no part in this. It is not for the whole house.',isa49:'A light of nations. Not yet: first they must hear what was promised to Israel.'};
/* The first Sabbath (Acts 13:14-43). They take a seat and wait to be asked; then Paul chooses whom he addresses, and the passages he quotes. */
async function sabbath1(){playAs(P);
  await Promise.all([walk(P,258,126),walk(BN,282,128)]);P.dir=-1;BN.dir=-1;
  await narr('When the Sabbath came they went to the synagogue, and there they sat down. (Acts 13:14)',{dur:6000});
  await walk(HA,166,110);HA.dir=1;
  await narr('The Law and the Prophets were read aloud. Then the presiding officers of the synagogue had a message brought to them. (Acts 13:15)',{dur:7500});
  await walk(HA,92,114);HA.dir=1;
  await say(HA,'Brothers: if there is a word of encouragement in you for the people, let us hear it. (Acts 13:15)');
  await walk(P,166,111);P.dir=1;
  await narr('Paul rose, and with a movement of his hand he began: (Acts 13:16)',{dur:4500});
  await think('Israelites, and among them Greeks who fear God. One of them has not come a step further in than the door. To whom do I speak?',[
    {q:'Listen, Israelites.',no:'And leave those who fear God to overhear? They came to listen too.'},
    {q:'Listen, men of Antioch.',no:'They did not come here as citizens of a city. They came to hear the Law and the Prophets.'},
    {q:'Listen, Israelites, and listen, all the rest of you who fear God.',ok:1}]);
  await say(P,'Listen, Israelites, and listen, all the rest of you who fear God. (Acts 13:16)');
  await say(EU,'All the rest who fear God. He means us.');
  await say(P,'The God of Israel, this people, made our forefathers his choice. With his arm raised high he led them out of Egypt, and he gave them their land to inherit.');
  await say(P,'He gave them judges, and then kings. Of David, the son of Jesse, he testified that in him he had found a man after his own heart. (Acts 13:22)');
  await say(P,"And God has done what he promised: from that man's descendants he has brought Israel a savior, Jesus. (Acts 13:23)");
  await say(JO,'A savior. From the house of David!');
  await say(P,'The people of Jerusalem and their rulers did not see who he was. They pressed Pilate to have him put to death, and he was buried in a tomb.');
  await say(P,'But God raised him from the dead, and over many days he showed himself to the companions of his journey from Galilee up to Jerusalem. (Acts 13:30, 31)');
  await think('Raised up: and so the promise to the forefathers is kept. Where is it written of the Son?',passages(TALK,['ps2']));
  await say(P,'For us, their children, God has made that promise come wholly true by raising Jesus, as the second psalm says where God calls him his son and declares that he has become his father that day. (Acts 13:33)');
  await think('Raised, and never to go back to decay. Which promise says that it will hold?',passages(TALK.filter(k=>k!=='ps2'),['isa55','ps16']));
  await say(P,'That God raised him from the dead, never to go back to decay, he had put this way: that he would give you the proofs of loyal love pledged to David, which can be relied on. (Acts 13:34)');
  await say(P,'Another psalm says the same: God will not let the one who is loyal to him see decay. (Acts 13:35)');
  await say(P,'David died, and his body did decay. The one God raised up did not decay. (Acts 13:36, 37)');
  await say(P,'So, brothers, you should know this: through him you are being told that sins are forgiven. (Acts 13:38)');
  await say(P,'There were things of which the Law of Moses could not clear you. Of all of them, everyone who believes is cleared through him. (Acts 13:39)');
  await say(EU,'Everyone who believes...');
  await think('They have heard the good news. And the Prophets warned those who would not believe it.',passages(['hab1','isa56','isa49'],['hab1']));
  await say(P,'So take care that the saying in the Prophets does not come true of you: (Acts 13:40)');
  await say(P,'Scoffers are to look on, to wonder, and to perish; for in their days a work is being done that they will never believe, even when it is told them point by point. (Acts 13:41)');
  await walk(P,258,126);P.dir=-1;
  await narr('As the two went out, the people begged them to speak about all this on the Sabbath after. (Acts 13:42)',{dur:8000});
  await say(HA,'You have given this house a great deal to weigh, Paul of Tarsus. Come again on the next Sabbath, and we will hear the rest.');
  await say(JO,'And until then you lodge with me, both of you. My house is on the square, and there is room at my door for a tentmaker\'s bench.');
  await say(EU,'Paul. May a man who keeps by the door ask you something? ...Not here. I will come to you in the week.');
  await narr('Many Jews went with Paul and Barnabas, and so did many proselytes who worshipped God. (Acts 13:43)',{dur:7000});
  F.spoke1=1;SFX.good();await fade(1,600);enterRoom('pisidia',...ENT.pisidia);place5('pisidia');codeBtn();await fade(0,600);
  await narr('All that week Paul worked at his trade by Joel\'s door, and the questions came to him there.',{dur:6500});
  await say(BN,'Three days, Paul, and you have not sewn one seam without somebody standing over you with a question.');
  await say(P,'Eumenes at his stall, Papias among his panniers, and Joel at his own door with a troubled face. Each of them is waiting for something.',TH)}
const weekDone=async()=>{if(allThree()){await say(BN,'It is the day before the Sabbath, Paul. I do not think there is a house in Antioch that has not heard.');await say(P,'Then tomorrow: the synagogue again.',TH)}};
/* The week between the Sabbaths: three hearers, and each is answered in the way he can follow. */
async function greek(){
  await say(EU,'Paul. On the Sabbath you said: everyone who believes. I have said it over to myself ever since, so as not to lose it.');
  await say(EU,'For eleven years I have kept to the place by that door. No one put me there, Paul. I put myself there.');
  await say(EU,'I keep the Sabbath, and I give to the poor of the synagogue. And still I am a Greek, and every Sabbath I tell myself that this people is not mine.');
  await quiz(EU,'So tell me plainly. Is this good news for a Greek?',[
    {q:'You heard me rightly. I said everyone, and I meant it.',r:['A word in a talk, Paul. I have heard "everyone" before, and gone back to my place by the door.']},
    {q:'It was promised to Israel, and it had to come to Israel first.',r:['So I have always been told. First to them. I am asking what comes after "first".']},
    {q:'Let me show you what is written about the foreigner.',ok:1,
      p:['Do not take my word for it, Eumenes. Take what is written. Isaiah has a word for a man in your place:',quote('isa56'),
        'And what I said on the Sabbath stands: everyone who believes is cleared of guilt through him. (Acts 13:39)'],
      r:['Let him not say it... And I have said exactly that, Paul. Every Sabbath, for eleven years.',
        'My brother must hear this. And the fullers, and every man in the dyers\' street. On the Sabbath I shall not come alone.']}]);
  F.eum=1;SFX.good();return weekDone()}
async function drover(){
  await say(PA,'Tentmaker! Between the stalls they talk of nothing but you. A savior, they say, and a man raised from the dead.');
  await say(PA,'I am no Jew, and no God-fearer either. I have never set foot in that house.');
  await quiz(PA,'So what is it to a man who walks behind donkeys?',[
    {q:'Come to the synagogue on the Sabbath, and hear.',r:['Into the Jews\' house of prayer? I would not know where to put my feet. Give me a reason first.']},
    {q:'It is all written in the Prophets of Israel.',r:['I cannot read, tentmaker. Not Greek, and not whatever your Prophets wrote in. Tell me something I have seen.']},
    {q:'The God I speak of made the mountains you cross.',ok:1,
      p:['The God I speak of made the mountains you cross, Papias, and the rivers you ford, and the rain that fills them.',
        'He has done you good all your life, though you did not know whom to thank. Now he has sent you word of himself.'],
      r:['The one who made the mountains. On a good crossing I have often wondered whom to thank.',
        'I will hear the rest of it. And the drovers\' yard shall hear it from me before the Sabbath.']}]);
  F.pap=1;SFX.good();return weekDone()}
async function troubled(){
  await say(JO,'Barnabas. A word with you, and not with your friend: he has the whole square on his hands.');
  await say(JO,'Hanan came to my dye shop this morning. He says the house of prayer has talked of nothing but Paul all week, and that it is unseemly.');
  await say(JO,'He did not say that I must choose. He did not need to. I have sat on that bench since I was a boy.');
  await ask(BN,JO,'If this goes on, it may cost me my place among my own people. What do I do, Barnabas?',[
    {q:'Hanan asked us to speak. He may yet be glad of the rest.',r:['He may. And if he is not?']},
    {q:'I sold a piece of land once for this, and I have never missed it.',r:['A piece of land. I am speaking of my seat among my own people, Barnabas. That is not sold and bought again.']},
    {q:'What you were given is undeserved kindness. Hold on to it.',ok:1,
      p:['What you heard on the Sabbath was not Paul\'s gift to you, Joel, and it is not mine. It is the undeserved kindness of God.','Hold on to it. Whatever it costs you, it is worth more than a seat. (Acts 13:43)'],
      r:['Hold on to it. Yes. That I can do: one day, and then the next.','Then my door stays open. My household will be there on the Sabbath, and my neighbors with them.']}]);
  F.joel=1;SFX.good();return weekDone()}
JO.hs={name:'Joel',actor:JO,
  look:()=>say(P,G.room==='synp'?'A man of my own people, with dye under his fingernails. He has made room beside him on the bench.':inOut()?'Joel. He has walked out past the boundary of his own city to stand with us.'
    :F.joel?'Joel, at his open door. Whatever troubled him, he has put it down.':'Joel, our host. Something has been weighing on him since yesterday, and he has not told me what.'),
  show:{tablets:'May I? ...Isaiah, in your own hand. I should like to copy some of these before you go.',awl:'An honest tool. I have a dyer\'s paddle for mine.','*':'Put it by, brother. My house is yours: you need show me nothing.'},
  ask:{sabbath:'A visitor takes a seat. If the presiding officers think he has a word for us, they send for him. Sit, and you will see.',
    mark:'A young man who turned back? Then pray for him. The road has not finished with him yet.',
    again:()=>say(JO,F.joel?'And I shall be there to hear you, whatever is said of it afterward.':'Yes. The whole house asked it. Hanan asked it himself.')},
  talk:async()=>{if(G.room==='synp'){await say(JO,'Peace to you, visitors. Joel. I dye wool for half the stalls in the market.');return say(JO,'From the coast, by the dust on you. Sit down: the reading is about to begin.')}
    if(inOut())return say(JO,F.cheered?'We will go on meeting in my house. There is room, and the door is open.':'I have no words, Paul. Speak to Eumenes: he is taking it harder than any of us.');
    return F.joel?say(JO,'My door is open, Paul, and it stays open.'):say(JO,'It is good to have you under my roof, Paul. ...It is nothing. Ask Barnabas to come and sit with me a while, when he can.')},
  as:{barnabas:{look:()=>say(BN,F.joel||!week()?'Joel. A good man, and a glad one.':'Joel. He has the face of a man doing sums that will not come out.'),
    talk:()=>G.room==='synp'?say(JO,'A Levite! Then you will know every word of the reading. Sit, sit.'):inOut()?say(JO,F.cheered?'Hold on to it, you told me. I am holding on.':'You told me it would cost something, Barnabas. Here is the cost. I do not regret it.')
      :F.joel?say(JO,'Hold on to it. I have said it to myself all day, Barnabas.'):troubled(),
    show:{staff5:'The staff that carried a rope across the river? Eumenes has told the whole street.','*':'Put it by, brother. My house is yours.'}}}};
HA.hs={name:'Hanan',actor:HA,look:()=>say(P,G.room==='synp'?'A presiding officer of the synagogue, with a beard like fleece. He watches his house as a shepherd watches a fold.':'Hanan. He asked us to speak. Now he cannot bear to see who has come to listen.'),
  show:{tablets:'The Prophets, in wax. Keep them closed until you are asked to open your mouth.','*':'This is a house of reading and prayer, stranger. Put it away.'},
  ask:{sabbath:'A visitor takes his seat and hears the reading. If he has a word for the people, the presiding officers will send for him.'},
  talk:async()=>{if(G.room!=='synp')return say(HA,'I have said what I have to say.');
    await say(HA,'Peace to you, strangers. I am Hanan: I preside in this house. Visitors are welcome to a seat.');
    await say(P,'Peace to you. We are Jews from abroad: Paul, of Tarsus, and Barnabas, a Levite of Cyprus.');
    await say(HA,'From abroad. Then perhaps we shall hear something new today. Sit: the reading is about to begin.')},
  as:{barnabas:{look:'The presiding officer. A careful man. I hope he is also a glad one.',talk:()=>say(HA,'A Levite, they tell me. You do this house honor. Sit by your friend.'),show:{'*':'Put it away, Levite. This is a house of prayer.'}}}};
AM.hs={name:'Ammia',actor:AM,look:'A woman of standing, by her dress, and no daughter of Israel. Yet she knows when to rise and when to sit.',
  show:{'*':'A workman\'s things. They have no place in this house.'},
  ask:{sabbath:'I could not tell you. I come to listen, not to be heard.'},
  talk:async()=>{await say(AM,'Ammia. My husband sits among the leading men of this city.');await say(AM,'I come here for the reading, and for the quiet. There is little enough of either in Antioch.')},
  as:{barnabas:{look:'A woman of high standing, and one who fears God. She likes this house as it is.',talk:()=>say(AM,'You are strangers here. I trust you will respect the order of this house.'),show:{'*':'They have no place in this house.'}}}};
ROOMS.pisidia={space:0.8,walk:[16,464,110,138],mood:'hope',amb:{crowd:.5,birds:.3,wind:.3,hammer:.2,hooves:.3},hs:[
  {name:'mountains',x:60,y:2,w:370,h:20,wx:240,look:'Snow on them, half way down. And the plain we stand on is already higher than most mountains I have climbed.'},
  {name:'street to the south gate',x:0,y:36,w:58,h:68,wx:40,wy:113,dir:-1,look:'The street we came in by, from the south gate and the road down to Perga.',
    use:'Back down to the coast? We have only just climbed up from it.',open:'Back down to the coast? We have only just climbed up from it.'},
  {name:'wool market',x:58,y:24,w:188,h:18,wx:150,look:'A stoa full of wool: fleeces, bales and dyed cloth. The flocks of the whole plateau are sold under that roof.'},
  {name:'wool stall',x:96,y:43,w:90,h:63,wx:150,wy:114,look:['Fleeces on the bar, bales against the wall, and lengths of dyed cloth laid out by color.','Sheep\'s wool, not goat hair. It is finer stuff than a tentmaker works in.'],pickup:'That would be stealing.'},
  {name:'panniers of salt fish',x:196,y:96,w:32,h:13,wx:210,wy:114,look:'Salt fish from the coast of Pamphylia. I know every mile it has traveled.',pickup:'They are Papias\'s living.'},
  {name:"tentmaker's bench",x:252,y:86,w:34,h:22,wx:266,wy:113,dir:-1,vis:week,look:['A bench at Joel\'s door, and a length of goat-hair cloth on it. Here I earn our bread, and ask no one in Antioch for anything.','A man can sew and answer questions at the same time. I have had the practice.'],
    use:'A few more spans of seam. Then back to the questions.',pickup:'It is half a tent, and it is promised.'},
  {name:"door of Joel's house",x:286,y:61,w:28,h:43,wx:300,wy:113,look:()=>say(P,week()?'Joel\'s door. We sleep under his roof now, and his door stands open all day.':'A house with a blue door, and a vine growing over it.'),
    use:()=>say(P,week()?'Not while there is light to work by, and people in the square with questions.':'It is not my house, and I have not been asked in.'),
    open:()=>say(P,week()?'It is open already. It has been open all week.':'It is not my house, and I have not been asked in.')},
  {name:'synagogue',x:334,y:22,w:104,h:28,wx:386,look:'The synagogue of Antioch: dressed stone, two steps, and a door that stands open on the Sabbath.'},
  {name:'water jar',x:341,y:87,w:14,h:20,wx:352,wy:113,look:'A great jar of water beside the door, for washing.',pickup:'It would take two men to lift.'},
  {name:'door of the synagogue',x:371,y:60,w:30,h:44,wx:386,wy:112,look:()=>say(P,F.spoke1?'The door of the synagogue. Next Sabbath it will not be wide enough.':'The door of the synagogue. Tomorrow it will stand open.'),exit:synDoor},
  {name:'east gate',x:444,y:50,w:32,h:54,wx:458,wy:113,dir:1,look:'The east gate. Beyond it the road runs on across the plain, to Iconium.',
    exit:()=>say(PC(),PC()===P?(week()?'Not while a whole city is asking questions.':'We have only just come. Nothing has been said here yet.'):'Not yet. There is work in this city first.')}]};
ROOMS.synp={space:1.5,walk:[16,304,110,136],mood:'calm',amb:{crowd:.14,fire:.15},hs:[
  {name:'door to the square',x:286,y:53,w:24,h:51,wx:288,wy:113,dir:1,look:'The door to the square.',exit:()=>go5('pisidia',386,116,-1)},
  {name:'window',x:54,y:16,w:22,h:24,wx:70,look:'A high window. The light falls on the reading desk.'},
  {name:'window',x:149,y:16,w:22,h:24,wx:160,look:'A high window. The light falls on the reading desk.'},
  {name:'window',x:244,y:16,w:22,h:24,wx:250,look:'A high window. The light falls on the reading desk.'},
  {name:'lamp',x:90,y:48,w:16,h:14,wx:112,look:'A lamp on a bracket, burning even by day.',pickup:'It gives light to the whole house where it is.'},
  {name:'lamp',x:214,y:48,w:16,h:14,wx:206,look:'A lamp on a bracket, burning even by day.',pickup:'It gives light to the whole house where it is.'},
  {name:'chest of the scrolls',x:29,y:61,w:36,h:43,wx:60,wy:113,look:['The chest of the scrolls, carried in and set in its place for the Sabbath.','The Law, the Prophets and the Psalms. Everything I have to say in this city is in there already.'],
    open:'It is not mine to open. The scrolls are in the keeping of the synagogue.',use:'It is not mine to open. The scrolls are in the keeping of the synagogue.',pickup:'It is not mine to open. The scrolls are in the keeping of the synagogue.'},
  {name:'seats of the presiding officers',x:70,y:70,w:44,h:34,wx:124,wy:114,dir:-1,look:'The seats of the presiding officers, beside the chest and facing the people.'},
  {name:'reading platform',x:118,y:80,w:96,h:28,wx:166,wy:113,look:['The platform and the reading desk, with benches on three sides of it.','Any son of Israel may be asked to read here, or to speak. But he must be asked.'],
    use:'Unasked? No. A visitor takes a seat, and waits.',pickup:'The scroll belongs to the synagogue, and so does every word in it.'},
  {name:'bench',x:250,y:78,w:32,h:26,wx:258,wy:126,dir:-1,def:'use',look:'Benches of stone in two steps, worn smooth. There is room on the lower one.',use:sabbath1}]};
/* ---------- The next Sabbath, and what came of it (Acts 13:44-50) ---------- */
const WRONG={ps2:'A psalm for the king of Israel! You prove my case for me.',isa55:'Promised to David. To David! Was David a Greek?',ps16:'You said all that last Sabbath. I asked what these people are doing on my steps.',
  hab1:'You warn us? At the door of our own house of prayer?',isa56:'The foreigner who has attached himself: who is circumcised, and keeps the whole Law. These people have attached themselves to nothing.'};
async function sabbath2(){playAs(P);await fade(1,500);G.crowd=1;AU.mood='tense';
  place(P,'pisidia',386,116,-1);place(BN,'pisidia',410,119,-1);place(HA,'pisidia',442,118,-1);place(AM,'pisidia',462,122,-1);place(EU,'pisidia',330,121,1);place(PA,'pisidia',304,125,1);place(JO,'pisidia',350,127,1);
  G.cam=160;await fade(0,500);
  await narr('A week later, on the Sabbath, almost the whole city came together to hear the word of Jehovah. (Acts 13:44)',{dur:7000});
  await say(EU,'The fullers are here, Paul, and the dyers, and my brother with all his household!');
  await say(PA,'And every drover from the yard. I told you I would not come alone.');
  P.dir=1;BN.dir=1;
  await say(HA,'Greeks on the steps of the house of prayer. Greeks in the doorway, Greeks in the street. In thirty years I have not seen so many at this door.');
  await say(HA,'And he fetches them here in a week.');
  await narr('The sight of the crowds filled the Jews with jealousy. They began to contradict what Paul said, and to speak blasphemously. (Acts 13:45)',{dur:9000});
  await ask(P,HA,'The promises were given to Israel! What have these people of the nations to do with them?',TALK.map(k=>k==='isa49'?{q:label(k),ok:1,
      p:['It is written in Isaiah, of the servant of Jehovah. And what is written there is a command to us.'],r:['A light of... You would hand the inheritance of Israel to the whole market!']}
    :{q:label(k),p:[quote(k)],r:[WRONG[k]]}));
  await say(P,'The word of God had to be spoken to you before anyone else. (Acts 13:46)');
  await say(BN,'But you push it away, and by that you judge that everlasting life is not for you. So now we turn to the nations. (Acts 13:46)');
  P.dir=-1;
  await say(P,'For this is what Jehovah has commanded us. He has set us as a light of nations, and through us salvation is to go out to the ends of the earth. (Acts 13:47)');
  SFX.good();AU.mood='hope';
  await narr('The people of the nations heard this with joy and gave glory to the word of Jehovah, and everyone who had the right disposition for everlasting life came to believe. (Acts 13:48)',{dur:10000});
  await say(EU,'A light of nations. Of nations, Papias! Did you hear it?');
  await say(PA,'I heard it. I am one.');
  await narr('And the word of Jehovah went on spreading through all that country. (Acts 13:49)',{dur:6500});
  await say(HA,'Lady Ammia. Is this the quiet you came to our house for?');
  await say(AM,'It is not. My husband shall hear of this before the day is out.');
  await fade(1,700);G.crowd=0;AU.mood='tense';
  await narr('But the Jews worked on the God-fearing women of high standing and on the leading men of the city. They got a persecution going against Paul and Barnabas, and had the two driven out beyond their borders. (Acts 13:50)',{dur:11000});
  F.out=1;enterRoom('border',...ENT.border);place5('border');codeBtn();await fade(0,700);
  await say(SN,'That stone is the boundary of Antioch. You will not come back across it. That is the order of the leading men of the city.');
  await say(SN,'You have unsettled a quiet town. Go and unsettle another.');
  await say(JO,'They would not let us walk beside you through the gate. So we came round by the fields.');
  await say(P,'Put out like thieves. And three of them have walked out here to stand with us, in front of the whole city.',TH)}
/* ---------- Outside the boundaries ---------- */
async function comfort(){
  await say(EU,'They have put you out like thieves, Paul! And we are left here, a handful, with Hanan and the leading men against us.');
  await quiz(EU,'What becomes of us now?',[
    {q:'We did nothing to deserve this.',r:['I know it. That is what frightens me. If they do this to you, what will they do to a wool merchant?']},
    {q:'Come with us to Iconium.',r:['And leave Joel, and the fullers, and Papias\'s drovers? Who would tell them the rest?']},
    {q:'It was never our word, Eumenes. You did not put faith in us.',ok:1,
      p:['It was never our word, Eumenes. You did not put your faith in Paul, or in Barnabas.',
        'They can put two men outside a stone. They cannot put the word of Jehovah outside it. It is in you now, and in Joel, and in a drovers\' yard.'],
      r:['Not in you. No. In the one whom God raised up.','Then we are not left with nothing. We are left with everything you brought.']}]);
  F.cheered=1;SFX.good();
  await say(JO,'We will meet in my house. My door was open to you, and it will be open to them.');
  await say(PA,'And I carry more than salt fish now, on every road I walk.')}
const dust=()=>F.cheered?finale5():say(PC(),PC()===P?'Not yet. They came all this way out to stand with us. I will not turn my back on them without a word.':'Not yet. Paul has something to say to them first, and so have they to him.');
SN.hs={name:'Straton',actor:SN,look:'Straton, one of the leading men of the city, and the husband of Ammia. He means to stand at that stone until we are out of sight.',
  show:{'*':'I want nothing of yours. I want your backs.'},talk:()=>say(SN,'I have nothing more to say to you. The order stands.'),
  as:{barnabas:{look:'One of the leading men. He has done what he was asked to do, and he does not look proud of it.',talk:()=>say(SN,'The order stands, for both of you.'),show:{'*':'I want nothing of yours.'}}}};
ROOMS.border={space:0.5,walk:[16,304,112,138],mood:'tense',amb:{wind:.6,birds:.4,crickets:.2},hs:[
  {name:'mountains',x:0,y:30,w:320,h:22,wx:200,look:'The same mountains that stood over the square. From out here they look no further away.'},
  {name:'Antioch',x:2,y:48,w:118,h:30,wx:120,look:['Antioch, on its rise. We came to it as two strangers with the dust of the pass on us.','There are disciples inside that wall now.']},
  {name:'poplars',x:198,y:72,w:92,h:22,wx:240,look:'Poplars along a stream. The plain is wide and bare, and the wind crosses it without stopping.'},
  {name:'our baggage',x:260,y:100,w:48,h:13,wx:250,wy:116,dir:1,look:'Two bed rolls and a bundle. They let us fetch them, at least.',pickup:'In a moment. One thing remains to be done here.'},
  {name:'boundary stone',x:94,y:86,w:18,h:24,wx:128,wy:116,dir:-1,def:'use',look:'The boundary stone of Antioch. On this side of it we are no longer the city\'s concern.',use:dust,pickup:'It marks their boundary. Let it stand.'},
  {name:'road to Iconium',x:296,y:84,w:24,h:44,wx:300,wy:122,dir:1,look:'The road southeast, to Iconium: several days across the high plain.',exit:dust}]};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  perga:{'mountains':{look:'The Taurus. I have seen it from the sea all my life, and never once thought to climb it.'},'city wall':{look:'Perga. We came, and we are going. Something tells me we shall be back.'},
    'north gate of Perga':{look:'The gate back into Perga, and to the coast.',use:'Not that way. Not while Paul is looking at those mountains.',open:'Not that way. Not while Paul is looking at those mountains.'},
    'plain':{look:'Good land, and hot already, and it is only spring. Up there the snow has not gone yet.'},'watering trough':{look:'A good trough, and cold water.',use:'I drink my fill. It will be a long while to the next such water.'},
    'pack donkeys':{look:'Thirty beasts, and every one loaded. The drover will not carry so much as a bed roll for us.'},'milestone':{look:'A milestone. I shall count every one of them, with this foot.'},
    'plane tree':{look:'Shade. I could stand in it all day, if Paul would let me.'},
    'our baggage':{look:()=>say(BN,F.markTold?'The bundles. My cousin tied every knot on them.':'John Mark has it all in order, as always.'),pickup:'When we go, I take my share.'},'road north':{look:'The road north. It does not look steep from here. It never does.'}},
  ford:{'pass':{look:'The pass. A day beyond this water, the drover says.'},'rocks above the road':{look:'Someone is up there. I have felt it since we came down to the river.'},
    'cliff':{look:'The river comes straight out of the rock. I have never seen the like.'},'pines':{look:'Pines, growing out of bare stone.'},
    'river':{look:'Cold, fast, and not as deep as it looks. With a third leg under him, a man might stand in it.',use:wade,useWith:async it=>it==='staff5'?wade():false},
    'near post':{look:()=>say(BN,F.lineUp?'Fast at both ends.':F.spliced?'Paul has made the rope whole. It only wants carrying over.':'Half a rope. The other half is in the river.'),use:wade,useWith:async it=>it==='staff5'?wade():false},
    'far post':{look:()=>say(BN,F.lineUp?'I tied it myself: twice round, and hauled tight.':'The far post. That is where the rope has to go.'),use:wade,useWith:async it=>it==='staff5'?wade():false},
    'pack donkeys':{look:'They do not like the sound of that water any better than I do.'},'road to the pass':{look:'The road on, up to the pass.'}},
  pisidia:{'mountains':{look:'Snow, in sight of a market. Cyprus has nothing like this.'},'street to the south gate':{look:'The street from the south gate. We came up it with the dust of the pass still on us.',use:'We are not going back that way.',open:'We are not going back that way.'},
    'wool market':{look:'Wool, wool and more wool. Every sheep on this plain must come here in the end.'},'wool stall':{look:'Eumenes keeps a tidy stall. His father kept it before him, he says.'},
    'panniers of salt fish':{look:'The salt fish that crossed the river with us. It smells no better here.'},
    "tentmaker's bench":{look:'Paul\'s bench. He will not eat a crust in this city that he has not earned.',use:BARN5.noCraft},
    "door of Joel's house":{look:()=>say(BN,week()?'Joel\'s door. A man who opens his house so quickly has a large heart.':'A house with a blue door.'),use:'I will go in when our host does.',open:'I will go in when our host does.'},
    'synagogue':{look:'A synagogue of dressed stone. It could be the one in Salamis, but for the cold.'},'water jar':{look:'Water for washing, by the door.'},
    'door of the synagogue':{look:'The door of the synagogue.'},'east gate':{look:'The east gate, and the road to Iconium.'}},
  synp:{'door to the square':{look:'The door to the square.'},'window':{look:'The light falls just where the reader stands.'},'lamp':{look:'A lamp, kept burning. Someone tends it as I used to tend ours.'},
    'chest of the scrolls':{look:'The chest of the scrolls. Everything we have come to say is in there already.',open:'It is in the keeping of the synagogue.',use:'It is in the keeping of the synagogue.'},
    'seats of the presiding officers':{look:'The seats of the presiding officers. Hanan fills his.'},
    'reading platform':{look:'The platform. I think it will be Paul who is asked up to it, and I am glad of it.',use:'It is Paul who should stand there today, not I.'},
    'bench':{look:'Room for two on the lower bench.',use:sabbath1}},
  border:{'mountains':{look:'The mountains have not moved. Neither has what we left behind that wall.'},'Antioch':{look:'Antioch. I am not sorry we came, and I am not sorry to be put out of it like this.'},
    'poplars':{look:'Poplars, bending to the wind.'},'our baggage':{look:'They threw our bundles out after us. I will say this: nothing is missing.'},
    'boundary stone':{look:'Their boundary. We are on the right side of it now, by their own order.',use:dust},'road to Iconium':{look:'The road to Iconium. Another city that has not heard.'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ SCENES: intro, the road, ending; PRAYER HINTS ============ */
const LABELS={salamis:{lab:'r',dy:4.2},paphos:{lab:'l',dy:2.6}},VOYAGE=[['antioch','seleucia'],['seleucia','salamis','sea'],['salamis','paphos'],['paphos','perga','new sea']];
/* arrive5: after the map has drawn the way up from Perga. The road does not reach Antioch at once: it comes down to a river first. */
async function arrive5(to){if(to!=='antiochp')return;MK.room=null;enterRoom('ford',...ENT.ford);place5('ford');
  await narr('From Perga the road climbed north into the Taurus: about 180 kilometers, over a mountain pass.',{dur:7000});
  await narr('Those mountains were known for their robbers, and for rivers that burst out at the foot of the cliffs and tore down through narrow ravines.',{dur:8500});
  await narr('Years later Paul would write of the dangers he had met from rivers and from robbers. (2 Corinthians 11:26)',{dur:7000})}
async function start5(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(5);G.end={};enterRoom('perga',...ENT.perga);codeBtn();
    try{await need('map');await SHARED.map.journey(VOYAGE,{labels:LABELS,view:'north',text:['Paul and those with him sailed from Paphos and came to Perga in Pamphylia. (Acts 13:13)']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;setScore(MUSIC);AU.mood=ROOMS.perga.mood;AU.amb=ROOMS.perga.amb;codeBtn();await fade(0,600);
    await narr('Perga in Pamphylia, about 47 C.E.',{dur:3000});
    await say(BN,'The north road, Paul. Beyond the plain it climbs into the Taurus, and beyond the Taurus lies Antioch in Pisidia.');
    await say(P,'Then that is our road. A long one, by the look of those mountains.');
    await say(MK,'The bed rolls are here, cousin. And the food bag.');
    await say(P,'John Mark has hardly spoken since we landed. And Barnabas is limping.',TH)},true)}
async function finale5(){playAs(P);await wait(300);
  await say(P,'One thing remains, Barnabas. Our Lord told those he sent out what to do on leaving a city that would not receive them. (Luke 9:5)');
  await Promise.all([walk(P,238,123),walk(BN,264,126)]);P.dir=-1;BN.dir=-1;P.bow=BN.bow=true;G.dust=1;SFX.step();await wait(500);SFX.step();await wait(1300);
  await narr('The two shook the dust from their feet against those people, and moved on to Iconium. (Acts 13:51)',{dur:6500});
  P.bow=BN.bow=false;G.dust=0;
  await say(BN,'Not in anger, Paul.');
  await say(P,'No. They have heard, and what they do with it is theirs to answer for. We are free of it.');
  await say(JO,'Go in peace. You leave more behind you than you found.');
  P.dir=1;BN.dir=1;walk(BN,318,125);await walk(P,300,122);await fade(1,600);AU.mood='hope';
  await narr('As for the disciples, joy and holy spirit went on filling them. (Acts 13:52)',{dur:6500});
  await journey();await narr('Iconium lay about 140 kilometers to the southeast. And in time they would see Antioch again. (Acts 14:21)',{dur:7000});
  endScreen({title:'A Light of Nations',text:'Paul took his own roof to pieces for a rope, waited to be asked before he spoke, and answered each hearer in the way that hearer could follow. Put out of the city, he left no anger behind him: only disciples.',
    extra:F.bread?['Bread shared with John Mark for his road']:[],
    based:'Based on Acts 13:13-52; 14:21 and 2 Corinthians 11:26. Supporting characters and dialogue are imaginative; the events are from the Scriptures.',
    go:'Click to continue to Chapter Six',code:['Chapter Six code: {code}',codeOf(6,0)]});
  await wait(1500);ov.onclick=()=>startChapter(6);await new Promise(()=>{})}
function hint5(){const b=PC()!==P,craft=['craft5',["That is the tentmaker's craft, not mine. A good partner knows when to step back.",'Paul should do this part. I can leave it to him; he is never far away.']];
  if(inPerga()){
    if(!F.metPap)return['road5',['Two men do not walk into those mountains without asking what the road is like. Someone here climbs it for a living.','I should talk to the drover, by his donkeys.']];
    if(!F.markTold)return b?['mark5b',['My cousin has not been himself since Paphos. Whatever it is, he must be allowed to say it.','I should talk to John Mark.']]
      :['mark5',['John Mark stands by the bundles and says nothing. I should hear what is on his mind, whatever it is.','I should talk to John Mark.']];
    if(!F.shod)return b?['shoe5b',['The strap is beyond me. But Paul has mended harder things than a sandal.','Paul should use the leather thong on me. If I am carrying it, I can give it to him.']]
      :['shoe5',['Barnabas cannot climb on a parted strap. And John Mark has put a thong of ox-hide into my hand.','I should use the leather thong on Barnabas, and mend his sandal.']];
    return['go5',['The drover is ready, and so are we.','We can take the road north, and choose Antioch in Pisidia on the map.']]}
  if(inFord()){
    if(!F.gotLine)return b?craft:['rope5',['The guide rope is short by half a river. What do we carry that has a rope in it?','I can take the rope out of the edge of our tent roof with my knife.']];
    if(!F.spliced)return b?craft:['splice5',['I have rope enough now. It wants joining to the half that is left on the near post.','I should use the tarred rope with the near post.']];
    if(!F.lineUp)return b?['wade5b',['Paul has made the rope whole. I have a staff, and long legs.','I should use my staff with the river, and carry the end across.']]
      :['wade5',['The rope will reach, but it must be carried over. Two are better than one, and one of us has a staff.','Barnabas should carry it across. I can let him.']];
    if(!F.crossed)return b?['cross5b',['I am over, and the line is fast. The rest is for Paul to send across.','Paul should talk to the drover now.']]
      :['cross5',['The line is up, from post to post. The train is waiting for the word.','I should talk to Papias, and bring them all over.']];
    return['pass5',['Everyone is over, and the light is going.','We can take the road up to the pass.']]}
  if(inOut()){
    if(!F.cheered)return b?['cheer5b',['It is Paul whom Eumenes is asking. It was his word that he heard first.','Paul should talk to Eumenes.']]
      :['cheer5',['They are afraid of being left with nothing. But it was never our word that they believed.','I should talk to Eumenes, and remind him in whom he put his faith.']];
    return['dust5',['One thing is left to do, as our Lord told those he sent out. And not in anger.','I should use the boundary stone, and shake the dust from my feet.']]}
  if(!F.spoke1)return G.room==='synp'?['seat5',['A visitor does not ask for the platform. He takes a seat, and waits to be asked.',b?'Paul and I should take a seat. I can use the bench.':'I should use the bench, and wait.']]
    :['syn5',['Tomorrow is the Sabbath, and there is a synagogue across the square.','We can go in at the door of the synagogue.']];
  if(b){if(!F.joel)return['joel5b',['Joel has tasted something good, and he is afraid of what it will cost him. He does not need my story. He needs to keep hold of what he was given.','I should talk to Joel, and urge him to hold on to the undeserved kindness of God.']];
    return allThree()?['sab5',['The week is over, and the city is waiting.','We can go to the door of the synagogue.']]:['paul5b',['The others are asking for Paul. It was his word that they heard.','Paul should talk to Eumenes and to Papias.']]}
  if(!F.eum)return['eum5',['Eumenes wants more than my word for it. And something is written for a foreigner who keeps himself by the door.','I should talk to Eumenes, and show him what is written about the foreigner.']];
  if(!F.pap)return['pap5',['Papias has never heard the Prophets read. But he has crossed mountains all his life.','I should talk to Papias, and begin with the God who made the mountains.']];
  if(!F.joel)return['joel5',['Joel will not tell me what weighs on him. It is Barnabas he trusts with it.','Barnabas should talk to Joel. I can let him.']];
  return['sab5',['The week is over, and the city is waiting.','We can go to the door of the synagogue.']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={nod:['Yes. The whole house asked it. Hanan asked it himself.'],
  shake:['No. They have heard, and what they do with it is theirs to answer for. We are free of it.']};
return{acting:ACTING,rooms:['perga','ford','pisidia','synp','border'],setup:setup5,start:start5,hint:hint5,music:MUSIC,topics:TOPICS,tablets:TABLETS,
  /* Antioch in Pisidia and Iconium lie north of the map's usual window, so this chapter looks through the northern one. The whole of the
     first journey so far is on it; the chapter's own road draws itself at the end */
  view:'north',route:VOYAGE.map(l=>l.slice(0,2)).concat([['perga','antiochp','new'],['antiochp','iconium','new']]),
  /* names that would lie across this chapter's routes on their usual side */
  labels:LABELS,
  places:{
    paphos:{room:'-',if:()=>false,no:'We put out to sea from Paphos, and the work lies ahead of us, not behind.'},
    perga:{room:'perga',x:176,y:124,dir:1},
    antiochp:{room:'pisidia',x:120,y:124,dir:1,if:inPerga},
    iconium:{room:'border',x:236,y:124,dir:-1,if:()=>false,no:'Iconium lies far beyond Antioch, and Antioch has not heard yet. One city at a time.'}},
  way:()=>VOYAGE.map(l=>l.slice(0,2)),arrive:arrive5,
  flags:['metPap','metEum','markTold','bread','shod','gotLine','spliced','lineUp','crossed','spoke1','eum','joel','pap','out','cheered'],
  codeBits:{flags:20,rooms:3,share:9},party:['paul','barnabas'],home:{staff5:'barnabas'},share:['awl','thread','knife','tablets','bread','thong','roof','line','staff5'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)},low=room==='perga'||room==='ford';
    add(F.markTold&&low,'bread');add(F.markTold&&!F.shod,'thong');add(F.markTold&&low&&!F.gotLine,'roof');add(F.gotLine&&!F.spliced,'line');inv.push('staff5');return inv},
  place:place5}
});
