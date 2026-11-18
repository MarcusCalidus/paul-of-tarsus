/* Paul of Tarsus: level data for Chapter Eight, "The Man from Macedonia".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   The road to Macedonia (Acts 16:6-15): forbidden to speak the word in Asia, not permitted to go into Bithynia, through Mysia to
   Troas, where the vision appears and Luke is with them; by Samothrace to Neapolis and Philippi; the river outside the gate, and
   Lydia's house. Acts does not say how the spirit forbade them, what road they took, how Luke joined them, which river it was or why
   Philippi had no synagogue: the chapter claims none of it, and its end screen says so. From Troas on the narration says "we", as Acts
   does from 16:10. The travel map (shared/map.js) is seen through its Aegean window. */
LEVEL(8,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A walking tune in bars of five: three steps and two, twice in a bar, on the white notes from D. On the roads (mood "hope") a lyre
   keeps the fives over a low string and a hand drum, and a pair of pipes carries a tune that never comes to rest on its own first note:
   its phrases end a step above it, or on the fifth. In the harbor and the street (mood "calm") a harp takes the lyre's place and a ney
   the pipes'. Where a road is closed (mood "tense") only a drone, a slow drum and a few notes of the oud remain; by night (mood
   "night") a drone and a harp, far apart. Beside the river (mood "rest") the same notes settle a step lower, on C, and the ney's tune
   ends there. Nothing is claimed about how music was played in Paul's day: it is not known how it sounded. */
const _=null,
 TUNE=[[[0,4,3],[3,5,2],[5,4,3],[8,3,2]],[[0,2,3],[3,3,2],[5,4,5]],[[0,4,3],[3,5,2],[5,6,3],[8,5,2]],[[0,4,5],[5,1,5]],
  [[0,7,3],[3,6,2],[5,5,3],[8,4,2]],[[0,5,3],[3,4,2],[5,3,5]],[[0,2,3],[3,3,2],[5,4,3],[8,2,2]],[[0,1,5],[5,4,5]]],
 RIVER=[[[0,6,3],[3,5,2],[5,3,5]],[[0,4,3],[3,3,2],[5,1,5]],[[0,2,3],[3,3,2],[5,4,3],[8,5,2]],[[0,6,5],[5,3,5]],
  [[0,8,3],[3,6,2],[5,5,3],[8,3,2]],[[0,4,3],[3,2,2],[5,3,5]],[[0,1,3],[3,2,2],[5,3,3],[8,0,2]],[[0,-1,10]]],
 MUSIC={dt:.23,steps:10,group:[3,2],root:50,scale:[0,2,3,5,7,9,10],bars:16,tracks:[
  {inst:'lyre',moods:['hope'],prog:'AABAABCA',len:3,seq:{A:[0,_,_,4,_,7,_,_,4,_],B:[-1,_,_,3,_,6,_,_,3,_],C:[1,_,_,4,_,8,_,_,4,_]}},
  {inst:'harp',moods:['calm'],prog:'AABAABCA',len:4,oct:12,seq:{A:[0,_,_,2,_,4,_,_,2,_],B:[-1,_,_,1,_,3,_,_,1,_],C:[1,_,_,3,_,5,_,_,3,_]}},
  {inst:'bass',moods:['hope','calm'],prog:'AABAABCA',len:5,seq:{A:[-7,_,_,_,_,-3,_,_,_,_],B:[-8,_,_,_,_,-4,_,_,_,_],C:[-6,_,_,_,_,-3,_,_,_,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d..t.d..t.',B:'d..t.d..tk'}},
  {drum:1,moods:['calm'],seq:{A:'d....t....'},vol:.4},
  {drum:1,moods:['tense'],seq:{A:'d.........'},vol:.7},
  {drone:[0,7],every:20,moods:['tense']},
  {inst:'oud',moods:['tense'],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,_,_,1,_],B:[0,_,_,_,_,-1,_,_,_,_]},vol:.6},
  {drone:[0],every:20,moods:['night'],vol:.7},
  {inst:'harp',moods:['night'],prog:'ABAC',len:6,oct:12,seq:{A:[0,_,_,_,_,4,_,_,_,_],B:[-1,_,_,_,_,3,_,_,_,_],C:[1,_,_,_,_,4,_,_,_,_]},vol:.7},
  {inst:'harp',moods:['rest'],prog:'AABAACBA',len:4,oct:12,seq:{A:[-1,_,_,1,_,3,_,_,1,_],B:[3,_,_,5,_,6,_,_,5,_],C:[2,_,_,4,_,6,_,_,4,_]}},
  {inst:'bass',moods:['rest'],prog:'AABAACBA',len:5,seq:{A:[-8,_,_,_,_,-4,_,_,_,_],B:[-4,_,_,_,_,-8,_,_,_,_],C:[-5,_,_,_,_,-8,_,_,_,_]}},
  {drum:1,moods:['rest'],prog:'AB',seq:{A:'b.........',B:'..........'},vol:.5},
  {inst:'aulos',moods:['hope'],hold:7,loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['rest'],loop:8,oct:12,lines:RIVER}]};

/* ============ ART ============ */
const SH='#8f95c8';
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* rock: a stone sitting on the ground at x,y */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.5,x-w/2,y-h,w,h,'overlay',1)})}
/* pine: a mountain pine in three tiers of needles, darker below */
function pine(g,x,y,h,c){c=c||'#3c5a44';R(g,x-.6,y-h*.3,1.4,h*.3,'#4a3626');for(let i=0;i<3;i++){const yy=y-h*(.24+i*.24),w=h*(.3-i*.07);
    poly(g,[x-w,yy,x,yy-h*.34,x+w,yy],tint(c,-.12+i*.1));poly(g,[x-w,yy,x,yy-h*.34,x-w*.1,yy],tint(c,.1+i*.1))}}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.55,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.4);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.5+k*1.3;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.24));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.3,s*.3,'rgba(40,36,70,.22)')}}
/* tree: a broad-leaved tree, its trunk leaning a little, its crown in three masses lit from the upper left */
function tree(g,x,y,h,c,r){const tw=Math.max(1.6,h*.07);stroke(g,[x,y,x-tw*.3,y-h*.3,x+tw*.4,y-h*.56],'#5a4632',tw);stroke(g,[x+tw*.3,y,x,y-h*.3,x+tw*.7,y-h*.56],'#8a765a',tw*.3);
  stroke(g,[x,y-h*.4,x-h*.16,y-h*.58],'#5a4632',tw*.5);stroke(g,[x+tw*.3,y-h*.46,x+h*.18,y-h*.62],'#5a4632',tw*.5);
  foliage(g,x-h*.14,y-h*.66,h*.24,h*.17,tint(c,-.08),r,h*3);foliage(g,x+h*.16,y-h*.7,h*.22,h*.16,c,r,h*3);foliage(g,x,y-h*.84,h*.24,h*.16,tint(c,.08),r,h*3.4)}
/* tufts: grass, or reeds, standing along a line; each blade a short stroke leaning its own way */
function tufts(g,x0,x1,y,h,c,r,n){for(let i=0;i<n;i++){const x=x0+r()*(x1-x0),hh=h*(.5+r()*.7);stroke(g,[x,y+r()*1.4,x+(r()-.5)*hh*.5,y-hh],r()<.5?c:tint(c,(r()-.5)*.4),.5)}}
/* flowers: small dabs of color in the turf, each two pixels wide and one high, so that none of them reads as a mark */
function flowers(g,x0,y0,w,h,r,n){const C=['#d84a3a','#e8c84a','#f0ece0','#b86ab0'];for(let i=0;i<n;i++){const x=x0+r()*w,y=y0+r()*h;R(g,x,y,1,.5,C[(r()*C.length)|0])}}
/* ---------- The plateau of Phrygia: where a paved road runs west, and a track leaves it for the north ---------- */
/* The two ways part like the arms of a Y: the track leaves the far side of the paved road at a slant, and nothing runs on from it across
   the near side, so that the two never make a crossing. */
const plat8=x=>13+6*Math.sin(x/71+.8)+4*Math.sin(x/23+2)+2*Math.sin(x/9);
ART.fork={w:480,fp:1.25,
 paint(g){const r=rng(811);
  sky(g,480,74,['#3b79c4','#74a6da','#b6d0e4','#ebe6d2']);cloud(g,96,12,60,7,r);cloud(g,250,22,46,5,r);cloud(g,408,10,56,6,r);
  /* far to the north: the mountains of the plateau, with the snow still on them in spring */
  snowy(g,0,480,66,plat8,['#8696be','#a8b4cc','#c9ccd0'],15);
  comp(g,'screen',.32,()=>{g.fillStyle=lg(g,0,40,0,66,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(0,40,480,26)});
  /* the plateau: long swells of steppe, green with the spring, and a few fields on them */
  ridge(g,0,480,84,x=>19+4*Math.sin(x/97+2)+2*Math.sin(x/33),['#a3b07a','#b3ba82']);
  for(let i=0;i<9;i++){const fx=14+i*52+r()*14,fy=69+r()*7;poly(g,[fx,fy,fx+26,fy-1.4,fx+32,fy+5,fx+4,fy+6.4],i%3?'rgba(110,146,78,.34)':'rgba(176,154,98,.36)')}
  R(g,0,83,480,17,'#b0b476');ridge(g,0,480,99,x=>14+3*Math.sin(x/61+1)+1.6*Math.sin(x/19+3),['#a8b26c','#bcbb7a']);
  /* a sheepfold of field stone, and a wild pear in blossom beside it */
  ashlar(g,372,79,34,5,'#b6ad94',r,{bw:5,bh:2.5,v:.12,t:.3});R(g,372,78.4,34,.8,'#d6ccb0');
  stroke(g,[414,84,413.4,76,415,71],'#5a4632',1.4);foliage(g,414,68,7,5,'#e6e2d2',r,46);foliage(g,411,71,4,3,'#9ab07a',r,14);
  for(let i=0;i<9;i++){const sx=336+i*4+r()*3,sy=82+r()*2;R(g,sx,sy,2.4,1.4,'#e8e2d0');R(g,sx+2,sy-.4,1,1,'#3a3028')}
  /* the ground on the far side of the road, the track north, and its two ruts. It narrows as it climbs, and is lost between the swells */
  earth(g,0,98,480,144,'#b8b07a',r,230);
  comp(g,'soft-light',.55,()=>{g.fillStyle=lg(g,0,98,0,144,['rgba(104,150,66,.95)','rgba(104,150,66,.25)']);g.fillRect(0,98,480,46)});
  poly(g,[232,109,272,109,300,92,306,84,301,84,290,92],'#d0c29a');
  stroke(g,[242,109,293,91,303,84],'rgba(120,104,70,.5)',.7);stroke(g,[262,109,298,92,305,84],'rgba(120,104,70,.5)',.7);
  stroke(g,[303,84,306,80,303,77],'#c6ba92',1.6);
  /* the paved road: close-fitted slabs between two kerbs, running east and west */
  pave(g,0,109,480,129,'#c6bca2',r,{vx:240,vy:58,rows:3,step:27,v:.09,joint:'#8d8670',t:.45});
  R(g,0,108,480,1.4,'#e2dac2');R(g,0,108,232,1.4,'#e2dac2');R(g,232,108,40,1.4,'#cfc4a2');R(g,0,129,480,1.6,'#a0977e');R(g,0,129,480,.5,'#d8cfb6');
  ao(g,0,109.4,480,4,'t',.2,'#3a3050');
  /* the verge on the near side: turf, thistles and the flowers of spring */
  flowers(g,0,99,480,8,r,60);flowers(g,0,131,480,12,r,150);tufts(g,0,480,142,5,'#7c9450',r,150);
  /* the milestone: a plain pillar of grey stone, flat-topped, standing on the far kerb where the track leaves. It has no wider base:
     a pillar on a plinth would be an upright on a level band */
  poly(g,[209,109,217,109,223,112,215,112],'rgba(50,40,90,.26)');
  g.fillStyle=lg(g,210,0,216,0,['#8e887c','#d6d0c0','#b4ae9e','#7e786c']);g.fillRect(210,88,6,21);R(g,210,105.6,6,3.4,'rgba(60,54,70,.25)');
  R(g,210,88,6,.7,'#e6e0d0');for(let j=0;j<3;j++)R(g,211.2,92+j*2.6,3.2+(j%2),.5,'rgba(60,56,70,.5)');tex(g,'mott',.4,208,88,10,20,'overlay',1);
  /* light, and the shadows of the clouds going over */
  comp(g,'multiply',.2,()=>{oval(g,150,118,70,9,'#6a70a8');oval(g,404,134,80,8,'#6a70a8')});
  pool(g,240,0,300,160,'#fff4d0',.12,'screen');ao(g,0,126,480,18,'b',.1,'#2a2050')},
 fore(g){const r=rng(812);rock(g,44,152,40,18,'#8a8474');rock(g,560,154,46,20,'#7e786a');
  for(let i=0;i<50;i++){const sx=90+r()*80;stroke(g,[sx,152,sx+(r()-.5)*8,134+r()*10],r()<.5?'#6f8a48':'#566e3a',.9)}
  for(let i=0;i<7;i++){const sx=96+i*10+r()*5,sy=132+r()*6;R(g,sx,sy,2,2,'#8a5a9a');R(g,sx+.4,sy-.6,1.2,.8,'#b88ac0')}
  comp(g,'source-atop',.36,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* the carrier's mule, loaded with wool, standing on the road with its head toward the west */
  beast(g,150,123,-1,0,2,null)},
 front(){}};
/* ---------- The edge of Bithynia: a river, and a ferry drawn up on its near bank ---------- */
const bith8=x=>15+6*Math.sin(x/83+1)+3*Math.sin(x/29)+1.4*Math.sin(x/7);
const FERRY=[236,318];
ART.ferry={w:480,fp:1.25,
 /* the two stones on the near bank lie a little way out on the ground */
 props:[{y:113,shape:g=>rock(g,96,113,12,6,'#948e80')},{y:114,shape:g=>rock(g,22,114,14,7,'#9a9486')}],
 paint(g){const r=rng(823);
  sky(g,480,70,['#4a80c0','#84acd6','#c2d4e2','#e8e8da']);cloud(g,70,14,54,6,r);cloud(g,330,9,62,7,r);cloud(g,438,24,36,4,r);
  /* far off beyond the river, one great mountain with snow on it; nearer, the wooded hills of Bithynia */
  snowy(g,96,376,60,x=>25*Math.exp(-Math.pow((x-232)/58,2))+4+2*Math.sin(x/9),['#8a9ac0','#aab6cc','#c8ccd2'],13);
  comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,60,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(96,34,280,26)});
  ridge(g,0,480,74,bith8,['#5d7c5c','#6e8c66']);
  for(let i=0;i<40;i++){const x=4+i*12+r()*7;pine(g,x,74-bith8(x)*(.2+r()*.6),7+r()*5,r()<.5?'#3f6048':'#4a6c50')}
  R(g,0,73,480,13,'#5f8052');ridge(g,0,480,86,x=>9+4*Math.sin(x/57+2)+2*Math.sin(x/17),['#547a4a','#6a8c58']);
  for(let i=0;i<30;i++){const x=8+i*16+r()*9;foliage(g,x,80-3*Math.sin(x/57+2)-r()*3,4+r()*3,3+r()*2,r()<.5?'#5a8448':'#4c743e',r,18)}
  /* the far bank: reeds, a strip of gravel where the ferry lands, and a path climbing into the trees */
  R(g,0,85,480,2.4,'#8c9a64');stroke(g,[272,86,281,81,277,76,283,71],'#c2b690',1.8);stroke(g,[283,71,280,67],'#b4aa88',1);R(g,254,85.4,40,1.6,'#c8bea0');
  tufts(g,0,250,86.4,5,'#6f8a4a',r,120);tufts(g,298,480,86.4,5,'#6f8a4a',r,110);
  /* the river: wide, slow and green, with the hills lying in it */
  g.fillStyle=lg(g,0,87,0,107,['#8fb8b4','#6a9ca6','#4e8094','#3f6f86']);g.fillRect(0,87,480,20);
  comp(g,'multiply',.34,()=>{g.fillStyle=lg(g,0,87,0,97,['rgba(70,110,70,1)','rgba(70,110,70,0)']);g.fillRect(0,87,480,10)});
  for(let i=0;i<150;i++){const k=r(),sy=88+k*18,sx=r()*480;R(g,sx,sy,2+k*8,.5,r()<.6?'rgba(232,246,246,.5)':'rgba(24,60,76,.3)')}
  /* the near bank: gravel and turf, and a track along it from the east to the ferry and on to the west */
  earth(g,0,106,480,144,'#b2aa8c',r,260);ao(g,0,106,480,4,'t',.3,'#2a3a50');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,106,0,144,['rgba(100,140,70,.4)','rgba(100,140,70,.9)']);g.fillRect(0,106,480,38)});
  poly(g,[0,113,480,112,480,127,0,129],'#cbbf9a');clipTo(g,()=>poly(g,[0,113,480,112,480,127,0,129]),()=>{tex(g,'mott',.5,0,110,480,20,'overlay',1);
    for(let i=0;i<2;i++)stroke(g,[0,117.4+i*6,160,117+i*6,330,116.6+i*6,480,116+i*6],'rgba(120,104,72,.45)',.8)});
  poly(g,[252,107,304,107,312,113,244,113],'#c4b894');
  tufts(g,0,480,110,4,'#7a9450',r,90);tufts(g,0,480,142,5,'#6f8a48',r,150);flowers(g,0,131,480,11,r,90);
  /* the ferryman's hut: wattle and daub under a roof of reeds */
  shade(g,[398,110,466,110,474,116,406,116],SH,.5);plaster(g,400,84,62,26,'#c8b48a',r,{patch:2,cracks:3,brick:'#8a7450',t:.6});
  poly(g,[394,85,468,85,456,68,408,68],'#a8905a');clipTo(g,()=>poly(g,[394,85,468,85,456,68,408,68]),()=>{for(let i=0;i<40;i++){const x=394+i*2;stroke(g,[x,85,x+(i%5-2)*.8+4,68],i%2?'rgba(90,70,36,.5)':'rgba(236,214,150,.4)',.6)}ao(g,394,78,74,7,'b',.35,'#3a2a14')});
  R(g,394,84.6,74,1.2,'#7a6438');R(g,420,92,13,18,'#2c2018');R(g,420,92,13,.8,'#6a5434');R(g,444,93,7,6,'#2c2018');
  /* a great plane tree by the water, and stones at its foot */
  tree(g,62,112,66,'#5c8a4a',r);shade(g,[30,112,110,112,122,122,40,122],SH,.4);rock(g,96,113,12,6,'#948e80');rock(g,22,114,14,7,'#9a9486');
  pool(g,240,0,300,160,'#fff4d0',.1,'screen');ao(g,0,128,480,16,'b',.1,'#2a2050')},
 fore(g){const r=rng(824);/* reeds, nearest us, and a stone */
  for(let i=0;i<70;i++){const sx=420+r()*150;stroke(g,[sx,154,sx+(r()-.5)*10,118+r()*18],r()<.5?'#5a743c':'#6f8a4a',1)}
  for(let i=0;i<9;i++){const sx=430+i*15+r()*6;R(g,sx,120+r()*10,1.6,5,'#5a4026')}
  rock(g,60,153,42,18,'#7a7468');comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#2c3458'))},
 draw(g,t){const[x0,x1]=FERRY;
  /* light moving on the water */
  for(let i=0;i<16;i++){const k=((t/2600+i*.0625)%1),x=(i*61+k*46)%480,y=89+(i*7)%16;R(g,x,y,5+(i%3)*2,.5,`rgba(236,248,248,${.5*Math.sin(k*3.1416)})`)}
  /* the ferry: a broad flat boat, its bow run up on the gravel; and its pole laid along it */
  oval(g,(x0+x1)/2,108.4,44,2,'rgba(20,30,50,.3)');
  poly(g,[x0,101,x1,101,x1-7,108.4,x0+9,108.4],'#5a4026');poly(g,[x0,101,x1,101,x1-1.4,102.6,x0+1.6,102.6],'#9a7646');
  for(let i=1;i<6;i++)R(g,x0+i*13,102.6,.6,5.6,'rgba(30,20,10,.4)');R(g,x0+10,104.4,x1-x0-19,.6,'rgba(236,206,150,.3)');
  stroke(g,[x0+6,100,x1-10,97],'#7a5c36',1.2);stroke(g,[x0+6,99.6,x1-10,96.6],'#b89460',.5)},
 front(){}};
