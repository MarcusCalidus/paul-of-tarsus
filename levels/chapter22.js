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
/* One tune for the voyage and the storm. It is in B flat, in the harmonic minor (B flat, C, D flat, E flat, F, G flat, A), in bars of
   eighteen steps that fall four, four, four, three, three, like a swell that comes in long and breaks short: no earlier chapter has this
   key or this bar. The tune is four bars long (A B C D): up the triad, round the fourth; up through the raised seventh to the octave; down
   from the octave; home by the second. In harbor ("quay", "myra") lyre and harp take turns over a low string. On deck at Myra in the
   evening ("deck") the harp has the tune alone over the low string. At Fair Havens ("havens") the ney has it, slower in feeling, over the
   harp's rocking figure and the low string. In the storm ("storm") the music moves and never holds: the low string plucks the keynote and
   leans on the note above, a drum ticks with it and almost stops every fourth bar, the ney begins the tune and breaks off before it comes
   home, and the harp rocks low under it, no louder than the rest. In the dark days ("night") a low note lies quietly under a sparse harp.
   When Paul stands up among them ("midst") lyre and harp have the whole tune again over the low string. Nothing is claimed about how
   music was played then. */
const SCALE=[0,2,3,5,7,8,11],ST=18,
 /* the tune, a bar to a letter: [step, degree of the scale, length in steps]; E is D broken off before it comes home */
 TUNE={A:[[0,0,4],[4,2,4],[8,4,4],[12,3,3],[15,2,3]],B:[[0,4,4],[4,5,4],[8,4,4],[12,6,3],[15,7,3]],
   C:[[0,7,6],[6,5,3],[9,4,3],[12,3,3],[15,2,3]],D:[[0,3,4],[4,1,4],[8,0,10]],E:[[0,3,4],[4,1,14]],_:[]},
 bars22=s=>[...s].map(k=>TUNE[k]),
 ROCK={A:[[0,0,4],[4,4,4],[8,2,4],[12,4,3],[15,2,3]],B:[[0,-2,4],[4,2,4],[8,0,4],[12,2,3],[15,0,3]],
   C:[[0,-3,4],[4,1,4],[8,-1,4],[12,1,3],[15,-1,3]],D:[[0,-1,4],[4,1,4],[8,0,10]]},
 rock22=s=>[...s].map(k=>ROCK[k]),
 LOW=[[[0,0,18]],[[0,-3,18]],[[0,-2,18]],[[0,0,9],[9,-3,9]]],
 MUSIC={dt:.2,steps:ST,group:[4,4,4,3,3],root:46,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['quay','myra'],oct:24,loop:8,lines:bars22('ABCD____'),vol:.48},
  {inst:'harp',moods:['quay','myra'],oct:24,loop:8,lines:bars22('____ABCD'),vol:.42},
  {inst:'bass',moods:['quay','myra','deck','havens'],oct:12,loop:4,lines:LOW,vol:.24},
  {inst:'harp',moods:['deck'],oct:24,loop:8,lines:bars22('ABCD____'),vol:.4},
  {inst:'ney',moods:['havens'],oct:24,loop:8,lines:bars22('ABCD____'),vol:.28},
  {inst:'harp',moods:['havens'],oct:12,loop:4,lines:rock22('ABCD'),vol:.26},
  /* the storm: the keynote plucked, leaning on the step above; the drum ticks and almost stops every fourth bar; the ney breaks off;
     the harp rocks low beneath */
  {inst:'bass',moods:['storm'],oct:12,loop:1,lines:[[[0,0,4],[4,1,4],[8,0,4],[12,0,3],[15,1,3]]],vol:.36},
  {drum:1,moods:['storm'],prog:'AAAB',seq:{A:'t...t...t...t..t..',B:'t.................'},vol:.17},
  {inst:'ney',moods:['storm'],oct:24,loop:8,lines:[TUNE.A,TUNE.E,[],[],[],[],[],[]],vol:.24},
  {inst:'harp',moods:['storm'],oct:12,loop:4,lines:rock22('ABCD'),vol:.18},
  /* the dark days: a low note held quietly, and a sparse harp */
  {inst:'bass',moods:['night'],oct:12,loop:4,lines:LOW,vol:.18},
  {inst:'harp',moods:['night'],oct:12,loop:8,lines:rock22('A_C_A_D_'),vol:.16},
  /* in their midst */
  {inst:'lyre',moods:['midst'],oct:24,loop:8,lines:bars22('ABCDABCD'),vol:.4},
  {inst:'harp',moods:['midst'],oct:12,loop:4,lines:rock22('ABCD'),vol:.26},
  {inst:'bass',moods:['midst'],oct:12,loop:4,lines:LOW,vol:.22}]};

/* ---- around you ----
   What the engine has: waves, wind, gulls and the hull's creak. Missing, for the art-and-sound pass: a storm wind that gusts and howls,
   the rigging and a slatting sail, rain on the deck, the water running off the planks between the seas (the beat's own run-off covers
   part of it), a skiff knocking at the stern. */
