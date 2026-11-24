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
   at all: only the notes the scrolls give, and the room; when the city is in an uproar (mood "tense") nothing is held: a low string
   plucks the keynote on the fours and the six and leans on the note above it, a drum ticks with it and almost stops every fourth bar,
   and a ney begins the tune and breaks off a note before it comes home. Nothing is claimed about how music was played in Paul's day: it is not known how it sounded. */
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
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,vol:1.25,seq:{
    A:[-7,_,_,_,-7,_,_,-6,-7,_,_,-7,_,_],B:[-7,_,_,_,-7,_,_,-6,-6,_,_,-7,_,-10],C:[-7,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',seq:{A:'d...k..kk..k..',B:'d...k..kk.kk..',C:'d.............'},vol:.85},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:1.1,lines:[TUNE[0],TUNE[1].slice(0,-1),[],[],TUNE[4],TUNE[5].slice(0,2),[],[]]}]},
 /* Beroea, and the quay at Athens: the same key and the same tune, in even bars of sixteen steps. In the synagogue (mood "calm") a harp,
    a low string and a ney; when the strangers stand at the gate (mood "tense") the low string, the ticking drum and the broken-off
    tune, in threes, threes and twos; on the quay (mood
    "rest") the harp alone. */
 MUSICB={dt:.15,steps:16,root:58,scale:SCALE,bars:16,tracks:[
  {inst:'harp',moods:['calm','rest'],prog:'AABAACAA',len:4,oct:12,vol:.8,seq:{A:[0,_,4,_,2,_,4,_,0,_,2,_,4,_,2,_],B:[3,_,7,_,5,_,7,_,3,_,5,_,7,_,5,_],C:[1,_,5,_,3,_,5,_,1,_,3,_,5,_,3,_]}},
  {inst:'bass',moods:['calm'],prog:'AABAACAA',len:7,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.35},
  {inst:'ney',moods:['calm'],loop:8,oct:12,lines:TUNEB,vol:.9},
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,group:[3,3,2],vol:1.25,seq:{
    A:[-7,_,_,-7,_,_,-6,_,-7,_,_,-7,_,_,_,_],B:[-7,_,_,-7,_,_,-6,_,-6,_,_,-7,_,_,-10,_],C:[-7,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',group:[3,3,2],seq:{A:'d..k..k.d..k..k.',B:'d..k..k.d..k.kk.',C:'d...............'},vol:.85},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:1.1,lines:[TUNEB[0],TUNEB[1].slice(0,-1),[],[],TUNEB[4],TUNEB[5].slice(0,2),[],[]]}]};
/* The scroll table has no score. A roller that is wound gives one plucked note, a note for each place, and a row that holds sounds as
   a chord. Every step can be solved from the text alone: the game stays quiet in Silent Mode. */
const pluck10=(deg,v,dt)=>{if(AU.ctx)INST.harp(mtof(note(deg,12,MUSIC)),now()+(dt||0),.5,v||1)};
const chord10=()=>{[0,2,4,7].forEach((d,i)=>pluck10(d,.9,.02+i*.07))};
/* the uproar, as it is heard from a courtyard: a crowd some streets away, coming nearer, and a gate thrown open. No drum takes its side. */
function uproar(){if(!AU.ctx)return;const t=now()+.05;noise({t,d:7,v:.34,a:2.4,sus:1,f:520,q:.7});noise({t:t+1.2,d:5.6,v:.2,a:2,sus:1,f:900,q:.9});
  for(let i=0;i<12;i++)noise({t:t+1.6+Math.random()*4.6,d:.05,v:.1,f:700+Math.random()*500,q:2.4});
  noise({t:t+4.2,d:.16,v:.34,f:300,q:.8,type:'lowpass'});tone({f:120,to:70,t:t+4.2,d:.3,type:'triangle',v:.2,echo:1})}

/* ============ ART ============ */
/* materials and light shared by every chapter (shared/materials.js, to the standard of Chapter Fifteen's room of Gaius): quiet grain
   on wood, two-tone cracks set by hand, contact shadows in three passes of alpha, dyes drawn toward earth colors, shade beside joists */
const{plank:plank10,board:board10,crack:crack10,skipCracks:skipCracks10,shadow:shadow10,earth:earth10,ceiling:ceiling10}=SHARED.materials;
/* beams10: the ceiling over a back wall, its joists running toward the viewer from the wall plate in the perspective of the floor
   (shared ceiling(), as in Chapter One's workshop), and the shade the plate throws on the plaster under it */
function beams10(g,x0,step,r){ceiling10(g,320,{x0,step,r,vx:160,vy:60});ao(g,0,10.4,320,12,'t',.42,'#2a2030');ao(g,0,10.4,320,3,'t',.25,'#1a1420')}
/* patches10: the brick patches that plaster() lays in a wall (o.patch), drawn from r exactly as it draws them, so that the rest of the
   room keeps its shape; at[k], where given, is the place [x, y] that patch k is moved to */
function patches10(g,w,h,c,r,n,b,at){inRect(g,0,0,w,h,()=>{for(let k=0;k<n;k++){let px=r()*w,py=h*(.15+r()*.8);const pw=6+r()*12,ph=4+r()*7,pts=[];
  if(at&&at[k])[px,py]=at[k];
  for(let a=0;a<9;a++){const t=a/9*6.2832,q=.6+r()*.4;pts.push(px+Math.cos(t)*pw*q,py+Math.sin(t)*ph*q)}
  clipTo(g,()=>poly(g,pts),()=>{R(g,px-pw,py-ph,pw*2,ph*2,tint(b,-.35));
    for(let j=0,row=0;j<ph*2;j+=2.5,row++)for(let i=-(row%2)*3;i<pw*2;i+=6)R(g,px-pw+i,py-ph+j,5.5,2,tint(b,(r()-.5)*.25))});
  stroke(g,pts.concat(pts.slice(0,2)),rgba('#000000',.25),.5)}})}
/* crack set by hand, high on a wall, where they run to no head: [x, y, steps] */
function cracks10(g,seed,list){const r=rng(seed);for(const[x,y,n]of list)crack10(g,x,y,n,r)}
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
  /* the stars and the cloud draw from a seed of their own, so that the tree and the patches of the wall stay where they are by day, by
     night and at dusk */
  const rs=rng(1009);
  if(night){sky(g,320,22,['#0e1430','#1a2444','#2a3458'].map(c=>earth10(c,.2)));for(let i=0;i<70;i++)R(g,rs()*320,rs()*16,.5,.5,`rgba(236,236,255,${.3+rs()*.6})`)}
  else sky(g,320,22,dusk?['#c8784a','#e8a868','#f0cc98']:['#4a86c8','#86b2dc','#cfe0ea'].map(c=>earth10(c,.14)));
  if(!night&&!dusk)cloud(g,214,6,40,3,rs);
  foliage(g,46,13,30,9,night?'#2a3e2c':dusk?'#6a6a3a':'#5c8a48',r,150);foliage(g,84,15,16,6,night?'#2a3e2c':dusk?'#6a6a3a':'#68964e',r,60);
  plaster(g,0,17,320,87,W,r,{patch:3,cracks:0,brick:'#b08a5a',t:.4});skipCracks10(r,5);
  cracks10(g,1012,[[72,24,3],[146,23,4],[244,25,3],[312,22,3]]);
  /* the eave of the house: a course of tiles along the top of the wall, and their shadow under it; the joints stop under the lit edge */
  R(g,0,13,320,6,'#b8603c');for(let i=0;i<320;i+=5)R(g,i,13.8,.5,5.2,'rgba(90,40,24,.35)');R(g,0,13,320,.8,'#d88a5c');R(g,0,19,320,1.2,'rgba(60,40,60,.45)');ao(g,0,20,320,9,'t',.3,'#3a3050');ao(g,0,20,320,3,'t',.2,'#1a1420');
  R(g,0,74,320,30,tint(W,-.14));tex(g,'mott',.25,0,74,320,30,'overlay',1);R(g,0,73,320,1.2,tint(W,.14));ao(g,0,94,320,10,'b',.22,'#2a2030');
  /* the gate to the street, its leaf swung back against the wall */
  R(g,14,42,40,62,tint(W,-.2));arch(g,18,46,32,58);g.fillStyle=night?lg(g,0,46,0,104,['#141a34','#262c48','#34364e']):dusk?lg(g,0,46,0,104,['#e8a868','#e8c090','#c8a882']):lg(g,0,46,0,104,['#a8cdea','#e8e2cc','#e0d2ae']);g.fill();
  g.save();arch(g,18,46,32,58);g.clip();R(g,18,70,32,18,night?'#3a3a52':dusk?'#d8b890':'#e6d8b6');R(g,18,68.6,32,1.6,night?'#4a3a40':'#b8603c');R(g,27,75,7,7,night?'#1a1a2a':'#3a2c22');
  R(g,18,88,32,16,night?'#34364a':dusk?'#c4a888':'#cfc4a8');for(let i=0;i<3;i++)R(g,18,91+i*4,32,.5,'rgba(90,80,70,.35)');g.restore();
  boards(g,6,50,10,54,5,'#5a4226',r);R(g,6,50,10,.8,'#8a6a42');R(g,15.4,50,.8,54,'#2a1c10');
  /* a shuttered window, and the door of the house */
  windowArt(g,104,40,16,14,W,{shut:1});R(g,264,44,36,60,tint(W,-.18));doorArt(g,267,47,30,57,'#6a4a2c',r,{bands:[],left:1});
  /* the workbench against the wall, and a lamp in its niche over it */
  niche(g,204,42,W);
  {const rw=rng(1014);shadow10(g,211,104.2,36,1.8,.4,'#2a2030');shadow10(g,179.5,104,4,1.2,.4);shadow10(g,242.5,104,4,1.2,.4);
   board10(g,176,88,70,4,'#8a683a',rw);R(g,176,91.6,70,1,'#5a4226');board10(g,178,92,3,12,'#5a4226',rw,1);board10(g,241,92,3,12,'#5a4226',rw,1);board10(g,182,97,58,2,'#6a4e2c',rw);
   ao(g,181,92,60,3,'t',.3,'#1a1420')}
  if(!dusk){vessel(g,234,88,3,6,'#8a4a2a','jug',{noShadow:1});R(g,186,86.4,14,1.6,'#c8b890');R(g,186,86.4,14,.5,'#efe2bc')}
  /* a great jar of water by the gate; at dusk it lies broken */
  /* the paving; the jar stands on it, not sunk into it */
  pave(g,0,103,320,144,'#cdc09e',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.22,'#1a1420');
  if(!dusk){shadow10(g,66,106,9,2,.4);vessel(g,64,106,6,17,'#9a5a36','pithos',{noShadow:1})}
  if(dusk){shadow10(g,226,118,13,3,.35);/* the jar, in pieces, and the water it held; a stool on its side by the bench; the cord and two pegs, kicked across the paving */
    comp(g,'multiply',.45,()=>oval(g,70,116,24,5,'#7a8ab0'));
    for(const[x,y,w,h]of[[52,112,11,6],[66,118,9,5],[80,113,7,5],[60,121,6,3],[90,119,5,3],[74,110,5,3]]){const c=tint('#9a5a36',(r()-.5)*.3);poly(g,[x,y,x+w,y-h*.3,x+w*.86,y+h*.5,x+w*.2,y+h*.7],c);poly(g,[x,y,x+w,y-h*.3,x+w*.7,y+h*.1],tint(c,.25))}
    poly(g,[214,110,232,108,234,114,216,116],'#7a5c36');poly(g,[214,110,232,108,232.6,110,214.6,112],'#b08a5a');poly(g,[216,116,218,122,220.4,121.6,218.6,115.6],'#5a4226');poly(g,[231.6,114.2,236,119,238,118,234,113.8],'#5a4226');
    stroke(g,[118,126,140,123,166,127,190,124],'#d8c9a0',.7);R(g,112,128,2,1.6,'#8a6a42');R(g,196,121,2,1.6,'#8a6a42')}
  /* the light: by night the lamp in its niche, its fall on the bench and the paving, the sky's cold in the gate and along the eave;
     at dusk the low sun through the gate and on the top of the wall; by day the sun on the wall and the paving, the shade under the eave */
  const bands=(l,a,b)=>{l.fillStyle=lg(l,0,0,0,30,[`rgba(20,16,24,${a})`,'rgba(20,16,24,0)']);l.fillRect(0,0,320,30);l.fillStyle=lg(l,0,124,0,144,['rgba(20,16,24,0)',`rgba(20,16,24,${b})`]);l.fillRect(0,124,320,20)};
  if(night)lightmap(g,320,earth10('#3a3c5e',.15),l=>{nicheLight(l,211,55,36,30,'#ffc070',.95);pool(l,211,104,96,52,'#ffb060',.6);pool(l,211,89,42,6,'#ffc878',.4);pool(l,214,118,70,14,'#ffa850',.3);
    pool(l,34,88,40,50,'#5a66a0',.4);pool(l,160,18,190,8,'#5a6494',.35);pool(l,64,104,16,10,'#6a72a8',.2);bands(l,.2,.3)});
  else if(dusk)lightmap(g,320,'#b89c98',l=>{pool(l,34,84,70,80,'#ffd0a0',1);pool(l,90,124,150,40,'#ffc898',.6);pool(l,200,26,150,12,'#ffc8a0',.45);pool(l,140,112,60,8,'#ffd4a8',.3);bands(l,.12,.24)});
  else{lightmap(g,320,'#e2dcdc',l=>{pool(l,170,52,210,48,'#fff6e4',.55);pool(l,34,80,56,60,'#fffbec',.6);pool(l,160,126,210,26,'#fff4dc',.5);pool(l,211,96,40,8,'#fff0d8',.3);bands(l,.08,.16)});
    shade(g,[0,104,320,104,320,112,0,116],SH,.35);comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,320,41)});pool(g,34,84,70,70,'#fff0cc',.22,'screen')}},
 light(){const v=yardV();return v==='n'?{amb:'#6c6e96',wallY:103,wall:[[0,18,103,19],[50,320,103,19]],lamps:[[211,96,96,'#7a5220',103,55.6]]}:v==='u'?{amb:'#e8cdbc',wallY:103}:null},
 draw(g,t){const v=yardV();if(v==='n')flame(g,214.6,55.6,t);
  /* the bolt, pegged out at the foot of the wall: until it is cut. Its third cubit from the left is woven thin. */
  if(!F.cutd&&v!=='u'){const x0=80,x1=200,y0=105.2,y1=112.4,k=v==='n'?.5:1,c=tint(CLOTH,k<1?-.3:0);poly(g,[x0,y0,x1,y0,x1+6,y1,x0-6,y1],c);
    for(let i=1;i<12;i++){const a=x0+(x1-x0)*i/12,b=x0-6+(x1-x0+12)*i/12;if(i===2||i===3)continue;R(g,(a+b)/2,y0+.4,.5,y1-y0-.8,'rgba(255,240,210,.05)')}
    poly(g,[x0+(x1-x0)*2/12,y0,x0+(x1-x0)*3/12,y0,x0-6+(x1-x0+12)*3/12,y1,x0-6+(x1-x0+12)*2/12,y1],tint(c,.22));R(g,x0,y0,x1-x0,.5,tint(c,.3));
    for(const[px,py]of[[x0-1,y0-1],[x1,y0-1],[x0-7,y1],[x1+6,y1]])R(g,px,py,1.4,1.4,'#8a6a42')}
  /* what the bench holds: the cut panels, folded; then the tent, rolled, until the trader has it */
  if(F.cutd&&!F.sewn&&v!=='u')for(let i=0;i<4;i++){R(g,204,85.4-i*1.6,22-i*2,1.6,tint(CLOTH,i%2?.12:0));R(g,204,85.4-i*1.6,22-i*2,.4,'rgba(255,240,210,.18)')}
  if(F.sewn&&!F.sold&&v!=='u'){g.fillStyle=lg(g,0,80,0,88,[tint(CLOTH,.3),CLOTH,tint(CLOTH,-.4)]);g.fillRect(200,80.6,30,7.4);R(g,200,80.6,2.4,7.4,tint(CLOTH,.2));R(g,227.6,80.6,2.4,7.4,tint(CLOTH,-.3))}},
 /* at dusk the stool lies on its side inside the strip where people walk: whoever goes behind it is hidden by it */
 props:[{y:118,shape(g,v){if(v!=='u')return;poly(g,[214,110,232,108,234,114,216,116],'#000');poly(g,[216,116,218,122,220.4,121.6,218.6,115.6],'#000');poly(g,[231.6,114.2,236,119,238,118,234,113.8],'#000')}}],
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
/* close views, to the finer standard of Chapter Fifteen's scale and Chapter Thirteen's counting board: veined and weathered stone,
   fine-grained wood that never competes with what lies on it, cloth whose threads all run one way, and soft contact shadows. */
/* soft10: the shade a thing throws on what it lies on: down and to the right, soft at its edge (three passes, as shadeScale15 does) */
function soft10(g,p,d,a){for(const[k,q]of[[1,.32],[.66,.3],[.33,.36]])comp(g,'multiply',(a||1)*q,()=>poly(g,p.map((v,i)=>i%2?v+d*k*.5:v+d*k),'#4a3c50'))}
/* grain10: a fine grain for a close view: thin strokes, each a little lighter or darker than the wood, that wander gently along it and
   end where they end, so that no line runs ruled from one end of a board to the other */
function grain10(g,x,y,w,h,c,seed,o){o=o||{};const r=rng(seed),A=o.amp||.4,al=o.a||1;
  inRect(g,x,y,w,h,()=>{for(let yy=y-1;yy<y+h+1;yy+=.45+r()*.8){const dark=r()<.55,f=.02+r()*.03,ph=r()*6.3,l=w*(.25+r()*.75),x0=x-4+r()*(w-l+8),p=[];
    for(let xx=x0;xx<=x0+l;xx+=3)p.push(xx,yy+A*Math.sin(xx*f+ph));
    stroke(g,p,dark?rgba(tint(c,-.38),(.08+r()*.14)*al):rgba(tint(c,.32),(.06+r()*.12)*al),.45)}})}
/* flags10: the flagstones of a courtyard seen from above, in courses of uneven slabs. Each slab has its own tone, lies a little dished
   and worn round at its edges, and has a vein, a few pits and a chipped corner of its own; grit lies in the joints. A joint stops at the
   edge of its course, and none stands in line with one in the course before it. o.y0: where the first course begins; o.avoid: heights
   where no course may end (a course joint of the paving beside), so that two runs of courses meet in T shapes and never in a cross.
   Returns the heights where its courses end. */
function flags10(g,x,y,w,h,c,seed,o){o=o||{};const r=rng(seed),ch=o.ch||30,ys=[],av=o.avoid||[];
  inRect(g,x,y,w,h,()=>{R(g,x,y,w,h,mix(tint(c,-.22),'#6a5c50',.4));tex(g,'grain',.6,x,y,w,h,'overlay',.5);let prev=[];
    for(let Y=o.y0==null?y-r()*ch*.6:o.y0;Y<y+h;){let hh=ch*(.78+r()*.44);for(const q of av)if(Math.abs(Y+hh-q)<5)hh=q-Y+6;const cur=[];let X=x-r()*40;ys.push(Y+hh);
      while(X<x+w){let e=X+28+r()*30;for(const q of prev)if(Math.abs(e-q)<8)e=q+10;cur.push(e);
        const k=r(),cc=k<.3?mix(c,'#c0a088',.4):k<.6?mix(c,'#9c9a92',.4):k<.75?tint(c,.1):c;slab10(g,X+.4,Y+.4,e-X-.8,hh-.8,tint(cc,(r()-.5)*.2),r);X=e}
      prev=cur;Y+=hh}
    tex(g,'mott',.4,x,y,w,h,'overlay',1);tex(g,'blotch',.22,x,y,w,h,'soft-light',.8);
    for(let i=0;i<Math.round(w*h/3300);i++)pool(g,x+r()*w,y+r()*h,14+r()*30,6+r()*14,'#7a6450',.12,'multiply')});return ys}
function slab10(g,x,y,w,h,c,r){const k=.9+r()*.8,o=[x+k,y,x+w-r()*1.2,y+r()*.5,x+w,y+k,x+w-r()*.5,y+h-r()*1.2,x+w-k,y+h,x+r()*1.2,y+h-r()*.5,x,y+h-k,x+r()*.5,y+r()*1.2];
  poly(g,o);g.fillStyle=lg(g,x,y,x+w*.6,y+h,[tint(c,.07),c,tint(c,-.05)]);g.fill();
  clipTo(g,()=>poly(g,o),()=>{
    /* worn round: the edges catch the light on the upper left and fall into shade on the lower right; the middle is a little dished */
    ao(g,x,y+h-3,w,3,'b',.18,'#3a2e2a');ao(g,x+w-3,y,3,h,'r',.14,'#3a2e2a');
    pool(g,x+w*.5,y+h*.55,w*.42,h*.36,'#6a5a4c',.1,'multiply');
    R(g,x+1,y,w-2,.5,rgba(tint(c,.3),.45));R(g,x,y+1,.5,h-2,rgba(tint(c,.24),.35));
    /* a vein that runs across part of it, and sometimes a fork from it */
    if(r()<.7){let vx=x+r()*w*.4,vy=y+r()*h;const p=[vx,vy],dx=w*(.4+r()*.5)/6,dy=(r()-.5)*h*.12;
      for(let i=0;i<6;i++){vx+=dx;vy+=dy+(r()-.5)*1.6;p.push(vx,vy)}
      stroke(g,p,rgba(tint(c,-.24),.4),.45);stroke(g,p.map((v,i)=>i%2?v+.5:v),rgba(tint(c,.3),.25),.4)}else{r();r();r();r()}
    for(let i=0;i<6;i++){const px=x+r()*w,py=y+r()*h;R(g,px,py,.5,.5,rgba(tint(c,-.4),.5));if(r()<.4)R(g,px,py-.5,.5,.5,rgba(tint(c,.4),.3))}});
  if(r()<.35){const cx=r()<.5?x:x+w,cy=r()<.5?y:y+h,sx=cx===x?1:-1,sy=cy===y?1:-1;poly(g,[cx,cy,cx+sx*2.6,cy,cx,cy+sy*2],rgba(tint(c,-.42),.8))}}
/* hair10: goat-hair cloth seen from above, nearly black: its threads all run the long way, some a shade lighter, some thicker for a
   stretch; the cloth lifts a little between the pegs and is drawn toward each of them at the corners; a selvage along both long edges */
function hair10(g,x,y,w,h,c,seed){const r=rng(seed);
  g.fillStyle=lg(g,0,y,0,y+h,[tint(c,.04),tint(c,-.08),tint(c,-.04),tint(c,-.16)]);g.fillRect(x,y,w,h);
  /* the threads: short runs a shade lighter or darker, row by row, and the fuzz of the hair over them */
  for(let yy=y;yy<y+h;yy+=.5){let xx=x-r()*6;while(xx<x+w){const l=1.5+r()*6,q=r();if(q<.4)R(g,xx,yy,l,.5,q<.16?rgba('#d8c4a4',.05+r()*.05):rgba('#000000',.14+r()*.12));xx+=l}}
  for(let i=0;i<w*h*.05;i++){const sx=x+r()*w,sy=y+r()*h;R(g,sx,sy,.5+r()*1.5,.5,rgba('#cdb898',.06+r()*.08))}
  /* the cloth lifts between the pegs: long low swells, lit on their upper side */
  for(let i=0;i<8;i++){const sx=x+r()*w,sy=y+8+r()*(h-16),rx=30+r()*50,ry=4+r()*5;pool(g,sx,sy-ry*.5,rx,ry,'#e8d2b4',.06,'screen');pool(g,sx,sy+ry*.6,rx,ry*.8,'#000000',.12,'source-over')}
  tex(g,'mott',.22,x,y,w,h,'soft-light',.5);
  /* drawn toward the pegs: a few faint creases that open out from each corner */
  for(const[cx,cy,sx,sy]of[[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]])for(let i=0;i<3;i++){const L=8+r()*9,a=.25+i*.3+(r()-.5)*.15,ex=cx+sx*L*Math.cos(a),ey=cy+sy*L*Math.sin(a)*.8;
    stroke(g,[cx+sx*1.5,cy+sy*1.2,ex,ey],'rgba(0,0,0,.26)',.6);stroke(g,[cx+sx*1.5,cy+sy*.7,ex,ey-sy*.5],'rgba(240,220,190,.07)',.5)}
  /* the selvage: a closer, slightly paler weave along both long edges */
  for(const sy of[y,y+h-2.2]){R(g,x,sy,w,2.2,rgba(tint(c,.14),.5));for(let xx=x;xx<x+w;){const l=2+r()*8;R(g,xx,sy+(r()<.5?.5:1.2),l,.5,rgba('#e8d4b0',.06));xx+=l+r()*3}}
  ao(g,x,y,w,4,'t',.14,'#e8d4b0')}
/* cord10: the measuring cord, twisted flax laid on the stone: a shade under it, its body, a lit strand, and along it the lay of the twist
   as short lighter dashes that stay inside the cord (nothing drawn across it). The knots are small lumps, one to the cubit. */
function cord10(g,p,knots,vert){const C='#d2c098';stroke(g,p.map((v,i)=>v+.7),'rgba(40,30,40,.28)',1.2);stroke(g,p,tint(C,-.3),.9);stroke(g,p.map((v,i)=>(i%2)===(vert?0:1)?v-.2:v),C,.5);
  for(let i=0;i<p.length-2;i+=2){const n=Math.hypot(p[i+2]-p[i],p[i+3]-p[i+1]);for(let s=0;s<n;s+=1.6){const k=s/n,X=p[i]+(p[i+2]-p[i])*k,Y=p[i+1]+(p[i+3]-p[i+1])*k;R(g,X-(vert?.25:0),Y-(vert?0:.25),vert?.5:.7,vert?.7:.5,rgba('#fff4d6',.45))}}
  for(const[kx,ky]of knots){R(g,kx-.4,ky-.3,2.4,2.4,'rgba(40,30,40,.3)');R(g,kx-1.1,ky-1.1,2.2,2.2,tint(C,-.28));R(g,kx-1.1,ky-1.1,1.6,1.4,C);R(g,kx-1.1,ky-1.1,1,.6,'#fff0cc')}}
/* peg10: a wooden peg driven into a joint, seen from above: its battered head, and the loop of cord that holds the cloth's corner */
function peg10(g,px,py,cx,cy){soft10(g,[px,py,px+2.6,py,px+2.6,py+2.6,px,py+2.6],1.6,.8);
  stroke(g,[cx,cy,px+1.3,py+1.3],'rgba(40,30,40,.3)',1);stroke(g,[cx,cy,px+1.3,py+1.3],'#a89670',.6);
  R(g,px,py,2.6,2.6,'#6a4c2c');R(g,px,py,2.6,.6,'#b08a5a');R(g,px,py,.6,2.6,'#96703e');R(g,px+2,py+.6,.6,2,'#4a3420');R(g,px+.8,py+.9,1,.8,'#8a6a42')}
/* panel10: a panel of the tent, cut from the same cloth and dyed only in the game's eye (its tint tells one from another): folded flat,
   its threads running the long way, the fold along its top lit, a soft shade under its near side */
function panel10(g,x,y,w,h,c,seed){const r=rng(seed),b=mix(CLOTH,earth10(c,.2),.55),o=[x+.5,y,x+w-.5,y,x+w,y+.6,x+w,y+h-.5,x+w-.6,y+h,x+.5,y+h,x,y+h-.6,x,y+.5];
  soft10(g,o,1.6);poly(g,o);g.fillStyle=lg(g,x,y,x+w*.4,y+h,[tint(b,.16),b,tint(b,-.16)]);g.fill();
  clipTo(g,()=>poly(g,o),()=>{for(let yy=y;yy<y+h;yy+=.5){let xx=x-r()*6;while(xx<x+w){const l=2+r()*9,q=r();R(g,xx,yy,l,.5,q<.35?rgba('#fff2d8',.06+r()*.06):q<.7?rgba('#000000',.1):rgba(b,0));xx+=l}}
    ao(g,x,y+h-2,w,2,'b',.28,'#140e14');ao(g,x+w-1.6,y,1.6,h,'r',.2,'#140e14')});
  R(g,x+.5,y,w-1,.5,rgba('#fff2d8',.5));R(g,x+.5,y+.5,w-1,.5,rgba(tint(b,-.4),.5));R(g,x,y+.6,.5,h-1.2,rgba('#fff2d8',.28))}
ART.bolt10={w:320,q:12,
 paint(g){const r=rng(1013);
  /* the courtyard's flagstones, seen from above */
  /* the measuring cord lies along joints, not across them: the paving under the far edge of the cloth ends in a course joint where the
     cord runs, and a border of slabs of its own rhythm runs down the left where the other cord lies */
  {const S='#aea086',ys=flags10(g,21.4,6.6,298.6,137.4,S,1041,{ch:34,y0:6.6});flags10(g,21.4,0,298.6,6.6,S,1048,{ch:34});flags10(g,0,0,21.4,144,S,1049,{ch:26,avoid:ys})}
  /* the cloth: goat hair, nearly black, its weave running the long way; the selvage along both long edges. The weave is drawn the long
     way only, and stops at the thin strip, so that no thread crosses the loose ones there */
  const CW=COLS*CELL,CH=ROWS_B*CELL,tx=BX+THIN*CELL;
  soft10(g,[BX,BY,BX+CW,BY,BX+CW,BY+CH,BX,BY+CH],3.2,.9);
  inRect(g,BX,BY,tx-BX,CH,()=>hair10(g,BX,BY,CW,CH,tint(CLOTH,-.12),1042));inRect(g,tx+CELL,BY,BX+CW-tx-CELL,CH,()=>hair10(g,BX,BY,CW,CH,tint(CLOTH,-.12),1042));
  /* the thin strip: one cubit where the weave is loose, and the paving shows through it between the threads */
  R(g,tx,BY,CELL,CH,tint(CLOTH,-.2));
  inRect(g,tx,BY,CELL,CH,()=>{for(let i=.4;i<CELL;i+=1.1+r()*1.2){let y=BY+r()*6;const X=tx+i+(r()-.5)*.4;while(y<BY+CH){const len=5+r()*16;
      R(g,X,y,.6,Math.min(len,BY+CH-y),r()<.7?'rgba(190,176,146,.42)':'rgba(150,136,112,.3)');y+=len+1+r()*4}}
    for(let i=0;i<CELL;i+=2+r()*2)R(g,tx+i,BY,.5,CH,rgba(tint(CLOTH,.16),.5));
    ao(g,tx,BY,2,CH,'l',.3,'#000000');ao(g,tx+CELL-2,BY,2,CH,'r',.3,'#000000')});
  /* the ends of the bolt, cut and left as they are: the threads stand out a little past the last of the weave, all the long way */
  {const rf=rng(1043);for(const[ex,d]of[[BX,-1],[BX+CW,1]])for(let y=BY+1;y<BY+CH-1;y+=.5+rf()*.6){const l=.6+rf()*1.8;R(g,d<0?ex-l:ex,y,l,.5,rgba(tint(CLOTH,.1),.8))}}
  R(g,BX,BY,CW,.5,tint(CLOTH,.3));R(g,BX,BY+CH-.5,CW,.5,tint(CLOTH,-.3));
  /* pegs at the corners, each driven in a little out from the corner and tied to it */
  for(const[px,py,cx,cy]of[[BX-3,BY-3,BX,BY],[BX+CW+1,BY-3,BX+CW,BY],[BX-3,BY+CH+1,BX,BY+CH],[BX+CW+1,BY+CH+1,BX+CW,BY+CH]])peg10(g,px,py,cx,cy);
  /* the measuring cord, one knot to the cubit: along the far edge, and down the left one. The two do not meet, and each ends loose */
  {const top=[BX+4,BY-6.4],left=[BX-6.6,BY+5];for(let x=BX+8;x<BX+CW-4;x+=8)top.push(Math.min(x,BX+CW-4),BY-6.4+Math.sin(x*.07)*.25);top.push(BX+CW-4,BY-6.4,BX+CW-1,BY-5.6);
   for(let y=BY+10;y<BY+CH-5;y+=8)left.push(BX-6.6+Math.sin(y*.09)*.25,Math.min(y,BY+CH-5));left.push(BX-6.6,BY+CH-5,BX-5.8,BY+CH-2.6);
   cord10(g,top,Array.from({length:COLS-1},(_,i)=>[BX+(i+1)*CELL,BY-6.2]),0);
   cord10(g,left,Array.from({length:ROWS_B-1},(_,j)=>[BX-6.4,BY+(j+1)*CELL]),1)}
  /* the board on which the panels are reckoned: three boards side by side, of a paler and finer wood, the joints running the long way */
  const TX=16,TY=TRAY_Y-5,TW=184,TH=30;
  soft10(g,[TX,TY,TX+TW,TY,TX+TW,TY+TH,TX,TY+TH],3.4);
  [['#94805e',0,10.4],['#8a7658',10.4,10.3],['#806c50',20.7,9.3]].forEach(([c,dy,h],i)=>{
    g.fillStyle=lg(g,0,TY+dy,0,TY+dy+h,[tint(c,.1),c,tint(c,-.1)]);g.fillRect(TX,TY+dy,TW,h);
    grain10(g,TX,TY+dy,TW,h,c,1044+i,{amp:.6,a:1.5});tex(g,'mott',.16,TX,TY+dy,TW,h,'overlay',.6);
    if(i){R(g,TX,TY+dy,TW,.6,'rgba(48,32,18,.55)');R(g,TX,TY+dy+.6,TW,.5,rgba(tint(c,.3),.5))}
    /* the end grain at each end of the board, darker */
    for(const ex of[TX,TX+TW-1.4])R(g,ex,TY+dy+.6,1.4,h-.6,rgba(tint(c,-.34),.85))});
  R(g,TX,TY,TW,.6,'#c8b088');R(g,TX,TY+TH-.8,TW,.8,'#5a4026');R(g,TX,TY,.6,TH,'#c8a878');
  pool(g,90,118,110,16,'#fff0d0',.12,'screen');
  {const rs=rng(1045);for(let i=0;i<9;i++){const sx=TX+8+rs()*(TW-24),sy=TY+3+rs()*(TH-6),l=4+rs()*8;stroke(g,[sx,sy+.4,sx+l,sy+.4+(rs()-.5)],'rgba(50,34,20,.22)',.45);stroke(g,[sx,sy,sx+l,sy+(rs()-.5)],'rgba(240,220,180,.2)',.4)}}
  /* the stool he rose from, seen from above: a round seat of one piece of wood, worn in the middle; and his pouch beside it */
  {const sx=268,sy=123,rx=17,ry=12.5,rs=rng(1046);
   soft10(g,Array.from({length:24},(_,i)=>[sx+Math.cos(i/24*6.2832)*rx,sy+Math.sin(i/24*6.2832)*ry+2]).flat(),3.6);
   oval(g,sx,sy+2,rx,ry,'#5a4026');
   clipTo(g,()=>oval(g,sx,sy,rx,ry),()=>{g.fillStyle=lg(g,sx-rx,sy-ry,sx+rx,sy+ry,['#a68a62','#8c7252','#6a5640']);g.fillRect(sx-rx,sy-ry,rx*2,ry*2);
     grain10(g,sx-rx,sy-ry,rx*2,ry*2,'#8c7252',1047,{amp:.8,a:1.4});pool(g,sx-2,sy-1,10,6,'#ffe8c0',.18,'screen');
     ao(g,sx-rx,sy+ry-3,rx*2,3,'b',.3,'#2a1c10')});
   g.strokeStyle='rgba(255,232,190,.4)';g.lineWidth=.5;g.beginPath();g.ellipse(sx,sy,rx-.3,ry-.3,0,3.4,5.2);g.stroke();
   for(let i=0;i<5;i++){const a=rs()*6.28,d=.4+rs()*.4;R(g,sx+Math.cos(a)*rx*d,sy+Math.sin(a)*ry*d,1+rs()*2,.5,'rgba(60,40,20,.3)')}}
  /* the pouch: soft leather, gathered at its neck by a thong, lying on its side */
  {const P='#7a5434',o=[231,118.6,236,115.6,242,114.2,246.6,115.4,248.4,119.4,247.6,124,243,127.4,237,127.8,232.4,125.4,230.4,121.6].map((v,i)=>i%2?v:v-6);
   soft10(g,o,2.4);poly(g,o);g.fillStyle=lg(g,231,114,247,128,[tint(P,.24),P,tint(P,-.3)]);g.fill();
   clipTo(g,()=>poly(g,o),()=>{tex(g,'mott',.4,223,113,21,16,'overlay',.5);stroke(g,[228,124,233,121,239,121.6],rgba(tint(P,-.45),.6),.6);stroke(g,[230,118,234,117.4],rgba(tint(P,.4),.45),.5);
     pool(g,230,118,5,3,'#ffe0b8',.2,'screen')});
   /* its neck, gathered, and the thong round it */
   poly(g,[240.6,115.4,244.6,113.4,246,115.6,242.4,119.4],tint(P,-.12));stroke(g,[241.2,114.8,242.8,119],'#3a2414',.7);stroke(g,[243,118.6,246,121.4,246.4,124.6],'#4a3020',.5)}
  /* the day: the sun on the open paving and the cloth; the shade of the eave lies along the foot of the wall, at the top of the view */
  lightmap(g,320,'#dcd4d8',l=>{pool(l,190,70,210,110,'#fff6e2',.5);pool(l,120,126,120,20,'#fff2dc',.35);
    l.fillStyle=lg(l,0,0,0,14,['rgba(40,40,80,.34)','rgba(40,40,80,0)']);l.fillRect(0,0,320,14);
    l.fillStyle=lg(l,0,124,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.12)']);l.fillRect(0,124,320,20)});
  comp(g,'soft-light',.22,()=>{g.fillStyle=lg(g,0,0,320,144,['#ffe0a8','rgba(255,224,168,0)']);g.fillRect(0,0,320,144)});
  pool(g,200,40,220,130,'#fff4d6',.08,'screen')},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.bolt10;if(!st)return;
  /* panels laid out on the cloth: a paler patch of the same cloth with its own tint, its threads the long way, a lit fold along its top
     and a hem of shadow on its two near sides; small stitch marks of chalk, inset, stopping clear of the corners */
  /* where a panel lies over the thin strip, its threads and its stitch marks stop at the strip, so that nothing runs across the loose
     threads */
  const sx0=BX+THIN*CELL,sx1=sx0+CELL,off=(a,b)=>[[a,Math.min(b,sx0)],[Math.max(a,sx1),b]].filter(([u,v])=>v-u>.5);
  for(const p of PIECES){const q=st.at[p.id];if(!q)continue;const x=BX+q.x*CELL,y=BY+q.y*CELL,w=q.w*CELL,h=q.h*CELL,c=earth10(p.c,.2),r=rng(1061+PIECES.indexOf(p));
    soft10(g,[x,y,x+w,y,x+w,y+h,x,y+h],1.4,.7);
    g.fillStyle=lg(g,x,y,x+w*.3,y+h,[rgba(tint(c,.14),.5),rgba(c,.42),rgba(tint(c,-.14),.38)]);g.fillRect(x,y,w,h);
    for(let j=.5;j<h-1;j+=1)for(const[u,v]of off(x+1,x+w-1)){let xx=u+r()*4;while(xx<v){const l=Math.min(v-xx,3+r()*10);if(r()<.5)R(g,xx,y+j,l,.5,rgba(r()<.5?'#fff6dc':'#000000',.07));xx+=l}}
    R(g,x,y,w,.7,rgba('#fff6dc',.5));R(g,x,y+.7,w,.5,rgba('#000000',.18));R(g,x,y,.7,h,rgba('#fff6dc',.36));
    ao(g,x,y+h-2.4,w,2.4,'b',.5,'#0c0910');ao(g,x+w-2.4,y,2.4,h,'r',.5,'#0c0910');
    for(let i=4;i<w-5;i+=5){if(x+i+2.2>sx0&&x+i<sx1)continue;R(g,x+i,y+1.8,2.2,.5,rgba('#fff6dc',.42));R(g,x+i,y+h-2.8,2.2,.5,rgba('#fff6dc',.3))}
    for(let j=4;j<h-5;j+=5){R(g,x+1.8,y+j,.5,2.2,rgba('#fff6dc',.38));R(g,x+w-2.8,y+j,.5,2.2,rgba('#fff6dc',.28))}}
  /* the panel in hand, shown where it would lie: under the pointer */
  const sel=PIECES.find(p=>p.id===st.sel);
  if(sel&&st.mx!=null&&!G.busy){const cx0=Math.floor((st.mx-BX)/CELL),cy0=Math.floor((st.my-BY)/CELL),[w,h]=st.turn[sel.id]?[sel.h,sel.w]:[sel.w,sel.h];
    if(cx0>=0&&cy0>=0&&cx0<COLS&&cy0<ROWS_B){const fits=cx0+w<=COLS&&cy0+h<=ROWS_B;g.fillStyle=rgba(fits?sel.c:'#b04a3a',.34+.08*Math.sin(t/260));g.fillRect(BX+cx0*CELL,BY+cy0*CELL,Math.min(w,COLS-cx0)*CELL,Math.min(h,ROWS_B-cy0)*CELL)}}
  /* the board: each panel small, folded, as it is turned; one that lies on the cloth leaves only its place, a little paler than the
     board round it, where the sun has not darkened the wood */
  for(const p of PIECES){const[w,h]=st.turn[p.id]?[p.h,p.w]:[p.w,p.h],x=p.tx,y=TRAY_Y;
    if(st.at[p.id]){R(g,x,y,w*TC,h*TC,'rgba(255,240,210,.12)');ao(g,x,y,w*TC,1.4,'t',.25,'#3a2818');ao(g,x,y,1.2,h*TC,'l',.2,'#3a2818');continue}
    panel10(g,x,y,w*TC,h*TC,p.c,1071+PIECES.indexOf(p));
    if(st.sel===p.id){g.fillStyle=rgba('#ffe9a8',.3+.16*Math.sin(t/200));g.fillRect(x,y,w*TC,h*TC)}}},
 front(){}};

/* ---------- The synagogue of Thessalonica ---------- */
/* Benches of stone round three sides, a low platform with the reading table, and the chest of the scrolls, which is carried in and set
   in its place (Insight, "Synagogue"). The windows have upright bars only. Nobody is seated: the hearers stand before their benches. */
ART.syn10={w:320,q:12,
 paint(g){const r=rng(1017),W='#dccfae',ST='#c4baa0';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:0,brick:'#b08a5a',t:.36});skipCracks10(r,4);
  const rw=rng(1018);beams10(g,12,38,rw);cracks10(g,1022,[[36,14,3],[124,15,4],[196,14,3],[296,15,4]]);
  /* three high windows, each with upright bars */
  for(const x of[84,152,220]){R(g,x-2,22,20,22,tint(W,-.2));g.fillStyle=lg(g,0,24,0,42,['#9cc4e4','#dfe8e2']);g.fillRect(x,24,16,18);for(let i=1;i<4;i++)R(g,x+i*4-.4,24,.8,18,'#5a4a36');ao(g,x,24,16,4,'t',.4);R(g,x-3,44,22,1.6,tint(W,.2))}
  /* the door to the street */
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  /* benches along the wall, in two tiers */
  ao(g,0,94,320,10,'b',.2,'#2a2030');bench(g,56,89,170,ST);bench(g,270,89,50,ST);
  /* two lamps in their niches */
  niche(g,60,52,W);niche(g,246,52,W);
  /* the chest of the scrolls, under a cloth of blue with a plain hem; it stands on its own feet. Its front is three upright boards */
  shadow10(g,251,104,19,2,.4,'#28203a');for(const[x,w,k]of[[236,10,0],[246,10.5,.05],[256.5,9.5,-.05]])board10(g,x,72,w,30,tint('#7a5632',k),rw,1);
  R(g,236,72,30,.8,'#b08a5a');R(g,238,101,3,3,'#4a3420');R(g,261,101,3,3,'#4a3420');ao(g,236,83,30,4,'t',.3,'#1a1420');
  g.fillStyle=lg(g,0,68,0,84,['#5a78a8','#3f5f86','#2c4668'].map(c=>earth10(c,.28)));g.fillRect(234,68,34,15);R(g,234,82,34,1.2,'#c9a14a');R(g,234,68,34,.8,earth10('#8aa4cc',.28));for(let i=0;i<5;i++)R(g,238+i*7,69.6,.5,9.6+(i%2)*1.4,'rgba(20,30,60,.3)');
  /* the floor, and the platform: two boards high, with the reading table on it */
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.22,'#1a1420');
  R(g,117,121,90,4.4,'rgba(30,24,50,.12)');R(g,119,121,86,3.2,'rgba(30,24,50,.16)');R(g,120,121,84,2,'rgba(30,24,50,.2)');
  board10(g,118,114,84,7,'#7a5c36',rw);R(g,118,114,84,.8,'#b08a5a');board10(g,118,110,84,4,'#96703e',rw);R(g,118,110,84,.7,'#c8a06a');ao(g,118,114,84,2,'t',.25,'#1a1420');
  shadow10(g,160,110,26,1.2,.3);board10(g,138,100,3,10,'#5a4226',rw,1);board10(g,179,100,3,10,'#5a4226',rw,1);board10(g,134,96,52,4,'#8a683a',rw);R(g,134,96,52,.7,'#c8a06a');R(g,134,99.4,52,.7,'#4a3420');
  /* two scrolls on it, small: each a pale sheet between two rolls */
  for(const x of[140,164]){R(g,x+2,94.4,12,1.8,'#e6dcc0');R(g,x,93.8,2.6,2.8,'#b89058');R(g,x+13.4,93.8,2.6,2.8,'#b89058')}
  /* the light: each high window lights its own reveal, in a glow that is long and low and stays above the heads, and throws a patch on
     the floor in front of the benches; the room's middle is lit, its top and its near edge fall into shade */
  lightmap(g,320,'#b2a8b0',l=>{for(const x of[92,160,228]){pool(l,x,33,26,13,'#fff4d8',.7);pool(l,x,48,34,10,'#fff0d0',.3);pool(l,x-6,124,34,8,'#fff2d6',.35)}
    pool(l,160,70,170,34,'#fff0d8',.45);pool(l,160,116,190,44,'#ffeecc',.5);pool(l,160,98,40,6,'#fff4dc',.3);
    l.fillStyle=lg(l,0,0,0,24,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,320,24);l.fillStyle=lg(l,0,126,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.22)']);l.fillRect(0,126,320,18)})},
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
/* tab10: a picture kept for one key, painted by fn in room units into the rectangle x, y, w, h */
const TAB10=new Map();
function tab10(key,x,y,w,h,fn){let c=TAB10.get(key);if(!c){const[cc,cg]=mk(Math.ceil(w*HR),Math.ceil(h*HR));cg.scale(HR,HR);cg.translate(-x,-y);fn(cg);c=cc;TAB10.set(key,c)}return c}
/* hand10: a line of writing as a scribe's hand looks from a little way off: words of a few strokes each, the pen going up and down as it
   runs on, and a space between the words. The pen only ever moves on along the line, so that no stroke crosses another. */
function hand10(g,x,y,end,r,col,lw,hh){hh=hh||1;let xx=x;while(xx<end-1.5){const wl=Math.min(end-xx,2+r()*5.5),p=[xx,y-r()*.4*hh];let up=1,X=xx;
    while(X<xx+wl){X+=.4+r()*.8;const q=r();p.push(X,up?y-(q<.1?1.8:q<.3?.5:.7+r()*.6)*hh:y+(q<.07?.9:r()*.25)*hh);up=q<.3?up:!up}
    stroke(g,p,col,lw||.45);xx=X+1.1+r()*1.4}}
/* roll10: a roll of papyrus lying on the table, its axis running away from us: a plain cylinder, no handle standing out of it and no
   tie round it. Its outer side shows the fibres of the back of the sheet, which run along the roll; its two ends are darker with
   handling; it throws a soft shade on the table to its right. */
function roll10(g,rx,rw,seed){const r=rng(seed),y0=SY-2,h=SHH+4,P='#c8b080';
  soft10(g,[rx,y0+1,rx+rw,y0+1,rx+rw,y0+h,rx,y0+h],2.6,.9);
  g.fillStyle=lg(g,rx,0,rx+rw,0,[[0,tint(P,-.5)],[.1,tint(P,-.16)],[.26,tint(P,.22)],[.36,tint(P,.3)],[.5,tint(P,.08)],[.74,tint(P,-.18)],[.9,tint(P,-.38)],[1,tint(P,-.58)]]);g.fillRect(rx,y0,rw,h);
  inRect(g,rx,y0,rw,h,()=>{for(let i=0;i<rw*2.4;i++){const fx=rx+.5+r()*(rw-1),l=6+r()*24,fy=y0+r()*(h-l);R(g,fx,fy,.5,l,r()<.5?'rgba(120,90,44,.12)':'rgba(255,246,214,.12)')}
    tex(g,'mott',.22,rx,y0,rw,h,'overlay',.5);
    ao(g,rx,y0,rw,4,'t',.3,'#5a3c16');ao(g,rx,y0+h-4,rw,4,'b',.36,'#4a3012')});
  /* the ends: the edges of the turns, a little paler, and the lip of the outermost turn */
  R(g,rx+.5,y0,rw-1,.7,'#efe0b4');R(g,rx+.5,y0+h-.7,rw-1,.7,'#5a4426');R(g,rx,y0,.5,h,'rgba(60,40,20,.5)')}
/* sheet10: the open sheet between the rolls: its fibres lying across, fine dark threads among them, its edges a little ragged and
   darker with handling, and a soft shade where it bends into each roll */
function sheet10(g,sx,sw,r){const P='#e6d6a8',y0=SY,y1=SY+SHH,top=[],bot=[];
  for(let x=sx;x<=sx+sw;x+=4)top.push(Math.min(x,sx+sw),y0+(r()-.5)*.6);for(let x=sx+sw;x>=sx;x-=4)bot.push(Math.max(x,sx),y1+(r()-.5)*.6);
  const o=top.concat(bot);soft10(g,o,2,.8);
  clipTo(g,()=>poly(g,o),()=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(P,.1),P,tint(P,-.08)]);g.fillRect(sx,y0-1,sw,SHH+2);
    for(let y=y0-1;y<y1+1;){const hh=.5+r()*1.4;R(g,sx,y,sw,hh,r()<.5?rgba(tint(P,-.3),.08+r()*.1):rgba(tint(P,.5),.08+r()*.12));y+=hh}
    for(let i=0;i<sw*.9;i++){const x=sx+r()*sw,y=y0+r()*SHH;R(g,x,y,2+r()*8,.5,rgba('#8a6e40',.1+r()*.14))}
    tex(g,'mott',.28,sx,y0-1,sw,SHH+2,'overlay',.6);
    ao(g,sx,y0-1,sw,3,'t',.18,'#6a4a20');ao(g,sx,y1-2,sw,3,'b',.22,'#6a4a20');
    ao(g,sx,y0,7,SHH,'l',.3,'#6e4c1e');ao(g,sx+sw-7,y0,7,SHH,'r',.3,'#6e4c1e');pool(g,sx+sw*.4,y0+SHH*.4,sw*.4,SHH*.36,'#fff6dc',.18,'screen')})}
/* scroll10: one scroll as it lies: rolled shut, or open at its place, with the writing in two or three columns parted by a gap, not by
   a line, and the lines of the place itself darker, in a warm wash */
function scroll10(g,x,w,k,i){if(!k){const m=ROLLW+5,cx0=x+w/2;roll10(g,cx0-m,m,1101+i*7);roll10(g,cx0,m,1102+i*7);return}
  const P0=PLACE[k],f=P0.at,lw=ROLLW+Math.round(8*f),rw=ROLLW+Math.round(8*(1-f)),sx=x+lw,sw=w-lw-rw,seed=rng(1031+i*97+P0.seed),hr=rng(1111+i*31+P0.seed);
  sheet10(g,sx,sw,seed);
  const cols=sw>70?3:2,cw=(sw-6-(cols-1)*5)/cols;for(let c=0;c<cols;c++){const x0=sx+3+c*(cw+5),mid=c===(cols>2?1:0);
    if(mid)comp(g,'multiply',.2,()=>{g.fillStyle=lg(g,0,SY+4+4*3.5-2,0,SY+4+8*3.5,['rgba(224,160,64,0)','#e0a040','#e0a040','rgba(224,160,64,0)']);g.fillRect(x0-1.5,SY+4+4*3.5-2.4,cw+3,4*3.5+1.4)});
    for(let j=0;j<13;j++){const y=SY+4.6+j*3.5,hot=mid&&j>3&&j<8,len=j===12?cw*(.3+seed()*.4):cw*(.82+seed()*.18);hand10(g,x0,y,x0+len,hr,hot?'rgba(30,20,12,.95)':'rgba(64,44,26,.62)',hot?.6:.45)}}
  roll10(g,x,lw,1121+i*7+P0.seed);roll10(g,x+w-rw,rw,1122+i*7+P0.seed)}
/* tablets10: Paul's tablets, two leaves of dark wax in frames of fine wood: open side by side, or shut, one upon the other. The wax lies
   a little below the frame, whose inner edge throws a shade on it at the top and left; the writing is cut into the wax and shows pale,
   and the lines of what is read are brighter */
function tablets10(g,tx,ty,key){const Wd='#8a6238',fr=(x,y,w,h,sd)=>{const o=[x+1,y,x+w-1,y,x+w,y+1,x+w,y+h-1,x+w-1,y+h,x+1,y+h,x,y+h-1,x,y+1];
    soft10(g,o,2.4);poly(g,o);g.fillStyle=lg(g,x,y,x+w*.5,y+h,[tint(Wd,.14),Wd,tint(Wd,-.14)]);g.fill();clipTo(g,()=>poly(g,o),()=>{grain10(g,x,y,w,h,Wd,sd,{amp:.5,a:1.3});tex(g,'mott',.16,x,y,w,h,'overlay',.6)});
    R(g,x+1,y,w-2,.5,rgba(tint(Wd,.5),.8));R(g,x,y+1,.5,h-2,rgba(tint(Wd,.36),.6));R(g,x+1,y+h-.5,w-2,.5,tint(Wd,-.45));R(g,x+w-.5,y+1,.5,h-2,tint(Wd,-.4))};
  if(!key){const x=tx+28,y=ty+2,w=50,h=36;
    /* shut: the edges of the two leaves show along the near side, the upper over the lower; the cover has a shallow sunken panel */
    soft10(g,[x,y,x+w,y,x+w,y+h+1.6,x,y+h+1.6],3);R(g,x,y+h-.2,w,1.8,tint(Wd,-.32));R(g,x,y+h+.6,w,.5,tint(Wd,-.1));fr(x,y,w,h,1131);
    R(g,x+5,y+5,w-10,h-10,rgba(tint(Wd,-.16),.5));ao(g,x+5,y+5,w-10,1.6,'t',.3,'#1a0e06');ao(g,x+5,y+5,1.4,h-10,'l',.24,'#1a0e06');R(g,x+5,y+h-5.5,w-10,.5,rgba(tint(Wd,.4),.5));return}
  for(const dx of[0,55]){const x=tx+dx,y=ty;fr(x,y,52,40,1133+dx);
    const wx=x+4,wy=y+4,ww=44,wh=32,sd=rng(1051+dx+(EV[key]?EV[key].seed:0)),hr=rng(1141+dx+(EV[key]?EV[key].seed:0));
    g.fillStyle=lg(g,wx,wy,wx+ww,wy+wh,['#3a2c20','#2c2118','#241a12']);g.fillRect(wx,wy,ww,wh);
    inRect(g,wx,wy,ww,wh,()=>{tex(g,'mott',.3,wx,wy,ww,wh,'overlay',.6);pool(g,wx+12,wy+9,18,8,'#c8a878',.12,'screen');
      /* the faint marks of earlier writing, smoothed over */
      for(let j=0;j<7;j++)hand10(g,wx+3+sd()*4,wy+5.6+j*3.8+1.6,wx+ww-6,sd,'rgba(150,120,80,.08)',.4);
      ao(g,wx,wy,ww,2.4,'t',.55,'#0a0604');ao(g,wx,wy,2,wh,'l',.45,'#0a0604');R(g,wx,wy+wh-.5,ww,.5,rgba(tint(Wd,.3),.5));R(g,wx+ww-.5,wy,.5,wh,rgba(tint(Wd,.24),.4))});
    for(let j=0;j<7;j++){const hot=dx&&j>1&&j<5,y0=ty+8.6+j*3.8,end=x+7+22+sd()*14;
      hand10(g,x+7,y0+.5,end,rng(1151+dx*3+j+(EV[key]?EV[key].seed:0)),'rgba(8,4,2,.7)',hot?.7:.5);hand10(g,x+7,y0,end,rng(1151+dx*3+j+(EV[key]?EV[key].seed:0)),hot?'#f2e2b2':'rgba(176,156,112,.85)',hot?.6:.45)}}}
ART.table10={w:320,q:12,variant:tabV,
 paint(g,v){const r=rng(1019),b=v==='b',WD=b?'#7c5e36':'#6e502c',rim=15;
  /* the table: three boards of one quiet, fine-grained wood, so that it never competes with the writing and the names under the
     scrolls. Each board has its own tone and grain, which wander a little and end where they end; the joints run the long way. Where
     hands and scrolls have passed it is worn to a dull sheen; a few scratches and specks, each in a place of its own */
  g.fillStyle=lg(g,0,rim,0,144,[tint(WD,-.1),WD,tint(WD,.02),tint(WD,-.12)]);g.fillRect(0,0,320,144);
  [[rim,54,.04,1020],[54,96,0,1021],[96,144,-.06,1022]].forEach(([y0,y1,k,sd])=>{const c=tint(WD,k);R(g,0,y0,320,y1-y0,c);grain10(g,0,y0,320,y1-y0,c,sd,{amp:.7,a:.9})});
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,320,0,['#ffd8a4','#d8c8b0','#9a92a8']);g.fillRect(0,rim,320,144-rim)});
  {const rw=rng(1023);for(let i=0;i<14;i++){const warm=rw()<.5;pool(g,rw()*340-10,rim+8+rw()*(130-rim),30+rw()*60,5+rw()*10,warm?'#f0d0a0':'#3e3238',.16,warm?'soft-light':'multiply')}
   tex(g,'blotch',.12,0,rim,320,144-rim,'soft-light',.9);tex(g,'mott',.12,0,rim,320,144-rim,'overlay',.45);
   pool(g,160,84,150,30,'#ffe8c4',.1,'screen');
   for(const[sx,sy,len,an]of[[14,62,9,-.2],[110,64,8,.12],[236,60,11,-.1],[30,104,7,.3],[226,108,9,-.24],[296,92,8,.16],[88,138,10,.1],[204,140,7,-.3]]){
     const ex=sx+Math.cos(an)*len,ey=sy+Math.sin(an)*len*.5;stroke(g,[sx,sy+.5,ex,ey+.5],'rgba(30,20,12,.3)',.5);stroke(g,[sx,sy,ex,ey],'rgba(214,184,140,.22)',.5)}
   for(let i=0;i<90;i++){const x=rw()*320,y=rim+2+rw()*(140-rim);R(g,x,y,.5,.5,'rgba(30,20,14,.35)');if(rw()<.5)R(g,x,y+.5,.5,.5,'rgba(226,196,150,.18)')}}
  for(const py of[54,96]){R(g,0,py-.2,320,.7,'rgba(24,14,8,.45)');R(g,0,py+.5,320,.5,'rgba(220,180,126,.14)');ao(g,0,py-2.4,320,2.4,'b',.12,'#1a1008')}
  /* those who listen, across the table: seen from above, draped shoulders and sculpted crowns over the table's edge */
  R(g,0,0,320,rim,'#231b15');R(g,0,rim,320,1.1,'#b08a58');R(g,0,rim+1.1,320,.9,'#5a4226');ao(g,0,rim+2,320,6,'t',.38);
  const men=b?[[57,96,11.2,8.8,'#9a8664','#b8a47c','#b88a62','#d0d0d0',1,'#d0d0d0'],[160,92,10.8,8.5,'#6e8c82','#4f6f7c','#c89868','#2a1a12',0,null],[263,96,11.2,8.8,'#8e7a56','#b09a6c','#b47e52','#4a3220',0,'#4a3220']]
    :[[57,96,11.2,8.8,'#7a6880','#b8a680','#a8703f','#8a8a8a',0,'#8a8a8a'],[160,92,10.8,8.5,'#b8b09c','#587482','#c69870','#5a4026',0,null],[263,96,11.2,8.8,'#9a705a','#7a8a5a','#c08c5c','#3a2a1c',0,'#3a2a1c']];
  men.forEach(([cx,w,hrx,hry,tu,cl,sk,ha,bald,bd],i)=>{tu=earth10(tu,.16);cl=earth10(cl,.16);const mr=rng(4001+i*77+(b?0:300)),hw=w/2,shY=rim-10,hy=rim-5.4;
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
  /* each step a board seen from above at a slant, its tread lit, its nose catching the light, its riser falling into shade under it;
     the platform's edge throws a soft shade on the first */
  {const S='#6a4e2c',st=[[250,144,320,104,320,112,262,144],[262,144,320,112,320,124,284,144],[284,144,320,124,320,144]];
   soft10(g,[246,144,320,101,320,104,250,144],2,.8);
   st.forEach((q,i)=>{const c=tint(S,-.06*i);poly(g,q);g.fillStyle=lg(g,250,144,320,104,[tint(c,-.12),c,tint(c,.08)]);g.fill();
     clipTo(g,()=>poly(g,q),()=>{g.save();g.translate(q[0],q[1]);g.rotate(-Math.atan2(40,70));grain10(g,-10,-12,110,24,c,1025+i,{amp:.3,a:1.1});g.restore();
       tex(g,'mott',.18,240,100,80,44,'overlay',.6)});
     stroke(g,[q[0],q[1],q[2],q[3]],rgba(tint(c,.45),.7),.6)});
   for(const q of[[262,144,320,112,320,116,270,144],[284,144,320,124,320,128,292,144]])comp(g,'multiply',.5,()=>{poly(g,q);g.fillStyle=lg(g,0,q[3],0,q[5],['#3a2a2a','#7a6a6a']);g.fill()})}
  lightmap(g,320,b?'#c8c0b8':'#b8aeb0',l=>{pool(l,b?200:120,60,230,110,'#fff0d0',.8);pool(l,160,118,150,40,'#ffe8c0',.4);pool(l,160,76,150,22,'#fff2d8',.3);
    l.fillStyle=lg(l,0,0,0,26,['rgba(20,16,24,.22)','rgba(20,16,24,0)']);l.fillRect(0,0,320,26);
    l.fillStyle=lg(l,0,0,24,0,['rgba(20,16,24,.16)','rgba(20,16,24,0)']);l.fillRect(0,0,24,144);l.fillStyle=lg(l,320,0,296,0,['rgba(20,16,24,.16)','rgba(20,16,24,0)']);l.fillRect(296,0,24,144)})},
 light:{amb:'#ffffff'},
 draw(g,t){const st=G.tab10;if(!st)return;const n=st.n,slots=SLOT[n];
  /* each scroll and the tablets are painted once for what they show, and kept (TAB10), so that the writing is not drawn again every frame */
  st.s.forEach((k,i)=>{const[x,w]=slots[i];g.drawImage(tab10(`s${n}|${i}|${k||''}`,x-3,SY-7,w+12,SHH+17,tg=>scroll10(tg,x,w,k,i)),x-3,SY-7,w+12,SHH+17)});
  /* the tablets: two leaves of dark wax in wooden frames, open; or shut, one upon the other */
  if(st.has){const tx=106,ty=92;g.drawImage(tab10(`t|${st.t||''}`,tx-2,ty-2,114,48,tg=>tablets10(tg,tx,ty,st.t)),tx-2,ty-2,114,48)}},
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
  plaster(g,0,0,320,104,W,r,{patch:3,cracks:0,brick:'#a8845a',t:.4});skipCracks10(r,5);R(g,0,78,320,26,tint(W,-.24));tex(g,'mott',.25,0,78,320,26,'overlay',1);R(g,0,77,320,1.4,tint(W,.12));
  const rw=rng(1024);beams10(g,14,40,rw);cracks10(g,1026,[[80,14,3],[150,15,4],[206,14,3],[298,15,3]]);ao(g,0,94,320,10,'b',.24,'#2a2030');
  R(g,22,44,36,60,tint(W,-.16));doorArt(g,25,47,30,57,'#6a4a2c',r,{bands:[]});
  windowArt(g,104,40,18,14,W,{shut:1});niche(g,178,40,W);
  /* a shelf with a few vessels, and bundles against the wall: theirs, packed */
  ao(g,224,50,56,5,'t',.3,'#1a1420');board10(g,224,48,56,2,'#7a5c36',rw);for(const[x,k,c,w,h]of[[234,'jug','#8a4a2a',3.2,8],[250,'bowl','#b06a3a',4,3.2],[266,'jar','#9a5a36',4,10]])vessel(g,x,48,w,h,c,k,{noShadow:1});
  shadow10(g,294,104.6,17,2.2,.4);sack(g,286,104,8,12,'#a89468');sack(g,302,105,7,10,'#8e7a52');
  pave(g,0,103,320,144,'#bfb293',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.22,'#1a1420');
  /* a mat on the floor, its stripes woven the long way only */
  clipTo(g,()=>poly(g,[96,117,236,117,250,138,82,138]),()=>{R(g,82,117,168,21,'#a8965e');for(let i=0;i<8;i++)R(g,82,118.4+i*2.6,168,.8,i%2?'#c8b67a':'#7a6c44');tex(g,'mott',.22,82,117,168,21,'overlay',1)});
  /* the light: the lamp in its niche, its fall on the mat and the floor and the faint gleam it reaches on the shelf; the cold of the
     night by the door and the shuttered window; the top of the room and its near edge fall into the dark */
  lightmap(g,320,earth10('#4a4460',.15),l=>{nicheLight(l,185,53,36,30,'#ffc070',.95);pool(l,185,104,110,56,'#ffb060',.6);pool(l,166,127,90,12,'#ffb060',.3);pool(l,252,52,34,10,'#ffb868',.22);
    pool(l,60,110,60,40,'#5a5e90',.25);pool(l,113,47,16,10,'#5a6090',.2);
    l.fillStyle=lg(l,0,0,0,30,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,320,30);l.fillStyle=lg(l,0,124,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.32)']);l.fillRect(0,124,320,20)})},
 light:{amb:'#6e627a',wallY:103,wall:[[0,320,103,14]],lamps:[[185,96,110,'#7a5220',103,53.6]]},
 draw(g,t){flame(g,188.6,53.6,t)},front(){}};

/* ---------- The synagogue of Beroea ---------- */
/* A smaller house than the one in Thessalonica, at the foot of a mountain, which stands in its one wide window. The mountain is not
   named and nothing is said of it. The table stands at the back, under the window, and the scrolls lie open on it all day. */
/* winBer10: the one wide window of the synagogue of Beroea, and Mount Bermion in it. The opening is cut through a thick wall: its head
   in shade, the jamb on the right lit by the day outside, the sill bright. In it the mountain stands in the morning haze, far ridges
   pale behind it; it is lit from the left, its gullies run down into shade, limestone shows on its shoulders, woods dark on its lower
   slopes; on the foothills olive groves in loose rows and a few white houses. The foothills fill the bottom of the opening: the plain
   and its level lie below the sill, at the eyes of those in the room. */
function winBer10(g,W){const r=rng(1065),X0=120,X1=200,Y0=24,Y1=70;
  g.save();g.beginPath();g.rect(X0,Y0,X1-X0,Y1-Y0);g.clip();
  sky(g,320,Y1,[[0,'#5a92cc'],[.5,'#8ab8dc'],[.85,'#cfe0e2'],[1,'#e8ecdc']].map(([k,c])=>[k,earth10(c,.12)]));
  cloud(g,146,30,22,2.6,r,'#fffaf0','#b4c2d8');cloud(g,188,33,14,1.8,r,'#fffaf0','#b4c2d8');
  /* the far ridges, pale with distance */
  ridge(g,X0,X1,Y1,x=>22+16*Math.exp(-Math.pow((x-140)/26,2))+11*Math.exp(-Math.pow((x-190)/22,2))+1.4*Math.sin(x/7),['#a2b4c8','#b8c6d0']);
  ridge(g,X0,X1,Y1,x=>17+6*Math.exp(-Math.pow((x-130)/20,2))+1.2*Math.sin(x/5+1),['#98aab4','#b0bec4']);
  /* the mountain */
  const mt=x=>13+21*Math.exp(-Math.pow((x-172)/28,2))+3.2*Math.sin(x/6.5)+1.5*Math.sin(x/3.2),top=x=>Y1-mt(x),M=()=>{g.beginPath();g.moveTo(X0,Y1);for(let x=X0;x<=X1;x+=1)g.lineTo(x,top(x));g.lineTo(X1,Y1);g.closePath()};
  M();g.fillStyle=lg(g,0,34,0,Y1,['#8ea07a','#748e5c','#5e7a4a'].map(c=>earth10(c,.1)));g.fill();
  clipTo(g,M,()=>{
    /* its shade side, away from the morning sun, and the light on the side toward it */
    comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,160,0,200,0,['rgba(90,100,130,0)','rgba(90,100,130,1)']);g.fillRect(166,30,40,40)});
    comp(g,'screen',.22,()=>{g.fillStyle=lg(g,140,0,172,0,['rgba(255,240,200,0)','rgba(255,240,200,1)','rgba(255,240,200,0)']);g.fillRect(140,30,32,40)});
    /* gullies: soft wedges of shade running down from the ridge, each with a lit lip on its left */
    for(const[x,l,d]of[[150,16,-4],[160,22,-3],[176,20,3],[186,16,4],[136,12,-3],[194,10,4]]){const y=top(x);
      poly(g,[x,y+1.5,x+1.2,y+1.5,x+d+1.6,y+l,x+d,y+l],'rgba(46,58,54,.28)');stroke(g,[x-.4,y+1.5,x+d-.6,y+l],'rgba(236,232,196,.2)',.5)}
    /* limestone on the shoulders, pale and broken */
    for(let i=0;i<9;i++){const x=148+r()*38,y=top(x)+1.5+r()*7,w=2+r()*3,h=1+r()*1.6;poly(g,[x,y,x+w*.6,y-h*.3,x+w,y+h*.4,x+w*.3,y+h],rgba('#dcd6bc',.28+r()*.2));R(g,x+w*.2,y+h*.6,w*.6,.5,'rgba(60,70,60,.2)')}
    /* the woods on its lower slopes: dark dabs in clumps, lit on their upper left */
    for(let c=0;c<14;c++){const cx=X0+4+r()*72,cy=Y1-3-r()*mt(cx)*.5,cw=5+r()*8,ch=2+r()*2;
      poly(g,[cx-cw/2,cy+ch/2,cx-cw*.3,cy-ch/2,cx+cw*.2,cy-ch*.6,cx+cw/2,cy+ch*.1,cx+cw*.3,cy+ch/2],'rgba(52,76,44,.55)');
      for(let i=0;i<10;i++){const x=cx+(r()-.5)*cw*.9,y=cy+(r()-.5)*ch;R(g,x,y,1,1,r()<.5?'rgba(44,66,38,.6)':'rgba(96,124,76,.45)')}}
    tex(g,'mott',.3,X0,30,80,40,'overlay',.6)});
  /* haze in the valley between the mountain and the foothills */
  g.fillStyle=lg(g,0,52,0,64,['rgba(228,236,226,0)','rgba(228,236,226,.5)']);g.fillRect(X0,52,80,12);
  /* the foothills, nearer, warmer: olive groves in loose rows, cypresses, white houses with red roofs, each lit on its left */
  const fh=x=>7+5*Math.sin(x/12+1.2)+2*Math.sin(x/5),F=()=>{g.beginPath();g.moveTo(X0,Y1);for(let x=X0;x<=X1;x+=1)g.lineTo(x,Y1-fh(x));g.lineTo(X1,Y1);g.closePath()};
  F();g.fillStyle=lg(g,0,56,0,Y1,['#8ea060','#76884e','#62743e'].map(c=>earth10(c,.12)));g.fill();
  clipTo(g,F,()=>{for(let row=0;row<6;row++){const y0=Y1-1.5-row*1.6;for(let x=X0+(row%2)*2+r()*2;x<X1;x+=3.4+r()*1.6){if(y0<Y1-fh(x)+1)continue;R(g,x,y0,1,1,'#4e6236');R(g,x,y0-.5,.5,.5,'#a4b07a');R(g,x+.5,y0+1,1,.5,'rgba(40,46,30,.4)')}}
    tex(g,'mott',.3,X0,54,80,16,'overlay',.6)});
  for(const[hx,hy,hw,hh]of[[129,64.6,3,2],[142,65.6,3.4,2],[158,65,3,2],[175,63.6,3.4,2.2],[190,66,3,1.8]]){
    R(g,hx,hy,hw,hh,'#dcd8c4');R(g,hx+hw*.6,hy,hw*.4,hh,'#b4b4a6');poly(g,[hx-.3,hy,hx+hw+.3,hy,hx+hw,hy-.8,hx,hy-.8],'#a86a4a');R(g,hx,hy+hh,hw,.5,'rgba(40,40,30,.3)')}
  for(const[cx,cy,ch]of[[135,67,5],[164,66,6],[183,67,5]]){poly(g,[cx,cy-ch,cx+.9,cy-ch*.6,cx+1.1,cy,cx-1.1,cy,cx-.9,cy-ch*.6],'#3a5430');poly(g,[cx,cy-ch,cx-.9,cy-ch*.6,cx-1.1,cy,cx-.3,cy],'#5a7646')}
  comp(g,'screen',.12,()=>R(g,X0,58,80,12,'#e4ecdc'));g.restore();
  /* the opening in the thick wall: the head in shade, the left jamb in shade, the right jamb lit, the sill bright */
  poly(g,[116,20,204,20,200,24,120,24],tint(W,-.34));poly(g,[116,20,120,24,120,70,116,74],tint(W,-.26));poly(g,[204,20,204,74,200,70,200,24],tint(W,.04));
  poly(g,[116,74,120,70,200,70,204,74],tint(W,.22));
  ao(g,X0,Y0,80,5,'t',.36);ao(g,X0,Y0,4,46,'l',.22);R(g,116,20,88,.5,tint(W,-.5));
  tex(g,'mott',.3,114,18,92,58,'overlay',.8);
  R(g,114,74,92,2,tint(W,.24));R(g,114,74,92,.5,tint(W,.4));R(g,114,76,92,.8,tint(W,-.4));comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,76.8,0,81,['#6a5a70','rgba(106,90,112,0)']);g.fillRect(114,76.8,92,4)})}
