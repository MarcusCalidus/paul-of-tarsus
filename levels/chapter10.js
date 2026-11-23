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
  if(night)lightmap(g,320,'#3a3c5e',l=>{nicheLight(l,211,55,36,30,'#ffc070',.95);pool(l,211,104,96,52,'#ffb060',.6);pool(l,34,88,40,50,'#5a66a0',.4)});
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
const PIECES=[{id:'roof',name:'roof_panel',w:4,h:4,tx:26,c:'#b89c62'},{id:'long',name:'long_wall',w:6,h:2,tx:60,c:'#8c9aa8'},{id:'end',name:'end_wall',w:3,h:2,tx:106,c:'#9aa88c'},
  {id:'flap',name:'door_flap',w:2,h:2,tx:134,c:'#b0806a'},{id:'g1',name:'gusset',w:2,h:1,tx:156,c:'#a898b0'},{id:'g2',name:'second_gusset',w:2,h:1,tx:178,c:'#a898b0'}];
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
  R(g,18,TRAY_Y-3.4,184,31,'rgba(20,16,30,.36)');g.fillStyle=lg(g,0,TRAY_Y-5,0,TRAY_Y+26,['#8a6a40','#785a34','#684c2a']);g.fillRect(16,TRAY_Y-5,184,31);
  inRect(g,16,TRAY_Y-5,184,31,()=>{tex(g,'wood',.18,16,TRAY_Y-5,184,31,'overlay',.55);tex(g,'mott',.14,16,TRAY_Y-5,184,31,'overlay',.7);for(let i=0;i<10;i++)R(g,16,TRAY_Y-3+i*3,184,.5,'rgba(40,26,12,.14)')});
  R(g,16,TRAY_Y-5,184,.8,'#bfa06c');R(g,16,TRAY_Y+25,184,1,'#4a341c');
  oval(g,268,128,24,10,'rgba(20,16,30,.36)');oval(g,266,125,22,9,'#6a4e2c');oval(g,266,124,20,8,'#96703e');g.strokeStyle='#b89058';g.lineWidth=.6;g.beginPath();g.ellipse(266,124,14,5.4,0,0,6.2832);g.stroke();
  poly(g,[230,116,244,113,248,124,236,128],'#6e4a2e');poly(g,[230,116,244,113,245,116,231,119],'#8a6a4a');
  pool(g,200,40,220,130,'#fff4d6',.1,'screen')},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.bolt10;if(!st)return;
  /* panels laid out on the cloth: tinted woven patches with soft horizontal weave sheen and inset chalk stitch marks stopping clear of corners */
  for(const p of PIECES){const q=st.at[p.id];if(!q)continue;const x=BX+q.x*CELL,y=BY+q.y*CELL,w=q.w*CELL,h=q.h*CELL;
    g.fillStyle=rgba(p.c,.44);g.fillRect(x,y,w,h);
    for(let j=2.5;j<h-2;j+=3)R(g,x+2,y+j,w-4,.5,rgba('#fff6dc',.1));
    R(g,x,y,w,.7,rgba('#fff6dc',.55));R(g,x,y,.7,h,rgba('#fff6dc',.42));R(g,x,y+h-1.1,w,1.1,'rgba(12,9,16,.55)');R(g,x+w-1.1,y,1.1,h,'rgba(12,9,16,.55)');
    for(let i=4;i<w-5;i+=5){R(g,x+i,y+1.8,2.2,.55,rgba('#fff6dc',.5));R(g,x+i,y+h-2.4,2.2,.55,rgba('#fff6dc',.38))}
    for(let j=4;j<h-5;j+=5){R(g,x+1.8,y+j,.55,2.2,rgba('#fff6dc',.45));R(g,x+w-2.4,y+j,.55,2.2,rgba('#fff6dc',.35))}}
  /* the panel in hand, shown where it would lie: under the pointer */
  const sel=PIECES.find(p=>p.id===st.sel);
  if(sel&&st.mx!=null&&!G.busy){const cx0=Math.floor((st.mx-BX)/CELL),cy0=Math.floor((st.my-BY)/CELL),[w,h]=st.turn[sel.id]?[sel.h,sel.w]:[sel.w,sel.h];
    if(cx0>=0&&cy0>=0&&cx0<COLS&&cy0<ROWS_B){const fits=cx0+w<=COLS&&cy0+h<=ROWS_B;g.fillStyle=rgba(fits?sel.c:'#b04a3a',.34+.08*Math.sin(t/260));g.fillRect(BX+cx0*CELL,BY+cy0*CELL,Math.min(w,COLS-cx0)*CELL,Math.min(h,ROWS_B-cy0)*CELL)}}
  /* the board: each panel small, as it is turned; one that lies on the cloth leaves only its place */
  for(const p of PIECES){const[w,h]=st.turn[p.id]?[p.h,p.w]:[p.w,p.h],x=p.tx,y=TRAY_Y;
    if(st.at[p.id]){R(g,x,y,w*TC,h*TC,'rgba(30,20,10,.3)');continue}
    R(g,x+1,y+1,w*TC,h*TC,'rgba(20,14,8,.5)');R(g,x,y,w*TC,h*TC,mix(CLOTH,p.c,.58));
    for(let j=1.5;j<h*TC-1;j+=2)R(g,x+1,y+j,w*TC-2,.4,rgba('#fff6dc',.12));
    R(g,x,y,w*TC,.6,rgba('#fff6dc',.55));R(g,x,y,.6,h*TC,rgba('#fff6dc',.4));R(g,x,y+h*TC-.7,w*TC,.7,'rgba(12,9,16,.45)');
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
 paint(g,v){const r=rng(1019),b=v==='b',WD=b?'#7c5e36':'#6e502c',rim=15;
  /* fine-grained planked table surface so captions below the scrolls read cleanly */
  g.fillStyle=lg(g,0,rim,0,144,[tint(WD,.08),WD,tint(WD,-.16)]);g.fillRect(0,0,320,144);
  for(const py of[54,96]){R(g,0,py,320,.7,'rgba(28,16,8,.38)');R(g,0,py+.7,320,.5,'rgba(220,180,126,.12)')}
  tex(g,'wood',.14,0,0,320,144,'overlay',.65);tex(g,'mott',.16,0,0,320,144,'overlay',.8);
  for(let i=0;i<30;i++)R(g,0,rim+2+i*4.3+r()*1.5,320,.5,r()<.5?'rgba(32,20,10,.14)':'rgba(220,180,126,.08)');
  /* those who listen, across the table: seen from above, draped shoulders and sculpted crowns over the table's edge */
  R(g,0,0,320,rim,'#231b15');R(g,0,rim,320,1.1,'#b08a58');R(g,0,rim+1.1,320,.9,'#5a4226');ao(g,0,rim+2,320,6,'t',.38);
  const men=b?[[57,96,11.2,8.8,'#9a8664','#b8a47c','#b88a62','#d0d0d0',1,'#d0d0d0'],[160,92,10.8,8.5,'#6e8c82','#4f6f7c','#c89868','#2a1a12',0,null],[263,96,11.2,8.8,'#8e7a56','#b09a6c','#b47e52','#4a3220',0,'#4a3220']]
    :[[57,96,11.2,8.8,'#7a6880','#b8a680','#a8703f','#8a8a8a',0,'#8a8a8a'],[160,92,10.8,8.5,'#b8b09c','#587482','#c69870','#5a4026',0,null],[263,96,11.2,8.8,'#9a705a','#7a8a5a','#c08c5c','#3a2a1c',0,'#3a2a1c']];
  men.forEach(([cx,w,hrx,hry,tu,cl,sk,ha,bald,bd],i)=>{const mr=rng(4001+i*77+(b?0:300)),hw=w/2,shY=rim-10,hy=rim-5.4;
    oval(g,cx+1.4,shY+3.4,hw+2,11,'rgba(14,10,8,.5)');
    /* contoured shoulders with draped tunic and mantle folds */
    const sh=[cx-hw,0,cx+hw,0,cx+hw*.92,rim-2.6,cx+hw*.46,rim-.8,cx-hw*.46,rim-.8,cx-hw*.92,rim-2.6];
    poly(g,sh);g.fillStyle=lg(g,cx-hw,0,cx+hw,0,[tint(tu,.14),tu,tint(tu,-.24)]);g.fill();
    clipTo(g,()=>poly(g,sh),()=>{
      for(let f=-2;f<=2;f++){const fx=cx+f*hw*.28;stroke(g,[fx-3,0,fx+2,rim-1.2],tint(tu,-.26),1.6);stroke(g,[fx-1.6,0,fx+3.4,rim-1.2],tint(tu,.16),.8)}
      poly(g,[cx-hw,0,cx-4,0,cx-7,rim-.4,cx-hw+2,rim-2.2]);g.fillStyle=lg(g,cx-hw,0,cx-4,0,[tint(cl,.16),cl,tint(cl,-.24)]);g.fill();
      for(let f=0;f<3;f++)stroke(g,[cx-hw*.78+f*11,0,cx-hw*.62+f*11,rim-1],tint(cl,-.26),1.3);
      ao(g,cx-hw,rim-5,w,5,'b',.3)});
    /* collar and neck */
    oval(g,cx,hy+1.8,hrx*.8,4.2,tint(tu,-.36));oval(g,cx,hy+1.2,hrx*.64,3.2,tint(sk,-.2));
    oval(g,cx+1,hy+2,hrx+.6,hry+.8,'rgba(18,12,8,.52)');
    if(bd){oval(g,cx,hy+hry*.62,hrx*.78,hry*.64,tint(bd,-.22));oval(g,cx-.5,hy+hry*.56,hrx*.68,hry*.56,bd);oval(g,cx-1.4,hy+hry*.52,hrx*.42,hry*.38,tint(bd,.14))}
    oval(g,cx,hy+hry*.32,hrx*.8,hry*.54,tint(sk,-.1));oval(g,cx-.6,hy+hry*.28,hrx*.68,hry*.44,sk);
    oval(g,cx,hy+hry*.84,1.9,1.4,tint(sk,-.06));R(g,cx-.9,hy+hry*.74,1.6,1.1,tint(sk,.16));
    /* tucked, naturally contoured ears */
    oval(g,cx-hrx+.2,hy+.5,1.1,2,tint(sk,-.04));oval(g,cx+hrx-.2,hy+.5,1.1,2,tint(sk,-.24));
    /* sculpted crown of the head with layered hair locks */
    g.fillStyle=rg(g,cx-2.4,hy-3.4,hrx*1.2,[tint(ha,.22),ha,tint(ha,-.3)]);g.beginPath();g.ellipse(cx,hy-1.1,hrx*.98,hry*.86,0,0,6.2832);g.fill();
    for(let j=0;j<14;j++){const a=(j/14)*6.2832+(mr()-.5)*.2,r0=.28+mr()*.45,lx=cx+Math.cos(a)*r0*hrx,ly=(hy-1.2)+Math.sin(a)*r0*hry*.72;
      stroke(g,[lx,ly,lx+Math.cos(a)*3.2,ly+Math.sin(a)*2.4],tint(ha,(-(lx-cx)/hrx-(ly-hy)/hry)*.22+(mr()-.5)*.12),1.3)}
    if(bald){oval(g,cx,hy+.3,hrx*.66,hry*.8,tint(sk,-.04));oval(g,cx-1.3,hy-.7,hrx*.46,hry*.56,tint(sk,.18))}});
  /* the steps down from the platform, at the near corner */
  poly(g,[250,144,320,104,320,144],'#4a3620');poly(g,[262,144,320,112,320,116,270,144],'#6a4e2c');poly(g,[284,144,320,124,320,128,292,144],'#6a4e2c');
  lightmap(g,320,b?'#c8c0b8':'#b8aeb0',l=>{pool(l,b?200:120,60,230,110,'#fff0d0',.8);pool(l,160,118,150,40,'#ffe8c0',.4)})},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.tab10;if(!st)return;const n=st.n,slots=SLOT[n];
  st.s.forEach((k,i)=>{const[x,w]=slots[i],shut=!k,cx0=x+w/2,seed=rng(1031+i*97+(PLACE[k]?PLACE[k].seed:0)),
    roll=(rx,rw)=>{const rr=rng(Math.round(rx)*19+i*7);g.fillStyle=lg(g,rx,0,rx+rw,0,['#785c36','#c8ae76','#f0e2b8','#d2ba84','#8a6c40','#5a4226']);g.fillRect(rx,SY-2,rw,SHH+4);
      for(let y=SY-1;y<SY+SHH+1;y+=2.2)R(g,rx,y,rw,1.1,rr()<.5?'rgba(110,82,38,.1)':'rgba(255,248,220,.1)');
      ao(g,rx,SY-2,rw,5,'t',.24,'#5a3c16');ao(g,rx,SY+SHH-3,rw,5,'b',.28,'#4a3012');
      R(g,rx,SY-2,rw,.8,'#f2e4b8');R(g,rx,SY+SHH+1.2,rw,.8,'#3a2a18')};
    R(g,x+2,SY+SHH+2,w-2,3,'rgba(20,12,6,.4)');
    if(shut){const m=ROLLW+5;roll(cx0-m,m);roll(cx0,m);return}
    /* the sheet, with subtle horizontal papyrus fiber strips and inner roll shade */
    const P0=PLACE[k],f=P0.at,lw=ROLLW+Math.round(8*f),rw=ROLLW+Math.round(8*(1-f)),sx=x+lw,sw=w-lw-rw;
    g.fillStyle=lg(g,0,SY,0,SY+SHH,['#f0e4c4','#e6d8b0','#d8c698']);g.fillRect(sx,SY,sw,SHH);
    for(let y=SY+1;y<SY+SHH-1;){const hh=1+seed()*2;R(g,sx,y,sw,hh,seed()<.5?'rgba(138,104,48,.07)':'rgba(255,248,222,.1)');y+=hh}
    ao(g,sx,SY,6,SHH,'l',.26,'#6e4c1e');ao(g,sx+sw-6,SY,6,SHH,'r',.26,'#6e4c1e');
    R(g,sx,SY,sw,.7,'#fff6dc');R(g,sx,SY+SHH-.8,sw,.8,'#a89468');
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
  lightmap(g,320,'#4a4460',l=>{nicheLight(l,185,53,36,30,'#ffc070',.95);pool(l,185,104,110,56,'#ffb060',.6);pool(l,60,110,60,40,'#5a5e90',.25)})},
 light:{amb:'#6e627a',lamps:[[185,96,110,'#7a5220']]},
 draw(g,t){flame(g,188.6,53.6,t)},front(){}};

/* ---------- The synagogue of Beroea ---------- */
/* A smaller house than the one in Thessalonica, at the foot of a mountain, which stands in its one wide window. The mountain is not
   named and nothing is said of it. The table stands at the back, under the window, and the scrolls lie open on it all day. */
ART.ber10={w:320,q:12,
 paint(g){const r=rng(1023),W='#e4d8b6',ST='#cabfa2';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:3,brick:'#b08a5a',t:.4});
  for(let i=18;i<320;i+=42)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.4,'#2a2030');
  /* the window: Mount Bermion layered in morning haze, olive-dotted slopes, and whitewashed foothills */
  R(g,116,20,88,54,tint(W,-.2));g.save();g.beginPath();g.rect(120,24,80,46);g.clip();
  sky(g,320,70,['#528ecd','#96bce0','#e4ecde']);cloud(g,148,30,24,3.2,r);cloud(g,186,34,16,2.2,r);
  ridge(g,120,200,70,x=>20+18*Math.exp(-Math.pow((x-144)/30,2))+12*Math.exp(-Math.pow((x-188)/24,2))+2*Math.sin(x/9),['#8ea4be','#a6b8c4']);
  const mt=x=>13+21*Math.exp(-Math.pow((x-172)/28,2))+3.2*Math.sin(x/6.5)+1.5*Math.sin(x/3.2);
  ridge(g,120,200,70,mt,['#8ca072','#74925a','#5e7e48']);
  /* sunlit limestone shoulders and olive-grove texture across the mountain flank */
  clipTo(g,()=>{g.beginPath();g.moveTo(120,70);for(let x=120;x<=200;x+=2)g.lineTo(x,70-mt(x));g.lineTo(200,70);g.closePath()},()=>{
    poly(g,[152,42,172,36,166,54,142,58],'rgba(232,226,188,.22)');poly(g,[174,36,196,46,200,66,172,58],'rgba(40,54,48,.22)');
    for(let i=0;i<28;i++){const gx=122+r()*76,gy=70-r()*mt(gx)*.82;foliage(g,gx,gy,2.6+r()*2.4,1.3+r()*.9,r()<.5?'#587842':'#7e9a5e',r,8)}});
  ridge(g,120,200,70,x=>7+5*Math.sin(x/12+1.2)+2*Math.sin(x/5),['#7a9658','#628046']);
  for(const[hx,hy,hw,hh]of[[128,63,5,3.5],[140,65,6,3.5],[156,64,5.5,3.5],[174,62,6,4],[189,65,5,3.2]]){
    R(g,hx,hy,hw,hh,'#ebe2c8');R(g,hx,hy-1,hw,1.2,'#b8603c');R(g,hx+hw-1.2,hy,1.2,hh,'#b8b09c')}
  for(const[cx,cy,ch]of[[135,66,6],[164,65,7],[182,66,6]])foliage(g,cx,cy-ch*.5,1.4,ch*.48,'#426036',r,7);
  comp(g,'screen',.16,()=>R(g,120,56,80,14,'#e4ecdc'));g.restore();
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
  JA=actor('jason10','Jason','#d8e0a0',112),PA=actor('parmenon10','Parmenon','#f0c890',104),BR=actor('brother10','brother_from_philippi','#c8d8b0',132),HO=actor('host10','brother_of_the_house','#d0c8b0',96),
  TD=actor('theodotos10','Theodotos','#e0e0f0',88),LM=actor('lysimachos10','Lysimachos','#d8c8e0',96),ME=actor('menandros10','Menandros','#b8d8e8',124),ST=actor('stratonike10','Stratonike','#e8b0d8',188),
  EU=actor('eupolemos10','Eupolemos','#f0e8c8',90),DO=actor('dorotheos10','Dorotheos','#c8e8b8',146),KL=actor('kleonike10','Kleonike','#a8e0d8',192),LT=actor('late10','man_back_from_his_flocks','#e0c8a0',108),
  E1=actor('esc101','brother_from_beroea','#c8d8b0',110),E2=actor('esc102','younger_brother','#d8e0b8',140);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 17:1-15, verse by verse, told by the narrator in paraphrase, each with its reference; and what Paul later wrote of these
   weeks. None of it is put into a mouth, and none of it stands in quotation marks: a paraphrase is never presented as a quotation
   (CONTRIBUTING section 1). It says "they" throughout, as the account does. */
