/* Paul of Tarsus: level data for Chapter Twenty-Two, "Euroaquilo".
   Loaded on demand by index.html (see LEVEL and loadLevel there), after the shared files its line of the manifest names (needs). Everything
   that belongs to this chapter lives here: its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots,
   dialog, cutscenes and hints.
   The voyage from Caesarea and the storm, about 58 C.E., in the fall (Acts 27:1-26). Julius, an army officer of the unit of Augustus, takes
   charge of Paul and some other prisoners; they put to sea in a ship of Adramyttium, and Aristarchus is with them (27:1, 2). At Sidon
   Julius lets Paul go to his friends and be cared for (27:3). Against the wind they keep in the shelter of Cyprus, cross the open sea off
   Cilicia and Pamphylia, and put in at Myra in Lycia (27:4, 5), where the officer finds a ship of Alexandria bound for Italy and puts them
   aboard (27:6). Slowly to Cnidus, past Salmone in the shelter of Crete, with difficulty to Fair Havens near Lasea (27:7, 8). Time has been
   lost, the fast of Atonement Day is over, and Paul makes a recommendation: the voyage will bring damage and loss, of cargo, ship and
   lives (27:9, 10). The officer goes by the pilot and the shipowner; most are for reaching Phoenix to winter (27:11, 12). A soft south wind;
   they weigh anchor and keep close to Crete (27:13); then Euroaquilo comes down on them, and they give way and are driven (27:14, 15). In
   the lee of Cauda the skiff is hardly mastered; they get it aboard, gird the hull, fear the Syrtis, lower the gear (27:16, 17). The next
   day they start to lighten the ship, the third day the tackling goes (27:18, 19). Many days without sun or stars; hope fades (27:20).
   Then Paul stands up among them: he had advised them to stay; take courage, only the ship will be lost; an angel of the God he belongs
   to stood by him; he must stand before Caesar, and God has granted him all who sail with him; he believes God; they must be cast ashore
   on some island (27:21-26).
   Acts does not say how Paul was guarded on board, how many soldiers, sailors or masts there were, what the hold looked like, why Fair
   Havens was unsuitable, or what "the gear" was. It does not say how Luke and Aristarchus came to sail, and the game does not say it
   either. The end screen says so.
   Invented: the shelter on deck and that Paul made it, what the brothers at Sidon gave him (bedding, bread, a length of old sailcloth), the
   reasons the pilot and the shipowner give, the four things Paul weighs at Fair Havens as the player gathers them, Paul's part in making
   the ship lighter and the bales he carries, the sailors' faces and their call, the cord, Luke's tablet and its marks, and all dialogue
   but the lines of the account (SP/ch22/told.md), which stand in our own words. What the account tells is told by the narrator (TOLD),
   never put into a mouth as a quotation. The narration says "we" where the account does and "they" where it does.
   Played: Paul, and Luke, fixed by the scene (party:['paul','luke22'], swap:false). Luke at the skiff (the account says "we", 27:16) and
   over his tablet in the dark days (27:20); Paul everywhere else. Luke worships Jehovah, so he prays as Paul does. No chain on board; a
   soldier is always near Paul.

   THE PUZZLES, AND WHY EACH HAS ONE SOLUTION
   1. A roof for the night (deck22, Myra in the evening). Passengers slept on deck under shelters of their own. Paul has his tool pouch
      (awl, needle, thread) and the brothers' bundle (bedding, bread, an old length of sailcloth with a tear in it). The sailcloth is mended
      in three steps that only go one way: the awl pierces the stitch holes along the tear (sailcloth this heavy will not take a needle
      without them), the thread goes through the needle, and the threaded needle sews the tear. A sailor has old cord to spare. The
      shelter can stand on either side of the deckhouse, and only one of them is out of the wind: the pennant on the deckhouse streams out
      to the left, so the wind comes from the right and the deckhouse keeps it off its left side. On the right Paul refuses, with the true
      reason (the wind would fill the cloth like a sail). With the mended sailcloth and the cord, on the lee side, it stands; the bedding and
      the bread go under it.
   2. Not listened to (deck22, Fair Havens). Four true things are gathered by looking and asking, each a flag: the weeks lost (Luke, who
      has kept the days), the season (a sailor: the fast is behind them), the wind (the pennant: against them since Sidon) and his own
      shipwrecks (the open sea beyond the islands: Paul's memory). With all four Paul speaks to Julius: the recommendation of 27:10. The
      pilot and the shipowner answer with reasons of their own; 27:11, 12 are told. It cannot be won, and a line of Paul's own says so.
   3. The skiff, on the beat (storm22, in the lee of Cauda; Luke played). The skiff comes in only while the stern is down, which is the
      pause of the beat (shared/beat.js). The player calls the pull by using the rope; a pull counts only in the pause and while the pause
      lasts as long as a pull takes; four good pulls bring it in. A miss gains nothing and says nothing. After three misses a sailor calls the
      moment ("Now!"), and keeps calling until the skiff is in (sticky); after six the sailors pull with every call of the player.
   4. Between two waves (storm22, the next day; Paul played). Three bales (never the wheat) go from the hatch to the lee rail, hold to hold:
      the hatch, the mast, a cask made fast, the rail. A step to the next hold is a hit only in the pause between two seas; a miss puts him
      back at the hold he left, with no standing line. After three misses in one crossing the sailor at the rail calls the moment, and keeps
      calling until that crossing ends; after six he comes and walks Paul across. Nobody goes overboard.
   5. No sun, no stars (storm22 by night and tablet22; Luke played). Six days. On each Luke may ask the pilot, look at the sky and feel
      the wind: every answer is true and none is enough. Then one mark on the tablet: south-west, west, north-west, or only the day. Luke's
      line for each kind of mark is true and never says that one is right. None is right or wrong (decided): the marks are carried into
      Chapter Twenty-Three (MARKS, carry23).
   6. In their midst (storm22; Paul played). The six parts of 27:21-26 in the account's order, offered as one choice that the engine mixes
      by key, the used parts staying on offer. Each part is spoken only when it is the next; a part said too soon is answered by a true
      thought that does not name the right one; a part said again, by another.

   Rooms: the quay at Caesarea (quay22), the harbor of Myra (myra22), the grain ship's deck (deck22: Myra in the evening, Fair Havens), the
   deck in the storm (storm22: the lee of Cauda, the next day, by night, in their midst), Luke's tablet (tablet22, a close view) and the
   ship girded, seen from the side (girded22, a told picture), and the travel map (the voyage out, Myra to Fair Havens, the Syrtis).
   Each picture is a section of its own between "ART <room>: begin" and "ART <room>: end"; what the story reads from a section is named at
   its head. ART-TODO: every picture here is a plain placeholder at its final geometry (SP/pair2/ROOMS-22.md), for the art agents. */
LEVEL(22,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* One tune for the voyage and the storm. It is in A, in the harmonic major (A, B, C sharp, D, E, F, G sharp): a major scale whose sixth
   is lowered, so that the fair days are bright and the lowered sixth leans on the fifth like a cloud coming up. Its bars have twenty-one
   steps that fall six, six, nine: a swell that comes in twice and the third time runs on. A step is a seventh of a second (written out,
   since tools/strings.mjs reads a lone digit before a slash as the start of a pattern), so a bar
   lasts three seconds and two bars are one sea of the beat of the storm (shared/beat.js). No other chapter has this key, this mode or this bar,
   Chapter Twenty-Three included. The tune is four bars long: up the triad and down round the lowered sixth (A); up through the raised seventh
   to the octave (B); down from the octave, leaning on the lowered sixth (C); and its last bar, which on the voyage never comes home: it
   stops on the fifth (O). Only when Paul stands up among them ("midst") does the last bar go home, through the raised seventh below to
   the keynote (D), for the first time in the chapter.
   On the quay at Caesarea, on a fair morning ("quay"), the lyre has the tune and the harp answers it, over a low string and a light frame
   drum: a lilt, as the earlier sea chapters have. In the harbor of Myra ("myra") the harp has it first and the lyre answers. On deck at
   Myra in the evening ("deck") the harp has the tune alone over the low string. At Fair Havens ("havens") the ney has only its first bar
   and the bar that leans on the lowered sixth, never the climb to the octave, over the rocking figure of the harp: unease. In the storm
   ("storm") the music moves and never holds: the low string plucks the keynote and leans on the note above it, a drum ticks with it and
   almost stops every fourth bar, and the ney begins the tune and breaks off on the raised seventh before it comes home; no louder than
   the rest. In the dark days ("night") the low string plucks one note to a bar under a few bars of the tune on the harp, far apart. In
   their midst ("midst") lyre and harp have the whole tune, and it comes home. Nothing is claimed about how music was played then. */
const SCALE=[0,2,4,5,7,8,11],ST=21,
 /* the tune, a bar to a letter: [step, degree of the scale, length in steps]. O is the last bar left on the fifth; D is the same bar
    come home; E is it broken off on the raised seventh, for the ney in the storm */
 TUNE={A:[[0,0,2],[2,2,1],[3,4,3],[6,5,2],[8,4,1],[9,3,3],[12,2,6],[18,1,3]],
   B:[[0,2,2],[2,4,1],[3,7,3],[6,6,2],[8,7,1],[9,8,3],[12,7,6],[18,6,3]],
   C:[[0,7,2],[2,8,1],[3,7,3],[6,5,2],[8,4,1],[9,5,3],[12,4,6],[18,3,3]],
   O:[[0,3,2],[2,2,1],[3,1,3],[6,2,6],[12,4,9]],
   D:[[0,3,2],[2,2,1],[3,1,3],[6,-1,6],[12,0,9]],
   E:[[0,3,2],[2,2,1],[3,1,3],[6,-1,15]],_:[]},
 bars22=s=>[...s].map(k=>TUNE[k]),
 /* what rocks under it: a note on each beat of three, seven to the bar, on the chord of each half bar */
 ROCK={A:[0,4,2,4,-1,1,4],B:[0,4,-1,4,-3,1,-1],C:[-4,0,-2,0,-2,3,0],O:[-4,0,-2,0,-3,1,-1],D:[-3,1,-1,1,0,4,2]},
 rock22=s=>[...s].map(k=>k==='_'?[]:ROCK[k].map((n,i)=>[i*3,n,3])),
 /* the low string under each bar of the tune: on the first beat and on the third, long one */
 LOWS={A:[[0,0,12],[12,-3,9]],B:[[0,0,6],[6,-1,6],[12,-3,9]],C:[[0,-4,12],[12,-2,9]],O:[[0,-4,12],[12,-3,9]],D:[[0,-3,12],[12,0,9]]},
 low22=s=>[...s].map(k=>LOWS[k]),
 MUSIC={dt:.14285714285714285,steps:ST,group:[6,6,9],root:45,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['quay'],oct:24,loop:8,lines:bars22('ABCO____'),vol:.5},
  {inst:'harp',moods:['quay'],oct:12,loop:8,lines:bars22('____ABCO'),vol:.5},
  {drum:1,moods:['quay'],prog:'AAAB',seq:{A:'d.....k.....d..k..k..',B:'d.....k.....d..k.kk..'},vol:.2},
  {inst:'harp',moods:['myra'],oct:12,loop:8,lines:bars22('ABCO____'),vol:.5},
  {inst:'lyre',moods:['myra'],oct:24,loop:8,lines:bars22('____ABCO'),vol:.46},
  {inst:'bass',moods:['quay','myra','deck'],loop:4,lines:low22('ABCO'),vol:.4},
  {inst:'harp',moods:['deck'],oct:12,loop:8,lines:bars22('ABCO____'),vol:.46},
  {inst:'ney',moods:['havens'],oct:24,loop:8,lines:bars22('A_C_A_C_'),vol:.3},
  {inst:'harp',moods:['havens'],oct:12,loop:4,lines:rock22('ACCO'),vol:.34},
  {inst:'bass',moods:['havens'],loop:4,lines:low22('ACCO'),vol:.36},
  /* the storm: the keynote plucked, leaning on the step above; the drum ticks with it and almost stops every fourth bar; the ney begins
     the tune and breaks off */
  {inst:'bass',moods:['storm'],loop:1,lines:[[[0,0,3],[3,1,3],[6,0,6],[12,0,3],[15,1,3],[18,0,3]]],vol:.36},
  {drum:1,moods:['storm'],prog:'AAAB',seq:{A:'t..t..t.....t..t..t..',B:'t....................'},vol:.16},
  {inst:'ney',moods:['storm'],oct:24,loop:8,lines:[TUNE.A,TUNE.E,[],[],[],[],[],[]],vol:.26},
  /* the dark days: one low note plucked to a bar, and the first bar of the tune and its leaning bar on the harp, far apart */
  {inst:'bass',moods:['night'],loop:4,lines:[[[0,0,21]],[[0,-2,21]],[[0,-4,21]],[[0,-3,21]]],vol:.26},
  {inst:'harp',moods:['night'],oct:12,loop:8,lines:bars22('A___C___'),vol:.32},
  /* in their midst: the whole tune, and home */
  {inst:'lyre',moods:['midst'],oct:24,loop:8,lines:bars22('ABCDABCD'),vol:.44},
  {inst:'harp',moods:['midst'],oct:12,loop:4,lines:rock22('ABCD'),vol:.28},
  {inst:'bass',moods:['midst'],loop:4,lines:low22('ABCD'),vol:.36}]};

/* ---- around you ----
   In harbor and in fair weather (Caesarea, Myra, Fair Havens) the sea, gulls and wind of the engine, and the creak of a hull. The sounds of the storm are
   shared with Chapter Twenty-Three in shared/weather.js (sound): the gale, its gusts, the wind in the rigging, rain and its patter on the
   planks. Two belong to this chapter alone: the sail slatting before the gear is lowered (27:17), and the skiff knocking at the stern until it is
   hoisted aboard (27:16), gently at Fair Havens. In the storm and the rain there are no gulls, and nothing thunders. While the beat runs
   (the skiff, the bales) the waves of the engine are held low, so that each sea of the beat (shared/beat.js) can be followed by ear. */
const CALLS22={
  /* the sail slatting: three to seven heavy flaps of cloth at uneven gaps, each a dull thud with a crack in it */
  slat:[1.4,3.8,(t,d)=>{let u=t+.001+Math.random()*.003;const n=3+(Math.random()*5|0);for(let i=0;i<n;i++){const v=.48+Math.random()*.48;
    noise({t:u,d:.08+Math.random()*.06,a:.006,v,f:420+Math.random()*380,q:.8,type:'lowpass',dest:d});noise({t:u+.004,d:.014,v:v*.45,f:2400+Math.random()*1200,q:1.2,dest:d});
    u+=.11+Math.random()*.22}}],
  /* the skiff knocking at the stern: a hollow knock of wood on wood, often twice */
  skiff:[2,5.5,(t,d)=>{t+=.001+Math.random()*.003;const k=(u,v)=>{tone({f:150+Math.random()*30,to:112,t:u,d:.14,type:'sine',v:.2*v,dest:d});tone({f:330+Math.random()*60,t:u,d:.05,type:'triangle',v:.045*v,dest:d});
      noise({t:u,d:.03,v:.15*v,f:850,q:2,dest:d})};k(t,1);if(Math.random()<.6)k(t+.2+Math.random()*.2,.55)}]},
 SND22=SHARED.weather&&SHARED.weather.sound||{beds:{},calls:{}},BEDS22=SND22.beds,ALLCALLS22=Object.assign({},SND22.calls,CALLS22),
 /* the deck in the storm, by day: the gale, its gusts and the rigging, rain on the planks, the hull working; the skiff and the slatting
    sail until they are dealt with (27:16, 17); the sea of the engine held low while the beat runs */
 STORMAMB22={gale:.6,gust:.65,rigging:.6,rain:.5,patter:.6,wind:.35,creak:.6,waves:.3};
/* while the beat runs, the storm stands back a little, and the sea of the engine further, so that each sea of the beat stands out */
const BEAT22AMB={gale:.4,gust:.4,rigging:.5,rain:.35,patter:.45,wind:.25,creak:.5,waves:.15};
const AMB={quay22:{waves:.5,gulls:.5,wind:.15,creak:.15},myra22:{waves:.45,gulls:.5,wind:.15,creak:.25},
  deck22:{waves:.4,gulls:.3,wind:.2,creak:.4},havens22:{waves:.35,gulls:.25,wind:.3,creak:.35,skiff:.25},
  storm22:()=>{const ph=phase22();return Object.assign({},STORMAMB22,ph==='skiff'?Object.assign({},BEAT22AMB,{slat:.7,skiff:.8}):ph==='load'?BEAT22AMB:ph==='midst'?{gust:.55,rigging:.5}:{})},
  /* the dark days, by night: no less wind, the rain a little less */
  night22:Object.assign({},STORMAMB22,{rain:.45,patter:.45}),
  tablet22:{gale:.3,gust:.35,rigging:.3,rain:.3,patter:.35,waves:.2,wind:.2,creak:.3},
  /* the ship from the side: the gale and the sea, rain on the water, no planks to patter on */
  girded22:{gale:.6,gust:.7,rigging:.4,rain:.5,waves:.6,wind:.45}};
/* ==== MUSIC: end ==== */

/* ============ HOW THE STORY STANDS ============ */
/* phase22: quay (at Caesarea, before the voyage out); myra (in the harbor of Myra); shelter (the evening on the grain ship's deck);
   havens (Fair Havens, until the recommendation); skiff (the lee of Cauda, Luke at the rope); load (the next day, Paul carries the bales);
   tablet (the dark days, Luke's tablet); midst (Paul stands up among them) */
const phase22=()=>!F.out?'quay':!F.aboard?'myra':!F.fh?'shelter':!F.advised?'havens':!F.skiff?'skiff':!F.load3?'load':!F.t6?'tablet':'midst';
const lukePlays=()=>{const p=phase22();return p==='skiff'||p==='tablet'};
const fast=()=>G.speedAll>200;   /* the playtest plays at speed */
const tw=ms=>wait(fast()?Math.min(40,ms):ms);

/* ============ ART ============ */
const FONT22=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
/* a plain sky, darker at the top */
const sky22=(g,y1,a,b)=>{g.fillStyle=lg(g,0,0,0,y1,[a,b]);g.fillRect(0,0,320,y1)};
/* a plain sea from the horizon down, with a few level glints */
function sea22(g,y0,y1,c,r){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.15),c,tint(c,-.2)]);g.fillRect(0,y0,320,y1-y0);
  for(let i=0;i<70;i++){const y=y0+2+r()*(y1-y0-3);R(g,r()*320,y,2+r()*6*(y-y0)/(y1-y0+1),.5,rgba('#ffffff',.18))}}
