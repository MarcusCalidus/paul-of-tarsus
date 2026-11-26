/* Paul of Tarsus: level data for Chapter Twenty-One, "To Caesar".
   Loaded on demand by index.html (see LEVEL and loadLevel there), after the shared files its line of the manifest names (needs). Everything
   that belongs to this chapter lives here: its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots,
   dialog, cutscenes and hints.
   Caesarea, about 58 C.E. (Acts 25:1-26:32). Three days after he takes office Festus goes up to Jerusalem; the chief priests and the
   leading men ask him, as a favor, to bring Paul up, meaning to kill him on the road; Festus answers that Paul stays at Caesarea and that
   their men in authority should come down (25:1-5). After eight or ten days at most he comes down, and the next day he sits on the
   judgment seat; the Jews from Jerusalem stand round Paul with many serious charges they cannot prove; Paul has sinned against neither
   the Law of the Jews, nor the temple, nor Caesar (25:6-8). Festus, wanting their favor, asks whether he will be judged in Jerusalem;
   Paul stands before Caesar's judgment seat, asks not to be spared if he deserves death, and appeals to Caesar; Festus speaks with his
   advisers: to Caesar he will go (25:9-12). Some days later King Agrippa and Bernice come; Festus lays the case before the king, who
   wants to hear the man (25:13-22). The next day, with great show, in the audience chamber, with the military commanders and the
   leading men of the city, Festus presents him: he has nothing certain to write to his lord (25:23-27). Agrippa gives Paul leave; Paul
   stretches out his hand and makes his defense: his youth as a Pharisee, the hope, the persecution, the road at midday, the commission,
   the vision obeyed (26:1-23). Festus breaks in; Paul answers him and asks the king whether he believes the Prophets; Agrippa's answer;
   Paul's wish, except for these bonds (26:24-29). They rise; going out they say he does nothing deserving death or bonds, and Agrippa
   tells Festus that he could have been released if he had not appealed (26:30-32).
   Acts does not say where the hearing of 25:6 was held, what the audience chamber looked like, how many commanders there were, what
   anybody wore, how Paul was bound in the hall or that he showed his chain, or in what tone Agrippa answered. The end screen says so.
   The governor's clerk, his writing room and his report, the advisers' faces, the accusers' faces, the soldiers, the cart and its goad
   are invented. The publications have Festus write the report himself, with Agrippa's help; the clerk who drafts it here is invented.
   Everything that is said is invented, except the lines of the account, which stand in our own words (SP/ch21/told.md). What the account
   tells is told by the narrator (TOLD), never put into a mouth as a quotation. Narration says "they", never "we".
   Played: the governor's clerk (party member clerk21, swap:false, as Chapter Nineteen plays the nephew) before the hearing, while the
   report is drafted, and in the passage; Paul at the hearing and in the audience chamber, where a light chain on one wrist ties him to
   the soldier beside him (SHARED.cast.custody, one keeper), and where he stands still (the walk is a point).

   THE PUZZLES, AND WHY EACH HAS ONE SOLUTION
   1. Three roads (the hearing, 25:9-12). Festus asks; the travel map opens (SHARED.map.pick, as Chapter Eighteen's elders use it) with
      three places: Jerusalem, Caesarea, and the road that leaves the map at its western edge (torome). Jerusalem and Caesarea are each
      answered by a true thought of Paul's (told.md) and the map stays open; the western road is the appeal. Paul knows what the forty
      swore and what two years at Caesarea have been; the plot of 25:3 was told to the player, not to Paul, and his thought does not use it.
   2. Nothing to write (the writing room and the report, a close view). The clerk drafts the report that must go to Rome with the prisoner.
      On his table lie three papers: the commander's letter (Chapter Nineteen's lines, the same keys), the record of the hearing before
      Felix (Chapter Twenty's three charges and Paul's answers to them, the same keys), and his own notes of the hearing before Festus.
      On the report every charge ever brought is a line (REPORT21): the three of Felix's hearing, the commander's "questions of their own
      Law", and the many serious charges before Festus. Each takes one of two marks, never proved or a dispute about their own worship
      (25:18, 19: what Festus himself found), and a line can be marked only when the paper that settles it has been read (each line names
      its paper). The wrong mark is answered at once with the true reason and is not set, so the one arrangement is the only one that
      stands: revolt, the temple and the many serious charges never proved; the sect and the questions of their own Law a dispute about
      their own worship. When all five stand, the field for the charge is still empty; the clerk takes it to Festus, who lays the case
      before the king (25:14-22).
   3. Two listeners (the audience chamber, 26:24-29). After Festus breaks in, every sentence Paul can say is true, and the player chooses
      the sentence (a mixed choice, the same in every language) by choosing whom he speaks to: Talk to Festus or Talk to King Agrippa
      offers the same four sentences (LISTEN21), and they stay on offer after use. What is plain to the king is strange to the governor,
      and each answers a sentence that is not meant for him in his own way (an invented line that claims nothing about what he believed).
      The account fixes the way through: 26:25, then 26:26, to Festus; then 26:27 to the king. The narrator tells Agrippa's answer.
   4. These bonds (26:29). Paul uses the chain on his wrist (the item chain21) with the king: the far hand comes up, bent, and the chain
      with it, and he speaks the wish. The account does not say that he raised it; the end screen says so.
   The opening hand (26:1) is not a puzzle: when Paul speaks to the king, his far hand goes out first, as the account says. The road
   (26:12-18) is told, not played, over the Prologue's pictures (shared/damascus.js), built round what only Acts 26 has; the voice and the
   fall are told on the plain white screen; the blindness, the hand that led him, Ananias and the baptism are not shown or told.

   Rooms: the court of the palace by morning (court21, SHARED.caesarea.court), the clerk's writing room (write21), the report (report21, a
   close view), and the audience chamber (hall21). Each picture is a section of its own between "ART <room>: begin" and "ART <room>: end";
   what the story reads from a section is named at its head. The court and the inner hall are painted by shared/caesarea.js; the writing
   room, the report and the cart with the ox goad are painted here. */
LEVEL(21,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* One tune for the last hearings at Caesarea. It is in A, in the Aeolian mode (A, B, C, D, E, F, G), in bars of twenty steps that fall
   three, three, four, three, three, four: no earlier chapter has this key or this bar. The tune is four bars long (A B C D): up the
   triad, round the fourth and the sixth, down from the octave, and home by the second. It grows out of the palace music of the chapters
   before it: at Caesarea ("court") lyre and harp still take turns over a low string, and the sea is heard. In the writing room ("write")
   the harp has the tune alone over the low string. For the great show of 25:23 ("show") a horn calls the first two bars over a steady
   drum, and lyre and harp answer; in the audience chamber ("hall") lyre and harp at half their strength. While the road is told ("road")
   the ney has the tune and the harp rocks. In the hearing and when Festus breaks in ("tense") the low string plucks the keynote and leans
   on the note above, a drum ticks with it and almost stops every fourth bar, and the ney begins the tune and breaks off before it comes
   home; no louder than the rest. Nothing is claimed about how music was played then. */
const SCALE=[0,2,3,5,7,8,10],ST=20,
 /* the tune, a bar to a letter: [step, degree of the scale, length in steps]; E is D broken off before it comes home */
 TUNE={A:[[0,0,3],[3,2,3],[6,4,4],[10,3,3],[13,2,3],[16,4,4]],B:[[0,5,3],[3,4,3],[6,3,4],[10,4,3],[13,5,3],[16,6,4]],
   C:[[0,7,6],[6,6,4],[10,5,3],[13,4,3],[16,3,4]],D:[[0,3,3],[3,2,3],[6,1,4],[10,0,10]],E:[[0,3,3],[3,2,3],[6,1,14]],_:[]},
 bars21=s=>[...s].map(k=>TUNE[k]),
 ROCK={A:[[0,0,3],[3,4,3],[6,2,4],[10,4,3],[13,2,3],[16,4,4]],B:[[0,-2,3],[3,3,3],[6,1,4],[10,3,3],[13,1,3],[16,3,4]],
   C:[[0,-4,3],[3,0,3],[6,2,4],[10,0,3],[13,2,3],[16,0,4]],D:[[0,-3,3],[3,1,3],[6,-1,4],[10,0,10]]},
 rock21=s=>[...s].map(k=>ROCK[k]),
 LOW=[[[0,0,20]],[[0,-2,20]],[[0,-4,20]],[[0,0,10],[10,-3,10]]],
 MUSIC={dt:.12,steps:ST,group:[3,3,4,3,3,4],root:57,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['court'],oct:12,loop:8,lines:bars21('ABCD____'),vol:.52},
  {inst:'harp',moods:['court'],oct:12,loop:8,lines:bars21('____ABCD'),vol:.46},
  {inst:'bass',moods:['court','write'],oct:0,loop:4,lines:LOW,vol:.26},
  {inst:'harp',moods:['write'],oct:12,loop:8,lines:bars21('ABCD____'),vol:.42},
  {inst:'horn',moods:['show'],oct:0,loop:8,lines:bars21('AB______'),vol:.3},
  {drum:1,moods:['show'],prog:'AAAB',seq:{A:'d..t..d...t..t..d...',B:'d..t..d...t..t..dkt.'},vol:.2},
  {inst:'lyre',moods:['show','hall'],oct:12,loop:8,lines:bars21('__CD__CD'),vol:.4},
  {inst:'harp',moods:['show','hall'],oct:12,loop:4,lines:rock21('ABCD'),vol:.3},
  {inst:'bass',moods:['show','hall'],oct:0,loop:4,lines:LOW,vol:.24},
  {inst:'ney',moods:['road'],oct:12,loop:8,lines:bars21('ABCD____'),vol:.3},
  {inst:'harp',moods:['road'],oct:12,loop:4,lines:rock21('ABCD'),vol:.28},
  /* tension: the keynote plucked, leaning on the step above; the drum ticks and almost stops every fourth bar; the ney breaks off */
  {inst:'bass',moods:['tense'],oct:0,loop:1,lines:[[[0,0,3],[3,1,3],[6,0,4],[10,0,3],[13,1,3],[16,0,4]]],vol:.38},
  {drum:1,moods:['tense'],prog:'AAAB',seq:{A:'t..t..t...t..t..t...',B:'t...................'},vol:.17},
  {inst:'ney',moods:['tense'],oct:12,loop:8,lines:[TUNE.A,TUNE.E,[],[],[],[],[],[]],vol:.26}]};

/* ---- around you ---- */
const AMB={court21:{waves:.4,gulls:.4,wind:.15},write21:{waves:.14,wind:.06},report21:{waves:.08,wind:.04},hall21:{crowd:.07,wind:.03}};
/* ==== MUSIC: end ==== */

/* ============ ART ============ */
const M21=SHARED.materials,K21=SHARED.caesarea;
const FONT21=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;

/* ==== ART court21: begin ==== */
/* The court of the palace by morning, painted by shared/caesarea.js (SHARED.caesarea.court, whose header describes it), with the scribe's
   desk at the back left of the dais (desk) and no small table beside the seat (table:false: the advisers stand there at the hearing).
   At the left edge, a carter's two-wheeled cart stands unhitched in front of the sea wall, by the gate of the palace (out of the picture
   at the left), its ox goad lying along its bed (CRT21, cart21 below). Its wheels are solid discs, with no spokes. The goad lies along
   the bed and crosses neither the cart's rails, the coping of the sea wall nor the horizon.
   Called from outside: ART.court21. Reads F.gull (a gull stands on the governor's seat until the clerk sends it off; see the birds).
   Hotspots (ROOMS.court21): the sea 0,40,186,38 · the sea wall 0,78,186,18 · the governor's seat 226,78,26,24 · the dais 196,96,112,16 ·
   the desk 152,88,36,22 · the cart 4,110,42,28 · the ox goad 6,106,46,8 · the way to the writing room 304,96,16,48. Walk: 30..300 by
   114..138 (SHARED.caesarea.WALK); while Paul is played (chained) the walk is his own place. Actors: the clerk sits at the desk 162,110;
   Festus on the seat 238,100; the advisers 270,101 and 292,101; Paul 210,128 and the soldier beside him on his left (192,127.5); the
   accusers round them (25:7, ROUND21), each a step off and facing Paul, arms down: at his right one between the governor's seat and the
   first adviser (254,120) and one before him (250,137), at his left one behind the soldier (196,116) and one beyond the clerk's desk
   (146,126). None of them stands before the desk, the seat, the advisers, Paul or the soldier, and no head comes under a gull (the
   morning's gulls stand at the far left of the sea wall); the officer 300,130. After the hearing Bernice 76,124 and King Agrippa 100,120 facing
   right, Festus 128,120 facing left. Footprint: the cart 30,114,25,22 (the whole of it inside the strip, so that nobody stands behind
   it). */
