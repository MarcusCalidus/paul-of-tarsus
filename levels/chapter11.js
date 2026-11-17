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
    ao(g,cx-62*k,base-9*k,126*k,9*k,'b',.3,'#5a5a3a');tex(g,'mott',.4,cx-62*k,top,126*k,34*k,'overlay',.6)});
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
function base(g,x,y,w,h,c){R(g,x+1.5,y,w,1.6,'rgba(40,30,60,.3)');g.fillStyle=lg(g,x,0,x+w,0,[tint(c,-.26),tint(c,.14),c,tint(c,-.34)]);g.fillRect(x,y-h,w,h);
  R(g,x-1,y-h,w+2,1.6,tint(c,.1));R(g,x-1,y-h,w+2,.5,tint(c,.36));R(g,x-1,y-h+1.6,w+2,.5,tint(c,-.34));R(g,x-1,y-1.6,w+2,1.6,tint(c,-.14));R(g,x-1,y-1.6,w+2,.5,tint(c,.12));
  inRect(g,x,y-h,w,h,()=>tex(g,'mott',.35,x,y-h,w,h,'overlay',.6))}
/* statue: a draped figure in marble or bronze on its base, painted as the people are (the look says stone:1). No arm is stretched out. */
function statue(g,x,y,bh,id,dir,o){o=o||{};base(g,x-8,y,16,bh,o.base||'#cfc3a6');man(g,x,y-bh+.5,id,dir,0,o.lit,o.ges,0)}
const olive=(g,x,y,s,r)=>{stroke(g,[x,y,x-.6*s,y-5*s,x+1*s,y-9*s],'#5a4a36',1.6*s);stroke(g,[x-.4*s,y-5*s,x-3*s,y-9*s],'#5a4a36',1*s);foliage(g,x,y-12*s,8*s,5*s,'#7a8e62',r,60*s);foliage(g,x+3*s,y-10*s,5*s,3.4*s,'#8a9c70',r,24*s)};
/* earth: a road of trodden earth and small stones, lighter where it is most walked */
function earth(g,x0,y0,x1,y1,c,r){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x0,y0,x1-x0,y1-y0);
  inRect(g,x0,y0,x1-x0,y1-y0,()=>{tex(g,'mott',.5,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'grain',.16,x0,y0,x1-x0,y1-y0,'overlay',.5);
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
  sky(g,640,72,['#4a86c8','#86b2dc','#cfe0ea','#efe6cc']);cloud(g,90,14,60,5,r);cloud(g,300,9,44,4,r);cloud(g,570,16,46,4,r);
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
  shade(g,[548,106,640,106,640,112,540,116],SH,.4);
  /* altars and monuments along the roadside: plain blocks, each with a band of cut letters; two carry a figure */
  for(const[x,w,h,c]of[[66,15,23,'#cbbf9f'],[90,17,27,'#d8ceb2'],[116,14,21,'#c2b596'],[164,16,25,'#d2c6a6'],[188,15,22,'#c8bc9c'],[212,17,28,'#dcd2b6'],[238,14,20,'#c6ba9a'],[346,16,24,'#cabe9e'],[494,15,22,'#c4b898']]){
    base(g,x,106,w,h,c);marks(g,x+2.5,106-h*.62,w-5,2,r)}
  statue(g,142,106,10,'st11her',1);statue(g,322,106,11,'st11brz',-1);
  earth(g,0,105,640,144,'#c9b58a',r);ao(g,0,105,640,5,'t',.3,'#4a4460');
  for(let i=0;i<34;i++){const x=r()*640;foliage(g,x,106+r()*2,3+r()*3,1.2,'#8a9458',r,8)}
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,105,640,39)});pool(g,200,0,300,150,'#fff4d6',.1,'screen')},
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
 paint(g){const r=rng(1103);
  sky(g,640,60,['#4a86c8','#86b2dc','#d2e2ea']);cloud(g,120,10,50,4,r);cloud(g,520,14,44,4,r);
  acropolis(g,330,50,.7,r);
  /* house fronts, with a lane between each two */
  const H=[[0,160,'#e2d4b0',30],[190,60,'#d8c8a2',26],[280,60,'#e6dabb',32],[370,60,'#dccca6',28],[460,150,'#e0d2ae',30]];
  for(const[x,w,c,top]of H){house(g,x,top,w,104-top,c,r,{patch:2,cracks:3,beams:14});R(g,x,top-3.5,w,1.6,'#b8603c');for(let i=x;i<x+w;i+=4)R(g,i,top-3.5,.5,1.6,'rgba(90,40,24,.35)')}
  /* each lane: a house at its far end, the ground running back to it, and the walls on either side in shade */
  for(const[x]of LANES){const c=tint('#d8caa6',(r()-.5)*.12);R(g,x,56,30,48,c);R(g,x,56,30,1.2,'#b8603c');R(g,x+18,66,5,5,'#3a2c22');R(g,x+7,76,8,14,'#4a3624');R(g,x+7,76,8,.6,'#7a5c36');
    poly(g,[x,104,x+30,104,x+22,90,x+8,90],'#c2b594');poly(g,[x,26,x+8,56,x+8,90,x,104],'#8f8aa0');poly(g,[x+30,26,x+22,56,x+22,90,x+30,104],'#a09aa6');
    ao(g,x,56,30,12,'t',.3,'#2a2440');comp(g,'multiply',.5,()=>R(g,x,56,30,48,'#a8a4c4'))}
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
  for(const[x,c,k]of[[98,'#9a5a36','jar'],[204,'#8a4a2a','amph'],[384,'#a8642e','jar'],[598,'#9a5a36','pithos']])vessel(g,x,105,k==='pithos'?5:3.4,k==='pithos'?14:10,c,k);
  pave(g,0,103,640,144,'#cdc09e',r,{vx:320,vy:60,rows:4,step:44,v:.07});ao(g,0,103,640,6,'t',.35,'#3a3050');
  shade(g,[0,104,640,104,640,111,0,114],SH,.34);comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,640,41)})},
 light:null,
 draw(g,t){for(let i=0;i<3;i++){const k=((t/700+i*.33)%1);R(g,58.3,90+k*6,1.2,1.4,`rgba(230,246,250,${.7*(1-k)})`)}},
 front(){}};

/* niche: a lamp in a round-headed niche in a plastered wall. bench: a stone bench along a wall, in two tiers; the joints of each tier
   stop short of its edges, and those of the lower tier stand between those of the upper one. */
function niche(g,x,y,W){arch(g,x,y,14,18,tint(W,-.32));arch(g,x+1.4,y+1.4,11.2,16.6,'#4a3828');R(g,x-1,y+17.6,16,1.6,tint(W,.16));R(g,x+3.6,y+15,6.4,2.6,'#b8733c');R(g,x+3.6,y+15,6.4,.6,'#e0a064');R(g,x+9.4,y+14.2,1.8,1.2,'#b8733c')}
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}

/* ---------- The synagogue of Athens ---------- */
/* A small house: benches along the wall, a reader's table, the chest of the scrolls. The windows have upright bars only. */
ART.syn11={w:320,q:12,
 paint(g){const r=rng(1105),W='#ddd0ac',ST='#c6bca2';
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:4,brick:'#b08a5a',t:.45});
  for(let i=16;i<320;i+=40)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  for(const x of[112,196]){R(g,x-2,24,18,20,tint(W,-.2));g.fillStyle=lg(g,0,26,0,42,['#9cc4e4','#dfe8e2']);g.fillRect(x,26,14,16);for(let i=1;i<3;i++)R(g,x+i*4.6-.4,26,.8,16,'#5a4a36');ao(g,x,26,14,4,'t',.4);R(g,x-3,44,20,1.6,tint(W,.2))}
  R(g,14,44,36,60,tint(W,-.16));doorArt(g,17,47,30,57,'#6a4a2c',r,{bands:[]});
  bench(g,56,89,62,ST);bench(g,262,89,58,ST);niche(g,74,50,W);
  /* the reader's table, with one scroll on it; and the chest of the scrolls, under its cloth */
  R(g,134,104,60,3,'rgba(40,30,60,.34)');wood(g,132,88,60,4,'#8a683a');R(g,132,88,60,.7,'#c8a06a');R(g,132,91.6,60,.8,'#4a3420');wood(g,136,92,3,12,'#5a4226',1);wood(g,185,92,3,12,'#5a4226',1);
  R(g,152,86.4,16,1.8,'#e6dcc0');R(g,150,85.8,2.6,2.8,'#b89058');R(g,167.4,85.8,2.6,2.8,'#b89058');
  R(g,214,104,34,3,'rgba(40,30,60,.34)');wood(g,216,74,30,28,'#7a5632');R(g,216,74,30,.8,'#b08a5a');R(g,218,101,3,3,'#4a3420');R(g,241,101,3,3,'#4a3420');
  g.fillStyle=lg(g,0,70,0,86,['#7a5a8a','#5f4470','#463058']);g.fillRect(214,70,34,15);R(g,214,84,34,1.2,'#c9a14a');R(g,214,70,34,.8,'#a88ab8');for(let i=0;i<5;i++)R(g,218+i*7,71.6,.5,9.6+(i%2)*1.4,'rgba(30,16,50,.3)');
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  lightmap(g,320,'#b2a8b0',l=>{for(const x of[119,203])pool(l,x,60,44,64,'#fff4d8',.85);pool(l,160,118,190,44,'#ffeecc',.5)})},
 light:{amb:'#e6dcd8'},draw(){},front(){}};

/* ---------- The marketplace ---------- */
/* The square where the city traded, judged, argued and strolled, northwest of the Acropolis (study note on Acts 17:17). What The
   Watchtower of July 15, 1998, names is here: colonnades with steps, the temple of Hephaestus above it with the craftsmen round it, a
   broad road that crosses the square on the slant, a boundary stone with its basin at the entrance. To the right the bare hill of
   Ares, and above everything the Acropolis. One image of a god stands in the shade of the long colonnade; no rite is seen at it. */
const CX=222,CW=236;
ART.agora11={w:640,q:12,
 paint(g){const r=rng(1107),ST='#dbd1b6',PV='#cfc3a2';
  sky(g,640,72,['#4a86c8','#86b2dc','#cfe0ea','#efe6cc']);cloud(g,60,10,50,4,r);cloud(g,250,7,60,5,r);cloud(g,606,12,40,4,r);
  ridge(g,0,640,72,x=>8+5*Math.sin(x/61+2)+3*Math.sin(x/19),['#9aa8b8','#aab4ac']);R(g,0,70,640,36,'#b2a878');
  acropolis(g,446,72,1.22,r);
  ridge(g,548,640,106,x=>24+20*Math.exp(-Math.pow((x-652)/52,2))+1.6*Math.sin(x/7),['#d6ccb2','#c2b698','#a99d80']);
  for(let i=0;i<26;i++){const x=580+r()*60;R(g,x,70+r()*34,.6,2+r()*5,'rgba(70,60,50,.22)')}stroke(g,[604,104,612,96,606,88,618,80,626,72,640,66],'rgba(240,232,208,.8)',2.4);stroke(g,[604,104,612,96,606,88,618,80,626,72,640,66],'rgba(120,104,84,.3)',.6);
  ridge(g,0,260,106,x=>60+10*Math.exp(-Math.pow((x-112)/84,2))-Math.max(0,(x-170)*.62),['#b6b17e','#a49f6a','#908b58']);
  for(let i=0;i<11;i++)foliage(g,10+i*21+r()*8,43+r()*5,6,3,'#6f8250',r,20);
  temple(g,58,39,40,6,17,'#ece1c8',{side:54});
  /* the houses and shops of the craftsmen, below the temple; between two of them the lane that climbs to their yards */
  for(const[x,w,top,c,dx]of[[18,78,56,'#dccca6',46],[128,84,52,'#e0d2ae',20]]){house(g,x,top,w,104-top,c,r,{patch:2,cracks:3,beams:14});
    R(g,x-1,top-4.4,w+2,2,'#b8603c');for(let i=x;i<x+w;i+=4)R(g,i,top-4.4,.5,2,'rgba(90,40,24,.35)');doorArt(g,x+dx,64,22,40,'#6a4a2c',r,{bands:[]});windowArt(g,x+(dx>30?14:54),68,11,9,c,{shut:1})}
  /* the lane: steps that climb between two walls */
  R(g,96,48,32,56,'#b9ab8a');for(let i=0;i<9;i++){R(g,98+i*.6,100-i*5,28-i*1.2,5,tint('#c6b896',-.02*i));R(g,98+i*.6,100-i*5,28-i*1.2,.8,'rgba(255,248,226,.5)');R(g,98+i*.6,104-i*5,28-i*1.2,.8,'rgba(60,48,40,.36)')}
  poly(g,[96,40,104,56,104,104,96,104],'#9a94a8');poly(g,[128,40,122,56,122,104,128,104],'#aaa4ae');ao(g,96,48,32,12,'t',.3,'#2a2440');
  R(g,0,40,18,64,'#8a8698');R(g,0,86,18,18,'#bcae8c');ao(g,0,40,18,20,'t',.4,'#2a2440');
  /* the long colonnade: a tiled roof, a deep beam, fifteen columns, and shade behind them */
  R(g,CX,38,CW,64,'#4a4254');R(g,CX,44,CW,44,'#7a6a62');tex(g,'mott',.5,CX,44,CW,44,'overlay',1);R(g,CX,88,CW,12,'#6a5c58');
  base(g,CX+111,100,14,7,'#b8ae98');man(g,CX+118,93.5,'st11seat',1,0,'#8c8aa8',0,0);
  comp(g,'multiply',.55,()=>R(g,CX,38,CW,64,'#8a86b0'));
  poly(g,[CX-4,37,CX+CW+4,37,CX+CW-3,27,CX+3,27],'#b9744e');for(let i=CX;i<CX+CW;i+=5)stroke(g,[i,37,i+(CX+CW/2-i)*.03,27],'rgba(80,36,24,.3)',.5);R(g,CX-4,36.4,CW+8,.8,'#d88a5c');
  R(g,CX-2,37,CW+4,5.6,ST);R(g,CX-2,37,CW+4,.6,tint(ST,.3));R(g,CX-2,42,CW+4,.6,tint(ST,-.3));
  for(let i=0;i<10;i++)col(g,CX+9+i*24.2,100,55,6.4,ST,{fl:4});
  for(let i=0;i<3;i++){R(g,CX-3-i*2.4,100+i*1.5,CW+6+i*4.8,1.5,tint(ST,-.06-i*.06));R(g,CX-3-i*2.4,100+i*1.5,CW+6+i*4.8,.5,tint(ST,.2))}
  /* the painted colonnade, seen from its end: a gable wall with its doorway, and the columns of its front running back */
  R(g,484,36,54,68,'#d9cba6');tex(g,'mott',.4,484,36,54,68,'overlay',1);poly(g,[482,36,540,36,511,24],'#d2c49e');stroke(g,[482,36,511,24,540,36],'#b9744e',1.6);
  R(g,497,50,28,54,'#2e2838');R(g,497,50,28,1,'#8a7c62');ao(g,497,50,28,12,'t',.5);for(const[x,c]of[[502,'#8a4a3a'],[510,'#4a6a8a'],[517,'#8a7a3a']])R(g,x,62,5,22,rgba(c,.42));
  R(g,538,38,34,66,'#4a4254');R(g,538,38,34,4.4,tint(ST,-.14));for(let i=0;i<3;i++)col(g,545+i*10,104,61-i*2,5-i*.5,tint(ST,-.1),{fl:3,shade:.1*i});
  /* the boundary stone of the marketplace, and the basin beside it */
  R(g,34,105,34,2,'rgba(40,30,60,.3)');g.fillStyle=lg(g,34,0,46,0,['#a8a08c','#e4dcc8','#c4bca8','#8a8474']);g.fillRect(36,80,9,25);R(g,36,80,9,1,'#f2ecd8');marks(g,37.4,86,6.4,3,r);
  g.fillStyle=lg(g,48,0,66,0,['#9a9484','#dcd4c0','#bcb4a0','#7e786c']);g.fillRect(48,93,18,12);R(g,48,93,18,1,'#eee8d8');R(g,49.6,94,14.8,1.6,'#6a9ab0');R(g,48,103.6,18,1.4,'#8a8474');
  /* a potter's wares on a mat, and jars of oil, at the foot of the steps */
  poly(g,[250,105,300,105,304,110,246,110],'#a8926a');for(const[x,y,k,c,w,h]of[[256,107,'jar','#9a5a36',3,8],[264,108,'jug','#8a4a2a',2.6,6],[272,107,'amph','#a8642e',3,10],[281,108,'bowl','#b06a3a',3.4,2.6],[290,107,'jar','#2a2420',2.8,7],[298,108,'jug','#9a5a36',2.4,5.4]])vessel(g,x,y,w,h,c,k);
  for(const[x,c]of[[444,'#9a5a36'],[453,'#8a4a2a'],[461,'#a8642e']])vessel(g,x,108,3.6,12,c,'amph');
  pave(g,0,103,640,144,PV,r,{vx:320,vy:56,rows:4,step:46,v:.07,rand:1});ao(g,0,103,640,6,'t',.3,'#3a3050');
  /* the road that crosses the square: a paler band of gravel, from the near left to the far right */
  comp(g,'soft-light',.6,()=>poly(g,[120,144,236,144,566,104,512,104],'#fff8de'));clipTo(g,()=>poly(g,[120,144,236,144,566,104,512,104]),()=>{for(let i=0;i<260;i++){const k=r(),y=104+k*40;R(g,120+r()*446,y,.8+k,.5+k*.4,r()<.5?'rgba(90,76,56,.3)':'rgba(255,250,230,.4)')}});
  shade(g,[214,104,466,104,476,112,206,114],SH,.3);comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,640,41)});pool(g,300,0,340,150,'#fff4d6',.1,'screen')},
 light:null,draw(g,t){cast(g,[['w11a',292,121,1],['w11maid',276,124,1],['w11b',584,118,-1]])},front(){}};

