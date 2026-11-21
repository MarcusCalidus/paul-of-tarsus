/* Paul of Tarsus: level data for Chapter Ten, "Is It So?".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Thessalonica and Beroea (Acts 17:1-15): the road through Amphipolis and Apollonia; three Sabbaths in the synagogue of Thessalonica,
   and the work by night and day beside them (1 Thessalonians 2:9); the mob, Jason and the security; by night to Beroea, where the
   Scriptures are searched every day; and Paul sent to the sea while Silas and Timothy stay. Acts does not say why they passed through
   Amphipolis and Apollonia, how long they were in Thessalonica, what Paul worked at there, which passages he used, whether Timothy was
   with them in Thessalonica, where Paul and Silas were when the house was stormed, what the security was, what the Beroeans examined,
   from which harbor Paul sailed, or whether his instruction was spoken or written: the chapter claims none of it, and its end screen
   says so. Luke stayed in Philippi, so the narration says "they" throughout, as the account does.
   What the account itself says is told by the narrator, in paraphrase with its reference, and never put into a mouth as a quotation:
   those lines stand together in TOLD below. The passages on the scroll table are notes in Paul's own words (PS), and so are the lines of
   what was handed on to him (EV), so that their wording can be compared with the Study Edition in one place.
   The study note on Acts 17:3 says that the proving was, literally, a placing of one thing beside another. That is the chapter's device:
   the scroll table (ROOMS.table10), where scrolls are wound to a place and Paul's tablets turned to a line until all of them say one
   thing. A row is used only if the Study Edition's own marginal references link its parts (ROWS). */
LEVEL(10,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* The plain major scale from B flat, which no earlier chapter has used. In Thessalonica the tune walks in bars of seven, two and two and
   three (fourteen steps, grouped four, four and six): a walk with a catch in it, for men whose backs have not healed. In Beroea the same
   notes run in even bars (MUSICB). No phrase ends on the seventh note of the scale, so that the tune does not lean forward as a later
   century's would. In Jason's courtyard by day (mood "calm") a lyre, a low string, a hand drum and a ney; by night at the bench (mood
   "night") a low drone and a harp, far apart; in the synagogue (mood "still") a harp alone; at the scroll table (mood "table") nothing
   at all: only the notes the scrolls give, and the room; when the city is in an uproar (mood "tense") a drone, a slow drum and a few
   notes of the oud. Nothing is claimed about how music was played in Paul's day: it is not known how it sounded. */
const _=null,
 TUNE=[[[0,0,4],[4,2,4],[8,4,2],[10,5,2],[12,4,2]],[[0,2,4],[4,1,4],[8,2,6]],[[0,4,4],[4,5,4],[8,7,2],[10,5,2],[12,4,2]],[[0,2,4],[4,3,2],[6,1,2],[8,0,6]],
  [[0,7,4],[4,5,4],[8,4,4],[12,2,2]],[[0,4,4],[4,2,4],[8,1,6]],[[0,0,2],[2,2,2],[4,4,4],[8,5,2],[10,4,2],[12,2,2]],[[0,1,4],[4,2,4],[8,0,6]]],
 TUNEB=[[[0,0,4],[4,2,4],[8,4,2],[10,5,2],[12,4,4]],[[0,2,4],[4,1,4],[8,2,8]],[[0,4,4],[4,5,4],[8,7,2],[10,5,2],[12,4,4]],[[0,2,4],[4,3,2],[6,1,2],[8,0,8]],
  [[0,7,4],[4,5,4],[8,4,4],[12,2,4]],[[0,4,4],[4,2,4],[8,1,8]],[[0,0,2],[2,2,2],[4,4,4],[8,5,2],[10,4,2],[12,2,4]],[[0,1,4],[4,2,4],[8,0,8]]],
 SCALE=[0,2,4,5,7,9,11],
 MUSIC={dt:.17,steps:14,group:[4,4,6],root:58,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['calm'],prog:'AABAACAA',len:3,seq:{A:[0,_,4,_,2,_,4,_,0,_,2,_,4,_],B:[3,_,7,_,5,_,7,_,3,_,5,_,7,_],C:[1,_,5,_,3,_,5,_,1,_,3,_,5,_]}},
  {inst:'bass',moods:['calm'],prog:'AABAACAA',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_]}},
  {drum:1,moods:['calm'],prog:'AAAB',seq:{A:'d...t...d..t..',B:'d...t...d..t.k'},vol:.8},
  {inst:'ney',moods:['calm'],loop:8,oct:12,lines:TUNE,vol:.9},
  {drone:[0],every:28,moods:['night'],vol:.5},
  {inst:'harp',moods:['night'],prog:'ABAC',len:8,oct:12,vol:.7,seq:{A:[0,_,_,_,4,_,_,_,2,_,_,_,_,_],B:[1,_,_,_,5,_,_,_,3,_,_,_,_,_],C:[0,_,_,_,2,_,_,_,-3,_,_,_,_,_]}},
  {inst:'harp',moods:['still'],prog:'AB',len:8,oct:12,vol:.55,seq:{A:[0,_,_,_,_,_,_,_,4,_,_,_,_,_],B:[2,_,_,_,_,_,_,_,5,_,_,_,_,_]}},
  {drone:[0,7],every:28,moods:['tense']},
  {drum:1,moods:['tense'],seq:{A:'d.............'},vol:.7},
  {inst:'oud',moods:['tense'],prog:'AB',len:5,vol:.6,seq:{A:[0,_,_,_,_,_,_,_,_,_,1,_,_,_],B:[0,_,_,_,_,_,_,_,-2,_,_,_,_,_]}}]},
 /* Beroea, and the quay at Athens: the same key and the same tune, in even bars of sixteen steps. In the synagogue (mood "calm") a harp,
    a low string and a ney; when the strangers stand at the gate (mood "tense") the drone, the slow drum and the oud; on the quay (mood
    "rest") the harp alone. */
 MUSICB={dt:.15,steps:16,root:58,scale:SCALE,bars:16,tracks:[
  {inst:'harp',moods:['calm','rest'],prog:'AABAACAA',len:4,oct:12,vol:.8,seq:{A:[0,_,4,_,2,_,4,_,0,_,2,_,4,_,2,_],B:[3,_,7,_,5,_,7,_,3,_,5,_,7,_,5,_],C:[1,_,5,_,3,_,5,_,1,_,3,_,5,_,3,_]}},
  {inst:'bass',moods:['calm'],prog:'AABAACAA',len:7,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.35},
  {inst:'ney',moods:['calm'],loop:8,oct:12,lines:TUNEB,vol:.9},
  {drone:[0,7],every:32,moods:['tense']},
  {drum:1,moods:['tense'],seq:{A:'d...............'},vol:.7},
  {inst:'oud',moods:['tense'],prog:'AB',len:5,vol:.6,seq:{A:[0,_,_,_,_,_,_,_,_,_,_,_,1,_,_,_],B:[0,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_]}}]};
/* The scroll table has no score. A roller that is wound gives one plucked note, a note for each place, and a row that holds sounds as
   a chord. Every step can be solved from the text alone: the game stays quiet in Silent Mode. */
const pluck10=(deg,v,dt)=>{if(AU.ctx)INST.harp(mtof(note(deg,12,MUSIC)),now()+(dt||0),.5,v||1)};
const chord10=()=>{[0,2,4,7].forEach((d,i)=>pluck10(d,.9,.02+i*.07))};
/* the uproar, as it is heard from a courtyard: a crowd some streets away, coming nearer, and a gate thrown open. No drum takes its side. */
function uproar(){if(!AU.ctx)return;const t=now()+.05;noise({t,d:7,v:.34,a:2.4,sus:1,f:520,q:.7});noise({t:t+1.2,d:5.6,v:.2,a:2,sus:1,f:900,q:.9});
  for(let i=0;i<12;i++)noise({t:t+1.6+Math.random()*4.6,d:.05,v:.1,f:700+Math.random()*500,q:2.4});
  noise({t:t+4.2,d:.16,v:.34,f:300,q:.8,type:'lowpass'});tone({f:120,to:70,t:t+4.2,d:.3,type:'triangle',v:.2,echo:1})}

/* ============ ART ============ */
const SH='#8f95c8',CLOTH='#3d342d';
/* cast: figures posed in a scene or on the benches, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,o.lit||lit,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),7.5)})}
/* niche: a lamp in a round-headed niche in a plastered wall */
function niche(g,x,y,W){arch(g,x,y,14,18,tint(W,-.32));arch(g,x+1.4,y+1.4,11.2,16.6,'#4a3828');R(g,x-1,y+17.6,16,1.6,tint(W,.16));R(g,x+3.6,y+15,6.4,2.6,'#b8733c');R(g,x+3.6,y+15,6.4,.6,'#e0a064');R(g,x+9.4,y+14.2,1.8,1.2,'#b8733c')}
/* bench: a stone bench along a wall, in two tiers. The joints of each tier stop short of its edges, and those of the lower tier stand
   between those of the upper one, so that no upright runs across a level line. */
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}

/* ---------- Jason's courtyard in Thessalonica: by day, by night at the bench, and at dusk when the house has been stormed ---------- */
/* The bolt of goat-hair cloth lies pegged out along the foot of the wall, behind where anyone walks. Nothing is seen of the assault:
   the dusk variant shows a gate left open, a broken jar and a bench swept bare. */
const yardV=()=>G.up10?'u':F.r2&&!F.sewn?'n':'';
ART.yard10={w:320,q:12,variant:yardV,
 paint(g,v){const r=rng(1011),W='#e0d0aa',night=v==='n',dusk=v==='u';
  /* the courtyard is open to the sky: a strip of it over the wall, and the crown of a tree that stands in the street */
  if(night){sky(g,320,22,['#0e1430','#1a2444','#2a3458']);for(let i=0;i<70;i++)R(g,r()*320,r()*16,.5,.5,`rgba(236,236,255,${.3+r()*.6})`)}
  else sky(g,320,22,dusk?['#c8784a','#e8a868','#f0cc98']:['#4a86c8','#86b2dc','#cfe0ea']);
  if(!night&&!dusk)cloud(g,214,6,40,3,r);
  foliage(g,46,13,30,9,night?'#2a3e2c':dusk?'#6a6a3a':'#5c8a48',r,150);foliage(g,84,15,16,6,night?'#2a3e2c':dusk?'#6a6a3a':'#68964e',r,60);
  plaster(g,0,17,320,87,W,r,{patch:3,cracks:5,brick:'#b08a5a',t:.5});
  /* the eave of the house: a course of tiles along the top of the wall, and their shadow under it */
  R(g,0,13,320,6,'#b8603c');for(let i=0;i<320;i+=5)R(g,i,13,.5,6,'rgba(90,40,24,.35)');R(g,0,13,320,.8,'#d88a5c');R(g,0,19,320,1.2,'rgba(60,40,60,.45)');ao(g,0,20,320,9,'t',.3,'#3a3050');
  R(g,0,74,320,30,tint(W,-.14));tex(g,'mott',.4,0,74,320,30,'overlay',1);R(g,0,73,320,1.2,tint(W,.14));
  /* the gate to the street, its leaf swung back against the wall */
  R(g,14,42,40,62,tint(W,-.2));arch(g,18,46,32,58);g.fillStyle=night?lg(g,0,46,0,104,['#141a34','#262c48','#34364e']):dusk?lg(g,0,46,0,104,['#e8a868','#e8c090','#c8a882']):lg(g,0,46,0,104,['#a8cdea','#e8e2cc','#e0d2ae']);g.fill();
  g.save();arch(g,18,46,32,58);g.clip();R(g,18,70,32,18,night?'#3a3a52':dusk?'#d8b890':'#e6d8b6');R(g,18,68.6,32,1.6,night?'#4a3a40':'#b8603c');R(g,27,75,7,7,night?'#1a1a2a':'#3a2c22');
  R(g,18,88,32,16,night?'#34364a':dusk?'#c4a888':'#cfc4a8');for(let i=0;i<3;i++)R(g,18,91+i*4,32,.5,'rgba(90,80,70,.35)');g.restore();
  boards(g,6,50,10,54,5,'#5a4226',r);R(g,6,50,10,.8,'#8a6a42');R(g,15.4,50,.8,54,'#2a1c10');
  /* a shuttered window, and the door of the house */
  windowArt(g,104,40,16,14,W,{shut:1});R(g,264,44,36,60,tint(W,-.18));doorArt(g,267,47,30,57,'#6a4a2c',r,{bands:[],left:1});
  /* the workbench against the wall, and a lamp in its niche over it */
  niche(g,204,42,W);
  R(g,178,104,68,4,'rgba(40,30,60,.3)');wood(g,176,88,70,4,'#8a683a');R(g,176,91.6,70,1,'#5a4226');wood(g,178,92,3,12,'#5a4226',1);wood(g,241,92,3,12,'#5a4226',1);wood(g,182,97,58,2,'#6a4e2c');
  if(!dusk){vessel(g,234,88,3,6,'#8a4a2a','jug',{noShadow:1});R(g,186,86.4,14,1.6,'#c8b890');R(g,186,86.4,14,.5,'#efe2bc')}
  /* a great jar of water by the gate; at dusk it lies broken */
  if(!dusk)vessel(g,64,106,6,17,'#9a5a36','pithos');
  /* the paving */
  pave(g,0,103,320,144,'#cdc09e',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  if(dusk){/* the jar, in pieces, and the water it held; a stool on its side by the bench; the cord and two pegs, kicked across the paving */
    comp(g,'multiply',.45,()=>oval(g,70,116,24,5,'#7a8ab0'));
    for(const[x,y,w,h]of[[52,112,11,6],[66,118,9,5],[80,113,7,5],[60,121,6,3],[90,119,5,3],[74,110,5,3]]){const c=tint('#9a5a36',(r()-.5)*.3);poly(g,[x,y,x+w,y-h*.3,x+w*.86,y+h*.5,x+w*.2,y+h*.7],c);poly(g,[x,y,x+w,y-h*.3,x+w*.7,y+h*.1],tint(c,.25))}
    poly(g,[214,110,232,108,234,114,216,116],'#7a5c36');poly(g,[214,110,232,108,232.6,110,214.6,112],'#b08a5a');poly(g,[216,116,218,122,220.4,121.6,218.6,115.6],'#5a4226');poly(g,[231.6,114.2,236,119,238,118,234,113.8],'#5a4226');
    stroke(g,[118,126,140,123,166,127,190,124],'#d8c9a0',.7);R(g,112,128,2,1.6,'#8a6a42');R(g,196,121,2,1.6,'#8a6a42')}
  if(night)lightmap(g,320,'#3a3c5e',l=>{pool(l,211,54,36,32,'#ffc070',.95);pool(l,211,104,96,52,'#ffb060',.6);pool(l,34,88,40,50,'#5a66a0',.4)});
  else if(dusk)lightmap(g,320,'#b89c98',l=>{pool(l,34,84,70,80,'#ffd0a0',1);pool(l,90,124,150,40,'#ffc898',.6)});
  else{shade(g,[0,104,320,104,320,112,0,116],SH,.35);comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,320,41)});pool(g,34,84,70,70,'#fff0cc',.22,'screen')}},
 light(){const v=yardV();return v==='n'?{amb:'#6c6e96',lamps:[[211,96,96,'#7a5220']]}:v==='u'?{amb:'#e8cdbc'}:null},
 draw(g,t){const v=yardV();if(v==='n')flame(g,214.6,55.6,t);
  /* the bolt, pegged out at the foot of the wall: until it is cut. Its third cubit from the left is woven thin. */
  if(!F.cutd&&v!=='u'){const x0=80,x1=200,y0=105.2,y1=112.4,k=v==='n'?.5:1,c=tint(CLOTH,k<1?-.3:0);poly(g,[x0,y0,x1,y0,x1+6,y1,x0-6,y1],c);
    for(let i=1;i<12;i++){const a=x0+(x1-x0)*i/12,b=x0-6+(x1-x0+12)*i/12;if(i===2||i===3)continue;R(g,(a+b)/2,y0+.4,.5,y1-y0-.8,'rgba(255,240,210,.05)')}
    poly(g,[x0+(x1-x0)*2/12,y0,x0+(x1-x0)*3/12,y0,x0-6+(x1-x0+12)*3/12,y1,x0-6+(x1-x0+12)*2/12,y1],tint(c,.22));R(g,x0,y0,x1-x0,.5,tint(c,.3));
    for(const[px,py]of[[x0-1,y0-1],[x1,y0-1],[x0-7,y1],[x1+6,y1]])R(g,px,py,1.4,1.4,'#8a6a42')}
  /* what the bench holds: the cut panels, folded; then the tent, rolled, until the trader has it */
  if(F.cutd&&!F.sewn&&v!=='u')for(let i=0;i<4;i++){R(g,204,85.4-i*1.6,22-i*2,1.6,tint(CLOTH,i%2?.12:0));R(g,204,85.4-i*1.6,22-i*2,.4,'rgba(255,240,210,.18)')}
  if(F.sewn&&!F.sold&&v!=='u'){g.fillStyle=lg(g,0,80,0,88,[tint(CLOTH,.3),CLOTH,tint(CLOTH,-.4)]);g.fillRect(200,80.6,30,7.4);R(g,200,80.6,2.4,7.4,tint(CLOTH,.2));R(g,227.6,80.6,2.4,7.4,tint(CLOTH,-.3))}},
 front(){}};

