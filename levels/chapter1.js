/* Paul of Tarsus: level data for Chapter One, "Escape from Damascus".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints. */
LEVEL(1,()=>{
"use strict";
const{plank:plank1,board:board1,crack:crack1,skipCracks:skipCracks1,shadow:shadow1,earth:earth1,joistAO:joistAO1}=SHARED.materials;

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* Damascus by night, in D Hijaz: an oud over a drone, a frame drum, and a ney that enters in the second half.
   On the title screen and at the end of the prologue (mood "ancient") the full Eastern Mediterranean ensemble opens with a two-bar
   fanfare and states the eight-bar melody on ney, aulos with tonic drone pipe, strumming lyre, harp, oud, walking bass and road
   percussion before cross-fading at bar 11 into "calm". In the prologue's opening (mood "stones") nothing is held: a low string
   plucks the keynote and, late in the bar, the note above it, under the slow drum; in the house of Judas (mood "harp") a harp plays
   alone; in the watched street (mood "tense") nothing is held either: the low string plucks the keynote in threes, threes and twos
   and leans on the note above it, the drum ticks with it and almost stops every fourth bar, and the ney begins the tune and breaks
   off a note before it comes home; and when Paul is safely outside the wall (mood "hope") the ney plays an octave higher. */
const _=null,
 NEY=[[[0,4,6],[6,5,2],[8,4,4],[12,3,2],[14,2,2]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,4,12]],
  [[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,5,2],[2,4,2],[4,3,4],[8,2,4],[12,1,4]],[[0,2,3],[3,1,1],[4,0,4],[8,1,2],[10,2,2],[12,1,4]],[[0,0,14]]],
 FANFARE_HARP=[[[0,0,2],[2,2,2],[4,4,4],[8,7,2],[10,8,2],[12,7,4]],[[0,4,2],[2,7,2],[4,9,2],[6,11,2],[8,14,8]]],
 MUSIC={dt:.165,root:50,scale:[0,1,4,5,7,8,10],bars:16,overture:'ancient',tracks:[
  {drone:[-12],every:32,moods:['ancient','calm','hope']},
  {inst:'bass',moods:['ancient'],prog:'MMAABACABA',len:6,seq:{
    M:[-7,_,_,_,_,_,_,-3,-7,_,_,_,_,_,_,_],A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],
    B:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,-5,_]}},
  {inst:'oud',moods:['ancient','calm','hope'],prog:'MMAABACABAABACAB',seq:{
    M:[0,_,4,_,7,_,4,_,0,_,4,_,7,_,11,_],A:[0,_,4,_,7,_,4,_,0,_,4,_,8,_,7,_],
    B:[3,_,5,_,7,_,5,_,3,_,5,_,9,_,7,_],C:[1,_,3,_,5,_,3,_,1,_,4,_,6,_,4,_]}},
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,group:[3,3,2],vol:1.6,seq:{
    A:[-7,_,_,-7,_,_,-6,_,-7,_,_,-7,_,_,_,_],B:[-7,_,_,-7,_,_,-6,_,-6,_,_,-7,_,_,-10,_],C:[-7,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',group:[3,3,2],seq:{A:'d..k..k.d..k..k.',B:'d..k..k.d..k.kk.',C:'d...............'},vol:1.1},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:1.45,lines:[NEY[0],NEY[1].slice(0,-1),[],[],NEY[4],NEY[5].slice(0,2),[],[]]},
  {inst:'bass',moods:['stones'],len:4,vol:.8,seq:{A:[-7,_,_,_,_,_,_,_,_,_,-6,_,_,_,_,_]}},
  {inst:'lyre',moods:['ancient'],prog:'MMAABACABA',len:3,vol:.95,seq:{
    M:[0,_,_,4,_,_,7,_,4,_,_,7,_,11,_,_],A:[0,_,_,4,_,_,7,_,4,_,_,8,_,_,7,_],
    B:[3,_,_,5,_,_,7,_,5,_,_,9,_,_,7,_],C:[1,_,_,3,_,_,5,_,3,_,_,6,_,_,4,_]}},
  {inst:'harp',moods:['ancient'],oct:12,vol:.95,lines:[
    ...FANFARE_HARP,
    [[4,4,4],[12,8,4]],[[4,3,4],[8,7,6]],[[4,4,4],[12,9,4]],[[4,7,2],[6,8,2],[8,9,2],[10,11,6]],
    [[2,4,2],[4,7,2],[6,11,2],[10,9,2],[12,7,4]],[[2,5,2],[4,7,2],[6,9,2],[10,7,2],[12,4,4]],
    [[2,4,2],[6,7,2],[10,5,2],[14,4,2]],[[0,0,2],[2,4,2],[4,7,4],[8,14,8]]]},
  {inst:'harp',moods:['harp'],prog:'ABAC',len:6,oct:12,vol:.75,seq:{
    A:[0,_,_,_,4,_,_,_,2,_,_,_,0,_,_,_],B:[3,_,_,_,5,_,_,_,4,_,_,_,2,_,_,_],C:[1,_,_,_,4,_,_,_,3,_,_,_,0,_,_,_]}},
  {inst:'ney',moods:['ancient'],oct:12,vol:1.15,lines:[[],[],...NEY]},
  {inst:'aulos',moods:['ancient'],hold:0,oct:12,vol:.85,lines:[
    [],[],[[0,4,6]],[[8,0,8]],[[8,5,4],[12,4,4]],[[0,4,8],[8,5,4],[12,6,4]],...NEY.slice(4)]},
  {drum:1,moods:['ancient'],prog:'FFAAABAAAC',seq:{
    F:'b...d.t.d.ktd.tk',A:'d.skt.s.d.skt.sk',B:'b.skt.s.d.skt.tk',C:'b.skt.s.b...d...'}},
  {drum:1,moods:['calm','hope'],seq:{A:'d.t...t.d...t.k.'}},
  {drum:1,moods:['stones'],seq:{A:'d.......d.......'},vol:1.35},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:NEY},
  {inst:'ney',moods:['hope'],from:8,oct:24,lines:NEY}]};

/* ============ ART ============ */
/* A large reed basket. x,y = bottom-left; 28 wide, 24 tall. L tints the colors for the light in the room. */
function basketArt(g,x,y,strong,L){L=L||(c=>c);const m=x+14,hw=t=>9.5+4.5*Math.sin(Math.min(1,t/.62)*1.5708),p=[];
  for(let j=0;j<=22;j++)p.push(m-hw(j/22),y-j);for(let j=22;j>=0;j--)p.push(m+hw(j/22),y-j);
  shadow1(g,m+2,y,15,2.2,.36);
  clipTo(g,()=>poly(g,p),()=>{R(g,x,y-23,28,23,L('#7a5a28'));
    for(let j=0;j<46;j++){const yy=y-.5-j*.5;if(j%2)R(g,x,yy,28,.5,L('#8e6c34'));
      for(let i=(j>>1)%2*2.5+(j%2)*.5;i<28;i+=5)R(g,x+i,yy,2.5,.5,L(j%2?'#c9a258':'#b48e48'))}
    for(let i=2.5;i<28;i+=5)R(g,x+i,y-23,.5,23,'rgba(40,24,8,.35)');
    g.fillStyle=lg(g,x,0,x+28,0,[[0,'rgba(20,10,0,.3)'],[.28,'rgba(255,225,160,.2)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(20,10,0,.55)']]);g.fillRect(x,y-23,28,23);
    ao(g,x,y-6,28,6,'b',.35)});
  R(g,x-.5,y-24.5,29,2.5,L('#6a4c20'));R(g,x,y-25,28,1,L('#d2ac60'));for(let i=0;i<28;i+=2)R(g,x+i,y-24,1,1.5,L('#a88442'));
  if(strong){const s=L('#4a2c18'),h=L('#7a4e2c');for(const sx of[x+5,x+21]){R(g,sx,y-31,2.5,30,s);R(g,sx,y-31,.5,30,h);for(let j=3;j<22;j+=3)R(g,sx+1,y-j,.5,1,L('#d8c9a0'))}
    R(g,x+5,y-32,18.5,2.5,s);R(g,x+5,y-32,18.5,.5,h)}
  else{const f=L('#a08a56');stroke(g,[x+4.5,y-25,x+4.5,y-28.5,x+8,y-29.5],f,.7);stroke(g,[x+9.5,y-25,x+9.5,y-27.5],f,.7);stroke(g,[x+23.5,y-25,x+23.5,y-28.5,x+20,y-29.5],f,.7);
    R(g,x+8,y-30,.5,1.5,f);R(g,x+19.5,y-30,.5,1.5,f)}}
/* A coil of rope hanging from a peg at x,y. */
function coilArt(g,x,y,n,L,c){c=c||'#b89a5a';L=L||(k=>k);R(g,x-.5,y-5,1.5,5,L(tint(c,-.2)));
  for(let i=0;i<n;i++){const yy=y+i*2,cc=L(i%2?tint(c,-.22):c);g.strokeStyle=L(tint(c,-.5));g.lineWidth=2.6;g.beginPath();g.ellipse(x+.5,yy+1.2,4.6,1.9,0,0,6.2832);g.stroke();
    g.strokeStyle=cc;g.lineWidth=1.6;g.stroke();for(let a=0;a<8;a++){const q=a/8*6.2832;R(g,x+.5+Math.cos(q)*4.6-.25,yy+1.2+Math.sin(q)*1.9-.25,.5,.5,L(tint(c,.3)))}}}
/* ---------- materials and light (shared/materials.js, the standard of Chapter Fifteen's room of Gaius) ---------- */
/* floorGrain1: the grain of the floorboards in the upper room, in the perspective of its pave (vx 160, vy 70, two rows, step 15): each
   streak runs along its board toward the eye's point and stops inside its own row, so that no line crosses a joint */
function floorGrain1(g,r,c){const vx=160,vy=70,y0=105,y1=144,st=15,ys=[y0,y0+(y1-y0)*Math.pow(.5,1.2),y1],X=(i,y)=>vx+i*st*(y-vy)/(y1-vy);
  inRect(g,0,y0,320,y1-y0,()=>{for(let k=0;k<2;k++){const a=ys[k],b=ys[k+1],off=(k%2)*.5;
    for(let i=-40;i<40;i++){if(X(i+off,b)<-8||X(i+off,b)>328)continue;
      for(let n=0;n<3;n++){const f=off+.18+r()*.64,t0=a+.8+(b-a)*r()*.45,t1=Math.min(b-.6,t0+(b-a)*(.25+r()*.5));
        stroke(g,[X(i+f,t0),t0,X(i+f,t1),t1],r()<.55?rgba(tint(c,-.4),.32):rgba(tint(c,.3),.22),.5)}}}})}
/* ---------- Eliab's workshop: lamplight, reeds and goat-hair cloth ---------- */
/* the stool: it stands out on the floor of the workshop, so it is a prop as well, and hides the legs of whoever walks behind it */
function stoolArt(g){stroke(g,[122,111,120.5,119],'#3e2a1a',1.6);stroke(g,[133,111,134.5,119],'#3e2a1a',1.6);stroke(g,[127.5,111,127.5,118],'#2e1e12',1.4);
  board1(g,119.5,108,16,3,'#7a5632',rng(13));R(g,119.5,110.5,16,.5,'#3e2a1a')}