/* ---------- The stonecutter's yard ---------- */
/* Metalworkers and potters had their shops round the temple of Hephaestus, above the marketplace (The Watchtower, July 15, 1998).
   A yard under that temple: blocks of marble, a bench of tools under a lean-to, and one block with half a figure in it and half still
   rock. On a shelf by the wall stand small figures in silver, by the dozen: each is a small square, with no face. */
ART.yard11={w:320,q:12,
 paint(g){const r=rng(1109),W='#dccdaa',M='#ece6d6';
  sky(g,320,62,['#4a86c8','#86b2dc','#d2e2ea']);cloud(g,60,12,40,4,r);
  ridge(g,96,320,62,x=>12+5*Math.sin(x/29+1),['#aaa870','#96925c']);for(let i=0;i<7;i++)foliage(g,110+i*30+r()*10,50+r()*5,7,3.4,'#6f8250',r,24);
  temple(g,150,50,62,6,25,'#ece1c8',{side:76});
  plaster(g,0,46,320,58,W,r,{patch:3,cracks:4,brick:'#b08a5a',t:.5});R(g,0,44,320,2.6,tint(W,.14));R(g,0,44,320,.6,tint(W,.4));R(g,0,46.6,320,.8,tint(W,-.3));
  /* the gate to the lane */
  R(g,12,48,38,56,tint(W,-.2));arch(g,16,52,30,52);g.fillStyle=lg(g,0,52,0,104,['#a8cdea','#e2dcc4','#cfc3a2']);g.fill();g.save();arch(g,16,52,30,52);g.clip();R(g,16,88,30,16,'#c8bc9c');R(g,21,70,12,18,'#dbd1b6');for(let i=0;i<3;i++)R(g,22.4+i*3.6,73,1.6,15,'#b8ae94');ao(g,16,52,30,8,'t',.4);g.restore();
  /* the lean-to: two posts at its ends, a roof of tiles, and a bench of tools under it */
  poly(g,[64,47,140,47,146,55,58,55],'#b9744e');for(let i=62;i<144;i+=5)stroke(g,[i,47,i-2+(i-62)*.05,55],'rgba(80,36,24,.3)',.5);R(g,58,54.6,88,1,'#8a4a30');
  wood(g,60,55,3,49,'#5a4226',1);wood(g,141,55,3,49,'#5a4226',1);comp(g,'multiply',.4,()=>R(g,63,55,78,49,'#8a86b0'));
  wood(g,70,90,62,3,'#8a683a');wood(g,72,93,3,11,'#5a4226',1);wood(g,127,93,3,11,'#5a4226',1);
  for(const[x,w,c]of[[76,7,'#8a8a98'],[86,2,'#6a4a2c'],[92,9,'#9a9aa8'],[104,2,'#6a4a2c'],[110,6,'#8a8a98'],[120,5,'#b08a5a']]){R(g,x,88.4,w,1.6,c);R(g,x,88.4,w,.5,tint(c,.3))}
  /* small figures in silver on a shelf: each a square of metal */
  wood(g,246,70,62,2.4,'#7a5c36');wood(g,246,84,62,2.4,'#7a5c36');for(let j=0;j<2;j++)for(let i=0;i<9;i++){const x=250+i*6.4,y=j?84:70;R(g,x,y-5,3,5,'#c4c8d0');R(g,x,y-5,1,5,'#f0f2f6');R(g,x+2,y-5,1,5,'#8a8e9a')}
  /* blocks of marble against the wall */
  for(const[x,y,w,h]of[[214,104,26,16],[236,104,20,10],[288,104,28,20],[150,104,14,8]]){R(g,x+2,y,w,1.6,'rgba(40,30,60,.3)');g.fillStyle=lg(g,x,0,x+w,0,[tint(M,-.24),tint(M,.06),M,tint(M,-.3)]);g.fillRect(x,y-h,w,h);R(g,x,y-h,w,.8,'#ffffff');
    inRect(g,x,y-h,w,h,()=>{tex(g,'mott',.3,x,y-h,w,h,'overlay',.6);for(let i=0;i<5;i++)stroke(g,[x+r()*w,y-h,x+r()*w,y],'rgba(120,120,150,.16)',.5)})}
  /* the block he is working on: a figure to the waist, and below it the rock it is coming out of */
  g.save();g.beginPath();g.rect(160,40,50,44.5);g.clip();man(g,184,107,'st11rough',1,0,null,0,0);g.restore();
  R(g,170,110,34,1.8,'rgba(40,30,60,.3)');poly(g,[166,110,204,110,203,86,197,83,188,84.5,176,82.6,168,85]);g.fillStyle=lg(g,166,0,204,0,[tint(M,-.26),tint(M,.04),M,tint(M,-.32)]);g.fill();
  clipTo(g,()=>poly(g,[166,110,204,110,203,86,197,83,188,84.5,176,82.6,168,85]),()=>{tex(g,'mott',.34,166,82,38,28,'overlay',.6);for(let i=0;i<26;i++){const x=168+r()*34,y=84+r()*24;stroke(g,[x,y,x+1.6,y+2.2],r()<.5?'rgba(110,110,140,.3)':'rgba(255,255,255,.5)',.5)}});
  earth(g,0,104,320,144,'#cdbf9a',r);ao(g,0,104,320,6,'t',.3,'#4a4460');
  for(let i=0;i<70;i++){const k=r(),x=120+r()*130,y=107+k*26;R(g,x,y,1+k*1.6,.6+k*.5,r()<.7?'#f4efe2':'#c8c2b0')}
  shade(g,[0,105,320,105,320,112,0,115],SH,.34);pool(g,200,20,200,120,'#fff4d6',.1,'screen')},
 light:null,draw(){},front(){}};

/* ---------- The painted colonnade ---------- */
/* The Stoics had their name from a painted colonnade in Athens, where the founder of the school taught (Insight, "Stoics"). Along
   its back wall hang great panels, so faded that they are fields of color and nothing more. An image of one of the city's gods stands
   in a recess, in shade. The columns of the front stand between the viewer and the floor (fore). */
ART.stoa11={w:480,q:12,fp:1.2,
 paint(g){const r=rng(1111),W='#d6c8a4',ST='#d4cab0';
  plaster(g,0,0,480,104,W,r,{patch:1,cracks:5,t:.5});for(let i=10;i<480;i+=34)wood(g,i,0,7,7,'#5a4226',1);wood(g,0,7,480,2.6,'#6a4e2c');ao(g,0,9.6,480,14,'t',.5,'#2a2030');
  /* the panels: color that has faded and flaked, with nothing to be made out in it */
  for(const[x,w]of[[24,96],[136,82],[262,82],[360,98]]){R(g,x-1.6,19.4,w+3.2,55.2,'#5a4226');const cs=['#8a4a3a','#4a6a8a','#8a7a3a','#5a7a5a','#7a5a7a','#b0a080'];
    inRect(g,x,21,w,52,()=>{R(g,x,21,w,52,'#a89878');for(let i=0;i<34;i++){const c=cs[Math.floor(r()*cs.length)];pool(g,x+r()*w,21+r()*52,6+r()*14,5+r()*10,c,.5,'source-over')}
      tex(g,'blotch',.6,x,21,w,52,'overlay',1.4);tex(g,'mott',.5,x,21,w,52,'overlay',.7);for(let i=0;i<26;i++)R(g,x+r()*w,21+r()*52,1+r()*4,.6+r()*2,'rgba(214,200,164,.75)');ao(g,x,21,w,8,'t',.3)})}
  R(g,0,80,480,24,tint(W,-.2));tex(g,'mott',.4,0,80,480,24,'overlay',1);R(g,0,79,480,1.2,tint(W,.12));
  /* the recess, and the image in it */
  R(g,224,26,32,78,tint(W,-.34));arch(g,227,30,26,74,'#3a3244');base(g,233,104,14,13,'#a8a08c');man(g,240,91.5,'st11seat',1,0,'#7c7a98',0,0);comp(g,'multiply',.4,()=>arch(g,227,30,26,74,'#8a86b0'));
  bench(g,40,89,60,ST);bench(g,380,89,60,ST);
  pave(g,0,103,480,144,'#cdc2a4',r,{vx:240,vy:60,rows:4,step:44,v:.06});ao(g,0,103,480,6,'t',.4,'#3a3050');
  lightmap(g,480,'#a8a2b4',l=>{pool(l,240,150,330,60,'#fff0d0',.9);pool(l,60,130,120,40,'#ffeecc',.5);pool(l,420,130,120,40,'#ffeecc',.5)})},
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
 {k:'altar',id:'pity',gr:['ΕΛΕΩΙ'],nm:'altar to Pity',c:'#d6ccb0'},
 {k:'base',id:'ivy',gr:['ΗΡΩΙ','ΤΙΜΑΝΔΡΩΙ'],nm:'base of the hero Timandros',c:'#c8bea2',fig:BRZ},
 {k:'altar',id:'pers',gr:['ΠΕΙΘΟΙ'],nm:'altar to Persuasion',c:'#dcd2b6'},
 {k:'base',id:'broken',gr:['ΗΡΩΙ','ΞΕΝΟΔΑΜΩΙ'],nm:'base of the hero Xenodamos',c:'#cfc5a9',fig:MAR},
 {k:'altar',id:'unknown',gr:['ΑΓΝΩΣΤΩΙ','ΘΕΩΙ'],nm:'altar to a god not known',c:'#e0d6ba'},
 {k:'altar',id:'energy',gr:['ΟΡΜΗΙ'],nm:'altar to Energy',c:'#d2c8ac'},
 {k:'altar',id:'modesty',gr:['ΑΙΔΟΙ'],nm:'altar to Modesty',c:'#d8ceb2'}];
const sx=i=>BX0+i*(BW+BG),stoneTop=s=>s.k==='altar'?50:76,bandY=s=>stoneTop(s)+(s.k==='altar'?22:12);
const GFONT=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
/* cutLetters: words cut into stone, one line each, centered on cx: a dark stroke, and a pale edge below and to the right of it */
function cutLetters(g,words,cx,y,w,sz){sz=sz||6.4;g.textBaseline='middle';g.font=GFONT(sz);while(Math.max(...words.map(s=>g.measureText(s).width))>w&&sz>3.6){sz-=.2;g.font=GFONT(sz)}
  words.forEach((s,i)=>{const tw=g.measureText(s).width,tx=cx-tw/2,ty=y+i*(sz+1.4);g.fillStyle='rgba(255,250,232,.6)';g.fillText(s,tx+.5,ty+.5);g.fillStyle='rgba(58,46,40,.9)';g.fillText(s,tx,ty)})}