const CART21={x0:4,x1:50,top:108.8,foot:136};
let SC21=null;
ART.court21={w:320,q:12,paint(g){SC21=K21.court(g,{hour:'morning',table:false,desk:1});cart21(g)},light:K21.light('morning'),
  draw(g,t){if(SC21)SC21.draw(g,t);chains21(g)},front(){},
  /* the cart covers the floor from the sea wall's side to the front of its wheel and the foot of its pole: nobody stands behind it,
     where the goad on its bed would run across his legs */
  props:[{y:136,shape(g){cartShape21(g,'#000')},foot:[30,114,25,22]}]};
/* The cart: a carter's farm cart on two solid wheels, standing unhitched, seen from its near side and a little from above, its front
   toward the hall. Its bed is a box of boards: the near side two planks one above the other (their seam runs the length of the bed and
   meets nothing), the inside of the bed in the shade of the near side, the far side's rail lit along its top, and the outer face of the
   front end turned to the low sun at the right. The near wheel stands outside the bed: a solid disc of three planks whose seams run one
   way only and stop at the rim, its tread lit on the sun's side, and a small square hub; of the far wheel only a curve shows under the
   bed. The pole comes out under the front corner of the bed and runs toward us down to the paving, where its end rests; it lies wholly
   on one paving stone (between the joints at y 121.6 and 132.2 and the slanting joints on either side) and crosses no joint. Along the
   bed lies the ox goad: a plain rod a little longer than the bed, resting on its two ends, a small iron point at its left end and a
   small flat iron blade at its right, a little wider than the rod and running the same way (never across it); the rod crosses nothing
   but the slanting tops of the cart's two ends. The cart casts its shadow to the left, away from the sun. Nothing round lies where a
   head comes. */
const CRT21={top:113.4,seam:117.4,bot:121.6,x0:4,x1:44,dx:6,dy:4.6,wheel:[27,127,9],far:[33.4,122.6,8.6],
  pole:[44,121.6,46.6,121.6,40.4,131.6,37,131.4],goad:[1.4,110.6,51.6,112.5]};
function cartShape21(g,c){const C=CRT21,{x0,x1,top,bot,dx,dy}=C,[gx0,gy0,gx1,gy1]=C.goad;
  poly(g,[x0,top,x0+dx,top-dy,x1+dx,top-dy,x1+dx,bot-dy-1,x1,bot,x0,bot],c);poly(g,C.pole,c);
  g.fillStyle=c;g.beginPath();g.arc(C.wheel[0],C.wheel[1],C.wheel[2]+.8,0,6.2832);g.fill();g.beginPath();g.arc(C.far[0],C.far[1],C.far[2],0,6.2832);g.fill();
  poly(g,[gx0-.4,gy0-.8,gx1+.8,gy1-1.2,gx1+.8,gy1+1.2,gx0-.4,gy0+.9],c)}
function cart21(g){const C=CRT21,{x0,x1,top,seam,bot,dx,dy}=C,r=rng(2131),[wx,wy,wr]=C.wheel,[fx,fy,fr]=C.far;
  /* the shadow, cast to the left and a little toward us by the low sun at the right, and the shade under the bed */
  comp(g,'multiply',.5,()=>{poly(g,[-8,124,x1+dx-4,124,x1+2,131.6,36,137.2,-10,137.2]);g.fillStyle=lg(g,0,124,0,138,['rgba(120,104,140,.5)','rgba(96,80,120,1)']);g.fill()});
  M21.shadow(g,wx-4,136.2,10,1.6,.6);M21.shadow(g,C.pole[6]-.6,131.8,2.6,.8,.5);
  /* the far wheel, in the shade under the bed: only its lower curve shows between the near wheel and the pole */
  g.fillStyle='#3e2c1e';g.beginPath();g.arc(fx,fy,fr,0,6.2832);g.fill();
  g.strokeStyle='rgba(150,112,72,.55)';g.lineWidth=.5;g.beginPath();g.arc(fx,fy,fr-.4,-.5,1.1);g.stroke();
  /* the inside of the bed: the inner face of the far side and of the left end, deep in the shade of the near side */
  const IN=[x0,top,x0+dx,top-dy,x1+dx,top-dy,x1,top];poly(g,IN);g.fillStyle=lg(g,0,top-dy,0,top,['#6e5236','#4a3422','#3a2818']);g.fill();
  clipTo(g,()=>poly(g,IN),()=>{tex(g,'wood',.3,x0,top-dy,x1+dx-x0,dy,'overlay',.6);
    /* the left end's inner face, turned to the sun */
    poly(g,[x0,top,x0+dx,top-dy,x0+dx+2.2,top-dy,x0+2.2,top],'#8e6c48');
    R(g,x0,top-dy,x1+dx,.6,'#b48c5c')});
  /* the far side's rail, lit along its top */
  R(g,x0+dx,top-dy-.2,x1-x0,.5,'#a8845a');
  /* the front end, its outer face in the sun: two planks, their seam slanting with the top */
  const FR=[x1,top,x1+dx,top-dy,x1+dx,bot-dy-1,x1,bot];poly(g,FR);g.fillStyle=lg(g,x1,0,x1+dx,0,['#b88e5e','#d2a874']);g.fill();
  clipTo(g,()=>poly(g,FR),()=>{tex(g,'wood',.35,x1,top-dy,dx,bot-top+dy,'overlay',.6);stroke(g,[x1,seam,x1+dx,seam-dy],'rgba(70,46,26,.6)',.5);
    stroke(g,[x1,seam+.5,x1+dx,seam-dy+.5],'rgba(255,226,170,.35)',.5)});
  stroke(g,[x1+.2,top,x1+dx+.2,top-dy],'#f0cc94',.5);
  /* the near side: two long boards, the upper one's top a rail catching the light; the side in the shade of its own bed */
  M21.board(g,x0,top,x1-x0,seam-top,'#7e5e3e',r);M21.board(g,x0,seam,x1-x0,bot-seam,'#6e5034',r);
  comp(g,'multiply',.35,()=>{g.fillStyle=lg(g,x0,0,x1,0,['#5a4a6a','#ffffff']);g.fillRect(x0,top,x1-x0,bot-top)});
  R(g,x0,top,x1-x0,.6,'#d4aa76');R(g,x0,bot-.6,x1-x0,.6,'#2e2016');R(g,x1-.6,top,.6,bot-top,'#c89a66');
  /* the pole, coming out under the front corner and running toward us to the paving, widening as it nears; lit on the sun's side */
  const PL=C.pole;poly(g,PL);g.fillStyle=lg(g,PL[6],0,PL[4],0,['#4e3624','#6e4e30','#9a7246']);g.fill();
  stroke(g,[PL[2]-.3,PL[3]+.4,PL[4]-.3,PL[5]-.2],'#c49a68',.5);R(g,PL[0],PL[1],PL[2]-PL[0],.5,'rgba(30,20,12,.4)');
  /* the near wheel: a solid disc of three planks, the seams upright and stopping at its rim; its tread, lit by the sun at the right, a
     crescent on that side; a small square hub */
  g.fillStyle='#8c6a44';g.beginPath();g.arc(wx+.7,wy,wr,0,6.2832);g.fill();
  g.fillStyle=lg(g,wx-wr,wy-wr,wx+wr,wy+wr,['#7a5a3a','#6a4c30','#4a3422']);g.beginPath();g.arc(wx,wy,wr,0,6.2832);g.fill();
  clipTo(g,()=>{g.beginPath();g.arc(wx,wy,wr-.4,0,6.2832)},()=>{tex(g,'vert',.35,wx-wr,wy-wr,wr*2,wr*2,'overlay',.6);
    for(const sx of[wx-3.6,wx+2.6]){R(g,sx,wy-wr,.5,wr*2,'rgba(36,24,14,.55)');R(g,sx+.5,wy-wr,.5,wr*2,'rgba(220,176,120,.22)')}
    pool(g,wx+3,wy-3,6,5,'#f8d8a8',.18,'screen')});
  g.strokeStyle='rgba(40,26,16,.7)';g.lineWidth=.8;g.beginPath();g.arc(wx,wy,wr-.6,0,6.2832);g.stroke();
  g.strokeStyle='rgba(255,220,160,.5)';g.lineWidth=.5;g.beginPath();g.arc(wx+.5,wy,wr+.1,-1.1,1.1);g.stroke();
  R(g,wx-1.6,wy-1.6,3.2,3.2,'#3a281a');R(g,wx+1.1,wy-1.6,.5,3.2,'#b08a5e');R(g,wx-1.6,wy-1.6,3.2,.5,'#6a4c30');
  /* the goad, along the bed: a plain rod of pale wood, lit along its top; at its left end a small iron point, at its right a small flat
     blade a little wider than the rod, running the same way */
  const[gx0,gy0,gx1,gy1]=C.goad,ang=Math.atan2(gy1-gy0,gx1-gx0),L=Math.hypot(gx1-gx0,gy1-gy0);
  g.save();g.translate(gx0,gy0);g.rotate(ang);
  comp(g,'multiply',.45,()=>{g.fillStyle='#3a2a3a';g.fillRect(2,.7,L-4,.8)});
  g.fillStyle=lg(g,0,-.7,0,.7,['#f4dcaa','#c8a474','#86683e']);g.fillRect(2.2,-.7,L-5,1.4);
  poly(g,[-.2,0,2.4,-.55,2.4,.55]);g.fillStyle=lg(g,0,-.6,0,.6,['#d8dce0','#8a8e96','#4a4c54']);g.fill();
  poly(g,[L-3,-.6,L+.2,-.95,L+.2,.95,L-3,.6]);g.fillStyle=lg(g,0,-1,0,1,['#e4e6ea','#9a9ea6','#50525a']);g.fill();
  g.fillStyle='#f4f2ec';g.fillRect(L-.3,-.95,.5,1.9);
  g.restore()}
/* ==== ART court21: end ==== */

/* ==== ART write21: begin ==== */
/* The governor's clerk's writing room (invented), in the palace, by morning. A plain working room under a ceiling of joists: limewashed
   walls over a dado painted ochre, a floor of smooth red mortar (no joints, so that nothing runs behind the table's legs). At the left a
   window, a deep square opening high in the back wall onto the morning sky (no bars): its left side and its lintel's underside show the
   thickness of the wall, its sill catches the light, and the sun through it lies on the floor as one long soft patch, slanting toward us
   and to the right, which is where the figures' shadows fall too. Between the window and the table, high on the wall above every head,
   two shelves on brackets at their ends (no upright under the middle) hold the office's rolls, lying with one end toward us: each shows
   that end as a face, its edge darker, without a stick or a tie, in one row to a shelf (never two by two). Against the back wall the
   long writing table (WT21), its legs solid boards at its two ends, none under its middle; under it the clerk's stool, pushed in. On the
   table, from the left: the commander's letter (an unrolled sheet), the record of the hearing before Felix (a sheet), the draft of the
   report (the largest sheet, still bare below its first lines), the clerk's notes of the hearing before Festus (a wax tablet in its
   wooden frame) and a square ink pot, with a reed pen lying along the table in front of it, across nothing. The writing on the sheets is
   rows of small strokes that stop short of the margins; nothing is ruled. At the right the door to the court, open: through it the
   court's paving in the sun and, across it, a sunlit wall that closes the view. Heads in the walk strip come at y 70..101: behind them
   lie the plaster, the dado, the table and the door; nothing round (the rolls are higher, the ink pot is square).
   Called from outside: ART.write21. Reads nothing.
   Hotspots (ROOMS.write21): the window 24,24,40,42 · the commander's letter 154,78,24,14 · the record before Felix 178,78,26,14 · the
   report 204,76,30,16 · my notes 234,78,22,14 · the ink pot 256,74,12,18 · the door to the court 284,38,32,64. Walk: 24..296 by 116..138.
   Wall foot y 100; the table 150..270, its top from 85 (back) to 92 (front), its front 92..96, its feet 112 (behind the strip, no
   footprint). Light: from the window at the left (sun [16,6,.28]). */
