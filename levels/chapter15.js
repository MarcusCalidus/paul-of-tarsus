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
   Seven pictures: a room in the house of Gaius on a winter day; the storeroom table with the balance over it (a close view); the quay
   of Cenchreae on a clear morning; the plan in the wet sand (a close view); the quay of Troas late in an afternoon; the upper room by
   night, in three states (the meeting, midnight with the window empty, and afterward, round the table); and the street below it, by
   night and at daybreak. Each is a section of its own between "ART <room>: begin" and "ART <room>: end", so that one room can be
   painted anew without touching another; what the story reads from a section, and what it takes from one, is named at its head.
   The upper room has no light but its five lamps: each throws a pool of its own, which shrinks as its oil burns down, and the night
   stands in the window. Eutychus sits in that window, on its sill, as the account says (Acts 20:9): in the opening, his head under
   its top, turned to the speaker. No flame and no round pool of light comes behind a head; the balance hangs from two cords and has
   no upright; the lamp's stand ends in a cup, and the hanging lamp hangs from cords that part (CONTRIBUTING section 3).
   One tune runs through the chapter and changes with the hours (MUSIC); at midnight nothing plays and nothing is heard. */
LEVEL(15,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* One tune, and what becomes of it between a winter day and a daybreak. It has six notes, from C: C, D, E, F, G and A. The scale has a
   major third and no seventh, so nothing in it leans on the keynote, and the tune comes home from the sixth below. It is in bars of
   twelve, four threes, a bar that rocks; no earlier chapter has this scale or this bar. The tune is four bars long (A B C D): a third
   that rocks and settles, the same third climbing to the sixth and left hanging, a way down, and the way home.
   In the house of Gaius ("house") the lyre has it over a low string, and after each time through it thinks the tune over: a low note,
   a rest, and half a bar of it. At Cenchreae on a clear morning ("harbor") one pipe has it over a harp that rocks. When the warning
   has come ("warned") something is withheld: the keynote. Wherever the tune came home there is a rest, the harp is gone, and what is
   held under the pipe is the fifth, so that the keynote is heard nowhere. On the road north ("road") the same notes are counted in
   twos and not in threes, six even steps to the bar: the tune walks, on the oud, over a low string and a hand drum, and it arrives on
   the keynote. On the quay of Troas ("quay") the lyre has the tune as in the house, and then the pipe answers with the whole of it
   while the lyre rocks under it: two take turns. In the upper room ("night") the harp plays it at a third of its pace over one low
   note, half the tune and then a long rest in which nothing sounds; then, alone, the third it begins with, an octave below, and the
   two notes with which it comes home; a minute and a half passes before anything is heard twice. At midnight nothing plays (the mood
   "none"); when Paul has gone up again one low note is left, hardly to be heard ("still"). At daybreak ("dawn") the lyre has the tune
   again as in the house, and a little wider: in its third bar it climbs to the keynote above, which it reached nowhere before, and
   the harp goes with it an octave higher. No drum, and no new ending.
   The story sets them all: "warned" from Mikon's word until the way is drawn in the sand, "road" from then on and over the map of
   the journey north, "quay" at Troas, and the others with their rooms.
   Nothing is claimed about how music was played then. */
const _=null,SCALE=[0,2,4,5,7,9],
 /* the tune, a bar to a letter: [step, degree of the scale, length in steps]. W is C as it is at daybreak; a and d are A and D with
    the keynote withheld; I, J and K are the tune thought over; _ is a bar of rest. */
 TUNE={A:[[0,2,2],[2,4,1],[3,2,3],[6,1,2],[8,2,1],[9,0,3]],B:[[0,2,2],[2,4,1],[3,5,3],[6,4,2],[8,2,1],[9,1,3]],
  C:[[0,4,2],[2,5,1],[3,4,3],[6,3,2],[8,1,1],[9,2,3]],D:[[0,1,2],[2,2,1],[3,1,3],[6,-1,3],[9,0,3]],
  W:[[0,4,2],[2,5,1],[3,6,3],[6,3,2],[8,1,1],[9,2,3]],
  a:[[0,2,2],[2,4,1],[3,2,3],[6,1,2],[8,2,1]],d:[[0,1,2],[2,2,1],[3,1,3],[6,-1,3]],
  I:[[0,0,5],[6,2,2],[8,4,1],[9,2,3]],J:[[0,-1,5],[6,1,2],[8,2,1],[9,0,3]],K:[[0,-2,5],[6,1,2],[8,2,1],[9,1,3]],_:[]},
 bars15=s=>[...s].map(k=>TUNE[k]),
 /* what rocks under the tune: a note on each of the four beats of a bar, that agrees with the tune's note on that beat. A to D go
    under the bars of the tune; E and F, with A, fill a stretch in which the tune rests. */
 ROCK={A:[0,4,-2,2],B:[-1,2,-2,1],C:[-4,0,-3,-1],D:[-2,1,-3,0],E:[-1,2,0,2],F:[-2,1,-2,1]},
 rock15=s=>[...s].map(k=>ROCK[k].map((n,i)=>[i*3,n,3])),
 /* the low string: under the four bars of the tune (C; A, G; E, F; G, F, C), and under the four in which the lyre thinks it over */
 LOW=[[[0,0,6]],[[0,-1,6],[6,-2,6]],[[0,-4,6],[6,-3,6]],[[0,-2,6],[6,-3,3],[9,0,3]]],LOW8=LOW.concat([[[0,0,6]],[[0,-1,6]],[[0,0,6]],[[0,-2,6]]]),
 /* the same notes in twos: six even steps to the bar; the last bar has five notes, so it comes home a step early and waits */
 WALK=bars15('ABCD').map(b=>b.map(([,n],i)=>[i*2,n,i===b.length-1?12-i*2:2])),
 /* at a third of its pace: every step and every length three times as long, so that a bar of the tune takes three; down: an octave below */
 slow15=(k,at,down)=>TUNE[k].map(([s,n,l])=>[at+Math.floor(s/4),s*3%12,n-(down?6:0),l*3]),
 /* the night, thirty-two bars: A, a bar of rest, B, four bars of rest; C, a bar of rest, D, four bars of rest; then, an octave below
    and alone, the rocking third with which the tune begins; four bars of rest; the two notes with which it comes home; and rest */
 NIGHT=(()=>{const L=Array.from({length:32},()=>[]),put=x=>x.forEach(([b,s,n,l])=>L[b].push([s,n,l]));
   put(slow15('A',0));put(slow15('B',4));put(slow15('C',11));put(slow15('D',15));put(slow15('A',22,1).slice(0,3));put(slow15('D',26).slice(3));return L})(),
 /* and the low note of the night: it comes in under each half of the tune and is gone before the rest is over */
 HUM=Array.from({length:32},(x,i)=>i===0||i===11?[[0,0,84]]:[]),
 MUSIC={dt:.24,steps:12,group:[3,3,3,3],root:48,scale:SCALE,bars:32,tracks:[
  {inst:'lyre',moods:['house'],oct:12,loop:8,lines:bars15('ABCDIJIK'),vol:.8},
  {inst:'bass',moods:['house','dawn'],loop:8,lines:LOW8,vol:.5},
  {inst:'ney',moods:['harbor'],oct:24,loop:8,lines:bars15('ABCD____'),vol:.5},
  {inst:'harp',moods:['harbor'],oct:12,loop:8,lines:rock15('ABCDAEAF'),vol:.5},
  {inst:'ney',moods:['warned'],oct:24,loop:8,lines:bars15('aBCd____'),vol:.5},
  {drone:[7],every:48,moods:['warned'],vol:.16},
  {inst:'oud',moods:['road'],oct:12,loop:4,group:[2],lines:WALK},
  {inst:'bass',moods:['road'],loop:4,group:[2],vol:.5,lines:[[[0,0,6],[6,-1,6]],[[0,0,6],[6,-2,6]],[[0,-4,6],[6,-3,6]],[[0,-2,6],[8,0,4]]]},
  {drum:1,moods:['road'],group:[2],prog:'AAAB',seq:{A:'d.k.k.d.k.k.',B:'d.k.k.d.k.t.'},vol:.35},
  {inst:'lyre',moods:['quay'],oct:12,loop:8,lines:bars15('ABCD').concat(rock15('ABCD')),vol:.8},
  {inst:'ney',moods:['quay'],oct:24,loop:8,lines:bars15('____ABCD'),vol:.45},
  {inst:'bass',moods:['quay'],loop:4,lines:LOW,vol:.5},
  {drum:1,moods:['quay'],prog:'AB',seq:{A:'d..k..t..k..',B:'d..k..t.kk..'},vol:.25},
  {inst:'harp',moods:['night'],oct:12,loop:32,lines:NIGHT,vol:.7},
  {inst:'drone',moods:['night'],loop:32,lines:HUM,vol:.14},
  {drone:[0],every:96,moods:['still'],vol:.07},
  {inst:'lyre',moods:['dawn'],oct:12,loop:8,lines:bars15('ABWDIJIK'),vol:.8},
  {inst:'harp',moods:['dawn'],oct:24,loop:8,vol:.55,lines:bars15('ABWD____').map(b=>b.filter(([s])=>s%3===0).map(([s,n])=>[s,n,3]))}]};

/* ---- around you ---- */
/* The hiss of the lamps in the upper room is a bed of its own; a brazier's tick, a wick that sputters and the first bird of the morning
   are calls of their own. The sea, the gulls, a hull that creaks, wind and crickets are the engine's. All of it is kept low. */
const BEDS={lamps15:{type:'bandpass',f:5200,q:.7,lfo:.23,depth:.5,v:.03}};
/* tick15: one small burst of noise, d seconds long, for the brazier and the wicks. It is silent until it begins: its level is nothing
   before t, rises within a thousandth of a second and dies away. */
function tick15(dest,t,d,v,f,q,type){const c=AU.ctx;if(!c)return;const s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();
  s.buffer=AU.nbuf;s.loop=true;fl.type=type||'bandpass';fl.frequency.value=f;fl.Q.value=q;g.gain.value=0;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.001);
  g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(dest);s.start(t,Math.random()*.5);s.stop(t+d+.05)}
const CALLS={
  /* charcoal in a brazier: a tick now and then, sometimes two */
  brazier15:[.9,4.5,(t,d)=>{const n=Math.random()<.3?2:1;for(let i=0;i<n;i++)tick15(d,t+i*(.07+Math.random()*.08),.012+Math.random()*.02,.03+Math.random()*.04,2200+Math.random()*2400,2)}],
  /* a wick that sputters: a few clicks close together, and then the hiss again */
  wick15:[5,14,(t,d)=>{const n=2+(Math.random()*3|0);for(let i=0;i<n;i++)tick15(d,t+i*(.03+Math.random()*.04),.008+Math.random()*.012,.02+Math.random()*.025,5200+Math.random()*1800,.9,'highpass')}],
  /* the first birds: one bird at a time, a few notes, and a long wait before the next */
  dawnbird15:[2.2,7,(t,d)=>{const f=Math.random()<.35?3900:2900,n=2+(Math.random()*3|0);
    for(let i=0;i<n;i++)tone({f:f*(i%2?1.12:1),to:f*(i%2?.98:1.2),t:t+i*.16,d:.09,type:'sine',v:.05,dest:d})}]};
/* what is heard in each room, for the rooms to name; after15 is the upper room when Paul has gone up again */
const AMB={gaius15:{wind:.1,brazier15:.5},scale15:{wind:.05},cen15:{waves:.4,gulls:.45,wind:.18,creak:.2},sand15:{waves:.5,gulls:.3,wind:.12},
  quay15:{waves:.38,gulls:.3,crowd:.14,creak:.25},upper15:{lamps15:.6,wick15:.5,crickets:.1,wind:.05},after15:{lamps15:.45,wick15:.3},
  street15:{dawnbird15:.6,wind:.12,waves:.1}};
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
/* Corinth, a room in the house of Gaius, on a winter day.
   Called from outside: ART.gaius15 only. Reads nothing of the story: the room has one picture.
   Hotspots (ROOMS.gaius15): window to the court 20,34,32,30 · the table 92,92,64,25 and on it the letter 104,90,30,8, ink and reed
   140,90,10,8 and the spare tablet 93,92,11,7 · door to the storeroom 268,44,36,60. Actors: Tertius sits at 124,116, Gaius stands at
   60,122, Paul comes in at 200,124 and stands at the table's ends (x 84 and 164) when he looks at what lies on it. Walk strip y 112..138.
   The room is seen from in front, the eye at the height of a standing man's (VPGaius15): the joists of the ceiling, the joints of the
   paving and the two side walls all run to that one point. The light is the winter day in the window, at the left of the back wall:
   cool, strongest on the left, fading to the right, where the coals of the brazier give a little warmth back. Only the coals move.
   The table is a prop: Tertius sits BEHIND it, on the stool painted there, and the table is laid over him, so that he is seen above
   its top and his feet under it. Its front legs stand at y 116.5, between him (116) and whoever comes to stand at the table (117, 118):
   they are the only things that stand inside the walk strip, with the stool (a prop too, at 113.4). Everything else stands against the
   wall, its feet above y 112. Nothing round lies where a head comes: the rolls on the shelf are above every head, the glow of the coals
   is long and low, and the wall behind Tertius is bare. */
const VPGaius15=[160,78],TOPGaius15=[95,92.5,153,92.5,156,99.5,92,99.5];
ART.gaius15={w:320,q:12,paint(g){paintGaius15(g)},light:{amb:'#d6d8e2',lamps:[[178,100,44,'#3a2008']],shade:[[240,340,'#e0dada']]},
  draw(g,t){emberGaius15(g,t)},front(){},props:[{y:113.4,shape(g){stoolGaius15(g,1)}},{y:116.5,shape(g){tableShapeGaius15(g)}}]};
function paintGaius15(g){const r=rng(1501),W='#cfc4a8';
  ceilGaius15(g);wallGaius15(g,r,W);floorGaius15(g,r);sidesGaius15(g,W);
  windowGaius15(g,W);doorGaius15(g,r);shelfGaius15(g);pegsGaius15(g);benchGaius15(g,r);stoolGaius15(g);brazierGaius15(g,r);chestGaius15(g,r);
  /* a storage jar with its lid on, in the corner by the storeroom */
  vessel(g,314.4,108.6,5.2,17,'#9c6240','jar');R(g,311.4,90.6,6,1.2,'#6a4a30');R(g,311.4,90.6,6,.5,'#a07a50');
  tableGaius15(g);lightGaius15(g)}
/* plankGaius15: a board with a quiet grain: a few long streaks, lighter and darker, none of them strong. vert: the grain runs up and down */
function plankGaius15(g,x,y,w,h,c,r,vert){inRect(g,x,y,w,h,()=>{g.fillStyle=vert?lg(g,x,0,x+w,0,[tint(c,.08),c,tint(c,-.12)]):lg(g,0,y,0,y+h,[tint(c,.08),c,tint(c,-.12)]);g.fillRect(x,y,w,h);
  tex(g,vert?'vert':'wood',.2,x,y,w,h,'overlay',.5);
  for(let i=0;i<(vert?w:h)*.9;i++){const a=r(),L=vert?h:w,l=L*(.2+r()*.5),o=r()*(L-l),k=r()<.5?tint(c,-.16):tint(c,.1);
    if(vert)R(g,x+a*w,y+o,.5,l,k);else R(g,x+o,y+a*h,l,.5,k)}})}
/* the ceiling, seen from below: joists that run from the back wall toward us and spread as they come, the boards dark between them,
   and the beam along the top of the wall on which they lie. Of each joist we see the underside and the side turned to the middle. */
function ceilGaius15(g){const[VX,VY]=VPGaius15,U=12,B=8,pu=x=>VX+(x-VX)*VY/(VY-U),pb=x=>VX+(x-VX)*VY/(VY-B);
  R(g,0,0,320,13,'#2e241c');tex(g,'wood',.5,0,0,320,13,'overlay',.5);ao(g,0,0,320,9,'t',.5,'#0c0808');
  for(let x=4;x<320;x+=31){const a=x,b=x+7,left=x+3.5<VX,e=left?b:a;
    poly(g,[e,U,e,B,pb(e),0,pu(e),0],left?'#3e2e22':'#7a6044');poly(g,[a,U,b,U,pu(b),0,pu(a),0],'#5e4630');
    stroke(g,[e,U,pu(e),0],left?'#6e563c':'#9a7c58',.5)}
  wood(g,0,U-.4,320,3,'#5a4028');R(g,0,U+2.6,320,.6,'#2a1c12')}
/* the back wall: plaster, a painted band under the ceiling, a darker foot. Its cracks are set high, where they run to no head. */
function wallGaius15(g,r,W){plaster(g,0,14.6,320,89.4,W,r,{patch:0,cracks:0,t:.3});
  R(g,0,19,320,3.4,'#8e4e3a');R(g,0,19,320,.5,'#a86a50');R(g,0,23.4,320,.6,'#a8905e');
  inRect(g,0,19,320,5,()=>{tex(g,'mott',.6,0,19,320,5,'overlay',1);for(let i=0;i<30;i++)R(g,r()*320,19+r()*3.4,1+r()*3,.5+r(),rgba(W,.45))});
  g.fillStyle=lg(g,0,96,0,104,['#7c5e4c','#694c3e']);g.fillRect(0,96.6,320,7.4);
  inRect(g,0,96.6,320,7.4,()=>{tex(g,'mott',.6,0,96,320,8,'overlay',1);for(let i=0;i<44;i++)R(g,r()*320,97+r()*6.4,1+r()*4,.5+r()*.6,r()<.6?rgba(W,.3):'rgba(30,20,20,.25)')});
  for(const[x,y,n]of[[70,28,3],[146,27.6,4],[204,28.4,4],[250,28,3]])crackGaius15(g,x,y,n,r);
  ao(g,0,14.6,320,11,'t',.42,'#2a2030')}
function crackGaius15(g,x,y,n,r){const p=[x,y];for(let s=0;s<n;s++){x+=(r()-.5)*5;y+=1.5+r()*4;p.push(x,y)}
  stroke(g,p,'rgba(0,0,0,.3)',.5);stroke(g,p.map((v,i)=>i%2?v:v+.5),'rgba(255,255,255,.12)',.5)}
/* the floor: stone slabs, their joints running to the eye's point; dust, and the wear of feet */
function floorGaius15(g,r){const[VX,VY]=VPGaius15;
  pave(g,0,104,320,144,'#a69a86',r,{vx:VX,vy:VY,rows:5,step:38,v:.07,p:1.5,t:.5});
  pool(g,170,122,150,9,'#c8bca4',.18,'source-over');
  for(let i=0;i<90;i++){const k=r(),y=104.5+k*39;R(g,r()*320,y,.5+k*1.4,.5,r()<.5?'rgba(60,48,40,.22)':'rgba(255,244,220,.14)')}
  ao(g,0,104,320,6,'t',.45,'#2a2030')}
/* the two side walls, coming toward us: the left one in its own shade, the right one facing the window */
function sidesGaius15(g,W){const[VX,VY]=VPGaius15;
  for(const[cx,ex,k]of[[9,0,-.26],[311,320,.05]]){const c=tint(W,k),Y=y=>VY+(y-VY)*(ex-VX)/(cx-VX),x0=Math.min(cx,ex);
    clipTo(g,()=>poly(g,[cx,11.6,ex,Y(11.6),ex,Y(104),cx,104]),()=>{
      g.fillStyle=lg(g,0,14,0,104,[tint(c,.04),c,tint(c,-.14)]);g.fillRect(x0,0,9,144);
      poly(g,[cx,19,ex,Y(19),ex,Y(22.4),cx,22.4],tint('#8e4e3a',k));poly(g,[cx,96.6,ex,Y(96.6),ex,Y(104)+1,cx,104],tint('#735444',k));
      tex(g,'mott',.5,x0,0,9,144,'overlay',1);ao(g,x0,Y(11.6)-2,9,12,'t',.4,'#2a2030')})}
  ao(g,9,14.6,6,89.4,'l',.3,'#2a2030');ao(g,305,14.6,6,89.4,'r',.12,'#2a2030')}
/* the window to the court, in the thickness of the wall. We stand to the right of it and below it: we see the left side of the
   opening and its top, lit by the day, and through it the sky, the tiled roof of the far wing and the top of its wall. */
function windowGaius15(g,W){const x0=21,x1=51,y0=35,y1=63,xi=25.2,yi=36.4;
  R(g,x0-1,y0-1,x1-x0+2,y1-y0+1,tint(W,-.14));
  clipTo(g,()=>{g.beginPath();g.rect(xi,yi,x1-xi,y1-yi)},()=>{
    g.fillStyle=lg(g,0,yi,0,51,['#98acca','#bccada','#dfe2e0']);g.fillRect(xi,yi,x1-xi,y1-yi);
    pool(g,44,40.6,9,1.8,'#f4f4f0',.7,'source-over');pool(g,31,45.6,7,1.5,'#eef0ee',.6,'source-over');
    /* the far wing: its roof of tiles, each row ending at the roof's own edges, the shade under the eaves, the wall and two small windows */
    R(g,xi,49.5,x1-xi,4,'#b07458');for(let x=xi+.8;x<x1;x+=2)R(g,x,50,.5,3.5,'#8e563e');R(g,xi,49.5,x1-xi,.5,'#cc9a7c');
    R(g,xi,53.5,x1-xi,1,'#6a5648');g.fillStyle=lg(g,0,54.5,0,y1,['#d8ceb8','#c2b8a2']);g.fillRect(xi,54.5,x1-xi,y1-54.5);
    R(g,32,56.5,2.5,3.5,'#4a4248');R(g,43.5,56.5,2.5,3.5,'#4a4248');
    comp(g,'screen',.16,()=>R(g,xi,yi,x1-xi,y1-yi,'#c8d4e4'));
    /* a bare bough of the tree in the court, against the sky: it forks, and no twig lies across another */
    stroke(g,[51,47.6,46,44,41.4,42.6,37.6,39.4],'#3e3430',.8);stroke(g,[46,44,44.6,40.6,45.2,38.2],'#3e3430',.6);stroke(g,[41.4,42.6,38.6,43.8],'#4a403a',.5);
    ao(g,xi,yi,x1-xi,3,'t',.3,'#202838')});
  g.fillStyle=lg(g,0,y0,0,y1,['#c4c4c0','#deddd4','#cfcbbe']);poly(g,[x0,y0,xi,yi,xi,y1,x0,y1]);g.fill();
  poly(g,[x0,y0,x1,y0,x1,yi,xi,yi],'#857d6e');
  R(g,xi,yi,x1-xi,1,'#3e2e22');R(g,xi,yi,1,y1-yi,'#5a4430');R(g,x1-.8,yi,.8,y1-yi,'#4a3828');
  poly(g,[x0-.5,y1+1.6,x1+1.5,y1+1.6,x1+3,y1+4.6,x0+1,y1+4.6],'rgba(50,40,80,.2)');
  plankGaius15(g,x0-1.5,y1-1,x1-x0+3,2,'#8a6a48',rng(77),0);R(g,x0-1.5,y1-1,x1-x0+3,.5,'#dcd2bc');R(g,x0-1.5,y1+1,x1-x0+3,.6,'#3a2a20')}
/* the door to the storeroom: a frame of wood and a leaf of three wide planks, with a lock plate and a pull. Nothing lies across a plank. */
function doorGaius15(g,r){const x=268,y=44,w=36,h=60,F='#80603e',D='#684a2c';
  R(g,x+w+5.5,y-3,1.8,h+3,'rgba(40,30,50,.22)');
  for(const jx of[x-5.5,x+w]){plankGaius15(g,jx,y,5.5,h,F,r,1);R(g,jx,y,.5,h,tint(F,.25))}
  plankGaius15(g,x-5.5,y-5,w+11,5,F,r,0);R(g,x-5.5,y-5,w+11,.5,tint(F,.35));R(g,x-5.5,y-.6,w+11,.6,tint(F,-.5));
  R(g,x,y,w,h,'#1a120c');
  for(const[a,b,k]of[[x,x+11.5,0],[x+11.5,x+24.5,.05],[x+24.5,x+w,-.04]]){plankGaius15(g,a+.25,y,b-a-.5,h,tint(D,k),r,1);R(g,a+.25,y,.5,h,tint(D,.2))}
  ao(g,x,y,w,6,'t',.5);ao(g,x,y,5,h,'l',.38);R(g,x+w-1,y,1,h,tint(F,.2));
  R(g,x+28,y+29,2.6,3.6,'#8a6c3c');R(g,x+28,y+29,2.6,.5,'#c8a868');R(g,x+29,y+30.4,.6,1.4,'#1a120c');
  R(g,x+28.4,y+35,1.6,1.6,'#b89858');R(g,x+28.4,y+36.2,1.6,.5,'#5a4424');R(g,x+28.8,y+36.8,1.6,.6,'rgba(20,12,8,.5)');
  poly(g,[x-4,103,x+w+4,103,x+w+5.5,105.6,x-5.5,105.6],'#b0a590');R(g,x-4,103,w+8,.5,'#d8cfba');R(g,x-5.5,105.2,w+11,.5,'#6e6456')}
/* rollEndGaius15: a roll of papyrus seen end on: the face with its turns, and no more of it */
function rollEndGaius15(g,x,y,r,c){oval(g,x+.6,y+.4,r,r,'rgba(30,22,30,.3)');g.fillStyle=lg(g,x-r,0,x+r,0,[tint(c,.2),c,tint(c,-.28)]);g.beginPath();g.arc(x,y,r,0,6.2832);g.fill();
  g.strokeStyle=tint(c,-.34);g.lineWidth=.5;g.beginPath();g.arc(x,y,r*.55,.5,5.6);g.stroke();R(g,x-.5,y-.5,1,1,tint(c,-.55))}
/* a shelf on two brackets at its ends: rolls heaped on it, their ends to the room, and a lamp of clay, cold by day */
function shelfGaius15(g){const x=60,y=57,w=29,c='#7a5a38',P='#d8c79a';
  poly(g,[x+2,y+2.4,x+w+2.4,y+2.4,x+w+3.4,y+5,x+3,y+5],'rgba(40,30,50,.2)');
  for(const bx of[x+1,x+w-4.6])poly(g,[bx,y+2,bx+3.6,y+2,bx+(bx>x+w/2?3.6:0),y+7],tint(c,-.3));
  plankGaius15(g,x,y,w,2.2,c,rng(41),0);R(g,x,y,w,.5,tint(c,.3));R(g,x,y+2.2,w,.5,tint(c,-.5));
  for(const[rx,ry,k]of[[64.6,54.6,0],[69.2,54.6,-.06],[73.8,54.6,.04],[66.9,50.6,.05],[71.5,50.6,-.03]])rollEndGaius15(g,rx,ry,2.3,tint(P,k));
  poly(g,[80.4,57,80.2,55.4,81.8,54.4,85,54.2,86.6,54.8,88.2,54.6,88.6,55.4,87.2,57],'#9a7a58');R(g,81.6,54.4,4,.5,'#c4a680');R(g,87.4,54.8,.8,.6,'#2a2018');R(g,80.6,56.4,6.6,.6,'#6a5038')}
/* two pegs in the wall above the chest: a bag hung by its strap, which parts downward from the peg, and a winter cloak hung by its neck,
   gathered at the peg and falling in folds to an uneven hem */
function pegsGaius15(g){const c='#566060',b='#7a5232';
  R(g,199.2,57,2,2,'#4a3420');R(g,199.2,57,2,.6,'#8a6a46');
  stroke(g,[200.2,58.6,196.4,66.4],'#5a3c22',.8);stroke(g,[200.2,58.6,204,66.4],'#5a3c22',.8);
  poly(g,[196,67.4,196.6,75.6,198,77,202.4,77,203.8,75.6,204.4,67.4],'rgba(40,30,50,.22)');
  g.fillStyle=lg(g,195,0,203.4,0,[tint(b,.2),b,tint(b,-.3)]);poly(g,[195,66,195.4,74.4,196.8,76,201.4,76,202.8,74.4,203.4,66]);g.fill();
  poly(g,[195,66,203.4,66,202.8,70,199.2,71.4,195.6,70],tint(b,.12));stroke(g,[195.6,70,199.2,71.4,202.8,70],tint(b,-.4),.5);R(g,198.7,70.4,1,1,'#b89858');
  /* the cloak hangs to one side of its peg: the gather at the peg, the cloth falling away to the right, and every fold starts there */
  const K=[231,58.2,234,58,237.4,60.6,240.6,65,242.6,74,243.8,85.4,241,87,238,85.6,234.8,86.6,231.6,84.4,229,84.6,228.6,74,229.2,64,229.8,60];
  R(g,230.6,56.2,2.2,2.2,'#4a3420');R(g,230.6,56.2,2.2,.6,'#8a6a46');
  poly(g,K.map(v=>v+1.4),'rgba(40,30,50,.22)');
  g.fillStyle=lg(g,228,0,244,0,[tint(c,.1),c,tint(c,-.16)]);poly(g,K);g.fill();
  for(const[hx,hy,w]of[[230.2,84,.5],[234.6,86,.6],[238.4,85.2,.6],[242,86.2,.5]])poly(g,[232,60.4,232.6,60.4,(232.3+hx)/2+w+.3,73,hx+w,hy,hx-w,hy,(232.3+hx)/2-w,73],tint(c,-.3));
  for(const[hx,hy]of[[232.4,84.6],[236.6,85.4],[240.4,85.8]])poly(g,[233,62,233.5,62,hx+.4,hy,hx-.3,hy],tint(c,.18));
  poly(g,[231,58.2,234,58,235.4,59.2,233.2,60.6,231,60],tint(c,.2))}
/* the bench under the window, its seat a plank on two slab legs set in from its ends; a blanket folded on it */
function benchGaius15(g,r){const x=10,y=96.4,w=47,c='#8a6a46',b='#8a4636';
  R(g,x+1,y+3,w,7.6,'rgba(40,30,44,.22)');oval(g,x+w/2+2,y+12.6,w/2+2,1.8,'rgba(30,22,34,.32)');
  for(const lx of[x+3,x+w-7]){plankGaius15(g,lx,y+3.6,4,8.6,tint(c,-.24),r,1);R(g,lx,y+3.6,4,.8,tint(c,-.5))}
  poly(g,[x+1.2,y-1.2,x+w-1.2,y-1.2,x+w,y,x,y],tint(c,.3));
  plankGaius15(g,x,y,w,2.4,c,r,0);R(g,x,y,w,.5,tint(c,.45));R(g,x+1,y+2.4,w-2,1.4,tint(c,-.3));
  for(let i=0;i<3;i++){const yy=y-1.2-(i+1)*1.5,xx=x+5+i*.4,ww=15-i*.6;R(g,xx,yy,ww,1.5,tint(b,i*.07-.05));R(g,xx,yy,ww,.5,tint(b,.25));R(g,xx,yy+1,ww,.5,tint(b,-.35))}}
/* the stool Tertius sits on, behind the table */
function stoolGaius15(g,cut){const c='#6e5236';if(!cut)oval(g,125,113.2,10,1.6,'rgba(24,18,28,.35)');
  for(const lx of[117.4,129.6])wood(g,lx,106.4,2.2,6.8,tint(c,-.2),1);wood(g,115.6,104.8,17.8,1.8,c);R(g,115.6,104.8,17.8,.5,tint(c,.3))}