ART.bases11={w:320,q:12,
 paint(g){const r=rng(1113);
  sky(g,320,22,['#9cc0e0','#d6e4e8']);g.fillStyle=lg(g,0,16,0,124,['#bbb07e','#a99c68','#948750']);g.fillRect(0,16,320,108);tex(g,'mott',.5,0,16,320,108,'overlay',1.2);
  for(let i=0;i<60;i++)foliage(g,r()*320,22+r()*96,4+r()*6,1.4+r()*2,r()<.5?'#8f8f56':'#a59c62',r,10);
  STONES.forEach((s,i)=>{const x=sx(i),alt=s.k==='altar',top=stoneTop(s);
    if(!alt){/* the hem of a long robe, and two feet under it */
      const F=s.fig,x0=x+5,x1=x+BW-5,hem=[x0+3,0,x1-3,0,x1,62,x1-5,64.5,x0+12,62.5,x0+5,64.5,x0,62];
      for(const fx of[x0+3,x0+15]){g.fillStyle=lg(g,fx,0,fx+11,0,[tint(F,-.34),tint(F,.14),tint(F,-.4)]);g.fillRect(fx,62,10,top-62);R(g,fx-1,top-4.6,13,4.6,tint(F,-.06));R(g,fx-1,top-4.6,13,.8,tint(F,.3));R(g,fx+9,top-4.6,3,4.6,tint(F,-.36))}
      poly(g,hem);g.fillStyle=lg(g,x0,0,x1,0,[tint(F,-.4),tint(F,.18),F,tint(F,-.48)]);g.fill();
      clipTo(g,()=>poly(g,hem),()=>{for(let k=0;k<5;k++){const fx=x0+3.5+k*5.6;stroke(g,[fx,0,fx+1.6,32,fx-.6,64],'rgba(20,16,30,.3)',1.1);stroke(g,[fx+1.3,0,fx+2.9,32,fx+.7,64],'rgba(255,255,255,.22)',.6)}ao(g,x0,50,x1-x0,15,'b',.42)})}
    base(g,x,BY,BW,BY-top,s.c);if(alt){R(g,x-2.4,top-3.2,BW+4.8,3.8,tint(s.c,.05));R(g,x-2.4,top-3.2,BW+4.8,.7,tint(s.c,.38));R(g,x-2.4,top+.2,BW+4.8,.5,tint(s.c,-.3))}
    for(let k=0;k<4;k++){const y=top+6+r()*(BY-top-10);stroke(g,[x+2+r()*10,y,x+14+r()*20,y+(r()-.5)*3],'rgba(60,50,40,.14)',.5)}
    cutLetters(g,s.gr,x+BW/2,bandY(s),BW-5);
    if(s.id==='broken'){/* the corner with the end of both lines has come away; it lies in the grass */
      const P=[x+BW+2,top+4,x+BW*.56,top+5.4,x+BW*.5,top+12,x+BW*.62,top+26,x+BW+2,top+28];poly(g,P,'#a59a68');clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.5,x,top,BW+4,30,'overlay',1.2);foliage(g,x+BW-4,top+24,7,3,'#8f8f56',r,12)});
      stroke(g,[x+BW*.56,top+5.4,x+BW*.5,top+12,x+BW*.62,top+26],tint(s.c,-.4),1);stroke(g,[x+BW*.56+.8,top+5.4,x+BW*.5+.8,top+12,x+BW*.62+.8,top+26],tint(s.c,.3),.5)}});
  earth(g,0,119,320,144,'#bfae80',r);ao(g,0,119,320,5,'t',.34,'#3a3a2a');
  for(let i=0;i<46;i++)foliage(g,r()*320,120+r()*3,3+r()*4,1.4,'#8a9458',r,8);
  /* the piece that broke off, with what was on it */
  {const x=sx(3)+BW+1,y=133,P=[x-9,y+1,x-7,y-7,x+6,y-9,x+10,y-2,x+7,y+3];poly(g,P,tint('#cfc5a9',-.06));stroke(g,[x-9,y+1,x-7,y-7,x+6,y-9],tint('#cfc5a9',.3),.6);R(g,x-7,y+3,16,1.4,'rgba(40,30,20,.3)');
    clipTo(g,()=>poly(g,P),()=>{g.font=GFONT(3.8);g.textBaseline='middle';g.fillStyle='rgba(58,46,40,.9)';g.fillText('ΑΜΩΙ',x-5.2,y-2.6)})}
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,119,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,119,320,25)});pool(g,120,30,260,120,'#fff4d6',.1,'screen')},
 light:{amb:'#ffffff'},
 /* the ivy over the second stone, until it is drawn aside: then it hangs at the stone's edge */
 draw(g){const st=G.b11||{},x=sx(1),y=bandY(STONES[1]),r=rng(1151);
  if(!st.ivy){for(let i=0;i<70;i++){const px=x+1+r()*(BW-2),py=y-6+r()*20,c=['#4f6a36','#5f7a40','#3f5a2e','#6f8a4a'][i%4];R(g,px,py,1.6+r()*1.6,1.2+r()*1.2,c)}stroke(g,[x+1,y-12,x+.4,y,x+1.2,y+18],'#3a4a26',.7)}
  else for(let i=0;i<34;i++){const px=x-3+r()*6,py=y-10+r()*34,c=['#4f6a36','#5f7a40','#3f5a2e','#6f8a4a'][i%4];R(g,px,py,1.6+r()*1.4,1.2+r()*1.2,c)}},
 /* what the stone last read says, in the player's language, at the foot of the view */
 front(g){const st=G.b11;G.caps11=[];if(st&&st.last)cap11(g,STONES.find(s=>s.id===st.last).nm,160,139,300)}};
/* cap11: a caption in small letters with a dark edge, as the names on the map are written. It is made to fit its width. */
function cap11(g,s,x,y,w,col){s=T(s);const pf=SHARED.font&&SHARED.font.onCanvas&&SHARED.font.onCanvas(g,s,w);let sz=pf?4.5:4.8;
  const font=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;if(!pf){g.font=font(sz);g.textBaseline='middle';while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=font(sz)}}
  const tw=g.measureText(s).width,tx=pf?SHARED.font.pin(x-tw/2):x-tw/2,ty=pf?SHARED.font.mid(y):y;
  if(G.caps11)G.caps11.push({s,w:tw,max:w,sz});g.fillStyle='rgba(8,6,10,.85)';for(const[dx,dy]of[[.5,0],[-.5,0],[0,.5],[0,-.5],[.5,.5]])g.fillText(s,tx+dx,ty+dy);g.fillStyle=col||'#f4e4b8';g.fillText(s,tx,ty)}

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
  sky(g,560,96,['#5474ae','#9a9ec2','#e2b488','#f6d6a2']);cloud(g,70,24,56,5,r,'#ffe6c4','#c69aa2');cloud(g,236,12,44,4,r,'#ffe6c4','#c69aa2');
  ridge(g,0,560,96,x=>18+8*Math.sin(x/47+2)+4*Math.sin(x/15),['#8f8fae','#a89aa8']);
  /* the city below: roofs, and the colonnades of the marketplace, small and far down */
  R(g,0,84,300,20,'#b9a68a');for(let i=0;i<30;i++){const x=r()*240,y=84+r()*14,w=8+r()*12;R(g,x,y,w,4+r()*3,tint('#d6c6a2',(r()-.5)*.2));R(g,x-.5,y-1,w+1,1.2,'#b9744e')}
  R(g,96,88,60,6,'#5a5064');R(g,95,86.6,62,1.6,'#b9744e');for(let i=0;i<10;i++)R(g,98+i*6,88,1.6,6,'#e2d8be');
  comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,70,0,104,['rgba(246,214,162,.9)','rgba(246,214,162,0)']);g.fillRect(0,70,300,34)});
  acropolis(g,424,97,2.05,r,{rock:'#c2aa86'});
  /* the rock of the hill, pale and fissured; at the left it falls away to the path */
  poly(g,[0,108,60,104,170,99,220,95,560,93,560,144,0,144]);g.fillStyle=lg(g,0,92,0,144,[tint(RK,-.1),RK,tint(RK,.05)]);g.fill();
  clipTo(g,()=>poly(g,[0,108,60,104,170,99,220,95,560,93,560,144,0,144]),()=>{tex(g,'mott',.55,0,92,560,52,'overlay',1.3);tex(g,'grain',.14,0,92,560,52,'overlay',.5);
    for(let i=0;i<44;i++){let x=r()*560,y=98+r()*40;const p=[x,y];for(let k=0;k<3+r()*4;k++){x+=3+r()*9;y+=(r()-.5)*3;p.push(x,y)}stroke(g,p,'rgba(84,70,60,.3)',.6);stroke(g,p.map((v,j)=>j%2?v+.6:v),'rgba(255,250,236,.3)',.5)}
    for(let i=0;i<60;i++){const k=r();R(g,r()*560,96+k*46,1+k*2,.5+k*.5,r()<.5?'rgba(84,70,60,.25)':'rgba(255,250,236,.4)')}});
  /* steps worn into the rock, down to the path */
  for(let i=0;i<5;i++){const x=6+i*9,y=118+i*5.4;R(g,x-6,y,58-i*5,1.2,'rgba(80,66,56,.36)');R(g,x-6,y+1.2,58-i*5,.6,'rgba(255,250,236,.3)')}
  for(let i=0;i<8;i++)foliage(g,6+r()*160,103+r()*3,4+r()*4,1.6,'#8a8a54',r,8);
  /* the seats: ledges cut out of the rock itself */
  for(const[x,y,w]of SEATS){R(g,x+2,y,w,2,'rgba(50,40,60,.34)');R(g,x,y-9.5,w,3,tint(RK,.12));R(g,x,y-9.5,w,.7,tint(RK,.4));g.fillStyle=lg(g,0,y-6.5,0,y,[tint(RK,-.2),tint(RK,-.34)]);g.fillRect(x,y-6.5,w,6.5);
    inRect(g,x,y-9.5,w,9.5,()=>{tex(g,'mott',.4,x,y-9.5,w,9.5,'overlay',1);for(let i=0;i<4;i++)stroke(g,[x+r()*w,y-6,x+r()*w,y],'rgba(60,50,44,.24)',.5)})}
  /* a low block at the far edge: one of the altars that stood up here */
  base(g,500,100,15,13,'#cabfa4');marks(g,503,92,9,1,r);
  lightmap(g,560,'#d8b8a8',l=>{pool(l,560,40,420,160,'#fff0c8',.9);pool(l,360,128,260,50,'#ffe8c0',.5);pool(l,40,120,160,60,'#a8a0c8',.3)})},
 light:{amb:'#f0d8c4'},
 draw(g){const lit='#f0d8c4',st=G.sp11||{},up=!!F.spoke,lean=st.lean||0;
  /* the men on the seats. Before the speech breaks off they sit, and lean in as it holds; afterwards some are on their feet. */
  HEAR.forEach(([id,x,y,dir,grp,stand])=>{if(grp==='d'&&F.rose)return;if(up&&stand)cast(g,[[id,x,y+3,dir]],lit);else sitter(g,x,y,id,dir,lit,!up&&lean>=(grp==='e'?2:grp==='s'?4:1))});
  if(F.spoke)cast(g,[['by11a',52,122,1],['by11b',140,118,-1]],lit)},
 front(g){if(G.room!=='hill11'||F.spoke||!G.sp11||G.busy)return;const st=G.sp11,x=G.cam;G.caps11=[];
  g.fillStyle='rgba(10,8,14,.7)';g.fillRect(x,123,320,21);R(g,x,123,320,.6,'rgba(244,228,184,.3)');
  cap11(g,T('To say next: {claim}',{claim:T(PARTS[partNo()].claim)}),x+160,128,312,'#cfe2ff');
  cap11(g,T('I begin from: {ground}',{ground:T(st.ground?GRAIN[st.ground].cap:'empty hands')}),x+88,138,168);
  cap11(g,T('I say it {voice}',{voice:T(VOICE[st.voice])}),x+248,138,136)}};

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
  CH=actor('charm11','Charmides','#b8d0e8',126),AR=actor('arist11','Aristion','#f0e8c8',92),XE=actor('xeno11','Xenokles','#e8c8a0',108),SL=actor('slave11','slave with a robe and a dish','#d0c8a8',140),
  DS=actor('dosi11','Dositheos','#e0e0f0',90),DI=actor('dion11','Dionysius','#f4ecd4',98),DM=actor('dama11','Damaris','#a8d8e8',190);
/* a man of the court, who speaks from his seat: he has a voice and a place, and the figure on the seat is painted by the room */
const JU={color:'#f0e6c8',pitch:88,room:'hill11',x:348,y:98,name:'man of the court'};

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 17:16-34, verse by verse, told by the narrator in paraphrase, each with its reference. None of it is put into a mouth,
   and none of it stands in quotation marks: a paraphrase is never presented as a quotation (CONTRIBUTING section 1). The speech
   (17:22-31) is told as what Paul said, part by part, as the player builds it. */
