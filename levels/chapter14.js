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
   the crowd under it ("uproar"). In the house ("house") nothing is held: a low string plucks the keynote and leans on the note above
   it, a drum ticks with it and almost stops every fourth bar, a ney begins the tune and breaks off before it comes home, and the
   roar is outside. After the city recorder there is
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
  {inst:'bass',moods:['uproar'],prog:'ABAB',len:6,seq:{A:[-7,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_]},vol:.85},
  {inst:'bass',moods:['house'],prog:'AABC',len:2,vol:.7,seq:{A:[-7,_,_,-7,_,_,-6,_],B:[-7,_,_,-6,_,_,-10,_],C:[-7,_,_,_,_,_,_,_]}},
  {drum:1,moods:['house'],prog:'AABC',seq:{A:'d..k..k.',B:'d..k.kk.',C:'d.......'},vol:.45},
  /* TUNE as a line, broken off: A, B without its last note, two bars of rest, C, the first two notes of D, two bars of rest */
  {inst:'ney',moods:['house'],oct:12,loop:8,vol:.6,lines:[[[0,0,2],[2,2,2],[4,3,2],[6,4,2]],[[0,5,2],[2,4,2],[4,3,2]],[],[],
    [[0,4,2],[2,5,2],[4,6,2],[6,7,2]],[[0,6,2],[2,4,2]],[],[]]},
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
/* the materials and light shared by every chapter (shared/materials.js): quiet grain, cracks set by hand, soft contact shadows, earth colors */
const{plank:plank14,board:board14,crack:crack14,skipCracks:skipCracks14,shadow:shadow14,earth:earth14}=SHARED.materials;
const RO='#b9744e',MBL='#e8e3d6';
const SKY={day:['#5f8cc4','#a6c2dc','#e8dcc4','#f2dcb0'].map(c=>earth14(c,.12)),eve:['#4a5a90','#8a7aa8','#d8a07a','#f0c088']};
/* planks14: upright planks side by side (a door, a shutter, a crate), as the engine's boards() lays them, each in its own tone and with its
   lit and its shaded edge, but with the quiet grain of plank14 in place of the strong overlay. It takes from r exactly what boards() took,
   so that whatever is painted after it keeps its place; the grain draws from a seed of its own. */
function planks14(g,x,y,w,h,pw,c,r){const q=rng(Math.round(x*31+y*7+w));
  inRect(g,x,y,w,h,()=>{for(let i=0;i<w-.01;i+=pw){const ww=Math.min(pw,w-i),cc=tint(c,(r()-.5)*.2);let k=null;if(r()<.5)k=[r(),r(),r()];
    plank14(g,x+i,y,ww,h,cc,q,1);R(g,x+i,y,.5,h,tint(cc,.16));R(g,x+i+ww-.5,y,.5,h,tint(cc,-.36));
    /* a knot, or a short split, where boards() set its mark */
    if(k)R(g,x+i+1+k[0]*(ww-2.5),y+k[1]*h*.8,.5,2.4+k[2]*3.6,tint(cc,-.16))}})}

/* ---------- The court of the house where Paul is staying ---------- */
/* A small court inside a block of houses, reached only by a passage under the house at its left side (the way out). The
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
   edge; Aristokles's hand with his signet ring comes in from the right. The cord and the clay are in the runner's hands (the inventory).
   The cord goes through the holes and is knotted at the edge, and the clay sits on the knot: nothing is tied across the face of the
   tablet. */
ART.seal14={w:320,q:12,paint(g){paintSealBack(g)},light:{amb:'#e8e0d0'},draw(g,t){sealDraw(g,t)},front(){}};

/* The court. The house of Damon and Theano stands at the back, the house over the passage at the left, a fig tree in the corner at the
   right. The houses face the sun, which comes in over the roofs behind the onlooker: from the right in the morning and from the left in
   the late afternoon. The shadow of those roofs lies across the upper walls in a slanting line, and the court below it lies in shade.
   v: m in the morning, cool and clear; e in the late afternoon, warm, the shadow line falling the other way. */