const AMB={quay22:{waves:.5,gulls:.5,wind:.15,creak:.15},myra22:{waves:.45,gulls:.5,wind:.15,creak:.25},
  deck22:{waves:.4,gulls:.3,wind:.2,creak:.4},havens22:{waves:.35,gulls:.25,wind:.3,creak:.35},
  storm22:{waves:1,wind:1,creak:.7},night22:{waves:.8,wind:.9,creak:.6},tablet22:{waves:.35,wind:.4,creak:.3},girded22:{waves:.9,wind:.9,creak:.5}};
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
/* ART-TODO. The quay at Caesarea (the harbor Sebastos) by day: the sea to the horizon (y 62) beyond the harbor, the mole on the left
   hiding the horizon behind it, the quay's paving from its edge (y 96) toward us. Behind the edge lies the coaster of Adramyttium,
   moored, its bow to the right (hull 146..308, rail 72, waterline 96), rising and falling a little behind the stone edge; its gangplank
   reaches from her rail (196, 78) over the quay edge to the paving (210, 112). No mast in the picture (a mast across the sea's level
   line is a cross shape): if one is painted it rises out of the top of the picture and the mole hides the horizon behind it.
   Called from outside: ART.quay22, QUAY22. Reads G.off22 (the coaster pulling away, 0..1, as 27:2 is told).
   Hotspots (ROOMS.quay22): the sea 0,20,320,42 · the coaster 146,64,162,32 · the gangplank 188,74,30,40 · the mole 0,52,120,12.
   Walk: 20..300 by 110..138. Light: the sun at the right, high (shadows fall to the left). */
const QUAY22={hz:62,edge:96,ship:[146,308,72,96],plank:[196,78,210,112],walk:[20,300,110,138]};
ART.quay22={w:320,q:12,paint(g){const r=rng(2201);sky22(g,QUAY22.hz,'#8eb4d8','#d8e4ea');sea22(g,QUAY22.hz,QUAY22.edge,'#3a7092',r);
    /* the mole: a long low line of stone on the left, over the horizon */
    poly(g,[0,52,110,56,124,64,0,64],'#a89a80');R(g,0,52,112,1,'#d8ccb0');
    /* the quay: paving toward us, its edge lit */
    g.fillStyle=lg(g,0,96,0,144,['#c8b89a','#bcaa8a','#a8967a']);g.fillRect(0,96,320,48);R(g,0,96,320,1.5,'#e8dcc0');R(g,0,97.5,320,1,'rgba(40,30,20,.4)');
    for(let i=0;i<220;i++)R(g,r()*320,100+r()*44,1+r()*2,.5,rgba(r()<.5?'#ffffff':'#5a4a38',.18))},
  light:{amb:'#f2ead8',sun:[-16,-6,.38],wallY:96},
  draw(g,t){const off=G.off22||0,bob=Math.sin(t/1400)*.6,[x0,x1,top,wl]=QUAY22.ship,dx=-off*180;
    /* the coaster, behind the quay edge: only the part above the stone is seen */
    g.save();g.beginPath();g.rect(0,0,320,QUAY22.edge);g.clip();hull22(g,x0+dx,x1+dx,top+bob,wl+6,'#6a4a30',1);g.restore();
    if(!off){const[a,b,c,d]=QUAY22.plank;poly(g,[a-4,b+bob,a+4,b+bob,c+5,d,c-5,d],'#9a7a52');R(g,c-5,d-1,10,1,'#c8a878')}},
  front(){}};
/* ==== ART quay22: end ==== */

/* ==== ART myra22: begin ==== */
/* ART-TODO. The harbor of Myra in Lycia by afternoon: the mountains of Lycia close behind the harbor, rising almost from the shore, so that
   no open horizon shows on the right; the sea to the horizon (y 62) at the left only. Behind the quay edge (y 96) lie two ships side by
   side: the coaster of Adramyttium on the left (hull 8..128), and the great grain ship of Alexandria on the right, much larger (hull
   140..330, rail 64, waterline 96, her bow to the right running out of the picture). On her foredeck, near the bow (about 280..312, by 60..66
   over the rail), an anchor lies as it was (CONTRIBUTING section 3, the anchor at Myra): a hook anchor of wood and metal, stock, shank and
   arms, lying on the deck. Her gangplank reaches from her rail (240, 70) to the paving (250, 112). No masts in the picture, or masts that
   rise out of the top with the mountains behind them. No temple anywhere in the harbor.
   Called from outside: ART.myra22, MYRA22. Reads nothing.
   Hotspots (ROOMS.myra22): the mountains 120,0,200,40 · the coaster 8,70,120,26 · the grain ship 140,58,180,38 · the gangplank 232,68,30,46.
   Walk: 20..300 by 110..138. Light: the afternoon sun at the left (shadows fall to the right). */
const MYRA22={hz:62,edge:96,coaster:[8,128,76,96],ship:[140,330,64,96],plank:[240,70,250,112],walk:[20,300,110,138]};
ART.myra22={w:320,q:12,paint(g){const r=rng(2202);sky22(g,MYRA22.hz,'#9ab8d4','#e8dcc8');sea22(g,MYRA22.hz,MYRA22.edge,'#3a6a88',r);
    /* the mountains of Lycia, close behind the harbor on the right, down to the water */
    poly(g,[110,62,150,34,190,22,236,14,270,20,320,8,320,66,110,66],'#8a8070');poly(g,[150,34,190,22,236,14,250,30,200,44],'#a09684');
    g.fillStyle=lg(g,0,96,0,144,['#c4b496','#b8a688','#a49276']);g.fillRect(0,96,320,48);R(g,0,96,320,1.5,'#e4d8bc');R(g,0,97.5,320,1,'rgba(40,30,20,.4)');
    for(let i=0;i<200;i++)R(g,r()*320,100+r()*44,1+r()*2,.5,rgba(r()<.5?'#ffffff':'#5a4a38',.16))},
  light:{amb:'#f4e2c8',sun:[20,-6,.38],wallY:96},
  draw(g,t){const b1=Math.sin(t/1300)*.6,b2=Math.sin(t/1900+1)*.4;g.save();g.beginPath();g.rect(0,0,320,MYRA22.edge);g.clip();
    hull22(g,MYRA22.coaster[0],MYRA22.coaster[1],MYRA22.coaster[2]+b1,102,'#6a4a30',1);
    hull22(g,MYRA22.ship[0],MYRA22.ship[1],MYRA22.ship[2]+b2,104,'#5a3e28',1);
    /* ART-TODO the anchor on her foredeck: a dark low lump as a placeholder */
    R(g,282,MYRA22.ship[2]+b2-3,26,3,'#3a3430');g.restore();
    const[a,b,c,d]=MYRA22.plank;poly(g,[a-4,b+b2,a+4,b+b2,c+5,d,c-5,d],'#9a7a52');R(g,c-5,d-1,10,1,'#c8a878')},
  front(){}};