const TOLD={
 v16:'Paul was waiting for them in Athens, and what he saw there goaded him: the city was full of idols. (Acts 17:16)',
 v17a:'So he reasoned in the synagogue with the Jews, and with the others there who worshipped God. (Acts 17:17)',
 v17b:'And every day he did the same in the marketplace, with whoever happened to be there. (Acts 17:17)',
 v18a:'Some philosophers took him on, Epicureans and Stoics alike. Some of them asked what this chatterer was trying to say. (Acts 17:18)',
 v18b:'Others thought that he was announcing foreign deities. That was because he was declaring the good news about Jesus, and about the resurrection. (Acts 17:18)',
 v19:'So they took hold of him and led him to the Areopagus, and asked whether they might learn what this new teaching of his was. (Acts 17:19)',
 v20:'What he was bringing sounded strange in their ears, they said, and they wanted to know what it meant. (Acts 17:20)',
 v21:'All the Athenians, and the foreigners who were staying there, spent their free time on nothing else: telling something new, or listening to it. (Acts 17:21)',
 v22:'Then Paul stood in the midst of the Areopagus. He could see, he told the men of Athens, that in every way they were more given to the fear of the deities than other people are. (Acts 17:22)',
 v23:'Walking about and looking closely at the things they venerated, he had even come upon an altar with the inscription: to an unknown God. What they were worshipping without knowing it, that was what he was making known to them. (Acts 17:23)',
 v24:'The God who made the world and everything in it is Lord of heaven and earth, and he does not live in temples that hands have made. (Acts 17:24)',
 v25:'He is not waited on by human hands, as though there were something he lacked. It is he who gives everyone life, and breath, and everything else. (Acts 17:25)',
 v26:'From one man he made every nation of mankind, to live all over the face of the earth; and he fixed their times, and the bounds of the places where they would live, (Acts 17:26)',
 v27:'so that they would look for God: feel their way toward him, perhaps, and truly find him. And yet he is not far from any one of us. (Acts 17:27)',
 v28:'It is through him that we live, and move, and are at all. Some of their own poets, Paul reminded them, had said as much: that we too are his children. (Acts 17:28)',
 v29:'Being children of God, then, we ought not to suppose that the Divine Being resembles gold or silver or stone: a thing shaped by human skill and human invention. (Acts 17:29)',
 v30:'Over the times of that ignorance God has looked past. But now he is telling all people, wherever they are, to repent, (Acts 17:30)',
 v31:'for he has fixed a day on which he intends to judge the inhabited earth in righteousness, through a man of his own appointing. And he has given everyone a guarantee of it: he raised that man from the dead. (Acts 17:31)',
 v32:'When they heard of a resurrection of the dead, some began to scoff. Others said that they would hear him about this again. (Acts 17:32)',
 v33:'So Paul left them. (Acts 17:33)',
 v34:'Some men attached themselves to him, though, and came to believe: Dionysius among them, a judge of the court of the Areopagus, and a woman whose name was Damaris, and others too. (Acts 17:34)'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});

/* ============ THE TABLETS, WHICH STAY SHUT ============ */
/* PS: the passages on Paul's tablets, each a note in his own words with its reference (gist: see shared/tablets.js), never the
   wording of a translation. The first three are the ones he reads out in the marketplace, where nobody knows the names in them. The
   rest are the passages that the Study Edition's marginal references set beside the parts of the speech (Acts 17:24, 25, 27, 28, 29,
   31): on the hill he says what they say and quotes none of them, and each appears on the tablets when its part has been spoken.
   The last is the line at which the tablets are opened for those who joined him. */
const PS={
 is42:{ref:'Isaiah 42:5',gist:'The true God, Jehovah, made the heavens and spread out the earth, and to the people on it he gives breath.'},
 de4:{ref:'Deuteronomy 4:29',gist:'Whoever looks for Jehovah with his whole heart and his whole soul will find him.'},
 ps145:{ref:'Psalm 145:18',gist:'Whoever calls on Jehovah, and does it in truth, has him near.'},
 k8:{ref:'1 Kings 8:27',gist:'The builder of the house prayed: will God really live on the earth? Not even the heavens can hold you. How much less this house that I have built!'},
 ps50:{ref:'Psalm 50:12',gist:'God says: if I were ever hungry, you are not the one I would tell. The fruitful earth is mine, with all it holds.'},
 ps36:{ref:'Psalm 36:9',gist:'With God is the spring that life comes from.'},
 is40:{ref:'Isaiah 40:18, 19',gist:'Whom will you set beside God, to compare him with? A workman casts the idol, and a metalworker lays gold over it.'},
 ps96:{ref:'Psalm 96:13',gist:'Jehovah is on his way to judge the earth. He will judge the inhabited earth rightly.'},
 ge1:{ref:'Genesis 1:1',gist:'When all things began, God made the heavens and the earth.'}};
const quote=p=>T('{text} ({ref})',{text:T(p.gist),ref:T(p.ref)});

/* ============ THE GRAINS ============ */
/* What Paul gathers in the city, and what each carries on the hill (Acts 17:23, 24, 25, 28, 29). cap: what it is called on the hill;
   note: what his tablets say of it under "Seen in Athens". Each is an item in his pack, and so are the questions that find them: a
   thought is carried and used like a thing. */
const GRAIN={
 altar:{item:'g11altar',f:'qunk',cap:'their altar without a name',note:'An altar by the road, cut whole and clean: to a god they do not know.'},
 roof:{item:'g11roof',f:'qhouse',cap:'the temple without a roof',note:'The temple of Zeus: six hundred years in the building, and it has no roof.'},
 dish:{item:'g11dish',f:'qneed',cap:'the robe and the dish',note:'A robe and a dish of food, carried up to an image as to a master.'},
 line:{item:'g11line',f:'stoic',cap:'a line of their poets',note:'A Stoic, in the words of a poet: we too are his children.'},
 block:{item:'g11block',f:'qmade',cap:'the block of marble',note:'A block of marble: this morning rock to the knees, and by the new moon a god.'}};
const VOICE={you:'to them: "you"',we:'as one of them: "we"',all:'to all people everywhere'},VOICES=['you','we','all'];
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
 q11made:{statue:'Who made it? It does not say. Finished, it looks as if no hand had ever touched it.',altar:'A mason, long ago. The stone has forgotten him.',
  temple:'Builders, and they are long dead. I want to see the making, not to hear of it.',roof:'Builders, and they are long dead. I want to see the making, not to hear of it.',
  dish:'A weaver and a cook. But my question is about their gods, not about what is brought to them.','*':'That is not the place to ask who made them.'},
 q11house:{statue:'On a base at a street corner, in the rain. That is not a house.',altar:'An altar is a table. I am asking for the house.',
  temple:'In there, they would say; and that house was finished long ago. I want one where the hands can still be seen.',block:'Nowhere yet. He is still in the stone.',
  dish:'He is carrying it to the door of a house. He does not live there himself.','*':'That is not the place to ask where he lives.'},
 q11need:{statue:'Nothing that I can see. And yet somebody dusts it.',altar:'An altar is where they bring it. I want to see what they bring.',temple:'A roof, and this one has its roof.',
  roof:'A roof. But that is what the builders need. What does the god himself need?',block:'A sculptor. That answers another question.','*':'That is not the place to ask what he needs.'},
 q11unk:{statue:'This one has a name. Everyone I asked knew it.',altar:'There are a great many altars on this road. I should look at them one by one.',temple:'They know very well whose house that is.',
  roof:'They know very well whose house that was meant to be.',block:'It will have a name as soon as it has a buyer.',dish:'He knows the name of the image he serves. He told me twice.','*':'That is not the place to ask it.'}};
async function ask(id,kind){if(!isQ(id))return false;if(QS[id]===kind)return RIGHT[kind]();return say(P,WRONG[id][kind]||WRONG[id]['*'],TH)}
/* gain: a question has found its answer. The question leaves the pack, and the grain takes its place. */
async function gain(k){const g=GRAIN[k],q=Object.keys(QS).find(i=>QS[i]===k);if(F[g.f])return;F[g.f]=1;if(q)delItem(q);addItem(g.item);SFX.good();
  if(all5())await say(P,'An altar, a temple, a dish, a block of marble, and a line of their own poets. I have what I came for. Now back to the marketplace: whoever happens to be there will be there.',TH);codeBtn()}
const RIGHT={
 roof:async()=>{await narr('A man leading a mule up the road told him without being asked: the temple of Zeus. Begun six hundred years ago, he said, taken up again by a king, and never roofed.',{dur:8800});
  await say(P,'Where does he live? Here, they say: in a house that six hundred years have not finished.');
  await say(P,'Hands began it, and hands grew tired. Whoever needs men to build him a house is at the mercy of the builders.',TH);return gain('roof')},
 block:async()=>{await say(P,'Who made them? He did. I am standing here watching him do it.');
  await say(XE,'This morning he was rock to the knees. By the new moon he will have a face.');
  await say(P,'Gold, or silver, or stone: and before it is a god, it is a morning\'s work.',TH);return gain('block')},
 dish:async()=>{await say(P,'What does he need? A clean robe, because the old one is dusty. And a dish of food at noon.');
  await say(SL,'And tomorrow another, sir. He is very regular.');
  await say(P,'Waited on by human hands, as though he lacked something. And the hands belong to a man who has not eaten yet himself.',TH);await gain('dish');
  await say(SL,'I must go on, sir. The dish is getting cold, and he is not the one who will notice.');await walk(SL,640,122);SL.room=null;codeBtn()},
 altar:async()=>{await say(P,'Is there one they do not know? There is. And they know that they do not: they cut it into the stone.');
  await say(P,'Not lost, like the name in the grass. Not covered, like the one under the ivy. They never had a name to write.',TH);return gain('altar')}};

/* ============ THE ROAD, AND THE WAY BY THE STATUES ============ */
const ROAD=[['thessalonica','beroea'],['beroea','seaward'],['seaward','athens','sea']],LAB={thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:6,dy:7.2}};
/* the statues of the street: each is "a statue" until Paul has looked at it */
const STAT=[
 {id:'gen',x:138,nm:'bronze man in a helmet',look:'A man in bronze, with a helmet pushed back on his head. Green where the rain runs down him.'},
 {id:'scr',x:226,nm:'marble man with a scroll',look:'A man in marble, holding a scroll out to the street as if somebody had asked him for it.'},
 {id:'old',x:316,nm:'old lawgiver in marble',look:'An old man in marble, bald, with a beard to his chest. The letters on his base call him a giver of laws.'},
 {id:'maim',x:406,nm:'marble youth without a right hand',look:'A young man in marble. His right arm ends at the elbow: the hand has been gone a long time.'},
 {id:'p1',x:502,nm:'bronze that faces another',look:'Two men in bronze, face to face, as if one of them had just said something and the other were still thinking about it.'},
 {id:'p2',x:534,nm:'bronze that faces another',look:'Two men in bronze, face to face, as if one of them had just said something and the other were still thinking about it.'}];
const seenS=id=>!!(G.s11&&G.s11[id]);
const WAY='Past the bronze in the helmet, past the marble that holds out a scroll, past the old lawgiver. Then the lane just beyond the marble youth who has lost his right hand.';
async function nikias(){if(F.syn)return say(NI,'You found it, then. I told you: in this city a man finds his way by the statues, or he does not find it.');
  if(F.way){await say(NI,'Again? Listen, then.');return say(NI,WAY)}
  await say(P,'Friend, I am a stranger here. Where do the Jews of this city have their synagogue?');
  await say(NI,'The synagogue. Yes. You go by the statues: everybody does.');await say(NI,WAY);
  await say(NI,'If you come to the two bronzes that face each other, you have gone too far. That way lies the marketplace.');
  await say(P,'By the statues. In this street alone there are more of them than I have seen in some whole cities.');
  await say(NI,'Thank you. We are rather proud of that.');F.way=1;SFX.good();codeBtn()}
async function lane(k){
  if(!F.way)return say(P,'A lane between two houses. In a city that I do not know, I ask before I turn.');
  if(F.syn)return say(P,k==='c'?'The lane to the synagogue. I shall be there again on the Sabbath.':'I know where that one comes out now: at the fountain.');
  if(k!=='c'){await fade(1,300);await narr('The lane ran round three houses, past two more images at two more corners, and let him out at the fountain again.',{dur:6200});
    place(P,'street11',96,122,1);G.cam=0;await fade(0,300);return say(P,'Not that one. I should look at these figures properly, one by one, before I turn again.',TH)}
  await fade(1,400);await come('syn11');return synIntro()}
async function toAgora(){if(!F.syn)return say(P,'That way lies the marketplace. First the synagogue: there, at least, they will know the names I use.');return goto('agora11',40,124,1)}

/* ============ THE SYNAGOGUE ============ */
async function synIntro(){await say(DS,'Peace, stranger. From the harbor, by the dust on you. A son of Israel?');
  await say(P,'Paul, of Tarsus. I have come down from Beroea, and before that from Thessalonica.');
  await say(DS,'Then sit with us. It is not often that a voice comes to us from so far: and in this city, of all cities, we are glad of one.');codeBtn()}
async function synTalk(){if(F.syn)return;await tell('v17a');
  await say(P,'Men of Israel, and you who fear God: what the prophets promised has begun. The Christ has come, he has suffered, and God has raised him from the dead.');
  await say(DS,'From the dead. You say it as a man says what he has seen.');
  await narr('Here, at least, they knew the names he used.',{dur:5200});
  await say(DS,'Come again on the Sabbath. But if you mean to say these things out there, in the marketplace, be warned: out there nobody has heard of Moses, and everybody has an opinion.');
  F.syn=1;SFX.good();await fade(1,600);await narr('The next morning he went where the whole city went.',{dur:5200});await come('agora11',700);return agoraIntro()}

/* ============ THE MARKETPLACE: the basin, and the tablets that nobody knows ============ */
/* At the entrance stood a boundary stone with a basin of water, for the cleansing of those who came in (The Watchtower, July 15,
   1998). Paul declines it, plainly and without scorn, and that is the news that gathers his first hearers. Then he does what he has
   done in every city, and opens his tablets: three passages, all true, and to these men only names. So the tablets are shut, and he
   takes four questions through their city instead. */
async function agoraIntro(){await narr('In the marketplace nobody asked where a thing was written. They asked whether it was new.',{dur:6200});await tell('v17b');await tell('v21');return basin()}
/* basin: Charmides points him to the basin. It follows the first sight of the marketplace, and a code that was noted at that moment leads back to it. */
async function basin(){if(F.basin)return;
  await say(CH,'Stranger! The basin, there, by the boundary stone. Nobody walks onto this ground with unwashed hands: it belongs to the gods.');
  await think('He wants me to wash at their basin, before their gods. What do I do?',[
    {q:'Dip my hands. It is only water.',no:'Only water. And with it my hands would say that this ground is holy to their gods, and that I come before them clean. My hands will not say that.'},
    {q:'Go round, and come in by another street.',no:'There are a dozen ways in, and nobody would ever know. I would know. I did not come to Athens to slip past its questions.'},
    {q:'Tell him what his gods are worth.',no:'It would be true. And it would be the last thing that he ever heard from me.'},
    {q:'Decline, and tell him plainly why.',ok:1}]);
  await say(P,'I thank you, but no. I worship one God, who made heaven and earth, and he has asked no such washing of me. I mean no insult to you by it.');
  await say(CH,'One god. And he does not mind the dust? ...Aristion! Come and hear this. A man who will not wash for the gods.');
  await say(AR,'That I have not heard this month. Sit down on the steps, stranger, and tell us the rest. We have all day: we always have.');
  F.basin=1;SFX.good();await Promise.all([walk(CH,404,114),walk(P,372,118)]);CH.dir=-1;P.dir=1;codeBtn()}