/* the brazier: a long pan of bronze on four legs, one at each corner, the coals low in it under their ash */
function brazierGaius15(g,r){const x=178,B='#8e6c3c',D='#4e3a22';
  oval(g,x+2,109.4,14,1.8,'rgba(24,18,28,.36)');
  for(const lx of[x-8.4,x+7])R(g,lx,100,1.4,7.4,tint(D,-.2));
  poly(g,[x-9.6,93.2,x+9.6,93.2,x+11.4,96.2,x-11.4,96.2],'#1e1412');
  clipTo(g,()=>poly(g,[x-9.2,93.5,x+9.2,93.5,x+10.8,96.1,x-10.8,96.1]),()=>{
    for(let i=0;i<26;i++)R(g,x-10+r()*20,93.4+r()*2.6,1+r()*1.6,.6+r()*.8,r()<.5?'#3a2824':'#2a1c1a');
    for(let i=0;i<12;i++)R(g,x-8.4+r()*16.8,93.8+r()*2,.6+r()*1.2,.5,r()<.4?'#ffb050':'#e0541e');
    for(let i=0;i<6;i++)R(g,x-9+r()*18,93.5+r()*2.4,1+r(),.5,'rgba(190,180,172,.6)')});
  R(g,x-9.6,92.8,19.2,.6,tint(B,-.05));
  g.fillStyle=lg(g,x-11.4,0,x+11.4,0,[tint(B,.25),B,tint(B,-.38)]);g.fillRect(x-11.4,96.2,22.8,4.4);ao(g,x-11.4,98.6,22.8,2,'b',.3);
  R(g,x-11.8,95.8,23.6,.8,'#d8b068');R(g,x-11.8,96.6,23.6,.5,tint(D,-.2));R(g,x-11.4,99.4,22.8,.5,tint(B,.22));
  for(const lx of[x-11,x+9]){R(g,lx,100.6,2,7.8,B);R(g,lx,100.6,.6,7.8,tint(B,.3));R(g,lx+1.5,100.6,.5,7.8,tint(B,-.4));R(g,lx-.6,107.8,3.2,1.4,D);R(g,lx-.6,107.8,3.2,.5,tint(B,.1))}
  for(const hx of[x-13.2,x+11.6]){R(g,hx,97.4,1.6,2,D);R(g,hx,97.4,1.6,.5,tint(B,.2))}}
/* the chest against the wall, and on it a round box with rolls standing in it and a blanket folded */
function chestGaius15(g,r){const x=206,w=40,c='#7c5c3a',L='#8e5e3a',P='#d8c79a',wl='#8c8068';
  R(g,x+w,96,3,11,'rgba(40,30,44,.22)');oval(g,x+w/2+3,108.4,w/2+2,1.6,'rgba(24,18,28,.34)');
  for(const fx of[x+1,x+w-4])R(g,fx,106.4,3,1.8,tint(c,-.45));
  plankGaius15(g,x,95.4,w,11.2,c,r,0);ao(g,x,95.4,w,3,'t',.35);R(g,x+w-1.2,95.4,1.2,11.2,tint(c,-.3));R(g,x,95.4,.6,11.2,tint(c,.2));R(g,x,106.1,w,.5,tint(c,-.45));
  poly(g,[x+1,91.8,x+w-1,91.8,x+w+.6,93.4,x-.6,93.4],tint(c,.28));
  plankGaius15(g,x-.6,93.4,w+1.2,2,tint(c,.08),r,0);R(g,x-.6,93.4,w+1.2,.5,tint(c,.42));R(g,x-.6,95.2,w+1.2,.5,tint(c,-.5));
  R(g,x+w/2-1.6,95.8,3.2,3.6,'#8a6c3c');R(g,x+w/2-1.6,95.8,3.2,.5,'#c8a868');R(g,x+w/2-.3,97,.6,1.4,'#1a120c');
  const bx=231;for(const[xx,h,k]of[[1.2,3.6,0],[3.6,5,.06],[6,4.2,-.05],[8,3,.03]]){const p=tint(P,k);R(g,bx+xx,82.4-h,2,h,p);R(g,bx+xx,82.4-h,2,.5,tint(p,.3));R(g,bx+xx+1.5,82.4-h,.5,h,tint(p,-.3))}
  R(g,bx+10.4,84,2,8.6,'rgba(30,22,30,.3)');g.fillStyle=lg(g,bx,0,bx+10.4,0,[tint(L,.22),L,tint(L,-.42)]);g.fillRect(bx,82.4,10.4,10.2);
  R(g,bx,82.2,10.4,.8,tint(L,.34));R(g,bx,84.4,10.4,.6,tint(L,-.4));R(g,bx,90.2,10.4,.6,tint(L,-.4));
  /* the blanket: three thicknesses of one width, the fold at the left */
  R(g,224.4,88.4,1.6,4,'rgba(30,22,30,.25)');for(let i=0;i<3;i++){const yy=92.4-(i+1)*1.7,ww=14.6+(i===1?.6:0);R(g,209.8,yy,ww,1.7,tint(wl,i*.06-.04));R(g,209.8,yy,ww,.5,tint(wl,.24));R(g,209.8,yy+1.2,ww,.5,tint(wl,-.35))}
  R(g,209.4,87.6,.8,4.6,tint(wl,.1))}
/* the table, seen a little from above, and what lies on it: the letter (a long roll of papyrus, partly unrolled: the roll at its left
   end, pointing at us, the sheet open to the right with its columns, the last one begun), ink and a reed, and at the left end the spare
   tablet. No line of the writing reaches an edge of the sheet. */
function tableGaius15(g){const C='#8c6a44',T=TOPGaius15,P='#e4d6ac',PR='#d6c596';
  poly(g,[98,110.6,152,110.6,166,118.6,100,118.6],'rgba(26,20,34,.26)');pool(g,128,114,40,6,'#181420',.3,'source-over');
  for(const lx of[97.6,148.2])R(g,lx,103.4,2.2,8.4,tint(C,-.5));
  g.fillStyle=lg(g,92,0,156,0,[tint(C,.34),tint(C,.24),tint(C,.1)]);poly(g,T);g.fill();
  clipTo(g,()=>poly(g,T),()=>{tex(g,'wood',.3,92,92,64,8,'overlay',.5);ao(g,92,92.5,64,2,'t',.12);R(g,92,96,64,.5,'rgba(60,40,24,.3)')});
  plankGaius15(g,92,99.5,64,1.6,tint(C,.06),rng(31),0);R(g,92,99.5,64,.5,tint(C,.5));
  R(g,94,101.1,60,2.3,tint(C,-.3));R(g,94,101.1,60,.6,tint(C,-.5));
  for(const lx of[93.4,151.4]){plankGaius15(g,lx,101.1,3.2,15.4,tint(C,-.08),rng(37),1);R(g,lx,101.1,.6,15.4,tint(C,.22))}
  /* the spare tablet */
  poly(g,[96.6,94.2,103,94.2,102.6,98.2,95.4,98.2],'rgba(30,20,14,.3)');poly(g,[96,93.6,102.2,93.6,101.8,97.4,94.8,97.4],'#b89460');
  poly(g,[96.9,94.2,101.4,94.2,101.1,96.8,96,96.8],'#2c2a22');R(g,97.6,94.6,2.4,.5,'rgba(120,130,110,.4)');R(g,94.8,97.4,7,.6,'#7a5c36');
  /* the letter */
  poly(g,[109.4,93.4,133.8,93.4,134.6,98,109.2,98],'rgba(40,26,14,.28)');
  g.fillStyle=lg(g,109,0,134,0,[tint(P,.12),P,tint(P,-.06)]);poly(g,[108.6,92.9,133,92.9,133.8,97.4,108.4,97.4]);g.fill();
  for(const[cx,n]of[[111.5,4],[118,4],[124.5,2]])for(let j=0;j<n;j++)R(g,cx,93.5+j,4.5-(n<4&&j===n-1?2:0),.5,'rgba(58,42,30,.7)');
  R(g,133,92.5,1.4,5,tint(P,.1));R(g,133,92.5,.5,5,tint(P,.3));R(g,134.4,93,.6,4.8,'rgba(40,26,14,.3)');
  R(g,109.6,93,1.4,4.4,'rgba(60,40,20,.3)');
  g.fillStyle=lg(g,104.4,0,109.6,0,[tint(PR,.2),PR,tint(PR,-.34)]);g.fillRect(104.4,91.4,5.2,4.4);oval(g,107,91.6,2.6,1.3);g.fill();
  rollEndGaius15(g,107,95.4,2.6,PR);
  /* ink and reed */
  poly(g,[146,97.4,148.4,97.4,149,95.6,146.4,95.6],'rgba(30,20,14,.3)');
  poly(g,[141.2,97.4,141,94.8,141.8,93.6,145.4,93.6,146.2,94.8,146,97.4],'#3a3632');R(g,141.2,94.8,1,2.4,'#6e6a66');
  R(g,141.8,93.4,3.6,.6,'#8a8680');R(g,142.4,93.6,2.4,.6,'#0c0a10');
  stroke(g,[143.6,94,149.6,90.4],'#c8ac6c',1);stroke(g,[143.9,94.3,149.9,90.7],'rgba(90,64,30,.6)',.4)}
/* the table's outline with what stands up from it, for the engine to cut out of the backdrop (see props) */
function tableShapeGaius15(g){const k='#000';poly(g,TOPGaius15,k);R(g,92,99.5,64,1.6,k);R(g,94,101.1,60,2.3,k);
  for(const lx of[93.4,151.4])R(g,lx,101.1,3.2,15.4,k);for(const lx of[97.6,148.2])R(g,lx,103.4,2.2,8.4,k);
  R(g,104.4,91.4,5.2,3,k);oval(g,107,91.6,2.6,1.3,k);R(g,133,92.3,1.4,1,k);stroke(g,[143.6,94,149.6,90.4],k,1.6)}
/* the light of the room, laid over everything: the day from the window, the shade toward the ceiling, the corners and the right,
   the patch the window throws on the floor, and the glow of the coals */
function lightGaius15(g){
  lightmap(g,320,'#86808c',l=>{pool(l,60,84,170,95,'#dfe2ee',.62);pool(l,36,49,40,36,'#f2f4fa',.6);pool(l,86,124,60,16,'#e8ecf6',.5);
    pool(l,124,96,54,26,'#d6d8e0',.45);pool(l,178,101,48,13,'#e8b888',.5);pool(l,286,84,44,54,'#a8a2a0',.5);pool(l,160,130,170,22,'#b4b0b4',.4);
    l.fillStyle=lg(l,0,0,0,30,['rgba(20,16,24,.34)','rgba(20,16,24,0)']);l.fillRect(0,0,320,30);
    l.fillStyle=lg(l,0,124,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.3)']);l.fillRect(0,124,320,20)});
  pool(g,37,49,22,20,'#dfe8f6',.16);
  comp(g,'screen',.2,()=>poly(g,[60,120.4,90,120.4,115,133.4,83,133.4],'#dfe8f8'));comp(g,'screen',.34,()=>poly(g,[62,121,88,121,112,132.6,86,132.6],'#eef2fa'));
  comp(g,'screen',1,()=>{g.fillStyle=lg(g,0,40,0,112,['rgba(220,230,246,.07)','rgba(220,230,246,0)']);poly(g,[25,36,51,36,112,132.6,62,121,25,63]);g.fill()});
  pool(g,178,95,13,4.6,'#ff8a3a',.4);pool(g,178,99,44,10,'#ff9a50',.14);pool(g,180,111,28,4,'#ffb070',.1)}
/* the coals: a few of them brighten and dim, slowly; no flame */
function emberGaius15(g,t){const x=178;
  for(let i=0;i<5;i++){const a=.5+.5*Math.sin(t/(620+i*130)+i*2.3);comp(g,'lighter',.18+.3*a,()=>R(g,x-7.6+i*3.4+(i%2),94.4+(i*3%2)*.9,1.2,.6,'#ff8a30'))}
  pool(g,x,95,12,4.4,'#ff7a2a',.08+.06*Math.sin(t/1700))}
/* ==== ART gaius15: end ==== */

/* ==== ART scale15: begin ==== */
/* The close view: the storeroom table, seen from in front and a little above, with a balance of bronze hanging over it.
   Called from outside (keep these names and what they give back): ART.scale15 · tiltScale15() · weightBoxScale15(id) and
   bagBoxScale15(), which the hotspots of the weights and of the bag read, so that each is clicked where it is painted.
   Reads: sc15() = G.sc15 = {round:0..2, w:{a,g,th,kz: 't' on the board | 'r' in the right pan | 'l' in the left pan, before the bag}},
   F.s3 (all three weighed: the pan is empty, the bags lie in the chest), WT (the weights: id, v its worth, m its number letters),
   ROUND[round] (bag: what the bag weighs, m: the number letters on its letter), WIT15 (the men behind the table: x, w, a: actor id).
   Writes into G.sc15: ang (the beam's angle now), vel and t0 (its swing).
   The light comes from the left, high up, and warm: every shade falls to the right and a little towards us. The men stand back from
   it, behind the table: of each only what lies between the thigh and the shin is seen, the hem of his tunic and his legs, or the
   folds of his mantle; the table's far edge hides his feet, and no hand and no face comes into the picture.
   CROSS RULE: the beam hangs from two cords that run up and far apart out of the picture, a wide triangle, never from one upright;
   nothing points up or down at its middle; it ends at each side in an eye, and from the knot under that eye three cords part
   downward to the pan's rim: two to the near side, left and right, and one to the far side, towards the middle of the balance.
   None of the three hangs straight down, so that none stands on the middle of the rim. No joint is drawn in the table, so that no
   cord crosses one; the grain runs one way and its lines never meet; and where the cords of the hanger pass before the table's far
   edge, the edge is a change of tone and no line. The folds of a tunic end at its hem; a bag's tie is no wider than its neck and
   slants; the rings turned on the beam lie inside its own thickness.
   What stands still is painted once for each round (sceneScale15: the letter, the bags in the chest); the balance, the bag and the
   weights are laid over it as they stand (balanceScale15), then the light, and the frame is dithered like a backdrop, and put
   together anew only while the beam moves (as the sundial of Chapter Thirteen does).
   Geometry: beam pivot 160,36, half-length 70, tilt 6 degrees; pan middles 90,92 and 230,92 when level (the rim's middle lies 5
   lower); the board 96,116,128,22 with the weights at x 112, 144, 176, 208, their feet at y 133; the letter 8,100,62,40; the chest
   262,72,58,72; the men stand along the top, y 0..23. */
ART.scale15={w:320,q:12,variant:()=>'r'+(F.s3?3:sc15().round),paint(g,v){paintScale15(g,+v.slice(1))},light:{amb:'#ffffff'},draw(g,t){drawScale15(g,t)},front(){}};
const SCALE15={pivot:[160,36],half:70,drop:56,deg:6,foot:133,RX:30,RY:6.5,tray:{a:112,g:144,th:176,kz:208},size:{a:[10,9],g:[12,10],th:[14,12],kz:[19,13]},font:{a:5.8,g:6.2,th:6.8,kz:6.6},
  raw:{},work:null,key:null};
/* tiltScale15: 1 the left pan, the bag's, is down; -1 the right pan is down; 0 the beam stands level */
function tiltScale15(){if(F.s3)return 0;const s=sc15(),on=p=>WT.reduce((n,w)=>n+(s.w[w.id]===p?w.v:0),0);return Math.sign(ROUND[s.round].bag+on('l')-on('r'))}
/* panScale15: the middle of a pan, as the beam stands at angle a (radians; more than 0: the left pan is down) */
function panScale15(side,a){const[px,py]=SCALE15.pivot,d=side==='l'?-1:1;return[px+d*SCALE15.half*Math.cos(a),py-d*SCALE15.half*Math.sin(a)+SCALE15.drop]}
/* weightBoxScale15: where a weight lies, [x,y,w,h]: on the board, or in its pan as the beam comes to rest (a: or as it stands now).
   The weights in a pan stand side by side on its floor, the smallest at the left, following the round of the floor; in the left pan
   they stand before the bag. */
function weightBoxScale15(id,a){const s=sc15(),S=SCALE15,[w,h]=S.size[id],p=s.w[id];if(p==='t')return[S.tray[id]-w/2,S.foot-h,w,h];
  const row=WT.filter(q=>s.w[q.id]===p),gap=row.length>3?1:2,tot=row.reduce((n,q)=>n+S.size[q.id][0]+gap,-gap),[cx,cy]=panScale15(p,a==null?tiltScale15()*S.deg*Math.PI/180:a);let x=cx-tot/2;
  for(const q of row){if(q.id===id)break;x+=S.size[q.id][0]+gap}
  const dx=x+w/2-cx;return[x,cy+5+1+3.2*Math.sqrt(Math.max(0,1-dx*dx/900))-h,w,h]}
/* bagBoxScale15: where the bag stands in the left pan as the beam comes to rest, [x,y,w,h]: it rides up and down with its pan */
function bagBoxScale15(){const[cx,cy]=panScale15('l',tiltScale15()*SCALE15.deg*Math.PI/180);return[cx-18,cy-14,36,22]}
/* ---- small tools of this section ---- */
/* splineScale15: a smooth curve through flat points (closed or open), as the current path */
function splineScale15(g,p,closed){const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
  g.beginPath();g.moveTo(p[0],p[1]);
  for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
  if(closed)g.closePath()}
function lineScale15(g,p,c,w){splineScale15(g,p,0);g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();g.lineCap='butt'}
/* grainScale15: the grain of a board, running the long way: fine lines a little lighter or darker than the wood, which all wave alike
   and so never cross. o.sp: how far apart at the far edge and at the near one; o.a: how strong; o.knots: [x,y,k,h], where the lines part
   round a knot. Lays the lines over what is there (inside the current clip). */
function grainScale15(g,x,y,w,h,c,seed,o){o=o||{};const r=rng(seed),f=o.f||.03,p=r()*6,[s0,s1]=o.sp||[.7,.7],A=o.amp||.6,al=o.a||1,K=o.knots||[];
  for(let yy=y-2;yy<y+h+2;){const d=clamp((yy-y)/h,0,1),dark=r()<.56,col=dark?rgba(tint(c,-.4),(.1+r()*.16)*al):rgba(tint(c,.3),(.07+r()*.13)*al),pts=[],am=A*(.5+d);
    for(let xx=x-1;xx<=x+w+2;xx+=2){let v=yy+am*Math.sin(xx*f+p)+am*.4*Math.sin(xx*f*2.7+p*1.7);
      for(const[kx,ky,kk,kh]of K)v+=Math.sign(yy-ky||1)*kk*Math.exp(-(((xx-kx)/(kk*4.5))**2))*Math.exp(-Math.abs(yy-ky)/kh);pts.push(xx,v)}
    stroke(g,pts,col,.5);if(o.streak&&r()<o.streak)stroke(g,pts.slice(0,2*Math.floor(pts.length/2*(.3+r()*.7))).slice(2*Math.floor(r()*40)),dark?rgba(tint(c,-.5),.07+r()*.07):rgba(tint(c,.4),.05+r()*.06),1.5+r()*2.5);
    yy+=(s0+(s1-s0)*d)*(.55+r()*.9)}}
/* shadeScale15: the shade a thing throws on what it lies on: to the right and a little towards us, soft at its edge. p: the thing's
   outline as flat points; d: how high it stands. */
function shadeScale15(g,p,d,a){for(const[k,q]of[[1,.34],[.66,.3],[.33,.36]])comp(g,'multiply',(a||1)*q,()=>poly(g,p.map((v,i)=>i%2?v+d*k*.42:v+d*k),'#4a3c50'))}
/* cordScale15: a cord of twisted flax from one point to another: its shaded side, its lit strand, and the lay of its strands, which
   all slant one way and stay inside the cord's width */
function cordScale15(g,x0,y0,x1,y1,wd,C,D){const dx=x1-x0,dy=y1-y0,n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n,nx=-uy,ny=ux,k=wd*.5;
  stroke(g,[x0+.3,y0+.15,x1+.3,y1+.15],D,wd);stroke(g,[x0,y0,x1,y1],C,wd);
  g.beginPath();for(let d=.7;d<n;d+=1.5){const x=x0+ux*d,y=y0+uy*d;g.moveTo(x-nx*k-ux*.4,y-ny*k-uy*.4);g.lineTo(x+nx*k+ux*.4,y+ny*k+uy*.4)}
  g.strokeStyle=rgba(D,.7);g.lineWidth=.4;g.stroke()}
/* ---- what stands still ---- */
function paintScale15(g,k){sceneScale15(g,k);lightScale15(g)}
function sceneScale15(g,k){backScale15(g);tableScale15(g);clayScale15(g);boardScale15(g);if(k<3)letterScale15(g,k);chestScale15(g,k)}
/* lightScale15: the light over the whole view: warm, from the left, falling off to the right and to the back of the room */
function lightScale15(g){comp(g,'multiply',.62,()=>{g.fillStyle=rg(g,100,88,250,[[0,'#ffffff'],[.4,'#f6f0e6'],[1,'#7f779a']]);g.fillRect(0,0,320,144)});
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,40,300,110,['#ffd49c','rgba(255,212,156,0)']);g.fillRect(0,0,320,144)});
  /* the light of the window falls across the table from the left, a broad band with soft edges */
  for(const[e,a]of[[0,.1],[4,.1],[8,.09],[12,.08]])comp(g,'soft-light',a*1.2,()=>poly(g,[-10,40+e,150-e*2,46+e,236-e*3,128-e,216-e*3,150,-10,150],'#ffe6b4'))}
/* backScale15: behind the table the room is in shade: its floor of beaten earth, and the men who stand there, a step back from
   the light. Over the table's far edge we see of each only what lies between the thigh and the shin: the hem of his tunic and his
   legs, or the long folds of his mantle. The table hides their feet, and their hands hang above the picture.
   MENScale15, in the order of WIT15: x where he stands, hem how low his tunic comes, s how near he is (the nearer the larger),
   gap the room between his knees; cloak: 'side' the mantle hangs down his left side, 'open' down both; long: a mantle to the shin. */
const MENScale15=[{x:22,hem:9.4,s:1,gap:3.2,cloak:'side'},{x:67,hem:8,s:.92,gap:4.4,cloak:'side'},{x:110,s:1.07,long:1},
  {x:211,hem:10,s:1.06,gap:3.8,cloak:'side'},{x:252,s:.95,long:1},{x:298,hem:9.2,s:1,gap:5,turn:1,cloak:'side'}];
function backScale15(g){
  g.fillStyle=lg(g,0,0,320,0,['#6c5a48','#56493e','#453b38']);g.fillRect(0,0,320,24);
  g.fillStyle=lg(g,0,0,0,24,['rgba(24,18,22,.5)','rgba(24,18,22,0)']);g.fillRect(0,0,320,24);
  tex(g,'mott',.45,0,0,320,24,'overlay',1);tex(g,'grain',.12,0,0,320,24,'overlay',.5);
  pool(g,36,16,120,14,'#e0b070',.2,'screen');
  /* each man's shade on the floor, to the right of him */
  MENScale15.forEach(o=>pool(g,o.x+17,15,22,12,'#201826',.6,'multiply'));
  /* the farther ones first */
  WIT15.map((m,i)=>[m,MENScale15[i],i]).sort((p,q)=>p[1].s-q[1].s).forEach(([m,o,i])=>manScale15(g,o,LOOK[m.a],1525+i));
  /* they stand back from the light */
  comp(g,'multiply',.7,()=>{g.fillStyle=lg(g,0,0,320,0,['#b29f90','#8c828e','#746d88']);g.fillRect(0,0,320,24)});
  g.fillStyle=lg(g,0,15,0,24,['rgba(26,20,34,0)','rgba(26,20,34,.5)']);g.fillRect(0,15,320,9)}
/* manScale15: one man, from the thigh to the shin. The folds of his tunic fall to its hem, which rises and dips with them; under it
   his legs stand a little apart: the knee, a shade under the kneecap, the calf swelling outward below it. */
function manScale15(g,o,L,seed){const r=rng(seed),T=L.tunic,C=L.cloak||tint(T,-.3),S=L.skin,u=o.s,cx=o.x,hy=o.hem,lw=(L.slim?6.4:7.3)*u,B=25;
  const fold=(p,c,a)=>{lineScale15(g,p,rgba(tint(c,-.56),a),.8);lineScale15(g,p.map((v,i)=>i%2?v:v-.9),rgba(tint(c,.45),a*.62),.6)};
  const cloth=(c,x0,x1)=>lg(g,x0,0,x1,0,[[0,tint(c,.22)],[.18,tint(c,.06)],[.55,tint(c,-.1)],[1,tint(c,-.44)]]);
  if(o.long){const hw=14.5*u,p=[cx-hw*.9,0,cx+hw*.9,0,cx+hw,B,cx-hw,B];
    /* the long tunic under the mantle */
    clipTo(g,()=>poly(g,p),()=>{g.fillStyle=cloth(T,cx-hw,cx+hw);g.fillRect(cx-hw-1,0,hw*2+2,B);
      for(const k of[-.62,-.2,.16,.5,.8])fold([cx+hw*k,10,cx+hw*(k+.02),B],T,.4);tex(g,'grain',.12,cx-hw-1,0,hw*2+2,B,'overlay',.5)});
    /* the mantle, wound round him: its lower edge slants from his right shin up to his left knee, and its folds fall away to that side */
    const m=[cx-hw-1.6,0,cx+hw+2.8,0,cx+hw+2.4,10.6*u,cx+hw*.3,14.4*u,cx-hw*.5,17.6*u,cx-hw-1.3,19.4*u];
    clipTo(g,()=>poly(g,m),()=>{g.fillStyle=cloth(C,cx-hw-2,cx+hw+3);g.fillRect(cx-hw-3,0,hw*2+7,B);
      fold([cx+hw*.9,0,cx+hw*.5,7*u,cx-hw*.4,15*u,cx-hw-1,17.6*u],C,.5);fold([cx+hw*.3,0,cx-hw*.1,6*u,cx-hw*.8,12*u,cx-hw-2,13.6*u],C,.44);
      fold([cx-hw*.3,0,cx-hw*.7,4.6*u,cx-hw-2,8*u],C,.4);fold([cx+hw*1.16,2,cx+hw*.96,8*u,cx+hw*.5,12.6*u],C,.4);
      tex(g,'grain',.12,cx-hw-3,0,hw*2+7,B,'overlay',.5)});
    lineScale15(g,[cx+hw+2.4,10.2*u,cx+hw*.3,14*u,cx-hw*.5,17.2*u,cx-hw-1.3,19*u],rgba(tint(C,-.6),.6),.7);
    comp(g,'multiply',.4,()=>poly(g,[cx+hw+2.4,10.6*u,cx+hw*.3,14.4*u,cx-hw*.5,17.6*u,cx-hw-1.3,19.4*u,cx-hw-1,21.6*u,cx-hw*.5,19.6*u,cx+hw*.3,16.4*u,cx+hw,12.8*u],'#4a3c50'));
    stroke(g,[cx-hw-1.6,0,cx-hw-1.3,19.4*u],rgba(tint(C,.5),.5),.5);return}
  const gap=(o.gap+1.4)*u,hw=gap/2+lw+4.4*u,ky=hy+4*u;
  /* the legs: the one at the right of the picture stands in the shade of the other */
  for(const d of[1,-1]){const x=cx+d*(gap/2+lw/2)+(o.turn&&d>0?-.6:0),w=lw/2*(o.turn&&d>0?.92:1),ou=d<0?-1:1,
      p=[x-w,hy-2,x-w-.1*u,ky,x-w+.5*u,ky+2.8*u,x-w+(ou<0?-.3:.3)*u,ky+6.2*u,x-w+(ou<0?.7:1.3)*u,B+1,x+w-(ou>0?.7:1.3)*u,B+1,x+w+(ou>0?.3:-.3)*u,ky+6.2*u,x+w-.5*u,ky+2.8*u,x+w+.1*u,ky,x+w,hy-2];
    clipTo(g,()=>splineScale15(g,p,1),()=>{g.fillStyle=lg(g,x-w,0,x+w,0,[[0,tint(S,.26)],[.2,tint(S,.08)],[.58,tint(S,-.14)],[1,tint(S,-.46)]]);g.fillRect(x-w-2,hy-3,lw+4,B-hy+5);
      if(d>0)R(g,x-w-2,hy-3,lw+4,B-hy+5,'rgba(44,26,22,.2)');
      pool(g,x-.6*u,ky-.3,2.4*u,2.1*u,'#fff0d8',.24,'screen');pool(g,x+.3*u,ky+2.4*u,2.7*u,1.1*u,'#4a2a1c',.34,'multiply');
      stroke(g,[x-1*u,ky+3.6*u,x-.5*u,B],rgba(tint(S,.4),.22),.9);
      g.fillStyle=lg(g,0,hy-.5,0,hy+3.4,['rgba(40,22,18,.6)','rgba(40,22,18,0)']);g.fillRect(x-w-2,hy-3,lw+4,7)})}
  /* the tunic: its hem rises and dips with the folds */
  const n=6,hem=[];for(let i=0;i<=n;i++)hem.push(cx-hw+hw*2*i/n,hy+(i%2?.7:-.3)+(r()-.5)*.6);
  const sk=[cx-hw*.9,0,cx+hw*.9,0];for(let i=n;i>=0;i--)sk.push(hem[i*2],hem[i*2+1]);
  clipTo(g,()=>poly(g,sk),()=>{g.fillStyle=cloth(T,cx-hw,cx+hw);g.fillRect(cx-hw-1,0,hw*2+2,hy+3);
    for(let i=1;i<n;i+=1+(i>2?1:0)){const fx=hem[i*2];fold([fx-(fx-cx)*.1,0,fx,hem[i*2+1]],T,.3)}
    g.fillStyle=lg(g,0,hy-2.4,0,hy+1,['rgba(50,34,26,0)','rgba(50,34,26,.3)']);g.fillRect(cx-hw-1,hy-2.4,hw*2+2,4);
    tex(g,'grain',.12,cx-hw-1,0,hw*2+2,hy+3,'overlay',.5)});
  stroke(g,[cx-hw*.9,0,cx-hw,hem[1]],rgba(tint(T,.5),.5),.5);
  /* the mantle */
  for(const d of o.cloak==='open'?[-1,1]:o.cloak?[1]:[]){const wide=o.cloak==='side',a=cx+d*hw*(wide?.2:.56),b=cx+d*(hw+2.8*u),
      p=[a,0,b,0,b-d*.4*u,hy+8.4*u,cx+d*hw*(wide?.8:.9),hy+(wide?10:8.6)*u,cx+d*hw*(wide?.42:.7),hy+(wide?6.4:6.2)*u];
    clipTo(g,()=>poly(g,p),()=>{g.fillStyle=d<0?cloth(C,cx-hw-3*u,cx-hw*.3):cloth(tint(C,-.06),cx-hw*.2,cx+hw+3*u);g.fillRect(cx-hw-4,0,hw*2+8,B);
      fold([cx+d*hw*(wide?.62:.8),0,cx+d*hw*(wide?.68:.84),hy,cx+d*hw*(wide?.78:.9),hy+9*u],C,.46);if(wide)fold([cx+d*hw*1.02,0,cx+d*hw*1.04,hy+2,cx+d*hw*1.0,hy+9*u],C,.4);
      tex(g,'grain',.12,cx-hw-4,0,hw*2+8,B,'overlay',.5)});
    stroke(g,d>0?[a,0,cx+d*hw*(wide?.42:.7),hy+(wide?6.4:6.2)*u]:[b,0,b-d*.4*u,hy+8.4*u],rgba(tint(C,.5),.5),.5)}}
/* tableScale15: the table top, a broad old board of dark wood worn smooth: soft grain running from left to right, closer together
   towards the back, parting round three small knots; stains, a few scratches, none of which meets another, and the worn far edge */
