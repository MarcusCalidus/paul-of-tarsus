/* Paul of Tarsus: the road to Damascus and the house of Judas, two told pictures shared by the Prologue and Chapter Eighteen, where Paul
   tells the crowd on the stairs of the fortress of Antonia what happened to him on that road (Acts 22:6-16). Loaded on demand with
   need('damascus') (list 'damascus' in the chapter's needs, with 'materials' and 'birds') and registered in shared/pwa.js for offline play.
   Every line told over them is the narrator's, in paraphrase with its reference; nobody speaks in them.

   The pictures are ART.pro_road (the plain before Damascus at midday, the city small on the horizon) and ART.pro_judas (a room in the
   house of Judas on the street called Straight). Each is drawn with a state: the Prologue keeps it in G.pro; a chapter may hand its own.
     road:  {x, d, blind}  x: where Saul walks (118 by default), d: how far the men have walked (their stride; 0 stands), blind: led by
                           the hand into Damascus, his eyes open (Acts 9:8), and not walking toward it with his companions
     judas: {ax, afr, hand, sight}  ax: where Ananias stands (38, in the doorway), afr: his walking frame (walkFr), hand: his hands on Saul
                           (Acts 9:17), sight: Saul's head raised and his eyes open (9:18); before it he sits with his head bowed
   API (SHARED.damascus):
     scene(id, st)         a picture for G.scene: id 'road' or 'judas', st its state (G.pro if left out). The road has its birds of
                           the open air (a bird of prey high up, a lark), as the Prologue has them.
     walk(st, o)           walk the men along the road: o {to, ms, blind}; resolves when they have come to x = to. It moves st.x and st.d,
                           and a step is heard as they go (unevenly when Saul is led blind)
     light(ms)             the light from heaven (Acts 9:3; 22:6; 26:13): the screen goes plain white, with no rays, beams or figure,
                           over ms (at least 400; 900 by default, 480 for calm movement), never as a flash. Words told while it is white
                           stand in dark ink without the scroll (index.html, narr). light.out(ms): the white goes to dark, as in the
                           Prologue; light.back(ms): the picture comes back out of the white.
   Saul is drawn with LOOK.saul_young (paulLook(1)): he was a young man then, in every chapter that tells it. */
