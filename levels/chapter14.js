/* Paul of Tarsus: level data for Chapter Fourteen, "Two Hours in the Theater".
   Loaded on demand by index.html (see LEVEL and loadLevel there), after the lane map (shared/lanes.js), which its line of the manifest
   names (needs). Everything that belongs to this chapter lives here: its music and ambience, its artwork (painted in code), its cast,
   items, rooms, hotspots, dialog, cutscenes and hints.
   Ephesus (Acts 19:21-20:1), about 55 C.E. (Insight on the Scriptures, "Demetrius": near the end of Paul's stay, about 53 to 55 C.E.).
   Paul resolves to go through Macedonia and Achaia to Jerusalem, and then to see Rome; he sends Timothy and Erastus to Macedonia.
   Demetrius the silversmith gathers the craftsmen; the city fills with confusion and rushes into the theater, dragging Gaius and
   Aristarchus along. Paul wants to go in; the disciples will not let him; some of the commissioners of festivals and games, friendly to
   him, send word begging him not to risk the theater. For about two hours the crowd shouts; the city recorder quiets it and dismisses
   the assembly. Paul sends for the disciples, encourages them, says goodbye and sets out for Macedonia.
   Acts does not say where Paul was staying or who held him back; who brought him the news; how the commissioners' message reached him;
   what happened to Gaius and Aristarchus once the assembly was dismissed (Aristarchus is with Paul again later, Acts 20:4; 27:2); or how
   Paul left Ephesus. The house, its householders Damon and Theano, the runner Eudoros, the two commissioners Aristokles and Philokrates,
   the six people at the theater, the silversmiths but Demetrius, the sealed tablet and the ship at the quay are invented, and the end
   screen says so. Philon (Chapter Twelve) and Kleandros (Chapter Thirteen) are invented too, and come to the farewell.
   What the account says is told by the narrator, in paraphrase with its reference (TOLD below), and never put into a mouth as a
   quotation. Demetrius's speech and the city recorder's are told, not played. The crowd's cry (Acts 19:28, 34) is never written on the
   screen: it is heard, as rhythmic vowels of the words the account gives, in the player's language (CRY, and CONTRIBUTING section 8).
   Luke is not with Paul here, so the narration says "he" and "they".
   Four things are played: what six people at the theater say, and what two of them agree on (puzzle 1); a tablet closed and sealed so
   that nobody can open it on the way unseen (a close view, puzzle 3); the lanes against the crowd (the lane map, puzzle 2); and the
   disciples who hold Paul back (puzzle 4), with the commissioners' plea as the last word. After the uproar the same lanes are walked
   again by Paul, quiet, with barred gates and overturned stalls, to the harbor gate.
   Ephesus is shown as it stood (CONTRIBUTING section 3, the exception for Athens, Corinth, Ephesus and Rome): the silversmiths' stalls hold a
   few small silvery figures without detail, wrapped shrines and boxes; no image of a goddess is seen near, nobody bows to anything, and
   the temple appears only far off, at the edge of the lane map, with no name. */
LEVEL(14,()=>{
"use strict";
const L=SHARED.lanes;

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* One tune, taken over. In the marketplace it is a working tune on the lyre, in bars of eight, on D with a minor third and a major sixth
   ("work"). In the uproar the same tune is played on a reed pipe an octave up, over a fast hand drum and a low string, with the roar of
   the crowd under it ("uproar"). In the house only a low drone is heard, and the roar outside ("house"). After the city recorder there is
   silence, then the tune comes back at half its pace on the harp for the farewell ("still"), and far off at the harbor ("harbor").
   Nothing is claimed about how music was played then. */
const _=null,SCALE=[0,2,3,5,7,9,10],
 TUNE={A:[0,_,2,_,3,_,4,_],B:[5,_,4,_,3,_,2,_],C:[4,_,5,_,6,_,7,_],D:[6,_,4,_,1,_,0,_]},
 SLOW={A:[0,_,_,_,2,_,_,_],B:[4,_,_,_,3,_,_,_],C:[5,_,_,_,4,_,_,_],D:[2,_,_,_,0,_,_,_]},
 MUSIC={dt:.19,steps:8,group:[3,3,2],root:50,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['work'],prog:'ABCD',len:2,seq:TUNE},
  {inst:'bass',moods:['work'],prog:'ABAB',len:5,seq:{A:[-7,_,_,_,-3,_,_,_],B:[-5,_,_,_,-7,_,_,_]},vol:.7},
  {drum:1,moods:['work'],prog:'AAAB',seq:{A:'d..t..d.',B:'d..t.kd.'},vol:.45},
  {inst:'aulos',moods:['uproar'],prog:'ABCD',len:1,oct:12,seq:TUNE,vol:.55},
  {drum:1,moods:['uproar'],prog:'AAAB',seq:{A:'d.tkd.tk',B:'d.tkdktk'},vol:.75},
  {inst:'bass',moods:['uproar','house'],prog:'ABAB',len:6,seq:{A:[-7,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_]},vol:.85},
  {drone:[0],every:16,moods:['house'],vol:.4},
  {inst:'harp',moods:['still'],prog:'ABCD',len:5,oct:12,seq:SLOW,vol:.75},
  {drone:[0],every:32,moods:['still','harbor'],vol:.22},
  {inst:'harp',moods:['harbor'],prog:'ABCD',len:5,oct:12,seq:SLOW,vol:.32}]};

/* ---- the crowd's cry (Acts 19:28, 34): heard, never written ---- */
/* A crowd of men shouting the same words, each a little off the beat and off the pitch of the next. Each voice is a buzz from the throat
   through three resonances of the mouth that move with the vowel, and breath; the shout falls at the end of each syllable, as a shout
   does. It has no consonants, so it sounds like a crowd and never like words. The vowels and their rhythm are those of what Acts says
   the crowd shouted, in the player's language: the text gives them under the key cry14 (CONTRIBUTING section 8), each syllable as its
   height (0 the lowest), a dot, its length in steps, and its vowel; "-.2" is a rest of two steps. */
const VOW={a:[730,1090,2440],o:[570,840,2410],u:[320,800,2240],e:[530,1840,2480],i:[280,2250,2900],y:[290,1700,2200],'@':[500,1400,2450]};
const parseCry=s=>T(s).split(' ').map(x=>{const m=/^(-?\d+|-)\.(\d+)(.?)$/.exec(x)||['','-','1',''];return[m[1]==='-'?null:+m[1],+m[2],m[3]||'a']});
function shout(dest,t,d,f,vow,v,far){const c=AU.ctx,o=c.createOscillator(),src=c.createGain();o.type='sawtooth';
  o.frequency.setValueAtTime(f*1.06,t);o.frequency.exponentialRampToValueAtTime(f,t+.05);o.frequency.exponentialRampToValueAtTime(f*.82,t+d);o.connect(src);
  const nz=c.createBufferSource(),ng=c.createGain();nz.buffer=AU.nbuf;nz.loop=true;ng.gain.value=.5;nz.connect(ng);ng.connect(src);
  const V=VOW[vow]||VOW.a,sum=c.createGain();
  V.forEach((fr,i)=>{const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fr*(.95+.1*Math.random());bp.Q.value=[6,8,9][i];const gg=c.createGain();gg.gain.value=[1,.6,.3][i];src.connect(bp);bp.connect(gg);gg.connect(sum)});
  const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=far?520:2600;sum.connect(lp);
  const env=c.createGain(),g=env.gain;g.setValueAtTime(.0001,t);g.linearRampToValueAtTime(v,t+.04);g.setValueAtTime(v,t+d*.6);g.linearRampToValueAtTime(.0001,t+d);lp.connect(env);
  let out=env;if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=Math.random()*1.6-.8;env.connect(p);out=p}out.connect(dest);
  o.start(t);o.stop(t+d+.05);nz.start(t,Math.random()*.5);nz.stop(t+d+.05)}
/* cry: the whole cry once, from t, by n voices. far: heard through walls and shutters. */
function cry(dest,t,n,far){if(!AU.ctx)return 0;const L=parseCry('cry14'),STEP=.2;let len=0;for(const s of L)len+=s[1]*STEP;
  for(let k=0;k<n;k++){let y=t+Math.random()*.06;const base=mtof(note(-7,0,MUSIC))*(.94+.12*Math.random());
    for(const[h,l,vow]of L){const d=l*STEP;if(h!=null)shout(dest,y,d*.9,base*Math.pow(2,(h*2)/12),vow,(far?.012:.03)/Math.sqrt(n)*3,far);y+=d}}
  return len}
/* the roar of a crowd in the theater and the streets: low, with a slow swell (as in the lane map's demo) */
const BEDS={roar14:{type:'lowpass',f:340,q:.6,lfo:.19,depth:.55,v:.55},roarfar14:{type:'lowpass',f:180,q:.5,lfo:.12,depth:.6,v:.45}};
const CALLS={cry14:[3.5,7,(t,d)=>cry(d,t,9,0)],cryfar14:[5,9,(t,d)=>cry(d,t,7,1)],
  /* a silversmith's hammer on silver: light, quick, and now and then a pause */
  hammer14:[.5,1.6,(t,d)=>{const n=2+(Math.random()*4|0);for(let i=0;i<n;i++){tone({f:2400+Math.random()*500,to:1900,t:t+i*.21,d:.06,type:'triangle',v:.035,dest:d});noise({t:t+i*.21,d:.02,v:.04,f:5200,q:4,dest:d})}}]};

/* ============ ART ============ */
const ST='#d9cfb4',RO='#b9744e',MBL='#e8e3d6';
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. A figure with fr -1 sits. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};man(g,x,y,id,dir,o.fr||0,lit,o.ges||0,o.sw==null?1:o.sw,o.bow?1:0,0)})}
function col14(g,x,y,h,w,c){R(g,x-w/2,y-h,w,h,c);R(g,x-w/2,y-h,w*.3,h,tint(c,.22));R(g,x+w*.2,y-h,w*.3,h,tint(c,-.18));R(g,x-w/2-.6,y-h,w+1.2,1.6,tint(c,.1));R(g,x-w/2-.8,y-1.6,w+1.6,1.6,tint(c,-.1))}
const SKY={day:['#5f8cc4','#a6c2dc','#e8dcc4','#f2dcb0'],eve:['#4a5a90','#8a7aa8','#d8a07a','#f0c088']};

/* ---------- The court of the house where Paul is staying ---------- */
/* A small court inside a block of houses, reached only by a passage under the house on its south side (the way out, at the left). The
   house of Damon and Theano stands at the back, with its door, a hatch in the door, a shuttered window; a fig tree, a water trough.
   Everything in it is invented. v: m in the morning (Timothy and Erastus leave), e in the late afternoon (the farewell). */
ART.court14={w:320,q:12,variant:()=>F.plea?'e':'m',
 paint(g,v){paintCourt(g,v)},light:()=>F.plea?{amb:'#e8d8c8'}:{amb:'#f0e8dc'},draw(g,t){},front(){}};
/* ---------- The silversmiths' marketplace ---------- */
/* Demetrius at his stall among other silversmiths; behind, a kiln where one of them works silver with a hammer. The stalls hold boxes,
   shrines wrapped in cloth, and a few small silvery figures without detail (the Ephesus exception, at its most restrained); a donkey
   waits at a stall. v: b busy (scene 1, the morning of the uproar); q quiet, after it (stalls shut, wares under cloths, the kiln cold). */
ART.market14={w:480,q:12,variant:()=>F.plea?'q':'b',
 paint(g,v){paintMarket(g,v)},light:()=>F.plea?{amb:'#e8d8c8'}:{amb:'#f2ead8'},draw(g,t){marketDraw(g,t)},front(){}};
/* ---------- The outer colonnade of the theater ---------- */
/* The front of the theater's stage building, with its arches, where the crowd pushes in; a colonnade along it, a row of columns under a
   deep beam and a roof; at the left the square, and the harbor road beyond it. The theater stood in the hollow of Mount Pion and held
   about 25,000, where two main streets met, with the agora beside it (Insight, "Ephesus"; the Study Edition's media on Acts 19:29). */