function tableScale15(g){const r=rng(1522),Y=23.5,H=144-Y,W='#6c5a4a';
  g.fillStyle=lg(g,0,Y,0,144,[[0,'#40363a'],[.18,'#52453e'],[.55,'#604f42'],[1,'#675442']]);g.fillRect(0,Y,320,H);
  comp(g,'soft-light',.32,()=>{g.fillStyle=lg(g,0,0,320,0,['#ffd09a','#dccab4','#8f8ea8']);g.fillRect(0,Y,320,H)});
  for(let i=0;i<16;i++){const warm=r()<.5;pool(g,r()*340-10,Y+8+r()*(H-10),30+r()*60,5+r()*10,warm?'#f0d0a0':'#3e3238',warm?.2:.2,warm?'soft-light':'multiply')}
  tex(g,'wood',.1,0,Y,320,H,'soft-light',1.5);tex(g,'blotch',.14,0,Y,320,H,'soft-light',.9);tex(g,'mott',.14,0,Y,320,H,'overlay',.45);
  const KN=[[34,57,1.2,3.4],[244,122,1.7,5],[129,47,1,3]];
  inRect(g,0,Y,320,H,()=>grainScale15(g,0,Y,320,H,W,1523,{sp:[.5,1.9],amp:.7,f:.021,a:.8,knots:KN,streak:.3}));
  for(const[kx,ky,kk]of KN){const p=[];for(let i=0;i<10;i++){const a=i/10*6.2832;p.push(kx+Math.cos(a)*kk*2.3,ky+Math.sin(a)*kk*.6)}
    splineScale15(g,p,1);g.fillStyle=rgba(tint(W,-.4),.75);g.fill();splineScale15(g,p.map((v,i)=>i%2?ky+(v-ky)*.5+.1:kx+(v-kx)*.55),1);g.fillStyle=rgba(tint(W,-.6),.8);g.fill();
    stroke(g,[kx-kk*1.8,ky-kk*.5,kx+kk*.6,ky-kk*.55],rgba(tint(W,.4),.4),.4)}
  /* where hands and things have worn it smooth, a dull sheen */
  pool(g,150,104,120,24,'#ffe8c4',.12,'screen');pool(g,70,60,60,14,'#ffe8c4',.08,'screen');
  /* scratches, each in a place of its own, and small dents */
  for(const[sx,sy,len,an]of[[52,44,9,-.2],[186,52,12,.14],[240,62,7,-.5],[150,80,10,.3],[82,112,6,-.12],[240,106,9,.2],[18,84,8,.44],[196,112,5,-.3],[104,31,7,.1],[282,40,10,-.16]]){
    const ex=sx+Math.cos(an)*len,ey=sy+Math.sin(an)*len*.5;stroke(g,[sx,sy+.5,ex,ey+.5],'rgba(34,24,20,.34)',.5);stroke(g,[sx,sy,ex,ey],'rgba(214,188,150,.3)',.5)}
  for(let i=0;i<120;i++){const x=r()*320,y=Y+1+r()*(H-2);R(g,x,y,.5+(r()<.2?.5:0),.5,'rgba(36,26,22,.4)');if(r()<.5)R(g,x,y+.5,.5,.5,'rgba(226,202,166,.2)')}
  /* the far edge, worn round: its light comes and goes along it; behind it the room is dark */
  g.fillStyle=lg(g,0,Y,0,Y+6,['rgba(30,22,28,.45)','rgba(30,22,28,0)']);g.fillRect(0,Y,320,6);
  /* (no line where the cords of the hanger pass before it: there the edge is only a change of tone) */
  for(let x=0;x<320;){const w=5+r()*20,a=.2+r()*.4;if(x+w<134||x>186)R(g,x,Y,w,.5,rgba('#e6c89a',a));x+=w}
  R(g,0,Y-.5,134,.5,'rgba(24,18,20,.75)');R(g,186,Y-.5,134,.5,'rgba(24,18,20,.75)')}
/* boardScale15: the board the weights stand on, of paler and finer wood, lying on the table: seen a little from above, so its top
   and its near edge show. Each weight has its own shallow bed cut into the board, as wide as itself: an empty bed shows where a
   weight is missing. */
function boardScale15(g){const W='#bfa272',x0=96,x1=224,yt=116.5,yb=134.6,th=3,S=SCALE15,top=[x0+2.4,yt,x1-2.4,yt,x1,yb,x0,yb];
  shadeScale15(g,[x0+2.4,yt,x1-2.4,yt,x1,yb,x1,yb+th,x0,yb+th,x0,yb],3.4);
  comp(g,'multiply',.5,()=>R(g,x0+.5,yb+th,x1-x0,.6,'#3a2c38'));
  clipTo(g,()=>poly(g,top),()=>{g.fillStyle=lg(g,x0,yt,x1,yb,[tint(W,.12),W,tint(W,-.1)]);g.fillRect(x0,yt,x1-x0,yb-yt);
    grainScale15(g,x0,yt,x1-x0,yb-yt,W,1531,{sp:[.6,1.1],amp:.4,f:.05,a:.62});tex(g,'mott',.16,x0,yt,x1-x0,yb-yt,'overlay',.5);
    pool(g,150,125,50,7,'#fff4d8',.14,'screen')});
  R(g,x0+2.4,yt,x1-x0-4.8,.5,tint(W,-.22));stroke(g,[x0+2.4,yt,x0,yb],tint(W,.3),.5);stroke(g,[x1-2.4,yt,x1,yb],tint(W,-.3),.5);
  /* the near edge */
  inRect(g,x0,yb,x1-x0,th,()=>{g.fillStyle=lg(g,x0,0,x1,0,[tint(W,-.3),tint(W,-.4),tint(W,-.5)]);g.fillRect(x0,yb,x1-x0,th);grainScale15(g,x0,yb,x1-x0,th,tint(W,-.4),1532,{sp:[.6,.6],amp:.2,f:.05,a:.7})});
  R(g,x0,yb-.5,x1-x0,.5,tint(W,.34));R(g,x0,yb+th-.5,x1-x0,.5,tint(W,-.64));
  /* the beds */
  for(const w of WT){const[ww]=S.size[w.id],cx=S.tray[w.id],f=S.foot,a=cx-ww/2-1.2,b=cx+ww/2+1.2;
    poly(g,[a+.5,f-4.4,b-.5,f-4.4,b,f+.6,a,f+.6],tint(W,-.17));poly(g,[a+.5,f-4.4,b-.5,f-4.4,b-.4,f-3.4,a+.4,f-3.4],tint(W,-.36));
    g.fillStyle=lg(g,a,0,a+3,0,[rgba(tint(W,-.6),.5),rgba(tint(W,-.6),0)]);poly(g,[a+.4,f-3.4,a+3.2,f-3.4,a+3.2,f+.6,a,f+.6]);g.fill();
    R(g,a,f+.6,b-a,.5,tint(W,.3));stroke(g,[b-.5,f-4.4,b,f+.6],tint(W,.2),.4)}}
/* letterScale15: the letter that came with the bag: a small sheet of papyrus, lying a little askew. Its fibres run one way, across
   it; a few lines in a quick hand, too small to read, which stop short of the edges; the weight in number letters, large; and its
   right edge, which was the inside of the roll, curls up and throws its shade to the right. */
function letterScale15(g,k){const r=rng(1550+k),P='#d8c692',x0=-27,x1=22.6,y0=-18.4,y1=17.6;
  g.save();g.translate(36.6+[0,.8,.3][k],121);g.rotate([-.036,.024,-.014][k]);
  const out=[];for(let x=x0;x<x1;x+=5)out.push(x,y0+(r()-.5)*.5);for(let y=y0;y<y1;y+=6)out.push(x1+(r()-.5)*.3,y);
  for(let x=x1;x>x0;x-=5)out.push(x,y1+(r()-.5)*.6);for(let y=y1;y>y0;y-=6)out.push(x0+(r()-.5)*.6,y);
  shadeScale15(g,out,2);shadeScale15(g,[x1-1,y0,x1+1.6,y0,x1+1.6,y1,x1-1,y1],4.2,.8);
  clipTo(g,()=>poly(g,out),()=>{g.fillStyle=lg(g,x0,y0,x1,y1,[tint(P,.1),P,tint(P,-.08)]);g.fillRect(x0-1,y0-1,x1-x0+2,y1-y0+2);
    /* the fibres: strips a shade lighter or darker, and fine dark threads, all lying the same way */
    for(let y=y0;y<y1;){const h=.5+r()*1.4;R(g,x0-1,y,x1-x0+2,h,r()<.5?rgba(tint(P,-.3),.1+r()*.12):rgba(tint(P,.5),.1+r()*.14));y+=h}
    for(let i=0;i<90;i++){const x=x0+r()*(x1-x0),y=y0+r()*(y1-y0);R(g,x,y,2+r()*9,.5,rgba('#8a6e40',.14+r()*.2))}
    tex(g,'mott',.3,x0-1,y0-1,x1-x0+2,y1-y0+2,'overlay',.6);
    /* its edges, darker with handling */
    for(const[e,x,y,w,h]of[['t',x0,y0,x1-x0,3],['b',x0,y1-3,x1-x0,3],['l',x0,y0,3,y1-y0]])ao(g,x,y,w,h,e,.2,'#6a4a20');
    pool(g,-7,-3,22,13,'#fff6dc',.2,'screen')});
  /* the writing */
  const hand=(x,y,end)=>{let xx=x;while(xx<end-2){const wl=Math.min(end-xx,2.4+r()*6),p=[xx,y-r()*.5];let up=1,X=xx;
      while(X<xx+wl){X+=.45+r()*.9;const q=r();p.push(X,up?y-(q<.12?2.1:q<.3?.5:.8+r()*.7):y+(q<.07?1:r()*.25));up=q<.3?up:!up}
      stroke(g,p,'rgba(54,34,20,.66)',.45);xx=X+1.3+r()*1.6}};
  hand(-23.4,-14.2,13+r()*3);hand(-23.7,-11,14.6+r()*2);hand(-23.2,-7.8,10+r()*4);hand(-23.5,-4.6,-6+r()*5);
  cut15(g,ROUND[k].m,-4.4,4.4,10.4,'rgba(50,30,16,.94)');
  hand(-23.3,12,-4+r()*4);hand(0,15,14+r()*2.6);
  /* the curl of the right edge: the sheet rises, turns over and shows its back */
  const cu=[x1-5.4,y0+.5,x1+.9,y0-.6,x1+1.5,y1+.7,x1-5,y1-.2];
  clipTo(g,()=>poly(g,cu),()=>{g.fillStyle=lg(g,x1-5.4,0,x1+1.5,0,[[0,rgba(P,0)],[.3,'#f4e9c0'],[.5,'#fdf6d6'],[.68,'#e2cf9c'],[.86,'#b49a62'],[1,'#7c6036']]);g.fillRect(x1-6,y0-1,8,y1-y0+2);
    for(const fx of[x1-1.6,x1-.2])stroke(g,[fx,y0,fx+.3,y1],'rgba(120,96,56,.3)',.4)});
  stroke(g,[x1+1,y0-.5,x1+1.5,y1+.7],'rgba(84,62,32,.8)',.5);
  /* its near end: the lifted edge seen end on, a short slant, and the hollow under it */
  poly(g,[x1-4.6,y1-.3,x1+1.5,y1+.7,x1+.9,y1+1.7,x1-2.6,y1+.9],'#5c4426');poly(g,[x1-4.6,y1-.3,x1+1.5,y1+.7,x1+1.3,y1+1.1,x1-3.6,y1+.2],'#cdb884');
  g.restore()}
/* chestScale15: the chest at the right edge, open: its lid stands up behind it and leans back; we look into it over its near wall.
   The sealed bags of the rounds that are done stand in it on a folded cloth. Its boards run the long way, and nothing is laid
   across them. */
function chestScale15(g,k){const C='#73502f',x0=263,yl=73,yb=87.6,yi=104.6,yf=107.6;
  const board=(p,c,seed,o)=>clipTo(g,()=>poly(g,p),()=>{const xs=p.filter((v,i)=>!(i%2)),ys=p.filter((v,i)=>i%2),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
    R(g,x,y,w,h,c);grainScale15(g,x,y,w,h,c,seed,Object.assign({sp:[.7,1],amp:.5,f:.045,a:.8},o));tex(g,'mott',.2,x,y,w,h,'overlay',.5)});
  /* the lid: its inner side, a frame round a sunk panel, in half shade */
  board([x0+3,yl,320,yl,320,yb,x0+1.4,yb],tint(C,-.12),1541);
  board([x0+6.6,yl+3,320,yl+3,320,yb-2.6,x0+5.6,yb-2.6],tint(C,-.3),1542);
  g.fillStyle=lg(g,0,yl+3,0,yl+6.5,['rgba(20,12,8,.55)','rgba(20,12,8,0)']);g.fillRect(x0+6.6,yl+3,60,3.5);
  g.fillStyle=lg(g,x0+6,0,x0+10,0,['rgba(20,12,8,.5)','rgba(20,12,8,0)']);g.fillRect(x0+6,yl+3,4,yb-yl-5.6);
  R(g,x0+5.6,yb-2.6,60,.5,tint(C,.16));
  poly(g,[x0+1.4,yb,x0+3,yl,x0+4.4,yl,x0+2.9,yb],tint(C,.34));R(g,x0+3,yl-.5,57,.7,tint(C,.4));
  g.fillStyle=lg(g,0,yb-5,0,yb,['rgba(20,12,8,0)','rgba(20,12,8,.4)']);g.fillRect(x0+3,yb-5,57,5);
  /* inside: the far wall, dark, and the folded cloth the bags stand on */
  g.fillStyle=lg(g,0,yb,0,yi,['#46301c','#2a1a10']);g.fillRect(x0+2,yb,58,yi-yb);tex(g,'wood',.3,x0+2,yb,58,yi-yb,'overlay',.5);
  g.fillStyle=lg(g,x0+2,0,x0+16,0,['rgba(10,6,4,.7)','rgba(10,6,4,0)']);g.fillRect(x0+2,yb,14,yi-yb);
  inRect(g,x0+2,yb,58,yi-yb,()=>{splineScale15(g,[x0-6,97.4,x0+12,96.2,x0+24,97.6,x0+38,96,x0+50,97.2,x0+66,96.4,x0+66,yi+4,x0-6,yi+4],1);g.fillStyle=lg(g,x0,0,320,0,['#30241c','#5c4838','#6a5440']);g.fill();
    lineScale15(g,[x0+10,98.8,x0+24,99.8,x0+40,98.4,x0+58,99.4],'rgba(150,124,96,.5)',.5);lineScale15(g,[x0+14,101.8,x0+30,102.6,x0+46,101.4,x0+60,102],'rgba(20,14,16,.5)',.6)});
  inRect(g,x0+3,76,58,yi-76,()=>{for(const[i,bx,bby]of[[1,308.5,111.6],[2,296,109.6],[0,281.5,111.2]])if(i<k)bagScale15(g,bx,bby,i,{sealed:1})});
  /* the rims of the walls, and the near wall */
  R(g,x0+2,yb-.4,58,1.3,tint(C,.1));poly(g,[x0,yf,x0+1.6,yb,x0+3.3,yb+1,x0+2.5,yi],tint(C,.36));
  g.fillStyle=lg(g,x0+2.4,0,x0+8,0,['rgba(10,6,4,.6)','rgba(10,6,4,0)']);g.fillRect(x0+2.6,yb+1,5,yi-yb-1);
  board([x0,yf,x0+2.5,yi,320,yi,320,yf],tint(C,.3),1543,{a:.5});R(g,x0+2.5,yi,58,.5,tint(C,.5));
  let y=yf,n=0;for(const h of[12.4,12.6,12]){board([x0,y,320,y,320,y+h,x0,y+h],tint(C,[0,-.08,.04][n]-n*.05),1544+n,{sp:[.8,1.2],amp:.8,f:.04});
    R(g,x0,y,57,.5,n?tint(C,-.5):tint(C,.14));if(n)R(g,x0,y+.5,57,.5,rgba(tint(C,.4),.5));
    for(const ny of[y+3.4,y+h-3.6]){R(g,x0+3,ny,1,1,tint(C,-.6));R(g,x0+3,ny+1,1,.5,rgba(tint(C,.5),.6))}y+=h;n++}
  g.fillStyle=lg(g,0,yf,0,144,['rgba(20,12,10,0)','rgba(20,12,10,.34)']);g.fillRect(x0,yf,57,144-yf);
  g.fillStyle=lg(g,0,yf,0,yf+4,['rgba(20,12,10,.4)','rgba(20,12,10,0)']);g.fillRect(x0,yf+.5,57,4);
  R(g,x0,yf,.7,144-yf,tint(C,.42))}
/* clayScale15: the clay for the seals, on the table beyond the chest, where the light is weak: a saucer of red earthenware, seen a
   little from above like the pans, and in it a lump of moist clay with the hollow a thumb has left where a piece was taken */
function clayScale15(g){const cx=285,cy=50,C='#a9694b',K='#8a6450';
  pool(g,cx+5,cy+2.6,11,3.4,'#1e1626',.7,'multiply');
  g.beginPath();g.ellipse(cx,cy,8.6,2.8+1.8,0,0,Math.PI);g.closePath();g.fillStyle=lg(g,cx-8.6,0,cx+8.6,0,[tint(C,.1),tint(C,-.2),tint(C,-.5)]);g.fill();
  oval(g,cx,cy,8.6,2.8,lg(g,cx-8.6,0,cx+8.6,0,[tint(C,.36),tint(C,.12),tint(C,-.2)]));
  oval(g,cx,cy+.2,7.2,2,lg(g,cx-7.2,0,cx+7.2,0,[tint(C,-.5),tint(C,-.3),tint(C,-.06)]));
  /* the lump */
  const p=[cx-5.6,cy+.8,cx-5.2,cy-.9,cx-3,cy-2.2,cx-.6,cy-2,cx+1,cy-1.2,cx+2.6,cy-1.5,cx+4.2,cy-.4,cx+3.6,cy+1.1,cx+.6,cy+1.6,cx-3,cy+1.6];
  splineScale15(g,p,1);g.fillStyle=tint(K,-.4);g.fill();
  clipTo(g,()=>splineScale15(g,p,1),()=>{g.fillStyle=lg(g,cx-5,cy-3,cx+5,cy+2,[tint(K,.3),K,tint(K,-.34)]);g.fillRect(cx-6,cy-4,12,7);
    pool(g,cx+1,cy-.9,1.8,1,'#2c1c18',.55,'multiply');pool(g,cx-2.8,cy-1.2,2.2,1,'#ffe8d0',.4,'screen');tex(g,'mott',.3,cx-6,cy-4,12,7,'overlay',.4)})}
/* ---- what moves ---- */
/* drawScale15: the balance as it stands. The beam swings to its rest and settles there (G.sc15.ang, with its speed vel), the pans
   hang plumb under its ends all the while, and the bag and the weights ride with their pans. The frame is put together and dithered
   only when something in it has changed. */
function drawScale15(g,t){const s=sc15(),S=SCALE15,want=tiltScale15()*S.deg*Math.PI/180,k=F.s3?3:s.round;
  if(s.ang==null){s.ang=want;s.vel=0}
  const dt=s.t0==null?0:clamp((t-s.t0)/1000,0,.05);s.t0=t;
  if(s.ang!==want||s.vel){const n=Math.ceil(dt/.004);for(let i=0;i<n;i++){const h=dt/n;s.vel=(s.vel||0)+((want-s.ang)*38-(s.vel||0)*6.2)*h;s.ang+=s.vel*h}
    if(Math.abs(want-s.ang)<.0012&&Math.abs(s.vel||0)<.006){s.ang=want;s.vel=0}}
  const key=k+WT.map(w=>s.w[w.id]).join('')+Math.round(s.ang*3000);
  if(!S.work)S.work=mk(320*HR,144*HR);
  if(S.key!==key){S.key=key;const[c,w]=S.work;
    if(!S.raw[k]){const[rc,rg2]=mk(320*HR,144*HR);rg2.scale(HR,HR);sceneScale15(rg2,k);S.raw[k]=rc}
    w.setTransform(1,0,0,1,0,0);w.globalCompositeOperation='source-over';w.globalAlpha=1;w.drawImage(S.raw[k],0,0);w.setTransform(HR,0,0,HR,0,0);
    balanceScale15(w,s,s.ang,k);lightScale15(w);w.setTransform(1,0,0,1,0,0);finish(c,w,12)}
  g.drawImage(S.work[0],0,0,320,144)}
/* balanceScale15: the hanger, the beam at angle a, the two pans with what lies in them, and the weights on the board */
function balanceScale15(g,s,a,k){const S=SCALE15,[px,py]=S.pivot,FL='#d6c69c',FD='#6e5c3e',pans=[['l',panScale15('l',a)],['r',panScale15('r',a)]];
  /* the shade of each pan on the table under it: nearer and sharper as the pan comes down */
  for(const[side,[cx,cy]]of pans){const up=clamp(13-(cy-92),3,22),x=cx+up*.62,y=110.4+up*.1;
    pool(g,x,y,S.RX+6+up*.5,8+up*.22,'#1e1626',.74-up*.012,'multiply');pool(g,x,y,S.RX-up*.3,5.8-up*.06,'#1e1626',.8-up*.02,'multiply')}
  /* the weights that stand on the board */
  for(const w of WT)if(s.w[w.id]==='t')weightScale15(g,w,weightBoxScale15(w.id));
  /* the hanger: two cords out of the eye at the middle of the beam, parting widely upward */
  cordScale15(g,px-.6,py-2.6,133,-1,1.3,FL,FD);cordScale15(g,px+.6,py-2.6,187,-1,1.3,tint(FL,-.1),FD);
  beamScale15(g,px,py,a);
  /* the knot of the hanger, on the beam */
  poly(g,[px-1.9,py-2.4,px-1,py-4,px+1.1,py-4,px+2,py-2.4,px+1,py-1.6,px-1,py-1.6],FD);poly(g,[px-1.4,py-2.6,px-.7,py-3.7,px+.6,py-3.7,px+.4,py-2.4],FL);
  for(const[side,[cx,cy]]of pans){const ex=cx,ey=cy-S.drop+2.2,ry=cy+5;
    const bk=side==='l'?1:-1;cordScale15(g,ex,ey,cx+bk*S.RX*.5,ry-S.RY*.866+.8,.8,tint(FL,-.16),FD);
    dishScale15(g,cx,ry,0);
    if(side==='l'&&k<3)bagScale15(g,cx-.5,ry+2.4,k);
    for(const w of WT)if(s.w[w.id]===side)weightScale15(g,w,weightBoxScale15(w.id,a),1);
    dishScale15(g,cx,ry,1);
    for(const d of[-1,1]){const rx=cx+d*S.RX*.906,ryy=ry+S.RY*.42-.5;cordScale15(g,ex,ey,rx,ryy,.8,d<0?FL:tint(FL,-.1),FD);R(g,rx-.75,ryy-.5,1.5,1.5,'#4e3a1c');R(g,rx-.75,ryy-.5,1,.5,'#e8cc88')}
    /* the knot under the eye, where the three cords meet */
    poly(g,[ex-1.3,ey-.9,ex+1.3,ey-.9,ex+.9,ey+1.1,ex-.9,ey+1.1],FD);R(g,ex-1,ey-.9,1,1,FL)}}
/* beamScale15: the beam, turned round its middle: a bar of bronze, thickest at the middle and tapering to both ends, with a pair
   of turned rings near each end and beside the middle (drawn inside the bar's own thickness) and an eye at each end. Green sits
   in the hollows between the rings and along the underside. */
function beamScale15(g,px,py,a){const H=SCALE15.half,th=x=>1.3+1.7*Math.pow(1-Math.abs(x)/H,1.3),top=[],bot=[];
  g.save();g.translate(px,py);g.rotate(-a);
  for(let i=0;i<=44;i++){const x=(-H+1.8)+(2*H-3.6)*i/44;top.push(x,-th(x));bot.unshift(x,th(x))}
  /* the eyes at the ends */
  for(const d of[-1,1]){const x=d*H;poly(g,[x-2.3,-1.3,x-1.3,-2.3,x+1.3,-2.3,x+2.3,-1.3,x+2.3,1.3,x+1.3,2.3,x-1.3,2.3,x-2.3,1.3],'#59411f');
    poly(g,[x-1.8,-1.2,x-1.2,-1.8,x+1.2,-1.8,x+1.8,-1.2,x+1.8,1,x+1.2,1.6,x-1.2,1.6,x-1.8,1],'#b38d4c');poly(g,[x-1.8,-1.2,x-1.2,-1.8,x+1,-1.8,x+.2,-1,x-1,-.4],'#ecd08c');
    R(g,x-.75,-.5,1.5,1.5,'#2a1c0c')}
  poly(g,top.concat(bot));g.fillStyle=lg(g,0,-3,0,3.1,[[0,'#f2d894'],[.22,'#cfa85c'],[.55,'#a8823f'],[.82,'#765628'],[1,'#4c3618']]);g.fill();
  clipTo(g,()=>poly(g,top.concat(bot)),()=>{
    /* the light is from the left: that half shines more */
    g.fillStyle=lg(g,-H,0,H,0,['rgba(255,236,180,.28)','rgba(255,236,180,.05)','rgba(40,26,20,.25)']);g.fillRect(-H,-4,2*H,8);
    tex(g,'mott',.3,-H,-4,2*H,8,'overlay',.4);
    for(const x of[-59,-54.5,-9.5,9.5,54.5,59]){R(g,x-.5,-4,1,8,'rgba(60,40,16,.5)');R(g,x+.5,-4,.5,8,'rgba(255,236,180,.26)')}
    /* green in the hollows */
    {const q=rng(1575);for(const cxx of[-56.7,-9.5,9.5,56.7])for(let i=0;i<9;i++)R(g,cxx-2.6+q()*5.2,-.4+q()*2.6,.5+q()*1.2,.5,rgba('#6c9c84',.25+q()*.45));
      for(let i=0;i<40;i++){const x=(q()*2-1)*(H-4);R(g,x,th(x)-.5-q()*q()*1.2,.5+q()*2.2,.5,rgba('#6c9c84',.14+q()*.3))}}
    R(g,-1,-.9,2,1.6,'#2a1c0c')});
  stroke(g,top.map((v,i)=>i%2?v+.3:v),'rgba(255,246,204,.75)',.45);
  g.restore()}
/* dishScale15: a pan, a shallow dish of bronze whose rim's middle is at cx, ry. part 0: the dish, before anything is laid in it:
   its outside under the near rim, the rim, and the hollow, where the left side lies in the rim's shade and the right side is lit;
   part 1: the near rim again, over what lies in the pan. */
function dishScale15(g,cx,ry,part){const{RX,RY}=SCALE15,ring=()=>{g.beginPath();g.ellipse(cx,ry,RX,RY,0,0,6.2832);g.ellipse(cx,ry+.25,RX-2.3,RY-1.45,0,0,6.2832)};
  const rim=()=>{ring();g.fillStyle=lg(g,cx-RX,0,cx+RX,0,[[0,'#e8cc88'],[.25,'#f6e2a4'],[.55,'#c49c54'],[1,'#806030']]);g.fill('evenodd')};
  if(part){clipTo(g,()=>{g.beginPath();g.rect(cx-RX-1,ry+1.6,RX*2+2,RY+2)},()=>{rim();
      g.beginPath();g.ellipse(cx,ry,RX,RY,0,.5,2.64);g.strokeStyle='rgba(74,52,22,.7)';g.lineWidth=.5;g.stroke()});return}
  /* the outside of the dish */
  const under=()=>{g.beginPath();g.ellipse(cx,ry,RX,RY+4.4,0,0,Math.PI);g.closePath()};
  clipTo(g,under,()=>{g.fillStyle=lg(g,cx-RX,0,cx+RX,0,[[0,'#7c5a2c'],[.14,'#d0a65c'],[.34,'#a67e42'],[.7,'#78582a'],[1,'#482f16']]);g.fillRect(cx-RX,ry,RX*2,RY+5);
    g.fillStyle=lg(g,0,ry+RY-2,0,ry+RY+4.6,['rgba(40,26,12,0)','rgba(40,26,12,.62)']);g.fillRect(cx-RX,ry,RX*2,RY+5);
    tex(g,'mott',.3,cx-RX,ry,RX*2,RY+5,'overlay',.4);
    /* green under the rim, and the table's warm light on the underside */
    {const q=rng(1571+(cx>160?1:0));for(let i=0;i<34;i++){const dx=(q()*2-1)*(RX-2),yy=ry+RY*Math.sqrt(1-dx*dx/(RX*RX))+.2+q()*q()*2.2;R(g,cx+dx,yy,.5+q()*2,.5,rgba('#6c9c84',.2+q()*.4))}}
    g.beginPath();g.ellipse(cx,ry,RX-1.5,RY+3.6,0,.5,2.5);g.strokeStyle='rgba(226,160,96,.32)';g.lineWidth=.7;g.stroke()});
  g.save();g.translate(cx-17,ry+7.4);g.rotate(.26);g.fillStyle='rgba(255,244,204,.7)';g.fillRect(-3.4,-.4,6.8,.8);g.restore();
  rim();
  /* the hollow */
  const inn=()=>{g.beginPath();g.ellipse(cx,ry+.25,RX-2.3,RY-1.45,0,0,6.2832)};
  clipTo(g,inn,()=>{g.fillStyle=lg(g,cx-RX,0,cx+RX,0,[[0,'#36260f'],[.24,'#604622'],[.6,'#8c6c36'],[1,'#ba9650']]);g.fillRect(cx-RX,ry-RY,RX*2,RY*2+1);
    /* the far wall of the dish is steeper and darker at the top; the floor lies lower and takes the light */
    g.fillStyle=lg(g,0,ry-RY,0,ry-RY+4,['rgba(30,20,10,.5)','rgba(30,20,10,0)']);g.fillRect(cx-RX,ry-RY,RX*2,4);
    g.beginPath();g.ellipse(cx+1,ry+1.5,RX-7.5,RY-3.3,0,0,6.2832);g.fillStyle='rgba(226,196,124,.22)';g.fill();
    g.beginPath();g.ellipse(cx+1,ry+1.5,RX-7.5,RY-3.3,0,3.3,6.1);g.strokeStyle='rgba(60,84,66,.34)';g.lineWidth=.6;g.stroke();
    {const q=rng(1573+(cx>160?1:0));for(let i=0;i<16;i++){const a=3.3+q()*2.8;R(g,cx+1+Math.cos(a)*(RX-7.5)-.5,ry+1.5+Math.sin(a)*(RY-3.3)-.3+q()*.6,.5+q()*1.8,.5,rgba('#6c9c84',.25+q()*.35))}}
    g.beginPath();g.ellipse(cx+1,ry+1.7,RX-13,RY-4.3,0,0,6.2832);g.strokeStyle='rgba(60,40,18,.22)';g.lineWidth=.4;g.stroke();
    tex(g,'mott',.34,cx-RX,ry-RY,RX*2,RY*2+1,'overlay',.4);
    pool(g,cx+10,ry+2,12,2.4,'#fff0c0',.2,'screen')});
  g.beginPath();g.ellipse(cx,ry+.25,RX-2.3,RY-1.45,0,3.2,6.2);g.strokeStyle='rgba(50,34,14,.6)';g.lineWidth=.5;g.stroke()}
/* BAGScale15: each round's bag: its cloth, its tie, and its build (how wide, how tall, how its neck leans) */
const BAGScale15=[['#b9a172','#7a3a2a',{w:1,h:1,lean:.8}],['#a0958a','#3a4a6a',{w:.93,h:1.05,lean:-1.2}],['#b08a5e','#4a5a3a',{w:1.05,h:.94,lean:1.6}]];
/* bagScale15: a bag of cloth, heavy with coin, standing with its foot at cx, by: it sags, widest low down, with coins pressing out
   here and there; folds run down from its neck, which is gathered and tied: the tie is as wide as the neck and no wider, it slants,
   and its knot and two ends hang at one side. Above the tie the mouth of the bag stands in pleats. o.sealed: clay over the knot,
   with the mark of a seal. */