ART.write21={w:320,q:12,paint(g){paintWrite21(g)},light:{amb:'#e8dcc6',sun:[16,6,.28],wallY:100},draw(){},front(){}};
const WT21={x0:150,x1:270,back:85,top:92,front:96,foot:112,legs:[152,264],lw:4},WIN21=[24,24,64,66],DOOR21=[284,38,316,102],VY21=66,VX21=180;
function paintWrite21(g){const r=rng(2101),W='#e2d4b8';
  /* the back wall: limewashed plaster, a little worn, a crack or two high up where no head comes */
  plaster(g,0,8,320,92,W,r,{patch:0,cracks:0,t:.34,top:.03,bot:-.05});
  SHARED.temple.age(g,0,8,320,92,rng(2102),.35);
  for(const[x,y,n]of[[112,14,3],[206,12,4]])M21.crack(g,x,y,n,r,.45);
  /* the dado: an ochre band with a thin moulding along its top, stopping at the door */
  const DY=78;g.fillStyle=lg(g,0,DY,0,100,['#9e5440','#8e4836','#7a3c2e']);g.fillRect(0,DY,DOOR21[0],100-DY);
  inRect(g,0,DY,DOOR21[0],100-DY,()=>{tex(g,'mott',.4,0,DY,DOOR21[0],100-DY,'overlay',1);tex(g,'blotch',.2,0,DY,DOOR21[0],100-DY,'soft-light',1)});
  R(g,0,DY-1.2,DOOR21[0],1.2,'#dcc8a4');R(g,0,DY-1.2,DOOR21[0],.5,'#f4e6c8');R(g,0,DY,DOOR21[0],.5,'rgba(60,40,24,.45)');
  R(g,316,DY-1.2,4,1.2,'#d8c49c');g.fillStyle='#8e4836';g.fillRect(316,DY,4,100-DY);
  ao(g,0,94,320,6,'b',.3,'#3a2418');
  M21.ceiling(g,320,{U:8,x0:10,step:34,vx:VX21,vy:VY21,r,boards:'#3a2a1e',joist:'#6a4c30',plate:'#7a5a38'});
  floorWrite21(g,r);
  windowWrite21(g,W);
  shelvesWrite21(g,r);
  chestWrite21(g,r);
  doorWrite21(g,W);
  tableWrite21(g,r);
  /* the morning light from the window: warm on the left, the room falling off into a cooler shade toward the right, where the door lets
     in the court's light again */
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,222,170,1)','rgba(240,214,186,.6)','rgba(170,168,206,.7)','rgba(220,210,200,.6)']);g.fillRect(0,0,320,144)});
  comp(g,'multiply',.3,()=>{g.fillStyle=rg(g,60,90,300,['#ffffff','#f0e6e0','#a89cb8']);g.fillRect(0,0,320,144)});
  sunWrite21(g)}
/* the floor: smooth red mortar with a few pale chips of stone in it, worn paler where people walk; no joints */
function floorWrite21(g,r){const y0=100;g.fillStyle=lg(g,0,y0,0,144,['#86624a','#987056','#a67e62']);g.fillRect(0,y0,320,144-y0);
  inRect(g,0,y0,320,144-y0,()=>{tex(g,'mott',.45,0,y0,320,144-y0,'overlay',1);tex(g,'blotch',.1,0,y0,320,144-y0,'soft-light',1);
    pool(g,170,128,130,10,'#e8c0a0',.16,'source-over');
    for(let i=0;i<260;i++){const y=y0+2+r()*42,x=r()*320,s=.5;R(g,x,y,s+(y-y0)*.006,s,r()<.6?'rgba(240,226,206,.35)':'rgba(70,40,30,.25)')}});
  ao(g,0,y0,320,5,'t',.35,'#3a2418')}
/* the window: the morning sky in a deep opening; its left side and its lintel's underside, in shade, show the wall's thickness; a stone
   sill, lit along its top. No bars, nothing round. */
function windowWrite21(g,W){const[x0,y0,x1,y1]=WIN21,k=.04,ix=x0+(VX21-x0)*k,iy=y0+(VY21-y0)*k;
  g.fillStyle=lg(g,0,iy,0,y1,['#86a8d6','#a8c2de','#d6dce0','#f0e2c8']);g.fillRect(ix,iy,x1-ix,y1-iy);
  pool(g,ix+6,y1-6,26,10,'#fff2d0',.5,'screen');
  for(const[x,y,w]of[[ix+4,iy+9,16],[ix+14,iy+16,14]]){pool(g,x+w/2,y,w/2,1.2,'#ffffff',.45,'source-over');R(g,x+w*.2,y+.6,w*.6,.5,'rgba(160,170,200,.35)')}
  /* the left side and the lintel's underside */
  poly(g,[x0,y0,ix,iy,ix,y1,x0,y1]);g.fillStyle=lg(g,x0,0,ix,0,[tint(W,-.3),tint(W,-.2)]);g.fill();
  poly(g,[x0,y0,x1,y0,x1,iy,ix,iy],tint(W,-.38));R(g,ix,iy-.5,x1-ix,.5,'rgba(255,230,190,.4)');
  stroke(g,[ix+.25,iy,ix+.25,y1],'rgba(255,236,200,.5)',.5);
  /* the sill */
  R(g,x0-2,y1,x1-x0+4,1.6,tint(W,.08));R(g,x0-2,y1,x1-x0+4,.5,'#fff4dc');ao(g,x0-2,y1+1.6,x1-x0+4,4,'t',.3,'#3a2a24')}
/* the shelves: two boards on brackets at their ends, high on the wall; on each a row of rolls lying with one end toward us. Each end is
   a face of the roll's own pale tone, its rim a little darker and the turns of the sheet a faint curve inside it, lit from the window's
   side; no stick, no tie. Their soft shade on the wall below and to the right. */
function shelvesWrite21(g,r){const x0=82,x1=140,q=rng(2105);
  for(const sy of[42,58]){
    /* the rolls, one row, some lying a little deeper on the shelf than others; a few in cases of dark leather */
    const rolls=[];for(let x=x0+2;x<x1-3;){const rr=2.1+q()*.7;if(x+rr*2>x1-1)break;rolls.push([x+rr,sy-rr,rr,q()<.22,q()*.5]);x+=rr*2+.2+q()*1.2}
    comp(g,'multiply',.35,()=>{for(const[cx,cy,rr]of rolls)oval(g,cx+1.6,cy+1,rr,rr,'#6a5a6a');R(g,x0+1,sy+1.4,x1-x0,2.6,'#8a7a80')});
    for(const[cx,cy0,rr,cased,back]of rolls){const cy=cy0-back*.3,c=cased?'#6e4a2e':q()<.35?'#d4bc8e':q()<.5?'#e2cea2':'#c8ae80';
      /* the side of the roll, running back from its end toward the wall: a crescent of its own darker tone at the right and below */
      for(let k=1.6;k>0;k-=.4)oval(g,cx+k,cy+k*.3,rr,rr,tint(c,-.3-k*.08));
      /* its end, a face: a darker rim, the face itself lit from the left, the turns of the sheet a faint curve running inward */
      oval(g,cx,cy,rr,rr,tint(c,-.24));oval(g,cx-.2,cy-.15,rr-.5,rr-.5,c);
      if(!cased){g.strokeStyle=rgba(tint(c,-.3),.6);g.lineWidth=.4;g.beginPath();for(let a=0;a<9.4;a+=.3){const d=(rr-.7)*(1-a/11);g.lineTo(cx-.2+Math.cos(a+.8)*d,cy-.15+Math.sin(a+.8)*d)}g.stroke()}
      else{oval(g,cx-.2,cy-.15,rr-1.1,rr-1.1,tint(c,.08))}
      g.strokeStyle=cased?'rgba(200,150,100,.5)':'rgba(255,248,226,.6)';g.lineWidth=.4;g.beginPath();g.arc(cx-.2,cy-.15,rr-.7,2.7,4.3);g.stroke()}
    /* the board, its front edge and the underside seen from below, and its brackets at the two ends */
    M21.board(g,x0,sy,x1-x0,1.6,'#7a5636',r);R(g,x0,sy,x1-x0,.5,'#c09468');R(g,x0,sy+1.6,x1-x0,.6,'#4a3220');
    for(const bx of[x0+1.5,x1-3.5]){poly(g,[bx,sy+2.2,bx+2,sy+2.2,bx+2,sy+5.4,bx+.6,sy+3.8],'#5e4228');R(g,bx,sy+2.2,.5,1.6,'#9a7448')}}}
/* the chest under the shelves, against the wall: a plain box of boards that run along it, posts at its corners only, its lid shut; lit
   from the window's side */
function chestWrite21(g,r){const x0=88,x1=134,y0=88,y1=104,lid=2.2;
  comp(g,'multiply',.35,()=>poly(g,[x0+2,y1,x1+2,y1,x1+7,y1+2.6,x0+7,y1+2.6],'#4a3a4a'));M21.shadow(g,(x0+x1)/2+3,y1+.4,24,1.4,.4);
  M21.board(g,x0,y0+lid,x1-x0,(y1-y0-lid)/2,'#7e5a38',r);M21.board(g,x0,y0+lid+(y1-y0-lid)/2,x1-x0,(y1-y0-lid)/2,'#74522f',r);
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,x0,0,x1,0,['#ffffff','#7a6a80']);g.fillRect(x0,y0,x1-x0,y1-y0)});
  for(const px of[x0,x1-2])R(g,px,y0+lid,2,y1-y0-lid,'#5e4228');R(g,x0,y0+lid,.5,y1-y0-lid,'#b08860');
  M21.board(g,x0-.6,y0,x1-x0+1.2,lid,'#8a6640',r);R(g,x0-.6,y0,x1-x0+1.2,.5,'#d0a878');R(g,x0-.6,y0+lid,x1-x0+1.2,.5,'rgba(30,18,10,.5)');
  ao(g,x0,y1-3,x1-x0,3,'b',.3,'#1a1010')}
/* the door to the court, open: a stone frame; the right side of the opening shows the wall's thickness; through it the court's paving
   in the sun and a sunlit wall across the court that closes the view; a worn threshold */
function doorWrite21(g,W){const[x0,y0,x1,y1]=DOOR21,k=.04,ix=x1+(VX21-x1)*k;
  const FW=72;inRect(g,x0,y0,x1-x0,y1-y0,()=>{
    /* the wall across the court, in the sun, its courses small with the distance; at its foot the court's paving runs toward us */
    SHARED.temple.stone(g,x0,y0,x1-x0,FW-y0,rng(2106),{bh:3.4,bw:11,c:'#ead8b4',v:.06,age:.5});
    g.fillStyle='rgba(255,232,190,.28)';g.fillRect(x0,y0,x1-x0,FW-y0);ao(g,x0,FW-5,x1-x0,5,'b',.25,'#6a5040');
    pave(g,100,FW,340,y1,'#eadcbc',rng(2108),{vx:VX21,vy:VY21,rows:4,step:30,v:.05,t:.25});
    g.fillStyle='rgba(255,240,210,.25)';g.fillRect(x0,FW,x1-x0,y1-FW);
    pool(g,(x0+x1)/2,y1-8,24,10,'#fff4dc',.3,'screen')});
  /* the right side of the opening, in shade */
  poly(g,[ix,y0+1.6,x1,y0,x1,y1,ix,y1],tint(W,-.18));stroke(g,[ix+.25,y0+1.6,ix+.25,y1],'rgba(255,236,200,.35)',.5);
  /* the frame: plain dressed stone, lit from the left */
  R(g,x0-2.4,y0-2.4,x1-x0+4.8,2.4,tint(W,.04));R(g,x0-2.4,y0-2.4,x1-x0+4.8,.5,'#fff2d8');R(g,x0-2.4,y0,x1-x0+4.8,.5,'rgba(70,52,40,.45)');
  R(g,x0-2.4,y0,2.4,y1-y0,tint(W,.06));R(g,x0-2.4,y0,.5,y1-y0,'#fff2d8');R(g,x0-.5,y0,.5,y1-y0,'rgba(70,52,40,.4)');
  /* the threshold */
  R(g,x0-2.4,y1-1.6,x1-x0+4.8,1.6,'#cdb898');R(g,x0-2.4,y1-1.6,x1-x0+4.8,.5,'#f0e0c0')}