ART.colon14={w:480,q:12,
 paint(g){paintColon(g)},light:{amb:'#f2ead8'},draw(g,t){colonDraw(g,t)},front(){}};
/* ---------- Inside the door ---------- */
/* The entrance room of Damon and Theano's house: the door to the court with its bolt and a hatch, a bench beside it, a lamp in a niche,
   shutters with the day coming through their slats. The light through the hatch moves across the floor while they wait (dlight). */
ART.door14={w:320,q:12,
 paint(g){paintDoor(g)},light:{amb:'#c8bcb0',lamps:[[250,96,60,'#5a4a30']]},draw(g,t){doorDraw(g,t)},front(){}};
/* ---------- The close view: sealing the tablet ---------- */
/* On the base of a column in the shade: the two leaves of a tablet, each with the writing inside, in the wax, and two holes along one
   edge; a cord of flax and a lump of clay; Aristokles's hand with his signet ring comes in from the right. The cord goes through the
   holes along the edge and is knotted there, and the clay sits on the knot: nothing is tied across the face of the tablet. */
ART.seal14={w:320,q:12,paint(g){paintSealBack(g)},light:{amb:'#e8e0d0'},draw(g,t){sealDraw(g,t)},front(){}};

/* placeholders for the backdrops; each paints its room plainly, and is replaced by the painted backdrop */
function floorStone(g,x,y,w,h,c,r){pave(g,x,y,x+w,y+h,c,r,{vx:x+w/2,vy:y-44,rows:4,step:44,v:.07});ao(g,x,y,w,6,'t',.35,'#3a3050')}
function paintCourt(g,v){const r=rng(1401),W='#d8c8a4';sky(g,320,60,v==='e'?SKY.eve:SKY.day);
  house(g,60,24,220,80,W,r,{patch:2,cracks:4,beams:13});R(g,59,19.6,222,2,RO);
  /* the door with its hatch */
  R(g,116,52,34,52,tint(W,-.16));doorArt(g,119,55,28,49,'#5f4428',r,{bands:[]});R(g,128,68,10,8,'#3a2a1c');R(g,128.5,68.5,9,7,'#6a4a2c');
  windowArt(g,196,48,12,14,W,{shut:1});windowArt(g,236,48,12,14,W,{shut:1});
  /* the passage: a dark arch in the wall of the house on the left, under its upper floor */
  R(g,0,24,60,80,tint(W,-.1));R(g,8,48,40,56,'#2a2420');arch(g,8,48,40,56,'#1e1a18');ao(g,8,48,40,16,'t',.5);
  /* the trough and the fig tree */
  R(g,168,94,30,10,'#a8a08a');R(g,168,94,30,1,'#d8d0bc');R(g,170,95.4,26,2,'#4a5a64');
  stroke(g,[276,104,274,80,266,64],'#5a4430',2.4);stroke(g,[274,82,286,66],'#5a4430',1.6);foliage(g,272,56,26,16,'#4e6a3c',r,180);
  g.fillStyle=lg(g,0,103,0,144,['#a8946c','#bcaa80']);g.fillRect(0,103,320,41);tex(g,'mott',.5,0,103,320,41,'overlay',1);ao(g,0,103,320,6,'t',.4,'#2a2030');
  if(v==='e')comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,190,120,.8)','rgba(120,110,170,.7)']);g.fillRect(0,0,320,144)})}
function paintMarket(g,v){const r=rng(1403);sky(g,480,60,SKY.day);
  R(g,0,30,480,74,'#cdbf9c');for(let x=10;x<480;x+=40)col14(g,x,64,34,5,ST);R(g,0,24,480,8,ST);R(g,0,30,480,1,tint(ST,-.3));
  for(let i=0;i<6;i++){const x=20+i*76;R(g,x,64,64,40,'#6a5a4c');awning(g,x-2,58,68,8,i%2?'#8a3a2a':'#3f6f8a','#e0d2a8',6);
    wood(g,x,84,64,4,'#8a683a');if(v==='b')for(let k=0;k<5;k++)R(g,x+6+k*11,78,6,6,k%2?'#c8b890':'#9a9a9e');else R(g,x+2,76,60,8,'#b8a888')}
  /* the kiln at the right */
  R(g,400,60,40,44,'#8a6a52');R(g,410,74,20,14,v==='b'?'#e07a2a':'#3a2a22');
  floorStone(g,0,103,480,41,'#cdc09e',r)}
function paintColon(g){const r=rng(1405);sky(g,480,50,SKY.day);
  /* the stage building of the theater, its arches, and the hill behind it */
  ridge(g,0,480,50,x=>18+8*Math.sin(x/70),['#9aa68a','#8a9a78']);
  R(g,150,24,330,80,'#d6caa8');for(let i=0;i<5;i++){const x=176+i*60;R(g,x,52,30,52,'#2a2420');arch(g,x,52,30,52,'#2a2420')}
  R(g,150,24,330,6,ST);R(g,150,30,330,1,tint(ST,-.3));
  /* the colonnade along it: a row of columns under a deep beam and a roof */
  R(g,0,22,150,6,ST);for(let x=10;x<150;x+=28)col14(g,x,104,76,6,ST);
  R(g,0,60,40,44,'#b8c6d0');
  floorStone(g,0,103,480,41,'#d0c4a2',r)}
function paintDoor(g){const r=rng(1407),W='#d2c09a';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:4,brick:'#a8845a',t:.5});wood(g,0,9,320,2.6,'#6a4e2c');ao(g,0,11.6,320,12,'t',.44,'#2a2030');
  /* the door to the court, at the right, with its bolt and its hatch */
  R(g,232,40,44,64,tint(W,-.2));doorArt(g,235,43,38,61,'#5f4428',r,{bands:[]});R(g,248,58,12,9,'#3a2a1c');R(g,248.5,58.5,11,8,'#6a4a2c');
  R(g,236,76,10,2.4,'#5a4a3a');R(g,236,76,10,.6,'#8a7a6a');
  /* the bench beside it, the lamp in its niche, the shutters */
  bench14(g,178,96,48,ST);R(g,150,40,14,12,tint(W,-.3));R(g,154,46,6,3,'#b8733c');
  windowArt(g,70,40,22,26,W,{shut:1});for(let i=0;i<6;i++)R(g,72,43+i*4,18,.8,'rgba(255,240,200,.6)');
  g.fillStyle=lg(g,0,103,0,144,['#a8946c','#bcaa80']);g.fillRect(0,103,320,41);tex(g,'mott',.5,0,103,320,41,'overlay',1);ao(g,0,103,320,6,'t',.4,'#2a2030')}
function bench14(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5.6,tint(c,-.2));R(g,x+2,y+8,3,6,tint(c,-.3));R(g,x+w-5,y+8,3,6,tint(c,-.3))}
function paintSealBack(g){const r=rng(1409);g.fillStyle=lg(g,0,0,0,144,['#8a8070','#6a6254']);g.fillRect(0,0,320,144);
  /* the base of the column: a block of pale stone, its top lit */
  R(g,20,44,280,100,'#d8d0bc');R(g,20,44,280,2,'#f0e8d8');tex(g,'mott',.35,20,44,280,100,'overlay',1);ao(g,20,44,280,10,'t',.25)}

/* ---- the moving parts ---- */
function marketDraw(g,t){}
function colonDraw(g,t){}
function doorDraw(g,t){/* the patch of light from the hatch, moving across the floor while they wait */
  const k=G.dl14||0;pool(g,250-k*120,124+k*4,22,6,'#fff0c8',.35,'screen')}
/* the tablet in the close view: two leaves, each a frame of wood round dark wax with writing that cannot be read; Philokrates's leaf
   lies turned or not; when it is laid on the other, one closed tablet; the cord through the holes and knotted at the edge; the clay
   on the knot; and the seals pressed into it. Holes and seals are small squares. */
const SEAL={A:[60,62,84,56],B:[176,62,84,56]};
function leaf(g,x,y,w,h,holesLeft,writing){wood(g,x,y,w,h,'#8a6a40');R(g,x+4,y+4,w-8,h-8,'#2c2117');R(g,x+4,y+4,w-8,1,'#120c08');
  if(writing)for(let j=0;j<5;j++){const r=rng(x*7+j);let xx=x+8;while(xx<x+w-12){const l=2+r()*6;R(g,xx,y+9+j*8,l,.8,'rgba(216,198,154,.55)');xx+=l+2}}
  const hx=holesLeft?x+1.4:x+w-3.4;for(const hy of[y+h*.3,y+h*.7])R(g,hx,hy,2,2,'#1a120a')}
function sealDraw(g,t){const s=G.s14||{};
  if(!F.closed){leaf(g,...SEAL.A,0,1);leaf(g,...SEAL.B,!F.turned,1)}
  else{const[x,y,w,h]=[118,62,84,56];R(g,x+2,y+h,w,2,'rgba(30,20,10,.35)');leaf(g,x,y,w,h,0,0);R(g,x-1,y-1.4,w+2,1.4,'#6a4a2c');
    if(F.tied){stroke(g,[x+w-2.4,y+h*.3+1,x+w+5,y+h*.5,x+w-2.4,y+h*.7+1],'#c8b890',1);R(g,x+w+3,y+h*.5-2,4,4,'#c8b890')}
    if(F.clayed){oval(g,x+w+5,y+h*.5,5,4.4,'#a8643a');oval(g,x+w+4,y+h*.5-1,3,2,'#c8845a');if(F.sealed){R(g,x+w+3,y+h*.5-1.5,3,3,'#7a4424');R(g,x+w+9,y+h*.5-1,3,3,'#7a4424')}}}
  /* the cord and the clay, while they lie on the stone */
  if(!F.tied&&!has('cord14')){}
  /* Aristokles's hand with the ring, from the right, waiting */
  if(!F.sealed){const hx=286,hy=90;poly(g,[320,hy-6,hx+6,hy-7,hx,hy-3,hx+1,hy+3,hx+8,hy+5,320,hy+6],'#c69870');R(g,hx+4,hy-4,4,3,'#c8a14a');R(g,hx+5,hy-3.4,2,1.6,'#6a5a3a')}}

/* ---------- the lane map ---------- */
/* The city is laid out in its own units, from the city wall (x 0) to the theater's hill (x 768), with the harbor west of the wall
   (x -96 to 0); on the map everything is 1.3 times as large (SC), so that its people stand about fourteen room pixels tall. q scales a
   length, X and Y a place, pts a line or an outline, box a rectangle.
   The plan follows what the publications say of the city in Paul's day. Insight on the Scriptures ("Ephesus") places the theater in the
   hollow of Mount Pion and describes the street that ran from in front of it straight to the harbor: paved with marble, about half a
   kilometer long and eleven meters wide, with colonnades four and a half meters deep and shops on both sides, and a gateway at each
   end; the Study Edition's media on Acts 19:29 puts the theater where two main thoroughfares meet, with the agora beside it. It names
   no street, and nothing is named on the screen: the street to the harbor is the harbor road. The rest follows the maintainer's notes on
   the city's plan: the lower city a grid of streets at right angles, which may cross here (CONTRIBUTING section 3, the exception for
   Ephesus). The theater faces west, towards the harbor at the end of its street. One unit of the plan is about 0.85 meters. */
const SC=1.3,OX0=96,q=v=>Math.round(v*SC*2)/2,X=x=>q(x+OX0),Y=y=>q(y),pts=p=>p.map((v,i)=>i%2?q(v):q(v+OX0)),box=b=>[X(b[0]),Y(b[1]),q(b[2]),q(b[3])];
const OX=X(0),W=Math.ceil((768+OX0)*SC),H=Math.ceil(432*SC),V=()=>F.plea?'quiet':'surge';
/* the courts: the one where Paul is staying (H), in a block of the residential quarter north of the harbor road, and two quiet ones (A,
   B); each lies inside its block and is reached only by a passage under a house (bridge), which leaves a street and runs into it. */
