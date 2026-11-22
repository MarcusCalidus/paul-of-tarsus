/* Paul of Tarsus: a playable demo of the lane map (shared/lanes.js), before Chapter Fourteen is built (issue #35). Not part of the game:
   the playtest's stops `lanes*` and the demo page load it. It plays as a chapter numbered 14, so that Paul has the look of that time, and
   registers that chapter itself; its text is here too, in English and German, and it is demo text, not the chapter's.
   A draft of Ephesus between the theater (east) and the harbor (west), seen at a slant from above as the oblique prototype showed it: the
   houses stand up and hide the lanes behind them. Pass 1, the surge: an invented runner looks for the house where Paul is staying, against a
   crowd that streams to the theater; the roar dies down as he nears it. The back lanes north of the harbor road are a maze of narrow winding
   lanes in three bands, with dead ends. The house stands in a small court that is reached only through a covered passage under an upper
   storey; two other quiet courts, reached the same way, have every shutter bolted and nobody behind them. Pass 2, the quiet: Paul walks
   from that house to the harbor gate through emptied lanes; three lanes are shut by gates and the harbor road is blocked by overturned
   stalls, so the way round is several times the direct one. Beyond the harbor gate a ship waits at the quay (Acts 20:1 does not say how
   Paul left; the ship is invented, as approved in #35).
   The city's details are placeholders until the chapter's own checks on wol.jw.org: the theater facing west into its hill, a paved road
   to the harbor, the harbor basin west of the wall, a wall over the hill in the north-east, and beyond it the roof of a temple at the edge
   of the map, with no name (the issue allows the Temple of Artemis as something distant, outside the city). The lines of the cat and of the
   shutter are the ones approved in issue #35, and so is the line of the bolted courts. */