const TOLD={
 v1:'they_took_the_road_acts_17_1',
 v2:'paul_went_in_to_them_acts_17_2',
 v3:'he_explained_and_showed_acts_17_3',
 v4:'some_of_them_acts_17_4',
 v5:'jealous_the_jews_acts_17_5',
 v6:'it_was_jason_acts_17_6',
 v7:'that_jason_had_acts_17_7',
 v8:'crowd_and_the_city_acts_17_8',
 v9:'only_when_jason_acts_17_9',
 v10a:'that_same_night_acts_17_10',
 v10b:'when_they_arrived_acts_17_10',
 v11:'in_beroea_the_jews_acts_17_11',
 v12:'many_of_them_acts_17_12',
 v13:'jews_of_thessalonica_acts_17_13',
 v14:'at_once_the_brothers_acts_17_14',
 v15a:'his_companions_did_acts_17_15',
 v15b:'they_left_again_acts_17_15',
 /* from his letters */
 t22:'paul_wrote_to_them_1_thessalonians_2_2',
 t29:'he_reminded_them_1_thessalonians_2_9',
 p416:'while_he_was_philippians_4_16',
 t217:'some_months_later_1_thessalonians_2_17'};
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
 ps16:{k:'ps',ref:'psalm_16_10',gist:'davids_hope_jehovah_would',cap:'not_abandoned_to_the_grave',at:.1},
 ps22m:{k:'ps',ref:'psalm_22_7_8',gist:'everyone_who_sees_me_jeers',cap:'mocked_for_his_trust',at:.15},
 ps22l:{k:'ps',ref:'psalm_22_18',gist:'they_share_out_my_garments',cap:'lots_for_his_clothing',at:.16},
 ps34:{k:'ps',ref:'psalm_34_20',gist:'every_bone_of_the_righteous',cap:'not_one_bone_broken',at:.23},
 ps69:{k:'ps',ref:'psalm_69_21',gist:'when_i_was_thirsty_they',cap:'vinegar_for_his_thirst',at:.46},
 ps118:{k:'ps',ref:'psalm_118_22',gist:'it_is_the_chief_cornerstone',cap:'stone_thrown_aside',at:.78},
 is45:{k:'pr',ref:'isaiah_45_1',gist:'jehovah_speaks_to_his_anointed',cap:'his_anointed_one',at:.68},
 is50:{k:'pr',ref:'isaiah_50_6',gist:'he_let_those_who_beat_him',cap:'struck_and_spat_on',at:.76},
 is533:{k:'pr',ref:'isaiah_53_3',gist:'he_was_despised_and_men',cap:'despised_counted_as_nothing',at:.8},
 is535:{k:'pr',ref:'isaiah_53_5',gist:'our_transgression_is_why',cap:'pierced_because_of_our_transgression',at:.81},
 is537:{k:'pr',ref:'isaiah_53_7',gist:'he_never_opened_his_mouth',cap:'silent_as_a_sheep',at:.82},
 is539:{k:'pr',ref:'isaiah_53_9',gist:'though_he_had_done_nothing',cap:'grave_with_the_rich',at:.83},
 ex12:{k:'law',ref:'exodus_12_46',gist:'of_the_passover_lamb_you',cap:'no_bone_of_the_lamb_broken',at:.27}};
