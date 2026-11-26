/* Paul of Tarsus: the finale, the end of the whole game (issue #95). Loaded on demand (see need() in index.html), and kept for offline
   play by shared/pwa.js.

   The game ends where Acts ends: inside the two years in Rome, with the door open (Acts 28:30, 31). The last chapter plays its last scene
   in the room and then hands over here with one call, in place of an end screen:

     run()     everything after the open door, in this order:
               1. the map on which Paul does not move: Rome, and Philippi, Ephesus and Colossae lighting up, where the letters written in
                  that room went, while Philippians 1:12-14 is told. No road is drawn: no source gives one.
               2. the narrator's roll: the last line of the game, and then the hands close the roll (shared/scroll.js).
               3. the look back: every journey of the game, map by map from Damascus to Rome (shared/lookback.js), one narrated line for
                  each map, and as each chapter's road is drawn its name in the status line and one bar of its own tune (shared/tunes.js).
               4. the bench by day (shared/splash.js) with the closing screen over it, to the theme of Chapter One as the overture plays it.
               As the closing screen comes, the game is kept as finished: the chapter's last safe point with one more flag set, as a
               safe-point code like any other (see THE END OF THE GAME in index.html). So the chapter calls run() at that safe point.
     again()   the title's line "From Damascus to Rome", for a game that has been finished: the look back and the closing screen once more.

   What the release was like is not shown, and the room is never seen empty: every source hedges it. The closing screen says in one
   sentence what the publications think, with its "apparently".

   Skipping. A click, Space or Esc passes over what is playing: a narrated line, the roll being closed, or the whole look back. SKIP in the
   top bar passes over everything and brings the closing screen. Nothing here is played, so nothing is lost; the title shows it again.

   The last chapter says what it has to say about itself (what is invented, what the account leaves unsaid) on a page behind the closing
   screen, reached by one line on it, and has no "Chapter complete" screen of its own (CONTRIBUTING section 2). Its level gives that page as
   about:{title, text, based}, keys of its own text, in what it returns. */
SHARED.finale=(()=>{
"use strict";
/* RUN: all, SKIP was pressed and everything up to the closing screen is passed over; cut, a click passed over the part that is playing
   (the look back, the roll being closed); wake, those who wait and are to go on at once in either case */
const RUN={all:false,cut:false,wake:[]};
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
async function roll(){if(RUN.all)return;
  await fade(1,ms(800));   /* in the dark the narrator's line is read from the roll (say) */
  await tell('here_the_account_ends',{dur:9000});
  const S=SHARED.scroll;if(!S||RUN.all||!S.close)return;
  await S.up();RUN.cut=false;G.skip=cut;G.lineT=performance.now();   /* up: the roll stays, though its line has ended */
  await pause(500);await until(S.close());await pause(1300);
  if(G.skip===cut)G.skip=null;RUN.cut=false;await S.down();if(S.open)S.open()}

/* ---------- 3. the look back ---------- */
/* POS: where each map's line stands: at the top of the map unless low, and at x across it with a width w (room pixels) where the roads
   leave a side of the map free. Maps 1 to 5 are Chapter Twelve's look back and keep its places. */
const POS={macedonia:{low:1},ephesus:{low:1},miletus:{x:66,w:112},jerusalem:{low:1,x:96,w:170},crete:{low:1,x:112,w:190},malta:{low:1},rome:{low:1,x:222,w:170}};
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
function keep(){const c=CHAP[G.ch];if(c.done==null||!c.flags||!c.flags[c.done]||!G.room)return null;F[c.flags[c.done]]=1;const code=makeCode();autosave(code);return code}
async function closing(o){o=o||{};const[sp,logo]=await Promise.all([need('splash').catch(e=>{console.error(e);return null}),need('logo').catch(()=>null)]);
  const S=SHARED.scroll;if(S&&S.state!=='down')await S.down();
  await fade(1,ms(800));end();if(o.keep)keep();
  const n=last(),about=n&&CHAP[n].ready&&CHAP[n].about?{n,...CHAP[n].about}:null;
  G.scene=sp&&sp.day?sp.day:sp?sp.scene:DARK;G.end={};AU.amb={birds:.3};AU.mood='calm';codeBtn();let shown=false;
  /* the theme of Chapter One, as the overture played it; after it, quiet */
  if(sp){sp.score.then={dt:sp.score.dt,steps:16,root:sp.score.root,scale:sp.score.scale,bars:1,tracks:[]};setScore(sp.score);AU.step=0;kick()}else setScore(null);
  const page=()=>overlay('on closing',()=>{const name=T('paul_of_tarsus'),sub=T('on_the_roads_of_rome'),art=logo&&logo.can(name+sub)?logo.paint(name,sub):null,got=treasures().size,all=hidden().length;
      ov.innerHTML=(art?'<h1 class="art"></h1>':'<h1>'+esc(name)+'</h1><h2>'+esc(sub)+'</h2>')+
        '<h2>'+esc(T('from_damascus_to_rome'))+'</h2><p class="small">'+esc(T('a_prologue_and_twenty_five_chapters'))+'</p>'+
        '<p data-tre="1">'+esc(T('hidden_treasures_n_of_all',{n:got,all}))+(got<all?' &middot; <span class="pick" data-tre="1">'+esc(T('look_for_the_others'))+'</span>':'')+'</p>'+
        '<p class="small">'+esc(T('based_on_acts_and_on_letters_of_paul'))+'</p><p>'+esc(T('acts_ends_here_paul_was_apparently_set_free'))+'</p>'+
        (about?'<p class="pick" data-about="1">&#9656; '+esc(T('about_the_last_chapter'))+'</p>':'')+
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

async function run(){begin();
  for(const part of[letters,roll,lookBack])try{await part()}catch(e){console.error(e)}
  if(G.skip===cut)G.skip=null;
  return closing({keep:1})}
async function again(){begin();const n=last();
  /* the last chapter's own text, for the page behind the closing screen */
  if(n)try{await loadLevel(n)}catch(e){console.error(e)}
  try{await lookBack()}catch(e){console.error(e)}
  if(G.skip===cut)G.skip=null;
  return closing()}
return{run,again,last,POS,get all(){return RUN.all}};
})();
