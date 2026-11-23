/* Paul of Tarsus: level data for Chapter Eleven, "The Unknown God".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Athens (Acts 17:16-34): Paul waits there alone; the city is full of idols; he reasons in the synagogue and every day in the
   marketplace; Epicurean and Stoic philosophers take him on and lead him to the Areopagus; he speaks there, beginning from an altar
   of theirs; some scoff, some put it off, and some join him. Acts does not say how long he waited or where he lodged, what he said in
   the synagogue, where the altar stood or what else he looked at, what the philosophers argued, whether he was taken to the hill or to
   a sitting of the council elsewhere, which poets he meant, where Damaris stood, or whether Silas and Timothy reached him there: the
   chapter claims none of it, and its end screen says so. Luke is not there, so the narration says "he" and "they".
   What the account itself says is told by the narrator, in paraphrase with its reference, and never put into a mouth as a quotation:
   those lines stand together in TOLD below. The passages on Paul's tablets are notes in his own words (PS).
   Bearing Thorough Witness (chapter 18, paragraph 12) names three things Paul did on the hill: he taught what the Scriptures teach
   without quoting them, he said "we", and he drew on writers the Athenians respected. So in this chapter the tablets stay shut. What
   the speech begins from is gathered in the city, grain by grain (GRAIN): the study note on Acts 17:18 says that the word behind
   "chatterer" means a picker-up of seeds.
   Athens is shown as it stood (CONTRIBUTING section 3, the exception for Athens, Ephesus and Rome): temples from outside, altars as
   inscribed blocks, statues as draped figures. No rite is shown, nothing is unclothed, and Paul admires none of it. */
LEVEL(11,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A scale that no earlier chapter has used: a minor third with a raised fourth, from F sharp, in bars of twelve steps. On the road and
   in the streets (mood "calm") a lyre and a low string. In the marketplace (mood "market") a reed pipe plays short tunes that begin,
   break off and begin again as something else (NEW), for a city that wants only what is new. On the second walk (mood "walk") the same
   notes slowly, one voice over a low drone. In the painted colonnade two tunes that do not fit: a lyre in even twos at one end (mood
   "stoic"), a pipe that sways in threes at the other (mood "epic"), and both where Paul stands between them (mood "both"). On the hill
   (mood "hill") one low note and the wind; while he speaks nothing else plays, and each part of the speech that holds adds one plucked
   note to a chord (ring11). The last part is spoken into silence. Nothing is claimed about how music was played in Paul's day. */
const _=null,SCALE=[0,2,3,6,7,9,10],
 NEW=[[[0,0,2],[2,2,1],[3,4,3]],[[0,6,2],[2,5,1],[3,4,2],[6,2,3]],[[0,4,1],[1,5,1],[2,4,1],[3,2,3]],[[6,7,2],[8,6,1],[9,4,3]],
  [[0,2,3],[3,3,3]],[[0,7,1],[1,6,1],[2,4,1],[3,5,1],[4,4,2]],[[0,0,2],[3,1,2],[6,2,2]],[[0,4,6]]],
 SLOW=[[[0,0,6],[6,2,6]],[[0,4,12]],[[0,6,6],[6,5,6]],[[0,4,6],[6,2,6]],[[0,2,6],[6,3,6]],[[0,4,12]],[[0,0,6],[6,1,6]],[[0,2,12]]],
 SWAY=[[[0,3,3],[3,5,2],[5,6,1],[6,5,3]],[[0,3,4],[4,1,2],[8,3,4]],[[0,6,3],[3,5,3],[6,3,6]],[[2,1,2],[4,3,2],[6,1,6]]],
 MUSIC={dt:.17,steps:12,root:54,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['calm','market'],prog:'AABAACAB',len:3,seq:{A:[0,_,_,4,_,_,2,_,_,4,_,_],B:[3,_,_,6,_,_,4,_,_,6,_,_],C:[1,_,_,4,_,_,2,_,_,5,_,_]}},
  {inst:'bass',moods:['calm','market'],prog:'AABAACAB',len:5,seq:{A:[-7,_,_,_,_,_,-3,_,_,_,_,_],B:[-4,_,_,_,_,_,-7,_,_,_,_,_],C:[-6,_,_,_,_,_,-3,_,_,_,_,_]}},
  {drum:1,moods:['market'],prog:'AAAB',seq:{A:'d..t..d.tt..',B:'d..t..d.t.k.'},vol:.7},
  {inst:'aulos',moods:['market'],loop:8,oct:12,lines:NEW,vol:.85},
  {inst:'ney',moods:['walk'],loop:8,oct:12,lines:SLOW,vol:.8},
  {drone:[0],every:24,moods:['walk'],vol:.35},
  {inst:'harp',moods:['still','rest'],prog:'AB',len:6,oct:12,vol:.6,seq:{A:[0,_,_,_,_,_,4,_,_,_,_,_],B:[2,_,_,_,_,_,5,_,_,_,_,_]}},
  {inst:'lyre',moods:['stoic','both'],prog:'AB',len:2,vol:.9,group:[2],seq:{A:[0,_,2,_,4,_,0,_,2,_,4,_],B:[0,_,2,_,4,_,7,_,4,_,2,_]}},
  {inst:'aulos',moods:['epic','both'],loop:4,oct:12,lines:SWAY,vol:.8},
  {drone:[0],every:24,moods:['hill'],vol:.6}]};
/* ring11: on the hill, the parts of the speech that have held so far, as a chord of plucked notes: one more for each */
const ring11=n=>{if(AU.ctx)[0,2,4,7,9,11].slice(0,n).forEach((d,i)=>INST.harp(mtof(note(d,0,MUSIC)),now()+.03+i*.1,.6,.85))};
/* the stonecutter's yard: a mallet on a chisel, a few strokes and a pause */
const CALLS={chisel:[1.2,3.6,(t,d)=>{const n=3+(Math.random()*4|0);for(let i=0;i<n;i++){noise({t:t+i*.21,d:.025,v:.07,f:4200,q:3,dest:d});tone({f:1900+Math.random()*120,t:t+i*.21,d:.05,type:'triangle',v:.02,dest:d})}}]};

/* ============ ART ============ */
const SH='#8f95c8',MAR='#e2dac6',BRZ='#6f8a6a';
/* The shared materials (shared/materials.js): quiet grain on wood, two-tone cracks set by hand, soft contact shadows, earth colors.
   This chapter has an earth() of its own, the trodden road, so the shared one is earth11 here. */
const{plank:plank11,board:board11,crack:crack11,skipCracks:skipCracks11,shadow:shadow11,earth:earth11}=SHARED.materials;
/* SKY11: a sky drawn a little toward its own grey, so that it sits among the earth and mineral colors of the stone */
const SKY11=st=>st.map(c=>earth11(c,.14));
/* sunlight11: the light of a clear day in Athens, high and from the left: the sky and the far country keep it full, what faces the sun
   takes it in soft pools (pools: [x, y, rx, ry, strength]), and the near ground falls off a little toward us. top: where the sky's full
   light ends. more(l): what else the room's light holds (a lane in shade, the inside of a lean-to). */
function sunlight11(g,w,top,pools,more){lightmap(g,w,'#e4e0e8',l=>{R(l,0,0,w,top,'#ffffff');l.fillStyle=lg(l,0,top,0,top+20,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,top,w,20);
  for(const[x,y,rx,ry,a]of pools)pool(l,x,y,rx,ry,'#fff6e6',a);if(more)more(l);
  comp(l,'multiply',1,()=>{ao(l,0,96,w,10,'b',.08,'#4a4468');ao(l,0,126,w,18,'b',.16,'#4a4468')})})}
/* footShade11: the shade at the foot of a wall or a row of things, laid on the ground in three passes of alpha (a wide faint one, the
   body, a darker core), so that its edge is soft: from x0 to x1 at y, d deep, leaning dx toward the right as it comes forward */
function footShade11(g,x0,x1,y,d,a,dx){dx=dx||0;for(const[k,al]of[[1.4,.3],[1,.4],[.6,.45]])shade(g,[x0,y,x1,y,x1+dx*k,y+d*k,x0+dx*k,y+d*k],SH,a*al)}
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr, lit}]. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,o.lit||lit,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),o.sw==null?7.5:o.sw)})}
/* col: one column. A shaft that narrows a little toward its top, with a few flutes; a capital hardly wider than the shaft, and taller
   than it is wide of the shaft, so that the column never reads as a post under a bar. shade darkens one that stands in a back row. */
function col(g,x,y,h,w,c,o){o=o||{};const s=o.shade||0,n=o.fl||3;
  poly(g,[x-w/2,y,x+w/2,y,x+w*.43,y-h,x-w*.43,y-h]);g.fillStyle=lg(g,x-w/2,0,x+w/2,0,[tint(c,-.36-s),tint(c,.14-s),tint(c,-.04-s),tint(c,-.44-s)]);g.fill();
  for(let i=1;i<n;i++)R(g,x-w/2+w*i/n,y-h+1,.5,h-2,'rgba(40,30,50,.16)');
  if(!o.plain){const ch=Math.max(1.5,w*.5);R(g,x-w*.43-.5,y-h-ch,w*.86+1,ch,tint(c,-.08-s));R(g,x-w*.43-.5,y-h-ch,w*.86+1,.5,tint(c,.26-s));R(g,x-w/2-.5,y-1,w+1,1,tint(c,-.22-s))}}
/* temple: a small temple from outside. A row of columns under a deep beam and a gable, on two steps; side: its long flank running
   back, in shade, under a tiled roof. The beam and the gable span the whole front, so that it reads as a building. */
function temple(g,x,y,w,n,ch,c,o){o=o||{};const s=o.side||0,eh=Math.max(1.5,ch*.22),ph=o.ped==null?w*.17:o.ped,cw=Math.max(1,w/(n*2.05)),RO='#b9744e';
  if(s){const x0=s>0?x+w:x+s,ws=Math.abs(s),cs=mix(tint(c,-.3),'#6a70a8',.3),m=Math.max(3,Math.round(ws/(cw*2.7))),ax=x+w/2+s;
    R(g,x0,y-ch-eh,ws,ch+eh,tint(cs,-.34));for(let i=0;i<m;i++)col(g,x0+(i+.5)*ws/m,y,ch,cw*.9,cs,{plain:1,fl:2});
    R(g,x0,y-ch-eh,ws,eh,tint(cs,.06));R(g,x0,y-ch-eh,ws,.5,tint(cs,.2));
    poly(g,s>0?[x+w/2,y-ch-eh-ph,ax,y-ch-eh-ph,x+w+s+1,y-ch-eh,x+w,y-ch-eh]:[x+w/2,y-ch-eh-ph,ax,y-ch-eh-ph,x+s-1,y-ch-eh,x,y-ch-eh],mix(RO,'#6a70a8',.34));
    for(let i=1;i<m*2;i++){const k=i/(m*2),xa=x+w/2+s*k;stroke(g,[xa,y-ch-eh-ph,(s>0?x+w:x)+s*k,y-ch-eh],'rgba(40,24,30,.22)',.4)}
    R(g,x0,y,ws,1.2,tint(cs,-.1))}
  R(g,x,y-ch-eh,w,ch+eh,tint(c,-.56));for(let i=0;i<n;i++)col(g,x+(i+.5)*w/n,y,ch,cw,c,{fl:2});
  R(g,x-.5,y-ch-eh,w+1,eh,tint(c,.02));R(g,x-.5,y-ch-eh,w+1,.5,tint(c,.3));R(g,x-.5,y-ch-.6,w+1,.6,tint(c,-.3));
  poly(g,[x-1,y-ch-eh,x+w+1,y-ch-eh,x+w/2,y-ch-eh-ph],tint(c,-.04));poly(g,[x+2,y-ch-eh-.9,x+w-2,y-ch-eh-.9,x+w/2,y-ch-eh-ph+1.3],tint(c,-.26));
  stroke(g,[x-1,y-ch-eh,x+w/2,y-ch-eh-ph,x+w+1,y-ch-eh],tint(c,.32),.6);
  R(g,x-1.5,y,w+3,1.2,tint(c,-.08));R(g,x-2.6,y+1.2,w+5.2,1.2,tint(c,-.22))}
/* acropolis: the rock of Athens from a distance, sheer on its sides and level on top: its wall, the temple of Athena (the Parthenon),
   a smaller temple beside it, and between them the bronze figure with helmet and shield that stood in the open air. k: the scale. */
function acropolis(g,cx,base,k,r,o){o=o||{};const top=base-32*k,RC=o.rock||'#b9a585',
   P=[cx-62*k,base,cx-55*k,base-9*k,cx-50*k,base-21*k,cx-45*k,top+4*k,cx-38*k,top+1*k,cx+36*k,top,cx+43*k,top+3*k,cx+48*k,base-19*k,cx+55*k,base-8*k,cx+63*k,base];
  poly(g,P);g.fillStyle=lg(g,cx-60*k,0,cx+60*k,0,[tint(RC,-.3),tint(RC,.08),RC,tint(RC,-.22)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{for(let i=0;i<60*k;i++){const x=cx-56*k+r()*112*k,y0=top+3*k+r()*20*k;R(g,x,y0,.5,3+r()*9*k,r()<.5?'rgba(60,44,40,.2)':'rgba(255,244,214,.14)')}
    ao(g,cx-62*k,base-9*k,126*k,9*k,'b',.3,'#5a5a3a');tex(g,'mott',.3,cx-62*k,top,126*k,34*k,'overlay',.6)});
  for(let i=0;i<9;i++)foliage(g,cx-56*k+i*14*k+r()*4,base-1-r()*3*k,5*k,2.2*k,'#6a7c4a',r,14);
  R(g,cx-40*k,top-2.6*k,80*k,3.4*k,tint(RC,.16));R(g,cx-40*k,top-2.6*k,80*k,.6,tint(RC,.38));R(g,cx-40*k,top+.4*k,80*k,.5,tint(RC,-.3));
  temple(g,cx-34*k,top-2.6*k,9*k,4,5.2*k,'#e4d8bc',{side:8*k});
  temple(g,cx-3*k,top-2.6*k,13*k,6,8.4*k,'#ece0c4',{side:22*k});
  /* the bronze figure: a body, a helmeted head and a round shield at its side. Each part is more than a pixel across. */
  const ax=cx-15*k,ay=top-2.6*k;R(g,ax-2.2*k,ay-2.6*k,4.4*k,2.6*k,tint(RC,.2));R(g,ax-1.3*k,ay-9.6*k,2.6*k,7*k,BRZ);R(g,ax-1.3*k,ay-9.6*k,.8*k,7*k,tint(BRZ,.3));
  R(g,ax-1.1*k,ay-12.2*k,2.2*k,2.6*k,tint(BRZ,.1));R(g,ax-1.4*k,ay-13.2*k,2.8*k,1.2*k,tint(BRZ,-.2));oval(g,ax+2.4*k,ay-6*k,1.5*k,2.2*k,tint(BRZ,-.1));oval(g,ax+2.2*k,ay-6.2*k,.9*k,1.4*k,tint(BRZ,.3))}
/* zeus: the temple of Zeus as it stood in Paul's day, begun centuries before and not finished for another eighty years: two rows of
   very tall columns on their steps, and no roof. No beam lies across any two of them. Drums and blocks lie about, grown over. */
function zeus(g,x,y,k,r){const C='#e8dec6',h=38*k,w=3.6*k;
  for(let i=0;i<3;i++){R(g,x-7*k+i*2*k,y-(i+1)*1.5*k,98*k-i*4*k,1.5*k,tint(C,-.14-i*.03));R(g,x-7*k+i*2*k,y-(i+1)*1.5*k,98*k-i*4*k,.5,tint(C,.16))}
  for(let i=0;i<8;i++)if(i!==2)col(g,x+5*k+i*10.8*k,y-4.5*k-1.6*k,h*.94,w*.86,C,{shade:.24,fl:2});
  for(const[dx,dw]of[[32,5],[65,4]]){oval(g,x+dx*k,y-5.6*k,dw*k,1.5*k,tint(C,-.3));R(g,x+(dx-dw)*k,y-8*k,dw*2*k,2.4*k,tint(C,-.12));oval(g,x+dx*k,y-8*k,dw*k,1.4*k,tint(C,.1))}
  for(let i=0;i<9;i++){if(i===3||i===6)continue;col(g,x+i*10.4*k,y-4.5*k,i===7?h*.46:h,w,C,{fl:3,plain:i===7})}
  for(let i=0;i<7;i++)foliage(g,x+r()*86*k,y-4.4*k+r()*1.4,3.4*k,1.3*k,'#7c8a52',r,8)}
/* marks: letters on a stone that is too small to show them, as short cut strokes of uneven length. The strokes of one row stand between
   those of the row above it, so that no four of them leave a plus sign in the gap. */
function marks(g,x,y,w,rows,r){for(let j=0;j<rows;j++){let i=j%2?1.1:0;while(i<w-1){const l=1.2+r()*1.5;R(g,x+i,y+j*2.1,Math.min(l,w-i),.9,'rgba(70,56,44,.55)');i+=l+.9}}}
/* base: the block a statue or an altar stands on: dressed stone with a moulding at its top and its foot */
function base(g,x,y,w,h,c){shadow11(g,x+w/2+2,y+.3,w/2+1.5,Math.max(1,w*.06),.42,'#282040');g.fillStyle=lg(g,x,0,x+w,0,[tint(c,-.26),tint(c,.14),c,tint(c,-.34)]);g.fillRect(x,y-h,w,h);
  R(g,x-1,y-h,w+2,1.6,tint(c,.1));R(g,x-1,y-h,w+2,.5,tint(c,.36));R(g,x-1,y-h+1.6,w+2,.5,tint(c,-.34));R(g,x-1,y-1.6,w+2,1.6,tint(c,-.14));R(g,x-1,y-1.6,w+2,.5,tint(c,.12));
  inRect(g,x,y-h,w,h,()=>{tex(g,'mott',.26,x,y-h,w,h,'overlay',.6);ao(g,x,y-h+2.1,w,Math.min(4,h*.2),'t',.16,'#3a3050');ao(g,x,y-1.6-Math.min(5,h*.25),w,Math.min(5,h*.25),'b',.14,'#3a3050')})}
/* feet11: the contact shadows of stones whose foot the ground was painted over: [x, y, w] each, as base() takes them */
function feet11(g,list){for(const[x,y,w]of list){shadow11(g,x+w/2+2,y+.3,w/2+1.5,Math.max(1,w*.06),.42,'#282040');ao(g,x-1,y-2.6,w+2,2.6,'b',.14,'#2a2440')}}
/* statue: a draped figure in marble or bronze on its base, painted as the people are (the look says stone:1). No arm is stretched out. */
function statue(g,x,y,bh,id,dir,o){o=o||{};base(g,x-8,y,16,bh,o.base||'#cfc3a6');man(g,x,y-bh+.5,id,dir,0,o.lit,o.ges,0)}
const olive=(g,x,y,s,r)=>{stroke(g,[x,y,x-.6*s,y-5*s,x+1*s,y-9*s],'#5a4a36',1.6*s);stroke(g,[x-.4*s,y-5*s,x-3*s,y-9*s],'#5a4a36',1*s);foliage(g,x,y-12*s,8*s,5*s,'#7a8e62',r,60*s);foliage(g,x+3*s,y-10*s,5*s,3.4*s,'#8a9c70',r,24*s)};
/* earth: a road of trodden earth and small stones, lighter where it is most walked */
function earth(g,x0,y0,x1,y1,c,r){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x0,y0,x1-x0,y1-y0);
  inRect(g,x0,y0,x1-x0,y1-y0,()=>{tex(g,'mott',.34,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'grain',.16,x0,y0,x1-x0,y1-y0,'overlay',.5);
    for(let i=0;i<(x1-x0)*.5;i++){const k=r(),y=y0+k*(y1-y0),x=x0+r()*(x1-x0);R(g,x,y,1+k*2.4,.5+k*.6,r()<.5?tint(c,-.24):tint(c,.2))}
    for(let i=0;i<6;i++){const y=y0+6+r()*(y1-y0-10);stroke(g,[x0,y,x0+(x1-x0)*.3,y+(r()-.5)*3,x0+(x1-x0)*.7,y+(r()-.5)*3,x1,y+(r()-.5)*2],'rgba(70,52,36,.12)',1)}})}

