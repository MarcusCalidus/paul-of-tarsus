/* Paul of Tarsus: the trailer's shots (tools/trailer/). tools/trailer/trailer.mjs loads this file into a copy of the game, after
   index.html, with tools/trailer/clock.js in front of it, and films the shots in the game itself: the real rooms and cutscenes, the
   real cast, and lines of the real dialogue, in the language the page is opened in.

   The film follows the score (tools/trailer/score.js): a bar is three seconds, from 0.25 s on, so bar b begins at 0.25 + 3b seconds,
   and the cuts fall on its bars. The shots follow one another without a gap. A shot is
     {id, bar (where it begins), bars (how long), view, setup(), play(), says, card}
   view: 'scene' (the room at 6 screen pixels to a room pixel, 1920 x 864, with black above and below, as in a cinema), 'ui' (the room
   with the status line, the verbs and the inventory, at 5, for the gameplay beat), 'title' (the opening picture, at 5) or 'black'.
   setup() puts the game where the shot begins, on the real clock; play() then runs on the trailer's clock while the shot is filmed.
   says: the lines the shot speaks, [who, line, options]: lines of the game, in English as the chapter has them. The game translates
   each as it shows it; the recorder fails a shot whose line is not in the game's files or has no translation (see lines and check).
   card: a few words in the black under the picture (in a black shot, in the middle of it), from CARD, in English and German.
   The opening picture is where the page starts, so the title is filmed first, before any other shot changes the game.

   What the trailer leaves out on purpose: the light on the road to Damascus (a cut would make it flash; CONTRIBUTING section 3), the
   hidden treasures, and the answers to the puzzles: a puzzle is worked a move or two and never to its end. Every rule of CONTRIBUTING
   holds for what it shows, as in the game. A shot with live:1 (and the gameplay beat) is the player's: the recorder moves the mouse to
   ptr and clicks there, and the game answers as it answers a player. */
