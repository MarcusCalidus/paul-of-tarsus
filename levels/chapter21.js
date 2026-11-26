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
   what the story reads from a section is named at its head. write21, report21 and hall21 are tidy placeholders (ART-TODO) at their final
   geometry (SP/pair1/ROOMS-21.md), to be painted anew; so is the cart in the court. */
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
   ART-TODO (the cart): at the left edge, a carter's two-wheeled cart stands unhitched in front of the sea wall, by the gate of the palace
   (out of the picture at the left), its ox goad lying along its bed. The placeholder below is plain, at its final place; its wheel is a
   solid disc, with no spokes. The goad lies along the bed and crosses neither the cart's rails, the coping of the sea wall nor the
   horizon; whoever paints it leaning must keep it so (SP/pair1/ROOMS-21.md).
   Called from outside: ART.court21. Reads F.gull (a gull stands on the governor's seat until the clerk sends it off; see the birds).
   Hotspots (ROOMS.court21): the sea 0,40,186,38 · the sea wall 0,78,186,18 · the governor's seat 226,78,26,24 · the dais 196,96,112,16 ·
   the desk 152,88,36,22 · the cart 4,110,42,28 · the ox goad 6,106,46,8 · the way to the writing room 304,96,16,48. Walk: 30..300 by
   114..138 (SHARED.caesarea.WALK); while Paul is played (chained) the walk is his own place. Actors: the clerk sits at the desk 162,110;
   Festus on the seat 238,100; the advisers 270,101 and 292,101; Paul 210,128 and the soldier a step behind him on his left; the
   accusers at 140,122 · 116,128 · 94,120 · 70,126; the officer 300,130. Footprint: the cart 30,126,16,10. */
const CART21={x0:4,x1:46,top:110,foot:136};
let SC21=null;
ART.court21={w:320,q:12,paint(g){SC21=K21.court(g,{hour:'morning',table:false,desk:1});cart21(g)},light:K21.light('morning'),
  draw(g,t){if(SC21)SC21.draw(g,t);chains21(g)},front(){},
  props:[{y:136,shape(g){cartShape21(g,'#000')},foot:[30,126,16,10]}]};
/* the cart (ART-TODO): a plain box of a bed on a solid wheel, its shaft resting on the paving toward us, and the goad along its bed */
function cartShape21(g,c){poly(g,[4,114,44,114,46,124,6,124],c);R(g,18,118,18,18,c);poly(g,[40,122,46,122,48,134,44,136],c)}
function cart21(g){M21.shadow(g,26,136,22,2.6,.5);
  /* the bed, its boards running along it; lit from the right */
  poly(g,[4,114,44,114,46,124,6,124],'#7a5a3a');R(g,6,114,38,1.2,'#a07a52');R(g,6,119,38,.6,'rgba(30,18,10,.35)');R(g,6,123,40,1,'#4e3824');
  /* the goad along the bed: a long plain rod, a little point of metal at the left end and a small blade at the right */
  R(g,2,111,46,1.1,'#8a6a44');R(g,2,111,46,.4,'#c09a6a');R(g,0.5,111.2,2,.8,'#a8a8a8');R(g,48,110.6,2.4,1.6,'#9a9a9c');
  /* the wheel: a solid disc of planks, its hub a small square */
  g.fillStyle='#5e4430';g.beginPath();g.arc(27,127,9,0,6.2832);g.fill();g.fillStyle='#7a5a3e';g.beginPath();g.arc(26,126,7.6,0,6.2832);g.fill();
  R(g,25,125,2.4,2.4,'#3a281a');
  /* the shaft, resting on the paving */
  poly(g,[40,122,46,122,48,134,44,136],'#6a4c30')}
/* ==== ART court21: end ==== */

/* ==== ART write21: begin ==== */
/* ART-TODO. The governor's clerk's writing room (invented), in the palace, by morning. A plain room: limewashed walls over a dado, a
   window at the left (a deep square opening, its light falling into the room from the left), a long writing table against the back
   wall, a door at the right to the court. On the table, from the left: the commander's letter (an unrolled sheet), the record of the
   hearing before Felix (a sheet), the draft of the report (a sheet, the largest), the clerk's notes of the hearing before Festus (a wax
   tablet) and a square ink pot with a reed pen lying beside it, along the table. The table's legs stand at its two ends, none under
   its middle; nothing hangs on the walls.
   Called from outside: ART.write21. Reads nothing.
   Hotspots (ROOMS.write21): the window 24,24,40,42 · the commander's letter 154,78,24,14 · the record before Felix 178,78,26,14 · the
   report 204,76,30,16 · my notes 234,78,22,14 · the ink pot 256,74,12,18 · the door to the court 284,38,32,64. Walk: 24..296 by 116..138.
   Wall foot y 100; the table 150..270, its top 88, its front 92..96, its feet 112 (behind the strip, no footprint). Light: from the
   window at the left (sun [16,6,.28]). */
ART.write21={w:320,q:12,paint(g){paintWrite21(g)},light:{amb:'#e8dcc6',sun:[16,6,.28],wallY:100},draw(){},front(){}};
function paintWrite21(g){const r=rng(2101);
  plaster(g,0,0,320,100,'#dccfb4',r,{patch:0,cracks:0,t:.3});R(g,0,84,320,16,'#b8a482');R(g,0,84,320,.8,'#cbb894');
  /* the window: a deep square opening onto the morning sky, its sill lit */
  R(g,24,24,40,42,'#8a7a64');R(g,28,28,32,34,'#a9c4dc');R(g,28,52,32,10,'#c6d6e0');R(g,24,64,40,2.4,'#efe2c6');
  /* the door at the right, open onto the court */
  R(g,284,38,32,64,'#6a5844');R(g,288,42,24,58,'#d8c8a6');R(g,288,90,24,10,'#c8b694');
  pave(g,-2,100,322,144,'#b4a07e',r,{vx:160,vy:60,rows:5,step:30,v:.06,t:.3});
  /* the table: its top, its front, its two legs at its ends */
  M21.shadow(g,210,112,62,3,.45);
  R(g,150,88,120,4,'#8a6440');R(g,150,92,120,4,'#6a4a2e');R(g,152,96,4,16,'#5a3e26');R(g,264,96,4,16,'#5a3e26');R(g,150,88,120,.6,'#b08a5c');
  /* the papers on it */
  R(g,156,84,20,5,'#e8dcb8');R(g,181,83.6,22,5.4,'#e4d6b0');R(g,207,82,26,7,'#efe4c4');R(g,236,83.6,18,5.4,'#9a7448');R(g,238,84.4,14,3.8,'#3a2a1c');
  R(g,259,80,5,8,'#3a3430');R(g,259,80,5,1,'#5a524a');R(g,240,87.6,24,.6,'#c8a86a');
  /* the light from the window: warm on the left, falling off to the right */
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,220,170,1)','rgba(220,200,190,.5)','rgba(160,160,200,.7)']);g.fillRect(0,0,320,144)})}
/* ==== ART write21: end ==== */

/* ==== ART report21: begin ==== */
/* ART-TODO. The report, close, as it lies on the clerk's table: one sheet of papyrus, its fibers running across, in the morning light from
   the left (the close-view standard of Chapters Thirteen and Fourteen). At its head the line of address; then the charges ever brought,
   one to a line (RBOX21), and beside each, at the right, the mark the clerk has set (MBOX21), written in a smaller hand; below them the
   field for the charge on which the prisoner is sent (FBOX21), which stays empty. No line is ruled and nothing is struck through: a mark
   is a word written beside its line, never a stroke across letters.
   Called from outside: ART.report21. Reads G.mk21, F.report.
   Hotspots: each charge (RBOX21), each mark (MBOX21, the same as its charge), the field (FBOX21), back to the table 0,136,120,8. Walk:
   none (a close view). */
const RBOX21=Array.from({length:5},(_,i)=>[28,36+i*15,190,13]),MBOX21=Array.from({length:5},(_,i)=>[224,36+i*15,72,13]),
  HBOX21=[28,10,264,14],CBOX21=[28,26,264,8],FBOX21=[28,114,264,16];
ART.report21={w:320,q:12,paint(g){paintReport21(g)},light:null,draw(g){drawReport21(g)},front(){}};
function paintReport21(g){
  M21.plank(g,0,0,320,144,'#664428',rng(2111),0);tex(g,'mott',.14,0,0,320,144,'overlay',.9);
  for(const[d,a]of[[5,.08],[3,.13],[1.6,.2]]){g.fillStyle=`rgba(16,8,4,${a})`;g.fillRect(16-d+2.6,4-d+2.6,288+d*2,132+d*2)}
  g.fillStyle=lg(g,16,4,304,136,['#eee2bc','#e4d4a8','#d6c290']);g.fillRect(16,4,288,132);tex(g,'mott',.12,16,4,288,132,'overlay',.8);
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,220,170,1)','rgba(160,150,190,.6)']);g.fillRect(0,0,320,144)})}
function fit21(g,s,w,h){for(const z of[4.6,4.2,3.8,3.4]){g.font=FONT21(z);const lh=z*1.2,words=s.split(' '),L=[];let cur='';
    for(const wd of words){const t=cur?cur+' '+wd:wd;if(g.measureText(t).width>w&&cur){L.push(cur);cur=wd}else cur=t}if(cur)L.push(cur);
    if(L.length*lh<=h||z===3.4)return{z,lh,L}}}
function drawReport21(g){G.caps21=G.caps21||[];
  const put=(s,b,col)=>{const[x,y,w,h]=b,f=fit21(g,s,w,h);g.font=FONT21(f.z);g.textBaseline='top';g.fillStyle=col;f.L.forEach((l,i)=>g.fillText(l,x,y+i*f.lh));
    const mw=Math.max(...f.L.map(l=>g.measureText(l).width));if(G.caps21.length<400)G.caps21.push({s,w:mw,max:w,h:f.L.length*f.lh,maxh:h})};
  put(T('report_heading'),HBOX21,'#2a1a0c');put(T('report_the_charges_brought'),CBOX21,'#4a2e14');
  REPORT21.forEach((c,i)=>{put(T(c.k),RBOX21[i],'#2a1a0c');const m=markOf21(c.k);if(m)put(T(MARK21[m]),MBOX21[i],'#6a3a1a')});
  put(T('report_the_charge_he_is_sent_on'),[FBOX21[0],FBOX21[1],FBOX21[2],6],'#4a2e14')}
/* ==== ART report21: end ==== */

/* ==== ART hall21: begin ==== */
/* ART-TODO. The audience chamber (Acts 25:23), an inner hall of the palace, dressed for the day (the same hall as Chapter Twenty's hall20,
   whose painter should become one with this one in shared/caesarea.js). We look across the hall: at the right a dais of two broad white
   steps (lower 196..316, top 104, foot 112; upper 204..316, top 98) with three chairs on it, each a solid block with a back, no legs
   under its middle (their tops 93, their feet 102): Festus at 222, King Agrippa at 248, Bernice at 274, all facing left. At the back
   left a long bench of stone, solid to the floor (30..174, top 95, foot 104), where the military commanders sit at 44, 68, 92 and the
   leading men of the city at 116, 140, 164, facing right. The door is an opening in the back wall at the left (6..30, 46..96). Two long,
   low windows high in the back wall (60..120 and 140..200, 16..26) give the light, from the left. Two Roman standards stand at the back,
   small, in the shade of the back wall, at 22 and 184 (their feet at 95.5, their tops no higher than 52): painted by
   SHARED.caesarea.standard when it exists, never a hotspot (CONTRIBUTING section 3). The wall behind them has no course or band that a
   pole would cross. No window, lamp or round thing lies behind a head.
   Called from outside: ART.hall21. Reads nothing.
   Hotspots (ROOMS.hall21): the dais 196,96,120,16 · the bench 30,86,144,18 · the windows 60,14,140,14 · the door 6,46,24,50. Walk:
   24..300 by 116..138; while Paul is played (chained) the walk is his own place. Paul stands 150,126 facing right, the soldier a step
   behind him on his left (132,125.5); the clerk stands 300,124 facing left. Light: from the high windows at the left (sun [14,6,.22]). */
const HALL21={wallY:96,dais:{lower:[196,316,104,112],upper:[204,316,98,104]},chair:{top:93,foot:102},
  seats:{festus:222,agrippa:248,bernice:274},bench:{x0:30,x1:174,top:95,foot:104,at:[44,68,92,116,140,164]},
  door:[6,46,24,50],windows:[[60,16,60,10],[140,16,60,10]],standards:[22,184],paul:[150,126,1],clerk:[300,124,-1]};
ART.hall21={w:320,q:12,paint(g){paintHall21(g)},light:{amb:'#e6dccc',sun:[14,6,.22],wallY:96},draw(g){chains21(g)},front(){}};
function paintHall21(g){const r=rng(2121),H=HALL21;
  plaster(g,0,0,320,96,'#d6c8aa',r,{patch:0,cracks:0,t:.3});
  /* panels of imitation stone on the back wall, each a block of its own, stopping short of one another */
  for(const x of[36,96,156,216,276])R(g,x,34,48,50,'#b88a6a');
  for(const[x,y,w,h]of H.windows){R(g,x,y,w,h,'#9ab8d0');R(g,x,y+h-1.6,w,1.6,'#efe2c6')}
  {const[x,y,w,h]=H.door;R(g,x,y,w,h,'#3a3028');R(g,x+2,y+2,w-4,h-2,'#4e4236')}
  pave(g,-2,96,322,144,'#cbbd9c',r,{vx:160,vy:58,rows:6,step:32,v:.06,t:.3});
  /* the bench: a solid block of stone */
  {const b=H.bench;M21.shadow(g,(b.x0+b.x1)/2,b.foot,(b.x1-b.x0)/2,2.4,.4);R(g,b.x0,b.top,b.x1-b.x0,b.foot-b.top,'#bcae92');R(g,b.x0,b.top,b.x1-b.x0,1.2,'#e4d8bc')}
  /* the dais: two broad steps of white stone */
  for(const[x0,x1,t,f]of[H.dais.lower,H.dais.upper]){R(g,x0,t,x1-x0,f-t,'#e6ded0');R(g,x0,t,x1-x0,1.2,'#f6f0e4');R(g,x0,f-1,x1-x0,1,'#b8ae9c')}
  /* the chairs: solid blocks with backs, their tops where the hips rest */
  for(const x of Object.values(H.seats)){R(g,x-9,H.chair.top,19,H.chair.foot-H.chair.top,'#6a4428');R(g,x+6,H.chair.top-12,4,12,'#5a3a22');R(g,x-9,H.chair.top,19,.8,'#9a6c42')}
  /* the light from the high windows at the left */
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,222,176,1)','rgba(214,200,196,.6)','rgba(170,172,208,.7)']);g.fillRect(0,0,320,144)});
  /* the standards, when shared/caesarea.js paints them (CONTRIBUTING section 3: at the back, small, never a hotspot) */
  if(K21.standard)for(const x of H.standards)K21.standard(g,x,95.5,{})}
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
const LISTEN21=[{k:'paul_true_and_of_a_sound_mind',to:'festus',flag:'sound',other:['agrippa_the_governor_said_it',AG]},
  {k:'paul_not_done_in_a_corner',to:'festus',flag:'corner',need:'sound',early:['festus_answer_what_i_said',FS],other:['agrippa_tell_that_to_the_governor',AG]},
  {k:'paul_do_you_believe_the_prophets',to:'agrippa',flag:'prophets',need:'corner',early:['agrippa_the_governor_spoke_to_you_first',AG],other:['festus_put_that_to_the_king',FS]},
  {k:'paul_im_not_saying_this_to_save_myself',to:null,festus:['festus_that_much_is_settled',FS],agrippa:['agrippa_so_i_have_heard',AG]}];
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
const THP={thought:1,color:'#cfe2ff'};  /* Paul's */
const mk21=()=>G.mk21||(G.mk21={});
const markOf21=k=>F.report?REPORT21.find(c=>c.k===k).ok:mk21()[k];
/* the chain: one soldier, chained by his wrist to Paul's, a step behind him on his left (shared/cast.js, custody, one keeper) */
function chain21(){SHARED.cast.custody.place('chain',P,GU,null)}
/* in a room's draw: the chain between them, link by link */
function chains21(g){if(P.chained&&P.room===G.room&&GU.room===G.room)SHARED.cast.custody.chains(g,P,GU,null)}
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
  place(P,'hall21',-10,126,1);place(GU,'hall21',-28,125.5,1);await Promise.all([go21(P,HALL21.paul[0],HALL21.paul[1],40),go21(GU,HALL21.paul[0]-18,HALL21.paul[1]-.5,40)]);
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
  const opts=LISTEN21.map(s=>s.k).concat(['say_nothing_for_now']),i=await choose(opts,{keep:1});
  if(i===LISTEN21.length)return;const s=LISTEN21[i];
  if(s.to===lis&&F[s.flag])return say(P,'paul_ive_said_that_already',THP);
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
  {name:'windows',x:60,y:14,w:140,h:14,wx:130,wy:120,look:'hall_windows_look'},
  {name:'bench',x:30,y:86,w:144,h:18,wx:100,wy:120,look:'hall_bench_look'},
  {name:'dais',x:196,y:96,w:120,h:16,wx:190,wy:120,look:'hall_dais_look'},
  {name:'door_of_the_hall',x:6,y:46,w:24,h:50,wx:30,wy:122,dir:-1,exit:()=>PC()===CL&&phase21()==='passage'?passage21():say(PC(),PC()===CL?'clerk_my_place_is_here':'paul_not_mine_to_go',PC()===CL?TC:THP),look:'door_of_the_hall_look'}]};

