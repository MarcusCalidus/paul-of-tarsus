/* Paul of Tarsus: a playable demo of the lane map (shared/lanes.js), before Chapter Fourteen is built (issue #35). Not part of the game:
   the playtest's stop `lanes` and the demo page load it. It plays as a chapter numbered 14, so that Paul has the look of that time, and
   registers that chapter itself; its text is here too, in English and German, and it is demo text, not the chapter's.
   A draft of Ephesus between the theater (east) and the harbor gate (west). Pass 1, the surge: an invented runner looks for the house where
   Paul is staying, against a crowd that streams to the theater; the roar dies down as he nears it. Pass 2, the quiet: Paul walks from that
   house to the harbor gate through emptied lanes, past stalls overturned and a gate that is shut. The city's details are placeholders until
   the chapter's own checks on wol.jw.org: the theater facing west into its hill, a paved road to the harbor, streets that meet before
   the theater. The lines of the cat and of the shutter are the ones approved in issue #35. */
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
  kneading_behind_a_shutter_demo:'Kneten hinter einem Laden',
  hint_listen_demo:'Hör auf die Menge. Wo es still wird, ist das Haus nah.',
  hint_lanes_demo:'Die Gassen nördlich der Hafenstraße führen nach Westen, weg von der Menge.',
  hint_gate_demo:'Das Hafentor liegt am anderen Ende der Hafenstraße.',
  hint_round_demo:'Ist eine Gasse versperrt: Die Hafenstraße selbst ist jetzt ruhig.'});

