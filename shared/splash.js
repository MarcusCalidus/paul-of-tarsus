/* Paul of Tarsus: the opening picture and its overture. Loaded once, when the game is opened (see title() in index.html).

   Before the list of chapters the game shows its name over a still life, and waits. A browser lets a page sound only after a click or a
   key, so nothing plays until then; that first click starts the overture, and when its melody has been heard the picture passes into the
   title's own, the wall of Damascus under the moon, and the chapters appear. A second click goes there at once, and the music plays on.

   The picture is one painting, made in code like every other: a tentmaker's bench by the light of one clay lamp. What lies on it, and why:
   - rolls of papyrus, one of them open, with an inkpot and a reed pen: the Scriptures Paul reasoned from, and the letters he wrote.
     A roll shows the turns of its end and no stick stands out of it, nothing is tied round one, and the writing is rows of broken
     strokes that stop short of every edge (CONTRIBUTING section 3);
   - two awls, a knife, a needle and a ball of thread, and a length of dark goat-hair cloth sewn of strips: the trade of Acts 18:3.
     Insight on the Scriptures ("Tentmaker") names the cloth of Cilicia, stiff and hard to cut and sew; The Watchtower of November 1,
     2012 ("Did You Know?") names knives and awls as the tools. The knife is a plain blade in a handle, without a guard; the tools lie
     side by side and none lies across another; the seams of the cloth run one way, and its stitches run along the seam.
   Only the flame moves, and the small glow round it.

   The overture is the theme of Chapter One, in D Hijaz, in ten bars: two bars that raise the curtain (frame drum, finger cymbals, a
   harp rising and a low horn call), the melody on the ney over a walking bass and a strummed lyre, and the melody again, higher, with
   the aulos and the horn. Then the quiet music of the title follows by itself (then: see sched() in index.html).

     scene(g,t)       paints the picture; G.scene while the splash is up
     leave(next,ms)   the picture passes into the scene next over ms milliseconds, and then next is G.scene
     score            the overture
     len, turn        seconds: how long the overture is, and when the picture begins to pass into the title's
     lamp             where the wick is */
