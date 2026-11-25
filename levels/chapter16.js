/* Paul of Tarsus: level data for Chapter Sixteen, "These Hands".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here: its music and
   ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   From Troas to Miletus (Acts 20:13-38), about 56 C.E., in the spring, after the days of the unleavened bread. Paul has arranged to go
   to Assos on foot, about 32 km, while the others sail ahead round Cape Lectum; his way is shorter, so he can be there in time. They
   take him aboard at Assos and come to Mitylene, the next day level with Chios, the day after to Samos, and a day later to Miletus:
   a coaster that sails by day with a north wind and lies at anchor at night. Paul has decided to sail past Ephesus, so as not to spend
   time in the province of Asia: he is hurrying to be in Jerusalem for Pentecost if he can (20:16). From Miletus he sends to Ephesus for
   the elders of the congregation. When they come he reminds them how he lived among them, and tells them what lies ahead; he shows
   them his hands, which worked for what he and those with him needed, and reminds them of the words of the Lord Jesus, that there is
   more happiness in giving than in receiving. Then he kneels and prays with them all; they weep, embrace him, and go with him to the ship.
   Acts gives no reason for the walk to Assos, and the game gives none. It does not say who carried the message to Ephesus, whether the
   seven carried the gift for Jerusalem (the game's reading, as in Chapter Fifteen), how the gift was watched, that an awning was mended,
   or where by the shore the elders met Paul. The ship's master, his boy, the sailor, the fisherman, the shepherd, Menon the messenger,
   and the elders Euphranor and Polemon are invented; Philon, Kleandros and Damon are the game's own Ephesians from Chapters Thirteen
   and Fourteen. Everything that is said is invented; the end screen says so.
   What the account says is told by the narrator, in paraphrase with its reference (TOLD below), and never put into a mouth as a
   quotation. The narration says "we", as Acts does, all through this chapter. The speech at Miletus (20:18-35) is told, never composed,
   over pictures of Paul speaking; at 20:33, 34 he holds out his hands. The kneeling of 20:36 is shown, heads bowed, arms down or hands folded; the
   tears and the embrace of 20:37, 38 are told while they walk him to the ship.
   Played: Paul on the quay of Troas; then two at once, Paul on the coast road and Luke aboard, and the player swaps between them; Luke
   aboard from Assos to Chios; and Paul at Miletus. Six things are played: the master's three concerns (only true lines on offer); the
   shepherd's split water skin on the pass (wax scraped from a spare leaf of the tablets, a waxed thread, the awl); the north wind, read
   from real signs over the stern in three rounds (a close view); a sailor's raw hands, oiled and bound by the physician; the four night
   watches over the gift's chest (a close view); and at Miletus a torn awning mended for honest pay, which pays the messenger, and the
   list that tells him where to find the elders in Ephesus (a close view).
   Rooms: the quay of Troas, the coast road, the pass, the deck seen from aboard looking aft, the harbor of Assos, the quay of Miletus
   and a shaded place by the shore; the sky over the stern, the night watch and the list are close views. Each is a section of its own
   between "ART <room>: begin" and "ART <room>: end"; what the story reads from a section, and what it takes from one, is named at its
   head. These pictures are placeholders, kept legible, to be painted anew at the coordinates they give.
   No temple, altar, statue or image of a god stands anywhere in this chapter: Assos and Miletus are not among the exception cities
   (CONTRIBUTING section 3). Miletus shows quays, warehouses and, far off across the water, the theater, from outside and empty. */
LEVEL(16,()=>{
"use strict";

/* ==== MUSIC: begin ==== */
/* One tune for a journey that ends in a parting. It is in C sharp, with a minor third and a major sixth and seventh (the scale goes up
   as a minor key does when it climbs): C#, D#, E, F#, G#, A#, B#. It is in bars of eleven, three threes and a two, a bar that walks and
   then catches its step; no earlier chapter has this key or this bar. The tune is four bars long (A B C D): a fifth that leans on the
   sixth and comes down, the same climbing to the seventh and on to the octave, a way down, and the way home.
   On the quay of Troas ("quay") the lyre has it over a low string, and the pipe answers. On the coast road ("road") the oud walks it over
   a hand drum. On the pass ("pass") the pipe has half of it, with long rests, over one low note: the hills are quiet and wide. Aboard by
   day ("sail") the harp rocks under the lyre, and the low string keeps the swell. At anchor in the evening ("anchor") the harp has the tune
   at half its pace, with rests, over a low held note. At Miletus ("miletus") lyre and oud take turns over the drum, the busiest the tune
   gets. By the shore ("shore"), while Paul speaks, only the low string and a pipe far off: the tune's first bar, again and again, never
   finished. At the parting ("parting") the lyre plays the whole of it slowly, and in its last bar it does not come home: it rests on the
   fifth, and the harp holds it there.
   Nothing is claimed about how music was played then. */
const _=null,SCALE=[0,2,3,5,7,9,11],
 /* the tune, a bar to a letter: [step, degree of the scale, length in steps]; E is D left on the fifth; _ is a bar of rest */
 TUNE={A:[[0,4,3],[3,5,3],[6,4,2],[8,2,3]],B:[[0,4,3],[3,6,2],[5,7,1],[6,6,3],[9,4,2]],C:[[0,5,3],[3,4,3],[6,2,3],[9,1,2]],
  D:[[0,2,3],[3,1,3],[6,-1,3],[9,0,2]],E:[[0,2,3],[3,1,3],[6,4,5]],_:[]},
 bars16=s=>[...s].map(k=>TUNE[k]),
 /* what rocks under the tune: a note on each of the four beats of a bar (three threes and a two) */
 ROCK={A:[0,4,2,4],B:[2,4,6,4],C:[-2,2,0,2],D:[-3,1,-1,0],E:[-3,1,4,4]},
 rock16=s=>[...s].map(k=>ROCK[k].map((n,i)=>[i*3,n,i===3?2:3])),
 /* the low string under the four bars of the tune */
 LOW=[[[0,0,6],[6,-3,5]],[[0,2,6],[6,-1,5]],[[0,-2,6],[6,-3,5]],[[0,-3,6],[6,0,5]]],
 /* the same notes in twos, as a walk: every note on a step of two, the last one held to the bar's end */
 WALK=bars16('ABCD').map(b=>b.map(([,n],i)=>[i*2,n,i===b.length-1?11-i*2:2])),
 /* at half its pace: a bar of the tune takes two, every step and every length twice as long */
 half16=(k,at)=>{const o=[];for(const[s,n,l]of TUNE[k]){const S=s*2;o.push([at+Math.floor(S/11),S%11,n,Math.min(l*2,11-S%11)])}return o},
 SLOW=(()=>{const L=Array.from({length:16},()=>[]),put=x=>x.forEach(([b,s,n,l])=>L[b].push([s,n,l]));put(half16('A',0));put(half16('B',4));put(half16('C',8));put(half16('D',12));return L})(),
 MUSIC={dt:.19,steps:11,group:[3,3,3,2],root:49,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['quay'],oct:12,loop:8,lines:bars16('ABCD').concat(rock16('ABCD')),vol:.8},
  {inst:'ney',moods:['quay'],oct:24,loop:8,lines:bars16('____ABCD'),vol:.42},
  {inst:'bass',moods:['quay','sail'],loop:4,lines:LOW,vol:.5},
  {inst:'oud',moods:['road'],oct:12,loop:4,group:[2],lines:WALK},
  {inst:'bass',moods:['road'],loop:4,vol:.45,lines:[[[0,0,6],[6,-3,5]],[[0,2,6],[6,-1,5]],[[0,-2,6],[6,-3,5]],[[0,-3,6],[6,0,5]]]},
  {drum:1,moods:['road'],prog:'AAAB',seq:{A:'d..k..k..t.',B:'d..k..k.kt.'},vol:.32},
  {inst:'ney',moods:['pass'],oct:24,loop:8,lines:bars16('AB__CD__'),vol:.45},
  {drone:[0],every:44,moods:['pass'],vol:.12},
  {inst:'harp',moods:['sail'],oct:12,loop:4,lines:rock16('ABCD'),vol:.55},
  {inst:'lyre',moods:['sail'],oct:12,loop:8,lines:bars16('ABCD____'),vol:.7},
  {inst:'harp',moods:['anchor'],oct:12,loop:16,lines:SLOW,vol:.6},
  {drone:[0],every:88,moods:['anchor'],vol:.1},
  {inst:'lyre',moods:['miletus'],oct:12,loop:8,lines:bars16('ABCD____'),vol:.75},
  {inst:'oud',moods:['miletus'],oct:12,loop:8,lines:bars16('____ABCD'),vol:.8},
  {inst:'bass',moods:['miletus'],loop:4,lines:LOW,vol:.45},
  {drum:1,moods:['miletus'],prog:'AB',seq:{A:'d..k..t..k.',B:'d..k..t.kk.'},vol:.25},
  {inst:'bass',moods:['shore'],loop:4,lines:[[[0,0,11]],[[0,-2,11]],[[0,-3,11]],[[0,-2,11]]],vol:.35},
  {inst:'ney',moods:['shore'],oct:24,loop:8,lines:bars16('A___A___'),vol:.3},
  {inst:'lyre',moods:['parting'],oct:12,loop:16,lines:SLOW.map((b,i)=>i<12?b:i===12?half16('E',0).filter(x=>!x[0]).map(([,s,n,l])=>[s,n,l]):i===13?half16('E',0).filter(x=>x[0]===1).map(([,s,n,l])=>[s,n,l]):[]),vol:.7},
  {inst:'harp',moods:['parting'],oct:12,loop:16,lines:Array.from({length:16},(x,i)=>i<12?[[0,[0,2,-2,-3][(i>>2)&3],11]]:i<14?[[0,4,11]]:[]),vol:.45}]};

/* ---- around you ---- */
/* Sheep bells on the pass are a call of this chapter's own: a few small bells of beaten metal, now one, now two together, never a
   tune. The sea, the gulls, a hull that creaks, wind, birds, leaves and the crowd of a harbor are the engine's. */
const CALLS={
  bells16:[.5,2.6,(t,d)=>{const n=Math.random()<.35?2:1;for(let i=0;i<n;i++){const f=1180+Math.random()*900,u=t+i*(.05+Math.random()*.12);
    [[1,.032,.5],[2.76,.012,.22],[5.4,.006,.1]].forEach(([r,v,l])=>tone({f:f*r,t:u,d:l,type:'sine',v,dest:d}))}}]};
const AMB={quay16:{waves:.4,gulls:.45,wind:.15,creak:.25,crowd:.08},road16:{wind:.35,waves:.18,birds:.25},pass16:{wind:.42,bells16:.6},
  dockd16:{waves:.4,gulls:.4,creak:.4,wind:.15},said16:{waves:.7,wind:.5,creak:.5},morn16:{waves:.35,creak:.3,wind:.25,gulls:.15},eve16:{waves:.3,creak:.25,wind:.08},
  assos16:{waves:.4,gulls:.45,wind:.2,creak:.2},miletus16:{waves:.35,gulls:.4,crowd:.25,creak:.2},list16:{gulls:.2,crowd:.15,waves:.2},
  shore16:{waves:.45,wind:.2,leaves:.3}};
/* ==== MUSIC: end ==== */

/* ============ ART ============ */
/* Placeholders: legible pictures in the manner of Chapter Fifteen (one horizon, light from one side, soft contact shadows, no flat fills
   where a gradient will do), at the coordinates the story uses. Each room is a section of its own; the common section holds the few
   painters that the placeholders share, and may be dropped once every room is painted anew. */

/* ==== ART common16: begin ==== */
/* seaC16: water from the horizon hz down to y1, darker and bluer toward us, with short level ripples (longer far out) and a warm light
   where the sun lies (lx: its x, or null) */
function seaC16(g,hz,y1,r,top,bot,lx,n){g.fillStyle=lg(g,0,hz,0,y1,[top,bot]);g.fillRect(0,hz,320,y1-hz);
  for(let i=0;i<(n||220);i++){const k=Math.pow(r(),1.3),y=hz+.6+k*(y1-hz-1),x=r()*324-2,w=(1.5+k*7)*(.5+r()),warm=lx!=null&&Math.abs(x-lx)<60+k*40&&r()<.7;
    R(g,x,y,w,.5,warm?`rgba(255,238,198,${.25+.4*r()})`:`rgba(24,46,86,${.14+.22*r()})`)}}
/* rockC16: a mass of bare rock above base, its top f(x); facets lit from the upper left */
function rockC16(g,x0,x1,base,f,c,r){ridge(g,x0,x1,base,f,[tint(c,.16),c,tint(c,-.22)]);
  clipTo(g,()=>{const p=[x0,base];for(let x=x0;x<=x1;x+=1)p.push(x,base-f(x));p.push(x1,base);poly(g,p)},()=>{
    for(let i=0;i<(x1-x0)*1.4;i++){const x=x0+r()*(x1-x0),y=base-r()*90,w=2+r()*6;poly(g,[x,y,x+w,y-w*.4,x+w*.8,y+w*.5],r()<.5?rgba(tint(c,.3),.5):rgba(tint(c,-.35),.45))}
    tex(g,'mott',.5,x0,base-100,x1-x0,100,'overlay',.8)})}
/* tinyShipC16: a coaster far off, x its middle, y its waterline, l its length: a dark hull and a small sail; nothing above sy */
function tinyShipC16(g,x,y,l,sail){poly(g,[x-l/2,y-1.2,x+l/2,y-1.6,x+l/2-1,y,x-l/2+1,y],'#4a3a34');if(sail)poly(g,[x-l*.18,y-1.6,x+l*.2,y-1.6,x+l*.16,y-1.6-l*.36,x-l*.14,y-1.6-l*.34],'#e6dcc4')}
/* cap16: words painted on a close view, translated as they are drawn and made to fit their width (the playtest checks G.caps16) */
const FONT16=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
function cap16(g,s,x,y,w,o){o=o||{};s=T(s);let sz=o.sz||5;g.font=FONT16(sz);g.textBaseline='middle';
  while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=FONT16(sz)}const tw=g.measureText(s).width,tx=o.left?x:x-tw/2;
  (G.caps16||(G.caps16=[])).push({s,w:tw,max:w});
  if(o.ink){g.fillStyle=o.ink;g.fillText(s,tx,y);return}
  g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1;g.lineJoin='round';g.strokeText(s,tx,y);g.restore();g.fillStyle=o.c||'#f4e4b8';g.fillText(s,tx,y)}
/* ==== ART common16: end ==== */

/* ==== ART quay16: begin ==== */
/* Troas, the quay, early in the morning after the night of Chapter Fifteen. We look west over the harbor; the sun is up behind the
   city, out of the picture at the right, and the light comes low from there: the house fronts take it aslant, their sides towards the
   harbor are in shade, and every shadow falls to the left. One horizon, y 60 (HZQuay16): the sea, the paving and the foot of the town
   across the water run to it. Painted with SHARED.coast (sky, sea, the town that climbs its hill, the mole, the quay) in one light.
   The coaster lies moored at the left, bow to the right; her mast stands amidships, out of the picture at the left, and her rail is above
   the eye all along, so that she hides the horizon behind her as far as her stem. She is drawn in draw(): she rises and falls a little
   on the swell behind the stone edge of the quay (EDGEQuay16), and her bow line and forestay go with her. Her yard is lowered and lashed
   along the rail, the sail furled on it, with no tie across the roll; no gangplank lies across her hull.
   Across the water the mole runs out low, with nothing upright on it, and the town climbs its hill at the right. The near houses stand
   on the quay at the right, and between the last two of them a lane goes up out of the harbor: the coast road south (the exit).
   Called from outside: ART.quay16 only. Reads F.walk: before the walk begins the gift's chest stands on the quay (variant ''); after it,
   it is aboard (variant 'b').
   Hotspots (ROOMS.quay16): the coaster 0,34,128,66 · the harbor 130,52,90,40 (her stem stands at x 120..128, SXQuay16, so that it
   rises clear of the heads of Aristarchus at 116 and Timothy at 98; the two hotspots were moved with it) · the chest 126,102,26,16 (before the walk) · the coast road
   south 292,36,28,76. Walk strip 16..304, 112..138. Actors (place16): Luke 66,121 · Timothy 98,129 · Aristarchus 116,114 · the master
   176,118 · his boy 198,113 · Trophimus 250,123; Paul comes in at 214,130. Heads come at y 64..90: behind them lie the hull's strakes,
   open water and the plastered fronts, and nothing round. The chest is a prop (foot 126,113,26,4). Gulls (ROOMS.quay16.birds) stand on
   the edge at x 157..166, between the chest and the master, where nobody stands before them. */
const HZQuay16=60,EDGEQuay16=100;
ART.quay16={w:320,q:12,variant:()=>F.walk?'b':'',paint(g,v){paintQuay16(g,v)},light:{amb:'#f6e6d0',sun:[-.62,.14,.42]},draw(g,t){drawQuay16(g,t)},front(){},
  props:[{y:118,shape(g,v){if(v==='')chestQuay16(g,1)},foot:v=>v===''?[[126,113,26,4]]:[]}]};
/* OQuay16: the one light of the picture (shared/coast.js); PQuay16: what the painters return, for draw() */
let OQuay16=null,PQuay16={};const SHIPQuay16=[];
const oQuay16=()=>OQuay16||(OQuay16={w:320,hz:HZQuay16,hour:'morning',sun:[384,0],cloud:.2,wind:SHARED.weather.wind({from:'n',force:2,view:'w'}),seed:1601,y1:EDGEQuay16});
/* ashlarQuay16: coursed stone as the engine's ashlar() lays it, but no joint of a course is set within a pixel and a half of a joint in
   the course above, so that no two joints meet across a bed as a cross. Used for the stone of Assos and Miletus too. */
function ashlarQuay16(g,x,y,w,h,c,r,o){o=o||{};const bw=o.bw||14,bh=o.bh||7,v=o.v==null?.14:o.v,m=o.m||tint(c,-.42);let prev=[];
  inRect(g,x,y,w,h,()=>{R(g,x,y,w,h,m);
    for(let j=0,row=0;j<h;j+=bh,row++){let i=-(row%2?bw*.5:0)-r()*bw*.25;const cur=[];
      while(i<w){let ww=bw*(.75+r()*.5);for(let k=0;k<3&&prev.some(p=>Math.abs(p-(i+ww))<1.6);k++)ww+=1.8;
        const cc=tint(c,(r()-.5)*v*2),X=x+i,Y=y+j;
        R(g,X,Y,ww-.5,bh-.5,cc);R(g,X,Y,ww-.5,.5,tint(cc,.2));R(g,X,Y,.5,bh-.5,tint(cc,.1));R(g,X,Y+bh-1,ww-.5,.5,tint(cc,-.16));
        if(r()<.3)R(g,X+1+r()*Math.max(0,ww-4),Y+1+r()*Math.max(0,bh-3),1+r()*2,.5,tint(cc,-.16));i+=ww;cur.push(i)}prev=cur}
    tex(g,'mott',o.t==null?.4:o.t,x,y,w,h);tex(g,'grain',.1,x,y,w,h,'overlay',.5)})}
function lineQuay16(f,x0,x1,st){const p=[];for(let x=x0;x<x1;x+=st)p.push(x,f(x));p.push(x1,f(x1));return p}
function paintQuay16(g,v){const K=SHARED.coast,O=oQuay16(),r=rng(1601),P=PQuay16={};
  K.sky(g,O);
  /* the early light: the sky still warm and pale low down, and brightest towards the sun at the right */
  pool(g,350,14,220,80,'#ffe2b4',.5,'screen');comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,0,HZQuay16,['rgba(150,150,190,1)','rgba(255,220,180,1)']);g.fillRect(0,0,320,HZQuay16)});
  K.isle(g,126,204,3.4,O,{dist:.84,seed:1602,lean:1.25});
  P.S=K.sea(g,O);
  /* across the water: the town on its hill at the right, coming down to the harbor, and the mole that runs out low in front of it */
  P.T=K.town(g,O,{x0:176,x1:320,base:65,hill:x=>65-Math.min(52,Math.max(0,x-176)*.62)-1.6*Math.sin(x/9),rows:4,size:10,dist:.3,seed:1603,gaps:.22});
  K.quay(g,O,{view:'face',x0:134,x1:206,y:67.8,slope:.07,face:5,c:'#b6a88e',seed:1604,dist:.22});
  for(let i=0;i<8;i++){const x=131.4+i*.9,y=73+(i%3)*.4;R(g,x,y-1.2,1.2,1.4,i%2?'#8a8076':'#a49888')}
  boatsQuay16(g);
  /* the water in the lee of her bow: a little darker, the ripples broken */
  for(let i=0;i<110;i++){const x=127+Math.pow(r(),1.6)*46,y=78+r()*22;if(y<80+(x-128)*.3)continue;R(g,x,y,1.5+r()*5,.5,`rgba(30,42,78,${(.42*(1-(x-127)/48)).toFixed(2)})`)}
  /* the quay: we stand on it; its edge of great blocks runs across, the paving runs back to the horizon */
  K.quay(g,O,{view:'top',y:EDGEQuay16,y1:144,bollards:[134.5,234],bsize:6,seed:1605,c:'#c8b898',rows:6,step:34});
  P.S.open=(x,y)=>y<EDGEQuay16-.5&&!(x<129&&y>40)&&!(x>133&&x<206&&y>66&&y<79)&&y<P.T.top(x)-.5&&x<205;
  wearQuay16(g,r);housesQuay16(g,r);laneQuay16(g,r);thingsQuay16(g,r);
  if(v==='')chestQuay16(g);
  lightQuay16(g)}
/* two small boats under the mole, their masts unstepped, clear of where any head comes */
function boatsQuay16(g){for(const[bx,by,bw]of[[150.6,74.6,6.4],[163,75.8,7.6]]){poly(g,[bx-.4,by-2,bx+1.4,by-1.5,bx+bw-1.6,by-1.5,bx+bw+.4,by-2.2,bx+bw-1,by,bx+1.2,by],'#4a3a30');
  R(g,bx+1.4,by-1.5,bw-3,.5,'#d2a878');R(g,bx+1.2,by+.2,bw-2.4,.5,'rgba(30,36,64,.4)')}}
/* the paving where everybody walks: worn pale along the strip, stained and chipped elsewhere, grit in the joints, damp along the lip */
function wearQuay16(g,r){const S=y=>(y-HZQuay16)/84;
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,108,0,140,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,108,320,32)});
  for(let i=0;i<140;i++){const y=104+Math.pow(r(),.8)*40,k=S(y),x=r()*320;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.15)':'rgba(255,246,224,.16)')}
  for(let i=0;i<20;i++){const y=108+r()*34,k=S(y),x=r()*320;oval(g,x,y,(5+r()*13)*k,(1.2+r()*1.6)*k,r()<.6?'rgba(104,86,70,.1)':'rgba(255,244,220,.09)')}
  for(let i=0;i<80;i++){const y=104+r()*40,x=r()*320;R(g,x,y,.5+r()*(1+S(y)),.5,r()<.3?'rgba(214,186,110,.55)':r()<.5?'rgba(70,58,50,.38)':'rgba(240,230,206,.45)')}
  for(let i=0;i<50;i++){const x=r()*206;R(g,x,EDGEQuay16+3.2+r()*2.4,1+r()*5,.5,r()<.5?'rgba(84,98,68,.3)':'rgba(70,60,56,.24)')}}
/* the near houses on the quay at the right: a house of two stories, a low store beside it, and at the far right, past the lane, a
   tall house cut by the frame. Fronts lit aslant from the right; the sides towards the harbor in shade. Windows are small dark openings
   or shuttered, none barred; doors of upright planks with no band across them. */
function winQuay16(g,x,y,w,h,C,shut){R(g,x-.6,y-.6,w+1.2,h+1.2,tint(C,-.2));R(g,x,y,w,h,shut?'#6e4c2e':'#261c1a');
  if(shut){for(let i=x+1.4;i<x+w-.4;i+=1.6)R(g,i,y,.5,h,'#4e3420');R(g,x,y,w,.5,'#a07a4c')}else R(g,x,y,w,1,'#120c0c');
  R(g,x-1,y+h+.4,w+2,.8,tint(C,.24));R(g,x-1,y+h+1.2,w+2,.4,tint(C,-.36))}
function doorQuay16(g,x,y,w,h,C,r){R(g,x-1,y-1,w+2,h+1,tint(C,-.26));R(g,x-1,y-1,w+2,.6,tint(C,-.45));
  for(let i=0;i<w-.01;i+=2.4){const ww=Math.min(2.4,w-i),c=tint('#7a5634',(r()-.5)*.18);R(g,x+i,y,ww,h,c);R(g,x+i,y,.5,h,tint(c,.2));R(g,x+i+ww-.5,y,.5,h,tint(c,-.35))}
  inRect(g,x,y,w,h,()=>{tex(g,'vert',.25,x,y,w,h,'overlay',.5);ao(g,x,y,w,4,'t',.5);ao(g,x,y,2.4,h,'l',.35)});R(g,x+w-2.4,y+h*.5,1,1,'#2a1e16');
  R(g,x-1.4,y+h-.4,w+2.8,1,tint(C,-.1))}
function housesQuay16(g,r){
  /* the house of two stories: its side towards the harbor first, in shade, then its front */
  const A='#dcc8a4',SA=[203.4,41.6,210,37.8,210,104,203.4,101.4];
  poly(g,SA);g.fillStyle=lg(g,203,0,210,0,['#a8988e','#988a88']);g.fill();
  clipTo(g,()=>poly(g,SA),()=>{tex(g,'mott',.4,202,36,9,70,'overlay',.5);poly(g,[205.2,60,207.8,59,207.8,64.4,205.2,65],'#3a2c2a');ao(g,203,86,7,18,'b',.25,'#3a2c3c')});
  stroke(g,[203.4,41.6,210,37.8],'#d8c8b4',.5);
  plaster(g,210,38,48,66,A,r,{patch:0,cracks:0,t:.4,top:.08,bot:-.1});SHARED.materials.crack(g,252.6,42.6,4,r,.8);SHARED.materials.crack(g,246.4,86,3,r,.6);
  R(g,209.4,35.4,49.2,2.8,tint(A,.14));R(g,209.4,35.4,49.2,.5,'#fff4dc');R(g,210,38.2,48,.6,tint(A,-.34));
  for(let x=214;x<256;x+=6.4){R(g,x,40,1.6,1.4,'#6a4a2c');R(g,x,40,1.6,.5,'#b48a56');R(g,x-1.4,41.4,1.6,1.6,'rgba(70,58,96,.22)')}
  R(g,210,70.2,48,.8,tint(A,-.22));R(g,210,71,48,.4,tint(A,.2));
  winQuay16(g,216,48,4.4,6,A,0);winQuay16(g,229,48,4.4,6,A,1);winQuay16(g,246,48,4.4,6,A,0);winQuay16(g,238.6,79,4.2,5.2,A,1);
  doorQuay16(g,218.6,85,9,19,A,r);
  /* the light: warm from the right across the front, cooler towards its corner on the harbor side */
  comp(g,'multiply',.45,()=>{g.fillStyle=lg(g,210,0,258,0,['rgba(150,146,188,1)','rgba(150,146,188,0)']);g.fillRect(210,36,48,68)});
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,226,0,258,0,['rgba(255,214,150,0)','rgba(255,214,150,1)']);g.fillRect(226,36,32,68)});
  ao(g,210,90,48,14,'b',.24,'#5a4030');
  /* the low store beside it, a step back: a wide doorway dark inside, a bench and baskets before it, its roof edge of poles */
  const B='#d4c09a';plaster(g,258,52,32,52,B,r,{patch:0,cracks:0,t:.4,top:.06,bot:-.12});SHARED.materials.crack(g,284.6,54.6,3,r,.6);
  R(g,257.6,49.4,32.8,2.8,tint(B,.12));R(g,257.6,49.4,32.8,.5,'#fff2d6');ao(g,258,52.2,32,2.4,'t',.3,'#3a3048');
  R(g,264,76,16,28,tint(B,-.28));g.fillStyle=lg(g,0,77,0,104,['#140e0c','#24180f','#3a2a1e']);g.fillRect(265,77,14,27);
  inRect(g,265,77,14,27,()=>{vessel(g,270,103.6,3.8,11,'#6a3e26','jar',{noShadow:1});comp(g,'multiply',.6,()=>R(g,265,77,14,27,'#40364a'));poly(g,[274,104,279,104,279,96,276,98],'rgba(196,150,96,.45)')});
  R(g,263.4,103,17.2,1.4,'#b8a88a');R(g,263.4,103,17.2,.5,'#eadcc0');
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,258,0,290,0,['rgba(150,146,188,1)','rgba(150,146,188,.2)']);g.fillRect(258,49,32,55)});
  ao(g,258,92,32,12,'b',.22,'#5a4030');
  /* the shade the house of two stories throws along the store's front */
  shade(g,[258,52,262,52,262,104,258,104],'#a29ac4',.4)}
/* the lane that goes up out of the harbor between the store and the tall house, and the house at its head, in the sun; the tall house
   itself, of which we see a strip of its front and its side towards the lane, in shade */