const HOUSE=[260,48],GATE=[8,196],START=[600,150,-1],CAT=330,ALLEY=200;
const COURT={H:[248,40,272,40,272,54,248,54],A:[488,84,512,84,512,98,488,98],B:[128,300,152,300,152,316,128,316]};
const PASSAGE={H:[260,74,260,50],A:[500,118,500,94],B:[140,340,140,310]},ARCH={H:[260,56,69],A:[500,100,113],B:[140,318,335]};
const NS_N=[50,110,170,230,290,350,410,470,530],EW_N=[30,74,118],NS_S=[50,110,170,230,290,350,410];
const CITY=[
  {pts:[0,196,586,196],w:26,kind:'paved'},
  {pts:[596,0,596,104],w:14,kind:'paved'},
  {pts:[596,258,596,432],w:14,kind:'paved'},
  {pts:[596,352,650,346,710,331,768,321],w:12,kind:'paved'},
  {pts:[656,128,688,128],w:9,kind:'paved'},{pts:[656,234,688,234],w:9,kind:'paved'},
  ...NS_N.map(x=>({pts:[x,0,x,186],w:7})),
  ...EW_N.map(y=>({pts:[50,y,592,y],w:7})),
  ...NS_S.map(x=>({pts:[x,206,x,432],w:7})),
  {pts:[50,240,410,240],w:7},{pts:[50,290,460,290],w:7},{pts:[50,340,410,340],w:7},{pts:[50,390,592,390],w:7},
  {pts:[523,206,523,230],w:9},{pts:[592,300,582,300],w:9},
  {pts:PASSAGE.H,w:7},{pts:PASSAGE.A,w:7},{pts:PASSAGE.B,w:7},
  /* a blind alley off the harbor road, where a shutter stands ajar after the uproar */
  {pts:[ALLEY,186,ALLEY,150],w:6}];
const OPEN=[
  {poly:[596,100,660,100,660,262,600,262,586,232,586,150],kind:'square'},
  {poly:[456,226,586,226,586,346,456,346],kind:'square'},
  {poly:COURT.H,kind:'earth'},{poly:COURT.A,kind:'earth'},{poly:COURT.B,kind:'earth'}];
const KEEP=[{poly:[660,0,768,0,768,300,710,315,652,330,650,300,660,262,660,60]},
  {poly:[0,0,7,0,7,432,0,432]},
  {poly:[640,432,640,380,652,358,710,343,768,334,768,432]}];
const STALLS=[[470,240,12,6],[490,240,12,6],[530,240,12,6],[552,240,12,6],[470,268,12,6],[552,268,12,6],[470,310,12,6],[500,318,12,6],[540,318,12,6],[482,334,12,6],[532,334,12,6],
  [560,202,10,5],[538,202,10,5]];
/* after the uproar: four streets shut by gates of boards, and stalls overturned right across the harbor road near its gate */
const GATES=[[43,168,14,3],[79,233,3,14],[79,283,3,14],[79,333,3,14]];
const DOWN=[[62,183,14,7],[68,190,14,7],[62,196,14,7],[68,202,14,7]];
const lanes=CITY.map(l=>Object.assign({},l,{pts:pts(l.pts),w:Math.round(l.w*SC)})),open=OPEN.map(o=>Object.assign({},o,{poly:pts(o.poly)}));
const keep=KEEP.map(k=>({poly:pts(k.poly)})).concat([{poly:[0,0,OX,0,OX,H,0,H]}]);
const bridges=Object.values(ARCH).map(([x,y0,y1])=>({x:X(x)-7,y:Y(y0),w:15,d:Math.round(Y(y1)-Y(y0)),H:13,gap:[X(x)-4,X(x)+4]}));
const blocker=(b,say)=>{const[x,y,w,h]=box(b);return{x,y,w,h,say}};
/* in the uproar, narrow streets packed with people who cannot get through themselves: on the runner's straight way west, on the street
   below the house, and on the street that comes down to it from the north; he has to go round */
const JAMS=[[400,112,26,12,'E'],[340,68,26,12,'E'],[284,82,16,26,'S']].map(([x,y,w,h,face])=>({x:X(x),y:Y(y),w:q(w),h:q(h),face,say:'packed_so_tight_nobody_gets_through'}));
const RUN=actor('eudoros14','Eudoros','#f0d890',170);
const M=L.make('lanes14',{w:W,h:H,seed:1414,lot:38,door:3,win:3,winH:3,doorH:8,flat:.05,ew:.6,grid:true,
  jams:{surge:JAMS},lanes,open,keep,bridges,
  obstacles:{quiet:GATES.map(b=>blocker(b,'somebody_has_shut_the_gate_and_barred_it')).concat([blocker(DOWN.reduce((a,b)=>[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[0]+a[2],b[0]+b[2])-Math.min(a[0],b[0]),Math.max(a[1]+a[3],b[1]+b[3])-Math.min(a[1],b[1])]),'overturned_stall_in_the_way')])},
  solid:STALLS.slice(0,11).map(box),block:{surge:STALLS.slice(11).map(box),quiet:GATES.concat(DOWN).map(box)},
  variant:V,targets:{house:[X(HOUSE[0]),Y(HOUSE[1])],gate:[X(GATE[0]),Y(GATE[1])]},
  pace:a=>a===RUN?'run':'walk',
  press:()=>{if(!G.busy)cut(()=>say(PC(),'i_cant_get_through_against_them'))},
  /* the windows: bolted near the house and round the quiet courts, faces at the windows near the theater, open or shut elsewhere */
  cue:(h,v)=>{const cx=(h.x0+h.x1)/2/SC-OX0,cy=(h.y0+h.y1)/2/SC,dh=Math.hypot(cx-HOUSE[0],cy-HOUSE[1]),dd=Math.min(...['A','B'].map(k=>Math.hypot(cx-(COURT[k][0]+12),cy-(COURT[k][1]+7)))),dt=Math.hypot(cx-620,cy-180),r=(h.seed%7)/7;
    if(v==='quiet')return r<.75?'open':'shut';if(dh<120||dd<40)return'shut';if(dt<200)return r<.4?'head':'open';return r<.5?'open':'shut'},
  crowd:{surge:{pace:'run',max:420,dust:1,jam:90,sinks:{theater:[[X(686),Y(128)],[X(686),Y(234)]]},sources:[
      {x:X(12),y:Y(196),r:8,rate:10,on:14,off:5,to:'theater'},
      {x:X(596),y:5,r:5,rate:5,on:10,off:6,ph:4,to:'theater'},
      {x:X(596),y:H-5,r:5,rate:4,on:12,off:5,ph:9,to:'theater'},
      {x:W-5,y:Y(321),r:5,rate:4,on:11,off:6,ph:2,to:'theater'},
      {doors:[X(520),Y(290)],r:q(120),rate:2.2,on:20,off:4,to:'theater'},
      {doors:[X(590),Y(200)],r:q(70),rate:2,on:30,off:3,to:'theater'},
      {doors:[X(330),Y(196)],r:q(160),rate:1.8,on:16,off:6,ph:3,to:'theater'},
      {doors:[X(420),Y(40)],r:q(120),rate:.4,on:9,off:9,to:'theater'},
      {doors:[X(230),Y(340)],r:q(160),rate:.6,on:10,off:8,to:'theater'}]}},
  zones:[...['A','B'].map(k=>{const c=COURT[k];return{x:X(c[0]),y:Y(c[1]),w:q(c[2]-c[0]),h:q(c[5]-c[1]),enter:()=>intoCourt(k)}}),
    {x:X(COURT.H[0]),y:Y(COURT.H[1]),w:q(24),h:q(14),enter:()=>found()}],
  marks:[{x:Math.round(X(HOUSE[0])),y:Y(COURT.H[1])-3,paint:(g,v,[top,foot])=>{const x=Math.round(X(HOUSE[0]))-2,y=foot+1-7;
    R(g,x-.5,y-.5,6,7.5,'#5a3e28');R(g,x,y,5,7,'#6e4a2c');for(let i=1;i<5;i+=1.5)R(g,x+i,y+.5,.5,6.5,'#4a3020');R(g,x+.5,y+3,3.5,.5,'#2a1a10');R(g,x+.5,y+3,1,.5,'#9a8a6a')}},
    /* the shutter in the blind alley, standing ajar after the uproar */
    {x:Math.round(X(ALLEY)),y:Y(150)-3,paint:(g,v,[top,foot])=>{if(v!=='quiet')return;const x=Math.round(X(ALLEY))-2,y=foot+1-6.5;
      R(g,x,y,4,3,'#2a1d16');R(g,x+4,y-.5,1.5,3.5,'#7a5434');R(g,x+4.5,y,.5,2.5,'#5a3e26')}}],
  paint:(g,v,M)=>paintTown(g,v,M),
  props:[{y:Y(134),shape:g=>R(g,X(664),Y(121),q(16),q(13),'#000')},{y:Y(240),shape:g=>R(g,X(664),Y(227),q(16),q(13),'#000')}],
  draw:(g,ts)=>{if(V()==='surge')cat(g,ts)},
  room:{floor:'stone',get mood(){return V()==='surge'?'uproar':'harbor'},
    amb:()=>{const p=PC(),busy=V()==='surge',sea=clamp(1-(p.x-OX)/400,0,1);if(!busy)return{birds:.3,wind:.22,waves:.35*sea,gulls:.6*sea};
      const d=M.dist('house',p.x,p.y),k=clamp((d-40)/700,0,1),n=Math.min(1,M.near(p.x,p.y,50)/14);
      return{roar14:.08+.62*k+.2*n,crowd:.05+.35*k+.15*n,cry14:.15+.6*k,wind:.15}},
    hs:[
      {name:'passage_under_the_house',x:255,y:56,w:10,h:14,wx:HOUSE[0],wy:76,dir:-1,look:()=>say(PC(),V()==='surge'?'in_under_a_house_fig_tree_this_is_it':'passage_under_the_house_look'),exit:()=>V()==='surge'?found():say(P,'i_have_said_my_goodbyes')},
      {name:'harbor_gate',x:-6,y:182,w:16,h:28,wx:12,wy:196,dir:-1,def:'walk',exit:atGate,look:()=>say(PC(),V()==='surge'?'harbor_gate_people_streaming_in':'harbor_gate_quay_beyond_it')},
      {name:'theater',x:664,y:118,w:104,h:126,wx:648,wy:180,dir:1,look:()=>say(PC(),V()==='surge'?'theater_whole_city_pouring_in':'theater_empty_now_two_hours')},
      {name:'market',x:458,y:228,w:126,h:116,wx:523,wy:214,dir:1,def:'walk',look:()=>say(PC(),V()==='surge'?'market_stalls_open_nobody_minds':'market_some_stalls_on_their_sides'),exit:()=>V()==='surge'?say(PC(),'market_stalls_open_nobody_minds'):toMarket()},
      {name:'cat',x:CAT-3,y:166,w:9,h:9,wx:CAT+2,wy:190,vis:()=>V()==='surge',look:'cat_look'},
      {name:'ship',x:-60,y:146,w:30,h:90,wx:12,wy:196,vis:()=>V()==='quiet',look:'ship_at_the_quay_loading'},
      ...['A','B'].map(k=>{const c=COURT[k];return{name:'shutter',x:c[0]+3,y:c[1]-9,w:c[2]-c[0]-6,h:8,wx:(c[0]+c[2])/2,wy:c[1]+8,dir:-1,look:'shutters_bolted_nothing_stirs',open:'shutters_bolted_nothing_stirs'}}),
      ...GATES.map(([x,y,w,h])=>({name:'gate',x:x-(w<h?3:0),y:y-6,w:w+(w<h?6:0),h:h+8,wx:w<h?x+w+5:x+w/2,wy:w<h?y+h/2:y-4,vis:()=>V()==='quiet',look:'somebody_has_shut_the_gate_and_barred_it',open:'somebody_has_shut_the_gate_and_barred_it'})),
      /* the chapter's hidden treasure: the shutter ajar in the blind alley, after the uproar */
      {name:'shutter',x:ALLEY-4,y:137,w:8,h:9,wx:ALLEY,wy:152,dir:-1,vis:()=>V()==='quiet',look:kneading,open:kneading,use:kneading}].map(h=>Object.assign(h,{x:X(h.x),y:Y(h.y),w:q(h.w),h:q(h.h),wx:X(h.wx),wy:Y(h.wy)}))}});