SHARED.damascus=(()=>{
"use strict";
/* daylight over an open scene: the sky (above hz) stays as it is; the land and the walls lie under a soft fall of light (DAY), brighter
   where the sun reaches and shaded toward the near ground and where things meet it (the Prologue's own, which its other pictures share) */
const DAY='#e8e1d6';
function dayLight(g,hz,fn){lightmap(g,320,DAY,l=>{R(l,0,0,320,hz,'#ffffff');l.fillStyle=lg(l,0,hz,0,hz+22,['#ffffff',DAY]);l.fillRect(0,hz,320,22);fn(l)})}

/* ============ CAST: Saul as a young man (as Chapters One and Two have him, whichever chapter shows these pictures), Ananias, and the
   men who travelled with Saul ============ */
Object.assign(LOOK,{
  saul_young:paulLook(1),
  ananias:{skin:'#b88458',hair:'#4a3a2c',beard:'#4a3a2c',brow:'#3a2a1c',tunic:'#6a7e68',cloak:'#c8b894',belt:'#4a3a24',trim:'#4e604c',long:1,ph:1100},
  pro_m1:{skin:'#b47e52',wrap:'#d2c296',beard:'#2a1a12',brow:'#1a1210',tunic:'#8a6a4a',belt:'#3a2414',trim:'#5a422c',ph:400},
  pro_m2:{skin:'#c08c5c',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,brow:'#2a1a12',tunic:'#7a8a9a',cloak:'#5a4a3c',belt:'#3a2414',ph:1600},
  pro_m3:{skin:'#a87448',wrap:'#b8a47c',beard:'#3a2a1c',brow:'#2a1a12',tunic:'#9a8662',long:1,belt:'#4a3a24',ph:2300}});


/* ---------- Pictures 4 & 7: The road near Damascus at midday ---------- */
ART.pro_road={w:320,q:12,
  /* the sun of midday, high and a little to the left, in front of us: the stones and bushes throw short shadows to the right and toward
     us, and so do the men on the road. The blind walk of Picture 7 is under the same sun. */
  light:{amb:'#ffffff',wallY:90,sun:[5,4,.4]},
  paint(g){const{earth,shadow:softShadow}=SHARED.materials,r=rng(544),SH='#8f95c4';
    /* bright midday sky and heat haze to one horizon at y=84; its blue and the far range drawn a little toward grey (earth) */
    sky(g,320,84,['#4c80c2','#7aa6da','#b2cee8','#e6e4d2'].map(c=>earth(c,.16)));
    cloud(g,74,16,48,7,r);cloud(g,188,12,62,8,r);
    /* Mount Hermon and the Anti-Lebanon range in the distance */
    const mt=x=>22+8*Math.sin(x/43+.4)+4*Math.sin(x/16+1.8)+2*Math.sin(x/7);
    ridge(g,0,320,84,mt,['#8fa2c4','#aab8d0','#c8d0dc'].map(c=>earth(c,.12)));
    for(let x=0;x<190;x+=.5){const h=mt(x);if(h>25)R(g,x,84-h,.5,Math.min(5,(h-25)*.8),'#f6f8fc')}
    ridge(g,0,320,84,x=>9+4*Math.sin(x/24+1)+2*Math.sin(x/9),['#a6b092','#bec4a4']);
    /* the oasis and the walled city of Damascus, small in the distance on the right, sitting on the horizon y=84 */
    for(let i=0;i<28;i++)oval(g,234+i*3.1,82.5-(i%3)*.6,3.5,2.2,i%2?'#587448':'#688454');
    ashlar(g,246,74,56,10,'#d8caa8',r,{bw:6,bh:3,v:.07});
    for(const tx of[244,298]){ashlar(g,tx,70,7,14,'#e0d2b2',r,{bw:4,bh:3,v:.07});R(g,tx,69,7,1,'#f4e8cc')}
    arch(g,268,78,6,6,'#5a4a3a');
    /* the sunlit plain below the horizon */
    g.fillStyle=lg(g,0,84,0,144,['#e2d4ae','#d4c296','#c2ac7e']);g.fillRect(0,84,320,60);
    tex(g,'mott',.32,0,84,320,60,'overlay',1);tex(g,'grain',.12,0,84,320,60,'overlay',.5);
    /* the road to Damascus: wide in the foreground, narrowing to stop just short of the gate at y=85 */
    const L=[],Rt=[],cx=k=>26+245*k+14*Math.sin(k*3.1),cy=k=>132-47*k;
    for(let i=0;i<=32;i++){const k=i/32,hw=1.8+16*Math.pow(1-k,1.35);L.push(cx(k)-hw,cy(k));Rt.unshift(cx(k)+hw,cy(k)+1.5*(1-k))}
    poly(g,L.concat(Rt),'#eadbc2');
    clipTo(g,()=>poly(g,L.concat(Rt)),()=>{tex(g,'mott',.28,0,84,320,60);ao(g,0,84,320,12,'t',.18,'#8a7652')});
    /* the softer edge where the road's dust meets the plain, on its far side */
    stroke(g,L,'rgba(150,126,90,.2)',.6);
    /* stones and bushes, each on its own soft shadow; the sun is high, so the shadows are short */
    for(const[bx,by,bw]of[[42,102,5],[118,96,4],[210,104,4.5],[278,128,8],[164,136,6.5],[34,138,7]]){
      softShadow(g,bx+.5,by+.6,bw*1.02,bw*.32,.4,'#2e2440');oval(g,bx,by,bw,bw*.45,'#a89878');oval(g,bx-.6,by-.5,bw*.65,bw*.28,'#cabaa0')}
    softShadow(g,87,99.5,7,1.4,.32,'#2e2440');softShadow(g,229,118,9,1.8,.32,'#2e2440');
    foliage(g,86,98,7,3,'#788a56',r,20);foliage(g,228,116,9,3.8,'#6e804e',r,26);
    /* the light of midday: full on the far plain and the road, a little less toward the near ground */
    dayLight(g,84,l=>{comp(l,'source-over',.7,()=>poly(l,L.concat(Rt),'#ffffff'));
      comp(l,'multiply',1,()=>ao(l,0,118,320,26,'b',.26,'#4a4060'))});
    pool(g,160,0,280,120,'#fff8dc',.18,'screen')},
  draw(g,t,S){const st=S||G.pro||{},x=st.x||118,d=st.d||0;
    if(st.blind){
      /* Picture 7: Saul on his feet with his eyes open, led by the hand (both forearms bent and slanting, figures close) */
      const fr=d>0?walkFr(LOOK.saul_young,d,36):0,fr1=d>0?walkFr(LOOK.pro_m1,d,36):0,
        fr2=d>0?walkFr(LOOK.pro_m2,d+7,36):0,fr3=d>0?walkFr(LOOK.pro_m3,d+13,36):0;
      man(g,x-52,121,'pro_m3',1,fr3,null,0,6.5);
      man(g,x-28,125,'pro_m2',1,fr2,null,0,6.5);
      man(g,x,123,'saul_young',1,fr,null,5,6.5,0,0);
      man(g,x+19,123,'pro_m1',1,fr1,null,4,6.5);
    }else{
      /* Picture 4: Saul and the men with him walking on foot toward Damascus, short midday shadows */
      const fr=d>0?walkFr(LOOK.saul_young,d,54):0,fr1=d>0?walkFr(LOOK.pro_m1,d+5,54):0,
        fr2=d>0?walkFr(LOOK.pro_m2,d+11,54):0,fr3=d>0?walkFr(LOOK.pro_m3,d+17,54):0;
      man(g,x-54,120,'pro_m3',1,fr3,null,0,6.5);
      man(g,x-34,125,'pro_m2',1,fr2,null,0,6.5);
      man(g,x-16,119,'pro_m1',1,fr1,null,0,6.5);
      man(g,x+8,123,'saul_young',1,fr,null,0,6.5);
    }},
  front(){}};

/* ---------- Picture 8: A room in Damascus (the house of Judas on the street called Straight) ---------- */
ART.pro_judas={w:320,q:12,
  light:()=>({amb:'#7a7288',wallY:105,wall:[[7,22,105,12],[54,223,105,12],[223,243,105,46],[243,313,105,12]],lamps:[[42,76,120,'#e8cfa0',105,72],[232,48,95,'#d8c4a0',105,36]]}),
  paint(g){const{plank,board,crack,skipCracks,shadow:softShadow,joistAO}=SHARED.materials,r=rng(548),rb=rng(5481),rw=rng(5482),W='#d4c09e',T='#68482c';
    plaster(g,0,0,320,105,W,r,{patch:4,cracks:0,brick:'#a67850',t:.36});skipCracks(r,5);
    /* cracks cut by hand, high on the wall under the ceiling, where they run to no head */
    for(const[x,y,n]of[[88,14,3],[150,13,4],[262,15,3],[304,15,2]])crack(g,x,y,n,rb);
    /* the ceiling seen from below: boards with a quiet grain, the joists running toward us with the boards beside them in their shade,
       the beam along the top of the wall, and the shade under it */
    plank(g,0,0,320,9,'#2c1e14',rw,0);ao(g,0,0,320,6,'t',.45,'#0c0808');
    for(let i=0;i<9;i++){const a=12+i*40,x0=160+(a-160)*1.16,x1=160+(a+7-160)*1.16;joistAO(g,a,x0,7,9,'#0c0808');poly(g,[a,9,a+7,9,x1,0,x0,0],T);
      clipTo(g,()=>poly(g,[a,9,a+7,9,x1,0,x0,0]),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,9,'overlay',.5));
      poly(g,[a+5,9,a+7,9,x1,0,x1-2,0],tint(T,-.4));stroke(g,[a+.25,9,x0+.25,0],tint(T,.22),.5)}
    ao(g,0,6.5,320,2,'b',.28,'#0c0808');board(g,0,8.5,320,3,'#5a3e26',rw);ao(g,0,11.5,320,8,'t',.45,'#2a2030');
    poly(g,[0,0,7,9,7,105,0,113],'#9e8c70');poly(g,[320,0,313,9,313,105,320,113],'#948266');
    /* the shade gathers in the corners where the side walls meet the back wall, and along the foot of the wall */
    ao(g,0,0,7,113,'l',.22,'#2a2030');ao(g,313,0,7,113,'r',.26,'#2a2030');
    ao(g,7,11.5,7,94,'l',.26,'#2a2030');ao(g,306,11.5,7,94,'r',.28,'#2a2030');ao(g,7,97,306,8,'b',.24,'#2a2030');
    pave(g,0,105,320,144,'#b09c7e',r,{vx:160,vy:70,rows:5,step:36,v:.09,t:.3});ao(g,0,105,320,7,'t',.45,'#2a2030');ao(g,0,105,320,2.6,'t',.3,'#1a1420');
    /* open doorway on the left: sunlit courtyard wall of Judas's house closing the view */
    R(g,18,32,40,74,'#8e785c');R(g,22,36,32,70,'#e8d8b4');
    plaster(g,22,36,32,54,'#eadbc0',r,{patch:0,cracks:0,t:.36});skipCracks(r,2);R(g,22,90,32,16,'#cdbca0');
    ao(g,22,88,32,3,'b',.18,'#5a4838');
    board(g,16,29,44,3.5,'#5a3e26',rw);ao(g,22,36,32,6,'t',.35);ao(g,18,32,4,74,'r',.2,'#2a2030');ao(g,54,32,4,74,'l',.16,'#2a2030');
    /* high window on the right wall: the deep reveal, its top in shade, and a sill of wood */
    R(g,220,24,26,22,'#9e8a6c');R(g,223,27,20,16,'#dce6ee');ao(g,223,27,20,3,'t',.3,'#3a3450');
    board(g,219,45.5,28,1.8,'#7a5a3a',rw);
    /* low table with untouched bread and a water jug (three days he neither ate nor drank) */
    softShadow(g,133,111.4,22,2,.42,'#181220');R(g,114,103,36,8,'rgba(20,12,8,.3)');ao(g,114,103,36,4,'t',.3,'#0c0808');
    board(g,115,103,3,9,'#5a3c22',rw,1);board(g,146,103,3,9,'#5a3c22',rw,1);
    board(g,111,99,44,4,'#8a6238',rw);oval(g,124,98,5.5,2,'#c89c58');oval(g,123.5,97.5,4.5,1.5,'#e2ba78');
    vessel(g,139,99,2.8,7,'#9a5430','jug',{noShadow:1});
    /* the stool where Saul sits */
    softShadow(g,200,121,10,2,.45);
    stroke(g,[195,112,193.5,120],'#3e2a1a',1.6);stroke(g,[205,112,206.5,120],'#3e2a1a',1.6);
    board(g,192,109,16,3,'#7a5632',rw);
    /* daylight streaming through the open doorway and the high window: the floor before the door and the table it reaches, the patch
       where the window's fall lands, the stool in it; the ceiling, the corners and the near floor in the room's own shade. Every pool
       near a head is wide or long and low, so that none reads as a ring round it. */
    lightmap(g,320,'#585068',l=>{
      pool(l,38,72,110,80,'#ffdfb0',.9);pool(l,64,116,95,28,'#ffe6be',.65);
      pool(l,232,36,75,60,'#e8f0ff',.65);pool(l,196,106,85,54,'#d8c8b0',.55);
      pool(l,132,101,34,5,'#ffdcb0',.3);pool(l,194,125,26,4,'#e8eeff',.35);pool(l,38,108,28,6,'#fff0d0',.35);
      comp(l,'lighter',.32,()=>poly(l,[223,43,243,43,212,126,174,126],lg(l,0,43,0,126,['rgba(235,242,255,.55)','rgba(235,242,255,.1)'])));
      comp(l,'multiply',1,()=>{ao(l,268,0,52,144,'r',.45,'#1a142c');ao(l,0,128,320,16,'b',.35,'#1a142c');ao(l,0,0,320,20,'t',.16,'#1a142c')})})},
  draw(g,t,S){const st=S||G.pro||{},ax=st.ax||38,hand=st.hand?2:0,bow=st.sight?0:1,bl=st.sight?0:1;
    man(g,ax,118,'ananias',1,st.afr||0,lightAt('pro_judas',ax,118),hand,8.5);
    man(g,200,121,'saul_young',-1,-1,lightAt('pro_judas',200,121),0,8,bow,bl)},
  front(){}};

function scene(id,st){const k=id==='judas'?'pro_judas':'pro_road';
  return(g,t)=>{backdrop(g,k,0);ART[k].draw(g,t,st);if(k==='pro_road'&&SHARED.birds)SHARED.birds.draw(g,t,'pro_road',{prey:[70,36,150,14],lark:[110,92,26]})}}
async function walk(st,o){const x0=st.x||118,d0=st.d||0,to=o.to!=null?o.to:x0+42,ms=G.speedAll>200?120:o.ms||4200;st.blind=o.blind?1:0;
  const steps=o.blind?[0,520,1180,1760,2480,3120,3850,4520,5280].filter(m=>m<ms).map(m=>setTimeout(()=>SFX.step(),m)):[],iv=o.blind?0:setInterval(()=>{if(!G.white)SFX.step()},420);
  try{await tween(ms,k=>{st.x=x0+(to-x0)*k;st.d=d0+Math.abs(to-x0)*k})}finally{clearInterval(iv);steps.forEach(clearTimeout)}}
function light(ms){return fade(1,Math.max(400,ms||(OPTS.mov?480:900)),1)}
light.out=ms=>fade(1,Math.max(360,ms||360),0);
light.back=ms=>fade(0,Math.max(400,ms||600),1);
return{scene,walk,light,dayLight,DAY}})();