function paintCourt(g,v){const r=rng(1401),eve=v==='e',W='#dcc8a2',WL='#d4b98e';
  sky(g,320,34,eve?['#56609a','#9a7c9e','#e0a27a','#f4c48c']:['#4a82c6','#82acda','#c4d8e8','#e4eae4']);
  /* the house at the back: two storeys of plaster under an eave of tiles, and the ends of the joists where the upper floor lies */
  plaster(g,58,16,262,88,W,r,{patch:0,cracks:0,t:.36});skipCracks14(r,5);
  /* its cracks, set by hand high on the wall, where they run to no head */
  {const q=rng(1431);for(const[x,y,n]of[[96,17,4],[160,17.4,3],[202,38,4],[100,50,3],[296,60,3]])crack14(g,x,y,n,q)}
  for(const p of[[104,32,8,4.5],[200,96,8,4],[290,96,7,4]])patchDoor(g,...p,'#a8845a',r);eaveCourt(g,56,266,10);
  for(let x=67;x<316;x+=13.5){R(g,x,43,2.6,2.4,'#6a4a2c');R(g,x,43,2.6,.5,'#a07a4a');poly(g,[x+.4,45.4,x+2.8,45.4,x+3.8,48.4,x+1.4,48.4],'rgba(60,44,70,.2)')}
  shutDoor(g,80,24,12,12,W);shutDoor(g,174,24,12,12,W);shutDoor(g,232,24,12,12,W);
  /* above the door the upper window stands open, one shutter swung back against the wall */
  windowArt(g,127,24,12,12,W,{dark:'#241a16'});poly(g,[139,23,143.4,24.4,143.4,35.4,139,36],'#6a4c30');R(g,139,23,.6,13,'#8a6a44');ao(g,127,24,12,12,'t',.5);
  /* the window below, which lights the room inside the door */
  shutDoor(g,178,58,12,12,W);
  doorCourt(g,r);troughCourt(g,168,92,30,12);
  /* a broom against the wall, by the corner */
  shadow14(g,65,104.2,4,.9,.5);
  stroke(g,[64.4,103,69.4,72],'#7a5a36',1);stroke(g,[64.2,102.6,69.2,71.6],'#a88050',.4);
  poly(g,[61.6,104,67.4,104,66.4,96.4,64,96],'#a89060');for(let i=0;i<4;i++)stroke(g,[62.6+i*1.3,103.6,64.4+i*.6,97],'rgba(70,52,30,.5)',.4);
  /* a storage jar with its lid on, and two pots of herbs by the door */
  shadow14(g,81,104.2,7,1.4,.6);for(const x of[156.6,162.4])shadow14(g,x+.6,104.2,2.8,.8,.5);
  vessel(g,79,104,6,15,'#a4643c','pithos',{noShadow:1});oval(g,79,89.4,4.6,1.4,'#6a4a2c');R(g,75,88.4,8,.6,'#9a7448');R(g,78.4,87.4,1.2,1.2,'#5a3c22');
  for(const[x,h]of[[156.6,5],[162.4,4.4]]){poly(g,[x-2.4,104-h,x+2.4,104-h,x+1.7,104,x-1.7,104],'#b0663c');R(g,x-2.6,103.4-h,5.2,1,'#c87a4a');R(g,x+1,104-h,1,h,'rgba(60,30,20,.3)');
    foliage(g,x,100.6-h,3.2,2.2,'#5a7a3c',rng(x*13),14)}
  /* tufts of grass where the ground meets the wall */
  for(const x of[52,206,232,300,312]){for(let i=0;i<5;i++){const a=-1.1-i*.22;stroke(g,[x+i*.6,104.4,x+i*.6+Math.cos(a)*2.6,104.4+Math.sin(a)*2.6],i%2?'#6a8040':'#4e6634',.5)}}
  ao(g,58,96,262,8,'b',.28,'#3a2c28');
  /* the house over the passage, at the left: taller, its corner standing out a little, and the arch of the passage in it */
  plaster(g,0,0,58,104,WL,r,{patch:0,cracks:0,t:.36});skipCracks14(r,3);
  {const q=rng(1432);for(const[x,y,n]of[[12,7,4],[47,12,3]])crack14(g,x,y,n,q)}
  patchDoor(g,44,30,7,4,'#a07850',r);eaveCourt(g,-2,62,2);
  g.fillStyle=lg(g,58,0,61,0,[tint(WL,-.32),tint(WL,-.42)]);g.fillRect(58,6,3,98);
  shutDoor(g,21,20,11,11,WL);archCourt(g,r);
  floorCourt(g,r);figCourt(g,eve);
  /* the light: the sun on the upper walls, the shade below; the sky is not shaded */
  const amb=eve?'#b49ca8':'#9eaed0',sun=eve?'#ffdcaa':'#fff6e8';
  lightmap(g,320,amb,l=>{
    const edge=eve?x=>15+x*.25+(x>150?2.6:0):x=>12+(312-x)*.27+(x<176?2.4:0),top=[];
    for(let x=320;x>=0;x-=2)top.push(x,edge(x)+Math.abs(Math.sin(x*.9))*.8);
    poly(l,[0,0,320,0].concat(top),sun);
    /* a soft edge to the shadow */
    for(let i=0;i<3;i++){const p=[];for(let x=0;x<=320;x+=2)p.push(x,edge(x)+1+i*.8);stroke(l,p,rgba(amb,.25),.8)}
    /* the fig's shadow on the sunlit wall: to the left of it in the morning, to the right in the afternoon */
    const rr=rng(1402);
    clipTo(l,()=>{l.beginPath();l.moveTo(0,0);l.lineTo(320,0);for(let x=320;x>=0;x-=2)l.lineTo(x,edge(x));l.closePath()},()=>{
      for(const[cx,cy,rx,ry]of FIGCourt){const ox=eve?26:-28,oy=eve?9:11;for(let i=0;i<rx*ry*.7;i++){const a=rr()*6.2832,d=Math.sqrt(rr()),px=cx+ox+Math.cos(a)*d*rx,py=cy+oy+Math.sin(a)*d*ry;
        oval(l,px,py,1.2+rr()*1.6,.9+rr()*1.1,rgba(amb,.8))}}});
    R(l,58,0,262,9,'#ffffff');R(l,0,0,58,1.6,'#ffffff');
    /* the crown itself takes the light of the hour, but none of its own shadow on the wall */
    clipTo(l,()=>{l.beginPath();for(const[cx,cy,rx,ry]of FIGCourt){l.moveTo(cx+rx+3,cy);l.ellipse(cx,cy,rx+3,ry+3,0,0,6.2832)}},()=>{
      R(l,200,0,120,70,amb);l.beginPath();l.moveTo(0,0);l.lineTo(320,0);for(let x=320;x>=0;x-=2)l.lineTo(x,edge(x)-(eve?0:6));l.closePath();l.fillStyle=sun;l.fill()});
    /* the floor: more of the sky's light toward the front, and less under the walls */
    l.fillStyle=lg(l,0,104,0,144,[tint(amb,-.08),tint(amb,.18)]);l.fillRect(0,104,320,40);
    /* what the sunlit walls throw back down into the court: a long, low lift on the ground before the house, warmest under the sun */
    pool(l,eve?110:210,107,150,7,eve?'#ffe6c4':'#f4f2ee',.3,'source-over');
    /* the shade where the walls meet: in the corner by the house over the passage, along the foot of the walls, in the door's
       reveal and under the fig, and the edge of the court nearest us, under the roofs behind the onlooker */
    ao(l,61,10,12,94,'l',.24,'#4a3e58');ao(l,0,88,320,16,'b',.2,'#4a3e58');
    pool(l,250,107.4,26,3.4,'#6a6280',.3,'source-over');ao(l,0,130,320,14,'b',.18,'#3e3450')});
  passageCourt(g,eve);
  if(eve)comp(g,'soft-light',.55,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,196,130,.9)','rgba(150,120,170,.6)']);g.fillRect(0,0,320,144)});
  else comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(150,170,210,.7)','rgba(255,236,200,.7)']);g.fillRect(0,0,320,144)})}
/* eaveCourt: an eave of tiles seen from below: the rounded ends of the cover tiles against the sky, the edge of the tiles, and under it the
   rafters' ends in the shade of the eave. Its foot (the wall's top) is at y+6. */
function eaveCourt(g,x,w,y){R(g,x,y+2.6,w,3.6,'#3e302a');for(let i=x+3;i<x+w-2;i+=7.5){R(g,i,y+3.2,2.4,2.2,'#6a4a2e');R(g,i,y+3.2,2.4,.5,'#8e6a44')}
  R(g,x,y,w,2.8,RO);R(g,x,y,w,.6,tint(RO,.32));R(g,x,y+2.2,w,.6,tint(RO,-.38));
  for(let i=x+2;i<x+w-1;i+=4.4){g.beginPath();g.ellipse(i,y+.2,1.9,1.5,0,Math.PI,0);g.fillStyle=tint(RO,-.06);g.fill();R(g,i-1.4,y-1,1.6,.5,tint(RO,.34))}
  ao(g,x,y+6,w,5,'t',.42,'#2a2030')}
/* archCourt: the arch of the passage: a ring of wedge-shaped stones on jambs of long and short blocks. Every joint stops at the edges of its
   own stone. The opening itself is painted after the light (passageCourt). */
const ARCHCourt={x:8,y:48,w:40,h:56};
function archCourt(g,r){const{x,y,w,h}=ARCHCourt,cx=x+w/2,cy=y+w/2,S='#cbbf9e';
  /* the jambs: blocks that reach into the wall by turns, so that their outer edge steps */
  for(let j=0,yy=cy;yy<y+h-.1;j++){const bh=Math.min(6,y+h-yy),long=j%2===0;
    for(const side of[-1,1]){const bw=long?6:3.6,bx=side<0?x-bw:x+w,c=tint(S,(r()-.5)*.14);R(g,bx,yy,bw,bh-.5,c);R(g,bx,yy,bw,.5,tint(c,.2));R(g,bx,yy+bh-1,bw,.5,tint(c,-.2))}
    yy+=bh}
  /* the ring */
  const n=9,R0=w/2,R1=w/2+5;for(let i=0;i<n;i++){const a0=Math.PI+i*Math.PI/n,a1=a0+Math.PI/n,c=tint(S,(r()-.5)*.14+(i===4?.06:0)),
    p=[cx+Math.cos(a0)*R0,cy+Math.sin(a0)*R0,cx+Math.cos(a0)*R1,cy+Math.sin(a0)*R1];
    for(let k=1;k<=6;k++){const a=a0+(a1-a0)*k/6;p.push(cx+Math.cos(a)*R1,cy+Math.sin(a)*R1)}for(let k=6;k>=0;k--){const a=a0+(a1-a0)*k/6;p.push(cx+Math.cos(a)*R0,cy+Math.sin(a)*R0)}
    poly(g,p,c);stroke(g,[cx+Math.cos(a0)*R0,cy+Math.sin(a0)*R0,cx+Math.cos(a0)*R1,cy+Math.sin(a0)*R1],tint(S,-.4),.5)}
  g.strokeStyle=tint(S,.25);g.lineWidth=.5;g.beginPath();g.arc(cx,cy,R1-.3,Math.PI*1.05,Math.PI*1.6);g.stroke();
  clipTo(g,()=>{g.beginPath();g.rect(x-7,y-6,w+14,h+6)},()=>tex(g,'mott',.35,x-7,y-6,w+14,h+6,'overlay',1))}
/* passageCourt: the passage under the house: a vault that runs back a little to the left, its left wall and its floor catching the day
   from the far end, and through the far arch the lane outside, closed by the front of the house across it. */
function passageCourt(g,eve){const{x,y,w,h}=ARCHCourt,s=.6,fx=37,fw=w*s,fb=94.4,fy=fb-h*s,fl=fx-fw/2;
  clipTo(g,()=>arch(g,x,y,w,h),()=>{
    g.fillStyle=lg(g,0,y,0,y+h,['#1a1416','#262022','#2e2826']);g.fillRect(x,y,w,h);
    /* the vault overhead, lighter toward the far end */
    g.fillStyle=lg(g,0,y,0,fy+6,['rgba(0,0,0,0)','rgba(120,104,92,.28)']);g.fillRect(x,y,w,fy-y+6);
    /* the left wall, and the floor */
    poly(g,[x,y+w/2,fl,fy+fw/2,fl,fb,x,y+h],null);g.fillStyle=lg(g,x,0,fl,0,['#262020','#4a4038','#6a5c4c']);g.fill();
    poly(g,[x,y+h,x+w,y+h,fl+fw+2,fb,fl,fb],null);g.fillStyle=lg(g,0,fb,0,y+h,[eve?'#8a7466':'#7a7872','#4a4440','#2c2624']);g.fill();
    /* the far arch: the lane, and the house across it */
    clipTo(g,()=>arch(g,fl,fy,fw,h*s),()=>{const hw=eve?'#d8b48c':'#a8aab0';
      g.fillStyle=lg(g,0,fy,0,fb,[tint(hw,.14),hw,tint(hw,-.1)]);g.fillRect(fl,fy,fw,fb-fy);tex(g,'mott',.4,fl,fy,fw,fb-fy,'overlay',1);
      if(!eve)R(g,fl,fy,fw,7,'#e6dcc6');
      R(g,fl+9,fy+10,7,fb-3-(fy+10),'#3a2e28');R(g,fl+9,fy+10,7,.6,'#1e1814');
      R(g,fl,fb-3,fw,3,eve?'#b09474':'#a8a49a');R(g,fl,fb-3,fw,.5,tint(hw,-.3));
      if(eve)comp(g,'soft-light',.6,()=>R(g,fl,fy,fw,fb-fy,'#ffb070'))});
    pool(g,fl+fw*.4,fb+1,18,6,eve?'#ffcc90':'#b8c4d4',.26);pool(g,fl+2,fb-8,10,14,eve?'#ffcc90':'#b8c4d4',.12);
    ao(g,x,y,w,10,'t',.5,'#100c0e')})}
/* doorCourt: the door, in a frame of dressed stone under a lintel: three wide planks, and in the middle one a hatch of two boards. It
   opens at the right, where the bolt is on the inside. No band of iron lies across the planks. */
function doorCourt(g,r){const S='#cec4a6',D='#6a4a2c';
  R(g,112,47,42,5.6,S);R(g,112,47,42,.6,tint(S,.36));R(g,112,52,42,.6,tint(S,-.4));tex(g,'mott',.3,112,47,42,5.6,'overlay',1);
  for(const x of[116,146]){R(g,x,52.6,4,51.4,tint(S,-.04));R(g,x,52.6,.5,51.4,tint(S,.24));R(g,x+3.5,52.6,.5,51.4,tint(S,-.34))}
  R(g,120,52.6,26,51.4,'#140e0a');
  const P=[[120.4,127.6],[127.6,138.4],[138.4,145.6]];for(const[a,b]of P)boardsDoor(g,a,53.4,b-a,50.6,b-a,D,r);
  /* the deep reveal of the doorway: the planks lie back in the shade of the lintel and the jambs */
  ao(g,120,52.6,26,14,'t',.3,'#1a1218');ao(g,141,52.6,5,51.4,'r',.28,'#1a1218');
  ao(g,120,52.6,26,6,'t',.6);ao(g,120,52.6,3,51.4,'l',.45);
  /* the hatch */
  R(g,128.6,67.8,9,8.2,'#3a2818');boardsDoor(g,129.2,68.4,7.8,7,3.9,'#7a5634',r);R(g,129.2,68.4,7.8,.5,'#9a7448');R(g,128.6,75.6,9,.5,'#2a1c12');
  /* a pull of bronze, near the edge that opens */
  R(g,142.6,77,.9,4,'#8a6a3a');R(g,142.6,77,.4,4,'#c8a060');
  /* the threshold */
  R(g,113,103,40,2.6,tint(S,.06));R(g,113,103,40,.6,tint(S,.36))}
/* troughCourt: a trough cut from one stone, against the wall, with water in it; the ground before it dark with what has been spilled */
function troughCourt(g,x,y,w,h){const S='#b8b0a0';
  shadow14(g,x+w/2+1,y+h+.4,w*.56,1.5,.5,'#2e2430');
  g.fillStyle=lg(g,0,y+3,0,y+h,[tint(S,.1),S,tint(S,-.26)]);g.fillRect(x,y+2.6,w,h-2.6);
  R(g,x,y,w,2.8,tint(S,.22));R(g,x+1.6,y+.5,w-3.2,1.5,'#4a6270');R(g,x+2.4,y+.7,w-9,.5,'#9cbccc');R(g,x,y+2.6,w,.5,tint(S,.42));
  R(g,x+w-.8,y,.8,h,tint(S,-.3));
  clipTo(g,()=>{g.beginPath();g.rect(x,y+2.6,w,h-2.6)},()=>{tex(g,'mott',.3,x,y,w,h,'overlay',.8);tex(g,'grain',.12,x,y,w,h,'overlay',.5);
    for(let i=0;i<9;i++)R(g,x+2+i*3.1,y+4+(i%3)*1.6,1.2,.5,tint(S,-.16));
    /* an old crack in the stone, cut dark with its lit lip beside it */
    crack14(g,x+w-7,y+3,1,rng(1433),1.3);
    g.fillStyle=lg(g,0,y+h-3,0,y+h,['rgba(90,110,70,0)','rgba(90,110,70,.5)']);g.fillRect(x,y+h-3,w,3)})}
/* floorCourt: trodden earth, with a few old flagstones sunk in it before the door; the joints between them never meet four at a point */
function floorCourt(g,r){g.fillStyle=lg(g,0,104,0,144,['#a8946e','#b6a27c','#c0ac86']);g.fillRect(0,104,320,40);tex(g,'mott',.34,0,104,320,40,'overlay',1);
  /* the way trodden from the passage to the door and the trough, a little paler */
  pool(g,90,112,70,7,'#e0d0ac',.22,'source-over');pool(g,170,110,50,5,'#e0d0ac',.16,'source-over');
  for(const[x,y,w,h]of[[100,104.6,20,4.4],[121,104.4,17,4.6],[139,104.8,19,4.2],[160,104.6,12,4],[108,109.6,22,5.4],[131,109.8,18,5],[150,110.2,14,4.6],[118,115.8,16,5.2]]){
    const c=tint('#bcb29a',(r()-.5)*.16),k=.8;poly(g,[x+k,y,x+w-k,y,x+w,y+k,x+w-.4,y+h-.6,x+w-k,y+h,x+k,y+h,x,y+h-.6,x+.3,y+k],c);
    R(g,x+k,y,w-2*k,.5,tint(c,.3));R(g,x+k,y+h-.5,w-2*k,.5,tint(c,-.3));if(r()<.5)stroke(g,[x+w*.3,y+h*.4,x+w*.3+3,y+h*.5],tint(c,-.25),.5)}
  for(let i=0;i<150;i++){const k=r(),y=104.5+k*39;R(g,r()*320,y,.5+k*1.6,.5+k*.4,r()<.5?'rgba(80,62,40,.28)':'rgba(255,240,206,.22)')}
  pool(g,183,107,22,4,'#4a4034',.22,'source-over');
  ao(g,0,104,320,5,'t',.4,'#2a2030')}
/* the fig tree: a smooth grey trunk that forks above the heads of whoever stands under it, and a broad crown of big leaves. FIGCourt: its
   clumps of leaves [x, y, rx, ry]; the lowest hang no lower than about y 57. */
const FIGCourt=[[228,34,11,8],[250,24,17,11],[278,20,18,11],[305,27,15,12],[244,47,12,7],[268,44,15,8],[294,46,14,8],[314,49,8,7],[218,25,9,6],[262,8,20,9],[294,8,20,9],[236,12,14,8],[316,12,10,10]];
function figCourt(g,eve){const r=rng(1404),bark='#8a8680',barkL=eve?'#b8b6ae':'#a09e98',barkD='#55524e';
  /* limbs: [x0,y0, cx,cy, x1,y1, width at the foot, at the end] */
  const LB=[[248,106,240,86,250,62,9,5.4],[246.4,74,240,62,231,47,4,2],[250,63,262,55,278,45,4.6,2.6],[250,63,252,49,256,32,3.6,1.8],
    [278,45,292,39,306,32,2.4,1.2],[278,45,282,33,286,20,2.2,1.1],[231,47,225,41,217,35,1.8,.9],[256,32,258,22,262,12,1.6,.8]];
  const at=(b,t)=>{const u=1-t;return[u*u*b[0]+2*u*t*b[2]+t*t*b[4],u*u*b[1]+2*u*t*b[3]+t*t*b[5]]},side=eve?-1:1;
  /* its shadow at its foot, and the roots spreading into the ground */
  shadow14(g,249,106.4,10,1.5,.55,'#282032');
  poly(g,[239.6,106.8,242,105,243.6,100,248,99,253,99.6,254.4,104,258.6,106.8,252,106.2,248,107,244,106.2],bark);
  for(const b of LB){const L=[],Rr=[],Lt=[];for(let i=0;i<=12;i++){const t=i/12,[px,py]=at(b,t),[qx,qy]=at(b,Math.min(1,t+.02)),[sx,sy]=at(b,Math.max(0,t-.02)),
      dx=qx-sx,dy=qy-sy,dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl,hw=(b[6]+(b[7]-b[6])*t)/2;L.push(px+nx*hw,py+ny*hw);Rr.unshift(px-nx*hw,py-ny*hw);Lt.push(px+nx*hw*side*.4,py+ny*hw*side*.4)}
    poly(g,L.concat(Rr),bark);const back=q=>{const o=[];for(let i=q.length-2;i>=0;i-=2)o.push(q[i],q[i+1]);return o},Rf=back(Rr);
    /* the side toward the sun lit, the other edge dark, and the smooth bark blotched */
    poly(g,(side>0?L:Rf).concat(back(Lt)),barkL);stroke(g,side>0?Rf:L,barkD,.7);
    if(b[6]>3)clipTo(g,()=>poly(g,L.concat(Rr)),()=>{tex(g,'blotch',.5,b[4]-12,b[5]-4,26,b[1]-b[5]+8,'overlay',1);
      for(let i=0;i<b[6]*2;i++){const[px,py]=at(b,r());R(g,px-2+r()*4,py,.5+r()*1.2,.5+r()*1.4,r()<.5?rgba(barkD,.4):rgba(barkL,.4))}})}
  /* the leaves: each clump a dark mass first, then leaf by leaf from the back to the front, lit from the side of the sun. The light and
     the shade of the hour are laid over it with the rest (see paintCourt). */
  const S3=eve?[-.7,-.55,.45]:[.45,-.6,.65],RAMP=eve?['#2c3a26','#425632','#5e7c3a','#86a046','#aab45a','#c8c46e']:['#263a2c','#38503a','#506e42','#70904a','#9cb85c','#c4d87c'];
  const leaf=(x,y,s,a,c,d)=>{const p=[];for(let i=0;i<10;i++){const t=a+i/10*6.2832,k=[1,.6,.92,.56,.84,.66,.84,.56,.92,.6][i];p.push(x+Math.cos(t)*s*k,y+Math.sin(t)*s*k*.8)}poly(g,p,c);
    if(d)stroke(g,[x,y+s*.5,x+Math.cos(a)*s*.2,y-s*.3],d,.5)};
  const all=[];for(const[cx,cy,rx,ry]of FIGCourt){oval(g,cx,cy,rx*.8,ry*.7,RAMP[0]);
    for(let i=0;i<rx*ry*.55;i++){const a=r()*6.2832,d=Math.pow(r(),.35),ux=Math.cos(a)*d,uy=Math.sin(a)*d,uz=Math.sqrt(Math.max(0,1-ux*ux-uy*uy)),px=cx+ux*rx,py=cy+uy*ry;
      all.push([uz+(uy>0?.1:0),px,py,ux*S3[0]+uy*S3[1]+uz*S3[2]+(r()-.5)*.4,d>.85?2.6+r()*.6:2.1+r()*.7])}}
  all.sort((a,b)=>a[0]-b[0]);
  for(const[,px,py,l,s]of all){const k=clamp(Math.round((l+.7)*3.2),0,5);leaf(px,py,s,r()*6.28,RAMP[k],k>=3?RAMP[k-2]:null)}}
/* The marketplace is seen from the square: at the back the stoa of the agora, a row of columns under a deep beam and a tiled roof,
   with the doors of its shops in the shade behind them and the slope of the hill above its roof; in front of it the stalls, each a
   booth of posts and a striped awning over a counter hung with cloth to the ground. From the left: the lane back into the city, at the
   end of the stoa; a stall of silver vessels, where the donkey stands; a stall of wrapped shrines and boxes; Demetrius's stall, the
   largest, in the middle, and beside it, under the same cloth, his workshop: a workbench, the kiln with its bellows, and the anvil
   where one of the smiths works; further on another stall, and crates. The paving runs back to the level of the eyes of those who
   stand on it (HZ_Market), and so do the sides of the stalls. The wares follow the Ephesus exception at its most restrained: a few
   small silvery figures without face, arms or anything held, shrines only wrapped in cloth or shut in boxes, and small vessels; none
   of them is seen near. Everything in it is invented. v: b busy, in the morning, with the sun from the left, the wares out and the
   kiln glowing; q quiet, late in the afternoon after the uproar, with the sun low behind the stoa: shutters closed, wares under
   cloths, the kiln cold, one awning torn down and the workbench thrown over. */
const HZ_Market=77,FOOT_Market=110,ANVIL_Market=[369.5,116];
function paintMarket(g,v){const r=rng(1403),q4=v==='q',sun=q4?1:-1;
  sky(g,480,46,q4?['#56709e','#9aa8c4','#e2c4a4','#f0c294']:SKY.day);
  if(q4){cloud(g,110,10,70,4,r,'#ffe0c0','#a890a8');cloud(g,330,6,56,3,r,'#ffe0c0','#a890a8')}else{cloud(g,96,11,60,5,r);cloud(g,286,7,48,4,r)}
  /* far off at the left, the other hill of the city in the haze; its foot lies behind the houses and the roof */
  ridge(g,0,230,46,x=>Math.max(0,34*Math.exp(-Math.pow((x-70)/80,2))+1.6*Math.sin(x/11)),q4?['#b4a4b4','#a8989e']:['#aab6c6','#9eaab8']);
  /* the slope of the hill beyond the roof, rising to the right, with scrub and pines on it */
  const hill=x=>Math.max(0,(x-170)*.07+3*Math.sin(x/23)+2*Math.sin(x/9));
  ridge(g,150,480,32,hill,q4?['#b0a27a','#8a8262']:['#9aa688','#86967a']);
  ridge(g,300,480,32,x=>Math.max(0,(x-300)*.1+2*Math.sin(x/13+1)),q4?['#a09270','#7a7458']:['#8e9a7a','#7a8a6a']);
  for(let i=0;i<40;i++){const x=180+r()*300,top=32-Math.max(hill(x),(x-300)*.1)+1.2+r()*5;if(top<29.5)R(g,x,top,1+r()*1.6,1,q4?'#6e6c4c':'#627250')}
  /* pines in small stands, as they grow on a hillside, never one alone */
  for(const[x,h]of[[331,6],[335,8],[339,6.5],[406,7],[410,9],[414,7.5],[448,8],[452,10],[456,7],[468,6.5],[472,8]]){const y=32-Math.max(hill(x),(x-300)*.1)+2.4;if(y<31)farPine(g,x,y,h,q4?'#465a3e':'#4f6648')}
  laneMarket(g,r,q4);
  stoaMarket(g,r,q4,sun);
  /* the paving of the square, its joints running back to the level of the eyes */
  pave(g,0,100,480,144,'#d6cbae',r,{vx:240,vy:HZ_Market,rows:5,step:48,v:.07});ao(g,0,100,480,5,'t',.3,'#3a3050');
  for(let i=0;i<60;i++){const x=r()*480,y=104+r()*38,k=(y-100)/44;R(g,x,y,1+k*3,.5+k*.5,r()<.5?'rgba(110,90,70,.18)':'rgba(255,248,226,.2)')}
  /* the stalls; each fills its counter with what it sells */
  const silver=(x,k)=>cupMarket(g,x,89,k);
  boothMarket(g,26,48,{r,q4,c1:'#3f6f8a',c2:'#e4d6ae',cloth:'#7a3a2e',back:'#6a5a4c',shut:q4,
    wares:()=>{for(const[x,k]of[[32,'jug'],[37,'cup'],[42,'bowl'],[48,'jug'],[54,'cup'],[59,'bowl'],[68,'jug']])silver(x,k);figMarket(g,63.5,89,6)}});
  boothMarket(g,106,72,{r,q4,c1:'#8a3a2a',c2:'#e4d6ae',cloth:'#3f5a7a',back:'#5a5a5c',torn:q4,covered:q4,
    wares:()=>{shrineMarket(g,116,89,6.4,9,'#d8ccae');boxMarket(g,125,89,9,5,'#8a6a40');shrineMarket(g,140,89,6.4,9,'#8a5a4a');boxMarket(g,149,89,8,6,'#7a5a34');figMarket(g,162,89,6);shrineMarket(g,171,89,6,8,'#c8b890')}});
  boothMarket(g,194,94,{r,q4,c1:'#6a4a7a',c2:'#e8dcb8',cloth:'#8a3a2a',back:'#5a4a4c',shut:q4,big:1,
    wares:()=>{boxMarket(g,201,89,10,6,'#7a5232');shrineMarket(g,217,89,7,10,'#e0d4b4');figMarket(g,227,89,6.5);figMarket(g,248,89,6);shrineMarket(g,258,89,7,10,'#9a6a4a');boxMarket(g,267,89,10,5,'#6a4a2c');silver(281,'cup')}});
  /* Demetrius's workshop beside his stall, under an awning of the same cloth: the workbench, and beyond it the kiln and the anvil */
  boothMarket(g,292,38,{r,q4,c1:'#6a4a7a',c2:'#e8dcb8',back:'#5a5248',bench:1,thrown:q4,
    wares:()=>{R(g,296,88.2,8,.8,'#e8ecf0');R(g,296,88.2,8,.3,'#ffffff');poly(g,[305.4,89,308.6,89,309.2,86.4,304.8,86.4],'#8a5236');R(g,304.8,86.4,4.4,.6,'#2a1a12');
      silver(312,'bowl');for(const ix of[322.5,326])R(g,ix,87.8,2.6,1.2,'#c8ced6')}});
  kilnMarket(g,r,q4,sun);
  boothMarket(g,392,56,{r,q4,c1:'#8a3a2a',c2:'#e4d6ae',cloth:'#4a6a4a',back:'#5a5248',covered:q4,
    wares:()=>{for(const[x,k]of[[398,'cup'],[404,'jug'],[410,'bowl'],[417,'cup'],[423,'jug'],[430,'bowl'],[437,'cup']])silver(x,k)}});
  cratesMarket(g,r,q4);
  if(q4){/* what was dropped when everybody ran: a cloth trodden flat on the paving, and straw */
    poly(g,[150,126,163,124,168,128,158,131,147,130],'#c8b890');poly(g,[152,127,160,126,163,128,156,129],'#b0a078');
    for(let i=0;i<30;i++){const x=196+r()*90,y=114+r()*20;R(g,x,y,1+r()*2,.5,'rgba(190,160,90,.7)')}}
  lightMarket(g,q4)}
/* laneMarket: the way back into the city, at the left, past the end of the stoa: the lane runs a little way back and turns, and the front
   of a house closes the view at its end, so that its paving runs back to the same level as the square's. At the left edge, the corner
   of the nearest house, in its own shade. */
function laneMarket(g,r,q4){const W1='#dccaa4',W2='#cfbc96',yb=90;
  house(g,-2,38,24,14,W2,r,{patch:0,cracks:0,beams:0});
  house(g,-2,50,26,yb-50,W1,r,{patch:1,cracks:0,beams:8});
  /* its door, of planks in a frame of stone, and two shuttered windows */
  R(g,8.4,74,7.6,16,'#a89a80');R(g,9.2,75.2,6,14.8,'#3a2a1c');for(let i=1;i<3;i++)R(g,9.2+i*2,75.2,.5,14.8,'#241810');R(g,9.2,75.2,6,.6,'#1a120c');R(g,8,73.4,8.4,1.2,'#c8b898');
  windowArt(g,3,60,3.4,4,W1,{shut:1});windowArt(g,17,60,3.4,4,W1,{shut:1});
  comp(g,'multiply',.3,()=>R(g,-2,34,26,yb-34,'#8a86b0'));ao(g,-2,yb-10,26,10,'b',.25,'#3a3050');
  /* the lane's paving, and the corner of the nearest house at the left edge, in its own shade */
  poly(g,[0,100,22,100,22,yb,0,yb],'#c8bc9c');for(let i=0;i<4;i++)R(g,0,yb+1.6+i*2.4,22,.5,'rgba(90,70,60,.25)');ao(g,0,yb,22,3,'t',.35,'#3a3050');
  plaster(g,0,22,3.4,78,'#c8b48e',r,{patch:0,cracks:0});comp(g,'multiply',.5,()=>R(g,0,22,3.4,78,'#7a76a0'));R(g,3,22,.5,78,'#5a5068');R(g,0,20.6,4.4,1.6,'#d8c8a8')}
/* colMarket: one column of the stoa, its foot at x,y: a fluted shaft that narrows a little toward the top, a capital hardly wider than
   the top of the shaft, and a plain base. sun -1: lit from the left, its shadow falling to the right on the wall behind; 1 from the right. */
function colMarket(g,x,y,h,w,c,sun){const cw=w*.84,s=-sun;
  comp(g,'multiply',.4,()=>poly(g,[x+s*w*.4,y-3,x+s*(w*.4+6),y-3,x+s*(w*.4+6),y-h+3,x+s*w*.4,y-h],'#6a6494'));
  poly(g,[x-w/2,y-1.5,x+w/2,y-1.5,x+cw/2,y-h+2,x-cw/2,y-h+2]);const st=[tint(c,-.22),tint(c,.22),tint(c,.04),tint(c,-.38)];if(sun>0)st.reverse();g.fillStyle=lg(g,x-w/2,0,x+w/2,0,st);g.fill();
  for(let i=1;i<4;i++)R(g,x-w/2+w*i/4-.25,y-h+3.5,.5,h-6,'rgba(70,60,80,.16)');
  if(sun>0)poly(g,[x+w/2-.6,y-1.5,x+w/2,y-1.5,x+cw/2,y-h+2,x+cw/2-.6,y-h+2],'rgba(255,214,160,.75)');
  R(g,x-cw/2-.3,y-h+.8,cw+.6,1.2,tint(c,-.06));R(g,x-cw/2-.6,y-h-.4,cw+1.2,1.2,tint(c,.14));R(g,x-cw/2-.6,y-h-.4,cw+1.2,.5,tint(c,.32));
  R(g,x-w/2-.5,y-1.5,w+1,1.5,tint(c,-.1));R(g,x-w/2-.5,y-1.5,w+1,.5,tint(c,.2))}
/* stoaMarket: the stoa at the back of the square, from its end at the lane (x 20) on. The back wall lies in the shade of the roof, with the
   door and the small window of a shop between each two columns; the columns stand on two steps under a deep beam, a cornice and the
   tiles of the roof. No line of the wall runs behind a column. */
function stoaMarket(g,r,q4,sun){const x0=22,foot=97,bt=31,bb=39,C='#e4dccb',cols=[];for(let x=56;x<490;x+=32)cols.push(x);
  g.fillStyle=lg(g,0,bt,0,foot,['#4a4048','#6e625e','#968676']);g.fillRect(x0,bt,480-x0,foot-bt);
  tex(g,'mott',.24,x0,bt,480-x0,foot-bt,'overlay',1);tex(g,'grain',.12,x0,bt,480-x0,foot-bt,'overlay',.5);
  /* the shops: some stand open, dark inside, one with a curtain half drawn; some are shut with their door of planks. After the uproar all are shut. */
  [24].concat(cols).forEach((c,k)=>{const m=c+16,kind=q4?1:[0,2,1,0,2,0,1,2,0,1,0,2,0,1,0][k%15];if(m>476)return;
    /* behind the kiln the wall is blank, so that its smoke collar does not run into a door */
    if(m!==360){R(g,m-6,70,12,27,'#8e8278');R(g,m-6,70,12,.6,'#ac9e92');R(g,m-6,70,.6,27,'#a4968a');R(g,m-4.5,71.5,9,25.5,'#2a2226');
    if(kind===1){planks14(g,m-4.5,71.5,9,25.5,3,'#5a4030',r);R(g,m-.2,71.5,.5,25.5,'#2a1c14')}
    else if(kind===2){g.fillStyle=lg(g,0,71.5,0,86,['#7a4a3c','#8a5a48']);poly(g,[m-4.5,71.5,m+2,71.5,m+1,80,m-1.4,86,m-4.5,86]);g.fill();stroke(g,[m-2.6,72,m-2.8,85],'rgba(40,20,16,.4)',.5);stroke(g,[m-.4,72,m-.8,82],'rgba(40,20,16,.35)',.5)}
    ao(g,m-4.5,71.5,9,7,'t',.55);ao(g,m-4.5,71.5,2,25.5,'l',.4)}
    R(g,m-2.4,51,4.8,5.6,'#2a2226');R(g,m-3.2,56.6,6.4,.8,'#9e9086');R(g,m-3.2,57.4,6.4,.5,'#4a3e40')});
  /* the floor of the stoa meets the wall in a soft shade and no line, so that nothing runs across the columns */
  g.fillStyle=lg(g,0,92,0,95.6,['rgba(160,142,128,0)','#a08e80']);g.fillRect(x0,92,480-x0,5);
  /* the end of the stoa at the lane: a pier as tall as the columns, plain */
  R(g,20,bb,7,foot-bb,C);R(g,20,bb,2,foot-bb,tint(C,sun<0?.16:-.34));R(g,25,bb,2,foot-bb,tint(C,sun<0?-.3:.12));
  for(const c of cols)colMarket(g,c,foot,foot-bb-1,5,C,sun);
  /* the beam: architrave and frieze, deep, under a cornice; then the roof */
  R(g,x0-2,bt,482-x0,bb-bt,tint(C,-.04));R(g,x0-2,bt+3.6,482-x0,.6,tint(C,-.26));R(g,x0-2,bt+4.2,482-x0,.5,tint(C,.2));R(g,x0-2,bb-.6,482-x0,.6,tint(C,-.4));
  tex(g,'mott',.3,x0-2,bt,482-x0,bb-bt,'overlay',1);
  R(g,x0-3.5,bt-2,484-x0,2,tint(C,.18));R(g,x0-3.5,bt-2,484-x0,.5,tint(C,.4));R(g,x0-3.5,bt-.5,484-x0,.5,tint(C,-.36));
  poly(g,[x0-3,bt-2,480,bt-2,480,21,x0+2,21],RO);for(let i=x0;i<480;i+=3.2)stroke(g,[i,bt-2,i+.4,21.2],'rgba(80,36,24,.32)',.5);
  for(let i=x0+1.6;i<480;i+=3.2)stroke(g,[i,bt-2.2,i+.4,21.4],'rgba(255,200,160,.18)',.5);R(g,x0+2,21,478-x0,.6,'#d88a5c');
  ao(g,x0,bb,480-x0,12,'t',.5,'#1a1428');
  /* the two steps the columns stand on */
  R(g,x0-2,foot,482-x0,1.6,tint(C,.08));R(g,x0-2,foot,482-x0,.5,tint(C,.32));R(g,x0-3,foot+1.6,483-x0,1.4,tint(C,-.18));R(g,x0-3,foot+1.6,483-x0,.5,tint(C,.16))}
/* boothMarket: a stall of x..x+w with its counter at the front: two posts at its ends, the awning over it, in its shade a cloth at the
   back, and the counter hung with cloth to the ground, so that no leg stands under it. The side of the stall that faces the middle of
   the picture shows, running back toward the level of the eyes. o.wares fills the counter (from y 89). o.shut closes the opening above
   the counter with shutters of upright boards; o.covered lays a cloth over the wares; o.torn: the awning hangs from one post, its other
   end torn down, and that post leans. o.bench: a workshop, with a workbench on two legs at its ends in place of the counter, and the
   cloth at the back coming down to the ground behind it, so that no column of the stoa shows between its legs; o.thrown: the bench has
   been thrown over, and lies on its side before the stall. */
function boothMarket(g,x,w,o){o=Object.assign({},o,{c1:earth14(o.c1,.18),cloth:o.cloth&&earth14(o.cloth,.2)});const q=rng(1450+x),yF=FOOT_Market,yC=89,yA=o.big?57:60,vh=o.big?9:8,r=o.r,yI=yA+vh,
    xe=x+w/2<240?x+w:x,sw=clamp((240-xe)*.026,-4.5,4.5),k=Math.abs(sw)/Math.max(1,Math.abs(240-xe));let after=null;
  /* its shadow on the paving: thrown to the right and toward us by the morning sun, to the left by the evening */
  if(o.q4)shade(g,[x+2,yF,x+w-2,yF,x+w-16,yF+4,x-14,yF+4],'#8a86b0',.5);else shade(g,[x+2,yF,x+w,yF,x+w+9,yF+3.6,x+9,yF+3.6],'#8f95c4',.42);
  /* the side, a cloth on its frame, running back */
  if(Math.abs(sw)>.6){const yt=yA+2,y2=v=>v+(HZ_Market-v)*k;
    poly(g,[xe,yt,xe+sw,y2(yt),xe+sw,y2(yF),xe,yF],mix(tint(o.back,-.2),'#6a70a8',o.q4===(sw<0)?.1:.35));
    for(let i=1;i<3;i++){const fx=xe+sw*i/3;stroke(g,[fx,y2(yt)+1,fx,y2(yF)-1],'rgba(30,24,40,.2)',.5)}}
  g.fillStyle=lg(g,0,yI,0,yC,[tint(o.back,-.62),tint(o.back,-.4)]);g.fillRect(x+1,yI-2,w-2,yC-yI+2);
  for(let i=x+4;i<x+w-6;i+=5+r()*3){const fx=i;comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,fx,0,fx+5,0,['rgba(255,255,255,0)','rgba(255,255,255,.55)','rgba(0,0,0,.35)']);g.fillRect(fx,yI,5,yC-yI)})}
  if(o.bench){g.fillStyle=lg(g,0,yC,0,yF,[tint(o.back,-.42),tint(o.back,-.52)]);g.fillRect(x+1,yC,w-2,yF-yC);
    for(let i=x+4;i<x+w-6;i+=5+r()*3){const fx=i;comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,fx,0,fx+5,0,['rgba(255,255,255,0)','rgba(255,255,255,.4)','rgba(0,0,0,.3)']);g.fillRect(fx,yC,5,yF-yC)})}
    ao(g,x+1,yI,w-2,8,'t',.5,'#1a1428');ao(g,x+1,yF-6,w-2,6,'b',.3,'#1a1428');
    if(!o.thrown){/* the bench, its top lit, on two legs set at its ends; a basket of charcoal under it; on it what is being worked */
      board14(g,x+2,yC,w-4,2.6,'#8a683a',q);R(g,x+2,yC,w-4,.5,'#c8a06a');R(g,x+2,yC+2.6,w-4,.6,'#3a2a18');
      for(const lx of[x+3,x+w-5.6])board14(g,lx,yC+3.2,2.6,yF-yC-3.2,'#6a4e2c',q,1);
      const bx=x+w/2;poly(g,[bx-6,yF,bx+6,yF,bx+7,yF-4.6,bx-7,yF-4.6],'#8a6a40');R(g,bx-7,yF-4.6,14,.6,'#b08a58');
      for(let i=0;i<9;i++)R(g,bx-6+r()*11,yF-6+r()*1.6,1.4,1.2,r()<.5?'#2a2420':'#3e3632');
      if(o.wares)o.wares()}
    else{/* thrown over: the bench lies on its side before the stall, its top on edge toward us and its legs pointing to the back;
        its charcoal is spilled on the paving. It lies in front of the posts, and is painted after them. */
      after=()=>{shade(g,[x-4,yF+1.8,x+w-6,yF+1.8,x+w-12,yF+2.6,x-8,yF+2.6],'#6a6494',.5);
        board14(g,x-3,yF-4.6,w-4,4.2,'#8a683a',q);R(g,x-3,yF-4.6,w-4,.5,'#c8a06a');R(g,x-3,yF-.9,w-4,.9,'#3a2a18');
        for(const lx of[x-1,x+w-11])poly(g,[lx,yF-4.6,lx+2.6,yF-4.6,lx+4.6,yF-7.4,lx+2,yF-7.4],'#6a4e2c');
        for(let i=0;i<16;i++)R(g,x+4+r()*(w-6),yF-1.6+r()*3.2,1.2,1,r()<.5?'#2a2420':'#3e3632');
        poly(g,[x+w-10,yF,x+w-2,yF,x+w-1,yF-3.6,x+w-8,yF-5],'#8a6a40')}}}
  else{plank14(g,x+2,yC,w-4,1.6,'#a8885a',q);R(g,x+2,yC,w-4,.5,'#d0b080');R(g,x+2,yC+1.6,w-4,.6,'#5a4026');
    if(o.shut){planks14(g,x+2.5,yI,w-5,yC-yI,3.4,'#7a5a34',r);ao(g,x+2.5,yI,w-5,4,'t',.45);R(g,x+2.5,yC-1,w-5,1,'#4a3420')}
    else{if(o.covered)coverMarket(g,x+4,yC,w-8,r);else if(o.wares)o.wares();ao(g,x+2,yI,w-4,8,'t',.5,'#1a1428')}
    /* the counter's cloth, in soft folds, with a darker hem */
    const cl=o.cloth;g.fillStyle=lg(g,0,yC+2,0,yF,[tint(cl,.08),cl,tint(cl,-.25)]);g.fillRect(x+2,yC+2.2,w-4,yF-yC-2.2);
    for(let i=x+3;i<x+w-4;i+=4+r()*2.5){const fx=i;comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,fx,0,fx+4,0,['rgba(255,255,255,0)','rgba(255,255,255,.5)','rgba(0,0,0,.4)']);g.fillRect(fx,yC+2.2,4,yF-yC-2.2)})}
    tex(g,'mott',.3,x+2,yC+2,w-4,yF-yC-2,'overlay',1);ao(g,x+2,yC+2.2,w-4,4,'t',.35);R(g,x+2,yF-1.4,w-4,1.4,tint(cl,-.4))}
  /* the posts at its ends, and the awning */
  board14(g,x,yI-1,2.6,yF-yI+1,'#6a4e2c',q,1);
  if(o.torn){const a=.2,L=w*.58,ex=x-2+L*Math.cos(a),ey=yA+L*Math.sin(a);
    poly(g,[x+w-2.6,yF,x+w,yF,x+w+2.6,yI+4,x+w,yI+4],'#5a4226');
    g.save();g.translate(x-2,yA);g.rotate(a);awning(g,0,0,L,vh,o.c1,o.c2,6);g.restore();
    /* the torn end hangs down in a tongue of cloth */
    poly(g,[ex,ey,ex-.6*Math.sin(a)*vh+0,ey+vh,ex-3,ey+vh+6,ex-6,ey+vh+2.4],tint(o.c2,-.18));poly(g,[ex-1.4,ey+vh,ex-3,ey+vh+6,ex-4.6,ey+vh+2.6],tint(o.c2,-.4))}
  else{board14(g,x+w-2.6,yI-1,2.6,yF-yI+1,'#5a4226',q,1);awning(g,x-2,yA,w+4,vh,o.c1,o.c2,6);if(o.q4)R(g,x+w-.7,yI,.7,yF-yI,'rgba(255,200,140,.45)')}
  if(o.q4)R(g,x-2,yA,.6,vh,'rgba(30,20,40,.3)');
  ao(g,x,yF-3,w,3,'b',.35,'#1a1428');if(after)after()}
