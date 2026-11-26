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

   The game closes on the same bench by day (day): the lamp out, plain daylight from a window on the left, every shadow falling away from
   it, and more rolls than before. Nothing moves in it. The night's picture is painted exactly as it was: the light is an argument (NIGHT,
   DAY), and every painter paints by night unless it is given the day.

   The overture is the theme of Chapter One, in D Hijaz, in ten bars: two bars that raise the curtain (frame drum, finger cymbals, a
   harp rising and a low horn call), the melody on the ney over a walking bass and a strummed lyre, and the melody again, higher, with
   the aulos and the horn. Then the quiet music of the title follows by itself (then: see sched() in index.html).

     scene(g,t)       paints the picture; G.scene while the splash is up
     leave(next,ms)   the picture passes into the scene next over ms milliseconds, and then next is G.scene
     score            the overture
     len, turn        seconds: how long the overture is, and when the picture begins to pass into the title's
     lamp             where the wick is
     day(g,t)         the same bench by day, for the end of the game: a scene in which nothing moves (see day below)
     paint()          that picture itself, 320 x 210 */
SHARED.splash=(()=>{
"use strict";
/* ---------- helpers ---------- */
function spline(g,p,closed){const n=p.length/2,P=i=>{i=closed?(i%n+n)%n:clamp(i,0,n-1);return[p[2*i],p[2*i+1]]};
  g.beginPath();g.moveTo(p[0],p[1]);
  for(let i=0;i<(closed?n:n-1);i++){const a=P(i-1),b=P(i),c=P(i+1),d=P(i+2);
    g.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(d[0]-b[0])/6,c[1]-(d[1]-b[1])/6,c[0],c[1])}
  if(closed)g.closePath()}
function blob(g,p,c){spline(g,p,1);if(c){g.fillStyle=c;g.fill()}}
function sline(g,p,c,w){spline(g,p,0);g.strokeStyle=c;g.lineWidth=w||.5;g.lineCap='round';g.lineJoin='round';g.stroke()}
const at=(g,x,y,a,fn)=>{g.save();g.translate(x,y);g.rotate(a);fn();g.restore()};
/* cast: paint a thing with a two-part grounded shadow on the bench: a tight dark contact shade directly under it
   and a softer projected shadow thrown away from the light L (NIGHT: the lamp flame; DAY: the window, see below).
   L: at, the point the light comes from; k, how long the shadows are; drop, how far they fall toward us; ink, their colour */
function cast(g,x,y,len,fn,contact,L){L=L||NIGHT;const[c,l]=mk(VW*HR,VT*HR),P=L.at,d=Math.hypot(x-P[0],y-P[1])||1,
    dx=(x-P[0])/d*len*L.k*HR,dy=((y-P[1])/d*len*L.k*.55+len*L.k*L.drop)*HR;
  l.setTransform(g.getTransform());fn(l);l.setTransform(1,0,0,1,0,0);l.globalCompositeOperation='source-in';l.fillStyle=L.ink;l.fillRect(0,0,c.width,c.height);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='multiply';
  g.globalAlpha=.28;g.drawImage(c,Math.round(dx),Math.round(dy));
  g.globalAlpha=.36;g.drawImage(c,Math.round(dx*.52),Math.round(dy*.52));
  if(contact!==0){g.globalAlpha=contact||.48;g.drawImage(c,Math.round(dx*.16),Math.round(Math.max(1,dy*.22)))}
  g.restore();fn(g)}

/* room-pixel layout (320 x 210): wall above, broad seasoned bench below, front bevelled edge at EDGE, flame wick at LAMP */
const LAMP=[174,129],WALL=114,EDGE=195;
/* the two lights of the bench. NIGHT: the lamp's flame, close by, low and warm. DAY: the morning sun, through a window in the wall to the
   left, out of the picture: a light far off and low, so that every shadow falls to the right and only a little toward us. It is plain
   light: no rays, no beams and no dust in the air (CONTRIBUTING section 3). */
const NIGHT={at:LAMP,k:1,drop:.42,ink:'#100702'},DAY={day:1,at:[-420,70],k:1.55,drop:.1,ink:'#1e140c'};

/* ---------- the stone wall and the seasoned workbench ---------- */
function room(g,L){const r=rng(1803),H=EDGE-WALL,day=L&&L.day;
  /* weathered limestone workshop wall: warm dressed ashlar courses with subtle lime-plaster wear and warm patina. By day the same
     courses (the same blocks, from the same numbers) in the stone's own daylight colour, a warm limestone, with soft joints and calm
     mottling (dayAshlar) */
  if(day)dayAshlar(g,0,0,VW,WALL,'#c6ad88',r,{bw:35,bh:15.5,v:.06,m:'#a08664'});
  else ashlar(g,0,0,VW,WALL,'#988068',r,{bw:35,bh:15.5,v:.1,t:.36,m:'#544335'});
  for(let i=0;i<16;i++){const px=r()*VW,py=6+r()*(WALL-12);pool(g,px,py,10+r()*18,4+r()*7,r()<.5?'#6a523e':'#c2aa8c',(.09+r()*.08)*(day?.3:1),'source-over')}
  for(let i=0;i<6;i++){let qx=24+r()*(VW-48),qy=14+r()*(WALL-30);const p=[qx,qy];
    for(let s=0;s<4;s++){qx+=(r()-.5)*4;qy+=1.8+r()*3.2;p.push(qx,qy)}stroke(g,p,day?'rgba(90,64,40,.12)':'rgba(40,26,16,.2)',.5)}
  /* warm subtle lime-plaster wash over parts of the masonry so it feels ancient and lived-in */
  for(const[px,py,rx,ry]of[[68,86,38,14],[248,80,44,16],[168,94,36,12]])pool(g,px,py,rx,ry,day?'#e2cfb0':'#b69b7c',.14,'source-over');
  /* very soft warm soot blush high on the stone above the flame */
  pool(g,LAMP[0],WALL-36,16,24,'#342014',day?.07:.14,'multiply');
  ao(g,0,WALL-11,VW,11,'b',.4,'#22140c');

  /* the bench: one broad seasoned walnut-cedar plank, fine undulating horizontal wood grain, no joints across it */
  inRect(g,0,WALL-1,VW,H+2,()=>{
    g.fillStyle=lg(g,0,WALL,0,EDGE,['#704b2a','#845932','#7c512c','#664021']);g.fillRect(0,WALL-1,VW,H+2);
    /* coherent gently waving wood-grain fibers that run the length of the board and never cross */
    const f=.022,ph=1.3;
    for(let y=WALL-2;y<EDGE+2;y+=.85+r()*1.1){const dark=r()<.56,col=dark?rgba('#381f0c',.12+r()*.16):rgba('#d8aa6c',.08+r()*.12),pts=[],a=.55+.4*Math.sin(y*.17);
      for(let x=-4;x<=VW+4;x+=6)pts.push(x,y+a*Math.sin(x*f+ph+y*.03)+.35*Math.sin(x*f*2.3+y*.08));
      stroke(g,pts,col,.55)}
    /* subtle darker seasoned patina patches and fine horizontal pores */
    for(let i=0;i<11;i++)pool(g,r()*VW,WALL+10+r()*(H-16),18+r()*36,3+r()*5,'#442812',.11+r()*.09,'multiply');
    for(let i=0;i<110;i++)R(g,r()*VW,WALL+1+r()*(H-2),1.5+r()*5,.5,r()<.7?rgba('#2e1808',.22):rgba('#e0b87c',.14));
    tex(g,'mott',.16,0,WALL-1,VW,H+2,'overlay',.75);tex(g,'grain',.08,0,WALL-1,VW,H+2,'overlay',.5);
    ao(g,0,WALL-1,VW,13,'t',.6,'#160a04');
    ao(g,0,EDGE-7,VW,7,'b',.22,'#2a1408')});

  /* worn chamfered front lip and shadowed front apron of the workbench */
  R(g,0,EDGE,VW,1.8,'#a27848');
  g.fillStyle=lg(g,0,EDGE,VW,EDGE,['#583a1e','#9c7244','#cca066','#ba8e56','#5a3a1e']);g.fillRect(0,EDGE,VW,1.2);
  R(g,0,EDGE+1.2,VW,.6,'#4a2c14');
  inRect(g,0,EDGE+1.8,VW,VT-EDGE-1.8,()=>{
    g.fillStyle=lg(g,0,EDGE+2,0,VT,['#4e321a','#3a2311','#26160a']);g.fillRect(0,EDGE+1.8,VW,VT-EDGE);
    for(let y=EDGE+3;y<VT;y+=1.5+r()*1.5)R(g,0,y,VW,.5,r()<.55?rgba('#180c04',.24):rgba('#9c7040',.1));
    tex(g,'mott',.18,0,EDGE+1.8,VW,VT-EDGE,'overlay',.7);ao(g,0,EDGE+1.8,VW,3,'t',.45,'#0e0602')})}

/* dayAshlar: the wall's courses by day. It lays the same blocks as ashlar() in index.html, drawing the same numbers from r in the same
   order, so that each block stands where it stands by night; but the joints and the edges of the blocks are soft, as they are in even
   daylight, and the stone's grain is calm. */
function dayAshlar(g,x,y,w,h,c,r,o){const bw=o.bw,bh=o.bh,v=o.v,m=o.m;
  inRect(g,x,y,w,h,()=>{R(g,x,y,w,h,m);
    for(let j=0,row=0;j<h;j+=bh,row++){let i=-(row%2?bw*.5:0)-r()*bw*.25;
      while(i<w){const ww=bw*(.75+r()*.5),cc=tint(c,(r()-.5)*v*2),X=x+i,Y=y+j;
        R(g,X,Y,ww-.5,bh-.5,cc);R(g,X,Y,ww-.5,.5,tint(cc,.08));R(g,X,Y+bh-1,ww-.5,.5,tint(cc,-.05));
        if(r()<.3)R(g,X+1+r()*(ww-4),Y+1+r()*(bh-3),1+r()*2,.5+r()*.5,tint(cc,-.07));
        if(r()<.12)R(g,X,Y,1+r()*1.5,1,tint(cc,-.08));i+=ww}}
    tex(g,'mott',.16,x,y,w,h);tex(g,'grain',.08,x,y,w,h,'overlay',.5)})}

/* ---------- coiled papyrus end-face helper (no stick sticking out, no tie across) ---------- */
function spiralEnd(g,cx,cy,rx,ry,tone,L){
  oval(g,cx,cy,rx,ry,tint(tone,-.48));
  const rings=[[.88,tint(tone,-.04)],[.76,tint(tone,-.46)],[.64,tint(tone,.08)],[.52,tint(tone,-.44)],[.4,tint(tone,.02)],[.28,tint(tone,-.5)]];
  for(let i=0;i<rings.length;i++){const[k,col]=rings[i];oval(g,cx+(1-k)*.35,cy+(1-k)*.1,Math.max(1.1,rx*k),Math.max(1.2,ry*k),col)}
  /* dark hollow core at the center */
  oval(g,cx+.3,cy,Math.max(1,rx*.18),Math.max(1.1,ry*.22),'#26180c');
  /* warm rim catchlight on the lamp-facing upper-right lip of the outer turns; by day a cooler one on the upper-left lip, toward the window */
  g.save();g.strokeStyle=L&&L.day?rgba('#f6f2e6',.34):rgba('#fff0c2',.38);g.lineWidth=.55;g.beginPath();
  if(L&&L.day)g.ellipse(cx,cy,rx*.9,ry*.9,0,3.5,4.9);else g.ellipse(cx,cy,rx*.9,ry*.9,0,-1.3,.35);g.stroke();g.restore()}

/* ---------- a rolled-up scroll lying on its side: shows only its near coiled end ---------- */
/* far: the roll's far end is in the picture too. It is then only the round outline of the roll, in the tones of its side (CONTRIBUTING
   section 4); otherwise the far end lies beyond the edge of the picture. */
function roll(g,x,y,len,rad,ang,seed,base,L,far){const r=rng(seed),C=base||'#dcc28c';
  at(g,x,y,ang,()=>{
    clipTo(g,()=>{g.beginPath();
      /* (each end is a subpath of its own, begun with moveTo, so that no line joins it to the next and cuts a wedge out of the roll) */
      if(far){g.rect(0,-rad,len,rad*2);g.moveTo(rad*.44,0);g.ellipse(0,0,rad*.44,rad,0,0,6.2832);g.moveTo(len+rad*.44,0)}else g.rect(-4,-rad,len+4,rad*2);g.ellipse(len,0,rad*.44,rad,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-rad,0,rad,[[0,tint(C,-.04)],[.18,tint(C,.32)],[.42,C],[.72,tint(C,-.34)],[.9,tint(C,-.54)],[1,tint(C,-.42)]]);
      g.fillRect(-6,-rad-1,len+14,rad*2+2);
      /* fine horizontal papyrus fibers along the roll */
      for(let yy=-rad;yy<rad;){const h=.7+r()*1.5;R(g,-6,yy,len+12,h,r()<.5?rgba('#7a5824',.05+r()*.08):rgba('#fff6d6',.05+r()*.08));yy+=h}
      /* subtle vertical sheet-join shading and weathered handling patina near the rim */
      for(let u=8;u<len-8;u+=18+r()*16)ao(g,u,-rad,4,rad*2,'l',.08,'#5a3c14');
      tex(g,'mott',.22,-6,-rad-1,len+14,rad*2+2,'overlay',.75);tex(g,'grain',.08,-6,-rad-1,len+14,rad*2+2,'overlay',.5);
      ao(g,len-14,-rad,16,rad*2,'r',.16,'#68481c');
      /* warm lamplight sheen rising toward the right end closest to the lamp; by day a pale sheen toward the window on the left */
      g.fillStyle=L&&L.day?lg(g,0,0,len,0,['rgba(246,242,232,.18)','rgba(246,242,232,0)']):lg(g,0,0,len,0,['rgba(255,224,160,0)','rgba(255,224,160,.16)']);g.fillRect(0,-rad,len,rad*1.3)});
    spiralEnd(g,len,0,rad*.45,rad,C,L)})}

/* ---------- the open scroll: worn papyrus fibers running across, handwritten columns, rolled left end, curled right lip ---------- */
function openScroll(g,L){const day=L&&L.day;const r=rng(424),e=rng(425),x0=84,x1=186,y0=157,y1=189,P=[];
  const nick=(v,at,wd,d)=>{const k=Math.abs(v-at)/wd;return k<1?d*(1-k*k):0};
  for(let x=x0;x<=x1;x+=2+e()*3)P.push(x,y0+(e()-.5)*.65+nick(x,122,3.5,1.1)+nick(x,162,3,.8)+.35*Math.sin(x/11)+(x-x0)*.012);
  for(let x=x1;x>=x0;x-=2+e()*3)P.push(x,y1+(e()-.5)*.65-nick(x,148,4,1.2)-nick(x,104,3,.8)+.35*Math.sin(x/10)-(x-x0)*.008);

  /* flat open papyrus sheet */
  clipTo(g,()=>poly(g,P),()=>{
    g.fillStyle=lg(g,x0,y0,x1,y1,['#cbb078','#e4d09c','#f0e2b8','#e5cf9a','#d4ba82']);g.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);
    /* recto papyrus strips laid horizontally */
    for(let y=y0-1;y<y1+2;){const h=.8+r()*1.8;R(g,x0-2,y,x1-x0+4,h,r()<.5?rgba('#846028',.04+r()*.07):rgba('#fff7da',.05+r()*.09));y+=h}
    for(let i=0;i<70;i++)R(g,x0+r()*(x1-x0),y0+r()*(y1-y0),4+r()*14,.45,r()<.5?rgba('#745220',.09):rgba('#fff6d2',.1));
    tex(g,'mott',.22,x0-2,y0-2,x1-x0+4,y1-y0+4,'overlay',.75);tex(g,'grain',.08,x0-2,y0-2,x1-x0+4,y1-y0+4,'overlay',.5);
    /* warm edge aging and gentle crease shadows near both rolled ends */
    ao(g,x0,y0-1,x1-x0,5,'t',.22,'#6e4a1c');ao(g,x0,y1-5,x1-x0,6,'b',.26,'#5c3c14');
    ao(g,x0,y0,11,y1-y0,'l',.42,'#4e3210');
    ao(g,x1-9,y0,10,y1-y0,'r',.32,'#624218');
    pool(g,108,185,13,5,'#9c7432',.2,'multiply');pool(g,166,162,12,4,'#9c7432',.14,'multiply');
    /* warm highlight pool from the nearby oil lamp on upper-right area of sheet; by day the daylight lies on its left part */
    if(day)pool(g,112,172,52,26,'#fbf6ea',.2,'screen');else pool(g,166,164,44,24,'#fff4d0',.22,'screen');

    /* two neat columns of ancient Greek bookhand script: level calligraphic letterforms with subtle ink-weight rhythm */
    for(const[cx0,cx1]of[[96,133],[143,178]]){
      for(let k=0;k<7;k++){const by=162.5+k*3.65+(cx0-96)*.01;let xx=cx0+(k===0?3:r()*.8);
        const end=k===6?cx0+15+r()*12:cx1-r()*3;
        while(xx<end-2.2){const wlen=Math.min(end-xx,2.6+r()*6),inkA=.56+r()*.26,col=rgba('#28180c',inkA);
          /* each word is a tight horizontal cluster of tiny bookhand glyphs along a steady baseline (never both top and bottom on one mark) */
          let X=xx;
          while(X<xx+wlen){const gw=.65+r()*.85,gh=.5+r()*.42,gy=by-(r()<.24?.5:.25);
            R(g,X,gy,gw,gh,col);
            if(r()<.36)R(g,X+.15,gy-.35,Math.max(.5,gw*.65),.38,rgba('#28180c',inkA*.76));
            else if(r()<.18)R(g,X+.2,gy+gh,.5,.32,rgba('#28180c',inkA*.62));
            X+=gw+.38+r()*.35}
          xx=X+1.25+r()*1.1}}
    }});
  /* crisp subtle dark edge along worn papyrus sheet */
  g.save();poly(g,P);g.strokeStyle=rgba('#543814',.45);g.lineWidth=.5;g.stroke();g.restore();

  /* right curled edge: sheet curves up off the bench, casting a curved shadow underneath and catching bright lamplight on its crest */
  comp(g,'multiply',.44,()=>poly(g,[184,158.8,193.2,159.8,193.6,189,185,189.5],'#261408'));
  at(g,186.2,157.5,1.545,()=>{const len=31.2,rad=3.2;
    clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2);g.ellipse(0,0,rad*.4,rad,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-rad,0,rad,[[0,'#b8985c'],[.2,'#fff3cc'],[.5,'#e6ce94'],[.82,'#9c7a40'],[1,'#62461e']]);
      g.fillRect(-3,-rad-1,len+6,rad*2+2);
      for(let u=0;u<len;u+=2+r()*2)R(g,u,-rad,.8,rad*2,r()<.5?rgba('#7a5824',.06):rgba('#fff8dc',.08));
      tex(g,'mott',.2,-3,-rad-1,len+6,rad*2+2,'overlay',.7)});
    spiralEnd(g,len,0,rad*.48,rad,'#dcc48c',L)});

  /* left rolled-up portion of the open scroll, thick and naturally wound */
  at(g,82.2,156.2,1.565,()=>{const len=33.2,rad=5.8;
    clipTo(g,()=>{g.beginPath();g.rect(0,-rad,len,rad*2);g.ellipse(0,0,rad*.42,rad,0,0,6.2832)},()=>{
      g.fillStyle=lg(g,0,-rad,0,rad,[[0,'#6e5026'],[.22,'#b89a60'],[.5,'#efe0b2'],[.72,'#fcf0c8'],[.9,'#b8985e'],[1,'#7a5a2c']]);
      g.fillRect(-4,-rad-1,len+8,rad*2+2);
      for(let u=0;u<len;u+=1.8+r()*2.2)R(g,u,-rad,.8,rad*2,r()<.5?rgba('#7c5824',.05):rgba('#fff7d8',.07));
      tex(g,'mott',.24,-4,-rad-1,len+8,rad*2+2,'overlay',.75);tex(g,'grain',.08,-4,-rad-1,len+8,rad*2+2,'overlay',.5);
      ao(g,0,-rad,5,rad*2,'l',.22,'#4e3210');ao(g,len-5,-rad,6,rad*2,'r',.22,'#4e3210')});
    spiralEnd(g,len,0,rad*.45,rad,'#dec690',L)})}