Object.keys(PLACE).forEach((k,i)=>mk10(PLACE[k],i+1));
/* EV: what was handed on to Paul (1 Corinthians 15:3), as his tablets hold it: what was done to Jesus, and who saw him afterwards. Each
   is a note in his own words. The references are for the player: nothing on the table has a number. */
const EV={
 wine:{row:'V',ref:'john_19_28_29',gist:'he_said_that_he_was_thirsty',cap:'sour_wine_at_his_mouth'},
 mock:{row:'M',ref:'matthew_27_41_43',gist:'as_he_hung_there_the_chief',cap:'mocked_by_the_chief_priests'},
 struck:{row:'S',ref:'matthew_26_67',gist:'he_was_spat_on_in_the_face',cap:'spat_on_and_struck'},
 stone:{row:'R',ref:'acts_4_10_11',gist:'rulers_of_the_people_the_builders',cap:'refused_by_the_rulers'},
 pierce:{row:'P',ref:'john_19_33_34',gist:'soldiers_found_him_already',cap:'legs_unbroken_side_pierced'},
 raised:{row:'G',ref:'n1_corinthians_15_4_8',gist:'he_was_buried_and_raised',cap:'raised_and_seen_by_many'},
 lots:{row:'L',ref:'john_19_23_24',gist:'soldiers_shared_out_his_outer',cap:'lots_cast_by_the_soldiers'},
 silent:{row:'Q',ref:'matthew_27_12_14',gist:'charge_after_charge_came',cap:'no_answer_to_his_accusers'},
 tomb:{row:'T',ref:'matthew_27_57_60',gist:'rich_man_joseph_of_arimathea',cap:'rich_mans_new_tomb'}};
Object.keys(EV).forEach((k,i)=>mk10(EV[k],i+20));
const SHUT={cap:'rolled_shut'},CLOSED={cap:'tablets_closed'};
/* ROWS: which places belong beside which line of the tablets. A row holds when every scroll that has a place in it lies open at that
   place, every other scroll is rolled shut, and the tablets show its line. Each row is one that the Study Edition's marginal references
   make: at Psalm 69:21; at Isaiah 53:3 and Psalm 22:8; at Isaiah 50:6; at Psalm 118:22 and Isaiah 53:3; at John 19:36, 37; at
   1 Corinthians 15:4; at Psalm 22:18; at Isaiah 53:7; at Isaiah 53:9. */
const ROWS={V:{ps:'ps69'},M:{ps:'ps22m',pr:'is533'},S:{pr:'is50'},R:{ps:'ps118',pr:'is533'},P:{ps:'ps34',pr:'is535',law:'ex12'},G:{ps:'ps16'},L:{ps:'ps22l'},Q:{pr:'is537'},T:{pr:'is539'}};
/* what each scroll holds, in its own order, in each city; and the lines of the tablets */
const LISTS={t:{ps:['ps16','ps22m','ps34','ps69','ps118'],pr:['is50','is533','is535']},
  b:{law:['ex12'],pr:['is45','is50','is533','is535','is537','is539'],ps:['ps16','ps22m','ps22l','ps34','ps69','ps118']}},
  KINDS={t:['ps','pr'],b:['law','pr','ps']},LINES={t:['wine','mock','struck','stone','pierce','raised'],b:['wine','mock','struck','stone','pierce','raised','lots','silent','tomb']},
  SCROLL={ps:'scroll_of_the_psalms',pr:'scroll_of_the_prophets',law:'scroll_of_moses'};

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
const quote=p=>T('text_ref',{text:T(p.gist),ref:T(p.ref)});

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
const LAID='it_is_laid_out_every_panel';
/* a panel on the board: taken in hand; taken again, it is turned; one that lies on the cloth is lifted off it */
async function board(p){const st=boltSt();if(F.laid)return say(P,LAID,TH);
  if(st.at[p.id]){delete st.at[p.id];st.sel=p.id;SFX.click();return}
  if(st.sel===p.id&&p.w!==p.h){st.turn[p.id]=!st.turn[p.id];SFX.click();return}
  st.sel=p.id;SFX.click()}
/* the cloth: the panel in hand is laid with its corner under the pointer; with empty hands, a panel is lifted off */
async function onBolt(){const st=boltSt();if(F.laid)return say(P,LAID,TH);
  const cx0=st.mx==null?-1:Math.floor((st.mx-BX)/CELL),cy0=st.my==null?-1:Math.floor((st.my-BY)/CELL),ok=cx0>=0&&cy0>=0&&cx0<COLS&&cy0<ROWS_B,under=ok?cover()[cy0*COLS+cx0]:null;
  if(!st.sel){if(under){delete st.at[under];st.sel=under;SFX.click();return}
    return say(P,'first_a_panel_from_the_board',TH)}
  const p=PIECES.find(q=>q.id===st.sel),[w,h]=dims(p),why=ok?cannot(p,cx0,cy0,w,h):'edge';
  if(why){SFX.nope();return say(P,why==='edge'?'that_would_hang_over_the_edge':why==='over'?'not_there'
    :'not_across_the_thin_strip',TH)}
  st.at[p.id]={x:cx0,y:cy0,w,h};st.sel=null;noise({d:.12,v:.08,f:2600,q:1.2});
  if(!PIECES.every(q=>st.at[q.id]))return;
  if(!spare())return say(P,'every_panel_has_a_place',TH);
  F.laid=1;SFX.good();await say(P,'measured_twice');codeBtn()}