function bagScale15(g,cx,by,k,o){o=o||{};const[C,T2,sh]=BAGScale15[k],r=rng(1560+k),ln=sh.lean,X=v=>cx+v*sh.w,Y=v=>by+v*sh.h,nx=cx+ln,ny=Y(-15.4);
  const raw=[-13.6,.5,-17.4,-2.4,-18,-6.2,-15,-10.2,-9.4,-13.4,-3.6,-15.4,3.4,-15.5,8.8,-13.7,14.4,-10.8,17.7,-6.8,18,-2.8,14.4,.5,6,1.3,-6,1.4],out=[];
  for(let i=0;i<raw.length;i+=2){const nk=i===10||i===12,q=nk?0:(r()-.5)*.9;out.push(X(raw[i])+(nk?ln:q),Y(raw[i+1])+(nk?0:q*.6))}
  if(!o.sealed)pool(g,cx+12,by-.6,17,3.6,'#2a1c10',.6,'multiply');
  splineScale15(g,out,1);g.fillStyle=tint(C,-.3);g.fill();
  clipTo(g,()=>splineScale15(g,out,1),()=>{g.fillStyle=lg(g,X(-18),0,X(18),0,[[0,tint(C,.26)],[.28,tint(C,.12)],[.58,C],[.84,tint(C,-.24)],[1,tint(C,-.44)]]);g.fillRect(cx-22,by-24,44,28);
    g.fillStyle=lg(g,0,by-7,0,by+1.6,['rgba(58,38,24,0)','rgba(58,38,24,.46)']);g.fillRect(cx-22,by-8,44,11);
    pool(g,X(-8),Y(-8.4),9,5,'#fff4dc',.26,'screen');
    /* folds from the neck */
    for(const[ox,ex,ey]of[[-2.6,-14.5,-5],[-1.4,-9,-2.4],[.2,-2.5,-4.6],[1.6,5.6,-2],[2.8,13,-5.6]]){const p=[nx+ox,ny+.6,nx+ox+(X(ex)-nx-ox)*.4,ny+3.6+r(),X(ex),Y(ey)];
      lineScale15(g,p,rgba(tint(C,-.56),.4),.7);lineScale15(g,p.map((v,i)=>i%2?v:v-.8),rgba(tint(C,.5),.3),.5)}
    /* the coins press out */
    for(const[lx,ly]of[[-10.5,-3.4],[-2,-2.2],[7.5,-4.4],[2.6,-8]]){pool(g,X(lx)-1,Y(ly)-.7,3.2,2.2,'#fff0d0',.24,'screen');pool(g,X(lx)+1.3,Y(ly)+.9,3.4,2.2,'#3a2414',.26,'multiply')}
    tex(g,'grain',.16,cx-22,by-24,44,28,'overlay',.5);tex(g,'mott',.2,cx-22,by-24,44,28,'overlay',.4)});
  /* the mouth above the tie, in pleats */
  const M=(p,c)=>poly(g,p.map((v,i)=>i%2?ny+v*sh.h:nx+v),c);
  M([-3.5,.3,-6.8,-3.8,-4.4,-5.8,-1.5,-4.2,.8,-6.3,3.6,-4.5,6.6,-5.2,3.5,.2],tint(C,.04));
  M([-3.5,.3,-6.8,-3.8,-4.4,-5.8,-2.6,.2],tint(C,.24));M([-1.5,-4.2,-.4,.2,1,.2,.8,-6.3],tint(C,-.26));M([3.6,-4.5,2.2,.2,3.5,.2,6.6,-5.2],tint(C,-.4));
  /* the tie, its knot and its ends */
  stroke(g,[nx-3.5,ny+.6,nx+3.5,ny-.3],tint(T2,-.3),1.7);stroke(g,[nx-3.5,ny+.3,nx+3.3,ny-.6],T2,1);stroke(g,[nx-3.2,ny,nx,ny-.5],tint(T2,.4),.4);
  if(o.sealed){const sx=nx+3.4,sy=ny+.9;poly(g,[sx-2.6,sy-.6,sx-1.2,sy-2.2,sx+1.6,sy-2,sx+2.8,sy-.2,sx+2,sy+1.8,sx-1.4,sy+2],'#6a4030');
    poly(g,[sx-2.1,sy-.6,sx-1,sy-1.8,sx+1.4,sy-1.6,sx+2.2,sy-.2,sx+1.6,sy+1.3,sx-1.2,sy+1.4],'#96604a');R(g,sx-1.6,sy-1.5,2,.5,'#c08e72');
    R(g,sx-.75,sy-.6,1.5,1.5,'#643a2c');R(g,sx-.75,sy+.4,1.5,.5,'#b88468')}
  else{lineScale15(g,[nx+3.6,ny,nx+5.8,ny+2.2,nx+6.5,ny+5.4],tint(T2,-.2),.7);lineScale15(g,[nx+3.5,ny+.5,nx+4.4,ny+3,nx+3.7,ny+5.8],T2,.7);
    poly(g,[nx+2.5,ny-1.1,nx+4.4,ny-1.2,nx+4.8,ny+.5,nx+3.2,ny+1.2,nx+2.3,ny+.4],tint(T2,-.2));R(g,nx+2.8,ny-.9,1,.5,tint(T2,.4))}}
/* weightScale15: a weight, a block of cast bronze a little wider at its foot: its top, which takes the light, and its front, into
   which its number letters are cut, crisp, with the light caught on the lower lip of the cut; green in the corners of its foot.
   inPan: its shade falls on the bronze of the pan. */
function weightScale15(g,w,[x,y,ww,h],inPan){const ht=Math.max(2.4,h*.25),f=x+ww,b=y+h,front=[x,b,x+.9,y+ht,f-.9,y+ht,f,b],top=[x+.9,y+ht,x+2,y,f-2,y,f-.9,y+ht];
  shadeScale15(g,[f-1.4,y+ht,f,b,x+2,b],inPan?2.2:3,inPan?1.1:1.25);comp(g,'multiply',.5,()=>R(g,x-.2,b-.3,ww+.6,.8,'#3a2a30'));
  poly(g,front);g.fillStyle=lg(g,x,y+ht,f,b,[[0,'#b8904e'],[.45,'#9a753a'],[1,'#6c4e26']]);g.fill();
  clipTo(g,()=>poly(g,front),()=>{tex(g,'mott',.34,x,y,ww,h,'overlay',.35);
    g.fillStyle=lg(g,0,b-2.4,0,b,['rgba(50,32,14,0)','rgba(50,32,14,.5)']);g.fillRect(x,b-2.4,ww,2.4);
    poly(g,[f-2,y+ht,f,y+ht,f,b,f-1.3,b],'rgba(52,34,14,.5)');poly(g,[x,b,x+.9,y+ht,x+1.5,y+ht,x+.7,b],'rgba(255,232,170,.4)');
    poly(g,[x,b,x+.2,b-1.3,x+1.2,b-.5,x+2,b],'rgba(104,150,126,.5)');poly(g,[f,b,f-.2,b-1,f-1.6,b-.3,f-2.4,b],'rgba(86,130,110,.45)')});
  poly(g,top);g.fillStyle=lg(g,x,y,f,y+ht,[[0,'#f0d79c'],[.5,'#d6b26a'],[1,'#b28c4c']]);g.fill();
  R(g,x+.9,y+ht-.25,ww-1.8,.5,'#fff0c0');R(g,x+2,y,ww-4,.5,'rgba(120,90,44,.5)');
  cut15(g,w.m,x+ww/2,y+ht+(h-ht)/2+.3,SCALE15.font[w.id],'rgba(34,22,10,.96)','rgba(255,234,172,.6)')}
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
/* The close view: the plan in the wet sand at the foot of the quay, seen from straight above, in the low sun of the morning.
   Called from outside: ART.sand15 only.
   Reads: F.way, F.shell, F.awl (one backdrop for each state), PEB15 (the pebbles: id, x, y).
   How it is painted: the sand is not drawn but modelled. Every canvas pixel gets a height (the lie of the sand, its grain, the grooves
   with their lips, the dents of the way, the stones and the shell), a colour of its own and a gloss; lightSand15 then lets one low sun
   shine over it, from the right and a little from the foot of the picture (SUNSand15), so that whatever stands up has a lit side, a
   shaded side and a shadow that falls to the upper left, and whatever is wet gleams. No groove runs along that light.
   The plan is a man's quick drawing, two strokes of a reed: Greece from the foot of the picture up, round the bay where Thessalonica
   lies, over the three-fingered land beyond it and along Macedonia; then, after the gap of the strait, Asia from Troas down and away to
   the right, towards Syria. The sea between is left smooth. NO groove crosses or meets another: the two strokes end apart.
   Pebbles, each a different stone, pressed in: Cenchreae 86,104 · Beroea 96,56 · Thessalonica 128,44 · Philippi 176,34 · Troas 236,62 ·
   Ephesus 248,100 (hotspots 14x12 round each). The road north is the land between Cenchreae and Beroea (hotspot 78,60,24,36), the
   sea lane to Syria the open water at the foot (150,112,150,24).
   F.way: dents of the reed, set like steps, from pebble to pebble: Cenchreae, Beroea, Thessalonica, Philippi; always on the land, never
   over a groove. F.shell: a ribbed shell beside the pebble for Troas. F.awl: the awl stuck in the sand beside the pebble for Philippi,
   slanting, handle and blade in one line; its shadow leaves from its foot, as the second leg of a V, so that the two never make a cross.
   At the left the edge of a wavelet that is running back, with the weed and the grit it left; nothing there comes near a groove.
   Nothing is lettered. The only thing that moves is the glint of the sun on the water (drawSand15). */
ART.sand15={w:320,q:12,variant:()=>(F.way?'w':'')+(F.shell?'s':'')+(F.awl?'a':''),paint(g,v){paintSand15(g,v)},light:{amb:'#ffffff'},draw(g,t){drawSand15(g,t)},front(){}};
/* the sun: the direction towards it in the picture, and the tangent of its height */
const SUNSand15=[.883,.469,.45];
/* the two strokes of the reed, as points the line is led through; the first begins below the picture */
const COASTSand15=[
  [104,152,103.4,141,101.4,132,102.6,124,100.6,116.5,97.4,110.4,96.6,104.6,98.8,100,103.6,98,108.4,96,110.4,91.4,108.6,86,106.2,80,105.6,73.4,108.2,67,113,61.6,
   118.6,57.2,124.6,54.2,131,53.6,135.6,55.4,138.6,60,142.2,64.8,147.4,65.6,151.2,62.4,155.2,65.6,160,65.2,163.4,60.4,165.4,54,168.4,49,173.6,46,181,44.6,
   190,44.8,200,43.2,209,40.6,216,38.2,222.4,36.4],
  [227.4,45.6,226,52,224.2,58.4,224,64.4,226.6,70.2,231.2,74.2,231,79.6,232.6,85,236.4,88.6,236.2,93.6,236.6,99,237.2,104.4,240,108.4,246.6,110.2,256,110,268,109.4,
   282,109,296,107.6,309,105.6,326,103.6]];
/* the way: three legs, each from one pebble to the next */
const WAYSand15=[[86.8,95.6,87.2,89.4,88.4,82,90.4,74,92.8,67.4,94.8,62.4],[104,54.4,109.6,52.2,115.4,49.6,120.6,47.2],[135.2,42.2,142,40.8,150,39.6,158,38.2,163.6,36.8,168.2,35.4]];
/* the six stones: half-width, half-height, turn, height, then the bumps of the outline (how many round, how strong, where) */
const PEBSand15=[[4.7,3.7,.35,2.9,[1,.07,.5,3,.04,1.1]],[5.2,3.2,-.42,2.2,[2,.06,.9,3,.05,2.2]],[4.2,3.8,.9,3.1,[3,.07,.2,5,.03,1]],
  [4.9,3.4,.72,2.7,[3,.1,1.9,2,.05,.4]],[5,3.8,-.2,3,[2,.06,2.6,4,.04,.3]],[4.5,3.3,2.5,2.6,[1,.09,2.2,3,.05,.6]]];
/* small stones that lie about, away from the plan: x, y, half-width, half-height, turn, height, tone */
const GRITSand15=[[61,22,1.7,1.2,.4,1,0],[70.4,128.6,1.4,1.1,1.2,.9,1],[290,24,1.9,1.3,-.5,1.1,2],[301.6,62,1.2,1,.2,.8,0],[274,133,1.5,1.1,.8,.9,1],[146,12,1.3,1,2,.8,2],
  [60,70,1.5,1.2,.3,.9,0],[306,131,1.2,1.1,1.6,.8,2],[249,17,1.3,1,.7,.7,1],[196,137.4,1.3,1,2.4,.7,0]];
const hashSand15=(i,j)=>{let n=Math.imul(i,374761393)+Math.imul(j,668265263)|0;n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967296};
function vnSand15(x,y){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
  return(hashSand15(i,j)*(1-sx)+hashSand15(i+1,j)*sx)*(1-sy)+(hashSand15(i,j+1)*(1-sx)+hashSand15(i+1,j+1)*sx)*sy}
const fbmSand15=(x,y)=>.62*vnSand15(x,y)+.38*vnSand15(x*2.1+17.3,y*2.1+9.1);
const stepSand15=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
/* curveSand15: a smooth line through the points, as a hand leads a reed, with a little of the hand's unrest */
function curveSand15(P,seed){const o=[],N=P.length/2,at=i=>{i=clamp(i,0,N-1);return[P[i*2],P[i*2+1]]};
  for(let i=0;i<N-1;i++){const a=at(i-1),b=at(i),c=at(i+1),d=at(i+2),n=Math.max(2,Math.ceil(Math.hypot(c[0]-b[0],c[1]-b[1])*2));
    for(let k=0;k<n;k++){const t=k/n,t2=t*t,t3=t2*t,f=m=>.5*(2*b[m]+(c[m]-a[m])*t+(2*a[m]-5*b[m]+4*c[m]-d[m])*t2+(3*b[m]-a[m]-3*c[m]+d[m])*t3),s=(i+t)*.9;
      o.push(f(0)+(seed?.7*(vnSand15(s,seed)-.5):0),f(1)+(seed?.7*(vnSand15(s,seed+31)-.5):0))}}
  o.push(P[N*2-2],P[N*2-1]);return o}
/* edgeSand15: how far the wavelet reaches at the height y: two lobes of different size with a cusp between them */
const edgeSand15=y=>23+21*Math.pow(Math.abs(Math.sin((y+52)/46)),.85);
function paintSand15(g,v){const N=640*288,h=new Float32Array(N),A=new Float32Array(N*3),gl=new Float32Array(N);
  groundSand15(h,A,gl);
  COASTSand15.forEach((P,i)=>grooveSand15(h,A,curveSand15(P,3+i*7)));
  if(v.includes('w'))waySand15(h,A);
  PEB15.forEach(([id,x,y],i)=>{const[rx,ry,rot,hm,lump]=PEBSand15[i];stoneSand15(h,A,gl,x,y,rx,ry,rot,hm,lump,i)});
  GRITSand15.forEach(([x,y,rx,ry,rot,hm,c])=>stoneSand15(h,A,gl,x,y,rx,ry,rot,hm,[3,.12,x,2,.1,y],6+c));
  if(v.includes('s'))shellSand15(h,A,gl,249.6,69.2,.36);
  if(v.includes('a'))footSand15(h,A,186.4,36.6);
  lightSand15(g,h,A,gl);
  chipsSand15(g);weedSand15(g);
  if(v.includes('a'))awlSand15(g,186.4,36.6)}
/* groundSand15: the sand itself: its gentle lie, its grain, how wet it is, and at the left the film of water and its edge of foam */
function groundSand15(h,A,gl){const W=640,HH=288;
  for(let v=0,k=0;v<HH;v++)for(let u=0;u<W;u++,k++){const x=(u+.5)/2,y=(v+.5)/2,
      low=fbmSand15(x/62+3.1,y/62+1.7)-.5,mid=fbmSand15(x/12,y/12+9)-.5,fine=vnSand15(x*1.4+40,y*1.4)-.5,gr=hashSand15(u,v)-.5,
      s=x-edgeSand15(y)+2.6*(fbmSand15(x/7+5,y/7)-.5);
    let wet=stepSand15(90,4,s);wet=clamp(.1+.78*wet+.6*(fbmSand15(x/34+8,y/34)-.5)-low*.8,0,1);
    let hh=1.5*low+.26*mid+.08*fine+(.045-.02*wet)*gr,r=190+(116-190)*wet,gg=165+(100-165)*wet,b=128+(84-128)*wet,gs=.1+.9*wet;
    const m=1+.1*mid+.05*fine;r*=m;gg*=m;b*=m;
    /* grains: dark ones, pale ones, now and then a reddish one */
    const t=hashSand15(u+91,v+17);if(t<.035){r*=.8;gg*=.78;b*=.78}else if(t>.972){r=r*1.08+10;gg=gg*1.08+10;b=b*1.08+8}else if(t>.955){r*=1.06;gg*=.95;b*=.88}
    /* the marks earlier wavelets left: faint, broken bands of darker grit */
    for(const s0 of[11,27]){const bd=s-s0-5*(fbmSand15(y/12+s0,2.2)-.5);if(bd>-1.6&&bd<1.6&&vnSand15(x*.7,y*.3+s0)>.36){const f=1-.13*Math.exp(-bd*bd/.5);r*=f;gg*=f;b*=f}}
    if(s<13&&s>=0){const f=1-s/13;gs+=.9*f*f;r*=1-.12*f;gg*=1-.11*f;b*=1-.08*f}
    /* the small holes the air leaves in sand the water has just run off */
    if(s>3&&s<52&&hashSand15(u*7+3,v*13+1)<.0018*(1-s/52)){hh-=.55;r*=.7;gg*=.7;b*=.73}
    if(s<0){/* under the water: the sand shows through, greener and bluer the deeper; the surface lies level, with small ripples */
      const dp=clamp(-s/24,0,1),q=.1+.34*dp;r=r+(100-r)*q;gg=gg+(122-gg)*q;b=b+(124-b)*q;
      hh=.5*low+.05*Math.sin(x*.5+y*1.7+4*fbmSand15(x/9,y/9));gs=1.5;
      const lace=stepSand15(.6,.72,fbmSand15(x/2.4,y/3.2+7))*stepSand15(-15,-3,s)*stepSand15(0,-2.5,s)*.6;
      r+=(246-r)*lace;gg+=(244-gg)*lace;b+=(238-b)*lace}
    /* the edge: a bead of foam, broken here and there */
    {const e=Math.exp(-(s+.9)*(s+.9)/.9)*stepSand15(.3,.52,fbmSand15(x*.8,y*.8+50)+.12);if(e>.02){r+=(248-r)*e;gg+=(246-gg)*e;b+=(240-b)*e;hh+=.34*e;gs*=1-.6*e}}
    h[k]=hh;A[k*3]=r;A[k*3+1]=gg;A[k*3+2]=b;gl[k]=gs}}
/* nearSand15: for every canvas pixel nearer than R to the line P: how far it is, how far along the line the nearest point lies, and on
   which side; fn(k, x, y, distance, along, side, length) */
function nearSand15(P,R,fn){const W=640,HH=288,D=new Float32Array(W*HH).fill(99),S=new Float32Array(W*HH),E=new Int8Array(W*HH);let s0=0,x0=W,x1=0,y0=HH,y1=0;
  for(let i=0;i+3<P.length;i+=2){const ax=P[i],ay=P[i+1],dx=P[i+2]-ax,dy=P[i+3]-ay,L=Math.hypot(dx,dy)||1e-6,
      u0=Math.max(0,Math.floor((Math.min(ax,ax+dx)-R)*2)),u1=Math.min(W-1,Math.ceil((Math.max(ax,ax+dx)+R)*2)),
      v0=Math.max(0,Math.floor((Math.min(ay,ay+dy)-R)*2)),v1=Math.min(HH-1,Math.ceil((Math.max(ay,ay+dy)+R)*2));
    if(u0<x0)x0=u0;if(u1>x1)x1=u1;if(v0<y0)y0=v0;if(v1>y1)y1=v1;
    for(let v=v0;v<=v1;v++)for(let u=u0;u<=u1;u++){const px=(u+.5)/2-ax,py=(v+.5)/2-ay,t=clamp((px*dx+py*dy)/(L*L),0,1),d=Math.hypot(px-dx*t,py-dy*t),k=v*W+u;
      if(d<D[k]){D[k]=d;S[k]=s0+t*L;E[k]=dx*py-dy*px>0?1:-1}}
    s0+=L}
  for(let v=y0;v<=y1;v++)for(let u=x0;u<=x1;u++){const k=v*W+u;if(D[k]<R)fn(k,(u+.5)/2,(v+.5)/2,D[k],S[k],E[k],s0)}}
/* grooveSand15: one stroke of the reed: a channel, darker and wetter at its bottom, with the sand it pushed aside as a lip on either
   side, lumpy, here more to one side and there to the other; set down firmly at its beginning and lifted away at its end */
function grooveSand15(h,A,P){nearSand15(P,4.2,(k,x,y,d,s,e,L)=>{
  const p=stepSand15(0,8,L-s)*(.84+.32*vnSand15(s/11,7.7))*(1+.25*stepSand15(3,0,s));if(p<.04)return;
  const w=.6+.46*p,q=d/w,ch=q<1?-1.1*p*Math.pow(1-q*q,.8):0,
    lip=.52*p*(.45+fbmSand15(x*.8,y*.8))*(1+.9*e*(vnSand15(s/15,3.1)-.5))*Math.exp(-(d-w-.75)*(d-w-.75)/.34),
    cr=d>w?.34*p*(vnSand15(x*2.6,y*2.6)-.5)*Math.exp(-(d-w-1.1)*(d-w-1.1)/1.1):0;
  h[k]+=ch+lip+cr;if(q<1){const f=1-.3*p*(1-q);A[k*3]*=f;A[k*3+1]*=f;A[k*3+2]*=f*1.02}})}
/* waySand15: the way north: dents of the reed's end, each a little longer than wide and lying along the way, set left and right in turn
   like the steps of a walker; every one a dent of its own, none touching the next */
function waySand15(h,A){const W=640,HH=288;let n=0;
  for(const leg of WAYSand15){const P=curveSand15(leg,0);let L=0;for(let i=0;i+3<P.length;i+=2)L+=Math.hypot(P[i+2]-P[i],P[i+3]-P[i+1]);
    const m=Math.max(2,Math.round(L/6.6)+1);
    for(let j=0;j<m;j++,n++){let at=L*j/(m-1),i=0,sl=0;for(;i+5<P.length;i+=2){sl=Math.hypot(P[i+2]-P[i],P[i+3]-P[i+1]);if(at<=sl)break;at-=sl}
      const dx=(P[i+2]-P[i])/(sl||1),dy=(P[i+3]-P[i+1])/(sl||1),sd=n%2?1:-1,cx=P[i]+dx*at-dy*sd*.75,cy=P[i+1]+dy*at+dx*sd*.75,hl=.8,rr=.82;
      for(let v=Math.max(0,Math.floor((cy-4)*2));v<=Math.min(HH-1,Math.ceil((cy+4)*2));v++)for(let u=Math.max(0,Math.floor((cx-4)*2));u<=Math.min(W-1,Math.ceil((cx+4)*2));u++){
        const px=(u+.5)/2-cx,py=(v+.5)/2-cy,al=px*dx+py*dy,t=clamp(al,-hl,hl),d=Math.hypot(px-dx*t,py-dy*t),k=v*W+u,q=d/rr;
        if(d>3)continue;
        h[k]+=(q<1?-.85*Math.pow(1-q*q,.8):0)+.2*(1+.7*clamp(al/1.6,-1,1))*Math.exp(-(d-rr-.6)*(d-rr-.6)/.2);
        if(q<1){const f=1-.28*(1-q);A[k*3]*=f;A[k*3+1]*=f;A[k*3+2]*=f}}}}}
/* toneSand15: the colour of a stone at a place on it. 0 white quartz · 1 dark slate · 2 red jasper · 3 honey-coloured, banded · 4 speckled
   granite · 5 green serpentine · 6, 7, 8: the small stones that lie about */
function toneSand15(i,x,y,px,py){const f=fbmSand15(x*.55+i*13,y*.55),n=vnSand15(x*1.9+i*7,y*1.9),sp=hashSand15(Math.floor(x*2)+i*57,Math.floor(y*2));
  if(i===0){const st=stepSand15(.45,.75,fbmSand15(x*.3+2,y*.3)),m=.9+.14*f;return[(180-12*st)*m,(175-20*st)*m,(166-32*st)*m]}
  if(i===1){const m=.86+.3*f,k=sp>.93?1.5:1;return[86*m*k,94*m*k,112*m*k]}
  if(i===2){const d=stepSand15(.4,.7,f),k=sp>.95?1.35:1;return[(162-44*d)*k,(96-30*d)*k,(74-20*d)*k]}
  if(i===3){const bd=.5+.5*Math.sin(py*5.4+px*1.2+2.4*f),m=.95+.1*n;return[(176+44*bd)*m,(134+58*bd)*m,(80+62*bd)*m]}
  if(i===4){const m=.9+.2*f,n2=vnSand15(x*1.45+3,y*1.45);return n2>.68?[92*m,84*m,80*m]:n2<.26?[190*m,180*m,164*m]:f>.56?[166*m,140*m,124*m]:[146*m,136*m,124*m]}
  if(i===5){const d=stepSand15(.35,.65,f),p=stepSand15(.62,.78,n)*.5;return[120-34*d+40*p,134-32*d+36*p,112-26*d+38*p]}
  const m=.85+.3*f;return i===6?[96*m,90*m,88*m]:i===7?[150*m,132*m,112*m]:[122*m,126*m,132*m]}
/* stoneSand15: a stone pressed into the sand: an uneven round, domed, wet and smooth, in the little hollow it made, with the sand it
   pushed out as a low rim round that. The small stones that lie about are made the same way, none under a pixel in radius. */
function stoneSand15(h,A,gl,cx,cy,rx,ry,rot,hm,lump,tone){const W=640,HH=288,c=Math.cos(rot),s=Math.sin(rot),R=Math.max(rx,ry)+3.4,sc=Math.min(1,rx/4),rm=Math.min(rx,ry);
  for(let v=Math.max(0,Math.floor((cy-R)*2));v<=Math.min(HH-1,Math.ceil((cy+R)*2));v++)for(let u=Math.max(0,Math.floor((cx-R)*2));u<=Math.min(W-1,Math.ceil((cx+R)*2));u++){
    const x=(u+.5)/2-cx,y=(v+.5)/2-cy,px=(x*c+y*s)/rx,py=(-x*s+y*c)/ry,th=Math.atan2(py,px),k=v*W+u;let rr=1;for(let m=0;m<lump.length;m+=3)rr+=lump[m+1]*Math.cos(lump[m]*th+lump[m+2]);
    const q=Math.hypot(px,py)/rr;
    if(q<1){h[k]=-.3*sc+(hm+.3*sc)*Math.pow(1-Math.pow(q,2.6),.55);const C=toneSand15(tone,x+cx,y+cy,px,py);A[k*3]=C[0];A[k*3+1]=C[1];A[k*3+2]=C[2];gl[k]=tone===1||tone===2||tone===5?.85:.6}
    else{const o=(q-1)*rm*rr;if(o<3)h[k]+=-.42*sc*stepSand15(1.3*sc,0,o)+.16*sc*Math.exp(-(o-1.8*sc)*(o-1.8*sc)/.3);
      if(o<1.2*sc){const f=1-.3*(1-o/(1.2*sc));A[k*3]*=f;A[k*3+1]*=f;A[k*3+2]*=f}}}}
/* shellSand15: a ribbed shell, hollow side down: a fan that opens from its beak at x,y along the turn a. Its ribs all run out from the
   beak, as the edge of a fan does, and nothing runs across them: the bands of colour are soft and follow the edge. */
function shellSand15(h,A,gl,ux,uy,a){const W=640,HH=288,ca=Math.cos(a),sa=Math.sin(a),R=5.6;
  for(let v=Math.max(0,Math.floor((uy-14)*2));v<=Math.min(HH-1,Math.ceil((uy+14)*2));v++)for(let u=Math.max(0,Math.floor((ux-14)*2));u<=Math.min(W-1,Math.ceil((ux+14)*2));u++){
    const X=(u+.5)/2-ux,Y=(v+.5)/2-uy,qx=X*ca+Y*sa,qy=-X*sa+Y*ca,rho=Math.hypot(qx,qy),phi=Math.atan2(qx,-qy),k=v*W+u;
    if(Math.abs(phi)<1.5){const rib=Math.cos(phi*22.4),mx=2*R*Math.pow(Math.cos(phi),.72)*(1+.035*rib),q=rho/mx;
      if(q<1){const dome=Math.pow(1-Math.pow(q,2.4),.55)*(.55+.45*stepSand15(0,.3,q)),rb=stepSand15(.06,.45,q);
        h[k]=.1+2.1*dome*(1+.2*rib*rb);
        const bd=.5+.5*Math.cos(q*10.4+1.2*vnSand15(phi*3,7)),t=.42*bd*stepSand15(.12,.4,q),bk=stepSand15(.26,.04,q)*.6,f=(1-.1*rb*stepSand15(-.2,-.8,rib))*(.96+.08*vnSand15(X*1.7,Y*1.7));
        A[k*3]=(222+(196-222)*t+(184-222)*bk)*f;A[k*3+1]=(186+(118-186)*t+(110-186)*bk)*f;A[k*3+2]=(142+(82-142)*t+(80-142)*bk)*f;gl[k]=0;continue}}
    /* the two small ears beside the beak */
    if(Math.abs(qx)<2.7&&qy>-1.5&&qy<.55&&Math.abs(qx)*.5+qy<.6){h[k]=.42;A[k*3]=214;A[k*3+1]=194;A[k*3+2]=170;gl[k]=.5}}}
/* footSand15: where the awl went in: a small pit, and the sand it raised round it */
function footSand15(h,A,fx,fy){const W=640;
  for(let v=Math.floor((fy-3)*2);v<=Math.ceil((fy+3)*2);v++)for(let u=Math.floor((fx-3)*2);u<=Math.ceil((fx+3)*2);u++){const d=Math.hypot((u+.5)/2-fx,(v+.5)/2-fy),k=v*W+u;
    h[k]+=(d<.7?-.5*(1-d/.7):0)+.26*Math.exp(-(d-1.3)*(d-1.3)/.3)}}
/* lightSand15: the sun over it all. A slope turned to the sun is lit, one turned away is dark; what stands up throws a shadow to the upper
   left, cool as the sky that still lights it; wet sand and wet stone mirror the sky, and glint where a facet looks at the sun. */
function lightSand15(g,h,A,gl){const W=640,HH=288,[c,q]=mk(W,HH),im=q.createImageData(W,HH),d=im.data,[lx,ly,tn]=SUNSand15,ce=1/Math.sqrt(1+tn*tn),se=tn*ce,
    hx=lx*ce,hy=ly*ce,hz=se+1,hl=Math.hypot(hx,hy,hz),knee=v=>v<196?v:196+(v-196)/(1+(v-196)/52);
  for(let j=0,i=0;j<HH;j++)for(let k=0;k<W;k++,i++){
    const gx=h[i-(k>0?1:0)]-h[i+(k<W-1?1:0)],gy=h[i-(j>0?W:0)]-h[i+(j<HH-1?W:0)],nl=1/Math.sqrt(1+gx*gx+gy*gy);
    let s=(gx*hx+gy*hy+se)*nl/se*(.9+.2*k/W);if(s<0)s=0;if(s>2.5)s=2.5;
    let oc=0;const h0=h[i];for(let m=1;m<=13;m++){const sx=Math.round(k+lx*m),sy=Math.round(j+ly*m);if(sx>=W||sy>=HH)break;const o=h[sy*W+sx]-h0-m*.5*tn;if(o>oc)oc=o}
    const sh=oc<=.05?1:oc>=.4?0:1-(oc-.05)/.35;s*=.12+.88*sh;
    const sp=Math.pow(Math.max(0,(gx*hx+gy*hy+hz)*nl/hl),34)*gl[i]*sh,sky=gl[i]*(.5+.5*sh);
    d[i*4]=knee(A[i*3]*(.5+.5*s)+sky*20+sp*250);d[i*4+1]=knee(A[i*3+1]*(.54+.46*s)+sky*24+sp*240);d[i*4+2]=knee(A[i*3+2]*(.63+.37*s)+sky*31+sp*216);d[i*4+3]=255}
  q.putImageData(im,0,0);g.drawImage(c,0,0,320,144)}