/* statues: draped figures in one material, with blank eyes. They are looks like any other, so that the figure painter draws them. */
const stone=(c,o)=>Object.assign({skin:c,hair:tint(c,-.06),tunic:tint(c,.03),cloak:tint(c,-.05),brow:tint(c,-.2),long:1,himation:1,stone:1,ph:0},o);
Object.assign(LOOK,{
  st11gen:stone(BRZ,{helm:tint(BRZ,-.12),beard:tint(BRZ,-.1)}),st11scr:stone(MAR,{beard:tint(MAR,-.06)}),st11old:stone(MAR,{bald:1,longBeard:1,beard:tint(MAR,-.06)}),
  st11maim:stone(MAR,{stub:1}),st11brz:stone(BRZ,{beard:tint(BRZ,-.1)}),st11her:stone('#d8cfb8',{beard:tint('#d8cfb8',-.06)}),
  st11god:stone('#cfc8b4',{veil:'#cfc8b4',himation:0,cloak:null,longSleeve:1}),st11seat:stone('#b8b09c',{beard:tint('#b8b09c',-.08),longBeard:1})});

/* ---------- The road up from the harbor ---------- */
/* A road of trodden earth between altars and monuments (Insight, "Athens", tells of a traveller who saw altars to gods called
   unknown, and to heroes, on the road from the harbor at Phaleron). Ahead, the rock of the Acropolis with its temples; beside the road
   the columns of the temple of Zeus, without a roof; at the far end the wall and the gate of the city. */
ART.road11={w:640,q:12,
 paint(g){const r=rng(1101),W='#cdb98e';
  sky(g,640,72,SKY11(['#4a86c8','#86b2dc','#cfe0ea','#efe6cc']));cloud(g,90,14,60,5,r);cloud(g,300,9,44,4,r);cloud(g,570,16,46,4,r);
  ridge(g,0,640,72,x=>11+7*Math.sin(x/53+1)+4*Math.sin(x/17),['#9aa8b8','#a9b2aa']);
  R(g,0,66,640,40,'#b3a878');acropolis(g,452,72,.84,r);
  ridge(g,0,640,106,x=>31+4*Math.sin(x/41)+2.4*Math.sin(x/13+2)-(x>520?(x-520)*.05:0),['#bcb07e','#a99c66','#978a54']);
  for(const[x,y,s]of[[28,84,1],[150,80,.8],[214,82,.9],[372,80,.8],[410,84,1],[522,82,.9]])olive(g,x,y,s,r);
  for(const[x,y,h]of[[60,80,13],[68,81,10],[392,79,12]])cypress(g,x,y,h);
  zeus(g,244,82,.92,r);
  /* the wall of the city, and its gate */
  ashlar(g,548,50,92,56,W,r,{bw:13,bh:6,v:.1});for(let i=552;i<636;i+=10){R(g,i,46,6,4.4,tint(W,.06));R(g,i,46,6,.6,tint(W,.3))}
  R(g,590,62,36,44,tint(W,-.22));arch(g,594,66,28,40);g.fillStyle=lg(g,0,66,0,106,['#5a6a8a','#8a8478','#b0a080']);g.fill();
  g.save();arch(g,594,66,28,40);g.clip();R(g,594,88,28,18,'#b8a888');R(g,600,78,9,10,'#d8caa4');R(g,611,74,8,14,'#c8b890');R(g,600,78,9,.6,'#f0e4c0');ao(g,594,66,28,10,'t',.5);ao(g,594,66,6,40,'l',.4);g.restore();
  ao(g,548,50,6,56,'l',.18,'#2a2440');ao(g,548,92,92,14,'b',.16,'#2a2440');
  /* altars and monuments along the roadside: plain blocks, each with a band of cut letters; two carry a figure */
  const AL=[[66,15,23,'#cbbf9f'],[90,17,27,'#d8ceb2'],[116,14,21,'#c2b596'],[164,16,25,'#d2c6a6'],[188,15,22,'#c8bc9c'],[212,17,28,'#dcd2b6'],[238,14,20,'#c6ba9a'],[346,16,24,'#cabe9e'],[494,15,22,'#c4b898']];
  for(const[x,w,h,c]of AL){base(g,x,106,w,h,c);marks(g,x+2.5,106-h*.62,w-5,2,r)}
  statue(g,142,106,10,'st11her',1);statue(g,322,106,11,'st11brz',-1);
  earth(g,0,105,640,144,'#c9b58a',r);ao(g,0,105,640,5,'t',.3,'#4a4460');
  /* the shade at the foot of the city wall, and of each stone by the road, laid on the road in soft steps */
  footShade11(g,548,640,105,8,.4,-6);feet11(g,AL.map(([x,w])=>[x,106,w]).concat([[134,106,16],[314,106,16]]));
  for(let i=0;i<34;i++){const x=r()*640;foliage(g,x,106+r()*2,3+r()*3,1.2,'#8a9458',r,8)}
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,105,640,39)});
  /* the light of the day: the sky and the far country keep it full; the rock and its temples, the columns of Zeus, the stones by the
     road and the wall of the city take the sun; the gateway and the near road lie a little in shade */
  sunlight11(g,640,62,[[452,58,90,22,.5],[290,66,80,22,.5],[160,92,120,14,.55],[420,94,100,12,.45],[590,76,56,34,.45],[320,118,330,16,.55]],
    l=>{l.fillStyle='#ffffff';l.fillRect(0,56,540,16);comp(l,'multiply',1,()=>R(l,594,66,28,40,'#d4d0e2'))});
  pool(g,200,0,300,150,'#fff4d6',.1,'screen')},
 light:null,
 /* while the slave rests by the road, what he carries lies on a stone beside him: a folded robe, and a covered dish */
 draw(g){if(SL.room!=='road11')return;depth(109,()=>{R(g,404,108,16,1.6,'rgba(40,30,60,.3)');poly(g,[402,108,420,108,418,100,405,99.4],'#a89e86');poly(g,[405,99.4,418,100,417,101.4,405.4,100.8],'#d2c8ae');
   g.fillStyle=lg(g,0,95,0,100,['#f0e6cc','#d8cdb0','#a89c80']);g.fillRect(404.6,95.4,7.4,4.2);for(let i=0;i<2;i++)R(g,404.6,96.8+i*1.4,7.4,.5,'rgba(90,76,56,.4)');
   vessel(g,415.6,100,2.6,2.4,'#b06a3a','bowl',{noShadow:1});R(g,413.2,96.6,4.8,1.2,'#8a6a4a');R(g,413.2,96.6,4.8,.5,'#b8946a')})},
 front(){}};

/* ---------- The streets of Athens ---------- */
/* A street of plastered houses with a fountain at its end, and at every corner a figure in bronze or marble: a city full of idols
   (Acts 17:16). Between the houses four lanes lead off. The figures are statues of men, of the kind The Watchtower of July 15, 1998,
   calls monuments to heroes; each is only "a statue" until it is looked at. Over the roofs stands the Acropolis. */
const LANES=[[160,'a'],[250,'b'],[340,'d'],[430,'c']];
ART.street11={w:640,q:12,
 paint(g){const r=rng(1103),rc=rng(1123);
  sky(g,640,60,SKY11(['#4a86c8','#86b2dc','#d2e2ea']));cloud(g,120,10,50,4,r);cloud(g,520,14,44,4,r);
  acropolis(g,330,50,.7,r);
  /* house fronts, with a lane between each two */
  const H=[[0,160,'#e2d4b0',30],[190,60,'#d8c8a2',26],[280,60,'#e6dabb',32],[370,60,'#dccca6',28],[460,150,'#e0d2ae',30]];
  /* the plaster's random cracks are set by hand now, high on the walls where they run to no head; their draws are still taken */
  for(const[x,w,c,top]of H){house(g,x,top,w,104-top,c,r,{patch:2,cracks:0,beams:14});skipCracks11(r,3);R(g,x,top-3.5,w,1.6,'#b8603c');for(let i=x;i<x+w;i+=4)R(g,i,top-3.5,.5,1.6,'rgba(90,40,24,.35)')}
  /* each lane: a house at its far end, the ground running back to it, and the walls on either side in shade */
  for(const[x]of LANES){const c=tint('#d8caa6',(r()-.5)*.12);R(g,x,56,30,48,c);R(g,x,56,30,1.2,'#b8603c');R(g,x+18,66,5,5,'#3a2c22');R(g,x+7,76,8,14,'#4a3624');R(g,x+7,76,8,.6,'#7a5c36');
    poly(g,[x,104,x+30,104,x+22,90,x+8,90],'#c2b594');poly(g,[x,26,x+8,56,x+8,90,x,104],'#8f8aa0');poly(g,[x+30,26,x+22,56,x+22,90,x+30,104],'#a09aa6');
    ao(g,x,56,30,12,'t',.3,'#2a2440');comp(g,'multiply',.5,()=>R(g,x,56,30,48,'#a8a4c4'))}
  for(const[x,y,n]of[[66,33,3],[150,34,3],[244,30,3],[336,36,2],[424,32,3],[488,34,3],[592,35,3]])crack11(g,x,y,n,rc,.9);
  windowArt(g,26,48,12,10,'#e2d4b0',{shut:1});windowArt(g,104,46,12,10,'#e2d4b0',{bars:2});windowArt(g,208,50,10,9,'#d8c8a2',{shut:1});windowArt(g,300,52,10,9,'#e6dabb',{bars:2});windowArt(g,388,50,10,9,'#dccca6',{shut:1});
  windowArt(g,468,50,12,10,'#e0d2ae',{shut:1});doorArt(g,554,62,24,42,'#6a4a2c',r,{bands:[]});
  /* the street runs on to the marketplace: the last house ends, and beyond its corner the way lies open in the sun */
  {const c='#e8dcbc';R(g,620,64,20,28,tint(c,.04));R(g,620,61,20,3,'#b8603c');for(let i=620;i<640;i+=4)R(g,i,61,.5,3,'rgba(90,40,24,.35)');ao(g,620,64,20,6,'t',.25,'#2a2440');
   /* a stall of the marketplace at the far end: a cloth awning over a counter, and baskets on it */
   R(g,621,82,19,10,'#9a7a4a');R(g,621,82,19,.8,'#c8a874');R(g,621,88,19,4,'#7a5c36');
   poly(g,[620,72,640,72,640,77,620,78],'#b8563a');R(g,620,72,20,.8,'#d8826a');for(let i=620;i<640;i+=4)poly(g,[i,77.6,i+4,77.4,i+2,79.4],'#a04a32');
   ao(g,621,79,19,3,'t',.4,'#2a2040');R(g,623,79.6,5,2.6,'#c89a4c');R(g,623,79.6,5,.6,'#e8c070');R(g,630,79.4,5,2.8,'#8a6a3a');R(g,630,79.4,5,.6,'#b8945a');R(g,636,80,4,2.2,'#a8642e');
   comp(g,'screen',.3,()=>R(g,620,58,20,34,'#dfe8ee'));
   poly(g,[610,104,640,104,640,92,620,92],'#ddd0aa');poly(g,[610,26,620,58,620,92,610,104],'#8f8aa0');R(g,610,26,1,78,tint('#e0d2ae',-.08))}
  /* the fountain: a basin of stone under a spout in the wall */
  R(g,44,78,30,26,tint('#e2d4b0',-.16));R(g,48,82,22,12,'#5a5248');R(g,53.6,86,6,2.6,'#8a7a5a');R(g,58.2,88.6,1.4,9.4,'rgba(200,230,240,.8)');
  R(g,42,104,36,2,'rgba(40,30,60,.3)');g.fillStyle=lg(g,42,0,76,0,['#9a9484','#dcd4c0','#bcb4a0','#7e786c']);g.fillRect(42,96,34,9);R(g,42,96,34,1,'#eee8d8');R(g,44,97,30,1.6,'#6a9ab0');
  /* the figures, each on its base against a wall */
  statue(g,138,104,11,'st11gen',1);statue(g,226,104,11,'st11scr',1,{ges:1});poly(g,[235.2,62.4,238,59.4,239.2,60.4,236.4,63.4],MAR);stroke(g,[235.2,62.4,238,59.4],tint(MAR,.3),.5);
  statue(g,316,104,11,'st11old',-1);statue(g,406,104,11,'st11maim',-1);statue(g,502,104,11,'st11brz',1);statue(g,534,104,11,'st11brz',-1);
  pave(g,0,103,640,144,'#cdc09e',r,{vx:320,vy:60,rows:4,step:44,v:.07,t:.28});ao(g,0,103,640,6,'t',.35,'#3a3050');
  /* the shade at the foot of the houses, in soft steps; the stones and the basin stand on the paving; the jars stand on it too, so they
     are painted after it (the paving used to cover their feet) */
  ao(g,0,94,640,10,'b',.12,'#3a3050');footShade11(g,0,640,104,8,.34);
  feet11(g,[[42,105,34],...[138,226,316,406,502,534].map(x=>[x-8,104,16])]);
  for(const[x,c,k]of[[98,'#9a5a36','jar'],[204,'#8a4a2a','amph'],[384,'#a8642e','jar'],[598,'#9a5a36','pithos']])vessel(g,x,105,k==='pithos'?5:3.4,k==='pithos'?14:10,c,k);
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,640,41)});
  /* the light of the day: the sky and the rock keep it full, the house fronts and the figures before them take the sun in soft pools,
     the lanes between the houses lie in shade, and the open way to the marketplace is bright */
  sunlight11(g,640,52,[[80,60,80,30,.5],[220,62,40,26,.45],[310,64,40,26,.45],[400,62,40,26,.45],[535,62,80,30,.5],[628,80,22,26,.55],[320,118,330,16,.55]],
    l=>comp(l,'multiply',1,()=>{for(const[x]of LANES)R(l,x,50,30,56,'#dcd8e6')}))},
 light:null,
 draw(g,t){for(let i=0;i<3;i++){const k=((t/700+i*.33)%1);R(g,58.3,90+k*6,1.2,1.4,`rgba(230,246,250,${.7*(1-k)})`)}},
 front(){}};

/* niche: a lamp in a round-headed niche in a plastered wall. bench: a stone bench along a wall, in two tiers; the joints of each tier
   stop short of its edges, and those of the lower tier stand between those of the upper one. */
/* joists11: the ends of the ceiling joists over the wall plate, from x0 every step, each a short upright board with the soft shade of
   the ceiling beside it, and the plate along the top of the wall under them, with its shade on the plaster */
function joists11(g,w,x0,step,jw,jh,ph,r){R(g,0,0,w,jh,'#2e241c');ao(g,0,0,w,jh,'t',.4,'#0c0808');
  for(let i=x0;i<w;i+=step){ao(g,i-3,0,3,jh,'r',.3,'#0c0808');ao(g,i+jw,0,3,jh,'l',.3,'#0c0808');board11(g,i,0,jw,jh,'#5a4226',r,1)}
  board11(g,0,jh,w,ph,'#6a4e2c',r);R(g,0,jh+ph-.5,w,.6,'#2a1c12')}
function niche(g,x,y,W){arch(g,x,y,14,18,tint(W,-.32));arch(g,x+1.4,y+1.4,11.2,16.6,'#4a3828');R(g,x-1,y+17.6,16,1.6,tint(W,.16));R(g,x+3.6,y+15,6.4,2.6,'#b8733c');R(g,x+3.6,y+15,6.4,.6,'#e0a064');R(g,x+9.4,y+14.2,1.8,1.2,'#b8733c')}
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}

/* ---------- The synagogue of Athens ---------- */
/* A small house: benches along the wall, a reader's table, the chest of the scrolls. The windows have upright bars only. */
ART.syn11={w:320,q:12,
 paint(g){const r=rng(1105),rc=rng(1125),rw=rng(1135),W='#ddd0ac',ST='#c6bca2';
  /* the plaster's random cracks are set by hand now, high on the wall where they run to no head; their draws are still taken */
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:0,brick:'#b08a5a',t:.32});skipCracks11(r,4);
  joists11(g,320,16,40,6,8,2.4,rw);ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  for(const[x,y,n]of[[40,13,3],[160,12.6,3],[250,13.4,3],[296,13,2]])crack11(g,x,y,n,rc);
  /* the corners of the room and the foot of the wall */
  ao(g,0,10,10,94,'l',.3,'#2a2030');ao(g,310,10,10,94,'r',.3,'#2a2030');ao(g,0,94,320,10,'b',.22,'#2a2030');
  for(const x of[112,196]){R(g,x-2,24,18,20,tint(W,-.2));g.fillStyle=lg(g,0,26,0,42,['#9cc4e4','#dfe8e2']);g.fillRect(x,26,14,16);for(let i=1;i<3;i++)R(g,x+i*4.6-.4,26,.8,16,'#5a4a36');ao(g,x,26,14,4,'t',.4);R(g,x-3,44,20,1.6,tint(W,.2))}
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  bench(g,56,89,62,ST);bench(g,262,89,58,ST);niche(g,74,50,W);
  /* the reader's table, with one scroll on it; and the chest of the scrolls, under its cloth */
  board11(g,132,88,60,4,'#8a683a',rw);R(g,132,88,60,.7,'#c8a06a');R(g,132,91.6,60,.8,'#4a3420');ao(g,134,92.4,56,3,'t',.3,'#1a1420');board11(g,136,92,3,12,'#5a4226',rw,1);board11(g,185,92,3,12,'#5a4226',rw,1);
  R(g,152,86.4,16,1.8,'#e6dcc0');R(g,150,85.8,2.6,2.8,'#b89058');R(g,167.4,85.8,2.6,2.8,'#b89058');
  plank11(g,216,74,30,27,'#7a5632',rw);R(g,216,74,30,.8,'#b08a5a');R(g,245.4,74,.6,27,'#4a3420');ao(g,216,85,30,4,'t',.3,'#1a1420');R(g,216,100.6,30,.5,'#4a3420');R(g,218,101,3,3,'#4a3420');R(g,241,101,3,3,'#4a3420');
  g.fillStyle=lg(g,0,70,0,86,['#7a5a8a','#5f4470','#463058'].map(c=>earth11(c,.3)));g.fillRect(214,70,34,15);R(g,214,84,34,1.2,earth11('#c9a14a'));R(g,214,70,34,.8,earth11('#a88ab8',.3));for(let i=0;i<5;i++)R(g,218+i*7,71.6,.5,9.6+(i%2)*1.4,'rgba(30,16,50,.3)');
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07,t:.28});ao(g,0,103,320,6,'t',.35,'#3a3050');
  /* the benches, the table and the chest stand on the floor: their shadows in soft steps */
  for(const[x,w]of[[56,62],[262,58]])shadow11(g,x+w/2+1,104.4,w/2,1.2,.36,'#282040');shadow11(g,162,104.6,30,1.6,.4,'#282040');shadow11(g,232,104.6,18,1.4,.42,'#282040');
  /* the light of the room: the day from the two small windows, high in the wall, falls in and down; it is brightest round each window
     and in a patch on the floor before it, the table between them takes it, and the corners and the ceiling lie in shade. Nothing round
     lies on the wall where a head comes: the glow at each window is above every head, and the patches on the floor are long and low */
  lightmap(g,320,'#a49aa6',l=>{pool(l,160,74,170,80,'#e6dccc',.5);
    for(const x of[119,203]){pool(l,x,36,26,13,'#fff8e8',.55);pool(l,x+16,126,48,9,'#fff4dc',.55)}
    pool(l,160,100,70,18,'#ffeecc',.4);pool(l,160,128,190,22,'#f0e4cc',.4);
    l.fillStyle=lg(l,0,0,0,24,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,320,24);
    l.fillStyle=lg(l,0,126,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.22)']);l.fillRect(0,126,320,18)});
},
 light:{amb:'#e6dcd8'},draw(){},front(){}};