/* ==== ART myra22: end ==== */

/* ==== ART deck22: begin ==== */
/* ART-TODO. The grain ship's deck amidships, looking across it to the far rail, with the harbor beyond: at Myra in the evening (the low
   sun at the left, the mountains of Lycia behind the harbor), at Fair Havens by day (the small bay sheltered by islands, the open sea
   beyond them at the left). The far rail (bulwark) runs across at 84..100; the deck from 100 toward us, planks running one way. The
   deckhouse stands against the far rail, 176..236, its roof at 70, its foot at 104 (behind the walk strip, no footprint); on its roof at
   the right end a short staff with the pennant (staff 230, from 70 up to 44; the pennant streams out to the LEFT, from 230 to about 212,
   at Myra and at Fair Havens: the wind comes from the right). The staff stands against the land behind the harbor, never across the
   sea's level line. The cargo hatch at the back left, 34..96 by 100..110. At Myra only: the anchor lies on the deck at the right, by the
   rail (262..306 by 100..110; CONTRIBUTING section 3); at Fair Havens it is down: its cable runs out over the bow at the right edge
   (from 312, 88 down to the water) and comes up as 27:13 is told (G.cable22, 1..0). No mast (it would cross the horizon), unless it
   rises out of the top of the picture with land behind it.
   The shelter (F.shelter): a length of mended sailcloth from the deckhouse's left wall under its eave (176, 76) slanting down to the deck
   at 132, 108, made fast with cord at its two lower corners; under it the bedding and the bundle (150..170 by 104..110), and on the bundle a
   gull (the room's birds, 160, 104) until the night. Nothing round where a head comes (heads at about y 76..98).
   Called from outside: ART.deck22, DECK22. Reads F.fh (the variant), F.shelter, G.cable22.
   Hotspots (ROOMS.deck22): the harbor 0,0,320,62 · the pennant 206,42,30,30 · the deckhouse 176,70,60,34 · the lee of the deckhouse
   128,80,46,30 · beside the deckhouse 238,80,44,30 · the hatch 34,96,62,14 · the anchor (Myra) 260,94,48,16 · the shelter (when it
   stands) 130,76,46,34 · the anchor cable (Fair Havens) 300,80,20,24 · the open sea (Fair Havens) 0,40,96,22. Walk: 20..300 by 112..138.
   Light: Myra in the evening, the low sun at the left (long shadows to the right); Fair Havens by day, the sun high at the right. */
const DECK22={hz:62,rail:[84,100],house:[176,236,70,104],staff:[230,70,44],hatch:[34,96,100,110],anchor:[262,306,100,110],
  shelter:[176,76,132,108],bundle:[150,170,104,110],walk:[20,300,112,138]};
