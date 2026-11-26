/* Paul of Tarsus, Chapter Twenty: Some Other Time (Acts 24:1-27).
   STUB: this whole file is a placeholder made by the scaffolding (branch c20-scaffold), so that the manifest, the hand-overs, the harness and
   the docs could be built before the chapter. It has one plain room, Paul in it, a line told, a window where the hidden treasure will be
   found, and a door that ends the chapter. The logic agent replaces all of it, header first: the episode, what Acts leaves unsaid, who is
   invented, the puzzles and why each has one solution, and the rooms (court20, room20, window20, hall20, charges20; see the build brief).
   Nothing marked STUB may survive. Its keys all begin with stub20_, so the text check names any that are left in lang/ once the code that
   used them is gone. What is real already, and stays: the chapter's line in CHAP (index.html, marker LOGIC20), the hand-over from Chapter
   Nineteen (levels/chapter19.js, end19), the end screen's hand-over to Chapter Twenty-One (end20 below: its go and code keys, and
   startChapter(21)), and codeBits. */
LEVEL(20,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* STUB: a few notes of a lyre, so that the chapter has a score. The real score is in a key and a bar no earlier chapter has (survey G), keeps
   the lyre and harp of Chapter Nineteen's palace mood, and has a tense mood that moves (CONTRIBUTING section 4). */
const MUSIC={dt:.2,root:50,scale:[0,2,3,5,7,8,10],bars:4,tracks:[
  {inst:'lyre',moods:['stub20'],oct:12,loop:2,lines:[[[0,0,4],[4,2,4],[8,4,8]],[[0,3,4],[4,1,4],[8,0,8]]],vol:.4}]};
const AMB={stub20:{waves:.3,wind:.1}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART stub20: begin ==== */
/* STUB: one plain room, a limewashed wall over paving, a window in the wall (where the treasure will be) and a door at the right. Soft light
   from the window only, so no cast shadow (amb only). */
ART.stub20={w:320,q:12,paint(g){const r=rng(2020);
    plaster(g,0,0,320,104,'#dcc8a8',r,{patch:0,cracks:0,t:.3});
    R(g,60,30,52,40,'#6a8aa8');R(g,60,30,52,20,'#9ab4c8');R(g,58,70,56,3,'#b8a488');
    R(g,268,38,34,66,'#5a4430');R(g,270,40,30,64,'#6e5438');
    pave(g,0,104,320,144,'#b09c7c',r)},
  light:{amb:'#f0dcc4',wallY:104},draw(){},front(){}};
/* ==== ART stub20: end ==== */

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* STUB: TOLD comes from SP/ch20/told.md (the lead's paraphrases, English and German), key for key and word for word. */
const TOLD={stub_open:'stub20_told_opening'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TH={thought:1,color:'#cfe2ff'};
const FLAGS=['stub'];   /* STUB: the real flags (append only once written) */

/* ============ THE STORY ============ */
const ENT={stub20:[150,126,1]};
function show20(room){place20(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);codeBtn()}
async function start20(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(20);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    show20('stub20');await fade(0,600);await tell('stub_open');codeBtn()},true)}
/* the end screen: leads on to Chapter Twenty-One with its first code (real, as Chapter Eighteen's leads on to Nineteen); its title is real,
   its text and based lines are STUB keys, which the chapter's own end screen keys replace */
async function end20(){F.stub=1;await fade(1,700);
  endScreen({title:'some_other_time_2',text:'stub20_end',based:'stub20_based_on_acts_24_1_27',go:'click_to_continue_to_chapter_twenty_one',
             code:['chapter_twenty_one_code_code',codeOf(21,0)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(21)};await new Promise(()=>{})}

/* ============ ROOMS ============ */
ROOMS.stub20={space:.8,walk:[30,300,114,138],mood:'stub20',amb:AMB.stub20,hs:[
  /* STUB: the hidden treasure's place (TSTEPS[20] in the harness looks here). The real one: storks over the harbor, seen from window20 in
     the eighth season when nothing is owed; it calls treasure() and changes nothing else. */
  {name:'stub20_window',x:58,y:28,w:56,h:46,wx:86,wy:118,look:async()=>{await say(P,'stub20_window_look',TH);treasure()}},
  {name:'stub20_door',x:266,y:36,w:38,h:70,wx:280,wy:120,def:'use',look:'stub20_door_look',use:()=>end20(),open:()=>end20()}]};

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub20_task',if:()=>!F.stub}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
function place20(room){P.seat=P.ges=P.kneel=P.bound=P.chained=P.held=0;if(AU.score!==MUSIC)setScore(MUSIC)}
function setup20(){P.hs=null;P.called='Paul';G.invs={paul:['tablets']};G.inv=G.invs.paul;drawInv()}
function hint20(){return['stub20',['stub20_hint_1','stub20_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['stub20'],setup:setup20,start:start20,hint:hint20,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told */
  told:TOLD,
  flags:FLAGS,
  /* STUB: one room and one flag today; the code keeps room for sixteen rooms and forty flags. Paul is played alone. */
  codeBits:{flags:40,rooms:4},ent:ENT,home:{},away:()=>false,inv:()=>['tablets'],place:place20}
});
