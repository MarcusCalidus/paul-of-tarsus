/* Paul of Tarsus: level data for Chapter Four, "Sent Out to Cyprus".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   It is the first hub chapter: Seleucia, Salamis and Paphos are places on the travel map (shared/map.js), and the way out of a
   town opens the map. A place opens when the story reaches it, and the road never leads back. */
LEVEL(4,()=>{
"use strict";
const{plank:plank4,board:board4,crack:crack4,skipCracks:skipCracks4,shadow:shadow4,earth:earth4,joistAO:joistAO4}=SHARED.materials;
/* joists4: the ceiling seen from below at its edge, as in Chapter One's workshop: dark boards, and the joists running toward us in
   perspective from the wall plate (y = U) to the top of the picture, each with the soft shade of the boards beside it. They stand in pairs
   about the middle, so that none rises upright from the plate, and no square beam end sits on it to make a T; the room lays the plate over
   their feet. rj: a seed of its own. burn4: the draws that board() took for the square beam ends the room used to show, taken on a scrap
   canvas, so that everything the room draws after them stays where it was */
function joists4(g,U,step,rj,c){c=c||{};const T=c.joist||'#6b4a2e',k=1.17;
  if(c.boards!==0){plank4(g,0,0,320,U,c.boards||'#33251a',rj,0);ao(g,0,0,320,U*.7,'t',.45,'#0c0808')}
  let a=160+step/2-3.5;while(a>-step)a-=step;
  for(;a<330;a+=step){const x0=160+(a-160)*k,x1=160+(a+7-160)*k,P=[a,U,a+7,U,x1,0,x0,0];joistAO4(g,a,x0,7,U,'#0c0808');poly(g,P,T);
    clipTo(g,()=>poly(g,P),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,U,'overlay',.5));
    poly(g,[a+5,U,a+7,U,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,U,x0+.25,0],tint(T,.25),.5)}
  ao(g,0,U-2.5,320,2.5,'b',.3,'#0c0808')}
function burn4(r,x0,step,w,h){const d=mk(4,4)[1];for(let i=x0;i<320;i+=step)board4(d,i,0,w,h,'#5a4226',r,1)}

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A sea crossing in E Aeolian: a harp rocks in three, three and two like a hull on a swell, over a slow bass and a frame drum.
   In the synagogue and at sea (mood "calm") a ney takes the tune in the second half; in the harbors (mood "hope") a reed pipe plays it
   throughout, with a shaker. Before the proconsul (mood "tense") nothing is held: the low string plucks the keynote in the same
   threes, threes and twos and leans on the note above it, the drum ticks with it and almost stops every fourth bar, and the ney
   begins the tune and breaks off a note before it comes home. */
const _=null,
 TUNE=[[[0,4,4],[4,5,2],[6,4,2],[8,2,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,4,2],[6,5,2],[8,6,4],[12,4,4]],[[0,5,4],[4,4,4],[8,4,8]],
  [[0,7,4],[4,6,2],[6,5,2],[8,4,4],[12,2,4]],[[0,3,4],[4,4,2],[6,5,2],[8,4,8]],[[0,2,2],[2,3,2],[4,4,2],[6,6,2],[8,7,4],[12,6,4]],[[0,4,4],[4,2,4],[8,0,8]]],
 MUSIC={dt:.17,root:52,scale:[0,2,3,5,7,8,10],bars:16,group:[3,3,2],tracks:[
  {inst:'harp',moods:['calm','hope'],prog:'AABAACDA',len:3,seq:{A:[0,_,_,2,_,_,4,_,7,_,_,4,_,_,2,_],B:[-1,_,_,1,_,_,3,_,6,_,_,3,_,_,1,_],C:[2,_,_,4,_,_,6,_,9,_,_,6,_,_,4,_],D:[-2,_,_,0,_,_,2,_,5,_,_,2,_,_,0,_]}},
  {inst:'bass',moods:['calm','hope'],prog:'AABAACDA',len:5,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-8,_,_,_,_,_,_,_,-4,_,_,_,_,_,_,_],C:[-5,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],D:[-9,_,_,_,_,_,_,_,-5,_,_,_,_,_,-4,_]}},
  {drum:1,moods:['calm'],seq:{A:'d..k..t.d..k..t.'},vol:.6},
  {drum:1,moods:['hope'],prog:'AB',seq:{A:'d.sk.st.d.sk.st.',B:'d.sk.st.d.skbst.'}},
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,vol:.9,seq:{
    A:[-7,_,_,-7,_,_,-6,_,-7,_,_,-7,_,_,_,_],B:[-7,_,_,-7,_,_,-6,_,-6,_,_,-7,_,_,-10,_],C:[-7,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',seq:{A:'d..k..k.d..k..k.',B:'d..k..k.d..k.kk.',C:'d...............'},vol:.6},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:.8,lines:[TUNE[0],TUNE[1].slice(0,-1),[],[],TUNE[4],TUNE[5].slice(0,2),[],[]]},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
const SH='#8f95c8';
/* The skies and the sea of this chapter, drawn a little toward their own grey (earth4), so that they sit with the stone, the plaster
   and the timber of the harbors */
const SKY4=['#3f7cc6','#6ea4dc','#a6c8e6','#dfe9ec'].map(c=>earth4(c,.14)),SKY4S=['#3a78c8','#66a0dc','#9cc4ea','#d6e6ee'].map(c=>earth4(c,.14)),
  SEA4=['#a9cbd6','#62a0bc','#3f80a6','#2f6a92','#245a80'].map(c=>earth4(c,.12));
/* What is seen through a gate of Seleucia or of Salamis: hills, and the road running on. Each gate adds the horizon and the sky of its own scene. */
const GATE4={far:['#9aa890','#b0ba98'],near:['#86a070','#98b082'],land:'#c2c494',road:'#ead9ae'};
/* shadowBox4: the soft shadow under a table, a bench or a platform, laid in three passes of alpha like shadow4: a wide faint one, the
   body, and a darker core under the middle */
function shadowBox4(g,x,y,w,h,a,c){c=c||'#28203c';R(g,x-1.6,y-.4,w+3.2,h+.8,rgba(c,a*.3));R(g,x,y,w,h,rgba(c,a*.4));R(g,x+w*.12,y+h*.15,w*.76,h*.6,rgba(c,a*.45))}
/* a strip of sea between y0 and y1, lighter toward the horizon, with glints */
function seaArt(g,x,y0,w,y1,r,st){g.fillStyle=lg(g,0,y0,0,y1,st||SEA4);g.fillRect(x,y0,w,y1-y0);
  for(let i=0;i<w*.6;i++){const k=r()*r(),sy=y0+1+k*(y1-y0-2);R(g,x+r()*w,sy,2+k*6+r()*4,.5,r()<.55?'rgba(214,238,244,.5)':'rgba(20,50,84,.35)')}}
/* a roll of bedding or cloth lying on the ground: x,y the left end, w long */
function roll(g,x,y,w,hh,c){shadow4(g,x+w/2+2,y+hh+.4,w/2+3,1.4,.4,'#28203c');clothRoll(g,x,y+hh,w,hh,c,{k:.32})}
/* the travelers' baggage, which John Mark looks after: two bed rolls, a leather bag, a food bag and a water flask */
function baggage(g,x,y){shadow4(g,x+26.6,y,6.4,1.3,.36,'#28203c');roll(g,x,y-5,17,5,'#8a5a4a');roll(g,x+3,y-9.6,15,4.6,'#6f7a5a');
  g.fillStyle=lg(g,x+20,0,x+31,0,['#a8703e','#8a5830','#5a3618']);g.beginPath();g.ellipse(x+25.6,y-4.4,5.6,4.6,0,0,6.2832);g.fill();R(g,x+23,y-10,5.2,2.6,'#7a4e28');R(g,x+22.4,y-8,6.4,1,'#3e2612');
  sack(g,x+36,y,3.6,6.4,'#cdbb8c');vessel(g,x+43,y,2.2,6.6,'#7a5a3a','jug',{noShadow:1})}
/* The ship for Cyprus: a round-bellied merchantman, bow to the left, with a plain curved sternpost and no figurehead.
   In harbor the yard is lowered abaft the mast with the sail furled on it (meeting the mast at a corner and never crossing it), and
   the mast stands bare between its stays. Under sail (o.sail) the mast stops at the yard, so that the two never make a cross.
   o.plank: the gangplank to the quay; o.tent: our shelter on the foredeck; o.figs: a painter for the people on deck, who stand
   behind the rail. */
function ship4Opts(o){
  const hb=o.plank?102:101;
  return{seed:409,dir:-1,view:'full',x0:4,x1:208,yBot:hb,yWaist:76,bowRise:16,bowSpan:44,bowPow:2.2,sternRise:22,sternSpan:46,sternPow:2.2,
    palette:o.sail?'shaded':'lit',gradY0:54,gradY1:hb,
    mast:{x:96,y0:13.4,y1:77,w:3.2,stays:[[97.5,13.4,8,60],[97.5,13.4,203,56]],
      sail:o.sail?'full':'none',yardX0:50,yardX1:146,yardY0:15.4,yardY1:11,sailH:44,sailBow:5.5,sailLeeIn:1,seams:8},
    cabin:{x:160,y:63.6,w:31,h:13.4,c:'#7a5632',hi:'#b88a52',roof:'#4a3220'},
    tent:o.tent?{x0:22,x1:84,rx0:34,rx1:72,ry:62.6,by:77}:null,
    sacks:!o.tent?[[34,3.4,'#b9a67c'],[46,4.2,'#c6b388'],[58,3.6,'#a8956c'],[70,4.4,'#c4b186'],[82,3.2,'#b09c72']]:null,
    pitch:{f0:.535,color:'rgba(28,16,10,.44)'},
    wale:{f0:.12,f1:.21,color:'#a8482c'},waleWear:{count:20,c1:'#8c6438',c2:'#c86a48'},
    lowerWale:{f0:.47,f1:.535,color:'#382416',hi:'#b88a52'},
    beams:{f:.32,x0:24,x1:190,step:18,w:1.9,h:1.9,color:'#24160e',hi:'#d4a66a'},
    scuppers:[44,88,136],
    sunGlow:o.sail?{comp:'screen',a:.3,x0:2,x1:54,stops:['rgba(255,210,140,1)','rgba(255,210,140,0)'],rx:0,ry:52,rw:58,rh:52}
      :{comp:'screen',a:.22,x0:110,x1:208,stops:['rgba(255,232,180,0)','rgba(255,232,180,1)'],rx:110,ry:52,rw:102,rh:52},
    turnShade:o.sail?{comp:'multiply',a:.34,x0:70,x1:208,stops:['rgba(90,82,138,0)','rgba(90,82,138,1)'],rx:68,ry:52,rw:144,rh:52}
      :{comp:'multiply',a:.26,x0:2,x1:90,stops:['rgba(96,92,140,1)','rgba(96,92,140,0)'],rx:0,ry:52,rw:92,rh:52},
    rail:{x0:6,x1:206,h:1.6,color:'#9e7442',hi:'#f0cc90'},
    stem:{thick:3,sweep:10,rimCol:'#f0d4a0',capCol:'#d8ac70'},
    stern:{thick:3.2,sweep:11,rimCol:'#e8c890',capCol:'#c89a60'},
    furledYard:!o.sail?{x0:99.6,x1:154,yardX0:99.4,yardX1:157.5,bays:5,th0:4.6,th1:2.8,belly:.85}:null,
    rudders:[
      {loom:[186,70,188.4,70,196,98,192,98],blade:[192,96,196.4,96,198,107,193,107]},
      {loom:[194,66,197,66,207,98,202,98],blade:[202,96,207.4,96,210,108,204,108],hi:[194.4,66.4,204.4,98]}]};
}
function ship(g,X,Y,t,o){o=o||{};const y=Y+Math.round(Math.sin(t/900)*2)/2,
  body=()=>{
    const preKey='ch4-pre-'+(o.sail?1:0)+(o.tent?1:0),
      pc=SHARED.ship.cached(preKey,224,112,cg=>{cg.translate(4,0);SHARED.ship.paint(cg,{...ship4Opts(o),layer:'pre'})});
    g.drawImage(pc,hp(X-4),hp(y),224,112);
    if(o.figs)o.figs(X,y);
    const hullKey='ch4-hull-'+(o.sail?1:0)+(o.plank?1:0),
      hc=SHARED.ship.cached(hullKey,224,112,cg=>{cg.translate(4,0);SHARED.ship.paint(cg,{...ship4Opts(o),layer:'hull'})});
    g.drawImage(hc,hp(X-4),hp(y),224,112);
  };
  if(o.plank){inRect(g,0,0,480,100,body);
    SHARED.ship.gangplank(g,{x0:X+40,y0:77+y,x1:X+21,y1:104.5,w0:9,w1:10,sunSide:'r'})}
  else body();
  if(o.wake)for(let i=0;i<8;i++)R(g,X+214+i*9+(t/60%9),97.6+(i%2)+y,7-i*.6,.6,'#e6f2f4')}
/* ---------- Seleucia: the harbor of Antioch, in the morning ---------- */
function post4(g,x){g.fillStyle=lg(g,x-1,0,x+7,0,['#8a7a66','#5a4c40','#3a302c']);g.fillRect(x,96,6,8);R(g,x-1,94.6,8,2,'#6a5a4a');R(g,x-1,94.6,8,.6,'#e8d8b8')}
ART.seleucia={w:480,fp:1.3,q:12,
 paint(g){const r=rng(211),ST='#d9cba6';
  sky(g,480,64,SKY4);cloud(g,330,12,64,9,r);cloud(g,190,22,40,6,r);cloud(g,440,26,34,5,r);
  /* the mountain above the town, falling steeply to the sea */
  const mt=x=>Math.max(0,46-x*.21+5*Math.sin(x/23)+3*Math.sin(x/9+1));ridge(g,0,222,60,mt,['#7f94a8','#98aab0','#aebaae']);
  for(let i=0;i<70;i++){const tx=r()*200,ty=60-r()*mt(tx)*.8;oval(g,tx,ty,1.4+r()*1.6,.8+r()*.5,r()<.5?'#6f8a6a':'#8aa07c')}
  /* a far headland across the bay, low and hazy on the horizon behind the ship, so that her mast never stands across the bare line of
     the sea; where the mast crosses it, the headland falls away steeply */
  ridge(g,300,480,60,x=>Math.min(1,(x-300)/24)*(7.4*Math.exp(-Math.pow((x-351)/9,2))+2.2*Math.exp(-Math.pow((x-392)/40,2))+.8+.3*Math.sin(x/5)),[earth4('#94a8b8',.12),earth4('#a8b8c2',.12)]);
  comp(g,'screen',.25,()=>R(g,0,24,480,38,'#c8d8ee'));
  /* the sea, and the mole that shelters the basin */
  seaArt(g,0,60,480,104,r);
  ashlar(g,128,55,166,6,'#c6b592',r,{bw:9,bh:3,v:.08,t:.25});for(let i=128;i<288;i+=11){R(g,i,52.8,6.4,2.4,'#c6b592');R(g,i,52.8,6.4,.5,'#efe0b8')}R(g,128,60.6,166,1.2,'#5f6470');
  ashlar(g,286,43,12,18,'#d2c19c',r,{bw:6,bh:3.4,v:.08,t:.25});R(g,284.5,41,15,2.4,'#e8d9b4');R(g,286,43,2.4,18,'rgba(60,50,90,.3)');
  /* the town wall and the gate to the Antioch road */
  ashlar(g,0,24,112,80,ST,r,{bw:13,bh:6.4,v:.09,t:.24});for(let i=0;i<112;i+=9){R(g,i,19.6,5.6,4.4,ST);R(g,i,19.6,5.6,.5,'#f4e8c8')}R(g,0,23.6,112,1,'#a8987a');
  /* the shade under the wall walk, a few hairline cracks high in the stones where they run to no head, and the shade gathering
     at the wall's foot and in its corner */
  ao(g,0,24.6,112,4,'t',.2,'#4a3a60');{const rb=rng(2111);for(const[x,y,n]of[[10,29,3],[71,27,3],[104,31,3]])crack4(g,x,y,n,rb,.8)}
  ao(g,0,92,112,12,'b',.16,'#4a3a60');ao(g,102,24,10,80,'r',.16,'#4a3a60');
  poly(g,[112,19.6,119,23,119,104,112,104],'#a9a2b4');ao(g,112,23,7,81,'l',.22,'#3a3058');
  arch(g,22,52,40,52,'#c2b28c');gateView(g,24,54,36,50,{...GATE4,hz:60,sky:[64,SKY4],rise:3});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,42+Math.cos(a)*20-.3,72+Math.sin(a)*20-1,.6,2.6,'#a8987a')}
  /* the reveal of the gate keeps its own shade at the crown and down the side away from the sun */
  clipTo(g,()=>arch(g,22,52,40,52),()=>{ao(g,22,52,40,8,'t',.22,'#3a3058');ao(g,22,52,3,52,'l',.2,'#3a3058')});
  windowArt(g,84,42,9,10,ST,{bars:2});
  /* the quay */
  pave(g,0,103,480,144,'#cdbd98',r,{vx:210,vy:58,rows:5,step:36,v:.09});ao(g,0,103,119,5,'t',.3,'#4a3a60');
  R(g,119,100,361,3.4,'#a8987a');R(g,119,100,361,.6,'#f0e0bc');R(g,119,103.2,361,.8,'#5a5258');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,112,104,128,112,0,114],SH,.6);
  /* mooring posts */
  for(const x of[236,444]){shadow4(g,x+3,104.4,4.6,1.2,.55,'#28203c');shade(g,[x+6,104,x+9,104,x+17,108.6,x+12,108.6],SH,.6);post4(g,x)}
  /* cargo for Cyprus: wine jars, sacks of grain */
  shade(g,[128,106,200,106,210,112,138,112],SH,.5);for(let i=0;i<4;i++){shadow4(g,136+i*9.5,106,5.4,1.2,.4,'#28203c');vessel(g,134+i*9.5,106,4.2,15-(i%2),['#a05a34','#8a4a2a','#b0683c','#96502e'][i],'amph',{noShadow:1})}
  shadow4(g,186,107,14,1.6,.3,'#28203c');sack(g,177,106,7,11,'#cdbb8c');sack(g,190,107,8,13,'#d8c698');sack(g,184,97.4,6,8.6,'#c4b282');
  /* a coil of tarred cord beside the mooring post */
  shadow4(g,216,106,10,1.6,.45,'#28203c');for(let i=0;i<4;i++){g.strokeStyle=i%2?'#2e2620':'#463a2e';g.lineWidth=2.2;g.beginPath();g.ellipse(215,104.6-i*1.7,7.6-i*.5,2,0,0,6.2832);g.stroke()}stroke(g,[221,100,226,102.6,229,105.6],'#3a3028',.9);
  baggage(g,44,108);
  /* light: the morning sun stands over the basin at the right; it falls full on the ship, the open quay and the cargo, warms the
     face of the town wall a little less, and the cargo throws a little of it back onto the stones. The near edge of the quay and the
     foot of the wall lie in the air's own cool shade. */
  lightmap(g,480,'#e6dfd8',l=>{pool(l,340,44,250,96,'#ffffff',.75);pool(l,300,118,190,26,'#fff4e0',.45);pool(l,60,66,74,46,'#fff0dc',.32);
    pool(l,170,109,44,7,'#ffe6c4',.3);pool(l,216,108,16,4,'#ffe6c4',.2);
    comp(l,'multiply',1,()=>{ao(l,0,126,480,18,'b',.16,'#3a3050');ao(l,0,103,128,10,'t',.14,'#3a3050');ao(l,0,0,480,8,'t',.08,'#3a3050')})});
  pool(g,330,0,300,150,'#fff0c0',.14,'screen');ao(g,0,0,110,144,'l',.1,'#2a2050')},
 fore(g){vessel(g,18,152,12,34,'#6a3420','amph',{noShadow:1});sack(g,42,148,10,15,'#a89870');
  for(let i=0;i<4;i++){g.strokeStyle=i%2?'#3a3028':'#52463a';g.lineWidth=3;g.beginPath();g.ellipse(500,139-i*2.6,16-i,4.2,0,0,6.2832);g.stroke()}
  comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g,t){ship(g,262,0,t,{plank:1});post4(g,444)},
 front(){}};