/* benchBer10: a stone bench in two tiers, as bench() lays it, then weathered: the stone mottled, its lit edges worn and broken here and
   there, grime along its foot */
function benchBer10(g,x,y,w,c,seed){const r=rng(seed);
  /* the two tiers: each a lit top, a front face falling into shade, joints that stop at the edges of their own course */
  for(const[ty,th,fy,fh,k]of[[y,2.4,y+2.4,5,0],[y+7.4,2.2,y+9.6,5.4,-.06]]){const cc=tint(c,k);
    g.fillStyle=lg(g,0,ty,0,ty+th,[tint(cc,.3),tint(cc,.14)]);g.fillRect(x,ty,w,th);R(g,x,ty,w,.6,tint(cc,.42));
    g.fillStyle=lg(g,0,fy,0,fy+fh,[tint(cc,-.12),tint(cc,-.26),tint(cc,-.34)]);g.fillRect(x,fy,w,fh);ao(g,x,fy,w,1.4,'t',.3,'#2a2030')}
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.46));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.5));
  inRect(g,x,y,w,15,()=>{tex(g,'mott',.45,x,y,w,15,'overlay',1);tex(g,'grain',.18,x,y,w,15,'overlay',.5);
    for(let i=0;i<5;i++){const cx=x+3+r()*(w-8),cy=r()<.5?y:y+7.4;poly(g,[cx,cy,cx+1.6+r()*2,cy,cx+.8,cy+1],rgba(tint(c,-.34),.8))}
    for(let i=0;i<24;i++)R(g,x+r()*w,y+r()*15,.5,.5,rgba(tint(c,-.4),.5));
    g.fillStyle=lg(g,0,y+11,0,y+15,['rgba(70,60,50,0)','rgba(70,60,50,.34)']);g.fillRect(x,y+11,w,4)});
  R(g,x,y,.6,15,rgba(tint(c,.2),.6));R(g,x+w-.6,y,.6,15,rgba(tint(c,-.4),.6));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}
