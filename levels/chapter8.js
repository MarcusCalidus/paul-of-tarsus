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
   the pipes'. Where a road is closed (mood "tense") nothing is held: the low string plucks the keynote on the threes and twos
   and leans on the note above it, the drum ticks with it and almost stops every fourth bar, and the ney begins the tune and breaks
   off a note before its phrase ends; by night (mood
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
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,vol:.9,seq:{A:[-7,_,_,-7,_,-6,_,_,-7,_],B:[-7,_,_,-7,_,-6,_,_,-10,_],C:[-7,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',seq:{A:'d..k.k..k.',B:'d..k.k.kk.',C:'d.........'},vol:.6},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:.8,lines:[TUNE[0],TUNE[1].slice(0,-1),[],[],TUNE[4],TUNE[5].slice(0,2),[],[]]},
  {drone:[0],every:20,moods:['night'],vol:.7},
  {inst:'harp',moods:['night'],prog:'ABAC',len:6,oct:12,seq:{A:[0,_,_,_,_,4,_,_,_,_],B:[-1,_,_,_,_,3,_,_,_,_],C:[1,_,_,_,_,4,_,_,_,_]},vol:.7},
  {inst:'harp',moods:['rest'],prog:'AABAACBA',len:4,oct:12,seq:{A:[-1,_,_,1,_,3,_,_,1,_],B:[3,_,_,5,_,6,_,_,5,_],C:[2,_,_,4,_,6,_,_,4,_]}},
  {inst:'bass',moods:['rest'],prog:'AABAACBA',len:5,seq:{A:[-8,_,_,_,_,-4,_,_,_,_],B:[-4,_,_,_,_,-8,_,_,_,_],C:[-5,_,_,_,_,-8,_,_,_,_]}},
  {drum:1,moods:['rest'],prog:'AB',seq:{A:'b.........',B:'..........'},vol:.5},
  {inst:'aulos',moods:['hope'],hold:7,loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['rest'],loop:8,oct:12,lines:RIVER}]};

/* ============ ART ============ */
/* The shared materials (shared/materials.js): quiet grain, hand-set cracks, soft contact shadows, earth colors. This chapter has an earth() of its
   own (trodden ground), so the shared one is earthTone here. */
const{plank,board,crack,skipCracks,shadow:softShadow,earth:earthTone,ceiling:ceiling8}=SHARED.materials;
/* The open country (shared/country.js): rock, turf, the plots of a plain, reeds and trees, painted alike in every chapter. Where a room's old
   painter has made way for it, the old one still runs on SCRAP8, a scrap canvas nobody sees, so that it takes its draws from the room's
   rng() in their order and everything the room paints after it stays where it was */
const CO=SHARED.country,SCRAP8=mk(4,4)[1];
const SH=earthTone('#8f95c8',.2);
/* dayLight8: the light of an open scene, laid over it as a lightmap: the sky above hz untouched, everything below it a little less than full
   day, and fn(l) adds where the sun falls (pools, long and low wherever a head can come) and where shade gathers */
const DAY8='#e6e0d6';
function dayLight8(g,w,hz,fn){lightmap(g,w,DAY8,l=>{R(l,0,0,w,hz,'#ffffff');l.fillStyle=lg(l,0,hz,0,hz+18,['#ffffff',DAY8]);l.fillRect(0,hz,w,18);fn(l)})}
/* skyE: the stops of a sky drawn a little toward their own grey */
const skyE=st=>st.map(c=>earthTone(c,.12));
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* rock: a stone sitting on the ground at x,y, on a soft shadow of its own (cut: the outline only, for the room's props). Its lit face and its
   shaded one, and a few weathered hollows in two tones, each with a lit lip */
function rock(g,x,y,w,h,c,cut){if(!cut)softShadow(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),.5,'#1e1a32');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);if(cut)return;clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.2));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.24));
    tex(g,'mott',.3,x-w/2,y-h,w,h,'overlay',1);ao(g,x-w/2,y-h*.3,w,h*.3,'b',.22,'#2a2436');
    if(w>10){const q=rng(Math.round(x*7+y*13));for(let k=0;k<2;k++){const sx=x-w*.2+q()*w*.4,sy=y-h*.7+q()*h*.4;stroke(g,[sx,sy,sx+1.4+q(),sy+.6],'rgba(30,26,40,.32)',.5);stroke(g,[sx,sy-.5,sx+1.4,sy+.1],'rgba(255,250,236,.14)',.5)}}})}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.38,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.12,x,y0,w,y1-y0,'overlay',.5);
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
ART.fork={w:480,fp:1.25,q:12,
 paint(g){const r=rng(811);
  sky(g,480,74,skyE(['#3b79c4','#74a6da','#b6d0e4','#ebe6d2']));cloud(g,96,12,60,7,r);cloud(g,250,22,46,5,r);cloud(g,408,10,56,6,r);
  /* far to the north: the mountains of the plateau, with the snow still on them in spring */
  snowy(g,0,480,66,plat8,['#8696be','#a8b4cc','#c9ccd0'],15);CO.range(g,0,480,66,x=>Math.min(plat8(x),15),['#8696be','#a8b4cc','#c9ccd0'],{k:.7});
  comp(g,'screen',.32,()=>{g.fillStyle=lg(g,0,40,0,66,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(0,40,480,26)});
  /* the plateau: long swells of steppe, green with the spring, and a few fields on them */
  const sw1=x=>19+4*Math.sin(x/97+2)+2*Math.sin(x/33),sw2=x=>14+3*Math.sin(x/61+1)+1.6*Math.sin(x/19+3),
    swell=(b,f)=>()=>{g.beginPath();g.moveTo(0,b);for(let x=0;x<=480;x+=2)g.lineTo(x,b-f(x));g.lineTo(480,b);g.closePath()};
  ridge(g,0,480,84,sw1,['#a3b07a','#b3ba82']);
  clipTo(g,swell(84,sw1),()=>CO.plain(g,0,480,62,86,8111,{vx:250,land:'#a8b47a',haze:'#c4ccd0',kinds:['meadow','meadow','green','fallow','stubble','plough','meadow','green'],clouds:2}));
  for(let i=0;i<9;i++){const fx=14+i*52+r()*14,fy=69+r()*7;poly(SCRAP8,[fx,fy,fx+26,fy-1.4,fx+32,fy+5,fx+4,fy+6.4],'#000')}
  R(g,0,83,480,17,'#b0b476');ridge(g,0,480,99,sw2,['#a8b26c','#bcbb7a']);
  clipTo(g,()=>{swell(99,sw2)();g.rect(0,83,480,16)},()=>CO.turf(g,0,80,480,100,'#aab470',8112,{dense:.7,dry:.3,flowers:30,scale:.35}));
  {const f=x=>99-sw2(x);for(let x=0;x<480;x+=1)R(g,x,f(x),1,.6,'rgba(255,248,224,.25)')}
  /* a sheepfold of field stone, and a wild pear in blossom beside it */
  ashlar(g,372,79,34,5,'#b6ad94',r,{bw:5,bh:2.5,v:.12,t:.3});R(g,372,78.4,34,.8,'#d6ccb0');
  foliage(SCRAP8,414,68,7,5,'#e6e2d2',r,46);foliage(SCRAP8,411,71,4,3,'#9ab07a',r,14);CO.tree(g,414,84,16,'#e2ded0',{kind:'olive',seed:8113,lean:.2})
  for(let i=0;i<9;i++){const sx=336+i*4+r()*3,sy=82+r()*2;R(g,sx,sy,2.4,1.4,'#e8e2d0');R(g,sx+2,sy-.4,1,1,'#3a3028')}
  /* the ground on the far side of the road, the track north, and its two ruts. It narrows as it climbs, and is lost between the swells */
  earth(SCRAP8,0,98,480,144,'#b8b07a',r,230);
  CO.turf(g,0,97,480,144,'#a2ae6a',8114,{dry:.25,flowers:220});
  {const T=[232,109,272,109,300,92,306,84,301,84,290,92];poly(g,T,'#d0c29a');clipTo(g,()=>poly(g,T),()=>CO.ground(g,232,84,76,26,'#d0c29a',8115,{n:24,size:.5}))}
  stroke(g,[242,109,293,91,303,84],'rgba(120,104,70,.5)',.7);stroke(g,[262,109,298,92,305,84],'rgba(120,104,70,.5)',.7);
  stroke(g,[303,84,306,80,303,77],'#c6ba92',1.6);
  /* the paved road: close-fitted slabs between two kerbs, running east and west */
  pave(g,0,109,480,129,'#c6bca2',r,{vx:240,vy:58,rows:3,step:27,v:.09,joint:'#8d8670',t:.45});
  R(g,0,108,480,1.4,'#e2dac2');R(g,0,108,232,1.4,'#e2dac2');R(g,232,108,40,1.4,'#cfc4a2');R(g,0,129,480,1.6,'#a0977e');R(g,0,129,480,.5,'#d8cfb6');
  ao(g,0,109.4,480,4,'t',.2,'#3a3050');
  /* the verge on the near side: turf, thistles and the flowers of spring */
  flowers(SCRAP8,0,99,480,8,r,60);flowers(SCRAP8,0,131,480,12,r,150);tufts(SCRAP8,0,480,142,5,'#7c9450',r,150);
  /* the milestone: a plain pillar of grey stone, flat-topped, standing on the far kerb where the track leaves. It has no wider base:
     a pillar on a plinth would be an upright on a level band */
  for(const[a,p]of[[.1,[209,109,219,109,226,112.6,214,112.6]],[.14,[209.6,109,217.6,109,223,111.8,214.6,111.8]],[.18,[210,109,216.4,109,220.4,110.8,213,110.8]]])poly(g,p,`rgba(50,40,80,${a})`);
  g.fillStyle=lg(g,210,0,216,0,['#8e887c','#d6d0c0','#b4ae9e','#7e786c']);g.fillRect(210,88,6,21);R(g,210,105.6,6,3.4,'rgba(60,54,70,.25)');
  R(g,210,88,6,.7,'#e6e0d0');for(let j=0;j<3;j++)R(g,211.2,92+j*2.6,3.2+(j%2),.5,'rgba(60,56,70,.5)');tex(g,'mott',.25,208,88,10,20,'overlay',1);
  ao(g,210,88,1.4,21,'l',.18,'#2a2436');ao(g,214.4,88,1.6,21,'r',.22,'#2a2436');
  /* light, and the shadows of the clouds going over */
  comp(g,'multiply',.2,()=>{oval(g,150,118,70,9,'#6a70a8');oval(g,404,134,80,8,'#6a70a8')});
  pool(g,240,0,300,160,'#fff4d0',.1,'screen');ao(g,0,126,480,18,'b',.1,'#2a2050');
  /* the light of the day: the sun full on the plain and the road, the far side of the road a little less, the near verge in the shade of its
     own grass; and the pools are long and low */
  dayLight8(g,480,66,l=>{pool(l,240,82,280,16,'#fffaf0',.55);pool(l,250,118,250,12,'#fff6e6',.6);pool(l,300,94,90,8,'#fff4e0',.35);
    comp(l,'multiply',1,()=>ao(l,0,128,480,16,'b',.22,'#5a5070'));comp(l,'multiply',1,()=>ao(l,0,98,480,8,'t',.1,'#6a6080'))})},
 fore(g){const r=rng(812);CO.boulder(g,44,152,40,18,'#8a8474',8120);CO.boulder(g,560,154,46,20,'#7e786a',8121);
  /* grass, every blade bent the same way by the wind */
  for(let i=0;i<50;i++){const sx=90+r()*80;stroke(SCRAP8,[sx,152,sx+(r()-.5)*8,134+r()*10],r()<.5?'#6f8a48':'#566e3a',.9)}
  for(let i=0;i<56;i++){const q=rng(8122+i),sx=90+q()*80,h=8+q()*12,l=2+q()*3;stroke(g,[sx,152,sx+l*.5,152-h*.6,sx+l,152-h],q()<.5?'#6f8a48':'#566e3a',.9)}
  for(let i=0;i<7;i++){const sx=96+i*10+r()*5,sy=132+r()*6;R(g,sx,sy,2,2,'#8a5a9a');R(g,sx+.4,sy-.6,1.2,.8,'#b88ac0')}
  comp(g,'source-atop',.36,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* the carrier's mule, loaded with wool, standing on the road with its head toward the west */
  SHARED.beasts.mule(g,150,123,-1,0,2,null)},
 front(){}};
/* ---------- The edge of Bithynia: a river, and a ferry drawn up on its near bank ---------- */
const bith8=x=>15+6*Math.sin(x/83+1)+3*Math.sin(x/29)+1.4*Math.sin(x/7);
const FERRY=[236,318];
ART.ferry={w:480,fp:1.25,q:12,
 /* the two stones on the near bank lie a little way out on the ground */
 props:[{y:113,shape:g=>rock(g,96,113,12,6,'#948e80',1)},{y:114,shape:g=>rock(g,22,114,14,7,'#9a9486',1)}],
 paint(g){const r=rng(823);
  sky(g,480,70,skyE(['#4a80c0','#84acd6','#c2d4e2','#e8e8da']));cloud(g,70,14,54,6,r);cloud(g,330,9,62,7,r);cloud(g,438,24,36,4,r);
  /* far off beyond the river, one great mountain with snow on it; nearer, the wooded hills of Bithynia. The haze lies along the whole
     horizon, so that it has no edge of its own in the sky */
  snowy(g,96,376,60,x=>25*Math.exp(-Math.pow((x-232)/58,2))+4+2*Math.sin(x/9),['#8a9ac0','#aab6cc','#c8ccd2'],13);
  comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,60,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(0,34,480,26)});
  ridge(g,0,480,74,bith8,['#5d7c5c','#6e8c66']);
  /* the wood on them: the pines higher up the slope stand farther off, and those below them in front */
  const rw=rng(825),wood=[];for(let i=0;i<110;i++){const x=2+i*4.4+rw()*4;wood.push([x,74-bith8(x)*(.15+rw()*.7),7+rw()*4,rw()<.5?'#3f6048':'#4a6c50'])}
  for(const[x,y,h,c]of wood.sort((a,b)=>a[1]-b[1]))pine(g,x,y,h,c);
  for(let i=0;i<160;i++)r();/* the wood has numbers of its own: r goes on as it did before there was one, so that nothing below it moves */
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
  shade(g,[398,110,466,110,474,116,406,116],SH,.5);plaster(g,400,84,62,26,'#c8b48a',r,{patch:2,cracks:0,brick:'#8a7450',t:.42});skipCracks(r,3);
  {const rb=rng(8231);crack(g,404,86.4,2,rb,.9);crack(g,455,86,2,rb,.8)}ao(g,400,98,62,12,'b',.26,'#3a2c20');ao(g,400,84,4,26,'l',.16,'#2a2030');
  poly(g,[394,85,468,85,456,68,408,68],'#a8905a');clipTo(g,()=>poly(g,[394,85,468,85,456,68,408,68]),()=>{for(let i=0;i<40;i++){const x=394+i*2;stroke(g,[x,85,x+(i%5-2)*.8+4,68],i%2?'rgba(90,70,36,.5)':'rgba(236,214,150,.4)',.6)}ao(g,394,78,74,7,'b',.35,'#3a2a14')});
  R(g,394,84.6,74,1.2,'#7a6438');R(g,420,92,13,18,'#2c2018');R(g,420,92,13,.8,'#6a5434');R(g,444,93,7,6,'#2c2018');
  /* a great plane tree by the water, and stones at its foot */
  tree(g,62,112,66,'#5c8a4a',r);shade(g,[30,112,110,112,122,122,40,122],SH,.4);softShadow(g,64,112.6,5,1,.4,'#1e1a32');rock(g,96,113,12,6,'#948e80');rock(g,22,114,14,7,'#9a9486');
  pool(g,240,0,300,160,'#fff4d0',.1,'screen');ao(g,0,128,480,16,'b',.1,'#2a2050');
  /* the light of the day: the sun on the water and on the track along the bank, the hut's face lit under its eaves, the shade of the plane
     tree deeper, and the near bank in the shade of its own grass */
  dayLight8(g,480,62,l=>{pool(l,240,96,300,10,'#fffaf0',.5);pool(l,250,119,240,10,'#fff6e6',.6);pool(l,431,97,40,10,'#fff2dc',.45);
    comp(l,'multiply',1,()=>{pool(l,72,117,46,6,'#8a8498',.35,'source-over');ao(l,0,128,480,16,'b',.22,'#5a5070');ao(l,0,74,480,12,'t',.08,'#6a6080')})})},
 fore(g){const r=rng(824);/* reeds, nearest us, and a stone */
  for(let i=0;i<70;i++){const sx=420+r()*150;stroke(g,[sx,154,sx+(r()-.5)*10,118+r()*18],r()<.5?'#5a743c':'#6f8a4a',1)}
  for(let i=0;i<9;i++){const sx=430+i*15+r()*6;R(g,sx,120+r()*10,1.6,5,'#5a4026')}
  rock(g,60,153,42,18,'#7a7468');comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#2c3458'))},
 draw(g,t){const[x0,x1]=FERRY;
  /* light moving on the water */
  for(let i=0;i<16;i++){const k=((t/2600+i*.0625)%1),x=(i*61+k*46)%480,y=89+(i*7)%16;R(g,x,y,5+(i%3)*2,.5,`rgba(236,248,248,${.5*Math.sin(k*3.1416)})`)}
  /* the ferry: a broad flat boat, its bow run up on the gravel; and its pole laid along it */
  oval(g,(x0+x1)/2,108.4,48,2.6,'rgba(20,30,50,.12)');oval(g,(x0+x1)/2,108.4,44,2,'rgba(20,30,50,.16)');oval(g,(x0+x1)/2,108.4,34,1.4,'rgba(20,30,50,.18)');
  /* her side in three strakes, each lit along its upper edge, and the butt joints staggered from strake to strake, each inside its own */
  const HULL=[x0,101,x1,101,x1-7,108.4,x0+9,108.4];poly(g,HULL,'#5a4026');
  clipTo(g,()=>poly(g,HULL),()=>{g.fillStyle=lg(g,0,102.6,0,108.4,['#6a4c2e','#5a4026','#46321e']);g.fillRect(x0,102.6,x1-x0,6);
    for(const[y,j]of[[102.6,[x0+26,x0+58]],[104.6,[x0+12,x0+44,x0+71]],[106.6,[x0+34,x0+63]]]){R(g,x0,y,x1-x0,.5,'rgba(236,206,150,.16)');if(y>103)R(g,x0,y-.5,x1-x0,.5,'rgba(30,20,10,.35)');
      for(const jx of j)R(g,jx,y+.6,.5,.8,'rgba(30,20,10,.38)')}});
  poly(g,[x0,101,x1,101,x1-1.4,102.6,x0+1.6,102.6],'#9a7646');
  stroke(g,[x0+6,100,x1-10,97],'#7a5c36',1.2);stroke(g,[x0+6,99.6,x1-10,96.6],'#b89460',.5)},
 front(){}};
/* ---------- Troas: the quay, at dusk on the day they arrive and in the morning after ---------- */
/* What is seen through the west gate of Philippi: the plain, the hills beyond it, and the road to the river. The gate adds the horizon and the sky of its scene. */
const GATE8={far:['#8ea0b8','#b2bcc8'],near:['#86a064','#9cb074'],land:'#b4bc84',road:'#e2d6b2'};
/* dyed: a bale or a bolt of dyed cloth lying at x,y, banded where it is corded. No cord runs across the bands. */
function dyed(g,x,y,w,h,c){c=earthTone(c,.16);softShadow(g,x+w/2+1,y+.4,w/2+1.4,1.1,.6,'#1e1a32');g.fillStyle=lg(g,0,y-h,0,y,[tint(c,.3),c,tint(c,-.45)]);g.fillRect(x,y-h,w,h);
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
   cross. She has no figurehead: those commonly showed a god. */
ART.troas={w:480,fp:1.25,q:12,
 variant:()=>F.vision?'m':'e',
 /* what stands or lies out on the quay, where a man can walk behind it: the jar that stands forward of the others, the two halves of the broken one
    (the oil and the shards lie flat, and hide nobody), and the heap of sailcloth */
 props:[{y:113,shape:g=>vessel(g,170,113,4.6,15,'#9a4c28','amph',{noShadow:1})},{y:118.6,shape:(g,v)=>{if(v!=='m')brokenJar(g,1)}},{y:118,shape:g=>sailHeap(g,1)}],
 light:()=>F.vision?null:{amb:'#e6c2a8',wallY:104,wall:[[0,92,104,25],[92,104,104,31],[138,152,104,31],[186,196,104,31]],lamps:[[52,92,46,'#5a3c10',104,77]]},
 paint(g,v){const r=rng(829),eve=v!=='m',W=eve?'#d8c4a0':'#e6dcc0',ST='#cfc4a6';
  /* the sky over the sea: the sun going down into it, or the clear light of a morning with the wind in the south */
  if(eve){sky(g,480,64,['#283868','#585a92','#b86a80','#ee9858','#f8d084']);pool(g,372,62,90,38,'#ffe0a0',.7);pool(g,372,62,26,13,'#fff6d8',.9);
    for(const[cx,cy,w]of[[250,22,70],[420,14,56],[330,34,60]])cloud(g,cx,cy,w,5,r,'#f0a070','#5a4a80')}
  else{sky(g,480,64,skyE(['#4c88cc','#86b2de','#c6dcea','#eef0e2']));cloud(g,270,14,60,6,r);cloud(g,410,26,44,5,r)}
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
  house(g,0,24,92,80,W,r,{side:0,patch:3,cracks:0,beams:12,t:.36});skipCracks(r,5);
  /* cracks cut by hand, high under the parapet, where they run to no head; rb: a seed of their own, so the rest of the quay keeps its shape */
  {const rb=rng(8292);for(const[x,y,n]of[[30,28,3],[58,27.6,2],[84,28.4,3]])crack(g,x,y,n,rb,.9)}
  windowArt(g,12,36,11,11,W,{bars:2,wood:'#6a4e2c'});windowArt(g,68,36,11,11,W,{shut:1,wood:'#6a4e2c'});
  R(g,37,56,30,48,tint(W,-.12));doorArt(g,40,59,24,45,'#7a5a3a',r,{bands:[]});R(g,36,102.6,32,1.6,tint(W,.14));ao(g,37,56,30,3,'t',.25,'#2a2030');
  R(g,49,76,5,1.4,'#3a2a18');R(g,49.6,77.4,3.8,3.4,'#b8733c');R(g,49.6,77.4,3.8,.6,'#e0a064');
  ashlar(g,92,30,104,74,ST,r,{bw:13,bh:6.4,v:.09,t:.26});R(g,91,28.4,106,2,tint(ST,.16));poly(g,[196,28.4,201,32,201,104,196,104],earthTone('#9a94a8',.2));
  ao(g,92,30.4,104,4,'t',.22,'#2a2030');ao(g,92,30,5,74,'l',.2,'#2a2030');ao(g,92,92,104,12,'b',.22,'#3a2c20');
  for(const x of[102,150]){arch(g,x,58,38,46,tint(ST,-.3));arch(g,x+2,60,34,44,'#241a14');g.save();arch(g,x+2,60,34,44);g.clip();g.fillStyle=lg(g,0,60,0,104,['#1c1410','#4a3a2a']);g.fillRect(x+2,60,34,44);
    for(const[sx,sw,sh,c]of[[x+7,6,10,'#b8a880'],[x+19,6.6,12,'#c4b48c'],[x+30,5.6,9,'#a89870']])sack(g,sx,104,sw,sh,c);ao(g,x+2,60,34,12,'t',.6);g.restore()}
  /* the ship: moored in the water behind the stone edge of the quay, her hull, painted and structural wales, mast and stays,
     the furled sail on its lowered yard abaft the mast, and the steering oar at her quarter clipped at the quay edge */
  inRect(g,190,0,290,100,()=>SHARED.ship.paint(g,{seed:831,dir:-1,view:'full',x0:228,x1:442,yBot:100,yWaist:83,
    bowRise:8.5,bowSpan:38,bowPow:2.2,sternRise:17.5,sternSpan:44,sternPow:2.2,
    palette:eve?'shaded':'lit',gradY0:64,gradY1:100,
    mast:{x:331,y0:12,y1:83.5,w:3.4,sunRight:eve,stays:[[332.7,13,240,81],[332.7,13,436,71]],stayCol:'#6a5a48',stayW:.55},
    sacks:[[264,3.2,'#b8a67c'],[276,4,'#c6b388'],[288,3.4,'#a8956c'],[302,3.8,'#c2af84']],
    pitch:{f0:.54,color:'rgba(24,14,8,.44)'},
    wale:{f0:.13,f1:.23,color:'#7e3828'},waleWear:{count:18,c1:'#8a643a',c2:'#a85842'},
    lowerWale:{f0:.47,f1:.54,color:'#2e1c10',hi:'#a87e4c'},
    beams:{f:.33,x0:250,x1:424,step:18,w:1.8,h:1.8,color:'#22140c',hi:'#c89a60'},
    scuppers:[272,312,368],
    sunGlow:eve?{comp:'screen',a:.32,x0:340,x1:444,stops:['rgba(255,212,144,0)','rgba(255,212,144,1)'],rx:340,ry:62,rw:106,rh:38}
      :{comp:'screen',a:.22,x0:226,x1:320,stops:['rgba(255,236,190,1)','rgba(255,236,190,0)'],rx:226,ry:62,rw:96,rh:38},
    turnShade:eve?{comp:'multiply',a:.34,x0:226,x1:330,stops:['rgba(84,74,126,1)','rgba(84,74,126,0)'],rx:226,ry:62,rw:106,rh:38}
      :{comp:'multiply',a:.26,x0:350,x1:444,stops:['rgba(84,78,124,0)','rgba(84,78,124,1)'],rx:350,ry:62,rw:96,rh:38},
    rail:{x0:230,x1:440,h:1.5,color:'#9e7442',hi:'#e6c082'},
    stem:{thick:2.8,sweep:7,rimCol:'#e6c082',capCol:'#c89a60'},
    stern:{thick:3,sweep:9,rimCol:'#f0cc90',capCol:'#d4a66a'},
    furledYard:{x0:335,x1:414,yardX0:334.6,yardX1:420,bays:7,th0:4.6,th1:2.6,belly:.85},
    rudders:[{loom:[426,76,429,76,439,98,435.5,98],blade:[435,96,439.5,96,442,101,437,101],hi:[428.6,76.4,438.6,98]}]}));
  /* the quay: its edge of great blocks, and the paving */
  ashlar(g,190,100,290,6,'#bdb298',r,{bw:16,bh:6,v:.08,t:.3});R(g,190,99.4,290,1.2,'#e6dcc2');
  pave(g,0,104,480,144,'#cdc2a6',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#958c76'});ao(g,0,104,200,5,'t',.3,'#4a4460');
  /* her mooring lines to two squat posts of stone on the quay, and the gangplank reaching over onto the paving */
  for(const[px,sx,sy]of[[214,232,83],[456,438,76]]){
    R(g,px,99,5,6.4,'#8e887a');R(g,px,99,5,.7,'#d2ccbc');R(g,px-.8,104.6,6.6,1.6,'#6e685c');
    SHARED.ship.hawser(g,sx,sy,px+2.5,100.5,3)}
  SHARED.ship.gangplank(g,{x0:318,y0:83.5,x1:296,y1:106,w0:8,w1:12,sunSide:eve?'r':'l'});
  /* cargo on the quay: jars of oil, bales of dyed wool out of Asia, and the jar that slipped from its sling */
  for(const[x,h]of[[158,15],[168,16],[178,14]]){softShadow(g,x+2,110,5.4,1.2,.5,'#1e1a32');vessel(g,x,110,4.6,h,'#a8562e','amph',{noShadow:1})}
  softShadow(g,172,113,5.4,1.2,.55,'#1e1a32');vessel(g,170,113,4.6,15,'#9a4c28','amph',{noShadow:1});
  dyed(g,204,112,26,7,'#7a2a4a');dyed(g,208,105,22,6.4,'#6a3a7a');dyed(g,232,112,24,7,'#a03a3a');
  if(eve)brokenJar(g);
  /* old sailcloth in a heap, and a coil of line */
  sailHeap(g);
  for(const[q,c]of[[5,'#a8946a'],[3.4,'#c4b084'],[1.9,'#a8946a']]){g.strokeStyle=tint(c,-.4);g.lineWidth=1.8;g.beginPath();g.ellipse(398,112,q*1.5,q*.5,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=1;g.stroke()}
  /* the light. At dusk: the sun low over the sea, its road of light across the quay, its last warmth on the warehouse's upper courses and
     on the cargo, and the lamp over the inn's door, falling outward and down on the door and the paving before it; the arches, the foot of
     every wall and the near paving in shade. In the morning: full day on the quay, the sun on the warehouse's face and the ship, the inn's
     front in the shade of the warehouse, and the near paving a little darker. */
  if(eve)lightmap(g,480,'#8c7c98',l=>{pool(l,372,60,230,120,'#ffd8a0',.9);l.fillStyle=lg(l,0,100,0,144,['rgba(255,214,160,.55)','rgba(255,214,160,0)']);poly(l,[300,100,444,100,480,144,230,144]);l.fill();
      pool(l,150,40,70,14,'#ffc890',.4);pool(l,214,108,40,8,'#ffc890',.4);pool(l,168,108,22,6,'#ffc890',.3);
      pool(l,52,78,12,5,'#ffe0a0',.7);pool(l,52,98,34,11,'#ffb860',.66);pool(l,52,114,60,12,'#ffb860',.42);
      comp(l,'multiply',1,()=>ao(l,0,128,480,16,'b',.25,'#4a4060'))});
  else{shade(g,[0,105,196,105,208,112,0,114],SH,.4);
    dayLight8(g,480,64,l=>{pool(l,250,118,260,14,'#fff8ea',.6);pool(l,144,52,64,16,'#fff6e6',.45);pool(l,335,86,110,14,'#fffaf0',.5);
      comp(l,'multiply',1,()=>{l.fillStyle='rgba(120,112,140,.14)';l.fillRect(0,24,92,80);ao(l,0,128,480,16,'b',.22,'#5a5070')})})}
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
  sky(g,320,86,skyE(['#0a1030','#162048','#2a3a68']));for(let i=0;i<110;i++){const x=r()*320,y=r()*70,b=r();R(g,x,y,.5,.5,`rgba(${230+b*25|0},${230+b*20|0},${200+b*55|0},${.35+b*.6})`)}
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
  /* the bulwark: a solid wall of planks along the ship's side, in four strakes, the butt joints staggered and each stopping inside its own
     strake; and the rail that caps it. rw: a seed of its own for the grain, so that nothing else on the deck moves */
  const rw=rng(8391);R(g,0,104,320,40,'#4a3220');
  for(let j=0;j<4;j++){const y=104+j*3.25;plank(g,0,y,320,3.25,tint('#5a3e22',(j%2?-.04:.03)),rw,0);if(j)R(g,0,y,320,.5,'rgba(16,10,6,.5)');
    for(let x=14+j*23;x<320;x+=58+(j%2)*9)R(g,x,y+.9,.5,1.5,'rgba(16,10,6,.42)')}
  ao(g,0,104,320,4,'t',.4,'#0a0818');
  board(g,0,101.6,320,3,'#8a6638',rw,0);R(g,0,101.6,320,.6,'#c8a06a');
  /* the deck, her cargo under its cover, and the cable that runs out to the anchor */
  for(let j=0;j<6;j++){const y=117+j*4.6;board(g,0,y,320,4.6,j%2?'#6a4a2a':'#72502e',rw,0);for(let x=30+j*37;x<320;x+=96)R(g,x,y+1,.5,2.6,'rgba(16,10,6,.36)')}ao(g,0,117,320,6,'t',.5,'#0a0818');
  poly(g,[236,144,244,122,268,114,320,113,320,144],'#2c2620');poly(g,[244,122,268,114,320,113,320,117,270,118,250,125],'#463c32');for(let i=0;i<4;i++)stroke(g,[262+i*15,117,256+i*17,144],'rgba(0,0,0,.3)',.6);
  for(const q of[9,6,3.4]){g.strokeStyle='#3a3020';g.lineWidth=2.6;g.beginPath();g.ellipse(34,134,q*1.5,q*.5,0,0,6.2832);g.stroke();g.strokeStyle='#9a8660';g.lineWidth=1.4;g.stroke()}
  stroke(g,[46,132,88,118,104,103],'#9a8660',1.2);
  /* a small lamp of clay on the deck, square-built, and its light */
  R(g,150,131,5,2.6,'#8a4a2a');R(g,150,131,5,.6,'#c0744a');R(g,154.6,130.4,1.6,1,'#8a4a2a');
  lightmap(g,320,'#5a6898',l=>{pool(l,258,24,150,90,'#b8c8f0',.5);pool(l,154,128,62,30,'#ffb060',.85);pool(l,154,118,30,12,'#ffd090',.5);pool(l,154,110,54,7,'#ffb060',.3);comp(l,'multiply',1,()=>{ao(l,0,104,320,5,'t',.3,'#202040');ao(l,0,130,320,14,'b',.3,'#202040')});l.fillStyle=lg(l,0,88,0,104,['rgba(170,190,240,.4)','rgba(170,190,240,0)']);l.fillRect(190,88,130,16)})},
 draw(){},front(){}};
/* ---------- Philippi: the street inside the west gate, and the row of the sellers of purple ---------- */
/* hung: a length of dyed cloth hanging from a bar by its upper edge, in broad soft folds. The bar is hidden behind the cloth: it shows
   only beyond the ends of the row, so that no fold stands across it. */
function hung(g,x,y,w,h,c){c=earthTone(c,.12);g.fillStyle=lg(g,x,0,x+w,0,[tint(c,-.28),tint(c,.18),c,tint(c,-.34)]);g.fillRect(x,y,w,h);for(let i=2.4;i<w-1;i+=3.2){R(g,x+i,y+1,.5,h-1,'rgba(0,0,0,.2)');R(g,x+i+.6,y+1,.5,h-1,'rgba(255,255,255,.1)')}
  poly(g,[x,y+h,x+w,y+h,x+w-1,y+h+1.6,x+1,y+h+1.2],tint(c,-.38));ao(g,x,y,w,3,'t',.3)}
const AWN=[152,244];
ART.philippi={w:480,fp:1.3,q:12,
 paint(g){const r=rng(853),W='#e4d6b6',W2='#d8c8a2',ST='#cfc4a8',rw=rng(8531),rb=rng(8532),SKY=skyE(['#3d7cc6','#76a8dc','#bcd4e6','#e8e8dc']);
  sky(g,480,60,SKY);cloud(g,150,10,56,6,r);cloud(g,318,20,44,5,r);cloud(g,440,8,40,5,r);
  /* over the roofs: the rock the city climbs, bare limestone with a wall along its top and one square tower */
  ridge(g,200,480,50,x=>8+26*Math.exp(-Math.pow((x-352)/70,2))+2*Math.sin(x/9)+1.2*Math.sin(x/4),['#b8ae98','#a09880','#8e8872']);
  for(let i=0;i<60;i++){const x=250+r()*200,y=22+r()*26;if(y>50-(8+26*Math.exp(-Math.pow((x-352)/70,2))))R(g,x,y,2+r()*4,.5,r()<.5?'rgba(60,54,70,.3)':'rgba(240,232,210,.35)')}
  R(g,318,15.4,70,2.4,'#d2c8ae');R(g,318,15.4,70,.5,'#f0e8d0');R(g,346,9,8,8.4,'#c8bea4');R(g,346,9,8,.6,'#eee6ce');R(g,352.6,9,1.4,8.4,'rgba(60,50,90,.3)');
  for(const[x,h]of[[226,12],[236,9],[424,11]])cypress(g,x,50,h);
  /* the city wall, and the west gate: the road to the river goes out by it */
  ashlar(g,0,16,58,88,ST,r,{bw:14,bh:7,v:.09,t:.26});for(let i=0;i<58;i+=9){R(g,i,11,5.6,5,ST);R(g,i,11,5.6,.5,'#f0e6cc')}R(g,0,15.6,58,1,'#a09678');poly(g,[58,11,63,15,63,104,58,104],earthTone('#9a94a8',.2));
  ao(g,0,16.6,58,4,'t',.2,'#2a2030');ao(g,52,16,6,88,'r',.18,'#2a2030');ao(g,0,94,58,10,'b',.2,'#3a2c20');
  arch(g,10,52,36,52,tint(ST,-.26));gateView(g,12,54,32,50,{...GATE8,hz:66,sky:[60,SKY]});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,28+Math.cos(a)*18-.3,70+Math.sin(a)*18-1,.6,2.6,'#a09678')}
  /* the awning maker's house: he has let a corner of his bench to a stranger from Tarsus */
  house(g,63,22,89,82,W,r,{side:0,patch:3,cracks:0,beams:12,t:.36});skipCracks(r,5);
  /* cracks cut by hand, high under the parapets, where they run to no head; rb: a seed of their own */
  for(const[x,y,n]of[[66,26,2],[110,25.4,2],[146,26.4,2],[226,28.6,2],[290,25.6,2],[334,26,2]])crack(g,x,y,n,rb,.9);
  windowArt(g,76,32,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,126,32,10,10,W,{shut:1,wood:'#6a4e2c'});
  R(g,72,56,72,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2a2018','#4c3a2a']);g.fillRect(74,58,68,46);
  /* his shelf, and on it rolls of goat-hair cloth, each showing the one end that is turned to us */
  board(g,76,70,64,1.6,'#5a4226',rw,0);for(const[sx,c]of[[80,'#2e2620'],[94,'#473c33'],[108,'#8a6a40'],[122,'#3a3029']])clothRoll(g,sx,70,11,6.4,tint(c,.06),{near:-1,hi:1});
  ao(g,74,58,68,10,'t',.6);ao(g,74,58,6,46,'l',.45);ao(g,136,58,6,46,'r',.3);board(g,70,46,2.4,59,'#6a4e2c',rw,1);board(g,144,46,2.4,59,'#6a4e2c',rw,1);awning(g,68,40,80,8,'#5a4a3a','#cfc2a0',8);shade(g,[68,104,148,104,156,111,76,111],SH,.5);
  /* the bench, out in the light: a length of goat-hair cloth on it, half hemmed */
  softShadow(g,111,105.6,26,1.6,.6,'#281e34');R(g,88,97,48,8,'rgba(40,30,60,.2)');board(g,86,95,3,11,'#6a4e2c',rw,1);board(g,131,95,3,11,'#6a4e2c',rw,1);board(g,86,90,48,4.6,'#96703e',rw,0);R(g,86,94.2,48,1.2,'#5a4226');
  g.fillStyle=lg(g,0,86,0,90,['#4a4036','#2e2620','#17120f']);g.fillRect(94,86.6,30,3.6);poly(g,[118,90,128,90,131,98,124,99],'#2e2620');for(let i=0;i<9;i++)R(g,95.4+i*3.2,86.6,.5,3.6,'rgba(255,236,200,.12)');
  /* Zosime's shop, open to the street: bolts of purple on her shelves, and three lengths hung out to be seen */
  house(g,152,26,94,78,W2,r,{side:0,patch:2,cracks:0,beams:12,t:.36});skipCracks(r,4);windowArt(g,190,34,12,10,W2,{bars:2,wood:'#6a4e2c'});
  R(g,160,56,78,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c2018','#4e3a2a']);g.fillRect(162,58,74,46);
  for(const y of[70,84]){board(g,164,y,70,1.6,'#5a4226',rw,0);for(let i=0;i<6;i++){const c=earthTone(['#6a2a5a','#8a2a3a','#5a3a7a','#a03a4a','#7a3a6a','#4a2a5a'][(i+y)%6],.12),bx=166+i*11.4;g.fillStyle=lg(g,0,y-6,0,y,[tint(c,.24),c,tint(c,-.4)]);g.fillRect(bx,y-6+(i%2),9.4,6-(i%2));R(g,bx,y-3,9.4,.4,'rgba(0,0,0,.25)')}}
  ao(g,162,58,74,10,'t',.6);ao(g,162,58,6,46,'l',.45);ao(g,230,58,6,46,'r',.3);
  R(g,160,57.4,4,1.4,'#7a5c36');R(g,234,57.4,4,1.4,'#7a5c36');hung(g,165,57.4,20,30,'#6a2a5a');hung(g,188,57.4,20,34,'#8e2c40');hung(g,211,57.4,21,28,'#5a3a7a');
  softShadow(g,171.4,104,5,1,.5,'#1e1a32');softShadow(g,227.6,104,5.6,1.1,.5,'#1e1a32');vessel(g,170,104,4.4,9,'#7a4a6a','jar',{noShadow:1});vessel(g,226,104,5,11,'#8a4a2a','jar',{noShadow:1});
  board(g,150.4,46,2.4,59,'#6a4e2c',rw,1);board(g,244,46,2.4,59,'#6a4e2c',rw,1);shade(g,[150,104,246,104,254,111,158,111],SH,.5);
  /* the shop beside it: shut, behind shutters of oak boards laid one above another in the grooves of the frame, and barred with a beam that
     lies along them, its ends in iron staples at the jambs, so that nothing lies across a board; and a stone step worn hollow */
  house(g,246,22,92,82,W,r,{side:0,patch:3,cracks:0,beams:12,t:.36});skipCracks(r,5);windowArt(g,262,32,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,312,32,10,10,W,{bars:2,wood:'#6a4e2c'});
  R(g,254,54,76,50,tint(W,-.16));R(g,256,56,72,48,'#0c0806');
  for(let i=0;i<70-.01;i+=5.8){r();if(r()<.5){r();r();r()}}/* the draws of the upright boards these shutters once were, so that the rest of the street keeps its place */
  for(let j=0;j<6;j++){const y=57+j*47/6,c=tint('#7a5632',[.02,-.05,.04,-.02,.05,-.06][j]);board(g,257,y,70,47/6,c,rw,0)}
  ao(g,257,57,70,6,'t',.5);ao(g,257,57,3,47,'l',.4);ao(g,324,57,3,47,'r',.25);
  {const Y=78.6;R(g,257,Y+2.6,70,1,'rgba(20,14,10,.4)');board(g,257,Y,70,2.6,'#5e4226',rw,0);
    for(const sx of[257,323.4]){R(g,sx,Y-.8,3.6,4.2,'#2a2420');R(g,sx,Y-.8,3.6,.5,'#6a6056');R(g,sx+(sx<300?3.1:0),Y-.8,.5,4.2,'#141010')}}
  R(g,252,103,80,2,'#d8ccb0');R(g,252,104.8,80,.6,'#8a8068');
  /* the fountain at the corner: a spout of stone set in the wall itself, and a trough under it. The wall comes down to the paving behind
     it; no pier stands up out of the middle of the trough */
  {const c=tint(W2,-.05);g.fillStyle=lg(g,0,66,0,104,[tint(c,-.16),tint(c,-.22)]);g.fillRect(338,66,62,38);tex(g,'mott',.3,338,66,62,38,'overlay',1);tex(g,'grain',.12,338,66,62,38,'overlay',.5);
    ao(g,338,90,62,14,'b',.26,'#3a2c20')}
  shade(g,[346,106,394,106,402,112,354,112],SH,.5);
  R(g,365.4,85,6,.8,'rgba(40,30,40,.3)');R(g,364.6,81.6,6.8,3.4,'#a8a092');R(g,364.6,81.6,6.8,.6,'#e0d8c6');R(g,370.8,81.6,.6,3.4,'#6e685c');R(g,367,83.6,2,1.4,'#2e2a26');
  g.fillStyle=lg(g,346,0,392,0,['#aca28c','#e8e0c8','#cec4ac','#8e8674']);g.fillRect(346,96,46,10);R(g,345,94.6,48,2,'#f0e8d4');R(g,345,96.4,48,.6,'#a8a094');R(g,348.6,95,40.8,1.2,earthTone('#4f8cb4',.15));
  ao(g,346,102,46,4,'b',.25,'#2a2030');
  R(g,338,24,62,42,tint(W2,-.05));plaster(g,338,24,62,42,tint(W2,-.05),r,{patch:2,cracks:0,t:.36});skipCracks(r,3);R(g,338,22.4,62,2,tint(W2,.16));
  crack(g,392,26.4,3,rb,.9);crack(g,343,27,2,rb,.8);
  /* the street that runs on into the city, toward the marketplace: house fronts, tiled eaves, and the paving going on to the house that stands
     across its far end, with its roof at the level the paving runs to */
  R(g,400,34,80,70,'#cfc4a8');g.save();g.beginPath();g.rect(400,26,80,78);g.clip();sky(g,480,82,skyE(['#76a8dc','#e2e6dc']));
  R(g,431,63,17,41,'#d6d0c2');R(g,431,61,17,2.4,'#b8603c');R(g,435,65.6,2.4,3.2,'#3a2c22');R(g,431,70.4,17,1.6,'rgba(60,50,90,.2)');
  for(const[hx,hy,hw,hh,c]of[[400,40,22,64,'#d6caa8'],[458,36,22,68,'#e0d4b2'],[420,52,13,52,'#c8bc9c'],[446,56,13,48,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)');R(g,hx+hw*.3,hy+10,3,4,'#3a2c22')}
  poly(g,[424,104,458,104,447,72,437,72],'#ddd2b6');ao(g,400,26,80,12,'t',.2,'#2a2440');g.restore();poly(g,[400,24,395,27,395,104,400,104],earthTone('#9a94a8',.2));
  /* the street itself: the great road from Asia to Rome, paved in slabs the wheels have rutted */
  pave(g,0,103,480,144,'#cfc6ae',r,{vx:240,vy:62,rows:5,step:38,v:.08,joint:'#9a927c'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  for(let i=0;i<2;i++)stroke(g,[0,121+i*9,160,120.6+i*9,330,120+i*9,480,119.6+i*9],'rgba(80,70,90,.3)',1);
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,58,104,70,112,0,114],SH,.5);shade(g,[246,104,338,104,346,109,254,109],SH,.36);
  pool(g,240,0,300,160,'#fff4d6',.1,'screen');ao(g,0,0,80,144,'l',.08,'#2a2050');
  /* the light of the day: the sun along the paving of the street and on the bench and the trough out in it; the shops' depths, the gate's
     thickness and the near paving a little darker. Every pool is long and low */
  dayLight8(g,480,60,l=>{pool(l,250,118,250,13,'#fff8ea',.62);pool(l,110,94,34,8,'#fff4e2',.45);pool(l,369,98,30,7,'#fff6e6',.45);pool(l,440,92,40,10,'#fffaf0',.4);
    comp(l,'multiply',1,()=>{ao(l,0,0,70,144,'l',.14,'#5a5070');ao(l,0,128,480,16,'b',.22,'#5a5070');
      for(const[x,w]of[[74,68],[162,74]]){l.fillStyle='rgba(110,100,130,.16)';l.fillRect(x,58,w,46)}})})},
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
/* WATER: the river, from the near left out to the right, where it narrows to a thread and comes out of the distance at the foot of the city's hill */
const WATER=[0,95,120,92.4,240,89.6,318,86,334,82.4,348,78.4,360,75.4,368,73.6,370,73.8,362,76.2,350,80,340,84.2,334,87.6,331,90,262,98,152,105.6,0,112],STONES=[[196,122],[224,118],[254,116.4],[286,118],[312,123]];
const pang8=x=>12+9*Math.sin(x/97+.3)+4*Math.sin(x/31+1)+2*Math.sin(x/11);
ART.river={w:480,fp:1.3,q:12,
 /* the flat stones where the women sit stand a little up from the turf: whoever walks behind one is hidden by it */
 props:STONES.map(([x,y])=>({y:y+1,shape:g=>oval(g,x,y,10,2.8,'#000')})),
 /* The sun stands to the right of the picture (o.light 1), so that the great plane tree throws its shade over the stones. */
 paint(g){const r=rng(859),S=SCRAP8,L=1;
  sky(g,480,70,skyE(['#3f80c8','#7aacdc','#c0d6e6','#ecead8']));cloud(g,90,14,54,6,r);cloud(g,236,8,60,6,r);cloud(g,386,22,40,4,r);
  /* far across the plain: a long mountain, blue with the morning, its slopes turned to the sun a little lighter */
  CO.range(g,0,330,66,pang8,['#8494b8','#a4b0c8','#c2c8cc'],{light:L,k:.6});comp(g,'screen',.36,()=>{g.fillStyle=lg(g,0,40,0,66,['rgba(224,230,238,0)','rgba(224,230,238,1)']);g.fillRect(0,40,480,26)});
  /* the city on its hill, small with distance: its wall, the gate we came out by, and the road down from it */
  CO.range(g,300,480,72,x=>4+16*Math.exp(-Math.pow((x-420)/60,2))+1.4*Math.sin(x/6),['#a8b07c','#b4b888'],{light:L,k:.5});
  for(const[x,h]of[[336,2.6],[352,3],[366,2.4],[470,2.8],[478,2.4]])CO.tree(g,x,66.6,h,'#7a8c5a',{kind:'oak',light:L});
  R(g,380,50,84,5.6,'#d6ccb2');R(g,380,50,84,.6,'#f2ead2');for(let i=380;i<464;i+=5)R(g,i,48.4,2.6,1.8,'#d6ccb2');R(g,416,47,7,8.6,'#cabfa4');R(g,418,51,3,4.6,'#4a3c30');
  for(const[hx,hw,hh]of[[388,9,5],[402,8,6],[432,10,5],[448,9,6]]){R(g,hx,50-hh,hw,hh,'#e2d8be');R(g,hx,50-hh-1,hw,1.2,'#b8603c');R(g,hx+hw-2,50-hh,2,hh,'rgba(90,96,140,.25)')}
  R(g,380,55,84,1,'rgba(70,70,110,.25)');R(g,454,50,10,5.6,'rgba(90,96,140,.2)');
  stroke(g,[419.6,55.6,424,62,440,72,468,84,480,90],'#d8cca8',1.6);
  /* the plain: plots of stubble, green grain, fallow and ploughland, running back to the foot of the mountain, with the shadows of the clouds on them */
  g.fillStyle=lg(g,0,66,0,96,['#a8b47a','#9cae6c','#8ea660']);g.fillRect(0,66,480,30);tex(S,'mott',.35,0,66,480,30,'overlay',1);
  clipTo(g,()=>{g.beginPath();g.rect(0,66,480,30)},()=>CO.plain(g,0,480,66,97,8591,{vx:200,land:'#9cae6c',haze:'#c8d2d0'}));
  stroke(g,[419.6,55.6,424,62,440,72,468,84,480,90],'#d8cca8',1.6);
  for(let i=0;i<10;i++){const fx=8+i*33+r()*10,fy=70+r()*9;poly(S,[fx,fy,fx+22,fy-1,fx+28,fy+5.6,fx+4,fy+6.6],'#000')}
  for(const[x,y]of[[40,84],[150,80],[204,83],[292,78]]){foliage(S,x,y-.8,4.6,3.2,'#6a8c52',r,22);CO.tree(g,x,y+2.6,8+(x%3),'#6a8a50',{kind:'oak',light:L})}
  /* the far bank, its reeds, and the trees that stand along the water */
  const FB=[0,93,120,90.4,240,87.6,340,84,480,84,480,90,340,88,240,91,120,94,0,96.6];
  clipTo(g,()=>poly(g,FB),()=>CO.turf(g,0,83,480,97,'#86a05a',8592,{dense:.8}));
  tufts(S,0,330,92,5,'#6f8c48',r,150);
  for(let x=0;x<330;x+=16){const y=96.6-(x/330)*(96.6-88);CO.reeds(g,x,x+16,y,5,8593+x,{n:14,c:'#6f8c48',wind:-1})}
  /* the river: clear, and quick over its stones */
  poly(g,WATER);g.fillStyle=lg(g,0,86,0,112,['#b8dce0','#7fb2c4','#5a94ac','#4a8098']);g.fill();
  clipTo(g,()=>poly(g,WATER),()=>{comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,86,0,98,['rgba(80,120,70,1)','rgba(80,120,70,0)']);g.fillRect(0,86,340,12)});
    /* the far bank and its trees, mirrored dark in the water, and the sky pale in the middle of the stream */
    for(const[x,w,y]of[[96,30,93],[214,26,90],[300,9,88]])pool(g,x,y+4,w/2,6,'#4a6a4a',.36,'multiply');
    comp(g,'screen',.25,()=>{g.fillStyle=lg(g,0,94,0,110,['rgba(230,240,246,0)','rgba(230,240,246,1)','rgba(230,240,246,0)']);g.fillRect(0,94,340,16)});
    for(let i=0;i<150;i++){const k=r(),sy=88+k*24,sx=(1-k)*330*r()+k*r()*260;R(g,sx,sy,2+k*7,.5,r()<.6?'rgba(238,250,250,.6)':'rgba(24,64,84,.32)')}});
  stroke(g,[0,112,152,105.6,262,98,331,90],'rgba(240,250,250,.55)',.7);
  for(const[x,y,w,h]of[[60,104,9,4],[118,101,7,3.4],[176,100.6,8,3.6],[236,96.4,6,3]]){CO.boulder(g,x,y,w,h,'#9a9486',Math.round(x*7+y),{light:L});R(g,x-w*.6,y-.2,w*1.2,.5,'rgba(240,250,250,.7)')}
  tree(S,96,93,46,'#5c8a48',r);tree(S,214,90,38,'#688f50',r);tree(S,300,88,30,'#5a8648',r);
  CO.tree(g,96,93,46,null,{kind:'willow',light:L,seed:8594,cast:false});CO.tree(g,214,90,38,null,{kind:'plane',light:L,seed:8595,cast:false});CO.tree(g,300,88,30,null,{kind:'poplar',light:L,seed:8596,cast:false});
  /* the near bank: turf, flowers, and a path worn down to the water from the road */
  earth(S,0,104,480,144,'#a8ac74',r,150);
  const NB=[0,112,152,105.6,262,98,331,90,338,86,480,86,480,144,0,144];
  clipTo(g,()=>poly(g,NB),()=>CO.turf(g,0,86,480,144,'#90a660',8597,{flowers:260,dry:.15}));
  clipTo(g,()=>poly(g,NB),()=>ao(g,0,86,480,22,'t',.12,'#2a3050'));
  const PATH=[480,90,480,98,420,104,350,116,332,128,318,128,340,113,412,99];
  clipTo(g,()=>poly(g,PATH),()=>CO.ground(g,316,88,164,130,'#cfc39c',8598,{n:40,size:.6}));
  stroke(g,[412,99,340,113,318,128],'rgba(90,110,60,.45)',.6);stroke(g,[480,98,420,104,350,116,332,128],'rgba(90,110,60,.35)',.6);
  flowers(S,0,112,330,30,r,170);flowers(S,330,118,150,24,r,60);tufts(S,0,480,142,5,'#6f8c48',r,160);tufts(S,0,150,113,4,'#7a9650',r,50);
  CO.reeds(g,0,150,113,4,8599,{n:40,c:'#7a9650'});
  /* the flat stones, set in a half circle and worn smooth: this is where they sit */
  for(const[x,y]of STONES){softShadow(g,x+1.4,y+1.6,10,2.2,.5,'#1e1e3a');g.fillStyle=lg(g,x-10,0,x+10,0,['#8e887a','#d6d0c0','#b8b2a2','#7e786c']);g.beginPath();g.ellipse(x,y,10,2.8,0,0,6.2832);g.fill();
    clipTo(g,()=>oval(g,x,y,10,2.8),()=>{tex(g,'mott',.4,x-10,y-3,20,6,'overlay',1);ao(g,x-10,y,20,2.8,'b',.3,'#2a2436')});R(g,x-8,y-2.2,14,.6,'rgba(250,246,232,.5)');R(g,x-9,y+1,18,1.4,'#7e786c')}
  /* a great plane tree on this bank, and its shade over the stones, broken by sun through the leaves */
  comp(g,'multiply',.34,()=>{oval(g,286,123,104,13,'#7a80b4');oval(g,340,118,60,9,'#7a80b4')});for(let i=0;i<46;i++)oval(S,184+r()*180,114+r()*18,1.5+r()*3,.5+r()*.8,'#fff4c8');
  {const q=rng(8600);for(let i=0;i<40;i++){const px=190+q()*170,py=114+q()*18,w=2+q()*5;pool(g,px,py,w,w*.28,'#fff4c8',.32,'screen')}}
  softShadow(g,374,114.4,6,1.2,.45,'#1e1e3a');tree(S,372,114,84,'#5a8a48',r);CO.tree(g,372,114,84,null,{kind:'plane',light:L,lean:0,seed:8601,cast:false});
  CO.boulder(g,398,116,12,6,'#948e80',8602,{light:L,moss:'#7a8a50'});
  pool(g,180,0,300,160,'#fff6d6',.1,'screen');ao(g,0,128,480,16,'b',.1,'#2a2050');
  /* the light of the morning: the sun on the plain and on the water, the path from the road lit, the shade of the plane tree deeper
     over the stones, and the near bank in the shade of its own grass. Every pool is long and low */
  dayLight8(g,480,66,l=>{pool(l,200,82,260,14,'#fffaf0',.55);pool(l,170,100,170,8,'#fff8ec',.45);pool(l,400,108,70,10,'#fff6e6',.45);
    comp(l,'multiply',1,()=>{pool(l,300,122,90,10,'#8e8aa0',.3,'source-over');ao(l,0,128,480,16,'b',.22,'#5a5070')})})},
 fore(g){const r=rng(860);/* reeds and iris at the water's edge, nearest us: every blade leans the same way, so that none crosses another */
  for(let i=0;i<80;i++){const sx=-6+r()*130;stroke(SCRAP8,[sx,154,sx+(r()-.5)*12,116+r()*20],r()<.5?'#56723a':'#6c8a48',1)}
  for(let k=0;k<70;k++){const q=rng(8610+k),sx=-6+q()*130,h=18+q()*20,l=2+q()*4,c=q()<.5?'#56723a':'#6c8a48';stroke(g,[sx,154,sx+l*.4,154-h*.6,sx+l,154-h],c,1);stroke(g,[sx+.6,154,sx+l*.4+.6,154-h*.6,sx+l+.4,154-h+2],tint(c,.2),.5)}
  for(let i=0;i<8;i++){const sx=8+i*14+r()*6,sy=120+r()*12;R(g,sx,sy,2,1.6,'#e8c84a');R(g,sx+.4,sy+1.6,1.2,1,'#c8a02a')}
  CO.boulder(g,580,154,46,18,'#7a7468',8611,{light:1,moss:'#6a7a48'});comp(g,'source-atop',.36,()=>R(g,0,0,640,150,'#2c3a58'))},
 draw(g,t){/* light running down the water */
  for(let i=0;i<18;i++){const k=((t/1500+i*.0556)%1),x=320-k*320,y=87+k*19+(i%3);if(i%2)R(g,x,y,3+k*5,.5,`rgba(244,252,252,${.6*Math.sin(k*3.1416)})`)}
  /* the women of Lydia's household, with her on the Sabbath */
  if(F.sab)for(const[id,x,y,d]of HOUSEHOLD)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- Lydia's house, that evening (the closing scene) ---------- */
ART.lydia8={w:320,q:12,
 paint(g){const r=rng(863),W='#e2d2ae',rw=rng(8631),rb=rng(8632),RED=earthTone('#9a4a3a',.14);
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:0,brick:'#b08a5a',t:.32});skipCracks(r,4);
  /* cracks cut by hand, high under the beams, where they run to no head */
  for(const[x,y,n]of[[40,13,3],[150,12.6,2],[262,13.4,3]])crack(g,x,y,n,rb,.9);
  R(g,0,70,320,34,RED);tex(g,'mott',.28,0,70,320,34,'overlay',1);R(g,0,69,320,1.6,'#e8dcc0');R(g,0,70.6,320,.6,tint(RED,-.32));ao(g,0,70.6,320,4,'t',.18,'#2a1820');
  /* the ceiling: its joists run toward the viewer from the wall plate, in the perspective of the floor (shared ceiling()) */
  ceiling8(g,320,{x0:10,step:36,r:rw,vx:160,vy:60});ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* the door to the street, and beside it the stair to the upper room */
  R(g,14,44,34,60,tint(W,-.16));doorArt(g,17,47,28,57,'#6a4a2c',r,{bands:[]});ao(g,14,44,34,3,'t',.22,'#2a2030');
  for(let i=0;i<7;i++){const x=262+i*8,y=96-i*8;R(g,x,y,58-i*8,8,tint('#cabea2',-i*.02));R(g,x,y,58-i*8,.7,'#f0e6cc');R(g,x,y+7.2,58-i*8,.8,'#8a8068')}
  R(g,300,10,20,38,tint(W,-.2));R(g,302,12,18,36,'#2a1e16');ao(g,302,12,18,8,'t',.5);ao(g,254,94,66,10,'b',.2,'#2a2030');
  /* her store: shelves of cloth, purple, crimson and violet, and a length of the best laid out on a stand */
  poly(g,[86,84.6,198,84.6,200,86,88,86],'rgba(40,24,30,.18)');board(g,84,30,2,54,'#5a4226',rw,1);board(g,196,30,2,54,'#5a4226',rw,1);
  for(const y of[42,56,70]){ao(g,86,y-9,110,9,'t',.22,'#1a1018');board(g,84,y,114,2,'#7a5c36',rw,0);R(g,86,y+2,110,.8,'rgba(30,18,20,.3)');for(let i=0;i<9;i++){const c=earthTone(['#6a2a5a','#8e2c40','#5a3a7a','#a03a4a','#7a3a6a','#4a2a5a','#b05a6a'][(i*3+y)%7],.12),bx=88+i*12;g.fillStyle=lg(g,0,y-8,0,y,[tint(c,.26),c,tint(c,-.4)]);g.fillRect(bx,y-8+(i%3?0:1.4),10,8-(i%3?0:1.4));R(g,bx,y-4,10,.4,'rgba(0,0,0,.25)')}}
  /* two lamps in their niches */
  for(const x of[58,222]){arch(g,x,38,14,18,tint(W,-.32));arch(g,x+1.4,39.4,11.2,16.6,'#4a3828');clipTo(g,()=>arch(g,x+1.4,39.4,11.2,16.6),()=>ao(g,x+1.4,39.4,11.2,6,'t',.45,'#140c0c'));R(g,x-1,55.6,16,1.6,tint(W,.16));R(g,x+3.6,53,6.4,2.6,'#b8733c');R(g,x+3.6,53,6.4,.6,'#e0a064');R(g,x+9.4,52.2,1.8,1.2,'#b8733c')}
  /* the floor: slabs, and a mat woven in bands; a great jar of water by the door */
  pave(g,0,103,320,144,'#cdbf9c',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  clipTo(g,()=>poly(g,[70,113,250,113,268,138,52,138]),()=>{R(g,52,113,216,25,earthTone('#6a3a5a',.14));for(let i=0;i<8;i++)R(g,52,114.6+i*3,216,1,i%2?earthTone('#d8b878',.1):'#3a2238');tex(g,'mott',.28,52,113,216,25,'overlay',1);ao(g,52,113,216,5,'t',.25)});
  softShadow(g,62,106,8,1.6,.6,'#281e34');vessel(g,60,106,6,17,'#9a5a36','pithos',{noShadow:1});
  /* the table, set for more than her household: bread, bowls and a jug */
  softShadow(g,160,106,52,2,.55,'#281e34');R(g,112,100,96,6,'rgba(40,30,60,.16)');board(g,110,94,3,12,'#5a4226',rw,1);board(g,203,94,3,12,'#5a4226',rw,1);
  board(g,110,90,96,4,'#96703e',rw,0);R(g,110,93.6,96,1,'#5a4226');ao(g,113,94.6,90,3,'t',.3,'#1a1018');
  for(const x of[122,146,176])R(g,x,88,9,2,'#d8b070');for(const x of[122,146,176])R(g,x+1,87.2,7,.9,'#f0d090');
  vessel(g,162,90,3.4,3,'#b06a3a','bowl',{noShadow:1});vessel(g,194,90,3.2,8,'#8a4a2a','jug',{noShadow:1});vessel(g,136,90,3.4,3,'#a8844e','bowl',{noShadow:1});
  /* the light: each lamp throws its light outward and down from its niche (nicheLight), so that the wall above the arch stays in shade; it
     lands on the shelves and the table between them and on the floor; the corners, the ceiling and the near floor keep their shade */
  lightmap(g,320,'#86768a',l=>{nicheLight(l,65,54,34,22,'#ffc070',.88);nicheLight(l,229,54,34,22,'#ffc070',.88);
    pool(l,141,62,60,16,'#ffc888',.4);pool(l,160,94,70,10,'#ffd8a0',.5);pool(l,65,104,56,12,'#ffb060',.4);pool(l,229,104,56,12,'#ffb060',.4);pool(l,160,118,150,18,'#ffe0b0',.45);
    l.fillStyle=lg(l,0,0,0,24,['rgba(20,14,24,.34)','rgba(20,14,24,0)']);l.fillRect(0,0,320,24);
    l.fillStyle=lg(l,0,126,0,144,['rgba(20,14,24,0)','rgba(20,14,24,.28)']);l.fillRect(0,126,320,18);
    ao(l,0,0,22,144,'l',.2,'#3a2c40');ao(l,298,0,22,144,'r',.16,'#3a2c40')})},
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
  linen:{name:'linen_cloth',look:'clean_linen_cloth_out_of_timothys_bundle',
    by:{luke:'clean_linen_and_a_good_piece'}},
  bandage:{name:'linen_strips',look:'strips_of_clean_linen_a_hands',
    by:{luke:'strips_of_clean_linen_cut'}},
  offcut:{name:'old_sailcloth',look:'offcut_of_old_sailcloth',
    by:{luke:'rag_of_sailcloth'}},
  sling:{name:'arm_sling',look:'sling_of_sailcloth_a_broad',
    by:{luke:'sling_hemmed_and_tied'}},
  lbag:{name:'physicians_bag',look:'lukes_bag',
    by:{luke:'my_bag_a_flask_of_oil_a_flask'}}});
/* how Luke describes the tools of the tentmaker's trade (set again whenever this chapter begins: see setup8) */
const BY8={awl:'tentmakers_awl_it_is',thread:'waxed_thread_i',
  knife:'knife_for_cloth_and_leather_said',tablets:'his_wax_tablets_names_tasks'};
const inFork=()=>G.room==='fork',inBor=()=>G.room==='ferry',inTro=()=>G.room==='troas',inPhi=()=>G.room==='philippi',inRiv=()=>G.room==='river',
  eve=()=>inTro()&&!F.vision,clues=()=>!!(F.gate&&F.shop);
/* toPaul, toLuke: something put into a man's hand, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function drop(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* bring: something Paul needs for his work, which Luke happens to be carrying, comes back to him */
async function bring(id){const his=invOf(LU),i=his.indexOf(id);if(PC()===P&&i>=0){his.splice(i,1);toPaul(id,1);await say(LU,'you_will_want_this_back_paul_cloth')}return invOf(P).includes(id)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line, how] sets. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1],x[2]||{}):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* think: Paul weighs what to do next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* ============ SCRIPTURE: the passages on the tablets ============ */
const PASS={
  prov16:{ref:'proverbs_16_9',gist:'in_his_heart_a_man_maps'},
  isa30:{ref:'isaiah_30_21',gist:'should_you_stray_to_the_right'},
  prov15:{ref:'proverbs_15_22',gist:'without_counsel_taken_together'},
  isa42:{ref:'isaiah_42_4',gist:'islands_wait_for_his_law'},
  ps65:{ref:'psalm_65_2',gist:'you_are_the_one_who_hears'},
  isa53:{ref:'isaiah_53_5',gist:'our_transgression_is_why'},
  ps16:{ref:'psalm_16_10',gist:'davids_hope_jehovah_would'},
  kings:{ref:'n2_kings_4_8',gist:'elisha_once_came_to_shunem'}},
  ORDER=['prov16','isa30','prov15','isa42','ps65','isa53','ps16','kings'];
const quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
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
  if(F.asia)return say(me,'that_road_is_closed_to_us');
  await say(P,'west_brothers_to_ephesus');
  await say(AT,'step_out_friends');
  await Promise.all([walk(P,104,126),walk(SI,136,129),walk(TI,164,131)]);AU.mood='tense';await fade(1,700);
  await narr('province_of_asia_acts_16_6',{dur:9500});
  await narr('how_this_was_made_known',{dur:6000});
  place(P,'fork',222,124,-1);place(SI,'fork',336,127,-1);place(TI,'fork',362,129,-1);await fade(0,700);
  await say(P,'not_asia',TH);
  await think('road_to_ephesus_is_closed_to_us',[
    {q:'we_wait_here_until_we_are',no:'wait_for_what'},
    {q:'we_turn_back_to_the_congregations',no:'they_have_the_decrees_and_elders'},
    {q:'we_go_on_by_the_road_that_is',ok:1}]);
  F.asia=1;AU.mood='hope';SFX.good();
  await say(P,'brothers_we_are_not_going_to_ephesus');
  await say(TI,'forbidden_said');
  await say(P,'i_do_not_know_why_timothy');
  await say(SI,'which_way');
  await say(P,'bithynia_has_cities_too');
  await say(AT,'not_coming');
  await say(P,'nothing_is_wrong_with_your_road_attalos');
  await say(AT,'man_who_admits_what_he');codeBtn()}
async function trackNorth(){const me=PC();
  if(!F.asia)return say(me,'north_said');
  await say(P,'north_then_until_we_are_told_otherwise');
  await leg(2,['from_the_paved_road_they_turned_north',
    'on_reaching_mysia_acts_16_7']);
  await come('ferry');
  await say(KL,'bithynia_is_it');
  await say(SI,'towns_paul_and_good_roads');
  await say(TI,'people_who_have_never_heard');codeBtn()}
ROOMS.fork={space:.5,walk:[16,464,112,138],mood:'hope',amb:{wind:.5,birds:.5,hooves:.15},hs:[
  {name:'mountains',x:0,y:36,w:480,h:22,wx:240,look:'mountains_to_the_north'},
  {name:'sheepfold',x:332,y:62,w:92,h:24,wx:380,look:'sheepfold_of_field_stone'},
  {name:'milestone',x:207,y:86,w:12,h:23,wx:226,wy:114,dir:-1,look:async()=>{await say(P,'milestone_of_the_romans');return say(P,quote('prov16'))},
    use:'i_lean_on_it_for_a_moment',pickup:'it_has_stood_here_longer'},
  {name:'mule',x:116,y:74,w:56,h:49,wx:104,wy:127,dir:1,look:'carriers_mule_under_more',pickup:'it_is_attaloss_and_it_would'},
  {name:'track_to_the_north',x:232,y:76,w:76,h:32,wx:254,wy:113,dir:1,exit:trackNorth,
    look:()=>say(P,F.asia?'track_north_bare_earth':'track_leaving_the_paved')},
  {name:'paved_road_west',x:0,y:104,w:15,h:34,wx:22,wy:122,dir:-1,exit:roadWest,
    look:async()=>{if(F.asia)return say(P,'road_to_ephesus_paved_straight');
      await say(P,'paved_road_running_west');return say(P,quote('isa30'))}},
  {name:'road_east',x:466,y:104,w:14,h:34,wx:458,wy:122,dir:1,look:'way_we_came_back_to_the_cities',exit:()=>say(PC(),'cities_behind_us_have_the_decrees')}]};
AT.hs={name:'Attalos',actor:AT,
  look:()=>say(P,F.asia?'attalos_said':'attalos_a_carrier_of_wool'),
  show:{awl:'awl_said',knife:'good_knife',thread:'waxed_said',
    tablets:'writing_i','*':'keep_it_for_the_road'},
  talk:()=>talkTree([
    {q:'where_does_the_paved_road_lead',a:async()=>{await say(AT,'west_friend');
      await say(AT,'there_are_more_people_along')}},
    {q:'track_to_the_north_q',a:()=>say(AT,'toward_bithynia_in_the_end')},
    {q:'we_are_forbidden_to_speak_in_asia',if:()=>!!F.asia,once:1,a:async()=>{await say(AT,'forbidden_to_speak');
      await say(P,'i_was_not_sent_to_keep')}},
    {q:'safe_road_to_you_attalos',bye:1}])};
/* ============ THE EDGE OF BITHYNIA: a second road that is closed ============ */
/* They tried to go into Bithynia, and the spirit of Jesus would not let them (Acts 16:7). Mysia belonged to the province of
   Asia, so what was forbidden in Asia was forbidden there: they went through it without stopping to preach (study note on Acts 16:8). */
async function ferry(){const me=PC();
  if(F.bith)return say(me,'that_bank_is_not_for_us');
  await say(P,'three_men_to_cross_kleitos');
  await say(KL,'step_aboard_then_and_sit_low');
  await walk(P,FERRY[0]+38,113);AU.mood='tense';await fade(1,700);
  await narr('spirit_of_jesus_acts_16_7',{dur:8000});
  place(P,'ferry',300,122,1);place(SI,'ferry',322,127,-1);place(TI,'ferry',276,128,1);await fade(0,700);
  await say(P,'not_bithynia_either',TH);
  await think('second_road_is_closed_to_us',[
    {q:'we_wait_at_the_ferry_until',no:'twice_i_have_been_turned'},
    {q:'two_roads_are_shut',no:'nobody_has_told_me_to_go_home'},
    {q:'west_said',ok:1}]);
  F.bith=1;AU.mood='hope';SFX.good();
  await say(P,'keep_your_coppers_and_your_pole');
  await say(KL,'not_crossing');
  await say(P,'we_have_one');
  await say(TI,'where_paul');
  await say(P,'west_timothy_through_mysia_to_the_sea');
  await say(SI,'that_is_a_long_road_and_it');
  await say(P,'it_does_and_we_shall_pass');codeBtn()}
async function roadSea(){const me=PC();
  if(!F.bith)return say(me,'west_along_the_bank');
  await say(P,'west_brothers');
  await leg(3,['they_went_on_past_acts_16_8',
    'it_was_a_walk_of_some_550']);
  await come('troas','tense');await troasIntro()}
ROOMS.ferry={space:.6,walk:[16,464,112,138],mood:'hope',amb:{fountain:.35,leaves:.6,birds:.6,wind:.2},hs:[
  {name:'mountain',x:150,y:30,w:170,h:26,wx:240,look:'one_great_mountain_beyond'},
  {name:'far_bank',x:0,y:60,w:480,h:26,wx:270,look:()=>say(P,F.bith?'bithynia'
    :'far_bank_bithynia')},
  {name:'river',x:0,y:87,w:234,h:18,wx:150,wy:113,look:'wide_river_slow_and_green',use:'i_wash_the_dust_of_phrygia',pickup:'river_belongs_to_its_banks'},
  {name:'plane_tree',x:30,y:42,w:70,h:66,wx:84,wy:116,dir:-1,look:'plane_tree_older_than_the_ferry',use:'i_am_not_tired_enough_to_sit'},
  {name:'ferrymans_hut',x:394,y:68,w:74,h:42,wx:428,wy:114,look:'hut_of_wattle_and_daub',use:'it_is_his_house_and_he',open:'it_is_his_house_and_he'},
  {name:'ferry',x:236,y:94,w:82,h:16,wx:266,wy:114,def:'use',exit:ferry,
    look:()=>say(P,F.bith?'the_ferry':'ferry_a_broad_flat_boat')},
  {name:'road_west',x:0,y:110,w:15,h:28,wx:22,wy:122,dir:-1,exit:roadSea,
    look:()=>say(P,F.bith?'road_west_along_the_bank':'road_along_the_bank_going_west')},
  {name:'road_east',x:466,y:110,w:14,h:28,wx:458,wy:122,dir:1,look:'way_we_came_from_the_plateau',exit:()=>say(PC(),'we_did_not_walk_all_those_days')}]};
KL.hs={name:'Kleitos',actor:KL,
  look:()=>say(P,F.bith?'kleitos_said':'kleitos_the_ferryman'),
  show:{awl:'i_caulk_with_pitch_and_moss',knife:'sharp_keep',tablets:'wax_said','*':'keep_it_dry'},
  talk:()=>talkTree([
    {q:'what_lies_over_the_river',a:()=>say(KL,'bithynia_said')},
    {q:'where_does_the_road_along',a:()=>say(KL,'west_to')},
    {q:'we_were_not_permitted_to_cross',if:()=>!!F.bith,once:1,a:async()=>{await say(KL,'not_permitted');await say(P,'you_did_not_see_the_one')}},
    {q:'quiet_river_to_you_kleitos',bye:1}])};
/* ============ TROAS: the fourth man ============ */
/* Luke is with them from Troas on: the account says "we" from Acts 16:10. It does not say how he came to be with them, where he was from
   or when he became a disciple, and nothing here says so either. He is a physician (Colossians 4:14): the oil, the wine and the bandage
   are the treatment he himself later recorded (Luke 10:34), which the Study Edition calls consistent with the methods of the day. */
async function troasIntro(){if(G.metTroas)return;G.metTroas=1;
  await narr('troas_the_principal_seaport',{dur:7500});
  noise({d:.18,v:.3,f:900,q:.8});noise({t:now()+.12,d:.3,v:.2,f:2600,q:1});
  await say(LE,'mind_the_sling',{to:SO});
  await say(SO,'it_is_nothing_master');
  await say(LU,'it_is_not_nothing',{to:SO});
  await say(LE,'my_best_hand_and_i_sail');
  await say(LU,'you_there_travelers_by_the_dust',{to:PC()});
  await say(P,'harbor_at_the_end_of_the_only',TH);swapBtn();codeBtn()}
/* cutStrips: clean linen, cut into strips along the thread */
async function cutStrips(){if(F.strips)return say(P,'they_are_cut');
  if(!(await bring('linen')))return say(P,'i_have_no_linen_to_cut');
  SFX.cut();await say(P,'hands_breadth_wide_and_cut');
  delItem('linen');F.strips=1;addItem('bandage',1);SFX.good();
  await say(P,'strips_of_clean_linen')}
/* sewSling: a sling for the arm, out of an offcut of old sailcloth */
async function sewSling(){if(F.sling)return say(P,'it_is_sewn_already');
  if(!F.bound)return say(P,'i_could_sew_a_dozen_things');
  if(!(await bring('offcut')))return say(P,'sling_needs_cloth_and_i_have_none');
  SFX.cut();await say(P,'broad_band_long_enough');SFX.sew();await wait(600);
  delItem('offcut');F.sling=1;addItem('sling',1);SFX.good();
  await say(P,'an_arm_sling')}
Object.assign(COMBO,{
  'knife+linen':cutStrips,'awl+linen':()=>say(P,'linen_does_not_need_sewing_now'),'linen+thread':()=>say(P,'linen_does_not_need_sewing_now'),
  'awl+offcut':sewSling,'offcut+thread':sewSling,'knife+offcut':sewSling,
  'awl+bandage':()=>say(P,'bandage_is_wound_not_sewn'),'linen+offcut':()=>say(P,'linen_is_for_the_wound'),
  'bandage+offcut':()=>say(P,'linen_is_for_the_wound'),'awl+sling':()=>say(P,'it_is_sewn_and_it_will_hold'),'sling+thread':()=>say(P,'it_is_sewn_and_it_will_hold')});
/* treat: the physician's part, played as Luke. Wine and oil first, then the bandage, then the sling. */
async function treat(it){
  if(F.slung)return say(LU,'it_is_cleaned_bound_and_slung');
  if(it==='lbag'){if(F.clean)return say(LU,'it_is_clean');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;LU.bow=true;
    await say(LU,'wine_first');noise({d:.25,v:.08,f:3200,q:1});await wait(500);
    await say(SO,'you_said_that');
    await say(LU,'now_oil_to_soften_it');LU.bow=false;F.clean=1;SFX.good();
    return say(LU,invOf(LU).includes('bandage')?'now_the_linen':'now_linen_strips_of_it')}
  if(it==='bandage'){if(F.bound)return say(LU,'it_is_bound');
    if(!F.clean)return say(LU,'not_on_a_wound_as_it_is');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;LU.bow=true;
    await say(LU,'round_and_round_again');await wait(500);LU.bow=false;drop('bandage');F.bound=1;SFX.good();
    await say(SO,'it_throbs_less_already');
    await say(LU,'it_will_throb_again_if_it');
    return say(P,'a_sling',TH)}
  if(it==='sling'){if(!F.bound)return say(LU,'sling_for_an_arm_that_is');
    await walk(LU,SO.x-20,SO.y+1);LU.dir=1;
    await say(LU,'over_the_head_and_the_arm');drop('sling');return slung()}
  if(it==='linen')return say(LU,'whole_cloth_is_no_use_to_me');
  if(it==='offcut')return say(LU,'sailcloth_on_an_open_wound');
  return false}
/* slung: the hand is cared for; the four men find that they are brothers, and go to the inn */
async function slung(){playAs(P);F.slung=1;AU.mood='calm';SFX.good();
  await say(LE,'he_can_steer_with_one_hand');
  await say(LU,'luke_said',{to:P});
  await say(P,'paul_of_tarsus_said');
  await say(LU,'i_heard_the_young_man_call');
  await say(P,'there_are_four_of_us_on_this_quay');
  await say(LU,'where_are_you_bound');
  await say(P,'i_do_not_know_luke');
  await say(LU,'sleep_on_it');codeBtn()}
/* The night, and the vision: told as Acts 16:9 tells it, in paraphrase, in the dark (read from the narrator's scroll). Nothing of it is shown. */
async function night(){const me=PC();
  if(F.vision)return say(me,me===P?'we_have_slept':'we_have_slept_and_paul_has_not');
  if(!F.slung)return say(me,me===P?'not_while_that_man_is_bleeding':'not_while_my_work_is_lying');
  playAs(P);await say(P,'to_the_inn_then');
  await fade(1,900);G.scene=dark;AU.mood='night';AU.amb={waves:.4,wind:.2};await fade(0,600);await wait(1500);
  await narr('that_night_paul_had_a_vision_acts_16_9',{dur:14000});
  await wait(800);await fade(1,600);F.vision=1;G.scene=null;AU.amb=ROOMS.troas.amb;await come('troas','calm');
  await say(TI,'paul_q');
  await say(P,'i_must_tell_them',TH)}
/* Drawing the conclusion (Acts 16:10): Paul reports what he saw, and no more; and the four men weigh it together. */
async function tell(){
  if(F.concl)return false;
  await think('i_saw_something_in_the_night',[
    {q:'i_have_decided_we_sail_for_macedonia',no:'have_i'},
    {q:'it_was_one_night',no:'two_roads_were_closed_to_me'},
    {q:'tell_them_exactly_what',ok:1}]);
  await Promise.all([walk(SI,P.x+30,P.y+2),walk(TI,P.x-28,P.y+3),walk(LU,P.x+56,P.y-2)]);SI.dir=-1;LU.dir=-1;TI.dir=1;
  await say(P,'brothers_in');
  await say(P,'that_is_all_of_it');
  await say(SI,'let_us_weigh_it_together');
  let av=[{q:'in_asia_we_were_forbidden_to_speak',ok:1,r:[SI,'road_west_was_not_ours_that_is']},
    {q:'into_bithynia_we_were_not',ok:1,r:[TI,'road_north_was_not_ours_either_that_is']},
    {q:'one_road_left_open_ended',ok:1,r:[LU,'from_this_harbor_ships_cross_to_macedonia']},
    {q:'i_am_tired_of_walking_and_a_ship',r:[SI,'true_of_every_one_of_us']},
    {q:'macedonia_is_a_great_country',r:[SI,'is_asia_and_we_were_turned']}],n=0;
  while(n<3){const o=av[await choose(av.map(o=>o.q))];await say(P,o.q);await say(o.r[0],o.r[1]);av=av.filter(x=>x!==o);if(o.ok)n++}
  await say(LU,'one_thing_more');
  await say(SI,'two_doors_shut_one_road');
  await say(TI,'god_has_summoned_us_to_macedonia');
  await say(P,'that_is_my_conclusion_too');
  await say(P,quote('prov15'));
  F.concl=1;AU.mood='hope';SFX.good();
  await narr('god_had_summoned_acts_16_10',{dur:12000});
  await narr('from_this_verse_on_the_account',{dur:7000});codeBtn();return true}
/* aboard: the crossing. One course to Samothrace, a night at anchor, and on the following day Neapolis (Acts 16:11). */
async function aboard(){const me=PC();
  if(eve())return say(me,me===P?'she_is_leons_ship_and_he':'i_have_no_business_aboard');
  if(!F.concl)return say(me,me===P?'not_before_the_brothers':'paul_has_something_to_tell_us_first');
  playAs(P);await say(P,'leon_q',{to:LE});
  await say(LE,'room_yes');
  await leg(4,['we_left_troas_acts_16_11']);
  G.scene=deckScene;AU.mood='night';AU.amb={waves:.6,creak:.5,wind:.3};await fade(0,700);
  await narr('samothrace_has_no_good_harbor',{dur:8000});
  await say(TI,'i_had_never_seen_the_sea');
  await say(P,'look_up_timothy');
  await say(SI,quote('isa42'));
  await say(SI,'isaiah_wrote_it_of_the_servant');
  await say(LU,'if_this_wind_holds_we_shall');
  await say(TI,'what_shall_we_find_there_paul');
  await say(P,'people_who_need_help');
  await leg(6,['next_day_brought_acts_16_11_12',
    'from_the_harbor_the_great'],1);
  await come('philippi');await philIntro()}
ROOMS.troas={space:.7,walk:[16,464,112,138],get mood(){return F.vision?(F.concl?'hope':'calm'):F.slung?'calm':'tense'},amb:()=>F.vision?{waves:.6,gulls:.6,creak:.3,wind:.3}:{waves:.5,gulls:.3,creak:.4,crowd:.15},hs:[
  {name:'sea',x:204,y:40,w:276,h:22,wx:330,look:()=>say(P,F.concl?'sea_and_beyond_it_macedonia'
    :F.vision?'sea_and_the_wind_coming':'sea_with_the_sun_going')},
  {name:'door_of_the_inn',x:40,y:59,w:24,h:45,wx:52,wy:114,exit:night,
    look:()=>say(P,F.vision?'the_inn':'inn_by_the_warehouses_with_a_lamp')},
  {name:'warehouse',x:100,y:58,w:90,h:46,wx:146,wy:114,look:'warehouse_its_doors_open',use:'i_have_nothing_to_store',open:'it_is_open_already_and_it'},
  {name:'jars_of_oil',x:152,y:92,w:32,h:22,wx:186,wy:117,dir:-1,look:()=>say(P,eve()?'jars_of_oil_waiting_to_be':'jars_of_oil_said'),pickup:'they_are_leons_cargo'},
  {name:'bales',x:202,y:96,w:56,h:18,wx:230,wy:118,look:'bales_of_dyed_wool_purple',pickup:'they_are_worth_more_than_everything'},
  {name:'broken_jar',x:260,y:108,w:36,h:16,wx:252,wy:121,dir:1,look:'jar_that_slipped_from_the_sling',pickup:'shards_cut',vis:()=>eve()},
  {name:'gangplank',x:294,y:82,w:34,h:25,wx:300,wy:113,dir:1,def:'use',exit:aboard,
    look:()=>say(P,F.concl?'gangplank_of_leons_ship':'gangplank_of_a_coaster')},
  {name:'ship',x:226,y:12,w:220,h:70,wx:340,wy:113,look:()=>say(P,'coaster_with_her_yard_on_deck'),use:aboard},
  {name:'coil_of_rope',x:388,y:108,w:20,h:8,wx:398,wy:120,look:'coil_of_good_line_laid',pickup:'it_is_the_ships'},
  {name:'heap_of_old_sailcloth',x:408,y:101,w:54,h:18,wx:403,wy:122,dir:1,
    look:()=>say(P,F.offcut?'old_sailcloth_said':'heap_of_old_sailcloth_what'),
    pickup:Object.assign(async()=>{if(F.offcut)return say(P,'i_have_what_i_needed');if(!eve())return say(P,'it_is_rags_and_this_morning');await say(P,'leon_may_i_have_a_piece',{to:LE});await say(LE,'that_it');
      F.offcut=1;toPaul('offcut');await say(P,'one_sound_piece_is_enough')},{take:1})}]};
LE.hs={name:'Leon',actor:LE,
  look:()=>say(P,F.vision?'leon_with_one_eye_on_his_cargo':F.slung?'leon_said'
    :'leon_master_of_the_coaster'),
  show:{awl:'near_enough_to_a_sailmakers_tool',sling:'for_his_arm',bandage:'that_is_for_the_physician',
    linen:'clean_linen_is_wasted_on_my_hands',offcut:'i_told_you_take_it',knife:'keep_that_well_clear_of_my_rigging',tablets:'i_keep_my_reckoning_in_knots','*':'stow_it_friend'},
  ask:{linen:'linen_i',sling:'cloth_for_a_sling'},
  talk:()=>talkTree([
    {q:'where_are_you_bound_shipmaster',a:()=>say(LE,'neapolis_in_macedonia_the_port_of_philippi')},
    {q:'how_long_is_the_crossing',a:()=>say(LE,'with_the_wind_behind_her_two')},
    {q:'what_happened_here',if:()=>eve()&&!F.slung,a:()=>say(LE,'sling_slipped_a_jar_came')},
    {q:'fair_winds_leon',bye:1}]),
  as:{luke:{look:()=>say(LU,F.slung?'the_shipmaster':'shipmaster_said'),
    talk:()=>say(LE,F.vision?'physician_said':F.slung?'you_have_given_me_back':'can_you_mend_him_physician'),
    show:{lbag:'whatever_is_in_that_bag','*':'stow_it_friend_said'}}}};
SO.hs={name:'Sosias',actor:SO,
  look:()=>say(P,F.slung?'sosias_with_his_arm_in_a_sling':F.bound?'sosias_said'
    :'sosias_the_hand_who_was_hurt'),
  give:async it=>{if(it==='bandage'||it==='linen'||it==='sling'||it==='offcut')return say(P,'binding_a_wound_is_the_physicians');return false},
  show:{awl:'not_near_my_arm_with_that',knife:'keep_it_away_from_me','*':'i_cannot_take_it_friend'},
  talk:()=>say(SO,F.slung?'it_hardly_throbs':F.bound?'it_is_better':'it_is_nothing'),
  as:{luke:{look:()=>say(LU,F.slung?'cleaned_bound_and_carried_high':F.bound?'bound_said':F.clean?'wound_is_clean'
      :'long_cut_and_dirty_oil'),
    give:treat,use:()=>say(LU,F.slung?'it_needs_only_to_be_left_alone':'not_with_my_bare_hands'),
    talk:()=>say(SO,F.slung?'i_shall_not_forget_this_physician':'will_i_keep_the_arm_physician'),show:{'*':'i_cannot_take_it_physician'}}}};
/* ============ PHILIPPI: a city without a synagogue ============ */
/* "We stayed in this city for some days. On the Sabbath day we went outside the gate beside a river, where we thought there was a place of
   prayer" (Acts 16:12, 13). The Study Edition offers two possible reasons why Philippi had no synagogue, and decides for neither; so nobody
   here knows why. What Paul learns, he learns by asking people what they have seen: a gate, a river, and shutters closed every seventh day. */
async function philIntro(){if(G.metPhil)return;G.metPhil=1;
  await narr('philippi_was_like_a_little_italy',{dur:8000});
  await say(LU,'i_have_asked_in_three_streets_paul');
  await say(P,'no_synagogue');
  await say(SI,'somebody_will_know');
  await say(P,'we_ask_and_we_look');codeBtn()}
async function known(){if(!clues()||G.knew)return;G.knew=1;
  await say(P,'gate_a_river_and_a_seventh_day',TH);
  await say(P,'until_the_sabbath_then',TH)}
async function askQuintus(){
  if(F.gate)return say(QU,clues()?'still_asking':'i_have_told_you_what_i');
  if(!G.metQu){G.metQu=1;await say(P,'peace_to_you_we_are_strangers');
    await say(QU,'a_synagogue')}
  await ask(P,QU,'well_ask',[
    {q:'why_is_there_no_synagogue',r:['ask_the_magistrates_not_an_old_soldier',
      [P,'he_does_not_know_why_and_i',TH]]},
    {q:'do_you_know_any_who_worship',r:['i_know_what_is_left_of_my_century']},
    {q:'who_goes_out_by_this_gate',ok:1,
      r:['now_that_is_a_question',
        'they_go_down_to_the_river']}]);
  F.gate=1;SFX.good();
  await say(P,'outside_the_gate_beside',TH);await known();codeBtn()}
async function askZosime(){
  if(F.shop)return say(ZO,F.awn?'my_awning_has_not_sagged':'i_have_told_you_all_that_i');
  await ask(P,ZO,'purple_sir',[
    {q:'do_you_know_any_jews_in_this_city',r:['i_know_cloth_sir_and_who']},
    {q:'is_your_neighbor_a_good',r:['best_in_the_row_and_she',[P,'that_was_idle',TH]]},
    {q:'why_is_the_shop_beside_yours_shut',ok:1,
      r:['lydias',
        'every_seventh_day_those_shutters',
        'where_she_goes_on_that_day']}]);
  F.shop=1;SFX.good();
  await say(P,'seller_of_purple_who_shuts',TH);await known();codeBtn()}
/* An optional kindness: the seam of Zosime's awning, closed without being asked. */
async function mendAwn(){if(F.awn)return say(P,'it_is_closed_and_it_will');
  await walk(P,236,113);P.dir=1;SFX.sew();await say(P,'one_seam_parted_for_the_length');await wait(600);F.awn=1;SFX.good();
  await say(ZO,'my_awning');
  await say(P,'nothing_it');
  await say(ZO,'tentmaker_who_will_not_be_paid');codeBtn()}
/* The days pass at the bench, until the Sabbath. */
async function bench(){
  if(F.sab)return say(P,'not_today_it');
  if(!clues())return say(P,'there_is_work_on_this_bench');
  await say(P,'until_the_sabbath_i_sew');
  await walk(P,122,113);P.dir=-1;P.bow=true;SFX.sew();await wait(700);await fade(1,700);P.bow=false;
  await narr('we_spent_several_days_in_that_city_acts_16_12',{dur:6500});
  await narr('paul_worked_at_his_trade',{dur:7500});
  F.sab=1;place8('philippi');enterRoom('philippi',P.x,P.y,P.dir);await fade(0,700);SFX.good();
  await say(P,'the_sabbath');codeBtn()}
async function gate(){const me=PC();
  if(!F.gate)return say(me,me===P?'we_came_in_by_that_gate':'out_again');
  if(clues()&&!F.sab)return say(me,me===P?'i_have_seen_the_river':'paul_means_to_wait_for_the_sabbath');
  await say(me,F.sab?(me===P?'out_by_the_gate_brothers':'to_the_river_then'):(me===P?'let_us_look_at_this_river':'to_the_river'));
  await fade(1,500);await come('river');
  if(F.sab)return riverIntro();
  if(!G.sawRiver){G.sawRiver=1;await say(P,'river_trees_and_nobody',TH)}}
ROOMS.philippi={space:.9,walk:[16,464,110,138],get mood(){return F.sab?'rest':'calm'},amb:{crowd:.4,fountain:.5,hammer:.2,birds:.2},hs:[
  {name:'citadel',x:300,y:8,w:110,h:24,wx:356,look:'rock_above_the_city_with_a_wall'},
  {name:'west_gate',x:12,y:54,w:32,h:50,wx:40,wy:113,dir:-1,exit:gate,
    look:()=>say(P,F.sab?'west_gate_said':F.gate?'west_gate_beyond':'west_gate_we')},
  {name:'awning_makers_shop',x:74,y:58,w:68,h:28,wx:108,wy:113,look:'rolls_of_goat_hair_cloth',pickup:'they_are_his_stock_and_i'},
  {name:'bench',x:86,y:84,w:48,h:21,wx:122,wy:113,dir:-1,def:'use',use:bench,
    look:()=>say(P,F.sab?'my_corner_of_the_bench':'my_corner_of_the_bench_said'),
    useWith:async it=>{if(it==='awl'||it==='thread'||it==='knife')return bench();return false}},
  {name:'zosimes_shop',x:162,y:58,w:74,h:46,wx:200,wy:113,look:'purple_crimson_and_violet',pickup:'one_of_those_lengths_costs'},
  {get name(){return F.awn?'mended_awning':'torn_awning'},x:226,y:38,w:20,h:16,wx:236,wy:113,dir:1,
    look:()=>say(P,F.awn?'her_awning_with_its_seam_closed':'one_seam_of_her_awning'),
    use:mendAwn,useWith:async it=>{if(it==='awl'||it==='thread')return mendAwn();if(it==='knife')return say(P,'it_needs_closing_not_cutting');return false}},
  {name:'shuttered_shop',x:256,y:56,w:72,h:49,wx:292,wy:113,
    look:()=>say(P,F.shop?'lydias_shop_a_seller_of_purple':'shop_in_the_row_of_the_sellers'),
    use:'i_knock',open:'it_is_shuttered_and_barred'},
  {name:'fountain',x:345,y:66,w:48,h:42,wx:370,wy:113,look:'fountain_at_the_corner_and_good_water',use:'i_drink_it_is',pickup:'fountain_stays_where_it_is'},
  {name:'street_to_the_marketplace',x:400,y:36,w:80,h:68,wx:440,wy:113,dir:1,look:'street_runs_on_into_the_city',
    exit:()=>say(PC(),PC()===P?'marketplace_of_a_roman_colony':'marketplace_said')}]};
QU.hs={name:'Quintus',actor:QU,
  look:()=>say(P,F.gate?'quintus_said':'old_soldier_on_a_bench'),
  show:{awl:'awl_the',knife:'sheathe_it_stranger',tablets:'wax_tablets_i','*':'keep_it_i_have_carried'},
  ask:{syn:askQuintus},talk:askQuintus,
  as:{luke:{look:'old_soldier_retired_to_his_bench',talk:()=>say(QU,'a_physician'),show:{lbag:'army_surgeons_have_had','*':'keep_it_physician'}}}};
ZO.hs={name:'Zosime',actor:ZO,
  look:()=>say(P,F.shop?'zosime_said':'zosime_a_seller_of_purple'),
  show:{awl:()=>F.awn?say(ZO,'i_know_what_that_can_do_sir'):say(ZO,'awl_then'),
    knife:'not_near_my_purple_with_that_sir',thread:'waxed_linen_said',tablets:'accounts_no','*':'i_sell_sir'},
  ask:{syn:askZosime},talk:askZosime,
  as:{luke:{look:'seller_of_purple_and_a_talker',talk:()=>say(ZO,'physician_then'),show:{'*':'i_sell_sir'}}}};
/* ============ THE RIVER: a place of prayer, and a sister who asks to give ============ */
/* They sit down and speak with the women who have come together (Acts 16:13). Whatever Paul chooses to say, the scene comes to the same
   point: Jehovah opened her heart (Acts 16:14). Nothing the player does wins her. Her baptism is told as Acts tells it, in paraphrase,
   16:15 over the river, and not drawn. Then she urges them, and Paul has reasons to decline that are all true; she has one answer. */
async function riverIntro(){if(F.sat||G.metRiv)return;G.metRiv=1;
  await narr('on_the_sabbath_acts_16_13',{dur:9500});
  await say(TI,'women_paul');
  await say(P,quote('ps65'),TH);
  await say(P,'they_have_not_seen_us_yet',TH);codeBtn()}
async function approach(){const me=PC();
  if(me!==P)return say(LU,'paul_is_weighing_how_we',{to:null});
  await think('they_have_not_seen_us_yet_q',[
    {q:'stand_before_them_and_address',no:'there_is_no_platform_here'},
    {q:'keep_our_distance_until',no:'i_have_asked_after_them'},
    {q:'go_down_greet_them_and_sit',ok:1}]);
  await Promise.all([walk(P,230,131),walk(SI,296,134),walk(TI,186,132),walk(LU,350,132)]);for(const a of[LY,PH,EL])a.bow=false;P.dir=1;SI.dir=-1;TI.dir=1;LU.dir=-1;
  await say(P,'peace_to_you_we_are_strangers_in');
  await say(PH,'you_are_not_strangers_on_this_bank');
  F.sat=1;SFX.good();
  await narr('there_we_sat_acts_16_13',{dur:8500});codeBtn()}
async function speak(){
  await think('these_women_pray_to_the_god',[
    {q:'with_the_rain_and_the_seasons',no:'at_lystra_they_had_never'},
    {q:'with_the_letter_from_jerusalem',no:'decrees_are_for_congregations'},
    {q:'with_the_scriptures_they',ok:1}]);
  await say(P,'you_pray_to_jehovah_who');
  await say(P,quote('isa53'));
  await say(P,'isaiah_wrote_that_of_the_christ');
  await say(P,quote('ps16'));
  await say(P,'god_did_not_abandon_him');
  await say(SI,'i_am_from_jerusalem',{to:null});
  await say(TI,'my_mother_and_my_grandmother',{to:null});
  await say(LU,'i_am_a_physician',{to:null});
  await narr('one_of_the_listeners_acts_16_14',{dur:14000});
  await say(LY,'i_came_down_here_this_morning');
  await say(P,'it_was_not_my_words_that_opened',TH);
  await say(LY,'i_am_lydia');
  await say(TI,'thyatira_said');
  await say(P,'it_is_said');
  await fade(1,800);place(LY,'river',260,127,-1);place(P,'river',230,131,1);await fade(0,800);
  await narr('she_was_baptized_acts_16_15',{dur:8500});
  return invite()}
/* She urged them, and would take no refusal (Acts 16:15). That she had to insist implies that they held back, and Paul's reasons were good ones
   (1 Corinthians 9:18; 2 Corinthians 12:14). But she is not asking about lodgings. */
async function invite(){
  await say(LY,'if_in_your_eyes_acts_16_15');
  await say(P,'you_are_kind_lydia');
  await say(LY,'i_did_not_ask_whether_you');await say(LY,'if_in_your_eyes_i_am_faithful');
  let av=[{q:'i_have_a_trade_lydia',r:'i_know_what_work_is_sir'},
    {q:'we_are_four_men',r:'my_house_has_held_more'},
    {q:'i_want_to_offer_the_good',r:'you_have_it'}],n=0;
  for(;;){const i=await choose(av.map(o=>o.q).concat('we_will_come_lydia_and_gladly'));if(i===av.length)break;
    const o=av[i];await say(P,o.q);await say(LY,o.r);await say(LY,'if_in_your_eyes_i_am_faithful');av=av.filter(x=>x!==o);n++;
    if(n===1)await say(P,'same_sentence_again',TH);
    if(n===2){await say(P,quote('kings'),TH);await say(P,'elisha_did_not_tell_the_woman',TH)}}
  await say(P,'forgive_me_lydia');
  await say(LY,'come_now');
  await narr('she_would_take_acts_16_15',{dur:6500});
  return finale()}
async function finale(){await fade(1,800);G.scene=houseScene;AU.mood='rest';AU.amb={fire:.3,crowd:.15};await fade(0,800);
  await narr('lydias_house_was_large',{dur:8000});
  await say(LY,'this_room_is_yours_for_as_long');
  await say(TI,'at_the_ferry_we_did_not');
  await say(P,'we_know_now_where_we_were');
  await narr('some_ten_years_philippians_1_3_5',{dur:15000});
  await narr('of_the_man_who_colossians_4_14',{dur:8500});
  await journey();
  endScreen({title:'the_man_from_macedonia',text:'paul_set_out_and_was_turned',
    extra:[F.awn&&'awning_mended_in_the_street'].filter(Boolean),
    based:'based_on_acts_16_4_15_philippians',
    go:'click_to_continue_to_chapter_nine',code:['chapter_nine_code_code',codeOf(9,0)]});
  await wait(1500);ov.onclick=()=>startChapter(9);await new Promise(()=>{})}
async function toCity(){const me=PC();
  if(F.sat)return say(me,me===P?'not_now':'paul_has_not_spoken_yet');
  if(F.sab)return say(me,me===P?'they_are_here_and_they_are_praying':'with_those_women_on_the_bank');
  await say(me,me===P?'back_to_the_city':'back_to_the_city_then');
  await fade(1,500);await come('philippi')}
const woman=A=>async()=>{const me=PC();if(!F.sat)return approach();if(me===P)return speak();
  return say(A,A===LY?'you_are_a_physician_sir':A===PH?'is_it_true_that_you_have':'i_have_prayed_here_since')};
ROOMS.river={space:.6,walk:[16,464,116,138],mood:'rest',amb:{fountain:.5,birds:.7,leaves:.6,wind:.15},hs:[
  {name:'mountain',x:0,y:40,w:300,h:22,wx:230,look:'long_blue_mountain_across_the_plain'},
  {name:'city',x:376,y:42,w:92,h:22,wx:420,look:'philippi_on_its_hill_with_its_wall'},
  {name:'river',x:150,y:88,w:180,h:20,wx:226,wy:118,look:()=>say(P,F.sab?'clear_water_running_quickly':'clear_river_quick_over_its_stones'),
    use:'i_wash_my_hands_and_my_face',pickup:'river_belongs_to_its_banks'},
  {name:'flat_stones',x:186,y:112,w:138,h:16,wx:254,wy:130,def:'use',
    look:()=>say(P,F.sab?'stones_where_they_sit':'flat_stones_set_in_a_half'),
    use:()=>F.sab?(F.sat?speak():approach()):say(P,'i_sit_down_for_a_moment')},
  {name:'plane_tree',x:340,y:30,w:66,h:84,wx:372,wy:120,look:'plane_tree_broad_enough',use:'i_will_not_sit_in_its_shade'},
  {name:'road_to_the_gate',x:452,y:86,w:28,h:44,wx:458,wy:124,dir:1,look:'road_back_up_to_the_west',exit:toCity}]};
LY.hs={name:'Lydia',actor:LY,look:()=>say(P,F.sat?'woman_in_a_shawl_of_the_color':'woman_in_a_purple_shawl'),
  show:{tablets:'is_that_the_law_and_the_prophets','*':'put_it_by_sir'},talk:woman(LY),
  as:{luke:{look:'woman_of_some_means_by_her_shawl',talk:woman(LY),show:{'*':'put_it_by_sir'}}}};
PH.hs={name:'Phila',actor:PH,look:()=>say(P,F.sat?'phila_said':'younger_woman_with_her_hands'),
  show:{tablets:'writing_none','*':'keep_it_sir'},talk:woman(PH),
  as:{luke:{look:'young_woman',talk:woman(PH),show:{'*':'keep_it_sir_said'}}}};
EL.hs={name:'Elpis',actor:EL,look:()=>say(P,F.sat?'elpis_said':'older_woman_gray_under_her_shawl'),
  show:{tablets:'my_eyes_are_past_it_sir','*':'keep_it_sir_said'},talk:woman(EL),
  as:{luke:{look:'old_woman_straight_in_the_back',talk:woman(EL),show:{'*':'keep_it_sir_said'}}}};
/* ============ THE COMPANIONS: Silas and Timothy, who walk along; Luke and Paul, as each sees the other ============ */
/* what there is still to do, as a companion would put it to Paul */
const todo=()=>inFork()?(F.asia?'track_north_is_open_paul':'road_to_ephesus_lies_in_front')
  :inBor()?(F.bith?'west_you_said':'ferry_is_on_this_bank_and_the_ferryman')
  :inTro()?(!F.vision?(F.slung?'nothing_more_tonight':F.bound?'arm_needs_a_sling_the_physician_says':F.clean||F.strips?'physician_is_waiting_for_the_linen':'that_man_is_bleeding_and_the_physician')
    :F.concl?'ship_paul':'you_have_something_to_tell_us')
  :inPhi()?(F.sab?'it_is_the_sabbath_and_you':clues()?'we_wait_for_the_sabbath':'ask_those_who_see_the_whole')
  :F.sab?(F.sat?'they_are_listening_paul':'they_are_praying'):'nobody_is_here';
const SILAS8={name:'Silas',actor:SI,
  look:()=>say(P,inFork()?'silas_he_walked':inBor()?'silas_twice'
    :inTro()?(F.vision?'silas_he_is_a':'silas_with_the_dust_of_mysia'):inPhi()?'silas_he_has_learned_the':'silas_he_looks'),
  show:{linen:'clean_linen',bandage:'those_are_for_the_physician',offcut:'old_sailcloth_you',sling:'you_sewed_that_for_a_stranger',
    awl:'your_awl_it',tablets:'read_me_one_tonight','*':'keep_it_brother_said'},
  ask:{linen:'my_mantle_has_the_dust',sling:'there_is_old_sailcloth_q',
    syn:'city_keeps_few_secrets'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'what_is_still_to_do_here',a:()=>say(SI,todo())},
    {q:'what_do_you_make_of_it',if:()=>!!F.asia&&!F.concl,once:1,a:()=>say(SI,'that_we_were_told_where')},
    {q:'stay_close_brother',bye:1}])},
  as:{luke:{look:'silas_of_jerusalem',
    talk:()=>say(SI,inTro()&&!F.vision?'you_have_steady_hands_physician':'you_watch_everything_luke'),show:{lbag:'keep_it_by_you_on','*':'keep_it_brother_2'}}}};