const TRY=[{k:'is42',q:'Read them Isaiah: the God who gives breath to the people on the earth.',r:[[CH,'Isaiah. Who is Isaiah? A poet? From which city?'],[P,'A prophet of Israel.'],[CH,'Ah. A foreigner. Go on.']]},
  {k:'de4',q:'Read them Moses: whoever looks for God with his whole heart will find him.',r:[[AR,'Moses. A lawgiver, then. We have one of our own, in marble, at every second corner. Did yours write in verse?']]},
  {k:'ps145',q:'Read them David: God is near to whoever calls on him.',r:[[CH,'David. A king who made songs. Did they win him a prize?']]}];
async function steps(){if(F.shut)return false;const done=new Set();
  await say(P,'Men of Athens, hear what is written.');
  while(done.size<3){const av=TRY.filter(t=>!done.has(t.k)),t=av[await choose(av.map(t=>t.q))];done.add(t.k);await say(P,quote(PS[t.k]));for(const[a,l]of t.r)await say(a,l)}
  await say(AR,'You read well, stranger, and you believe every word of it: I can hear that. But you bring us names, and to us they are only names.');
  await say(AR,'Here, a man who wants to be heard begins with what the other can see for himself, and asks him about it. That is how it has always been done on these steps.');
  await say(P,'He is right. These men have never heard the Scriptures read. If I begin there, I begin where they are not.',TH);
  await say(P,'Then the tablets stay shut. I shall look at their city instead: slowly, the way a craftsman looks at another man\'s work. And I shall ask it four things.',TH);
  F.shut=1;for(const q of Object.keys(QS))addItem(q,1);SFX.good();AU.mood=ROOMS.agora11.mood;
  await narr('So he went through their city again, with four questions.',{dur:5600});codeBtn();return true}

/* ============ BETWEEN THE STATUES: the row of altars ============ */
/* He found the altar while passing along and looking closely (Acts 17:23). Three stones of the seven seem to name nobody, and each
   has to be gone into in its own way: ivy is drawn aside, a broken piece is read where it lies, and the third says what it says. */
function b11(){return G.b11||(G.b11={read:{},ivy:0,frag:0,last:null,seen:0})}
const readS=id=>!!b11().read[id];
async function toBases(){if(!F.shut)return say(P,'Altars, one after another. I have not counted them, and today I am not going to.');
  await step('bases11');const st=b11();if(!st.seen&&!F.qunk){st.seen=1;await say(P,'Seven stones in this stretch alone, and a band of letters on each. This time I read them: one by one.',TH)}}
const STLOOK={pity:'An altar to Pity. They have made a god of a kindness, and built it a table.',pers:'An altar to Persuasion. In this city I can believe it.',
  energy:'An altar to Energy. So they bow down even to their own bustle.',modesty:'An altar to Modesty. It has the largest letters in the row.',
  unknown:'Whole, and clean, and cut in good letters: to a god not known. Nothing is hidden here, and nothing is missing. This is what they meant to write.'};
async function stoneLook(s){const st=b11();
  if(s.id==='ivy'){if(!st.ivy)return say(P,'The base of a statue. Ivy has grown right over its band of letters: I cannot read whose it is.');st.read.ivy=1;st.last='ivy';return say(P,'To the hero Timandros. The name was there all the time, under the leaves.')}
  if(s.id==='broken'){if(!st.frag)return say(P,'To the hero Xe... and there the stone ends. The corner with the rest of the name has broken away.');st.read.broken=1;st.last='broken';return say(P,'To the hero Xenodamos. The end of his name was lying in the grass.')}
  st.read[s.id]=1;st.last=s.id;return say(P,STLOOK[s.id])}
async function ivy(){const st=b11();if(st.ivy)return;st.ivy=1;noise({d:.2,v:.08,f:3000,q:.8});return say(P,'I draw the ivy aside. There are letters under it, as sharp as on the day they were cut.')}
async function fragment(){const st=b11();st.frag=1;return say(P,'A corner of dressed stone, with letters on it: the end of a name. It belongs to the broken base above it.')}
async function stoneAsk(s,id){if(!isQ(id))return false;if(id!=='q11unk')return ask(id,'altar');const st=b11();
  if(s.id==='ivy')return say(P,st.read.ivy?'This one they know: a hero, and he has a name.':'I cannot read it. That does not mean that they cannot.',TH);
  if(s.id==='broken')return say(P,st.read.broken?'This one they know. His name lay in the grass.':'The name is broken off. Broken is not unknown. Where is the piece?',TH);
  if(s.id!=='unknown')return say(P,'This one they know well enough to name.',TH);
  if(!st.read.unknown)return say(P,'I have not even read it yet.',TH);
  if(!st.read.ivy||!st.read.broken)return say(P,'It seems to name nobody. But so do two others in this row, and I have not got to the bottom of those. I will not build on this stone until I know that it stands alone.',TH);
  return RIGHT.altar()}

/* ============ SEED PICKER: the painted colonnade ============ */
/* Two men teach under one roof, one at each end, and whom Paul hears depends on where he stands (zone11, and the room's draw). Each
   says four things. One of the four Paul can hold with him: the Stoic's line of a poet (study note on Acts 17:28), and what the
   Epicurean grants about gifts. What each school held is from the study notes on Acts 17:18 and from Insight ("Stoics",
   "Epicureans"); that a god needs nothing from men is what Bearing Thorough Witness (chapter 18, paragraph 14) says some philosophers
   in his audience may have believed. It does not say which school: the game gives the thought to its Epicurean. The two are invented. */
const SAYS={
 s:[{q:'Live by reason.',say:'Live by reason, and you live as nature meant you to. That is the whole of happiness.',no:'By reason alone? Reason is a gift, and he never asks who gave it. I cannot build on that.'},
  {q:'Feel neither pain nor pleasure.',say:'Pain, pleasure: the wise man gives neither of them a second look.',no:'A man who feels nothing is not wise. He is like their images: he has a mouth, and does not cry out.'},
  {q:'The divine is not anyone.',say:'Everything that is, is a part of the divine; and the divine is not anyone. It is no more a person than fire is.',no:'Not anyone? He is someone. He hears, and he has a name. On that sentence we part.'},
  {q:'We too are his children.',say:'And we come of it. As the poet has it: for we too are his children.',ok:1}],
 e:[{q:'Pleasure is the goal.',say:'Pleasure is where every life is trying to go. Taken in measure, mind you, or it turns on a man.',no:'If pleasure were where life is going, I took the wrong road at Damascus. I do not think that I did.'},
  {q:'Death is a broken jar.',say:'Death? A jar breaks, and the water is gone. Nothing is left over to be afraid.',no:'And nothing left over to hope. On that sentence we part.'},
  {q:'The gods are far away.',say:'The gods exist, and they are happy, and they are very far away. They have never once looked in this direction.',no:'Far away? He is not far from any one of us. No.'},
  {q:'A god lacks nothing.',say:'So bring them nothing. A god lacks nothing: what could your hands add to him?',ok:1}]};
function h11(){return G.h11||(G.h11={s:0,e:0,sh:new Set(),eh:new Set(),mid:0})}
const zone11=()=>P.x<176?'L':P.x>304?'R':'M';
async function hearNext(w){const st=h11(),i=st[w]%4;st[w]++;st[w+'h'].add(i);return say(w==='s'?PH:AN,SAYS[w][i].say)}
async function overhear(z){if(F.stoic&&F.epic)return;const st=h11();
  if(z==='M'){if(!st.mid){st.mid=1;await say(P,'From here I hear both of them at once, and follow neither. I shall have to stand with the one, and then with the other.',TH)}return}
  return hearNext(z==='L'?'s':'e')}
async function sift(w){const st=h11(),who=w==='s'?PH:AN,done=w==='s'?F.stoic:F.epic;
  if(done)return say(who,w==='s'?'You wrote down one line of mine and went away. I do not know whether to be flattered.':'One sentence. You took one sentence of mine, like a sparrow.');
  for(;;){const heard=[...st[w+'h']].sort(),opts=heard.map(i=>SAYS[w][i].q).concat(heard.length<4?['Listen a while longer.']:[],['Leave it for now.']);
    await say(P,heard.length?'Which of his sayings can I hold with him?':'I have not heard him out yet.',TH);
    const c=await choose(opts);if(c===opts.length-1)return;if(c>=heard.length){await hearNext(w);continue}
    const sy=SAYS[w][heard[c]];if(!sy.ok){await say(P,sy.no,TH);continue}
    if(w==='s'){await say(P,'We too are his children. He means it of a god who is nobody. But he has said that we come from God, and one of his own poets said it before him. That I can take up.',TH);F.stoic=1;addItem('g11line');SFX.good();
      if(all5())await say(P,'An altar, a temple, a dish, a block of marble, and a line of their own poets. I have what I came for. Now back to the marketplace: whoever happens to be there will be there.',TH)}
    else{await say(P,'A god lacks nothing. He draws the wrong end from it: that the gods do not care. But the sentence itself is true, and he has granted it before I have opened my mouth.',TH);F.epic=1;SFX.good()}
    codeBtn();if(F.stoic&&F.epic)return picker();return}}
async function picker(){await say(PH,'You, stranger. You have stood at my end of this colonnade and at his, and each time you scratched one line on your wax and walked away.');
  await say(AN,'A grain here, a grain there. I know that bird. It hops about the marketplace behind the corn sellers.');await say(PH,'A seed picker.');
  await say(P,'Let them call it picking. I know what I am gathering it for.',TH);codeBtn()}

/* ============ LED TO THE AREOPAGUS ============ */
/* The account gives the philosophers' two verdicts and not their arguments (Acts 17:18), and none is invented for them. Greek and
   Roman law forbade the bringing in of new gods (Insight, "Athens"), and the men of the Areopagus watched over such things (The
   Watchtower, 1985, "A Unique Athenian Rock"): so one question is put to Paul plainly, and he answers it plainly. */
async function dispute(){place(PH,'agora11',P.x+46,120,-1);place(AN,'agora11',P.x+70,126,-1);AU.mood='market';
  await narr('Two schools taught under one roof and agreed on nothing. They agreed about him.',{dur:6200});await tell('v18a');
  await say(AN,'Here he is: the seed picker. He has been into every corner of the city with his wax.');
  await say(PH,'And what has he picked up? Tell us, stranger. What is it that you are trying to say?');
  await say(P,'That God has raised a man from the dead: Jesus. And that through him there is good news for every one of you.');
  await say(AN,'Raised from the dead! Did you hear him?');await tell('v18b');
  await say(PH,'New gods are no matter for the steps of a colonnade. Do you bring this city gods that it does not have, stranger? Answer plainly: it is what the court will ask.');
  await think('He asks whether I bring them new gods. What do I answer?',[
    {q:'Call it what you like. I have nothing to hide.',no:'True, and it answers nothing. He asked me plainly, and he shall have it plainly.'},
    {q:'Ask me that in the synagogue, on the Sabbath.',no:'They would never come. And it was here that I said it.'},
    {q:'I bring no new god: I announce the One who made you.',ok:1}]);
  await say(P,'I bring no new god. I announce the One who made this ground before there was a city on it; and Jesus, whom he raised from the dead.');
  await say(AN,'It sounds strange enough. Come: say it where it can be heard to the end.');await tell('v19');await tell('v20');
  await narr('They did not drag him. They did not let go of him either.',{dur:5600});
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
 {g:'altar',v:'you',told:['v22','v23'],claim:'there is a God whom Athens worships without knowing him',ps:[]},
 {g:'roof',v:'you',told:['v24'],claim:'God lives in no temple made by hands',ps:['k8']},
 {g:'dish',v:'you',told:['v25'],claim:'God needs nothing from human hands',ps:['ps50','is42']},
 {g:null,v:'we',told:['v26','v27'],claim:'every nation comes from one man, and God is not far from any one of us',ps:['de4','ps145']},
 {g:'line',v:'we',told:['v28'],claim:'it is by him that we live',ps:['ps36']},
 {g:'block',v:'we',told:['v29'],claim:'we should not liken the Divine Being to gold or silver or stone',ps:['is40']},
 {g:null,v:'all',told:['v30','v31'],claim:'God tells all people everywhere to repent, for he has set a day, and a man as judge',ps:['ps96']}];
const partNo=()=>{let n=1;while(n<=7&&F['s'+n])n++;return n};
function sp11(){if(!G.sp11)G.sp11={ground:null,voice:'you',lean:partNo()-1,warned:0};return G.sp11}
async function hillIntro(){AU.mood='hill';await narr('The sun was low when they came to the top. The men of the court were in their seats.',{dur:6200});await tell('v22');
  await say(JU,'You have been brought up here, stranger, because what you say is new to us. Tell us what it is; and begin where we can follow you.');
  await say(P,'No scroll that they would know. Then I begin from what I have seen in their streets, I stand beside them where I can, and I leave nothing out.',TH);sp11();codeBtn()}