need('lanes').then(L=>LEVEL(14,()=>{
const W=768,H=432,PASS=()=>F.two?2:1,V=()=>PASS()===1?'surge':'quiet';
/* the runner wears a tunic dyed with saffron, which nobody in the crowd wears, so that the player finds him among them */
LOOK.runner14={skin:'#b47e54',tunic:'#d4a63a',hair:'#2a1a12',belt:'#6a3a20',slim:1,ph:300};
const RUN=actor('runner14','runner_demo','#e8d6a8',170),START=[574,147,-1];
/* ---- the plan of the city: lanes as lines with a width; no two cross, and none meets another where a third meets it from the other side ---- */
const HOUSE=[126,98],GATE=[8,196];
const lanes=[
  /* the four streets that meet before the theater: the harbor road from the west, a street from the north, the paved street from the south */
  {pts:[0,196,592,196],w:16,kind:'paved'},
  {pts:[372,0,470,52,596,118],w:12,kind:'paved'},
  {pts:[548,432,566,330,594,252],w:12,kind:'paved'},
  /* into the theater, under the arches at either end of the stage building */
  {pts:[656,128,688,128],w:9,kind:'paved'},{pts:[656,234,688,234],w:9,kind:'paved'},
  /* the back lanes of the quarter north of the harbor road, winding west */
  {pts:[596,146,560,148,520,152,480,142,440,148,400,140],w:7},
  {pts:[400,140,360,132,330,142,300,128,262,134],w:7},
  {pts:[262,134,240,112,200,104,172,92,150,96],w:7},
  {pts:[150,96,121,98],w:7},                                   /* the house's own lane, a dead end below its door */
  {pts:[480,142,486,112,502,90],w:7},                          /* a dead end */
  {pts:[440,148,446,172,444,190],w:7},                         /* to the harbor road */
  {pts:[330,142,324,106,336,70],w:7},{pts:[336,70,320,40],w:7},/* north, and a dead end */
  {pts:[431,32,400,44,362,40,336,70],w:7},                     /* in from the street from the north */
  {pts:[300,128,296,160,304,190],w:7},                         /* to the harbor road */
  {pts:[200,104,180,130,152,140,112,136,82,152,62,190],w:7},   /* west, to the harbor road near the gate */
  {pts:[112,136,100,110,72,98,60,62,82,30],w:7},               /* north, close to the house but not to it */
  {pts:[262,134,268,160,250,190],w:7},
  {pts:[520,78,540,52,580,40,612,58],w:7},                     /* a lane on the far side of the street from the north */
  /* south of the harbor road: lanes, and the market square */
  {pts:[336,202,330,240,340,270,366,282,402,292],w:7},
  {pts:[470,202,466,262],w:8},
  {pts:[530,322,562,318],w:7},
  {pts:[160,202,166,240,150,280,172,320,220,330,262,312,302,322],w:7},
  {pts:[330,240,290,256,262,312],w:7},
  {pts:[112,202,104,226,118,242],w:7},                         /* a dead end off the harbor road */
  {pts:[220,330,214,380,240,420],w:7},
  {pts:[402,370,376,398,388,432],w:7},
  {pts:[36,202,44,250,70,300,58,360],w:7}];
const open=[
  {poly:[596,100,660,100,660,262,600,262,586,232,586,150],kind:'square'},   /* the square before the theater */
  {poly:[400,262,530,262,536,382,404,386],kind:'square'}];                    /* the market square */
const keep=[{poly:[660,0,768,0,768,432,650,432,650,300,660,262,660,60]},     /* the theater in its hill */
  {poly:[0,0,7,0,7,432,0,432]}];                                              /* the city wall */
const STALLS=[[414,272,12,6],[430,272,12,6],[446,272,10,6],[490,272,12,6],[506,272,12,6],[414,300,12,6],[498,300,12,6],[420,332,12,6],[500,336,12,6],[440,360,12,6],[470,358,12,6],
  [560,206,10,5],[538,206,10,5]];
const DOWN=[[180,189,12,6],[236,198,12,6],[130,131,3,13]];   /* overturned stalls, and a gate shut, after the uproar */
const M=L.make('lanes14',{w:W,h:H,seed:1414,lot:19,lanes,open,keep,
  solid:STALLS.slice(0,11),block:{surge:STALLS.slice(11),quiet:DOWN},
  variant:V,targets:{house:HOUSE,gate:GATE},
  pace:a=>a===RUN?'run':'walk',
  press:()=>{if(!G.busy)cut(()=>say(PC(),'demo_pressed'))},
  /* the windows: bolted near the house, faces at the windows near the theater, open elsewhere */
  cue:(h,v)=>{const cx=(h.x0+h.x1)/2,cy=(h.y0+h.y1)/2,dh=Math.hypot(cx-HOUSE[0],cy-HOUSE[1]),dt=Math.hypot(cx-620,cy-180),q=(h.seed%7)/7;
    if(v==='quiet')return q<.75?'open':'shut';if(dh<120)return'shut';if(dt<200)return q<.4?'head':'open';return q<.5?'open':'shut'},
  crowd:{surge:{pace:'run',max:300,dust:1,jam:70,sinks:{theater:[[686,128],[686,234]]},sources:[
      {x:10,y:196,r:6,rate:7,on:14,off:5,to:'theater'},
      {x:376,y:4,r:4,rate:3.5,on:10,off:6,ph:4,to:'theater'},
      {x:550,y:428,r:4,rate:3.5,on:12,off:5,ph:9,to:'theater'},
      {x:466,y:300,r:20,rate:1.2,on:20,off:4,to:'theater'},
      {x:630,y:180,r:22,rate:1.6,on:30,off:2,to:'theater'},
      {x:300,y:132,r:3,rate:.25,on:9,off:9,to:'theater'},
      {x:180,y:130,r:3,rate:.2,on:9,off:12,ph:5,to:'theater'},
      {x:600,y:52,r:3,rate:.3,on:8,off:8,to:'theater'},
      {x:240,y:416,r:3,rate:.4,on:10,off:8,to:'theater'}]}},
  paint:(g,v,M)=>paintTown(g,v,M),
  /* the vaults over the ways into the theater: whoever goes in passes under them */
  props:[{y:134,shape:g=>R(g,664,121,16,13,'#000')},{y:240,shape:g=>R(g,664,227,16,13,'#000')}],
  draw:(g,ts)=>{if(V()==='surge')cat(g,ts)},
  room:{floor:'stone',get mood(){return'calm'},
    amb:()=>{const p=PC(),busy=V()==='surge';if(!busy)return{birds:.35,wind:.25};
      const d=M.dist('house',p.x,p.y),k=clamp((d-30)/420,0,1),n=Math.min(1,M.near(p.x,p.y,40)/14);
      return{roar14:.08+.62*k+.2*n,crowd:.05+.35*k+.15*n,wind:.15}},
    hs:[
      {name:'door_of_the_house_demo',x:117,y:86,w:10,h:10,wx:126,wy:98,dir:-1,def:'open',look:'door_look_demo',open:found,use:found},
      {name:'harbor_gate_demo',x:0,y:182,w:10,h:28,wx:12,wy:196,dir:-1,def:'walk',exit:atGate,look:()=>say(PC(),V()==='surge'?'harbor_gate_look_demo':'hint_gate_demo')},
      {name:'theater_demo',x:664,y:118,w:104,h:126,wx:648,wy:180,dir:1,look:'theater_look_demo'},
      {name:'cat_demo',x:516,y:131,w:8,h:7,wx:520,wy:148,vis:()=>V()==='surge',look:'cat_look'},
      {name:'shut_gate_demo',x:127,y:128,w:9,h:17,wx:140,wy:140,vis:()=>V()==='quiet',look:'gate_shut_look_demo',open:'gate_shut_look_demo'},
      {name:'shutter_demo',x:114,y:236,w:10,h:8,wx:116,wy:238,vis:()=>V()==='quiet',look:kneading,open:kneading,use:kneading}]}});
/* the runner does on the map what Paul does: every hotspot's own handlers are his too (the engine gives a member who is not Paul only what
   h.as names for him) */
for(const h of ROOMS.lanes14.hs){const o={};for(const k of['look','open','use','pickup','talk'])if(h[k]!=null)o[k]=h[k];h.as={runner14:o}}
/* the roar of a crowd in the theater and the streets: low, with a slow swell */
const BEDS={roar14:{type:'lowpass',f:340,q:.6,lfo:.19,depth:.55,v:.55}};

/* ---- what is painted over the city ---- */
function paintTown(g,v,M){const r=rng(77);
  /* the hill the theater is built into: rough ground that rises to the east, rock and scrub, a few trees; then the theater cut into it */
  L.hill(g,keep[0].poly,{seed:14,rise:[.1,0]});
  for(let i=0;i<40;i++){const x=664+r()*104,y=r()*432;if(Math.hypot(x-700,y-181)<72)continue;L.crown(g,x,y,2.2+r()*1.6)}
  inKeep(g,0,()=>theater(g,v));
  /* the city wall along the west edge, with two towers at the harbor gate */
  inKeep(g,1,()=>{R(g,0,0,7,432,'#b8a888');for(let y=0;y<432;y+=3)R(g,0,y,7,.5,'rgba(60,40,30,.25)');R(g,6,0,1,432,'#7a6a52')});
  R(g,0,176,10,10,'#c4b494');R(g,0,185,10,1.5,'#8a7a5e');R(g,0,206,10,10,'#c4b494');R(g,0,215,10,1.5,'#8a7a5e');
  for(const[x,y]of[[0,176],[0,206]])R(g,x,y,10,.5,'rgba(255,250,230,.4)');
  /* the colonnades along the harbor road, broken where a lane comes in */
  const north=[[8,54],[70,244],[256,298],[310,438],[450,586]],south=[[8,30],[42,106],[118,154],[166,330],[342,464],[476,586]];
  for(const[a,b]of north)L.colonnade(g,a,183,b-a,4.5,'S');
  for(const[a,b]of south)L.colonnade(g,a,204,b-a,5,'N');
  /* the market square has a roofed walk on its north side, broken where the lane from the harbor road comes in, and on its south side */
  L.colonnade(g,404,257,57,4.5,'S');L.colonnade(g,472,257,58,4.5,'S');L.colonnade(g,406,384,128,4.5,'N');
  /* the stalls of the market square, and two on the harbor road near the theater; after the uproar these two lie overturned */
  const C=[['#c8b890','#8a3a2a'],['#d8ccb0','#4e5a6e'],['#c8b890','#6e7a3a']];
  STALLS.forEach(([x,y,w,d],i)=>{const[c1,c2]=C[i%3];L.stall(g,x,y,w,d,c1,c2,v==='quiet'&&i>=11)});
  if(v==='quiet'){L.stall(g,180,189,12,6,'#c8b890','#8a3a2a',1);L.stall(g,236,198,12,6,'#d8ccb0','#4e5a6e',1);
    /* a gate of boards across the lane, seen from above: its top edge and its face, the boards running one way, with no band across them */
    R(g,130,131,3,13,'#6a4a2c');R(g,130,131,.5,13,'#8a6a44');R(g,132.5,131,.5,13,'#3a2618');R(g,130,143.5,3,.5,'#3a2618');R(g,133,132,1.5,12,'rgba(20,16,30,.3)');
    /* the shutter left ajar, at the end of the little lane */
    R(g,119,239,2.5,1.5,'#2a1d16');R(g,121.5,238.5,1.5,2,'#7a5434')}
  /* the door of the house where Paul is staying, with its bolt drawn: at the end of its little lane */
  R(g,119.5,90,4,5,'#4a3020');R(g,119.5,90,4,.5,'#2a1a10');R(g,120,90.5,.5,4.5,'#6a4a30');R(g,121.5,92,1.5,.5,'#2a1a10');
  /* trees in some of the courts */
  for(const h of M.H.HS)if(h&&h.court&&h.seed%3===0){const[a,b,c,d]=h.court;L.tree(g,(a+c+1)/2,(b+d+1)/2,Math.min(c-a,d-b)*.45+1,Math.min(c-a,d-b)*.4+1)}
  /* dust over the square before the theater, while the crowd fills it */
  if(v==='surge')pool(g,620,180,60,70,'#e0c89a',.18,'source-over')}
function inKeep(g,k,fn){clipTo(g,()=>{g.beginPath();const p=keep[k].poly;g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()},fn)}
/* the theater from above: its seats rise in rings round the orchestra, with a walkway that follows the curve and no stairs across the rings;
   the stage building stands on its west side, with a way in at either end of it. In the surge the seats are full. */
function theater(g,v){const cx=700,cy=181,r=rng(31),A=Math.PI*.56;
  /* the cut in the hill, a shadow along its rim, then the rows of seats: each a lit tread and a riser in shade */
  g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,66,-A,A);g.closePath();g.fillStyle='rgba(30,24,30,.35)';g.fill();
  for(let rr=64;rr>20;rr-=2){const walk=rr>40&&rr<=44;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,rr,-A,A);g.closePath();g.fillStyle=walk?'#ddd2b8':(rr%4?'#d2c6aa':'#a89a80');g.fill()}
  if(v==='surge'){const cols=['#8a3a2a','#cdbb96','#5a5a72','#7a5a40','#d8ccb0','#4e5a6e','#a4503a','#6e5a3a','#b98258','#c08a5c'];
    for(let i=0;i<1500;i++){const a=(r()*2-1)*A,rr=22+r()*42;if(rr>40&&rr<=44)continue;const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;R(g,x,y,.5,.5,cols[(r()*cols.length)|0]);if(r()<.5)R(g,x,y+.5,.5,.5,cols[(r()*cols.length)|0])}}
  /* the orchestra, a paved floor */
  g.beginPath();g.moveTo(cx,cy-20);g.arc(cx,cy,20,-Math.PI/2,Math.PI/2);g.closePath();g.fillStyle='#c4b698';g.fill();
  if(v==='surge')for(let i=0;i<260;i++){const a=(r()-.5)*Math.PI,rr=r()*19,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;R(g,x,y,.5,.5,['#8a3a2a','#cdbb96','#5a5a72','#b98258'][i%4])}
  /* the stage building: a long tiled roof with its ridge along it, lit on the west slope, its gable end wall to the south; before it, on the
     side of the orchestra, the stage, a long platform whose columns show as a row of bases along its edge */
  R(g,664,134,9,90,'#a86c4e');R(g,673,134,9,90,'#7c5240');for(let y=135;y<224;y+=1.5){R(g,664,y,18,.5,'rgba(0,0,0,.08)')}R(g,672.5,134,1,90,'#c48a66');
  R(g,664,134,18,.5,'rgba(60,30,20,.5)');R(g,663.5,134,.5,90,'rgba(255,240,220,.25)');
  poly(g,[664,224,673,219,682,224,682,229,664,229],'#d8c8a8');R(g,664,224,18,.5,'#5a4030');R(g,664,228.5,18,.5,'#8a7a62');R(g,672,225,2,4,'#3a2a1c');
  R(g,682,138,4,84,'#cbbd9e');R(g,682,138,4,.5,'#e6dcc6');R(g,685.5,138,.5,84,'#8a7c62');for(let y=141;y<220;y+=4)R(g,685,y,1,1,'#ece2cc');R(g,682,221.5,4,1,'#7a6a52');
  /* the ways in at either end: a vault over each */
  for(const y of[121,227]){R(g,664,y,16,13,'#c8b898');R(g,664,y,16,.5,'#e4d8bc');R(g,664,y+12.5,16,.5,'#7a6a52');R(g,680,y,1.5,13,'rgba(30,20,30,.35)')}}

/* ---- the cat on a wall above the back lane: it sits, and now and then washes a paw ---- */
const CAT=[["..k...k.","..kkkkk.",".kKkKkk.",".kkkkkk.","kkkkkkk.","kk.kk.k."],["........","..k...k.","..kkkkk.",".kKkkkk.","kkkkkkk.","kk.kk.k."]];
function cat(g,ts){const f=Math.floor(ts/700)%5===0?1:0,m=CAT[f],c={k:'#6a5a4a',K:'#a08a6a'};
  for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++){const col=c[m[j][i]];if(col){g.fillStyle=col;g.fillRect(516+i*.5,133+j*.5,.5,.5)}}}