/* planks running one way only, with no joints across them */
function planks22(g,y0,y1,c){for(let y=y0,i=0;y<y1;y+=5,i++){R(g,0,y,320,5,i%2?c:tint(c,-.06));R(g,0,y,320,.5,'rgba(30,18,10,.45)')}}
/* a hull from the side: a long low shape, its sheer rising to its two ends; no plank lines, so nothing runs across it. dir 1: bow right */
function hull22(g,x0,x1,top,wl,c,dir){const m=(x0+x1)/2,L=x1-x0,b=dir>0?x1:x0,s=dir>0?x0:x1;
  poly(g,[s,top-6,s+dir*L*.08,top,b-dir*L*.12,top,b,top-9,b-dir*L*.04,wl,s+dir*L*.03,wl],c);
  R(g,Math.min(x0,x1)+L*.08,top,L*.8,1,tint(c,.25));R(g,Math.min(x0,x1)+L*.05,wl-2,L*.9,2,tint(c,-.3))}

/* ==== ART quay22: begin ==== */
/* The quay at Caesarea, in the harbor Sebastos, on a fair morning (27:1, 2). We stand on the quay and look west, out over the basin to
   the sea, as Paul's window looked over the same harbor in Chapter Twenty (shared/caesarea.js): at the left the long breakwater runs out
   from behind the picture's edge with its low wall on the seaward side and the square tower at its end by the harbor's mouth; beyond the
   mouth the open sea to the one horizon (y 74, the eyes of the people at the back of the quay). The sun stands behind us at the right, so
   the breakwater's inner face is in shade and every shadow falls to the left and away from us. No temple anywhere (Caesarea is not one
   of CONTRIBUTING section 3's four cities), no standard, no image.
   The coaster of Adramyttium lies at the quay, moored behind its stone edge (y 96), her bow to the right: hull 146..308, her waist rail
   at 72. She is a small coastal trader (SHARED.ship.paint, as the coaster at Myra): her rail lies above the horizon everywhere, so her
   hull hides the line of sea and sky behind her, and her mast, her stays and her stem and stern posts stand against the sky alone. Her
   yard is lowered and lies along her deck with the sail furled on it; no tie crosses the roll. She rises and falls a little on the swell
   behind the stone edge with her two mooring lines and her steering oar; only the gangplank reaches over the edge onto the paving
   (from her rail at 196, 74 to the paving at 210, 112), its cleats stopping inside its sides. As 27:2 is told she pulls away (G.off22
   0..1) bow first to the right, toward the harbor's mouth, and out of the picture: she passes in front of open water only, where her
   rail still hides the horizon, so her mast crosses no line on her way.
   Called from outside: ART.quay22, QUAY22. Reads G.off22 (the coaster pulling away, 0..1, as 27:2 is told).
   Hotspots (ROOMS.quay22): the sea 120,64,200,30 · the coaster 146,50,162,46 · the gangplank 188,72,30,42 · the breakwater 0,54,126,24.
   Walk: 20..300 by 110..138; nothing stands in it. Heads come at y 70..100: behind them the sea, the quay and the hull, nothing round.
   Light: the sun behind us at the right, high (shadows fall to the left and away). */
const QUAY22={hz:74,edge:96,ship:[146,308,72,100],plank:[196,74,210,112],walk:[20,300,110,138]};
let OQuay22=null,SQuay22=null;
const oQuay22=()=>OQuay22||(OQuay22={w:320,hz:QUAY22.hz,hour:'morning',light:1,cloud:.24,streak:.35,seed:2211,y1:QUAY22.edge,
  wind:SHARED.weather?SHARED.weather.wind({from:'w',force:2,view:'w'}):undefined});
/* the breakwater: the top of its low seaward wall, and its foot in the water, nearer (lower) at the left; the tower at its end */
const BWQuay22={x0:-6,x1:112,T:x=>66.6+.024*x,B:x=>79.4-.03*x},TWQuay22={x0:104,x1:121,top:44};
ART.quay22={w:320,q:12,paint(g){paintQuay22(g)},
  light:{amb:'#f4ecdc',sun:[-16,-6,.38],wallY:96},
  draw(g,t){drawQuay22(g,t)},front(){}};
function paintQuay22(g){const K=SHARED.coast,O=oQuay22(),r=rng(2201),{hz,edge}=QUAY22;
  K.light(O);K.sky(g,O);
  /* far off at the right, low on the horizon, the coast running north (it lies behind the coaster until she sails) */
  K.isle(g,250,330,2.6,O,{kind:'cape',from:'r',dist:.9,seed:2212});
  SQuay22=K.sea(g,O);
  breakwaterQuay22(g,O);
  /* the quay: we stand on it; its edge of great blocks runs across, two mooring stones on it for the coaster's lines */
  K.quay(g,O,{view:'top',y:edge,y1:144,bollards:[132,316],bsize:6,seed:2213,c:'#d0c2a2',cope:'#ddd0b2',rows:6,step:34});
  SQuay22.open=(x,y)=>y>hz+.5&&y<edge-.5&&!(x<BWQuay22.x1+10&&y<BWQuay22.B(x)+1.2)&&!(x>=TWQuay22.x0-1&&x<=TWQuay22.x1+14&&y<BWQuay22.B(TWQuay22.x1)+2);
  wearQuay22(g,r);
  /* the morning light: warm from the right, a little cooler at the left where the breakwater lies in shade */
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(190,180,200,.7)','rgba(255,226,180,.5)','rgba(255,214,160,.9)']);g.fillRect(0,0,320,144)});
  ao(g,0,126,320,18,'b',.12,'#2a2050')}
/* the breakwater seen from the quay: its inner face in shade, coursed, wet and dark at the water; the walkway's edge and the low wall
   along its seaward side lit along their tops; the square tower at its end, its left face in shade and its front in the sun */
function breakwaterQuay22(g,O){const K=SHARED.coast,L=K.light(O),{x0,x1,T,B}=BWQuay22,r=rng(2214);
  K.land(g,L,.18,q=>{const F=[x0,T(x0),x1,T(x1),x1+2,T(x1)+.6,x1+2,B(x1),x0,B(x0)];
    poly(q,F);q.fillStyle=lg(q,0,64,0,80,['#bcae94','#a89a82','#8a8070']);q.fill();
    clipTo(q,()=>poly(q,F),()=>{tex(q,'mott',.4,x0,60,x1-x0+4,22,'overlay',1);
      /* the low wall's face above the walkway, set back a little, and the walkway's lit edge */
      for(let x=x0;x<x1;x+=.5){const t=T(x);R(q,x,t,.5,1.6,'#d6c8a8');R(q,x,t+1.6,.5,.5,'rgba(255,244,216,.6)');R(q,x,t+2.1,.5,.5,'rgba(60,50,60,.35)')}
      /* courses of the face, their joints stopping inside each course */
      let j=0;for(let y=69.4;y<80;y+=2.6,j++){for(let x=x0;x<x1;x+=.5){const yy=y+(x-x0)*-.006;if(yy>T(x)+2.6&&yy<B(x)-1)R(q,x,yy,.5,.4,'rgba(70,58,60,.32)')}
        for(let x=x0+((j*7.3)%9);x<x1-2;x+=8+((x*13)%5)){const yy=y+(x-x0)*-.006;if(yy>T(x)+2.6&&yy+2.4<B(x)-1)R(q,x,yy+.4,.4,2.2,'rgba(70,58,60,.25)')}}
      /* wet and dark along the foot, weed at the water */
      for(let x=x0;x<x1+2;x+=.5){const b=B(Math.min(x,x1));R(q,x,b-2.4,.5,2.4,'rgba(40,52,46,.45)');if(r()<.4)R(q,x,b-2.8-r(),.5,.5,'rgba(70,90,60,.5)')}});
    stroke(q,[x0,T(x0),x1,T(x1)],'#fff2d6',.5)});
  /* a lace of foam along its foot */
  for(let x=x0;x<x1+2;x+=.5)if(r()<.55)R(g,x,BWQuay22.B(Math.min(x,x1))-.3+Math.sin(x*1.3)*.2,.5,.5,'rgba(240,244,244,.5)');
  towerQuay22(g,O,L)}
function towerQuay22(g,O,L){const K=SHARED.coast,{x0,x1,top}=TWQuay22,side=4,fx=x0+side,ft=BWQuay22.B(x1)+.2;
  K.land(g,L,.2,q=>{
    /* its shadow on the water, to the left and away */
    comp(q,'multiply',.3,()=>poly(q,[x0,ft-1.2,x0-10,ft-2.2,x0-11,ft-1,x0,ft],'#4a5070'));
    /* the left face, in shade */
    const LF=[x0,top+1.2,fx,top,fx,ft,x0,ft-.6];poly(q,LF);q.fillStyle=lg(q,0,top,0,ft,['#b2a48c','#9c907c']);q.fill();
    clipTo(q,()=>poly(q,LF),()=>tex(q,'mott',.4,x0,top,side,ft-top,'overlay',1));
    /* the front, in the sun, in courses whose joints stop inside them */
    q.fillStyle=lg(q,fx,0,x1,0,['#efdcb8','#fbeccc']);q.fillRect(fx,top,x1-fx,ft-top);
    inRect(q,fx,top,x1-fx,ft-top,()=>{tex(q,'mott',.4,fx,top,x1-fx,ft-top,'overlay',1);
      let j=0;for(let y=top+4.2;y<ft-1;y+=4.2,j++){R(q,fx,y,x1-fx,.4,'rgba(120,96,80,.3)');R(q,fx,y+.4,x1-fx,.4,'rgba(255,248,230,.2)');
        for(let x=fx+1.6+((j*3.1)%4.4);x<x1-1.4;x+=5.4)R(q,x,y+.8,.4,3,'rgba(120,96,80,.24)')}
      R(q,x1-.6,top,.6,ft-top,'rgba(255,250,236,.4)')});
    /* the cornice and a low parapet, both as wide as the tower; one small square window high on its front */
    R(q,x0-.6,top-.8,x1-x0+1.2,1.4,'#e6d6b6');R(q,x0-.6,top-.8,x1-x0+1.2,.5,'#fff6e0');R(q,x0-.6,top+.6,x1-x0+1.2,.4,'rgba(60,50,60,.4)');
    R(q,x0,top-2.4,x1-x0,1.6,'#d4c4a2');R(q,x0,top-2.4,x1-x0,.5,'#fbeed4');R(q,x0,top-2.4,side,1.6,'#b8aa90');
    R(q,fx+5.4,top+2,1.4,1.4,'#4a3e3e');
    /* wet at its foot */
    q.fillStyle=lg(q,0,ft-2.6,0,ft,['rgba(40,56,48,0)','rgba(40,56,48,.6)']);q.fillRect(x0,ft-2.6,x1-x0,2.6)});
  for(let x=x0;x<x1+1;x+=.5)R(g,x,ft-.2+Math.sin(x*1.7)*.2,.5,.5,'rgba(244,246,244,.55)')}
/* the paving where everybody walks: worn pale along the strip, stained and chipped elsewhere, damp along the lip */
function wearQuay22(g,r){const S=y=>(y-QUAY22.hz)/70;
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,106,0,140,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,106,320,34)});
  for(let i=0;i<150;i++){const y=100+Math.pow(r(),.8)*44,k=S(y),x=r()*320;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.14)':'rgba(255,246,224,.15)')}
  for(let i=0;i<18;i++){const y=108+r()*34,k=S(y),x=r()*320;oval(g,x,y,(5+r()*13)*k,(1.2+r()*1.6)*k,r()<.6?'rgba(104,86,70,.1)':'rgba(255,244,220,.09)')}
  for(let i=0;i<60;i++){const x=r()*320;R(g,x,QUAY22.edge+3.2+r()*2.4,1+r()*5,.5,r()<.5?'rgba(84,98,68,.28)':'rgba(70,60,56,.22)')}}
/* the coaster of Adramyttium, painted once by the shared painter and set into the picture by draw(): her own coordinates are the room's,
   shifted 12 to the right and down so that her posts and her mast's head fit the sprite */
const COASTER22=[];
function coasterQuay22(){if(COASTER22[0])return COASTER22[0];
  const[x0,x1,top,wl]=QUAY22.ship,mx=x0+.47*(x1-x0);
  return COASTER22[0]=bake(190,g=>{g.translate(-x0+12,12);
    SHARED.ship.paint(g,{seed:2201,dir:1,view:'full',x0,x1,yBot:wl+8,yWaist:top,bowRise:8,bowSpan:34,bowPow:2.2,sternRise:13,sternSpan:36,sternPow:2.2,
      palette:'lit',gradY0:top-8,gradY1:wl+8,mast:{x:mx,y0:-14,y1:top+16,w:2.8,stays:[[mx+1.4,-14,x0-1.4,top-14.6],[mx+1.4,-14,x1-6,top-7]],stayCol:'#6a5a48',stayW:.5},
      pitch:{f0:.56,color:'rgba(24,14,8,.44)'},wale:{f0:.12,f1:.22,color:'#7e3828'},lowerWale:{f0:.46,f1:.53,color:'#2e1c10',hi:'#a87e4c'},
      beams:{f:.32,x0:x0+16,x1:x1-12,step:17,w:1.6,h:1.6,color:'#22140c',hi:'#c89a60'},buttX0:x0+12,buttX1:x1-6,buttStepMin:20,buttStepVar:18,
      rail:{x0:x0+2,x1:x1-2,h:1.3,color:'#9e7442',hi:'#e6c082'},stem:{thick:2.4,sweep:6,rimCol:'#e6c082',capCol:'#c89a60'},stern:{thick:2.6,sweep:8,rimCol:'#f0cc90',capCol:'#d4a66a'},
      furledYard:{x0:mx+3,x1:x1-28,yardX0:mx+2.8,yardX1:x1-22,bays:5,th0:3.4,th1:2,belly:.6}})},12,140)}
/* the gangplank from her rail over the stone edge to the paving: two side stringers, cleats that stop inside them, no seam along it */
function plankQuay22(g,bob){const[a,b,c,d]=QUAY22.plank,w0=8,w1=11,x0=a-4,y0=b+bob,x1=c-5.5,y1=d,P=[x0,y0,x0+w0,y0,x1+w1,y1,x1,y1];
  comp(g,'multiply',.36,()=>poly(g,[x1-1,y1+1.2,x1+w1+3,y1+1.2,x1+w1+1,y1-1.4,x1-2.4,y1-1],'#3a3048'));
  poly(g,P);g.fillStyle=lg(g,x0,y0,x1,y1,['#a07a4a','#8a6438','#76522c']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'wood',.22,x0-2,y0-2,x1-x0+w1+4,y1-y0+4,'overlay',.5);
    for(let i=1;i<=6;i++){const t=i/7,lx=x0+(x1-x0)*t,rx=x0+w0+(x1+w1-(x0+w0))*t,cy=y0+(y1-y0)*t,ax=lx+(rx-lx)*.2,bx=lx+(rx-lx)*.8;
      R(g,ax,cy-.3,bx-ax,.8,'#5a3c20');R(g,ax,cy-.6,bx-ax,.4,'rgba(255,220,160,.45)')}});
  stroke(g,[x0,y0,x1,y1],'#5e4024',.6);stroke(g,[x0+w0,y0,x1+w1,y1],'#e0b680',.6);
  /* its foot on the paving, and the soft contact shadow under it */
  R(g,x1-.4,y1-.6,w1+.8,.8,'#4a3420');comp(g,'multiply',.4,()=>oval(g,x1+w1/2,y1+.6,w1*.7,1.2,'#3a3048'))}
/* what moves: the sea; the coaster on the swell behind the quay's edge, with her mooring lines, and her pulling away as 27:2 is told */
function drawQuay22(g,t){const off=G.off22||0,{edge}=QUAY22,bob=Math.round(Math.sin(t/1400)*1.2)/2,dx=off*off*(3-2*off)*200;
  if(SQuay22)SQuay22.draw(g,t);
  const[x0,x1]=QUAY22.ship;
  /* the wake she leaves as she goes */
  if(off>0)for(let i=0;i<14;i++){const x=x0+dx-6-i*7,k=1-i/14;if(x<x0-20)break;R(g,x,edge-4-(i%3)*1.4,4+3*k,.5,rgba('#f4f6f4',.45*k*Math.min(1,off*4)))}
  inRect(g,0,0,320,edge,()=>g.drawImage(coasterQuay22(),x0-12+dx,bob-12,190,140));
  if(off>0)return;
  /* her two mooring lines, from her stern post and her stem below the level of the eyes, sagging to the stones on the quay beyond her
     two ends: neither lies across her planks, and neither crosses the horizon */
  const H=SHARED.ship.hawser;H(g,x0-1.6,83+bob,132+2,edge+1.4,1.6,{w:.7});H(g,x1+1.4,83+bob,316-1,edge+1.4,1.2,{w:.7});
  plankQuay22(g,bob)}
/* the rail of the coaster at x (her waist is level, her posts rise at the ends) */
const top22q=x=>{const[x0,x1,top]=QUAY22.ship;return top-8*Math.pow(clamp((x-(x1-34))/34,0,1),2.2)-13*Math.pow(clamp((x0+36-x)/36,0,1),2.2)};
/* ==== ART quay22: end ==== */

/* ==== ART myra22: begin ==== */
/* The harbor of Myra in Lycia (27:5, 6), two screens wide, as the maintainer approved it (the grain ship's mockup, 26 November 2026):
   the steep mountains of Lycia rise from the far side of the harbor along the whole width, so that no line of sea and sky is seen
   anywhere and every mast stands against rock and sky. The sun of the afternoon stands behind us at the left: the ships are lit from
   the left, and every shadow falls to the right and away. No temple anywhere in the harbor (Myra is not one of CONTRIBUTING section 3's
   four cities); no figurehead.
   Behind the quay's edge (y 106) the great grain ship of Alexandria lies moored, her bow to the right (SHARED.grainship.side, hull
   100..460, len 360, waterline 108): her swan's neck at the stern, her mast and her raked foremast running out of the top of the
   picture, her yard lowered on deck with the sail furled on it, her two anchors hung at her bow (the exception of CONTRIBUTING section
   3), her skiff on its line astern. Ahead of her lies the coaster they came in from Caesarea (478..628). Both rise and fall a little on
   the swell behind the stone edge with their mooring lines, which run from their ends outside their hulls to the mooring stones on the
   quay between and beyond them; only the grain ship's gangplank reaches over the edge onto the paving (from her rail at x 334 to the
   paving at 350, 116), its cleats stopping inside its sides.
   Called from outside: ART.myra22, MYRA22. Reads nothing.
   Hotspots (ROOMS.myra22): the mountains 0,0,640,56 · the grain ship 60,30,410,76 · the coaster 474,52,166,54 · the gangplank 326,60,34,58.
   Walk: 20..620 by 112..138; nothing stands in it. Heads come at y 70..100, against the hulls and the quay: nothing round behind them.
   Light: the afternoon sun behind us at the left (shadows fall to the right). */
const MYRA22={hz:70,edge:106,coaster:[478,628,89,108],ship:{x:100,y:108,len:360},plank:[334,0,350,116],walk:[20,620,112,138]};
/* plank: [x at her rail, (her rail's y comes from her sheer), x and y of its foot on the paving] */
let SMyra22=null;
const oMyra22={w:640,hz:MYRA22.hz,hour:'morning',cloud:.25,seed:22,light:-1};
ART.myra22={w:640,q:12,paint(g){paintMyra22(g)},
  light:{amb:'#f4e6d0',sun:[20,-6,.38],wallY:106},
  draw(g,t){drawMyra22(g,t)},front(){}};