/* ---------- the wheel-turned terracotta inkpot ---------- */
function inkpot(g,L){const day=L&&L.day,cx=93,y0=135,B=[cx,y0,cx+6.2,y0+1.1,cx+7.8,y0+4.6,cx+9.8,y0+9.2,cx+9.2,y0+14.2,cx+6.4,y0+16.6,cx,y0+17.2,cx-6.4,y0+16.6,cx-9.2,y0+14.2,cx-9.8,y0+9.2,cx-7.8,y0+4.6,cx-6.2,y0+1.1];
  blob(g,B,'#6a3820');
  clipTo(g,()=>blob(g,B),()=>{
    /* 3D spherical-lathe lighting from the oil lamp to the right-above */
    /* (by day the same lathe lighting, turned to come from the window on the left) */
    g.fillStyle=day?lg(g,cx+10,y0+2,cx-10,y0+15,[[0,'#2e170e'],[.24,'#5a2d1a'],[.52,'#8e4c2a'],[.78,'#c27648'],[.92,'#dca27a'],[1,'#96522c']])
      :lg(g,cx-10,y0+2,cx+10,y0+15,[[0,'#2e170e'],[.24,'#5a2d1a'],[.52,'#8e4c2a'],[.78,'#c67642'],[.92,'#e69e62'],[1,'#96522c']]);
    g.fillRect(cx-12,y0-2,24,22);
    /* subtle horizontal wheel-turning grooves */
    for(const ry of[y0+5.6,y0+9.2,y0+12.8])stroke(g,[cx-10,ry,cx,ry+1.3,cx+10,ry],rgba('#281006',.22),.55);
    /* warm specular highlight on right shoulder + warm wood bounce near bottom */
    if(day)pool(g,cx-5.5,y0+7.2,4.4,5,'#f6eee0',.34,'screen');else pool(g,cx+5.5,y0+7.2,4.4,5,'#ffdda4',.42,'screen');
    pool(g,cx+2,y0+15.2,7,2.4,'#c4864a',.25,'screen');
    tex(g,'mott',.24,cx-12,y0-2,24,22,'overlay',.6);tex(g,'grain',.1,cx-12,y0-2,24,22,'overlay',.5);
    ao(g,cx-11,y0+11,22,7,'b',.55,'#140804')});
  /* rolled terracotta lip and recessed collar */
  oval(g,cx,y0+1.6,6.8,2.6,'#8e4e2c');
  g.save();g.strokeStyle=day?'#e4b896':'#f2ba7c';g.lineWidth=.8;g.beginPath();if(day)g.ellipse(cx,y0+1.4,6.4,2.3,0,2.5,3.9);else g.ellipse(cx,y0+1.4,6.4,2.3,0,-.8,.6);g.stroke();g.restore();
  oval(g,cx,y0+1.9,5.4,2.05,'#4a2414');
  /* glossy wet black soot ink inside the mouth, with a tiny flame reflection and rim ink smudge */
  oval(g,cx,y0+2.2,4.5,1.65,'#0e0a09');
  /* (by day the ink shows the window, a pale square at its left, and no flame) */
  if(day){R(g,cx-2.8,y0+1.6,2.2,.75,'#5a5458');R(g,cx-2.6,y0+1.55,1.1,.5,'#d8dce2')}
  else{R(g,cx+.6,y0+1.6,2.2,.75,'#7a5434');
  R(g,cx+1.6,y0+1.55,1.1,.5,'#ffdba0')}
  blob(g,[cx+2.8,y0+3.5,cx+4.8,y0+3.4,cx+5.4,y0+4.2,cx+3.6,y0+4.6],'rgba(16,10,8,.42)')}