const TRAILER=(()=>{
"use strict";
const FPS=30,BAR=3,T0=.25,TAIL=5;
const at=b=>T0+b*BAR;
const root=document.documentElement;
/* ---------- the trailer's own layer over the game: cards, the pointer of the gameplay beat, and the fade ---------- */
const css=document.createElement('style');css.textContent=`
html.tr #top{display:none}
html.tr.v-scene #status,html.tr.v-scene #panel,html.tr.v-title #status,html.tr.v-title #panel,html.tr.v-black #wrap{display:none}
html.tr #hush,html.tr #found,html.tr #codebox,html.tr #menu,html.tr #overlay .begin{display:none!important}
html.tr.v-scene #tags,html.tr.v-title #tags{display:none}
html.tr *{transition:none!important}
#trcard{position:fixed;left:0;right:0;z-index:50;text-align:center;pointer-events:none;color:#e2b24c;letter-spacing:.04em;opacity:0;
  font-family:"Lucida Console",Monaco,"Courier New",monospace;font-weight:bold;white-space:pre-line;
  -webkit-text-stroke:8px #000;paint-order:stroke fill}
#trcard.low{bottom:0;height:108px;display:flex;align-items:center;justify-content:center;font-size:38px}
#trcard.mid{top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:52px;line-height:1.35}
#trcard.end{bottom:40px;font-size:34px;line-height:1.5}
#trptr{position:fixed;z-index:55;pointer-events:none;display:none;image-rendering:pixelated}
#trfade{position:fixed;inset:0;z-index:60;background:#000;opacity:0;pointer-events:none}`;
document.head.appendChild(css);
const el=(id,tag)=>{const e=document.createElement(tag||'div');e.id=id;document.body.appendChild(e);return e};
const card=el('trcard'),ptrEl=el('trptr','img'),fadeEl=el('trfade');
const SCALE={scene:6,ui:5,title:5,black:6};
function view(v){root.classList.add('tr');for(const k in SCALE)root.classList.toggle('v-'+k,k===v);root.style.setProperty('--s',SCALE[v])}

/* ---------- the cards ---------- */
const NUM={en:['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
  'seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five'],
  de:['','ein','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn',
  'siebzehn','achtzehn','neunzehn','zwanzig','einundzwanzig','zweiundzwanzig','dreiundzwanzig','vierundzwanzig','fünfundzwanzig']};
const cap=s=>s[0].toUpperCase()+s.slice(1),chapters=()=>Object.keys(CHAP).length;
const CARD={
  from:{en:'From Damascus to Ephesus',de:'Von Damaskus bis Ephesus'},
  three:{en:'His trade. His brothers. Prayer.',de:'Sein Handwerk. Seine Brüder. Gebet.'},
  puzzles:{en:'Puzzles made from the things of his time',de:'Rätsel aus den Dingen seiner Zeit'},
  /* counted from the game, so that it stays true as chapters are added */
  chapters:{en:()=>cap(NUM.en[chapters()])+' chapters and a prologue',de:()=>cap(NUM.de[chapters()])+' Kapitel und ein Prolog'},
  langs:{en:'In English and German',de:'Auf Englisch und Deutsch'},
  free:{en:'Free · no ads · plays in your browser\npaul-of-tarsus.theunknownones.net',de:'Kostenlos · ohne Werbung · im Browser spielbar\npaul-of-tarsus.theunknownones.net'}};
const cardText=k=>{const c=CARD[k],v=c[G.lang]||c.en;return typeof v==='function'?v():v};

/* ---------- helpers for the shots ---------- */
/* room: open a room of a chapter at a point in its story: the flags up to and with one of the chapter's flags (upto), and any others
   (flags); the chapter then places its cast for that room as the game does when the room is entered (as the playtest's direct stops do) */
async function room(ch,id,o={}){await chapter(ch);const C=CHAP[ch],ALL=C.flags||[];
  if(o.upto)for(const k of ALL.slice(0,ALL.indexOf(o.upto)+1))F[k]=1;for(const k of o.flags||[])F[k]=1;
  if(C.place)C.place(id);dealInv(id);G.scene=null;enterRoom(id,...(o.at||C.ent[id]));if(o.at)G.cam=clamp(o.at[0]-160,0,ART[id].w-VW);
  if(o.cam!=null)G.cam=o.cam}
/* chapter: a chapter, loaded and begun, with nothing on the screen yet */
async function chapter(ch){await loadLevel(ch);ov.className='';ov.innerHTML='';ov.onclick=null;$('#dim').style.opacity=0;
  if(SHARED.scroll)SHARED.scroll.off();setChapter(ch);G.white=0;G.busy=true;lock(true);status()}
/* scene: one of a chapter's painted scenes (a cutscene's picture) */
async function scene(ch,name){await chapter(ch);G.room=null;G.scene=CHAP[ch].scenes[name]}
const A=id=>typeof id==='string'?ACT[id]:id;
/* line: say line k of the shot (its says), and wait until it is over */
const line=(s,k)=>{const[who,text,o]=s.says[k];return say(who?A(who):null,text,o||{})};
const ease=k=>k*k*(3-2*k);

/* ---------- the pointer of the gameplay beat ---------- */
/* The recorder moves the real mouse there (so the game sees it as a player's) and the trailer paints the game's own pointer on top,
   since a screenshot shows no pointer. */
let ptr=null;
function aim(x,y,ms){const p=ptr,x0=p.x,y0=p.y;return tween(ms,k=>{k=ease(k);p.x=x0+(x-x0)*k;p.y=y0+(y-y0)*k})}
const actorAt=a=>{const r=$('#view').getBoundingClientRect(),s=r.width/VW;return[r.left+(a.x-G.cam)*s,r.top+(a.y-18)*s]};
const centre=sel=>{const r=$(sel).getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};

/* ---------- the shots ---------- */
/* a puzzle's parts: the middle of a hotspot of the room, and of a cell of the bolt of cloth, on the screen */
const hsAt=h=>{const r=$('#view').getBoundingClientRect(),s=r.width/VW;return[r.left+(h.x+h.w/2-G.cam)*s,r.top+(h.y+h.h/2)*s]};
const roomAt=(x,y)=>{const r=$('#view').getBoundingClientRect(),s=r.width/VW;return[r.left+(x-G.cam)*s,r.top+y*s]};
const click=async ms=>{ptr.click=1;await wait(ms||0)};
/* live: the game is the player's during the shot (the pointer works it), as in the gameplay beat */
function live(x,y){G.busy=false;lock(false);drawInv();status();const r=$('#view').getBoundingClientRect();ptr={x:r.left+r.width*x,y:r.top+r.height*y,click:0}}
const SHOTS=[
  /* the harp: the sea at sunset, the ship bound for Cyprus (Chapter Four) */
  {id:'voyage',bar:0,bars:2,view:'scene',card:'from',
   async setup(){await scene(4,'voyage');G.sea={k:.04}},
   async play(){await tween(6200,k=>{G.sea.k=.04+.2*k})}},
  /* the basket down the wall of Damascus by night (Chapter One), with the narration that tells it */
  {id:'wall',bar:2,bars:2,view:'scene',
   says:[[null,'under_cover_of_night_acts_9_25',{dur:5600}]],
   async setup(){await scene(1,'wall');G.end={heads:1,by:46,rider:1}},
   async play(){const down=tween(6000,k=>{G.end.by=46+40*ease(k)});await wait(250);await line(this,0);await down}},
  /* the ney: Barnabas finds Saul at the last stall in Tarsus (Chapter Three) */
  {id:'tarsus',bar:4,bars:2,view:'scene',
   says:[['barnabas','i_have_asked_for_you_along',{dur:5400}]],
   async setup(){await room(3,'tarsus');place(A('barnabas'),'tarsus',84,124,1)},
   async play(){await walk(A('barnabas'),118,124);await line(this,0)}},
  /* at anchor off Samothrace by night (Chapter Eight) */
  {id:'deck',bar:6,bars:2,view:'scene',
   says:[['paul','look_up_timothy',{dur:5200}]],
   async setup(){await scene(8,'deck')},
   async play(){await wait(400);await line(this,0)}},
  /* the strings: the sundial's shadow moves on from morning to noon (Chapter Thirteen; turnDial(0, 1) in the game) */
  {id:'dial',bar:8,bars:1,view:'scene',card:'three',
   async setup(){await room(13,'street13',{upto:'hall'});G.scene=CHAP[13].scenes.dial;G.dial13={a:0,b:1,k:0}},
   async play(){await tween(2900,k=>{G.dial13.k=ease(k)})}},
  /* the gameplay beat: the pointer finds Jason and lights Talk to; then Paul prays (Chapter Ten, Jason's yard in Thessalonica). Not in
     Chapter One: there the narration still calls him Saul (CONTRIBUTING section 2), and the prayer's line names him Paul (issue #63). */
  {id:'play',bar:9,bars:2,view:'ui',look:[1.6],free:1,
   async setup(){await room(10,'yard10');live(.62,.78)},
   async play(){await wait(150);await aim(...actorAt(A('jason10')),600);await wait(900);await aim(...centre('#pray'),700);await wait(150);ptr.click=1}},
  /* the puzzles, worked by the pointer as a player works them, one move or two and never to the end (nothing is given away) */
  /* the counting board: a pebble laid in the trough of the hundreds, and one in the tens (Chapter Thirteen) */
  {id:'board',bar:11,bars:1,view:'scene',card:'puzzles',live:1,
   async setup(){await room(13,'board13',{upto:'n3'});G.bd13={v:26500,base:16600,k:2,told:1,car:1};live(.9,.62)},
   async play(){const H=ROOMS.board13.hs,n=(H.length-3)/2;
     await aim(...hsAt(H[n+2]),650);await click(500);await aim(...hsAt(H[n+3]),550);await click(400);await aim(...hsAt(H[n+2]),450);await click()}},
  /* the bolt of cloth: the roof panel taken from the board and laid on the cloth, where it may lie, but not where it belongs (Chapter Ten) */
  {id:'bolt',bar:12,bars:1,view:'scene',card:'puzzles',live:1,
   async setup(){await room(10,'bolt10');live(.86,.88)},
   async play(){const C=CHAP[10],b=C.bolt,roof=C.pieces.find(q=>q.id==='roof'),hs=ROOMS.bolt10.hs.find(h=>h.name===roof.name);
     await aim(...hsAt(hs),700);await click(450);await aim(...roomAt(b.x+(4.5)*b.cell,b.y+.5*b.cell),800);await click()}},
  /* the table of scrolls: two rollers turned back by one place each (never on toward the end: that is the chapter's hidden treasure) */
  {id:'scrolls',bar:13,bars:1,view:'scene',card:'puzzles',live:1,
   async setup(){await room(10,'table10',{upto:'r1'});await new Promise(r=>setTimeout(r,120));if(G.tab10){G.tab10.s=['ps22m','is533'];G.tab10.t='mock'}live(.5,.92)},
   async play(){const H=ROOMS.table10.hs;await aim(...hsAt(H[3]),650);await click(550);await aim(...hsAt(H[0]),700);await click()}},
  /* the impact, and a step higher */
  /* the Areopagus: the council under the Acropolis, Paul before it. The camera stays on the hill: Damaris listens from the path below it
     (CONTRIBUTING section 4), at the left edge of the room, out of this picture. */
  {id:'areopagus',bar:14,bars:1,view:'scene',
   async setup(){await room(11,'hill11',{upto:'led',at:[300,126,1]})}},
  /* Barnabas and Saul on the road to Antioch, with the loaded donkey between them (Chapter Three) */
  {id:'road',bar:15,bars:1,view:'scene',
   async setup(){await scene(3,'road');G.trek={k:.27}},
   async play(){await tween(3000,k=>{G.trek.k=.27+k*3/17})}},
  /* the ford in the Taurus gorge: Paul at the water, the party with its pack animals behind him (Chapter Five) */
  {id:'ford',bar:16,bars:1,view:'scene',
   async setup(){await room(5,'ford')}},
  /* the place of prayer by the river at Philippi, with Lydia and the women of her household (Chapter Eight) */
  {id:'river',bar:17,bars:1,view:'scene',
   async setup(){await room(8,'river',{upto:'awn'})}},
  /* the height: the roads of the second journey draw themselves on the map (Chapter Twelve's look back, whose roads never cross) */
  {id:'map',bar:18,bars:2,view:'scene',card:'chapters',
   async setup(){await chapter(12);await need('map');const[legs,o]=CHAP[12].back[3],M=SHARED.map,S=M.state;
     await M.journey(legs,Object.assign({},o,{instant:1}));for(const L of S.legs)L.k=0;S.seen=new Set(o.seen||[]);S.seen.add(S.legs[0].a);S.pulse=S.legs[0].a},
   async play(){const S=SHARED.map.state,all=S.legs.reduce((n,L)=>n+L.dots.length,0);
     for(const L of S.legs){S.pulse=L.a;await tween(5000*L.dots.length/all,k=>{L.k=k});S.seen.add(L.b)}S.pulse=S.legs.at(-1).b}},
  {id:'hall',bar:20,bars:1,view:'scene',
   async setup(){await room(13,'hall13',{upto:'m2',at:[236,116,1]})}},
  {id:'lystra',bar:21,bars:1,view:'scene',
   async setup(){await room(6,'lystra',{at:[262,126,-1]})}},
  /* a breath */
  {id:'breath',bar:22,bars:1,view:'black',card:'langs'},
  /* the last turn: the sundial again, from noon to evening (turnDial(1, 2)), so that a day has passed between its two shots; then the
     bench at dawn (Chapter Thirteen) */
  {id:'dial2',bar:23,bars:1,view:'scene',
   async setup(){await room(13,'street13',{upto:'m1'});G.scene=CHAP[13].scenes.dial;G.dial13={a:1,b:2,k:0}},
   async play(){await tween(2900,k=>{G.dial13.k=ease(k)})}},
  {id:'bench',bar:24,bars:1,view:'scene',
   async setup(){await room(13,'shop13',{upto:'hall',at:[150,122,1]})}},
  /* the title: the opening picture, its name over the tentmaker's bench by lamplight, and where to play */
  {id:'title',bar:25,bars:3,view:'title',card:'free',first:1}];

/* During a shot the game says only the shot's own lines: a thought or a call that the game would say on its own, at a moment the cut
   does not show whole, is left unsaid (it ends at once, as if clicked away). A shot with free:1 lets the game say what it says. */
let cur=null;
const gameSay=say;
say=function(a,text,o){if(cur&&!cur.free&&!(cur.says||[]).some(x=>x[1]===text))return Promise.resolve();return gameSay.apply(this,arguments)};
/* quiet: no line from before the shot stays on the screen: whatever is being said ends, as a click would end it */
function quiet(){for(let n=0;n<20&&G.skip;n++)G.skip();$('#speech').innerHTML=''}

/* ---------- what the recorder calls ---------- */
const LEN=at(SHOTS.at(-1).bar+SHOTS.at(-1).bars)+TAIL;
const startOf=s=>s===SHOTS[0]?0:at(s.bar),endOf=s=>s===SHOTS.at(-1)?LEN:at(s.bar+s.bars);
return{
  ready:()=>typeof G!=='undefined'&&G.splash===1&&!!SHARED.splash&&!!ov.querySelector('h1'),
  plan:()=>{const gaps=[];SHOTS.forEach((s,i)=>{if(i&&s.bar!==SHOTS[i-1].bar+SHOTS[i-1].bars)gaps.push(s.id)});
    return{fps:FPS,length:LEN,gaps,shots:SHOTS.map(s=>({id:s.id,at:startOf(s),len:endOf(s)-startOf(s),first:!!s.first,ui:s.view==='ui',look:s.look||[]}))}},
  /* every line the shots say, for the recorder to find in the game's files */
  lines:()=>SHOTS.flatMap(s=>(s.says||[]).map(x=>({shot:s.id,text:x[1]}))),
  async prepare(i){const s=SHOTS[i];cur=s;__clock.run();ptr=null;ptrEl.style.display='none';view(s.view);card.className='';card.textContent='';fadeEl.style.opacity=0;
    if(s.setup)await s.setup();await new Promise(r=>setTimeout(r,150));quiet();
    /* the shot's lines must have their translation in this language */
    return(s.says||[]).filter(x=>G.lang!=='en'&&T.peek(x[1])==null).map(x=>x[1])},
  start(i){const s=SHOTS[i];__clock.stop();if(s.play)s.play.call(s).catch(e=>console.error('play '+s.id+': '+(e.stack||e)))},
  /* frame: the trailer's layer at time t of the film: the shot's card, faded in and out, the fade from and to black; and where the
     pointer is, if the shot has one, for the recorder to move the mouse there */
  frame(i,t){const s=SHOTS[i],k=s.card;let i0=i,i1=i;while(k&&i0>0&&SHOTS[i0-1].card===k)i0--;while(k&&i1<SHOTS.length-1&&SHOTS[i1+1].card===k)i1++;
    const a=startOf(SHOTS[i0]),e=endOf(SHOTS[i1]);
    /* a scene stays a scene: no script that ends during it hands the game to the player, so nothing that waits for the player is drawn */
    if(s.view!=='ui'&&!s.live){G.busy=true;G.hover=null}
    if(k){card.className=s.view==='black'?'mid':s.view==='title'?'end':'low';card.textContent=cardText(k);
      const u=s.view==='title'?Math.min(t-a-2.5,e-1.8-t):Math.min(t-a-.25,e-.25-t);card.style.opacity=Math.max(0,Math.min(1,u/.45))}
    else card.style.opacity=0;
    fadeEl.style.opacity=t<1.4?1-t/1.4:t>LEN-2.2?Math.min(1,(t-(LEN-2.2))/1.8):0;
    if(!ptr)return null;const r={x:Math.round(ptr.x),y:Math.round(ptr.y),click:ptr.click};ptr.click=0;return r},
  /* cursor: paint the game's pointer where the mouse is, as the game would show it there */
  cursor(x,y){const inView=document.elementFromPoint(x,y)?.closest('#view'),kind=inView?pointerKind(G.hover):'default',
    c=pointerArt(3,kind),s=1;ptrEl.src=c.toDataURL();ptrEl.style.width=c.width*s+'px';ptrEl.style.left=(x-c.hx*3*s)+'px';ptrEl.style.top=(y-c.hy*3*s)+'px';ptrEl.style.display='block'},
  end(){cur=null;__clock.run();ptrEl.style.display='none'},
  info:async ch=>{await loadLevel(ch);setChapter(ch);const C=CHAP[ch],out={rooms:C.rooms,flags:C.flags,ent:C.ent,cast:{}};
    for(const r of C.rooms){const who=st=>{setChapter(ch);for(const k of st)F[k]=1;try{if(C.place)C.place(r)}catch(e){return'place failed'}
      return Object.values(ACT).filter(a=>a.room===r).map(a=>a.id+'@'+Math.round(a.x)+','+Math.round(a.y))};
      out.cast[r]={none:who([]),all:who(C.flags||[])}}return out}}})();