function paintMyra22(g){const K=SHARED.coast,CO=SHARED.country,O=oMyra22,W=640,{hz,edge}=MYRA22;
  K.light(O);K.sky(g,O);
  SMyra22=K.sea(g,O);
  /* the mountains of Lycia, rising steeply from the far side of the harbor: a far range in the haze and a near one over the water. Their
     foot at the water lies below the coaster's rail, so that her hull hides it and her mast crosses no level line */
  const base=91,f1=x=>66+16*Math.sin(x/61+1)+9*Math.abs(Math.sin(x/23))+5*Math.sin(x/9.4+2)+2*Math.sin(x/3.1),
    f2=x=>36+14*Math.sin(x/47+.6)+7*Math.abs(Math.sin(x/17+1))+3*Math.sin(x/5.3)+1.4*Math.sin(x/2.1);
  K.land(g,K.light(O),.4,q=>CO.range(q,0,W,base,f1,['#6a7896','#5a6884','#4c5a72'],{k:.8}));
  K.land(g,K.light(O),.28,q=>{const P=[0,base];for(let x=0;x<=W;x+=1)P.push(x,base-f2(x));P.push(W,base);CO.crag(q,P,'#8e8a70',2207,{light:-1,dip:.08,bed:6,scrub:160})});
  /* the foot of the far shore: rock, wet and dark at the water, a lace of foam */
  for(let x=0;x<W;x+=.5){const y=base-1.5+Math.sin(x/7)*.8+Math.sin(x/2.3)*.4;R(g,x,y,.5,base+1-y,'#3a3a3e');R(g,x,base+.6,.5,.5,'rgba(230,236,240,.5)')}
  SMyra22.open=(x,y)=>y>base+1.2&&y<edge-.5&&!(x>14&&x<640&&y>58&&shipCover22(x,y));
  /* the quay in front: its edge hides the hulls at the water; the mooring stones between and beyond the two ships */
  K.quay(g,O,{view:'top',y:edge,y1:144,bollards:[86,469,634],c:'#c8bc9c',cope:'#d6caa8',seed:43});
  const r=rng(2215);
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,112,0,140,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,112,W,28)});
  for(let i=0;i<220;i++){const y=110+Math.pow(r(),.8)*34,k=(y-hz)/74,x=r()*W;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.13)':'rgba(255,246,224,.14)')}
  for(let i=0;i<90;i++){const x=r()*W;R(g,x,edge+3.2+r()*2.4,1+r()*5,.5,r()<.5?'rgba(84,98,68,.26)':'rgba(70,60,56,.2)')}
  ao(g,0,126,W,18,'b',.12,'#2a2050')}
/* where the ships cover the water (so that the sea's motion leaves them alone): a rough box round each hull above the quay's edge */
const shipCover22=(x,y)=>x>16&&x<470&&y>62||x>474&&x<634&&y>80;
/* the grain ship with her skiff astern, and the coaster, each painted once by the shared painters and set into the picture by draw() */
const SPR22={};
function grainMyra22(){if(SPR22.g)return SPR22.g;const S=MYRA22.ship;
  return SPR22.g=bake(470,g=>{g.translate(-10,24);const GS=SHARED.grainship,r=rng(7);
    /* the skiff on its line astern */
    SHARED.ship.paint(g,{r,dir:1,view:'full',x0:22,x1:64,yBot:108,sheer:x=>101.5-1.6*Math.pow(clamp((x-54)/10,0,1),2)-2*Math.pow(clamp((32-x)/10,0,1),2),
      gradY0:96,gradY1:108,hullGrad:['#9a7a58','#7c5e40','#5c4430','#3e2c20'],pitch:false,wale:{f0:.1,f1:.22,color:'#8c4a30'},lowerWale:false,
      seams:[.22,.4,.58,.76],seamDark:'rgba(30,18,10,.45)',buttCourses:[],beams:false,underRailShadow:false,texRect:{x:20,y:94,w:48,h:16},aoH:4,aoA:.3,
      rail:{x0:24,x1:62,h:.7,color:'#8a6a48',hi:'#efdcb4'},stem:{thick:1.2,sweep:2,headRise:1.4,rimCol:'#e8cc98',capCol:'#c8a46e',rimW:.45},stern:{thick:1.2,sweep:3,headRise:1.6,rimCol:'#e8cc98',capCol:'#c8a46e',rimW:.45}});
    const G=GS.side(g,{x:S.x,y:S.y,len:S.len,state:'moored',post:'bird',anchors:true});
    GS.hawser(g,63.5,100,G.edgeAt(G.STERN,94)+1,94,2.5,GS.LIGHT.day,.6)},12,140)}
function coasterMyra22(){if(SPR22.c)return SPR22.c;
  return SPR22.c=bake(170,g=>{g.translate(-470,24);
    SHARED.ship.paint(g,{seed:2201,dir:1,view:'full',x0:478,x1:628,yBot:108,yWaist:89,bowRise:7,bowSpan:30,bowPow:2.2,sternRise:12,sternSpan:34,sternPow:2.2,
      palette:'lit',gradY0:76,gradY1:108,mast:{x:548,y0:-24,y1:92,w:2.8,stays:[[549.4,-24,486,86],[549.4,-24,620,82]],stayCol:'#6a5a48',stayW:.5},
      pitch:{f0:.54,color:'rgba(24,14,8,.44)'},wale:{f0:.13,f1:.23,color:'#7e3828'},lowerWale:{f0:.47,f1:.54,color:'#2e1c10',hi:'#a87e4c'},
      beams:{f:.33,x0:494,x1:616,step:16,w:1.6,h:1.6,color:'#22140c',hi:'#c89a60'},buttX0:490,buttX1:622,buttStepMin:20,buttStepVar:18,
      rail:{x0:480,x1:626,h:1.3,color:'#9e7442',hi:'#e6c082'},stem:{thick:2.4,sweep:6,rimCol:'#e6c082',capCol:'#c89a60'},stern:{thick:2.6,sweep:8,rimCol:'#f0cc90',capCol:'#d4a66a'},
      furledYard:{x0:551,x1:606,yardX0:550.8,yardX1:612,bays:5,th0:3.4,th1:2,belly:.6},
      rudders:[{loom:[487,86,489.4,86,481,104,478.6,104],blade:[478,100,481.8,100,480,107,476.4,107],hi:[488.4,86.4,480,104]}]})},12,140)}
/* the grain ship's gangplank from her rail over the stone edge to the paving: two side stringers, cleats that stop inside them */
function plankMyra22(g,bob){const G=SHARED.grainship.geo(MYRA22.ship),[a,,c,d]=MYRA22.plank,w0=8,w1=11,x0=a-4,y0=G.sheer(a)+.6+bob,x1=c-5.5,y1=d,P=[x0,y0,x0+w0,y0,x1+w1,y1,x1,y1];
  comp(g,'multiply',.36,()=>poly(g,[x1-1,y1+1.2,x1+w1+3,y1+1.2,x1+w1+1,y1-1.4,x1-2.4,y1-1],'#3a3048'));
  poly(g,P);g.fillStyle=lg(g,x0,y0,x1,y1,['#a07a4a','#8a6438','#76522c']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'wood',.22,x0-2,y0-2,x1-x0+w1+4,y1-y0+4,'overlay',.5);
    for(let i=1;i<=8;i++){const t=i/9,lx=x0+(x1-x0)*t,rx=x0+w0+(x1+w1-(x0+w0))*t,cy=y0+(y1-y0)*t,ax=lx+(rx-lx)*.2,bx=lx+(rx-lx)*.8;
      R(g,ax,cy-.3,bx-ax,.8,'#5a3c20');R(g,ax,cy-.6,bx-ax,.4,'rgba(255,220,160,.45)')}});
  stroke(g,[x0,y0,x1,y1],'#e0b680',.6);stroke(g,[x0+w0,y0,x1+w1,y1],'#5e4024',.6);
  R(g,x1-.4,y1-.6,w1+.8,.8,'#4a3420');comp(g,'multiply',.4,()=>oval(g,x1+w1/2,y1+.6,w1*.7,1.2,'#3a3048'))}
/* what moves: the sea, and the two ships on the swell behind the quay's edge with their mooring lines */
function drawMyra22(g,t){const{edge}=MYRA22,b1=Math.round(Math.sin(t/2100)*1)/2,b2=Math.round(Math.sin(t/1500+1)*1.4)/2;
  if(SMyra22)SMyra22.draw(g,t);
  inRect(g,0,0,640,edge,()=>{g.drawImage(grainMyra22(),10,b1-24,470,140);g.drawImage(coasterMyra22(),470,b2-24,170,140)});
  const G=SHARED.grainship.geo(MYRA22.ship),H=SHARED.ship.hawser;
  /* the grain ship: from under her stern gallery, and from her stem below the eyes; the coaster: from her stern post and her stem */
  H(g,G.edgeAt(G.STERN,92)-1,92+b1,86+2,edge+1.4,2,{w:.8});H(g,G.edgeAt(G.STEM,94)+1.6,94+b1,469-2,edge+1.4,1.6,{w:.8});
  H(g,476,95+b2,469+2,edge+1.4,.8,{w:.7});H(g,631,93+b2,634-1,edge+1.4,.8,{w:.7});
  plankMyra22(g,b1)}
/* ==== ART myra22: end ==== */

/* ==== ART deck22: begin ==== */
/* The grain ship's deck, seen from aboard looking aft (SHARED.grainship.deck, as the maintainer approved it): the after half of her deck in
   perspective, rising aft to the cabin across the after deck, the heads of the two steering oars at the quarters, the swan's neck at
   the stern beyond; the hatch in front of the cabin, the windlass beside it, the mainmast's foot in the right foreground running out
   of the top of the picture, the passengers' bedding and a water jar along the port rail. The land rises behind every rail, so that
   no line of water is seen behind the mast. Two states:
     Myra in the evening (variant m, ms with the shelter): the low sun at the port side behind us (the deck's light 'evening'): every
       face turned to port is lit and every shadow runs long to the right and away. Beyond the stern the harbor's long stores on the quay
       at the right and the mountains of Lycia, lit low from the left. The spare anchor lies on the deck as it was (the exception of
       CONTRIBUTING section 3), with its look line.
     Fair Havens by day (variant h): the sun high at the right behind us. Beyond the stern the high land of Crete over the small bay; at
       the left, low over the port rail, it falls to the water, and the open sea is seen there to the horizon past two small islands,
       far from the mast. The anchor is down: its cable comes aft along the deck from forward to the windlass and comes in as 27:13 is
       told (G.cable22 1..0); no anchor is seen.
   The script's deckhouse is the cabin (narrowed a little, [-1.8, 1.8] m, so that the staff at the end of its roof stands clear of the
   tillers). On the port end of its roof, at the very corner of its eave, a short staff carries the pennant, which streams out to the
   left at Myra and at Fair Havens: the wind comes from the right (starboard), and the cabin keeps it off its left (port) side, the lee,
   where the shelter goes; its right side is the weather side. Paul's shelter (F.shelter, Myra only) stands in that lee between the cabin
   and the port rail (SHARED.grainship, o.shelter): no pole, cords slanting at its corners, his bedding, the bundle and a loaf under it,
   and on the bundle a gull (the room's birds) until the night.
   Called from outside: ART.deck22, DECK22. Reads F.fh (the variant), F.shelter, G.cable22.
   Hotspots (ROOMS.deck22): the harbor 0,0,320,58 · the open sea (Fair Havens) 0,62,88,22 · the pennant 104,38,26,26 · the deckhouse
   (the cabin) 118,60,64,30 · the lee of the deckhouse 80,58,46,32 · beside the deckhouse 184,58,38,32 · the hatch 112,86,70,20 · the
   anchor (Myra) 168,82,64,38 · the shelter (when it stands) 80,58,48,34 · the gull on the bundle 104,72,14,12 · the anchor cable (Fair
   Havens) 172,78,44,30. Walk: 20..300 by 106..138, round the mast's foot, the anchor (Myra), the bedding and a coil of rope.
   Light: Myra in the evening, the low sun at the left (long shadows to the right); Fair Havens by day, the sun high at the right. */
const DECK22={cabin:[-1.8,1.8,11.3,14.2,1.75],walk:[20,300,106,138]};
const deckO22=v=>({place:v[0]==='h'?'fairhavens':'myra',light:v[0]==='h'?'day':'evening',cabin:DECK22.cabin,staff:true,shelter:v==='ms',anchor:v[0]!=='h',bare:v[0]==='h'?[[1.74,1.86]]:[],beyond:v[0]==='h'?havensBeyond22:myraBeyond22});
let SDeck22=null;
ART.deck22={w:320,q:12,variant:()=>(F.fh?'h':'m')+(F.shelter&&!F.fh?'s':''),
  paint(g,v){SDeck22=null;SHARED.grainship.deck(g,deckO22(v))},
  get light(){return F.fh?{amb:'#ece6da',sun:[-14,-8,.3],wallY:100}:{amb:'#f0d2b0',sun:[30,-5,.4],wallY:100}},
  draw(g,t){drawDeck22(g,t)},front(){},
  props:[{y:129.8,shape(g,v){SHARED.grainship.deckCut(g,deckO22(v),'mast')},foot:()=>[deckFoot22('mast')]},
    {y:118.1,shape(g,v){if(v[0]==='m')SHARED.grainship.deckCut(g,deckO22(v),'anchor')},foot:v=>v[0]==='m'?[deckFoot22('anchor')]:[]},
    {y:108.6,shape(g,v){SHARED.grainship.deckCut(g,deckO22(v),'bed')},foot:()=>[deckFoot22('bed')]}]};
const deckFoot22=k=>SHARED.grainship.geoDeck({cabin:DECK22.cabin}).foot[k].slice();
/* what lies beyond the ship. At Myra in the evening: the deck painter's own harbor of Myra (its stores on the quay at the right, the
   spurs of the mountains behind), in the light of the evening from the left */
function myraBeyond22(g,D){const K=SHARED.coast,CO=SHARED.country,base=100,O={w:320,hz:D.hz,hour:'evening',cloud:.22,streak:.4,seed:2206,light:-1};
  const L=K.light(O);K.sky(g,O);
  const fm=x=>88+12*Math.sin(x/47+1)+8*Math.abs(Math.sin(x/19))+3*Math.sin(x/6.1),fn=x=>46+10*Math.sin(x/33+.4)+5*Math.abs(Math.sin(x/11))+1.5*Math.sin(x/3.7);
  K.land(g,L,.08,q=>CO.range(q,0,320,base,fm,['#6a7890','#5a687e','#4c586c'],{k:.8,light:-1}));
  K.land(g,L,.12,q=>{const P=[0,base];for(let x=0;x<=320;x++)P.push(x,base-fn(x));P.push(320,base);CO.crag(q,P,'#9a927a',2209,{light:-1,dip:.06,bed:5,scrub:110})});
  /* the quay at the right: its long stores of stone with low tiled roofs, their doors wide, their fronts in the shade of the evening */
  K.land(g,L,.05,q=>{for(const[x,w,h]of[[206,64,30],[268,60,34],[324,20,30]]){const top=base-h;
    q.fillStyle=lg(q,x,0,x+w,0,['#cabca0','#d0c4a8','#b4a88e']);q.fillRect(x,top,w,h);tex(q,'mott',.35,x,top,w,h,'overlay',.8);
    for(let y=top+4;y<base;y+=4)R(q,x,y,w,.5,'rgba(90,76,60,.25)');
    poly(q,[x-2,top+.5,x+w+2,top+.5,x+w-3,top-6,x+3,top-6],'#a8603e');for(const f of[.3,.6,.85])R(q,x+3-f*5,top-6+f*6.5,w-6+f*10,.5,'rgba(70,30,20,.4)');R(q,x-2,top,w+4,.5,'rgba(40,24,20,.5)');
    for(let dx=8;dx<w-10;dx+=18){R(q,x+dx,base-15,9,15,'#2a2018');R(q,x+dx,base-15,9,.6,'#8a7a62')}
    comp(q,'multiply',.25,()=>R(q,x,top-6,w,h+6,'#8a7aa0'))}});
  /* the low sun from the left warms the land and the sky on that side */
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,170,90,1)','rgba(255,190,130,.4)','rgba(170,150,200,.3)']);g.fillRect(0,0,320,100)})}
/* At Fair Havens by day: the high land of Crete over the small bay; at the left it falls to the water, and the open sea lies there to
   the horizon past two small islands, low over the port rail and far from the mast (which stands against the land at the right) */
function havensBeyond22(g,D){const K=SHARED.coast,CO=SHARED.country,base=100,O={w:320,hz:D.hz,hour:'midday',cloud:.35,seed:2208,light:1,
    wind:SHARED.weather?SHARED.weather.wind({from:'e',force:2,view:'w'}):undefined};
  const L=K.light(O);K.sky(g,O);
  K.isle(g,10,38,2.2,O,{dist:.86,seed:2216});K.isle(g,46,64,1.4,O,{dist:.9,seed:2217});
  const S=K.sea(g,Object.assign({},O,{y1:base}));
  /* the land: high toward the stern and the right, falling at the left to a point that runs down into the water */
  const ramp=x=>clamp((x-64)/40,0,1),ease=k=>k*k*(3-2*k),
    fm=x=>(92+16*Math.sin(x/61+2.2)+6*Math.abs(Math.sin(x/23+1))+3*Math.sin(x/7.3))*ease(clamp((x-90)/50,0,1)),
    fn=x=>(52+9*Math.sin(x/41+1.4)+6*Math.abs(Math.sin(x/14+.5))+1.5*Math.sin(x/4.1))*ease(ramp(x))+(x<104?Math.max(0,3.4-Math.abs(x-84)*.4)*ramp(x+20):0);
  K.land(g,L,.08,q=>CO.range(q,0,320,base,fm,['#6a7890','#5a687e','#4c586c'],{k:.8,light:1}));
  K.land(g,L,.12,q=>{const P=[0,base];for(let x=0;x<=320;x++)P.push(x,base-fn(x));P.push(320,base);CO.crag(q,P,'#a49a7c',2210,{light:1,dip:-.05,bed:5,scrub:180})});
  /* the point's foot in the water: wet rock and a lace of foam where it meets the sea */
  for(let x=60;x<108;x+=.5){const y=base-fn(x);if(y>D.hz+.5&&y<base-.5){R(g,x,y-.2,.5,.8,'#3a3a40');if((x*2|0)%3)R(g,x-.5,y+.6,.5,.5,'rgba(236,240,240,.5)')}}
  /* the sea moves where it is seen: above the port rail, left of the point */
  const rail=[];for(let z=2.2;z<12;z+=.25)rail.push(D.P(-D.b(z),D.s(z)+D.rh(z),z));
  const railY=x=>{for(let i=1;i<rail.length;i++){const[a,b]=rail[i-1],[c,d]=rail[i];if(x>=a&&x<=c)return b+(d-b)*(x-a)/(c-a||1)}return x<rail[0][0]?rail[0][1]:0};
  S.open=(x,y)=>y>D.hz+.5&&y<railY(x)-.8&&y<base-fn(x)-.6;SDeck22=S;SDeck22.O=O}