SHARED.splash=(()=>{
"use strict";
function spline(g,p,closed){const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
  g.beginPath();g.moveTo(p[0],p[1]);
  for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);
    g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
  if(closed)g.closePath()}
function blob(g,p,c){spline(g,p,1);if(c){g.fillStyle=c;g.fill()}}
function sline(g,p,c,w){spline(g,p,0);g.strokeStyle=c;g.lineWidth=w||.5;g.lineCap='round';g.lineJoin='round';g.stroke()}
const at=(g,x,y,a,fn)=>{g.save();g.translate(x,y);g.rotate(a);fn();g.restore()};
const shadow=(g,x,y,rx,ry,a)=>pool(g,x,y,rx,ry,'#140a04',a==null?.55:a,'multiply');
/* cast: paint a thing with the shadow it throws on the bench. The shadow is the thing's own shape, dark, moved away from the lamp by
   len (twice, the nearer one stronger, for a soft edge); a thing that stands higher throws a longer one */
function cast(g,x,y,len,fn){const[c,l]=mk(VW*HR,VT*HR),d=Math.hypot(x-LAMP0[0],y-LAMP0[1])||1,dx=(x-LAMP0[0])/d*len*K*HR,dy=((y-LAMP0[1])/d*len*.6+len*.35)*K*HR;
  l.setTransform(g.getTransform());fn(l);l.setTransform(1,0,0,1,0,0);l.globalCompositeOperation='source-in';l.fillStyle='#120803';l.fillRect(0,0,c.width,c.height);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=.34;g.drawImage(c,Math.round(dx),Math.round(dy));g.globalAlpha=.4;g.drawImage(c,Math.round(dx*.55),Math.round(dy*.55));g.restore();fn(g)}

/* the things are painted in coordinates of their own and set into the picture enlarged by K about OX,OY: the rolls and the cloth run out
   of it at the sides. tx, ty: where a point of theirs comes to lie */
const K=1.25,OX=165,OY=205,tx=x=>OX+(x-OX)*K,ty=y=>OY+(y-OY)*K,LAMP0=[174,144.2],LAMP=[tx(LAMP0[0]),ty(LAMP0[1])],WALL=Math.round(ty(134)),EDGE=Math.round(ty(198));

/* ---------- the wall and the bench ---------- */
function room(g){const r=rng(1803),H=EDGE-WALL;
  ashlar(g,0,0,320,WALL,'#a8846a',r,{bw:41,bh:19,v:.1,t:.5});
  /* the bench: one broad board, its grain running along it. No joints are drawn, so that nothing that lies on it lies across one */
  R(g,0,WALL-2,320,H+2,'#8e6438');tex(g,'wood',.2,0,WALL-2,320,H+2,'overlay',1);tex(g,'mott',.3,0,WALL-2,320,H+2,'overlay',1);
  for(let i=0;i<150;i++){const y=WALL+r()*H,x=r()*340-20,w=14+r()*70;R(g,x,y,w,.5,r()<.6?rgba('#4a2c10',.1+r()*.16):rgba('#d8ac70',.08+r()*.12))}
  for(let i=0;i<7;i++)pool(g,r()*320,WALL+8+r()*(H-14),12+r()*26,2+r()*3,'#5a3a18',.14+r()*.12,'source-over');
  ao(g,0,WALL-2,320,10,'t',.6,'#1c0e06');
  R(g,0,EDGE,320,VT-EDGE,'#5c3c1e');tex(g,'wood',.2,0,EDGE,320,VT-EDGE,'overlay',1);R(g,0,EDGE,320,1,'#c69e64');ao(g,0,EDGE+1,320,VT-EDGE-1,'b',.6,'#120804')}

/* ---------- a rolled-up roll, lying: from its far end at 0,0 along the x axis; its near end shows the turns ---------- */
function roll(g,x,y,len,rad,ang,seed){const r=rng(seed);
  at(g,x,y,ang,()=>{
    clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2);g.ellipse(0,0,rad*.4,rad,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-rad,0,rad,[[0,'#d8c088'],[.16,'#fff2c8'],[.42,'#dcc288'],[.72,'#94743e'],[1,'#4a3414']]);g.fillRect(-4,-rad-1,len+8,rad*2+2);
      for(let u=-3;u<len+2;){const w=1.5+r()*4;R(g,u,-rad,w,rad*2,r()<.5?rgba('#8a6830',.04+r()*.08):rgba('#fff6d2',.04+r()*.08));u+=w}
      tex(g,'mott',.3,-4,-rad-1,len+8,rad*2+2,'overlay',1);ao(g,-4,-rad,10,rad*2,'l',.3,'#5a3c14')});
    oval(g,len,0,rad*.42,rad,'#6e5228');oval(g,len+.3,0,rad*.42-.9,rad-1.4,'#b2945a');oval(g,len+.5,0,rad*.42-1.5,rad-3,'#6a4e24');R(g,len-.2,-.9,1.4,1.8,'#2e2010')})}

/* ---------- the open roll: its rolled part at the left, the open part lying toward the lamp, its end curling up ---------- */
function openRoll(g){const r=rng(424),S=[111,166,128,166.6,150,167.8,172,169,181,169.6,183.5,180,184,191.5,172,192.6,150,193.4,128,194,110,194.2,110.4,180];
  
  clipTo(g,()=>blob(g,S),()=>{g.fillStyle=lg(g,110,0,186,0,['#d2b880','#ead9a8','#efe0b4','#e2cd98']);g.fillRect(104,160,86,40);
    for(let y=162;y<198;){const h=1+r()*2.4;R(g,104,y,86,h,r()<.5?rgba('#8a6830',.03+r()*.07):rgba('#fff6d2',.04+r()*.08));y+=h}
    tex(g,'mott',.3,104,160,86,40,'overlay',1);ao(g,176,160,10,40,'r',.3,'#6e4c1e');pool(g,131,192,12,5,'#a8823e',.25,'multiply');
    /* two columns of writing: rows of broken strokes, as words, none reaching an edge */
    for(const[x0,x1]of[[118,143],[150,174]])for(let k=0;k<6;k++){const y=172.2+k*3.3+(x0-118)*.04;let x=x0+(k?0:r()*3);const end=k===5?x0+10+r()*8:x1-r()*3;
      while(x<end-1.5){const w=Math.min(end-x,1.6+r()*3.6);R(g,x,y,w,.6,rgba('#2a1c10',.62+r()*.2));x+=w+1.1}}});
  /* its end curls up off the bench: a narrow roll along the edge, lit along its top */
  at(g,182.4,168.8,1.49,()=>{const len=23,rad=2.4;clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2)},()=>{
    g.fillStyle=lg(g,0,-rad,0,rad,[[0,'#fff4cc'],[.4,'#e4cc94'],[1,'#8a6a34']]);g.fillRect(-1,-rad-1,len+2,rad*2+2)});oval(g,len,0,rad*.5,rad,'#6e5228');R(g,len-.3,-.6,1,1.2,'#b2945a')});
  /* the rolled part, lying along the left edge */
  at(g,105.6,167.2,1.552,()=>{const len=26.5,rad=4.6;
    clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2);g.ellipse(0,0,rad*.4,rad,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-rad,0,rad,[[0,'#8a6c38'],[.25,'#c4a86e'],[.6,'#f0e0b2'],[1,'#b89a60']]);g.fillRect(-3,-rad-1,len+6,rad*2+2);tex(g,'mott',.3,-3,-rad-1,len+6,rad*2+2,'overlay',1)});
    oval(g,len,0,rad*.42,rad,'#6e5228');oval(g,len+.3,0,rad*.42-.8,rad-1.3,'#b2945a');R(g,len-.2,-.8,1.3,1.6,'#2e2010')})}