const TIM8={name:'Timothy',actor:TI,
  look:()=>say(P,inFork()?'timothy_some':inBor()?'timothy_he_left'
    :inTro()?'timothy_he_has_never':inPhi()?'timothy_he_is':'timothy_he_is_as'),
  show:{linen:'my_mother_packed_it',bandage:'cut_so_straight',sling:'sling_out_of_a_rag',tablets:'are_there_new_ones_paul',
    awl:'awl_i','*':'shall_i_carry_that_for_you_paul'},
  ask:{linen:async()=>{if(F.linen)return say(TI,'you_have_it_paul');
      await say(TI,'clean_linen_said');F.linen=1;toPaul('linen');
      await say(P,'whole_cloth_and_clean')},
    sling:'my_linen_went_into_the_bandage_paul',syn:'i_have_looked_in_every'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'what_is_still_to_do_here',a:()=>say(TI,todo())},
    {q:'are_you_sorry_that_you_came_timothy',if:()=>!!F.asia&&!F.vision,once:1,a:async()=>{await say(TI,'no_paul');
      await say(P,'did_i')}},
    {q:'stay_close_timothy',bye:1}])},
  as:{luke:{look:'timothy_young_and_quick',
    talk:()=>say(TI,inTro()&&!F.vision?'is_it_true_that_wine_cleans':'paul_says_that_you_are'),show:{lbag:'may_i_see_what_is_in_it','*':'shall_i_carry_that_for_you_brother'}}}};