/* coverMarket: wares under a cloth on a counter: a low heap of linen with the shapes of what lies under it, and soft folds */
function coverMarket(g,x,y,w,r){const p=[x-1,y+.4];for(let i=0;i<=w;i+=2){p.push(x+i,y-3-2.2*Math.sin(i/w*Math.PI)-r()*1.6)}p.push(x+w+1,y+.4);
  poly(g,p,'#d6ccb0');comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,x,0,x+w,0,['#ffffff','#d0c8d8','#a098b8']);poly(g,p);g.fill()});
  for(let i=3;i<w-2;i+=5+r()*3)stroke(g,[x+i,y-3.4,x+i+1.4,y],'rgba(90,70,60,.3)',.5);R(g,x-1,y-.4,w+2,.6,'#e8e0c8')}
/* figMarket: a small silvery figure, h tall, standing at x,y: a plain draped shape with a round head, sloping shoulders and a garment
   that widens all the way to its foot, on a little base; no face, no arms and nothing held. Nothing stands out from its sides wider
   than what is below it, so it never makes a cross. */
function figMarket(g,x,y,h){const yb=y-1,t=yb-h;
  poly(g,[x,t,x-.8,t+.3,x-1,t+1.2,x-.7,t+2,x-1.1,t+2.6,x-1.3,t+h*.5,x-1.8,yb,x+1.8,yb,x+1.3,t+h*.5,x+1.1,t+2.6,x+.7,t+2,x+1,t+1.2,x+.8,t+.3]);
  g.fillStyle=lg(g,x-1.8,0,x+1.8,0,['#c8ccd4','#f6f8fa','#aab2bc','#565c68']);g.fill();
  stroke(g,[x+.5,t+3,x+1,yb-.4],'rgba(60,64,80,.5)',.5);stroke(g,[x-.6,t+3.4,x-.9,yb-.6],'rgba(255,255,255,.5)',.5);
  R(g,x-2.1,yb,4.2,1,'#8a8e96');R(g,x-2.1,yb,4.2,.5,'#c8ccd2')}
/* shrineMarket: a shrine wrapped in cloth: an upright shape with a low peak on top under the cloth, the folds falling from the peak and
   gathering at the foot, a darker hem. Nothing of what is under it is seen. */
function shrineMarket(g,x,y,w,h,c){const p=[x-w/2-.4,y,x-w/2,y-h*.72,x-w*.2,y-h+.6,x,y-h,x+w*.2,y-h+.6,x+w/2,y-h*.72,x+w/2+.4,y];
  poly(g,p);g.fillStyle=lg(g,x-w/2,0,x+w/2,0,[tint(c,.12),tint(c,.26),c,tint(c,-.4)]);g.fill();

  stroke(g,[x-.6,y-h+1,x-w*.32,y-.4],rgba(tint(c,-.5),.5),.5);stroke(g,[x+.4,y-h+1,x+w*.1,y-.4],rgba(tint(c,-.5),.4),.5);stroke(g,[x+1,y-h+1.2,x+w*.36,y-.4],rgba(tint(c,-.5),.45),.5);
  R(g,x-w/2-.4,y-.8,w+.8,.8,tint(c,-.3))}
/* boxMarket: a closed box of wood with its lid on */
function boxMarket(g,x,y,w,h,c){wood(g,x,y-h,w,h,c);R(g,x-.4,y-h-.8,w+.8,1.2,tint(c,.18));R(g,x-.4,y-h-.8,w+.8,.5,tint(c,.4));R(g,x,y-h+.4,w,.5,tint(c,-.45));R(g,x+w-.8,y-h,.8,h,tint(c,-.3))}
/* cupMarket: a small vessel of silver: a jug, a cup on a foot, or a shallow bowl. Every rim is a flat line, never a small ring. */
function cupMarket(g,x,y,k){const S=['#6a707c','#c8ced6','#f2f4f6','#9aa2ae','#4e5462'],fill=p=>{poly(g,p);g.fillStyle=lg(g,x-2,0,x+2,0,S);g.fill()};
  if(k==='jug'){fill([x-1.6,y,x+1.6,y,x+2,y-2.6,x+1.2,y-4.2,x+.8,y-5.2,x+1.2,y-5.8,x-1.2,y-5.8,x-.8,y-5.2,x-1.2,y-4.2,x-2,y-2.6]);R(g,x-1.2,y-6,2.4,.6,'#e8ecf0')}
  else if(k==='cup'){fill([x-.8,y,x+.8,y,x+.5,y-1,x+1.8,y-2.2,x+2,y-4,x-2,y-4,x-1.8,y-2.2,x-.5,y-1]);R(g,x-2,y-4.2,4,.6,'#f0f2f4');R(g,x-1.2,y-.5,2.4,.5,'#8a909a')}
  else{fill([x-1.2,y,x+1.2,y,x+2.4,y-1.2,x+2.8,y-2,x-2.8,y-2,x-2.4,y-1.2]);R(g,x-2.8,y-2.2,5.6,.6,'#f0f2f4')}}
/* kilnMarket: the kiln, where silver is worked: a dome of clay on a base of brick, its mouth wide and low and black with soot above it,
   a short collar of clay at its top for the smoke, and at its left the bellows, a bag of goatskin between two boards with a reed tube
   tipped with clay that runs into the base (Insight, "Bellows"). v b: charcoal glowing in its mouth; q: cold, grey ash. */
function kilnMarket(g,r,q4,sun){const cx=358,yb=100,rx=18,ry=25,F0=108;
  if(q4)shade(g,[cx-rx-2,F0,cx+rx+2,F0,cx+rx-12,F0+3.4,cx-rx-16,F0+3.4],'#8a86b0',.5);else shade(g,[cx-rx-2,F0,cx+rx+2,F0,cx+rx+12,F0+3,cx-rx+6,F0+3],'#8f95c4',.45);
  ashlar(g,cx-rx-1,yb,rx*2+2,F0-yb,'#9a6a4a',r,{bw:5,bh:2.6,v:.16,t:.3});R(g,cx-rx-1.5,yb-.6,rx*2+3,1.2,'#b08a6a');
  const st=['#8a5e40','#b8845a','#a8744c','#6a4430'];if(sun>0)st.reverse();
  g.beginPath();g.ellipse(cx,yb,rx,ry,0,Math.PI,0);g.closePath();g.fillStyle=lg(g,cx-rx,0,cx+rx,0,st);g.fill();
  clipTo(g,()=>{g.beginPath();g.ellipse(cx,yb,rx,ry,0,Math.PI,0);g.closePath()},()=>{tex(g,'mott',.5,cx-rx,yb-ry,rx*2,ry,'overlay',1);
    g.fillStyle=lg(g,0,yb-ry,0,yb,['rgba(255,230,200,.25)','rgba(255,230,200,0)']);g.fillRect(cx-rx,yb-ry,rx*2,ry);
    /* soot over the mouth, and a few cracks in the clay */
    pool(g,cx,yb-9,10,9,'#1a1210',.55,'source-over');
    stroke(g,[cx-11,yb-14,cx-9,yb-10,cx-10,yb-6],'rgba(60,30,20,.4)',.5);stroke(g,[cx+9,yb-18,cx+12,yb-13],'rgba(60,30,20,.35)',.5)});
  /* the mouth: wide and low */
  poly(g,[cx-8,yb,cx-8,yb-5,cx-5,yb-7,cx+5,yb-7,cx+8,yb-5,cx+8,yb],'#1a0e0a');
  if(!q4){g.fillStyle=lg(g,0,yb-6,0,yb,['#5a1a0a','#c8461a','#ffb040']);poly(g,[cx-7,yb,cx-7,yb-2.6,cx-4,yb-3.6,cx,yb-3,cx+4,yb-3.8,cx+7,yb-2.4,cx+7,yb]);g.fill();
    for(let i=0;i<9;i++)R(g,cx-6+r()*12,yb-2.4+r()*2,1,.8,r()<.5?'#ffe080':'#e86020')}
  else{poly(g,[cx-7,yb,cx-7,yb-1.6,cx,yb-2.4,cx+7,yb-1.4,cx+7,yb],'#6a6460');for(let i=0;i<6;i++)R(g,cx-6+r()*12,yb-1.8+r()*1.4,1,.6,'#8a8480')}
  R(g,cx-9,yb-.4,18,1,'#7a4a30');
  /* the collar for the smoke on top */
  poly(g,[cx-3.4,yb-ry+.6,cx+3.4,yb-ry+.6,cx+2.8,yb-ry-3.4,cx-2.8,yb-ry-3.4],'#9a6a48');R(g,cx-2.8,yb-ry-3.4,5.6,.8,'#2a1a12');R(g,cx+(sun<0?-3.4:2),yb-ry-3.4,1.4,4,'#b8845a');
  /* the bellows at its left, lying on the ground: the bag between its boards, a handle on the upper one, the tube to the kiln */
  const bx=335.5,by=F0+3.2;shadow14(g,bx,by-.2,6,1.1,.5,'#1e1a32');
  wood(g,bx-6,by-1.2,10,1.2,'#6a4e2c');
  poly(g,[bx-5.6,by-1.2,bx+3,by-1.2,bx+4.6,by-2.8,bx+3,by-5,bx-1.6,by-6.2,bx-5.6,by-5.4],'#7a5434');
  poly(g,[bx-5,by-4.8,bx-1.4,by-5.8,bx+2.4,by-4.6,bx-2,by-3.8],'#a07650');stroke(g,[bx-3,by-5.6,bx-2.6,by-1.6],'rgba(40,24,12,.45)',.5);stroke(g,[bx+.4,by-5.4,bx+1.4,by-1.8],'rgba(40,24,12,.4)',.5);
  poly(g,[bx-6.4,by-5.4,bx+2.4,by-6.8,bx+3,by-6,bx-6.4,by-4.4],'#8a683a');
  stroke(g,[bx+4.4,by-2.8,cx-rx+1.6,by-3.4],'#b09868',1);R(g,cx-rx,by-4.4,2.4,2,'#a86844')}
/* cratesMarket: at the far right, crates of wood and a big jar of water against the stoa; late in the day the straw they were packed
   with lies spilled beside them. The crates show no joints between their boards: a joint under the edge of the crate on top would make
   a cross with it. */
function cratesMarket(g,r,q4){const yF=FOOT_Market;
  if(q4)shade(g,[452,yF,480,yF,470,yF+3.4,440,yF+3.4],'#8a86b0',.45);else shade(g,[450,yF,480,yF,480,yF+3,456,yF+3],'#8f95c4',.4);
  const q=rng(1458);shadow14(g,476,yF,5.4,1.1,.5,'#1e1a32');
  for(const[x,y,w,h,c]of[[452,yF,14,10,'#7a5a34'],[466,yF,12,9,'#6a4e2c'],[454,yF-10,8,8,'#8a683a']]){plank14(g,x,y-h,w,h,c,q,0);R(g,x,y-h,w,1,tint(c,.22));R(g,x,y-1,w,1,tint(c,-.4));R(g,x+w-1,y-h,1,h,tint(c,-.3))}
  vessel(g,474,yF,4.4,13,'#a8643a','pithos',{noShadow:1});
  if(q4){poly(g,[438,yF+.6,452,yF+.6,451,yF-1.6,446,yF-3,441,yF-2.4],'#c8a860');for(let i=0;i<14;i++){const sx=438+r()*13,sy=yF-2.4+r()*2.8;stroke(g,[sx,sy,sx+1.6+r()*1.6,sy-.4+r()*.8],r()<.5?'#e0c878':'#9a7a40',.5)}}}
/* lightMarket: the light of the hour over the whole: the morning sun from the left; or the low sun of the late afternoon from the right,
   golden on the roof and the hill, with the stalls throwing long shadows. */
function lightMarket(g,q4){
  /* the light map of the square: the open sky's light everywhere, the sun fuller on the front of the paving and on the side it comes
     from; the shade deepest under the stoa's beam, along the foot of its wall and of the stalls, and in the far corner from the sun */
  lightmap(g,480,q4?'#f0ecf0':'#eeeaee',l=>{
    if(!q4){pool(l,150,130,280,18,'#fffcf6',.7,'source-over');pool(l,60,60,140,50,'#fffaf0',.45,'source-over');ao(l,380,0,100,144,'r',.14,'#5a5474')}
    else{pool(l,240,138,300,10,'#fff6ec',.6,'source-over');ao(l,0,0,90,144,'l',.14,'#5a5474')}
    ao(l,22,39,458,18,'t',.26,'#4a4460');ao(l,22,84,458,13,'b',.22,'#4a4460');pool(l,240,110.4,300,3.4,'#6a6484',.22,'source-over')});
  /* the glow of the kiln's mouth on the paving before it, long and low */
  if(!q4)pool(g,358,104,26,3.6,'#ffb070',.22,'screen');
  if(!q4){comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,0,480,0,['rgba(255,226,170,.9)','rgba(255,240,210,.5)','rgba(170,180,220,.6)']);g.fillRect(0,0,480,144)});
    pool(g,200,126,260,26,'#fff4d8',.18,'screen');pool(g,120,40,220,60,'#fff0d0',.12,'screen')}
  else{/* the sun is low behind the stoa: the stoa and the stalls lie in their own shadow, which reaches out over the back of the square;
      only the front of the square, the roof, the hill and the sky keep the sun */
    comp(g,'multiply',.72,()=>{g.fillStyle='#8078aa';poly(g,[0,31,480,31,480,113,300,114.6,0,119])});
    comp(g,'multiply',.35,()=>{g.fillStyle=lg(g,0,113,0,123,['#8078aa','rgba(128,120,170,0)']);poly(g,[0,119,300,114.6,480,113,480,121,0,125])});
    comp(g,'soft-light',.6,()=>{g.fillStyle=lg(g,0,0,480,0,['rgba(130,120,190,.7)','rgba(255,190,130,.6)','rgba(255,160,90,.9)']);g.fillRect(0,0,480,144)});
    comp(g,'soft-light',.6,()=>{g.fillStyle=lg(g,0,116,0,144,['rgba(255,180,110,.9)','rgba(255,200,140,.6)']);g.fillRect(0,116,480,28)});
    comp(g,'screen',.26,()=>{g.fillStyle=lg(g,0,0,0,32,['rgba(255,190,120,1)','rgba(255,190,120,.35)']);g.fillRect(0,0,480,32)});
    pool(g,440,24,220,40,'#ffc080',.18,'screen')}}
/* The outer colonnade of the theater, late in the morning of the uproar. From the left: the view out across the square to the harbor road,
   full of people, running down between its colonnades to the gate and the water; the colonnade along the street, a row of columns under a
   deep beam and a roof, with shops behind them, shut in a hurry; and the stage building of the theater, its wall of dressed stone in two
   storeys, with five arched ways in, where the crowd pushes in. Above and behind it the seats rise in a curve against Mount Pion, and
   they are filling. The sun stands high on the left. The shops, the houses on the slope and the scrub of the hill are the game's own.
   HZColon is the horizon, where the water of the harbor ends and the paving runs to; FTColon the foot of the stage building; ARCColon the
   middles of its arches, AWColon their width and ATColon the top of their heads. */
const HZColon=60,FTColon=96,ARCColon=[201,263,325,387,449],AWColon=30,ATColon=44;
function paintColon(g){const r=rng(1405);
  /* the sky of a late morning, a few clouds over the harbor */
  sky(g,480,HZColon+2,['#3c78c4','#6898d4','#a4c2e0','#dce4e4'].map(c=>earth14(c,.12)));cloud(g,30,22,40,4,r);cloud(g,96,12,36,3,r);cloud(g,300,5,50,3,r);
  hillColon(g,r);caveaColon(g,r);
  /* the square and the street: one floor of marble slabs that runs back to the horizon */
  pave(g,0,61,480,144,'#e2dac8',r,{vx:240,vy:59.4,rows:10,step:34,p:1.75,v:.06,t:.3});veinsColon(g,r);
  vistaColon(g,r);stageColon(g,r);colonnadeColon(g,r);
  /* the crowd at the arches: the shadows of all of them, and those deep in the arches; colonDraw lays the others over whoever hurries in
     behind them, in three rows from the back to the front */
  throngColon(g,0,200,1);throngColon(g,0,ROWSColon[0][0]);
  /* soft shade at the foot of the walls, and the warm light of the late morning */
  ao(g,0,96,480,8,'t',.2,'#3a3050');
  /* the light map of the square: the high sun from the left fullest on the open square and on the paving nearest us; the shade under the
     colonnade's roof and along the foot of the stage building, and a little more of it at the far right, away from the sun */
  lightmap(g,480,'#eeeaee',l=>{pool(l,60,90,150,60,'#fffcf4',.6,'source-over');pool(l,240,132,300,16,'#fffaf0',.55,'source-over');
    ao(l,40,44,110,20,'t',.22,'#4a4460');pool(l,315,97,180,3,'#6a6484',.24,'source-over');ao(l,400,0,80,144,'r',.12,'#5a5474')});
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,480,0,['rgba(255,232,180,.9)','rgba(255,244,220,.4)','rgba(214,210,236,.5)']);g.fillRect(0,0,480,144)})}
/* blobColon: a small round thing (a bush, a head, a shadow): an oval, or a small square where an oval would be under about a pixel
   across and come out as a plus sign */
function blobColon(g,x,y,rx,ry,c){if(Math.min(rx,ry)<1.1&&Math.max(rx,ry)<2.4)R(g,x-rx,y-ry,rx*2,ry*2,c);else oval(g,x,y,rx,ry,c)}
/* hillColon: the hills across the harbor, far off and blue; and Mount Pion, which falls towards the harbor on the left, with the houses of
   the city climbing its lower slope, and scrub, rock and a few pines above them. Nothing on it stands upright across a level line. */