ART.workshop={w:320,q:12,
 props:[{y:119,shape:stoolArt,foot:[120,116.5,15,2.5]}],
 light:()=>({amb:'#827488',wallY:105,wall:[[7,67,105,13],[67,95,105,45],[95,313,105,13]],lamps:[[157,60,140,'#d8a860',106,66.5]]}),
 paint(g){const r=rng(11),W='#c9a476',T='#6b4a2e';
  plaster(g,0,0,320,105,W,r,{patch:7,cracks:0,brick:'#a8744c',bot:-.2,t:.36});skipCracks1(r,8);
  /* cracks cut by hand, high on the wall, where they run to no head; rb: a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(111);for(const[x,y,n]of[[30,18,4],[104,16,3],[198,19,4],[300,17,3]])crack1(g,x,y,n,rb)}
  comp(g,'multiply',.55,()=>R(g,0,84,320,21,'#b89070'));R(g,0,83.5,320,.5,'rgba(70,36,12,.4)');
  /* ceiling: joists run toward the viewer over a wall plate. The eye's point falls between two of them, so that every joist slants and
     none stands straight up on the plate as a T */
  const rw=rng(17);plank1(g,0,0,320,10,'#2a1d14',rw,0);ao(g,0,0,320,7,'t',.45,'#0c0808');
  for(let i=-1;i<9;i++){const a=23.5+i*38,k=1.17,x0=160+(a-160)*k,x1=160+(a+7-160)*k;joistAO1(g,a,x0,7,10,'#0c0808');poly(g,[a,10,a+7,10,x1,0,x0,0],T);
    clipTo(g,()=>poly(g,[a,10,a+7,10,x1,0,x0,0]),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,10,'overlay',.5));
    poly(g,[a+5,10,a+7,10,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,10,x0+.25,0],tint(T,.25),.5)}
  ao(g,0,7,320,2.5,'b',.3,'#0c0808');board1(g,0,9.5,320,3.5,'#5a3e28',rw);ao(g,0,13,320,9,'t',.5,'#2a2030');
  /* hanging from the joists: hoops of split willow and bunches of reed */
  for(const[hx,hy,n]of[[196,13,3],[304,13,2],[120,13,2]]){R(g,hx,hy,.5,6,'#3a2a1a');for(let i=0;i<n;i++){g.strokeStyle=i%2?'#a88a50':'#8a6e3c';g.lineWidth=1;g.beginPath();g.ellipse(hx+i*1.5,hy+11+i,5-i*.5,6-i*.4,0,0,6.2832);g.stroke()}}
  for(const hx of[36,268]){R(g,hx+2,13,.5,4,'#3a2a1a');for(let i=0;i<9;i++)stroke(g,[hx+i*.6,17,hx-3+i*1.4,31+r()*4],i%2?'#b09a5c':'#8a7844',.6);R(g,hx-.5,18.5,6,1.5,'#6a4a2c')}
  /* side walls close the room in */
  poly(g,[0,0,7,10,7,105,0,113],'#a8875f');poly(g,[320,0,313,10,313,105,320,113],'#9c7c56');ao(g,0,0,7,113,'l',.3);ao(g,313,0,7,113,'r',.3);
  /* the shade gathers in the corners where the side walls meet the back wall, and along the foot of the wall */
  ao(g,7,13,7,92,'l',.28,'#2a2030');ao(g,306,13,7,92,'r',.28,'#2a2030');ao(g,7,97,306,8,'b',.24,'#2a2030');
  /* floor: stone flags, fanning out from the far wall */
  pave(g,0,105,320,144,'#a89070',r,{vx:160,vy:74,rows:5,step:36,v:.09});ao(g,0,105,320,8,'t',.5,'#2a2030');ao(g,0,105,320,3,'t',.3,'#1a1420');
  /* door to the street */
  R(g,7.5,33,39,73,'#8f7252');doorArt(g,10,36,34,70,'#8a5c34',r);R(g,7.5,104,39,2.5,'#8a7a64');R(g,7.5,104,39,.5,'#b0a088');
  /* high window: deep reveal, night sky, two upright bars */
  R(g,67,21,28,24,'#a88a62');poly(g,[67,21,71,25,71,41,67,45],'#7a6040');poly(g,[67,45,71,41,91,41,95,45],'#d8ba8c');
  g.fillStyle=lg(g,0,25,0,41,['#0a0e2c','#1a2456']);g.fillRect(71,25,20,16);for(const[sx,sy]of[[74,28],[79,33],[86,27],[88,36],[82,38],[76,37]])R(g,sx,sy,.5,.5,'#e8e8ff');
  R(g,77,25,1,16,'#241810');R(g,84.5,25,1,16,'#241810');ao(g,71,25,20,3,'t',.6);
  /* the seaming frame, a goat-hair tent panel laced into it */
  ao(g,46,46,14,60,'r',.3);board1(g,56,51,3,55,'#5e4026',rw,1);board1(g,112,51,3,55,'#5e4026',rw,1);board1(g,54,48,63,3,'#70502e',rw);board1(g,57,97,58,2,'#4e3520',rw);
  g.fillStyle=lg(g,60,0,111,0,['#241c18','#3a2e27','#4c3d31']);g.fillRect(60,53,51,43);
  inRect(g,60,53,51,43,()=>{tex(g,'vert',.6,60,53,51,43,'overlay',.5);for(let j=0;j<43;j+=1)R(g,60,53+j,51,.5,j%2?'rgba(0,0,0,.14)':'rgba(255,240,210,.05)');
    for(let i=0;i<5;i++){R(g,69.5+i*10,53,.5,43,'rgba(0,0,0,.45)');R(g,70+i*10,53,.5,43,'rgba(255,235,200,.1)')}
    ao(g,60,53,51,6,'t',.4);ao(g,60,88,51,8,'b',.35)});
  for(let i=0;i<13;i++){stroke(g,[61+i*4,51,63+i*4,54],'#cdbb90',.5)}for(let j=0;j<10;j++){stroke(g,[59,55+j*4,61,57+j*4],'#cdbb90',.5);stroke(g,[112,55+j*4,110,57+j*4],'#cdbb90',.5)}
  /* shelf with dye jars and cakes of beeswax */
  ao(g,128,47,60,7,'t',.4);board1(g,127,44,62,3,'#70502e',rw);poly(g,[130,47,133,47,130,53],'#4e3520');poly(g,[186,47,183,47,186,53],'#4e3520');
  vessel(g,135,44,4,10,'#a8562e','jar',{bands:[[.5,'#5a2a16',1]]});vessel(g,146,44,3.4,8,'#8a744a','jug');vessel(g,177,44,4.2,11,'#8e4428','amph');
  R(g,169,41.5,5,2.5,'#c9a03c');R(g,169.5,39.5,4,2,'#d8b44c');R(g,169,41.5,5,.5,'#e8cc70');vessel(g,184.5,44,2.6,4,'#6f5a3a','bowl');
  /* reeds leaning in the corner by the bench */
  for(let i=0;i<16;i++){const bx=170+i*1.1+r()*1.5;stroke(g,[bx,105,bx+5+r()*4,50+r()*10],i%3?'#a8945a':'#857440',.7)}stroke(g,[173.5,82,190.5,81],'#7a5a34',1);stroke(g,[176,67,192.5,66],'#7a5a34',1);
  /* lamp stand */
  shadow1(g,152,106,9,2,.4);stroke(g,[151.5,98,146,106],'#3e2a1a',1.5);stroke(g,[151.5,98,157.5,106],'#3e2a1a',1.5);board1(g,150.5,72,2.5,33,'#4e3622',rw,1);
  oval(g,151.6,71,4.6,1.4,'#6b4a2e');vessel(g,151.6,70.4,4.6,3.4,'#b06a3a','bowl',{noShadow:1});poly(g,[154.6,67.4,159,67,159.5,68.4,154.6,69.6],'#a05c30');R(g,156.5,66.5,1.5,1,'#3a2416');
  /* stool */
  shadow1(g,127.5,119.5,10,2,.45);stoolArt(g);
  /* workbench, with a peg rail above it */
  board1(g,211,38,82,2.6,'#70502e',rw);ao(g,211,40.6,82,4,'t',.35);for(const px of[222,238,278]){R(g,px,37.5,2.5,4,'#3e2a1a');R(g,px,37.5,2.5,.5,'#8a6842')}
  /* the mallet hangs by a cord at the end of its handle from a peg that is not the rail's middle; its round head is turned to us, so that
     no head lies across the handle: the face, and a little of its side toward the middle of the room */
  stroke(g,[239.3,41,238,44,240.6,44,239.3,41],'#3a2a1a',.6);board1(g,238,43.5,2.6,9.4,'#a67c4a',rw,1);
  {const hx=239.3,hy=56.4,c='#8a6238';oval(g,hx-1.4,hy,3.4,3.6,tint(c,-.38));R(g,hx-1.4,hy-3.6,1.4,7.2,tint(c,-.38));oval(g,hx,hy,3.4,3.6,c);
   g.strokeStyle=tint(c,-.22);g.lineWidth=.5;g.beginPath();g.ellipse(hx,hy,2,2.2,0,.4,5.8);g.stroke();R(g,hx+1,hy-2.8,1.4,.6,tint(c,.3))}
  R(g,206,86,78,21,'rgba(20,10,6,.6)');ao(g,206,86,78,6,'t',.35,'#0c0808');board1(g,212,88,4,17,'#3e2a1a',rw,1);board1(g,273,88,4,17,'#3e2a1a',rw,1);
  board1(g,206.5,86,6,21.5,'#6a4628',rw,1);board1(g,277.5,86,6,21.5,'#6a4628',rw,1);board1(g,212.5,96.5,65,2.6,'#553820',rw);
  shadow1(g,209.5,107.4,5,1.2,.4);shadow1(g,280.5,107.4,5,1.2,.4);
  vessel(g,236,107,6.5,8,'#6a5030','bowl');for(let i=0;i<7;i++)stroke(g,[246+i*1.6,106.5,262+i*1.5,95+i*.4],i%2?'#8a7844':'#6e6036',.7);
  board1(g,202,80,86,5,'#9a6e40',rw);R(g,202,84.5,86,2,'#5e4026');R(g,202,80,86,.5,'#c89a62');
  for(let i=0;i<14;i++){const sx=206+r()*78;stroke(g,[sx,81+r()*3,sx+2+r()*5,81+r()*3],'rgba(50,28,10,.5)',.5)}
  ao(g,200,107,92,3,'t',.3);
  /* light: one small lamp, and the moon through the high window */
  /* light: the lamp first, then what it reaches: the floor round its foot, the bench at the right and the cloth in its frame at the left;
     the moon's cool fall from the high window, and a little of the street's night at the door. The ceiling, the corners and the near floor
     lie in the room's own shade. */
  lightmap(g,320,'#4e4258',l=>{pool(l,157,62,165,120,'#ffca84',.95);pool(l,157,64,70,56,'#ffe2a8',.8);pool(l,157,121,130,30,'#d89850',.55);
    pool(l,246,90,58,22,'#e8b878',.32);pool(l,86,78,44,34,'#e0b07c',.26);pool(l,157,110,40,7,'#ffd8a0',.3);
    comp(l,'lighter',.3,()=>poly(l,[71,26,91,26,128,140,84,144],lg(l,0,30,0,140,['rgba(120,150,255,.5)','rgba(120,150,255,.15)'])));
    pool(l,81,44,18,8,'#8c9ad8',.22);pool(l,27,100,26,10,'#6a72a8',.14);
    comp(l,'multiply',1,()=>{ao(l,0,0,60,144,'l',.45,'#1a1030');ao(l,262,0,58,144,'r',.5,'#1a1030');ao(l,0,0,320,26,'t',.5,'#1a1030');ao(l,0,128,320,16,'b',.35,'#1a1030');
      ao(l,0,0,320,12,'t',.3,'#1a1030')})});
  pool(g,157,64,26,20,'#ff9c40',.4)},
 fore(g){const r=rng(12);
  /* near the viewer: a stack of finished baskets, and a jar */
  for(const[bx,by,bw,bh]of[[-6,146,30,17],[-3,131,24,13]]){poly(g,[bx,by,bx+bw,by,bx+bw+2,by-bh,bx-2,by-bh],'#2a1c14');
    for(let j=1;j<bh;j+=1.5)for(let i=(j%3)*1.5;i<bw+2;i+=4)R(g,bx-1+i,by-j,2,.5,'#4a3422');R(g,bx-2.5,by-bh-1.5,bw+5,2,'#3a281a');R(g,bx-2,by-bh-1.5,bw+4,.5,'#6a4c30')}
  vessel(g,309,150,11,26,'#3a2418','pithos',{noShadow:1});ao(g,296,122,24,22,'r',.4)},
 draw(g,t){const id='workshop',L=(x,y)=>{const l=lightAt(id,x,y+18);return c=>l?mul(c,l):c};
  if(!F.gotRope)coilArt(g,223,46,5,L(223,50));
  if(!F.gotSkin){const k=L(279,50);R(g,279,41,.6,4,k('#4a3020'));oval(g,279.5,52.5,4.4,6.4,k('#5a3a20'));oval(g,278.6,51.8,3.4,5.4,k('#7a5230'));oval(g,277.6,50.5,1.2,2.6,k('#a07848'));
    R(g,278,44.5,3,3,k('#4a2f1a'));R(g,278,44.5,3,.5,k('#c9a14a'))}
  if(!F.gotKnife){const k=L(219,80);oval(g,220,80.6,8,1.4,'rgba(0,0,0,.35)');g.fillStyle=k('#d0d0dc');g.beginPath();g.ellipse(219.5,79.2,5.5,2.6,0,0,3.1416);g.fill();
    R(g,214,79.2,11,.5,k('#f4f4ff'));R(g,218,76,3.2,3.4,k('#7a4a24'));R(g,217.4,75,4.4,1.4,k('#9a6a38'))}
  if(!F.gotCloth){const k=L(252,78);clothRoll(g,238,82.5,30,8,k('#2a221c'),{shadow:1,k:.27})}
  if(!F.gotThread){const k=L(162,40);R(g,159,38,7,6,k('#e2d4aa'));for(let i=0;i<6;i++)R(g,159,38.5+i,7,.5,k(i%2?'#b5a67c':'#efe2bc'));R(g,158,37,9,1.2,k('#8a5a2c'));R(g,158,43.4,9,1.2,k('#6a4020'));R(g,165,38,1,6,'rgba(0,0,0,.25)')}
  if(!F.gotBasket)basketArt(g,290,110,false,L(304,100));
  flame(g,157,66,t);pool(g,157,63,22+Math.sin(t/190)*1.5,17,'#ff9838',.16+.03*Math.sin(t/83))},
 front(){}};
/* ---------- The street by night: moonlight, one lit window, a soldier's brazier ---------- */
function awningCloth(g,p,c,r){clipTo(g,()=>poly(g,p),()=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
    R(g,x0,y0,x1-x0,y1-y0,c);for(let i=0;i<x1-x0;i+=7)R(g,x0+i,y0,3.5,y1-y0,tint(c,-.25));
    for(let i=0;i<x1-x0;i+=7)R(g,x0+i+3.5,y0,.5,y1-y0,tint(c,.12));ao(g,x0,y0,x1-x0,Math.min(4,y1-y0),'t',.45)})}
