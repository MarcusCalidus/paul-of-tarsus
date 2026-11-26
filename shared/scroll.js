/* Paul of Tarsus: the narrator's scroll, shared by every chapter. Loaded the first time a line of narration is told in the dark
   (see say() and need() in index.html).

   A line told while the picture is dark (the view faded out, or the scene DARK) is not set on a black screen: it is read from an open
   roll of papyrus, held in two hands by lamplight. The picture is one painting, made in code like every other: a stone wall with a clay
   lamp in a niche and another on a shelf, the open part of the roll with its two rolled-up ends, and a hand on each. Only the two flames
   move, and the small glow round each, as in the game's rooms; once, after the game's last line, the hands close the roll (close()).

   What it shows, and why it is drawn as it is:
   - A roll, not a single sheet: what the narrator tells is for the most part Luke's account, a book, and a book was a roll.
   - The fibers of the papyrus run one way, across, and nothing is ruled on it; no rod stands out of a rolled end and nothing is tied
     round one; each thumb rests on its roll and does not lie across it (CONTRIBUTING section 3).
   - The hands follow the maintainer's example: seen from the back, the forefinger gone behind the roll, the thumb on it with its nail
     and the folds of its joint. A hand is painted in tones of grey, as light, and then set in a short scale of skin tones with the same
     ordered dither as the backdrops (tones); the sleeve is set in a scale of wool tones.

     up()      the scroll comes up out of the dark, with a soft rustle (SFX.unroll); resolves when it is there
     down()    it goes down again; resolves when it is gone
     off()     it is gone at once (a code is entered, the title is opened)
     rest()    a line has ended: if nothing follows soon, the scroll goes down by itself
     fit(el)   set a line of narration on the open part, in ink: a short line is written larger, a long one smaller, and a
               reference such as (Acts 13:14) is never divided over two lines. A line that does not fit even in the smallest
               writing is noted in over (the playtest checks that it stays empty)
     close(o)  the game's last line has been read: the hands close the roll (o.lay: and lay it down below the lamp); see below
     open()    the roll stands open again
     draw(ts)  called for every frame by render() while the scroll is not down
     state     'down', 'up' or 'moving' */