/* ---------- Salamis: the square between the harbor and the synagogue ---------- */
ART.salamis={w:480,fp:1.3,q:12,
 paint(g){const r=rng(233),LS='#e4d9bc',MB='#eee6d2',CU=['#c8743c','#b8632e','#d88a4a','#a85628'];
  sky(g,480,70,SKY4S);cloud(g,140,10,56,8,r);cloud(g,318,15,44,6,r);cloud(g,436,8,34,5,r);
  /* the harbor we landed in: the mole, and our ship at anchor with her sail furled. The low coast running away to the north lies on
     the horizon behind her mast, so that the mast never stands across the bare line of the sea; where the mast crosses it, the coast
     falls away steeply. */
  ridge(g,62,112,60,x=>3.4*Math.exp(-Math.pow((x-87)/6,2))+1.2*Math.exp(-Math.pow((x-74)/12,2))+.8+.25*Math.sin(x/3),[earth4('#9aaebc',.12),earth4('#aebec6',.12)]);
  seaArt(g,0,60,112,104,r);ashlar(g,0,56,62,5,'#c6b592',r,{bw:9,bh:2.6,v:.08,t:.25});R(g,0,60.8,62,1,'#5f6470');
  R(g,91.6,51,1.4,25,'#5a3c22');stroke(g,[92.3,51,74,68.6],'#4a3a2a',.5);stroke(g,[92.3,51,110.6,66.6],'#4a3a2a',.5);poly(g,[80,73,104,72.4,104,75.4,80,76],'#dccfb0');
  poly(g,[72,69,77,68,80,76,105,76,109,67,112,66,112,81,80,81,75,78],'#5e3e24');R(g,77,77.6,35,1,'#a8482c');R(g,72,80.6,40,.8,'rgba(20,40,60,.5)');
  /* our shelter, still rigged on her foredeck before the mast, and the bare feet of a sailor asleep in its shade (the hidden treasure) */
  poly(g,[80.6,76,82.6,73,88.6,73,90.4,76],'#2a211c');R(g,82.6,73,6,.6,'#5a4a3a');R(g,80.6,75.6,9.8,.4,'#17110e');R(g,79.4,75,1.4,1,'#c08a5a');R(g,79.4,75,1.4,.4,'#e0b080');
  R(g,0,97,112,7,'#b8a888');R(g,0,97,112,.6,'#efe0bc');R(g,0,103.2,112,.8,'#5a5258');
  /* roofs of the city behind the marketplace */
  for(const[hx,hy,hw,hh]of[[118,12,30,16],[156,6,24,22],[200,14,34,14],[246,9,26,19]]){R(g,hx,hy,hw,hh,'#e6dcc0');R(g,hx,hy,hw,1.4,'#b8603c');R(g,hx+hw-4,hy+1.4,4,hh,'#b9b4b8');R(g,hx+hw*.3,hy+5,3,5,'#7a6c58')}
  cypress(g,190,28,15);cypress(g,240,28,12);cypress(g,282,28,16);comp(g,'screen',.2,()=>R(g,112,0,190,28,'#c8d8ee'));
  /* the stoa of the marketplace: a tiled roof on stone columns, shops in its shade */
  for(let i=112;i<300;i+=5.5){R(g,i,26,5,8,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,26,5,.7,'#e08a60');R(g,i+4.5,26,.6,8,'#7a3620')}
  g.fillStyle=lg(g,0,34,0,40.5,['#fdf8ea','#e8dfc8','#c4bca6']);g.fillRect(112,34,188,6.5);for(let i=114;i<300;i+=4)R(g,i,37.4,2,1.6,'#cfc6b0');
  plaster(g,112,40.5,188,63.5,'#b8ac92',r,{patch:3,cracks:0,brick:'#8a7a62',t:.3});skipCracks4(r,4);
  /* hairline cracks set by hand, high on the piers between the arches, where they run to no head */
  {const rb=rng(2331);for(const[x,y,n]of[[157,43,3],[217,44,3],[268,43,3]])crack4(g,x,y,n,rb,.8)}comp(g,'multiply',.75,()=>R(g,112,40.5,188,63.5,'#a8a8cc'));
  for(let x=120;x<290;x+=56){R(g,x-2.5,53.5,25,50.5,'#8a8296');arch(g,x,56,20,48,'#1e1820');R(g,x+2,82,16,22,'rgba(90,70,60,.5)');ao(g,x,56,20,14,'t',.6)}
  for(let x=114;x<300;x+=28){shade(g,[x+7,104,x+12,104,x+20,108,x+13,108],SH,.6);g.fillStyle=lg(g,x,0,x+7,0,['#cbc2ac',MB,'#fffbee','#dbd2bc','#aaa4a0']);g.fillRect(x,42.5,7,59);
    for(let j=0;j<3;j++)R(g,x+1.6+j*1.8,44,.5,56,'rgba(120,112,104,.28)');R(g,x-1.2,40.5,9.4,2.6,MB);R(g,x-1.2,42.8,9.4,.6,'#a8a094');R(g,x-1.2,100.4,9.4,3.6,'#dfd6c0');R(g,x-1.2,100.4,9.4,.6,'#fffbee')}
  /* the coppersmith's stall: Cyprus copper, beaten into pots and pans. It stands before the colonnade, and a hanging of undyed cloth
     closes its back from the beam to the paving, so that no column runs down behind the table and across it; its folds are broad
     and soft and run one way. Each pot hangs from the beam by two cords that part as they rise. */
  {const rc=rng(2332);inRect(g,154.4,52.4,76.6,51.6,()=>{for(let i=0;i<77;i+=6.4){const c=tint('#968b7c',(rc()-.5)*.08);g.fillStyle=lg(g,154.4+i,0,154.4+i+6.4,0,[tint(c,.07),c,tint(c,-.1)]);g.fillRect(154.4+i,52.4,6.4,51.6)}
    tex(g,'vert',.12,154.4,52.4,76.6,51.6,'overlay',.5);ao(g,154.4,52.4,76.6,8,'t',.3,'#2a2030');ao(g,154.4,90,76.6,14,'b',.3,'#2a2030')})}
  const rw=rng(2333);
  shade(g,[150,104,236,104,244,112,158,112],SH,.55);board4(g,152,50,2.4,56,'#6a4e2c',rw,1);board4(g,231,50,2.4,56,'#6a4e2c',rw,1);board4(g,150,52.4,86,2,'#7a5c36',rw);awning(g,149,43,88,9,earth4('#3f6a8a',.2),'#e6dcc4',8);
  [162,174,188,203,217].forEach((x,i)=>{stroke(g,[x-.6,54.4,x+.5,58],'#5a4226',.5);stroke(g,[x+1.6,54.4,x+.5,58],'#5a4226',.5);const c=CU[i%4],rr=3.4+(i%2);g.fillStyle=rg(g,x-1,60+rr-1.5,rr*1.6,[tint(c,.45),c,tint(c,-.45)]);g.beginPath();g.arc(x+.5,58+rr,rr,0,6.2832);g.fill()});
  shadowBox4(g,160,96,66,9,.5);ao(g,157.5,92.4,69,4,'t',.3,'#1a1420');board4(g,160.6,94,3,11.5,'#6a4e2c',rw,1);board4(g,220,94,3,11.5,'#6a4e2c',rw,1);board4(g,157.5,88,69,4.4,'#96703e',rw);R(g,157.5,92,69,1.2,'#5a4226');
  shadow4(g,162,105.4,3,.8,.4,'#28203c');shadow4(g,221.5,105.4,3,.8,.4,'#28203c');
  vessel(g,166,88,4,8,CU[0],'jug',{noShadow:1});vessel(g,178,88,5.6,6,CU[2],'bowl',{noShadow:1});vessel(g,191,88,4.2,10,CU[1],'jar',{noShadow:1});vessel(g,204,88,5,5,CU[3],'bowl',{noShadow:1});vessel(g,216,88,3.6,9,CU[2],'amph',{noShadow:1});
  for(const x of[166,178,191,204,216])R(g,x-1.6,82.4,1,2.4,'rgba(255,236,200,.7)');
  /* the synagogue: plain dressed stone, two steps and a door */
  house(g,304,28,126,76,LS,r,{stone:{bw:12,bh:6,v:.07,t:.3},beams:0});windowArt(g,318,40,10,10,LS,{bars:2});windowArt(g,406,40,10,10,LS,{bars:2});
  R(g,343,52,44,5.4,'#f1e8d0');R(g,343,52,44,.6,'#fffbee');R(g,343,57,44,.8,'#a59c86');R(g,346,57.8,38,46.2,'#d2c7aa');doorArt(g,350,60,30,44,'#6a4a2c',r,{bands:[]});ao(g,346,57.8,38,6,'t',.3,'#2a2030');
  R(g,340,102,50,2.4,'#e6dcc2');R(g,340,102,50,.6,'#fffbee');R(g,336,104.2,58,2.6,'#dcd1b6');R(g,336,104.2,58,.6,'#fbf3dc');R(g,336,106.6,58,.8,'rgba(60,50,90,.4)');
  shadowBox4(g,396,98.6,28,5.4,.4);R(g,396,95,28,3,'#d8cdb2');R(g,396,95,28,.6,'#fbf3dc');R(g,398,98,3.4,6,'#bdb298');R(g,418.6,98,3.4,6,'#bdb298');
  shadow4(g,331,106,7.4,1.5,.42,'#28203c');vessel(g,328,106,5.6,17,'#a05a34','pithos',{noShadow:1});shade(g,[304,104,336,104,330,110,304,110],SH,.4);
  /* the west gate, and the road across the island */
  ashlar(g,434,22,46,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=434;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,434,21.6,46,1,'#a8987a');poly(g,[434,17.6,429,21,429,104,434,104],'#a8a0b0');
  arch(g,440,54,34,50,'#c2b28c');gateView(g,442,56,30,48,{...GATE4,hz:62,sky:[70,SKY4S],rise:3});for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,457+Math.cos(a)*17-.3,71+Math.sin(a)*17-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#ddd2b8',r,{vx:250,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,112,103,368,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[112,104,300,104,306,108,118,108],SH,.4);shade(g,[429,104,434,104,448,110,436,110],SH,.6);
  /* light: the sun stands high over the square; it falls full on the paving and the face of the synagogue, while the stoa keeps
     its shops in shade and the shade gathers deepest under its roof and in the arches. The copper throws a warm glint onto the
     table, and the near edge of the square lies in the air's cool shade. */
  lightmap(g,480,'#e6dfd8',l=>{pool(l,250,60,300,110,'#ffffff',.6);pool(l,368,74,80,46,'#fff4e0',.4);pool(l,250,122,230,24,'#fff4e0',.42);
    pool(l,192,90,40,8,'#ffd8a8',.3);
    comp(l,'multiply',1,()=>{ao(l,112,40.5,188,10,'t',.18,'#3a3050');ao(l,0,126,480,18,'b',.16,'#3a3050');ao(l,0,0,480,8,'t',.08,'#3a3050');
      ao(l,296,28,8,76,'r',.12,'#3a3050')})});
  pool(g,200,0,300,160,'#fff0c0',.14,'screen');ao(g,360,0,120,144,'r',.08,'#2a2050')},
 fore(g){const r=rng(234);/* the market spills to the street's edge: baskets of figs and pomegranates, a jar, a sack */
  for(const[bx,bw,bh]of[[46,14,12],[76,10,9]]){vessel(g,bx,148,bw,bh,'#6a5230','bowl',{noShadow:1});for(let i=0;i<12;i++)oval(g,bx-bw+3+r()*(bw*2-6),148-bh-r()*2.4,1.8,1.4,r()<.5?'#a8503a':'#6a3458')}
  vessel(g,506,152,10,30,'#5a2e1e','amph',{noShadow:1});sack(g,480,148,9,13,'#a89870');comp(g,'source-atop',.4,()=>R(g,0,0,530,150,'#34305a'))},
 draw(g){if(MK.room==='salamis')depth(MK.y-13,()=>baggage(g,MK.x-52,MK.y-13))},
 front(){}};