/* the writing table and the stool under it, and what lies on the table */
function tableWrite21(g,r){const T=WT21,Wd='#94683e',q=rng(2107);
  /* the table's shadow on the floor and on the dado, cast to the right and toward us */
  comp(g,'multiply',.4,()=>{poly(g,[T.x0+6,T.foot,T.x1+4,T.foot,T.x1+10,T.foot+3,T.x0+12,T.foot+3],'#5a4a6a');poly(g,[T.x0+3,T.front,T.x1+3,T.front,T.x1+5,100,T.x0+5,100],'#7a6a80')});
  M21.shadow(g,(T.x0+T.x1)/2+4,T.foot+.4,64,2.4,.4);
  /* the stool, pushed in under the table: a thick board on two legs at its ends */
  const sx0=212,sx1=226,st=101;comp(g,'multiply',.3,()=>oval(g,(sx0+sx1)/2+2,110.4,9,1.2,'#3a2a3a'));
  for(const x of[sx0+.6,sx1-2.2])M21.board(g,x,st+1.2,1.6,110-st-1.2,'#4e3622',r,1);
  M21.board(g,sx0,st,sx1-sx0,1.6,'#6a4a2e',r);
  /* the legs: solid boards at the two ends, lit on the window's side */
  for(const lx of T.legs){M21.board(g,lx,T.front,T.lw,T.foot-T.front,'#5e4028',r,1);R(g,lx,T.front,.6,T.foot-T.front,'#9a7048');ao(g,lx,T.foot-3,T.lw,3,'b',.3,'#1a1010')}
  /* the top, seen from above: the boards run along it; its front edge lit; the apron in its own shade */
  g.fillStyle=lg(g,0,T.back,0,T.top,[tint(Wd,-.08),Wd,tint(Wd,.1)]);g.fillRect(T.x0,T.back,T.x1-T.x0,T.top-T.back);
  inRect(g,T.x0,T.back,T.x1-T.x0,T.top-T.back,()=>{M21.plank(g,T.x0,T.back,T.x1-T.x0,T.top-T.back,Wd,r);R(g,T.x0,T.back+3.4,T.x1-T.x0,.4,'rgba(40,24,14,.35)')});
  R(g,T.x0,T.back,T.x1-T.x0,.5,'rgba(40,24,14,.5)');
  M21.board(g,T.x0,T.top,T.x1-T.x0,T.front-T.top,'#5a3e26',r);R(g,T.x0,T.top,T.x1-T.x0,.6,'#c8a070');
  /* the papers: each lies flat, its soft shade to the right and toward us */
  const sheet=(x0,x1,y0,y1,c,rows,o)=>{o=o||{};comp(g,'multiply',.35,()=>poly(g,[x0+1,y0+.8,x1+1,y0+.8,x1+1.4,y1+.6,x0+1.4,y1+.6],'#4a3a3a'));
    poly(g,[x0+.4,y0,x1-.4,y0,x1,y1,x0,y1]);g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.04),c,tint(c,.06)]);g.fill();
    clipTo(g,()=>poly(g,[x0+.4,y0,x1-.4,y0,x1,y1,x0,y1]),()=>{for(let y=y0;y<y1;y+=.6+q()*.6)R(g,x0,y,x1-x0,.5,q()<.5?'rgba(140,110,60,.1)':'rgba(255,250,230,.12)')});
    R(g,x0,y1-.5,x1-x0,.5,'rgba(255,250,232,.6)');
    /* the writing: each row one run of ink whose strength wavers, with a word space or two; the spaces of one row stand well clear of
       those of the next, so that no four strokes meet round a gap */
    let prev=[];for(let i=0;i<rows;i++){const y=y0+1+i*1.3*(o.sp||1),xs=x0+1.6+(i?0:.4),end=x1-1.6-(i===rows-1&&o.short?(x1-x0)*.4:0),gaps=[];
      for(let t=0;t<12&&gaps.length<2;t++){const gx=xs+2+q()*(end-xs-4);if(gaps.concat(prev).every(p=>Math.abs(p-gx)>2.6))gaps.push(gx)}
      for(let x=xs;x<end;){const l=Math.min(end-x,.6+q()*1.4),gp=gaps.find(p=>p>=x&&p<x+l);
        R(g,x,y,gp?gp-x:l,.5,rgba('#32200f',.38+q()*.3));x=gp?gp+.7:x+l}prev=gaps}};
  sheet(156,176,86.2,90.6,'#e6d8b4',3);
  sheet(181,203,86,90.8,'#e2d2aa',3);
  sheet(207,233,85.6,91.2,'#efe4c4',2,{short:1,sp:1.1});
  /* the wax tablet: a frame of boxwood round its dark wax, the notes scratched pale into it */
  {const x0=236,x1=254,y0=86,y1=91;comp(g,'multiply',.35,()=>R(g,x0+1,y0+1,x1-x0,y1-y0,'#3a2a2a'));
    R(g,x0,y0,x1-x0,y1-y0,'#b08c5c');R(g,x0,y0,x1-x0,.5,'#dcbc88');R(g,x0,y1-.5,x1-x0,.5,'#6e5232');
    R(g,x0+1.2,y0+1,x1-x0-2.4,y1-y0-2,'#34261a');R(g,x0+1.2,y0+1,x1-x0-2.4,.5,'#140c08');
    for(let i=0;i<2;i++){let x=x0+2;const y=y0+1.8+i*1.4;while(x<x1-3){const l=Math.min(x1-3-x,.8+q()*2);R(g,x,y,l,.5,'rgba(220,196,150,.6)');x+=l+.6+q()*.6}}}
  /* the ink pot: a small square pot of dark glazed clay, lit on the window's side, its square mouth dark */
  {const x0=259,x1=264,y0=82,y1=89;comp(g,'multiply',.4,()=>poly(g,[x0+1,y1,x1+1,y1,x1+3,y1+1.4,x0+2,y1+1.4],'#2a1a2a'));
    g.fillStyle=lg(g,x0,0,x1,0,['#7a6a62','#4a3e3a','#2e2624']);g.fillRect(x0,y0+1,x1-x0,y1-y0-1);
    R(g,x0,y0,x1-x0,1.2,'#5e524c');R(g,x0+1,y0+.2,x1-x0-2,.7,'#120c0a');R(g,x0,y0+1.2,.5,y1-y0-1.2,'#a8988c');R(g,x0,y1-.5,x1-x0,.5,'#1a1210')}
  /* the reed pen, lying along the table in front of the pot, its cut point to the left */
  stroke(g,[256.2,91.2,264.6,90.6],'rgba(40,24,14,.35)',.8);stroke(g,[256,90.8,264.4,90.2],'#c8b080',.6);stroke(g,[255.2,90.9,256.2,90.8],'#3a2a1a',.5)}
/* the sun through the window: one long soft patch on the floor, slanting toward us and to the right, and its warm light on the wall under
   the window */
function sunWrite21(g){
  /* the patch, in passes from a wide faint one to its bright core, so that its edges are soft */
  for(const[d,a]of[[4,.07],[2.6,.08],[1.4,.1],[.4,.14]])comp(g,'screen',a,()=>{poly(g,[38-d,101,74+d,101,128+d*1.4,140,78-d*1.4,140]);
    g.fillStyle=lg(g,0,101,0,140,['#ffe8c0','#ffd8a0']);g.fill()});
  pool(g,92,122,44,12,'#ffd8a8',.1,'screen');
  /* the window's light thrown back onto the wall under it and onto the dado */
  pool(g,46,80,30,14,'#ffe8c0',.2,'screen')}
/* ==== ART write21: end ==== */

/* ==== ART report21: begin ==== */
/* The report, close, as it lies on the clerk's table, in the morning light from the window at the left (the close-view standard of
   Chapters Thirteen and Fourteen). The table's wood is fine-grained and quiet, its grain running one way, its seams only above and below
   the sheet, where they meet nothing. The sheet of papyrus, its edges a little uneven and frayed, its fibers running across only, a faint
   stain or two. At its head the line of address (HBOX21); then the charges ever brought, one to a line (RBOX21), and beside each, at the
   right, the mark the clerk has set (MBOX21), written in a smaller hand in a redder ink; below them the field for the charge on which the
   prisoner is sent (FBOX21): its label, and under it nothing, a little paler where the sheet was smoothed for the writing that never
   came. No line is ruled and nothing is struck through: a mark is a word beside its line, with its sign in the left margin, clear of
   the letters: never proved, a short slanting stroke; a dispute about their own worship, a small hollow diamond. The clerk's reed pen
   lies on the table below the sheet, along it, not across it.
   Called from outside: ART.report21. Reads G.mk21, F.report.
   Hotspots: each charge (RBOX21), each mark (MBOX21, the same as its charge), the field (FBOX21), back to the table 0,136,120,8. Walk:
   none (a close view). */
const RBOX21=Array.from({length:5},(_,i)=>[28,36+i*15,190,13]),MBOX21=Array.from({length:5},(_,i)=>[224,36+i*15,72,13]),
  HBOX21=[28,10,264,14],CBOX21=[28,26,264,8],FBOX21=[28,114,264,16];
ART.report21={w:320,q:12,paint(g){paintReport21(g)},light:null,draw(g){drawReport21(g)},front(){}};
function paintReport21(g){const r=rng(2111),q=rng(2112);
  /* the table: a broad board of a fine, quiet grain; its seams with the next boards only above and below the sheet */
  for(const[y,h,c]of[[0,2.4,'#7a5434'],[2.4,136.8,'#70492c'],[139.2,4.8,'#6a4428']]){M21.plank(g,0,y,320,h,c,rng(2113+y),0);if(y){R(g,0,y,320,.8,'rgba(24,12,6,.55)');R(g,0,y+.8,320,.5,'rgba(230,180,120,.14)')}}
  tex(g,'mott',.14,0,0,320,144,'overlay',.9);
  /* the sheet's soft shadow on the table, falling a little to the right and down, away from the window */
  for(const[d,a]of[[5,.08],[3,.13],[1.6,.2]]){g.fillStyle=`rgba(16,8,4,${a})`;g.fillRect(12-d+2.6,4-d+2.4,296+d*2,132+d*2)}
  sheetReport21(g,r,q);
  penReport21(g);
  /* the morning light from the left: warm on the near side, falling off to the right */
  comp(g,'soft-light',.32,()=>{g.fillStyle=lg(g,0,0,320,144,['rgba(255,222,170,1)','rgba(255,222,170,.25)','rgba(160,150,196,.6)']);g.fillRect(0,0,320,144)});
  comp(g,'multiply',.22,()=>{g.fillStyle=rg(g,100,60,300,['#ffffff','#f2eae2','#a49cb8']);g.fillRect(0,0,320,144)})}
/* the sheet: an outline a little uneven, frayed where the fibers end; broad strips of the fibers' own tone and fine threads that stop and
   start, all running across; a faint stain or two; the field for the charge smoothed a little paler; the edge on the light side lit */