/* the grounds he can still begin from: the grains that are left, and empty hands */
const grounds=()=>Object.keys(GRAIN).filter(k=>has(GRAIN[k].item)).concat([null]);
async function nextGround(){const st=sp11(),L=grounds();st.ground=L[(L.indexOf(st.ground)+1)%L.length];SFX.click()}
async function nextVoice(){const st=sp11();st.voice=VOICES[(VOICES.indexOf(st.voice)+1)%3];SFX.click()}
async function speakWith(id){if(!GITEM[id])return false;sp11().ground=GITEM[id];return speak()}
async function speak(){if(F.spoke)return;const st=sp11(),n=partNo(),p=PARTS[n];
  if(n===7&&!st.warned){st.warned=1;
    await say(P,'They are with me. Every man on these seats has leaned toward me. And what comes now is what they laughed at in the marketplace.',TH);
    await think('Do I say the rest?',[
      {q:'Stop here. They are listening as never before.',no:'They are. And if I stop here, I have told them of a God who made them, and left out why I crossed the sea.'},
      {q:'Keep it for another day, when they know me better.',no:'There may be no other day on this hill. And I do not own this message, to hand it out in portions.'},
      {q:'Say all of it, now.',ok:1}]);
    return say(P,'Nothing of theirs carries what comes now. It rests on what God has done.',TH)}
  if(st.ground!==p.g){
    if(n===7||n===4){await say(n===4?PH:JU,T(n===4?'You begin from {ground}. And now you tell us that {claim}. No stone in Athens says that.':'You begin from {ground}. And now you tell us that {claim}. What have our streets to do with that?',{ground:T(GRAIN[st.ground].cap),claim:T(p.claim)}));
      return say(P,n===4?'He is right. Nothing of theirs says this. I can only say it, and stand among them while I do.':'Nothing that I picked up in their streets reaches this far.',TH)}
    if(!st.ground)return say(AN,T('You tell us that {claim}. So does every stranger who climbs this hill with something new. What have you seen that says so?',{claim:T(p.claim)}));
    return say(n===1?JU:n%2?AN:PH,T(n===1?'We asked what you are announcing, stranger, and you begin from {ground}. I do not see yet where you are going.':'You begin from {ground}, and what you tell us is that {claim}. Where is the road from the one to the other?',{ground:T(GRAIN[st.ground].cap),claim:T(p.claim)}))}
  if(st.voice!==p.v){
    if(n<=3){await say(AN,st.voice==='we'?'We? You came off a ship ten days ago. Tell us what you have seen in our city, stranger, and leave us to say "we".':'All people everywhere? You are in Athens, and it was Athens that asked you.');
      return say(P,'What I saw, I saw in their streets. It is to them that I am saying it.',TH)}
    if(n===7){await say(JU,st.voice==='you'?'We are to repent? Athens? Of what, and before whom?':'You too, then. And who else?');
      return say(P,'This is not said to Athens alone, nor by one of them. It is said to everyone, everywhere.',TH)}
    if(st.voice==='all'){await say(AN,'All people everywhere? You are in Athens, and it was Athens that asked you.');
      return say(P,'Not yet. Said like that, it goes over their heads. This I say as one of them: "we".',TH)}
    await say(n===4?AN:PH,n===4?'You were all made out of one man? We are Athenians, stranger. We are not "all".':n===5?'You live by him, you say. And you? Do you stand outside it?':'We are not to think so? You stand there and point at us.');
    return say(P,n===6?'Said like that, it is an accusation. I have thought such things myself. We should not: I say it of all of us.':'Said like that, I stand outside and point. He is not far from any one of us; and I am one of us.',TH)}
  for(const k of p.told)if(!(n===1&&k==='v22'))await tell(k);
  F['s'+n]=1;if(p.g)delItem(GRAIN[p.g].item);st.ground=null;st.lean=n;if(n<7)ring11(n);SFX.click();
  if(n===1)await say(JU,'Our own altar. Then your God is no stranger to our roads, at least. Go on.');
  else if(n===2)await say(AN,'Six hundred years, and no roof. He has us there.');
  else if(n===3)await say(AN,'Lacks nothing. I said as much this very morning. Go on, stranger.');
  else if(n===4)await say(PH,'He says "us". He counts himself in.');
  else if(n===5)await say(PH,'That line is one of ours.');
  else if(n===6)await say(JU,'He says "we should not". And he is looking at the rock up there as he says it.');
  else return broke();
  codeBtn()}
/* the hearing breaks off (Acts 17:32). Nothing the player did wins anyone or loses anyone. */
async function broke(){await say(AN,'Raised from the dead! He kept that for the end.');await tell('v32');F.spoke=1;G.sp11=null;
  await narr('He got as far as the resurrection.',{dur:4600});
  await say(PH,'Not all of us are laughing, stranger. But this wants a longer evening than is left.');
  place(PH,'hill11',452,124,-1);place(AN,'hill11',262,124,1);SFX.good();codeBtn()}

/* ============ SO PAUL LEFT THEM ============ */
/* Three kinds of men are left on the rock (Acts 17:32-34). Those who scoff are answered by the path down; those who would hear more
   are told where; and for those who join him the tablets open, for the first time in this chapter, at their first line. That they
   came down the path after him, and what he showed them, is invented. Insight ("Damaris") says that she heard Paul's defense and was
   possibly not a Greek, because women in Athens normally stayed out of public life: she listens from the path, below the seats. */
async function scoff(){if(F.down)return;await say(AN,'Tell us again about the dead man who is going to judge us, seed picker. It was the best thing I have heard this month.');
  const o=['He is not dead. That is the whole of it.','You asked what it meant. I have told you.','Say no more to them.'],c=await choose(o);
  if(c===0){await say(P,o[0]);return say(AN,'Not dead! Do you hear him? Not dead!')}
  if(c===1){await say(P,o[1]);return say(AN,'And we are grateful. Tell it again, slower, for my friend here.')}
  return say(P,'Every answer I gave them would be true, and each would make them merrier. The answer to this is the path down.',TH)}
async function later(){if(F.later)return say(PH,'By the steps of the long colonnade. I shall find you.');
  await say(PH,'Where does a man find you, if he wants the rest of it?');
  await say(P,'In the marketplace, every day, by the steps of the long colonnade. And on the Sabbath in the synagogue: the lane just beyond the marble youth who has lost his hand.');
  await say(PH,'By the statues. You have learned to talk like an Athenian.');F.later=1;SFX.good();codeBtn()}
async function down(){if(F.down)return say(P,'They are waiting for me here. I am not going anywhere yet.');
  if(!F.later)return say(P,'Some of them asked to hear more, and I have not told them where to find me.');
  await tell('v33');await walk(P,150,126);F.rose=1;place(DI,'hill11',348,112,-1);await walk(DI,186,124);DI.dir=-1;P.dir=1;await tell('v34');
  await say(DI,'I have sat in judgment on that rock for twenty years, and tonight it was I who was heard. I am Dionysius. You shall not go down alone.');
  await say(DM,'And I am Damaris. Women do not stand among the seats up there, so I listened from the path. I heard every word.');
  await say(DI,'You spoke of the God who made the world. Our poets guess at him. Is there more than guessing? Is any of it written?');
  F.down=1;SFX.good();codeBtn()}
async function openTablets(){if(!F.down)return false;if(F.open)return;F.open=1;
  await say(P,'It is written. And it begins like this.');SFX.pick();await say(P,quote(PS.ge1));
  await say(DM,'When all things began. Then there is more of it.');
  await say(P,'There is a great deal more. Sit down, both of you. There is still some light.');
  await narr('The tablets that nobody in the marketplace had wanted lay open on the rock until the stars came out.',{dur:7600});return finale()}
async function finale(){AU.mood='rest';
  endScreen({title:'The Unknown God',text:'He had no scroll that they would have known. He began with an altar of theirs, and ended where he always ended.',
    based:'Based on Acts 17:16-34. Supporting characters and dialogue are imaginative; the events are from the Scriptures, and are told here in paraphrase. Acts does not say how long Paul waited in Athens or where he lodged, what he said in the synagogue, where the altar stood or what else he looked at, what the philosophers argued, whether he was taken to the hill or to a sitting of the council elsewhere, which poets he meant, where Damaris stood, or whether Silas and Timothy reached him there.',
    go:'Click to continue to Chapter Twelve',code:['Chapter Twelve code: {code}',codeOf(12,0)]});
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
  q11made:{name:'question: who has made them?',look:'Who made them? I want to see the making with my own eyes, not to be told of it.'},
  q11house:{name:'question: where does he live?',look:'Where does he live? They build houses for their gods. I want to see one where the hands can still be seen.'},
  q11need:{name:'question: what does he need?',look:'What does he need? I want to see what they bring him, and who has to carry it.'},
  q11unk:{name:'question: one they do not know?',look:'Is there one they do not know? Among so many, there may be one for whom they have no name.'},
  g11altar:{name:'seen: altar without a name',look:GRAIN.altar.note},g11roof:{name:'seen: temple without a roof',look:GRAIN.roof.note},
  g11dish:{name:'seen: robe and covered dish',look:GRAIN.dish.note},g11line:{name:'heard: line of their poets',look:GRAIN.line.note},g11block:{name:'seen: god in the making',look:GRAIN.block.note}});
/* two thoughts used on each other, or on the tablets: nothing comes of it, and Paul says why */
{const Q=Object.keys(QS),GI=Object.keys(GITEM),all=Q.concat(GI,['tablets']);for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){const a=all[i],b=all[j],k=[a,b].sort().join('+');
  COMBO[k]=()=>say(P,a==='tablets'||b==='tablets'?'Not into the tablets. They stay shut in this city until somebody asks for them.':isQ(a)&&isQ(b)?'One question at a time, and each of them to the thing that can answer it.':isQ(a)||isQ(b)?'That question is answered already. The open ones belong to the city.':'They belong together, and on the hill I shall lay them one upon the other. Not before.',TH)}}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: Paul stands below the picture, and takes no step */
const qOn=kind=>id=>isQ(id)?ask(id,kind):false;
ROOMS.road11={space:.5,walk:[16,624,112,138],get mood(){return F.shut?'walk':'calm'},amb:{wind:.3,birds:.4},hs:[
  {name:'road down to the harbor',x:0,y:60,w:16,h:46,wx:20,wy:122,dir:-1,exit:()=>say(P,'Not while Silas and Timothy are on their way to me. The message said: Athens.'),look:'The road back down to the sea. The ship that brought me has turned for home.'},
  {name:'Acropolis',x:398,y:40,w:108,h:34,wx:452,wy:114,look:'The rock of their city, with the temple of their goddess on it, and her image in bronze before it. It can be seen from every road. I think that is the idea.',useWith:qOn('temple')},
  {name:'temple of Zeus',x:238,y:40,w:96,h:44,wx:290,wy:114,useWith:qOn('roof'),
    look:()=>say(P,F.qhouse?'The house of their highest god: six hundred years, and no roof.':'Columns as tall as cedars, in two rows, and nothing on top of them. Somebody began a temple here on a scale that I have never seen; and left it.')},
  {name:'altars by the road',x:60,y:76,w:196,h:30,wx:150,wy:114,def:'use',use:toBases,useWith:id=>isQ(id)?(id==='q11unk'?toBases():ask(id,'altar')):false,
    look:()=>say(P,F.qunk?'Altars and statues, all the way up from the sea. One of them is to a god they do not know.':F.shut?'Altars, and the bases of statues, one after another. Each has a band of letters. This time I shall read them.':'Altars, one after another, all the way up from the sea. I have not counted them, and I am not going to.')},
  {name:'statue of a hero',x:134,y:50,w:16,h:54,wx:158,wy:114,dir:-1,look:'A man in marble, with his mantle about him. A hero, the letters say. He looks over my head toward the sea.',useWith:qOn('statue')},
  {name:'bronze statue',x:314,y:48,w:16,h:56,wx:338,wy:114,dir:-1,look:'A man in bronze, larger than I am. The letters under him give him more titles than I can read in one breath.',useWith:qOn('statue')},
  {name:'city gate',x:592,y:64,w:32,h:42,wx:608,wy:114,dir:1,exit:()=>goto('street11',40,122,1),look:'The gate of Athens. Whoever built this wall did not mean it to keep the gods out: they stand on both sides of it.'}]};
ROOMS.street11={space:.8,walk:[16,624,112,138],get mood(){return F.shut?'walk':'calm'},amb:{crowd:.25,fountain:.5,birds:.2},hs:[
  {name:'city gate',x:0,y:40,w:14,h:64,wx:18,wy:122,dir:-1,exit:()=>goto('road11',604,122,-1),look:'The gate, and the road down to the harbor.'},
  {name:'fountain',x:42,y:78,w:36,h:28,wx:86,wy:114,dir:-1,look:'A fountain in the wall: clean water, and a basin of good stone. It is the one thing in this street that nobody has put a face on.',use:'I drink. The road up from the sea was long, and I walked it alone.',pickup:'A fountain stays where it is.'},
  {name:'houses',x:462,y:30,w:120,h:30,wx:560,wy:114,look:'Plastered houses with tiled eaves, like the houses of any city. It is what stands in front of them that is different.'},
  {name:'door',x:554,y:62,w:24,h:42,wx:566,wy:114,look:'Somebody\'s door. I know nobody in this city yet.',open:'It is not my door, and I have not been asked in.'},
  ...STAT.map(s=>({get name(){return seenS(s.id)?s.nm:'statue'},x:s.x-8,y:46,w:16,h:58,wx:s.x+(s.id==='p2'?-24:22),wy:114,dir:s.id==='p2'?1:-1,
    look:async()=>{(G.s11||(G.s11={}))[s.id]=1;if(s.id==='p1'||s.id==='p2')G.s11.p1=G.s11.p2=1;await say(P,s.look)},useWith:qOn('statue'),pickup:'It is bronze and marble, and it is theirs.',use:'There is nothing that I want from it.'})),
  ...LANES.map(([x,k])=>({name:'lane',x,y:56,w:30,h:48,wx:x+15,wy:114,exit:()=>lane(k),look:'A lane between two houses, with another house at the end of it. They all look alike to a stranger.'})),
  {name:'way to the marketplace',x:608,y:40,w:32,h:66,wx:622,wy:124,dir:1,exit:toAgora,look:'The street runs on to the marketplace. I can hear it from here.'}]};
ROOMS.syn11={space:1.4,walk:[16,304,112,137],mood:'still',amb:{crowd:.1},hs:[
  {name:'door to the lane',x:17,y:47,w:30,h:57,wx:44,wy:116,dir:-1,exit:()=>say(P,'Not before I have said what I came to say.'),look:'The door to the lane. Beyond it stands a marble youth without a hand; in here nothing has a face but the people.'},
  {name:'benches',x:56,y:84,w:62,h:20,wx:90,wy:113,look:'Benches of stone along the wall. A small house, and a full one.',use:'I have been asked to sit, and then to speak.'},
  {name:'windows',x:108,y:22,w:106,h:24,wx:160,wy:113,look:'Two small windows, with upright bars. The noise of the street stays outside them.'},
  {name:'lamp niche',x:72,y:50,w:18,h:22,wx:90,wy:113,look:'A lamp in its niche, not lit by day.',pickup:'It belongs to this house.'},
  {name:'chest of the scrolls',x:212,y:68,w:38,h:36,wx:206,wy:114,dir:1,look:'The chest of the scrolls, under a cloth of purple. In this house, Moses and Isaiah are names that every child knows.',open:'It is not mine to open.',pickup:'It is not mine to carry off.'},
  {name:"reader's table",x:130,y:82,w:64,h:22,wx:160,wy:113,look:'The table from which the Law is read, with one scroll lying on it.',pickup:'It stands where the whole house can see it.'},
  {name:'men and women of the synagogue',x:254,y:78,w:60,h:50,wx:236,wy:126,dir:1,look:'Jews of Athens, and with them two or three Greeks who worship God. They live among all those images, and come here.',talk:()=>synTalk()}]};