/* the runner does on the map what Paul does: every hotspot's own handlers are his too (the engine gives a member who is not Paul only what
   h.as names for him) */
for(const h of ROOMS.lanes14.hs){const o={};for(const k of['look','open','use','pickup','talk'])if(h[k]!=null)o[k]=h[k];if(h.exit)o.exit=h.exit;h.as={eudoros14:o}}
const catAt=(()=>{const x=Math.round(X(CAT)),hs=M.H.HS.filter(h=>h&&h.x0<=x&&h.x1>=x&&h.y1>=Y(166)&&h.y1<=Y(184)).sort((a,b)=>b.y1-a.y1)[0];
  const at=hs?{x,y:hs.y1+1-hs.hw-2.5,front:hs.y1}:{x,y:Y(166),front:Y(182)},spot=ROOMS.lanes14.hs.find(h=>h.name==='cat');
  Object.assign(spot,{x:at.x-2,y:at.y-1,w:6,h:5});return at})();
const RS=(g,x,y,w,h,c)=>R(g,X(x),Y(y),q(w),q(h),c);
function paintTown(g,v,M){const r=rng(77);
  harbor(g);
  L.hill(g,pts(KEEP[0].poly),{seed:14,rise:[.08,0]});
  for(let i=0;i<40;i++){const x=664+r()*104,y=r()*300;if(Math.hypot(x-700,y-181)<72||y<12+(x-668)*.7||y>290)continue;L.crown(g,X(x),Y(y),q(2.2+r()*1.6))}
  L.hill(g,pts(KEEP[2].poly),{seed:22,rise:[.06,.05]});for(let i=0;i<14;i++){const x=650+r()*118,y=345+r()*87;if(y<345+(768-x)*.1)continue;L.crown(g,X(x),Y(y),q(2+r()*1.4))}
  inKeep(g,0,()=>{theater(g,v);beyond(g)});
  inKeep(g,1,()=>{RS(g,0,0,7,432,'#b8a888');for(let y=0;y<432;y+=3)RS(g,0,y,7,.5,'rgba(60,40,30,.25)');RS(g,6,0,1,432,'#7a6a52')});
  RS(g,0,171,10,10,'#c4b494');RS(g,0,180,10,1.5,'#8a7a5e');RS(g,0,211,10,10,'#c4b494');RS(g,0,220,10,1.5,'#8a7a5e');
  for(const[x,y]of[[0,171],[0,211]])RS(g,x,y,10,.5,'rgba(255,250,230,.4)');
  const run=(cuts,a,b)=>{const out=[];let x=a;for(const c of cuts.sort((p,r)=>p-r)){if(c-6>x)out.push([x,c-6]);x=c+6}if(b>x)out.push([x,b]);return out};
  for(const[a,b]of run([...NS_N,ALLEY],12,582))L.colonnade(g,X(a),Y(183),q(b-a),q(5),'S');
  for(const[a,b]of run([...NS_S,523],12,582))L.colonnade(g,X(a),Y(204),q(b-a),q(5),'N');
  L.colonnade(g,X(458),Y(226),q(58),q(5),'S');L.colonnade(g,X(530),Y(226),q(54),q(5),'S');L.colonnade(g,X(458),Y(341),q(126),q(5),'N');
  const C=[['#c8b890','#8a3a2a'],['#d8ccb0','#4e5a6e'],['#c8b890','#6e7a3a']];
  STALLS.forEach(([x,y,w,d],i)=>{const[c1,c2]=C[i%3];L.stall(g,X(x),Y(y),q(w),q(d),c1,c2,v==='quiet'&&i>=11)});
  if(v==='quiet'){DOWN.forEach(([x,y,w,d],i)=>{const[c1,c2]=C[i%3];L.stall(g,X(x),Y(y),q(w),q(d),c1,c2,1)});for(const b of GATES)bar(g,...box(b))}
  for(const k of['A','B']){const c=COURT[k];RS(g,c[0]+2,c[5]-4,6,2,'#8a7a62');RS(g,c[0]+2,c[5]-4,6,.5,'#b0a088');RS(g,c[0]+2.5,c[5]-3.5,5,1,'#4a5a64')}
  /* the fig tree in Paul's court, and the trough against its wall */
  L.crown(g,X(COURT.H[0]+18),Y(COURT.H[1]+7),q(4.5),'#4e6a3c');RS(g,COURT.H[0]+2,COURT.H[5]-4,6,2,'#8a7a62');RS(g,COURT.H[0]+2.5,COURT.H[5]-3.5,5,1,'#4a5a64');
  if(v==='surge')pool(g,X(620),Y(180),q(60),q(70),'#e0c89a',.18,'source-over');
  for(const h of M.H.HS)if(h&&h.court&&h.seed%3===0){const[a,b,c,d]=h.court;L.tree(g,(a+c+1)/2,(b+d+1)/2-h.hw,Math.min(c-a,d-b)*.45+1,Math.min(c-a,d-b)*.4+1)}}
function inKeep(g,k,fn){clipTo(g,()=>{g.beginPath();const p=pts(KEEP[k].poly);g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()},fn)}
/* a gate of boards across a lane, seen from above: its top edge and its face, the boards running one way, with no band across them */
function bar(g,x,y,w,h){R(g,x+.5,y+h,w,1,'rgba(20,16,30,.3)');R(g,x,y,w,h,'#6a4a2c');R(g,x,y,w,.5,'#8a6a44');R(g,x,y+h-.5,w,.5,'#3a2618');
  for(let i=1.5;i<w-.5;i+=1.5)R(g,x+i,y+1,.5,h-1.5,'rgba(30,20,12,.35)')}
/* the theater from above: its seats rise in rings round the orchestra, with a walkway that follows the curve and no stairs across the rings;
   the stage building stands on its west side, with a way in at either end of it. In the surge the seats are full. */
function theater(g,v){const cx=X(700),cy=Y(181),r=rng(31),A=Math.PI*.56,k=SC;
  g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,66*k,-A,A);g.closePath();g.fillStyle='rgba(30,24,30,.35)';g.fill();
  for(let rr=64;rr>20;rr-=2){const walk=rr>40&&rr<=44;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,rr*k,-A,A);g.closePath();g.fillStyle=walk?'#ddd2b8':(rr%4?'#d2c6aa':'#a89a80');g.fill()}
  if(v==='surge'){const cols=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#d8ccb0','#4e5a6e','#a4503a','#6e5a3a','#b98258','#c08a5c'];
    for(let i=0;i<2400;i++){const a=(r()*2-1)*A,rr=22+r()*42;if(rr>40&&rr<=44)continue;const x=cx+Math.cos(a)*rr*k,y=cy+Math.sin(a)*rr*k;R(g,x,y,.5,.5,cols[(r()*cols.length)|0]);if(r()<.5)R(g,x,y+.5,.5,.5,cols[(r()*cols.length)|0])}}
  g.beginPath();g.moveTo(cx,cy-20*k);g.arc(cx,cy,20*k,-Math.PI/2,Math.PI/2);g.closePath();g.fillStyle='#c4b698';g.fill();
  if(v==='surge')for(let i=0;i<400;i++){const a=(r()-.5)*Math.PI,rr=r()*19,x=cx+Math.cos(a)*rr*k,y=cy+Math.sin(a)*rr*k;R(g,x,y,.5,.5,['#8a3a2a','#cdbb96','#5a5a72','#b98258'][i%4])}
  RS(g,664,134,9,90,'#a86c4e');RS(g,673,134,9,90,'#7c5240');for(let y=135;y<224;y+=1.5){RS(g,664,y,18,.5,'rgba(0,0,0,.08)')}RS(g,672.5,134,1,90,'#c48a66');
  RS(g,664,134,18,.5,'rgba(60,30,20,.5)');RS(g,663.5,134,.5,90,'rgba(255,240,220,.25)');
  poly(g,pts([664,224,673,219,682,224,682,229,664,229]),'#d8c8a8');RS(g,664,224,18,.5,'#5a4030');RS(g,664,228.5,18,.5,'#8a7a62');RS(g,672,225,2,4,'#3a2a1c');
  RS(g,682,138,4,84,'#cbbd9e');RS(g,682,138,4,.5,'#e6dcc6');RS(g,685.5,138,.5,84,'#8a7c62');for(let y=141;y<220;y+=4)RS(g,685,y,1,1,'#ece2cc');RS(g,682,221.5,4,1,'#7a6a52');
  for(const y of[121,227]){RS(g,664,y,16,13,'#c8b898');RS(g,664,y,16,.5,'#e4d8bc');RS(g,664,y+12.5,16,.5,'#7a6a52');RS(g,680,y,1.5,13,'rgba(30,20,30,.35)')}}
/* beyond: in the north-east a wall runs over the hill from the top of the map to its east edge. Beyond it lies the plain, and at the very
   edge of the map, outside the city, the roof of a temple seen from above, on a stepped platform. It has no name on the screen and
   nothing happens at it (the issue allows the temple of Artemis only far off, outside the city). */
function beyond(g){const A=[X(668),Y(0)],B=[X(768),Y(70)],dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,sw=[-uy,ux];
  const at=(p,k,e)=>[p[0]+sw[0]*k+ux*e,p[1]+sw[1]*k+uy*e],band=(k0,k1,c)=>poly(g,[...at(A,k0,-30),...at(B,k0,30),...at(B,k1,30),...at(A,k1,-30)],c);
  poly(g,[...at(A,0,-30),...at(B,0,30),...at(B,-120,30),...at(A,-120,-30)],'#b6aa7c');
  const r=rng(5);for(let i=0;i<9;i++){const x=690+r()*78,y=r()*30;if(y<(x-668)*.7-6&&!(x>720&&y<34))L.crown(g,X(x),Y(y),q(1.8+r()*1.2),'#56663e')}
  temple(g,X(730),Y(5));
  band(0,-2.5,'rgba(30,26,40,.3)');band(0,3,'#d2c6aa');band(3,6.5,'#b4a68a');band(6,6.5,'#8a7c62');band(0,.5,'#e6dcc6')}
function temple(g,x,y){const w=80,d=18,ry=y+7.5;
  R(g,x-7,y-5,w+14,d+19,'#c8bea6');R(g,x-7,y-5,w+14,.5,'#e0d8c4');R(g,x-7,y-5,.5,d+19,'#e0d8c4');
  R(g,x-4.5,y-2.5,w+9,d+14.5,'#d8d0bc');R(g,x-4.5,y-2.5,w+9,.5,'#eee8da');R(g,x-4.5,y-2.5,.5,d+14.5,'#eee8da');
  R(g,x,y,w,ry-y,'#8c5c46');R(g,x,ry+.5,w,y+d-ry-.5,'#b47454');R(g,x,ry,w,.5,'#cc9070');R(g,x,y,.5,d,'rgba(255,240,220,.3)');
  for(let i=1;i<w;i+=1.5){R(g,x+i,y,.5,ry-y-.5,'rgba(0,0,0,.1)');R(g,x+i,ry+1,.5,y+d-ry-1,'rgba(0,0,0,.1)')}
  R(g,x,y+d,w,.5,'rgba(40,20,10,.5)');R(g,x,y+d+.5,w,2.5,'#ddd4c0');R(g,x,y+d+2.5,w,.5,'#a89e88');
  R(g,x,y+d+3,w,4,'#6c6458');for(let i=1.5;i<w-1;i+=3.5){R(g,x+i,y+d+3,1.5,4,'#ebe4d4');R(g,x+i+1,y+d+3,.5,4,'#c4baa4')}}