/* chestBer10: the chest of the scrolls, standing open: a frame of stiles and rails, the rails stopping at the stiles; inside, the dark of
   it, its back in shade under the top, a shelf, and the two scrolls still in it, lying along the shelves */
function chestBer10(g,rw){const x=274,y=70,w=30,h=32,Wd='#7a5632';
  shadow10(g,289,104,18,2,.4,'#28203a');board10(g,x,y,w,h,Wd,rw,1);grain10(g,x,y,w,h,Wd,1066,{amp:.3,a:.8});
  R(g,x,y,w,.8,'#b08a5a');R(g,x,y,.6,h,'#9a7448');R(g,x+w-.6,y,.6,h,'#3e2a16');R(g,276,101,3,3,'#4a3420');R(g,299,101,3,3,'#4a3420');
  g.fillStyle=lg(g,277,74,301,98,['#1e140c','#2e2016','#3a2a1c']);g.fillRect(277,74,24,24);ao(g,277,74,24,5,'t',.5,'#0a0604');ao(g,277,74,3,24,'l',.4,'#0a0604');
  R(g,300.4,74,.6,24,'rgba(190,150,100,.35)');R(g,277,97.4,24,.6,'rgba(190,150,100,.3)');
  /* the shelf between the two scrolls, its edge lit */
  R(g,277,85.6,24,1.4,'#5a3e22');R(g,277,85.6,24,.5,'#9a7448');ao(g,277,87,24,2,'t',.4,'#0a0604');
  for(const[y0,c]of[[81,'#d8c9a0'],[93.4,'#c8b488']]){comp(g,'multiply',.5,()=>R(g,280,y0+3.6,19,1,'#3a2a20'));
    g.fillStyle=lg(g,0,y0,0,y0+4,[tint(c,.2),c,tint(c,-.3)]);g.fillRect(280,y0,18,4);R(g,280,y0+.6,18,.5,'rgba(255,248,224,.5)');
    R(g,280,y0,.6,4,tint(c,-.35));R(g,297.4,y0,.6,4,tint(c,-.35))}}