/* ---------- The marketplace ---------- */
/* The square where the city traded, judged, argued and strolled, northwest of the Acropolis (study note on Acts 17:17). What The
   Watchtower of July 15, 1998, names is here: colonnades with steps, the temple of Hephaestus above it with the craftsmen round it, a
   broad road that crosses the square on the slant, a boundary stone with its basin at the entrance. To the right the bare hill of
   Ares, and above everything the Acropolis. One image of a god stands in the shade of the long colonnade; no rite is seen at it. */
const CX=222,CW=236;
ART.agora11={w:640,q:12,
 paint(g){const r=rng(1107),rc=rng(1127),ST='#dbd1b6',PV='#cfc3a2';
  sky(g,640,72,SKY11(['#4a86c8','#86b2dc','#cfe0ea','#efe6cc']));cloud(g,60,10,50,4,r);cloud(g,250,7,60,5,r);cloud(g,606,12,40,4,r);
  ridge(g,0,640,72,x=>8+5*Math.sin(x/61+2)+3*Math.sin(x/19),['#9aa8b8','#aab4ac']);R(g,0,70,640,36,'#b2a878');
  acropolis(g,446,72,1.22,r);
  ridge(g,548,640,106,x=>24+20*Math.exp(-Math.pow((x-652)/52,2))+1.6*Math.sin(x/7),['#d6ccb2','#c2b698','#a99d80']);
  for(let i=0;i<26;i++){const x=580+r()*60;R(g,x,70+r()*34,.6,2+r()*5,'rgba(70,60,50,.22)')}stroke(g,[604,104,612,96,606,88,618,80,626,72,640,66],'rgba(240,232,208,.8)',2.4);stroke(g,[604,104,612,96,606,88,618,80,626,72,640,66],'rgba(120,104,84,.3)',.6);
  ridge(g,0,260,106,x=>60+10*Math.exp(-Math.pow((x-112)/84,2))-Math.max(0,(x-170)*.62),['#b6b17e','#a49f6a','#908b58']);
  for(let i=0;i<11;i++)foliage(g,10+i*21+r()*8,43+r()*5,6,3,'#6f8250',r,20);
  temple(g,58,39,40,6,17,'#ece1c8',{side:54});
  /* the houses and shops of the craftsmen, below the temple; between two of them the lane that climbs to their yards */
  for(const[x,w,top,c,dx]of[[18,78,56,'#dccca6',46],[128,84,52,'#e0d2ae',20]]){house(g,x,top,w,104-top,c,r,{patch:2,cracks:0,beams:14});skipCracks11(r,3);
    R(g,x-1,top-4.4,w+2,2,'#b8603c');for(let i=x;i<x+w;i+=4)R(g,i,top-4.4,.5,2,'rgba(90,40,24,.35)');doorArt(g,x+dx,64,22,40,'#6a4a2c',r,{bands:[]});windowArt(g,x+(dx>30?14:54),68,11,9,c,{shut:1})}
  for(const[x,y,n]of[[90,60,3],[136,57,3],[204,57,3]])crack11(g,x,y,n,rc,.9);
  /* the lane: steps that climb between two walls */
  R(g,96,48,32,56,'#b9ab8a');for(let i=0;i<9;i++){R(g,98+i*.6,100-i*5,28-i*1.2,5,tint('#c6b896',-.02*i));R(g,98+i*.6,100-i*5,28-i*1.2,.8,'rgba(255,248,226,.5)');R(g,98+i*.6,104-i*5,28-i*1.2,.8,'rgba(60,48,40,.36)')}
  poly(g,[96,40,104,56,104,104,96,104],'#9a94a8');poly(g,[128,40,122,56,122,104,128,104],'#aaa4ae');ao(g,96,48,32,12,'t',.3,'#2a2440');
  R(g,0,40,18,64,'#8a8698');R(g,0,86,18,18,'#bcae8c');ao(g,0,40,18,20,'t',.4,'#2a2440');
  /* the long colonnade: a tiled roof, a deep beam, fifteen columns, and shade behind them */
  R(g,CX,38,CW,64,'#4a4254');R(g,CX,44,CW,44,'#7a6a62');tex(g,'mott',.34,CX,44,CW,44,'overlay',1);R(g,CX,88,CW,12,'#6a5c58');
  base(g,CX+111,100,14,7,'#b8ae98');man(g,CX+118,93.5,'st11seat',1,0,'#8c8aa8',0,0);
  comp(g,'multiply',.55,()=>R(g,CX,38,CW,64,'#8a86b0'));
  poly(g,[CX-4,37,CX+CW+4,37,CX+CW-3,27,CX+3,27],'#b9744e');for(let i=CX;i<CX+CW;i+=5)stroke(g,[i,37,i+(CX+CW/2-i)*.03,27],'rgba(80,36,24,.3)',.5);R(g,CX-4,36.4,CW+8,.8,'#d88a5c');
  R(g,CX-2,37,CW+4,5.6,ST);R(g,CX-2,37,CW+4,.6,tint(ST,.3));R(g,CX-2,42,CW+4,.6,tint(ST,-.3));
  for(let i=0;i<10;i++)col(g,CX+9+i*24.2,100,55,6.4,ST,{fl:4});
  for(let i=0;i<3;i++){R(g,CX-3-i*2.4,100+i*1.5,CW+6+i*4.8,1.5,tint(ST,-.06-i*.06));R(g,CX-3-i*2.4,100+i*1.5,CW+6+i*4.8,.5,tint(ST,.2))}
  /* the painted colonnade, seen from its end: a gable wall with its doorway, and the columns of its front running back */
  R(g,484,36,54,68,'#d9cba6');tex(g,'mott',.3,484,36,54,68,'overlay',1);poly(g,[482,36,540,36,511,24],'#d2c49e');stroke(g,[482,36,511,24,540,36],'#b9744e',1.6);
  R(g,497,50,28,54,'#2e2838');R(g,497,50,28,1,'#8a7c62');ao(g,497,50,28,12,'t',.5);for(const[x,c]of[[502,'#8a4a3a'],[510,'#4a6a8a'],[517,'#8a7a3a']])R(g,x,62,5,22,rgba(c,.42));
  R(g,538,38,34,66,'#4a4254');R(g,538,38,34,4.4,tint(ST,-.14));for(let i=0;i<3;i++)col(g,545+i*10,104,61-i*2,5-i*.5,tint(ST,-.1),{fl:3,shade:.1*i});
  /* the boundary stone of the marketplace, and the basin beside it */
  R(g,34,105,34,2,'rgba(40,30,60,.3)');g.fillStyle=lg(g,34,0,46,0,['#a8a08c','#e4dcc8','#c4bca8','#8a8474']);g.fillRect(36,80,9,25);R(g,36,80,9,1,'#f2ecd8');marks(g,37.4,86,6.4,3,r);
  g.fillStyle=lg(g,48,0,66,0,['#9a9484','#dcd4c0','#bcb4a0','#7e786c']);g.fillRect(48,93,18,12);R(g,48,93,18,1,'#eee8d8');R(g,49.6,94,14.8,1.6,'#6a9ab0');R(g,48,103.6,18,1.4,'#8a8474');
  /* the paving of the square. It is laid before the wares and the jars that stand on it: it used to cover them */
  pave(g,0,103,640,144,PV,r,{vx:320,vy:56,rows:4,step:46,v:.07,rand:1,t:.28});ao(g,0,103,640,6,'t',.3,'#3a3050');
  feet11(g,[[36,105,9],[48,105,18]]);
  /* a potter's wares on a mat, and jars of oil, at the foot of the steps */
  shadow11(g,276,110.4,30,1.4,.3,'#282040');
  poly(g,[250,105,300,105,304,110,246,110],'#a8926a');for(const[x,y,k,c,w,h]of[[256,107,'jar','#9a5a36',3,8],[264,108,'jug','#8a4a2a',2.6,6],[272,107,'amph','#a8642e',3,10],[281,108,'bowl','#b06a3a',3.4,2.6],[290,107,'jar','#2a2420',2.8,7],[298,108,'jug','#9a5a36',2.4,5.4]])vessel(g,x,y,w,h,c,k);
  for(const[x,c]of[[444,'#9a5a36'],[453,'#8a4a2a'],[461,'#a8642e']])vessel(g,x,108,3.6,12,c,'amph');
  /* the road that crosses the square: a paler band of gravel, from the near left to the far right */
  comp(g,'soft-light',.6,()=>poly(g,[120,144,236,144,566,104,512,104],'#fff8de'));clipTo(g,()=>poly(g,[120,144,236,144,566,104,512,104]),()=>{for(let i=0;i<260;i++){const k=r(),y=104+k*40;R(g,120+r()*446,y,.8+k,.5+k*.4,r()<.5?'rgba(90,76,56,.3)':'rgba(255,250,230,.4)')}});
  footShade11(g,214,466,104,9,.3,-2);footShade11(g,484,572,104,6,.26);footShade11(g,0,214,104,6,.22);
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,640,41)});
  /* the light of the day: the sky, the far hills and the rock keep it full; the temple on its hill, the craftsmen's houses, the front of
     the long colonnade, the painted colonnade's gable and the hill of Ares take the sun; deep under the colonnades it is shade */
  sunlight11(g,640,60,[[110,40,80,20,.45],[70,80,70,26,.5],[170,78,50,26,.45],[340,70,130,30,.5],[511,64,34,30,.5],[610,84,40,24,.45],[320,120,330,16,.55]],
    l=>comp(l,'multiply',1,()=>{R(l,CX,44,CW,56,'#d4d0e0');R(l,497,50,28,54,'#d4d0e0');R(l,538,42,34,62,'#e0dce8')}));
  pool(g,300,0,340,150,'#fff4d6',.1,'screen')},
 light:null,draw(g,t){cast(g,[['w11a',292,121,1],['w11maid',276,124,1],['w11b',584,118,-1]])},front(){}};

/* ---------- The stonecutter's yard ---------- */
/* Metalworkers and potters had their shops round the temple of Hephaestus, above the marketplace (The Watchtower, July 15, 1998).
   A yard under that temple: blocks of marble, a bench of tools under a lean-to, and one block with half a figure in it and half still
   rock. On a shelf by the wall stand small figures in silver, by the dozen: each is a small square, with no face. */
ART.yard11={w:320,q:12,
 paint(g){const r=rng(1109),rc=rng(1129),rw=rng(1139),W='#dccdaa',M='#ece6d6';
  sky(g,320,62,SKY11(['#4a86c8','#86b2dc','#d2e2ea']));cloud(g,60,12,40,4,r);
  ridge(g,96,320,62,x=>12+5*Math.sin(x/29+1),['#aaa870','#96925c']);for(let i=0;i<7;i++)foliage(g,110+i*30+r()*10,50+r()*5,7,3.4,'#6f8250',r,24);
  temple(g,150,50,62,6,25,'#ece1c8',{side:76});
  plaster(g,0,46,320,58,W,r,{patch:3,cracks:0,brick:'#b08a5a',t:.36});skipCracks11(r,4);
  for(const[x,y,n]of[[152,49,3],[226,49,2],[312,50,3]])crack11(g,x,y,n,rc,.9);R(g,0,44,320,2.6,tint(W,.14));R(g,0,44,320,.6,tint(W,.4));R(g,0,46.6,320,.8,tint(W,-.3));
  /* the gate to the lane */
  R(g,12,48,38,56,tint(W,-.2));arch(g,16,52,30,52);g.fillStyle=lg(g,0,52,0,104,['#a8cdea','#e2dcc4','#cfc3a2']);g.fill();g.save();arch(g,16,52,30,52);g.clip();R(g,16,88,30,16,'#c8bc9c');R(g,21,70,12,18,'#dbd1b6');for(let i=0;i<3;i++)R(g,22.4+i*3.6,73,1.6,15,'#b8ae94');ao(g,16,52,30,8,'t',.4);g.restore();
  /* the lean-to: two posts at its ends, a roof of tiles, and a bench of tools under it */
  poly(g,[64,47,140,47,146,55,58,55],'#b9744e');for(let i=62;i<144;i+=5)stroke(g,[i,47,i-2+(i-62)*.05,55],'rgba(80,36,24,.3)',.5);R(g,58,54.6,88,1,'#8a4a30');
  board11(g,60,55,3,49,'#5a4226',rw,1);board11(g,141,55,3,49,'#5a4226',rw,1);comp(g,'multiply',.4,()=>R(g,63,55,78,49,'#8a86b0'));
  ao(g,63,55.6,78,7,'t',.34,'#2a2030');ao(g,63,55,5,49,'l',.2,'#2a2030');ao(g,136,55,5,49,'r',.2,'#2a2030');
  board11(g,70,90,62,3,'#8a683a',rw);board11(g,72,93,3,11,'#5a4226',rw,1);board11(g,127,93,3,11,'#5a4226',rw,1);ao(g,72,93,58,3,'t',.3,'#1a1420');
  for(const[x,w,c]of[[76,7,'#8a8a98'],[86,2,'#6a4a2c'],[92,9,'#9a9aa8'],[104,2,'#6a4a2c'],[110,6,'#8a8a98'],[120,5,'#b08a5a']]){R(g,x,88.4,w,1.6,c);R(g,x,88.4,w,.5,tint(c,.3))}
  /* small figures in silver on a shelf: each a square of metal */
  for(const y of[70,84]){ao(g,246,y+2.4,62,2.4,'t',.22,'#2a2030');board11(g,246,y,62,2.4,'#7a5c36',rw)}for(let j=0;j<2;j++)for(let i=0;i<9;i++){const x=250+i*6.4,y=j?84:70;R(g,x,y-5,3,5,'#c4c8d0');R(g,x,y-5,1,5,'#f0f2f6');R(g,x+2,y-5,1,5,'#8a8e9a')}
  /* blocks of marble against the wall */
  const BL=[[214,104,26,16],[236,104,20,10],[288,104,28,20],[150,104,14,8]];
  for(const[x,y,w,h]of BL){g.fillStyle=lg(g,x,0,x+w,0,[tint(M,-.24),tint(M,.06),M,tint(M,-.3)]);g.fillRect(x,y-h,w,h);R(g,x,y-h,w,.8,'#ffffff');
    inRect(g,x,y-h,w,h,()=>{tex(g,'mott',.24,x,y-h,w,h,'overlay',.6);/* veins, all running the one way, so that no two of them cross (the second draw is still taken) */
      for(let i=0;i<5;i++){const a=x+r()*w;r();const P=[a-h*.2,y-h,a+h*.2,y];stroke(g,P,'rgba(120,120,150,.15)',.5);stroke(g,P.map((v,j)=>j%2?v:v+.5),'rgba(255,255,255,.1)',.5)}
      ao(g,x,y-Math.min(4,h*.3),w,Math.min(4,h*.3),'b',.16,'#3a3050')})}
  /* the block he is working on: a figure to the waist, and below it the rock it is coming out of */
  g.save();g.beginPath();g.rect(160,40,50,44.5);g.clip();man(g,184,107,'st11rough',1,0,null,0,0);g.restore();
  poly(g,[166,110,204,110,203,86,197,83,188,84.5,176,82.6,168,85]);g.fillStyle=lg(g,166,0,204,0,[tint(M,-.26),tint(M,.04),M,tint(M,-.32)]);g.fill();
  clipTo(g,()=>poly(g,[166,110,204,110,203,86,197,83,188,84.5,176,82.6,168,85]),()=>{tex(g,'mott',.34,166,82,38,28,'overlay',.6);for(let i=0;i<26;i++){const x=168+r()*34,y=84+r()*24;stroke(g,[x,y,x+1.6,y+2.2],r()<.5?'rgba(110,110,140,.3)':'rgba(255,255,255,.5)',.5)}});
  earth(g,0,104,320,144,'#cdbf9a',r);ao(g,0,104,320,6,'t',.3,'#4a4460');
  /* the stones, the block and the bench stand on the yard: their shadows, in soft steps, and the shade at the foot of the wall */
  footShade11(g,0,320,104.5,8,.34);feet11(g,BL.map(([x,y,w])=>[x,y,w]).concat([[166,104,38]]));
  shadow11(g,101,104.4,33,1.3,.4,'#282040');for(const x of[61.5,142.5])shadow11(g,x+1,104.3,3,.9,.4,'#282040');
  for(let i=0;i<70;i++){const k=r(),x=120+r()*130,y=107+k*26;R(g,x,y,1+k*1.6,.6+k*.5,r()<.7?'#f4efe2':'#c8c2b0')}
  /* the light of the day: the sky and the temple keep it full; the yard's wall and the blocks take the sun; under the lean-to and in
     the gateway it is shade */
  sunlight11(g,320,46,[[220,72,90,30,.5],[40,70,40,30,.4],[190,118,160,14,.5]],
    l=>comp(l,'multiply',1,()=>{R(l,63,55,78,49,'#dcd8e6');R(l,16,52,30,52,'#e4e0ea')}));
  pool(g,200,20,200,120,'#fff4d6',.1,'screen')},
 light:null,draw(){},front(){}};

/* ---------- The painted colonnade ---------- */
/* The Stoics had their name from a painted colonnade in Athens, where the founder of the school taught (Insight, "Stoics"). Along
   its back wall hang great panels, so faded that they are fields of color and nothing more. An image of one of the city's gods stands
   in a recess, in shade. The columns of the front stand between the viewer and the floor (fore). */