function sheetReport21(g,r,q){const E=[],j=(a,i)=>a*(Math.sin(i*.9)*.5+(q()-.5)*.6),x0=12,x1=308,y0=4,y1=136;
  for(let x=x0,i=0;x<=x1;x+=2,i++)E.push(x,y0+j(.5,i));for(let y=y0,i=0;y<=y1;y+=2,i++)E.push(x1+j(.4,i),y);
  for(let x=x1,i=0;x>=x0;x-=2,i++)E.push(x,y1+j(.5,i));for(let y=y1,i=0;y>=y0;y-=2,i++)E.push(x0+j(.4,i),y);
  clipTo(g,()=>poly(g,E),()=>{g.fillStyle=lg(g,x0,y0,x1,y1,['#f0e4c0','#e6d6ac','#d8c494']);g.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);
    for(let y=y0-1;y<y1+1;){const hh=1+r()*2.4;R(g,x0-2,y,x1-x0+4,hh,r()<.5?'rgba(146,112,56,.07)':'rgba(255,248,220,.1)');y+=hh}
    for(let i=0;i<520;i++){const y=y0+q()*(y1-y0),x=x0-2+q()*(x1-x0-20),l=6+q()*46;R(g,x,y,l,.5,q()<.55?'rgba(120,90,44,.11)':'rgba(255,250,228,.15)')}
    tex(g,'mott',.14,x0,y0,x1-x0,y1-y0,'overlay',.8);
    pool(g,262,24,14,5,'#a8844a',.07,'source-over');pool(g,60,128,10,4,'#a8844a',.06,'source-over');
    /* the field, smoothed for its writing: a soft paler wash with no edge */
    pool(g,FBOX21[0]+FBOX21[2]/2,FBOX21[1]+10,FBOX21[2]*.55,7,'#fff6dc',.28,'source-over');
    ao(g,x0,y0,x1-x0,6,'t',.12,'#6e4c1e');ao(g,x0,y1-8,x1-x0,8,'b',.16,'#6e4c1e');ao(g,x1-6,y0,6,y1-y0,'r',.14,'#6e4c1e')});
  stroke(g,E.slice(0,E.length/4|0),'rgba(255,246,214,.7)',.5);stroke(g,E.slice(E.length*.75|0),'rgba(255,246,214,.5)',.5)}
/* the reed pen: a thin reed lying along the table below the sheet, its cut point to the left, darkened with ink; lit along its top */
function penReport21(g){const x0=196,x1=262,y=141.8;
  stroke(g,[x0+1.4,y+1.2,x1+1.4,y+.8],'rgba(16,8,4,.35)',1.2);
  poly(g,[x0,y,x0+4,y-.6,x1,y-.7,x1,y+.7,x0+4,y+.6]);g.fillStyle=lg(g,0,y-.7,0,y+.7,['#e8d4a0','#c4a46c','#8a6c40']);g.fill();
  poly(g,[x0,y,x0+4,y-.6,x0+4,y+.6],'#3a2414');
  R(g,x0+4,y-.7,x1-x0-4,.4,'rgba(255,246,214,.6)')}
/* fit21: the words into a box: the largest of four sizes whose lines all fit; returns the font size and the lines */
function fit21(g,s,w,h){for(const z of[4.6,4.2,3.8,3.4]){g.font=FONT21(z);const lh=z*1.2,words=s.split(' '),L=[];let cur='';
    for(const wd of words){const t=cur?cur+' '+wd:wd;if(g.measureText(t).width>w&&cur){L.push(cur);cur=wd}else cur=t}if(cur)L.push(cur);
    if(L.length*lh<=h||z===3.4)return{z,lh,L}}}
/* drawReport21: the words and the marks as they stand. The clerk's hand is dark and a little brown; his marks are in a redder ink, the
   word beside the line and its sign in the margin before it: a short slanting stroke (never proved) or a small hollow diamond (a dispute
   about their own worship), each clear of every letter. */
function drawReport21(g){G.caps21=G.caps21||[];
  const put=(s,b,col)=>{const[x,y,w,h]=b,f=fit21(g,s,w,h);g.font=FONT21(f.z);g.textBaseline='top';g.fillStyle=col;f.L.forEach((l,i)=>g.fillText(l,x,y+i*f.lh));
    const mw=Math.max(...f.L.map(l=>g.measureText(l).width));if(G.caps21.length<400)G.caps21.push({s,w:mw,max:w,h:f.L.length*f.lh,maxh:h});return f};
  put(T('report_heading'),HBOX21,'#2a1a0c');put(T('report_the_charges_brought'),CBOX21,'#4a2e14');
  const INK='#8a3a1e',HALO='rgba(255,246,222,.55)';
  REPORT21.forEach((c,i)=>{const b=RBOX21[i],f=put(T(c.k),b,'#2a1a0c'),m=markOf21(c.k);if(!m)return;
    put(T(MARK21[m]),MBOX21[i],INK);
    /* the sign, in the margin, level with the middle of the line's first row of letters */
    const cy=b[1]+f.z*.55,cx=20.6;
    if(m==='never'){stroke(g,[cx-1.6,cy+2.2,cx+1.6,cy-2.2],HALO,1.4);stroke(g,[cx-1.6,cy+2.2,cx+1.6,cy-2.2],INK,.8)}
    else{const d=2.2,P=[cx,cy-d,cx+d,cy,cx,cy+d,cx-d,cy,cx,cy-d];stroke(g,P,HALO,1.4);stroke(g,P,INK,.7)}});
  put(T('report_the_charge_he_is_sent_on'),[FBOX21[0],FBOX21[1],FBOX21[2],6],'#4a2e14')}
/* ==== ART report21: end ==== */

/* ==== ART hall21: begin ==== */
/* The audience chamber (Acts 25:23), painted by SHARED.caesarea.innerHall: the same hall, in the same geometry (SHARED.caesarea.IH), as
   Chapter Twenty's hall20, here dressed for the great show. At the right the dais of white stone, a deep upper step and a lower one, with
   three chairs on it, each with a leg at its two ends and a solid back at its right end (the sitters face left): Festus at 222, King
   Agrippa at 248, Bernice at 274 (seat tops 93, feet 102). Behind them two hangings of purple wool, hung from a rod. At the back left two
   benches of plain wood, each on two end pieces (seat tops 95, feet 104): the military commanders sit on the first at 51, 75, 99, the
   leading men of the city on the second at 131, 155, 179, facing right. Two Roman standards stand at the back in the shade of the wall,
   small, never a hotspot (CONTRIBUTING section 3): one between the doorway and the commanders' bench (x 34), one in the gap between the
   benches (x 115), each before plain plaster between the painted panels, its top at y 53.5, below every band of the wall. The doorway to
   the passage is an opening in the back wall at the left (4..26, 46..96). Two long, low windows high in the back wall (60..120 and
   140..200, 14..29) give the light from behind at the left: their patches of sun lie on the floor before the benches, and the figures'
   shadows fall the same way (SHARED.caesarea.hallLight('day')). Nothing stands in the walk strip.
   Called from outside: ART.hall21, HALL21. Reads nothing.
   Hotspots (ROOMS.hall21): the dais 196,96,120,16 · the benches 41,86,148,18 · the windows 58,12,144,19 · the door 4,46,22,50. Walk:
   24..300 by 116..138; while Paul is played (chained) the walk is his own place. Paul stands 150,126 facing right, the soldier a step
   ahead of him on his right (168,126.5), chained by his near wrist; the clerk stands 300,124 facing left. */
const HALL21=(()=>{const I=K21.IH;return{wallY:I.wallY,chair:{top:I.chair.top,foot:I.chair.foot},
  seats:{festus:I.chairs[0],agrippa:I.chairs[1],bernice:I.chairs[2]},bench:{top:I.bench.top,foot:I.bench.foot,at:I.sitters.slice()},
  door:I.door.slice(),windows:I.windows.map(w=>w.slice()),standards:I.standards.slice(),paul:[150,126,1],clerk:[300,124,-1]}})();
ART.hall21={w:320,q:12,paint(g){K21.innerHall(g,{hour:'day',chairs:3,show:true})},light:K21.hallLight('day'),draw(g){chains21(g)},front(){}};
/* ==== ART hall21: end ==== */

/* ---- the inventory ---- */
/* the chain on Paul's wrist: a few links in a slanting line, light and dark in turn, from a cuff at the lower left; nothing crosses */
Object.assign(ICON,{chain21(g){R(g,3,3,18,18,'#2a2018');R(g,5,15,5,4,'#8a8a90');R(g,5,15,5,1,'#c8c8d0');
  for(let i=0;i<7;i++){const x=10+i*1.6,y=14-i*1.4;R(g,x,y,1.4,1.4,i%2?'#6a6a72':'#b0b0b8')}}});

/* ============ PEOPLE ============ */
/* Dress follows CONTRIBUTING section 4 and SHARED.cast.CAESAREA (shared/cast.js), whose header says what each look is and why. The
   accusers from Jerusalem are SHARED.cast.SANHEDRIN's chief priest, an elder and two Sadducees (men of the priestly families); none is
   named. The soldiers and the officer are SHARED.cast.ROMAN. The clerk keeps his writing board under his arm when he stands or sits at a
   hearing; when he is played he has laid it down (clerkFree21), so that his hand may move as he speaks. */
const KC=SHARED.cast.CAESAREA,KS=SHARED.cast.SANHEDRIN,RM=SHARED.cast.ROMAN;
const noSpear=o=>Object.assign({},o,{spear:0,pilum:0});
Object.assign(LOOK,{
  clerk21:Object.assign({},KC.governors_clerk),festus21:Object.assign({},KC.festus),agrippa21:Object.assign({},KC.agrippa),bernice21:Object.assign({},KC.bernice),
  adviser21a:Object.assign({},KC.adviser_1),adviser21b:Object.assign({},KC.adviser_2),
  accuser21a:Object.assign({},KS.chief_priest_1),accuser21b:Object.assign({},KS.elder_1),accuser21c:Object.assign({},KS.sadducee_2,{ph:5200}),accuser21d:Object.assign({},KS.sadducee_3,{ph:5400}),
  guard21:noSpear(Object.assign({},RM.legionary_bare,{ph:1900})),officer21:Object.assign({},RM.centurion_crested),
  cmd21a:Object.assign({},KC.commander_a),cmd21b:Object.assign({},KC.commander_b),cmd21c:Object.assign({},KC.commander_c),
  lead21a:Object.assign({},KC.leading_man_1),lead21b:Object.assign({},KC.leading_man_2),lead21c:Object.assign({},KC.leading_man_3)});
const clerkFree21=Object.assign({},KC.governors_clerk,{board:0});
const CL=actor('clerk21','governors_clerk','#e8dcc0',140),FS=actor('festus21','Festus','#f0e0c8',96),AG=actor('agrippa21','king_agrippa','#e8d0f0',100),
  BE=actor('bernice21','Bernice','#f0d0d8',210),AD1=actor('adviser21a','adviser','#e8e0d0',98),AD2=actor('adviser21b','adviser','#e0d8d0',112),
  AC1=actor('accuser21a','jew_from_jerusalem','#e0d8e8',104),AC2=actor('accuser21b','jew_from_jerusalem','#e0e0d0',96),
  AC3=actor('accuser21c','jew_from_jerusalem','#e8e0d8',108),AC4=actor('accuser21d','jew_from_jerusalem','#e0d8d0',100),
  GU=actor('guard21','soldier','#d0c8c8',114),OF=actor('officer21','army_officer','#f0c8b8',98),
  CM1=actor('cmd21a','military_commander','#f0d8c0',92),CM2=actor('cmd21b','military_commander','#e8d0c0',100),CM3=actor('cmd21c','military_commander','#e0d0c0',106),
  LM1=actor('lead21a','leading_man_of_the_city','#e8e0d0',94),LM2=actor('lead21b','leading_man_of_the_city','#e0e0d0',110),LM3=actor('lead21c','leading_man_of_the_city','#d8e0d0',102);
