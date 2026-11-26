/* Paul of Tarsus: the finale, the end of the whole game (issue #95). Loaded on demand (see need() in index.html), and kept for offline
   play by shared/pwa.js.

   The game ends where Acts ends: inside the two years in Rome, with the door open (Acts 28:30, 31). The last chapter plays its last scene
   in the room and then hands over here with one call, in place of an end screen:

     run(o)    everything after the open door (o.mood: the mood of the chapter's score for it), in this order:
               1. the map on which Paul does not move: Rome, and Philippi, Ephesus and Colossae lighting up, where the letters written in
                  that room went, while Philippians 1:12-14 is told. No road is drawn: no source gives one.
               2. the narrator's roll: the last line of Luke's account, and then the hands close the roll (shared/scroll.js).
               2a. after Acts (o.after, the level's): the caption "After Acts", then one morning that is played, the morning of
                  Paul's release, which the publications give with "apparently", about 61 C.E. (the Study Edition's note on Acts
                  28:30). The level plays it in its own rooms and resolves when it is over, in the dark (Chapter Twenty-Five's after25).
               2b. the map of the places that Paul's later letters name: Crete, Ephesus with Macedonia beyond, Nicopolis, Troas and
                  Miletus, and Spain, faint at the edge of the map, as a perhaps (Titus 1:5; 1 Timothy 1:3; Titus 3:12; 2 Timothy 4:13,
                  20; Romans 15:24, 28); no road is drawn, for no source gives their order. Then the narrator's last line of the game.
               3. the look back: every journey of the game, map by map from Damascus to Rome (shared/lookback.js), one narrated line for
                  each map, and as each chapter's road is drawn its name in the status line and one bar of its own tune (shared/tunes.js).
               4. the bench by day (shared/splash.js) with the closing screen over it, to the theme of Chapter One as the overture plays it.
               As the closing screen comes, the game is kept as finished: the chapter's last safe point with one more flag set, as a
               safe-point code like any other (see THE END OF THE GAME in index.html). So the chapter calls run() at that safe point.
     again()   the title's line "From Damascus to Rome", for a game that has been finished: the look back and the closing screen once more.

   The release is played as one ordinary morning (decided by the maintainer on 26 November 2026): no court, no emperor and no verdict
   is seen, and the narrator says it with the publications' "apparently". The second imprisonment and Paul's death are not in the game.

   Skipping. A click, Space or Esc passes over what is playing: a narrated line, the roll being closed, or the whole look back. SKIP in the
   top bar passes over everything that is shown and not played: up to the morning after Acts, which is played, and after it up to the
   closing screen. The title shows the look back and the closing screen again.

   The last chapter says what it has to say about itself (what is invented, what the account leaves unsaid) on a page behind the closing
   screen, reached by one line on it, and has no "Chapter complete" screen of its own (CONTRIBUTING section 2). Its level gives that page as
   about:{title, text, based}, keys of its own text, in what it returns. */
