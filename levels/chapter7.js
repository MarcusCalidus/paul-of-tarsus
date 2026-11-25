/* Paul of Tarsus: level data for Chapter Seven, "Timothy of Lystra".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   The opening of the second missionary journey (Acts 15:36-16:5), after the meeting in Jerusalem (Acts 15:1-35), which is told as the
   chapter opens: with Silas through Syria and Cilicia, over the Taurus by the Cilician Gates, to Derbe, Lystra and Iconium. The travel
   map (shared/map.js) leads from place to place, through its northern window. Acts names no city in Cilicia and describes no road: the
   congregation in Tarsus and the road through the Gates are likely, not stated, and the chapter's end screen says so. */
LEVEL(7,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A road tune on five notes, in E flat: the kind of tune a shepherd's pipe plays. A lyre steps in even fours over a bass, a frame drum
   keeps a walking pace, and a reed pipe carries the tune (mood "hope": the roads and the street). Indoors and in the courtyards (mood
   "calm") a harp takes the lyre's place and a ney the pipe's. While a congregation is of two minds (mood "tense") nothing is held: the
   low string plucks the keynote in threes, threes and twos and leans on the note above it, the drum ticks with it and almost stops
   every fourth bar, and the ney begins the tune and breaks off a note before it comes home; and when the wind comes down the gorge
   (mood "storm") the same low string goes on under a drum that rolls like thunder far off. */
const _=null,
 TUNE=[[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,2,8]],[[0,4,2],[2,5,2],[4,6,4],[8,5,2],[10,4,2],[12,3,4]],[[0,2,4],[4,1,4],[8,0,8]],
  [[0,5,4],[4,6,2],[6,7,2],[8,6,4],[12,5,4]],[[0,4,4],[4,3,2],[6,4,2],[8,2,8]],[[0,1,2],[2,2,2],[4,3,2],[6,4,2],[8,3,4],[12,1,4]],[[0,0,4],[4,-1,2],[6,0,10]]],
 MUSIC={dt:.17,root:51,scale:[0,2,4,7,9],bars:16,tracks:[
  {inst:'lyre',moods:['hope'],prog:'AABAACBA',len:3,seq:{A:[0,_,2,_,3,_,2,_,0,_,2,_,3,_,5,_],B:[1,_,3,_,4,_,3,_,1,_,3,_,4,_,6,_],C:[-1,_,1,_,3,_,1,_,-2,_,0,_,2,_,0,_]}},
  {inst:'harp',moods:['calm'],group:[3,3,4,4,2],prog:'AABAACBA',len:3,oct:12,seq:{A:[0,_,_,2,_,_,3,_,_,_,2,_,_,_,0,_],B:[1,_,_,3,_,_,4,_,_,_,3,_,_,_,1,_],C:[-1,_,_,1,_,_,3,_,_,_,1,_,_,_,-2,_]}},
  {inst:'bass',moods:['hope','calm'],prog:'AABAACBA',len:6,seq:{A:[-5,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-1,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-7,_,_,_,_,_,-4,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d...t.k.d.d.t...',B:'d...t.k.d.k.t.tk'}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.45},
  {inst:'bass',moods:['tense','storm'],prog:'AABC',len:2,group:[3,3,2],vol:.9,seq:{
    A:[-5,_,_,-5,_,_,-4,_,-5,_,_,-5,_,_,_,_],B:[-5,_,_,-5,_,_,-4,_,-4,_,_,-5,_,_,-7,_],C:[-5,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',group:[3,3,2],seq:{A:'d..k..k.d..k..k.',B:'d..k..k.d..k.kk.',C:'d...............'},vol:.6},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:.8,lines:[TUNE[0],TUNE[1].slice(0,-1),[],[],TUNE[4],TUNE[5].slice(0,2),[],[]]},
  {drum:1,moods:['storm'],group:[3,3,2],prog:'AB',seq:{A:'d..d..k.d.......',B:'d..d..k.d..kd.k.'},vol:.9},
  {inst:'oud',moods:['storm'],group:[3,3,2,2,2,4],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,2,_,_,_,_,_,1,_,_,_],B:[0,_,_,_,-1,_,_,_,_,_,1,_,_,_,_,_]},vol:.7},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
/* materials and light shared by the backdrops of every chapter (shared/materials.js, to the standard of Chapter Fifteen's room of Gaius):
   quiet directional grain on wood, two-tone cracks set by hand, contact shadows in three steps of alpha, dyes drawn toward earth colors */
const{plank:plank7,board:board7,crack:crack7,skipCracks:skipCracks7,shadow:shadow7,earth:earth7,joistAO:joistAO7}=SHARED.materials;
/* The open country (shared/country.js): rock, stony ground, boulders and grass, painted alike in every chapter. Where a room's old painter has
   made way for it, the old one still runs on SCRAP7, a scrap canvas nobody sees, so that it takes its draws from the room's rng() in their
   order and everything the room paints after it stays where it was */
const CO=SHARED.country,SCRAP7=mk(4,4)[1];
/* joists7: the ceiling seen from below at its edge, as in Chapter One's workshop: dark boards, and the joists running toward us in
   perspective from the wall plate (y = U) to the top of the picture, each with the soft shade of the boards beside it. They stand in pairs
   about the middle, so that none rises upright from the plate, and no square beam end sits on it to make a T; the room lays the plate over
   their feet. rj: a seed of its own. burn7: the draws that board() took for the square beam ends the room used to show, taken on a scrap
   canvas, so that everything the room draws after them stays where it was */
function joists7(g,U,step,rj,c){c=c||{};const T=c.joist||'#6b4a2e',k=1.17;
  if(c.boards!==0){plank7(g,0,0,320,U,c.boards||'#33251a',rj,0);ao(g,0,0,320,U*.7,'t',.45,'#0c0808')}
  let a=160+step/2-3.5;while(a>-step)a-=step;
  for(;a<330;a+=step){const x0=160+(a-160)*k,x1=160+(a+7-160)*k,P=[a,U,a+7,U,x1,0,x0,0];joistAO7(g,a,x0,7,U,'#0c0808');poly(g,P,T);
    clipTo(g,()=>poly(g,P),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,U,'overlay',.5));
    poly(g,[a+5,U,a+7,U,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,U,x0+.25,0],tint(T,.25),.5)}
  ao(g,0,U-2.5,320,2.5,'b',.3,'#0c0808')}
function burn7(r,x0,step,w,h){const d=mk(4,4)[1];for(let i=x0;i<320;i+=step)board7(d,i,0,w,h,'#5a4226',r,1)}
const SH='#8f95c8';
/* What is seen through the south gate of Iconium: the plateau, blue ranges round it, and the road running on. The gate adds the horizon and the sky of its scene. */
const GATE7={far:['#a9b4c8','#c2cad4'],near:['#98a86c','#a8b47c'],land:'#c4c08a',road:'#ead9ae'};
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* crag: a face of bare limestone inside the outline p: bedded, cracked, lit from the upper left. The beds run across the face; each crack
   is cut in two tones (the dark of the cut and a faint lit lip) and stops inside its own bed, so that no crack crosses a bedding line and
   makes a cross. o.gaps: fissures [x0,y0,x1,y1] that the scene cuts across the face afterwards; the bedding lines stop short of each, for
   the same reason. The random draws are the same as they were, so the rest of the room keeps its place. */
function crag(g,p,c,r,o){o=o||{};let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
  const sl=o.dip||0,beds=[];
  clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.16),c,tint(c,-.22)]);g.fillRect(x0,y0,x1-x0,y1-y0);tex(g,'mott',.42,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'vert',.2,x0,y0,x1-x0,y1-y0,'overlay',.5);
    g.save();g.beginPath();g.rect(x0-20,y0-20,x1-x0+40,y1-y0+40);for(const[a,b,cc,d]of o.gaps||[]){g.moveTo(a-4,b-4);g.lineTo(a+4,b-4);g.lineTo(cc+4,d+4);g.lineTo(cc-4,d+4);g.closePath()}g.clip('evenodd');
    for(let j=y0+3+r()*4;j<y1;j+=4+r()*7){const q=[x0,j+(r()-.5)*3];for(let x=x0+8;x<=x1+8;x+=8+r()*10)q.push(x,j+(x-x0)*sl+(r()-.5)*2.4);beds.push(j);stroke(g,q,rgba('#2a2438',.24),.6);stroke(g,q.map((v,i)=>i%2?v+.7:v),rgba('#fff6e0',.16),.5)}
    g.restore();
    const cut=[];
    for(let k=0;k<(x1-x0)*(y1-y0)/420;k++){let qx=x0+r()*(x1-x0),qy=y0+r()*(y1-y0)*.8;const q=[qx,qy];for(let s=0;s<3+r()*4;s++){qx+=Math.abs(r()-.5)*4;qy+=2+r()*5;q.push(qx,qy)}
      /* the bed the crack starts in: from 2 below its upper line to 2 above its lower one. Every crack leans the same way, and none comes
         within 3 of another in its bed, so that no two of them meet as an X */
      const off=(q[0]-x0)*sl;let top=y0,bot=y1,b=0;for(const j of beds){if(j+off<=q[1]){top=j+off;b++}else{bot=j+off;break}}top+=2;bot-=2;if(bot-top<2)continue;
      const xa=q[0]-3,xb=q[q.length-2]+3;if(cut.some(([bb,a,c])=>bb===b&&xa<c&&xb>a))continue;cut.push([b,xa,xb]);
      const T=Math.max(1,q[q.length-1]-q[1]),Q=q.map((v,i)=>i%2?top+(v-q[1])/T*(bot-top):v);
      stroke(g,Q,rgba('#1e1a2c',.32),.5);stroke(g,Q.map((v,i)=>i%2?v:v+.5),rgba('#fff6e0',.12),.5)}
    if(o.shade)ao(g,x0,y0,x1-x0,y1-y0,o.shade,.3,'#2a2848')})}
/* rock: a stone sitting on the ground at x,y, with a soft contact shadow */
function rock(g,x,y,w,h,c){shadow7(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),.36,'#1e1a32');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.34,x-w/2,y-h,w,h,'overlay',1);
    ao(g,x-w/2,y-h*.3,w,h*.3,'b',.25,'#1e1a32')})}
/* poplar: a tall narrow tree, such as line every water channel of the plateau; bare: in winter, a broom of twigs */
function poplar(g,x,y,h,c,r,bare){R(g,x-.6,y-h*.24,1.3,h*.24,'#5a4630');if(!bare)return foliage(g,x,y-h*.6,h*.11+1.6,h*.42,c||'#5f8a4a',r,h*2.4);
  stroke(g,[x,y-h*.24,x+.4,y-h*.96],'#6a5a48',1);for(let i=0;i<h*.9;i++){const k=.26+r()*.66,yy=y-h*k,w=(h*.1+1.4)*Math.sin((k-.2)*3.6)*(.4+r()*.6),s=r()<.5?-1:1;stroke(g,[x,yy,x+s*w,yy-2-r()*5],r()<.5?'#7a6a54':'#9a8a6c',.5)}}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.4,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.4);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.5+k*1.3;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.24));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.3,s*.3,'rgba(40,36,70,.22)')}}
/* stoneGround: bare ground of rock and gravel between y0 and y1 */
function stoneGround(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.45,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.16,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.5);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.6+k*1.6;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.25));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.4,s*.3,'rgba(40,36,70,.25)')}}
/* Zenon's team, as it stood at Derbe in Chapter Six: painted by shared/beasts.js */
const cattle=(g,x,y,dir,fr,c,lit,z)=>SHARED.beasts.ox(g,x,y,dir,fr,c,0,lit,z);
/* wagon: a four-wheeled wagon with solid wheels, its bed at x, standing on the ground at y. cov: 1 a cover on its hoops, -1 an open wagon. load: sacks or bales on its bed.
   pole: how far its pole reaches out in front (13 when it is left out); a wagon parked with no team takes its pole in, so that the pole does
   not run across an upright behind it, such as the jamb of a gateway, and make a cross */
function wagon(g,x,y,cov,load,pole){pole=pole==null?13:pole;shadow7(g,x+30,y+.6,36,2.2,.38,'#1e1a32');
  for(const wx of[x+13,x+47])oval(g,wx+2.4,y-6,5.4,5.6,'#33261a');
  board7(g,x,y-13.6,60,4.6,'#7a5a34',rng(791));R(g,x,y-9,60,1,'#3a2a1a');R(g,x+60,y-12,pole,1.6,'#6a4a2a');R(g,x+60,y-12,pole,.5,'#a07a48');
  if(load)for(const[sx,sw,sh,sc]of[[x+10,6.4,10,'#b8a880'],[x+23,7,12,'#c4b48c'],[x+37,6.6,11,'#a89870'],[x+50,6,9.6,'#b4a47c']])sack(g,sx,y-13.6,sw,sh,sc);
  if(cov>0){g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath();g.fillStyle=lg(g,0,y-34,0,y-13,['#51443a','#2e2620','#1a1410']);g.fill();
    clipTo(g,()=>{g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath()},()=>{for(let i=0;i<5;i++){const hx=x+6+i*12;g.fillStyle='rgba(255,236,200,.1)';g.fillRect(hx,y-34,1,21)}
      tex(g,'vert',.22,x,y-36,60,24,'overlay',.5);ao(g,x,y-22,60,9,'b',.4)});
    for(const cx of[x+1.6,x+55.2]){R(g,cx,y-17,3.2,3,'#a8703c');R(g,cx,y-17,3.2,.6,'#d09a5e');R(g,cx+1.1,y-15.9,1,1,'#2a1a10')}}
  for(const wx of[x+13,x+47]){oval(g,wx,y-6,6.2,6.2,'#4a341e');oval(g,wx,y-6,5,5,'#8a6638');oval(g,wx-.8,y-6.8,3.6,3.6,'#9a7646');stroke(g,[wx-4.2,y-8.4,wx+4.2,y-8.4],'#5a4026',.5);stroke(g,[wx-4.2,y-3.6,wx+4.2,y-3.6],'#5a4026',.5);oval(g,wx,y-6,1.5,1.5,'#33261a')}}
/* bale: a bale of goat-hair cloth, rolled tight, lying on the ground at x,y (clothRoll in the engine: one end faces us) */
function bale(g,x,y,w,h,c){clothRoll(g,x,y,w,h,c,{shadow:1,hi:1,k:.3})}
/* ---------- Antioch: the courtyard where the congregation meets (opening scenes) ---------- */
ART.antioch7={w:320,q:12,
 paint(g){const r=rng(703),W='#e6d6ac',rw=rng(707);
  /* the sky's blues drawn a little toward grey (earth7), so that they sit with the plaster and the stone */
  sky(g,320,58,['#3e7cc8','#76a8dc','#c2d6e4'].map(c=>earth7(c,.14)));cloud(g,150,10,54,6,r);cloud(g,250,20,40,5,r);
  /* Mount Silpius over the roofs of the city */
  ridge(g,0,320,50,x=>20+9*Math.sin(x/64+.6)+3*Math.sin(x/19),['#8a9a86','#aab498']);
  for(const[hx,hy,hw,hh,c]of[[108,30,26,22,'#d8ccac'],[138,34,22,18,'#e6dabc'],[192,28,30,24,'#dcd0b0'],[228,34,24,18,'#cfc2a0']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-3,hy,3,hh,'rgba(60,50,90,.3)');R(g,hx+4,hy+6,3,4,'#3a2c22')}
  for(const[x,h]of[[170,16],[262,13]])cypress(g,x,50,h);
  /* the house, with tiled eaves, and its door */
  house(g,0,46,102,58,W,r,{side:0,patch:2,cracks:0,beams:0,t:.36});skipCracks7(r,4);
  for(let i=0;i<104;i+=5.5){R(g,i,36,5,8.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.8,'#e08a60');R(g,i+4.5,36,.6,8.5,'#7a3620')}R(g,0,44.5,104,1.6,'#6a3a22');
  R(g,31,53,38,51,'#d8c8a0');doorArt(g,34,56,32,48,'#8a6a40',r,{bands:[]});ao(g,34,56,32,5,'t',.3,'#1a1420');windowArt(g,80,58,10,10,W,{bars:2,wood:'#6a4e2c'});
  /* the wall of the courtyard, and the gate to the street: the colonnade across it, as in Chapter Three, with its back wall closing the view */
  house(g,102,48,178,56,tint(W,-.04),r,{side:0,patch:3,cracks:0,beams:0,t:.36});skipCracks7(r,5);
  /* cracks cut by hand, high on the walls, where they run to no head; rb: a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(7031);for(const[x,y,n]of[[14,52,3],[92,51,3],[112,54,3],[246,52,4],[268,55,3]])crack7(g,x,y,n,rb)}
  R(g,280,40,40,64,'#d6c69e');for(let i=280;i<320;i+=5.5){R(g,i,36,5,5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.6,'#e08a60')}poly(g,[280,36,275,39,275,104,280,104],'#a8a0b0');
  arch(g,284,52,32,52,'#c2b28c');g.save();arch(g,286,54,28,50);g.clip();sky(g,320,80,['#74aade','#cfe2ee']);R(g,286,64,28,34,'#8f8894');R(g,297.6,80,4.8,16,'#2a2430');R(g,286,60,28,4,'#e2dac4');R(g,286,58.4,28,1.6,'#b8603c');
  for(const cxx of[291,304]){g.fillStyle=lg(g,cxx,0,cxx+5,0,['#d8d0bc','#fbf7ea','#c8c0b0']);g.fillRect(cxx,64,5,34);R(g,cxx-1,96,7,2,'#d8d0bc')}R(g,286,98,28,6,'#cfc8b6');
  ao(g,286,54,28,9,'t',.5,'#2a2440');ao(g,286,54,5,50,'l',.45,'#2a2440');g.restore();
  /* the vine arbor */
  board7(g,126,43,3,63,'#6a4e2c',rw,1);board7(g,226,43,3,63,'#6a4e2c',rw,1);board7(g,126,40,103,3,'#7a5c36',rw);ao(g,126,43,103,3,'t',.3,'#2a2030');for(let i=0;i<9;i++)board7(g,131+i*11.6,36.6,2.2,3.6,'#5a4226',rw,1);
  stroke(g,[128.5,104,130,84,128.6,66,131,50,138,42],'#5a4630',1.2);stroke(g,[130,70,133,60,142,48],'#5a4630',.8);
  foliage(g,146,39,24,6.5,'#5f8a4a',r,100);foliage(g,196,38,30,7,'#6a9652',r,130);foliage(g,172,43,18,4,'#527c40',r,60);foliage(g,132,56,4,9,'#5f8a4a',r,20);
  /* a bench along the wall, and a great jar of water */
  R(g,150,98,62,8,'rgba(40,30,60,.3)');ao(g,150,96,62,4,'t',.3,'#1a1420');board7(g,148,96,3,10,'#5a4226',rw,1);board7(g,211,96,3,10,'#5a4226',rw,1);board7(g,148,92,66,4,'#96703e',rw);R(g,148,95.6,66,1,'#5a4226');
  shadow7(g,149.5,106,4,1,.4,'#1e1a32');shadow7(g,212.5,106,4,1,.4,'#1e1a32');
  vessel(g,254,106,7,20,'#a05a34','pithos');
  /* paving */
  /* the foot of every wall, and the corner where the court wall meets the gatehouse, lie in a little shade */
  ao(g,0,96,320,8,'b',.2,'#2a2030');ao(g,262,48,13,56,'r',.22,'#2a2030');
  pave(g,0,104,320,144,'#d6c49a',r,{vx:160,vy:66,rows:5,step:34,v:.08});ao(g,0,104,320,5,'t',.3,'#4a4460');ao(g,0,104,320,2,'t',.22,'#1a1420');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,105,320,39)});
  shade(g,[0,105,100,105,112,111,0,113],SH,.55);shade(g,[118,105,238,105,250,121,126,121],SH,.4);
  comp(g,'screen',.35,()=>{for(let i=0;i<50;i++)oval(g,126+r()*116,106.5+r()*13,1.5+r()*3,.5+r()*.8,'#fff0c8')});
  pool(g,80,0,260,150,'#fff0c0',.14,'screen');ao(g,0,120,320,24,'b',.12,'#2a2050');
  /* light: the morning sun from the upper left on the house and the court wall, brightest on the paving before the arbor; a warm bounce
     off the paving onto the foot of the walls; the arbor's floor, the gatehouse reveal and the near paving keep their shade */
  lightmap(g,320,'#e4dcd8',l=>{pool(l,130,40,230,90,'#ffffff',.72);pool(l,170,118,180,26,'#fff4e0',.45);pool(l,60,92,70,16,'#fff0d8',.3);pool(l,200,96,60,10,'#fff0d8',.22);
    comp(l,'multiply',1,()=>{ao(l,0,128,320,16,'b',.3,'#4a4468');ao(l,275,0,45,144,'r',.18,'#4a4468');shade(l,[126,104,229,104,240,118,132,118],'#e4dcec',.5)})})},
 draw(){},front(){}};
