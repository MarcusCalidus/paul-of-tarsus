/* Paul of Tarsus, Chapter Twenty-Three: All Safe to Land (Acts 27:27-28:10).
   STUB: this whole file is a placeholder made by the scaffolding (branch sea-scaffold), so that the manifest, the hand-over from Chapter
   Twenty-Two with the tablet carried, the harness and the docs could be built before the chapter. It has one plain room on a beach, Paul and
   Luke in it, a line told, a line of Luke's that says what his tablet holds (carried, or only the strokes of the days), a stone where the
   hidden treasure will be found, and a path that ends the chapter. The chapter agent replaces all of it, header first: the episode, what
   Acts leaves unsaid, who is invented, who is played, the puzzles and why each has one solution, and the rooms (stern23, lead23, bow23,
   hold23, bay23, wreck23, planks23, surf23, beach23, estate23, sick23, tablet23; see the build brief). Nothing marked STUB may survive. Its
   keys all begin with stub23_, so the text check names any that are left in lang/ once the code that used them is gone.
   What is real already, and stays: the chapter's line in CHAP (index.html, marker LOGIC23, with carry:13), the hand-over from Chapter
   Twenty-Two (levels/chapter22.js, end22: the code and the click that carry the tablet), party:['paul','luke23'] with swap:false, codeBits,
   the first thirteen FLAGS (from22, then m1a, m1b ... m6b, in this order: never reorder them), markOf, and the end screen that returns to the
   title (end23 below: its go key and location.reload(), until Chapter Twenty-Four exists).
   The carry (CONTRIBUTING section 5): the end screen's click starts this chapter with those flags set (startChapter(23,bits)), and its
   printed code restores them. A start from the title has from22 unset and every mark 0: the tablet has only the strokes of the days. A code
   at the chapter's start skips start(), as for every chapter: the opening must not depend on it. */
LEVEL(23,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* STUB, TODO: a few notes of a lyre, so that the chapter has a score. The real score is in a key and a bar no earlier chapter has (the
   survey's section 8 lists what is taken), and its tension moves and is never a held drone (CONTRIBUTING section 4). */
const MUSIC={dt:.2,root:52,scale:[0,2,4,5,7,9,11],bars:4,tracks:[
  {inst:'lyre',moods:['stub23'],oct:12,loop:2,lines:[[[0,0,4],[4,4,4],[8,2,8]],[[0,1,4],[4,3,4],[8,0,8]]],vol:.4}]};
const AMB={stub23:{waves:.4,wind:.2}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART stub23: begin ==== */
/* STUB: one plain picture, a grey sky over the sea and a sandy beach, a low stone at the left and the foot of a path at the right. No
   post, no mast and no line across the horizon. Grey daylight under cloud, so no cast shadow (amb only). */
ART.stub23={w:320,q:12,paint(g){const r=rng(2323);
    R(g,0,0,320,58,'#a8b0b8');R(g,0,38,320,20,'#b8bec4');
    R(g,0,58,320,28,'#506a78');R(g,0,58,320,2,'#6a8290');
    R(g,0,86,320,58,'#c8b48c');for(let y=92;y<144;y+=9)R(g,0,y,320,2,'#bca880');
    R(g,26,92,40,12,'#8a8478');R(g,28,90,36,4,'#a09a8e');
    R(g,272,84,40,22,'#a89670')},
  light:{amb:'#e0e2e4',wallY:100},draw(){},front(){}};
/* ==== ART stub23: end ==== */

/* ============ PEOPLE ============ */
Object.assign(LOOK,{luke23:Object.assign({},SHARED.cast.CAESAREA.luke)});
const LK=actor('luke23','Luke','#d0e8e0',112);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* STUB: TOLD comes from SP/ch23/told.md (the lead's paraphrases, English and German), key for key and word for word. */
const TOLD={stub_open:'stub23_told_opening'};
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TH={thought:1,color:'#cfe2ff'};

/* ============ THE CARRIED TABLET ============ */
/* The first thirteen flags are carried in from Chapter Twenty-Two (CHAP[23].carry): from22, then the six marks of Luke's tablet, two bits
   each, a the low bit: 0 only the day, 1 south-west, 2 west, 3 north-west. They come first and stay first. */
const MARKS=[1,2,3,4,5,6].flatMap(n=>['m'+n+'a','m'+n+'b']);
const markOf=n=>(F['m'+n+'a']?1:0)|(F['m'+n+'b']?2:0);
const FLAGS=['from22'].concat(MARKS,['stub']);   /* STUB: after the thirteen, the chapter's own flags (append only once written) */
/* STUB: what Luke says of his tablet; the chapter's own line says what most of the marks would mean */
async function tablet23(){const n=[1,2,3,4,5,6].filter(i=>markOf(i)).length;
  await say(LK,F.from22?T('stub23_tablet_carried',{n}):'stub23_tablet_only_the_days',TH)}

/* ============ THE STORY ============ */
const ENT={stub23:[150,126,1]};
function show23(room){place23(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);codeBtn()}
async function start23(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(23);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    show23('stub23');await fade(0,600);await tell('stub_open');await tablet23();codeBtn()},true)}
/* the end screen: back to the title, until Chapter Twenty-Four exists (real); its text and based lines are STUB keys */
async function end23(){F.stub=1;await fade(1,700);
  endScreen({title:'all_safe_to_land_2',text:'stub23_end',based:'stub23_based_on_acts_27_27_28_10',go:'click_to_return_to_the_title'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}

/* ============ ROOMS ============ */
ROOMS.stub23={space:.8,walk:[30,300,114,138],mood:'stub23',amb:AMB.stub23,hs:[
  /* STUB: the hidden treasure's place (TSTEPS[23] in the harness looks here). The real one: the stone at the gate of Publius's estate with
     his title in Greek letters, which Luke copies; looking at it calls treasure() and changes nothing else. */
  {name:'stub23_stone',x:24,y:88,w:44,h:18,wx:60,wy:118,look:async()=>{await say(PC(),'stub23_stone_look',TH);treasure()}},
  {name:'stub23_path',x:270,y:82,w:44,h:26,wx:284,wy:120,def:'use',look:'stub23_path_look',use:()=>end23(),open:()=>end23()}]};
who(LK,{look:'stub23_luke_look',talk:()=>tablet23()});
function who(a,o){a.hs=Object.assign({name:a.name,actor:a},o)}

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub23_task',if:()=>!F.stub}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
function place23(room){for(const a of[P,LK]){a.seat=a.ges=a.kneel=a.bound=a.chained=a.held=0;a.room=null}if(AU.score!==MUSIC)setScore(MUSIC);
  place(LK,room,96,122,1);G.pc=P;G.inv=G.invs.paul}
function setup23(){P.hs=null;P.called='Paul';G.invs={paul:['tablets'],luke23:[]};G.inv=G.invs.paul;drawInv()}
function hint23(){return['stub23',['stub23_hint_1','stub23_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['stub23'],setup:setup23,start:start23,hint:hint23,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, and the carried marks */
  told:TOLD,marks:MARKS,markOf,
  flags:FLAGS,
  /* STUB: one room and fourteen flags today (the first thirteen carried); the code keeps room for sixteen rooms and fifty-six flags */
  codeBits:{flags:56,rooms:4},party:['paul','luke23'],swap:false,ent:ENT,home:{},away:()=>false,inv:()=>['tablets'],place:place23}
});