function laneQuay16(g,r){const C='#e2cea8',FL=[290,104,309,104,305,71,297.6,71],LW=[290,104,297.6,71,297.6,55.8,290,52.2],RW=[309,104,305,71,305,30.8,309,24];
  /* the house at its head */
  plaster(g,295,40,12,32,C,r,{patch:0,cracks:0,t:.4});R(g,294.6,38.6,12.8,1.6,tint(C,.16));R(g,294.6,38.6,12.8,.5,'#fff6dc');
  R(g,299.4,46,2.4,3.2,'#2a2020');R(g,300.4,62.6,3.4,8.4,'#3a2a1e');R(g,300,62.2,4.2,.5,tint(C,-.3));
  /* the lane's floor: beaten earth and old paving, climbing, in the shade of the tall house except a slant of sun at its head */
  poly(g,FL);g.fillStyle=lg(g,0,71,0,104,['#b8a890','#a89a86','#b4a48a']);g.fill();
  clipTo(g,()=>poly(g,FL),()=>{for(let y=72,d=1;y<104;d*=1.12,y+=d+1.2){R(g,288,y,24,.5,'rgba(70,58,72,.3)');R(g,288,y+.5,24,.4,'rgba(255,240,214,.12)')}
    tex(g,'mott',.35,288,70,24,36,'overlay',.5);poly(g,[297.6,71,302,71,299,78,297.6,78],'rgba(255,226,170,.35)')});
  /* the store's side towards the lane takes the sun; the tall house's side is in shade */
  poly(g,LW);g.fillStyle=lg(g,290,0,298,0,['#f0d8a8','#e2c898']);g.fill();
  clipTo(g,()=>poly(g,LW),()=>{tex(g,'mott',.35,289,50,10,56,'overlay',.5);ao(g,290,90,8,14,'b',.2,'#6a4a34')});
  stroke(g,[290,52.2,297.6,55.8],'#fff2d0',.5);
  poly(g,RW);g.fillStyle=lg(g,305,0,309,0,['#a29492','#948688']);g.fill();
  clipTo(g,()=>poly(g,RW),()=>{tex(g,'mott',.4,304,22,6,84,'overlay',.5);poly(g,[306,50,308,48.6,308,55,306,56],'#342826')});
  shade(g,FL,'#9a94c0',.5);
  /* the tall house: a strip of its front, three stories, with the sun on it */
  const T='#e6d2ac';plaster(g,309,24,12,80,T,r,{patch:0,cracks:0,t:.4});R(g,308.6,21.6,12,2.6,tint(T,.14));R(g,308.6,21.6,12,.5,'#fff6dc');
  winQuay16(g,313,32,3.6,5,T,1);winQuay16(g,313,56,3.6,5,T,0);R(g,309,24,.6,80,'#fff2d4');
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,309,0,320,0,['rgba(255,214,150,.3)','rgba(255,214,150,1)']);g.fillRect(309,20,11,84)});
  ao(g,309,92,11,12,'b',.22,'#5a4030')}
/* what stands on the quay behind the walk strip: sacks of the cargo before the hull, baskets and a jar at the house's foot; their
   shadows run long to the left */
function sackQuay16(g,x,y,w,h,c,k){const P=[x-w,y,x-w*1.1,y-h*.42,x-w*.74,y-h*.8,x-w*.3+k,y-h*.9,x-w*.42+k*1.6,y-h,x+w*.36+k*1.6,y-h*1.03,x+w*.28+k,y-h*.9,x+w*.74,y-h*.78,x+w*1.08,y-h*.4,x+w,y];
  poly(g,P);g.fillStyle=lg(g,x-w,0,x+w,0,[tint(c,-.34),c,tint(c,.2)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.3,x-w-1,y-h-1,w*2+2,h+2,'overlay',.5);stroke(g,[x+w*.5+k,y-h*.84,x+w*.72,y-h*.4],tint(c,.3),.5);ao(g,x-w-1,y-h*.3,w*2+2,h*.3,'b',.3,'#3a2c3c')})}
function thingsQuay16(g,r){const SH='rgba(44,38,76,.3)';
  /* sacks of the cargo, waiting to go aboard */
  poly(g,[44,108.4,30,107.6,14,108.2,18,110.6,48,110.6],SH);
  sackQuay16(g,34,110,4.4,9.6,'#c2aa7e',-.4);sackQuay16(g,43.6,110.4,4,8.4,'#b49a70',.4);
  /* round baskets of fish-traps and a jar by the door of the house; their shadows to the left */
  for(const[x,y,w,h]of[[214,106,4.2,6],[223,105.4,3.6,5],[244,106,3.4,8.4]])poly(g,[x,y+.4,x-w-h*1.6,y-.2,x-w-h*1.6,y-1.2,x-w*.4,y-1.6],SH);
  for(const[x,y,w,h,c]of[[214,106,4.2,6,'#b8925a'],[223,105.4,3.6,5,'#a8844e']]){poly(g,[x-w,y,x-w-.4,y-h*.7,x-w*.7,y-h,x+w*.7,y-h,x+w+.4,y-h*.7,x+w,y]);
    g.fillStyle=lg(g,x-w,0,x+w,0,[tint(c,-.3),c,tint(c,.22)]);g.fill();
    for(let k=1;k<4;k++)R(g,x-w+.2,y-h+k*h/4,w*2-.4,.5,tint(c,-.28));R(g,x-w*.7,y-h,w*1.4,.6,tint(c,.3));oval(g,x,y-h+.2,w*.62,.6,'#3a2a1c')}
  vessel(g,244,106,3.4,8.4,'#a4643c','amph',{noShadow:1});
  /* a gull's feather and some straw blown against the house */
  for(let i=0;i<10;i++){const x=200+r()*12;R(g,x,104.4+r()*1.4,1.5+r()*3,.5,'rgba(226,208,168,.5)')}}
/* the gift's chest on the quay, ready to go aboard: dark wood, a lid of two boards, iron only at its corners, a soft shadow falling to
   the left. With cut, its outline only. */
function chestQuay16(g,cut){const x=127,y=104,w=26,h=13;
  if(cut){R(g,x-.6,y-1.4,w+1.2,h+1.4,'#000');return}
  poly(g,[x+2,y+h,x+w,y+h,x+w-8,y+h-3.6,x-14,y+h-2.6,x-12,y+h],'rgba(44,38,76,.32)');oval(g,x+w/2,y+h-.2,15,1.6,'rgba(30,26,46,.3)');
  /* the body, its front in grazing light from the right */
  R(g,x,y,w,h,'#5e3e24');inRect(g,x,y,w,h,()=>{g.fillStyle=lg(g,x,0,x+w,0,['#4a3020','#6b482a','#7e5632']);g.fillRect(x,y,w,h);tex(g,'wood',.3,x,y,w,h,'overlay',.6);
    for(const yy of[y+5,y+9])R(g,x,yy,w,.5,'rgba(30,18,10,.5)');ao(g,x,y+h-3,w,3,'b',.35,'#1a1008')});
  /* the lid, a little wider, its top edge in the light */
  R(g,x-.6,y-1.4,w+1.2,2.4,'#7a5434');R(g,x-.6,y-1.4,w+1.2,.6,'#d4a26a');R(g,x-.6,y+.6,w+1.2,.5,'#2e1e12');
  /* iron at the corners, and the plate of the lock */
  for(const cx of[x-.6,x+w-2])R(g,cx,y-1.4,2.6,h+1.4,'#3a3436');R(g,x+w-2,y-1.4,.5,h+1.4,'#8a8686');R(g,x,y-1.4,.5,h+1.4,'#5a5658');
  R(g,x+w/2-1.6,y+1.2,3.2,3,'#3a3436');R(g,x+w/2-1.6,y+1.2,3.2,.5,'#8a8686');R(g,x+w/2-.4,y+2.4,.8,1,'#141012')}
/* the light of early morning: warm from the right, cool in the corner nearest us at the left, where the hull and the city still shade it */
function lightQuay16(g){
  /* the long shadow of the house of two stories, laid along the quay to its left */
  shade(g,[203.4,101.4,210,104,214,106,160,111,126,110.4,148,104.6],'#a49ec8',.34);
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(196,170,180,.7)','rgba(255,214,160,.6)','rgba(255,204,136,1)']);g.fillRect(0,0,320,144)});
  ao(g,0,124,320,20,'b',.14,'#2a2050');ao(g,0,100,60,44,'l',.12,'#2a2050')}
/* the coaster: her bow, the rest of her and her mast out of the picture at the left. Painted once, by the shared ship painter, and set
   into the picture by draw() a little up or down with the swell. Her strakes sweep up to the stem with her sheer, each a little flatter
   than the one above; the butts of her planks stop inside their own strakes. The same ship lies at Assos and at Miletus with her bow
   to the left: there the picture is turned (shipQuay16(1) is lit for that: its light comes from her stern, which is the right side
   once it is turned), and drawn by those rooms' draw() in the same way. */
const railQuay16=x=>58.5-9*Math.pow(clamp(x/110,0,1),2.4);
function shipPaintQuay16(g,turned){const r=rng(1606),S=railQuay16,
    IN=[110.6,46.4,112.6,51,114.2,59,114.4,70,113.2,82,111.2,93,109.6,102],OUT=[115.2,46,117.2,49.4,118.2,58,118,70,116.8,82,114.6,93,112.6,102],
    hull=lineQuay16(S,-12,110,2).concat(IN,[109,106,-12,106]);
  SHARED.ship.paint(g,{r,dir:1,view:'bow',x0:0,x1:116,yBot:102,sheer:S,palette:'lit',gradY0:48,gradY1:102,
    hullPath:()=>poly(g,hull),
    damped:{x0:-12,x1:116,damp:.075,yRef:58.5,step:4.3,count:10},
    pitch:'rgba(34,20,14,.5)',wale:'#8a4a34',waleWear:{count:30,xSpan:112,c1:'#96703f',c2:'#b0705a'},
    lowerWale:{color:'#4c321e',hi:'#c0925a'},beams:[16,50,90],
    butts:[[2,30],[2,80],[3,54],[3,100],[5,22],[5,70],[6,44],[6,92],[7,14],[7,62],[8,36],[8,86],[9,52]],
    scuppers:[38,74],
    texRect:{x:-12,y:44,w:132,h:60},woodScale:.2,woodAlpha:.5,mottScale:.34,mottAlpha:1,
    sunGlow:turned?{x0:-12,x1:60,stops:['rgba(255,220,160,.22)','rgba(255,220,160,0)'],rx:-12,ry:44,rw:72,rh:60}:{x0:56,x1:118,stops:['rgba(255,220,160,0)','rgba(255,220,160,.26)'],rx:56,ry:44,rw:62,rh:60},
    turnShade:turned?{x0:74,x1:116,stops:['rgba(52,40,76,0)','rgba(52,40,76,.46)'],rx:74,ry:44,rw:44,rh:60}:{x0:-12,x1:46,stops:['rgba(52,40,76,.34)','rgba(52,40,76,0)'],rx:-12,ry:44,rw:58,rh:60},
    aoY:90,aoHeight:12,aoA:.3,postsBeforeRail:1,
    stem:{IN,OUT,grad:turned?['#b08250','#74502e','#3e2818']:['#5e3e24','#8a6038','#c49058'],gradX0:110,gradX1:118.4,ao:false,wood:false,rim:false,capRect:[110.8,45.8,4.4,.8],capCol:'#f0c88a'},
    rail:{strokeOnly:1,x0:-12,x1:110.4,step:2,hi:'#f2d098',w:1},
    furledYard:{x0:-12,x1:79,yardX0:-12,yardX1:92,gaskets:[-16,-4,8,20,31,42,52,61,70,79],shadowX0:-12,shadowX1:82}})}
/* the sprite reaches from x -12 to 124 of her own coordinates (her stem at 110..118), and 12 above the picture's top */
const shipQuay16=turned=>SHIPQuay16[turned?1:0]||(SHIPQuay16[turned?1:0]=bake(136,g=>{g.translate(12,12);shipPaintQuay16(g,turned)},12,120));
/* SXQuay16: how far right of her own coordinates she lies on the quay of Troas, so that her stem stands clear of the heads before her */
const SXQuay16=10;
/* what moves: the sea, the coaster on the swell behind the quay's edge with her forestay and bow line, light on the water, and the
   smoke of a hearth in the town, which the north wind lays over to the left */