/* ---------- Troas: the quay, at dusk on the day they arrive and in the morning after ---------- */
/* What is seen through the west gate of Philippi: the plain, the hills beyond it, and the road to the river. The gate adds the horizon and the sky of its scene. */
const GATE8={far:['#8ea0b8','#b2bcc8'],near:['#86a064','#9cb074'],land:'#b4bc84',road:'#e2d6b2'};
/* dyed: a bale or a bolt of dyed cloth lying at x,y, banded where it is corded. No cord runs across the bands. */
function dyed(g,x,y,w,h,c){oval(g,x+w/2+1,y+.4,w/2+2,1.3,'rgba(30,26,50,.35)');g.fillStyle=lg(g,0,y-h,0,y,[tint(c,.3),c,tint(c,-.45)]);g.fillRect(x,y-h,w,h);
  for(let i=2;i<w;i+=3)R(g,x+i,y-h,.5,h,'rgba(0,0,0,.16)');R(g,x,y-h,w,.5,tint(c,.42));R(g,x,y-h,.6,h,tint(c,.2));R(g,x+w-.6,y-h,.6,h,tint(c,-.4))}
/* blob: a soft closed outline through the given points, for cloth and for spilt oil. fold: a soft open line through them, for a crease or a hem. */
function blob(g,p,c){const n=p.length/2,m=i=>{const a=(i%n)*2,b=((i+1)%n)*2;return[(p[a]+p[b])/2,(p[a+1]+p[b+1])/2]};g.beginPath();g.moveTo(...m(n-1));
  for(let i=0;i<n;i++)g.quadraticCurveTo(p[i*2],p[i*2+1],...m(i));g.closePath();if(c){g.fillStyle=c;g.fill()}}
function fold(g,p,c,w){const n=p.length/2;g.beginPath();g.moveTo(p[0],p[1]);if(n<3)g.lineTo(p[2],p[3]);
  for(let i=1;i<n-1;i++){const e=i===n-2,j=i*2;g.quadraticCurveTo(p[j],p[j+1],e?p[j+2]:(p[j]+p[j+2])/2,e?p[j+3]:(p[j+1]+p[j+3])/2)}
  g.strokeStyle=c;g.lineWidth=w||.5;g.lineCap='round';g.lineJoin='round';g.stroke()}
/* brokenJar: the jar that slipped from its sling, one of the jars of oil that stand by the warehouse. It has broken in two at the shoulder. The belly lies on
   its side with its foot away from us, open at the break and dark inside; the neck lies beside it, open toward the belly; the shards lie where they flew, no
   two of them alike and none in a row; and the oil has run out over the stones and into the joint in front of them. cut: only the two halves, which
   stand up from the paving, and not what lies flat on it (for the room's props). */
function brokenJar(g,cut){const C='#a8562e',LIT=tint(C,.44),DK=tint(C,-.4),IN=['#1c0c06','#3a1b0e','#74401e'];
  /* the oil: the stone golden where it is wet, darker where the oil stands, the evening sky lying in it, and a dark line where it has found the joint */
  if(!cut){comp(g,'multiply',.9,()=>blob(g,[267.6,118.8,271.6,116.6,277,115.6,283,115.6,288.8,116.4,292.4,118.2,291.2,120.2,286.4,121.6,280,122.2,274,121.9,269.4,120.6],'#c8a44e'));
  comp(g,'multiply',.75,()=>blob(g,[271.6,119,276,117.3,282,117,287.6,117.6,289.8,119,286,120.5,280,121.1,274.6,120.6],'#b4883a'));
  stroke(g,[271.4,122.1,297.4,122.2],'rgba(104,72,22,.75)',.9);
  for(const p of[[275.6,117.9,280.6,117.5],[283.4,119.5,287.6,119.1]])stroke(g,p,'rgba(255,232,180,.8)',.6);
  /* the shade under the two halves */
  comp(g,'multiply',.6,()=>{blob(g,[264,111.4,267.4,116.2,271.4,118.7,277,118.4,278.6,116.4,273,115],'#5a5078');blob(g,[280.6,116.6,283.6,119.2,290.4,117.2,291.4,115.4,286,115.6],'#5a5078')})}
  /* the belly, turned on its side: its own outline, cut off at the break */
  g.save();g.translate(264.5,110.4);g.rotate(1.885);{const M=[4.9,-9,4.5,-10.3,3.5,-10.2,2.9,-11.6,1.6,-11,.5,-12.4,-.6,-11.3,-1.8,-12,-2.9,-10.6,-4,-10.8,-4.9,-9.2,
      -4.5,-8,-3.4,-7.9,-2.6,-6.9,-1.4,-7.3,-.2,-6.5,1,-7.2,2.2,-6.8,3.2,-7.7,4.2,-7.6];
    clipTo(g,()=>poly(g,[-7,2,7,2,7,-9].concat(M.slice(0,22),[-7,-9.2])),()=>vessel(g,0,0,5.2,17,C,'amph',{noShadow:1}));
    /* the broken edge all round, which shows how thick the wall is; and the hollow, with a little oil still standing in it */
    poly(g,M,LIT);poly(g,M.map((v,i)=>i%2?-9.1+(v+9.2)*.78:v*.84));g.fillStyle=lg(g,-4.2,0,4.2,0,IN);g.fill();stroke(g,[2.5,-8.2,3,-9.6],'rgba(236,196,104,.7)',.6)}g.restore();
  /* the neck: rim, throat and what is left of the shoulder, open toward the belly */
  g.save();g.translate(281.8,114.4);g.rotate(-.2);{const E=[-.2,3.6,-.5,2.4,-1.2,1.6,-.8,.4,-1.3,-.6,-.7,-1.8,-.9,-2.8,0,-3.6];
    poly(g,[.6,-4.2,1.8,-3.2,2.8,-2,3.4,-1.6,5.6,-1.6,6,-2.2,6.9,-2.3,6.9,2.3,6,2.2,5.6,1.6,3.4,1.6,2.8,2,1.8,3.2,.6,4.2].concat(E));
    g.fillStyle=lg(g,0,-4,0,4,[[0,tint(C,-.2)],[.3,tint(C,.3)],[.58,C],[1,DK]]);g.fill();
    R(g,6,-2.3,.9,4.6,tint(C,.16));R(g,6,-2.3,.9,1.4,LIT);stroke(g,[3.4,-1.5,5.6,-1.5],tint(C,.36),.5);
    poly(g,[.6,-4.2,1.7,-3,2.3,-1.2,2.2,1,1.7,3,.6,4.2].concat(E),LIT);
    poly(g,[.6,-3.5,1.5,-2.4,1.9,-1,1.7,.6,1.9,1.8,1.3,2.9,.6,3.5,-.1,2.8,-.5,1.6,-.2,.4,-.7,-.6,-.2,-1.8,-.4,-2.7]);g.fillStyle=lg(g,0,-3.5,0,3.5,IN);g.fill()}g.restore();
  /* the shards: the red outside of some, the paler inside of others, and each with a lit edge where it broke */
  if(!cut)for(const[p,c]of[[[260.8,114.6,263.8,113.8,264.8,115.5,262,116.4],C],[[277.6,109.6,280.2,109,280.8,110.6,278.4,111.2],DK],[[291.6,113.2,294.2,112.6,294.8,114.2,292.6,114.8],C],
      [[274.4,119.7,278.6,118.7,279.8,120.6,276.2,121.7],tint(C,.2)],[[285.8,122.8,287.8,122.4,288.2,123.7,286.4,124.1],DK],[[266.6,119.3,268.8,118.8,269.2,120.2],tint(C,.2)]]){
    poly(g,p.map((v,i)=>i%2?v+.7:v+.5),'rgba(40,30,50,.4)');poly(g,p,c);stroke(g,p.slice(0,4),LIT,.5)}}
/* sailHeap: old sailcloth thrown down in a heap. It is cloth and not a stone: stiff cloth stands up in peaks where it is thrown down, and hangs from them in
   hollow slopes; its folds run down from each peak like a fan, each with the light on the side that faces it and shade on the other, soft across the fold
   and sharp along its ridge; its hem lies on the paving in waves, forward where a fold comes forward; one corner lies out flat on the left, and a torn end
   lies frayed on the right. A patch is sewn on it, and a seam runs down it between two folds: no seam lies across a fold. Old sail is grayer than the
   stone it lies on, and it throws a shadow on it. The steering oar of the ship comes down behind the hollow between the two high peaks, not behind a peak:
   the heap is not a tent, and the oar is no pole. cut: only the outline of the heap itself (for the room's props). */
function sailHeap(g,cut){const LIT='#f6f0de',C='#e0d9c2',MID='#b4ac96',SHD='#80796a',DEEP='#565048',SH='#6a6488',SEAM='rgba(100,88,66,.6)',
    OUT=[410.6,116.4,413.6,114.2,416,111.8,418.6,110.2,420.8,109.4,423,107,425,104.6,427,102.8,428.8,101.8,430.6,101.6,432.4,102.6,434.2,104.6,437,106.2,440.4,107,443.4,106.2,445.6,104.8,447.6,104,
      449.6,104.4,451.2,105.8,452.8,108.2,454.8,110.8,457,113.6,458.4,116,454.8,117.4,450.8,116.2,447.2,117.6,443,116.2,439.4,117.8,435.8,116.4,432,118,427.8,116.4,424,117.8,420,116.4,416,117.8,412.6,116.8],
    /* the folds, each from under a peak to the hem: ridge, hollow, ridge, hollow... The first and the last lie outside the heap, and close its two slopes. */
    F=[[404,118,412,110,420,104],[419,110.2,417.2,114,416,117.8],[421,109.4,420.2,113.6,420,116.4],[428.6,102.2,426.4,108.6,424.6,113.4,424,117.8],[429.2,102.4,428.2,109.4,427.6,113.6,427.8,116.4],
      [429.8,102,431,109.6,431.4,114,432,118],[430.6,102.6,433.8,109.6,435.2,113.6,435.8,116.4],[431.4,102.6,436.6,109.4,438.6,113.6,439.4,117.8],[440.6,100,440.6,107,442.4,112,443,116.2],
      [447,100,446.8,104.6,446.4,111,447.2,117.6],[448,104.4,449.8,110.6,450.8,116.2],[449.2,104.6,453,110.8,454.8,117.4],[452,102,458,110,462,118]],
    rev=p=>{const o=[];for(let i=p.length-2;i>=0;i-=2)o.push(p[i],p[i+1]);return o},mid=p=>p[(p.length>>2)*2];
  if(cut)return blob(g,OUT,MID);
  comp(g,'multiply',.65,()=>blob(g,[408.6,115.8,420,113.6,440,113.8,453,114,461.4,116.4,455,118.6,440,118.8,426,119,412,119,406.8,117.8],SH));
  /* the corner that lies out flat, with its seam, and the torn end */
  poly(g,[407.4,117.9,413.6,114.6,418.6,116.6,413.4,119]);g.fillStyle=lg(g,408,115,417,119,[LIT,C]);g.fill();stroke(g,[409.8,117.6,415.4,116.4],SEAM,.4);
  poly(g,[453.6,115.4,457.4,114.6,458.4,115.6,460.6,115.4,460,116.6,461.8,117.2,459.6,117.6,460,118.6,457,118,454,118.4],MID);
  blob(g,OUT,MID);
  clipTo(g,()=>blob(g,OUT),()=>{
    for(let i=0;i+1<F.length;i++){const lit=!(i%2),x0=mid(F[i]),x1=mid(F[i+1]);poly(g,F[i].concat(rev(F[i+1])));
      g.fillStyle=lg(g,x0,0,x1,0,lit?[i?MID:C,i<7?LIT:C]:[i<7?C:MID,i===7?DEEP:SHD]);g.fill()}
    /* a patch, sewn on long ago, and a seam */
    poly(g,[420.8,111.4,423.8,110.6,424.4,114,421.4,114.8],'#c4b28c');stroke(g,[420.8,111.4,421.4,114.8,424.4,114],SHD,.4);fold(g,[432.8,105.6,435.6,110.4,437,116],SEAM,.4);
    tex(g,'mott',.3,404,98,60,22,'overlay',.5);ao(g,404,113,60,5,'b',.2,'#3a3450')})}
/* The ship lies alongside the quay with her bow to the left. In harbor her mast stands bare between its two stays, and her yard is on
   deck abaft the mast with the sail furled on it: it begins at the mast and runs aft, so that mast and yard make a corner and not a
   cross. She has no figurehead: those commonly showed a god. HULL: her side, from the quay up to the rail. */
