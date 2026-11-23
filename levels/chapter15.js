/* Paul of Tarsus: level data for Chapter Fifteen, "Until Daybreak".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here: its music and
   ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Greece and Troas (Acts 20:1-12), about 56 C.E. After the uproar Paul leaves Ephesus for Macedonia, travels through those parts and
   comes to Greece, where he spends three months. A plot is laid against him as he is about to sail for Syria, and he goes back through
   Macedonia. Seven men go with him; they travel ahead and wait at Troas, and "we" sail from Philippi after the days of the unleavened
   bread and reach them within five days. On the first day of the week they gather for a meal in an upper room lit by quite a few lamps,
   and Paul, who leaves the next day, speaks until midnight. A young man named Eutychus, sitting at the window, sinks into a deep sleep,
   falls from the third story and is picked up dead. Paul goes down, throws himself on him and puts his arms around him, and tells them
   to stop their outcry, for he is alive. He goes up again, begins the meal and eats, talks on until daybreak and leaves; the boy is
   taken away alive, and they are comforted beyond measure.
   Acts does not say in which city Paul spent the three months (the publications say Corinth, where Romans was likely written: Romans
   16:22, 23 name Tertius, who wrote the letter down, and Gaius, the host); how the plot became known; which way the companions took
   to Troas; whether the seven carried the gift for Jerusalem (Romans 15:25-27; 2 Corinthians 8:16-21); or whose house the upper room
   was in. That Phoebe carried the letter to Rome is possible, not certain (Romans 16:1, 2). The scale, the letters with the weights,
   the chest and its seals, the plan in the sand, Nikandros, Mikon, Korinna and the oil seller are invented, and so is everything that
   is said; the end screen says so. Gaius the host (Romans 16:23) is not Gaius of Derbe, one of the seven (Acts 20:4).
   What the account says is told by the narrator, in paraphrase with its reference (TOLD below), and never put into a mouth as a
   quotation. What Paul says that night is told, never composed. The narration says "he" and "they" until the journey to Troas, and
   "we" from Acts 20:5 on, where Luke is with them again; from the quay of Troas to the end Luke is played.
   The fall is never drawn and makes no sound: the window is shown empty while it is told, then the street below by night, with Paul
   bent over the young man among the people, small and half hidden. Nothing the player does changes what happens to Eutychus.
   Four things are played: what Tertius writes about Phoebe (three questions, only true things on offer); the gift weighed in the sight
   of all on a balance, each bag against the weight its letter gives, with four weights that may lie in either pan (a close view); the
   other road, laid out in wet sand with a reed, a shell and an awl (a close view); and a night measured in lamp oil, sitting by
   sitting, until midnight.
   PHASE 1: the art is placeholder art. Each room's painting is a section of its own between "ART <room>: begin" and "ART <room>: end",
   so that one room can be painted anew without touching another; what the story reads from a section is named at its head. */
LEVEL(15,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* A placeholder score: one tune on E with a minor third and a minor sixth, in bars of eight. In the house it is a lyre over a low
   string ("house"); at the two harbors a ney plays it at half its pace over a drone ("harbor"); the plan in the sand is the tune on
   the oud with a hand drum, a road tune ("road"); in the upper room the harp plays it slowly over a drone ("night"); after midnight
   only one note is left of it ("still"), and at daybreak the lyre takes it up an octave higher over the harp ("dawn"). Midnight
   itself is silent (the mood "none"). Nothing is claimed about how music was played then. */
const _=null,
 TUNE={A:[0,_,2,_,4,_,2,_],B:[5,_,4,_,2,_,1,_],C:[4,_,5,_,7,_,5,_],D:[4,_,2,_,1,_,0,_]},
 SLOW={A:[0,_,_,_,4,_,_,_],B:[5,_,_,_,4,_,_,_],C:[2,_,_,_,4,_,_,_],D:[1,_,_,_,0,_,_,_]},
 MUSIC={dt:.21,steps:8,group:[3,3,2],root:52,scale:[0,2,3,5,7,8,10],bars:16,tracks:[
  {inst:'lyre',moods:['house'],prog:'ABCD',len:2,seq:TUNE,vol:.8},
  {inst:'bass',moods:['house','road'],prog:'ABAB',len:5,seq:{A:[-7,_,_,_,-3,_,_,_],B:[-5,_,_,_,-7,_,_,_]},vol:.6},
  {inst:'ney',moods:['harbor'],prog:'ABCD',len:3,oct:12,seq:SLOW,vol:.6},
  {drone:[0],every:16,moods:['harbor','night','still'],vol:.3},
  {inst:'oud',moods:['road'],prog:'ABCD',len:2,seq:TUNE},
  {drum:1,moods:['road'],prog:'AAAB',seq:{A:'d..t..d.',B:'d..t.kd.'},vol:.4},
  {inst:'harp',moods:['night'],prog:'ABCD',len:5,seq:SLOW,vol:.55},
  {inst:'harp',moods:['still'],prog:'AAAA',len:6,seq:{A:[0,_,_,_,_,_,_,_]},vol:.4},
  {inst:'lyre',moods:['dawn'],prog:'ABCD',len:3,oct:12,seq:TUNE,vol:.55},
  {inst:'harp',moods:['dawn'],prog:'ABCD',len:5,seq:SLOW,vol:.6}]};
/* ==== MUSIC: end ==== */

/* ============ ART ============ */
/* What every section may use, and nothing else of this file: the engine's painters (index.html), and the three helpers here.
   GFONT15 and cut15: Greek number letters, drawn as the counting board of Chapter Thirteen draws them. box15: a plain box seen a little
   from above. These three stay; the placeholder painters inside the sections are there to be replaced. */
const GFONT15=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
function cut15(g,s,cx,cy,sz,ink,lip){g.font=GFONT15(sz);g.textBaseline='middle';const w=g.measureText(s).width;
  if(lip){g.fillStyle=lip;g.fillText(s,cx-w/2+.5,cy+.5)}g.fillStyle=ink;g.fillText(s,cx-w/2,cy)}
function box15(g,x,y,w,h,c){const t=Math.min(4,h*.3);R(g,x,y+t,w,h-t,c);poly(g,[x,y+t,x+3,y,x+w-3,y,x+w,y+t],tint(c,.22));R(g,x,y+t,w,.6,tint(c,.36));
  R(g,x,y+h-1,w,1,tint(c,-.3));R(g,x+w-1.5,y+t,1.5,h-t,tint(c,-.22))}

/* ==== ART gaius15: begin ==== */
/* Corinth, a room in the house of Gaius, on a winter day. PLACEHOLDER.
   Called from outside: ART.gaius15 only. Reads nothing of the story: the room has one picture.
   Hotspots (ROOMS.gaius15): window to the court 20,34,32,30 · on the table 92,96,64,12 the letter 104,90,30,8, ink and reed 140,90,10,8
   and the spare tablet 90,92,12,6 · door to the storeroom 268,44,36,60. Actors: Tertius sits at 124,116, Gaius stands at 60,122,
   Paul comes in at 200,124. Walk strip y 112..138. */
ART.gaius15={w:320,q:12,paint(g){paintGaius15(g)},light:{amb:'#dde0ea'},draw(g,t){},front(){}};
function paintGaius15(g){const r=rng(1501),W='#cfc2a6';
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:4,t:.4});
  for(let x=10;x<320;x+=26){R(g,x,3,3,2.6,'#6a4a2c');R(g,x,3,3,.5,'#a07a4a')}
  g.fillStyle=lg(g,0,104,0,144,['#8c7458','#a08868','#aa9272']);g.fillRect(0,104,320,40);tex(g,'mott',.45,0,104,320,40,'overlay',1);ao(g,0,104,320,5,'t',.35,'#2a2030');
  windowGaius15(g,W);doorGaius15(g,r,W);tableGaius15(g);
  /* the stool Tertius sits on */
  R(g,117,109,14,2,'#8a6a44');R(g,118,111,2,5,'#6a4a2c');R(g,128,111,2,5,'#6a4a2c');
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(190,205,230,.9)','rgba(120,120,150,.5)']);g.fillRect(0,0,320,144)})}
/* the window to the court: a winter sky over the court's far wall, and its cool light on the floor */
function windowGaius15(g,W){R(g,17,31,38,36,tint(W,-.3));g.fillStyle=lg(g,0,34,0,64,['#b8c8dc','#dfe4ea']);g.fillRect(20,34,32,30);
  R(g,20,52,32,12,'#b4aa98');R(g,20,52,32,.6,'#8a8070');R(g,20,34,2,30,'rgba(40,36,60,.35)');R(g,16,64,40,2.4,tint(W,.18));R(g,16,66.4,40,.6,tint(W,-.35));
  comp(g,'screen',.28,()=>poly(g,[30,112,74,112,112,140,52,140],'#e4ecf8'))}
function doorGaius15(g,r,W){R(g,265,41,42,63,tint(W,-.35));R(g,268,44,36,60,'#1a120c');boards(g,270,46,32,58,6.4,'#6e4e2e',r);R(g,297,74,1.2,5,'#c8a060');ao(g,268,44,36,6,'t',.5)}
/* the table, seen a little from above, and what lies on it: the letter (a long roll of papyrus, partly unrolled: the roll at its left
   end, the sheet open to the right), ink and a reed, and at the left end the spare tablet */
function tableGaius15(g){const C='#8a6842';
  poly(g,[96,92,152,92,156,99,92,99],tint(C,.16));R(g,92,99,64,3.4,C);R(g,92,99,64,.6,tint(C,.3));R(g,92,102,64,.6,tint(C,-.35));
  R(g,94,102.4,3,5.6,tint(C,-.25));R(g,151,102.4,3,5.6,tint(C,-.25));
  R(g,108,92.4,26,4.6,'#e2d4aa');for(let i=0;i<5;i++){R(g,111+i*4.4,93.6,3,.5,'rgba(70,50,30,.55)');R(g,111+i*4.4,95.2,2.4,.5,'rgba(70,50,30,.45)')}
  R(g,104,91,5,7,'#d2c090');R(g,104,91,5,1,'#f0e4c0');R(g,104,97,5,1,'#a8946a');
  R(g,141,93,4.6,4.6,'#3a3a44');R(g,141,93,4.6,1,'#6a6a78');stroke(g,[146,96.6,150,90.6],'#c8b070',.9);
  R(g,90,93,12,5,'#7a5632');R(g,91.2,94,9.6,3,'#2c2117')}
/* ==== ART gaius15: end ==== */

/* ==== ART scale15: begin ==== */
/* The close view: the storeroom table, seen from in front and a little above, with a balance of bronze. PLACEHOLDER.
   Called from outside (keep these names and what they give back): ART.scale15 · tiltScale15() · weightBoxScale15(id), which the
   weights' hotspots read, so that a weight is clicked where it is painted.
   Reads: sc15() = G.sc15 = {round:0..2, w:{a,g,th,kz: 't' on the board | 'r' in the right pan | 'l' in the left pan, beside the bag}},
   F.s3 (all three weighed: the pan is empty, the bags lie in the chest), WT (the weights: id, v its worth, m its number letters),
   ROUND[round] (bag: what the bag weighs, m: the number letters on its letter), WIT15 (the men behind the table: x, w, a: actor id).
   One backdrop for each round (the letter, the bags in the chest); the balance, the bag and the weights are drawn over it as they stand.
   CROSS RULE: the beam hangs from two cords that run up and apart out of the picture, never from one upright; nothing points up or
   down at its middle; each pan hangs from its beam end by three cords that meet there.
   Geometry: beam pivot 160,36, half-length 70, tilt 6 degrees; pan middles 90,92 and 230,92 when level; the board 96,116,128,22 with
   the weights at x 112, 144, 176, 208 (y 127); the letter 8,100,62,40; the chest 262,72,58,72; the men stand along the top, y 0..22. */
ART.scale15={w:320,q:12,variant:()=>'r'+(F.s3?3:sc15().round),paint(g,v){paintScale15(g,+v.slice(1))},light:{amb:'#ffffff'},draw(g,t){drawScale15(g,t)},front(){}};
const SCALE15={pivot:[160,36],half:70,drop:56,deg:6,tray:{a:112,g:144,th:176,kz:208},size:{a:[9,8],g:[11,9],th:[13,11],kz:[17,12]},font:{a:5.6,g:6,th:6.8,kz:6.4}};
/* tiltScale15: 1 the left pan, the bag's, is down; -1 the right pan is down; 0 the beam stands level */
function tiltScale15(){if(F.s3)return 0;const s=sc15(),on=p=>WT.reduce((n,w)=>n+(s.w[w.id]===p?w.v:0),0);return Math.sign(ROUND[s.round].bag+on('l')-on('r'))}
/* panScale15: the middle of a pan, as the beam stands at angle a (radians; more than 0: the left pan is down) */
function panScale15(side,a){const[px,py]=SCALE15.pivot,d=side==='l'?-1:1;return[px+d*SCALE15.half*Math.cos(a),py-d*SCALE15.half*Math.sin(a)+SCALE15.drop]}
/* weightBoxScale15: where a weight lies, [x,y,w,h]: on the board, or in its pan as the beam comes to rest (a: or as it stands now).
   The weights in a pan sit side by side on it, the smallest at the left; in the left pan they sit before the bag. */