const GLQuay16=(()=>{const r=rng(1611),a=[];for(let i=0;i<30;i++)a.push([128+r()*76,HZQuay16+12+r()*26,1+r()*3,r()*6.28,300+r()*500]);return a})();
function drawQuay16(g,t){const P=PQuay16,O=OQuay16,dy=Math.round(Math.sin(t/1500)*2)/2-2;
  if(P.S)P.S.draw(g,t);
  for(const[x,y,w,ph,sp]of GLQuay16){const k=Math.sin(t/sp+ph);if(k>.6)R(g,x,y,w,.5,'rgba(255,250,230,'+((k-.6)*2).toFixed(2)+')')}
  inRect(g,0,0,140,EDGEQuay16,()=>g.drawImage(shipQuay16(),SXQuay16-12,dy-12,136,120));
  /* the forestay from the stem head up to the mast, across the sky only */
  stroke(g,[123,46.6+dy,34,-10+dy],'#5a4a3c',.6);stroke(g,[122.6,46.2+dy,33.6,-10.4+dy],'rgba(255,236,196,.45)',.3);
  /* the bow line: out through her bow below the level of the eyes, beside the stem, sagging down to its bollard */
  for(const[c,w]of[['#4a3a2a',1.2],['#d6c498',.6]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(127.6,66+dy);g.quadraticCurveTo(127,92,131.8,98.8);g.stroke()}
  /* the smoke of a hearth on the roof of the house of two stories, rising from behind its parapet */
  if(O)SHARED.weather.smoke(g,t,250,35,O.wind,{h:18,a:.6,c:'#b8b2ae',sh:'#6e6a7a'})}
/* ==== ART quay16: end ==== */

/* ==== ART road16: begin ==== */
/* The coast road south of Troas, in the morning. The sea lies to the west, at the right of the picture behind the low ground; the hills
   rise at the left. Far off at the right, the land of the cape runs out into the sea, and once the ship has sailed (F.w1, before she is
   in at Assos) she is seen small against that land, under its ridge, so that nothing of her stands across the open horizon.
   One horizon, y 58 (HZRoad16). At x 200 the road forks: the upper path climbs to the right toward the hill (exit 246,66,60,46), the
   lower goes down to the shore at the right edge (exit 286,116,34,28). The way back to Troas is the left edge.
   Called from outside: ART.road16. Reads F.w1 and F.la (the ship far off). Hotspots: the sea 100,50,220,24 · the cape 196,36,100,22 ·
   the hill path · the shore path · back to Troas 0,70,16,70 · the fisherman (actor, seated on a stone at 150,117; his stone is a prop
   with foot 144,114,12,4). Walk strip 16..304, 112..138. */
const HZRoad16=58;
/* The picture is painted with the shared painters (shared/coast.js and shared/country.js) in one light: the morning sun stands behind us,
   low in the east over the hills, so the slopes that face the sea are lit and every shadow falls away from us and a little to the right.
   ORoad16 is the one options object for the whole picture; the sea's motion (SRoad16) is kept from paint for draw. */
const ORoad16={w:320,hz:HZRoad16,hour:'morning',cloud:.24,streak:.3,seed:1621,light:-1,swell:-.2};
let SRoad16=null,CapeRoad16=null;
ART.road16={w:320,q:12,paint(g){paintRoad16(g)},light:{amb:'#f8ecd8',sun:[.5,.3,.45]},draw(g,t){drawRoad16(g,t)},front(){},
  props:[{y:117,shape(g){stoneRoad16(g,1)},foot:[[143,114,14,3]],seat:1}]};
/* the hill at the left: its brow from the picture's edge down to the low ground by the sea */
const hillRoad16=x=>x<0?30:x>210?999:30+Math.pow(x/210,1.5)*66+3*Math.sin(x/13)+1.6*Math.sin(x/4.7);
/* the spur at the right that the upper path climbs: its top, falling to the road */
const spurRoad16=x=>x<224?999:112-Math.min(48,Math.pow((x-224)/96,.8)*48)+1.4*Math.sin(x/6)+.8*Math.sin(x/2.3);
function paintRoad16(g){const K=SHARED.coast,CO=SHARED.country,O=ORoad16,HZ=HZRoad16;
  if(!O.wind)O.wind=SHARED.weather.wind({from:'n',force:2,view:'w'});const L=K.light(O);
  K.sky(g,O);
  /* the land of the cape, far off at the right, and a low island on the horizon at the left of it */
  CapeRoad16=K.isle(g,176,320,15,O,{kind:'cape',from:'r',dist:.56,seed:1622});
  K.isle(g,118,160,2.4,O,{dist:.86,seed:1623});
  SRoad16=K.sea(g,Object.assign(O,{y1:104}));SRoad16.open=(x,y)=>y<HZ+28+x*.02&&y<hillRoad16(x)-1&&y<spurRoad16(x)-2;
  /* the hills behind the hill: a far range, hazy, rising out of the picture at the left */
  K.land(g,L,.45,q=>CO.range(q,-10,150,HZ+1,x=>Math.max(0,34-x*.24+4*Math.sin(x/17)),['#8c8e7c','#a2a08c'],{k:.8,light:-1}));
  /* a narrow shingle beach under the slope, where the low ground meets the water */
  K.shore(g,O,{x0:128,x1:320,edge:x=>HZ+24+x*.02+1.2*Math.sin(x/9),y1:HZ+40,kind:'shingle',seed:1624});
  /* the low ground between the hill's foot and the beach: turf, dry in places, with scrub and three olives */
  K.land(g,L,0,q=>{const lowTop=x=>HZ+29+x*.02+1.4*Math.sin(x/11),T=[-2,112];for(let x=-2;x<=322;x+=2)T.push(x,lowTop(x));T.push(322,112);
    clipTo(q,()=>poly(q,T),()=>CO.turf(q,-2,HZ+26,324,112,'#8e955e',1626,{dry:.45,wind:1,scale:.7,flowers:6}))});
  /* the hill at the left: a slope of turf and scrub over bedded rock, with outcrops where the rock comes through */
  K.land(g,L,0,q=>{const P=[-2,114,-2,hillRoad16(0)];for(let x=0;x<=214;x+=2)P.push(x,Math.min(hillRoad16(x),112));P.push(214,114);
    clipTo(q,()=>poly(q,P),()=>{CO.turf(q,-2,26,218,114,'#8a8c58',1635,{dry:.55,wind:1,scale:.8});
      /* outcrops: ledges of the bedded rock that break through the turf, ragged above, sunk into the grass below */
      for(const[x0,w,y0,h,sd]of[[4,40,44,16,1636],[74,30,62,11,1637],[20,26,80,10,1638],[132,24,82,8,1639],[100,16,46,6,1645]]){const rr=rng(sd),o=[];
        for(let i=0;i<=10;i++){const u=i/10;o.push(x0+u*w,y0+h*(.55-.45*Math.sin(Math.PI*u))-rr()*h*.35)}for(let i=10;i>=0;i--){const u=i/10;o.push(x0+u*w,y0+h*(.75+.25*Math.sin(Math.PI*u))+rr()*h*.15)}
        CO.crag(q,o,'#b4a486',sd,{light:-1,dip:.1,bed:3.6,scrub:3});
        for(let i=0;i<w*.8;i++)CO.tuft(q,x0+rr()*w,y0+h*(.7+.3*rr()),1.2+rr()*2,'#8a8c58',rr)}
      /* the flank that falls toward the sea turns from the sun, and a cloud's shadow drifts over the slope */
      comp(q,'multiply',.55,()=>{q.fillStyle=lg(q,90,0,214,0,['rgba(255,255,255,0)','#c8c4d8','#a8a4c4']);q.fillRect(90,26,126,88)});
      pool(q,70,64,44,9,'#7a7aa0',.3,'multiply');pool(q,150,90,30,5,'#8a88a8',.22,'multiply');
      comp(q,'source-over',1,()=>{q.fillStyle=lg(q,0,26,0,100,[rgba('#b8c6d4',.4),rgba('#b8c6d4',.12),rgba('#b8c6d4',0)]);q.fillRect(-2,26,220,88)});
      /* the scrub grows in patches, thicker in the folds of the slope: each patch a few bushes of its own size that run together */
      const r=rng(1643);for(let i=0;i<30;i++){const cx=r()*214,cy=hillRoad16(cx)+4+r()*(108-hillRoad16(cx)),k=(cy-30)/80;if(cy>108)continue;
        const n=1+Math.floor(r()*4);for(let j=0;j<n;j++){const x=cx+(r()-.5)*(4+k*10),y=cy+(r()-.5)*(2+k*5),sz=.6+r()*.7;CO.bush(q,x,y,(3+k*7)*sz,(1.8+k*3.2)*sz,j%2?'#56683e':'#61714a',1700+i*7+j,{light:-1})}}});
    stroke(q,P.slice(2,P.length-2),rgba('#fff2d0',.25),.5);
    for(const[x,y,w,h]of[[132,94,10,4],[176,99,14,5],[206,92,9,3.6],[252,98,12,4.6],[108,106,12,5],[226,104,10,4]])CO.bush(q,x,y,w,h,'#5e7448',x*7+y,{light:-1});
    CO.tree(q,58,98,30,null,{kind:'olive',seed:1627,light:-1,lean:.4});
    CO.tree(q,190,101,22,null,{kind:'olive',seed:1628,light:-1,lean:-.3});
    CO.tree(q,236,95,13,null,{kind:'olive',seed:1629,light:-1})});
  /* the spur at the right, its rock in the morning light with scrub in its hollows, and the upper path that climbs it in two bends,
     worn pale, with loose stones along its edges */
  K.land(g,L,0,q=>{const P=[224,113];for(let x=224;x<=322;x+=2)P.push(x,spurRoad16(x));P.push(322,113);
    CO.crag(q,P,'#b4a284',1630,{light:-1,dip:-.14,bed:5,scrub:16});
    for(const[x,y,w,h]of[[262,92,10,4],[306,80,9,3.4],[284,106,12,4.4],[246,104,8,3]])CO.bush(q,x,y,w,h,'#566a42',x*5+y,{light:-1});
    const mid=[[226,112.5,9],[246,109,7],[264,101,5.6],[276,92,5],[284,84,4.4],[296,78,4],[306,72,3.4],[314,69,3]],Lf=[],Rt=[];
    for(const[x,y,w]of mid){Lf.push(x-w*.3,y-w*.42);Rt.unshift(x+w*.3,y+w*.42)}
    const up=Lf.concat(Rt);poly(q,up,'#cdb68c');
    clipTo(q,()=>poly(q,up),()=>{CO.ground(q,220,64,100,118,'#d0ba90',1631,{n:26,size:.45});ao(q,220,64,100,54,'l',.16,'#2a2440')});
    stroke(q,Rt.slice(),rgba('#3a3040',.28),.5);stroke(q,Lf.map((v,i)=>i%2?v+.5:v),rgba('#fff4dc',.35),.5);
    for(let i=0;i<mid.length-1;i++){const[x,y,w]=mid[i];CO.boulder(q,x+w*.55,y+w*.5,1.6+w*.28,1+w*.16,'#a89c86',1642+i,{light:-1});if(i%2)CO.boulder(q,x-w*.5,y-w*.3,1.2+w*.2,.8+w*.12,'#ac9e86',1652+i,{light:-1})}});
  /* the road along the strip: worn earth with two ruts, loose stones and dry tufts along its edges, and the lower path that leaves it at
     the right edge for the shore */
  K.land(g,L,0,q=>{CO.ground(q,0,110,320,144,'#bea880',1632,{n:70,size:.8,tufts:22});
    pool(q,96,128,60,6,'#8a7a96',.18,'multiply');pool(q,240,118,40,4,'#8a7a96',.14,'multiply');pool(q,30,134,40,4,'#fff2d6',.2,'screen');
    {const r=rng(1644);for(let i=0;i<46;i++){const x=r()*320,y=125.5+(x-160)*.012+.8*Math.sin(x/37)+r()*2.4;CO.tuft(q,x,y,1+r()*1.8,r()<.5?'#9a9a5e':'#b0a46a',r)}}
    for(const f of[121,131]){const rp=[];for(let x=-2;x<=322;x+=4)rp.push(x,f+(x-160)*.012+.8*Math.sin(x/37));stroke(q,rp,rgba('#5a4636',.2),1.2);stroke(q,rp.map((v,i)=>i%2?v+.7:v),rgba('#fff2d6',.14),.5)}
    const dn=[246,138,276,128,300,126,322,124,322,146,240,146];poly(q,dn,rgba('#c8b48e',.8));clipTo(q,()=>poly(q,dn),()=>CO.ground(q,240,122,82,146,'#c4ae88',1633,{n:24,size:1.1}));
    const vg=[-2,107];for(let x=-2;x<=322;x+=3)vg.push(x,111.5+1.2*Math.sin(x/7)+.8*Math.sin(x/2.9));vg.push(322,107);
    clipTo(q,()=>poly(q,vg),()=>CO.turf(q,-2,104,324,114,'#8e955e',1640,{dry:.6,wind:1,scale:.6}));
    const fv=[-2,146];for(let x=-2;x<=246;x+=3)fv.push(x,140.5+1.2*Math.sin(x/6)+.8*Math.sin(x/2.3));fv.push(246,146);
    clipTo(q,()=>poly(q,fv),()=>CO.turf(q,-2,138,250,146,'#8a8e58',1641,{dry:.6,wind:1,scale:1}));
    for(let x=4;x<224;x+=5+((x*7)%5))CO.tuft(q,x,112.5+((x*3)%3),1.6+((x*13)%9)/4,'#a89a62',rng(x))});
  stoneRoad16(g)}
/* the fisherman's stone beside the road, low and wide (cut: its outline only, for the prop) */
function stoneRoad16(g,cut){SHARED.country.boulder(g,150,117,15,6.4,'#a69a84',1634,{light:-1,cut:!!cut})}
/* the coaster far off, under the ridge of the cape: a dark hull, a small sail and her wake, in the haze of her distance */
function shipRoad16(g,x,y,t){const H='#3e3640',S2='#f2ead8';poly(g,[x-4.6,y-1.2,x+4.4,y-1.8,x+3.6,y,x-3.8,y],H);R(g,x-4.2,y-1.4,8.4,.5,'#7a6e70');
  poly(g,[x-1.6,y-1.8,x+2,y-1.8,x+1.7,y-5.6,x-1.3,y-5.3],S2);poly(g,[x+.6,y-1.8,x+2,y-1.8,x+1.7,y-5.6,x+.8,y-5.5],'#c4bcae');
  const k=.5+.5*Math.sin(t/500);R(g,x-5-k,y-.2,1.4,.5,rgba('#f0f0ea',.5));R(g,x-8,y,1.2,.5,rgba('#f0f0ea',.3))}
function drawRoad16(g,t){if(SRoad16)SRoad16.draw(g,t);if(F.w1&&!F.la)shipRoad16(g,238,HZRoad16+1.2+.15*Math.sin(t/900),t)}
/* ==== ART road16: end ==== */

/* ==== ART pass16: begin ==== */
/* The stony pass over the hill, later in the morning. Far to the south, beyond the slopes, the gulf, and Lesbos low on its horizon.
   One horizon, y 50 (HZPass16). The path comes in at the left; at the right it goes down among rocks toward Assos (exit
   266,60,54,52), and there, before the water skin is mended (!F.pass), the flock stands packed on it. The stone trough lies at the back
   of the strip, long and low; the spring is up among the rocks behind it, a dark wet streak and no more.
   Called from outside: ART.pass16, ROOMS.pass16.block (the sheep that stand in the strip), FLOCKPass16 and EWEPass16 (where the sheep
   and the ewe stand, for their hotspots). Reads F.pass. Hotspots: the gulf and Lesbos 40,24,220,26 · the spring 196,78,26,16 · the trough
   166,104,40,14 · the water skin 206,117,18,8 (before it is mended) · the flock (where it stands) · the ewe · the way down to Assos · the
   way back 0,60,16,80 · the shepherd (actor, 136,119). Walk strip 16..304, 112..138. The trough is a prop (foot 167,112,38,4). */
const HZPass16=50;
/* Painted with the shared painters in one light: the sun is high in the east, at the left behind the rock, so the faces turned to the
   left are lit, the right-hand rock stands half in its own shade, and shadows fall to the right. OPass16 is the picture's one options
   object. The sheep are SHARED.beasts' ewes and lambs (SHARED.beasts.flock gives their looks), drawn in the room's depth: the flock
   grazes, and the ewe of the joke chews (frames 22 and 23) and looks at whoever comes. */
const OPass16={w:320,hz:HZPass16,hour:'morning',cloud:.18,streak:.2,seed:1661,light:-1};
let SPass16=null;
/* each sheep: where its hooves stand, the way it faces, and what it does (0 stands, 1 grazes, 2 chews). Those that stand behind graze with
   their heads down, so that no head lies over the body of another */
const FLOCKPass16=()=>F.pass?[[16,100,1,0],[52,99,-1,2],[94,101,1,1],[34,110,1,1],[72,110,-1,1]]:[[276,90,-1,0],[304,86,1,0],[294,104,1,1],[206,114,-1,1],[266,118,-1,0]];
const EWEPass16=()=>F.pass?[122,106,-1]:[236,124,-1];
let LOOKPass16=null;
ART.pass16={w:320,q:12,variant:()=>F.pass?'p':'',paint(g,v){paintPass16(g,v)},light:{amb:'#fcf0dc',sun:[.45,.3,.5]},draw(g,t){drawPass16(g,t)},front(){},
  props:[{y:117,shape(g,v){troughPass16(g,v,1)},foot:[[167,112,38,4]]}]};
/* the rock at the left, high where it leaves the picture; the rock at the right, with the saddle beyond it where the way goes down */
const leftPass16=x=>x>172?999:12+Math.pow(x/150,1.3)*62+(x>136?Math.pow(x-136,2)*.03:0)+4*Math.sin(x/9)+2*Math.sin(x/3.7);
const rightPass16=x=>x<168||x>298?999:(x<180?110-(x-168)/12*30:x<250?80-Math.pow((x-176)/74,.7)*40:x<282?40+2*Math.sin((x-250)/5):40+Math.pow((x-282)/16,1.4)*30)+2.4*Math.sin(x/8)+1.4*Math.sin(x/3.1);
function paintPass16(g,v){const K=SHARED.coast,CO=SHARED.country,O=OPass16,HZ=HZPass16;
  if(!O.wind)O.wind=SHARED.weather.wind({from:'n',force:1,view:'s'});const L=K.light(O);
  K.sky(g,O);
  /* far to the south, beyond the gulf, Lesbos lies long and low on the horizon; the near shore of the gulf comes in from the left */
  K.isle(g,30,258,7,O,{dist:.74,seed:1663,lean:.8});
  SPass16=K.sea(g,Object.assign(O,{y1:72}));SPass16.open=(x,y)=>y<HZ+7;
  /* we stand high: the land falls away from the pass to the gulf, the far slopes below the horizon in the haze of their distance, the
     shore of the gulf at their foot */
  K.land(g,L,.62,q=>{CO.range(q,-2,322,HZ+12,x=>Math.max(0,5+3*Math.sin(x/31)+2*Math.sin(x/11)-Math.abs(x-160)*.012),['#7c8a6a','#949c80'],{k:.7,light:-1});
    const P=[-2,HZ+14];for(let x=-2;x<=322;x+=2)P.push(x,HZ+6.6+.8*Math.sin(x/17));P.push(322,HZ+14);poly(q,P,'#8c9470')});
  K.land(g,L,.34,q=>{CO.range(q,-2,322,HZ+24,x=>Math.max(0,12+5*Math.sin(x/27+1)+2.4*Math.sin(x/9)-Math.abs(x-170)*.03),['#7a845a','#92966c'],{k:.9,light:-1});
    q.fillStyle=lg(q,0,HZ+23,0,HZ+34,['#8a9068','#9a9a72']);q.fillRect(-2,HZ+23.6,324,12)});
  /* the floor of the pass, one stony ground from the lip where the land falls away to the gulf down to our feet: dust and stones that
     grow toward us, tufts, a little turf where it is damp below the spring, and the haze of distance over its far part */
  K.land(g,L,0,q=>{const P=[-2,146,-2,76];for(let x=-2;x<=322;x+=2)P.push(x,74+3*Math.sin(x/23)+1.4*Math.sin(x/7)+Math.abs(x-165)*.04);P.push(322,146);
    clipTo(q,()=>poly(q,P),()=>{CO.ground(q,-2,70,324,146,'#bea884',1665,{n:220,size:.9,tufts:60});
      pool(q,196,112,30,5,'#6a7a54',.24,'multiply');
      q.fillStyle=lg(q,0,70,0,104,[rgba('#b8c2c8',.5),rgba('#b8c2c8',0)]);q.fillRect(-2,70,324,34);
      {const r=rng(1673);for(let i=0;i<40;i++)CO.tuft(q,130+r()*80,80+r()*30,1+r()*2,r()<.5?'#8a8c5a':'#a49a62',r)}
      for(const[x,y,w,h]of[[142,96,8,4],[190,90,6,3],[160,104,10,4.6]])CO.boulder(q,x,y,w,h,'#aa9a80',x*5+y,{light:-1})})});
  /* the rock at the left: bedded limestone, lit on its faces to the left, with scrub on its ledges */
  K.land(g,L,0,q=>{const P=[-2,102,-2,leftPass16(0)];for(let x=0;x<=172;x+=2)P.push(x,Math.min(100+Math.sin(x/7)*1.5,leftPass16(x)));P.push(172,102);
    CO.crag(q,P,'#b8a68a',1666,{light:-1,dip:.12,bed:6,scrub:14});
    for(const[x,y,w,h]of[[20,40,10,4],[62,58,12,4],[110,74,10,3.6],[34,88,14,5],[128,94,10,4]])CO.bush(q,x,y,w,h,'#5a6c42',x*3+y,{light:-1})});
  /* the rock at the right, in its own shade on the side turned from the sun, and the spring: a dark wet streak down its face, with green
     at its foot where the water soaks into the scree */
  K.land(g,L,0,q=>{const P=[168,110];for(let x=168;x<=300;x+=2)P.push(x,Math.min(109+1.5*Math.sin(x/6),rightPass16(x)));P.push(300,110);
    CO.crag(q,P,'#ae9c80',1667,{light:-1,dip:-.1,bed:6,scrub:10,shade:'r'});
    /* the seep: the rock darkened and wet where the water comes out of a bed, widening as it runs down and fringed with green, and lost
       in the scree at the foot of the face */
    const st=[204,81,206,79.6,208.4,80.2,210.6,79.4,212,81.6,213,85,215.4,89,216.2,94,214.6,97.8,211.4,98.4,208,97.4,206.6,93.6,205.6,89,204.4,85.6];poly(q,st,rgba('#3a3e50',.3));
    poly(q,[207,82,209.6,81.6,211,86,212.6,92,211,96,209,95,208.4,89],rgba('#2a2e40',.22));
    clipTo(q,()=>poly(q,st),()=>{for(let i=0;i<22;i++){const y=80+i*.85,x=205+Math.sin(i*1.7)*2+i*.2;R(q,x,y,.5,.5,rgba('#d8e4ea',.25+.25*Math.sin(i*2.3)))}});
    for(const[x,y]of[[203,82],[214,86],[216,93],[205,95]])CO.bush(q,x,y,3,1.4,'#5e7c46',x*11+y,{light:-1});
    CO.bush(q,212,100,8,3,'#5e7c46',1668,{light:-1});CO.bush(q,203,99.4,6,2.6,'#6a8a4c',1669,{light:-1});
    for(const[x,y,w,h]of[[244,60,10,4],[270,46,8,3],[222,96,9,3.6],[286,62,7,3]])CO.bush(q,x,y,w,h,'#566842',x*3+y,{light:-1})});
  /* beyond the right-hand rock, the saddle, and the short way down over it toward Assos: a worn path that climbs to the lip and is gone */
  K.land(g,L,0,q=>{const P=[262,110,262,104,280,96,292,80,300,72,312,70,322,72,322,111];
    clipTo(q,()=>poly(q,P),()=>CO.ground(q,256,66,68,116,'#bca886',1670,{n:30,size:.8,tufts:10}));
    const up=[264,112,276,104,288,92,298,80,306,73,314,71.4,318,73,310,78,300,88,290,102,284,112];poly(q,up,'#d2bc94');
    clipTo(q,()=>poly(q,up),()=>{CO.ground(q,262,68,60,116,'#d4c098',1671,{n:16,size:.5});ao(q,262,68,60,46,'l',.14,'#2a2440')});
    stroke(q,[284,112,290,102,300,88,310,78,318,73],rgba('#3a3040',.25),.5)});
  /* scree at the foot of both rocks, where the faces meet the floor */
  K.land(g,L,0,q=>{const r=rng(1672);for(let i=0;i<34;i++){const lft=i<18,x=lft?r()*150:178+r()*116,y=lft?100+r()*3:Math.min(112,rightPass16(x)+999*0)-0;
      const yy=107+r()*3,w=2+r()*5,h=1+r()*2.6;if(!lft&&x>196&&x<224)continue;CO.boulder(q,x,lft?y:yy,w,h,r()<.5?'#a89880':'#b4a48a',1680+i,{light:-1})}});
  troughPass16(g,v)}
/* the trough: one long stone hollowed out, low and wide, standing where the floor meets the rock; water in it once the flock has been
   watered (v 'p'), and its stone dry and pale before (cut: the outline only, for the prop) */
function troughPass16(g,v,cut){const P=[166.4,116.4,167,108.6,168,107.6,204,107.4,205.2,108.4,205.6,116.4];if(cut){poly(g,P,'#000');return}
  oval(g,187,117,22,1.8,'rgba(30,26,46,.32)');poly(g,P,'#aa9c84');
  clipTo(g,()=>poly(g,P),()=>{g.fillStyle=lg(g,0,107,0,117,['#d8ccb2','#aa9c84','#867a68']);g.fillRect(166,107,40,10);tex(g,'mott',.5,166,107,40,10,'overlay',1);
    R(g,166,107.4,40,.8,'#e8dcc2');R(g,166,115.2,40,1.2,'rgba(40,34,44,.35)')});
  const W=[169,108.8,203,108.6,202.6,110.8,169.4,111];poly(g,W,v==='p'?'#4c6c7e':'#7a6e5e');
  if(v==='p'){R(g,170,109,31,.5,'#a8c4cc');R(g,176,110,8,.5,rgba('#e8f0f0',.5))}else{R(g,170,109,31,.5,'#5e5446');R(g,172,110.2,6,.5,'#9a8e78')}
  R(g,167.6,111.2,37,.5,'#c8bca2')}
function drawPass16(g,t){if(SPass16)SPass16.draw(g,t);const B=SHARED.beasts;LOOKPass16=LOOKPass16||B.flock(8,1662);const ews=EWEPass16(),lit=lightAt('pass16',200,116);
  FLOCKPass16().forEach(([x,y,d,p],i)=>{const o=LOOKPass16[i],fr=p===1?24+(Math.floor(t/(900+i*130)+o.ph*7)%2):p===2?22+(Math.floor(t/(300+i*20)+o.ph*5)%2):0;
    B.sheep(g,x,y,d,fr,o.look,lit)});
  /* the ewe: she chews and looks at whoever comes up the path */
  B.sheep(g,ews[0],ews[1],ews[2],22+(Math.floor(t/280)%2),{fl:'#ece2ca',face:'#7a5a40',k:1.06},lit);
  if(!F.pass)depth(121,()=>{poly(g,[207,121,212,117.6,222,118,224,121],'#8a5a34');R(g,210,118,10,.6,'#b88250');stroke(g,[213,118.4,217,120.6],'#3a2416',.5)})}
/* ==== ART pass16: end ==== */

/* ==== ART deck16: begin ==== */
/* The coaster's deck, seen from aboard, looking aft over the stern: the shared deck of shared/ship.js (SHARED.ship.paint, view
   'deckAft'). Her mast is behind us, out of the picture; the stern rises at the back above the horizon (y 66), and the stern post
   rises from its top against the sky, with the pennant at its head, so that no upright crosses the line where the sea meets the sky.
   On the deck: the low goat-hair shelter in the middle, the rack of jars at the left, the bales at the right with the ship's cat
   curled on top of them, the gift's chest at the right of the middle near us, a coil of rope at the left, and a low bale at the
   shelter's mouth, where Paul sits from Assos on (a seat). What lies beyond the stern is the room's own (shared/coast.js, one horizon
   at 66), and so is the wind: moored and at anchor we look across to the shore with the wind from the left, from up the coast, as over
   the stern in sky16; under way we look back along her wake, and the north wind comes from behind the stern toward us.
   Variants (variant(), from the story, DECKV): quay (moored at Troas in the morning: the town at the right, a mole across the water at
   the left that ends short of the left steering oar, the gangplank on the near rail at the right), sail (under way by day: the coast of the Troad far off at the right, the
   wake), assos (moored at Assos: its rocky hill and walls behind, a mole at the right), morn (at anchor off Mitylene in the morning, a
   breath of wind), eve (at anchor off Chios at night: moonlight, the lamp hung under the curl of the stern post, the awning torn),
   mornt (the next morning off Chios, a strong wind, the awning torn; at anchor the pennant swings with the ship on the current).
   Called from outside: ART.deck16, DECKV, DECKO16 (the shared deck's options for a variant). Hotspots (ROOMS.deck16): the sky over the
   stern 0,0,320,58 · the stern 128,16,52,56 · the steering oars 84,60,36,32 and 180,60,36,32 · the shelter 112,74,64,48 · the chest
   174,104,34,28 · the cargo, the bales 188,82,36,32 and the jars 68,82,36,30 · the cat 199,78,14,9 · the gangplank 258,90,62,40
   (moored at Troas only). Walk strip SHARED.ship.deck.walk (8..312, 102..140); the bulwarks are blocked (deck.block). Actors
   (place16): the master just behind the chest, so that it hides half his legs, 182,115 · his boy 204,139 · the sailor 240,126 · Timothy 106,134 ·
   Aristarchus 80,120 · Paul seated at the shelter's mouth 134,127 (from Assos on) · Luke comes in at 162,138 (ENT). Nobody is placed in
   the stern post's column (x 145..168) at the back of the strip, where the post would grow out of his head. The props are the deck's
   own (shelter, rack, bales, chest, coil) with their footprints, the seat, and the cat on the bales. */
const DECKV=()=>!F.w1?'quay':!F.aboard?(F.la?'assos':'sail'):!F.w2?'morn':!F.watch?'eve':'mornt';
/* each variant: the deck's light (dv), the coast painter's hour and cloud, and the wind: the way we look, its force (from the north) */
const DK16={quay:{dv:'day',hour:'morning',cloud:.22,view:'e',force:2,seed:161},sail:{dv:'day',hour:'midday',cloud:.18,view:'n',force:2,seed:162},
  assos:{dv:'day',hour:'midday',cloud:.12,view:'n',force:1,seed:163},morn:{dv:'day',hour:'morning',cloud:.3,view:'e',force:1,seed:164},
  eve:{dv:'night',hour:'night',cloud:.12,view:'e',force:0,seed:165,moon:[252,20,.62]},mornt:{dv:'day',hour:'morning',cloud:.42,view:'e',force:3,seed:166}};
const DECKO16=v=>({view:'deckAft',variant:DK16[v].dv,chest:true,hz:66,sky:g=>backDeck16(g,v),sea:()=>{}});
/* per variant: the coast options, the sea's motion, the hearths, and where land or stone lies on the water (dry) */
const DKC16={};
function coastDeck16(v){if(DKC16[v])return DKC16[v];const d=DK16[v],W=SHARED.weather.wind({from:'n',force:d.force,view:d.view}),
  O={w:320,hz:66,hour:d.hour,cloud:d.cloud,wind:W,seed:d.seed,light:1};if(d.moon)O.moon=d.moon;
  return DKC16[v]={O,W,hearths:[],dry:()=>false}}
/* the deck's own outline, read once from the shared deck's layer: the sea moves only where none of the ship stands */
const MASK16={};
function maskDeck16(v){const k=DK16[v].dv;if(MASK16[k])return MASK16[k];const c=SHARED.ship.deck.overlay(DECKO16(v)),W=c.width,H=c.height,
  d=c.getContext('2d').getImageData(0,0,W,H).data,m=new Uint8Array(W*H);for(let i=0;i<W*H;i++)m[i]=d[i*4+3];return MASK16[k]={m,W,H}}
function openDeck16(v,x,y){if(y<66.4||x<0||x>=320||y>=144)return false;const M=maskDeck16(v),C=coastDeck16(v);
  return!M.m[Math.floor(y*HR)*M.W+Math.floor(x*HR)]&&!C.dry(x,y)}
/* backDeck16: the sky, the land and the sea beyond the stern, for SHARED.ship.paint (its sky; the sea is painted here too) */
function backDeck16(g,v){const K=SHARED.coast,C=coastDeck16(v),O=C.O;K.sky(g,O);
  if(v==='quay'){K.isle(g,0,150,7,O,{kind:'cape',from:'l',dist:.78,seed:31});C.S=K.sea(g,O);
    K.quay(g,O,{view:'face',x0:0,x1:84,y:70.5,slope:-.004,face:2.6,bollards:[26,64],seed:32});quaySideDeck16(g,O);
    const T=K.town(g,O,{x0:182,x1:320,base:67.8,hill:x=>55-(x-182)*.05+1.5*Math.sin(x/13),rows:3,size:6.5,dist:.42,warehouses:[[196,40,4.6],[256,50,5.2]],seed:34});
    C.hearths=T.hearths.filter(([x,y])=>x>190&&x<304).slice(0,3);C.dry=(x,y)=>x<86&&y<74||x>157+1.76*(y-66)}
  else if(v==='sail'){K.isle(g,196,320,6,O,{kind:'cape',from:'r',dist:.82,seed:41});K.isle(g,30,74,2.4,O,{dist:.92,seed:42});C.S=K.sea(g,O)}
  else if(v==='assos'){const H=K.headland(g,O,{side:'l',top:10,xs:148,ys:30,xf:178,foot:78,base:80,scrub:.35,seed:51,rock:'#a89a86'});
    /* the walls of the city along the brow of the hill: one course of dressed stone that follows the ridge; no tower in its middle */
    K.land(g,K.light(O),0,q=>{const top=[],bot=[];for(let x=22;x<=138;x+=1){const y=H.top(x);top.push(x,y-4.2);bot.unshift(x,y+.8)}
      poly(q,top.concat(bot),'#c8bca2');clipTo(q,()=>poly(q,top.concat(bot)),()=>{const r=rng(52);for(let x=22;x<138;x+=2.4+r()*1.6){const y=H.top(x);R(q,x,y-4.2,.5,2.2,'rgba(70,58,44,.35)');R(q,x+1.2,y-2,.5,2.6,'rgba(70,58,44,.3)')}
        for(let x=22;x<=138;x+=1)R(q,x,H.top(x)-4.2,1,.5,'#ece2cc');for(let x=22;x<=138;x+=1)R(q,x,H.top(x)-2.1,1,.5,'rgba(70,58,44,.25)')})});
    C.S=K.sea(g,O);K.quay(g,O,{view:'face',x0:214,x1:320,y:71,slope:.01,face:2.8,bollards:[240,300],seed:53});C.dry=(x,y)=>x<182&&y<82||x>=212&&y<75}
  else if(v==='morn'){K.isle(g,0,128,15,O,{kind:'cape',from:'l',dist:.62,seed:61});K.isle(g,110,320,7,O,{kind:'cape',from:'r',dist:.7,seed:62});
    const T=K.town(g,O,{x0:196,x1:256,base:67.6,hill:x=>61.2+Math.sin(x/9),rows:2,size:3.4,dist:.62,seed:63});C.S=K.sea(g,O);C.dry=(x,y)=>x>194&&x<258&&y<68.4}
  else if(v==='eve'){K.isle(g,0,214,10,O,{kind:'cape',from:'l',dist:.5,seed:71});K.town(g,O,{x0:84,x1:150,base:67.4,hill:x=>60+Math.sin(x/8),rows:2,size:3.4,dist:.5,lamps:.35,seed:72});
    C.S=K.sea(g,O);C.dry=(x,y)=>x>82&&x<152&&y<68.2}
  else{K.isle(g,0,236,8,O,{kind:'cape',from:'l',dist:.78,seed:71});C.S=K.sea(g,O)}
  C.S.open=(x,y)=>openDeck16(v,x,y)}
/* the light of the shared deck for a variant, on a face of color c whose normal is n (as shared/ship.js lights the deck) */
function litDeck16(v,c,n,k){const L=SHARED.ship.deck.geo(DECKO16(v)).L,d=Math.max(0,n[0]*L.L[0]+n[1]*L.L[1]+n[2]*L.L[2])*(k==null?1:k),h=hex(c);
  return toHex(h[0]*(L.amb[0]+L.sun[0]*d)*1.12,h[1]*(L.amb[1]+L.sun[1]*d)*1.12,h[2]*(L.amb[2]+L.sun[2]*d)*1.12)}
ART.deck16={w:320,q:12,variant:DECKV,paint(g,v){paintDeck16(g,v)},
  get light(){return SHARED.ship.deck.light(DECKO16(DECKV()))},
  draw(g,t){drawDeck16(g,t)},front(){},
  props:SHARED.ship.deck.props(DECKO16('quay')).concat([
    {y:124.6,shape(g,v){seatDeck16(g,v||'quay',1)},foot:[[123.4,121.9,20.7,2.7]],seat:1},
    {y:114.2,shape(g){catDeck16(g,'quay',1)},foot:[]}])};
function paintDeck16(g,v){SHARED.ship.paint(g,DECKO16(v));
  if(v==='eve'||v==='mornt')tearDeck16(g,v);seatDeck16(g,v);catDeck16(g,v);if(v==='quay')plankDeck16(g,v)}
/* the seat: a low bale of sacking at the shelter's mouth, its seam sewn along it, lit as the deck is */
const SEAT16=[-.56,.04,4.35,4.56,.3];
function seatDeck16(g,v,cut){const geo=SHARED.ship.deck.geo(DECKO16(v)),{P}=geo,[x0,x1,z0,z1,h]=SEAT16,L=geo.L,
    a=P(x0,0,z0),b=P(x1,0,z0),c=P(x1,h,z0),d=P(x0,h,z0),e=P(x1,0,z1),f=P(x1,h,z1),k=P(x0,h,z1),
    front=[a[0],a[1],b[0],b[1],c[0],c[1]+.4,(c[0]+d[0])/2,c[1]-.3,d[0],d[1]+.4],side=[...b,...e,...f,c[0],c[1]+.4],top=[d[0],d[1]+.4,(c[0]+d[0])/2,c[1]-.3,c[0],c[1]+.4,...f,...k];
  if(cut){poly(g,front,'#000');poly(g,side,'#000');poly(g,top,'#000');return}
  const S='#8a6e46';
  /* its shadow: the soft dark where it meets the deck, and by day the shadow it casts away from the sun */
  if(L.kx||L.kz){const q=[...a,...b,...e,...P(x1+h*L.kx,0,z1+h*L.kz),...P(x0+h*L.kx,0,z1+h*L.kz),...P(x0+h*L.kx,0,z0+h*L.kz)];comp(g,'multiply',.4,()=>poly(g,q,'#5a5070'))}
  comp(g,'multiply',.55,()=>{g.fillStyle=lg(g,0,a[1]-1,0,a[1]+1.4,['rgba(40,30,50,0)','rgba(40,30,50,1)','rgba(40,30,50,0)']);g.fillRect(a[0]-1,a[1]-1,b[0]-a[0]+3,2.4)});
  poly(g,side,litDeck16(v,S,[1,0,0]));poly(g,top,litDeck16(v,S,[0,1,-.2]));
  poly(g,front);g.fillStyle=lg(g,0,d[1],0,a[1],[tint(litDeck16(v,S,[0,.3,-1]),.08),litDeck16(v,S,[0,0,-1]),tint(litDeck16(v,S,[0,-.3,-1]),-.2)]);g.fill();
  clipTo(g,()=>poly(g,front.concat()),()=>{tex(g,'grain',.22,a[0]-1,d[1]-1,b[0]-a[0]+2,a[1]-d[1]+2,'overlay',.5);
    /* the seam along the front, in short stitches that all slant one way */
    for(let x=a[0]+1.5;x<b[0]-1.5;x+=1.6){const y=d[1]+(a[1]-d[1])*.42;stroke(g,[x,y+.4,x+.6,y-.4],rgba(tint(litDeck16(v,S,[0,0,-1]),.3),.55),.5)}});
  stroke(g,[d[0]+.5,d[1]+.4,(c[0]+d[0])/2,c[1]-.3,c[0]-.3,c[1]+.4],rgba(litDeck16(v,'#f4e2b8',[0,1,-.3]),.6),.5)}
/* the ship's cat: curled on the top bale, her head turned toward the deck, her tail laid round her front; two ears, small and apart */
function catDeck16(g,v,cut){const geo=SHARED.ship.deck.geo(DECKO16(v)),[x,y]=geo.P(2.26,.9,5.9),B=v==='eve'?'#8a7a6a':'#5e4c3e',
  body=()=>{oval(g,x+.6,y-1.7,3.3,1.75);g.fill();oval(g,x-2.2,y-3,1.55,1.4);g.fill();poly(g,[x-3.5,y-3.6,x-3.2,y-4.7,x-2.5,y-4.1]);g.fill();poly(g,[x-1.9,y-4.2,x-1.3,y-4.9,x-.9,y-3.8]);g.fill()};
  if(cut){g.fillStyle='#000';body();return}
  comp(g,'multiply',.5,()=>oval(g,x+.8,y+.1,4,.9,'#3a3050'));
  g.fillStyle=litDeck16(v,B,[0,.4,-1]);body();
  /* the light along her back and the top of her head, the shade under her, the tail, an ear's inside, the eye */
  clipTo(g,()=>{oval(g,x+.6,y-1.7,3.3,1.75);oval(g,x-2.2,y-3,1.55,1.4)},()=>{
    oval(g,x+1,y-2.6,3,.9,litDeck16(v,tint(B,.25),[0,1,-.2]));oval(g,x-2,y-3.9,1.2,.5,litDeck16(v,tint(B,.25),[0,1,-.2]));
    R(g,x-3,y-.8,7,1,rgba(litDeck16(v,tint(B,-.4),[0,-1,0]),.8));
    for(const sx of[.6,2,3.2])R(g,x+sx,y-3.2,.5,1,rgba(litDeck16(v,tint(B,-.35),[0,1,0]),.6))});
  stroke(g,[x+3.6,y-.9,x+2.2,y-.3,x-.4,y-.35,x-1.8,y-.8],litDeck16(v,tint(B,-.18),[0,.2,-1]),.9);
  R(g,x-3.1,y-4.2,.5,.5,litDeck16(v,'#b08a74',[0,0,-1]));R(g,x-2.8,y-3.2,.5,.5,v==='eve'?'#6a7454':'#1e1610')}
/* the torn awning: the wind has ripped the goat-hair of the shelter's front from its frame at the upper left, and a flap hangs down,
   its paler underside out, its edges frayed; through the rent the dark inside shows */
function tearDeck16(g,v){const nt=v==='eve',dk=nt?'#0c0a12':'#161014',under=nt?'#3a3542':'#6a5e52',edge=nt?'#5a5464':'#a89884';
  const hole=[114.2,93.2,119,93.6,123.6,94.4,122.4,96.4,121.6,98.8,118.8,100.6,116.4,101.4,114.4,100.2];
  poly(g,hole,dk);
  const flap=[121.6,98.8,118.8,100.6,116.4,101.4,116.9,103.6,117.6,106.2,119.4,105.2,121.6,104.6,123.8,103.4,123.2,101.2];
  poly(g,flap);g.fillStyle=lg(g,0,99,0,106,[tint(under,.1),under,tint(under,-.25)]);g.fill();
  clipTo(g,()=>poly(g,flap),()=>{tex(g,'grain',.25,115,98,10,9,'overlay',.6);for(let y=100.5;y<106;y+=1.3)stroke(g,[116.8,y,123.8,y-1.2],rgba(tint(under,-.3),.4),.5)});
  stroke(g,[116.9,103.6,117.6,106.2,119.4,105.2,121.6,104.6,123.8,103.4],edge,.5);
  stroke(g,[114.2,93.2,119,93.6,123.6,94.4],rgba(edge,.7),.5);
  comp(g,'multiply',.45,()=>poly(g,[116.4,106.4,119.4,105.8,121.6,105.2,123.8,104,124.2,105.6,118.6,107.6],'#2a2030'))}
/* quaySideDeck16: the quay of Troas along her right side, its top a little higher than her rail: the paving runs back from the coping
   at its edge to the horizon, where the town stands on it; the coping is a band of long stones, one tone to a stone, with no joint
   drawn across it; the face of the quay under the coping is hidden by her bulwark */
function quaySideDeck16(g,O){const{P}=SHARED.ship.deck.geo({variant:'day',hz:66}),r=rng(167),edge=[],face=[];
  for(let z=2.4;z<=420;z*=1.06){edge.push(...P(4.2,1.45,z));face.unshift(...P(4.2,-.4,z))}
  const top=edge.concat([330,66.2,340,66.2,340,100]);
  /* the face of the quay, in the shade: courses of dressed stone that run back along her side, each block its own tone, every joint
     stopping at the edge of its own course; dark and wet toward the water */
  poly(g,edge.concat(face),'#5e584e');
  clipTo(g,()=>poly(g,edge.concat(face)),()=>{for(let k=0;k<5;k++){const y0=1.45-k*.38,y1=y0-.36;let z=2.4+r()*1.2;
      while(z<90){const l=(1.1+r()*.9)*(1+z/40),q=[...P(4.2,y0,z),...P(4.2,y0,z+l*.97),...P(4.2,y1,z+l*.97),...P(4.2,y1,z)];
        poly(g,q,tint(mix('#8e8474','#5e5a58',k*.16),(r()-.5)*.16));const t=[...P(4.2,y0,z),...P(4.2,y0,z+l*.97)];stroke(g,t,'rgba(232,222,200,.18)',.5);z+=l}}
    tex(g,'mott',.4,150,64,190,60,'overlay',1);
    g.fillStyle=lg(g,0,70,0,100,['rgba(30,26,34,0)','rgba(30,26,34,.35)']);g.fillRect(150,66,190,40)});
  poly(g,top);g.fillStyle=lg(g,0,66,0,80,['#c6bca8','#bcae92','#a89a7e']);g.fill();
  clipTo(g,()=>poly(g,top),()=>{tex(g,'mott',.35,150,64,190,30,'overlay',1);
    for(let i=0;i<160;i++){const z=3+Math.pow(r(),2.2)*70,x=4.8+r()*9,[px,py]=P(x,1.45,z),w=(.6+r()*1.6)*Math.min(z,8)/z;R(g,px,py,Math.max(.5,w),.5,rgba(r()<.55?'#86786a':'#eee4cc',.3))}
    for(let z=2.6;z<80;){const l=1.4+r()*1.3,q=[...P(4.2,1.45,z),...P(4.2,1.45,z+l),...P(4.75,1.45,z+l),...P(4.75,1.45,z)];poly(g,q,tint('#cfc4aa',(r()-.5)*.14));z+=l}
    const lip=[];for(let z=2.4;z<=420;z*=1.06)lip.push(...P(4.2,1.45,z));stroke(g,lip,'#f0e6d0',.5)})}
/* the gangplank, moored at Troas: one broad plank from the near rail at the right up to the edge of the quay, its end resting on the
   rail; nothing is laid across it */
function plankDeck16(g,v){const{P}=SHARED.ship.deck.geo(DECKO16(v)),W='#a48256',
  a=P(2.8,1.07,3.2),b=P(2.8,1.07,3.62),c=P(4.3,1.5,3.62),d=P(4.3,1.5,3.2),e=P(2.8,1.0,3.2),f=P(4.3,1.43,3.2);
  comp(g,'multiply',.45,()=>poly(g,[a[0]-1,a[1]+1.2,b[0]-1.4,b[1]+.8,b[0]+1.6,b[1]+.4,a[0]+1.6,a[1]+.6],'#3a3050'));
  poly(g,[...e,...f,...d,...a],litDeck16(v,tint(W,-.38),[0,0,-1]));
  poly(g,[...a,...b,...c,...d]);g.fillStyle=lg(g,a[0],0,c[0],0,[litDeck16(v,W,[-.3,1,0]),litDeck16(v,tint(W,.06),[-.3,1,0])]);g.fill();
  clipTo(g,()=>poly(g,[...a,...b,...c,...d]),()=>{for(const k of[.28,.55,.8]){const p=P(2.8,1.07,3.2+.42*k),q=P(4.3,1.5,3.2+.42*k);stroke(g,[p[0],p[1],q[0],q[1]],rgba(tint(W,-.35),.3),.5)}});
  stroke(g,[a[0],a[1],d[0],d[1]],rgba(litDeck16(v,'#f6e2b4',[0,1,0]),.7),.5)}
/* drawDeck16: the sea, moving where it is open; the wake under way; smoke from the hearths of Troas; the pennant; the lamp's flame */
function drawDeck16(g,t){const v=DECKV(),C=coastDeck16(v),geo=SHARED.ship.deck.geo(DECKO16(v)),Wt=SHARED.weather;
  if(!C.S){C.S=SHARED.coast.seaMotion(C.O);C.S.open=(x,y)=>openDeck16(v,x,y)}
  C.S.draw(g,t);
  if(v==='sail'){const r=rng(16051);for(let i=0;i<44;i++){const k=((t/5200+i/44)%1),z=14+Math.pow(k,1.6)*150,sd=i%2?1:-1,[x,y]=geo.P(sd*(1.3+(z-11)*.34)+(r()-.5)*(.6+z*.04),-1.1,z);
    if(openDeck16(v,x,y))R(g,x-1,y,1.5+r()*2,.5,`rgba(246,250,250,${(.6*Math.sin(k*Math.PI)).toFixed(2)})`)}}
  for(const[x,y]of C.hearths)Wt.smoke(g,t,x,y,C.W,{h:14,c:'#ece6dc',a:.45,n:12});
  const W=v==='mornt'?{pennant:{dx:Math.sin(t/2600)*.85,dz:.35*Math.cos(t/2600),lift:.5,flap:.7}}:C.W;
  Wt.pennant(g,t,geo.pennant[0],geo.pennant[1],W,{len:13,w:2,c:v==='eve'?'#56302e':'#a8402c'});
  if(v==='eve'){const[lx,ly]=geo.lamp;flame(g,lx-.5,ly-1,t)}}
/* ==== ART deck16: end ==== */

/* ==== ART assos16: begin ==== */
/* Assos: the harbor under its rocky hill, late in the morning. We look south across the gulf, with Lesbos long and blue on the far side
   of the water; the sun is high at the right, and shadows fall to the left. The hill fills the left half: bare rock, bedded and broken,
   with scrub on its ledges, and along its top the city's wall of dressed stone, which follows the ridge; a square tower stands at the
   wall's end, where the ridge turns down, none in its middle. No temple, no altar, no image: walls and rock only. The path from the
   pass comes round the flank of the hill at the left edge and down to the quay on a ramp held up by a wall of rough stones, so that
   no bed of the rock is drawn across it. The harbor and its mole at the right; the paved quay along the front. Once
   the ship is in (F.la) she lies moored at the right, bow to the left, her mast out of the picture at the right; her rail is above the
   eye all along, and she rises and falls on the swell behind the stone edge of the quay (drawn in draw(), with the coaster of the Troas
   quay turned: shipQuay16). One horizon, y 62 (HZAssos16). Painted with SHARED.coast in one light.
   Called from outside: ART.assos16. Reads F.la. Hotspots: the hill 0,0,170,70 · the harbor 170,52,150,44 · the ship 210,56,110,46 (once
   she is in) · the path from the pass 0,76,18,60. Walk strip 16..304, 112..138. Paul comes down at 40,126; Luke waits at 232,124.
   Heads come at y 70..90: behind them lie rock, open water and the hull, and nothing round. Gulls (ROOMS.assos16.birds) stand on the
   quay's edge at x 150..164. */
const HZAssos16=62,EDGEAssos16=100;
ART.assos16={w:320,q:12,variant:()=>F.la?'s':'',paint(g,v){paintAssos16(g,v)},light:{amb:'#f8ecd8',sun:[-.42,.22,.45]},draw(g,t){drawAssos16(g,t)},front(){}};
let OAssos16=null,PAssos16={};
const oAssos16=()=>OAssos16||(OAssos16={w:320,hz:HZAssos16,hour:'morning',sun:[360,-50],cloud:.18,wind:SHARED.weather.wind({from:'n',force:2,view:'s'}),seed:1621,y1:EDGEAssos16});
function paintAssos16(g,v){const K=SHARED.coast,O=oAssos16(),L=K.light(O),r=rng(1605),P=PAssos16={};
  K.sky(g,O);
  /* Lesbos across the water: long, high in the middle, blue with its distance */
  K.isle(g,150,320,9,O,{kind:'cape',from:'r',dist:.66,seed:1622});
  K.isle(g,118,160,2.4,O,{dist:.8,seed:1623});
  P.S=K.sea(g,O);
  /* the mole across the harbor: it comes from the right and ends in the water, low, with nothing upright on it */
  K.quay(g,O,{view:'face',x0:222,x1:322,y:72.4,slope:.04,face:5.2,c:'#b8aa90',seed:1624,dist:.22});
  for(let i=0;i<9;i++){const x=219.6+i*.9,y=77.4+(i%3)*.5;R(g,x,y-1.2,1.2,1.4,i%2?'#8a8076':'#a49888')}
  /* the hill, the wall along its top and the tower at its end, the path down its face */
  P.H=hillAssos16(g,O,L);
  rampAssos16(g,r);
  K.quay(g,O,{view:'top',y:EDGEAssos16,y1:144,bollards:[124],bsize:6,seed:1626,c:'#c6b696',rows:6,step:34});
  P.S.open=(x,y)=>y<EDGEAssos16-.5&&y<P.H.top(x)-.5&&!(x>224&&y>71&&y<80)&&!(v==='s'&&x>196&&y>40);
  wearAssos16(g,r);
  if(v==='s')for(let i=0;i<90;i++){const x=199-Math.pow(r(),1.6)*40,y=80+r()*20;if(y<82+(199-x)*.3)continue;R(g,x,y,1.5+r()*5,.5,`rgba(30,42,78,${(.4*(1-(199-x)/44)).toFixed(2)})`)}
  /* the hill's shadow lies on the water and the quay at its foot; the light of late morning */
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(180,170,200,.8)','rgba(255,220,170,.5)','rgba(255,214,160,1)']);g.fillRect(0,0,320,144)});
  ao(g,0,124,320,20,'b',.12,'#2a2050')}
function hillAssos16(g,O,L){const K=SHARED.coast,XS=118,
    H=K.headland(g,O,{side:'l',top:15,xs:XS,ys:25,xf:176,foot:97,base:104,scrub:.55,dip:-.1,bed:6,rock:'#a49482',green:'#5a6a3e',dist:.04,seed:1627}),T=H.top;
  K.land(g,L,.04,q=>{
    /* the wall: coursed stone that follows the ridge, its foot set into the rock, its top a little lit; no battlements */
    const W0=-2,W1=XS-4,top=x=>T(x)-7,bot=x=>T(x)+1.8,WP=[];for(let x=W0;x<=W1;x+=1)WP.push(x,top(x));for(let x=W1;x>=W0;x-=1)WP.push(x,bot(x));
    poly(q,WP);q.fillStyle=lg(q,0,6,0,30,['#d8caac','#c0b092']);q.fill();
    clipTo(q,()=>poly(q,WP),()=>{const rr=rng(1628);for(let j=1;j<4;j++){const f=x=>top(x)+j*2.2;stroke(q,lineAssos16(f,W0,W1,2),'rgba(84,66,56,.3)',.4)}
      for(let j=0;j<4;j++){const f=x=>top(x)+j*2.2;for(let x=W0+rr()*4+(j%2)*2.2;x<W1;x+=3.8+rr()*2.6)R(q,x,f(x)+.45,.4,1.4,'rgba(84,66,56,.28)')}
      tex(q,'mott',.4,W0,0,W1-W0,40,'overlay',.6);q.fillStyle=lg(q,W0,0,W1,0,['rgba(110,104,150,.22)','rgba(110,104,150,0)']);q.fillRect(W0,0,W1-W0,40);ao(q,W0,0,W1-W0,40,'b',0,'#000')});
    stroke(q,lineAssos16(top,W0,W1,2),'#f4e6c4',.5);
    /* the tower at the wall's end, on the brow: square, of the same stone, its face to the sun lit, its side in shade, two slits */
    const tx=XS-6,tw=10,tb=Math.max(T(tx),T(tx+tw))+2.2,tt=tb-20;
    poly(q,[tx-2.2,tt+1.1,tx,tt,tx,tb,tx-2.2,tb-.6],'#a29890');
    ashlarQuay16(q,tx,tt,tw,tb-tt,'#d4c6a6',rng(1629),{bw:3.4,bh:2.3,v:.1});
    R(q,tx,tt,tw,.6,'#fff2d2');R(q,tx+tw-.6,tt,.6,tb-tt,'#f6e6c2');R(q,tx+3.4,tt+4.9,1,1.6,'#3a2e2c');R(q,tx+6.4,tt+9.5,1,1.6,'#3a2e2c');
    ao(q,tx,tb-5,tw,5,'b',.22,'#4a3a3a')});
  /* the hill's shade on the water along its foot */
  for(let x=118;x<200;x+=.5){const y=T(x);if(!isFinite(y)||y<HZAssos16)continue;ao(g,x+.5,y,.5,Math.min(7,EDGEAssos16-y),'t',.22,'#1a2440')}
  return H}
/* the ramp: the path's trodden top, pale with dust, falling from the left edge to the quay; under it a retaining wall of rough stones
   laid without courses, lit from the right. The rock's beds end at its top and none runs on below it. */
function rampAssos16(g,r){const T=x=>83.6+(x+2)*.42,X1=38,P=[-2,T(-2)];for(let x=-2;x<=X1;x+=1)P.push(x,T(x));P.push(X1,EDGEAssos16,-2,EDGEAssos16);
  poly(g,P,'#5e5448');
  clipTo(g,()=>poly(g,P),()=>{const rr=rng(1630);for(let y=T(-2)+2.4;y<EDGEAssos16+2;y+=2.1)for(let x=-4+rr()*3;x<X1+2;x+=2.6+rr()*2.6){const w=2+rr()*2.4,h=1.5+rr()*.7,c=tint('#b4a48c',(rr()-.5)*.3);
      poly(g,[x+.3,y,x+w-.4,y-.2,x+w,y+h*.5,x+w-.3,y+h,x+.2,y+h+.1,x-.1,y+h*.5],c);R(g,x+w-.6,y,.5,h*.8,tint(c,.22));R(g,x+.3,y+h-.2,w-.7,.4,tint(c,-.3))}
    tex(g,'mott',.4,-2,80,X1+4,24,'overlay',.6);ao(g,-2,92,X1+4,8,'b',.3,'#2a2030')});
  /* the path's top, and the shade of the cut along its upper side */
  const S=[];for(let x=-2;x<=X1;x+=1)S.push(x,T(x));const S2=[];for(let x=X1;x>=-2;x-=1)S2.push(x,T(x)+2.4);
  poly(g,S.concat(S2));g.fillStyle=lg(g,0,82,0,100,['#d2bc98','#c8b08a']);g.fill();
  clipTo(g,()=>poly(g,S.concat(S2)),()=>{for(let i=0;i<40;i++){const x=-2+r()*(X1+2);R(g,x,T(x)+.6+r()*1.4,.5+r()*1.4,.5,r()<.5?'rgba(120,100,80,.4)':'rgba(255,246,222,.4)')}});
  stroke(g,S.map((v,i)=>i%2?v-.3:v),'rgba(40,30,40,.45)',.5);stroke(g,S.map((v,i)=>i%2?v+2.4:v),'rgba(255,240,210,.5)',.4)}
function lineAssos16(f,x0,x1,st){const p=[];for(let x=x0;x<x1;x+=st)p.push(x,f(x));p.push(x1,f(x1));return p}
function wearAssos16(g,r){const S=y=>(y-HZAssos16)/82;
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,108,0,140,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,108,320,32)});
  for(let i=0;i<120;i++){const y=104+Math.pow(r(),.8)*40,k=S(y),x=r()*320;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.15)':'rgba(255,246,224,.16)')}
  for(let i=0;i<70;i++){const y=104+r()*40,x=r()*320;R(g,x,y,.5+r()*(1+S(y)),.5,r()<.3?'rgba(214,186,110,.5)':r()<.5?'rgba(70,58,50,.36)':'rgba(240,230,206,.42)')}
  /* dust and stones washed down from the hill onto the quay at its foot, where the path comes down */
  for(let i=0;i<46;i++){const x=Math.pow(r(),1.4)*70,y=101+r()*8;R(g,x,y,1+r()*2.4,.5+r()*.6,r()<.5?'rgba(150,128,100,.45)':'rgba(236,220,190,.4)')}
  for(let i=0;i<40;i++){const x=r()*320;R(g,x,EDGEAssos16+3.2+r()*2.4,1+r()*5,.5,r()<.5?'rgba(84,98,68,.3)':'rgba(70,60,56,.24)')}}
