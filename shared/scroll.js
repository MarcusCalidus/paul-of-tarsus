/* Paul of Tarsus: the narrator's scroll, shared by every chapter. Loaded the first time a line of narration is told in the dark
   (see say() and need() in index.html).

   A line told while the picture is dark (the view faded out, or the scene DARK) is not set on a black screen: it is read from an open
   roll of papyrus, held in two hands by lamplight. The picture is one painting, made in code like every other: a stone wall with a clay
   lamp in a niche and another on a shelf, the open part of the roll with its two rolled-up ends, and a hand on each. Only the two flames
   move, and the small glow round each, as in the game's rooms.

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
const SH={x0:66,x1:274,y0:7,y1:137},ROLLS=[60,263],ROLL_W=17;
function sheet(g){const r=rng(31337),e=rng(90210),{x0,x1,y0,y1}=SH,w=x1-x0,h=y1-y0,P=[],nick=(v,at,wd,d)=>{const k=Math.abs(v-at)/wd;return k<1?d*(1-k*k):0};
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
  g.save();poly(g,P);g.strokeStyle=rgba('#4e3410',.5);g.lineWidth=.5;g.stroke();g.restore()}
/* a rolled-up end, standing upright. Its upper end shows the turns of the roll and, as the dark middle, the end of the stick it is wound
   on: the stick does not stand out of it. flip: the right-hand roll, lit from the other side */
function roll(g,x,flip){const w=ROLL_W,y0=SH.y0-2.5,y1=SH.y1+1.5,h=y1-y0,cx=x+w/2,r=rng(Math.round(x)*31+7),
    st=[[0,'#8e6e3c'],[.13,'#c4a86e'],[.36,'#f3e4b8'],[.6,'#dfc993'],[.85,'#b3935a'],[1,'#7e6034']];
  ao(g,flip?x-9:x+w,y0+4,9,h-7,flip?'r':'l',.42,'#5a3c14');   /* its shadow on the open part */
  clipTo(g,()=>{g.beginPath();g.rect(x,y0,w,h);g.ellipse(cx,y1,w/2,2.6,0,0,6.2832)},()=>{g.fillStyle=lg(g,flip?x+w:x,0,flip?x:x+w,0,st);g.fillRect(x-1,y0-1,w+2,h+6);
    for(let y=y0;y<y1+3;){const hh=1+r()*2.6;R(g,x-1,y,w+2,hh,r()<.5?rgba('#8a6830',.04+r()*.08):rgba('#fff6d2',.04+r()*.08));y+=hh}
    tex(g,'wood',.42,x-1,y0-1,w+2,h+6,'overlay',.5);ao(g,x,y0,w,8,'t',.3,'#6e4c1e');ao(g,x,y1-7,w,10,'b',.34,'#6e4c1e')});
  oval(g,cx,y0,w/2,2.6,'#6e5228');oval(g,cx+(flip?.8:-.8),y0+.2,w/2-2.2,1.7,'#a88a52');oval(g,cx+(flip?1.4:-1.4),y0+.3,w/2-4.6,1.1,'#5e4420')}

/* ---------- the hands ---------- */
/* tones: set a layer that was painted in greys into a scale of colors, darkest first, with the ordered dither of finish(): one dither
   cell to the room pixel. What is not painted stays clear. */
const SKIN=['#3a1e14','#57301f','#75452d','#925c3c','#ab744e','#c18b62','#d5a378','#e6bc92','#f2d3b0'],
  WOOL=['#231f17','#383224','#4f4734','#675e47','#7f755a','#978c6f','#ada285'];
function tones(c,g,pal){const w=c.width,h=c.height,im=g.getImageData(0,0,w,h),d=im.data,n=pal.length-1,P=pal.map(hex);
  for(let y=0,i=0;y<h;y++)for(let x=0;x<w;x++,i+=4){if(d[i+3]<128){d[i+3]=0;continue}d[i+3]=255;
    const v=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)/255*n,t=(BAYER[((y>>1)&3)*4+((x>>1)&3)]+.5)/16,p=P[clamp(Math.floor(v+t),0,n)];d[i]=p[0];d[i+1]=p[1];d[i+2]=p[2]}
  g.putImageData(im,0,0)}
/* The left hand is drawn for a roll whose outer edge stands at x=76: HAND is the back of the hand with the forefinger, THUMB the thumb.
   at() shifts it to its roll, and mirrors it for the right hand, which is then lit from its own side, by its own lamp. */
const HAND=[30,106,33,101,36.4,96.5,40.5,90.6,44.6,82.4,47.2,74.8,49.6,66.5,52.5,60.6,56.5,56,61,52.2,65.5,49.2,70,46.3,74,44,78,42.6,80.5,45,80.5,60,80.5,100,77,104,73,108.5,68,114,61.5,119,54,123.5,44,125,34,117],
  THUMB=[66.2,65,69,61.6,72.6,58.2,75.6,55,78,52,80.6,48.8,83.8,46.6,87.6,46.2,90.9,48.2,92.5,52,92.1,56.4,90.5,60.2,88.3,63.8,85.3,67.4,81.9,71.2,78.4,75.2,75.6,79.2,72,81.4,67,80,63.5,74.5,63.6,68.5],
  HX=ROLLS[0]-76,at=(g,fn,flip)=>{g.save();if(flip){g.translate(340,6);g.scale(-1,1)}g.translate(HX,0);fn(g,flip?1:0);g.restore()},both=(g,fn)=>{at(g,fn);at(g,fn,1)};