function hillColon(g,r){const HZ=HZColon,yP=x=>x<14?HZ:9+49*Math.exp(-(x-14)/44)+1.8*Math.sin(x/31+1)+.9*Math.sin(x/9.3)+(x>300?.012*(x-300):0);
  ridge(g,0,90,HZ,x=>6+2*Math.sin(x/11+1)+1.4*Math.sin(x/4.3),['#94a8be','#acbac4']);
  ridge(g,0,90,HZ,x=>2.6+.8*Math.sin(x/6+2),['#a2b2be','#b6c0c4']);
  /* the hill's own outline: its mottle and its patches stay inside it, and never reach the sky */
  const hill=()=>{g.beginPath();g.moveTo(12,HZ);for(let x=12;x<=480;x+=2)g.lineTo(x,yP(x));g.lineTo(480,HZ);g.closePath()};
  ridge(g,12,480,HZ,x=>HZ-yP(x),['#9aa478','#86905e','#8a8a5c']);clipTo(g,hill,()=>tex(g,'mott',.45,12,0,468,HZ,'overlay',1));
  /* patches of dry grass and bare rock between the scrub */
  clipTo(g,hill,()=>{for(let i=0;i<46;i++){const x=14+r()*466,y=yP(x)+1+r()*22;oval(g,x,y,2.4+r()*6,.8+r()*1.8,r()<.6?'rgba(184,164,106,.4)':'rgba(170,168,156,.42)')}});
  /* scrub in clumps and grey rock, lit from the left; the higher, the hazier */
  for(let i=0;i<520;i++){const x=12+r()*468,y0=yP(x);if(y0>HZ-2)continue;const y=y0+.6+Math.pow(r(),1.4)*Math.min(30,HZ-y0-2),hz=clamp((y-4)/30,0,1);
    if(r()<.2){const w=1+r()*2.6;R(g,x,y,w,.6+r()*.6,mix('#c2b898','#b4b8b8',1-hz));R(g,x,y+.6,w,.5,mix('#6e6a56','#8a90a0',1-hz))}
    else{const c=mix(r()<.5?'#56683e':'#687848','#8c9a8a',(1-hz)*.5);blobColon(g,x,y,1.4+r()*1.4,1.1+r()*.5,tint(c,-.15));blobColon(g,x-.5,y-.4,.6+r()*.5,.5+r()*.2,tint(c,.12))}}
  for(const[x,h]of[[214,8],[221,6],[262,9],[410,8],[418,10],[456,7]])pine(g,x,yP(x)+h*.7,h,'#4e6448');
  /* the houses on the lower slope, each a block with its roof, set apart so that no four corners meet */
  for(let i=0;i<26;i++){const x=14+r()*82,y=yP(x)+2.4+r()*16,w=3.6+r()*4,h=2.2+r()*2.2;if(y+h>HZ-1||y<yP(x)+1.6)continue;
    R(g,x,y,w,h,r()<.5?'#e6dac0':'#d8caa8');R(g,x+w-1,y,1,h,'#aa9e8a');R(g,x-.3,y-.9,w+.6,1,'#ba6a4c');R(g,x-.3,y-.9,w+.6,.4,'#d88a64');if(w>5)R(g,x+1.2,y+h*.45,.8,h*.55,'#5a4a40')}}
/* caveaColon: the seats of the theater, seen from below: each tier is a level curve that dips towards the middle of the bowl and rises
   towards its ends, and only the upper tiers show over the stage building. Each end of the bowl stands on a retaining wall whose top
   follows the slope of the seats; the right one is out of the picture. People are taking their places, thick in the lower rows and fewer
   higher up. No stair is drawn across the tiers. */
function caveaColon(g,r){const cx=330,HW=f=>134+32*f,ye=f=>21.5-19.5*Math.pow(f,.9),S=16,yt=(x,f)=>{const u=(x-cx)/HW(f);return ye(f)+S*(1-u*u)},xl=f=>cx-HW(f),XR=482;
  const rim=[];for(let x=xl(1);x<=XR;x+=1)rim.push(x,yt(x,1));
  const bowl=()=>{g.beginPath();g.moveTo(xl(0),ye(0));g.lineTo(xl(1),ye(1));for(let i=0;i<rim.length;i+=2)g.lineTo(rim[i],rim[i+1]);g.lineTo(XR,30);g.lineTo(xl(0),30);g.closePath()};
  /* the back of the bowl's end, where it curves away into the hill, in shade */
  poly(g,[xl(1),ye(1),xl(1)-4,ye(1)+2.4,xl(1)-7,ye(1)+9,xl(1)-8,30,xl(1)+2,30],'#a29686');ao(g,xl(1)-8,ye(1),8,30,'l',.25,'#3a3050');
  /* the retaining wall at the left end: its face lit, its top a coping that follows the slope of the seats */
  const wall=[xl(1)-1.2,ye(1)+.8,xl(0)+1.2,ye(0)+.8,xl(0)+1.2,30,xl(1)-1.2,30];
  clipTo(g,()=>poly(g,wall),()=>{ashlar(g,xl(1)-2,0,xl(0)-xl(1)+4,30,'#d8ccae',r,{bw:9,bh:3.2,v:.07,t:.3});ao(g,xl(1)-2,0,xl(0)-xl(1)+4,30,'r',.16,'#3a3050')});
  clipTo(g,bowl,()=>{g.fillStyle=lg(g,xl(1),0,XR,0,['#b4ae9e','#cec4aa','#dcd2b8','#d4caae']);g.fillRect(0,0,XR,30);
    /* the tiers: the front of each seat, and the shadow under its lip; each one a level curve */
    const K=26,F=k=>1-k/K;
    for(let k=0;k<K;k++){const p=[];for(let x=xl(F(k))-2;x<=XR;x+=1.5)p.push(x,yt(x,F(k))+.9);stroke(g,p,'rgba(64,56,80,.55)',.6);stroke(g,p.map((v,i)=>i%2?v-.6:v),'rgba(255,250,232,.35)',.5)}
    /* the walkway between the upper seats and the lower, a little wider than a tier */
    {const f=F(9)-.012,p=[];for(let x=xl(f)-2;x<=XR;x+=1.5)p.push(x,yt(x,f));stroke(g,p,'#ebe2c8',1.3);stroke(g,p.map((v,i)=>i%2?v+.9:v),'rgba(64,56,80,.55)',.5)}
    /* the people, sitting or standing on the tiers: a head over a body; thick low down, thinner higher up, a few gaps still */
    const C=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#d8ccb0','#4e5a6e','#a4503a','#6e5a3a','#b98258','#ece2cc','#5a6a4a','#c8a070'];
    for(let k=0;k<K;k++){if(k===9)continue;const f=F(k),dens=.25+.65*k/K;let x=xl(f)+.6+r()*1.2;
      while(x<XR){if(r()<dens){const y=yt(x,f)+.4,tall=r()<.3?.5:0;R(g,x,y-1.5-tall,.5,1+tall,C[(r()*C.length)|0]);R(g,x,y-2-tall,.5,.5,r()<.7?'#3e3028':r()<.5?'#8a7a6a':'#b08060')}x+=.5+(r()<.6?.5:r()*2)}}
    /* the left wing is turned away from the sun */
    comp(g,'multiply',.32,()=>{g.fillStyle=lg(g,xl(1),0,cx+30,0,['#7a78a8','rgba(255,255,255,0)']);g.fillRect(0,0,XR,30)})});
  /* the coping of the retaining wall, and the low wall along the top of the bowl */
  stroke(g,[xl(1)-1.2,ye(1)+.3,xl(0)+1.2,ye(0)+.3],'#f2e8d0',1);stroke(g,[xl(1)-1.2,ye(1)+1.1,xl(0)+1.2,ye(0)+1.1],'#8a8070',.5);
  stroke(g,rim,'#8a8070',1.4);stroke(g,rim.map((v,i)=>i%2?v-.8:v),'#eee4cc',.6)}
/* veinsColon: grey veins in the marble of the paving, each within its slab */
function veinsColon(g,r){for(let i=0;i<70;i++){const y=98+Math.pow(r(),.7)*44,s=(y-HZColon)/84,x=r()*480,l=(3+r()*8)*s,p=[x,y];let px=x,py=y;
  for(let k=0;k<3;k++){px+=l/3;py+=(r()-.5)*1.4*s;p.push(px,py)}stroke(g,p,'rgba(120,116,124,.22)',.5)}}
/* vistaColon: past the end of the colonnade, the far side of the square, and the mouth of the harbor road: between its two colonnades it
   runs down to the harbor gate, and through the gate the water lies at the level of the horizon. Road and square are full of people. The
   lines of the road end at the corners of the gate and never meet in one point, and no upright stands across the water. */
function vistaColon(g,r){const HZ=HZColon,gx=18,G0=HZ-.3,y0=66,top=52,
  /* along an edge of the road, from its near end (x at y) to the gate (x2 at y2): f 0 near, 1 at the gate */
  ln=(x,y,x2,y2,f)=>[x+(x2-x)*f,y+(y2-y)*f];
  clipTo(g,()=>{g.beginPath();g.rect(0,0,42,97)},()=>{
    /* the roofs of the lower city, falling towards the harbor, over the colonnades of the road and beside the gate */
    for(let i=0;i<14;i++){const x=-3+r()*46,w=3+r()*4,h=9,y=top-1.4-r()*3;if(x+w>gx-5&&x<gx+5)continue;R(g,x,y,w,h,r()<.5?'#d8cebc':'#cac0aa');R(g,x-.3,y-.8,w+.6,.9,'#b07058');R(g,x+w-.8,y,.8,h,'#a09888')}
    /* through the gate: the water of the harbor */
    R(g,gx-3,HZ-2.4,6,2.4,'#a2bccc');R(g,gx-3,HZ-2.4,6,.5,'#d4e4ea');
    /* the two colonnades of the road: the roof and the shade of each run from its end on the square down to the gate */
    for(const s of[-1,1]){const xn=s<0?3:33,xg=gx+s*2.2;
      poly(g,[xn,top+1.6,xg,G0-4.4,xg,G0,xn,y0],'#6e6676');
      poly(g,[xn,top,xg,G0-5,xg,G0-4.4,xn,top+1.6],'#b46c4c');
      /* the fronts of the far columns catch the light along the road, short strokes that stop under the beam and above the floor */
      for(let k=1;k<4;k++){const f=k/4.6,[px,py]=ln(xn,top+2.4,xg,G0-4,f),[,qy]=ln(xn,y0-.6,xg,G0-.4,f);R(g,px-(s<0?0:.5),py,.5,qy-py,'rgba(236,228,208,.4)')}}
    /* the ends of the two colonnades on the square: a pier of stone under the end of the beam and the roof */
    for(const[x,w]of[[-9,12],[33,12]]){R(g,x,top+1.6,w,y0-top-1.6,'#d6caae');R(g,x,top+1.6,w,.5,'#efe6d0');R(g,x,top,w,1.6,'#b46c4c');R(g,x,top+4,w,.5,'#b0a48c');ao(g,x,y0-6,w,6,'b',.2,'#4a3a30')}
    /* the road itself, pale, and the harbor gate over its end */
    poly(g,[3,y0,33,y0,gx+2.2,G0,gx-2.2,G0],'#d8ceb6');
    R(g,gx-3,G0-6,6,6,'#ddd3b8');R(g,gx-3.4,G0-6.6,6.8,.8,'#c6ba9e');R(g,gx-3,G0-6,6,.5,'#f2ead4');R(g,gx+2.2,G0-6,.8,6,'#aca08c');
    arch(g,gx-1.2,G0-4.4,2.4,4.4,'#a8c0ce');R(g,gx-1.2,G0-1.6,2.4,1.6,'#b8ccd6');
    /* people: dots far down the road, small figures on the square */
    const C=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#e4d8bc','#4e5a6e','#a4503a','#6e5a3a'];
    for(let i=0;i<140;i++){const f=Math.pow(r(),.8),y=G0+(y0-G0)*f,a=gx-2+(3-gx+2)*f,b=gx+2+(33-gx-2)*f,x=a+.6+r()*(b-a-1.2);
      R(g,x,y-.6-2.2*f,.5,.5,'#4a3a30');R(g,x,y-.2-1.8*f,.5+.5*f,.4+1.8*f,C[(r()*C.length)|0])}
    const L=[];for(let i=0;i<14;i++)L.push([r()*42,y0+3+Math.pow(r(),.7)*24,r()<.6]);L.sort((a,b)=>a[1]-b[1]);
    for(const[x,y,side]of L){const h=49*(y-HZ)/64*.82;if(side)runnerColon(g,x,y,h,lookColon(r),1,.12+r()*.12,0);else backColon(g,x,y,h,lookColon(r),0)}})}
/* stageColon: the stage building of the theater, seen from outside: a long wall of dressed stone in two storeys under a cornice, small
   windows above, and below them five arched ways in. Its corner stands at the left, against the colonnade. No statue stands in it. */
function stageColon(g,r){const x0=150,top=24,FT=FTColon,C='#dacdb0',sc=40;
  ashlar(g,x0,top,480-x0,FT-top,C,r,{bw:17,bh:5.4,v:.07,t:.3});
  /* rain has left darker streaks down the wall from the cornice */
  for(let i=0;i<26;i++){const x=x0+4+r()*322,h=6+r()*20;g.fillStyle=lg(g,0,top+3,0,top+3+h,['rgba(110,96,80,.22)','rgba(110,96,80,0)']);g.fillRect(x,top+3,1+r()*2.4,h)}
  /* the cornice and the edge of the roof over it */
  R(g,x0-1,top-3,482-x0,3,'#b8664a');R(g,x0-1,top-3,482-x0,.6,'#d8906a');for(let i=x0;i<480;i+=3)R(g,i,top-2.6,.5,2.4,'rgba(90,40,24,.3)');
  R(g,x0-1.5,top,483-x0,2.6,tint(C,.12));R(g,x0-1.5,top,483-x0,.6,tint(C,.4));R(g,x0-1.5,top+2.6,483-x0,.8,tint(C,-.42));ao(g,x0,top+3.4,480-x0,4,'t',.3,'#3a3050');
  /* the string course between the storeys */
  R(g,x0,sc,480-x0,2,tint(C,.1));R(g,x0,sc,480-x0,.6,tint(C,.38));R(g,x0,sc+2,480-x0,.6,tint(C,-.4));ao(g,x0,sc+2.6,480-x0,3,'t',.22,'#3a3050');
  /* the windows of the upper storey, a larger one over each arch and a smaller one over each pier */
  for(let i=0;i<10;i++){const big=i%2===0,w=big?5:4,h=big?8:6,x=ARCColon[0]+i*31-w/2,y=sc-2-h;if(x>476)break;
    R(g,x-1,y-1.4,w+2,1.4,tint(C,.16));R(g,x,y,w,h,big?'#2a2228':'#4a4044');ao(g,x,y,w,2.4,'t',.5);R(g,x-1,y+h,w+2,1,tint(C,.2));R(g,x-1,y+h+1,w+2,.5,tint(C,-.36))}
  /* the arches */
  for(const ax of ARCColon)archColon(g,ax);
  /* the corner of the building at the left, in larger blocks */
  for(let y=top+2.6,k=0;y<FT;y+=5.4,k++){const w=k%2?7:11;R(g,x0,y,w,5,tint(C,(k%3)*.03+.04));R(g,x0,y,w,.5,tint(C,.3));R(g,x0+w-.5,y,.5,5,tint(C,-.2))}
  /* the base course along the foot of the wall, broken by the arches */
  R(g,x0,FT-4,480-x0,4,tint(C,-.06));R(g,x0,FT-4,480-x0,.6,tint(C,.3));for(const ax of ARCColon)R(g,ax-AWColon/2,FT-4.2,AWColon,4.2,'#3a2e28');
  /* grime at its foot, and the warmth of the light on the upper wall */
  ao(g,x0,FT-16,480-x0,16,'b',.2,'#5a4434');comp(g,'soft-light',.3,()=>R(g,x0,top,480-x0,30,'#fff0c8'))}
/* archColon: one arched way into the theater: a dark vault, the light of the day on its right-hand reveal and on its floor, and a ring of
   wedge-shaped stones round its head whose joints stop at the ring's edges */
function archColon(g,ax){const w=AWColon,x=ax-w/2,y=ATColon,FT=FTColon,rr=w/2,cy=y+rr;
  g.beginPath();g.arc(ax,cy,rr+3,Math.PI,0);g.lineTo(ax+rr,cy);g.arc(ax,cy,rr,0,Math.PI,true);g.closePath();g.fillStyle='#e2d6ba';g.fill();
  for(let k=1;k<9;k++){const a=Math.PI+k*Math.PI/9,c=Math.cos(a),s=Math.sin(a);stroke(g,[ax+c*(rr+.3),cy+s*(rr+.3),ax+c*(rr+2.7),cy+s*(rr+2.7)],'rgba(90,76,60,.5)',.5)}
  g.beginPath();g.arc(ax,cy,rr+3,Math.PI,0);g.strokeStyle='#a89a80';g.lineWidth=.5;g.stroke();
  arch(g,x,y,w,FT-y);g.fillStyle=lg(g,0,y,0,FT,['#141012','#211a1a','#342a26']);g.fill();
  clipTo(g,()=>arch(g,x,y,w,FT-y),()=>{poly(g,[x,FT,x+w,FT,ax+7,FT-9,ax-7,FT-9],'#3e322a');
    poly(g,[x+w-3,y+rr,x+w,y+rr,x+w,FT,x+w-3.6,FT-3],'#5e5042');ao(g,x,y,w,10,'t',.5)})}
/* colonnadeColon: the colonnade along the street, between the open square and the corner of the stage building: four columns under a deep
   beam and a tiled roof, and the shops behind them in its shade, shut in a hurry, all but one. Each column stands clear of the heads of the
   two who wait in front of it, and nothing runs behind the columns from one to the next. */
function colonnadeColon(g,r){const x0=40,x1=150,FT=FTColon,bt=36,bh=8,cols=[44,71,98,125],W='#b4a896';
  /* the back wall and the shops, in the shade of the roof */
  plaster(g,x0+1,bt,x1-x0-1,FT-bt,W,r,{patch:1,cracks:0,top:-.06,bot:-.22,brick:'#8a6a4a',t:.36});skipCracks14(r,2);
  {const q=rng(1461);for(const[x,y,n]of[[66,45,3],[118,46,4]])crack14(g,x,y,n,q)}
  for(const[bx,k]of[[57.5,0],[84.5,1],[111.5,0],[137.5,0]]){const w=13,x=bx-w/2,y=68;R(g,x-1.2,y-1.2,w+2.4,FT-y+1.2,tint(W,-.3));R(g,x-1.2,y-1.2,w+2.4,.5,tint(W,.2));
    if(k){R(g,x,y,w,FT-y,'#2a2224');ao(g,x,y,w,6,'t',.5);for(const[jx,c,h]of[[x+3,'#8a5a3a',6],[x+7.4,'#9a6a40',5],[x+10.4,'#7a4a30',4.4]])jarColon(g,jx,FT,h,c)}
    else planks14(g,x,y,w,FT-y,w/4,'#6a5038',r)}
  /* the shade under the roof, deepest at the top */
  comp(g,'multiply',.5,()=>R(g,x0,bt,x1-x0,FT-bt,'#8a88b4'));ao(g,x0,bt+bh,x1-x0,16,'t',.5,'#2a2440');
  /* the roof and the deep beam */
  poly(g,[x0-2,bt,x1+2,bt,x1,bt-7,x0,bt-7],'#b46a4a');for(let i=x0;i<x1;i+=3)stroke(g,[i,bt,i+.4,bt-7],'rgba(80,36,24,.3)',.5);R(g,x0-2,bt-.6,x1-x0+4,.8,'#d88a5c');
  R(g,x0-1.5,bt,x1-x0+1.5,bh,MBL);R(g,x0-1.5,bt,x1-x0+1.5,.6,tint(MBL,.3));R(g,x0-1.5,bt+3,x1-x0+1.5,.5,tint(MBL,-.2));R(g,x0-1.5,bt+bh-.6,x1-x0+1.5,.6,tint(MBL,-.34));
  /* the step the columns stand on */
  R(g,x0-1.5,FT,x1-x0+1.5,2.4,tint(MBL,-.04));R(g,x0-1.5,FT,x1-x0+1.5,.6,tint(MBL,.3));R(g,x0-1.5,FT+2.4,x1-x0+1.5,1.2,tint(MBL,-.4));
  for(const x of cols)columnColon(g,x,FT,FT-bt-bh,6.4,MBL)}
/* jarColon: a jar left in the open shop, its foot at x,y: a body that swells and narrows to a short neck, lit from the left; its mouth is
   a flat line, since a round one this small would come out as a plus sign */
function jarColon(g,x,y,h,c){const w=h*.36;poly(g,[x-w*.5,y,x+w*.5,y,x+w,y-h*.45,x+w*.7,y-h*.8,x+w*.32,y-h*.86,x+w*.32,y-h,x-w*.32,y-h,x-w*.32,y-h*.86,x-w*.7,y-h*.8,x-w,y-h*.45]);
  g.fillStyle=lg(g,x-w,0,x+w,0,[tint(c,.2),c,tint(c,-.45)]);g.fill();R(g,x-w*.32,y-h,w*.64,.5,tint(c,-.55))}
/* columnColon: one column of marble, its shaft narrowing a little towards the top, lit from the left, with a capital hardly wider than the
   shaft and a base hardly wider than its foot */
function columnColon(g,x,y,h,w,c){poly(g,[x-w/2,y,x+w/2,y,x+w*.42,y-h,x-w*.42,y-h]);g.fillStyle=lg(g,x-w/2,0,x+w/2,0,[tint(c,-.1),tint(c,.3),tint(c,.05),tint(c,-.4)]);g.fill();
  for(let i=1;i<4;i++)R(g,x-w/2+w*i/4,y-h+2,.5,h-3,'rgba(60,50,70,.14)');
  const ch=2.4;R(g,x-w*.42-.6,y-h,w*.84+1.2,ch,tint(c,-.02));R(g,x-w*.42-.6,y-h,w*.84+1.2,.5,tint(c,.3));R(g,x-w*.42-.6,y-h+ch-.5,w*.84+1.2,.5,tint(c,-.3));
  R(g,x-w/2-.5,y-1.6,w+1,1.6,tint(c,-.12));R(g,x-w/2-.5,y-1.6,w+1,.5,tint(c,.2))}
/* the people of the crowd: their clothes, hair and skin. lookColon picks one: a man in a tunic, some with a mantle over it, or a woman
   with her mantle drawn over her head. */
const GARColon=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#d8ccb0','#4e5a6e','#a4503a','#6e5a3a','#b98258','#8a8a6a','#6a4a5a','#c4b08a'],
  HAIRColon=['#2a201a','#3a2a1e','#1e1a18','#4a3626','#8a8478','#d0c6b0','#2a201a'],SKINColon=['#c08a62','#a8724e','#b47e58','#946a4a'];
function lookColon(r){const any=()=>GARColon[(r()*GARColon.length)|0],fem=r()<.16,g=any();
  return{g,hair:fem?tint(any(),-.08):HAIRColon[(r()*HAIRColon.length)|0],skin:SKINColon[(r()*SKINColon.length)|0],fem,mantle:!fem&&r()<.4?any():null,long:fem||r()<.25,belt:r()<.6}}
/* backColon: one of the crowd seen from behind, its feet at x,y, h tall, about five heads; lit from the left. Shoulders, the arms down at
   the sides, a belt at the waist, the hem; a mantle over the left shoulder, or a woman's mantle drawn over her head and shoulders.
   d (0 to 1): how deep it stands in the shade of an arch. The legs stand side by side and never cross. */