ART.street={w:480,fp:1.3,q:12,
 light:()=>({amb:'#7f88b8',wallY:103,wall:[[0,83,103,31],[83,101,103,73],[101,140,103,31],[140,236,103,84],[257,425,103,25],[455,480,103,35]],lamps:[[248,98,80,'#c08444',112.5,97.5],[92,112,44,'#9a7038',103,62]],shade:F.awning?[[402,476,'#6c6c98']]:[]}),
 paint(g){const r=rng(23);
  /* sky, moon, hills */
  /* the night's blues are drawn a little toward grey (earth1), so that they sit with the stone and plaster of the street */
  g.fillStyle=lg(g,0,0,0,86,['#05071a','#0b1030','#18214f','#2b3a72'].map(c=>earth1(c,.14)));g.fillRect(0,0,480,86);
  for(let i=0;i<190;i++){const b=r(),sx=r()*480,sy=r()*r()*74;R(g,sx,sy,b>.93?1:.5,b>.93?1:.5,b>.9?'#ffffff':b>.5?'#b9c2f0':'#6f78b4')}
  pool(g,402,16,60,44,'#5a6cc0',.5);pool(g,402,16,22,20,'#aab8f0',.5);oval(g,402,16,7.5,7.5,'#f2eed8');oval(g,399.5,14,2,1.6,'#d2ceb6');oval(g,405,19.5,1.4,1.1,'#d2ceb6');oval(g,403.5,12,1,.8,'#dcd8c0');
  for(const[cx0,cy,cw]of[[350,26,60],[440,10,44],[120,20,70],[250,12,50]])pool(g,cx0,cy,cw,3.5,'#5a68a8',.35,'screen');
  ridge(g,0,480,86,x=>30+7*Math.sin(x/53)+3*Math.sin(x/17+1),['#1c2658','#131a42'].map(c=>earth1(c)));
  /* the far city wall and its gate, torches burning */
  const FW=earth1('#232c5e',.24),FT=earth1('#2a3468',.24),FG=earth1('#262f62',.24),FM=earth1('#181e48',.2);
  ashlar(g,0,48,480,38,FW,r,{bw:9,bh:4,v:.07,t:.2,m:earth1('#161c44',.2)});for(let i=0;i<480;i+=8)R(g,i,45,5,3.5,FW);
  for(const tx of[181,222]){ashlar(g,tx,31,17,55,FT,r,{bw:7,bh:4,v:.08,t:.2,m:FM});for(let i=0;i<17;i+=6)R(g,tx+i,28,4,3.5,FT);R(g,tx+16,31,1,55,earth1('#141a40',.2));R(g,tx+6,40,3,5,'#0a0d24')}
  ashlar(g,198,39,24,47,FG,r,{bw:7,bh:4,v:.08,t:.2,m:FM});R(g,198,37.5,24,2,earth1('#343e78',.24));
  R(g,203.5,55,13,31,'#06081a');oval(g,210,55,6.5,5.5,'#06081a');R(g,205,60,10,26,'#0d1026');
  pool(g,200,52,16,14,'#ff8a3c',.55);pool(g,220,52,16,14,'#ff8a3c',.55);R(g,199.5,51,1,5,'#3a2a1a');R(g,219.5,51,1,5,'#3a2a1a');
  ao(g,0,70,480,16,'b',.5,'#0a0d26');
  /* everything near is painted in daylight colors, then lit: moonlight, the window, the brazier */
  litLayer(g,480,'#565f98',l=>{
    /* cypresses and a palm behind the low wall */
    for(const[tx,th]of[[150,44],[158,36],[230,30]]){oval(l,tx,88-th/2,3.6,th/2,'#3a5a3a');oval(l,tx-.8,88-th/2-2,2,th/2-3,'#4c7048')}
    /* Eliab's house */
    plaster(l,0,30,140,74,'#d8c4a2',r,{patch:5,cracks:0,brick:'#a8845c',t:.36});skipCracks1(r,6);poly(l,[140,30,147,34,147,102,140,104],'#9a8a70');
    R(l,-1,26.5,142,4,'#e6d6b6');R(l,-1,30,142,1,'#8a785c');for(let i=6;i<138;i+=12){R(l,i,34,2.5,2.5,'#6a4a2c');R(l,i,36.5,2.5,2.5,'rgba(0,0,0,.3)')}
    for(let i=0;i<5;i++){const sx=10+r()*120;g.fillStyle='#000';l.fillStyle=lg(l,0,31,0,58,['rgba(70,50,30,.3)','rgba(70,50,30,0)']);l.fillRect(sx,31,2+r()*3,20+r()*8)}
    R(l,24,39,40,65,'#b8a480');doorArt(l,28,42,32,60,'#7a5230',r);R(l,22,100.5,44,3.5,'#a89a80');R(l,22,100.5,44,.5,'#d8ccb0');
    R(l,79,49,26,24,'#b8a480');poly(l,[79,73,83,70,101,70,105,73],'#e8d8b4');R(l,83,53,18,17,'#3a2a1c');
    /* low wall across the gap */
    ashlar(l,140,84,96,20,'#bcae90',r,{bw:13,bh:6});R(l,139,82.5,98,2.5,'#d6c8a8');R(l,139,85,98,.5,'#7a6e58');
    for(let i=0;i<26;i++){const vx=206+r()*28,vy=84+r()*12;oval(l,vx,vy,1.6,1.1,r()<.5?'#4a6a3a':'#5c8048')}
    /* the house of the wool merchant's neighbors, and beyond the alley, another */
    plaster(l,236,24,189,80,'#cfbd9c',r,{patch:6,cracks:0,brick:'#a07c56',t:.36});skipCracks1(r,8);
    /* cracks cut by hand, high under the eaves of both houses, where they run to no head */
    {const rb=rng(231);for(const[x,y,n]of[[16,32,4],[118,33,3],[252,27,4],[338,28,3],[408,30,4]])crack1(l,x,y,n,rb)}R(l,235,20.5,191,4,'#dfcfae');R(l,235,24,191,1,'#84745a');
    for(let i=242;i<422;i+=13){R(l,i,28,2.5,2.5,'#6a4a2c');R(l,i,30.5,2.5,2.5,'rgba(0,0,0,.3)')}
    for(const wx of[262,300]){R(l,wx-1.5,38.5,15,17,'#a8987a');R(l,wx,40,12,14,'#1a1612');boards(l,wx,40,5.5,14,2.8,'#6a4a2c',r);R(l,wx-2,54,16,1.5,'#e0d0b0')}
    poly(l,[236,24,236,104,231,102,231,28],'#8f8068');
    plaster(l,455,34,25,70,'#c6b494',r,{patch:1,cracks:0,t:.36});skipCracks1(r,2);R(l,454,30.5,27,4,'#d8c8a8');
    /* the alley between them */
    R(l,425,38,30,66,'#0c0a14');poly(l,[425,38,433,48,433,98,425,104],'#55493a');poly(l,[455,38,448,48,448,98,455,104],'#6e6250');
    R(l,433,48,15,50,'#1a1826');R(l,436,60,9,38,'#2e3050');poly(l,[425,104,433,98,448,98,455,104],'#6e6654');ao(l,425,38,30,22,'t',.6);
    /* paving */
    pave(l,0,103,480,144,'#b6aa92',r,{vx:240,vy:64,rows:5,step:36,v:.1});ao(l,0,103,480,7,'t',.45,'#1a1830');ao(l,0,103,480,2.6,'t',.3,'#100e20');
    /* the well */
    shadow1(l,190,109,22,3.5,.44,'#0c0a1c');clipTo(l,()=>{l.beginPath();l.rect(172,94,35,10);l.ellipse(189.5,104,17.5,5,0,0,6.2832)},()=>{ashlar(l,172,92,35,18,'#b0a48e',r,{bw:8,bh:4.5});
      l.fillStyle=lg(l,172,0,207,0,[[0,'rgba(0,0,0,.3)'],[.3,'rgba(255,255,255,.12)'],[1,'rgba(0,0,0,.5)']]);l.fillRect(172,92,35,18)});
    oval(l,189.5,94,17.5,4,'#d2c6ac');oval(l,189.5,94.3,13.5,2.8,'#141018');
    const rw=rng(29);board1(l,174,69,3,25,'#6a4a2c',rw,1);board1(l,201,69,3,25,'#6a4a2c',rw,1);board1(l,171,67,36,3,'#7a5632',rw);oval(l,189.5,68.5,4,2.4,'#8a6238');for(let i=0;i<4;i++)R(l,186.5+i*1.6,66.5,.8,4,'#c8aa68');
    R(l,189,71,.6,13,'#c8aa68');poly(l,[185.5,84,193.5,84,192.5,91,186.5,91],'#7a5632');R(l,185.5,84,8,1,'#a88252');R(l,185.5,87,8,.6,'#3a2a1a');
    /* the merchant's stall */
    R(l,346,94,56,15,'rgba(10,6,4,.5)');shadow1(l,343.5,110,3.4,1,.4,'#0c0a1c');shadow1(l,403.5,110,3.4,1,.4,'#0c0a1c');
    board1(l,342,48,3,62,'#6a4a2c',rw,1);board1(l,402,48,3,62,'#6a4a2c',rw,1);board1(l,340,47,67,3,'#7a5632',rw);
    boards(l,346,94,56,15,7,'#6a4a2c',r);board1(l,344,90,60,4.5,'#8a6238',rw);ao(l,346,94.5,56,3,'t',.3,'#0c0808');
    for(const[bx,c]of[[356,earth1('#8a3f78',.32)],[368,earth1('#3f66a0',.3)],[380,earth1('#c89a30',.2)]]){oval(l,bx,89.5,6,1,'rgba(0,0,0,.4)');oval(l,bx,86,5.6,4.4,tint(c,-.3));oval(l,bx-.8,85.2,4.6,3.6,c);oval(l,bx-1.8,84,2.2,1.6,tint(c,.3));
      for(let i=0;i<5;i++)stroke(l,[bx-4+i*2,83+r()*2,bx-3+i*2,88],tint(c,-.4),.4)}
    vessel(l,393,90,4,10,'#a8562e','jar',{noShadow:1});
    /* the brazier */
    shadow1(l,248,112.5,10,2,.44,'#0c0a1c');stroke(l,[243,103,241,112],'#1a1418',1.4);stroke(l,[253,103,255,112],'#1a1418',1.4);stroke(l,[248,103,248,111],'#1a1418',1.2);
    poly(l,[240.5,99,255.5,99,253,104,243,104],'#3a2e34');R(l,240,98,16,1.5,'#5a4a50')},
   m=>{pool(m,248,98,95,70,'#ffb060',.95);pool(m,248,112,80,18,'#ffa050',.6);
    comp(m,'lighter',.75,()=>poly(m,[83,70,101,70,128,136,58,136],lg(m,0,70,0,136,['rgba(255,190,100,.2)','rgba(255,180,90,.85)','rgba(255,170,80,.15)'])));
    pool(m,92,60,34,30,'#ffb868',.5);pool(m,402,16,260,150,'#5a6aa8',.28);
    /* what the brazier reaches besides the ground: the wall behind it, low and long, and the near side of the well's rim; the moon's
       cool light along the tops of the houses at the right */
    pool(m,250,84,64,16,'#ffa860',.3);pool(m,200,99,16,5,'#ffb070',.28);pool(m,360,30,120,14,'#8a9ad8',.22);
    comp(m,'multiply',1,()=>{ao(m,0,0,50,144,'l',.4,'#0c0a24');ao(m,430,0,50,144,'r',.35,'#0c0a24');ao(m,0,126,480,18,'b',.35,'#0c0a24');
      ao(m,140,84,10,20,'l',.3,'#0c0a24');ao(m,226,84,10,20,'r',.3,'#0c0a24');ao(m,0,24,480,10,'t',.25,'#0c0a24');
      for(const[x0,x1]of[[0,140],[236,425],[455,480]])ao(m,x0,90,x1-x0,14,'b',.35,'#0c0a24')})});
  /* what gives light of its own: the window and the coals */
  g.fillStyle=lg(g,0,53,0,70,['#ffd884','#f0a040']);g.fillRect(83,53,18,17);pool(g,92,61,10,9,'#fff0b0',.5);
  for(let i=0;i<4;i++)R(g,85.5+i*4.5,53,1,17,'#3a2416');R(g,83,58.5,18,1,'#3a2416');R(g,83,64.5,18,1,'#3a2416');pool(g,92,62,26,22,'#ff9c40',.3);
  for(let i=0;i<7;i++)R(g,242+i*2,98,1.5,1,i%2?'#ff7028':'#ffb040');pool(g,248,97,18,14,'#ff8030',.4)},
 fore(g){/* close to the viewer: jars and a cart shaft on the left, crates on the right, palm fronds overhead */
  vessel(g,10,150,10,30,'#141018','amph',{noShadow:1});vessel(g,29,148,7,18,'#1a1420','jar',{noShadow:1});
  const r=rng(24);for(const[bx,by,bw,bh]of[[484,146,40,20],[494,127,26,15]]){boards(g,bx,by-bh,bw,bh,6.5,'#3a3048',r);R(g,bx,by-bh,bw,1.2,'#5a5078');R(g,bx,by-1.6,bw,1.6,'#1c1628');R(g,bx,by-bh/2-.5,bw,1,'#241c34')}
  for(let i=0;i<7;i++){const a=.2+i*.2,L=50+(i%3)*12,ox=528,oy=-10,p=[ox,oy];for(let k=1;k<=12;k++){const q=k/12;p.push(ox-Math.cos(a)*L*q,oy+Math.sin(a)*L*q+q*q*16)}
    stroke(g,p,'#0e121c',1.4);for(let k=2;k<=12;k++){const x=p[k*2],y=p[k*2+1],n=6-k*.25;stroke(g,[x,y,x-n*.5,y+n],'#121826',1);stroke(g,[x,y,x+n*.6,y+n*.8],'#182234',1)}}},
 draw(g,t){
  flame(g,199.5,49,t+70);flame(g,219.5,49,t);pool(g,210,50,20+Math.sin(t/210),12,'#ff8a3c',.1);
  pool(g,92,61,20+Math.sin(t/230),17,'#ffb050',.1);
  flame(g,245,97,t,1);flame(g,249.5,97.5,t+50,1);pool(g,248,95,36+Math.sin(t/170)*2,28,'#ff8a3c',.13+.03*Math.sin(t/90));
  if(!F.awning){awningCloth(g,[345,51,367,51,366,58,362,60,361,69,356,75,352,68,349,70,347,62,345,63],'#58303a',0);awningCloth(g,[384,51,402,51,402,55,399,60,394,56,389,60,385,55],'#58303a',0);
    stroke(g,[367,51,372,55,378,53,384,51],'#3a2028',.6)}
  else{awningCloth(g,[343,50,407,50,407,58,343,58],'#58303a',0);for(let i=0;i<64;i+=7)poly(g,[343+i,58,350+i,58,346.5+i,61],(i/7)%2?'#42222c':'#58303a')}},
 front(g){if(F.awning){awningCloth(g,[404,51,461,51,461,113,404,113],'#4a2832',0);ao(g,404,51,57,62,'l',.25);ao(g,404,95,57,18,'b',.4);
    R(g,404,49.5,57,1.6,'#b89a5a');R(g,404,50.8,57,.5,'#6a5630');R(g,425.5,73.5,10,9,'#18141a');for(let i=0;i<10;i+=2)R(g,425.5+i,73.5,1,.6,'#8a806a');for(let i=0;i<9;i+=2)R(g,425.5,73.5+i,.6,1,'#8a806a');
    for(let i=0;i<57;i+=7)poly(g,[404+i,113,411+i,113,407.5+i,115.5],'#3a1e28')}}};
