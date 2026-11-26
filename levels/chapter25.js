/* Paul of Tarsus, Chapter Twenty-Five: Without Hindrance (Acts 28:17-31; Philippians, Colossians, Ephesians, Philemon). The last chapter.
   STUB: this whole file is a placeholder made by the scaffolding (branch r-scaffold), so that the manifest, the hand-over from Chapter
   Twenty-Four with the lodging carried, the way into the finale, the harness and the text files could be built before the chapter. It has
   the one room, the lodging (SHARED.lodging, in the variant of the lodging carried in), Paul chained by one wrist to a soldier of the
   watch, the opening line told from the narrator's scroll, a roll on the table where the hidden treasure will be found, and the door: the
   last watch, without the watches before it. The chapter agent replaces the rest, header first: the episode, what the account and the
   letters leave unsaid, who is invented, the watches and their puzzles and why each has one solution, and the rooms (lodging25, sheet25,
   letters25, and the travel map's windows lycus and letters; see the build brief). Nothing marked STUB may survive. Its own keys all begin
   with stub25_, so the text check names any that are left in lang/ once the code that used them is gone.
   What is real already, and stays:
   - the chapter's line in CHAP (index.html, marker LOGIC25, with carry:2 and done), and codeBits;
   - the first two FLAGS, from24 and street, in this order (carried in from Chapter Twenty-Four: never reorder them), and the last,
     finished, which stays last (the chapter's own flags go between them, and CHAP[25].done moves with finished). The level never sets
     finished. A game started from the title, or from the plain first code, has neither from24 nor street: it is played in the flat;
   - the room lodging25 painted by SHARED.lodging, its variant read from the flag street and the hour of the watch (G.hour25);
   - the tables of the lead's lines (TOLD, SPOKEN25, WRITTEN25, CALLED25: every key and text of SP/ch25/told.md is in lang/en and lang/de
     now, verbatim, but the five passages of Chapters Five and Ten that the day of 28:23 uses, which the chapter chooses and copies);
   - the last watch's end (door25, toFinale): at the last safe point (codeBtn) the door is opened, Paul says come_in_the_chain_is_on_me,
     the narrator tells everyone_who_came_was_welcome_acts_28_30_31, and toFinale() hands over to the finale. No flag is set between that
     safe point and the call, and there is no end screen;
   - about: the keys of the page about the chapter, behind the closing screen (the lead's text). */