/* what moves: the sea, the surf at the hill's foot, and once she is in, the coaster on the swell behind the quay's edge, with her forestay */
function drawAssos16(g,t){const P=PAssos16;if(P.S)P.S.draw(g,t);if(P.H)P.H.draw(g,t);if(!F.la)return;
  const dy=Math.round(Math.sin(t/1500+1.3)*2)/2-2;
  /* she lies with her stem between where Paul and Luke stand when they meet (x 190 and 214), clear of both heads; her lines are made
     fast out of the picture, at her waist */
  inRect(g,190,0,130,EDGEAssos16,()=>{g.save();g.translate(318,dy-12);g.scale(-1,1);g.drawImage(shipQuay16(1),-12,0,136,120);g.restore()});
  stroke(g,[205,46.6+dy,294,-10+dy],'#5a4a3c',.6);stroke(g,[205.4,46.2+dy,294.4,-10.4+dy],'rgba(255,236,196,.45)',.3)}
/* ==== ART assos16: end ==== */

/* ==== ART sky16: begin ==== */
/* A close view: the morning seen over the stern, with the signs a sailor reads and nothing else: no helper marks. The far shore runs
   across the back of the picture (shared/coast.js: one horizon, the sky and the sea worked out per pixel, the clouds moving with the
   wind), the sea between, and at the foot the stern rail, close, in fine-grained wood. The stern ornament curls up from the left end
   of the rail and ends below the horizon, so that it stands against the sea and never across the line where the sea meets the sky;
   the pennant flies from its head (SHARED.weather.pennant). Hearths smoke on the shore (SHARED.weather.smoke); whitecaps break on the
   sea as many as the wind has; the clouds drift with it. On the rail lie the boy's wool tuft on its short stick, streaming from the
   stick's end the way the player has set it, and his knotted cord along the rail's face, with as many knots as the player has tied;
   at the right the master's hand rests on the tiller, which runs level along the rail. Nothing upright stands on the rail.
   Directions in the picture: up the coast is to the left (the north, from which the master wants his wind), down the coast to the
   right, the land behind, the open sea behind us. A wind from up the coast drives everything to the right (SHARED.weather.wind, from
   the north, looking east).
   Rounds (SKY16, from the story, ROUND16()): 1, at Troas: every sign agrees (from up the coast, fresh: the smoke leans right, the
   pennant streams right, a few whitecaps, the clouds drift right). 2, off Mitylene: a breath from up the coast, but the smoke of the
   hearths at the foot of the steep hill curls back to the left, as smoke does in the lee of a hill (smoke:{lee:1}); the pennant lifts
   lazily to the right, the clouds creep right, no whitecaps. 3, off Chios: strong from up the coast; the ship swings at anchor on the
   current and the pennant swings with her, now one way, now the other; the whitecaps and the clouds racing right tell it straight;
   the shore is too far for smoke.
   Called from outside: ART.sky16, SKY16, ROUND16, TUFT16, CORD16. Reads G.sky16 (the tuft and the cord as the player has set them).
   Hotspots: the pennant 8,hz,44,20 · the smoke 86,24,80,36 (rounds 1 and 2) · the whitecaps 100,66,220,40 · the clouds 0,0,320,24 ·
   the wool tuft 132,108,46,22 · the knotted cord 184,116,46,20 · the master 250,110,70,24 · back to the deck 0,134,100,10. */
const SKY16={1:{hz:60,force:2,cloud:.32,seed:171},2:{hz:62,force:1,cloud:.26,seed:172,lee:1},3:{hz:58,force:3,cloud:.5,seed:173,swing:1}};
const SKC16={};
function oSky16(k){if(SKC16[k])return SKC16[k];const S=SKY16[k],W=SHARED.weather.wind({from:'n',force:S.force,view:'e',smoke:S.lee?{lee:1}:undefined}),
  O={w:320,hz:S.hz,hour:'morning',cloud:S.cloud,wind:W,seed:S.seed,light:1,y1:112,moving:1,top:()=>S.hz};
  return SKC16[k]={O,W,hearths:[],top:()=>S.hz}}
ART.sky16={w:320,q:12,variant:()=>''+ROUND16(),paint(g,v){paintSky16(g,+v)},light:null,draw(g,t){drawSky16(g,t)},front(g){frontSky16(g)}};
/* the ornament's head, where the pennant is made fast: below the horizon, against the sea */
const ORN16=k=>[25.6,SKY16[k].hz+8.6];
function paintSky16(g,k){const K=SHARED.coast,C=oSky16(k),O=C.O,HZ=SKY16[k].hz;let tops=[];
  K.sky(g,O);
  if(k===1){tops.push(K.isle(g,0,320,15,O,{kind:'cape',from:'l',dist:.48,seed:174}).top);
    const T=K.town(g,O,{x0:64,x1:214,base:HZ+.8,hill:x=>HZ-1-12*Math.pow(Math.sin(Math.PI*(x-64)/150),.8)-1.2*Math.sin(x/7),rows:3,size:5.5,dist:.38,warehouses:[[98,30,3.6],[150,36,3.8]],seed:175});tops.push(T.top);
    C.hearths=[102,128,152].map(x=>[x,Math.min(HZ-1,T.top(x)+.6)])}
  else if(k===2){tops.push(K.isle(g,0,138,34,O,{kind:'cape',from:'l',dist:.36,seed:176}).top);tops.push(K.isle(g,120,320,8,O,{kind:'cape',from:'r',dist:.72,seed:177}).top);
    const T=K.town(g,O,{x0:112,x1:186,base:HZ+.8,hill:x=>HZ-2.4-Math.max(0,(142-x)*.2)-Math.sin(x/6)*.8-2.2*Math.sin(Math.PI*(x-112)/74),rows:2,size:5,dist:.42,seed:178});tops.push(T.top);
    C.hearths=[126,144].map(x=>[x,Math.min(HZ-1,T.top(x)+.6)])}
  else tops.push(K.isle(g,0,250,7,O,{kind:'cape',from:'l',dist:.8,seed:179}).top);
  C.top=SHARED.coast.skyline(...tops);O.top=x=>Math.min(HZ,C.top(x));
  C.S=K.sea(g,O);C.S.open=(x,y)=>openSky16(k,x,y);
  railSky16(g,k);ornSky16(g,k);handSky16(g)}
function openSky16(k,x,y){const HZ=SKY16[k].hz;return y>HZ+.4&&y<110.5&&!(x<34&&y>HZ+3)}
/* grainSky16: wood with its grain running along it: fine lines a little lighter or darker than the wood, which all wave alike and so
   never cross, and here and there a pore */
function grainSky16(g,x,y,w,h,c,seed,a){const r=rng(seed),f=.03+r()*.02,p=r()*6,A=.4+r()*.5;
  inRect(g,x,y,w,h,()=>{for(let yy=y-2;yy<y+h+2;yy+=.5+r()*1.1){const col=r()<.55?rgba(tint(c,-.3),(.12+r()*.18)*(a||1)):rgba(tint(c,.22),(.08+r()*.16)*(a||1)),pts=[];
      for(let xx=x-1;xx<=x+w+2;xx+=2)pts.push(xx,yy+A*Math.sin(xx*f+p)+.3*Math.sin(xx*f*2.7+p*1.6));stroke(g,pts,col,.5)}
    for(let i=0;i<w*h/60;i++)R(g,x+r()*w,y+r()*h,1+r()*1.5,.5,rgba(tint(c,-.4),.28))})}
/* railSky16: the stern rail at the foot, seen close: its rounded cap, lit on top, and under it the top strakes of the stern, each plank
   with its grain along it and its butt joint stopping inside its own strake, staggered */
function railSky16(g,k){const W='#946c42',r=rng(180+k);
  /* the strakes under the cap: three, darker as they go down, in the shade of the cap */
  for(const[y,h,c,j]of[[117,8.5,'#7e5a36',212],[125.5,9,'#74522f',96],[134.5,9.5,'#6a4a2a',248]]){R(g,0,y,320,h,c);grainSky16(g,0,y,320,h,c,190+y,.9);
    R(g,0,y,320,.5,tint(c,-.45));R(g,0,y+.5,320,.5,rgba(tint(c,.18),.5));
    R(g,j,y+.5,.5,h-1,tint(c,-.5));R(g,j+.5,y+.5,.5,h-1,rgba(tint(c,.2),.5))}
  g.fillStyle=lg(g,0,117,0,128,['rgba(20,12,8,.5)','rgba(20,12,8,0)']);g.fillRect(0,117,320,11);
  /* the cap: a rounded rail, its top in the light, its front turning into the shade */
  g.fillStyle=lg(g,0,111,0,117.5,[tint(W,.32),tint(W,.12),W,tint(W,-.25),tint(W,-.45)]);g.fillRect(0,111,320,6.5);
  grainSky16(g,0,111,320,6.5,W,185,.8);R(g,0,111,320,.5,rgba('#fff0d0',.55));R(g,0,111.5,320,.5,rgba('#ffe2b0',.25));R(g,0,117,320,.5,'#2a1a0e');
  /* the soft shade the cap throws on the strake under it, and the wear of hands along its top */
  for(let i=0;i<16;i++){const x=r()*320;R(g,x,112,4+r()*12,.5,rgba('#fff4dc',.12+r()*.1))}}
/* ornSky16: the stern ornament, the curled head of the stern post, rising from the left end of the rail and curling back toward us
   below the horizon; carved, lit from the right */
function ornSky16(g,k){const[hx,hy]=ORN16(k),W='#6c4828',
  /* the neck: from the rail it rises and leans toward the right, then the head turns back over itself in a scroll */
  out=[0,117,0,108,3,100,7.4,92,12,85,16.6,hy+9,19.6,hy+4,22.6,hy+.6,26.4,hy-.8,30,hy+.6,31.6,hy+3.8,30.4,hy+7.4,27.4,hy+9.2,24.2,hy+9,
    22.8,hy+11.2,21.6,86,17.6,94,13.4,102,10.2,110,9,117];
  comp(g,'multiply',.35,()=>poly(g,out.map((v,i)=>i%2?v+1.2:v+1.6),'#3a2a40'));
  poly(g,out);g.fillStyle=lg(g,2,0,28,0,[tint(W,-.38),tint(W,-.05),tint(W,.22)]);g.fill();
  clipTo(g,()=>poly(g,out),()=>{g.save();g.translate(12,100);g.rotate(-1.05);grainSky16(g,-40,-14,80,28,W,187,1.4);g.restore();
    /* a carved collar round the neck, two grooves and the raised band between them, darker with old pitch */
    for(const[y0,c,a]of[[101.2,'#2a1a0e',.7],[102,'#e0b47c',.45],[104.6,'#2a1a0e',.7]])stroke(g,[1,y0+4.6,16,y0-2.6],rgba(c,a),.6);
    poly(g,[1,106.4,16,99,16,101.6,1,109],rgba('#4a2e18',.45));
    /* the lit edge on the right of the neck, the shade on its left */
    stroke(g,[9.6,117,10.6,110,13.8,102,18,94,21.8,86,23.2,hy+11],rgba('#f6d4a0',.6),.7);
    stroke(g,[.4,108,3.4,100,7.8,92.4,12.4,85.4,16.8,hy+9.6],rgba('#2a1a10',.45),.8);
    /* the scroll cut into the head: a groove that winds in and stops, never a ring */
    stroke(g,[29.8,hy+5.6,29.6,hy+2.4,27,hy+1,24.2,hy+2,23.6,hy+4.8,25.4,hy+6.6,27.6,hy+5.6,27.4,hy+3.8],rgba(tint(W,-.55),.85),.6);
    stroke(g,[30.4,hy+5,30.2,hy+2.2],rgba('#f6dcae',.7),.5)});
  stroke(g,[19.6,hy+4,22.6,hy+.6,26.4,hy-.8,30,hy+.6],rgba('#fae2b6',.85),.5)}
/* handSky16: the tiller of the steering oar, coming in from the right, level along the rail; the master's hand on it and his forearm */
function handSky16(g){const W='#7a5634',S='#b47e58';
  comp(g,'multiply',.4,()=>R(g,244,125,80,3,'#3a2a3a'));
  R(g,246,118.6,76,5.4,W);R(g,246,118.6,76,1,tint(W,.35));R(g,246,123,76,1,tint(W,-.4));grainSky16(g,246,119.6,76,3.4,W,186,.8);
  poly(g,[244.2,119.2,246.6,118.6,246.6,124,244.2,123.4],tint(W,-.2));R(g,244.2,119.2,.5,4.2,tint(W,.2));
  /* the forearm from the lower right, bare and sunburnt, and the fist over the tiller: four fingers curled under it, knuckles lit */
  const arm=[320,138,320,129,300,122.6,292,121.6,288.6,124.8,298,131,306,139,318,144];
  poly(g,arm);g.fillStyle=lg(g,300,122,312,140,[tint(S,.18),S,tint(S,-.3)]);g.fill();
  clipTo(g,()=>poly(g,arm),()=>{stroke(g,[320,129.6,300,123.2,292.6,122.2],rgba('#f2c8a0',.6),.6);tex(g,'mott',.2,286,120,36,24,'overlay',1)});
  const fist=[281.8,118.2,285,116.2,290.6,116,294.6,117.4,296.2,120.4,295.4,124.6,291.6,126.2,286,126,282,124.6,280.6,121.4];
  comp(g,'multiply',.4,()=>poly(g,fist.map((v,i)=>i%2?v+1:v+.6),'#3a2a3a'));
  poly(g,fist);g.fillStyle=lg(g,0,116,0,126,[tint(S,.22),S,tint(S,-.25)]);g.fill();
  clipTo(g,()=>poly(g,fist),()=>{for(const x of[284.6,287.6,290.6])R(g,x,121.4,.5,4.2,rgba(tint(S,-.45),.6));
    for(const x of[282.6,285.6,288.6,291.6])R(g,x+.6,117.4,1.6,.5,rgba('#f6d2ac',.65));
    R(g,293.2,118,1.4,3.6,rgba(tint(S,-.3),.5))});
  R(g,281.4,121,.5,2.6,rgba(tint(S,-.4),.6))}
function drawSky16(g,t){const k=ROUND16(),C=oSky16(k),S=SKY16[k],Wt=SHARED.weather;
  if(!C.S){C.S=SHARED.coast.seaMotion(C.O);C.S.open=(x,y)=>openSky16(k,x,y)}
  if(!C.L)C.L=SHARED.coast.skyLayer(C.O);C.L.draw(g,t);
  C.S.draw(g,t);
  for(const[x,y]of C.hearths)Wt.smoke(g,t,x,y-.5,C.W,{h:26,c:'#eeeae2',a:.6});
  /* the pennant: with the wind; in round 3 the ship swings on the current, and the pennant with her */
  const s=t/1000,W=S.swing?{pennant:{dx:Math.sin(s*.45)*.95,dz:.3*Math.cos(s*.45),lift:.62,flap:.9}}:C.W,[px,py]=ORN16(k);
  Wt.pennant(g,t,px,py,W,{len:20,w:2.8,c:'#b03c2c'});
  /* the boy's wool tuft on its short stick, lying along the rail, set as the player has set it; and his knotted cord along the face */
  const sk=sky16(),dir=TUFT16[sk.dir].k,tx=166,ty=113.6;
  comp(g,'multiply',.4,()=>R(g,137,ty+.6,30,1.6,'#3a2a3a'));
  R(g,134,ty-1.4,32,2.6,'#6e4e2e');R(g,134,ty-1.4,32,.6,'#c89c6e');R(g,134,ty+.8,32,.4,'#3e2a18');R(g,165,ty-1.6,1.6,3,'#5a3e24');
  const e={up:[12,.8],down:[-11,-1.8],land:[2.4,8.4],sea:[3.6,-6.4]}[dir],wv=Math.sin(s*7)*.6;
  for(let j=0;j<7;j++){const o=(j-3)*.5,ex=tx+e[0]+o*(dir==='land'||dir==='sea'?1:.2)+(j%2?wv:-wv)*.6,ey=ty+e[1]+o*(dir==='up'||dir==='down'?1:.3);
    stroke(g,[tx+.4,ty-.2+o*.3,(tx+ex)/2+wv*.4,(ty+ey)/2+.3*j*.2,ex,ey],j===3?'#fbf8ee':j%2?'#e6ded0':'#d2c8b4',j===3?1:.7)}
  R(g,tx-.4,ty-1.8,2.4,3.4,'#f0e8d8');R(g,tx-.4,ty-1.8,2.4,.6,'#fffaf0');
  const cy=126.4;comp(g,'multiply',.35,()=>R(g,189,cy+1,38,1.2,'#3a2a3a'));
  R(g,186,cy-1.6,2.4,3.2,'#4e3620');R(g,226.6,cy-1.6,2.4,3.2,'#4e3620');R(g,186,cy-1.6,2.4,.5,'#a07a52');R(g,226.6,cy-1.6,2.4,.5,'#a07a52');
  stroke(g,[188.4,cy,207,cy+.6,226.6,cy],'#b8a47a',1.5);stroke(g,[188.4,cy-.5,207,cy+.1,226.6,cy-.5],'#ece0bc',.5);
  for(let i=0;i<sk.str;i++){const x=197+i*10;R(g,x-2,cy-1.8,4,3.6,'#9a8258');R(g,x-2,cy-1.8,4,.8,'#e8d8ac');R(g,x+1.4,cy-1,.6,2.6,'#5e4c30');R(g,x-1,cy-.4,1.4,.5,'#c8b488')}}