/* the harbor west of the wall: the basin, the quay along the wall, and the ship that waits at it */
function harbor(g){const Q=OX-28;
  g.fillStyle=lg(g,0,0,Q,0,['#33566a','#3e6876','#47727c']);g.fillRect(0,0,Q,H);
  const r=rng(19);for(let y=1.5;y<H;y+=2.5){const off=r()*9;for(let x=off;x<Q-3;x+=7+r()*6)R(g,x,y,1.5+r()*1.5,.5,'rgba(210,230,232,.16)')}
  R(g,Q,0,OX-Q,H,'#bcae90');
  for(let y=0;y<H;y+=5){const off=(y/5)%2?4:0;R(g,Q,y,OX-Q,.5,'rgba(70,52,36,.2)');for(let x=Q+off+2;x<OX-1;x+=8)R(g,x,y+1,.5,3.5,'rgba(70,52,36,.22)')}
  R(g,Q,0,1,H,'#dcd0b4');R(g,Q-1,0,1,H,'rgba(20,30,40,.35)');
  ship(g,Q-24,Q-2,Y(146),Y(236),Q)}
/* the ship, from above: a merchant ship moored along the quay, its bow to the north. The yard is lowered and lies along the ship with the
   sail furled on it, so that nothing lies across the hull; the mast's foot is a small square beside it, and a deckhouse stands at the stern. */
function ship(g,x0,x1,y0,y1,Q){const cx=(x0+x1)/2,hull=[cx,y0,x1,y0+26,x1,y1-18,cx+6,y1,cx-6,y1,x0,y1-18,x0,y0+26];
  poly(g,hull.map((v,i)=>i%2?v-1:v+2),'rgba(14,24,34,.35)');poly(g,hull,'#5a3a24');
  const deck=[cx,y0+5,x1-2.5,y0+27,x1-2.5,y1-19,cx+5,y1-2.5,cx-5,y1-2.5,x0+2.5,y1-19,x0+2.5,y0+27];
  g.save();poly(g,deck);g.clip();g.fillStyle=lg(g,x0,0,x1,0,['#b88c5c','#a87c50','#94683e']);g.fillRect(x0,y0,x1-x0,y1-y0);g.restore();
  poly(g,[cx,y0,x0,y0+26,x0,y1-18,x0+2.5,y1-19,x0+2.5,y0+27,cx,y0+5],'#7a5434');
  R(g,cx-2,y0+20,4,80,'#d8ccb0');R(g,cx-2,y0+20,.5,80,'#f0e8d8');R(g,cx+1.5,y0+20,.5,80,'#a89c84');R(g,cx-2,y0+100,4,.5,'#8a7e66');
  R(g,cx+2.5,y0+48,2.5,2.5,'#4a301c');R(g,cx+2.5,y0+48,2.5,.5,'#6a4a2c');
  R(g,cx-6.5,y0+64,5,7,'#6a4a2c');R(g,cx-6.5,y0+64,5,.5,'#8a6a44');
  R(g,cx-6,y1-31,12,13,'#8a6440');R(g,cx-6,y1-31,12,.5,'#a8805a');R(g,cx-6,y1-31,.5,13,'#a8805a');R(g,cx-6,y1-18.5,12,.5,'#4a301c');
  g.strokeStyle='#3a2a1c';g.lineWidth=.5;g.beginPath();g.moveTo(x1-1,y0+30);g.lineTo(Q+.5,y0+18);g.moveTo(x1-1,y1-22);g.lineTo(Q+.5,y1-10);g.stroke();
  for(const yy of[y0+17,y1-11])R(g,Q,yy,1.5,1.5,'#4a3a2a')}
/* the cat on top of a house front above the harbor road: it sits, and now and then washes a paw */
const CATMAP=[["..k...k.","..kkkkk.",".kKkKkk.",".kkkkkk.","kkkkkkk.","kk.kk.k."],["........","..k...k.","..kkkkk.",".kKkkkk.","kkkkkkk.","kk.kk.k."]];
function cat(g,ts){const f=Math.floor(ts/700)%5===0?1:0,m=CATMAP[f],c={k:'#6a5a4a',K:'#a08a6a'};
  depth(catAt.front+.7,()=>{for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++){const col=c[m[j][i]];if(col){g.fillStyle=col;g.fillRect(catAt.x-2+i*.5,catAt.y+j*.5,.5,.5)}}})}

/* ============ PEOPLE ============ */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
Object.assign(LOOK,{
  paul14b:Object.assign(paulLook(14),{cloak:null}),
  /* the runner wears a tunic dyed with saffron, which nobody in the crowd wears, so that the player finds him among them on the map */
  eudoros14:{skin:'#b47e54',tunic:'#d4a63a',hair:'#2a1a12',belt:'#6a3a20',slim:1,brow:'#1a1210',ph:300},
  arist14:HIM('#c69870','#8a8a8a','#ece4d0','#7a2a3a',{receding:1,shortBeard:1,ph:600}),philo14:HIM('#b88a62','#3a2a1a','#e6dec8','#3a4a6a',{ph:1200}),
  damon14:{skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#c8b490',cloak:'#5a6a4a',belt:'#3a2a1a',brow:'#2a1a12',ph:400},
  theano14:{skin:'#c8a078',veil:'#7a5a7a',tunic:'#d8c8a0',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,brow:'#3a2414',ph:1200},
  philon14:{skin:'#b88a62',hair:'#d8d8d8',beard:'#d8d8d8',thin:1,longBeard:1,brow:'#9a9a9a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',cloak:'#8a7a5a',ph:500},
  klea14:HIM('#c08c5c','#3a2a1a','#ece4d0','#5f4470',{ph:700}),
  timothy14:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  erastus14:{skin:'#b47e52',hair:'#5a4026',beard:'#5a4026',fullBeard:1,tunic:'#a89c7c',cloak:'#6a5a4a',belt:'#4a3a24',brow:'#3a2a1a',ph:2100},
  demet14:{skin:'#b8845a',hair:'#3a2a1a',beard:'#3a2a1a',fullBeard:1,tunic:'#b8a070',apron:'#5a3e28',belt:'#2e2016',brow:'#1a1210',ph:200},
  smith14a:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#9a8a6a',apron:'#6a4a30',belt:'#3a2a1a',ph:900},
  smith14b:{skin:'#c08c5c',hair:'#6a6a6a',beard:'#6a6a6a',receding:1,tunic:'#8a7a5a',apron:'#5a3e28',belt:'#3a2a1a',ph:1500},
  smith14c:{skin:'#b47e52',hair:'#3a2616',tunic:'#a8946a',apron:'#6a4a30',belt:'#3a2a1a',slim:1,ph:2300},
  appr14:{skin:'#c08c5c',hair:'#3a2616',tunic:'#8a7a5a',apron:'#6a4a30',belt:'#3a2a1a',slim:1,brow:'#2a1a12',ph:700},
  bread14:{skin:'#c69870',hair:'#5a4026',beard:'#5a4026',shortBeard:1,tunic:'#d8c8a0',belt:'#8a6a4a',brow:'#3a2a1a',ph:1100},
  porter14:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#9a7a5a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:1900},
  water14:{skin:'#c8a078',veil:'#8a6a4a',tunic:'#c8b090',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,ph:2500},
  old14:{skin:'#b47e52',hair:'#d0d0d0',beard:'#d0d0d0',longBeard:1,bald:1,tunic:'#9a8a6a',long:1,belt:'#2e2016',brow:'#8a8a8a',ph:300},
  dyer14:{skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#c8b490',apron:'#3f4f7a',belt:'#4a3a24',brow:'#2a1a12',ph:1300},
  dz14a:{skin:'#c69870',hair:'#5a4026',beard:'#5a4026',tunic:'#e0d8c0',cloak:'#8a6a5a',long:1,belt:'#4a3a24',ph:100},
  dz14b:{skin:'#c8a078',hair:'#5a4026',fem:1,band:'#8a3a4a',tunic:'#e2d6b4',cloak:'#8a5a6a',himation:1,long:1,slim:1,longSleeve:1,ph:1600},
  dz14c:{skin:'#a8703f',hair:'#2a1a12',tunic:'#8a9a8a',belt:'#3a2a1a',slim:1,brow:'#1a1210',ph:2200}});
/* Damon and Theano are one actor with a mate (see drawActor in index.html), and are played in the house: damon14. TH is Theano's voice. */
const DA=actor('damon14','damon_and_theano','#d8e0b8',110),
  AR=actor('arist14','Aristokles','#e8c8a8',96),PK=actor('philo14','Philokrates','#c8d0e8',120),
  PH=actor('philon14','Philon','#e0e0f0',90),KL=actor('klea14','Kleandros','#c8d8f0',100),
  TI=actor('timothy14','Timothy','#b8e0b0',146),ER=actor('erastus14','Erastus','#e0d0a8',118),
  DE=actor('demet14','Demetrius','#e8b8a0',100),
  BR=actor('bread14','bread_seller','#f0e0b0',128),AP=actor('appr14','apprentice','#e0c8a0',160),PO=actor('porter14','porter','#d0c0a0',104),
  WA=actor('water14','woman_with_a_jar','#f0c8d0',200),OL=actor('old14','old_man','#d8d8c8',84),DY=actor('dyer14','dyer','#b8c8f0',116),
  D1=actor('dz14a','disciple','#d8c8e8',116),D2=actor('dz14b','disciple','#f0c8d8',190),D3=actor('dz14c','disciple','#c8e8d8',140);
const THV={color:'#f0c8e0',pitch:196,name:'Theano',talk:false,get room(){return DA.room},get x(){return DA.x-13*DA.dir},get y(){return DA.y}};
DA.mate={fig:'theano14',dx:-13,voice:THV,get talk(){return THV.talk}};DA.called='Damon';
const SMITHS=[['smith14a',150,118,1],['smith14b',318,121,-1],['smith14c',380,116,-1]];
/* an actor who is drawn in a scene without speaking (the silversmiths): placed like anyone, never a hotspot */
SMITHS.forEach(([id])=>actor(id,'silversmith','#e0d0b0',110));

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 19:21 to 20:1, told by the narrator in paraphrase, each line with its reference. None of it is put into a mouth as a
   quotation, and none of it stands in quotation marks (CONTRIBUTING section 1). Demetrius's speech (19:25-27) and the city recorder's
   (19:35-40) are told as what they said, in the third person. The German lines were written from the German edition. */
const TOLD={
 v21:'after_all_this_paul_acts_19_21',v22:'he_sent_two_of_his_helpers_acts_19_22',v23:'great_commotion_over_the_way_acts_19_23',
 v24:'silversmith_named_demetrius_acts_19_24',v25:'he_called_them_together_acts_19_25',v26:'this_paul_had_won_acts_19_26',
 v27:'trade_at_risk_of_a_bad_name_acts_19_27',v28:'they_flew_into_a_rage_acts_19_28',v29a:'confusion_spread_acts_19_29',
 v32:'assembly_was_all_confusion_acts_19_32',v29b:'they_had_seized_two_macedonians_acts_19_29',v30:'paul_meant_to_face_the_people_acts_19_30',
 v31:'he_had_friends_among_acts_19_31',v33:'jews_pushed_alexander_acts_19_33',v34:'about_two_hours_acts_19_34',
 v35:'city_recorder_got_the_crowd_quiet_acts_19_35',v36:'nobody_could_deny_that_acts_19_36',v37:'men_had_robbed_no_temple_acts_19_37',
 v38:'court_days_and_proconsuls_acts_19_38',v39:'regular_assembly_acts_19_39',v40:'charge_of_sedition_acts_19_40',
 v41:'sent_the_assembly_away_acts_19_41',w1a:'paul_sent_for_the_disciples_acts_20_1',w1b:'he_took_his_leave_acts_20_1'};
/* run14: a script started from a hotspot already runs inside a cutscene (act, in index.html); started from the map's tick it starts one */
const run14=fn=>G.busy?fn():cut(fn);
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+T(TOLD[k]).length*62),low});

/* ============ WHAT THEY SAY AT THE THEATER ============ */
/* WHO: the six people at the arches, in the order they stand; each says what he says (lines), and Eudoros notes it (notes). What two of
   them say alike is what is so: the silversmiths began it (the apprentice, the porter); it is about Paul's teaching (the apprentice, the
   dyer); and they dragged two Macedonians in, Gaius and Aristarchus (the dyer, the porter). Everything else is wrong, and only one says
   it. Every choice in the report names who said it, so that every choice is true. */