/* the pennant on its staff: a long narrow cloth that streams out to the left (the wind comes from the right), waving, its tail narrowing */
function pennantDeck22(g,t){const S=SHARED.grainship.staffOf(SHARED.grainship.geoDeck({cabin:DECK22.cabin})),[hx,hy]=S.head,n=14,L=17,
    up=[],dn=[];
  for(let i=0;i<=n;i++){const k=i/n,x=hx-.6-k*L,w=Math.sin(t/230-k*5.2)*1.6*k+Math.sin(t/470-k*2.4)*.5*k,yc=hy+1.4+k*1.6+w,hw=1.5*(1-k*.72);up.push(x,yc-hw);dn.unshift(x,yc+hw)}
  const P=up.concat(dn);poly(g,P,F.fh?'#a83428':'#9a2c22');
  clipTo(g,()=>poly(g,P),()=>{R(g,hx-L-2,hy-4,L+3,2.6+1.4,F.fh?'rgba(255,200,170,.28)':'rgba(255,170,110,.3)')})}
/* the anchor cable at Fair Havens: from forward (out of the picture at the foot) aft along the deck and up to the windlass's drum; it
   comes in as 27:13 is told (k from 1 to 0): its strands run aft toward the drum, and at the end it is all wound and nothing is seen
   of the anchor. Drawn by depth, piece by piece, so that whoever stands nearer covers it. */
function cableDeck22(g,t,k){if(k<=0)return;const D=SHARED.grainship.geoDeck({cabin:DECK22.cabin}),{P,s}=D,x=1.8,run=(1-k)*6,pts=[];
  /* it lies along the middle of one plank, which keeps no butt joint (o.bare), and rises to the drum's lower front, where it winds on */
  for(let z=2.9;z<=10.56;z+=.18){const lift=z<8.4?.07:.07+(.27-.07)*Math.pow((z-8.4)/2.16,1.4);pts.push([z,...P(x,s(z)+lift,z),...P(x,s(z),z)])}
  for(let i=1;i<pts.length;i++){const[z0,ax,ay,,fy]=pts[i-1],[z1,bx,by]=pts[i],w=Math.max(.6,D.F*.07/z0);
    depth(Math.min(fy,138.5),()=>{if(z0<8.4)comp(g,'multiply',.35,()=>stroke(g,[ax+.6,ay+w*.6,bx+.6,by+w*.6],'#3a3050',w*1.4));
      stroke(g,[ax,ay,bx,by],'#6a5232',w);stroke(g,[ax,ay-w*.3,bx,by-w*.3],'rgba(220,190,130,.55)',Math.max(.4,w*.3));
      const ph=((z0+run)*3.1)%1;if(ph<.3)R(g,ax-.25,ay-w*.4,.5,w*.8,'rgba(40,28,16,.45)')})}}
function drawDeck22(g,t){if(SDeck22)SDeck22.draw(g,t);pennantDeck22(g,t);if(F.fh)cableDeck22(g,t,G.cable22==null?1:G.cable22)}
/* ==== ART deck22: end ==== */

/* ==== ART storm22: begin ==== */
/* The deck in the storm: the grain ship's own deck (SHARED.grainship.deck), the same picture as deck22 at Myra, looking aft from just
   forward of her mainmast: the hatch in the middle, the cabin across the after deck with the swan's neck of her sternpost beyond it, the
   mast's foot in the right foreground, bare (the gear is lowered, 27:17: whatever it was lies forward of the mast, behind us, and is not
   seen), her bulwarks round her. Nothing of hers stands above her rails but the mast and the post: the sky is left open, and the storm's
   sea and sky (SHARED.storm.deckSea) lie behind her in `behind`, not swayed: great seas running up astern and on both quarters, with no
   horizon. The storm's light on her (no sun: the grey of the cloud), her planks dark with water and a grey sheen of the sky in them.
   She moves (the maintainer, 26 November 2026): `sway` is the storm's own sway for the beat's phase, so that she heels with the very sea
   the player times his step by; `draw` lays the sea that comes aboard on her deck (in her frame), `air` the spray and the rain (not swayed).
   The crossing with the bales (27:18), from hold to hold, each a thing he is plainly seen to hold on to, with clear deck between them: the
   hatch (his far hand on the top of its ladder), a great water cask lashed to the deck between the hatch and the mast (invented), the
   mast, and the lee rail to starboard, past the mast. The sea comes over the port side, at the left (the rain slants down to the right).
   The sailor who calls stands aft by the lee rail, his hand on the mast, where every hold can be seen. In the lee of Cauda (27:16) the
   skiff comes up over the port rail at the left on the men's rope, full of water; the sea is a little lower there. By night (27:20) one
   lantern hangs under the cabin's eave by two cords that part upward (the third and the sixth of Luke's days are nights); its light lies long and low. Lightning far off (lightning:true),
   never over the swan's neck or the mast.
   Called from outside: ART.storm22, STORM22 (holds, way, walk). Reads phase22(), nightNow22(), G.beat, G.sk22 (0..4), G.pull22, G.over22. */
const STORM22={walk:DECK22.walk.slice(),
  /* where whoever crosses stands at each hold, in the order of the crossing: the hatch, the cask, the mast, the lee rail. Each is where
     the far hand of the pose 'hold' (facing right) lies on the thing: the top of the ladder, the rim of the cask, the mast, the rail */
  holds:[[135,110],[194,113],[252,137],[306,126]],
  /* the calling sailor: his place by the lee rail just aft of the mast, his hand on the rail; the way he comes forward clear of the cask and
     the mast; where
     he stands beside the one he walks across, at each hold */
  home:[284,116],gate:[232,120],side:[[14,4],[14,4],[14,3],[-16,8]]};
/* Luke's six days (27:20): the third and the sixth are nights, the others days, so that what he says of the sky stands over the sky
   that is painted (no sun by day, not one star by night); the lantern hangs there only by night */
const nightNow22=()=>phase22()==='tablet'&&(today22()===3||today22()===6);
/* the deck's geometry (shared/grainship.js), and the water cask: upright, its middle at x, z (metres), r its radius, h its height */
let GD22=null;const gd22=()=>GD22||(GD22=SHARED.grainship.geoDeck({cabin:DECK22.cabin}));
const CASK22={x:2.68,z:6,r:.38,h:1.15};
/* the lantern under the cabin's eave, to starboard of the door: [x, y, z] in metres; its two cords go up to the eave at x0 and x1 */
const LANT22={x:1.25,y:1.45,z:11.15,c0:1.0,c1:1.5};
const lant22=()=>{const D=gd22(),y0=D.s(11.3);return{p:D.P(LANT22.x,y0+LANT22.y,LANT22.z),a:D.P(LANT22.c0,y0+1.87,LANT22.z),b:D.P(LANT22.c1,y0+1.87,LANT22.z),floor:D.P(LANT22.x,y0,11.3)}};
/* the storm sea for each picture: by day, a little lower in the lee of Cauda; by night, the dark one, the lantern's light in its rain */
const DS22={};
/* the uprights that stand against the sea, on the screen: the swan's neck and the mast, [middle, half width with a margin for the sway,
   how far the seas' outline falls across it] */
const POSTS22=[[152,11,7],[271,16,9]];
/* the deck's far edge on the screen at x (in her own frame): the top of her floor, where the foot of the port bulwark and the cabin's
   front close it. The sea that comes aboard runs from there, so that its far side follows the deck in perspective and is never a level
   line across it. Worked out once, every pixel from -40 to 360 */
let FOOT22=null;
function foot22(x){if(!FOOT22){const FL=wet22()[0],n=FL.length/2;FOOT22=[];
    for(let X=-40;X<=360;X++){let y=1e9;for(let i=0;i<n;i++){const j=(i+1)%n,x0=FL[2*i],y0=FL[2*i+1],x1=FL[2*j],y1=FL[2*j+1];
      if((X-x0)*(X-x1)>0||x0===x1)continue;y=Math.min(y,y0+(y1-y0)*(X-x0)/(x1-x0))}FOOT22.push(y<1e9?y:82)}}
  return FOOT22[clamp(Math.round(x)+40,0,400)]}
const ds22=v=>DS22[v]||(DS22[v]=SHARED.storm.deckSea({pal:v==='n'?'night':'day',dx:1,slant:.9,rail:70,deck0:82,height:v==='s'?.72:1,seed:2209,foot:foot22,
  lightning:true,clear:[132,300],lamp:v==='n'?[lant22().p[0],lant22().p[1]+4,34]:undefined,
  /* the swan's neck and the mast stand against the seas: there every outline runs down a flank, never level behind them */
  posts:POSTS22}));
/* the moment in the sea: the beat's own phase when it runs here (its whole part counts the seas, so that each is a little different), else
   a clock of six seconds */
const e22=t=>{const b=G.beat;return b&&b.room==='storm22'?(t-b.t0)/b.period:t/6000};
/* how strongly she moves: less in the lee of Cauda and in the dark days, when the sea is not timed */
const sk22v=v=>v==='s'?.75:phase22()==='load'?1:.8;
/* where the sea that comes aboard is seen: the deck, and the inner face of the port bulwark, over which it comes (the weather side) */
let WET22=null;
function wet22(){if(WET22)return WET22;const D=gd22(),FL=D.C.map(([x,z])=>D.P(x,D.s(z),z)).flat().concat([340,190,-20,190]),T=[],B=[];
  for(let z=2.2;z<=13;z+=.25){const x=-D.b(z);T.push(...D.P(x,D.s(z)+D.rx(x,z)+.1,z));B.push(...D.P(x,D.s(z),z))}
  return WET22=[FL,T.concat(rev22(B))]}
/* the port rail's top, outboard of which the skiff is seen: the line over the rail, and the region above it */
function portTop22(){const D=gd22(),p=[];for(let z=4;z<=12.6;z+=.25){const x=-D.b(z);p.push(...D.P(x,D.s(z)+D.rx(x,z)+.1,z))}return p}
ART.storm22={w:320,q:12,variant:()=>nightNow22()?'n':phase22()==='skiff'?'s':'d',bleed:28,
  paint(g,v){paintStorm22(g,v)},
  /* the storm: an overcast sky and rain, a soft light from everywhere, so no sun casts a shadow; by night the lantern under the cabin's
     eave is the one light, and it lies low and far back */
  get light(){if(!nightNow22())return{amb:'#9aa0ac'};const L=lant22();return{amb:'#4a5068',lamps:[[L.p[0],L.p[1],96,'#7a5636',L.floor[1],L.p[1]]]}},
  behind(g,t){const v=ART.storm22.variant();ds22(v).draw(g,t,e22(t))},
  sway(t){const v=ART.storm22.variant(),s=ds22(v).sway(e22(t),sk22v(v));return{a:s.a,dx:s.dx,dy:s.dy,cx:s.px,cy:s.py}},
  draw(g,t){drawStorm22(g,t)},
  air(g,t){const v=ART.storm22.variant();ds22(v).front(g,t,e22(t))},
  front(){},
  /* what stands on her deck is laid over the sea that comes aboard and over whoever stands behind it: the mast and the cask (inside the
     walkable strip, with their footprints), and the hatch with its ladder, the cabin and the windlass (behind it) */
  props:[{y:129.8,shape(g,v){SHARED.grainship.deckCut(g,stormO22(v==='n'),'mast')},foot:()=>[gd22().foot.mast.slice()]},
    {y:108.6,shape(g,v){SHARED.grainship.deckCut(g,stormO22(v==='n'),'bed')},foot:()=>[gd22().foot.bed.slice()]},
    {y:112,shape(g){caskDraw22(g,'#000',1)},foot:()=>[caskFoot22()]},
    ...['hatch','cabin','windlass'].map(k=>({get y(){const D=gd22();return D.P(0,D.s(D.things[k][2]),D.things[k][2])[1]},shape(g){thingShape22(g,k)}}))]};
/* the backdrop: the deck in the storm's light, with nothing beyond her (the sea is `behind`), wet; the cask; by night the lantern's glow */
/* the deck's options: deck22's deck (its narrowed cabin), in the storm's light, with nothing beyond her, no anchor on deck, no shelter,
   and no pennant: its staff is struck for the storm, so that no thin upright stands across the white crest of a sea behind it
   (CONTRIBUTING section 3) */
const stormO22=(N,floor)=>({beyond:()=>{},anchor:false,light:N?'night':'storm',cabin:DECK22.cabin,staff:false,floor});
function paintStorm22(g,v){const N=v==='n',GS=SHARED.grainship,r=rng(2204);
  /* the deck is wet: the bare planks darker and cooler, the grey of the sky lying in them, strongest far aft where we look along them;
     streaks of water along the planks, running toward the vanishing point as the planks do; long low pools where it lies. Painted on the
     planks before anything that stands on them; then all of her a little darker in the wet */
  const wet=(g,D)=>{const FL=D.C.map(([x,z])=>D.P(x,D.s(z),z)).flat().concat([340,190,-20,190]);clipTo(g,()=>poly(g,FL),()=>{
    comp(g,'multiply',N?.3:.24,()=>{g.fillStyle=N?'#3a4060':'#6a7488';g.fillRect(-20,40,360,110)});
    comp(g,'screen',N?.05:.16,()=>{g.fillStyle=lg(g,0,80,0,144,['#c8d0d8','#8a94a0','rgba(0,0,0,0)']);g.fillRect(-20,60,360,90)});
    for(let i=0;i<150;i++){const u=-1.1+r()*2.2,z0=2.4+r()*7,z1=z0+.4+r()*1.6,a=D.P(u*D.b(z0)*.95,D.s(z0),z0),b=D.P(u*D.b(z1)*.95,D.s(z1),z1);
      stroke(g,[a[0],a[1],b[0],b[1]],r()<.6?`rgba(200,210,220,${N?.05:.14})`:`rgba(20,24,34,${N?.2:.18})`,.5)}
    for(let i=0;i<9;i++){const x=-3.5+r()*7,z=3+r()*6,c=D.P(x,D.s(z),z),w=4*(6+r()*10)/z;comp(g,'screen',N?.04:.12,()=>poly(g,[c[0]-w,c[1],c[0]-w*.4,c[1]-.6,c[0]+w*.5,c[1]-.5,c[0]+w,c[1],c[0]+w*.3,c[1]+.6,c[0]-w*.5,c[1]+.5],'#c0c8d4'))}})};
  GS.deck(g,stormO22(N,wet));
  comp(g,'source-atop',1,()=>comp(g,'multiply',N?.3:.24,()=>{g.fillStyle=N?'#3a4060':'#6a7488';g.fillRect(-30,-30,380,200)}));
  caskDraw22(g,null,0,N);
  if(N){const L=lant22(),[lx,ly]=L.p;
    /* the lantern's light: the eave above it keeps it from the roof, so it falls outward and down the cabin's front, widening, in soft
       steps; and a long low pool on the deck before it. Nothing round, nothing above the lantern */
    /* From here the hatch hides the deck before the cabin (its far coaming stands level with the cabin's foot), so the light and its
       pool are never laid over the hatch's opening, which stays dark with the hold below it, nor over the coaming's front, which is
       turned away from the lantern: only the top of the coaming, facing up, catches it, and the deck beside the hatch */
    const D=gd22(),[hx0,hx1,hz0,hz1,hh]=D.things.hatch,cw=.22,hp=(x,y,z)=>D.P(x,y,z),
      dark=[[...hp(hx0,D.s(hz0),hz0),...hp(hx1,D.s(hz0),hz0),...hp(hx1,D.s(hz0)+hh,hz0),...hp(hx0,D.s(hz0)+hh,hz0)],
        [...hp(hx0+cw,D.s(hz0)+hh,hz0+cw),...hp(hx1-cw,D.s(hz0)+hh,hz0+cw),...hp(hx1-cw,D.s(hz1)+hh,hz1-cw),...hp(hx0+cw,D.s(hz1)+hh,hz1-cw)]],
      offHatch=(x,y,w,h)=>{g.beginPath();g.rect(x,y,w,h);for(const q of dark){g.moveTo(q[0],q[1]);for(let i=2;i<q.length;i+=2)g.lineTo(q[i],q[i+1]);g.closePath()}g.clip('evenodd')};
    clipTo(g,()=>offHatch(110,ly-1,84,89-ly),()=>{for(const[w,a]of[[26,.05],[18,.07],[11,.09]])comp(g,'lighter',a,()=>{poly(g,[lx-3,ly,lx+3,ly,lx+w,88,lx-w,88]);g.fillStyle=lg(g,0,ly,0,88,['#ffb060','#a05a20']);g.fill()})});
    clipTo(g,()=>offHatch(100,ly,140,40),()=>comp(g,'lighter',.13,()=>pool(g,lx,L.floor[1]+1,40,4,'#ffa050',1,'source-over')));
    /* the cords, parting upward to the eave, and the lantern: clay and horn, small; the flame is drawn in draw */
    stroke(g,[lx-.7,ly-1.6,L.a[0],L.a[1]],'#4a3a28',.5);stroke(g,[lx+.7,ly-1.6,L.b[0],L.b[1]],'#4a3a28',.5);
    poly(g,[lx-1.6,ly-1.6,lx+1.6,ly-1.6,lx+1.9,ly+2.6,lx-1.9,ly+2.6],'#4a3220');R(g,lx-1.9,ly+2.6,3.8,.6,'#2a1a10');R(g,lx-1.6,ly-1.6,3.2,.5,'#7a5a38')}}
/* a line of x, y pairs, the other way round */
const rev22=p=>{const o=[];for(let i=p.length-2;i>=0;i-=2)o.push(p[i],p[i+1]);return o};
/* the cask's footprint on the floor, [x, y, w, h] */
function caskFoot22(){const D=gd22(),{x,z,r}=CASK22,a=D.P(x-r,0,z-r),b=D.P(x+r,0,z+r);return[+a[0].toFixed(1),+b[1].toFixed(1),+(b[0]-a[0]).toFixed(1),+(a[1]-b[1]).toFixed(1)]}
/* the water cask, standing on its end, lashed to the deck: a broad body of staves (no seams drawn down it, so that nothing upright crosses
   its hoops), three iron hoops round it that follow its curve, its head seen a little from above; two lashings slant from its upper hoop
   out and down to ring bolts in the deck on either side, outside its body, so that no rope crosses it. As a prop (mono) only its outline. */