ART.deck22={w:320,q:12,variant:()=>(F.fh?'h':'m')+(F.shelter&&!F.fh?'s':''),
  paint(g,v){const r=rng(2203),H=v[0]==='h',D=DECK22;
    if(H){sky22(g,D.hz,'#a4b8cc','#dcdcd4');sea22(g,D.hz,D.rail[0],'#46708c',r);
      /* the islands that shelter the bay, low on the right; the open sea beyond them at the left */
      poly(g,[110,62,140,52,180,48,230,50,280,46,320,50,320,64,110,64],'#7a7462')}
    else{sky22(g,D.hz,'#e0a878','#f4d8b0');sea22(g,D.hz,D.rail[0],'#6a6070',r);
      poly(g,[0,64,30,40,80,24,130,18,180,26,240,14,300,22,320,18,320,64],'#6e5e58');poly(g,[80,24,130,18,150,30,100,40],'#8a7466')}
    /* the far rail */
    g.fillStyle=lg(g,0,D.rail[0],0,D.rail[1],['#7a5a3a','#5a4028']);g.fillRect(0,D.rail[0],320,D.rail[1]-D.rail[0]);R(g,0,D.rail[0],320,1.2,'#b08a5e');
    /* the deck */
    planks22(g,100,144,'#9a7852');
    /* the hatch */
    R(g,D.hatch[0],D.hatch[2],D.hatch[1]-D.hatch[0],D.hatch[3]-D.hatch[2],'#4a3422');R(g,D.hatch[0],D.hatch[2],D.hatch[1]-D.hatch[0],1,'#a07a50');
    /* the deckhouse */
    {const[x0,x1,y0,y1]=D.house;R(g,x0,y0,x1-x0,y1-y0,'#8a6a46');R(g,x0-2,y0-3,x1-x0+4,3,'#5a3e28');R(g,x0+22,y0+10,16,y1-y0-10,'#3a2a1c')}
    /* the pennant's staff (the pennant itself moves: draw) */
    R(g,D.staff[0],D.staff[2],1,D.staff[1]-D.staff[2],'#4a3422');
    /* the anchor at Myra: ART-TODO a dark low lump as a placeholder */
    if(!H){const[x0,x1,y0,y1]=D.anchor;R(g,x0,y0+4,x1-x0,y1-y0-4,'#3a3430');R(g,x0,y0+4,x1-x0,1,'#6a625a')}
    /* the shelter */
    if(v.includes('s')){const[a,b,c,d]=D.shelter;poly(g,[a,b,a,d,c,d],'#4a3a2a');poly(g,[a,b,c,d,c+3,d,a,b+3],'#d8ccae');
      R(g,D.bundle[0],D.bundle[2],D.bundle[1]-D.bundle[0],D.bundle[3]-D.bundle[2],'#8a6a4a')}},
  get light(){return F.fh?{amb:'#e8e4da',sun:[-14,-8,.3],wallY:100}:{amb:'#f0d4b0',sun:[30,-5,.4],wallY:100}},
  draw(g,t){const D=DECK22,[sx,,sy]=D.staff,w=Math.sin(t/260)*1.2;
    /* the pennant, streaming out to the left */
    poly(g,[sx,sy,sx-18,sy+2+w,sx-17,sy+4+w,sx,sy+5],'#b8382a');
    /* the anchor cable at Fair Havens, over the bow and down into the water, coming up as 27:13 is told */
    if(F.fh){const k=G.cable22==null?1:G.cable22;if(k>0)stroke(g,[312,88,320,88+12*k],'#5a4a34',1.2)}},
  front(){}};
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
   lantern hangs under the cabin's eave by two cords that part upward; its light lies long and low. Lightning far off (lightning:true),
   never over the swan's neck or the mast.
   Called from outside: ART.storm22, STORM22 (holds, way, walk). Reads phase22(), nightNow22(), G.beat, G.sk22 (0..4), G.pull22, G.over22. */
const STORM22={walk:[16,304,118,138],
  /* where whoever crosses stands at each hold, in the order of the crossing: the hatch, the cask, the mast, the lee rail. Each is where
     the far hand of the pose 'hold' (facing right) lies on the thing: the top of the ladder, the rim of the cask, the mast, the rail */
  holds:[[135,110],[194,113],[252,137],[306,126]],
  /* the calling sailor: his place by the lee rail just aft of the mast, his hand on the rail; the way he comes forward clear of the cask and
     the mast; where
     he stands beside the one he walks across, at each hold */
  home:[286,114],gate:[232,120],side:[[14,4],[14,4],[14,3],[-16,8]]};
const nightNow22=()=>phase22()==='tablet';
/* the deck's geometry (shared/grainship.js), and the water cask: upright, its middle at x, z (metres), r its radius, h its height */
let GD22=null;const gd22=()=>GD22||(GD22=SHARED.grainship.geoDeck({}));
const CASK22={x:2.68,z:6,r:.38,h:1.15};
/* the lantern under the cabin's eave, to starboard of the door: [x, y, z] in metres; its two cords go up to the eave at x0 and x1 */
const LANT22={x:1.25,y:1.45,z:11.15,c0:1.0,c1:1.5};
const lant22=()=>{const D=gd22(),y0=D.s(11.3);return{p:D.P(LANT22.x,y0+LANT22.y,LANT22.z),a:D.P(LANT22.c0,y0+1.87,LANT22.z),b:D.P(LANT22.c1,y0+1.87,LANT22.z),floor:D.P(LANT22.x,y0,11.3)}};
/* the storm sea for each picture: by day, a little lower in the lee of Cauda; by night, the dark one, the lantern's light in its rain */
const DS22={};
const ds22=v=>DS22[v]||(DS22[v]=SHARED.storm.deckSea({pal:v==='n'?'night':'day',dx:1,slant:.9,rail:84,deck0:101,height:v==='s'?.72:1,seed:2209,
  lightning:true,clear:[132,300],lamp:v==='n'?[lant22().p[0],lant22().p[1]+4,34]:undefined}));
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
  props:[{y:131,shape(g){mastShape22(g)},foot:()=>[gd22().foot.mast]},{y:112,shape(g){caskDraw22(g,'#000',1)},foot:()=>[caskFoot22()]}]};