/* ---------- the first-century reed pen (kalamos): hollow cane stalk with long oblique scooped nib ---------- */
function reedPen(g){
  /* rests in the warm lamplight between the inkpot and open scroll, scooped ink-stained nib pointing toward the inkpot */
  at(g,156,147.6,Math.PI-.125,()=>{
    /* 0 = hollow oblique-cut butt end (right), ~28..47 = long diagonal pared scoop tapering to split calligraphic nib (left) */
    const W=1.78;
    /* subtle organic cane curve along the shaft (no transverse nodes across it, CONTRIBUTING §3) */
    const body=[0,-W,10,-W-.18,21,-W-.06,29,-W+.1,35.5,-W+.48,41,-1.05,47,-.26,47,.36,41,1.05,34.5,W-.22,21,W-.05,10,W-.16,0,W];
    blob(g,body,'#966c36');
    clipTo(g,()=>blob(g,body),()=>{
      /* cylindrical dried river-cane shading: warm honey-amber reed with waxy golden lamplight catchlight */
      g.fillStyle=lg(g,0,-W-1,0,W+1,[[0,'#684620'],[.2,'#cfa65c'],[.36,'#ecd08a'],[.56,'#b28644'],[.82,'#745024'],[1,'#422a10']]);
      g.fillRect(-2,-3,52,6);
      /* fine longitudinal reed-cane fibers running lengthwise */
      for(const[fy,fc,fa]of[[-1.08,'#fff0bc',.24],[-.36,'#5e3e18',.2],[.44,'#4e3212',.24],[1.08,'#301b08',.32]])
        sline(g,[0,fy,11,fy-.12,23,fy,31,fy*.85],rgba(fc,fa),.42);
      tex(g,'mott',.16,-2,-3,52,6,'overlay',.5);

      /* long oblique pared scoop (x = 28..47): exposes the darker concave hollow pith channel of the reed */
      const scoop=[28,-.22,31.5,-1.3,36.8,-1.18,41.6,-.74,46.6,-.16,46.6,.24,41.2,.8,36.2,1.18,31.2,1.02,28,.22];
      blob(g,scoop,'#563718');
      clipTo(g,()=>blob(g,scoop),()=>{
        g.fillStyle=lg(g,0,-1.45,0,1.45,['#2e1a0a','#624220','#906634','#ae8044']);g.fillRect(27,-2,21,4);
        /* dark carbon ink soaking the scooped nib tip and creeping back up the hollow channel */
        g.fillStyle=lg(g,36.8,0,45.5,0,['rgba(16,10,7,0)','rgba(16,10,7,.8)','#120b08']);g.fillRect(36,-2,12,4)});
      /* crisp pared bevel walls catching warm lamplight along the diagonal cut shoulders */
      sline(g,[28,-.15,31.5,-1.3,36.8,-1.16,41.5,-.74],'#f0d694',.5);
      sline(g,[28.4,.26,31.5,1.04,36.4,1.16,40.8,.8],'#c69e58',.44);
      /* dark ink-stained chisel-cut nib tip and fine lengthwise ink slit */
      poly(g,[41.2,-.64,47,-.2,47,.28,41.2,.68],'#160e0a');
      stroke(g,[39.4,.04,46.8,.04],'#0a0604',.4);
      stroke(g,[41.8,-.36,45.6,-.1],'rgba(154,122,88,.58)',.35)});
    /* hollow oblique-cut butt end at x=0: natural pale reed wall around a warm dark hollow canal */
    oval(g,.25,0,1.05,W,'#be9856');
    oval(g,.18,0,.68,W*.6,'#321d0e');
    oval(g,.15,-.1,.38,W*.32,'#1e1007');
    g.save();g.strokeStyle='#ecd08c';g.lineWidth=.45;g.beginPath();g.ellipse(.25,0,1,W-.05,0,-1.4,.9);g.stroke();g.restore()})}