ART.stoa11={w:480,q:12,fp:1.2,
 paint(g){const r=rng(1111),rc=rng(1131),rw=rng(1141),W='#d6c8a4',ST='#d4cab0';
  /* the plaster's random cracks are set by hand now, high on the wall where they run to no head; their draws are still taken */
  plaster(g,0,0,480,104,W,r,{patch:1,cracks:0,t:.36});skipCracks11(r,5);
  joists11(g,480,10,34,7,7,2.6,rw);ao(g,0,9.6,480,14,'t',.5,'#2a2030');
  for(const[x,y,n]of[[12,11,3],[128,11.4,3],[352,11,3],[470,11.6,2]])crack11(g,x,y,n,rc);
  /* the panels: weathered ancient frescoes faded into quiet banded fields of color with crisp plaster wear */
  const pals=[['#929ca6','#b2a282','#8a5844'],['#8e9aa2','#9c9a7a','#7c5e4c'],['#9a9e9e','#b49e7c','#845242'],['#8c98a4','#a89c7c','#786050']];
  [[24,96],[136,82],[262,82],[360,98]].forEach(([x,w],pi)=>{const[cTop,cMid,cBot]=pals[pi%pals.length];
    R(g,x-2,19,w+4,56,'#4e3820');R(g,x-1.2,19.8,w+2.4,54.4,'#7a5a34');R(g,x-1.2,19.8,w+2.4,.7,'#a88454');
    inRect(g,x,21,w,52,()=>{
      /* banded aged pigment wash (sky wash, warm ochre middle, earthy umber base) */
      g.fillStyle=lg(g,0,21,0,73,[[0,cTop],[.38,mix(cTop,cMid,.5)],[.52,cMid],[.76,cBot],[1,tint(cBot,-.18)]]);g.fillRect(x,21,w,52);
      /* gentle weathered horizontal fresco border band and subtle distant color masses (no figures) */
      R(g,x,21,w,2.6,'rgba(118,58,42,.36)');R(g,x,70.4,w,2.6,'rgba(92,50,38,.42)');
      for(let k=0;k<5;k++){const mx=x+6+k*(w/5)+r()*6,my=44+r()*14,mw=12+r()*16,mh=5+r()*8;
        poly(g,[mx-mw/2,my+mh/2,mx-mw*.28,my-mh/2,mx+mw*.2,my-mh*.42,mx+mw/2,my+mh/2],rgba(k%2?cBot:tint(cMid,-.18),.28))}
      tex(g,'mott',.38,x,21,w,52,'overlay',.6);tex(g,'grain',.14,x,21,w,52,'overlay',.5);
      /* crisp irregular plaster flakes and fine hairline cracks matching the VGA room art */
      for(let i=0;i<11;i++){const fx=x+4+r()*(w-8),fy=24+r()*46,fw=1.5+r()*3.5,fh=1+r()*2;
        poly(g,[fx,fy,fx+fw,fy-.4,fx+fw*.8,fy+fh,fx-.3,fy+fh*.8],'rgba(214,200,164,.55)')}
      for(let i=0;i<4;i++){let cx=x+8+r()*(w-16),cy=23+r()*30;const q=[cx,cy];for(let s=0;s<4;s++){cx+=(r()-.5)*4;cy+=3+r()*5;q.push(cx,cy)}stroke(g,q,'rgba(68,54,42,.32)',.45)}
      ao(g,x,21,w,7,'t',.35);ao(g,x,21,4,52,'l',.2)})});
  R(g,0,80,480,24,tint(W,-.2));tex(g,'mott',.3,0,80,480,24,'overlay',1);R(g,0,79,480,1.2,tint(W,.12));ao(g,0,80.2,480,2.4,'t',.2,'#2a2030');ao(g,0,94,480,10,'b',.24,'#2a2030');
  /* the recess, and the image in it */
  R(g,224,26,32,78,tint(W,-.34));ao(g,224,26,3,78,'l',.3,'#2a2030');ao(g,253,26,3,78,'r',.3,'#2a2030');arch(g,227,30,26,74,'#3a3244');base(g,233,104,14,13,'#a8a08c');man(g,240,91.5,'st11seat',1,0,'#7c7a98',0,0);comp(g,'multiply',.4,()=>arch(g,227,30,26,74,'#8a86b0'));
  bench(g,40,89,60,ST);bench(g,380,89,60,ST);
  pave(g,0,103,480,144,'#cdc2a4',r,{vx:240,vy:60,rows:4,step:44,v:.06,t:.28});ao(g,0,103,480,6,'t',.4,'#3a3050');
  for(const x of[40,380])shadow11(g,x+31,104.4,30,1.2,.36,'#282040');
  /* the light of the colonnade: the day comes in from the open front, behind us. It lies brightest on the floor near us, climbs the
     back wall and the panels softly, and fades toward the ceiling; the benches and the foot of the wall take a little of it */
  lightmap(g,480,'#a29cb0',l=>{l.fillStyle=lg(l,0,0,0,144,['rgba(255,240,216,0)','rgba(255,240,216,.16)','rgba(255,240,216,.5)']);l.fillRect(0,0,480,144);
    pool(l,240,150,330,60,'#fff0d0',.9);pool(l,60,130,120,40,'#ffeecc',.5);pool(l,420,130,120,40,'#ffeecc',.5);
    for(const x of[72,177,303,409])pool(l,x,62,64,26,'#fff0d8',.3);
    l.fillStyle=lg(l,0,0,0,22,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,480,22)})},
 fore(g){const w=Math.round(VW+(480-VW)*1.2),ST='#b9b09a';for(let x=30;x<w;x+=118){g.fillStyle=lg(g,x,0,x+15,0,[tint(ST,-.5),tint(ST,-.1),tint(ST,-.26),tint(ST,-.62)]);g.fillRect(x,0,15,144);for(let i=1;i<4;i++)R(g,x+i*3.7,0,.6,144,'rgba(30,24,40,.25)');R(g,x-1.5,138,18,6,tint(ST,-.4));R(g,x-1.5,138,18,.8,tint(ST,-.1))}},
 light:{amb:'#d8d2de'},
 draw(g){const L='#d8d2de';cast(g,[['hl11a',118,124,-1],['hl11b',136,119,-1],['he11a',348,124,1],['he11b',364,119,1]],L);
  /* where Paul stands decides whom he hears, and which tune (the moods "stoic", "epic" and "both") */
  if(G.room==='stoa11'&&!G.busy&&!G.scene&&!P.walk&&PC()===P){const z=zone11();if(z!==G.z11){G.z11=z;AU.mood=z==='L'?'stoic':z==='R'?'epic':'both';if(F.shut&&!F.led)cut(()=>overhear(z))}}},
 front(){}};

/* ---------- The row of altars, seen close ---------- */
/* The game's third close view. Seven stones by the roadside, and the picture is cut off at the height of a man's knee: of a figure
   that stands on a base, only the feet and the hem are seen. Every stone has a band of cut letters, in Greek capitals, as such stones
   had; a letter in an inscription is a letter (CONTRIBUTING section 3). The study note on Acts 17:23 gives the words of the altar
   that Paul found, and names altars to such things as Pity, Persuasion, Energy and Modesty. Three stones seem to name nobody: on one
   the letters are under ivy, on one they are broken off, and one says so itself. The two heroes and their names are invented. No word
   in the row has a phi in it, which is a line through a ring: the tau stays, as the altar of the account has one. */
const BX0=7,BW=38,BG=6,BY=120,STONES=[
 {k:'altar',id:'pity',gr:['ΕΛΕΩΙ'],nm:'altar_to_pity',c:'#d6ccb0'},
 {k:'base',id:'ivy',gr:['ΗΡΩΙ','ΤΙΜΑΝΔΡΩΙ'],nm:'base_of_the_hero_timandros',c:'#c8bea2',fig:BRZ},
 {k:'altar',id:'pers',gr:['ΠΕΙΘΟΙ'],nm:'altar_to_persuasion',c:'#dcd2b6'},
 {k:'base',id:'broken',gr:['ΗΡΩΙ','ΞΕΝΟΔΑΜΩΙ'],nm:'base_of_the_hero_xenodamos',c:'#cfc5a9',fig:MAR},
 {k:'altar',id:'unknown',gr:['ΑΓΝΩΣΤΩΙ','ΘΕΩΙ'],nm:'altar_to_a_god_not_known',c:'#e0d6ba'},
 {k:'altar',id:'energy',gr:['ΟΡΜΗΙ'],nm:'altar_to_energy',c:'#d2c8ac'},
 {k:'altar',id:'modesty',gr:['ΑΙΔΟΙ'],nm:'altar_to_modesty',c:'#d8ceb2'}];
const sx=i=>BX0+i*(BW+BG),stoneTop=s=>s.k==='altar'?50:76,bandY=s=>stoneTop(s)+(s.k==='altar'?22:12);
const GFONT=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
/* cutLetters: words cut into stone, one line each, centered on cx: a dark stroke, and a pale edge below and to the right of it */
function cutLetters(g,words,cx,y,w,sz){sz=sz||6.4;g.textBaseline='middle';g.font=GFONT(sz);while(Math.max(...words.map(s=>g.measureText(s).width))>w&&sz>3.6){sz-=.2;g.font=GFONT(sz)}
  words.forEach((s,i)=>{const tw=g.measureText(s).width,tx=cx-tw/2,ty=y+i*(sz+1.4);g.fillStyle='rgba(255,250,232,.6)';g.fillText(s,tx+.5,ty+.5);g.fillStyle='rgba(58,46,40,.9)';g.fillText(s,tx,ty)})}
ART.bases11={w:320,q:12,
 paint(g){const r=rng(1113);
  sky(g,320,22,SKY11(['#9cc0e0','#d6e4e8']));g.fillStyle=lg(g,0,16,0,124,['#bbb07e','#a99c68','#948750']);g.fillRect(0,16,320,108);tex(g,'mott',.36,0,16,320,108,'overlay',1.2);
  for(let i=0;i<60;i++)foliage(g,r()*320,22+r()*96,4+r()*6,1.4+r()*2,r()<.5?'#8f8f56':'#a59c62',r,10);
  STONES.forEach((s,i)=>{const x=sx(i),alt=s.k==='altar',top=stoneTop(s);
    if(!alt){/* the hem of a long robe, and sculpted tapered ankles and sandaled feet under it */
      const F=s.fig,x0=x+5,x1=x+BW-5,hem=[x0+3,0,x1-3,0,x1,62,x1-5,64.5,x0+12,62.5,x0+5,64.5,x0,62];
      [[x0+3.5,0],[x0+15.5,1]].forEach(([fx,rt])=>{const dx=rt?.8:-.4,ank=[fx+.5,62,fx+8.5,62,fx+7.4+dx*.3,top-5.2,fx+8.8+dx,top-1.8,fx-1+dx*.4,top-1.8,fx+1.3+dx*.3,top-5.2];
        /* tapered ankle & arched instep */
        poly(g,ank);g.fillStyle=lg(g,fx,0,fx+9.5,0,[tint(F,-.36),tint(F,.18),F,tint(F,-.42)]);g.fill();
        clipTo(g,()=>poly(g,ank),()=>{ao(g,fx,61,10,5,'t',.48);stroke(g,[fx+2.6,63,fx+2.2,top-5],'rgba(255,255,255,.16)',.7);
          /* diagonal sandal strap across the instep (no cross) */
          stroke(g,[fx+1+dx*.3,top-4.4,fx+7.8+dx*.8,top-2.4],tint(F,-.36),1);stroke(g,[fx+1+dx*.3,top-4.9,fx+7.8+dx*.8,top-2.9],tint(F,.24),.4)});
        /* sculpted forefoot, toes, and sandal sole resting on the base */
        const ft=[fx-1.2+dx*.4,top-1.4,fx+.2+dx*.4,top-3.6,fx+7.8+dx,top-3.6,fx+9.6+dx,top-1.4];
        poly(g,ft);g.fillStyle=lg(g,fx-1,top-4,fx+10,top,[tint(F,.22),F,tint(F,-.34)]);g.fill();
        for(let t=0;t<3;t++)R(g,fx+1.4+dx*.5+t*2.1,top-2.9,.55,1.5,tint(F,-.38));
        R(g,fx-1.5+dx*.4,top-1.5,11.6,1.5,tint(F,-.32));R(g,fx-1.5+dx*.4,top-1.5,11.6,.5,tint(F,.14))});
      poly(g,hem);g.fillStyle=lg(g,x0,0,x1,0,[tint(F,-.4),tint(F,.18),F,tint(F,-.48)]);g.fill();
      clipTo(g,()=>poly(g,hem),()=>{for(let k=0;k<5;k++){const fx=x0+3.5+k*5.6;stroke(g,[fx,0,fx+1.6,32,fx-.6,64],'rgba(20,16,30,.3)',1.1);stroke(g,[fx+1.3,0,fx+2.9,32,fx+.7,64],'rgba(255,255,255,.22)',.6)}ao(g,x0,50,x1-x0,15,'b',.42)})}
    base(g,x,BY,BW,BY-top,s.c);if(alt){R(g,x-2.4,top-3.2,BW+4.8,3.8,tint(s.c,.05));R(g,x-2.4,top-3.2,BW+4.8,.7,tint(s.c,.38));R(g,x-2.4,top+.2,BW+4.8,.5,tint(s.c,-.3))}
    /* the weathering of the stone: fine cut lines, each in two tones, the dark of the cut and a faint lit lip under it */
    for(let k=0;k<4;k++){const y=top+6+r()*(BY-top-10),P=[x+2+r()*10,y,x+14+r()*20,y+(r()-.5)*3];stroke(g,P,'rgba(60,50,40,.16)',.5);stroke(g,P.map((v,j)=>j%2?v+.5:v),'rgba(255,250,232,.14)',.5)}
    cutLetters(g,s.gr,x+BW/2,bandY(s),BW-5);
    if(s.id==='broken'){/* the corner with the end of both lines has come away; it lies in the grass */
      const P=[x+BW+2,top+4,x+BW*.56,top+5.4,x+BW*.5,top+12,x+BW*.62,top+26,x+BW+2,top+28];poly(g,P,'#a59a68');clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.5,x,top,BW+4,30,'overlay',1.2);foliage(g,x+BW-4,top+24,7,3,'#8f8f56',r,12)});
      stroke(g,[x+BW*.56,top+5.4,x+BW*.5,top+12,x+BW*.62,top+26],tint(s.c,-.4),1);stroke(g,[x+BW*.56+.8,top+5.4,x+BW*.5+.8,top+12,x+BW*.62+.8,top+26],tint(s.c,.3),.5)}});
  earth(g,0,119,320,144,'#bfae80',r);ao(g,0,119,320,5,'t',.34,'#3a3a2a');
  feet11(g,STONES.map((s,i)=>[sx(i),BY,BW]));
  for(let i=0;i<46;i++)foliage(g,r()*320,120+r()*3,3+r()*4,1.4,'#8a9458',r,8);
  /* the piece that broke off, with what was on it */
  {const x=sx(3)+BW+1,y=133,P=[x-9,y+1,x-7,y-7,x+6,y-9,x+10,y-2,x+7,y+3];poly(g,P,tint('#cfc5a9',-.06));stroke(g,[x-9,y+1,x-7,y-7,x+6,y-9],tint('#cfc5a9',.3),.6);R(g,x-7,y+3,16,1.4,'rgba(40,30,20,.3)');
    clipTo(g,()=>poly(g,P),()=>{g.font=GFONT(3.8);g.textBaseline='middle';g.fillStyle='rgba(58,46,40,.9)';g.fillText('ΑΜΩΙ',x-5.2,y-2.6)})}
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,119,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,119,320,25)});
  /* the light of the day, from the left and high: the fronts of the stones take it, the grass behind them a little less, and the ground at
     their feet lies in their shade */
  sunlight11(g,320,18,[[120,70,180,50,.5],[260,80,120,40,.4],[160,128,200,12,.4]]);
  pool(g,120,30,260,120,'#fff4d6',.1,'screen')},
 light:{amb:'#ffffff'},
 /* the ivy over the second stone, until it is drawn aside: then it hangs at the stone's edge */
 draw(g){const st=G.b11||{},x=sx(1),y=bandY(STONES[1]),r=rng(1151);
  if(!st.ivy){for(let i=0;i<70;i++){const px=x+1+r()*(BW-2),py=y-6+r()*20,c=['#4f6a36','#5f7a40','#3f5a2e','#6f8a4a'][i%4];R(g,px,py,1.6+r()*1.6,1.2+r()*1.2,c)}stroke(g,[x+1,y-12,x+.4,y,x+1.2,y+18],'#3a4a26',.7)}
  else for(let i=0;i<34;i++){const px=x-3+r()*6,py=y-10+r()*34,c=['#4f6a36','#5f7a40','#3f5a2e','#6f8a4a'][i%4];R(g,px,py,1.6+r()*1.4,1.2+r()*1.2,c)}},
 /* what the stone last read says, in the player's language, at the foot of the view */
 front(g){const st=G.b11;G.caps11=[];if(st&&st.last)cap11(g,STONES.find(s=>s.id===st.last).nm,160,139,300)}};
/* cap11: a caption in small letters with a dark edge, as the names on the map are written. It is made to fit its width. */
/* edge: the dark edge round words painted on the picture, a stroke with round joins behind the letters (five shifted copies of the
   words left steps on their curves) */
const edge=(g,s,x,y)=>{g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1;g.lineJoin='round';g.strokeText(s,x,y);g.restore()};
function cap11(g,s,x,y,w,col){s=T(s);let sz=4.8;const font=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;g.font=font(sz);g.textBaseline='middle';
  while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=font(sz)}const tw=g.measureText(s).width,tx=x-tw/2;
  if(G.caps11)G.caps11.push({s,w:tw,max:w,sz});edge(g,s,tx,y);g.fillStyle=col||'#f4e4b8';g.fillText(s,tx,y)}

/* ---------- The Areopagus ---------- */
/* A narrow, bare ridge of limestone below the Acropolis, with seats cut in the rock (Insight, "Areopagus"). The men who hear Paul
   sit on three of them and wear the Greek mantle over a tunic; no woman is on the rock. The path comes up from the left, and those
   who only stand and listen stay there, below the seats. Evening. */
/* sitter: a man sitting, his mantle over his knees. The figure painter draws him standing; his body down to the waist is kept and set
   lower, and under it are painted his lap, the fall of the mantle from his knees, the cloth hanging behind him, and his feet. */
function sitter(g,x,y,id,dir,lit,lean){figure(g,x,y,lit,id+dir+'sit'+(lean?1:0),s=>{const o=LOOK[id],[c,t]=mk(FIG.W,FIG.H),CUT=FIG.OY-44,DROP=16;
    t.setTransform(HR,0,0,HR,FIG.OX,FIG.OY);person(t,0,0,o,dir,0,0,lean,0,lean);
    s.save();s.setTransform(1,0,0,1,0,0);s.drawImage(c,0,0,FIG.W,CUT,dir*(lean?1:0),DROP,FIG.W,CUT);s.restore();
    s.save();s.scale(dir*FIG.K,FIG.K);const P=pal(o),C=P.cl||P.tu,TU=P.tu,S=P.sk,px=(a,b,col,w,h)=>{s.fillStyle=col;s.fillRect(a,b,w||1,h||1)};
    for(let yy=-28;yy<=-8;yy++)for(let xx=-16;xx<=-10;xx++)px(xx,yy,C[xx<-14?4:(xx+yy)%4===0?4:3]);
    for(let yy=-29;yy<=-19;yy++){const x1=yy<-27?20:22;for(let xx=-10;xx<=x1;xx++){const u=(xx+10)/32;px(xx,yy,C[yy===-29?0:yy===-28?1:yy>=-20?4:u<.1?4:u<.24?3:xx>=x1-1?1:(xx-yy*3)%11===0?3:(xx-yy*3)%11===1?1:2])}}
    for(let yy=-18;yy<=-6;yy++)for(let xx=10;xx<=22;xx++){const u=(xx-10)/12,q=(xx*2+yy)%7;px(xx,yy,C[yy===-18?4:u<.2?4:u<.34?3:q===0?3:q===1?1:u>.84?1:2])}
    for(let xx=11;xx<=21;xx++){px(xx,-5,TU[xx<13?4:3]);px(xx,-4,TU[xx<13?4:2])}
    px(12,-3,S[2],8,2);px(19,-2,S[1],3);px(12,-3,S[3],2,2);px(11,-1,'#2a1810',12);px(21,-1,'#4a3020',3);s.restore()},8)}