LEVEL(25,()=>{
"use strict";
const LG=SHARED.lodging;

/* ==== MUSIC: begin ==== */
/* STUB, TODO: a few notes of a lyre in A-flat mixolydian and bars of seventeen steps (a key and a bar no earlier chapter has), so that the
   chapter has a score. The real score is in a key and a bar of its own, with no tense mood, and its tune comes home in the last watch (a
   mood of its own for that). */
const MUSIC={dt:.19,steps:17,group:[4,4,4,5],root:44,scale:[0,2,4,5,7,9,10],bars:4,tracks:[
  {inst:'lyre',moods:['stub25'],oct:12,loop:2,lines:[[[0,0,4],[4,2,4],[8,4,4],[12,7,5]],[[0,5,4],[4,4,4],[8,2,4],[12,0,5]]],vol:.4}]};
const AMB={lodging25:{}};   /* STUB */
/* ==== MUSIC: end ==== */

/* ==== ART lodging25: begin ==== */
/* The lodging (shared/lodging.js, whose header describes both variants and the six hours): the flat on the second floor, or the room at
   street level when the flag street is set; the hour of the watch is G.hour25 (STUB: the stub has only the morning of the last watch,
   'early'). Its light is the hour's (sun through the window, or at night the lamp in its niche), its props the table and the stools,
   its footprints the room's own things (ROOMS.lodging25.block). The chain between Paul and the soldier is drawn in the room's draw. */
const kind25=()=>F.street?'street':'flat';
const hour25=()=>G.hour25||'early';
const MOT25={};
ART.lodging25={w:320,q:12,variant:()=>kind25()+'_'+hour25(),paint(g,v){const[k,h]=(v||'flat_early').split('_');LG.room(g,{kind:k,hour:h})},
  light:()=>LG.light(kind25(),hour25()),
  draw(g,t){const v=kind25()+'_'+hour25();(MOT25[v]||(MOT25[v]=LG.motion({kind:kind25(),hour:hour25()}))).draw(g,t);chains25(g)},front(){},
  props:LG.props()};
/* ==== ART lodging25: end ==== */

/* ============ PEOPLE ============ */
/* STUB: one soldier of the watch, unnamed. The chapter has four or five, each with a name and a care of his own, in tunic and cloak with
   belt, sandals and a sword without a guard (the praetorian looks of shared/cast.js, ROMAN.praetorian_watch and its kin). */
Object.assign(LOOK,{soldier25:Object.assign({},SHARED.cast.ROMAN.praetorian_watch)});
const SO=actor('soldier25','soldier','#e4d2c0',96);

/* ============ WHAT THE ACCOUNT AND THE LETTERS SAY ============ */
/* The lead's lines (SP/ch25/told.md), key for key; their English and German stand in lang/ word for word.
   TOLD: the narration, told by the narrator (tell), each with its reference (isaiah and tychicus run on into the next line). */
const TOLD={n17:'three_days_later_acts_28_17',n23a:'a_day_was_set_acts_28_23',n23b:'from_morning_to_evening_acts_28_23',
  n24:'some_believed_and_others_did_not_acts_28_24',n25:'they_left_disagreeing_acts_28_25',isaiah:'what_the_holy_spirit_said_through_isaiah',
  n27:'their_heart_had_grown_unreceptive_acts_28_25_27',n28:'this_salvation_went_to_the_nations_acts_28_28',
  gift:'the_gift_from_philippi_philippians_4_18',child:'paul_called_onesimus_his_child_philemon_10_11',
  tychicus:'tychicus_would_tell_them_all',onesimus:'onesimus_came_with_him_colossians_4_7_9',ephesus:'the_same_for_ephesus_ephesians_6_21_22',
  n3031:'everyone_who_came_was_welcome_acts_28_30_31'};
/* SPOKEN25: the spoken lines of the account (Acts 28:17-22: Paul's five points in the account's order, the leading men's answer), no
   reference on the line; and Paul's last line, as he opens the door */
const SPOKEN25={points:['men_brothers_i_have_done_nothing_against_our_people','all_the_same_i_am_a_prisoner','the_romans_wanted_to_let_me_go',
    'i_had_no_choice_but_to_appeal_to_caesar','for_the_hope_of_israel_this_chain_is_on_me'],
  answer:['no_letter_about_you_has_reached_us','we_think_it_right_to_hear_you'],door:'come_in_the_chain_is_on_me'};
/* WRITTEN25: what stands in the letters, each line with its reference */
const WRITTEN25={philippians:['i_am_sending_you_epaphroditus_philippians_2_25','he_longs_to_see_you_all_philippians_2_26_27',
    'so_he_comes_as_quickly_as_can_be_philippians_2_28_29'],household:'greetings_from_the_household_of_caesar_philippians_4_22',
  philemon:['i_appeal_to_you_instead_philemon_8_9','nothing_without_your_consent_philemon_14','give_him_the_welcome_you_would_give_me_philemon_17',
    'put_it_on_my_account_philemon_18_19'],heart:'he_is_my_own_heart_philemon_12',ready:'get_a_place_ready_for_me_philemon_22',
  colossians:['greetings_from_aristarchus_colossians_4_10','so_does_mark_welcome_him_colossians_4_10','and_jesus_called_justus_colossians_4_11',
    'epaphras_greets_you_colossians_4_12','greetings_from_luke_and_demas_colossians_4_14'],hand:'this_greeting_in_my_own_hand_colossians_4_18'};
/* CALLED25: what the letter calls each man (the choices of "Those who greet you"; the letters' own terms, no reference) */
const CALLED25=['my_fellow_captive','the_cousin_of_barnabas','the_one_called_justus','one_of_you_a_slave_of_christ_jesus','the_beloved_physician',
  'no_more_than_his_name'];
const tell=(k,ms,o)=>narr(TOLD[k],Object.assign({dur:ms||Math.max(6500,2200+T(TOLD[k]).length*55)},o||{}));
const TP={thought:1,color:'#cfe2ff'};   /* Paul's thoughts */

/* ============ THE CHAIN ============ */
/* One light chain from Paul's wrist to the soldier's (shared/cast.js, custody 'one'). STUB: the soldier stands beside Paul, on his right;
   the chapter seats him at the door, the table or the window (SHARED.lodging's AT.seats), chains Paul's right wrist to his left, gives the
   chain its length (a walk getter round the soldier), and lays a longer chain in loops on the floor. */
function chain25(){SHARED.cast.custody.place('one',P,null,SO)}
function chains25(g){if(P.chained&&P.room===G.room&&SO.room===G.room)SHARED.cast.custody.chains(g,P,null,SO)}

/* ============ THE FLAGS ============ */
/* from24 and street come first and stay first (carried in from Chapter Twenty-Four, CHAP[25].carry); finished stays last (CHAP[25].done),
   and nothing in this file sets it. STUB: the chapter's own flags go between them, appended in order once written. */
const FLAGS=['from24','street','finished'];

/* ============ THE STORY ============ */
const ENT={lodging25:[206,126,1]};
function show25(room){place25(room);const e=ENT[room];enterRoom(room,e[0],e[1],e[2]);drawInv();codeBtn()}
async function start25(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(25);G.end={};G.scene=null;setScore(MUSIC);drawInv();
    /* 28:17, from the narrator's scroll; then (STUB) at once the morning of the last watch */
    G.scene=DARK;await tell('n17');G.scene=null;
    show25('lodging25');await fade(0,600);await say(P,'stub25_the_last_watch',TP);codeBtn()},true)}