/* ---------- the hero oil lamp: first-century molded terracotta lamp with recessed discus, soot and wick ---------- */
function oilLamp(g,L){const[lx,ly]=LAMP,day=L&&L.day;
  /* molded pierced ring/lug handle at the back-left */
  const lug=[129,130.5,123.5,129.6,120.2,131.6,120.6,135,124.2,136.6,128.8,136.2];
  blob(g,lug,'#763d20');
  clipTo(g,()=>blob(g,lug),()=>{
    g.fillStyle=lg(g,0,129,0,137,['#cc8450','#8a4a26','#3c1a0c']);g.fillRect(119,128,12,10);
    oval(g,124.4,133.4,2.1,1.15,'#382012');
    g.save();g.strokeStyle='rgba(230,164,104,.45)';g.lineWidth=.45;g.beginPath();g.ellipse(124.4,133.4,2.1,1.15,0,.3,2.5);g.stroke();g.restore()});

  /* integrated biconical bowl curving smoothly into the flared nozzle */
  const B=[126.8,133.6,128.4,139.2,134.8,143.6,144.2,145.2,154.2,143.8,161.4,140.4,168.4,138.2,175.4,136.8,179.4,134.2,179.2,131.2,174.4,129.4,166.6,129.2,158.6,127.4,147,126.4,136.2,127.6,129.2,130.2];
  blob(g,B,'#9a542e');
  clipTo(g,()=>blob(g,B),()=>{
    /* vertical clay carination shading: lit upper shoulder, rich deep burnt-terracotta belly */
    g.fillStyle=lg(g,0,126,0,145.5,[[0,'#d8925c'],[.36,'#b4663a'],[.62,'#7e4020'],[.88,'#421d0e'],[1,'#2c1208']]);
    g.fillRect(124,125,58,22);
    /* directional self-illumination from its own flame on the right nozzle; by day, out, it is lit from the window on the left */
    g.fillStyle=day?lg(g,126,0,180,0,[[0,'rgba(250,244,232,.28)'],[.34,'rgba(250,244,232,.06)'],[.7,'rgba(22,8,4,.16)'],[1,'rgba(22,8,4,.42)']])
      :lg(g,126,0,180,0,[[0,'rgba(22,8,4,.56)'],[.38,'rgba(22,8,4,.08)'],[.7,'rgba(255,204,132,.2)'],[1,'rgba(255,228,168,.46)']]);
    g.fillRect(124,125,58,22);
    /* warm golden bounce light along the lower belly reflected from the lit bench */
    pool(g,149,143.5,14,3.2,'#d88c4c',.3,'screen');
    /* subtle fired terracotta mottling and surface clay texture */
    tex(g,'mott',.24,124,125,58,22,'overlay',.65);tex(g,'grain',.1,124,125,58,22,'overlay',.5)});

  /* upper discus shoulder & molded concentric rim */
  oval(g,145.2,132.4,16.4,5.4,'#c8804e');
  /* warm highlight rim facing the flame on the right and front */
  g.save();g.strokeStyle=day?'#e8c4a0':'#fad092';g.lineWidth=.9;g.beginPath();if(day)g.ellipse(145.2,132.3,16,5.1,0,1.9,3.7);else g.ellipse(145.2,132.3,16,5.1,0,-.55,1.25);g.stroke();g.restore();
  /* raised molding ring around the concave basin */
  oval(g,145.2,132.7,14.2,4.4,'#8e4e2a');
  oval(g,145.2,132.8,13.1,3.9,'#ba7444');
  /* concave discus interior: lit on the LEFT inner wall by the flame to the right, shaded on the RIGHT inner wall */
  clipTo(g,()=>oval(g,145.2,132.9,11.6,3.3),()=>{
    g.fillStyle=day?lg(g,157,134,133,132,[[0,'#e2b08a'],[.32,'#c88c60'],[.68,'#9a5832'],[1,'#623018']]):lg(g,133,132,157,134,[[0,'#f4be80'],[.32,'#d28e58'],[.68,'#9a5832'],[1,'#623018']]);
    g.fillRect(132,128,27,10);
    tex(g,'mott',.2,132,128,27,10,'overlay',.5)});
  /* subtle decorative molded inner collar around the filling hole */
  oval(g,145,133.1,5.6,1.95,'#d08a56');
  oval(g,145,133.2,4.2,1.45,'#160a05');
  oval(g,144.2,133.4,1.6,.5,'#643e1a');

  /* projecting nozzle top, raised wick-hole collar, realistic burnt soot darkening */
  const noz=[157.8,129.6,166.4,130.1,174.6,130.4,179,132.4,175.4,134.8,167.2,135.2,158.6,135.8];
  blob(g,noz,'#ca8450');
  clipTo(g,()=>blob(g,noz),()=>{
    g.fillStyle=day?lg(g,158,129,179,135,['#c48256','#b8784a','#a0643a','#8a5430']):lg(g,158,129,179,135,['#b66e3e','#e4a266','#ffd698','#d68c54']);g.fillRect(157,128,24,10);
    /* soot stain darkening the tip of the clay nozzle around the wick opening */
    pool(g,lx+1.2,ly+3.2,6.2,3.4,'#180c08',.6,'multiply')});
  /* nozzle rim lip & wick hole */
  oval(g,lx,ly+2.8,3.6,1.6,'#9e5c32');
  oval(g,lx,ly+2.9,2.6,1.15,'#1c0e08');
  /* twisted flax wick emerging from the hole, glowing ember-orange at the flame base */
  poly(g,[lx-1.1,ly+2.7,lx-.6,ly+.3,lx+.8,ly+.3,lx+1.2,ly+2.7],'#321c10');
  /* lit, its end glows; put out, it is charred black */
  R(g,lx-.55,ly+.15,1.15,.95,day?'#140c0a':'#ff8224')}