const ACCUSERS=[AC1,AC2,AC3,AC4],SEATED=[CM1,CM2,CM3,LM1,LM2,LM3];
/* where the accusers stand round Paul and his soldier at the hearing before Festus (Acts 25:7): [x, y, facing] (see ART court21) */
const ROUND21=[[254,120,-1],[250,137,-1],[196,116,1],[146,126,1]];

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 25:1-26:32, told by the narrator in paraphrase, each line with its reference (SP/ch21/told.md, written from the Study
   Edition, English and German). None of it is put into a mouth as a quotation. The spoken lines of the account (told.md) are said in the
   scenes, in our own words, without quotation marks. */
const TOLD={v1:'festus_went_up_acts_25_1',v2:'a_favor_and_an_ambush_acts_25_2_3',v4:'paul_stays_at_caesarea_acts_25_4_5',v6:'festus_on_the_judgment_seat_acts_25_6',
  v7:'many_charges_none_proved_acts_25_7',v9:'festus_wanted_favor_acts_25_9',v12:'festus_spoke_with_his_advisers_acts_25_12',v13:'agrippa_and_bernice_came_acts_25_13',
  v14:'festus_laid_the_case_before_the_king_acts_25_14_21',v22:'agrippa_wished_to_hear_him_acts_25_22',v23:'with_great_show_acts_25_23',
  h1:'his_hand_went_out_acts_26_1',h4:'a_pharisee_and_the_hope_acts_26_4_8',h9:'his_vote_went_against_them_acts_26_9_11',h12:'on_the_road_at_midday_acts_26_12_13',
  h14:'all_fell_and_a_voice_in_hebrew_acts_26_14',h15:'it_was_jesus_acts_26_15',h16:'a_servant_and_a_witness_acts_26_16',h17:'sent_to_open_their_eyes_acts_26_17_18',
  h24:'festus_broke_in_acts_26_24',h28:'agrippas_answer_acts_26_28',h30:'they_rose_acts_26_30',h31:'nothing_deserving_death_or_bonds_acts_26_31',
  n27:'what_comes_next_acts_27_1'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const fast=()=>G.speedAll>200;   /* the playtest plays at speed */

/* ============ WHAT IS PLAYED: the tables ============ */
/* the three papers on the clerk's table, and what he reads in each: the commander's letter (Chapter Nineteen's lines), the record of the
   hearing before Felix (Chapter Twenty's charges, each with Paul's answer to it), and his own notes of the hearing before Festus */
const PAPERS21={letter:{name:'the_commanders_letter',flag:'readLetter',read:['letter_greeting','letter_i_rescued_him_as_a_roman','letter_i_took_him_to_their_sanhedrin','letter_nothing_deserving_death_or_chains','letter_a_plot_so_i_send_him','letter_his_accusers_will_speak_before_you']},
  record:{name:'the_record_before_felix',flag:'readRecord',read:['charge_revolt','paul_no_crowd_no_proof','charge_sect','paul_what_i_admit','charge_temple','paul_the_men_from_asia']},
  notes:{name:'my_notes_before_festus',flag:'readNotes',read:['notes21_many_charges_none_proved','paul_no_sin_against_law_temple_caesar']}};
/* the report: every charge ever brought, the paper that settles it, the one mark that stands, and the true reason the other will not */
const REPORT21=[{k:'charge_revolt',paper:'record',ok:'never',no:'clerk_a_revolt_is_no_question_of_worship'},
  {k:'charge_sect',paper:'record',ok:'worship',no:'clerk_he_admitted_that_one_himself'},
  {k:'charge_temple',paper:'record',ok:'never',no:'clerk_profaning_the_temple_would_be_a_crime'},
  {k:'charge_questions_of_their_own_law',paper:'letter',ok:'worship',no:'clerk_the_commander_named_it_himself'},
  {k:'charge_many_and_serious',paper:'notes',ok:'never',no:'clerk_they_called_them_crimes'}];
const MARK21={never:'mark_never_proved',worship:'mark_a_dispute_about_their_own_worship'};
const FIRST21={letter:'clerk_first_the_commanders_letter',record:'clerk_first_the_record_before_felix',notes:'clerk_first_my_notes'};
/* the two listeners: each sentence, whether it is the one the account gives to that listener now, and what the other answers */
/* c: the short line it stands as in the choice (the full sentence is what he says) */
const LISTEN21=[{k:'paul_true_and_of_a_sound_mind',c:'say_what_i_say_is_true_and_sound',to:'festus',flag:'sound',other:['agrippa_the_governor_said_it',AG]},
  {k:'paul_not_done_in_a_corner',c:'say_none_of_it_happened_in_a_corner',to:'festus',flag:'corner',need:'sound',early:['festus_answer_what_i_said',FS],other:['agrippa_tell_that_to_the_governor',AG]},
  {k:'paul_do_you_believe_the_prophets',c:'say_do_you_believe_the_prophets',to:'agrippa',flag:'prophets',need:'corner',early:['agrippa_the_governor_spoke_to_you_first',AG],other:['festus_put_that_to_the_king',FS]},
  {k:'paul_im_not_saying_this_to_save_myself',c:'say_im_not_saying_this_to_save_myself',to:null,festus:['festus_that_much_is_settled',FS],agrippa:['agrippa_so_i_have_heard',AG]}];
/* the three roads on the travel map (Acts 25:9-12) */
const ROADS21={jerusalem:'paul_thought_jerusalem',caesarea:'paul_thought_caesarea',torome:'paul_thought_rome'};
const FLAGS=['gull','ready','answer','appeal','readLetter','readRecord','readNotes','report','festus','defense','sound','corner','prophets','bonds','passage'];

/* ============ HELPERS ============ */
/* phase21: court (the clerk readies the court); hearing (Paul before Festus, 25:6-12); report (the clerk and the papers, 25:13-22);
   hall (the audience, Paul's defense, 25:23-26:23); listen (the two listeners, 26:24-28); bonds (26:29); passage (the clerk, 26:30-32) */
const phase21=()=>!F.ready?'court':!F.appeal?'hearing':!F.festus?'report':!F.defense?'hall':!F.prophets?'listen':!F.bonds?'bonds':'passage';
const clerkPlays=()=>{const p=phase21();return p==='court'||p==='report'||p==='passage'};
const chainedNow=()=>{const p=phase21();return p==='hearing'||p==='hall'||p==='listen'||p==='bonds'};
function setPC21(a){if(G.pc!==a){G.pc=a;G.inv=G.invs[a.id]||(G.invs[a.id]=[])}}
function show21(room,x,y,dir){place21(room);const e=ENT[room];enterRoom(room,x!=null?x:e[0],y!=null?y:e[1],dir||e[2]);chainItem21();codeBtn()}
async function goto21(room,x,y,dir){await fade(1,300);show21(room,x,y,dir);await fade(0,300)}
const tw=ms=>wait(fast()?Math.min(40,ms):ms);
async function go21(a,x,y,sp){a.speed=fast()?400:sp||0;a.free=1;await walk(a,x,y);a.speed=0;a.free=0}
const TC={thought:1,color:'#ece0c8'};   /* the clerk's thoughts */
/* The clerk does not worship Jehovah, so he never prays: while he is played the hint button reads Think it over, and its hint is his own
   thought, in his own colour (noPray, CONTRIBUTING section 2). */
CL.noPray=1;CL.thought=TC;
const THP={thought:1,color:'#cfe2ff'};  /* Paul's */
const mk21=()=>G.mk21||(G.mk21={});
const markOf21=k=>F.report?REPORT21.find(c=>c.k===k).ok:mk21()[k];
/* the chain: one light chain on one of Paul's wrists, to the one soldier beside him (shared/cast.js, custody 'one') */
/* In the court the soldier stands a step behind Paul on his left, so the near wrist is the chained one. In the hall he stands a step ahead of
   him on his right, between him and the dais, so the far wrist is: when Paul raises that hand (26:29), bent, the chain goes up with it and
   does not cross his body. custody places the chain's end from P.ges, so the script sets P.ges itself. */
const guardAhead21=()=>P.room==='hall21';
function chain21(){const C=SHARED.cast.custody;if(guardAhead21())C.place('one',P,null,GU);else C.place('one',P,GU,null)}
/* in a room's draw: the chain between them, link by link */
function chains21(g){if(!(P.chained&&P.room===G.room&&GU.room===G.room))return;
  if(guardAhead21())SHARED.cast.custody.chains(g,P,null,GU);else SHARED.cast.custody.chains(g,P,GU,null)}
/* the chain in Paul's inventory whenever he is played chained, and not otherwise */
function chainItem21(){const L=G.invs.paul||(G.invs.paul=['tablets']),i=L.indexOf('chain21');if(chainedNow()&&i<0)L.push('chain21');else if(!chainedNow()&&i>=0)L.splice(i,1);drawInv()}

/* ============ THE STORY ============ */
async function start21(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(21);G.end={};setScore(MUSIC);drawInv();
    /* 25:1-5, from the narrator's scroll; then the court by morning, and the clerk */
    G.scene=DARK;await tell('v1');await tell('v2');await tell('v4');G.scene=null;
    show21('court21');await fade(0,700);await say(CL,'clerk_the_new_governor_sits_today',TC);codeBtn()},true)}

/* ---- the court, before the hearing: the clerk ---- */
const deskLook21=()=>say(PC(),PC()===CL?'my_writing_desk_look':'the_clerks_desk_look');
async function seat21(){if(F.gull||F.ready)return say(PC(),'governors_seat_look');
  await say(CL,'clerk_off_the_governors_seat',{to:null});F.gull=1;SFX.good();codeBtn()}
async function desk21(){if(F.ready)return deskLook21();
  if(!F.gull)return say(CL,'clerk_not_with_a_gull_on_the_seat',TC);return hearing21()}
/* 25:6, 7: the governor on the seat; the accusers close round Paul; then Paul is played */
async function hearing21(){await fade(1,500);F.ready=1;show21('court21');AU.mood='tense';await fade(0,600);
  await tell('v6');await tell('v7');await say(P,'paul_many_charges_and_none_proved',THP);codeBtn()}
/* 25:8, 9: Paul's answer; Festus asks; then the map */
async function answer21(){if(!F.answer){await say(P,'paul_no_sin_against_law_temple_caesar',{to:FS});await tell('v9');
    await say(FS,'festus_will_you_go_up',{to:P});F.answer=1}
  else await say(FS,'festus_well_jerusalem_or_not',{to:P});
  return roads21()}
/* Three roads: the map with Jerusalem, Caesarea and the road west off its edge; the two wrong ones answered by a true thought */
async function roads21(){let M=null;try{M=await need('map')}catch(e){}
  if(!M||!M.places||!M.places.torome){const NM={jerusalem:'Jerusalem',caesarea:'Caesarea',torome:'to_rome'};
    for(;;){const ids=Object.keys(ROADS21),k=ids[await choose(ids.map(i=>NM[i]))];
      await say(P,ROADS21[k],THP);if(k==='torome')return appeal21()}}
  await fade(1,300);let first=1;
  for(;;){const pr=M.pick(['jerusalem','caesarea','torome'],'caesarea',{view:'levant',legs:[['caesarea','torome']],hint:'where_should_my_case_be_heard'});
    if(first){first=0;await fade(0,350)}
    const k=await pr;
    if(!k){await fade(1,300);G.scene=null;viewOf(P);setScore(MUSIC);await fade(0,300);return say(P,'paul_he_is_waiting_for_my_answer',THP)}
    await say(P,ROADS21[k],Object.assign({low:1},THP));
    if(k==='torome')break}
  await tw(400);await fade(1,400);G.scene=null;viewOf(P);setScore(MUSIC);await fade(0,400);return appeal21()}
