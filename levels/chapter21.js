/* Paul of Tarsus, Chapter Twenty-One: To Caesar (Acts 25:1-26:32).
   STUB: this whole file is a placeholder made by the scaffolding (branch c20-scaffold), so that the manifest, the hand-overs, the harness and
   the docs could be built before the chapter. It has one plain room, Paul in it, a line told, a gate where the hidden treasure will be
   found, and a door that ends the chapter. The logic agent replaces all of it, header first: the episode, what Acts leaves unsaid, who is
   invented, the puzzles and why each has one solution, and the rooms (court21, write21, report21, hall21; the travel map; the Prologue's
   road; see the build brief). The governor's clerk is played too: add him to the definition as party:['paul', <his id>] with swap:false,
   as Chapter Nineteen does for the nephew. Nothing marked STUB may survive. Its keys all begin with stub21_, so the text check names any
   that are left in lang/ once the code that used them is gone. What is real already, and stays: the chapter's line in CHAP (index.html,
   marker LOGIC21), the hand-over from Chapter Twenty (levels/chapter20.js, end20), the end screen that returns to the title (end21 below:
   its go key and location.reload(), until Chapter Twenty-Two exists), and codeBits. */
LEVEL(21,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* STUB: a few notes of a lyre, so that the chapter has a score. The real score is in a key and a bar no earlier chapter has (survey G), grows
   out of Chapter Twenty's, and has a tense mood that moves (CONTRIBUTING section 4). */
const MUSIC={dt:.2,root:48,scale:[0,2,4,5,7,9,10],bars:4,tracks:[
  {inst:'lyre',moods:['stub21'],oct:12,loop:2,lines:[[[0,0,4],[4,2,4],[8,4,8]],[[0,3,4],[4,1,4],[8,0,8]]],vol:.4}]};
const AMB={stub21:{waves:.3,wind:.1,crowd:.05}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART stub21: begin ==== */
/* STUB: one plain room, a limewashed wall over paving, an opening to the court (where the treasure will be) and a door at the right. Soft
   light under a roof, so no cast shadow (amb only). */
ART.stub21={w:320,q:12,paint(g){const r=rng(2121);
    plaster(g,0,0,320,104,'#d8ccb0',r,{patch:0,cracks:0,t:.3});
    R(g,60,30,52,40,'#6a8aa8');R(g,60,30,52,20,'#9ab4c8');R(g,58,70,56,3,'#b8a488');
    R(g,268,38,34,66,'#5a4430');R(g,270,40,30,64,'#6e5438');
    pave(g,0,104,320,144,'#b09c7c',r)},
  light:{amb:'#f0dcc4',wallY:104},draw(){},front(){}};
/* ==== ART stub21: end ==== */

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* STUB: TOLD comes from SP/ch21/told.md (the lead's paraphrases, English and German), key for key and word for word. */
const TOLD={stub_open:'stub21_told_opening'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TH={thought:1,color:'#cfe2ff'};
const FLAGS=['stub'];   /* STUB: the real flags (append only once written) */

/* ============ THE STORY ============ */
const ENT={stub21:[150,126,1]};
function show21(room){place21(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);codeBtn()}
async function start21(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(21);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    show21('stub21');await fade(0,600);await tell('stub_open');codeBtn()},true)}
/* the end screen: back to the title, until Chapter Twenty-Two exists (real, as Chapter Nineteen's did); its title is real, its text and based
   lines are STUB keys, which the chapter's own end screen keys replace */
async function end21(){F.stub=1;await fade(1,700);
  endScreen({title:'to_caesar_2',text:'stub21_end',based:'stub21_based_on_acts_25_1_26_32',go:'click_to_return_to_the_title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}

/* ============ ROOMS ============ */
ROOMS.stub21={space:.8,walk:[30,300,114,138],mood:'stub21',amb:AMB.stub21,hs:[
  /* STUB: the hidden treasure's place (TSTEPS[21] in the harness looks here). The real one: a carter's ox goad by the palace gate at the side
     of court21, reachable later too; looking at it tells what it is, calls treasure() and changes nothing else. */
  {name:'stub21_opening',x:58,y:28,w:56,h:46,wx:86,wy:118,look:async()=>{await say(P,'stub21_opening_look',TH);treasure()}},
  {name:'stub21_door',x:266,y:36,w:38,h:70,wx:280,wy:120,def:'use',look:'stub21_door_look',use:()=>end21(),open:()=>end21()}]};

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub21_task',if:()=>!F.stub}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
function place21(room){P.seat=P.ges=P.kneel=P.bound=P.chained=P.held=0;if(AU.score!==MUSIC)setScore(MUSIC)}
function setup21(){P.hs=null;P.called='Paul';G.invs={paul:['tablets']};G.inv=G.invs.paul;drawInv()}
function hint21(){return['stub21',['stub21_hint_1','stub21_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['stub21'],setup:setup21,start:start21,hint:hint21,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told */
  told:TOLD,
  flags:FLAGS,
  /* STUB: one room and one flag today; the code keeps room for sixteen rooms and forty flags. Paul is played alone. */
  codeBits:{flags:40,rooms:4},ent:ENT,home:{},away:()=>false,inv:()=>['tablets'],place:place21}
});