/* ---------- The bolt, seen from above: twelve cubits by four, pegged out on the paving ---------- */
/* The game's first close view of a piece of work. Nobody walks here. The cloth has no grid drawn on it, and no chalk line; its thin strip
   is loose threads that all run one way, with nothing drawn across them. A knotted
   cord lies along two of its edges, one knot to the cubit, and a panel that has been laid out is a paler patch of the same cloth, with a
   hem of shadow on two sides. The six panels wait on a board below, small. */
const BX=28,BY=13,CELL=22,COLS=12,ROWS_B=4,THIN=2,TRAY_Y=112,TC=6;
/* the panels of the tent, in cubits; where each waits on the board; and its tint */
const PIECES=[{id:'roof',name:'roof panel',w:4,h:4,tx:26,c:'#b89c62'},{id:'long',name:'long wall',w:6,h:2,tx:60,c:'#8c9aa8'},{id:'end',name:'end wall',w:3,h:2,tx:106,c:'#9aa88c'},
  {id:'flap',name:'door flap',w:2,h:2,tx:134,c:'#b0806a'},{id:'g1',name:'gusset',w:2,h:1,tx:156,c:'#a898b0'},{id:'g2',name:'second gusset',w:2,h:1,tx:178,c:'#a898b0'}];
ART.bolt10={w:320,q:12,
 paint(g){const r=rng(1013);
  ashlar(g,0,0,320,144,'#bfb294',r,{bw:30,bh:19,v:.07,t:.45,m:'#8e8670'});
  /* the shadow of the wall across one corner, and the day on the rest */
  comp(g,'multiply',.3,()=>poly(g,[0,0,120,0,0,40],'#7a80b4'));
  /* the cloth: goat hair, nearly black, its weave running the long way; the selvage along both long edges */
  R(g,BX+1.6,BY+2,COLS*CELL,ROWS_B*CELL,'rgba(20,16,30,.4)');R(g,BX,BY,COLS*CELL,ROWS_B*CELL,CLOTH);
  inRect(g,BX,BY,COLS*CELL,ROWS_B*CELL,()=>{tex(g,'wood',.5,BX,BY,COLS*CELL,ROWS_B*CELL,'overlay',.6);tex(g,'grain',.3,BX,BY,COLS*CELL,ROWS_B*CELL,'overlay',.5);
    /* the thin strip: one cubit where the weave is loose, and the paving shows through it */
    const tx=BX+THIN*CELL;R(g,tx,BY,CELL,ROWS_B*CELL,'rgba(196,184,152,.16)');
    for(let i=0;i<CELL;i+=1.5){let y=BY;while(y<BY+ROWS_B*CELL){const len=6+r()*16;R(g,tx+i,y,.75,Math.min(len,BY+ROWS_B*CELL-y),'rgba(206,194,160,.4)');y+=len+1+r()*3}}
    ao(g,BX,BY,COLS*CELL,5,'t',.25);ao(g,BX,BY+ROWS_B*CELL-5,COLS*CELL,5,'b',.25)});
  R(g,BX,BY,COLS*CELL,1,tint(CLOTH,.24));R(g,BX,BY+ROWS_B*CELL-1,COLS*CELL,1,tint(CLOTH,.14));
  /* pegs at the corners, each a small square of wood */
  for(const[px,py]of[[BX-3,BY-3],[BX+COLS*CELL+1,BY-3],[BX-3,BY+ROWS_B*CELL+1],[BX+COLS*CELL+1,BY+ROWS_B*CELL+1]]){R(g,px,py,2.4,2.4,'#7a5a34');R(g,px,py,2.4,.6,'#b08a5a')}
  /* the measuring cord, one knot to the cubit: along the far edge, and down the left one. The two do not meet. */
  R(g,BX+4,BY-6.4,COLS*CELL-8,.6,'#d8c9a0');for(let i=1;i<COLS;i++)R(g,BX+i*CELL-.8,BY-7.2,1.6,2,'#f0e2bc');
  R(g,BX-6.6,BY+5,.6,ROWS_B*CELL-10,'#d8c9a0');for(let j=1;j<ROWS_B;j++)R(g,BX-7.3,BY+j*CELL-.8,2,1.6,'#f0e2bc');
  /* the board on which the panels are reckoned, and the stool he rose from, with his pouch */
  R(g,18,TRAY_Y-3.4,184,31,'rgba(20,16,30,.36)');wood(g,16,TRAY_Y-5,184,31,'#7a5c36');R(g,16,TRAY_Y-5,184,.8,'#b08a5a');
  oval(g,268,128,24,10,'rgba(20,16,30,.36)');oval(g,266,125,22,9,'#6a4e2c');oval(g,266,124,20,8,'#96703e');g.strokeStyle='#b89058';g.lineWidth=.6;g.beginPath();g.ellipse(266,124,14,5.4,0,0,6.2832);g.stroke();
  poly(g,[230,116,244,113,248,124,236,128],'#6e4a2e');poly(g,[230,116,244,113,245,116,231,119],'#8a6a4a');
  pool(g,200,40,220,130,'#fff4d6',.1,'screen')},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.bolt10;if(!st)return;
  /* panels laid out on the cloth: paler patches, each with a hem of shadow below and to the right */
  for(const p of PIECES){const q=st.at[p.id];if(!q)continue;const x=BX+q.x*CELL,y=BY+q.y*CELL,w=q.w*CELL,h=q.h*CELL;
    g.fillStyle=rgba(p.c,.5);g.fillRect(x,y,w,h);R(g,x,y,w,.6,rgba('#fff6dc',.5));R(g,x,y,.6,h,rgba('#fff6dc',.4));R(g,x,y+h-1,w,1,'rgba(10,8,14,.5)');R(g,x+w-1,y,1,h,'rgba(10,8,14,.5)')}
  /* the panel in hand, shown where it would lie: under the pointer */
  const sel=PIECES.find(p=>p.id===st.sel);
  if(sel&&st.mx!=null&&!G.busy){const cx0=Math.floor((st.mx-BX)/CELL),cy0=Math.floor((st.my-BY)/CELL),[w,h]=st.turn[sel.id]?[sel.h,sel.w]:[sel.w,sel.h];
    if(cx0>=0&&cy0>=0&&cx0<COLS&&cy0<ROWS_B){const fits=cx0+w<=COLS&&cy0+h<=ROWS_B;g.fillStyle=rgba(fits?sel.c:'#b04a3a',.34+.08*Math.sin(t/260));g.fillRect(BX+cx0*CELL,BY+cy0*CELL,Math.min(w,COLS-cx0)*CELL,Math.min(h,ROWS_B-cy0)*CELL)}}
  /* the board: each panel small, as it is turned; one that lies on the cloth leaves only its place */
  for(const p of PIECES){const[w,h]=st.turn[p.id]?[p.h,p.w]:[p.w,p.h],x=p.tx,y=TRAY_Y;
    if(st.at[p.id]){R(g,x,y,w*TC,h*TC,'rgba(30,20,10,.3)');continue}
    R(g,x+1,y+1,w*TC,h*TC,'rgba(20,14,8,.5)');R(g,x,y,w*TC,h*TC,mix(CLOTH,p.c,.55));R(g,x,y,w*TC,.6,rgba('#fff6dc',.5));
    if(st.sel===p.id){g.fillStyle=rgba('#ffe9a8',.3+.16*Math.sin(t/200));g.fillRect(x,y,w*TC,h*TC)}}},
 front(){}};

/* ---------- The synagogue of Thessalonica ---------- */
/* Benches of stone round three sides, a low platform with the reading table, and the chest of the scrolls, which is carried in and set
   in its place (Insight, "Synagogue"). The windows have upright bars only. Nobody is seated: the hearers stand before their benches. */
ART.syn10={w:320,q:12,
 paint(g){const r=rng(1017),W='#dccfae',ST='#c4baa0';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:4,brick:'#b08a5a',t:.45});
  for(let i=12;i<320;i+=38)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* three high windows, each with upright bars */
  for(const x of[84,152,220]){R(g,x-2,22,20,22,tint(W,-.2));g.fillStyle=lg(g,0,24,0,42,['#9cc4e4','#dfe8e2']);g.fillRect(x,24,16,18);for(let i=1;i<4;i++)R(g,x+i*4-.4,24,.8,18,'#5a4a36');ao(g,x,24,16,4,'t',.4);R(g,x-3,44,22,1.6,tint(W,.2))}
  /* the door to the street */
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  /* benches along the wall, in two tiers */
  bench(g,56,89,170,ST);bench(g,270,89,50,ST);
  /* two lamps in their niches */
  niche(g,60,52,W);niche(g,246,52,W);
  /* the chest of the scrolls, under a cloth of blue with a plain hem; it stands on its own feet */
  R(g,234,104,34,3,'rgba(40,30,60,.34)');wood(g,236,72,30,30,'#7a5632');R(g,236,72,30,.8,'#b08a5a');R(g,238,101,3,3,'#4a3420');R(g,261,101,3,3,'#4a3420');
  g.fillStyle=lg(g,0,68,0,84,['#5a78a8','#3f5f86','#2c4668']);g.fillRect(234,68,34,15);R(g,234,82,34,1.2,'#c9a14a');R(g,234,68,34,.8,'#8aa4cc');for(let i=0;i<5;i++)R(g,238+i*7,69.6,.5,9.6+(i%2)*1.4,'rgba(20,30,60,.3)');
  /* the floor, and the platform: two boards high, with the reading table on it */
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  R(g,120,121,84,3,'rgba(30,24,50,.4)');wood(g,118,114,84,7,'#7a5c36');R(g,118,114,84,.8,'#b08a5a');wood(g,118,110,84,4,'#96703e');R(g,118,110,84,.7,'#c8a06a');
  wood(g,138,100,3,10,'#5a4226',1);wood(g,179,100,3,10,'#5a4226',1);wood(g,134,96,52,4,'#8a683a');R(g,134,96,52,.7,'#c8a06a');R(g,134,99.4,52,.7,'#4a3420');
  /* two scrolls on it, small: each a pale sheet between two rolls */
  for(const x of[140,164]){R(g,x+2,94.4,12,1.8,'#e6dcc0');R(g,x,93.8,2.6,2.8,'#b89058');R(g,x+13.4,93.8,2.6,2.8,'#b89058')}
  lightmap(g,320,'#b2a8b0',l=>{for(const x of[92,160,228])pool(l,x,60,40,60,'#fff4d8',.8);pool(l,160,116,190,44,'#ffeecc',.5)})},
 /* the platform and its table stand inside the strip where people walk: whoever goes behind them is hidden by them */
 props:[{y:121,shape(g){R(g,118,110,84,11,'#000');R(g,134,96,52,14,'#000')}}],
 light:{amb:'#e6dcd8'},draw(){},front(){}};

/* ---------- The scroll table, seen from above ---------- */
/* Two scrolls in Thessalonica (the Psalms and the Prophets), three in Beroea (Moses as well), and Paul's tablets in front of them.
   Everything that moves is drawn in draw(): a scroll is a sheet between two rolls, as thick as they are wound; rolled shut it is the
   two rolls side by side. A roll is a plain cylinder: no handle stands out of it and no tie goes round it. The writing is short
   strokes that stop short of the margins; the columns are parted by a gap, not by a line. What stands in each open column is named
   under it, in the player's language (cap10). */
const tabV=()=>F.gone?'b':'';
/* where the scrolls lie: [left edge, width] for two, and for three */
const SLOT={2:[[26,122],[172,122]],3:[[10,94],[113,94],[216,94]]},SY=23,SHH=52,ROLLW=11;
ART.table10={w:320,q:12,variant:tabV,
 paint(g,v){const r=rng(1019),b=v==='b',WD=b?'#8a6a3e':'#7a5a34',rim=15;
  R(g,0,0,320,144,WD);tex(g,'wood',.32,0,0,320,144,'overlay',1.6);tex(g,'grain',.1,0,0,320,144,'overlay',.5);
  /* those who listen, across the table: seen from above, their shoulders in tunic and mantle and the crowns of their heads over the table's edge */
  R(g,0,0,320,rim,'#231b15');R(g,0,rim,320,1.1,'#b08a58');R(g,0,rim+1.1,320,.9,'#5a4226');ao(g,0,rim+2,320,6,'t',.38);
  const men=b?[[57,96,11.4,8.8,'#9a8664','#b8a47c','#b88a62','#d0d0d0',1,'#d0d0d0'],[160,92,11,8.5,'#6e8c82','#4f6f7c','#c89868','#2a1a12',0,null],[263,96,11.4,8.8,'#8e7a56','#b09a6c','#b47e52','#4a3220',0,'#4a3220']]
    :[[57,96,11.4,8.8,'#7a6880','#b8a680','#a8703f','#8a8a8a',0,'#8a8a8a'],[160,92,11,8.5,'#b8b09c','#587482','#c69870','#5a4026',0,null],[263,96,11.4,8.8,'#9a705a','#7a8a5a','#c08c5c','#3a2a1c',0,'#3a2a1c']];
  men.forEach(([cx,w,hrx,hry,tu,cl,sk,ha,bald,bd],i)=>{const mr=rng(4001+i*77+(b?0:300)),hw=w/2,shY=rim-10,hy=rim-5.2;
    oval(g,cx+1.5,shY+3.5,hw+2,11.2,'rgba(14,10,8,.55)');
    oval(g,cx,shY,hw,11.4,tint(tu,-.2));oval(g,cx-1.2,shY-.5,hw-2,10.6,tu);oval(g,cx-4,shY-1.5,hw*.72,8.5,tint(tu,.14));
    poly(g,[cx+hw*.42,0,cx+hw*.52,0,cx+hw*.25,rim-2,cx+hw*.17,rim-1.6],tint(tu,-.24));
    poly(g,[cx-hrx-3,0,cx+hrx+3,0,cx+4,hy+2,cx-4,hy+2],tint(tu,-.38));poly(g,[cx-hrx-1,0,cx+hrx+1,0,cx+3,hy+1,cx-3,hy+1],tint(sk,-.22));
    poly(g,[cx-hw+1,0,cx-2,0,cx-5,rim-.5,cx-hw+3,rim-2.5],cl);poly(g,[cx-hw+2,0,cx-6,0,cx-9,rim-.9,cx-hw+5,rim-3.5],tint(cl,.16));
    poly(g,[cx-hw*.58,0,cx-hw*.46,0,cx-hw*.68,rim-2.2,cx-hw*.78,rim-2.8],tint(cl,-.22));poly(g,[cx-5,0,cx-2,0,cx-5,rim-.5,cx-8,rim-.7],tint(cl,-.28));
    oval(g,cx+1,hy+2.2,hrx+.8,hry+1,'rgba(18,12,8,.55)');
    if(bd){oval(g,cx,hy+hry*.62,hrx*.82,hry*.68,tint(bd,-.22));oval(g,cx-.6,hy+hry*.56,hrx*.72,hry*.6,bd);oval(g,cx-1.5,hy+hry*.52,hrx*.45,hry*.42,tint(bd,.14))}
    oval(g,cx,hy+hry*.32,hrx*.84,hry*.58,tint(sk,-.1));oval(g,cx-.6,hy+hry*.28,hrx*.72,hry*.48,sk);
    oval(g,cx,hy+hry*.88,2.2,1.8,tint(sk,-.05));R(g,cx-1.2,hy+hry*.78,2,1.4,tint(sk,.18));
    oval(g,cx-hrx-.4,hy+.4,1.8,2.6,tint(sk,.05));oval(g,cx+hrx+.4,hy+.4,1.8,2.6,tint(sk,-.18));
    oval(g,cx,hy-1.2,hrx,hry*.85,tint(ha,-.22));oval(g,cx-.8,hy-1.6,hrx*.88,hry*.76,ha);
    for(let j=0;j<18;j++){const a=mr()*6.2832,d=Math.sqrt(mr())*.78,lx=cx+Math.cos(a)*d*hrx,ly=(hy-1.4)+Math.sin(a)*d*hry*.75,
      sh=(-(lx-cx)/hrx-(ly-hy)/hry)*.22+(mr()-.5)*.14;oval(g,lx,ly,2.2+mr()*1.8,1.6+mr()*1.2,tint(ha,sh))}
    if(bald){oval(g,cx,hy+.4,hrx*.68,hry*.82,tint(sk,-.04));oval(g,cx-1.2,hy-.6,hrx*.48,hry*.58,tint(sk,.18))}});
  /* the steps down from the platform, at the near corner */
  poly(g,[250,144,320,104,320,144],'#4a3620');poly(g,[262,144,320,112,320,116,270,144],'#6a4e2c');poly(g,[284,144,320,124,320,128,292,144],'#6a4e2c');
  lightmap(g,320,b?'#c8c0b8':'#b8aeb0',l=>{pool(l,b?200:120,60,230,110,'#fff0d0',.8);pool(l,160,118,150,40,'#ffe8c0',.4)})},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.tab10;if(!st)return;const n=st.n,slots=SLOT[n];
  st.s.forEach((k,i)=>{const[x,w]=slots[i],shut=!k,cx0=x+w/2,seed=rng(1031+i*97+(PLACE[k]?PLACE[k].seed:0)),
    roll=(rx,rw)=>{g.fillStyle=lg(g,rx,0,rx+rw,0,['#6a4e2c','#d8c08a','#b89c62','#5a4226']);g.fillRect(rx,SY-2,rw,SHH+4);R(g,rx,SY-2,rw,.8,'#ead9a8');R(g,rx,SY+SHH+1.2,rw,.8,'#3a2a18')};
    R(g,x+2,SY+SHH+2,w-2,3,'rgba(20,12,6,.4)');
    if(shut){const m=ROLLW+5;roll(cx0-m,m);roll(cx0,m);return}
    /* the sheet, and its columns: how far each roll is wound follows the place */
    const P0=PLACE[k],f=P0.at,lw=ROLLW+Math.round(8*f),rw=ROLLW+Math.round(8*(1-f)),sx=x+lw,sw=w-lw-rw;
    g.fillStyle=lg(g,0,SY,0,SY+SHH,['#efe4c6','#e6d9b6','#d8c9a0']);g.fillRect(sx,SY,sw,SHH);R(g,sx,SY,sw,.7,'#fff6dc');R(g,sx,SY+SHH-.8,sw,.8,'#a89468');
    const cols=sw>70?3:2,cw=(sw-6-(cols-1)*5)/cols;for(let c=0;c<cols;c++){const x0=sx+3+c*(cw+5),mid=c===(cols>2?1:0);
      for(let j=0;j<13;j++){const y=SY+4+j*3.5,len=cw*(.72+seed()*.28);R(g,x0,y,len,.9,mid&&j>3&&j<8?'#2a2018':'rgba(70,56,40,.62)')}
      if(mid)comp(g,'multiply',.16,()=>R(g,x0-1.5,SY+4+4*3.5-1.4,cw+3,4*3.5+1,'#e0a040'))}
    roll(x,lw);roll(x+w-rw,rw)});
  /* the tablets: two leaves of dark wax in wooden frames, open; or shut, one upon the other */
  if(st.has){const tx=106,ty=92,open=!!st.t;
    if(!open){R(g,tx+30,ty+4,50,36,'rgba(20,12,6,.4)');wood(g,tx+28,ty+2,50,36,'#8a5e30');R(g,tx+28,ty+2,50,.8,'#c8945a');R(g,tx+28,ty+36.4,50,1.6,'#4e3218')}
    else for(const dx of[0,55]){R(g,tx+dx+2,ty+2,52,40,'rgba(20,12,6,.4)');wood(g,tx+dx,ty,52,40,'#8a5e30');R(g,tx+dx,ty,52,.8,'#c8945a');R(g,tx+dx+4,ty+4,44,32,'#2c2118');R(g,tx+dx+4,ty+4,44,.8,'#120c06');
      const sd=rng(1051+dx+(EV[st.t]?EV[st.t].seed:0));for(let j=0;j<7;j++)R(g,tx+dx+7,ty+8+j*3.8,22+sd()*14,.8,dx&&j>1&&j<5?'#e8d8a8':'#9a8862')}}},
 /* the names of what lies open: under each scroll, and on the near edge of the table for the tablets */
 front(g,t){const st=G.tab10;if(!st)return;const slots=SLOT[st.n];G.caps10=[];
  st.s.forEach((k,i)=>{const[x,w]=slots[i];cap10(g,(k?PLACE[k]:SHUT).cap,x+w/2,SY+SHH+9,w+8)});
  if(st.has)cap10(g,(st.t?EV[st.t]:CLOSED).cap,186,138.4,150)}};