async function cutBolt(){if(F.cutd)return;if(!F.laid)return say(P,'not_before_every_panel_has_its_place',TH);
  SFX.cut();await narr('knife_followed_the_cord_panel_after_panel',{dur:3800});F.cutd=1;addItem('panels10');SFX.good();
  if(G.room!=='yard10')await step('yard10');return afterCut()}
const boltWith=id=>id==='knife'?cutBolt():id==='awl'||id==='thread'?say(P,'nothing_is_sewn_before',TH):false;
async function toBolt(){if(F.cutd)return;await step('bolt10');if(!F.laid&&!G.seenBolt){G.seenBolt=1;
  await say(P,'twelve_cubits_by_four_and_the_third',TH);
  await say(P,'what_is_left_over_i_want',TH);codeBtn()}}
/* the pointer over the cloth: where a panel in hand would lie (the engine does not hand a click's place to a hotspot) */
if(!window.BOLT10){window.BOLT10=1;const vp10=$('#view'),at=e=>{if(G.room==='bolt10'&&G.bolt10){const[x,y]=evPos(e);G.bolt10.mx=x;G.bolt10.my=y}};
  for(const t of['mousemove','pointerdown','click'])vp10.addEventListener(t,at,true)}

/* ============ JASON'S COURTYARD: night and day ============ */
const ROAD1=[['philippi','amphipolis','new'],['amphipolis','apollonia','new'],['apollonia','thessalonica','new']],
  LAB1={philippi:{lab:'r'},amphipolis:{lab:'l',dy:-4.4},apollonia:{lab:'l',dy:-3.4},thessalonica:{lab:'l',dx:-4,dy:5.5}},
  ROAD2=[['thessalonica','beroea','new']],LAB2={thessalonica:{lab:'t',dx:-7}},
  ROAD3=[['thessalonica','beroea'],['beroea','seaward','new'],['seaward','athens','new sea']],LAB3={thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:6,dy:7.2}};
async function afterCut(){await say(P,'six_panels_and_not_a_hand');
  await say(SI,'tomorrow_is_the_sabbath_paul');codeBtn()}
async function toSabbath(){
  if(!F.cutd)return say(P,'not_yet_parmenon');
  if(F.r2&&!F.sewn)return say(P,'not_with_the_panels_lying');
  if(F.r3&&!F.sold)return say(P,'parmenon_comes_for_his_tent_this_morning');
  await say(P,sab()===1?'it_is_the_sabbath_said':'sabbath_again');
  await fade(1,500);await come('syn10');return sabIntro()}
/* the seams: sewn in the nights between the first Sabbath and the second */
async function sew(){if(!has('panels10'))return say(P,F.sewn?'it_is_sewn_said':'there_is_nothing_on_the_bench');
  if(!F.r2)return say(P,'stitch_by_stitch_every_evening');
  SFX.sew();await fade(1,600);await narr('he_sewed_that_night_and_the_three',{dur:9500});
  delItem('panels10');addItem('tent10',1);F.sewn=1;await come('yard10',700);SFX.good();
  await say(P,'done_the');
  await say(JA,'people_have_begun_to_ask');codeBtn()}
/* the tent is handed over, and paid for; and Philippi sends for the second time */
async function sell(){if(F.sold)return;await say(P,'your_tent_parmenon');delItem('tent10');SFX.pick();
  await say(PA,'it_is_here');
  await say(P,'for_the_tent_the_price');
  await say(PA,'i_shall_be_at_that_synagogue');
  F.sold=1;SFX.good();await walk(PA,24,118);PA.room=null;
  place(BR,'yard10',28,118,1);await walk(BR,130,129);await tell('p416');
  await say(BR,'from_philippi_again_paul');
  await say(P,'twice_said');
  await walk(BR,24,118);BR.room=null;codeBtn()}

/* ============ THE SYNAGOGUE OF THESSALONICA: three Sabbaths ============ */
/* On three Sabbaths he reasoned with them from the Scriptures (Acts 17:2, 3). The verse has three parts, and each Sabbath takes one:
   that the Christ had to suffer; that he had to rise; that this Jesus is the Christ. A hearer says what he cannot see, and the player
   sets the table until scroll, scroll and tablets say one thing. Whoever believes and whoever grows jealous is told as the account
   tells it (17:4, 5): no setting of the scrolls wins anyone or loses anyone. The hearers and what they ask are invented. */
const WANT=()=>sab()===1?(F.r1?'M':'V'):sab()===2?'G':'P',ASKER=()=>({V:LM,M:ME,G:LM,P:ME})[WANT()],DONE={V:'r1',M:'r2',G:'r3',P:'r4'},
  ASK={V:'you_say_that_when_he_hung',
    M:'they_mocked_him_you_told',
    G:'let_him_suffer_then_it',
    P:'many_men_have_been_mocked'},
  NUDGE={V:'he_asked_about_the_sour_wine',M:'he_asked_about_the_mockery',G:'he_asked_whether_a_dead',P:'he_asked_what_marks_this_one_man'};
async function sabIntro(){const n=sab();if(G.sab10===n)return;G.sab10=n;
  if(n===1){await tell('v2');
    await say(TD,'you_have_sat_among_us_and_listened');
    await say(P,'men_of_israel_and_you_who');
    await say(LM,'to_suffer');await say(LM,ASK.V);
    await say(P,'it_is_and',TH)}
  else if(n===2){await tell('v3');await say(LM,'i_have_turned_it_over_all');await say(LM,ASK.G);
    await say(P,'he_died_and_he_was_buried')}
  else{await narr('on_the_third_sabbath_nobody',{dur:5200});await say(ME,'one_thing_more_said');await say(ME,ASK.P);
    await say(P,'what_was_done_with_him')}
  codeBtn()}
const again=()=>say(ASKER(),ASK[WANT()]);
/* the Sabbath is over: back to the courtyard */
async function sabEnd(n){await fade(1,600);G.sab10=0;await come('yard10',700);
  if(n===1){await narr('by_day_he_sewed_and_talked',{dur:5200});await tell('t29');
    place(BR,'yard10',28,118,1);await walk(BR,130,129);
    await say(BR,'paul_from');
    await say(P,'from_philippi');
    await say(BR,'they_said_that_you_would_say_so_i');
    await walk(BR,24,118);BR.room=null;
    await say(JA,'tonight_at_least_you_will_sleep');
    await say(P,'tonight_i_sew_jason')}
  else{await narr('in_the_week_that_followed',{dur:5600});
    await say(PA,'is_it_done_tentmaker')}
  codeBtn()}