const SEATS=[[230,113,74],[310,107,106],[420,113,74]];
ART.hill11={w:560,q:12,
 paint(g){const r=rng(1117),RK='#dcd2ba';
  sky(g,560,96,SKY11(['#5474ae','#9a9ec2','#e2b488','#f6d6a2']));cloud(g,70,24,56,5,r,'#ffe6c4','#c69aa2');cloud(g,236,12,44,4,r,'#ffe6c4','#c69aa2');
  ridge(g,0,560,96,x=>18+8*Math.sin(x/47+2)+4*Math.sin(x/15),['#8f8fae','#a89aa8']);
  /* the city below: roofs, and the colonnades of the marketplace, small and far down */
  /* the plain of the city runs on under the foot of the rock, so that it does not end in the air beside it */
  R(g,0,84,330,20,'#b9a68a');for(let i=0;i<30;i++){const x=r()*240,y=84+r()*14,w=8+r()*12;R(g,x,y,w,4+r()*3,tint('#d6c6a2',(r()-.5)*.2));R(g,x-.5,y-1,w+1,1.2,'#b9744e')}
  R(g,96,88,60,6,'#5a5064');R(g,95,86.6,62,1.6,'#b9744e');for(let i=0;i<10;i++)R(g,98+i*6,88,1.6,6,'#e2d8be');
  comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,70,0,104,['rgba(246,214,162,.9)','rgba(246,214,162,0)']);g.fillRect(0,70,330,34)});
  acropolis(g,424,97,2.05,r,{rock:'#c2aa86'});
  /* the rock of the hill, pale and fissured; at the left it falls away to the path */
  poly(g,[0,108,60,104,170,99,220,95,560,93,560,144,0,144]);g.fillStyle=lg(g,0,92,0,144,[tint(RK,-.1),RK,tint(RK,.05)]);g.fill();
  clipTo(g,()=>poly(g,[0,108,60,104,170,99,220,95,560,93,560,144,0,144]),()=>{tex(g,'mott',.4,0,92,560,52,'overlay',1.3);tex(g,'grain',.14,0,92,560,52,'overlay',.5);
    for(let i=0;i<44;i++){let x=r()*560,y=98+r()*40;const p=[x,y];for(let k=0;k<3+r()*4;k++){x+=3+r()*9;y+=(r()-.5)*3;p.push(x,y)}stroke(g,p,'rgba(84,70,60,.3)',.6);stroke(g,p.map((v,j)=>j%2?v+.6:v),'rgba(255,250,236,.3)',.5)}
    for(let i=0;i<60;i++){const k=r();R(g,r()*560,96+k*46,1+k*2,.5+k*.5,r()<.5?'rgba(84,70,60,.25)':'rgba(255,250,236,.4)')}});
  /* steps worn into the rock, down to the path */
  for(let i=0;i<5;i++){const x=6+i*9,y=118+i*5.4;R(g,x-6,y,58-i*5,1.2,'rgba(80,66,56,.36)');R(g,x-6,y+1.2,58-i*5,.6,'rgba(255,250,236,.3)')}
  for(let i=0;i<8;i++)foliage(g,6+r()*160,103+r()*3,4+r()*4,1.6,'#8a8a54',r,8);
  /* the seats: ledges cut out of the rock itself */
  for(const[x,y,w]of SEATS){footShade11(g,x,x+w,y,3,.5,2.4);R(g,x,y-9.5,w,3,tint(RK,.12));R(g,x,y-9.5,w,.7,tint(RK,.4));g.fillStyle=lg(g,0,y-6.5,0,y,[tint(RK,-.2),tint(RK,-.34)]);g.fillRect(x,y-6.5,w,6.5);
    inRect(g,x,y-9.5,w,9.5,()=>{tex(g,'mott',.3,x,y-9.5,w,9.5,'overlay',1);ao(g,x,y-6.5,w,2.4,'t',.3,'#3a2a40');ao(g,x,y-2.4,w,2.4,'b',.2,'#3a2a40');
      for(let i=0;i<4;i++){const a=x+r()*w,b=x+r()*w;stroke(g,[a,y-6,b,y],'rgba(60,50,44,.24)',.5);stroke(g,[a+.5,y-6,b+.5,y],'rgba(255,246,228,.16)',.5)}})}
  /* a low block at the far edge: one of the altars that stood up here */
  base(g,500,100,15,13,'#cabfa4');marks(g,503,92,9,1,r);
  /* the light of the evening: low and warm from the west, it lies full on the face of the Acropolis and on the top of the rock where
     the men sit; the seats take it on their tops, the city far below is in the haze of the evening, and toward us it cools */
  lightmap(g,560,'#d8b8a8',l=>{pool(l,560,40,420,160,'#fff0c8',.9);pool(l,360,128,260,50,'#ffe8c0',.5);pool(l,40,120,160,60,'#a8a0c8',.3);
    pool(l,330,100,190,12,'#ffe8c4',.35);pool(l,130,92,150,12,'#ffe0bc',.25);
    l.fillStyle=lg(l,0,126,0,144,['rgba(60,50,90,0)','rgba(60,50,90,.16)']);l.fillRect(0,126,560,18)})},
 light:{amb:'#f0d8c4'},
 draw(g){const lit='#f0d8c4',st=G.sp11||{},up=!!F.spoke,lean=st.lean||0;
  /* the men on the seats. Before the speech breaks off they sit, and lean in as it holds; afterwards some are on their feet. */
  HEAR.forEach(([id,x,y,dir,grp,stand])=>{if(grp==='d'&&F.rose)return;if(up&&stand)cast(g,[[id,x,y+3,dir]],lit);else sitter(g,x,y,id,dir,lit,!up&&lean>=(grp==='e'?2:grp==='s'?4:1))});
  if(F.spoke)cast(g,[['by11a',52,122,1],['by11b',140,118,-1]],lit)},
 front(g){if(G.room!=='hill11'||F.spoke||!G.sp11||G.busy)return;const st=G.sp11,x=G.cam;G.caps11=[];
  g.fillStyle='rgba(10,8,14,.7)';g.fillRect(x,123,320,21);R(g,x,123,320,.6,'rgba(244,228,184,.3)');
  cap11(g,T('to_say_next_claim',{claim:T(PARTS[partNo()].claim)}),x+160,128,312,'#cfe2ff');
  cap11(g,T('i_begin_from_ground',{ground:T(st.ground?GRAIN[st.ground].cap:'empty_hands')}),x+88,138,168);
  cap11(g,T('i_say_it_voice',{voice:T(VOICE[st.voice])}),x+248,138,136)}};

/* ============ CAST ============ */
/* Dress follows Insight ("Dress") and Awake! of 1995 ("Fashion: Ancient Greek Style"). The men of standing wear the Greek mantle, a
   rectangular length of cloth, wrapped over a long tunic (himation:1); a craftsman or a slave wears the short tunic alone. The women
   wear a tunic to the feet and the mantle over it, round the body or drawn up over the head; the hair is parted, bound with a colored
   band and knotted at the back (fem:1). No woman is on the Areopagus. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
Object.assign(LOOK,{
  nikias11:HIM('#b8845a','#8a8a8a','#e2dac4','#9a8a6a',{receding:1,ph:300}),
  charm11:HIM('#c69870','#3a2a1a','#ece4d0','#7a8a9a',{ph:900}),
  arist11:HIM('#b47e52','#c8c8c8','#e6dec8','#b8a888',{longBeard:1,bald:1,ph:1500}),
  xeno11:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#b8a684',belt:'#4a3a24',brow:'#1a1210',ph:2100},
  slave11:{skin:'#b47e52',hair:'#2a1a12',tunic:'#a89c7c',belt:'#5a4a30',slim:1,brow:'#1a1210',ph:700},
  philo11:HIM('#b88a62','#6a5a4a','#d8d0b8','#8a7a5a',{receding:1,grey:'#9a9086',longBeard:1,ph:1100}),
  antig11:HIM('#c89a70','#2a1a12','#f0e8d4','#6a8a6a',{ph:1900}),
  dosi11:{skin:'#b88a62',hair:'#d0d0d0',beard:'#d0d0d0',longBeard:1,brow:'#9a9a9a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',ph:2500},
  dion11:HIM('#c08c5c','#a8a8a8','#f0ead8','#ece4d0',{receding:1,fullBeard:1,trim:'#8a3a2a',ph:500}),
  dama11:{skin:'#c8a078',veil:'#3f6f8a',tunic:'#e8d8a0',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#3f6f8a',brow:'#3a2414',ph:1300},
  /* seen, and not named: in the synagogue, round the two teachers, on the seats of the hill, and on the path below it */
  hx111:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',tunic:'#8a6a4a',long:1,belt:'#2e2016',ph:0},hx112:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  hx113:HIM('#c69870','#5a4026','#e8e2d0','#5f7f8c',{beard:null}),
  hl11a:HIM('#c69870','#3a2a1a','#e0d8c0','#a89a7a',{beard:null,slim:1}),hl11b:HIM('#b47e52','#5a4026','#d8d0b8','#7a6a5a'),
  he11a:HIM('#c89a70','#5a4026','#ece4d0','#8aa07a',{beard:null,slim:1}),he11b:HIM('#b8845a','#2a1a12','#e6dec8','#9a7a8a'),
  ep11a:HIM('#b8845a','#3a2a1a','#ece4d0','#7a9a7a'),ep11b:HIM('#c69870','#8a8a8a','#e6dec8','#9aa88a',{receding:1}),ep11c:HIM('#b47e52','#2a1a12','#f0e8d4','#6a8a6a',{beard:null}),
  stc11a:HIM('#b88a62','#5a4a3a','#d8d0b8','#8a7a5a'),stc11b:HIM('#a8703f','#c8c8c8','#d2cab2','#9a8a6a',{bald:1}),stc11c:HIM('#c08c5c','#3a2a1a','#dcd4bc','#7a6a4a',{longBeard:1}),
  j11a:HIM('#b88a62','#d0d0d0','#f0ead8','#e6dec8',{longBeard:1,bald:1}),dion11s:HIM('#c08c5c','#a8a8a8','#f0ead8','#ece4d0',{receding:1,fullBeard:1,trim:'#8a3a2a'}),
  j11b:HIM('#b47e52','#8a8a8a','#ece6d4','#dcd4c0',{thin:1,fullBeard:1}),j11c:HIM('#c69870','#c8c8c8','#f0ead8','#e2dac6',{receding:1,longBeard:1}),
  by11a:{skin:'#b47e52',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#9a8a6a',belt:'#2e2016',brow:'#2a1a12',ph:0},by11b:HIM('#c69870','#5a4026','#e0d8c0','#8a6a5a',{beard:null}),
  /* women in the marketplace: a tunic to the feet, saffron or red, the mantle over it, the hair bound up; and a slave girl behind one */
  w11a:{skin:'#c8a078',hair:'#3a2616',fem:1,band:'#a8402c',tunic:'#d8a040',cloak:'#ece4d0',himation:1,long:1,slim:1,trim:'#a8402c',brow:'#3a2414',ph:0},
  w11maid:{skin:'#b8845a',hair:'#2a1a12',fem:1,band:'#8a8a6a',tunic:'#9a9a7a',belt:'#4a3a24',slim:1,brow:'#1a1210',h:1,ph:0},
  w11b:{skin:'#c89a70',veil:'#e2dccb',tunic:'#b8503c',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#e2dccb',brow:'#3a2414',ph:0},
  st11rough:stone(MAR,{himation:0,cloak:null})});
/* the men on the seats: [look, x, y of the seat's foot, facing, group (e: Epicureans, j: men of the court, d: Dionysius, s: Stoics),
   whether he is on his feet once the speech has broken off] */
const HEAR=[['ep11a',242,113,1,'e',1],['ep11b',264,113,1,'e',0],['ep11c',286,113,1,'e',1],['j11a',322,107,1,'j',0],['dion11s',348,107,1,'d',0],['j11b',380,107,-1,'j',0],['j11c',406,107,-1,'j',1],
  ['stc11a',436,113,-1,'s',0],['stc11b',458,113,-1,'s',1],['stc11c',480,113,-1,'s',0]];
const PH=actor('philo11','Philokles','#e0d0a8',104),AN=actor('antig11','Antigenes','#b8e0b0',132),NI=actor('nikias11','Nikias','#e0d8c0',112),
  CH=actor('charm11','Charmides','#b8d0e8',126),AR=actor('arist11','Aristion','#f0e8c8',92),XE=actor('xeno11','Xenokles','#e8c8a0',108),SL=actor('slave11','slave_with_a_robe_and_a_dish','#d0c8a8',140),
  DS=actor('dosi11','Dositheos','#e0e0f0',90),DI=actor('dion11','Dionysius','#f4ecd4',98),DM=actor('dama11','Damaris','#a8d8e8',190);
/* a man of the court, who speaks from his seat: he has a voice and a place, and the figure on the seat is painted by the room */
const JU={color:'#f0e6c8',pitch:88,room:'hill11',x:348,y:98,name:'man_of_the_court'};

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 17:16-34, verse by verse, told by the narrator in paraphrase, each with its reference. None of it is put into a mouth,
   and none of it stands in quotation marks: a paraphrase is never presented as a quotation (CONTRIBUTING section 1). The speech
   (17:22-31) is told as what Paul said, part by part, as the player builds it. */
const TOLD={
 v16:'while_paul_waited_acts_17_16',
 v17a:'he_reasoned_in_the_synagogue_acts_17_17',
 v17b:'every_day_he_acts_17_17',
 v18a:'some_philosophers_took_acts_17_18',
 v18b:'others_thought_that_he_acts_17_18',
 v19:'they_wanted_to_hear_acts_17_19',
 v20:'what_he_was_bringing_acts_17_20',
 v21:'all_the_athenians_acts_17_21',
 v22:'in_every_way_acts_17_22',
 v23:'walking_about_and_looking_acts_17_23',
 v24:'god_who_made_acts_17_24',
 v25:'he_is_not_waited_acts_17_25',
 v26:'from_one_man_acts_17_26',
 v27:'that_they_would_acts_17_27',
 v28:'our_life_our_every_acts_17_28',
 v29:'being_children_of_god_acts_17_29',
 v30:'god_let_the_times_acts_17_30',
 v31:'for_he_has_fixed_acts_17_31',
 v32:'some_said_they_acts_17_32',
 v33:'paul_left_them_acts_17_33',
 v34:'some_men_attached_acts_17_34'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});

/* ============ THE TABLETS, WHICH STAY SHUT ============ */
/* PS: the passages on Paul's tablets, each a note in his own words with its reference (gist: see shared/tablets.js), never the
   wording of a translation. The first three are the ones he reads out in the marketplace, where nobody knows the names in them. The
   rest are the passages that the Study Edition's marginal references set beside the parts of the speech (Acts 17:24, 25, 27, 28, 29,
   31): on the hill he says what they say and quotes none of them, and each appears on the tablets when its part has been spoken.
   The last is the line at which the tablets are opened for those who joined him. */
const PS={
 is42:{ref:'isaiah_42_5',gist:'true_god_jehovah_made_the_heavens'},
 de4:{ref:'deuteronomy_4_29',gist:'whoever_looks_for_jehovah'},
 ps145:{ref:'psalm_145_18',gist:'whoever_calls_on_jehovah'},
 k8:{ref:'n1_kings_8_27',gist:'even_the_highest_heavens'},
 ps50:{ref:'psalm_50_12',gist:'god_says_if_i_were_ever'},
 ps36:{ref:'psalm_36_9',gist:'life_has_its_source_in_jehovah'},
 is40:{ref:'isaiah_40_18_19',gist:'whom_will_you_set_beside'},
 ps96:{ref:'psalm_96_13',gist:'jehovah_is_on_his_way_to_judge'},
 ge1:{ref:'genesis_1_1',gist:'when_all_things_began_god'}};
const quote=p=>T('text_ref',{text:T(p.gist),ref:T(p.ref)});

/* ============ THE GRAINS ============ */
/* What Paul gathers in the city, and what each carries on the hill (Acts 17:23, 24, 25, 28, 29). cap: what it is called on the hill;
   note: what his tablets say of it under "Seen in Athens". Each is an item in his pack, and so are the questions that find them: a
   thought is carried and used like a thing. */
const GRAIN={
 altar:{item:'g11altar',f:'qunk',cap:'their_altar_without_a_name',note:'altar_by_the_road_cut_whole'},
 roof:{item:'g11roof',f:'qhouse',cap:'temple_without_a_roof',note:'temple_of_zeus_six_hundred'},
 dish:{item:'g11dish',f:'qneed',cap:'robe_and_the_dish',note:'robe_and_a_dish_of_food'},
 line:{item:'g11line',f:'stoic',cap:'line_of_their_poets',note:'stoic_in_the_words_of_a_poet'},
 block:{item:'g11block',f:'qmade',cap:'block_of_marble',note:'block_of_marble_this_morning'}};
const VOICE={you:'to_them_you',we:'as_one_of_them_we',all:'to_all_people_everywhere'},VOICES=['you','we','all'];
const QS={q11made:'block',q11house:'roof',q11need:'dish',q11unk:'altar'},isQ=id=>!!QS[id],GITEM={g11altar:'altar',g11roof:'roof',g11dish:'dish',g11line:'line',g11block:'block'};
const gathered=()=>Object.keys(GRAIN).filter(k=>F[GRAIN[k].f]),all5=()=>gathered().length===5&&!!F.epic;

/* ============ HELPERS ============ */
const lit11=(x,y)=>lightAt(G.room,x,y);
/* think: Paul weighs what to do next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* come: a room is shown, with everyone in his place. goto: Paul walks from one place to the next. step: into a close view, or out. */
async function come(room,ms){place11(room);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,ms||600)}
async function goto(room,x,y,dir){await fade(1,260);place11(room);enterRoom(room,x,y,dir);codeBtn();await fade(0,260);const r=ROOMS[room];if(r.enter)await r.enter()}
async function step(room,x,y,dir){await fade(1,220);place11(room);if(x!=null)place(P,room,x,y,dir);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,260)}

/* ============ FOUR QUESTIONS ============ */
/* ask: a question is put to a thing. kind says what the thing is. Put to the thing it belongs to, the question becomes a grain
   (RIGHT); put to anything else, it gets an honest answer and no more. */
const WRONG={
 q11made:{statue:'who_made_it',altar:'mason_long_ago',
  temple:'builders_and_they_are_long_dead',roof:'builders_and_they_are_long_dead',
  dish:'weaver_and_a_cook','*':'that_is_not_the_place_to_ask'},
 q11house:{statue:'on_a_base_at_a_street_corner',altar:'altar_is_a_table',
  temple:'in_there_they_would_say',block:'nowhere_yet',
  dish:'he_is_carrying_it_to_the_door','*':'that_is_not_the_place_to_ask_said'},
 q11need:{statue:'nothing_that_i_can_see_said',altar:'altar_is_where_they_bring_it',temple:'roof_and_this_one_has_its_roof',
  roof:'roof_q',block:'a_sculptor','*':'that_is_not_the_place_to_ask_what'},
 q11unk:{statue:'this_one_has_a_name',altar:'there_are_a_great_many',temple:'they_know_very_well_whose',
  roof:'they_know_very_well_whose_said',block:'it_will_have_a_name_as_soon',dish:'he_knows_the_name_of_the_image','*':'that_is_not_the_place_to_ask_it'}};