function weightBoxScale15(id,a){const s=sc15(),S=SCALE15,[w,h]=S.size[id],p=s.w[id];if(p==='t')return[S.tray[id]-w/2,127-h/2,w,h];
  const row=WT.filter(q=>s.w[q.id]===p),tot=row.reduce((n,q)=>n+S.size[q.id][0]+2,-2),[cx,cy]=panScale15(p,a==null?tiltScale15()*S.deg*Math.PI/180:a);let x=cx-tot/2;
  for(const q of row){if(q.id===id)break;x+=S.size[q.id][0]+2}return[x,cy+(p==='l'?11:8)-h,w,h]}
function paintScale15(g,k){
  /* the wall behind the table, and the men who stand there: of each only his middle is seen, and his hands on the table's edge */
  R(g,0,0,320,24,'#5e5244');
  for(const m of WIT15){const L=LOOK[m.a],c=L.cloak||L.tunic;R(g,m.x+4,0,m.w-8,22,L.tunic);R(g,m.x+4,0,(m.w-8)*.4,22,c);R(g,m.x+m.w-10,0,6,22,tint(L.tunic,-.25));
    R(g,m.x+4,12,m.w-8,1.6,L.belt||'#4a3a24');for(const hx of[m.x+8,m.x+m.w-14]){R(g,hx,19,6,3.4,L.skin);R(g,hx,19,6,.6,tint(L.skin,.25))}}
  /* the table */
  g.fillStyle=lg(g,0,22,0,144,['#7a5c3a','#8a6a44','#94724a']);g.fillRect(0,22,320,122);tex(g,'wood',.1,0,22,320,122,'overlay',.6);R(g,0,22,320,1,'#b08a5a');
  /* the board on which the weights lie */
  R(g,98,119,128,22,'rgba(20,12,6,.35)');g.fillStyle=lg(g,0,116,0,138,['#c4a674','#b4945e']);g.fillRect(96,116,128,22);R(g,96,116,128,.8,'#e2c896');R(g,96,137.2,128,.8,'#7a5c34');
  if(k<3)letterScale15(g,k);chestScale15(g,k);
  comp(g,'multiply',.35,()=>{g.fillStyle=rg(g,150,70,240,['#ffffff','#8c84a0']);g.fillRect(0,0,320,144)})}
/* the letter that came with the bag: a small sheet of papyrus with a few lines too small to read, and the weight in number letters */
function letterScale15(g,k){poly(g,[10,103,68,101,70,139,10,140],'rgba(20,12,6,.3)');poly(g,[8,101,67,100,69,137,8,139],'#e0d2a8');
  for(let i=0;i<4;i++)R(g,13,106+i*3.2,34+(i*7)%9,.6,'rgba(70,50,30,.5)');for(let i=0;i<2;i++)R(g,13,131+i*3,40-i*12,.6,'rgba(70,50,30,.5)');
  cut15(g,ROUND[k].m,40,123,10,'#3a2616')}
/* the chest, open, at the right edge: its lid stands up behind it; the sealed bags of the rounds that are done lie in it */
function chestScale15(g,k){const C='#6e4c2c';R(g,262,74,58,20,tint(C,-.3));R(g,262,74,58,1,tint(C,.2));
  R(g,262,94,58,50,C);R(g,262,94,58,7,'#1c120a');R(g,262,101,58,1,tint(C,.3));for(let x=270;x<320;x+=12)R(g,x,102,.6,42,tint(C,-.3));
  for(let i=0;i<k;i++){const x=273+i*17;poly(g,[x-7,101,x-5,93,x+5,93,x+7,101],BAGScale15[i][0]);R(g,x-1.5,92,3,3,'#a8543a')}}
const BAGScale15=[['#b49a6a','#7a3a2a'],['#9a8a78','#3a4a6a'],['#a8845a','#4a5a3a']];   /* each round's bag: its cloth, its tie */
/* drawScale15: the balance as it stands. The beam comes to rest slowly (sc.ang), and the bag and the weights ride with their pans. */
function drawScale15(g,t){const s=sc15(),S=SCALE15,want=tiltScale15()*S.deg*Math.PI/180;s.ang=s.ang==null||Math.abs(want-s.ang)<.003?want:s.ang+(want-s.ang)*.14;
  const a=s.ang,[px,py]=S.pivot,B='#b08a4a',BD='#6a4e26',BL='#e2c07a',CO='#8a7a5a',L=panScale15('l',a),Q=panScale15('r',a),el=[L[0],L[1]-S.drop],er=[Q[0],Q[1]-S.drop];
  stroke(g,[px,py-2,146,0],CO,1);stroke(g,[px,py-2,174,0],CO,1);
  stroke(g,[el[0],el[1]+1.2,er[0],er[1]+1.2],BD,3.4);stroke(g,[el[0],el[1],er[0],er[1]],B,3);stroke(g,[el[0],el[1]-1,er[0],er[1]-1],BL,.7);R(g,px-2,py-3,4,4,BD);R(g,px-1.2,py-2.2,2.4,2.4,BL);
  for(const[side,P0,E]of[['l',L,el],['r',Q,er]]){const[cx,cy]=P0,dy=cy+6;
    stroke(g,[E[0],E[1],cx-30,dy-1],CO,.7);stroke(g,[E[0],E[1],cx+30,dy-1],CO,.7);
    oval(g,cx+1,dy+3,32,5,'rgba(20,14,10,.28)');oval(g,cx,dy,32,5.4,BD);oval(g,cx,dy-.6,30.6,4.6,B);oval(g,cx,dy+.4,27,3.4,tint(B,-.2));
    if(side==='l'&&!F.s3)bagScale15(g,cx,cy,s.round);
    for(const w of WT)if(s.w[w.id]===side)weightScale15(g,w,weightBoxScale15(w.id,a));
    stroke(g,[E[0],E[1],cx-14,dy+4.6],'#a8946a',.7)}
  for(const w of WT)if(s.w[w.id]==='t')weightScale15(g,w,weightBoxScale15(w.id))}
/* the bag in the left pan, tied at its neck and not yet sealed */
function bagScale15(g,cx,cy,k){const[C,T2]=BAGScale15[k];
  poly(g,[cx-17,cy+8,cx-18,cy+1,cx-13,cy-5,cx-5,cy-8,cx+5,cy-8,cx+13,cy-5,cx+18,cy+1,cx+17,cy+8],C);
  poly(g,[cx-17,cy+8,cx-18,cy+1,cx-13,cy-5,cx-9,cy-6.5,cx-11,cy+8],tint(C,.16));poly(g,[cx+9,cy+8,cx+11,cy-6,cx+13,cy-5,cx+18,cy+1,cx+17,cy+8],tint(C,-.22));
  poly(g,[cx-6,cy-8,cx+6,cy-8,cx+8,cy-13.4,cx+2,cy-11.6,cx-3,cy-14,cx-8,cy-12.6],tint(C,.08));poly(g,[cx-6,cy-8.8,cx+6,cy-7.4,cx+6,cy-6,cx-6,cy-7.4],T2)}
/* a weight of bronze, wider at its foot, with its number letters cut into it */
function weightScale15(g,w,[x,y,ww,h]){const C='#a8823e';oval(g,x+ww/2+.6,y+h,ww/2+1,1,'rgba(20,14,10,.3)');
  poly(g,[x,y+h,x+1.2,y,x+ww-1.2,y,x+ww,y+h],C);R(g,x+1.2,y,ww-2.4,.8,'#e6c47a');poly(g,[x+ww-2.2,y,x+ww-1.2,y,x+ww,y+h,x+ww-1.6,y+h],'#6e5224');R(g,x,y+h-.8,ww,.8,'#5e461e');
  cut15(g,w.m,x+ww/2,y+h/2+.4,SCALE15.font[w.id],'rgba(40,26,10,.95)','rgba(255,232,170,.5)')}
/* ==== ART scale15: end ==== */

/* ==== ART cen15: begin ==== */
/* Cenchreae, the harbor that looks east, on a clear morning late in winter. PLACEHOLDER.
   Called from outside: ART.cen15 only. Reads nothing of the story: the room has one picture.
   One horizon, y 62. No mast or post crosses it: the grain ship's cabin stands across it, and her mast rises from the cabin's roof.
   Hotspots (ROOMS.cen15): the harbor 0,44,196,44 · ship for Syria 196,30,124,76 · goat 52,98,26,20 · strip of sand 16,126,96,18 ·
   chest 228,106,24,14. Actors: Mikon 150,122 · Timothy 186,124 · Aristarchus 100,118 · Trophimus 280,124 · Tychicus sits beside the
   chest at 258,120 · Paul comes in at 130,128. The goat and the chest stand inside the walk strip (y 112..138): each is named once more
   in props, so that whoever walks behind it is hidden by it. */