const WHO=[
 {a:BR,f:'a1',lines:['why_we_are_here_ask_somebody'],notes:['note_bread_seller_does_not_know']},
 {a:AP,f:'a2',lines:['demetrius_called_us_all_together','that_paul_says_gods_made_by_hands','now_they_have_caught_paul_himself'],
  after:()=>say(RUN,'paul_himself_i_have_to_know',TH),again:'go_and_see_for_yourself',notes:['note_apprentice_demetrius','note_apprentice_teaching','note_apprentice_paul_caught']},
 {a:PO,f:'a3',lines:['they_all_came_out_at_once_shouting','they_hauled_two_men_past_me'],notes:['note_porter_silversmiths','note_porter_two_macedonians']},
 {a:WA,f:'a4',lines:['somebody_has_robbed_the_temple','it_all_started_at_the_harbor'],notes:['note_woman_temple_robbed','note_woman_two_robbers','note_woman_harbor']},
 {a:OL,f:'a5',lines:['proconsul_has_called_the_city'],notes:['note_old_man_proconsul','note_old_man_dues']},
 {a:DY,f:'a6',lines:['i_have_heard_that_man_paul','the_two_they_took_in_gaius_aristarchus'],notes:['note_dyer_teaching','note_dyer_gaius_aristarchus']}];
/* the report: Aristokles's three questions, each with the claim that two agree on (ok) and the claims only one makes, with his answer */
const REPORT=[
 {f:'r1',q:'well_who_started_it',ok:'apprentice_and_porter_name_the_silversmiths',yes:'demetrius_i_know_him',
  no:[['old_man_says_the_proconsul','proconsul_i_would_have_heard'],['woman_says_it_started_at_the_harbor','harbor_then_why_silversmiths']]},
 {f:'r2',q:'and_what_is_it_about',ok:'apprentice_and_dyer_say_pauls_teaching',yes:'who_buys_a_silver_shrine',
  no:[['woman_says_somebody_robbed_the_temple','a_theft_and_nobody_else'],['old_man_says_harbor_dues','harbor_dues_do_not_make_a_crowd']]},
 {f:'r3',q:'and_who_did_they_take_in',ok:'dyer_and_porter_two_macedonians',yes:'two_of_his_companions',
  no:[['apprentice_says_paul_himself','paul_himself_who_saw_him_taken'],['woman_says_two_temple_robbers','temple_robbers_does_anyone_else']]}];
const allAsked=()=>WHO.every(w=>F[w.f]);

/* ============ HELPERS ============ */
async function goto(room,x,y,dir){await fade(1,260);place14(room);const a=PC();if(x!=null)place(a,room,x,y,dir);enterRoom(room,a.x,a.y,a.dir);codeBtn();await fade(0,260);const r=ROOMS[room];if(r.enter)await r.enter()}
function show14(room,x,y,dir){place14(room);const a=PC();if(x!=null)place(a,room,x,y,dir);enterRoom(room,a.x,a.y,a.dir);codeBtn()}
/* the light from the hatch across the floor of the house, while they wait the two hours */
async function twoHours(){await tween(G.speedAll>200?200:14000,k=>{G.dl14=k})}

/* ============ THE STORY ============ */
/* the opening: the court in the morning. Timothy and Erastus set out for Macedonia (Acts 19:21, 22). */
async function start14(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(14);G.end={};G.scene=null;G.stage14='open';AU.mood='work';
    show14('court14',150,124,-1);place(TI,'court14',118,122,1);place(ER,'court14',96,126,1);place(DA,'court14',214,120,-1);drawInv();await fade(0,700);
    await tell('v21');
    await say(TI,'we_will_be_waiting_in_macedonia',{to:P});
    await say(P,'greet_the_brothers_in_philippi',{to:TI});
    await say(ER,'we_will_tell_them_they_will_count',{to:P});
    walk(TI,28,118);await walk(ER,34,124);TI.room=ER.room=null;
    await tell('v22');
    /* scene 1: the silversmiths' marketplace, shown and not played */
    await fade(1,600);G.stage14='market';show14('market14',240,150,1);P.room=null;G.pc=P;placeMarket();AU.mood='work';AU.amb={crowd:.35,hammer14:.7,birds:.2};await fade(0,700);
    await tell('v23');await tell('v24');DE.talk=true;await tell('v25');await tell('v26');await tell('v27');DE.talk=false;
    AU.amb={crowd:.6,cry14:.8,roar14:.3};await tell('v28');await tell('v29a');
    /* scene 2: the outer colonnade of the theater */
    await fade(1,600);G.stage14=null;playAs(RUN);show14('colon14',...ENT.colon14);await fade(0,700);
    await tell('v32');
    await say(AR,'eudoros_half_the_city',{to:RUN});
    await say(PK,'nobody_asked_us_festival_days',{to:AR});
    await say(AR,'go_and_ask_what_this_is_about',{to:RUN});
    await say(AR,'you_know_him_by_sight',{to:RUN});
    await say(RUN,'i_know_his_face_not_his_house',{to:AR});
    await say(RUN,'i_will_ask_around',{to:AR});codeBtn()},true)}
function placeMarket(){place(DE,'market14',236,118,1);DE.room='market14';for(const[id,x,y,d]of SMITHS)place(ACT[id],'market14',x,y,d)}

/* ---- the colonnade ---- */
async function ask(w){const a=w.a;
  if(F[w.f]){return say(a,w.again||'i_have_told_you_what_i_know')}
  for(const l of w.lines)await say(a,l,{to:RUN});F[w.f]=1;if(w.after)await w.after();codeBtn()}
async function report(){if(!allAsked())return say(AR,'ask_them_all_first',{to:RUN});
  if(F.r3)return F.sealed?say(AR,'do_not_try_the_harbor_road',{to:RUN}):toSeal();
  for(const r of REPORT){if(F[r.f])continue;await say(AR,r.q,{to:RUN});let no=r.no.slice();
    for(;;){const opts=[r.ok,...no.map(n=>n[0])],i=await choose(opts);await say(RUN,opts[i],{to:AR});
      if(i===0){await say(AR,r.yes,{to:RUN});F[r.f]=1;codeBtn();break}
      const n=no[i-1];await say(AR,n[1],{to:RUN});await say(RUN,r.f==='r3'&&n[0]==='apprentice_says_paul_himself'?'nobody_the_dyer_says_he_was_not':'no_nobody_else',r.f==='r3'&&n[0]==='apprentice_says_paul_himself'?{to:AR}:TH);no=no.filter(x=>x!==n)}}
  await tell('v29b');
  await say(PK,'paul_will_not_leave_them_in_there',{to:AR});
  await say(AR,'he_must_not_if_that_crowd',{to:PK});
  await say(AR,'we_will_write_to_him_both_of_us',{to:RUN});
  await narr('each_of_them_wrote_on_one_leaf',{dur:4600});
  await say(AR,'close_it_and_tie_it',{to:RUN});
  return toSeal()}
async function toSeal(){await fade(1,300);place14('seal14');enterRoom('seal14',...ENT.seal14);addSealParts();codeBtn();await fade(0,300);
  if(!G.sv14){G.sv14=1;await say(RUN,'two_leaves_a_cord_and_clay',TH)}}
function addSealParts(){if(!F.tied&&!has('cord14'))addItem('cord14',1);if(!F.clayed&&!has('clay14'))addItem('clay14',1)}
async function outSeal(){if(!F.sealed)return say(AR,'not_till_it_is_sealed');await fade(1,260);show14('colon14',160,124,-1);await fade(0,260)}
/* the leaves: Philokrates's is turned round (pick up), and laid on Aristokles's (use); the cord goes through both holes, the clay over the
   knot, and Aristokles presses his ring */
async function turnLeaf(){if(F.closed)return say(RUN,'writing_to_writing_holes_together');F.turned=F.turned?0:1;SFX.click();return say(RUN,'i_turn_it_round')}
async function layLeaf(){if(F.closed)return say(RUN,'writing_to_writing_holes_together');if(!F.turned)return say(RUN,'the_holes_do_not_meet');F.closed=1;SFX.click();codeBtn();return say(RUN,'writing_to_writing_holes_together')}
async function withTablet(id){
  if(id==='cord14'){if(!F.closed)return say(RUN,'tied_open_anyone_could_read_it');delItem('cord14');F.tied=1;SFX.click();codeBtn();return say(RUN,'through_both_holes_and_knotted')}
  if(id==='clay14'){if(!F.closed)return say(RUN,'not_on_the_wax');if(!F.tied)return say(RUN,'clay_on_bare_wood_seals_nothing');delItem('clay14');F.clayed=1;SFX.click();codeBtn();return say(RUN,'over_the_knot_so_nobody')}
  return false}
async function ring(){if(F.sealed)return say(AR,'there_nobody_opens_it_but_paul',{to:RUN});if(!F.clayed)return say(AR,'tie_it_first_then_my_ring',{to:RUN});
  return run14(async()=>{SFX.click();F.sealed=1;await say(AR,'there_nobody_opens_it_but_paul',{to:RUN});await say(PK,'and_mine_beside_it',{to:RUN});
    addItem('plea14');await fade(1,260);show14('colon14',160,124,-1);await fade(0,260);
    await say(AR,'he_is_staying_with_disciples',{to:RUN});await say(AR,'do_not_try_the_harbor_road',{to:RUN});await say(RUN,'i_will_find_it',{to:AR});codeBtn()})}
async function toLanes(){if(!F.sealed)return say(RUN,'not_before_i_know_what_this_is',TH);
  await fade(1,300);F.run=1;place14('lanes14');enterRoom('lanes14',X(START[0]),Y(START[1]),START[2]);codeBtn();await fade(0,400);
  return run14(()=>say(RUN,'harbor_road_is_solid_back_lanes',TH))}

/* ---- the lanes in the surge ---- */
const courtSaid={};
function intoCourt(k){if(V()!=='surge'||courtSaid[k])return;courtSaid[k]=1;cut(async()=>{await say(PC(),'shutters_bolted_nothing_stirs',TH);await say(PC(),'and_no_fig_tree',TH)})}
async function found(){if(V()!=='surge'||F.court)return;return run14(async()=>{await say(RUN,'in_under_a_house_fig_tree_this_is_it',TH);
  await fade(1,500);F.court=1;delItem('plea14');place14('door14');playAs(DA);enterRoom('door14',...ENT.door14);codeBtn();await fade(0,600);
  await narr('inside_paul_had_his_mantle_on',{dur:3600});await tell('v30');
  await say(PH,'i_came_as_fast_as_i_could_gaius',{to:P});
  await say(P,'then_i_am_going_in',{to:PH});codeBtn()})}

/* ---- held back: played as Damon and Theano ---- */
/* SELF: what is true, and only makes him more set on going (each answered); OTHERS: what is true, and holds him, a step at a time */
const SELF=[['they_will_tear_you_apart','crowds_have_wanted_my_blood'],['you_could_die_in_there','then_for_two_brothers'],
  ['think_of_yourself_for_once','i_am_thinking_of_gaius'],['you_have_done_nothing_wrong','neither_have_they']];
const OTHERS=[['worse_for_gaius_not_better','worse_for_them'],['macedonia_jerusalem_rome','the_road_ahead'],['every_brother_seen_with_you','the_brothers_here']];
const STEPS=['he_has_let_go_of_the_bolt','he_has_taken_his_mantle_off','he_has_sat_down_on_the_bench'];
const held=()=>['h1','h2','h3'].filter(k=>F[k]).length;
const heldUsed=()=>G.hu14||(G.hu14=[]);
async function holdBack(){if(PC()!==DA)return;if(F.plea)return say(P,'even_they_ask_it_of_me');if(held()>=3)return say(P,'and_while_i_sit_here');
  await say(DA,'how_do_we_keep_him_here',TH);
  const left=OTHERS.filter(o=>!heldUsed().includes(o[0])),opts=SELF.concat(left),i=await choose(opts.map(o=>o[0]));const o=opts[i];
  await say(DA,o[0],{to:P});await say(P,o[1],{to:DA});
  if(left.includes(o)){heldUsed().push(o[0]);const n=held();F['h'+(n+1)]=1;posePaul();await say(DA,STEPS[n],TH);
    if(n+1===3){await say(P,'and_while_i_sit_here',{to:DA});knock();await say(DA,'somebody_is_knocking',TH)}codeBtn()}}