/* ---------- the inkpot and the reed pen ---------- */
function ink(g){
  blob(g,[116,148.5,121.5,149.5,124.6,154,123.6,159,120,161,113,161,109.4,159,108.4,154,111,149.6],'#7a5a3c');
  clipTo(g,()=>blob(g,[116,148.5,121.5,149.5,124.6,154,123.6,159,120,161,113,161,109.4,159,108.4,154,111,149.6]),()=>{
    g.fillStyle=lg(g,108,0,125,0,['#5a4028','#8a684a','#a88462','#74563a']);g.fillRect(106,146,22,18);ao(g,106,154,22,8,'b',.4,'#1c0e06');tex(g,'mott',.3,106,146,22,18,'overlay',1)});
  oval(g,116.4,150.2,5,2.1,'#9c7a58');oval(g,116.4,150.5,3.6,1.4,'#120c0a');
  /* the pen lies beside it on the wood, cut slanting at its point. Its joints are not drawn: each would be a stroke across it */
  at(g,126.5,163.2,-.17,()=>{R(g,0,-.6,19,1.3,'#c8a460');R(g,0,-.6,19,.5,'#ecd294');
    poly(g,[19,-.6,22.4,.5,19,.7],'#b08c48');poly(g,[21,.05,22.4,.5,21,.6],'#1c120a')})}

/* ---------- the lamp: a clay bowl with a spout for the wick ---------- */
function lamp(g){const[lx,ly]=LAMP0,B=[137.6,145.6,139.6,150.2,145.6,153.6,153,154.6,160.4,153.4,166,150.4,171.6,148.8,176.4,148,178,146,175.4,144,168,143.2,161,141.2,152,140.4,143.6,141.4,138.8,143.4];
  /* a small lug to hold it by, at the back */
  blob(g,[138.6,143.6,134.4,143.2,132.6,145.4,134,147.8,138,148.2],'#7e4826');
  /* the bowl: seen a little from above, so that its side stands under its top. Lit from its own flame, at the right */
  blob(g,B,'#a8623a');
  clipTo(g,()=>blob(g,B),()=>{g.fillStyle=lg(g,0,140,0,155,[[0,'#c88654'],[.4,'#a6603a'],[1,'#4e2812']]);g.fillRect(130,138,50,18);
    g.fillStyle=lg(g,136,0,178,0,[[0,'rgba(20,8,4,.5)'],[.5,'rgba(20,8,4,0)'],[1,'rgba(255,214,150,.3)']]);g.fillRect(130,138,50,18);tex(g,'mott',.3,130,138,50,18,'overlay',1)});
  /* its top: the rim, the hollow inside it, and the hole it is filled through */
  oval(g,152,145,12.6,4.1,'#d0935e');oval(g,152,145.3,10.4,3.1,'#a8683c');oval(g,152.6,145.7,9,2.3,'#bc7a4a');oval(g,152,145.6,3.6,1.3,'#1a0c06');
  /* the spout: its top runs on from the rim, and the wick lies in its mouth */
  poly(g,[162.6,142.8,170,143.4,175.6,144.2,177.8,146,175.6,147.4,170,147.6,163.6,147.8],'#c88856');poly(g,[163.6,147.8,170,147.6,175.6,147.4,177.8,146,176.4,148,171.6,148.8,166,150.4],'#8a4c28');
  oval(g,lx,ly+1.4,2.4,1.2,'#2a1408');R(g,lx-1,ly-.2,2,1.6,'#3a2414')}