function backColon(g,x,y,h,o,d){const u=h/5,sh=c=>d?mix(c,'#1c1618',d):c,hem=y-(o.long?u*.4:u*1.25),sy=y-h+u*1.08,hw=u*.98,wy=y-u*2.45;
  /* legs and feet */
  if(hem<y-.4){R(g,x-u*.42,hem,u*.32,y-hem,sh(tint(o.skin,-.18)));R(g,x+u*.1,hem,u*.32,y-hem,sh(tint(o.skin,-.38)));R(g,x-u*.46,y-.6,u*.38,.6,sh('#3a2a1c'));R(g,x+u*.08,y-.6,u*.38,.6,sh('#2a1e16'))}
  /* the body: shoulders, waist and skirt; the arms hang at the sides, a shade apart from it */
  const body=[x-hw*.72,sy,x+hw*.72,sy,x+hw,sy+u*.32,x+hw*.86,wy,x+hw*.96,hem,x-hw*.96,hem,x-hw*.86,wy,x-hw,sy+u*.32];
  poly(g,body);g.fillStyle=lg(g,x-hw,0,x+hw,0,[sh(tint(o.g,.24)),sh(tint(o.g,.04)),sh(tint(o.g,-.3))]);g.fill();
  if(!o.mantle&&!o.fem){R(g,x-hw*.62,sy+u*.4,.5,wy-sy-u*.1,sh(tint(o.g,-.25)));R(g,x+hw*.58,sy+u*.4,.5,wy-sy-u*.1,sh(tint(o.g,-.48)));
    R(g,x-hw*.86,wy+u*.3,u*.28,u*.32,sh(tint(o.skin,-.04)));R(g,x+hw*.6,wy+u*.42,u*.26,u*.3,sh(tint(o.skin,-.34)))}
  if(o.belt&&!o.fem)R(g,x-hw*.86,wy,hw*1.72,.6,sh(tint(o.g,-.45)));
  if(o.mantle){poly(g,[x-hw*.72,sy,x-hw*.05,sy,x+hw*.96,hem-u*.5,x+hw*.96,hem,x-hw*.5,hem,x-hw*.96,wy+u*.2,x-hw,sy+u*.32],sh(o.mantle));
    poly(g,[x-hw*.72,sy,x-hw*.3,sy,x-hw*.95,sy+u*1.2,x-hw,sy+u*.32],sh(tint(o.mantle,.22)));stroke(g,[x-hw*.05,sy+.3,x+hw*.9,hem-u*.6],sh(tint(o.mantle,-.35)),.5)}
  /* the head, and the neck under it; or the mantle over head and shoulders */
  const hy=y-h+u*.55;
  if(o.fem){const my=y-u*1.7;poly(g,[x-u*.5,y-h+u*.3,x+u*.5,y-h+u*.3,x+hw*.94,sy+u*.5,x+hw*1.02,my,x-hw*1.02,my+.6,x-hw*.94,sy+u*.5]);g.fillStyle=lg(g,x-hw,0,x+hw,0,[sh(tint(o.hair,.2)),sh(o.hair),sh(tint(o.hair,-.3))]);g.fill();
    stroke(g,[x-hw*.2,sy+u*.6,x-hw*.3,my],sh(tint(o.hair,-.25)),.5);blobColon(g,x,hy,u*.5,u*.56,sh(o.hair));R(g,x-u*.46,hy-u*.25,u*.26,u*.7,sh(tint(o.hair,.22)));R(g,x+u*.26,hy-u*.1,u*.24,u*1.1,sh(tint(o.hair,-.3)))}
  else{R(g,x-u*.16,sy-u*.24,u*.32,u*.34,sh(tint(o.skin,-.22)));blobColon(g,x,hy,u*.44,u*.52,sh(o.hair));R(g,x-u*.4,hy-u*.2,u*.18,u*.32,sh(tint(o.hair,.25)));R(g,x+u*.36,hy,u*.12,u*.22,sh(tint(o.skin,-.15)))}}
/* crowdColon: the crowd at the foot of the stage building, pressing into the arches, as a list of [x, y, d, look] from the back to the
   front: deep in each arch the backs of those already in, dark (d: how deep they stand in the shade of the arch); at its mouth those
   pushing in; along the wall between, those making for the nearest arch; and a front row at the mouths. They stand about half the height
   of whoever stands in the street, as far back as they are (SColon). */
let CRColon=null;
const SColon=y=>49*(y-HZColon)/64*.84;
function crowdColon(){if(CRColon)return CRColon;const FT=FTColon,r=rng(1406),q=rng(1407),L=[],F=[],by=(a,b)=>a[1]-b[1];
  for(const ax of ARCColon){for(let i=0;i<6;i++)L.push([ax-11+r()*22,FT-7+r()*4,.6+r()*.25]);for(let i=0;i<6;i++)L.push([ax-13+r()*26,FT-2+r()*3.4,.3+r()*.2])}
  for(let k=0;k<ARCColon.length-1;k++){const a=ARCColon[k],b=ARCColon[k+1];for(let i=0;i<6;i++)L.push([a+15+r()*(b-a-30),FT+r()*3.4,0])}
  for(let i=0;i<5;i++)L.push([158+r()*26,FT+r()*3.4,0]);for(let i=0;i<3;i++)L.push([464+r()*18,FT+r()*3.4,0]);
  L.sort(by);for(const p of L)p.push(lookColon(r));
  for(const ax of ARCColon)for(let i=0;i<3;i++)F.push([ax-13+q()*26,FT+3.6+q()*1.4,0]);F.sort(by);for(const p of F)p.push(lookColon(q));
  return CRColon=L.concat(F).sort(by)}
/* throngColon: those of the crowd who stand between y0 and y1; or, with shadows, only their shadows on the paving */
function throngColon(g,y0,y1,shadows){for(const[x,y,d,o]of crowdColon())if(y>=y0&&y<y1){const h=SColon(y);
  if(!shadows)backColon(g,x,y,h,o,d);else if(d<.35)oval(g,x+h*.06,y-.2,h*.2,.8,'rgba(50,40,64,'+(.24*(1-d*2.5))+')')}}
/* runnerColon: one of those who hurry to the theater, seen from the side, its feet at x,y, h tall, facing dir. Its legs open and close from
   one point at the hip, as a pair of compasses does, and never cross; the near arm is bent, its hand no farther forward than the front of
   the body. ph: where it is in its stride (0 to 1, two steps); d: how far it has gone into the dark of an arch; amp: how far the legs
   open, .5 for a run (the default), less for a walk. */
function runnerColon(g,x,y,h,o,dir,ph,d,amp){amp=amp||.5;const u=h/5,sh=c=>d?mix(c,'#1c1618',d):c,s=Math.sin(ph*6.2832),open=Math.abs(s),lift=u*.44*amp*open,yy=y-lift,
  hipY=yy-u*2.1,lean=u*.64*amp,L=u*2.1/Math.cos(amp*open),th=amp*s,hem=yy-(o.long?u*.7:u*1.3),sy=yy-h+u*1.08,X=v=>x+dir*v;
  blobColon(g,x,y-.3,u*.9,.6,'rgba(40,30,40,'+(.25*(1-(d||0)))+')');
  /* the legs: the far one darker; each foot points the way it runs */
  for(const[a,c]of[[-th,tint(o.skin,-.42)],[th,tint(o.skin,-.16)]]){const fx=X(Math.sin(a)*L),fy=hipY+Math.cos(a)*L;
    poly(g,[X(-u*.16),hipY,X(u*.16),hipY,fx+dir*u*.14,fy,fx-dir*u*.14,fy],sh(c));R(g,Math.min(fx-dir*u*.14,fx+dir*u*.5),fy-.6,u*.64,.6,sh('#2a1e16'))}
  /* the body, leaning forward, and the skirt of the tunic over the hips */
  const bw=u*.62,body=[X(-bw*.55+lean),sy,X(bw*.6+lean),sy,X(bw*.98+lean*.8),sy+u*.45,X(bw*.86+lean*.4),hipY-u*.5,X(bw*1.12),hem,X(-bw*1.22),hem+u*.1,X(-bw*.86),hipY-u*.5,X(-bw*.96+lean*.8),sy+u*.45];
  poly(g,body,sh(o.g));poly(g,[X(-bw*.55+lean),sy,X(-bw*.1+lean),sy,X(-bw*.3+lean*.5),sy+u*1.4,X(-bw*.45),hem,X(-bw*1.22),hem+u*.1,X(-bw*.86),hipY-u*.5,X(-bw*.96+lean*.8),sy+u*.45],sh(tint(o.g,dir>0?-.2:.14)));
  if(o.belt&&!o.fem&&!o.mantle)R(g,Math.min(X(-bw*.95+lean*.3),X(bw*1.02+lean*.3)),hipY-u*.62,bw*1.97,.6,sh(tint(o.g,-.45)));
  if(o.mantle)poly(g,[X(-bw+lean),sy,X(bw*.2+lean),sy,X(bw*1.05),hem-u*.2,X(-bw*1.15),hem],sh(o.mantle));
  /* the near arm, bent at the elbow, the hand at the front of the body */
  const sw=s*u*.16,ex=X(lean*.4+sw),ey=hipY-u*.72,hx=X(bw*.72+lean*.55),hy=hipY-u*.95;
  if(!o.fem){stroke(g,[X(lean*.8),sy+u*.3,ex,ey,hx,hy],sh(o.mantle?tint(o.mantle,-.15):tint(o.g,-.15)),u*.34);R(g,hx-u*.15,hy-u*.15,u*.3,u*.3,sh(o.skin))}
  /* the head: hair behind, the face in front; a woman's mantle over it */
  const hx2=X(lean*1.1+u*.05),hy2=yy-h+u*.55;
  if(o.fem){blobColon(g,hx2,hy2,u*.5,u*.56,sh(o.hair));poly(g,[X(lean-u*.55),hy2,X(lean+u*.3),hy2+u*.3,X(-bw*1.05),hem+u*.3,X(-bw*1.2),hem-u*.5],sh(o.hair));R(g,Math.min(X(lean*1.1+u*.08),X(lean*1.1+u*.38)),hy2-u*.2,u*.3,u*.5,sh(o.skin))}
  else{R(g,Math.min(X(lean*.9-u*.12),X(lean*.9+u*.12)),hy2+u*.3,u*.24,u*.4,sh(tint(o.skin,-.2)));blobColon(g,hx2,hy2,u*.44,u*.52,sh(o.skin));
    poly(g,[X(lean*1.1-u*.46),hy2+u*.18,X(lean*1.1-u*.42),hy2-u*.3,X(lean*1.1-u*.05),hy2-u*.54,X(lean*1.1+u*.34),hy2-u*.34,X(lean*1.1+u*.1),hy2-u*.16,X(lean*1.1-u*.1),hy2+u*.24],sh(o.hair));
    R(g,Math.min(X(lean*1.1-u*.06),X(lean*1.1+u*.1)),hy2-u*.02,u*.16,u*.2,sh(tint(o.skin,-.25)));R(g,Math.min(X(lean*1.1+u*.42),X(lean*1.1+u*.58)),hy2,u*.16,u*.14,sh(tint(o.skin,-.1)))}}
/* the moving parts: people hurry to the arches from the square and from the far end of the street, running all at one pace; where they
   reach the press at an arch they can run no more, and walk in behind those already pushing at it, into the dark of the arch, with the
   front row of the crowd laid over them. Each comes back round after a while out of sight. Their step follows the ground they cover. */
const RUNColon=[[-1,0,0],[-1,1,3.1],[-1,2,6.6],[-1,0,9.4],[-1,3,12.2],[1,4,1.6],[1,3,5.2],[1,4,8.8],[-1,1,15],[1,4,13.6]],
  ROWSColon=[[95.5,98],[98,100.5],[100.5,200]];
let FRColon=null,LKColon=null;
function colonDraw(g,t){if(!FRColon){FRColon=ROWSColon.map(([a,b])=>bake(480,g2=>throngColon(g2,a,b),12));const r=rng(1408);LKColon=RUNColon.map(()=>lookColon(r))}
  const RV=54,WV=20,FT=FTColon,S=SColon,CYC=16.5;
  RUNColon.forEach(([side,k,off],i)=>{const ax=ARCColon[k],x0=side<0?-12:492,y0=FT+8+(i%3),bx=ax+side*48,h0=S(y0),
      p=[[x0,y0],[bx,y0],[ax,FT-1],[ax+side*4,FT-9]],seg=[];for(let j=1;j<p.length;j++)seg.push(Math.hypot(p[j][0]-p[j-1][0],p[j][1]-p[j-1][1]));
    /* running up to the press, then walking into the arch */
    const run=seg[0]+seg[1],tt=(t/1000+off)%CYC,dist=tt<run/RV?tt*RV:run+(tt-run/RV)*WV;if(dist>run+seg[2])return;
    const walking=dist>run,ph=walking?run/(h0*1.5)+(dist-run)/(h0*.9):dist/(h0*1.5);
    let j=0,rem=dist;while(j<seg.length-1&&rem>seg[j]){rem-=seg[j];j++}
    const f=rem/seg[j],x=p[j][0]+(p[j+1][0]-p[j][0])*f,y=p[j][1]+(p[j+1][1]-p[j][1])*f;
    depth(y,()=>runnerColon(g,x,y,S(y),LKColon[i],-side,ph%1,j===2?f*.96:0,walking?.3:.5))});
  ROWSColon.forEach(([a,b],i)=>depth(Math.min(b,FT+6)-.01,()=>g.drawImage(FRColon[i],0,0,480,144)))}
/* Inside the door: the entrance room, its back wall the front of the house, which looks out on the court. At the right the door, its bolt
   at the edge where it opens, a hatch in it; at the left a shuttered window, and a doorway into the house behind a curtain. It is day, but
   the shutters are closed, and the room has only what comes in through their slits, through the hatch and under the door. */
const LEAFDoor={x:236,y:42.6,w:36,h:61.4},HATCHDoor={x:248.6,y:58.2,w:10.8,h:8.6},WINDoor={x:70,y:40,w:22,h:26};
/* the slits of light: in the hatch between its boards, in the window between the boards of its two shutters, widest where the two
   meet: [x, top, bottom, how much light] */
const SLITSDoor={hatch:[[252.2,59,66,.8],[255.8,59,66,.8]],win:[[75.5,40.6,65.4,.45],[81,40.4,65.6,1],[86.5,40.6,65.4,.45]]};
function paintDoor(g){const r=rng(1407),W='#d2c09a';
  /* the ceiling: two beams along the room, and the reeds laid over them */
  {const q=rng(1441);R(g,0,0,320,15,'#3e3026');tex(g,'vert',.28,0,0,320,15,'overlay',.5);
  for(const[y,h]of[[0,4.6],[7.6,3]]){board14(g,0,y,320,h,'#7a5a3a',q);R(g,0,y+h-.7,320,.7,'#a8845a');
    /* the reeds beside each beam lie in its shade, in two soft steps */
    ao(g,0,y+h,320,2.4,'t',.5,'#1a1410');ao(g,0,y+h,320,1,'t',.3,'#1a1410');if(y)ao(g,0,y-1.6,320,1.6,'b',.3,'#1a1410')}}
  /* the back wall, plastered, with its cracks and the brick showing high up or low down, where no head comes; the beam it carries */
  plaster(g,0,14.6,320,89.4,W,r,{patch:0,cracks:0,t:.3});for(const p of[[40,30,8,5],[196,26,9,5],[120,98,8,4]])patchDoor(g,...p,'#a8845a',r);
  for(const[x,y,n]of[[24,16,6],[136,16,5],[222,15,4],[316,56,4],[54,18,5]])crack14(g,x,y,n,r);board14(g,0,12.2,320,2.6,'#5e4428',rng(1442));ao(g,0,14.8,320,12,'t',.44,'#2a2030');
  /* the doorway into the house, at the left, with its curtain drawn to one side */
  R(g,4,42,32,62,tint(W,-.18));R(g,7,45,26,59,'#241c1a');g.fillStyle=lg(g,7,0,33,0,['rgba(90,70,56,0)','rgba(120,96,72,.35)']);g.fillRect(7,45,26,59);
  ao(g,7,45,26,8,'t',.6);board14(g,4,41,32,3.4,'#5e4428',rng(1443));
  {const c='#7a4a36';poly(g,[7,44.4,16.6,44.4,15.4,60,17.4,80,16,104,7,104],c);
    for(const[x,w]of[[8.6,1.6],[11.6,1.4],[14.2,1.2]])stroke(g,[x,45,x-.4+w,72,x+.4,103.6],tint(c,-.3),w*.6);
    for(const x of[10,13])stroke(g,[x,45,x+.6,72,x+1,103.6],tint(c,.18),.5);ao(g,7,44.4,10,6,'t',.4)}
  /* the window, shut, in the thickness of the wall; daylight comes through the slits between the boards of its shutters */
  shutDoor(g,WINDoor.x,WINDoor.y,WINDoor.w,WINDoor.h,W,4,'#4e3826');
  /* a shelf on two brackets at its ends, with a jug, two bowls turned over one on the other, and a pot with a cloth over its mouth */
  shelfDoor(g,104,52,34);
  /* the lamp in its niche, cold, and the soot of many evenings above it */
  pool(g,157,34,7,12,'#2a2020',.4,'multiply');
  clipTo(g,()=>arch(g,150,40,14,12),()=>{g.fillStyle=lg(g,0,40,0,52,['#6a6056','#8a7c6a','#a08e78']);g.fillRect(150,40,14,12);ao(g,150,40,5,12,'l',.5);ao(g,150,40,14,5,'t',.5)});
  R(g,149,51.4,16,1.4,tint(W,.12));R(g,149,51.4,16,.5,tint(W,.36));
  /* the lamp: a closed bowl of clay with a nozzle at the front, the hole in its top, and a handle at the back */
  poly(g,[151.8,51.4,151.6,49.6,153.4,48.4,157.4,48,160.6,48.6,162.6,48.4,163.2,49.4,161.4,51.4],'#8a7458');R(g,153,48.2,6,.6,'#b8a07c');
  R(g,156.4,48.4,1.2,.6,'#3a2c20');R(g,162,48.6,1,.8,'#2a2018');R(g,152,50.8,9.4,.6,'#5a4a38');
  /* the door to the court */
  doorInDoor(g,r);
  /* a peg by the door with a cloak on it. The cloak hangs by its neck: two shoulders where it is gathered, then its folds down to an uneven hem */
  {const c='#6a5a44';poly(g,[286.6,51.6,290.6,51.6,294,54,296.4,58,297,70,298,84,295,86.4,291,85.6,287,87,283,85.8,280.4,86.6,281,70,282.2,57.6,284,53.6],c);
    R(g,287.4,49.6,2.4,2.4,'#4a3420');R(g,287.4,49.6,2.4,.6,'#7a5a3a');
    for(const[x0,x1,x2]of[[285,284,284.4],[288.6,288.4,288],[292.2,293,293.6]])poly(g,[x0-.4,56,x0+.4,56,x1+.5,70,x2+.5,85.6,x2-.5,85.6,x1-.5,70],tint(c,-.3));
    for(const[x0,x1]of[[286.6,286],[290.4,290.8],[294.6,295.6]])poly(g,[x0-.3,57,x0+.3,57,x1+.3,84,x1-.3,84],tint(c,.16))}
  /* the floor: beaten earth, worn paler from the curtain to the door */
  g.fillStyle=lg(g,0,104,0,144,['#9a8462','#ad9874','#b8a47e']);g.fillRect(0,104,320,40);tex(g,'mott',.34,0,104,320,40,'overlay',1);
  pool(g,150,114,120,8,'#d8c8a4',.2,'source-over');
  for(let i=0;i<120;i++){const k=r(),y=104.5+k*39;R(g,r()*320,y,.5+k*1.6,.5+k*.4,r()<.5?'rgba(70,52,36,.28)':'rgba(255,236,200,.18)')}
  ao(g,0,104,320,6,'t',.45,'#2a2030');ao(g,0,96,320,8,'b',.3,'#3a2c28');
  /* the bench beside the door, and a jar with its lid on in the corner, both standing out on the floor */
  benchDoor(g,178,96,48);shadow14(g,314,107.2,6.6,1.3,.6);vessel(g,312,107,5.6,15,'#9a5a36','pithos',{noShadow:1});oval(g,312,92.4,4.2,1.3,'#5e4428');R(g,308,91.4,8,.5,'#8a6a44');
  /* the light of the room: dim, brighter by the window and by the door, darker toward the ceiling and the corners */
  lightmap(g,320,'#665c62',l=>{pool(l,170,92,210,70,'#aa9e9a',.7);pool(l,81,58,34,30,'#e0d2b8',.55);pool(l,80,116,44,12,'#dccbaa',.55);
    pool(l,254,106,50,16,'#e8d6b4',.7);pool(l,254,80,30,34,'#c8b8a0',.4);pool(l,160,128,150,20,'#b0a498',.4);
    l.fillStyle=lg(l,0,0,0,30,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,320,30);
    l.fillStyle=lg(l,0,124,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.35)']);l.fillRect(0,124,320,20);
    /* the day from the window falls on its sill and the wall under it, long and low; the door's light on its own reveal */
    pool(l,81,69,20,4,'#ead8b8',.32,'source-over');pool(l,LEAFDoor.x+LEAFDoor.w/2,101,26,4,'#e8d6b4',.3,'source-over');
    /* the shade of the room: in its two far corners, along the foot of the wall, under the shelf and in the doorway into the house */
    ao(l,0,0,44,144,'l',.3,'#1a141c');ao(l,276,0,44,144,'r',.26,'#1a141c');ao(l,0,90,320,14,'b',.22,'#1a141c');
    ao(l,104,54.2,34,6,'t',.22,'#1a141c');ao(l,7,45,26,59,'r',.2,'#1a141c')});
  /* what comes in from the day, brighter than anything in the room: the slits, and the line under the door */
  for(const k of['hatch','win'])for(const[x,y0,y1,a]of SLITSDoor[k]){comp(g,'screen',.95*a,()=>R(g,x-.35,y0,.7,y1-y0,'#ffecc0'));pool(g,x,(y0+y1)/2,2.4,(y1-y0)/2+2,'#ffdca0',.2*a)}
  comp(g,'screen',.9,()=>R(g,LEAFDoor.x+.6,103.4,LEAFDoor.w-1.2,.6,'#ffe8b8'));pool(g,254,104.6,20,2.4,'#ffdca0',.3)}
/* shutDoor: a small window in its frame, shut with shutters of upright boards; n boards. Every board stays inside the frame. */
function shutDoor(g,x,y,w,h,c,n,wd){windowArt(g,x,y,w,h,c,{});const pw=w/(n||Math.max(2,Math.round(w/3)));
  clipTo(g,()=>{g.beginPath();g.rect(x,y,w,h)},()=>{planks14(g,x,y,w,h,pw,wd||'#7a5632',rng(x*7+y));ao(g,x,y,w,Math.min(4,h*.4),'t',.55);ao(g,x,y,Math.min(3,w*.3),h,'l',.4)})}
/* shelfDoor: a plank on the wall at y, held by a bracket under each end, and what stands on it. The jug's handle is solid, with no hole
   in it, and no rim is seen from above. */
function shelfDoor(g,x,y,w){const c='#7a5a38';
  for(const bx of[x+1,x+w-5])poly(g,[bx,y+2,bx+4,y+2,bx+(bx>x+w/2?4:0),y+7],tint(c,-.25));
  for(const[d,a]of[[3.4,.08],[2.4,.1],[1.4,.12]])R(g,x+.4,y+2.2,w-.8,d,rgba('#281e28',a));board14(g,x,y,w,2.2,c,rng(1444));R(g,x,y,w,.5,tint(c,.3));
  /* the jug */
  poly(g,[x+5,y,x+4.2,y-2.6,x+4.6,y-5,x+5.8,y-6.6,x+5.6,y-8.4,x+7.8,y-8.4,x+7.6,y-6.6,x+8.8,y-5,x+9.2,y-2.6,x+8.4,y],'#9a6a44');
  poly(g,[x+8.8,y-7.6,x+10.4,y-7,x+10.6,y-4.4,x+9.2,y-3.6,x+9.6,y-5.2,x+9.4,y-6.6],'#8a5a38');R(g,x+5,y-5,1,4,'#c08a5e');R(g,x+5.6,y-8.6,2.2,.5,'#c08a5e');
  /* the bowls, one turned over the other */
  for(const[k,bw,bh]of[[0,6,2.2],[1,5,2]]){const bx=x+15+k*.5,by=y-k*2.2;poly(g,[bx,by,bx+.6,by-bh*.7,bx+bw/2,by-bh,bx+bw-.6,by-bh*.7,bx+bw,by],k?'#b08260':'#a07454');R(g,bx+.8,by-bh*.8,1.6,.5,'#d0a27c')}
  /* the pot, with its cloth */
  poly(g,[x+25,y,x+24,y-3,x+24.6,y-5.4,x+30.4,y-5.4,x+31,y-3,x+30,y],'#8a4e30');poly(g,[x+24,y-5.2,x+25,y-7.4,x+30,y-7.4,x+31,y-5.2,x+30.6,y-4.2,x+24.4,y-4.2],'#c8b894');R(g,x+24.6,y-4.8,6.2,.5,'#9a8a6a')}