/* ---------- Salamis: inside the synagogue ---------- */
ART.synagogue={w:320,q:12,
 light:()=>({amb:'#dccbb8',wallY:103,wall:[[0,320,103,44]],lamps:[[118,60,44,'#5a3a14',103,60.6],[202,60,44,'#5a3a14',103,60.6]]}),
 paint(g){const r=rng(251),W='#e2d4b4',ST='#cfc3a6',rw=rng(2511);
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:0,brick:'#b89468',t:.36});skipCracks4(r,5);
  /* hairline cracks set by hand, high on the wall between the windows, where they run to no head */
  {const rb=rng(2512);for(const[x,y,n]of[[30,14,3],[150,13,3],[176,16,2],[290,14,3]])crack4(g,x,y,n,rb,.85)}
  /* the ceiling at its edge, its joists running toward us, and the wall plate they rest on */
  joists4(g,7.5,36,rng(2513));burn4(rw,8,28,5,7);
  board4(g,0,7,320,2.4,'#6a4e2c',rw);ao(g,0,9.4,320,10,'t',.4,'#2a2030');
  /* the shade gathers at both ends of the long wall and along its foot */
  ao(g,0,9.4,10,94.6,'l',.2,'#2a2030');ao(g,310,9.4,10,94.6,'r',.2,'#2a2030');ao(g,0,95,320,8,'b',.2,'#2a2030');
  /* two high windows, and two niches for the lamps */
  for(const x of[70,236])windowArt(g,x,24,14,18,W,{dark:'#bfe0f4',bars:2,wood:'#6a4e2c'});
  for(const x of[112,196]){arch(g,x-1,47,14,18,tint(W,-.3));arch(g,x,48,12,17,'#3a2c22');R(g,x-2,64.6,16,1.6,tint(W,.15));R(g,x-2,66.2,16,.6,tint(W,-.35));
    R(g,x+3,62,6,2.4,'#b8733c');R(g,x+3,62,6,.6,'#e0a064');R(g,x+8.6,61,2,1.4,'#b8733c')}
  /* the door to the square */
  R(g,5,50,30,54,'#cfc3a6');doorArt(g,8,53,24,51,'#6a4a2c',r,{left:1,bands:[]});ao(g,8,53,24,5,'t',.3,'#1a1420');
  /* the bench along the wall, where the people sit, with the soft shade at its foot */
  const bench=(x,w)=>{R(g,x,88,w,3.4,ST);R(g,x,88,w,.7,'#f0e6cc');R(g,x,91.4,w,12.6,'#b4a88c');R(g,x,91.4,w,1,'rgba(60,50,80,.35)');ao(g,x,91.4,w,4,'t',.22,'#2a2030');
    ao(g,x,99,w,5,'b',.24,'#2a2030');shadowBox4(g,x,102.6,w,2,.36)};
  bench(42,96);bench(286,34);
  /* the seats of the presiding officers, beside the chest and facing the people: two seats of stone, each with an arm at either end,
     so that no upright stands on the middle of a seat */
  for(const[x,w]of[[184,27],[213.6,28.4]]){R(g,x+2,71,w-4,18,'#d6cbb0');R(g,x+2,71,w-4,1,'#f4ead0');ao(g,x+2,72,w-4,5,'t',.14,'#2a2030');bench(x,w);
    for(const ax of[x,x+w-3.4]){R(g,ax,78,3.4,10,'#bdb196');R(g,ax,78,3.4,.8,'#efe4c8')}}
  /* the chest for the scrolls, under its cloth */
  shadowBox4(g,250,100.6,32,3.6,.5);board4(g,252,62,28,40,'#6a4a2c',rw,1);boards(g,254.4,67,23.2,31,5.8,'#8a6238',r);R(g,265.6,67,.8,31,'#3a2414');R(g,252,98,28,4,'#5a3e22');R(g,252,98,28,.6,'#9a7040');
  R(g,263.4,81,1.6,1.6,'#d8b860');R(g,267,81,1.6,1.6,'#d8b860');
  poly(g,[249,60,283,60,284,67.6,278,65.6,272,68.6,266,65.6,260,68.6,254,65.6,248,67.6],'#7a2f3a');R(g,249,60,34,1,'#a8505c');
  /* stone flags, and the platform for the reading with its desk */
  pave(g,0,103,320,144,'#c8b898',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  shadowBox4(g,112,107.6,98,3.4,.5,'#1e1628');clipTo(g,()=>poly(g,[116,98.6,204,98.6,210,103,110,103]),()=>plank4(g,110,98.6,100,4.4,'#a47a48',rw));
  board4(g,110,103,100,5,'#8a6238',rw);R(g,110,103,100,.6,'#c89a5c');
  clipTo(g,()=>poly(g,[150,99,170,99,168,86,152,86]),()=>plank4(g,150,86,20,13,'#6a4a2c',rw,1));R(g,150,97.6,20,1.4,'#4a3220');poly(g,[148.6,86,171.4,86,169.4,82.6,150.6,82.6],'#8a6238');R(g,150.6,82.6,18.8,.6,'#c89a5c');
  R(g,153.4,83.2,13.2,2.2,'#ecdcb0');R(g,152.2,82.8,1.8,3,'#8a5a2c');R(g,166,82.8,1.8,3,'#8a5a2c');
  /* daylight from the windows, lamplight from the niches */
  lightmap(g,320,'#a09488',l=>{for(const x of[77,243]){pool(l,x,33,24,26,'#fff4d8',1);l.fillStyle=lg(l,0,42,0,140,['rgba(255,240,200,.45)','rgba(255,240,200,0)']);poly(l,[x-7,42,x+7,42,x+(x<160?44:-30),140,x+(x<160?-10:-84),140]);l.fill()}
    for(const x of[118,202])nicheLight(l,x,60,36,30,'#ffc070',.8);pool(l,160,120,150,44,'#fff0d8',.4);
    /* where the window light lands: the bench at the left, the seats and the chest at the right; and the lamps reach the desk */
    pool(l,104,95,36,10,'#fff0d0',.3);pool(l,222,92,34,12,'#fff0d0',.28);pool(l,160,86,24,12,'#ffd8a0',.22);
    comp(l,'multiply',1,()=>{ao(l,0,0,56,144,'l',.3,'#2a2030');ao(l,264,0,56,144,'r',.3,'#2a2030');ao(l,0,0,320,14,'t',.3,'#2a2030');ao(l,0,128,320,16,'b',.3,'#2a2030')})})},
 fore(g){/* the backs of the nearest bench */
  R(g,0,138,104,6,'#3a3028');R(g,0,138,104,.8,'#7a6a58');R(g,216,138,104,6,'#3a3028');R(g,216,138,104,.8,'#7a6a58')},
 draw(g,t){for(const x of[112,196]){flame(g,x+8.6,60.6,t+x*7);pool(g,x+9,58,8+Math.sin(t/190+x),6,'#ffb050',.14)}},
 front(){}};