/* ---------- the tentmaker's tools: two turned-handle awls and a guardless Roman utility knife ---------- */
function awl(g,x,y,ang,sc,woodC){
  at(g,x,y,ang,()=>{g.scale(sc,sc);
    /* organic lathe-turned olivewood/walnut palm handle */
    const H=[0,0,1.4,-3,6.2,-4.4,11.6,-3.6,15.4,-2.1,16.4,0,15.4,2.1,11.6,3.6,6.2,4.4,1.4,3];
    blob(g,H,woodC);
    clipTo(g,()=>blob(g,H),()=>{
      g.fillStyle=lg(g,0,-4.4,0,4.4,[[0,tint(woodC,.4)],[.22,tint(woodC,.22)],[.52,woodC],[.82,tint(woodC,-.46)],[1,tint(woodC,-.62)]]);
      g.fillRect(-1,-5,19,10);
      /* fine wood grain following the handle's length */
      for(const gy of[-2.2,-.6,1.1,2.4])sline(g,[1,gy*.7,7,gy,14,gy*.5],rgba('#2c1406',.24),.42);
      /* smooth finger-worn specular highlight facing the lamp */
      pool(g,6.8,-1.8,5.2,1.6,'#ffe4ac',.38,'screen');
      tex(g,'mott',.16,-1,-5,19,10,'overlay',.5)});
    /* hammered bronze ferrule collar */
    const F=[15.4,-2.05,18.6,-1.7,18.6,1.7,15.4,2.05];
    poly(g,F,'#7a5e32');
    clipTo(g,()=>poly(g,F),()=>{
      g.fillStyle=lg(g,0,-2.1,0,2.1,['#f2d68c','#c49a52','#765828','#3a2a12']);g.fillRect(15,-2.5,4,5)});
    /* forged square-section steel piercing spike: bright upper facet catching warm lamplight, dark lower bevel */
    poly(g,[18.6,-1.15,39.5,-.12,39.5,.28,18.6,1.15],'#56545a');
    poly(g,[18.6,-1.15,39.5,-.12,18.6,.05],'#d6d2c8');
    stroke(g,[18.8,-.6,38,-.06],'#fff6e0',.45)})}