ART.ber10={w:320,q:12,
 paint(g){const r=rng(1023),W='#e4d8b6',ST='#cabfa2';
  /* the first brick patch is moved from under the reading table, where it looked like a basket hung there, to the open wall right of
     the window; its draws are taken as before, so that nothing else moves */
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:0,t:.32});patches10(g,320,104,W,r,2,'#b08a5a',[[240,52]]);skipCracks10(r,3);
  const rw=rng(1028);beams10(g,18,42,rw);cracks10(g,1030,[[34,14,3],[96,14,3],[236,15,4]]);ao(g,0,94,320,10,'b',.2,'#2a2030');
  /* the window: the old view is painted into a scrap canvas only to take its draws from r, so that the door and the floor keep their
     planks and stones */
  {const g0=g;g=mk(4,4)[1];
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
  g=g0}
  winBer10(g,W);
  /* the door, the benches, a lamp, and the chest of the scrolls: open, and nearly empty */
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  benchBer10(g,56,89,52,ST,1061);benchBer10(g,212,89,52,ST,1062);niche(g,70,48,W);
  chestBer10(g,rw);
  /* the table under the window, with three scrolls lying open on it */
  shadow10(g,160,104,38,1.8,.36,'#28203a');comp(g,'multiply',.25,()=>{g.fillStyle=lg(g,0,92,0,104,['rgba(60,48,70,.8)','rgba(60,48,70,0)']);g.fillRect(124,92,72,12)});
  board10(g,122,88,76,4,'#96703e',rw);grain10(g,122,88,76,4,'#96703e',1063,{amp:.3,a:1.2});R(g,122,88,76,.7,'#d0aa72');R(g,122,91.6,76,.8,'#4a3420');
  board10(g,125,92,3,12,'#5a4226',rw,1);board10(g,192,92,3,12,'#5a4226',rw,1);ao(g,128,92,64,3,'t',.3,'#1a1420');R(g,125,92,.5,12,'#8a6a42');R(g,192,92,.5,12,'#8a6a42');
  /* each scroll lies open, its sheet a pale sliver on the board and its two rolls seen end on: each end a small rounded square, the
     turns of the roll a darker dot in it */
  for(const x of[128,150,172]){R(g,x+2,86.6,14,1.6,'#ece2c4');R(g,x+2,86.6,14,.5,'#fff6dc');R(g,x+2,87.7,14,.5,'#b8a47c');comp(g,'multiply',.4,()=>R(g,x+1,88,18,.8,'#6a5a50'));
    for(const ex of[x,x+15.4]){poly(g,[ex+.5,85.6,ex+2.1,85.6,ex+2.6,86.1,ex+2.6,88.1,ex+2.1,88.6,ex+.5,88.6,ex,88.1,ex,86.1],'#c8a468');R(g,ex,85.6,2.6,.6,'#ead2a0');R(g,ex+.4,88,2.2,.6,'#8a6a3e');R(g,ex+1,86.8,.6,.6,'#6a4a26')}}
  pave(g,0,103,320,144,'#d0c4a2',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.3,'#3a3050');ao(g,0,103,320,2.4,'t',.2,'#1a1420');
  tex(g,'blotch',.22,0,103,320,41,'soft-light',.9);{const rp=rng(1064);for(let i=0;i<10;i++){const warm=rp()<.5;pool(g,rp()*320,108+rp()*34,20+rp()*40,4+rp()*6,warm?'#fff0d0':'#7a7080',.12,warm?'soft-light':'multiply')}
   for(let i=0;i<60;i++)R(g,rp()*320,105+rp()*38,.5,.5,'rgba(60,50,40,.3)')}
  /* the window's light on the floor: a long soft patch before the table */
  pool(g,160,116,70,9,'#fff4dc',.14,'screen');
  /* the light: the wide window, its glow long and low round the opening, its fall on the table and on the floor before it; the lamp in
     its niche unlit by day; the top of the room and its near edge in shade */
  lightmap(g,320,'#bcb2b6',l=>{pool(l,160,52,84,34,'#fff6dc',.9);pool(l,160,86,60,8,'#fff4dc',.45);pool(l,160,118,200,46,'#fff0d0',.6);pool(l,160,126,70,12,'#fff6e0',.3);
    l.fillStyle=lg(l,0,0,0,24,['rgba(20,16,24,.28)','rgba(20,16,24,0)']);l.fillRect(0,0,320,24);l.fillStyle=lg(l,0,126,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.2)']);l.fillRect(0,126,320,18)})},
 light:{amb:'#ece2dc'},draw(){},front(){}};

/* ---------- The quay at Athens' harbor ---------- */
/* A quay, a ship's side and open water. The city lies inland and is not seen: no temple, no statue and no image stands in this view.
   The ship has no figurehead. Only her after part is in the picture: her mast stands further forward, out of it, so that no upright
   crosses the level line where the sea meets the sky. */
ART.quay10={w:320,q:12,
 paint(g){const r=rng(1027),ST='#cfc4a8',HZ=66,rs=rng(1032);
  /* the sky: deep overhead, hazed and warm toward the horizon; the sun stands high to the left, out of the picture, and lights a soft
     glow there; low clouds lit from above, and a few long wisps */
  sky(g,320,HZ+1,[[0,'#3f7cc0'],[.4,'#72a6d6'],[.74,'#b4d0e2'],[.92,'#e4e6d6'],[1,'#f4e8c8']].map(([k,c])=>[k,earth10(c,.12)]));
  pool(g,40,-6,150,60,'#fff0c8',.22);
  cloud(g,60,14,48,5,r,'#fff8ea','#a8b8d4');cloud(g,170,22,40,4,r,'#fff8ea','#a8b8d4');cloud(g,280,10,36,4,r,'#fff8ea','#a8b8d4');
  for(const[x0,y0,n]of[[96,8,6],[214,32,5],[10,30,4]])for(let i=0;i<n;i++){const x=x0+i*9+rs()*6;pool(g,x,y0+(rs()-.5)*1.4,10+rs()*14,.8+rs()*.8,'#ffffff',.18+.1*rs(),'source-over')}
  g.fillStyle=lg(g,0,HZ-12,0,HZ,['rgba(255,240,210,0)','rgba(255,240,210,.45)']);g.fillRect(0,HZ-12,320,12);
  /* a bare headland across the water: a far ridge in the haze, and the nearer shoulder of the land, lit on its left, its gullies in
     shade, low scrub on it; it runs down into the sea at its end */
  ridge(g,60,240,HZ,x=>1.6+1.4*Math.sin(x/23+1)+.5*Math.sin(x/7)+2.4*Math.exp(-Math.pow((x-150)/30,2)),['#b4c0cc','#cad0d2']);
  const hl=x=>Math.max(0,(5+9*Math.exp(-Math.pow((x-40)/50,2))+1.4*Math.sin(x/8))*Math.min(1,(166-x)/40));
  ridge(g,0,166,HZ,hl,['#a2a48a','#94987e']);
  clipTo(g,()=>{g.beginPath();g.moveTo(0,HZ);for(let x=0;x<=166;x+=1)g.lineTo(x,HZ-hl(x));g.lineTo(166,HZ);g.closePath()},()=>{
    for(const[x0,x1]of[[18,34],[52,66],[88,98],[118,126]])poly(g,[x0,HZ-hl(x0)+1,x0+3,HZ-hl(x0+3)+.6,x1,HZ+.5,x1-6,HZ+.5],'rgba(70,76,96,.22)');
    for(const[x0,x1]of[[6,20],[36,50],[70,86]])poly(g,[x0,HZ-hl(x0)+.4,x0+4,HZ-hl(x0+4)+.4,x1,HZ-2,x1-4,HZ-1.4],'rgba(255,244,214,.18)');
    for(let i=0;i<90;i++){const x=rs()*162,y=HZ-hl(x)*rs()*.9;R(g,x,y,.5+rs(),.5,rs()<.6?'rgba(84,96,64,.4)':'rgba(120,128,92,.35)')}
    tex(g,'mott',.3,0,HZ-16,170,16,'overlay',.6);g.fillStyle=lg(g,0,HZ-4,0,HZ,['rgba(214,222,226,0)','rgba(214,222,226,.5)']);g.fillRect(0,HZ-4,170,4)});
  /* the open sea: pale at the horizon, deep blue toward the quay; the waves are short strokes, small far off and larger near, each lit
     on its upper side; the sun's road glitters on the water at the left */
  g.fillStyle=lg(g,0,HZ,0,104,[[0,'#cfe0de'],[.1,'#9cc4d4'],[.36,'#5e98bc'],[.72,'#3f7aa2'],[1,'#2f6890']].map(([k,c])=>[k,earth10(c,.14)]));g.fillRect(0,HZ,320,38);
  for(let i=0;i<120;i++){r();r();r()}
  for(let i=0;i<260;i++){const k=Math.pow(rs(),1.15),y=HZ+.6+k*34,w=1.4+k*7*rs()+k*2,x=rs()*326-4;
    if(rs()<.55){R(g,x,y,w,.5,`rgba(226,240,244,${.14+.24*k})`);if(k>.4)R(g,x+w*.2,y+.5,w*.7,.5,`rgba(18,48,82,${.12+.16*k})`)}else R(g,x,y,w,.5,`rgba(16,46,80,${.12+.2*k})`)}
  pool(g,70,HZ+10,70,18,'#ffeec0',.16);
  for(let i=0;i<220;i++){const d=Math.pow(rs(),1.3)*32,y=HZ+.5+d,sp=3+d*.5,x=58+(rs()+rs()+rs()-1.5)*sp*1.6+d*.5,w=.8+rs()*(1+d*.08);R(g,x-w/2,y,w,.5,`rgba(255,250,228,${.35+.45*rs()})`)}
  tex(g,'mott',.12,0,HZ,320,38,'overlay',.8);
  /* the ship alongside: her after part, curved plank strakes, painted and structural wales, sternpost staying below the sea horizon,
     and bales and folded sailcloth on her after deck, clipped behind the stone edge of the quay */
  inRect(g,0,0,320,99,()=>SHARED.ship.paint(g,{seed:1029,dir:1,view:'stern',x0:182,x1:322,yBot:100,yWaist:80,
    sternRise:11.2,sternSpan:56,sternPow:2.2,palette:'shaded',gradY0:68,gradY1:100,
    waterRipples:{x0:176,x1:220,y0:88,yh:11,count:30},
    bales:[[214,16,5,'#a89468'],[232,12,7,'#8e7a52'],[250,22,4.2,'#d8cdb0'],[280,14,6,'#9a8660'],[298,16,4.8,'#b4a078']],
    pitch:{f0:.55,color:'rgba(20,12,8,.42)'},
    wale:{f0:.13,f1:.23,color:'#4c6672'},waleWear:{count:16,c1:'#7c5a38',c2:'#728e9a'},
    lowerWale:{f0:.48,f1:.55,color:'#2c1e14',hi:'#9a7448'},
    beams:{f:.33,x0:204,x1:318,step:18,w:1.8,h:1.8,color:'#20140c',hi:'#b89460'},
    scuppers:[222,262,302],
    sunGlow:{comp:'screen',a:.25,x0:180,x1:230,stops:['rgba(255,232,184,1)','rgba(255,232,184,0)'],rx:178,ry:66,rw:54,rh:35},
    turnShade:{comp:'multiply',a:.3,x0:230,x1:320,stops:['rgba(96,96,144,0)','rgba(96,96,144,1)'],rx:228,ry:66,rw:94,rh:35},
    rail:{x0:183,x1:322,h:1.6,color:'#a37c4a',hi:'#f0d49c'},
    stern:{thick:3,sweep:7.5,headRise:1.4,rimCol:'#f0d49c',capCol:'#c89a60'},
    rudders:[{loom:[190,74,193,74,187,96,184,96],blade:[183.5,94,187.5,94,186,100,181.5,100],hi:[190.4,74.4,184.4,96]}]}));
  /* the quay: dressed stone, two mooring stones, a stack of jars, and a coil of rope */
  /* the water at the quay's edge: dark under its lip, with a line of foam where the swell slaps the stone */
  ao(g,0,93,176,6,'b',.3,'#0e2238');{const rf=rng(1033);for(let x=0;x<320;){const l=2+rf()*7;R(g,x,98.2+rf()*.5,l,.5,`rgba(236,246,246,${.3+.3*rf()})`);x+=l+rf()*4}}
  /* the coping of the quay: long dressed blocks, their tops worn smooth and lit, the far lip rounded and catching the light, the joints
     stopping at the edge of the course; and the paving behind (the old ashlar is drawn into a scrap canvas so that the paving keeps its
     stones where they were) */
  {const[,sg]=mk(4,4);ashlar(sg,0,99,320,7,tint(ST,-.2),r,{bw:16,bh:7,v:.08})}
  pave(g,0,105,320,144,ST,r,{vx:160,vy:60,rows:5,step:38,v:.15,joint:'#958c76'});
  {const rc=rng(1034),C=tint(ST,-.06);R(g,0,99,320,6.4,tint(C,-.3));let x=-rc()*12;
   while(x<320){const w=18+rc()*14,c=tint(C,(rc()-.5)*.16);
     g.fillStyle=lg(g,0,99,0,105,[tint(c,.22),c,tint(c,-.1)]);g.fillRect(x+.4,99.4,w-.8,5.4);
     inRect(g,x+.4,99.4,w-.8,5.4,()=>{tex(g,'mott',.4,x,99,w,6,'overlay',1);ao(g,x,103.4,w,1.4,'b',.2,'#3a3040');
       if(rc()<.5)R(g,x+2+rc()*(w-8),100.6+rc()*2.4,2+rc()*4,.5,rgba(tint(c,-.3),.6));else{rc();rc();rc()}});
     R(g,x+.6,99.2,w-1.2,.6,tint(c,.4));R(g,x+.4,104.4,w-.8,.5,tint(c,-.28));x+=w}
   ao(g,0,104.8,320,1.6,'t',.3,'#3a3248')}
  /* the paving: each slab a little dished, the sun warm on it, grit along the joints, the odd crack */
  tex(g,'blotch',.3,0,105,320,39,'soft-light',.9);
  {const rp=rng(1035);for(let i=0;i<12;i++){const warm=rp()<.5;pool(g,rp()*320,108+rp()*34,20+rp()*40,4+rp()*6,warm?'#fff0d0':'#7a7080',.14,warm?'soft-light':'multiply')}
   for(let i=0;i<70;i++){const x=rp()*320,y=106+rp()*37;R(g,x,y,.5,.5,'rgba(60,50,40,.35)')}}
  ao(g,0,105,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.36,()=>{g.fillStyle=lg(g,0,0,320,0,[[0,'rgba(255,226,176,.9)'],[.45,'rgba(255,238,206,.6)'],[1,'rgba(150,164,210,.7)']]);g.fillRect(0,105,320,39)});
  /* the shadows of what stands on the quay fall short and to the right, away from the high sun */
  for(const[x,y,h,w]of[[150,111,9,4],[236,111,9,4],[36,112,12,3],[50,113,12,3],[64,114,12,3],[43,109,12,3]])shade(g,[x-w,y,x+w,y,x+w+h*.7,y+h*.18,x-w+h*.5,y+h*.2],'#8a8cbe',.45);
  /* the mooring stones: weathered, with a darker foot and a soft shadow */
  for(const x of[150,236]){shadow10(g,x+2,111.4,6.4,1.8,.42,'#1e1a32');g.fillStyle=lg(g,x-4,0,x+4,0,['#9a9484','#d6d0bf','#b8b2a2','#7e786c']);g.fillRect(x-4,102,8,9);
    inRect(g,x-4,102,8,9,()=>{tex(g,'mott',.3,x-4,102,8,9,'overlay',1);ao(g,x-4,107,8,4,'b',.3,'#2a2030')});oval(g,x,102,4,1.4,'#e4ded0');oval(g,x-.6,101.8,2.6,.8,'#eee8da')}
  SHARED.ship.hawser(g,183,79,152,102.5,3.5);
  for(const[x,y]of[[38,112.6],[52,113.6],[66,114.4]])shadow10(g,x,y,5,1.4,.32);
  for(const[x,y,c]of[[36,112,'#9a5a36'],[50,113,'#a8642e'],[43,108,'#8a4a2a'],[64,114,'#9a5a36']])vessel(g,x,y,4,13,c,'amph');
  shadow10(g,113,117,10,2.6,.3);/* the coil: each turn a twisted rope, dark on its under side and lit along its top, the lay of the strands as short lighter dashes */
  for(let i=0;i<3;i++){const ex=(c,w,dy,a0,a1)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.ellipse(112,116-i*1.4+dy,8-i,2.6-i*.3,0,a0||0,a1||6.2832);g.stroke()};
    ex('#5a4c30',1.6,0);ex('#8a7a52',1.1,-.15);ex('#b8a878',.5,-.45,3.3,6.1);g.setLineDash([.6,1.2]);ex('rgba(240,226,180,.5)',.5,-.2,0,3.1);g.setLineDash([])}
  /* the gangplank, from the quay up to her side */
  SHARED.ship.gangplank(g,{x0:196,y0:83,x1:196,y1:106,w0:10,w1:16,cleats:4});
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,105,320,39)});pool(g,120,0,240,150,'#fff4d6',.12,'screen');
  /* the light: open sky leaves the far view as it is; the ship's side shades the water under her, the quay's edge throws a strip of
     shade on its own foot, and the near paving falls off a little */
  lightmap(g,320,'#ffffff',l=>{l.fillStyle=lg(l,0,88,0,100,['rgba(30,40,70,0)','rgba(30,40,70,.18)']);l.fillRect(176,88,144,12);
    l.fillStyle=lg(l,0,99,0,106,['rgba(20,16,32,.1)','rgba(20,16,32,.22)']);l.fillRect(0,99,320,7);
    l.fillStyle=lg(l,0,126,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.16)']);l.fillRect(0,126,320,18)})},
 /* the coil of rope lies inside the strip where people walk: whoever stands behind it has his feet hidden by it */
 props:[{y:117,shape(g){g.strokeStyle='#000';g.lineWidth=1.6;for(let i=0;i<3;i++){g.beginPath();g.ellipse(112,116-i*1.4,8-i,2.6-i*.3,0,0,6.2832);g.stroke()}}}],
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
/* Birds (shared/birds.js): gulls over the harbors, birds of prey, swallows and larks over open country, sparrows and doves on the
   roofs and walls of the towns; by day and in fair weather only. Scenery: they change nothing in the story. */
ROOMS.quay10.birds={gulls:[20,6,290,32],stand:[[100,100.5,1],[112,101,-1]]};

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