SHARED.scroll=(()=>{
"use strict";
/* --- smooth shapes: a closed curve through its points, and an open line through its points --- */
function spline(g,p,closed){const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
  g.beginPath();g.moveTo(p[0],p[1]);
  for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);
    g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
  if(closed)g.closePath()}
function blob(g,p,c){spline(g,p,1);if(c){g.fillStyle=c;g.fill()}}
function sline(g,p,c,w){spline(g,p,0);g.strokeStyle=c;g.lineWidth=w||.5;g.lineCap='round';g.lineJoin='round';g.stroke()}
const W_=a=>`rgba(255,255,255,${a})`,K_=a=>`rgba(0,0,0,${a})`,GV=v=>{const k=Math.round(clamp(v,0,1)*255);return`rgb(${k},${k},${k})`};

/* ---------- the room behind: a stone wall at night, a lamp in its niche, a lamp and a jug on a shelf ---------- */
const LAMPS=[[29.1,35.7],[305.6,32.3]];   /* where the two wicks are */
function room(g){const r=rng(4711),[[ax,ay],[bx,by]]=LAMPS;
  ashlar(g,0,0,320,144,'#a39783',r,{bw:31,bh:13.5,v:.1,t:.5});
  /* the niche, upper left */
  R(g,12,19,24,23,'#7a7062');oval(g,24,20,12,4.6,'#7a7062');R(g,14.5,21,19,19.5,'#241e1c');oval(g,24,22,9.5,3.8,'#241e1c');R(g,11,40.5,26,1.8,'#cfc4b0');R(g,11,42.3,26,.7,'#5a5246');
  vessel(g,22.5,40.4,5,3.6,'#b06a3a','bowl',{noShadow:1});poly(g,[26,37.2,30.5,36.8,31,38.3,26,39.4],'#a05c30');R(g,28.6,36.2,1.5,1,'#3a2416');
  /* the shelf, upper right: it runs out of the picture, so that nothing holds it up in the middle */
  wood(g,286,37,34,2.6,'#70502e');ao(g,286,39.6,34,6,'t',.45);
  vessel(g,299,37,5,3.6,'#b06a3a','bowl',{noShadow:1});poly(g,[302.5,33.8,307,33.4,307.5,34.9,302.5,36],'#a05c30');R(g,305.1,32.8,1.5,1,'#3a2416');vessel(g,315,37,3.4,8,'#8a744a','jug',{noShadow:1});
  /* the light of the two lamps; everything else is dark */
  lightmap(g,320,'#1d1726',l=>{pool(l,ax,ay-2,62,52,'#ffc888',.95);pool(l,ax,ay-1,24,20,'#ffe2a8',.8);pool(l,bx,by-4,74,58,'#ffc888',.95);pool(l,bx,by-2,26,20,'#ffe2a8',.8);
    comp(l,'multiply',1,()=>{ao(l,0,96,320,48,'b',.55,'#0c0818');ao(l,0,0,320,16,'t',.4,'#0c0818')})});
  pool(g,ax,ay,13,10,'#ff9c40',.4);pool(g,bx,by,14,10,'#ff9c40',.4)}

/* ---------- the open part of the roll: papyrus, its fibers running across, its upper and lower edge worn ---------- */
/* SH is the stretch of papyrus that lies open in the reader's hands, ROLLS where its two rolled-up ends stand. They are the open picture's;
   a picture of the roll being closed passes its own (see FRAMES) */
const SH={x0:66,x1:274,y0:7,y1:137},ROLLS=[60,263],ROLL_W=17;
/* sh: the stretch that lies open when the roll is open; from: where it now goes into the left-hand roll, as the roll is closed. The
   papyrus that is still open stays where it lay, so it is painted whole and cut at from: its fibers and stains do not move */
function sheet(g,sh=SH,from=sh.x0){const r=rng(31337),e=rng(90210),{x0,x1,y0,y1}=sh,w=x1-x0,h=y1-y0,P=[],nick=(v,at,wd,d)=>{const k=Math.abs(v-at)/wd;return k<1?d*(1-k*k):0};
  if(from>=x1)return;
  const cut=from>x0;if(cut){g.save();g.beginPath();g.rect(from,y0-4,x1-from+4,h+8);g.clip()}
  for(let x=x0;x<=x1;x+=1.5+e()*4)P.push(x,y0+(e()-.5)*.9+nick(x,131,4,1.6)+nick(x,208,3,1.2)+.5*Math.sin(x/9.3));
  for(let x=x1;x>=x0;x-=1.5+e()*4)P.push(x,y1+(e()-.5)*.9-nick(x,226,4,1.6)-nick(x,118,3,1.2)-.5*Math.sin(x/8.1));
  clipTo(g,()=>poly(g,P),()=>{g.fillStyle=lg(g,0,y0,0,y1,['#ecdcae','#e2cd9a','#d6bd86']);g.fillRect(x0-3,y0-3,w+6,h+6);
    /* strips laid side by side: each a little lighter or darker than the next. They are tones, not lines: the writing lies on them */
    for(let y=y0-1;y<y1+1;){const hh=1+r()*2.6;R(g,x0-3,y,w+6,hh,r()<.5?rgba('#8a6830',.03+r()*.07):rgba('#fff6d2',.04+r()*.09));y+=hh}
    tex(g,'wood',.5,x0-3,y0-3,w+6,h+6,'overlay',.5);tex(g,'mott',.34,x0-3,y0-3,w+6,h+6,'overlay',1);tex(g,'grain',.1,x0-3,y0-3,w+6,h+6,'overlay',.5);
    /* darker toward its edges, and a few old stains */
    ao(g,x0,y0-1,w,10,'t',.26,'#6e4c1e');ao(g,x0,y1-11,w,12,'b',.32,'#6e4c1e');
    for(let k=0;k<14;k++){const top=k%2,px=x0+r()*w,py=top?y0+r()*3:y1-r()*3;pool(g,px,py,5+r()*9,4+r()*6,'#9a7434',.12+r()*.2,'multiply')}
    pool(g,246,124,24,13,'#a8823e',.3,'multiply');pool(g,96,16,20,9,'#a8823e',.22,'multiply');pool(g,232,18,13,6,'#a8823e',.16,'multiply');
    /* the reader's own light, above the middle */
    comp(g,'multiply',1,()=>{g.fillStyle=rg(g,170,36,190,['#ffffff','#fff6e2','#c8ac86']);g.fillRect(x0-3,y0-3,w+6,h+6)})});
  g.save();poly(g,P);g.strokeStyle=rgba('#4e3410',.5);g.lineWidth=.5;g.stroke();g.restore();
  if(cut)g.restore()}
/* a rolled-up end, standing upright. Its upper end shows the turns of the roll and, as the dark middle, the end of the stick it is wound
   on: the stick does not stand out of it. flip: the right-hand roll, lit from the other side. o.lit: the side its light comes from, when
   that is not its own (0 the left lamp, 1 the right); o.bare: no open papyrus beside it to throw its shadow on */
function roll(g,x,flip,sh=SH,o={}){const w=ROLL_W,y0=sh.y0-2.5,y1=sh.y1+1.5,h=y1-y0,cx=x+w/2,r=rng(Math.round(x)*31+7),lit=o.lit==null?flip:o.lit,
    st=[[0,'#8e6e3c'],[.13,'#c4a86e'],[.36,'#f3e4b8'],[.6,'#dfc993'],[.85,'#b3935a'],[1,'#7e6034']];
  if(!o.bare)ao(g,flip?x-9:x+w,y0+4,9,h-7,flip?'r':'l',.42,'#5a3c14');   /* its shadow on the open part */
  clipTo(g,()=>{g.beginPath();g.rect(x,y0,w,h);g.ellipse(cx,y1,w/2,2.6,0,0,6.2832)},()=>{g.fillStyle=lg(g,lit?x+w:x,0,lit?x:x+w,0,st);g.fillRect(x-1,y0-1,w+2,h+6);
    for(let y=y0;y<y1+3;){const hh=1+r()*2.6;R(g,x-1,y,w+2,hh,r()<.5?rgba('#8a6830',.04+r()*.08):rgba('#fff6d2',.04+r()*.08));y+=hh}
    tex(g,'wood',.42,x-1,y0-1,w+2,h+6,'overlay',.5);ao(g,x,y0,w,8,'t',.3,'#6e4c1e');ao(g,x,y1-7,w,10,'b',.34,'#6e4c1e');
    if(o.seam)ao(g,o.seam>0?x+w-4:x,y0,4,h+3,o.seam>0?'r':'l',.4,'#4a3010')});   /* where it stands against the other roll */
  oval(g,cx,y0,w/2,2.6,'#6e5228');oval(g,cx+(lit?.8:-.8),y0+.2,w/2-2.2,1.7,'#a88a52');oval(g,cx+(lit?1.4:-1.4),y0+.3,w/2-4.6,1.1,'#5e4420')}

/* ---------- the hands ---------- */
/* tones: set a layer that was painted in greys into a scale of colors, darkest first, with the ordered dither of finish(): one dither
   cell to the room pixel. What is not painted stays clear. */
const SKIN=['#3a1e14','#57301f','#75452d','#925c3c','#ab744e','#c18b62','#d5a378','#e6bc92','#f2d3b0'],
  WOOL=['#231f17','#383224','#4f4734','#675e47','#7f755a','#978c6f','#ada285'];
function tones(c,g,pal){const w=c.width,h=c.height,im=g.getImageData(0,0,w,h),d=im.data,n=pal.length-1,P=pal.map(hex);
  for(let y=0,i=0;y<h;y++)for(let x=0;x<w;x++,i+=4){if(d[i+3]<128){d[i+3]=0;continue}d[i+3]=255;
    const v=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)/255*n,t=(BAYER[((y>>1)&3)*4+((x>>1)&3)]+.5)/16,p=P[clamp(Math.floor(v+t),0,n)];d[i]=p[0];d[i+1]=p[1];d[i+2]=p[2]}
  g.putImageData(im,0,0)}
/* A hand is drawn in the hand's own space, for a roll whose outer edge stands at x=76; at() shifts it to its roll (HX, and the pose's own
   dx), and mirrors the right hand, which is then lit from its own side, by its own lamp. A pose holds every shape and every stroke of a
   hand, its thumb and its sleeve, each placed by hand: OPEN(f) is the open picture's (f=1 the right hand), CLOSING the left hand's as it
   brings its roll over to the right one. No pose is made from another by scaling or turning it. */