/* ---------- Paphos: the hall of the proconsul, open to the harbor ---------- */
ART.paphos={w:400,fp:1.25,q:12,
 light:()=>({amb:'#f0e2d2',shade:[[0,96,'#d8c8c4'],[306,400,'#e0d0c8']]}),
 paint(g){const r=rng(271),MB='#f1eadb',RED=earth4('#a8402e',.08),rw=rng(2711);
  /* the view between the columns: the harbor of Paphos inside its two moles */
  sky(g,400,54,['#3a78c8','#6aa2dc','#a4c8e8','#dbe8ee'].map(c=>earth4(c,.14)));cloud(g,190,22,50,7,r);cloud(g,270,30,32,5,r);
  ridge(g,236,306,53,x=>Math.max(0,(x-236)*.14+1.5*Math.sin(x/6)),['#8ea284','#a8b890']);seaArt(g,96,53,210,84,r);
  ashlar(g,112,62,40,3.4,'#c6b592',r,{bw:8,bh:3.4,v:.08,t:.2});R(g,112,65.2,40,.8,'#5f6470');ashlar(g,188,62,36,3.4,'#c6b592',r,{bw:8,bh:3.4,v:.08,t:.2});R(g,188,65.2,36,.8,'#5f6470');
  for(const[sx,sy]of[[180,59],[250,61],[272,58.4]]){poly(g,[sx-2.5,sy,sx+2.5,sy,sx+2,sy+1.4,sx-2,sy+1.4],'#4a4a5c');poly(g,[sx-1.6,sy-.4,sx-1.2,sy-4.6,sx+1.8,sy-.6],'#ecdfc6')}
  /* the parapet */
  g.fillStyle=lg(g,0,82,0,104,['#e9e0cc','#d6ccb4','#bdb39c']);g.fillRect(96,82,210,22);
  /* the walls: red plaster above a dark dado */
  plaster(g,0,0,96,104,RED,r,{patch:0,cracks:0,t:.26});skipCracks4(r,3);plaster(g,306,0,94,104,RED,r,{patch:0,cracks:0,t:.26});skipCracks4(r,3);
  /* hairline cracks set by hand, high on both walls, where they run to no head */
  {const rb=rng(2712);for(const[x,y,n]of[[9,17,3],[80,20,3],[312,19,3],[393,21,3]])crack4(g,x,y,n,rb,.9)}
  for(const[x,w]of[[0,96],[306,94]]){R(g,x,84,w,20,'#3a2a2c');R(g,x,82.6,w,1.4,'#e6d6a8');ao(g,x,60,w,24,'b',.18,'#2a1020');ao(g,x,97,w,7,'b',.3,'#120a10')}
  /* the shade in the corners where the walls turn into the opening */
  ao(g,84,12,12,92,'r',.2,'#2a1020');ao(g,306,12,12,92,'l',.2,'#2a1020');
  poly(g,[96,12,100,14,100,104,96,104],'#7a3024');poly(g,[306,12,302,14,302,104,306,104],'#8a3628');
  /* entablature, and the shade under it */
  g.fillStyle=lg(g,0,0,0,12,['#cfc6b2','#f6f0e0']);g.fillRect(0,0,400,12);R(g,0,11,400,1.4,'#a8a090');for(let i=2;i<400;i+=5)R(g,i,7.4,2.4,2,'#d9d0bc');ao(g,0,12.4,400,10,'t',.35,'#2a2040');
  /* columns */
  for(const x of[104,164,228,290]){g.fillStyle=lg(g,x,0,x+8,0,['#cfc7b4',MB,'#fffdf4','#ded6c2','#aea8a4']);g.fillRect(x,15,8,87);for(let j=0;j<3;j++)R(g,x+1.8+j*2,17,.5,84,'rgba(120,112,104,.28)');
    R(g,x-1.4,12.4,10.8,3,MB);R(g,x-1.4,15.2,10.8,.6,'#a8a094');R(g,x-1.4,100.6,10.8,3.6,'#e2dac6');R(g,x-1.4,100.6,10.8,.6,'#fffdf4')}
  /* the door to the city */
  R(g,26,44,40,60,'#d8cdb4');R(g,26,44,40,1,'#fbf5e4');doorArt(g,30,48,32,56,'#6a4a2c',r,{left:1,bands:[]});ao(g,30,48,32,5,'t',.3,'#1a1420');
  /* a hanging behind the proconsul's seat, the dais, and the seat itself */
  for(let i=0;i<10;i++){const x=324+i*6.4,c=earth4(i%2?'#5a2848':'#6c3458',.2);g.fillStyle=lg(g,0,16,0,84,[tint(c,.12),c,tint(c,-.3)]);g.fillRect(x,16,6.4,66+(i%2)*1.6)}R(g,322,14.6,68,2.4,'#8a6a2a');R(g,322,14.6,68,.6,'#d8b860');
  R(g,314,100,82,4.4,'#e4dcc8');R(g,314,100,82,.6,'#fffdf4');R(g,320,95.6,70,4.4,'#ebe4d2');R(g,320,95.6,70,.6,'#fffdf4');R(g,314,104.2,82,.8,'rgba(60,50,90,.4)');
  shadowBox4(g,338,94.4,36,1.6,.4);board4(g,343,56,26,28,'#6a4424',rw,1);R(g,343,56,26,1.4,'#b88a52');R(g,345.6,60,20.8,20,'#5a3418');R(g,340,82,32,4,'#8a5a2c');R(g,340,82,32,.6,'#c8945a');R(g,342,79.6,28,2.6,'#7a2a4a');R(g,342,79.6,28,.6,'#a8507a');
  board4(g,340.6,86,3.4,9.6,'#5a3418',rw,1);board4(g,368,86,3.4,9.6,'#5a3418',rw,1);board4(g,339,72,4.4,12,'#7a4e28',rw,1);board4(g,368.6,72,4.4,12,'#7a4e28',rw,1);R(g,339,72,4.4,.8,'#c8945a');R(g,368.6,72,4.4,.8,'#c8945a');
  /* the proconsul's table: scrolls, a writing tablet, an inkpot */
  shadowBox4(g,244,100,40,4.6,.5);board4(g,245,92,3,12.4,'#5a4226',rw,1);board4(g,279,92,3,12.4,'#5a4226',rw,1);board4(g,241.5,88,45,4,'#8a6238',rw);
  shadow4(g,246.5,104.4,2.6,.8,.4,'#28203c');shadow4(g,280.5,104.4,2.6,.8,.4,'#28203c');R(g,241.5,91.6,45,1,'#4a3220');
  for(const[sx,c]of[[247,'#ecdcb0'],[253,'#e2d0a0'],[259,'#f0e4c0']]){R(g,sx,84.6,5,3.4,c);R(g,sx,84.6,5,.6,'#fff6dc');R(g,sx-.6,84.2,1.2,4.2,'#8a5a2c');R(g,sx+4.4,84.2,1.2,4.2,'#8a5a2c')}
  R(g,267,85.4,9,2.6,'#6a4424');R(g,267.8,85.9,7.4,1.4,'#2a2018');vessel(g,281,88,1.8,3.6,'#3a3a4a','jar',{noShadow:1});
  /* a brazier of bronze on three legs */
  shadow4(g,132,106,8,1.4,.45,'#28203c');stroke(g,[127,98,125,105.6],'#6a4a24',1);stroke(g,[137,98,139,105.6],'#6a4a24',1);stroke(g,[132,98,132.6,104.6],'#5a3e1e',1);vessel(g,132,98.6,6.6,5,'#b8863c','bowl',{noShadow:1});
  /* the floor: pale marble, the shadows of the columns across it */
  pave(g,0,103,400,144,'#e8e0d0',r,{vx:200,vy:62,rows:5,step:36,v:.1,joint:'#9c948a'});ao(g,0,103,400,5,'t',.3,'#4a4460');
  R(g,0,104.6,400,2,'rgba(138,58,48,.5)');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,103,400,41)});
  for(const x of[104,164,228,290])shade(g,[x,104,x+8,104,x+30,126,x+18,126],SH,.5);shade(g,[0,104,96,104,112,116,0,118],SH,.5);shade(g,[306,104,400,104,400,112,318,110],SH,.45);
  /* light: the day comes in between the columns from the harbor. It lies brightest on the parapet and the floor before the
     opening and reaches the proconsul's table; the red walls at either side get less of it, and the shade gathers under the
     entablature, in the far corners and on the near floor */
  lightmap(g,400,'#e4dcd8',l=>{pool(l,200,64,140,64,'#ffffff',.8);pool(l,200,116,170,28,'#fff4e4',.45);pool(l,262,92,40,14,'#fff4e0',.3);
    pool(l,132,100,16,8,'#ffc890',.25);
    comp(l,'multiply',1,()=>{ao(l,0,12,400,12,'t',.16,'#3a2838');ao(l,0,0,70,144,'l',.2,'#3a2838');ao(l,330,0,70,144,'r',.18,'#3a2838');ao(l,0,128,400,16,'b',.18,'#3a2838')})});
  pool(g,200,40,170,120,'#fff0c0',.16,'screen');ao(g,0,0,60,144,'l',.14,'#2a1030');ao(g,340,0,60,144,'r',.1,'#2a1030')},
 fore(g){g.fillStyle=lg(g,0,0,22,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(0,0,20,150);R(g,-2,128,25,22,'#7a7488');R(g,-2,128,25,1,'#d8d2d0');
  g.fillStyle=lg(g,400,0,422,0,['#8a8494','#c8c2c0','#6a6478']);g.fillRect(402,0,20,150);R(g,399,128,25,22,'#7a7488');R(g,399,128,25,1,'#d8d2d0');
  comp(g,'source-atop',.4,()=>R(g,0,0,430,150,'#34305a'))},
 draw(g,t){for(let i=0;i<5;i++){const k=(Math.floor(t/170)+i*3)%7;R(g,128+((i*5+k)%8),96.4+(k%2)*.5,1.4,.8,k<3?'#ffb040':'#e8581c')}pool(g,132,95,9+Math.sin(t/210),6,'#ff9a40',.12);
  if(MK.room==='paphos')depth(MK.y-12,()=>baggage(g,MK.x-14,MK.y-12))},
 front(){}};
/* ---------- Antioch: the room where the congregation fasted and prayed (opening scene) ---------- */
ART.sendoff={w:320,q:12,paint(g){const r=rng(291),W='#e6d6ac',rw=rng(2911);
  plaster(g,0,0,320,104,W,r,{patch:3,cracks:0,brick:'#b89468',t:.36});skipCracks4(r,6);
  /* hairline cracks set by hand, high on the wall, where they run to no head */
  {const rb=rng(2912);for(const[x,y,n]of[[60,14,3],[186,13,3],[296,15,3]])crack4(g,x,y,n,rb,.85)}
  /* the ceiling at its edge, its joists running toward us, and the wall plate they rest on */
  joists4(g,6.5,36,rng(2913));burn4(rw,10,30,6,6);
  board4(g,0,6,320,2.4,'#6a4e2c',rw);ao(g,0,8.4,320,10,'t',.35,'#2a2030');
  ao(g,0,8.4,10,95.6,'l',.2,'#2a2030');ao(g,310,8.4,10,95.6,'r',.2,'#2a2030');ao(g,0,95,320,8,'b',.2,'#2a2030');
  windowArt(g,236,24,20,22,W,{bars:3,dark:'#8fc0e8',wood:'#8a6a40'});R(g,21,43,36,61,'#d8c8a0');doorArt(g,24,46,30,58,'#8a6a40',r,{bands:[]});ao(g,24,46,30,5,'t',.3,'#1a1420');
  arch(g,120,46,13,17,tint(W,-.3));arch(g,121,47,11,16,'#3a2c22');R(g,119,62.6,15,1.6,tint(W,.15));R(g,124,60,6,2.4,'#b8733c');R(g,124,60,6,.6,'#e0a064');
  shadowBox4(g,150,100,60,4.4,.42);board4(g,152,93,3,11,'#5a4226',rw,1);board4(g,205,93,3,11,'#5a4226',rw,1);board4(g,148,89,64,4,'#96703e',rw);R(g,148,92.6,64,1,'#5a4226');
  for(const[sx,c]of[[158,'#ecdcb0'],[168,'#e2d0a0']]){R(g,sx,85.6,7,3.4,c);R(g,sx-.6,85.2,1.2,4.2,'#8a5a2c');R(g,sx+6.4,85.2,1.2,4.2,'#8a5a2c')}
  pave(g,0,103,320,144,'#cdbb94',r,{vx:160,vy:64,rows:5,step:34,v:.08});ao(g,0,103,320,6,'t',.35,'#3a3050');
  poly(g,[70,112,250,112,268,136,52,136],earth4('#8a4a3a',.12));poly(g,[74,114,246,114,262,134,58,134],earth4('#a25a44',.12));for(let i=0;i<9;i++)stroke(g,[78+i*20,114,64+i*23.6,134],'rgba(60,20,16,.3)',.6);
  lightmap(g,320,'#b4a698',l=>{pool(l,246,35,30,30,'#fff4d8',1);l.fillStyle=lg(l,0,46,0,140,['rgba(255,240,200,.5)','rgba(255,240,200,0)']);poly(l,[236,46,256,46,216,140,130,140]);l.fill();nicheLight(l,126,58,36,28,'#ffc070',.72);pool(l,160,120,150,44,'#fff0d8',.4);
    /* where the light lands besides: the table under the lamp, the rug where the window's fall ends; the corners and the near floor in shade */
    pool(l,180,90,40,10,'#fff0d0',.26);pool(l,190,126,70,12,'#fff0d8',.2);
    comp(l,'multiply',1,()=>{ao(l,0,0,56,144,'l',.3,'#2a2030');ao(l,264,0,56,144,'r',.26,'#2a2030');ao(l,0,0,320,14,'t',.3,'#2a2030');ao(l,0,128,320,16,'b',.3,'#2a2030')})})},
 draw(){},front(){}};
/* ---------- The crossing: evening on the sea, Cyprus ahead (voyage scene) ---------- */
ART.voyage={w:320,q:12,paint(g){const r=rng(307);
  /* the evening's blues drawn a little toward grey (earth4), the sunset's warmth left as it is */
  sky(g,320,86,['#22386a','#45588e','#8f7696','#e09a72','#f8c680'].map((c,i)=>i<3?earth4(c,.12):c));pool(g,58,86,130,54,'#ffd890',.55,'screen');pool(g,58,84,34,22,'#fff0c0',.7,'screen');oval(g,58,83,7,7,'#fff2c8');
  for(const[cx0,cy,cw]of[[70,40,70],[210,26,90],[280,52,50],[150,60,44]]){pool(g,cx0,cy+1.6,cw,4,'#7a5a84',.5,'source-over');pool(g,cx0,cy,cw*.9,3,'#ffc898',.75,'source-over')}
  for(let i=0;i<26;i++){const sx=120+r()*200,sy=2+r()*26;R(g,sx,sy,.5,.5,'#f4f0ff')}
  /* the long arm of Cyprus on the horizon */
  ridge(g,0,170,86,x=>Math.max(0,3.4+2.6*Math.sin(x/19)+1.2*Math.sin(x/6)-Math.max(0,x-120)*.1),['#5a5684','#6e6690']);
  g.fillStyle=lg(g,0,86,0,144,['#f0b080','#8a94b0','#3f6c96','#244c78','#16345c'].map((c,i)=>i?earth4(c,.12):c));g.fillRect(0,86,320,58);
  for(let i=0;i<300;i++){const k=r()*r(),sy=87+k*56;R(g,r()*320,sy,2+k*8+r()*4,.5+k*.4,r()<.5?'rgba(190,210,235,.45)':'rgba(10,30,60,.4)')}
  for(let i=0;i<70;i++){const k=r(),sy=87+k*40,w=5+k*34;R(g,58-w/2+r()*w,sy,2+r()*5,.5+k*.5,r()<.6?'#ffdc9c':'#fff4d0')}},
 draw(){},front(){}};
/* The opening scene: the prophets and teachers of Antioch lay their hands on Barnabas and Saul (G.send.lay). */
const pose=(g,x,y,id,dir,bow,ges)=>figure(g,x,y,'#dccbb8',id+dir+'s'+bow+ges,s=>person(s,0,0,LOOK[id],dir,0,0,bow,ges,bow));
function sendoffScene(g){backdrop(g,'sendoff');const lay=(G.send||{}).lay?1:0;
  pose(g,74,124,'mark',1,lay,0);pose(g,118,121,'symeon',1,0,lay);pose(g,236,122,'manaen',-1,0,lay);
  pose(g,148,127,'barnabas',1,lay,0);pose(g,176,128,'paul',-1,lay,0);pose(g,206,125,'lucius',-1,0,lay)}