function frontSky16(g){const sk=sky16();R(g,0,0,320,9,'rgba(14,10,18,.55)');cap16(g,T('the_boy_will_report',{dir:T(TUFT16[sk.dir].n),str:T(CORD16[sk.str])}),160,4.6,300)}
/* ==== ART sky16: end ==== */

/* ==== ART watch16: begin ==== */
/* A close view: Luke's wax tablet by lamplight, lying on the deck, in the fine manner of the close views of Chapters Thirteen to Fifteen.
   A frame of boxwood, its grain running the long way and mitred at the corners, round dark wax that the lamp at the upper right lights
   with a soft sheen; the frame throws a thin shade onto the wax along its top and right. The four watches of the night are written down
   it as four separate rows, each with its name scratched in at the left and its own ruled groove under it, which stops short of the
   frame at both ends: level lines only, no column and no grid. Below the tablet, on the planks of the deck, lie the name tokens that
   have not been laid yet: small tags of light wood with a name burnt in; a token laid on the tablet lies in its row, one on each side
   of the row's middle, and the one picked up is lifted toward the light. A bronze stylus lies on the deck at the lower right.
   Called from outside: ART.watch16, ROWS16 (the rows), tokenBox16(id) (where a token lies, for its hotspot and the painter). Reads G.w16
   (where each token lies) and G.w16s (the one picked up). Hotspots: the four rows 20,ROWS16[i],280,22 · each token at tokenBox16 ·
   back to the deck 220,134,100,10. */
const ROWS16=[10,33,56,79];
ART.watch16={w:320,q:12,paint(g){paintWatch16(g)},light:null,draw(g,t){drawWatch16(g,t)},front(){}};
/* grainW16: wood with its grain running along it, the lines a little lighter or darker than the wood, all waving alike so that none
   crosses another, and here and there a pore (the boxwood of Chapter Fourteen's sealed tablet) */
function grainW16(g,x,y,w,h,c,seed,a){const r=rng(seed),f=.04+r()*.03,p=r()*6,A=.4+r()*.5;a=a==null?1:a;
  inRect(g,x,y,w,h,()=>{R(g,x,y,w,h,c);for(let yy=y-2;yy<y+h+2;yy+=.5+r()*1.1){const col=r()<.55?rgba(tint(c,-.3),(.12+r()*.18)*a):rgba(tint(c,.24),(.08+r()*.16)*a),pts=[];
      for(let xx=x-1;xx<=x+w+2;xx+=1.5)pts.push(xx,yy+A*Math.sin(xx*f+p)+.35*Math.sin(xx*f*2.6+p*1.7));stroke(g,pts,col,.5)}
    for(let i=0;i<w*h/50;i++)R(g,x+r()*w,y+r()*h,1+r()*1.5,.5,rgba(tint(c,-.42),.28*a))})}
/* deckW16: the planks of the deck, running across, each with its own tone and grain; each butt joint stops inside its own plank, and the
   joints of one plank are never in line with those of the next */
function deckW16(g,y0,y1,c,seed){const r=rng(seed);for(let y=y0,i=0;y<y1;y+=9.2,i++){const cc=tint(c,(r()-.5)*.14);grainW16(g,0,y,320,9.2,cc,seed+i*7,.9);
    R(g,0,y,320,.5,tint(cc,-.55));R(g,0,y+.5,320,.5,rgba(tint(cc,.2),.16));
    for(let x=12+(i*67)%160+r()*8;x<320;x+=160){R(g,x,y+.5,.5,8.6,tint(cc,-.5));R(g,x+.5,y+.5,.5,8.6,rgba(tint(cc,.2),.4))}}}
/* the tablet: frame and wax, with the lamp's light and the shade it throws */
const TAB16=[12,4,296,104],WAX16=[18.5,9.5,283,93];
function paintWatch16(g){const r=rng(1607),[x,y,w,h]=TAB16,[wx,wy,ww,wh]=WAX16,B='#a8875c';
  deckW16(g,0,144,'#6e4e30',1610);
  /* the tablet's soft shade on the deck, thrown down and to the left */
  for(const[d,a]of[[5,.12],[3.4,.16],[2,.22],[1,.28]])comp(g,'multiply',1,()=>R(g,x-d*1.1,y+d*.9,w+d*.4,h+d*.5,rgba('#2a2036',a)));
  /* the frame: four pieces of boxwood, mitred at the corners; the edges turned to the lamp lit, the others in shade */
  grainW16(g,x,y,w,h,B,1611);
  for(const[px,py]of[[x,y],[x+w,y],[x,y+h],[x+w,y+h]]){const ix=px===x?wx:wx+ww,iy=py===y?wy:wy+wh;stroke(g,[px,py,ix,iy],rgba(tint(B,-.45),.55),.5)}
  R(g,x,y,w,.5,tint(B,.4));R(g,x+w-.5,y,.5,h,tint(B,.3));R(g,x,y,.5,h,tint(B,-.2));R(g,x,y+h-.5,w,.5,tint(B,-.35));
  /* the wax, dark and smooth, with old writing smoothed away and the lamp's sheen on it */
  R(g,wx-.5,wy-.5,ww+1,wh+1,tint(B,-.55));
  g.fillStyle=lg(g,wx+ww,wy,wx,wy+wh,['#4c3622','#38281a','#2a1d12']);g.fillRect(wx,wy,ww,wh);
  tex(g,'mott',.22,wx,wy,ww,wh,'overlay',1);
  for(let i=0;i<46;i++){const sx=wx+6+r()*(ww-20),sy=wy+4+r()*(wh-8),l=6+r()*22,p=[sx,sy];for(let u=2;u<l;u+=2)p.push(sx+u,sy+Math.sin(u*.7+i)*.4);stroke(g,p,rgba('#6a5034',.12+r()*.1),.5)}
  pool(g,wx+ww*.78,wy+wh*.22,ww*.34,wh*.32,'#f0d4a0',.16,'screen');
  /* the shade the frame throws on the wax along its top and its right, away from the lamp's height; a lit lip on the left and below */
  g.fillStyle=lg(g,0,wy,0,wy+3,['rgba(10,6,4,.55)','rgba(10,6,4,0)']);g.fillRect(wx,wy,ww,3);
  g.fillStyle=lg(g,wx+ww,0,wx+ww-3,0,['rgba(10,6,4,.45)','rgba(10,6,4,0)']);g.fillRect(wx+ww-3,wy,3,wh);
  R(g,wx,wy+wh-.5,ww,.5,rgba('#a07a4c',.5));R(g,wx,wy,.5,wh,rgba('#a07a4c',.35));
  /* four rows, each with its own ruled groove, cut with the stylus's point: dark in the groove, a pale lip under it; none reaches the frame */
  for(const ry of ROWS16){const gy=ry+21,a=wx+6+r()*2,b=wx+ww-6-r()*2;stroke(g,[a,gy,b,gy+.2],'rgba(8,4,2,.7)',.5);stroke(g,[a+1,gy+.5,b-1,gy+.7],'rgba(200,168,118,.35)',.5)}
  /* the stylus: bronze, lying along the planks at the lower right, its point to the left and its flat end, for smoothing the wax, to the right */
  comp(g,'multiply',.5,()=>R(g,238,139.6,56,1.4,'#2a2036'));
  poly(g,[236,138.6,240,137.8,288,137.8,288,139.4,240,139.4],'#8a6a3a');R(g,240,137.8,48,.5,'#e2bc78');
  poly(g,[288,137.2,295,136.6,295,140.2,288,139.8],'#7a5c30');R(g,288,137.2,7,.5,'#d4ac6c');
  /* the lamp at the upper right, out of the picture: its warm light over everything, falling away toward the lower left */
  comp(g,'multiply',1,()=>{g.fillStyle=rg(g,318,-6,380,['#fff6ea','#e6d2bc','#a08c94','#5a4a5e']);g.fillRect(0,0,320,144)});
  pool(g,300,4,120,60,'#ffc070',.12,'screen')}
function tokenW16(g,x,y,w,h,name,sel){const C=sel?'#dcb67e':'#c8a26c',k=sel?2.4:1.2;
  for(const[d,a]of[[k+1,.14],[k,.24]])R(g,x-d,y+d*.8,w,h,rgba('#1c1424',a));
  grainW16(g,x,y,w,h,C,name.length*31+x|0,.8);
  R(g,x,y,w,.5,tint(C,.45));R(g,x+w-.5,y,.5,h,tint(C,.3));R(g,x,y,.5,h,tint(C,-.25));R(g,x,y+h-.5,w,.5,tint(C,-.4));
  comp(g,'multiply',1,()=>{g.fillStyle=rg(g,318,-6,380,['#ffffff','#f6ece0','#dcd0cc','#c4b8b8']);g.fillRect(x,y,w,h)});
  if(sel)pool(g,x+w*.6,y+h*.3,w*.5,h*.6,'#fff0c8',.25,'screen');
  g.save();g.shadowColor='rgba(255,236,200,.35)';g.shadowOffsetX=0;g.shadowOffsetY=1;cap16(g,name,x+w/2,y+h/2+.2,w-4,{sz:4.6,ink:'#3a1e0a'});g.restore()}
function drawWatch16(g,t){
  g.save();g.shadowColor='rgba(6,3,1,.8)';g.shadowOffsetX=1;g.shadowOffsetY=1;
  WATCHES16.forEach((k,i)=>cap16(g,k,64,ROWS16[i]+11,84,{sz:5,ink:'#d4bc8a'}));g.restore();
  for(const m of WATCH_MEN16){const[x,y,w,h]=tokenBox16(m.id),sel=G.w16s===m.id;tokenW16(g,x,y-(sel?1.5:0),w,h,m.name,sel)}}
/* ==== ART watch16: end ==== */

/* ==== ART miletus16: begin ==== */
/* Miletus: a quay of one of its harbors, in the late morning; the sun is high at the right, and shadows fall to the left. Warehouses of
   dressed stone at the left, with their wide doors, one of them open on the dark and the bales inside; bales of wool on the quay; across
   the water the far shore of the harbor, its quay, its stores and houses, and on the slope above them, small, the theater, seen from
   outside and empty: its seats a fan of curved tiers with one walkway following the curve, no stair drawn across them, and its low stage
   building in front. Nobody is in it, and nothing goes on there. The coaster lies moored at the right, bow to the left, her mast out of
   the picture at the right (the coaster of the Troas quay, turned: shipQuay16); she rises and falls on the swell behind the stone edge
   of the quay. The torn awning lies spread on the paving until it is mended. At the right end of the quay, off the way anyone takes,
   one bale by itself, finer than the rest, its wrapping turned back from the fleece (the hidden treasure).
   One horizon, y 60 (HZMiletus16). Painted with SHARED.coast in one light. The road along the shore leaves at the left edge.
   Called from outside: ART.miletus16. Reads F.mended (the awning). Hotspots: the harbor 0,56,320,42 · the warehouses 0,18,110,80 · the
   theater 120,40,70,20 · the coaster 210,34,110,66 · the bales of wool 116,92,42,26 · the awning 150,120,80,14 (until mended) · the
   bale at the end 292,98,28,22 · the road to the shore 0,96,14,44. Walk strip 16..304, 112..138. Actors (place16): Timothy 60,118 ·
   Menon 96,127 · Luke 186,114 · the master 254,120; Paul comes in at 140,130. The stacked bales and the lone bale are props with feet,
   and so is the awning on the paving. Heads come at y 64..90: behind them lie the warehouses' stone, open water and the hull; the
   theater stands well above them, small. Gulls (ROOMS.miletus16.birds) stand on the quay's edge at x 163..172, clear of Luke. */
const HZMiletus16=60,EDGEMiletus16=100;
ART.miletus16={w:320,q:12,variant:()=>F.mended?'m':'',paint(g,v){paintMiletus16(g,v)},light:{amb:'#f8ecd8',sun:[-.45,.22,.45]},draw(g,t){drawMiletus16(g,t)},front(){},
  props:[{y:117,shape(g){balesMiletus16(g,1)},foot:[[117,112,40,5]]},{y:119,shape(g){loneMiletus16(g,1)},foot:[[294,114,24,5]]},
    {y:133,shape(g,v){if(v==='')awningMiletus16(g,1)},foot:v=>v===''?[[148,122,84,12]]:[]}]};
let OMiletus16=null,PMiletus16={};
const oMiletus16=()=>OMiletus16||(OMiletus16={w:320,hz:HZMiletus16,hour:'morning',sun:[372,-56],cloud:.24,wind:SHARED.weather.wind({from:'n',force:2,view:'w'}),seed:1641,y1:EDGEMiletus16});
/* the far shore: its hill, highest behind the theater */
const farMiletus16=x=>HZMiletus16+3-(x<230?27-Math.pow((x-156)/74,2)*16:11+Math.min(9,(x-230)*.1))-1.2*Math.sin(x/7);
function paintMiletus16(g,v){const K=SHARED.coast,O=oMiletus16(),L=K.light(O),r=rng(1608),P=PMiletus16={};
  K.sky(g,O);
  P.S=K.sea(g,O);
  /* across the water: the hill, the stores and houses along the far quay, and the theater on the slope */
  K.land(g,L,.42,q=>{const H=[84,64];for(let x=84;x<=322;x+=1)H.push(x,farMiletus16(x));H.push(322,64);SHARED.country.crag(q,H,'#a89e80',1642,{light:1,dip:.02,bed:6,scrub:22})});
  P.T1=K.town(g,O,{x0:84,x1:126,base:64,hill:x=>Math.max(farMiletus16(x)+6,64-(x-84)*.5),rows:2,size:6,dist:.4,seed:1643,gaps:.2,warehouses:[[90,22,4.4]]});
  P.T2=K.town(g,O,{x0:188,x1:322,base:64,hill:x=>Math.max(farMiletus16(x)+4,64-(322-x)*.4),rows:3,size:6,dist:.4,seed:1644,gaps:.25,warehouses:[[192,26,4.6],[222,30,5]]});
  theaterMiletus16(g,L);
  K.quay(g,O,{view:'face',x0:84,x1:322,y:63.4,face:1.6,seed:1645,dist:.4});
  /* the quay we stand on */
  K.quay(g,O,{view:'top',y:EDGEMiletus16,y1:144,bollards:[112,197.5],bsize:6,seed:1646,c:'#c8b898',rows:6,step:34});
  P.S.open=(x,y)=>y<EDGEMiletus16-.5&&y>65.4&&x>108&&!(x>200&&y>40);
  if(true)for(let i=0;i<90;i++){const x=203-Math.pow(r(),1.6)*40,y=80+r()*20;if(y<82+(203-x)*.3)continue;R(g,x,y,1.5+r()*5,.5,`rgba(30,42,78,${(.4*(1-(203-x)/44)).toFixed(2)})`)}
  wearMiletus16(g,r);warehousesMiletus16(g,r);thingsMiletus16(g,r);
  balesMiletus16(g);loneMiletus16(g);if(v==='')awningMiletus16(g);
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(180,170,200,.7)','rgba(255,220,170,.5)','rgba(255,214,160,1)']);g.fillRect(0,0,320,144)});
  ao(g,0,124,320,20,'b',.12,'#2a2050')}
/* the theater, far off: the curved tiers of its seats as bands of pale stone, darker where a row's riser is in shade; one walkway along
   the curve; the low stage building in front. Seen from outside, from across the water: nobody in it. */
function theaterMiletus16(g,L){SHARED.coast.land(g,L,.36,q=>{const cx=155,cy=57.6,RX=27,RY=14,rx=8,ry=2.8,
    arc=(k,a0,a1)=>{const p=[];for(let a=a0;a<=a1+1e-6;a+=Math.PI/64)p.push(cx+Math.cos(a)*(rx+(RX-rx)*k),cy-Math.sin(a)*(ry+(RY-ry)*k));return p},
    band=(k0,k1)=>{const a=arc(k1,0,Math.PI),b=arc(k0,0,Math.PI);for(let i=b.length-2;i>=0;i-=2)a.push(b[i],b[i+1]);return a};
  /* what it is cut into: the slope round it a little darker, and its outer wall */
  poly(q,band(1,1.06),'#9a8c76');
  poly(q,band(0,1));q.fillStyle=lg(q,cx-RX,0,cx+RX,0,['#d2c4a6','#e2d6bc','#cbbd9e']);q.fill();
  /* the rows: a lit seat and a shaded riser each, following the curve */
  for(let k=.06;k<1;k+=.075){const p=arc(k,0,Math.PI);stroke(q,p,'rgba(96,80,72,.38)',.5);stroke(q,p.map((v,i)=>i%2?v-.5:v),'rgba(255,246,222,.3)',.4)}
  /* the one walkway, along the curve halfway up */
  poly(q,band(.5,.56),'#ece2c8');stroke(q,arc(.5,0,Math.PI),'rgba(96,80,72,.4)',.5);
  /* the bowl's right side turned a little from the sun */
  clipTo(q,()=>poly(q,band(0,1)),()=>{q.fillStyle=lg(q,cx-RX,0,cx+RX,0,['rgba(255,236,200,.22)','rgba(255,236,200,0)','rgba(90,86,130,.18)']);q.fillRect(cx-RX,cy-RY,RX*2,RY+1)});
  /* the orchestra, and the low stage building across the front with its doorways */
  poly(q,arc(0,0,Math.PI).concat([cx-rx,cy+.4,cx+rx,cy+.4]),'#c6b494');
  R(q,cx-21,cy-2,42,3.4,'#c8b89a');R(q,cx-21,cy-2,42,.5,'#f2e6c8');R(q,cx-21,cy+.9,42,.5,'#8a7a6a');
  for(const dx of[-14,-6,2,10])R(q,cx+dx,cy-1.1,2,2,'#5a4c48')})}
function wearMiletus16(g,r){const S=y=>(y-HZMiletus16)/84;
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,108,0,140,['rgba(255,244,216,0)','rgba(255,244,216,.8)','rgba(255,244,216,0)']);g.fillRect(0,108,320,32)});
  for(let i=0;i<130;i++){const y=104+Math.pow(r(),.8)*40,k=S(y),x=r()*320;R(g,x,y,(2+r()*8)*k,.5+k*.5,r()<.55?'rgba(96,78,62,.15)':'rgba(255,246,224,.16)')}
  for(let i=0;i<90;i++){const y=104+r()*40,x=r()*320;R(g,x,y,.5+r()*(1+S(y)),.5,r()<.35?'rgba(236,228,212,.7)':r()<.5?'rgba(70,58,50,.36)':'rgba(214,186,110,.45)')}
  for(let i=0;i<40;i++){const x=108+r()*212;R(g,x,EDGEMiletus16+3.2+r()*2.4,1+r()*5,.5,r()<.5?'rgba(84,98,68,.3)':'rgba(70,60,56,.24)')}}
/* the warehouses: dressed stone, flat roofs behind a plain cornice, wide doorways with plank doors; the second stands a little back and
   shows its side to the sun; its door is open on the dark and on bales stacked inside */
function doorMiletus16(g,x,y,w,h,r){R(g,x-1.4,y-1.6,w+2.8,1.6,'#b4a688');R(g,x-1.4,y-1.6,w+2.8,.5,'#efe2c4');
  for(let i=0;i<w-.01;i+=2.6){const ww=Math.min(2.6,w-i),c=tint('#6e4c30',(r()-.5)*.18);R(g,x+i,y,ww,h,c);R(g,x+i,y,.5,h,tint(c,.18));R(g,x+i+ww-.5,y,.5,h,tint(c,-.35))}
  inRect(g,x,y,w,h,()=>{tex(g,'vert',.25,x,y,w,h,'overlay',.5);ao(g,x,y,w,5,'t',.55);ao(g,x,y,2.6,h,'l',.3)});R(g,x+w/2-.5,y+h*.52,1,1,'#2a1e16')}
function warehousesMiletus16(g,r){const A='#cbbb9c',B='#d2c2a2';
  /* the second, set back: its side towards the sun, then its front */
  poly(g,[108,37.4,113.4,40.4,113.4,101.6,108,104],'#e4d2ac');clipTo(g,()=>poly(g,[108,37.4,113.4,40.4,113.4,101.6,108,104]),()=>{tex(g,'mott',.4,107,36,8,70,'overlay',.5);for(let y=42;y<102;y+=3.4)stroke(g,[108,y,113.4,y-.2],'rgba(84,66,56,.25)',.4)});
  ashlarQuay16(g,56,38,52,66,B,r,{bw:12.4,bh:5.2,v:.07});tex(g,'mott',.4,56,38,52,66,'overlay',.5);
  R(g,55.4,34.6,53.2,3.6,tint(B,.12));R(g,55.4,34.6,53.2,.6,'#fff2d6');R(g,56,38.2,52,.8,tint(B,-.4));
  R(g,70,80,16,24,'#1a120e');g.fillStyle=lg(g,0,80,0,104,['#120c0a','#22180f','#3a2a1e']);g.fillRect(71,81,14,23);
  inRect(g,71,81,14,23,()=>{for(const[x,y,w,h,c]of[[72,103.6,6.2,5.6,'#bfae8c'],[78.4,103.6,6,5.4,'#b4a282'],[74.6,98.2,6.2,5.2,'#c8b896']])baleMiletus16(g,x,y,w,h,c);
    comp(g,'multiply',.62,()=>R(g,71,81,14,23,'#40364a'));ao(g,71,81,14,8,'t',.6)});
  R(g,69.4,78.4,17.2,1.6,'#b8aa8a');R(g,69.4,78.4,17.2,.5,'#efe2c4');
  doorMiletus16(g,93,84,10,20,r);
  ao(g,56,90,52,14,'b',.24,'#4a3424');comp(g,'multiply',.25,()=>{g.fillStyle=lg(g,56,0,108,0,['rgba(150,146,188,1)','rgba(150,146,188,.2)']);g.fillRect(56,34,52,70)});
  /* the first, nearer and taller, running out of the picture at the left */
  ashlarQuay16(g,-2,24,58,80,A,r,{bw:13,bh:5.4,v:.07});tex(g,'mott',.4,-2,24,58,80,'overlay',.5);
  R(g,-2,20.4,58.6,3.8,tint(A,.12));R(g,-2,20.4,58.6,.6,'#fff2d6');R(g,-2,24.2,58,.8,tint(A,-.4));
  for(const x of[6,32])doorMiletus16(g,x,82,13,22,r);
  /* a row of narrow vents high up, to air the wool */
  for(const x of[8,18,28,38,48]){R(g,x,30.6,1.2,3.2,'#2e2420');R(g,x+1.2,30.6,.5,3.2,tint(A,.2))}
  ao(g,-2,90,58,14,'b',.24,'#4a3424');comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,0,56,0,['rgba(150,146,188,1)','rgba(150,146,188,0)']);g.fillRect(-2,20,58,84)});
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,30,0,56,0,['rgba(255,214,150,0)','rgba(255,214,150,1)']);g.fillRect(30,20,26,84)});
  /* the shadow the first throws on the front of the second */
  shade(g,[56,38,61,38,61,104,56,104],'#a29ac4',.4)}
/* what stands at the warehouses' foot: jars against the wall, and a basket; their shadows to the left */
function thingsMiletus16(g,r){const SH='rgba(44,38,76,.3)';
  for(const[x,y,w,h]of[[52,106,3.4,9],[58.6,106.4,3.6,10],[100,105.6,3,7.4]])poly(g,[x,y+.4,x-w-h*1.4,y-.2,x-w-h*1.4,y-1.2,x-w*.4,y-1.6],SH);
  vessel(g,52,106,3.4,9,'#a8663e','amph',{noShadow:1});vessel(g,58.6,106.4,3.6,10,'#9c5c36','amph',{noShadow:1});vessel(g,100,105.6,3,7.4,'#b0704a','jar',{noShadow:1});
  for(let i=0;i<14;i++){const x=66+r()*40;R(g,x,104.6+r()*2,1+r()*2.4,.5,'rgba(240,232,214,.6)')}}
/* a bale of wool: fleece pressed into a bundle and sewn into coarse sacking, its sides bulging, its corners drawn out into ears where
   the seams meet; we look a little down on it, so its top shows. Seams along its edges only, nothing tied across it. Lit from the right
   and above. With cut, its outline. */
function baleMiletus16(g,x,y,w,h,c,cut){const t=Math.min(3.2,h*.27),dx=Math.min(1.6,w*.08),
    F=[x+.8,y,x-.4,y-h*.5,x,y-h+t,x+w,y-h+t,x+w+.4,y-h*.5,x+w-.8,y],
    TOP=[x,y-h+t,x+dx-.6,y-h+.6,x+dx+.8,y-h,x+w+dx-1,y-h,x+w+dx,y-h+.8,x+w,y-h+t];
  if(cut){poly(g,F.concat([x+w+dx,y-h,x+dx,y-h]),'#000');return}
  poly(g,F);g.fillStyle=lg(g,x,0,x+w,0,[tint(c,-.3),tint(c,-.04),tint(c,.1)]);g.fill();
  clipTo(g,()=>poly(g,F),()=>{g.fillStyle=lg(g,0,y-h+t,0,y,['rgba(60,44,40,.16)','rgba(255,248,226,.16)','rgba(255,248,226,.04)','rgba(40,30,40,.34)']);g.fillRect(x-1,y-h,w+2,h);
    tex(g,'mott',.3,x-1,y-h-1,w+2,h+1,'overlay',.9);tex(g,'grain',.2,x-1,y-h-1,w+2,h+1,'overlay',.6);
    /* creases where the sacking is drawn in at the corners */
    stroke(g,[x+.6,y-h+t+1,x+2.6,y-h+t+3.2],'rgba(70,52,40,.3)',.5);stroke(g,[x+w-.6,y-h+t+1,x+w-2.4,y-h+t+3],'rgba(255,246,222,.3)',.5);
    stroke(g,[x+1,y-1,x+3,y-2.6],'rgba(70,52,40,.25)',.5);ao(g,x-1,y-2.4,w+2,2.4,'b',.35,'#3a2c2c')});
  poly(g,TOP);g.fillStyle=lg(g,x,0,x+w,0,[tint(c,.1),tint(c,.26),tint(c,.34)]);g.fill();
  clipTo(g,()=>poly(g,TOP),()=>tex(g,'mott',.35,x,y-h,w+dx,t+1,'overlay',.6));
  /* the seam along the top edge, and the ears at its corners */
  for(let i=x+1;i<x+w-.6;i+=1.6)R(g,i,y-h+t-.4,.8,.5,tint(c,-.28));
  poly(g,[x,y-h+t,x-1,y-h+t-.8,x-.2,y-h+t-1.4],tint(c,.12));poly(g,[x+w+dx,y-h+.8,x+w+dx+1,y-h+.2,x+w+dx+.4,y-h+1.6],tint(c,.3));
  R(g,x+w+.1,y-h*.5,.5,h*.4,tint(c,.22))}
function tuftMiletus16(g,x,y){poly(g,[x,y,x+1.2,y-1.4,x+2.6,y-1,x+3.4,y-.2,x+2.4,y+.8,x+.8,y+.6],'#f4eee0');R(g,x+1.2,y-.8,1.2,.5,'#fffcf2');R(g,x+.6,y+.4,2,.5,'#cfc4ac')}
function balesMiletus16(g,cut){if(!cut){poly(g,[118,116.8,156,116.8,150,113.8,104,113,99,115.2],'rgba(44,38,76,.3)');SHARED.materials.shadow(g,137,116.6,21,1.4,.45)}
  baleMiletus16(g,117.4,116.6,19,12,'#cbb690',cut);baleMiletus16(g,137,116.8,19.6,12.4,'#c2ac86',cut);baleMiletus16(g,125.6,105,20,11,'#d4c09a',cut);
  if(!cut){tuftMiletus16(g,135.4,103.4);tuftMiletus16(g,116.6,112.4)}}