/* ---------- Naomi's upper room on the city wall: lamplight first, then darkness and the moon ---------- */
ART.house={w:320,q:12,
 variant:()=>F.lampOut?(F.shutters?'moon':'dark'):'lamp',
 light:()=>{const W=[[44,196,105,12],[196,236,105,89],[236,313,105,12]];return F.lampOut?(F.shutters?{amb:'#4a5484',wallY:105,wall:W,lamps:[[216,104,70,'#5a6aa8',105,68]]}:{amb:'#444a74',wallY:105}):{amb:'#827488',wallY:105,wall:W,lamps:[[104,56,135,'#d8a860',105,62.5]]}},
 paint(g,v){const r=rng(37),S='#b4a894',T='#6b4a2e';
  ashlar(g,0,0,320,105,S,r,{bw:24,bh:11.5,v:.1,t:.3});
  /* a few hairline cracks in the stones, high up, where they run to no head */
  {const rb=rng(137);for(const[x,y,n]of[[58,20,3],[150,15,3],[282,19,4]])crack1(g,x,y,n,rb,.9)}
  /* ceiling joists over a great cedar beam; the boards between them darken where they meet each joist */
  const rw=rng(39);plank1(g,0,0,320,9,'#2a1d14',rw,0);ao(g,0,0,320,6,'t',.45,'#0c0808');
  for(let i=-1;i<9;i++){const a=14+i*44,k=1.16,x0=160+(a-160)*k,x1=160+(a+7-160)*k;joistAO1(g,a,x0,7,9,'#0c0808');poly(g,[a,9,a+7,9,x1,0,x0,0],T);
    clipTo(g,()=>poly(g,[a,9,a+7,9,x1,0,x0,0]),()=>tex(g,'vert',.16,x0-2,0,x1-x0+4,9,'overlay',.5));
    poly(g,[a+5,9,a+7,9,x1,0,x1-2.2,0],tint(T,-.4));stroke(g,[a+.25,9,x0+.25,0],tint(T,.25),.5)}
  ao(g,0,6.2,320,2.4,'b',.3,'#0c0808');board1(g,0,8.5,320,3,'#5a3e28',rw);ao(g,0,11.5,320,7,'t',.45,'#2a2030');
  board1(g,170,19,92,8,'#7a5232',rw);R(g,170,19,92,1,'#a67848');R(g,170,26,92,1,'#3e2a1a');ao(g,170,27,92,5,'t',.45,'#2a2030');
  for(const cx0 of[170,254]){poly(g,[cx0,27,cx0+8,27,cx0+8,31,cx0+3,34,cx0,34],'#8f8474');R(g,cx0,27,8,.5,'#c8bca8')}
  poly(g,[0,0,7,9,7,105,0,113],'#8f8574');poly(g,[320,0,313,9,313,105,320,113],'#857b6a');ao(g,0,0,7,113,'l',.3);ao(g,313,0,7,113,'r',.3);
  ao(g,7,11.5,7,93.5,'l',.28,'#2a2030');ao(g,306,11.5,7,93.5,'r',.28,'#2a2030');ao(g,7,97,306,8,'b',.24,'#2a2030');
  /* floorboards running toward the viewer, each with a quiet grain that runs along it and stops at its own ends */
  pave(g,0,105,320,144,'#8a6a46',r,{vx:160,vy:70,rows:2,step:15,v:.1,p:1.2,t:.3});floorGrain1(g,rng(41),'#8a6a46');ao(g,0,105,320,8,'t',.5,'#2a2030');ao(g,0,105,320,3,'t',.3,'#1a1420');
  /* stairs down to the alley */
  R(g,9.5,35,37,71,'#9a9080');R(g,12,38,32,68,'#08060c');poly(g,[12,38,18,44,18,106,12,106],'#3a3440');
  for(let i=0;i<5;i++){R(g,18+i*2.5,92+i*3,26-i*2.5,3.2,tint('#4a4450',-i*.12));R(g,18+i*2.5,92+i*3,26-i*2.5,.5,'#6a6474')}
  board1(g,9.5,34,37,3,'#5a3e28',rw);ao(g,12,38,32,14,'t',.7);
  /* lamp niche */
  R(g,89,48,20,21,'#7a7062');oval(g,99,49,10,4,'#7a7062');R(g,91,50,16,17,'#2a2420');oval(g,99,51,8,3.4,'#2a2420');R(g,89,67.5,20,1.6,'#cfc4b0');
  vessel(g,98,67,4.6,3.4,'#b06a3a','bowl',{noShadow:1});poly(g,[101.5,64,106,63.6,106.5,65,101.5,66],'#a05c30');R(g,104,63,1.5,1,'#3a2416');
  /* a woven hanging, and a shelf of bowls */
  R(g,126,40,34,1.5,'#5a3e28');for(let j=0;j<32;j++){const c=['#8a4234','#bc9a52','#3e5a62','#dcd0b2'][(j>>2)%4];R(g,127,41.5+j,32,1,tint(c,(j%2)*-.12))}
  for(let i=0;i<8;i++)R(g,127.5+i*4.2,73.5,1,3,'#bc9a52');ao(g,127,41.5,32,32,'r',.25);
  board1(g,262,52,36,2.5,'#70502e',rw);ao(g,262,54.5,36,5,'t',.35);vessel(g,270,52,4.5,4.5,'#a8562e','bowl');vessel(g,282,52,3.4,8,'#8a744a','jug');vessel(g,292,52,3.6,6,'#6f5a3a','jar');
  /* the window: its frame and sill (the shutters and the view are drawn live) */
  R(g,189,29,54,60,'#c8bca8');R(g,192,32,48,54,'#8a8070');R(g,196,36,40,46,'#0c0a14');R(g,187,86,58,3.5,'#d6cab6');R(g,187,89.5,58,1,'#6a6254');ao(g,187,90.5,58,5,'t',.3);
  /* table: bread and a cup */
  R(g,121,100,38,9,'rgba(10,6,4,.5)');ao(g,121,100,38,4,'t',.3,'#0c0808');shadow1(g,123,109.4,4,1.1,.4);shadow1(g,157,109.4,4,1.1,.4);
  board1(g,121.5,100,3,9.5,'#5a3c22',rw,1);board1(g,155.5,100,3,9.5,'#5a3c22',rw,1);board1(g,117,96,46,4.2,'#8a6238',rw);R(g,117,99.6,46,1,'#4e3520');
  oval(g,130,95.2,5.5,2,'#b88a48');oval(g,129.4,94.6,4.6,1.5,'#d8ae6a');stroke(g,[127,94.6,132,94.6],'#a07838',.5);vessel(g,146,96,2.4,6,'#9a5230','jug',{noShadow:1});
  /* rolled sleeping mat, storage jars */
  /* the rolled mat lies along the wall: of its two ends we see only the one turned toward the middle of the room (clothRoll) */
  shadow1(g,69,108.5,15,1.6,.44);clothRoll(g,56,108.5,26,7.5,'#8a7c54',{near:1,k:.3,face:.2});
  vessel(g,284,110,7,16,'#a8562e','pithos');vessel(g,297,110,6,14,'#8a744a','jar');vessel(g,308,108,5.5,15,'#8e4428','amph');
  /* the lamp burns in its niche: its light goes out and down from the opening, and the arch keeps it off the wall above (nicheLight). It
     fills the room from below the niche, reaches the table and the mat, and lies warm on the boards; the stair, the corners, the ceiling
     and the near floor stay in shade. */
  if(v==='lamp'){lightmap(g,320,'#4e4258',l=>{pool(l,104,92,170,104,'#ffca84',.9);nicheLight(l,100,63,72,58,'#ffc488',.9);pool(l,112,120,120,28,'#d89850',.5);
      pool(l,138,98,40,10,'#ffe0a8',.32);pool(l,70,106,30,7,'#ffd8a0',.26);pool(l,216,62,36,30,'#d8a870',.18);
      comp(l,'multiply',1,()=>{ao(l,250,0,70,144,'r',.5,'#1a1030');ao(l,0,0,320,24,'t',.5,'#1a1030');ao(l,0,128,320,16,'b',.35,'#1a1030');ao(l,0,0,320,10,'t',.3,'#1a1030')})});
    pool(g,101,66,16,6,'#ff9c40',.4)}
  else lightmap(g,320,v==='moon'?'#363b62':'#2e3156',l=>{if(v==='moon'){pool(l,216,58,62,56,'#8fa4e8',.55);pool(l,216,90,40,6,'#a8b8f0',.3);
      comp(l,'lighter',.8,()=>poly(l,[196,86,236,86,268,144,160,144],lg(l,0,86,0,144,['rgba(130,155,240,.25)','rgba(130,155,240,.75)'])))}
    comp(l,'multiply',1,()=>{ao(l,0,0,60,144,'l',.45,'#0c0a24');ao(l,270,0,50,144,'r',.4,'#0c0a24');ao(l,0,0,320,22,'t',.4,'#0c0a24')})})},
 fore(g){vessel(g,8,152,12,30,'#1c1418','pithos',{noShadow:1});poly(g,[300,144,322,144,322,120,304,122],'#1c1418');R(g,303,121.5,19,1.5,'#3a2a26');for(let i=0;i<5;i++)R(g,305+i*3.6,124,.6,20,'#2e2220')},
 draw(g,t){const L=(x,y)=>{const l=lightAt('house',x,y+18);return c=>l?mul(c,l):c},k=L(216,60);
  if(F.shutters){g.fillStyle=lg(g,0,36,0,82,['#0a1034','#1c2a62','#34447e']);g.fillRect(196,36,40,46);
    [[201,41],[209,50],[222,39],[230,47],[216,56],[204,60],[227,58]].forEach((p,i)=>R(g,p[0],p[1],.6,.6,(Math.floor(t/600)+i)%5?'#e4e4ff':'#7a80b8'));
    const hp0=[196,82];for(let x=0;x<=40;x++)hp0.push(196+x,82-(7+2*Math.sin(x/6)+1.5*Math.sin(x/2.7)));hp0.push(236,82);poly(g,hp0,'#0e1434');
    const hp1=[196,82];for(let x=0;x<=40;x++)hp1.push(196+x,82-(3+1.5*Math.sin(x/4+2)));hp1.push(236,82);poly(g,hp1,'#080c22');
    ao(g,196,36,40,5,'t',.5);boards(g,187,35,9,48,3,k('#7a5230'),rng(5));boards(g,236,35,9,48,3,k('#6a4628'),rng(6));R(g,187,35,9,.6,k('#a67848'));R(g,236,35,9,.6,k('#a67848'))}
  else{boards(g,196,36,40,46,5,k('#7a5230'),rng(5));for(const by of[46,70]){R(g,196,by,40,2.2,k('#2a2420'));R(g,196,by,40,.5,k('#5a5048'))}
    R(g,203,57,26,2.6,k('#5a3e24'));R(g,203,57,26,.6,k('#8a6238'));ao(g,196,36,40,5,'t',.5)}
  if(!F.lampOut){flame(g,104.5,62.5,t);pool(g,103,64,20+Math.sin(t/190)*1.5,9,'#ff9838',.16+.03*Math.sin(t/83))}
  if(F.ropeTied){const rp=k('#b89a5a'),rd=k('#8f7440');for(let i=0;i<3;i++){R(g,212.5+i*2.4,18.5,2,9.5,i%2?rd:rp);R(g,212.5+i*2.4,18.5,.5,9.5,k('#d8bc7a'))}
    if(F.basketOn)stroke(g,[216.5,28,216.5,57],rp,1);
    else{stroke(g,[216.5,28,216.5,84,250,104],rp,1);coilArt(g,254,103,3,L(254,100))}}
  if(F.basketOn)basketArt(g,202,88,true,k)},
 front(){}};