/* ---------- the tools: two awls and a knife, side by side ---------- */
function awl(g,x,y,ang,k){at(g,x,y,ang,()=>{g.scale(k,k);
  const H=[0,0,1.6,-2.8,5.4,-3.8,9.6,-3.2,12.6,-1.9,13.6,0,12.6,1.9,9.6,3.2,5.4,3.8,1.6,2.8];
  blob(g,H,'#8a5a2c');clipTo(g,()=>blob(g,H),()=>{g.fillStyle=lg(g,0,-3.8,0,3.8,[[0,'#f6cc8c'],[.22,'#d8975a'],[.6,'#8a5226'],[1,'#3a1e0c']]);g.fillRect(-1,-4,16,8);tex(g,'wood',.3,-1,-4,16,8,'overlay',.5)});
  R(g,12.6,-1.8,2.4,3.6,'#5e584e');R(g,12.6,-1.8,2.4,1.2,'#d8d2c2');
  poly(g,[15,-1.2,33,-.1,33,.4,15,1.2],'#6e6a62');poly(g,[15,-1.2,33,-.1,15,-.1],'#fbf8ee')})}
function knife(g,x,y,ang,k){at(g,x,y,ang,()=>{g.scale(k,k);
  const H=[0,0,1,-2.4,6,-3,13,-2.7,15,-2.4,15,2.4,13,2.7,6,3,1,2.4];
  blob(g,H,'#5a381c');clipTo(g,()=>blob(g,H),()=>{g.fillStyle=lg(g,0,-3,0,3,[[0,'#eebc7c'],[.25,'#b87c44'],[.65,'#70441e'],[1,'#2e1a0a']]);g.fillRect(-1,-3.4,17,7);tex(g,'wood',.3,-1,-3.4,17,7,'overlay',.5)});
  /* the blade: a straight back, the edge curving up to the point. Its flat is bright, its ground edge brighter still */
  const Bl=[15,-2.4,40,-2.2,44,-1.5,40,1.6,34,3,26,3.4,15,3];poly(g,Bl,'#9a9890');
  clipTo(g,()=>poly(g,Bl),()=>{g.fillStyle=lg(g,0,-2.4,0,3.4,[[0,'#ffffff'],[.3,'#d6d4cc'],[.62,'#8a8880'],[.8,'#6a6862'],[.82,'#f4f2ea'],[1,'#fffef6']]);g.fillRect(14,-3,31,7)})})}

/* ---------- the cloth: dark goat hair, sewn of strips. It lies spread on the bench, gathered at the far corner, and hangs over the edge; the
   needle is left in the seam, and its thread runs back to the ball ---------- */
function cloth(g){const r=rng(5150),A=[330,143],SEAM=[247,191.4],
    C=[240,171,242.6,165,248,161.6,255,162.6,260,158,269,155.6,279,155.4,289,152,304,150,324,147,324,214,263,214,258.6,207,254,203.6,250,198.4,251.4,192,246,188,247.4,181,242,177];
  
  blob(g,C,'#5c4c40');
  clipTo(g,()=>blob(g,C),()=>{g.fillStyle=lg(g,240,160,322,214,['#7c6a58','#5e4e42','#40342c','#2a221e']);g.fillRect(236,144,90,72);
    /* folds that fan out from where it is gathered: each a hollow that widens toward the hem, with a lit back beside it */
    const fan=(x0,y0,x1,y1,c)=>poly(g,[A[0],A[1],x0,y0,x1,y1],c);
    for(const[x0,y0,x1,y1]of[[238,177,244,185],[247,199,254,208],[270,216,282,216],[302,216,311,216],[253,157,260,153]]){
      fan(x0,y0,x1,y1,rgba('#0e0a08',.22));fan(x0+(x1-x0)*.3,y0+(y1-y0)*.3,x1,y1,rgba('#0e0a08',.2));fan(x0+(x1-x0)*.62,y0+(y1-y0)*.62,x1,y1,rgba('#0e0a08',.2))}
    for(const[x0,y0,x1,y1]of[[239,168,241,176],[246,188,248,197],[257,210,266,216],[288,216,298,216],[264,151,273,150]]){
      fan(x0,y0,x1,y1,rgba('#c4b098',.2));fan(x0,y0,x0+(x1-x0)*.5,y0+(y1-y0)*.5,rgba('#c4b098',.22))}
    /* the seam between two strips follows the fan, a little lighter */
    stroke(g,[A[0],A[1],SEAM[0],SEAM[1]],rgba('#c0ac92',.4),.6);
    tex(g,'grain',.34,236,144,90,72,'overlay',.5);tex(g,'mott',.4,236,144,90,72,'overlay',1);
    for(let i=0;i<120;i++){const x=240+r()*82,y=150+r()*62;R(g,x,y,1+r()*1.6,.5,rgba(r()<.5?'#a8947c':'#0e0a08',.3))}});
  /* its hem, wavy, catching the light */
  sline(g,[240,171,242.6,165,248,161.6,255,162.6,260,158,269,155.6,279,155.4,289,152,304,150],rgba('#c8b49a',.7),.8);
  sline(g,[242,177,247.4,181,246,188,251.4,192,250,198.4,254,203.6,258.6,207,263,214],rgba('#a8947c',.6),.8);sline(g,[240,171,242,177],rgba('#c8b49a',.7),.8);
  /* the stitches lie along the seam; the needle is in line with them */
  const ang=Math.atan2(SEAM[1]-A[1],SEAM[0]-A[0]),on=u=>[A[0]+(SEAM[0]-A[0])*u,A[1]+(SEAM[1]-A[1])*u];
  for(let k=0;k<6;k++)at(g,...on(.72+k*.045),ang,()=>R(g,0,-.4,2.2,.8,'#e8d8b0'));
  at(g,...on(.7),ang+Math.PI,()=>{R(g,0,-.5,8,1,'#c8c6be');R(g,0,-.5,8,.4,'#fffdf4')});
  sline(g,[258.6,151,256.4,157,259,162,264,166.4,...on(.6)],'#dccca2',.6)}