function caskDraw22(g,mono,cut,N){const D=gd22(),{x,z,r,h}=CASK22,y0=D.s(z),fz=z-r,c=D.P(x,y0,z),cf=D.P(x,y0,fz),k=D.F/z,R0=r*k,
    yb=cf[1],yt=D.P(x,y0+h,fz)[1],bul=t=>1+.08*Math.sin(Math.PI*t),top=D.P(x,y0+h,z)[1],eh=Math.max(1.4,(yt-top)*1.6);
  const side=[];for(let i=0;i<=12;i++){const t=i/12;side.push(c[0]-R0*bul(t),yt+(yb-yt)*t)}for(let i=12;i>=0;i--){const t=i/12;side.push(c[0]+R0*bul(t),yt+(yb-yt)*t+(i===12?0:0))}
  const head=[];for(let i=0;i<=16;i++){const a=Math.PI*i/16;head.push(c[0]-R0*Math.cos(a),yt-eh*Math.sin(a)*.5)}for(let i=16;i>=0;i--){const a=Math.PI*i/16;head.push(c[0]-R0*Math.cos(a),yt+eh*Math.sin(a)*.5)}
  if(mono){poly(g,side,mono);poly(g,head,mono);return}
  const W=N?'#3a2c22':'#6e5238';
  /* its shadow: soft, under it, no sun */
  comp(g,'multiply',.45,()=>poly(g,[c[0]-R0*1.25,yb+.4,c[0]+R0*1.3,yb+.4,c[0]+R0*1.2,yb-2.2,c[0]-R0*1.1,yb-2.2],'#4a4658'));
  /* the lashings, behind the body where they go down to the deck */
  for(const sd of[-1,1]){const p=[c[0]+sd*R0*1.04,yt+(yb-yt)*.22],q=D.P(x+sd*(r+.55),y0,z+.1);stroke(g,[p[0],p[1],(p[0]+q[0])/2+sd*.4,(p[1]+q[1])/2+.8,q[0],q[1]],N?'#5a4c36':'#a89068',.6);
    R(g,q[0]-.6,q[1]-.5,1.2,1,N?'#1a1410':'#3a2c20')}
  poly(g,side);g.fillStyle=lg(g,c[0]-R0,0,c[0]+R0,0,N?['#2a2018','#3e3024','#4a3a2a','#2e2218','#1e160e']:[tint(W,-.3),tint(W,.05),tint(W,.22),tint(W,-.08),tint(W,-.38)]);g.fill();
  clipTo(g,()=>poly(g,side),()=>{tex(g,'wood',.3,c[0]-R0-1,yt-1,R0*2+2,yb-yt+2,'overlay',.45);
    /* wet: the grey of the sky down its lit side, in soft vertical bands of light (not lines), and drips */
    g.fillStyle=lg(g,c[0]-R0,0,c[0]+R0,0,['rgba(190,200,210,0)','rgba(190,200,210,'+(N?.04:.16)+')','rgba(190,200,210,0)']);g.fillRect(c[0]-R0,yt,R0*2,yb-yt);
    /* the hoops: near the head, at the bilge, near the foot, each bending with the curve of the cask */
    for(const t of[.1,.5,.9]){const y=yt+(yb-yt)*t,p=[],q=[];for(let i=0;i<=12;i++){const u=-1+2*i/12,xx=c[0]+u*R0*bul(t),yy=y+eh*.5*Math.sqrt(1-u*u)*.9;p.push(xx,yy);q.push(xx,yy+1.3)}
      poly(g,p.concat(rev22(q)),N?'#262a30':'#4a4e56');stroke(g,p,N?'#4a5058':'#9aa2ac',.5)}
    ao(g,c[0]-R0,yb-3,R0*2,3,'b',.35,'#1a1410')});
  /* the head: the lid seen a little from above, its chime a lit rim; wet, it holds the sky's grey */
  poly(g,head,N?'#2e241a':tint(W,.12));stroke(g,head.slice(0,34),N?'#4a3c2c':'#c8b090',.5);
  comp(g,'screen',N?.04:.18,()=>poly(g,head,'#b8c0cc'))}
/* the outline of a thing on her deck (a box on the planks, as the deck's painter lays it out), for its prop; the hatch with the two rails
   of its ladder standing out of it */
function thingShape22(g,k){const D=gd22(),[x0,x1,z0,z1,h]=D.things[k],q=[];
  for(const x of[x0-.04,x1+.04])for(const z of[z0-.04,z1+.04])for(const y of[0,h+.04])q.push(D.P(x,D.s(z)+y,z));
  q.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),lo=[],up=[];
  for(const p of q){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}
  for(let i=q.length-1;i>=0;i--){const p=q[i];while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
  poly(g,lo.slice(0,-1).concat(up.slice(0,-1)).flat(),'#000');
  if(k==='hatch')for(const lx of[-.32,.32]){const a=D.P(lx,h-.2,z1-.27),e=D.P(lx-.04,h+.55,z1-.42);poly(g,[a[0]-.8,a[1],a[0]+.8,a[1],e[0]+.8,e[1]-.6,e[0]-.8,e[1]-.6],'#000')}}
/* what moves on her: the sea that comes aboard, the skiff, the bale going over, the lantern's flame, the captions */
function drawStorm22(g,t){const v=ART.storm22.variant(),N=v==='n',e=e22(t),DS=ds22(v);
  /* the sea on her deck, in her own frame: pass how strongly she sways now, so that its white water meets the sea's crest */
  clipTo(g,()=>{const W=wet22();g.beginPath();for(const q of W){g.moveTo(q[0],q[1]);for(let i=2;i<q.length;i+=2)g.lineTo(q[i],q[i+1]);g.closePath()}},
    ()=>DS.aboard(g,t,e,G.sway?sk22v(v):0));
  if(phase22()==='skiff')skiff22(g,t,e);
  if(N){const L=lant22(),[lx,ly]=L.p,f=.85+.15*Math.sin(t/90)+.08*Math.sin(t/37);depth(L.floor[1]+.5,()=>{R(g,lx-1,ly-.8,2,2.6,'#ffd27a');R(g,lx-.5,ly-.2,1,1.4,rgba('#fff4d0',f))})}
  if(phase22()==='skiff'&&G.pull22&&performance.now()-G.pull22<700)SHARED.beat.cap(g,'pull_22',LK.x,LK.y-56,{w:50});
  if(G.beat){const c=caller22();if(c&&c.room===G.room)SHARED.beat.call(g,c.x,c.y-56,t)}
  /* a bale going over the lee rail: up from his arms, over the rail and away to starboard */
  if(G.over22){const k=Math.min(1,(performance.now()-G.over22)/600);if(k<1){const[hx,hy]=STORM22.holds[3],x=hx+8+k*34,y=hy-22-Math.sin(k*Math.PI)*16+k*k*18;
    depth(hy+1,()=>{poly(g,[x-4,y-2.6,x+4,y-3,x+4.4,y+2.6,x-4,y+3],'#7a5c3a');R(g,x-4,y-2.6,8,.6,'#a88a62');R(g,x-4,y+2.4,8.4,.6,'#4a3420')})}}}
/* the skiff (27:16), coming up over the port rail on the men's rope as they gain on her (G.sk22, 0..4), rising and falling with the sea.
   She hangs alongside, a little outboard of the bulwark, her stem aft (away from us, as she was towed) and a little higher; she is full
   of water: grey-green to the brim, with foam in it, spilling over her near gunwale and falling away outboard. Her near side is planked in strakes that run along her; no thwart and no oar across her. Only what is above the rail is
   seen: the rest of her is outboard, behind it. The rope from her stem goes over the rail just beyond it, so that it crosses nothing of
   her, and down to the men's fists, slanting. */
const SKIFF22={z0:5.5,z1:9.3,off:.95,hb:.62,lift:[-.12,-.02,.28,.52,.7]};
function skiff22(g,t,e){const D=gd22(),S=SKIFF22,n=G.sk22||0,ph=(((e%1)+1)%1),pause=Math.sin(Math.PI*clamp((ph-.24)/.5,0,1)),
    base=S.lift[Math.min(4,n)]+.07*pause+.04*Math.sin(t/700),xc=z=>-(D.b(z)+S.off),
    hg=z=>D.s(z)+1.15+base+.16*Math.pow((z-S.z0)/(S.z1-S.z0),1.5)+.05*Math.pow((S.z1-z)/(S.z1-S.z0),2),
    zs=[];for(let i=0;i<=12;i++)zs.push(S.z0+(S.z1-S.z0)*i/12);
  const sh=i=>Math.sin(Math.PI*i/12),near=zs.map((z,i)=>D.P(xc(z)+S.hb*(.25+.75*sh(i)),hg(z),z)).flat(),far=zs.map((z,i)=>D.P(xc(z)-S.hb*(.25+.75*sh(i)),hg(z),z)).flat(),
    bot=zs.map((z,i)=>D.P(xc(z)+S.hb*.6*sh(i),hg(z)-.55-.1*sh(i),z)).flat(),RP=portTop22();
  g.save();g.beginPath();g.moveTo(RP[0],-30);for(let i=0;i<RP.length;i+=2)g.lineTo(RP[i],RP[i+1]);g.lineTo(RP[RP.length-2],-30);g.closePath();g.clip();
  /* her near side, from the gunwale down: dark wet planking in strakes along her */
  const side=near.concat(rev22(bot));poly(g,side,'#3e2e22');
  clipTo(g,()=>poly(g,side),()=>{for(const f of[.3,.55,.8]){const q=[];for(let i=0;i<=12;i++)q.push(near[2*i]+(bot[2*i]-near[2*i])*f,near[2*i+1]+(bot[2*i+1]-near[2*i+1])*f);
      stroke(g,q,'rgba(14,10,8,.65)',.5);stroke(g,q.map((v,j)=>j%2?v+.5:v),'rgba(180,170,150,.16)',.5)}
    tex(g,'wood',.3,Math.min(...near.filter((_,j)=>j%2===0))-2,Math.min(...near.filter((_,j)=>j%2))-2,80,30,'overlay',.45)});
  /* the water in her, to the brim: the grey of the sky in it, foam lying on it in level strands */
  const W=far.concat(rev22(near));poly(g,W,'#3e5650');
  clipTo(g,()=>poly(g,W),()=>{const r=rng(2217+(Math.floor(t/400)%5));for(let i=0;i<26;i++){const j=Math.floor(r()*12),u=r(),x=far[2*j]+(near[2*j]-far[2*j])*u,y=far[2*j+1]+(near[2*j+1]-far[2*j+1])*u;
    R(g,x,y,1+r()*3,.5,`rgba(210,222,218,${(.3+.4*r()).toFixed(2)})`)}});
  /* her gunwales: the far one a thin lit line, the near one a wale */
  stroke(g,far,'#7a6a52',.5);stroke(g,near,'#8a7656',.8);stroke(g,near.map((v,j)=>j%2?v+.7:v),'#2a1e14',.5);
  /* the water spilling over her near gunwale amidships and falling away: short level dashes and small squares */
  const r=rng(2216+(Math.floor(t/110)%9));for(let i=0;i<30;i++){const j=3+Math.floor(r()*7),d=r()*9*(.5+.5*pause+(n?.3:0));
    R(g,near[2*j]+(r()-.5)*4,near[2*j+1]+1+d,r()<.4?1:.5,.5,`rgba(220,232,228,${(.8*(1-d/12)).toFixed(2)})`)}
  const stem=D.P(xc(S.z1),hg(S.z1)+.04,S.z1);R(g,stem[0]-.6,stem[1]-.6,1.2,1.2,'#1a1410');g.restore();
  /* the rope: from her stem to the rail, then to the men's fists, front man first (each man's own piece the pose draws) */
  const rz=S.z1+.5,rl=D.P(-D.b(rz),D.s(rz)+D.rx(-D.b(rz),rz)+.1,rz),pts=[stem[0],stem[1],rl[0],rl[1]-.3];
  for(const h of HAUL22){const a=h.a;if(a.room!=='storm22')continue;const p=poseAt(a.look,'haul'+(a.pk||0));if(!p||!p.rope)continue;
    const[f,m]=p.rope,A=[a.x+f[0]*a.dir,a.y+f[1]],Z=[a.x+m[0]*a.dir,a.y+m[1]],first=A[0]<Z[0]?A:Z,last=A[0]<Z[0]?Z:A;pts.push(first[0],first[1]);stroke(g,pts,'#b8a07a',.7);pts.length=0;pts.push(last[0],last[1])}
  if(pts.length===4)stroke(g,pts,'#b8a07a',.7)}
/* ==== ART storm22: end ==== */

/* ==== ART tablet22: begin ==== */
/* Luke's wax tablet, close (27:20), by what little light there is: the lantern's, warm, from the upper right. A frame of fine-grained wood,
   quiet, worn pale along its edges; the dark wax set into it (16..304 by 12..130), smoothed many times (soft patches, no old
   traces that a stroke could cross). Scratched at its head, as Luke wrote them on the way, the names of the voyage down to Cauda, in the player's language (the map's
   own keys). Below them six days in six columns (DAYS22: x 44 + 46·i, the stroke's top at y 26): at the top of each a short upright stroke
   for the day, 16 long, standing alone and never struck through; below it, apart (its middle at y 58), the day's mark if it has one
   (SHARED.tablets.lukeMark: a short line with a small solid wedge at its western end, the west end lower for south-west, level for west,
   higher for north-west; nothing for only the day). Below the columns the line the marks make, from Cauda only westward
   (SHARED.tablets.lukeLine at k .7, from 286, 100, with Cauda scratched small above its start; Chapter Twenty-Three draws the same line at k 1). The column of today, while Luke
   is played, has a soft lighter wash where the mark will go, not a ruled box. Nothing is ruled, no line runs between the columns, no mark
   meets a stroke or a column's edge. The stylus lies on the frame below the wax, a slim rod with its point to the left and its flat end to
   the right. A scratch is pale with a dark shade, thin and a little uneven.
   light:null, walk NOW (Luke stands below the picture).
   Called from outside: ART.tablet22, DAYS22. Reads the flags t1..t6 and m1a..m6b. */
const DAYS22=Array.from({length:6},(_,i)=>[44+i*46,26]);
const TAB22={mark:32,line:[286,100],k:.7,names:['Caesarea','Sidon','Myra','Cnidus','fair_havens','Cauda']};
ART.tablet22={w:320,q:12,paint(g){paintTablet22(g)},light:null,
  draw(g){const TB=SHARED.tablets,[cx0]=DAYS22[0];
    /* today's column: a soft wash where the mark will go, below the names at the head (each pass's alpha multiplies the wash's .1) */
    const n=today22();if(n<=6&&lukePlays()){const[cx,cy]=DAYS22[n-1];comp(g,'screen',.1,()=>{for(const[d,a]of[[0,.5],[2,.35],[4,.2]]){g.globalAlpha=.1*a;poly(g,[cx-18+d,cy-2,cx+18-d,cy-2,cx+18,cy-2+d,cx+18,cy+42-d,cx+18-d,cy+42,cx-18+d,cy+42,cx-18,cy+42-d,cx-18,cy-2+d],'#e8d4a8')}})}
    names22(g);
    const kinds=[];
    for(let n=1;n<=6;n++){const[cx,cy]=DAYS22[n-1];if(!F['t'+n])continue;
      /* the day's stroke: upright, a little uneven, alone */
      TB.scratch(g,[cx+.2,cy,cx-.1,cy+8,cx+.3,cy+16],{seed:2290+n});
      const m=markOf(n);kinds.push(m);TB.lukeMark(g,cx,cy+TAB22.mark,m,{seed:2300+n})}
    if(kinds.length){TB.lukeLine(g,...TAB22.line,kinds,{k:TAB22.k});
      /* where the line begins: Cauda, scratched small above its start */
      g.save();g.font=FONT22(4.2);g.textAlign='right';g.textBaseline='middle';const t=T('Cauda'),x=300,y=TAB22.line[1]-8;g.fillStyle='rgba(20,10,4,.6)';g.fillText(t,x+.5,y+.5);g.fillStyle='#cdb98e';g.fillText(t,x,y);g.restore()}},
  front(){}};
/* the names of the voyage, scratched letter by letter along the head of the wax, a small square between two names */
function names22(g){const TB=SHARED.tablets,r=rng(2295),L=TAB22.names.map(k=>T(k)),y=19.5;g.save();g.font=FONT22(5.2);g.textBaseline='middle';
  const gap=7,w=L.reduce((s,t)=>s+g.measureText(t).width,0)+gap*(L.length-1);let x=160-w/2;
  L.forEach((t,i)=>{for(const ch of t){const dy=(r()-.5)*.5;g.fillStyle='rgba(20,10,4,.6)';g.fillText(ch,x+.5,y+dy+.5);g.fillStyle='#cdb98e';g.fillText(ch,x,y+dy);x+=g.measureText(ch).width}
    if(i<L.length-1){R(g,x+gap/2-.5,y-.2,1,1,'#b8a47c');x+=gap}});g.restore()}
/* the tablet itself (board, wax and stylus): SHARED.tablets.lukeTablet, the same tablet that Chapter Twenty-Three finds carried in */
function paintTablet22(g){SHARED.tablets.lukeTablet(g)}
/* ==== ART tablet22: end ==== */

/* ==== ART girded22: begin ==== */
/* A told picture (27:17): the grain ship from the side in the storm (SHARED.grainship.side, state 'storm'), bow to the right: her mainsail
   and its yard down on deck and the mast bare (the gear lowered: what it was is not shown, and nothing says so), the skiff aboard, her
   steering oars lashed up, and round her hull the ropes passed under her from side to side and made fast on deck, slanting and curving
   with the belly of the hull (the exception of 26 November 2026, CONTRIBUTING section 3). She rides the seas: the storm's sea from the side
   (SHARED.storm.sideSea) lifts her and drops her and tilts her as the seas pass under her; her hull is cut at the water where she floats,
   and the seas between her and us hide the foot of her hull, never more than a third of it. No horizon: the far seas are lost in the
   rain. Lightning far off, never over her masts or her sternpost. Painted once (the ship, baked whole with room above her for her mast)
   and laid on the sea every frame at the angle the sea gives her.
   light:null (a told picture nobody stands in), walk NOW.
   Called from outside: ART.girded22. Reads nothing. */
const GIRD22={xa:22,len:280,top:40};
let GSHIP22=null,GSEA22=null;
const gsea22=()=>GSEA22||(GSEA22=SHARED.storm.sideSea({pal:'day',seed:2215,lightning:true,clear:[0,GIRD22.xa+GIRD22.len*.53+34]}));
/* the ship, baked once, her waterline at y = top + 100 of a canvas top + 144 high */
const gship22=()=>GSHIP22||(GSHIP22=bake(320,g=>SHARED.grainship.side(g,{x:GIRD22.xa,y:GIRD22.top+100,len:GIRD22.len,state:'storm',light:'storm',post:'bird'}),12,144+GIRD22.top));
ART.girded22={w:320,q:12,paint(g){gsea22().far(g,0)},light:null,
  draw(g,t){const S=gsea22(),{xa,len,top}=GIRD22,xb=xa+len,r=S.ride(t,xa,xb),cx=xa+len/2;S.far(g,t);
    /* the hull is cut at the water where she floats (the sea in front is not opaque everywhere) */
    g.save();g.beginPath();g.moveTo(-10,-10);g.lineTo(330,-10);g.lineTo(330,r.yb+(r.yb-r.ya)/len*(330-xb)+3);g.lineTo(-10,r.ya-(r.yb-r.ya)/len*(xa+10)+3);g.closePath();g.clip();
    g.translate(cx,r.y-3);g.rotate(r.a);g.translate(-cx,-100);g.drawImage(gship22(),0,-top,320,144+top);g.restore();
    S.near(g,t);S.front(g,t)},
  front(){}};