/* Luke when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const LUK8={noCraft:'that_is_the_tentmakers_craft_not_mine_said',
  def:{look:'i_see_nothing_there_that_needs',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_not_my_craft',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
const LUKE8={name:'Luke',actor:LU,
  look:()=>say(P,inTro()?(F.vision?'luke_he':F.slung?'luke_he_looks':'physician_kneeling_on_the_quay')
    :inPhi()?'luke_in':'luke_he_is'),
  show:{linen:'whole_cloth',offcut:'sailcloth_not',
    awl:'awl_in',
    /* the hidden treasure of the chapter (CHAP[8].treasure): once the four have concluded that they must cross over, Luke shows what he notes
       down. It changes nothing in the story */
    tablets:async()=>{await say(LU,'you_keep_notes');if(!F.concl)return;
      await say(LU,'here_are_mine_the_place');treasure()},
    '*':'keep_it_brother_i_have'},
  ask:{linen:'any_clean_linen_cut_into_strips',sling:'any_sound_cloth_will_do',
    syn:'i_have_asked_in_three_streets'},
  talk:async()=>{if(inTro()&&F.vision&&!F.concl)return tell();return talkTree([
    {q:'what_do_you_need_luke',if:()=>eve()&&!F.slung,a:()=>say(LU,!F.strips?'linen_paul':!F.bound?'put_the_strips_into_my_hand':'sling_to_carry_the_arm_high')},
    {q:'what_is_still_to_do_here',if:()=>!eve()||!!F.slung,a:()=>say(LU,todo())},
    {q:'why_did_you_stop_for_him',if:()=>!!F.slung,once:1,a:()=>say(LU,'he_was_bleeding_and_i_was_there')},
    {q:'stay_close_luke',bye:1}])}};