/* after the third Sabbath: who believed, and who grew jealous; then the uproar, told and not shown */
async function third(){await fade(1,500);await come('syn10');await tell('v4');
  await say(ME,'i_have_no_more_questions');
  await say(ST,'my_household_will_want_to_hear_this_all');
  await say(LM,'look_at_the_benches_tentmaker');
  await narr('some_counted_who_had_gone_over',{dur:4600});
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
async function endOfScroll(){await say(TD,'wind_on_like_that_tentmaker');
  await say(P,'i_know_whose_hands_will_do_it');treasure()}
/* leaf: the tablets are turned to their next line; after the last they are shut */
async function leaf(){const st=tabSt(),L=LINES[st.c],at=st.t?L.indexOf(st.t)+1:0,to=(at+1)%(L.length+1);st.t=to?L[to-1]:null;SFX.click()}
const readPlace=i=>{const k=tabSt().s[i];return k?say(PC(),quote(PLACE[k])):say(PC(),'it_is_rolled_shut',TH)},
  readLeaf=()=>{const k=tabSt().t;return k?say(P,quote(EV[k])):say(P,'my_tablets_are_shut',TH)};
/* judge: does the table hold? A full row; or the first scroll that says another thing than the tablets; or a scroll that is missing */
function judge(){const st=tabSt(),open=st.s.filter(Boolean);if(!st.t)return{closed:1,open:open.length};
  const ev=EV[st.t],row=ROWS[ev.row];
  for(let i=0;i<st.n;i++){const k=st.kinds[i],p=st.s[i];if(p&&p!==row[k])return{bad:k,a:PLACE[p].cap,b:ev.cap}}
  if(!open.length)return{none:1};
  for(let i=0;i<st.n;i++){const k=st.kinds[i];if(row[k]&&!st.s[i])return{part:k}}
  return{row:ev.row}}
async function lay(){if(tim())return say(TP,'their_hands_know_the_way',TH);
  const st=tabSt(),j=judge();if(st.c==='b')return layB(st,j);
  const A=ASKER(),want=WANT();
  if(j.closed)return say(P,'my_tablets_are_shut_said',TH);
  if(j.none)return say(P,'both_scrolls_are_rolled_shut',TH);
  if(j.bad)return say(A,T(j.bad==='ps'?'psalm_lies_open_at_one'
    :'prophet_lies_open_at_one_place_a_your_tablets',{a:T(j.a),b:T(j.b)}));
  if(j.part)return say(A,j.part==='pr'?'one_witness_and_that_one_david':'one_witness_and_that_one_the_prophet');
  if(j.row!==want){await say(A,F[DONE[j.row]]?'you_showed_us_that_and_it_holds':'that_holds_tentmaker_and_i_grant_it');return say(P,NUDGE[want],TH)}
  chord10();return HOLDS[want]()}
/* what follows when the row that was asked for lies on the table */
const HOLDS={
  V:async()=>{await say(P,quote(PLACE.ps69));await say(P,quote(EV.wine));
    await say(P,'david_wrote_it_long_before');
    await say(LM,'it_is_written');F.r1=1;SFX.good();tabSt();
    await say(ME,'greater_one');await say(ME,ASK.M);codeBtn()},
  M:async()=>{await say(P,quote(PLACE.ps22m));await say(P,quote(PLACE.is533));await say(P,quote(EV.mock));
    await say(P,'psalm_has_the_very_words');
    await say(ME,'david_and_isaiah_saying_one_thing');
    await say(TD,'day_is_nearly_over_come');F.r2=1;SFX.good();return sabEnd(1)},
  G:async()=>{await say(P,quote(PLACE.ps16));await say(P,quote(EV.raised));
    await say(LM,'you_q');
    await say(P,'on_the_road_to_damascus_said');
    await say(ST,'you_are_not_telling_us');F.r3=1;SFX.good();return sabEnd(2)},
  P:async()=>{await say(P,quote(PLACE.ps34));await say(P,quote(PLACE.is535));await say(P,quote(EV.pierce));
    await say(P,'not_a_bone_broken_and_yet_pierced');
    await say(ME,'no_man_chooses_what_soldiers');
    await say(P,'no_and');F.r4=1;SFX.good();return third()}};
async function toTable(){if(tim())return say(TP,'table_is_theirs',TH);
  if(inSyn()&&!G.sab10&&!F.r4)G.sab10=sab();await step('table10')}
const fromTable=()=>step(F.gone?'ber10':'syn10');

/* ============ A HOUSE BY NIGHT: the security is Jason's ============ */
/* The rulers took security from Jason and the others (Acts 17:9), and that same night the brothers sent Paul and Silas away (17:10).
   In Philippi Paul stayed in a prison until the magistrates came themselves (Chapter Nine). Every choice that was right there is
   offered here, and he sets each aside, because here another man would pay for it. Bearing Thorough Witness (chapter 17, paragraph 13)
   draws the line between boldness and recklessness at this point. Acts does not say what the security was, or what it bound Jason to:
   the game says "security" and no more. Where the two were when the house was stormed, it does not say either. */
async function nightIntro(){AU.mood='night';
  await narr('night_found_paul_and_silas',{dur:5600});
  place(JA,'night10',44,118,1);SFX.door();await walk(JA,P.x-30,P.y+2);
  await say(JA,'they_came_to_my_house_for_you');
  await say(SI,'before_whom',{to:JA});
  await say(JA,'city_rulers');
  await say(P,'jason_has_pledged_what',TH);codeBtn()}
async function jasonTalk(){if(F.gone)return;
  await think('jason_has_given_security_for_us',[
    {q:'stand_before_the_city_rulers',no:'in_philippi_my_own_back'},
    {q:'stay_in_this_house_and_teach',no:'whoever_came_to_this_door'},
    {q:'go_back_to_my_bench',no:'true_and_of_no_use_to_jason'},
    {q:'go_tonight_as_the_brothers_ask',ok:1}]);
  await say(P,'we_go_tonight_jason');
  await say(JA,'i_did_not_want_to_be_the_one');
  await say(P,'you_said_it_to_the_city');
  await say(JA,'you_told_us_that_it_would');
  await say(P,'for_all_of_us');
  await say(TI,'i_have_the_pouch_and_the_tablets');
  await say(HO,'two_of_us_will_take_you');
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
const POSE={b2a:[KL,'my_brother_read_to_me_last'],
  b2b:[DO,'here_paul_a_little_further'],
  b2c:[EU,'one_line_further_still']},
  ASKB1='yesterday_you_said_that_not',
  ASKB3='paul_i';
const asker=()=>bday()===1?EU:bday()===2?POSE[find().f][0]:DO,askB=()=>bday()===1?ASKB1:bday()===2?POSE[find().f][1]:ASKB3;
async function berIntro(){await tell('v10b');
  await say(P,'men_of_beroea_the_christ');
  await say(EU,'you_say_that_all_this_is_written');
  await narr('nobody_here_asked_him_to_prove_it',{dur:5600});
  await fade(1,600);await narr('next_morning_the_scrolls',{dur:5200});await come('ber10',700);
  await say(EU,ASKB1);codeBtn()}
const againB=()=>say(asker(),askB());
async function layB(st,j){const d=bday(),cy=st.s.includes('is45'),A=asker();
  if(cy){if(st.t)return say(P,'no_i',TH);
    if(d===3)return cyrus();return say(P,'that_line_names_its_own_man',TH)}
  if(d===3)return say(DO,'you_have_wound_it_away_paul');
  const want=d===1?'P':find().row;
  if(j.closed)return say(P,'my_tablets_are_shut_they',TH);
  if(j.none)return say(P,'every_scroll_is_rolled_shut',TH);
  if(j.bad)return say(A,T(j.bad==='law'?'moses_lies_open_at_one'
    :j.bad==='pr'?'prophet_lies_open_at_one'
    :'the_psalm_lies_open_at_one',{a:T(j.a),b:T(j.b)}));
  if(j.part)return say(A,j.part==='law'?'moses_is_rolled_shut':j.part==='pr'?'prophet_is_rolled_shut':'psalm_is_rolled_shut');
  if(j.row!==want)return say(A,'that_holds_we_have_looked_at_it');
  chord10();
  if(want==='P'){await say(P,quote(PLACE.is535));await say(P,quote(EV.pierce));
    await say(EU,'lamb_a_righteous_man_and_a_servant');
    await say(P,'one_afternoon_outside_jerusalem');
    await say(DO,'i_shall_not_sleep_tonight');
    F.b1=1;SFX.good();await step('ber10');await tell('v11');
    await fade(1,600);await narr('next_day_they_brought_what',{dur:5200});await come('ber10',700);return againB().then(codeBtn)}
  const f=find();await say(P,quote(EV[st.t]));
  if(f.f==='b2a'){await say(KL,'for_a_garment');await say(P,'they_did_not_know_that_they')}
  else if(f.f==='b2b'){await say(DO,'not_one_word');await say(P,'he_could_have')}
  else{await say(EU,'new_tomb');await say(P,'even_that')}
  F[f.f]=1;SFX.good();
  if(find()){tabSt();await againB();codeBtn();return}
  await step('ber10');await fade(1,600);await narr('on_the_day_after_that_dorotheos',{dur:5600});await come('ber10',700);await say(DO,ASKB3);codeBtn()}
/* the line that names another man */
async function cyrus(){await say(P,'read_the_line_to_its_end_dorotheos');await say(DO,quote(PLACE.is45));await say(DO,'cyrus_said');
  await say(P,'jehovah_gave_that_title');
  await say(P,'i_have_nothing_to_lay_beside');
  await say(DO,'i_was_wrong');
  await say(P,'you_read_on_to_the_end');
  await say(EU,'he_would_have_let_you_have');
  F.b3=1;SFX.good();await step('ber10');await tell('v12');return strangers()}

/* ============ WITHOUT PAUL ============ */
/* The Jews of Thessalonica came and stirred up the crowds (Acts 17:13), and the brothers sent Paul to the sea at once; Silas and
   Timothy stayed (17:14). The game stays with them: the button that has always led back to Paul is grey, and the player is Timothy,
   who has known the holy writings from infancy (2 Timothy 3:15). A man who was away asks what the others asked on the first day, and
   the answer is to step back: the Beroeans set all three scrolls themselves. The scene is invented. */
async function strangers(){AU.mood='tense';place(E1,'ber10',40,118,1);SFX.door();await walk(E1,...spot(E1,P.x-30,P.y+2));
  await say(E1,'paul_there_are');
  await tell('v13');
  await say(EU,'to_the_sea_and_tonight');
  await say(SI,'timothy_and_i_stay_paul');
  await say(P,'stay_both_of_you');
  await tell('v14');await fade(1,700);await narr('he_went_out_by_the_other',{dur:5600});
  F.sea=1;P.room=null;place10('ber10');playAs(TP);enterRoom('ber10',TP.x,TP.y,TP.dir);AU.mood='tense';codeBtn();await fade(0,700);
  await narr('paul_was_on_the_road_to_the_sea',{dur:6200});
  SFX.door();await walk(LT,130,126);LT.dir=1;
  await say(LT,'five_days_with_the_flocks');
  await say(LT,'you_young_man_you_came_with_him');codeBtn()}
async function own(){if(F.own)return;
  await think('he_is_asking_me',[
    {q:'set_the_table_for_him_myself',no:'i_could'},
    {q:'tell_him_to_wait_until',no:'paul_is_not_coming_back_this_month'},
    {q:'ask_eupolemos_to_show_him',ok:1}]);
  await say(TP,'eupolemos');
  await say(EU,'i_said',{to:LT});
  await narr('old_man_put_his_hands_on_the_rollers',{dur:6200});chord10();
  await say(EU,'lamb_of_which_no_bone_may');
  await say(TP,quote(EV.pierce));
  await say(LT,'three_scrolls');
  await narr('outside_strangers_were_shouting_in_the_street',{dur:7000});
  F.own=1;SFX.good();
  await fade(1,700);playAs(P);TP.room=null;
  try{await need('map');await SHARED.map.journey(ROAD3,{view:'west',labels:LAB3,speed:2400});await tellMap('v15a')}catch(e){console.error(e)}
  await fade(1,600);G.scene=null;F.ath=1;await come('quay10',800);
  await narr('they_had_brought_him_the_whole_way',{dur:6200});
  await say(E1,'this_is_the_harbor_of_athens_paul');codeBtn()}

/* ============ THE QUAY: carried by mouth ============ */
/* They left with instructions that Silas and Timothy should come to him as quickly as possible (Acts 17:15). The player puts the
   message together from its parts. Everything else that could be added is true and kind, and makes it longer and less sure. That it
   was spoken and not written, and the quay, are invented. */
const MSG=[{k:'who',q:'it_is_for_silas_and_timothy',need:1},{k:'what',q:'they_are_to_come_to_me',need:1},{k:'soon',q:'as_quickly_as_they_can',need:1},
  {k:'greet',q:'greet_eupolemos_dorotheos'},{k:'tell',q:'tell_the_brothers_in_thessalonica'}];
async function message(){if(F.msg)return;const got=new Set();
  await say(P,'it_has_to_cross_the_sea',TH);
  for(;;){const av=MSG.filter(m=>!got.has(m.k)),i=await choose(av.map(m=>m.q).concat(got.size?['that_is_the_whole_message']:[]),{keep:got.size?1:0});
    if(i<av.length){got.add(av[i].k);await say(P,av[i].q);continue}
    const miss=MSG.find(m=>m.need&&!got.has(m.k));
    if(miss){await say(E1,miss.k==='who'?'for_whom_is_it_paul':miss.k==='what'?'what_are_they_to_do':'when_when_the_brothers');continue}
    if(got.size>3){await say(E2,'silas_and_timothy_are_to_come');
      await say(P,'too_much_for_one_memory',TH);got.delete('greet');got.delete('tell');continue}
    break}
  await say(E1,'silas_and_timothy_are_to_come_said');
  await say(P,'that_is_all_of_it_said');
  F.msg=1;SFX.good();await tell('v15b');return finale()}
async function finale(){AU.mood='rest';
  await narr('ship_turned_round_the_same_day',{dur:7600});
  endScreen({title:'is_it_so_q',text:'in_one_city_he_laid_the_scriptures',
    based:'based_on_acts_17_1_15_1',
    go:'click_to_continue_to_chapter_eleven',code:['chapter_eleven_code_code',codeOf(11,0)]});
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
  panels10:{name:'cut_panels',look:'six_panels_of_goat_hair'},
  tent10:{name:'traveling_tent',look:'tent_for_a_man_who_trades'}});
const sewWith=()=>sew();
Object.assign(COMBO,{'awl+panels10':sewWith,'panels10+thread':sewWith,'knife+panels10':()=>say(P,'they_are_cut_and_cut_right'),
  'awl+tent10':()=>say(P,'it_is_sewn_and_it_will_hold'),'tent10+thread':()=>say(P,'it_is_sewn_and_it_will_hold'),'knife+tent10':()=>say(P,'i_do_not_cut_what_i_have')});

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.yard10={space:.9,walk:[16,304,114,138],get mood(){return yardV()==='n'?'night':'calm'},amb:()=>yardV()==='n'?{crickets:.5,fire:.15}:{crowd:.2,birds:.4,hammer:.15},hs:[
  {name:'gate_to_the_street',x:18,y:46,w:32,h:58,wx:46,wy:116,dir:-1,exit:toSabbath,
    look:()=>say(P,F.cutd?'gate_and_the_street':'gate_to_the_street_beyond')},
  {name:'water_jar',x:55,y:88,w:18,h:20,wx:82,wy:116,dir:-1,look:'great_jar_of_water_in_the_shade',use:'i_drink_a',pickup:'it_is_jasons_and_it_stands'},
  {name:'shuttered_window',x:102,y:38,w:20,h:18,wx:112,wy:115,look:'window_of_the_house_shuttered',open:'it_is_jasons_window_and_he'},
  {name:'bolt_of_goat_hair_cloth',x:74,y:104,w:132,h:9,wx:140,wy:116,def:'use',vis:()=>!F.cutd,use:toBolt,useWith:boltWith,
    look:()=>say(P,F.laid?'laid_out_panel_by_panel':'one_bolt_twelve_cubits'),
    pickup:'it_is_pegged_out_and_it'},
  {name:'workbench',x:176,y:78,w:70,h:26,wx:210,wy:115,def:'use',look:()=>say(P,F.sold?'bench_is_bare':F.sewn?'bench_and_parmenons_tent_on_it_rolled':'bench_against_the_wall'),
    use:sew,useWith:id=>id==='panels10'||id==='awl'||id==='thread'?sew():false,pickup:'bench_is_not_carried_about'},
  {name:'lamp_niche',x:202,y:42,w:18,h:20,wx:190,wy:115,dir:1,look:()=>say(P,yardV()==='n'?'lamp_over_the_bench':'lamp_in_its_niche_over_the_bench'),
    pickup:'it_belongs_over_the_bench',use:()=>say(P,yardV()==='n'?'it_burns':'not_by_day')},
  {name:'door_of_the_house',x:266,y:46,w:32,h:58,wx:282,wy:115,dir:1,look:'door_of_jasons_house',
    open:()=>say(P,yardV()==='n'?'house_is_asleep':'not_now_the_day'),
    use:()=>say(P,yardV()==='n'?'house_is_asleep':'not_now_the_day')}]};
ROOMS.bolt10={space:.8,walk:NOW,mood:'calm',amb:{birds:.4,crowd:.15},hs:[
  {name:'bolt_of_goat_hair_cloth',x:BX,y:BY,w:COLS*CELL,h:ROWS_B*CELL,wx:160,wy:236,def:'use',use:onBolt,useWith:boltWith,
    look:()=>say(P,F.laid?LAID:'twelve_cubits_by_four'),pickup:'it_is_pegged_out_and_it_said'},
  {name:'measuring_cord',x:BX,y:BY-10,w:COLS*CELL,h:8,wx:160,wy:236,look:'my_cord_knotted_to_the_cubit',pickup:'it_lies_where_i_need_it',use:'it_has_measured'},
  ...PIECES.map(p=>({name:p.name,x:p.tx-2,y:TRAY_Y-3,w:Math.max(p.w,p.h)*TC+4,h:28,wx:160,wy:236,def:'use',use:()=>board(p),
    look:()=>say(P,{roof:'roof_four_cubits_by_four',long:'long_wall_six_cubits_by_two',end:'end_wall_three_cubits_by_two',flap:'door_flap_two_cubits_by_two',
      g1:'gusset_two_cubits_by_one',g2:'other_gusset_two_cubits_by_one'}[p.id]),pickup:()=>board(p)})),
  {name:'stool',x:228,y:106,w:86,h:36,wx:160,wy:236,exit:()=>step('yard10'),look:'my_stool_and_my_pouch_beside_it'}]};
ROOMS.syn10={space:1.5,walk:[16,304,112,137],mood:'still',amb:{crowd:.12},hs:[
  {name:'door_to_the_street',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(P,'not_while_a_man_is_waiting'),look:'door_to_the_street_said'},
  {name:'benches',x:56,y:84,w:170,h:20,wx:120,wy:113,look:'benches_of_stone_along_the_wall',use:'i_have_sat_and_listened'},
  {name:'high_windows',x:82,y:22,w:156,h:22,wx:160,wy:113,look:'three_windows_high_in_the_wall'},
  {name:'lamp_niche',x:58,y:50,w:18,h:22,wx:80,wy:113,look:'a_lamp_in_its_niche_not_lit',pickup:'it_belongs_to_this_house'},
  {name:'chest_of_the_scrolls',x:232,y:66,w:38,h:38,wx:228,wy:114,dir:1,look:'chest_of_the_scrolls_under_its_blue',
    open:'it_is_not_mine_to_open_said',pickup:'it_is_carried_in_by_two'},
  {name:'reading_table',x:118,y:92,w:84,h:29,wx:160,wy:124,def:'use',use:toTable,look:'reading_table_on_its_platform',pickup:'it_stands_where_a_whole'}]};
/* the table: each scroll has its two rollers and its open column; then the tablets, those who listen, and the way down */
const tabHs=n=>{const out=[];for(let i=0;i<n;i++){const live=()=>atTable()&&tabSt().n===n,nm=()=>SCROLL[tabSt().kinds[i]],[x,w]=SLOT[n][i];
    out.push({get name(){return T('scroll_left_roller',{scroll:T(live()?nm():SCROLL.ps)})},x,y:SY-4,w:22,h:SHH+8,wx:160,wy:236,def:'use',vis:live,use:()=>wind(i,-1),look:()=>readPlace(i),pickup:'scroll_of_this_house_is'},
      {get name(){return T(live()?nm():SCROLL.ps)},x:x+22,y:SY-4,w:w-44,h:SHH+8,wx:160,wy:236,def:'look',vis:live,look:()=>readPlace(i),use:()=>readPlace(i),pickup:'scroll_of_this_house_is'},
      {get name(){return T('scroll_right_roller',{scroll:T(live()?nm():SCROLL.ps)})},x:x+w-22,y:SY-4,w:22,h:SHH+8,wx:160,wy:236,def:'use',vis:live,use:()=>wind(i,1),look:()=>readPlace(i),pickup:'scroll_of_this_house_is'})}return out};
ROOMS.table10={space:1.5,walk:NOW,mood:'table',amb:{},hs:[
  ...tabHs(2),...tabHs(3),
  {name:'my_tablets_on_the_table',x:104,y:90,w:112,h:44,wx:160,wy:236,def:'use',vis:()=>atTable()&&tabSt().has,use:leaf,look:readLeaf,pickup:'they_lie_where_i_need_them'},
  {get name(){return F.gone?'beroeans_at_the_table':'men_on_the_benches'},x:0,y:0,w:320,h:17,wx:160,wy:236,def:'talk',talk:lay,use:lay,
    look:()=>say(P,F.gone?'they_stand_round_the_table':'they_are_waiting')},
  {name:'steps_of_the_platform',x:250,y:100,w:70,h:44,wx:160,wy:236,exit:fromTable,look:'way_back_down_from_the_table'}]};
ROOMS.night10={space:1.1,walk:[16,304,112,137],mood:'night',amb:{crickets:.4,fire:.15},hs:[
  {name:'door_to_the_lane',x:25,y:47,w:30,h:57,wx:52,wy:116,dir:-1,exit:()=>say(P,'not_before_i_know_what'),look:'door_to_the_lane_it'},
  {name:'shuttered_window',x:102,y:38,w:22,h:18,wx:112,wy:114,look:'shuttered_said',open:'not_tonight'},
  {name:'lamp_niche',x:176,y:40,w:18,h:20,wx:186,wy:114,look:'one_lamp',pickup:'it_is_his'},
  {name:'shelf',x:224,y:36,w:56,h:14,wx:250,wy:114,look:'his_vessels_a_jug_a_bowl',pickup:'they_are_his'},
  {name:'bundles',x:276,y:90,w:36,h:16,wx:270,wy:116,dir:1,look:'our_bundles_said',pickup:'timothy_has_them_in_hand'}]};
ROOMS.ber10={space:1.3,walk:[16,304,112,137],get mood(){return F.b3?'tense':'calm'},amb:()=>F.sea?{crowd:.45,birds:.2}:{birds:.5,leaves:.2},hs:[
  {name:'door_to_the_street',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(PC(),tim()?'silas_and_i_stay':'not_while_the_scrolls_lie'),
    look:'door_to_the_street_they',as:{tim10:{look:'the_door'}}},
  {name:'benches',x:56,y:84,w:210,h:20,wx:86,wy:113,look:'the_benches',as:{tim10:{look:'empty_benches_and_a_full_table'}}},
  {name:'window',x:116,y:20,w:88,h:56,wx:160,wy:113,look:'mountain_green_to_its_shoulder',as:{tim10:{look:'the_mountain'}}},
  {name:'chest_of_the_scrolls',x:272,y:68,w:34,h:36,wx:262,wy:114,dir:1,look:'their_chest',open:'it_is_open_already_said',pickup:'it_is_theirs',
    as:{tim10:{look:'chest_stands_open'}}},
  {name:'reading_table',x:120,y:82,w:80,h:24,wx:160,wy:113,def:'use',use:toTable,look:'table_under_the_window',pickup:'it_is_not_going_anywhere',
    as:{tim10:{look:'three_scrolls_open',use:toTable}}}]};
ROOMS.quay10={space:.6,walk:[16,304,114,138],mood:'rest',amb:{waves:.8,gulls:.6,creak:.3},hs:[
  {name:'road_to_the_city',x:0,y:62,w:22,h:44,wx:22,wy:120,dir:-1,exit:()=>say(P,'not_yet_these'),look:'road_up_to_the_city'},
  {name:'jars',x:28,y:96,w:44,h:20,wx:74,wy:118,dir:-1,look:'oil_for_some_other_harbor',pickup:'they_are_not_mine'},
  {name:'sea',x:0,y:66,w:176,h:34,wx:120,wy:116,look:'open_water',use:'i_have_had_enough_sea_for_one'},
  {name:'ship',x:178,y:54,w:142,h:50,wx:230,wy:116,look:'she_brought_us_down_the_coast',use:'i_am_not_sailing'},
  {name:'gangplank',x:194,y:84,w:20,h:22,wx:204,wy:114,exit:()=>say(P,'that_way_lies_beroea_and_the_men'),look:'gangplank_two'}]};

/* ============ PEOPLE ============ */
const todo=()=>inYard()?(!F.cutd?'cloth_is_pegged_out_along':!F.r2?'it_is_the_sabbath_paul':!F.sewn?'panels_are_on_the_bench':!F.r3?'it_is_the_sabbath_again_paul':!F.sold?'parmenon_is_here_for_his_tent':'third_sabbath_paul')
  :inSyn()?'they_have_asked_you_a_question_paul'
  :G.room==='night10'?'hear_jason_out_paul'
  :inBer()?'they_are_waiting_at_the_table_paul':'brothers_must_sail_paul';
SI.hs={name:'Silas',actor:SI,look:()=>say(P,inBer()?'silas_he_has_stopped':G.room==='night10'?'silas_he_has_not':'silas_his'),
  show:{awl:'your_awl_it_earns',tablets:'read_me_one_tonight_said',panels10:'six_pieces_of_cloth_and_you',tent10:'that_is_what_you_saw_in_them','*':'keep_it_brother_said'},
  talk:()=>say(SI,todo()),
  as:{tim10:{look:'silas_he_stayed',talk:()=>say(SI,F.own?'you_did_well_timothy':'he_asked_you_timothy'),show:{'*':'keep_it_timothy'}}}};
TI.hs={name:'Timothy',actor:TI,look:()=>say(P,inBer()?'timothy_he_reads':'timothy_he_carries'),
  show:{tablets:'are_there_new_ones_paul_said',awl:'awl_i',panels10:'shall_i_hold_the_far_edge',tent10:'it_rolls_up_smaller_than_i_thought','*':'shall_i_carry_that_for_you_paul'},
  talk:()=>say(TI,todo())};
JA.hs={name:'Jason',actor:JA,look:()=>say(P,G.room==='night10'?'jason':inSyn()?'jason_before_the_benches':'jason_said'),
  show:{awl:'i_can_keep_accounts_paul',tablets:'you_wrote_all_of_that_yourself',panels10:'that_is_how_a_tent_begins',tent10:'parmenon_has_a_good_eye','*':'whatever_you_need_in_this_house'},
  talk:async()=>{if(G.room==='night10')return jasonTalk();if(inSyn())return say(JA,'i_am_listening_paul');return talkTree([
    {q:'what_sort_of_city_is_this_jason',once:1,a:()=>say(JA,'harbor_at_one_end_and_the_great')},
    {q:'we_are_a_burden_on_your_house',once:1,a:async()=>{await say(JA,'you_eat_bread_that_you')}},
    {q:'peace_to_your_house_jason',bye:1}])}};
PA.hs={name:'Parmenon',actor:PA,look:'parmenon',
  give:id=>id==='tent10'?sell():false,show:{awl:'good_tool',panels10:'pieces_said',tablets:'accounts_no_then','*':'i_buy_many_things'},
  talk:async()=>{if(has('tent10'))return sell();return say(PA,'you_sew_and_i_shall_talk')}};
BR.hs={name:'brother_from_philippi',actor:BR,look:'a_brother_from_philippi',show:{'*':'keep_it_paul_said'},talk:()=>say(BR,'luke_sends_his_greeting')};
HO.hs={name:'brother_of_the_house',actor:HO,look:'brother_whose_house_this_is',show:{'*':'keep_it_brother_you'},
  talk:()=>say(HO,F.gone?'moon_is_down':'lanes_behind_this_house')};
/* the synagogue of Thessalonica */
TD.hs={name:'Theodotos',actor:TD,look:'theodotos_the_attendant',show:{tablets:'wax_what','*':'not_in_this_house_on_this_day'},
  talk:()=>say(TD,'scrolls_are_on_the_table_stranger')};
LM.hs={name:'Lysimachos',actor:LM,look:'lysimachos',show:{tablets:'your_tablets_i_cannot_test','*':'put_that_away_this'},
  talk:()=>ASKER()===LM?again():say(LM,sab()===3?'i_have_heard_enough_to_know':'let_him_answer_menandros_first')};
ME.hs={name:'Menandros',actor:ME,look:'menandros',show:{tablets:'you_carry_it_written_down','*':'i_did_not_come_for_that'},
  talk:()=>ASKER()===ME?again():say(ME,'answer_him_tentmaker')};
ST.hs={name:'Stratonike',actor:ST,look:'stratonike',show:{'*':'keep_it_sir_i'},
  talk:()=>say(ST,sab()===1?'go_on_sir':'i_have_been_thinking_about_it')};
/* the synagogue of Beroea */
EU.hs={name:'Eupolemos',actor:EU,look:()=>say(P,'eupolemos_said'),show:{tablets:'may_i_said','*':'keep_it_paul_show'},
  talk:()=>F.b3?say(EU,'to_the_sea_paul'):asker()===EU?againB():say(EU,'one_place_at_a_time_paul'),
  as:{tim10:{look:'eupolemos_he',talk:own,show:{'*':'keep_it_young_man'}}}};
DO.hs={name:'Dorotheos',actor:DO,look:()=>say(P,'dorotheos'),show:{tablets:'you_have_it_all_in_so_few','*':'keep_it_paul_2'},
  talk:()=>F.b3?say(DO,'i_shall_go_on_reading_paul'):asker()===DO?againB():say(DO,'i_have_found_something_paul'),
  as:{tim10:{look:'dorotheos_said',talk:()=>say(DO,'did_you_know_these_scrolls'),show:{'*':'keep_it_timothy'}}}};
KL.hs={name:'Kleonike',actor:KL,look:()=>say(P,'kleonike'),show:{tablets:'few_lines','*':'keep_it_sir_said'},
  talk:()=>F.b3?say(KL,'go_safely_sir'):asker()===KL?againB():say(KL,'i_listen_sir_and_at_home'),
  as:{tim10:{look:'kleonike_said',talk:()=>say(KL,'they_may_shout_in_the_street'),show:{'*':'keep_it_2'}}}};
LT.hs={name:'man_back_from_his_flocks',actor:LT,look:'shepherd_by_his_cloak_and_a_son',as:{tim10:{look:'man_who_was_with_his_flocks',talk:own,show:{'*':'keep_it_young_man_said'}}}};
/* the quay */
E1.hs={name:'brother_from_beroea',actor:E1,look:'one_of_the_brothers_who_said',show:{tablets:'keep_them_paul','*':'keep_it_paul_2'},
  talk:()=>inBer()?say(E1,'ship_will_not_wait_paul'):F.msg?say(E1,'i_have_it_paul_said'):message()};
E2.hs={name:'younger_brother',actor:E2,look:'younger_of_the_two',show:{'*':'keep_it_paul_2'},talk:()=>F.msg?say(E2,'he_has_it'):message()};
/* Timothy when he is the one being played: his answers where the level wrote nothing for him */
const TIM10={noCraft:'that_is_pauls_craft_not_mine',
  def:{look:'i_see_nothing_there_that_needs_said',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',use:'that_is_not_for_me_to_do_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'i_carry_nothing_that_i_could_give'}};

/* ============ WAX TABLETS: people met, tasks still open, and the places in the scrolls (shown by shared/tablets.js) ============ */
const ps=k=>({ref:PLACE[k].ref,gist:PLACE[k].gist});
const TABLETS={
  people:[
    {name:'Silas',note:'prophet_and_a_leading_man_said'},
    {name:'Timothy',note:'son_of_eunice_of_lystra_said'},
    {name:'Jason',note:'he_received_us_under_his_roof',if:()=>!F.gone},
    {name:'Parmenon',note:'trader_on_the_great_road',if:()=>!F.sold&&!F.night},
    {name:'Lysimachos',note:'of_the_synagogue_of_thessalonica',if:()=>!!F.cutd&&!F.gone},
    {name:'Menandros',note:'greek_who_worships_god',if:()=>!!F.r1&&!F.gone},
    {name:'Stratonike',note:'one_of_the_leading_women_of_thessalonica',if:()=>!!F.r3&&!F.gone},
    {name:'Eupolemos',note:'oldest_man_in_the_synagogue_of_beroea',if:()=>!!F.gone},
    {name:'Dorotheos',note:'young_man_of_beroea_who_reads_on',if:()=>!!F.b1},
    {name:'Kleonike',note:'greek_woman_of_standing_in_beroea',if:()=>!!F.b1}],
  tasks:[
    {t:'lay_out_the_six_panels',if:()=>!F.laid},
    {t:'cut_the_panels',if:()=>!!F.laid&&!F.cutd},
    {t:'sabbath_go_to_the_synagogue',if:()=>inYard()&&!!F.cutd&&(!F.r2||(!!F.sewn&&!F.r3)||(!!F.sold&&!F.r4))},
    {t:'lysimachos_is_the_sour_wine_written',if:()=>!F.night&&!!F.cutd&&!F.r1&&!inYard()},
    {t:'menandros_if_god_had_sent',if:()=>!!F.r1&&!F.r2},
    {t:'sew_the_panels_night_work',if:()=>!!F.r2&&!F.sewn},
    {t:'lysimachos_a_dead_christ_is_no_christ',if:()=>!!F.sewn&&!F.r3&&!inYard()},
    {t:'parmenon_has_come_for_his_tent',if:()=>!!F.r3&&!F.sold},
    {t:'menandros_why_this_jesus_and_no_other',if:()=>!!F.sold&&!F.r4&&!inYard()},
    {t:'jason_has_given_security',if:()=>!!F.night&&!F.gone},
    {t:'eupolemos_moses_says_it',if:()=>!!F.gone&&!F.b1},
    {t:'kleonike_the_lots_cast_for_his_clothing',if:()=>!!F.b1&&!F.b2a},
    {t:'dorotheos_before_whom_was_he_silent',if:()=>!!F.b2a&&!F.b2b},
    {t:'eupolemos_a_grave_with_the_rich',if:()=>!!F.b2b&&!F.b2c},
    {t:'dorotheos_his_anointed_one',if:()=>!!F.b2c&&!F.b3},
    {t:'send_word_to_silas_and_timothy',if:()=>!!F.ath&&!F.msg}],
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
    await narr('about_50_c_e_said',{dur:10500});
    await tell('t22');
    await say(JA,'my_roof_is_yours_for_as_long');
    await say(P,'your_roof_we_take_gladly_jason');
    await say(PA,'tentmaker_they_tell_me_and_from_tarsus');
    await say(P,'roof_two_walls_a_door_flap');
    await walk(PA,24,118);PA.room=null;
    await narr('he_bought_one_bolt_of_goat',{dur:7600});
    await say(TI,'it_is_pegged_out_along');codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
function hint10(){
  if(tim())return['own10',['he_asked_me','i_should_talk_to_the_man']];
  if(F.ath)return['msg10',['whatever_is_carried_by_word','i_talk_to_the_brother_from_beroea']];
  if(F.gone){const d=bday();
    if(d===1)return['b110',['everything_that_is_written','prophets_at_the_pierced']];
    if(d===2){const f=find().f;return f==='b2a'?['b2a10',['she_found_the_lots','my_tablets_at_the_soldiers']]
      :f==='b2b'?['b2b10',['he_found_the_silence','my_tablets_at_the_accusers']]
      :['b2c10',['he_found_the_grave','my_tablets_at_the_rich_mans_tomb']]}
    return['b310',['before_i_lay_anything_beside','i_look_at_the_scroll_of_the_prophets']]}
  if(F.night)return['night10',['jason_gave_security_and_it','i_should_talk_to_jason']];
  if(G.room==='bolt10'||!F.cutd){
    if(F.laid)return['cut10',['it_is_laid_out_now','i_should_use_my_knife_with_the_bolt']];
    return G.room==='bolt10'?['lay10',['thin_strip_may_lie_at_the_edge','end_wall_turned_upright']]
      :['bolt10',['tent_is_thought_out_before','i_should_use_the_bolt_of_goat']]}
  if(inYard()){
    if(F.r2&&!F.sewn)return['sew10',['panels_are_cut','i_should_use_the_awl_with_the_cut']];
    if(F.r3&&!F.sold)return['sold10',['parmenon_has_come_for_what_he_ordered','i_should_give_him_the_traveling_tent']];
    return['gate10',['it_is_the_sabbath_and_this_city','i_can_go_out_by_the_gate']]}
  const w=WANT();
  return w==='V'?['v10',['everything_that_is_written_said','at_the_table_the_psalms']]
    :w==='M'?['m10',['he_asked_about_the_mockery_said','psalms_at_the_mocking_the_prophets']]
    :w==='G'?['g10',['he_asked_whether_a_dead_said','psalms_at_the_grave_the_prophets']]
    :['p10',['what_was_done_with_him_said','psalms_at_the_unbroken']]}

/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_and']};
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