/* the last watch: the door. Its morning is the chapter's last safe point (codeBtn in show25 and start25 above): from there to the
   finale nothing sets a flag. STUB: the chapter's last watch has its new soldier, the knock, the stool moved so that the chain reaches
   the door, and a visitor who comes in while another is on the stairs. */
async function door25(){if(G.door25)return;G.door25=1;
  await say(P,'come_in_the_chain_is_on_me',{to:null});
  await tell('n3031');
  return toFinale()}
/* toFinale: the one way out of the chapter, into the finale (shared/finale.js, built on the finale's branch): its run() takes over from
   the open door to the closing screen. Until that file is merged need('finale') finds nothing, and the chapter returns to the title after
   a click, so that it can be tested alone. */
async function toFinale(){let fin=null;try{fin=await need('finale')}catch(e){fin=null}
  if(fin&&fin.run)return fin.run();
  await fade(1,700);overlay('on end',()=>{ov.innerHTML='<p class="go">'+esc(T('click_to_return_to_the_title'))+'</p>'});
  await wait(1500);ov.onclick=()=>location.reload();await new Promise(()=>{})}

/* ============ ROOMS ============ */
/* wx, wy: acted on where Paul stands, with no step (chained, he stands still: the walk is a point where he stands) */
const atP=o=>Object.defineProperties(o,{wx:{get(){return P.x},enumerable:true},wy:{get(){return P.y},enumerable:true}});
ROOMS.lodging25={space:.8,get walk(){return P.chained&&P.room==='lodging25'?[P.x,P.x,P.y,P.y]:LG.WALK},block:LG.foot(),mood:'stub25',amb:AMB.lodging25,hs:[
  /* STUB: the hidden treasure's place (TSTEPS[25] in the harness looks here). The real one: Luke's roll, a hotspot of its own apart from
     Luke, in the watch where he sits writing; looking at it, he reads out what he has just set down (the first line the game's narrator
     ever told, by its own key); it calls treasure() and changes nothing else. */
  atP({name:'stub25_roll',x:112,y:94,w:40,h:10,look:async()=>{await say(P,'stub25_roll_look',TP);treasure()}}),
  atP({name:'door',x:236,y:38,w:66,h:60,def:'open',look:'stub25_door_look',open:()=>door25(),use:()=>door25()})]};
SO.hs={name:'soldier',actor:SO,look:'stub25_soldier_look',talk:()=>say(SO,'stub25_soldier_says',{to:P})};

/* ============ WAX TABLETS ============ */
const TABLETS={people:[],tasks:[{t:'stub25_task',if:()=>true}],scripture:[]};   /* STUB */

/* ============ PLACING THE CAST, SETUP, PRAYER ============ */
function place25(room){for(const a of[P,SO]){a.seat=a.ges=a.kneel=a.bound=a.chained=a.held=a.keeper=a.chainTo=0;a.room=null;a.noTurn=0}
  if(AU.score!==MUSIC)setScore(MUSIC);
  /* Paul where he stands, and the soldier chained to him beside him (here, and not only in show25: a code restored is placed by this) */
  if(room==='lodging25'){place(P,room,...ENT.lodging25);chain25()}}
function setup25(){P.hs=null;P.called='Paul';G.hour25='early';G.door25=0;G.invs={paul:['tablets']};G.inv=G.invs.paul;drawInv()}
function hint25(){return['stub25',['stub25_hint_1','stub25_hint_2']]}   /* STUB: two per point, the second worded as a person speaks */

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['lodging25'],setup:setup25,start:start25,hint:hint25,music:MUSIC,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, said and written, the door, the way to the finale */
  told:TOLD,spoken:SPOKEN25,written:WRITTEN25,called:CALLED25,door:door25,toFinale,
  /* the generic stops (routes25, shadows25) look at the room in each of its variants: each entry sets the flags for one */
  views:{lodging25:{flat:()=>{F.street=0},street:()=>{F.street=1}}},
  /* the page about the chapter, behind the closing screen (the lead's keys; their text is a STUB in lang/ until he writes it) */
  about:{title:'without_hindrance_2',text:'without_hindrance_about',based:'based_on_acts_28_17_31'},
  flags:FLAGS,
  /* STUB: one room and three flags today; the code keeps room for sixteen rooms and forty flags. Paul alone is played. */
  codeBits:{flags:40,rooms:4},ent:ENT,home:{},away:()=>false,inv:()=>['tablets'],place:place25}
});