async function ask(id,kind){if(!isQ(id))return false;if(QS[id]===kind)return RIGHT[kind]();return say(P,WRONG[id][kind]||WRONG[id]['*'],TH)}
/* gain: a question has found its answer. The question leaves the pack, and the grain takes its place. */
async function gain(k){const g=GRAIN[k],q=Object.keys(QS).find(i=>QS[i]===k);if(F[g.f])return;F[g.f]=1;if(q)delItem(q);addItem(g.item);SFX.good();
  if(all5())await say(P,'altar_a_temple_a_dish_a_block',TH);codeBtn()}
const RIGHT={
 roof:async()=>{await narr('man_leading_a_mule_up_the_road',{dur:8800});
  await say(P,'where_does_he_live');
  await say(P,'hands_began_it_and_hands_grew_tired',TH);return gain('roof')},
 block:async()=>{await say(P,'who_made_them');
  await say(XE,'this_morning_he_was_rock');
  await say(P,'gold_or_silver_or_stone',TH);return gain('block')},
 dish:async()=>{await say(P,'what_does_he_need');
  await say(SL,'tomorrow_another_sir');
  await say(P,'waited_on_by_human_hands',TH);await gain('dish');
  await say(SL,'i_must_go_on_sir');await walk(SL,640,122);SL.room=null;codeBtn()},
 altar:async()=>{await say(P,'is_there_one_they_do_not_know');
  await say(P,'not_lost_like_the_name',TH);return gain('altar')}};

/* ============ THE ROAD, AND THE WAY BY THE STATUES ============ */
const ROAD=[['thessalonica','beroea'],['beroea','seaward'],['seaward','athens','sea']],LAB={thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:6,dy:7.2}};
/* the statues of the street: each is "a statue" until Paul has looked at it */
const STAT=[
 {id:'gen',x:138,nm:'bronze_man_in_a_helmet',look:'man_in_bronze_with_a_helmet'},
 {id:'scr',x:226,nm:'marble_man_with_a_scroll',look:'man_in_marble_holding_a_scroll'},
 {id:'old',x:316,nm:'old_lawgiver_in_marble',look:'old_man_in_marble_bald'},
 {id:'maim',x:406,nm:'marble_youth_without_a_right_hand',look:'young_man_in_marble'},
 {id:'p1',x:502,nm:'bronze_that_faces_another',look:'two_men_in_bronze_face'},
 {id:'p2',x:534,nm:'bronze_that_faces_another',look:'two_men_in_bronze_face'}];
const seenS=id=>!!(G.s11&&G.s11[id]);
const WAY='past_the_bronze_in_the_helmet';
async function nikias(){if(F.syn)return say(NI,'you_found_it_then');
  if(F.way){await say(NI,'again_said');return say(NI,WAY)}
  await say(P,'friend_i_am_a_stranger_here');
  await say(NI,'the_synagogue');await say(NI,WAY);
  await say(NI,'if_you_come_to_the_two');
  await say(P,'by_the_statues');
  await say(NI,'thank_you_we');F.way=1;SFX.good();codeBtn()}
async function lane(k){
  if(!F.way)return say(P,'lane_between_two_houses');
  if(F.syn)return say(P,k==='c'?'lane_to_the_synagogue':'i_know_where_that_one_comes');
  if(k!=='c'){await fade(1,300);await narr('lane_ran_round_three_houses',{dur:6200});
    place(P,'street11',74,122,1);G.cam=0;await fade(0,300);
    /* the chapter's hidden treasure: the third time the wrong lane brings him back, the old man by the fountain greets him as one of his own */
    if((G.wrong11=(G.wrong11||0)+1)===3&&NI.room==='street11'){await say(NI,'back_again');
      await say(P,'one_lane_at_a_time');return treasure()}
    return say(P,'not_that_one',TH)}
  await fade(1,400);await come('syn11');return synIntro()}
async function toAgora(){if(!F.syn)return say(P,'that_way_lies_the_marketplace');return goto('agora11',40,124,1)}

/* ============ THE SYNAGOGUE ============ */
async function synIntro(){await say(DS,'peace_stranger');
  await say(P,'paul_of_tarsus_i');
  await say(DS,'sit_with_us');codeBtn()}
async function synTalk(){if(F.syn)return;await tell('v17a');
  await say(P,'men_of_israel_and_you_who_said');
  await say(DS,'from_the_dead');
  await narr('here_at_least_they_knew',{dur:5200});
  await say(DS,'come_again_on_the_sabbath');
  F.syn=1;SFX.good();await fade(1,600);await narr('next_morning_he_went_where',{dur:5200});await come('agora11',700);return agoraIntro()}

/* ============ THE MARKETPLACE: the basin, and the tablets that nobody knows ============ */
/* At the entrance stood a boundary stone with a basin of water, for the cleansing of those who came in (The Watchtower, July 15,
   1998). Paul declines it, plainly and without scorn, and that is the news that gathers his first hearers. Then he does what he has
   done in every city, and opens his tablets: three passages, all true, and to these men only names. So the tablets are shut, and he
   takes four questions through their city instead. */
async function agoraIntro(){await narr('in_the_marketplace_nobody',{dur:6200});await tell('v17b');await tell('v21');return basin()}
/* basin: Charmides points him to the basin. It follows the first sight of the marketplace, and a code that was noted at that moment leads back to it. */
async function basin(){if(F.basin)return;
  await say(CH,'stranger_said');
  await think('he_wants_me_to_wash_at_their_basin',[
    {q:'dip_my_hands',no:'only_water'},
    {q:'go_round_and_come_in_by_another',no:'there_are_a_dozen_ways'},
    {q:'tell_him_what_his_gods_are_worth',no:'it_would_be_true'},
    {q:'decline_and_tell_him_plainly_why',ok:1}]);
  await say(P,'i_thank_you_but_no',{to:CH});
  await say(CH,'one_god');
  await say(AR,'that_i_have_not_heard_this_month');
  F.basin=1;SFX.good();await Promise.all([walk(CH,404,114),walk(P,372,118)]);CH.dir=-1;P.dir=1;codeBtn()}
const TRY=[{k:'is42',q:'read_them_isaiah_the_breath',r:[[CH,'isaiah_q'],[P,'prophet_of_israel'],[CH,'foreigner_said']]},
  {k:'de4',q:'read_them_moses_whoever',r:[[AR,'moses']]},
  {k:'ps145',q:'read_them_david_jehovah',r:[[CH,'david']]}];
async function steps(){if(F.shut)return false;const done=new Set();
  await say(P,'men_of_athens_hear_what_is_written');
  while(done.size<3){const av=TRY.filter(t=>!done.has(t.k)),t=av[await choose(av.map(t=>t.q))];done.add(t.k);await say(P,quote(PS[t.k]));for(const[a,l]of t.r)await say(a,l)}
  await say(AR,'you_read_well_stranger');
  await say(AR,'here_a_man_who_wants_to_be');
  await say(P,'he_is_right_said',TH);
  await say(P,'tablets_stay_shut_i',TH);
  F.shut=1;for(const q of Object.keys(QS))addItem(q,1);SFX.good();AU.mood=ROOMS.agora11.mood;
  await narr('he_went_through_their_city',{dur:5600});codeBtn();return true}

/* ============ BETWEEN THE STATUES: the row of altars ============ */
/* He found the altar while passing along and looking closely (Acts 17:23). Three stones of the seven seem to name nobody, and each
   has to be gone into in its own way: ivy is drawn aside, a broken piece is read where it lies, and the third says what it says. */
function b11(){return G.b11||(G.b11={read:{},ivy:0,frag:0,last:null,seen:0})}
const readS=id=>!!b11().read[id];
async function toBases(){if(!F.shut)return say(P,'altars_one_after_another');
  await step('bases11');const st=b11();if(!st.seen&&!F.qunk){st.seen=1;await say(P,'seven_stones_in_this_stretch',TH)}}
const STLOOK={pity:'an_altar_to_pity',pers:'an_altar_to_persuasion',
  energy:'an_altar_to_energy',modesty:'an_altar_to_modesty',
  unknown:'whole_and_clean_and_cut'};
async function stoneLook(s){const st=b11();
  if(s.id==='ivy'){if(!st.ivy)return say(P,'base_of_a_statue');st.read.ivy=1;st.last='ivy';return say(P,'to_the_hero_timandros')}
  if(s.id==='broken'){if(!st.frag)return say(P,'to_the_hero_xe');st.read.broken=1;st.last='broken';return say(P,'to_the_hero_xenodamos')}
  st.read[s.id]=1;st.last=s.id;return say(P,STLOOK[s.id])}
async function ivy(){const st=b11();if(st.ivy)return;st.ivy=1;noise({d:.2,v:.08,f:3000,q:.8});return say(P,'i_draw_the_ivy_aside')}
async function fragment(){const st=b11();st.frag=1;return say(P,'corner_of_dressed_stone')}
async function stoneAsk(s,id){if(!isQ(id))return false;if(id!=='q11unk')return ask(id,'altar');const st=b11();
  if(s.id==='ivy')return say(P,st.read.ivy?'this_one_they_know_a_hero':'i_cannot_read_it',TH);
  if(s.id==='broken')return say(P,st.read.broken?'this_one_they_know':'name_is_broken_off',TH);
  if(s.id!=='unknown')return say(P,'this_one_they_know_well',TH);
  if(!st.read.unknown)return say(P,'i_have_not_even_read_it_yet',TH);
  if(!st.read.ivy||!st.read.broken)return say(P,'it_seems_to_name_nobody',TH);
  return RIGHT.altar()}

/* ============ SEED PICKER: the painted colonnade ============ */
/* Two men teach under one roof, one at each end, and whom Paul hears depends on where he stands (zone11, and the room's draw). Each
   says four things. One of the four Paul can hold with him: the Stoic's line of a poet (study note on Acts 17:28), and what the
   Epicurean grants about gifts. What each school held is from the study notes on Acts 17:18 and from Insight ("Stoics",
   "Epicureans"); that a god needs nothing from men is what Bearing Thorough Witness (chapter 18, paragraph 14) says some philosophers
   in his audience may have believed. It does not say which school: the game gives the thought to its Epicurean. The two are invented. */
const SAYS={
 s:[{q:'live_by_reason',say:'live_by_reason_and_you',no:'by_reason_alone'},
  {q:'feel_neither_pain_nor_pleasure',say:'pain_pleasure_the_wise',no:'man_who_feels_nothing_is_not_wise'},
  {q:'divine_is_not_anyone',say:'everything_that_is_is_a_part',no:'not_anyone'},
  {q:'we_too_are_his_children',say:'we_come_of_it',ok:1}],
 e:[{q:'pleasure_is_the_goal',say:'pleasure_is_where_every',no:'since_damascus_my_life'},
  {q:'death_is_a_broken_jar',say:'death_said',no:'nothing_left_over_to_hope'},
  {q:'gods_are_far_away',say:'gods_exist_and_they_are',no:'far_away'},
  {q:'god_lacks_nothing',say:'bring_them_nothing',ok:1}]};
function h11(){return G.h11||(G.h11={s:0,e:0,sh:new Set(),eh:new Set(),mid:0})}
const zone11=()=>P.x<176?'L':P.x>304?'R':'M';
async function hearNext(w){const st=h11(),i=st[w]%4;st[w]++;st[w+'h'].add(i);return say(w==='s'?PH:AN,SAYS[w][i].say,{to:null})}
async function overhear(z){if(F.stoic&&F.epic)return;const st=h11();
  if(z==='M'){if(!st.mid){st.mid=1;await say(P,'from_here_i_hear_both_of_them',TH)}return}
  return hearNext(z==='L'?'s':'e')}
async function sift(w){const st=h11(),who=w==='s'?PH:AN,done=w==='s'?F.stoic:F.epic;
  if(done)return say(who,w==='s'?'you_wrote_down_one_line':'one_sentence');
  for(;;){const heard=[...st[w+'h']].sort(),opts=heard.map(i=>SAYS[w][i].q).concat(heard.length<4?['listen_a_while_longer']:[],['leave_it_for_now']);
    await say(P,heard.length?'which_of_his_sayings_can':'i_have_not_heard_him_out_yet',TH);
    const c=await choose(opts,{keep:opts.length-heard.length});if(c===opts.length-1)return;if(c>=heard.length){await hearNext(w);continue}
    const sy=SAYS[w][heard[c]];if(!sy.ok){await say(P,sy.no,TH);continue}
    if(w==='s'){await say(P,'we_too_are_his_children_said',TH);F.stoic=1;addItem('g11line');SFX.good();
      if(all5())await say(P,'altar_a_temple_a_dish_a_block',TH)}
    else{await say(P,'a_god_lacks_nothing',TH);F.epic=1;SFX.good()}
    codeBtn();if(F.stoic&&F.epic)return picker();return}}
async function picker(){await say(PH,'you_stranger');
  await say(AN,'grain_here_a_grain_there',{to:PH});await say(PH,'seed_picker');
  await say(P,'let_them_call_it_picking',TH);codeBtn()}

/* ============ LED TO THE AREOPAGUS ============ */
/* The account gives the philosophers' two verdicts and not their arguments (Acts 17:18), and none is invented for them. Greek and
   Roman law forbade the bringing in of new gods (Insight, "Athens"), and the men of the Areopagus watched over such things (The
   Watchtower, 1985, "A Unique Athenian Rock"): so one question is put to Paul plainly, and he answers it plainly. */
async function dispute(){place(PH,'agora11',P.x+46,120,-1);place(AN,'agora11',P.x+70,126,-1);AU.mood='market';
  await narr('two_schools_taught_under_one',{dur:6200});await tell('v18a');
  await say(AN,'here_he_is_the_seed_picker',{to:PH});
  await say(PH,'what_has_he_picked_up_tell',{to:P});
  await say(P,'that_god_has_raised_a_man');
  await say(AN,'raised_from_the_dead_q',{to:PH});await tell('v18b');
  await say(PH,'new_gods_are_no_matter',{to:P});
  await think('he_asks_whether_i_bring',[
    {q:'call_it_what_you_like',no:'true_and_it_answers_nothing'},
    {q:'ask_me_that_in_the_synagogue',no:'they_would_never_come'},
    {q:'i_bring_no_new_god_i_announce',ok:1}]);
  await say(P,'i_bring_no_new_god');
  await say(AN,'it_sounds_strange_enough');await tell('v19');await tell('v20');
  await narr('they_did_not_drag_him',{dur:5600});
  F.led=1;SFX.good();await fade(1,700);await come('hill11',800);return hillIntro()}

/* ============ IN THE MIDST: the speech on the Areopagus ============ */
/* The speech goes in the order of the account, part by part (PARTS). For each part the player sets what Paul begins from (one of the
   grains, or empty hands) and the voice he says it in, and then speaks. When both carry the sentence the narrator tells that part;
   when they do not, somebody says what he heard, and never which of the two to change. The three rules are the three things that
   Bearing Thorough Witness (chapter 18, paragraph 12) says he did: no scroll, "we", and their own poets. Paragraph 16 points to "us"
   in verse 27, paragraph 19 to "we should not" in verse 29, paragraph 21 says that he did not name the judge, and paragraph 24 that
   he did not trade the truth away to please them: before the last part the game offers to stop, and every reason for stopping is
   true. The voice can be read from the sentence at the foot of the view (claim): where the account says "us" or "we" (17:27-29) or
   names all people everywhere (17:30), the claim says so too; what he declares "to you" (17:23) has neither. A voice is named on its
   control by whom it is said to or with (VOICE). ps: the passages that the Study Edition's marginal references set beside that part,
   which then appear on his tablets. */
const PARTS=[null,
 {g:'altar',v:'you',told:['v22','v23'],claim:'there_is_a_god_whom_athens',ps:[]},
 {g:'roof',v:'you',told:['v24'],claim:'god_lives_in_no_temple',ps:['k8']},
 {g:'dish',v:'you',told:['v25'],claim:'god_needs_nothing_from_human_hands',ps:['ps50','is42']},
 {g:null,v:'we',told:['v26','v27'],claim:'every_nation_comes_from_one',ps:['de4','ps145']},
 {g:'line',v:'we',told:['v28'],claim:'it_is_by_him_that_we_live',ps:['ps36']},
 {g:'block',v:'we',told:['v29'],claim:'we_should_not_liken_the_divine',ps:['is40']},
 {g:null,v:'all',told:['v30','v31'],claim:'god_tells_all_people_everywhere',ps:['ps96']}];
const partNo=()=>{let n=1;while(n<=7&&F['s'+n])n++;return n};
function sp11(){if(!G.sp11)G.sp11={ground:null,voice:'you',lean:partNo()-1,warned:0};return G.sp11}
async function hillIntro(){AU.mood='hill';await narr('sun_was_low_when_they_came',{dur:6200});await tell('v22');
  await say(JU,'you_have_been_brought_up_here');
  await say(P,'no_scroll_that_they_would_know',TH);sp11();codeBtn()}
/* the grounds he can still begin from: the grains that are left, and empty hands */
const grounds=()=>Object.keys(GRAIN).filter(k=>has(GRAIN[k].item)).concat([null]);
async function nextGround(){const st=sp11(),L=grounds();st.ground=L[(L.indexOf(st.ground)+1)%L.length];SFX.click()}
async function nextVoice(){const st=sp11();st.voice=VOICES[(VOICES.indexOf(st.voice)+1)%3];SFX.click()}
async function speakWith(id){if(!GITEM[id])return false;sp11().ground=GITEM[id];return speak()}
async function speak(){if(F.spoke)return;const st=sp11(),n=partNo(),p=PARTS[n];
  if(n===7&&!st.warned){st.warned=1;
    await say(P,'they_are_with_me_said',TH);
    await think('do_i_say_the_rest',[
      {q:'stop_here',no:'they_are_said'},
      {q:'keep_it_for_another_day',no:'there_may_be_no_other_day'},
      {q:'say_all_of_it_now',ok:1}]);
    return say(P,'nothing_of_theirs_carries_what_comes_now',TH)}
  if(st.ground!==p.g){
    if(n===7||n===4){await say(n===4?PH:JU,T(n===4?'you_begin_from_ground':'you_begin_from_ground_q',{ground:T(GRAIN[st.ground].cap),claim:T(p.claim)}));
      return say(P,n===4?'he_is_right_nothing':'nothing_that_i_picked_up_in_their_streets',TH)}
    if(!st.ground)return say(AN,T('you_tell_us_that_claim',{claim:T(p.claim)}));
    return say(n===1?JU:n%2?AN:PH,T(n===1?'we_asked_what_you_are_announcing':'you_begin_from_ground_and_what',{ground:T(GRAIN[st.ground].cap),claim:T(p.claim)}))}
  if(st.voice!==p.v){
    if(n<=3){await say(AN,st.voice==='we'?'we_said':'all_people_everywhere');
      return say(P,'what_i_saw_i_saw_in_their_streets',TH)}
    if(n===7){await say(JU,st.voice==='you'?'we_are_to_repent':'you_too_then');
      return say(P,'this_is_not_said_to_athens',TH)}
    if(st.voice==='all'){await say(AN,'all_people_everywhere');
      return say(P,'not_yet_said_like',TH)}
    await say(n===4?AN:PH,n===4?'you_were_all_made_out_of_one':n===5?'you_live_by_him_you_say':'we_are_not_to_think_so_you');
    return say(P,n===6?'said_like_that_it_is_an_accusation':'said_like_that_i_stand',TH)}
  for(const k of p.told)if(!(n===1&&k==='v22'))await tell(k);
  F['s'+n]=1;if(p.g)delItem(GRAIN[p.g].item);st.ground=null;st.lean=n;if(n<7)ring11(n);SFX.click();
  if(n===1)await say(JU,'our_own_altar');
  else if(n===2)await say(AN,'six_hundred_years_and_no_roof',{to:null});
  else if(n===3)await say(AN,'lacks_nothing');
  else if(n===4)await say(PH,'he_says_us',{to:null});
  else if(n===5)await say(PH,'that_line_is_one_of_ours',{to:null});
  else if(n===6)await say(JU,'he_says_we_should_not',{to:null});
  else return broke();
  codeBtn()}