/* ---------- Outside the wall (title and ending): open country under the moon ---------- */
ART.wall={w:320,q:12,
 /* night, the moon high on the right beyond the wall: a shadow would fall to the left and toward us, faint. The two at the window and the
    one who walks away are drawn small by hand in the scene (wallScene), with their own contact shade, so the engine casts nothing here. */
 light:{amb:'#7a84b8',sun:[-8,14,.18]},
 paint(g){const r=rng(51),E=c=>earth1(c,.16);
  g.fillStyle=lg(g,0,0,0,116,['#05071a','#0a0f2e','#141c4a','#263468','#3a4a86'].map(E));g.fillRect(0,0,320,116);
  for(let i=0;i<230;i++){const b=r(),sx=r()*320,sy=r()*r()*100;R(g,sx,sy,b>.94?1:.5,b>.94?1:.5,b>.9?'#ffffff':b>.5?'#b9c2f0':'#6f78b4')}
  pool(g,262,24,80,60,'#5a6cc0',.5);pool(g,262,24,28,26,'#aab8f0',.5);oval(g,262,24,9.5,9.5,'#f4f0da');oval(g,258.5,21.5,2.6,2,'#d6d2ba');oval(g,266,28,2,1.4,'#d6d2ba');oval(g,264,19,1.3,1,'#dedac2');
  for(const[cx0,cy,cw]of[[210,34,60],[300,14,40],[170,60,50]])pool(g,cx0,cy,cw,3.5,'#6674b4',.3,'screen');
  /* hills, fold on fold, and the road going south */
  ridge(g,150,320,116,x=>22+8*Math.sin(x/41+2)+4*Math.sin(x/13),['#232e62','#1a2250'].map(E));
  ridge(g,150,320,116,x=>10+6*Math.sin(x/23)+4*Math.sin(x/9+1)+(x>230&&x<290?8-Math.abs(x-260)/4:0),['#2c3a72','#18204a'].map(E));
  for(let i=0;i<40;i++){const tx=152+r()*166,ty=104+r()*10;oval(g,tx,ty,1.5+r()*2,1+r(),'#101838')}
  g.fillStyle=lg(g,0,112,0,144,['#1e2648','#161c38','#0e1226'].map(E));g.fillRect(0,112,320,32);tex(g,'mott',.34,0,112,320,32,'overlay',1);
  /* the road south: wide at the foot of the wall, a thread by the time it reaches the hills */
  const road=[],cy=k=>124+6*Math.sin(k*3)-8*k;for(let i=0;i<=40;i++){const k=i/40*1.4-.25;road.push(112+150*k,cy(k)-1-5*(1-k/1.15)*.6)}
  for(let i=40;i>=0;i--){const k=i/40*1.4-.25;road.push(112+150*k,cy(k)+2.5+9*Math.max(0,1-k/1.15))}
  poly(g,road,E('#3d4470'));clipTo(g,()=>poly(g,road),()=>{tex(g,'mott',.36,60,100,260,44);ao(g,60,108,260,10,'t',.25,'#0a0c24')});
  for(const[bx,by,bw]of[[180,123,6],[290,134,9],[236,138,7],[200,140,5]]){oval(g,bx,by,bw,bw*.45,'#1c2244');oval(g,bx-1,by-.8,bw*.7,bw*.3,'#2c3460')}
  R(g,224,98,2.5,18,'#141024');foliage(g,225,93,11,8,'#1e3440',r,50);foliage(g,217,97,6,4.5,'#1a2c38',r,20);
  /* the wall runs away to a far tower; the near stretch faces us, with Naomi's house built out over it */
  const side=[146,10,236,56,236,113,146,123],sy=(x,f)=>{const k=(x-146)/90;return 10+46*k+(113-57*k+10*(1-k))*f};
  const SW=E('#4a5486'),SJ=E('#2c3360');
  poly(g,side,SW);clipTo(g,()=>poly(g,side),()=>{for(let j=1;j<12;j++)stroke(g,[146,sy(146,j/12),236,sy(236,j/12)],SJ,.5);
    for(let j=0;j<12;j++)for(let i=0,x=146+(j%2)*5;x<236;i++,x+=11-i*.55){stroke(g,[x,sy(x,j/12),x,sy(x,(j+1)/12)],SJ,.5)}
    tex(g,'mott',.28,146,10,92,114);ao(g,146,92,92,32,'b',.45,'#0a0c24');ao(g,146,10,92,114,'r',.25,'#0a0c24')});
  /* the battlements of a wall that runs away stand on its sloping top: each is a block whose foot follows the slope, so that no sky shows
     under its far corner (merlon: x, width, height, and the line of the wall's top) */
  const merlon=(x,w,h,top,c)=>poly(g,[x,top(x)-h,x+w,top(x+w)-h,x+w,top(x+w)+.6,x,top(x)+.6],c);
  for(let i=0;i<9;i++){const x=148+i*10-i*i*.25,k=(x-146)/90;merlon(x,5-k*2.4,4-k*1.6,v=>10+46*(v-146)/90,SW)}
  ashlar(g,234,47,13,66,E('#404a7c'),r,{bw:6,bh:4,v:.08,t:.3,m:E('#262c58')});for(let i=0;i<13;i+=5)R(g,234+i,44,3.5,3.5,E('#404a7c'));R(g,246,47,1,66,E('#20264c'));R(g,238.5,58,2,4,'#0a0c20');
  const far=[247,62,300,84,300,110,247,113];poly(g,far,E('#3a4274'));clipTo(g,()=>poly(g,far),()=>{for(let j=1;j<9;j++)stroke(g,[247,62+j*5.7,300,84+j*2.9],E('#272e58'),.5);
    tex(g,'mott',.26,247,60,54,54);ao(g,247,96,54,18,'b',.4,'#0a0c24')});for(let i=0;i<6;i++)merlon(250+i*8,3,2.2,v=>62+22*(v-247)/53,E('#3a4274'));R(g,298,78,6,32,E('#2c3462'));R(g,298,78,6,.6,E('#5a629a'));
  const NW=E('#4a4f78'),NM=E('#22264a');
  ashlar(g,0,10,146,113,NW,r,{bw:21,bh:10,v:.1,t:.3,m:NM});for(let i=0;i<146;i+=10)ashlar(g,i,4.5,6,6,NW,r,{bw:6,bh:6,t:.3,m:NM});
  /* hairline cracks in the face of the wall, high, where the basket does not pass */
  {const rb=rng(53);for(const[x,y,n]of[[22,22,4],[60,58,4],[132,66,3]])crack1(g,x,y,n,rb,.8)}
  ao(g,0,84,146,39,'b',.45,'#0a0c24');ao(g,0,10,30,113,'l',.35,'#0a0c24');R(g,145,10,1,113,'#6a70a0');
  plaster(g,70,0,66,48,E('#5c6090'),r,{patch:3,cracks:4,brick:E('#3a3e66'),t:.3});poly(g,[136,0,141,3,141,45,136,48],E('#33385e'));
  /* the house stands out over the wall on one deep beam, which hides the ends of the joists under it: a row of joist ends on a plate
     would make a row of small T shapes (CONTRIBUTING section 3). Its grain is quiet and comes from its own seed, so the room keeps its draws */
  board1(g,69,46.5,68,8,E('#383c66'),rng(57));R(g,69,46.5,68,.6,'#6a70a0');R(g,69,53.9,68,.6,E('#1e2244'));poly(g,[137,46.5,141,45,141,52.6,137,54.5],E('#2a2e56'));
  ao(g,70,54.5,66,10,'t',.4,'#0a0c24');
  R(g,92,16,26,28,'#3a3e66');R(g,94,18,22,24,'#2a2e56');R(g,96,20,18,20,'#05040c');R(g,91,43.5,28,2.2,'#7a80b0');ao(g,96,20,18,4,'t',.6);
  /* bushes at the foot of the wall */
  foliage(g,60,123,15,5,'#141c34',r,50);foliage(g,24,125,11,4,'#101830',r,30);foliage(g,128,124,8,3,'#182040',r,20);
  pool(g,262,24,300,170,'#7080c8',.1);
  /* the moon stands high at the right: it lights the far wall and the road, grazes the near face of the wall, which turns from it, and
     leaves the foot of the wall and the near ground in the night's shade */
  lightmap(g,320,'#c4c6d8',l=>{pool(l,262,24,220,150,'#ffffff',.55);pool(l,196,72,60,34,'#eef0ff',.3);pool(l,200,118,110,14,'#e8ecff',.3);pool(l,110,30,60,26,'#dcdff0',.16);
    comp(l,'multiply',1,()=>{ao(l,0,0,80,144,'l',.25,'#3a3c58');ao(l,0,120,320,24,'b',.3,'#3a3c58');ao(l,0,96,146,27,'b',.18,'#3a3c58')})})},
 draw(){},front(){}};
function miniBasket(g,x,y,rider){stroke(g,[x-6,y-11,x,y-22],'#b89a5a',.8);stroke(g,[x+6,y-11,x,y-22],'#b89a5a',.8);
  if(rider){
    /* Saul crouched inside the basket, moonlit from upper-right, matching his sprite palette */
    R(g,x-5,y-13.6,10,2.6,'#9c9484');R(g,x-5,y-13.6,4.5,2.6,'#624632');R(g,x-5,y-13.6,1.6,2.6,'#443022');R(g,x+1,y-13.6,3.5,1.2,'#c8c0ae');
    /* neck and rounded head silhouette with moonlit highlight on right cheek */
    R(g,x-1.2,y-14.4,2.4,1.2,'#885e40');
    R(g,x-2.6,y-18.8,5.2,4.8,'#a47450');R(g,x-2.6,y-18.8,1.8,4.8,'#7c5438');R(g,x+.8,y-18.4,1.8,3.2,'#c6966c');
    /* dark hair curving around crown and temple */
    R(g,x-2.4,y-19.8,4.8,1.2,'#261812');R(g,x-3.1,y-18.8,6.2,1.2,'#261812');R(g,x-3.1,y-17.8,1.3,2.2,'#261812');R(g,x+2,y-18.2,1,1.4,'#3c281e');R(g,x-.4,y-19.6,2,.6,'#4a3428');
    /* eyes, brow, and short full beard matching Saul's sprite */
    R(g,x-.8,y-17.2,1,.8,'#1a100a');R(g,x+1.1,y-17.2,1,.8,'#1a100a');
    R(g,x-2.6,y-15.4,5.2,1.4,'#281812');R(g,x-1.8,y-14.2,3.8,1.2,'#22140e');R(g,x+.2,y-15.2,1.4,.6,'#3c261c');
    /* hands gripping the basket rim */
    R(g,x-5.4,y-12.8,1.8,1.2,'#a47450');R(g,x+3.6,y-12.8,1.8,1.2,'#c29268')}
  const p=[];for(let j=0;j<=10;j++)p.push(x-8.5+j*.25*(j<5?1:0)-(j>=5?-1.25-(j-5)*.5:0),y-11+j);for(let j=10;j>=0;j--)p.push(x+8.5-(j<5?j*.25:1.25+(j-5)*.5),y-11+j);
  clipTo(g,()=>poly(g,p),()=>{R(g,x-9,y-11,18,11,'#7a5c2c');for(let j=0;j<22;j++)for(let i=(j>>1)%2*2;i<18;i+=4)R(g,x-9+i,y-11+j*.5,2,.5,j%2?'#b08c48':'#96763a');
    g.fillStyle=lg(g,x-9,0,x+9,0,['rgba(0,0,0,.3)','rgba(255,230,170,.15)','rgba(0,0,0,.5)']);g.fillRect(x-9,y-11,18,11)});
  R(g,x-9,y-12,18,2,'#6f5226');R(g,x-8.5,y-12.5,17,.8,'#c9a55a');R(g,x-5,y-11,1.5,10,'#3a2416');R(g,x+3.5,y-11,1.5,10,'#3a2416')}
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  eliab:{skin:'#b88458',hair:'#a8a8a8',beard:'#bcbcbc',longBeard:1,bald:1,brow:'#8a8a8a',tunic:'#7a8a6a',cloak:'#44543e',long:1,belt:'#4a3a24',trim:'#56634a',ph:900},
  naomi:{skin:'#c49268',veil:'#8a4a5a',tunic:'#4f7480',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#c9a14a',brow:'#3a2414',ph:1700},
  jesse:{skin:'#c49268',hair:'#3a2414',tunic:'#a89060',belt:'#5a3a20',h:8,slim:1,trim:'#7a6238',ph:2600},
  guard:{skin:'#a87850',helm:'#b08a3c',beard:'#1a100a',tunic:'#7a2a2a',cloak:'#3a3550',cape:1,belt:'#b08a3c',spear:1,armor:'#5a3a22',trim:'#c9a14a',brow:'#1a100a',ph:3300},
  zakkai:{skin:'#b07a4c',wrap:'#d2c296',beard:'#4a3a2a',tunic:'#4a5a8a',long:1,belt:'#c9a14a',trim:'#c9a14a',longSleeve:1,brow:'#3a2a1a',ph:2100}});