/* Paul, as Luke sees him and talks to him */
const PAUL8={name:'Paul',actor:P,as:{luke:{
  look:()=>say(LU,inTro()?(F.vision?(F.concl?'paul_he_told':'paul_he_has_been')
      :F.slung?'tentmaker_of_tarsus':'traveler_with_the_dust')
    :inPhi()?'paul_he_asks':'paul_he_crossed'),
  talk:()=>talkTree([
    {q:'what_can_i_do_paul',a:()=>say(P,inTro()?(!F.vision?(F.slung?'nothing_more_tonight_brother':F.bound?'wait_a_little':'your_own_craft_luke')
        :F.concl?'come_aboard_with_us':'hear_what_i_have_to_tell')
      :inPhi()?(F.sab?'come_down_to_the_river_with_us':'keep_asking_as_i_do'):F.sat?'sit_with_us_and_speak_when_i':'wait_with_me')},
    {q:'i_will_leave_you_to_it',bye:1}]),
  show:{lbag:'your_craft_luke_not_mine',bandage:'those_are_for_your_hands_brother',sling:'i_sewed_it','*':'keep_it_by_you_luke'}}}};
/* ---------- Luke's side of things, when he is the one being played ---------- */
const AS_L={
  troas:{'sea':{look:()=>say(LU,F.vision?'sea_and_a_fair_wind_over_it':'sun_going_down_into_the_sea')},
    'door_of_the_inn':{look:'inn_where_i_lodge'},'warehouse':{look:'a_warehouse'},
    'jars_of_oil':{look:'jars_of_oil_one'},'bales':{look:'dyed_wool_from_the_cities_of_asia'},
    'broken_jar':{look:'shards_and_spilt_oil',pickup:'i_have_one_cut_to_care'},
    'gangplank':{look:()=>say(LU,F.concl?'gangplank_said':'gangplank_of_the_coaster')},
    'ship':{look:'sound_ship_and_a_careful_master'},'coil_of_rope':{look:'line_neatly_coiled'},
    'heap_of_old_sailcloth':{look:'old_sailcloth_not',pickup:'cloth_is_pauls_craft'}},
  philippi:{'citadel':{look:'fortress_on_a_rock'},'west_gate':{look:'gate_we_came_in_by_and_an_old'},
    'awning_makers_shop':{look:'paul_found_work_here_within'},'bench':{look:'pauls_corner_of_the_bench',use:'that_is_the_tentmakers_craft_not_mine_2'},
    'zosimes_shop':{look:'purple_said'},'torn_awning':{look:'a_torn_awning',use:'that_is_the_tentmakers_craft_not_mine_2'},
    'mended_awning':{look:'awning_with_a_new_seam_in_it'},'shuttered_shop':{look:'closed_shutters_in_the_middle',use:'i_knock_said',open:'it_is_barred'},
    'fountain':{look:'clean_water_running',use:'i_drink_and_i_wash_my_hands'},
    'street_to_the_marketplace':{look:'the_street_to_the_marketplace'}},
  river:{'mountain':{look:'mountains_of_macedonia'},'city':{look:'philippi_on_its_hill'},
    'river':{look:'clear_water_and_quick',use:'i_wash_my_hands_in_it'},
    'flat_stones':{look:'stones_worn_smooth_by_people_sitting'},
    'plane_tree':{look:'shade_and_running_water'},'road_to_the_gate':{look:'road_back_to_the_gate'}}};