ART.syn11.draw=g=>cast(g,[['hx111',272,122,-1],['hx112',292,128,-1],['hx113',300,118,-1]],lit11(280,122));
ROOMS.agora11={space:.6,walk:[16,624,112,138],mood:'market',amb:{crowd:.6,birds:.2,hammer:.12},enter:async()=>{if(all5()&&!F.led)return dispute()},hs:[
  {name:'street',x:0,y:40,w:16,h:66,wx:20,wy:124,dir:-1,exit:()=>goto('street11',612,124,-1),look:'The street back toward the fountain and the gate.'},
  {name:'Acropolis',x:372,y:6,w:150,h:30,wx:446,wy:114,look:'The Acropolis, over every roof in the city. Their goddess in bronze, and behind her the house they built her.',useWith:qOn('temple')},
  {name:'temple of Hephaestus',x:54,y:6,w:100,h:36,wx:110,wy:114,look:'A temple on the low hill above the marketplace. The men who work with fire and with stone have their yards round the foot of it.',useWith:qOn('temple')},
  {name:'houses of the craftsmen',x:18,y:52,w:76,h:52,wx:60,wy:114,look:'Shops and houses under the temple hill. From behind them comes the sound of iron on stone.'},
  {name:'boundary stone',x:34,y:78,w:12,h:28,wx:52,wy:114,dir:-1,look:'A stone that marks where the marketplace begins. Inside it, the ground belongs to their gods: so the letters say.'},
  {name:'basin',x:47,y:91,w:20,h:15,wx:74,wy:114,dir:-1,look:'A basin of water beside the boundary stone, for the cleansing of whoever comes in.',use:()=>F.basin?say(P,'No. I said why, and I have not changed my mind.'):basin(),pickup:'It is of stone, and it is theirs.'},
  {name:'lane to the craftsmen',x:96,y:48,w:32,h:56,wx:112,wy:114,exit:()=>!F.basin?basin():goto('yard11',60,124,1),look:'Steps that climb between two walls, toward the yards under the temple.'},
  {name:'long colonnade',x:CX,y:28,w:CW,h:60,wx:340,wy:114,look:'A colonnade the length of a street. People walk up and down in its shade and talk: about ships, about prices, about the gods, and about each other.'},
  {name:'image in the colonnade',x:CX+110,y:46,w:18,h:54,wx:CX+146,wy:114,dir:-1,look:'An image of one of their gods, bearded, in the shade of the colonnade. People walk past it as past a neighbor.',useWith:qOn('statue')},
  {name:"potter's wares",x:246,y:96,w:60,h:14,wx:276,wy:116,look:'Jars, jugs and bowls on a mat. Athens sells its pots to the whole world, they say.',pickup:'They are for sale, and I have no use for a jar.'},
  {name:'jars of oil',x:438,y:94,w:28,h:14,wx:468,wy:116,dir:-1,look:'Oil in tall jars, waiting for a buyer.',pickup:'They are not mine.'},
  {name:'steps of the colonnade',x:380,y:98,w:76,h:8,wx:372,wy:118,dir:1,look:'The steps of the long colonnade. Whoever has nothing to do sits here, and in this city that is a good many.',use:'I have been sitting, and talking. Now I have things to look at.'},
  {name:'painted colonnade',x:484,y:36,w:54,h:68,wx:510,wy:114,exit:()=>!F.basin?basin():F.shut?goto('stoa11',40,124,1):say(P,'Two men are teaching in there, each to his own circle. I have hearers of my own on the steps first.'),look:'A second colonnade, with painted panels along its wall. Men go in to listen to teachers, and come out arguing.'},
  {name:'women of the city',x:268,y:74,w:34,h:50,wx:320,wy:124,dir:-1,look:'A woman of this city, wrapped in her mantle, with her maid behind her. Few of them are seen out of doors.',talk:'It would not be seemly here. And she has not looked my way.'},
  {name:'woman in a mantle',x:576,y:70,w:16,h:50,wx:556,wy:122,dir:1,look:'A woman with her mantle drawn up over her head against the sun. She is watching the potter, not me.',talk:'It would not be seemly here.'},
  {name:'road across the square',x:150,y:126,w:120,h:18,wx:210,wy:130,look:'A broad road of gravel runs right across the square, from the gate toward the Acropolis.'},
  {name:'path up the hill of Ares',x:600,y:60,w:40,h:46,wx:620,wy:116,dir:1,exit:()=>say(P,'The hill of Ares, where their court sits. Nobody climbs it to talk unless he is taken there.'),look:'A bare hill of rock beside the marketplace, with a path up it. Their oldest court sits on its top.'}]};
ROOMS.yard11={space:.6,walk:[16,304,114,138],get mood(){return F.shut?'walk':'calm'},amb:{chisel:.7,crowd:.15},hs:[
  {name:'gate to the lane',x:16,y:52,w:30,h:52,wx:36,wy:116,dir:-1,exit:()=>goto('agora11',112,116,1),look:'The gate, and the steps back down to the marketplace.'},
  {name:'temple of Hephaestus',x:150,y:8,w:150,h:36,wx:230,wy:116,look:'The temple, straight above this yard. The men who cut gods for a living do it in its shadow.',useWith:qOn('temple')},
  {name:'bench of tools',x:68,y:84,w:66,h:20,wx:100,wy:116,look:'Chisels, a mallet, a rasp. I know a well-kept bench when I see one.',pickup:'They are his, and he needs every one of them.',use:'Stone is not my trade.'},
  {name:'figures of silver',x:246,y:62,w:62,h:24,wx:262,wy:116,dir:1,look:'Small figures in silver on a shelf, by the dozen, all alike. One mould, and as many gods as there is metal.',pickup:'They are for sale, and I would not have one as a gift.',useWith:qOn('statue')},
  {name:'blocks of marble',x:212,y:84,w:104,h:20,wx:250,wy:116,look:'Marble, as it comes from the mountain. Nothing has been asked of it yet.',useWith:qOn('*')},
  {name:'block with half a figure',x:164,y:58,w:42,h:52,wx:136,wy:118,dir:1,look:'A block of marble. Above, it is a man to the waist: shoulders, a beard, the beginning of a face. Below, it is still the rock that came down from the mountain.',
    useWith:qOn('block'),pickup:'It took four men and a sledge to bring it here.',use:'I cut cloth, not stone.'}]};
ROOMS.stoa11={space:1.5,walk:[16,464,112,138],mood:'both',amb:{crowd:.3},hs:[
  {name:'steps down to the marketplace',x:0,y:60,w:18,h:84,wx:20,wy:124,dir:-1,exit:()=>goto('agora11',510,116,-1),look:'The way back out to the marketplace.'},
  {name:'painted panels',x:24,y:20,w:434,h:54,wx:240,wy:114,look:'Great panels along the wall, so faded that I cannot tell a battle from a harvest. They are very proud of them.'},
  {name:'image in the recess',x:226,y:30,w:28,h:74,wx:270,wy:114,dir:-1,look:'One of their gods in a recess, in the shade, with a bench on either side. The two teachers have their backs to it.',useWith:qOn('statue')},
  {name:'bench',x:40,y:86,w:60,h:18,wx:70,wy:113,look:'A stone bench. Nobody sits while a teacher is on his feet.'},
  {name:'bench',x:380,y:86,w:60,h:18,wx:410,wy:113,look:'A stone bench. Nobody sits while a teacher is on his feet.'},
  {name:'hearers of the Stoic',x:108,y:74,w:38,h:52,wx:160,wy:124,dir:-1,look:'His hearers: one young, one grey. They nod at the same places.',talk:()=>sift('s')},
  {name:'hearers of the Epicurean',x:338,y:74,w:38,h:52,wx:320,wy:124,dir:1,look:'His hearers. They look as if they had eaten well, and meant to again.',talk:()=>sift('e')}]};
const stoneHs=STONES.map((s,i)=>({get name(){return readS(s.id)?s.nm:s.k==='altar'?'altar':'base of a statue'},x:sx(i),y:stoneTop(s)-3,w:BW,h:BY-stoneTop(s)+3,wx:160,wy:236,
  look:()=>stoneLook(s),useWith:id=>stoneAsk(s,id),pickup:'It has stood here longer than I have been alive.',use:()=>stoneLook(s)}));
ROOMS.bases11={space:.5,walk:NOW,get mood(){return'walk'},amb:{wind:.3,birds:.4},hs:[
  ...stoneHs,
  {name:'feet of a statue',x:sx(1)+4,y:0,w:BW-8,h:74,wx:160,wy:236,look:'The feet and the hem of a man in bronze. From down here that is all of him there is.'},
  {name:'feet of a statue',x:sx(3)+4,y:0,w:BW-8,h:74,wx:160,wy:236,look:'The feet and the hem of a man in marble. His base has lost a corner.'},
  {name:'ivy',x:sx(1),y:bandY(STONES[1])-8,w:BW,h:22,wx:160,wy:236,def:'use',vis:()=>!b11().ivy,use:ivy,pickup:ivy,open:ivy,look:'Ivy, as thick as a blanket, right across the letters.'},
  {name:'piece of stone',x:sx(3)+BW-10,y:122,w:24,h:14,wx:160,wy:236,look:fragment,pickup:fragment,use:fragment},
  {name:'back to the road',x:248,y:126,w:72,h:18,wx:160,wy:236,exit:()=>step('road11',150,116,1),look:'The road, and the rest of the row.'}]};
const NEXT=[null,'They want to know what I am announcing, and whether it is foreign to them. Where in their own city does it begin?','Next: the God who made the world does not live in a house that hands have made.',
  'Next: he is not waited on, as though he lacked something. He is the one who gives.','Next: from one man he made every nation, so that they would look for him. And he is not far from any one of us.',
  'Next: it is by him that we live. Their own writers have said as much.','Next: then we should not liken the Divine Being to gold or silver or stone.',
  'Now the rest: he has looked past the ignorance, he calls on all to repent, he has set a day and a man, and he raised that man from the dead.'];
ROOMS.hill11={space:.4,get walk(){return F.spoke?[30,524,116,138]:[366,366,120,120]},mood:'hill',amb:{wind:.6},hs:[
  {name:'Acropolis',x:300,y:10,w:248,h:50,wx:400,wy:120,look:'Their goddess and her house, straight above us, with the last of the sun on the marble. From here I could count the columns.'},
  {name:'city below',x:0,y:78,w:226,h:24,wx:120,wy:120,look:'The roofs of Athens, and the colonnades of the marketplace, far down. From up here the images cannot be told from the men.'},
  {name:'altar on the rock',x:498,y:86,w:20,h:16,wx:480,wy:120,dir:1,look:'An altar, up here as well. I have stopped being surprised.'},
  {name:'men on the seats',x:228,y:60,w:268,h:56,wx:366,wy:120,def:'talk',vis:()=>!F.spoke,talk:speak,use:speak,
    useWith:id=>id==='tablets'?say(P,'Not here. There is no scroll that these men would know.',TH):speakWith(id),
    look:()=>say(P,NEXT[partNo()],TH)},
  {name:'what I begin from',x:206,y:132,w:172,h:12,wx:366,wy:120,def:'use',vis:()=>!F.spoke,use:nextGround,look:'What I begin from: something of theirs that I have seen or heard, or nothing but my empty hands.'},
  {name:'how I say it',x:378,y:132,w:148,h:12,wx:366,wy:120,def:'use',vis:()=>!F.spoke,use:nextVoice,look:'How I say it: to them as "you", with them as "we", or as what is said to all people everywhere.'},
  {name:'men who are laughing',x:230,y:66,w:74,h:50,wx:300,wy:126,dir:-1,def:'talk',vis:()=>!!F.spoke,talk:scoff,look:'Some are on their feet, and laughing. It was the dead man raised that did it.'},
  {name:'men of the court',x:310,y:60,w:106,h:48,wx:366,wy:124,vis:()=>!!F.spoke,look:()=>say(P,F.rose?'The men of the court. One seat among them is empty.':'The men of the court. One of them has not moved, and has not taken his eyes off me.'),talk:'They have heard me. What each of them does with it is his own.'},
  {name:'men who would hear more',x:420,y:66,w:74,h:50,wx:428,wy:126,dir:1,def:'talk',vis:()=>!!F.spoke,talk:later,look:'These did not laugh. They are talking low among themselves.'},
  {name:'path down',x:0,y:104,w:30,h:40,wx:34,wy:128,dir:-1,vis:()=>!!F.spoke,exit:down,look:'The path down to the city: the way I was led up.'}]};

/* ============ PEOPLE ============ */
const THINK='A thought is not a thing that I can hand over.';
NI.hs={name:'Nikias',actor:NI,look:'An old Athenian by the fountain, with nothing to do and all day to do it in.',talk:nikias,
  show:{tablets:'Wax tablets. A man of letters! Then you will like this city: here even the stones are written on.','*':'Do not show me. Tell me: I have all morning.'}};
DS.hs={name:'Dositheos',actor:DS,look:()=>say(P,'Dositheos, the attendant of the synagogue. He keeps the scrolls, in a city where his neighbors keep images.'),talk:()=>F.syn?say(DS,'On the Sabbath, then.'):synTalk(),
  show:{tablets:'You carry the Scriptures in wax? Then read to us. Here they will be understood.','*':'Keep it, brother.'}};