/* cap10: a caption on the table, in small letters with a dark edge, as the names on the map are written. It is made to fit its width. */
/* edge: the dark edge round words painted on the picture, a stroke with round joins behind the letters (five shifted copies of the
   words left steps on their curves) */
const edge=(g,s,x,y)=>{g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1;g.lineJoin='round';g.strokeText(s,x,y);g.restore()};
function cap10(g,s,x,y,w){s=T(s);let sz=4.6;const font=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;g.font=font(sz);g.textBaseline='middle';
  while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=font(sz)}const tw=g.measureText(s).width,tx=x-tw/2;
  G.caps10.push({s,w:tw,max:w,sz});edge(g,s,tx,y);g.fillStyle='#f4e4b8';g.fillText(s,tx,y)}

/* ---------- A house in Thessalonica, by night: not Jason's ---------- */
/* Where Paul and Silas were when the house was stormed, the account does not say. This is where the night finds them. The door has no
   bar across it, and the window is shuttered. */
ART.night10={w:320,q:12,
 paint(g){const r=rng(1021),W='#d8c8a2';
  plaster(g,0,0,320,104,W,r,{patch:3,cracks:5,brick:'#a8845a',t:.5});R(g,0,78,320,26,tint(W,-.24));tex(g,'mott',.4,0,78,320,26,'overlay',1);R(g,0,77,320,1.4,tint(W,.12));
  for(let i=14;i<320;i+=40)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  R(g,22,44,36,60,tint(W,-.16));doorArt(g,25,47,30,57,'#6a4a2c',r,{bands:[]});
  windowArt(g,104,40,18,14,W,{shut:1});niche(g,178,40,W);
  /* a shelf with a few vessels, and bundles against the wall: theirs, packed */
  wood(g,224,48,56,2,'#7a5c36');for(const[x,k,c,w,h]of[[234,'jug','#8a4a2a',3.2,8],[250,'bowl','#b06a3a',4,3.2],[266,'jar','#9a5a36',4,10]])vessel(g,x,48,w,h,c,k,{noShadow:1});
  sack(g,286,104,8,12,'#a89468');sack(g,302,105,7,10,'#8e7a52');
  pave(g,0,103,320,144,'#bfb293',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  clipTo(g,()=>poly(g,[96,117,236,117,250,138,82,138]),()=>{R(g,82,117,168,21,'#a8965e');for(let i=0;i<8;i++)R(g,82,118.4+i*2.6,168,.8,i%2?'#c8b67a':'#7a6c44');tex(g,'mott',.4,82,117,168,21,'overlay',1)});
  lightmap(g,320,'#4a4460',l=>{pool(l,185,50,36,32,'#ffc070',.95);pool(l,185,104,110,56,'#ffb060',.6);pool(l,60,110,60,40,'#5a5e90',.25)})},
 light:{amb:'#6e627a',lamps:[[185,96,110,'#7a5220']]},
 draw(g,t){flame(g,188.6,53.6,t)},front(){}};

/* ---------- The synagogue of Beroea ---------- */
/* A smaller house than the one in Thessalonica, at the foot of a mountain, which stands in its one wide window. The mountain is not
   named and nothing is said of it. The table stands at the back, under the window, and the scrolls lie open on it all day. */
ART.ber10={w:320,q:12,
 paint(g){const r=rng(1023),W='#e4d8b6',ST='#cabfa2';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:3,brick:'#b08a5a',t:.4});
  for(let i=18;i<320;i+=42)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.4,'#2a2030');
  /* the window: the mountain, green to its shoulder, and the morning over it */
  R(g,116,20,88,54,tint(W,-.2));g.save();g.beginPath();g.rect(120,24,80,46);g.clip();
  sky(g,320,70,['#5a94d2','#9cc2e2','#e4ecde']);cloud(g,150,32,22,3,r);
  ridge(g,120,200,70,x=>14+20*Math.exp(-Math.pow((x-172)/30,2))+3*Math.sin(x/7),['#8fa07a','#7c9a62','#6a8c52']);
  ridge(g,120,200,70,x=>6+5*Math.sin(x/11+1),['#7a9a58','#6a8c4c']);for(let i=0;i<14;i++)R(g,122+r()*76,62+r()*7,1.6,1,'#e6dcc0');g.restore();
  ao(g,120,24,80,5,'t',.4);ao(g,120,24,4,46,'l',.3);R(g,114,74,92,2,tint(W,.2));R(g,114,76,92,.8,tint(W,-.4));
  /* the door, the benches, a lamp, and the chest of the scrolls: open, and nearly empty */
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  bench(g,56,89,52,ST);bench(g,212,89,52,ST);niche(g,70,48,W);
  R(g,272,104,34,3,'rgba(40,30,60,.34)');wood(g,274,70,30,32,'#7a5632');R(g,274,70,30,.8,'#b08a5a');R(g,276,101,3,3,'#4a3420');R(g,299,101,3,3,'#4a3420');R(g,277,74,24,24,'#2a1c12');
  for(const[y,c]of[[80,'#d8c9a0'],[88,'#c8b488']]){R(g,280,y,18,4,c);R(g,280,y,18,.7,'#f0e2bc');R(g,279,y-.4,2,4.8,'#96703e');R(g,297,y-.4,2,4.8,'#96703e')}
  /* the table under the window, with three scrolls lying open on it */
  R(g,124,104,76,3,'rgba(40,30,60,.34)');wood(g,122,88,76,4,'#96703e');R(g,122,88,76,.7,'#c8a06a');R(g,122,91.6,76,.8,'#4a3420');wood(g,125,92,3,12,'#5a4226',1);wood(g,192,92,3,12,'#5a4226',1);
  for(const x of[128,150,172]){R(g,x+2,86.4,14,1.8,'#e6dcc0');R(g,x,85.8,2.6,2.8,'#b89058');R(g,x+15.4,85.8,2.6,2.8,'#b89058')}
  pave(g,0,103,320,144,'#d0c4a2',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.3,'#3a3050');
  lightmap(g,320,'#bcb2b6',l=>{pool(l,160,56,70,60,'#fff6dc',1);pool(l,160,118,200,46,'#fff0d0',.6)})},
 light:{amb:'#ece2dc'},draw(){},front(){}};

/* ---------- The quay at Athens' harbor ---------- */
/* A quay, a ship's side and open water. The city lies inland and is not seen: no temple, no statue and no image stands in this view.
   The ship has no figurehead. Only her after part is in the picture: her mast stands further forward, out of it, so that no upright
   crosses the level line where the sea meets the sky. */
ART.quay10={w:320,
 paint(g){const r=rng(1027),ST='#cfc4a8';
  sky(g,320,66,['#4a86c8','#86b2dc','#cfdfe6','#f0e8d4']);cloud(g,60,14,48,5,r);cloud(g,170,22,40,4,r);cloud(g,280,10,36,4,r);
  /* a bare headland across the water, and the open sea */
  ridge(g,0,150,66,x=>5+9*Math.exp(-Math.pow((x-40)/50,2))+1.4*Math.sin(x/8),['#a8a888','#9a9c7c']);
  g.fillStyle=lg(g,0,66,0,104,['#6fa6c4','#4f8cb0','#3f7a9e']);g.fillRect(0,66,320,38);
  for(let i=0;i<120;i++){const k=r(),y=67+k*36;R(g,r()*320,y,2+k*8,.5,r()<.6?'rgba(236,248,250,.5)':'rgba(20,56,84,.3)')}
  /* the ship alongside: her hull, a wale along it, and the stern rising in a curve */
  g.fillStyle=lg(g,0,70,0,104,['#6a4a2c','#4a3420','#2e2014']);g.beginPath();g.moveTo(178,104);g.lineTo(184,84);g.lineTo(320,80);g.lineTo(320,104);g.closePath();g.fill();
  stroke(g,[184,84,320,80],'#a8824e',1.2);stroke(g,[182,91,320,88],'#7a5a34',1);stroke(g,[180,97,320,95],'rgba(20,14,8,.5)',.8);
  stroke(g,[186,84,180,70,184,60,192,56],'#5a4026',3);stroke(g,[186.6,84,180.8,70,184.6,60.4],'#a8824e',.8);
  /* bales and a folded sail on her after deck, seen over the rail */
  for(const[x,w,h,c]of[[214,16,5,'#a89468'],[232,12,7,'#8e7a52'],[250,22,4,'#d8cdb0'],[280,14,6,'#9a8660']]){R(g,x,82.6-h-(x-214)*.03,w,h,c);R(g,x,82.6-h-(x-214)*.03,w,.6,tint(c,.3))}
  /* the quay: dressed stone, two mooring stones, a stack of jars, and a coil of rope */
  ashlar(g,0,99,320,7,tint(ST,-.2),r,{bw:16,bh:7,v:.08});pave(g,0,105,320,144,ST,r,{vx:160,vy:60,rows:5,step:38,v:.08,joint:'#9a927c'});ao(g,0,105,320,5,'t',.3,'#4a4460');
  for(const x of[150,236]){oval(g,x+2,112,7,2,'rgba(30,26,50,.34)');g.fillStyle=lg(g,x-4,0,x+4,0,['#9a9484','#e2dccb','#b8b2a2','#7e786c']);g.fillRect(x-4,102,8,9);oval(g,x,102,4,1.4,'#eee8d8')}
  for(const[x,y,c]of[[36,112,'#9a5a36'],[50,113,'#a8642e'],[43,108,'#8a4a2a'],[64,114,'#9a5a36']])vessel(g,x,y,4,13,c,'amph');
  g.strokeStyle='#8a7a52';g.lineWidth=1.6;for(let i=0;i<3;i++){g.beginPath();g.ellipse(112,116-i*1.4,8-i,2.6-i*.3,0,0,6.2832);g.stroke()}
  /* the gangplank, from the quay up to her side */
  poly(g,[196,106,212,106,206,86,196,86],'#8a683a');stroke(g,[196,106,196,86],'#5a4226',.8);stroke(g,[212,106,206,86],'#b08a5a',.8);for(let i=0;i<3;i++)stroke(g,[199,101-i*6,208.4-i*1.6,101-i*6],'rgba(50,34,16,.45)',.6);
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,105,320,39)});pool(g,120,0,240,150,'#fff4d6',.12,'screen')},
 draw(g,t){for(let i=0;i<10;i++){const k=((t/2400+i*.1)%1),x=(i*53)%170,y=70+k*30;R(g,x+k*8,y,3+k*5,.5,`rgba(244,252,252,${.5*Math.sin(k*3.1416)})`)}},
 front(){}};