/* The crossing: the ship runs west before the wind, our shelter rigged on her foredeck (G.sea.k: 0 to 1). */
function voyageScene(g,t){backdrop(g,'voyage');const k=(G.sea||{}).k||0,X=Math.round(118-86*k),lit='#f0c8a8';
  ship(g,X,30,t,{sail:1,tent:1,wake:1,figs:(x,y)=>{man(g,x+112,y+91,'barnabas',-1,0,lit,0,0);man(g,x+128,y+92,'paul',-1,0,lit,Math.floor(t/700)%2,0);man(g,x+150,y+91,'mark',-1,0,lit,0,0)}});
  const y=30+Math.round(Math.sin(t/900)*2)/2;R(g,X-6,y+100.4,224,1.2,'rgba(12,30,56,.5)');for(let i=0;i<10;i++)R(g,X-4+i*22+Math.sin(t/500+i)*2,y+101.6,9,.6,'rgba(230,240,246,.6)');
  for(let i=0;i<5;i++)R(g,X-10-i*7+(t/70%7),y+96+(i%2)*1.6,6-i,.6,'#f4f8fa')}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  barnabas:{skin:'#b8844f',hair:'#58483a',beard:'#58483a',grey:'#8a8076',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  mark:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#8aa08a',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',slim:1,ph:900},
  kallias:{skin:'#9c6238',wrap:'#3f6a8a',beard:'#3a2a1a',tunic:'#b8643c',belt:'#2e2016',trim:'#7a3a20',brow:'#1a1210',ph:1500},
  jair:{skin:'#b88458',hair:'#d8d8d8',beard:'#e2e2e2',longBeard:1,bald:1,brow:'#a0a0a0',tunic:'#8a7a9a',cloak:'#c8b890',long:1,belt:'#4a3a24',ph:2100},
  zadok:{skin:'#b47e52',wrap:'#e6dcc0',beard:'#6a5a4a',longBeard:1,brow:'#4a3a2a',tunic:'#3f5a7a',cloak:'#d8cdb0',long:1,belt:'#8a6a2a',trim:'#c9a23a',ph:2600},
  philon:{skin:'#c49064',hair:'#3a2616',beard:'#3a2616',tunic:'#c07a3a',cloak:'#5a6a4a',long:1,belt:'#3a2414',trim:'#7a4a1e',ph:3300},
  /* a Roman governor sent by the Senate: no armor and no sword, a white robe with a purple hem */
  sergius:{skin:'#d0a078',hair:'#5a4a3a',brow:'#3a2a1a',tunic:'#f0ece0',cloak:'#f6f2e8',long:1,trim:'#7a2a4a',ph:1700},
  elymas:{skin:'#b07a50',wrap:'#5a2a5a',beard:'#1a1210',longBeard:1,brow:'#120c0a',tunic:'#2e3a5a',cloak:'#8a2a3a',long:1,belt:'#c9a23a',trim:'#c9a23a',longSleeve:1,ph:800},
  /* seen only in the opening scene */
  symeon:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',tunic:'#d8c9a0',cloak:'#7a5a3a',long:1,belt:'#4a3a24',ph:0},
  manaen:{skin:'#c09064',hair:'#8a8a8a',beard:'#9a9a9a',brow:'#6a6a6a',tunic:'#e6dcc8',cloak:'#6a3a4a',long:1,belt:'#8a6a2a',trim:'#8a6a2a',ph:0},
  lucius:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',trim:'#8a6a1a',brow:'#120c0a',ph:3100}});
const BN=actor('barnabas','Barnabas','#f0b070',128),MK=actor('mark','john_mark','#b8e0b0',176),KA=actor('kallias','Kallias','#f0a080',104),JR=actor('jair','Jair','#d8d0f0',96),
  ZA=actor('zadok','Zadok','#e8dca8',110),PH=actor('philon','Philon','#f0b890',132),SP=actor('sergius','sergius_paulus','#f2e6c8',118),EL=actor('elymas','bar_jesus','#e0a8d8',92);
Object.assign(ICON,{
  cord(g){IH.coil(g,['#7a6852','#9c866a','#7a6852','#a89274'],12,8.4,7.4,2.6,2.7);stroke(g,[18.6,17,21,19,21.6,21.6],'#9c866a',1.4)},
  shelter(g){IH.square(g,'#423832',3.6,7,16.8,11);g.strokeStyle='#b8a682';g.lineWidth=1;g.strokeRect(3.6,7,16.8,11);
    for(const[x,y]of[[2.4,5.8],[19.2,5.8],[2.4,16.8],[19.2,16.8]]){g.strokeStyle='#dcd0aa';g.lineWidth=.9;g.beginPath();g.arc(x+1.2,y+1.2,1.6,0,6.2832);g.stroke()}
    R(g,3.6,12,16.8,.8,'#6e5e50')}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#462e16',3);stroke(g,[4.6,20.6,19,3.6],'#8c683c',2);stroke(g,[4.1,20.1,18.5,3.1],'#e2c288',.9);
  R(g,17.2,2.8,3,3,'#c49a5c');R(g,17.4,2.8,1.8,1.2,'#f2d8a2');R(g,3.3,19.7,2.4,2.4,'#9c968c');R(g,3.5,19.7,1.2,1,'#d4cec4')};
Object.assign(ITEMS,{
  bstaff:{name:'barnabass_staff',icon:'staff',look:'barnabass_walking_staff_stout_olive_wood_said',
    by:{barnabas:'my_walking_staff_said'}},
  haircloth:{name:'goat_hair_cloth',icon:'cloth',look:'goat_hair_cloth_bought',
    by:{barnabas:'goat_hair_cloth_the'}},
  cord:{name:'tarred_cord',look:'length_of_ships_cord_tarred',
    by:{barnabas:'tarred_cord_off_the_shipmasters_coil'}},
  shelter:{name:'deck_shelter',look:'roof_of_goat_hair_cloth',
    by:{barnabas:'roof_for_a_deck'}}});
/* how Barnabas describes the tools of the trade (set again whenever this chapter begins: see setup4) */
const BY4={awl:'the_tentmakers_awl',thread:'waxed_linen_thread_and_strong',
  knife:'knife_for_cloth_and_leather',tablets:'his_wax_tablets_people'};
async function sewShelter(){
  if(!has('cord')){await say(P,'i_could_hem_this_in_an_hour');
    return say(P,'it_will_have_to_be_lashed',TH)}
  SFX.sew();await say(P,'tarred_cord_laid_along');SFX.sew();await wait(800);
  delItem('haircloth');delItem('cord');addItem('shelter',1);F.shelter=1;SFX.good();
  await say(P,'loop_at_each_corner_to_lash')}
const edge=()=>say(P,'cord_belongs_in_the_edge');
Object.assign(COMBO,{
  'awl+haircloth':sewShelter,'cord+haircloth':sewShelter,'haircloth+thread':sewShelter,
  'haircloth+knife':()=>say(P,'it_is_the_right_size_as_it'),
  'awl+cord':edge,'cord+thread':edge,'cord+knife':()=>say(P,'it_is_cut_to_length_already'),
  'awl+shelter':()=>say(P,'every_stitch_is_tight'),'shelter+thread':()=>say(P,'every_stitch_is_tight'),
  'knife+shelter':()=>say(P,'after_all_that_work'),
  'bstaff+shelter':()=>say(P,'staff_for_a_ridge_pole'),
  'bstaff+haircloth':()=>say(P,'staff_will_make_the_ridge'),
  'bstaff+knife':()=>say(P,'whittle_barnabass_staff')});
const ENT={seleucia:[150,124,1],salamis:[150,122,1],synagogue:[60,120,1],paphos:[150,124,1]},
  MARK={seleucia:[96,122,1],salamis:[292,124,-1],synagogue:[292,124,-1],paphos:[58,124,1]};
/* place4: put everyone where the story has them, for the room the party is in. Barnabas, Saul and John Mark travel together. */
function place4(room){const e=ENT[room],o=PC()===P?BN:P;place(o,room,e[0]-26,e[1]+2,e[2]);
  const m=MARK[room];place(MK,room==='synagogue'?'salamis':room,...m);place(JR,room==='seleucia'?'seleucia':'synagogue',room==='seleucia'?176:88,room==='seleucia'?118:116,1)}
function setup4(){BN.hs=BN4;P.hs=PAUL4;P.called='Saul';Object.assign(BN,BARN4);for(const id in BY4)(ITEMS[id].by=ITEMS[id].by||{}).barnabas=BY4[id];
  place(BN,'seleucia',124,126,1);place(MK,'seleucia',96,122,1);place(KA,'seleucia',334,116,-1);place(JR,'seleucia',176,118,1);
  place(ZA,'synagogue',214,113,-1);place(PH,'synagogue',296,122,-1);place(SP,'paphos',330,113,-1);place(EL,'paphos',366,119,-1);EL.speed=0;
  G.send=null;G.sea=null;G.inv=['awl','thread','knife','tablets','haircloth'];G.invs={paul:G.inv,barnabas:['bstaff']};drawInv()}
/* Barnabas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const BARN4={noCraft:'that_is_the_tentmakers_trade_not_mine',
  def:{look:'i_see_nothing_there_that_needs_me',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_the_tentmakers_trade_not_mine_said',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
const inSel=()=>G.room==='seleucia',inPaph=()=>G.room==='paphos',inSal=()=>!inSel()&&!inPaph();
/* go4: through a door. The two men keep together, so the other follows. */
async function go4(room,x,y,dir){SFX.door();await fade(1);enterRoom(room,x,y,dir);place(PC()===P?BN:P,room,x-dir*26,y+3,dir);await fade(0)}
/* quizAs: the engine's quiz, answered by whoever is played. ask: the same, but a reply may come from anyone present: r lists lines, or [actor, line] pairs. */
/* ask: someone asks, and the player answers from opts; k: the key to mix an answer by when its line is put together from parts (choose) */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q,{to:me});const o=av[await choose(av.map(o=>o.q),{by:av.map(o=>o.k||o.q)})];for(const l of o.p||[o.q])await say(me,l,{to:who});
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1],x[2]||{to:me}):say(who,x,{to:me}));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* Saul, as Barnabas sees him and talks to him */
const PAUL4={get name(){return P.called||'Saul'},actor:P,as:{barnabas:{
  look:()=>say(BN,inSel()?'saul_sent':inPaph()?'paul_said':'saul_on'),
  talk:()=>talkTree([
    {q:'what_can_i_do_to_help',a:()=>say(P,inSel()?(!F.metKal?'come_with_me_to_the_shipmaster':!F.shelter?'keep_john_mark_company'
        :!F.jairOk?(F.jairB?'you_have_done_it_already':'old_man_will_not_speak_to_me'):'nothing_more_said')
      :inPaph()?(!F.ob1?'tell_the_proconsul_where_you_were_born':'stand_beside_me')
      :(!F.vouched?'speak_to_the_presiding_officer_for_me':!F.spoke?'pray_for_me_brother_while_i_speak':'show_me_the_road_to_paphos'))},
    {q:'are_you_content_to_follow',once:1,if:()=>!inPaph(),a:()=>say(P,'more_than_content')},
    {q:'i_will_leave_you_to_it',bye:1}]),
  show:{bstaff:()=>say(P,inSel()?'keep_your_staff_by_you_barnabas':'keep_your_staff_by_you_barnabas_said'),'*':'keep_it_by_you_barnabas'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'roof',q:'we_need_a_shelter_for_the_deck',if:()=>inSel()&&F.metKal&&!F.shelter},
  {id:'oldman',q:'old_man_of_salamis_sails_with_us',if:()=>inSel()&&F.metKal&&!F.jairOk},
  {id:'hearing',q:'how_does_a_stranger_get',if:()=>inSal()&&!F.spoke},
  {id:'elymas',q:'who_is_the_man_beside_the_proconsul',if:()=>inPaph()}];
/* ============ SCRIPTURE: the passages on the tablets. short: how a passage is named when it is offered as an answer ============ */
const PASS={
  ps133:{ref:'psalm_133_1',short:'brothers_at_one',gist:'what_a_good_and_delightful'},
  isa42:{ref:'isaiah_42_4',short:'islands_still_wait',gist:'islands_wait_for_his_law'},
  sam7:{ref:'n2_samuel_7_12',short:'son_promised_to_david',gist:'son_of_your_own_will_follow'},
  ps16:{ref:'psalm_16_10',short:'not_abandoned_to_the_grave',gist:'davids_hope_jehovah_would'},
  hos14:{ref:'hosea_14_9',short:'jehovahs_ways_are_straight',gist:'righteous_and_transgressor'},
  deut18:{ref:'deuteronomy_18_10',short:'no_one_who_practices_magic',gist:'among_you_there_must_be'},
  dan2:{ref:'daniel_2_27_28',short:'god_who_reveals_secrets',gist:'what_the_king_wants_to_know'}},
  ORDER=['ps133','isa42','sam7','ps16','hos14','deut18','dan2'];
const label=k=>T('ref_short',{ref:T(PASS[k].ref),short:T(PASS[k].short)}),quote=k=>T('text_ref',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Barnabas',note:()=>inSel()?'joseph_a_levite_born_on_cyprus':'on_his_own_island_he_knows'},
    {name:'john_mark',note:'cousin_of_barnabas_from_jerusalem'},
    {name:'Kallias',note:'master_of_the_ship_for_salamis',if:()=>F.metKal&&inSel()},
    {name:'Jair',note:()=>F.jairOk?'disciple_of_salamis':'old_man_of_salamis',if:()=>F.metJair||F.jairB},
    {name:'Zadok',note:'he_presides_in_a_synagogue_of_salamis',if:()=>F.metZad||F.vouched},
    {name:'Philon',note:'merchant_of_salamis',if:()=>F.spoke},
    {name:'sergius_paulus',note:'proconsul_of_cyprus_an_intelligent_man',if:()=>F.heard},
    {name:'bar_jesus',note:'they_call_him_elymas_the_sorcerer',if:()=>F.heard}],
  tasks:[
    {t:'find_a_ship_for_cyprus',if:()=>inSel()&&!F.metKal},
    {t:'make_a_shelter_for_the_deck',if:()=>inSel()&&F.metKal&&!F.shelter},
    {t:'find_something_to_lash_it_down_with',if:()=>inSel()&&F.metKal&&!F.gotCord&&!F.shelter},
    {t:'make_peace_with_the_old',if:()=>inSel()&&(F.metJair||F.jairB)&&!F.jairOk},
    {t:'go_aboard_and_sail_for_salamis',if:()=>inSel()&&F.shelter&&F.jairOk},
    {t:'get_a_hearing_in_the_synagogue',if:()=>inSal()&&!F.vouched},
    {t:'give_a_word_of_encouragement',if:()=>inSal()&&F.vouched&&!F.spoke},
    {t:'take_the_road_west_to_paphos',if:()=>inSal()&&F.spoke},
    {t:'answer_the_proconsul_what',if:()=>inPaph()&&!F.ob1},
    {t:'answer_the_proconsul_what_q',if:()=>inPaph()&&F.ob1&&!F.ob2},
    {t:'answer_elymas_from_the_scriptures',if:()=>inPaph()&&F.ob2}],
  scripture:ORDER.map(k=>PASS[k])};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
/* ---------- Seleucia ---------- */
async function meetKal(me){F.metKal=1;
  await say(me,'peace_to_you_shipmaster');
  await say(KA,'for_salamis_as_soon_as_the_last');
  await say(me,'there_are_three_of_us');
  await say(KA,'i_have_deck_room_for_three');
  await say(KA,'passenger_gets_drinking');
  await say(KA,'you_sleep_on_the_deck_and_the_spray');
  await say(KA,'if_it_needs_lashing_down');
  await say(me,me===P?'roof_for_a_ships_deck':'a_roof_for_a_ships_deck',TH)}
async function board(){const me=PC(),o=me===P?BN:P;
  if(!F.metKal)return say(KA,'not_so_fast_friend');
  if(!F.shelter)return say(KA,F.gotCord?'you_have_the_cord':'aboard_already_and_no_roof');
  if(!F.jairOk){await say(o,me===P?'saul_the_old'
      :'barnabas_wait');return}
  await say(KA,'last_jar_is_stowed_and_the_wind');return travel()}
KA.hs={name:'Kallias',actor:KA,look:'kallias_master_of_the_ship_for_salamis',
  show:{haircloth:'goat_hair_cloth_it_sheds',
    cord:'that_is_my_cord_and_you',
    shelter:'rope_sewn_into_the_edge',
    awl:'sailmaker_uses_a_needle',knife:'keep_that_well_away_from_my_rigging',
    tablets:'write_this_down_we_sail','*':'stow_it_with_your_baggage'},
  ask:{roof:['tent_cannot_be_pegged_to_a_deck','coil_by_the_mooring_post'],
    oldman:'he_paid_his_fare_and_he'},
  talk:async()=>{if(!F.metKal)await meetKal(P);
    await talkTree([
      {q:'what_do_you_carry_to_cyprus',a:async()=>{await say(KA,'wine_and_oil_from_syria_and_grain');await say(KA,'passengers_when_they_do')}},
      {q:'how_long_is_the_crossing',a:()=>say(KA,'day_and_a_night_and_a_little')},
      {q:'who_else_is_sailing',a:async()=>{await say(KA,'old_man_by_the_jars');await say(KA,'he_asked_me_for_nothing')}},
      {q:'we_will_be_ready',bye:1}])},
  as:{barnabas:{look:'cyprus_shipmaster_or_i_never_saw_one',
    talk:async()=>{if(!F.metKal)return meetKal(BN);await say(KA,F.shelter?'your_friend_has_made_his_roof':'deck_room_for_three_as_i_said')},
    show:{bstaff:'good_staff','*':'stow_it_with_your_baggage'}}}};
async function jairSaul(){
  if(F.jairOk)return talkTree([
    {q:'how_long_have_you_lived_in_salamis',a:async()=>{await say(JR,'i_was_born_there');await say(JR,'when_we_were_acts_11_19')}},
    {q:'are_there_other_disciples_on_cyprus',a:()=>say(JR,'few_here_and_there')},
    {q:'peace_to_you_jair',bye:1}]);
  if(!F.jairB){F.metJair=1;await say(P,'peace_to_you_father');
    await say(JR,'peace_2');await say(JR,'you_are_saul');await say(P,'i_am_said');
    await say(JR,'forgive_an_old_man');
    return say(P,'he_knows_my_name',TH)}
  await say(P,'jair_said');
  await say(JR,'i_am_willing_to_hear_what');
  await quiz(JR,'what_q',[
    {q:'that_is_all_behind_me_now',r:['behind_you']},
    {q:'jehovah_has_shown_me_mercy_for_it',r:['i_do_not_doubt_his_mercy']},
    {q:'i_did_it',ok:1,
      p:['i_did_it_acts_8_3',
        'i_was_wrong_jair'],
      r:['to_my_face','in_all_these_years_no_one']}]);
  await say(JR,'congregations_in_judea_galatians_1_23');
  await say(JR,'i_heard_it_and_i_did_not');
  F.jairOk=1;SFX.good();await say(JR,'peace_to_you_saul_my_brother');
  await say(P,F.shelter?'old_man_a_night_at_sea':'an_old_man_a_night_at_sea',TH)}
async function jairBarn(){
  if(F.jairOk)return say(JR,'joseph');
  if(F.jairB)return say(JR,'let_him_come_and_say_it');
  await say(BN,'peace_to_you_father_said');
  await say(JR,'joseph_the_levite');
  await say(JR,'i_was_in_jerusalem_acts_8_1_11_19');
  await say(JR,'man_who_drove_us_out_is');
  await ask(BN,JR,'why_should_i_share_a_deck',[
    {q:'that_was_many_years_ago_jair',r:['i_forget_a_great_deal_at_my_age']},
    {q:'holy_spirit_itself_has_sent_him_out_who',r:['i_do_not_object_to_the_holy']},
    {q:'i_asked_the_same_question_once',ok:1,
      p:['i_asked_the_same_acts_9_26_27',
        'he_did_not_offer_me_a_single'],
      r:['you_heard_him_out_you','very_well']}]);
  F.jairB=1;if(P.room===G.room){BN.dir=P.x>BN.x?1:-1;await say(BN,'he_will_hear_you_saul')}}
JR.hs={name:'Jair',actor:JR,
  look:()=>say(P,inSel()?(F.jairOk?'jair_of_salamis':F.metJair||F.jairB?'jair_he':'old_man_with_a_small_bundle')
    :'jair_at_home_in_his_own'),
  show:{shelter:()=>say(JR,F.jairOk?'roof_at_sea':'it_is_nothing_to_me'),
    tablets:()=>say(JR,F.jairOk||!inSel()?'you_write_the_scriptures':'it_is_nothing_to_me'),
    '*':()=>say(JR,F.jairOk||!inSel()?'keep_it_brother_i_need':'it_is_nothing_to_me')},
  ask:{roof:()=>say(JR,F.jairOk?'dry_night_on_this_crossing':'that_is_your_affair'),
    hearing:['zadok_presides_here','he_has_known_the_house']},
  talk:()=>inSel()?jairSaul():talkTree([
    {q:'is_this_your_synagogue',a:()=>say(JR,'since_i_was_a_child')},
    {q:'will_they_hear_us',a:()=>say(JR,F.spoke?'they_have_heard_you':'if_zadok_gives_you_the_platform')},
    {q:'peace_to_you_jair',bye:1}]),
  as:{barnabas:{look:()=>say(BN,F.jairB||F.jairOk||!inSel()?'jair_of_salamis_said':'i_know_that_face'),
    talk:()=>inSel()?jairBarn():say(JR,F.spoke?'they_heard_him_joseph':'speak_to_zadok_joseph'),
    show:{'*':'keep_it_joseph'}}}};
MK.hs={name:'john_mark',actor:MK,
  look:()=>say(P,'john_mark_the_cousin_of_barnabas_colossians_4_10'),
  show:{haircloth:'i_wondered_why_that_bundle',cord:'tarred_cord_said',
    shelter:'a_roof',tablets:'i_should_keep_notes_as_you_do',
    awl:'i_will_carry_anything_you_like','*':'shall_i_pack_it_with_the_rest'},
  ask:{roof:'i_have_bread_figs_and_water',
    oldman:'he_has_been_watching_you_brother',
    hearing:'in_jerusalem_a_visitor',
    elymas:['they_call_him_elymas_the_sorcerer_said','servants_say_the_proconsul']},
  talk:()=>talkTree([
    {q:'is_everything_packed',a:()=>say(MK,'bed_rolls_a_change_of_clothing')},
    {q:'you_came_with_us_from_jerusalem',a:async()=>{await say(MK,'from_my_mothers_house_acts_12_12');await say(MK,'when_you_and_barnabas_acts_12_25')}},
    {q:'you_carry_more_than_your_share',once:1,a:()=>say(MK,'you_two_have_the_speaking_to_do')},
    {q:'thank_you_john_mark',bye:1}]),
  as:{barnabas:{look:'my_cousin_john_mark',
    talk:()=>say(MK,inSel()?'everything_is_here_cousin':inPaph()?'i_will_wait_here_by_the_door':'this_is_salamis'),
    show:{bstaff:'shall_i_carry_it_cousin','*':'shall_i_pack_it_with_the_rest_q'}}}};
const BN4={name:'Barnabas',actor:BN,
  look:()=>say(P,inSel()?'barnabas_cyprus':inPaph()?'barnabas_he_stands'
    :'barnabas_a_levite_acts_4_36'),
  show:{haircloth:'goat_hair_cloth_i',cord:'ships_cord',
    shelter:'roof_for_four_i_think',awl:'your_awl',thread:'good_thread_said',
    knife:'put_it_to_work_brother_said',tablets:'read_me_something_from_them','*':'keep_it_brother_said'},
  ask:{roof:'you_have_cloth_an_awl_and_thread',
    oldman:'i_know_that_face_said',
    hearing:'i_was_born_on_this_island',
    elymas:'jew_and_he_lives_by_what'},
  talk:()=>inSel()?talkTree([
      {q:'what_is_cyprus_like',a:async()=>{await say(BN,'mountains_in_the_southwest');
        await say(BN,'many_jews_live_there')}},
      {q:'what_do_we_still_need_for_the_crossing',a:()=>say(BN,!F.metKal?'word_with_the_shipmaster_first_of_all':!F.shelter?'roof_for_the_deck_he_says'
        :!F.jairOk?'peace_with_the_old_man':'nothing_said')},
      {q:'are_you_glad_to_be_going_home',once:1,a:()=>say(BN,'glad_said')},
      {q:'let_us_get_on',bye:1}])
    :inPaph()?talkTree([
      {q:'what_do_you_make_of_the_proconsul',a:()=>say(BN,'he_listens_before_he_speaks')},
      {q:'of_the_man_beside_him',a:()=>say(BN,'he_is_afraid')},
      {q:'stand_by_me_brother',bye:1}])
    :talkTree([
      {q:'where_do_we_begin',a:()=>say(BN,!F.vouched?'in_the_synagogue':!F.spoke?'with_you_on_the_platform':'on_the_road_west')},
      {q:'did_you_know_this_city',once:1,a:async()=>{await say(BN,'every_street_of_it');await say(BN,'i_never_thought_i_would')}},
      {q:'lead_on',bye:1}])};
ROOMS.seleucia={space:0.6,walk:[16,464,110,138],mood:'hope',amb:{waves:.6,gulls:.6,creak:.5,crowd:.2},hs:[
  {name:'mountain',x:120,y:14,w:100,h:36,wx:170,look:['mountain_stands_with_its_feet','seleucia_is_a_fortress']},
  {name:'town_wall',x:0,y:18,w:112,h:32,wx:70,look:'walls_of_dressed_stone'},
  {name:'gate_to_the_antioch_road',x:22,y:52,w:40,h:52,wx:42,wy:112,look:'road_back_to_antioch_half',
    use:'they_laid_their_hands_on_us',
    open:'they_laid_their_hands_on_us'},
  {name:'mole',x:128,y:42,w:172,h:20,wx:214,look:'mole_of_great_stones_shelters_the_basin'},
  {name:'cargo',x:128,y:86,w:70,h:22,wx:160,wy:114,look:'jars_of_syrian_wine_and_oil',pickup:'it_is_the_shipmasters_not_mine'},
  {name:'coil_of_cord',x:205,y:96,w:26,h:11,wx:218,wy:113,look:'ships_cord_tarred_against_the_salt',
    pickup:()=>say(P,F.gotCord?'i_have_all_i_need_of_it':F.metKal?'whole_coil':'it_belongs_to_the_ship'),
    use:()=>say(P,F.gotCord?'i_have_all_i_need_of_it':'it_would_take_a_blade_to_make'),
    useWith:async it=>{if(it!=='knife')return false;if(F.gotCord)return say(P,'i_have_cut_what_i_need');if(!F.metKal)return say(P,'it_belongs_to_the_ship_said');
      SFX.cut();F.gotCord=1;addItem('cord');await say(P,'enough_to_run_round_the_whole')}},
  {name:'our_baggage',x:42,y:96,w:48,h:13,wx:66,wy:114,look:'bed_rolls_a_leather_bag',
    pickup:'john_mark_has_it_in_hand'},
  {name:'ship',x:262,y:10,w:214,h:66,wx:350,wy:112,look:['round_bellied_merchant_ship_loading_for_cyprus','cargo_below_and_whatever']},
  {name:'gangplank',x:282,y:77,w:30,h:27,wx:290,wy:112,dir:1,look:'the_gangplank',exit:()=>board()}]};
/* ---------- Salamis ---------- */
async function landed(){if(F.landed)return;F.landed=1;
  await narr('salamis_on_the_eastern_shore_of_cyprus',{dur:3200});
  await say(BN,'salamis_said');
  await say(JR,'it_has_more_than_one_synagogue');
  await say(JR,'zadok_presides_there');
  await walk(JR,365,113);SFX.door();place(JR,'synagogue',88,116,1);
  await say(P,'word_of_god_first_in_the_synagogues')}
const westRoad=()=>F.spoke?travel():say(PC(),PC()===P?'road_west_right_across_the_island':'road_to_paphos');
ROOMS.salamis={space:0.8,walk:[16,464,110,138],mood:'hope',amb:{crowd:.55,gulls:.4,waves:.3,hammer:.4,birds:.2},enter:landed,hs:[
  {name:'harbor',x:0,y:44,w:110,h:58,wx:62,look:['harbor_of_salamis_and_kalliass','day_and_a_night_under_a_roof']},
  /* the hidden treasure (index.html, treasure): our roof still on Kallias's foredeck, and a sailor asleep under it */
  {name:'kalliass_foredeck',x:78,y:68,w:13,h:10,wx:62,dir:-1,look:async()=>{await say(P,'our_roof_is_still_rigged');
      await say(P,'one_of_his_crew_has_found');treasure()},
    as:{barnabas:{look:async()=>{await say(BN,'sauls_roof_still_rigged_on_the_foredeck');treasure()}}}},
  {name:'rooftops_of_salamis',x:112,y:2,w:186,h:23,wx:210,look:'salamis_for'},
  {name:'marketplace',x:112,y:26,w:188,h:17,wx:206,look:'stoa_of_the_marketplace'},
  {name:'coppersmiths_stall',x:150,y:43,w:86,h:63,wx:194,wy:114,look:['pots_and_pans_of_cyprus','barnabas_says_the_metal'],pickup:'that_would_be_stealing_and'},
  {name:'synagogue',x:304,y:24,w:126,h:28,wx:366,look:'synagogue_of_plain_dressed_stone'},
  {name:'water_jar',x:321,y:87,w:14,h:20,wx:334,wy:113,look:'great_jar_of_water_beside_the_door',pickup:'it_would_take_two_men_to_lift'},
  {name:'door_of_the_synagogue',x:350,y:60,w:30,h:44,wx:365,wy:112,look:'the_door_of_the_synagogue',exit:()=>go4('synagogue',60,120,1)},
  {name:'west_gate',x:440,y:50,w:36,h:54,wx:456,wy:112,dir:1,look:'the_west_gate',exit:westRoad}]};
/* ---------- The synagogue ---------- */
async function vouch(){
  if(F.spoke)return say(ZA,'i_am_still_reading_joseph');
  if(F.vouched)return say(ZA,'after_the_reading_joseph');
  await say(BN,'peace_to_you_zadok');
  await say(ZA,'joseph_said');
  await say(ZA,'man_with_you');await say(BN,'saul_of_tarsus_said');
  await ask(BN,ZA,'many_men_have_something_to_say',[
    {q:'he_was_educated_at_the_feet',r:['learned_men_have_misled']},
    {q:'because_every_jew_on_this_island',r:['needs_to_that_is']},
    {q:'let_him_speak_after_the_reading',ok:1,
      p:['have_the_law_and_the_prophets','if_it_is_not_written_there'],
      r:['by_the_scroll','i_can_hardly_refuse_a_man']}]);
  F.vouched=1;SFX.good();if(P.room===G.room){BN.dir=P.x>BN.x?1:-1;await say(BN,'platform_is_yours_after_the_reading_saul')}}
/* part: one step of the talk. Saul thinks what comes next; a choice that runs ahead of his hearers is answered by them, and set aside. */
async function part(think,opts){let av=opts.slice();
  for(;;){await say(P,think,TH);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p)await say(P,l,{to:null});for(const[a,l,x]of o.r)await say(a,l,x);if(o.ok)return;av=av.filter(x=>x!==o)}}
