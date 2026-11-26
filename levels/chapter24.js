/* Paul of Tarsus, Chapter Twenty-Four: He Took Courage (Acts 28:11-16).
   STUB: this whole file is a placeholder made by the scaffolding (branch r-scaffold), so that the manifest, the hand-over into Chapter
   Twenty-Five with the lodging carried, the harness and the text files could be built before the chapter. It has two plain rooms, a quay
   at Malta (Luke played, Paul by him) and a street in Rome (Luke alone), the opening line told from the narrator's scroll, a corner of the
   quay where the hidden treasure will be found, a gangplank that moves on (Acts 28:16 told), and two doors in the street, one for each
   lodging, that end the chapter. The chapter agent replaces all of it, header first: the episode, what Acts leaves unsaid, who is invented,
   who is played, the puzzles and why each has one solution, and the rooms (quay24, court24, capua24, canal24, appius24, rome24, board24,
   hills24, marsh24, taverns24, far24, capena24, camp24, lane24, look24, and the travel map; see the build brief). Nothing marked STUB or
   ART-TODO may survive. Its own keys all begin with stub24_, so the text check names any that are left in lang/ once the code that used
   them is gone.
   What is real already, and stays: the chapter's line in CHAP (index.html, marker LOGIC24), the tables of the lead's lines (TOLD, LINES24:
   every key and text of SP/ch24/told.md is in lang/en and lang/de now, verbatim), the end screen's keys and its carry (carry25 and end24
   below: its go and code keys, codeOf(25,bits) and startChapter(25,bits)), the flag street (the lodging chosen: 0 the flat on the second
   floor, 1 the room at street level), party:['paul','luke24'] with swap:false (append the young brother of Rome and the three carriers of
   the news after them, never before: who is played is fixed by the scene), and codeBits. */