function knock(){if(!AU.ctx)return;const t=now()+.05;for(let i=0;i<3;i++){noise({t:t+i*.22,d:.06,v:.25,f:380,q:1.2,type:'lowpass'});tone({f:110,to:80,t:t+i*.22,d:.08,type:'triangle',v:.08})}}
/* Paul's place and pose as he is held: at the door with his hand to the bolt; turned from it; without his mantle; on the bench */
function posePaul(){const n=held();P.look=n>=2?LOOK.paul14b:LOOK.paul;P.wear=n>=2?'b':'';
  if(n===0)place(P,'door14',226,120,1);else if(n===1)place(P,'door14',214,121,-1);else if(n===2)place(P,'door14',208,121,-1);else{place(P,'door14',200,113,-1);P.seat=1}}
async function hatch(){if(PC()!==DA)return say(PC(),'hatch_the_size_of_a_face');if(held()<3)return say(DA,'not_today_nobody_opens');if(F.knock)return say(DA,'two_seals_on_the_knot_both_whole');
  return run14(async()=>{SFX.door();await say(RUN,'message_for_paul_sealed',{to:DA});await say(DA,'two_seals_on_the_knot_both_whole',{to:P});F.knock=1;addItem('plead14');codeBtn()})}
async function givePlea(id){if(id!=='plead14')return false;if(held()<3)return say(P,'later_let_me_through_first');
  return run14(async()=>{delItem('plead14');
    /* the seal is broken, the leaves opened */
    if(AU.ctx){noise({d:.05,v:.2,f:1800,q:3});noise({t:now()+.12,d:.04,v:.12,f:2600,q:3})}
    await tell('v31');await say(P,'even_they_ask_it_of_me',{to:DA});
    await say(P,'i_know_you_by_the_door',{to:null});await say(RUN,'i_do_stay_here_paul',{to:null});await say(P,'tell_your_masters_i_will_not_forget',{to:null});
    F.plea=1;await waitTwoHours()})}
/* while they wait: the theater, told (Acts 19:33-41), with the cry outside, and then quiet */
async function waitTwoHours(){AU.mood='house';AU.amb={roarfar14:.6,cryfar14:.7};
  await narr('they_waited',{dur:3600});const two=twoHours();await tell('v33');await tell('v34');await two;
  AU.amb={roarfar14:.25};await tell('v35');await tell('v36');await tell('v37');await tell('v38');await tell('v39');await tell('v40');
  AU.amb={};AU.mood='none';await tell('v41');await narr('then_the_city_went_quiet',{dur:3600});G.dl14=0;
  /* the farewell, in the court */
  await fade(1,700);playAs(P);P.seat=0;P.look=LOOK.paul;P.wear='';show14('court14',...ENT.court14);AU.mood='still';await fade(0,800);
  await tell('w1a');await say(P,'a_whole_city_shouted_you_know_why',{to:null});codeBtn()}

/* ---- the farewell ---- */
const BYE=[{k:'b1',a:DA,lines:[[DA,'our_door_is_open_to_you'],[P,'today_you_kept_me_from_walking_out'],[THV,'write_to_us_paul'],[P,'i_will_theano']]},
  {k:'b2',a:PH,lines:[[PH,'i_once_asked_you_to_stay_longer'],[P,'he_was_and_now_you_stay']]},
  {k:'b3',a:KL,lines:[[KL,'my_house_is_lighter_than_it_was'],[P,'keep_it_that_way_kleandros']]},
  {k:'b4',a:D1,lines:[[D1,'go_in_peace_paul_we_will_pray'],[P,'and_i_for_you']]}];
async function bye(b){if(F[b.k])return say(b.a===DA?DA:b.a,b.a===DA?'our_door_is_open_to_you':b.lines[0][1]);
  for(const[a,l]of b.lines)await say(a,l,{to:a===P?b.a:P});F[b.k]=1;codeBtn()}
const allBye=()=>BYE.every(b=>F[b.k]);
async function leaveCourt(){if(!F.plea)return;if(!allBye())return say(P,'not_without_saying_goodbye');
  await fade(1,300);F.left=1;place14('lanes14');enterRoom('lanes14',X(HOUSE[0]),Y(78),1);codeBtn();await fade(0,400);
  return run14(()=>say(P,'the_harbor_road_then_and_macedonia',TH))}

/* ---- after the uproar ---- */
async function toMarket(){await fade(1,300);place14('market14');enterRoom('market14',...ENT.market14);codeBtn();await fade(0,300)}
async function outMarket(){await fade(1,300);place14('lanes14');enterRoom('lanes14',X(523),Y(214),-1);codeBtn();await fade(0,300)}
async function kneading(){const t=now()+.05;for(let i=0;i<5;i++)noise({t:t+i*.42,d:.16,v:.07,f:260,q:1.4,type:'lowpass'});
  [0,2,4,2,0,-1,0].forEach((n,i)=>tone({f:mtof(57+n),t:t+.2+i*.32,d:.34,type:'sine',v:.03,a:.08,sus:1}));
  await say(PC(),'shutter_look');treasure()}
async function atGate(){if(V()==='surge')return say(PC(),'harbor_gate_people_streaming_in');
  return run14(async()=>{await tell('w1b');
    endScreen({title:'two_hours_in_the_theater_2',text:'city_shouted_for_two_hours_end',based:'based_on_acts_19_21_20_1',go:'click_to_return_to_the_title'});
    await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})})}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.court14={space:.8,floor:'earth',walk:[16,304,112,138],get mood(){return F.plea?'still':'work'},get amb(){return F.plea?{birds:.35,wind:.2}:{birds:.3,crowd:.12}},hs:[
  {name:'passage_under_the_house',x:8,y:48,w:40,h:56,wx:40,wy:122,dir:-1,exit:leaveCourt,look:'passage_under_the_house_look'},
  {name:'fig_tree',x:246,y:40,w:54,h:64,wx:250,wy:118,look:'fig_tree_and_its_shade'},
  {name:'trough',x:168,y:92,w:30,h:12,wx:182,wy:114,look:'trough_of_water_for_the_house'},
  {name:'door',x:116,y:52,w:34,h:52,wx:133,wy:114,look:'door_of_damon_and_theanos_house',open:'i_have_said_my_goodbyes'},
  {name:'disciples',x:230,y:96,w:60,h:40,wx:240,wy:128,vis:()=>!!F.plea,look:'disciples_from_all_over_the_city',talk:()=>bye(BYE[3])}]};
ROOMS.market14={space:.7,walk:[16,464,112,138],get mood(){return F.plea?'harbor':'work'},get amb(){return F.plea?{birds:.3,wind:.2}:{crowd:.35,hammer14:.7}},hs:[
  {name:'way_back_to_the_lanes',x:0,y:60,w:24,h:84,wx:24,wy:124,dir:-1,exit:outMarket,look:'back_to_the_lanes'},
  {name:'demetrius_stall',x:196,y:58,w:84,h:46,wx:238,wy:116,look:'demetrius_stall_shut_kiln_cold'},
  {name:'wares',x:20,y:64,w:160,h:40,wx:100,wy:116,look:'wares_under_cloths_now'},
  {name:'donkey',x:84,y:84,w:36,h:30,wx:126,wy:122,look:'donkey_heard_a_thousand_hammer_strokes'}]};
ROOMS.colon14={space:.6,walk:[16,464,112,138],mood:'uproar',amb:{roar14:.55,crowd:.6,cry14:.7},hs:[
  {name:'square_before_the_theater',x:0,y:56,w:30,h:88,wx:24,wy:124,dir:-1,def:'walk',exit:()=>toLanes(),look:'square_before_the_theater_look'},
  {name:'theater_arches',x:176,y:52,w:270,h:52,wx:300,wy:116,look:'theater_arches_look'},
  {name:'crowd',x:176,y:80,w:270,h:30,wx:300,wy:116,look:'crowd_at_the_arches_look',talk:'nobody_stops_to_listen'}]};
ROOMS.seal14={space:.6,walk:NOW,mood:'uproar',amb:{roar14:.45,crowd:.4,cry14:.5},hs:[
  {name:'aristokles_leaf',x:60,y:62,w:84,h:56,wx:160,wy:236,vis:()=>!F.closed,look:'aristokles_leaf_look',use:layLeaf,useWith:withTablet},
  {name:'philokrates_leaf',x:176,y:62,w:84,h:56,wx:160,wy:236,vis:()=>!F.closed,def:'use',look:()=>say(RUN,F.turned?'philokrates_leaf_now_its_holes':'philokrates_leaf_holes_at_the_other_edge'),use:layLeaf,pickup:turnLeaf,open:turnLeaf,useWith:withTablet},
  {name:'tablet',x:118,y:62,w:96,h:56,wx:160,wy:236,vis:()=>!!F.closed,look:()=>say(RUN,F.sealed?'two_leaves_tied_through_two_seals':F.clayed?'over_the_knot_so_nobody':F.tied?'through_both_holes_and_knotted':'writing_to_writing_holes_together'),useWith:withTablet},
  {name:'ring',x:282,y:80,w:38,h:22,wx:160,wy:236,vis:()=>!F.sealed,def:'use',look:'aristokles_ring_look',use:ring,talk:ring,useWith:id=>id==='clay14'?say(RUN,'over_the_knot_so_nobody'):false},
  {name:'base_of_a_column',x:20,y:118,w:180,h:26,wx:160,wy:236,look:'base_of_a_column_look'},
  {name:'back_to_the_colonnade',x:220,y:124,w:100,h:20,wx:160,wy:236,exit:outSeal,look:'not_till_it_is_sealed'}]};
ROOMS.door14={space:1.1,floor:'earth',walk:[40,300,112,138],get mood(){return F.plea?'house':'house'},get amb(){return F.plea?{}:{roarfar14:.6,cryfar14:.6}},hs:[
  {name:'door',x:232,y:40,w:44,h:64,wx:228,wy:118,dir:1,look:'door_of_damon_and_theanos_house',use:()=>say(DA,'the_bolt_stays_where_it_is'),open:()=>say(DA,'the_bolt_stays_where_it_is')},
  {name:'hatch',x:248,y:58,w:12,h:9,wx:236,wy:118,dir:1,def:'open',look:'hatch_the_size_of_a_face',open:hatch,use:hatch},
  {name:'bench',x:178,y:96,w:48,h:14,wx:196,wy:120,look:'bench_by_the_door_look'},
  {name:'lamp',x:150,y:40,w:14,h:12,wx:156,wy:114,look:'lamp_in_its_niche_unlit'},
  {name:'window',x:70,y:40,w:22,h:26,wx:82,wy:114,look:'the_shouting_comes_through_the_shutters'}]};
/* Damon and Theano walk the house as anyone does: where a hotspot says nothing of its own for them, they say what is said of it */
for(const id of['door14'])for(const h of ROOMS[id].hs){const a=(h.as=h.as||{}).damon14=(h.as&&h.as.damon14)||{};for(const v of['look','use','open','pickup','talk','useWith'])if(a[v]==null&&h[v]!=null)a[v]=h[v]}
for(const id of['colon14','seal14'])for(const h of ROOMS[id].hs){const a=(h.as=h.as||{}).eudoros14=(h.as&&h.as.eudoros14)||{};for(const v of['look','use','open','pickup','talk','useWith','exit'])if(a[v]==null&&h[v]!=null)a[v]=h[v]}