async function speak(){
  await say(ZA,'take_your_seats_all_of_you',{to:null});
  await Promise.all([walk(ZA,160,110),walk(P,118,124),walk(BN,54,128)]);ZA.dir=-1;P.dir=1;BN.dir=1;
  await say(ZA,'here_is_my_servant_isaiah_42_1',{to:null});
  await say(ZA,quote('isa42'),{to:null});
  await walk(ZA,214,113);ZA.dir=-1;
  await say(ZA,'brothers_visitors_if_you');
  await walk(P,160,111);P.dir=-1;
  await part('word_of_encouragement',[
    {q:'one_you_wait_for_has_come',p:['men_brothers_the_one_you'],
      r:[[PH,'he_begins_with_an_accusation'],[ZA,'stranger_we_do_not_yet']]},
    {q:'i_was_educated_at_the_feet',p:['men_brothers_i_was_educated'],
      r:[[PH,'is_it_himself_he_has_come'],[ZA,'reading_was_about_the_servant']]},
    {q:'you_heard_it_read_the_islands',ok:1,
      p:['men_brothers',
        'you_live_on_an_island_and_you'],
      r:[[PH,'that_is_true_enough'],[ZA,'go_on']]}]);
  await part('they_are_with_me',[
    {q:'law_of_moses_could_never',p:['brothers_there_are_things'],
      r:[[PH,'now_he_speaks_against_moses'],[ZA,'you_are_far_ahead_of_us_visitor']]},
    {q:'god_promised_david_an_offspring',ok:1,
      p:['he_brought_our_forefathers','to_david_he_promised_2_samuel_7_12'],
      r:[[JR,'son_of_david'],[ZA,'every_child_here_knows_that_promise']]},
    {q:'this_good_news_is_for_the_nations',p:['this_good_news_is_not_for_israel'],
      r:[[PH,'for_the_greeks'],[ZA,'first_tell_us_what_it_is_visitor']]}]);
  await part('promise_is_before_them',[
    {q:'apostles_have_done_many_signs_and_wonders',p:['apostles_in_jerusalem_acts_5_12'],
      r:[[PH,'paphos_is_full_of_men_who'],[ZA,'you_asked_to_be_tested']]},
    {q:'from_davids_offspring_god',ok:1,
      p:['god_kept_that_promise_out_of_davids',
        'in_jerusalem_they_had_him',
        'david_wrote_that_god_psalm_16_10'],
      r:[[PH,'raised_from_the_dead'],[JR,'it_is_so_i'],[ZA,'let_him_finish_jair',{to:JR}]]},
    {q:'take_care_the_prophets',p:['beware_brothers_habakkuk_1_5'],
      r:[[PH,'he_threatens_us_before'],[ZA,'warning_comes_last_visitor']]}]);
  await part('they_have_heard_who_he_is',[
    {q:'whoever_pushes_this_away',p:['whoever_pushes_this_word'],
      r:[[PH,'we_have_not_rejected_anything_yet'],[ZA,'no_one_here_has_refused_you_visitor']]},
    {q:'that_is_all',p:['that_is_what_i_came_to_say'],
      r:[[ZA,'you_tell_us_that_the_christ']]},
    {q:'through_him_comes_the_forgiveness_of_sins',ok:1,
      p:['brothers_here_is_the_news',
        'you_said_you_would_test'],
      r:[[ZA,'you_have_given_us_a_great'],
        [PH,'will_i'],
        [JR,'any_who_want_to_hear_more',{to:null}]]}]);
  F.spoke=1;SFX.good();await fade(1,500);place(P,'synagogue',126,122,-1);place(BN,'synagogue',100,126,1);
  await narr('they_set_about_preaching_acts_13_5',{dur:7500});await fade(0,500);
  await say(BN,'one_end_of_the_island_has')}