const HULL=[226,90,240,83,422,83,434,75,440,65,444,65,443,79,434,93,420,100,250,100,236,96];
ART.troas={w:480,fp:1.25,q:12,
 variant:()=>F.vision?'m':'e',
 /* what stands or lies out on the quay, where a man can walk behind it: the jar that stands forward of the others, the two halves of the broken one
    (the oil and the shards lie flat, and hide nobody), and the heap of sailcloth */
 props:[{y:113,shape:g=>vessel(g,170,113,4.6,15,'#9a4c28','amph',{noShadow:1})},{y:118.6,shape:(g,v)=>{if(v!=='m')brokenJar(g,1)}},{y:118,shape:g=>sailHeap(g,1)}],
 light:()=>F.vision?null:{amb:'#e6c2a8',lamps:[[52,92,46,'#5a3c10']]},
 paint(g,v){const r=rng(829),eve=v!=='m',W=eve?'#d8c4a0':'#e6dcc0',ST='#cfc4a6';
  /* the sky over the sea: the sun going down into it, or the clear light of a morning with the wind in the south */
  if(eve){sky(g,480,64,['#283868','#585a92','#b86a80','#ee9858','#f8d084']);pool(g,372,62,90,38,'#ffe0a0',.7);pool(g,372,62,26,13,'#fff6d8',.9);
    for(const[cx,cy,w]of[[250,22,70],[420,14,56],[330,34,60]])cloud(g,cx,cy,w,5,r,'#f0a070','#5a4a80')}
  else{sky(g,480,64,['#4c88cc','#86b2de','#c6dcea','#eef0e2']);cloud(g,270,14,60,6,r);cloud(g,410,26,44,5,r)}
  /* the sea, and on the horizon the long low island that lies off Troas. It lies clear of the ship's mast and of her stays: a mast standing
     across a low island would be an upright over a level band */
  g.fillStyle=lg(g,0,62,0,104,eve?['#e8a868','#8a6a8a','#3c4a80','#28366a']:['#b6d4e2','#6a9cc4','#3f72a6','#2f5c90']);g.fillRect(190,62,290,42);
  ridge(g,204,262,62.6,x=>3.4*Math.sin((x-204)/58*3.1416)+.6*Math.sin(x/5),eve?['#4a4474','#5a5080']:['#7890b0','#8aa0bc']);
  for(let i=0;i<170;i++){const k=r(),sy=63+k*40,sx=190+r()*290;R(g,sx,sy,1.5+k*7,.5,r()<.6?(eve?'rgba(255,214,150,.5)':'rgba(236,246,250,.5)'):'rgba(20,30,70,.3)')}
  if(eve)for(let i=0;i<40;i++){const k=r(),sy=63+k*38;R(g,372+(r()-.5)*(8+k*40),sy,2+k*6,.6,'rgba(255,236,180,.75)')}
  /* the end of the breakwater on the far side of the harbor, with a beacon tower on it: a plain tower, square, of dressed stone. It begins
     astern of the ship, so that neither of her stays runs across it */
  poly(g,[450,65.4,480,64.6,480,68,452,68.4],eve?'#5a5078':'#a8a498');R(g,450,58,7,9,eve?'#4a4270':'#b8b4a6');R(g,450,58,7,.6,eve?'#8a7a9a':'#e2dccb');R(g,452.4,60,2,2.4,eve?'#ffd070':'#3a3430');
  /* the inn, and the warehouse beside it: two wide doors under round arches, and bales waiting before them */
  house(g,0,24,92,80,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,12,36,11,11,W,{bars:2,wood:'#6a4e2c'});windowArt(g,68,36,11,11,W,{shut:1,wood:'#6a4e2c'});
  R(g,37,56,30,48,tint(W,-.12));doorArt(g,40,59,24,45,'#7a5a3a',r);R(g,36,102.6,32,1.6,tint(W,.14));
  R(g,49,76,5,1.4,'#3a2a18');R(g,49.6,77.4,3.8,3.4,'#b8733c');R(g,49.6,77.4,3.8,.6,'#e0a064');
  ashlar(g,92,30,104,74,ST,r,{bw:13,bh:6.4,v:.09,t:.35});R(g,91,28.4,106,2,tint(ST,.16));poly(g,[196,28.4,201,32,201,104,196,104],'#9a94a8');
  for(const x of[102,150]){arch(g,x,58,38,46,tint(ST,-.3));arch(g,x+2,60,34,44,'#241a14');g.save();arch(g,x+2,60,34,44);g.clip();g.fillStyle=lg(g,0,60,0,104,['#1c1410','#4a3a2a']);g.fillRect(x+2,60,34,44);
    for(const[sx,sw,sh,c]of[[x+7,6,10,'#b8a880'],[x+19,6.6,12,'#c4b48c'],[x+30,5.6,9,'#a89870']])sack(g,sx,104,sw,sh,c);ao(g,x+2,60,34,12,'t',.6);g.restore()}
  /* the quay: its edge of great blocks, and the paving */
  ashlar(g,190,100,290,6,'#bdb298',r,{bw:16,bh:6,v:.08,t:.3});R(g,190,99.4,290,1.2,'#e6dcc2');
  pave(g,0,104,480,144,'#cdc2a6',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#958c76'});ao(g,0,104,200,5,'t',.3,'#4a4460');
  /* the ship: her hull, the wale along it, her mast and stays, the furled sail on its yard, and the steering oar at her quarter */
  stroke(g,[333,13,242,84],'#6a5a48',.5);stroke(g,[333,13,436,72],'#6a5a48',.5);
  g.fillStyle=lg(g,331,0,335,0,['#6a4a2a','#a67c4a','#5a3c20']);g.fillRect(331,12,3.4,71);R(g,331,12,3.4,.8,'#c8a06a');
  g.fillStyle=lg(g,0,75,0,82,['#efe6cc','#cfc4a4','#8a8068']);g.fillRect(336,76.4,80,5.6);for(let i=0;i<9;i++)R(g,341+i*8.6,76.4,1,5.6,'rgba(70,56,36,.5)');R(g,336,75.2,82,1.4,'#7a5632');R(g,336,75.2,82,.5,'#b89058');
  poly(g,HULL);g.fillStyle=lg(g,0,64,0,100,['#8a5e36','#6a4426','#3a2412']);g.fill();
  clipTo(g,()=>poly(g,HULL),()=>{for(let j=0;j<5;j++)stroke(g,[226,86.6+j*3.2,300,86.4+j*3.2,420,86.4+j*3,444,70+j*5],'rgba(24,14,8,.45)',.5);R(g,226,89.4,216,1.6,'#2e1c10');tex(g,'wood',.5,226,64,220,38,'overlay',.5);ao(g,226,94,220,7,'b',.4)});
  stroke(g,[240,83,422,83,434,75,440,65.4],'#c89a5e',.8);
  stroke(g,[428,78,440,104],'#5a3c20',1.6);poly(g,[437,99,442,98,446,110,441,111],'#6a4a2a');
  /* her mooring lines to two squat posts of stone on the quay, and the gangplank */
  for(const[px,sx,sy]of[[214,236,91],[456,436,84]]){stroke(g,[px+2,101,sx,sy],'#b8a880',.6);R(g,px,99,5,6.4,'#8e887a');R(g,px,99,5,.7,'#d2ccbc');R(g,px-.8,104.6,6.6,1.6,'#6e685c')}
  poly(g,[296,106,308,106,326,84,318,84],'#8a6638');stroke(g,[296,106,318,84],'#c89a5e',.6);for(let i=1;i<6;i++){const k=i/6;stroke(g,[297+k*21.6,105.4-k*21.6,308+k*18,105.4-k*21.6],'rgba(40,26,12,.5)',.5)}
  /* cargo on the quay: jars of oil, bales of dyed wool out of Asia, and the jar that slipped from its sling */
  for(const[x,h]of[[158,15],[168,16],[178,14]])vessel(g,x,110,4.6,h,'#a8562e','amph');vessel(g,170,113,4.6,15,'#9a4c28','amph');
  dyed(g,204,112,26,7,'#7a2a4a');dyed(g,208,105,22,6.4,'#6a3a7a');dyed(g,232,112,24,7,'#a03a3a');
  if(eve)brokenJar(g);
  /* old sailcloth in a heap, and a coil of line */
  sailHeap(g);
  for(const[q,c]of[[5,'#a8946a'],[3.4,'#c4b084'],[1.9,'#a8946a']]){g.strokeStyle=tint(c,-.4);g.lineWidth=1.8;g.beginPath();g.ellipse(398,112,q*1.5,q*.5,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=1;g.stroke()}
  /* the light */
  if(eve)lightmap(g,480,'#8c7c98',l=>{pool(l,372,60,230,120,'#ffd8a0',.9);l.fillStyle=lg(l,0,100,0,144,['rgba(255,214,160,.55)','rgba(255,214,160,0)']);poly(l,[300,100,444,100,480,144,230,144]);l.fill();
      pool(l,52,90,46,40,'#ffb860',.75);pool(l,52,116,60,20,'#ffb860',.4)});
  else{comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(255,246,220,0)','rgba(255,246,220,.9)']);g.fillRect(0,104,480,40)});shade(g,[0,105,196,105,208,112,0,114],SH,.4);pool(g,240,0,300,160,'#fff6dc',.12,'screen')}
  ao(g,0,126,480,18,'b',.1,'#2a2050')},
 fore(g){const r=rng(830);/* a mooring post and a coil of rope, nearest us, and a jar */
  vessel(g,46,154,12,30,'#6a3420','amph',{noShadow:1});vessel(g,560,152,11,26,'#5a2e1e','jar',{noShadow:1});
  for(const q of[15,11,7]){g.strokeStyle='#3a3020';g.lineWidth=4;g.beginPath();g.ellipse(130,146,q*1.5,q*.5,0,0,6.2832);g.stroke();g.strokeStyle='#8a7650';g.lineWidth=2.4;g.stroke()}
  comp(g,'source-atop',.45,()=>R(g,0,0,640,150,'#2c2a56'))},
 draw(g,t){/* at dusk, the lamp over the door of the inn; always, light on the water */
  if(!F.vision){flame(g,51,76.6,t);pool(g,52,78,10+Math.sin(t/170),7,'#ffb050',.2)}
  for(let i=0;i<12;i++){const k=((t/2400+i*.083)%1),x=196+(i*53+k*40)%280;if(x>226&&x<446)continue;R(g,x,70+(i*5)%26,4+(i%3)*2,.5,`rgba(250,240,214,${.55*Math.sin(k*3.1416)})`)}},
 front(){}};
/* ---------- At anchor off Samothrace, by night: the deck, as the crossing is told ---------- */
ART.deck8={w:320,q:12,
 paint(g){const r=rng(839);
  sky(g,320,86,['#0a1030','#162048','#2a3a68']);for(let i=0;i<110;i++){const x=r()*320,y=r()*70,b=r();R(g,x,y,.5,.5,`rgba(${230+b*25|0},${230+b*20|0},${200+b*55|0},${.35+b*.6})`)}
  pool(g,258,22,60,40,'#c8d4f0',.3);pool(g,258,22,9,9,'#f4f4e6',1);pool(g,258,22,5.4,5.4,'#fffff4',1);
  for(const[cx,cy,w]of[[200,30,70],[290,40,50]])cloud(g,cx,cy,w,4,r,'#55608a','#141a38');
  /* the island: one mountain standing straight out of the sea, its ridges catching the moon, and a few lights low down at its foot */
  const mt=x=>6+50*Math.exp(-Math.pow((x-128)/64,2))+12*Math.exp(-Math.pow((x-212)/40,2))+2.4*Math.sin(x/7)+1.2*Math.sin(x/3);
  ridge(g,0,320,88,mt,['#232c50','#1a2242','#121830']);
  for(let x=40;x<250;x+=.5){const h=mt(x),sl=mt(x+2)-h;if(sl<-.5)R(g,x,88-h,.5,Math.min(h*.3,1+(-sl)*.9),'rgba(150,166,214,.22)')}
  for(const[x,y]of[[176,85.4],[181,85.8],[188,85.2]])R(g,x,y,1,.6,'#ffc070');
  /* the sea, with the moon lying on it */
  g.fillStyle=lg(g,0,88,0,108,['#1a2650','#131c40','#0c1430']);g.fillRect(0,88,320,20);
  for(let i=0;i<70;i++){const k=r(),sy=89+k*17;R(g,258+(r()-.5)*(10+k*60),sy,2+k*7,.5,'rgba(214,224,250,.55)')}
  for(let i=0;i<60;i++){const k=r();R(g,r()*320,89+k*17,2+k*6,.5,'rgba(120,140,200,.2)')}
  /* the bulwark: a solid wall of planks along the ship's side, and the rail that caps it */
  wood(g,0,104,320,13,'#5a3e22');for(let j=0;j<3;j++)R(g,0,107.4+j*3.2,320,.5,'rgba(16,10,6,.5)');for(let i=0;i<8;i++)R(g,20+i*41,104.6,.6,12,'rgba(16,10,6,.4)');
  wood(g,0,101.6,320,3,'#8a6638');R(g,0,101.6,320,.6,'#c8a06a');
  /* the deck, her cargo under its cover, and the cable that runs out to the anchor */
  for(let j=0;j<6;j++){const y=117+j*4.6;wood(g,0,y,320,4.6,j%2?'#6a4a2a':'#72502e')}ao(g,0,117,320,6,'t',.5,'#0a0818');
  poly(g,[236,144,244,122,268,114,320,113,320,144],'#2c2620');poly(g,[244,122,268,114,320,113,320,117,270,118,250,125],'#463c32');for(let i=0;i<4;i++)stroke(g,[262+i*15,117,256+i*17,144],'rgba(0,0,0,.3)',.6);
  for(const q of[9,6,3.4]){g.strokeStyle='#3a3020';g.lineWidth=2.6;g.beginPath();g.ellipse(34,134,q*1.5,q*.5,0,0,6.2832);g.stroke();g.strokeStyle='#9a8660';g.lineWidth=1.4;g.stroke()}
  stroke(g,[46,132,88,118,104,103],'#9a8660',1.2);
  /* a small lamp of clay on the deck, square-built, and its light */
  R(g,150,131,5,2.6,'#8a4a2a');R(g,150,131,5,.6,'#c0744a');R(g,154.6,130.4,1.6,1,'#8a4a2a');
  lightmap(g,320,'#5a6898',l=>{pool(l,258,24,150,90,'#b8c8f0',.5);pool(l,154,128,62,30,'#ffb060',.85);pool(l,154,118,30,22,'#ffd090',.5);l.fillStyle=lg(l,0,88,0,104,['rgba(170,190,240,.4)','rgba(170,190,240,0)']);l.fillRect(190,88,130,16)})},
 draw(){},front(){}};
/* ---------- Philippi: the street inside the west gate, and the row of the sellers of purple ---------- */
/* hung: a length of dyed cloth hanging from a bar by its upper edge, in broad soft folds. The bar is hidden behind the cloth: it shows
   only beyond the ends of the row, so that no fold stands across it. */
function hung(g,x,y,w,h,c){g.fillStyle=lg(g,x,0,x+w,0,[tint(c,-.28),tint(c,.18),c,tint(c,-.34)]);g.fillRect(x,y,w,h);for(let i=2.4;i<w-1;i+=3.2){R(g,x+i,y+1,.5,h-1,'rgba(0,0,0,.2)');R(g,x+i+.6,y+1,.5,h-1,'rgba(255,255,255,.1)')}
  poly(g,[x,y+h,x+w,y+h,x+w-1,y+h+1.6,x+1,y+h+1.2],tint(c,-.38));ao(g,x,y,w,3,'t',.3)}
const AWN=[152,244];
ART.philippi={w:480,fp:1.3,
 paint(g){const r=rng(853),W='#e4d6b6',W2='#d8c8a2',ST='#cfc4a8';
  sky(g,480,60,['#3d7cc6','#76a8dc','#bcd4e6','#e8e8dc']);cloud(g,150,10,56,6,r);cloud(g,318,20,44,5,r);cloud(g,440,8,40,5,r);
  /* over the roofs: the rock the city climbs, bare limestone with a wall along its top and one square tower */
  ridge(g,200,480,50,x=>8+26*Math.exp(-Math.pow((x-352)/70,2))+2*Math.sin(x/9)+1.2*Math.sin(x/4),['#b8ae98','#a09880','#8e8872']);
  for(let i=0;i<60;i++){const x=250+r()*200,y=22+r()*26;if(y>50-(8+26*Math.exp(-Math.pow((x-352)/70,2))))R(g,x,y,2+r()*4,.5,r()<.5?'rgba(60,54,70,.3)':'rgba(240,232,210,.35)')}
  R(g,318,15.4,70,2.4,'#d2c8ae');R(g,318,15.4,70,.5,'#f0e8d0');R(g,346,9,8,8.4,'#c8bea4');R(g,346,9,8,.6,'#eee6ce');R(g,352.6,9,1.4,8.4,'rgba(60,50,90,.3)');
  for(const[x,h]of[[226,12],[236,9],[424,11]])cypress(g,x,50,h);
  /* the city wall, and the west gate: the road to the river goes out by it */
  ashlar(g,0,16,58,88,ST,r,{bw:14,bh:7,v:.09,t:.35});for(let i=0;i<58;i+=9){R(g,i,11,5.6,5,ST);R(g,i,11,5.6,.5,'#f0e6cc')}R(g,0,15.6,58,1,'#a09678');poly(g,[58,11,63,15,63,104,58,104],'#9a94a8');
  arch(g,10,52,36,52,tint(ST,-.26));gateView(g,12,54,32,50,{...GATE8,hz:66,sky:[60,['#3d7cc6','#76a8dc','#bcd4e6','#e8e8dc']]});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,28+Math.cos(a)*18-.3,70+Math.sin(a)*18-1,.6,2.6,'#a09678')}
  /* the awning maker's house: he has let a corner of his bench to a stranger from Tarsus */
  house(g,63,22,89,82,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,76,32,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,126,32,10,10,W,{shut:1,wood:'#6a4e2c'});
  R(g,72,56,72,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2a2018','#4c3a2a']);g.fillRect(74,58,68,46);
  wood(g,76,70,64,1.6,'#5a4226');for(const[sx,c]of[[80,'#2e2620'],[94,'#473c33'],[108,'#8a6a40'],[122,'#3a3029']]){g.fillStyle=lg(g,0,63,0,70,[tint(c,.25),c,tint(c,-.4)]);g.fillRect(sx,63.6,11,6.4);oval(g,sx,66.8,1.5,3.2,tint(c,.14));oval(g,sx+11,66.8,1.5,3.2,tint(c,-.3))}
  ao(g,74,58,68,10,'t',.6);ao(g,74,58,6,46,'l',.45);wood(g,70,46,2.4,59,'#6a4e2c',1);wood(g,144,46,2.4,59,'#6a4e2c',1);awning(g,68,40,80,8,'#5a4a3a','#cfc2a0',8);shade(g,[68,104,148,104,156,111,76,111],SH,.5);
  /* the bench, out in the light: a length of goat-hair cloth on it, half hemmed */
  R(g,88,97,48,9,'rgba(40,30,60,.38)');wood(g,86,95,3,11,'#6a4e2c',1);wood(g,131,95,3,11,'#6a4e2c',1);wood(g,86,90,48,4.6,'#96703e');R(g,86,94.2,48,1.2,'#5a4226');
  g.fillStyle=lg(g,0,86,0,90,['#4a4036','#2e2620','#17120f']);g.fillRect(94,86.6,30,3.6);poly(g,[118,90,128,90,131,98,124,99],'#2e2620');for(let i=0;i<9;i++)R(g,95.4+i*3.2,86.6,.5,3.6,'rgba(255,236,200,.12)');
  /* Zosime's shop, open to the street: bolts of purple on her shelves, and three lengths hung out to be seen */
  house(g,152,26,94,78,W2,r,{side:0,patch:2,cracks:4,beams:12});windowArt(g,190,34,12,10,W2,{bars:2,wood:'#6a4e2c'});
  R(g,160,56,78,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c2018','#4e3a2a']);g.fillRect(162,58,74,46);
  for(const y of[70,84]){wood(g,164,y,70,1.6,'#5a4226');for(let i=0;i<6;i++){const c=['#6a2a5a','#8a2a3a','#5a3a7a','#a03a4a','#7a3a6a','#4a2a5a'][(i+y)%6],bx=166+i*11.4;g.fillStyle=lg(g,0,y-6,0,y,[tint(c,.24),c,tint(c,-.4)]);g.fillRect(bx,y-6+(i%2),9.4,6-(i%2));R(g,bx,y-3,9.4,.4,'rgba(0,0,0,.25)')}}
  ao(g,162,58,74,10,'t',.6);ao(g,162,58,6,46,'l',.45);
  R(g,160,57.4,4,1.4,'#7a5c36');R(g,234,57.4,4,1.4,'#7a5c36');hung(g,165,57.4,20,30,'#6a2a5a');hung(g,188,57.4,20,34,'#8e2c40');hung(g,211,57.4,21,28,'#5a3a7a');
  vessel(g,170,104,4.4,9,'#7a4a6a','jar',{noShadow:1});vessel(g,226,104,5,11,'#8a4a2a','jar',{noShadow:1});
  wood(g,150.4,46,2.4,59,'#6a4e2c',1);wood(g,244,46,2.4,59,'#6a4e2c',1);shade(g,[150,104,246,104,254,111,158,111],SH,.5);
  /* the shop beside it: shut, behind shutters of oak with two bands of iron, and a stone step worn hollow */
  house(g,246,22,92,82,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,262,32,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,312,32,10,10,W,{bars:2,wood:'#6a4e2c'});
  R(g,254,54,76,50,tint(W,-.16));R(g,256,56,72,48,'#0c0806');boards(g,257,57,70,47,5.8,'#7a5632',r);ao(g,257,57,70,6,'t',.5);ao(g,257,57,3,47,'l',.4);
  for(const by of[.24,.74]){const Y=57+47*by;R(g,257,Y,70,2,'#2a2420');R(g,257,Y,70,.5,'#5a5048');for(let i=259;i<326;i+=4.6)R(g,i,Y+.5,1,1,'#7a6e60')}
  R(g,252,103,80,2,'#d8ccb0');R(g,252,104.8,80,.6,'#8a8068');
  /* the fountain at the corner: a pier of stone, a spout, and a trough */
  shade(g,[346,106,394,106,402,112,354,112],SH,.5);g.fillStyle=lg(g,362,0,374,0,['#b4aa94','#ece4ce','#a49c8a']);g.fillRect(362,68,12,30);R(g,360.6,66,14.8,2.6,'#f0e8d4');R(g,360.6,68.4,14.8,.6,'#a8a094');R(g,365,82,6,3,'#7a7466');R(g,367,82.6,2,2,'#2e2a26');
  g.fillStyle=lg(g,346,0,392,0,['#aca28c','#e8e0c8','#cec4ac','#8e8674']);g.fillRect(346,96,46,10);R(g,345,94.6,48,2,'#f0e8d4');R(g,345,96.4,48,.6,'#a8a094');R(g,348.6,95,40.8,1.2,'#4f8cb4');
  R(g,338,24,62,42,tint(W2,-.05));plaster(g,338,24,62,42,tint(W2,-.05),r,{patch:2,cracks:3});R(g,338,22.4,62,2,tint(W2,.16));
  /* the street that runs on into the city, toward the marketplace: house fronts, tiled eaves, and the paving going on */
  R(g,400,34,80,70,'#cfc4a8');g.save();g.beginPath();g.rect(400,26,80,78);g.clip();sky(g,480,82,['#76a8dc','#e2e6dc']);
  for(const[hx,hy,hw,hh,c]of[[400,40,22,64,'#d6caa8'],[458,36,22,68,'#e0d4b2'],[420,52,13,52,'#c8bc9c'],[446,56,13,48,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)');R(g,hx+hw*.3,hy+10,3,4,'#3a2c22')}
  poly(g,[424,104,458,104,447,72,437,72],'#ddd2b6');ao(g,400,26,80,12,'t',.2,'#2a2440');g.restore();poly(g,[400,24,395,27,395,104,400,104],'#9a94a8');
  /* the street itself: the great road from Asia to Rome, paved in slabs the wheels have rutted */
  pave(g,0,103,480,144,'#cfc6ae',r,{vx:240,vy:62,rows:5,step:38,v:.08,joint:'#9a927c'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  for(let i=0;i<2;i++)stroke(g,[0,121+i*9,160,120.6+i*9,330,120+i*9,480,119.6+i*9],'rgba(80,70,90,.3)',1);
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,58,104,70,112,0,114],SH,.5);shade(g,[246,104,338,104,346,109,254,109],SH,.36);
  pool(g,240,0,300,160,'#fff4d6',.12,'screen');ao(g,0,0,80,144,'l',.08,'#2a2050')},
 fore(g){const r=rng(854);/* jars of dye at the street's edge, and a hand cart's wheel */
  vessel(g,36,152,11,28,'#5a2e3e','jar',{noShadow:1});vessel(g,64,154,9,22,'#6a3420','jug',{noShadow:1});
  oval(g,556,146,17,17,'#3a2a1a');oval(g,556,146,13.6,13.6,'#7a5c36');oval(g,554.6,144.6,10,10,'#8a6c44');oval(g,556,146,3,3,'#2a1c10');
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){const[x0,x1]=AWN;
  /* Zosime's awning: one seam of it has parted, and the corner hangs and lifts in the wind, until a tentmaker closes it */
  awning(g,x0-2,40,x1-x0-12,8,'#7a3a5a','#e2d6bc',8);
  if(F.awn)awning(g,x1-14,40,14,8,'#e2d6bc','#7a3a5a',8);
  else{const f=Math.sin(t/260)*1.4;poly(g,[x1-14,40,x1,40,x1-3+f,44,x1-13,47.4+f],'#cabea4');poly(g,[x1-14,40,x1-13,47.4+f,x1-9,50+f],'#a89c84');R(g,x1-14,40,14,.6,'#f4e8cc')}
  /* water from the spout into the trough */
  const k=t/90;R(g,367.2,85,1.6,10,'#a8d8ec');for(let i=0;i<3;i++)R(g,367.2,85+((k+i*3.4)%9),1.6,1.2,'#f0fafe');
  /* people of the colony, about their business up the street */
  for(const[id,x,y,d]of TOWN)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- Outside the gate: the river, and the bank where the women sit ---------- */
const WATER=[0,95,120,92.4,240,89.6,318,86,338,86,331,90,262,98,152,105.6,0,112],STONES=[[196,122],[224,118],[254,116.4],[286,118],[312,123]];
const pang8=x=>12+9*Math.sin(x/97+.3)+4*Math.sin(x/31+1)+2*Math.sin(x/11);
ART.river={w:480,fp:1.3,
 paint(g){const r=rng(859);
  sky(g,480,70,['#3f80c8','#7aacdc','#c0d6e6','#ecead8']);cloud(g,90,14,54,6,r);cloud(g,236,8,60,6,r);cloud(g,386,22,40,4,r);
  /* far across the plain: a long mountain, blue with the morning */
  ridge(g,0,330,66,pang8,['#8494b8','#a4b0c8','#c2c8cc']);comp(g,'screen',.36,()=>{g.fillStyle=lg(g,0,40,0,66,['rgba(224,230,238,0)','rgba(224,230,238,1)']);g.fillRect(0,40,330,26)});
  /* the city on its hill, small with distance: its wall, the gate we came out by, and the road down from it */
  ridge(g,300,480,72,x=>4+16*Math.exp(-Math.pow((x-420)/60,2))+1.4*Math.sin(x/6),['#a8b07c','#b4b888']);
  R(g,380,50,84,5.6,'#d6ccb2');R(g,380,50,84,.6,'#f2ead2');for(let i=380;i<464;i+=5)R(g,i,48.4,2.6,1.8,'#d6ccb2');R(g,416,47,7,8.6,'#cabfa4');R(g,418,51,3,4.6,'#4a3c30');
  for(const[hx,hw,hh]of[[388,9,5],[402,8,6],[432,10,5],[448,9,6]]){R(g,hx,50-hh,hw,hh,'#e2d8be');R(g,hx,50-hh-1,hw,1.2,'#b8603c')}
  stroke(g,[419.6,55.6,424,62,440,72,468,84,480,90],'#d8cca8',1.6);
  /* the plain: fields, and the green of the marsh to the south of the city */
  g.fillStyle=lg(g,0,66,0,96,['#a8b47a','#9cae6c','#8ea660']);g.fillRect(0,66,480,30);tex(g,'mott',.5,0,66,480,30,'overlay',1);
  for(let i=0;i<10;i++){const fx=8+i*33+r()*10,fy=70+r()*9;poly(g,[fx,fy,fx+22,fy-1,fx+28,fy+5.6,fx+4,fy+6.6],i%3===0?'rgba(170,150,96,.36)':i%3===1?'rgba(96,136,74,.32)':'rgba(200,184,120,.3)')}
  for(const[x,y]of[[40,84],[150,80],[204,83],[292,78]]){oval(g,x+2,y+3.2,5,1,'rgba(50,60,90,.3)');R(g,x-.4,y+1,1.2,2.6,'#5a4630');foliage(g,x,y-.8,4.6,3.2,'#6a8c52',r,22)}
  /* the far bank, its reeds, and the trees that stand along the water */
  poly(g,[0,93,120,90.4,240,87.6,340,84,480,84,480,90,340,88,240,91,120,94,0,96.6],'#86a05a');
  tufts(g,0,330,92,5,'#6f8c48',r,150);
  /* the river: clear, and quick over its stones */
  poly(g,WATER);g.fillStyle=lg(g,0,86,0,112,['#b8dce0','#7fb2c4','#5a94ac','#4a8098']);g.fill();
  clipTo(g,()=>poly(g,WATER),()=>{comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,86,0,98,['rgba(80,120,70,1)','rgba(80,120,70,0)']);g.fillRect(0,86,340,12)});
    for(let i=0;i<150;i++){const k=r(),sy=88+k*24,sx=(1-k)*330*r()+k*r()*260;R(g,sx,sy,2+k*7,.5,r()<.6?'rgba(238,250,250,.6)':'rgba(24,64,84,.32)')}});
  stroke(g,[0,112,152,105.6,262,98,331,90],'rgba(240,250,250,.55)',.7);
  for(const[x,y,w,h]of[[60,104,9,4],[118,101,7,3.4],[176,100.6,8,3.6],[236,96.4,6,3]])rock(g,x,y,w,h,'#9a9486');
  tree(g,96,93,46,'#5c8a48',r);tree(g,214,90,38,'#688f50',r);tree(g,300,88,30,'#5a8648',r);
  /* the near bank: turf, flowers, and a path worn down to the water from the road */
  earth(g,0,104,480,144,'#a8ac74',r,150);
  comp(g,'soft-light',.6,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(96,146,62,.95)','rgba(96,146,62,.5)']);g.fillRect(0,104,480,40)});
  clipTo(g,()=>poly(g,[0,112,152,105.6,262,98,331,90,338,86,480,86,480,104,0,104]),()=>{g.fillStyle='#96aa64';g.fillRect(0,86,480,26);tex(g,'mott',.5,0,86,480,26,'overlay',1)});
  poly(g,[480,90,480,98,420,104,350,116,332,128,318,128,340,113,412,99],'#cfc39c');
  flowers(g,0,112,330,30,r,170);flowers(g,330,118,150,24,r,60);tufts(g,0,480,142,5,'#6f8c48',r,160);tufts(g,0,150,113,4,'#7a9650',r,50);
  /* the flat stones, set in a half circle and worn smooth: this is where they sit */
  for(const[x,y]of STONES){oval(g,x+1.4,y+1.4,11,2.6,'rgba(30,30,60,.3)');g.fillStyle=lg(g,x-10,0,x+10,0,['#8e887a','#d6d0c0','#b8b2a2','#7e786c']);g.beginPath();g.ellipse(x,y,10,2.8,0,0,6.2832);g.fill();R(g,x-8,y-2.2,14,.6,'rgba(250,246,232,.5)');R(g,x-9,y+1,18,1.4,'#7e786c')}
  /* a great plane tree on this bank, and its shade over the stones */
  comp(g,'multiply',.34,()=>{oval(g,286,123,104,13,'#7a80b4');oval(g,340,118,60,9,'#7a80b4')});comp(g,'screen',.3,()=>{for(let i=0;i<46;i++)oval(g,184+r()*180,114+r()*18,1.5+r()*3,.5+r()*.8,'#fff4c8')});
  tree(g,372,114,84,'#5a8a48',r);rock(g,398,116,12,6,'#948e80');
  pool(g,180,0,300,160,'#fff6d6',.12,'screen');ao(g,0,128,480,16,'b',.1,'#2a2050')},
 fore(g){const r=rng(860);/* reeds and iris at the water's edge, nearest us */
  for(let i=0;i<80;i++){const sx=-6+r()*130;stroke(g,[sx,154,sx+(r()-.5)*12,116+r()*20],r()<.5?'#56723a':'#6c8a48',1)}
  for(let i=0;i<8;i++){const sx=8+i*14+r()*6,sy=120+r()*12;R(g,sx,sy,2,1.6,'#e8c84a');R(g,sx+.4,sy+1.6,1.2,1,'#c8a02a')}
  rock(g,580,154,46,18,'#7a7468');comp(g,'source-atop',.36,()=>R(g,0,0,640,150,'#2c3a58'))},
 draw(g,t){/* light running down the water */
  for(let i=0;i<18;i++){const k=((t/1500+i*.0556)%1),x=320-k*320,y=87+k*19+(i%3);if(i%2)R(g,x,y,3+k*5,.5,`rgba(244,252,252,${.6*Math.sin(k*3.1416)})`)}
  /* the women of Lydia's household, with her on the Sabbath */
  if(F.sab)for(const[id,x,y,d]of HOUSEHOLD)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- Lydia's house, that evening (the closing scene) ---------- */
ART.lydia8={w:320,q:12,
 paint(g){const r=rng(863),W='#e2d2ae';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:4,brick:'#b08a5a',t:.45});R(g,0,70,320,34,'#9a4a3a');tex(g,'mott',.4,0,70,320,34,'overlay',1);R(g,0,69,320,1.6,'#e8dcc0');R(g,0,70.6,320,.6,'#6a2e24');
  for(let i=10;i<320;i+=36)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* the door to the street, and beside it the stair to the upper room */
  R(g,14,44,34,60,tint(W,-.16));doorArt(g,17,47,28,57,'#6a4a2c',r);
  for(let i=0;i<7;i++){const x=262+i*8,y=96-i*8;R(g,x,y,58-i*8,8,tint('#cabea2',-i*.02));R(g,x,y,58-i*8,.7,'#f0e6cc');R(g,x,y+7.2,58-i*8,.8,'#8a8068')}
  R(g,300,10,20,38,tint(W,-.2));R(g,302,12,18,36,'#2a1e16');ao(g,302,12,18,8,'t',.5);
  /* her store: shelves of cloth, purple, crimson and violet, and a length of the best laid out on a stand */
  wood(g,84,30,2,54,'#5a4226',1);wood(g,196,30,2,54,'#5a4226',1);
  for(const y of[42,56,70]){wood(g,84,y,114,2,'#7a5c36');for(let i=0;i<9;i++){const c=['#6a2a5a','#8e2c40','#5a3a7a','#a03a4a','#7a3a6a','#4a2a5a','#b05a6a'][(i*3+y)%7],bx=88+i*12;g.fillStyle=lg(g,0,y-8,0,y,[tint(c,.26),c,tint(c,-.4)]);g.fillRect(bx,y-8+(i%3?0:1.4),10,8-(i%3?0:1.4));R(g,bx,y-4,10,.4,'rgba(0,0,0,.25)')}}
  /* two lamps in their niches */
  for(const x of[58,222]){arch(g,x,38,14,18,tint(W,-.32));arch(g,x+1.4,39.4,11.2,16.6,'#4a3828');R(g,x-1,55.6,16,1.6,tint(W,.16));R(g,x+3.6,53,6.4,2.6,'#b8733c');R(g,x+3.6,53,6.4,.6,'#e0a064');R(g,x+9.4,52.2,1.8,1.2,'#b8733c')}
  /* the floor: slabs, and a mat woven in bands; a great jar of water by the door */
  pave(g,0,103,320,144,'#cdbf9c',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  clipTo(g,()=>poly(g,[70,113,250,113,268,138,52,138]),()=>{R(g,52,113,216,25,'#6a3a5a');for(let i=0;i<8;i++)R(g,52,114.6+i*3,216,1,i%2?'#d8b878':'#3a2238');tex(g,'mott',.4,52,113,216,25,'overlay',1);ao(g,52,113,216,5,'t',.25)});
  vessel(g,60,106,6,17,'#9a5a36','pithos');
  /* the table, set for more than her household: bread, bowls and a jug */
  R(g,112,100,96,7,'rgba(40,30,60,.36)');wood(g,110,90,96,4,'#96703e');R(g,110,93.6,96,1,'#5a4226');wood(g,110,94,3,12,'#5a4226',1);wood(g,203,94,3,12,'#5a4226',1);
  for(const x of[122,146,176])R(g,x,88,9,2,'#d8b070');for(const x of[122,146,176])R(g,x+1,87.2,7,.9,'#f0d090');
  vessel(g,162,90,3.4,3,'#b06a3a','bowl',{noShadow:1});vessel(g,194,90,3.2,8,'#8a4a2a','jug',{noShadow:1});vessel(g,136,90,3.4,3,'#a8844e','bowl',{noShadow:1});
  lightmap(g,320,'#8a7a8a',l=>{pool(l,65,48,34,30,'#ffc070',.85);pool(l,229,48,34,30,'#ffc070',.85);pool(l,65,100,70,44,'#ffb060',.4);pool(l,229,100,70,44,'#ffb060',.4);pool(l,160,116,170,44,'#ffe0b0',.5)})},
 draw(g,t){for(const x of[58,222])flame(g,x+10.6,51.6,t+x*7)},front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  /* Silas and Timothy, as they left Lystra; and Luke, a physician */
  silas8:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  timothy8:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  luke:{skin:'#c4946a',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2a1a12',ph:1100},
  /* on the roads of Asia Minor: a carrier of wool, and a ferryman */
  attalos:{skin:'#a8703f',wrap:'#a84a3a',beard:'#2a1a12',brow:'#1a1210',tunic:'#b89a5a',belt:'#3a2414',trim:'#6a5a2a',ph:500},
  kleitos:{skin:'#9a6238',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#6a7a8a',belt:'#2e2016',ph:900},
  /* Troas: a shipmaster, and the hand who was hurt */
  leon:{skin:'#a8703f',wrap:'#3a5a7a',beard:'#2a1a12',brow:'#1a1210',tunic:'#c8b888',belt:'#7a3a2a',trim:'#5a2a1e',ph:1500},
  sosias:{skin:'#b47e52',hair:'#3a2a1a',tunic:'#8a7a5a',belt:'#2e2016',slim:1,ph:2100},
  /* Philippi: an old soldier of the colony, and a seller of purple */
  quintus:{skin:'#b8845a',hair:'#a8a8a8',brow:'#7a7a7a',tunic:'#a8402c',belt:'#3a2414',trim:'#6a2418',ph:700},
  zosime:{skin:'#c89a70',veil:'#8a4a6a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#6a3a5a',brow:'#3a2414',ph:2500},
  ph1:{skin:'#c69870',hair:'#5a4026',tunic:'#e8e2d0',cloak:'#ded6c0',long:1,belt:'#8a6a2a',brow:'#3a2a1a',ph:0},ph2:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  ph3:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#8a6a4a',belt:'#2e2016',ph:0},
  /* the river: Lydia, a seller of purple from Thyatira; two of the women who meet there; and people of her household */
  lydia:{skin:'#c8a078',veil:'#6a2a5a',tunic:'#ece4d0',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#6a2a5a',brow:'#3a2414',ph:1900},
  phila:{skin:'#c89a70',veil:'#5a7a8a',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#3a5a6a',brow:'#3a2414',ph:3100},
  elpis:{skin:'#b88a62',veil:'#c8a25a',tunic:'#7a6a8a',long:1,belt:'#4a3a24',slim:1,longSleeve:1,trim:'#5a4a6a',brow:'#8a8a8a',ph:400},
  hh1:{skin:'#b88a62',veil:'#e2dccb',tunic:'#6a5a70',long:1,belt:'#4a3a24',slim:1,longSleeve:1,brow:'#8a8a8a',ph:0},hh2:{skin:'#d0a880',veil:'#b05a6a',tunic:'#d8d0b4',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,brow:'#3a2414',ph:0},
  hh3:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#9aa88a',belt:'#4a3a24',slim:1,brow:'#2a1a12',ph:0}});
/* TOWN: people of Philippi, up the street; HOUSEHOLD: who is with Lydia at the river. The account says "her household", and no more:
   they are seen, and nobody says who they are. */
const TOWN=[['ph1',428,107,-1],['ph2',446,110,1],['ph3',468,106,-1]],HOUSEHOLD=[['hh1',306,119,-1],['hh2',322,125,-1]];
/* Silas and Timothy came into Chapter Seven with actors of their own; here each has a second one, so that neither chapter disturbs the other. */
const SI=actor('silas8','Silas','#9fd8c8',118),TI=actor('timothy8','Timothy','#b8e0b0',150),LU=actor('luke','Luke','#c8e8c0',126),
  AT=actor('attalos','Attalos','#f0c890',112),KL=actor('kleitos','Kleitos','#c8d8e8',96),LE=actor('leon','Leon','#f0b088',108),SO=actor('sosias','Sosias','#e0d0a8',140),
  QU=actor('quintus','Quintus','#f0a898',100),ZO=actor('zosime','Zosime','#e8b8d8',206),LY=actor('lydia','Lydia','#e0b0e8',190),PH=actor('phila','Phila','#a8d0e0',198),EL=actor('elpis','Elpis','#f0d8a0',176);
Object.assign(ICON,{
  /* a folded cloth of clean linen */
  linen(g){IH.square(g,'#efe9d8',4.6,6.4,15,11.6,'#c4bca4');R(g,4.6,11.8,15,.6,'rgba(120,110,90,.4)')},
  /* three strips of it, rolled */
  bandage(g){for(const[y,c]of[[4.4,'#f4eedc'],[9.8,'#e6dec8'],[15.2,'#f4eedc']]){g.fillStyle=lg(g,0,y,0,y+4.4,[tint(c,.12),c,tint(c,-.24)]);g.fillRect(5,y,13,4.4);R(g,5,y,13,.6,'#fffaf0');R(g,17,y,2.4,4.4,tint(c,-.14));R(g,17.6,y+1.4,1.2,1.6,tint(c,-.4))}},
  /* an offcut of sailcloth, one edge torn */
  offcut(g){poly(g,[4,7,19,5.6,20.4,17,15,19.6,10.6,17.6,5,19]);g.fillStyle=lg(g,4,5,20,20,['#d6ccb0','#b8ad90','#8e846a']);g.fill();for(let j=8;j<18;j+=2.2)R(g,6,j,13,.5,'rgba(70,60,40,.2)')},
  /* the sling: a broad band of the same cloth, hemmed, with its tie */
  sling(g){poly(g,[3.6,8,20.4,8,17.6,18.6,6.4,18.6]);g.fillStyle=lg(g,0,8,0,19,['#d6ccb0','#b8ad90','#8e846a']);g.fill();for(let i=5.4;i<19;i+=2.2)R(g,i,9,1.1,.6,'#efe6cc');for(let i=7.4;i<17;i+=2.2)R(g,i,17.4,1.1,.6,'#efe6cc');
    stroke(g,[3.6,8,7,3.6,12,3],'#efe6cc',.9);stroke(g,[20.4,8,17,3.6,13,3.2],'#cfc4a4',.9)},
  /* a physician's bag of leather */
  lbag(g){IH.bag(g,'#7a4e2a',12,14.6,7.6,6)}});
Object.assign(ITEMS,{
  linen:{name:'linen cloth',look:"A clean linen cloth out of Timothy's bundle. His mother packed it for the day he would need it. He says that this is the day.",
    by:{luke:'Clean linen, and a good piece. Cut into strips, it is exactly what I want.'}},
  bandage:{name:'linen strips',look:"Strips of clean linen, a hand's breadth wide, cut along the thread. They are for the physician's hands, not for mine.",
    by:{luke:'Strips of clean linen, cut straight along the thread. Whoever cut these has handled cloth all his life.'}},
  offcut:{name:'old sailcloth',look:'An offcut of old sailcloth: soft with use, and sound in the middle. Enough for something small.',
    by:{luke:'A rag of sailcloth. I could not tell you what to make of it. I suspect that Paul could.'}},
  sling:{name:'arm sling',look:'A sling of sailcloth: a broad band, hemmed, with a tie to go round the neck. It is the first that I ever made.',
    by:{luke:'A sling, hemmed and tied. It will carry the weight of the arm where the weight should be.'}},
  lbag:{name:"physician's bag",look:"Luke's bag. It is his, and so is the knowledge of what to do with it.",
    by:{luke:'My bag: a flask of oil, a flask of wine, and a sponge. No linen. I used the last of it this morning.'}}});
/* how Luke describes the tools of the tentmaker's trade (set again whenever this chapter begins: see setup8) */
const BY8={awl:"The tentmaker's awl. It is to him what the probe is to me.",thread:'Waxed thread. I use a finer one, and I use it on people.',
  knife:'A knife for cloth and leather, shaped like the new moon. I leave it in the hand that knows it.',tablets:'His wax tablets: names, tasks and Scripture, written small. I keep notes of my own.'};
const inFork=()=>G.room==='fork',inBor=()=>G.room==='ferry',inTro=()=>G.room==='troas',inPhi=()=>G.room==='philippi',inRiv=()=>G.room==='river',
  eve=()=>inTro()&&!F.vision,clues=()=>!!(F.gate&&F.shop);
/* toPaul, toLuke: something put into a man's hand, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function drop(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* bring: something Paul needs for his work, which Luke happens to be carrying, comes back to him */
async function bring(id){const his=invOf(LU),i=his.indexOf(id);if(PC()===P&&i>=0){his.splice(i,1);toPaul(id,1);await say(LU,'You will want this back, Paul. Cloth is your craft.')}return invOf(P).includes(id)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line, how] sets. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1],x[2]||{}):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* think: Paul weighs what to do next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* ============ SCRIPTURE: the passages on the tablets ============ */
const PASS={
  prov16:{ref:'Proverbs 16:9',gist:'In his heart a man maps out the way he means to go, yet his steps are guided by Jehovah.'},
  isa30:{ref:'Isaiah 30:21',gist:'Should you stray to the right or to the left, your own ears will catch a word spoken behind you, telling you which is the way and to walk in it.'},
  prov15:{ref:'Proverbs 15:22',gist:'Without counsel taken together, plans come to nothing; where many advise, they succeed.'},
  isa42:{ref:'Isaiah 42:4',gist:'He will not burn low or be broken before he has set justice in place on the earth; and the islands are still waiting for his law.'},
  ps65:{ref:'Psalm 65:2',gist:'You are the one who hears prayer; people of every sort will come to you.'},
  isa53:{ref:'Isaiah 53:5',gist:'Our offense is why he was pierced; our errors are why he was crushed.'},
  ps16:{ref:'Psalm 16:10',gist:'You will not abandon me to the Grave, nor let the one who is loyal to you see the pit.'},
  kings:{ref:'2 Kings 4:8',gist:'Elisha once came to Shunem. A woman of high standing lived there, and she pressed him to stay for a meal; after that he stopped to eat at her house whenever he passed.'}},
  ORDER=['prov16','isa30','prov15','isa42','ps65','isa53','ps16','kings'];
const quote=k=>T('{text} ({ref})',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ THE MAP: the road of this chapter, leg by leg ============ */
/* ROAD: from Iconium by Antioch in Pisidia to where a paved road ran west; north until Bithynia was near; west through Mysia to Troas;
   by sea to Samothrace and to Neapolis; and up to Philippi. Acts 16:6-8 names the regions and not the roads: the line shows what is likely.
   leg(n, text, m): the map with the road so far, then leg n drawing itself (and the m legs before it), and what is told of it. */
const ROAD=[['iconium','antiochp'],['antiochp','westroad'],['westroad','bithynianroad'],['bithynianroad','troas'],['troas','samothrace','sea'],['samothrace','neapolis','sea'],['neapolis','philippi']],LABELS={};
async function leg(n,text,m){const route=ROAD.slice(0,n+1).map((l,i)=>i>=n-(m||0)?[l[0],l[1],'new '+(l[2]||'')]:l);
  try{await need('map');await SHARED.map.journey(route,{labels:LABELS,view:'aegean',text})}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC)}
/* come: the room is shown after a journey, with everyone in his place */
async function come(room,mood){place8(room);const a=PC();enterRoom(room,a.x,a.y,a.dir);if(mood)AU.mood=mood;codeBtn();await fade(0,600)}
/* ============ THE PLATEAU: a road that is closed, and a road that is open ============ */
/* The holy spirit forbade them to speak the word in the province of Asia (Acts 16:6). How, the account does not say, and
   nothing here shows it. What the player decides is what Paul does next: he was turned only after he had set out. */
async function roadWest(){const me=PC();
  if(F.asia)return say(me,'That road is closed to us. It was no man who closed it.');
  await say(P,'West, brothers: to Ephesus. Attalos, we will walk beside your mule for as far as the road goes.');
  await say(AT,'Then step out, friends. It is downhill for a week.');
  await Promise.all([walk(P,104,126),walk(SI,136,129),walk(TI,164,131)]);AU.mood='tense';await fade(1,700);
  await narr('But the province of Asia was closed to their preaching of the word: the holy spirit forbade it. (Acts 16:6)',{dur:9500});
  await narr('How this was made known to them, the account does not say.',{dur:6000});
  place(P,'fork',222,124,-1);place(SI,'fork',336,127,-1);place(TI,'fork',362,129,-1);await fade(0,700);
  await say(P,'Not Asia. Not now. And not one word of where instead.',TH);
  await think('The road to Ephesus is closed to us. What do we do?',[
    {q:'We wait here until we are told where to go.',no:'Wait for what? I was turned only after I had set out. A man who sits down at a fork has chosen nothing, and learns nothing.'},
    {q:'We turn back to the congregations we know.',no:'They have the decrees, and older men of their own. We were not sent out to walk one road twice and call it enough.'},
    {q:'We go on by the road that is still open.',ok:1}]);
  F.asia=1;AU.mood='hope';SFX.good();
  await say(P,'Brothers, we are not going to Ephesus. We have been forbidden to speak the word in Asia.');
  await say(TI,'Forbidden? But why, Paul? There are so many people down that road.');
  await say(P,'I do not know why, Timothy. I know who it is that forbids. That is enough to turn my feet.');
  await say(SI,'Then which way? There is the track to the north. The carrier says that it runs toward Bithynia.');
  await say(P,'Bithynia has cities too. We go on, and we see whether that door is open.');
  await say(AT,'Not coming? You had not gone twenty paces. Is something wrong with my road?');
  await say(P,'Nothing is wrong with your road, Attalos. The one who sent us has closed it to us. I cannot tell you more, because I do not know more.');
  await say(AT,'A man who says what he does not know. That is rarer on this road than a mule that does not kick. Go well, then.');codeBtn()}
async function trackNorth(){const me=PC();
  if(!F.asia)return say(me,'North? That track runs toward Bithynia. Our road is the paved one: west, to Ephesus and the cities of Asia.');
  await say(P,'North, then, until we are told otherwise.');
  await leg(2,['From the paved road they turned north. They may have walked for days on unpaved tracks, through the thinly peopled country where Phrygia and Galatia meet.',
    'On reaching Mysia they tried to go on into Bithynia. (Acts 16:7)']);
  await come('ferry');
  await say(KL,'Bithynia, is it? You are looking at it: everything beyond the water. Two coppers a man, and I do not turn back for hats.');
  await say(SI,'Towns, Paul, and good roads between them: so they told us in the last village.');
  await say(TI,'And people who have never heard. As in Asia.');codeBtn()}
ROOMS.fork={space:.5,walk:[16,464,112,138],mood:'hope',amb:{wind:.5,birds:.5,hooves:.15},hs:[
  {name:'mountains',x:0,y:36,w:480,h:22,wx:240,look:'Mountains to the north, with the snow still on them. It is spring on the plateau, and the roads are open again.'},
  {name:'sheepfold',x:332,y:62,w:92,h:24,wx:380,look:'A sheepfold of field stone, a few sheep, and a wild pear in blossom. Somebody lives out here, a long way from any city.'},
  {name:'milestone',x:207,y:86,w:12,h:23,wx:226,wy:114,dir:-1,look:async()=>{await say(P,'A milestone of the Romans. It counts the miles to cities that I have never seen.');return say(P,quote('prov16'))},
    use:'I lean on it for a moment. It is the only thing on this plateau that knows exactly where it is.',pickup:'It has stood here longer than I have lived.'},
  {name:'mule',x:128,y:90,w:44,h:34,wx:184,wy:126,dir:-1,look:"The carrier's mule, under more wool than I should have thought one animal could carry. It is looking down the road, and it has no doubts.",pickup:"It is Attalos's, and it would not come."},
  {name:'track to the north',x:232,y:76,w:76,h:32,wx:254,wy:113,dir:1,exit:trackNorth,
    look:()=>say(P,F.asia?'The track north: bare earth and two ruts, climbing out of sight. It is the road that is still open.':'A track, leaving the paved road for the north. Two ruts and no kerb. The carrier says that it runs toward Bithynia.')},
  {name:'paved road west',x:0,y:104,w:15,h:34,wx:22,wy:122,dir:-1,exit:roadWest,
    look:async()=>{if(F.asia)return say(P,'The road to Ephesus: paved, straight, and closed to us. I do not know why. I do not need to.');
      await say(P,'The paved road, running west: down off the plateau, and on to Ephesus and the cities of Asia. More people live along it than in all Galatia.');return say(P,quote('isa30'))}},
  {name:'road east',x:466,y:104,w:14,h:34,wx:458,wy:122,dir:1,look:'The way we came: back to the cities of Galatia.',exit:()=>say(PC(),'The cities behind us have the decrees, and they are growing day by day. Our road does not lead back.')}]};
AT.hs={name:'Attalos',actor:AT,
  look:()=>say(P,F.asia?'Attalos. He is tightening a girth that does not need it, and wondering about us.':'Attalos, a carrier of wool. Four times a year he takes the paved road down to Ephesus, and he has offered us his company.'),
  show:{awl:'An awl! Then you can mend a pack saddle. You should have said so three villages ago.',knife:'A good knife. I use one like it on fleeces.',thread:'Waxed. That will outlast the wool.',
    tablets:'Writing. I count on my fingers, friend, and I have never been cheated yet.','*':'Keep it for the road. It is a long one, whichever you take.'},
  talk:()=>talkTree([
    {q:'Where does the paved road lead?',a:async()=>{await say(AT,'West, friend. Down off the plateau, and on to Ephesus by the great cities of Asia. Paved all the way: the Romans see to that.');
      await say(AT,'There are more people along that road than my mule has hairs.')}},
    {q:'And the track to the north?',a:()=>say(AT,'Toward Bithynia, in the end. A poor track, with few villages on it. I should not take my mule that way without a reason.')},
    {q:'We are forbidden to speak in Asia.',if:()=>!!F.asia,once:1,a:async()=>{await say(AT,'Forbidden to speak? You could walk through it with your mouth shut, I suppose.');
      await say(P,'I was not sent to keep my mouth shut, Attalos. If I may not speak there, I will find where I may.')}},
    {q:'A safe road to you, Attalos.',bye:1}])};
/* ============ THE EDGE OF BITHYNIA: a second road that is closed ============ */
/* They tried to go into Bithynia, and the spirit of Jesus would not let them (Acts 16:7). Mysia belonged to the province of
   Asia, so what was forbidden in Asia was forbidden there: they went through it without stopping to preach (study note on Acts 16:8). */
async function ferry(){const me=PC();
  if(F.bith)return say(me,'That bank is not for us. Not now.');
  await say(P,'Three men to cross, Kleitos. Here are your coppers.');
  await say(KL,'Step aboard, then, and sit low. She is steady, but she is slow.');
  await walk(P,FERRY[0]+38,113);AU.mood='tense';await fade(1,700);
  await narr('But the spirit of Jesus would not let them. (Acts 16:7)',{dur:8000});
  place(P,'ferry',300,122,1);place(SI,'ferry',330,125,-1);place(TI,'ferry',356,128,-1);await fade(0,700);
  await say(P,'Not Bithynia either. Twice now.',TH);
  await think('A second road is closed to us. What do we do?',[
    {q:'We wait at the ferry until the way is opened.',no:'Twice I have been turned, and both times only after I had set out. I will not sit on a river bank and call that obedience.'},
    {q:'Two roads are shut. We go home to Antioch.',no:'Nobody has told me to go home. I have been told where I may not speak. That is all that I have been told.'},
    {q:'West. It is the one road left.',ok:1}]);
  F.bith=1;AU.mood='hope';SFX.good();
  await say(P,'Keep your coppers and your pole dry, Kleitos. We are not crossing.');
  await say(KL,'Not crossing? You came up this bank like men with an errand.');
  await say(P,'We have one. It is not on your side of the water, it seems.');
  await say(TI,'Then where, Paul? Asia is behind us, and Bithynia is in front of us, and both are shut.');
  await say(P,'West, Timothy: through Mysia, to the sea. I cannot tell you what is at the end of it. I know only that it is the one road that has not been closed.');
  await say(SI,'That is a long road, and it goes past a great many towns.');
  await say(P,'It does, and we shall pass them by. Mysia is part of Asia: what was forbidden to us there is forbidden here. I do not like it, Silas. I do not have to like it.');codeBtn()}
async function roadSea(){const me=PC();
  if(!F.bith)return say(me,'West, along the bank? That road leads to the sea, and to nothing that I have planned for. Bithynia is in front of us.');
  await say(P,'West, brothers. Somebody is knocking on doors for us, and has not finished.');
  await leg(3,['So they went on past Mysia, down to Troas. (Acts 16:8)',
    'It was a walk of some 550 kilometers, past city after city. They went through Mysia without stopping to preach there.']);
  await come('troas','tense');await troasIntro()}
ROOMS.ferry={space:.6,walk:[16,464,112,138],mood:'hope',amb:{fountain:.35,leaves:.6,birds:.6,wind:.2},hs:[
  {name:'mountain',x:150,y:30,w:170,h:26,wx:240,look:'One great mountain beyond the river, with snow on it. Everything between here and there is Bithynia.'},
  {name:'far bank',x:0,y:60,w:480,h:26,wx:270,look:()=>say(P,F.bith?'Bithynia. Wooded hills, and somewhere behind them towns that will hear the good news from someone. Not from us, and not now.'
    :'The far bank: Bithynia. Woods, and a path climbing into them from where the ferry lands. Beyond the hills there are towns.')},
  {name:'river',x:0,y:87,w:234,h:18,wx:150,wy:113,look:'A wide river, slow and green, with the hills lying upside down in it.',use:'I wash the dust of Phrygia from my face. It is the first water in a week that I did not have to draw.',pickup:'A river belongs to its banks.'},
  {name:'plane tree',x:30,y:42,w:70,h:66,wx:84,wy:116,dir:-1,look:'A plane tree, older than the ferry. Travelers wait under it for the boat.',use:'I am not tired enough to sit down. Not yet.'},
  {name:"ferryman's hut",x:394,y:68,w:74,h:42,wx:428,wy:114,look:'A hut of wattle and daub under a roof of reeds. He lives where his living is.',use:'It is his house, and he has not asked me in.',open:'It is his house, and he has not asked me in.'},
  {name:'ferry',x:236,y:94,w:82,h:16,wx:266,wy:114,def:'use',exit:ferry,
    look:()=>say(P,F.bith?'The ferry. It will carry others over to Bithynia today. It will not carry us.':'The ferry: a broad flat boat, and a pole to push it with. It is all that lies between us and Bithynia.')},
  {name:'road west',x:0,y:110,w:15,h:28,wx:22,wy:122,dir:-1,exit:roadSea,
    look:()=>say(P,F.bith?'The road west along the bank: through Mysia, to the sea. It is the one that is left.':'A road along the bank, going west. The ferryman says that it comes to the sea in the end, and that nobody takes it who is not going to a ship.')},
  {name:'road east',x:466,y:110,w:14,h:28,wx:458,wy:122,dir:1,look:'The way we came, from the plateau.',exit:()=>say(PC(),'We did not walk all those days in order to walk them again.')}]};
KL.hs={name:'Kleitos',actor:KL,
  look:()=>say(P,F.bith?'Kleitos. He has pushed off with two shepherds and a goat, and he is still looking back at us.':'Kleitos, the ferryman. He has crossed this river more often than I have crossed a threshold.'),
  show:{awl:'I caulk with pitch and moss, friend, not with that.',knife:'Sharp. Keep it away from my painter.',tablets:'Wax? In the sun, on the water, that would run. I keep my accounts in my head.','*':'Keep it dry. Everything that crosses with me gets a little wet.'},
  talk:()=>talkTree([
    {q:'What lies over the river?',a:()=>say(KL,'Bithynia. Good land, towns, and a road to the sea in the north. I carry people over who mean to stay, and I carry the same people back.')},
    {q:'Where does the road along the bank lead?',a:()=>say(KL,'West? To the sea, in the end, at Troas where the ships are. Weeks of walking, and all of it through Mysia. Nobody takes that road who is not going to a ship.')},
    {q:'We were not permitted to cross.',if:()=>!!F.bith,once:1,a:async()=>{await say(KL,'Not permitted? I saw no soldier, and I heard no one call.');await say(P,'Neither did you see the one who sent us. He is not less to be obeyed for that.')}},
    {q:'A quiet river to you, Kleitos.',bye:1}])};
/* ============ TROAS: the fourth man ============ */
/* Luke is with them from Troas on: the account says "we" from Acts 16:10. It does not say how he came to be with them, where he was from
   or when he became a disciple, and nothing here says so either. He is a physician (Colossians 4:14): the oil, the wine and the bandage
   are the treatment he himself later recorded (Luke 10:34), which the Study Edition calls consistent with the methods of the day. */
async function troasIntro(){if(G.metTroas)return;G.metTroas=1;
  await narr('Troas: the principal seaport of that coast, and a colony of Rome. It was probably the spring of the year 50.',{dur:7500});
  noise({d:.18,v:.3,f:900,q:.8});noise({t:now()+.12,d:.3,v:.2,f:2600,q:1});
  await say(LE,'Mind the sling! ...Too late. Sosias! Let me see that arm.');
  await say(SO,'It is nothing, master. The jar caught me as it went.');
  await say(LU,'It is not nothing. Sit down, man, and hold the arm up. Let me through: I am a physician.');
  await say(LE,'My best hand, and I sail for Neapolis with the first fair wind! I will not put to sea a man short.');
  await say(LU,'You there: travelers, by the dust on you. I have oil and wine. What I have not got is clean linen, and I want it now.');
  await say(P,'A harbor, at the end of the only road that was left open. I still do not know why we are here. But that man is bleeding, and that I understand.',TH);swapBtn();codeBtn()}
/* cutStrips: clean linen, cut into strips along the thread */
async function cutStrips(){if(F.strips)return say(P,'They are cut.');
  if(!(await bring('linen')))return say(P,'I have no linen to cut.');
  SFX.cut();await say(P,"A hand's breadth wide, and cut along the thread, so that the edges do not fray into the wound...");
  delItem('linen');F.strips=1;addItem('bandage',1);SFX.good();
  await say(P,'Strips of clean linen. Binding a wound is not my craft: they belong in the hand of the physician.')}
/* sewSling: a sling for the arm, out of an offcut of old sailcloth */
async function sewSling(){if(F.sling)return say(P,'It is sewn already.');
  if(!F.bound)return say(P,'I could sew a dozen things out of it, and I do not yet know which of them is wanted. First let the physician say what the arm needs.');
  if(!(await bring('offcut')))return say(P,'A sling wants cloth, and I have none.');
  SFX.cut();await say(P,'A broad band, long enough to carry a forearm, and hemmed so that it does not cut into the neck...');SFX.sew();await wait(600);
  delItem('offcut');F.sling=1;addItem('sling',1);SFX.good();
  await say(P,'An arm sling. I have sewn for camels, for wagons and for ships. Never before for an arm.')}
Object.assign(COMBO,{
  'knife+linen':cutStrips,'awl+linen':()=>say(P,'Linen does not want sewing now. It wants cutting.'),'linen+thread':()=>say(P,'Linen does not want sewing now. It wants cutting.'),
  'awl+offcut':sewSling,'offcut+thread':sewSling,'knife+offcut':sewSling,
  'awl+bandage':()=>say(P,'A bandage is wound, not sewn. And it is not I who should wind it.'),'linen+offcut':()=>say(P,'The linen is for the wound, and the sailcloth is not clean enough to go near it.'),
  'bandage+offcut':()=>say(P,'The linen is for the wound, and the sailcloth is not clean enough to go near it.'),'awl+sling':()=>say(P,'It is sewn, and it will hold.'),'sling+thread':()=>say(P,'It is sewn, and it will hold.')});
/* treat: the physician's part, played as Luke. Wine and oil first, then the bandage, then the sling. */
async function treat(it){
  if(F.slung)return say(LU,'It is cleaned, bound and slung. Now it wants only to be left alone.');
  if(it==='lbag'){if(F.clean)return say(LU,'It is clean. Now it wants binding.');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;LU.bow=true;
    await say(LU,'Wine first. It will sting, and it will clean.');noise({d:.25,v:.08,f:3200,q:1});await wait(500);
    await say(SO,'Ah! You said that it would sting. You did not say how much.');
    await say(LU,'Now oil, to soften it. ...There. The cut is long, but it is not deep, and it is clean.');LU.bow=false;F.clean=1;SFX.good();
    return say(LU,invOf(LU).includes('bandage')?'And now the linen.':'And now linen: strips of it, clean, to bind this up.')}
  if(it==='bandage'){if(F.bound)return say(LU,'It is bound.');
    if(!F.clean)return say(LU,'Not on a wound as it is. First the wine and the oil: they are in my bag.');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;LU.bow=true;
    await say(LU,'Round, and round again. Firm, but not tight: the hand must stay warm.');await wait(500);LU.bow=false;drop('bandage');F.bound=1;SFX.good();
    await say(SO,'It throbs less already.');
    await say(LU,'It will throb again if it hangs at your side. It must be carried high for some days: in a sling. And I have used every scrap of my linen.');
    return say(P,'A sling. That is cloth, and a hem. That is my craft.',TH)}
  if(it==='sling'){if(!F.bound)return say(LU,'A sling for an arm that is still bleeding? First things first.');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;
    await say(LU,'Over the head, and the arm laid in it. ...So. The weight is on the shoulder now, where it can do no harm.');drop('sling');return slung()}
  if(it==='linen')return say(LU,'A whole cloth is no use to me. It wants cutting into strips, straight along the thread, and I know a man who cuts cloth for his living.');
  if(it==='offcut')return say(LU,'Sailcloth on an open wound? No. But I may want it later, in another shape.');
  return false}
/* slung: the hand is cared for; the four men find that they are brothers, and go to the inn */
async function slung(){playAs(P);F.slung=1;AU.mood='calm';SFX.good();
  await say(LE,'He can steer with one hand, and by Neapolis he will haul with two. Physician, tentmaker: I am in your debt.');
  await say(LU,'Luke. A physician, as you saw. That sling was hemmed in the time that it took me to tie a knot.');
  await say(P,'Paul, of Tarsus. I sew tents, not slings: but a seam is a seam. These are Silas and Timothy.');
  await say(LU,'I heard the young man call you "brother". Not many in Troas use that word as he used it. I use it so too.');
  await say(P,'Then there are four of us on this quay tonight.');
  await say(LU,'Where are you bound?');
  await say(P,'I do not know, Luke. We were turned away from Asia, and from Bithynia, and this is where the road ran out.');
  await say(LU,'Then sleep on it. A harbor looks different by daylight. I lodge at the inn yonder: there is room.');codeBtn()}
/* The night, and the vision: told as Acts 16:9 tells it, in paraphrase, on a dark screen. Nothing of it is shown. */
async function night(){const me=PC();
  if(F.vision)return say(me,me===P?'We have slept. What I saw there in the night, I must now tell.':'We have slept, and Paul has not. Something happened in the night.');
  if(!F.slung)return say(me,me===P?'Not while that man is bleeding on the quay.':'Not while my work is lying half done on a bale.');
  playAs(P);await say(P,'To the inn, then. We have walked for weeks to stand on this quay, and tonight I cannot tell you why.');
  await fade(1,900);G.scene=dark;AU.mood='night';AU.amb={waves:.4,wind:.2};await fade(0,600);await wait(1500);
  await narr('That night Paul had a vision. He saw a man of Macedonia standing there, who begged him to cross over into Macedonia and help them. (Acts 16:9)',{dur:14000});
  await wait(800);await fade(1,600);F.vision=1;G.scene=null;AU.amb=ROOMS.troas.amb;await come('troas','calm');
  await say(TI,'Paul? You are up before the gulls. Have you slept at all?');
  await say(P,'I must tell them. But what do I tell them, and how?',TH)}
/* Drawing the conclusion (Acts 16:10): Paul reports what he saw, and no more; and the four men weigh it together. */
async function tell(){
  if(F.concl)return false;
  await think('I saw something in the night. How do I begin?',[
    {q:'I have decided: we sail for Macedonia.',no:'Have I? I saw a man, and I heard his words. What they mean for four of us is not mine to settle alone, before the others have even heard them.'},
    {q:'It was one night. Let us wait and see whether it comes again.',no:'Two roads were closed to me without a second telling. If this is a door opening, I will not ask for it to be opened twice.'},
    {q:'Tell them exactly what I saw, and no more.',ok:1}]);
  await Promise.all([walk(SI,P.x+30,P.y+2),walk(TI,P.x-28,P.y+3),walk(LU,P.x+56,P.y-2)]);SI.dir=-1;LU.dir=-1;TI.dir=1;
  await say(P,'Brothers. In the night I saw a vision. A man stood before me, a Macedonian. He begged me to cross over into Macedonia and help them.');
  await say(P,'That is all of it. I have added nothing, and I will not guess at more than I saw.');
  await say(SI,'Then let us weigh it together. What else do we know, besides what you saw?');
  let av=[{q:'In Asia we were forbidden to speak.',ok:1,r:[SI,'So the road west was not ours. That is one.']},
    {q:'Into Bithynia we were not permitted to go.',ok:1,r:[TI,'And the road north was not ours either. That is two.']},
    {q:'The one road left open ended here, at a harbor.',ok:1,r:[LU,'And from this harbor ships cross to Macedonia. Leon is loading for Neapolis now: the port of Philippi.']},
    {q:'I am tired of walking, and a ship would be easier.',r:[SI,'True of every one of us, brother, and no reason at all.']},
    {q:'Macedonia is a great country, with famous cities.',r:[SI,'So is Asia, and we were turned away from it. That a country is great tells us nothing.']}],n=0;
  while(n<3){const o=av[await choose(av.map(o=>o.q))];await say(P,o.q);await say(o.r[0],o.r[1]);av=av.filter(x=>x!==o);if(o.ok)n++}
  await say(LU,'One thing more. The wind went round into the south during the night. Leon means to sail today.');
  await say(SI,'Two doors shut, one road left, a harbor at the end of it, and now a man of Macedonia asking for help. I do not see what else it can mean.');
  await say(TI,'Then God has called us to them: to declare the good news there.');
  await say(P,'That is my conclusion too. And I am glad that it is not mine alone.');
  await say(P,quote('prov15'));
  F.concl=1;AU.mood='hope';SFX.good();
  await narr('Once Paul had seen the vision, we set about getting to Macedonia without delay, for we concluded that God had called us to bring the good news to its people. (Acts 16:10)',{dur:12000});
  await narr('From this verse on the account says "we". Luke, who wrote it, was with them.',{dur:7000});codeBtn();return true}
/* aboard: the crossing. One course to Samothrace, a night at anchor, and on the following day Neapolis (Acts 16:11). */
async function aboard(){const me=PC();
  if(eve())return say(me,me===P?"She is Leon's ship, and he is loading her. I have no business aboard.":'I have no business aboard. My business is sitting on that bale, holding his arm.');
  if(!F.concl)return say(me,me===P?'Not before the brothers have heard what I saw in the night.':'Paul has something to tell us first. I can see it in his face.');
  playAs(P);await say(P,'Leon. You are bound for Neapolis. Have you room for four men, who mean to pay their way?');
  await say(LE,'Room, yes. Pay it in hands, not in coin: I am short of two good arms until that one mends. Come aboard. This wind will not wait for any of us.');
  await leg(4,['So we left Troas by ship, and held one course all the way to Samothrace. (Acts 16:11)']);
  G.scene=deckScene;AU.mood='night';AU.amb={waves:.6,creak:.5,wind:.3};await fade(0,700);
  await narr('Samothrace has no good harbor. That night we lay at anchor under its mountain, and nobody went ashore.',{dur:8000});
  await say(TI,'I had never seen the sea before Troas. Now there is nothing else, and I cannot see the bottom of it.');
  await say(P,'Then look up, Timothy. They are the same stars as over Lystra.');
  await say(SI,quote('isa42'));
  await say(SI,'Isaiah wrote it of the servant of Jehovah. Tonight we are lying under one of those islands.');
  await say(LU,'If this wind holds, we shall be in Neapolis tomorrow. Leon says that the same crossing can take far longer.');
  await say(TI,'What shall we find there, Paul?');
  await say(P,'People who need help. That is all that I was told. It is enough to sail on.');
  await leg(6,['The next day brought us to Neapolis, and from there we went on to Philippi: a colony, and the foremost city of that district of Macedonia. (Acts 16:11, 12)',
    'From the harbor the great road to the west climbed over a pass and came down into the plain: some fifteen kilometers, three or four hours on foot.'],1);
  await come('philippi');await philIntro()}
ROOMS.troas={space:.7,walk:[16,464,112,138],get mood(){return F.vision?(F.concl?'hope':'calm'):F.slung?'calm':'tense'},amb:()=>F.vision?{waves:.6,gulls:.6,creak:.3,wind:.3}:{waves:.5,gulls:.3,creak:.4,crowd:.15},hs:[
  {name:'sea',x:204,y:40,w:276,h:22,wx:330,look:()=>say(P,F.concl?'The sea, and beyond it Macedonia. Yesterday it was the end of the road. Today it is the road.'
    :F.vision?'The sea, and the wind coming up it from the south. Beyond that water lies Macedonia.':'The sea, with the sun going down into it, and an island lying low on the edge. The road has run out. There is only water in front of us.')},
  {name:'door of the inn',x:40,y:59,w:24,h:45,wx:52,wy:114,exit:night,
    look:()=>say(P,F.vision?'The inn. I lay down in it last night as a man who did not know where he was going.':'An inn by the warehouses, with a lamp over its door. The physician lodges there.')},
  {name:'warehouse',x:100,y:58,w:90,h:46,wx:146,wy:114,look:'A warehouse, its doors open and its sacks waiting. Everything that leaves this coast for Macedonia goes over this quay.',use:'I have nothing to store, and nothing to fetch.',open:'It is open already, and it is not mine.'},
  {name:'jars of oil',x:152,y:92,w:32,h:22,wx:186,wy:117,dir:-1,look:()=>say(P,eve()?'Jars of oil, waiting to be slung aboard. One of them will not be going.':'Jars of oil. Leon has had them counted twice since yesterday.'),pickup:"They are Leon's cargo."},
  {name:'bales',x:202,y:96,w:56,h:18,wx:230,wy:118,look:'Bales of dyed wool: purple, crimson and violet. They have come out of Asia, from the cities of the dyers, and they are going over the sea to somebody who sells such things.',pickup:'They are worth more than everything that I have ever sewn.'},
  {name:'broken jar',x:260,y:108,w:36,h:16,wx:252,wy:121,dir:1,look:'The jar that slipped from the sling: shards, and good oil running between the stones.',pickup:'Shards cut. One arm on this quay is enough.',vis:()=>eve()},
  {name:'gangplank',x:294,y:82,w:34,h:25,wx:300,wy:113,dir:1,def:'use',exit:aboard,
    look:()=>say(P,F.concl?"The gangplank of Leon's ship. She is bound for Neapolis, and so are we.":"The gangplank of a coaster. Her master is loading for Neapolis, in Macedonia.")},
  {name:'ship',x:226,y:12,w:220,h:70,wx:340,wy:113,look:()=>say(P,"A coaster, with her yard on deck and her sail furled on it. She has carried many cargoes. I should like to know who sewed her sail."),use:aboard},
  {name:'coil of rope',x:388,y:108,w:20,h:8,wx:398,wy:120,look:'A coil of good line, laid down by somebody who cares for it.',pickup:"It is the ship's."},
  {name:'heap of old sailcloth',x:408,y:101,w:54,h:18,wx:403,wy:122,dir:1,
    look:()=>say(P,F.offcut?'Old sailcloth. I have taken what I needed, and I asked first.':'A heap of old sailcloth: what is left when a sail is past mending. Some of it is still sound.'),
    pickup:Object.assign(async()=>{if(F.offcut)return say(P,'I have what I needed.');if(!eve())return say(P,'It is rags, and this morning I have no use for rags.');await say(P,'Leon, may I have a piece of this?');await say(LE,'That? It is past saving. Take the heap, if rags are any use to you.');
      F.offcut=1;toPaul('offcut');await say(P,'One sound piece is enough.')},{take:1})}]};
LE.hs={name:'Leon',actor:LE,
  look:()=>say(P,F.vision?'Leon, with one eye on his cargo and the other on the wind. It has come round into the south.':F.slung?'Leon. He has stopped shouting, and started counting his jars again.'
    :'Leon, master of the coaster. He is bound for Neapolis, and the only man aboard who can steer is bleeding on the quay.'),
  show:{awl:'Near enough to a sailmaker\'s tool. If my sail goes on this crossing, I shall know whom to wake.',sling:'For his arm? Then put it into the hand of the physician, friend, not into mine.',bandage:'That is for the physician, not for me.',
    linen:'Clean linen is wasted on my hands. Look at them.',offcut:'I told you: take it. It is rags.',knife:'Keep that well clear of my rigging.',tablets:'I keep my reckoning in knots on a cord. It has never yet been wrong.','*':'Stow it, friend. A quay is no place to lay things down.'},
  ask:{linen:'Linen? I carry wool and oil, friend. Sailcloth I have, and not a clean thread of it.',sling:'Cloth for a sling? There is a heap of old sail by the stern line. Take what you like of it.'},
  talk:()=>talkTree([
    {q:'Where are you bound, shipmaster?',a:()=>say(LE,'Neapolis, in Macedonia: the port of Philippi. With this cargo, and as soon as the wind comes round.')},
    {q:'How long is the crossing?',a:()=>say(LE,'With the wind behind her, two days: one to Samothrace, and one more. With the wind against her, ask me when we get there.')},
    {q:'What happened here?',if:()=>eve()&&!F.slung,a:()=>say(LE,'The sling slipped, a jar came down, and Sosias put his arm in the way of it. He is the best hand I have, and the only one who can steer.')},
    {q:'Fair winds, Leon.',bye:1}]),
  as:{luke:{look:()=>say(LU,F.slung?'The shipmaster. He looks at that sling as if it were a new sail.':'The shipmaster. He is more frightened for his hand than he will say.'),
    talk:()=>say(LE,F.vision?'Physician! If you sail with us, I shall sleep the better for it. Bring your bag.':F.slung?'You have given me back my steersman, physician. Ask me for a passage whenever you want one.':'Can you mend him, physician? I sail with the first fair wind, and I cannot sail without him.'),
    show:{lbag:'Whatever is in that bag, use it, and quickly.','*':'Stow it, friend.'}}}};
SO.hs={name:'Sosias',actor:SO,
  look:()=>say(P,F.slung?'Sosias, with his arm in a sling of old sailcloth, telling everybody who will listen how the jar came down.':F.bound?'Sosias. The arm is bound, and the color is coming back into his face. But he is holding it up with his other hand.'
    :'Sosias, the hand who was hurt. A forearm laid open from the wrist almost to the elbow, and he says that it is nothing.'),
  give:async it=>{if(it==='bandage'||it==='linen'||it==='sling'||it==='offcut')return say(P,"Binding a wound is the physician's craft, not mine. This belongs in his hand, not on that arm by way of mine.");return false},
  show:{awl:'Not near my arm with that!',knife:'Keep it away from me. I have been cut enough for one day.','*':'I cannot take it, friend. I have only the one hand today.'},
  talk:()=>say(SO,F.slung?'It hardly throbs. I shall steer her out tomorrow with one hand, and tell the story with the other.':F.bound?'It is better. But it is heavy, as if it were another man\'s arm.':'It is nothing. ...It is a little more than nothing.'),
  as:{luke:{look:()=>say(LU,F.slung?'Cleaned, bound and carried high. In ten days he will have forgotten which arm it was.':F.bound?'Bound. Now it must be kept up, and he will not keep it up by himself.':F.clean?'The wound is clean. It wants binding, before the dust of the quay gets into it.'
      :'A long cut, and dirty: oil from the jar, and whatever was on the stones. It must be washed before anything else.'),
    give:treat,use:()=>say(LU,F.slung?'It wants only to be left alone.':'Not with my bare hands. The wine and the oil are in my bag.'),
    talk:()=>say(SO,F.slung?'I shall not forget this, physician.':'Will I keep the arm, physician?'),show:{'*':'I cannot take it, physician. I have only the one hand today.'}}}};
/* ============ PHILIPPI: a city without a synagogue ============ */
/* "We stayed in this city for some days. On the Sabbath day we went outside the gate beside a river, where we thought there was a place of
   prayer" (Acts 16:12, 13). The Study Edition offers two possible reasons why Philippi had no synagogue, and decides for neither; so nobody
   here knows why. What Paul learns, he learns by asking people what they have seen: a gate, a river, and shutters closed every seventh day. */
async function philIntro(){if(G.metPhil)return;G.metPhil=1;
  await narr('Philippi was like a little Italy. Many of its people were old soldiers of Rome, and proud to be Romans.',{dur:8000});
  await say(LU,'I have asked in three streets, Paul. Nobody knows of a synagogue in Philippi.');
  await say(P,'No synagogue? Then where do those who worship the God of Israel meet? Or is there nobody?');
  await say(SI,'Somebody will know. A city keeps few secrets from the men at its gates, or from the women in its shops.');
  await say(P,'Then we ask, and we look. And until we know, I work: the awning maker has let me a corner of his bench.');codeBtn()}
async function known(){if(!clues()||G.knew)return;G.knew=1;
  await say(P,'A gate, a river, and a seventh day. I think that there is a place of prayer outside this city. And I think that I know on which morning it will be full.',TH);
  await say(P,'Until the Sabbath, then, there is my bench.',TH)}
async function askQuintus(){
  if(F.gate)return say(QU,clues()?'Still asking? The gate is open, stranger, and the river has not moved.':'I have told you what I see from this bench. On which mornings, I never counted.');
  if(!G.metQu){G.metQu=1;await say(P,'Peace to you. We are strangers here. Is there a synagogue of the Jews in Philippi?');
    await say(QU,'A synagogue? This is a colony, stranger. We are Romans here. There is no such house inside these walls.')}
  await ask(P,QU,'Well? Ask what you want to ask. I have sat by this gate every day since my discharge, and I have nothing but time.',[
    {q:'Why is there no synagogue?',r:['Ask the magistrates, not an old soldier. I kept a gate for twenty years. I did not make the laws that went through it.',
      [P,'He does not know why, and I should not make him guess. I should ask him what he has seen.',TH]]},
    {q:'Do you know any who worship the God of Israel?',r:['I know what is left of my century, and the price of wine. Whom other people pray to is their own affair.']},
    {q:'Who goes out by this gate that is not going to work?',ok:1,
      r:['Now that is a question for a man who sits at a gate. Carters go out, and washerwomen. And some mornings a handful of women, well dressed, who are not washerwomen at all.',
        'They go down to the river and sit there, under the trees. No garlands, no smoke, no noise. On which mornings? I never counted the days between.']}]);
  F.gate=1;SFX.good();
  await say(P,'Outside the gate, beside a river: women who bring nothing to burn. But on which mornings?',TH);await known();codeBtn()}
async function askZosime(){
  if(F.shop)return say(ZO,F.awn?'My awning has not sagged once since you touched it. If Lydia does not thank you for asking after her, I will.':'I have told you all that I know of her seventh day. Ask her yourself: she will be back before it.');
  await ask(P,ZO,'Purple, sir? Crimson? Or are you only looking, like most men?',[
    {q:'Do you know any Jews in this city?',r:['I know cloth, sir, and who pays for it. I do not ask my customers whom they pray to.']},
    {q:'Is your neighbor a good seller of purple?',r:['The best in the row, and she knows it. Why? Would you sooner buy from her?',[P,'That was idle. I am not here to weigh her trade. I should ask about what I can see: her shutters.',TH]]},
    {q:'Why is the shop beside yours shut?',ok:1,
      r:["Lydia's? Today she is down at Neapolis, seeing to a cargo out of Asia. But ask me on her seventh day, and you will get another answer.",
        "Every seventh day those shutters stay closed, market or no market. She is from Thyatira, and she worships the God of the Jews. She loses one day's trade in seven, and she says that she loses nothing by it.",
        'Where she goes on that day, with her household, I never asked.']}]);
  F.shop=1;SFX.good();
  await say(P,'A seller of purple who shuts her shop every seventh day. A worshipper of God, in a city without a synagogue.',TH);await known();codeBtn()}
/* An optional kindness: the seam of Zosime's awning, closed without being asked. */
async function mendAwn(){if(F.awn)return say(P,'It is closed, and it will stay closed.');
  await walk(P,236,113);P.dir=1;SFX.sew();await say(P,'One seam, parted for the length of my forearm. Laid over, and stitched twice...');await wait(600);F.awn=1;SFX.good();
  await say(ZO,'My awning! It has hung like a broken wing since the winter. What do I owe you, sir?');
  await say(P,'Nothing. It was in my way every time I looked up from my bench.');
  await say(ZO,'A tentmaker who will not be paid. You should meet my neighbor: she is as strange about money as you are.');codeBtn()}
/* The days pass at the bench, until the Sabbath. */
async function bench(){
  if(F.sab)return say(P,'Not today. It is the Sabbath, and there is a river outside the gate.');
  if(!clues())return say(P,'There is work on this bench for some days. But first I want to know where the worshippers of God meet in this city. That is what I crossed the sea for, and it was not the hemming of awnings.');
  await say(P,'Then until the Sabbath I sew, and the others find what work there is for them.');
  await walk(P,122,113);P.dir=-1;P.bow=true;SFX.sew();await wait(700);await fade(1,700);P.bow=false;
  await narr('We spent several days in that city. (Acts 16:12)',{dur:6500});
  await narr('Paul worked at his trade, and we lodged where we could pay for it. Then the seventh day came.',{dur:7500});
  F.sab=1;place8('philippi');enterRoom('philippi',P.x,P.y,P.dir);await fade(0,700);SFX.good();
  await say(P,'The Sabbath. Come, brothers: out by the gate, and down to the river. I think that there is a place of prayer there.');codeBtn()}
async function gate(){const me=PC();
  if(!F.gate)return say(me,me===P?'We came in by that gate an hour ago. First I want to know where the worshippers of God meet in this city, if they meet at all.':'Out again? Paul has not finished asking.');
  if(clues()&&!F.sab)return say(me,me===P?'I have seen the river. It is the day that matters now: and until the Sabbath there is my bench.':'Paul means to wait for the Sabbath. Until then he sews, and I look in on the sick of this street.');
  await say(me,F.sab?(me===P?'Out by the gate, brothers, and down to the river.':'To the river, then. I am glad that it is all four of us.'):(me===P?'Let us look at this river of his.':'To the river? Lead on.'));
  await fade(1,500);await come('river');
  if(F.sab)return riverIntro();
  if(!G.sawRiver){G.sawRiver=1;await say(P,'A river, trees, and nobody. The old soldier did not say on which mornings they come.',TH)}}
ROOMS.philippi={space:.9,walk:[16,464,110,138],get mood(){return F.sab?'rest':'calm'},amb:{crowd:.4,fountain:.5,hammer:.2,birds:.2},hs:[
  {name:'citadel',x:300,y:8,w:110,h:24,wx:356,look:'The rock above the city, with a wall along its top. Philippi was a fortress before it was a colony, and it has not forgotten.'},
  {name:'west gate',x:12,y:54,w:32,h:50,wx:40,wy:113,dir:-1,exit:gate,
    look:()=>say(P,F.sab?'The west gate. Beyond it a road goes down to a river, and it is the Sabbath.':F.gate?'The west gate. Beyond it a road goes down to a river, where women sit under the trees on some mornings.':'The west gate. We came in by it from Neapolis, along the great road.')},
  {name:"awning maker's shop",x:74,y:58,w:68,h:28,wx:108,wy:113,look:'Rolls of goat-hair cloth and of hide. The man who owns them was glad of another pair of hands, and asked me no questions.',pickup:'They are his stock, and I am his guest.'},
  {name:'bench',x:86,y:84,w:48,h:21,wx:122,wy:113,dir:-1,def:'use',use:bench,
    look:()=>say(P,F.sab?'My corner of the bench. The awning on it can wait until tomorrow.':'My corner of the bench, and an awning half hemmed on it. Whatever city I am in, my hands know what to do there.'),
    useWith:async it=>{if(it==='awl'||it==='thread'||it==='knife')return bench();return false}},
  {name:"Zosime's shop",x:162,y:58,w:74,h:46,wx:200,wy:113,look:'Purple, crimson and violet, hung out where the light can get at them. A city of old soldiers must have money to spend.',pickup:'One of those lengths costs more than I earn in a year.'},
  {get name(){return F.awn?'mended awning':'torn awning'},x:226,y:38,w:20,h:16,wx:236,wy:113,dir:1,
    look:()=>say(P,F.awn?'Her awning, with its seam closed. It keeps the sun off her purple again.':'One seam of her awning has parted, and the corner hangs down and lifts in the wind. It would take a tentmaker as long as it takes to say so.'),
    use:mendAwn,useWith:async it=>{if(it==='awl'||it==='thread')return mendAwn();if(it==='knife')return say(P,'It wants closing, not cutting.');return false}},
  {name:'shuttered shop',x:256,y:56,w:72,h:49,wx:292,wy:113,
    look:()=>say(P,F.shop?"Lydia's shop: a seller of purple from Thyatira, and a worshipper of God. Closed today, and closed every seventh day.":'A shop in the row of the sellers of purple, with its shutters closed in the middle of the day. Everybody else in this street is selling.'),
    use:'I knock. Nobody comes. Whoever keeps this shop is not at home.',open:'It is shuttered and barred, and it is not mine to open.'},
  {name:'fountain',x:345,y:66,w:48,h:42,wx:370,wy:113,look:'A fountain at the corner, and good water. The Romans build these wherever they mean to stay.',use:'I drink. It is cold, and it tastes of the mountain.',pickup:'A fountain stays where it is.'},
  {name:'street to the marketplace',x:400,y:36,w:80,h:68,wx:440,wy:113,dir:1,look:'The street runs on into the city, toward the marketplace. The great road from Asia to Rome goes straight through it.',
    exit:()=>say(PC(),PC()===P?'The marketplace of a Roman colony. I have no errand there. Not today.':'The marketplace. Paul is not looking that way, and neither shall I.')}]};
QU.hs={name:'Quintus',actor:QU,
  look:()=>say(P,F.gate?'Quintus. He sees everything that goes through that gate, and thinks about none of it.':'An old soldier on a bench by the gate, with a scar down one arm and nothing to do. He watches everybody who goes in or out.'),
  show:{awl:'An awl. The men who mended our tents carried those. You would have been welcome in my century.',knife:'Sheathe it, stranger. This is a peaceful street, and I mean to keep it so.',tablets:'Wax tablets. I never learned more letters than those of my own name.','*':'Keep it. I have carried enough in my time.'},
  ask:{syn:askQuintus},talk:askQuintus,
  as:{luke:{look:'An old soldier, retired to his bench. He favors his left knee when he shifts.',talk:()=>say(QU,'A physician? Then tell me why this knee knows a day beforehand that it is going to rain.'),show:{lbag:'Army surgeons have had their hands on me for twenty years, and here I sit.','*':'Keep it, physician.'}}}};
ZO.hs={name:'Zosime',actor:ZO,
  look:()=>say(P,F.shop?'Zosime. She told me more about her neighbor than she knew that she was telling.':'Zosime, a seller of purple. She talks to every customer as if he had already bought.'),
  show:{awl:()=>F.awn?say(ZO,'I know what that can do, sir. I am sitting under it.'):say(ZO,'An awl? Then you could close the seam of my awning, if you were minded to. It has hung like that since the winter.'),
    knife:'Not near my purple with that, sir!',thread:'Waxed linen. Good for tents. Mine is finer, for hems that are seen.',tablets:'Accounts? No. I see that it is not accounts.','*':'I sell, sir. I do not buy.'},
  ask:{syn:askZosime},talk:askZosime,
  as:{luke:{look:'A seller of purple, and a talker. I should think that she knows the business of everybody in this row.',talk:()=>say(ZO,'A physician! Then you will want a cloak that tells people so. Violet is very well thought of.'),show:{'*':'I sell, sir. I do not buy.'}}}};
/* ============ THE RIVER: a place of prayer, and a sister who asks to give ============ */
/* They sit down and speak with the women who have come together (Acts 16:13). Whatever Paul chooses to say, the scene comes to the same
   point: Jehovah opened her heart (Acts 16:14). Nothing the player does wins her. Her baptism is told as Acts tells it, in paraphrase,
   16:15 over the river, and not drawn. Then she urges them, and Paul has reasons to decline that are all true; she has one answer. */
async function riverIntro(){if(F.sat||G.metRiv)return;G.metRiv=1;
  await narr('On the Sabbath we walked out through the gate to the riverside, where we supposed there would be a place of prayer. (Acts 16:13)',{dur:9500});
  await say(TI,'Women, Paul. Only women. And they are praying.');
  await say(P,quote('ps65'),TH);
  await say(P,'They have not seen us yet.',TH);codeBtn()}
async function approach(){const me=PC();
  if(me!==P)return say(LU,'Paul is weighing how we should come to them. Where he sits down, I shall sit.');
  await think('They have not seen us yet. How do we come to them?',[
    {q:'Stand before them, and address them as in a synagogue.',no:'There is no platform here, and nobody presiding to send us word. They came out to pray, not to be addressed by four strangers on their feet.'},
    {q:'Keep our distance until they have gone home.',no:'I have asked after them in the city for days. They are here now, and so are we. I did not cross the sea to stand behind a tree.'},
    {q:'Go down, greet them, and sit among them.',ok:1}]);
  await Promise.all([walk(P,230,131),walk(SI,296,134),walk(TI,186,132),walk(LU,350,132)]);for(const a of[LY,PH,EL])a.bow=false;P.dir=1;SI.dir=-1;TI.dir=1;LU.dir=-1;
  await say(P,'Peace to you. We are strangers in Philippi, and we worship the God to whom you are praying. May we sit with you?');
  await say(PH,'Then you are not strangers on this bank. Sit, sirs. We have no synagogue to offer you: only the river, and each other.');
  F.sat=1;SFX.good();
  await narr('...and there we sat down, and talked with the women who had come together. (Acts 16:13)',{dur:8500});codeBtn()}
async function speak(){
  await think('These women pray to the God of Israel already. Where do I begin?',[
    {q:'With the rain and the seasons of harvest, as at Lystra.',no:'At Lystra they had never heard his name. These women were praying to him when we came down the bank. I need not show them that he lives.'},
    {q:'With the letter from Jerusalem.',no:'The decrees are for congregations. There is no congregation on this bank yet: only women who are waiting, and do not know that what they are waiting for has come.'},
    {q:'With the Scriptures they know, and the one they promise.',ok:1}]);
  await say(P,'You pray to Jehovah, who hears prayer, and you know what the prophets wrote of the one whom he would send.');
  await say(P,quote('isa53'));
  await say(P,'Isaiah wrote that of the Christ. It has happened, in our own days, in Jerusalem. His name is Jesus.');
  await say(P,quote('ps16'));
  await say(P,'God did not abandon him to the Grave. He raised him up, and many saw him alive. I am one of them.');
  await say(SI,'I am from Jerusalem. I know men who ate with him after he was raised.');
  await say(TI,'My mother and my grandmother taught me the holy writings, as somebody taught them to you. Everything in them led here.');
  await say(LU,'I am a physician. I know what one life is worth to those who are losing it. This one was given for all of us.');
  await narr('One of the listeners was a woman called Lydia, from the city of Thyatira, who sold purple and worshipped God. Jehovah opened her heart fully, so that she paid close attention to what Paul said. (Acts 16:14)',{dur:14000});
  await say(LY,'I came down here this morning to pray, sir, as I do on every Sabbath. I did not know that I was coming to hear this. Tell it to me again: all of it, from the beginning.');
  await say(P,'It was not my words that opened that heart. I have planted nothing here that was not waited for.',TH);
  await say(LY,'I am Lydia. I sell purple in this city. My home is Thyatira.');
  await say(TI,'Thyatira... That is in Asia, Paul.');
  await say(P,'It is.');
  await fade(1,800);place(LY,'river',260,127,-1);place(P,'river',230,131,1);await fade(0,800);
  await narr('She was baptized, and her household with her. Then she pressed us: (Acts 16:15)',{dur:8500});
  return invite()}
/* She urged them, and would take no refusal (Acts 16:15). That she had to insist implies that they held back, and Paul's reasons were good ones
   (1 Corinthians 9:18; 2 Corinthians 12:14). But she is not asking about lodgings. */
async function invite(){
  await say(LY,'If in your eyes I am faithful to Jehovah, then come: stay under my roof. (Acts 16:15)');
  await say(P,'You are kind, Lydia. But we have lodgings in the city, and we pay for them.');
  await say(LY,'I did not ask whether you have a roof.');await say(LY,'If in your eyes I am faithful to Jehovah, then come: stay under my roof.');
  let av=[{q:'I have a trade, Lydia. I work, so that I need be a burden to nobody.',r:'I know what work is, sir: I have a trade too. I did not ask whether you can pay.'},
    {q:'We are four men. That is a heavy load for any house.',r:'My house has held more than four, and so has my table. That is not what I asked you.'},
    {q:'I want to offer the good news without cost.',r:'And so you have. It cost me nothing, and it is worth more than everything in my store. Now it is I who am offering.'}],n=0;
  for(;;){const i=await choose(av.map(o=>o.q).concat('Then we will come, Lydia, and gladly.'));if(i===av.length)break;
    const o=av[i];await say(P,o.q);await say(LY,o.r);await say(LY,'If in your eyes I am faithful to Jehovah, then come: stay under my roof.');av=av.filter(x=>x!==o);n++;
    if(n===1)await say(P,'The same sentence again. She is not asking about lodgings, or about silver.',TH);
    if(n===2){await say(P,quote('kings'),TH);await say(P,'Elisha did not tell the woman of Shunem that he had lodgings.',TH)}}
  await say(P,'Forgive me, Lydia. I have been answering a question that you did not ask. You asked whether we consider you faithful to Jehovah. We do. We will come, and gladly.');
  await say(LY,'Then come now. My household is waiting, and so is the bread.');
  await narr('She would take no refusal, and we went. (Acts 16:15)',{dur:6500});
  return finale()}
async function finale(){await fade(1,800);G.scene=houseScene;AU.mood='rest';AU.amb={fire:.3,crowd:.15};await fade(0,800);
  await narr("Lydia's house was large enough for four guests. That evening it held her whole household besides.",{dur:8000});
  await say(LY,'This room is yours for as long as you stay in Philippi. And when there are brothers in this city, let them meet in it.');
  await say(TI,'At the ferry we did not know where we were going.');
  await say(P,'We know now where we were sent, Timothy. What we were sent into, we shall see. But tonight we have a table, and a sister.');
  await narr('Some ten years later Paul wrote to the congregation in Philippi that he thanked his God every time he remembered them, for the share they had had in the good news ever since the very first day. (Philippians 1:3, 5)',{dur:13500});
  await narr('And of the man who was with them from Troas on, he wrote that Luke was a physician, and beloved. (Colossians 4:14)',{dur:8500});
  await journey();
  endScreen({title:'The Man from Macedonia',text:'Paul set out and was turned, set out again and was turned again, and kept walking until a door opened. He told three brothers exactly what he had seen, and no more. And when a new sister asked to give, he let her.',
    extra:[F.awn&&'An awning mended in the street of the purple sellers'].filter(Boolean),
    based:"Based on Acts 16:6-15; Philippians 1:3-5 and Colossians 4:14. Supporting characters and dialogue are imaginative; the events are from the Scriptures. Acts does not say how the spirit forbade them, what road they took, how Luke came to be with them, which river it was, why Philippi had no synagogue, what was said beside the river, or who belonged to Lydia's household.",
    go:'Click to continue to Chapter Nine',code:['Chapter Nine code: {code}',codeOf(9,0)]});
  await wait(1500);ov.onclick=()=>startChapter(9);await new Promise(()=>{})}
async function toCity(){const me=PC();
  if(F.sat)return say(me,me===P?'Not now. We have sat down among them, and I have not yet said what I crossed the sea to say.':'Paul has not spoken yet. I would not miss it.');
  if(F.sab)return say(me,me===P?'They are here, and they are praying. I am not going back through that gate without a word to them.':'With those women on the bank? Paul will not go, and neither will I.');
  await say(me,me===P?'Back to the city. The river is here. What I do not know yet is the day.':'Back to the city, then.');
  await fade(1,500);await come('philippi')}
const woman=A=>async()=>{const me=PC();if(!F.sat)return approach();if(me===P)return speak();
  return say(A,A===LY?'You are a physician, sir? Then you have seen more of trouble than I have. Sit: your friend is about to speak.':A===PH?'Is it true that you have come from over the sea, only to sit on a river bank with us?':'I have prayed here since before my hair was grey, sir. I never thought that anybody was listening but God.')};
ROOMS.river={space:.6,walk:[16,464,116,138],mood:'rest',amb:{fountain:.5,birds:.7,leaves:.6,wind:.15},hs:[
  {name:'mountain',x:0,y:40,w:300,h:22,wx:230,look:'A long blue mountain across the plain. This is Macedonia: I had never seen it before this week, and a man of it asked me to come.'},
  {name:'city',x:376,y:42,w:92,h:22,wx:420,look:'Philippi on its hill, with its wall and its gate. From down here it looks smaller than a Roman colony likes to look.'},
  {name:'river',x:150,y:88,w:180,h:20,wx:226,wy:118,look:()=>say(P,F.sab?'Clear water, running quickly over its stones, and women praying beside it. I have spoken in synagogues with less reverence in them.':'A clear river, quick over its stones. A place to wash, to draw water: or to pray, where there is no house to pray in.'),
    use:'I wash my hands and my face. It is cold, and it is clean.',pickup:'A river belongs to its banks.'},
  {name:'flat stones',x:186,y:112,w:138,h:16,wx:254,wy:130,def:'use',
    look:()=>say(P,F.sab?'The stones where they sit. No roof, no door, no chest for the scrolls. It is a place of prayer all the same.':'Flat stones, set in a half circle and worn smooth, and the grass trodden between them. People sit here, and often.'),
    use:()=>F.sab?(F.sat?speak():approach()):say(P,'I sit down for a moment. Whoever comes here has chosen the place well: water, shade, and a long way from the street.')},
  {name:'plane tree',x:340,y:30,w:66,h:84,wx:372,wy:120,look:'A plane tree, broad enough to shade a small congregation.',use:'Its shade is not mine to take up. Not until I know whose it is.'},
  {name:'road to the gate',x:452,y:86,w:28,h:44,wx:458,wy:124,dir:1,look:'The road back up to the west gate of Philippi.',exit:toCity}]};
LY.hs={name:'Lydia',actor:LY,look:()=>say(P,F.sat?'A woman in a shawl of the color she sells. She has not taken her eyes off whoever is speaking.':'A woman in a purple shawl, praying with her eyes shut. The others take their place from hers.'),
  show:{tablets:'Is that the Law and the Prophets, sir, in your own hand? Read to us from it.','*':'Put it by, sir. Nobody trades on this bank.'},talk:woman(LY),
  as:{luke:{look:'A woman of some means, by her shawl. She listens as some people eat: as if she had been hungry for a long time.',talk:woman(LY),show:{'*':'Put it by, sir. Nobody trades on this bank.'}}}};
PH.hs={name:'Phila',actor:PH,look:()=>say(P,F.sat?'Phila. She made room for us on the stones before she had heard one word.':'A younger woman, with her hands open on her knees.'),
  show:{tablets:'Writing! None of us can read, sir, but two. Read it out.','*':'Keep it, sir. We brought nothing here either.'},talk:woman(PH),
  as:{luke:{look:'A young woman. She made room for four strangers without being asked.',talk:woman(PH),show:{'*':'Keep it, sir.'}}}};
EL.hs={name:'Elpis',actor:EL,look:()=>say(P,F.sat?'Elpis. She is the oldest of them, and she is nodding at every word of the prophets.':'An older woman, grey under her shawl. Her lips are moving.'),
  show:{tablets:'My eyes are past it, sir. Say it, and I will know whether I have heard it before.','*':'Keep it, sir.'},talk:woman(EL),
  as:{luke:{look:'An old woman, straight in the back. She has prayed on this bank for a long time.',talk:woman(EL),show:{'*':'Keep it, sir.'}}}};
/* ============ THE COMPANIONS: Silas and Timothy, who walk along; Luke and Paul, as each sees the other ============ */
/* what there is still to do, as a companion would put it to Paul */
const todo=()=>inFork()?(F.asia?'The track north is open, Paul. Let us see where it goes.':'The road to Ephesus lies in front of us. What are we waiting for?')
  :inBor()?(F.bith?'West, you said. It is a long road. We had better begin it.':'The ferry is on this bank, and the ferryman is waiting.')
  :inTro()?(!F.vision?(F.slung?'Nothing more tonight. The physician has asked us to his inn.':F.bound?'The arm wants a sling, the physician says. That is cloth, Paul: your trade.':F.clean||F.strips?'The physician is waiting for the linen.':'That man is bleeding, and the physician wants clean linen.')
    :F.concl?'The ship, Paul. Leon will not wait for the wind to change its mind.':'You have something to tell us. I can see it.')
  :inPhi()?(F.sab?'It is the Sabbath, and you know which gate.':clues()?'We wait for the Sabbath. You have your bench, and I shall find mine.':'Ask those who see the whole city go by: the men at its gates, and the women in its shops.')
  :F.sab?(F.sat?'They are listening, Paul. Speak to them.':'They are praying. You must choose how we come to them.'):'Nobody is here. We have the place, and not the day.';
const SILAS8={name:'Silas',actor:SI,
  look:()=>say(P,inFork()?'Silas. He walked from Jerusalem to Antioch to carry a letter, and he has not turned back since.':inBor()?'Silas. Twice a road has been closed in his face, and he has not once asked me whether I am sure.'
    :inTro()?(F.vision?'Silas. He is a prophet, and this time the vision came to me. He is waiting to hear it.':'Silas, with the dust of Mysia on him to the knees.'):inPhi()?'Silas. He has learned the names of half this street already.':'Silas. He looks at this river bank as if it were a synagogue.'),
  show:{linen:'Clean linen! Give it to the physician, Paul, or cut it first: you know cloth.',bandage:'Those are for the physician.',offcut:'Old sailcloth. You see something in it. I see a rag.',sling:'You sewed that for a stranger, on a quay, in a city that you have never seen before. Give it to the physician.',
    awl:'Your awl. It has opened more doors for us than my tongue has.',tablets:'Read me one tonight. You choose them better than I do.','*':'Keep it, brother. You will find a use for it.'},
  ask:{linen:'My mantle has the dust of three countries in it. Ask Timothy: his mother packed his bundle.',sling:'There is old sailcloth lying by the stern of that ship. Would that serve?',
    syn:'A city keeps few secrets from the men at its gates, or from the women in its shops. Ask them what they have seen.'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'What is still to do here?',a:()=>say(SI,todo())},
    {q:'What do you make of it, Silas: two roads closed?',if:()=>!!F.asia&&!F.concl,once:1,a:()=>say(SI,'That we were told where not to go, and not yet where to go. I have known the spirit to speak more plainly. I have never known it to speak without a purpose.')},
    {q:'Stay close, brother.',bye:1}])},
  as:{luke:{look:'Silas, of Jerusalem. He says little, and misses nothing.',
    talk:()=>say(SI,inTro()&&!F.vision?'You have steady hands, physician. That man was more frightened than he was hurt.':'You watch everything, Luke, as if you meant to write it down. Somebody should.'),show:{lbag:'Keep it by you. On our road, somebody always needs it.','*':'Keep it, brother.'}}}};
const TIM8={name:'Timothy',actor:TI,
  look:()=>say(P,inFork()?'Timothy. Some weeks from his mother\'s door, and he still looks at every milestone.':inBor()?'Timothy. He left Lystra at my word, and so far I have shown him two closed doors.'
    :inTro()?'Timothy. He has never seen the sea before, and he cannot take his eyes off it.':inPhi()?'Timothy. He is counting the Latin words on the walls, and understanding none of them.':'Timothy. He is as quiet as he was in his grandmother\'s house, when the psalms were read.'),
  show:{linen:'My mother packed it. Use it, Paul: I think that this is the day she meant.',bandage:'Cut so straight! Take them to the physician.',sling:'A sling, out of a rag. Shall I carry it to the physician for you?',tablets:'Are there new ones, Paul? I have the old ones by heart.',
    awl:'The awl. I watched it by lamplight when I was a boy.','*':'Shall I carry that for you, Paul?'},
  ask:{linen:async()=>{if(F.linen)return say(TI,'You have it, Paul. Cut it as he wants it.');
      await say(TI,'Clean linen? My mother packed a cloth in my bundle. "For the day you need it," she said. I think that this is the day.');F.linen=1;toPaul('linen');
      await say(P,'A whole cloth, and clean. The physician wants strips: and cutting cloth is my part of this.')},
    sling:'My linen went into the bandage, Paul. But there is a heap of old sail over by the stern.',syn:'I have looked in every street for a house where the Law is read, Paul. I have not found one.'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'What is still to do here?',a:()=>say(TI,todo())},
    {q:'Are you sorry that you came, Timothy?',if:()=>!!F.asia&&!F.vision,once:1,a:async()=>{await say(TI,'No, Paul. But I thought that we should be preaching, and we have done nothing but walk.');
      await say(P,'So did I. I cannot tell you why, and I will not pretend that I can. I can tell you who is leading us: and he has never yet led me wrong.')}},
    {q:'Stay close, Timothy.',bye:1}])},
  as:{luke:{look:'Timothy: young, and quick, and worn thin by a long road. He should eat more.',
    talk:()=>say(TI,inTro()&&!F.vision?'Is it true that wine cleans a wound, sir? My grandmother uses oil for everything.':'Paul says that you are coming with us, brother. I am glad of it.'),show:{lbag:'May I see what is in it, when there is time?','*':'Shall I carry that for you, brother?'}}}};
/* Luke when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const LUK8={noCraft:"That is the tentmaker's craft, not mine. I should only spoil good cloth.",
  def:{look:'I see nothing there that needs a physician.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',
    use:"That is not my craft. Paul's hands know it better.",open:'It does not open.',talk:'I would get no answer.',give:'First I should choose something to give.'}};
const LUKE8={name:'Luke',actor:LU,
  look:()=>say(P,inTro()?(F.vision?'Luke. He has put his bag over his shoulder, as a man does who expects to be asked to come.':F.slung?'Luke. He looks at my seam as I looked at his bandage.':'A physician, kneeling on the quay beside a stranger. He asked nobody who would pay him.')
    :inPhi()?'Luke. In three days he has learned where every sick person in this street lives.':'Luke. He is watching these women as he watches the sick: missing nothing.'),
  show:{linen:'A whole cloth. Strips, Paul: straight along the thread, a hand wide. You cut cloth for your living.',offcut:'Sailcloth? Not on a wound. But keep it: I may want it in another shape.',
    awl:'An awl. In my trade we should call that a very large needle.',tablets:'You keep notes. So do I.','*':'Keep it, brother. I have my own bag to carry.'},
  ask:{linen:'Any clean linen, cut into strips. And soon, friend: he is losing blood.',sling:'Any sound cloth will do for a sling: it does not touch the wound. It must be broad, and it must not cut into his neck.',
    syn:'I have asked in three streets. Nobody knows of one. But somebody always knows where people go on a certain day.'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'What do you need, Luke?',if:()=>eve()&&!F.slung,a:()=>say(LU,!F.strips?'Linen, Paul. Clean, and in strips. The wine and the oil I have.':!F.bound?'Put the strips into my hand, and let me work.':'A sling, to carry the arm high. Any sound cloth will do: it does not touch the wound.')},
    {q:'What is still to do here?',if:()=>!eve()||!!F.slung,a:()=>say(LU,todo())},
    {q:'Why did you stop for him?',if:()=>!!F.slung,once:1,a:()=>say(LU,'He was bleeding, and I was there. I have never needed a better reason than that. You stopped too.')},
    {q:'Stay close, Luke.',bye:1}])}};
/* Paul, as Luke sees him and talks to him */
const PAUL8={name:'Paul',actor:P,as:{luke:{
  look:()=>say(LU,inTro()?(F.vision?(F.concl?'Paul. He told us what he saw, and then he asked us what it meant. I had not expected the second part.':'Paul. He has been awake since before the light, and there is something that he has not said.')
      :F.slung?'A tentmaker of Tarsus. He has walked for weeks without knowing why, and he says so to a stranger.':'A traveler, with the dust of a long road on him, and a workman\'s hands.')
    :inPhi()?'Paul. He asks an old soldier about a gate, and a shopkeeper about a shutter. He is not asking idly.':'Paul. He crossed the sea for this river bank, and he knows it.'),
  talk:()=>talkTree([
    {q:'What can I do, Paul?',a:()=>say(P,inTro()?(!F.vision?(F.slung?'Nothing more tonight, brother. Show us this inn of yours.':F.bound?'Wait a little. A sling is cloth, and cloth is my part.':'Your own craft, Luke. I will see that the linen comes to your hand.')
        :F.concl?'Come aboard with us. I think that you had decided that already.':'Hear what I have to tell: you and the others together.')
      :inPhi()?(F.sab?'Come down to the river with us.':'Keep asking, as I do. Somebody in this city has seen where they go.'):F.sat?'Sit with us, and speak when I have spoken.':'Wait with me. I am thinking how we should come to them.')},
    {q:'I will leave you to it.',bye:1}]),
  show:{lbag:'Your craft, Luke, not mine. I should not know which flask to open.',bandage:'Those are for your hands, brother.',sling:'I sewed it. You are the one who knows how it should sit.','*':'Keep it by you, Luke.'}}}};
/* ---------- Luke's side of things, when he is the one being played ---------- */
const AS_L={
  troas:{'sea':{look:()=>say(LU,F.vision?'The sea, and a fair wind over it. Two days ago I had not thought that I should be crossing it.':'The sun going down into the sea. From this quay the next land is Macedonia.')},
    'door of the inn':{look:'The inn where I lodge. The beds are hard, and the keeper is honest.'},'warehouse':{look:'A warehouse. Where loads are lifted, a physician is never idle for long.'},
    'jars of oil':{look:'Jars of oil. One of them is the reason that I have a patient.'},'bales':{look:'Dyed wool, from the cities of Asia. Somebody over the sea is waiting for it.'},
    'broken jar':{look:'Shards, and spilt oil. That is what opened his arm.',pickup:'I have one cut to care for already.'},
    'gangplank':{look:()=>say(LU,F.concl?"The gangplank. I am going up it with three men whom I did not know two days ago.":'The gangplank of the coaster.')},
    'ship':{look:'A sound ship, and a careful master. A passenger can ask for no more.'},'coil of rope':{look:'Line, neatly coiled. Sailors are tidier than physicians.'},
    'heap of old sailcloth':{look:'Old sailcloth. Not clean enough for a wound. Sound enough, perhaps, for something else.',pickup:"Cloth is Paul's craft. He will see what is in it."}},
  philippi:{'citadel':{look:'A fortress on a rock. The whole city stands to attention under it.'},'west gate':{look:'The gate we came in by, and an old soldier beside it who has not moved since.'},
    "awning maker's shop":{look:'Paul found work here within an hour of coming through the gate.'},'bench':{look:"Paul's corner of the bench. He sews as I bind: without looking at his hands.",use:"That is the tentmaker's craft, not mine."},
    "Zosime's shop":{look:'Purple. There is a great deal of money in this street.'},'torn awning':{look:'A torn awning. Paul has been glancing up at it all morning.',use:"That is the tentmaker's craft, not mine."},
    'mended awning':{look:'An awning with a new seam in it. Nobody asked him to.'},'shuttered shop':{look:'Closed shutters, in the middle of the day.',use:'I knock. Nobody is at home.',open:'It is barred.'},
    'fountain':{look:'Clean water, running. If every street had this, I should have less to do.',use:'I drink, and I wash my hands. A physician cannot do that too often.'},
    'street to the marketplace':{look:'The street to the marketplace, where the magistrates sit.'}},
  river:{'mountain':{look:'The mountains of Macedonia.'},'city':{look:'Philippi, on its hill. From here one would not think that it had no place for these women to pray.'},
    'river':{look:'Clear water, and quick. Good to drink, and good for more than that.',use:'I wash my hands in it.'},
    'flat stones':{look:'Stones worn smooth by people sitting. This place has been used for a long time.'},
    'plane tree':{look:'Shade, and running water. Whoever chose this place knew what the sick need, and the well too.'},'road to the gate':{look:'The road back to the gate.'}}};
for(const r in AS_L)for(const h of ROOMS[r].hs){const n=Object.getOwnPropertyDescriptor(h,'name');const names=n&&n.get?['torn awning','mended awning']:[h.name];for(const k of names)if(AS_L[r][k]){h.as=h.as||{luke:{}};Object.assign(h.as.luke,AS_L[r][k])}}
{const aw=ROOMS.philippi.hs.find(h=>h.use===mendAwn);aw.as={luke:{look:()=>say(LU,F.awn?'An awning with a new seam in it. Nobody asked him to.':'A torn awning. Paul has been glancing up at it all morning.'),use:"That is the tentmaker's craft, not mine."}}}
/* the flat stones and the women, in Luke's hands: he waits for Paul */
ROOMS.river.hs.find(h=>h.name==='flat stones').as.luke.use=()=>F.sab&&!F.sat?approach():say(LU,F.sat?'I am sitting. Paul is the one who should speak first.':'I sit down for a moment. It is a good place.');
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'linen',q:'The physician needs clean linen.',if:()=>eve()&&!F.linen&&!F.strips},
  {id:'sling',q:'The arm wants a sling, and I have no cloth for one.',if:()=>eve()&&F.bound&&!F.offcut&&!F.sling},
  {id:'syn',q:'Where do worshippers of God meet in this city?',if:()=>inPhi()&&!clues()}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Silas',note:'A prophet, and a leading man among the brothers in Jerusalem. He has walked every step of this road beside me.'},
    {name:'Timothy',note:"The son of Eunice, of Lystra. He left his home at my word, and he has not complained of the road once."},
    {name:'Attalos',note:'A carrier of wool, who takes the paved road down to Ephesus four times a year.',if:inFork},
    {name:'Kleitos',note:'The ferryman at the edge of Bithynia.',if:inBor},
    {name:'Luke',note:()=>F.concl?'A physician, and a brother. He was with us when the conclusion was drawn, and he is with us now.':'A physician. He knelt down beside a bleeding stranger, and asked nobody who would pay him.',if:()=>inTro()||inPhi()||inRiv()},
    {name:'Leon',note:'A shipmaster of Troas, bound for Neapolis in Macedonia.',if:inTro},
    {name:'Sosias',note:"Leon's steersman. A jar slipped from its sling and laid his forearm open.",if:eve},
    {name:'Quintus',note:'An old soldier, who sits by the west gate of Philippi and sees everybody who goes through it.',if:()=>inPhi()||inRiv()},
    {name:'Zosime',note:'A seller of purple in Philippi. The shop beside hers is closed every seventh day.',if:()=>inPhi()||inRiv()},
    {name:'Lydia',note:()=>F.sat?'She comes from the city of Thyatira, sells purple, and worships God. (Acts 16:14)':'A seller of purple from Thyatira, who closes her shop every seventh day.',if:()=>!!F.shop}],
  tasks:[
    {t:'Take the paved road west, to Ephesus and the cities of Asia.',if:()=>inFork()&&!F.asia},
    {t:'Asia is closed to us. Go on by the road that is still open.',if:()=>inFork()&&F.asia},
    {t:'Cross the river into Bithynia.',if:()=>inBor()&&!F.bith},
    {t:'Bithynia is closed to us. Take the road west, through Mysia to the sea.',if:()=>inBor()&&F.bith},
    {t:'The physician needs clean linen, cut into strips.',if:()=>eve()&&!F.bound},
    {t:'The arm wants a sling.',if:()=>eve()&&F.bound&&!F.slung},
    {t:'Go to the inn for the night.',if:()=>eve()&&F.slung},
    {t:'Tell the brothers what I saw in the night.',if:()=>inTro()&&F.vision&&!F.concl},
    {t:'Go aboard: the ship is bound for Macedonia.',if:()=>inTro()&&F.concl},
    {t:'Find out where the worshippers of God meet in Philippi.',if:()=>inPhi()&&!clues()},
    {t:'Work at the bench until the Sabbath.',if:()=>inPhi()&&clues()&&!F.sab},
    {t:'On the Sabbath: outside the gate, beside the river.',if:()=>(inPhi()||inRiv())&&F.sab&&!F.sat},
    {t:'Speak to the women who have assembled.',if:()=>inRiv()&&F.sat}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ PLACING THE CAST, SETUP ============ */
/* ENT: where Paul stands when a room is entered. The others stand near him: Silas, then Timothy, then Luke once he is with them. */
const ENT={fork:[300,124,-1],ferry:[380,124,-1],troas:[120,124,1],philippi:[176,126,1],river:[380,126,-1]};
const joined=room=>room==='troas'||room==='philippi'||room==='river';
function place8(room){const e=ENT[room],d=e[2];for(const a of[SI,TI,LU,AT,KL,LE,SO,QU,ZO,LY,PH,EL])a.room=null;for(const a of[P,SI,TI,LU,LY,PH,EL,SO])a.bow=false;
  place(P,room,e[0],e[1],d);place(SI,room,e[0]-d*28,e[1]+3,d);place(TI,room,e[0]-d*54,e[1]+5,d);if(joined(room))place(LU,room,e[0]+d*30,e[1]+4,d);
  if(room==='fork')place(AT,room,188,119,-1);
  else if(room==='ferry')place(KL,room,338,117,1);
  else if(room==='troas'){place(LE,room,326,119,-1);
    if(!F.vision){place(SO,room,222,124,-1);place(LU,room,196,125,1);SO.bow=!F.slung}
    else{place(P,room,150,124,1);place(SI,room,112,128,1);place(TI,room,84,126,1);place(LU,room,196,127,-1)}}
  else if(room==='philippi'){place(QU,room,62,113,1);place(ZO,room,196,113,1);place(TI,room,150,129,1);place(SI,room,316,128,-1);place(LU,room,344,126,-1)}
  else if(room==='river'&&F.sab){place(LY,room,246,121,1);place(PH,room,214,124,1);place(EL,room,278,123,-1);if(!F.sat)for(const a of[LY,PH,EL])a.bow=true;
    else{place(P,room,230,131,1);place(SI,room,296,134,-1);place(TI,room,186,132,1);place(LU,room,350,132,-1)}}
  swapBtn()}
function setup8(){SI.hs=SILAS8;TI.hs=TIM8;LU.hs=LUKE8;P.hs=PAUL8;P.called='Paul';Object.assign(LU,LUK8);LU.speed=0;LU.free=false;for(const id in BY8)(ITEMS[id].by=ITEMS[id].by||{}).luke=BY8[id];
  G.metFork=G.metTroas=G.metPhil=G.metQu=G.metRiv=G.knew=G.sawRiver=0;G.st=null;place8('fork');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,luke:['lbag']};drawInv()}
/* ============ SCENES: the vision, the deck, the house; the opening; PRAYER HINTS ============ */
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. */
function cast(g,list,lit){list.sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,lit,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),7.5)})}
/* The vision is not shown: a dark screen, and the words of Acts 16:9. */
function dark(g){g.fillStyle='#05060e';g.fillRect(0,0,VW,VH)}
/* The deck, at anchor under Samothrace. Timothy is at the rail; the others sit and stand about the lamp. */
function deckScene(g,t){backdrop(g,'deck8');const talk=Math.floor(t/700)%2;
  cast(g,[['timothy8',118,126,1],['paul',150,130,-1,{ges:talk}],['silas8',196,128,-1],['luke',232,132,-1]],'#9aa2c8');
  for(let i=0;i<8;i++){const k=((t/2600+i*.125)%1);R(g,230+(i*23)%80,90+(i*5)%14,4+(i%3)*2,.5,`rgba(214,224,250,${.5*Math.sin(k*3.1416)})`)}}