const HX=ROLLS[0]-76,at=(g,fn,P)=>{g.save();if(P.flip){g.translate(340,6);g.scale(-1,1)}g.translate(HX+(P.dx||0),0);fn(g,P);g.restore()};
/* the open picture: the back of the hand with the forefinger, the thumb, and the sleeve */
const OPEN=flip=>({flip,dx:0,
  hand:[30,106,33,101,36.4,96.5,40.5,90.6,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,80.5,100,77,104,73,108.5,68,114,61.5,119,54,123.5,44,125,34,117],
  tone:flip?.6:.56,box:[20,36,70,96],
  /* asymmetric lighting: the left lamp sits recessed in its niche; the right lamp stands open and higher on the shelf */
  grad:[flip?44:40,flip?56:64,flip?80:76,112,flip?.36:.27,flip?.38:.44],
  hi:[[flip?52:54.5,flip?82:86,12,17,flip?.34:.26],[49,flip?72:75,7,9,flip?.24:.18],[43.5,99,5,7,flip?.22:.28]],
  ao:[64,56,17,56,'r',flip?.34:.4],lo:[[68,114,18,13,flip?.42:.48],[57,70.5,5,3.6,.22]],
  /* the forefinger: round, lit along its upper side, dark along the side toward the thumb */
  finger:[[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],flip?.46:.38,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],.32,[55.5,63.5,5,4.4,flip?.32:.26]],
  /* softer knuckle creases, thumb-root folds, wrist lines, and subtle asymmetric sinews */
  creases:[[64.4,52.6,66.6,55,69.4,57.6],[66.6,51.2,68.8,53.4,71.2,55.8],[58.4,58.2,61.6,61,65.2,63.8],[56.8,60.6,59.6,63.4,62.8,65.8]],
  folds:[[62,80.4,66.6,81.4,71.6,81],[63.6,83.6,67.8,84.4,72,83.8],[61,77,65,78,69,77.2]],
  wrist:[[48,106.5,53.5,112,60,116],[51,104.5,57,110,63.5,113.5]],
  sinews:[[[47,98,51+(flip?.8:0),88,56,78,60,70],K_(.1),1.3],[[52,102,57,92-(flip?1:0),62,84],K_(.08),1.1],[[45.6,97.6,49.6+(flip?.8:0),87.6,54.6,77.6,58.6,69.6],W_(.13),.8]],
  /* where it comes out of the sleeve it lies in the sleeve's shade */
  cuff:[31,99,37,104,42.6,110.4,48,116.4,53,121.6,58,125],
  /* the dark between forefinger and thumb, where the roll goes in */
  crotch:[76.5,52,72.5,55.2,68.8,59.2,66,63.4,66.4,65.2,69.6,62.6,73,59.4,76.5,56.6],
  thumb:[66.2,65,69,61.6,72.6,58.2,75.6,55,78,52,80.6,48.8,83.8,46.6,87.6,46.2,90.9,48.2,92.5,52,92.1,56.4,90.5,60.2,88.3,63.8,85.3,67.4,81.9,71.2,78.4,75.2,75.6,79.2,72,81.4,67,80,63.5,74.5,63.6,68.5],
  ttone:flip?.62:.59,tbox:[56,40,44,48],
  /* round across: lit on the side toward each hand's lamp, dark on the other */
  tgrad:[flip?73:71,flip?53:56,84,64.4,flip?.4:.32,flip?.46:.52],
  tlit:[[71,66,75,61,79,56.4,82.4,52.4],flip?.3:.24],tpool:[69,73.5,5,4.5,.14],
  /* the nail, and softer folds of the joint */
  nail:[85.2,47.6,88.2,48.2,90.3,51.2,88.6,54.6,86,56.8,83.2,55.6,81.2,53,82.8,49.6],nailhi:[85,49,87.6,49.6,88.6,51.6,86,52.4,84,51.2],
  nailrim:[[81.2,53.2,83.3,55.7,86,56.9,88.5,54.8],[81.1,53,82.7,49.5,85.2,47.5]],
  joint:[[75.2,58.4,79,59.4,83,61.2],[74,61,78,62.2,81.6,64],[73.2,63.8,76.6,65,79.6,66.6]],
  tshadow:[flip?2.2:3,flip?2.8:2.4,flip?.54:.62],
  sleeve:[-12,132,3,122.4,8.8,116.5,18,105.6,27.2,101,33,101.4,38,106,43.5,112,49,118,53.8,123.2,57.2,134.8,58.6,150,-12,150],
  stone:flip?.52:.49,sbox:[-14,96,80,56],sgrad:[14,100,44,150,flip?.44:.36,.5],
  /* folds running down from the hem, shifted slightly between left and right sleeves */
  sfolds:(dx=>[[[20+dx,112,27+dx,108,33+dx,112,35+dx,124,33+dx,150,22+dx,150,21+dx,128],K_(.3)],[[41-dx*.5,116,46-dx*.5,119,49-dx*.5,130,50-dx*.5,150,43-dx*.5,150,42-dx*.5,132],K_(.34)],[[-12,134,2,128,10,132,12,150,-12,150],K_(.36)],[[8+dx,118,14+dx,111,19+dx,110,16+dx,122,12+dx,134,6+dx,132],W_(.16)]])(flip?2.2:0),
  slines:[[[27.6,102,33,102.6,37.6,107,43,113,48.4,119,53,124],W_(.48),1.6],[[26,104.8,31.6,105.6,36,109.6,41.4,115.6,46.6,121.4,51,126.2],K_(.38),.9],[[4,123.4,9.6,117.4,18.6,106.6,26,102.6],W_(.2),1.2]]});