/* ---- the story of the demo ---- */
async function found(){if(PASS()!==1)return say(PC(),'door_look_demo');
  await narr('demo_found',{dur:4200});await fade(1,400);F.two=1;M.reset();RUN.room=null;playAs(P);enterRoom('lanes14',126,99,1);codeBtn();await fade(0,500)}
async function atGate(){if(PASS()===1)return say(PC(),'harbor_gate_look_demo');
  await narr('demo_end',{dur:3600});await fade(1,400);start(1,true);await fade(0,500)}
async function kneading(){const t=now()+.05;for(let i=0;i<5;i++)noise({t:t+i*.42,d:.16,v:.07,f:260,q:1.4,type:'lowpass'});
  [0,2,4,2,0,-1,0].forEach((n,i)=>tone({f:mtof(57+n),t:t+.2+i*.32,d:.34,type:'sine',v:.03,a:.08,sus:1}));
  await say(PC(),'shutter_look');treasure()}
function hint(){if(PASS()===1){const d=M.dist('house',RUN.x,RUN.y);return['run14',d<200?['hint_listen_demo','hint_lanes_demo']:['hint_listen_demo','hint_lanes_demo']]}
  return['gate14',['hint_gate_demo','hint_round_demo']]}
function setup(){P.called='Paul';G.invs={paul:[],runner14:[]};G.inv=G.invs.paul;drawInv()}
function place(room){if(PASS()===1){P.room=null;place2(RUN,'lanes14',...START);playAs(RUN)}else{RUN.room=null;place2(P,'lanes14',126,99,1);playAs(P)}}
function place2(a,room,x,y,d){a.room=room;a.x=x;a.y=y;a.dir=d;a.walk=null}
/* start: begin the demo in a pass, at once (from the demo page or the playtest) */
function start(pass,again){setChapter(14);if(pass===2)F.two=1;M.reset();ov.className='';ov.onclick=null;ov.innerHTML='';G.scene=null;
  if(pass===1){P.room=null;G.pc=RUN;G.inv=G.invs.runner14=[];place2(RUN,'lanes14',...START);viewOf(RUN)}else{RUN.room=null;G.pc=P;place2(P,'lanes14',126,99,1);viewOf(P)}
  enterRoom('lanes14',PC().x,PC().y,PC().dir);G.busy=false;lock(false);G.verb='walk';G.item=null;syncVerbs();drawInv();status();swapBtn();codeBtn();
  if(!again&&pass===1)cut(()=>narr('demo_start',{dur:5200}))}
return{rooms:['lanes14'],flags:['two'],ent:{lanes14:START},setup,start:()=>start(1),hint,place,inv:()=>[],beds:BEDS,music:null,demo:start,map:M}}));
})();