ZA.hs={name:'Zadok',actor:ZA,look:'zadok_a_presiding_officer_of_the_synagogue',
  show:{tablets:'wax_tablets_q',awl:'a_craftsman',
    '*':'this_is_a_house_of_reading'},
  ask:{hearing:'by_being_known_to_me_stranger'},
  talk:async()=>{if(F.spoke)return say(ZA,'i_am_reading_saul_of_tarsus');
    if(F.vouched)return speak();F.metZad=1;
    await say(P,'peace_to_you_we');
    await say(ZA,'peace_to_you_stranger');
    await say(ZA,'platform_is_another_matter');
    await say(P,'he_does_not_know_me',TH)},
  as:{barnabas:{look:'zadok_said',talk:vouch,show:{'*':'put_it_away_joseph'}}}};
PH.hs={name:'Philon',actor:PH,look:()=>say(P,F.spoke?'philon_said':'merchant_by_his_dress'),
  show:{tablets:'you_carry_the_prophets_in_wax','*':'i_am_not_buying_today_stranger'},
  ask:{hearing:'do_not_ask_me'},
  talk:async()=>{await say(PH,F.spoke?'i_said_i_would_search_it':'philon_of_salamis');
    if(!F.spoke){await say(P,'saul_of_tarsus_a');await say(PH,'tentmaker_come_to_a_synagogue_in_cyprus')}},
  as:{barnabas:{look:'philon_his',talk:()=>say(PH,'son_of_the_levite'),show:{'*':'i_am_not_buying_today'}}}};
ROOMS.synagogue={space:1.5,walk:[16,304,110,136],mood:'calm',amb:{crowd:.12,fire:.15},hs:[
  {name:'door_to_the_square',x:8,y:53,w:24,h:51,wx:32,wy:113,dir:-1,look:'the_door_to_the_square',exit:()=>go4('salamis',365,116,-1)},
  {name:'window',x:66,y:20,w:22,h:26,wx:92,look:'a_high_window'},
  {name:'window',x:232,y:20,w:22,h:26,wx:228,look:'a_high_window'},
  {name:'lamp',x:109,y:46,w:18,h:22,wx:118,look:'lamp_in_a_niche_of_the_wall',pickup:'it_gives_light_to_the_whole'},
  {name:'lamp',x:193,y:46,w:18,h:22,wx:186,look:'lamp_in_a_niche_of_the_wall',pickup:'it_gives_light_to_the_whole'},
  {name:'bench',x:42,y:86,w:96,h:18,wx:112,wy:113,look:['bench_along_the_wall_worn','people_sit_on_three_sides'],
    use:()=>say(P,F.spoke?'i_have_sat_and_i_have_spoken':'soon_said')},
  {name:'reading_platform',x:110,y:80,w:100,h:28,wx:160,wy:112,look:['platform_and_the_reading_desk','any_son_of_israel_may_be'],
    use:()=>say(P,F.spoke?'i_have_said_what_i_came':F.vouched?'zadok_will_call_me_up_after':'uninvited'),
    pickup:'scroll_belongs_to_the_synagogue'},
  {name:'seats_of_the_presiding_officers',x:184,y:70,w:58,h:34,wx:176,wy:113,look:'seats_of_the_presiding'},
  {name:'chest_of_the_scrolls',x:248,y:58,w:38,h:46,wx:262,wy:113,look:['chest_where_the_scrolls','everything_i_have_to_say'],
    open:'it_is_not_mine_to_open',use:'it_is_not_mine_to_open',pickup:'it_is_not_mine_to_open'}]};
/* ---------- Paphos ---------- */
/* The hearing. Elymas raises three objections, and each is answered in its own way: the first by Barnabas, who was born on the island;
   the second by Paul's trade, shown rather than argued; the third from the Scriptures. Then the account takes its course (Acts 13:8-12). */
async function hearing0(){if(F.heard)return;
  await say(SP,'you_are_the_two_men_who');
  await say(SP,'i_am_told_you_teach_of_a_god');
  await say(EL,'proconsul_is_this_wise',{to:SP});
  await say(SP,'i_have_you_elymas');
  await say(BN,'barnabas_sir',{to:SP});
  await say(P,'saul_of_tarsus_but');
  await say(SP,'paulus');
  await say(P,'i_have_had_it_as_long_as_i');F.heard=1;
  await say(EL,'proconsul_look_at_them',{to:SP});
  await say(EL,'such_men_sail_in_stir_up_a_city');
  await say(SP,'it_is_a_fair_question',{to:P})}
async function sayFee(){await say(EL,'what_will_this_teaching_cost_you_proconsul',{to:SP});
  await say(EL,'ask_them_their_fee_before');
  await say(SP,'another_fair_question',{to:PC()})}
async function hearPaul(){
  if(!F.ob1){await say(P,'sir_cyprus_is_not_my_island');
    await say(SP,'you_are_a_stranger_here');
    return say(P,'i_am_but',TH)}
  if(!F.ob2){await say(P,'we_ask_nothing_of_you_sir');
    await say(EL,'words_proconsul',{to:SP});
    return say(P,'he_is_right_about_one_thing',TH)}
  return daniel()}
async function hearBarn(){
  if(F.ob2)return say(SP,'it_is_your_friend_whom');
  if(F.ob1){await say(BN,'nothing_sir_acts_4_37',{to:SP});
    return say(SP,'generous_man')}
  await say(BN,'sir_i_am_no_stranger_here_acts_4_36',{to:SP});
  await say(BN,'i_know_the_road_from_salamis');
  await say(SP,'son_of_the_island');
  await say(EL,'one_of_them_is_proconsul',{to:SP});F.ob1=1;SFX.good();return sayFee()}
async function showTools(it){if(!['awl','knife','thread'].includes(it)||!F.ob1||F.ob2)return false;
  await say(P,it==='awl'?'this_is_my_answer_sir':it==='knife'?'this_is_my_answer_sir_said':'this_is_my_answer_sir_waxed');
  await say(P,'wherever_i_teach_i_work');
  await say(SP,'craftsmans_hands');
  await say(SP,'elymas_you_are_paid_by_this_house',{to:EL});F.ob2=1;SFX.good();
  await say(EL,'proconsul_i_am_of_their_own_nation');
  await say(EL,'their_prophet_daniel_served');
  return daniel()}
async function daniel(){
  await ask(P,SP,'is_that_written_paulus',ORDER.map(k=>k==='dan2'?{q:label(k),k,ok:1,
      p:['it_is_written_that_the_king',quote(k),
        'daniel_never_claimed_the_sorcerers_art_sir'],
      r:['man_himself_denied_the_art',[SP,'elymas_that_part_you_did',{to:EL}]]}
    :{q:label(k),k,p:[quote(k)].concat(k==='deut18'?['that_is_the_law_of_moses_sir']:[]),r:[{
      ps133:[SP,'unity_among_brothers'],
      isa42:[SP,'fine_saying_about_islands'],
      sam7:[SP,'that_concerns_a_king_of_yours'],
      ps16:[EL,'he_changes_the_subject_proconsul',{to:SP}],
      hos14:[EL,'straight_ways'],
      deut18:[EL,'yet_your_daniel_held_the_office_paulus']}[k]]}));
  return finale4()}
