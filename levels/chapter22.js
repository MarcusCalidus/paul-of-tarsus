/* Paul of Tarsus, Chapter Twenty-Two: Euroaquilo (Acts 27:1-26).
   STUB: this whole file is a placeholder made by the scaffolding (branch sea-scaffold), so that the manifest, the hand-overs, the carry into
   Chapter Twenty-Three, the harness and the docs could be built before the chapter. It has one plain room on a deck, Paul and Luke in it, a
   line told, a rail where the hidden treasure will be found, Luke's tablet with a placeholder choice that sets the six marks, and a hatch
   that ends the chapter. The chapter agent replaces all of it, header first: the episode, what Acts leaves unsaid, who is invented, who is
   played, the puzzles and why each has one solution, and the rooms (quay22, the travel map, myra22, deck22, storm22, tablet22, girded22; see
   the build brief). Nothing marked STUB may survive. Its keys all begin with stub22_, so the text check names any that are left in lang/
   once the code that used them is gone.
   What is real already, and stays: the chapter's line in CHAP (index.html, marker LOGIC22), the hand-over from Chapter Twenty-One
   (levels/chapter21.js, end21), party:['paul','luke22'] with swap:false (who is played is fixed by the scene: P is always Paul, and the
   chapter sets G.pc to Luke where Luke is played, as Chapter Twenty-One does for the clerk), codeBits, the twelve mark flags (MARKS, by
   these names; where they stand in FLAGS is the chapter's choice) and the end screen's carry (carry23 and end22 below: its go and code
   keys, codeOf(23,bits) and startChapter(23,bits)). */