/* ---------- Jerusalem: the room where the apostles and the elders gathered (opening scene) ---------- */
ART.council={w:320,q:12,
 paint(g){const r=rng(709),ST='#d8ccae',rw=rng(711);
  ashlar(g,0,0,320,104,ST,r,{bw:17,bh:8.5,v:.07,t:.22});
  /* a few hairline cracks in the stones, high up, where they run to no head */
  {const rb=rng(7091);for(const[x,y,n]of[[36,14,3],[132,12,3],[226,15,3],[292,13,4]])crack7(g,x,y,n,rb,.9)}
  /* the ceiling at its edge, its joists running toward us, and the wall plate they rest on; the stone darkens under the plate */
  joists7(g,7.5,36,rng(7111));burn7(rw,8,38,7,7);board7(g,0,7,320,2.4,'#6a4e2c',rw);ao(g,0,9.4,320,12,'t',.4,'#2a2030');ao(g,0,9.4,320,3,'t',.25,'#1a1420');
  /* three round-headed windows, high in the wall: the flat roofs of the city in its pale limestone, and the sky over them; through the
     middle one, far off over the roofs, the temple on its mount, the gold along its tops in the sun (shared/temple.js) */
  for(const x of[60,150,240]){arch(g,x-2,22,24,36,tint(ST,-.25));g.save();arch(g,x,24,20,34);g.clip();sky(g,320,58,['#6aa2dc','#d8e8f0']);
    if(x===150)SHARED.temple.far(g,{x:158,base:47,s:.34,k:.4,sun:'left',haze:'#d8e4ee',a:.16,parts:{inner:1,wall:1},down:16,seed:7093});
    SHARED.temple.roofs(g,{x0:x-2,x1:x+22,y:x===150?49:46,dy:2.5,down:14,w:[4,9],sun:'left',haze:'#d8e4ee',a:.14,seed:x+7});
    SHARED.temple.roofs(g,{x0:x-2,x1:x+22,y:51,dy:1.5,down:10,w:[6,11],sun:'left',haze:'#d8e4ee',a:.06,seed:x+9});
    ao(g,x,24,20,7,'t',.4,'#2a2440');ao(g,x,24,4,34,'l',.35,'#2a2440');g.restore();R(g,x-3,58,26,1.8,tint(ST,.2));R(g,x-3,59.8,26,.6,tint(ST,-.4))}
  /* a lamp in a niche on either side of the middle window */
  for(const x of[108,200]){arch(g,x,42,13,18,tint(ST,-.3));arch(g,x+1,43,11,17,'#3a2c22');ao(g,x+1,43,11,6,'t',.4,'#0c0808');R(g,x-1,59.6,15,1.6,tint(ST,.15));R(g,x+3.6,57,6,2.4,'#b8733c');R(g,x+3.6,57,6,.6,'#e0a064')}
  /* benches along the wall */
  for(const[x,w]of[[12,112],[196,112]]){R(g,x+2,97,w,8,'rgba(40,30,60,.24)');ao(g,x+2,94,w,4,'t',.3,'#1a1420');board7(g,x,90,w,4,'#8a6a40',rw);R(g,x,93.6,w,.8,'#5a4226');board7(g,x,94,3,10,'#5a4226',rw,1);board7(g,x+w-3,94,3,10,'#5a4226',rw,1);
    shadow7(g,x+1.5,104,4,1,.4);shadow7(g,x+w-1.5,104,4,1,.4)}
  /* a table, with what is needed for writing a letter */
  R(g,140,98,44,8,'rgba(40,30,60,.26)');ao(g,140,92,44,4,'t',.3,'#1a1420');board7(g,138,88,44,4,'#96703e',rw);R(g,138,91.6,44,1,'#5a4226');board7(g,138,92,3,12,'#5a4226',rw,1);board7(g,179,92,3,12,'#5a4226',rw,1);
  shadow7(g,139.5,104,4,1,.4);shadow7(g,180.5,104,4,1,.4);
  R(g,146,86.4,17,1.8,'#efe4c4');R(g,146,86.4,17,.5,'#fff8e0');R(g,144.6,86.2,1.6,2.2,'#d8cca8');for(let i=0;i<4;i++)R(g,149+i*3.4,87,2.4,.4,'#7a6a4a');
  /* an inkpot and a reed pen: square-cut, because a pot this small would rasterize as a plus sign if it were turned on the wheel */
  R(g,169.6,84.8,3,3.2,'#3a3028');R(g,169.6,84.8,3,.6,'#6a5a4c');R(g,170.2,84.2,1.8,.6,'#241c16');stroke(g,[164,87.6,169,83.6],'#c8a468',.6);
  /* the floor: great slabs, and a mat woven in bands */
  ao(g,0,96,320,8,'b',.22,'#2a2030');
  pave(g,0,103,320,144,'#cbbd9a',r,{vx:160,vy:60,rows:4,step:44,v:.07,t:.3});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2,'t',.22,'#1a1420');
  /* the mat: its bands' dyes drawn a little toward earth colors */
  clipTo(g,()=>poly(g,[58,114,262,114,282,139,38,139]),()=>{R(g,38,114,244,25,earth7('#7a4a3e'));for(let i=0;i<8;i++)R(g,38,115.6+i*3,244,1,i%2?'#c8a878':earth7('#4a2e2a'));tex(g,'mott',.3,38,114,244,25,'overlay',1);ao(g,38,114,244,5,'t',.25)});
  /* light: the three windows, each with its fall of day onto the floor; the two lamps light from their niches (nicheLight) and not as a
     round glow on the wall above them; the benches and the table catch what falls near them; the ceiling, the ends of the wall and the
     near floor lie in the room's own shade */
  lightmap(g,320,'#b0a498',l=>{for(const x of[70,160,250]){pool(l,x,40,26,26,'#fff4d8',1);l.fillStyle=lg(l,0,58,0,140,['rgba(255,240,200,.5)','rgba(255,240,200,0)']);poly(l,[x-10,58,x+10,58,x+44,140,x-44,140]);l.fill()}
    nicheLight(l,114.5,58,26,20,'#ffc070',.55);nicheLight(l,206.5,58,26,20,'#ffc070',.55);pool(l,160,122,170,40,'#fff0d8',.4);
    pool(l,160,92,40,12,'#fff4e0',.3);pool(l,68,94,50,10,'#fff0d8',.22);pool(l,252,94,50,10,'#fff0d8',.22);
    comp(l,'multiply',1,()=>{ao(l,0,0,320,18,'t',.35,'#3a3048');ao(l,0,0,40,144,'l',.3,'#3a3048');ao(l,280,0,40,144,'r',.3,'#3a3048');ao(l,0,130,320,14,'b',.3,'#3a3048')})})},
 draw(){},front(){}};