/* ============ CAST ============ */
Object.assign(LOOK,{
  /* the three who left Philippi. Silas and Timothy have actors of their own in this chapter, as in the two before it. tim10 is Timothy
     when he is the one being played, after Paul has been sent to the sea: the same man, and a second actor, so that the first can stand
     in the scenes without being played. */
  silas10:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  timothy10:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  tim10:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  /* Thessalonica: Jason, whose house it is; the trader who orders the tent; a brother who comes from Philippi; and the brother in whose
     house the night finds them */
  jason10:{skin:'#c08c5c',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#e0d6ba',cloak:'#7a8a5a',long:1,belt:'#5a3a20',trim:'#4a5a34',brow:'#2a1a12',ph:400},
  parmenon10:{skin:'#b8845a',hair:'#5a4026',beard:'#5a4026',tunic:'#d8b060',cloak:'#8a3a2a',belt:'#c9a14a',trim:'#6a2418',brow:'#3a2a1a',ph:1300},
  brother10:{skin:'#a8703f',hair:'#2a1a12',tunic:'#9aa88a',belt:'#4a3a24',slim:1,brow:'#1a1210',ph:2100},
  host10:{skin:'#b47e52',hair:'#8a8a8a',beard:'#8a8a8a',receding:1,brow:'#5a5a5a',tunic:'#8a7a62',belt:'#2e2016',ph:900},
  /* the synagogue of Thessalonica: its attendant, two who ask, and a woman of standing */
  theodotos10:{skin:'#b88a62',hair:'#c8c8c8',beard:'#c8c8c8',receding:1,longBeard:1,brow:'#8a8a8a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',ph:2500},
  lysimachos10:{skin:'#a8703f',hair:'#8a8a8a',beard:'#8a8a8a',receding:1,fullBeard:1,brow:'#5a5a5a',tunic:'#6a5a70',cloak:'#c8b890',long:1,belt:'#2e2016',trim:'#4a3a50',ph:300},
  menandros10:{skin:'#c69870',hair:'#5a4026',tunic:'#e8e2d0',cloak:'#5f7f8c',long:1,belt:'#8a6a2a',trim:'#3a5a6a',brow:'#3a2a1a',ph:1500},
  stratonike10:{skin:'#c8a078',veil:'#7a2a5a',tunic:'#ece4d0',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#7a2a5a',brow:'#3a2414',ph:1900},
  /* others who stand before the benches: seen, and not named */
  hx101:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',tunic:'#8a6a4a',long:1,belt:'#2e2016',ph:0},hx102:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  hx103:{skin:'#b8845a',hair:'#a8a8a8',brow:'#7a7a7a',tunic:'#a8402c',long:1,belt:'#3a2414',trim:'#6a2418',ph:0},hx104:{skin:'#c69870',hair:'#3a2a1a',tunic:'#9aa88a',belt:'#4a3a24',slim:1,ph:0},
  /* the synagogue of Beroea: the old man who winds first, the young man who reads on, a woman of standing, and a man who was away */
  eupolemos10:{skin:'#b88a62',hair:'#d0d0d0',beard:'#d0d0d0',longBeard:1,bald:1,brow:'#9a9a9a',tunic:'#d8cdb0',long:1,belt:'#5a3a20',trim:'#7a6a4a',ph:600},
  dorotheos10:{skin:'#c89868',hair:'#2a1a12',tunic:'#b8c0a0',belt:'#4a3a24',slim:1,brow:'#1a1210',ph:2300},
  kleonike10:{skin:'#c89a70',veil:'#3f6f6a',tunic:'#e2dccb',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#3f6f6a',brow:'#3a2414',ph:1100},
  late10:{skin:'#a8703f',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#8a7a52',belt:'#2e2016',brow:'#2a1a12',ph:1700},
  /* the brothers of Beroea who bring Paul to the sea, and on to Athens */
  esc101:{skin:'#b47e52',hair:'#5a4026',beard:'#5a4026',tunic:'#7a8a6a',cloak:'#a8946a',belt:'#2e2016',brow:'#3a2a1a',ph:500},
  esc102:{skin:'#c69870',hair:'#2a1a12',tunic:'#c8b890',belt:'#4a3a24',slim:1,brow:'#1a1210',ph:2700}});
const SI=actor('silas10','Silas','#9fd8c8',118),TI=actor('timothy10','Timothy','#b8e0b0',150),TP=actor('tim10','Timothy','#b8e0b0',150),
  JA=actor('jason10','Jason','#d8e0a0',112),PA=actor('parmenon10','Parmenon','#f0c890',104),BR=actor('brother10','brother from Philippi','#c8d8b0',132),HO=actor('host10','brother of the house','#d0c8b0',96),
  TD=actor('theodotos10','Theodotos','#e0e0f0',88),LM=actor('lysimachos10','Lysimachos','#d8c8e0',96),ME=actor('menandros10','Menandros','#b8d8e8',124),ST=actor('stratonike10','Stratonike','#e8b0d8',188),
  EU=actor('eupolemos10','Eupolemos','#f0e8c8',90),DO=actor('dorotheos10','Dorotheos','#c8e8b8',146),KL=actor('kleonike10','Kleonike','#a8e0d8',192),LT=actor('late10','man back from his flocks','#e0c8a0',108),
  E1=actor('esc101','brother from Beroea','#c8d8b0',110),E2=actor('esc102','younger brother','#d8e0b8',140);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 17:1-15, verse by verse, told by the narrator in paraphrase, each with its reference; and what Paul later wrote of these
   weeks. None of it is put into a mouth, and none of it stands in quotation marks: a paraphrase is never presented as a quotation
   (CONTRIBUTING section 1). It says "they" throughout, as the account does. */
const TOLD={
 v1:'They took the road through Amphipolis and Apollonia and so reached Thessalonica, a city in which the Jews had a synagogue. (Acts 17:1)',
 v2:'Paul went in to them, as he always did, and on three Sabbaths he reasoned with them out of the Scriptures. (Acts 17:2)',
 v3:'He explained, and showed from what is written, that the Christ had to suffer and had to rise from the dead; and he told them that this Jesus, whom he was announcing to them, is the Christ. (Acts 17:3)',
 v4:'Some of them came to believe, and joined Paul and Silas. So did a great many of the Greeks who worshipped God, and not a few of the leading women. (Acts 17:4)',
 v5:'Jealous, the Jews attacked the house of Jason, meaning to hand Paul and Silas over to the crowd. For this they had rounded up some wicked loafers from the marketplace, made a mob of them, and set the city in turmoil. (Acts 17:5)',
 v6:'It was Jason, with some of the brothers, who ended up before the city rulers: the mob had dragged them there when Paul and Silas could not be found, crying that these men had turned the inhabited earth upside down and were now here too, (Acts 17:6)',
 v7:'and that Jason had taken them into his house; that all of them were acting against the decrees of Caesar, for they said that another was king: Jesus. (Acts 17:7)',
 v8:'The crowd and the city rulers heard this, and it alarmed them. (Acts 17:8)',
 v9:'Only when Jason and the others had given security enough did the rulers let them go. (Acts 17:9)',
 v10a:'That same night the brothers sent Paul and Silas away, to Beroea. (Acts 17:10)',
 v10b:'When they arrived there, they went into the synagogue of the Jews. (Acts 17:10)',
 v11:'In Beroea the Jews showed themselves more noble-minded than those of Thessalonica: every day they went carefully through the Scriptures to check what they had heard, and they had taken in the word as eagerly as anyone could. (Acts 17:11)',
 v12:'Many of them now believed, and with them came some men and a good number of reputable Greek women. (Acts 17:12)',
 v13:'But the Jews of Thessalonica learned that Paul was announcing the word of God in Beroea too, and they came there to rouse the crowds and unsettle them. (Acts 17:13)',
 v14:'At once the brothers sent Paul off, to the sea. Silas and Timothy both stayed behind. (Acts 17:14)',
 v15a:'His companions did not leave Paul until they had brought him to Athens. (Acts 17:15)',
 v15b:'They left again with instructions for Silas and Timothy: the two were to come to him as quickly as they could. (Acts 17:15)',
 /* from his letters */
 t22:'Paul wrote to them afterwards that it was with their God\'s help that he and Silas had found the boldness to bring them God\'s good news, against strong opposition, though they had come from suffering and insolent treatment in Philippi, as the Thessalonians knew. (1 Thessalonians 2:2)',
 t29:'He reminded them of the labor and the toil: so as not to be a costly burden to any of them, he and his companions had worked night and day while they preached God\'s good news to them. (1 Thessalonians 2:9)',
 p416:'While he was in Thessalonica, the brothers in Philippi sent him something for what he needed: not once only, but twice. (Philippians 4:16)',
 t217:'Some months later he wrote to them that he had been torn from them for a short while: out of their sight, and not out of his heart. (1 Thessalonians 2:17)'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});
/* over the map the road runs along the upper edge of the window, so what is told there stands at the foot of the view */
const tellMap=k=>tell(k,0,1);

/* ============ THE SCROLL TABLE: what lies on it ============ */
/* PS: the places in the scrolls, as Paul has noted them on his tablets: each a note in his own words with its reference (gist: see
   shared/tablets.js), never the wording of a translation. cap: what the open column is called under the scroll. at: how far through its
   scroll the place lies (0 to 1), which is how thick each roll is drawn. Acts does not say which passages Paul used. These are the
   ones that the Study Edition's marginal references give at Acts 17:3, and with them the ones that John 19:36, 37 and the references
   at those places lay beside them. */
const mk10=(o,i)=>Object.assign(o,{seed:i*37});
const PLACE={
 ps16:{k:'ps',ref:'Psalm 16:10',gist:'David\'s hope: Jehovah would never let his loyal one see the pit, nor abandon him to the Grave.',cap:'not abandoned to the Grave',at:.1},
 ps22m:{k:'ps',ref:'Psalm 22:7, 8',gist:'Everyone who sees me jeers and sneers, and they shake their heads in scorn: He relied on Jehovah; then let Him rescue him, since He holds him so dear.',cap:'mocked for his trust',at:.15},
 ps22l:{k:'ps',ref:'Psalm 22:18',gist:'They share out my garments among them, and for my clothing they cast lots.',cap:'lots for his clothing',at:.16},
 ps34:{k:'ps',ref:'Psalm 34:20',gist:'Every bone of the righteous one is in Jehovah\'s keeping; none of them has been broken.',cap:'not one bone broken',at:.23},
 ps69:{k:'ps',ref:'Psalm 69:21',gist:'When I was thirsty, they handed me vinegar.',cap:'vinegar for his thirst',at:.46},
 ps118:{k:'ps',ref:'Psalm 118:22',gist:'It is the chief cornerstone now, this stone the builders threw aside.',cap:'the stone thrown aside',at:.78},
 is45:{k:'pr',ref:'Isaiah 45:1',gist:'Jehovah speaks to his anointed one, the man whose right hand he has grasped: Cyrus.',cap:'his anointed one',at:.68},
 is50:{k:'pr',ref:'Isaiah 50:6',gist:'He let those who beat him have his back; and when they insulted him and spat on him, he did not hide his face.',cap:'struck and spat on',at:.76},
 is533:{k:'pr',ref:'Isaiah 53:3',gist:'He was despised, and men kept away from him. We counted him as nothing.',cap:'despised, counted as nothing',at:.8},
 is535:{k:'pr',ref:'Isaiah 53:5',gist:'Our transgression is why he was pierced, and our errors why he was crushed; his wounds have healed us.',cap:'pierced because of our transgression',at:.81},
 is537:{k:'pr',ref:'Isaiah 53:7',gist:'He never opened his mouth: silent as a ewe under the shearers, he was led off like a sheep to be slaughtered.',cap:'silent as a sheep',at:.82},
 is539:{k:'pr',ref:'Isaiah 53:9',gist:'Though he had done nothing wrong, his grave was set among the wicked, and in death he lay with the rich.',cap:'a grave with the rich',at:.83},
 ex12:{k:'law',ref:'Exodus 12:46',gist:'Of the Passover lamb: you must not break a bone of it.',cap:'no bone of the lamb broken',at:.27}};
Object.keys(PLACE).forEach((k,i)=>mk10(PLACE[k],i+1));
/* EV: what was handed on to Paul (1 Corinthians 15:3), as his tablets hold it: what was done to Jesus, and who saw him afterwards. Each
   is a note in his own words. The references are for the player: nothing on the table has a number. */
const EV={
 wine:{row:'V',ref:'John 19:28, 29',gist:'He said that he was thirsty, and they held a sponge full of sour wine up to his mouth.',cap:'sour wine at his mouth'},
 mock:{row:'M',ref:'Matthew 27:41-43',gist:'As he hung there the chief priests mocked him, and the scribes and elders with them. One of their taunts: he had trusted in God and called himself God\'s Son, so let God rescue him now, if He wanted him.',cap:'mocked by the chief priests'},
 struck:{row:'S',ref:'Matthew 26:67',gist:'He was spat on in the face, beaten with fists, and slapped.',cap:'spat on and struck'},
 stone:{row:'R',ref:'Acts 4:10, 11',gist:'The rulers of the people, the builders, treated him as worth nothing; and God raised him up.',cap:'refused by the rulers'},
 pierce:{row:'P',ref:'John 19:33, 34',gist:'The soldiers found him already dead and did not break his legs; and one of them put a spear into his side.',cap:'legs unbroken, side pierced'},
 raised:{row:'G',ref:'1 Corinthians 15:4-8',gist:'He was buried, and raised up on the third day. Cephas saw him, then the Twelve, then more than five hundred brothers at one time, then James, then all the apostles; and last of all, I did.',cap:'raised, and seen by many'},
 lots:{row:'L',ref:'John 19:23, 24',gist:'The soldiers shared out his outer garments among the four of them, and for the one without a seam they cast lots.',cap:'lots cast by the soldiers'},
 silent:{row:'Q',ref:'Matthew 27:12-14',gist:'Charge after charge came from the chief priests and the elders, and he answered none of them. Even when Pilate asked him, he said nothing at all, and the governor was greatly surprised.',cap:'no answer to his accusers'},
 tomb:{row:'T',ref:'Matthew 27:57-60',gist:'A rich man, Joseph of Arimathea, asked for his body and laid it in his own new tomb.',cap:"a rich man's new tomb"}};
Object.keys(EV).forEach((k,i)=>mk10(EV[k],i+20));
const SHUT={cap:'rolled shut'},CLOSED={cap:'tablets closed'};
/* ROWS: which places belong beside which line of the tablets. A row holds when every scroll that has a place in it lies open at that
   place, every other scroll is rolled shut, and the tablets show its line. Each row is one that the Study Edition's marginal references
   make: at Psalm 69:21; at Isaiah 53:3 and Psalm 22:8; at Isaiah 50:6; at Psalm 118:22 and Isaiah 53:3; at John 19:36, 37; at
   1 Corinthians 15:4; at Psalm 22:18; at Isaiah 53:7; at Isaiah 53:9. */
const ROWS={V:{ps:'ps69'},M:{ps:'ps22m',pr:'is533'},S:{pr:'is50'},R:{ps:'ps118',pr:'is533'},P:{ps:'ps34',pr:'is535',law:'ex12'},G:{ps:'ps16'},L:{ps:'ps22l'},Q:{pr:'is537'},T:{pr:'is539'}};
/* what each scroll holds, in its own order, in each city; and the lines of the tablets */
const LISTS={t:{ps:['ps16','ps22m','ps34','ps69','ps118'],pr:['is50','is533','is535']},
  b:{law:['ex12'],pr:['is45','is50','is533','is535','is537','is539'],ps:['ps16','ps22m','ps22l','ps34','ps69','ps118']}},
  KINDS={t:['ps','pr'],b:['law','pr','ps']},LINES={t:['wine','mock','struck','stone','pierce','raised'],b:['wine','mock','struck','stone','pierce','raised','lots','silent','tomb']},
  SCROLL={ps:'scroll of the Psalms',pr:'scroll of the Prophets',law:'scroll of Moses'};

/* ============ HELPERS ============ */
const inYard=()=>G.room==='yard10',inSyn=()=>G.room==='syn10',inBer=()=>G.room==='ber10',atTable=()=>G.room==='table10',city=()=>F.gone?'b':'t',
  /* which Sabbath it is in Thessalonica, and which day in Beroea */
  sab=()=>!F.r2?1:!F.r3?2:3,finds=()=>['b2a','b2b','b2c'].filter(k=>F[k]).length,bday=()=>!F.b1?1:finds()<3?2:3,
  tim=()=>PC()===TP;
/* think: whoever is played weighs what to do next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){const me=PC();let av=opts.slice();
  for(;;){await say(me,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(me,o.no,TH);av=av.filter(x=>x!==o)}}
/* come: a room is shown, with everyone in his place */
async function come(room,ms){place10(room);const a=PC();enterRoom(room,a.x,a.y,a.dir);codeBtn();await fade(0,ms||600)}
/* step: into a close view, or out of it, without the sound of a door */
async function step(room){await fade(1,220);place10(room);const a=PC();enterRoom(room,a.x,a.y,a.dir);codeBtn();await fade(0,260)}
/* quote: a place or a line as it is read out: the note, with its reference */
const quote=p=>T('{text} ({ref})',{text:T(p.gist),ref:T(p.ref)});

/* ============ MEASURED TWICE: the bolt, laid out before it is cut ============ */
/* Paul worked night and day in Thessalonica so as to burden nobody (1 Thessalonians 2:9); the study notes say it was perhaps at
   tentmaking. The order, the trader, the bolt and its thin strip are invented. The rules are three: nothing hangs over the edge; a
   panel may end on the thin strip, where a seam will fold the cloth double, and must not run across it; and what is left over has to be
   one length, six cubits, for the loops. There is one way to do it, and its mirror image (WAY). */
const WAY={end:{x:0,y:0,w:2,h:3},long:{x:2,y:0,w:6,h:2},g1:{x:2,y:2,w:2,h:1},g2:{x:4,y:2,w:2,h:1},flap:{x:6,y:2,w:2,h:2},roof:{x:8,y:0,w:4,h:4}};
function boltSt(){if(!G.bolt10){G.bolt10={at:{},turn:{},sel:null,mx:null,my:null};if(F.laid){for(const k in WAY)G.bolt10.at[k]=Object.assign({},WAY[k]);G.bolt10.turn.end=true}}return G.bolt10}
const dims=p=>boltSt().turn[p.id]?[p.h,p.w]:[p.w,p.h];
function cover(){const st=boltSt(),g=new Array(COLS*ROWS_B).fill(null);for(const p of PIECES){const q=st.at[p.id];if(q)for(let j=0;j<q.h;j++)for(let i=0;i<q.w;i++)g[(q.y+j)*COLS+q.x+i]=p.id}return g}
/* cannot: why a panel may not lie with its corner at x,y (null if it may) */
function cannot(p,x,y,w,h){if(!(x>=0&&y>=0&&x+w<=COLS&&y+h<=ROWS_B))return'edge';const g=cover();
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const o=g[(y+j)*COLS+x+i];if(o&&o!==p.id)return'over'}
  return THIN>x&&THIN<x+w-1?'thin':null}
/* spare: what is left over is one length */
function spare(){const c=[];cover().forEach((v,i)=>{if(!v)c.push(i)});const ys=new Set(c.map(i=>Math.floor(i/COLS))),xs=c.map(i=>i%COLS).sort((a,b)=>a-b);return c.length>0&&ys.size===1&&xs[xs.length-1]-xs[0]===xs.length-1}
const LAID='It is laid out: every panel has its place, and six cubits are left in one length. Now it needs the knife.';
/* a panel on the board: taken in hand; taken again, it is turned; one that lies on the cloth is lifted off it */
async function board(p){const st=boltSt();if(F.laid)return say(P,LAID,TH);
  if(st.at[p.id]){delete st.at[p.id];st.sel=p.id;SFX.click();return}
  if(st.sel===p.id&&p.w!==p.h){st.turn[p.id]=!st.turn[p.id];SFX.click();return}
  st.sel=p.id;SFX.click()}
/* the cloth: the panel in hand is laid with its corner under the pointer; with empty hands, a panel is lifted off */
async function onBolt(){const st=boltSt();if(F.laid)return say(P,LAID,TH);
  const cx0=st.mx==null?-1:Math.floor((st.mx-BX)/CELL),cy0=st.my==null?-1:Math.floor((st.my-BY)/CELL),ok=cx0>=0&&cy0>=0&&cx0<COLS&&cy0<ROWS_B,under=ok?cover()[cy0*COLS+cx0]:null;
  if(!st.sel){if(under){delete st.at[under];st.sel=under;SFX.click();return}
    return say(P,'First a panel from the board. Then its place on the cloth.',TH)}
  const p=PIECES.find(q=>q.id===st.sel),[w,h]=dims(p),why=ok?cannot(p,cx0,cy0,w,h):'edge';
  if(why){SFX.nope();return say(P,why==='edge'?'That would hang over the edge of the bolt.':why==='over'?'Not there. Two panels would need the same cloth.'
    :'Not across the thin strip. A panel may end on it, where the seam folds the cloth double. It must not run over it.',TH)}
  st.at[p.id]={x:cx0,y:cy0,w,h};st.sel=null;noise({d:.12,v:.08,f:2600,q:1.2});
  if(!PIECES.every(q=>st.at[q.id]))return;
  if(!spare())return say(P,'Every panel has a place. But what is left over lies in pieces, and the loops need one length of six cubits.',TH);
  F.laid=1;SFX.good();await say(P,'Measured twice. Roof, walls, flap and gussets, and six cubits in one length for the loops. Now the knife may come.');codeBtn()}
async function cutBolt(){if(F.cutd)return;if(!F.laid)return say(P,'Not before every panel has its place. Cloth that is cut wrong stays cut.',TH);
  SFX.cut();await narr('The knife followed the cord, panel after panel.',{dur:3800});F.cutd=1;addItem('panels10');SFX.good();
  if(G.room!=='yard10')await step('yard10');return afterCut()}
const boltWith=id=>id==='knife'?cutBolt():id==='awl'||id==='thread'?say(P,'Nothing is sewn before it is cut, and nothing is cut before it is laid out.',TH):false;
async function toBolt(){if(F.cutd)return;await step('bolt10');if(!F.laid&&!G.seenBolt){G.seenBolt=1;
  await say(P,'Twelve cubits by four, and the third cubit from this end is woven thin. A panel may end on that strip. It must not run across it.',TH);
  await say(P,'And what is left over I want in one length: six cubits, for the loops.',TH);codeBtn()}}
/* the pointer over the cloth: where a panel in hand would lie (the engine does not hand a click's place to a hotspot) */
if(!window.BOLT10){window.BOLT10=1;const vp10=$('#view'),at=e=>{if(G.room==='bolt10'&&G.bolt10){const[x,y]=evPos(e);G.bolt10.mx=x;G.bolt10.my=y}};
  for(const t of['mousemove','pointerdown','click'])vp10.addEventListener(t,at,true)}

/* ============ JASON'S COURTYARD: night and day ============ */
const ROAD1=[['philippi','amphipolis','new'],['amphipolis','apollonia','new'],['apollonia','thessalonica','new']],
  LAB1={philippi:{lab:'r'},amphipolis:{lab:'l',dy:-4.4},apollonia:{lab:'l',dy:-3.4},thessalonica:{lab:'l',dx:-4,dy:5.5}},
  ROAD2=[['thessalonica','beroea','new']],LAB2={thessalonica:{lab:'t',dx:-7}},
  ROAD3=[['thessalonica','beroea'],['beroea','seaward','new'],['seaward','athens','new sea']],LAB3={thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:6,dy:7.2}};
async function afterCut(){await say(P,'Six panels, and not a hand of cloth wasted. Now the seams: and those are evening work.');
  await say(SI,'Tomorrow is the Sabbath, Paul. Jason says that the synagogue is three streets from his gate.');codeBtn()}
async function toSabbath(){
  if(!F.cutd)return say(P,'Not yet. Parmenon is waiting for a tent, and the cloth is not even cut.');
  if(F.r2&&!F.sewn)return say(P,'Not with the panels lying loose on the bench. The seams first: the Sabbath will come without my help.');
  if(F.r3&&!F.sold)return say(P,'Parmenon comes for his tent this morning. He shall find it here, and me with it.');
  await say(P,sab()===1?'It is the Sabbath. To the synagogue, then, as in every city.':'The Sabbath again. They said that they would have more to ask.');
  await fade(1,500);await come('syn10');return sabIntro()}
/* the seams: sewn in the nights between the first Sabbath and the second */
async function sew(){if(!has('panels10'))return say(P,F.sewn?'It is sewn. Every seam is doubled, and waxed.':'There is nothing on the bench to sew yet.');
  if(!F.r2)return say(P,'Stitch by stitch, every evening. It will not be done before the Sabbath, and it need not be.');
  SFX.sew();await fade(1,600);await narr('He sewed that night, and the three nights after it. By day people stood in the gateway and asked him what they had heard in the synagogue, and he answered them over the seam.',{dur:9500});
  delItem('panels10');addItem('tent10',1);F.sewn=1;await come('yard10',700);SFX.good();
  await say(P,'Done. The thin strip lies inside three seams, where no wind will find it.');
  await say(JA,'People have begun to ask at my gate for the tentmaker, Paul. They do not all want tents.');codeBtn()}
/* the tent is handed over, and paid for; and Philippi sends for the second time */
async function sell(){if(F.sold)return;await say(P,'Your tent, Parmenon. It is tighter than the one you lost.');delItem('tent10');SFX.pick();
  await say(PA,'So it is. Here is the price. And beyond the price? You talked to me for three evenings while you sewed.');
  await say(P,'For the tent, the price. The rest has no price, and it was not mine to sell.');
  await say(PA,'Then I shall be at that synagogue on the Sabbath, to hear what I am getting for nothing.');
  F.sold=1;SFX.good();await walk(PA,24,118);PA.room=null;
  place(BR,'yard10',28,118,1);await walk(BR,130,129);await tell('p416');
  await say(BR,'From Philippi again, Paul. Lydia said that you would shake your head, and that I was not to mind it.');
  await say(P,'Twice. Tell them that I know what it cost them. And tell them that it arrived.');
  await walk(BR,24,118);BR.room=null;codeBtn()}

/* ============ THE SYNAGOGUE OF THESSALONICA: three Sabbaths ============ */
/* On three Sabbaths he reasoned with them from the Scriptures (Acts 17:2, 3). The verse has three parts, and each Sabbath takes one:
   that the Christ had to suffer; that he had to rise; that this Jesus is the Christ. A hearer says what he cannot see, and the player
   sets the table until scroll, scroll and tablets say one thing. Whoever believes and whoever grows jealous is told as the account
   tells it (17:4, 5): no setting of the scrolls wins anyone or loses anyone. The hearers and what they ask are invented. */
const WANT=()=>sab()===1?(F.r1?'M':'V'):sab()===2?'G':'P',ASKER=()=>({V:LM,M:ME,G:LM,P:ME})[WANT()],DONE={V:'r1',M:'r2',G:'r3',P:'r4'},
  ASK={V:'You say that when he hung there and was thirsty, they held sour wine to his mouth. A small thing. Is even that written?',
    M:'They mocked him, you told us, because he trusted in God. If God had sent him, would God have let them?',
    G:'Let him suffer, then: it is written, and I have seen it. But you say that he died. A dead Christ is no Christ.',
    P:'Many men have been mocked, and many have died. What makes you say: this one, this Jesus, and no other?'},
  NUDGE={V:'He asked about the sour wine.',M:'He asked about the mockery.',G:'He asked whether a dead man can be the Christ.',P:'He asked what marks this one man. What was done with him when he was dead?'};
async function sabIntro(){const n=sab();if(G.sab10===n)return;G.sab10=n;
  if(n===1){await tell('v2');
    await say(TD,'You have sat among us and listened, stranger, and you are a son of Israel. If you have a word for the people, say it.');
    await say(P,'Men of Israel, and you who fear God: the Christ has come. And he came as it was written of him: to suffer first.');
    await say(LM,'To suffer? The Christ comes to rule.');await say(LM,ASK.V);
    await say(P,'It is. And he need not take my word for it: the scrolls are on the table.',TH)}
  else if(n===2){await tell('v3');await say(LM,'I have turned it over all week, tentmaker.');await say(LM,ASK.G);
    await say(P,'He died, and he was buried. And he did not stay there. That is written too; and it was seen.')}
  else{await narr('On the third Sabbath nobody found a place on the benches.',{dur:5200});await say(ME,'One thing more.');await say(ME,ASK.P);
    await say(P,'What was done with him on the day he died. No man arranges that for himself. Come to the table.')}
  codeBtn()}
const again=()=>say(ASKER(),ASK[WANT()]);
/* the Sabbath is over: back to the courtyard */
async function sabEnd(n){await fade(1,600);G.sab10=0;await come('yard10',700);
  if(n===1){await narr('By day he sewed and talked. By night he sewed.',{dur:5200});await tell('t29');
    place(BR,'yard10',28,118,1);await walk(BR,130,129);
    await say(BR,"Paul! From Lydia's house, and from a house beside the prison that you know. They put this together when they heard which road you had taken.");
    await say(P,'From Philippi. They have little enough themselves.');
    await say(BR,'They said that you would say so. I am to tell you that they were not asking.');
    await walk(BR,24,118);BR.room=null;
    await say(JA,'Then tonight, at least, you will sleep.');
    await say(P,'Tonight I sew, Jason. Parmenon wants his tent, and tomorrow there will be people at your gate with questions.')}
  else{await narr('In the week that followed, the tent was finished and the questions were not.',{dur:5600});
    await say(PA,'Is it done, tentmaker? The market at Apollonia is in three days.')}
  codeBtn()}
/* after the third Sabbath: who believed, and who grew jealous; then the uproar, told and not shown */
async function third(){await fade(1,500);await come('syn10');await tell('v4');
  await say(ME,'I have no more questions. I have a request: tell me the rest of it.');
  await say(ST,'My household will want to hear this. All of it.');
  await say(LM,'Look at the benches, tentmaker. The Greeks who came to us to learn of God are standing on your side of the room.');
  await narr('Then some counted who had gone over.',{dur:4600});
  await fade(1,700);G.up10=1;G.scene=yardScene;AU.mood='tense';AU.amb={crowd:.9};await fade(0,700);uproar();
  for(const k of['v5','v6','v7','v8','v9'])await tell(k);
  await fade(1,700);G.up10=0;F.night=1;G.scene=null;AU.amb={};await come('night10',800);return nightIntro()}

/* ============ THE SCROLL TABLE ============ */
/* tabSt: what lies on the table. It is set afresh when the question changes: both scrolls rolled shut in Thessalonica; in Beroea as the
   one who found a place has left it. The positions are not kept in a code: only the rows that have been laid are flags. */
const FINDS=[{f:'b2a',row:'L',set:[null,null,'ps22l']},{f:'b2b',row:'Q',set:[null,'is537',null]},{f:'b2c',row:'T',set:[null,'is539',null]}],
  find=()=>FINDS.find(x=>!F[x.f]);
function tabSt(){const c=city(),key=c==='t'?'t'+WANT():bday()===1?'b1':bday()===2?find().f:'b3';
  if(!G.tab10||G.tab10.key!==key)G.tab10={key,c,n:KINDS[c].length,kinds:KINDS[c],has:!tim(),t:null,
    s:c==='t'?[null,null]:bday()===1?['ex12',null,'ps34']:bday()===2?find().set.slice():[null,'is45',null]};
  G.tab10.has=!tim();return G.tab10}
/* wind: a roller is turned, and the scroll moves to its next place, or back to the one before; before the first place it is rolled shut */
async function wind(i,d){const st=tabSt(),k=st.kinds[i],list=LISTS[st.c][k],at=st.s[i]?list.indexOf(st.s[i])+1:0,to=at+d;
  if(to<0||to>list.length){SFX.nope();if(to>list.length&&st.c==='t'&&!tim())return endOfScroll();return}
  st.s[i]=to?list[to-1]:null;noise({d:.14,v:.05,f:2200,q:.9});pluck10(to+i*2,.8)}
/* endOfScroll: the chapter's hidden treasure. A scroll of Thessalonica wound on past the last place that is asked for, and the
   attendant, who keeps the scrolls, says who will wind it back. Nothing in the story changes. */
async function endOfScroll(){await say(TD,'Wind on like that, tentmaker, and you will reach the end of it by sunset. Whoever winds a scroll on winds it back again, before it goes into the chest.');
  await say(P,'Then I know whose hands will do it.');treasure()}
/* leaf: the tablets are turned to their next line; after the last they are shut */
async function leaf(){const st=tabSt(),L=LINES[st.c],at=st.t?L.indexOf(st.t)+1:0,to=(at+1)%(L.length+1);st.t=to?L[to-1]:null;SFX.click()}
const readPlace=i=>{const k=tabSt().s[i];return k?say(PC(),quote(PLACE[k])):say(PC(),'It is rolled shut.',TH)},
  readLeaf=()=>{const k=tabSt().t;return k?say(P,quote(EV[k])):say(P,'My tablets are shut.',TH)};
/* judge: does the table hold? A full row; or the first scroll that says another thing than the tablets; or a scroll that is missing */
function judge(){const st=tabSt(),open=st.s.filter(Boolean);if(!st.t)return{closed:1,open:open.length};
  const ev=EV[st.t],row=ROWS[ev.row];
  for(let i=0;i<st.n;i++){const k=st.kinds[i],p=st.s[i];if(p&&p!==row[k])return{bad:k,a:PLACE[p].cap,b:ev.cap}}
  if(!open.length)return{none:1};
  for(let i=0;i<st.n;i++){const k=st.kinds[i];if(row[k]&&!st.s[i])return{part:k}}
  return{row:ev.row}}
async function lay(){if(tim())return say(TP,'Their hands know the way to these places now.',TH);
  const st=tabSt(),j=judge();if(st.c==='b')return layB(st,j);
  const A=ASKER(),want=WANT();
  if(j.closed)return say(P,'My tablets are shut. What is written has to lie beside what was done, or I have shown them nothing.',TH);
  if(j.none)return say(P,'Both scrolls are rolled shut. I have laid nothing beside what I say.',TH);
  if(j.bad)return say(A,T(j.bad==='ps'?'The psalm lies open at one place, tentmaker: {a}. Your tablets lie at another: {b}. I do not see how the one proves the other.'
    :'The prophet lies open at one place: {a}. Your tablets lie at another: {b}. What has the one to do with the other?',{a:T(j.a),b:T(j.b)}));
  if(j.part)return say(A,j.part==='pr'?'One witness, and that one David. Does any prophet say the same?':'One witness, and that one the prophet. Does David say the same?');
  if(j.row!==want){await say(A,F[DONE[j.row]]?'You showed us that, and it holds. It is not what I asked today.':'That holds, tentmaker, and I grant it. It is not what I asked.');return say(P,NUDGE[want],TH)}
  chord10();return HOLDS[want]()}
/* what follows when the row that was asked for lies on the table */
const HOLDS={
  V:async()=>{await say(P,quote(PLACE.ps69));await say(P,quote(EV.wine));
    await say(P,'David wrote it long before any soldier held up that sponge.');
    await say(LM,'So it is written. One small thing.');F.r1=1;SFX.good();tabSt();
    await say(ME,'Then a greater one.');await say(ME,ASK.M);codeBtn()},
  M:async()=>{await say(P,quote(PLACE.ps22m));await say(P,quote(PLACE.is533));await say(P,quote(EV.mock));
    await say(P,'The psalm has the very words of the mockers. And the men who spoke them knew the Psalms by heart.');
    await say(ME,'David and Isaiah, saying one thing. And you say that it was done in our own days.');
    await say(TD,'The day is nearly over. Come back next Sabbath, stranger: these men will have more to ask.');F.r2=1;SFX.good();return sabEnd(1)},
  G:async()=>{await say(P,quote(PLACE.ps16));await say(P,quote(EV.raised));
    await say(LM,'You? You saw him?');
    await say(P,'On the road to Damascus. I was on my way there to put his disciples in chains.');
    await say(ST,'Then you are not telling us what somebody told you. You are telling us what you saw.');F.r3=1;SFX.good();return sabEnd(2)},
  P:async()=>{await say(P,quote(PLACE.ps34));await say(P,quote(PLACE.is535));await say(P,quote(EV.pierce));
    await say(P,'Not a bone broken, and yet pierced. Two scrolls, and one afternoon.');
    await say(ME,'No man chooses what soldiers do with him when he is dead.');
    await say(P,'No. And so I say it plainly: the Christ of whom all this is written is Jesus.');F.r4=1;SFX.good();return third()}};
async function toTable(){if(tim())return say(TP,'The table is theirs. They do not need my hands on it.',TH);
  if(inSyn()&&!G.sab10&&!F.r4)G.sab10=sab();await step('table10')}
const fromTable=()=>step(F.gone?'ber10':'syn10');

/* ============ A HOUSE BY NIGHT: the security is Jason's ============ */
/* The rulers took security from Jason and the others (Acts 17:9), and that same night the brothers sent Paul and Silas away (17:10).
   In Philippi Paul stayed in a prison until the magistrates came themselves (Chapter Nine). Every choice that was right there is
   offered here, and he sets each aside, because here another man would pay for it. Bearing Thorough Witness (chapter 17, paragraph 13)
   draws the line between boldness and recklessness at this point. Acts does not say what the security was, or what it bound Jason to:
   the game says "security" and no more. Where the two were when the house was stormed, it does not say either. */
async function nightIntro(){AU.mood='night';
  await narr('Night found Paul and Silas in another house, behind a shut door.',{dur:5600});
  place(JA,'night10',44,118,1);SFX.door();await walk(JA,P.x-30,P.y+2);
  await say(JA,'They came to my house for you: men from the marketplace, and some from the synagogue behind them. They did not find you. So they took me, and two of the brothers with me.');
  await say(SI,'Before whom?',{to:JA});
  await say(JA,'The city rulers. We have given them security. Then they let us go.');
  await say(P,'Jason has pledged what is his, and it was for us. What do I do with this night?',TH);codeBtn()}
async function jasonTalk(){if(F.gone)return;
  await think('Jason has given security for us. What do I do?',[
    {q:'Stand before the city rulers in the morning, and answer the charge.',no:'In Philippi my own back paid, so I could wait for the magistrates. Here Jason pays, with his security. If I stand in the marketplace tomorrow, it is he who loses it.'},
    {q:'Stay in this house, and teach behind a shut door.',no:"Whoever came to this door would be seen coming. I should be teaching at their cost, and at Jason's."},
    {q:'Go back to my bench. I have done no wrong.',no:'True, and of no use to Jason. They did not ask what I had done. They asked whose roof I was under.'},
    {q:'Go tonight, as the brothers ask.',ok:1}]);
  await say(P,'We go tonight, Jason.');
  await say(JA,'I did not want to be the one to say it.');
  await say(P,'You said it to the city rulers, with what is yours. That is enough.');
  await say(JA,'You told us that it would come to this. I thought you meant: for you.');
  await say(P,'For all of us. And you stood.');
  await say(TI,'I have the pouch and the tablets, Paul. The tent is paid for. Nothing of ours is left in that yard.');
  await say(HO,'Two of us will take you past the last houses. After that the road is yours, and the night.');
  F.gone=1;SFX.good();
  try{await need('map');await SHARED.map.journey(ROAD2,{view:'west',labels:LAB2,night:1,speed:2600});await tellMap('v10a');await tellMap('t217')}catch(e){console.error(e)}
  await fade(1,600);G.scene=null;await come('ber10',800);return berIntro()}

/* ============ THE SYNAGOGUE OF BEROEA: sifted, day after day ============ */
/* They searched the Scriptures every day, to see whether these things were so (Acts 17:11). The study note says the word means to
   sift and to separate, as in a hearing before a judge. So here the hearers bring the places, and Paul answers. On the first day the
   Law lies on the table beside the Psalms and the Prophets (Luke 24:44), and the row is the one that John lays out (John 19:36, 37). On
   the second they bring what they have found themselves. On the third a young man brings a line that names another man, and for the
   first time "I have nothing to lay beside that" is the right answer: the verse itself gives the name (Isaiah 45:1). Acts does not say
   what the Beroeans examined, or for how many days: all of it is invented. */
const POSE={b2a:[KL,'My brother read to me last night, from the psalm that you opened: for his clothing they cast lots. Did that happen too? Or is it only a way of speaking?'],
  b2b:[DO,'Here, Paul, a little further on from the pierced one: he does not open his mouth. Before whom was he silent?'],
  b2c:[EU,"One line further still: a grave with the rich. You told us that he died as a criminal dies. Who gives such a man a rich man's grave?"]},
  ASKB1='Yesterday you said that not a bone of him was broken. In the night I found two places. Moses says it of the Passover lamb, and David says it of a righteous man. Of whom do you say it?',
  ASKB3='Paul! I read on by the lamp, column after column. Here it speaks of his anointed one. That is he. Is it not?';
const asker=()=>bday()===1?EU:bday()===2?POSE[find().f][0]:DO,askB=()=>bday()===1?ASKB1:bday()===2?POSE[find().f][1]:ASKB3;
async function berIntro(){await tell('v10b');
  await say(P,'Men of Beroea: the Christ had to suffer, and to rise. And I can tell you his name.');
  await say(EU,'You say that all this is written. Then it lies in that chest, and the chest will stand open tomorrow, and the day after. We shall look.');
  await narr('Nobody here asked him to prove it. They asked him where it was written.',{dur:5600});
  await fade(1,600);await narr('The next morning the scrolls were on the table before he came in.',{dur:5200});await come('ber10',700);
  await say(EU,ASKB1);codeBtn()}
const againB=()=>say(asker(),askB());
async function layB(st,j){const d=bday(),cy=st.s.includes('is45'),A=asker();
  if(cy){if(st.t)return say(P,'No. I have not read that line to its end, and I lay nothing beside a line that I have not read.',TH);
    if(d===3)return cyrus();return say(P,'That line names its own man. I have nothing to lay beside it.',TH)}
  if(d===3)return say(DO,'You have wound it away, Paul. It was here, where it speaks of his anointed one. Is it he, or is it not?');
  const want=d===1?'P':find().row;
  if(j.closed)return say(P,'My tablets are shut. They have found the place. It is for me to lay beside it what was done.',TH);
  if(j.none)return say(P,'Every scroll is rolled shut. There is nothing on the table to look at.',TH);
  if(j.bad)return say(A,T(j.bad==='law'?'Moses lies open at one place, Paul: {a}. Your tablets lie at another: {b}. Are those one thing? I do not think so.'
    :j.bad==='pr'?'The prophet lies open at one place, Paul: {a}. Your tablets lie at another: {b}. Are those one thing? I do not think so.'
    :'The psalm lies open at one place, Paul: {a}. Your tablets lie at another: {b}. Are those one thing? I do not think so.',{a:T(j.a),b:T(j.b)}));
  if(j.part)return say(A,j.part==='law'?'Moses is rolled shut. He has a place in this too: I found it.':j.part==='pr'?'The prophet is rolled shut. You said that a prophet speaks of this as well.':'The psalm is rolled shut. David has a place in this too.');
  if(j.row!==want)return say(A,'That holds: we have looked at it. It is not the place that lies before us today.');
  chord10();
  if(want==='P'){await say(P,quote(PLACE.is535));await say(P,quote(EV.pierce));
    await say(EU,'A lamb, a righteous man, and a servant who is pierced. Three scrolls. And you say: one afternoon.');
    await say(P,'One afternoon, outside Jerusalem. The soldiers had never heard Moses read.');
    await say(DO,'I shall not sleep tonight. There is a whole scroll of Isaiah, and I have read one column of it.');
    F.b1=1;SFX.good();await step('ber10');await tell('v11');
    await fade(1,600);await narr('The next day they brought what they had found themselves.',{dur:5200});await come('ber10',700);return againB().then(codeBtn)}
  const f=find();await say(P,quote(EV[st.t]));
  if(f.f==='b2a'){await say(KL,'For a garment. While he was dying.');await say(P,'They did not know that they were doing what was written. Soldiers do not read David.')}
  else if(f.f==='b2b'){await say(DO,'Not one word. And he could have spoken?');await say(P,'He could have. He chose the silence that was written.')}
  else{await say(EU,'A new tomb. So even that.');await say(P,'Even that.')}
  F[f.f]=1;SFX.good();
  if(find()){tabSt();await againB();codeBtn();return}
  await step('ber10');await fade(1,600);await narr('And on the day after that, Dorotheos was at the table before anyone else.',{dur:5600});await come('ber10',700);await say(DO,ASKB3);codeBtn()}
/* the line that names another man */
async function cyrus(){await say(P,'Read the line to its end, Dorotheos. Aloud.');await say(DO,quote(PLACE.is45));await say(DO,'Cyrus. The Persian.');
  await say(P,'Jehovah gave that title to a king of Persia, for a task of his own. The word is the same; the man is not.');
  await say(P,'I have nothing to lay beside that line, and I will lay nothing beside it.');
  await say(DO,'Then I was wrong.');
  await say(P,'You read on to the end of the line. That is not being wrong. That is how it is done.');
  await say(EU,'He would have let you have it, boy, if he had something to sell.');
  F.b3=1;SFX.good();await step('ber10');await tell('v12');return strangers()}

/* ============ WITHOUT PAUL ============ */
/* The Jews of Thessalonica came and stirred up the crowds (Acts 17:13), and the brothers sent Paul to the sea at once; Silas and
   Timothy stayed (17:14). The game stays with them: the button that has always led back to Paul is grey, and the player is Timothy,
   who has known the holy writings from infancy (2 Timothy 3:15). A man who was away asks what the others asked on the first day, and
   the answer is to step back: the Beroeans set all three scrolls themselves. The scene is invented. */
async function strangers(){AU.mood='tense';place(E1,'ber10',40,118,1);SFX.door();await walk(E1,...spot(E1,P.x-30,P.y+2));
  await say(E1,'Paul. There are men from Thessalonica at the gate. They are not asking for the synagogue. They are asking for you, by name, and telling the street what you are.');
  await tell('v13');
  await say(EU,'To the sea, and tonight. Three of us go with you.');
  await say(SI,'Timothy and I stay, Paul. Somebody should be standing here when they wind those scrolls tomorrow.');
  await say(P,'Then stay, both of you. And when I send for you, come.');
  await tell('v14');await fade(1,700);await narr('He went out by the other street, with brothers on both sides of him.',{dur:5600});
  F.sea=1;P.room=null;place10('ber10');playAs(TP);enterRoom('ber10',TP.x,TP.y,TP.dir);AU.mood='tense';codeBtn();await fade(0,700);
  await narr('Paul was on the road to the sea. In the synagogue of Beroea the scrolls still lay open.',{dur:6200});
  SFX.door();await walk(LT,130,126);LT.dir=1;
  await say(LT,'Five days with the flocks, and I come back to find the whole synagogue round one table. What did the stranger say?');
  await say(LT,'You, young man: you came with him. They tell me that not a bone of him was broken. Where is that written?');codeBtn()}
async function own(){if(F.own)return;
  await think('He is asking me. What do I do?',[
    {q:'Set the table for him myself.',no:'I could. I have heard Paul lay it out, and I knew these writings before I could walk. But next week I may be sent for too, and then who will set the table for them?'},
    {q:'Tell him to wait until Paul is back.',no:'Paul is not coming back this month. And it never depended on Paul.'},
    {q:'Ask Eupolemos to show him.',ok:1}]);
  await say(TP,'Eupolemos. You found two of the three places yourself. Will you show him?');
  await say(EU,'I? ...Yes. Come here, shepherd. Dorotheos, give me Moses.',{to:LT});
  await narr('The old man put his hands on the rollers: Moses first, then David, then the prophet.',{dur:6200});chord10();
  await say(EU,'A lamb, of which no bone may be broken. A righteous man, whose bones are all kept. A servant who is pierced. Now, young man: tell him about the afternoon. That part is in no scroll of ours.');
  await say(TP,quote(EV.pierce));
  await say(LT,'Three scrolls. I have heard them read all my life, one at a time.');
  await narr('Outside, strangers were shouting in the street. Inside, somebody wound a scroll on to its next place.',{dur:7000});
  F.own=1;SFX.good();
  await fade(1,700);playAs(P);TP.room=null;
  try{await need('map');await SHARED.map.journey(ROAD3,{view:'west',labels:LAB3,speed:2400});await tellMap('v15a')}catch(e){console.error(e)}
  await fade(1,600);G.scene=null;F.ath=1;await come('quay10',800);
  await narr('They had brought him the whole way. Now they had something to carry back.',{dur:6200});
  await say(E1,'This is the harbor of Athens, Paul. We must be on board again before she turns round. What do we tell them in Beroea?');codeBtn()}

/* ============ THE QUAY: carried by mouth ============ */
/* They left with instructions that Silas and Timothy should come to him as quickly as possible (Acts 17:15). The player puts the
   message together from its parts. Everything else that could be added is true and kind, and makes it longer and less sure. That it
   was spoken and not written, and the quay, are invented. */
const MSG=[{k:'who',q:'It is for Silas and Timothy.',need:1},{k:'what',q:'They are to come to me, here in Athens.',need:1},{k:'soon',q:'As quickly as they can.',need:1},
  {k:'greet',q:'Greet Eupolemos, Dorotheos and Kleonike, each by name.'},{k:'tell',q:'Tell the brothers in Thessalonica that I think of them night and day.'}];
async function message(){if(F.msg)return;const got=new Set();
  await say(P,"It has to cross the sea in a man's memory, and then go two days on foot. What do I send?",TH);
  for(;;){const av=MSG.filter(m=>!got.has(m.k)),i=await choose(av.map(m=>m.q).concat(got.size?['That is the whole message.']:[]));
    if(i<av.length){got.add(av[i].k);await say(P,av[i].q);continue}
    const miss=MSG.find(m=>m.need&&!got.has(m.k));
    if(miss){await say(E1,miss.k==='who'?'For whom is it, Paul? There are a good many brothers in Beroea by now.':miss.k==='what'?'And what are they to do? Send word? Wait for you? Come?':'And when? When the brothers there can spare them? Before the winter?');continue}
    if(got.size>3){await say(E2,'Silas and Timothy are to come... to Thessalonica? No. To greet... Let me begin again.');
      await say(P,'Too much for one memory and so many days. Only what must not be lost.',TH);got.delete('greet');got.delete('tell');continue}
    break}
  await say(E1,'Silas and Timothy are to come to you in Athens, as quickly as they can. That I can carry.');
  await say(P,'That is all of it. May Jehovah be with you on the road, brothers.');
  F.msg=1;SFX.good();await tell('v15b');return finale()}
async function finale(){AU.mood='rest';
  await narr('The ship turned round the same day. Paul stood on the quay of a city in which he knew nobody.',{dur:7600});
  endScreen({title:'Is It So?',text:'In one city he laid the Scriptures beside what had happened. In the next they did it themselves, every day, and went on when he was gone.',
    based:'Based on Acts 17:1-15; 1 Thessalonians 2:2, 9, 17; Philippians 4:16; Luke 24:44 and 1 Corinthians 15:3-8. Supporting characters, dialogue and puzzles are invented for this dramatization; the events of the account are from the Scriptures and are told here in paraphrase. Acts does not say how long they were in Thessalonica, what Paul worked at there, which passages he used, whether Timothy was with them there, where Paul and Silas were when the house was stormed, what the security was, what the Beroeans examined, or from which harbor Paul sailed.',
    go:'Click to continue to Chapter Eleven',code:['Chapter Eleven code: {code}',codeOf(11,0)]});
  await wait(1500);ov.onclick=()=>startChapter(11);await new Promise(()=>{})}
/* the courtyard at dusk, as the uproar is told: nobody is in it */
function yardScene(g,t){backdrop(g,'yard10');ART.yard10.draw(g,t)}
const dark=DARK;

/* ============ ITEMS ============ */
Object.assign(ICON,{
  /* six panels of goat-hair cloth, folded and laid one upon the other: all of one width, each a little askew, so that the pile is a pile
     of cloth and not a flight of steps */
  panels10(g){[[4,16,0],[5.4,13,.3],[3.6,10,.12],[5,7,.36],[4.2,4,.2]].forEach(([x,y,k])=>{const c=tint(CLOTH,k);g.fillStyle=lg(g,0,y,0,y+3,[tint(c,.3),c,tint(c,-.4)]);g.fillRect(x,y,15,3);
    R(g,x,y,15,.6,'rgba(255,240,210,.3)');R(g,x+13.6,y+.8,1.4,1.6,tint(c,-.5))})},
  /* the tent, rolled, its loops showing at one end */
  tent10(g){IH.roll(g,CLOTH,7,10);for(const y of[8.6,11.4,14.2])R(g,20.4,y,1.8,1.2,'#8a6a4a')}});
Object.assign(ITEMS,{
  panels10:{name:'cut panels',look:'Six panels of goat-hair cloth: a roof, two walls, a door flap and two gussets, and a strip for the loops. Cut, and not yet sewn.'},
  tent10:{name:'traveling tent',look:'A tent for a man who trades along the great road. The thin strip of the bolt lies inside three seams of it.'}});
const sewWith=()=>sew();
Object.assign(COMBO,{'awl+panels10':sewWith,'panels10+thread':sewWith,'knife+panels10':()=>say(P,'They are cut, and cut right. The knife has done its part.'),
  'awl+tent10':()=>say(P,'It is sewn, and it will hold.'),'tent10+thread':()=>say(P,'It is sewn, and it will hold.'),'knife+tent10':()=>say(P,'I do not cut what I have just sewn.')});

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.yard10={space:.9,walk:[16,304,114,138],get mood(){return yardV()==='n'?'night':'calm'},amb:()=>yardV()==='n'?{crickets:.5,fire:.15}:{crowd:.2,birds:.4,hammer:.15},hs:[
  {name:'gate to the street',x:18,y:46,w:32,h:58,wx:46,wy:116,dir:-1,exit:toSabbath,
    look:()=>say(P,F.cutd?'The gate, and the street. The synagogue is three streets away, and people have begun to stop here on their way past.':'The gate to the street. Beyond it: a harbor, a marketplace, and the great road running through.')},
  {name:'water jar',x:55,y:88,w:18,h:20,wx:82,wy:116,dir:-1,look:'A great jar of water, in the shade of the wall.',use:'I drink. A man who sews by a lamp needs it.',pickup:"It is Jason's, and it stands where it should."},
  {name:'shuttered window',x:102,y:38,w:20,h:18,wx:112,wy:115,look:'A window of the house, shuttered against the heat of the day.',open:"It is Jason's window, and he likes it shut."},
  {name:'bolt of goat-hair cloth',x:74,y:104,w:132,h:9,wx:140,wy:116,def:'use',vis:()=>!F.cutd,use:toBolt,useWith:boltWith,
    look:()=>say(P,F.laid?'Laid out, panel by panel. It needs only the knife now.':'One bolt, twelve cubits by four, pegged out along the wall. It is a hand shorter than I should have liked, and one cubit of it is woven thin.'),
    pickup:'It is pegged out, and it stays so until it is laid out and cut.'},
  {name:'workbench',x:176,y:78,w:70,h:26,wx:210,wy:115,def:'use',look:()=>say(P,F.sold?'The bench is bare. In this city I have sewn one tent on it, and talked across it to more people than I can count.':F.sewn?'The bench, and Parmenon\'s tent on it, rolled.':'A bench against the wall, with a lamp over it. Jason cleared it for me on the first evening.'),
    use:sew,useWith:id=>id==='panels10'||id==='awl'||id==='thread'?sew():false,pickup:'A bench is not carried about.'},
  {name:'lamp niche',x:202,y:42,w:18,h:20,wx:190,wy:115,dir:1,look:()=>say(P,yardV()==='n'?'The lamp over the bench. It has more oil in it than I had hoped: Jason fills it when I am not looking.':'A lamp in its niche, over the bench. By day it rests. By night it is the only one in the street still burning.'),
    pickup:'It belongs over the bench.',use:()=>say(P,yardV()==='n'?'It burns. I need it until the seam is closed.':'Not by day. The sun gives its light for nothing, and the oil is Jason\'s.')},
  {name:'door of the house',x:266,y:46,w:32,h:58,wx:282,wy:115,dir:1,look:"The door of Jason's house. He received us under his roof on the day we came, and would hear of nothing else.",
    open:()=>say(P,yardV()==='n'?'The house is asleep. I have a seam to close.':'Not now. The day is for the bench, and for whoever stops at the gate.'),
    use:()=>say(P,yardV()==='n'?'The house is asleep. I have a seam to close.':'Not now. The day is for the bench, and for whoever stops at the gate.')}]};
ROOMS.bolt10={space:.8,walk:NOW,mood:'calm',amb:{birds:.4,crowd:.15},hs:[
  {name:'bolt of goat-hair cloth',x:BX,y:BY,w:COLS*CELL,h:ROWS_B*CELL,wx:160,wy:236,def:'use',use:onBolt,useWith:boltWith,
    look:()=>say(P,F.laid?LAID:'Twelve cubits by four. The third cubit from the left is woven thin: a panel may end on it, and must not run across it. And what is left over I want in one length.'),pickup:'It is pegged out, and it stays so.'},
  {name:'measuring cord',x:BX,y:BY-10,w:COLS*CELL,h:8,wx:160,wy:236,look:'My cord, knotted to the cubit. Twelve knots along the bolt, and four across it.',pickup:'It lies where I need it.',use:'It has measured. Now the panels need their places.'},
  ...PIECES.map(p=>({name:p.name,x:p.tx-2,y:TRAY_Y-3,w:Math.max(p.w,p.h)*TC+4,h:28,wx:160,wy:236,def:'use',use:()=>board(p),
    look:()=>say(P,{roof:'The roof: four cubits by four.',long:'The long wall: six cubits by two.',end:'The end wall: three cubits by two. It can be turned.',flap:'The door flap: two cubits by two.',
      g1:'A gusset: two cubits by one. It can be turned.',g2:'The other gusset: two cubits by one. It can be turned too.'}[p.id]),pickup:()=>board(p)})),
  {name:'stool',x:228,y:106,w:86,h:36,wx:160,wy:236,exit:()=>step('yard10'),look:'My stool, and my pouch beside it. From down here on my knees the cloth looks longer than it is.'}]};
ROOMS.syn10={space:1.5,walk:[16,304,112,137],mood:'still',amb:{crowd:.12},hs:[
  {name:'door to the street',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(P,'Not while a man is waiting for his answer.'),look:'The door to the street. The Greeks who fear God stand nearest to it, and listen hardest.'},
  {name:'benches',x:56,y:84,w:170,h:20,wx:120,wy:113,look:'Benches of stone along the wall. Today nobody is sitting on them.',use:'I have sat, and listened. Now I have been asked to speak.'},
  {name:'high windows',x:82,y:22,w:156,h:22,wx:160,wy:113,look:'Three windows, high in the wall. The light they give falls on the table.'},
  {name:'lamp niche',x:58,y:50,w:18,h:22,wx:80,wy:113,look:'A lamp in its niche, not lit by day.',pickup:'It belongs to this house.'},
  {name:'chest of the scrolls',x:232,y:66,w:38,h:38,wx:228,wy:114,dir:1,look:'The chest of the scrolls, under its blue cloth. The attendant has taken out the Psalms and the Prophets for me.',
    open:'It is not mine to open. What I asked for lies on the table.',pickup:'It is carried in by two men, and neither of them is I.'},
  {name:'reading table',x:118,y:92,w:84,h:29,wx:160,wy:124,def:'use',use:toTable,look:'The reading table, on its platform. Two scrolls lie on it: the Psalms, and the Prophets.',pickup:'It stands where a whole synagogue can see it.'}]};
/* the table: each scroll has its two rollers and its open column; then the tablets, those who listen, and the way down */
const tabHs=n=>{const out=[];for(let i=0;i<n;i++){const live=()=>atTable()&&tabSt().n===n,nm=()=>SCROLL[tabSt().kinds[i]],[x,w]=SLOT[n][i];
    out.push({get name(){return T('{scroll} (left roller)',{scroll:T(live()?nm():SCROLL.ps)})},x,y:SY-4,w:22,h:SHH+8,wx:160,wy:236,def:'use',vis:live,use:()=>wind(i,-1),look:()=>readPlace(i),pickup:'A scroll of this house is not mine to carry off.'},
      {get name(){return T(live()?nm():SCROLL.ps)},x:x+22,y:SY-4,w:w-44,h:SHH+8,wx:160,wy:236,def:'look',vis:live,look:()=>readPlace(i),use:()=>readPlace(i),pickup:'A scroll of this house is not mine to carry off.'},
      {get name(){return T('{scroll} (right roller)',{scroll:T(live()?nm():SCROLL.ps)})},x:x+w-22,y:SY-4,w:22,h:SHH+8,wx:160,wy:236,def:'use',vis:live,use:()=>wind(i,1),look:()=>readPlace(i),pickup:'A scroll of this house is not mine to carry off.'})}return out};
ROOMS.table10={space:1.5,walk:NOW,mood:'table',amb:{},hs:[
  ...tabHs(2),...tabHs(3),
  {name:'my tablets on the table',x:104,y:90,w:112,h:44,wx:160,wy:236,def:'use',vis:()=>atTable()&&tabSt().has,use:leaf,look:readLeaf,pickup:'They lie where I need them: beside the scrolls.'},
  {get name(){return F.gone?'Beroeans at the table':'men on the benches'},x:0,y:0,w:320,h:17,wx:160,wy:236,def:'talk',talk:lay,use:lay,
    look:()=>say(P,F.gone?'They stand round the table with their hands on the rollers. Nobody here waits to be told.':'They are waiting. Whatever lies on this table when I look up is what I have shown them.')},
  {name:'steps of the platform',x:250,y:100,w:70,h:44,wx:160,wy:236,exit:fromTable,look:'The way back down from the table.'}]};
ROOMS.night10={space:1.1,walk:[16,304,112,137],mood:'night',amb:{crickets:.4,fire:.15},hs:[
  {name:'door to the lane',x:25,y:47,w:30,h:57,wx:52,wy:116,dir:-1,exit:()=>say(P,'Not before I know what Jason has had to promise.'),look:'The door to the lane. It is shut, and nobody has knocked at it yet.'},
  {name:'shuttered window',x:102,y:38,w:22,h:18,wx:112,wy:114,look:'Shuttered. The noise from the marketplace has died down.',open:'Not tonight.'},
  {name:'lamp niche',x:176,y:40,w:18,h:20,wx:186,wy:114,look:'One lamp. The brother of this house turned it low when he let us in.',pickup:'It is his.'},
  {name:'shelf',x:224,y:36,w:56,h:14,wx:250,wy:114,look:'His vessels: a jug, a bowl, a jar. He offered us all three before we had sat down.',pickup:'They are his.'},
  {name:'bundles',x:276,y:90,w:36,h:16,wx:270,wy:116,dir:1,look:'Our bundles. Timothy went for them through the back streets, and came back with every one.',pickup:'Timothy has them in hand. I have what I need.'}]};
ROOMS.ber10={space:1.3,walk:[16,304,112,137],get mood(){return F.b3?'tense':'calm'},amb:()=>F.sea?{crowd:.45,birds:.2}:{birds:.5,leaves:.2},hs:[
  {name:'door to the street',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(PC(),tim()?'Silas and I stay. That was agreed.':'Not while the scrolls lie open and somebody is waiting beside them.'),
    look:'The door to the street. They come in by it every morning now, before their work.',as:{tim10:{look:'The door. There are voices beyond it that I know from Thessalonica.'}}},
  {name:'benches',x:56,y:84,w:210,h:20,wx:86,wy:113,look:'The benches. Nobody uses them: everyone is standing at the table.',as:{tim10:{look:'Empty benches, and a full table.'}}},
  {name:'window',x:116,y:20,w:88,h:56,wx:160,wy:113,look:'A mountain, green to its shoulder, with the morning on it. This city lies at its foot.',as:{tim10:{look:'The mountain. Paul is walking away from it, toward the sea.'}}},
  {name:'chest of the scrolls',x:272,y:68,w:34,h:36,wx:262,wy:114,dir:1,look:'Their chest. It stands open, and it is nearly empty: what it held lies on the table.',open:'It is open already.',pickup:'It is theirs.',
    as:{tim10:{look:'The chest stands open. They have stopped putting the scrolls away at night.'}}},
  {name:'reading table',x:120,y:82,w:80,h:24,wx:160,wy:113,def:'use',use:toTable,look:'The table, under the window. Three scrolls lie open on it: Moses, the Prophets and the Psalms.',pickup:'It is not going anywhere, and neither are they.',
    as:{tim10:{look:'Three scrolls, open. They found most of these places themselves.',use:toTable}}}]};
ROOMS.quay10={space:.6,walk:[16,304,114,138],mood:'rest',amb:{waves:.8,gulls:.6,creak:.3},hs:[
  {name:'road to the city',x:0,y:62,w:22,h:44,wx:22,wy:120,dir:-1,exit:()=>say(P,'Not yet. These brothers sail home today, and they must not sail without a word from me.'),look:'The road up to the city. I have never walked it.'},
  {name:'jars',x:28,y:96,w:44,h:20,wx:74,wy:118,dir:-1,look:'Oil for some other harbor. Every one of them is spoken for.',pickup:'They are not mine.'},
  {name:'sea',x:0,y:66,w:176,h:34,wx:120,wy:116,look:'Open water. Beroea lies many days behind it, and Thessalonica behind Beroea.',use:'I have had enough sea for one week.'},
  {name:'ship',x:178,y:54,w:142,h:50,wx:230,wy:116,look:'She brought us down the coast, and she goes back with the next wind.',use:'I am not sailing. Not this time.'},
  {name:'gangplank',x:194,y:84,w:20,h:22,wx:204,wy:114,exit:()=>say(P,'That way lies Beroea, and the men who are looking for me. I am staying.'),look:'The gangplank. Two men will go up it in an hour, and I shall not be one of them.'}]};

/* ============ PEOPLE ============ */
const todo=()=>inYard()?(!F.cutd?'The cloth is pegged out along the wall, Paul. Parmenon will ask for his tent soon enough.':!F.r2?'It is the Sabbath, Paul. The gate is open.':!F.sewn?'The panels are on the bench, Paul, and the lamp is lit.':!F.r3?'It is the Sabbath again, Paul. They will be waiting.':!F.sold?'Parmenon is here for his tent.':'The third Sabbath, Paul. Half the street is going.')
  :inSyn()?'They have asked you a question, Paul. The scrolls are on the table.'
  :G.room==='night10'?'Hear Jason out, Paul. It is his house that they broke into.'
  :inBer()?'They are waiting at the table, Paul. I have never seen men so glad to be shown a scroll.':'The brothers must sail, Paul. What are they to tell us?';
SI.hs={name:'Silas',actor:SI,look:()=>say(P,inBer()?'Silas. He has stopped looking at the door every time it opens.':G.room==='night10'?'Silas. He has not sat down since we came into this house.':'Silas. His back is no better than mine, and he says less about it.'),
  show:{awl:'Your awl. It earns our bread, and it starts more talk than my tongue does.',tablets:'Read me one tonight.',panels10:'Six pieces of cloth, and you see a tent. I see six pieces of cloth.',tent10:'So that is what you saw in them.','*':'Keep it, brother. You will find a use for it.'},
  talk:()=>say(SI,todo()),
  as:{tim10:{look:'Silas. He stayed, and so did I. Neither of us had to be asked twice.',talk:()=>say(SI,F.own?'You did well, Timothy.':'He asked you, Timothy. But think who found those places.'),show:{'*':'Keep it, Timothy.'}}}};
TI.hs={name:'Timothy',actor:TI,look:()=>say(P,inBer()?'Timothy. He reads over their shoulders, and bites his tongue.':'Timothy. He carries what Silas and I cannot yet lift, and has not once mentioned it.'),
  show:{tablets:'Are there new ones, Paul? I know the old ones by heart.',awl:'The awl. I watched it by lamplight when I was a boy.',panels10:'Shall I hold the far edge when you sew, Paul?',tent10:'It rolls up smaller than I thought.','*':'Shall I carry that for you, Paul?'},
  talk:()=>say(TI,todo())};
JA.hs={name:'Jason',actor:JA,look:()=>say(P,G.room==='night10'?'Jason. His sleeve is torn at the shoulder, and he has not noticed it.':inSyn()?'Jason, before the benches. He has not missed a Sabbath.':'Jason. He took three strangers under his roof on the word of one of them.'),
  show:{awl:'I can keep accounts, Paul. I cannot sew.',tablets:'You wrote all of that yourself?',panels10:'So that is how a tent begins.',tent10:'Parmenon has a good eye. He will see what he is getting.','*':'Whatever you need in this house, Paul, you have only to say.'},
  talk:async()=>{if(G.room==='night10')return jasonTalk();if(inSyn())return say(JA,'I am listening, Paul. So is everyone else.');return talkTree([
    {q:'What sort of city is this, Jason?',once:1,a:()=>say(JA,'A harbor at one end and the great road through the middle. Whatever is said here on the Sabbath is known in every port by the next new moon.')},
    {q:'We are a burden on your house.',once:1,a:async()=>{await say(JA,'You eat bread that you have paid for, and you sew until I am ashamed to go to bed. That is not what a burden looks like.')}},
    {q:'Peace to your house, Jason.',bye:1}])}};
PA.hs={name:'Parmenon',actor:PA,look:'Parmenon. He trades along the great road, from one sea to the other, and sleeps where night finds him.',
  give:id=>id==='tent10'?sell():false,show:{awl:'A good tool. I buy and sell: I could not tell you how to hold it.',panels10:'Pieces. I ordered a tent, tentmaker.',tablets:'Accounts? No? Then they are no business of mine.','*':'I buy many things. Not that.'},
  talk:async()=>{if(has('tent10'))return sell();return say(PA,'You sew, and I shall talk. That is a fair division.')}};
BR.hs={name:'brother from Philippi',actor:BR,look:'A brother from Philippi. He has walked for four days to put a bundle into my hands.',show:{'*':'Keep it, Paul. I came to bring, not to fetch.'},talk:()=>say(BR,'Luke sends his greeting, and wants to know how your backs are.')};
HO.hs={name:'brother of the house',actor:HO,look:'The brother whose house this is. He opened his door tonight before he had asked who was knocking.',show:{'*':'Keep it, brother. You will need it on the road.'},
  talk:()=>say(HO,F.gone?'The moon is down. It is time.':'The lanes behind this house are dark, and I know every one of them. Say the word.')};
/* the synagogue of Thessalonica */
TD.hs={name:'Theodotos',actor:TD,look:'Theodotos, the attendant. He brought out the scrolls that I asked for, and laid them on the table himself.',show:{tablets:'Wax. What is on our table is written on skin, and will outlast both of us.','*':'Not in this house, on this day.'},
  talk:()=>say(TD,'The scrolls are on the table, stranger. Handle them as what they are.')};
LM.hs={name:'Lysimachos',actor:LM,look:'Lysimachos. He has heard these scrolls read since he was a child, and he does not mean to be told what is in them.',show:{tablets:'Your tablets I cannot test. The scrolls I can.','*':'Put that away. This is a synagogue.'},
  talk:()=>ASKER()===LM?again():say(LM,sab()===3?'I have heard enough to know how many are listening.':'Let him answer Menandros first.')};
ME.hs={name:'Menandros',actor:ME,look:'Menandros. A Greek, and one who worships God: he stands nearest the door, and has not taken his eyes off the table.',show:{tablets:'You carry it written down. Good. Then you do not make it up as you go.','*':'I did not come for that.'},
  talk:()=>ASKER()===ME?again():say(ME,'Answer him, tentmaker. I am listening to every word.')};
ST.hs={name:'Stratonike',actor:ST,look:'Stratonike. One of the first women of the city, by her dress, and no daughter of Israel. She listens as if she were keeping accounts.',show:{'*':'Keep it, sir. I came to hear.'},
  talk:()=>say(ST,sab()===1?'Go on, sir. In this city women are used to being told things plainly.':'I have been thinking about it all week, sir. So have the women of my house.')};
/* the synagogue of Beroea */
EU.hs={name:'Eupolemos',actor:EU,look:()=>say(P,'Eupolemos. The oldest man in this synagogue, and the first at the table every morning.'),show:{tablets:'May I? ...So that is where you keep what happened. And we keep what was written. Good: now both lie on one table.','*':'Keep it, Paul. Show me a scroll instead.'},
  talk:()=>F.b3?say(EU,'To the sea, Paul. We know the road.'):asker()===EU?againB():say(EU,'One place at a time, Paul. It is not my turn.'),
  as:{tim10:{look:'Eupolemos. He found two of the three places himself, with nobody to point.',talk:own,show:{'*':'Keep it, young man.'}}}};
DO.hs={name:'Dorotheos',actor:DO,look:()=>say(P,'Dorotheos. He reads faster than he thinks, and he knows it, and he reads on anyway.'),show:{tablets:'You have it all in so few lines!','*':'Keep it, Paul.'},
  talk:()=>F.b3?say(DO,'I shall go on reading, Paul. To the end of every line.'):asker()===DO?againB():say(DO,'I have found something, Paul. But it is not my turn.'),
  as:{tim10:{look:'Dorotheos. He has not looked up from the Prophets since Paul left.',talk:()=>say(DO,'Did you know these scrolls as a boy? All of them? Then you can tell me whether I am reading on far enough.'),show:{'*':'Keep it, Timothy.'}}}};
KL.hs={name:'Kleonike',actor:KL,look:()=>say(P,'Kleonike. A Greek woman of standing. Her brother reads to her every evening from what he copied out here in the morning.'),show:{tablets:'So few lines. And each of them has a place in those scrolls?','*':'Keep it, sir.'},
  talk:()=>F.b3?say(KL,'Go safely, sir. What you showed us stays here.'):asker()===KL?againB():say(KL,'I listen, sir, and at home I ask. It is slower, and I forget less.'),
  as:{tim10:{look:'Kleonike. She did not leave when the shouting began.',talk:()=>say(KL,'They may shout in the street. They cannot shout the lines out of the scrolls.'),show:{'*':'Keep it.'}}}};
LT.hs={name:'man back from his flocks',actor:LT,look:'A shepherd, by his cloak, and a son of this synagogue.',as:{tim10:{look:'A man who was with his flocks all week. He has missed five days, and he knows it.',talk:own,show:{'*':'Keep it, young man. Show me the place instead.'}}}};
/* the quay */
E1.hs={name:'brother from Beroea',actor:E1,look:'One of the brothers who brought me from Beroea. He did not leave my side between the gate and the ship.',show:{tablets:'Keep them, Paul. I shall carry it in my head.','*':'Keep it, Paul.'},
  talk:()=>inBer()?say(E1,'The ship will not wait, Paul.'):F.msg?say(E1,'I have it, Paul. Word for word.'):message()};
E2.hs={name:'younger brother',actor:E2,look:'The younger of the two. He was seasick the whole way, and said that he was not.',show:{'*':'Keep it, Paul.'},talk:()=>F.msg?say(E2,'He has it. I shall remind him.'):message()};
/* Timothy when he is the one being played: his answers where the level wrote nothing for him */
const TIM10={noCraft:"That is Paul's craft, not mine.",
  def:{look:'I see nothing there that needs my hands.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',use:'That is not for me to do.',open:'It does not open.',talk:'I would get no answer.',give:'I carry nothing that I could give.'}};

/* ============ WAX TABLETS: people met, tasks still open, and the places in the scrolls (shown by shared/tablets.js) ============ */
const ps=k=>({ref:PLACE[k].ref,gist:PLACE[k].gist});
const TABLETS={
  people:[
    {name:'Silas',note:'A prophet, and a leading man among the brothers in Jerusalem. He was beaten in Philippi as I was.'},
    {name:'Timothy',note:'The son of Eunice, of Lystra. He has known the holy writings since he was a small child.'},
    {name:'Jason',note:'He received us under his roof in Thessalonica.',if:()=>!F.gone},
    {name:'Parmenon',note:'A trader on the great road. He has ordered a traveling tent.',if:()=>!F.sold&&!F.night},
    {name:'Lysimachos',note:'Of the synagogue of Thessalonica. He asks where it is written, and means to see it.',if:()=>!!F.cutd&&!F.gone},
    {name:'Menandros',note:'A Greek who worships God. He stands nearest the door, and listens hardest.',if:()=>!!F.r1&&!F.gone},
    {name:'Stratonike',note:'One of the leading women of Thessalonica.',if:()=>!!F.r3&&!F.gone},
    {name:'Eupolemos',note:'The oldest man in the synagogue of Beroea. He is at the table before anyone.',if:()=>!!F.gone},
    {name:'Dorotheos',note:'A young man of Beroea, who reads on.',if:()=>!!F.b1},
    {name:'Kleonike',note:'A Greek woman of standing, in Beroea.',if:()=>!!F.b1}],
  tasks:[
    {t:'Lay out the six panels of the tent on the bolt, before the knife touches it.',if:()=>!F.laid},
    {t:'Cut the panels.',if:()=>!!F.laid&&!F.cutd},
    {t:'The Sabbath: go to the synagogue.',if:()=>inYard()&&!!F.cutd&&(!F.r2||(!!F.sewn&&!F.r3)||(!!F.sold&&!F.r4))},
    {t:'Lysimachos: is the sour wine written?',if:()=>!F.night&&!!F.cutd&&!F.r1&&!inYard()},
    {t:'Menandros: if God had sent him, would God have let them mock him?',if:()=>!!F.r1&&!F.r2},
    {t:'Sew the panels: night work.',if:()=>!!F.r2&&!F.sewn},
    {t:'Lysimachos: a dead Christ is no Christ.',if:()=>!!F.sewn&&!F.r3&&!inYard()},
    {t:'Parmenon has come for his tent.',if:()=>!!F.r3&&!F.sold},
    {t:'Menandros: why this Jesus, and no other?',if:()=>!!F.sold&&!F.r4&&!inYard()},
    {t:'Jason has given security. What do I do with this night?',if:()=>!!F.night&&!F.gone},
    {t:'Eupolemos: Moses says it of a lamb, David of a righteous man. Of whom do I say it?',if:()=>!!F.gone&&!F.b1},
    {t:'Kleonike: the lots cast for his clothing.',if:()=>!!F.b1&&!F.b2a},
    {t:'Dorotheos: before whom was he silent?',if:()=>!!F.b2a&&!F.b2b},
    {t:'Eupolemos: a grave with the rich.',if:()=>!!F.b2b&&!F.b2c},
    {t:'Dorotheos: his anointed one. Read the line to its end.',if:()=>!!F.b2c&&!F.b3},
    {t:'Send word to Silas and Timothy.',if:()=>!!F.ath&&!F.msg}],
  scripture:[...['ps69','ps22m','is533','is50','ps118','ps16','ps34','is535'].map(ps),...['ex12','ps22l','is537','is539'].map(k=>Object.assign(ps(k),{if:()=>!!F.gone})),Object.assign(ps('is45'),{if:()=>!!F.b3})]};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={yard10:[150,126,1],bolt10:[160,236,1],syn10:[84,128,1],table10:[160,236,1],night10:[150,126,1],ber10:[100,128,1],quay10:[120,126,1]};
function place10(room){for(const a of[SI,TI,TP,JA,PA,BR,HO,TD,LM,ME,ST,EU,DO,KL,LT,E1,E2]){a.room=null;a.bow=false;a.talk=false}P.bow=false;
  const sea=!!F.sea&&!F.ath,me=sea?TP:P;if(sea)P.room=null;else TP.room=null;
  if(setScore&&AU.score!==(F.gone?MUSICB:MUSIC))setScore(F.gone?MUSICB:MUSIC);
  if(room==='yard10'){place(P,room,150,126,1);place(SI,room,112,123,1);place(TI,room,84,131,1);place(JA,room,256,122,-1);if(F.r3&&!F.sold)place(PA,room,186,128,-1)}
  else if(room==='bolt10'){place(me,room,160,236,1);boltSt()}
  else if(room==='table10'){place(me,room,160,236,1);tabSt()}
  else if(room==='syn10'){place(P,room,84,128,1);place(SI,room,52,124,1);place(TI,room,34,132,1);place(TD,room,252,117,-1);place(LM,room,214,125,-1);place(ME,room,104,119,1);place(ST,room,286,128,-1);place(JA,room,236,133,-1)}
  else if(room==='night10'){place(P,room,150,126,1);place(SI,room,186,122,-1);place(TI,room,254,129,-1);place(HO,room,96,121,1);place(JA,room,118,128,1)}
  else if(room==='ber10'){
    if(sea){place(TP,room,100,128,1);place(SI,room,66,124,1);place(EU,room,178,120,-1);place(DO,room,206,127,-1);place(KL,room,246,122,-1);place(LT,room,44,118,1)}
    else{place(P,room,100,128,1);place(SI,room,66,124,1);place(TI,room,40,131,1);place(EU,room,178,120,-1);place(DO,room,206,127,-1);place(KL,room,246,122,-1)}}
  else if(room==='quay10'){place(P,room,120,126,1);place(E1,room,158,122,-1);place(E2,room,184,129,-1)}
  swapBtn()}
function setup10(){P.hs=null;P.called='Paul';Object.assign(TP,TIM10);TP.called='Timothy';G.sab10=G.up10=G.seenBolt=0;G.bolt10=G.tab10=null;G.caps10=[];
  place10('yard10');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,tim10:[]};drawInv()}