function knife(g,x,y,ang,sc,L){const day=L&&L.day;
  at(g,x,y,ang,()=>{g.scale(sc,sc);
    /* guardless Roman leather/tentmaker's utility knife: subtly contoured walnut handle with aged bronze pins */
    const H=[0,0,1.2,-2.5,6.8,-3.1,15.5,-2.8,19.2,-2.45,19.2,2.45,15.5,2.8,6.8,3.1,1.2,2.5];
    blob(g,H,'#5c351b');
    clipTo(g,()=>blob(g,H),()=>{
      g.fillStyle=lg(g,0,-3.2,0,3.2,[[0,'#d49c60'],[.22,'#9c6232'],[.56,'#64391a'],[.86,'#381e0d'],[1,'#221107']]);
      g.fillRect(-1,-3.6,21,7.2);
      for(const gy of[-1.6,0,1.6])sline(g,[1,gy,10,gy+.2,18,gy-.1],rgba('#241006',.28),.42);
      pool(g,8,-1.5,5.5,1.2,'#ffdda0',.26,'screen');
      tex(g,'mott',.16,-1,-3.6,21,7.2,'overlay',.5)});
    /* flush aged bronze tang pins along the handle midline (small squares, CONTRIBUTING §3) */
    for(const rx of[6.4,13.2]){R(g,rx-.65,-.65,1.3,1.3,'#2e1a0c');R(g,rx-.45,-.45,.9,.9,'#a07a42')}
    /* flush forged iron collar ring (no protruding guard) where the blade meets the wood */
    R(g,18.2,-2.4,1.2,4.8,'#4c4844');R(g,18.2,-2.4,1.2,1.6,'#9e968a');
    /* sturdy forged iron/steel utility blade: dark-forged spine, gently sweeping belly, honed bright bevel, no guard */
    const Bl=[19.2,-2.35,44.5,-2.15,51.2,-1.1,47.2,1.8,40.5,3.35,31.2,3.7,19.2,3.2];
    blob(g,Bl,'#7a7876');
    clipTo(g,()=>blob(g,Bl),()=>{
      g.fillStyle=lg(g,0,-2.4,0,3.8,[[0,'#444246'],[.18,'#948e88'],[.46,'#c6beb2'],[.72,'#686664'],[.78,'#ece2d0'],[.92,'#fff6e4'],[1,'#d8d0c0']]);
      g.fillRect(18,-3,35,7.5);
      /* warm lamplight reflection on the forged flat nearest the lamp */
      pool(g,27,-.5,12,2.4,day?'#eef0f2':'#ffe4b0',day?.3:.36,'screen');
      /* hand-forged hammer scale patina along the upper spine */
      R(g,19.2,-2.4,27,1.05,rgba('#26242a',.36));
      tex(g,'grain',.1,18,-3,35,7.5,'overlay',.5);
      /* crisp honed bevel separation line */
      sline(g,[19.2,2.1,31.5,2.55,40.5,2.2,46.8,.95,50.8,-.9],rgba('#ffffff',.52),.45)})})}

/* ---------- the ball of coarse waxed linen twine ---------- */
function twineBall(g,L){const day=L&&L.day;const cx=275,cy=134,rr=9.2,r=rng(771);
  clipTo(g,()=>oval(g,cx,cy,rr,rr*.94),()=>{
    g.fillStyle=rg(g,cx-3.2,cy-2.4,rr*1.7,['#f4e6be','#d8c290','#9e8454','#5e4a28','#2e2212']);
    g.fillRect(cx-11,cy-11,22,22);
    /* organic wrapped twine strands curving cleanly across the spherical contour in one sweep direction */
    for(let k=-6;k<=6;k++){const y0=cy+k*1.55;
      sline(g,[cx-11,y0+3.4,cx-4,y0+.8,cx+3,y0-1.1,cx+11,y0-3.6],rgba('#4a381a',.36+(k%2)*.14),.65);
      sline(g,[cx-11,y0+2.8,cx-4,y0+.2,cx+3,y0-1.7,cx+11,y0-4.2],rgba('#fff4d0',.22),.4)}
    tex(g,'grain',.14,cx-11,cy-11,22,22,'overlay',.5);
    /* warm rim-light facing the oil lamp to the left */
    pool(g,cx-5.6,cy-2,5,6.5,day?'#f4f0e2':'#ffdfa0',.28,'screen')});
  /* a few fine stray linen wisps catching the lamplight on the left contour */
  for(let i=0;i<5;i++){const a=2.2+i*.32,px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr*.94;
    sline(g,[px,py,px-1.2-r()*.8,py+(r()-.5)*1.4],rgba('#e8d4a4',.45),.38)}}

