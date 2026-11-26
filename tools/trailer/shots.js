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
   ptr and clicks there, and the game answers as it answers a player.

   The same shots make more than one film (CUTS, below, chosen by ?cut= in the page's address): "trailer", the film described above, and
   "status", an upright film of 1080 x 1920 for a phone's status, 57 seconds on the short cut of the score. An upright film shows a part
   of the wide picture, large (see UPRIGHT). */
const TRAILER=(()=>{
"use strict";
const FPS=30,BAR=3,T0=.25;
const at=b=>T0+b*BAR;
const root=document.documentElement;
const CUTNAME=new URLSearchParams(location.search).get('cut')||'trailer';
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
#trfade{position:fixed;inset:0;z-index:60;background:#000;opacity:0;pointer-events:none}
/* UPRIGHT: the picture is a window on the view, --vx to the side, between a band of timber above it (to --py) and one below it (from --pb) */
#trtopb,#trbotb,#trname,#trkeep{display:none}
html.up body{display:block;background:#000}
html.up #wrap{position:absolute;left:0;top:var(--py,0px)}
html.up #view{translate:var(--vx,0px) 0}
html.up #trtopb,html.up #trbotb{display:block;position:fixed;left:0;right:0;z-index:45;pointer-events:none;
  background:#1c130c var(--wood);background-size:768px 192px;image-rendering:pixelated}
html.up #trtopb{top:0;height:var(--py,0px);box-shadow:inset 0 -4px 0 #000,inset 0 -8px 0 #6a4c24}
html.up #trbotb{top:var(--pb,100%);bottom:0;box-shadow:inset 0 4px 0 #000,inset 0 8px 0 #6a4c24}
html.up #trname{display:flex;position:fixed;left:0;right:0;top:0;height:192px;z-index:46;align-items:center;justify-content:center;pointer-events:none}
html.up #trkeep{display:block}
html.up #trkeep canvas{position:fixed;left:0;z-index:47;filter:brightness(.72);box-shadow:0 4px 0 #000}
html.up #trname canvas{image-rendering:pixelated;image-rendering:crisp-edges}
html.up.v-title #trname,html.up.v-black #trname{display:none}
html.up.v-ui #status{width:1080px;box-sizing:border-box}
html.up .line{--s:7.5;max-width:980px;text-wrap:balance}
html.up.v-title #overlay{left:calc(var(--vx,0px)*-1);right:auto;width:1080px;--s:var(--ls,4);--px:calc(var(--s)*.5px);padding-top:150px;justify-content:flex-start}
html.up.v-title #overlay .lede{font-size:34px;line-height:1.35;max-width:900px;margin:20px 0 0;text-wrap:balance}
html.up #trcard{left:40px;right:40px;text-wrap:balance;-webkit-text-stroke:10px #000}
html.up #trcard.low{bottom:auto;top:calc(var(--pb) + 40px);height:auto;display:block;font-size:42px;line-height:1.4}
html.up #trcard.mid{font-size:56px}
html.up #trcard.end{bottom:auto;top:calc(var(--py) + 520px);font-size:39px;line-height:1.5}
html.up #trcard.end b{display:block;font-size:64px;line-height:1.22;margin-bottom:26px;color:#fff3b8}`;
document.head.appendChild(css);
const el=(id,tag)=>{const e=document.createElement(tag||'div');e.id=id;document.body.appendChild(e);return e};
const card=el('trcard'),ptrEl=el('trptr','img'),fadeEl=el('trfade'),nameEl=el('trname'),keepEl=el('trkeep');el('trtopb');el('trbotb');
const SCALE={scene:6,ui:5,title:5,black:6};
/* UPRIGHT. An upright film is 1080 wide and the view 320, so it shows a window on the picture: s screen pixels to a room pixel (10 unless
   the shot says otherwise: the backdrops are painted two pixels to a room pixel, so an even s keeps every one of them the same size)
   and 1080 / s room pixels wide, 108 at 10, about a third of the picture. A shot says where the window stands in up: {s, x}: x is the
   room pixel at its middle, [from, to] to move it evenly through the shot, or a function of the shot's progress (0 to 1) to follow
   something. The frame from top to bottom: a band of timber 192 high with the game's name, small, painted by the title's own logo
   painter; the picture, 1440 high; a band of timber with the card. A close view, where a puzzle must be seen whole, takes s: 4 and is
   then a strip 576 high, so three of them fill the frame under the name: a shot with up.stack (0, 1 or 2) stands in that place, and when
   it is over its last picture stays there, a little darker, while the next is worked under it (the shots of a stack are filmed one
   after another; a shot without stack clears it). up.cardY sets the card somewhere else than under the picture. The gameplay beat
   ('ui') keeps the status line and the verbs under its window, and the title's picture stands nearly as tall as the frame. What the
   wide trailer never shows in close view stays out of the window (see the shots of the cut). */
const UPS={scene:10,ui:6,title:8,black:10},UPH={scene:144,ui:208,title:210,black:144},UPTOP=192,UPPIC=1440;
let UP=false,W=1920,H=1080;
const upS=s=>(s.up&&s.up.s)||UPS[s.view];
function aimWindow(s,k){const u=s.up||{},S=upS(s),x=typeof u.x==='function'?u.x.call(s,k):Array.isArray(u.x)?u.x[0]+(u.x[1]-u.x[0])*k:u.x==null?VW/2:u.x,
    half=W/2/S,c=VW*S<=W?VW/2:clamp(x,half,VW-half);root.style.setProperty('--vx',Math.round(W/2-c*S)+'px')}
/* keepLines: a line of the game stands over its speaker, who may be near the window's edge, and the narrator's in the middle of the view:
   each is moved sideways until it stands inside the frame, the narrator's to its middle. The frame is narrow and the letters large, so
   a line runs over more rows than in the game: a reference at its end is kept in one piece, as the game keeps it on the narrator's scroll */
function keepLines(){for(const e of document.querySelectorAll('#speech .line')){
  if(!e.dataset.tr){e.dataset.tr=1;const t=e.textContent,m=t.match(/\([^()]*\d+:\d+[^()]*\)\s*$/);
    if(m){e.textContent=t.slice(0,m.index);const sp=document.createElement('span');sp.style.whiteSpace='nowrap';sp.textContent=m[0];e.appendChild(sp)}}
  e.style.translate='';const r=e.getBoundingClientRect(),m=28;
  const dx=/%$/.test(e.style.left)||!e.style.left?W/2-(r.left+r.width/2):r.left<m?m-r.left:r.right>W-m?W-m-r.right:0;if(dx)e.style.translate=Math.round(dx)+'px 0'}}
function view(s){const v=s.view;root.classList.add('tr');root.classList.toggle('up',UP);for(const k in SCALE)root.classList.toggle('v-'+k,k===v);
  if(!UP){root.style.setProperty('--s',SCALE[v]);return}
  const S=upS(s),h=UPH[v]*S,st=s.up&&s.up.stack,py=v==='title'?Math.round((H-h)/2):st!=null?UPTOP+st*h:v==='ui'?UPTOP:Math.round(UPTOP+Math.max(0,UPPIC-h)/2);
  if(!st)keepEl.textContent='';card.style.top=s.up&&s.up.cardY?s.up.cardY+'px':'';
  root.style.setProperty('--s',S);root.style.setProperty('--py',py+'px');root.style.setProperty('--pb',(py+h)+'px');
  /* the name above the picture, and how large the title's logo may stand in a frame this narrow: a whole or a half number of pixels */
  const L=SHARED.logo,name=T('paul_of_tarsus'),sub=T('on_the_roads_of_rome');
  if(L&&L.can(name+sub)){const a=L.paint(name,sub);root.style.setProperty('--ls',Math.min(4.5,Math.floor((W-120)/(a.width/2)*2)/2));
    if(!nameEl.firstChild){const c=document.createElement('canvas');c.width=a.width;c.height=a.height;c.getContext('2d').drawImage(a,0,0);
      const z=Math.min(3,Math.floor((W-160)/(a.width/2)*2)/2);c.style.width=a.width/2*z+'px';c.style.height=a.height/2*z+'px';nameEl.appendChild(c)}}
  try{aimWindow(s,0)}catch(e){}}

/* ---------- the cards ---------- */
const NUM={en:['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
  'seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five'],
  de:['','ein','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn',
  'siebzehn','achtzehn','neunzehn','zwanzig','einundzwanzig','zweiundzwanzig','dreiundzwanzig','vierundzwanzig','fünfundzwanzig']};
const cap=s=>s[0].toUpperCase()+s.slice(1),chapters=()=>Object.keys(CHAP).length;
const CARD={
  from:{en:'From Damascus to Rome',de:'Von Damaskus nach Rom'},
  three:{en:'His trade. His brothers. Prayer.',de:'Sein Handwerk. Seine Brüder. Gebet.'},
  puzzles:{en:'Puzzles made from the things of his time',de:'Rätsel aus den Dingen seiner Zeit'},
  /* counted from the game, so that it stays true as chapters are added */
  chapters:{en:()=>cap(NUM.en[chapters()])+' chapters and a prologue',de:()=>cap(NUM.de[chapters()])+' Kapitel und ein Prolog'},
  langs:{en:'In English and German',de:'Auf Englisch und Deutsch'},
  /* the release, for the upright film (the maintainer's choice, 2026-11-26): it says what the chapters' own card says, so that one goes */
  now:{en:()=>'Now complete:\nall '+chapters()+' chapters',de:()=>'Jetzt vollständig:\nalle '+chapters()+' Kapitel'},
  free:{en:'Free · no ads · plays in your browser\npaul-of-tarsus.theunknownones.net',de:'Kostenlos · ohne Werbung · im Browser spielbar\npaul-of-tarsus.theunknownones.net'}};
const cardText=k=>{const c=CARD[k],v=c[G.lang]||c.en;return typeof v==='function'?v():v};
/* a shot's card is one of them, or two: then the first stands large over the second */
const cardKey=s=>s.card?String(s.card):'';
/* in an upright film a line too long for the frame is divided at its last dot */
const cardLines=k=>UP?cardText(k).split('\n').map(l=>l.length>38&&l.includes(' \u00b7 ')?l.slice(0,l.lastIndexOf(' \u00b7 '))+'\n'+l.slice(l.lastIndexOf(' \u00b7 ')+3):l).join('\n'):cardText(k);
function cardShow(s){if(!Array.isArray(s.card)){card.textContent=cardLines(s.card);return}
  card.textContent='';s.card.forEach((k,i)=>{const e=document.createElement(i?'span':'b');e.textContent=cardLines(k);card.appendChild(e)})}

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
const TRAILER_SHOTS=[
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
  /* once more: the hall of Tyrannus at Ephesus (Chapter Thirteen), and the gate of Lystra (Chapter Six) */
  {id:'hall',bar:18,bars:1,view:'scene',
   async setup(){await room(13,'hall13',{upto:'m2',at:[236,116,1]})}},
  {id:'lystra',bar:19,bars:1,view:'scene',
   async setup(){await room(6,'lystra',{at:[262,126,-1]})}},
  /* the last chapters (added 2026-11-26, the maintainer's choice of scenes). Jerusalem: Paul on the stairs above the crowd, the temple
     courts behind him (Chapter Eighteen) */
  {id:'stairs',bar:20,bars:1,view:'scene',
   async setup(){await room(18,'stairs18',{upto:'arrest'})}},
  /* the third hour of the night: the escort forms in the yard of the soldiers' quarters by torchlight, the horses ready (Chapter Nineteen) */
  {id:'escort',bar:21,bars:1,view:'scene',
   async setup(){await room(19,'barracks19',{upto:'cmd'})}},
  /* the height: the hearing in the audience hall at Caesarea (Chapter Twenty-One) */
  {id:'hearing',bar:22,bars:1,view:'scene',
   async setup(){await room(21,'hall21',{upto:'festus'})}},
  /* the storm: the deck of the grain ship, which moves with the sea (Chapter Twenty-Two) */
  {id:'storm',bar:23,bars:1,view:'scene',
   async setup(){await room(22,'storm22',{upto:'advised'})}},
  /* the road to Rome draws itself on the map, from Malta by Syracuse, Rhegium and Puteoli: the last map of the game's look back
     (shared/lookback.js, whose roads never cross), drawn as the finale draws it */
  {id:'map',bar:24,bars:1,view:'scene',card:'chapters',
   async setup(){await chapter(Math.max(...Object.keys(CHAP).map(Number)));const[M,L]=await Promise.all([need('map'),need('lookback')]);
     this.i=L.JOURNEYS.length-1;await L.show(this.i,-1);G.cap=null},
   async play(){const M=SHARED.map,L=SHARED.lookback,J=L.JOURNEYS[this.i];
     for(const p of J.parts){for(const k of p.seen||[])M.light(k);if(p.legs.length)await M.trace(p.legs,2500/J.parts.filter(q=>q.legs.length).length,{dots:L.dots});M.light(p.at)}}},
  /* Rome: the lodging, Paul chained by one wrist to a soldier of the watch, Timothy at the table with the pen (Chapter Twenty-Five; a
     watch in the middle of the chapter, not its last scene). Its first flags are carried in from Chapter Twenty-Four and stay unset: the flat */
  {id:'lodging',bar:25,bars:1,view:'scene',
   async setup(){await chapter(25);const C=CHAP[25],A=C.flags;await room(25,'lodging25',{flags:A.slice(C.carry,A.indexOf('q2')+1),at:(C.ent&&C.ent.lodging25)||[160,126,1]})}},
  /* a breath */
  {id:'breath',bar:26,bars:1,view:'black',card:'langs'},
  /* the last turn: the sundial again, from noon to evening (turnDial(1, 2)), so that a day has passed between its two shots; then the
     bench at dawn (Chapter Thirteen) */
  {id:'dial2',bar:27,bars:1,view:'scene',
   async setup(){await room(13,'street13',{upto:'m1'});G.scene=CHAP[13].scenes.dial;G.dial13={a:1,b:2,k:0}},
   async play(){await tween(2900,k=>{G.dial13.k=ease(k)})}},
  {id:'bench',bar:28,bars:1,view:'scene',
   async setup(){await room(13,'shop13',{upto:'hall',at:[150,122,1]})}},
  /* the title: the opening picture, its name over the tentmaker's bench by lamplight, and where to play */
  {id:'title',bar:29,bars:3,view:'title',card:'free',first:1}];

/* ---------- the cuts ---------- */
/* take: a shot of the trailer in another cut: the bar where it begins there and how many it lasts, its card there (none unless it is
   given), its window in an upright film (up), and anything else that differs */
const BY=Object.fromEntries(TRAILER_SHOTS.map(s=>[s.id,s]));
const take=(id,bar,bars,o)=>Object.assign({},BY[id],{bar,bars,card:null},o);
/* w, h: the size of the film; tail: seconds after the last bar (the score's own tail); fade: seconds of the fade from black at the
   beginning, how long before the end the fade to black begins, and how long it takes; up: an upright film (see UPRIGHT) */
const CUTS={
  trailer:{w:1920,h:1080,tail:5,fade:[1.4,2.2,1.8],shots:TRAILER_SHOTS},
  /* The film for a phone's status (2026-11-26; the maintainer chose its length, the window on the picture, the release line and "more
     puzzles, fewer places"): 57 seconds on the short cut of the score (tools/trailer/score.js), whose bars it follows. It does not fade
     in, because a phone shows a film's first frame as its picture in a list. The ney: the voyage, the basket with its narration (the
     window comes from the moon along the wall to the basket), the sundial; the climb: the gameplay beat; the impact and the theme a step
     higher: the Areopagus, and the three puzzles, each seen whole; the height: the donkey on the road (the window walks with it), the
     stairs in Jerusalem, the storm, the road to Rome on the map; the last turn: the lodging in Rome and the bench; the title, with
     the release. What the game keeps small and far stays out of the windows: the image on the Acropolis (the window ends left of it),
     the standards of the hall at Caesarea (that shot is left out) and the swan's neck of the ship's stern (the window stands right of
     it), CONTRIBUTING section 3. */
  status:{w:1080,h:1920,tail:3,up:1,fade:[0,1.3,1.1],shots:[
    take('voyage',0,1,{card:'from',up:{x:[212,222]}}),
    take('wall',1,2,{up:{x:k=>248-140*ease(clamp((k-.05)/.42,0,1))}}),
    take('dial',3,1,{card:'three',up:{x:157}}),
    take('play',4,2,{card:'three',up:{x:184}}),
    take('areopagus',6,1,{up:{x:[184,194]}}),
    /* the three puzzles fill the frame one under the other; their card stands in the timber where the third will come, and goes with it */
    take('board',7,1,{card:'puzzles',up:{s:4,stack:0,cardY:1575}}),
    take('bolt',8,1,{card:'puzzles',up:{s:4,stack:1,cardY:1575}}),
    take('scrolls',9,1,{up:{s:4,stack:2}}),
    /* a little farther along the road than in the trailer, so that the window, which walks with the donkey, has the hills and the sea
       behind the three and not the edge of the picture */
    take('road',10,1,{up:{x(){return -42+420*G.trek.k}},
      async setup(){await scene(3,'road');G.trek={k:.33}},async play(){await tween(3000,k=>{G.trek.k=.33+k*3/17})}}),
    take('stairs',11,1,{up:{x:[224,228]}}),
    take('storm',12,1,{up:{x:218}}),
    take('map',13,1,{up:{x:80}}),
    take('lodging',14,1,{up:{x:[130,136]}}),
    take('bench',15,1,{card:'langs',up:{x:[176,184]}}),
    take('title',16,2,{card:['now','free'],up:{x:165}})]}};
const CUT=CUTS[CUTNAME]||CUTS.trailer,SHOTS=CUT.shots;UP=!!CUT.up;W=CUT.w;H=CUT.h;

/* During a shot the game says only the shot's own lines: a thought or a call that the game would say on its own, at a moment the cut
   does not show whole, is left unsaid (it ends at once, as if clicked away). A shot with free:1 lets the game say what it says. */
let cur=null;
const gameSay=say;
say=function(a,text,o){if(cur&&!cur.free&&!(cur.says||[]).some(x=>x[1]===text))return Promise.resolve();return gameSay.apply(this,arguments)};
/* quiet: no line from before the shot stays on the screen: whatever is being said ends, as a click would end it */
function quiet(){for(let n=0;n<20&&G.skip;n++)G.skip();$('#speech').innerHTML=''}

/* ---------- what the recorder calls ---------- */
const LEN=at(SHOTS.at(-1).bar+SHOTS.at(-1).bars)+CUT.tail;
const startOf=s=>s===SHOTS[0]?0:at(s.bar),endOf=s=>s===SHOTS.at(-1)?LEN:at(s.bar+s.bars);
return{
  ready:()=>typeof G!=='undefined'&&G.splash===1&&!!SHARED.splash&&!!ov.querySelector('h1'),
  plan:()=>{const gaps=[];SHOTS.forEach((s,i)=>{if(i&&s.bar!==SHOTS[i-1].bar+SHOTS[i-1].bars)gaps.push(s.id)});
    return{cut:CUTS[CUTNAME]?CUTNAME:'trailer',cuts:Object.keys(CUTS),w:W,h:H,fps:FPS,length:LEN,gaps,shots:SHOTS.map(s=>({id:s.id,at:startOf(s),len:endOf(s)-startOf(s),first:!!s.first,ui:s.view==='ui',look:s.look||[]}))}},
  /* every line the shots say, for the recorder to find in the game's files */
  lines:()=>SHOTS.flatMap(s=>(s.says||[]).map(x=>({shot:s.id,text:x[1]}))),
  async prepare(i){const s=SHOTS[i];cur=s;__clock.run();ptr=null;ptrEl.style.display='none';view(s);card.className='';card.textContent='';fadeEl.style.opacity=0;
    if(s.setup)await s.setup();if(UP)aimWindow(s,0);await new Promise(r=>setTimeout(r,150));quiet();
    /* the shot's lines must have their translation in this language */
    return(s.says||[]).filter(x=>G.lang!=='en'&&T.peek(x[1])==null).map(x=>x[1])},
  start(i){const s=SHOTS[i];__clock.stop();if(s.play)s.play.call(s).catch(e=>console.error('play '+s.id+': '+(e.stack||e)))},
  /* frame: the trailer's layer at time t of the film: the shot's card, faded in and out, the fade from and to black; and where the
     pointer is, if the shot has one, for the recorder to move the mouse there */
  frame(i,t){const s=SHOTS[i],k=cardKey(s);let i0=i,i1=i;while(k&&i0>0&&cardKey(SHOTS[i0-1])===k)i0--;while(k&&i1<SHOTS.length-1&&cardKey(SHOTS[i1+1])===k)i1++;
    const a=startOf(SHOTS[i0]),e=endOf(SHOTS[i1]),[f0,f1,f2]=CUT.fade;
    /* a scene stays a scene: no script that ends during it hands the game to the player, so nothing that waits for the player is drawn */
    if(s.view!=='ui'&&!s.live){G.busy=true;G.hover=null}
    /* an upright film: where the window stands now, and the game's lines inside the frame */
    if(UP){aimWindow(s,clamp((t-startOf(s))/(endOf(s)-startOf(s)),0,1));keepLines()}
    if(k){card.className=s.view==='black'?'mid':s.view==='title'?'end':'low';cardShow(s);
      const u=s.view==='title'?Math.min(t-a-(UP?1:2.5),e-(UP?1.5:1.8)-t):Math.min(t-a-.25,e-.25-t);card.style.opacity=Math.max(0,Math.min(1,u/.45))}
    else card.style.opacity=0;
    fadeEl.style.opacity=t<f0?1-t/f0:t>LEN-f1?Math.min(1,(t-(LEN-f1))/f2):0;
    if(!ptr)return null;const r={x:Math.round(ptr.x),y:Math.round(ptr.y),click:ptr.click};ptr.click=0;return r},
  /* cursor: paint the game's pointer where the mouse is, as the game would show it there */
  cursor(x,y){const inView=document.elementFromPoint(x,y)?.closest('#view'),kind=inView?pointerKind(G.hover):'default',
    u=UP&&cur?Math.max(3,Math.round(upS(cur)/2)):3,c=pointerArt(u,kind);ptrEl.src=c.toDataURL();ptrEl.style.width=c.width+'px';ptrEl.style.left=(x-c.hx*u)+'px';ptrEl.style.top=(y-c.hy*u)+'px';ptrEl.style.display='block'},
  /* end: a shot of a stack leaves its last picture where it stood (see UPRIGHT): the part of the game's canvas that its window showed */
  end(i){const s=SHOTS[i];if(UP&&s&&s.up&&s.up.stack!=null){const S=upS(s),c=document.createElement('canvas'),g=c.getContext('2d'),q=cv.width/VW,
      x=-parseFloat(root.style.getPropertyValue('--vx'))/S;c.width=W;c.height=VH*S;g.imageSmoothingEnabled=false;
    g.drawImage(cv,x*q,0,W/S*q,VH*q,0,0,W,VH*S);c.style.top=root.style.getPropertyValue('--py');keepEl.appendChild(c)}
    cur=null;__clock.run();ptrEl.style.display='none'},
  info:async ch=>{await loadLevel(ch);setChapter(ch);const C=CHAP[ch],out={rooms:C.rooms,flags:C.flags,ent:C.ent,cast:{}};
    for(const r of C.rooms){const who=st=>{setChapter(ch);for(const k of st)F[k]=1;try{if(C.place)C.place(r)}catch(e){return'place failed'}
      return Object.values(ACT).filter(a=>a.room===r).map(a=>a.id+'@'+Math.round(a.x)+','+Math.round(a.y))};
      out.cast[r]={none:who([]),all:who(C.flags||[])}}return out}}})();