SHARED.finale=(()=>{
"use strict";
/* RUN: all, SKIP was pressed and everything up to the closing screen is passed over; cut, a click passed over the part that is playing
   (the look back, the roll being closed); wake, those who wait and are to go on at once in either case */
const RUN={all:false,cut:false,wake:[],room:null};
const quick=()=>G.speedAll>200,over=()=>RUN.all||RUN.cut;
const ms=n=>RUN.all||quick()?Math.min(n,40):n;
const wakeAll=()=>{const w=RUN.wake;RUN.wake=[];w.forEach(f=>f())};
/* pause: wait, or go on at once when the part is passed over */
const pause=n=>over()?Promise.resolve():new Promise(res=>{let t;const go=()=>{clearTimeout(t);res()};t=setTimeout(go,ms(n));RUN.wake.push(go)});
/* until: a promise, or the moment the part is passed over, whichever comes first */
const until=p=>over()?Promise.resolve():Promise.race([p,new Promise(res=>RUN.wake.push(res))]);
/* cut: what a click does while a part plays that is passed over whole */
const cut=()=>{RUN.cut=true;wakeAll()};
/* tell: a narrated line, unless everything is being passed over; a click ends the line, as everywhere */
const tell=(k,o)=>RUN.all?Promise.resolve():narr(k,Object.assign({dur:Math.max(6500,2200+T(k).length*58)},o||{}));
/* kick: a score that has just been set begins now, not at the sequencer's next look (as the overture does on the title) */
const kick=()=>{const c=AU.ctx;if(c&&c.state==='running'){AU.next=c.currentTime+.03;sched()}};
function begin(){RUN.all=RUN.cut=false;RUN.wake=[];G.busy=true;lock(true);G.cap=null;G.hover=null;status();ov.onclick=null;ov.className='';ov.innerHTML='';
  $('#code').textContent=T('enter_code');   /* no point is kept while it plays, and SKIP needs the room in the top bar */
  $('#skip').style.display='';G.onSkip=()=>{if(RUN.all)return;RUN.all=true;wakeAll();if(G.skip)G.skip()}}
function end(){G.onSkip=null;$('#skip').style.display='none';G.cap=null;status();RUN.wake=[]}

/* ---------- 1. the map on which Paul does not move ---------- */
/* Where the letters of those two years went: Philippians to Philippi; Ephesians to Ephesus; Colossians and the letter to Philemon to
   Colossae. Each place lights up by itself; Paul's light stays on Rome. Then what he wrote to the Philippians about his bonds is told
   (Philippians 1:12-14), at the foot of the map, clear of the names. */
const LETTERS=['philippi','ephesus','colossae'],
  PHIL=['paul_wrote_that_his_situation_helped_the_good_news','the_whole_guard_knew_why_he_was_in_bonds','his_bonds_gave_most_brothers_confidence_philippians_1_12_14'];
async function letters(){if(RUN.all)return;const M=await need('map');
  await fade(1,ms(700));
  await M.journey([],{view:'letters',seen:['rome'],pulse:'rome',instant:1,music:1});
  await fade(0,ms(900));await pause(1100);
  for(const id of LETTERS){if(RUN.all)return;M.light(id);M.arrive();await pause(1000)}
  M.state.pulse='rome';await pause(700);
  for(const k of PHIL)await tell(k,{low:1})}

/* ---------- 2. the narrator's roll, and the hands that close it ---------- */
/* The one time anything but the flames moves in that picture (CONTRIBUTING section 4): after the game's last line the reader's hands
   roll both ends in to the middle, and the closed roll is held between the two lamps (SHARED.scroll.close). */
async function roll(){if(RUN.all)return;
  await fade(1,ms(800));   /* in the dark the narrator's line is read from the roll (say) */
  await tell('here_the_account_ends',{dur:9000});
  const S=SHARED.scroll;if(!S||RUN.all||!S.close)return;
  await S.up();RUN.cut=false;G.skip=cut;G.lineT=performance.now();   /* up: the roll stays, though its line has ended */
  await pause(500);await until(S.close());await pause(1300);
  /* passed over: the roll is gone at once (off also stops the closing and shows the roll open the next time) */
  if(G.skip===cut)G.skip=null;if(over()){S.off();RUN.cut=false;return}
  await S.down();S.open()}

/* ---------- 3. the look back ---------- */
/* POS: where each map's line stands, clear of the places on that map's roads (the stop finale checks it in every language): at the top
   of the map unless low, and at x across it with a width w, in room pixels, where the roads leave a side of the map free */
const POS={syria:{x:100,w:170},cyprus:{low:1,x:62,w:116},derbe:{low:1,x:62,w:116},macedonia:{low:1,x:150,w:150},home:{low:1,x:90,w:150},ephesus:{low:1,x:150,w:150},
  miletus:{x:58,w:104},jerusalem:{low:1,x:84,w:150},crete:{low:1,x:112,w:190},malta:{low:1},rome:{low:1,x:222,w:170}};
const capOf=ch=>ch==='pro'?T('Prologue')+' · '+T(PRO.title):CHAP[ch]?T(CHAP[ch].label)+' · '+T(CHAP[ch].title):'';
async function lookBack(){if(RUN.all)return;const[M,L,TU]=await Promise.all([need('map'),need('lookback'),need('tunes')]);RUN.cut=false;
  for(let i=0;i<L.JOURNEYS.length&&!over();i++){const J=L.JOURNEYS[i];if(!L.ready(i))continue;
    await fade(1,ms(450));G.cap=null;status();if(over())break;
    await L.show(i,-1);await fade(0,ms(550));if(over())break;
    /* the map's line stands for as long as the map does; a click passes over the look back, not only the line */
    const t0=performance.now(),read=Math.max(4200,1800+T(J.line).length*62)*OPTS.spd;
    narr(J.line,Object.assign({dur:6e5},POS[J.id]));const endLine=G.skip;G.skip=cut;
    await pause(600);
    for(const p of J.parts){if(over())break;
      G.cap=capOf(p.ch);status();for(const k of p.seen||[])M.light(k);
      const bar=TU.has(p.ch),len=bar?TU.len(p.ch)*1000:2400;
      if(bar){setScore(TU.score(p.ch,null,{even:1}));kick()}
      if(p.legs.length)await M.trace(p.legs,quick()?20:len,{dots:L.dots,stop:over});else{M.light(p.at);await pause(len)}
      M.light(p.at);await pause(500)}
    await pause(Math.max(900,read-(performance.now()-t0)));
    if(G.skip===cut)G.skip=null;if(endLine)endLine()}
  G.cap=null;status();RUN.cut=false}

/* ---------- 4. the bench by day, and the closing screen ---------- */
/* last: the chapter that ends the game (the one whose line of the manifest has done) */
const last=()=>Object.keys(CHAP).map(Number).filter(n=>CHAP[n].done!=null).pop();
/* inPart: text of another part than the chapter being played (the last chapter's own lines, on the page behind the closing screen,
   when it is opened from the title) */
const inPart=(n,fn)=>{const was=G.ch;G.ch=n;try{return fn()}finally{G.ch=was}};
/* keep: the game is finished. The flag is set and the point is kept, as the code that the top bar would show (see index.html). */
/* the point is the chapter's last safe point, in the room where the finale began (RUN.room), not the street of the morning after Acts */
function keep(){const c=CHAP[G.ch],room=RUN.room||G.room;if(c.done==null||!c.flags||!c.flags[c.done]||!room)return null;F[c.flags[c.done]]=1;
  /* a wide code keeps the room each of the party stands in (packWide): Paul, too, is counted at the lodging */
  const was=G.room,pc=PC(),pr=pc.room;G.room=room;pc.room=room;const code=makeCode();G.room=was;pc.room=pr;autosave(code);return code}
async function closing(o){o=o||{};const[sp,logo]=await Promise.all([need('splash').catch(e=>{console.error(e);return null}),need('logo').catch(()=>null)]);
  const S=SHARED.scroll;if(S&&S.state!=='down')await S.down();
  await fade(1,ms(800));end();if(o.keep)keep();
  const n=last(),about=n&&CHAP[n].ready&&CHAP[n].about?{n,...CHAP[n].about}:null;
  G.scene=sp&&sp.day?sp.day:sp?sp.scene:DARK;G.end={};AU.amb={birds:.3};AU.mood='calm';codeBtn();let shown=false;
  /* the theme of Chapter One, as the overture played it; after it, quiet */
  if(sp){sp.score.then={dt:sp.score.dt,steps:16,root:sp.score.root,scale:sp.score.scale,bars:1,tracks:[]};setScore(sp.score);AU.step=0;kick()}else setScore(null);
  const page=()=>overlay('on closing',()=>{const name=T('paul_of_tarsus'),sub=T('on_the_roads_of_rome'),art=logo&&logo.can(name+sub)?logo.paint(name,sub):null,got=treasures().size,all=hidden().length;
      ov.innerHTML=(art?'<h1 class="art"></h1>':'<h1>'+esc(name)+'</h1><h2>'+esc(sub)+'</h2>')+
        '<p class="head">'+esc(T('from_damascus_to_rome'))+'</p><p class="small">'+esc(T('a_prologue_and_twenty_five_chapters'))+'</p>'+
        '<p data-tre="1">'+esc(T('hidden_treasures_n_of_all',{n:got,all}))+(got<all?' &middot; <span class="pick" data-tre="1">'+esc(T('look_for_the_others'))+'</span>':'')+'</p>'+
        '<p class="small">'+esc(T('based_on_acts_and_on_letters_of_paul'))+'</p><p>'+esc(T('acts_ends_here_paul_was_apparently_set_free'))+'</p>'+
        (about?'<p class="pick" data-about="1">'+esc(T('about_the_last_chapter'))+'</p>':'')+
        '<p class="go">'+esc(T('click_to_return_to_the_title'))+'</p>';
      if(art){art.textContent=name+' '+sub;art.setAttribute('role','img');art.setAttribute('aria-label',T('paul_of_tarsus_on_the_roads'));
        art.style.width='calc(var(--s)*'+art.width/HR+'px)';art.style.height='calc(var(--s)*'+art.height/HR+'px)';ov.querySelector('h1').appendChild(art)}
      ov.onclick=e=>{if(!shown)return;const d=(e.target.closest('[data-tre],[data-about]')||{}).dataset||{};
        if(d.tre)return openMenu('treasures');if(d.about){SFX.click();return aboutPage()}ov.onclick=null;SFX.click();title()}}),
    /* the page behind it: what the last chapter says of itself, in an end screen's own style, over the same picture (behind: the view
       keeps the picture's height); a click comes back */
    aboutPage=()=>overlay('on end behind',()=>{inPart(about.n,()=>{ov.innerHTML='<h2>'+esc(T(CHAP[about.n].label))+'</h2><h1 style="font-size:calc(var(--s)*12px)">'+esc(T(about.title))+'</h1>'+
        (about.text?'<p>'+esc(T(about.text))+'</p>':'')+'<p class="small">'+esc(T(about.based))+'</p><p class="go">'+esc(T('click_to_go_back'))+'</p>'});
      const r=ov.getBoundingClientRect(),out=()=>[...ov.children].some(el=>{const q=el.getBoundingClientRect();return q.top<r.top-1||q.bottom>r.bottom+1});
      ov.classList.remove('tight','tighter');if(out()){ov.classList.add('tight');if(out())ov.classList.add('tighter')}
      ov.onclick=()=>{SFX.click();page()}});
  /* the picture comes first, out of the dark; then the words on its wall */
  page();ov.classList.add('wait');await fade(0,quick()?40:1300);await wait(quick()?20:500);ov.classList.remove('wait');shown=true}

/* ---------- 2a. after Acts: the one part that is played ---------- */
/* The caption "After Acts" on the dark, as a chapter's title card stands (a click or about three seconds), painted in the letters of the
   title's logo as a chapter's name is (shared/logo.js), with no subtitle; then the level's morning. While
   it plays, SKIP is gone and the player has the verbs; when it is over the finale takes the screen again. */
async function after(fn){if(!fn)return;const S=SHARED.scroll,logo=await need('logo').catch(()=>null);if(S&&S.state!=='down')await S.down();
  RUN.all=RUN.cut=false;RUN.wake=[];G.onSkip=null;$('#skip').style.display='none';G.cap=null;status();
  await fade(1,ms(500));G.scene=DARK;
  await new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(tm);ov.onclick=null;if(G.skip===fin)G.skip=null;ov.className='';ov.innerHTML='';res()};
    overlay('on card',()=>{const name=T('after_acts'),cap=name.toUpperCase(),art=logo&&logo.can(cap)?logo.paint(cap,''):null;   /* the logo has capitals only, as a chapter's card has its name */ov.innerHTML=art?'<h1 class="art"></h1>':'<h1>'+esc(name)+'</h1>';
      if(art){art.textContent=name;art.setAttribute('role','img');art.setAttribute('aria-label',name);
        art.style.width='calc(var(--s)*'+art.width/HR+'px)';art.style.height='calc(var(--s)*'+art.height/HR+'px)';ov.querySelector('h1').appendChild(art)}});if(AU.ctx)cardSting();
    const tm=setTimeout(fin,quick()?400:3000);ov.onclick=fin;G.skip=fin;G.lineT=performance.now()});
  try{await fn()}catch(e){console.error(e)}
  begin()}