/* 25:10-12: the appeal; Festus and his advisers; to Caesar. Then 25:13: King Agrippa and Bernice cross the court */
async function appeal21(){AU.mood='tense';
  await say(P,'paul_caesars_judgment_seat',{to:FS});await say(P,'paul_i_do_not_ask_to_be_spared',{to:FS});await say(P,'paul_i_appeal_to_caesar',{to:FS});
  FS.noTurn=1;FS.dir=1;await tell('v12');FS.dir=-1;FS.noTurn=0;
  await say(FS,'festus_to_caesar_you_will_go',{to:P});
  await fade(1,600);
  /* some days later: the king and his sister come to pay their visit; Festus goes to meet them */
  for(const a of[P,GU,OF,AD1,AD2,...ACCUSERS])a.room=null;P.chained=GU.keeper=0;FS.seat=0;
  place(FS,'court21',200,120,1);place(AG,'court21',334,120,-1);place(BE,'court21',354,124,-1);
  enterRoom('court21',150,128,1);P.room=null;AU.mood='court';await fade(0,600);
  const w=Promise.all([go21(AG,232,120,36),go21(BE,256,124,36)]);await tell('v13');await w;
  await fade(1,600);F.appeal=1;show21('write21');await fade(0,600);
  await say(CL,'clerk_a_report_goes_with_him',TC);codeBtn()}

/* ---- the writing room: nothing to write ---- */
async function readPaper21(id){const p=PAPERS21[id];
  for(const k of p.read)await say(CL,k,TC);
  if(!F[p.flag]){F[p.flag]=1;codeBtn()}}
async function toReport21(){await goto21('report21');
  if(F.passage)return last21();
  if(!G.rv21){G.rv21=1;await say(CL,'clerk_every_charge_ever_brought',TC)}}
async function markLine21(c){if(F.report)return say(CL,'clerk_every_line_has_its_mark',TC);
  if(!F[PAPERS21[c.paper].flag])return say(CL,FIRST21[c.paper],TC);
  const opts=['mark_never_proved','mark_a_dispute_about_their_own_worship','leave_it_as_it_is'],i=await choose(opts,{keep:1});
  if(i===2)return;const m=i?'worship':'never';
  if(m!==c.ok){SFX.nope();return say(CL,c.no,TC)}
  mk21()[c.k]=m;SFX.click();
  if(REPORT21.every(x=>mk21()[x.k]===x.ok)){F.report=1;SFX.good();await say(CL,'clerk_and_the_field_stays_empty',TC);await say(CL,'clerk_the_governor_must_see_this',TC);codeBtn()}}
async function field21(){return say(CL,F.report?'clerk_the_empty_letter':'the_field_for_the_charge_look',TC)}
/* in the court: Festus, with the king and his sister; the report taken to him (25:14-22); and the next day the audience */
async function festus21(){if(!F.report){await say(FS,'festus_is_the_report_ready',{to:CL});return say(CL,'clerk_not_yet_your_excellency',{to:FS})}
  await say(CL,'clerk_ive_been_through_every_charge',{to:FS});await say(FS,'festus_nothing_left',{to:CL});
  await say(FS,'festus_the_king_knows_their_customs',{to:AG});
  await tell('v14');await tell('v22');return show21hall()}
/* 25:23-27: the great show; Festus presents him; the king gives him leave (26:1) */
async function show21hall(){await fade(1,700);
  F.festus=1;place21('hall21');F.festus=0;
  for(const a of[AG,BE,FS,P,GU])a.room=null;
  setPC21(CL);enterRoom('hall21',...HALL21.clerk);AU.mood='show';await fade(0,700);
  await say(CL,'clerk_no_chair_for_the_clerk',TC);
  const S=HALL21.seats,walkIn=Promise.all([[FS,S.festus],[AG,S.agrippa],[BE,S.bernice]].map(async([a,x],i)=>{place(a,'hall21',-8-i*16,120,1);await tw(i*500);
    await go21(a,x,HALL21.chair.foot,40);a.dir=-1;a.seat=1}));
  await tell('v23');await walkIn;
  place(P,'hall21',-10,126,1);place(GU,'hall21',8,126.5,1);await Promise.all([go21(P,HALL21.paul[0],HALL21.paul[1],40),go21(GU,HALL21.paul[0]+18,HALL21.paul[1]+.5,40)]);
  chain21();AU.mood='hall';
  await say(FS,'festus_this_is_the_man',{to:null});await say(FS,'festus_nothing_certain_to_write',{to:AG});
  await say(AG,'agrippa_you_may_speak',{to:P});
  F.festus=1;show21('hall21')}

/* ---- the audience chamber: the defense ---- */
/* 26:1-23: the hand; the courtesy to the king; his youth, the hope, the persecution (told); the road, told over the Prologue's pictures;
   the vision obeyed; then Festus breaks in (26:24) */
async function defense21(){
  P.ges=1;await tell('h1');P.ges=0;
  await say(P,'paul_happy_before_agrippa',{to:AG});
  await tell('h4');await tell('h9');
  const D=SHARED.damascus;
  if(D){const st={x:96,d:0};await fade(1,400);G.scene=D.scene('road',st);AU.mood='road';await fade(0,500);
    await Promise.all([D.walk(st,{to:140,ms:fast()?200:4200}),tell('h12')]);
    await D.light(fast()?400:900);await tell('h14');await tell('h15');await D.light.back(fast()?400:900);
    await tell('h16');await tell('h17');await fade(1,400);G.scene=null;AU.mood='hall';await fade(0,400)}
  else{await tell('h12');await tell('h14');await tell('h15');await tell('h16');await tell('h17')}
  await say(P,'paul_i_followed_the_vision',{to:AG});await say(P,'paul_laid_hold_of_in_the_temple',{to:AG});await say(P,'paul_nothing_but_moses_and_the_prophets',{to:AG});
  AU.mood='tense';await tell('h24');await say(FS,'festus_out_of_your_mind',{to:P});
  F.defense=1;await say(P,'paul_two_men_are_listening',THP);codeBtn()}
/* Two listeners (26:24-28): Talk to Festus or to the king offers the same sentences; the account's way through is 26:25 and 26:26 to
   Festus, then 26:27 to the king */
async function speakTo21(L){const lis=L===FS?'festus':'agrippa';if(PC()===CL)return say(CL,'clerk_not_my_place',TC);
  if(phase21()==='hall'){if(L===AG)return defense21();return say(FS,'festus_the_king_has_given_you_leave',{to:P})}
  if(phase21()==='bonds')return say(P,L===AG?'paul_one_more_thing_for_him':'paul_its_the_king_im_answering',THP);
  if(phase21()!=='listen')return;
  const opts=LISTEN21.map(s=>s.c).concat(['say_nothing_for_now']),i=await choose(opts,{keep:1});
  if(i===LISTEN21.length)return;const s=LISTEN21[i];
  if(s.to===lis&&F[s.flag])return say(P,'paul_ive_said_that_to_him_already',THP);
  await say(P,s.k,{to:L});
  if(!s.to){const[r,a]=s[lis];return say(a,r,{to:P})}
  if(s.to!==lis){const[r,a]=s.other;return say(a,r,{to:P})}
  if(s.need&&!F[s.need]){const[r,a]=s.early;return say(a,r,{to:P})}
  F[s.flag]=1;SFX.good();
  if(s.flag==='prophets'){AU.mood='hall';await tell('h28');await say(P,'paul_one_more_thing_for_him',THP)}
  codeBtn()}
/* These bonds (26:29): the far hand comes up, bent, with the chain; the wish; 26:30 they rise; then the clerk is played in the hall */
async function bonds21(){if(phase21()!=='bonds')return say(P,'paul_the_chain_stays_where_it_is',THP);
  P.ges=1;await say(P,'paul_except_for_these_bonds',{to:AG});await tw(600);P.ges=0;
  for(const a of[AG,FS,BE,...SEATED])a.seat=0;await tell('h30');
  await fade(1,700);F.bonds=1;show21('hall21');await fade(0,600);
  await say(CL,'clerk_back_to_my_table',TC);codeBtn()}
/* In the passage (26:31, 32): on his way out the clerk hears what they say to one another, and what the king says to the governor */
async function passage21(){if(F.passage)return goto21('write21');
  await tell('h31');await say(AG,'agrippa_he_could_have_been_set_free',{to:FS});
  F.passage=1;await say(CL,'clerk_and_still_nothing_for_the_field',TC);
  await goto21('write21');codeBtn()}