/* boardsDoor: upright boards with a quiet grain (planks14), cut off at their own edges */
function boardsDoor(g,x,y,w,h,pw,c,r){planks14(g,x,y,w,h,pw,c,r)}
/* patchDoor: a place where the plaster has fallen and the mud brick shows, as plaster() paints them, but set where no head comes to
   stand before it: high on the wall, or low behind the legs */
function patchDoor(g,px,py,pw,ph,b,r){const pts=[];for(let a=0;a<9;a++){const t=a/9*6.2832,q=.6+r()*.4;pts.push(px+Math.cos(t)*pw*q,py+Math.sin(t)*ph*q)}
  clipTo(g,()=>poly(g,pts),()=>{R(g,px-pw,py-ph,pw*2,ph*2,tint(b,-.35));
    for(let j=0,row=0;j<ph*2;j+=2.5,row++)for(let i=-(row%2)*3;i<pw*2;i+=6)R(g,px-pw+i,py-ph+j,5.5,2,tint(b,(r()-.5)*.25))});
  stroke(g,pts.concat(pts.slice(0,2)),rgba('#000000',.25),.5)}
/* doorInDoor: the door seen from inside. A frame of wood; three wide planks; in the middle plank a hatch of three boards with a knob, and
   daylight in the slits between them. The bolt is short: a bar that lies on the left plank only and slides into a block on the jamb, its
   handle turned down at its end. No band, strap or joint runs across a plank, and the bar crosses none of the joints between them. */
function doorInDoor(g,r){const{x,y,w,h}=LEAFDoor,F='#7a5a3a',D='#5a3e26';
  /* the frame: jambs and a lintel, their faces lit from the room's side */
  {const q=rng(1446);board14(g,x-6,y-4.6,w+12,4.6,F,q);R(g,x-6,y-.6,w+12,.6,tint(F,-.4));
  for(const jx of[x-6,x+w]){board14(g,jx,y,6,h,F,q,1);R(g,jx,y,6,.5,tint(F,-.3))}}R(g,x-1.4,y,1.4,h,tint(F,-.18));R(g,x+w,y,1.2,h,tint(F,.12));
  /* the leaf */
  const P=[[x,x+11],[x+11,x+25],[x+25,x+w]];for(const[a,b]of P)boardsDoor(g,a,y,b-a,h,b-a,D,r);
  ao(g,x,y,w,5,'t',.5);ao(g,x+w-5,y,5,h,'r',.3);
  /* the hatch */
  {const{x:hx,y:hy,w:hw,h:hh}=HATCHDoor;R(g,hx-.6,hy-.6,hw+1.2,hh+1.2,'#2e2014');boardsDoor(g,hx,hy,hw,hh,hw/3,'#6e5034',r);R(g,hx,hy,hw,.5,'#8e6c48');
    R(g,hx+hw/2-.7,hy+hh*.42,1.4,1.4,'#3a2818');R(g,hx+hw/2-.7,hy+hh*.42,1.4,.5,'#9a7a54')}
  /* the bolt: its block on the jamb, the bar, the handle turned down, and the bar's shadow on the plank */
  const by=83.4;R(g,x-5.4,by-1.6,6,5.2,'#5e4428');R(g,x-5.4,by-1.6,6,.6,'#8a6a46');R(g,x-.6,by-1,.8,3.6,'#2a1c12');
  R(g,x+.2,by+2,8.4,.8,'rgba(20,12,8,.45)');wood(g,x,by,8.6,2,'#9a7650');R(g,x+7.2,by+2,1.4,3,'#8a6644');R(g,x+7.2,by+4.6,1.4,.5,'#5a4028');R(g,x+7.6,by+2,.5,3,'#b08a5e')}
/* benchDoor: a bench of wood, its seat a thick plank on two slab legs set in from its ends; its shadow on the wall and the floor */
function benchDoor(g,x,y,w){const c='#8a6a44';
  const q=rng(1445);
  /* its shadow on the wall behind, in three soft steps, and on the floor */
  for(const[d,a]of[[0,.1],[1,.1],[2,.1]])R(g,x+2+d,y+4,w-2-d*2,6-d*1.4,rgba('#281e28',a));shadow14(g,x+w/2+1,y+14.2,w/2,1.6,.62);
  for(const lx of[x+3,x+w-7]){board14(g,lx,y+4.4,4,9.6,tint(c,-.2),q,1);R(g,lx,y+4.4,4,.6,tint(c,-.45))}
  board14(g,x,y,w,1.8,tint(c,.14),q);R(g,x,y,w,.5,tint(c,.4));plank14(g,x,y+1.8,w,2.6,tint(c,-.14),q);R(g,x,y+4,w,.4,tint(c,-.5))}
/* doorDraw: the light of the day on the floor, through the slits of the hatch and of the shutters. It falls a little in front of them at
   first; while they wait (G.dl14 from 0 to 1) the sun goes lower and round, and the light lengthens and moves across the floor to the
   left. It is drawn on the floor before anybody, so it is never behind a head. */
function doorDraw(g){const k=G.dl14||0,ax=-.1-1.9*k,az=.22+.36*k,F=104,at=(x,y)=>[x+(F-y)*ax,F+(F-y)*az];
  for(const[S,o]of[[SLITSDoor.hatch,HATCHDoor],[SLITSDoor.win,WINDoor]]){
    /* the whole opening, faintly, where the light lands: what the edges of the boards let by, and the air */
    const q=[...at(o.x,o.y+o.h),...at(o.x+o.w,o.y+o.h),...at(o.x+o.w,o.y),...at(o.x,o.y)];if(Math.max(q[0],q[2],q[4],q[6])<-2)continue;
    comp(g,'screen',.24,()=>poly(g,q,'#ffd498'));
    /* and a blade of sunlight for each slit, soft at its edges */
    for(const[x,y0,y1,a]of S){const[x0,y0f]=at(x,y1),[x1,y1f]=at(x,y0),w=.6+(F-y0)*.012;
      comp(g,'screen',.4*a,()=>poly(g,[x0-1.6,y0f,x0+1.6,y0f,x1+w+1.4,y1f,x1-w-1.4,y1f],'#ffdca0'));
      comp(g,'screen',.95*a,()=>poly(g,[x0-.6,y0f,x0+.6,y0f,x1+w,y1f,x1-w,y1f],'#fff2d0'))}}}
/* The close view of the sealing: the top of a column's base, seen from above and in front, in the shade of the colonnade. The light
   comes from the open side, from the square on the left and in front: warm where the sunlit paving throws it back, cool under the roof.
   The base is a block of pale marble, wider than the picture. At the back on the left the foot of its column stands on it: a lower and
   an upper moulding round it like cushions, a hollow between them, and the smooth shaft going up out of the picture. The veins of the
   marble run one way, and each stops where it comes to another. At the bottom the front of the block shows under its worn edge.
   paintSealBack is the stone in its light; sealDraw lays the tablet and the hand on the stone (stoneSeal) before the light. */
function paintSealBack(g){stoneSeal(g);lightSeal(g)}
function stoneSeal(g){const r=rng(1409),FY=SEAL.FY;
  /* the top of the block: cool at the back, warmer towards the front and the left */
  g.fillStyle=lg(g,0,0,0,FY,[[0,'#958f9c'],[.35,'#b4aca6'],[.7,'#cdc3b2'],[1,'#dcd1be']]);g.fillRect(0,0,320,FY);
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['#ffd49a','#eadccb','#a4a6c4']);g.fillRect(0,0,320,FY)});
  /* broad soft patches where the stone is a shade warmer or greyer; a dull sheen where it has been worn smooth */
  for(let i=0;i<16;i++){const warm=r()<.5;pool(g,r()*340-10,8+r()*(FY-16),24+r()*50,8+r()*16,warm?'#f4e2c0':'#8a88a4',warm?.22:.14,warm?'soft-light':'multiply')}
  pool(g,118,98,130,26,'#fff6e6',.12,'screen');
  tex(g,'blotch',.08,0,0,320,FY,'soft-light',.9);tex(g,'mott',.14,0,0,320,FY,'overlay',.45);tex(g,'grain',.1,0,0,320,FY,'overlay',.5);
  veinsSeal(g,r,FY);
  /* pits, and the glint of the crystals of the marble */
  for(let i=0;i<170;i++){const x=r()*320,y=r()*(FY-1);R(g,x,y,.5,.5,'rgba(96,88,90,.42)');if(r()<.6)R(g,x,y+.5,.5,.5,'rgba(255,250,236,.35)')}
  for(let i=0;i<70;i++)R(g,r()*320,r()*(FY-1),.5,.5,'rgba(255,252,244,.55)');
  /* the shade the column throws to the right and back, and its foot */
  comp(g,'multiply',.55,()=>{g.fillStyle=rg(g,10,0,150,['#8a88a8','#b4b2c8','#ffffff']);g.fillRect(0,0,220,130)});
  columnSeal(g);
  /* the front of the block: its edge worn round and lit along the top, a moulding under it, and the face in deeper shade */
  g.fillStyle=lg(g,0,FY-3,0,FY,['rgba(255,246,226,0)','rgba(255,246,226,.4)']);g.fillRect(0,FY-3,320,3);
  R(g,0,FY,320,1,'#e6dccb');g.fillStyle=lg(g,0,FY+1,0,FY+6,['#cfc6b8','#a8a0a0','#86808c']);g.fillRect(0,FY+1,320,5);
  R(g,0,FY+6,320,.5,'#5c5866');g.fillStyle=lg(g,0,FY+6.5,0,144,['#a49c9a','#8a8490']);g.fillRect(0,FY+6.5,320,144-FY-6.5);
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['#ffcf90','#e0d8cc','#9aa0c8']);g.fillRect(0,FY,320,144-FY)});
  tex(g,'mott',.4,0,FY,320,144-FY,'overlay',1);tex(g,'grain',.12,0,FY,320,144-FY,'overlay',.5);
  /* the edge is worn: its light comes and goes along it */
  for(let x=0;x<320;){const w=4+r()*18;R(g,x,FY,w,.5,`rgba(${r()<.5?'120,112,118':'255,250,238'},${.12+r()*.22})`);x+=w}}
/* veinsSeal: the grey veins of the marble, all running from lower left to upper right; a vein ends where it would meet another */
function veinsSeal(g,r,FY){const pts=[];
  for(let k=0;k<8;k++){let x=r()*380-40,y=20+r()*(FY-10),a=-.45+(r()-.5)*.4;const p=[x,y],w=r();
    for(let s=0;s<70;s++){a=clamp(a+(r()-.5)*.4,-.9,-.08);x+=Math.cos(a)*2;y+=Math.sin(a)*2;if(y<0||x>330)break;
      if(pts.some(q=>Math.abs(q[0]-x)<3.5&&Math.abs(q[1]-y)<3.5))break;p.push(x,y)}
    for(let i=0;i<p.length;i+=2)pts.push([p[i],p[i+1]]);
    if(p.length>8){stroke(g,p,'rgba(140,136,150,.08)',3);stroke(g,p,'rgba(140,136,150,.08)',1.4);for(let i=0;i+5<p.length;i+=4)stroke(g,p.slice(i,i+6),`rgba(124,118,128,${.08+w*.1+r()*.12})`,.5)}}}
/* columnSeal: the foot of the column, turned round its centre (SEAL.col: x and y where its axis meets the top of the base, the radius
   of the shaft). Seen from above and in front, every round course is an oval, flattened by the slant of the view (K), and stands higher
   in the picture the higher it lies (Z). The courses, from the base up: the lower cushion, the hollow, the upper cushion, a narrow band,
   and the shaft, which flares a little at its foot. A course is shaded by the way it faces: up and out towards the open side is light,
   the underside of a cushion and the hollow are dark. The shaft is lit from the front and the left, and its far side is in shade. */
function columnSeal(g){const[cx,cy,rs]=SEAL.col,K=.55,Z=.83,C='#d6cec0',D='#666176';
  const course=(rr,z,c)=>oval(g,cx,cy-z*Z,rr,rr*K,c),tone=(nr,nz)=>mix(D,C,clamp(.22+.68*(nr*.55+nz*.8),0,.9));
  for(let i=6;i>0;i--)comp(g,'multiply',.09,()=>course(rs+16+i*1.6,-.5,'#56546c'));
  /* the lower cushion */
  const t=6,c1=rs+10;for(let i=0;i<=20;i++){const f=Math.PI*i/20;course(c1+t*Math.sin(f),t-t*Math.cos(f),tone(Math.sin(f),-Math.cos(f)))}
  /* the hollow */
  for(let i=0;i<=10;i++){const f=i/10;course(c1-1-3.2*Math.sin(f*Math.PI)-f*.6,2*t+f*5,mix('#5a5664','#958e98',.12+.6*f*f))}
  /* the upper cushion */
  const t2=4,c2=rs+5,z2=2*t+5+t2;for(let i=0;i<=16;i++){const f=Math.PI*i/16;course(c2+t2*Math.sin(f),z2-t2*Math.cos(f),tone(Math.sin(f),-Math.cos(f)))}
  /* the band, and the flare of the shaft above it */
  course(rs+3,z2+t2+.6,tone(.2,.9));for(let i=0;i<=6;i++){const f=i/6;course(rs+2.4*(1-f)*(1-f),z2+t2+1.2+f*5,tone(1-f*.8,.6))}
  /* the shaft */
  const fy=cy-(z2+t2+6.2)*Z,shaft=()=>{g.beginPath();g.ellipse(cx,fy,rs,rs*K,0,0,Math.PI);g.lineTo(cx-rs,-20);g.lineTo(cx+rs,-20);g.closePath()};
  clipTo(g,shaft,()=>{const st=[];for(let i=0;i<=10;i++){const q=-Math.PI/2+Math.PI*i/10;st.push([i/10,mix(D,C,clamp(.3+.75*(-.5*Math.sin(q)+.86*Math.cos(q)),0,1))])}
    g.fillStyle=lg(g,cx-rs,0,cx+rs,0,st);g.fillRect(cx-rs,-20,rs*2,fy+rs*K+22);
    tex(g,'mott',.2,cx-rs,-20,rs*2,fy+rs*K+22,'overlay',.6);tex(g,'vert',.1,cx-rs,-20,rs*2,fy+rs*K+22,'multiply',.8);
    R(g,cx+rs-1.6,-20,1.2,fy+20,'rgba(200,190,200,.25)')});
  /* the marble of the mouldings, mottled like the rest */
  clipTo(g,()=>course(c1+t+.5,t,null),()=>{tex(g,'mott',.3,0,0,200,140,'overlay',1);tex(g,'grain',.12,0,0,200,140,'overlay',.5)});
  /* the light from the open side: stronger on the left of the foot, falling off round to the right */
  comp(g,'soft-light',.35,()=>{clipTo(g,()=>{course(c1+t+.5,t,null);g.rect(cx-rs,-20,rs*2,fy+20)},()=>{g.fillStyle=lg(g,cx-rs,0,cx+c1+t,0,['#fff0d8','#fff0d8','#9898bc']);g.fillRect(-60,-20,200,140)})});
  comp(g,'multiply',.5,()=>{clipTo(g,()=>{course(c1+t+.5,t,null)},()=>{g.fillStyle=lg(g,cx+10,0,cx+c1+t,0,['#ffffff','#b0aac4']);g.fillRect(-60,-20,200,140)})})}

/* ---- the moving parts ---- */
/* marketDraw: the donkey at the stall at the left, standing still; the glow of the kiln, which breathes; the anvil before the kiln, a
   block of iron on a short log, where the smith at the kiln works; and in the morning his hammer, held in the hand that hangs over the
   anvil: it rises and falls on the silver in quick strokes with pauses between them, as the sound of it (hammer14) does, though not in
   step with it. The hammer is drawn only while that smith stands at the anvil, facing it. */
function marketDraw(g,t){const busy=!F.plea,[ax,ay]=ANVIL_Market,s=ACT.smith14c,
    work=busy&&s&&s.room==='market14'&&Math.abs(s.x-381.5)<1&&Math.abs(s.y-ay)<1&&!s.walk&&facing(s)===-1;
  beast(g,99,114,1,0,0,lightAt('market14',99,114));
  if(busy){const k=.5+.5*Math.sin(t/230)*Math.sin(t/570);pool(g,358,97,10,5,'#ff9040',.16+.14*k)}
  depth(ay-.2,()=>anvilMarket(g,ax,ay,busy));
  if(s)s.ges=0;
  if(work){const[st,hit]=hammerStep(t);s.ges=6+st;depth(ay+.05,()=>hammerMarket(g,s.x,s.y,st,hit))}}
/* anvilMarket: the anvil at x,y (its foot): a short log on end and on it a block of iron, its face lit, with a small piece of silver on it
   in the morning; in the late afternoon the hammer lies on it. */
function anvilMarket(g,x,y,busy){shadow14(g,x+.6,y-.3,4.6,1.1,.5,'#1e1a32');
  wood(g,x-3.6,y-13.6,7.2,13.6,'#6a4e2c',1);R(g,x-3.6,y-13.6,7.2,1,'#a8845a');R(g,x+2.4,y-13.6,1.2,13.6,'#4a3420');R(g,x-3.6,y-1,7.2,1,'#3a2a18');
  R(g,x-3,y-17,6,3.4,'#3a3a40');R(g,x-3,y-17,6,.7,'#a4a4ae');R(g,x-3,y-17,1.2,3.4,'#5e5e68');R(g,x+2,y-16.3,1,2.7,'#26262c');
  if(busy){R(g,x-1.8,y-17.6,3.6,.6,'#e8ecf0');R(g,x-1.2,y-18,2.6,.4,'#b8c0c8')}
  else{R(g,x-2.8,y-18.6,2.8,1.6,'#44444c');R(g,x-2.8,y-18.6,2.8,.5,'#8a8a96');wood(g,x,y-17.9,5.4,.9,'#7a5a34')}}
/* hammerStep, hammerMarket: the smith's forearm and hammer over the anvil (he stands at x,y, facing left). His forearm pivots at the elbow
   through three poses (s.ges 6 down, 7 midway, 8 raised), and the hammer handle comes out of the front of his fist toward the anvil with
   the head at its end and nothing of the handle beyond it: an L, never a cross. Each stroke: down on the silver, up in two steps, down
   again; a few strokes, then a pause. */
const HAMMER_Market=[[-8.6,-22.1,-.64],[-10,-27.7,.18],[-10,-31.2,.62]];
function hammerStep(t){const P=1900,c=Math.floor(t/P),n=2+hash(c*7+3)%4,u=t%P,i=Math.floor(u/210),w=u%210;
  return[i<n?(w<50?0:w<85?1:w<165?2:1):(u-n*210<140?1:0),i<n&&w<50]}
function hammerMarket(g,x,y,st,hit){const[dx,dy,a]=HAMMER_Market[st],
  hx=x+dx,hy=y+dy,L=5.2,ux=-Math.cos(a),uy=-Math.sin(a),ex=hx+ux*L,ey=hy+uy*L,nx=uy,ny=-ux,f=1.8,b=.6,hw=.85;
  stroke(g,[hx+ux*.3,hy+uy*.3,ex,ey],'#6a4a2c',1);stroke(g,[hx+ux*.3-nx*.3,hy+uy*.3-ny*.3,ex-nx*.3,ey-ny*.3],'#a8845a',.4);
  poly(g,[ex+ux*hw-nx*b,ey+uy*hw-ny*b,ex+ux*hw+nx*f,ey+uy*hw+ny*f,ex-ux*hw+nx*f,ey-uy*hw+ny*f,ex-ux*hw-nx*b,ey-uy*hw-ny*b],'#44444c');
  poly(g,[ex+ux*hw-nx*b,ey+uy*hw-ny*b,ex+ux*hw+nx*f,ey+uy*hw+ny*f,ex+ux*.2+nx*f,ey+uy*.2+ny*f,ex+ux*.2-nx*b,ey+uy*.2-ny*b],'#8a8a96');
  if(hit)R(g,ex+nx*f-.8,ey+ny*f-.2,1.6,.6,'#ffffff')}
/* the tablet in the close view, in its states. A: Aristokles's leaf, B: Philokrates's, each a frame of boxwood round dark wax with the
   writing in the wax; C: the closed tablet, where Philokrates's leaf has been laid on Aristokles's. The two holes of a leaf are in its
   frame along one long edge: Aristokles's along the near edge; Philokrates's along the far edge until his leaf is turned round, and then
   along the near edge too, with his writing upside down. Laid one on the other, writing to writing, the holes meet. The cord comes up
   out of the two holes and runs to the middle of the near edge, where it goes round the edge and is knotted; the clay sits on the knot,
   and the two seals are pressed into the clay. Nothing is tied across the face of the tablet. Holes and seals are small squares.
   FY: where the top of the base ends and its front begins. col: where the column's axis meets the top of the base, and the radius of
   its shaft. Each state is put together over the stone once and dithered like a backdrop (fr), so that the tablet has the same grain
   of colour as the stone. */
const SEAL={A:[60,62,84,56],B:[176,62,84,56],C:[118,62,84,56],FY:129,col:[6,34,44],raw:null,fr:{}};
function sealDraw(g,t){const k=['turned','closed','tied','clayed','sealed'].map(f=>F[f]?1:0).join('');let c=SEAL.fr[k];
  if(!c){if(!SEAL.raw){const[rc,rg2]=mk(320*HR,144*HR);rg2.scale(HR,HR);stoneSeal(rg2);SEAL.raw=rc}
    c=SEAL.fr[k]=bake(320,b=>{b.drawImage(SEAL.raw,0,0,320,144);tabletSeal(b);lightSeal(b)},12)}
  g.drawImage(c,0,0,320,144)}
/* lightSeal: the light over the whole view: from the open side, warm, falling off to the right and to the back, where the roof keeps it off */
function lightSeal(g){comp(g,'multiply',.46,()=>{g.fillStyle=rg(g,130,112,250,['#ffffff','#f4eee8','#9e98b8']);g.fillRect(0,0,320,144)});
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,144,300,0,['#ffd49c','rgba(255,212,156,0)']);g.fillRect(0,0,320,144)})}
/* tabletSeal: the leaves or the tablet as the story stands, and Aristokles's hand while it waits for the clay */
function tabletSeal(g){
  if(!F.closed){leaf(g,...SEAL.A,1401,0,0);leaf(g,...SEAL.B,1402,F.turned,!F.turned)}
  else{closedSeal(g);const[x,y,w,h]=SEAL.C,kx=x+w/2,ky=y+h;
    if(F.tied)cordSeal(g,x,y,w,h,kx,ky);
    if(F.clayed)claySeal(g,kx,ky,F.sealed)}
  if(!F.sealed)handSeal(g)}
/* dropSeal: the soft shade under a thing that lies on the stone, falling a little to the right and back, away from the light */
function dropSeal(g,x,y,w,h){for(const[d,a]of[[3,.1],[2,.14],[1,.2]])comp(g,'multiply',1,()=>R(g,x+d*.7,y-d*.25,w+d*.3,h+d*.5,rgba('#5e5a78',a)))}
/* grainSeal: boxwood, its grain running the long way: fine lines a little lighter or darker than the wood, which all wave alike and so
   never cross, and here and there a pore */