/* chipsSand15: bits of broken shell, each a small angular chip: pale, its edge towards the sun bright, its shadow falling away from it */
function chipsSand15(g){
  for(const[x,y,w,a,c]of[[52,54,2,.4,0],[67,86,1.6,1.9,1],[75,15,1.8,2.8,0],[296,45,2.1,1.1,1],[285,77,1.6,.2,0],[311,89,1.8,2.2,1],[263,29,1.5,.9,0],[215,17,1.7,1.6,1],[129,135,1.5,2.5,0],[300,125,2,.6,1],[41,138,1.8,1.4,0]]){
    const p=[],C=c?'#d9c2ac':'#e3d8c6';for(const[t,q]of[[0,1],[1.3,.62],[2.7,.95],[4.3,.55]])p.push(x+Math.cos(a+t)*w*q,y+Math.sin(a+t)*w*q);
    comp(g,'multiply',.55,()=>poly(g,p.map((v,i)=>v-(i%2?.45:.8)),'#8486aa'));poly(g,p,C);
    clipTo(g,()=>poly(g,p),()=>{poly(g,[x+w,y-w,x+w,y+w,x-w,y+w],tint(C,.35));poly(g,[x-w,y-w,x+w*.2,y-w,x-w,y+w*.2],tint(C,-.2))})}}
/* weedSand15: a strand of weed the water left near its edge, lying along it: one wet brown ribbon with a ruffled edge, thin where it
   was rooted and broad towards its end, in a single easy bend; and a torn scrap of the same beside it. They lie apart and touch nothing. */
function weedSand15(g){
  for(const[p,wd,ph]of[[[55,99.6,57.4,106,60.4,113,62.6,120.6,62.8,128,61.4,134],1.55,0],[[70,112,71.8,115.4,72.2,119.4],1.1,2]]){const P=curveSand15(p,0),n=P.length/2,A=[],B=[];
    for(let i=0;i<n;i++){const t=i/(n-1),j=Math.min(i,n-2),dx=P[j*2+2]-P[j*2],dy=P[j*2+3]-P[j*2+1],l=Math.hypot(dx,dy)||1,
        w=wd*(.14+.86*Math.pow(Math.sin(Math.PI*Math.pow(t,.62)),.7)),r1=1+.22*Math.sin(t*31+ph),r2=1+.22*Math.sin(t*27+2+ph);
      A.push(P[i*2]-dy/l*w*r1,P[i*2+1]+dx/l*w*r1);B.unshift(P[i*2+1]-dx/l*w*r2);B.unshift(P[i*2]+dy/l*w*r2)}
    const O=[...A,...B];
    comp(g,'multiply',.5,()=>poly(g,O.map((v,i)=>v-(i%2?.4:.7)),'#7a7c9c'));poly(g,O,'#4a3c28');
    clipTo(g,()=>poly(g,O),()=>{stroke(g,P.map((v,i)=>v-(i%2?.5:.8)),'#2e2814',.8);stroke(g,P.map((v,i)=>v+(i%2?.45:.7)),'#7d6a48',.7);
      for(let i=8;i<n-6;i+=11)R(g,P[i*2]+.5,P[i*2+1],.5,.5,'#cdbf90')})}}
/* drawSand15: the only thing that moves: the sun glinting on the film of water at the left, here and there, for a moment */
function drawSand15(g,t){const r=rng(1511);
  for(let i=0;i<18;i++){const y=3+r()*138,x=(edgeSand15(y)-6)*(.1+.85*r()),a=Math.pow(Math.max(0,Math.sin(t/(520+r()*460)+r()*6.28)),10);
    if(a>.12)R(g,x,y,1,.5,'rgba(255,252,238,'+a.toFixed(2)+')')}}
/* awlSand15: the tentmaker's awl of the earlier chapters (a turned wooden handle, a ring of brass, a steel blade), stuck slanting into
   the sand at x,y. Blade, ring and handle lie in one line; the shadow starts at the same foot and runs off as the second leg of a V. */
function awlSand15(g,fx,fy){const[lx,ly]=SUNSand15,ux=.72,uy=-.69,nx=-uy,ny=ux,Lb=10,Lf=2,Lh=8,far=20,
    axx=ux*(Lb+Lf+Lh)-lx*far,axy=uy*(Lb+Lf+Lh)-ly*far,al=Math.hypot(axx,axy),sx=axx/al,sy=axy/al,px=-sy,py=sx,
    on=(d,w)=>[fx+ux*d+nx*w,fy+uy*d+ny*w],sh=(f,w)=>[fx+sx*al*f+px*w,fy+sy*al*f+py*w],fb=Lb/(Lb+Lf+Lh),ff=(Lb+Lf)/(Lb+Lf+Lh);
  const egg=(pt,d0,len,wd)=>{const o=[],wv=t=>wd*Math.pow(Math.sin(Math.PI*Math.pow(t,.86)),.5);for(let i=0;i<=14;i++)o.push(...pt(d0+len*i/14,wv(i/14)));
    for(let i=14;i>=0;i--)o.push(...pt(d0+len*i/14,-wv(i/14)));return o};
  /* the shadow: thin where the blade throws it, broad at its end where the handle does; soft at its edge */
  for(const[a,e]of[[.3,.5],[.5,0]])comp(g,'multiply',a,()=>{poly(g,[...sh(0,.3),...sh(fb,.7+e),...sh(ff,1.3+e),...sh(ff,-1.3-e),...sh(fb,-.7-e),...sh(0,-.3)],'#7c80a8');
    poly(g,egg((d,w)=>sh(d,w),ff,1-ff+e*.03,2.8+e),'#7c80a8')});
  /* the blade: steel, tapering into the sand; its side towards the sun is bright */
  poly(g,[...on(-.2,0),...on(Lb,.8),...on(Lb,-.8)],'#6a6a78');poly(g,[...on(-.2,0),...on(Lb,.8),...on(Lb,.15)],'#f0f0fa');poly(g,[...on(.6,0),...on(Lb,-.3),...on(Lb,-.8)],'#4a4a58');
  /* the ring of brass */
  poly(g,[...on(Lb,1.5),...on(Lb+Lf,1.7),...on(Lb+Lf,-1.7),...on(Lb,-1.5)],'#c9a14a');poly(g,[...on(Lb,1.5),...on(Lb+Lf,1.7),...on(Lb+Lf,.6),...on(Lb,.55)],'#f0d890');
  poly(g,[...on(Lb,-.7),...on(Lb+Lf,-.8),...on(Lb+Lf,-1.7),...on(Lb,-1.5)],'#8a6a2c');
  /* the handle: turned wood, round, lit along the side towards the sun */
  const H=egg(on,Lb+Lf-.3,Lh,2.9),a=on(Lb+Lf,3),b=on(Lb+Lf,-3);
  clipTo(g,()=>poly(g,H),()=>{g.fillStyle=lg(g,a[0],a[1],b[0],b[1],[[0,'#e2ae6c'],[.2,'#c08a4c'],[.55,'#8a5a2c'],[1,'#3e2410']]);g.fillRect(fx-6,fy-30,40,40);
    tex(g,'wood',.22,fx-6,fy-30,40,40,'overlay',.5);stroke(g,[...on(Lb+Lf+1.4,1.6),...on(Lb+Lf+3.8,2),...on(Lb+Lf+6,1.5)],'rgba(255,232,190,.75)',.7)})}
/* ==== ART sand15: end ==== */

/* ==== ART quay15: begin ==== */
/* Troas, the quay, late in the afternoon of the seventh day. Not Chapter Eight's picture: the same harbor years later, seen from another
   place. There we looked west into the sunset, with the inn at our left; here we stand farther along the quay and look north-west, so
   that the sun, still a good way up, is out of the picture at the left, the city climbs away at the right, and the three things that
   picture had far off are here again: the long low island on the horizon, the mole with its square beacon tower of dressed stone, and
   the quay's edge of great blocks with its squat mooring posts.
   Called from outside: ART.quay15 only. Reads nothing of the story: the room has one picture.
   One horizon, y 62 (HZQuay15): the sea, the paving and the sills of the lane's houses run to it. Nothing upright stands across it:
   the coaster's rail is above it all along, so that she hides it as far as her stem (her mast is amidships, out of the picture at
   the left; her yard is lowered and lashed along her rail, the sail furled on it), and the beacon tower stands at the end of the
   mole, whose wall is higher than the eye.
   Hotspots (ROOMS.quay15): the harbor 124,58,100,34 · the coaster 0,34,118,72 · jars of oil 236,92,44,22 · lane to Korinna's house
   292,12,28,98 (a stepped lane going up between houses; the tall house of three stories closes it). Actors (place15): Sopater 59,117
   and Secundus 78,124 before the coaster · Trophimus by himself before her bow, 104,113 · Timothy 172,125, where Luke comes in, at
   148,131 · Gaius of Derbe 206,113 and Tychicus 224,121 before the house · the oil seller 258,112.6, behind the front row of his
   jars, in the gap between them (two pairs, one apart, never a row of equal gaps or of one depth; no two in one column of the
   picture; the gulls on the quay's edge, x 179..195, stay in sight). Heads come at y 67..90: behind them lie water, the hull's
   strakes, a wall and the dark of the shop, and nothing round. The front row of jars stands inside the walk strip (y 112..138): it
   is named in props. */
const HZQuay15=62;
ART.quay15={w:320,q:12,paint(g){paintQuay15(g)},light:{amb:'#f2dcc2'},draw(g,t){drawQuay15(g,t)},front(){},props:[{y:114,shape(g){jarsQuay15(g,1)}}]};
function paintQuay15(g){const r=rng(1505);
  skyQuay15(g,r);seaQuay15(g,r);moleQuay15(g,r);shipQuay15(g,r);paveQuay15(g,r);laneQuay15(g,r);houseQuay15(g,r);standQuay15(g,r);thingsQuay15(g,r);
  jarsQuay15(g);lightQuay15(g)}
/* lineQuay15: the points of y=f(x) from x0 to x1; backQuay15: the same points, last first */
function lineQuay15(f,x0,x1,st){const p=[];for(let x=x0;x<x1;x+=st)p.push(x,f(x));p.push(x1,f(x1));return p}
function backQuay15(p){const q=[];for(let i=p.length-2;i>=0;i-=2)q.push(p[i],p[i+1]);return q}
/* the sky: the sun is out of the picture, up at the left, and the whole of that side is light with it; long thin clouds, lit from below */
function skyQuay15(g,r){const HZ=HZQuay15;
  sky(g,320,HZ+1,['#5878a8','#7c9abc','#b4bcc6','#e6d0ae','#f6dcae']);
  pool(g,-30,4,250,130,'#ffe8b4',.75,'screen');pool(g,-10,HZ,150,26,'#fff0c8',.5,'screen');
  for(const[cx,cy,w,h]of[[78,15,96,3.4],[204,8,74,3],[150,31,84,2.4],[268,12,40,2.2]])cloud(g,cx,cy,w,h,r,'#ffe9c6','#a492ae');
  /* thin streaks high up, each a row of soft dabs along a line that falls a little to the right: violet below, lit above */
  for(const[x0,y0,len,sl,n]of[[20,26,120,.03,26],[130,18,150,.045,30],[226,34,90,.05,18],[60,41,70,.02,14]])for(let i=0;i<n;i++){const u=r(),x=x0+u*len,y=y0+u*len*sl+(r()-.5)*1.6,w=6+r()*12;
    pool(g,x,y+.9,w,1.3,'#a894b4',.2,'source-over');pool(g,x,y,w*.9,1,'#fff2d6',.34,'source-over')}}
/* the sea: the island far out, the coast that runs on northward behind the mole, the water, and the low sun lying on it at the left */
function seaQuay15(g,r){const HZ=HZQuay15;
  ridge(g,128,158,HZ+.4,x=>2.3*Math.pow(Math.sin((x-128)/30*Math.PI),.7)+.3*Math.sin(x/3.3),['#a79cb6','#bcaab0']);
  ridge(g,174,240,HZ+.4,x=>Math.min(14,(x-174)*.36)+.7*Math.sin(x/5.2)+.4*Math.sin(x/2.1),['#b6a6aa','#a3948e']);
  g.fillStyle=lg(g,0,HZ,0,102,[[0,'#e8cf9e'],[.09,'#cfc2a4'],[.3,'#8ea6aa'],[.62,'#4f7e9a'],[1,'#2f5c82']]);g.fillRect(0,HZ,320,42);
  comp(g,'soft-light',.85,()=>{g.fillStyle=lg(g,0,0,230,0,['rgba(255,226,160,1)','rgba(255,226,160,0)']);g.fillRect(0,HZ,320,42)});
  comp(g,'multiply',.45,()=>{g.fillStyle=lg(g,130,0,236,0,['rgba(124,144,190,0)','rgba(124,144,190,1)']);g.fillRect(0,HZ,320,42)});
  /* ripples: long and thin far out, shorter and stronger nearer; warm where the light lies, blue where the sky does */
  for(let i=0;i<300;i++){const k=Math.pow(r(),1.3),y=HZ+.8+k*39,x=r()*240-4,w=(2+k*9)*(.5+r()),warm=r()<.8-x/300;
    R(g,x,y,w,.5,warm?`rgba(255,236,190,${.22+.4*r()})`:`rgba(22,44,84,${.16+.26*r()})`)}
  for(let i=0;i<170;i++){const k=Math.pow(r(),1.5),y=HZ+.6+k*37,x=Math.pow(r(),1.7)*176-2;R(g,x,y,1.5+k*5*r(),.5,`rgba(255,247,218,${.55+.4*r()})`)}}
/* the mole on the far side of the basin, coming towards us at the right, and the beacon tower at its seaward end: plain, square, of
   dressed stone, as it was. The mole's wall is higher than the eye, so that its top falls towards the horizon and its foot rises to it;
   the tower stands at its end, and the horizon stops at the tower. Two boats lie under the wall, their masts unstepped,
   clear of where a head comes. */
function moleQuay15(g,r){const x0=176,x1=236,T=x=>58.8-(x-x0)*.12,F=x=>64.4+(x-x0)*.13,M=[x0,T(x0),x1,T(x1),x1,F(x1),x0,F(x0)],X=168.4,W=7.8,top=50.2,bot=65;
  /* what they darken on the water */
  for(let i=0;i<70;i++){const x=X+r()*(x1-X),f=x<x0?bot:F(x),d=r()*(x<x0?9:3+(x-x0)*.1);R(g,x-1,f+.3+d,1.5+r()*3.5,.5,`rgba(40,48,78,${.34*(1-d/12)})`)}
  poly(g,M);g.fillStyle=lg(g,0,52,0,72,['#e4cfa6','#c6b089','#94826c']);g.fill();
  clipTo(g,()=>poly(g,M),()=>{for(let j=1;j<5;j++)stroke(g,[x0,T(x0)+(F(x0)-T(x0))*j/5,x1,T(x1)+(F(x1)-T(x1))*j/5],'rgba(84,64,52,.3)',.4);
    for(let i=0;i<34;i++){const x=x0+r()*(x1-x0),j=Math.floor(r()*5),h=(F(x)-T(x))/5;R(g,x,T(x)+h*j+.3,.4,h-.5,'rgba(84,64,52,.28)')}
    tex(g,'mott',.4,x0,50,x1-x0,24,'overlay',.5);g.fillStyle=lg(g,x0,0,x1,0,['rgba(150,140,170,.3)','rgba(150,140,170,0)']);g.fillRect(x0,50,x1-x0,24)});
  stroke(g,[x0,T(x0),x1,T(x1)],'#f8e8c2',.6);
  /* the rough stones at its foot */
  for(let x=x0-1;x<x1;x+=1.4+r()*1.6){const w=1.4+r()*1.8;R(g,x,F(x)-.7+r()*.5,w,1.1,r()<.45?'#b8a486':'#665a5c')}
  /* the tower */
  R(g,X,top,W,bot-top,'#ccb890');R(g,X,top,2.2,bot-top,'#f4e2b8');R(g,X+W-1.6,top,1.6,bot-top,'#a09086');
  for(let y=top+2.2;y<bot-1;y+=2.3)R(g,X,y,W,.3,'rgba(84,64,52,.3)');R(g,X,top,W,.6,'#fff2d0');R(g,X+3.4,top+2.8,1.6,2.2,'#3c302e');
  R(g,X-.8,bot-.6,W+1.4,1.2,'#6a5e5e');R(g,X-.8,bot-.6,3,.5,'#b8a486');
  /* the boats */
  for(const[bx,by,bw]of[[181.6,66.6,6.8],[191.6,68,8]]){poly(g,[bx-.4,by-2.1,bx+1.4,by-1.5,bx+bw-1.8,by-1.5,bx+bw+.4,by-2.3,bx+bw-1,by,bx+1.2,by],'#4e3a2c');R(g,bx+1.4,by-1.5,bw-3.2,.5,'#c8a474');R(g,bx+1.2,by+.2,bw-2.4,.5,'rgba(30,36,64,.4)')}}
/* the coaster, moored at the left with her bow to the right; the rest of her, and her mast, are out of the picture. She rides high,
   her hold half empty: her rail (railQuay15) is above the eye all along, so that she hides the horizon behind her as far as her stem,
   and the horizon stops at the stem as it does at a house. Her strakes sweep up to the stem with her sheer, each a little flatter
   than the one above; under the rail a painted wale, lower down a heavy one with the heads of three beams in it, and pitch below
   that. The butts of her planks stop at the edges of their own strakes. Her yard is lowered and lashed along the rail with the sail
   furled under it: the folds hang in shallow curves from gasket to gasket, and no tie is drawn across the roll. Her forestay runs from
   the stem head up to the mast, across the sky only. */
const railQuay15=x=>58.5-9*Math.pow(clamp(x/110,0,1),2.4);
function shipQuay15(g,r){const S=railQuay15,seam=(j,x)=>S(x)*(1-j*.075)+58.5*j*.075+j*4.3,
    IN=[110.6,46.4,112.6,51,114.2,59,114.4,70,113.2,82,111.2,93,109.6,102],OUT=[115.2,46,117.2,49.4,118.2,58,118,70,116.8,82,114.6,93,112.6,102],
    hull=lineQuay15(S,0,110,2).concat(IN,[0,102]),band=(f0,f1,c)=>poly(g,lineQuay15(f0,0,116,2).concat(backQuay15(lineQuay15(f1,0,116,2))),c);
  /* her shadow on the water, to the right of her bow */
  comp(g,'multiply',.5,()=>{poly(g,[113,101,118.6,74,150,92,180,101]);g.fillStyle=lg(g,116,0,180,0,['rgba(104,118,168,1)','rgba(104,118,168,.6)','rgba(104,118,168,0)']);g.fill()});
  for(let i=0;i<150;i++){const x=116+Math.pow(r(),1.5)*70,y=74+r()*27;if(y<74+(x-118.6)*.46)continue;R(g,x,y,2+r()*6,.5,`rgba(34,48,92,${(.5*(1-(x-116)/72)).toFixed(2)})`)}
  stroke(g,[113,46.6,30,0],'#5a4a3c',.6);stroke(g,[112.6,46.2,29.6,-.4],'rgba(255,236,196,.5)',.3);
  poly(g,hull);g.fillStyle=lg(g,0,48,0,102,['#cd9c60','#ac7c46','#7c5632','#4c3320']);g.fill();
  clipTo(g,()=>poly(g,hull),()=>{
    /* pitch on her lower strakes */
    band(x=>seam(5,x),()=>103,'rgba(34,20,14,.46)');
    /* the painted wale, its paint worn through in places */
    band(x=>seam(1,x)-.2,x=>seam(1,x)+2.7,'#57776b');
    for(let i=0;i<36;i++){const x=r()*112;R(g,x,seam(1,x)+r()*2,1+r()*3.6,.5+r()*.6,r()<.5?'#96703f':'#84a294')}
    for(let j=1;j<=10;j++){const p=lineQuay15(x=>seam(j,x)+(j===1?2.7:0),0,116,3);stroke(g,p,'rgba(34,20,10,.5)',.5);stroke(g,p.map((v,i)=>i%2?v+.5:v),'rgba(255,220,170,.2)',.4)}
    stroke(g,lineQuay15(x=>seam(1,x)-.2,0,116,3),'rgba(30,20,12,.5)',.4);
    /* the heavy wale, and the heads of the beams */
    band(x=>seam(5,x)-2.4,x=>seam(5,x),'#4c321e');stroke(g,lineQuay15(x=>seam(5,x)-2.3,0,116,3),'#c0925a',.5);
    for(const x of[20,46,94]){R(g,x,seam(5,x)-2.1,1.8,1.8,'#26170e');R(g,x,seam(5,x)-2.1,1.8,.4,'#d4a66a')}
    for(const[j,x]of[[2,24],[2,74],[3,48],[3,96],[5,34],[6,12],[6,66],[7,44],[7,90],[8,24],[8,78],[9,56]])R(g,x,seam(j,x)+(j===1?3.3:.6),.5,seam(j+1,x)-seam(j,x)-(j===4?3.5:1.1),'rgba(30,18,10,.42)');
    /* two scuppers in the bulwark */
    for(const x of[32,68]){R(g,x,S(x)+3,2.6,.8,'#2a1a10');R(g,x,S(x)+3.8,2.6,.4,'rgba(255,224,170,.3)')}
    tex(g,'wood',.2,0,44,120,60,'overlay',.5);tex(g,'mott',.34,0,44,120,60,'overlay',1);
    /* the light slides along her side; her bow turns away from it, and the quay's own light comes up from below */
    g.fillStyle=lg(g,0,0,60,0,['rgba(255,220,160,.2)','rgba(255,220,160,0)']);g.fillRect(0,44,60,60);
    g.fillStyle=lg(g,74,0,116,0,['rgba(52,40,76,0)','rgba(52,40,76,.5)']);g.fillRect(74,44,44,60);ao(g,0,90,118,12,'b',.3)});
  /* the stem */
  poly(g,OUT.concat(backQuay15(IN)));g.fillStyle=lg(g,110,0,118.4,0,['#b08250','#74502e','#3e2818']);g.fill();stroke(g,IN,'rgba(28,16,8,.5)',.5);R(g,110.8,45.8,4.4,.8,'#e6bc80');
  /* the rail, and the yard lashed along it with the furled sail */
  stroke(g,lineQuay15(S,0,110.4,2),'#f0cc90',1);
  {const GK=[-6,7,19,30,41,51,60.5,69,77.5],th=x=>6-3.6*clamp(x/90,0,1),u=x=>{let i=0;while(i<GK.length-2&&GK[i+1]<x)i++;return clamp((x-GK[i])/(GK[i+1]-GK[i]),0,1)},
      yard=x=>S(x)-.6-th(x),botY=x=>S(x)-.3-.9*(1-Math.pow(Math.sin(Math.PI*u(x)),.5)),roll=lineQuay15(x=>yard(x)+.5,0,77.5,2).concat(backQuay15(lineQuay15(botY,0,77.5,.5)));
    /* the sail, bunched under the yard: it bellies between the gaskets and is drawn in where they hold it */
    poly(g,roll);g.fillStyle=lg(g,0,47,0,59,['#eedcb0','#ccb888','#8e7a56']);g.fill();
    clipTo(g,()=>poly(g,roll),()=>{
      for(let i=0;i+1<GK.length;i++){const a=GK[i],b=GK[i+1],m=(a+b)/2,y0=yard(m)+.8,d=S(m)-.6-y0;g.fillStyle=lg(g,a,0,b,0,['rgba(255,244,214,.34)','rgba(255,244,214,0)','rgba(70,56,60,.34)']);g.fillRect(a,40,b-a,22);
        /* the folds of each belly hang in shallow curves from gasket to gasket */
        for(const[k,c]of[[.42,'rgba(255,250,230,.5)'],[.78,'rgba(104,88,60,.6)']]){g.strokeStyle=c;g.lineWidth=.45;g.beginPath();g.moveTo(a+1.2,y0+d*k*.3);g.quadraticCurveTo(m,y0+d*k*1.5,b-1.2,y0+d*k*.3);g.stroke()}}
      tex(g,'mott',.3,0,44,80,16,'overlay',.5)});
    /* the yard on top of it, its arm reaching past the sail */
    poly(g,lineQuay15(x=>yard(x)-.6,0,90,3).concat(backQuay15(lineQuay15(x=>yard(x)+.7-(x>78?(x-78)*.03:0),0,90,3))),'#7e5a34');stroke(g,lineQuay15(x=>yard(x)-.5,0,90,3),'#e2b878',.4)}
  comp(g,'multiply',.45,()=>poly(g,lineQuay15(x=>S(x)+.6,0,80,2).concat(backQuay15(lineQuay15(x=>S(x)+2,0,80,2))),'#6a5a78'))}
/* the quay: worn paving that runs back to the horizon, and along the water its edge of great blocks. The edge runs level as far as the
   mooring post beyond the bow and then bears away from us, towards the foot of the mole. */
const edgeQuay15=x=>x<150?99.6:99.6-(x-150)*.1;
function paveQuay15(g,r){const E=edgeQuay15,HZ=HZQuay15,S=y=>(y-HZ)/82;
  clipTo(g,()=>poly(g,lineQuay15(x=>E(x)+3,0,320,10).concat([320,144,0,144])),()=>{
    pave(g,0,92,320,144,'#c6b798',r,{vx:160,vy:HZ,rows:8,step:36,v:.12,p:1.75,joint:'#85796a'});
    /* slabs of another stone, set in where old ones broke; each lies within its own course */
    {const ys=k=>92+52*Math.pow(k/8,1.75),X=(i,y)=>160+i*36*(y-HZ)/82;
      for(const[k,i,c]of[[5,-3,'rgba(150,116,100,.3)'],[6,1,'rgba(120,122,124,.28)'],[7,-4,'rgba(158,128,100,.26)'],[5,2,'rgba(122,120,122,.24)'],[6,-5,'rgba(128,126,124,.24)'],[4,-1,'rgba(150,120,100,.24)']]){
        const a=ys(k)+.5,b=ys(k+1),o=i+(k%2)*.5;poly(g,[X(o,a)+.5,a,X(o+1,a),a,X(o+1,b),b,X(o,b)+.5,b],c)}}
    /* worn smooth where everybody walks: pale and a little hollow along the middle of the strip; stained and chipped elsewhere */
    comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,106,0,138,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,106,320,32)});
    for(let i=0;i<150;i++){const y=98+Math.pow(r(),.8)*46,k=S(y),x=r()*320;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.16)':'rgba(255,246,224,.18)')}
    for(let i=0;i<22;i++){const y=106+r()*36,k=S(y),x=r()*320;oval(g,x,y,(5+r()*13)*k,(1.2+r()*1.7)*k,r()<.6?'rgba(104,86,70,.11)':'rgba(255,244,220,.1)')}
    /* grit and a little straw in the joints */
    for(let i=0;i<90;i++){const y=104+r()*40,x=r()*320;R(g,x,y,.5+r()*(1+S(y)),.5,r()<.3?'rgba(214,186,110,.6)':r()<.5?'rgba(70,58,50,.4)':'rgba(240,230,206,.5)')}
    /* damp and green along the edge */
    for(let i=0;i<60;i++){const x=r()*214;R(g,x,E(x)+3.2+r()*2.6,1+r()*5,.5,r()<.5?'rgba(84,98,68,.32)':'rgba(70,60,56,.26)')}
    ao(g,0,E(0)+3,216,4,'t',.12,'#3a3050')});
  /* the edge: each block with its own tone, lit along its arris, chipped here and there, and scored where lines have run over it */
  for(let x=-3-r()*6;x<216;){const w=(13+r()*7)*(x<150?1:1-(x-150)*.004),x2=Math.min(x+w,216),c=tint('#d0c2a2',(r()-.5)*.18);
    poly(g,[x+.3,E(x+.3),x2,E(x2),x2,E(x2)+3.2,x+.3,E(x+.3)+3.2],c);
    if(r()<.5)R(g,x+2+r()*(w-5),E(x+w/2)+1+r(),1.5+r()*2,.5,tint(c,-.22));if(r()<.35)R(g,x+1+r()*(w-3),E(x+w/2),1+r()*1.6,.8,tint(c,-.32));x=x2}
  stroke(g,lineQuay15(x=>E(x)+.25,0,216,6),'#f6ead0',.5);stroke(g,lineQuay15(x=>E(x)+3.3,0,216,6),'rgba(70,56,46,.55)',.5);
  for(const x of[125.6,127,138.4])stroke(g,[x,E(x)+.2,x+.8,E(x)+2.2],'rgba(70,56,46,.5)',.4);
  clipTo(g,()=>poly(g,lineQuay15(E,0,216,6).concat(backQuay15(lineQuay15(x=>E(x)+3.3,0,216,6)))),()=>tex(g,'mott',.4,0,92,216,12,'overlay',.5))}
/* the lane to Korinna's house: steps going up between the houses, in the shade of the oil seller's house, and at their head the tall
   house, three stories of it, still in the sun; its upper window on the left stands open. The sills and roofs of the lane's houses
   run to the horizon, the steps climb above it, and the tall house closes the view. */
