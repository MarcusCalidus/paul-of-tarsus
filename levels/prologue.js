/* Paul of Tarsus: "The Road to Damascus" (Prologue, played before Chapter One).
   Loaded on demand by index.html (see PROLOGUE and loadPrologue there).
   Acts 7:58-8:3; 9:1-22, with Acts 18:3; 22:3-16, 20; 26:13; Galatians 1:14; Philippians 3:5.
   Every line is the narrator's, in paraphrase with its reference; nobody speaks, and the light on the road is a plain white screen. */
PROLOGUE(()=>{
"use strict";
/* materials and light shared with every chapter (shared/materials.js), to the standard of Chapter Fifteen's room of Gaius */
const{plank,board,crack,skipCracks,shadow:softShadow,earth,joistAO}=SHARED.materials;
/* softShade: a cast shadow on the ground, laid in three passes of multiply so that its edge is soft: a faint one a little wider than
   the shadow (wide), the body (p), and a core along the foot of what casts it (core). Each is a polygon as for shade(). */
function softShade(g,wide,p,core,c,a){shade(g,wide,c,a*.34);shade(g,p,c,a*.44);shade(g,core,c,a*.3)}
/* daylight over an open scene (shared/damascus.js, whose road picture shares it): the sky stays as it is, the land lies under a soft fall of light */
const{dayLight,DAY}=SHARED.damascus;
/* the pale weathered limestone of Jerusalem, as every chapter paints the city (shared/temple.js); LIME: the rubble of it that shows
   where the plaster of a house has fallen away */
const{stone}=SHARED.temple,LIME='#ccb486';

/* ============ CAST: young Saul (LOOK.paul from Chapter One); Ananias and the men on the road are in shared/damascus.js ============ */

/* scaledMan: draw a figure at z times room scale (z=1.5 or 2 for knees-up, z=2.5 for nearer), keeping crisp whole canvas pixels */
function scaledMan(g,x,y,id,dir,z,lit){const o=LOOK[id],bl=blinks(o,G.t)?1:0,
    c=sprite('pro|'+id+dir+'b'+bl,s=>person(s,0,0,o,dir,0,0,0,0,bl,0),dir),
    W=FIG.W/HR*z,Hh=FIG.H/HR*z,dx=hp(x-FIG.OX/HR*z),dy=hp(y-FIG.OY/HR*z);
  if(!lit){g.drawImage(c,dx,dy,W,Hh);return}
  sb.globalCompositeOperation='copy';sb.drawImage(c,0,0);sb.globalCompositeOperation='multiply';sb.fillStyle=lit;sb.fillRect(0,0,FIG.W,FIG.H);
  sb.globalCompositeOperation='destination-in';sb.drawImage(c,0,0);g.drawImage(SB,dx,dy,W,Hh)}

/* heap of outer garments on the ground outside Jerusalem: soft rounded folds, no straps or right-angle creases (CONTRIBUTING section 3) */
function garmentsArt(g,x,y){
  softShadow(g,x+28,y+10,32,4.6,.4,'#1e1830');
  for(const[dx,dy,w,h,c]of[[0,2,32,10,'#7a5c44'],[20,0,34,11,earth('#4e6278',.2)],[8,5,36,10,'#c4b086']]){
    const X=x+dx,Y=y+dy,p=[X+3,Y+h,X,Y+h*.65,X+4,Y+h*.2,X+w*.45,Y,X+w*.86,Y+h*.18,X+w,Y+h*.62,X+w-2,Y+h];
    poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{
      g.fillStyle=lg(g,X,Y,X,Y+h,[tint(c,.22),c,tint(c,-.34)]);g.fillRect(X,Y,w,h);
      stroke(g,[X+5,Y+h*.55,X+w*.48,Y+h*.36,X+w-6,Y+h*.62],tint(c,-.28),.8);
      stroke(g,[X+6,Y+h*.45,X+w*.48,Y+h*.26,X+w-7,Y+h*.52],tint(c,.24),.6);
      tex(g,'mott',.2,X,Y,w,h);ao(g,X,Y+h*.6,w,h*.4,'b',.38,'#1e1830')})}}

/* ---------- Picture 1: Outside a wall of Jerusalem, by day ---------- */
ART.pro_wall={w:320,q:12,
  paint(g){const r=rng(541),rb=rng(5411),SH='#8f95c4',ST='#d8caa8';
    /* the sky's blue and the far hills drawn a little toward grey, so that they sit with the limestone and the dust (earth) */
    sky(g,320,92,['#3a72bc','#669ad4','#9ec2e4','#dce6dc'].map(c=>earth(c,.16)));
    cloud(g,230,18,54,8,r);cloud(g,140,28,38,6,r);
    /* Judean hills to one horizon at y=92 */
    ridge(g,120,320,92,x=>18+6*Math.sin(x/37+1)+3*Math.sin(x/13),['#7e92b4','#9eb0c6'].map(c=>earth(c,.14)));
    ridge(g,120,320,92,x=>9+4*Math.sin(x/21+2)+2*Math.sin(x/8),['#98a68e','#b4be9e']);
    g.fillStyle=lg(g,0,92,0,144,['#d6c8a4','#c8b68e','#b49e76']);g.fillRect(0,92,320,52);
    tex(g,'mott',.32,0,92,320,52,'overlay',1);tex(g,'grain',.12,0,92,320,52,'overlay',.5);
    for(const[rx,ry,rw]of[[268,108,5],[294,118,7],[244,122,4.5],[282,134,8],[168,116,5]]){
      softShadow(g,rx+.6,ry+.8,rw*1.02,rw*.34,.42,'#281e3c');oval(g,rx,ry,rw,rw*.45,'#9e9078');oval(g,rx-.8,ry-.5,rw*.65,rw*.3,'#beb096')}
    softShadow(g,300,105,10,1.8,.34,'#281e3c');softShadow(g,180,102.6,8,1.5,.34,'#281e3c');
    foliage(g,298,102,10,4.5,'#6e8252',r,30);foliage(g,178,100,8,3.5,'#768a58',r,24);
    /* the wall of Jerusalem on the left, with its corner tower at the left end (never in the middle) */
    const wall=[34,18,154,54,154,98,34,114];
    poly(g,wall,ST);clipTo(g,()=>poly(g,wall),()=>{
      stone(g,34,18,120,96,r,{bw:16,bh:8,c:ST,v:.09,age:.5});
      /* hairline cracks in a few blocks, high on the wall, set by hand */
      for(const[x,y,n]of[[58,34.8,1],[96,42.8,1],[128,50.8,1]])crack(g,x,y,n,rb,.9);
      ao(g,34,88,120,26,'b',.35,'#4a3828');ao(g,34,18,18,96,'l',.28,'#3a3050');
      /* the foot of the wall, where it meets the ground, in a darker step of its own */
      comp(g,'multiply',.22,()=>poly(g,[34,110,154,95,154,98,34,114],'#5a4838'))});
    /* its battlements stand on the sloping top of the wall: the foot of each follows the slope, so that no sky shows under its far corner */
    for(let i=0;i<7;i++){const x=38+i*16,top=v=>18+36*(v-34)/120;poly(g,[x,top(x)-4,x+8,top(x+8)-4,x+8,top(x+8)+.6,x,top(x)+.6],ST);poly(g,[x,top(x)-4,x+8,top(x+8)-4,x+8,top(x+8)-3.4,x,top(x)-3.4],'#f2e6c8')}
    stone(g,0,6,36,110,r,{bw:18,bh:9,c:'#d4c29e',v:.09,age:.5});
    crack(g,14,24.8,1,rb,.9);
    for(let i=2;i<34;i+=11){R(g,i,1.5,7,5,'#cdbda0');R(g,i,1.5,7,.6,'#efe2c4')}
    /* the corner where the tower meets the wall lies in shade, in two steps */
    R(g,35,6,1,110,'#8a7c66');ao(g,36,6,5,108,'l',.26,'#3a3050');ao(g,30,6,5,110,'r',.18,'#3a3050');ao(g,0,92,36,24,'b',.4,'#3a2c20');
    /* the sun stands in front of the wall, behind us: its face is lit and its shadow falls behind it, out of sight, so that Saul stands
       in the sun. Only the soft contact shade along the wall's foot is left on the ground: a faint margin, the body, a darker core */
    softShade(g,[0,115,36,113,154,96,157,98,154,101.4,36,119.4,0,121.6],[0,116,36,114,154,98,155.6,99,154,100.2,36,117.4,0,119.4],[0,116,36,114,154,98,154,99,36,115.8,0,117.6],SH,.5);
    /* outer garments laid in a heap at Saul's feet */
    garmentsArt(g,192,124);
    /* the light of the day: the sun on the face of the wall and on the open ground; the near ground and the foot of the wall a little
       darker. Every pool is long and low, and none lies behind Saul's head. */
    dayLight(g,92,l=>{const top=v=>18+36*(v-34)/120;poly(l,[34,18,154,54,154,92,34,92],DAY);R(l,0,6,36,86,DAY);for(let i=2;i<34;i+=11)R(l,i,1.5,7,5,DAY);
      for(let i=0;i<7;i++){const x=38+i*16;poly(l,[x,top(x)-4,x+8,top(x+8)-4,x+8,top(x+8)+.6,x,top(x)+.6],DAY)}
      pool(l,92,42,90,24,'#fff6e8',.55);pool(l,250,104,110,14,'#fff4e2',.6);pool(l,18,40,30,40,'#fff2e0',.3);
      comp(l,'multiply',1,()=>ao(l,0,120,320,24,'b',.3,'#4a4060'))})},
  draw(g){scaledMan(g,136,154,'paul',1,1.5,null)},
  front(){}};

/* ---------- Picture 2: The same figure, nearer ---------- */
ART.pro_near={w:320,q:12,
  paint(g){const r=rng(542),rb=rng(5421),ST='#d8caa8';
    sky(g,320,92,['#3a72bc','#669ad4','#9ec2e4','#dce6dc'].map(c=>earth(c,.16)));
    cloud(g,250,22,56,9,r);
    ridge(g,180,320,92,x=>20+6*Math.sin(x/31+1),['#7e92b4','#9eb0c6'].map(c=>earth(c,.14)));
    ridge(g,180,320,92,x=>10+4*Math.sin(x/19+2),['#98a68e','#b4be9e']);
    g.fillStyle=lg(g,0,92,0,144,['#d6c8a4','#c2ae86']);g.fillRect(0,92,320,52);
    tex(g,'mott',.3,0,92,320,52,'overlay',1);tex(g,'grain',.1,0,92,320,52,'overlay',.5);
    /* the dressed stones of the wall behind him, nearer now: pale limestone, weathered, a few hairline cracks set by hand, high, where they run to no head */
    stone(g,0,0,206,144,r,{bw:28,bh:14,c:ST,v:.09,age:.45});
    for(const[x,y,n]of[[34,16,2],[118,.8,2],[182,14.8,2]])crack(g,x,y,n,rb,.9);
    /* the end of the wall: its edge, and the shade that gathers along it and at its foot */
    R(g,205,0,1,144,'#8a7c66');ao(g,196,0,9,144,'r',.16,'#3a3050');ao(g,0,0,36,144,'l',.25,'#3a3050');ao(g,0,116,206,28,'b',.3,'#3a2c20');ao(g,0,136,206,8,'b',.2,'#2a2030');
    /* the light of the day: the sun along the upper stones, long and low above his head, and on the open ground beyond the wall */
    dayLight(g,92,l=>{R(l,0,0,206,92,DAY);pool(l,100,26,140,22,'#fff6e8',.6);pool(l,262,104,80,12,'#fff4e2',.5);
      comp(l,'multiply',1,()=>ao(l,0,118,320,26,'b',.28,'#4a4060'))})},
  draw(g){scaledMan(g,142,202,'paul',1,2.5,null)},
  front(){}};

/* ---------- Picture 3: A street door in Jerusalem, shut, by evening light ---------- */
ART.pro_door={w:320,q:12,
  paint(g){const r=rng(543),rb=rng(5431),rw=rng(5432),W='#d8c4a0',S='#c8b694';
    sky(g,320,42,['#283062','#54467c','#986274','#d89266'].map(c=>earth(c,.14)));
    /* house fronts closing the street */
    stone(g,0,18,68,92,r,{bw:16,bh:8,c:'#cdb894',v:.09,age:.6});R(g,0,14.5,69,4,'#d4c4a6');
    plaster(g,68,8,184,102,W,r,{patch:5,cracks:0,brick:LIME,t:.36});skipCracks(r,6);
    R(g,67,4.5,186,4,'#ead8b8');R(g,67,8,186,1,'#8a7658');
    for(let i=76;i<246;i+=14){R(g,i,12,3,3,'#6a4a2c');R(g,i,15,3,2.5,'rgba(0,0,0,.28)')}
    plaster(g,252,16,68,94,'#cbb896',r,{patch:3,cracks:0,brick:LIME,t:.36});skipCracks(r,4);R(g,251,12.5,69,4,'#dfd0b0');
    /* cracks cut by hand, high under the eaves, and the shade under the cornices and where the house fronts meet */
    for(const[x,y,n]of[[96,18,2],[196,19,3],[240,18,3],[292,23,4]])crack(g,x,y,n,rb);
    ao(g,68,9,184,6,'t',.3,'#2a2030');ao(g,0,18,68,5,'t',.28,'#2a2030');ao(g,252,16.5,68,5,'t',.28,'#2a2030');
    ao(g,62,18,6,92,'r',.22,'#2a2030');ao(g,246,16,6,94,'r',.2,'#2a2030');ao(g,252,16,5,94,'l',.16,'#2a2030');
    /* high shuttered windows */
    windowArt(g,22,38,14,16,'#beae90',{shut:1});
    windowArt(g,88,34,16,18,W,{shut:1});
    windowArt(g,212,34,16,18,W,{shut:1});
    windowArt(g,276,40,14,16,'#cbb896',{shut:1});
    /* the shut street door in a deep stone reveal: recessed horizontal panels, no iron bands crossing vertical planks (CONTRIBUTING section 3) */
    stone(g,122,28,68,82,r,{bw:14,bh:7,c:S,v:.08});
    R(g,130,36,52,74,'#18100c');
    /* the frame and the leaf: quiet grain that runs with each piece; the stiles up and down, the rails across between them, the panels
       sunk between rails and stiles. Nothing lies across a plank (CONTRIBUTING section 3). */
    board(g,130,36,4,74,'#4a301c',rw,1);board(g,178,36,4,74,'#4a301c',rw,1);board(g,128,33,56,4,'#5a3c24',rw);
    plank(g,134,40,44,68,'#6e4828',rw,1);
    for(const[ry,rh]of[[40,3],[61,4],[83,4],[105,3]])plank(g,138,ry,36,rh,'#704a2a',rw,0);
    for(const[py,ph]of[[43,18],[65,18],[87,18]]){
      R(g,138,py,36,ph,'#5a3a20');R(g,138,py,36,.8,'#3a2212');R(g,138,py+ph-.8,36,.8,'#8a6038');
      plank(g,140,py+2,32,ph-4,'#78502e',rw,0);ao(g,140,py+2,32,2.4,'t',.3,'#1a100a')}
    ao(g,134,40,44,6,'t',.55);ao(g,134,40,4,68,'l',.45);
    /* the shade in the deep reveal: under its lintel and down its sides */
    ao(g,122,28,68,5,'t',.3,'#2a2030');ao(g,126,33,4,77,'r',.3,'#2a2030');ao(g,182,33,4,77,'l',.18,'#2a2030');
    /* heavy wooden bar-lock boss on the right stile (a solid square plate, no cross or tiny ring) */
    R(g,169,71,5,6,'#3a2414');R(g,170,72,3,4,'#b89246');R(g,170,72,3,1,'#e2c478');
    /* threshold steps and a water jar beside the door */
    R(g,120,107,72,4,'#d2c4a6');R(g,120,107,72,.8,'#eee2c6');ao(g,120,107,72,1.6,'t',.3,'#2a2030');
    R(g,116,110,80,4,'#bfb092');R(g,116,110,80,.8,'#dcd0b4');ao(g,116,113,80,1,'b',.25,'#2a2030');
    softShadow(g,109,112,6.6,1.5,.44,'#1e1838');vessel(g,106,112,5.5,15,'#9a5432','amph',{noShadow:1});
    /* paved street, and the shade along the foot of the house fronts, in two steps */
    pave(g,0,110,320,144,'#b8aa90',r,{vx:160,vy:72,rows:5,step:34,v:.1,t:.3});ao(g,0,110,320,6,'t',.4,'#2a2030');ao(g,0,110,320,2.4,'t',.3,'#1a1420');
    ao(g,0,104,120,6,'b',.2,'#2a2030');ao(g,196,104,124,6,'b',.2,'#2a2030');
    /* evening light: the low sun from the left, on the left house, the face of the wall and the door; its last warmth along the cornice
       and on the steps; cool violet shade from the right, and toward the near paving */
    lightmap(g,320,'#685e88',l=>{
      pool(l,40,48,180,110,'#ffae68',.85);pool(l,148,76,95,62,'#ffbe78',.6);
      pool(l,120,7,150,5,'#ffc890',.4);pool(l,34,30,44,22,'#ffb878',.3);pool(l,156,111,56,5,'#ffc080',.35);pool(l,108,104,14,10,'#ffb070',.25);
      comp(l,'multiply',1,()=>{ao(l,220,0,100,144,'r',.45,'#1e1838');ao(l,0,124,320,20,'b',.35,'#1e1838');ao(l,0,0,320,10,'t',.18,'#1e1838')})})},
  draw(){},front(){}};

function scene(id){return(g,t)=>{backdrop(g,id,0);ART[id].draw(g,t)}}
/* the road and the house of Judas are shared with Chapter Eighteen (shared/damascus.js), drawn with the state in G.pro */
const D=SHARED.damascus,SCENES={stones:scene('pro_wall'),zeal:scene('pro_near'),door:scene('pro_door'),road:D.scene('road'),judas:D.scene('judas')};

/* pwait: wait ms (shortened in fast playtest mode), resolving early if SKIP is pressed */
function pwait(ms){if(G.proSkip)return Promise.resolve();const d=G.speedAll>200?40:ms;
  return new Promise(res=>{const fin=()=>{clearTimeout(tm);if(G.skip===fin)G.skip=null;res()},tm=setTimeout(fin,d);G.skip=fin;G.lineT=performance.now()})}
async function pfade(on,ms,white){if(G.proSkip)return;await fade(on,G.speedAll>200?40:ms,white)}
async function pnarr(text,o){if(G.proSkip)return;await narr(text,o)}

async function play(){
  await cut(async()=>{
    /* 1. Outside a wall of Jerusalem, by day */
    G.pro={};G.scene=SCENES.stones;AU.mood='stones';AU.amb={wind:.2};codeBtn();
    await pwait(400);
    await pnarr('outside_jerusalem_stephen_acts_7_58_60');
    await pnarr('saul_stood_by_guarded_acts_8_1_22_20');
    if(G.proSkip)return;

    /* 2. The same figure, nearer */
    await pfade(1,350);G.scene=SCENES.zeal;AU.mood='tense';await pfade(0,350);
    await pnarr('born_in_tarsus_acts_18_3_22_3');
    await pnarr('as_a_pharisee_acts_22_3_galatians_1_14_philippians_3_5');
    if(G.proSkip)return;

    /* 3. A street door in Jerusalem, shut, by evening light */
    await pfade(1,380);G.scene=SCENES.door;AU.amb={wind:.18,crickets:.2};await pfade(0,380);
    await pnarr('in_that_zeal_acts_8_3');
    await pnarr('still_threatening_the_disciples_acts_9_1_2');
    if(G.proSkip)return;

    /* 4. The road near Damascus at midday */
    await pfade(1,400);G.pro={x:108,d:0,blind:0};G.scene=SCENES.road;AU.mood='none';AU.amb={wind:.35,cicadas:.55};await pfade(0,400);
    let stepIv=setInterval(()=>{if(!G.proSkip&&!G.white)SFX.step()},420);
    tween(G.speedAll>200?120:4200,k=>{if(G.pro&&!G.pro.blind){G.pro.x=108+42*k;G.pro.d=42*k}});
    await pnarr('after_days_on_the_road_acts_9_3_22_6');
    clearInterval(stepIv);
    if(G.proSkip)return;

    /* 5. White: a light from heaven brighter than the sun; everything cuts off at once */
    silenceNow();
    await pfade(1,OPTS.mov?480:900,1);
    await pnarr('all_at_once_light_acts_9_3_26_13');
    await pnarr('he_fell_to_the_ground_acts_9_4');
    await pnarr('saul_asked_who_was_speaking_acts_9_5_6');
    if(G.proSkip)return;

    /* 6. Black: no words, two seconds of silence */
    await pfade(1,360,0);
    await pwait(2000);
    if(G.proSkip)return;

    /* 7. The same road: Saul on his feet with his eyes open, led by the hand into Damascus */
    G.pro={x:126,d:0,blind:1};G.scene=SCENES.road;AU.mood='none';AU.amb={wind:.2};
    await pfade(0,550);
    const uneven=[0,520,1180,1760,2480,3120,3850,4520,5280].map(ms=>setTimeout(()=>{if(!G.proSkip&&G.scene===SCENES.road)SFX.step()},ms));
    tween(G.speedAll>200?160:7200,k=>{if(G.pro&&G.pro.blind){G.pro.x=126+44*k;G.pro.d=44*k}});
    await pnarr('men_traveling_with_him_acts_9_7_22_9');
    await pnarr('his_companions_had_acts_9_8_22_11');
    uneven.forEach(clearTimeout);
    if(G.proSkip)return;

    /* 8. A room in Damascus: Saul seated with bowed head, Ananias in the doorway */
    await pfade(1,450);G.pro={ax:38,afr:0,hand:0,sight:0};G.scene=SCENES.judas;AU.mood='harp';AU.amb={wind:.12};await pfade(0,450);
    await pnarr('for_three_days_acts_9_9_11');
    await pnarr('lord_had_chosen_acts_9_10_15');
    if(G.proSkip)return;
    await tween(G.speedAll>200?60:1800,k=>{if(!G.pro)return;G.pro.ax=38+136*k;G.pro.afr=k<1?walkFr(LOOK.ananias,136*k,66):0});
    if(G.pro){G.pro.afr=0;G.pro.hand=1}
    setTimeout(()=>{if(G.pro&&!G.proSkip){G.pro.sight=1;SFX.good()}},G.speedAll>200?20:1400);
    await pnarr('saul_felt_hands_acts_9_17_18');
    if(G.proSkip)return;

    /* 9. The wall of Damascus under the moon: the ensemble climax swells in and runs straight into Chapter One */
    await pfade(1,500);G.pro=null;G.scene=CHAP[1].scenes.wall;G.end={};AU.step=96;AU.mood='ancient';AU.amb=TITLE.amb;await pfade(0,500);
    await pnarr('all_who_heard_acts_9_20_22');
  },true);
}

return{play,scenes:SCENES};
});