function grainSeal(g,x,y,w,h,c,seed){const r=rng(seed),f=.045+r()*.03,p=r()*6,A=.5+r()*.5;
  inRect(g,hp(x),hp(y),hp(w),hp(h),()=>{R(g,x,y,w,h,c);
    for(let yy=y-2;yy<y+h+2;yy+=.5+r()*1.2){const col=r()<.55?rgba(tint(c,-.32),.14+r()*.2):rgba(tint(c,.24),.1+r()*.18),pts=[];
      for(let xx=x-1;xx<=x+w+2;xx+=1.5)pts.push(xx,yy+A*Math.sin(xx*f+p)+.35*Math.sin(xx*f*2.6+p*1.7));stroke(g,pts,col,.5)}
    for(let i=0;i<w*h/50;i++)R(g,x+r()*w,y+r()*h,1+r()*1.5,.5,rgba(tint(c,-.42),.3))})}
/* leaf: one leaf lying open with its wax up: the board's near edge shows under it; the frame round the wax is a little higher than the
   wax, so the frame's far inner side shows and the frame on the left throws a thin shade onto the wax. The writing (seed) is upside
   down when the leaf has been turned round (rot); the holes are along the far edge (far) or the near one. */
function leaf(g,x,y,w,h,seed,rot,far){const W='#a8875c',b=4.5,px=x+b,py=y+b,pw=w-2*b,ph=h-2*b;
  dropSeal(g,x,y,w,h+2.5);
  grainSeal(g,x,y+h,w,2.5,tint(W,-.4),seed+7);R(g,x,y+h+2,w,.5,tint(W,-.58));
  grainSeal(g,x,y,w,h,W,seed);R(g,x,y,w,.5,tint(W,.3));R(g,x,y,.5,h,tint(W,.18));R(g,x+w-.5,y,.5,h,tint(W,-.22));R(g,x,y+h-.5,w,.5,tint(W,.14));
  R(g,px,py,pw,1,tint(W,-.14));
  g.fillStyle=lg(g,px,py,px+pw,py+ph,['#2c1e12','#38281a','#4a3422']);g.fillRect(px,py+1,pw,ph-1);
  tex(g,'mott',.22,px,py+1,pw,ph-1,'overlay',1);
  R(g,px,py+1,.5,ph-1,'#120c08');R(g,px,py+1,pw,.5,'#170f09');R(g,px+pw-.5,py+1,.5,ph-1,'#4a3a2a');
  pool(g,px+pw*.34,py+ph*.36,pw*.5,ph*.3,'#f0e0c8',.1,'screen');
  writeSeal(g,px,py+1,pw,ph-1,seed,rot);
  for(const k of[.3,.7])holeSeal(g,x+w*k,far?y+2.25:y+h-2.25,W)}
/* holeSeal: a hole through the frame, a small square, its far inner side catching a little light */
function holeSeal(g,x,y,W){R(g,x-.75,y-.75,1.5,1.5,'#130c07');R(g,x-.75,y-.75,1.5,.5,tint(W,-.5))}
/* writeSeal: lines of writing scratched into the wax, too small and too quick to be read; where the stylus has gone the wax is pale,
   with the shade of the groove under it on the side away from the light, whichever way the leaf lies. Each word is one stroke that runs
   on from left to right and never back over itself; the lines stop short of the frame at both ends, unevenly, and are not ruled. The
   last line, apart and to the right, is the name. */
function writeSeal(g,x,y,w,h,seed,rot){const r=rng(seed);g.save();if(rot){g.translate(x+w,y+h);g.rotate(Math.PI)}else g.translate(x,y);
  for(const[by,kind]of[[7,0],[14,0],[21,0],[28,1],[37.5,2]]){let xx=kind===2?w*.5+r()*4:2.5+r()*2;const end=kind===2?w-4-r()*3:kind?w*(.42+r()*.2):w-3-r()*10;
    while(xx<end-3){const len=Math.min(end-xx,(kind===2?8:3)+r()*9),p=[xx,by-r()*.8];let up=1,X=xx;
      while(X<xx+len){X+=.5+r()*1.1;const q=r();p.push(X,up?by-(q<.12?3.4:q<.3?.8:1.2+r()*1.1):by+(q<.07?1.6:r()*.3));up=q<.3?up:!up}
      stroke(g,p.map((v,i)=>i%2?v+(rot?-.5:.5):v),'rgba(12,7,4,.45)',.5);stroke(g,p,'rgba(206,180,132,.42)',.5);xx=X+1.8+r()*2}}
  g.restore()}
/* closedSeal: the closed tablet: the back of Philokrates's leaf, plain wood, is up, with his two holes along the near edge; under it the
   near edges of both leaves show, one over the other */
function closedSeal(g){const[x,y,w,h]=SEAL.C,W='#a8875c';
  dropSeal(g,x,y,w,h+5);
  grainSeal(g,x,y+h+2.5,w,2.5,tint(W,-.46),1408);R(g,x,y+h+4.5,w,.5,tint(W,-.62));
  grainSeal(g,x,y+h,w,2.5,tint(W,-.36),1409);R(g,x,y+h+2,w,.5,tint(W,-.56));
  grainSeal(g,x,y,w,h,tint(W,.03),1410);R(g,x,y,w,.5,tint(W,.3));R(g,x,y,.5,h,tint(W,.18));R(g,x+w-.5,y,.5,h,tint(W,-.22));R(g,x,y+h-.5,w,.5,tint(W,.14));
  pool(g,x+w*.5,y+h*.5,w*.42,h*.36,'#6a4a2a',.14,'multiply');pool(g,x+w*.3,y+h*.32,w*.3,h*.22,'#fff2d8',.1,'screen');
  for(const k of[.3,.7])holeSeal(g,x+w*k,y+h-2.25,W)}
/* cordSeal: the cord of flax: up out of each hole, along to the middle of the near edge, round the edge, and knotted there: a lump
   of twisted cord, its turns all slanting one way. The two ends lie along the edge to the right. */
function cordSeal(g,x,y,w,h,kx,ky){const C='#d2c6a0',S='#7e7258',hy=y+h-2.25,cord=(p,wd)=>{stroke(g,p.map((v,i)=>i%2?v+.45:v),S,wd+.2);stroke(g,p,C,wd)};
  cord([x+w*.3,hy,kx-6,ky-1.3,kx-2,ky-.4],.8);cord([x+w*.7,hy,kx+6,ky-1.3,kx+2,ky-.4],.8);
  cord([kx+1.5,ky+1.4,kx+5,ky+2.1,kx+9,ky+3.2],.7);cord([kx+1.5,ky+2.2,kx+4.5,ky+3.2,kx+7.6,ky+4.3],.7);
  oval(g,kx+.4,ky+1.5,3.1,2.3,S);oval(g,kx,ky+1,2.8,2,C);
  clipTo(g,()=>oval(g,kx,ky+1,2.8,2),()=>{for(const d of[-1.6,0,1.6])stroke(g,[kx+d-1,ky+2.8,kx+d+1,ky-.8],rgba(S,.8),.5);R(g,kx-2,ky-.6,2,.5,'#f2e8cc')})}
/* claySeal: the lump of clay pressed down over the knot, in front of the edge; sealed, it is flattened, and the two seals are side by
   side in it, each a small square sunk into the clay with its far side lit and its left side in shade, and a mark of its own */
function claySeal(g,kx,ky,sealed){const C='#94654e',r=rng(1411),blob=(cx,cy,rx,ry)=>{const p=[];for(let i=0;i<14;i++){const a=i/14*6.2832,k=.88+r()*.2;p.push(cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k)}return p};
  const rx=sealed?8.4:6.8,ry=sealed?4.2:4.8,cy=ky+(sealed?.9:.4),out=blob(kx,cy,rx,ry);
  comp(g,'multiply',1,()=>{poly(g,out.map((v,i)=>i%2?v+1.2:v+1),'rgba(70,52,60,.4)')});
  poly(g,out,tint(C,-.32));
  clipTo(g,()=>poly(g,out),()=>{g.fillStyle=lg(g,kx-rx,cy-ry,kx+rx*.6,cy+ry,[tint(C,.3),C,C,tint(C,-.3)]);g.fillRect(kx-rx-1,cy-ry-1,rx*2+2,ry*2+2);
    R(g,kx-rx,cy+ry-1,rx*2,1,rgba(tint(C,-.4),.6));tex(g,'mott',.3,kx-rx-1,cy-ry-1,rx*2+2,ry*2+2,'overlay',.5)});
  if(!sealed){oval(g,kx-2,cy-1.6,2.4,1.1,tint(C,.4));R(g,kx-3,cy-2.2,1,.5,tint(C,.6));return}
  for(const[sx,sy,m]of[[kx-5.6,cy-2.2,0],[kx+1,cy-1.8,1]]){R(g,sx,sy+3.5,4,.5,tint(C,.24));R(g,sx,sy,4,3.5,tint(C,-.1));R(g,sx,sy,4,.5,tint(C,.3));R(g,sx,sy+.5,.5,3,tint(C,-.42));
    if(m)R(g,sx+1.5,sy+1.5,1,1,tint(C,-.36));else stroke(g,[sx+1.2,sy+2.8,sx+2.8,sy+1.2],tint(C,-.4),.5)}}
/* handSeal: Aristokles's left hand, the back of it up, lying on the stone beside the tablet, the size a hand is beside it: it reaches in
   from the front-right, out of the fold of his mantle, which is draped round his forearm, and the fingers point away from us. The silhouette,
   finger angles, narrow spacing (ring and middle close together, little and index softly apart), knuckle slope, dorsal tendons, deep curved
   thumb web, and 3/4-turned thumbnail follow the maintainer's reference. Each finger tapers naturally from its knuckle through its two joints
   to a rounded pad, with an almond nail, soft cuticle fold, pale free edge and delicate joint wrinkles that stop short of the edges. On the
   fourth finger's first bone is his gold signet ring, curved round the finger with a cushion bezel and a dark red carnelian stone cut with
   the slanting mark of his seal. Light comes from the front-left: left edges and the central dorsum catch warm light, right edges and the
   interdigital hollows fall into shade, and the hand casts a soft shadow to the right on the marble. Drawn in the 800x534 reference frame
   and turned and scaled onto the stone by HANDSeal. */
/* HANDSeal: screen point of the wrist centre (238, 434 in reference units), rotation angle, scale, and vertical foreshortening */
const HANDSeal=[293,119,-.84,.15,.88];
function handSeal(g){const S='#d4a37c',Lt='#ebc6a4',Hi='#f7dec6',Dk='#8e573d',Sh='#623828',Rd='#c47058',Cr='#8c4e3c',N='#e3bda6',M='#7a2a3a',[px,py,A,Z,K]=HANDSeal;
  g.save();g.translate(px,py);g.scale(1,K);g.rotate(A);g.scale(Z,Z);g.translate(-238,-434);
  const eo=(x,y,rx,ry,rot,c)=>{g.beginPath();g.ellipse(x,y,rx,ry,rot,0,6.2832);g.fillStyle=c;g.fill()};
  /* soft radial elliptical glow/shade (no hard ellipse edges on smooth skin planes) */
  const soft=(x,y,rx,ry,rot,c,a)=>{g.save();g.translate(x,y);g.rotate(rot);g.scale(1,ry/rx);
    g.fillStyle=rg(g,0,0,rx,[rgba(c,a),rgba(c,a*.45),rgba(c,0)]);g.beginPath();g.arc(0,0,rx,0,6.2832);g.fill();g.restore()};
  /* smooth Catmull-Rom spline through flat [x,y,...] points */
  const spline=(p,closed)=>{const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
    g.beginPath();g.moveTo(p[0],p[1]);
    for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);
      g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
    if(closed)g.closePath()};
  const sline=(p,c,w)=>{spline(p,0);g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke()};
  /* continuous outer silhouette of the left hand and wrist from the reference (clockwise from lower-left forearm) */
  const OUT=[76,534,120,480,164,424,190,386,192,344,204,304,224,266,248,230,266,204,
    284,174,301,146,320,118,338,96,351,86,363,89,368,102,356,126,338,152,320,182,307,208,
    308,214,319,204,341,178,366,148,392,118,420,89,442,68,460,66,472,76,465,92,448,116,426,144,400,176,375,204,
    372,210,383,204,408,174,434,140,458,108,485,76,500,65,514,70,517,85,502,110,480,144,456,180,430,216,
    417,236,427,234,454,208,480,178,506,148,533,127,546,122,557,130,556,145,539,170,514,202,486,234,460,266,444,292,
    436,326,436,355,443,367,456,365,482,345,514,326,545,315,563,318,570,329,560,346,538,365,508,385,476,408,
    442,436,400,458,356,469,320,472,294,490,264,516,240,536];
  /* finger axis helper along [K, PIP, DIP, Tip]: at(t,s) gives the point at fraction t (0..1) and offset s to its right,
     with unit tangent and local width for cylindrical shading, joints, wrinkles and nails */
  const mkF=(pts,w,nail,tend)=>{const seg=[];let tot=0;
    for(let i=0;i<pts.length-1;i++){const dx=pts[i+1][0]-pts[i][0],dy=pts[i+1][1]-pts[i][1],l=Math.hypot(dx,dy);seg.push({a:pts[i],b:pts[i+1],dx:dx/l,dy:dy/l,l,t0:tot});tot+=l}
    const at=(t,s)=>{const d=clamp(t,0,1)*tot;let q=seg[seg.length-1];for(const e of seg)if(d<=e.t0+e.l){q=e;break}
      const u=(d-q.t0)/q.l,x=q.a[0]+(q.b[0]-q.a[0])*u,y=q.a[1]+(q.b[1]-q.a[1])*u,nx=-q.dy,ny=q.dx;return[x+nx*(s||0),y+ny*(s||0)]};
    const wd=t=>w*(1-.2*clamp(t,0,1)),ang=t=>{const d=clamp(t,0,1)*tot;let q=seg[seg.length-1];for(const e of seg)if(d<=e.t0+e.l){q=e;break}return Math.atan2(q.dy,q.dx)};
    return{pts,K:pts[0],PIP:pts[1],DIP:pts[2],Tip:pts[3],w,wd,at,ang,tP:seg[0].l/tot,tD:(seg[0].l+seg[1].l)/tot,nail,tend}};
  const FG=[
    mkF([[282,224],[318,158],[340,124],[358,96]],34,[350,102,10,7.5,-.92],[218,372,250,304,280,234]),
    mkF([[332,220],[388,150],[426,110],[458,76]],38,[451,83,11.5,8.6,-.84],[238,384,286,308,330,228]),
    mkF([[378,240],[442,158],[476,114],[505,77]],40,[498,84,12,9.2,-.90],[260,394,320,318,374,246]),
    mkF([[424,268],[486,198],[518,162],[548,134]],39,[540,141,11.5,8.6,-.84],[282,400,352,334,420,272])],
    TH=mkF([[426,396],[486,368],[528,344],[564,326]],46,null,null);
  /* shaded longitudinal band along a finger between fractional widths a and b */
  const band=(f,t0,t1,a,b,st)=>{const p=[],q=[];for(let i=0;i<=14;i++){const t=t0+(t1-t0)*i/14,w=f.wd(t);p.push(...f.at(t,a*w));q.unshift(...f.at(t,b*w))}
    for(let i=0;i<q.length;i+=2)p.push(q[i],q[i+1]);poly(g,p);g.fillStyle=lg(g,...f.at(t0,0),...f.at(t1,0),st);g.fill()};
  /* delicate curved skin wrinkles over a joint, stopping well inside the finger edges */
  const wrinkles=(f,tc,n,span,al)=>{for(let i=0;i<n;i++){const tt=tc+(i-(n-1)/2)*.038,hw=f.wd(tt)*span*(i===(n-1)/2|0?.48:.36),p=[];
    for(let s=-1;s<=1.001;s+=.25)p.push(...f.at(tt+(1-s*s)*.015,s*hw-f.wd(tt)*.03));sline(p,rgba(Cr,al),2)}};
  /* almond fingernail set neatly inside the fingertip pad: soft rosy cuticle fold, warm translucent nail plate, gentle pale edge */
  const nail=([cx,cy,rx,ry,rot])=>{g.save();g.translate(cx,cy);g.rotate(rot);
    eo(-rx*.32,0,rx*.74,ry*1.08,0,rgba(Rd,.24));
    g.beginPath();g.ellipse(0,0,rx,ry,0,0,6.2832);g.fillStyle=N;g.fill();
    clipTo(g,()=>{g.beginPath();g.ellipse(0,0,rx,ry,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-ry,0,ry,['#f2d8c6',N,tint(N,-.2)]);g.fillRect(-rx,-ry,rx*2,ry*2);
      eo(rx*.58,0,rx*.46,ry*.9,0,rgba('#f6e4d2',.32));
      eo(-rx*.66,0,rx*.44,ry*.82,0,rgba(Rd,.2))});
    g.beginPath();g.ellipse(0,0,rx,ry,0,Math.PI*.45,Math.PI*1.55);g.strokeStyle=rgba(Cr,.26);g.lineWidth=1.4;g.stroke();g.restore()};
  const handPath=()=>spline(OUT,1);
  /* soft shadow cast onto the marble to the right, plus a gentle contact occlusion under the edges */
  comp(g,'multiply',1,()=>{g.save();g.translate(2,4);handPath();g.fillStyle=rgba('#4e4860',.13);g.fill();g.restore()});
  for(const[d,a]of[[3.6,.07],[2.2,.11],[1.1,.16],[.45,.14]])comp(g,'multiply',1,()=>{
    const sx=d*.72,sy=d*.34/K;g.save();g.translate((sx*Math.cos(A)+sy*Math.sin(A))/Z,(sy*Math.cos(A)-sx*Math.sin(A))/Z);
    handPath();g.fillStyle=rgba('#504c68',a);g.fill();g.restore()});
  handPath();g.fillStyle=S;g.fill();
  clipTo(g,handPath,()=>{
    /* main warm front-left light across the hand, with soft warm-umber shading along the far ulnar edge, right flank and wrist */
    g.fillStyle=lg(g,210,150,480,470,[rgba(Lt,.5),rgba(Lt,.14),rgba(Dk,0),rgba(Dk,.38)]);g.fillRect(60,50,540,500);
    g.fillStyle=lg(g,184,270,316,320,[rgba(Dk,.28),rgba(Dk,0)]);g.fillRect(160,180,200,260);
    /* broad smooth sunlit central-radial dome on the back of the hand (soft radial gradients, no hard edges) */
    soft(366,334,116,136,.58,Hi,.46);soft(404,298,82,90,.5,Lt,.36);soft(334,296,74,88,.5,Lt,.26);
    /* subtle skin mottle and warm rosy flush across the knuckle ridge */
    tex(g,'mott',.22,60,50,540,500,'overlay',3.2);
    soft(368,246,142,66,.36,Rd,.22);
    /* subtle, soft dorsal extensor tendons converging from all four knuckles toward the wrist (feathered two-pass strokes) */
    for(let i=0;i<4;i++){const t=FG[i].tend,sh=[t[0]+9,t[1]+5,t[2]+10,t[3]+5,t[4]+8,t[5]+4],w0=i===0?12:i===3?13:15,al=i===0?.042:i===3?.054:.058;
      sline(sh,rgba(Dk,al*.55),w0*1.6);sline(sh,rgba(Dk,al*.65),w0*.85);
      sline(t,rgba(Hi,al*.55),w0*1.5);sline(t,rgba(Hi,al*.7),w0*.75)}
    /* soft wrist/ulna modeling and slight hollow beside the index metacarpal; delicate thumb-web crease */
    sline([184,386,216,356,244,320],rgba(Hi,.11),16);
    soft(428,342,34,54,.2,Dk,.16);
    sline([443,367,433,357,427,344],rgba(Cr,.26),2.1);
    /* knuckles: soft rosy domes lit on the upper-left, with shallow hollows between neighbouring knuckles */
    for(let i=0;i<3;i++){const a=FG[i].K,b=FG[i+1].K;soft((a[0]+b[0])/2-2,(a[1]+b[1])/2+10,16,22,.45,Dk,.14)}
    for(const f of FG){const[x,y]=f.K;soft(x,y,26,20,.55,Rd,.18);soft(x-4,y-3,18,14,.55,Hi,.28)}
    /* soft ambient occlusion in the finger webs */
    for(const[wx,wy]of[[308,214],[372,210],[417,236]])soft(wx,wy,17,20,.5,Sh,.32);
    /* each finger: bright warm top-left cylinder, clean right-edge shadow, subtle joint swells & wrinkles, rosy tip, almond nail */
    for(const f of FG){
      band(f,.06,1,.22,.64,[rgba(Dk,.12),rgba(Dk,.38),rgba(Dk,.48)]);
      band(f,.06,.92,-.46,.04,[rgba(Lt,.22),rgba(Hi,.42),rgba(Lt,.22)]);
      band(f,.14,.98,-.64,-.44,[rgba(Dk,.08),rgba(Dk,.18)]);
      for(const[tc,rx,ry,n,sp,al]of[[f.tP,22,18,3,.48,.22],[f.tD,18,14,2,.4,.15]]){
        const[jx,jy]=f.at(tc,-2);soft(jx,jy,rx,ry,f.ang(tc),Rd,.22);soft(jx-3,jy-2,rx*.7,ry*.62,f.ang(tc),Hi,.3);wrinkles(f,tc,n,sp,al)}
      const[tx,ty]=f.Tip;soft(tx,ty,22,18,f.ang(1),Rd,.2);nail(f.nail)}
    /* thumb: warm sunlit upper-left shaft, softly shaded lower/thenar edge, IP joint, and 3/4-profile thumbnail on its outer-right edge */
    band(TH,.05,1,.2,.62,[rgba(Dk,.16),rgba(Dk,.44),rgba(Dk,.48)]);
    band(TH,.1,.92,-.46,.04,[rgba(Lt,.24),rgba(Hi,.44),rgba(Lt,.22)]);
    {const[jx,jy]=TH.DIP;soft(jx,jy,22,18,TH.ang(TH.tD),Rd,.18);wrinkles(TH,TH.tD,2,.38,.16)}
    /* 3/4 thumbnail tucked along the outer-right tip edge, leaving warm sunlit thumb skin along the upper-left edge */
    {const tn=[548,335,558,325,568,324,568,334,558,345,550,346];
      sline([547,334,549,343,557,345],rgba(Rd,.34),4);
      spline(tn,1);g.fillStyle=N;g.fill();
      clipTo(g,()=>spline(tn,1),()=>{g.fillStyle=lg(g,548,324,568,344,['#f0d4c0',N,tint(N,-.22)]);g.fillRect(544,319,30,32);
        eo(563,328,7,4.5,-.4,rgba('#f6e6d6',.34))});
      sline([548,335,550,343,557,345],rgba(Cr,.28),1.4)}
    /* soft shadow cast onto the wrist where it emerges from the draped mantle */
    sline([156,412,188,426,222,446,256,464,294,484],rgba(Sh,.34),24);
    sline([156,412,188,426,222,446,256,464,294,484],rgba(Sh,.26),12)});
  /* Aristokles's gold signet ring on the fourth finger's proximal phalanx: curved hoop wrapping the cylinder of the finger,
     oval cushion bezel on top, dark red carnelian intaglio stone cut with the single slanting mark of his seal */
  {const f=FG[1],tc=f.tP*.56,[rx,ry]=f.at(tc,0),a=f.ang(tc),hw=f.wd(tc)*.53,bl=14,bw=hw*1.02;
    /* tight contact shadow on the finger skin under/right of the gold hoop */
    g.save();g.translate(rx,ry);g.rotate(a);
    comp(g,'multiply',1,()=>{g.beginPath();g.ellipse(-2,4,bl*1.04,bw*1.06,0,0,6.2832);g.fillStyle=rgba(Sh,.44);g.fill()});
    /* curved gold ring body: narrower where the hoop wraps the finger edges, swelling smoothly into the cushion bezel on top */
    const hoop=()=>{g.beginPath();g.moveTo(-bl*.64,-bw);g.quadraticCurveTo(0,-bw*1.06,bl*.64,-bw);
      g.quadraticCurveTo(bl*1.1,-bw*.4,bl*1.1,0);g.quadraticCurveTo(bl*1.1,bw*.4,bl*.64,bw);
      g.quadraticCurveTo(0,bw*1.06,-bl*.64,bw);g.quadraticCurveTo(-bl*1.1,bw*.4,-bl*1.1,0);
      g.quadraticCurveTo(-bl*1.1,-bw*.4,-bl*.64,-bw);g.closePath()};
    hoop();g.fillStyle=lg(g,0,-bw,0,bw,[[0,'#c49430'],[.2,'#ffe894'],[.44,'#d8a638'],[.74,'#885814'],[.92,'#54340a'],[1,'#845a1e']]);g.fill();
    /* crisp gold bezel rim highlight */
    g.beginPath();g.ellipse(0,0,bl*.86,bw*.74,0,0,6.2832);g.strokeStyle=rgba('#fff2b8',.58);g.lineWidth=1.8;g.stroke();
    /* recessed setting and cushion-oval dark red carnelian stone */
    const sl=bl*.64,sh=bw*.56;
    g.beginPath();g.ellipse(0,0,sl+2,sh+2,0,0,6.2832);g.fillStyle='#5c3a0e';g.fill();
    g.beginPath();g.ellipse(0,0,sl,sh,0,0,6.2832);g.fillStyle=lg(g,-sl,-sh,sl,sh,['#c43e28','#8e2214','#52100a']);g.fill();
    eo(-sl*.32,-sh*.32,sl*.38,sh*.32,-.3,rgba('#f4aa8e',.62));
    /* single slanting intaglio seal mark matching Aristokles's impression in claySeal (no cross) */
    sline([-sl*.42,sh*.36,sl*.42,-sh*.36],'#3e0c08',2.8);
    sline([-sl*.36,sh*.44,sl*.48,-sh*.28],rgba('#d6684a',.65),1.3);
    g.restore()}
  /* Aristokles's draped crimson mantle round his forearm, snugly framing the wrist with smooth curved hem and soft wool folds */
  {const hem=[156,422,184,430,220,448,256,466,288,486,294,496],fd=[-0.64,0.77];
    const mSmooth=()=>{const sl=[...hem,274,520,294+fd[0]*240,496+fd[1]*240,148+fd[0]*240,426+fd[1]*240,136,448];spline(sl,1)};
    comp(g,'multiply',.18,()=>{g.save();g.translate(14,10);mSmooth();g.fillStyle='#4a4460';g.fill();g.restore()});
    mSmooth();g.fillStyle=M;g.fill();
    clipTo(g,mSmooth,()=>{
      /* cylindrical light across the wrapped mantle: lit left, deep crimson-plum right */
      g.fillStyle=lg(g,136,416,300,506,[tint(M,.28),tint(M,.1),M,tint(M,-.38)]);g.fillRect(-40,380,380,320);
      /* two soft, feathered diagonal wool drapery folds (wide soft halo + deeper crease, never hard stripes) */
      for(const[p,c,w,al]of[
        [[186,434,162,486,118,552,66,612],tint(M,-.48),44,.22],
        [[186,434,162,486,118,552,66,612],tint(M,-.5),22,.24],
        [[204,444,182,496,142,560,92,620],tint(M,.3),32,.2],
        [[252,470,224,526,186,586,142,648],tint(M,-.48),48,.24],
        [[252,470,224,526,186,586,142,648],tint(M,-.52),24,.26],
        [[270,480,244,536,208,598,166,658],tint(M,.2),28,.16]])sline(p,rgba(c,al),w);
      tex(g,'mott',.36,-40,380,380,320,'overlay',3.2);
      /* soft rolled hem catchlight and subtle inner fold shade */
      sline(hem.slice(0,-2),rgba(tint(M,.32),.44),6);
      sline(hem.slice(0,-2).map((v,i)=>i%2?v+6:v-4),rgba(tint(M,-.44),.34),4.5)})}
  g.restore()}

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
  /* water shadow and subtle harbor ripples lapping along the hull */
  poly(g,hull.map((v,i)=>i%2?v-1:v+2.5),'rgba(12,22,32,.38)');
  stroke(g,[cx,y0-1.5,x0-1.5,y0+26,x0-1.5,y1-18,cx-6.5,y1+1],'rgba(196,222,228,.28)',.7);
  poly(g,hull,'#5a3a24');
  const deck=[cx,y0+5,x1-2.5,y0+27,x1-2.5,y1-19,cx+5,y1-2.5,cx-5,y1-2.5,x0+2.5,y1-19,x0+2.5,y0+27];
  g.save();poly(g,deck);g.clip();
  g.fillStyle=lg(g,x0,0,x1,0,['#c29664','#ae8254','#92683e']);g.fillRect(x0,y0,x1-x0,y1-y0);
  /* longitudinal deck planking seams (one direction only: bow to stern) and inner bulwark shadow */
  for(let px=x0+4.5;px<x1-3;px+=2.6)R(g,px,y0+4,.5,y1-y0-6,'rgba(52,32,16,.24)');
  tex(g,'mott',.22,x0,y0,x1-x0,y1-y0,'overlay',.5);
  ao(g,x0+2.5,y0,3.5,y1-y0,'l',.35,'#2a180c');ao(g,x1-6,y0,3.5,y1-y0,'r',.22,'#2a180c');g.restore();
  /* sculpted sunlit port gunwale, shaded starboard gunwale, and stemhead */
  poly(g,[cx,y0,x0,y0+26,x0,y1-18,x0+2.5,y1-19,x0+2.5,y0+27,cx,y0+5],'#845c38');
  stroke(g,[cx,y0+.5,x0+.5,y0+26,x0+.5,y1-18],'#b68c5e',.6);
  poly(g,[cx,y0,x1,y0+26,x1,y1-18,x1-2.5,y1-19,x1-2.5,y0+27,cx,y0+5],'#4a301c');
  R(g,cx-1,y0,2,5,'#9c7448');
  /* lowered yard with furled linen sail lying lengthwise along the deck (never across the hull) */
  R(g,cx-1,y0+21,5,80,'rgba(24,14,8,.28)');
  g.fillStyle=lg(g,cx-2.4,0,cx+2.4,0,['#f2ead8','#ddd2b8','#b4a68c']);g.fillRect(cx-2.2,y0+20,4.4,80);
  R(g,cx-.6,y0+20,.6,80,'rgba(255,252,240,.5)');R(g,cx+1.6,y0+20,.6,80,'rgba(90,78,60,.45)');
  R(g,cx-2.2,y0+100,4.4,.6,'#8a7e66');R(g,cx-.6,y0+17,1.2,3,'#6a482a');R(g,cx-.6,y0+100,1.2,3.5,'#6a482a');
  /* mast step, cargo hatch coaming, and coiled mooring rope on the foredeck */
  R(g,cx+3,y0+48.5,2.8,2.8,'rgba(20,12,6,.32)');R(g,cx+2.5,y0+48,2.6,2.6,'#4a301c');R(g,cx+2.5,y0+48,2.6,.5,'#7a5a38');
  R(g,cx-7,y0+64.5,5.8,7.8,'rgba(20,12,6,.3)');R(g,cx-7.2,y0+63.5,5.8,7.6,'#5c3e24');R(g,cx-6.4,y0+64.3,4.2,6,'#9c8868');R(g,cx-7.2,y0+63.5,5.8,.5,'#9a7448');
  g.strokeStyle='#b89e6e';g.lineWidth=.7;g.beginPath();g.ellipse(cx+5,y0+35,2,2,0,0,6.2832);g.stroke();
  /* aft deckhouse with sloped planked roof, sunlit west pitch, and east shadow */
  R(g,cx-5,y1-30,13.5,13.5,'rgba(20,12,6,.34)');
  R(g,cx-6.2,y1-31.5,6.2,13.5,'#9c744c');R(g,cx,y1-31.5,6.2,13.5,'#7a5836');R(g,cx-.4,y1-31.5,.8,13.5,'#c29868');
  R(g,cx-6.2,y1-31.5,12.4,.5,'#b88e60');R(g,cx-6.2,y1-18.5,12.4,.6,'#422a16');
  /* mooring lines to quay bollards */
  g.strokeStyle='#3a2a1c';g.lineWidth=.55;g.beginPath();g.moveTo(x1-1,y0+30);g.lineTo(Q+.5,y0+18);g.moveTo(x1-1,y1-22);g.lineTo(Q+.5,y1-10);g.stroke();
  for(const yy of[y0+17,y1-11]){R(g,Q-.2,yy,1.8,1.8,'#4a3a2a');R(g,Q-.2,yy,1.8,.5,'#8a7860')}}
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
const SMITHS=[['smith14a',150,118,1],['smith14b',318,121,-1],['smith14c',381.5,116,-1]];
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
/* who: the one Paul is talking to, where several may say the same farewell (any of the three disciples); Paul answers whoever spoke last */
async function bye(b,who=b.a){const as=a=>a===b.a?who:a;if(F[b.k])return say(who,b.lines[0][1]);
  let last=who;for(const[a0,l]of b.lines){const a=as(a0);await say(a,l,{to:a===P?last:P});if(a!==P)last=a}F[b.k]=1;codeBtn()}
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
    endScreen({title:'two_hours_in_the_theater_2',text:'city_shouted_for_two_hours_end',based:'based_on_acts_19_21_20_1',
      go:'click_to_continue_to_chapter_fifteen',code:['chapter_fifteen_code_code',codeOf(15,0)]});
    await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(15)};await new Promise(()=>{})})}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