/* ---------- dark Cilician goat-hair cloth (cilicium), half-sewn seam, needle & trailing thread ---------- */
function cloth(g){const r=rng(5150),A=[336,136],SEAM=[258,192],
    C=[252,167,255,160,261,155.4,269,156.2,276,151.4,286,149,297,148.6,308,144.6,324,142,324,214,274,214,269,207,264,202.5,260,197.4,261.5,191,256.5,186.5,258,179.5,253.5,174];
  blob(g,C,'#42372f');
  clipTo(g,()=>blob(g,C),()=>{
    /* heavy stiff dark goat-hair base, warmer near the lamp-facing left edge, deep espresso in the far corner */
    g.fillStyle=lg(g,250,152,322,212,['#6e5c4c','#4e4137','#342a24','#201a16']);g.fillRect(248,140,78,76);
    /* sculpted drapery troughs (dark shaded hollows) and rounded crests (warm lamplit backs) fanning from the gathered corner */
    const fold=(p,c,a)=>comp(g,'source-over',a,()=>blob(g,p,c));
    for(const[x0,y0,x1,y1,xm,ym]of[
      [251,174,258,184,284,162],[258,197,268,208,292,175],[278,214,293,214,306,178],[308,214,319,214,318,176],[264,151,274,147,298,144]
    ]){fold([A[0],A[1],xm,ym,x0,y0,x1,y1],'#120c09',.36);fold([A[0],A[1],(xm+x1)/2,(ym+y1)/2,(x0+x1)/2,(y0+y1)/2,x1,y1],'#0c0806',.32)}
    for(const[x0,y0,x1,y1,xm,ym]of[
      [252,163,255,172,282,154],[257,185,260,195,288,168],[266,204,276,214,298,178],[295,214,306,214,314,178],[275,146,286,144,308,141]
    ]){fold([A[0],A[1],xm,ym,x0,y0,x1,y1],'#a88e72',.24);fold([A[0],A[1],xm,ym,x0,y0,(x0+x1)/2,(y0+y1)/2],'#dab88e',.18)}
    /* unidirectional coarse woven goat-hair warp texture following the cloth strip direction (never a crossed grid) */
    const ang=Math.atan2(SEAM[1]-A[1],SEAM[0]-A[0]);
    for(let i=0;i<140;i++){const px=252+r()*70,py=146+r()*66,l=2+r()*5;
      stroke(g,[px,py,px+Math.cos(ang)*l,py+Math.sin(ang)*l],rgba(r()<.52?'#b0967a':'#100b08',.25),.45)}
    /* overlapped strip seam: subtle shadow lip under the upper strip, pale rim on the fold */
    stroke(g,[A[0],A[1],SEAM[0],SEAM[1]],rgba('#0e0906',.52),1.2);
    stroke(g,[A[0],A[1]-.8,SEAM[0],SEAM[1]-.8],rgba('#c8ae90',.38),.55);
    tex(g,'grain',.28,248,140,78,76,'overlay',.5);tex(g,'mott',.28,248,140,78,76,'overlay',.75);
    /* front bench-edge drape darkening as the heavy cloth drops over the edge */
    ao(g,248,EDGE-1,78,VT-EDGE+2,'t',.32,'#0a0604')});
  /* coarse wavy hem catching warm golden rim-light from the lamp */
  sline(g,[252,167,255,160,261,155.4,269,156.2,276,151.4,286,149,297,148.6,308,144.6],rgba('#ccb08c',.72),.8);
  sline(g,[253.5,174,258,179.5,256.5,186.5,261.5,191,260,197.4,264,202.5,269,207,274,214],rgba('#a68e72',.58),.75);
  /* tiny stray goat-hair fibers catching lamplight along the left folded edge */
  for(const[fx,fy]of[[253,164],[257,157],[265,155],[255,177],[259,189]])stroke(g,[fx,fy,fx-1.4,fy-.6],rgba('#c4a888',.45),.35);
  /* waxed linen stitches lying cleanly along the seam, sailmaker's needle inline with them, and slack thread back to the ball */
  const ang=Math.atan2(SEAM[1]-A[1],SEAM[0]-A[0]),on=u=>[A[0]+(SEAM[0]-A[0])*u,A[1]+(SEAM[1]-A[1])*u];
  for(let k=0;k<6;k++)at(g,...on(.70+k*.046),ang,()=>{
    R(g,-.2,.2,2.7,.75,'rgba(12,8,4,.5)');R(g,0,-.4,2.6,.85,'#e4d2a6');R(g,0,-.4,2.6,.35,'#fff4d4')});
  /* gleaming forged steel sailmaker's needle emerging from the seam */
  at(g,...on(.67),ang+Math.PI,()=>{
    poly(g,[0,-.1,10.8,-.2,12.2,.3,10.8,.9,0,.7],'rgba(10,6,4,.55)');
    poly(g,[0,-.45,10.6,-.62,12.2,0,10.6,.62,0,.45],'#868482');
    poly(g,[0,-.45,10.6,-.62,12.2,0,0,.05],'#fffaf0');
    R(g,1.5,-.2,1.6,.42,'#1e1610')});
  /* slack waxed linen thread with subtle shadow trailing from the needle eye back to the twine ball */
  const thr=[276.8,142.8,274.2,149.2,276.6,154.8,282.8,159.4,...on(.60)];
  sline(g,thr.map((v,i)=>i%2?v+.75:v+.4),'rgba(14,8,4,.48)',.75);
  sline(g,thr,'#e2d2a8',.68)}

/* ---------- grounded + directional shadow cast by the clay oil lamp onto the bench ---------- */
function lampShadow(g){
  /* Because the flame sits on the right nozzle (LAMP), the opaque clay bowl, handle and overhanging spout
     block raking light downward and leftward across the bench: a soft fading penumbra, a rich directional
     umbra sweeping past the handle toward the inkpot, and a velvety contact shadow under foot and spout. */
  comp(g,'multiply',1,()=>{
    /* 1. Wide soft penumbra fanning leftward from the clay bowl away from the elevated flame */
    const pen=[96,135,108,127.8,132,126.8,156,129.6,175,134.2,179.5,137.2,174,140.4,158,146.4,136,149.2,111,148.2,97,142.8];
    g.fillStyle=lg(g,96,138,164,138,['rgba(16,7,2,0)','rgba(16,7,2,.34)','rgba(16,7,2,.44)','rgba(16,7,2,.24)']);
    blob(g,pen);g.fill();
    /* 2. Mid directional umbra behind/left of the bowl, handle and under the flared spout */
    const umb=[106,135.2,117,129.6,135,129,158,132,176,135,178,137.2,172,139.6,157.5,144.6,140,147,121,145.6,109,140.8];
    g.fillStyle=lg(g,106,138,176,138,['rgba(14,6,2,.08)','rgba(12,5,2,.52)','rgba(12,5,2,.48)','rgba(14,6,2,.28)']);
    blob(g,umb);g.fill();
    /* 3. Feathered contact shadow under the lamp's base ring, lug handle and underside of the nozzle (no hard oval rim) */
    pool(g,143.5,143.8,22,5.8,'#0a0401',.76,'multiply');
    pool(g,143.5,143.8,14,3.4,'#080301',.62,'multiply');
    pool(g,123.4,136.4,7.4,3.6,'#0c0502',.62,'multiply');
    pool(g,165,139,13.5,3.2,'#0c0502',.54,'multiply')})}

/* ---------- the rolls that lie on the bench by day, besides the three of the night: the letters written since ----------
   [x, y, len, rad, ang, seed, tone] of each roll, as roll() takes them, the far one first. They lie at the back of the bench between the
   lamp and the ball of thread, wholly on the bench, so each shows its near end and only the round outline of its far end (CONTRIBUTING
   section 4); none lies across another. */
const MORE=[[196,121.5,52,4.8,.006,71,'#d4b680'],[190,129.5,58,5.4,-.01,73,'#e2ca96']];

/* ---------- assemble all still-life objects in depth order ----------
   L: the light (NIGHT, or DAY for the bench by day, which has the rolls of MORE as well) */
function things(g,L){const day=L&&L.day;
  if(day)for(const m of MORE)cast(g,m[0]+m[2]*.5,m[1]+m[3],m[3]*.6,l=>roll(l,...m,L,1),.5,L);
  /* pyramid of three stacked papyrus scrolls on the left: two touching on the bench, one nestled in the saddle above */
  cast(g,34,168,4.8,l=>{roll(l,-8,158,72,7.7,-.022,11,'#d0b47c',L);roll(l,-10,174.5,76,8.3,.018,23,'#c6a66c',L)},undefined,L);
  cast(g,36,162,3.4,l=>roll(l,-6,163.5,64,7.4,.01,37,'#e4cc98',L),undefined,L);
  if(day){
    /* by day the lamp is out, and throws its shadow away from the window like everything else on the bench */
    cast(g,93,144,5.4,l=>inkpot(l,L),.52,L);
    cast(g,150,138,4.2,l=>oilLamp(l,L),.5,L);
  }else{
  /* oil lamp's cast shadow on the bench (drawn before the inkpot so the pot stands cleanly above the bench shadow) */
  lampShadow(g);
  /* terracotta inkpot, hero oil lamp, reed pen (kalamos), and open scroll */
  cast(g,93,144,5.4,inkpot,.52);
  oilLamp(g)}
  cast(g,133,150,2.2,reedPen,.46,L);
  cast(g,136,174,2.8,l=>openScroll(l,L),.48,L);
  /* ball of linen twine and dark goat-hair cloth on the right */
  cast(g,275,134,5.4,l=>twineBall(l,L),.52,L);
  cast(g,284,174,3.8,cloth,.48,L);
  /* tentmaker's tools side by side in the warm right-center zone (none crossing another, clear of the cloth hem) */
  cast(g,222,152,2.4,l=>awl(l,199,150,.055,1.22,'#a46430'),.5,L);
  cast(g,225,167,2.1,l=>awl(l,205,166,.02,1.02,'#8e5428'),.5,L);
  cast(g,223,181,1.8,l=>knife(l,192.5,181.5,-.03,1.16,L),.5,L)}