function hand(g,P){const[gx0,gy0,gx1,gy1,gw,gk]=P.grad,[fl,fla,fd,fda,ft]=P.finger;
  blob(g,P.hand,GV(P.tone));
  clipTo(g,()=>blob(g,P.hand),()=>{
    g.fillStyle=lg(g,gx0,gy0,gx1,gy1,[[0,W_(gw)],[.45,W_(0)],[.56,K_(0)],[1,K_(gk)]]);g.fillRect(...P.box);
    for(const[x,y,rx,ry,a]of P.hi)pool(g,x,y,rx,ry,'#ffffff',a,'source-over');
    ao(g,...P.ao);for(const[x,y,rx,ry,a]of P.lo)pool(g,x,y,rx,ry,'#000000',a,'source-over');
    sline(g,fl,W_(fla),2.8);sline(g,fd,K_(fda),2.8);pool(g,ft[0],ft[1],ft[2],ft[3],'#ffffff',ft[4],'source-over');
    for(const p of P.creases){sline(g,p,GV(.38),.55);sline(g,p.map((v,i)=>i%2?v+.7:v-.3),W_(.14),.55)}
    for(const p of P.folds)sline(g,p,GV(.42),.5);
    for(const p of P.wrist)sline(g,p,GV(.42),.55);
    for(const[p,c,w]of P.sinews)sline(g,p,c,w);
    tex(g,'mott',.18,...P.box,'overlay',.5);
    sline(g,P.cuff,K_(.32),5)});
  blob(g,P.crotch,GV(.08))}
function sleeve(g,P){const[gx0,gy0,gx1,gy1,gw,gk]=P.sgrad;
  blob(g,P.sleeve,GV(P.stone));
  clipTo(g,()=>blob(g,P.sleeve),()=>{g.fillStyle=lg(g,gx0,gy0,gx1,gy1,[[0,W_(gw)],[.35,W_(0)],[.5,K_(0)],[1,K_(gk)]]);g.fillRect(...P.sbox);
    for(const[p,c]of P.sfolds)blob(g,p,c);
    for(const[p,c,w]of P.slines)sline(g,p,c,w);
    tex(g,'mott',.4,...P.sbox,'overlay',.5);tex(g,'grain',.1,...P.sbox,'overlay',.5)})}
function thumb(g,P){const[gx0,gy0,gx1,gy1,gw,gk]=P.tgrad,[tl,tla]=P.tlit,tp=P.tpool;
  blob(g,P.thumb,GV(P.ttone));
  clipTo(g,()=>blob(g,P.thumb),()=>{
    g.fillStyle=lg(g,gx0,gy0,gx1,gy1,[[0,W_(gw)],[.42,W_(0)],[.58,K_(0)],[1,K_(gk)]]);g.fillRect(...P.tbox);
    sline(g,tl,W_(tla),1.8);pool(g,tp[0],tp[1],tp[2],tp[3],'#ffffff',tp[4],'source-over');
    blob(g,P.nail,GV(.88));blob(g,P.nailhi,GV(1));
    sline(g,P.nailrim[0],GV(.42),.6);sline(g,P.nailrim[1],GV(.52),.45);
    for(const p of P.joint){sline(g,p,GV(.38),.55);sline(g,p.map((v,i)=>i%2?v+.7:v),W_(.14),.55)}
    tex(g,'mott',.16,...P.tbox,'overlay',.5)})}
const thumbShadow=(g,P)=>comp(g,'multiply',P.tshadow[2],()=>{g.save();g.translate(P.tshadow[0],P.tshadow[1]);blob(g,P.thumb,'#8a6a44');g.restore()});

/* The left hand as it closes the roll. It keeps its grip: the thumb on its roll, the forefinger gone behind it. What changes from one
   pose to the next is placed by hand: the elbow comes in toward the body, so the forearm stands steeper and the sleeve falls away from
   the lower left edge of the picture; the wrist turns a little with it; and the light on the hand passes from the lamp in the niche to
   the lamp on the shelf, first through the reader's own light from the front. dx: how far its roll has come from where it stood open */