/* back at his table: the field is still empty; the end */
async function last21(){await say(CL,'clerk_the_field_is_still_empty',TC);return end21()}
/* what comes next (27:1), from the narrator's scroll as the picture goes; then the end screen */
async function end21(){await fade(1,700);await tell('n27');
  endScreen({title:'to_caesar_2',text:'to_caesar_end',based:'based_on_acts_25_1_26_32',go:'click_to_return_to_the_title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}
/* the hidden treasure: the carter's ox goad, at the side of the court */
async function goad21(){await say(PC(),'ox_goad_look');treasure()}

/* ============ ROOMS ============ */
/* A room's hotspots are listed from the back to the front: where two overlap, the later one is meant. */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
const ACC=K21.AT.accused,PAULH=HALL21.paul;
ROOMS.court21={space:.8,get walk(){return PC()===P&&chainedNow()?[ACC[0],ACC[0],ACC[1],ACC[1]]:K21.WALK.slice()},get mood(){return phase21()==='hearing'?'tense':'court'},amb:AMB.court21,hs:[
  {name:'sea',x:0,y:40,w:186,h:38,wx:150,wy:124,look:'sea_from_the_court_look'},
  {name:'sea_wall',x:0,y:78,w:186,h:18,wx:120,wy:120,look:'sea_wall_look21'},
  {name:'dais',x:196,y:96,w:112,h:16,wx:190,wy:120,look:'dais_look21',use:()=>PC()===P&&phase21()==='hearing'?answer21():say(PC(),'dais_look21')},
  {name:'governors_seat',x:226,y:78,w:26,h:24,wx:214,wy:118,def:'use',look:()=>say(PC(),F.gull?'governors_seat_look':'governors_seat_with_a_gull_look'),use:()=>PC()===CL?seat21():say(P,'not_my_seat',THP)},
  {name:'my_writing_desk',x:152,y:88,w:36,h:22,wx:170,wy:118,def:'use',look:()=>deskLook21(),use:()=>PC()===CL?desk21():deskLook21()},
  {name:'cart',x:4,y:110,w:42,h:28,wx:56,wy:128,look:'cart_look',use:'not_my_cart',pickup:'not_my_cart'},
  {name:'ox_goad',x:6,y:106,w:46,h:8,wx:56,wy:126,look:()=>goad21(),pickup:'not_my_cart',use:'not_my_cart'},
  {name:'way_to_the_writing_room',x:304,y:96,w:16,h:48,wx:296,wy:126,dir:1,exit:()=>PC()===CL&&phase21()==='report'?goto21('write21'):say(PC(),PC()===CL?'clerk_the_court_first':'paul_not_mine_to_go',PC()===CL?TC:THP),look:'way_to_the_writing_room_look'}]};
ROOMS.write21={space:.6,walk:[24,296,116,138],mood:'write',amb:AMB.write21,hs:[
  {name:'window',x:24,y:24,w:40,h:42,wx:52,wy:120,look:'writing_room_window_look'},
  {name:'the_commanders_letter',x:154,y:78,w:24,h:14,wx:166,wy:120,def:'look',look:()=>readPaper21('letter'),use:()=>readPaper21('letter'),pickup:'clerk_it_stays_with_the_papers'},
  {name:'the_record_before_felix',x:178,y:78,w:26,h:14,wx:190,wy:120,def:'look',look:()=>readPaper21('record'),use:()=>readPaper21('record'),pickup:'clerk_it_stays_with_the_papers'},
  {name:'the_report',x:204,y:76,w:30,h:16,wx:218,wy:120,def:'use',look:'the_report_look',use:()=>toReport21(),pickup:'clerk_it_stays_with_the_papers'},
  {name:'my_notes_before_festus',x:234,y:78,w:22,h:14,wx:244,wy:120,def:'look',look:()=>readPaper21('notes'),use:()=>readPaper21('notes'),pickup:'clerk_it_stays_with_the_papers'},
  {name:'ink_pot',x:256,y:74,w:12,h:18,wx:262,wy:120,look:'clerk_ink_left_over',use:'clerk_ink_left_over',pickup:'clerk_it_stays_with_the_papers'},
  {name:'door_to_the_court',x:284,y:38,w:32,h:64,wx:290,wy:124,dir:1,exit:()=>F.passage?say(CL,'clerk_the_report_first',TC):goto21('court21',286,126,-1),look:'door_to_the_court_look'}]};
ROOMS.report21={space:.6,walk:NOW,mood:'write',amb:AMB.report21,hs:[
  ...REPORT21.map((c,i)=>{const[x,y,w,h]=RBOX21[i],m=MBOX21[i];return{name:'charge_on_the_report',r21:c.k,x:x-4,y,w:m[0]+m[2]-x+4,h,wx:160,wy:236,def:'use',look:()=>say(CL,c.k,TC),use:()=>markLine21(c)}}),
  {name:'field_for_the_charge',x:FBOX21[0],y:FBOX21[1],w:FBOX21[2],h:FBOX21[3],wx:160,wy:236,look:()=>field21(),use:()=>field21()},
  {name:'back_to_the_table',x:0,y:136,w:120,h:8,wx:160,wy:236,exit:()=>goto21('write21'),look:'back_to_the_table_look'}]};
ROOMS.hall21={space:1.3,get walk(){return PC()===P&&chainedNow()?[PAULH[0],PAULH[0],PAULH[1],PAULH[1]]:[24,300,116,138]},get mood(){return phase21()==='listen'?'tense':'hall'},amb:AMB.hall21,hs:[
  {name:'windows',x:58,y:12,w:144,h:19,wx:130,wy:120,look:'hall_windows_look'},
  {name:'bench',x:41,y:86,w:148,h:18,wx:100,wy:120,look:'hall_bench_look'},
  {name:'dais',x:196,y:96,w:120,h:16,wx:190,wy:120,look:'hall_dais_look'},
  {name:'door_of_the_hall',x:4,y:46,w:22,h:50,wx:30,wy:122,dir:-1,exit:()=>PC()===CL&&phase21()==='passage'?passage21():say(PC(),PC()===CL?'clerk_my_place_is_here':'paul_not_mine_to_go',PC()===CL?TC:THP),look:'door_of_the_hall_look'}]};

/* ============ PEOPLE AS HOTSPOTS ============ */
const who=(a,o)=>{a.hs=Object.assign({name:a.name,actor:a},o)};
const chainFestus21=()=>say(P,phase21()==='bonds'?'paul_its_the_king_im_answering':'paul_the_chain_stays_where_it_is',THP);
const inRoom=r=>G.room===r;
who(CL,{look:'governors_clerk_look',talk:()=>say(CL,'clerk_i_only_write_it_down',{to:P})});
who(FS,{look:'festus_look',talk:()=>inRoom('hall21')?speakTo21(FS):phase21()==='hearing'?answer21():PC()===CL?festus21():say(FS,'festus_not_now',{to:PC()}),
  useWith:it=>it==='chain21'?chainFestus21():false,give:it=>it==='chain21'?chainFestus21():false});
who(AG,{look:'agrippa_look',talk:()=>inRoom('hall21')?speakTo21(AG):say(AG,'agrippa_speak_to_the_governor',{to:PC()}),useWith:it=>it==='chain21'?bonds21():false,give:it=>it==='chain21'?bonds21():false});
who(BE,{look:'bernice_look',talk:()=>say(PC(),PC()===CL?'clerk_not_my_place':'paul_its_the_king_im_answering',PC()===CL?TC:THP)});
for(const a of[AD1,AD2])who(a,{look:'adviser_look',talk:()=>say(PC(),'not_his_to_decide',PC()===CL?TC:THP)});
for(const a of ACCUSERS)who(a,{look:'jew_from_jerusalem_look',talk:()=>say(P,'paul_my_answer_is_to_the_governor',THP)});
who(GU,{look:'soldier_with_the_chain_look',talk:()=>say(PC(),'not_his_to_decide',PC()===CL?TC:THP)});
who(OF,{look:'army_officer_look21',talk:()=>say(PC(),'not_his_to_decide',PC()===CL?TC:THP)});
for(const a of[CM1,CM2,CM3])who(a,{look:'military_commander_look',talk:()=>say(PC(),PC()===CL?'clerk_not_my_place':'paul_its_the_king_im_answering',PC()===CL?TC:THP)});
for(const a of[LM1,LM2,LM3])who(a,{look:'leading_man_look',talk:()=>say(PC(),PC()===CL?'clerk_not_my_place':'paul_its_the_king_im_answering',PC()===CL?TC:THP)});
/* Paul, when the clerk is played */
const PAULHS={name:'Paul',actor:P,as:{clerk21:{look:'the_prisoner_paul_look',talk:()=>say(CL,'clerk_not_my_place',TC)}}};
CL.def={look:'clerk_nothing_to_see',pickup:'clerk_not_mine_to_take',use:'clerk_no_use_for_that',open:'clerk_not_mine_to_open',talk:'clerk_no_answer',give:'clerk_nothing_to_give'};
CL.noCraft='clerk_those_dont_go_together';

/* ============ ITEMS ============ */
Object.assign(ITEMS,{chain21:{name:'chain_on_my_wrist',look:'chain_on_my_wrist_look'}});

/* ============ WAX TABLETS ============ */
const pa=f=>()=>PC()===P&&f();
const TABLETS={
  people:[{name:'Festus',note:'note21_festus',if:pa(()=>!!F.ready)},{name:'king_agrippa',note:'note21_agrippa',if:pa(()=>!!F.festus)}],
  tasks:[{t:'task21_answer_festus',if:pa(()=>!!F.ready&&!F.appeal)},{t:'task21_before_the_king',if:pa(()=>!!F.festus&&!F.defense)},
    {t:'task21_two_listeners',if:pa(()=>!!F.defense&&!F.prophets)},{t:'task21_one_more_thing',if:pa(()=>!!F.prophets&&!F.bonds)}],
  scripture:[]};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={get court21(){return PC()===P&&chainedNow()?[ACC[0],ACC[1],1]:[286,126,-1]},write21:[276,126,-1],report21:[160,236,1],
  get hall21(){return clerkPlays()?HALL21.clerk:HALL21.paul}};
const EVERY=[CL,FS,AG,BE,AD1,AD2,...ACCUSERS,GU,OF,...SEATED];
/* place21: everyone where the story has him, from the flags */
function place21(room){for(const a of EVERY.concat([P])){a.talk=false;a.seat=0;a.ges=0;a.kneel=0;a.bound=0;a.bow=false;a.speed=0;a.chained=0;a.held=0;a.keeper=0;a.grips=0;a.lifted=0;a.free=false;a.noTurn=0}
  for(const a of EVERY)a.room=null;P.room=null;if(AU.score!==MUSIC)setScore(MUSIC);
  const ph=phase21(),pl=(a,r,[x,y,d])=>place(a,r,x,y,d),A=K21.AT;
  setPC21(clerkPlays()?CL:P);
  CL.look=clerkPlays()?clerkFree21:LOOK.clerk21;CL.wear=clerkPlays()?'free':'';
  if(ph==='court')pl(CL,'court21',[286,126,-1]);
  if(ph==='hearing'){pl(FS,'court21',A.governor);FS.seat=1;pl(AD1,'court21',A.advisers[0]);pl(AD2,'court21',A.advisers[1]);
    pl(CL,'court21',A.scribe);CL.seat=1;pl(OF,'court21',A.officer);ACCUSERS.forEach((a,i)=>pl(a,'court21',ROUND21[i]));
    pl(P,'court21',A.accused);chain21()}
  if(ph==='report'){pl(CL,'write21',[276,126,-1]);pl(BE,'court21',[76,124,1]);pl(AG,'court21',[100,120,1]);pl(FS,'court21',[128,120,-1])}
  if(ph==='hall'||ph==='listen'||ph==='bonds'||ph==='passage'){const S=HALL21.seats,B=HALL21.bench;
    SEATED.forEach((a,i)=>{pl(a,'hall21',[B.at[i],B.foot,1]);a.seat=1});
    pl(CL,'hall21',HALL21.clerk);
    if(ph!=='passage'){for(const[a,x]of[[FS,S.festus],[AG,S.agrippa],[BE,S.bernice]]){pl(a,'hall21',[x,HALL21.chair.foot,-1]);a.seat=1}
      pl(P,'hall21',HALL21.paul);chain21()}
    else{for(const a of SEATED)a.room=null;pl(FS,'hall21',[70,120,1]);pl(AG,'hall21',[94,120,-1])}}
  P.hs=clerkPlays()?PAULHS:null;P.party=CL.party=0}
function setup21(){P.hs=null;P.called='Paul';CL.called='governors_clerk';G.mk21=null;G.rv21=0;G.caps21=[];
  G.invs={paul:['tablets'],clerk21:[]};G.inv=G.invs.paul;drawInv()}

/* ============ PRAYER HINTS ============ */
/* While the clerk is played, the hint is his own plain thought, as the nephew's is in Chapter Nineteen. */
function hint21(){const ph=phase21();
  if(ph==='court')return['court21',['hint_ready_the_court_1','hint_ready_the_court_2']];
  if(ph==='hearing')return F.answer?['roads21',['hint_three_roads_1','hint_three_roads_2']]:['answer21',['hint_answer_festus_1','hint_answer_festus_2']];
  if(ph==='report'){if(F.report)return['tofestus21',['hint_to_festus_1','hint_to_festus_2']];
    if(!F.readLetter||!F.readRecord||!F.readNotes)return['papers21',['hint_the_papers_1','hint_the_papers_2']];
    return['marks21',['hint_mark_the_charges_1','hint_mark_the_charges_2']]}
  if(ph==='hall')return['hall21',['hint_the_king_gave_leave_1','hint_the_king_gave_leave_2']];
  if(ph==='listen')return!F.sound?['sound21',['hint_festus_broke_in_1','hint_festus_broke_in_2']]:!F.corner?['corner21',['hint_the_king_knows_1','hint_the_king_knows_2']]:['prophets21',['hint_the_prophets_1','hint_the_prophets_2']];
  if(ph==='bonds')return['bonds21',['hint_these_bonds_1','hint_these_bonds_2']];
  return F.passage?['table21',['hint_my_table_1','hint_my_table_2']]:['passage21',['hint_the_passage_1','hint_the_passage_2']]}

/* ============ CHAPTER DEFINITION ============ */
/* Birds (shared/birds.js): gulls over the sea and on the sea wall of the court, by day in fair weather; one stands on the governor's seat
   until the clerk sends it off. None in the writing room, none in the audience chamber. They change nothing in the story. */
ROOMS.court21.birds=()=>{const b=K21.birds('morning');if(!F.gull)b.stand=b.stand.concat([[K21.SEAT.at[0]+1,K21.SEAT.top,-1]]);return b};
/* every hotspot answers the clerk as it answers Paul (see act: another member uses h.as[his id]) */
for(const id of['court21','write21','report21','hall21'])for(const h of ROOMS[id].hs)if(!h.as)h.as={clerk21:h};
for(const a of EVERY)if(a.hs&&!a.hs.as)a.hs.as={clerk21:a.hs};

return{rooms:['court21','write21','report21','hall21'],setup:setup21,start:start21,hint:hint21,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the papers, the report, the marks, the listeners, the roads, the hall, the phase */
  told:TOLD,papers:PAPERS21,report:REPORT21,marks:MARK21,listen:LISTEN21,roads:ROADS21,hall:HALL21,phase:phase21,rboxes:RBOX21,
  flags:FLAGS,
  /* four rooms and fifteen flags today; the code keeps room for sixteen rooms and for forty flags. Paul is played at the hearing and in
     the audience chamber; the governor's clerk before the hearing, over the report, and in the passage (away: Paul stands in no room). */
  codeBits:{flags:40,rooms:4},party:['paul','clerk21'],swap:false,ent:ENT,
  home:{},
  away:id=>id==='paul'?clerkPlays():id==='clerk21'?false:false,
  inv:room=>['tablets'].concat(chainedNow()?['chain21']:[]),
  place:place21}
});