function laneQuay15(g,r){const C='#ecdab0',FL=[292,104,320,104,320,87.8,312.7,68,312.7,60.4,301.3,60.4,301.3,68],LW=[292,32.5,301.3,52.1,301.3,68,292,104],RW=[320,21.4,312.7,42.6,312.7,68,320,87.8],
    X=295,W=22,TOP=16.4,win=(x,y,w,h,shut)=>{R(g,x-.6,y-.6,w+1.2,h+1.2,tint(C,-.2));R(g,x,y,w,h,shut?'#7a5632':'#2a2022');if(shut)R(g,x,y+h-.6,w,.6,'#5a3e24');else R(g,x,y,w,1,'#140e10');
      R(g,x-1,y+h+.5,w+2,.8,tint(C,.26));R(g,x-1,y+h+1.3,w+2,.4,tint(C,-.36))};
  plaster(g,X,TOP,W,61-TOP,C,r,{patch:0,cracks:2,t:.4,bot:-.08});
  R(g,X-.6,TOP-2.4,W+1.2,2.6,tint(C,.16));R(g,X-.6,TOP-2.4,W+1.2,.5,'#fff6dc');R(g,X,TOP+.2,W,.6,tint(C,-.32));R(g,X,TOP+.8,.6,60-TOP,'#fff4d6');
  ao(g,X+W-9,TOP,9,61-TOP,'r',.14,'#5a4a6a');
  /* a faint line where each floor lies, the ends of its beams */
  for(const y of[31.4,45.6])for(let x=X+2;x<X+W-1.4;x+=4.6)R(g,x,y,1.2,1,tint(C,-.3));
  /* third story: the open window, its shutter folded back, and a shuttered one; second story: two; below, the door at the head of the steps */
  win(298.4,21.4,4.6,6,0);R(g,303,21.4,1,6,'#8a6238');win(308.8,22.4,3,4.6,1);win(299.2,35.6,3,4.6,0);win(308.8,35.6,3,4.6,1);
  R(g,303.8,50.8,5,9.2,tint(C,-.22));R(g,304.5,51.6,3.6,8.4,'#3a2a1e');
  /* the shade of its neighbors on its foot */
  shade(g,[X,61,X,46,X+W,52,X+W,61],'#9a94c0',.6);
  /* the steps */
  poly(g,FL);g.fillStyle=lg(g,0,60,0,104,['#b4a692','#c2b498']);g.fill();
  clipTo(g,()=>poly(g,FL),()=>{for(let y=101.4,d=3.7;y>60.6;d=Math.max(1,d*.93),y-=d){R(g,288,y,34,.5,'rgba(52,42,62,.5)');R(g,288,y+.5,34,.4,'rgba(255,242,214,.2)')}tex(g,'mott',.35,290,58,32,48,'overlay',.5)});
  /* the wall at the left, turned from the sun: the side of the oil seller's house, with its side door, and the next house up the lane */
  poly(g,LW);g.fillStyle=lg(g,292,0,302,0,['#b2a2a0','#948690']);g.fill();
  clipTo(g,()=>poly(g,LW),()=>{tex(g,'mott',.4,290,30,14,76,'overlay',.5);R(g,297.3,30,.5,76,'rgba(60,48,66,.45)');R(g,297.8,30,3.6,76,'rgba(70,58,84,.14)');
    poly(g,[293.4,70,295.8,71.6,295.8,96,293.4,100.5],'#3e2e2c');ao(g,292,84,10,20,'b',.25,'#3a2c3c')});
  stroke(g,[292,32.5,301.3,52.1],'#d2c2ae',.5);
  /* the wall at the right: its top in the sun, the rest in the shade of the house across the lane */
  poly(g,RW);g.fillStyle=lg(g,0,21,0,88,[[0,'#f6deb0'],[.5,'#eccf9e'],[.52,'#a898a2'],[1,'#8e808c']]);g.fill();
  clipTo(g,()=>poly(g,RW),()=>{tex(g,'mott',.4,310,20,10,70,'overlay',.5);poly(g,[315.4,38.4,318.2,31.8,318.2,38.6,315.4,43.6],'#3a2c2c');poly(g,[315,44,318.6,39,318.6,39.8,315,44.8],'#fff0cc')});
  stroke(g,[320,21.4,312.7,42.6],'#fff4d6',.5);
  shade(g,FL,'#9a94c0',.62)}
/* patchQuay15: a place where the plaster has come away and the courses of mud brick show, as the engine's plaster() paints them */
function patchQuay15(g,r,px,py,pw,ph,b){const pts=[];for(let a=0;a<9;a++){const t=a/9*6.2832,q=.6+r()*.4;pts.push(px+Math.cos(t)*pw*q,py+Math.sin(t)*ph*q)}
  clipTo(g,()=>poly(g,pts),()=>{R(g,px-pw,py-ph,pw*2,ph*2,tint(b,-.35));for(let j=0,row=0;j<ph*2;j+=2.5,row++)for(let i=-(row%2)*3;i<pw*2;i+=6)R(g,px-pw+i,py-ph+j,5.5,2,tint(b,(r()-.5)*.25))});
  stroke(g,pts.concat(pts.slice(0,2)),'rgba(0,0,0,.25)',.5)}
/* the oil seller's house: one story under a flat roof. Its side towards the sea takes the sun full; its front, towards us, is lit
   aslant. */
function houseQuay15(g,r){const W='#dcc8a2',SIDE=[214,39.2,230,32.5,230,104,214,94.4];
  house(g,230,36,62,68,W,r,{patch:0,cracks:3,beams:11});patchQuay15(g,r,237.4,88,6.4,4.6,'#a88868');
  windowArt(g,233.6,44,5.6,6,W,{shut:1,wood:'#6a4e2c'});
  clipTo(g,()=>poly(g,SIDE),()=>{plaster(g,212,30,20,76,'#f2dcae',r,{patch:0,cracks:2,top:.06,bot:-.12});
    poly(g,[214,39.2,230,32.5,230,36.7,214,42.6],'#fae8c2');stroke(g,[214,42.9,230,37],'rgba(120,86,60,.55)',.5);
    poly(g,[218.6,55.4,224.6,53.8,224.6,61.2,218.6,62],tint('#f2dcae',-.2));poly(g,[219.4,56,224,54.8,224,60.8,219.4,61.4],'#3a2a22');poly(g,[218,62.4,225.2,61.6,225.2,62.6,218,63.4],'#fff0cc');
    ao(g,214,82,16,22,'b',.22,'#6a4a34')});
  stroke(g,[214,39.2,230,32.5],'#fff6dc',.5);R(g,229.7,36.6,.6,67.4,'rgba(255,244,214,.6)')}
/* the oil seller's stand: his shop is open to the quay, dark inside, with the store jars half seen; over it an awning of olive and
   undyed cloth on two poles, which stand at its two front corners. */
function standQuay15(g,r){const W='#dcc8a2',x0=248,x1=286,y0=62,yb=104,sag=x=>62.4+1.5*Math.sin(Math.PI*(x-242.4)/47.2);
  R(g,x0-1.8,y0-1,x1-x0+3.6,yb-y0+1,tint(W,-.24));g.fillStyle=lg(g,0,y0,0,yb,['#120e0c','#221912','#3a2b1f']);g.fillRect(x0,y0,x1-x0,yb-y0);
  inRect(g,x0,y0,x1-x0,yb-y0,()=>{vessel(g,256,102.4,6.2,18,'#6a3e26','pithos',{noShadow:1});vessel(g,278.5,102.8,4.8,13.5,'#5e3622','jar',{noShadow:1});
    comp(g,'multiply',.62,()=>R(g,x0,y0,x1-x0,yb-y0,'#40364a'));
    /* the sun reaches a little way in over the sill */
    poly(g,[266,yb,x1,yb,x1,97.4,274,100.6],'rgba(190,150,96,.5)');poly(g,[x1-2.6,71,x1,67,x1,yb,x1-2.6,yb],'rgba(176,136,88,.55)');ao(g,x0,y0,x1-x0,12,'t',.6)});
  R(g,x0-2.4,yb-1.6,x1-x0+4,2.4,'#b8aa8e');R(g,x0-2.4,yb-1.6,x1-x0+4,.5,'#ecdfc2');
  /* the awning: we look down on it a little; it sags between its poles, and a short dagged edge hangs from it */
  const cloth=()=>{g.beginPath();g.moveTo(244,50.5);g.lineTo(288,50.5);g.lineTo(289.6,62.4);for(let x=289.6;x>=242.4;x-=2.36)g.lineTo(x,sag(x));g.closePath()};
  clipTo(g,cloth,()=>{for(let i=0;i<8;i++){const c=i%2?'#e6d8b0':'#78824e',a=i/8,b=(i+1)/8;poly(g,[244+44*a,50,244+44*b,50,242.4+47.2*b,66,242.4+47.2*a,66]);
      g.fillStyle=lg(g,0,50,0,64,[tint(c,-.16),tint(c,.1),tint(c,.02)]);g.fill()}
    poly(g,[268.6,55,273.4,54.6,273.8,58.4,269,58.8],'#cdbd92');stroke(g,[268.6,55,269,58.8,273.8,58.4],'rgba(70,56,40,.45)',.4);
    tex(g,'mott',.35,242,50,48,16,'overlay',.5);g.fillStyle=lg(g,242,0,290,0,['rgba(255,236,190,.22)','rgba(70,60,100,.2)']);g.fillRect(242,50,48,16)});
  R(g,244,50.1,44,.6,'#5a4630');
  for(let i=0;i<8;i++){const xa=242.4+47.2*i/8,xb=242.4+47.2*(i+1)/8,c=tint(i%2?'#e6d8b0':'#78824e',-.3);poly(g,[xa,sag(xa)-.1,xb,sag(xb)-.1,(xa+xb)/2,(sag(xa)+sag(xb))/2+2.6],c)}
  {const p=[];for(let x=242.4;x<=289.6;x+=2.36)p.push(x,sag(x));stroke(g,p,'rgba(255,246,220,.5)',.4)}
  /* the shade of the awning on the wall beside the opening, falling away to the right */
  shade(g,[286,62.6,292,62.6,292,79,286,75.6],'#a49cc4',.5);ao(g,244,62.4,4,10,'t',.2,'#3a3050')}
/* the two poles of the awning, at its front corners; they stand before the shadows of the jars and behind the jars themselves */
function polesQuay15(g){for(const x of[243.1,288.9]){R(g,x-.7,64.6,1.4,44.6,'#7a5a38');R(g,x-.7,64.6,.5,44.6,'#cfa56a');R(g,x+.3,64.6,.4,44.6,'#4a3420');R(g,x-1,109,2.6,.5,'rgba(44,38,76,.4)')}}
/* gullQuay15: a gull standing, its feet at x,y, looking the way of d: legs, body, the grey of back and wing, the dark tip of the tail,
   and the head set on the front of the body */
function gullQuay15(g,x,y,d){const P=p=>p.map((v,i)=>i%2?y+v:x+d*v),Q=(a,b,w,h,c)=>R(g,d>0?x+a:x-a-w,y+b,w,h,c);
  R(g,x+2.6*d-1,y-.3,5,.6,'rgba(40,36,70,.3)');Q(-.7,-1.5,.5,1.5,'#c89a48');Q(.5,-1.5,.5,1.5,'#a87c34');
  poly(g,P([-3.4,-2.7,-1.6,-4.3,1.4,-4.5,2.7,-3.5,2.2,-2,-.6,-1.4,-2.4,-1.9]),'#f4f0e6');poly(g,P([-1.6,-1.6,2,-2.1,2.2,-2.6,-1.8,-2.2]),'#c2bab4');
  poly(g,P([-3.6,-3,-1.4,-4.4,1,-4.4,.5,-3.1,-1.8,-2.6]),'#959ba6');poly(g,P([-4.8,-2.5,-3.2,-3.3,-2.8,-2.4]),'#34343e');
  Q(1.3,-5.8,1.9,2.2,'#f8f4ea');Q(3.2,-5.1,1.1,.6,'#dca43a')}
/* what stands and lies on the quay behind the walk strip: the mooring post with the coaster's bow line, another post, a coil of line,
   two bales and a sack waiting to go aboard, and two gulls on the edge. Their shadows run long to the right. */
function thingsQuay15(g,r){const E=edgeQuay15,SH='rgba(44,38,76,.3)',post=(x,y)=>{poly(g,[x+5,y-.4,x+22,y-1.3,x+22,y-2.6,x+5,y-3.6],SH);
    poly(g,[x,y,x+.5,y-4.6,x+1.4,y-5.9,x+3.6,y-5.9,x+4.5,y-4.6,x+5,y]);g.fillStyle=lg(g,x,0,x+5,0,['#e2d6ba','#b0a692','#7e766c']);g.fill();R(g,x+1.4,y-5.9,2.2,.5,'#f4ead0');R(g,x,y-.5,5,.5,'#645c54')},
    bag=(x,y,w,h,c,k)=>{const P=[x-w,y,x-w*1.1,y-h*.42,x-w*.74,y-h*.8,x-w*.3+k,y-h*.9,x-w*.42+k*1.6,y-h,x+w*.36+k*1.6,y-h*1.03,x+w*.28+k,y-h*.9,x+w*.74,y-h*.78,x+w*1.08,y-h*.4,x+w,y];
      poly(g,P);g.fillStyle=lg(g,x-w,0,x+w,0,[tint(c,.22),c,tint(c,-.34)]);g.fill();
      clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.3,x-w-1,y-h-1,w*2+2,h+2,'overlay',.5);stroke(g,[x-w*.5+k,y-h*.84,x-w*.72,y-h*.4],tint(c,.3),.5);ao(g,x-w-1,y-h*.3,w*2+2,h*.3,'b',.3,'#3a2c3c')})};
  /* two bales of cloth and a sack, at the left, out of everybody's way; we see the right end of each bale, turned from the sun */
  poly(g,[12,112.6,80,109.8,62,105.6,20,100.5]);g.fillStyle=lg(g,20,0,80,0,['rgba(44,38,76,.34)','rgba(44,38,76,.26)','rgba(44,38,76,.1)']);g.fill();
  clothRoll(g,1,111.6,20,6.6,'#8e3f3c',{near:1,face:-.1});clothRoll(g,3,105.2,17,6.2,'#c9b890',{near:1,face:-.12});bag(27.4,112,4.6,10.4,'#c4ac80',.5);
  post(36,E(36)+3.6);
  /* the coil: two turns of line lying flat */
  oval(g,52,108.4,7.4,2.3,'rgba(44,38,76,.3)');for(const[q,c]of[[6.2,'#bca47a'],[3.8,'#d0ba8e']]){g.strokeStyle=tint(c,-.42);g.lineWidth=1.9;g.beginPath();g.ellipse(50,107.6,q,q*.32,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=1.1;g.stroke()}
  {g.strokeStyle='#bca47a';g.lineWidth=.9;g.beginPath();g.moveTo(44.6,106.4);g.quadraticCurveTo(41.4,106,40.8,103.6);g.stroke()}
  /* the bow line: out through her bow below the level of the eyes, beside the stem, sagging down to its post */
  post(129,E(129)+3.6);
  for(const[c,w]of[['#4a3a2a',1.3],['#d6c498',.7]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(117.8,65.4);g.quadraticCurveTo(120.4,92,129.6,98.4);g.stroke()}
  R(g,129.2,98.6,4.8,.7,'#d6c498');R(g,129.1,99.9,5,.7,'#c2ae82');R(g,129.2,99.3,4.8,.5,'#6e5c40');
  gullQuay15(g,182,E(182)+1.8,-1);gullQuay15(g,193.6,E(193.6)+2.2,-1);
  /* oil on the paving before the stand, and a little sand blown against the house */
  for(const[x,y,w,h]of[[258,117.4,6,1.3],[247,121.6,3.6,.9],[277,117,4,1],[268,124.4,3,.8]])oval(g,x,y,w,h,'rgba(84,60,34,.2)');
  for(let i=0;i<12;i++){const x=230+r()*11;R(g,x,104.4+r()*1.6,1.5+r()*3,.5,'rgba(226,208,168,.5)')}}
/* the oil seller's jars, each stopped with a lump of clay. BACKQuay15 stand before his sill, behind the walk strip; FRONTQuay15 stand in
   it, and are the prop. Each is [x, foot, half width, height, shape, color]. With cut, only the front row, for its outline. */
const BACKQuay15=[[243.6,110.4,5.7,16.6,'pithos','#a8643a'],[253.6,110.2,4.3,13.8,'jar','#b87448'],[271.4,110.4,5.9,16.4,'pithos','#9c5c36'],[277.4,110.6,3.1,12,'jug','#b46e42']],
  FRONTQuay15=[[239.4,113.6,2.9,8.6,'jug','#b4703f'],[247.8,113.8,4,12.6,'jar','#a05e36'],[274.6,113.8,4.2,13.6,'jar','#ac6a3e'],[267.4,114,2.7,8.2,'jug','#9a5630']];
function jarQuay15(g,x,y,w,h,kind,c,cut){const w0=Math.max(1.1,POT[kind][0][1]*w),top=y-h;
  vessel(g,x,y,w,h,c,kind,{noShadow:1,bands:kind==='pithos'?[[.3,tint(c,-.4),.6],[.36,tint(c,.3),.4]]:[[.24,tint(c,-.35),.5]]});
  if(!cut){R(g,x-w*.5,top+h*.42,w*.5,h*.3,'rgba(255,226,170,.16)');R(g,x+w*.1,top+h*.18,w*.3,h*.34,'rgba(70,34,14,.2)')}
  /* the stopper: a lump of clay over the mouth, a little wider than the neck */
  poly(g,[x-w0-.2,top+.9,x-w0*.8,top-1,x-w0*.2,top-1.6,x+w0*.5,top-1.5,x+w0*.9,top-.8,x+w0+.2,top+.9],'#cfc0a2');
  if(!cut){R(g,x-w0*.7,top-1,w0*.8,.5,'#f4e8ce');R(g,x+w0*.2,top+.1,w0*.8,.7,'#9a8a72')}}
function jarsQuay15(g,cut){if(!cut){for(const[x,y,w,h]of BACKQuay15.concat(FRONTQuay15))poly(g,[x+w*.5,y+.5,x+w+h*1.7,y-.6,x+w+h*1.7,y-1.8,x+w*.6,y-2.2],'rgba(44,38,76,.26)');
    polesQuay15(g);for(const j of BACKQuay15)jarQuay15(g,...j)}
 for(const j of FRONTQuay15)jarQuay15(g,...j,cut)}
/* the light of the late afternoon: warm from the left, cooler towards the lane; the shade of the house on the quay at the lane's mouth */
function lightQuay15(g){shade(g,[292,104,320,104,320,113,304,109.4],'#a09ac6',.55);ao(g,214,104,34,2.6,'t',.22,'#3a3050');
  /* something tall on the quay behind us lays its long shadow across the corner nearest us */
  shade(g,[0,137.6,70,139.4,118,141.6,150,144,0,144],'#a8a2cc',.5);
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,204,136,1)','rgba(255,214,160,.7)','rgba(206,160,160,.6)']);g.fillRect(0,0,320,144)});
  pool(g,-16,74,180,80,'#ffd8a0',.2,'screen');ao(g,0,124,320,20,'b',.14,'#2a2050')}
/* what moves: light on the water, and three gulls over the harbor, each a flat body with its two wings bent up or down. None of them
   comes to the forestay, and the light keeps clear of the bow line, the tower, the boats and the gulls on the edge. */
let GLQuay15=null;
function drawQuay15(g,t){if(!GLQuay15){const r=rng(1506);GLQuay15=[];
    for(let i=0;i<34;i++){const a=i%3,x=a<2?134+r()*26:172+r()*36,y=a<2?67+Math.pow(r(),1.3)*28:73+r()*17;GLQuay15.push([x,y,2+r()*4,r()])}}
  for(const[x,y,w,ph]of GLQuay15){const k=(t/2600+ph)%1;R(g,x,y,w,.5,`rgba(255,247,220,${(.8*Math.sin(k*3.1416)).toFixed(3)})`)}
  for(const[cx,cy,ax,ay,T,ph]of[[156,24,62,7,34000,0],[238,13,40,5,41000,2.2],[56,43,30,4,29000,4.1]]){const a=t/T*6.2832+ph,x=hp(cx+ax*Math.cos(a)),y=hp(cy+ay*Math.sin(2*a)),w=.15+.85*Math.pow(.5+.5*Math.sin(t/420+ph*2),2);
    for(let k=1;k<=4;k++)for(const d of[-1,1])R(g,x+d*(k+.5)-.5,hp(y-(k<3?k*.6:1.2+(k-2)*.3)*(w*2-.6)),1,.5,k<4?'#77738a':'#4c4858');R(g,x-1,y,2.5,.5,'#6a667c');R(g,x-.5,y+.5,1.5,.5,'#8a869a')}}
/* ==== ART quay15: end ==== */

/* ==== ART upper15: begin ==== */
/* Troas, the upper room on the third story, by night, lit only by its five lamps.
   Called from outside: ART.upper15, and WINUpper15 and EUTUpper15, from which the story takes the window's hotspot and the place of
   the one who sits in the window.
   Reads: stage15() (the picture: 'm' the meeting, the listeners look to Paul · 'x' midnight, the window empty, the listeners turned to
   it, some risen · 'a' after, the listeners round the table) and lamps15() = G.l15, the oil in each lamp, 0 to its fill, in the order
   of LAMPS: 0 in the niche (small, 2), 1 at the stairs (small, 2), 2 hanging (middle, 3), 3 by the speaker (middle, 3), 4 on the table
   (large, 4, two spouts). A level is a whole number, but it falls smoothly while Luke sits. At 0 a lamp is a guttering spark.
   How the light is made. The room is painted once in full light (roomUpper15, kept per picture in SCUpper15). The backdrop the engine
   bakes is that room in the dark of the night (paintUpper15). For each lamp there are two pictures of what it alone lights, a near
   pool and a wide one (maskUpper15: the lit room times the lamp's reach), and the frame that is shown is the dark room with as much
   of each added as the lamp has oil for (glowUpper15), dithered once, as a backdrop is (frameUpper15): so every lamp throws its own
   pool, its reach grows and shrinks with its oil, the far corners stay dark, and the walls have the fine dither of every other room.
   The props, which the engine cuts out of the dark backdrop, get the same piece of the frame laid over them at their own depth. The
   light on the actors follows the same levels (lightUpper15). Only the flames move.
   Halo rule: no flame and no round pool of light comes behind a head. The lamp at the stairs burns at the height of a head, before
   the dark of the stair's shaft; the lamp by the speaker stands on a stand as tall as a man and burns above every head (see
   standUpper15); and the pools on the back wall are long and low.
   Hotspots (ROOMS.upper15): window 38,22,34,42 (WINUpper15), open to the night, with a wide sill: Eutychus is an ACTOR who sits in
   the opening at 52,69 (EUTUpper15), is hidden from the hip down by the sill, which is a prop, and is never painted · hanging lamp
   110,34,16,14, on a small board hung by cords that part upward to two joists · lamp by the speaker 166,60,13,13 on a stand
   170,72,4,46 whose top is a cup as wide as the lamp and whose foot is a round slab · table 196,98,60,12 with the bread, and the
   lamp on the table 220,88,16,10 · lamp in the niche 262,50,14,12 (a low wide recess) · stairs 288,66,32,56: the back wall opens
   on the dark of the stair's shaft, a low wall closes the opening hip-high, and the lamp at the stairs 290,74,12,10 stands on it ·
   big jar 8,92,22,30 · stool 80,116,14,12 · the listeners 66,70,200,41, painted: on the bench that is built along the back wall
   and on the floor before it.
   Actors: Paul 150,118 (at the table's end, 187,116, after midnight) · Korinna 38,122 · Luke comes in at 96,126, sits at 87,130,
   and stands behind his stool, at 96,124, at midnight and after.
   The big jar, the stool and the lamp's stand reach into the walk strip (y 112..138): they are named in props, the stand at y 120,
   the middle of its foot. The sill is a prop too, at y 70, behind which only the one in the window comes. */
/* WINUpper15: the window's opening (x, its top y, its width w), its sill (s, the top of the slab) and where the sill's prop stands (d).
   EUTUpper15: where the one who sits in the window is placed. He sits in the opening, on the sill, at its left side, turned to the
   room and to the speaker: the sill is a prop that stands nearer than he does, so that the slab and the wall under it lie over him
   from the hip down, and what is seen of him is what is seen of anyone who sits in a window above our eyes: his body from the hip
   up, inside the opening, his hands on the sill, his head under its top, the night behind him and beside him. The stars of the
   window keep clear of his outline: those behind him are seen when the window is empty. */
const WINUpper15={x:38,y:22,w:34,s:54,d:70},EUTUpper15=[52,69];
ART.upper15={w:320,q:12,variant:()=>stage15(),paint(g,v){paintUpper15(g,v)},light:()=>lightUpper15(),draw(g,t){drawUpper15(g,t)},front(){},
  props:[{y:122,shape(g){jarUpper15(g)}},{y:126,shape(g){stoolUpper15(g)}},{y:120,shape(g){standUpper15(g);clayUpper15(g,LAMPUpper15[3][0],LAMPUpper15[3][1],1,1)}},
    {y:WINUpper15.d,shape(g){sillShapeUpper15(g)}}]};
const LAMPUpper15=[[273,58.7],[300.5,80.9],[123,41.6],[176.6,67.4],[228,92.6]],   /* where each lamp's wick is: the foot of its flame (the table's lamp has two, 6.5 to either side) */
  CAPUpper15=[2,2,3,3,4],SKYUpper15=[WINUpper15.x+3.5,WINUpper15.y+2.5,WINUpper15.x+WINUpper15.w,WINUpper15.y+2.5,WINUpper15.x+WINUpper15.w,WINUpper15.s,WINUpper15.x+3.5,WINUpper15.s],
  WUpper15='#cdb992',SCUpper15={};
/* the backdrop: the room as the night leaves it without a lamp. The sky in the window is not darkened. */
function paintUpper15(g,v){const S=sceneUpper15(v);g.save();g.setTransform(1,0,0,1,0,0);g.drawImage(S.B,0,0);g.restore();lightmap(g,320,'#262338',nightUpper15)}
/* nightUpper15: the map of the night's own light: the dark of the room, the shade under the sill, the sky, and what the sky lays on
   the sill's edge and on the side of the opening */
function nightUpper15(l){const{x,y,w,s}=WINUpper15;pool(l,165,86,230,120,'#1c1826',1);pool(l,x+w/2,s+10,23,7,'#000000',.6,'source-over');poly(l,SKYUpper15,'#ffffff');
  R(l,x-4,s,w+8,.6,'#5a6088');R(l,x,y+2.5,3.5,s-y-2.5,'#2c2e4c')}
/* toneUpper15: the tone a backdrop gets when the engine finishes it (see finish, in index.html), without its dither.
   ditherUpper15: its dither, without the tone: the same ordered dither, one cell to a room pixel. */
function toneUpper15(g,w,h){const im=g.getImageData(0,0,w,h),d=im.data;
  for(let i=0;i<d.length;i+=4){const m=d[i]*.3+d[i+1]*.59+d[i+2]*.11;for(let k=0;k<3;k++)d[i+k]=(m+(d[i+k]-m)*1.14-128)*1.07+128}
  g.putImageData(im,0,0)}
function ditherUpper15(c,g){const q=12,w=c.width,h=c.height,im=g.getImageData(0,0,w,h),d=im.data;
  for(let y=0,i=0;y<h;y++)for(let x=0;x<w;x++,i+=4){const t=((BAYER[((y>>1)&3)*4+((x>>1)&3)]+.5)/16-.5)*q;
    for(let k=0;k<3;k++)d[i+k]=Math.round((d[i+k]+t)/q)*q}
  g.putImageData(im,0,0)}
/* sceneUpper15: for one picture, the room in full light (B), the room as the night leaves it (D), what each lamp lights of it, near
   and wide (L[i][0], L[i][1]), the outline of each prop (P), and the frame as the lamps stand now (W, with its key). D and L have a
   backdrop's tone and are smooth: the frame is put together from them and dithered once, as a backdrop is (frameUpper15). Dithering
   each lamp's light by itself and adding the pictures would add their dither too, and leave a coarse pattern on the walls. */