ART.cen15={w:320,q:12,paint(g){paintCen15(g)},light:{amb:'#f6f0e6'},draw(g,t){},front(){},props:[{y:118,shape(g){goatCen15(g)}},{y:120,shape(g){chestCen15(g)}}]};
function paintCen15(g){const r=rng(1503),HZ=62;
  sky(g,320,HZ,['#5d8fc8','#9cc0e0','#e6e2cc','#f6e6b8']);
  ridge(g,0,320,HZ,x=>2.2+1.6*Math.sin(x/37+1)+.8*Math.sin(x/11),['#8fa0b4','#a8b4bc']);
  g.fillStyle=lg(g,0,HZ,0,104,['#7fa8c4','#3f7aa4','#2c6690']);g.fillRect(0,HZ,320,104-HZ);
  for(let i=0;i<120;i++){const k=r(),y=HZ+1+k*40;R(g,r()*320,y,2+k*8,.5,r()<.5?'rgba(220,238,246,.35)':'rgba(20,50,80,.3)')}
  pool(g,250,HZ+3,60,6,'#fff0c0',.5);
  shipCen15(g);
  R(g,0,102,320,3,'#b8ae98');R(g,0,102,320,.6,'#e0d8c4');pave(g,0,105,320,144,'#b4a890',r,{rows:5,step:34,vy:HZ});ao(g,0,105,320,4,'t',.3);
  sandCen15(g,r);balesCen15(g);goatCen15(g);chestCen15(g);
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(150,170,210,.6)','rgba(255,232,190,.8)']);g.fillRect(0,0,320,144)})}
/* the grain ship along the quay: her bow to the left, the cabin at her stern to the right, sacks on her deck */
function shipCen15(g){const H='#6a4a2e';
  poly(g,[196,84,204,72,222,78,286,78,320,70,320,104,202,104],H);poly(g,[196,84,204,72,222,78,286,78,320,70,320,74,286,82,222,82,205,77,199,86],tint(H,.25));
  for(let y=86;y<104;y+=4.5)R(g,203,y,117,.5,tint(H,-.3));
  R(g,276,46,44,30,'#8a6a44');R(g,276,46,44,1,'#b8935e');R(g,276,56,44,.6,'#5e4428');R(g,284,60,8,10,'#2a1c12');
  R(g,296,0,3,46,'#5a4028');R(g,296,0,1,46,'#8a6a44');
  for(const x of[226,240,254,266])sack(g,x,79,5,7,'#c8b48a')}
/* wet sand at the foot of the quay, in the foreground at the left */
function sandCen15(g,r){poly(g,[16,128,104,126,112,144,16,144],'#a89470');poly(g,[16,128,104,126,105,128.4,16,130.4],'#8a7a5c');
  inRect(g,16,126,96,18,()=>tex(g,'mott',.5,16,126,96,18,'overlay',1));for(let i=0;i<14;i++)R(g,20+r()*86,131+r()*11,2+r()*5,.5,'rgba(230,220,190,.3)')}
function balesCen15(g){box15(g,20,96,22,16,'#a08a5e');box15(g,26,84,16,12,'#8e7a54');vessel(g,47,112,4,12,'#a4643c','amph');
  for(const[x,y,w,h]of[[122,92,18,13],[142,96,13,9]])box15(g,x,y,w,h,'#9a8458')}
/* the goat, tethered beside the bales: every part of her grows out of the one before it */
function goatCen15(g){const C='#d8d0c0',D='#8a8478',K='#4a443c';
  for(const x of[57,61,69,73])R(g,x,109,1.6,9,x<65?C:D);
  oval(g,65,107,10,5,C);poly(g,[56,104,74,103.4,75,108,57,110],C);oval(g,66,109.6,8,2.4,D);
  poly(g,[58.4,105,55,100.4,58,99.6,61.6,103.6],C);
  poly(g,[52.4,102.6,54.6,99.4,58.6,99.2,59,102,54,104],C);R(g,55.6,100.6,1,1,K);
  stroke(g,[57,99.4,58.6,98.2,60.6,98.4],K,.8);stroke(g,[53.6,103.6,53.2,106],D,.8);
  poly(g,[74,103.6,76.6,101,77.4,102,75.4,105],D);
  stroke(g,[58,104.6,44,112],'#7a6a4a',.5)}
function chestCen15(g){box15(g,228,106,24,14,'#6e4c2c');R(g,228,112.6,24,.8,'#3a2616');R(g,238.6,110.6,2.8,2.8,'#a8543a')}
/* ==== ART cen15: end ==== */

/* ==== ART sand15: begin ==== */
/* The close view: the plan in the wet sand, seen from above, in the low sun of the morning, which comes from the right. PLACEHOLDER.
   Called from outside: ART.sand15 only.
   Reads: F.way, F.shell, F.awl (one backdrop for each state), PEB15 (the pebbles: id, x, y).
   The coasts are grooves drawn with a reed: Greece at the lower left, Macedonia across the top, Asia down the right. NO groove crosses
   another, and none meets another. Pebbles, each a different stone: Cenchreae 86,104 · Beroea 96,56 · Thessalonica 128,44 ·
   Philippi 176,34 · Troas 236,62 · Ephesus 248,100 (hotspots 14x12 round each). The road north is the land between Cenchreae and
   Beroea (hotspot 78,60,24,36), the sea lane to Syria the open water at the foot (150,112,150,24).
   F.way: a row of footprints from Cenchreae north by Beroea and Thessalonica to Philippi, on the land. F.shell: a shell beside the
   pebble for Troas. F.awl: the awl stuck in the sand beside the pebble for Philippi, slanting, handle and blade in one line, its
   shadow falling away from its foot, so that the two never make a cross. */
ART.sand15={w:320,q:12,variant:()=>(F.way?'w':'')+(F.shell?'s':'')+(F.awl?'a':''),paint(g,v){paintSand15(g,v)},light:{amb:'#ffffff'},draw(g,t){},front(){}};
const COASTSand15=[[100,144,97,126,100,110,106,92,108,76,112,62,118,53],[138,53,160,47,184,43,214,45,224,41],[227,49,229,62,234,80,238,96,241,107,254,112,280,111,320,107]];
function paintSand15(g,v){const r=rng(1504);
  g.fillStyle=lg(g,0,0,320,144,['#a08c68','#b09a74','#bca680']);g.fillRect(0,0,320,144);tex(g,'mott',.5,0,0,320,144,'overlay',1);tex(g,'grain',.2,0,0,320,144,'overlay',.5);
  for(let i=0;i<160;i++)R(g,r()*320,r()*144,.5+r()*1.2,.5,r()<.5?'rgba(255,244,214,.25)':'rgba(70,56,36,.22)');
  for(const p of COASTSand15)grooveSand15(g,p);
  if(v.includes('w'))stepsSand15(g);
  PEB15.forEach(([id,x,y],i)=>pebbleSand15(g,x,y,i));
  if(v.includes('s'))shellSand15(g,250,65);if(v.includes('a'))awlSand15(g,187,36);
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(110,110,150,.7)','rgba(255,232,180,.9)']);g.fillRect(0,0,320,144)})}
/* a groove drawn with a reed: dark where it is cut, with a raised lip that catches the light */
function grooveSand15(g,p){stroke(g,p.map((v,i)=>i%2?v+1:v+.6),'rgba(255,246,220,.5)',1);stroke(g,p,'#6e5c40',1.4);stroke(g,p.map((v,i)=>i%2?v-.5:v-.3),'rgba(60,46,30,.6)',.5)}
function stepsSand15(g){const P=[86,97,84,88,85,79,88,71,93,64.6,100,60,107,55,115,50.6,122,51.6,131,51.4,140,48.6,150,44.6,160,41.4,168,39];
  for(let i=0;i<P.length;i+=2){R(g,P[i]-.8,P[i+1]-.6,1.6,1.4,'#6a583c');R(g,P[i]-.2,P[i+1]+.6,1.6,.5,'rgba(255,244,214,.4)')}}
function pebbleSand15(g,x,y,i){const C=['#d8d2c4','#8a8a94','#c4a888','#e2dccc','#9a9488','#b8a090'][i],rx=[4.4,4,4.6,4.2,4.8,4][i],ry=[3.4,3.6,3.2,3.6,3.4,3][i];
  oval(g,x-1.4,y+1,rx,ry,'rgba(40,30,20,.4)');oval(g,x,y,rx,ry,tint(C,-.16));oval(g,x+.5,y-.4,rx-.9,ry-.9,C);oval(g,x+1.4,y-1.1,1.6,1,tint(C,.4))}
function shellSand15(g,x,y){oval(g,x-1.4,y+1,4.6,3,'rgba(40,30,20,.35)');poly(g,[x-4.4,y-1,x-2.6,y-3.4,x,y-4.2,x+2.6,y-3.4,x+4.4,y-1,x,y+3],'#eadfcf');
  for(const d of[-2.6,-1.3,0,1.3,2.6])stroke(g,[x,y+2.6,x+d*1.3,y-2.6-(1.6-Math.abs(d)*.5)],'#b89a84',.4)}
function awlSand15(g,x,y){stroke(g,[x,y,x-9,y+3.4],'rgba(50,40,30,.4)',1);stroke(g,[x,y,x+2.6,y-5],'#d8d8e2',.9);stroke(g,[x+2.6,y-5,x+5,y-9.6],'#8a5a2c',2.2);stroke(g,[x+2.3,y-5.2,x+4.6,y-9.6],'#c08a4c',.7)}
/* ==== ART sand15: end ==== */

/* ==== ART quay15: begin ==== */
/* Troas, the quay, late in the afternoon of the seventh day. Not Chapter Eight's picture: the same harbor years later, seen from another
   place. PLACEHOLDER.
   Called from outside: ART.quay15 only. Reads nothing of the story: the room has one picture.
   One horizon, y 62. No mast or post crosses it: the coaster's cabin stands across it, and her mast rises from the cabin's roof.
   Hotspots (ROOMS.quay15): the harbor 124,58,100,34 · the coaster 8,34,110,72 · jars of oil 236,92,44,22 · lane to Korinna's house
   292,48,28,62 (a lane going up between houses; a tall house of three stories is seen up it). Actors: the oil seller 262,120 ·
   Timothy 170,124 · Trophimus 120,120 · Sopater 60,118 and Secundus 78,124 · Gaius of Derbe 208,116 and Tychicus 226,122 (two pairs,
   never a row of equal gaps) · Luke comes in at 140,128. The jars stand inside the walk strip (y 112..138): they are named in props. */
ART.quay15={w:320,q:12,paint(g){paintQuay15(g)},light:{amb:'#f2dcc2'},draw(g,t){},front(){},props:[{y:114,shape(g){jarsQuay15(g)}}]};
function paintQuay15(g){const r=rng(1505),HZ=62;
  sky(g,320,HZ,['#5a78b0','#a8a8c4','#f0c89a','#f8dca0']);
  g.fillStyle=lg(g,0,HZ,0,104,['#d8b890','#5a7a9c','#34608a']);g.fillRect(0,HZ,320,104-HZ);
  for(let i=0;i<110;i++){const k=r(),y=HZ+1+k*40;R(g,r()*320,y,2+k*8,.5,r()<.5?'rgba(255,226,180,.35)':'rgba(20,40,70,.3)')}
  shipQuay15(g);housesQuay15(g,r);
  R(g,0,102,320,3,'#b4a690');R(g,0,102,320,.6,'#e4d4b8');pave(g,0,105,320,144,'#b0a088',r,{rows:5,step:34,vy:HZ});ao(g,0,105,320,4,'t',.3);
  jarsQuay15(g);
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,210,150,.9)','rgba(160,130,170,.6)']);g.fillRect(0,0,320,144)})}
/* the coaster, moored at the left: her cabin at the stern, to the left, her bow to the right */
function shipQuay15(g){const H='#5e442c';
  poly(g,[8,74,44,80,100,80,118,70,114,104,8,104],H);poly(g,[8,74,44,80,100,80,118,70,117,74,100,84,44,84,8,78],tint(H,.25));
  for(let y=88;y<104;y+=4.5)R(g,8,y,107,.5,tint(H,-.3));
  R(g,10,46,34,34,'#86683f');R(g,10,46,34,1,'#b8935e');R(g,10,57,34,.6,'#5e4428');R(g,28,62,8,12,'#2a1c12');
  R(g,24,0,3,46,'#5a4028');R(g,24,0,1,46,'#8a6a44');
  for(const x of[58,72,86])box15(g,x,72,10,8,'#a08a5e')}
/* the houses at the right, and the lane that goes up between them to a tall house of three stories */
function housesQuay15(g,r){const W='#d2c09c';
  house(g,226,26,66,78,W,r,{patch:1,cracks:3});windowArt(g,240,40,10,11,W,{shut:1});windowArt(g,266,40,10,11,W,{shut:1});
  R(g,292,30,28,74,'#c8b28c');for(const y of[35,51,67]){windowArt(g,298,y,6,7,'#c8b28c',{});windowArt(g,310,y,6,7,'#c8b28c',{})}
  poly(g,[292,104,320,104,320,84,296,84],'#a8987c');for(let y=88;y<104;y+=4)R(g,293,y,27,.5,'rgba(60,46,34,.4)');
  ao(g,292,48,6,56,'l',.4,'#2a2440')}
/* the oil seller's jars, stopped with clay */
function jarsQuay15(g){for(const[x,h]of[[246,19],[260,21],[274,18]]){vessel(g,x,113.6,6,h,'#a4643c','pithos');R(g,x-2.4,113.6-h-1.2,4.8,1.6,'#c8b8a0')}}
/* ==== ART quay15: end ==== */

/* ==== ART upper15: begin ==== */
/* Troas, the upper room on the third story, by night, lit only by its lamps. PLACEHOLDER.
   Called from outside: ART.upper15 only.
   Reads: stage15() (the picture: 'm' the meeting, the listeners look to Paul · 'x' midnight, the window empty, the listeners turned to
   it, some risen · 'a' after, the listeners round the table) and lamps15() = G.l15, the oil in each lamp, 0 to its fill, in the order
   of LAMPS: 0 in the niche (small, 2), 1 at the stairs (small, 2), 2 hanging (middle, 3), 3 by the speaker (middle, 3), 4 on the table
   (large, 4, two spouts). A level is a whole number, but it falls smoothly while Luke sits: paint for 2.4 as well as for 2. At 0 a
   lamp is a guttering spark. Each flame's size and glow follow its level, and so does the light on the people (light). Only the
   flames move.
   Hotspots (ROOMS.upper15): window 40,30,30,34, open to the night, with a wide sill: Eutychus is an ACTOR who sits on it at 55,66 and
   is never painted · hanging lamp 110,34,16,14, hung by two cords that part upward (never one cord from the middle of a beam) · lamp
   by the speaker 166,70,12,10 on a stand 170,80,4,36 whose top is as wide as the lamp and whose foot spreads · table 196,98,60,12 with
   the bread, and the lamp on the table 220,88,16,10 · lamp in the niche 262,50,14,12 (a low wide recess) · stairs 288,66,32,56, the
   head of a stair with a low wall, and the lamp at the stairs 290,74,12,10 on that wall · big jar 8,92,22,30 · stool 80,116,14,12 ·
   the listeners 70,76,180,28, painted, along the back wall: none before a lamp's hotspot, nothing round behind a head.
   Actors: Paul 150,118 (at the table, 226,116, after midnight) · Korinna 38,122 · Luke comes in at 96,126 and sits at 87,130.
   The big jar, the stool and the lamp's stand reach into the walk strip (y 112..138): they are named in props. */
ART.upper15={w:320,q:12,variant:()=>stage15(),paint(g,v){paintUpper15(g,v)},light:()=>lightUpper15(),draw(g,t){drawUpper15(g,t)},front(){},
  props:[{y:122,shape(g){jarUpper15(g)}},{y:126,shape(g){stoolUpper15(g)}},{y:116,shape(g){standUpper15(g)}}]};
const LAMPUpper15=[[269,57],[296,80],[118,43],[172,75],[228,93]];   /* where each lamp's wick is: the foot of its flame */
function paintUpper15(g,v){const r=rng(1506),W='#b8a888';
  plaster(g,0,10,320,94,W,r,{patch:0,cracks:3});
  R(g,0,0,320,10,'#4a3624');for(let x=14;x<320;x+=38){R(g,x,0,7,12,'#6a4c2e');R(g,x,11.4,7,.6,'#2e2014')}
  g.fillStyle=lg(g,0,104,0,144,['#7a6248','#8e7454','#9a7e5c']);g.fillRect(0,104,320,40);for(let y=110;y<144;y+=7)R(g,0,y,320,.5,'rgba(30,20,12,.35)');
  tex(g,'wood',.3,0,104,320,40,'overlay',.6);ao(g,0,104,320,5,'t',.4);
  /* the window, open to the night, with its wide sill */
  R(g,37,27,36,40,tint(W,-.3));g.fillStyle=lg(g,0,30,0,64,['#0e1838','#22305c']);g.fillRect(40,30,30,34);for(const[x,y]of[[46,36],[58,33],[64,42],[50,47],[61,53]])R(g,x,y,.8,.8,'#e8ecff');
  R(g,34,64,42,3.4,tint(W,.2));R(g,34,67.4,42,.8,tint(W,-.4));
  /* the niche: a low wide recess */
  R(g,258,48,22,15,tint(W,-.45));R(g,258,48,22,2,tint(W,-.6));R(g,257,63,24,1.4,tint(W,.15));
  stairsUpper15(g,W);
  /* the bench along the back wall, and the table with the bread */
  R(g,68,96,100,3,'#7a5a38');R(g,68,99,100,5,'#5a4028');R(g,180,96,14,3,'#7a5a38');R(g,180,99,14,5,'#5a4028');
  tableUpper15(g);folkUpper15(g,v);
  /* the lamps themselves: of clay, each with its wick at the place its flame is drawn */
  stroke(g,[112,12,115.4,42],'#8a7a5a',.6);stroke(g,[124,12,120.6,42],'#8a7a5a',.6);clayUpper15(g,118,43,1);
  standUpper15(g);clayUpper15(g,172,75,1);clayUpper15(g,269,57,.8);clayUpper15(g,296,80,.8);
  R(g,219,96.4,18,2.4,'#9a5c34');R(g,219,96.4,18,.6,'#c88a5a');for(const x of[223,233])R(g,x-1.4,93.6,2.8,3,'#a8643a');
  jarUpper15(g);stoolUpper15(g);
  /* the room by itself is dark: the light of the lamps is laid over it as they burn (drawUpper15) */
  lightmap(g,320,'#5e5a7c',()=>{})}
/* the head of the stair, at the right: a low wall, and behind it the dark of the stairwell with the first steps going down */
function stairsUpper15(g,W){poly(g,[303,68,320,66,320,122,303,118],'#1a1410');for(let i=0;i<5;i++)R(g,304,96+i*5,16,.6,'rgba(160,140,110,.4)');
  R(g,288,84,15,34,tint(W,-.12));R(g,288,84,15,1.6,tint(W,.2));R(g,301.4,84,1.6,34,tint(W,-.4))}
function tableUpper15(g){const C='#806040';poly(g,[199,95,253,95,256,100,196,100],tint(C,.18));R(g,196,100,60,3.6,C);R(g,196,100,60,.6,tint(C,.3));R(g,198,103.6,3,6.4,tint(C,-.25));R(g,251,103.6,3,6.4,tint(C,-.25));
  for(const x of[207,245]){oval(g,x,96.6,4.4,1.9,'#a8783e');oval(g,x-.6,96.2,3.4,1.3,'#d0a060')}}
/* a clay lamp with its wick at x,y: the body lies under and behind the wick */
function clayUpper15(g,x,y,k){const C='#a8643a';poly(g,[x-6.5*k,y+3,x-5*k,y+1.4,x+1.4*k,y+1.4,x+2.4*k,y+2.6,x+1*k,y+4.6,x-5*k,y+4.6],C);R(g,x-5*k,y+1.4,6.4*k,.6,'#d89a6a');R(g,x-.6,y+.4,1.2,1.2,'#3a2418')}
/* the stand of the lamp by the speaker: its top as wide as the lamp, its foot spreading */
function standUpper15(g){const C='#6a5030';poly(g,[166,80,178,80,174,87,174,112,177,116,167,116,170,112,170,87],C);R(g,166,80,12,.8,'#a88a58');R(g,170.4,87,.8,25,'#a88a58')}
function jarUpper15(g){vessel(g,19,121.6,10,28,'#a4643c','pithos')}
function stoolUpper15(g){R(g,80,117,14,2.6,'#8a6a44');R(g,80,117,14,.6,'#b8935e');R(g,81,119.6,2,8.4,'#6a4a2c');R(g,91,119.6,2,8.4,'#6a4a2c')}
/* the listeners, painted: m: on the bench and behind the table, looking to Paul; x: turned to the window, some risen; a: round the table */
function folkUpper15(g,v){const C=['#8a6a5a','#6a7a6a','#9a8a6a','#5a6a8a','#a07a5a','#7a6a8a','#8a8070','#6a5a4a'],H=['#3a2a1c','#5a4630','#2a1c14','#8a8a8a'];
  const L=v==='m'?[[76,104,1,0],[90,104,1,0],[104,104,1,0],[136,104,1,0],[186,104,-1,0],[203,96,-1,1],[247,96,-1,1]]:
    v==='x'?[[78,104,-1,0],[92,104,-1,1],[106,104,-1,0],[134,104,-1,1],[186,104,-1,0],[203,96,-1,1],[247,96,-1,1]]:
    [[76,104,1,0],[104,104,1,0],[186,104,1,0],[203,96,1,1],[212,96,1,1],[241,96,-1,1],[250,96,-1,1]];
  L.forEach(([x,y,d,up],i)=>manUpper15(g,x,y,up?27:19,C[i%C.length],d,H[i%H.length]))}
function manUpper15(g,x,y,h,c,d,hair){const u=Math.min(h,26)/5;
  poly(g,[x-u*1.05,y,x+u*1.05,y,x+u*.95,y-h+u*1.6,x+u*.5,y-h+u*1.1,x-u*.5,y-h+u*1.1,x-u*.95,y-h+u*1.6],c);
  poly(g,[x-d*u*1.05,y,x-d*u*.3,y,x-d*u*.35,y-h+u*1.3,x-d*u*.95,y-h+u*1.6],tint(c,-.25));
  oval(g,x-d*u*.16,y-h+u*.52,u*.5,u*.56,hair);oval(g,x+d*u*.14,y-h+u*.62,u*.42,u*.5,'#b8845a')}
/* drawUpper15: each lamp's glow and its flame, as much as it has oil for */
function drawUpper15(g,t){const L=lamps15();LAMPUpper15.forEach(([x,y],i)=>{const v=Math.max(0,L[i]),q=12+v*10;
  pool(g,x,y-2,q,q*.8,'#ffb24a',.1+.07*v);pool(g,x,y-1,4+v*1.6,3+v*1.4,'#ffe6a0',.35+.1*v);
  for(const dx of i===4?[-5,5]:[0])flameUpper15(g,x+dx,y,t+i*370,v)})}
function flameUpper15(g,x,y,t,v){const f=Math.floor(t/110)%3;if(v<.5){R(g,x-.5,y-.5-(f===1?.5:0),1,1,f?'#ff9a3a':'#c85a1c');return}
  const h=1.6+v*1.3+(f===1?.8:f?.4:0),sx=f===2?.4:f?-.2:0;poly(g,[x-1,y+.6,x+1.2,y+.6,x+.9+sx,y-h*.45,x+.2+sx*2,y-h,x-.6,y-h*.4],'#e8581c');poly(g,[x-.4,y+.6,x+.8,y+.6,x+.5+sx,y-h*.3,x+.1+sx,y-h*.7],'#ffb030')}
/* lightUpper15: the light on the people in the room: one lamp of the engine's for each of the five, its reach by its oil */
function lightUpper15(){const L=lamps15();return{amb:'#34304a',lamps:LAMPUpper15.map(([x,y],i)=>[x,y+10,50+Math.max(0,L[i])*24,'#5a4424'])}}
/* ==== ART upper15: end ==== */

/* ==== ART street15: begin ==== */
/* Troas, the street under Korinna's house. PLACEHOLDER.
   Called from outside: ART.street15 only.
   Reads: F.mid. Two pictures: 'n' midnight, before F.mid: dark, with light from the open door and from two lamps people have brought,
   and a knot of people, painted, round a place on the paving at about 190,118: Paul bent low over the young man with his arms about
   him, both small and mostly hidden by the backs of those who stand round. Nothing graphic, no blood, nobody lying in plain sight.
   'd' daybreak, with F.mid: grey-rose light from the right, the same street without the knot. Only the two flames move.
   The tall front of the house, three stories, fills the left two thirds: the window of the upper room 150,6,20,18 in the third story,
   the door at street level 120,66,30,44. The street runs down to the right, to the sea, whose level, y 64, is the scene's horizon.
   Hotspots (ROOMS.street15): the street 216,36,76,70 · window 150,6,20,18 · way to the harbor 296,50,24,64.
   Actors, at daybreak only: Eutychus 196,120 with two of his people at 182,124 and 212,122 · Korinna 132,118 · Timothy 250,124 ·
   Luke comes in at 160,128. By night nobody is an actor. */
ART.street15={w:320,q:12,variant:()=>F.mid?'d':'n',paint(g,v){paintStreet15(g,v)},light:()=>F.mid?{amb:'#dcccd0'}:{amb:'#3a3a56'},draw(g,t){drawStreet15(g,t)},front(){}};
const NIGHTStreet15=[[166,108],[216,110]];   /* the two lamps people have brought: where each flame stands */
function paintStreet15(g,v){const r=rng(1507),n=v==='n',HZ=64,W='#cdbc9c';
  sky(g,320,HZ+2,n?['#0a1030','#141c44','#1c2650']:['#8a8cae','#c8a8ac','#f0c8a8','#f8dcb8']);
  if(n)for(let i=0;i<26;i++)R(g,216+r()*104,2+r()*40,.8,.8,'#dfe4ff');
  R(g,286,HZ,34,46,n?'#141e3c':'#9aa8bc');R(g,286,HZ,34,.6,n?'#2a3660':'#e8dcd0');
  house(g,214,40,44,70,'#c4b292',r,{patch:1});house(g,258,56,38,54,'#bca888',r,{patch:1});
  plaster(g,0,0,214,110,W,r,{patch:2,cracks:5});R(g,0,34,214,1,tint(W,-.25));R(g,0,62,214,1,tint(W,-.25));R(g,212.4,0,1.6,110,tint(W,-.35));
  for(const[x,y]of[[24,9],[64,9],[104,9],[190,9],[24,40],[64,40],[104,40],[154,40],[190,40],[30,76],[70,76],[176,76]])windowArt(g,x,y,12,13,W,{shut:1});
  windowArt(g,150,6,20,18,W,{dark:n?'#2a2218':'#3a2e22'});
  R(g,117,63,36,47,tint(W,-.3));R(g,120,66,30,44,n?'#e8b060':'#2a1e14');if(!n)boards(g,121,67,28,43,7,'#6e4e2e',r);
  pave(g,0,110,320,144,'#a89c88',r,{rows:5,step:30,vy:HZ,vx:300});ao(g,0,110,320,4,'t',.35);
  if(n){knotStreet15(g);lightmap(g,320,'#30304e',l=>{pool(l,135,112,46,22,'#ffc070',.9);pool(l,135,90,20,26,'#ffd090',.9);for(const[x,y]of NIGHTStreet15)pool(l,x,y+2,32,24,'#ffb860',.8)})}
  else comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(120,120,160,.7)','rgba(255,200,170,.9)']);g.fillRect(0,0,320,144)})}
/* the knot of people round the place on the paving: those at the back first, then Paul, bent low, then the backs of those in front */
function knotStreet15(g){const C=['#7a6a5a','#5a6a7a','#8a7a5a','#6a5a6a','#8a6a5a','#5a6a5a','#7a7a6a'],H=['#3a2a1c','#5a4630','#2a1c14','#8a8a8a'];
  [[176,114,1],[190,112,1],[204,114,-1]].forEach(([x,y,d],i)=>backStreet15(g,x,y,26,C[i],d,H[i]));
  poly(g,[183,119,186,111.4,192,110,197,113,198,119],'#6e4a2e');oval(g,187.4,111,2.2,2,'#6e6660');
  [[168,120,1],[180,124,1],[191,126,1],[202,124,-1],[213,121,-1]].forEach(([x,y,d],i)=>backStreet15(g,x,y,29,C[i+2],d,H[(i+1)%4]));
  for(const[x,y]of NIGHTStreet15){R(g,x-3,y+1,6,2.4,'#a8643a');R(g,x-3,y+1,6,.6,'#d89a6a')}}
function backStreet15(g,x,y,h,c,d,hair){const u=h/5;
  poly(g,[x-u*1.05,y,x+u*1.05,y,x+u*.95,y-h+u*1.6,x+u*.5,y-h+u*1.1,x-u*.5,y-h+u*1.1,x-u*.95,y-h+u*1.6],c);
  poly(g,[x+d*u*.3,y,x+d*u*1.05,y,x+d*u*.95,y-h+u*1.6,x+d*u*.35,y-h+u*1.3],tint(c,-.25));oval(g,x,y-h+u*.56,u*.52,u*.58,hair)}
function drawStreet15(g,t){if(!F.mid)NIGHTStreet15.forEach(([x,y],i)=>flame(g,x-.5,y,t+i*290))}
/* ==== ART street15: end ==== */

/* ---- the inventory ---- */
Object.assign(ICON,{
  reed15(g){stroke(g,[4,20,20,5],'#8a7a4a',2.2);stroke(g,[4.6,19.4,19.6,5.2],'#d8c890',.8);stroke(g,[9,15.4,10.6,13.8],'#5a4a2a',.6);stroke(g,[14,10.6,15.6,9],'#5a4a2a',.6)},
  shell15(g){poly(g,[4,11,7,6.4,12,4.6,17,6.4,20,11,12,20],'#eadfcf');for(const d of[-6,-3,0,3,6])stroke(g,[12,19,12+d,7+Math.abs(d)*.4],'#b89a84',.6);poly(g,[10,18,14,18,12,20.6],'#c8b49c')},
  jug15(g){vessel(g,11,21,7,15,'#a4643c','jug',{noShadow:1});stroke(g,[15,10,20,7.6],'#a4643c',1.6);stroke(g,[6.4,9.6,4,12,6,15.6],'#8a5030',1.4)}});

/* ============ PEOPLE ============ */
/* Luke is the Luke of Chapter Eight, some six years on: the same dress, a little grey in his hair. Timothy is Chapter Fourteen's. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
Object.assign(LOOK,{
  luke15:{skin:'#c4946a',hair:'#443428',beard:'#483a2e',grey:'#7a7068',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2e2018',ph:1100},
  tert15:{skin:'#c08c5c',hair:'#3a2a1a',beard:'#3a2a1a',shortBeard:1,tunic:'#d8ccb0',belt:'#5a3a20',brow:'#2a1a12',slim:1,ph:500},
  host15:HIM('#b88a62','#7a7068','#ece4d0','#6a4a5a',{receding:1,ph:900}),
  tim15:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  arist15:{skin:'#bc8a60',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#96a488',cloak:'#5a4e3e',belt:'#3a2818',trim:'#6a765c',brow:'#2a1c12',ph:1500},
  troph15:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#c8b490',cloak:'#3f5f86',belt:'#4a3a24',brow:'#1a1210',ph:300},
  tych15:{skin:'#c69870',hair:'#5a4026',beard:'#5a4026',tunic:'#b8a070',cloak:'#7a5a40',belt:'#3a2a1a',brow:'#3a2a1a',ph:2100},
  sop15:{skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',fullBeard:1,tunic:'#a89c7c',cloak:'#6a5a4a',belt:'#4a3a24',brow:'#2a1a12',ph:700},
  sec15:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#8a9a8a',belt:'#3a2a1a',slim:1,brow:'#1a1210',ph:2500},
  gaiusd15:{skin:'#a8703f',hair:'#3a2616',beard:'#3a2616',tunic:'#c4a878',cloak:'#8a3a2a',belt:'#3a2414',brow:'#2a1a12',ph:1300},
  nik15:HIM('#c69870','#4a3a2c','#e6dec8','#5a6a4a',{shortBeard:1,ph:1900}),
  mikon15:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#9a7a5a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:400},
  kor15:{skin:'#c8a078',veil:'#6a5a7a',tunic:'#d8c8a0',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,brow:'#3a2414',ph:1200},
  seller15:{skin:'#b47e52',hair:'#6a6a6a',beard:'#6a6a6a',receding:1,tunic:'#b8a070',apron:'#5a4a28',belt:'#2e2016',brow:'#4a4a4a',ph:200},
  eut15:{skin:'#c89868',hair:'#3a2616',tunic:'#9aa8b8',belt:'#4a3a24',slim:1,brow:'#2a1a12',ph:1600},
  kin15a:{skin:'#b8845a',hair:'#5a4026',beard:'#5a4026',tunic:'#a89070',cloak:'#5a5a6a',belt:'#3a2a1a',brow:'#3a2a1a',ph:800},
  kin15b:{skin:'#c8a078',veil:'#8a6a4a',tunic:'#c8b090',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,brow:'#3a2414',ph:2200}});
const LK=actor('luke15','Luke','#c8e8c0',126),TE=actor('tert15','Tertius','#e0d8b0',132),GA=actor('host15','Gaius','#d8c8a8',104),TI=actor('tim15','Timothy','#b8e0b0',146),
  AR=actor('arist15','Aristarchus','#d0d8b8',112),TR=actor('troph15','Trophimus','#c8d8e8',124),TY=actor('tych15','Tychicus','#d8c8e0',116),SO=actor('sop15','Sopater','#e0d0b8',108),
  SC=actor('sec15','Secundus','#c8e0d8',120),GD=actor('gaiusd15','gaius_of_derbe','#e8d8c0',114),NK=actor('nik15','Nikandros','#e0c8b0',100),MI=actor('mikon15','Mikon','#d8b890',92),
  KO=actor('kor15','Korinna','#f0c8d8',196),SE=actor('seller15','oil_seller','#e8d0a0',110),EU=actor('eut15','Eutychus','#c8e0f0',168),
  KA=actor('kin15a','brothers_of_troas','#d8d0c0',118),KB=actor('kin15b','brothers_of_troas','#e8c8d0',190);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 20:1-12, told by the narrator in paraphrase, each line with its reference. None of it is put into a mouth as a quotation,
   and none of it stands in quotation marks (CONTRIBUTING section 1). The two lines of 20:1 have the wording of Chapter Fourteen, where
   the verse is told first. The German lines were written from the German edition. */
const TOLD={v1a:'paul_sent_for_the_disciples_acts_20_1',v1b:'he_took_his_leave_acts_20_1',v2:'through_those_parts_acts_20_2',v3a:'three_months_went_by_acts_20_3',
 v3b:'he_was_about_to_sail_acts_20_3',v4a:'with_him_went_acts_20_4',v4b:'gaius_timothy_tychicus_trophimus_acts_20_4',v5:'they_went_ahead_of_us_acts_20_5',
 v6:'we_sailed_from_philippi_acts_20_6',v7a:'first_day_of_the_week_acts_20_7',v8:'quite_a_few_lamps_acts_20_8',v7b:'his_talk_went_on_until_midnight_acts_20_7',
 v9a:'a_young_man_named_eutychus_acts_20_9',v9b:'he_fell_from_the_third_story_acts_20_9',v10:'paul_went_down_acts_20_10',v11a:'paul_went_up_again_acts_20_11',
 v11b:'he_talked_on_until_daybreak_acts_20_11',v12:'the_boy_was_led_away_alive_acts_20_12'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+T(TOLD[k]).length*62),low});
const fast=()=>G.speedAll>200;   /* the playtest plays at speed */

/* ============ WHAT IS PLAYED: the tables ============ */
/* PHOEBE: what Tertius asks, the line that answers it (ok) with what he says to it (yes), and two lines that are true and beside the
   point (no), each with his answer; a line that was tried drops out. Paul never lies: every line on offer is true. */
const PHOEBE=[
 {f:'ph1',q:'first_who_is_she',ok:'she_is_our_sister_a_minister_in_cenchreae',yes:'that_they_can_hold_on_to',
  no:[['cenchreae_is_corinths_harbor_to_the_east','that_tells_them_where_not_who'],['she_has_a_long_voyage_ahead','so_has_every_sailor']]},
 {f:'ph2',q:'then_what_do_you_ask_of_them',ok:'welcome_her_and_help_her',yes:'a_door_and_a_hand',
  no:[['that_they_read_the_letter_aloud','they_will_but_that_is_for_the_letter'],['that_they_greet_prisca_and_aquila','that_is_in_already']]},
 {f:'ph3',q:'and_why_should_they',ok:'she_has_stood_up_for_many_and_for_me',yes:'then_they_owe_her_a_welcome',
  no:[['because_i_ask_it','most_of_them_have_never_seen_you'],['because_rome_is_a_big_city','true_but_it_says_nothing_of_her']]}];
/* WT: the four weights the house has: what each is worth, and the number letters cut into it (alpha 1, gamma 3, theta 9, kappa zeta 27).
   ROUND: the three bags: what each weighs, the number letters on its letter (iota beta 12, kappa gamma 23, iota zeta 17), who seals it.
   The amounts are invented. A weight laid beside the bag takes away from what lies across from it: 23 is 27 less 3 and 1. */
const WT=[{id:'a',v:1,name:'weight_a',m:'Α'},{id:'g',v:3,name:'weight_g',m:'Γ'},{id:'th',v:9,name:'weight_th',m:'Θ'},{id:'kz',v:27,name:'weight_kz',m:'ΚΖ'}];
const ROUND=[{f:'s1',bag:12,m:'ΙΒ',bagName:'bag_of_galatia',letter:'letter_of_galatia',seal:'gaius_of_derbe_pressed_his_seal',hint:'hint_scale_g2'},
 {f:'s2',bag:23,m:'ΚΓ',bagName:'bag_of_achaia',letter:'letter_of_achaia',seal:'nikandros_pressed_his_seal',hint:'hint_scale_a2'},
 {f:'s3',bag:17,m:'ΙΖ',bagName:'bag_of_macedonia',letter:'letter_of_macedonia',seal:'aristarchus_pressed_his_seal',hint:'hint_scale_m2'}];
const WLOOK={t:'weight_look_tray',r:'weight_look_right',l:'weight_look_left'};
/* WIT15: the men who stand behind the storeroom table, from the left, as hotspots along the top of the close view (y 0..22) */
const WIT15=[{a:'tim15',x:2,w:42,look:'timothy_look'},{a:'gaiusd15',x:46,w:42,look:'gaius_of_derbe_look'},{a:'nik15',x:90,w:42,look:'nikandros_look'},
 {a:'arist15',x:188,w:42,look:'aristarchus_look'},{a:'sop15',x:232,w:42,look:'sopater_look'},{a:'sec15',x:276,w:42,look:'secundus_look'}];
/* PEB15: the pebbles of the plan in the sand: id, x, y */
const PEB15=[['cenchreae',86,104],['beroea',96,56],['thessalonica',128,44],['philippi',176,34],['troas',236,62],['ephesus',248,100]];
const PEBNAME={cenchreae:'pebble_cenchreae',beroea:'pebble_beroea',thessalonica:'pebble_thessalonica',philippi:'pebble_philippi',troas:'pebble_troas',ephesus:'pebble_ephesus'};
/* LAMPS: the five lamps of the upper room: its name, how much it holds, and what Luke says of its size. START: the oil in each as the
   evening begins. AFTER[n]: the oil in each after n sittings, as the reference solution leaves them: a safe-point code restores these,
   with a full jug (an empty one before the first sitting). */
const LAMPS=[{k:'lamp_in_the_niche',cap:2,look:'small_lamp_look'},{k:'lamp_at_the_stairs',cap:2,look:'small_lamp_look'},{k:'hanging_lamp',cap:3,look:'middle_lamp_look'},
 {k:'lamp_by_the_speaker',cap:3,look:'middle_lamp_look'},{k:'lamp_on_the_table',cap:4,look:'large_lamp_look'}];
const AFTER=[[2,1,3,2,3],[1,0,2,1,2],[1,1,1,0,1],[1,0,0,1,0]],MEAS=['nothing_left','one_measure','two_measures','three_measures','four_measures'];
const FLAGS=['ph1','ph2','ph3','s1','s2','s3','warned','way','shell','awl','troas','oil','t1','t2','t3','t4','mid'];

/* ============ HELPERS ============ */
/* run15: a script started from a hotspot already runs inside a cutscene (act, in index.html); started from anywhere else it starts one */
const run15=fn=>G.busy?fn():cut(fn);
/* sc15: the balance as it stands (G.sc15): the round, and where each weight lies. A code restores the round with the weights on the board. */
const sc15=()=>G.sc15||(G.sc15={round:Math.min(2,['s1','s2','s3'].filter(k=>F[k]).length),w:{a:'t',g:'t',th:'t',kz:'t'}});
/* sat: how many sittings Luke has sat through. lamps15: the oil in the five lamps (G.l15), and with it the oil in the jug (G.j15). At
   midnight every lamp is burning its last; after it Korinna has filled them all. */
const sat=()=>['t1','t2','t3','t4'].filter(k=>F[k]).length;
function lamps15(){if(!G.l15){const n=sat();G.l15=n<4?AFTER[n].slice():stage15()==='a'?LAMPS.map(l=>l.cap):[0,0,0,0,0];G.j15=n&&n<4?3:0}return G.l15}
/* stage15: which picture the upper room shows: the meeting, midnight (the window empty), or after */
const stage15=()=>G.x15||(F.mid?'a':'m');
function show15(room,x,y,dir){place15(room);const e=ENT[room];enterRoom(room,x!=null?x:e[0],y!=null?y:e[1],dir||e[2]);codeBtn()}
async function goto15(room,x,y,dir){await fade(1,300);show15(room,x,y,dir);await fade(0,300)}

/* ---- the travel map ---- */
/* The shared map (shared/map.js) has no waypoints for the sea between Ephesus and Troas, nor for the land road between Corinth and
   Beroea, and it is not touched while the pictures of Chapters One to Fourteen are being reworked (issue #75). So this chapter gives
   the two ways itself, as longitude and latitude, and draws them the way the map draws its own legs (see path and journey there):
   when the map may be changed again, they move to its VIA table and open15 and go15 become a plain journey.
   From Ephesus to Troas Acts names no way at all (he was at Troas: 2 Corinthians 2:12, 13): the line shows open water, west of Chios
   and of Lesbos. From Corinth the road keeps to the land: over the isthmus, through Boeotia, round the head of the Malian gulf and
   up through Thessaly; between the name of Achaia and the shore of that gulf it has a pixel of room, and keeps to it.
   LAB15: where the names stand, clear of these roads. */
const WAY15={'ephesus-troas':[26.9,37.93,26.3,37.96,25.75,38.1,25.62,38.6,25.66,39.1,25.86,39.5],
  'corinth-beroea':[23.14,37.99,23.36,38.12,23.3,38.36,23.13,38.56,23.06,38.69,23.0,38.745,22.9,38.765,22.8,38.785,22.62,38.86,22.5,38.93,22.42,39.1,22.4,39.5,22.33,40.1]},
 LAB15={troas:{lab:'r',dy:0},philippi:{lab:'t',dx:8},thessalonica:{lab:'t',dx:-14}},
 ROAD_A=[['ephesus','troas'],['troas','samothrace'],['samothrace','neapolis'],['neapolis','philippi'],['philippi','thessalonica'],['thessalonica','beroea'],['beroea','corinth']],
 ROAD_B=[['corinth','beroea'],['beroea','thessalonica'],['thessalonica','philippi'],['philippi','neapolis'],['neapolis','samothrace'],['samothrace','troas']];
function dots15(a,b,via){const M=SHARED.map,PL=M.places,[ox,oy]=M.window(),A=PL.corinth.at,B=PL.troas.at,[ax,ay]=M.where('corinth'),[bx,by]=M.where('troas'),
    xy=(lon,lat)=>[ax+ox+(lon-A[0])*(bx-ax)/(B[0]-A[0]),ay+oy+(lat-A[1])*(by-ay)/(B[1]-A[1])],raw=[xy(...PL[a].at)];
  for(let i=0;i<via.length;i+=2)raw.push(xy(via[i],via[i+1]));raw.push(xy(...PL[b].at));
  const out=[];for(let i=0;i<raw.length-1;i++){const[x0,y0]=raw[i],[x1,y1]=raw[i+1],p0=raw[i-1]||raw[i],p3=raw[i+2]||raw[i+1];
    for(let k=0;k<12;k++){const t=k/12,t2=t*t,t3=t2*t,c=(u0,u1,u2,u3)=>.5*(2*u1+(-u0+u2)*t+(2*u0-5*u1+4*u2-u3)*t2+(-u0+3*u1-3*u2+u3)*t3);out.push([c(p0[0],x0,x1,p3[0]),c(p0[1],y0,y1,p3[1])])}}
  out.push(raw[raw.length-1]);const dots=[];let s=0;
  for(let i=1;i<out.length;i++){const[x0,y0]=out[i-1],[x1,y1]=out[i],d=Math.hypot(x1-x0,y1-y0);for(;s<=d;s+=2.6)dots.push([x0+(x1-x0)*(d?s/d:0),y0+(y1-y0)*(d?s/d:0)]);s-=d}
  return dots}
/* open15: the map, with the whole of a road laid out on it and none of it drawn yet. go15: so many of its legs draw themselves. */
async function open15(route){const M=await need('map'),S=M.state;await fade(1,450);
  await M.journey(route,{instant:1,view:'aegean',labels:LAB15});
  for(const L of S.legs){const w=WAY15[L.a+'-'+L.b],v=WAY15[L.b+'-'+L.a];if(w)L.dots=dots15(L.a,L.b,w);
    else if(v){const q=[];for(let i=v.length-2;i>=0;i-=2)q.push(v[i],v[i+1]);L.dots=dots15(L.a,L.b,q)}L.k=0}
  S.seen=new Set([route[0][0]]);S.pulse=route[0][0];codeBtn();await fade(0,550);M.sting();await wait(fast()?60:700)}
async function go15(n){const M=SHARED.map,S=M.state;
  for(const L of S.legs.filter(L=>L.k<1).slice(0,n)){S.pulse=L.a;await tween(fast()?80:Math.max(600,L.dots.length*85),k=>{L.k=k});S.seen.add(L.b);M.arrive();S.pulse=L.b;await wait(fast()?30:350)}}

/* ============ THE STORY ============ */
/* the opening: the road from Ephesus through Macedonia to Greece (Acts 20:1-3), told over the map; then the house of Gaius in Corinth */
async function start15(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(15);G.end={};
    try{await open15(ROAD_A);await tell('v1a',null,1);await tell('v1b',null,1);await go15(4);await go15(3);await tell('v2',null,1);await tell('v3a',null,1)}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;setScore(MUSIC);show15('gaius15');drawInv();await fade(0,700);
    await narr('in_corinth_he_stayed_with_gaius',{dur:8000});
    await say(TE,'tertius_that_is_the_last_greeting',{to:P});
    await say(P,'one_thing_is_missing_phoebe',{to:TE});
    await say(TE,'nobody_in_rome_knows_her',{to:P});codeBtn()},true)}