SP.hs={name:'sergius_paulus',actor:SP,look:'sergius_paulus_proconsul_of_cyprus',
  give:showTools,
  show:{awl:'workmans_tool',knife:'workmans_tool',
    thread:'workmans_tool',
    tablets:'your_notes','*':'keep_it_i'},
  ask:{elymas:['bar_jesus_said','he_advises_me']},
  talk:hearPaul,
  as:{barnabas:{look:'the_proconsul',talk:hearBarn,
    show:{bstaff:'well_worn_staff','*':'keep_it_i'}}}};
EL.hs={name:'bar_jesus',actor:EL,wx:296,wy:124,look:'bar_jesus_whom_acts_13_6_8',
  show:{tablets:'scratches_in_wax','*':'take_it_away'},
  talk:()=>say(EL,'i_have_nothing_to_say_to_you'),
  as:{barnabas:{look:'one_they_call_elymas',
    talk:()=>say(EL,'levite_are_you'),show:{'*':'take_it_away_said'}}}};
ROOMS.paphos={space:1.2,walk:[16,384,110,138],mood:'tense',amb:{waves:.35,fire:.35,gulls:.25},enter:hearing0,hs:[
  {name:'door_to_the_city',x:30,y:48,w:32,h:56,wx:48,wy:112,dir:-1,look:'the_door_to_the_city',
    use:'proconsul_has_called_for_us',
    open:'proconsul_has_called_for_us'},
  {name:'harbor_of_paphos',x:112,y:16,w:178,h:64,wx:200,wy:112,look:['harbor_of_paphos_between','from_here_the_ships_sail']},
  {name:'brazier',x:122,y:90,w:20,h:17,wx:150,wy:113,dir:-1,look:'bronze_brazier',pickup:'it_is_hot_and_it_is_not'},
  {name:'proconsuls_table',x:241,y:82,w:46,h:22,wx:262,wy:113,look:['scrolls_in_greek_and_in_latin','governor_who_reads'],
    pickup:'they_are_the_proconsuls'},
  {name:'proconsuls_seat',x:338,y:54,w:36,h:42,wx:308,wy:113,look:'seat_of_the_governor_of_cyprus'}]};
/* ---------- Barnabas's side of things, when he is the one being played ---------- */
const AS_B={
  seleucia:{'mountain':{look:'mountain_above_seleucia'},'town_wall':{look:'seleucias_wall'},
    'gate_to_the_antioch_road':{look:'the_road_to_antioch',use:'not_that_way',open:'not_that_way'},
    'mole':{look:'mole_and_beyond_it_the_sea'},'cargo':{look:'wine_oil_and_grain_for_cyprus'},
    'coil_of_cord':{look:'ships_cord_tarred',useWith:async()=>say(BN,BARN4.noCraft)},
    'our_baggage':{look:'john_mark_has_packed_as_if_we'},
    'ship':{look:'cyprus_trader'}},
  salamis:{'harbor':{look:'i_learned_to_swim_in_that_harbor'},'rooftops_of_salamis':{look:'salamis_i'},
    'marketplace':{look:'the_marketplace'},
    'coppersmiths_stall':{look:'cyprus_copper'},
    'synagogue':{look:'synagogue_of_my_boyhood'},'water_jar':{look:'same_jar_i_do_believe'},
    'door_of_the_synagogue':{look:'i_have_not_been_through'},'west_gate':{look:'the_road_to_paphos'}},
  synagogue:{'door_to_the_square':{look:'the_door_to_the_square'},'window':{look:'light_still_falls_where_the_reader_stands'},'lamp':{look:'it_was_my_task_as_a_boy'},
    'bench':{look:'my_family_sat_just_there'},
    'reading_platform':{look:'i_read_from_that_desk_as_a_young',use:()=>say(BN,F.spoke?'it_has_been_well_used_today':'it_is_saul_who_should_stand')},
    'seats_of_the_presiding_officers':{look:'the_seats_of_the_presiding_officers'},
    'chest_of_the_scrolls':{look:'the_chest_of_the_scrolls',open:'it_is_in_the_keeping_of_the_synagogue',use:'it_is_in_the_keeping_of_the_synagogue'}},
  paphos:{'door_to_the_city':{look:'door_we_came_in_by',use:'we_do_not_walk_out_on_a_man',open:'we_do_not_walk_out_on_a_man'},
    'harbor_of_paphos':{look:'the_harbor_of_paphos'},'brazier':{look:'a_brazier'},
    'proconsuls_table':{look:'more_books_than_i_have'},'proconsuls_seat':{look:'seat_of_the_governor'}}};
for(const r in AS_B)for(const h of ROOMS[r].hs)if(AS_B[r][h.name])h.as={barnabas:AS_B[r][h.name]};
/* ============ SCENES: intro, the journeys, ending; PRAYER HINTS ============ */
/* arrive4: after the map has drawn the way. By sea to Salamis: the crossing, under the roof Saul sewed. By road to Paphos: the island. */
async function arrive4(to){place4(G.room);for(const a of party()){const inv=invOf(a),i=inv.indexOf('shelter');if(i>=0)inv.splice(i,1)}drawInv();
  if(to==='salamis'){place(JR,'salamis',330,118,-1);const sea=G.sea={k:0};G.scene=voyageScene;AU.mood='calm';AU.amb={waves:.8,wind:.5,creak:.5};await fade(0,600);
    tween(30000,k=>{sea.k=k});
    await narr('they_put_to_sea_bound_for_cyprus_acts_13_4',{dur:4500});
    await narr('merchant_ship_gave_its_passengers',{dur:7000});
    await say(BN,'my_staff_for_a_ridge_pole');
    await say(P,'there_is_a_place_under_it');
    await say(JR,'under_the_roof_of_saul_of_tarsus');
    await say(MK,'bread_and_figs_for_four_then');
    await narr('ahead_lay_cyprus_acts_4_36',{dur:5000});
    await fade(1,500);G.scene=null;G.sea=null;AU.mood=ROOMS.salamis.mood;AU.amb=ROOMS.salamis.amb}
  if(to==='paphos'){const o={dur:7500};
    await narr('they_crossed_the_island',o);
    await narr('at_night_the_roof_that_saul',{dur:6000});
    await narr('there_in_paphos_acts_13_6',o);
    await narr('this_man_kept_acts_13_7',{dur:9000})}}
async function start4(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(4);G.end={};enterRoom('seleucia',...ENT.seleucia);G.send={lay:0};G.scene=sendoffScene;AU.mood='calm';AU.amb={birds:.3,wind:.15};codeBtn();await fade(0,600);
    await narr('antioch_in_syria_about_47_c_e',{dur:2800});
    await narr('congregation_there_had_acts_13_1',{dur:8000});
    await narr('while_they_were_acts_13_2',{dur:9500});
    G.send.lay=1;SFX.pray();await wait(900);
    await narr('they_fasted_and_prayed_acts_13_3',{dur:7000});
    await fade(1,600);G.scene=null;G.send=null;AU.mood=ROOMS.seleucia.mood;AU.amb=ROOMS.seleucia.amb;codeBtn();await fade(0,600);
    await narr('sent_on_their_way_acts_13_4_5',{dur:9000});
    await say(BN,'seleucia_saul');
    await say(MK,'bed_rolls_the_food_bag',{to:BN});
    await say(P,'all_we_lack_is_a_ship')},true)}
async function finale4(){playAs(P);await wait(300);
  await say(EL,'proconsul_enough');
  await narr('elymas_the_sorcerer_acts_13_8',{dur:7000});
  await walk(P,300,120);P.dir=1;
  /* the account first calls him Paul here, as he faces Elymas, and so does the game from this line on (CONTRIBUTING section 2) */
  P.called='Paul';swapBtn();await narr('here_the_account_acts_13_9',{dur:8000});
  await say(P,'son_of_the_devil');
  await say(P,'jehovahs_ways_are_acts_13_10');
  await say(P,'now_jehovahs_hand_acts_13_11');
  EL.bow=true;await wait(700);
  await narr('at_once_a_dense_acts_13_11',{dur:8500});
  EL.speed=24;await walk(EL,352,128);await say(EL,'a_hand');await walk(EL,330,134);await fade(1,400);EL.room=null;EL.bow=false;EL.speed=0;await fade(0,400);
  await say(SP,'every_morning_that_man');
  await say(SP,'you_paulus_you_asked_me');
  await fade(1,600);AU.mood='hope';
  await narr('what_the_proconsul_acts_13_12',{dur:8500});
  await journey();await narr('from_paphos_paul_acts_13_13',{dur:6000});
  endScreen({title:'sent_out_to_cyprus_2',text:'paul_sewed_a_roof_for_a_ships',
    based:'based_on_acts_13_1_12_4',
    go:'click_to_continue_to_chapter_five',code:['chapter_five_code_code',codeOf(5,0)]});
  await wait(1500);ov.onclick=()=>startChapter(5);await new Promise(()=>{})}
function hint4(){const b=PC()!==P,craft=['craft4',['that_is_the_tentmakers_craft_not_mine','saul_should_do_this_part']];
  if(inSel()){
    if(!F.metKal)return['kal4',['we_were_sent_off_to_cross','i_should_talk_to_the_shipmaster']];
    if(!F.shelter)return b?craft:!F.gotCord?['cord4',['tent_on_a_deck_cannot_be',
        'my_knife_can_cut_a_length']]
      :['sew4',['cloth_cord_awl_and_thread','i_can_sew_the_tarred_cord']];
    if(!F.jairOk)return F.jairB?(b?['own4b',['i_have_said_my_part','saul_should_talk_to_jair_himself_now']]
        :['own4',['he_will_hear_me_now','i_should_talk_to_jair_and_say']])
      :b?['jair4b',['old_man_will_not_speak_to_saul','i_should_talk_to_the_old']]
      :['jair4',['old_man_knows_my_name_and_it','barnabas_should_speak_with_the_old']];
    return['board4',['roof_is_sewn_and_there','we_can_go_up_the_gangplank']]}
  if(inSal()){
    if(!F.vouched)return b?['zad4b',['zadok_guards_his_platform','i_should_talk_to_zadok']]
      :['zad4',['stranger_does_not_climb_a_platform_unasked','barnabas_should_speak_to_zadok']];
    if(!F.spoke)return b?['speak4b',['i_have_opened_the_door','saul_should_talk_to_zadok_now']]
      :['speak4',['word_of_encouragement_has_an_order',
        'i_should_talk_to_zadok_said']];
    return['west4',['salamis_has_heard','we_can_leave_by_the_west']]}
  if(!F.ob1)return b?['isle4b',['he_calls_us_strangers','i_should_talk_to_the_proconsul_myself']]
    :['isle4',['he_asks_what_cyprus_is_to_us','barnabas_should_answer_the_proconsul']];
  if(!F.ob2)return b?['fee4b',['it_is_saul_whom_elymas','saul_should_show_the_proconsul']]
    :['fee4',['he_says_we_want_money','i_should_show_the_proconsul_my_awl']];
  return b?['dan4b',['elymas_twists_the_scriptures','saul_should_answer_the_proconsul']]
    :['dan4',['he_twists_the_scriptures','i_should_talk_to_the_proconsul']]}
/* ============ CHAPTER DEFINITION ============ */
/* Birds (shared/birds.js): gulls over the harbors, birds of prey, swallows and larks over open country, sparrows and doves on the
   roofs and walls of the towns; by day and in fair weather only. Scenery: they change nothing in the story. */
ROOMS.seleucia.birds={gulls:[130,6,330,30],stand:[[262,102,-1],[400,102.5,1]]};
ROOMS.salamis.birds={gulls:[6,5,100,30],gullsN:2,stand:[[40,98.5,1]]};
ROOMS.paphos.birds={gulls:[170,14,50,20],gullsN:1};
/* What stands on the floor (issue #83): the cargo, the posts, the platform, the brazier and the tables all stand behind the walk strip;
   only the baggage John Mark keeps beside him in Salamis and in Paphos reaches into it, and it lies where he stands (see draw). */
ROOMS.salamis.block=()=>MK.room==='salamis'?[MK.x-53,MK.y-17,47,4]:[];
ROOMS.paphos.block=()=>MK.room==='paphos'?[MK.x-15,MK.y-16,47,4]:[];

return{rooms:['seleucia','salamis','synagogue','paphos'],setup:setup4,start:start4,hint:hint4,music:MUSIC,scenes:{sendoff:sendoffScene,voyage:voyageScene},topics:TOPICS,tablets:TABLETS,
  /* the first missionary journey is drawn on its own: the sea lane from Caesarea to Tarsus (Chapter Two) runs between Cyprus and Syria,
     where the ship from Seleucia must pass, and routes on the map never cross */
  route:[['antioch','seleucia','new'],['seleucia','salamis','new sea'],['salamis','paphos','new']],
  /* names that would lie across this chapter's routes on their usual side */
  labels:{salamis:{lab:'r',dy:4.2}},
  places:{
    seleucia:{room:'seleucia',x:300,y:122,dir:-1,if:()=>false,no:'we_were_sent_out_not_back'},
    salamis:{room:'salamis',x:150,y:122,dir:1,if:()=>inSel()},
    paphos:{room:'paphos',x:150,y:124,dir:1,if:()=>G.room==='salamis'&&F.spoke,no:'paphos_lies_at_the_far'}},
  way:()=>inSel()?[]:[['seleucia','salamis']],arrive:arrive4,
  flags:['metKal','gotCord','shelter','metJair','jairB','jairOk','landed','metZad','vouched','spoke','heard','ob1','ob2'],
  codeBits:{rooms:3,share:10},party:['paul','barnabas'],home:{bstaff:'barnabas'},share:['awl','thread','knife','tablets','haircloth','cord','shelter','bstaff'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets'],add=(c,id)=>{if(c)inv.push(id)},sel=room==='seleucia';
    add(sel&&!F.shelter,'haircloth');add(sel&&F.gotCord&&!F.shelter,'cord');add(sel&&F.shelter,'shelter');inv.push('bstaff');return inv},
  place:place4}
});