/* ============ THE START ============ */
async function start10(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(10);G.end={};
    try{await need('map');await SHARED.map.journey(ROAD1,{view:'west',labels:LAB1,speed:2200});await tellMap('v1')}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;place10('yard10');place(PA,'yard10',186,128,-1);enterRoom('yard10',...ENT.yard10);codeBtn();await fade(0,700);
    await narr('About 50 C.E. They had left Philippi on foot, by the paved road that runs west through the mountains, and two of the three walked it with backs that had not healed.',{dur:10500});
    await tell('t22');
    await say(JA,'My roof is yours for as long as you are in Thessalonica, Paul, and my table with it. Sit. I have seen what Philippi did to your backs.');
    await say(P,'Your roof we take gladly, Jason. Your bread we mean to earn: there are three of us, and I have a trade.');
    await say(PA,'A tentmaker, they tell me, and from Tarsus. I trade along the great road, and my tent went down a ravine with the mule that carried it. I want another before the next market.');
    await say(P,'A roof, two walls, a door flap and two gussets. You shall have it.');
    await walk(PA,24,118);PA.room=null;
    await narr('He bought one bolt of goat-hair cloth. It was shorter than he would have liked, and one cubit of it was woven thin.',{dur:7600});
    await say(TI,'It is pegged out along the wall, Paul, as you said, and your cord is knotted to the cubit.');codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
function hint10(){
  if(tim())return['own10',['He asked me. But who found these places?','I should talk to the man back from his flocks, and ask Eupolemos to show him.']];
  if(F.ath)return['msg10',['Whatever is carried by word of mouth has to be short enough to arrive whole.','I talk to the brother from Beroea. It is for Silas and Timothy; they are to come to me in Athens; as quickly as they can. Nothing more.']];
  if(F.gone){const d=bday();
    if(d===1)return['b110',['Everything that is written about him in the Law of Moses, in the Prophets and in the Psalms had to come true. (Luke 24:44) Moses and David lie open at the unbroken bones.','The Prophets at the pierced one, and my tablets at the spear. Then I turn to the Beroeans.']];
    if(d===2){const f=find().f;return f==='b2a'?['b2a10',['She found the lots. I know who cast them.','My tablets at the soldiers who cast lots. The scrolls stay as she left them.']]
      :f==='b2b'?['b2b10',['He found the silence. I know before whom it was kept.','My tablets at the accusers who got no answer. The scrolls stay as he left them.']]
      :['b2c10',['He found the grave. I know whose tomb it was.',"My tablets at the rich man's tomb. The scrolls stay as he left them."]]}
    return['b310',['Before I lay anything beside a line, I should have read it to its end.','I look at the scroll of the Prophets. Then I shut my tablets, and turn to the Beroeans.']]}
  if(F.night)return['night10',['Jason gave security, and it was for us. At whose cost would I stay?','I should talk to Jason, and go tonight, as the brothers ask.']];
  if(G.room==='bolt10'||!F.cutd){
    if(F.laid)return['cut10',['It is laid out. Now it needs cutting.','I should use my knife with the bolt of cloth.']];
    return G.room==='bolt10'?['lay10',['The thin strip may lie at the edge of a panel, under a seam: never in the middle of one. And the spare cloth must be one length.','The end wall, turned upright, lies left of the thin strip. The long wall begins on the strip, with the two gussets under it. The roof goes to the far end.']]
      :['bolt10',['A tent is thought out before it is cut. The cloth is pegged out along the wall.','I should use the bolt of goat-hair cloth, and lay out the six panels on it.']]}
  if(inYard()){
    if(F.r2&&!F.sewn)return['sew10',['The panels are cut. The seams are night work.','I should use the awl with the cut panels.']];
    if(F.r3&&!F.sold)return['sold10',['Parmenon has come for what he ordered.','I should give him the traveling tent.']];
    return['gate10',['It is the Sabbath, and this city has a synagogue.','I can go out by the gate to the street.']]}
  const w=WANT();
  return w==='V'?['v10',['Everything that is written about him in the Law of Moses, in the Prophets and in the Psalms had to come true. (Luke 24:44) He asked about the sour wine.','At the table: the Psalms wound to the vinegar, the Prophets rolled shut, my tablets at the sour wine. Then I turn to the men on the benches.']]
    :w==='M'?['m10',["He asked about the mockery. One psalm has the mockers' own words, and Isaiah speaks of a man despised.",'The Psalms at the mocking, the Prophets at the despised man, my tablets at the chief priests.']]
    :w==='G'?['g10',['He asked whether a dead man can be the Christ. One psalm speaks of the Grave; and I know who saw him afterwards.','The Psalms at the Grave, the Prophets rolled shut, my tablets at the third day.']]
    :['p10',['What was done with him when he was dead? One psalm speaks of bones, and Isaiah of a man pierced.','The Psalms at the unbroken bones, the Prophets at the pierced one, my tablets at the spear.']]}

/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['No. And so I say it plainly: the Christ of whom all this is written is Jesus.']};
return{acting:ACTING,rooms:['yard10','bolt10','syn10','table10','night10','ber10','quay10'],setup:setup10,start:start10,hint:hint10,music:MUSIC,scenes:{dark,yard:yardScene},topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the table's places, lines and rows, the bolt's one way, the three maps, and the sounds made here */
  told:TOLD,places:PLACE,ev:EV,rows:ROWS,lists:LISTS,lines:LINES,way:WAY,pieces:PIECES,bolt:{x:BX,y:BY,cell:CELL,trayY:TRAY_Y,tc:TC},musicB:MUSICB,uproar,chord:chord10,
  maps:{road1:[ROAD1,LAB1],road2:[ROAD2,LAB2],road3:[ROAD3,LAB3]},
  /* The road is told on the map, three times, through the western window; nobody chooses it. */
  view:'west',labels:LAB1,route:ROAD1,
  /* Timothy is played only while Paul is on his way to the sea; before and after, he stands in no room as the one who can be played.
     And Paul stands in none while Timothy is played. A code must put neither where he is not. */
  away:id=>id==='tim10'?!F.sea||!!F.ath:id==='paul'?!!F.sea&&!F.ath:false,
  flags:['laid','cutd','r1','r2','sewn','r3','sold','r4','night','gone','b1','b2a','b2b','b2c','b3','sea','own','ath','msg'],
  /* seven rooms and nineteen flags today; the code keeps room for eight and for twenty-four */
  codeBits:{flags:24,rooms:3},party:['paul','tim10'],ent:ENT,
  inv:()=>['awl','thread','knife','tablets'].concat(F.cutd&&!F.sewn?['panels10']:[],F.sewn&&!F.sold?['tent10']:[]),
  place:place10}
});