/* ==== ART girded22: end ==== */

/* ---- the inventory ---- */
Object.assign(ICON,{
  /* the tool pouch: soft leather, its flap folded over and held by a thong wound round a button of bone; the midtones lifted and a
     crisp sheen on its rim, so that it reads on the dark slot (CONTRIBUTING section 4) */
  pouch22(g){const B=[4.6,9,19.4,9,20.4,12,19.8,19.4,18,20.6,6,20.6,4.2,19.4,3.6,12];
    comp(g,'multiply',.45,()=>oval(g,12.4,21,8.6,1.4,'#140c0e'));
    poly(g,B);g.fillStyle=lg(g,4,9,20,21,['#b88a58','#94683e','#6a4628']);g.fill();
    clipTo(g,()=>poly(g,B),()=>{tex(g,'mott',.3,3,8,18,14,'overlay',.8);R(g,4,18.8,17,2,'rgba(40,24,12,.35)')});
    /* the flap over its mouth, a little darker, its lower edge rounded */
    const Fp=[4.2,8.4,19.8,8.4,19,13.6,15,15.6,9,15.6,5,13.6];poly(g,Fp);g.fillStyle=lg(g,0,8,0,16,['#a87a4a','#7e5632']);g.fill();
    stroke(g,[5,13.6,9,15.6,15,15.6,19,13.6],'rgba(30,16,8,.6)',.6);stroke(g,[4.4,8.6,19.6,8.6],'#f0cc92',.6);
    /* the button and the thong wound round it */
    R(g,11.2,14.4,1.8,1.8,'#ece0c4');R(g,11.2,14.4,1.8,.6,'#ffffff');stroke(g,[13,15.4,14.8,17,13.4,18.4],'#4a2c16',.6)},
  /* the needle: one slanting line, its eye a small square */
  needle22(g){stroke(g,[5,20,18,6],'#5a5a66',1.6);stroke(g,[5,19.6,18,5.6],'#e8e8f2',.7);R(g,16.6,6.4,1.2,1.2,'#2a2a30')},
  /* the needle threaded: the thread hangs from its eye in one curve */
  tneedle22(g){ICON.needle22(g);stroke(g,[17.2,7,20,10,19,15,15,19],'#e2d4aa',.7)},
  /* the sailcloth: a length of old linen folded in three, its folds running one way only; a ragged tear runs into it from the near edge */
  sail22(g){sailIcon22(g,0)},
  /* the sailcloth mended: the same, the tear closed by a seam whose stitches run along it */
  msail22(g){sailIcon22(g,1)},
  /* the bedding: a rolled blanket of brown wool, its near end turned to us */
  bedding22(g){IH.roll(g,'#a07a5a')},
  /* bread: a round loaf, domed, one curved cut across its crust, flour on it */
  bread22(g){comp(g,'multiply',.45,()=>oval(g,12.4,19.6,8.8,1.6,'#140c0e'));
    g.fillStyle=lg(g,0,9,0,20,['#e0a660','#b8783a','#7a4a20']);g.beginPath();g.ellipse(12,15,8.4,5.6,0,0,6.2832);g.fill();
    g.fillStyle='rgba(255,236,200,.35)';g.beginPath();g.ellipse(10.4,12.6,4.6,2,-.2,0,6.2832);g.fill();
    stroke(g,[7.4,14.6,10,12.8,13.6,12.4,16.6,13.4],'#6a3a16',.8);stroke(g,[7.6,15.2,10.2,13.4,13.6,13,16.4,14],'rgba(255,220,170,.5)',.4);
    for(const[x,y]of[[9,11],[14.4,11.2],[11.6,16.4],[6.4,15.8],[16.6,16]])R(g,x,y,.6,.6,'rgba(250,240,220,.7)');
    stroke(g,[4,15.2,4.6,17.6,8,20,12,20.6,16,20,19.4,17.6,20,15.2],'rgba(40,20,8,.45)',.5)},
  /* old cord: a coil */
  cord22(g){IH.coil(g,['#b89a66','#a88a58','#c8aa72'],12,11,6.4,3,2.6)}});
/* the sailcloth's icon: folded linen in three layers, each a little offset; the tear (or its seam) slants in from the near edge */
function sailIcon22(g,mended){comp(g,'multiply',.45,()=>R(g,4,19.6,17,1.6,'#140c0e'));
  for(const[x,y,w,h,c]of[[5.4,6,15,4,'#c8bc9a'],[4.6,9,15.4,4.4,'#d6caa8'],[3.8,12.4,16.2,7.2,'#e6dcbc']]){
    g.fillStyle=lg(g,0,y,0,y+h,[tint(c,.12),c,tint(c,-.22)]);g.fillRect(x,y,w,h);R(g,x,y,w,.6,tint(c,.3));R(g,x,y+h-.6,w,.6,tint(c,-.35));
    for(let j=y+1.4;j<y+h-.8;j+=1.4)R(g,x+.4,j,w-.8,.4,'rgba(110,96,70,.18)')}
  if(!mended){poly(g,[8,19.6,10.4,15.6,13,14,15.2,13.2,14.4,14.6,11.6,16.4,9.8,19.6],'#3a3024');stroke(g,[10.4,15.6,13,14,15.2,13.2],'rgba(255,250,236,.5)',.4)}
  else{stroke(g,[8.6,19.6,11,15.8,15,13.4],'rgba(120,100,70,.6)',.5);for(let t=.08;t<.95;t+=.17){const x=8.6+(15-8.6)*t,y=19.6+(13.4-19.6)*t;stroke(g,[x-.5,y+.7,x+.5,y-.7],'#5a3e1e',.7)}}}

/* ============ PEOPLE ============ */
/* Dress follows CONTRIBUTING section 4 and shared/cast.js, whose header says what each look is and why: Luke and Aristarchus as the later
   chapters paint them (CAESAREA), Julius cuirassed on the quay at Caesarea and in a plain tunic at sea (ROMAN.centurion_julius,
   SEA.julius_sea), the soldiers (ROMAN on the quay, SEA.soldier_mail at sea, bareheaded), the prisoners, the sailors of both ships, the
   pilot and the shipowner (SEA). Nobody is named but Luke, Aristarchus and Julius. */
const KC=SHARED.cast.CAESAREA,RM=SHARED.cast.ROMAN,SE=SHARED.cast.SEA;
const noSpear=o=>Object.assign({},o,{spear:0,pilum:0});
Object.assign(LOOK,{luke22:Object.assign({},KC.luke),aris22:Object.assign({},KC.aristarchus),julius22:Object.assign({},RM.centurion_julius),
  guard22:noSpear(Object.assign({},RM.legionary_bare,{ph:1900})),guard22b:noSpear(Object.assign({},RM.legionary_guard,{ph:2300})),
  pris22a:Object.assign({},SE.prisoner_1),pris22b:Object.assign({},SE.prisoner_2),pris22c:Object.assign({},SE.prisoner_3),
  csail22:Object.assign({},SE.coaster_sailor_1),sail22a:Object.assign({},SE.sailor_1),sail22b:Object.assign({},SE.sailor_4),
  sail22c:Object.assign({},SE.sailor_2),sail22d:Object.assign({},SE.sailor_3),pilot22:Object.assign({},SE.pilot),owner22:Object.assign({},SE.shipowner)});
const LOOK_SEA={julius22:Object.assign({},SE.julius_sea),guard22:Object.assign({},SE.soldier_mail),guard22b:Object.assign({},SE.soldier_unmailed)};
const LK=actor('luke22','Luke','#d0e8e0',112),AR=actor('aris22','Aristarchus','#e0d8c0',104),JU=actor('julius22','Julius','#f0c8b8',98),
  GU=actor('guard22','soldier','#d0c8c8',114),GU2=actor('guard22b','soldier','#d0c8d0',110),
  PR1=actor('pris22a','prisoner','#d8d0c8',108),PR2=actor('pris22b','prisoner','#d0d0c0',100),PR3=actor('pris22c','prisoner','#d8d8c8',116),
  CS=actor('csail22','sailor','#d8e0d0',96),SA=actor('sail22a','sailor','#d0e0e8',102),SB=actor('sail22b','sailor','#d8e8d8',118),
  SC=actor('sail22c','sailor','#e0e0d0',124),SD=actor('sail22d','sailor','#d0d8e0',94),PI=actor('pilot22','pilot','#d8d8f0',88),OW=actor('owner22','shipowner','#e8d8f0',106);
const PRISONERS=[PR1,PR2,PR3];
/* the men on the skiff's rope, each with his place and his pose's own frame (see drawStorm22) */
/* the haulers stand to either side of the line below the swan's neck, so that no head stands under its loop (CONTRIBUTING section 3) */
const HAUL22=[{a:SA,x:100,y:122},{a:LK,x:120,y:124},{a:AR,x:139,y:128},{a:SD,x:173,y:126}];
const PULLS22=4;
/* the sailor who calls the moment, in the act that is being played */
const caller22=()=>phase22()==='skiff'?SA:phase22()==='load'?SD:null;

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 27:1-26, told by the narrator in paraphrase, each line with its reference (SP/ch22/told.md, written from the Study Edition,
   English and German). None of it is put into a mouth as a quotation. The spoken lines of the account (told.md) are said in the scenes,
   in our own words, without quotation marks. */
const TOLD={v1:'handed_to_julius_acts_27_1',v2:'a_ship_from_adramyttium_acts_27_2',v3:'kindness_at_sidon_acts_27_3',v4:'in_the_shelter_of_cyprus_acts_27_4_5',
  v6:'a_ship_from_alexandria_acts_27_6',v7:'slowly_to_cnidus_acts_27_7',v8:'fair_havens_acts_27_8',v9:'the_fast_was_over_acts_27_9',
  v11:'the_officer_and_the_pilot_acts_27_11',v12:'most_were_for_phoenix_acts_27_12',v13:'a_soft_south_wind_acts_27_13',v14:'euroaquilo_acts_27_14',
  v15:'we_gave_way_acts_27_15',v16:'the_skiff_under_cauda_acts_27_16',v17:'girded_and_driven_acts_27_17',v18:'they_lightened_the_ship_acts_27_18',
  v19:'the_tackling_acts_27_19',v20:'neither_sun_nor_stars_acts_27_20',v21:'paul_stood_up_among_them_acts_27_21'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TH={thought:1,color:'#cfe2ff'};
const THL=Object.assign({low:1},TH);   /* a thought over the travel map, at the foot of the view */

/* ============ WHAT IS PLAYED: the tables ============ */
/* the voyage out on the travel map: the places shown while the leg off Cilicia is on it, and Paul's thought at each but Myra */
const OUT22={ids:['caesarea','sidon','tarsus','myra'],legs:[['caesarea','sidon'],['sidon','myra']],
  say:{caesarea:'paul_caesarea_behind_us',sidon:'paul_the_brothers_at_sidon',tarsus:'paul_tarsus_from_the_sea'}};
const LEGS22=[['caesarea','sidon','sea'],['sidon','myra','sea'],['myra','cnidus','sea'],['cnidus','salmone','sea'],['salmone','fairhavens','sea']];
/* Fair Havens: the four true things, the flag each sets, and the note it leaves on Paul's tablet */
const KNOW22=[{f:'kWeeks',note:'note22_the_weeks_lost'},{f:'kSeason',note:'note22_the_season'},{f:'kWind',note:'note22_the_wind'},{f:'kWrecks',note:'note22_three_shipwrecks'}];
const known22=()=>KNOW22.filter(k=>F[k.f]).length;
/* Luke's six days: what each source of knowing answers, day by day (every answer true, none enough), and the mark's own line */
const ASK22={pilot:['pilot_no_sun_no_bearing','pilot_by_the_sea_we_go_west','pilot_i_cant_tell_you'],
  clouds:['luke_cloud_and_more_cloud','luke_not_even_a_lighter_patch','luke_no_star_anywhere'],
  wind:['luke_the_wind_from_behind_my_shoulder','luke_the_wind_veers_and_comes_back','luke_too_much_spray_to_tell']};
const MARK22=['mark_only_the_day','mark_south_west','mark_west','mark_north_west'];
const MARKSAY22=['luke_only_the_day','luke_south_west_then','luke_west_as_near_as_i_can','luke_north_west_a_guess'];
const DAYSAY22=['','luke_the_second_day','luke_the_third_day','luke_the_fourth_day','luke_the_fifth_day','luke_the_sixth_day'];
/* In their midst: the six parts of 27:21-26 in the account's order (told.md), each with the short line it stands as in the choice */
const SPEECH22=[{k:'you_should_have_followed_my_advice',c:'say_my_advice_at_crete'},{k:'only_the_ship_will_be_lost',c:'say_only_the_ship_will_be_lost'},
  {k:'an_angel_of_the_god_i_belong_to',c:'say_an_angel_stood_beside_me'},{k:'i_must_stand_before_caesar',c:'say_i_must_stand_before_caesar'},
  {k:'i_believe_god',c:'say_i_believe_god'},{k:'we_must_be_cast_ashore',c:'say_we_must_be_cast_ashore'}];
const TOOSOON22=['paul_first_what_they_need_to_hear_first','paul_not_that_yet'];

/* ============ LUKE'S TABLET: THE SIX MARKS, CARRIED INTO CHAPTER TWENTY-THREE ============ */
/* Each of the six days gets one mark, two flags: mNa the low bit, mNb the high one. 0 only the day, 1 south-west, 2 west, 3 north-west.
   Chapter Twenty-Three's first thirteen flags are from22 and these twelve, by the same names (CHAP[23].carry, CONTRIBUTING section 5).
   tN says that day N has its stroke (only the day has no mark, so the stroke is its own flag). */
const MARKS=[1,2,3,4,5,6].flatMap(n=>['m'+n+'a','m'+n+'b']);
const markOf=n=>(F['m'+n+'a']?1:0)|(F['m'+n+'b']?2:0);
const setMark=(n,v)=>{F['m'+n+'a']=v&1?1:0;F['m'+n+'b']=v&2?1:0};
const CARRY23=['from22'].concat(MARKS);
/* carry23: the bits that Chapter Twenty-Three's first code and its start are given: from22 always, then the marks as they stand */
const carry23=()=>CARRY23.reduce((b,k,i)=>b|(i===0||F[k]?1:0)<<i,0);
const today22=()=>{let n=1;while(n<=6&&F['t'+n])n++;return n};

/* the story's flags, in the order they were written: never reorder, only append (CONTRIBUTING section 5) */
const FLAGS=['out','aboard','pouch','pierced','threaded','mended','cord','shelter','fh','kWeeks','kSeason','kWind','kWrecks','advised','skiff',
  'load1','load2','load3','t1','t2','t3','t4','t5','t6'].concat(MARKS,['p1','p2','p3','p4','p5','p6']);

/* ============ HELPERS ============ */
function setPC22(a){if(G.pc!==a){G.pc=a;G.inv=G.invs[a.id]||(G.invs[a.id]=[])}}
/* a told picture (girded22) is never a point a code is kept at: it has nothing to do, and a code there would lead nowhere. quiet: a script
   that changes the room before the told line that belongs to it keeps no code there either; it keeps one after the line (CONTRIBUTING
   section 5: a restored code never skips a verse) */
const QUIET=1;
function show22(room,x,y,dir,quiet){place22(room);const e=ENT[room];enterRoom(room,x!=null?x:e[0],y!=null?y:e[1],dir||e[2]);if(room!=='girded22'&&!quiet)codeBtn()}
async function goto22(room,x,y,dir,quiet){await fade(1,300);show22(room,x,y,dir,quiet);await fade(0,300)}
async function go22(a,x,y,sp){a.speed=fast()?400:sp||0;a.free=1;await walk(a,x,y);a.speed=0;a.free=0}
const spoke=(a,k)=>say(a,k,{to:PC()});
/* the beat runs in the two timed acts, in storm22 (shared/beat.js): started by the room's draw when it is missing, so that a code restored
   in the middle of an act finds its waves again; stopped when the act is over. The sailor's call, once given, stays until the act (the skiff)
   or the crossing (a bale) is over (sticky, reset). */
const BEAT22={skiff:{need:900},load:{need:1400}};
function beat22(){const ph=phase22(),o=BEAT22[ph];if(G.room!=='storm22'||!SHARED.beat)return;
  if(!o){if(G.beat&&G.beat.room==='storm22')SHARED.beat.stop();return}
  if(!G.beat||G.beat.room!=='storm22'||G.beat.act22!==ph){const b=SHARED.beat.start({need:o.need,sticky:true,room:'storm22'});b.act22=ph}}
{const d=ART.storm22.draw;ART.storm22.draw=(g,t)=>{if(G.room==='storm22')beat22();d(g,t);hauls22(t)}}
/* the haulers' frames: a pull leans them back through take, pull, heave; between pulls they hold the rope at take */
function hauls22(){if(phase22()!=='skiff')return;const k=G.pull22?(performance.now()-G.pull22)/Math.max(300,G.beat?G.beat.need:900):9;
  for(const h of HAUL22)if(h.a.room==='storm22'){h.a.pose='haul';h.a.pk=k<.4?1:k<1?2:0}}

/* ============ THE STORY ============ */
async function start22(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(22);G.end={};setScore(MUSIC);drawInv();
    /* 27:1, from the narrator's scroll; then the quay at Caesarea by day */
    G.scene=DARK;await tell('v1');G.scene=null;
    show22('quay22');await fade(0,700);await say(P,'paul_two_years_and_now_the_sea',TH);codeBtn()},true)}

/* ---- the quay at Caesarea: aboard the coaster, and the voyage out on the map ---- */
/* Nothing of the story's state changes until Myra is clicked on the map: the treasure can be looked for from the quay, and found with
   nothing changed (the stop treasures). */
async function board22(){if(phase22()!=='quay')return;
  await say(JU,'julius_aboard_all_of_you',{to:null});
  const[a,b,c,d]=QUAY22.plank;
  await Promise.all([go22(P,c,d+6,40),go22(LK,c-16,d+10,40),go22(AR,c-30,d+12,40)]);
  await fade(1,500);for(const x of[P,LK,AR,JU,GU,GU2,...PRISONERS,CS])x.room=null;G.off22=0;await fade(0,500);
  /* 27:2, as they cast off: the coaster pulls away from the quay */
  const w=tween(fast()?200:5200,k=>{G.off22=k});await tell('v2');await w;
  /* the map: to Sidon (27:3), and on north of Cyprus, past Cilicia and Pamphylia, to Myra (27:4, 5) */
  const M=await need('map');
  await M.journey([['caesarea','sidon','new sea']],{view:'outward'});
  await tell('v3',0,{low:1});
  await say(P,'paul_the_brothers_have_packed_a_bundle',THL);
  await M.go('sidon','myra');
  await tell('v4',0,{low:1});
  G.off22=0;setTimeout(()=>pickMyra22(),0)}