function sceneUpper15(v){if(SCUpper15[v])return SCUpper15[v];const W=320*HR,H=144*HR,[B,b]=mk(W,H);b.scale(HR,HR);roomUpper15(b,v);
  const[D,d]=mk(W,H);d.drawImage(B,0,0);lightmap(d,320,'#262338',nightUpper15);toneUpper15(d,W,H);
  const L=LAMPUpper15.map((_,i)=>[0,1].map(k=>{const[c,l]=mk(W,H);l.scale(HR,HR);R(l,0,0,320,144,'#000000');maskUpper15(l,i,k);poly(l,SKYUpper15,'#000000');
    pool(l,WINUpper15.x+WINUpper15.w/2,WINUpper15.s+10,23,7,'#000000',.7,'source-over');
    l.setTransform(1,0,0,1,0,0);l.globalCompositeOperation='multiply';l.drawImage(B,0,0);toneUpper15(l,W,H);return c}));
  const P=ART.upper15.props.map(p=>{const[m,q]=mk(W,H);q.scale(HR,HR);p.shape(q,v);q.setTransform(1,0,0,1,0,0);const im=q.getImageData(0,0,W,H),d=im.data;let x0=W,y0=H,x1=-1,y1=-1;
    for(let y=0,i=3;y<H;y++)for(let x=0;x<W;x++,i+=4){if(d[i]<128){d[i]=0;continue}d[i]=255;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    q.putImageData(im,0,0);const w=x1-x0+1,h=y1-y0+1,[o,og]=mk(w,h);og.drawImage(m,-x0,-y0);
    return{y:p.y,x:x0/HR,t:y0/HR,w:w/HR,h:h/HR,x0,y0,m:o,c:mk(w,h)}});
  return SCUpper15[v]={B,D,L,P,W:mk(W,H),key:null}}
/* frameUpper15: the room as its lamps stand now (A: how much of each lamp's near and wide light): the dark room and the light of the
   five added to it, dithered once; and the same picture cut to the outline of each prop, to be laid over whoever stands behind it */
function frameUpper15(S,A,key){const[c,w]=S.W;w.globalCompositeOperation='source-over';w.globalAlpha=1;w.drawImage(S.D,0,0);
  w.globalCompositeOperation='lighter';A.forEach((a,i)=>a.forEach((al,k)=>{if(al>.004){w.globalAlpha=al;w.drawImage(S.L[i][k],0,0)}}));
  w.globalCompositeOperation='source-over';w.globalAlpha=1;ditherUpper15(c,w);
  for(const p of S.P){const g=p.c[1];g.globalCompositeOperation='copy';g.drawImage(p.m,0,0);g.globalCompositeOperation='source-in';g.drawImage(c,-p.x0,-p.y0)}
  S.key=key}
/* maskUpper15: the reach of lamp i, painted as light on black. k 0: the near pool, which burns as long as there is a spark; k 1: the
   wide one, which grows with the oil. No pool on the back wall is round at the height of a head. */
function maskUpper15(l,i,k){const N='#ffd9a0',F='#f0a45a',D=(x,y,rx,ry,a)=>pool(l,x,y,rx,ry,'#000000',a,'source-over'),
    soft=(x,y,rx,ry,c,a)=>{pool(l,x,y,rx,ry,c,a*.3);pool(l,x,y,rx*.68,ry*.68,c,a*.35);pool(l,x,y,rx*.4,ry*.4,c,a*.45)};   /* a pool that fades out without an edge */
  if(i===0){if(!k){inRect(l,256,47,28,16,()=>{pool(l,273,57,18,14,N,1);pool(l,273,56,8,7,N,.6)});pool(l,270,65,20,4,N,.3)}
    else{pool(l,270,106,70,36,F,.5);pool(l,270,72,50,30,F,.14)}}
  else if(i===1){if(!k){soft(299,84,30,8,N,1);soft(303,80,26,10,N,.5);pool(l,314,97,9,7,N,.6)}
    else{pool(l,298,92,56,36,F,.52);pool(l,290,120,46,14,F,.3)}
    R(l,288,85.2,21,16.3,'rgba(0,0,0,.8)')}   /* the face of the low wall lies under its own lamp, in the dark */
  else if(i===2){if(!k){soft(122,41,44,29,N,1);pool(l,122,9,34,9,N,.5)}
    else{pool(l,122,54,108,66,F,.62);pool(l,120,116,88,26,F,.36);pool(l,122,7,76,12,F,.4)}}
  else if(i===3){if(!k){soft(176,81,60,22,N,.62);soft(174,121,48,13,N,.5);D(172,120,13,6,.5);R(l,168.6,74,7,38,'rgba(0,0,0,.6)')}
    else{pool(l,176,84,112,50,F,.6);pool(l,174,125,88,24,F,.42);pool(l,176,7,64,10,F,.22)}}
  else if(!k){soft(228,97,44,8,N,.9);soft(228,91,40,18,N,.52)}
  else{pool(l,228,86,116,56,F,.62);pool(l,228,131,90,20,F,.34);pool(l,228,7,70,10,F,.2);D(226,108,38,8,.6)}}
/* glowUpper15: how much of lamp i's near and wide pool is seen at oil level v */
function glowUpper15(i,v){v=Math.max(0,v);return[Math.min(1,.2+.8*v),Math.min(1,v/CAPUpper15[i])]}
/* drawUpper15: the room in the light of its five lamps, and their flames. The frame is put together anew only when a lamp's light has
   changed (while Luke sits, and when he pours). The props are cut from the dark backdrop by the engine: the same piece of the lit
   frame is laid over each one, just in front of it, and with the stand's the flame of the lamp that stands on it. */
function drawUpper15(g,t){const S=sceneUpper15(stage15()),L=lamps15(),A=L.map((v,i)=>glowUpper15(i,v)),key=A.map(a=>Math.round(a[0]*64)+'.'+Math.round(a[1]*64)).join('/');
  if(S.key!==key)frameUpper15(S,A,key);
  g.drawImage(S.W[0],0,0,320,144);
  LAMPUpper15.forEach(([x,y],i)=>{if(i!==3)for(const dx of i===4?[-6.5,6.5]:[0])flameUpper15(g,x+dx,y,t+i*370+dx*40,L[i])});
  S.P.forEach((p,n)=>depth(p.y+.02,()=>{g.drawImage(p.c[0],p.x,p.t,p.w,p.h);if(n===2)flameUpper15(g,LAMPUpper15[3][0],LAMPUpper15[3][1],t+1110,L[3])}))}
function flameUpper15(g,x,y,t,v){const f=Math.floor(t/110)%3;v=Math.max(0,v);
  if(v<.5){R(g,x-.5,y-.5-(f===1?.5:0),1,1,f?'#ff9a3a':'#c85a1c');if(!f)R(g,x-.5,y-1,.5,.5,'#ffd080');return}
  const h=2.4+v*1.15+(f===1?.7:f?.3:0),s=f===2?.4:f?-.3:0;
  pool(g,x,y-h*.5,2.6+v*.7,3+v*.8,'#ffc870',.28);
  poly(g,[x-1.2,y+.3,x-1.5,y-h*.28,x-.6+s,y-h*.7,x+.1+s*2,y-h,x+.8+s,y-h*.6,x+1.5,y-h*.26,x+1.2,y+.3],'#ee6a1c');
  poly(g,[x-.8,y+.3,x-1,y-h*.25,x-.1+s,y-h*.74,x+.9,y-h*.24,x+.8,y+.3],'#ffc040');
  poly(g,[x-.5,y+.2,x-.5,y-h*.26,x+s*.5,y-h*.5,x+.5,y-h*.26,x+.5,y+.2],'#fff4cc')}
/* lightUpper15: the light on the people in the room: one lamp of the engine's for each of the five, its reach and warmth by its oil */
function lightUpper15(){const L=lamps15(),C=[[272,92,.8],[298,96,.8],[122,74,1],[176,86,1],[228,96,1.15]];
  return{amb:'#2e2a40',lamps:C.map(([x,y,s],i)=>{const v=Math.max(0,L[i]);return[x,y,(62+v*24)*s,mix('#000000','#c48e46',.12+.48*Math.min(1,v)+.4*Math.min(1,v/CAPUpper15[i]))]})}}

/* roomUpper15: the room in full light */
function roomUpper15(g,v){const r=rng(1507),W=WUpper15;
  R(g,0,0,320,9.6,'#34261a');tex(g,'wood',.5,0,0,320,9.6,'overlay',.5);
  floorUpper15(g,r);wallUpper15(g,r,W);ceilUpper15(g,r);windowUpper15(g,W,v);nicheUpper15(g,W);stairsUpper15(g,W);benchUpper15(g,W,r);
  folkUpper15(g,v,0);tableUpper15(g,v);folkUpper15(g,v,1);
  hangUpper15(g);oval(g,173.5,121.4,11,4.6,'rgba(0,0,0,.4)');standUpper15(g);clayUpper15(g,LAMPUpper15[3][0],LAMPUpper15[3][1],1,1);clayUpper15(g,273,58.7,.8,1);
  oval(g,21,121.8,12.5,2.6,'rgba(0,0,0,.42)');jarUpper15(g);oval(g,88,127.6,8.5,1.8,'rgba(0,0,0,.36)');stoolUpper15(g)}
/* the joists run from the back wall toward us and fan out as they come; of each we see the underside and the side that is turned
   to the middle of the room. None stands upright under the middle. */
function ceilUpper15(g,r){const P=(x,y,s)=>[160+(x-160)*s,70+(y-70)*s],S=1.32,C='#7c5c3a';
  for(let x=38;x<320;x+=40)stroke(g,[x,9.6,...P(x,9.6,S)],'rgba(0,0,0,.3)',.5);
  for(let x=18;x<320;x+=40){const s=x<160?1:-1,e=x+3*s,c=tint(C,(r()-.5)*.14);
    poly(g,[e,13.2,e,9.6,...P(e,9.6,S),...P(e,13.2,S)],tint(c,-.4));
    poly(g,[x-3,13.2,x+3,13.2,...P(x+3,13.2,S),...P(x-3,13.2,S)],c);
    stroke(g,[e,13.2,...P(e,13.2,S)],tint(c,.2),.5);R(g,x-3,12.7,6,.5,tint(c,-.3))}
  tex(g,'vert',.3,0,0,320,13.2,'overlay',.5)}
function wallUpper15(g,r,W){plaster(g,0,9.6,320,92,W,r,{patch:0,cracks:0,top:0,bot:-.18,t:.55});
  for(const c of[[22,24,25,29,23.6,35,27,40,25.4,47,29,53],[236,26,239.6,30,238,35,242,40,240.6,46],[150,18,153,21,151.6,25,155.4,29]]){stroke(g,c,'rgba(0,0,0,.3)',.5);stroke(g,c.map((v,i)=>i%2?v:v+.5),'rgba(255,255,255,.1)',.5)}tex(g,'blotch',.3,0,9.6,320,92,'overlay',2.5);
  /* long low stains, and the wall rubbed and darkened toward the floor */
  for(let i=0;i<9;i++)oval(g,20+r()*290,18+r()*60,12+r()*20,1.5+r()*2,'rgba(90,70,48,.09)');
  g.fillStyle=lg(g,0,74,0,101.5,['rgba(106,82,56,0)','rgba(106,82,56,.24)']);g.fillRect(0,74,320,27.5);
  /* where the plaster has come away, high up: a long low patch of mud brick */
  const B=[197,19.6,203,18.2,208,19.4,214,18,221,19,223.4,21.6,221.6,23.4,223,26,216,27.4,211,26,205,27.6,199.6,26.2,198,23.4,195.6,22];
  clipTo(g,()=>poly(g,B),()=>{R(g,194,17,34,11,'#5e4030');for(let j=0,row=0;j<11;j+=2.6,row++)for(let i=-(row%2)*3;i<34;i+=6)R(g,194+i,17+j,5.4,2,tint('#a4684a',(r()-.5)*.24))});
  stroke(g,B.concat(B.slice(0,2)),'rgba(0,0,0,.28)',.5);
  ao(g,0,9.6,320,8,'t',.42);ao(g,0,95,320,6.5,'b',.2);
  /* the side wall at the left: the corner of the room */
  clipTo(g,()=>poly(g,[0,5.1,11,9.6,11,101.5,0,103.8]),()=>{plaster(g,0,5,11,99,tint(W,-.2),r,{cracks:0,bot:-.2});ao(g,0,5,11,99,'r',.22)});
  R(g,11,9.6,.5,91.9,'rgba(0,0,0,.3)');ao(g,11.5,9.6,6,91.9,'l',.16)}
function floorUpper15(g,r){const C='#8c6e4c',Y=[101.5,104,107,110.5,114.5,119,124.5,130.5,137,144];
  for(let k=0;k<9;k++){const a=Y[k],b=Y[k+1];let x=-r()*40;
    while(x<320){const w=46+r()*60,c=tint(C,(r()-.5)*.16-(8-k)*.012);R(g,x,a,w,b-a,c);R(g,x,a,w,.5,tint(c,-.3));R(g,x+w-.5,a+.5,.5,b-a-.5,tint(c,-.34));x+=w}}
  tex(g,'wood',.5,0,101.5,320,42.5,'overlay',.6);tex(g,'mott',.25,0,101.5,320,42.5,'overlay',1);ao(g,0,101.5,320,5,'t',.4);
  /* a rush mat before the bench: its rushes run one way */
  const M='#b49a62';poly(g,[69,103.2,161,103.2,165,110.6,65,110.6],M);
  for(const[y,i]of[[104.5,1.4],[106,2.2],[107.6,3],[109.2,3.8]])stroke(g,[68-i,y,162+i,y],'rgba(84,62,30,.34)',.5);
  R(g,65,110.6,100,.6,'rgba(0,0,0,.3)');clipTo(g,()=>poly(g,[69,103.2,161,103.2,165,110.6,65,110.6]),()=>{tex(g,'grain',.3,64,103,102,8,'overlay',.5);ao(g,64,103.2,102,2.4,'t',.3)})}
/* the window, open to the night, and its sill: a slab of stone on two brackets, set at its ends. The window is above our eyes: we see
   into the left of the opening and up under its top, and nothing of the sill's upper side. The opening is tall enough for one who
   sits on the sill: his head comes under its top, with the night above it. No beam lies over it.
   sillShapeUpper15: the sill's prop, the slab and the wall under it as far down as the one who sits there reaches (see EUTUpper15). */
function windowUpper15(g,W,v){const{x,y,w,s}=WINUpper15,h=s-y;
  ao(g,x-5,s+4,w+10,15,'t',.7);
  R(g,x,y,w,h,tint(W,-.5));R(g,x,y,3.5,h,tint(W,-.1));ao(g,x,y,3.5,h,'r',.2);R(g,x,y,w,2.5,tint(W,-.44));R(g,x,y,3.5,2.5,tint(W,-.5));
  g.fillStyle=lg(g,0,y+2.5,0,s,['#0a1130','#141f48','#1e2c58']);g.fillRect(x+3.5,y+2.5,w-3.5,h-2.5);
  for(const[sx,sy,b]of[[6.5,5,0],[30.5,4.5,1],[14,3.5,0],[24.5,8.5,0],[5.5,12,0],[31,15.5,0],[28,23.5,1],[31.5,29,0],[19,19.5,0],[16,26.5,0],[11,24,1],[24,30,0]])
    R(g,x+sx,y+sy,.5,.5,b?'#f0f2ff':'#9aa6d8');
  R(g,x+3.5,y+2.5,.5,h-2.5,'rgba(0,0,0,.4)');
  R(g,x-.5,y-.5,w+1,.5,tint(W,-.3));R(g,x-.5,y,.5,h,tint(W,-.34));R(g,x+w,y,.5,h,tint(W,.08));
  R(g,x-4,s,w+8,4,tint(W,-.04));tex(g,'mott',.4,x-4,s,w+8,4);R(g,x-4,s,w+8,.6,tint(W,.3));R(g,x-4,s+3.4,w+8,.6,tint(W,-.4));
  poly(g,[x-3,s+4,x+.8,s+4,x-2.2,s+9.6,x-3,s+9.6],tint(W,-.2));poly(g,[x+w-.8,s+4,x+w+3,s+4,x+w+3,s+9.6,x+w+2.2,s+9.6],tint(W,-.3))}
function sillShapeUpper15(g){const{x,w,s,d}=WINUpper15,k='#000';R(g,x-4,s,w+8,4,k);R(g,x+6,s+4,w-10,d+2.6-s-4,k)}
/* the niche: a low wide recess, above our eyes, so that we see up under its top. Soot has gone up the wall from it. */
function nicheUpper15(g,W){const x=256,y=47,w=28,h=16;
  pool(g,273,45,9,5,'#2a2018',.4,'source-over');pool(g,273.6,40,6,8,'#2a2018',.26,'source-over');pool(g,274,33,4.4,7,'#2a2018',.14,'source-over');
  R(g,x,y,w,h,tint(W,-.16));tex(g,'mott',.4,x,y,w,h);R(g,x,y,w,2.6,tint(W,-.44));pool(g,273,48.4,7,2.4,'#1a120c',.7,'source-over');
  R(g,x+w-2.4,y+2.6,2.4,h-2.6,tint(W,-.04));R(g,x,y+2.6,.8,h-2.6,tint(W,-.5));ao(g,x+.8,y+2.6,7,h-2.6,'l',.3);
  R(g,x-1,y+h,w+2,1.2,tint(W,.12));R(g,x-1,y+h+1.2,w+2,.6,tint(W,-.35))}
/* the head of the stair. The back wall opens on the stair's shaft, whose own walls are bare mud brick. A low wall closes the
   opening as high as a hip, and the lamp stands on it; at the right the low wall ends, and there the floor runs in to the landing,
   from which the steps go down to the left, behind the low wall and out of our sight. What tells of them is the rail on the far
   wall, which slants down with them. Behind the lamp is the dark of the shaft, and no bright wall. */
function stairsUpper15(g,W){const S='#7c5e3e',K='#584432',C='#8c6e4c',r=rng(1511);
  R(g,288,66,32,35.5,'#221a14');
  inRect(g,288.6,69.4,31.4,23.1,()=>{for(let j=0,row=0;j<24;j+=2.6,row++)for(let i=-(row%2)*3.4;i<34;i+=6.8)R(g,288.6+i,69.4+j,6.3,2.1,tint(K,(r()-.5)*.22-.08));
    tex(g,'mott',.4,288,69,32,24);ao(g,288.6,69.4,31.4,7,'t',.5);ao(g,288.6,69.4,6,23.1,'l',.45)});
  R(g,309,92.5,11,9,tint(C,-.12));R(g,309,92.5,11,.5,'rgba(0,0,0,.45)');R(g,309,95.4,11,.5,'rgba(0,0,0,.3)');R(g,309,98.2,11,.5,'rgba(0,0,0,.3)');ao(g,309,92.5,4,9,'l',.4);
  stroke(g,[320.4,72.2,304.6,84.8],'rgba(0,0,0,.45)',.6);stroke(g,[320.4,71.4,304.6,84],tint(S,.12),.9);
  wood(g,288,66,32,3.4,'#6a4e30');R(g,288,69.4,32,.6,'rgba(0,0,0,.5)');
  /* the low wall */
  plaster(g,288,84.6,21,16.9,tint(W,-.08),r,{cracks:0,top:.04,bot:-.2});R(g,288,84.6,21,.5,tint(W,.18));R(g,308.5,84.6,.5,16.9,tint(W,-.38));
  R(g,302.4,96.6,4.6,1.3,'#a4684a');R(g,300.2,98.4,6,1.3,'#96583e');R(g,303.6,100.2,4,1.2,'#a4684a');
  poly(g,[288.5,82.4,309,82.4,309,84.6,288,84.6],tint(W,0));R(g,288.5,82.4,20.5,.5,tint(W,-.3));
  R(g,287.5,69.4,.5,15.2,tint(W,.12));
  oval(g,297,84.4,5.4,1,'rgba(0,0,0,.3)');clayUpper15(g,300.5,80.9,.8,1,1)}
/* the bench: built of mud brick along the back wall and plastered like it, so that it has no legs */
function benchUpper15(g,W,r){ao(g,66,86,196,4.6,'b',.2);
  plaster(g,66,93,196,8.5,tint(W,-.28),r,{cracks:0,top:.02,bot:-.2});R(g,66,90.6,196,2.4,tint(W,-.14));tex(g,'mott',.4,66,90.6,196,2.4);R(g,66,93,196,.5,tint(W,-.04));
  R(g,261.5,90.6,.5,10.9,tint(W,-.42));R(g,66,90.6,.5,10.9,tint(W,-.3))}
/* the table: a low one, its legs at its ends; flat loaves on it, and the large lamp with its two spouts */
function tableUpper15(g,v){const C='#7e5c3a';
  oval(g,226,109.6,34,3.4,'rgba(0,0,0,.42)');
  R(g,201,102,2.4,5.4,tint(C,-.48));R(g,248.6,102,2.4,5.4,tint(C,-.48));
  wood(g,197.5,102,3,8,tint(C,-.2),1);wood(g,251.5,102,3,8,tint(C,-.2),1);
  poly(g,[199,96.4,253,96.4,256,99.6,196,99.6],tint(C,.2));clipTo(g,()=>poly(g,[199,96.4,253,96.4,256,99.6,196,99.6]),()=>tex(g,'wood',.5,196,96,60,4,'overlay',.5));
  R(g,196,99.6,60,2.4,C);R(g,196,99.6,60,.5,tint(C,.34));R(g,196,101.5,60,.5,tint(C,-.4));
  const loaf=(x,y,rx)=>{oval(g,x,y+.6,rx,rx*.36,'#8a5c2c');oval(g,x,y,rx,rx*.34,'#c89650');R(g,x-rx*.55,y-rx*.2,rx*.9,.6,'#e2c080')};
  if(v==='a'){/* one loaf has been broken */
    poly(g,[201.4,97.6,202.6,96.4,205.6,96.2,206,98.9,203,98.9],'#c89650');R(g,202.8,96.6,2.6,.6,'#e2c080');poly(g,[207.6,96.3,210.8,96.6,211.8,97.9,210.4,99,207.4,98.9],'#c89650');R(g,207.6,96.6,2.6,.6,'#ecd9a8')}
  else loaf(206.5,97.5,4.6);
  loaf(246,98,4.4);if(v!=='a')loaf(245.4,96.8,4.2);
  poly(g,[211.6,96.3,216.4,96.3,215.4,98.7,212.6,98.7],'#a8683e');R(g,212,96.3,4,.7,'#3a2418');R(g,211.6,96.3,.6,1.6,'#c88a5a');
  bigUpper15(g)}
/* the lamps are of clay and closed: a low round body with a filling hole in its top, and a spout for the wick (Insight, "Lamp").
   clayUpper15: one with its wick at wx,wy and its body behind the wick, away from d; top: we look down on it and see the hole. */
function clayUpper15(g,wx,wy,k,d,top){const C='#8e5234';
  poly(g,[1.2,.5,1.3,1.7,-1.5,3.2,-2.6,4.6,-8,4.6,-9.6,3.1,-9.6,2,-8.6,.9,-6.6,.3,-3.6,.3,-2.2,.9,-.8,.4].map((q,i)=>i%2?wy+q*k:wx+d*q*k));
  g.fillStyle=lg(g,0,wy,0,wy+4.6*k,[tint(C,.26),C,tint(C,-.44)]);g.fill();
  R(g,Math.min(wx-d*6.6*k,wx-d*3.6*k),wy+.3*k,3*k,.5,tint(C,.44));
  if(top)R(g,wx-d*5.1*k-.5,wy+.3*k,1,.5,'#3a2216');
  R(g,wx-.5,wy-.1,1,.7,'#2a1a10')}
function bigUpper15(g){const C='#8e5234',x=228,y=98.3;
  oval(g,x,y+.2,8,1.3,'rgba(0,0,0,.36)');
  poly(g,[x-7.6,y-5.2,x-6.2,y-5.6,x-3.4,y-4.6,x-2,y-5.4,x+2,y-5.4,x+3.4,y-4.6,x+6.2,y-5.6,x+7.6,y-5.2,x+7.4,y-4,x+4.6,y-1.4,x+3.6,y,x-3.6,y,x-4.6,y-1.4,x-7.4,y-4]);
  g.fillStyle=lg(g,0,y-5.6,0,y,[tint(C,.24),C,tint(C,-.42)]);g.fill();
  R(g,x-2,y-5.4,4,.6,tint(C,.42));R(g,x-.5,y-5.4,1,.6,'#3a2216');
  for(const s of[-1,1])R(g,x+s*6.5-.5,y-5.8,1,.7,'#2a1a10')}
/* the hanging lamp: it stands on a small board, and the board hangs by cords that part as they go up, each to a joist of its own */
function hangUpper15(g){const K='#a08c60';
  stroke(g,[111.8,46.4,98.2,11.8],K,.6);stroke(g,[125.4,46.4,137.4,11.8],K,.6);R(g,97.7,11,1,1,'#3e2e1e');R(g,136.9,11,1,1,'#3e2e1e');
  R(g,111,46.2,15.4,1.4,'#6e5234');R(g,111,46.2,15.4,.5,'#8e7048');
  clayUpper15(g,123,41.6,1,1)}
/* the stand of the lamp by the speaker: its top is a cup that narrows to the shaft, as wide as the lamp that stands in it: no flat
   top on a thin post. Its foot is a broad round slab, which we look down on. The stand is as tall as a man, so that the lamp burns
   above every head in the room (its wick at y 67.4; the head of whoever stands at the back of the walk strip comes to y 67): the
   flame is never seen to sit on a head, whoever stands before the stand or behind it. The prop stands where the shaft does, in the
   middle of the foot (y 120). */
function standUpper15(g){const C='#6e5232';
  oval(g,172,120.6,8,4.4,tint(C,-.5));oval(g,172,119.4,8,4.4,tint(C,-.12));oval(g,171.4,119,6.4,3.2,tint(C,.04));
  poly(g,[166,72,178,72,177.4,73.2,174.8,77.6,174,80.6,174.3,110,175.4,116.4,176,118.6,168,118.6,168.6,116.4,169.7,110,170,80.6,169.2,77.6,166.6,73.2]);
  g.fillStyle=lg(g,166,0,178,0,[[0,tint(C,-.2)],[.4,tint(C,.22)],[.62,C],[1,tint(C,-.4)]]);g.fill();
  R(g,166,72,12,.6,tint(C,.4))}
/* the big jar for the oil: we look down into its mouth, and the lines cut round its shoulder bend as its outline does */
function jarUpper15(g){const x=19,y=121.6,h=29,C='#a8643e',pts=[[0,6.2],[.05,5.3],[.12,6],[.46,11],[.8,8],[1,4.2]],L=[],Rt=[],
    hw=t=>{let i=1;while(i<pts.length-1&&pts[i][0]<t)i++;const a=pts[i-1],b=pts[i],q=clamp((t-a[0])/(b[0]-a[0]),0,1),s=q*q*(3-2*q);return a[1]+(b[1]-a[1])*s};
  for(let i=0;i<=40;i++){const t=i/40,w=hw(t);L.push(x-w,y-h+t*h);Rt.unshift(x+w,y-h+t*h)}
  poly(g,L.concat(Rt));g.fillStyle=lg(g,x-11,0,x+11,0,[[0,tint(C,-.5)],[.45,tint(C,-.1)],[.74,tint(C,.24)],[1,tint(C,-.28)]]);g.fill();
  clipTo(g,()=>poly(g,L.concat(Rt)),()=>{tex(g,'mott',.35,x-11,y-h,22,h);ao(g,x-11,y-9,22,9,'b',.4);
    g.strokeStyle='rgba(74,38,22,.55)';g.lineWidth=.5;for(const t of[.2,.26]){g.beginPath();g.ellipse(x,y-h+t*h,hw(t),hw(t)*.22,0,0,3.1416);g.stroke()}});
  oval(g,x,y-h+.5,6.2,1.7,'#2a1810');g.strokeStyle=tint(C,.3);g.lineWidth=.5;g.beginPath();g.ellipse(x,y-h+.5,6.2,1.7,0,0,3.1416);g.stroke()}
/* the stool: its legs stand under its ends */
function stoolUpper15(g){const C='#8a6a44';
  R(g,83.4,120.2,1.4,5.6,tint(C,-.5));R(g,89.2,120.2,1.4,5.6,tint(C,-.5));
  poly(g,[81,120.2,83.2,120.2,82.2,128,80.2,128],tint(C,-.2));poly(g,[90.8,120.2,93,120.2,93.8,128,91.8,128],tint(C,-.3));
  poly(g,[81,116.4,93,116.4,94,118.6,80,118.6],tint(C,.2));R(g,80,118.6,14,1.6,C);R(g,80,118.6,14,.5,tint(C,.34));R(g,80,119.8,14,.4,tint(C,-.4))}

/* ---- the listeners, painted ---- */
/* m: on the bench and on the floor, looking to Paul. x: turned to the window, some risen. a: round the table.
   layer 0: those on the bench, behind the table; layer 1: those on the floor before it, and those who stand.
   Each: [kind b bench · f floor · r risen, x, y, d the way the head is turned, garment, mantle or -1, skin, hair, more]
   more: f a woman, her head covered · b a beard · p the head seen from the side · short a tunic to the knee.
   Nobody sits behind the stool, where Luke stands and sits, or before a lamp. */
function folkUpper15(g,v,layer){const GC=['#c2b08c','#8f6f52','#6f7f6a','#58688a','#a05a48','#c8bea0','#70583e','#9a8456'],MC=['#7a4a38','#4a5a70','#8a7a50','#5c5c4c','#a89678','#6a4a5a'],
    SK=['#c8946a','#b8825a','#d0a078','#a87650'],HC=['#2a1c14','#4a3420','#1c1410','#8a8680','#5a4028'],
  L={m:[['b',75.5,104.5,1,5,0,2,0,{f:1}],['b',109,104.5,1,1,-1,0,1,{b:1,short:1}],['b',136,104.5,1,2,2,1,2,{b:1}],
       ['b',207,104.5,-1,3,-1,0,0,{short:1}],['b',247,104.5,-1,4,4,2,1,{f:1}],['b',260,104.5,-1,6,2,1,2,{b:1}],
       ['f',121.5,110.6,1,0,1,2,4,{f:1}],['f',189,110.6,-1,0,3,3,3,{b:1}]],
     x:[['b',136,104.5,-1,2,2,1,2,{b:1,p:1}],['b',207,104.5,-1,3,-1,0,0,{p:1,short:1}],['b',247,104.5,-1,4,4,2,1,{f:1,p:1}],
       ['r',74,106.4,-1,1,-1,0,1,{short:1,b:1}],['r',116,105.6,-1,0,1,2,4,{f:1}],['r',188,106.6,-1,0,3,3,3,{b:1}],
       ['f',262,110.6,-1,6,2,1,2,{b:1}]],
     a:[['b',109,104.5,1,1,-1,0,1,{b:1,short:1}],['b',204,104.5,-1,2,2,1,2,{b:1}],['b',214.5,104.5,-1,0,1,2,4,{f:1}],
       ['b',241.5,104.5,-1,3,-1,0,0,{short:1}],['b',252,104.5,-1,4,4,2,1,{f:1}],
       ['f',124,110.6,1,5,0,2,0,{f:1}],['f',150,110.6,1,6,3,0,2,{b:1}],['f',268,110.6,-1,0,3,3,3,{b:1}]]}[v];
  L.filter(p=>(p[0]==='b')===!layer).sort((a,b)=>a[2]-b[2]).forEach(([t,x,y,d,gi,mi,si,hi,o])=>{
    o=Object.assign({d,l:x<228?1:-1,g:GC[gi],m:mi<0?null:MC[mi],s:SK[si],h:HC[hi]},o);(t==='b'?sitterUpper15:t==='f'?squatUpper15:risenUpper15)(g,x,y,o)})}
/* the heads are set pixel by pixel, half a room pixel to each, as they look to the right: m a man turned three quarters to us, w a
   woman, her mantle over her head, pm and pw the same two from the side, bm a man from behind, his cheek just showing.
   h H hair · s S skin · d skin in shade · e an eye · b the beard (skin, where he has none) · v V the mantle */
const HEADUpper15={
  m:['....hhhhhhhh','..hhhhhhhhhhhh','.hhhhHHHHHHhhhh','.hhhHHHHHHHHhhh','hhhhhssssssshhh','hhhhsSSSSSSSshh','hhhssSSSSSSSss','hhhssSSSSSSSss','hhhsddeSSSdeSs','hhdssSSSSSSSSs',
     '.hdssSSSSdSSss','.hhssSSSSdSSss','..bbsSSSSSSSbb','..bbbsddddsbbb','..bbbbbbbbbbbb','...bbbbbbbbbbb','...bbbbbbbbbb','....bbbbbbbb','.....bbbbbb'],
  w:['....vvvvvvvv','..vvVVVVVVVvvv','.vvVVVVVVVVVVvv','.vVVVVvvvvvVVVv','vvVVvhhhhhhhVVv','vvVvhsSSSSSShVv','vvVvssSSSSSSsvv','vvVvssSSSSSSsvv','vvVvsdeSSSdesvv','vvVvssSSSSSSsvv',
     'vvVvssSSSdSSsvv','vvVvvsSSSSSSsvv','vvVVvssSddSsvvv','vvVVvvsSSSssvvv','vvVVVvvssssvvvv','vvVVVVvvvvvvvvv','vvVVVVVvvvvvvvvv','vVVVVVVVvvvvvvvv','vVVVVVVVVvvvvvvv','VVVVVVVVVvvvvvvv'],
  pm:['....hhhhhhhh','..hhhhhhhhhhhh','.hhhhhHHHHHHhh','.hhhhHHHHHHHHhh','hhhhhhhHHHsssss','hhhhhhhhssSSSSs','hhhhhhhssSSSSSs','hhhhhhsssSSSSSs','hhhhhhsssSSdeSs','.hhhhsdssSSSSSSs',
     '.hhhhsdssSSSSSSs','..hhhsssSSSSSSs','..hhbbssSSSSSs','...bbbbsSSdddd','...bbbbbbbbbbb','....bbbbbbbbbb','....bbbbbbbbb','.....bbbbbbb','......bbbbb'],
  pw:['....vvvvvvv','..vvVVVVVVVvv','.vvVVVVVVVVVvv','.vVVVVVVVVVVVvv','vvVVVVVVVVvhhhh','vvVVVVVVVvhsSSs','vvVVVVVVvhsSSSs','vvVVVVVVvssSSSs','vvVVVVVVvssSdeSs','vvVVVVVVvssSSSSs',
     'vvVVVVVVvssSSSs','vvVVVVVVVvsSSSs','vvVVVVVVVvssSdd','vvVVVVVVVVvssss','vvVVVVVVVVVvss','vvVVVVVVVVVVv','vvVVVVVVVVVVvv','vVVVVVVVVVVVvvv','vVVVVVVVVVVVVvvv','VVVVVVVVVVVVVvvv'],
  bm:['....hhhhhhhh','..hhhhhhhhhhhh','.hhhhHHHHHHhhhh','.hhhHHHHHHHHhhh','hhhhHHHHHHHHhhh','hhhhhHHHHHHhhhh','hhhhhhhhhhhhhhs','hhhhhhhhhhhhhss','hhhhhhhhhhhhdsS','hhhhhhhhhhhhdsS',
     '.hhhhhhhhhhhhss','.hhhhhhhhhhhhs','..hhhhhhhhhhbb','..dhhhhhhhhdbb','...ddssssddd','....dsssssd','....dsssssd']};
/* a head with its middle at x and its top at y, looking to d */
function headUpper15(g,x,y,d,o,kind){const sk=o.s,H=o.h,V=o.m||o.g,
    C={h:H,H:tint(H,.2),s:sk,S:tint(sk,.12),d:tint(sk,-.32),e:'#22140e',b:o.b?tint(H,.07):tint(sk,-.1),v:tint(V,-.2),V:V};
  HEADUpper15[kind].forEach((row,j)=>{for(let i=0;i<row.length;i++){const c=row[i];if(c==='.'||c==='b'&&!o.b&&j>15)continue;R(g,d>0?x-4+i*.5:x+3.5-i*.5,y+j*.5,.5,.5,C[c])}})}
/* one who sits on the bench, turned three quarters to d; y: where the feet rest; l: the side the light comes from */
function sitterUpper15(g,x,y,o){const d=o.d,l=o.l,G=o.g,sk=o.s,sh=y-24,st=y-12.5,M=o.m&&!o.f?o.m:null,K=M||G,
    side=(c,a,b)=>lg(g,x-6*l,0,x+6*l,0,[tint(c,a==null?-.3:a),c,tint(c,b==null?.14:b)]);
  oval(g,x,y+.2,6,1.3,'rgba(0,0,0,.3)');
  if(o.short&&!M){/* a tunic to the knee: the lap, and the bare shins */
    R(g,x-5,st+3,2.8,y-st-3.8,tint(sk,l>0?-.42:-.2));R(g,x+2.2,st+3,2.8,y-st-3.8,tint(sk,l>0?-.2:-.42));
    R(g,x-6.2,st-1,5.4,4.2,tint(G,l>0?-.12:.08));R(g,x+.8,st-1,5.4,4.2,tint(G,l>0?.08:-.12));R(g,x-6.2,st-1,5.4,.8,tint(G,.2));R(g,x+.8,st-1,5.4,.8,tint(G,.28));
    R(g,x-6.2,st+2.8,5.4,.5,tint(G,-.5));R(g,x+.8,st+2.8,5.4,.5,tint(G,-.5))}
  else{/* a long garment: the knees under it, and its folds, which do not run down the middle */
    poly(g,[x-6.2,st-1,x+6.2,st-1,x+6.2,st+2.6,x+5,y-.8,x-5,y-.8,x-6.2,st+2.6]);g.fillStyle=lg(g,0,st+2,0,y,[tint(K,-.06),tint(K,-.4)]);g.fill();
    R(g,x-6.2,st-1,5.4,3.4,tint(K,l>0?.04:.16));R(g,x+.8,st-1,5.4,3.4,tint(K,l>0?.16:.04));
    R(g,x-3,st+2.6,.5,y-st-3.6,tint(K,-.42));R(g,x+2.2,st+2,.5,y-st-3,tint(K,-.42));R(g,x-l*4.9-.3,st+1.6,.6,y-st-2.6,tint(K,-.46))}
  R(g,x-4.8,y-1,3.6,1,'#3a2a1c');R(g,x+1,y-1,3.6,1,'#2a1e16');
  /* the body, the arms at its sides, and the hands in the lap */
  poly(g,[x-5.6,sh+1.4,x-4,sh,x+4,sh,x+5.6,sh+1.4,x+5.4,st-.6,x-5.4,st-.6]);g.fillStyle=side(G);g.fill();
  if(M){const e=-d;poly(g,[x-e*5.6,sh+1.4,x-e*1.2,sh,x+e*5.4,st-4.4,x+e*5.4,st-.6,x-e*5.4,st-.6]);g.fillStyle=side(M);g.fill();stroke(g,[x-e*1.2,sh+.3,x+e*5.2,st-4.6],tint(M,-.42),.5)}
  for(const s of[-1,1]){const c=s===l?-.1:-.34,A=s===-d&&M?M:G,sl=o.f||M&&s===-d;
    R(g,s<0?x-5.9:x+4.1,sh+1.6,1.8,6.6,tint(A,c));
    poly(g,[x+s*5.9,sh+8,x+s*4,sh+7.6,x+s*.4,st-2.9,x+s*.4,st-1.1,x+s*2.2,st-1],sl?tint(A,c+.06):tint(sk,c+.08))}
  R(g,x-1.5,st-3,3,1.9,tint(sk,-.06));R(g,x-1.5,st-1.3,3,.4,tint(sk,-.4));
  if(o.f){const V=o.m||G;poly(g,[x-4.2,sh-1.4,x+4.2,sh-1.4,x+6.2,sh+6.6,x+5.6,sh+8,x-5.6,sh+8,x-6.2,sh+6.6]);g.fillStyle=side(V,-.34,.04);g.fill();R(g,x-2.2+d*1.2,sh-.6,4.4,.6,tint(sk,-.34))}
  else R(g,x-1.3+d*.5,sh-1.4,2.6,1.8,tint(sk,-.32));
  headUpper15(g,x+d*.6,sh-10.6,d,o,(o.p?'p':'')+(o.f?'w':'m'))}
/* one who sits on the floor with the knees drawn up, seen from the side, looking to d; y: where he sits */
function squatUpper15(g,x,y,o){const d=o.d,l=o.l,G=o.g,sk=o.s,M=o.m&&!o.f?o.m:null,q=(...p)=>p.map((n,i)=>i%2?y-n:x+d*n);
  oval(g,x+d*2.4,y+.2,10.5,1.6,'rgba(0,0,0,.32)');
  poly(g,q(-2,0,.5,8,7.5,12.5,9.6,10.6,10.6,1.4,10.4,0),tint(G,-.22));stroke(g,q(1.6,8.2,7.4,11.8,9.2,10.2),tint(G,.05),.6);
  R(g,Math.min(x+d*9.4,x+d*12.6),y-1.2,3.2,1.2,tint(sk,-.36));
  poly(g,q(-6,0,-6.6,7.5,-5.2,16.5,-2,19,2,17.4,3,9,2,0));g.fillStyle=lg(g,x-l*7,0,x+l*4,0,[tint(G,-.36),G,tint(G,.1)]);g.fill();
  if(M)poly(g,q(-6.6,7.5,-5.2,16.5,-2,19,-.4,15.5,-2.8,6,-6,.6),tint(M,-.08));
  if(o.f)poly(g,q(-6.9,6,-5.5,18.2,2,18.2,.6,12.5,-1.8,5.4),tint(o.m||G,-.14));
  poly(g,q(-.6,16.6,1.8,17,8.2,13.2,7.4,11.2,1.4,13.6),tint(G,.07));stroke(g,q(-.2,13.8,1.4,13.4,7.2,11),tint(G,-.4),.5);
  R(g,Math.min(x+d*7.2,x+d*9.6),y-13.6,2.4,1.9,tint(sk,-.04));
  R(g,x+d*.4-1.3,y-20.6,2.6,2,tint(sk,-.32));
  headUpper15(g,x+d*1,y-30,d,o,o.f?'pw':'pm')}
/* one who has risen and looks to d, seen from behind */
function risenUpper15(g,x,y,o){const d=o.d,l=o.l,G=o.g,sk=o.s,sh=y-31.6,wy=y-18,hem=y-(o.short?11:2.2),M=o.m&&!o.f?o.m:null,
    C=l>0?[tint(G,-.3),G,tint(G,.14)]:[tint(G,.14),G,tint(G,-.3)];
  oval(g,x,y,6.4,1.6,'rgba(0,0,0,.34)');
  if(o.short){R(g,x-3.2,hem,2.4,y-hem,tint(sk,-.2));R(g,x+.9,hem,2.4,y-hem,tint(sk,-.38))}
  R(g,x-3.4,y-1,2.8,1,'#3a2a1c');R(g,x+.8,y-1,2.8,1,'#2a1e16');
  R(g,x-6.4,sh+1.6,1.9,12,tint(G,-.2));R(g,x+4.5,sh+1.6,1.9,12,tint(G,-.36));
  R(g,x-6.3,sh+13.6,1.7,1.8,tint(sk,-.1));R(g,x+4.6,sh+13.6,1.7,1.8,tint(sk,-.3));
  poly(g,[x-5.4,sh+1.4,x-3.8,sh,x+3.8,sh,x+5.4,sh+1.4,x+4.8,wy,x+5.6,hem,x-5.6,hem,x-4.8,wy]);g.fillStyle=lg(g,x-6,0,x+6,0,C);g.fill();
  if(!M&&!o.f)R(g,x-4.8,wy,9.6,.6,tint(G,-.44));
  if(M){poly(g,[x-3.8,sh,x+.2,sh,x+5.6,hem-3.4,x+5.6,hem,x-2.8,hem,x-5.3,wy+1,x-5.4,sh+1.4],M);stroke(g,[x+.2,sh+.3,x+5.4,hem-3.8],tint(M,-.38),.5);R(g,x-3,wy+3,.5,hem-wy-4,tint(M,-.3))}
  if(o.f){const V=o.m||G;poly(g,[x-3.4,sh-9,x-2,sh-10.4,x+2,sh-10.4,x+3.4,sh-9,x+4.2,sh-4,x+6.4,sh+3,x+6,sh+12,x-6,sh+12,x-6.4,sh+3,x-4.2,sh-4]);
    g.fillStyle=lg(g,x-6,0,x+6,0,l>0?[tint(V,-.34),V,tint(V,.08)]:[tint(V,.08),V,tint(V,-.34)]);g.fill();R(g,x-l*1.6-.3,sh-3,.6,13,tint(V,-.3))}
  else{R(g,x-1.4,sh-1.6,2.8,2,tint(sk,-.34));headUpper15(g,x,sh-10.4,d,o,'bm')}}
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
/* Each icon is light enough to stand out of the dark slot, with a lit edge (issue #75). The awl is the engine's, and so are the tablets. */
Object.assign(ICON,{
  /* a dry reed, cut slanting at its foot: a pale stalk with three joints, which lie across it and do not stand out beyond it, and one
     withered blade that leaves it at a joint, as a fork */
  reed15(g){const C='#d6c282',L='#fbf2c8',D='#6e5a2a';
    g.beginPath();g.moveTo(12.4,12.4);g.quadraticCurveTo(8.6,9.8,6.6,4.2);g.quadraticCurveTo(10.8,7.2,14,11);g.closePath();g.fillStyle='#a89452';g.fill();
    stroke(g,[8.4,7.4,12.6,11.4],'#d8c88a',.5);
    stroke(g,[4.2,20.6,19.8,4.2],D,3.6);stroke(g,[4.2,20.6,19.8,4.2],C,2.5);stroke(g,[3.9,19.9,19.4,3.6],L,.8);stroke(g,[4.9,21,20.3,4.9],'#9a8648',.5);
    for(const t of[.28,.54,.8]){const x=4.2+15.6*t,y=20.6-16.4*t;stroke(g,[x-.8,y-.76,x+.8,y+.76],D,.7);stroke(g,[x-.4,y-1.2,x+1.2,y+.3],L,.4)}
    poly(g,[3,20.6,4.6,19.2,5.6,20.2,4,21.8],'#f0e2b0');poly(g,[3.6,20.7,4.5,19.9,5,20.4,4.1,21.2],'#8a7438')},
  /* a shell from the quay: a ribbed fan, its rim scalloped, its two ears at the hinge */
  shell15(g){const cx=12,cy=19.4,P=[],N=14,A=a=>Math.PI*(1.1+.8*a);
    for(let i=0;i<=N;i++){const a=A(i/N),r=i%2?9.4:10.4;P.push(cx+r*Math.cos(a),cy+r*Math.sin(a))}
    poly(g,[8.2,18.6,15.8,18.6,15.2,21.6,8.8,21.6],'#c6a482');R(g,8.8,20.9,6.4,.7,'#8a6a50');
    poly(g,P.concat([14.2,20.4,9.8,20.4]));g.fillStyle=rg(g,9,9,15,[[0,'#fffaf0'],[.5,'#f2dcc2'],[1,'#c49e7e']]);g.fill();
    clipTo(g,()=>poly(g,P.concat([14.2,20.4,9.8,20.4])),()=>{
      for(let i=1;i<N;i+=2){const a=A(i/N);stroke(g,[cx+2.2*Math.cos(a),cy+2.2*Math.sin(a),cx+10*Math.cos(a),cy+10*Math.sin(a)],'#a67c5c',.6)}
      for(let i=0;i<=N;i+=2){const a=A(i/N);stroke(g,[cx+3*Math.cos(a),cy+3*Math.sin(a),cx+10*Math.cos(a),cy+10*Math.sin(a)],'rgba(255,252,240,.8)',.5)}
      g.strokeStyle='rgba(150,110,84,.55)';g.lineWidth=.5;g.beginPath();g.arc(cx,cy,6.6,Math.PI*1.12,Math.PI*1.88);g.stroke();
      g.fillStyle=lg(g,0,15,0,21,['rgba(120,84,60,0)','rgba(120,84,60,.5)']);g.fillRect(2,15,20,6)})},
  /* the oil jug: clay, with a loop handle at the back and a narrow spout that rises from its shoulder */
  jug15(g){const C='#c8844e';
    g.strokeStyle='#8a5230';g.lineWidth=2.4;g.lineCap='round';g.beginPath();g.moveTo(8.4,8.6);g.quadraticCurveTo(2.4,9.6,6.2,15.4);g.stroke();
    g.strokeStyle='#e2a472';g.lineWidth=.8;g.beginPath();g.moveTo(8,8.2);g.quadraticCurveTo(2.9,9.4,5.6,14.2);g.stroke();
    poly(g,[14,12.2,16.2,14,21.4,7.4,20.2,6.2],'#a8683a');poly(g,[14.2,12,15,12.7,20.8,6.7,20.2,6.2],'#eab082');R(g,20,5.8,1.6,1.4,'#2a180e');
    vessel(g,11,21.4,7.4,14.4,C,'jug',{noShadow:1,dark:'#2a180e',bands:[[.34,'#e8b488',.7],[.4,'#8a5230',.6]]});
    pool(g,8.4,14.6,2.4,3.6,'#fff0d8',.5,'screen')}});

/* ============ PEOPLE ============ */
/* Dress follows CONTRIBUTING section 4. The men of standing in a Greek city wear the mantle, a length of cloth wrapped over a tunic to
   the feet (HIM): Gaius the host, Nikandros of Corinth, and Sopater of Beroea. Men on the road and men at work wear the short tunic,
   with a mantle over the shoulder or none. A Greek woman wears a tunic to the feet and her mantle drawn over her head (HER).
   The seven of Acts 20:4 are told apart at a glance: Sopater in the long robe, with the red-brown hair his father's name suggests
   (Pyrrhus: the account says no more of him than that name); Aristarchus dark and full-bearded in a green tunic (the look he keeps in
   the chapters to come, shared/cast.js); Secundus grey and thin on top; Gaius of Derbe, a Lycaonian, in a red mantle; Timothy slim, with
   a young man's short beard and now a traveller's mantle (issue #29); Tychicus with a high forehead, in ochre and olive; Trophimus the
   Ephesian in blue. Tertius has a Roman name in a Roman colony: his hair is clipped short and he is clean-shaven. Eutychus is a young
   man, in the account's word (Acts 20:9), slim and beardless. Mikon is a porter, in a short worn tunic with a cloth bound round his head.
   Luke is the Luke of Chapter Eight six years on, with the first grey in his hair and beard; Paul is the engine's Paul of the third
   journey (paulLook). None of this is in the account: it says how none of them looked. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o),
  HER=(skin,mantle,tunic,o)=>Object.assign({skin,veil:mantle,cloak:mantle,himation:1,tunic,long:1,slim:1,longSleeve:1,belt:'#6a4a2a',brow:'#3a2414',ph:0},o);
Object.assign(LOOK,{
  luke15:{skin:'#c4946a',hair:'#4e3e30',beard:'#58483a',grey:'#8a8078',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2e2018',ph:1100},
  tert15:{skin:'#c69870',hair:'#3a2a1a',crop:1,tunic:'#dcd2b6',long:1,belt:'#5a3a20',trim:'#8a6a4a',brow:'#2a1a12',slim:1,ph:500},
  host15:HIM('#b88a62','#7a7068','#ece4d0','#6a4a5a',{grey:'#a8a098',receding:1,brow:'#5a5048',ph:900}),
  nik15:HIM('#c69870','#4a3a2c','#e6dec8','#5a6a4a',{shortBeard:1,ph:1900}),
  tim15:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',cloak:'#5a6a52',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  arist15:{skin:'#bc8a60',hair:'#3a2a1c',beard:'#3a2a1c',fullBeard:1,tunic:'#96a488',cloak:'#5a4e3e',belt:'#3a2818',trim:'#6a765c',brow:'#2a1c12',ph:1500},
  sec15:{skin:'#c49a72',hair:'#8a8680',beard:'#96928c',thin:1,shortBeard:1,brow:'#5e5a54',tunic:'#cfc6ac',cloak:'#55586a',belt:'#3a2a1a',ph:2500},
  sop15:HIM('#b8845a','#6e4028','#e2d8be','#9a7a3e',{fullBeard:1,brow:'#4a2a18',ph:700}),
  gaiusd15:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#c4a878',cloak:'#8a3a2a',belt:'#3a2414',brow:'#1a1210',ph:1300},
  tych15:{skin:'#c69870',hair:'#5a4630',beard:'#5a4630',receding:1,tunic:'#c8a868',cloak:'#6a6a44',belt:'#3a2a1a',trim:'#8a6a3a',brow:'#3a2a1a',ph:2100},
  troph15:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#c8b490',cloak:'#3f5f86',belt:'#4a3a24',brow:'#1a1210',ph:300},
  mikon15:{skin:'#a8703f',beard:'#2a1a12',tunic:'#9a7a5a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:400},
  kor15:HER('#c8a078','#6a5a7a','#dccca4',{ph:1200}),
  seller15:{skin:'#b47e52',hair:'#6a6a6a',beard:'#6a6a6a',receding:1,shortBeard:1,tunic:'#b8a070',apron:'#5a4a28',belt:'#2e2016',brow:'#4a4a4a',ph:200},
  eut15:{skin:'#c89868',hair:'#3a2616',tunic:'#9aa8b8',belt:'#4a3a24',trim:'#5a6a80',slim:1,brow:'#2a1a12',ph:1600},
  kin15a:{skin:'#b8845a',hair:'#5a5048',beard:'#665c52',grey:'#8a8078',tunic:'#a89070',cloak:'#5a5a6a',belt:'#3a2a1a',brow:'#3a322a',ph:800},
  kin15b:HER('#c8a078','#8a6a4a','#c8b090',{brow:'#4a3424',ph:2200})});
const LK=actor('luke15','Luke','#c8e8c0',126),TE=actor('tert15','Tertius','#e0d8b0',132),GA=actor('host15','Gaius','#d8c8a8',104),TI=actor('tim15','Timothy','#b8e0b0',142),
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
  await say(MI,'mikon_paul_a_word',{to:P});AU.mood='warned';await say(MI,'mikon_men_have_been_asking',{to:P});await say(MI,'mikon_i_carry_loads_i_hear_things',{to:P});
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
  F.way=1;AU.mood='road';SFX.pick();await say(P,'by_land_through_macedonia',{to:null});await say(AR,'aristarchus_beroea_thessalonica_on_the_road',{to:P});codeBtn()}
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
/* the plan is laid; the journey is told over the map (Acts 20:4-6), and from the quay of Troas on Luke is played. The shared map
   silences the score when it opens: here the road's tune is given back to it, so that the journey north is walked to it.
   (A code made while the plan's last words are said holds all three settled in this room: then the way back to the quay, outSand, goes on.) */
const outSand=()=>F.awl?planDone():say(P,'not_before_the_plan_is_laid');
async function planDone(){await say(P,'that_is_the_plan',{to:null});await say(AR,'aristarchus_a_long_way_round',{to:P});await say(P,'a_long_way_and_we_arrive',{to:AR});
  try{await open15(ROAD_B);setScore(MUSIC);AU.mood='road';await go15(3);await tell('v4a',null,1);await tell('v4b',null,1);await tell('v5',null,1);await go15(3);await tell('v6',null,1)}catch(e){console.error(e)}
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
   told: it is never drawn, and it makes no sound. The music is silent from midnight until Paul has gone up again, and so is the room:
   the hiss of the lamps ends with the music, and comes back with the one low note. At daybreak the tune begins at its beginning.
   While the street is shown by night Luke stays where he was, in the upper room, and is not seen: so a code made at any moment of this
   (t4 without mid, and the upper room) restores the room at midnight, every lamp burning its last, and the stool leads on from there
   (see sit). */
async function midnight(){AU.mood='none';AU.amb={};
  await tell('v9a');
  await fade(1,500);G.x15='x';show15('upper15',96,124,-1);await fade(0,700);
  await tell('v9b');
  await fade(1,700);G.x15=null;show15('street15');LK.room='upper15';await fade(0,800);
  await tell('v10');
  await fade(1,700);G.x15='a';G.l15=null;show15('upper15',96,124,1);await fade(0,800);
  await tell('v11a');await tell('v11b');
  await fade(1,800);G.x15=null;F.mid=1;AU.step=0;show15('street15');await fade(0,900);
  await tell('v12');codeBtn()}

/* ---- daybreak ---- */
async function leave(){await say(LK,'a_place_and_a_day',TH);
  endScreen({title:'until_daybreak_2',text:'until_daybreak_end',based:'based_on_acts_20_1_12',go:'click_to_return_to_the_title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}

/* ============ ROOMS ============ */
/* A room's hotspots are listed from the back to the front: where two overlap, the later one is meant (the table, then what lies on it).
   Whoever looks at a small thing stands beside it, so that he does not cover it.
   BOTH: Paul and Luke act on a thing or a person through the same handlers: whoever is played says the line (see act, in index.html) */
const BOTH=h=>{h.as={luke15:h};return h};
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.gaius15={space:1.1,walk:[16,304,112,138],mood:'house',amb:AMB.gaius15,hs:[
  {name:'window_to_the_court',x:20,y:34,w:32,h:30,wx:44,wy:116,dir:-1,look:'corinth_winter_light'},
  {name:'table',x:92,y:92,w:64,h:25,wx:164,wy:118,dir:-1,look:letter},
  {name:'letter_to_rome',x:104,y:90,w:30,h:8,wx:164,wy:118,dir:-1,look:letter},
  {name:'reed_pen',x:140,y:90,w:10,h:8,wx:164,wy:118,dir:-1,look:'ink_and_reed_look'},
  {name:'spare_tablet',x:93,y:92,w:11,h:7,wx:84,wy:118,dir:1,look:spare},
  {name:'door_to_the_storeroom',x:268,y:44,w:36,h:60,wx:280,wy:114,dir:1,exit:toScale,look:'door_to_the_storeroom_look'}].map(BOTH)};
ROOMS.scale15={space:.9,walk:NOW,mood:'house',amb:AMB.scale15,hs:[
  ...WIT15.map(m=>({name:ACT[m.a].name,x:m.x,y:0,w:m.w,h:22,wx:160,wy:236,def:'talk',look:m.look,talk:weigh})),
  {name:'scale',x:60,y:24,w:200,h:60,wx:160,wy:236,def:'use',look:()=>say(P,'scale_look').then(()=>say(P,tiltLine(),TH)),use:weigh,talk:weigh},
  {name:'chest',x:262,y:72,w:58,h:72,wx:160,wy:236,look:'chest_look'},
  {get name(){return ROUND[sc15().round].letter},x:8,y:100,w:62,h:40,wx:160,wy:236,vis:()=>!F.s3,look:letterLook},
  {get name(){return ROUND[sc15().round].bagName},get x(){return bagBoxScale15()[0]},get y(){return bagBoxScale15()[1]},w:36,h:22,wx:160,wy:236,vis:()=>!F.s3,look:'bag_look',use:'the_bag_is_not_mine_to_move',pickup:'the_bag_is_not_mine_to_move'},
  ...WT.map(w=>({name:w.name,get x(){return weightBoxScale15(w.id)[0]-2},get y(){return weightBoxScale15(w.id)[1]-2},get w(){return weightBoxScale15(w.id)[2]+4},get h(){return weightBoxScale15(w.id)[3]+4},
    wx:160,wy:236,def:'use',use:()=>moveWeight(w.id),pickup:()=>moveWeight(w.id,1),look:()=>say(P,T(WLOOK[sc15().w[w.id]],{m:w.m}))})),
  {name:'back_to_the_room',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:outScale,look:'not_before_all_three_are_weighed'}].map(BOTH)};
ROOMS.cen15={space:.5,walk:[16,304,112,138],get mood(){return F.warned?'warned':'harbor'},amb:AMB.cen15,hs:[
  {name:'harbor',x:0,y:44,w:196,h:44,wx:120,wy:114,look:'harbor_of_cenchreae_look'},
  {name:'ship_for_syria',x:196,y:30,w:124,h:76,wx:230,wy:114,dir:1,look:'ship_for_syria_look'},
  {name:'goat',x:52,y:98,w:26,h:20,wx:88,wy:124,dir:-1,look:'she_looks_at_my_tent_cloth',talk:'goat_talk'},
  {name:'chest',x:228,y:106,w:24,h:14,wx:214,wy:124,dir:1,look:'chest_look'},
  {name:'strip_of_sand',x:16,y:126,w:96,h:18,wx:66,wy:130,dir:-1,look:toSand,use:toSand}].map(BOTH)};
ROOMS.sand15={space:.5,walk:NOW,get mood(){return F.way?'road':'warned'},amb:AMB.sand15,hs:[
  {name:'road_north',x:78,y:60,w:24,h:36,wx:160,wy:236,look:'road_north_look',useWith:id=>onRoad(id,1)},
  {name:'sea_lane_to_syria',x:150,y:112,w:150,h:24,wx:160,wy:236,look:'sea_lane_look',useWith:id=>onRoad(id,0)},
  ...PEB15.map(([id,x,y])=>({name:PEBNAME[id],x:x-7,y:y-6,w:14,h:12,wx:160,wy:236,look:()=>say(P,T('pebble_look',{place:T(PEBNAME[id])})),useWith:item=>onPebble(id,item)})),
  {name:'back_to_the_quay',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:outSand,look:'not_before_the_plan_is_laid'}].map(BOTH)};
ROOMS.quay15={space:.5,walk:[16,304,112,138],mood:'quay',amb:AMB.quay15,hs:[
  {name:'harbor',x:124,y:58,w:100,h:34,wx:150,wy:113,dir:1,look:'quay_of_troas_look'},
  {name:'ship',x:0,y:34,w:118,h:72,wx:128,wy:114,dir:-1,look:'ship_at_the_quay_look'},
  {name:'jars_of_oil',x:236,y:92,w:44,h:22,wx:288,wy:118,dir:-1,look:'jars_of_oil_look'},
  {name:'lane_to_korinnas_house',x:292,y:12,w:28,h:98,wx:298,wy:116,dir:1,exit:toUpper,look:'lane_to_korinnas_house_look'}].map(BOTH)};
ROOMS.upper15={space:1.2,floor:'wood',walk:[16,304,112,138],get mood(){return F.t4?(stage15()==='a'?'still':'none'):'night'},get amb(){return F.t4?(stage15()==='a'?AMB.after15:{}):AMB.upper15},hs:[
  {name:'brothers_of_troas',x:66,y:70,w:200,h:41,wx:92,wy:114,dir:1,look:'people_listening_look'},
  {name:'window',x:WINUpper15.x,y:WINUpper15.y,w:WINUpper15.w,h:WINUpper15.s+10-WINUpper15.y,wx:62,wy:118,dir:-1,look:'window_look'},
  {name:'big_jar',x:8,y:92,w:22,h:30,wx:60,wy:126,dir:-1,look:'big_jar_look'},
  {name:'stool',x:80,y:116,w:14,h:12,wx:87,wy:130,dir:1,def:'use',look:'stool_look',use:sit},
  {name:'table',x:196,y:98,w:60,h:12,wx:226,wy:114,look:'table_with_bread_look'},
  {name:'stairs_down',x:288,y:66,w:32,h:56,wx:282,wy:124,dir:1,exit:()=>say(LK,'i_am_not_leaving_tonight'),look:'stairs_look'},
  ...LAMPS.map((L,i)=>({name:L.k,x:[262,290,110,166,220][i],y:[50,74,34,60,88][i],w:[14,12,16,13,16][i],h:[12,10,14,13,10][i],wx:[262,280,118,190,226][i],wy:[114,118,114,120,114][i],dir:[1,1,-1,-1,1][i],
    look:()=>lampLook(i),useWith:id=>id==='jug15'?pour(i):false}))].map(BOTH)};
ROOMS.street15={space:.7,walk:[16,304,112,138],get mood(){return F.mid?'dawn':'none'},get amb(){return F.mid?AMB.street15:{}},hs:[
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
/* four of the seven say nothing in this chapter: whoever is played looks at them, and Luke, who has just come over from Philippi, sees
   Gaius of Derbe and Tychicus with his own eyes */
/* on the quay Luke looks at Tychicus from the open side of the pair he stands in, and speaks to the seller across his jars, from their end */
who(TY,{get wx(){return G.room==='quay15'?188:null},get wy(){return G.room==='quay15'?128:null},look:()=>say(PC(),PC()===LK?'luke_tychicus_look':'tychicus_look'),talk:()=>say(PC(),PC()===LK?'luke_tychicus_look':'tychicus_look')});
who(GD,{look:'luke_gaius_of_derbe_look',talk:'luke_gaius_of_derbe_look'});
who(SO,{look:'sopater_look',talk:'sopater_look'});
who(SC,{look:'secundus_look',talk:'secundus_look'});
who(SE,{wx:288,wy:117,look:'oil_seller_look',talk:oil});
who(KO,{look:()=>say(LK,F.mid?'korinna_at_dawn_look':'korinna_look'),talk:()=>say(KO,F.mid?'korinna_the_jar_lasted':'korinna_three_measures_at_a_time',{to:LK})});
who(EU,{get wx(){return G.room==='upper15'?62:null},get wy(){return G.room==='upper15'?118:null},look:()=>say(LK,F.mid?'eutychus_at_dawn_look':'eutychus_look'),talk:()=>F.mid?say(LK,'eutychus_at_dawn_look'):eutychus()});
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
const ENT={gaius15:[200,124,-1],scale15:[160,236,1],cen15:[130,128,1],sand15:[160,236,1],quay15:[148,131,1],upper15:[96,126,1],street15:[160,128,1]};
const EVERY=[TE,GA,TI,AR,TR,TY,SO,SC,GD,NK,MI,KO,SE,EU,KA,KB];
function place15(room){for(const a of EVERY.concat([P,LK])){a.talk=false;a.seat=0}for(const a of EVERY)a.room=null;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  /* who is played: Paul in Greece, Luke from the quay of Troas on */
  const want=F.troas?LK:P;if(G.pc!==want){G.pc=want;G.inv=G.invs[want.id]||(G.invs[want.id]=[])}
  (want===LK?P:LK).room=null;
  if(room==='gaius15'){place(TE,room,124,116,1);TE.seat=1;place(GA,room,60,122,1)}
  if(room==='scale15')sc15();
  if(room==='cen15'){place(MI,room,150,122,-1);place(TI,room,186,124,-1);place(AR,room,100,118,1);place(TR,room,280,124,-1);place(TY,room,258,120,-1);TY.seat=1}
  /* the quay: two pairs, Timothy where Luke comes in, Trophimus by himself before the coaster's bow (clear of her stem, which would
     stand on his head), and the seller behind his jars. No two of them share a column of the picture, so that none hides another;
     the gulls on the quay's edge are left in sight. */
  if(room==='quay15'){place(SO,room,59,117,1);place(SC,room,78,124,-1);place(TR,room,104,113,1);place(TI,room,172,125,-1);place(GD,room,206,113,1);place(TY,room,224,121,-1);place(SE,room,258,112.6,-1)}
  if(room==='upper15'){lamps15();const v=stage15();place(KO,room,38,122,1);
    /* Paul speaks until midnight; after it he stands at the table */
    if(v==='a')place(P,room,187,116,1);else place(P,room,150,118,-1);P.talk=v==='m';
    if(v==='m'){place(EU,room,...EUTUpper15,1);EU.seat=1}}
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
return{rooms:['gaius15','scale15','cen15','sand15','quay15','upper15','street15'],setup:setup15,start:start15,hint:hint15,music:MUSIC,beds:BEDS,calls:CALLS,topics:[],tablets:TABLETS,
  /* for the playtest: what is told; the questions about Phoebe; the weights and the bags; the lamps and the search; the roads on the map */
  told:TOLD,phoebe:PHOEBE,weights:WT,rounds:ROUND,sc:sc15,tilt:tiltScale15,lamps:LAMPS,oil:lamps15,after:AFTER,canLast,sat,stage:stage15,pebbles:PEB15,roads:[ROAD_A,ROAD_B],
  flags:FLAGS,
  /* seven rooms and seventeen flags today; the code keeps room for sixteen and for forty. Two are played, one after the other: Paul in
     Greece, and Luke from the quay of Troas to the end. */
  codeBits:{flags:40,rooms:4},party:['paul','luke15'],swap:false,ent:ENT,home:{tab15:'luke15',jug15:'luke15'},
  away:id=>id==='paul'?!!F.troas:id==='luke15'?!F.troas:false,
  inv:room=>['tablets','tab15'].concat(F.warned&&!F.troas?['reed15']:[],F.warned&&!F.shell?['shell15']:[],F.warned&&!F.awl?['awl15']:[],F.oil?['jug15']:[]),
  place:place15}
});