function ball(g){const cx=255,cy=146,rr=7.2;
  clipTo(g,()=>oval(g,cx,cy,rr,rr*.94),()=>{g.fillStyle=rg(g,cx+2,cy-2.5,rr*1.5,['#f2e6c4','#d6c698','#a08c5c','#6e5c34']);g.fillRect(cx-9,cy-9,18,18);
    /* the windings: arcs that run one way round the ball */
    for(let k=-5;k<=5;k++)sline(g,[cx-9,cy+k*1.7+2.6,cx-3,cy+k*1.7+.4,cx+3,cy+k*1.7-1,cx+9,cy+k*1.7-3.2],rgba('#6a5630',.42),.5)})}

/* ---------- the three rolls, lying one on two, and everything in its place ---------- */
function things(g){
  cast(g,40,172,5,l=>{roll(l,20,165,70,6.6,-.03,11);roll(l,14,179.5,76,7,.025,23)});
  cast(g,40,166,3,l=>roll(l,24,166.6,66,6.2,.012,37));
  cast(g,116,156,5,ink);cast(g,146,182,2.4,openRoll);cast(g,150,150,3,lamp);cast(g,255,146,5,ball);cast(g,270,180,3.4,cloth);
  cast(g,210,163,2.4,l=>awl(l,194,161,.07,1.15));cast(g,214,175,2.2,l=>awl(l,200,174,.03,.98));cast(g,214,187,1.6,l=>knife(l,191,187.5,-.035,1.12))}

/* ---------- the light of the one lamp ---------- */
function light(g){const[lx,ly]=LAMP,[c,l]=mk(VW*HR,VT*HR);l.scale(HR,HR);l.fillStyle='#2c2238';l.fillRect(0,0,VW,VT);
  pool(l,lx,ly-10,215,140,'#ffb880',.95);pool(l,lx,ly-4,100,66,'#ffcf98',.7);pool(l,lx,ly+2,30,18,'#ffd8a8',.4);
  comp(l,'multiply',1,()=>{ao(l,0,0,VW,70,'t',.8,'#0a0614');ao(l,0,VT-22,VW,22,'b',.45,'#0a0614');ao(l,0,0,40,VT,'l',.26,'#0a0614');ao(l,276,0,44,VT,'r',.36,'#0a0614')});
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='multiply';g.drawImage(c,0,0);g.restore();
  pool(g,lx,ly-1,18,13,'#ff9c40',.4)}

let BG=null,out=null;
const build=()=>bake(VW,g=>{room(g);g.save();g.translate(OX-OX*K,OY-OY*K);g.scale(K,K);things(g);g.restore();light(g)},12,VT);
function scene(g,t){const k=out?clamp((performance.now()-out.t0)/out.ms,0,1):0;
  if(out){out.next(g,t);if(k>=1){if(G.scene===scene)G.scene=out.next;return}g.globalAlpha=1-k}
  g.drawImage(BG||(BG=build()),0,0,VW,VT);const[lx,ly]=LAMP;
  g.save();g.translate(lx,ly);g.scale(1.8,1.8);flame(g,-.5,0,t,1);g.restore();
  pool(g,lx,ly-5,20+Math.sin(t/190)*.9,15,'#ff9838',(.16+.015*Math.sin(t/83))*g.globalAlpha);g.globalAlpha=1}
