/* Paul of Tarsus: "The Road to Damascus" (Prologue, played before Chapter One).
   Loaded on demand by index.html (see PROLOGUE and loadPrologue there).
   Acts 7:58-8:3; 9:1-22, with Acts 18:3; 22:3-16, 20; 26:13; Galatians 1:14; Philippians 3:5.
   Every line is the narrator's, in paraphrase with its reference; nobody speaks, and the light on the road is a plain white screen. */
PROLOGUE(()=>{
"use strict";

/* ============ CAST (young Saul uses LOOK.paul from Chapter One; Ananias and the companions on the road are added here) ============ */
Object.assign(LOOK,{
  ananias:{skin:'#b88458',hair:'#4a3a2c',beard:'#4a3a2c',brow:'#3a2a1c',tunic:'#6a7e68',cloak:'#c8b894',belt:'#4a3a24',trim:'#4e604c',long:1,ph:1100},
  pro_m1:{skin:'#b47e52',wrap:'#d2c296',beard:'#2a1a12',brow:'#1a1210',tunic:'#8a6a4a',belt:'#3a2414',trim:'#5a422c',ph:400},
  pro_m2:{skin:'#c08c5c',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,brow:'#2a1a12',tunic:'#7a8a9a',cloak:'#5a4a3c',belt:'#3a2414',ph:1600},
  pro_m3:{skin:'#a87448',wrap:'#b8a47c',beard:'#3a2a1c',brow:'#2a1a12',tunic:'#9a8662',long:1,belt:'#4a3a24',ph:2300}});

/* scaledMan: draw a figure at z times room scale (z=1.5 or 2 for knees-up, z=2.5 for nearer), keeping crisp whole canvas pixels */
function scaledMan(g,x,y,id,dir,z,lit){const o=LOOK[id],bl=blinks(o,G.t)?1:0,
    c=sprite('pro|'+id+dir+'b'+bl,s=>person(s,0,0,o,dir,0,0,0,0,bl,0),dir),
    W=FIG.W/HR*z,Hh=FIG.H/HR*z,dx=hp(x-FIG.OX/HR*z),dy=hp(y-FIG.OY/HR*z);
  if(!lit){g.drawImage(c,dx,dy,W,Hh);return}
  sb.globalCompositeOperation='copy';sb.drawImage(c,0,0);sb.globalCompositeOperation='multiply';sb.fillStyle=lit;sb.fillRect(0,0,FIG.W,FIG.H);
  sb.globalCompositeOperation='destination-in';sb.drawImage(c,0,0);g.drawImage(SB,dx,dy,W,Hh)}

/* heap of outer garments on the ground outside Jerusalem: soft rounded folds, no straps or right-angle creases (CONTRIBUTING section 3) */
function garmentsArt(g,x,y){
  oval(g,x+28,y+10,34,5.5,'rgba(30,24,48,.36)');
  for(const[dx,dy,w,h,c]of[[0,2,32,10,'#7a5c44'],[20,0,34,11,'#4e6278'],[8,5,36,10,'#c4b086']]){
    const X=x+dx,Y=y+dy,p=[X+3,Y+h,X,Y+h*.65,X+4,Y+h*.2,X+w*.45,Y,X+w*.86,Y+h*.18,X+w,Y+h*.62,X+w-2,Y+h];
    poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{
      g.fillStyle=lg(g,X,Y,X,Y+h,[tint(c,.22),c,tint(c,-.34)]);g.fillRect(X,Y,w,h);
      stroke(g,[X+5,Y+h*.55,X+w*.48,Y+h*.36,X+w-6,Y+h*.62],tint(c,-.28),.8);
      stroke(g,[X+6,Y+h*.45,X+w*.48,Y+h*.26,X+w-7,Y+h*.52],tint(c,.24),.6);
      tex(g,'mott',.35,X,Y,w,h);ao(g,X,Y+h*.6,w,h*.4,'b',.35)})}}

/* ---------- Picture 1: Outside a wall of Jerusalem, by day ---------- */
ART.pro_wall={w:320,
  paint(g){const r=rng(541),SH='#8f95c4',ST='#d8caa8';
    sky(g,320,92,['#3a72bc','#669ad4','#9ec2e4','#dce6dc']);
    cloud(g,230,18,54,8,r);cloud(g,140,28,38,6,r);
    /* Judean hills to one horizon at y=92 */
    ridge(g,120,320,92,x=>18+6*Math.sin(x/37+1)+3*Math.sin(x/13),['#7e92b4','#9eb0c6']);
    ridge(g,120,320,92,x=>9+4*Math.sin(x/21+2)+2*Math.sin(x/8),['#98a68e','#b4be9e']);
    g.fillStyle=lg(g,0,92,0,144,['#d6c8a4','#c8b68e','#b49e76']);g.fillRect(0,92,320,52);
    tex(g,'mott',.5,0,92,320,52,'overlay',1);tex(g,'grain',.12,0,92,320,52,'overlay',.5);
    for(const[rx,ry,rw]of[[268,108,5],[294,118,7],[244,122,4.5],[282,134,8],[168,116,5]]){
      oval(g,rx,ry+.6,rw*1.1,rw*.4,'rgba(40,30,60,.28)');oval(g,rx,ry,rw,rw*.45,'#9e9078');oval(g,rx-.8,ry-.5,rw*.65,rw*.3,'#beb096')}
    foliage(g,298,102,10,4.5,'#6e8252',r,30);foliage(g,178,100,8,3.5,'#768a58',r,24);
    /* the wall of Jerusalem on the left, with its corner tower at the left end (never in the middle) */
    const wall=[34,18,154,54,154,98,34,114];
    poly(g,wall,ST);clipTo(g,()=>poly(g,wall),()=>{
      ashlar(g,34,18,120,96,ST,r,{bw:16,bh:8,v:.1,t:.4});
      ao(g,34,88,120,26,'b',.35,'#4a3828');ao(g,34,18,18,96,'l',.28,'#3a3050')});
    /* its battlements stand on the sloping top of the wall: the foot of each follows the slope, so that no sky shows under its far corner */
    for(let i=0;i<7;i++){const x=38+i*16,top=v=>18+36*(v-34)/120;poly(g,[x,top(x)-4,x+8,top(x+8)-4,x+8,top(x+8)+.6,x,top(x)+.6],ST);poly(g,[x,top(x)-4,x+8,top(x+8)-4,x+8,top(x+8)-3.4,x,top(x)-3.4],'#f2e6c8')}
    ashlar(g,0,6,36,110,'#cdbda0',r,{bw:18,bh:9,v:.1,t:.45});
    for(let i=2;i<34;i+=11){R(g,i,1.5,7,5,'#cdbda0');R(g,i,1.5,7,.6,'#efe2c4')}
    R(g,35,6,1,110,'#8a7c66');ao(g,0,92,36,24,'b',.4,'#3a2c20');
    shade(g,[0,116,36,114,154,98,210,114,72,144,0,144],SH,.45);
    /* outer garments laid in a heap at Saul's feet */
    garmentsArt(g,192,124)},
  draw(g){scaledMan(g,136,154,'paul',1,1.5,null)},
  front(){}};

/* ---------- Picture 2: The same figure, nearer ---------- */
ART.pro_near={w:320,
  paint(g){const r=rng(542),ST='#d8caa8';
    sky(g,320,92,['#3a72bc','#669ad4','#9ec2e4','#dce6dc']);
    cloud(g,250,22,56,9,r);
    ridge(g,180,320,92,x=>20+6*Math.sin(x/31+1),['#7e92b4','#9eb0c6']);
    ridge(g,180,320,92,x=>10+4*Math.sin(x/19+2),['#98a68e','#b4be9e']);
    g.fillStyle=lg(g,0,92,0,144,['#d6c8a4','#c2ae86']);g.fillRect(0,92,320,52);
    tex(g,'mott',.45,0,92,320,52,'overlay',1);
    /* the dressed stones of the wall behind him, nearer now */
    ashlar(g,0,0,206,144,ST,r,{bw:28,bh:14,v:.1,t:.42});
    R(g,205,0,1,144,'#8a7c66');ao(g,0,0,36,144,'l',.25,'#3a3050');ao(g,0,116,206,28,'b',.3,'#3a2c20')},
  draw(g){scaledMan(g,142,202,'paul',1,2.5,null)},
  front(){}};

/* ---------- Picture 3: A street door in Jerusalem, shut, by evening light ---------- */
ART.pro_door={w:320,
  paint(g){const r=rng(543),W='#d8c4a0',S='#c8b694';
    sky(g,320,42,['#283062','#54467c','#986274','#d89266']);
    /* house fronts closing the street */
    ashlar(g,0,18,68,92,'#beae90',r,{bw:16,bh:8,v:.1});R(g,0,14.5,69,4,'#d4c4a6');
    plaster(g,68,8,184,102,W,r,{patch:5,cracks:6,brick:'#a67c54',t:.5});
    R(g,67,4.5,186,4,'#ead8b8');R(g,67,8,186,1,'#8a7658');
    for(let i=76;i<246;i+=14){R(g,i,12,3,3,'#6a4a2c');R(g,i,15,3,2.5,'rgba(0,0,0,.28)')}
    plaster(g,252,16,68,94,'#cbb896',r,{patch:3,cracks:4,brick:'#9c724c',t:.5});R(g,251,12.5,69,4,'#dfd0b0');
    /* high shuttered windows */
    windowArt(g,22,38,14,16,'#beae90',{shut:1});
    windowArt(g,88,34,16,18,W,{shut:1});
    windowArt(g,212,34,16,18,W,{shut:1});
    windowArt(g,276,40,14,16,'#cbb896',{shut:1});
    /* the shut street door in a deep stone reveal: recessed horizontal panels, no iron bands crossing vertical planks (CONTRIBUTING section 3) */
    ashlar(g,122,28,68,82,S,r,{bw:14,bh:7,v:.09});
    R(g,130,36,52,74,'#18100c');
    wood(g,130,36,4,74,'#4a301c',1);wood(g,178,36,4,74,'#4a301c',1);wood(g,128,33,56,4,'#5a3c24');
    R(g,134,40,44,68,'#6e4828');inRect(g,134,40,44,68,()=>tex(g,'wood',.55,134,40,44,68,'overlay',.5));
    for(const[py,ph]of[[43,18],[65,18],[87,18]]){
      R(g,138,py,36,ph,'#5a3a20');R(g,138,py,36,.8,'#3a2212');R(g,138,py+ph-.8,36,.8,'#8a6038');
      R(g,140,py+2,32,ph-4,'#78502e')}
    ao(g,134,40,44,6,'t',.55);ao(g,134,40,4,68,'l',.45);
    /* heavy wooden bar-lock boss on the right stile (a solid square plate, no cross or tiny ring) */
    R(g,169,71,5,6,'#3a2414');R(g,170,72,3,4,'#b89246');R(g,170,72,3,1,'#e2c478');
    /* threshold steps and a water jar beside the door */
    R(g,120,107,72,4,'#d2c4a6');R(g,120,107,72,.8,'#eee2c6');
    R(g,116,110,80,4,'#bfb092');R(g,116,110,80,.8,'#dcd0b4');
    vessel(g,106,112,5.5,15,'#9a5432','amph');
    /* paved street */
    pave(g,0,110,320,144,'#b8aa90',r,{vx:160,vy:72,rows:5,step:34,v:.1});ao(g,0,110,320,6,'t',.45);
    /* evening light: warm low sun from the left, cool violet shadow from the right */
    lightmap(g,320,'#685e88',l=>{
      pool(l,40,48,180,110,'#ffae68',.85);pool(l,148,76,95,62,'#ffbe78',.6);
      comp(l,'multiply',1,()=>{ao(l,220,0,100,144,'r',.45,'#1e1838');ao(l,0,124,320,20,'b',.35,'#1e1838')})})},
  draw(){},front(){}};

/* ---------- Pictures 4 & 7: The road near Damascus at midday ---------- */
ART.pro_road={w:320,
  paint(g){const r=rng(544),SH='#8f95c4';
    /* bright midday sky and heat haze to one horizon at y=84 */
    sky(g,320,84,['#4c80c2','#7aa6da','#b2cee8','#e6e4d2']);
    cloud(g,74,16,48,7,r);cloud(g,188,12,62,8,r);
    /* Mount Hermon and the Anti-Lebanon range in the distance */
    const mt=x=>22+8*Math.sin(x/43+.4)+4*Math.sin(x/16+1.8)+2*Math.sin(x/7);
    ridge(g,0,320,84,mt,['#8fa2c4','#aab8d0','#c8d0dc']);
    for(let x=0;x<190;x+=.5){const h=mt(x);if(h>25)R(g,x,84-h,.5,Math.min(5,(h-25)*.8),'#f6f8fc')}
    ridge(g,0,320,84,x=>9+4*Math.sin(x/24+1)+2*Math.sin(x/9),['#a6b092','#bec4a4']);
    /* the oasis and the walled city of Damascus, small in the distance on the right, sitting on the horizon y=84 */
    for(let i=0;i<28;i++)oval(g,234+i*3.1,82.5-(i%3)*.6,3.5,2.2,i%2?'#587448':'#688454');
    ashlar(g,246,74,56,10,'#d8caa8',r,{bw:6,bh:3,v:.07});
    for(const tx of[244,298]){ashlar(g,tx,70,7,14,'#e0d2b2',r,{bw:4,bh:3,v:.07});R(g,tx,69,7,1,'#f4e8cc')}
    arch(g,268,78,6,6,'#5a4a3a');
    /* the sunlit plain below the horizon */
    g.fillStyle=lg(g,0,84,0,144,['#e2d4ae','#d4c296','#c2ac7e']);g.fillRect(0,84,320,60);
    tex(g,'mott',.5,0,84,320,60,'overlay',1);tex(g,'grain',.12,0,84,320,60,'overlay',.5);
    /* the road to Damascus: wide in the foreground, narrowing to stop just short of the gate at y=85 */
    const L=[],Rt=[],cx=k=>26+245*k+14*Math.sin(k*3.1),cy=k=>132-47*k;
    for(let i=0;i<=32;i++){const k=i/32,hw=1.8+16*Math.pow(1-k,1.35);L.push(cx(k)-hw,cy(k));Rt.unshift(cx(k)+hw,cy(k)+1.5*(1-k))}
    poly(g,L.concat(Rt),'#eadbc2');
    clipTo(g,()=>poly(g,L.concat(Rt)),()=>{tex(g,'mott',.45,0,84,320,60);ao(g,0,84,320,12,'t',.18,'#8a7652')});
    for(const[bx,by,bw]of[[42,102,5],[118,96,4],[210,104,4.5],[278,128,8],[164,136,6.5],[34,138,7]]){
      oval(g,bx,by+.5,bw*1.05,bw*.38,'rgba(50,40,70,.25)');oval(g,bx,by,bw,bw*.45,'#a89878');oval(g,bx-.6,by-.5,bw*.65,bw*.28,'#cabaa0')}
    foliage(g,86,98,7,3,'#788a56',r,20);foliage(g,228,116,9,3.8,'#6e804e',r,26);
    pool(g,160,0,280,120,'#fff8dc',.18,'screen')},
  draw(g){const st=G.pro||{},x=st.x||118,d=st.d||0;
    if(st.blind){
      /* Picture 7: Saul on his feet with his eyes open, led by the hand (both forearms bent and slanting, figures close) */
      const fr=d>0?walkFr(LOOK.paul,d,36):0,fr1=d>0?walkFr(LOOK.pro_m1,d,36):0,
        fr2=d>0?walkFr(LOOK.pro_m2,d+7,36):0,fr3=d>0?walkFr(LOOK.pro_m3,d+13,36):0;
      man(g,x-52,121,'pro_m3',1,fr3,null,0,6.5);
      man(g,x-28,125,'pro_m2',1,fr2,null,0,6.5);
      man(g,x,123,'paul',1,fr,null,5,6.5,0,0);
      man(g,x+19,123,'pro_m1',1,fr1,null,4,6.5);
    }else{
      /* Picture 4: Saul and the men with him walking on foot toward Damascus, short midday shadows */
      const fr=d>0?walkFr(LOOK.paul,d,54):0,fr1=d>0?walkFr(LOOK.pro_m1,d+5,54):0,
        fr2=d>0?walkFr(LOOK.pro_m2,d+11,54):0,fr3=d>0?walkFr(LOOK.pro_m3,d+17,54):0;
      man(g,x-54,120,'pro_m3',1,fr3,null,0,6.5);
      man(g,x-34,125,'pro_m2',1,fr2,null,0,6.5);
      man(g,x-16,119,'pro_m1',1,fr1,null,0,6.5);
      man(g,x+8,123,'paul',1,fr,null,0,6.5);
    }},
  front(){}};

/* ---------- Picture 8: A room in Damascus (the house of Judas on the street called Straight) ---------- */
ART.pro_judas={w:320,
  light:()=>({amb:'#7a7288',lamps:[[42,76,120,'#e8cfa0'],[232,48,95,'#d8c4a0']]}),
  paint(g){const r=rng(548),W='#d4c09e',T='#68482c';
    plaster(g,0,0,320,105,W,r,{patch:4,cracks:5,brick:'#a67850',t:.5});
    R(g,0,0,320,9,'#2c1e14');tex(g,'wood',.6,0,0,320,9);
    for(let i=0;i<9;i++){const a=12+i*40,x0=160+(a-160)*1.16,x1=160+(a+7-160)*1.16;poly(g,[a,9,a+7,9,x1,0,x0,0],T);poly(g,[a+5,9,a+7,9,x1,0,x1-2,0],tint(T,-.4))}
    wood(g,0,8.5,320,3,'#5a3e26');ao(g,0,11.5,320,8,'t',.45);
    poly(g,[0,0,7,9,7,105,0,113],'#9e8c70');poly(g,[320,0,313,9,313,105,320,113],'#948266');
    pave(g,0,105,320,144,'#b09c7e',r,{vx:160,vy:70,rows:5,step:36,v:.09});ao(g,0,105,320,7,'t',.5);
    /* open doorway on the left: sunlit courtyard wall of Judas's house closing the view */
    R(g,18,32,40,74,'#8e785c');R(g,22,36,32,70,'#e8d8b4');
    plaster(g,22,36,32,54,'#eadbc0',r,{patch:0,cracks:2});R(g,22,90,32,16,'#cdbca0');
    wood(g,16,29,44,3.5,'#5a3e26');ao(g,22,36,32,6,'t',.35);
    /* high window on the right wall */
    R(g,220,24,26,22,'#9e8a6c');R(g,223,27,20,16,'#dce6ee');
    /* low table with untouched bread and a water jug (three days he neither ate nor drank) */
    R(g,114,103,36,8,'rgba(20,12,8,.45)');wood(g,115,103,3,9,'#5a3c22',1);wood(g,146,103,3,9,'#5a3c22',1);
    wood(g,111,99,44,4,'#8a6238');oval(g,124,98,5.5,2,'#c89c58');oval(g,123.5,97.5,4.5,1.5,'#e2ba78');
    vessel(g,139,99,2.8,7,'#9a5430','jug',{noShadow:1});
    /* the stool where Saul sits */
    oval(g,200,121,10,2,'rgba(0,0,0,.38)');
    stroke(g,[195,112,193.5,120],'#3e2a1a',1.6);stroke(g,[205,112,206.5,120],'#3e2a1a',1.6);
    wood(g,192,109,16,3,'#7a5632');
    /* daylight streaming through the open doorway and the high window */
    lightmap(g,320,'#585068',l=>{
      pool(l,38,72,110,80,'#ffdfb0',.9);pool(l,64,116,95,28,'#ffe6be',.65);
      pool(l,232,36,75,60,'#e8f0ff',.65);pool(l,196,106,85,54,'#d8c8b0',.55);
      comp(l,'lighter',.32,()=>poly(l,[223,43,243,43,212,126,174,126],lg(l,0,43,0,126,['rgba(235,242,255,.55)','rgba(235,242,255,.1)'])));
      comp(l,'multiply',1,()=>{ao(l,268,0,52,144,'r',.45,'#1a142c');ao(l,0,128,320,16,'b',.35,'#1a142c')})})},
  draw(g){const st=G.pro||{},ax=st.ax||38,hand=st.hand?2:0,bow=st.sight?0:1,bl=st.sight?0:1;
    man(g,ax,118,'ananias',1,st.afr||0,lightAt('pro_judas',ax,118),hand,8.5);
    man(g,200,121,'paul',-1,-1,lightAt('pro_judas',200,121),0,8,bow,bl)},
  front(){}};

function scene(id){return(g,t)=>{backdrop(g,id,0);ART[id].draw(g,t)}}
const SCENES={stones:scene('pro_wall'),zeal:scene('pro_near'),door:scene('pro_door'),road:scene('pro_road'),judas:scene('pro_judas')};

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
    await pnarr('Outside Jerusalem, a disciple of Jesus named Stephen was put to death with stones. Those who testified against him laid their outer garments at the feet of a young man called Saul. (Acts 7:58)');
    await pnarr('Saul stood by, guarded their garments, and thought the killing right. (Acts 8:1; 22:20)');
    if(G.proSkip)return;

    /* 2. The same figure, nearer */
    await pfade(1,350);G.scene=SCENES.zeal;AU.mood='tense';await pfade(0,350);
    await pnarr('Born in Tarsus of Cilicia and a tentmaker by trade, he had been taught in Jerusalem by Gamaliel in the strict keeping of the Law. (Acts 18:3; 22:3)');
    await pnarr('A Pharisee, zealous for the traditions of his fathers beyond many of his own age, he believed he was serving Jehovah, the God of his forefathers. (Acts 22:3; Galatians 1:14; Philippians 3:5)');
    if(G.proSkip)return;

    /* 3. A street door in Jerusalem, shut, by evening light */
    await pfade(1,380);G.scene=SCENES.door;AU.amb={wind:.18,crickets:.2};await pfade(0,380);
    await pnarr('In that zeal he went from house to house in Jerusalem, dragging out men and women and handing them over to prison. (Acts 8:3)');
    await pnarr('Still threatening the disciples with death, he asked the high priest for letters to the synagogues of Damascus, to bring bound to Jerusalem any he found who belonged to The Way, as the disciples were known. (Acts 9:1, 2)');
    if(G.proSkip)return;

    /* 4. The road near Damascus at midday */
    await pfade(1,400);G.pro={x:108,d:0,blind:0};G.scene=SCENES.road;AU.mood='none';AU.amb={wind:.35,cicadas:.55};await pfade(0,400);
    let stepIv=setInterval(()=>{if(!G.proSkip&&!G.white)SFX.step()},420);
    tween(G.speedAll>200?120:4200,k=>{if(G.pro&&!G.pro.blind){G.pro.x=108+42*k;G.pro.d=42*k}});
    await pnarr('After days on the road he drew near to Damascus, about midday. (Acts 9:3; 22:6)');
    clearInterval(stepIv);
    if(G.proSkip)return;

    /* 5. White: a light from heaven brighter than the sun; everything cuts off at once */
    silenceNow();
    await pfade(1,OPTS.mov?480:900,1);
    await pnarr('Suddenly a light from heaven, brighter than the sun, flashed all around him. (Acts 9:3; 26:13)');
    await pnarr('He fell to the ground and heard a voice call him twice by name, asking why he was persecuting him. (Acts 9:4)');
    await pnarr('When he asked who was speaking, the voice answered that it was Jesus, whom he was persecuting, and told him to get up and go into the city, where he would be told what he must do. (Acts 9:5, 6)');
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
    await pnarr('The men traveling with him had seen the light and heard the sound of a voice, but saw no one and did not understand the words. (Acts 9:7; 22:9)');
    await pnarr('Saul rose from the ground, and though his eyes were open he could see nothing. So they took him by the hand and led him into Damascus. (Acts 9:8; 22:11)');
    uneven.forEach(clearTimeout);
    if(G.proSkip)return;

    /* 8. A room in Damascus: Saul seated with bowed head, Ananias in the doorway */
    await pfade(1,450);G.pro={ax:38,afr:0,hand:0,sight:0};G.scene=SCENES.judas;AU.mood='harp';AU.amb={wind:.12};await pfade(0,450);
    await pnarr('For three days he saw nothing, and neither ate nor drank, while he prayed in the house of Judas on the street called Straight. (Acts 9:9, 11)');
    await pnarr("The Lord sent a disciple named Ananias to him. Ananias had heard how much harm Saul had done in Jerusalem, but he was told to go, because this man had been chosen to carry the Lord's name to the nations, to kings, and to the sons of Israel. (Acts 9:10-15)");
    if(G.proSkip)return;
    await tween(G.speedAll>200?60:1800,k=>{if(!G.pro)return;G.pro.ax=38+136*k;G.pro.afr=k<1?walkFr(LOOK.ananias,136*k,66):0});
    if(G.pro){G.pro.afr=0;G.pro.hand=1}
    setTimeout(()=>{if(G.pro&&!G.proSkip){G.pro.sight=1;SFX.good()}},G.speedAll>200?20:1400);
    await pnarr("Ananias came in, laid his hands on him, and called him brother. At once something like scales fell from Saul's eyes; he saw again, rose, and was baptized. (Acts 9:17, 18)");
    if(G.proSkip)return;

    /* 9. The wall of Damascus under the moon: the ensemble climax swells in and runs straight into Chapter One */
    await pfade(1,500);G.pro=null;G.scene=CHAP[1].scenes.wall;G.end={};AU.step=96;AU.mood='ancient';AU.amb=TITLE.amb;await pfade(0,500);
    await pnarr('Right away he began preaching in the synagogues of Damascus that Jesus is the Son of God, proving that he is the Christ, the one whom God had promised; and all who heard him were astonished. (Acts 9:20-22)');
  },true);
}

return{play,scenes:SCENES};
});