/* the bale at the end: finer, wrapped in pale linen, the wrapping turned back at the top from fleece as white as cream */
function loneMiletus16(g,cut){const x=295,y=118.4,w=21,h=12.4,dx=1.6;
  if(cut){baleMiletus16(g,x,y,w,h,'#000',1);poly(g,[x+2,y-h+1,x+4,y-h-2.2,x+18,y-h-2.6,x+w+1,y-h+1],'#000');return}
  poly(g,[x+1,y+.2,x+w,y+.2,x+w-10,y-2.6,x-17,y-2,x-14,y+.2],'rgba(44,38,76,.28)');SHARED.materials.shadow(g,x+w/2,y-.2,13,1.4,.4);
  baleMiletus16(g,x,y,w,h,'#e4dac6');
  /* the fleece swelling out of the opened top in soft locks, lit from the right and above */
  for(const[a,b,rx,ry]of[[5.4,-.6,3.4,2],[9.6,-1.6,3.8,2.4],[14.2,-1.2,3.6,2.2],[18,.2,2.8,1.8],[7.6,.8,3,1.6],[12.4,.6,3.4,1.6],[16.4,1.2,2.6,1.4]]){
    oval(g,x+a-.4,y-h+b+.5,rx,ry,'#c8bca4');oval(g,x+a,y-h+b,rx*.92,ry*.88,'#f4ecdc');oval(g,x+a+rx*.3,y-h+b-ry*.35,rx*.5,ry*.42,'#fffcf4')}
  for(let i=0;i<16;i++){const a=x+3+(i*1.61%16),b=y-h-2.6+(i*.71%3.4);R(g,a,b,1,.5,i%2?'rgba(255,255,250,.7)':'rgba(176,164,140,.45)')}
  /* the linen turned back over the rim at both sides, its fold lit */
  poly(g,[x-.6,y-h+3,x+3.4,y-h+2.4,x+4.4,y-h+5.6,x+1.4,y-h+7,x-.2,y-h+6],'#ece2d0');stroke(g,[x-.6,y-h+3,x+3.4,y-h+2.4],'#fffaf0',.5);
  poly(g,[x+w-3.6,y-h+2.6,x+w+1,y-h+3,x+w+.8,y-h+6.4,x+w-2.2,y-h+5.4],'#f6f0e2');stroke(g,[x+w-3.6,y-h+2.6,x+w+1,y-h+3],'#fffcf4',.5);
  ao(g,x+1,y-h+3,w-2,2,'t',.18,'#5a4a3a')}
/* the torn awning, spread on the paving: dark goat-hair cloth lying a little rumpled, its weave running one way only, two soft folds
   lit along their ridges, a corner turned under, and the tear, a ragged slit in from its near edge with loose threads along it. With
   cut, its outline. */
function awningMiletus16(g,cut){const P=[150.6,124.6,166,123.6,184,124,204,123.2,225.6,122.8,228.4,126.6,231.4,133,214,133.6,196,134.2,172,134.6,148.4,134.8,149.4,129.4];
  if(cut){poly(g,P,'#000');return}
  poly(g,[149,134.8,231.4,133,233.6,134.4,196,135.8,150,136.2],'rgba(44,38,76,.34)');
  poly(g,P);g.fillStyle=lg(g,0,123,0,135,['#5c4e46','#4a3e38','#54463e']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.4,146,122,90,14,'overlay',.7);tex(g,'grain',.3,146,122,90,14,'overlay',.5);
    /* two folds, lit along the ridge and dark in the hollow beyond, both running the same way */
    for(const[a,b]of[[170,175.6],[208,212.4]]){poly(g,[a,123,a+4.6,123,b+3.4,135,b-1.4,135],'rgba(255,232,200,.12)');stroke(g,[a+2.6,123,b+1.6,135],'rgba(255,232,200,.28)',.5);stroke(g,[a+4,123,b+3,135],'rgba(16,10,12,.35)',.5)}
    /* the light from the right lies on its far side */
    g.fillStyle=lg(g,146,0,232,0,['rgba(40,30,50,.2)','rgba(255,226,180,.1)']);g.fillRect(146,122,88,14)});
  /* its hem along the far edge, catching the light */
  stroke(g,[150.6,124.6,166,123.6,184,124,204,123.2,225.6,122.8],'rgba(255,236,206,.35)',.5);
  /* the corner turned under at the right */
  poly(g,[228.4,126.6,231.4,133,226.4,131.6],'#6a5a50');stroke(g,[228.4,126.6,226.4,131.6],'rgba(255,236,206,.3)',.5);
  /* the tear, the paving showing through, threads hanging over its edges */
  const T=[196.6,134.2,198.4,131.4,200.2,129.4,201.6,127,202.8,125.6,203.4,127.4,202.6,129.8,203.8,132,204.2,134];poly(g,T,'#bcac8e');
  stroke(g,[196.6,134.2,198.4,131.4,200.2,129.4,201.6,127,202.8,125.6],'#2e2622',.5);stroke(g,[203.4,127.4,202.6,129.8,203.8,132,204.2,134],'#7a6a5e',.5);
  for(const[a,b]of[[198.2,130.8],[199.9,129],[202.6,128.6],[203.4,131.2]])R(g,a,b,.5,1.1,'#5e5048')}
/* what moves: the sea, the coaster on the swell behind the quay's edge with her forestay and her bow line */
function drawMiletus16(g,t){const P=PMiletus16;if(P.S)P.S.draw(g,t);
  const dy=Math.round(Math.sin(t/1500+2.1)*2)/2-2;
  inRect(g,194,0,126,EDGEMiletus16,()=>{g.save();g.translate(322,dy-12);g.scale(-1,1);g.drawImage(shipQuay16(1),-12,0,136,120);g.restore()});
  stroke(g,[209,46.6+dy,298,-10+dy],'#5a4a3c',.6);stroke(g,[209.4,46.2+dy,298.4,-10.4+dy],'rgba(255,236,196,.45)',.3);
  for(const[c,w]of[['#4a3a2a',1.2],['#d6c498',.6]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(204.4,66+dy);g.quadraticCurveTo(202.4,90,198,96.8);g.stroke()}}
/* ==== ART miletus16: end ==== */

/* ==== ART list16: begin ==== */
/* A close view: a page of Paul's tablets, two leaves lying open side by side on a coping stone of the quay in the morning light, which
   comes from the upper left; each throws its soft shade down and to the right. The leaves are boxwood frames round dark wax, as Luke's
   tablet in watch16 (whose grainW16 paints the wood); nothing ties them across the gap between them. On the left leaf the names he wrote
   in Ephesus, one under another; on the right leaf the places, as he noted them, all scratched into the wax with the stylus. A name
   picked up is lit by a soft glow; a name and a place that belong together are each marked with a small tick (a V, never a cross), and
   a name that is no use here is dimmed. Nothing is struck through.
   Called from outside: ART.list16, NAMES16 and PLACES16 (in the story), rowBox16(side, i). Reads G.l16 (what is matched, what is set
   aside, what is picked up). Hotspots: each name and each place at rowBox16 · back to the quay 220,134,100,10. */
ART.list16={w:320,q:12,paint(g){paintList16(g)},light:null,draw(g,t){drawList16(g,t)},front(){}};
/* stoneList16: the coping stone, veined and weathered, a little worn smooth along the middle; one joint near the foot, where the next
   stone begins */
function stoneList16(g){const r=rng(1612),S='#cabca2';
  g.fillStyle=lg(g,0,0,320,144,[tint(S,.12),S,tint(S,-.12)]);g.fillRect(0,0,320,144);
  tex(g,'mott',.45,0,0,320,144,'overlay',1);tex(g,'grain',.2,0,0,320,144,'overlay',.6);
  for(let i=0;i<9;i++){let x=r()*320,y=r()*144;const p=[x,y],dx=r()-.5,dy=r()-.5;for(let s=0;s<14;s++){x+=dx*6+(r()-.5)*3;y+=dy*6+(r()-.5)*3;p.push(x,y)}
    stroke(g,p,rgba(tint(S,-.3),.18+r()*.12),.5);stroke(g,p.map((v,j)=>j%2?v+.5:v),rgba(tint(S,.3),.14),.5)}
  for(let i=0;i<260;i++){const x=r()*320,y=r()*144;R(g,x,y,.5+r(),.5,rgba(r()<.6?tint(S,-.35):tint(S,.3),.2+r()*.25))}
  R(g,0,131,320,.5,rgba(tint(S,-.5),.8));R(g,0,131.5,320,.5,rgba(tint(S,.3),.5));
  g.fillStyle=lg(g,0,0,320,144,['rgba(255,246,224,.18)','rgba(255,246,224,0)','rgba(60,50,70,.18)']);g.fillRect(0,0,320,144)}
function leafList16(g,x,y,w,h,seed){const B='#a8875c',b=5,wx=x+b,wy=y+b,ww=w-2*b,wh=h-2*b;
  for(const[d,a]of[[5,.1],[3.4,.14],[2,.18],[1,.24]])R(g,x+d*.9,y+d,w,h,rgba('#4a3c4e',a));
  grainW16(g,x,y,w,h,B,seed);
  for(const[px,py]of[[x,y],[x+w,y],[x,y+h],[x+w,y+h]])stroke(g,[px,py,px===x?wx:wx+ww,py===y?wy:wy+wh],rgba(tint(B,-.45),.5),.5);
  R(g,x,y,w,.5,tint(B,.42));R(g,x,y,.5,h,tint(B,.3));R(g,x+w-.5,y,.5,h,tint(B,-.3));R(g,x,y+h-.5,w,.5,tint(B,-.38));
  R(g,wx-.5,wy-.5,ww+1,wh+1,tint(B,-.55));
  g.fillStyle=lg(g,wx,wy,wx+ww,wy+wh,['#4e3824','#3a2a1a','#2c1f13']);g.fillRect(wx,wy,ww,wh);tex(g,'mott',.22,wx,wy,ww,wh,'overlay',1);
  const r=rng(seed+3);for(let i=0;i<24;i++){const sx=wx+4+r()*(ww-16),sy=wy+3+r()*(wh-6),l=5+r()*16,p=[sx,sy];for(let u=2;u<l;u+=2)p.push(sx+u,sy+Math.sin(u*.7+i)*.4);stroke(g,p,rgba('#6a5034',.1+r()*.1),.5)}
  pool(g,wx+ww*.28,wy+wh*.2,ww*.4,wh*.3,'#fff0d0',.12,'screen');
  /* the frame's shade on the wax along its top and its left, toward the light; a lit lip on the right and below */
  g.fillStyle=lg(g,0,wy,0,wy+3,['rgba(10,6,4,.5)','rgba(10,6,4,0)']);g.fillRect(wx,wy,ww,3);
  g.fillStyle=lg(g,wx,0,wx+3,0,['rgba(10,6,4,.45)','rgba(10,6,4,0)']);g.fillRect(wx,wy,3,wh);
  R(g,wx,wy+wh-.5,ww,.5,rgba('#b08a58',.5));R(g,wx+ww-.5,wy,.5,wh,rgba('#b08a58',.4))}
function paintList16(g){stoneList16(g);leafList16(g,8,6,148,116,1613);leafList16(g,164,6,148,116,1614)}
/* writing in the wax: pale where the stylus has cut, with the groove's shade beside it */
function scratchList16(g,s,x,y,w,c){g.save();g.shadowColor='rgba(6,3,1,.8)';g.shadowOffsetX=-1;g.shadowOffsetY=1;cap16(g,s,x,y,w,{left:1,sz:5,ink:c});g.restore()}
function drawList16(g,t){const st=l16();
  NAMES16.forEach((n,i)=>{const[x,y,w,h]=rowBox16('n',i),on=st.sel===n.k,done=st.ok.includes(n.k),off=st.off.includes(n.k);
    if(on){g.fillStyle=lg(g,x,0,x+w,0,['rgba(255,214,150,0)','rgba(255,214,150,.22)','rgba(255,214,150,.22)','rgba(255,214,150,0)']);g.fillRect(x,y+1,w,h-2)}
    scratchList16(g,n.k,x+4,y+h/2,w-16,off?'#7a6650':done?'#b8a276':'#e6d2a4');if(done)tick16(g,x+w-9,y+h/2)});
  PLACES16.forEach((p,i)=>{const[x,y,w,h]=rowBox16('p',i),done=NAMES16.some(n=>st.ok.includes(n.k)&&n.at===p.k);
    scratchList16(g,p.k,x+4,y+h/2,w-16,done?'#b8a276':'#e6d2a4');if(done)tick16(g,x+w-9,y+h/2)})}
/* a tick cut into the wax: a V, its groove dark and its lip pale */
function tick16(g,x,y){stroke(g,[x-2.4,y-.3,x-.4,y+1.9,x+2.8,y-2.6],'rgba(8,4,2,.75)',.9);stroke(g,[x-2.6,y-.7,x-.6,y+1.5,x+2.6,y-3],'#f2e2b4',.6)}
/* ==== ART list16: end ==== */

/* ==== ART shore16: begin ==== */
/* A shaded place by the shore outside Miletus (invented): a tamarisk leaning over a low wall of rough stones, the sea beyond, and far off
   at the right the coaster's stern against the land of a headland, so that nothing of her stands across the horizon. The way down to
   the ship leaves at the right. One horizon, y 58 (HZShore16).
   Called from outside: ART.shore16. Reads nothing. Hotspots: the tamarisk 30,0,120,70 · the wall 0,86,230,20 · the sea 150,50,170,40 ·
   the ship far off 262,44,40,14 · the way down to the ship 290,80,30,50. Walk strip 16..304, 112..138. Actors (place16): Paul 150,117,
   facing left, to the elders; Philon 64,120 · Kleandros 88,129 · Damon 110,114 · Euphranor 40,128 · Polemon 124,133 (all facing right);
   Luke 196,119 · Timothy 222,127 · Trophimus 248,116 (facing left). The elders come in from the left. */
const HZShore16=58;
/* Painted with the shared painters in one light: the sun stands high at the left, out of the picture, so the tamarisk throws its shade
   to the right over the ground where the elders stand (light.shade), and the rest lies in the open sun. OShore16 is the picture's one
   options object. Far off at the right the town's land runs out into the sea, and the coaster lies under it at the quays with her stern
   to us: her mast is short against that land, its top well under the ridge, and nothing of her stands across the open horizon. */
const OShore16={w:320,hz:HZShore16,hour:'midday',cloud:.2,streak:.25,seed:1691,light:-1,sun:[-60,-40],swell:-.4};
let SShore16=null;
ART.shore16={w:320,q:12,paint(g){paintShore16(g)},light:{amb:'#fff4e2',shade:[[24,160,'#c4bcd4']],sun:[.4,.3,.4]},draw(g,t){drawShore16(g,t)},front(){}};
/* the wall's top, a little uneven, and the land of the town across the water */
const wallTopShore16=x=>86+1.2*Math.sin(x/9)+.8*Math.sin(x/3.3)+(x>200?(x-200)*.25:0);
function paintShore16(g){const K=SHARED.coast,CO=SHARED.country,O=OShore16,HZ=HZShore16;
  if(!O.wind)O.wind=SHARED.weather.wind({from:'nw',force:1,view:'w'});const L=K.light(O);
  K.sky(g,O);
  const land=K.isle(g,214,322,20,O,{kind:'cape',from:'r',dist:.5,seed:1692});
  K.isle(g,40,110,3,O,{dist:.85,seed:1693});
  SShore16=K.sea(g,Object.assign(O,{y1:100}));SShore16.open=(x,y)=>!(x>246&&y<HZ+5)&&y<94;
  /* the harbor town under the land: stores and houses by the water, small in the haze */
  K.town(g,O,{x0:250,x1:322,base:HZ+.6,hill:x=>HZ-6-Math.max(0,(x-250)*.09),rows:2,size:5,dist:.55,seed:1694,warehouses:[[262,18,3.4],[288,14,3]]});
  shipShore16(g,280,HZ+1.6);
  /* the shore beyond the wall's end: a beach, and the way down to the ship */
  K.shore(g,O,{x0:150,x1:322,edge:x=>88+(x-150)*.05+1.2*Math.sin(x/11),y1:112,kind:'sand',seed:1695});
  /* the ground of the shaded place: beaten earth with grass and flowers in the corners, and the way down at the right */
  K.land(g,L,0,q=>{CO.ground(q,-2,100,324,146,'#c8b48e',1696,{n:60,size:.8,tufts:26});
    const tf=[-2,146,-2,138];for(let x=-2;x<=322;x+=3)tf.push(x,139+1.5*Math.sin(x/8)+(x>240?(x-240)*.06:0));tf.push(322,146);
    clipTo(q,()=>poly(q,tf),()=>CO.turf(q,-2,134,324,146,'#8e985e',1697,{dry:.4,wind:1,flowers:10}));
    for(const[x,y,w,h,sd]of[[244,104,9,4,1710],[256,107,5,2.4,1711],[300,96,7,3,1712],[236,108,4,2,1713]])CO.boulder(q,x,y,w,h,'#a49884',sd,{light:-1,moss:'#6a7a4c'});
    const dn=[262,112,284,108,300,104,322,100,322,128,300,126,284,120];poly(q,dn,rgba('#d4c29e',.7));clipTo(q,()=>poly(q,dn),()=>CO.ground(q,260,98,64,130,'#d4c29e',1698,{n:14,size:.6}))});
  /* the tamarisk: its trunk rises behind the wall and leans out over it, and its fine grey-green crown, in flower, is all above the heads */
  K.land(g,L,0,q=>{CO.tree(q,90,91,90,'#8a9e86',{kind:'willow',seed:1700,light:-1,lean:1,cast:false});
    const k=q.getTransform().a,cov=(x,y)=>q.getImageData(Math.round(x*k),Math.round(y*k),1,1).data[3]>200&&q.getImageData(Math.round(x*k)+2,Math.round(y*k)+2,1,1).data[3]>200;
    const r=rng(1701);for(let i=0;i<260;i++){const x=56+r()*100,y=6+r()*40;if(!cov(x,y)||!cov(x-1,y-1.5))continue;R(q,x,y,1,.5,r()<.5?'#e8a8bc':'#d08aa2');if(r()<.4)R(q,x,y-.5,.5,.5,'#f6d0dc')}});
  /* the low wall of rough stones, laid dry: each stone a shape of its own, lit on its top and its face to the sun, with dark gaps between
     and no joint that runs down through two courses */
  K.land(g,L,0,q=>{const r=rng(1699),base=106,end=236,top=wallTopShore16;
    /* the wall's body in shadow first, so that the gaps between the stones are dark; then each course laid stone by stone, each course
       with stones of its own lengths, so that no joint runs on through the course above or below */
    const B=[-2,base];for(let x=-2;x<=end;x+=2)B.push(x,top(x)+.4);B.push(end,base);poly(q,B,'#4e4656');
    const C=3;let prev=[];for(let j=0;j<C;j++){let x=-2-r()*6;const cur=[];while(x<end-2){let w=4+r()*6;for(let k=0;k<4&&prev.some(p=>Math.abs(p-(x+w))<2.2);k++)w+=2.4;cur.push(x+w);const xm=Math.min(end,x+w),t0=top((x+xm)/2),hh=(base-t0)/C,y1=base-j*hh,y0=y1-hh,c=tint('#ac9e86',(r()-.5)*.32);
        if(y0>=base-1)break;const iw=xm-x-.6,P=[x+.3,y1-.3,x,y0+hh*(.3+r()*.2),x+iw*.25,y0+.2+r()*.5,x+iw*.7,y0+.2+r()*.4,x+iw,y0+hh*(.25+r()*.2),x+iw-.2,y1-.4];
        poly(q,P,c);poly(q,[P[2],P[3],P[4],P[5],P[6],P[7],x+iw*.62,y0+hh*.42,x+iw*.2,y0+hh*.5],rgba('#fff2d8',.32));
        poly(q,[x+iw*.72,y0+hh*.5,P[8],P[9],P[10],P[11],x+iw*.5,y1-.4],rgba('#4a4460',.28));x=xm}prev=cur}
    ao(q,-2,100,240,8,'b',.0,'#2a2436');
    for(let x=0;x<236;x+=2+r()*6)CO.tuft(q,x,106.4+r()*1.4,1.2+r()*2.2,'#8a9058',r);
    oval(q,116,107.2,124,1.6,'rgba(30,26,46,.22)')});
  /* its shade on the ground, dappled, falling to the right of the trunk and toward us */
  {const r=rng(1702);for(const[x,y,rx,ry,k]of[[96,122,80,20,.8],[70,118,40,9,.5],[130,128,46,12,.5],[104,130,60,10,.4]])pool(g,x,y,rx,ry,'#726c8c',Math.min(1,k*1.2),'multiply');
    for(let i=0;i<60;i++){const a=r()*6.28,d=Math.sqrt(r()),x=98+Math.cos(a)*70*d,y=123+Math.sin(a)*15*d;pool(g,x,y,1.5+r()*3,.6+r()*.8,'#fff6e4',.3,'screen')}}}

/* the coaster far off at the quay, her stern toward us: a rounded hull, the stern post's curl, the two steering oars at its sides, the
   whole of her low against the land behind her; her mast is left out of the picture, so that nothing of her makes a cross */
function shipShore16(g,x,y){const H='#4a4048';
  /* the stern rises in one curve from both quarters to the post and its curl, with no rail drawn across it */
  poly(g,[x-4.6,y-2.6,x-3,y-3.4,x-1.4,y-4,x-.6,y-5.6,x+.2,y-6.8,x+1.4,y-7,x+1.6,y-6.2,x+.8,y-5.8,x+1,y-4.2,x+3,y-3.4,x+4.6,y-2.6,x+4,y-.6,x+2,y,x-2,y,x-4,y-.6],H);
  poly(g,[x-4.2,y-2.6,x-2.8,y-3.2,x-1.2,y-3.6,x-1,y-2.8,x-3,y-2.2],'#7a6e70');
  poly(g,[x-5.2,y-3.4,x-4.6,y-3.4,x-4.2,y-.4,x-4.8,y-.2],'#3a3238');poly(g,[x+4.6,y-3.4,x+5.2,y-3.4,x+4.8,y-.2,x+4.2,y-.4],'#3a3238')}
function drawShore16(g,t){if(SShore16)SShore16.draw(g,t)}
/* ==== ART shore16: end ==== */

/* ---- the inventory ---- */
/* Each icon is light enough to stand out of the dark slot, with a lit edge (issue #75). The awl, the knife, the thread and the tablets
   are the engine's. */
Object.assign(ICON,{
  /* a curl of wax scraped from a leaf: a pale shaving, rolled on itself */
  wax16(g){g.fillStyle=lg(g,5,8,19,18,['#f4e2a8','#d8b868','#a8883c']);g.beginPath();g.ellipse(12,13,7,4.4,-.3,0,6.2832);g.fill();
    g.strokeStyle='#8a6a2c';g.lineWidth=.7;g.beginPath();g.ellipse(12.4,12.8,3.6,2,-.3,.4,5.6);g.stroke();R(g,7,10.4,6,.7,'#fff6d0')},
  /* waxed thread: the spool, darker and glossier with the wax worked into it */
  wthread16(g){g.fillStyle=lg(g,7.6,0,16.4,0,['#a08a50','#e0c880','#c4a860','#8a7440']);g.fillRect(7.6,6.6,8.8,11);for(let i=0;i<6;i++)R(g,7.6,7.4+i*1.8,8.8,.6,'rgba(90,70,30,.55)');
    for(const y of[4.6,17.2]){g.fillStyle=lg(g,5.6,0,18.4,0,['#6a4020','#b07a44','#8a5a2c','#4a2c14']);g.fillRect(5.6,y,12.8,2.4);R(g,5.6,y,12.8,.6,'#c8945a')}R(g,8.4,7,2,10,'rgba(255,250,220,.45)')},
  /* Paul's bag, and Luke's: leather, tied at the neck */
  pbag16(g){IH.bag(g,'#8a6a46',12,14.6,7.8,6)},
  lbag16(g){IH.bag(g,'#7a4e2a',12,14.6,7.6,6);R(g,9,15,6,1.2,'#d8c8a0')},
  /* a folded linen cloth */
  linen16(g){IH.square(g,'#efe9d8',4.6,6.4,15,11.6,'#c4bca4');R(g,4.6,11.8,15,.6,'rgba(120,110,90,.4)')},
  /* a patch of goat-hair cloth, dark, its edge frayed, lit along the top */
  patch16(g){IH.square(g,'#6a5a4c',4,6,16,12,'#a89a88');R(g,4,6,16,.8,'#b8a898')},
  /* the master's pay: a few coins in a cloth, the cloth folded back */
  coins16(g){IH.square(g,'#d8ccb0',4,12,16,7);for(const[x,y]of[[8,12],[12,11],[16,12.4],[10,14.4],[14,14.6]]){oval(g,x,y,2.6,1.4,'#8a6a2a');oval(g,x,y-.4,2.4,1.1,'#e6c470')}}});

/* ============ PEOPLE ============ */
/* Dress follows CONTRIBUTING section 4. Paul's party has the looks of Chapter Fifteen, a few days on. The ship's master is a seaman of
   the coast, weathered, a cloth bound round his head; his boy is a boy; the sailor wears a short tunic. The fisherman is old; the
   shepherd has his mantle over his tunic. Menon is a young runner of the harbor, slim, in a short tunic. Of the elders, Philon, Kleandros
   and Damon look as Chapters Thirteen and Fourteen painted them; Euphranor and Polemon are men of standing in a Greek city, in the mantle.
   None of this is in the account: it says how none of them looked. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
Object.assign(LOOK,{
  luke16:{skin:'#c4946a',hair:'#4e3e30',beard:'#58483a',grey:'#8a8078',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2e2018',ph:1100},
  tim16:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',cloak:'#5a6a52',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  arist16:{skin:'#bc8a60',hair:'#3a2a1c',beard:'#3a2a1c',fullBeard:1,tunic:'#96a488',cloak:'#5a4e3e',belt:'#3a2818',trim:'#6a765c',brow:'#2a1c12',ph:1500},
  troph16:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#c8b490',cloak:'#3f5f86',belt:'#4a3a24',brow:'#1a1210',ph:300},
  master16:{skin:'#a8703f',hair:'#5a5048',beard:'#6a6058',grey:'#8a8078',fullBeard:1,tunic:'#8a7a5a',belt:'#3a2a1a',wrap:'#c8b48a',brow:'#3a322a',ph:600},
  boy16:{skin:'#c08a5c',hair:'#34241c',tunic:'#b8a882',belt:'#4a3a24',h:1,brow:'#2a1a12',ph:1400},
  sailor16:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#7a8a8a',belt:'#3a2a1a',brow:'#1a1210',ph:2300},
  fisher16:{skin:'#a8703f',hair:'#8a8680',beard:'#96928c',thin:1,fullBeard:1,tunic:'#8a7a62',belt:'#3a2a1a',brow:'#5e5a54',ph:2600},
  shep16:{skin:'#b47e52',hair:'#3a2a1c',beard:'#3a2a1c',fullBeard:1,tunic:'#a8946c',cloak:'#6a5a42',belt:'#3a2818',brow:'#2a1c12',ph:2800},
  menon16:{skin:'#c08a5c',hair:'#2a1a12',tunic:'#c8b490',belt:'#5a3a20',slim:1,brow:'#1a1210',ph:3000},
  philon16:{skin:'#b88a62',hair:'#d8d8d8',beard:'#d8d8d8',thin:1,longBeard:1,brow:'#9a9a9a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',cloak:'#8a7a5a',ph:500},
  klea16:HIM('#c08c5c','#3a2a1a','#ece4d0','#5f4470',{ph:700}),
  damon16:{skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#c8b490',cloak:'#5a6a4a',belt:'#3a2a1a',brow:'#2a1a12',ph:400},
  euph16:HIM('#b88a62','#5a4a3a','#e6dec8','#6a5a3a',{grey:'#9a9088',receding:1,ph:3200}),
  polem16:HIM('#c49a72','#3a2a1c','#e2d8be','#4a5a6a',{shortBeard:1,ph:3400})});
const LK=actor('luke16','Luke','#c8e8c0',126),TI=actor('tim16','Timothy','#b8e0b0',142),AR=actor('arist16','Aristarchus','#d0d8b8',112),
  TR=actor('troph16','Trophimus','#c8d8e8',124),MA=actor('master16','Pamphilos','#e0d0b0',96),BOY=actor('boy16','Simias','#f0e0b8',176),
  KE=actor('sailor16','Kerdon','#c8d8d0',108),FI=actor('fisher16','fisherman','#d8d0c0',88),SH=actor('shep16','shepherd','#d8c8a8',100),
  LY=actor('menon16','Menon','#f0d8b0',150),PH=actor('philon16','Philon','#e0e0f0',90),KL=actor('klea16','Kleandros','#c8d8f0',100),
  DA=actor('damon16','Damon','#d8e0b8',110),EU=actor('euph16','Euphranor','#e8d8c8',104),PO=actor('polem16','Polemon','#d0c8e8',116);
/* the four of the seven who are not seen in this chapter's rooms still speak at the night watch, from the deck outside the close view */
const SO=actor('sop16','Sopater','#e0d0b8',108),SE=actor('sec16','Secundus','#c8e0d8',120);

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 20:13-38, told by the narrator in paraphrase, each line with its reference. None of it is put into a mouth as a quotation,
   and none of it stands in quotation marks (CONTRIBUTING section 1). The lines were written from the Study Edition by the chapter's
   lead, the German from the German edition. */
const TOLD={v13:'we_went_on_to_the_ship_acts_20_13',v14:'he_met_us_at_assos_acts_20_14',v15a:'level_with_chios_acts_20_15',v15b:'put_in_at_samos_acts_20_15',
 v15c:'came_to_miletus_acts_20_15',v16:'past_ephesus_acts_20_16',v17:'sent_for_the_elders_acts_20_17',v18:'how_he_had_lived_acts_20_18_19',
 v20:'house_to_house_acts_20_20_21',v22:'bound_for_jerusalem_acts_20_22_23',v24:'finish_my_course_acts_20_24',v25:'clean_from_the_blood_acts_20_25_27',
 v28:'shepherd_the_flock_acts_20_28',v29:'oppressive_wolves_acts_20_29_30',v31:'keep_awake_acts_20_31',v32:'entrusted_to_god_acts_20_32',
 v33:'these_hands_acts_20_33_34',v35:'more_happiness_in_giving_acts_20_35',v36:'knelt_and_prayed_acts_20_36',v37:'to_the_ship_acts_20_37_38'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+T(TOLD[k]).length*62),low});
const fast=()=>G.speedAll>200;   /* the playtest plays at speed */