/* the voyage out stays on the map, with the places passed shown, until Myra is clicked. The places can be looked at: Caesarea, Sidon, and
   Tarsus (the hidden treasure: Paul's own town, passed without a stop). This runs outside any cutscene, so that the game is idle while the
   map waits; if the map is taken away (a code typed, a chapter restored) the wait ends and nothing happens. */
let PK22=0;
async function pickMyra22(){const M=SHARED.map,id=++PK22,gone=()=>PK22!==id||G.ch!==22||G.scene!==M.draw;
  const watch=setInterval(()=>{if(gone()){clearInterval(watch);M.cancel()}},250);
  try{for(;;){const k=await M.pick(OUT22.ids,'myra',{view:'outward',legs:OUT22.legs,hint:'click_myra_where_we_put_in'});
      if(gone())return;if(!k)continue;
      if(k==='myra'){await cut(arriveMyra22);return}
      await cut(async()=>{await say(P,OUT22.say[k],THL);if(k==='tarsus')treasure()})}}
  finally{clearInterval(watch)}}
/* Myra: the brothers' bundle, the grain ship (27:6) */
async function arriveMyra22(){F.out=1;await fade(1,500);G.scene=null;setScore(MUSIC);show22('myra22',null,null,null,QUIET);
  for(const it of['bedding22','bread22','sail22'])addItem(it);
  await fade(0,600);await tell('v6');await say(P,'paul_the_brothers_bundle',TH);codeBtn()}
/* aboard the grain ship: the evening at Myra */
async function aboard22(){if(phase22()!=='myra')return say(P,'paul_aboard_already',TH);
  await go22(P,MYRA22.plank[2],MYRA22.plank[3]+4,40);
  await fade(1,500);F.aboard=1;show22('deck22');await fade(0,600);
  await say(P,'paul_a_roof_for_the_night',TH);codeBtn()}

/* ---- the deck at Myra: a roof for the night ---- */
async function openPouch22(){if(F.pouch)return;F.pouch=1;delItem('pouch22');addItem('awl');addItem('needle22');addItem('thread');
  await say(P,'paul_awl_needle_and_thread',TH);codeBtn()}
async function pierce22(){if(F.shelter)return say(P,'paul_the_shelter_is_up',TH);
  if(F.mended)return say(P,'paul_its_mended',TH);if(F.pierced)return say(P,'paul_the_holes_are_made',TH);
  F.pierced=1;SFX.sew();await say(P,'paul_i_pierce_along_the_tear',TH);codeBtn()}
async function thread22(){if(F.threaded&&!F.mended)return say(P,'paul_its_threaded',TH);
  F.threaded=1;F.mended=0;delItem('needle22');delItem('thread');addItem('tneedle22');await say(P,'paul_the_needle_threaded',TH);codeBtn()}
async function sew22(){if(F.mended)return say(P,'paul_its_mended',TH);
  if(!F.pierced)return say(P,'paul_holes_first',TH);
  F.mended=1;SFX.sew();delItem('tneedle22');delItem('sail22');addItem('needle22');addItem('thread');addItem('msail22');
  await say(P,'paul_the_tear_is_sewn',TH);codeBtn()}
/* the cord: a sailor of the grain ship has old cord to spare */
async function cord22(){if(F.cord||F.shelter)return say(SB,'sailor_mind_your_footing',{to:P});
  await say(P,'paul_could_you_spare_some_cord',{to:SB});await say(SB,'sailor_old_cord_take_it',{to:P});
  F.cord=1;addItem('cord22');codeBtn()}
/* the shelter, on one side of the deckhouse or the other: only the left lies out of the wind, which the pennant shows comes from the right */
async function rig22(it,side){if(F.fh)return false;
  if(F.shelter)return say(P,'paul_the_shelter_is_up',TH);
  if(it==='sail22')return say(P,'paul_not_with_that_tear',TH);
  if(it==='bedding22'||it==='bread22')return say(P,'paul_the_roof_first',TH);
  if(it!=='msail22'&&it!=='cord22')return false;
  if(it==='cord22'&&!F.mended)return say(P,'paul_the_sailcloth_first',TH);
  if(side==='weather')return say(P,'paul_the_wind_would_fill_it',TH);
  if(!F.cord)return say(P,'paul_it_needs_cord',TH);
  if(!has('msail22'))return say(P,'paul_the_sailcloth_first',TH);
  F.shelter=1;SFX.good();for(const i of['msail22','cord22','bedding22','bread22'])delItem(i);
  await say(P,'paul_the_shelter_stands',TH);codeBtn()}
/* the night, then the map: slowly to Cnidus, past Salmone, to Fair Havens (27:7, 8) */
async function sleep22(){if(!F.shelter)return;await say(P,'paul_time_to_rest',TH);
  await fade(1,700);const M=await need('map');
  await M.journey([LEGS22[0],LEGS22[1],['myra','cnidus','new sea'],['cnidus','salmone','new sea']],{view:'outward'});
  await tell('v7',0,{low:1});
  await M.go('salmone','fairhavens');
  await tell('v8',0,{low:1});
  await fade(1,500);G.scene=null;setScore(MUSIC);F.fh=1;show22('deck22',null,null,null,QUIET);await fade(0,600);
  await tell('v9');await say(P,'paul_before_i_say_anything',TH);codeBtn()}

/* ---- Fair Havens: not listened to ---- */
async function know22(f,line,who){if(phase22()!=='havens')return;
  if(who)await say(who,line,{to:P});else await say(P,line,TH);
  if(!F[f]){F[f]=1;SFX.click();if(known22()===4)await say(P,'paul_i_have_seen_enough',TH);codeBtn()}}
async function advise22(){if(known22()<4)return say(P,'paul_not_yet_julius',TH);
  await say(P,'i_can_see_how_this_voyage_ends',{to:JU});
  await say(PI,'pilot_this_bay_is_no_place_to_winter',{to:JU});
  await say(OW,'owner_phoenix_is_a_day_west',{to:JU});
  await tell('v11');await tell('v12');
  /* from here on Luke may be played, and he carries his tablet (as inv deals it from a code) */
  F.advised=1;{const L=G.invs.luke22||(G.invs.luke22=[]);if(!L.includes('ltab22'))L.push('ltab22')}
  await say(P,'paul_i_said_it_as_plainly_as_i_could',TH);
  /* 27:13: a soft south wind; the anchor cable comes up over the bow (no anchor is seen) */
  await fade(1,400);await fade(0,400);
  const w=tween(fast()?200:5000,k=>{G.cable22=1-k});await tell('v13');await w;
  /* 27:14, 15: the wind comes down off the mountains; the deck in the storm */
  await tell('v14');
  await fade(1,500);G.cable22=null;show22('storm22',null,null,null,QUIET);await fade(0,500);
  await tell('v15');await tell('v16');
  await say(LK,'luke_shes_full_of_water',TH);codeBtn()}

/* ---- the lee of Cauda: the skiff, on the beat (Luke) ---- */
/* a pull: judged at the moment of the click; in the pause (the stern down), while a pull still fits in it, it gains; else nothing.
   With the help at its fullest (six misses) the sailors pull with every call of the player. */
async function pull22(){if(phase22()!=='skiff'||!G.beat)return;const r=G.beat.attempt();
  if(r.hit||r.carry){G.pull22=performance.now();G.sk22=(G.sk22||0)+1;SFX.creak();await wait(fast()?60:Math.max(300,G.beat.need));
    if(G.sk22>=PULLS22)return skiffIn22();return}
  /* a miss: the stern rises and the rope snatches taut; nothing is gained, nothing is said */
  G.pull22=0;await wait(fast()?60:420)}
/* 27:17 over the ship girded, seen from the side; the map shows where the Syrtis lies; then the next day (27:18), Paul played */
async function skiffIn22(){F.skiff=1;G.sk22=0;G.pull22=0;if(SHARED.beat)SHARED.beat.stop();for(const h of HAUL22)h.a.pose=0;
  await say(LK,'luke_shes_aboard',TH);
  await fade(1,600);show22('girded22');await fade(0,600);
  await tell('v17');
  const M=await need('map');
  await M.journey([...LEGS22.slice(2),['fairhavens','cauda','new sea']],{view:'adria',regions:['the_syrtis']});
  await say(LK,'luke_the_syrtis',THL);
  await fade(1,500);G.scene=null;setScore(MUSIC);show22('storm22',null,null,null,QUIET);await fade(0,500);
  await tell('v18');await say(P,'paul_whatever_is_in_these_bales',TH);codeBtn()}

/* ---- the next day: between two waves (Paul) ---- */
/* G.hold22: the hold he is at (0 the hatch, 1 the cask, 2 the mast, 3 the rail); G.bale22: he carries a bale */
const loadsDone22=()=>['load1','load2','load3'].filter(k=>F[k]).length;
async function hatch22(){if(phase22()!=='load')return say(PC(),'hatch_look22');
  if(G.bale22)return say(P,'paul_one_at_a_time',TH);
  if((G.hold22||0)!==0)return;G.bale22=1;P.pose='bundle';P.pk=0;SFX.pick();G.beat&&G.beat.reset()}
/* a step to hold i: only the next one counts; a hit walks there while the pause lasts; a miss is thrown back to the hold he left, with no
   line; after six misses in this crossing the sailor takes him across to the rail */
async function step22(i){if(phase22()!=='load')return say(PC(),['hatch_look22','cask_look22','mast_look22','lee_rail_look22'][i]);
  const at=G.hold22||0;if(!G.bale22){if(i===0)return hatch22();return say(P,'paul_a_bale_first',TH)}
  if(i!==at+1)return;
  const b=G.beat;if(!b)return;const r=b.attempt(),H=STORM22.holds;
  if(r.carry){await carried22();return}
  if(r.hit){await go22(P,H[i][0],H[i][1],fast()?0:60);G.hold22=i;if(i===3)return over22();return}
  /* a miss: a short step out, and back to the hold, braced */
  const[x0,y0]=H[at],x=x0+(H[i][0]-x0)*.12,y=y0+(H[i][1]-y0)*.12;P.pose=0;await go22(P,x,y,70);P.pose='hold';P.pk=1;await go22(P,x0,y0,70);P.dir=1;
  await wait(fast()?40:380);P.pose='bundle'}
/* the sailor by the lee rail comes for him and walks him across, hold by hold (the straight way would run through the cask or the mast),
   and goes back to his place by the same way */
async function carried22(){const H=STORM22.holds,S=STORM22,s=SD,at=G.hold22||0,by=i=>[H[i][0]+S.side[i][0],H[i][1]+S.side[i][1]];P.pose='bundle';s.pose=0;
  await go22(s,...S.gate,60);await go22(s,...by(at),60);
  for(let i=at+1;i<=3;i++){await Promise.all([go22(P,H[i][0],H[i][1],50),go22(s,...by(i),50)]);G.hold22=i}
  await over22();await go22(s,...by(2),60);await go22(s,...S.gate,60);await go22(s,...S.home,60);s.dir=1;s.pose='hold';s.pk=0}
/* at the rail: the bale goes over; then back to the hatch for the next, in the next pause */
async function over22(){P.pose=0;G.bale22=0;G.over22=performance.now();SFX.splash();
  const n=loadsDone22()+1;F['load'+n]=1;G.beat&&G.beat.reset();
  if(n>=3)return lightened22();
  await wait(fast()?60:700);const b=G.beat;if(b&&!fast()){const w=b.next();if(w.from>performance.now())await wait(w.from-performance.now())}
  /* back to the hatch in front of the mast and the cask */
  const H=STORM22.holds;await go22(P,H[2][0],H[2][1],fast()?0:80);await go22(P,H[0][0],H[0][1],fast()?0:80);G.hold22=0;P.dir=1;codeBtn()}
/* 27:19, then the dark days: Luke and his tablet */
async function lightened22(){await tw(500);if(SHARED.beat)SHARED.beat.stop();
  await tell('v19');
  await fade(1,700);show22('storm22');await fade(0,700);
  await say(LK,'luke_ill_keep_the_days',TH);codeBtn()}

/* ---- the dark days: no sun, no stars (Luke) ---- */
async function ask22(kind){if(phase22()!=='tablet')return false;const n=today22(),k=ASK22[kind][(n-1)%3];
  if(kind==='pilot'){await say(LK,'luke_where_are_we_heading',{to:PI});return say(PI,k,{to:LK})}
  return say(LK,k,TH)}
async function toTablet22(){if(PC()!==LK)return say(PC(),'lukes_tablet_look');await goto22('tablet22')}
async function mark22(){if(!lukePlays()||F.t6)return say(LK,'luke_six_days_six_strokes',TH);
  const n=today22(),i=await choose(MARK22.concat(['leave_it_for_now']),{keep:1});if(i===4)return;
  F['t'+n]=1;setMark(n,i);SFX.click();await say(LK,MARKSAY22[i],TH);
  if(n<6){await fade(1,500);show22('storm22');await fade(0,500);await say(LK,DAYSAY22[n],TH);codeBtn();return}
  /* the sixth day: 27:20, from the narrator's scroll; then Paul stands up among them (27:21) */
  await tw(400);await fade(1,700);await tell('v20');G.scene=null;show22('storm22',null,null,null,QUIET);await fade(0,700);
  await tell('v21');await say(P,'paul_they_need_to_hear_it',TH);codeBtn()}

/* ---- in their midst (Paul) ---- */
const said22=()=>SPEECH22.filter((s,i)=>F['p'+(i+1)]).length;
let soon22=0;
async function speech22(){if(phase22()!=='midst')return false;
  const i=await choose(SPEECH22.map(s=>s.c).concat(['say_nothing_yet']),{keep:1});if(i===SPEECH22.length)return;
  const n=said22();
  if(i<n)return say(P,'paul_ive_said_that_part',TH);
  if(i>n)return say(P,TOOSOON22[soon22++%2],TH);
  await say(P,SPEECH22[i].k,{to:null});F['p'+(i+1)]=1;SFX.good();
  if(i===5){await tw(900);return end22()}
  codeBtn()}