LEVEL(24,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* STUB, TODO: a few notes of a lyre in C major and bars of fifteen steps (a key and a bar no earlier chapter has), so that the chapter has
   a score. The real score is in a key and a bar of its own, and its bar is the bar of the walk: the beat of the step is the music's bar.
   Its tension moves and is never a held drone (CONTRIBUTING section 4). */
const MUSIC={dt:.2,steps:15,group:[5,5,5],root:60,scale:[0,2,4,5,7,9,11],bars:4,tracks:[
  {inst:'lyre',moods:['stub24'],oct:0,loop:2,lines:[[[0,0,5],[5,2,5],[10,4,5]],[[0,3,5],[5,1,5],[10,0,5]]],vol:.4}]};
const AMB={quay24:{waves:.4,wind:.2},lane24:{wind:.1}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART quay24: begin ==== */
/* ART-TODO: a plain placeholder for the quay of Malta on a spring morning: a pale sky, the sea, the long dark hull of the ship from
   Alexandria lying along the quay with the horizon behind it, and the quay's paving. No mast, no rope, no sign on the bow and no joint in
   the paving (nothing that could make a cross). The chapter paints the real quay with SHARED.grainship.side(g,{..., sign:{figs:1,
   name:'ΚΑΣΤΩΡ',size:'small',lay:'skew'}}), as approved, and gives it its sun and its gulls. Soft light for the placeholder (amb only). */
ART.quay24={w:320,q:12,paint(g){
    R(g,0,0,320,40,'#c4d2dc');R(g,0,40,320,22,'#d4dce0');
    R(g,0,62,320,26,'#4e7286');R(g,0,62,320,2,'#6e90a2');
    poly(g,[52,66,262,66,252,86,64,86],'#4a3424');R(g,54,66,206,2,'#6a4c34');
    R(g,0,88,320,56,'#b8a888');R(g,0,88,320,3,'#cbbc9c');R(g,0,91,320,2,'#8e8068');
    R(g,8,100,34,12,'#a49474')},
  light:{amb:'#eee8dc',wallY:92},draw(){},front(){}};
/* ==== ART quay24: end ==== */

/* ==== ART lane24: begin ==== */
/* ART-TODO: a plain placeholder for a street of tenements in Rome: a strip of sky, two house fronts with a door each (the stair door of
   a flat at the left, the wide door of a room at street level at the right), and the paving. No window bars, no joints in the walls. The
   street lies in the shade of its houses: soft light (amb only). */
ART.lane24={w:320,q:12,paint(g){
    R(g,0,0,320,26,'#c8d4dc');
    R(g,0,18,160,82,'#b88a64');R(g,0,18,160,3,'#9a7050');
    R(g,160,26,160,74,'#a87c5c');R(g,160,26,160,3,'#8e6648');
    R(g,72,52,26,48,'#4a3222');R(g,74,54,22,46,'#5a3e2a');
    R(g,198,60,40,40,'#3e2a1e');R(g,200,62,36,38,'#4e3624');
    R(g,0,100,320,44,'#9a9284');R(g,0,100,320,2,'#7a7266')},
  light:{amb:'#d8d2cc',wallY:100},draw(){},front(){}};
/* ==== ART lane24: end ==== */

/* ============ PEOPLE ============ */
/* Luke as the later chapters paint him (SHARED.cast.CAESAREA.luke). Paul's look is the engine's for this chapter (paulLook). */
Object.assign(LOOK,{luke24:Object.assign({},SHARED.cast.CAESAREA.luke)});
const LK=actor('luke24','Luke','#d0e8e0',112);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: the lead's paraphrases of Acts 28:11-16 (SP/ch24/told.md), key for key; their English and German stand in lang/ word for word.
   The narrator tells them (tell). brothers_at_puteoli_acts_28_14 may be told in two halves (told.md says how): then it gets two keys. */
const TOLD={n11:'three_months_later_we_sailed_acts_28_11',n12:'three_days_at_syracuse_acts_28_12',n13:'rhegium_and_the_south_wind_acts_28_13',
  n14:'brothers_at_puteoli_acts_28_14',n15a:'the_brothers_came_out_to_meet_us_acts_28_15',n15b:'paul_thanked_god_and_took_courage_acts_28_15',
  n16:'we_came_into_rome_acts_28_16'};
/* LINES24: the lead's other two lines: Chapter Nineteen's line, which Luke thinks of at the quay (same key, same text), and what Paul says
   of his letter to the brothers who walk with him after the Marketplace of Appius (a spoken line that tells a verse, with its reference) */
const LINES24={courage:'take_courage_acts_23_11',romans:'what_i_wrote_to_you_romans_1_11_12'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TL={thought:1,color:'#d0e8e0'};   /* Luke's thoughts */

/* ============ THE LODGING, CARRIED INTO CHAPTER TWENTY-FIVE ============ */
/* Chapter Twenty-Five's first two flags are from24 (a lodging came in: always set here) and street (0 the flat, 1 the room at street
   level), by those names (CHAP[25].carry, CONTRIBUTING section 5). This chapter keeps the choice in its own flag street. */
const CARRY25=['from24','street'];
/* carry25: the bits that Chapter Twenty-Five's first code and its start are given: from24 always, then street as it stands */
const carry25=()=>CARRY25.reduce((b,k,i)=>b|(i===0||F[k]?1:0)<<i,0);

const FLAGS=['sailed','street','chosen'];   /* STUB: the real flags (append only once written), street among them */

/* ============ THE STORY ============ */
const ENT={quay24:[120,126,1],lane24:[150,126,1]};
function show24(room){place24(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);drawInv();codeBtn()}
async function goto24(room){await fade(1,300);show24(room);await fade(0,300)}
async function start24(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(24);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    /* 28:11, from the narrator's scroll; then the quay at Malta */
    G.scene=DARK;await tell('n11');G.scene=null;
    show24('quay24');await fade(0,600);await say(LK,'stub24_luke_at_the_quay',TL);codeBtn()},true)}
/* STUB: the gangplank: in the stub the whole road is skipped; 28:16 is told, and Luke is in a street of Rome */
async function sail24(){if(F.sailed)return;await fade(1,600);F.sailed=1;G.scene=DARK;await tell('n16');G.scene=null;
  show24('lane24');await fade(0,600);await say(LK,'stub24_two_lodgings',TL);codeBtn()}
/* STUB: a lodging chosen, and the end. The chapter's own search for a room (lane24, look24) sets street the same way. */
async function choose24(street){if(F.chosen)return;F.street=street?1:0;F.chosen=1;
  await say(LK,street?'stub24_the_room_at_street_level':'stub24_the_flat_upstairs',TL);return end24()}
/* the end screen: on to Chapter Twenty-Five, with the code that carries the lodging (real); its text and based lines are the lead's keys,
   whose text is a STUB in lang/ until he writes it. The printed code and the click lead to the same flags. */
async function end24(){await fade(1,700);const bits=carry25();
  endScreen({title:'he_took_courage_2',text:'he_took_courage_end',based:'based_on_acts_28_11_16',go:'click_to_continue_to_chapter_twenty_five',
             code:['chapter_twenty_five_code_code',codeOf(25,bits)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(25,bits)};await new Promise(()=>{})}

/* ============ ROOMS ============ */
ROOMS.quay24={space:.8,walk:[24,300,112,138],mood:'stub24',amb:AMB.quay24,hs:[
  {name:'stub24_ship',x:52,y:62,w:210,h:26,wx:150,wy:118,look:'stub24_ship_look'},
  /* STUB: the hidden treasure's place (TSTEPS[24] in the harness looks here). The real one: the reeds by the canal at night (canal24);
     touching them sets the frogs off, and they croak the chapter's own tune, the reeds stir and rings spread on the water; it calls
     treasure() and changes nothing else. */
  {name:'stub24_corner_of_the_quay',x:6,y:96,w:40,h:20,wx:50,wy:120,look:async()=>{await say(LK,'stub24_corner_of_the_quay_look',TL);treasure()}},
  {name:'stub24_gangplank',x:180,y:84,w:44,h:14,wx:200,wy:118,def:'use',look:'stub24_gangplank_look',use:()=>sail24(),open:()=>sail24()}]};
ROOMS.lane24={space:.8,walk:[24,300,112,138],mood:'stub24',amb:AMB.lane24,hs:[
  {name:'stub24_stair_door',x:70,y:50,w:30,h:52,wx:86,wy:118,def:'open',look:'stub24_stair_door_look',open:()=>choose24(0),use:()=>choose24(0)},
  {name:'stub24_door_at_street_level',x:196,y:58,w:44,h:44,wx:218,wy:118,def:'open',look:'stub24_door_at_street_level_look',open:()=>choose24(1),use:()=>choose24(1)}]};

/* Luke is played here: a hotspot does for him what it says (as Chapters Twenty-One and Twenty-Three do for whoever is played who is not
   Paul); a hotspot that is to answer him otherwise gives its own as. */
for(const id of['quay24','lane24'])for(const h of ROOMS[id].hs)if(!h.as)h.as={luke24:h};

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub24_task',if:()=>!F.chosen}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
/* Luke is played in both rooms of the stub; Paul stands on the quay, and is away in the street (he is at the camp) */
function place24(room){for(const a of[P,LK]){a.seat=a.ges=a.kneel=a.bound=a.chained=a.held=0;a.room=null;a.noTurn=0}if(AU.score!==MUSIC)setScore(MUSIC);
  if(room==='quay24'){place(P,room,212,124,-1);P.hs={name:'Paul',actor:P,as:{luke24:{look:'stub24_paul_look',talk:()=>say(P,'stub24_paul_on_the_quay',{to:LK})}}}}
  else P.hs=null;
  if(G.pc!==LK){G.pc=LK;G.inv=G.invs.luke24||(G.invs.luke24=[])}}
function setup24(){P.hs=null;P.called='Paul';LK.called='Luke';G.invs={paul:['tablets'],luke24:[]};G.inv=G.invs.paul;drawInv()}
function hint24(){return F.sailed?['stub24b',['stub24_hint_lodging_1','stub24_hint_lodging_2']]:['stub24',['stub24_hint_1','stub24_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['quay24','lane24'],setup:setup24,start:start24,hint:hint24,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the lead's other lines, the carry and the end */
  told:TOLD,lines:LINES24,carry25,end:end24,
  flags:FLAGS,
  /* STUB: two rooms and three flags today; the code keeps room for sixteen rooms and forty flags. Paul and Luke, fixed by the scene. */
  codeBits:{flags:40,rooms:4},party:['paul','luke24'],swap:false,ent:ENT,home:{},away:id=>id==='paul'&&!!F.sailed,inv:()=>['tablets'],place:place24}
});