/* ============ WHAT IS PLAYED: the tables ============ */
/* MASTER: the master's three concerns about a passenger who is not aboard: the line that answers each (ok) with what he says to it (yes),
   and two lines that are true and beside the point (no), each with his answer; a line that was tried drops out. Paul never lies:
   every line on offer is true, and what he says he will do, he does. Why he walks, he does not say. */
const MASTER=[
 {f:'m1',q:'pamphilos_what_if_you_are_not_there',ok:'by_road_i_will_be_there_first',yes:'pamphilos_round_the_cape_true',
  no:[['i_am_used_to_the_road','pamphilos_i_believe_it_but_when'],['luke_will_be_aboard_and_knows_me','pamphilos_glad_but_that_doesnt_bring_you']]},
 {f:'m2',q:'pamphilos_who_pays_for_the_empty_place',ok:'my_fare_from_troas_as_if_aboard',yes:'pamphilos_then_the_place_is_yours',
  no:[['the_brothers_bring_the_chest_aboard','pamphilos_thats_the_chest_not_your_place'],['i_take_up_no_room_on_the_road','pamphilos_true_but_the_place_is_kept']]},
 {f:'m3',q:'pamphilos_how_will_i_know_you',ok:'luke_will_point_me_out',yes:'pamphilos_then_well_take_you_aboard',
  no:[['i_will_have_my_staff','pamphilos_every_traveler_has_a_staff'],['i_make_tents_for_a_living','pamphilos_that_wont_show_from_the_deck']]}];
/* the north wind: where the boy's wool tuft can say the wind comes from, and the knots of his cord for how hard it blows; WIND16, what it
   really is each morning (always from up the coast: the master sails with the north wind only) */
const TUFT16=[{k:'up',n:'from_up_the_coast'},{k:'down',n:'from_down_the_coast'},{k:'land',n:'off_the_land'},{k:'sea',n:'off_the_sea'}];
const CORD16=['no_wind','a_breath','fresh','strong'];
const WIND16={1:{dir:0,str:2,yes:'pamphilos_up_the_coast_fresh_we_sail'},2:{dir:0,str:1,yes:'pamphilos_a_breath_from_the_north_well_go'},3:{dir:0,str:3,yes:'pamphilos_strong_from_the_north_hold_on'}};
const ROUND16=()=>!F.w1?1:!F.w2?2:3;
const sky16=()=>G.sky16||(G.sky16={dir:2,str:0});
/* the night watch: the eight who can keep it, each with where he comes from (only the two from Thessalonica and the two from the province
   of Asia share a place), and the four watches of the night (Mark 13:35 names them; the game names them only by the hour) */
const WATCH_MEN16=[{id:'lu',a:'luke16',name:'Luke',from:'lu'},{id:'so',a:'sop16',name:'Sopater',from:'so'},{id:'ar',a:'arist16',name:'Aristarchus',from:'thess'},
  {id:'se',a:'sec16',name:'Secundus',from:'thess'},{id:'ga',a:'gaiusd16',name:'Gaius',from:'ga'},{id:'ti',a:'tim16',name:'Timothy',from:'ti'},
  {id:'ty',a:'tych16',name:'Tychicus',from:'asia'},{id:'tr',a:'troph16',name:'Trophimus',from:'asia'}];
const WATCHES16=['late_evening','midnight','cockcrow','early_morning'];
/* what each man asked for, checked when all eight are laid, in this order; the first that is not kept is said again by the man who asked
   it, and the tokens it names go back to the deck. With the rule, these give one way only:
   late evening Luke and Secundus, midnight Aristarchus and Tychicus, cockcrow Sopater and Gaius, early morning Trophimus and Timothy. */
const WISH16=[{who:'luke16',line:'luke_ill_take_the_first_myself',ok:w=>w.lu===1,back:['lu']},
  {who:'troph16',line:'trophimus_give_me_the_last_watch',ok:w=>w.tr===4,back:['tr']},
  {who:'tim16',line:'timothy_put_me_with_trophimus',ok:w=>w.ti===w.tr,back:['ti']},
  {who:'sop16',line:'sopater_gaius_and_i_together',ok:w=>w.so===w.ga,back:['so','ga']},
  {who:'sec16',line:'secundus_put_me_just_before_aristarchus',ok:w=>w.ar===w.se+1,back:['se','ar']}];
const w16=()=>G.w16||(G.w16={lu:0,so:0,ar:0,se:0,ga:0,ti:0,ty:0,tr:0});
/* tokenBox16: where a token lies: on the deck below the tablet, or in its row (the first or second place, by the order it was laid) */
function tokenBox16(id){const w=w16(),r=w[id],W=34,H=13;if(!r){const i=WATCH_MEN16.findIndex(m=>m.id===id);return[8+i*38.4,117,W,H]}
  const mates=WATCH_MEN16.filter(m=>w[m.id]===r).map(m=>m.id).sort((a,b)=>(G.w16o[a]||0)-(G.w16o[b]||0)),k=mates.indexOf(id);return[128+k*86,ROWS16[r-1]+4,72,H]}
/* the list for the messenger: the names on Paul's old page (the three who are elders, with where they are found, and three visitors
   to Ephesus who went home long ago, as Chapter Thirteen has it), and the places noted beside them */
const NAMES16=[{k:'Philon',at:'hall_of_tyrannus_place'},{k:'Glaukos',home:'glaukos_went_home_to_sardis'},{k:'Kleandros',at:'big_house_at_the_streets_end'},
  {k:'Hegesias',home:'hegesias_went_home_to_smyrna'},{k:'Damon',at:'court_with_the_fig_tree'},{k:'Diodotos',home:'diodotos_went_home_to_thyatira'}];
const PLACES16=[{k:'court_with_the_fig_tree'},{k:'where_the_fuller_lives_place'},{k:'hall_of_tyrannus_place'},{k:'wine_sellers_under_the_colonnade'},
  {k:'big_house_at_the_streets_end'},{k:'under_the_vine_where_carriers_stay'}];
const l16=()=>G.l16||(G.l16={sel:null,ok:[],off:[]});
const rowBox16=(s,i)=>[s==='n'?14:170,14+i*17,136,15];
const FLAGS=['m1','m2','m3','walk','w1','oiled','linen','hands','asked','wax','waxed','pass','pa','la','aboard','w2','watch','w3','patch','laid','mended','fare','sent','spoke'];

/* ============ HELPERS ============ */
/* run16: a script started from a hotspot already runs inside a cutscene (act, in index.html); started from anywhere else it starts one */
const run16=fn=>G.busy?fn():cut(fn);
/* phase16: A on the quay of Troas; B the two at once, Paul on foot and Luke aboard; C aboard from Assos to Chios, Luke played; D Miletus */
const phase16=()=>!F.walk?'A':!F.aboard?'B':!F.w3?'C':'D';
function setPC16(a){if(G.pc!==a){G.pc=a;G.inv=G.invs[a.id]||(G.invs[a.id]=[])}}
/* moveItem16: an item changes hands in the story (Paul's bag) */
function moveItem16(id,to){for(const k in G.invs){const i=G.invs[k].indexOf(id);if(i>=0)G.invs[k].splice(i,1)}(G.invs[to.id]||(G.invs[to.id]=[])).push(id);G.inv=G.invs[PC().id];drawInv()}
function show16(room,x,y,dir){place16(room);const e=ENT[room];enterRoom(room,x!=null?x:e[0],y!=null?y:e[1],dir||e[2]);codeBtn()}
async function goto16(room,x,y,dir){await fade(1,300);show16(room,x,y,dir);await fade(0,300)}

/* ---- the travel map ---- */
/* The places of this chapter (Assos, Cape Lectum, Mitylene, the anchorage off Chios, Samos, Miletus) are in shared/map.js, in its
   close view of the coast ('ionia'). Each day's sail is one leg; the ship's way from Troas goes by sea round Cape Lectum and Paul's by
   land, shown together; the messenger's from Miletus to Ephesus goes by land and by ferry. Earlier legs are drawn without 'new' (and
   without 'sea', as the map16 stop checks them), so that no line lies on another. */
const SHIP16=[['troas','lectum','new sea'],['lectum','assos','new sea']],OLD16=l=>l.slice(0,2),
  LEGS16={ship:[...SHIP16,['troas','assos','new']],mit:[...SHIP16.map(OLD16),['assos','mitylene','new sea']],
    chi:[...SHIP16.map(OLD16),['assos','mitylene'],['mitylene','chios','new sea']],sam:[...SHIP16.map(OLD16),['assos','mitylene'],['mitylene','chios'],['chios','samos','new sea']],
    mil:['samos','miletus'],eph:[...SHIP16.map(OLD16),['assos','mitylene'],['mitylene','chios'],['chios','samos'],['samos','miletus'],['miletus','ephesus','new']]},
  LAB16={troas:{lab:'l',dy:-4}};
async function map16(legs,lines,then){let M=null;try{M=await need('map')}catch(e){}
  const ok=!!(M&&M.places&&legs.every(([a,b])=>M.places[a]&&M.places[b])&&(!then||then.every(([a,b])=>M.places[a]&&M.places[b])));
  await fade(1,450);
  if(ok){try{await M.journey(legs,{view:'ionia',labels:LAB16});for(const k of lines)await tell(k,null,1);
      if(then)for(const[a,b,ls]of then){await M.go(a,b);for(const k of ls||[])await tell(k,null,1)}}catch(e){console.error(e)}}
  else{for(const k of lines)await tell(k);if(then)for(const t of then)for(const k of t[2]||[])await tell(k)}
  await fade(1,300);G.scene=null;setScore(MUSIC)}

/* ============ THE STORY ============ */
/* the opening: the quay of Troas at daybreak, after Chapter Fifteen's night; the coaster for Assos, and the chest going aboard */
async function start16(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(16);G.end={};G.scene=null;setScore(MUSIC);show16('quay16');drawInv();await fade(0,700);
    await narr('troas_the_morning_after',{dur:7600});
    await say(TI,'timothy_the_master_asks_for_you',{to:P});codeBtn()},true)}

/* ---- the instructions (Acts 20:13) ---- */
async function instructions(){if(F.m3)return say(MA,F.walk?'pamphilos_talk_after_walk':'pamphilos_talk_after',{to:P});
  if(!F.m1&&!G.mq16){G.mq16=1;await say(MA,'pamphilos_youre_paul_sailing_with_us',{to:P});await say(P,'i_have_decided_to_go_on_foot',{to:MA});await say(MA,'pamphilos_on_foot_as_you_like',{to:P})}
  for(const r of MASTER){if(F[r.f])continue;await say(MA,r.q,{to:P});let no=r.no.slice();
    for(;;){const opts=[r.ok,...no.map(n=>n[0])],line=opts[await choose(opts)];await say(P,line,{to:MA});
      if(line===r.ok){await say(MA,r.yes,{to:P});F[r.f]=1;codeBtn();break}
      const n=no.find(x=>x[0]===line);await say(MA,n[1],{to:P});no=no.filter(x=>x!==n)}}
  /* what he said he would do, he does: the fare from Troas is paid, and his bag goes aboard with Luke */
  await say(P,'here_is_my_fare_from_troas',{to:MA});await say(MA,'pamphilos_counted_and_right',{to:P});
  await say(P,'luke_take_my_bag',{to:LK});await say(LK,'luke_ill_keep_it_for_you',{to:P});await say(LK,'luke_we_look_for_you_at_assos',{to:P});
  await fade(1,400);F.walk=1;moveItem16('pbag16',LK);place16('quay16');place(LK,'deck16',...ENT.deck16);await fade(0,500);
  await say(P,'i_keep_my_staff_and_tools',TH);codeBtn()}

/* ---- the north wind (sky16) ---- */
async function toSky(){if(F.w1&&!F.aboard||F.w3||F.aboard&&F.w2&&!F.watch)return say(LK,'luke_the_wind_is_read_already');
  await goto16('sky16');
  if(!G.sk16){G.sk16=1;await say(MA,'pamphilos_north_wind_only',{to:LK});await say(LK,'luke_tuft_and_cord',TH)}
  else if(ROUND16()!==G.skr16)await say(MA,'pamphilos_tell_me_the_wind_again',{to:LK});G.skr16=ROUND16()}
function setTuft(){const s=sky16();s.dir=(s.dir+1)%TUFT16.length;SFX.click()}
function setCord(){const s=sky16();s.str=(s.str+1)%CORD16.length;SFX.click()}
async function report(){const k=ROUND16(),W=WIND16[k],s=sky16();
  await say(BOY,T('the_boy_reports',{dir:T(TUFT16[s.dir].n),str:T(CORD16[s.str])}),{to:MA});
  if(s.dir!==W.dir){if(k===2&&s.dir===1)return say(MA,'pamphilos_smoke_under_a_hill_lies',{to:BOY});if(k===3)return say(MA,'pamphilos_at_anchor_she_swings',{to:BOY});return say(MA,'pamphilos_look_again_where_it_comes_from',{to:BOY})}
  if(s.str!==W.str)return say(MA,s.str<W.str?'pamphilos_it_blows_harder_than_that':'pamphilos_it_blows_softer_than_that',{to:BOY});
  SFX.good();await say(MA,W.yes,{to:BOY});F['w'+k]=1;G.sky16=null;
  if(k===1)return sail1();if(k===2)return sail2();return sail3()}
/* the ship sails from Troas (Acts 20:13), round the cape; then a sailor's hands, on the way */
async function sail1(){await map16(LEGS16.ship,['v13']);show16('deck16');await fade(0,600);
  await say(MA,'pamphilos_kerdon_your_hands',{to:KE});await say(KE,'kerdon_the_halyard_took_the_skin',{to:MA});await say(MA,'pamphilos_i_need_his_hands_at_assos',{to:LK});
  await say(LK,'luke_let_me_see_to_them',{to:MA});codeBtn()}
/* off Mitylene, the morning after: the wind is read, and the ship comes level with Chios (Acts 20:15); the awning tears on the way */
async function sail2(){await map16(LEGS16.chi,['v15a']);show16('deck16');await fade(0,600);
  await say(MA,'pamphilos_the_wind_took_my_awning',{to:LK});await say(AR,'aristarchus_who_keeps_watch_tonight',{to:LK});await say(LK,'luke_ill_draw_it_up',{to:AR});codeBtn()}
/* off Chios, the morning after the watches: on to Samos and to Miletus (Acts 20:15, 16) */
async function sail3(){await map16(LEGS16.sam,['v16','v15b'],[[...LEGS16.mil,['v15c']]]);show16('miletus16');await fade(0,600);
  await say(MA,'pamphilos_paul_my_awning',{to:P});await say(P,'i_will_for_what_its_worth',{to:MA});await say(MA,'pamphilos_done',{to:P});codeBtn()}

/* ---- Luke aboard: a sailor's raw hands ---- */
async function treat(it){if(it!=='lbag16'&&it!=='linen16')return false;
  if(!F.w1)return say(LK,'luke_nobody_needs_that_yet');if(F.hands)return say(LK,'luke_theyre_bound');
  if(it==='lbag16'){if(F.oiled)return say(LK,'luke_oiled_already');await say(LK,'luke_oil_first',{to:KE});F.oiled=1;SFX.pick();await say(KE,'kerdon_that_cools_it',{to:LK});codeBtn();return}
  if(!F.oiled)return say(LK,'luke_oil_before_linen');
  await say(LK,'luke_round_and_round_not_tight',{to:KE});LK.bow=true;await wait(fast()?50:700);LK.bow=false;delItem('linen16');F.hands=1;SFX.good();
  await say(KE,'kerdon_i_can_close_them',{to:LK});await say(MA,'pamphilos_then_we_bring_her_in',{to:LK});return arrive()}
async function openPaulsBag(){if(PC()===LK){if(!F.w1)return say(LK,'luke_pauls_bag_i_keep_it_closed');if(F.linen||F.hands)return say(LK,'luke_pauls_bag_the_rest_is_his');
    F.linen=1;addItem('linen16');return say(LK,'luke_a_clean_linen_cloth_in_pauls_bag')}
  if(phase16()!=='D')return say(P,'my_bag_look');if(F.patch)return say(P,'my_bag_the_patch_is_out');
  F.patch=1;addItem('patch16');return say(P,'a_patch_of_goat_hair_from_my_bag')}

/* ---- Paul on foot: the road and the pass ---- */
async function fisherman(){if(!F.asked){await say(P,'which_way_for_assos',{to:FI});await say(FI,'fisherman_the_upper_path',{to:P});await say(FI,'fisherman_the_spring_on_the_pass',{to:P});F.asked=1;codeBtn();return}
  return say(FI,'fisherman_the_upper_path',{to:P})}
async function shorePath(){await say(P,'this_way_ends_at_the_shore')}
async function toPass(){await goto16('pass16');if(!F.pass&&!G.pa16){G.pa16=1;await say(P,'sheep_fill_the_way_down',TH)}}
async function shepherd(){if(F.pass)return say(SH,'shepherd_talk_after',{to:P});
  if(G.sh16)return say(SH,'shepherd_can_you_mend_it',{to:P});G.sh16=1;
  await say(P,'your_flock_fills_the_path',{to:SH});await say(SH,'shepherd_my_skin_split',{to:P});await say(SH,'shepherd_i_carry_water_down',{to:P});
  await say(P,'let_me_look_at_that_seam',{to:SH})}
async function scrape(){if(F.wax)return say(P,'i_have_wax_enough');if(!G.sh16&&G.room!=='pass16')return say(P,'my_tablets_are_for_writing');
  F.wax=1;addItem('wax16');await say(P,'i_scrape_a_spare_leaf');codeBtn()}
async function waxThread(){F.waxed=1;delItem('wax16');delItem('thread16');addItem('wthread16');await say(P,'i_work_the_wax_into_the_thread');codeBtn()}
async function onSkin(it){if(F.pass)return say(P,'the_seam_holds');
  if(it==='awl')return say(P,'the_awl_makes_holes_i_need_thread');if(it==='thread16')return say(P,'this_thread_would_let_the_water_through');
  if(it==='wax16')return say(P,'wax_alone_wont_close_a_seam');if(it==='knife')return say(P,'a_knife_wont_close_it');if(it!=='wthread16')return false;
  G.sh16=1;await say(P,'i_sew_the_seam_with_waxed_thread',{to:SH});P.bow=true;await wait(fast()?50:900);P.bow=false;SFX.good();
  await say(SH,'shepherd_it_holds',{to:P});await fade(1,400);F.pass=1;place16('pass16');await fade(0,500);
  await say(SH,'shepherd_short_way_down',{to:P});await say(P,'thank_you_go_well',{to:SH});codeBtn()}
async function downToAssos(){if(!F.pass)return say(P,'the_flock_fills_the_path_down');
  await fade(1,400);F.pa=1;show16('assos16');await fade(0,500);
  if(F.la)return meet(1);await say(P,'no_ship_yet_i_wait',TH);codeBtn()}

/* ---- the ship comes in at Assos, and the two meet (Acts 20:14) ---- */
async function arrive(){await fade(1,500);F.la=1;place16('assos16');place(LK,'assos16',232,124,-1);viewOf(LK);await fade(0,600);
  if(F.pa)return meet(0);await say(LK,'luke_no_sign_of_paul_yet',TH);codeBtn()}
/* first: 1 if the ship was in first (Luke waited), 0 if Paul was */
async function meet(shipFirst){playAs(P);await fade(1,400);place16('assos16');place(P,'assos16',190,124,1);place(LK,'assos16',214,122,-1);viewOf(P);await fade(0,500);
  await say(LK,shipFirst?'luke_there_you_are':'luke_you_were_here_first',{to:P});await say(P,shipFirst?'the_hill_was_steeper_than_i_thought':'the_road_was_shorter',{to:LK});
  await say(LK,'luke_your_bag',{to:P});moveItem16('pbag16',P);await say(P,'thank_you_luke',{to:LK});
  await tell('v14');
  await map16(LEGS16.mit,[]);
  F.aboard=1;show16('deck16');await fade(0,600);await narr('we_lay_at_anchor_off_mitylene',{dur:6400});codeBtn()}

/* ---- the night watch off Chios (watch16) ---- */
async function toWatch(){if(F.watch)return say(LK,'luke_the_watches_are_kept');if(!F.w2||F.w3)return say(LK,'luke_no_watch_to_draw_up_now');
  await goto16('watch16');
  if(!G.wt16){G.wt16=1;await say(LK,'luke_two_to_a_watch_never_same_place',{to:null});await say(LK,'luke_ill_take_the_first_myself',{to:null});
    await say(TR,'trophimus_give_me_the_last_watch',{to:LK});await say(TI,'timothy_put_me_with_trophimus',{to:LK});
    await say(SO,'sopater_gaius_and_i_together',{to:LK});await say(SE,'secundus_put_me_just_before_aristarchus',{to:LK});
    await say(AR,'aristarchus_not_paul_he_walked',{to:LK});await say(P,'then_i_sleep_as_i_am_told',{to:AR})}}
/* a token: picked up from the deck, laid in a row, or taken back off the tablet */
function token(id){const w=w16();if(w[id]){w[id]=0;G.w16s=null;SFX.click();return}G.w16s=G.w16s===id?null:id;SFX.click()}
async function layRow(r){const id=G.w16s,w=w16();if(!id)return say(LK,'luke_first_a_name',TH);
  const m=WATCH_MEN16.find(x=>x.id===id),inRow=WATCH_MEN16.filter(x=>w[x.id]===r);
  if(inRow.length>=2)return say(LK,'luke_two_to_a_watch',TH);
  const same=inRow.find(x=>x.from===m.from);if(same)return say(LK,m.from==='thess'?'luke_both_from_thessalonica':'luke_both_from_asia',TH);
  w[id]=r;G.w16o=G.w16o||{};G.w16o[id]=(G.w16n=(G.w16n||0)+1);G.w16s=null;SFX.pick();
  if(WATCH_MEN16.every(x=>w[x.id]))return readOut()}
async function readOut(){const w=w16();await say(LK,'luke_all_eight_let_me_read_it',TH);
  for(const k of WISH16)if(!k.ok(w)){await say(ACT[k.who],k.line,{to:k.who==='luke16'?null:LK});for(const id of k.back)w[id]=0;return}
  SFX.good();await say(LK,'luke_four_watches_two_by_two',{to:null});
  await fade(1,500);F.watch=1;G.w16=null;await narr('the_watches_were_kept_two_by_two',{dur:6000});show16('deck16');await fade(0,700);
  await say(MA,'pamphilos_wind_again_simias',{to:BOY});codeBtn()}

/* ---- Miletus: these hands ---- */
async function onAwning(it){if(F.mended)return say(P,'the_awning_is_aboard');
  if(it==='patch16'){if(F.laid)return say(P,'the_patch_is_laid');F.laid=1;delItem('patch16');SFX.pick();await say(P,'i_lay_the_patch_over_the_tear');codeBtn();return}
  if(it==='thread16'||it==='wax16')return say(P,'that_wants_the_waxed_thread');
  if(it==='knife')return say(P,'the_edges_are_clean_enough');
  if(it!=='wthread16'&&it!=='awl')return false;if(!F.laid)return say(P,'it_needs_a_patch_first');
  await say(P,'i_sew_the_patch_down');P.bow=true;await wait(fast()?50:1000);P.bow=false;SFX.good();F.mended=1;
  await say(MA,'pamphilos_good_work_heres_your_pay',{to:P});addItem('coins16');await say(P,'that_is_fair',{to:MA});codeBtn()}
async function menon(){if(F.sent)return;if(F.fare)return goList();
  if(!G.ly16){G.ly16=1;await say(P,'are_you_from_the_harbor',{to:LY});await say(LY,'menon_i_run_messages',{to:P});await say(P,'i_need_word_taken_to_ephesus',{to:LY});await say(LY,'menon_the_ferry_and_bread',{to:P})}
  else await say(LY,'menon_the_ferry_and_bread',{to:P});
  if(has('coins16'))return pay();await say(P,'ill_have_it_soon',{to:LY})}
async function pay(){if(F.fare)return goList();delItem('coins16');F.fare=1;SFX.pick();await say(P,'here_is_the_fare_and_bread',{to:LY});
  await say(LY,'menon_never_been_to_ephesus',{to:P});await say(P,'let_me_look_at_my_tablets',{to:LY});codeBtn();return goList()}
async function goList(){await goto16('list16');if(!G.li16){G.li16=1;await say(P,'who_will_gather_the_elders',TH)}}
function pickName(k){const st=l16();if(st.ok.includes(k))return say(P,'that_one_is_on_the_list',TH);const n=NAMES16.find(x=>x.k===k);if(st.off.includes(k))return say(P,n.home,TH);
  st.sel=st.sel===k?null:k;SFX.click()}
async function pickPlace(p){const st=l16();if(!st.sel)return say(P,'first_a_name',TH);const n=NAMES16.find(x=>x.k===st.sel);st.sel=null;
  if(n.home){st.off.push(n.k);return say(P,n.home,TH)}
  if(n.at!==p)return say(P,T('no_not_where_name_is',{name:T(n.k)}),TH);
  st.ok.push(n.k);SFX.pick();await say(P,'yes_that_is_where',TH);
  if(NAMES16.filter(x=>x.at).every(x=>st.ok.includes(x.k)))return sendList()}
async function sendList(){await fade(1,300);show16('miletus16');place(P,'miletus16',118,128,-1);await fade(0,400);
  await say(P,'the_list_philon_kleandros_damon',{to:LY});await say(LY,'menon_hall_house_fig_tree',{to:P});
  LY.speed=fast()?400:0;await walk(LY,20,126);LY.speed=0;LY.room=null;
  G.ly16=2;await map16(LEGS16.eph,['v17']);G.l16=null;show16('miletus16',118,128,-1);await fade(0,500);await say(LK,'luke_some_days_before_they_come',{to:P});F.sent=1;codeBtn()}
async function toShore(){if(!F.sent)return say(P,'not_before_word_has_gone');await goto16('shore16');if(!F.spoke)return elders()}

/* ---- the elders by the shore (Acts 20:17-38) ---- */
/* The speech is told, never composed, over pictures of Paul speaking (his mouth moves while the narrator tells); at 20:33, 34 he holds
   out his hands. Then all kneel, heads bowed, the arms down or the hands folded, and he prays (20:36); they stand before they walk. */
const ELDERS16=[[PH,64,120],[KL,88,129],[DA,110,114],[EU,40,128],[PO,124,133]];
/* kneel16: the engine's kneeling pose (KNEEL), on both knees with the head bowed: Paul and every second one with the hands folded low in
   front, the others with the arms down; never spread or raised. kneel16(a,0) stands him again, before anyone walks. */
/* Philon's tunic has its two stripes (as in Chapters Twelve to Fourteen): folded hands before them would cross them, so he kneels with
   his arms down. */
function kneel16(a,on,i){const L=LOOK[a.id]||{};a.kneel=on?(i%2||L.stripe?KNEEL.both:KNEEL.bothFolded):0}
/* hands16: at 20:33, 34 Paul holds out both hands, low and open, the palms up, the forearms bent (the figure painter's ges 9) */
function hands16(on){P.ges=on?9:0}
async function elders(){await fade(1,400);G.e16=1;place16('shore16');for(const[a]of ELDERS16)a.room=null;place(P,'shore16',150,117,-1);viewOf(P);await fade(0,500);
  await narr('some_days_later_the_elders_came',{dur:5600});
  for(const[a,x,y]of ELDERS16){place(a,'shore16',-10,y,1);a.speed=fast()?400:0;a.free=1}
  await Promise.all(ELDERS16.map(([a,x,y])=>walk(a,x,y)));for(const[a]of ELDERS16){a.speed=0;a.free=0;a.dir=1}
  await say(PH,'philon_we_came_as_soon',{to:P});await say(P,'it_does_me_good_to_see_you',{to:PH});
  AU.mood='shore';P.dir=-1;P.talk=true;
  for(const k of['v18','v20','v22','v24','v25','v28','v29','v31','v32'])await tell(k);
  hands16(1);await tell('v33');hands16(0);await tell('v35');P.talk=false;
  [P,LK,TI,TR,...ELDERS16.map(e=>e[0])].forEach((a,i)=>kneel16(a,1,i));await wait(fast()?50:900);
  await tell('v36');await wait(fast()?50:600);
  for(const a of[P,LK,TI,TR,...ELDERS16.map(e=>e[0])])kneel16(a,0);AU.mood='parting';F.spoke=1;G.e16=null;codeBtn()}