/* Lydia's house, that evening: her household and her four guests. */
function houseScene(g,t){backdrop(g,'lydia8');ART.lydia8.draw(g,t);const talk=Math.floor(t/700)%2;
  cast(g,[['hh1',40,122,1],['hh3',76,119,1],['lydia',112,124,1,{ges:talk}],['hh2',96,131,1],['paul',176,126,-1],['silas8',212,122,-1],['luke',240,128,-1],['timothy8',266,124,-1]],'#eac8a0')}
const OPENING=[['iconium','antiochp','new'],['antiochp','westroad','new']];
async function start8(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(8);G.end={};enterRoom('fork',...ENT.fork);codeBtn();
    try{await need('map');await SHARED.map.journey(OPENING,{labels:LABELS,view:'aegean',text:[
      'About 50 C.E. Paul, Silas and Timothy had delivered the decrees in the cities, and the congregations kept growing firmer in the faith, and larger in number with every day. (Acts 16:4, 5)',
      'Acts does not name those cities, or the road beyond them. Some days further on, a paved road ran west: down to Ephesus, and the most populated part of the province of Asia.']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;setScore(MUSIC);AU.mood=ROOMS.fork.mood;AU.amb=ROOMS.fork.amb;codeBtn();await fade(0,600);G.metFork=1;
    await say(P,'There it is, brothers: the road to Ephesus. City after city, and thousands of people in them who have never heard the name of Jesus.');
    await say(TI,'All the way down to the sea, Paul?');
    await say(SI,'It is a good road, and it leads to where the people are. I see nothing against it.');
    await say(AT,'To Ephesus? Then walk with me, friends. I take wool down that road four times a year, and a road is shorter in company.');
    await say(P,'We know what to preach, and how. And there lies the where, paved and waiting.',TH)},true)}
function hint8(){const b=PC()!==P,his=['paul8b',['This is for Paul to decide. I have known him two days, and I already know that he will not be hurried.','Paul should do this. I can leave it to him.']],
    craft=['craft8',["That is the tentmaker's craft, not mine. A physician knows when to stand back.",'Paul should do this part. I can leave it to him.']],has2=id=>invOf(LU).includes(id);
  if(inFork())return!F.asia?['west8',['I know what to preach, and how. The paved road leads to where the most people are.','I should take the paved road west.']]
    :['north8',['One road is closed. That does not close them all. A man can be turned only while he is walking.','We can take the track to the north.']];
  if(inBor())return!F.bith?['bith8',['Bithynia has cities too, and it lies just over this water.','I should use the ferry.']]
    :['sea8',['Asia is closed, and Bithynia is closed. One road is left: and I was never told to stop walking.','We can take the road west, along the bank.']];
  if(inTro()){
    if(!F.vision){
      if(F.slung)return['inn8',['The man is cared for, and it is nearly dark. Luke has asked us to his inn.','We can go in at the door of the inn.']];
      if(b)return!F.clean?['clean8',['A dirty wound, and I have wine and oil in my bag. That much I can do before any linen comes.','I should use my bag on Sosias.']]
        :!F.bound?(has2('bandage')?['bind8',['The wound is clean, and I have strips of linen in my hand.','I should use the linen strips on Sosias.']]:['wait8',['The wound is clean. It wants binding, and I have no linen. The tentmaker is seeing to that.','Paul should bring me linen strips.']])
        :has2('sling')?['hang8',['Bound. Now it must be carried high.','I should use the sling on Sosias.']]:['wait8b',['It wants a sling. Cloth and a hem: that is not my craft.','Paul should sew a sling, and bring it to me.']];
      if(!F.strips)return!F.linen?['linen8',['Clean linen. I carry none. But I am not the only one of us with a bundle: and one of us had a mother to pack his.','I should ask Timothy about the linen.']]
        :['cut8',['A whole cloth, and a physician who wants strips. Cutting cloth is something that I know.','I should use my knife on the linen cloth.']];
      if(!F.bound)return['give8',["The strips are cut. Binding a wound is the physician's craft, not mine.",'I should give the linen strips to Luke. He does the rest.']];
      if(!F.sling)return!F.offcut?['off8',['A sling is a band of cloth with a hem. There is old sailcloth lying on this quay.','I should pick up the old sailcloth by the stern of the ship.']]
        :['sew8',['Sound cloth, an awl and thread. A sling is the simplest thing I shall ever sew.','I should use my awl on the old sailcloth.']];
      return['give8b',["The sling is sewn. How it should sit is the physician's business.",'I should give the arm sling to Luke.']]}
    if(!F.concl)return b?his:['tell8',['I saw what I saw. It is not for me alone to say what it means.','I should talk to Silas, Timothy or Luke, and tell them exactly what I saw.']];
    return['ship8',['God has summoned us to Macedonia, and a ship for Macedonia is lying at the quay.','We can go up the gangplank.']]}
  if(inPhi()){
    if(F.sab)return['riv8',['It is the Sabbath. I think that there is a place of prayer by the river.','We can go out by the west gate.']];
    if(clues())return b?craft:['work8',['I know the place, and I know the day. Until it comes, there is honest work.','I should use my bench.']];
    return b?his:!F.gate?['gate8',['Who sees everybody who leaves a city? I should not ask him what he thinks. I should ask him what he has seen.','I should talk to the old soldier at the gate, and ask who goes out that is not going to work.']]
      :['shop8',['A row of shops, all open but one. Shutters are something that a neighbor sees.','I should talk to Zosime, and ask why the shop beside hers is shut.']]}
  if(!F.sab)return['back8',['The place I have found. The day I have not.','We can go back up the road to the gate.']];
  if(!F.sat)return b?his:['sit8',['They came out to pray, under the open sky. I am a stranger here, not a ruler of a synagogue.','I should talk to the women, and sit down among them.']];
  return b?his:['speak8',['They know the Scriptures. I can begin where they already are.','I should talk to Lydia.']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['No, Paul. But I thought that we should be preaching, and we have done nothing but walk.']};
return{acting:ACTING,rooms:['fork','ferry','troas','philippi','river'],setup:setup8,start:start8,hint:hint8,music:MUSIC,scenes:{dark,deck:deckScene,house:houseScene},topics:TOPICS,tablets:TABLETS,
  /* The whole road of the chapter, on a map of its own, as Chapters Four and Seven have theirs: seen through the Aegean window. */
  view:'aegean',labels:LABELS,route:ROAD,
  /* Luke joins at Troas. Until then he stands in no room, and a code must not put him in one. */
  away:id=>id==='luke'&&!joined(G.room),
  flags:['asia','bith','linen','strips','offcut','sling','clean','bound','slung','vision','concl','gate','shop','sab','sat','awn'],
  /* nine characters: 19 flags, three bits for each man's room, one for who is played, and nine for who carries what */
  codeBits:{share:9},party:['paul','luke'],home:{lbag:'luke'},share:['linen','bandage','offcut','sling','lbag'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.linen&&!F.strips,'linen');add(F.strips&&!F.bound,'bandage');add(F.offcut&&!F.sling,'offcut');add(F.sling&&!F.slung,'sling');inv.push('lbag');return inv},
  place:place8}
});