/* the backdrop: the deck in the storm's light, with nothing beyond her (the sea is `behind`), wet; the cask; by night the lantern's glow */
function paintStorm22(g,v){const N=v==='n',GS=SHARED.grainship,r=rng(2204);
  /* the deck is wet: the bare planks darker and cooler, the grey of the sky lying in them, strongest far aft where we look along them;
     streaks of water along the planks, running toward the vanishing point as the planks do; long low pools where it lies. Painted on the
     planks before anything that stands on them; then all of her a little darker in the wet */
  const wet=(g,D)=>{const FL=D.C.map(([x,z])=>D.P(x,D.s(z),z)).flat().concat([340,190,-20,190]);clipTo(g,()=>poly(g,FL),()=>{
    comp(g,'multiply',N?.3:.24,()=>{g.fillStyle=N?'#3a4060':'#6a7488';g.fillRect(-20,40,360,110)});
    comp(g,'screen',N?.05:.16,()=>{g.fillStyle=lg(g,0,80,0,144,['#c8d0d8','#8a94a0','rgba(0,0,0,0)']);g.fillRect(-20,60,360,90)});
    for(let i=0;i<150;i++){const u=-1.1+r()*2.2,z0=2.4+r()*7,z1=z0+.4+r()*1.6,a=D.P(u*D.b(z0)*.95,D.s(z0),z0),b=D.P(u*D.b(z1)*.95,D.s(z1),z1);
      stroke(g,[a[0],a[1],b[0],b[1]],r()<.6?`rgba(200,210,220,${N?.05:.14})`:`rgba(20,24,34,${N?.2:.18})`,.5)}
    for(let i=0;i<9;i++){const x=-3.5+r()*7,z=3+r()*6,c=D.P(x,D.s(z),z),w=(6+r()*10)*4/z;comp(g,'screen',N?.04:.12,()=>poly(g,[c[0]-w,c[1],c[0]-w*.4,c[1]-.6,c[0]+w*.5,c[1]-.5,c[0]+w,c[1],c[0]+w*.3,c[1]+.6,c[0]-w*.5,c[1]+.5],'#c0c8d4'))}})};
  GS.deck(g,{beyond:()=>{},anchor:false,light:N?'night':'storm',floor:wet});
  comp(g,'source-atop',1,()=>comp(g,'multiply',N?.3:.24,()=>{g.fillStyle=N?'#3a4060':'#6a7488';g.fillRect(-30,-30,380,200)}));
  caskDraw22(g,null,0,N);
  if(N){const L=lant22(),[lx,ly]=L.p;
    /* the lantern's light: on the cabin's front about it, and a long low pool on the deck before it; nothing round */
    comp(g,'lighter',.22,()=>{g.save();g.beginPath();g.rect(110,58,84,30);g.clip();pool(g,lx,ly+4,26,7,'#ff9a48',1,'source-over');g.restore()});
    comp(g,'lighter',.13,()=>pool(g,lx,L.floor[1]+3,40,4,'#ffa050',1,'source-over'));
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
/* the mast's outline, for the prop that lays it over whoever stands behind it: its shaft up out of the picture and its collar */
function mastShape22(g){const D=gd22(),[x0,x1,z0,z1]=D.things.mast,xm=(x0+x1)/2,zm=(z0+z1)/2,f0=D.P(xm-.3,0,zm-.3),f1=D.P(xm+.3,0,zm-.3);
  R(g,f0[0],-30,f1[0]-f0[0],f0[1]+30,'#000');
  const P=D.P,a=x0-.08,b=x1+.08,c=z0-.08,d=z1+.08,h=.16,pts=[P(a,0,c),P(b,0,c),P(b,h,c),P(a,h,c),P(a,h,d),P(b,h,d),P(b,0,d),P(a,0,d)];
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);poly(g,[Math.min(...xs),Math.max(...ys),Math.max(...xs),Math.max(...ys),Math.max(...xs),Math.min(...ys),Math.min(...xs),Math.min(...ys)],'#000')}
/* what moves on her: the sea that comes aboard, the skiff, the bale going over, the lantern's flame, the captions */
function drawStorm22(g,t){const v=ART.storm22.variant(),N=v==='n',e=e22(t),DS=ds22(v);
  /* the sea on her deck, in her own frame: pass how strongly she sways now, so that its white water meets the sea's crest */
  clipTo(g,()=>{const W=wet22();g.beginPath();for(const q of W){g.moveTo(q[0],q[1]);for(let i=2;i<q.length;i+=2)g.lineTo(q[i],q[i+1]);g.closePath()}},
    ()=>DS.aboard(g,t,e,G.sway?sk22v(v):0));
  if(phase22()==='skiff')skiff22(g,t,e);
  if(N){const[lx,ly]=lant22().p,f=.85+.15*Math.sin(t/90)+.08*Math.sin(t/37);R(g,lx-1,ly-.8,2,2.6,'#ffd27a');R(g,lx-.5,ly-.2,1,1.4,rgba('#fff4d0',f))}
  if(phase22()==='skiff'&&G.pull22&&performance.now()-G.pull22<700)SHARED.beat.cap(g,'pull_22',LK.x,LK.y-56,{w:50});
  if(G.beat){const c=caller22();if(c&&c.room===G.room)SHARED.beat.call(g,c.x,c.y-56,t)}
  /* a bale going over the lee rail: up from his arms, over the rail and away to starboard */
  if(G.over22){const k=Math.min(1,(performance.now()-G.over22)/600);if(k<1){const[hx,hy]=STORM22.holds[3],x=hx+8+k*34,y=hy-22-Math.sin(k*Math.PI)*16+k*k*18;
    depth(hy+1,()=>{poly(g,[x-4,y-2.6,x+4,y-3,x+4.4,y+2.6,x-4,y+3],'#7a5c3a');R(g,x-4,y-2.6,8,.6,'#a88a62');R(g,x-4,y+2.4,8.4,.6,'#4a3420')})}}}
/* the skiff (27:16), coming up over the port rail on the men's rope as they gain on her (G.sk22, 0..4), rising and falling with the sea.
   She hangs alongside, a little outboard of the bulwark, her bow forward (toward us) and a little higher; we look down into her over
   her near gunwale, and she is full of water: grey-green to the brim, with foam in it, spilling over her gunwale and falling away
   outboard. Her near side is planked in strakes that run along her; no thwart and no oar across her. Only what is above the rail is
   seen: the rest of her is outboard, behind it. The rope from her stem goes over the rail and to the men's fists, slanting. */
const SKIFF22={z0:6.3,z1:10.2,off:.95,hb:.62,lift:[-.7,-.02,.28,.52,.7]};
function skiff22(g,t,e){const D=gd22(),S=SKIFF22,n=G.sk22||0,ph=(((e%1)+1)%1),pause=Math.sin(Math.PI*clamp((ph-.24)/.5,0,1)),
    base=S.lift[Math.min(4,n)]+.07*pause+.04*Math.sin(t/700),xc=z=>-(D.b(z)+S.off),
    hg=z=>D.s(z)+1.15+base+.16*Math.pow((S.z1-z)/(S.z1-S.z0),1.5)+.05*Math.pow((z-S.z0)/(S.z1-S.z0),2),
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
  const stem=D.P(xc(S.z0)+.05,hg(S.z0)+.04,S.z0);R(g,stem[0]-.6,stem[1]-.6,1.2,1.2,'#1a1410');g.restore();
  /* the rope: from her stem to the rail, then to the men's fists, front man first (each man's own piece the pose draws) */
  const rz=6.7,rl=D.P(-D.b(rz),D.s(rz)+D.rx(-D.b(rz),rz)+.1,rz),pts=[stem[0],stem[1],rl[0],rl[1]-.3];
  for(const h of HAUL22){const a=h.a;if(a.room!=='storm22')continue;const p=poseAt(a.look,'haul'+(a.pk||0));if(!p||!p.rope)continue;
    const[f,m]=p.rope,A=[a.x+f[0]*a.dir,a.y+f[1]],Z=[a.x+m[0]*a.dir,a.y+m[1]],first=A[0]<Z[0]?A:Z,last=A[0]<Z[0]?Z:A;pts.push(first[0],first[1]);stroke(g,pts,'#b8a07a',.7);pts.length=0;pts.push(last[0],last[1])}
  if(pts.length===4)stroke(g,pts,'#b8a07a',.7)}
/* ==== ART storm22: end ==== */

/* ==== ART tablet22: begin ==== */
/* ART-TODO. Luke's wax tablet, close, by what little light there is: a wooden frame (fine-grained, quiet), the dark wax, and on it six
   days in six columns (DAYS22): at the top of each a short upright stroke for the day, standing alone and never struck through; below it,
   apart from the stroke, the day's mark if it has one: a short slanting line with a small wedge at its western end, pointing south-west,
   west or north-west (the marks only run westward); for only the day, nothing below the stroke. The columns stand apart: no line runs
   between them, nothing is ruled. Close-view standard of Chapters Thirteen and Fourteen. light:null, walk NOW.
   Called from outside: ART.tablet22, DAYS22. Reads the flags t1..t6 and m1a..m6b.
   Hotspots: today's column (the first day without a stroke) · the days written (look) · back to the deck 0,136,120,8. */
const DAYS22=Array.from({length:6},(_,i)=>[44+i*46,26]);
ART.tablet22={w:320,q:12,paint(g){const r=rng(2205);g.fillStyle=lg(g,0,0,320,144,['#7a5434','#6a4628']);g.fillRect(0,0,320,144);
    for(let y=0;y<144;y+=2)R(g,0,y,320,.5,rgba(r()<.5?'#2a1a0c':'#c49a6a',.12));
    R(g,16,12,288,118,'#2a2018');R(g,16,12,288,1,'#120c08');R(g,16,129,288,1,'#5a4a3a')},
  light:null,
  draw(g){for(let n=1;n<=6;n++){const[cx,cy]=DAYS22[n-1];if(!F['t'+n])continue;
      R(g,cx-.5,cy,1.2,16,'#c8b48c');
      const m=markOf(n);if(!m)continue;const dy=m===1?5:m===2?0:-5,y=cy+40;
      /* the mark: from the east end down (or up, or level) to the west end, where a small wedge stands */
      stroke(g,[cx+8,y-dy,cx-6,y+dy],'#c8b48c',1.1);poly(g,[cx-9,y+dy*1.2,cx-4,y+dy-2.4,cx-4,y+dy+2.4],'#c8b48c')}
    const n=today22();if(n<=6&&lukePlays()){const[cx,cy]=DAYS22[n-1];g.strokeStyle='rgba(200,180,140,.25)';g.lineWidth=.5;g.strokeRect(cx-18,cy-6,36,70)}},
  front(){}};
/* ==== ART tablet22: end ==== */

/* ==== ART girded22: begin ==== */
/* ART-TODO. A told picture (27:17): the grain ship from the side in the storm, with the ropes passed round her hull from one side to the
   other under her keel and made fast on deck (CONTRIBUTING section 3, the undergirding): three or four of them, drawn slanting and curved
   with the hull, never square to the planks; her sail is down (the gear lowered: what it was is not shown, and nothing says so); the sea
   high round her, no horizon. light:null, walk NOW. No mast across a level line, no figurehead.
   Called from outside: ART.girded22. Reads nothing. */
ART.girded22={w:320,q:12,paint(g){const r=rng(2206);g.fillStyle=lg(g,0,0,0,144,['#3a424e','#5a626c','#3a5060']);g.fillRect(0,0,320,144);
    for(let i=0;i<50;i++)R(g,r()*320,r()*80,20+r()*40,1,'rgba(160,170,180,.2)');
    hull22(g,40,280,70,104,'#4a3422',1);
    /* the ropes round her hull, slanting and curving with it */
    for(const x of[100,150,200])stroke(g,[x,68,x+6,80,x+14,96,x+20,104],'#c8b48a',1);
    g.fillStyle=lg(g,0,96,0,144,['#2e4a5c','#1e3442']);g.fillRect(0,100,320,44);for(let i=0;i<80;i++)R(g,r()*320,100+r()*44,4+r()*10,.6,'rgba(220,230,236,.3)')},
  light:null,draw(){},front(){}};
/* ==== ART girded22: end ==== */

/* ---- the inventory ---- */
Object.assign(ICON,{
  /* the tool pouch: leather, tied at the neck */
  pouch22(g){IH.bag(g,'#8a6a46',12,14.6,7.6,6)},
  /* the needle: one slanting line, its eye a small square */
  needle22(g){stroke(g,[5,20,18,6],'#5a5a66',1.6);stroke(g,[5,19.6,18,5.6],'#e8e8f2',.7);R(g,16.6,6.4,1.2,1.2,'#2a2a30')},
  /* the needle threaded: the thread hangs from its eye in one curve */
  tneedle22(g){ICON.needle22(g);stroke(g,[17.2,7,20,10,19,15,15,19],'#e2d4aa',.7)},
  /* the sailcloth: a folded square, a dark tear across it from corner to corner (one slanting line) */
  sail22(g){IH.square(g,'#d8ccae',4,6,16,12,'#a89a7e');stroke(g,[7,16,14,10,17,8],'#3a3024',1.1)},
  /* the sailcloth mended: the same, the tear sewn with small stitches that run along it */
  msail22(g){IH.square(g,'#d8ccae',4,6,16,12,'#a89a7e');for(let i=0;i<4;i++){const x=7+i*2.6,y=15.4-i*1.8;stroke(g,[x,y,x+1.6,y-1.1],'#6a5030',.7)}},
  /* the bedding: a rolled blanket */
  bedding22(g){IH.roll(g,'#9a7656')},
  /* bread: a round loaf */
  bread22(g){oval(g,12,14,8,5.4,'#8a5a2a');oval(g,12,13,7.4,4.6,'#c48a4a');R(g,8,11,6,.8,'#e8b878')},
  /* old cord: a coil */
  cord22(g){IH.coil(g,['#b89a66','#a88a58','#c8aa72'],12,11,6.4,3,2.6)}});

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
const HAUL22=[{a:SA,x:56,y:122},{a:LK,x:78,y:124},{a:AR,x:100,y:128},{a:SD,x:122,y:126}];
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
/* a told picture (girded22) is never a point a code is kept at: it has nothing to do, and a code there would lead nowhere */
function show22(room,x,y,dir){place22(room);const e=ENT[room];enterRoom(room,x!=null?x:e[0],y!=null?y:e[1],dir||e[2]);if(room!=='girded22')codeBtn()}
async function goto22(room,x,y,dir){await fade(1,300);show22(room,x,y,dir);await fade(0,300)}
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
  const watch=setInterval(()=>{if(gone()){clearInterval(watch);if(M.state.places)dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))}},250);
  try{for(;;){const k=await M.pick(OUT22.ids,'myra',{view:'outward',legs:OUT22.legs,hint:'click_myra_where_we_put_in'});
      if(gone())return;if(!k)continue;
      if(k==='myra'){await cut(arriveMyra22);return}
      await cut(async()=>{await say(P,OUT22.say[k],THL);if(k==='tarsus')treasure()})}}
  finally{clearInterval(watch)}}