(()=>{
"use strict";
if(!CHAP[14])CHAP[14]={name:'lane_map_demo',label:'lane_map_demo_label',title:'lane_map_demo',salt:0xE14E,src:'tools/lanes-demo.js',needs:['lanes'],
  treasure:{name:'kneading_behind_a_shutter_demo',at:''}};
for(const l of Object.keys(LANGS))LANGLOAD[l+'/14']=Promise.resolve();
TEXTS('en',14,{
  lane_map_demo:'Lane map (demo)',lane_map_demo_label:'Demo',runner_demo:'Runner',
  demo_start:'Demo: find the house where Paul is staying. Where the roar of the crowd dies down, it is near.',
  demo_found:'Demo: the house is found. Now the quiet pass: Paul walks to the harbor gate.',
  demo_end:'Demo: the harbor gate. The demo starts again.',
  demo_pressed:"I can't get through against them here.",
  door_of_the_house_demo:'door of the house',harbor_gate_demo:'harbor gate',theater_demo:'theater',cat_demo:'cat',shutter_demo:'shutter',
  shut_gate_demo:'gate',
  gate_shut_look_demo:'Somebody has shut the gate and barred it.',
  harbor_gate_look_demo:'The harbor gate. People are still streaming in through it.',
  theater_look_demo:'The theater. The whole city seems to be pouring into it.',
  door_look_demo:'A door with a bolt. Somebody inside is listening.',
  cat_look:'A cat washes itself on a wall above the crowd. It has the best seat in the city.',
  shutter_look:'From behind a shutter someone hums while kneading. The city is already going back to its day.',
  shutters_bolted_nothing_stirs:'Every shutter here is bolted, and nothing stirs behind them.',
  packed_so_tight_nobody_gets_through:"They're packed in so tight that nobody gets through here.",
  overturned_stall_in_the_way:"There's an overturned stall in the way.",
  kneading_behind_a_shutter_demo:'Kneading behind a shutter',
  hint_listen_demo:'Listen to the crowd. Where it grows quiet, the house is near.',
  hint_lanes_demo:'The back lanes north of the harbor road lead west, away from the crowd.',
  hint_gate_demo:'The harbor gate is at the far end of the harbor road.',
  hint_round_demo:'If a lane is shut, the harbor road itself is quiet now.'});
TEXTS('de',14,{
  lane_map_demo:'Gassenplan (Demo)',lane_map_demo_label:'Demo',runner_demo:'Läufer',
  demo_start:'Demo: Finde das Haus, in dem Paulus wohnt. Wo der Lärm der Menge nachlässt, ist es nah.',
  demo_found:'Demo: Das Haus ist gefunden. Jetzt der ruhige Weg: Paulus geht zum Hafentor.',
  demo_end:'Demo: das Hafentor. Die Demo beginnt von vorn.',
  demo_pressed:'Gegen die komme ich hier nicht an.',
  door_of_the_house_demo:'Haustür',harbor_gate_demo:'Hafentor',theater_demo:'Theater',cat_demo:'Katze',shutter_demo:'Fensterladen',
  shut_gate_demo:'Tor',
  gate_shut_look_demo:'Jemand hat das Tor geschlossen und verriegelt.',
  harbor_gate_look_demo:'Das Hafentor. Noch immer strömen Leute herein.',
  theater_look_demo:'Das Theater. Die ganze Stadt scheint hineinzuströmen.',
  door_look_demo:'Eine Tür mit Riegel. Drinnen lauscht jemand.',
  cat_look:'Eine Katze putzt sich auf der Mauer über der Menge. Sie hat den besten Platz der ganzen Stadt.',
  shutter_look:'Hinter einem Laden summt jemand beim Kneten. Die Stadt geht schon wieder ihrem Alltag nach.',
  shutters_bolted_nothing_stirs:'Hier sind alle Läden verriegelt, aber dahinter rührt sich nichts.',
  packed_so_tight_nobody_gets_through:'Die stehen so dicht, dass hier keiner durchkommt.',
  overturned_stall_in_the_way:'Da liegt ein umgestürzter Marktstand im Weg.',
  kneading_behind_a_shutter_demo:'Kneten hinter einem Laden',
  hint_listen_demo:'Hör auf die Menge. Wo es still wird, ist das Haus nah.',
  hint_lanes_demo:'Die Gassen nördlich der Hafenstraße führen nach Westen, weg von der Menge.',
  hint_gate_demo:'Das Hafentor liegt am anderen Ende der Hafenstraße.',
  hint_round_demo:'Ist eine Gasse versperrt: Die Hafenstraße selbst ist jetzt ruhig.'});

need('lanes').then(L=>LEVEL(14,()=>{
/* The city is laid out in its own units, from the city wall (x 0) to the theater's hill (x 768), with the harbor west of the wall
   (x -96 to 0); on the map everything is 1.3 times as large (SC), so that its people stand about fourteen room pixels tall. q scales a
   length, X and Y a place, pts a line or an outline, box a rectangle. */
const SC=1.3,OX0=96,q=v=>Math.round(v*SC*2)/2,X=x=>q(x+OX0),Y=y=>q(y),pts=p=>p.map((v,i)=>i%2?q(v):q(v+OX0)),box=b=>[X(b[0]),Y(b[1]),q(b[2]),q(b[3])];
const OX=X(0),W=Math.ceil((768+OX0)*SC),H=Math.ceil(432*SC),PASS=()=>F.two?2:1,V=()=>PASS()===1?'surge':'quiet';
/* the runner wears a tunic dyed with saffron, which nobody in the crowd wears, so that the player finds him among them */
LOOK.runner14={skin:'#b47e54',tunic:'#d4a63a',hair:'#2a1a12',belt:'#6a3a20',slim:1,ph:300};
const RUN=actor('runner14','runner_demo','#e8d6a8',170),START=[X(540),Y(118),-1];
/* ---- the plan of the city: lanes as lines with a width; no two cross, and none meets another where a third meets it from the other side ---- */
/* The plan follows what is known of the city in Paul's day. Insight on the Scriptures ("Ephesus") places the theater in the hollow of Mount
   Pion and describes the street that ran from in front of it straight to the harbor: paved with marble, about half a kilometre long and
   eleven metres wide, with colonnades four and a half metres deep and shops on both sides, and a gateway at each end; the Study Edition's
   media on Acts 19:29 puts the theater where two main thoroughfares meet, with the agora beside it. The rest follows the maintainer's notes
   on the city's plan (not found on wol.jw.org, so nothing of it is named on the screen): the lower city a grid of streets at right angles,
   which may cross here (CONTRIBUTING section 3, the exception for Ephesus); a street from the north to the theater, going on south of it
   along the market square as far as the street that climbs east between Mount Pion and Mount Koressos; the market square a block south
   of the harbor street. One unit of the plan is about 0.85 metres. */
const HOUSE=[140,48],GATE=[8,196],COURTS=[[380,47],[260,308]],CAT=300;
/* the courts: the one where Paul is staying (H), in a block of the residential quarter north of the harbor street, and two quiet ones
   (A, B); each lies inside its block and is reached only by a passage under a house (bridge), which leaves a street and runs north */
const COURT={H:[128,40,152,40,152,54,128,54],A:[368,40,392,40,392,54,368,54],B:[248,300,272,300,272,316,248,316]};
const PASSAGE={H:[140,74,140,50],A:[380,74,380,50],B:[260,340,260,310]},ARCH={H:[140,56,69],A:[380,56,69],B:[260,318,335]};
const NS_N=[50,110,170,230,290,350,410,470,530],EW_N=[30,74,118],NS_S=[50,110,170,230,290,350,410];
const CITY=[
  /* the harbor street, from the harbor gate to the square before the theater: the road and a colonnade on each side */
  {pts:[0,196,586,196],w:26,kind:'paved'},
  /* the thoroughfare from the north, which meets it before the theater, and goes on south of the theater along the market square */
  {pts:[596,0,596,104],w:14,kind:'paved'},
  {pts:[596,258,596,432],w:14,kind:'paved'},
  /* the street that climbs east between the two hills to the upper city */
  {pts:[596,352,650,346,710,331,768,321],w:12,kind:'paved'},
  /* into the theater, under the arches at either end of the stage building */
  {pts:[656,128,688,128],w:9,kind:'paved'},{pts:[656,234,688,234],w:9,kind:'paved'},
  /* the residential quarter north of the harbor street: streets at right angles, the blocks between them built close */
  ...NS_N.map(x=>({pts:[x,0,x,186],w:7})),
  ...EW_N.map(y=>({pts:[50,y,592,y],w:7})),
  /* south of the harbor street, west of the market square */
  ...NS_S.map(x=>({pts:[x,206,x,432],w:7})),
  {pts:[50,240,410,240],w:7},{pts:[50,290,460,290],w:7},{pts:[50,340,410,340],w:7},{pts:[50,390,592,390],w:7},
  /* the gates of the market square: from the harbor street, and from the street along its east side */
  {pts:[523,206,523,230],w:9},{pts:[592,300,582,300],w:9},
  /* the passages into the courts, and a blind alley off the harbor street */
  {pts:PASSAGE.H,w:7},{pts:PASSAGE.A,w:7},{pts:PASSAGE.B,w:7},
  {pts:[140,186,140,150],w:6}];
const OPEN=[
  {poly:[596,100,660,100,660,262,600,262,586,232,586,150],kind:'square'},   /* the square before the theater */
  {poly:[456,226,586,226,586,346,456,346],kind:'square'},                     /* the market square */
  {poly:COURT.H,kind:'earth'},{poly:COURT.A,kind:'earth'},{poly:COURT.B,kind:'earth'}];
const KEEP=[{poly:[660,0,768,0,768,300,710,315,652,330,650,300,660,262,660,60]},   /* the theater in its hill, Mount Pion */
  {poly:[0,0,7,0,7,432,0,432]},                                                    /* the city wall */
  {poly:[640,432,640,380,652,358,710,343,768,334,768,432]}];                      /* the foot of Mount Koressos */
const STALLS=[[470,240,12,6],[490,240,12,6],[530,240,12,6],[552,240,12,6],[470,268,12,6],[552,268,12,6],[470,310,12,6],[500,318,12,6],[540,318,12,6],[482,334,12,6],[532,334,12,6],
  [560,202,10,5],[538,202,10,5]];
/* after the uproar: four streets shut by gates of boards, and stalls overturned right across the harbor street near its gate */
const GATES=[[43,168,14,3],[79,233,3,14],[79,283,3,14],[79,333,3,14]];
const DOWN=[[62,183,14,7],[68,190,14,7],[62,196,14,7],[68,202,14,7]];
const lanes=CITY.map(l=>Object.assign({},l,{pts:pts(l.pts),w:Math.round(l.w*SC)})),open=OPEN.map(o=>Object.assign({},o,{poly:pts(o.poly)}));
const keep=KEEP.map(k=>({poly:pts(k.poly)})).concat([{poly:[0,0,OX,0,OX,H,0,H]}]);   /* and the harbor, west of the wall */
/* the covered passages: a house over the lane, its front with an archway towards the lane it leaves */
const bridges=Object.values(ARCH).map(([x,y0,y1])=>({x:X(x)-7,y:Y(y0),w:15,d:Math.round(Y(y1)-Y(y0)),H:13,gap:[X(x)-4,X(x)+4]}));
/* blocker: a rectangle of the plan on the map, with the line that says what it is */
const blocker=(b,say)=>{const[x,y,w,h]=box(b);return{x,y,w,h,say}};
/* in the uproar, narrow streets packed with people who cannot get through themselves: on the runner's straight way west, on the street
   below the house, and on the street from the north quarter down to the harbor street; he has to go round */
const JAMS=[[378,112,26,12,'E'],[178,68,26,12,'E'],[222,82,16,26,'S']].map(([x,y,w,h,face])=>({x:X(x),y:Y(y),w:q(w),h:q(h),face,say:'packed_so_tight_nobody_gets_through'}));
/* the houses as large against the people as the oblique prototype's were, with wider doors and windows; few flat roofs, most ridges
   running east and west (the maintainer's choice of 2026-11-22) */
const M=L.make('lanes14',{w:W,h:H,seed:1414,lot:38,door:3,win:3,winH:3,doorH:8,flat:.05,ew:.6,grid:true,
  jams:{surge:JAMS},lanes,open,keep,bridges,
  /* after the uproar, what blocks a way says what it is when Paul comes up against it: a barred gate, an overturned stall */
  obstacles:{quiet:GATES.map(b=>blocker(b,'gate_shut_look_demo')).concat([blocker(DOWN.reduce((a,b)=>[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[0]+a[2],b[0]+b[2])-Math.min(a[0],b[0]),Math.max(a[1]+a[3],b[1]+b[3])-Math.min(a[1],b[1])]),'overturned_stall_in_the_way')])},
  solid:STALLS.slice(0,11).map(box),block:{surge:STALLS.slice(11).map(box),quiet:GATES.concat(DOWN).map(box)},
  variant:V,targets:{house:[X(HOUSE[0]),Y(HOUSE[1])],gate:[X(GATE[0]),Y(GATE[1])]},
  pace:a=>a===RUN?'run':'walk',
  press:()=>{if(!G.busy)cut(()=>say(PC(),'demo_pressed'))},
  /* the windows: bolted near the house and round the quiet courts, faces at the windows near the theater, open or shut elsewhere */
  cue:(h,v)=>{const cx=(h.x0+h.x1)/2/SC-OX0,cy=(h.y0+h.y1)/2/SC,dh=Math.hypot(cx-HOUSE[0],cy-HOUSE[1]),dd=Math.min(...COURTS.map(c=>Math.hypot(cx-c[0],cy-c[1]))),dt=Math.hypot(cx-620,cy-180),r=(h.seed%7)/7;
    if(v==='quiet')return r<.75?'open':'shut';if(dh<120||dd<40)return'shut';if(dt<200)return r<.4?'head':'open';return r<.5?'open':'shut'},
  /* where the crowd comes from: in by the harbor gate and along the streets from beyond the map, in waves, and out of the doors of the houses */
  crowd:{surge:{pace:'run',max:420,dust:1,jam:90,sinks:{theater:[[X(686),Y(128)],[X(686),Y(234)]]},sources:[
      {x:X(12),y:Y(196),r:8,rate:10,on:14,off:5,to:'theater'},
      {x:X(596),y:5,r:5,rate:5,on:10,off:6,ph:4,to:'theater'},
      {x:X(596),y:H-5,r:5,rate:4,on:12,off:5,ph:9,to:'theater'},
      {x:W-5,y:Y(321),r:5,rate:4,on:11,off:6,ph:2,to:'theater'},
      {doors:[X(520),Y(290)],r:q(120),rate:2.2,on:20,off:4,to:'theater'},
      {doors:[X(590),Y(200)],r:q(70),rate:2,on:30,off:3,to:'theater'},
      {doors:[X(300),Y(196)],r:q(160),rate:1.8,on:16,off:6,ph:3,to:'theater'},
      {doors:[X(420),Y(80)],r:q(140),rate:.4,on:9,off:9,to:'theater'},
      {doors:[X(230),Y(340)],r:q(160),rate:.6,on:10,off:8,to:'theater'}]}},
  zones:['A','B'].map(k=>{const c=COURT[k];return{x:X(c[0]),y:Y(c[1]),w:q(c[2]-c[0]),h:q(c[5]-c[1]),enter:()=>intoCourt(k)}}),
  /* the door of the house where Paul is staying, with its bolt drawn, on the front of the house at the head of its court */
  marks:[{x:Math.round(X(140)),y:Y(146)-3,paint:(g,v,[top,foot])=>{if(v!=='quiet')return;const x=Math.round(X(140))-1.5,y=foot+1-6.5;
      R(g,x,y,3,2.5,'#2a1d16');R(g,x+3,y-.5,1.5,3,'#7a5434');R(g,x+3.5,y,.5,2,'#5a3e26')}},
    {x:Math.round(X(HOUSE[0])),y:Y(COURT.H[1])-3,paint:(g,v,[top,foot])=>{const x=Math.round(X(HOUSE[0]))-2,y=foot+1-7;
    R(g,x-.5,y-.5,6,7.5,'#5a3e28');R(g,x,y,5,7,'#6e4a2c');for(let i=1;i<5;i+=1.5)R(g,x+i,y+.5,.5,6.5,'#4a3020');R(g,x+.5,y+3,3.5,.5,'#2a1a10');R(g,x+.5,y+3,1,.5,'#9a8a6a')}}],
  paint:(g,v,M)=>paintTown(g,v,M),
  /* the vaults over the ways into the theater: whoever goes in passes under them */
  props:[{y:Y(134),shape:g=>R(g,X(664),Y(121),q(16),q(13),'#000')},{y:Y(240),shape:g=>R(g,X(664),Y(227),q(16),q(13),'#000')}],
  draw:(g,ts)=>{if(V()==='surge')cat(g,ts)},
  room:{floor:'stone',get mood(){return'calm'},
    amb:()=>{const p=PC(),busy=V()==='surge',sea=clamp(1-(p.x-OX)/400,0,1);if(!busy)return{birds:.3,wind:.22,waves:.35*sea,gulls:.6*sea};
      const d=M.dist('house',p.x,p.y),k=clamp((d-40)/700,0,1),n=Math.min(1,M.near(p.x,p.y,50)/14);
      return{roar14:.08+.62*k+.2*n,crowd:.05+.35*k+.15*n,wind:.15}},
    hs:[
      {name:'door_of_the_house_demo',x:135,y:30,w:10,h:10,wx:HOUSE[0],wy:HOUSE[1]+1,dir:-1,def:'open',look:'door_look_demo',open:found,use:found},
      {name:'harbor_gate_demo',x:-6,y:182,w:16,h:28,wx:12,wy:196,dir:-1,def:'walk',exit:atGate,look:()=>say(PC(),V()==='surge'?'harbor_gate_look_demo':'hint_gate_demo')},
      {name:'theater_demo',x:664,y:118,w:104,h:126,wx:648,wy:180,dir:1,look:'theater_look_demo'},
      {name:'cat_demo',x:CAT-3,y:166,w:9,h:9,wx:CAT+2,wy:190,vis:()=>V()==='surge',look:'cat_look'},
      ...['A','B'].map(k=>{const c=COURT[k];return{name:'shutter_demo',x:c[0]+3,y:c[1]-9,w:c[2]-c[0]-6,h:8,wx:(c[0]+c[2])/2,wy:c[1]+8,dir:-1,look:'shutters_bolted_nothing_stirs',open:'shutters_bolted_nothing_stirs'}}),
      ...GATES.map(([x,y,w,h])=>({name:'shut_gate_demo',x:x-(w<h?3:0),y:y-6,w:w+(w<h?6:0),h:h+8,wx:w<h?x+w+5:x+w/2,wy:w<h?y+h/2:y-4,vis:()=>V()==='quiet',look:'gate_shut_look_demo',open:'gate_shut_look_demo'})),
      {name:'shutter_demo',x:136,y:137,w:8,h:9,wx:140,wy:152,dir:-1,vis:()=>V()==='quiet',look:kneading,open:kneading,use:kneading}].map(h=>Object.assign(h,{x:X(h.x),y:Y(h.y),w:q(h.w),h:q(h.h),wx:X(h.wx),wy:Y(h.wy)}))}});
/* the runner does on the map what Paul does: every hotspot's own handlers are his too (the engine gives a member who is not Paul only what
   h.as names for him) */
for(const h of ROOMS.lanes14.hs){const o={};for(const k of['look','open','use','pickup','talk'])if(h[k]!=null)o[k]=h[k];h.as={runner14:o}}
/* the cat sits on the top of a house front above the south band, where the crowd passes below: the house there gives its place */
const catAt=(()=>{const x=Math.round(X(CAT)),hs=M.H.HS.filter(h=>h&&h.x0<=x&&h.x1>=x&&h.y1>=Y(166)&&h.y1<=Y(184)).sort((a,b)=>b.y1-a.y1)[0];
  const at=hs?{x,y:hs.y1+1-hs.hw-2.5,front:hs.y1}:{x,y:Y(166),front:Y(182)},spot=ROOMS.lanes14.hs.find(h=>h.name==='cat_demo');
  Object.assign(spot,{x:at.x-2,y:at.y-1,w:6,h:5});return at})();
/* the roar of a crowd in the theater and the streets: low, with a slow swell */
const BEDS={roar14:{type:'lowpass',f:340,q:.6,lfo:.19,depth:.55,v:.55}};

/* ---- what is painted on the ground of the city; the houses stand up of themselves (shared/lanes.js) ---- */
/* RS: a rectangle of the city's plan, on the map */
const RS=(g,x,y,w,h,c)=>R(g,X(x),Y(y),q(w),q(h),c);
function paintTown(g,v,M){const r=rng(77);
  harbor(g);
  /* the hill the theater is built into: rough ground that rises to the east, rock and scrub, a few trees; then the theater cut into it,
     and in the north-east the wall over the hill, with the plain beyond it */
  L.hill(g,pts(KEEP[0].poly),{seed:14,rise:[.08,0]});
  for(let i=0;i<40;i++){const x=664+r()*104,y=r()*300;if(Math.hypot(x-700,y-181)<72||y<12+(x-668)*.7||y>290)continue;L.crown(g,X(x),Y(y),q(2.2+r()*1.6))}
  /* Mount Koressos, south of the street that climbs between the two hills */
  L.hill(g,pts(KEEP[2].poly),{seed:22,rise:[.06,.05]});for(let i=0;i<14;i++){const x=650+r()*118,y=345+r()*87;if(y<345+(768-x)*.1)continue;L.crown(g,X(x),Y(y),q(2+r()*1.4))}
  inKeep(g,0,()=>{theater(g,v);beyond(g)});
  /* the city wall along the west edge, with two towers at the harbor gate, each at the end of its stretch of wall */
  inKeep(g,1,()=>{RS(g,0,0,7,432,'#b8a888');for(let y=0;y<432;y+=3)RS(g,0,y,7,.5,'rgba(60,40,30,.25)');RS(g,6,0,1,432,'#7a6a52')});
  RS(g,0,171,10,10,'#c4b494');RS(g,0,180,10,1.5,'#8a7a5e');RS(g,0,211,10,10,'#c4b494');RS(g,0,220,10,1.5,'#8a7a5e');
  for(const[x,y]of[[0,171],[0,211]])RS(g,x,y,10,.5,'rgba(255,250,230,.4)');
  /* the colonnades along the harbor street, on each side of the road, broken where a street or the alley comes in */
  const run=(cuts,a,b)=>{const out=[];let x=a;for(const c of cuts.sort((p,r)=>p-r)){if(c-6>x)out.push([x,c-6]);x=c+6}if(b>x)out.push([x,b]);return out};
  for(const[a,b]of run([...NS_N,140],12,582))L.colonnade(g,X(a),Y(183),q(b-a),q(5),'S');
  for(const[a,b]of run([...NS_S,523],12,582))L.colonnade(g,X(a),Y(204),q(b-a),q(5),'N');
  /* the market square has a roofed walk on its north side, broken where its gate from the harbor street comes in, and on its south side */
  L.colonnade(g,X(458),Y(226),q(58),q(5),'S');L.colonnade(g,X(530),Y(226),q(54),q(5),'S');L.colonnade(g,X(458),Y(341),q(126),q(5),'N');
  /* the stalls of the market square, and two on the harbor road near the theater; after the uproar these two lie overturned */
  const C=[['#c8b890','#8a3a2a'],['#d8ccb0','#4e5a6e'],['#c8b890','#6e7a3a']];
  STALLS.forEach(([x,y,w,d],i)=>{const[c1,c2]=C[i%3];L.stall(g,X(x),Y(y),q(w),q(d),c1,c2,v==='quiet'&&i>=11)});
  if(v==='quiet'){DOWN.forEach(([x,y,w,d],i)=>{const[c1,c2]=C[i%3];L.stall(g,X(x),Y(y),q(w),q(d),c1,c2,1)});
    for(const b of GATES)bar(g,...box(b));
    }
  /* a trough against a wall in each quiet court, and the courts' ground swept */
  for(const k of['A','B']){const c=COURT[k];RS(g,c[0]+2,c[5]-4,6,2,'#8a7a62');RS(g,c[0]+2,c[5]-4,6,.5,'#b0a088');RS(g,c[0]+2.5,c[5]-3.5,5,1,'#4a5a64')}
  /* a fig tree in Paul's court */
  L.crown(g,X(COURT.H[0]+6),Y(COURT.H[1]+9),q(4.5),'#4e6a3c');
  /* dust over the square before the theater, while the crowd fills it */
  if(v==='surge')pool(g,X(620),Y(180),q(60),q(70),'#e0c89a',.18,'source-over');
  /* trees in some of the courts of the houses */
  for(const h of M.H.HS)if(h&&h.court&&h.seed%3===0){const[a,b,c,d]=h.court;L.tree(g,(a+c+1)/2,(b+d+1)/2-h.hw,Math.min(c-a,d-b)*.45+1,Math.min(c-a,d-b)*.4+1)}}
function inKeep(g,k,fn){clipTo(g,()=>{g.beginPath();const p=pts(KEEP[k].poly);g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()},fn)}
/* a gate of boards across a lane, seen from above: its top edge and its face, the boards running one way, with no band across them */
function bar(g,x,y,w,h){R(g,x+.5,y+h,w,1,'rgba(20,16,30,.3)');R(g,x,y,w,h,'#6a4a2c');R(g,x,y,w,.5,'#8a6a44');R(g,x,y+h-.5,w,.5,'#3a2618');
  for(let i=1.5;i<w-.5;i+=1.5)R(g,x+i,y+1,.5,h-1.5,'rgba(30,20,12,.35)')}
/* the theater from above: its seats rise in rings round the orchestra, with a walkway that follows the curve and no stairs across the rings;
   the stage building stands on its west side, with a way in at either end of it. In the surge the seats are full. */
function theater(g,v){const cx=X(700),cy=Y(181),r=rng(31),A=Math.PI*.56,k=SC;
  g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,66*k,-A,A);g.closePath();g.fillStyle='rgba(30,24,30,.35)';g.fill();
  for(let rr=64;rr>20;rr-=2){const walk=rr>40&&rr<=44;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,rr*k,-A,A);g.closePath();g.fillStyle=walk?'#ddd2b8':(rr%4?'#d2c6aa':'#a89a80');g.fill()}
  if(v==='surge'){const cols=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#d8ccb0','#4e5a6e','#a4503a','#6e5a3a','#b98258','#c08a5c'];
    for(let i=0;i<2400;i++){const a=(r()*2-1)*A,rr=22+r()*42;if(rr>40&&rr<=44)continue;const x=cx+Math.cos(a)*rr*k,y=cy+Math.sin(a)*rr*k;R(g,x,y,.5,.5,cols[(r()*cols.length)|0]);if(r()<.5)R(g,x,y+.5,.5,.5,cols[(r()*cols.length)|0])}}
  g.beginPath();g.moveTo(cx,cy-20*k);g.arc(cx,cy,20*k,-Math.PI/2,Math.PI/2);g.closePath();g.fillStyle='#c4b698';g.fill();
  if(v==='surge')for(let i=0;i<400;i++){const a=(r()-.5)*Math.PI,rr=r()*19,x=cx+Math.cos(a)*rr*k,y=cy+Math.sin(a)*rr*k;R(g,x,y,.5,.5,['#8a3a2a','#cdbb96','#5a5a72','#b98258'][i%4])}
  /* the stage building: a long tiled roof with its ridge along it, lit on the west slope, its gable end wall to the south; before it, on the
     side of the orchestra, the stage, a long platform whose columns show as a row of bases along its edge */
  RS(g,664,134,9,90,'#a86c4e');RS(g,673,134,9,90,'#7c5240');for(let y=135;y<224;y+=1.5){RS(g,664,y,18,.5,'rgba(0,0,0,.08)')}RS(g,672.5,134,1,90,'#c48a66');
  RS(g,664,134,18,.5,'rgba(60,30,20,.5)');RS(g,663.5,134,.5,90,'rgba(255,240,220,.25)');
  poly(g,pts([664,224,673,219,682,224,682,229,664,229]),'#d8c8a8');RS(g,664,224,18,.5,'#5a4030');RS(g,664,228.5,18,.5,'#8a7a62');RS(g,672,225,2,4,'#3a2a1c');
  RS(g,682,138,4,84,'#cbbd9e');RS(g,682,138,4,.5,'#e6dcc6');RS(g,685.5,138,.5,84,'#8a7c62');for(let y=141;y<220;y+=4)RS(g,685,y,1,1,'#ece2cc');RS(g,682,221.5,4,1,'#7a6a52');
  for(const y of[121,227]){RS(g,664,y,16,13,'#c8b898');RS(g,664,y,16,.5,'#e4d8bc');RS(g,664,y+12.5,16,.5,'#7a6a52');RS(g,680,y,1.5,13,'rgba(30,20,30,.35)')}}
/* beyond: in the north-east a wall runs over the hill from the top of the map to its east edge. Beyond it lies the plain, and at the very
   edge of the map, outside the city, the roof of a temple: seen from above, its roof of tiles with the ridge along it, under its eaves on
   the south side a deep beam and the row of columns, on a stepped platform. It has no name on the screen and nothing happens at it
   (CONTRIBUTING section 3: in Ephesus a temple may be shown from outside). */
function beyond(g){const A=[X(668),Y(0)],B=[X(768),Y(70)],dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,sw=[-uy,ux];
  const at=(p,k,e)=>[p[0]+sw[0]*k+ux*e,p[1]+sw[1]*k+uy*e],band=(k0,k1,c)=>poly(g,[...at(A,k0,-30),...at(B,k0,30),...at(B,k1,30),...at(A,k1,-30)],c);
  poly(g,[...at(A,0,-30),...at(B,0,30),...at(B,-120,30),...at(A,-120,-30)],'#b6aa7c');
  const r=rng(5);for(let i=0;i<9;i++){const x=690+r()*78,y=r()*30;if(y<(x-668)*.7-6&&!(x>720&&y<34))L.crown(g,X(x),Y(y),q(1.8+r()*1.2),'#56663e')}
  temple(g,X(730),Y(5));
  band(0,-2.5,'rgba(30,26,40,.3)');band(0,3,'#d2c6aa');band(3,6.5,'#b4a68a');band(6,6.5,'#8a7c62');band(0,.5,'#e6dcc6')}
function temple(g,x,y){const w=80,d=18,ry=y+7.5;
  R(g,x-7,y-5,w+14,d+19,'#c8bea6');R(g,x-7,y-5,w+14,.5,'#e0d8c4');R(g,x-7,y-5,.5,d+19,'#e0d8c4');
  R(g,x-4.5,y-2.5,w+9,d+14.5,'#d8d0bc');R(g,x-4.5,y-2.5,w+9,.5,'#eee8da');R(g,x-4.5,y-2.5,.5,d+14.5,'#eee8da');
  R(g,x,y,w,ry-y,'#8c5c46');R(g,x,ry+.5,w,y+d-ry-.5,'#b47454');R(g,x,ry,w,.5,'#cc9070');R(g,x,y,.5,d,'rgba(255,240,220,.3)');
  for(let i=1;i<w;i+=1.5){R(g,x+i,y,.5,ry-y-.5,'rgba(0,0,0,.1)');R(g,x+i,ry+1,.5,y+d-ry-1,'rgba(0,0,0,.1)')}
  R(g,x,y+d,w,.5,'rgba(40,20,10,.5)');R(g,x,y+d+.5,w,2.5,'#ddd4c0');R(g,x,y+d+2.5,w,.5,'#a89e88');
  R(g,x,y+d+3,w,4,'#6c6458');for(let i=1.5;i<w-1;i+=3.5){R(g,x+i,y+d+3,1.5,4,'#ebe4d4');R(g,x+i+1,y+d+3,.5,4,'#c4baa4')}}
/* ---- the harbor west of the wall: the basin, the quay along the wall, and the ship that waits at it ---- */
function harbor(g){const Q=OX-28;
  g.fillStyle=lg(g,0,0,Q,0,['#33566a','#3e6876','#47727c']);g.fillRect(0,0,Q,H);
  /* small waves: short light strokes in rows, each row set off from the one before, never in a grid */
  const r=rng(19);for(let y=1.5;y<H;y+=2.5){const off=r()*9;for(let x=off;x<Q-3;x+=7+r()*6)R(g,x,y,1.5+r()*1.5,.5,'rgba(210,230,232,.16)')}
  /* the quay: big stones in courses, each joint stopping at the edge of its own course; its edge to the water lit by the sun in the west */
  R(g,Q,0,OX-Q,H,'#bcae90');
  for(let y=0;y<H;y+=5){const off=(y/5)%2?4:0;R(g,Q,y,OX-Q,.5,'rgba(70,52,36,.2)');for(let x=Q+off+2;x<OX-1;x+=8)R(g,x,y+1,.5,3.5,'rgba(70,52,36,.22)')}
  R(g,Q,0,1,H,'#dcd0b4');R(g,Q-1,0,1,H,'rgba(20,30,40,.35)');
  ship(g,Q-24,Q-2,Y(146),Y(236),Q)}
/* the ship, from above: a merchant ship moored along the quay, its bow to the north. The yard is lowered and lies along the ship with the
   sail furled on it, so that nothing lies across the hull; the mast's foot is a small square beside it, and a deckhouse stands at the stern.
   Two lines hold her to bollards at the edge of the quay. */
function ship(g,x0,x1,y0,y1,Q){const cx=(x0+x1)/2,hull=[cx,y0,x1,y0+26,x1,y1-18,cx+6,y1,cx-6,y1,x0,y1-18,x0,y0+26];
  poly(g,hull.map((v,i)=>i%2?v-1:v+2),'rgba(14,24,34,.35)');
  poly(g,hull,'#5a3a24');
  const deck=[cx,y0+5,x1-2.5,y0+27,x1-2.5,y1-19,cx+5,y1-2.5,cx-5,y1-2.5,x0+2.5,y1-19,x0+2.5,y0+27];
  g.save();poly(g,deck);g.clip();g.fillStyle=lg(g,x0,0,x1,0,['#b88c5c','#a87c50','#94683e']);g.fillRect(x0,y0,x1-x0,y1-y0);g.restore();
  poly(g,[cx,y0,x0,y0+26,x0,y1-18,x0+2.5,y1-19,x0+2.5,y0+27,cx,y0+5],'#7a5434');
  R(g,cx-2,y0+20,4,80,'#d8ccb0');R(g,cx-2,y0+20,.5,80,'#f0e8d8');R(g,cx+1.5,y0+20,.5,80,'#a89c84');R(g,cx-2,y0+100,4,.5,'#8a7e66');
  R(g,cx+2.5,y0+48,2.5,2.5,'#4a301c');R(g,cx+2.5,y0+48,2.5,.5,'#6a4a2c');
  R(g,cx-6.5,y0+64,5,7,'#6a4a2c');R(g,cx-6.5,y0+64,5,.5,'#8a6a44');
  R(g,cx-6,y1-31,12,13,'#8a6440');R(g,cx-6,y1-31,12,.5,'#a8805a');R(g,cx-6,y1-31,.5,13,'#a8805a');R(g,cx-6,y1-18.5,12,.5,'#4a301c');
  g.strokeStyle='#3a2a1c';g.lineWidth=.5;g.beginPath();g.moveTo(x1-1,y0+30);g.lineTo(Q+.5,y0+18);g.moveTo(x1-1,y1-22);g.lineTo(Q+.5,y1-10);g.stroke();
  for(const yy of[y0+17,y1-11])R(g,Q,yy,1.5,1.5,'#4a3a2a')}

/* ---- the cat on top of a house front above the south band: it sits, and now and then washes a paw; it stands up among the people by the
   row of that front ---- */
const CATMAP=[["..k...k.","..kkkkk.",".kKkKkk.",".kkkkkk.","kkkkkkk.","kk.kk.k."],["........","..k...k.","..kkkkk.",".kKkkkk.","kkkkkkk.","kk.kk.k."]];
function cat(g,ts){const f=Math.floor(ts/700)%5===0?1:0,m=CATMAP[f],c={k:'#6a5a4a',K:'#a08a6a'};
  depth(catAt.front+.7,()=>{for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++){const col=c[m[j][i]];if(col){g.fillStyle=col;g.fillRect(catAt.x-2+i*.5,catAt.y+j*.5,.5,.5)}}})}

/* ---- the story of the demo ---- */
const courtSaid={};
/* a quiet court: the first time the runner walks into each, he says what he finds there */
function intoCourt(k){if(V()!=='surge'||courtSaid[k])return;courtSaid[k]=1;cut(()=>say(PC(),'shutters_bolted_nothing_stirs'))}
async function found(){if(PASS()!==1)return say(PC(),'door_look_demo');
  await narr('demo_found',{dur:4200});await fade(1,400);F.two=1;M.reset();RUN.room=null;playAs(P);enterRoom('lanes14',X(HOUSE[0]),Y(HOUSE[1])+2,1);codeBtn();await fade(0,500)}
async function atGate(){if(PASS()===1)return say(PC(),'harbor_gate_look_demo');
  await narr('demo_end',{dur:3600});await fade(1,400);start(1,true);await fade(0,500)}
async function kneading(){const t=now()+.05;for(let i=0;i<5;i++)noise({t:t+i*.42,d:.16,v:.07,f:260,q:1.4,type:'lowpass'});
  [0,2,4,2,0,-1,0].forEach((n,i)=>tone({f:mtof(57+n),t:t+.2+i*.32,d:.34,type:'sine',v:.03,a:.08,sus:1}));
  await say(PC(),'shutter_look');treasure()}
function hint(){if(PASS()===1)return['run14',['hint_listen_demo','hint_lanes_demo']];
  return['gate14',['hint_gate_demo','hint_round_demo']]}
function setup(){P.called='Paul';G.invs={paul:[],runner14:[]};G.inv=G.invs.paul;drawInv()}
function place(room){if(PASS()===1){P.room=null;place2(RUN,'lanes14',...START);playAs(RUN)}else{RUN.room=null;place2(P,'lanes14',X(HOUSE[0]),Y(HOUSE[1])+2,1);playAs(P)}}
function place2(a,room,x,y,d){a.room=room;a.x=x;a.y=y;a.dir=d;a.walk=null}
/* start: begin the demo in a pass, at once (from the demo page or the playtest) */
function start(pass,again){setChapter(14);if(pass===2)F.two=1;M.reset();for(const k in courtSaid)delete courtSaid[k];ov.className='';ov.onclick=null;ov.innerHTML='';G.scene=null;
  if(pass===1){P.room=null;G.pc=RUN;G.inv=G.invs.runner14=[];place2(RUN,'lanes14',...START);viewOf(RUN)}else{RUN.room=null;G.pc=P;place2(P,'lanes14',X(HOUSE[0]),Y(HOUSE[1])+2,1);viewOf(P)}
  enterRoom('lanes14',PC().x,PC().y,PC().dir);G.busy=false;lock(false);G.verb='walk';G.item=null;syncVerbs();drawInv();status();swapBtn();codeBtn();
  if(!again&&pass===1)cut(()=>narr('demo_start',{dur:5200}))}
return{rooms:['lanes14'],flags:['two'],ent:{lanes14:START},setup,start:()=>start(1),hint,place,inv:()=>[],beds:BEDS,music:null,demo:start,map:M,
  /* for the playtest: where a place of the city's plan lies on the map, and the places it asks about */
  ox:OX,at:(x,y)=>[X(x),Y(y)],len:q,city:{house:HOUSE,courts:COURT,gates:GATES}}}));
})();