LEVEL(22,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* STUB, TODO: a few notes of a lyre, so that the chapter has a score. The real score is in a key and a bar no earlier chapter has (the
   survey's section 8 lists what is taken), and its tension moves and is never a held drone (CONTRIBUTING section 4). */
const MUSIC={dt:.2,root:50,scale:[0,2,3,5,7,9,10],bars:4,tracks:[
  {inst:'lyre',moods:['stub22'],oct:12,loop:2,lines:[[[0,0,4],[4,2,4],[8,4,8]],[[0,3,4],[4,1,4],[8,0,8]]],vol:.4}]};
const AMB={stub22:{waves:.5,wind:.25}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART stub22: begin ==== */
/* STUB: one plain picture, a pale sky over a calm sea and the planks of a deck, a coaming of a hatch at the right. No mast, no rope and no
   joint in the planks (nothing that could make a cross). Soft light under an overcast sky, so no cast shadow (amb only). */
ART.stub22={w:320,q:12,paint(g){const r=rng(2222);
    R(g,0,0,320,60,'#b8c4cc');R(g,0,40,320,20,'#c8d0d4');
    R(g,0,60,320,30,'#4a6a80');R(g,0,60,320,2,'#6a8a9c');
    R(g,0,90,320,14,'#7a5a3a');R(g,0,90,320,2,'#9a7a54');
    for(let y=104;y<144;y+=6){R(g,0,y,320,6,y%12?'#a07c54':'#94704a');R(g,0,y,320,1,'#b08c62')}
    R(g,262,96,46,10,'#5a3e26');R(g,264,98,42,6,'#3a2818')},
  light:{amb:'#e8e4dc',wallY:104},draw(){},front(){}};
/* ==== ART stub22: end ==== */

/* ============ PEOPLE ============ */
/* Luke as the later chapters paint him (SHARED.cast.CAESAREA.luke; his wet look is SHIPWRECK.luke_wet, the people of the voyage SEA). */
Object.assign(LOOK,{luke22:Object.assign({},SHARED.cast.CAESAREA.luke)});
const LK=actor('luke22','Luke','#d0e8e0',112);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* STUB: TOLD comes from SP/ch22/told.md (the lead's paraphrases, English and German), key for key and word for word. */
const TOLD={stub_open:'stub22_told_opening'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TH={thought:1,color:'#cfe2ff'};

/* ============ LUKE'S TABLET: THE SIX MARKS, CARRIED INTO CHAPTER TWENTY-THREE ============ */
/* Each of the six days gets one mark, two flags: mNa the low bit, mNb the high one. 0 only the day, 1 south-west, 2 west, 3 north-west.
   Chapter Twenty-Three's first thirteen flags are from22 and these twelve, by the same names (CHAP[23].carry, CONTRIBUTING section 5). */
const MARKS=[1,2,3,4,5,6].flatMap(n=>['m'+n+'a','m'+n+'b']);
const markOf=n=>(F['m'+n+'a']?1:0)|(F['m'+n+'b']?2:0);
const setMark=(n,v)=>{F['m'+n+'a']=v&1?1:0;F['m'+n+'b']=v&2?1:0};
const CARRY23=['from22'].concat(MARKS);
/* carry23: the bits that Chapter Twenty-Three's first code and its start are given: from22 always, then the marks as they stand */
const carry23=()=>CARRY23.reduce((b,k,i)=>b|(i===0||F[k]?1:0)<<i,0);
/* STUB: a placeholder choice that sets the six marks, so that the carry can be tested; the chapter's own tablet22 replaces it */
const MARKK=['stub22_mark_only_the_day','stub22_mark_south_west','stub22_mark_west','stub22_mark_north_west'];
async function tablet22(){for(let n=1;n<=6;n++){await say(LK,'stub22_which_mark',TH);setMark(n,await choose(MARKK))}
  F.marked=1;await say(LK,'stub22_six_marks',TH);codeBtn()}

const FLAGS=['stub','marked'].concat(MARKS);   /* STUB: the real flags (append only once written), the twelve marks among them */

/* ============ THE STORY ============ */
const ENT={stub22:[150,126,1]};
function show22(room){place22(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);codeBtn()}
async function start22(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(22);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    show22('stub22');await fade(0,600);await tell('stub_open');codeBtn()},true)}
/* the end screen: on to Chapter Twenty-Three, with the code that carries the tablet (real); its text and based lines are STUB keys, which
   the chapter's own end screen keys replace. The printed code and the click lead to the same flags. */
async function end22(){F.stub=1;await fade(1,700);const bits=carry23();
  endScreen({title:'euroaquilo_2',text:'stub22_end',based:'stub22_based_on_acts_27_1_26',go:'click_to_continue_to_chapter_twenty_three',
             code:['chapter_twenty_three_code_code',codeOf(23,bits)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(23,bits)};await new Promise(()=>{})}

/* ============ ROOMS ============ */
ROOMS.stub22={space:.8,walk:[30,300,114,138],mood:'stub22',amb:AMB.stub22,hs:[
  /* STUB: the hidden treasure's place (TSTEPS[22] in the harness looks here). The real one: Tarsus, seen while the leg off Cilicia is on
     the travel map; looking at it calls treasure() and changes nothing else, and no verse is told there. */
  {name:'stub22_coast',x:20,y:52,w:120,h:14,wx:80,wy:118,look:async()=>{await say(P,'stub22_coast_look',TH);treasure()}},
  {name:'stub22_tablet',x:150,y:96,w:30,h:14,wx:150,wy:124,def:'use',look:'stub22_tablet_look',use:()=>tablet22()},
  {name:'stub22_hatch',x:262,y:94,w:46,h:14,wx:280,wy:120,def:'use',look:'stub22_hatch_look',use:()=>end22(),open:()=>end22()}]};
who(LK,{look:'stub22_luke_look',talk:()=>say(LK,'stub22_luke_talk',{to:P})});
function who(a,o){a.hs=Object.assign({name:a.name,actor:a},o)}

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub22_task',if:()=>!F.stub}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
function place22(room){for(const a of[P,LK]){a.seat=a.ges=a.kneel=a.bound=a.chained=a.held=0;a.room=null}if(AU.score!==MUSIC)setScore(MUSIC);
  place(LK,room,96,122,1);G.pc=P;G.inv=G.invs.paul}
function setup22(){P.hs=null;P.called='Paul';G.invs={paul:['tablets'],luke22:[]};G.inv=G.invs.paul;drawInv()}
function hint22(){return F.marked?['stub22b',['stub22_hint_hatch_1','stub22_hint_hatch_2']]:['stub22',['stub22_hint_1','stub22_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['stub22'],setup:setup22,start:start22,hint:hint22,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the marks and the carry */
  told:TOLD,marks:MARKS,markOf,setMark,carry23,end:end22,
  flags:FLAGS,
  /* STUB: one room and fourteen flags today; the code keeps room for sixteen rooms and fifty-six flags. Paul and Luke, fixed by the scene. */
  codeBits:{flags:56,rooms:4},party:['paul','luke22'],swap:false,ent:ENT,home:{},away:()=>false,inv:()=>['tablets'],place:place22}
});