/* Myra: the brothers' bundle, the grain ship (27:6) */
async function arriveMyra22(){F.out=1;await fade(1,500);G.scene=null;setScore(MUSIC);show22('myra22');
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
  await fade(1,500);G.scene=null;setScore(MUSIC);F.fh=1;show22('deck22');await fade(0,600);
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
  F.advised=1;
  await say(P,'paul_i_said_it_as_plainly_as_i_could',TH);
  /* 27:13: a soft south wind; the anchor cable comes up over the bow (no anchor is seen) */
  await fade(1,400);await fade(0,400);
  const w=tween(fast()?200:5000,k=>{G.cable22=1-k});await tell('v13');await w;
  /* 27:14, 15: the wind comes down off the mountains; the deck in the storm */
  await tell('v14');
  await fade(1,500);G.cable22=null;show22('storm22');await fade(0,500);
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
  await fade(1,500);G.scene=null;setScore(MUSIC);show22('storm22');await fade(0,500);
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
  await tw(400);await fade(1,700);await tell('v20');G.scene=null;show22('storm22');await fade(0,700);
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
  {name:'sea',x:0,y:20,w:320,h:42,wx:150,wy:116,look:'sea_at_caesarea_look'},
  {name:'mole',x:0,y:52,w:120,h:12,wx:90,wy:116,look:'mole_look22'},
  {name:'coaster',x:146,y:64,w:162,h:32,wx:240,wy:116,look:'coaster_look22',use:()=>board22()},
  {name:'gangplank',x:188,y:74,w:30,h:40,wx:210,wy:118,def:'use',look:'gangplank_look22',use:()=>board22()}]};