/* ---- carried to Rome (Romans 16:1, 2) ---- */
async function phoebe(){if(F.ph3)return say(TE,'tertius_talk_after',{to:P});
  for(const r of PHOEBE){if(F[r.f])continue;await say(TE,r.q,{to:P});let no=r.no.slice();
    for(;;){const opts=[r.ok,...no.map(n=>n[0])],line=opts[await choose(opts)];await say(P,line,{to:TE});
      if(line===r.ok){await say(TE,r.yes,{to:P});F[r.f]=1;codeBtn();break}
      const n=no.find(x=>x[0]===line);await say(TE,n[1],{to:P});no=no.filter(x=>x!==n)}}
  await say(TE,'it_is_done_i_will_let_the_ink_dry',{to:P});await say(P,'then_the_gift_timothy_is_waiting',{to:TE});codeBtn()}
/* the hidden treasure: Tertius's own line of greeting, tried out on a spare tablet (Romans 16:22) */
async function spare(){await say(P,'spare_tablet_look');await say(P,'put_it_in_tertius_it_is_true',{to:TE});treasure()}
async function letter(){await say(P,'the_letter_look');return say(P,'i_asked_tertius_whether_my_sentences',TH)}

/* ---- the scale: in the sight of men (2 Corinthians 8:20, 21) ---- */
async function toScale(){if(!F.ph3)return say(P,'first_the_letter');if(F.s3)return goto15('cen15');
  await goto15('scale15');
  if(!G.si15){G.si15=1;await narr('the_gift_is_for_the_poor_among_the_holy_ones',{dur:7500});await say(P,'i_do_not_touch_the_silver',{to:null});
    await say(TI,'timothy_each_bag_has_its_letter',{to:P});await say(TI,'you_set_the_weights_paul',{to:P});await openRound()}}