actor('eliab','Eliab','#a8d8a0',118);actor('naomi','Naomi','#f0a8c0',250);actor('jesse','Jesse','#f0c878',215);
actor('guard','the_guard','#f08070',96);actor('zakkai','the_merchant','#90b8f0',132);
Object.assign(ICON,{
  pouch(g){IH.bag(g,'#8a5830',12,15,7.6,6.4);R(g,11,3.4,2,3,'#c9a14a');stroke(g,[8,8.8,5,11],'#c9a14a',.7);stroke(g,[16,8.8,19,11.4],'#c9a14a',.7)},
  patch(g){IH.square(g,'#4a3e36',6,6.6,12,11.4,'#b8ac90');R(g,6,6.6,12,.7,'#8a7c6c');R(g,6,6.6,.7,11.4,'#7a6c5e');for(let i=6.6;i<18;i+=1.6){R(g,i,5.6,.6,1.2,'#685a4e');R(g,i,17.8,.6,1.2,'#685a4e')}},
  strips(g){for(let k=0;k<3;k++){const p=[],q=[];for(let j=0;j<=16;j++){const x=6.4+k*5.2+Math.sin(j/2.5+k)*1.5;p.push(x,4+j);q.unshift(x+3,4+j)}poly(g,p.concat(q),k%2?'#463a32':'#584a40');
      stroke(g,p,'#887868',.6);for(let j=2;j<16;j+=3)R(g,6.4+k*5.2+Math.sin(j/2.5+k)*1.5+.6,4+j,1.8,.5,'rgba(0,0,0,.35)')}},
  rope(g){IH.coil(g,['#b89a5a','#a08448','#b89a5a','#8f7440'],12,8.6,6.2,2.4,2.8);stroke(g,[17.6,17.4,19.4,21.4],'#b89a5a',1.4)},
  longrope(g){IH.coil(g,['#b89a5a','#a08448','#b89a5a','#4a3c32','#3a2e26','#4a3c32'],12,6,7.6,2.4,2.7);stroke(g,[19,19.6,20.4,22.4],'#3a2e26',1.4)},
  basket(g){IH.basket(g);stroke(g,[6,6,6,3.2,8.4,2.6],'#a08a56',.8);stroke(g,[18,6,18,3.2,15.6,2.6],'#a08a56',.8)},
  strongbasket(g){IH.basket(g);for(const x of[6.6,15.4]){R(g,x,2.6,2.2,17.4,'#4a2c18');R(g,x,2.6,.6,17.4,'#8a5a34');for(let j=9;j<19;j+=2.6)R(g,x+.9,j,.5,1,'#d8c9a0')}R(g,6.6,1.6,11,2.2,'#4a2c18');R(g,6.6,1.6,11,.6,'#8a5a34')},
  straps(g){[[3.6,6.4,'#7a4a26'],[5.6,11.6,'#8a5830'],[2.8,16.8,'#6a3e1e']].forEach(([x,y,c],i)=>{g.fillStyle=lg(g,0,y,0,y+3.2,[tint(c,.25),c,tint(c,-.35)]);g.fillRect(x,y,15.6,3.2);
      for(let j=x+2;j<x+14;j+=2.6)R(g,j,y+1.3,.7,.7,'#2e1a0c');const bx=i===1?x-1:x+14.6;R(g,bx,y-.4,3,4,'#c9a14a');R(g,bx+.8,y+.5,1.4,2.2,'#4a2c18');R(g,bx,y-.4,3,.7,'#f0d890')})},
  skin(g){g.beginPath();g.ellipse(12,14.4,5.2,7,.12,0,6.2832);g.fillStyle=lg(g,6,0,18,0,['#9a6c40','#7a5230','#3e2814']);g.fill();R(g,10.2,4.2,3.6,3.6,'#4a2f1a');R(g,10.8,3,2.4,1.4,'#c9a14a');
    stroke(g,[13.8,5.6,18.6,9,19.4,14],'#3a2414',.9);stroke(g,[8.6,11,8.2,16.4],'#b08454',.7);stroke(g,[9,19.4,12,21,15,19.6],'rgba(0,0,0,.35)',.6)},
  skinfull(g){g.beginPath();g.ellipse(12,14,7,7.4,.1,0,6.2832);g.fillStyle=lg(g,4,0,20,0,['#a4764a','#7a5230','#3e2814']);g.fill();R(g,10.2,3.6,3.6,3.6,'#4a2f1a');R(g,10.8,2.4,2.4,1.4,'#c9a14a');
    stroke(g,[13.8,5,19.4,8.6,20.6,14],'#3a2414',.9);stroke(g,[7.2,10.6,6.8,16.6],'#c09460',.8);poly(g,[16.4,15,17.8,18.2,16.4,19.6,15,18.2],'#7ec0f0');R(g,16,17.6,.7,.9,'#e0f4ff')}});
Object.assign(ITEMS,{
  pouch:{name:'tool_pouch',look:'my_leather_tool_pouch_tied_shut',
    open:async()=>{await say(P,'i_untie_the_pouch');delItem('pouch');addItem('awl');F.gotAwl=1}},
  cloth:{name:'goat_hair_cloth',look:'dark_goat_hair_cloth_of_cilicia'},
  patch:{name:'cloth_patch',look:'square_of_goat_hair_cloth'},
  strips:{name:'cloth_strips',look:'long_strips_of_goat_hair_cloth'},
  rope:{name:'short_rope',look:'good_rope_but_far_too_short'},
  longrope:{name:'long_rope',look:'rope_spliced_to_a_braided'},
  basket:{name:'large_basket',look:'big_provision_basket_of_plaited_wicker'},
  strongbasket:{name:'reinforced_basket',look:'leather_straps_cradle_the_basket'},
  straps:{name:'leather_straps',look:'old_harness_straps'},
  skin:{name:'waterskin',look:'my_waterskin'},
  skinfull:{name:'full_waterskin',look:'my_waterskin_heavy_with_cool_well_water'}});
async function reinforce(){
  if(!has('straps'))return say(P,'thread_alone_will_not_hold_a_man');
  if(!has('awl'))return say(P,'i_need_my_awl_to_pierce');
  if(!has('thread'))return say(P,'i_have_nothing_to_stitch_with');
  SFX.sew();await say(P,'two_straps_under_the_base');SFX.sew();await wait(700);
  delItem('basket');delItem('straps');addItem('strongbasket',1);F.strong=1;SFX.good();
  await say(P,'there_said')}
Object.assign(COMBO,{
  'cloth+knife':async()=>{SFX.cut();await say(P,'following_the_weave');
    delItem('cloth');addItem('patch',1);addItem('strips');F.cutCloth=1},
  'rope+strips':async()=>{SFX.sew();await say(P,'i_braid_the_strips_three');
    delItem('rope');delItem('strips');addItem('longrope',1);F.longRope=1;SFX.good();
    await say(P,'cord_of_three_strands_is')},
  'awl+basket':reinforce,'basket+straps':reinforce,'basket+thread':reinforce,
  'awl+straps':()=>say(P,'straps_must_be_sewn_onto_something'),
  'straps+thread':()=>say(P,'straps_must_be_sewn_onto_something'),
  'knife+rope':()=>say(P,'cut_it'),
  'awl+patch':()=>say(P,'patch_needs_a_tear_to_cover'),'patch+thread':()=>say(P,'patch_needs_a_tear_to_cover'),
  'awl+cloth':()=>say(P,'cloth_must_be_cut_to_shape'),
  'cloth+thread':()=>say(P,'cloth_must_be_cut_to_shape'),
  'cloth+rope':()=>say(P,'cloth_is_too_broad_to_join'),
  'knife+strips':()=>say(P,'they_are_narrow_enough'),'knife+patch':()=>say(P,'it_is_the_right_size_already'),
  'basket+rope':()=>say(P,'neither_the_rope_nor_the_basket'),
  'basket+longrope':()=>say(P,'rope_is_ready'),
  'longrope+strongbasket':()=>say(P,'i_will_join_them_at_the_window'),
  'rope+strongbasket':()=>say(P,'rope_is_still_far_too_short'),
  'knife+longrope':()=>say(P,'after_all_that_work')});
/* ============ PRAYER HINTS ============ */
function hint(){
  if(!F.gotAwl)return['pouch',['craftsman_should_know_what_he_carries','my_tool_pouch_is_tied_shut']];
  const m=[];if(!F.gotKnife||!F.gotCloth)m.push('the_workbench');if(!F.gotThread)m.push('the_shelf');if(!F.gotRope)m.push('pegs_on_the_wall');if(!F.gotBasket)m.push('corner_by_the_bench');
  if(m.length)return['gather',['eliab_said_to_take_what_i_need',
    T('something_useful_still_waits_in_the_workshop',{places:m.map(x=>T(x)).join(T('and_2'))})]];
  if(!F.cutCloth)return['cut',['whole_cloth_serves_no_one','my_knife_can_cut_the_goat']];
  if(!F.longRope)return['braid',['rope_is_too_short_yet_i','i_can_braid_the_cloth_strips']];
  if(!F.awning)return F.metZakkai?['mend',['merchants_trouble_is_one','his_torn_awning_needs_a_patch']]
    :['street',['way_to_the_wall_is_watched','i_should_go_out_and_speak']];
  if(!F.strong)return['straps',['basket_must_not_fail','i_can_stitch_the_leather']];
  if(!F.inHouse)return['alley',['soldier_guards_the_alley','hung_awning_shadows_the_alley_mouth']];
  if(!F.lampOut)return['lamp',['window_toward_freedom_can','lamp_should_be_put_out_before']];
  if(!F.shutters)return['shut',['way_out_is_before_me','now_that_the_room_is_dark']];
  if(!F.ropeTied)return['beam',['rope_is_only_as_sure_as_what','i_should_tie_the_long_rope']];
  if(!F.basketOn)return['hang',['all_is_nearly_ready','i_should_fasten_the_reinforced']];
  return['end',['jehovah_has_provided_helpers']]}
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'basket',q:'basket_loops_are_frayed_through',if:()=>F.gotBasket&&!F.strong},
  {id:'rope',q:'my_rope_is_far_too_short',if:()=>F.gotRope&&!F.longRope},
  {id:'awning',q:'merchants_awning_is_torn',if:()=>F.metZakkai&&!F.awning},
  {id:'thirst',q:'soldier_in_the_street_is_thirsty',if:()=>F.metZakkai&&!F.kind}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Eliab',note:'basket_weaver_and_a_faithful_brother'},
    {name:'the_soldier',note:'one_of_the_governors_men',if:()=>F.metZakkai||F.kind||F.inHouse},
    {name:'merchant_2',note:()=>F.awning?'wool_merchant':'a_wool_merchant',if:()=>F.metZakkai},
    {name:'Naomi',note:'a_widow',if:()=>F.inHouse}],
  tasks:[
    {t:'untie_my_tool_pouch',if:()=>!F.gotAwl},
    {t:'gather_what_a_tentmaker',if:()=>!(F.gotKnife&&F.gotCloth&&F.gotThread&&F.gotRope&&F.gotBasket)},
    {t:'make_a_rope_long_enough',if:()=>!F.longRope},
    {t:'make_the_basket_strong',if:()=>!F.strong},
    {t:'help_the_merchant_with_his_awning',if:()=>F.metZakkai&&!F.awning},
    {t:'reach_naomis_house_in_the_wall',if:()=>!F.inHouse},
    {t:'let_no_light_show_from_the_window',if:()=>F.inHouse&&!F.lampOut},
    {t:'make_the_rope_fast_to_something',if:()=>F.inHouse&&!F.ropeTied},
    {t:'fasten_the_basket_to_the_rope',if:()=>F.inHouse&&!(F.basketOn&&F.shutters)}],
  scripture:[
    {ref:'proverbs_3_5_6',gist:'jehovah_makes_the_way_straight'},
    {ref:'proverbs_15_1',gist:'answer_gently_and_rage'},
    {ref:'proverbs_25_21',gist:'is_your_enemy_hungry'},
    {ref:'ecclesiastes_4_12',gist:'a_cord_of_three_strands_is'}]};