/* the hearing breaks off (Acts 17:32). Nothing the player did wins anyone or loses anyone. */
async function broke(){await say(AN,'raised_from_the_dead_said',{to:null});await tell('v32');F.spoke=1;G.sp11=null;
  await narr('he_got_as_far_as_the_resurrection',{dur:4600});
  await say(PH,'not_all_of_us_are_laughing_stranger');
  place(PH,'hill11',452,124,-1);place(AN,'hill11',262,124,1);SFX.good();codeBtn()}

/* ============ SO PAUL LEFT THEM ============ */
/* Three kinds of men are left on the rock (Acts 17:32-34). Those who scoff are answered by the path down; those who would hear more
   are told where; and for those who join him the tablets open, for the first time in this chapter, at their first line. That they
   came down the path after him, and what he showed them, is invented. Insight ("Damaris") says that she heard Paul's defense and was
   possibly not a Greek, because women in Athens normally stayed out of public life: she listens from the path, below the seats. */
async function scoff(){if(F.down)return;await say(AN,'tell_us_again_about_the_dead');
  const o=['he_is_not_dead','you_asked_what_it_meant','say_no_more_to_them'],c=await choose(o);
  if(c===0){await say(P,o[0]);return say(AN,'not_dead_ex',{to:null})}
  if(c===1){await say(P,o[1]);return say(AN,'we_are_grateful')}
  return say(P,'every_answer_i_gave_them',TH)}
async function later(){if(F.later)return say(PH,'by_the_steps_of_the_long_colonnade');
  await say(PH,'where_does_a_man_find_you');
  await say(P,'in_the_marketplace_every');
  await say(PH,'by_the_statues_said');F.later=1;SFX.good();codeBtn()}
async function down(){if(F.down)return say(P,'they_are_waiting_for_me_here');
  if(!F.later)return say(P,'some_of_them_asked_to_hear');
  await tell('v33');await walk(P,150,126);F.rose=1;place(DI,'hill11',348,112,-1);await walk(DI,186,124);DI.dir=-1;P.dir=1;await tell('v34');
  await say(DI,'i_have_sat_in_judgment');
  await say(DM,'i_am_damaris');
  await say(DI,'you_spoke_of_the_god_who');
  F.down=1;SFX.good();codeBtn()}
async function openTablets(){if(!F.down)return false;if(F.open)return;F.open=1;
  await say(P,'it_is_written_said');SFX.pick();await say(P,quote(PS.ge1));
  await say(DM,'when_all_things_began');
  await say(P,'there_is_a_great_deal_more');
  await narr('tablets_that_nobody_in_the_marketplace',{dur:7600});return finale()}
async function finale(){AU.mood='rest';
  endScreen({title:'the_unknown_god',text:'he_had_no_scroll_that_they',
    based:'based_on_acts_17_16_34',
    go:'click_to_continue_to_chapter_twelve',code:['chapter_twelve_code_code',codeOf(12,0)]});
  await wait(1500);ov.onclick=()=>startChapter(12);await new Promise(()=>{})}

/* ============ ITEMS ============ */
/* A thought is carried and used like a thing. A question is a leaf of wax with a few pale strokes scratched into it; a grain is
   what he saw, in its own colors. None of them can be given away. */
const leaf11=g=>{g.fillStyle=lg(g,3,0,21,0,['#b07a42','#7e5428','#4e3218']);g.fillRect(3,3.6,18,17);R(g,3,3.6,18,.7,'#d09a5e');R(g,3,19.8,18,.8,'#3a2410');R(g,5,5.6,14,13,'#2e2218');R(g,5,5.6,14,.8,'#160e08')},PALE='#e8d8a8';
Object.assign(ICON,{
  /* a chisel, and the chips it has struck off */
  q11made(g){leaf11(g);stroke(g,[8,16.4,14.6,9.4],PALE,1.4);poly(g,[14.6,9.4,16.8,8.2,15.8,10.6],PALE);for(const[x,y]of[[8,9],[10.6,11.4],[15,15.2],[12,17]])R(g,x,y,1.2,1.2,'#a89868')},
  /* a gable on two posts */
  q11house(g){leaf11(g);stroke(g,[7,13,12,8.4,17,13],PALE,1.2);R(g,8,13.6,1.2,4.6,PALE);R(g,14.8,13.6,1.2,4.6,PALE)},
  /* a dish on its foot */
  q11need(g){leaf11(g);g.strokeStyle=PALE;g.lineWidth=1.2;g.beginPath();g.arc(12,10.2,5.2,.3,2.84);g.stroke();R(g,7,9.6,10,1.1,PALE);R(g,10.4,16.4,3.2,1.1,PALE)},
  /* a stone with an empty band */
  q11unk(g){leaf11(g);g.strokeStyle=PALE;g.lineWidth=1.1;g.strokeRect(7.6,7.6,8.8,9.6);R(g,9,11.2,6,2.4,'#5a4a34')},
  g11altar(g){base(g,6,20,12,13,'#d8ceb2');for(let i=0;i<7;i+=1.7)R(g,8+i,12,1,1.3,'rgba(70,56,44,.6)')},
  g11roof(g){for(const[x,h]of[[7,13],[12,14],[17,8]])col(g,x,19,h,3,'#e8dec6',{fl:2});R(g,3,19,18,1.4,'#c8bea6');R(g,2,20.4,20,1.2,'#a8a08a')},
  g11dish(g){g.fillStyle=lg(g,0,5,0,12,['#f0e6cc','#d8cdb0','#a89c80']);g.fillRect(5,5,14,7);for(let i=0;i<3;i++)R(g,5,6.6+i*1.9,14,.6,'rgba(90,76,56,.4)');vessel(g,12,21,5.4,5,'#b06a3a','bowl',{noShadow:1})},
  g11line(g){R(g,6.4,7,11.2,10,'#e6dcc0');R(g,6.4,7,11.2,.7,'#fff6dc');for(let j=0;j<4;j++)R(g,8,9+j*2,6+((j*5)%3),.7,j===1?'#2a2018':'rgba(70,56,40,.6)');for(const x of[4.4,17.2]){g.fillStyle=lg(g,x,0,x+2.4,0,['#6a4e2c','#d8c08a','#5a4226']);g.fillRect(x,6,2.4,12)}},
  g11block(g){const M='#ece6d6';g.fillStyle=lg(g,4,0,20,0,[tint(M,-.24),tint(M,.06),M,tint(M,-.3)]);g.fillRect(4,11,16,9.4);R(g,4,11,16,.8,'#ffffff');poly(g,[8,11,9,5.6,13.4,4.6,15.6,7,15,11],tint(M,-.04));poly(g,[9,5.6,13.4,4.6,12.6,7.4,9.6,8],'#ffffff')}});
Object.assign(ITEMS,{
  q11made:{name:'question_who_has_made_them',look:'who_made_them_said'},
  q11house:{name:'question_where_does_he_live',look:'where_does_he_live_said'},
  q11need:{name:'question_what_does_he_need',look:'what_does_he_need_said'},
  q11unk:{name:'question_one_they_do_not_know',look:'is_there_one_they_do_not_know_said'},
  g11altar:{name:'seen_altar_without_a_name',look:GRAIN.altar.note},g11roof:{name:'seen_temple_without_a_roof',look:GRAIN.roof.note},
  g11dish:{name:'seen_robe_and_covered_dish',look:GRAIN.dish.note},g11line:{name:'heard_line_of_their_poets',look:GRAIN.line.note},g11block:{name:'seen_god_in_the_making',look:GRAIN.block.note}});
/* two thoughts used on each other, or on the tablets: nothing comes of it, and Paul says why */
{const Q=Object.keys(QS),GI=Object.keys(GITEM),all=Q.concat(GI,['tablets']);for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){const a=all[i],b=all[j],k=[a,b].sort().join('+');
  COMBO[k]=()=>say(P,a==='tablets'||b==='tablets'?'not_into_the_tablets':isQ(a)&&isQ(b)?'one_question_at_a_time':isQ(a)||isQ(b)?'that_question_is_answered_already':'they_belong_together_and_on_the_hill',TH)}}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: Paul stands below the picture, and takes no step */
const qOn=kind=>id=>isQ(id)?ask(id,kind):false;
ROOMS.road11={space:.5,walk:[16,624,112,138],get mood(){return F.shut?'walk':'calm'},amb:{wind:.3,birds:.4},hs:[
  {name:'road_down_to_the_harbor',x:0,y:60,w:16,h:46,wx:20,wy:122,dir:-1,exit:()=>say(P,'not_while_silas_and_timothy'),look:'road_back_down_to_the_sea'},
  {name:'Acropolis',x:398,y:40,w:108,h:34,wx:452,wy:114,look:'rock_of_their_city_with_the_temple',useWith:qOn('temple')},
  {name:'temple_of_zeus',x:238,y:40,w:96,h:44,wx:290,wy:114,useWith:qOn('roof'),
    look:()=>say(P,F.qhouse?'house_of_their_highest':'columns_as_tall_as_cedars')},
  {name:'altars_by_the_road',x:60,y:76,w:196,h:30,wx:150,wy:114,def:'use',use:toBases,useWith:id=>isQ(id)?(id==='q11unk'?toBases():ask(id,'altar')):false,
    look:()=>say(P,F.qunk?'altars_and_statues_all':F.shut?'altars_and_the_bases_of_statues':'altars_one_after_another_said')},
  {name:'statue_of_a_hero',x:134,y:50,w:16,h:54,wx:158,wy:114,dir:-1,look:'man_in_marble_with_his_mantle',useWith:qOn('statue')},
  {name:'bronze_statue',x:314,y:48,w:16,h:56,wx:338,wy:114,dir:-1,look:'man_in_bronze_larger_than_i_am',useWith:qOn('statue')},
  {name:'city_gate',x:592,y:64,w:32,h:42,wx:608,wy:114,dir:1,exit:()=>goto('street11',40,122,1),look:'gate_of_athens'}]};
ROOMS.street11={space:.8,walk:[16,624,112,138],get mood(){return F.shut?'walk':'calm'},amb:{crowd:.25,fountain:.5,birds:.2},hs:[
  {name:'city_gate',x:0,y:40,w:14,h:64,wx:18,wy:122,dir:-1,exit:()=>goto('road11',604,122,-1),look:'gate_and_the_road_down'},
  {name:'fountain',x:42,y:78,w:36,h:28,wx:86,wy:114,dir:-1,look:'fountain_in_the_wall_clean',use:'i_drink_the',pickup:'fountain_stays_where_it_is'},
  {name:'houses',x:462,y:30,w:120,h:30,wx:560,wy:114,look:'plastered_houses_with_tiled'},
  {name:'door',x:554,y:62,w:24,h:42,wx:566,wy:114,look:'somebodys_door_said',open:'it_is_not_my_door_and_i'},
  ...STAT.map(s=>({get name(){return seenS(s.id)?s.nm:'statue'},x:s.x-8,y:46,w:16,h:58,wx:s.x+(s.id==='p2'?-24:22),wy:114,dir:s.id==='p2'?1:-1,
    look:async()=>{(G.s11||(G.s11={}))[s.id]=1;if(s.id==='p1'||s.id==='p2')G.s11.p1=G.s11.p2=1;await say(P,s.look)},useWith:qOn('statue'),pickup:'it_is_bronze_and_marble',use:'there_is_nothing_that_i'})),
  ...LANES.map(([x,k])=>({name:'lane',x,y:56,w:30,h:48,wx:x+15,wy:114,exit:()=>lane(k),look:'a_lane_between_two_houses'})),
  {name:'way_to_the_marketplace',x:608,y:40,w:32,h:66,wx:622,wy:124,dir:1,exit:toAgora,look:'street_runs_on_to_the_marketplace'}]};
ROOMS.syn11={space:1.4,walk:[16,304,112,137],mood:'still',amb:{crowd:.1},hs:[
  {name:'door_to_the_lane',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(P,'not_before_i_have_said'),look:'door_to_the_lane_beyond'},
  {name:'benches',x:56,y:84,w:62,h:20,wx:90,wy:113,look:'benches_of_stone_along_the_wall_said',use:'i_have_been_asked_to_sit'},
  {name:'windows',x:108,y:22,w:106,h:24,wx:160,wy:113,look:'two_small_windows_with_upright_bars'},
  {name:'lamp_niche',x:72,y:50,w:18,h:22,wx:90,wy:113,look:'a_lamp_in_its_niche_not_lit',pickup:'it_belongs_to_this_house'},
  {name:'chest_of_the_scrolls',x:212,y:68,w:38,h:36,wx:206,wy:114,dir:1,look:'chest_of_the_scrolls_under_a_cloth',open:'it_is_not_mine_to_open_2',pickup:'it_is_not_mine_to_carry_off'},
  {name:'readers_table',x:130,y:82,w:64,h:22,wx:160,wy:113,look:'table_from_which_the_law',pickup:'it_stands_where_the_whole'},
  {name:'men_and_women_of_the_synagogue',x:254,y:78,w:60,h:50,wx:236,wy:126,dir:1,look:'jews_of_athens_and_with_them',talk:()=>synTalk()}]};
ART.syn11.draw=g=>cast(g,[['hx111',272,122,-1],['hx112',292,128,-1],['hx113',300,118,-1]],lit11(280,122));
ROOMS.agora11={space:.6,walk:[16,624,112,138],mood:'market',amb:{crowd:.6,birds:.2,hammer:.12},enter:async()=>{if(all5()&&!F.led)return dispute()},hs:[
  {name:'street',x:0,y:40,w:16,h:66,wx:20,wy:124,dir:-1,exit:()=>goto('street11',612,124,-1),look:'street_back_toward_the_fountain'},
  {name:'Acropolis',x:372,y:6,w:150,h:30,wx:446,wy:114,look:'acropolis_over_every_roof_in_the_city',useWith:qOn('temple')},
  {name:'temple_of_hephaestus',x:54,y:6,w:100,h:36,wx:110,wy:114,look:'temple_on_the_low_hill',useWith:qOn('temple')},
  {name:'houses_of_the_craftsmen',x:18,y:52,w:76,h:52,wx:60,wy:114,look:'shops_and_houses_under_the_temple_hill'},
  {name:'boundary_stone',x:34,y:78,w:12,h:28,wx:52,wy:114,dir:-1,look:'stone_that_marks_where_the_marketplace_begins'},
  {name:'basin',x:47,y:91,w:20,h:15,wx:74,wy:114,dir:-1,look:'basin_of_water_beside_the_boundary',use:()=>F.basin?say(P,'no_i_said'):basin(),pickup:'it_is_of_stone_and_it_is'},
  {name:'lane_to_the_craftsmen',x:96,y:48,w:32,h:56,wx:112,wy:114,exit:()=>!F.basin?basin():goto('yard11',60,124,1),look:'steps_that_climb_between'},
  {name:'long_colonnade',x:CX,y:28,w:CW,h:60,wx:340,wy:114,look:'colonnade_the_length_of_a_street'},
  {name:'image_in_the_colonnade',x:CX+110,y:46,w:18,h:54,wx:CX+146,wy:114,dir:-1,look:'image_of_one_of_their_gods',useWith:qOn('statue')},
  {name:'potters_wares',x:246,y:96,w:60,h:14,wx:276,wy:116,look:'jars_jugs_and_bowls_on_a_mat',pickup:'they_are_for_sale_and_i'},
  {name:'jars_of_oil',x:438,y:94,w:28,h:14,wx:468,wy:116,dir:-1,look:'oil_in_tall_jars_waiting',pickup:'they_are_not_mine'},
  {name:'steps_of_the_colonnade',x:380,y:98,w:76,h:8,wx:372,wy:118,dir:1,look:'steps_of_the_long_colonnade',use:'i_have_been_sitting_and_talking'},
  {name:'painted_colonnade',x:484,y:36,w:54,h:68,wx:510,wy:114,exit:()=>!F.basin?basin():F.shut?goto('stoa11',40,124,1):say(P,'two_men_are_teaching_in_there'),look:'second_colonnade_with_painted'},
  {name:'women_of_the_city',x:268,y:74,w:34,h:50,wx:320,wy:124,dir:-1,look:'woman_of_this_city_wrapped',talk:'it_would_not_be_seemly_here'},
  {name:'woman_in_a_mantle',x:576,y:70,w:16,h:50,wx:556,wy:122,dir:1,look:'woman_with_her_mantle_drawn',talk:'it_would_not_be_seemly_here_said'},
  {name:'road_across_the_square',x:150,y:126,w:120,h:18,wx:210,wy:130,look:'broad_road_of_gravel_runs'},
  {name:'path_up_the_hill_of_ares',x:600,y:60,w:40,h:46,wx:620,wy:116,dir:1,exit:()=>say(P,'hill_of_ares_where_their_court_sits'),look:'bare_hill_of_rock_beside'}]};
ROOMS.yard11={space:.6,walk:[16,304,114,138],get mood(){return F.shut?'walk':'calm'},amb:{chisel:.7,crowd:.15},hs:[
  {name:'gate_to_the_lane',x:16,y:52,w:30,h:52,wx:36,wy:116,dir:-1,exit:()=>goto('agora11',112,116,1),look:'gate_and_the_steps_back'},
  {name:'temple_of_hephaestus',x:150,y:8,w:150,h:36,wx:230,wy:116,look:'temple_straight_above_this_yard',useWith:qOn('temple')},
  {name:'bench_of_tools',x:68,y:84,w:66,h:20,wx:100,wy:116,look:'chisels_a_mallet_a_rasp',pickup:'they_are_his_and_he_needs',use:'stone_is_not_my_trade'},
  {name:'figures_of_silver',x:246,y:62,w:62,h:24,wx:262,wy:116,dir:1,look:'small_figures_in_silver',pickup:'they_are_for_sale_and_i_said',useWith:qOn('statue')},
  {name:'blocks_of_marble',x:212,y:84,w:104,h:20,wx:250,wy:116,look:'marble_as_it_comes_from_the_mountain',useWith:qOn('*')},
  {name:'block_with_half_a_figure',x:164,y:58,w:42,h:52,wx:136,wy:118,dir:1,look:'a_block_of_marble',
    useWith:qOn('block'),pickup:'it_took_four_men_and_a_sledge',use:'i_cut_cloth_not_stone'}]};