/* what is said as a round begins */
async function openRound(){const k=sc15().round;
  if(k===0)return say(TI,'timothy_galatia_first',{to:P});
  if(k===1){await say(NK,'nikandros_achaia_next',{to:P});return say(P,'four_weights_are_all_we_have',TH)}
  await say(AR,'aristarchus_macedonia_last',{to:P});return say(P,'i_know_and_they_gave_themselves_first',{to:AR})}
/* a weight is moved: from the board into the right pan, from there into the left, beside the bag, and from there back to the board;
   picked up, it goes back to the board at once. Paul handles the weights only: never a bag, never the silver. */
function moveWeight(id,home){if(F.s3)return;const s=sc15(),p=s.w[id];if(home&&p==='t')return say(P,T(WLOOK.t,{m:WT.find(w=>w.id===id).m}));
  s.w[id]=home?'t':p==='t'?'r':p==='r'?'l':'t';SFX.click();if(AU.ctx)tone({f:1500+Math.random()*300,d:.07,type:'triangle',v:.04})}
const tiltLine=()=>{const t=tiltScale15();return t>0?'left_pan_is_down':t<0?'right_pan_is_down':'beam_is_level'};
/* the beam is read: level, and bag and letter agree; the bag is sealed, the weights go back to the board, and the next bag is laid on.
   (A code made while the last words in the storeroom are said holds s3 in this room: then the way on is the way out, outScale.) */