const CLOSING=(O=>[
  /* 1: the roll has come a little way in; still in the light of the niche */
  {...O,dx:18,
    hand:[30.5,106.9,33.3,101.6,36.5,96.8,40.5,90.7,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,80.7,99.9,77.4,103.9,73.6,108.5,68.8,114.1,62.4,119.3,55,124,45.1,125.8,34.9,118],
    grad:[40,64,76,112,.26,.44],hi:[[54.5,86,12,17,.25],[49,75,7,9,.18],[43.7,99.4,5,7,.26]],lo:[[68.8,114.1,18,13,.48],[57,70.5,5,3.6,.22]],
    wrist:[[48.5,107.1,54.2,112.5,60.8,116.4],[51.4,104.9,57.6,110.4,64.3,113.8]],
    sinews:[[[47.1,98.3,51,88,56,78,60,70],K_(.1),1.3],[[52.3,102.3,57,92.1,62,84],K_(.08),1.1],[[45.7,97.9,49.6,87.6,54.6,77.6,58.6,69.6],W_(.13),.8]],
    cuff:[31.2,99.5,37.4,104.7,43.3,111.2,48.9,117.1,54,122.1,59.1,125.4],
    sleeve:[27.5,101.7,33.3,102,38.5,106.8,44.2,112.8,49.9,118.6,54.8,123.7,58,135.3,59.4,152,-70,152,-44,152,-20.5,140.3,-.5,123.6,16.8,110.7],
    sgrad:[16,100,44,150,.34,.5],
    sfolds:[[[20.5,113,27.4,109,33.4,113,35.4,125,33.4,152,22.5,152,21.5,129],K_(.3)],[[41.6,117,46.6,120,49.6,131,50.6,152,43.6,152,42.6,133],K_(.34)],
      [[-30,152,-14,139,-2,131,6,138,8,152],K_(.36)],[[9,119,15,112,19.6,111,16.6,123,12.6,135,6.6,133],W_(.16)]],
    slines:[[[27.9,102.7,33.3,103.3,38.1,107.8,43.8,113.8,49.3,119.7,54.1,124.5],W_(.48),1.6],[[26.4,105.7,32.1,106.5,36.6,110.5,42.2,116.4,47.6,122.1,52.1,126.8],K_(.38),.9],
      [[-.5,123.6,8.6,116.8,16.8,110.7,26.4,102.8],W_(.2),1.2]]},
  /* 2: a third of the way: the niche's lamp is behind it now, and the reader's light falls on it from the front */
  {...O,dx:64,
    /* the thumb, pressing, turns the roll: it has slid a little down it */
    thumb:[66.6,65.8,69.6,62.6,73.4,59.4,76.5,56.3,79,53.4,81.8,50.3,85.1,48.2,88.9,48,92.1,50.1,93.5,54,92.9,58.4,91.2,62.1,88.8,65.5,85.6,68.5,82,71.8,78.4,75.4,75.6,79.2,72,81.4,67,80,63.5,74.6,63.8,69],
    nail:[86.4,49.3,89.4,50,91.4,53.1,89.5,56.4,86.8,58.5,84.1,57.2,82.2,54.5,83.9,51.2],nailhi:[86.2,50.7,88.7,51.4,89.6,53.4,87,54.1,85.1,52.8],nailrim:[[82.2,54.7,84.2,57.3,86.8,58.6,89.4,56.6],[82.1,54.5,83.8,51.1,86.4,49.2]],joint:[[76,59.7,79.7,60.8,83.6,62.8],[74.7,62.2,78.6,63.6,82.1,65.4],[73.7,64.9,77,66.1,79.9,67.7]],
    hand:[31,107.8,33.5,102.2,36.6,97.1,40.5,90.7,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,80.9,99.8,77.7,103.9,74.2,108.5,69.6,114.3,63.3,119.6,56.1,124.5,46.2,126.5,35.8,119],
    grad:[44,60,72,116,.22,.42],hi:[[55.5,85,12,16,.2],[50,73,7,9,.16],[44.4,99.7,5,7,.2]],ao:[64,56,17,56,'r',.37],lo:[[69.6,114.3,18,13,.46],[57,70.5,5,3.6,.22]],
    finger:[[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],.38,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],.3,[55.5,63.5,5,4.4,.24]],
    wrist:[[49,107.6,55,113,61.7,116.7],[51.8,105.4,58.3,110.8,65.1,114]],
    sinews:[[[47.3,98.6,51.2,88,56,78,60,70],K_(.1),1.3],[[52.6,102.7,57,92.1,62,84],K_(.08),1.1],[[45.9,98.2,49.8,87.6,54.6,77.6,58.6,69.6],W_(.12),.8]],
    cuff:[31.4,100,37.8,105.4,44,111.9,49.7,117.7,55,122.6,60.2,125.8],
    tgrad:[72,55,84,64.4,.28,.48],tshadow:[2.4,2.6,.6],
    sleeve:[27.7,102.3,33.5,102.6,39,107.5,45,113.5,50.8,119.3,55.9,124.2,59.1,135.8,60.5,152,-64,152,-40.1,152,-18.2,143.2,.8,125.5,17.5,111.8],
    sgrad:[22,98,40,150,.32,.5],
    sfolds:[[[21,113.6,27.8,109.6,33.8,113.6,35.8,126,33.8,152,23,152,22,130],K_(.3)],[[42.2,117.6,47.2,120.6,50.2,131.6,51.2,152,44.2,152,43.2,133.6],K_(.34)],
      [[-26,152,-12,141,0,133,8,140,10,152],K_(.36)],[[9.6,120,15.6,113,20.2,112,17.2,124,13.2,136,7.2,134],W_(.15)]],
    slines:[[[28.2,103.5,33.6,104,38.7,108.6,44.6,114.6,50.3,120.3,55.1,125],W_(.46),1.6],[[26.9,106.7,32.5,107.3,37.3,111.4,43.1,117.3,48.6,122.8,53.2,127.3],K_(.38),.9],
      [[.8,125.5,9.4,118.4,17.5,111.8,26.8,103.6],W_(.2),1.2]]},
  /* 3: past the middle: lit from above, the shelf's lamp nearer than the niche's */
  {...O,dx:122,
    /* the thumb a little further down, turning the roll */
    thumb:[66.7,66,69.7,62.9,73.5,59.7,76.7,56.6,79.2,53.8,82,50.7,85.3,48.7,89.1,48.4,92.3,50.6,93.7,54.5,93.1,58.9,91.3,62.6,88.9,65.9,85.6,68.8,82,72,78.4,75.4,75.6,79.2,72,81.4,67,80,63.5,74.7,63.9,69.1],
    nail:[86.6,49.7,89.6,50.5,91.5,53.6,89.7,56.9,87,59,84.2,57.6,82.4,54.9,84.1,51.6],nailhi:[86.3,51.1,88.9,51.8,89.8,53.9,87.2,54.6,85.2,53.3],nailrim:[[82.3,55.1,84.3,57.7,87,59.1,89.6,57.1],[82.3,54.9,84,51.5,86.6,49.6]],joint:[[76.1,60,79.8,61.2,83.8,63.2],[74.8,62.6,78.7,64,82.2,65.8],[73.8,65.2,77.1,66.4,80,68]],
    hand:[31.5,108.7,33.8,102.8,36.7,97.4,40.5,90.8,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,81.1,99.7,78.1,103.8,74.7,108.5,70.4,114.4,64.3,119.9,57.2,124.9,47.3,127.2,36.7,120],
    grad:[60,46,50,122,.24,.44],hi:[[58,80,12,15,.2],[53,68,7,9,.18],[46,100.1,5,7,.15]],ao:[64,56,17,56,'r',.33],lo:[[70.4,114.4,18,13,.46],[57,70.5,5,3.6,.22]],
    finger:[[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],.42,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],.3,[56,63,5,4.4,.26]],
    wrist:[[49.5,108.1,55.7,113.5,62.6,117],[52.2,105.8,59,111.2,65.8,114.2]],
    sinews:[[[47.4,98.8,51.4,88,56.2,78,60,70],K_(.1),1.3],[[52.9,103,57.1,92.2,62,84],K_(.09),1.1],[[46,98.4,50,87.6,54.8,77.6,58.6,69.6],W_(.12),.8]],
    cuff:[31.6,100.5,38.2,106,44.7,112.7,50.6,118.3,56,123.1,61.3,126.1],
    tgrad:[77,51,79,67,.3,.46],tlit:[[72,65,76,60,80,55.6,83.4,51.6],.26],tshadow:[2,2.6,.56],
    sleeve:[28,103,33.8,103.2,39.5,108.2,45.8,114.3,51.7,119.9,56.9,124.7,60.1,136.3,61.5,152,-60,152,-36.5,152,-15.7,146.2,2.4,127.5,18.3,113.1],
    sgrad:[30,96,30,150,.32,.5],
    sfolds:[[[21.6,114.3,28.4,110.3,34.4,114.3,36.4,127,34.4,152,23.6,152,22.6,131],K_(.3)],[[42.8,118.3,47.8,121.3,50.8,132.3,51.8,152,44.8,152,43.8,134.3],K_(.34)],
      [[-22,152,-10,143,2,135,9,142,11,152],K_(.36)],[[10.2,121,16.2,114,20.8,113,17.8,125,13.8,137,7.8,135],W_(.15)]],
    slines:[[[28.5,104.2,34,104.6,39.2,109.4,45.4,115.3,51.2,120.9,56.2,125.5],W_(.46),1.6],[[27.3,107.6,33,108.2,38,112.3,44,118.1,49.6,123.4,54.4,127.9],K_(.38),.9],
      [[2.4,127.5,10.4,120,18.3,113.1,27.4,104.4],W_(.22),1.2]]},
  /* 4: nearly there: lit from the shelf, on the side of the roll, and its shadows fall to the left */
  {...O,dx:168,
    /* the thumb coming back up, the roll nearly where it goes */
    thumb:[66.4,65.4,69.3,62.1,73,58.8,76.1,55.7,78.5,52.7,81.2,49.6,84.4,47.5,88.2,47.1,91.5,49.2,93,53,92.5,57.4,90.8,61.2,88.6,64.7,85.4,68,81.9,71.5,78.4,75.3,75.6,79.2,72,81.4,67,80,63.5,74.6,63.7,68.8],
    nail:[85.8,48.5,88.8,49.2,90.8,52.2,89.1,55.6,86.4,57.7,83.6,56.4,81.7,53.8,83.4,50.4],nailhi:[85.6,49.9,88.2,50.5,89.1,52.6,86.5,53.3,84.5,52.1],nailrim:[[81.7,54,83.7,56.5,86.4,57.8,89,55.8],[81.6,53.8,83.3,50.3,85.8,48.4]],joint:[[75.6,59.1,79.4,60.2,83.3,62],[74.3,61.7,78.3,62.9,81.9,64.8],[73.5,64.4,76.8,65.6,79.8,67.2]],
    hand:[31.8,109.3,34,103.2,36.8,97.6,40.5,90.8,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,81.3,99.7,78.4,103.7,75.1,108.5,70.9,114.4,64.9,120,57.9,125.2,48.1,127.7,37.3,120.7],
    grad:[78,52,40,114,.27,.46],hi:[[63,80,12,16,.24],[57,67,7,9,.2],[52,103,5,6,.12]],ao:[64,56,17,56,'r',.26],lo:[[70.9,114.4,18,13,.42],[57,70.5,5,3.6,.24]],
    finger:[[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],.46,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],.28,[57,62.5,5,4.4,.28]],
    wrist:[[49.9,108.5,56.2,113.8,63.1,117.2],[52.5,106.1,59.4,111.4,66.4,114.4]],
    sinews:[[[47.5,99,51.6,88,56.4,78,60,70],K_(.11),1.3],[[53.1,103.2,57.1,92.2,62,84],K_(.1),1.1],[[48.4,99.6,52.8,88.6,57.4,78.6,61,70.4],W_(.14),.8]],
    cuff:[31.7,100.8,38.4,106.5,45.1,113.2,51.2,118.7,56.7,123.4,62,126.3],
    tgrad:[84,64.4,71,56,.3,.48],tlit:[[74,69,78,64.4,82,59.6,85.4,55.4],.24],tpool:[78,70,5,4.5,.14],tshadow:[1.2,2.6,.5],
    sleeve:[28.2,103.5,34,103.6,39.8,108.7,46.3,114.8,52.4,120.2,57.7,125,60.9,136.6,62.3,152,-58,152,-34,152,-13.9,148.1,3.4,128.8,18.8,113.9],
    sgrad:[56,100,16,150,.3,.5],
    sfolds:[[[21.8,114.8,28.6,110.8,34.6,114.8,36.6,127.6,34.6,152,23.8,152,22.8,131.6],K_(.32)],[[43.2,118.8,48.2,121.8,51.2,132.8,52.2,152,45.2,152,44.2,134.8],K_(.28)],
      [[-20,152,-9,144,3,136,10,143,12,152],K_(.38)],[[38,116,44,118.8,47.6,128,48.6,146,45,142,42,128],W_(.14)]],
    slines:[[[28.7,104.7,34.2,105.1,39.6,109.9,45.9,115.8,51.9,121.3,56.9,125.8],W_(.5),1.6],[[27.6,108.2,33.3,108.7,38.4,112.9,44.6,118.6,50.3,123.9,55.2,128.2],K_(.36),.9],
      [[3.4,128.8,11,121.4,18.8,113.9,27.8,105],W_(.16),1.2]]},
  /* 5: closed: the two rolls stand together in both hands, under the lamp on the shelf */
  {...O,dx:186,
    hand:[32,109.6,34.1,103.3,36.8,97.7,40.6,90.9,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,81.3,99.6,78.5,103.7,75.3,108.5,71.2,114.5,65.2,120.1,58.2,125.4,48.5,127.9,37.7,121],
    grad:[80,50,38,114,.3,.46],hi:[[65,81,12,16,.27],[59,67,7,9,.21],[53,103.5,5,6,.12]],ao:[64,56,17,56,'r',.24],lo:[[71.2,114.5,18,13,.42],[57,70.5,5,3.6,.24]],
    finger:[[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],.48,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],.28,[57.5,62.5,5,4.4,.3]],
    wrist:[[50,108.7,56.5,114,63.4,117.3],[52.6,106.2,59.7,111.6,66.6,114.4]],
    sinews:[[[47.6,99.1,51.8,88,56.6,78,60,70],K_(.11),1.3],[[53.2,103.4,57.1,92.2,62,84],K_(.1),1.1],[[48.6,99.8,53,88.8,57.6,78.8,61.2,70.6],W_(.15),.8]],
    cuff:[31.7,101,38.6,106.7,45.4,113.4,51.5,118.9,57,123.6,62.4,126.4],
    tgrad:[84,64.4,71,56,.34,.5],tlit:[[74.4,69.4,78.4,64.8,82.4,60,85.8,55.8],.26],tpool:[78.5,70,5,4.5,.15],tshadow:[.8,2.6,.48],
    sleeve:[28.3,103.7,34.1,103.8,40,108.9,46.5,115,52.7,120.4,58,125.1,61.2,136.7,62.6,152,-56,152,-32.7,152,-13.1,149,4,129.4,19.1,114.3],
    sgrad:[58,100,14,150,.34,.5],
    sfolds:[[[22,115,28.8,111,34.8,115,36.8,128,34.8,152,24,152,23,132],K_(.32)],[[43.4,119,48.4,122,51.4,133,52.4,152,45.4,152,44.4,135],K_(.26)],
      [[-19,152,-8,145,4,137,11,144,13,152],K_(.4)],[[38.4,116.4,44.4,119.2,48,128.4,49,147,45.4,143,42.4,128.4],W_(.16)]],
    slines:[[[28.8,104.9,34.3,105.3,39.8,110.1,46.2,116.1,52.2,121.5,57.3,126],W_(.52),1.6],[[27.8,108.5,33.5,109,38.7,113.2,44.9,118.8,50.7,124.1,55.5,128.4],K_(.36),.9],
      [[4,129.4,11.6,121.8,19.1,114.3,28,105.2],W_(.14),1.2]]}
])(OPEN(0));