/* ============ ROOMS, HOTSPOTS, CHARACTERS ============ */
const E=ACT.eliab,Z=ACT.zakkai,GD=ACT.guard,N=ACT.naomi,J=ACT.jesse;
/* ---------- Workshop ---------- */
ROOMS.workshop={space:1.2,walk:[22,300,112,138],mood:'calm',amb:{crickets:.22,fire:.22},hs:[
  {name:'door_to_the_street',x:10,y:36,w:34,h:70,wx:30,wy:113,dir:-1,look:'the_door_to_the_street',exit:()=>go('street',46,114,1)},
  {name:'tent_panel_on_the_frame',x:54,y:48,w:63,h:58,look:'tent_panel_stretched_for_seaming',pickup:'that_panel_is_promised_to_a_customer'},
  {name:'high_window',x:70,y:24,w:22,h:18,look:'night_has_fallen_over_damascus'},
  {name:'shelf',x:128,y:30,w:60,h:18,wx:150,look:'jars_of_dye_and_beeswax',pickup:'i_have_no_use_for_dye_tonight'},
  {name:'spool_of_thread',x:156,y:35,w:12,h:10,wx:160,vis:()=>!F.gotThread,look:'spool_of_waxed_linen_thread',pickup:take('gotThread','thread','waxed_thread_said')},
  {name:'oil_lamp',x:143,y:58,w:16,h:48,wx:134,dir:1,look:'small_clay_lamp',pickup:'eliab_needs_its_light_and_i',use:'it_burns_well_enough'},
  {name:'stool',x:118,y:106,w:18,h:14,look:'work_stool'},
  {name:'workbench',x:204,y:80,w:82,h:27,wy:113,look:'scarred_old_workbench'},
  {name:'tentmakers_knife',x:211,y:73,w:16,h:10,wx:220,wy:113,vis:()=>!F.gotKnife,look:'half_moon_knife_for_cutting',pickup:take('gotKnife','knife','sharp_said')},
  {name:'bolt_of_goat_hair_cloth',x:234,y:70,w:38,h:13,wx:252,wy:113,vis:()=>!F.gotCloth,look:'dark_goat_hair_cloth_the_kind',pickup:take('gotCloth','cloth','heavy_and_tough')},
  {name:'coil_of_rope',x:215,y:38,w:16,h:20,wx:224,wy:113,vis:()=>!F.gotRope,look:'coil_of_rope_on_a_peg',pickup:take('gotRope','rope','sound_rope')},
  {name:'mallet',x:233,y:38,w:13,h:22,wx:240,wy:113,look:'mallet_for_driving_tent_pegs',pickup:'too_heavy_to_carry_without_a_reason'},
  {name:'waterskin',x:272,y:40,w:14,h:20,wx:274,wy:113,vis:()=>!F.gotSkin,look:'my_waterskin_hanging_where_i_left_it',pickup:take('gotSkin','skin','empty_said')},
  {name:'large_basket',x:288,y:80,w:30,h:32,wx:284,wy:114,dir:1,vis:()=>!F.gotBasket,look:'large_provision_basket',
    pickup:take('gotBasket','basket','i_can_carry_it'),
    useWith:async()=>{await say(P,'i_had_better_pick_it_up_and_look')}},
  /* the hidden treasure (CONTRIBUTING section 2): the basket in its harness, set down for a moment among Eliab's baskets for market,
     the stack painted in the foreground. It changes nothing; treasure() keeps and announces it. */
  {name:'stack_of_baskets',x:0,y:118,w:27,h:26,wx:36,wy:132,dir:-1,look:'eliabs_finished_baskets_stacked_for_market',
    pickup:'they_are_for_market_and_eliab',
    useWith:async it=>{if(it==='basket')return say(P,'beside_eliabs_good_baskets');if(it!=='strongbasket')return false;
      await say(P,'i_set_it_down_beside_the_others');
      await say(P,'eliab_wove_them_for_figs');
      treasure()}}]};
E.hs={name:'Eliab',actor:E,look:'eliab_a_basket_weaver_and_a_faithful',
  show:{pouch:'your_tools_are_in_there_saul',
    awl:'awl_that_has_stitched_half',
    thread:'waxed_linen',
    knife:'mind_that_edge',
    cloth:'good_cilician_cloth',
    patch:'neat_square',
    strips:'twist_those_together_and_you_have_cord',
    rope:'it_was_long_enough_for_my_baskets',
    longrope:'now_that_will_reach_the_ground',
    basket:['my_best_basket_and_i_have','wicker_alone_will_not_carry_a_man'],
    strongbasket:'leather_sewn_from_rim_to_rim',
    straps:'harness_leather',
    skin:'empty_the',
    skinfull:'fresh_from_the_well',
    tablets:'your_tablets',
    '*':'keep_it_brother'},
  ask:{basket:'i_know',
    rope:'make_it_longer',
    thirst:['is_he','yet_it_is_written_proverbs_25_21']},
  talk:()=>talkTree([
    {q:'tell_me_the_plan_once_more',a:async()=>{await say(E,'our_sister_naomis_house');
      await say(E,'we_lower_you_from_it_in_a_basket')}},
    {q:'what_will_we_need',a:async()=>{await say(E,'basket_that_will_not_fail');
      await say(E,'you_are_a_tentmaker_saul')}},
    {q:'what_of_the_soldiers',a:async()=>{await say(E,'governor_under_king_aretas');
      await say(E,'do_not_quarrel_with_him')}},
    {q:'why_do_you_risk_so_much',once:1,a:async()=>{await say(E,'you_came_to_damascus_to_bind');
      await say(P,'i_do_not_deserve_such_kindness');await say(E,'none_of_us_do')}},
    {q:'i_must_get_to_work',bye:1,a:async()=>{await say(E,'jehovah_be_with_you')}}])};
/* ---------- Street ---------- */
const MEND=['awl','thread','patch'];
async function mend(it){if(!MEND.includes(it))return false;
  if(!has('patch'))return say(P,has('cloth')?'tear_needs_a_patch':'tear_is_too_wide_to_draw_closed');
  if(!has('awl'))return say(P,'i_cannot_pierce_this_heavy');
  if(!has('thread'))return say(P,'i_have_an_awl_but_nothing');
  await say(P,'hold_the_edge_taut_for_me_friend');SFX.sew();await wait(900);SFX.sew();
  await say(P,'patch_beneath_a_flat_seam_over_as_i');
  delItem('patch');SFX.good();await say(Z,'stronger_than_new');
  await fade(1,220);F.awning=1;await wait(300);await fade(0,220);
  await say(Z,'i_have_no_coin_tonight');addItem('straps');
  await say(P,'thank_you');
  await say(P,'awning_throws_the_alley_mouth_into_shadow',{thought:1,color:'#cfe2ff'})}
ROOMS.street={space:0.9,walk:[16,466,112,138],mood:'tense',amb:{crickets:.7,wind:.3,fire:.5,owl:.5},hs:[
  {name:'eliabs_door',x:28,y:42,w:32,h:60,wx:44,wy:113,look:'door_of_eliabs_workshop',exit:()=>go('workshop',34,116,1)},
  {name:'lit_window',x:82,y:52,w:20,h:18,look:'lamplight_from_eliabs_workshop'},
  {name:'city_gate',x:178,y:28,w:62,h:50,wx:208,wy:113,look:['the_city_gate','i_will_not_be_leaving_damascus']},
  {name:'well',x:170,y:66,w:38,h:44,wx:188,wy:114,look:'neighborhood_well',use:'i_would_need_something',pickup:'well_stays_where_it_is_dug',
    useWith:async it=>{if(it==='skin'){SFX.splash();F.water=1;delItem('skin');addItem('skinfull',1);await say(P,'i_lower_the_bucket_and_fill')}
      else if(it==='skinfull')await say(P,'it_is_already_full');else return false}},
  {name:'brazier',x:239,y:92,w:17,h:20,wx:226,dir:1,look:'soldiers_brazier',pickup:'it_is_hot',use:'i_am_warm_enough_from_walking'},
  {name:'merchants_stall',x:346,y:78,w:56,h:30,wx:372,wy:113,look:'bundles_of_dyed_wool_in_purple',pickup:'that_would_be_stealing'},
  {name:'torn_awning',x:344,y:50,w:60,h:26,wx:366,wy:113,vis:()=>!F.awning,look:'awning_is_split_from_pole_to_hem',
    pickup:'it_is_not_mine_to_take',use:'it_needs_mending_a_patch',useWith:mend},
  {name:'mended_awning',x:404,y:50,w:56,h:64,wx:392,wy:114,vis:()=>F.awning,look:'my_patch_holds_well',pickup:'merchant_needs_it'},
  {name:'alley_to_the_wall_quarter',x:425,y:40,w:30,h:72,get wx(){return F.awning?440:398},wy:112,dir:1,look:'narrow_alley_running_toward_the_city_wall',
    exit:async()=>{if(F.awning){await say(P,'behind_the_awning_the_alley',{thought:1,color:'#cfe2ff'});await walk(P,440,112);return go('house',52,118,1)}
      SFX.alert();GD.dir=1;await say(GD,'halt_said');
      await say(P,'as_you_say');await walk(P,372,122);P.dir=1;
      await say(P,'he_watches_that_alley_closely',{thought:1,color:'#cfe2ff'})}}]};
GD.hs={name:'the_guard',actor:GD,look:'soldier_of_the_governor',
  talk:async()=>{if(F.kind)return say(GD,'move_along_tentmaker');
    await say(P,'peace_to_you');
    await say(GD,'cold_and_dry');
    await say(GD,'now_move_along');return talkTree([{q:'peace_to_you_said',bye:1}],{quiet:1})},
  show:{pouch:'tools_said',awl:'put_that_away',thread:'i_am_a_soldier_not_a_seamstress',
    knife:'put_that_blade_away_tentmaker',cloth:'cloth_said',patch:'a_rag',
    strips:'rags_said',rope:'what_would_i_want_with_rope',longrope:'that_is_a_lot_of_rope_for_one',
    basket:'fill_it_at_the_market_in_the_morning',strongbasket:'basket_in_a_harness',
    straps:'harness_straps',skin:'empty_like',
    tablets:'writing_said',
    '*':'move_along_tentmaker_said'},
  ask:{awning:'i_have_heard_all_evening'},
  give:async it=>{if(it==='skin')return say(P,'empty_waterskin_would_be_a_poor_gift');if(it!=='skinfull')return false;
    await say(P,'you_are_thirsty');SFX.splash();await wait(700);
    await say(GD,'most_in_this_city_curse');
    await say(P,'if_a_man_is_thirsty_i_give');
    await say(GD,'hm');
    F.kind=1;F.water=0;delItem('skinfull');addItem('skin',1)}};
Z.hs={name:'the_merchant',actor:Z,look:'wool_merchant_fretting_over_his_stall',
  give:async it=>{if(!MEND.includes(it)||F.awning)return false;await say(P,'he_does_not_need_my_tools')},
  show:{pouch:'tentmakers_pouch',awl:'awl_that_saved_my_wool',thread:'not_one_stitch_has_given',
    knife:'fine_blade',
    cloth:'goat_hair_cloth_said',
    strips:'ribbons_said',
    rope:'too_short_to_hang_anything_from_i',
    longrope:'now_that_is_a_rope',
    basket:'those_loops_will_not_last_the_week',
    strongbasket:'my_old_straps_doing_honest_work_again',
    straps:'they_served_my_mule_for_ten_years',
    skin:'empty_the_well',
    skinfull:'water_said',
    tablets:()=>say(Z,F.awning?'write_it_down_tentmaker':'write_this_down_then_one'),
    '*':'not_tonight_friend'},
  ask:{basket:'leather_is_what_you_want',rope:'every_rope_in_this_street',
    thirst:'he_keeps_telling_me'},
  talk:async()=>{if(F.awning){await say(Z,'stitch_like_that_will_outlast_the_cloth');return talkTree([{q:'peace_to_you_said',bye:1}],{quiet:1})}
    if(!F.metZakkai){F.metZakkai=1;await say(P,'peace_to_you_you');
      await say(Z,'peace_ex');
      await say(Z,'if_i_cannot_hang_it_across');
      await say(P,'i_am_a_tentmaker_by_trade');
      await say(Z,'truly_said');
      await say(Z,'mind_that_soldier')}
    await talkTree([
      {q:'what_does_the_awning_need',a:()=>say(Z,'patch_of_strong_cloth_over_the_tear')},
      {q:'what_do_you_know_of_the_soldier',a:async()=>{await say(Z,'posted_since_sundown_to_watch_the_alley');
        await say(Z,'he_grumbles_that_his_waterskin_is_empty')}},
      {q:'peace_to_you_said',bye:1}])}};
/* ---------- Naomi's upper room ---------- */
async function hangBasket(it){
  if(it==='basket')return say(P,'with_those_frayed_loops');
  if(!F.ropeTied)return say(P,'first_the_rope_must_be');
  SFX.creak();delItem('strongbasket');F.basketOn=1;await say(P,'rope_through_both_straps');return checkFinal()}
async function shutters(){if(F.shutters)return say(P,'they_are_already_open');
  if(!F.lampOut){SFX.alert();await say(N,'wait_brother');
    return say(N,'lit_window_high_on_the_wall')}
  SFX.creak();F.shutters=1;await say(P,'slowly_said');return checkFinal()}
async function checkFinal(){if(F.ropeTied&&F.basketOn&&F.shutters&&F.lampOut)return finale()}
ROOMS.house={space:1.2,walk:[24,300,112,138],mood:'calm',floor:'wood',amb:()=>F.shutters?{crickets:.6,wind:.5,owl:.3}:{crickets:.18,wind:.15,fire:F.lampOut?0:.2},
  enter:async()=>{if(F.inHouse)return;F.inHouse=1;await say(N,'saul_said');
    await say(N,'there_is_the_window');
    await say(N,'rope_must_be_made_fast')},
  hs:[
  {name:'stairs_to_the_alley',x:12,y:38,w:32,h:68,wx:32,wy:113,dir:-1,look:'steps_leading_down_to_the_alley',exit:()=>go('street',440,114,-1)},
  {name:'sleeping_mat',x:54,y:98,w:30,h:12,look:'rolled_sleeping_mat'},
  {name:'oil_lamp',x:88,y:46,w:22,h:24,wx:100,wy:113,look:()=>say(P,F.lampOut?'lamp_is_out_moonlight':'lamp_burning_in_a_wall_niche'),
    pickup:'naomi_will_need_it_after',
    use:async()=>{if(F.lampOut)return say(P,'better_to_leave_it_dark');SFX.snuff();F.lampOut=1;await say(P,'i_pinch_out_the_wick')}},
  {name:'table',x:116,y:86,w:48,h:24,look:'bread_and_a_cup_set_out_for_a_guest',pickup:'i_have_no_appetite_now'},
  {get name(){return F.shutters?'window':'shutters'},get def(){return F.shutters?'look':'open'},x:187,y:32,w:58,h:56,wx:216,wy:113,
    look:()=>say(P,F.shutters?'open_country_silver_under_the_moon':'stout_wooden_shutters_barred_from_inside'),
    open:shutters,use:shutters,
    useWith:async it=>{if(it==='basket'||it==='strongbasket')return hangBasket(it);
      if(it==='rope'||it==='longrope')return say(P,'window_frame_is_only_wood_and_plaster');return false}},
  {name:'rope',x:210,y:28,w:12,h:58,wx:216,wy:113,vis:()=>F.ropeTied&&!F.basketOn,look:'anchored_to_the_beam',
    useWith:async it=>(it==='basket'||it==='strongbasket')?hangBasket(it):false},
  {name:'roof_beam',x:176,y:16,w:80,h:14,wx:216,wy:113,look:'thick_cedar_beam_set_deep',use:'i_have_no_reason_to_hang',
    useWith:async it=>{if(it==='rope')return say(P,'this_rope_would_leave_me');
      if(it!=='longrope')return false;
      SFX.creak();delItem('longrope');F.ropeTied=1;await say(P,'twice_around_the_beam_and_a_hitch');await say(P,'it_will_hold');return checkFinal()}},
  {name:'storage_jars',x:276,y:92,w:36,h:20,look:'oil_grain_and_lentils'}]};