const outScale=()=>F.s3?goto15('cen15'):say(P,'not_before_all_three_are_weighed');
async function weigh(){if(F.s3)return outScale();const s=sc15(),R0=ROUND[s.round];
  if(tiltScale15()){await say(TI,'timothy_not_level_yet',{to:P});return say(P,tiltLine(),TH)}
  await say(TI,'it_agrees_seal_it',{to:null});SFX.good();await narr(R0.seal,{dur:5200});F[R0.f]=1;for(const w of WT)s.w[w.id]='t';
  if(s.round<2){s.round++;s.ang=0;codeBtn();return openRound()}
  await say(P,'three_bags_three_letters_all_agree',{to:null});await narr('the_chest_was_closed_and_sealed',{dur:5600});await say(P,'to_cenchreae_then_the_ship_for_syria',{to:null});
  G.sc15=null;await goto15('cen15')}
async function letterLook(){await say(P,T('letter_look',{m:ROUND[sc15().round].m}));if(!G.nm15){G.nm15=1;await say(P,'letters_are_numbers',TH)}}

/* ---- Cenchreae: the word of a brother (Acts 20:3) ---- */
async function warn(){if(F.warned)return say(MI,'mikon_talk_after',{to:P});
  await say(MI,'mikon_paul_a_word',{to:P});await say(MI,'mikon_men_have_been_asking',{to:P});await say(MI,'mikon_i_carry_loads_i_hear_things',{to:P});
  await say(P,'thank_you_mikon_you_did_right',{to:MI});await say(P,'then_not_this_ship',{to:MI});
  await tell('v3b');
  await say(TI,'timothy_then_which_way',{to:P});await say(P,'let_me_lay_it_out_in_the_sand',{to:TI});
  F.warned=1;addItem('reed15',1);addItem('shell15',1);addItem('awl15',1);codeBtn()}
async function toSand(){if(!F.warned)return say(P,'strip_of_sand_look');
  await goto15('sand15');
  if(!G.sn15){G.sn15=1;await say(P,'here_is_greece_here_is_asia',{to:null});await say(P,'three_things_to_settle',{to:null})}}

/* ---- the other road: a plan in the sand (Acts 20:3-6) ---- */
/* Three things are set, in this order: the way (the reed, on the road north), where the seven wait with the chest (the shell, on the
   pebble for Troas), and where Paul himself stays over the festival (his awl, on the pebble for Philippi). */
async function onRoad(item,north){if(item!=='reed15')return false;if(F.way)return say(P,'that_is_settled_already');
  if(!north)return say(P,'not_by_the_ship_they_are_watching');
  F.way=1;SFX.pick();await say(P,'by_land_through_macedonia',{to:null});await say(AR,'aristarchus_beroea_thessalonica_on_the_road',{to:P});codeBtn()}
async function onPebble(id,item){
  if(item==='shell15'){if(!F.way)return say(P,'draw_the_way_first');
    if(id==='troas'){F.shell=1;delItem('shell15');SFX.pick();await say(P,'troas_a_harbor_and_brothers',{to:null});await say(TR,'trophimus_tychicus_and_i_know_that_coast',{to:P});codeBtn();return}
    if(id==='ephesus'){await say(P,'not_ephesus_the_uproar_is_not_forgotten',{to:null});return say(TR,'trophimus_my_own_city_and_he_is_right',{to:null})}
    if(id==='cenchreae')return say(P,'not_cenchreae_that_is_where_they_look');
    await say(P,'too_near_the_chest_should_be_across',{to:null});return say(TI,'timothy_the_chest_where_they_look_for_you',{to:P})}
  if(item==='awl15'){if(!F.way)return say(P,'draw_the_way_first');if(!F.shell)return say(P,'the_shell_first');
    if(id==='philippi'){F.awl=1;delItem('awl15');SFX.pick();await say(P,'philippi_then_across',{to:null});await say(TI,'timothy_luke_is_in_philippi',{to:P});return planDone()}
    if(id==='troas')return say(P,'not_troas_yet_i_come_after');
    if(id==='beroea'||id==='thessalonica')return say(P,'it_is_on_the_road_but_no_harbor');
    return say(P,'i_am_not_staying_here')}
  return false}