function hand(g,flip){
  blob(g,HAND,GV(flip?.6:.56));
  clipTo(g,()=>blob(g,HAND),()=>{
    /* asymmetric lighting: the left lamp sits recessed in its niche; the right lamp stands open and higher on the shelf */
    g.fillStyle=lg(g,flip?44:40,flip?56:64,flip?80:76,112,[[0,W_(flip?.36:.27)],[.45,W_(0)],[.56,K_(0)],[1,K_(flip?.38:.44)]]);g.fillRect(20,36,70,96);
    pool(g,flip?52:54.5,flip?82:86,12,17,'#ffffff',flip?.34:.26,'source-over');pool(g,49,flip?72:75,7,9,'#ffffff',flip?.24:.18,'source-over');pool(g,43.5,99,5,7,'#ffffff',flip?.22:.28,'source-over');
    ao(g,64,56,17,56,'r',flip?.34:.4);pool(g,68,114,18,13,'#000000',flip?.42:.48,'source-over');pool(g,57,70.5,5,3.6,'#000000',.22,'source-over');
    /* the forefinger: round, lit along its upper side, dark along the side toward the thumb */
    sline(g,[56.5,59,61.5,54.6,66.5,51,71,48,76,45.2],W_(flip?.46:.38),2.8);sline(g,[61,63.5,65,60,69,56.6,73,53.4,77,50.6],K_(.32),2.8);pool(g,55.5,63.5,5,4.4,'#ffffff',flip?.32:.26,'source-over');
    /* softer knuckle creases, thumb-root folds, wrist lines, and subtle asymmetric sinews */
    for(const p of[[64.4,52.6,66.6,55,69.4,57.6],[66.6,51.2,68.8,53.4,71.2,55.8],[58.4,58.2,61.6,61,65.2,63.8],[56.8,60.6,59.6,63.4,62.8,65.8]]){sline(g,p,GV(.38),.55);sline(g,p.map((v,i)=>i%2?v+.7:v-.3),W_(.14),.55)}
    for(const p of[[62,80.4,66.6,81.4,71.6,81],[63.6,83.6,67.8,84.4,72,83.8],[61,77,65,78,69,77.2]])sline(g,p,GV(.42),.5);
    for(const p of[[48,106.5,53.5,112,60,116],[51,104.5,57,110,63.5,113.5]])sline(g,p,GV(.42),.55);
    sline(g,[47,98,51+(flip?.8:0),88,56,78,60,70],K_(.1),1.3);sline(g,[52,102,57,92-(flip?1:0),62,84],K_(.08),1.1);sline(g,[45.6,97.6,49.6+(flip?.8:0),87.6,54.6,77.6,58.6,69.6],W_(.13),.8);
    tex(g,'mott',.18,20,36,70,96,'overlay',.5);
    /* where it comes out of the sleeve it lies in the sleeve's shade */
    sline(g,[31,99,37,104,42.6,110.4,48,116.4,53,121.6,58,125],K_(.32),5)});
  /* the dark between forefinger and thumb, where the roll goes in */
  blob(g,[76.5,52,72.5,55.2,68.8,59.2,66,63.4,66.4,65.2,69.6,62.6,73,59.4,76.5,56.6],GV(.08))}
function sleeve(g,flip){const S=[-12,132,3,122.4,8.8,116.5,18,105.6,27.2,101,33,101.4,38,106,43.5,112,49,118,53.8,123.2,57.2,134.8,58.6,150,-12,150];
  blob(g,S,GV(flip?.52:.49));
  clipTo(g,()=>blob(g,S),()=>{g.fillStyle=lg(g,14,100,44,150,[[0,W_(flip?.44:.36)],[.35,W_(0)],[.5,K_(0)],[1,K_(.5)]]);g.fillRect(-14,96,80,56);
    /* folds running down from the hem, shifted slightly between left and right sleeves */
    const dx=flip?2.2:0;
    blob(g,[20+dx,112,27+dx,108,33+dx,112,35+dx,124,33+dx,150,22+dx,150,21+dx,128],K_(.3));blob(g,[41-dx*.5,116,46-dx*.5,119,49-dx*.5,130,50-dx*.5,150,43-dx*.5,150,42-dx*.5,132],K_(.34));blob(g,[-12,134,2,128,10,132,12,150,-12,150],K_(.36));blob(g,[8+dx,118,14+dx,111,19+dx,110,16+dx,122,12+dx,134,6+dx,132],W_(.16));
    sline(g,[27.6,102,33,102.6,37.6,107,43,113,48.4,119,53,124],W_(.48),1.6);sline(g,[26,104.8,31.6,105.6,36,109.6,41.4,115.6,46.6,121.4,51,126.2],K_(.38),.9);
    sline(g,[4,123.4,9.6,117.4,18.6,106.6,26,102.6],W_(.2),1.2);tex(g,'mott',.4,-14,96,80,56,'overlay',.5);tex(g,'grain',.1,-14,96,80,56,'overlay',.5)})}