N.hs={name:'Naomi',actor:N,look:'naomi_our_sister',
  show:{pouch:'your_tools_brother',awl:'keep_it_close',
    thread:'good_thread',knife:'put_it_away_brother_unless',
    cloth:'goat_hair_cloth_it',patch:'a_patch',
    strips:'strips_of_cloth',
    rope:'that_will_not_reach_the_ground',
    longrope:'that_will_reach',
    basket:'those_loops_are_worn_through',
    strongbasket:'now_that_is_a_basket_i',
    straps:'leather_said',
    skin:'empty_brother',skinfull:'good_said',
    tablets:'keep_them_out_of_the_sun',
    '*':'no_brother'},
  ask:{basket:'it_must_be_made_strong',rope:'it_is_no_use_to_us',
    thirst:'someone_should_give_him_a_drink'},
  talk:()=>talkTree([
    {q:'is_it_safe_here',a:async()=>{await say(N,'as_safe_as_anywhere_in_damascus_tonight');
      await say(N,'only_a_light_would_draw')}},
    {q:'how_far_is_it_to_the_ground',a:()=>say(N,'far_enough_that_i_do_not')},
    {q:'where_are_the_brothers',a:()=>say(N,'eliab_and_young_jesse_are')},
    {q:'thank_you_for_opening_your_home',once:1,a:async()=>{await say(N,'you_once_came_to_this_city');await say(N,'jehovah_does_such_things')}},
    {q:'i_will_make_ready',bye:1}])};
function setup(){P.called='Saul';place(E,'workshop',196,118,-1);place(GD,'street',270,118,1);place(Z,'street',328,116,-1);place(N,'house',172,120,-1);
  G.inv=['pouch','tablets'];drawInv()}
/* ============ SCENES: intro, finale, chapter complete ============ */
const twinkle=(g,t)=>{for(let i=0;i<6;i++)if((Math.floor(t/500)+i)%4===0)R(g,160+i*27,12+(i*17)%40,1,1,'#0a0f2e')};
function wallScene(g,t){backdrop(g,'wall');twinkle(g,t);const S=G.end||{};
  if(S.heads){
    /* Eliab (left, grey hair & beard) and Jesse (right, dark hair) leaning out the window paying out the rope */
    R(g,97.4,37.4,5.4,2.8,'#384438');R(g,98.6,34,3.2,3.4,'#8a664c');R(g,100.4,34.4,1.4,2.2,'#ac8264');
    R(g,98.2,33.4,3.8,1.1,'#989aa6');R(g,98.8,36.6,2.8,1.5,'#aeb0bc');
    R(g,107.6,37.6,5,2.6,'#62523a');R(g,108.4,34.6,3,3,'#926d52');R(g,110,35,1.4,2,'#b48a6a');
    R(g,108.1,33.8,3.6,1.3,'#241812');R(g,108.2,34.8,.8,1.2,'#241812');
    /* hands beside the rope at the sill */
    R(g,103.2,39.2,1.6,1.2,'#a0785a');R(g,106.4,39.2,1.6,1.2,'#aa8264')}
  if(S.by!=null){stroke(g,[105.5,41,105.5,S.by-22],'#b89a5a',.8);miniBasket(g,105.5,S.by,S.rider)}
  if(S.px!=null){const x=hp(S.px),y=hp(S.py),f=Math.floor(t/160)%2;oval(g,x+1.5,y,4,1,'rgba(0,0,0,.4)');
    R(g,x,y-9,3,3,'#8f6a50');R(g,x-.5,y-10,4,1.4,'#1e1410');R(g,x+2,y-7.5,1,1.2,'#1e1410');R(g,x-1,y-6,5,4,'#4e3c36');R(g,x-1,y-6,1.5,4,'#3a2c2a');R(g,x+(f?0:1),y-2,1,2,'#7a5a46');R(g,x+(f?2:1),y-2,1,2,'#7a5a46')}}
/* The title's picture is taller than a room's (VT): the same country under the moon, with the ground running on toward us, rocks and thorn
   bushes in it, under the list of chapters. Only the title screen shows all of it. Its upper 144 pixels are the backdrop of the wall, pixel
   for pixel: the ground below is painted first and only below, so that nothing moves when the title is left and the story begins. */
let TALL=null;
function tallWall(){return TALL||(TALL=bake(320,g=>{const r=rng(77),H=VT-144;
  inRect(g,0,144,320,H,()=>{g.fillStyle=lg(g,0,144,0,VT,['#0e1226','#0b0e20','#070916'].map(c=>earth1(c,.16)));g.fillRect(0,144,320,H);tex(g,'mott',.5,0,144,320,H,'overlay',1);
    /* the ground rises and falls a little: long hollows lie in shadow */
    for(const[hx,hy,hw]of[[70,158,60],[250,166,70],[150,182,90],[40,196,50],[280,198,60]])pool(g,hx,hy,hw,5,'#05060f',.35,'source-over');
    /* rocks, larger as they lie nearer: a dark body, the moon on its top and brightest on the side toward the moon, a shadow toward us.
       Few of them lie in the middle, where the chapters are listed */
    const rock=(x,y,w)=>{const h=w*.5,p=[];for(let i=0;i<=7;i++){const a=Math.PI*(1-i/7),k=.78+r()*.36;p.push(x+Math.cos(a)*w*k,y-Math.sin(a)*h*k*1.3)}p.push(x+w*.92,y+h*.3,x+w*.2,y+h*.45,x-w*.9,y+h*.3);
      oval(g,x-w*.2,y+h*.4,w*1.3,h*.5,'rgba(2,3,10,.6)');poly(g,p,'#131836');
      clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*1.2,y-h*.2,x+w*1.3,y-h*.55,x+w*1.3,y-h*2,x-w*1.2,y-h*2],'#20284e');poly(g,[x+w*.05,y-h*.5,x+w*1.3,y-h*.85,x+w*1.3,y-h*2,x+w*.35,y-h*2],'#2c3668')})};
    for(const[bx,by,bw]of[[252,152,4.5],[36,154,5],[298,160,6.5],[14,170,8],[270,172,9],[76,166,4],[306,190,11],[46,187,9.5],[236,198,7],[22,205,10],[286,207,12],[104,202,5.5]])rock(bx,by,bw);
    /* thorn bushes, and tufts of dry grass: two short blades from one root, leaning apart */
    foliage(g,4,192,13,6,'#0f1630',r,50);foliage(g,317,174,12,5.5,'#101832',r,44);foliage(g,172,208,24,6,'#0c1228',r,70);foliage(g,214,178,7,3,'#101830',r,18);
    for(let i=0;i<34;i++){const tx=r()*320,ty=150+r()*58,k=(ty-144)/H,hh=1.5+r()*(1.5+2.5*k),c=r()<.5?'#262e5a':'#1a2044';
      stroke(g,[tx,ty,tx-.7-r(),ty-hh],c,.5);stroke(g,[tx,ty,tx+.9+r(),ty-hh*.8],c,.5)}
    ao(g,0,VT-30,320,30,'b',.55,'#04050e');ao(g,0,144,36,H,'l',.3,'#04050e');ao(g,284,144,36,H,'r',.3,'#04050e')});
  ART.wall.paint(g)},0,VT))}
function titleScene(g,t){g.drawImage(tallWall(),0,0,320,VT);twinkle(g,t)}
async function start(fromPro){ov.onclick=null;ov.className='';audioInit();if(!fromPro){SFX.good();G.started=performance.now();setChapter(1)}
  await cut(async()=>{if(!fromPro)await wait(500);
    await narr('damascus_about_36_c_e',{dur:2800});
    if(!fromPro){
      await narr('saul_of_tarsus_later_known');
      await narr('now_he_himself_preaches');
    }
    await narr('opposers_have_agreed_among');
    await narr('tonight_the_brothers_have_a_plan',{dur:2800});
    await fade(1,500);G.scene=null;enterRoom('workshop',58,118,1);await fade(0,500);
    await say(E,'saul_come');await walk(P,152,122);
    await say(E,'gates_are_watched');
    await say(E,'tonight_we_lower_you_from_her_window');
    await say(E,'mine_will_do_neither_as_they_are');
    await say(P,'let_us_not_be_anxious')},true)}
async function finale(){AU.mood='calm';await wait(500);
  place(E,'house',30,116,1);place(J,'house',26,120,1);SFX.door();
  await Promise.all([walk(E,84,122),walk(J,58,126)]);P.dir=-1;N.dir=-1;
  await say(E,'rooftops_are_clear');
  await say(J,'watch_on_the_wall_has_just_passed');
  N.dir=1;await say(N,'take_this_bread_for_the_road');N.dir=-1;
  await say(P,'brothers_sister_you_have');
  const d=$('#dim');d.style.opacity=.5;[P,E,J,N].forEach(a=>a.bow=true);SFX.pray();await wait(900);
  await narr('together_they_thank_jehovah',{dur:4200,color:'#cfe2ff'});
  [P,E,J,N].forEach(a=>a.bow=false);d.style.opacity=0;await wait(500);
  await say(P,'i_came_to_this_city_with_letters');
  await say(E,'with_more_brothers_than_you_came_with_hold');
  await walk(P,216,113);await fade(1,600);
  G.scene=wallScene;G.end={heads:1,by:46,rider:1};codeBtn();AU.mood='hope';AU.amb={crickets:.8,wind:.5};await fade(0,600);
  const creak=setInterval(()=>SFX.creak(),1300);
  const down=tween(11000,k=>{G.end.by=46+74*(k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2)});
  await narr('under_cover_of_night_acts_9_25',{dur:7500});
  await down;clearInterval(creak);await wait(600);
  G.end.rider=0;G.end.px=112;G.end.py=124;SFX.step();await wait(700);
  const off=tween(9000,k=>{G.end.px=112+150*k;G.end.py=124+6*Math.sin(k*3)-k*8});
  await narr('saul_escaped_the_governors',{dur:8000});
  await off;G.end.px=null;G.end.heads=0;
  await journey();await narr('road_to_jerusalem_lay_ahead',{dur:3800});
  endScreen({title:'escape_from_damascus_2',time:1,text:'saul_used_the_skill_of_his_hands',
    extra:F.kind?['kindness_shown_to_an_opposer']:[],
    based:'based_on_acts_9_23_25_and_2',
    go:'click_to_continue_to_chapter_two',code:['chapter_two_code_code',codeOf(2,0)]});
  await wait(1500);ov.onclick=()=>startChapter(2);
  await new Promise(()=>{})}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['no_brother']};
const CALLS1={cicadas:[.8,2.2,(t,d)=>{noise({t,d:.55+Math.random()*.4,v:.045,f:5200+Math.random()*400,q:3.5,a:.15,sus:1,dest:d})}]};
return{acting:ACTING,calls:CALLS1,rooms:['workshop','street','house'],setup,start,hint,music:MUSIC,scenes:{wall:wallScene,title:titleScene},topics:TOPICS,tablets:TABLETS,
    /* the way out of this chapter, drawn on the travel map at its end (place ids from shared/map.js) */
    route:[['damascus','jerusalem','new']],
    flags:['gotAwl','gotThread','gotKnife','gotCloth','gotRope','gotSkin','gotBasket','cutCloth','longRope','metZakkai','kind',
      'awning','strong','inHouse','lampOut','shutters','ropeTied','basketOn','water'],
    ent:{workshop:[60,118,1],street:[46,114,1],house:[52,118,1]},
    inv(){const inv=['tablets'],add=(c,id)=>{if(c)inv.push(id)};
      add(!F.gotAwl,'pouch');add(F.gotAwl,'awl');add(F.gotThread,'thread');add(F.gotKnife,'knife');
      add(F.gotCloth&&!F.cutCloth,'cloth');add(F.cutCloth&&!F.awning,'patch');add(F.cutCloth&&!F.longRope,'strips');
      add(F.gotRope&&!F.longRope,'rope');add(F.longRope&&!F.ropeTied,'longrope');
      add(F.gotBasket&&!F.strong,'basket');add(F.awning&&!F.strong,'straps');add(F.strong&&!F.basketOn,'strongbasket');
      add(F.gotSkin,F.water?'skinfull':'skin');return inv}};
});