ROOMS.court14={space:.8,floor:'earth',walk:[16,304,112,138],get mood(){return F.plea?'still':'work'},get amb(){return F.plea?{birds:.35,wind:.2}:{birds:.3,crowd:.12}},hs:[
  {name:'passage_under_the_house',x:8,y:48,w:40,h:56,wx:40,wy:122,dir:-1,exit:leaveCourt,look:'passage_under_the_house_look'},
  {name:'fig_tree',x:222,y:6,w:98,h:98,wx:250,wy:118,look:'fig_tree_and_its_shade'},
  {name:'trough',x:168,y:92,w:30,h:12,wx:182,wy:114,look:'trough_of_water_for_the_house'},
  {name:'door',x:116,y:52,w:34,h:52,wx:133,wy:114,look:'door_of_damon_and_theanos_house',open:'i_have_said_my_goodbyes'},
  {name:'disciples',x:230,y:96,w:60,h:40,wx:240,wy:128,vis:()=>!!F.plea,look:'disciples_from_all_over_the_city',talk:()=>bye(BYE[3])}]};
ROOMS.market14={space:.7,walk:[16,464,112,138],get mood(){return F.plea?'harbor':'work'},get amb(){return F.plea?{birds:.3,wind:.2}:{crowd:.35,hammer14:.7}},hs:[
  {name:'way_back_to_the_lanes',x:0,y:60,w:24,h:84,wx:24,wy:124,dir:-1,exit:outMarket,look:'back_to_the_lanes'},
  {name:'demetrius_stall',x:192,y:57,w:186,h:53,wx:238,wy:116,look:'demetrius_stall_shut_kiln_cold'},
  {name:'wares',x:22,y:58,w:158,h:52,wx:58,wy:118,look:'wares_under_cloths_now'},
  {name:'donkey',x:84,y:76,w:38,h:38,wx:130,wy:120,dir:-1,look:'donkey_heard_a_thousand_hammer_strokes'}]};
ROOMS.colon14={space:.6,walk:[16,464,112,138],mood:'uproar',amb:{roar14:.55,crowd:.6,cry14:.7},hs:[
  {name:'square_before_the_theater',x:0,y:56,w:30,h:88,wx:24,wy:124,dir:-1,def:'walk',exit:()=>toLanes(),look:'square_before_the_theater_look'},
  {name:'theater_arches',x:184,y:41,w:282,h:52,wx:300,wy:116,look:'theater_arches_look'},
  {name:'crowd',x:158,y:72,w:322,h:32,wx:300,wy:116,look:'crowd_at_the_arches_look',talk:'nobody_stops_to_listen'}]};
ROOMS.seal14={space:.6,walk:NOW,mood:'uproar',amb:{roar14:.45,crowd:.4,cry14:.5},hs:[
  {name:'aristokles_leaf',x:60,y:62,w:84,h:59,wx:160,wy:236,vis:()=>!F.closed,look:'aristokles_leaf_look',use:layLeaf,useWith:withTablet},
  {name:'philokrates_leaf',x:176,y:62,w:84,h:59,wx:160,wy:236,vis:()=>!F.closed,def:'use',look:()=>say(RUN,F.turned?'philokrates_leaf_now_its_holes':'philokrates_leaf_holes_at_the_other_edge'),use:layLeaf,pickup:turnLeaf,open:turnLeaf,useWith:withTablet},
  {name:'tablet',x:116,y:60,w:88,h:66,wx:160,wy:236,vis:()=>!!F.closed,look:()=>say(RUN,F.sealed?'two_leaves_tied_through_two_seals':F.clayed?'over_the_knot_so_nobody':F.tied?'through_both_holes_and_knotted':'writing_to_writing_holes_together'),useWith:withTablet},
  {name:'ring',x:262,y:56,w:58,h:67,wx:160,wy:236,vis:()=>!F.sealed,def:'use',look:'aristokles_ring_look',use:ring,talk:ring,useWith:id=>id==='clay14'?say(RUN,'over_the_knot_so_nobody'):false},
  {name:'base_of_a_column',x:0,y:127,w:218,h:17,wx:160,wy:236,look:'base_of_a_column_look'},
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
for(const d of[D1,D2,D3])d.hs={name:'disciple',actor:d,look:'disciples_from_all_over_the_city',talk:()=>bye(BYE[3],d)};
DA.def={look:'nothing_there_needs_our_hands',pickup:'it_is_not_ours',use:'that_is_not_for_us_to_do',open:'that_is_not_ours_to_open',talk:'later_2',give:'what_should_we_give'};
DA.noCraft='not_those_two_together';

/* ============ ITEMS ============ */
/* spline14: smooth Catmull-Rom path helper shared by the cord and clay inventory icons */
function spline14(g,p,closed){const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
  g.beginPath();g.moveTo(p[0],p[1]);
  for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);
    g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
  if(closed)g.closePath()}
Object.assign(ICON,{
  /* cord of flax: two slender coiled loops seen in 3/4 view with depth-shaded back arcs, twisted ply highlights and a relaxed trailing end (no crossings) */
  cord14(g){
    const arc=(cx,cy,rx,ry,a0,a1,n)=>{const o=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;o.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry-Math.cos(a)*.35])}return o};
    const sample=(p,m)=>{const n=p.length/2,P=i=>{i=clamp(i,0,n-1);return[p[2*i],p[2*i+1]]},o=[];
      for(let i=0;i<n-1;i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2),c1x=b[0]+(c[0]-a[0])/6,c1y=b[1]+(c[1]-a[1])/6,c2x=c[0]-(d[0]-b[0])/6,c2y=c[1]-(d[1]-b[1])/6;
        for(let s=i?1:0;s<=m;s++){const t=s/m,u=1-t;o.push([u*u*u*b[0]+3*u*u*t*c1x+3*u*t*t*c2x+t*t*t*c[0],u*u*u*b[1]+3*u*u*t*c1y+3*u*t*t*c2y+t*t*t*c[1]])}}return o};
    const strand=(pts,w,mid,shade,tip)=>{
      const pass=(lw,dx,dy,fn)=>{g.lineWidth=lw;g.lineCap='round';g.lineJoin='round';
        for(let i=1;i<pts.length;i++){const k=shade((i-.5)/(pts.length-1));g.beginPath();g.moveTo(pts[i-1][0]+dx,pts[i-1][1]+dy);g.lineTo(pts[i][0]+dx,pts[i][1]+dy);g.strokeStyle=fn(k);g.stroke()}};
      pass(w+.52,.1,.24,k=>tint(mid,-.58+k*.08));pass(w+.1,.05,.12,k=>tint(mid,-.36+k*.14));
      pass(w*.85,-.04,-.05,k=>tint(mid,-.2+k*.22));pass(w*.46,-.15,-.2,k=>tint(mid,-.05+k*.42));
      let dist=0,next=.65;
      for(let i=1;i<pts.length-1;i++){const dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1],l=Math.hypot(dx,dy);if(l<1e-4)continue;dist+=l;
        if(dist>=next){next+=1.42;const k=shade(i/(pts.length-1)),tx=dx/l,ty=dy/l,nx=-ty,ny=tx,cx=pts[i][0],cy=pts[i][1],hw=w*.42,sx=(nx*.76+tx*.65)*hw,sy=(ny*.76+ty*.65)*hw;
          g.beginPath();g.moveTo(cx-sx,cy-sy);g.lineTo(cx+sx,cy+sy);g.strokeStyle=rgba(tint(mid,-.62),.45+k*.22);g.lineWidth=.45;g.lineCap='butt';g.stroke();
          const hx=cx+tx*.36-.12,hy=cy+ty*.36-.16,hl=w*.25,px=(nx*.76+tx*.65)*hl,py=(ny*.76+ty*.65)*hl;
          g.beginPath();g.moveTo(hx-px,hy-py);g.lineTo(hx+px,hy+py);g.strokeStyle=rgba('#f8f0d8',.32+k*.55);g.lineWidth=.42;g.lineCap='round';g.stroke()}}
      if(tip){const a=pts[Math.max(0,pts.length-3)],b=pts[pts.length-1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,tx=dx/l,ty=dy/l;
        for(const[s,len,col]of[[-.28,.9,'#ebe2c4'],[.26,.8,'#c4b890']]){g.beginPath();g.moveTo(b[0],b[1]);g.lineTo(b[0]+tx*len-ty*s*len,b[1]+ty*len+tx*s*len);g.strokeStyle=col;g.lineWidth=.52;g.lineCap='round';g.stroke()}}};
    const turns=[[10.6,13.7,7.2,3.6,'#beb28a',.78],[10.3,10.2,6.8,3.3,'#d4c8a2',1]];
    for(const[cx,cy,rx,ry,mid,km]of turns)strand(arc(cx,cy,rx,ry,Math.PI,Math.PI*2,24),1.34,mid,u=>(.14+.56*Math.abs(u-.5)*2)*km,0);
    strand(sample([16.5,15.9,18.1,15.6,19.4,16.8,19.8,18.4,21,19.1],8),1.32,'#c8bc94',u=>.7+.24*u,1);
    for(const[cx,cy,rx,ry,mid,km]of turns)strand(arc(cx,cy,rx,ry,0,Math.PI,26),1.4,mid,u=>(.6+.4*Math.sin(u*Math.PI))*km,0)},
  /* lump of clay: hand-rolled ball of soft terracotta clay matching claySeal, with a thumb-press hollow, mottling and damp sheen */
  clay14(g){
    const p=[7.8,7,11.6,5.7,15.2,7,17.8,9.6,19.1,13.4,17.4,17.3,12.8,18.8,7.6,18.4,4.8,15.6,4.8,11.8,5.9,8.8];
    spline14(g,p,1);g.fillStyle='#97624a';g.fill();
    clipTo(g,()=>spline14(g,p,1),()=>{
      g.fillStyle=rg(g,8.9,9.2,12.2,[[0,'#e2ae8c'],[.23,'#c28664'],[.53,'#97624a'],[.79,'#683d2d'],[1,'#432419']]);g.fillRect(3,4,18,17);
      g.fillStyle=lg(g,0,15.3,0,19.3,['rgba(42,20,12,0)','rgba(34,16,10,.52)']);g.fillRect(3,15,18,5);
      comp(g,'screen',.22,()=>{g.strokeStyle='#c88e6e';g.lineWidth=1.25;g.lineCap='round';spline14(g,[13.7,17.8,17,16,18.4,13],0);g.stroke()});
      g.save();g.translate(14.6,11.6);g.rotate(-.42);
      g.fillStyle=rg(g,.9,.8,3.5,['rgba(232,182,150,.5)','rgba(232,182,150,0)']);g.beginPath();g.ellipse(.6,.5,3.4,2.35,0,0,6.2832);g.fill();
      g.fillStyle=lg(g,-2.5,-1.7,2.5,1.7,[[0,'rgba(54,28,20,.74)'],[.45,'rgba(98,56,40,.28)'],[.78,'rgba(204,150,120,.36)'],[1,'rgba(236,188,156,.6)']]);
      g.beginPath();g.ellipse(0,0,2.85,1.95,0,0,6.2832);g.fill();g.restore();
      g.save();g.translate(7.8,14.6);g.rotate(.45);
      g.fillStyle=lg(g,-1.8,-1.2,1.8,1.2,['rgba(68,36,24,.34)','rgba(151,98,74,0)','rgba(218,164,132,.28)']);
      g.beginPath();g.ellipse(0,0,2.2,1.4,0,0,6.2832);g.fill();g.restore();
      tex(g,'mott',.3,3,4,18,17,'overlay',.35);
      pool(g,8.8,8.9,3.3,2.3,'#f4d4b6',.44,'screen');pool(g,8.2,8.3,1.5,1.1,'#fff0dc',.33,'screen')})},
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
function place14(room){for(const a of EVERY){a.room=null;a.talk=false;a.seat=0;a.ges=0}THV.talk=false;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  /* who is played: Eudoros until the court is found, Damon and Theano in the house until the plea is read, then Paul */
  const want=G.stage14?P:!F.court?RUN:!F.plea?DA:P;
  if(G.pc!==want){if(want===P)G.pc=P;else{G.pc=want;G.inv=G.invs[want.id]||(G.invs[want.id]=[])}}
  if(want!==RUN)RUN.room=null;if(want!==DA&&!(F.plea&&room==='court14'))DA.room=null;
  if(want!==P&&!(F.court&&!F.plea&&room==='door14'))P.room=null;
  if(room==='colon14'){const R0=[[BR,206,121,-1],[AP,250,117,-1],[PO,290,124,-1],[WA,334,118,-1],[OL,372,122,-1],[DY,416,119,-1],[AR,60,119,1],[PK,82,123,1]];for(const[a,x,y,d]of R0)place(a,room,x,y,d)}
  if(room==='seal14'){}
  if(room==='door14'){place(PH,room,120,121,1);if(!F.plea){posePaul();if(G.pc===DA&&DA.room!=='door14')place(DA,room,...ENT.door14)}}
  if(room==='court14'&&F.plea){place(PH,room,96,124,1);place(KL,room,150,128,-1);place(DA,room,220,120,-1);place(D1,room,282,126,-1);place(D2,room,262,112,-1);place(D3,room,300,114,-1)}
  if(room==='market14'&&!F.plea)placeMarket();
  P.party=DA.party=RUN.party=0;swapBtn()}
function setup14(){P.hs=PAULHS;P.called='Paul';RUN.called='Eudoros';G.sv14=0;G.dl14=0;G.hu14=null;for(const k in courtSaid)delete courtSaid[k];
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