ROOMS.stoa11={space:1.5,walk:[16,464,112,138],mood:'both',amb:{crowd:.3},hs:[
  {name:'steps_down_to_the_marketplace',x:0,y:60,w:18,h:84,wx:20,wy:124,dir:-1,exit:()=>goto('agora11',510,116,-1),look:'way_back_out_to_the_marketplace'},
  {name:'painted_panels',x:24,y:20,w:434,h:54,wx:240,wy:114,look:'great_panels_along_the_wall'},
  {name:'image_in_the_recess',x:226,y:30,w:28,h:74,wx:270,wy:114,dir:-1,look:'one_of_their_gods_in_a_recess',useWith:qOn('statue')},
  {name:'bench',x:40,y:86,w:60,h:18,wx:70,wy:113,look:'stone_bench'},
  {name:'bench',x:380,y:86,w:60,h:18,wx:410,wy:113,look:'stone_bench'},
  {name:'hearers_of_the_stoic',x:108,y:74,w:38,h:52,wx:160,wy:124,dir:-1,look:'his_hearers_one_young_one_gray',talk:()=>sift('s')},
  {name:'hearers_of_the_epicurean',x:338,y:74,w:38,h:52,wx:320,wy:124,dir:1,look:'his_hearers',talk:()=>sift('e')}]};
const stoneHs=STONES.map((s,i)=>({get name(){return readS(s.id)?s.nm:s.k==='altar'?'altar':'base_of_a_statue_2'},x:sx(i),y:stoneTop(s)-3,w:BW,h:BY-stoneTop(s)+3,wx:160,wy:236,
  look:()=>stoneLook(s),useWith:id=>stoneAsk(s,id),pickup:'it_has_stood_here_longer_said',use:()=>stoneLook(s)}));
ROOMS.bases11={space:.5,walk:NOW,get mood(){return'walk'},amb:{wind:.3,birds:.4},hs:[
  ...stoneHs,
  {name:'feet_of_a_statue',x:sx(1)+4,y:0,w:BW-8,h:74,wx:160,wy:236,look:'feet_and_the_hem_of_a_man'},
  {name:'feet_of_a_statue',x:sx(3)+4,y:0,w:BW-8,h:74,wx:160,wy:236,look:'the_feet_and_the_hem_of_a_man'},
  {name:'ivy',x:sx(1),y:bandY(STONES[1])-8,w:BW,h:22,wx:160,wy:236,def:'use',vis:()=>!b11().ivy,use:ivy,pickup:ivy,open:ivy,look:'ivy_as_thick_as_a_blanket'},
  {name:'piece_of_stone',x:sx(3)+BW-10,y:122,w:24,h:14,wx:160,wy:236,look:fragment,pickup:fragment,use:fragment},
  {name:'back_to_the_road',x:248,y:126,w:72,h:18,wx:160,wy:236,exit:()=>step('road11',150,116,1),look:'road_and_the_rest_of_the_row'}]};
const NEXT=[null,'they_want_to_know_what','next_the_god_who_made_the_world',
  'next_he_is_not_waited_on_as_though','next_from_one_man_he_made',
  'next_it_is_by_him_that_we','next_then_we_should_not',
  'now_the_rest_he_has_looked'];
ROOMS.hill11={space:.4,get walk(){return F.spoke?[30,524,116,138]:[366,366,120,120]},mood:'hill',amb:{wind:.6},hs:[
  {name:'Acropolis',x:300,y:10,w:248,h:50,wx:400,wy:120,look:'their_goddess_and_her_house'},
  {name:'city_below',x:0,y:78,w:226,h:24,wx:120,wy:120,look:'roofs_of_athens_and_the_colonnades'},
  {name:'altar_on_the_rock',x:498,y:86,w:20,h:16,wx:480,wy:120,dir:1,look:'altar_up_here_as_well'},
  {name:'men_on_the_seats',x:228,y:60,w:268,h:56,wx:366,wy:120,def:'talk',vis:()=>!F.spoke,talk:speak,use:speak,
    useWith:id=>id==='tablets'?say(P,'not_here',TH):speakWith(id),
    look:()=>say(P,NEXT[partNo()],TH)},
  {name:'what_i_begin_from',x:206,y:132,w:172,h:12,wx:366,wy:120,def:'use',vis:()=>!F.spoke,use:nextGround,look:'what_i_begin_from_something'},
  {name:'how_i_say_it',x:378,y:132,w:148,h:12,wx:366,wy:120,def:'use',vis:()=>!F.spoke,use:nextVoice,look:'how_i_say_it_to_them_as_you'},
  {name:'men_who_are_laughing',x:230,y:66,w:74,h:50,wx:300,wy:126,dir:-1,def:'talk',vis:()=>!!F.spoke,talk:scoff,look:'some_are_on_their_feet_and_laughing'},
  {name:'men_of_the_court',x:310,y:60,w:106,h:48,wx:366,wy:124,vis:()=>!!F.spoke,look:()=>say(P,F.rose?'the_men_of_the_court':'men_of_the_court_said'),talk:'they_have_heard_me'},
  {name:'men_who_would_hear_more',x:420,y:66,w:74,h:50,wx:428,wy:126,dir:1,def:'talk',vis:()=>!!F.spoke,talk:later,look:'these_did_not_laugh'},
  {name:'path_down',x:0,y:104,w:30,h:40,wx:34,wy:128,dir:-1,vis:()=>!!F.spoke,exit:down,look:'path_down_to_the_city_the_way'}]};

/* ============ PEOPLE ============ */
const THINK='thought_is_not_a_thing';
NI.hs={name:'Nikias',actor:NI,look:'old_athenian_by_the_fountain',talk:nikias,
  show:{tablets:'wax_tablets_a_man','*':'do_not_show_me'}};
DS.hs={name:'Dositheos',actor:DS,look:()=>say(P,'dositheos_the_attendant_of_the_synagogue'),talk:()=>F.syn?say(DS,'on_the_sabbath_then'):synTalk(),
  show:{tablets:'you_carry_the_scriptures_in_wax','*':'keep_it_brother_2'}};
CH.hs={name:'Charmides',actor:CH,look:'charmides',give:id=>!F.basin?basin():id==='tablets'&&!F.shut?steps():false,
  show:{tablets:'more_names','*':'do_not_tell_me_yet'},
  talk:async()=>{if(!F.basin)return basin();if(!F.shut)return steps();return talkTree([
    {q:'what_is_the_temple_without',once:1,a:()=>say(CH,'the_temple_of_zeus')},
    {q:'where_are_the_images_made',once:1,a:()=>say(CH,'up_the_steps_under_the_temple')},
    {q:'who_teaches_in_this_city',once:1,a:()=>say(CH,'everybody_said')},
    {q:'i_shall_be_back',bye:1}])}};
AR.hs={name:'Aristion',actor:AR,look:'aristion',give:id=>!F.basin?basin():id==='tablets'&&!F.shut?steps():false,
  show:{tablets:'shut_i_see','*':'a_thought'},
  talk:()=>!F.basin?basin():!F.shut?steps():say(AR,all5()?'you_have_the_look_of_a_man':'have_you_asked_your_questions_yet')};
XE.hs={name:'Xenokles',actor:XE,look:'xenokles_a_stonecutter',give:id=>id==='q11made'?RIGHT.block():isQ(id)?ask(id,'*'):false,
  show:{tablets:'i_cannot_read_friend','*':'tell_it_to_the_stone'},
  talk:()=>talkTree([
    {q:'what_are_you_making',once:1,a:()=>say(XE,'a_god')},
    {q:'how_long_does_one_take_you',once:1,a:()=>say(XE,'this_morning_he_was_rock_said')},
    {q:'i_am_a_craftsman_myself_a_tentmaker',once:1,a:()=>say(XE,'you_know')},
    {q:'good_work_to_you',bye:1}])};
SL.hs={name:'slave_with_a_robe_and_a_dish',actor:SL,look:'slave_resting_by_the_road',give:id=>isQ(id)?ask(id,'dish'):false,
  show:{tablets:'i_cannot_read_sir','*':'i_do_not_understand_sir'},
  talk:()=>say(SL,'clean_robe_every_seventh')};
PH.hs={name:'Philokles',actor:PH,look:()=>say(P,G.room==='hill11'?'philokles_the_stoic':'philokles'),
  give:id=>G.room==='hill11'&&!F.spoke?speakWith(id):false,
  show:{tablets:'scratches_on_wax','*':'say_it_aloud_to_all_of_us'},
  talk:()=>G.room==='hill11'?(F.spoke?later():speak()):G.room==='stoa11'?sift('s'):say(PH,'come_along_stranger')};
AN.hs={name:'Antigenes',actor:AN,look:()=>say(P,G.room==='hill11'?'antigenes_the_epicurean':'antigenes'),
  give:id=>G.room==='hill11'&&!F.spoke?speakWith(id):false,
  show:{tablets:'i_prefer_my_friends_to_my_books','*':'is_it_something_new'},
  talk:()=>G.room==='hill11'?(F.spoke?scoff():speak()):G.room==='stoa11'?sift('e'):say(AN,'after_you_seed_picker')};
DI.hs={name:'Dionysius',actor:DI,look:'dionysius_a_judge_of_the_court',give:id=>id==='tablets'?openTablets():false,
  show:{'*':'i_do_not_follow_you_yet'},talk:()=>say(DI,'you_said_nothing_up_there')};
DM.hs={name:'Damaris',actor:DM,look:()=>say(P,F.down?'damaris':'woman_on_the_path_with_her_mantle'),give:id=>id==='tablets'?openTablets():false,
  show:{'*':'i_do_not_follow_you_yet_sir'},talk:()=>say(DM,F.down?'i_have_heard_many_teachers':'i_am_listening_sir')};

/* ============ WAX TABLETS: people met, tasks still open, the Scriptures, and what he has seen in Athens ============ */
const psIf=(k,f)=>Object.assign({},PS[k],f?{if:()=>!!F[f]}:{});
const TABLETS={
  people:[
    {name:'silas_and_timothy',note:'still_in_beroea'},
    {name:'Nikias',note:'an_old_athenian_by_the_fountain',if:()=>!!F.way},
    {name:'Dositheos',note:'attendant_of_the_synagogue_of_athens',if:()=>!!F.syn},
    {name:'charmides_and_aristion',note:'they_sit_on_the_steps_of_the_long',if:()=>!!F.basin},
    {name:'Xenokles',note:'stonecutter_under_the_temple_of_hephaestus',if:()=>!!F.qmade},
    {name:'Philokles',note:'he_teaches_the_stoics_in_the_painted',if:()=>!!F.stoic||!!F.led},
    {name:'Antigenes',note:'he_teaches_the_epicureans',if:()=>!!F.epic||!!F.led},
    {name:'Dionysius',note:'judge_of_the_court_of_the_areopagus',if:()=>!!F.down},
    {name:'Damaris',note:'she_listened_from_the_path',if:()=>!!F.down}],
  tasks:[
    {t:'find_the_synagogue',if:()=>!F.way&&!F.syn},
    {t:()=>T('way_to_the_synagogue_way',{way:T(WAY)}),if:()=>!!F.way&&!F.syn},
    {t:'men_on_the_steps_want_to_hear',if:()=>!!F.basin&&!F.shut},
    {t:'who_made_them_find',if:()=>!!F.shut&&!F.qmade},
    {t:'where_does_he_live_find',if:()=>!!F.shut&&!F.qhouse},
    {t:'what_does_he_need_find',if:()=>!!F.shut&&!F.qneed},
    {t:'is_there_one_they_do_not_know_read',if:()=>!!F.shut&&!F.qunk},
    {t:'two_men_teach_in_the_painted_colonnade',if:()=>!!F.shut&&!(F.stoic&&F.epic)},
    {t:'back_to_the_marketplace',if:()=>all5()&&!F.led},
    {t:'they_have_asked_what_i_am_announcing',if:()=>!!F.led&&!F.spoke},
    {t:'some_would_hear_more',if:()=>!!F.spoke&&!F.later},
    {t:'leave_them',if:()=>!!F.later&&!F.down},
    {t:'dionysius_asks_whether',if:()=>!!F.down&&!F.open}],
  scripture:[psIf('is42'),psIf('de4'),psIf('ps145'),psIf('k8','s2'),psIf('ps50','s3'),psIf('ps36','s5'),psIf('is40','s6'),psIf('ps96','s7'),psIf('ge1','open')],
  notes:{title:'seen_in_athens',none:'nothing_yet',list:[...Object.keys(GRAIN).map(k=>({t:GRAIN[k].note,if:()=>!!F[GRAIN[k].f]})),
    {t:'epicurean_grants_it_a_god',if:()=>!!F.epic}]}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={road11:[40,124,1],street11:[40,122,1],syn11:[84,128,1],agora11:[40,124,1],yard11:[60,124,1],stoa11:[40,124,1],bases11:[160,236,1],hill11:[366,120,1]};
function place11(room){for(const a of[NI,CH,AR,XE,SL,PH,AN,DS,DI,DM]){a.room=null;a.bow=false;a.talk=false}P.bow=false;
  if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  if(room==='road11'){place(P,room,40,124,1);if(F.shut&&!F.qneed)place(SL,room,388,122,-1)}
  else if(room==='street11'){place(P,room,40,122,1);place(NI,room,98,120,-1)}
  else if(room==='syn11'){place(P,room,84,128,1);place(DS,room,236,120,-1)}
  else if(room==='agora11'){place(P,room,40,124,1);place(AR,room,430,117,-1);if(F.basin)place(CH,room,404,114,-1);else place(CH,room,76,121,-1)}
  else if(room==='yard11'){place(P,room,60,124,1);place(XE,room,146,122,1)}
  else if(room==='stoa11'){place(P,room,40,124,1);place(PH,room,80,121,1);place(AN,room,402,121,-1);G.z11=null;h11()}
  else if(room==='bases11'){place(P,room,160,236,1);b11()}
  else if(room==='hill11'){place(P,room,366,120,1);place(DM,room,96,126,1);
    if(F.spoke){place(PH,room,452,124,-1);place(AN,room,262,124,1);G.sp11=null}else{place(PH,room,504,122,-1);place(AN,room,214,122,1);G.sp11=null;sp11()}
    if(F.rose)place(DI,room,186,124,-1);if(F.down)place(P,room,150,126,1)}
  swapBtn()}
function setup11(){P.hs=null;P.called='Paul';G.b11=G.h11=G.sp11=null;G.wrong11=0;G.s11={};G.z11=null;G.caps11=[];place11('road11');G.inv=['tablets'];G.invs={paul:G.inv};drawInv()}

/* ============ THE START ============ */
async function start11(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(11);G.end={};
    try{await need('map');await SHARED.map.journey(ROAD,{view:'west',labels:LAB});await narr('brothers_from_beroea_had',{dur:7600,low:1})}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;place11('road11');enterRoom('road11',...ENT.road11);codeBtn();await fade(0,700);
    await narr('about_50_c_e_the',{dur:9500});
    await narr('he_had_seen_idols_in_every_city',{dur:5600});await tell('v16');
    await say(P,'there_will_be_a_synagogue',TH);codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
const SPH=[null,
  ['they_ask_whether_what_i','i_begin_from_their_altar'],
  ['where_does_the_god_who','i_begin_from_the_temple'],
  ['does_he_need_anything','i_begin_from_the_robe_and_the_dish'],
  ['nothing_of_theirs_says','empty_hands_and_i_say_we'],
  ['their_own_poets_have_said','i_begin_from_the_line_of_their_poets'],
  ['if_we_are_his_children','i_begin_from_the_block'],
  ['what_comes_now_rests_on_nothing','empty_hands_and_i_say_all']];
function hint11(){
  if(F.down)return['open11',['they_have_never_heard_of_moses_either','i_give_my_wax_tablets_to_dionysius']];
  if(F.spoke)return F.later?['down11',['every_answer_makes_the_scoffers_merrier','i_take_the_path_down_at_the_left']]:['later11',['not_all_of_them_laughed','i_talk_to_philokles_and_tell']];
  if(F.led)return['sp'+partNo()+'11',SPH[partNo()]];
  if(all5())return['back11',['i_have_what_i_came_for_whoever','i_go_back_to_the_marketplace']];
  if(F.shut){const r=G.room;
    if(r==='bases11'||(r==='road11'&&!F.qunk&&F.qhouse&&F.qneed)){const st=b11();return!F.qunk?['unk11',['three_of_these_stones_seem',
      !st.ivy?'i_draw_the_ivy_aside_from_the_second':!st.read.ivy?'i_look_at_the_base_where':!st.frag?'i_look_at_the_piece_of_stone':!st.read.broken?'i_look_at_the_broken_base_again':'i_look_at_the_altar_with_nothing']]
      :['road11b',['this_road_has_more_to_show','temple_without_a_roof_and_the_slave']]}
    if(r==='stoa11'&&!(F.stoic&&F.epic))return['stoa11',['man_can_be_wrong_about_nearly',
      !F.stoic?'i_stand_at_the_left_end':'i_stand_at_the_right_end']];
    if(!F.qmade&&(r==='yard11'||r==='agora11'))return['made11',['who_made_them_there','from_the_marketplace_i']];
    if(!F.qhouse)return['house11',['where_does_he_live_on','on_the_road_outside_the_gate']];
    if(!F.qneed)return['need11',['what_does_he_need_i','on_the_road_outside_the_gate_said']];
    if(!F.qunk)return['unk11a',['is_there_one_they_do_not_know_the','on_the_road_outside_the_gate_i']];
    if(!F.qmade)return['made11',['who_made_them_there','from_the_marketplace_i']];
    return['stoa11a',['two_schools_teach_in_this_city','from_the_marketplace_i_said']]}
  if(F.basin)return['steps11',['they_want_to_hear_something','i_talk_to_the_men_on_the_steps']];
  if(F.syn)return['basin11',['man_spoke_to_me_at_the_boundary','i_talk_to_charmides_by_the_basin']];
  if(G.room==='syn11')return['syn11',['i_was_asked_to_speak','i_talk_to_dositheos']];
  if(F.way)return['lane11',['he_gave_the_way_by_the_statues','past_the_bronze_in_the_helmet_said']];
  if(G.room==='street11')return['way11',['somebody_here_will_know','i_talk_to_the_old_man_by_the_fountain']];
  return['gate11',['city_lies_through_the_gate','i_walk_up_the_road_and_go']]}

/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_i_said']};
return{acting:ACTING,rooms:['road11','street11','syn11','agora11','yard11','stoa11','bases11','hill11'],setup:setup11,start:start11,hint:hint11,music:MUSIC,scenes:{},topics:[],tablets:TABLETS,calls:CALLS,
  /* for the playtest: what is told, the passages, the grains and the parts of the speech, the stones and the statues, and the sayings */
  told:TOLD,ps:PS,grain:GRAIN,parts:PARTS,stones:STONES,stat:STAT,says:SAYS,way:WAY,lanes:LANES,voices:VOICES,voice:VOICE,sx,ring:ring11,
  /* The chapter opens on the map, once: Athens, and Beroea far to the north. Nobody travels. */
  view:'west',labels:LAB,route:ROAD,
  flags:['way','syn','basin','shut','qmade','qhouse','qneed','qunk','stoic','epic','led','s1','s2','s3','s4','s5','s6','s7','spoke','later','rose','down','open'],
  /* eight rooms and twenty-three flags today; the code keeps room for sixteen and for thirty-two. Paul is alone: there is no party. */
  codeBits:{flags:32,rooms:4},ent:ENT,
  inv:()=>['tablets'].concat(F.shut?['q11made','q11house','q11need','q11unk'].filter(q=>!F[GRAIN[QS[q]].f]):[],
    Object.keys(GRAIN).filter(k=>F[GRAIN[k].f]&&!F['s'+PARTS.findIndex(p=>p&&p.g===k)]).map(k=>GRAIN[k].item)),
  place:place11}
});