/* ---------- the roll laid down: the last still, the hands gone ---------- */
/* a table stands against the wall below the lamp on the shelf; the closed roll lies on it, its two rolled ends side by side. It lies a
   little askew, its right end turned toward us: that end shows its turns, the far one only its outline (CONTRIBUTING section 4). The turns
   end in the stick's dark end, a small square, and nothing stands out of it or is tied round it */
function table(g){const r=rng(2026),T=111,E=137;   /* T: where its top meets the wall; E: its front edge */
  wood(g,0,T,320,E-T,'#6a4a2c',0,.5);R(g,0,E,320,VH-E,'#3e2a18');tex(g,'wood',.4,0,E,320,VH-E,'overlay',.5);
  for(let k=0;k<8;k++){const x=r()*300,w=20+r()*60;R(g,x,T+2+r()*(E-T-4),w,.5,rgba('#2a180c',.18+r()*.12))}   /* the grain, long and level */
  R(g,0,E-.6,320,.8,rgba('#e8c48a',.4));ao(g,0,E+.2,320,4,'t',.4,'#120a06');
  ao(g,0,T-.4,320,4,'t',.5,'#140c10')}   /* where it meets the wall */
function lyingRoll(g,x,y,len,rad,ang,seed){const r=rng(seed),C='#dfc993',   /* the tones of the rolls in the hands, lit from above */
    st=[[0,'#b3935a'],[.14,'#dfc993'],[.34,'#f3e4b8'],[.6,'#c4a86e'],[.86,'#8e6e3c'],[1,'#6e5228']];
  g.save();g.translate(x,y);g.rotate(ang);
  clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2);g.ellipse(0,0,rad*.42,rad,0,0,6.2832)},()=>{
    g.fillStyle=lg(g,0,-rad,0,rad,st);g.fillRect(-rad,-rad-1,len+rad*2,rad*2+2);
    /* the strips of the papyrus run round the roll, so across it here: tones, not lines */
    for(let u=-rad;u<len;){const w=1+r()*2.6;R(g,u,-rad,w,rad*2,r()<.5?rgba('#8a6830',.05+r()*.09):rgba('#fff6d2',.05+r()*.09));u+=w}
    tex(g,'vert',.16,-rad,-rad-1,len+rad*2,rad*2+2,'overlay',.5);tex(g,'mott',.2,-rad,-rad-1,len+rad*2,rad*2+2,'overlay',.75);
    ao(g,len-18,-rad,18,rad*2,'r',.14,'#fff0c8');ao(g,-rad,-rad,26,rad*2,'l',.32,'#4a3010')});   /* nearer the lamp on the right */
  /* its near end: the turns, lit from above on the right; the stick's end is a small dark square */
  const rx=rad*.42;oval(g,len,0,rx,rad,tint(C,-.46));
  for(const[k,c]of[[.86,tint(C,-.02)],[.72,tint(C,-.38)],[.58,tint(C,.06)],[.44,tint(C,-.4)],[.3,tint(C,.02)]])oval(g,len+(1-k)*.4,(1-k)*.5,rx*k,rad*k,c);
  R(g,len-.3,-.3,1.4,1.8,'#2a1a0c');
  g.strokeStyle=rgba('#fff0c2',.42);g.lineWidth=.5;g.beginPath();g.ellipse(len,0,rx*.92,rad*.92,0,-1.5,.2);g.stroke();
  g.restore()}