/* ============ PEOPLE AS HOTSPOTS ============ */
for(const w of WHO){const k=w.a.id,lk={bread14:()=>say(BR,'bread_seller_sold_none_shouted_twice',{to:RUN}),appr14:'apprentice_look',porter14:'porter_look',water14:'woman_with_a_jar_look',old14:'old_man_on_the_step_look',dyer14:'dyer_look'}[k];
  w.a.hs={name:w.a.name,actor:w.a,as:{eudoros14:{look:lk,talk:()=>ask(w),show:{'*':'i_have_told_you_what_i_know'}}}}}
AR.hs={name:'Aristokles',actor:AR,as:{eudoros14:{look:'aristokles_look',talk:report,show:{'*':'ask_them_all_first'}}}};
PK.hs={name:'Philokrates',actor:PK,as:{eudoros14:{look:'philokrates_look',talk:()=>say(PK,F.sealed?'and_mine_beside_it':'go_on_ask_them_we_will_wait',{to:RUN}),show:{'*':'go_on_ask_them_we_will_wait'}}}};
const PAULHS={name:'Paul',actor:P,as:{damon14:{look:()=>say(DA,held()>=3?'paul_on_the_bench_now':'paul_mantle_on_staff_in_hand'),talk:holdBack,give:givePlea,show:{'*':'later_let_me_through_first'}}}};
PH.hs={name:'Philon',actor:PH,look:'philon_look_farewell',talk:()=>bye(BYE[1]),as:{damon14:{look:'philon_out_of_breath',talk:()=>say(PH,'he_wont_listen_to_me',{to:DA})}}};
KL.hs={name:'Kleandros',actor:KL,look:'kleandros_look_farewell',talk:()=>bye(BYE[2])};
DA.hs={name:'damon_and_theano',actor:DA,look:()=>say(P,'damon_look').then(()=>say(P,'theano_look')),talk:()=>bye(BYE[0])};
for(const d of[D1,D2,D3])d.hs={name:'disciple',actor:d,look:'disciples_from_all_over_the_city',talk:()=>bye(BYE[3])};
DA.def={look:'nothing_there_needs_our_hands',pickup:'it_is_not_ours',use:'that_is_not_for_us_to_do',open:'that_is_not_ours_to_open',talk:'later_2',give:'what_should_we_give'};
DA.noCraft='not_those_two_together';

/* ============ ITEMS ============ */
Object.assign(ICON,{
  cord14(g){stroke(g,[5,15,9,9,15,13,19,7],'#c8b890',1.6);stroke(g,[5,15,9,9,15,13,19,7],'#8a7a5a',.5)},
  clay14(g){oval(g,12,14,6,4.6,'#a8643a');oval(g,11,12.6,3.4,2,'#c8845a')},
  plea14(g){IH.square(g,'#8a6a40',4,6,16,12,'#2c2117');R(g,19,10,3,3,'#a8643a')},
  plead14(g){ICON.plea14(g)},
  bundle14(g){oval(g,12,14,8,6,'#8a7a5a');oval(g,10,12,4,2.4,'#a8946a');R(g,11,6,2,4,'#6a5a3a')}});
Object.assign(ITEMS,{
  tab14:{name:'wax_tablets',icon:'tablets',def:'open',look:'my_tablets_for_what_i_hear',open:ITEMS.tablets.open},
  cord14:{name:'cord',look:'cord_of_flax_look'},
  clay14:{name:'lump_of_clay',look:'lump_of_clay_still_soft'},
  plea14:{name:'sealed_tablet',look:'two_leaves_tied_through_two_seals'},
  plead14:{name:'sealed_tablet',look:'two_leaves_tied_through_two_seals'},
  bundle14:{name:'bundle',look:'awl_needle_and_thread_my_whole_trade'}});

/* ============ WAX TABLETS ============ */
/* Eudoros's and Paul's, in one table: whoever is played opens his own. */
const ru=f=>()=>PC()===RUN&&f(),pa=f=>()=>PC()===P&&f();
const TABLETS={
  people:[
    {name:'Aristokles',note:'one_of_the_commissioners_i_serve',if:ru(()=>true)},{name:'Philokrates',note:'a_commissioner_too_and_a_friend',if:ru(()=>true)},
    {name:'Paul',note:'he_teaches_in_the_hall_i_know_his_face',if:ru(()=>true)},
    {name:'damon_and_theano',note:'they_hid_me_today',if:pa(()=>true)},{name:'Philon',note:'he_stays_in_ephesus',if:pa(()=>true)},
    {name:'aristokles_and_philokrates',note:'they_begged_me_to_keep_out',if:pa(()=>true)},{name:'gaius_and_aristarchus',note:'the_recorder_said_they_had_done_no_wrong',if:pa(()=>true)}],
  tasks:[
    {t:'find_out_who_what_and_who_was_taken',if:ru(()=>!allAsked())},{t:'tell_aristokles_what_they_agree_on',if:ru(()=>allAsked()&&!F.r3)},
    {t:'close_and_tie_the_tablet',if:ru(()=>!!F.r3&&!F.sealed)},{t:'bring_the_sealed_tablet_to_paul',if:ru(()=>!!F.sealed)},
    {t:'to_the_harbor_gate_and_on_to_macedonia',if:pa(()=>true)}],
  scripture:[],
  notes:{title:()=>PC()===RUN?'heard_at_the_theater':'noted_in_ephesus',none:'nothing_written_yet',
    list:WHO.flatMap(w=>w.notes.map(n=>({t:n,if:ru(()=>!!F[w.f])})))}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={court14:[186,126,1],market14:[40,124,1],colon14:[120,124,1],seal14:[160,236,1],get lanes14(){return F.plea?[X(HOUSE[0]),Y(78),1]:[X(START[0]),Y(START[1]),START[2]]},door14:[160,124,1]};
const EVERY=[AR,PK,PH,KL,TI,ER,DE,BR,AP,PO,WA,OL,DY,D1,D2,D3,...SMITHS.map(s=>ACT[s[0]])];
function place14(room){for(const a of EVERY){a.room=null;a.talk=false;a.seat=0}THV.talk=false;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  /* who is played: Eudoros until the court is found, Damon and Theano in the house until the plea is read, then Paul */
  const want=G.stage14?P:!F.court?RUN:!F.plea?DA:P;
  if(G.pc!==want){if(want===P)G.pc=P;else{G.pc=want;G.inv=G.invs[want.id]||(G.invs[want.id]=[])}}
  if(want!==RUN)RUN.room=null;if(want!==DA&&!(F.plea&&room==='court14'))DA.room=null;
  if(want!==P&&!(F.court&&!F.plea&&room==='door14'))P.room=null;
  if(room==='colon14'){const R0=[[BR,206,121,-1],[AP,250,117,-1],[PO,290,124,-1],[WA,334,118,-1],[OL,372,122,-1],[DY,416,119,-1],[AR,60,119,1],[PK,82,123,1]];for(const[a,x,y,d]of R0)place(a,room,x,y,d)}
  if(room==='seal14'){}
  if(room==='door14'){place(PH,room,120,121,1);if(!F.plea){posePaul();if(G.pc===DA&&DA.room!=='door14')place(DA,room,...ENT.door14)}}
  if(room==='court14'&&F.plea){place(PH,room,96,124,1);place(KL,room,150,128,-1);place(DA,room,220,120,-1);place(D1,room,282,124,-1);place(D2,room,262,112,-1);place(D3,room,300,114,-1)}
  if(room==='market14'&&!F.plea)placeMarket();
  P.party=DA.party=RUN.party=0;swapBtn()}
function setup14(){P.hs=PAULHS;P.called='Paul';RUN.called='Eudoros';G.sv14=0;G.dl14=0;G.hu14=null;G.s14=null;for(const k in courtSaid)delete courtSaid[k];
  G.invs={paul:['tablets','bundle14'],eudoros14:['tab14'],damon14:[]};G.inv=G.invs.paul;drawInv()}

/* ============ PRAYER HINTS ============ */
function hint14(){const pc=PC();
  if(pc===RUN){if(G.room==='seal14'){if(!F.closed)return F.turned?['lay14',['holes_of_the_two_leaves_must_meet','i_turn_philokrates_leaf']]:['turn14',['holes_of_the_two_leaves_must_meet','i_turn_philokrates_leaf']];
      if(!F.tied)return['cord14',['it_is_shut_nothing_holds_it','i_use_the_cord_with_the_tablet']];if(!F.clayed)return['clay14',['nobody_should_undo_that_knot','i_use_the_clay_with_the_knot']];
      return['ring14',['clay_is_waiting_for_a_ring','i_talk_to_aristokles']]}
    if(!allAsked())return['ask14',['everyone_at_the_arches_is_shouting','i_talk_to_each_of_the_people']];
    if(!F.r3)return['rep14',['three_answers_more_than_one_voice','i_talk_to_aristokles_two_agree']];
    if(!F.sealed)return['seal14',['clay_is_waiting_for_a_ring','i_talk_to_aristokles']];
    return['run14',['roar_loudest_at_the_theater','i_keep_off_the_harbor_road']]}
  if(pc===DA){if(held()<3)return['hold14',['every_warning_about_his_own_life','we_talk_to_paul_about_the_others']];
    if(!F.knock)return['knock14',['somebody_is_at_the_door','we_open_the_hatch']];return['give14',['the_message_is_not_ours_to_open','we_give_the_sealed_tablet_to_paul']]}
  if(!F.left)return allBye()?['go14',['road_to_macedonia_starts_at_the_harbor','i_go_out_by_the_passage_to_the_gate']]:['bye14',['they_came_to_say_goodbye','i_talk_to_each_of_them_before_i_go']];
  return['gate14',['harbor_gate_far_end_of_the_road','i_walk_to_the_gate_and_go_round']]}

/* lanes: for the playtest, one pass of the lane map at once: 1 the runner in the surge, as he comes out by the square; 2 Paul after the
   uproar, as he comes out of the passage. Every flag of the story up to that point is set. */
const FLAGS=['a1','a2','a3','a4','a5','a6','r1','r2','r3','turned','closed','tied','clayed','sealed','run','court','h1','h2','h3','knock','plea','b1','b2','b3','b4','left'];
function lanesPass(pass){setChapter(14);const upto=pass===1?'run':'left';for(const k of FLAGS.slice(0,FLAGS.indexOf(upto)+1))F[k]=1;M.reset();for(const k in courtSaid)delete courtSaid[k];
  ov.className='';ov.onclick=null;ov.innerHTML='';G.scene=null;place14('lanes14');dealInv('lanes14');enterRoom('lanes14',...ENT.lanes14);
  G.busy=false;lock(false);G.verb='walk';G.item=null;syncVerbs();drawInv();status();swapBtn();codeBtn()}

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['colon14','seal14','lanes14','door14','court14','market14'],setup:setup14,start:start14,hint:hint14,music:MUSIC,topics:[],tablets:TABLETS,beds:BEDS,calls:CALLS,
  /* for the playtest: what is told, the people at the theater and the report, the lane map and its plan */
  told:TOLD,who:WHO,report:REPORT,others:OTHERS,self:SELF,bye:BYE,cry,parseCry,map:M,ox:OX,at:(x,y)=>[X(x),Y(y)],len:q,city:{house:HOUSE,courts:COURT,gates:GATES,alley:ALLEY,start:START},
  flags:FLAGS,lanes:lanesPass,
  /* six rooms and twenty-six flags today; the code keeps room for sixteen and for forty. Three can be played, one at a time: Eudoros, Damon
     and Theano, and Paul. */
  codeBits:{flags:40,rooms:4},party:['paul','eudoros14','damon14'],swap:false,ent:ENT,home:{tab14:'eudoros14',cord14:'eudoros14',clay14:'eudoros14',plea14:'eudoros14',plead14:'damon14'},
  away:id=>id==='paul'?!F.plea&&!F.court:id==='eudoros14'?!!F.court:id==='damon14'?!F.court||!!F.plea:false,
  inv:room=>['tablets','bundle14','tab14'].concat(F.r3&&!F.tied?['cord14']:[],F.r3&&!F.clayed?['clay14']:[],F.sealed&&!F.court?['plea14']:[],F.knock&&!F.plea?['plead14']:[]),
  place:place14}
});