function leave(next,ms){if(!out)out={next,ms:Math.max(1,ms),t0:performance.now()}}

/* ---------- the overture ---------- */
const _=null,
 NEY=[[[0,4,6],[6,5,2],[8,4,4],[12,3,2],[14,2,2]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,4,12]],
  [[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,5,2],[2,4,2],[4,3,4],[8,2,4],[12,1,4]],[[0,2,3],[3,1,1],[4,0,4],[8,1,2],[10,2,2],[12,1,4]],[[0,0,14]]],
 score={dt:.165,root:50,scale:[0,1,4,5,7,8,10],bars:10,tracks:[
  {drone:[-12],every:32},
  {inst:'bass',prog:'MMAABACABA',len:6,seq:{M:[-7,_,_,_,_,_,_,-3,-7,_,_,_,_,_,_,_],A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,-5,_]}},
  {inst:'oud',prog:'MMAABACABA',seq:{M:[0,_,4,_,7,_,4,_,0,_,4,_,7,_,11,_],A:[0,_,4,_,7,_,4,_,0,_,4,_,8,_,7,_],B:[3,_,5,_,7,_,5,_,3,_,5,_,9,_,7,_],C:[1,_,3,_,5,_,3,_,1,_,4,_,6,_,4,_]}},
  {inst:'lyre',prog:'MMAABACABA',len:3,vol:.95,seq:{M:[0,_,_,4,_,_,7,_,4,_,_,7,_,11,_,_],A:[0,_,_,4,_,_,7,_,4,_,_,8,_,_,7,_],B:[3,_,_,5,_,_,7,_,5,_,_,9,_,_,7,_],C:[1,_,_,3,_,_,5,_,3,_,_,6,_,_,4,_]}},
  /* the harp: the rising sweep of the first two bars, a few notes off the beat under the melody, broken chords under its return */
  {inst:'harp',oct:12,vol:.95,lines:[[[0,0,2],[2,2,2],[4,4,4],[8,7,2],[10,8,2],[12,7,4]],[[0,4,2],[2,7,2],[4,9,2],[6,11,2],[8,14,8]],
    [[4,4,4],[12,8,4]],[[4,3,4],[8,7,6]],[[4,4,4],[12,9,4]],[[4,7,2],[6,8,2],[8,9,2],[10,11,6]],
    [[2,4,2],[4,7,2],[6,11,2],[10,9,2],[12,7,4]],[[2,5,2],[4,7,2],[6,9,2],[10,7,2],[12,4,4]],[[2,4,2],[6,7,2],[10,5,2],[14,4,2]],[[0,0,2],[2,4,2],[4,7,4],[8,14,8]]]},
  {inst:'ney',oct:12,vol:1.15,lines:[[],[],...NEY]},
  /* the aulos answers the ends of the first phrases, then plays the melody's return with the ney */
  {inst:'aulos',hold:0,oct:12,vol:.85,lines:[[],[],[[0,4,6]],[[8,0,8]],[[8,5,4],[12,4,4]],[[0,4,8],[8,5,4],[12,6,4]],...NEY.slice(4)]},
  /* the horn: its call in the first two bars, then a line of its own under the melody and with it at its return */
  {inst:'horn',vol:1.05,lines:[[[0,0,4],[4,4,8],[12,5,2],[14,4,2]],[[0,4,6],[6,2,2],[8,4,8]],
    [[0,0,6],[6,1,2],[8,0,4],[12,-1,4]],[[0,-1,4],[4,-2,4],[8,-3,8]],[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,4,8],[8,0,4],[12,2,4]],
    [[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,5,4],[4,3,4],[8,2,4],[12,1,4]],[[0,2,4],[4,0,4],[8,1,4],[12,1,4]],[[0,0,14]]]},
  {drum:1,prog:'FFAAABAAAC',seq:{F:'b...d.t.d.ktd.tk',A:'d.skt.s.d.skt.sk',B:'b.skt.s.d.skt.tk',C:'b.skt.s.b...d...'}}]};
const len=score.bars*16*score.dt;
return{scene,leave,score,len,turn:len-3.2,lamp:LAMP,get out(){return!!out}}})();