function laid(g){const len=118,rad=8.4,ang=.045,x0=178,y0=113.6;
  /* its shadow on the table: close under it, and a little to the left, away from the lamp above on the right */
  pool(g,x0+len/2,y0+rad*2.1+3.4,len*.56,3.6,'#2a1810',.8,'multiply');pool(g,x0+len/2-10,y0+rad*2.1+5.4,len*.6,3.4,'#2a1810',.45,'multiply');
  lyingRoll(g,x0-1.8,y0,len,rad,ang,77);            /* the far one, half hidden */
  comp(g,'multiply',.5,()=>{g.save();g.translate(x0,y0+rad*1.1);g.rotate(ang);ao(g,0,-rad-2.4,len,3,'b',.8,'#3a2410');g.restore()});   /* the near one shades it */
  lyingRoll(g,x0+.6,y0+rad*1.1,len,rad,ang,91);     /* the near one */
  /* the light: the lamp on the shelf above, and the room's dark to the left and below */
  comp(g,'source-atop',1,()=>{g.fillStyle=lg(g,0,0,320,0,[[0,rgba('#0e0812',.8)],[.45,rgba('#1a1018',.45)],[.8,rgba('#1a1018',0)]]);g.fillRect(0,100,320,44);
    ao(g,0,130,320,14,'b',.45,'#100810')})}

/* ---------- the pictures: each put together once from layers, each layer set in its own tones ---------- */
/* A frame: from, where the open papyrus now goes into the left roll; rolls, each [x, flip, options of roll()]; hands, their poses */
const FRAMES=[{from:SH.x0,rolls:[[ROLLS[0],0],[ROLLS[1],1]],hands:[OPEN(0),OPEN(1)]},
  /* closing: the left roll comes over to the right one; the papyrus it has taken up is wound on it, the rest still lies open */
  ...CLOSING.map((P,i)=>{const x=ROLLS[0]+P.dx;return{from:x+(SH.x0-ROLLS[0]),rolls:[[x,0,i>1?{lit:1}:{}],[ROLLS[1],1]],hands:[P,OPEN(1)]}})];