function thumb(g,flip){
  blob(g,THUMB,GV(flip?.62:.59));
  clipTo(g,()=>blob(g,THUMB),()=>{
    /* round across: lit on the side toward each hand's lamp, dark on the other */
    g.fillStyle=lg(g,flip?73:71,flip?53:56,84,64.4,[[0,W_(flip?.4:.32)],[.42,W_(0)],[.58,K_(0)],[1,K_(flip?.46:.52)]]);g.fillRect(56,40,44,48);
    sline(g,[71,66,75,61,79,56.4,82.4,52.4],W_(flip?.3:.24),1.8);pool(g,69,73.5,5,4.5,'#ffffff',.14,'source-over');
    /* the nail, and softer folds of the joint */
    blob(g,[85.2,47.6,88.2,48.2,90.3,51.2,88.6,54.6,86,56.8,83.2,55.6,81.2,53,82.8,49.6],GV(.88));blob(g,[85,49,87.6,49.6,88.6,51.6,86,52.4,84,51.2],GV(1));
    sline(g,[81.2,53.2,83.3,55.7,86,56.9,88.5,54.8],GV(.42),.6);sline(g,[81.1,53,82.7,49.5,85.2,47.5],GV(.52),.45);
    for(const p of[[75.2,58.4,79,59.4,83,61.2],[74,61,78,62.2,81.6,64],[73.2,63.8,76.6,65,79.6,66.6]]){sline(g,p,GV(.38),.55);sline(g,p.map((v,i)=>i%2?v+.7:v),W_(.14),.55)}
    tex(g,'mott',.16,56,40,44,48,'overlay',.5)})}
const thumbShadow=(g,flip)=>comp(g,'multiply',flip?.54:.62,()=>{g.save();g.translate(flip?2.2:3,flip?2.8:2.4);blob(g,THUMB,'#8a6a44');g.restore()});

/* ---------- the picture: put together once from layers, each set in its own tones ---------- */
let BG=null;
function build(){const[c,g]=mk(VW*HR,VH*HR),fin=(lc,l)=>finish(lc,l,12),
    L=(fn,post)=>{const[lc,l]=mk(VW*HR,VH*HR);l.scale(HR,HR);fn(l);l.setTransform(1,0,0,1,0,0);post(lc,l);g.drawImage(lc,0,0)};
  L(room,fin);
  L(l=>both(l,hand),(lc,l)=>tones(lc,l,SKIN));
  L(l=>both(l,sleeve),(lc,l)=>tones(lc,l,WOOL));
  L(l=>{sheet(l);roll(l,ROLLS[0]);roll(l,ROLLS[1],1);both(l,thumbShadow)},fin);
  L(l=>both(l,thumb),(lc,l)=>tones(lc,l,SKIN));
  return c}
/* its own canvas, over the darkened view and under the words: the room that is being entered behind it is not disturbed */
const[cv,cg]=mk(VW*HR,VH*HR);cv.id='scroll';$('#dim').after(cv);
function draw(ts){cg.setTransform(1,0,0,1,0,0);cg.drawImage(BG||(BG=build()),0,0);cg.setTransform(HR,0,0,HR,0,0);
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
function off(){clearTimeout(idle);gen++;chain=Promise.resolve();cv.style.transition='';cv.style.opacity=0;state='down'}
function rest(){clearTimeout(idle);idle=setTimeout(down,700)}

/* ---------- the words, in ink ---------- */
const SIZES=[8.6,7.6,6.8,6.2],TALL=100,over=[];   /* room pixels: the heights of the letters, and how tall the writing may stand */
function fit(el){clearTimeout(idle);const text=el.textContent,s=PH.on?Math.min(LENS.F.w/VW,LENS.F.h/VH):$('#view').clientWidth/VW;   /* on a phone the scroll is fitted into the field (see lensTick) */
  const size=()=>{for(const f of SIZES){el.style.fontSize=`calc(var(--s)*${f}px)`;if(el.offsetHeight<=TALL*s+1&&el.scrollWidth<=el.clientWidth+1)return true}return false};
  /* first with every reference kept whole; a reference too long for a line of its own may be divided after all */
  el.textContent='';let i=0;for(const m of text.matchAll(/\([^()]*\d+:\d+[^()]*\)/g)){el.append(text.slice(i,m.index));const sp=document.createElement('span');sp.textContent=m[0];el.append(sp);i=m.index+m[0].length}
  el.append(text.slice(i));
  if(!size()){el.textContent=text;if(!size())over.push(text)}}
return{up,down,off,rest,fit,draw,over,get state(){return state},el:cv,lamps:LAMPS,sheet:SH};
})();