for(const r in AS_L)for(const h of ROOMS[r].hs){const n=Object.getOwnPropertyDescriptor(h,'name');const names=n&&n.get?['torn_awning','mended_awning']:[h.name];for(const k of names)if(AS_L[r][k]){h.as=h.as||{luke:{}};Object.assign(h.as.luke,AS_L[r][k])}}
{const aw=ROOMS.philippi.hs.find(h=>h.use===mendAwn);aw.as={luke:{look:()=>say(LU,F.awn?'awning_with_a_new_seam_in_it':'a_torn_awning'),use:'that_is_the_tentmakers_craft_not_mine_2'}}}
/* the flat stones and the women, in Luke's hands: he waits for Paul */
ROOMS.river.hs.find(h=>h.name==='flat_stones').as.luke.use=()=>F.sab&&!F.sat?approach():say(LU,F.sat?'i_am_sitting':'i_sit_down_for_a_moment_said');
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'linen',q:'physician_needs_clean_linen',if:()=>eve()&&!F.linen&&!F.strips},
  {id:'sling',q:'arm_needs_a_sling_and_i',if:()=>eve()&&F.bound&&!F.offcut&&!F.sling},
  {id:'syn',q:'where_do_worshippers_of_god',if:()=>inPhi()&&!clues()}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Silas',note:'prophet_and_a_leading_man'},
    {name:'Timothy',note:'son_of_eunice_of_lystra'},
    {name:'Attalos',note:'carrier_of_wool_who_takes',if:inFork},
    {name:'Kleitos',note:'ferryman_at_the_edge_of_bithynia',if:inBor},
    {name:'Luke',note:()=>F.concl?'physician_and_a_brother':'physician_he',if:()=>inTro()||inPhi()||inRiv()},
    {name:'Leon',note:'shipmaster_of_troas_bound',if:inTro},
    {name:'Sosias',note:'leons_steersman',if:eve},
    {name:'Quintus',note:'old_soldier_who_sits_by_the_west',if:()=>inPhi()||inRiv()},
    {name:'Zosime',note:'seller_of_purple_in_philippi',if:()=>inPhi()||inRiv()},
    {name:'Lydia',note:()=>F.sat?'she_comes_from_the_city_acts_16_14':'seller_of_purple_from_thyatira',if:()=>!!F.shop}],
  tasks:[
    {t:'take_the_paved_road_west',if:()=>inFork()&&!F.asia},
    {t:'asia_is_closed_to_us',if:()=>inFork()&&F.asia},
    {t:'cross_the_river_into_bithynia',if:()=>inBor()&&!F.bith},
    {t:'bithynia_is_closed_to_us',if:()=>inBor()&&F.bith},
    {t:'physician_needs_clean_linen_cut_into_strips',if:()=>eve()&&!F.bound},
    {t:'arm_needs_a_sling',if:()=>eve()&&F.bound&&!F.slung},
    {t:'go_to_the_inn_for_the_night',if:()=>eve()&&F.slung},
    {t:'tell_the_brothers_what',if:()=>inTro()&&F.vision&&!F.concl},
    {t:'go_aboard_the_ship_is_bound',if:()=>inTro()&&F.concl},
    {t:'find_out_where_the_worshippers',if:()=>inPhi()&&!clues()},
    {t:'work_at_the_bench_until_the_sabbath',if:()=>inPhi()&&clues()&&!F.sab},
    {t:'on_the_sabbath_outside',if:()=>(inPhi()||inRiv())&&F.sab&&!F.sat},
    {t:'speak_to_the_women_who_have_assembled',if:()=>inRiv()&&F.sat}],
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
/* The vision is not shown: the engine's dark scene, and the words of Acts 16:9, read from the narrator's scroll as every line told in the dark is. */
const dark=DARK;
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
      'about_50_c_e_acts_16_4_5',
      'acts_does_not_name_those_cities']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;setScore(MUSIC);AU.mood=ROOMS.fork.mood;AU.amb=ROOMS.fork.amb;codeBtn();await fade(0,600);G.metFork=1;
    await say(P,'there_it_is_brothers_the_road');
    await say(TI,'all_the_way_down_to_the_sea');
    await say(SI,'it_is_a_good_road_and_it');
    await say(AT,'to_ephesus');
    await say(P,'we_know_what_to_preach_and_how',TH)},true)}