async function toTheShip(){if(!F.spoke)return say(P,'not_before_we_have_spoken');
  const all=[P,LK,TI,TR,...ELDERS16.map(e=>e[0])];all.forEach(a=>{a.speed=fast()?400:0;a.free=1});
  const go=all.map((a,i)=>walk(a,clamp(250+(i%5)*10,16,304),118+(i*7)%18));
  await tell('v37');await Promise.all(go);all.forEach(a=>{a.speed=0;a.free=0});
  endScreen({title:'these_hands_2',text:'these_hands_end',based:'based_on_acts_20_13_38',go:'click_to_continue_to_chapter_seventeen',code:['chapter_seventeen_code_code',codeOf(17,0)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(17)};await new Promise(()=>{})}
/* the hidden treasure: Milesian wool, at the far end of the quay */
async function wool(){await say(P,'milesian_wool_softer');treasure()}

/* ============ ROOMS ============ */
/* A room's hotspots are listed from the back to the front: where two overlap, the later one is meant. BOTH: Paul and Luke act on a thing
   through the same handlers, and whoever is played says the line (see act, in index.html). */
const BOTH=h=>{h.as={luke16:h};return h};
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
const deckAmb=()=>{const v=DECKV();return v==='quay'||v==='assos'?AMB.dockd16:v==='sail'?AMB.said16:v==='eve'?AMB.eve16:AMB.morn16};
const deckMood=()=>{const v=DECKV();return v==='quay'||v==='assos'?'quay':v==='eve'?'anchor':'sail'};
ROOMS.quay16={space:.5,walk:[16,304,112,138],mood:'quay',amb:AMB.quay16,hs:[
  {name:'harbor',x:130,y:52,w:90,h:40,wx:150,wy:113,dir:-1,look:'harbor_of_troas_morning_look'},
  {name:'coaster',x:0,y:34,w:128,h:66,wx:110,wy:116,dir:-1,look:()=>say(PC(),F.walk?'coaster_the_others_are_aboard':'coaster_bound_for_assos_look'),use:()=>say(P,'not_this_time_i_walk'),open:()=>say(P,'not_this_time_i_walk')},
  {name:'chest',x:126,y:102,w:26,h:16,wx:162,wy:120,dir:-1,vis:()=>!F.walk,look:'the_gifts_chest_look',pickup:'the_brothers_carry_it'},
  {name:'coast_road_south',x:292,y:36,w:28,h:76,wx:298,wy:118,dir:1,exit:()=>F.walk?goto16('road16'):say(P,F.m3?'first_the_bag':'first_the_master'),look:'coast_road_south_look'}].map(BOTH)};
ROOMS.road16={space:.4,walk:[16,304,112,138],mood:'road',amb:AMB.road16,hs:[
  {name:'sea',x:100,y:50,w:220,h:24,wx:150,wy:114,look:'the_sea_on_my_right'},
  {name:'cape',x:196,y:36,w:100,h:22,wx:220,wy:114,look:()=>say(P,F.w1&&!F.la?'the_ship_far_off_against_the_cape':F.la?'the_cape_and_no_ship':'the_cape_no_ship_yet')},
  {name:'path_over_the_hill',x:246,y:66,w:60,h:46,wx:280,wy:114,dir:1,exit:toPass,look:'path_over_the_hill_look'},
  {name:'path_down_to_the_shore',x:286,y:116,w:34,h:28,wx:296,wy:134,dir:1,exit:shorePath,look:'path_down_to_the_shore_look'},
  {name:'road_back_to_troas',x:0,y:70,w:16,h:70,wx:22,wy:126,dir:-1,exit:()=>goto16('quay16',290,124,-1),look:'road_back_to_troas_look'}].map(BOTH)};
ROOMS.pass16={space:.4,walk:[16,304,112,138],mood:'pass',amb:AMB.pass16,
  block:()=>F.pass?[]:[[228,121,17,4],[198,111,17,4],[258,115,17,4]],hs:[
  {name:'gulf_and_lesbos',x:40,y:24,w:220,h:26,wx:120,wy:114,look:'gulf_and_lesbos_look'},
  {name:'spring',x:196,y:78,w:26,h:16,wx:186,wy:122,look:'spring_up_in_the_rocks'},
  {name:'trough',x:166,y:104,w:40,h:14,wx:160,wy:124,look:()=>say(P,F.pass?'the_trough_is_full':'the_trough_is_dry')},
  {name:'flock',get x(){return F.pass?20:256},y:82,w:60,get h(){return F.pass?28:34},wx:200,wy:132,look:()=>say(P,F.pass?'the_flock_off_the_path':'the_flock_on_the_path'),talk:'a_sheep_wont_answer'},
  {name:'ewe',get x(){return EWEPass16()[0]-8},get y(){return EWEPass16()[1]-12},w:18,h:12,get wx(){return EWEPass16()[0]-22},wy:126,look:()=>say(P,F.pass?'the_ewe_has_had_her_drink':'ewe_chews_and_looks_at_me'),talk:'a_sheep_wont_answer'},
  {name:'water_skin',x:206,y:116,w:20,h:8,wx:196,wy:128,vis:()=>!F.pass,look:'the_water_skin_split_seam',useWith:onSkin,pickup:'it_is_the_shepherds'},
  {name:'way_down_to_assos',x:266,y:60,w:54,h:52,wx:296,wy:116,dir:1,exit:downToAssos,look:()=>say(P,F.pass?'the_short_way_down':'the_flock_fills_the_path_down')},
  {name:'way_back',x:0,y:60,w:16,h:80,wx:22,wy:126,dir:-1,exit:()=>goto16('road16',270,116,-1),look:'the_way_back_to_the_road'}].map(BOTH)};
ROOMS.deck16={space:.5,floor:'wood',walk:SHARED.ship.deck.walk,block:()=>SHARED.ship.deck.block(DECKO16('quay')),get mood(){return deckMood()},get amb(){return deckAmb()},hs:[
  {name:'sky_over_the_stern',x:0,y:0,w:320,h:58,wx:120,wy:134,look:()=>say(PC(),'sky_over_the_stern_look')},
  {name:'stern',x:128,y:16,w:52,h:56,wx:120,wy:134,look:'stern_look'},
  {name:'steering_oars',x:84,y:60,w:36,h:32,wx:98,wy:124,look:'steering_oars_look'},
  {name:'steering_oars',x:180,y:60,w:36,h:32,wx:222,wy:119,look:'steering_oars_look'},
  {name:'deck_shelter',x:112,y:74,w:64,h:48,wx:106,wy:127,look:()=>say(PC(),F.w2&&F.aboard?'the_awning_is_torn':'deck_shelter_look')},
  {name:'chest',x:174,y:104,w:34,h:28,wx:170,wy:137,def:'use',look:'the_gifts_chest_aboard_look',use:toWatch,pickup:'luke_not_mine_to_take'},
  {name:'cargo',x:68,y:82,w:36,h:30,wx:96,wy:118,look:'cargo_look'},
  {name:'cargo',x:188,y:82,w:36,h:32,wx:222,wy:119,look:'cargo_look'},
  {name:'ships_cat',x:199,y:78,w:14,h:9,wx:222,wy:119,look:()=>say(PC(),DECKV()==='eve'?'the_ships_cat_four_watches':'the_ships_cat'),talk:'cats_keep_their_counsel'},
  {name:'gangplank',x:258,y:90,w:62,h:40,wx:238,wy:132,dir:1,vis:()=>DECKV()==='quay',exit:()=>say(PC(),'luke_we_sail_when_the_master_has_his_wind'),look:'gangplank_look'}].map(BOTH)};
ROOMS.sky16={space:.4,walk:NOW,get mood(){return'sail'},get amb(){return ROUND16()===1?AMB.dockd16:AMB.morn16},hs:[
  {name:'clouds',x:0,y:0,w:320,h:24,wx:160,wy:236,look:()=>say(PC(),['clouds_drift_right','clouds_creep_right','clouds_race_right'][ROUND16()-1])},
  {name:'smoke',x:86,y:24,w:80,h:36,wx:160,wy:236,vis:()=>ROUND16()<3,look:()=>say(PC(),ROUND16()===1?'smoke_leans_right':'smoke_curls_left_under_the_hill')},
  {name:'pennant',get x(){return 8},get y(){return SKY16[ROUND16()].hz},w:44,h:20,wx:160,wy:236,look:()=>say(PC(),['pennant_streams_right','pennant_lifts_lazily','pennant_swings_with_the_ship'][ROUND16()-1])},
  {name:'whitecaps',x:100,y:66,w:220,h:40,wx:160,wy:236,look:()=>say(PC(),['a_few_whitecaps','no_whitecaps','whitecaps_everywhere'][ROUND16()-1])},
  {name:'wool_tuft',x:132,y:108,w:46,h:22,wx:160,wy:236,def:'use',look:()=>say(PC(),T('tuft_set_to',{dir:T(TUFT16[sky16().dir].n)})),use:setTuft,pickup:setTuft},
  {name:'knotted_cord',x:184,y:116,w:46,h:20,wx:160,wy:236,def:'use',look:()=>say(PC(),T('cord_set_to',{str:T(CORD16[sky16().str])})),use:setCord,pickup:setCord},
  {name:'Pamphilos',x:250,y:110,w:70,h:24,wx:160,wy:236,def:'talk',look:'pamphilos_hand_on_the_tiller',talk:report,use:report},
  {name:'back_to_the_deck',x:0,y:134,w:100,h:10,wx:160,wy:236,exit:()=>goto16('deck16'),look:'back_to_the_deck_look'}].map(BOTH)};
ROOMS.watch16={space:.5,walk:NOW,mood:'anchor',amb:AMB.eve16,hs:[
  ...WATCHES16.map((k,i)=>({name:k,x:20,y:ROWS16[i],w:280,h:22,wx:160,wy:236,def:'use',look:()=>say(PC(),'watch_row_look'),use:()=>layRow(i+1)})),
  ...WATCH_MEN16.map(m=>({name:m.name,get x(){return tokenBox16(m.id)[0]},get y(){return tokenBox16(m.id)[1]},get w(){return tokenBox16(m.id)[2]},get h(){return tokenBox16(m.id)[3]},
    wx:160,wy:236,def:'use',look:()=>say(PC(),'name_token_look'),use:()=>token(m.id),pickup:()=>token(m.id)})),
  {name:'back_to_the_deck',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:()=>goto16('deck16'),look:'back_to_the_deck_look'}].map(BOTH)};
ROOMS.assos16={space:.5,walk:[16,304,112,138],mood:'quay',amb:AMB.assos16,hs:[
  {name:'hill_of_assos',x:0,y:0,w:170,h:70,wx:80,wy:116,look:'hill_of_assos_look'},
  {name:'harbor',x:170,y:52,w:150,h:44,wx:200,wy:114,look:'harbor_of_assos_look'},
  {name:'coaster',x:210,y:56,w:110,h:46,wx:250,wy:116,vis:()=>!!F.la,look:'coaster_in_at_assos'},
  {name:'path_from_the_pass',x:0,y:76,w:18,h:60,wx:22,wy:126,dir:-1,exit:()=>say(PC(),PC()===P?'i_wait_here_for_the_ship':'luke_paul_comes_that_way'),look:'path_from_the_pass_look'}].map(BOTH)};
ROOMS.miletus16={space:.5,walk:[16,304,112,138],mood:'miletus',amb:AMB.miletus16,hs:[
  {name:'harbor',x:0,y:56,w:320,h:42,wx:160,wy:114,look:'harbor_of_miletus_look'},
  {name:'warehouses',x:0,y:18,w:110,h:80,wx:60,wy:114,look:'warehouses_look'},
  {name:'theater',x:120,y:40,w:70,h:20,wx:150,wy:114,look:'theater_far_off_look'},
  {name:'coaster',x:210,y:34,w:110,h:66,wx:240,wy:116,look:'coaster_at_miletus_look'},
  {name:'bales_of_wool',x:116,y:92,w:42,h:26,wx:110,wy:122,look:'bales_of_wool_look',pickup:'not_my_wool'},
  {name:'torn_awning',x:150,y:120,w:80,h:16,wx:190,wy:136,vis:()=>!F.mended,look:'torn_awning_look',useWith:onAwning,pickup:'it_is_the_masters'},
  {name:'bale_at_the_end',x:292,y:98,w:28,h:22,wx:288,wy:126,look:wool,pickup:'not_my_wool'},
  {name:'road_to_the_shore',x:0,y:96,w:14,h:44,wx:20,wy:126,dir:-1,exit:toShore,look:'road_to_the_shore_look'}].map(BOTH)};
ROOMS.list16={space:.5,walk:NOW,mood:'miletus',amb:AMB.list16,hs:[
  ...NAMES16.map((n,i)=>{const[x,y,w,h]=rowBox16('n',i);return{name:n.k,x,y,w,h,wx:160,wy:236,def:'use',look:()=>say(P,'a_name_on_my_old_page'),use:()=>pickName(n.k)}}),
  ...PLACES16.map((p,i)=>{const[x,y,w,h]=rowBox16('p',i);return{name:p.k,x,y,w,h,wx:160,wy:236,def:'use',look:()=>say(P,'a_place_on_my_old_page'),use:()=>pickPlace(p.k)}}),
  {name:'back_to_the_quay',x:220,y:134,w:100,h:10,wx:160,wy:236,exit:()=>goto16('miletus16'),look:'back_to_the_quay_look'}]};
ROOMS.shore16={space:.4,walk:[16,304,112,138],get mood(){return F.spoke?'parting':'shore'},amb:AMB.shore16,hs:[
  {name:'sea',x:150,y:50,w:170,h:40,wx:200,wy:116,look:'sea_beyond_the_wall'},
  {name:'tamarisk',x:30,y:0,w:120,h:70,wx:96,wy:116,look:'tamarisk_look'},
  {name:'low_wall',x:0,y:86,w:230,h:20,wx:150,wy:114,look:'low_wall_look'},
  {name:'ship_far_off',x:262,y:44,w:40,h:14,wx:260,wy:114,look:'our_ship_far_off'},
  {name:'way_down_to_the_ship',x:290,y:80,w:30,h:50,wx:296,wy:124,dir:1,exit:toTheShip,look:'way_down_to_the_ship_look'},
  {name:'road_back_to_the_quay',x:0,y:96,w:14,h:44,wx:20,wy:126,dir:-1,exit:()=>say(P,'not_now_they_are_here'),look:'road_back_to_the_quay_look'}]};

/* ============ PEOPLE AS HOTSPOTS ============ */
/* Who has nothing to say at this point of the story is looked at when he is spoken to: nobody answers out of turn. */
const who=(a,o)=>{a.hs=BOTH(Object.assign({name:a.name,actor:a},o))};
who(MA,{look:'pamphilos_look',talk:()=>G.room==='quay16'?instructions():G.room==='miletus16'?say(MA,F.mended?'pamphilos_good_work_on_the_awning':'pamphilos_the_awning_waits',{to:P}):
  say(MA,PC()===LK&&F.w1&&!F.hands?'pamphilos_i_need_his_hands_at_assos':'pamphilos_wind_and_water',{to:PC()})});
who(BOY,{look:()=>say(PC(),PC()===LK?'luke_simias_look':'simias_look'),talk:async()=>{if(PC()===LK&&!F.w3&&(!F.w1||F.aboard&&(!F.w2||F.watch))){await say(BOY,'simias_master_wants_the_wind',{to:LK});await say(LK,'luke_lets_read_it_together',{to:BOY});return toSky()}
  return say(BOY,PC()===LK?'simias_im_learning':'simias_hello',{to:PC()})}});
/* the humour of the ship's boy is Luke's to tell, about the boy: approved, and only here */
BOY.hs.as={luke16:Object.assign({},BOY.hs,{look:()=>say(LK,F.w1?'luke_simias_says_north_wind_and_master':'luke_simias_look')})};
/* aboard, the master stands in the narrow place by the tiller, between the shelter and the bales (ART deck16): whoever comes to him there
   stands in front of the bales, at his left hand */
Object.defineProperties(MA.hs,{wx:{get(){return G.room==='deck16'?196:undefined},configurable:true},wy:{get(){return G.room==='deck16'?119:undefined},configurable:true}});
who(KE,{look:()=>say(PC(),F.hands?'kerdon_bound_look':'kerdon_look'),talk:()=>say(KE,F.hands?'kerdon_i_can_close_them':'kerdon_its_nothing',{to:PC()}),give:treat,useWith:treat});
who(TI,{look:()=>say(PC(),PC()===LK?'luke_timothy_look16':'timothy_look'),talk:()=>say(TI,G.room==='quay16'?'timothy_the_master_asks_for_you':'timothy_a_good_day_on_the_water',{to:PC()})});
who(AR,{look:'aristarchus_look',talk:()=>PC()===LK&&F.w2&&!F.watch&&F.aboard?toWatch():say(AR,'aristarchus_the_chest_is_well',{to:PC()})});
who(TR,{look:'trophimus_look',talk:()=>say(TR,'trophimus_my_own_coast',{to:PC()})});
who(FI,{look:'fisherman_look',talk:fisherman});
who(SH,{look:'shepherd_look',talk:shepherd,useWith:it=>F.pass?false:onSkin(it)});
who(LY,{look:'menon_look',talk:menon,give:it=>it==='coins16'?pay():false});
for(const[a,k]of[[PH,'philon_look'],[KL,'kleandros_look'],[DA,'damon_came_with_the_others'],[EU,'euphranor_look'],[PO,'polemon_look']])who(a,{look:k,talk:()=>say(P,'nobody_says_much_now',TH)});
who(LK,{look:'luke_look',talk:()=>say(LK,G.room==='shore16'?'luke_i_will_write_it_down':G.room==='miletus16'?(F.sent?'luke_some_days_before_they_come':'luke_the_master_will_pay'):'luke_assos_then',{to:P})});
/* Paul, when Luke is played: aboard from Assos on, resting under the shelter, and at Assos */
const PAULHS={name:'Paul',actor:P,as:{luke16:{look:()=>say(LK,F.aboard?'paul_resting_look':'paul_look_by_luke'),talk:()=>say(P,F.aboard?'paul_the_brothers_wont_let_me':'paul_assos_then',{to:LK}),give:()=>say(P,'keep_it_luke',{to:LK})}}};
LK.def={look:'luke_nothing_to_look_at',pickup:'luke_not_mine_to_take',use:'luke_no_use_for_that',open:'luke_not_mine_to_open',talk:'luke_later',give:'luke_what_should_i_give'};
LK.noCraft='luke_not_those_two_together';

/* ============ ITEMS ============ */
Object.assign(ITEMS,{
  tab16:{name:'lukes_tablets',icon:'tablets',def:'open',look:'lukes_tablets_look',open:ITEMS.tablets.open},
  thread16:{name:'linen_thread',icon:'thread',look:'linen_thread_wax_worn_off'},
  wax16:{name:'curl_of_wax',look:'a_curl_of_wax_from_a_spare_leaf'},
  wthread16:{name:'waxed_thread',look:'thread_heavy_with_wax'},
  pbag16:{name:'travel_bag',def:'open',look:'my_bag_look',by:{luke16:'luke_pauls_bag_look'},open:()=>openPaulsBag()},
  lbag16:{name:'physicians_bag',def:'open',look:'lukes_bag_look',by:{luke16:'lukes_bag_look'},open:()=>say(PC(),'luke_oil_in_my_bag')},
  linen16:{name:'linen_cloth',look:'clean_linen_from_pauls_bag',by:{luke16:'clean_linen_from_pauls_bag'}},
  patch16:{name:'goat_hair_patch',look:'goat_hair_patch_look'},
  coins16:{name:'masters_pay',look:'masters_pay_look'}});
/* what Paul's hands make of two things together; only in this chapter (COMBO is shared by every chapter that has been loaded) */
const c16=fn=>(...a)=>G.ch===16?fn(...a):say(PC(),pick(NOPE));
Object.assign(COMBO,{'knife+tablets':c16(scrape),'thread16+wax16':c16(waxThread),'awl+wthread16':c16(()=>say(P,'threaded_and_ready')),'awl+thread16':c16(()=>say(P,'threaded_and_ready')),
  'knife+thread16':c16(()=>say(P,'no_need_to_cut_it')),'knife+wthread16':c16(()=>say(P,'no_need_to_cut_it')),'tablets+wax16':c16(()=>say(P,'the_wax_has_a_better_use_now')),
  'patch16+wthread16':c16(()=>say(P,'the_patch_goes_on_the_awning_first'))});

/* ============ WAX TABLETS ============ */
/* Paul's and Luke's, in one table: whoever is played opens his own. Paul's old page from Ephesus (where to find whom) helps a player
   who has not played Chapters Thirteen and Fourteen. */
const pa=f=>()=>PC()===P&&f(),lu=f=>()=>PC()===LK&&f();
const TABLETS={
  people:[{name:'Luke',note:'note_luke16',if:pa(()=>phase16()!=='D')},{name:'Pamphilos',note:'note_pamphilos',if:pa(()=>!!F.m1)},{name:'shepherd',note:'note_shepherd',if:pa(()=>!!G.sh16||!!F.pass)},
    {name:'Menon',note:'note_menon',if:pa(()=>!!G.ly16||!!F.fare)},
    {name:'Paul',note:'note_paul_by_luke16',if:lu(()=>true)},{name:'Pamphilos',note:'note_pamphilos_by_luke',if:lu(()=>true)},{name:'Simias',note:'note_simias',if:lu(()=>true)},
    {name:'Kerdon',note:'note_kerdon',if:lu(()=>!!F.w1)}],
  tasks:[{t:'task_settle_with_the_master',if:pa(()=>!F.walk)},{t:'task_on_foot_to_assos',if:pa(()=>!!F.walk&&!F.pa)},{t:'task_wait_for_the_ship',if:pa(()=>!!F.pa&&!F.aboard)},
    {t:'task_help_the_shepherd',if:pa(()=>!!G.sh16&&!F.pass)},{t:'task_mend_the_awning',if:pa(()=>phase16()==='D'&&!F.mended)},{t:'task_send_to_ephesus',if:pa(()=>phase16()==='D'&&!!F.mended&&!F.sent)},
    {t:'task_wait_for_the_elders',if:pa(()=>!!F.sent&&!F.spoke)},{t:'task_to_the_ship_with_them',if:pa(()=>!!F.spoke)},
    {t:'task_read_the_wind',if:lu(()=>!F.w1||F.aboard&&(!F.w2||F.watch&&!F.w3))},{t:'task_see_to_kerdon',if:lu(()=>!!F.w1&&!F.hands)},
    {t:'task_wait_for_paul',if:lu(()=>!!F.la&&!F.pa)},{t:'task_draw_up_the_watches',if:lu(()=>!!F.w2&&!F.watch&&!!F.aboard)}],
  scripture:[],
  notes:{title:()=>PC()===LK?'noted_aboard':phase16()==='D'?'old_notes_from_ephesus':'noted_on_the_road',none:'nothing_written_yet',
    list:[{t:'note_wind_signs',if:lu(()=>!!F.w1)},{t:'note_watch_rule',if:lu(()=>!!G.wt16&&!F.watch)},{t:'note_watch_wishes',if:lu(()=>!!G.wt16&&!F.watch)},
      {t:'note_philon_hall',if:pa(()=>phase16()==='D')},{t:'note_kleandros_house',if:pa(()=>phase16()==='D')},{t:'note_damon_court',if:pa(()=>phase16()==='D')},
      {t:'note_visitors_gone_home',if:pa(()=>phase16()==='D')}]}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={quay16:[214,130,-1],road16:[36,126,1],pass16:[36,126,1],deck16:[162,138,1],sky16:[160,236,1],assos16:[40,126,1],watch16:[160,236,1],miletus16:[140,130,1],list16:[160,236,1],shore16:[160,124,-1]};
const EVERY=[TI,AR,TR,MA,BOY,KE,FI,SH,LY,PH,KL,DA,EU,PO,SO,SE];
/* place16: everyone where the story has him, in every room at once: in the two at once both rooms are lived in. Who is played is the
   story's choice in phases A, C and D; in phase B it is the player's, and the two stand where they are (a code puts each at the way into
   his own room). */
function place16(room){for(const a of EVERY.concat([P,LK])){a.talk=false;a.seat=0;a.ges=0;a.kneel=0;a.bow=false}for(const a of EVERY)a.room=null;
  if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  const ph=phase16();
  if(ph==='A'){setPC16(P);place(LK,'quay16',66,121,1);place(TI,'quay16',98,129,1);place(AR,'quay16',116,114,1);place(MA,'quay16',176,118,-1);place(BOY,'quay16',198,113,-1);place(TR,'quay16',250,123,-1)}
  if(ph==='B'||ph==='C'){place(MA,'deck16',182,115,-1);place(BOY,'deck16',204,139,-1);if(F.w1)place(KE,'deck16',240,126,-1);place(TI,'deck16',106,134,1);place(AR,'deck16',80,120,1)}
  if(ph==='B'){place(FI,'road16',150,117,1);FI.seat=1;place(SH,'pass16',136,119,1)}
  if(ph==='C'){setPC16(LK);place(P,'deck16',134,127,1);P.seat=1}
  if(ph==='D'){setPC16(P);
    if(!F.sent){place(TI,'miletus16',60,118,1);if(G.ly16!==2)place(LY,'miletus16',96,127,1);place(LK,'miletus16',186,114,-1)}
    else{place(LK,'shore16',196,119,-1);place(TI,'shore16',222,127,-1);place(TR,'shore16',248,116,-1)}
    place(MA,'miletus16',254,120,-1);
    if(F.spoke||G.e16)for(const[a,x,y]of ELDERS16)place(a,'shore16',x,y,1)}
  P.hs=PAULHS;P.party=LK.party=0;CHAP[16].swap=ph==='B';swapBtn()}
function setup16(){P.hs=PAULHS;P.called='Paul';LK.called='Luke';G.sky16=G.w16=G.w16s=G.w16o=G.l16=null;G.w16n=G.mq16=G.sk16=G.skr16=G.pa16=G.sh16=G.wt16=G.ly16=G.li16=G.e16=0;G.caps16=[];
  G.invs={paul:['tablets','knife','awl','thread16','pbag16'],luke16:['tab16','lbag16']};G.inv=G.invs.paul;drawInv()}

/* ============ PRAYER HINTS ============ */
function hint16(){const r=G.room,ph=phase16(),me=PC();
  if(ph==='A')return['master16',['hint_master_1','hint_master_2']];
  if(ph==='B'&&me===P){if(F.pa)return['waitp16',['hint_wait_paul_1','hint_wait_paul_2']];
    if(r!=='pass16')return['road16',['hint_road_1','hint_road_2']];
    if(!F.pass){if(!G.sh16)return['shep16',['hint_shepherd_1','hint_shepherd_2']];if(!F.wax&&!F.waxed)return['wax16',['hint_wax_1','hint_wax_2']];if(!F.waxed)return['wthr16',['hint_waxthread_1','hint_waxthread_2']];return['sew16',['hint_sew_1','hint_sew_2']]}
    return['down16',['hint_down_1','hint_down_2']]}
  if(ph==='B'||ph==='C'){if(F.la&&!F.pa)return['waitl16',['hint_wait_luke_1','hint_wait_luke_2']];
    if(F.w1&&!F.hands&&!F.aboard){if(!F.oiled)return['oil16',['hint_hands_1','hint_hands_2']];if(!F.linen)return['lin16',['hint_linen_1','hint_linen_2']];return['bind16',['hint_bind_1','hint_bind_2']]}
    if(F.w2&&!F.watch)return r==='watch16'?['watch16',['hint_watch_1','hint_watch_2']]:['towatch16',['hint_towatch_1','hint_towatch_2']];
    const k=ROUND16();if(r==='sky16')return['sky16'+k,{1:['hint_sky_1_1','hint_sky_1_2'],2:['hint_sky_2_1','hint_sky_2_2'],3:['hint_sky_3_1','hint_sky_3_2']}[k]];return['wind16',['hint_wind_1','hint_wind_2']]}
  if(!F.mended){if(!F.patch)return['patch16',['hint_patch_1','hint_patch_2']];if(!F.laid)return['lay16',['hint_lay_1','hint_lay_2']];return['mend16',['hint_mend_1','hint_mend_2']]}
  if(!F.fare)return['fare16',['hint_fare_1','hint_fare_2']];
  if(!F.sent)return r==='list16'?['list16',['hint_list_1','hint_list_2']]:['tolist16',['hint_tolist_1','hint_tolist_2']];
  if(!F.spoke)return['shore16',['hint_shore_1','hint_shore_2']];
  return['ship16',['hint_ship_1','hint_ship_2']]}

/* ============ CHAPTER DEFINITION ============ */
/* Birds (shared/birds.js): gulls over the harbors of Troas, Assos and Miletus, and aboard by day; a bird of prey over the road and the
   pass; none at night, and none over the parting by the shore. Scenery: they change nothing in the story. */
ROOMS.quay16.birds={gulls:[126,6,86,26],stand:[[157.4,101.2,-1],[166.4,101.4,1]]};
ROOMS.road16.birds={prey:[30,6,150,24]};
ROOMS.pass16.birds={prey:[150,4,140,22]};
ROOMS.assos16.birds=()=>({gulls:F.la?[150,4,48,22]:[176,6,130,28],stand:[[151,101.2,1],[163.4,101.4,-1]]});
ROOMS.deck16.birds=()=>DECKV()==='eve'?null:{gulls:[200,4,100,22]};
ROOMS.miletus16.birds={gulls:[112,4,96,22],stand:[[163,101.2,1],[172.4,101.4,-1]]};

return{rooms:['quay16','road16','pass16','deck16','sky16','assos16','watch16','miletus16','list16','shore16'],setup:setup16,start:start16,hint:hint16,music:MUSIC,calls:CALLS,topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the master's questions, the winds, the watches, the list */
  told:TOLD,master:MASTER,winds:WIND16,tuft:TUFT16,cord:CORD16,round:ROUND16,sky:sky16,men:WATCH_MEN16,wishes:WISH16,watch:w16,names:NAMES16,places:PLACES16,list:l16,
  phase:phase16,deck:DECKV,
  flags:FLAGS,
  /* ten rooms and twenty-four flags today; the code keeps room for forty and for sixteen. Paul and Luke are both played: one after the
     other on the quay of Troas and at Miletus, two at once from Troas to Assos (swap), and Luke aboard from Assos to Chios, while Paul
     rests under the shelter (then he is away from the party, and stands on the deck as one of the cast). */
  codeBits:{flags:40,rooms:4},party:['paul','luke16'],swap:false,ent:ENT,
  home:{tab16:'luke16',lbag16:'luke16',linen16:'luke16',get pbag16(){return F.walk&&!F.aboard?'luke16':'paul'}},
  away:id=>id==='paul'?phase16()==='C':false,
  inv:room=>['tablets','knife','awl',F.waxed?'wthread16':'thread16','pbag16','tab16','lbag16'].concat(F.wax&&!F.waxed?['wax16']:[],F.linen&&!F.hands?['linen16']:[],F.patch&&!F.laid?['patch16']:[],F.mended&&!F.fare?['coins16']:[]),
  place:place16}
});