/* the plan is laid; the journey is told over the map (Acts 20:4-6), and from the quay of Troas on Luke is played.
   (A code made while the plan's last words are said holds all three settled in this room: then the way back to the quay, outSand, goes on.) */
const outSand=()=>F.awl?planDone():say(P,'not_before_the_plan_is_laid');
async function planDone(){await say(P,'that_is_the_plan',{to:null});await say(AR,'aristarchus_a_long_way_round',{to:P});await say(P,'a_long_way_and_we_arrive',{to:AR});
  try{await open15(ROAD_B);await go15(3);await tell('v4a',null,1);await tell('v4b',null,1);await tell('v5',null,1);await go15(3);await tell('v6',null,1)}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.troas=1;show15('quay15');drawInv();await fade(0,700);
  await say(LK,'five_days_for_a_crossing_of_two',TH);
  await say(TI,'timothy_luke_tonight_everyone_comes',{to:LK});await say(TI,'timothy_she_asks_for_oil',{to:LK});await say(LK,'gladly_i_know_lamps',{to:TI});codeBtn()}

/* ---- Troas, the quay ---- */
async function oil(){if(F.oil)return say(SE,'seller_talk_after',{to:LK});
  await say(LK,'oil_for_korinnas_house',{to:SE});await say(SE,'seller_the_big_jar_went_up_at_noon',{to:LK});await say(SE,'seller_that_many_lamps',{to:LK});await say(LK,'nobodys_rich',{to:SE});
  F.oil=1;addItem('jug15');codeBtn()}
async function trophimus(){G.tr15=(G.tr15||0)+1;return say(TR,G.tr15%2?'trophimus_luke_we_found_a_roof':'trophimus_seven_days_and_nobody_asked',{to:LK})}
async function toUpper(){if(!F.oil)return say(LK,'not_without_the_oil');
  await fade(1,400);show15('upper15');await fade(0,600);
  if(!G.up15){G.up15=1;await tell('v7a');await tell('v8');
    await say(KO,'korinna_keep_them_all_burning',{to:LK});await say(KO,'korinna_three_measures_at_a_time',{to:LK});await say(LK,'five_lamps_one_jug',TH)}}

/* ---- oil and hours (Acts 20:7, 8) ---- */
/* Luke sits and listens four times. A sitting burns one measure in every lamp. Before he sits, every lamp must hold a measure, and the
   jug must be empty; after each of the first three sittings Korinna fills the jug with three measures. A measure may be poured only
   where a way is left to bring all five lamps through the sittings still to come: canLast tries every way of pouring what the jug
   holds and of sitting on, so that there is never a dead end, and never a lamp that goes out. */
function canLast(l,j,n,memo){if(n>=4)return true;memo=memo||{};const key=l.join('')+'/'+j+n;if(key in memo)return memo[key];let ok=false;
  if(j>0){for(let i=0;i<5&&!ok;i++)if(l[i]<LAMPS[i].cap){const m=l.slice();m[i]++;ok=canLast(m,j-1,n,memo)}}
  else ok=l.every(x=>x>=1)&&canLast(l.map(x=>x-1),n<3?3:0,n+1,memo);
  return memo[key]=ok}
async function pour(i){const l=lamps15();if(l[i]>=LAMPS[i].cap)return say(LK,'it_is_full_more_would_run_over',TH);if(!G.j15)return say(LK,'the_jug_is_empty',TH);
  const m=l.slice();m[i]++;if(!canLast(m,G.j15-1,sat()))return say(LK,'poured_here_another_dies',TH);
  l[i]++;G.j15--;if(AU.ctx){noise({d:.3,v:.05,f:1400,q:1.2});tone({f:520,to:760,d:.3,type:'sine',v:.02})}codeBtn();return say(LK,'i_pour_one_measure',TH)}
const lampLook=i=>{const v=Math.round(lamps15()[i]);return say(LK,v<1?'it_is_burning_its_last':T(LAMPS[i].look,{n:T(MEAS[v])}))};
async function sit(){const l=lamps15(),n=sat();if(n>=4)return F.mid?undefined:midnight();const dry=l.findIndex(x=>x<1);
  if(dry>=0)return say(LK,T('i_cant_sit_lamp_is_dying',{lamp:T(LAMPS[dry].k)}),TH);
  if(G.j15)return say(LK,'i_cant_sit_oil_in_jug',TH);
  place(LK,'upper15',87,130,1);LK.seat=1;
  /* while he sits and the narrator tells, a measure burns away in every lamp */
  const from=l.slice(),burn=tween(fast()?80:5200,k=>{G.l15=from.map(v=>v-k)});
  if(!n)await narr('i_sat_down_and_listened',{dur:3200});
  if(n<3)await narr(['paul_spoke_on_1','paul_spoke_on_2','paul_spoke_on_3'][n],{dur:4600});else await tell('v7b');
  await burn;G.l15=from.map(v=>v-1);F['t'+(n+1)]=1;
  if(n<3){G.j15=3;await narr('korinna_filled_the_jug',{dur:3800});LK.seat=0;codeBtn();return}
  return midnight()}
/* Eutychus sits high in the picture, and a line of several rows has no room over his head: what he says in the window stands at the
   head of the view, as the line of somebody outside the picture does. EUV is his voice there: it is in no room, and his mouth moves
   with it. Luke's lines turn the two to each other. */
const EUV={color:EU.color,pitch:EU.pitch,name:'Eutychus',room:null,x:0,y:0,get talk(){return EU.talk},set talk(v){EU.talk=v}};
async function eutychus(){if(G.eu15)return say(EUV,'eutychus_talk_again',{to:LK});G.eu15=1;
  await say(LK,'you_have_the_best_seat',{to:EU});await say(EUV,'eutychus_i_came_straight_from_work',{to:LK});await say(LK,'what_is_your_name',{to:EU});await say(EUV,'eutychus_my_name',{to:LK})}

/* ---- midnight (Acts 20:9-12): told, and nobody is played ---- */
/* The young man is still in the window while his sleep is told. Then the picture is the same room with the window empty, and the fall is
   told: it is never drawn, and it makes no sound. The music is silent from midnight until Paul has gone up again.
   While the street is shown by night Luke stays where he was, in the upper room, and is not seen: so a code made at any moment of this
   (t4 without mid, and the upper room) restores the room at midnight, every lamp burning its last, and the stool leads on from there
   (see sit). */
async function midnight(){AU.mood='none';AU.amb={};
  await tell('v9a');
  await fade(1,500);G.x15='x';show15('upper15',92,122,-1);await fade(0,700);
  await tell('v9b');
  await fade(1,700);G.x15=null;show15('street15');LK.room='upper15';await fade(0,800);
  await tell('v10');
  await fade(1,700);G.x15='a';G.l15=null;show15('upper15',180,126,1);await fade(0,800);
  await tell('v11a');await tell('v11b');
  await fade(1,800);G.x15=null;F.mid=1;show15('street15');await fade(0,900);
  await tell('v12');codeBtn()}