FRAMES[FRAMES.length-1].rolls[0][2]={lit:1,bare:1};   /* closed: no open papyrus is left beside the left roll; the right one shades it */
/* and the last still, which may follow: the closed roll laid down below the lamp, the hands gone */
FRAMES.push({laid:1});
function build(F=FRAMES[0]){const[c,g]=mk(VW*HR,VH*HR),fin=(lc,l)=>finish(lc,l,12),
    L=(fn,post)=>{const[lc,l]=mk(VW*HR,VH*HR);l.scale(HR,HR);fn(l);l.setTransform(1,0,0,1,0,0);post(lc,l);g.drawImage(lc,0,0)},
    each=(l,fn)=>{for(const P of F.hands)at(l,fn,P)};
  L(room,fin);
  if(F.laid){L(l=>{table(l);laid(l)},fin);return c}
  L(l=>each(l,hand),(lc,l)=>tones(lc,l,SKIN));
  L(l=>each(l,sleeve),(lc,l)=>tones(lc,l,WOOL));
  L(l=>{sheet(l,SH,F.from);for(const[x,flip,o]of F.rolls)roll(l,x,flip,SH,o);each(l,thumbShadow)},fin);
  L(l=>each(l,thumb),(lc,l)=>tones(lc,l,SKIN));
  return c}
/* its own canvas, over the darkened view and under the words: the room that is being entered behind it is not disturbed */
const BG=[],picture=i=>BG[i]||(BG[i]=build(FRAMES[i]));
const[cv,cg]=mk(VW*HR,VH*HR);cv.id='scroll';$('#dim').after(cv);
/* shown: the frame that stands; mix: a frame that is passing into it ({to, t0, n}), when the roll is laid down */
let shown=0,mix=null;
function draw(ts){cg.setTransform(1,0,0,1,0,0);cg.drawImage(picture(shown),0,0);
  if(mix){const k=clamp((performance.now()-mix.t0)/mix.n,0,1),e=k*k*(3-2*k);cg.globalAlpha=e;cg.drawImage(picture(mix.to),0,0);cg.globalAlpha=1;if(k>=1){shown=mix.to;mix=null}}
  cg.setTransform(HR,0,0,HR,0,0);
  for(const[x,y]of LAMPS){flame(cg,x,y,ts+x*7);pool(cg,x,y-3,15+Math.sin(ts/190+x)*.8,11,'#ff9838',.15+.015*Math.sin(ts/83+x))}}

/* ---------- coming and going ---------- */
let state='down',chain=Promise.resolve(),idle=0,gen=0;
const ms=n=>G.speedAll>200?30:n;   /* a playthrough at speed does not wait for it */
const to=(v,n)=>{cv.style.transition=`opacity ${n}ms ease-in-out`;cv.style.opacity=v;return wait(n+20)};
/* one movement after another: a line that asks for the scroll while it is going down waits, and has it come up again. Should the picture
   fail to paint, the story still goes on: the line then stands on the dark. */
const move=(want,v,n)=>{clearTimeout(idle);const k=gen;return chain=chain.then(async()=>{if(k!==gen||state===want)return;state='moving';
  try{if(v){draw(G.t||0);SFX.unroll()}}catch(e){console.error(e)}await to(v,ms(n));if(k===gen)state=want})};
const up=()=>move('up',1,520),down=()=>move('down',0,420);
function off(){clearTimeout(idle);gen++;chain=Promise.resolve();cv.style.transition='';cv.style.opacity=0;state='down';shown=0;mix=null}
function rest(){clearTimeout(idle);idle=setTimeout(down,700)}

/* ---------- the roll closed, once, for the game's last line ---------- */
/* The one exception to "only the flames move" (CONTRIBUTING section 4): after the last line the reader's hands close the roll. The
   frames are cut one after the other, as in the games of those years, with no blending between them: they are placed so that the
   left roll comes slowly, then faster, then slowly again (eased), and a frame stands STEP ms. Nothing brightens or darkens the whole
   picture, and the flames go on moving. With lay, the closed roll is then laid down below the lamp: the only blend, a slow one.
     close(o)  the roll closes (o.lay: and is laid down); resolves when it stands closed, or lies. The scroll stays up until down()
     open()    the roll stands open again at once, as it always does (a player who watches the ending again sees it open) */
const STEP=600,HOLD=900,LAY=1400,CLOSED=FRAMES.length-2,LAID=FRAMES.length-1;
function close(o={}){clearTimeout(idle);const k=gen;return chain=chain.then(async()=>{
  for(let i=1;i<=(o.lay?LAID:CLOSED);i++){picture(i);await wait(0)}   /* every frame painted before the first moves */
  if(k!==gen)return;if(state!=='up'){state='moving';draw(G.t||0);await to(1,ms(520));if(k===gen)state='up'}
  for(let i=1;i<=CLOSED&&k===gen;i++){shown=i;await wait(ms(STEP))}
  if(o.lay&&k===gen){await wait(ms(HOLD));if(k!==gen)return;mix={to:LAID,t0:performance.now(),n:ms(LAY)};await wait(ms(LAY)+40)}})}
function open(){clearTimeout(idle);mix=null;shown=0}

/* ---------- the words, in ink ---------- */
const SIZES=[8.6,7.6,6.8,6.2],TALL=100,over=[];   /* room pixels: the heights of the letters, and how tall the writing may stand */
function fit(el){clearTimeout(idle);const text=el.textContent,s=PH.on?Math.min(LENS.F.w/VW,LENS.F.h/VH):$('#view').clientWidth/VW;   /* on a phone the scroll is fitted into the field (see lensTick) */
  const size=()=>{for(const f of SIZES){el.style.fontSize=`calc(var(--s)*${f}px)`;if(el.offsetHeight<=TALL*s+1&&el.scrollWidth<=el.clientWidth+1)return true}return false};
  /* first with every reference kept whole; a reference too long for a line of its own may be divided after all */
  el.textContent='';let i=0;for(const m of text.matchAll(/\([^()]*\d+:\d+[^()]*\)/g)){el.append(text.slice(i,m.index));const sp=document.createElement('span');sp.textContent=m[0];el.append(sp);i=m.index+m[0].length}
  el.append(text.slice(i));
  if(!size()){el.textContent=text;if(!size())over.push(text)}}
return{up,down,off,rest,fit,draw,close,open,over,get state(){return state},get frame(){return shown},el:cv,lamps:LAMPS,sheet:SH,frames:FRAMES,picture,STEP,HOLD,LAY};
})();