function hint8(){const b=PC()!==P,his=['paul8b',['this_is_for_paul_to_decide','paul_should_do_this_i']],
    craft=['craft8',['that_is_the_tentmakers_craft_not_mine_a','paul_should_do_this_part_said']],has2=id=>invOf(LU).includes(id);
  if(inFork())return!F.asia?['west8',['i_know_what_to_preach_and_how','i_should_take_the_paved_road_west']]
    :['north8',['one_road_is_closed','we_can_take_the_track_to_the_north']];
  if(inBor())return!F.bith?['bith8',['bithynia_has_cities_too_said','i_should_use_the_ferry']]
    :['sea8',['asia_is_closed_and_bithynia_is_closed','we_can_take_the_road_west']];
  if(inTro()){
    if(!F.vision){
      if(F.slung)return['inn8',['man_is_cared_for_and_it','we_can_go_in_at_the_door_said']];
      if(b)return!F.clean?['clean8',['dirty_wound_and_i_have','i_should_use_my_bag_on_sosias']]
        :!F.bound?(has2('bandage')?['bind8',['wound_is_clean_and_i_have','i_should_use_the_linen']]:['wait8',['the_wound_is_clean','paul_should_bring_me_linen_strips']])
        :has2('sling')?['hang8',['bound_now','i_should_use_the_sling_on_sosias']]:['wait8b',['it_needs_a_sling','paul_should_sew_a_sling']];
      if(!F.strips)return!F.linen?['linen8',['clean_linen_i','i_should_ask_timothy_about_the_linen']]
        :['cut8',['whole_cloth_and_a_physician','i_should_use_my_knife_on_the_linen']];
      if(!F.bound)return['give8',['strips_are_cut','i_should_give_the_linen']];
      if(!F.sling)return!F.offcut?['off8',['sling_is_a_band_of_cloth','i_should_pick_up_the_old']]
        :['sew8',['sound_cloth_an_awl_and_thread','i_should_use_my_awl_on_the_old']];
      return['give8b',['sling_is_sewn','i_should_give_the_arm_sling']]}
    if(!F.concl)return b?his:['tell8',['i_saw_what_i_saw','i_should_talk_to_silas']];
    return['ship8',['god_has_summoned_us_to_macedonia_said','we_can_go_up_the_gangplank_said']]}
  if(inPhi()){
    if(F.sab)return['riv8',['it_is_the_sabbath','we_can_go_out_by_the_west']];
    if(clues())return b?craft:['work8',['i_know_the_place_and_i','i_should_use_my_bench']];
    return b?his:!F.gate?['gate8',['who_sees_everybody_who_leaves_a_city','i_should_talk_to_the_old_said']]
      :['shop8',['row_of_shops_all_open_but_one','i_should_talk_to_zosime']]}
  if(!F.sab)return['back8',['place_i_have_found','we_can_go_back_up_the_road']];
  if(!F.sat)return b?his:['sit8',['they_came_out_to_pray_under_the_open','i_should_talk_to_the_women']];
  return b?his:['speak8',['they_know_the_scriptures','i_should_talk_to_lydia']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_paul']};
/* Birds (shared/birds.js): gulls over the harbors, birds of prey, swallows and larks over open country, sparrows and doves on the
   roofs and walls of the towns; by day and in fair weather only. Scenery: they change nothing in the story. */
ROOMS.troas.birds={gulls:[375,4,100,22],stand:[[360,101.5,-1]]};
ROOMS.fork.birds={prey:[150,8,200,30],lark:[170,72,24]};
ROOMS.ferry.birds={prey:[120,6,260,26],swallows:[40,86,330,14]};
ROOMS.river.birds={swallows:[50,86,230,14],prey:[240,6,140,24]};
ROOMS.philippi.birds={perch:[{k:'sparrow',y:19,x:[175,185,197]},{k:'dove',y:12,x:[20,47.5],d:[1,-1]}]};

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