/* ---------- 2b. the places of the later letters ---------- */
/* The letters window again (its labels: later), Rome lit where Paul was set free; each place lights as its line is told. MACEDONIA is
   written on that window already. Spain is the faint end at the left edge (tospain). Then the narrator's last line of the game. */
const LATER=[['crete','titus_was_to_appoint_elders_on_crete_titus_1_5'],['ephesus','paul_encouraged_timothy_to_stay_in_ephesus_1_timothy_1_3'],
  ['nicopolis','paul_decided_to_winter_at_nicopolis_titus_3_12'],[['troas','miletus'],'his_cloak_at_troas_trophimus_at_miletus_2_timothy_4_13_20'],
  ['tospain','perhaps_he_reached_spain_romans_15_24_28']];
/* AT_LATER: where its lines stand: at the top, right of Rome and above Troas, Ephesus and Crete (MACEDONIA, a land's name, may lie under) */
const AT_LATER={x:215,w:190};
async function later(){if(RUN.all)return;const M=await need('map');
  await fade(1,ms(600));
  await M.journey([],{view:'letters',labels:M.labels.later,seen:['rome'],pulse:'rome',instant:1,music:1});
  await fade(0,ms(900));await pause(900);
  for(const[ids,k]of LATER){if(RUN.all)return;for(const id of[].concat(ids)){M.light(id);M.arrive();await pause(450)}await tell(k,AT_LATER)}
  M.state.pulse=null;await pause(500);
  await tell('the_prisoner_of_rome_was_on_the_road_again',Object.assign({dur:8000},AT_LATER))}

async function run(o){begin();RUN.room=G.room;o=o||{};
  /* the page about the last chapter is what its level returns as about; one given with the call is kept for this sitting */
  if(o&&o.about&&!CHAP[G.ch].about)CHAP[G.ch].about=o.about;if(o&&o.mood)AU.mood=o.mood;
  for(const part of[letters,roll,()=>after(o.after),()=>o.after?later():null,lookBack])try{await part()}catch(e){console.error(e)}
  if(G.skip===cut)G.skip=null;
  return closing({keep:1})}
async function again(){begin();const n=last();
  /* the last chapter's own text, for the page behind the closing screen */
  if(n)try{await loadLevel(n)}catch(e){console.error(e)}
  try{await lookBack()}catch(e){console.error(e)}
  if(G.skip===cut)G.skip=null;
  return closing()}
return{run,again,last,after,later,LATER,POS,get all(){return RUN.all}};
})();