ROOMS.myra22={space:.8,walk:MYRA22.walk,mood:'myra',amb:AMB.myra22,hs:[
  {name:'mountains',x:120,y:0,w:200,h:40,wx:160,wy:116,look:'mountains_of_lycia_look'},
  {name:'coaster',x:8,y:70,w:120,h:26,wx:70,wy:116,look:'coaster_at_myra_look'},
  {name:'grain_ship',x:140,y:58,w:180,h:38,wx:200,wy:116,look:'grain_ship_look',use:()=>aboard22()},
  {name:'gangplank',x:232,y:68,w:30,h:46,wx:250,wy:118,def:'use',look:'grain_ship_gangplank_look',use:()=>aboard22()}]};
ROOMS.deck22={space:.8,walk:DECK22.walk,get mood(){return F.fh?'havens':'deck'},get amb(){return F.fh?AMB.havens22:AMB.deck22},hs:[
  {name:'harbor',x:0,y:0,w:320,h:62,wx:150,wy:118,look:()=>say(P,F.fh?'fair_havens_look':'myra_harbor_look',TH)},
  {name:'open_sea',x:0,y:40,w:96,h:22,wx:60,wy:118,vis:()=>!!F.fh,look:()=>know22('kWrecks','paul_three_times_shipwrecked')},
  {name:'pennant',x:206,y:42,w:30,h:30,wx:220,wy:118,look:()=>F.fh?know22('kWind','paul_the_wind_against_us_since_sidon'):say(P,'pennant_look22',TH)},
  {name:'deckhouse',x:176,y:70,w:60,h:34,wx:206,wy:118,look:'deckhouse_look22'},
  {name:'lee_of_the_deckhouse',x:128,y:80,w:46,h:30,wx:150,wy:116,vis:()=>!F.shelter&&!F.fh,look:'free_deck_left_look',use:'free_deck_left_look',useWith:it=>rig22(it,'lee')},
  {name:'beside_the_deckhouse',x:238,y:80,w:44,h:30,wx:260,wy:116,vis:()=>!F.fh,look:'free_deck_right_look',use:'free_deck_right_look',useWith:it=>rig22(it,'weather')},
  {name:'hatch',x:34,y:96,w:62,h:14,wx:66,wy:118,look:'cargo_hatch_look22'},
  {name:'anchor',x:260,y:94,w:48,h:16,wx:280,wy:118,vis:()=>!F.fh,look:'anchor_look22',pickup:'paul_the_anchor_is_heavy',use:'paul_the_anchor_is_heavy'},
  {name:'anchor_cable',x:300,y:80,w:20,h:24,wx:290,wy:118,vis:()=>!!F.fh,look:'anchor_cable_look22'},
  {name:'shelter',x:130,y:76,w:46,h:34,wx:150,wy:116,vis:()=>!!F.shelter&&!F.fh,def:'use',look:'a_good_tent_on_a_ship',use:()=>sleep22()},
  /* the gull on the bundle (the room's birds stand it there): the room names it itself, so that its own look line wins */
  {name:'gull',x:154,y:96,w:14,h:10,wx:150,wy:116,vis:()=>!!F.shelter&&!F.fh,look:'my_first_guest_under_the_new_roof'}]};