/* ---- daybreak ---- */
async function leave(){await say(LK,'a_place_and_a_day',TH);
  endScreen({title:'until_daybreak_2',text:'until_daybreak_end',based:'based_on_acts_20_1_12',go:'click_to_return_to_the_title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}

/* ============ ROOMS ============ */
/* BOTH: Paul and Luke act on a thing or a person through the same handlers: whoever is played says the line (see act, in index.html) */
const BOTH=h=>{h.as={luke15:h};return h};
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.gaius15={space:1.1,walk:[16,304,112,138],mood:'house',amb:{wind:.12},hs:[
  {name:'window_to_the_court',x:20,y:34,w:32,h:30,wx:44,wy:116,dir:-1,look:'corinth_winter_light'},
  {name:'letter_to_rome',x:104,y:90,w:30,h:8,wx:150,wy:118,dir:-1,look:letter},
  {name:'reed_pen',x:140,y:90,w:10,h:8,wx:160,wy:117,dir:-1,look:'ink_and_reed_look'},
  {name:'spare_tablet',x:90,y:92,w:12,h:6,wx:96,wy:118,dir:1,look:spare},
  {name:'door_to_the_storeroom',x:268,y:44,w:36,h:60,wx:280,wy:114,dir:1,exit:toScale,look:'door_to_the_storeroom_look'}].map(BOTH)};
ROOMS.scale15={space:.9,walk:NOW,mood:'house',amb:{},hs:[
  ...WIT15.map(m=>({name:ACT[m.a].name,x:m.x,y:0,w:m.w,h:22,wx:160,wy:236,def:'talk',look:m.look,talk:weigh})),
  {name:'scale',x:60,y:24,w:200,h:60,wx:160,wy:236,def:'use',look:()=>say(P,'scale_look').then(()=>say(P,tiltLine(),TH)),use:weigh,talk:weigh},
  {name:'chest',x:262,y:72,w:58,h:72,wx:160,wy:236,look:'chest_look'},
  {get name(){return ROUND[sc15().round].letter},x:8,y:100,w:62,h:40,wx:160,wy:236,vis:()=>!F.s3,look:letterLook},
  {get name(){return ROUND[sc15().round].bagName},x:72,y:78,w:36,h:22,wx:160,wy:236,vis:()=>!F.s3,look:'bag_look',use:'the_bag_is_not_mine_to_move',pickup:'the_bag_is_not_mine_to_move'},
  ...WT.map(w=>({name:w.name,get x(){return weightBoxScale15(w.id)[0]-2},get y(){return weightBoxScale15(w.id)[1]-2},get w(){return weightBoxScale15(w.id)[2]+4},get h(){return weightBoxScale15(w.id)[3]+4},
    wx:160,wy:236,def:'use',use:()=>moveWeight(w.id),pickup:()=>moveWeight(w.id,1),look:()=>say(P,T(WLOOK[sc15().w[w.id]],{m:w.m}))})),
  {name:'back_to_the_room',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:outScale,look:'not_before_all_three_are_weighed'}].map(BOTH)};
ROOMS.cen15={space:.5,walk:[16,304,112,138],mood:'harbor',amb:{waves:.4,gulls:.5,wind:.2},hs:[
  {name:'harbor',x:0,y:44,w:196,h:44,wx:120,wy:114,look:'harbor_of_cenchreae_look'},
  {name:'ship_for_syria',x:196,y:30,w:124,h:76,wx:230,wy:114,dir:1,look:'ship_for_syria_look'},
  {name:'goat',x:52,y:98,w:26,h:20,wx:88,wy:124,dir:-1,look:'she_looks_at_my_tent_cloth',talk:'goat_talk'},
  {name:'chest',x:228,y:106,w:24,h:14,wx:214,wy:124,dir:1,look:'chest_look'},
  {name:'strip_of_sand',x:16,y:126,w:96,h:18,wx:66,wy:130,dir:-1,look:toSand,use:toSand}].map(BOTH)};
ROOMS.sand15={space:.5,walk:NOW,mood:'road',amb:{waves:.5,gulls:.3},hs:[
  {name:'road_north',x:78,y:60,w:24,h:36,wx:160,wy:236,look:'road_north_look',useWith:id=>onRoad(id,1)},
  {name:'sea_lane_to_syria',x:150,y:112,w:150,h:24,wx:160,wy:236,look:'sea_lane_look',useWith:id=>onRoad(id,0)},
  ...PEB15.map(([id,x,y])=>({name:PEBNAME[id],x:x-7,y:y-6,w:14,h:12,wx:160,wy:236,look:()=>say(P,T('pebble_look',{place:T(PEBNAME[id])})),useWith:item=>onPebble(id,item)})),
  {name:'back_to_the_quay',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:outSand,look:'not_before_the_plan_is_laid'}].map(BOTH)};
ROOMS.quay15={space:.5,walk:[16,304,112,138],mood:'harbor',amb:{waves:.4,gulls:.4,crowd:.15},hs:[
  {name:'harbor',x:124,y:58,w:100,h:34,wx:170,wy:114,look:'quay_of_troas_look'},
  {name:'ship',x:8,y:34,w:110,h:72,wx:96,wy:114,dir:-1,look:'ship_at_the_quay_look'},
  {name:'jars_of_oil',x:236,y:92,w:44,h:22,wx:232,wy:118,dir:1,look:'jars_of_oil_look'},
  {name:'lane_to_korinnas_house',x:292,y:48,w:28,h:62,wx:298,wy:116,dir:1,exit:toUpper,look:'lane_to_korinnas_house_look'}].map(BOTH)};
ROOMS.upper15={space:1.2,floor:'wood',walk:[16,304,112,138],get mood(){return F.t4?(stage15()==='a'?'still':'none'):'night'},get amb(){return F.t4?{}:{crickets:.2}},hs:[
  {name:'brothers_of_troas',x:70,y:76,w:180,h:28,wx:120,wy:116,look:'people_listening_look'},
  {name:'window',x:40,y:30,w:30,h:34,wx:72,wy:114,dir:-1,look:'window_look'},
  {name:'big_jar',x:8,y:92,w:22,h:30,wx:60,wy:126,dir:-1,look:'big_jar_look'},
  {name:'stool',x:80,y:116,w:14,h:12,wx:87,wy:130,dir:1,def:'use',look:'stool_look',use:sit},
  {name:'table',x:196,y:98,w:60,h:12,wx:226,wy:114,look:'table_with_bread_look'},
  {name:'stairs_down',x:288,y:66,w:32,h:56,wx:282,wy:124,dir:1,exit:()=>say(LK,'i_am_not_leaving_tonight'),look:'stairs_look'},
  ...LAMPS.map((L,i)=>({name:L.k,x:[262,290,110,166,220][i],y:[50,74,34,70,88][i],w:[14,12,16,12,16][i],h:[12,10,14,10,10][i],wx:[262,280,118,190,226][i],wy:[114,118,114,120,114][i],dir:[1,1,-1,-1,1][i],
    look:()=>lampLook(i),useWith:id=>id==='jug15'?pour(i):false}))].map(BOTH)};
ROOMS.street15={space:.7,walk:[16,304,112,138],get mood(){return F.mid?'dawn':'none'},get amb(){return F.mid?{birds:.4,wind:.15}:{}},hs:[
  {name:'street',x:216,y:36,w:76,h:70,wx:240,wy:116,look:'street_at_daybreak_look'},
  {name:'window',x:150,y:6,w:20,h:18,wx:160,wy:122,look:()=>say(LK,'the_window_up_there_look').then(()=>say(LK,'luke_i_was_among_the_first_down',TH))},
  {name:'way_to_the_harbor',x:296,y:50,w:24,h:64,wx:298,wy:122,dir:1,exit:leave,look:'way_to_the_harbor_look'}].map(BOTH)};

/* ============ PEOPLE AS HOTSPOTS ============ */
/* Who has nothing to say at this point of the story is looked at when he is spoken to: nobody answers out of turn. */
const who=(a,o)=>{a.hs=BOTH(Object.assign({name:a.name,actor:a},o))};
who(TE,{look:'tertius_look',talk:phoebe});
who(GA,{look:'gaius_look',talk:()=>say(GA,'gaius_stay_as_long_as_you_need',{to:P})});
who(MI,{look:'mikon_look',talk:warn});
who(TI,{look:()=>say(PC(),PC()===LK?'luke_timothy_look':'timothy_look'),
  talk:()=>G.room==='street15'?say(TI,'timothy_the_ship_for_assos',{to:LK}):G.room==='quay15'?say(TI,F.oil?'timothy_luke_tonight_everyone_comes':'timothy_she_asks_for_oil',{to:LK}):F.warned?say(TI,'timothy_then_which_way',{to:P}):say(P,'timothy_look')});
who(AR,{look:'aristarchus_look',talk:'aristarchus_look'});
who(TR,{look:()=>say(PC(),PC()===LK?'luke_trophimus_look':'trophimus_look'),talk:()=>PC()===LK?trophimus():say(P,'trophimus_look')});
/* Tychicus is looked at beside the chest at Cenchreae. On the quay of Troas he and Gaius of Derbe are seen and are no hotspots: the
   script has no line of Luke's for either (TYHS, and place15). */
who(TY,{look:'tychicus_look',talk:'tychicus_look'});const TYHS=TY.hs;
who(SO,{look:'sopater_look',talk:'sopater_look'});
who(SC,{look:'secundus_look',talk:'secundus_look'});
who(SE,{look:'oil_seller_look',talk:oil});
who(KO,{look:()=>say(LK,F.mid?'korinna_at_dawn_look':'korinna_look'),talk:()=>say(KO,F.mid?'korinna_the_jar_lasted':'korinna_three_measures_at_a_time',{to:LK})});
who(EU,{get wx(){return G.room==='upper15'?72:null},get wy(){return G.room==='upper15'?114:null},look:()=>say(LK,F.mid?'eutychus_at_dawn_look':'eutychus_look'),talk:()=>F.mid?say(LK,'eutychus_at_dawn_look'):eutychus()});
for(const a of[KA,KB])who(a,{look:'eutychus_at_dawn_look',talk:'eutychus_at_dawn_look'});
/* Paul, while he speaks in the upper room: Luke looks, and does not interrupt; and Paul does not turn to him, nor answer (G.with, which
   act sets for a talk, is taken back at once: what Paul says that night is told, never composed) */
const notNow=()=>{G.with=null;return say(LK,'not_while_he_is_speaking')};
const PAULHS={name:'Paul',actor:P,as:{luke15:{look:'paul_speaking_look',talk:notNow,give:notNow}}};
LK.def={look:'luke_nothing_to_look_at',pickup:'luke_not_mine_to_take',use:'luke_no_use_for_that',open:'luke_not_mine_to_open',talk:'luke_later',give:'luke_what_should_i_give'};
LK.noCraft='luke_not_those_two_together';

/* ============ ITEMS ============ */
Object.assign(ITEMS,{
  tab15:{name:'lukes_tablets',icon:'tablets',def:'open',look:'lukes_tablets_look',open:ITEMS.tablets.open},
  reed15:{name:'reed',look:'a_reed_to_draw_in_the_sand'},
  /* over the plan in the sand, the shell and the awl say what they stand for */
  shell15:{name:'shell',get look(){return G.room==='sand15'&&!F.shell?'shell_for_the_seven_and_the_chest':'a_shell_from_the_quay'}},
  awl15:{name:'awl',icon:'awl',get look(){return G.room==='sand15'&&!F.awl?'awl_for_me':'my_awl_it_can_stand_for_me'}},
  jug15:{name:'oil_jug',get look(){return G.room==='upper15'?(lamps15(),T('jug_has_n_measures',{n:T(MEAS[G.j15||0])})):'oil_jug_holds_three_measures'}}});

/* ============ WAX TABLETS ============ */
/* Paul's in Greece and Luke's in Troas, in one table: whoever is played opens his own. */
const pa=f=>()=>PC()===P&&f(),lu=f=>()=>PC()===LK&&f();
const TABLETS={
  people:[{name:'Tertius',note:'note_tertius',if:pa(()=>true)},{name:'Gaius',note:'note_gaius_host',if:pa(()=>true)},{name:'Mikon',note:'note_mikon',if:pa(()=>!!F.warned)},
    {name:'Paul',note:'note_paul_by_luke',if:lu(()=>true)},{name:'Korinna',note:'note_korinna',if:lu(()=>!!F.oil)}],
  tasks:[{t:'task_finish_the_letter',if:pa(()=>!F.ph3)},{t:'task_weigh_the_gift',if:pa(()=>!!F.ph3&&!F.s3)},{t:'task_sail_for_syria',if:pa(()=>!!F.s3&&!F.warned)},
    {t:'task_plan_the_other_road',if:pa(()=>!!F.warned)},{t:'task_bring_the_oil',if:lu(()=>G.room==='quay15')},{t:'task_keep_the_lamps',if:lu(()=>G.room==='upper15')},
    {t:'task_to_the_ship',if:lu(()=>!!F.mid)}],
  scripture:[],
  notes:{title:()=>PC()===LK?'noted_in_troas':'noted_in_greece',none:'nothing_written_yet',
    list:[{t:'note_the_seven',if:pa(()=>!!F.ph3)},{t:'note_numbers',if:pa(()=>!!(F.s1||G.nm15))},{t:'note_lamps',if:lu(()=>G.room==='upper15'||!!F.mid)}]}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={gaius15:[200,124,-1],scale15:[160,236,1],cen15:[130,128,1],sand15:[160,236,1],quay15:[140,128,1],upper15:[96,126,1],street15:[160,128,1]};
const EVERY=[TE,GA,TI,AR,TR,TY,SO,SC,GD,NK,MI,KO,SE,EU,KA,KB];
function place15(room){for(const a of EVERY.concat([P,LK])){a.talk=false;a.seat=0}for(const a of EVERY)a.room=null;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  /* who is played: Paul in Greece, Luke from the quay of Troas on */
  const want=F.troas?LK:P;if(G.pc!==want){G.pc=want;G.inv=G.invs[want.id]||(G.invs[want.id]=[])}
  (want===LK?P:LK).room=null;
  if(room==='gaius15'){place(TE,room,124,116,1);TE.seat=1;place(GA,room,60,122,1)}
  if(room==='scale15')sc15();
  if(room==='cen15'){place(MI,room,150,122,-1);place(TI,room,186,124,-1);place(AR,room,100,118,1);place(TR,room,280,124,-1);place(TY,room,258,120,-1);TY.seat=1}
  TY.hs=room==='quay15'?null:TYHS;
  if(room==='quay15'){place(TI,room,170,124,-1);place(TR,room,120,120,1);place(SO,room,60,118,1);place(SC,room,78,124,-1);place(GD,room,208,116,1);place(TY,room,226,122,-1);place(SE,room,262,120,-1)}
  if(room==='upper15'){lamps15();const v=stage15();place(KO,room,38,122,1);
    /* Paul speaks until midnight; after it he stands at the table */
    if(v==='a')place(P,room,226,116,-1);else place(P,room,150,118,-1);P.talk=v==='m';
    if(v==='m'){place(EU,room,55,66,1);EU.seat=1}}
  if(room==='street15'&&F.mid){place(EU,room,196,120,-1);place(KA,room,182,124,1);place(KB,room,212,122,-1);place(KO,room,132,118,1);place(TI,room,250,124,-1)}
  P.party=LK.party=0;swapBtn()}
function setup15(){P.hs=PAULHS;P.called='Paul';LK.called='Luke';G.sc15=G.l15=G.x15=null;G.j15=G.si15=G.sn15=G.up15=G.eu15=G.nm15=G.tr15=0;
  G.invs={paul:['tablets'],luke15:['tab15']};G.inv=G.invs.paul;drawInv()}

/* ============ PRAYER HINTS ============ */
function hint15(){const r=G.room;
  if(!F.ph3)return['ph15',['hint_phoebe_1','hint_phoebe_2']];
  if(!F.s3){if(r!=='scale15')return['store15',['hint_store_1','hint_store_2']];const k=sc15().round;return['scale15'+k,['hint_scale_1',ROUND[k].hint]]}
  if(!F.warned)return['harbor15',['hint_harbor_1','hint_harbor_2']];
  if(!F.troas){if(r!=='sand15')return['sand15',['hint_sand_1','hint_sand_2']];
    if(!F.way)return['way15',['hint_way_1','hint_way_2']];if(!F.shell)return['shell15',['hint_shell_1','hint_shell_2']];return['awl15',['hint_awl_1','hint_awl_2']]}
  if(!F.mid)return r==='upper15'?['lamps15',['hint_lamps_1','hint_lamps_2']]:['oil15',['hint_oil_1','hint_oil_2']];
  return['dawn15',['hint_dawn_1','hint_dawn_2']]}

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['gaius15','scale15','cen15','sand15','quay15','upper15','street15'],setup:setup15,start:start15,hint:hint15,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told; the questions about Phoebe; the weights and the bags; the lamps and the search; the roads on the map */
  told:TOLD,phoebe:PHOEBE,weights:WT,rounds:ROUND,sc:sc15,tilt:tiltScale15,lamps:LAMPS,oil:lamps15,after:AFTER,canLast,sat,pebbles:PEB15,roads:[ROAD_A,ROAD_B],
  flags:FLAGS,
  /* seven rooms and seventeen flags today; the code keeps room for sixteen and for forty. Two are played, one after the other: Paul in
     Greece, and Luke from the quay of Troas to the end. */
  codeBits:{flags:40,rooms:4},party:['paul','luke15'],swap:false,ent:ENT,home:{tab15:'luke15',jug15:'luke15'},
  away:id=>id==='paul'?!!F.troas:id==='luke15'?!F.troas:false,
  inv:room=>['tablets','tab15'].concat(F.warned&&!F.troas?['reed15']:[],F.warned&&!F.shell?['shell15']:[],F.warned&&!F.awl?['awl15']:[],F.oil?['jug15']:[]),
  place:place15}
});