/* ---------- chiaroscuro lighting from the single clay oil lamp ---------- */
function light(g){const[lx,ly]=LAMP,[c,l]=mk(VW*HR,VT*HR);l.scale(HR,HR);
  l.fillStyle='#261c30';l.fillRect(0,0,VW,VT);
  /* layered warm amber-terracotta candlelight pools centered on the wick (keeps R > G so stone glows warm gold, never olive) */
  pool(l,lx,ly-8,228,150,'#ff9e58',.96);
  pool(l,lx-2,ly+2,132,84,'#ffc27e',.74);
  pool(l,lx+4,ly+4,58,34,'#ffe0a2',.6);
  pool(l,lx-14,ly+24,96,48,'#ffb26e',.26);
  /* deep nocturnal falloff behind the title logo and subtle cozy vignette at the sides and foot */
  comp(l,'multiply',1,()=>{
    ao(l,0,0,VW,72,'t',.82,'#0a0614');
    ao(l,0,VT-20,VW,20,'b',.44,'#0a0614');
    ao(l,0,0,42,VT,'l',.3,'#0a0614');
    ao(l,VW-44,0,44,VT,'r',.36,'#0a0614')});
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='multiply';g.drawImage(c,0,0);g.restore();
  /* soft warm additive aura right around the burning wick */
  pool(g,lx,ly-2,20,14,'#ff983a',.38)}

/* ---------- daylight: the room in the morning, lit from a window in the left wall, out of the picture ----------
   A warm light: the stone toward cream and ochre where the sun lies, a warm brown-grey in the shade, nothing violet. The sun comes in
   low and lies on the left of the bench and on the foot of the wall above it (SUN), no higher than about a third of the wall, so that the
   upper wall is in even, soft shade, where the closing screen's words stand. Its edges are soft (it is laid on several times a little
   apart), and it is a patch of light on the stone and the wood, not a ray: no beam, no shaft and no dust in the air (CONTRIBUTING
   section 3). */
/* SUN: the patches of sun, one on the foot of the wall and one on the bench. Their edges bend where the wall meets the bench, as the
   edge of a patch of light does where it passes from one face to another, and they do not run on as one slanting band. */
const SUN=[[0,82,60,84,84,WALL,0,WALL],[0,WALL,84,WALL,44,180,0,186]],SOFT=[[0,0],[-2.4,-1.2],[2.4,1.2],[-1.2,2.4],[1.2,-2.4],[-3.6,0],[3.6,0],[0,-3.2],[0,3.2]];
function dayLight(g){const[c,l]=mk(VW*HR,VT*HR),soft=fn=>{for(const P of SUN)for(const[ox,oy]of SOFT)fn(P.map((v,i)=>v+(i%2?oy:ox)))};
  l.scale(HR,HR);
  /* the room's shade: a warm brown-grey, a little lighter toward the window and on the bench, which faces the light */
  l.fillStyle='#bcaa96';l.fillRect(0,0,VW,VT);
  comp(l,'lighter',1,()=>{l.fillStyle=lg(l,0,0,VW,0,[[0,'rgba(58,52,42,1)'],[.5,'rgba(38,32,24,1)'],[1,'rgba(10,8,6,1)']]);l.fillRect(0,0,VW,VT)});
  comp(l,'lighter',1,()=>{l.fillStyle=lg(l,0,WALL,0,VT,['rgba(40,30,18,1)','rgba(20,14,8,1)']);l.fillRect(0,WALL,VW,VT-WALL)});
  /* the sun */
  soft(p=>comp(l,'lighter',.075,()=>poly(l,p,'#ffe8c4')));
  comp(l,'multiply',1,()=>{
    ao(l,0,0,VW,36,'t',.18,'#3a2814');
    ao(l,0,VT-18,VW,18,'b',.3,'#2a1c10');
    ao(l,VW-80,0,80,VT,'r',.22,'#3a2814')});
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='multiply';g.drawImage(c,0,0);g.restore();
  /* where the sun lies, the stone and the wood are lifted a little above their own colour */
  soft(p=>comp(g,'soft-light',.07,()=>poly(g,p,'#fff2d8')))}

/* ---------- organic layered oil-lamp flame (all motion strictly within 24px of LAMP) ---------- */
function lampFlame(g,lx,ly,t){
  const sw=Math.sin(t/145)*.6+Math.sin(t/89)*.3,ht=10.2+Math.sin(t/113)*.7+Math.sin(t/67)*.3;
  const tear=(w,h,ox,oy,c,a)=>{g.save();g.globalAlpha*=a;g.fillStyle=c;g.beginPath();
    g.moveTo(lx+ox,ly+oy);
    g.bezierCurveTo(lx+ox-w,ly+oy-h*.18,lx+ox-w*.82+sw*.4,ly+oy-h*.68,lx+ox+sw*1.05,ly+oy-h);
    g.bezierCurveTo(lx+ox+w*.82+sw*.4,ly+oy-h*.68,lx+ox+w,ly+oy-h*.18,lx+ox,ly+oy);
    g.closePath();g.fill();g.restore()};
  tear(3.4,ht+1.1,0,1.1,'#d64212',.7);
  tear(2.65,ht,0,.9,'#ff8e20',.96);
  tear(1.75,ht*.72,sw*.15,.6,'#ffdc5e',.98);
  tear(.95,ht*.44,sw*.1,.35,'#fff9de',1)}

let BG=null,out=null;
const build=()=>bake(VW,g=>{room(g);things(g);light(g)},12,VT);
/* day: the bench by day, for the end of the game, as a scene (G.scene): the same bench and the same things in the morning, the lamp out,
   two more rolls. Nothing in it moves. paint() is the picture itself. */
let DAYBG=null;
const paint=()=>bake(VW,g=>{room(g,DAY);things(g,DAY);dayLight(g)},12,VT);
function day(g,t){g.drawImage(DAYBG||(DAYBG=paint()),0,0,VW,VT)}
function scene(g,t){const k=out?clamp((performance.now()-out.t0)/out.ms,0,1):0;
  if(out){out.next(g,t);if(k>=1){if(G.scene===scene)G.scene=out.next;return}g.globalAlpha=1-k}
  g.drawImage(BG||(BG=build()),0,0,VW,VT);const[lx,ly]=LAMP;
  lampFlame(g,lx,ly,t);
  pool(g,lx,ly-4,18+Math.sin(t/190)*.8,13,'#ff9838',(.16+.015*Math.sin(t/83))*g.globalAlpha);g.globalAlpha=1}
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
return{scene,leave,score,len,turn:len-3.2,lamp:LAMP,day,paint,get out(){return!!out}}})();