/* the end screen: on to Chapter Twenty-Three, with the code that carries the tablet. The printed code and the click lead to the same flags. */
async function end22(){await fade(1,700);if(SHARED.beat)SHARED.beat.stop();const bits=carry23();
  endScreen({title:'euroaquilo_2',text:'euroaquilo_end',based:'based_on_acts_27_1_26',go:'click_to_continue_to_chapter_twenty_three',
             code:['chapter_twenty_three_code_code',codeOf(23,bits)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(23,bits)};await new Promise(()=>{})}

/* ============ ROOMS ============ */
/* A room's hotspots are listed from the back to the front: where two overlap, the later one is meant. */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
/* a hold or a thing acted on where whoever is played stands: no step before the act, so that a click is judged at once */
const here=h=>Object.defineProperties(h,{wx:{get:()=>PC().x,enumerable:true,configurable:true},wy:{get:()=>PC().y,enumerable:true,configurable:true}});
ROOMS.quay22={space:.8,walk:QUAY22.walk,get mood(){return'quay'},amb:AMB.quay22,hs:[
  {name:'sea',x:120,y:60,w:200,h:36,wx:150,wy:116,look:'sea_at_caesarea_look'},
  {name:'mole',x:0,y:40,w:126,h:40,wx:90,wy:116,look:'mole_look22'},
  {name:'coaster',x:146,y:50,w:162,h:46,wx:240,wy:116,look:'coaster_look22',use:()=>board22()},
  {name:'gangplank',x:188,y:72,w:30,h:42,wx:210,wy:118,def:'use',look:'gangplank_look22',use:()=>board22()}]};
ROOMS.myra22={space:.8,walk:MYRA22.walk,mood:'myra',amb:AMB.myra22,hs:[
  {name:'mountains',x:0,y:0,w:640,h:56,wx:400,wy:116,look:'mountains_of_lycia_look'},
  {name:'grain_ship',x:60,y:30,w:410,h:76,wx:300,wy:116,look:'grain_ship_look',use:()=>aboard22()},
  {name:'coaster',x:474,y:52,w:166,h:54,wx:540,wy:116,look:'coaster_at_myra_look'},
  {name:'gangplank',x:326,y:60,w:34,h:58,wx:350,wy:120,def:'use',look:'grain_ship_gangplank_look',use:()=>aboard22()}]};
ROOMS.deck22={space:.8,walk:DECK22.walk,get mood(){return F.fh?'havens':'deck'},get amb(){return F.fh?AMB.havens22:AMB.deck22},
  /* the floor the room paints itself that blocks a walk: the bulwarks' feet where the deck narrows toward the strip's back corners (the
     coil of rope by the starboard rail lies behind the strip, 103..106.5) */
  block:[[0,106,24,4],[0,110,8,4],[268,106,52,4],[279,110,41,4],[290,114,30,4],[301,118,19,4],[312,122,8,4]],hs:[
  {name:'harbor',x:0,y:0,w:320,h:58,wx:150,wy:118,look:()=>say(P,F.fh?'fair_havens_look':'myra_harbor_look',TH)},
  {name:'open_sea',x:0,y:62,w:88,h:22,wx:60,wy:118,vis:()=>!!F.fh,look:()=>know22('kWrecks','paul_three_times_shipwrecked')},
  {name:'deckhouse',x:118,y:60,w:64,h:30,wx:150,wy:110,look:'deckhouse_look22'},
  {name:'pennant',x:104,y:38,w:26,h:26,wx:112,wy:112,look:()=>F.fh?know22('kWind','paul_the_wind_against_us_since_sidon'):say(P,'pennant_look22',TH)},
  {name:'lee_of_the_deckhouse',x:80,y:58,w:46,h:32,wx:100,wy:112,vis:()=>!F.shelter&&!F.fh,look:'free_deck_left_look',use:'free_deck_left_look',useWith:it=>rig22(it,'lee')},
  {name:'beside_the_deckhouse',x:184,y:58,w:38,h:32,wx:242,wy:110,vis:()=>!F.fh,look:'free_deck_right_look',use:'free_deck_right_look',useWith:it=>rig22(it,'weather')},
  {name:'hatch',x:112,y:86,w:70,h:20,wx:146,wy:110,look:'cargo_hatch_look22'},
  {name:'anchor',x:168,y:82,w:64,h:38,wx:200,wy:124,vis:()=>!F.fh,look:'anchor_look22',pickup:'paul_the_anchor_is_heavy',use:'paul_the_anchor_is_heavy'},
  {name:'anchor_cable',x:172,y:78,w:44,h:30,wx:196,wy:112,vis:()=>!!F.fh,look:'anchor_cable_look22'},
  {name:'shelter',x:80,y:58,w:48,h:34,wx:100,wy:112,vis:()=>!!F.shelter&&!F.fh,def:'use',look:'a_good_tent_on_a_ship',use:()=>sleep22()},
  /* the gull on the bundle (the room's birds stand it there): the room names it itself, so that its own look line wins */
  {name:'gull',x:104,y:72,w:14,h:12,wx:100,wy:112,vis:()=>!!F.shelter&&!F.fh,look:'my_first_guest_under_the_new_roof'}]};
ROOMS.storm22={space:.7,block:ROOMS.deck22.block,get walk(){const ph=phase22(),a=PC();return ph==='skiff'||ph==='load'||ph==='midst'?[a.x,a.x,a.y,a.y]:STORM22.walk.slice()},
  get mood(){const ph=phase22();return ph==='tablet'?'night':ph==='midst'?'midst':'storm'},get amb(){return nightNow22()?AMB.night22:AMB.storm22},hs:[
  here({name:'clouds',x:60,y:0,w:200,h:28,look:()=>phase22()==='tablet'?ask22('clouds'):say(PC(),'storm_sky_look',TH)}),
  here({name:'the_wind',x:290,y:28,w:30,h:46,look:()=>phase22()==='tablet'?ask22('wind'):say(PC(),'the_wind_look',TH),use:()=>phase22()==='tablet'?ask22('wind'):say(PC(),'the_wind_look',TH)}),
  here({name:'skiff_rope',x:0,y:52,w:72,h:44,def:'use',vis:()=>phase22()==='skiff',look:'skiff_rope_look',use:()=>pull22(),pickup:()=>pull22()}),
  here({name:'hatch',x:114,y:76,w:66,h:28,def:'use',look:()=>say(PC(),'hatch_look22'),use:()=>step22(0)}),
  here({name:'cask',x:198,y:76,w:28,h:38,def:'use',look:()=>say(PC(),'cask_look22'),use:()=>step22(1)}),
  here({name:'mast_step',x:258,y:14,w:32,h:118,def:'use',look:()=>say(PC(),'mast_look22'),use:()=>step22(2)}),
  here({name:'lee_rail',x:290,y:76,w:30,h:48,def:'use',look:()=>say(PC(),'lee_rail_look22'),use:()=>step22(3)})]};
ROOMS.tablet22={space:.6,walk:NOW,mood:'night',amb:AMB.tablet22,hs:[
  {name:'tablet',x:20,y:16,w:280,h:100,wx:160,wy:236,look:()=>say(LK,'the_days_written_look',TH)},
  ...DAYS22.map(([cx,cy],i)=>({name:'todays_mark',x:cx-20,y:cy-8,w:40,h:76,wx:160,wy:236,def:'use',vis:()=>lukePlays()&&today22()===i+1,
    look:()=>say(LK,'todays_mark_look',TH),use:()=>mark22()})),
  {name:'back_to_the_deck',x:0,y:136,w:120,h:8,wx:160,wy:236,exit:()=>goto22('storm22'),look:'back_to_the_deck_look'}]};
ROOMS.girded22={space:.6,walk:NOW,mood:'storm',amb:AMB.girded22,hs:[
  {name:'back_to_the_deck',x:0,y:136,w:120,h:8,wx:160,wy:236,exit:()=>goto22('storm22'),look:'back_to_the_deck_look'}]};

/* ============ PEOPLE AS HOTSPOTS ============ */
const who=(a,o)=>{a.hs=Object.assign({name:a.name,actor:a},o)};
const inRoom=r=>G.room===r;
who(LK,{look:'luke_look22',talk:()=>phase22()==='havens'?know22('kWeeks','luke_weve_lost_weeks',LK):phase22()==='midst'?speech22():spoke(LK,phase22()==='quay'?'luke_the_ship_is_ready':'luke_im_here')});
who(AR,{look:'aristarchus_look22',talk:()=>phase22()==='midst'?speech22():spoke(AR,'aristarchus_with_you')});
who(JU,{look:()=>say(PC(),phase22()==='quay'?'julius_on_the_quay_look':'julius_look22'),
  talk:()=>phase22()==='havens'?advise22():phase22()==='midst'?speech22():phase22()==='quay'?spoke(JU,'julius_we_sail_with_the_coaster'):spoke(JU,phase22()==='myra'?'julius_this_one_sails_for_italy':'julius_keep_near_my_men')});
who(GU,{look:'soldier_look22',talk:()=>phase22()==='midst'?speech22():phase22()==='shelter'&&F.shelter?spoke(GU,'soldier_a_flap_of_sailcloth_is_new'):spoke(GU,'soldier_im_staying_near_you')});
who(GU2,{look:'soldier_look22',talk:()=>phase22()==='midst'?speech22():spoke(GU2,'soldier_im_staying_near_you')});
for(const a of PRISONERS)who(a,{look:'prisoner_look22',talk:()=>phase22()==='midst'?speech22():spoke(a,'prisoner_italy_is_a_long_way')});
who(CS,{look:'coaster_sailor_look',talk:()=>spoke(CS,'coaster_sailor_cargo_first')});
who(SA,{look:'sailor_look22',talk:()=>phase22()==='myra'?spoke(SA,'we_supply_the_water'):phase22()==='skiff'?pull22():phase22()==='midst'?speech22():spoke(SA,'sailor_hold_on')});
who(SB,{look:'sailor_look22',talk:()=>cord22()});
who(SC,{look:'sailor_look22',talk:()=>phase22()==='havens'?know22('kSeason','sailor_late_in_the_year',SC):phase22()==='midst'?speech22():spoke(SC,'sailor_hold_on')});
who(SD,{look:'sailor_look22',talk:()=>phase22()==='skiff'?pull22():phase22()==='midst'?speech22():spoke(SD,'sailor_hold_on')});
who(PI,{look:'pilot_look22',talk:()=>phase22()==='tablet'?ask22('pilot'):phase22()==='midst'?speech22():spoke(PI,'pilot_the_officer_decides')});
who(OW,{look:'shipowner_look22',talk:()=>phase22()==='midst'?speech22():spoke(OW,'owner_the_officer_decides')});
/* Paul, when Luke is played */
const PAULHS={name:'Paul',actor:P,as:{luke22:{look:'paul_by_luke_look22',talk:()=>say(LK,'luke_hold_on_paul',{to:P}),give:()=>say(P,'keep_it_luke',{to:LK})}}};
LK.def={look:'luke_nothing_to_look_at',pickup:'luke_not_mine_to_take',use:'luke_no_use_for_that',open:'luke_not_mine_to_open',talk:'luke_later',give:'luke_what_should_i_give'};
LK.noCraft='luke_not_those_two_together';

/* ============ ITEMS ============ */
Object.assign(ITEMS,{
  pouch22:{name:'tool_pouch',def:'open',look:'my_tool_pouch_look',open:()=>openPouch22(),use:()=>openPouch22()},
  needle22:{name:'needle',look:'needle_look22'},
  tneedle22:{name:'threaded_needle',look:'threaded_needle_look'},
  sail22:{name:'torn_sailcloth',look:'torn_sailcloth_look'},
  msail22:{name:'mended_sailcloth',look:'mended_sailcloth_look'},
  bedding22:{name:'bedding',look:'bedding_look22'},
  bread22:{name:'bread',look:'bread_look22'},
  cord22:{name:'old_cord',look:'old_cord_look'},
  ltab22:{name:'lukes_tablet',icon:'tablets',def:'open',look:'lukes_tablet_look',open:()=>toTablet22(),use:()=>toTablet22()}});
/* what Paul's hands make of two things together; only in this chapter (COMBO is shared by every chapter that has been loaded) */
const c22=fn=>(...a)=>G.ch===22?fn(...a):say(PC(),pick(NOPE));
Object.assign(COMBO,{'awl+sail22':c22(pierce22),'awl+msail22':c22(()=>say(P,'paul_its_mended',TH)),
  'needle22+thread':c22(thread22),'sail22+tneedle22':c22(sew22),'needle22+sail22':c22(()=>say(P,'paul_the_needle_needs_thread',TH)),
  'sail22+thread':c22(()=>say(P,'paul_the_thread_needs_a_needle',TH)),'msail22+tneedle22':c22(()=>say(P,'paul_its_mended',TH)),
  'cord22+msail22':c22(()=>say(P,'paul_cord_on_deck_not_in_my_hands',TH)),'cord22+sail22':c22(()=>say(P,'paul_not_with_that_tear',TH)),
  'awl+needle22':c22(()=>say(P,'paul_awl_and_needle_each_its_work',TH)),'awl+tneedle22':c22(()=>say(P,'paul_awl_and_needle_each_its_work',TH))});

/* ============ WAX TABLETS ============ */
/* Paul's: while Luke is played Paul's tablets are not his to open (Luke's own tablet is the close view, tablet22). */
const pa=f=>()=>PC()===P&&f();
const TABLETS={
  people:[{name:'Julius',note:'note22_julius',if:pa(()=>true)},{name:'Luke',note:'note22_luke',if:pa(()=>true)},{name:'Aristarchus',note:'note22_aristarchus',if:pa(()=>true)},
    {name:'pilot',note:'note22_pilot',if:pa(()=>!!F.fh)},{name:'shipowner',note:'note22_shipowner',if:pa(()=>!!F.fh)}],
  tasks:[{t:'task22_aboard_the_coaster',if:pa(()=>phase22()==='quay')},{t:'task22_aboard_the_grain_ship',if:pa(()=>phase22()==='myra')},
    {t:'task22_a_roof_for_the_night',if:pa(()=>phase22()==='shelter'&&!F.shelter)},{t:'task22_rest',if:pa(()=>phase22()==='shelter'&&!!F.shelter)},
    {t:'task22_what_i_have_seen',if:pa(()=>phase22()==='havens'&&known22()<4)},{t:'task22_speak_to_julius',if:pa(()=>phase22()==='havens'&&known22()===4)},
    {t:'task22_the_bales',if:pa(()=>phase22()==='load')},{t:'task22_in_their_midst',if:pa(()=>phase22()==='midst')}],
  scripture:[],
  notes:{title:'notes22_title',none:'nothing_yet_said',list:KNOW22.map(k=>({t:k.note,if:pa(()=>!!F[k.f])}))}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={quay22:[150,128,-1],myra22:[470,126,-1],get deck22(){return F.fh?[130,126,1]:[120,128,1]},
  get storm22(){const ph=phase22();return ph==='skiff'?[126,124,-1]:ph==='load'?[...STORM22.holds[0],1]:ph==='tablet'?[120,126,-1]:[174,124,-1]},
  tablet22:[160,236,1],girded22:[160,236,1]};
const EVERY=[LK,AR,JU,GU,GU2,...PRISONERS,CS,SA,SB,SC,SD,PI,OW];
/* place22: everyone where the story has him, from the flags */
function place22(room){for(const a of EVERY.concat([P])){a.talk=false;a.seat=0;a.ges=0;a.kneel=0;a.bound=0;a.bow=false;a.speed=0;a.chained=0;a.held=0;a.keeper=0;a.free=false;a.noTurn=0;a.pose=0;a.pk=0}
  for(const a of EVERY)a.room=null;P.room=null;if(AU.score!==MUSIC)setScore(MUSIC);
  const ph=phase22(),pl=(a,r,x,y,d,pose,pk)=>{place(a,r,x,y,d);if(pose){a.pose=pose;a.pk=pk||0}};
  for(const id in LOOK_SEA)ACT[id].look=ph==='quay'?LOOK[id]:LOOK_SEA[id];
  setPC22(lukePlays()?LK:P);
  G.hold22=0;G.bale22=0;G.sk22=0;G.pull22=0;G.over22=0;
  if(ph==='quay'){pl(P,'quay22',150,128,-1);pl(LK,'quay22',64,124,1);pl(AR,'quay22',44,130,1);pl(JU,'quay22',114,120,1);
    pl(GU,'quay22',176,132,-1);pl(GU2,'quay22',262,126,-1);pl(PR1,'quay22',240,120,-1);pl(PR2,'quay22',284,128,-1);pl(PR3,'quay22',300,118,-1);pl(CS,'quay22',226,116,-1)}
  if(ph==='myra'){pl(P,'myra22',470,126,-1);pl(LK,'myra22',500,122,-1);pl(AR,'myra22',522,130,-1);pl(JU,'myra22',388,122,1);
    pl(GU,'myra22',446,132,-1);pl(PR1,'myra22',280,118,1);pl(PR2,'myra22',258,130,1);pl(PR3,'myra22',544,118,-1);pl(SA,'myra22',318,124,1)}
  if(ph==='shelter'){pl(P,'deck22',120,128,1);pl(LK,'deck22',60,122,1);pl(AR,'deck22',36,128,1);pl(GU,'deck22',96,134,1);pl(SB,'deck22',238,134,-1);pl(PR2,'deck22',176,108,-1)}
  if(ph==='havens'){pl(P,'deck22',130,126,1);pl(LK,'deck22',30,128,1);pl(AR,'deck22',170,134,-1);pl(GU,'deck22',104,132,1);pl(SC,'deck22',58,120,1);
    pl(JU,'deck22',214,124,-1);pl(PI,'deck22',240,112,-1);pl(OW,'deck22',298,132,-1)}
  /* in the storm (storm22): whoever holds on has his far hand on a thing of the ship (STORM22: the holds of the crossing, the port rail) */
  if(ph==='skiff'){for(const h of HAUL22)pl(h.a,'storm22',h.x,h.y,-1,'haul',0);pl(P,'storm22',...STORM22.holds[1],1,'hold',0);pl(GU,'storm22',...STORM22.holds[2],1,'hold',0)}
  if(ph==='load'){pl(P,'storm22',...STORM22.holds[0],1,'',0);pl(LK,'storm22',24,114,-1,'hold',0);pl(AR,'storm22',58,128,-1,'huddle',0);pl(GU,'storm22',40,122,-1,'hold',1);
    pl(SD,'storm22',...STORM22.home,1,'hold',0)}
  if(ph==='tablet'){pl(LK,'storm22',120,126,-1);pl(PI,'storm22',24,114,-1,'hold',0);pl(P,'storm22',204,130,-1,'huddle',0);pl(AR,'storm22',226,132,-1,'huddle',0);pl(GU,'storm22',...STORM22.holds[2],1,'hold',0)}
  if(ph==='midst'){pl(P,'storm22',174,124,-1);pl(PI,'storm22',58,124,1,'huddle',0);pl(OW,'storm22',86,130,1,'huddle',0);pl(SA,'storm22',110,120,1,'huddle',0);
    pl(AR,'storm22',134,134,1,'huddle',0);pl(LK,'storm22',198,136,-1,'huddle',0);pl(JU,'storm22',222,122,-1);pl(GU,'storm22',238,128,-1);
    pl(PR1,'storm22',296,128,-1,'huddle',0);pl(PR2,'storm22',280,140,-1,'huddle',0)}
  P.hs=lukePlays()?PAULHS:null;P.party=LK.party=0}
function setup22(){P.hs=null;P.called='Paul';LK.called='Luke';G.cable22=null;G.off22=0;soon22=0;
  G.invs={paul:['tablets','pouch22'],luke22:[]};G.inv=G.invs.paul;drawInv()}

/* ============ PRAYER HINTS ============ */
/* Luke prays to Jehovah as Paul does; his hints are his own. */
function hint22(){const ph=phase22();
  if(ph==='quay')return['quay22',['hint_aboard_the_coaster_1','hint_aboard_the_coaster_2']];
  if(ph==='myra')return['myra22',['hint_aboard_the_grain_ship_1','hint_aboard_the_grain_ship_2']];
  if(ph==='shelter'){if(!F.pouch)return['pouch22',['hint_my_pouch_1','hint_my_pouch_2']];
    if(!F.mended)return['mend22',['hint_mend_the_sailcloth_1','hint_mend_the_sailcloth_2']];
    if(!F.cord)return['cord22',['hint_cord_1','hint_cord_2']];
    if(!F.shelter)return['lee22',['hint_out_of_the_wind_1','hint_out_of_the_wind_2']];
    return['rest22',['hint_shelter_rest_1','hint_shelter_rest_2']]}
  if(ph==='havens')return known22()<4?['know22',['hint_what_i_have_seen_1','hint_what_i_have_seen_2']]:['julius22',['hint_speak_to_julius_1','hint_speak_to_julius_2']];
  if(ph==='skiff')return['skiff22',['hint_the_skiff_1','hint_the_skiff_2']];
  if(ph==='load')return['load22',['hint_the_bales_1','hint_the_bales_2']];
  if(ph==='tablet')return['tablet22',['hint_the_tablet_1','hint_the_tablet_2']];
  return['midst22',['hint_in_their_midst_1','hint_in_their_midst_2']]}

/* ============ CHAPTER DEFINITION ============ */
/* Birds (shared/birds.js): gulls over the harbors of Caesarea and Myra and over the bays of Myra and Fair Havens, by day and in fair
   weather; a gull stands on Paul's bundle under the new shelter at Myra. None from the moment the wind comes down: none in storm22,
   tablet22 or girded22. They change nothing in the story. */
ROOMS.quay22.birds={gulls:[0,8,320,44],stand:[[30,96,1],[88,96,-1]]};
ROOMS.myra22.birds={gulls:[0,8,640,36],gullsN:4,stand:[[94,106,1],[600,106,-1]]};
ROOMS.deck22.birds=()=>F.fh?{gulls:[0,6,200,30]}:F.shelter?{gulls:[0,6,240,26],stand:[[...gullDeck22(),-1]]}:{gulls:[0,6,240,26]};
/* where the gull stands: on the brothers' bundle under the shelter */
const gullDeck22=()=>{const b=SHARED.grainship.shelterOf(SHARED.grainship.geoDeck({cabin:DECK22.cabin})).bundle;return[+b[0].toFixed(1),+(b[1]-.6).toFixed(1)]};
/* every hotspot answers Luke as it answers Paul (see act: another member uses h.as[his id]) */
for(const id of['quay22','myra22','deck22','storm22','tablet22','girded22'])for(const h of ROOMS[id].hs)if(!h.as)h.as={luke22:h};
for(const a of EVERY)if(a!==LK&&a.hs&&!a.hs.as)a.hs.as={luke22:a.hs};

return{rooms:['quay22','myra22','deck22','storm22','tablet22','girded22'],setup:setup22,start:start22,hint:hint22,music:MUSIC,beds:BEDS22,calls:ALLCALLS22,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the phase, the tables, the marks and the carry */
  told:TOLD,phase:phase22,out:OUT22,know:KNOW22,speech:SPEECH22,marksay:MARKSAY22,markKeys:MARK22,holds:STORM22.holds,haul:HAUL22,pulls:PULLS22,days:DAYS22,
  marks:MARKS,markOf,setMark,carry23,end:end22,
  flags:FLAGS,
  /* six rooms and forty-two flags today; the code keeps room for sixteen rooms and fifty-six flags. Paul and Luke, fixed by the scene. */
  codeBits:{flags:56,rooms:4},party:['paul','luke22'],swap:false,ent:ENT,home:{ltab22:'luke22'},away:()=>false,
  inv:()=>{const L=['tablets'];if(!F.pouch)L.push('pouch22');else{L.push('awl');if(F.threaded&&!F.mended)L.push('tneedle22');else L.push('needle22','thread')}
    if(F.out&&!F.shelter){L.push('bedding22','bread22',F.mended?'msail22':'sail22');if(F.cord)L.push('cord22')}
    if(F.advised)L.push('ltab22');return L},
  place:place22}
});