ROOMS.storm22={space:.7,get walk(){const ph=phase22(),a=PC();return ph==='skiff'||ph==='load'||ph==='midst'?[a.x,a.x,a.y,a.y]:STORM22.walk.slice()},
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
const ENT={quay22:[150,128,-1],myra22:[100,126,1],get deck22(){return F.fh?[130,126,1]:[120,128,1]},
  get storm22(){const ph=phase22();return ph==='skiff'?[78,124,-1]:ph==='load'?[...STORM22.holds[0],1]:ph==='tablet'?[120,126,-1]:[174,124,-1]},
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
  if(ph==='myra'){pl(P,'myra22',100,126,1);pl(LK,'myra22',66,122,1);pl(AR,'myra22',46,130,1);pl(JU,'myra22',214,122,-1);
    pl(GU,'myra22',126,132,1);pl(PR1,'myra22',156,118,1);pl(PR2,'myra22',174,130,1);pl(PR3,'myra22',30,118,1);pl(SA,'myra22',278,124,-1)}
  if(ph==='shelter'){pl(P,'deck22',120,128,1);pl(LK,'deck22',60,122,1);pl(AR,'deck22',36,128,1);pl(GU,'deck22',96,134,1);pl(SB,'deck22',292,124,-1);pl(PR2,'deck22',214,118,-1)}
  if(ph==='havens'){pl(P,'deck22',130,126,1);pl(LK,'deck22',30,128,1);pl(AR,'deck22',186,132,-1);pl(GU,'deck22',104,132,1);pl(SC,'deck22',58,120,1);
    pl(JU,'deck22',232,122,-1);pl(PI,'deck22',258,118,-1);pl(OW,'deck22',284,128,-1)}
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
ROOMS.quay22.birds={gulls:[0,8,320,40],stand:[[30,96,1],[132,96,-1]]};
ROOMS.myra22.birds={gulls:[0,8,110,44],stand:[[136,96,1]]};
ROOMS.deck22.birds=()=>F.fh?{gulls:[0,6,200,30]}:F.shelter?{gulls:[0,6,320,30],stand:[[161,104,-1]]}:{gulls:[0,6,320,30]};
/* every hotspot answers Luke as it answers Paul (see act: another member uses h.as[his id]) */
for(const id of['quay22','myra22','deck22','storm22','tablet22','girded22'])for(const h of ROOMS[id].hs)if(!h.as)h.as={luke22:h};
for(const a of EVERY)if(a!==LK&&a.hs&&!a.hs.as)a.hs.as={luke22:a.hs};

return{rooms:['quay22','myra22','deck22','storm22','tablet22','girded22'],setup:setup22,start:start22,hint:hint22,music:MUSIC,topics:[],tablets:TABLETS,
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