CH.hs={name:'Charmides',actor:CH,look:'Charmides. He was at the boundary stone before I was, and he will be on these steps when I have gone.',give:id=>!F.basin?basin():id==='tablets'&&!F.shut?steps():false,
  show:{tablets:'More names? Leave them shut, stranger. You were doing better without.','*':'Do not tell me yet. Go and look, and then tell me what you saw.'},
  talk:async()=>{if(!F.basin)return basin();if(!F.shut)return steps();return talkTree([
    {q:'What is the temple without a roof, by the road?',once:1,a:()=>say(CH,'The temple of Zeus. It will be the largest in Greece, when it is finished. My grandfather used to say the same.')},
    {q:'Where are the images made?',once:1,a:()=>say(CH,'Up the steps, under the temple of Hephaestus. You will hear them before you see them.')},
    {q:'Who teaches in this city?',once:1,a:()=>say(CH,'Everybody. But the schools: the Stoics in the painted colonnade, yonder, where the man who began it used to walk up and down; and the Epicureans at the other end of it, because they will not leave the shade to the Stoics.')},
    {q:'I shall be back.',bye:1}])}};
AR.hs={name:'Aristion',actor:AR,look:'Aristion. Old, bald, and in no hurry. He asks the kind of question that a man answers the next day.',give:id=>!F.basin?basin():id==='tablets'&&!F.shut?steps():false,
  show:{tablets:'Shut, I see. Good. Now your eyes are open instead.','*':'A thought? Then finish thinking it, and bring it to the steps when it is whole.'},
  talk:()=>!F.basin?basin():!F.shut?steps():say(AR,all5()?'You have the look of a man who has found something, stranger.':'Have you asked your questions yet? Come back and tell me what the stones said.')};
XE.hs={name:'Xenokles',actor:XE,look:'Xenokles, a stonecutter. Dust to the elbows, and an eye that never leaves the block.',give:id=>id==='q11made'?RIGHT.block():isQ(id)?ask(id,'*'):false,
  show:{tablets:'I cannot read, friend. I cut what the letter-man chalks for me.','*':'Tell it to the stone. It is the only one here that has time.'},
  talk:()=>talkTree([
    {q:'What are you making?',once:1,a:()=>say(XE,'A god. Which one, I shall know when he is sold. One buyer wants a god for the sea, the next a god for his door. Up to the neck they are all the same god.')},
    {q:'How long does one take you?',once:1,a:()=>say(XE,'This morning he was rock to the knees. By the new moon he will have a face. By the next, somebody will be bringing him his dinner.')},
    {q:'I am a craftsman myself: a tentmaker.',once:1,a:()=>say(XE,'Then you know. The buyer never sees the hours.')},
    {q:'Good work to you.',bye:1}])};
SL.hs={name:'slave with a robe and a dish',actor:SL,look:'A slave, resting by the road. Beside him lie a folded robe and a covered dish. He is on his way up to an image, not to a table.',give:id=>isQ(id)?ask(id,'dish'):false,
  show:{tablets:'I cannot read, sir.','*':'I do not understand, sir. I only carry.'},
  talk:()=>say(SL,'A clean robe every seventh day, sir, and the dish every noon. My master would not miss a day. Do not ask me whether it is ever eaten.')};
PH.hs={name:'Philokles',actor:PH,look:()=>say(P,G.room==='hill11'?'Philokles, the Stoic. He brought me up here, and he is listening harder than any of them.':'Philokles. He teaches the Stoics, and says each sentence as if he had weighed it first.'),
  give:id=>G.room==='hill11'&&!F.spoke?speakWith(id):false,
  show:{tablets:'Scratches on wax. Say it, stranger: if it is true, it will stand without the wax.','*':'Say it aloud, to all of us, or not at all.'},
  talk:()=>G.room==='hill11'?(F.spoke?later():speak()):G.room==='stoa11'?sift('s'):say(PH,'Come along, stranger.')};
AN.hs={name:'Antigenes',actor:AN,look:()=>say(P,G.room==='hill11'?'Antigenes, the Epicurean. He came for the entertainment, and has stayed for more than that.':'Antigenes. He teaches the Epicureans, and smiles while he does it.'),
  give:id=>G.room==='hill11'&&!F.spoke?speakWith(id):false,
  show:{tablets:'I prefer my friends to my books, stranger, and my dinner to both.','*':'Is it something new? Then say it to everyone.'},
  talk:()=>G.room==='hill11'?(F.spoke?scoff():speak()):G.room==='stoa11'?sift('e'):say(AN,'After you, seed picker.')};
DI.hs={name:'Dionysius',actor:DI,look:'Dionysius, a judge of the court of the Areopagus. He came down from his seat while the others were still laughing.',give:id=>id==='tablets'?openTablets():false,
  show:{'*':'I do not follow you yet. Begin at the beginning.'},talk:()=>say(DI,'You said nothing up there that you had not seen, or that we had not said ourselves. Until the end. Is any of it written?')};
DM.hs={name:'Damaris',actor:DM,look:()=>say(P,F.down?'Damaris. She stood on this path through the whole of it, and did not go home when the laughing began.':'A woman on the path, with her mantle over her head, standing where she can hear what is said above.'),give:id=>id==='tablets'?openTablets():false,
  show:{'*':'I do not follow you yet, sir. Begin at the beginning.'},talk:()=>say(DM,F.down?'I have heard many teachers from this path, sir. None of them said "we" and meant it. Is there more?':'I am listening, sir. So is everybody.')};

/* ============ WAX TABLETS: people met, tasks still open, the Scriptures, and what he has seen in Athens ============ */
const psIf=(k,f)=>Object.assign({},PS[k],f?{if:()=>!!F[f]}:{});
const TABLETS={
  people:[
    {name:'Silas and Timothy',note:'Still in Beroea. They are to come to me as quickly as they can.'},
    {name:'Nikias',note:'An old Athenian by the fountain. He gives the way by the statues.',if:()=>!!F.way},
    {name:'Dositheos',note:'The attendant of the synagogue of Athens.',if:()=>!!F.syn},
    {name:'Charmides and Aristion',note:'They sit on the steps of the long colonnade, and want to hear whatever is new.',if:()=>!!F.basin},
    {name:'Xenokles',note:'A stonecutter, under the temple of Hephaestus.',if:()=>!!F.qmade},
    {name:'Philokles',note:'He teaches the Stoics, in the painted colonnade.',if:()=>!!F.stoic||!!F.led},
    {name:'Antigenes',note:'He teaches the Epicureans, at the other end of it.',if:()=>!!F.epic||!!F.led},
    {name:'Dionysius',note:'A judge of the court of the Areopagus.',if:()=>!!F.down},
    {name:'Damaris',note:'She listened from the path below the rock.',if:()=>!!F.down}],
  tasks:[
    {t:'Find the synagogue. Somebody in the street will know the way.',if:()=>!F.way&&!F.syn},
    {t:()=>T('The way to the synagogue: {way}',{way:T(WAY)}),if:()=>!!F.way&&!F.syn},
    {t:'The men on the steps want to hear something new.',if:()=>!!F.basin&&!F.shut},
    {t:'Who made them? Find where it can be seen.',if:()=>!!F.shut&&!F.qmade},
    {t:'Where does he live? Find a house where the hands can still be seen.',if:()=>!!F.shut&&!F.qhouse},
    {t:'What does he need? Find what is brought to him.',if:()=>!!F.shut&&!F.qneed},
    {t:'Is there one they do not know? Read the altars by the road.',if:()=>!!F.shut&&!F.qunk},
    {t:'Two men teach in the painted colonnade. Hear each of them out, and keep what I can hold with him.',if:()=>!!F.shut&&!(F.stoic&&F.epic)},
    {t:'Back to the marketplace.',if:()=>all5()&&!F.led},
    {t:'They have asked what I am announcing. Begin where they can follow, and leave nothing out.',if:()=>!!F.led&&!F.spoke},
    {t:'Some would hear more. Tell them where.',if:()=>!!F.spoke&&!F.later},
    {t:'Leave them.',if:()=>!!F.later&&!F.down},
    {t:'Dionysius asks whether any of it is written.',if:()=>!!F.down&&!F.open}],
  scripture:[psIf('is42'),psIf('de4'),psIf('ps145'),psIf('k8','s2'),psIf('ps50','s3'),psIf('ps36','s5'),psIf('is40','s6'),psIf('ps96','s7'),psIf('ge1','open')],
  notes:{title:'SEEN IN ATHENS',none:'Nothing yet. I have not looked.',list:[...Object.keys(GRAIN).map(k=>({t:GRAIN[k].note,if:()=>!!F[GRAIN[k].f]})),
    {t:'An Epicurean grants it: a god lacks nothing that our hands could bring him.',if:()=>!!F.epic}]}};

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
function setup11(){P.hs=null;P.called='Paul';G.b11=G.h11=G.sp11=null;G.s11={};G.z11=null;G.caps11=[];place11('road11');G.inv=['tablets'];G.invs={paul:G.inv};drawInv()}

/* ============ THE START ============ */
async function start11(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(11);G.end={};
    try{await need('map');await SHARED.map.journey(ROAD,{view:'west',labels:LAB});await narr('The brothers from Beroea had sailed home with his message. Nobody walked beside him now.',{dur:7600,low:1})}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;place11('road11');enterRoom('road11',...ENT.road11);codeBtn();await fade(0,700);
    await narr('About 50 C.E. The road from the harbor ran up to Athens between altars and monuments. His tools were in his pack: nobody here had ordered a tent.',{dur:9500});
    await narr('He had seen idols in every city. Here he gave up counting them.',{dur:5600});await tell('v16');
    await say(P,'There will be a synagogue in this city. There, at least, they will know the names I use. Somebody inside the gate can tell me the way.',TH);codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
const SPH=[null,
  ['They ask whether what I announce is foreign. One of their own stones answers that.','I begin from their altar without a name, I say "you", and I turn to the men on the seats.'],
  ['Where does the God who made the world live? I have seen a house that hands could not finish.','I begin from the temple without a roof, and say "you".'],
  ['Does he need anything? I have seen what is carried up to an image every noon.','I begin from the robe and the dish, and say "you".'],
  ['Nothing of theirs says that all nations come from one man. But he is not far from any one of us.','Empty hands; and I say "we".'],
  ['Their own poets have said whose children we are.','I begin from the line of their poets, and say "we".'],
  ['If we are his children, he is not like a thing that a man has carved. And I do not stand outside that.','I begin from the block of marble, and say "we".'],
  ['What comes now rests on nothing of theirs: only on what God has done. And it is said to everyone.','Empty hands; and I say "all people everywhere".']];
function hint11(){
  if(F.down)return['open11',['They have never heard of Moses either. But these two are asking.','I give my wax tablets to Dionysius, or to Damaris.']];
  if(F.spoke)return F.later?['down11',['Every answer makes the scoffers merrier. Some things are answered by going.','I take the path down, at the left of the rock.']]:['later11',['Not all of them laughed. Some asked to hear more.','I talk to Philokles, and tell him where I am to be found.']];
  if(F.led)return['sp'+partNo()+'11',SPH[partNo()]];
  if(all5())return['back11',['I have what I came for. Whoever happens to be in the marketplace will be there.','I go back to the marketplace.']];
  if(F.shut){const r=G.room;
    if(r==='bases11'||(r==='road11'&&!F.qunk&&F.qhouse&&F.qneed)){const st=b11();return!F.qunk?['unk11',['Three of these stones seem to name nobody. A name can be covered, or broken off, or never have been there at all.',
      !st.ivy?'I draw the ivy aside from the second stone, and read it.':!st.read.ivy?'I look at the base where the ivy was.':!st.frag?'I look at the piece of stone in the grass, under the broken base.':!st.read.broken?'I look at the broken base again.':'I look at the altar with nothing over it, and then put my question to it: is there one they do not know?']]
      :['road11b',['This road has more to show than its altars.','The temple without a roof, and the slave who rests beside the road.']]}
    if(r==='stoa11'&&!(F.stoic&&F.epic))return['stoa11',['A man can be wrong about nearly everything, and still say one sentence that is true. Whom I hear depends on where I stand.',
      !F.stoic?'I stand at the left end until the Stoic has said all four of his sayings, then talk to him: we too are his children.':'I stand at the right end until the Epicurean has said all four of his sayings, then talk to him: a god lacks nothing.']];
    if(!F.qmade&&(r==='yard11'||r==='agora11'))return['made11',['Who made them? There is a place where that can simply be watched.','From the marketplace I climb the lane to the craftsmen, and put the question to the block with half a figure.']];
    if(!F.qhouse)return['house11',['Where does he live? On the road from the harbor stands a house that hands could not finish.','On the road outside the gate: I put the question to the temple of Zeus.']];
    if(!F.qneed)return['need11',['What does he need? I have seen things carried up that road.','On the road outside the gate: I put the question to the slave with the robe and the dish.']];
    if(!F.qunk)return['unk11a',['Is there one they do not know? The road from the harbor is lined with altars, and each has its letters.','On the road outside the gate: I use the altars by the road, and read every stone.']];
    if(!F.qmade)return['made11',['Who made them? There is a place where that can simply be watched.','From the marketplace I climb the lane to the craftsmen, and put the question to the block with half a figure.']];
    return['stoa11a',['Two schools teach in this city, and both have hearers. I have listened to neither.','From the marketplace I go into the painted colonnade, and stand first with one teacher and then with the other.']]}
  if(F.basin)return['steps11',['They want to hear something new, and I have my tablets.','I talk to the men on the steps of the long colonnade.']];
  if(F.syn)return['basin11',['A man spoke to me at the boundary stone. I owe him an answer.','I talk to Charmides, by the basin.']];
  if(G.room==='syn11')return['syn11',['I was asked to speak. Here they know the Scriptures.','I talk to Dositheos.']];
  if(F.way)return['lane11',['He gave the way by the statues. I shall have to look at each of them.','Past the bronze in the helmet, the marble with the scroll and the old lawgiver: then the lane just beyond the marble youth without a right hand.']];
  if(G.room==='street11')return['way11',['Somebody here will know where the synagogue is.','I talk to the old man by the fountain.']];
  return['gate11',['The city lies through the gate, at the top of this road.','I walk up the road, and go in by the city gate.']]}

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['road11','street11','syn11','agora11','yard11','stoa11','bases11','hill11'],setup:setup11,start:start11,hint:hint11,music:MUSIC,scenes:{},topics:[],tablets:TABLETS,calls:CALLS,
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