/* ============ PEOPLE AS HOTSPOTS ============ */
const who=(a,o)=>{a.hs=Object.assign({name:a.name,actor:a},o)};
const inRoom=r=>G.room===r;
who(CL,{look:'governors_clerk_look',talk:()=>say(CL,'clerk_i_only_write_it_down',{to:P})});
who(FS,{look:'festus_look',talk:()=>inRoom('hall21')?speakTo21(FS):phase21()==='hearing'?answer21():PC()===CL?festus21():say(FS,'festus_not_now',{to:PC()}),
  useWith:it=>it==='chain21'?say(P,'paul_its_the_king_im_answering',THP):false,give:it=>it==='chain21'?say(P,'paul_its_the_king_im_answering',THP):false});
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
    pl(CL,'court21',A.scribe);CL.seat=1;pl(OF,'court21',A.officer);ACCUSERS.forEach((a,i)=>pl(a,'court21',A.accusers[i]));
    pl(P,'court21',A.accused);chain21()}
  if(ph==='report'){pl(CL,'write21',[276,126,-1]);pl(FS,'court21',[110,120,1]);pl(AG,'court21',[134,120,-1]);pl(BE,'court21',[156,124,-1])}
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
ROOMS.court21.birds=()=>{const b=K21.birds();if(!F.gull)b.stand=b.stand.concat([[K21.SEAT.at[0]+1,K21.SEAT.top,-1]]);return b};
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