/* ---------- Tarsus: the courtyard of Eirene the linen weaver, where the congregation meets ---------- */
const taur7=x=>18+7*Math.sin(x/83+1.4)+4*Math.sin(x/29+.6)+2*Math.sin(x/9);
ART.tarsus7={w:480,fp:1.3,q:12,
 /* the sun from the upper left, as the shed, the benches and the basin throw their shade: shadows fall to the right and a little toward us */
 light:{amb:'#ffffff',wallY:103,sun:[9,7,.4]},
 paint(g){const r=rng(719),W='#e8dcc0',W2='#dccfae',rw=rng(721);
  /* the sky's blues drawn a little toward grey (earth7), so that they sit with the plaster and the stone */
  sky(g,480,60,['#3a78c6','#72a6dc','#b8d2e6','#e6e8dc'].map(c=>earth7(c,.14)));cloud(g,170,9,60,7,r);cloud(g,330,18,44,5,r);cloud(g,446,8,34,5,r);
  /* far to the north, over the wall: the Taurus, with the first snow of the year on it */
  snowy(g,96,480,46,taur7,['#8494c0','#a2b0cc','#c4ccd0'],21);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,16,0,46,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(96,16,384,30)});
  for(const[x,h]of[[264,15],[272,11],[300,13]])cypress(g,x,44,h);
  /* the house of Eirene: two floors, a door, and barred windows */
  house(g,0,10,96,94,W,r,{side:0,patch:3,cracks:0,beams:12,t:.36});skipCracks7(r,5);windowArt(g,18,26,12,12,W,{bars:3,wood:'#6a4e2c'});windowArt(g,64,26,12,12,W,{bars:3,wood:'#6a4e2c'});
  R(g,33,56,30,48,'#cfc0a0');doorArt(g,36,59,24,45,'#7a5a3a',r,{bands:[]});ao(g,36,59,24,5,'t',.3,'#1a1420');R(g,32,102.6,32,1.6,'#f0e6cc');poly(g,[96,6.5,101,10,101,104,96,104],'#a8a0b4');
  /* the wall of the courtyard */
  house(g,101,42,379,62,W2,r,{side:0,patch:5,cracks:0,beams:0,t:.36});skipCracks7(r,8);
  /* cracks cut by hand, high on the walls, where they run to no head; rb: a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(7191);for(const[x,y,n]of[[8,16,4],[84,40,3],[262,46,3],[326,48,4],[422,47,3]])crack7(g,x,y,n,rb)}
  /* linen, bleaching on the wall in the sun */
  for(const[x,w,h]of[[272,20,27],[296,17,22]]){poly(g,[x,38+h,x+w,38+h,x+w+3,38+h+5,x+3,38+h+5],'rgba(50,40,90,.2)');g.fillStyle=lg(g,x,0,x+w,0,['#f0ecdf','#fffdf4','#e2dccb']);g.fillRect(x,37,w,h+1);
    for(let i=2;i<w;i+=3.4)R(g,x+i,38,.5,h-2.6,'rgba(120,110,90,.18)');R(g,x,38+h-.8,w,.8,'#cfc8b6')}
  /* the weaving shed: a tiled roof on two posts, the loom against the wall, and shelves of finished linen */
  for(let i=118;i<250;i+=5.5){R(g,i,36,5,8,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.8,'#e08a60');R(g,i+4.5,36,.6,8,'#7a3620')}R(g,118,44,132.5,1.6,'#6a3a22');board7(g,118,45.6,132.5,1.6,'#7a5632',rw);
  shade(g,[118,47,250,47,250,104,118,104],SH,.42);ao(g,121,47.2,126.5,8,'t',.35,'#1a1420');ao(g,121,47.2,8,57,'l',.2,'#1a1420');ao(g,239.5,47.2,8,57,'r',.2,'#1a1420');
  board7(g,118,47.2,3,57,'#6a4e2c',rw,1);board7(g,247.5,47.2,3,57,'#6a4e2c',rw,1);shadow7(g,119.5,104,4,1,.35);shadow7(g,249,104,4,1,.35);
  /* the loom: two uprights and a beam, the web wound on the beam, and the warp hanging down to its weights. The beam ends at the
     uprights and the uprights at the beam, so that the frame is a doorway and nothing else. */
  board7(g,142,54,2.6,50,'#7a5632',rw,1);board7(g,181.4,54,2.6,50,'#7a5632',rw,1);board7(g,142,54,42,3,'#8a6238',rw);
  g.fillStyle=lg(g,0,57,0,78,['#fffdf4','#f0eada','#dcd4c0']);g.fillRect(146,57,34,21);for(let j=58.5;j<78;j+=2)R(g,146,j,34,.4,'rgba(120,110,90,.2)');
  for(let i=0;i<12;i++){const x=147+i*2.9,n=(i*7)%3;R(g,x,78,.5,17+n,'#e8e0c8');R(g,x-.7,95+n,2,2.6,i%2?'#a89880':'#8a7c68');R(g,x-.7,95+n,2,.5,'#c8b89c')}
  /* the shelves, and the bolts of linen on them */
  R(g,196,62,1.6,42,'#5a4226');R(g,240.4,62,1.6,42,'#5a4226');
  for(const y of[62,76,90]){ao(g,197.6,y+2,42.8,3,'t',.3,'#1a1420');board7(g,196,y,46,2,'#7a5c36',rw);for(let i=0;i<4;i++){const c=['#f4efe0','#e8dcc0','#c9d6dc','#eadfbe'][(i+y/2)%4|0],bx=199+i*10.4,n=i%2;g.fillStyle=lg(g,0,y-7,0,y,[tint(c,.1),c,tint(c,-.25)]);g.fillRect(bx,y-7+n,8.6,7-n);R(g,bx,y-3.6,8.6,.4,'rgba(90,80,60,.25)')}}
  /* a stone basin, for washing the flax */
  shade(g,[262,107,330,107,340,113,272,113],SH,.5);g.fillStyle=lg(g,264,0,328,0,['#b0a690','#ece4cc','#d2c8b0','#928a78']);g.fillRect(264,92,64,14);R(g,263,90.6,66,2.2,'#f2ead6');R(g,263,92.6,66,.6,'#a8a094');R(g,267,91.2,58,1.4,'#5f9cc0');R(g,264,104.6,64,1.4,'#8a8272');
  /* a fig tree, and under it the benches where the congregation sits */
  stroke(g,[384,104,383,86,387,68,381,54],'#6a5a48',4);stroke(g,[385,104,384.4,86,388.4,68,382.4,54],'#a8987e',1.2);stroke(g,[385,74,374,60,366,54],'#6a5a48',2);stroke(g,[386,66,398,54,404,48],'#6a5a48',2);
  foliage(g,376,40,30,13,'#5a8448',r,220);foliage(g,402,32,20,11,'#679252',r,120);foliage(g,354,50,15,8,'#4f7840',r,70);
  for(const x of[336,394]){R(g,x+2,98,36,8,'rgba(40,30,60,.3)');ao(g,x+2,96,36,4,'t',.3,'#1a1420');board7(g,x,92,38,4,'#96703e',rw);R(g,x,95.6,38,1,'#5a4226');board7(g,x,96,3,9,'#5a4226',rw,1);board7(g,x+35,96,3,9,'#5a4226',rw,1);
    shadow7(g,x+1.5,105,4,1,.4);shadow7(g,x+36.5,105,4,1,.4)}
  /* the gate to the street. The street runs past it, to the harbor one way and to the north gate the other, so what the arch shows is its far
     side: a house front in the sun under its eave of tiles, and the pavement between. The foot of that house closes the view: no horizon is
     seen here that could lie wrong. One roof line runs right across, and the door has no middle seam, so that no upright meets a level line. */
  ashlar(g,438,30,42,74,'#dccfaa',r,{bw:13,bh:6.4,v:.09});R(g,437,28.6,43,2,'#f4e8c8');poly(g,[438,28.6,433,32,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');g.save();arch(g,446,56,28,48);g.clip();R(g,446,56,28,48,'#e6e8dc');
  R(g,446,68,28,28,'#e8dcc0');tex(g,'mott',.3,446,68,28,28,'overlay',1);ao(g,446,88,28,8,'b',.22,'#4a3424');
  R(g,446,66.4,28,1.8,'#b8603c');R(g,446,66.4,28,.5,'#d88a5c');R(g,446,68.2,28,.8,'rgba(60,40,60,.3)');
  R(g,450.6,79.4,7.2,16.6,'#c4b796');R(g,451.4,80.2,5.6,15.8,'#6a4a2c');R(g,451.4,80.2,1,15.8,'#3a2616');
  R(g,465.2,73,4.4,4.6,'#b8ab8a');R(g,465.8,73.6,3.2,3.4,'#1c1410');R(g,464.6,77.6,5.6,.8,'#f0e6cc');
  R(g,446,96,28,8,'#d2c8ac');R(g,446,96,28,.6,'#efe6cc');for(const y of[98.8,101.6])R(g,446,y,28,.5,'rgba(90,80,70,.3)');
  ao(g,446,56,28,10,'t',.55,'#2a2440');ao(g,446,56,5,48,'l',.5,'#2a2440');ao(g,470,56,4,48,'r',.35,'#2a2440');g.restore();
  /* paving */
  /* the foot of every wall, and the corners where the walls meet, lie in a little shade */
  ao(g,0,95,480,9,'b',.2,'#2a2030');ao(g,96,42,10,62,'l',.24,'#2a2030');ao(g,424,30,9,74,'r',.24,'#2a2030');
  pave(g,0,103,480,144,'#d8ceb0',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,0,103,480,5,'t',.3,'#4a4460');ao(g,0,103,480,2,'t',.22,'#1a1420');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,101,104,112,110,0,112],SH,.5);shade(g,[118,104,250,104,262,112,128,112],SH,.42);shade(g,[334,104,438,104,450,121,346,121],SH,.4);
  comp(g,'screen',.3,()=>{for(let i=0;i<40;i++)oval(g,346+r()*92,106.5+r()*13,1.5+r()*3,.5+r()*.8,'#fff0c8')});
  pool(g,240,0,300,160,'#fff4d0',.14,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050');
  /* light: the sun from the upper left over the court, on the house of Eirene, the linen on the wall and the paving; a warm bounce off the
     paving onto the basin and the benches; under the shed and under the fig tree it stays in shade, and the near paving darkens a little */
  lightmap(g,480,'#e4dcd8',l=>{pool(l,240,46,320,96,'#ffffff',.72);pool(l,60,60,90,70,'#ffffff',.4);pool(l,290,118,230,26,'#fff4e0',.45);pool(l,296,98,50,10,'#fff0d8',.3);
    pool(l,284,52,40,24,'#fffaf0',.3);
    comp(l,'multiply',1,()=>{ao(l,0,128,480,16,'b',.3,'#4a4468');shade(l,[121,47,247,47,247,104,121,104],'#ece4ee',.6);shade(l,[340,40,420,30,440,104,334,104],'#ece6f0',.4)})})},
 fore(g){const r=rng(720);/* a jar, a sheaf of flax, and a sack of it */
  vessel(g,40,152,12,28,'#6a3420','jar',{noShadow:1});sack(g,500,152,13,18,'#c8bc98');
  for(let i=0;i<60;i++){const sx=96+r()*36;stroke(g,[sx,152,sx+(r()-.5)*10,132+r()*8],r()<.5?'#d8c88a':'#b8a868',1)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g){/* the congregation of Tarsus, when it has been called together: under the fig tree, and along the wall */
  if(F.read||G.gath)for(const[id,x,y,d]of FLOCK)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- The Cilician Gates: where the gorge widens, below its narrowest place ---------- */
/* TENT: the ground the merchant's tent stands on. LINE: where a man stands to hold its windward line. RIV: the bed of the stream. */
const TENT=[262,326],LINE=[338,117],RIV=[374,99,388,99,424,107,480,118,480,144,452,144,416,120,388,106];
const holding=()=>!!F.line&&SI.room==='gates'&&Math.abs(SI.x-LINE[0])<4;
/* the tent, in each of its three states: down, with a torn flap lifting in the wind; mended and laid out; up */
function tentArt(g,t){const[x0,x1]=TENT,xm=(x0+x1)/2;
  if(!F.mended){const f=Math.sin(t/160)*2.4+Math.sin(t/61);oval(g,xm,112.4,36,2.4,'rgba(20,16,40,.35)');
    poly(g,[x0,112,x0+8,104,x0+26,101,x0+44,105,x1-6,103,x1,112],'#2e2620');poly(g,[x0+8,104,x0+26,101,x0+44,105,x0+30,106.6,x0+14,106],'#473c33');
    poly(g,[x0+38,105,x0+57,96+f,x0+63,104.4],'#3a3029');poly(g,[x0+38,105,x0+57,96+f,x0+52,102],'#51453b');
    for(const fx of[12,24,50])stroke(g,[x0+fx,104,x0+fx+2,111.4],'rgba(0,0,0,.35)',.6);stroke(g,[x0+16,111.6,x0+29,91],'#7a5c36',1.4);stroke(g,[x0+16.6,111.6,x0+29.6,91],'#a8845a',.5)}
  else if(!F.up){oval(g,xm,112.6,36,2.2,'rgba(20,16,40,.35)');poly(g,[x0+2,112,x0+6,105.6,x1-8,105,x1-2,112],'#2e2620');poly(g,[x0+6,105.6,x1-8,105,x1-13,107.4,x0+12,108],'#473c33');
    for(const fx of[14,30,46])stroke(g,[x0+fx,107.6,x0+fx+1,111.6],'rgba(0,0,0,.3)',.6);stroke(g,[x0+2,114,x1-6,113.4],'#7a5c36',1.4);stroke(g,[x0+2,113.6,x1-6,113],'#a8845a',.5);
    if(holding())stroke(g,[x1-5,106,SI.x-7,SI.y-20],'#b8a880',.7)}
  else{const p=[x0-4,112,x0+9,93,x0+23,86,x0+39,89.6,x0+50,84.6,x1-7,92.6,x1+5,112];oval(g,xm,112.6,42,2.6,'rgba(10,8,30,.45)');
    stroke(g,[x0+9,93,x0-13,111.4],'#b8a880',.6);stroke(g,[x1-7,92.6,x1+15,111.4],'#b8a880',.6);R(g,x0-14.4,110,1.4,2.4,'#5a4226');R(g,x1+14.4,110,1.4,2.4,'#5a4226');
    poly(g,p);g.fillStyle=lg(g,0,84,0,112,['#3a3029','#2a221d','#17120f']);g.fill();
    clipTo(g,()=>poly(g,p),()=>{for(let i=0;i<8;i++)R(g,x0+2+i*8.6,84,.6,28,'rgba(255,236,200,.07)');stroke(g,[x0+23,86,x0+21,112],'rgba(0,0,0,.3)',.6);stroke(g,[x0+50,84.6,x0+53,112],'rgba(0,0,0,.3)',.6)});
    poly(g,[x0+27,112,x0+31,98,x0+41,98,x0+45,112],'#c8873a');poly(g,[x0+29,112,x0+32.4,100,x0+39.6,100,x0+43,112],'#f8cf80');pool(g,x0+36,106,13+Math.sin(t/210),9,'#ffb050',.22)}}
ART.gates={w:480,fp:1.25,q:12,
 variant:()=>F.up?'n':'d',
 /* by night the merchant's lamp in the tent; by day the storm's light, soft and from nowhere in particular, so the contact shadow alone */
 light:()=>F.up?{amb:'#8890b4',wallY:100,lamps:[[298,106,46,'#6a4a1c',112,104]]}:{amb:'#c8c4d8',wallY:100},
 paint(g,v){const r=rng(733),LS='#a8a29a',GR='#a29c8e',night=v==='n',DK='#1c1830';
  /* the sky: what the walls leave of it, and that full of cloud */
  sky(g,480,72,night?['#1a2036','#2a3250','#454c68']:['#343c5c','#565e7c','#8e8a9a','#c8b69a']);
  for(const[cx,cy,w]of[[362,5,60],[384,20,44],[330,3,50],[430,9,56]])cloud(g,cx,cy,w,7,r,night?'#56607c':'#a6a2b0',night?'#1a1e34':'#363a56');
  /* far up the gap: the next turn of the gorge, blue with distance, and darker toward its foot */
  /* FIS: the fissures cut across the faces below; the bedding lines of every face stop short of them, so that no fissure crosses a bed */
  const FIS=[[86,2,92,28],[258,8,251,40],[322,58,327,84],[160,48,154,78],[430,4,425,34]];
  {const P=[334,44,346,33,362,27,380,32,402,44,404,100,334,100],c=mix(LS,night?'#3a4468':'#5c6890',.62);crag(SCRAP7,P,c,r,{dip:.02});CO.crag(g,P,c,7301,{dip:.02,bed:6,light:1,haze:night?'#3a4468':'#8a94b8',hazeA:.25})}ao(g,334,30,70,70,'b',.42,DK);
  /* the Gates themselves: two walls of limestone, and between them room for a stream and a road */
  const LW=[0,0,340,0,351,16,343,44,355,70,348,100,0,100],RW=[394,0,480,0,480,100,388,100,380,74,390,46,383,20];
  crag(SCRAP7,LW,LS,r,{dip:.03,shade:'l',gaps:FIS});crag(SCRAP7,RW,tint(LS,.05),r,{dip:-.05,shade:'r',gaps:FIS});
  CO.crag(g,LW,LS,7302,{dip:.03,bed:8,light:1,shade:'l',gaps:FIS,scrub:4,green:night?'#2c4038':'#4e6444'});CO.crag(g,RW,tint(LS,.05),7303,{dip:-.05,bed:8,light:-1,shade:'r',gaps:FIS,scrub:3,green:night?'#2c4038':'#4e6444'});
  /* the left wall is not one face: a buttress stands out of it, a cleft runs up behind the buttress, and ledges catch what light there is */
  {const P=[112,0,214,0,228,26,219,58,231,86,104,86,116,56,102,28];crag(SCRAP7,P,tint(LS,.09),r,{dip:.05,gaps:FIS});CO.crag(g,P,tint(LS,.09),7304,{dip:.05,bed:7,light:1,gaps:FIS,scrub:2,green:night?'#2c4038':'#4e6444'})}
  /* the shade gathers where the buttress stands out of the wall, and in the cleft behind it */
  ao(g,231,0,14,86,'l',.3,DK);ao(g,90,0,14,86,'r',.2,DK);
  shade(g,[214,0,250,0,262,36,248,86,231,86,219,58,228,26],SH,.62);shade(g,[0,0,112,0,102,28,116,56,104,86,0,86],SH,.46);shade(g,[250,0,340,0,351,16,343,44,355,70,348,86,248,86,262,36],SH,.24);
  /* fissures and ledges: the fissures short and slanting, and each ledge clear of every fissure, so that no upright line stands across a level one */
  for(const[a,b,c,d]of FIS){stroke(g,[a,b,(a+c)/2+1.4,(b+d)/2,c,d],rgba(DK,.4),.9);stroke(g,[a+.7,b,(a+c)/2+2.1,(b+d)/2,c+.7,d],'rgba(246,238,220,.16)',.5)}
  for(const[x,y,w]of[[14,42,36],[120,30,30],[178,64,34],[270,50,36],[446,60,28]]){poly(g,[x,y,x+w,y-1.4,x+w-3,y+2.2,x+4,y+3],rgba(DK,.36));stroke(g,[x,y,x+w,y-1.4],'rgba(246,238,220,.4)',.6)}
  stroke(g,[340,0,351,16,343,44,355,70,348,100],'rgba(246,238,220,.4)',.8);stroke(g,[394,0,383,20,390,46,380,74,388,100],rgba(DK,.4),.8);
  /* the road: a ledge cut into the foot of the left wall, the marks of the picks still on the rock above it, and climbing on into the gap.
     Each pick mark slants as the blow fell and stops short of the ledge's lit edge, so that none stands on it as an upside-down T */
  clipTo(g,()=>poly(g,[0,84,170,86,280,89,348,92,348,100,0,100]),()=>{R(g,0,82,350,18,tint(LS,-.3));for(let x=3;x<348;x+=2.4+r()*3)stroke(g,[x,85+x*.02,x+3.6,93.6+x/348],rgba(DK,.36),.5);tex(g,'mott',.36,0,82,350,18,'overlay',1);
    ao(g,0,84,350,5,'t',.35,DK)});
  poly(g,[0,95.4,348,96.4,374,100,0,100],'#c9bea6');stroke(g,[0,95.4,348,96.4],'rgba(250,244,226,.5)',.5);
  poly(g,[348,100,374,100,369,78,361,78],'#b8ad98');stroke(g,[348,100,361,78],rgba(DK,.5),.7);stroke(g,[374,100,369,78],'rgba(255,246,224,.3)',.5);
  for(const[x,y,h]of[[62,36,20],[166,24,18],[236,50,15],[296,30,17],[408,46,16],[468,28,16]])pine(g,x,y,h,night?'#2c4638':'#3c5a44');
  /* the floor of the gorge, and the wheel ruts across it */
  stoneGround(SCRAP7,0,100,480,144,GR,r,280);CO.ground(g,0,100,480,144,GR,7305,{n:200,tufts:18,tuftC:'#8a8a5a',light:1});poly(g,[0,100,374,100,378,104,348,108,0,109],'rgba(214,200,170,.4)');ao(g,0,100,480,6,'t',.35,'#2a2848');ao(g,0,100,480,2,'t',.25,DK);
  for(let i=0;i<2;i++)stroke(g,[0,102.6+i*4,140,103+i*4,280,102.6+i*3.4,360,100.6+i*2],'rgba(70,60,80,.34)',.8);
  /* the stream, coming down out of the gap along the foot of the right wall */
  poly(g,RIV);g.fillStyle=lg(g,0,98,0,144,['#dfeef2','#8fb8c4','#5a8ea6','#3f7290']);g.fill();
  clipTo(g,()=>poly(g,RIV),()=>{for(let i=0;i<130;i++){const k=r(),sy=100+k*44,sx=378+k*90+(r()-.5)*40;R(g,sx,sy,2+k*7,.5+k*.4,r()<.6?'rgba(236,248,250,.6)':'rgba(20,56,80,.35)')}});
  stroke(g,[374,99,388,106,416,120,452,144],'rgba(240,250,250,.6)',.8);
  for(const[x,y,w,h]of[[400,112,9,5],[432,128,12,7],[466,122,10,6],[382,103.4,6,3.4]]){CO.boulder(g,x,y,w,h,'#8e8a80',7306+x,{light:1});R(g,x-w*.55,y-.3,w*1.1,.5,'rgba(236,248,250,.5)')}
  CO.boulder(g,224,105,18,8,'#9c968a',7310,{light:1,moss:'#6a7a50'});CO.boulder(g,8,107,16,8,'#a39d90',7311,{light:1,moss:'#6a7a50'});
  /* the merchant's bales of goat-hair cloth, stacked clear of the wet ground */
  bale(g,346,112,34,7,'#2e2620');bale(g,350,105,30,6.4,'#3a3029');bale(g,348,98.6,24,6,'#2a221d');
  /* light. By day, under the storm: what light there is comes down the gap, so the far turn of the gorge and the stream below it are
     brightest, the faces that turn to the gap catch a little of it, and the floor of the gorge more than the walls; the walls' feet, the
     cleft behind the buttress and the near ground keep their shade. By night: the merchant's lamp in the tent lights the ground round it,
     the bales and the foot of the wall behind; the last of the sky lies on the far crag and the water */
  if(night)lightmap(g,480,'#565c84',l=>{pool(l,298,104,64,40,'#ffc070',.95);pool(l,298,112,110,26,'#ffb060',.4);pool(l,366,24,34,34,'#8a94c0',.4);
    pool(l,300,90,56,12,'#d8a060',.3);pool(l,356,104,26,10,'#e8a868',.3);pool(l,420,118,60,20,'#7a86b8',.28);
    comp(l,'multiply',1,()=>{ao(l,0,0,480,30,'t',.3,'#1a1830');ao(l,0,0,70,144,'l',.35,'#1a1830');ao(l,0,128,480,16,'b',.35,'#1a1830');ao(l,0,84,480,16,'b',.2,'#1a1830')})});
  else lightmap(g,480,'#a4a0b6',l=>{pool(l,366,26,60,60,'#f4e6c6',.8);pool(l,280,120,260,50,'#e8dcc8',.3);
    pool(l,368,70,46,40,'#e8e0d4',.4);pool(l,420,118,70,22,'#eef0f2',.32);pool(l,330,40,40,50,'#e4dcd0',.22);pool(l,404,50,30,60,'#e4dcd0',.18);
    comp(l,'multiply',1,()=>{ao(l,0,0,480,24,'t',.25,'#3a3858');ao(l,0,0,90,144,'l',.3,'#3a3858');ao(l,0,130,480,14,'b',.3,'#3a3858');ao(l,0,84,348,16,'b',.18,'#3a3858');shade(l,[214,0,250,0,262,36,248,86,231,86,219,58,228,26],'#d8d4e4',.5)})})},
 fore(g){const r=rng(734);CO.boulder(g,30,152,44,22,'#6a665e',7320,{light:1});CO.boulder(g,488,154,50,24,'#5e5a54',7321,{light:1});
  /* grass bent by the wind, every blade the same way */
  for(let i=0;i<24;i++){const sx=80+r()*60;stroke(SCRAP7,[sx,150,sx+3+r()*6,137-r()*7],r()<.5?'#6a6a48':'#4a5038',.8)}
  for(let i=0;i<30;i++){const q=rng(7322+i),sx=80+q()*60,h=9+q()*8,l=3+q()*3;stroke(g,[sx,150,sx+l*.5,150-h*.6,sx+l,150-h],q()<.5?'#6a6a48':'#4a5038',.8)}
  comp(g,'source-atop',.5,()=>R(g,0,0,610,150,'#2a2850'))},
 draw(g,t){const lit=lightAt('gates',70,112);
  /* the far ox, the carter's wagon and its pole, the near ox, and the yoke that lies across both their necks: they face the cleft, and the wind.
     As at Derbe the pair is seen a little from the front, the far ox a little ahead and higher, its head clear above and beside the near one's
     and its tail behind the near ox's flank, where its dark switch cannot show under the near ox's belly.
     The yoke rests on the crest of the near ox's neck just behind its horns, ending short of the horn; the near head hides the rest of it
     and its far end, which a horn would otherwise cross. The wagon stands close behind the near ox and its pole is a stub that ends short
     of the tail, which hangs to the hock: a pole that ran on behind the tail would cross it. */
  cattle(g,125,105.5,1,0,'#6f4630',lit,113);depth(113,()=>wagon(g,18,112,-1,1,1));cattle(g,111,113,1,SHARED.beasts.pose('oxen7',0),'#8a5a3a',lit,113);
  depth(113,()=>{R(g,122,75.4,5,2.5,'#5a3e22');R(g,122,75.4,5,.5,'#a8845a')});
  tentArt(g,t)},
 /* the weather: before the tent is up, the wind, and what it carries; after it, the rain */
 front(g,t){if(!F.up){for(let i=0;i<14;i++){const k=((t/900+i*.0714)%1),x=500-k*540,y=18+((i*37)%96)+Math.sin(k*9+i)*3;R(g,x,y,5+(i%3)*2,.5,`rgba(226,220,206,${.34*(1-Math.abs(k-.5)*2)})`)}return}
  g.strokeStyle='rgba(206,216,240,.42)';g.lineWidth=.5;g.beginPath();for(let i=0;i<90;i++){const x=((i*61+t*.16)%520)-20,y=((i*37+t*.42)%150)-6;g.moveTo(x,y);g.lineTo(x-2.2,y+7)}g.stroke()}};
/* ---------- Lystra: the house of Lois and Eunice, by day, in winter ---------- */
/* wellJar: a small jar such as is carried to the well. It is drawn with straight edges and a flat rim: turned like the larger vessels, its
   rim would be an ellipse one pixel high, which rasterizes as a plus sign. */
function wellJar(g,x,y,c){R(g,x-3,y-.4,8,1,'rgba(30,20,40,.3)');poly(g,[x-1.6,y-10,x+1.6,y-10,x+1.8,y-8.4,x+3.6,y-5.6,x+3,y-1,x+1.6,y,x-1.6,y,x-3,y-1,x-3.6,y-5.6,x-1.8,y-8.4]);
  g.fillStyle=lg(g,x-3.6,0,x+3.6,0,[tint(c,-.3),tint(c,.26),c,tint(c,-.5)]);g.fill();R(g,x-2,y-10.6,4,1,tint(c,-.5));R(g,x-2,y-10.6,4,.4,tint(c,.2))}
/* the low table of the house at Lystra. It stands out on the mat, so it is a prop as well: whoever walks behind it is hidden by it */
function lowTable(g){const rw=rng(4611);board7(g,170,112,40,3,'#96703e',rw);board7(g,170,115,2.6,8,'#5a4226',rw,1);board7(g,207.4,115,2.6,8,'#5a4226',rw,1);vessel(g,190,112,4.6,3.6,'#a8844e','bowl',{noShadow:1})}
ART.lystra7={w:320,q:12,
 props:[{y:123,shape:lowTable,foot:[171,119,37,4]}],
 /* the hearth's glow, and the winter day through the window on the lane: whoever stands in its fall casts a shadow away from it */
 light:()=>({amb:'#f0e8dc',wallY:103,wall:[[0,52,103,11],[52,68,103,45],[68,320,103,11]],lamps:[[92,96,38,'#4a2410',103,100],[60,36,200,'#a8a898',103,36]]}),
 paint(g){const r=rng(461),W='#d8c8a4';
  plaster(g,0,0,320,104,W,r,{patch:4,cracks:0,brick:'#a8875a',t:.36});skipCracks7(r,6);
  /* cracks cut by hand, high on the wall, where they run to no head; rb: a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(4613);for(const[x,y,n]of[[22,16,4],[112,18,3],[244,16,4],[300,20,3]])crack7(g,x,y,n,rb)}
  /* the ceiling at its edge, its joists running toward us, and the wall plate they rest on; the plaster darkens under the plate */
  const rw=rng(4617);joists7(g,8.5,36,rng(4618));burn7(rw,14,34,6,8);
  board7(g,0,8,320,2.4,'#6a4e2c',rw);ao(g,0,10.4,320,12,'t',.42,'#2a2030');ao(g,0,10.4,320,3,'t',.25,'#1a1420');
  /* a window on the lane */
  windowArt(g,52,28,16,16,W,{dark:'#c8dcec',bars:2,wood:'#6a4e2c'});
  /* a niche for the lamp, and under it a shelf of household jars */
  arch(g,142,44,16,20,tint(W,-.34));arch(g,143.6,45.6,12.8,18.4,'#4a3828');R(g,146,60.6,8,2.4,'#b8733c');R(g,146,60.6,8,.6,'#e0a064');R(g,152.6,59.6,2.2,1.4,'#b8733c');
  ao(g,172,64.4,58,4,'t',.3,'#1a1420');board7(g,172,62,58,2.4,'#7a5c36',rw);R(g,172,64.4,2,6,'#5a4226');R(g,228,64.4,2,6,'#5a4226');
  vessel(g,182,62,4,10,'#a05a34','jug');vessel(g,196,62,5,8,'#8a6a44','jar');vessel(g,210,62,3.6,9,'#b8733c','jug');vessel(g,222,62,4,6,'#7a5a3a','bowl');
  /* the hearth in the corner, built of field stone */
  ashlar(g,78,92,30,12,'#a89c88',r,{bw:7,bh:4,v:.14,t:.4});R(g,78,91,30,1.4,'#cfc4ac');R(g,82,94,22,8,'#1c1412');poly(g,[84,102,88,97,96,96,102,102],'#3a2a22');
  poly(g,[80,91,84,40,102,40,106,91],'rgba(30,20,20,.28)');
  /* a bench along the wall, with a blanket folded on it */
  R(g,6,92,62,12,'rgba(40,30,60,.24)');ao(g,6,90,62,4,'t',.3,'#1a1420');board7(g,6,86,62,4,'#8a6a40',rw);board7(g,6,90,3,14,'#5a4226',rw,1);board7(g,65,90,3,14,'#5a4226',rw,1);
  shadow7(g,7.5,104,4,1,.4);shadow7(g,66.5,104,4,1,.4);
  /* the blanket: its dye drawn a little toward earth colors */
  g.fillStyle=lg(g,0,81,0,86,['#9a5a4a','#7a4438','#4a2a24'].map(c=>earth7(c)));g.fillRect(14,81.4,24,4.6);for(let i=0;i<24;i+=3)R(g,14+i,81.4,.5,4.6,'rgba(0,0,0,.2)');
  /* the door to the lane */
  R(g,266,48,34,56,'#c4b48e');doorArt(g,269,51,28,53,'#6a4a2c',r,{left:1,bands:[]});ao(g,269,51,28,5,'t',.3,'#1a1420');
  /* the hidden treasure: beside the door, a child's height scratched into the plaster year by year. Each mark is a short level stroke on its
     own, with plaster between: none touches the door's frame or another mark, so that no two make a cross or a T */
  for(const y of[87,83,79.5,76.2,73.2,70.4]){R(g,302.6,y,3.6,.7,'#7a6648');R(g,302.6,y+.7,3.6,.4,'#ece2c6')}
  /* a great jar of water by the door, and the two that go to the well */
  vessel(g,250,106,7,20,'#9a5a36','pithos');wellJar(g,235,107,'#a8683c');wellJar(g,226,108,'#96582e');
  /* the floor: beaten earth, and a woven mat where the household eats. Its few stripes are soft and lie only at its ends, beyond the
     table's legs, so that no leg stands across a band */
  ao(g,0,95,320,9,'b',.22,'#2a2030');
  earth(g,0,103,320,144,'#b8a482',r,90);ao(g,0,103,320,6,'t',.4,'#3a3050');ao(g,0,103,320,2,'t',.22,'#1a1420');
  clipTo(g,()=>poly(g,[128,112,214,112,224,130,116,130]),()=>{R(g,116,112,110,18,earth7('#9a6a4a'));for(const[y,c]of[[113.4,'#b08a5c'],[125.6,earth7('#7a5040')],[127.8,'#b08a5c']])R(g,116,y,110,1.1,c);tex(g,'mott',.3,116,112,110,18,'overlay',1);ao(g,116,112,110,5,'t',.25)});
  /* a low table */
  R(g,168,122,44,3,'rgba(30,20,40,.26)');shadow7(g,171.3,123.2,3,.9,.4);shadow7(g,208.7,123.2,3,.9,.4);lowTable(g);
  /* light: the winter day through the window, its fall across the floor, and a little at the door; the hearth's glow on the floor before
     it, the bench beside it and the wall above; the mat and the table between them catch both. The ceiling and the near floor keep the
     room's own shade */
  lightmap(g,320,'#b4aca8',l=>{pool(l,60,36,30,26,'#f4f4ec',1);l.fillStyle=lg(l,0,44,0,140,['rgba(240,240,228,.5)','rgba(240,240,228,0)']);poly(l,[52,44,68,44,150,140,70,140]);l.fill();
      pool(l,283,80,40,60,'#f4f0e4',.6);pool(l,160,120,170,44,'#fff0d8',.45);pool(l,92,98,48,36,'#ff9a48',.55);
      pool(l,92,110,60,14,'#ffa860',.35);pool(l,40,90,34,12,'#ffb070',.22);pool(l,190,118,30,8,'#fff0d8',.25);
      comp(l,'multiply',1,()=>{ao(l,0,0,320,20,'t',.3,'#3a3048');ao(l,0,130,320,14,'b',.3,'#3a3048');ao(l,300,0,20,144,'r',.2,'#3a3048')})})},
 fore(g){/* the edge of a storage chest, nearest us */
  R(g,0,134,58,10,'#3a2c20');R(g,0,134,58,.8,'#7a6248');R(g,56,134,2,10,'#241a12');R(g,262,138,58,6,'#3a2c20');R(g,262,138,58,.8,'#7a6248')},
 draw(g,t){for(let i=0;i<3;i++)flame(g,88+i*5,100.6-(i%2),t+i*230,i===1);pool(g,93,97,15+Math.sin(t/160)*1.4,8,'#ff8a3a',.16);
  /* the other elder of Lystra, and two of the congregation, come in from the lanes */
  for(const[id,x,y,d]of GATHER)man(g,x,y,id,d,0,'#f0e8dc',G.hands&&id==='eld7'?1:0,7)},
 front(){}};
/* ---------- Iconium: the saddlers' street again, in winter ---------- */
const sultan7=x=>30+8*Math.sin(x/57+1)+4*Math.sin(x/21+2)+2*Math.sin(x/7);
ART.iconium7={w:480,fp:1.3,q:12,
 /* the low winter sun from the upper left: shadows fall long to the right and a little toward us, as the carrier's wall and the fountain throw theirs */
 light:{amb:'#ffffff',wallY:103,sun:[15,6,.4]},
 paint(g){const r=rng(431),W='#e6d8b4',ST='#d8ccae',rw=rng(433);
  /* the sky's blues drawn a little toward grey (earth7), so that they sit with the plaster and the stone */
  sky(g,480,72,['#4a7cbc','#7ea4d0','#b4c8dc','#e2e4dc'].map(c=>earth7(c,.14)));cloud(g,236,12,60,7,r);cloud(g,360,22,40,5,r);cloud(g,70,8,40,5,r);
  /* beyond the fountain: the plateau under its winter fields, and the mountains white almost to their feet */
  snowy(g,186,300,66,sultan7,['#8494bc','#a6b2cc','#c8ccd0'],22);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,68,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(186,34,114,34)});
  g.fillStyle=lg(g,0,64,0,104,['#b8b48a','#a8a876','#98a068']);g.fillRect(186,64,114,40);tex(g,'mott',.36,186,64,114,40,'overlay',1);
  for(let i=0;i<7;i++){const fx=188+i*15+r()*6,fy=67+r()*8;poly(g,[fx,fy,fx+20,fy-1,fx+26,fy+7,fx+3,fy+8],i%3===0?'rgba(150,120,84,.4)':i%3===1?'rgba(96,130,76,.3)':'rgba(190,170,110,.3)')}
  for(const[x,y]of[[200,80],[228,75],[260,79],[286,84],[244,84]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#7a8a5e',r,20)}
  /* the street that runs back to the synagogue of the Jews. A house front stands across its far end, its roof at the level the paving runs to */
  R(g,0,40,60,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,28,60,76);g.clip();sky(g,480,80,['#7ea4d0','#e2e4dc']);
  R(g,24,64,10,40,'#d6d0c2');R(g,24,62,10,2.4,'#b8603c');R(g,24,72.4,10,1.6,'rgba(60,50,90,.2)');
  for(const[hx,hy,hw,hh,c]of[[0,42,18,62,'#d6caa8'],[42,48,18,56,'#e2d6b4'],[16,56,10,48,'#c8bc9c'],[32,60,9,44,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[18,104,42,104,33,74,27,74],'#e0d6ba');ao(g,0,28,60,12,'t',.2,'#2a2440');g.restore();
  /* Nathan's saddlery: a plastered house, its whole front open to the street under an awning */
  house(g,60,24,126,80,W,r,{side:0,patch:3,cracks:0,beams:0,t:.36});skipCracks7(r,5);
  /* cracks cut by hand, high on the wall, where they run to no head; rb: a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(4311);for(const[x,y,n]of[[66,30,3],[124,29,4],[178,48,3]])crack7(g,x,y,n,rb)}/* the two upper windows sit high under the eaves, their sills clear above the awning; the ends of the roof beams run along the
     wall between them, as house() would set them, and none where a window is */
  for(let i=66;i<182;i+=12)if(i!==78&&i!==162){R(g,i,28,2.5,2.5,'#6a4a2c');R(g,i,28,2.5,.5,'#a67c4a');poly(g,[i+.5,30.5,i+3,30.5,i+4.5,34,i+2,34],'rgba(50,40,90,.28)')}
  windowArt(g,72,28,10,9,W,{bars:2,wood:'#6a4e2c'});windowArt(g,162,28,10,9,W,{bars:2,wood:'#6a4e2c'});
  R(g,84,56,84,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c211a','#4a382a']);g.fillRect(86,58,80,46);
  /* inside: a shelf of pack saddles, and hides rolled on the floor */
  board7(g,88,70,76,1.6,'#5a4226',rw);for(const[sx,c]of[[94,'#8a5a34'],[110,'#a06a3c'],[126,'#7a4c2c'],[144,'#96643a']]){g.fillStyle=lg(g,sx,0,sx+11,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+5.5,70,5.6,4.6,0,Math.PI,0);g.fill();R(g,sx+1,66.4,9,.6,tint(c,.4))}
  for(const[sx,c]of[[96,'#9a6a40'],[108,'#7a5030'],[152,'#8a5c36']]){g.fillStyle=lg(g,0,96,0,104,[tint(c,.25),c,tint(c,-.45)]);g.fillRect(sx,97,10,7);oval(g,sx,100.5,1.6,3.5,tint(c,.15));oval(g,sx+10,100.5,1.6,3.5,tint(c,-.3))}
  /* harness on a bar across the opening: collars, girths and bridles, hanging */
  board7(g,84,58,84,1.8,'#7a5c36',rw);for(const[sx,ln,c]of[[92,16,'#6a4424'],[99,22,'#8a5a30'],[118,13,'#5a3a20'],[137,20,'#7a4c28'],[158,15,'#6a4424']]){R(g,sx,59.8,1.2,ln,c);R(g,sx,59.8,.5,ln,tint(c,.3));R(g,sx-1.2,59.8+ln,3.6,3.2,c);R(g,sx,59.8+ln+1,1.2,1.2,'#231a15')}
  for(const sx of[108,147]){g.strokeStyle='#5a3a20';g.lineWidth=2.4;g.beginPath();g.ellipse(sx,67.6,3.8,6,0,0,6.2832);g.stroke();g.strokeStyle='#a8743e';g.lineWidth=.7;g.beginPath();g.ellipse(sx-.4,67.4,3.8,6,0,2.6,5);g.stroke()}
  ao(g,84,56,84,10,'t',.6);ao(g,84,56,7,48,'l',.45);
  board7(g,82,48,2.4,57,'#6a4e2c',rw,1);board7(g,168,48,2.4,57,'#6a4e2c',rw,1);shadow7(g,83.2,105,3.4,1,.36);shadow7(g,169.2,105,3.4,1,.36);
  /* the awning: its blue drawn toward earth colors (earth7), and the shade it throws on the wall under it */
  awning(g,80,41,92,9,earth7('#3f5a7a',.28),'#e6dcc4',8);ao(g,84,50,84,6,'t',.3,'#1a1420');shade(g,[80,104,172,104,180,111,88,111],SH,.5);
  /* the saddler's bench, out in the light, and a half-made pack saddle on it */
  R(g,104,97,50,9,'rgba(40,30,60,.3)');ao(g,104,94.6,50,4,'t',.3,'#1a1420');board7(g,102,95,3,11,'#6a4e2c',rw,1);board7(g,151,95,3,11,'#6a4e2c',rw,1);board7(g,102,90,52,4.6,'#96703e',rw);
  shadow7(g,103.5,106,4,1,.4);shadow7(g,152.5,106,4,1,.4);R(g,102,94.2,52,1.2,'#5a4226');
  g.fillStyle=lg(g,116,0,134,0,['#b47a44','#8a5a30','#5a3a1e']);g.beginPath();g.ellipse(125,90,9,7,0,Math.PI,0);g.fill();R(g,118,84.6,13,.7,'#d09a5e');
  /* a low wall along the water, and the poplars that drink from it, bare now */
  ashlar(g,186,92,114,12,'#cdbf9c',r,{bw:9,bh:4,v:.1,t:.3});R(g,186,91,114,1.4,'#eadcb6');
  poplar(g,196,92,50,0,r,1);poplar(g,205,92,40,0,r,1);poplar(g,290,92,54,0,r,1);poplar(g,281,92,38,0,r,1);
  /* the fountain: a spout in a stone pier, and a round basin worn by two hundred years of jars */
  shade(g,[222,106,270,106,280,112,232,112],SH,.5);g.fillStyle=lg(g,238,0,250,0,['#b8ae98','#eee6d0','#a8a090']);g.fillRect(238,66,12,32);R(g,236.6,64,14.8,2.6,'#f2ead6');R(g,236.6,66.4,14.8,.6,'#a8a094');
  R(g,241,80,6,3,'#7a7466');R(g,243,80.6,2,2,'#2e2a26');
  g.fillStyle=lg(g,220,0,268,0,['#b0a690','#ece4cc','#d2c8b0','#928a78']);g.fillRect(220,95,48,11);oval(g,244,106,24,3,'#928a78');oval(g,244,95,24,3.6,'#f2ead6');oval(g,244,95.3,21.6,2.8,'#4f8cb4');oval(g,238,94.8,9,1.1,'#86bcd8');
  /* the yard of Xanthos the carrier: a wall of dressed stone, and a gateway wide enough for a loaded wagon */
  ashlar(g,300,34,138,70,ST,r,{bw:13,bh:6.4,v:.08,t:.3});for(let i=300;i<438;i+=9){R(g,i,30,5.6,4,ST);R(g,i,30,5.6,.5,'#f4e8c8')}R(g,300,33.6,138,1,'#a8987a');
  R(g,372,50,58,54,'#b8ac90');R(g,375,53,52,51,'#2a2018');g.fillStyle=lg(g,0,53,0,104,['#3a2e24','#6a5a44']);g.fillRect(377,55,48,49);
  for(const[sx,sy,sw,sh,c]of[[384,104,5,9,'#b8a880'],[394,104,5.6,11,'#c8b890'],[414,104,4.6,8,'#a89870']])sack(g,sx,sy,sw,sh,c);vessel(g,404,104,4,12,'#8a4a2a','amph',{noShadow:1});
  board7(g,372,50,58,3.4,'#6a4e2c',rw);R(g,372,53.2,58,.8,'#2a1c10');ao(g,377,55,48,12,'t',.6);ao(g,377,55,7,49,'l',.45);
  windowArt(g,318,46,9,9,ST,{bars:2});for(const x of[312,340]){R(g,x-1.6,94.4,3.2,3.2,'#4a443c');R(g,x-.6,95.4,1.2,1.2,ST)}
  /* the south gate, and the road from Lycaonia */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48,{...GATE7,hz:66,sky:[72,['#4a7cbc','#7ea4d0','#b4c8dc','#e2e4dc']],land:'#a8a876',near:['#98a070','#aaae80']});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* paving */
  /* the foot of every wall, and the corners where the walls meet, lie in a little shade */
  ao(g,0,95,186,9,'b',.2,'#2a2030');ao(g,300,95,180,9,'b',.2,'#2a2030');ao(g,424,22,9,82,'r',.24,'#2a2030');ao(g,300,34,8,70,'l',.18,'#2a2030');
  pave(g,0,103,480,144,'#d8ceb4',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,0,103,480,5,'t',.3,'#4a4460');ao(g,0,103,480,2,'t',.22,'#1a1420');
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(244,240,226,0)','rgba(244,240,226,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[300,104,438,104,452,112,314,112],SH,.5);shade(g,[0,104,60,104,60,108,0,112],SH,.55);shade(g,[186,104,222,104,228,108,192,108],SH,.4);
  pool(g,240,0,300,160,'#f4f0e0',.12,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050');
  /* light: the low winter sun from the upper left on the saddlery's front, the fountain and the carrier's wall, brightest on the open
     paving before the fountain; a cool bounce off the paving into the foot of the walls; inside the shop, in the carrier's gateway and on
     the near paving it stays in shade */
  lightmap(g,480,'#e2dcdc',l=>{pool(l,240,50,310,96,'#ffffff',.72);pool(l,244,118,200,26,'#fff4e4',.45);pool(l,128,96,50,12,'#fff0dc',.3);pool(l,244,92,34,10,'#fff4e4',.3);
    pool(l,370,60,80,40,'#ffffff',.3);
    comp(l,'multiply',1,()=>{ao(l,0,130,480,14,'b',.3,'#4a4468');shade(l,[86,58,166,58,166,104,86,104],'#e4dcec',.5);shade(l,[377,55,425,55,425,104,377,104],'#e4dcec',.45)})})},
 fore(g){const r=rng(432);/* a wine jar and a heap of pack saddles at the street's edge */
  vessel(g,34,152,11,30,'#5a2e1e','amph',{noShadow:1});
  for(const[sx,c]of[[470,'#6a4428'],[494,'#7a5030']]){g.fillStyle=lg(g,sx,0,sx+26,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+13,150,14,13,0,Math.PI,0);g.fill()}
  sack(g,80,152,12,17,'#a8a090');for(let i=0;i<16;i++){const sx=540+r()*60;stroke(g,[sx,150,sx+(r()-.5)*5,138-r()*6],'#6a6a4a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* water from the spout, and rings on the basin */
  const f=t/90;R(g,243.2,83,1.6,11,'#a8d8ec');for(let i=0;i<3;i++)R(g,243.2,83+((f+i*3.4)%10),1.6,1.2,'#f0fafe');
  for(let i=0;i<3;i++){const k=((t/460+i*.33)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(244,95.2,3+k*10.4,.7+k*1.2,0,0,6.2832);g.stroke()}
  /* the carrier's wagon, under the cover a tentmaker sewed for it two winters ago */
  wagon(g,310,110,1,0,1.6)},
 front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  /* Silas, a leading man among the brothers in Jerusalem, and a prophet */
  silas:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  /* seen only as the chapter opens: Barnabas and John Mark; Peter and James, thirteen years after Chapter Two; Judas called Barsabbas; the men from Judea */
  barnabas7:{skin:'#b8844f',hair:'#685a4c',beard:'#685a4c',grey:'#9a9086',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  mark7:{skin:'#c08c5c',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#8aa08a',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',slim:1,ph:900},
  peter7:{skin:'#b07848',hair:'#968e84',beard:'#a69e94',thin:1,tunic:'#3f6a8a',cloak:'#8a7a5a',belt:'#3a2414',long:1,brow:'#6a6258',ph:1300},
  james7:{skin:'#bd8a5a',hair:'#46382e',beard:'#52443a',grey:'#7a7068',longBeard:1,tunic:'#e0d6bc',cloak:'#6a5a7a',belt:'#4a3a24',long:1,ph:2900},
  judas7:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#4a3a2a',brow:'#2a1a12',tunic:'#8a6a4a',cloak:'#5a6a4a',long:1,belt:'#3a2414',ph:0},
  jud1:{skin:'#b47e52',wrap:'#3a3a5a',beard:'#2a1a12',longBeard:1,brow:'#1a1210',tunic:'#e2dcc8',cloak:'#3a4a6a',long:1,belt:'#8a6a2a',trim:'#3a4a6a',ph:0},
  jud2:{skin:'#c08c5c',wrap:'#e2dcc8',beard:'#5a4a3a',brow:'#3a2a1a',tunic:'#6a5a70',cloak:'#d8cdb0',long:1,belt:'#4a3a24',ph:0},
  /* the apostles and the elders in Jerusalem, and the brothers of Antioch */
  ap1:{skin:'#b47e52',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#a89068',cloak:'#5a6a7a',long:1,belt:'#4a3a24',ph:0},ap2:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#6a5a4a',longBeard:1,brow:'#3a2a1a',tunic:'#8a7a5a',cloak:'#c8b890',long:1,belt:'#3a2414',ph:0},
  ap3:{skin:'#c08c5c',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#7a5a3e',cloak:'#d8c8a0',long:1,belt:'#2e2016',ph:0},ap4:{skin:'#b8844f',hair:'#5a4a3a',beard:'#6a5a4a',tunic:'#5f7a6a',cloak:'#8a6a4a',long:1,belt:'#4a3a24',ph:0},
  ap5:{skin:'#c69870',wrap:'#8a5a3a',beard:'#2a1a12',brow:'#1a1210',tunic:'#d8c9a0',cloak:'#6a3a4a',long:1,belt:'#8a6a2a',ph:0},
  br1:{skin:'#c69870',hair:'#6a5030',beard:'#6a5030',brow:'#4a3420',tunic:'#d8c890',belt:'#5a3a20',ph:0},br2:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',brow:'#120c0a',ph:0},
  br3:{skin:'#c89a70',veil:'#a8603a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},br4:{skin:'#c08c5c',hair:'#3a2a1a',tunic:'#8a9a7a',belt:'#4a3a24',slim:1,ph:0},
  /* Tarsus: an older brother of Israel, a brother of the nations, and the sister in whose courtyard the congregation meets */
  reuben:{skin:'#b47e52',wrap:'#d8d0b8',beard:'#9a9a9a',longBeard:1,brow:'#6a6a6a',tunic:'#6a4a5a',cloak:'#c8b890',long:1,belt:'#4a3a24',trim:'#8a6a7a',ph:1100},
  agathon:{skin:'#c69870',hair:'#5a4026',beard:'#5a4026',brow:'#3a2a1a',tunic:'#9ab0c0',belt:'#4a3a24',trim:'#5a7a8a',ph:1900},
  eirene:{skin:'#c89a70',veil:'#b85a3a',tunic:'#e6dcc0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#b85a3a',brow:'#3a2414',ph:2700},
  tc1:{skin:'#b47a4a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#b08a4a',belt:'#3a2414',ph:0},tc2:{skin:'#c89a70',veil:'#5a7a8a',tunic:'#e2d8c0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},
  tc3:{skin:'#c08c5c',wrap:'#c8b48a',beard:'#5a4a3a',brow:'#3a2a1a',tunic:'#7a8a9a',cloak:'#d8cdb0',long:1,belt:'#4a3a24',ph:0},tc4:{skin:'#a8703f',hair:'#3a2a1a',tunic:'#c8b888',belt:'#4a3a24',slim:1,ph:0},
  tc5:{skin:'#c49268',veil:'#c8a25a',tunic:'#8a6a7a',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},tc6:{skin:'#b8844f',hair:'#8a8a8a',beard:'#9a9a9a',brow:'#6a6a6a',tunic:'#9a6a4a',cloak:'#5a6a4a',long:1,belt:'#2e2016',ph:0},
  /* the Taurus road: the carter of Derbe from Chapter Six, and a merchant of Tarsus with his wife and daughter */
  zenon7:{skin:'#9a6238',hair:'#2a1a12',beard:'#2a1a12',tunic:'#6f7a5a',belt:'#2e2016',trim:'#4a5a3a',brow:'#1a1210',ph:1500},
  bion:{skin:'#b88458',wrap:'#7a8a4a',beard:'#2a1a12',brow:'#1a1210',tunic:'#c08a3a',cloak:'#4a5a6a',long:1,belt:'#3a2414',trim:'#7a5a1e',ph:2300},
  charis:{skin:'#c8a078',veil:'#6a5a8a',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#4a3a6a',brow:'#3a2414',ph:3300},
  melissa:{skin:'#d0a880',veil:'#d8a890',tunic:'#c8d0b0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,brow:'#3a2414',h:1,ph:600},
  /* Lystra: Timothy, a man's height now; his mother and his grandmother; Myron, one of the elders appointed in Chapter Six */
  timothy7:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  eunice7:{skin:'#c89a70',veil:'#7a8ab0',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#5a6a8a',brow:'#3a2414',ph:2500},
  lois7:{skin:'#b88a62',veil:'#e2dccb',tunic:'#6a5a70',long:1,belt:'#4a3a24',slim:1,longSleeve:1,trim:'#8a7a8a',brow:'#8a8a8a',ph:3100},
  myron:{skin:'#b47e52',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#a89068',cloak:'#5a6a7a',long:1,belt:'#4a3a24',ph:400},
  eld7:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#6a5a4a',brow:'#3a2a1a',tunic:'#8a7a5a',long:1,belt:'#3a2414',ph:0},
  ly1:{skin:'#c89a70',veil:'#a8603a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},ly2:{skin:'#c49268',veil:'#6a7a4a',tunic:'#7a6a8a',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},
  /* Iconium: the saddler and the carrier's wife, from Chapter Six */
  nathan7:{skin:'#b47e52',wrap:'#c8b48a',beard:'#3a2a1a',brow:'#2a1a12',tunic:'#8a5a34',belt:'#3a2414',trim:'#5a3a20',ph:1300},
  tatia7:{skin:'#d0a27a',veil:'#c8a25a',tunic:'#5f7a6a',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#c8b890',brow:'#3a2414',ph:700}});
/* FLOCK: the congregation of Tarsus, called together; GATHER: who else is in the house of Lois */
const FLOCK=[['tc1',342,108,-1],['tc2',358,110.4,-1],['tc3',374,107.6,-1],['tc6',392,111,-1],['tc4',406,108,-1],['tc5',422,110.6,-1],['tc2',198,110,1],['tc4',182,112.6,1]];
const GATHER=[['eld7',34,117,1],['ly1',20,131,1],['ly2',304,132,-1]];
/* People who came into Chapter Six keep their own actors there; here each has a second one, so that neither chapter disturbs the other. */
const SI=actor('silas','Silas','#9fd8c8',118),RE=actor('reuben','Reuben','#e8dca8',100),AG=actor('agathon','Agathon','#b8e0d0',136),EI=actor('eirene','Eirene','#f0c0a8',196),
  ZE=actor('zenon7','Zenon','#f0b088',110),BI=actor('bion','Bion','#f0d090',114),CH=actor('charis','Charis','#d8c8f0',202),ME=actor('melissa','Melissa','#f4d0d8',250),
  TI=actor('timothy7','Timothy','#b8e0b0',150),EN=actor('eunice7','Eunice','#a8d0f0',204),LO=actor('lois7','Lois','#e8d0d8',170),MY=actor('myron','Myron','#e0d8b0',98),
  NA=actor('nathan7','Nathan','#e8d890',116),TA=actor('tatia7','Tatia','#e0c8f0',200),PE=actor('peter7','Peter','#8ec8f0',108),JA=actor('james7','James','#d8c8f0',122);
Object.assign(ICON,{
  /* the letter: a sheet of papyrus between its two rolls, with a few lines of writing that stop short of its edge. Nothing is tied across it. */
  letter(g){g.fillStyle=lg(g,6,0,20,0,['#d8c898','#f4e8c0','#e8dab0','#b8a878']);g.fillRect(6.4,6,13.2,12);for(let j=8.6,k=0;j<16.4;j+=1.9,k++)R(g,8,j,7+(k*3)%3.6,.6,'#6a5a3a');
    for(const y of[4,16.8]){g.fillStyle=lg(g,0,y,0,y+3.2,['#f8eccc','#d8c898','#9a8858']);g.fillRect(5,y,14.4,3.2);R(g,4,y+.4,1.2,2.4,'#e8dab0');R(g,19.2,y+.4,1.2,2.4,'#a89868');R(g,5,y+2.8,14.4,.4,'#7a6a48')}},
  /* the same letter in its case: a sleeve of goat-hair cloth, dark with tallow, its flap folded over the mouth */
  lcase(g){g.save();g.translate(12,12.4);g.rotate(-.62);g.fillStyle=lg(g,0,-3.6,0,3.6,['#78685a','#4e4238','#2c241e']);g.fillRect(-9.4,-3.6,18.8,7.2);R(g,-9.4,-3.6,18.8,.8,'#c0b098');R(g,-10.4,-3,1.2,6,'#5c4e42');
    poly(g,[4.6,-3.6,9.4,-3.6,9.4,3.6,6.6,3.6],'#6a5c4e');stroke(g,[4.6,-3.6,6.6,3.6],'#aa9a84',.6);for(let i=-7.6;i<4;i+=2.6)R(g,i,-2.6,.5,5.6,'rgba(255,240,210,.26)');g.restore()},
  pcase(g){g.save();g.translate(12,12.4);g.rotate(-.62);g.fillStyle=lg(g,0,-3.6,0,3.6,['#867666','#5c5044','#382f28']);g.fillRect(-9.4,-3.6,18.8,7.2);R(g,-9.4,-3.6,18.8,.8,'#ccbca4');R(g,-10.4,-3,1.2,6,'#685a4c');
    poly(g,[4.6,-3.6,9.4,-3.6,9.4,3.6,6.6,3.6],'#746658');stroke(g,[4.6,-3.6,6.6,3.6],'#b8a890',.6);for(let i=-8;i<4;i+=1.6){R(g,i,-3,.6,.5,'#e2d6b4');R(g,i,2.5,.6,.5,'#e2d6b4')}g.restore()},
  /* a yoke strap, coiled */
  strap(g){for(const[q,c]of[[7.6,'#6a4424'],[5,'#8a5a30'],[2.5,'#6a4424']]){g.strokeStyle=tint(c,-.45);g.lineWidth=2.8;g.beginPath();g.ellipse(11,13.4,q,q*.74,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=1.8;g.stroke()}
    stroke(g,[18.4,12.4,20.6,8,20,4.6],'#3a2414',2.8);stroke(g,[18.4,12.4,20.6,8,20,4.6],'#8a5a30',1.8);R(g,19,3.4,2,1.8,'#c9a14a')},
  /* tallow, in the lid of the carter's grease pot */
  tallow(g){R(g,6,19,13,1.2,'rgba(0,0,0,.3)');g.fillStyle=lg(g,5,0,19,0,['#8a5a34','#b8804c','#7a4c28','#4a2c14']);g.beginPath();g.moveTo(5,12.4);g.lineTo(19,12.4);g.lineTo(16.4,19.4);g.lineTo(7.6,19.4);g.closePath();g.fill();
    R(g,5,11.6,14,1.4,'#5a3a1e');g.fillStyle=lg(g,7,7,17,13,['#fff8e0','#eadfb8','#c8b888']);g.beginPath();g.ellipse(12,11.8,5.4,4.4,0,Math.PI,0);g.fill();R(g,9.6,8.6,2.6,1,'#fffdf0')}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#462e16',3);stroke(g,[4.6,20.6,19,3.6],'#8c683c',2);stroke(g,[4.1,20.1,18.5,3.1],'#e2c288',.9);
  R(g,17.2,2.8,3,3,'#c49a5c');R(g,17.4,2.8,1.8,1.2,'#f2d8a2');R(g,3.3,19.7,2.4,2.4,'#9c968c');R(g,3.5,19.7,1.2,1,'#d4cec4')};
Object.assign(ITEMS,{
  sstaff:{name:'silass_staff',icon:'staff',look:'silass_walking_staff',
    by:{silas:'my_walking_staff_it_has'}},
  letter:{name:'letter_from_jerusalem',get icon(){return F.cased?'lcase':'letter'},
    get look(){return F.cased?'letter_of_the_apostles'
      :'the_letter_of_the_apostles'},
    by:{get silas(){return F.cased?'letter_safe_in_the_case':'letter_i_was_sent_out_with_and_our_copies'}}},
  strap:{name:'yoke_strap',look:'spare_yoke_strap_from_zenons',
    by:{silas:'strap_of_ox_hide'}},
  cloth7:{name:'goat_hair_cloth',icon:'cloth',look:'length_of_goat_hair_cloth',
    by:{silas:'black_goat_hair_cloth'}},
  pcase:{name:'letter_case',look:'sleeve_of_goat_hair_cloth',
    by:{silas:'case_for_the_letter'}},
  tallow:{name:'axle_tallow',look:'tallow_from_zenons_grease_pot',
    by:{silas:'lump_of_tallow'}}});
/* how Silas describes the tools of the trade (set again whenever this chapter begins: see setup7) */
const BY7={awl:'tentmakers_awl_i',thread:'waxed_linen_thread_and_strong',
  knife:'a_knife_for_cloth_and_leather',tablets:'his_wax_tablets_people'};
const inTar=()=>G.room==='tarsus7',inGates=()=>G.room==='gates',inLys=()=>G.room==='lystra7',inIco=()=>G.room==='iconium7',other=()=>PC()===P?SI:P,
  heard=()=>!!(F.eld&&F.fam&&F.nat&&F.tat);
/* toPaul: something handed to Paul, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function dropAll(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* bring: something Paul needs for his work, which Silas happens to be carrying, comes back to him */
async function bring(id){const his=invOf(SI),i=his.indexOf(id);if(PC()===P&&i>=0){his.splice(i,1);toPaul(id,1);await say(SI,'you_will_want_this_back_paul_said')}return invOf(P).includes(id)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line, how] sets. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1],x[2]||{}):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* think: Paul weighs what to say next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* ============ SCRIPTURE: the passages on the tablets ============ */
const PASS={
  deut19:{ref:'deuteronomy_19_15',gist:'no_one_is_to_be_found_guilty'},
  prov18:{ref:'proverbs_18_17',gist:'whoever_pleads_his_case'},
  ecc4:{ref:'ecclesiastes_4_9_10',gist:'two_do_better_than_one'},
  isa32:{ref:'isaiah_32_2',gist:'every_one_of_them_will'},
  sam16:{ref:'n1_samuel_16_7',gist:'god_does_not_look_at_things'},
  prov22:{ref:'proverbs_22_1',gist:'choose_a_good_name_before'},
  ps71:{ref:'psalm_71_17_18',gist:'since_i_was_young_o_god'}},
  ORDER=['deut19','prov18','ecc4','isa32','sam16','prov22','ps71'];
const quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ TARSUS: the letter, and the second witness ============ */
/* A man who was a party to a dispute cannot be the only witness to how it ended. Paul argues, every word of it true, and gets nowhere. */
async function argue(){
  if(F.read)return say(RE,'it_is_settled_paul_and_i');
  if(F.silas)return say(RE,'i_have_heard_your_second');
  let av=[
    {q:'i_was_in_the_room_reuben',r:'you_were_in_the_room_as_one'},
    {q:'read_it',r:'it_speaks_of_barnabas_and_paul'},
    {q:'peter_himself_spoke_as_i_do',r:'you_tell_me_said'}];
  await say(RE,'well_paul');
  for(;;){const i=await choose(av.map(o=>o.q).concat('i_will_not_argue_it_with_you'));
    if(i===av.length){await say(P,'i_will_not_argue_it_with_you');break}
    const o=av[i];await say(P,o.q);await say(RE,o.r);av=av.filter(x=>x!==o);G.tried=1;if(!av.length)break;await say(RE,'have_you_anything_more')}
  if(G.tried){await say(RE,quote('deut19'));await say(RE,'that_is_not_my_rule_paul');
    await say(P,'every_word_i_said_to_him',TH)}}
/* The men from Judea were heard first in Tarsus, and seemed right (Proverbs 18:17): Paul's look at the benches says so. */
/* Silas was no party to the dispute. He was sent, with Judas, to tell the same things in person (Acts 15:27). */
async function vouch(){
  if(F.read)return say(RE,'you_read_it_well_brother');
  if(F.silas)return say(RE,'i_have_heard_you_silas');
  await ask(SI,RE,'you_are_the_man_from_jerusalem',[
    {q:'paul_has_told_you_the_truth',r:['i_never_said_that_he_lied']},
    {q:'it_is_settled_brother',r:['settled_in_jerusalem_perhaps']},
    {q:'i_was_sent_from_jerusalem',ok:1,
      p:['i_am_not_here_as_pauls',
        'it_says_that_judas_acts_15_27','i_was_there_when_it_was_written'],
      r:['tell_me_this_the_men',[SI,'letter_answers_that_itself_acts_15_24'],
        'decision_was',[SI,'letter_says_that_we_decided'],
        'two_witnesses','i_will_hear_your_letter']}]);
  F.silas=1;SFX.good();
  await say(P,'he_did_not_raise_his_voice_once',TH)}
/* The letter is for the whole congregation, as it was in Antioch (Acts 15:30, 31): read to one man beside a loom, it would settle one man. */
async function readTarsus(){const me=PC();
  await say(me,me===P?'eirene_will_you_call_the_congregation_together':'sister_will_you_call_the_whole');
  await say(EI,'i_have_been_waiting_two');
  playAs(P);await fade(1,500);G.gath=1;
  place(SI,'tarsus7',268,124,1);place(P,'tarsus7',244,128,1);place(EI,'tarsus7',220,119,1);place(AG,'tarsus7',304,119,-1);place(RE,'tarsus7',328,124,-1);G.cam=108;
  await narr('in_antioch_everyone_had',{dur:8000});
  await fade(0,600);
  await say(P,'read_it_to_them_silas');
  await say(SI,'to_the_brothers_acts_15_23');
  await say(AG,'cilicia',{to:null});
  await say(SI,'we_hear_that_some_acts_15_24',{to:null});
  await say(SI,'it_seemed_right_acts_15_28_29',{to:null});
  await say(SI,'guard_yourselves_well_acts_15_29',{to:null});
  F.read=1;AU.mood='calm';SFX.good();
  await narr('when_that_letter_was_read',{dur:8000});
  await say(AG,'no_burden_beyond_the_necessary_things');
  await say(RE,'i_asked_for_a_second_witness');
  await say(P,'there_is_nothing_to_forgive_reuben');
  await narr('silas_spoke_on_until_acts_15_32',{dur:9500});
  codeBtn()}
/* letterTo: the letter, offered to one of the three by whoever carries it */
const letterTo=A=>async it=>{if(it!=='letter')return false;const me=PC();
  if(F.read)return say(A,A===EI?'it_has_been_read_in_my_courtyard':A===RE?'i_have_heard_it_and_i_have':'i_heard_my_own_country');
  if(A===EI)return F.silas?readTarsus():say(EI,'i_could_have_every_brother');
  if(A===AG)return say(AG,'for_me_to_read_by_myself');
  if(!F.silas)return say(RE,me===P?'i_can_read_paul':'i_can_read_brother');
  return say(me,me===P?'to_reuben_alone_here_beside_the_loom'
    :'to_him_alone',TH)};
async function leaveTar(){const me=PC();
  if(!F.read)return say(me,me===P?(F.silas?'reuben_is_ready_to_hear':'not_while_this_congregation')
    :'we_were_sent_to_strengthen');
  await say(me,me===P?'north_silas_over_the_taurus':'north_then_and_over_the_mountains');return travel()}
RE.hs={name:'Reuben',actor:RE,
  look:()=>say(P,F.read?'reuben_said':F.silas?'reuben_he'
    :'reuben_a_son_of_israel'),
  give:letterTo(RE),
  show:{tablets:'you_always_carried_those_i',awl:'tentmakers_awl_i_remember',
    knife:'put_it_away_paul_said',thread:'good_thread_a','*':'that_is_not_what_stands'},
  ask:{witness:()=>say(RE,'i_have_said_what_i_ask_paul')},
  talk:argue,
  as:{silas:{look:()=>say(SI,F.read?'reuben_he_asked':'older_brother_and_a_troubled_one'),
    give:letterTo(RE),talk:vouch,show:{sstaff:'staff_from_jerusalem','*':'keep_it_brother_it'}}}};
AG.hs={name:'Agathon',actor:AG,
  look:()=>say(P,F.read?'agathon_said':'agathon_a_brother_of_the_nations'),
  give:letterTo(AG),
  show:{tablets:'you_read_to_us_from_those_when_i',awl:'my_wife_still_has_the_awning','*':'not_now_paul'},
  ask:{witness:['reuben_is_not_a_hard_man_paul','he_says_that_he_will_believe']},
  talk:()=>F.read?say(AG,'i_can_look_my_sons_in_the_face'):talkTree([
    {q:'what_did_the_men_from_judea',a:async()=>{await say(AG,'that_unless_we_acts_15_1');await say(AG,'it_was_said_in_this_courtyard')}},
    {q:'what_does_reuben_say_to_it',a:()=>say(AG,'that_he_no_longer_knows')},
    {q:'you_will_have_your_answer_today_agathon',bye:1}]),
  as:{silas:{look:'brother_of_the_nations',give:letterTo(AG),
    talk:()=>say(AG,F.read?'i_heard_you_read_it_to_the_brothers':'you_are_from_jerusalem'),
    show:{'*':'not_now_brother'}}}};
EI.hs={name:'Eirene',actor:EI,
  look:()=>say(P,F.read?'eirene_said':'eirene_a_weaver_of_linen'),
  give:letterTo(EI),
  show:{tablets:'your_tablets_you',awl:'i_weave_it_and_you_pierce_it',thread:'linen_thread_and_waxed',
    knife:'not_near_my_loom_with_that_paul','*':'keep_it_by_you'},
  ask:{witness:['reuben_is_the_most_careful','your_friend_from_jerusalem']},
  talk:()=>F.read?say(EI,'they_are_still_talking'):talkTree([
    {q:'how_has_it_been_here_eirene',a:async()=>{await say(EI,'quiet_and_not_the_good_kind');
      await say(EI,'nobody_has_left')}},
    {q:'could_the_whole_congregation_be_called_together',a:()=>say(EI,F.silas?'today_reuben'
      :'i_could_send_my_boys_through')},
    {q:'peace_to_this_house',bye:1}]),
  as:{silas:{look:'eirene_she',give:letterTo(EI),
    talk:()=>say(EI,F.read?'you_read_as_one_who_was':F.silas?'reuben_is_ready':'peace_to_you_brother'),
    show:{sstaff:'lean_it_by_the_door_said','*':'keep_it_by_you_brother_said'}}}};
ROOMS.tarsus7={walk:[16,464,114,138],get mood(){return F.read?'calm':'tense'},amb:()=>F.read?{crowd:.5,birds:.4,leaves:.4}:{birds:.5,leaves:.4,crowd:.12},hs:[
  {name:'mountains',x:104,y:18,w:330,h:22,wx:260,look:'taurus_with_the_first_snow'},
  {name:'door_of_the_house',x:36,y:59,w:24,h:45,wx:50,wy:115,look:'eirenes_door',use:'congregation_meets_in_the_courtyard',open:'congregation_meets_in_the_courtyard'},
  {name:'loom',x:142,y:54,w:42,h:50,wx:164,wy:115,look:'linen_on_the_loom_as_fine',use:'weaving_is_not_sewing',pickup:'it_is_eirenes_living',
    /* once the letter has been read and the courtyard is at peace: a blade near a weaver's warp */
    useWith:it=>(it==='knife'||it==='awl')&&F.read?say(P,'near_eirenes_loom_with_that_i'):false},
  {name:'bolts_of_linen',x:196,y:54,w:46,h:50,wx:220,wy:115,look:'bolts_of_linen_bleached_and_folded',pickup:'they_are_hers_and_i_dare'},
  {name:'linen_on_the_wall',x:272,y:36,w:42,h:32,wx:292,wy:115,look:'linen_bleaching_on_the_wall',pickup:'it_is_not_dry_and_it_is'},
  {name:'stone_basin',x:264,y:90,w:64,h:17,wx:296,wy:115,look:'basin_for_washing_the_flax',use:'i_wash_the_dust_of_the_syrian'},
  {name:'fig_tree',x:350,y:27,w:74,h:36,wx:386,wy:116,look:'fig_tree_old_enough_to_shade'},
  {name:'benches',x:336,y:88,w:96,h:17,wx:384,wy:116,look:async()=>{if(F.read)return say(P,'benches_under_the_fig_tree');await say(P,'benches_under_a_fig_tree');
      await say(P,'men_from_judea_sat_here');return say(P,quote('prov18'))},use:'i_did_not_come_back_to_tarsus'},
  {name:'gate_to_the_street',x:444,y:54,w:32,h:50,wx:458,wy:115,dir:1,look:'the_gate_to_the_street',exit:leaveTar}]};
/* ============ THE CILICIAN GATES: a torn tent, and a storm an hour away ============ */
async function gatesIntro(){if(F.strap||F.mended)return;
  await say(ZE,'this_is_as_far_as_we_go');
  await say(ZE,'my_oxen_will_stand_it_and_the_three');
  await say(BI,'hold_it_charis',{to:CH});
  await say(SI,'family_paul');
  await say(P,'torn_tent_a_storm_an_hour',TH)}
async function strapGive(){if(F.strap)return say(ZE,F.mended?'you_had_it_and_i_saw_what':'you_have_it_in_your_hand_brother');
  await say(ZE,'leather_i_never');
  F.strap=1;toPaul('strap');
  await say(ZE,'i_have_often_said_that_if_my_harness');
  await say(P,'hands_length_of_it_is_all')}
async function tallowGive(){if(F.cased)return say(ZE,'it_is_in_the_weave_now');if(F.tallow)return say(ZE,'you_have_it_brother');
  await say(ZE,'keep_the_rain_out_there');
  F.tallow=1;toPaul('tallow');
  await say(ZE,'take_a_lump')}
/* mend7: a loop of ox-hide where the corner tore out, and the long seam closed */
async function mend7(){if(F.mended)return say(P,F.up?'it_is_mended_and_it_is_standing':'it_is_mended');
  if(!(await bring('strap')))return say(P,'i_can_close_the_seam_now');
  await walk(P,254,118);P.dir=1;P.bow=true;SFX.cut();
  await say(P,'hands_length_of_the_strap');SFX.sew();await wait(600);
  await say(P,'long_seam_one_edge_laid');SFX.sew();await wait(600);
  P.bow=false;delItem('strap');F.mended=1;SFX.good();
  await say(BI,'sewn_ex');
  await say(P,'up_yes')}
/* The tent goes up only with a man on its windward line (played as Silas: use the tent), while Paul sets the pole and drives the pins. */
async function hold7(){if(F.up)return say(SI,'it_stands_and_i_can_let');
  if(!F.mended)return say(SI,'paul_will_want_me_on_that_line');
  if(holding())return say(SI,'i_have_it_paul');
  await walk(SI,LINE[0],LINE[1]);SI.dir=-1;F.line=1;SFX.creak();
  await say(SI,'i_have_the_windward_line')}
async function pitch7(){if(F.up)return say(P,'it_stands_with_its_back');
  if(!F.mended)return mend7();
  if(!holding()){F.line=0;return say(P,'i_get_the_pole_upright')}
  await walk(P,254,118);P.dir=1;P.bow=true;SFX.creak();
  await say(P,'hold_her_there_silas',{to:SI});
  for(let i=0;i<3;i++){noise({d:.05,v:.16,f:700,q:2});await wait(260)}
  P.bow=false;await fade(1,500);F.up=1;F.line=0;CH.room=null;ME.room=null;place(BI,'gates',320,122,-1);place(P,'gates',240,124,1);place(SI,'gates',350,121,-1);AU.mood='calm';toPaul('cloth7',1);
  await narr('first_drops_fell_as_the_last',{dur:6000});
  await fade(0,600);SFX.good();
  await say(BI,'dry_said');
  await say(BI,'you_named_no_price_tentmaker');
  await say(P,'i_did_not_do_it_for_a_price');
  await say(SI,quote('ecc4'));
  await say(SI,'paul_the_rain');
  await say(P,'the_copies',TH);codeBtn()}
/* The copies of the decrees are for every congregation on the road (Acts 16:4): a case of goat-hair cloth, and tallow to turn the rain. */
async function sewCase(){if(F.sewn)return say(P,'case_is_sewn');
  if(!(await bring('cloth7')))return say(P,'case_needs_cloth_and_i');
  SFX.cut();await say(P,'strip_cut_to_the_length');SFX.sew();await wait(600);
  delItem('cloth7');F.sewn=1;addItem('pcase',1);SFX.good();
  await say(P,'a_case')}
async function proof(){
  await say(P,'tallow_worked_into_the_weave');
  delItem('tallow');delItem('pcase');F.cased=1;drawInv();SFX.good();
  await say(P,'letter_inside_it_with_every_copy_now');
  await say(SI,'letter_from_jerusalem_in_a_case')}
const noCloth=()=>say(P,'it_needs_a_tent_to_go_on_and_the'),isSewn=()=>say(P,'it_is_sewn_already_and_sewn_twice');
Object.assign(COMBO,{
  'awl+cloth7':sewCase,'cloth7+thread':sewCase,'cloth7+knife':sewCase,'pcase+tallow':proof,
  'letter+pcase':()=>say(P,'not_yet_cloth'),
  'letter+tallow':()=>say(P,'tallow_on_papyrus'),'cloth7+letter':()=>say(P,'wrapped_loosely_in_cloth'),
  'cloth7+tallow':()=>say(P,'first_the_sewing'),
  'awl+strap':noCloth,'strap+thread':noCloth,'knife+strap':()=>say(P,'i_will_cut_it_when_i_know'),'awl+pcase':isSewn,'pcase+thread':isSewn});
async function leaveGates(){const me=PC();
  if(!F.up)return say(me,me===P?'leave_a_child_in_the_open':'with_a_family_standing');
  if(!F.cased)return say(me,me===P?'by_morning_that_stream':'letter_is_wet_and_there');
  await fade(1,600);await narr('by_first_light_the_rain',{dur:6000});
  await say(BI,'go_well_tentmaker_said');await fade(0,300);return travel()}
ZE.hs={name:'Zenon',actor:ZE,
  look:()=>say(P,F.up?'zenon_under_his_wagon_with_his_cloak':'zenon_of_derbe_the_carter'),
  show:{letter:()=>say(ZE,F.cased?'in_its_case_with_my_tallow':'letter_from_the_apostles'),
    strap:'that_is_the_one',cloth7:'merchants_cloth',pcase:'a_case_for_the_letter',
    tallow:'warm_it_in_your_hand_first',awl:'there_it_is',tablets:'say_one_to_me_while_i_see',
    thread:'strong_stuff',knife:'mind_the_ox_said','*':'stow_it_on_the_load_brother'},
  ask:{loop:strapGive,dry:tallowGive},
  talk:()=>talkTree([
    {q:'how_far_is_it_to_derbe',a:async()=>{await say(ZE,'through_the_gates_tomorrow');
      await say(ZE,'brothers_there_meet_on_my_threshing')}},
    {q:'you_offered_us_this_road_once',once:1,a:async()=>{await say(ZE,'you_would_not_take_it');
      await say(P,'it_runs_both_ways_zenon')}},
    {q:'what_do_you_know_of_these_gates',once:1,a:()=>say(ZE,'that_there_is_no_better')},
    {q:'see_to_your_oxen_brother',bye:1}]),
  as:{silas:{look:'zenon_a_carter_and_a_disciple',
    talk:()=>say(ZE,F.up?'you_held_that_line_like':'you_are_the_brother_from_jerusalem'),
    show:{sstaff:'a_good_stick',letter:'read_it_to_us_in_derbe_brother','*':'stow_it_on_the_load'}}}};
BI.hs={name:'Bion',actor:BI,
  look:()=>say(P,F.up?'bion_at_the_mouth_of_his_tent':'bion_a_cloth_merchant_of_tarsus'),
  show:{letter:'a_letter',cloth7:'it_is_yours_and_i_do_not',pcase:'you_made_that_out_of_my_cloth',
    awl:'that_is_how_it_is_done',strap:'ox_hide_said',
    tablets:'accounts_said','*':'keep_it_out_of_the_wet_friend'},
  ask:{loop:'leather_i_deal',dry:'keep_papyrus_dry_on_this_road'},
  talk:async()=>{if(F.up)return talkTree([
      {q:'is_the_child_warm',a:()=>say(BI,'asleep_with_her_mothers_cloak_over_her_she')},
      {q:'you_are_wondering_why_we_did_it',once:1,a:async()=>{await say(BI,'i_am_you');
        await say(P,'nothing_to_sell_bion');
        await say(BI,'i_may_do_that_it')}},
      {q:'sleep_dry_bion',bye:1}]);
    if(!G.metBion){G.metBion=1;
      await say(BI,'you_are_with_the_carter');
      await say(BI,'seam_went_in_the_first');
      await say(P,'i_did');
      await say(BI,'tentmaker_here');
      await say(P,'we_can_talk_of_prices_when_your_daughter')}
    return talkTree([
      {q:'where_are_you_bound',a:()=>say(BI,'iconium_and_the_cities_beyond_it')},
      {q:'how_did_it_come_down',a:()=>say(BI,'i_pitched_it_broadside')},
      {q:'keep_your_family_close_to_the_bales',bye:1}])},
  as:{silas:{look:()=>say(SI,F.up?'merchant_said':'merchant_shouting_at_the_wind'),
    talk:()=>say(BI,F.up?'you_held_that_line_friend':'you_friend'),
    show:{sstaff:'walking_staff_will_not','*':'keep_it_out_of_the_wet_friend'}}}};
CH.hs={name:'Charis',actor:CH,
  look:'charis_the_merchants_wife',
  show:{awl:'is_that_for_the_tent','*':'not_now_sir'},
  talk:()=>say(CH,F.mended?'it_is_sewn':'i_told_him_that_it_was'),
  as:{silas:{look:'merchants_wife',talk:()=>say(CH,'is_your_friend_truly_a_tentmaker'),show:{'*':'not_now_sir'}}}};
ME.hs={name:'Melissa',actor:ME,
  look:'little_girl_wrapped_in_half',
  show:{awl:'is_it_sharp',tablets:'are_there_pictures_in_it','*':'is_that_for_our_tent'},
  talk:async()=>{await say(ME,'does_the_big_ox_bite');await say(P,'not_that_i_have_seen_and_i')},
  as:{silas:{look:'merchants_daughter',talk:async()=>{await say(ME,'are_you_cold_too');await say(SI,'a_little')},show:{'*':'is_that_for_our_tent'}}}};
ROOMS.gates={space:0.8,walk:[16,388,112,138],
  /* Zenon's wagon and the near ox, at the back edge of the strip */
  block:[[19,109,58,3.2],[88,110,37,3]],get mood(){return F.up?'calm':'storm'},amb:()=>F.up?{fountain:.9,leaves:.9,wind:.5}:{wind:1,leaves:.5,fountain:.25,creak:.3},enter:gatesIntro,hs:[
  {name:'rock_wall',x:0,y:0,w:338,h:82,wx:180,look:'limestone_as_high_as_i_can_see'},
  {name:'cilician_gates',x:342,y:8,w:54,h:58,wx:360,wy:113,dir:1,exit:leaveGates,look:['the_cilician_gates','every_wagon_between_tarsus']},
  {name:'stream',x:398,y:100,w:82,h:44,wx:384,wy:127,dir:1,look:'snow_water_coming_down_fast',use:'i_fill_my_hands_and_drink',pickup:'stream_stays_in_its_bed'},
  {name:'wagon',x:18,y:84,w:76,h:28,wx:58,wy:120,dir:-1,look:'zenons_wagon_loaded_for_derbe',pickup:'it_is_zenons_and_it_is_loaded',use:'not_while_that_family_is'},
  {name:'oxen',x:90,y:66,w:74,h:48,wx:187,wy:122,dir:-1,look:'zenons_brown_oxen',pickup:'they_are_zenons',
    talk:async()=>{SHARED.beasts.speak('oxen7','ox');await say(P,'he_lows_once_long_and_deep')}},
  {name:'bales',x:344,y:92,w:40,h:21,wx:352,wy:119,dir:1,look:'bales_of_goat_hair_cloth',pickup:'they_are_the_merchants_whole_fortune'},
  {get name(){return F.up?'tent':F.mended?'mended_tent':'torn_tent'},x:262,y:84,w:64,h:29,wx:254,wy:118,dir:1,def:'use',
    look:async()=>{if(F.up){await say(P,'low_black_tent_with_its_back');
        await say(P,quote('isa32'));return say(P,'isaiah_wrote_that_of_men')}
      return say(P,F.mended?'mended_and_laid_out_ready'
      :'good_tent_once_goat_hair')},
    pickup:'it_is_bions_house_such',use:pitch7,
    useWith:async it=>{if(it==='strap'||it==='awl'||it==='thread')return F.mended?pitch7():mend7();if(it==='knife')return say(P,'cloth_is_sound');
      if(it==='cloth7')return say(P,'his_tent_needs_no_new_cloth');return false}},
  {name:'road_to_tarsus',x:0,y:114,w:14,h:24,wx:20,wy:128,dir:-1,look:'road_back_down_to_tarsus',exit:()=>say(PC(),PC()===P?'we_did_not_climb_for_two':'back_down')}]};
/* ============ LYSTRA AND ICONIUM: what the brothers say of Timothy ============ */
/* The brothers in Lystra and Iconium spoke well of Timothy (Acts 16:2). Before Paul asks Timothy to come, he hears it for himself:
   from the elders, from the household that raised him, and from the brothers a day's walk away. What he asks each of them matters.
   A question about what appears to the eyes gets a short answer; a question about what Timothy does gets a true one (1 Samuel 16:7). */
async function lysIntro(){if(F.readL||G.metLys)return;G.metLys=1;
  await say(LO,'i_said_that_this_door_would');
  await say(TI,'paul_you');
  await say(P,'timothy_when');
  await say(EN,'barnabas_is');
  await say(P,'no_eunice');
  await say(P,'i_will_not_dress_it_up_for_you');
  await say(P,'this_is_silas_of_jerusalem');
  await say(MY,'lystra_shall_hear_it_this_evening')}
/* The decrees are delivered to each congregation (Acts 16:4). */
async function deliverL(it){if(it!=='letter')return false;const me=PC();
  if(F.readL)return say(MY,'it_has_been_read_and_copied');
  await say(me,me===P?'letter_myron_the_decision':'letter_brother');
  playAs(P);await fade(1,500);
  await narr('that_evening_the_congregation',{dur:7500});
  F.readL=1;await fade(0,500);SFX.good();
  await say(MY,'no_burden_but_the_necessary_things');
  await say(MY,'timothy_will_copy_it_before');
  await say(MY,'nobody_will_have_asked_him_to_he');
  await say(P,'two_years_ago_he_asked',TH)}
async function askMyron(){
  if(!F.readL)return say(MY,'first_the_letter_brother');
  if(F.eld)return say(MY,heard()?'you_have_asked_in_two_cities_paul':'i_have_told_you_what_i_see');
  await say(P,'myron_said');
  await ask(P,MY,'you_have_been_watching',[
    {q:'does_he_speak_well_before_the_congregation',r:['well_enough',[P,'fair_answer_to_a_poor_question',TH]]},
    {q:'is_he_strong_enough_for_the_road',r:['he_is_no_ox_paul',[P,'true_i',TH]]},
    {q:'what_do_you_give_him_to_do',ok:1,
      r:['everything_that_needs_feet',
        'i_have_never_had_to_ask',
        'do_not_take_it_from_lystra_alone']}]);
  F.eld=1;SFX.good();
  await say(P,'what_he_is_given_he_does',TH)}
async function askFamily(){
  if(F.fam)return say(EN,heard()?'you_have_asked_everyone_but_him_paul':'i_have_said_what_i_know');
  await say(P,'eunice_the');
  await ask(P,EN,'i_am_his_mother_paul_i',[
    {q:'was_he_a_quick_pupil',r:['he_had_the_psalms_by_heart']},
    {q:'could_he_bear_to_leave_this_house',r:['do_not_ask_me_that_yet']},
    {q:'what_is_he_at_home_when_the_brothers',ok:1,
      r:['the_same','his_father_does_not_believe',
        [LO,'i_taught_my_daughter_and_she']]}]);
  F.fam=1;SFX.good();
  await say(P,'faith_without_hypocrisy',TH)}
/* A hasty choice is unwise, not untrue: Paul wants him at once, and sets the wish aside until the brothers have been heard. */
async function talkTim(){
  if(heard()&&F.readL)return invite7();
  if(!G.asked){G.asked=1;
    await say(TI,'is_there_something_i_can');
    await think('he_would_come_if_i_asked_him',[
      {q:'come_with_us_timothy_and_come_now',no:'it_is_what_i_want_and_it'},
      {q:'you_are_young_for_such',no:'is_he_said'},
      {q:'say_nothing_yet',ok:1}]);
    await say(P,'nothing_timothy');
    return say(TI,'whenever_you_say')}
  return talkTree([
    {q:'what_have_you_been_doing',a:()=>say(TI,'whatever_the_elders_give_me_paul')},
    {q:'do_you_remember_the_night',once:1,a:async()=>{await say(TI,'you_sat_by_that_lamp_with_blood');
      await say(P,'it_was_a_better_nights')}},
    {q:'later_timothy',bye:1}])}
/* An optional kindness: a psalm read to Lois, whose eyes are past reading. */
async function psalm(it){if(it!=='tablets')return false;if(F.psalm)return say(LO,'i_have_it_still_word_for_word');
  await say(LO,'my_eyes_are_past_reading_child_said');
  await say(P,quote('ps71'));F.psalm=1;SFX.good();
  await say(LO,'you_have_it_right')}
async function door7(){const me=PC();
  if(!F.readL)return say(me,me===P?'we_have_only_just_come_in':'not_before_lystra_has_heard_the_letter');
  if(heard())return say(me,me===P?'not_yet_there_is':'paul_has_something_to_ask');
  if(F.nat&&F.tat)return say(me,me===P?'iconium_has_had_its_letter':'we_have_been_to_iconium');
  return travel()}
TI.hs={name:'Timothy',actor:TI,
  look:async()=>{if(heard()){await say(P,'timothy_four');return say(P,quote('prov22'))}
    return say(P,F.readL?'timothy_he_has'
    :'timothy_the_son_of_eunice_said')},
  show:{tablets:'i_can_say_every_passage_q',letter:()=>say(TI,F.readL?'i_have_copied_it_word_for_word':'from_jerusalem'),
    awl:'the_awl',thread:'my_grandmother_still_spins',knife:'shaped_like_the_new_moon','*':'shall_i_carry_that_for_you_paul'},
  ask:{tim:()=>say(TI,'of_me')},
  talk:talkTim,
  as:{silas:{look:'this_is_timothy',
    talk:()=>say(TI,heard()?'paul_keeps_looking_at_me':'is_it_true_that_you_were'),
    show:{sstaff:'shall_i_set_it_by_the_door',letter:'i_copied_it_last_night','*':'shall_i_carry_that_for_you_brother'}}}};
EN.hs={name:'Eunice',actor:EN,
  look:()=>say(P,F.fam?'eunice_she_answered':'eunice_these_two'),
  show:{tablets:'written_out_i_said',letter:()=>say(EN,F.readL?'i_heard_it_read':'a_letter_from_jerusalem'),
    thread:'you_had_thread_in_your_hand','*':'put_it_by_paul_said'},
  ask:{tim:()=>F.readL?askFamily():say(EN,'ask_me_when_the_letter')},
  talk:async()=>{if(!F.readL)return talkTree([
      {q:'how_has_it_been_for_you',a:async()=>{await say(EN,'as_you_said_that_it_would_be');await say(EN,'through_many_tribulations_said')}},
      {q:'your_husband',once:1,a:()=>say(EN,'he_is_with_the_flocks')},
      {q:'peace_to_this_house_eunice',bye:1}]);
    return askFamily()},
  as:{silas:{look:'eunice_the_mother',
    talk:()=>say(EN,'peace_to_you_brother_said'),show:{'*':'put_it_by_brother_you'}}}};
LO.hs={name:'Lois',actor:LO,
  look:()=>say(P,F.psalm?'lois_she_is':'lois_older'),
  give:psalm,
  show:{letter:'read_it_to_the_congregation',thread:'i_spun_for_this_household','*':'keep_your_things_about_you_and'},
  ask:{tim:()=>F.readL?askFamily():say(LO,'ask_my_daughter_when_the_letter')},
  talk:()=>F.fam?say(LO,'i_taught_my_daughter_the_holy'):F.readL?askFamily():say(LO,'i_said_that_this_door_would_said'),
  as:{silas:{look:'lois_the_grandmother',give:async()=>false,
    talk:()=>say(LO,'sit_down_child'),show:{'*':'keep_your_things_about_you_said'}}}};
MY.hs={name:'Myron',actor:MY,
  look:()=>say(P,F.eld?'myron_he':'myron_one_of_the_elders_of_lystra_acts_14_23'),
  give:deliverL,
  show:{tablets:'i_cannot_read_them_paul',awl:'plain_tool','*':'keep_it_by_you_brother_said'},
  ask:{tim:askMyron},
  talk:askMyron,
  as:{silas:{look:'myron_one_of_the_elders',give:deliverL,
    talk:()=>say(MY,F.readL?'good_letter_brother_and_well_carried':'peace_brother_said'),show:{'*':'keep_it_by_you_brother_said'}}}};
ROOMS.lystra7={space:1.25,walk:[16,304,110,136],
  /* the elder and the two sisters of the congregation, whom the room paints where they stand */
  block:()=>GATHER.map(([,x,y])=>[x-5,y-2.5,10,3.5]),mood:'calm',amb:{fire:.5,birds:.25,wind:.2},enter:lysIntro,hs:[
  {name:'window',x:48,y:24,w:24,h:26,wx:64,look:'lane_in_winter_daylight'},
  {name:'lamp',x:140,y:42,w:20,h:24,wx:150,look:'the_lamp_in_its_niche',pickup:'it_gives_light_to_the_whole_said'},
  {name:'shelf',x:172,y:48,w:60,h:18,wx:200,look:'oil_meal_and_olives',pickup:'it_is_their_winter_store'},
  {name:'hearth',x:76,y:88,w:34,h:18,wx:112,wy:114,dir:-1,look:'a_fire_of_thorn_wood',use:'i_warm_my_hands_after'},
  {name:'bench',x:6,y:78,w:62,h:26,wx:60,wy:114,dir:-1,look:'bench_and_the_blanket_folded_on_it',use:'not_yet_there_are'},
  {name:'water_jars',x:222,y:84,w:36,h:24,wx:228,wy:114,dir:1,look:'great_jar_by_the_door_and_the_two',pickup:'they_are_full_and_it_was'},
  {name:'table',x:168,y:104,w:44,h:20,wx:160,wy:124,dir:1,look:'low_table_and_one_bowl',pickup:'it_is_their_supper'},
  /* the hidden treasure of the chapter (CHAP[7].treasure): found by looking at the marks; it changes nothing in the story */
  {name:'marks_on_the_wall',x:300,y:66,w:10,h:26,wx:296,wy:113,dir:1,
    look:async()=>{await say(P,'scratches_in_the_plaster');treasure()},
    pickup:'they_are_cut_into_the_wall',
    as:{silas:{look:async()=>{await say(SI,'little_scratches_by_the_door');treasure()}}}},
  {name:'door_to_the_lane',x:269,y:51,w:28,h:53,wx:272,wy:113,dir:1,look:'door_to_the_lane_said',exit:door7}]};
/* ---------- Iconium: the decrees delivered, and two more witnesses ---------- */
async function icoIntro(){if(F.readI||G.metIco)return;G.metIco=1;
  await say(NA,'paul_alive');
  await say(P,'peace_nathan');
  await say(NA,'from_jerusalem_said')}
async function deliverI(it){if(it!=='letter')return false;const me=PC();
  if(F.readI)return say(NA,'it_is_read_and_it_is_copied');
  await say(me,me===P?'letter_nathan':'letter_from_jerusalem_brother');
  playAs(P);await fade(1,500);
  await narr('congregation_in_iconium',{dur:6000});
  F.readI=1;await fade(0,500);SFX.good();
  await say(NA,'when_this_city_took_sides');
  await say(P,'that_is_the_letter_delivered',TH)}
async function askNathan(){
  if(!F.readI)return say(NA,'first_tell_me_what_you_carry_paul');
  if(F.nat)return say(NA,'take_him_with_you_paul');
  await say(P,'nathan_said');
  await ask(P,NA,'timothy_of_lystra_q',[
    {q:'does_he_look_like_a_man',r:['he_looks_like_what_he_is']},
    {q:'has_he_a_good_head_for_the_scriptures',r:['very_good_one']},
    {q:'how_does_iconium_come_to_know',ok:1,
      r:['because_he_walked_here',
        'it_was_timothy_who_carried',
        'he_has_done_it_every_few']}]);
  F.nat=1;SFX.good();
  await say(P,'he_spends_himself_for_brothers',TH)}
async function askTatia(){
  if(F.tat)return say(TA,'if_you_take_him_with_you');
  await say(TA,'paul_they_said');
  await say(P,'peace_tatia');
  await ask(P,TA,'young_man_from_lystra',[
    {q:'is_he_bold',r:['bold_said']},
    {q:'does_he_come_of_a_good_family',r:['his_father_is_a_greek_who']},
    {q:'what_does_he_do_when_he',ok:1,
      r:['he_asks_after_people',
        'xanthos_shouted_at_him',
        'he_is_not_pretending_paul']}]);
  F.tat=1;SFX.good();
  await say(P,'he_genuinely_cares_for_them',TH)}
async function leaveIco(){const me=PC();
  if(!F.readI)return say(me,me===P?'we_walked_a_day_to_bring':'not_before_iconium_has_its_letter');
  if(!(F.nat&&F.tat))return say(me,me===P?'not_yet_the':'paul_is_still_asking_about_the_young');
  await say(me,me===P?'back_to_lystra_silas':'back_to_lystra_then');return travel()}
NA.hs={name:'Nathan',actor:NA,
  look:()=>say(P,F.nat?'nathan_he':'nathan_the_saddler_said'),
  give:deliverI,
  show:{tablets:'you_read_to_me_from_those_the_first_said',awl:'that_awl_again',
    knife:'a_half_moon_knife',thread:'good_thread_mine_is','*':'keep_it_by_you_brother_said'},
  ask:{tim:askNathan},
  talk:askNathan,
  as:{silas:{look:'saddler_and_an_elder_of_this_congregation',give:deliverI,
    talk:()=>say(NA,F.readI?'i_have_heard_a_great_many':'peace_brother_from'),show:{sstaff:'olive_wood_if_you','*':'keep_it_by_you_brother_said'}}}};
TA.hs={name:'Tatia',actor:TA,
  look:()=>say(P,F.tat?'tatia_she_has':'tatia_the_wife_of_xanthos_said'),
  show:{tablets:'i_still_cannot_read_your_letters_paul',letter:()=>say(TA,F.readI?'written_to_us_of_the_nations':'letter_said'),'*':'put_it_away_paul_people'},
  ask:{tim:askTatia},
  talk:()=>F.readI?askTatia():say(TA,'paul_in'),
  as:{silas:{look:'sister_at_the_fountain',
    talk:()=>say(TA,'you_are_the_brother_from_jerusalem_said'),show:{'*':'keep_it_brother_2'}}}};
ROOMS.iconium7={space:0.9,walk:[16,464,110,138],
  /* the carrier's wagon, at the back edge of the strip */
  block:[[310,107,60,3.2]],mood:'hope',amb:{fountain:.7,birds:.2,hammer:.3,wind:.3,crowd:.2},enter:icoIntro,hs:[
  {name:'mountains',x:188,y:26,w:110,h:24,wx:244,look:'mountains_round_the_plain'},
  {name:'street_to_the_synagogue',x:0,y:36,w:60,h:68,wx:42,wy:113,dir:-1,look:'the_street_to_the_synagogue_of_the_jews',use:'not_today_said',open:'not_today_said'},
  {name:'saddlery',x:84,y:56,w:84,h:30,wx:126,wy:113,look:'nathans_shop_pack_saddles_said',pickup:'they_are_nathans_living'},
  {name:'saddlers_bench',x:102,y:82,w:52,h:23,wx:128,wy:113,look:'nathans_bench_with_a_pack',use:'it_is_his_work_and_he_is',
    pickup:'pack_saddle_half_made'},
  {name:'fountain',x:220,y:64,w:50,h:44,wx:246,wy:114,look:'the_fountain_at_the_crossroads',use:'i_drink_as',pickup:'fountain_stays_where_it_is'},
  {name:'poplars',x:190,y:40,w:24,h:50,wx:204,look:'poplars_are_bare'},
  {name:'poplars',x:276,y:38,w:22,h:52,wx:286,look:'poplars_are_bare'},
  {name:'xanthoss_wagon',x:308,y:72,w:74,h:38,wx:344,wy:114,look:'wagon_of_xanthos_the_carrier',pickup:'take_a_wagon',use:'cover_is_his_and_so_is'},
  {name:'gateway_of_the_yard',x:375,y:53,w:52,h:51,wx:400,wy:113,look:'the_yard_of_xanthos_the_carrier',use:'i_have_no_business_in_his_yard_said',open:'i_have_no_business_in_his_yard_said'},
  {name:'south_gate',x:444,y:54,w:32,h:50,wx:458,wy:113,dir:1,look:'south_gate_and_the_road',exit:leaveIco}]};
/* ============ SILAS AND PAUL, AS EACH SEES THE OTHER ============ */
/* Silas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const SIL7={noCraft:'that_is_the_tentmakers_trade_not_mine_i',
  def:{look:'i_see_nothing_there_that_needs_me',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_the_tentmakers_trade_not_mine_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
const SILAS7={name:'Silas',actor:SI,
  look:()=>say(P,inTar()?(F.read?'silas_said':F.silas?'silas_he':'silas_he_has')
    :inGates()?(F.up?'silas_wet_to_the_skin_and_laughing':'silas_he_is')
    :inLys()?'silas_he_watches':'silas_he_has_learned'),
  show:{letter:()=>say(SI,inTar()&&!F.read?'i_know_it_by_heart_paul':'keep_it_by_you_said'),
    awl:'your_awl_said',thread:'thread_i',knife:'put_it_to_work_brother_said',
    tablets:'read_me_one_when_we_stop',strap:'leather_for_the_corner',
    cloth7:'merchants_thanks',pcase:'case_for_the_letter_said',tallow:'carters_tallow','*':'keep_it_brother_said'},
  ask:{witness:['he_asks_for_a_second_witness_paul','you_have_one_standing_beside_you'],
    loop:'leather_i_have',dry:'not_with_anything_that_i_carry',
    tim:'i_have_known_him_for_a_day'},
  talk:()=>inTar()?talkTree([
      {q:'what_do_you_make_of_reuben',a:()=>say(SI,F.silas?'honest_man_who_asked_an_honest_question':'that_he_is_not_your_enemy')},
      {q:'what_is_still_to_do_here',a:()=>say(SI,F.read?'nothing_tarsus':F.silas?'letter_paul':'i_was_sent_to_report_by_word')},
      {q:'be_ready_brother',bye:1}])
    :inGates()?talkTree([
      {q:'have_you_ever_pitched_a_tent_silas',once:1,a:async()=>{await say(SI,'never_in_my_life');await say(P,'it_is_exactly_enough')}},
      {q:'what_is_still_to_do_here',a:()=>say(SI,!F.mended?'tent_paul':!F.up?'it_must_go_up_put':!F.cased?'the_letter':'nothing_but_to_sleep_if_the_rain')},
      {q:'stay_close',bye:1}])
    :inLys()?talkTree([
      {q:'what_do_you_see_in_this_house',a:()=>say(SI,'grandmother_a_mother_and_a_son')},
      {q:'what_is_still_to_do_here',a:()=>say(SI,!F.readL?'letter_put':heard()?'you_know_very_well':'you_are_weighing_that_young_man')},
      {q:'sit_by_the_fire_brother',bye:1}])
    :talkTree([
      {q:'what_do_you_make_of_iconium',a:()=>say(SI,'that_it_gathered_stones')},
      {q:'let_us_see_to_our_errand',bye:1}])};
/* Paul, as Silas sees him and talks to him */
const PAUL7={name:'Paul',actor:P,as:{silas:{
  look:()=>say(SI,inTar()?(F.read?'paul_he_let':'paul_everything')
    :inGates()?(F.up?'paul_rain':'paul_he_looked')
    :inLys()?'paul_he_has_not':'paul_in_this'),
  talk:()=>talkTree([
    {q:'what_can_i_do_to_help',a:()=>say(P,inTar()?(F.read?'nothing_more_here':F.silas?'stand_ready_to_read':'speak_to_reuben')
      :inGates()?(!F.mended?'leave_the_sewing_to_me':!F.up?'take_the_windward_line':F.cased?'sleep_if_you_can':'keep_the_letter_under_your_mantle')
      :inLys()?(!F.readL?'see_that_lystra_hears_the_letter':heard()?'stand_by_me':'watch_that_young_man_with_me')
      :'greet_the_brothers')},
    {q:'why_were_two_of_us_sent',if:()=>inTar()&&!F.read,once:1,a:()=>say(P,'that_it_should_not_rest')},
    {q:'i_will_leave_you_to_it',bye:1}]),
  show:{sstaff:'keep_your_staff_by_you_silas',letter:()=>say(P,inTar()&&!F.read?'keep_it_for_a_moment_silas':'you_carry_it_as_well_as_i'),'*':'keep_it_by_you_silas'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'witness',q:'reuben_will_not_take_the_letter',if:()=>inTar()&&!F.silas},
  {id:'loop',q:'tents_corner_loop_needs',if:()=>inGates()&&!F.strap&&!F.mended},
  {id:'dry',q:'copies_of_the_letter_must',if:()=>inGates()&&F.up&&!F.tallow&&!F.cased},
  {id:'tim',q:'what_do_the_brothers_say_of_timothy',if:()=>(inLys()||inIco())&&!heard()}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Silas',note:()=>inTar()?'leading_man_among_acts_15_27_32'
      :inGates()?'he_has_never_pitched_a_tent':'stranger_in_these_cities'},
    {name:'Reuben',note:()=>F.read?'he_asked_for_a_second_witness':'brother_of_israel_in_tarsus',if:inTar},
    {name:'Agathon',note:'brother_of_the_nations_in_tarsus',if:inTar},
    {name:'Eirene',note:'weaver_of_linen',if:inTar},
    {name:'Zenon',note:'the_carter_of_derbe_and_a_disciple',if:inGates},
    {name:'Bion',note:()=>F.up?'he_is_dry_with_his_wife':'cloth_merchant_of_tarsus',if:inGates},
    {name:'Timothy',note:()=>heard()?'brothers_in_lystra_acts_16_2':'son_of_eunice_his_father',if:()=>inLys()||inIco()},
    {name:'Eunice',note:'mother_of_timothy',if:inLys},
    {name:'Lois',note:'the_mother_of_eunice',if:inLys},
    {name:'Myron',note:'one_of_the_elders_appointed_in_lystra_acts_14_23',if:inLys},
    {name:'Nathan',note:'saddler_and_now_one_of_the_elders',if:inIco},
    {name:'Tatia',note:'wife_of_xanthos_the_carrier',if:inIco}],
  tasks:[
    {t:'reuben_asks_for_a_second_witness',if:()=>inTar()&&!F.silas},
    {t:'have_the_letter_read_to_the_whole',if:()=>inTar()&&F.silas&&!F.read},
    {t:'take_the_road_north_over_the_taurus',if:()=>inTar()&&F.read},
    {t:'mend_the_merchants_tent',if:()=>inGates()&&!F.mended},
    {t:'raise_the_tent',if:()=>inGates()&&F.mended&&!F.up},
    {t:'make_a_case_that_will_keep',if:()=>inGates()&&F.up&&!F.cased},
    {t:'go_on_through_the_gates_to_derbe',if:()=>inGates()&&F.cased},
    {t:'deliver_the_decrees_to_the_congregation',if:()=>inLys()&&!F.readL},
    {t:'hear_what_the_elders_of_lystra',if:()=>inLys()&&F.readL&&!F.eld},
    {t:'hear_what_timothys_own',if:()=>inLys()&&F.readL&&!F.fam},
    {t:'carry_the_decrees_to_iconium',if:()=>inLys()&&F.readL&&!(F.nat&&F.tat)},
    {t:'ask_timothy',if:()=>inLys()&&heard()},
    {t:'deliver_the_decrees_to_the_congregation_said',if:()=>inIco()&&!F.readI},
    {t:'hear_what_the_brothers',if:()=>inIco()&&F.readI&&!(F.nat&&F.tat)},
    {t:'go_back_to_lystra',if:()=>inIco()&&F.nat&&F.tat}],
  scripture:ORDER.map(k=>PASS[k])};
/* ---------- Silas's side of things, when he is the one being played ---------- */
const AS_S={
  tarsus7:{'mountains':{look:'those_are_the_mountains'},
    'door_of_the_house':{look:'door_of_a_house_that_has',use:'i_am_a_guest_here',open:'i_am_a_guest_here'},
    'loom':{look:'loom_and_it_is_standing_idle',use:'i_should_only_tangle_it'},'bolts_of_linen':{look:'fine_linen'},
    'linen_on_the_wall':{look:'clean_linen_in_the_sun'},'stone_basin':{look:'cold_water_and_clear',use:'i_wash_my_face'},
    'fig_tree':{look:'fig_tree_with_benches_under_it'},
    'benches':{look:()=>say(SI,F.read?'full_benches_and_nobody':'two_benches_and_the_brothers')},
    'gate_to_the_street':{look:'gate_to_the_street_said'}},
  gates:{'rock_wall':{look:'rock_on_both_sides_and_a_strip'},'cilician_gates':{look:'that_is_the_gate_of_cilicia'},
    'stream':{look:'stream_is_rising_already',use:'i_drink_my'},
    'wagon':{look:'carters_wagon'},'oxen':{look:'patient_beasts_said'},
    'bales':{look:'black_cloth_in_bales'},
    'road_to_tarsus':{look:'way_we_came'}},
  lystra7:{'window':{look:'lane_in_a_small_town'},'lamp':{look:'small_lamp_in_a_niche'},
    'shelf':{look:'their_winter_store_said'},'hearth':{look:'a_good_fire',use:'i_warm_my_hands_i'},
    'bench':{look:'best_place_in_the_house',use:'not_while_paul_is_still'},'water_jars':{look:'three_jars_and_every_one'},
    'table':{look:'a_low_table'},'door_to_the_lane':{look:'the_door_to_the_lane'}},
  iconium7:{'mountains':{look:'snow_almost_down_to_the_plain'},
    'street_to_the_synagogue':{look:'street_to_the_synagogue_said',use:'not_today_2',open:'not_today_2'},
    'saddlery':{look:'a_saddlery'},'saddlers_bench':{look:'saddle_half_made'},
    'fountain':{look:'good_water_and_a_good_deal',use:'i_drink_it'},'poplars':{look:'bare_trees_in_a_row_like'},
    'xanthoss_wagon':{look:'wagon_under_a_goat_hair_cover'},
    'gateway_of_the_yard':{look:'a_carriers_yard',use:'i_have_no_business_in_there',open:'i_have_no_business_in_there'},
    'south_gate':{look:'gate_we_came_in_by'}}};
for(const r in AS_S)for(const h of ROOMS[r].hs)if(AS_S[r][h.name])h.as={silas:AS_S[r][h.name]};
/* the tent, in Silas's hands: he does not sew it, he holds its windward line */
ROOMS.gates.hs.find(h=>h.use===pitch7).as={silas:{
  look:()=>say(SI,F.up?'it_stands':F.mended?'mended_and_lying_there':'tent_flat_on_the_ground'),
  use:hold7,pickup:hold7,useWith:async it=>say(SI,it==='sstaff'?'staff_will_not_hold_it':SIL7.noCraft)}};
/* ============ PLACING THE CAST, SETUP ============ */
/* ENT: where Paul stands when a room is entered by a code. */
const ENT={tarsus7:[150,124,1],gates:[226,127,1],lystra7:[236,124,-1],iconium7:[420,124,-1]};
/* place7: put everyone where the story has them, for the room the two men are in. They keep together throughout. */
function place7(room){const o=other(),e=ENT[room];for(const a of[RE,AG,EI,ZE,BI,CH,ME,TI,EN,LO,MY,NA,TA])a.room=null;G.gath=0;G.hands=0;
  place(o,room,e[0]-e[2]*26,e[1]+2,e[2]);
  if(room==='tarsus7'){place(EI,room,84,117,1);place(AG,room,226,116,-1);place(RE,room,352,118,-1)}
  else if(room==='gates'){place(ZE,room,172,117,1);place(BI,room,310,123,-1);if(!F.up){place(CH,room,370,117,-1);place(ME,room,384,120,-1)}else place(BI,room,320,122,-1);
    if(F.line&&F.mended&&!F.up)place(SI,room,LINE[0],LINE[1],-1)}
  else if(room==='lystra7'){place(MY,room,62,121,1);place(LO,room,112,115,1);place(TI,room,150,122,1);place(EN,room,206,117,-1)}
  else if(room==='iconium7'){place(NA,room,128,114,1);place(TA,room,274,116,-1)}}
function setup7(){SI.hs=SILAS7;P.hs=PAUL7;P.called='Paul';Object.assign(SI,SIL7);SI.speed=0;SI.free=false;for(const id in BY7)(ITEMS[id].by=ITEMS[id].by||{}).silas=BY7[id];
  G.tried=G.asked=G.metBion=G.metLys=G.metIco=0;G.st=null;place7('tarsus7');G.inv=['awl','thread','knife','tablets','letter'];G.invs={paul:G.inv,silas:['sstaff']};drawInv()}
/* ============ SCENES: the opening, the roads, the ending; PRAYER HINTS ============ */
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. */
const LIT='#eadfcc';
function cast(g,list,lit){list.sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,lit||LIT,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),7.5)})}
/* The courtyard in Antioch, three times: the dispute (k 0), the letter read (k 1), and the parting (k 2; away: how far Barnabas and Mark have gone). */
function antiochScene(g,t){backdrop(g,'antioch7');SHARED.birds.draw(g,t,'antioch7',BIRDS_ANTIOCH);const s=G.st||{},talk=Math.floor(t/600)%2;
  if(!s.k)cast(g,[['br1',16,119,1],['br3',84,116,1],['br4',276,119,-1],['br2',170,113,1],['barnabas7',98,124,1],['paul',124,127,1,{ges:talk}],['jud1',216,124,-1,{ges:1-talk}],['jud2',242,127,-1]]);
  else if(s.k===1)cast(g,[['br2',190,114,-1],['br3',208,118,-1],['br1',228,114,-1],['br4',246,118,-1],['ap3',266,115,-1],['tc5',180,123,-1],['tc4',222,125,-1],['tc2',256,126,-1],
    ['barnabas7',58,122,1],['paul',82,125,1],['judas7',110,123,1],['silas',138,126,1,{ges:talk}]]);
  else{const a=s.away||0,go=(id,d)=>a>0&&a<1?walkFr(LOOK[id],a*d,d/5.2):0,bow=s.bow?1:0,L=[['br1',16,119,1,{bow}],['br3',84,116,1,{bow}],['br2',60,123,1,{bow}],['br4',34,128,1,{bow}],['silas',112,123,1,{bow}],['paul',140,126,1,{bow}]];
    if(a<1)L.push(['barnabas7',178+a*112,125-a*9,a>0?1:-1,{fr:go('barnabas7',112)}],['mark7',204+a*100,128-a*10,a>0?1:-1,{fr:go('mark7',100)}]);   /* each at his own stride, over the ground he covers in 5.2 seconds */cast(g,L)}}
/* The meeting in Jerusalem (Acts 15:6-21). who: 0 Peter is speaking; 1 Barnabas and Paul; 2 James. */
function councilScene(g,t){backdrop(g,'council');const w=(G.st||{}).who||0,talk=Math.floor(t/600)%2;
  cast(g,[['ap1',30,113,1],['ap2',52,117,1],['ap4',76,113,1],['ap5',98,117,1],['ap3',226,113,-1],['ap1',250,117,-1],['ap2',274,113,-1],['ap4',296,117,-1],
    ['judas7',214,121,-1],['silas',238,125,-1],['james7',192,127,-1,{ges:w===2&&talk}],
    ['barnabas7',w===1?124:72,w===1?126:122,1],['paul',w===1?148:50,w===1?129:125,1,{ges:w===1&&talk}],['peter7',w===0?140:108,w===0?128:121,1,{ges:w===0&&talk}]],'#e4d6c4')}
/* OPENING: the road from Antioch, as the map draws it when the chapter opens. LABELS: where a name goes on this chapter's map. The road
   from the Cilician Gates comes to Derbe from the east, where the name usually stands; the name goes under that road, to the right of the
   place and a little below it. Under the place itself it would stand in one line with PAMPHYLIA, and read as part of that name. */
const OPENING=[['antioch','syriangates','new'],['syriangates','tarsus','new']],LABELS={derbe:{lab:'r',dy:3.3}};
/* arrive7: after the map has drawn a leg, and before the room is shown: who is there, and what is known of the road. */
async function arrive7(to,from){
  if(to==='ciliciangates'){place7('gates');
    await narr('at_the_north_gate_of_tarsus',{dur:9000});
    await narr('from_tarsus_the_road_climbed',{dur:9500});
    await narr('acts_does_not_describe_the_road',{dur:8500})}
  else if(to==='derbe'){place7('lystra7');
    await narr('in_this_way_he_acts_16_1',{dur:5500});
    await narr('at_derbe_the_oxen_were',{dur:8000});
    try{const M=SHARED.map;G.scene=M.draw;await fade(0,350);await M.go('derbe','lystra');await fade(1,400)}catch(e){console.error(e)}
    G.scene=null;setScore(MUSIC);AU.mood=ROOMS.lystra7.mood;AU.amb=ROOMS.lystra7.amb;
    await narr('it_was_late_in_49_c_e_or_early',{dur:7000});
    await narr('there_lived_a_disciple_acts_16_1',{dur:8000})}
  else if(to==='iconium'){place7('iconium7');
    await narr('iconium_lay_about_30_kilometers',{dur:6500})}
  else if(to==='lystra'){place7('lystra7');
    await narr('they_walked_back_the_way',{dur:7500})}}
async function start7(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(7);G.end={};enterRoom('tarsus7',...ENT.tarsus7);G.st={k:0};G.scene=antiochScene;AU.mood='tense';AU.amb={birds:.4,leaves:.4,crowd:.3};codeBtn();await fade(0,600);
    await narr('antioch_in_syria_about_49_c_e',{dur:3000});
    await narr('some_men_arrived_acts_15_1',{dur:9500});
    await narr('paul_and_barnabas_acts_15_2',{dur:11500});
    await fade(1,500);G.st={who:0};G.scene=councilScene;AU.mood='calm';AU.amb={birds:.2,crowd:.15};await fade(0,600);
    await narr('in_jerusalem_the_apostles_acts_15_6',{dur:6500});
    await say(PE,'why_then_do_you_acts_15_10');
    await say(PE,'no_we_trust_that_the_undeserved_acts_15_11');
    G.st.who=1;
    await narr('whole_gathering_fell_quiet_acts_15_12',{dur:10500});
    G.st.who=2;
    await narr('james_spoke',{dur:5000});
    await say(JA,'my_decision_then_acts_15_19');
    await narr('apostles_and_the_elders_acts_15_22',{dur:12500});
    await narr('with_them_went_acts_15_23',{dur:8000});
    await fade(1,500);G.st={k:1};G.scene=antiochScene;AU.amb={birds:.4,leaves:.4,crowd:.5};await fade(0,600);
    await narr('men_were_sent_acts_15_30_31',{dur:11500});
    await narr('judas_and_silas_acts_15_32',{dur:8000});
    await fade(1,500);G.st={k:2,away:0};AU.mood='tense';AU.amb={birds:.4,leaves:.4};await fade(0,600);
    await narr('some_days_later_paul_put',{dur:3200});
    await say(P,'come_let_us_go_acts_15_36');
    await narr('barnabas_had_made_acts_15_37_38',{dur:12500});
    const st=G.st;tween(5200,k=>{st.away=k});
    await narr('anger_flared_up_over_this_so_sharply_acts_15_39',{dur:9500});
    st.away=1;st.bow=1;SFX.pray();
    await narr('paul_chose_silas_acts_15_40',{dur:8500});
    try{await need('map');await SHARED.map.journey(OPENING,{labels:LABELS,view:'north',text:['his_way_led_through_acts_15_41',
      'acts_does_not_name_the_congregations']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;G.st=null;setScore(MUSIC);AU.mood=ROOMS.tarsus7.mood;AU.amb=ROOMS.tarsus7.amb;codeBtn();await fade(0,600);
    await narr('tarsus_in_cilicia',{dur:6500});
    await say(EI,'paul_of_tarsus_home_again');
    await say(P,'peace_to_this_house_eirene');
    await say(EI,'you_both_come_at_the_right_hour');
    await walk(RE,300,120);RE.dir=-1;P.dir=1;SI.dir=1;
    await say(RE,'i_will_say_it_to_your_face');
    await say(RE,'man_who_carries_home_the_verdict');
    await walk(RE,352,118);RE.dir=-1;
    await say(P,'he_is_not_an_enemy',TH)},true)}
/* Paul asks, the elders stand with him, and Timothy comes (Acts 16:3). His circumcision is told as Acts tells it, with the reason it gives, and is not shown. */
async function invite7(){playAs(P);AU.mood='calm';await Promise.all([walk(P,178,126),walk(SI,234,130)]);P.dir=-1;SI.dir=-1;TI.dir=1;
  await say(P,'timothy_i');
  await say(TI,'about_me');
  await say(P,'that_what_you_are_given');
  await narr('the_brothers_in_lystra_acts_16_2',{dur:6500});
  await think('he_is_looking_at_the_floor',[
    {q:'brothers_have_spoken_for_you',no:'must_said'},
    {q:'i_need_someone_to_carry_the_bundles',no:'true_and_the_least_part_of_it'},
    {q:'i_want_you_with_us',ok:1}]);
  await say(P,'i_want_you_to_come_with_us');
  await narr('paul_let_it_be_acts_16_3',{dur:5500});
  await say(TI,'i_am_young_paul');
  await say(P,'i_did_not_ask_what_you');
  await walk(MY,128,127);MY.dir=1;
  await say(MY,'it_is_not_paul_alone_who');
  await say(EN,'do_not_look_at_me_my_son',{to:TI});
  await say(LO,'go_child',{to:TI});
  await say(TI,'if_the_brothers_are_not');
  G.hands=1;for(const a of[P,TI,MY,SI,EN,LO])a.bow=true;SFX.pray();await wait(900);
  await narr('there_were_prophecies_1_timothy_1_18_4_14_2_timothy_1_6',{dur:10500});
  for(const a of[P,TI,MY,SI,EN,LO])a.bow=false;G.hands=0;
  await fade(1,700);AU.mood='hope';
  await narr('jews_of_that_region_acts_16_3',{dur:11000});
  await narr('paul_knew_very_well_that_no',{dur:11500});
  await narr('that_nothing_about_him_1_corinthians_9_20',{dur:10500});
  await journey();
  await narr('in_city_after_acts_16_4',{dur:10500});
  await narr('congregations_kept_growing_acts_16_5',{dur:8000});
  await narr('some_eleven_years_philippians_2_20',{dur:9500});
  endScreen({title:'timothy_of_lystra_2',text:'paul_could_not_be_his_own',
    extra:[F.psalm&&'psalm_read_to_lois'].filter(Boolean),
    based:'based_on_acts_15_1_16_5',
    go:'click_to_continue_to_chapter_eight',code:['chapter_eight_code_code',codeOf(8,0)]});
  await wait(1500);ov.onclick=()=>startChapter(8);await new Promise(()=>{})}
function hint7(){const b=PC()!==P,craft=['craft7',['that_is_the_tentmakers_craft_not_mine','paul_should_do_this_part']],
    his=['paul7b',['this_is_for_paul_to_ask','paul_should_do_this_i']],carry=id=>invOf(SI).includes(id);
  if(inTar()){
    if(!F.silas)return b?['wit7b',['i_was_no_party_to_that_dispute','i_should_talk_to_reuben']]
      :G.tried?['wit7',['he_asks_for_a_second_witness','silas_should_talk_to_reuben']]
      :['reu7',['reuben_is_a_careful_man','i_should_talk_to_reuben_said']];
    if(!F.read)return['read7',['in_antioch_the_whole_group',
      (b?carry('letter'):!carry('letter'))?'i_should_give_the_letter':b?'paul_carries_the_letter':'silas_has_the_letter']];
    return['north7',['tarsus_is_of_one_mind_again','we_can_leave_by_the_gate']]}
  if(inGates()){
    if(!F.mended)return b?craft:!F.strap?['strap7',['seam_i_can_close','i_should_talk_to_zenon']]
      :['mend7',['leather_an_awl_and_thread','i_should_use_the_yoke_strap']];
    if(!F.up)return b?(holding()?['pitch7b',['i_have_the_line','paul_can_use_the_tent_now']]:['line7b',['paul_cannot_hold_a_tent','i_should_use_the_tent_and_take']])
      :holding()?['pitch7',['silas_has_the_windward_line','i_can_use_the_tent_now']]
      :['line7',['tent_goes_up_in_a_wind','silas_should_use_the_tent']];
    if(!F.cased)return b?craft:!F.sewn?['case7',['papyrus_and_rain','i_should_use_my_awl_on_the_goat']]
      :!F.tallow?['tallow7',['cloth_case_keeps_out_dust','i_should_talk_to_zenon_said']]
      :['proof7',['case_that_drinks_water','i_should_use_the_tallow']];
    return['derbe7',['family_is_dry_and_so_is','we_can_go_on_through_the_cilician']]}
  if(inLys()){
    if(!F.readL)return['readL7',['decrees_are_for_every_congregation',(b?carry('letter'):!carry('letter'))?'i_should_give_the_letter_to_myron':b?'paul_should_give_the_letter_to_myron':'silas_has_the_letter_said']];
    if(heard())return b?his:['ask7',['four_witnesses_in_two_cities','i_should_talk_to_timothy_said']];
    if(!F.eld)return b?his:['eld7',['man_goes_by_what_his_eyes','i_should_talk_to_myron']];
    if(!F.fam)return b?his:['fam7',['elders_see_him_in_the_congregation','i_should_talk_to_eunice_said']];
    return['ico7',['lystra_has_spoken','we_can_leave_by_the_door_to']]}
  if(!F.readI)return['readI7',['iconium_must_have_the_decrees',(b?carry('letter'):!carry('letter'))?'i_should_give_the_letter_to_nathan':b?'paul_should_give_the_letter_to_nathan':'silas_has_the_letter_he']];
  if(!F.nat)return b?his:['nat7',['why_should_a_congregation','i_should_talk_to_nathan_said']];
  if(!F.tat)return b?his:['tat7',['tatia_has_watched_him_come_and_go','i_should_talk_to_tatia_said']];
  return['back7',['two_cities_and_one_account_of_him','we_can_leave_by_the_south']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_eunice']};
/* Birds (shared/birds.js): gulls over the harbors, birds of prey, swallows and larks over open country, sparrows and doves on the
   roofs and walls of the towns; by day and in fair weather only. Scenery: they change nothing in the story. */
ROOMS.tarsus7.birds={perch:[{k:'sparrow',y:37,x:[150,160,172]},{k:'dove',y:6,x:[40,58],d:[1,-1]}]};
ROOMS.iconium7.birds={perch:[{k:'sparrow',y:20,x:[100,110,122]},{k:'dove',y:31,x:[321,347.5],d:[1,-1]}]};
const BIRDS_ANTIOCH={perch:[{k:'sparrow',y:36,x:[30,40,52]},{k:'dove',y:36,x:[290,304],d:[1,-1]}]};

return{acting:ACTING,rooms:['tarsus7','gates','lystra7','iconium7'],setup:setup7,start:start7,hint:hint7,music:MUSIC,scenes:{antioch:antiochScene,council:councilScene},topics:TOPICS,tablets:TABLETS,
  /* Tarsus, the Gates and the cities of Lycaonia lie in the map's northern window. This journey is drawn on its own, as Chapter Four's was:
     the road from Antioch, by the Syrian Gates to Tarsus, over the Taurus by the Cilician Gates to Derbe and Lystra, and on to Iconium. */
  view:'north',labels:LABELS,
  route:[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium','new']],
  places:{
    antioch:{room:'-',if:()=>false,no:'antioch_commended_us_to_the_undeserved'},
    syriangates:{room:'-',if:()=>false,no:'syrian_gates_lie_behind'},
    tarsus:{room:'tarsus7',x:150,y:124,dir:1,if:()=>false,no:()=>say(PC(),inGates()?'back_down_to_tarsus':'tarsus_has_its_letter_and_its_peace')},
    ciliciangates:{room:'gates',x:226,y:127,dir:1,if:inTar,no:'gates_are_behind_us_and_i'},
    /* Derbe is passed on the way: the road from the Gates comes to it first, and runs on to Lystra, where the story stops (see arrive7) */
    derbe:{get room(){return inGates()?'lystra7':'-'},x:236,y:124,dir:-1,if:inGates,no:()=>say(PC(),inTar()?'derbe_lies_beyond_the_taurus':'derbe_has_its_letter_and_zenon')},
    lystra:{room:'lystra7',x:236,y:124,dir:-1,if:inIco,no:'lystra_lies_beyond_derbe'},
    iconium:{room:'iconium7',x:420,y:124,dir:-1,if:()=>inLys()&&!(F.nat&&F.tat),no:()=>say(PC(),inLys()?'iconium_has_had_its_letter_said':'iconium_lies_beyond_lystra')}},
  way:()=>[['antioch','syriangates'],['syriangates','tarsus']].concat(inTar()?[]:[['tarsus','ciliciangates']],inLys()||inIco()?[['ciliciangates','derbe'],['derbe','lystra']]:[],inIco()||(inLys()&&(F.readI||F.nat||F.tat))?[['lystra','iconium']]:[]),arrive:arrive7,
  flags:['silas','read','strap','mended','line','up','sewn','tallow','cased','readL','eld','fam','readI','nat','tat','psalm'],
  /* nine characters: 19 flags, two bits for each man's room, one for who is played, and twelve for who carries what */
  codeBits:{share:12},party:['paul','silas'],home:{sstaff:'silas'},share:['awl','thread','knife','tablets','letter','sstaff','strap','cloth7','pcase','tallow'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets','letter'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.strap&&!F.mended,'strap');add(F.up&&!F.sewn,'cloth7');add(F.sewn&&!F.cased,'pcase');add(F.tallow&&!F.cased,'tallow');inv.push('sstaff');return inv},
  place:place7}
});

