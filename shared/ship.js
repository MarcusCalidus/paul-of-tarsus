/* Paul of Tarsus: side-view ship painter, shared across harbor and sea scenes (Chapters 2, 4, 8, 10, 12, 15).
   Loaded on demand when a chapter lists 'ship' in CHAP[n].needs (see need() in index.html), and kept for offline play by shared/pwa.js.

   Unifies the two Chapter Fifteen ship renderers—the side-lit Troas coaster (shipQuay15) and the backlit Cenchreae grain ship
   (shipCen15)—into a parametric painter that supports:
     - orientation dir: 1 (bow right) or dir: -1 (bow left),
     - view modes: 'bow' (fore-body clipped at one edge), 'stern' (after-body clipped at one edge), or 'full' (stempost to sternpost),
     - curved plank strakes that follow the sheer curve and flatten toward the waterline, with dual-stroke seams and staggered butt
       joints stopping strictly inside their own strake course (CONTRIBUTING sections 3 and 4),
     - upper painted wale (with optional weathered paint chips), lower heavy structural wale, projecting square deck-beam heads,
       bulwark scupper slots, tarred lower hull pitch, and a molded rail timber with a sunlit top arris,
     - dedicated 3D stempost and sternpost timbers with cylindrical shading, wood grain, bottom AO, rabbet shadow, beveled cap, and
       sunlit rim highlight,
     - deck cargo and rigging styles drawn behind/above the rail (lashed yard with catenary bellying furled sail and zero vertical ties
       across the roll; stowed grain sacks or cloth bales; raking artemon foremast and slanting stays; aft steersman's cabin; pitched
       goat-hair foredeck shelter; standing mast stopping at the raised yard or meeting a lowered yard at a corner so no cross shape
       is ever formed),
     - quarter steering oars, sagging mooring hawsers, planked gangplank, beach haul-out shores, and offscreen canvas caching for
       60 fps animated scenes,
     - and a view of its own, 'deckAft': the deck seen from aboard, looking aft (see "The deck seen from aboard" below, and
       SHARED.ship.deck). */
SHARED.ship=(()=>{
"use strict";

const CACHE=new Map();

/* cached(key, w, h, fn): bakes a ship variant onto an HR-scaled offscreen canvas once and reuses it across animation frames. */
function cached(key,w,h,fn){
  let c=CACHE.get(key);
  if(c)return c;
  if(CACHE.size>24){const first=CACHE.keys().next().value;CACHE.delete(first)}
  const[cv,cg]=mk(Math.ceil(w*HR),Math.ceil(h*HR));
  cg.scale(HR,HR);
  fn(cg);
  CACHE.set(key,cv);
  return cv;
}

/* ptsLine(fn, x0, x1, st): samples y = fn(x) from x0 to x1 at step st, always ending at x1. */
function ptsLine(fn,x0,x1,st){
  st=st||2;
  const p=[];
  for(let x=x0;x<x1;x+=st)p.push(x,fn(x));
  p.push(x1,fn(x1));
  return p;
}

/* ptsBack(p): reverses a flat [x0,y0, x1,y1, ...] point array. */
function ptsBack(p){
  const q=[];
  for(let i=p.length-2;i>=0;i-=2)q.push(p[i],p[i+1]);
  return q;
}

/* ptsBand(fn0, fn1, x0, x1, st): closed polygon ribbon between y = fn0(x) and y = fn1(x). */
function ptsBand(fn0,fn1,x0,x1,st){
  return ptsLine(fn0,x0,x1,st).concat(ptsBack(ptsLine(fn1,x0,x1,st)));
}

/* hawser(g, x0, y0, x1, y1, sag, opts): sagging catenary mooring line with under-shadow and lit rope stroke. */
function hawser(g,x0,y0,x1,y1,sag,opts){
  opts=opts||{};
  sag=sag==null?4.5:sag;
  const n=opts.steps||12,p=[];
  for(let i=0;i<=n;i++){
    const t=i/n;
    p.push(x0+(x1-x0)*t,y0+(y1-y0)*t+sag*Math.sin(Math.PI*t));
  }
  const w=opts.w||.6;
  stroke(g,p.map((v,i)=>i%2?v+.5:v),opts.shade||'rgba(30,24,34,.5)',w);
  stroke(g,p,opts.color||'#d8c08a',w);
}

/* gangplank(g, opts): planked gangway reaching from the ship's side over the stone quay edge onto the paving.
   Cross-cleats stop strictly inside the side stringers so no line crosses an edge. */
function gangplank(g,o){
  const x0=o.x0,y0=o.y0,x1=o.x1,y1=o.y1,w0=o.w0||9,w1=o.w1||w0+2,
    c=o.color||'#8a6438',lit=o.lit||tint(c,.28),dk=o.dark||tint(c,-.32),
    P=[x0,y0,x0+w0,y0,x1+w1,y1,x1,y1];
  if(o.shadow!==false){
    comp(g,'multiply',.38,()=>poly(g,[x0+.8,y0+1.2,x0+w0+1.2,y0+1.2,x1+w1+1.8,y1+1.2,x1+.8,y1+1.2],'#3a3048'));
  }
  poly(g,P);
  g.fillStyle=lg(g,Math.min(x0,x1),Math.min(y0,y1),Math.max(x0+w0,x1+w1),Math.max(y0,y1),[tint(c,.12),c,tint(c,-.18)]);
  g.fill();
  clipTo(g,()=>poly(g,P),()=>{
    tex(g,'wood',.22,Math.min(x0,x1)-2,Math.min(y0,y1)-2,Math.abs(x1-x0)+w1+4,Math.abs(y1-y0)+4,'overlay',.5);
    /* longitudinal plank seam along the middle of the gangplank, stopping clear of both ends */
    const mx0=x0+w0*.5,my0=y0,mx1=x1+w1*.5,my1=y1;
    stroke(g,[mx0+(mx1-mx0)*.08,my0+(my1-my0)*.08,mx0+(mx1-mx0)*.92,my0+(my1-my0)*.92],'rgba(28,16,8,.32)',.45);
    /* Foothold cleats: inset from both side rails so they never cross the stringers */
    const n=o.cleats==null?5:o.cleats;
    for(let i=1;i<=n;i++){
      const t=i/(n+1),lx=x0+(x1-x0)*t,rx=x0+w0+(x1+w1-(x0+w0))*t,cy=y0+(y1-y0)*t,
        ax=lx+(rx-lx)*.16,bx=lx+(rx-lx)*.84;
      stroke(g,[ax,cy,bx,cy],dk,.55);
      stroke(g,[ax,cy-.4,bx,cy-.4],rgba(lit,.45),.4);
    }
  });
  /* Side stringers */
  const sunLeft=o.sunSide!=='r';
  stroke(g,[x0,y0,x1,y1],sunLeft?lit:dk,.65);
  stroke(g,[x0+w0,y0,x1+w1,y1],sunLeft?dk:lit,.65);
}

/* paintFurledRoll(g, o): Style A lashed tapered yard with catenary bellying furled linen sail hanging underneath between
   gasket points (GK), per-bay horizontal shading gradients, quadratic-curve fold highlights and shadows, mott overlay, and
   cast multiply shadow on the upper hull—with zero vertical ties across the roll. */
function paintFurledRoll(g,S,o){
  const x0=o.x0,x1=o.x1,gk=o.gaskets,
    yBase=o.yFn||S,
    th=o.thFn||(x=>{
      const span=Math.max(1,x1-x0),u=clamp((x-x0)/span,0,1);
      return o.taperDir===-1?(o.th0||3.4)+((o.th1||5.2)-(o.th0||3.4))*u:(o.th0||6)-((o.th0||6)-(o.th1||2.4))*u;
    }),
    GK=gk||(()=>{const a=[],step=(x1-x0)/(o.bays||7);for(let x=x0;x<=x1+.1;x+=step)a.push(x);return a})(),
    r0=Math.max(x0,GK[0]),r1=Math.min(x1,GK[GK.length-1]),
    u=x=>{let i=0;while(i<GK.length-2&&GK[i+1]<x)i++;return clamp((x-GK[i])/Math.max(.1,GK[i+1]-GK[i]),0,1)},
    yard=x=>yBase(x)-(o.dy||.6)-th(x),
    belly=o.belly==null?.9:o.belly,
    botOff=o.botOff==null?.3:o.botOff,
    botY=x=>yBase(x)-botOff-belly*(1-Math.pow(Math.sin(Math.PI*u(x)),.5)),
    roll=ptsLine(x=>yard(x)+.5,r0,r1,2).concat(ptsBack(ptsLine(botY,r0,r1,.5))),
    yMin=Math.min(yard(r0),yard(r1))-2,yMax=Math.max(yBase(r0),yBase(r1))+2;
  /* Furled linen roll bunched under the yard */
  poly(g,roll);
  g.fillStyle=lg(g,0,yMin,0,yMax,o.sailCols||['#eedcb0','#ccb888','#8e7a56']);
  g.fill();
  clipTo(g,()=>poly(g,roll),()=>{
    for(let i=0;i+1<GK.length;i++){
      const a=GK[i],b=GK[i+1],m=(a+b)/2,y0=yard(m)+.8,d=yBase(m)-.6-y0;
      g.fillStyle=lg(g,a,0,b,0,['rgba(255,244,214,.34)','rgba(255,244,214,0)','rgba(70,56,60,.34)']);
      g.fillRect(a,yMin-4,b-a,yMax-yMin+8);
      for(const[k,c]of[[.42,'rgba(255,250,230,.5)'],[.78,'rgba(104,88,60,.6)']]){
        g.strokeStyle=c;g.lineWidth=.45;g.beginPath();
        g.moveTo(a+1.2,y0+d*k*.3);
        g.quadraticCurveTo(m,y0+d*k*1.5,b-1.2,y0+d*k*.3);
        g.stroke();
      }
    }
    tex(g,'mott',.3,r0,yMin,r1-r0,yMax-yMin,'overlay',.5);
  });
  /* Tapered wooden yard on top of the furled sail, its arm reaching past the roll */
  const yx0=o.yardX0!=null?o.yardX0:x0,yx1=o.yardX1!=null?o.yardX1:x1,
    tipDrop=o.tipDrop||(x=>x>r1?(x-r1)*.03:x<r0?(r0-x)*.03:0);
  poly(g,ptsLine(x=>yard(x)-.6,yx0,yx1,3).concat(ptsBack(ptsLine(x=>yard(x)+.7-tipDrop(x),yx0,yx1,3))),o.yardCol||'#7e5a34');
  stroke(g,ptsLine(x=>yard(x)-.5,yx0,yx1,3),o.yardHi||'#e2b878',.45);
  /* Multiply shadow band cast by the roll onto the upper hull */
  if(o.castShadow!==false){
    const sx0=o.shadowX0!=null?o.shadowX0:r0,sx1=o.shadowX1!=null?o.shadowX1:Math.min(yx1,r1+2.5);
    comp(g,'multiply',o.shadowAlpha||.45,()=>poly(g,ptsBand(x=>yBase(x)+.6,x=>yBase(x)+2,sx0,sx1,2),o.shadowCol||'#6a5a78'));
  }
}

/* buildPost(o, xEdge, yTop, yBot, dir, isStem): builds default curved IN and OUT point arrays for a stempost or sternpost
   when explicit IN/OUT curves are not supplied.
   outSign is -1 when the post is on the left end of the hull, +1 when on the right end. */
function buildPost(o,xEdge,yTop,yBot,outSign){
  const h=yBot-yTop,tw=o.thick||3.2,sweep=o.sweep==null?h*.22:o.sweep,
    IN=[],OUT=[],steps=7;
  for(let i=0;i<=steps;i++){
    const t=i/steps,y=yTop+h*t,
      /* gentle S/C curve sweeping inward toward the keel at the waterline and curving up to the stem/stern head */
      bend=Math.sin(t*Math.PI)*sweep*.28-Math.pow(t,1.8)*sweep,
      xin=xEdge+outSign*bend,
      w=tw*(1-.18*t);
    IN.push(xin,y);
    OUT.push(xin+outSign*w,y-(i===0?.3:0));
  }
  return{IN,OUT};
}

/* paintPost(g, p, o, yBot, outSign): renders a 3D stempost or sternpost timber from IN/OUT curves. */
function paintPost(g,p,o,yBot,outSign){
  const IN=p.IN,OUT=p.OUT,polyPts=o.stemFirst?IN.concat(ptsBack(OUT)):OUT.concat(ptsBack(IN));
  let xMin=1e9,xMax=-1e9,yMin=1e9,yMax=-1e9;
  for(let i=0;i<polyPts.length;i+=2){
    if(polyPts[i]<xMin)xMin=polyPts[i];
    if(polyPts[i]>xMax)xMax=polyPts[i];
    if(polyPts[i+1]<yMin)yMin=polyPts[i+1];
    if(polyPts[i+1]>yMax)yMax=polyPts[i+1];
  }
  poly(g,polyPts);
  if(o.grad){
    g.fillStyle=lg(g,o.gradX0!=null?o.gradX0:xMin,0,o.gradX1!=null?o.gradX1:xMax,0,o.grad);
  }else if(o.color){
    g.fillStyle=o.color;
  }else{
    const cols=outSign>0?['#b08250','#74502e','#3e2818']:['#9a7246','#6e4c2c','#3e2818'];
    g.fillStyle=lg(g,xMin,0,xMax,0,cols);
  }
  g.fill();
  clipTo(g,()=>poly(g,polyPts),()=>{
    if(o.ao){
      ao(g,o.ao.x,o.ao.y,o.ao.w,o.ao.h,'b',o.ao.a||.5,o.ao.c||'#140c08');
    }else if(o.ao!==false){
      ao(g,xMin-2,yMax-Math.min(30,(yMax-yMin)*.5),xMax-xMin+4,Math.min(32,(yMax-yMin)*.55),'b',.45,'#140c08');
    }
    if(o.wood!==false){
      tex(g,'wood',.3,xMin-2,yMin-2,xMax-xMin+4,yMax-yMin+4,'overlay',.55);
    }
  });
  /* Rabbet shadow seam along the inner edge where plank ends meet the post */
  if(o.rabbet!==false){
    stroke(g,IN,o.rabbetCol||'rgba(28,16,8,.5)',.5);
  }
  /* Crisp sunlit rim stroke along the outer/forward edge */
  if(o.rim!==false){
    const rimPts=(o.rimPts||OUT).slice(0,o.rimLen||OUT.length);
    stroke(g,rimPts,o.rimCol||'#f4dcae',o.rimW||.65);
  }
  /* Beveled stemhead / sternhead cap */
  if(o.capPoly){
    poly(g,o.capPoly,o.capCol||'#9a7448');
    if(o.capRim)stroke(g,o.capRim,o.capRimCol||'#f6e2b4',.5);
  }else if(o.capRect){
    R(g,o.capRect[0],o.capRect[1],o.capRect[2],o.capRect[3],o.capCol||'#e6bc80');
  }else if(o.cap!==false){
    const ix=IN[0],iy=IN[1],ox=OUT[0],oy=OUT[1],xL=Math.min(ix,ox)-.2,w=Math.abs(ox-ix)+.4;
    R(g,xL,Math.min(iy,oy)-.6,w,.8,o.capCol||'#e6bc80');
  }
}

/* paint(g, opts): unified side-view ship renderer. */
function paint(g,opts){
  if(opts&&opts.view==='deckAft')return paintDeck(g,opts);
  const o=opts||{},
    dir=o.dir||-1,               /* 1: bow right, -1: bow left */
    view=o.view||'full',         /* 'bow' | 'stern' | 'full' */
    x0=o.x0!=null?o.x0:0,
    x1=o.x1!=null?o.x1:212,
    yBot=o.yBot!=null?o.yBot:101,
    r=o.r||rng(o.seed||1501);

  /* 1. Sheer curve sh(x) */
  const yWaist=o.yWaist!=null?o.yWaist:76,
    bowRise=o.bowRise!=null?o.bowRise:16,
    bowSpan=o.bowSpan!=null?o.bowSpan:Math.min(64,(x1-x0)*.34),
    bowPow=o.bowPow!=null?o.bowPow:2.2,
    sternRise=o.sternRise!=null?o.sternRise:20,
    sternSpan=o.sternSpan!=null?o.sternSpan:Math.min(54,(x1-x0)*.3),
    sternPow=o.sternPow!=null?o.sternPow:2.2,
    hasBow=view==='full'||view==='bow',
    hasStern=view==='full'||view==='stern',
    sh=o.sheer||(x=>{
      let y=yWaist;
      if(dir===1){
        if(hasBow&&x>x1-bowSpan)y-=bowRise*Math.pow(clamp((x-(x1-bowSpan))/bowSpan,0,1),bowPow);
        if(hasStern&&x<x0+sternSpan)y-=sternRise*Math.pow(clamp((x0+sternSpan-x)/sternSpan,0,1),sternPow);
      }else{
        if(hasBow&&x<x0+bowSpan)y-=bowRise*Math.pow(clamp((x0+bowSpan-x)/bowSpan,0,1),bowPow);
        if(hasStern&&x>x1-sternSpan)y-=sternRise*Math.pow(clamp((x-(x1-sternSpan))/sternSpan,0,1),sternPow);
      }
      if(o.trimSlope)y+=(x-(x0+x1)*.5)*o.trimSlope;
      return y;
    });

  /* Strake coordinate mapper Y(x, f) and damped seam(j, x) */
  const Y=(x,f)=>sh(x)+(yBot-sh(x))*f,
    lineF=(f,xa,xb,dy)=>{const p=[];for(let x=xa;x<=xb;x+=3)p.push(x,Y(x,f)+(dy||0));return p},
    bandF=(f0,f1,xa,xb)=>lineF(f0,xa,xb).concat(ptsBack(lineF(f1,xa,xb))),
    dmp=o.damped,
    seam=dmp?(j,x)=>sh(x)*(1-j*(dmp.damp||.075))+(dmp.yRef!=null?dmp.yRef:yWaist)*j*(dmp.damp||.075)+j*(dmp.step||4.3):null;

  /* 2. Build stempost and sternpost profiles */
  const leftIsBow=dir===-1,
    hasLeftPost=leftIsBow?hasBow:hasStern,
    hasRightPost=leftIsBow?hasStern:hasBow,
    leftOpts=(leftIsBow?o.stem:o.stern)||{},
    rightOpts=(leftIsBow?o.stern:o.stem)||{},
    leftPost=hasLeftPost?(leftOpts.IN&&leftOpts.OUT?{IN:leftOpts.IN,OUT:leftOpts.OUT}:buildPost(leftOpts,x0,sh(x0)-(leftOpts.headRise!=null?leftOpts.headRise:2),yBot,-1)):null,
    rightPost=hasRightPost?(rightOpts.IN&&rightOpts.OUT?{IN:rightOpts.IN,OUT:rightOpts.OUT}:buildPost(rightOpts,x1,sh(x1)-(rightOpts.headRise!=null?rightOpts.headRise:2),yBot,1)):null;

  /* 3. Water shadow & dark bow/stern reflection ripples on the water */
  if(o.layer!=='hull'){
  if(o.waterShadow){
    const ws=o.waterShadow;
    comp(g,'multiply',ws.a||.5,()=>{
      poly(g,ws.poly);
      g.fillStyle=lg(g,ws.x0,0,ws.x1,0,ws.stops||['rgba(104,118,168,1)','rgba(104,118,168,.6)','rgba(104,118,168,0)']);
      g.fill();
    });
  }
  if(o.waterRipples){
    const wr=o.waterRipples;
    if(wr.mode==='cen15'){
      const ST=leftOpts.OUT||leftPost.OUT,
        stemX=y=>{let i=2;while(i<ST.length-2&&ST[i+1]<y)i+=2;const k=clamp((y-ST[i-1])/(ST[i+1]-ST[i-1]),0,1);return ST[i-2]+(ST[i]-ST[i-2])*k};
      for(let i=0;i<(wr.count||80);i++){
        const y=(wr.y0||79)+r()*(wr.yh||25),x=stemX(y)-1-Math.pow(r(),2)*(wr.xSpan||13);
        R(g,x,y,1.5+r()*4,.5,'rgba(34,30,44,'+(.22+.28*r())+')');
      }
    }else if(wr.mode==='quay15'){
      for(let i=0;i<(wr.count||150);i++){
        const x=116+Math.pow(r(),1.5)*70,y=74+r()*27;
        if(y<74+(x-118.6)*.46)continue;
        R(g,x,y,2+r()*6,.5,`rgba(34,48,92,${(.5*(1-(x-116)/72)).toFixed(2)})`);
      }
    }else{
      const n=wr.count||36,rx0=wr.x0!=null?wr.x0:x0,rx1=wr.x1!=null?wr.x1:x1,ry0=wr.y0!=null?wr.y0:yBot-14,ryh=wr.yh||13;
      for(let i=0;i<n;i++){
        const y=ry0+r()*ryh,x=rx0+r()*(rx1-rx0);
        R(g,x,y,1.5+r()*4,.5,'rgba(28,36,64,'+(.18+.22*r())+')');
      }
    }
  }

  /* 4. Pre-hull layer: stays, raking foremast, standing mast & sails, aft cabin, foredeck shelter, deck cargo, deck figures */
  if(o.stays){
    for(const st of o.stays){
      stroke(g,st.pts,st.c||'#4c3c30',st.w||.5);
      if(st.hi)stroke(g,st.hiPts||st.pts.map((v,i)=>i%2?v-.4:v-.4),st.hi,st.hiW||.3);
    }
  }
  if(o.foremast){
    const fm=o.foremast;
    poly(g,fm.poly,fm.c||'#62462c');
    if(fm.hi)stroke(g,fm.hi,fm.hiCol||'#f0d6a2',fm.hiW||.5);
    if(fm.cap)R(g,fm.cap[0],fm.cap[1],fm.cap[2],fm.cap[3],fm.capCol||'#4a3626');
  }
  if(o.mast){
    const m=o.mast,mx=m.x,my0=m.y0,my1=m.y1!=null?m.y1:sh(mx)+4,mw=m.w||3.2;
    /* Forestay and backstay */
    if(m.stays){
      for(const s of m.stays)stroke(g,s,m.stayCol||'#4a3a2a',m.stayW||.6);
    }
    /* Standing mast cylinder: stops at the yard when sail is raised so mast and yard never cross */
    g.fillStyle=lg(g,mx,0,mx+mw,0,m.cols||['#6a4a2a','#a67c4a','#5a3c20']);
    g.fillRect(mx,my0,mw,my1-my0);
    R(g,m.sunRight?mx+mw-1:mx,my0,1,my1-my0,m.hiCol||'#b88a52');
    if(m.cap!==false)R(g,mx-.2,my0,mw+.4,.9,m.capCol||'#c8a06a');

    /* Sail states on the standing mast */
    if(m.sail==='lowered'){
      /* Bare lowered yard resting abaft the mast, starting at the mast edge so they meet at a corner and never cross */
      const yx0=m.yardX0!=null?m.yardX0:mx+mw-.2,yx1=m.yardX1!=null?m.yardX1:x1-14,
        yy0=m.yardY0!=null?m.yardY0:sh(yx0)-2.8,yy1=m.yardY1!=null?m.yardY1:sh(yx1)-3.8;
      poly(g,[yx0,yy0,yx1,yy1,yx1,yy1+2.2,yx0,yy0+2.2],m.yardCol||'#5a3c22');
      stroke(g,[yx0,yy0+.2,yx1,yy1+.2],m.yardHi||'#b88a52',.5);
    }else if(m.sail==='torn'||m.sail==='full'){
      const yx0=m.yardX0!=null?m.yardX0:mx-45,yx1=m.yardX1!=null?m.yardX1:mx+47,
        yy0=m.yardY0!=null?m.yardY0:my0+2.4,yy1=m.yardY1!=null?m.yardY1:my0-1.2;
      /* Raised tilted tapered yard */
      poly(g,[yx0,yy0,yx1,yy1,yx1,yy1+2.4,yx0,yy0+2.4],m.yardCol||'#5a3c22');
      stroke(g,[yx0,yy0+.2,yx1,yy1+.2],m.yardHi||'#b88a52',.55);
      if(m.sail==='torn'){
        const f=m.flap||0,sx=yx0+4,sy=yy0+2.4;
        const p1=[sx,sy,sx+62,sy-2.4,sx+63,sy+7,sx+59,sy+13+f,sx+62,sy+21,sx+57,sy+27+f,sx+60,sy+35,sx+55,sy+37,sx+2,sy+38],
          p2=[sx+69,sy-2.6,sx+85,sy-3.4,sx+84,sy+35,sx+72,sy+34,sx+74,sy+25+f,sx+70,sy+17,sx+73,sy+7];
        poly(g,p1,'#dccfb0');poly(g,p2,'#d2c5a6');
        for(let i=0;i<5;i++)stroke(g,[sx+6+i*11,sy-.2-i*.4,sx+7+i*11,sy+38],'#b8ad90',.5);
        stroke(g,[sx+77,sy-3,sx+78,sy+35],'#b8ad90',.5);
        clipTo(g,()=>poly(g,p1),()=>{
          g.fillStyle=lg(g,sx,0,sx+63,0,['rgba(120,90,60,.3)','rgba(255,240,210,.05)','rgba(120,90,60,.24)']);
          g.fillRect(sx,sy-4,65,44);
          tex(g,'mott',.25,sx,sy-4,65,44,'overlay',.45);
        });
      }else{
        /* Billowing square sail */
        const sx0=yx0+3,sx1=yx1-3,sy0=yy0+1.6,sy1=yy1+2,sh0=m.sailH||42,bow=m.sailBow||5,
          sp=[sx0,sy0];
        for(let j=0;j<=10;j++)sp.push(sx0-2-Math.sin(j/10*Math.PI)*bow,sy0+j*(sh0/10));
        for(let i=0;i<=10;i++){
          const u=i/10;
          sp.push(sx0-2+(sx1-sx0+2)*u,sy0+sh0+(sy1-sy0+.3*sh0*.1)*u+Math.sin(u*Math.PI)*3.2);
        }
        for(let j=10;j>=0;j--)sp.push(sx1-(m.sailLeeIn?1:-1)*Math.sin(j/10*Math.PI)*(bow*.75),sy1+j*((sh0+2.5)/10));
        poly(g,sp,m.sailCol||'#e4d8b8');
        clipTo(g,()=>poly(g,sp),()=>{
          g.fillStyle=lg(g,sx0-bow,0,sx1+bow,0,['rgba(115,86,58,.34)','rgba(255,244,214,.14)','rgba(115,86,58,.28)']);
          g.fillRect(sx0-bow-2,Math.min(sy0,sy1)-2,sx1-sx0+bow*2+4,sh0+12);
          tex(g,'mott',.25,sx0-bow-2,Math.min(sy0,sy1)-2,sx1-sx0+bow*2+4,sh0+12,'overlay',.5);
          const seams=m.seams||7,step=(sx1-sx0)/seams;
          for(let i=1;i<seams;i++){
            const u=i/seams,tx=sx0+i*step,ty=sy0+(sy1-sy0)*u;
            stroke(g,[tx,ty,tx-1.8,ty+sh0+2.5],m.seamCol||'rgba(160,144,114,.55)',.5);
            stroke(g,[tx+.6,ty,tx-1.2,ty+sh0+2.5],'rgba(255,248,226,.25)',.4);
          }
          if(m.patch){
            const px=m.patch.x,py=m.patch.y,pw=m.patch.w||14,ph=m.patch.h||10;
            R(g,px,py,pw,ph,m.patch.c||'#cfc2a2');
            for(let i=0;i<pw;i+=2.5){R(g,px+i,py,1,.6,'#5a4a36');R(g,px+i,py+ph-.6,1,.6,'#5a4a36')}
            for(let j=0;j<ph;j+=2.5){R(g,px,py+j,.6,1,'#5a4a36');R(g,px+pw-.6,py+j,.6,1,'#5a4a36')}
          }
        });
      }
    }
  }

  /* Aft steersman's cabin / deckhouse */
  if(o.cabin){
    const cb=o.cabin,cx=cb.x,cw=cb.w||31,cy=cb.y!=null?cb.y:sh(cx+cw*.5)-12.4,ch=cb.h||14,c=cb.c||'#7a5632';
    R(g,cx,cy,cw,ch,c);
    clipTo(g,()=>R(g,cx,cy,cw,ch,c),()=>{
      for(let y=cy+2.8;y<cy+ch;y+=2.8){
        R(g,cx,y,cw,.5,'rgba(32,18,10,.45)');
        R(g,cx,y+.5,cw,.4,'rgba(230,192,138,.18)');
      }
      tex(g,'wood',.25,cx,cy,cw,ch,'overlay',.5);
    });
    R(g,cx,cy,cw,1,cb.hi||'#b88a52');
    R(g,cx-1,cy-1.2,cw+2,1.6,cb.roof||'#4a3220');
    R(g,cx-1,cy-1.2,cw+2,.5,cb.roofHi||'#c89a60');
    R(g,cb.shadeRight?cx+cw-1.6:cx,cy,1.6,ch,'rgba(30,16,8,.42)');
    const wins=cb.windows||[cx+6,cx+19];
    for(const wx of wins){
      R(g,wx,cy+4,5,5,'#24160e');
      R(g,wx,cy+9,5,.5,'#b88a52');
    }
  }

  /* Foredeck pitched goat-hair shelter over a ridge staff */
  if(o.tent){
    const tn=o.tent,tx0=tn.x0||22,tx1=tn.x1||84,rx0=tn.rx0||34,rx1=tn.rx1||72,
      ry=tn.ry||62.6,by=tn.by||77,tp=[tx0,by,rx0,ry,rx1,ry,tx1,by];
    poly(g,tp,'#241c18');
    g.fillStyle=lg(g,tx0,0,tx1,0,['#3e3229','#2a211c','#17110e']);
    g.beginPath();g.moveTo(tp[0],tp[1]);for(let i=2;i<tp.length;i+=2)g.lineTo(tp[i],tp[i+1]);g.closePath();g.fill();
    for(let j=ry+1.4;j<by;j+=1.6){
      const k=(j-ry)/Math.max(1,by-ry);
      stroke(g,[rx0-(rx0-tx0)*k,j,rx1+(tx1-rx1)*k,j],((j*10)|0)%30<16?'rgba(0,0,0,.22)':'rgba(255,240,210,.07)',.5);
    }
    stroke(g,[rx0-4,ry-.2,rx1+4,ry-.2],'#a8804e',1);
    stroke(g,[rx0-4,ry+.4,rx1+4,ry+.4],'#5a3c20',.5);
    stroke(g,tp,'#8a7a5a',.7);
    for(const q of(tn.ties||[tx0+4,tx0+18,tx1-18,tx1-4]))stroke(g,[q,by-2.4,q+1,by+.4],'#8a7a5a',.6);
  }

  /* Two-tiered elliptical grain sacks seen over the rail (shipCen15 style) */
  if(o.sacks){
    for(const[sx,k,c,rxOpt]of o.sacks){
      const y=sh(sx)+(o.sackDy!=null?o.sackDy:2.4),rx=rxOpt||6.2;
      g.beginPath();g.ellipse(sx,y-k*.4,rx,k,0,0,6.2832);
      g.fillStyle=lg(g,sx-rx,y-k*1.4,sx+rx*.8,y,[tint(c,.3),c,mix(tint(c,-.36),'#6a6c98',.25)]);
      g.fill();
      g.strokeStyle=o.sackRim||'#fff0c8';g.lineWidth=.5;
      g.beginPath();g.ellipse(sx,y-k*.4,rx,k,0,o.sackArc0||3.5,o.sackArc1||5.1);g.stroke();
    }
  }

  /* Corded cloth bales / boxes / folded sailcloth seen over the rail */
  if(o.bales){
    for(const[bx,bw,bh,c]of o.bales){
      const by=sh(bx+bw*.5)+(o.baleDy!=null?o.baleDy:2.2);
      g.fillStyle=lg(g,0,by-bh,0,by,[tint(c,.24),c,tint(c,-.28)]);
      g.fillRect(bx,by-bh,bw,bh);
      R(g,bx,by-bh,bw,.6,tint(c,.38));
      R(g,bx,by-bh,.6,bh,tint(c,.18));
      R(g,bx+bw-.6,by-bh,.6,bh,tint(c,-.28));
      for(let cx=bx+3.5;cx<bx+bw-2;cx+=4)R(g,cx,by-bh+.5,.5,bh-.8,'rgba(28,18,10,.22)');
    }
  }

  /* Deck figures callback (drawn behind the rail) */
  if(o.figs)o.figs(g);
  }
  if(o.layer==='pre')return;

  /* 5. Hull polygon path */
  const hullPath=o.hullPath||(()=>{
    const p=[];
    if(leftPost){
      const L=leftOpts.hullEdge||leftPost.IN;
      for(let i=0;i<L.length;i+=2)p.push(L[i],L[i+1]);
    }else{
      p.push(x0,sh(x0),x0,yBot);
    }
    if(rightPost){
      const R0=rightOpts.hullEdge||rightPost.IN;
      for(let i=R0.length-2;i>=0;i-=2)p.push(R0[i],R0[i+1]);
    }else{
      p.push(x1,yBot,x1,sh(x1));
    }
    const sxStart=rightPost?(rightOpts.sheerX!=null?rightOpts.sheerX:x1-2):x1,
      sxEnd=leftPost?(leftOpts.sheerX!=null?leftOpts.sheerX:x0+2):x0;
    for(let x=sxStart;x>=sxEnd;x-=3)p.push(x,sh(x));
    return()=>{
      g.beginPath();
      g.moveTo(p[0],p[1]);
      for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);
      g.closePath();
    };
  })();

  const yTopMin=o.yTopMin!=null?o.yTopMin:Math.min(sh(x0),sh(x1),sh((x0+x1)*.5))-4,
    pal=o.palette==='lit'?['#cd9c60','#ac7c46','#7c5632','#4c3320']
      :o.palette==='shaded'?[[0,'#7b5839'],[.45,'#5d4129'],[.75,'#3c2a1e'],[1,'#261a16']]
      :o.hullGrad||['#9e6e3e','#7a522c','#54361c','#321e10'];
  hullPath();
  g.fillStyle=lg(g,0,o.gradY0!=null?o.gradY0:yTopMin,0,o.gradY1!=null?o.gradY1:yBot,pal);
  g.fill();

  /* 6. Clipped hull interior: pitch, wales, strake seams, plank butt joints, beam heads, scuppers, textures, lighting */
  const hx0=leftPost?Math.min(x0,...leftPost.OUT.filter((_,i)=>i%2===0))-2:x0,
    hx1=rightPost?Math.max(x1,...rightPost.OUT.filter((_,i)=>i%2===0))+2:x1,
    hw=hx1-hx0,hy0=yTopMin-4,hh=yBot-hy0+4;

  clipTo(g,hullPath,()=>{
    if(dmp){
      /* Sheer-damped strake layout (shipQuay15 style) */
      const sMax=dmp.x1!=null?dmp.x1:hx1,sMin=dmp.x0!=null?dmp.x0:hx0;
      if(o.pitch!==false){
        const pCol=typeof o.pitch==='string'?o.pitch:'rgba(34,20,14,.46)';
        poly(g,ptsBand(x=>seam(5,x),()=>yBot+1,sMin,sMax,2),pCol);
      }
      if(o.wale!==false){
        const wCol=(o.wale&&o.wale.color)||o.wale||'#57776b';
        poly(g,ptsBand(x=>seam(1,x)-.2,x=>seam(1,x)+2.7,sMin,sMax,2),wCol);
        if(o.waleWear){
          const wn=o.waleWear.count||36,wxSpan=o.waleWear.xSpan||112,
            c1=o.waleWear.c1||'#96703f',c2=o.waleWear.c2||'#84a294';
          for(let i=0;i<wn;i++){
            const x=sMin+r()*wxSpan;
            R(g,x,seam(1,x)+r()*2,1+r()*3.6,.5+r()*.6,r()<.5?c1:c2);
          }
        }
      }
      const nCourses=dmp.count||10;
      for(let j=1;j<=nCourses;j++){
        const p=ptsLine(x=>seam(j,x)+(j===1?2.7:0),sMin,sMax,3);
        stroke(g,p,'rgba(34,20,10,.5)',.5);
        stroke(g,p.map((v,i)=>i%2?v+.5:v),'rgba(255,220,170,.2)',.4);
      }
      stroke(g,ptsLine(x=>seam(1,x)-.2,sMin,sMax,3),'rgba(30,20,12,.5)',.4);
      if(o.lowerWale!==false){
        const lwCol=(o.lowerWale&&o.lowerWale.color)||'#4c321e',
          lwHi=(o.lowerWale&&o.lowerWale.hi)||'#c0925a';
        poly(g,ptsBand(x=>seam(5,x)-2.4,x=>seam(5,x),sMin,sMax,2),lwCol);
        stroke(g,ptsLine(x=>seam(5,x)-2.3,sMin,sMax,3),lwHi,.5);
      }
      if(o.beams){
        const bxs=Array.isArray(o.beams)?o.beams:o.beams.xs||[];
        for(const x of bxs){
          R(g,x,seam(5,x)-2.1,1.8,1.8,'#26170e');
          R(g,x,seam(5,x)-2.1,1.8,.4,'#d4a66a');
        }
      }
      if(o.butts){
        for(const[j,x]of o.butts){
          R(g,x,seam(j,x)+(j===1?3.3:.6),.5,seam(j+1,x)-seam(j,x)-(j===4?3.5:1.1),'rgba(30,18,10,.42)');
        }
      }
      if(o.scuppers){
        for(const x of o.scuppers){
          R(g,x,sh(x)+3,2.6,.8,'#2a1a10');
          R(g,x,sh(x)+3.8,2.6,.4,'rgba(255,224,170,.3)');
        }
      }
    }else{
      /* Fractional strake grid Y(x, f) = sh(x) + (yBot - sh(x)) * f (shipCen15 style) */
      const sx0=o.strakeX0!=null?o.strakeX0:hx0,sx1=o.strakeX1!=null?o.strakeX1:hx1;
      if(o.pitch){
        const pf0=o.pitch.f0||.535,pCol=o.pitch.color||'rgba(28,16,10,.42)';
        poly(g,bandF(pf0,1.02,sx0,sx1),pCol);
      }
      if(o.wale!==false){
        const wf0=(o.wale&&o.wale.f0)||.115,wf1=(o.wale&&o.wale.f1)||.19,
          wCol=(o.wale&&o.wale.color)||(typeof o.wale==='string'?o.wale:'#8c4a30');
        poly(g,bandF(wf0,wf1,sx0,sx1),wCol);
        if(o.waleWear){
          const wn=o.waleWear.count||24,c1=o.waleWear.c1||'#96703f',c2=o.waleWear.c2||tint(wCol,.22);
          for(let i=0;i<wn;i++){
            const x=sx0+4+r()*(sx1-sx0-8),f=wf0+r()*(wf1-wf0)*.7;
            R(g,x,Y(x,f),1+r()*3,.5+r()*.5,r()<.5?c1:c2);
          }
        }
      }
      if(o.lowerWale!==false){
        const lwf0=(o.lowerWale&&o.lowerWale.f0)||.47,lwf1=(o.lowerWale&&o.lowerWale.f1)||.535,
          lwCol=(o.lowerWale&&o.lowerWale.color)||(typeof o.lowerWale==='string'?o.lowerWale:'#33241c');
        poly(g,bandF(lwf0,lwf1,sx0,sx1),lwCol);
        if(o.lowerWale&&o.lowerWale.hi){
          stroke(g,lineF(lwf0,sx0,sx1,.2),o.lowerWale.hi,.45);
        }
      }
      const seams=o.seams||[.1,.115,.19,.27,.35,.43,.47,.535,.61,.69,.77,.85,.93],
        seamDark=o.seamDark||'rgba(22,12,8,.5)',seamHi=o.seamHi||'rgba(226,186,130,.16)';
      for(const f of seams){
        stroke(g,lineF(f,sx0,sx1),seamDark,.6);
        stroke(g,lineF(f,sx0,sx1,.7),seamHi,.5);
      }
      /* Staggered vertical plank butt joints stopping strictly inside their own strake course */
      const courses=o.buttCourses||[[.19,.27],[.27,.35],[.35,.43],[.535,.61],[.61,.69],[.69,.77],[.77,.85]],
        bx0=o.buttX0!=null?o.buttX0:x0+14,bx1=o.buttX1!=null?o.buttX1:x1-2,
        bStepMin=o.buttStepMin||27,bStepVar=o.buttStepVar||24,bStartVar=o.buttStartVar||28;
      for(const[f0,f1]of courses){
        for(let x=bx0+r()*bStartVar;x<bx1;x+=bStepMin+r()*bStepVar){
          const yt=Y(x,f0)+.5,yb=Y(x,f1)-.3;
          if(yb>yt+.4)stroke(g,[x,yt,x,yb],'rgba(22,12,8,.4)',.5);
        }
      }
      /* Projecting square deck-beam heads with sunlit edge highlight */
      if(o.beams!==false){
        const bm=o.beams||{},bf=bm.f||.31,bStep=bm.step||19,
          bxStart=bm.x0!=null?bm.x0:x0+24,bxEnd=bm.x1!=null?bm.x1:x1-2,
          bw=bm.w||2,bh=bm.h||2,bCol=bm.color||'#241812',bHi=bm.hi||'#b89460',
          bTop=bm.topHi;
        if(bm.xs){
          for(const x of bm.xs){
            const y=Y(x,bf);
            R(g,x,y-1,bw,bh,bCol);
            if(bTop)R(g,x,y-1,bw,.45,bHi);else R(g,x,y-1,.5,bh,bHi);
          }
        }else{
          for(let x=bxStart;x<bxEnd;x+=bStep){
            const y=Y(x,bf);
            R(g,x,y-1,bw,bh,bCol);
            if(bTop)R(g,x,y-1,bw,.45,bHi);else R(g,x,y-1,.5,bh,bHi);
          }
        }
      }
      /* Bulwark scupper slots */
      if(o.scuppers){
        const sf=o.scupperF||.06;
        for(const x of o.scuppers){
          const sy=Y(x,sf);
          R(g,x,sy,2.4,.75,'#2a1a10');
          R(g,x,sy+.75,2.4,.35,'rgba(255,224,170,.28)');
        }
      }
    }

    /* Wood grain and mottling texture overlays */
    const tx=o.texRect||{x:hx0,y:hy0,w:hw,h:hh};
    tex(g,'wood',o.woodScale||.3,tx.x,tx.y,tx.w,tx.h,'overlay',o.woodAlpha||.55);
    tex(g,'mott',o.mottScale||.32,tx.x,tx.y,tx.w,tx.h,'overlay',o.mottAlpha||.85);

    /* Directional sun glow & cool violet multiply turn-away shading */
    if(o.turnShade){
      const ts=o.turnShade;
      if(ts.comp){
        comp(g,ts.comp,ts.a||.34,()=>{
          g.fillStyle=lg(g,ts.x0,0,ts.x1,0,ts.stops);
          g.fillRect(ts.rx!=null?ts.rx:tx.x,ts.ry!=null?ts.ry:tx.y,ts.rw!=null?ts.rw:tx.w,ts.rh!=null?ts.rh:tx.h);
        });
      }else{
        g.fillStyle=lg(g,ts.x0,0,ts.x1,0,ts.stops);
        g.fillRect(ts.rx!=null?ts.rx:tx.x,ts.ry!=null?ts.ry:tx.y,ts.rw!=null?ts.rw:tx.w,ts.rh!=null?ts.rh:tx.h);
      }
    }
    if(o.sunGlow){
      const sg=o.sunGlow;
      if(sg.comp){
        comp(g,sg.comp,sg.a||.3,()=>{
          g.fillStyle=lg(g,sg.x0,0,sg.x1,0,sg.stops);
          g.fillRect(sg.rx!=null?sg.rx:tx.x,sg.ry!=null?sg.ry:tx.y,sg.rw!=null?sg.rw:tx.w,sg.rh!=null?sg.rh:tx.h);
        });
      }else{
        g.fillStyle=lg(g,sg.x0,0,sg.x1,0,sg.stops);
        g.fillRect(sg.rx!=null?sg.rx:tx.x,sg.ry!=null?sg.ry:tx.y,sg.rw!=null?sg.rw:tx.w,sg.rh!=null?sg.rh:tx.h);
      }
    }

    /* Bottom waterline AO & under-rail shadow */
    const aoH=o.aoH||16,aoA=o.aoA!=null?o.aoA:.38,aoC=o.aoCol||'#0c0808';
    ao(g,tx.x,o.aoY!=null?o.aoY:yBot-aoH,tx.w,o.aoHeight||aoH,'b',aoA,aoC);
    if(o.underRailShadow!==false&&!dmp){
      const rx0=o.railX0!=null?o.railX0:x0+2,rx1=o.railX1!=null?o.railX1:x1;
      stroke(g,lineF(0,rx0,rx1,2.4),'rgba(16,10,8,.3)',1.3);
    }
  });

  /* 7. Molded rail timber & dedicated 3D stempost / sternpost timbers */
  const paintRail=()=>{
    if(o.rail===false)return;
    const rl=o.rail||{},rx0=rl.x0!=null?rl.x0:x0,rx1=rl.x1!=null?rl.x1:x1;
    if(rl.strokeOnly){
      stroke(g,ptsLine(sh,rx0,rx1,rl.step||2),rl.hi||'#f0cc90',rl.w||1);
    }else{
      const c=lineF(0,rx0,rx1),d=lineF(0,rx0,rx1,rl.h||1.7),p=c.concat(ptsBack(d));
      poly(g,p,rl.color||'#a37c4a');
      stroke(g,c,rl.hi||'#f6e2b4',rl.hiW||.6);
      stroke(g,lineF(0,rx0,rx1,(rl.h||1.7)+.2),rl.shade||'rgba(20,12,8,.45)',.5);
    }
  };
  if(o.postsBeforeRail){
    if(leftPost)paintPost(g,leftPost,leftOpts,yBot,-1);
    if(rightPost)paintPost(g,rightPost,rightOpts,yBot,1);
    paintRail();
  }else{
    paintRail();
    if(leftPost)paintPost(g,leftPost,leftOpts,yBot,-1);
    if(rightPost)paintPost(g,rightPost,rightOpts,yBot,1);
  }

  /* 8. Style A Lashed yard with bellying furled sail */
  if(o.furledYard){
    paintFurledRoll(g,sh,o.furledYard);
  }

  /* 9. Quarter steering oars (rudders) */
  if(o.rudders){
    for(const rd of o.rudders){
      if(rd.loom&&rd.blade){
        poly(g,rd.loom,rd.loomCol||'#5a3c22');
        poly(g,rd.blade,rd.bladeCol||'#6e4a2a');
        if(rd.hi)stroke(g,rd.hi,rd.hiCol||'#c89a5e',.55);
      }else if(rd.poly){
        poly(g,rd.poly,rd.c||'#6a4a2a');
        if(rd.hi)stroke(g,rd.hi,rd.hiCol||'#c89a5e',.55);
      }
    }
  }

  /* 10. Beach haul-out timber shores (winter laid-up hull) */
  if(o.beachProps){
    for(const x of o.beachProps){
      poly(g,[x,yBot+1.2,x+7.5,yBot+6.2,x+3.5,yBot+6.2,x-1,yBot+1.2],'rgba(26,22,38,.32)');
      poly(g,[x,yBot-.6,x+3.2,yBot-.6,x+7.6,yBot+6,x+4.4,yBot+6],'#5a4226');
      stroke(g,[x+3.2,yBot-.6,x+7.6,yBot+6],'#a88050',.55);
      stroke(g,[x,yBot-.6,x+4.4,yBot+6],'#2e1e10',.5);
    }
  }

  /* 11. Sagging mooring hawsers */
  if(o.hawsers){
    for(const h of o.hawsers){
      hawser(g,h[0],h[1],h[2],h[3],h[4],h[5]);
    }
  }
}

/* ======== The deck seen from aboard, looking aft (view 'deckAft') ========
   SHARED.ship.paint(g, {view:'deckAft', variant, chest, hz, sky, sea}) paints a walkable deck for a 320x144 room: the after part of a
   coaster's deck in perspective, seen from just aft of her mast (the mast is behind the viewer, out of the picture), a little to
   starboard of her middle line. Everything is laid out in the ship's own measure (metres) and projected (DK, deckGeo), so the planks,
   the bulwarks, the cargo and their footprints agree.
     variant 'day'   under sail by day, a north wind astern: the sun high behind the viewer and to his right, whitecaps, the wake;
             'eve'   at anchor in the evening: a low sun from the left, a calm sea, the left half of the deck in the bulwark's shade;
             'night' at anchor at night: moonlight from the right and one lamp hung under the curl of the stern post.
     chest   true: the gift's chest stands on the deck (right of the middle, near the viewer).
     hz      the horizon (default 66, about the eyes of a figure standing in the middle of the strip).
     sky(g, geo), sea(g, geo)   paint the sky and the sea (the coast painter); by default a plain sky and sea of the variant's own.
     wind    {a, s} for the pennant: a the bearing the wind blows toward, in degrees, 0 toward the viewer (the bow), 90 toward the
             picture's right, 180 away (aft); s its strength 0..1. pennant: a function (g, x, y, t, geo) that draws it instead.
   What it promises (CONTRIBUTING sections 3 and 4): the deck planks run fore and aft, each butt joint stops inside its own plank and the
   joints are staggered, never a grid; the bulwarks are planked in strakes with no post on their rails; nothing lies across the hull;
   the stern post rises from the top of the stern, which stands above the horizon, so the post never crosses the sea's level line;
   the steering oars' heads and their tillers stay below the horizon and meet at a corner; the deck shelter is lower than the eye, so
   it hides no horizon and figures behind it show above it; the lamp hangs by two cords that part upward, under the curl and above
   every head; no round glow stands where a head can come.
   SHARED.ship.deck gives the room what it needs: geo(o) (the projection, the horizon, the walk strip, the footprints, the anchor of
   the pennant and of the lamp), walk, block(o) (the bulwarks, as boxes), props(o) (the chest, the shelter, the rack of jars, the bales
   and the coil, each with its outline and footprint), light(o) (the room's light for the figures), and draw(g, t, o) for what moves:
   the sea, the wake, the pennant, the shelter's cloth and the lamp's flame, under the deck, which is laid again over the moving sea
   from a cached, dithered copy (overlay). */
const DK={F:150,E:1.7,hz:66,cx:160,cam:.5,ZS:10.6,B:2.9};
/* light per variant: amb and sun as [r,g,b] in 0..1, L the direction toward the sun (x right, y up, z away from the viewer), and
   kx, kz how far a shadow falls on the deck per metre of height */
const DKL={
  day:{amb:[.58,.6,.7],sun:[.62,.58,.5],L:[.38,.78,-.5],kx:-.32,kz:.42,deck:'#a08058',haze:'#b4c8dc'},
  eve:{amb:[.42,.38,.5],sun:[.86,.6,.38],L:[-.88,.34,-.33],kx:2.7,kz:.6,deck:'#a08058',haze:'#e0a880'},
  night:{amb:[.15,.17,.28],sun:[.2,.24,.36],L:[.62,.55,.56],kx:0,kz:0,deck:'#a08058',haze:'#2c3658'}};
function deckGeo(o){o=o||{};
  const hz=o.hz!=null?o.hz:DK.hz,F=DK.F,E=DK.E,cx=DK.cx,cam=DK.cam,v=DKL[o.variant]?o.variant:'day',
    P=(x,y,z)=>[cx+F*(x-cam)/z,hz+F*(E-y)/z],
    /* half the beam at the bulwark (the stern closes round in a curve to the post at ZS), the rise of the deck toward the stern, and
       the height of the rail above the deck, which climbs at the stern */
    b=z=>z<=4.5?DK.B:z>=DK.ZS?0:DK.B*Math.sqrt(Math.max(0,1-Math.pow((z-4.5)/(DK.ZS-4.5),2.2))),
    s=z=>z<=6?0:.85*Math.pow(Math.min(1,(z-6)/(DK.ZS-6)),3),
    r=z=>1+(z>9.2?.35*Math.pow(Math.min(1,(z-9.2)/(DK.ZS-9.2)),2):0),
    /* the plan of the bulwark, from the near left round the stern to the near right, with the inward normal at each point */
    C=[];
  for(let z=2;z<4.5;z+=.5)C.push([-b(z),z]);
  for(let k=0;k<=48;k++){const w=1-Math.pow(1-k/48,2.2),z=4.5+(DK.ZS-4.5)*w;C.push([-b(z),z])}
  for(let i=C.length-2;i>=0;i--)C.push([-C[i][0],C[i][1]]);
  const N=C.map((p,i)=>{const a=C[Math.max(0,i-1)],c=C[Math.min(C.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1;return[tz/l,-tx/l]});
  /* the steering oars at the quarters, outboard: the head of each loom, and the tiller's end, inboard and forward of it */
  const OAR=[-1,1].map(sd=>({head:[sd*2,1.55,7.55],rail:[sd*2.58,s(7.6)+r(7.6),7.6],foot:[sd*3,.5,7.65],tiller:[sd*1.2,1.45,6.6]})),
    /* the stern post: its foot on the stern at the middle line, behind the top of the stern bulwark */
    postFoot=P(0,s(DK.ZS)+r(DK.ZS)-.08,DK.ZS+.12),
    pennant=[postFoot[0]+4.8,postFoot[1]-36],lamp=[postFoot[0]+4.4,postFoot[1]-15.4],
    /* what stands on the deck, as boxes in metres: [x0, x1, z0, z1, height] */
    things={shelter:[-.95,.95,4.6,6.1,1.4],chest:[.92,1.72,3.9,4.38,.56],rack:[-2.82,-2.3,5.5,7.3,.84],bales:[1.86,2.7,5.3,6.9,.9],coil:[-2.4,-1.7,3.62,4.08,.2]},
    /* a box's footprint on the floor of the room: [x, y, w, h] (y its back edge, y + h its front) */
    footOf=([x0,x1,z0,z1])=>{const a=P(x0,0,z0),c=P(x1,0,z0),d=P(x0,0,z1),e=P(x1,0,z1),X0=Math.min(a[0],d[0]),X1=Math.max(c[0],e[0]);
      return[+X0.toFixed(1),+d[1].toFixed(1),+(X1-X0).toFixed(1),+(a[1]-d[1]).toFixed(1)]},
    foot={};for(const k in things)foot[k]=footOf(things[k]);
  /* the walk strip: the deck between the bulwarks, from the stern's edge of the room's view (y 100) to the near edge (y 140); x where the
     deck meets each bulwark at a given y of the floor */
  const zOfY=Y=>F*E/(Y-hz),edge=(Y,sd)=>{const z=zOfY(Y);return P(sd*b(z),0,z)[0]},walk=[8,312,102,140];
  return{v,L:DKL[v],hz,F,E,cam,P,b,s,r,C,N,OAR,postFoot,pennant,lamp,things,foot,walk,edge,zOfY,
    chest:!!o.chest,o}}
/* the light on a face of albedo c whose normal is n, under the variant's light */
function dkLit(geo,c,n,k){const L=geo.L,d=Math.max(0,n[0]*L.L[0]+n[1]*L.L[1]+n[2]*L.L[2])*(k==null?1:k),h=hex(c);
  return toHex(h[0]*(L.amb[0]+L.sun[0]*d)*1.12,h[1]*(L.amb[1]+L.sun[1]*d)*1.12,h[2]*(L.amb[2]+L.sun[2]*d)*1.12)}
/* where a point's shadow falls on the deck under the variant's sun */
function dkCast(geo,x,y,z){const L=geo.L;return geo.P(x+y*L.kx,0,z+y*L.kz)}
/* a soft shadow on the deck: the polygon (image points) multiplied three times, wide and faint to narrow and dark */
function dkShade(g,geo,p,a){const L=geo.L,c=toHex(255*L.amb[0]/(L.amb[0]+L.sun[0]*.9),255*L.amb[1]/(L.amb[1]+L.sun[1]*.9),255*L.amb[2]/(L.amb[2]+L.sun[2]*.9));
  const cx=p.filter((_,i)=>i%2===0).reduce((s,v)=>s+v,0)/(p.length/2),cy=p.filter((_,i)=>i%2).reduce((s,v)=>s+v,0)/(p.length/2);
  for(const[k,al]of[[1.06,.3],[1,.45],[.94,.4]])comp(g,'multiply',(a||1)*al,()=>poly(g,p.map((v,i)=>i%2?cy+(v-cy)*k:cx+(v-cx)*k),c))}
/* the convex hull of image points, for a shadow cast by a box */
function dkHull(pts){const q=[];for(let i=0;i<pts.length;i+=2)q.push([pts[i],pts[i+1]]);q.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),lo=[],up=[];
  for(const p of q){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}
  for(let i=q.length-1;i>=0;i--){const p=q[i];while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
  return lo.slice(0,-1).concat(up.slice(0,-1)).flat()}
function dkBoxShadow(g,geo,[x0,x1,z0,z1,h],a){if(!geo.L.kx&&!geo.L.kz)return;const pts=[];
  for(const x of[x0,x1])for(const z of[z0,z1]){pts.push(...geo.P(x,0,z),...dkCast(geo,x,h,z))}dkShade(g,geo,dkHull(pts),a)}

/* the sky and the sea of each variant, when the room gives no painter of its own: one horizon at geo.hz */
function dkSky(g,geo){const v=geo.v,H=geo.hz,r=rng(16031);
  if(v==='night'){sky(g,320,H+1,[[0,'#070b20'],[.6,'#121a3c'],[1,'#26325a']]);
    for(let i=0;i<150;i++){const x=r()*320,y=r()*(H-6),k=r();R(g,x,y,.5,.5,`rgba(${226+k*29|0},${228+k*20|0},${206+k*49|0},${.3+k*.6})`)}
    pool(g,262,20,64,40,'#b8c6ee',.26);pool(g,262,20,9,9,'#eef0e2',.9);oval(g,262,20,4.2,4.2,'#fbfbee');R(g,260.4,18.6,1.5,1,'rgba(150,150,170,.3)');
    for(const[x,y,w]of[[210,34,60],[300,44,40],[60,40,70]])pool(g,x,y,w,4,'#3a4672',.4,'source-over');return}
  if(v==='eve'){sky(g,320,H+1,[[0,'#2c3c70'],[.45,'#6a6a96'],[.8,'#d0908a'],[1,'#f2c48a']]);
    pool(g,-20,H-8,150,44,'#ffd08a',.45);
    for(const[x,y,w]of[[70,30,90],[180,22,70],[260,40,80],[120,48,60]]){pool(g,x,y,w,2.6,'#f4b48a',.55,'source-over');pool(g,x+4,y+1.4,w*.8,1.4,'#6a5a80',.35,'source-over')}return}
  sky(g,320,H+1,[[0,'#3a78c4'],[.5,'#78aad8'],[.85,'#bcd4e4'],[1,'#e6ecdc']]);
  for(const[x,y,w,h]of[[70,22,46,5],[190,14,40,4],[268,34,52,5],[132,40,30,3]])cloud(g,x,y,w,h,r);
  g.fillStyle=lg(g,0,H-10,0,H,['rgba(240,240,220,0)','rgba(240,240,220,.45)']);g.fillRect(0,H-10,320,10)}
function dkSea(g,geo){const v=geo.v,H=geo.hz,r=rng(16032),D=144-H;
  const st=v==='night'?[[0,'#2a365e'],[.15,'#18224a'],[1,'#0a1230']]:v==='eve'?[[0,'#e8b890'],[.12,'#9a8aa0'],[.5,'#5a5a86'],[1,'#3a3c66']]:[[0,'#c8dade'],[.08,'#6e9cc0'],[.4,'#3a6c9c'],[1,'#24507e']];
  g.fillStyle=lg(g,0,H,0,144,st);g.fillRect(0,H,320,D);
  for(let i=0;i<260;i++){const k=Math.pow(r(),1.3),y=H+.6+k*D,w=1.2+k*7*r();
    R(g,r()*326-4,y,w,.5,v==='night'?`rgba(130,150,210,${.08+.16*k})`:v==='eve'?(r()<.5?`rgba(255,214,170,${.14+.2*k})`:`rgba(40,34,70,${.12+.2*k})`):(r()<.5?`rgba(226,240,244,${.14+.2*k})`:`rgba(16,46,80,${.14+.2*k})`))}
  if(v==='night'){for(let i=0;i<110;i++){const k=Math.pow(r(),1.4),y=H+.5+k*40;R(g,262+(r()+r()-1)*(3+k*16)-k*2,y,1+k*4,.5,`rgba(214,224,250,${(.55-.3*k).toFixed(2)})`)}}
  if(v==='day'){/* whitecaps under a fresh north wind: short white crests, more of them near */
    for(let i=0;i<90;i++){const k=Math.pow(r(),.8),y=H+1+k*D,w=.8+k*3;R(g,r()*320,y,w,.5,'rgba(250,252,250,.75)');R(g,r()*320,y+.5,w*.6,.5,'rgba(200,220,236,.4)')}
    /* the wake: the ship's track runs straight back from her stern, and two arms of it spread from her quarters toward the horizon */
    const[sx]=geo.postFoot;for(const sd of[-1,1])for(let k=0;k<160;k++){const q=r(),z=14+q*q*240,x=sd*(1.4+(z-11)*.36)+(r()-.5)*(.8+z*.05),[X,Y]=geo.P(x,-1.1,z),w=(1+r()*3)*Math.min(1,30/z+.3);
      R(g,X-w/2,Y,w,.5,`rgba(240,248,248,${(.25+.45*r()*Math.min(1,40/z)).toFixed(2)})`)}
    for(let k=0;k<60;k++){const q=r(),z=14+q*q*200;const[x,y]=geo.P((r()-.5)*(1.6+z*.04),-1.1,z);R(g,x-1.5,y,2+r()*3,.5,'rgba(240,248,248,.5)')}
    pool(g,sx,H+3,40,3,'#e8f2f2',.25,'source-over')}}

/* ---- the parts of the deck, each painted in the variant's light ---- */
const dkPts=(geo,f)=>{const p=[];for(let i=0;i<geo.C.length;i++)p.push(...f(geo.C[i],geo.N[i]));return p};
/* the deck floor: planks that run fore and aft and follow the hull a little as she narrows; each plank its own tone and grain; the butt
   joints staggered, each one stopping inside its plank; worn paler down the middle; shaded along the foot of each bulwark */
function dkFloor(g,geo){const{P,s,b}=geo,L=geo.L,r=rng(16041),FL=dkPts(geo,([x,z])=>P(x,s(z),z)),floor=FL.concat([340,190,-20,190]);
  const W=z=>.42*b(z)+.58*DK.B,du=.205/DK.B,base=dkLit(geo,L.deck,[0,1,0]);
  clipTo(g,()=>poly(g,floor),()=>{R(g,-10,0,340,160,base);
    for(let k=-16;k<16;k++){const u0=(k+.5)*du,u1=u0+du,zs=[];for(let z=2;z<=DK.ZS+.2;z+=z<6?.5:.25)zs.push(z);
      const pl=zs.map(z=>P(u0*W(z),s(z),z)).flat().concat(zs.slice().reverse().map(z=>P(u1*W(z),s(z),z)).flat()),c=tint(base,(r()-.5)*.16+(Math.abs(k)<3?.05:0));
      poly(g,pl,c);
      clipTo(g,()=>poly(g,pl),()=>{for(let i=0;i<5;i++){const u=u0+du*(.15+r()*.7),za=2+r()*6,zb=za+1.5+r()*4,q=[];for(let z=za;z<zb;z+=.4)q.push(...P(u*W(z),s(z),z));
          if(q.length>3)stroke(g,q,r()<.5?rgba(tint(c,-.22),.5):rgba(tint(c,.14),.45),.5)}});
      /* the seam on its left: a dark line, and the lit lip of the next plank beside it */
      const sm=zs.map(z=>P(u0*W(z),s(z),z)).flat();stroke(g,sm,'rgba(30,18,10,.55)',.5);stroke(g,sm.map((v,i)=>i%2?v:v+.5),rgba(tint(c,.22),.3),.4);
      /* butt joints: staggered by the golden section from plank to plank, each one stopping short of the seams */
      const z0=2+((k*.618+.31)%1+1)%1*4.6;for(let z=z0;z<DK.ZS;z+=4.8){const a=P(u0*W(z)+.025,s(z),z),e=P(u1*W(z)-.025,s(z),z);
        if(e[0]-a[0]>2.2){R(g,a[0],a[1]-.25,e[0]-a[0],.5,'rgba(30,18,10,.5)');R(g,a[0],a[1]+.25,e[0]-a[0],.4,rgba(tint(c,.24),.35))}}}
    tex(g,'mott',.25,0,40,320,110,'overlay',.7);
    /* worn paler where people walk, down the middle */
    const m=[...P(-.9,0,3),...P(.9,0,3),...P(.5,0,8),...P(-.5,0,8)];comp(g,'soft-light',.3,()=>poly(g,m,'#fff4d8'));
    /* shade along the foot of the bulwarks, in steps inward */
    for(const[d,a]of[[.03,.32],[.1,.2],[.2,.12],[.34,.07]])stroke(g,dkPts(geo,([x,z],[nx,nz])=>P(x+nx*d,s(z),z+nz*d)),`rgba(20,12,16,${a})`,1.2);
    /* scuppers: low slots in the bulwark at the deck, where the water runs out */
  })}
/* the inner face of the bulwark all round, planked in three strakes that follow the sheer, each butt joint inside its own strake; the
   rail on it: its inner face and, where it lies below the eye, its lit top */
function dkBulwark(g,geo){const{P,s,r}=geo,C=geo.C,N=geo.N,rr=rng(16042),A='#8a6440',CAP=.1,
    at=(i,f,d)=>{const[x,z]=C[i],[nx,nz]=N[i];return P(x+nx*(d||0),s(z)+f,z+nz*(d||0))},
    face=(i0,i1,f0,f1)=>{const p=[];for(let i=i0;i<=i1;i++)p.push(...at(i,f0(i)));for(let i=i1;i>=i0;i--)p.push(...at(i,f1(i)));return p},
    H=i=>r(C[i][1])-CAP,n3=i=>{const[nx,nz]=N[i];return[nx,0,-nz]},M=C.length-1;
  /* each stretch of face is lit as its normal is turned: paint in short spans so the light follows the curve */
  for(let i=0;i<M;i++){const c=dkLit(geo,A,[N[i][0],0,N[i][1]]);poly(g,face(i,i+1,()=>-.02,H),c);poly(g,face(i,i+1,()=>-.02,H),c)}
  const all=face(0,M,()=>-.02,H);
  clipTo(g,()=>poly(g,all),()=>{
    const SF=[.36,.68];for(const f of SF){const p=[],q=[];for(let i=0;i<=M;i++){const h=H(i);p.push(...at(i,h*f));q.push(...at(i,h*f-.035))}
      stroke(g,p,'rgba(26,16,10,.55)',.5);stroke(g,q,'rgba(255,224,170,.18)',.4)}
    /* butt joints: along the bulwark at staggered places, each from seam to seam of its own strake only */
    for(let j=0;j<3;j++){const f0=j?SF[j-1]:0,f1=j<2?SF[j]:1;for(let i=4+j*6+(rr()*5|0);i<M-2;i+=15+(rr()*6|0)){const h=H(i),a=at(i,h*f0+.04),e=at(i,h*f1-.04);
        if(Math.abs(e[1]-a[1])>1.2)stroke(g,[a[0],a[1],e[0],e[1]],'rgba(26,16,10,.3)',.5)}}
    /* the grain: long streaks that run along each strake, lighter and darker, none of them strong */
    for(let j=0;j<3;j++){const f0=j?SF[j-1]:0,f1=j<2?SF[j]:1;for(let n=0;n<34;n++){const f=f0+(f1-f0)*(.15+.7*rr()),i0=rr()*(M-4)|0,len=4+(rr()*14|0),p=[];
        for(let i=i0;i<=Math.min(M,i0+len);i++)p.push(...at(i,H(i)*f));if(p.length>3)stroke(g,p,rr()<.5?'rgba(24,14,8,.2)':'rgba(255,226,180,.12)',.5)}}
    tex(g,'mott',.12,-10,30,340,120,'overlay',.7);
    /* shade under the rail, and along the deck */
    for(const[d,a]of[[0,.34],[.06,.18]]){const p=[];for(let i=0;i<=M;i++)p.push(...at(i,H(i)-d));stroke(g,p,`rgba(20,12,10,${a})`,1)}
    const q=[];for(let i=0;i<=M;i++)q.push(...at(i,.02));stroke(g,q,'rgba(20,12,10,.4)',1.4)});
  /* the scuppers */
  for(let i=4;i<M-3;i+=7){const[x,z]=C[i];if(z>8.4)continue;const a=at(i,.03),e=at(i+1,.03),hh=Math.max(.5,150*.06/z);poly(g,[a[0],a[1],e[0],e[1],e[0],e[1]-hh,a[0],a[1]-hh],'#1a100a')}
  /* the rail: its inner face, and its top where it lies below the eye */
  for(let i=0;i<M;i++){const cf=dkLit(geo,'#7a5636',[N[i][0],0,N[i][1]]),p=[...at(i,H(i),.04),...at(i+1,H(i+1),.04),...at(i+1,H(i+1)+CAP,.04),...at(i,H(i)+CAP,.04)];poly(g,p,cf)}
  for(let i=0;i<M;i++){const y0=s(C[i][1])+r(C[i][1]),y1=s(C[i+1][1])+r(C[i+1][1]);if(Math.max(y0,y1)>geo.E-.03)continue;
    poly(g,[...at(i,H(i)+CAP,.04),...at(i+1,H(i+1)+CAP,.04),...at(i+1,H(i+1)+CAP,-.1),...at(i,H(i)+CAP,-.1)],dkLit(geo,'#9a7448',[0,1,0]))}
  const top=[];for(let i=0;i<=M;i++){const y=s(C[i][1])+r(C[i][1]);top.push(...at(i,H(i)+CAP,y<geo.E-.03?-.1:.04))}
  const tops=[];let cur=[];for(let i=0;i<=M;i++){const y=s(C[i][1])+r(C[i][1]);if(y<geo.E-.03)cur.push(top[2*i],top[2*i+1]);else{if(cur.length>2)tops.push(cur);cur=[]}}if(cur.length>2)tops.push(cur);
  for(const p of tops)stroke(g,p,dkLit(geo,'#f0d0a0',[0,1,0],1.1),.5);
  const und=[];for(let i=0;i<=M;i++)und.push(...at(i,H(i)-.005,.04));stroke(g,und,'rgba(20,12,8,.45)',.5)}
/* the stern post: it rises from behind the top of the stern, where the stern stands above the horizon, sweeps up, and turns over at
   its head into a curl, seen a little from the side. A short staff stands on the curl for the pennant; under the curl, a hook for the
   lamp. Its foot never meets the horizon: the top of the stern hides it. */
function dkPost(g,geo){const[x,y]=geo.postFoot,A='#7e5a36',ls=geo.L.L[0]>0?1:-1,lit=dkLit(geo,A,[ls,.3,-.5]),mid=dkLit(geo,A,[0,.2,-1]),sh=dkLit(geo,A,[-ls,0,-.3]);
  /* its line: the shaft, and then one turn of the scroll, its radius closing in as it rolls up, the timber thinning with it */
  const CL=[];for(let k=0;k<=14;k++){const t=k/14;CL.push([x+.6*t*t,y+3-28*t,4.6-1.4*t])}
  const cx=x+4.8,cy=y-25;for(let k=1;k<=26;k++){const t=k/26,a=Math.PI*(1+2*t),R=4.2-2.7*t;CL.push([cx+R*Math.cos(a),cy+R*Math.sin(a),3.2-1.8*t])}
  /* the pennant's staff, standing on the top of the scroll; it ends at the staff's top, and nothing crosses it */
  const[px,py]=geo.pennant;poly(g,[px-.45,cy-3.2,px+.45,cy-3.2,px+.3,py,px-.3,py],tint(sh,.1));R(g,px-.5,py-.4,1,.5,tint(lit,.2));
  /* the timber in three passes: its shade, its body turned a little to the light, and the lit arris */
  const pass=(c,k,dx)=>{g.strokeStyle=c;g.lineCap='round';g.lineJoin='round';for(let i=1;i<CL.length;i++){g.lineWidth=Math.max(.5,CL[i][2]*k);g.beginPath();g.moveTo(CL[i-1][0]+dx,CL[i-1][1]);g.lineTo(CL[i][0]+dx,CL[i][1]);g.stroke()}g.lineCap='butt'};
  pass(sh,1,0);pass(mid,.72,ls*.45);pass(rgba(lit,.85),.26,ls*1.15);
  /* the grain along it, and where the scroll's turn lies over the shaft, a line of shade */
  for(const[dx,a]of[[-.9,.3],[.7,.22]])stroke(g,CL.slice(1,13).map(p=>[p[0]+dx*p[2]/4.6,p[1]]).flat(),a>.25?rgba(tint(sh,-.3),a):rgba(tint(lit,.2),a),.4);
  stroke(g,[cx-1.4,cy+1.6,cx+.2,cy+2.4,cx+1.6,cy+1.8],rgba(tint(sh,-.4),.7),.5);
  /* the hook under the scroll for the lamp */
  stroke(g,[cx+1.6,cy+3.4,cx+1.8,cy+4.6,cx+1,cy+5],tint(sh,-.2),.5)}
/* the steering oars: of each, the loom where it rises above the rail at the quarter, and the tiller set into its head, reaching
   forward and inboard. They meet at a corner, and nothing of either crosses the other or the horizon. */
function dkOars(g,geo,part){const{P}=geo;
  for(const o of geo.OAR){const h=P(...o.head),f=P(...o.foot),t=P(...o.tiller),sd=Math.sign(o.head[0]);
    if(part==='loom'){/* the loom, leaning inboard from where it comes up past the rail to its head; below the rail it is hidden */
      const dx=h[0]-f[0],dy=h[1]-f[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,w0=1.9,w1=1.5;
      poly(g,[f[0]+nx*w0,f[1]+ny*w0,h[0]+nx*w1,h[1]+ny*w1,h[0]-nx*w1,h[1]-ny*w1,f[0]-nx*w0,f[1]-ny*w0],dkLit(geo,'#6a4a2c',[-sd*.6,.6,-.5]));
      const lt=geo.L.L[0]*sd<0?-1:1;stroke(g,[f[0]+nx*w0*.6*lt,f[1]+ny*w0*.6*lt,h[0]+nx*w1*.55*lt,h[1]+ny*w1*.55*lt],rgba(dkLit(geo,'#e8bc84',[-sd,.6,-.5]),.8),.5)}
    else{/* the tiller, set into the loom's head and reaching forward and inboard; the head is squared, no wider than the loom */
      const dx=t[0]-h[0],dy=t[1]-h[1],l=Math.hypot(dx,dy),nx=-dy/l*.7,ny=dx/l*.7;
      poly(g,[h[0]+nx,h[1]+ny,t[0]+nx*.8,t[1]+ny*.8,t[0]-nx*.8,t[1]-ny*.8,h[0]-nx,h[1]-ny],dkLit(geo,'#7a5634',[0,.6,-.6]));
      stroke(g,[h[0]-nx,h[1]-ny,t[0]-nx*.8,t[1]-ny*.8],rgba(dkLit(geo,'#f0c890',[0,1,0]),.8),.45);
      poly(g,[h[0]-1.5,h[1]-1.3,h[0]+1.5,h[1]-1.3,h[0]+1.5,h[1]+1.2,h[0]-1.5,h[1]+1.2],dkLit(geo,'#5a3e24',[-sd*.5,.5,-.7]));R(g,h[0]-1.5,h[1]-1.3,3,.5,dkLit(geo,'#d0a06a',[0,1,0]))}}}
/* a box seen from the viewer: its front, its top (it is lower than the eye) and the side turned to him */
function dkBox(geo,[x0,x1,z0,z1,h]){const{P}=geo;return{
  front:[...P(x0,0,z0),...P(x1,0,z0),...P(x1,h,z0),...P(x0,h,z0)],top:[...P(x0,h,z0),...P(x1,h,z0),...P(x1,h,z1),...P(x0,h,z1)],
  side:x0>geo.cam?[...P(x0,0,z0),...P(x0,h,z0),...P(x0,h,z1),...P(x0,0,z1)]:x1<geo.cam?[...P(x1,0,z0),...P(x1,h,z0),...P(x1,h,z1),...P(x1,0,z1)]:null,
  sideN:x0>geo.cam?[-1,0,0]:[1,0,0]}}
/* the chest with the gift, the same chest as on the quay of Cenchreae: cedar boards, the lid shut, rope handles at its ends, and at the
   lid's edge two knots of cord with their seals of clay. Nothing is tied across it. */
function dkChest(g,geo){const B=geo.things.chest,f=dkBox(geo,B),W='#6b492c',{P}=geo,[x0,x1,z0,z1,h]=B,r=rng(16061);
  const cF=dkLit(geo,W,[0,0,-1]),cT=dkLit(geo,'#8a643c',[0,1,0]),cS=dkLit(geo,'#7a5636',f.sideN);
  if(f.side)poly(g,f.side,cS);poly(g,f.front,cF);poly(g,f.top,cT);
  /* cedar boards laid lengthwise on every face, each with its own tone and a quiet grain along it; no joint crosses a board */
  const boards=(face,n,c,lo,hi)=>clipTo(g,()=>poly(g,face),()=>{for(let i=0;i<n;i++){const a=i/n,b=(i+1)/n,q=(u,v)=>[face[0]+(face[2]-face[0])*u+(face[6]-face[0])*v,face[1]+(face[3]-face[1])*u+(face[7]-face[1])*v],
      pts=[...q(0,a),...q(1,a),...q(1,b),...q(0,b)];poly(g,pts,tint(c,(r()-.5)*.12));
      for(let k=0;k<3;k++){const v=a+(b-a)*(.2+.6*r()),u0=r()*.5,u1=u0+.3+r()*.4;stroke(g,[...q(u0,v),...q(Math.min(1,u1),v)],r()<.5?rgba(tint(c,-.25),.5):rgba(tint(c,.18),.4),.4)}
      if(i){stroke(g,[...q(0,a),...q(1,a)],'rgba(24,14,8,.55)',.5)}}});
  boards(f.front,3,cF);boards(f.top,2,cT);if(f.side)boards(f.side,3,cS);
  const lid=P(x0,h-.1,z0),lid1=P(x1,h-.1,z0);R(g,lid[0],lid[1],lid1[0]-lid[0],.6,'#1c120c');
  stroke(g,[f.front[6],f.front[7],f.front[4],f.front[5]],dkLit(geo,'#fff0c8',[0,1,-.3]),.5);if(f.side)stroke(g,[f.side[2],f.side[3],f.side[4],f.side[5]],dkLit(geo,'#f0d8a8',[0,1,0]),.5);
  ao(g,f.front[0],f.front[1]-2.6,f.front[2]-f.front[0],2.6,'b',.3,'#0c0808');
  /* a rope handle on the end turned to the viewer */
  if(f.side){const m=P(x0,h*.62,(z0+z1)/2),a=P(x0,h*.62,z0+.1),e=P(x0,h*.62,z1-.1);stroke(g,[a[0],a[1],m[0],m[1]+1.6,e[0],e[1]],'#d2b67c',.6)}
  /* the two knots at the lid's edge, each with its two seals of clay on short ends that hang aslant */
  for(const u of[.3,.72]){const k=P(x0+(x1-x0)*u,h-.12,z0);R(g,k[0]-1,k[1],2,1.5,'#d2b67c');stroke(g,[k[0]-.4,k[1]+1.5,k[0]-1.8,k[1]+3.6],'#c8ac70',.5);stroke(g,[k[0]+.4,k[1]+1.5,k[0]+1.8,k[1]+4.6],'#c8ac70',.5);
    R(g,k[0]-3,k[1]+3,2,1.5,dkLit(geo,'#b0563a',[0,0,-1]));R(g,k[0]+1,k[1]+4.4,2,1.5,dkLit(geo,'#b8603e',[0,0,-1]))}
  return f.front.concat(f.top)}
/* the deck shelter: goat-hair cloth on a light frame of poles, low enough that whoever stands behind it is seen over it. Its front is
   open, the flaps drawn aside; its cloth is woven in long strips sewn together, and the seams run one way only, along it. Poles stand
   at its corners only; the two front rafters meet at its peak and stop there. */
function dkShelter(g,geo,cut){const{P}=geo,[x0,x1,z0,z1,h]=geo.things.shelter,ev=.9,xm=(x0+x1)/2,
    fl=P(x0,0,z0),fr=P(x1,0,z0),el=P(x0,ev,z0),er=P(x1,ev,z0),ap=P(xm,h,z0),bl=P(x0,ev,z1),br=P(x1,ev,z1),bp=P(xm,h,z1),
    roofL=[...ap,...el,...bl,...bp],roofR=[...ap,...bp,...br,...er],front=[...fl,...fr,...er,...ap,...el];
  if(cut){poly(g,front,'#000');poly(g,roofL,'#000');poly(g,roofR,'#000');return}
  const C='#3c3028',sh=dkLit(geo,C,[0,0,-1]),RL=dkLit(geo,C,[-.6,.8,0]),RR=dkLit(geo,C,[.6,.8,0]);
  poly(g,roofL,RL);poly(g,roofR,RR);
  /* the strips of the roof, sewn along the ridge's run */
  for(const[side,c]of[[x0,RL],[x1,RR]])for(const u of[.3,.62]){const xa=xm+(side-xm)*u,ya=h+(ev-h)*u,a=P(xa,ya,z0),e=P(xa,ya,z1);
    stroke(g,[a[0],a[1],e[0],e[1]],rgba(tint(c,-.4),.7),.5);stroke(g,[a[0],a[1]+.5,e[0],e[1]+.5],rgba(tint(c,.25),.35),.4)}
  clipTo(g,()=>{poly(g,roofL);poly(g,roofR)},()=>{tex(g,'mott',.4,el[0]-2,bp[1]-2,er[0]-el[0]+4,el[1]-bp[1]+4,'overlay',.7);tex(g,'grain',.3,el[0]-2,bp[1]-2,er[0]-el[0]+4,el[1]-bp[1]+4,'overlay',.5)});
  /* the ridge: a lit line along the top, from the peak back */
  stroke(g,[ap[0],ap[1],bp[0],bp[1]],dkLit(geo,'#9a8468',[0,1,0]),.6);
  /* the front: the gable of cloth, and the opening under it with the flaps drawn aside; inside, the dark and a rolled blanket */
  poly(g,front,sh);
  clipTo(g,()=>poly(g,front),()=>{for(const v of[.3,.55,.78]){const a=P(x0,ev*v+.04,z0),e=P(x1,ev*v+.04,z0);stroke(g,[a[0],a[1],e[0],e[1]],'rgba(255,236,200,.07)',.5);stroke(g,[a[0],a[1]+.5,e[0],e[1]+.5],'rgba(0,0,0,.2)',.5)}tex(g,'grain',.3,el[0]-1,ap[1]-1,er[0]-el[0]+2,fl[1]-ap[1]+2,'overlay',.5);tex(g,'mott',.4,el[0]-1,ap[1]-1,er[0]-el[0]+2,fl[1]-ap[1]+2,'overlay',.7);ao(g,el[0]-1,fl[1]-4,er[0]-el[0]+2,4,'b',.3,'#0c0808')});
  const dl=P(x0+.3,0,z0),dr=P(x1-.3,0,z0),dt=P(xm,h-.14,z0),ml=P(x0+.5,ev*.62,z0),mr=P(x1-.5,ev*.62,z0),
    op=[...dl,...dr,mr[0]+.6,mr[1],dt[0]+1.4,dt[1]+3,...dt,dt[0]-1.4,dt[1]+3,ml[0]-.6,ml[1]];
  poly(g,op,geo.v==='night'?'#0a0806':'#16100c');
  clipTo(g,()=>poly(g,op),()=>{const q=P(xm,0,z1);g.fillStyle=lg(g,0,dt[1],0,dl[1],['rgba(0,0,0,0)','rgba(60,44,30,.5)']);g.fillRect(dl[0],dt[1],dr[0]-dl[0],dl[1]-dt[1]);
    const ra=P(x0+.5,0,z0+.8),rb=P(x1-.6,0,z0+.8),rh=150*.2/(z0+.8);g.beginPath();g.moveTo(ra[0]+rh*.4,ra[1]);g.lineTo(rb[0]-rh*.4,rb[1]);g.quadraticCurveTo(rb[0]+rh*.2,rb[1]-rh*.5,rb[0]-rh*.4,rb[1]-rh);g.lineTo(ra[0]+rh*.4,ra[1]-rh);g.quadraticCurveTo(ra[0]-rh*.2,ra[1]-rh*.5,ra[0]+rh*.4,ra[1]);g.closePath();
    g.fillStyle=lg(g,0,ra[1]-rh,0,ra[1],[dkLit(geo,'#8a6e52',[0,.6,-.8],.5),dkLit(geo,'#5a4634',[0,0,-1],.4)]);g.fill()});
  /* the flaps, gathered at each side of the opening */
  for(const sd of[-1,1]){const m=sd<0?ml:mr,d=sd<0?dl:dr,ed=[dt[0]+sd*.4,dt[1]+1,dt[0]+sd*1.6,dt[1]+3.4,m[0]-sd*.6,m[1],d[0]+sd*.4,d[1]],
      fp=[dt[0]+sd*.4,dt[1]+1,m[0]+sd*2.6,m[1]-1.4,m[0]+sd*3.4,m[1]+.6,d[0]+sd*3.2,d[1],d[0]+sd*.4,d[1],m[0]-sd*.6,m[1],dt[0]+sd*1.6,dt[1]+3.4];
    poly(g,fp,dkLit(geo,'#4a3c32',[sd*.4,0,-1]));stroke(g,ed,rgba(dkLit(geo,'#a89070',[0,.3,-1]),.6),.5);
    /* the folds of the gathered flap, and its tie to the corner pole */
    for(const k of[.4,.7])stroke(g,[m[0]+sd*(1+k*1.6),m[1]-.6,d[0]+sd*(.8+k*2.2),d[1]-.4],'rgba(10,6,4,.45)',.5);
  }
  /* the frame: a pole at each front corner, and the two rafters to the peak, lit along the top */
  const pc=dkLit(geo,'#9a7a52',[0,.4,-.8]);for(const[a,e]of[[fl,el],[fr,er]])poly(g,[a[0]-.6,a[1],a[0]+.6,a[1],e[0]+.6,e[1],e[0]-.6,e[1]],pc);
  stroke(g,[el[0],el[1],ap[0],ap[1],er[0],er[1]],dkLit(geo,'#b89468',[0,.7,-.6]),.8);
}
/* the rack of jars by the left bulwark: a low frame at their feet, each jar standing in it with its body above; nothing runs across a
   jar. Its mouth is stopped and sealed, and seen as a slot. */
function dkRack(g,geo){const{P}=geo,[x0,x1,z0,z1,h]=geo.things.rack,n=5,J='#a6643c';
  /* the jars, from the stern toward the viewer */
  for(let i=n-1;i>=0;i--){const z=z0+(z1-z0)*(i+.5)/n,x=(x0+x1)/2,ft=P(x,.06,z),tp=P(x,h,z),u=DK.F/z,w=.2*u,H=ft[1]-tp[1],cx=ft[0];
    const S=[];const hw=t=>t<.06?.22:t<.14?.24+(t-.06)*1.6:t<.32?.38+.62*Math.sin((t-.14)/.18*1.5708)*.62:t<.8?1-.3*Math.pow((t-.32)/.48,1.6):.7*(1-(t-.8)/.2)+.1;
    for(let k=0;k<=16;k++){const t=k/16;S.push(cx-hw(t)*w,tp[1]+t*H)}for(let k=16;k>=0;k--){const t=k/16;S.push(cx+hw(t)*w,tp[1]+t*H)}
    poly(g,S);g.fillStyle=lg(g,cx-w,0,cx+w,0,geo.L.L[0]>0?[dkLit(geo,J,[-1,0,-.4]),dkLit(geo,J,[0,0,-1]),dkLit(geo,J,[1,.2,-.4])]:[dkLit(geo,J,[-1,.2,-.4]),dkLit(geo,J,[0,0,-1]),dkLit(geo,J,[1,0,-.4])]);g.fill();
    clipTo(g,()=>poly(g,S),()=>{tex(g,'mott',.3,cx-w,tp[1],w*2,H,'overlay',.6);ao(g,cx-w,ft[1]-H*.3,w*2,H*.3,'b',.3,'#140c08')});
    /* handles at the shoulders, and the stopper: a slot of pale clay */
    for(const sd of[-1,1])stroke(g,[cx+sd*.24*w,tp[1]+H*.07,cx+sd*.5*w,tp[1]+H*.12,cx+sd*.56*w,tp[1]+H*.26],dkLit(geo,'#8a5032',[sd,.3,-.5]),.5);
    R(g,cx-.22*w,tp[1]-.4,.44*w,1,dkLit(geo,'#c8b898',[0,1,0]))}
  /* the frame at their feet: a sill along the front and the back, low on the deck */
  const sa=P(x1+.02,0,z0),sb=P(x1+.02,0,z1),ta=P(x1+.02,.16,z0),tb=P(x1+.02,.16,z1);
  poly(g,[...sa,...sb,...tb,...ta],dkLit(geo,'#7a5636',[1,0,0]));stroke(g,[ta[0],ta[1],tb[0],tb[1]],dkLit(geo,'#e0b47a',[0,1,0]),.5);
  const fa=P(x0,0,z0),fb=P(x1+.02,0,z0),fc=P(x1+.02,.16,z0),fd=P(x0,.16,z0);poly(g,[...fa,...fb,...fc,...fd],dkLit(geo,'#7a5636',[0,0,-1]));stroke(g,[fd[0],fd[1],fc[0],fc[1]],dkLit(geo,'#e8c08a',[0,1,0]),.5)}
/* bales of cloth sewn into sacking, by the right bulwark: two on the deck and one on them. Their corners are gathered into ears;
   nothing is tied across them. */
function dkPillow(g,p,k){/* a four-sided face whose sides bow outward by k, as sacking stuffed full does */
  const cx=(p[0]+p[2]+p[4]+p[6])/4,cy=(p[1]+p[3]+p[5]+p[7])/4;g.beginPath();
  for(let i=0;i<4;i++){const a=[p[2*i],p[2*i+1]],b=[p[(2*i+2)%8],p[(2*i+3)%8]],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=mx-cx,dy=my-cy,l=Math.hypot(dx,dy)||1;
    if(!i)g.moveTo(a[0],a[1]);g.quadraticCurveTo(mx+dx/l*k,my+dy/l*k,b[0],b[1])}g.closePath()}
function dkBale(g,geo,[x0,x1,z0,z1],y0,y1,c){const{P}=geo,fr=[...P(x0,y0,z0),...P(x1,y0,z0),...P(x1,y1,z0),...P(x0,y1,z0)],
    tp=[...P(x0,y1,z0),...P(x1,y1,z0),...P(x1,y1,z1),...P(x0,y1,z1)],sd=[...P(x0,y0,z1),...P(x0,y0,z0),...P(x0,y1,z0),...P(x0,y1,z1)],
    k=Math.max(.6,(fr[2]-fr[0])*.05),cF=dkLit(geo,c,[0,0,-1]),cT=dkLit(geo,c,[0,1,0]),cS=dkLit(geo,c,[-1,0,0]),side=x0>geo.cam;
  /* the side turned to the viewer, the top, and the front, each bowed and shaded round as a stuffed sack is */
  if(side){dkPillow(g,sd,k*.7);g.fillStyle=lg(g,sd[0],0,sd[4],0,[tint(cS,-.1),cS,tint(cS,.08)]);g.fill()}
  dkPillow(g,tp,k*.5);g.fillStyle=lg(g,0,tp[5],0,tp[1],[tint(cT,-.08),cT,tint(cT,.1)]);g.fill();
  dkPillow(g,fr,k);g.fillStyle=lg(g,0,fr[5],0,fr[1],[tint(cF,.1),cF,tint(cF,-.22)]);g.fill();
  clipTo(g,()=>dkPillow(g,fr,k),()=>{const w=fr[2]-fr[0],h=fr[1]-fr[7];
    pool(g,(fr[0]+fr[2])/2,(fr[1]+fr[7])/2,w*.45,h*.4,tint(cF,.3),.25,'source-over');
    /* the sacking drawn tight from the corners, and a seam sewn across its face in short stitches, one way only */
    stroke(g,[fr[6]+w*.08,fr[7]+h*.1,fr[0]+w*.3,fr[7]+h*.5,fr[0]+w*.2,fr[1]-h*.08],'rgba(20,14,24,.22)',.6);
    stroke(g,[fr[4]-w*.08,fr[5]+h*.12,fr[2]-w*.28,fr[5]+h*.52,fr[2]-w*.18,fr[3]-h*.08],'rgba(20,14,24,.18)',.6);
    for(let x=fr[0]+w*.1;x<fr[2]-w*.1;x+=1.8){const yy=fr[7]+h*.62;stroke(g,[x,yy+.4,x+.7,yy-.4],rgba(tint(cF,.4),.4),.5)}
    tex(g,'grain',.18,fr[0]-2,fr[7]-2,w+4,h+4,'overlay',.5);ao(g,fr[0]-2,fr[1]-h*.25,w+4,h*.25,'b',.28,'#1a1420')});
  /* the lit edge where the top turns into the front, and the ears gathered at the top corners */
  g.strokeStyle=rgba(dkLit(geo,'#fff0c8',[0,1,-.3]),.7);g.lineWidth=.5;g.beginPath();g.moveTo(fr[6]+1,fr[7]);g.quadraticCurveTo((fr[6]+fr[4])/2,fr[7]-k,fr[4]-1,fr[5]);g.stroke();
  for(const[px,py,sg]of[[fr[6],fr[7],-1],[fr[4],fr[5],1]])poly(g,[px-sg*.6,py+1.4,px+sg*1.3,py-1.3,px-sg*2.4,py+.1],dkLit(geo,tint(c,.2),[0,1,-.3]))}
function dkBales(g,geo){const[x0,x1,z0,z1,h]=geo.things.bales,zm=z0+(z1-z0)*.48;
  dkBale(g,geo,[x0,x1,zm+.04,z1],0,.5,'#86693f');dkBale(g,geo,[x0+.04,x1-.02,z0,zm],0,.48,'#7c6040');dkBale(g,geo,[x0+.12,x1-.08,z0+.3,z1-.4],.48,h,'#927448')}
/* a coil of rope lying on the deck, three turns high; its eye a slot */
function dkCoil(g,geo){const{P}=geo,[x0,x1,z0,z1]=geo.things.coil,c=P((x0+x1)/2,0,(z0+z1)/2),u=DK.F/((z0+z1)/2),rx=(x1-x0)/2*u,ry=rx*.32,R0='#857048';
  comp(g,'multiply',.45,()=>oval(g,c[0]+.8,c[1]+.6,rx+1.4,ry+1,'#3a3050'));
  for(let k=2;k>=0;k--)oval(g,c[0],c[1]-k*.9*u/36,rx,ry,dkLit(geo,k?tint(R0,-.3):R0,[0,1,-.3]));
  g.lineWidth=.5;g.strokeStyle='rgba(50,36,20,.5)';for(const q of[.82,.64,.46]){g.beginPath();g.ellipse(c[0],c[1]-1.8*u/36,rx*q,ry*q,0,0,6.2832);g.stroke()}
  R(g,c[0]-rx*.3,c[1]-1.8*u/36-.5,rx*.6,1,'#3a2c1c');g.strokeStyle=dkLit(geo,'#f8ecc4',[0,1,0]);g.beginPath();g.ellipse(c[0],c[1]-1.8*u/36,rx,ry,0,3.4,6);g.stroke();
  const e=P(x1+.3,0,z0-.1);stroke(g,[c[0]+rx*.9,c[1]+.4,e[0],e[1]],dkLit(geo,R0,[0,1,-.3]),.7)}
/* the lamp, at night: a small clay lamp in a hanger, hung from the curl of the stern post by two cords that part upward. It hangs above
   every head the deck can show. */
function dkLamp(g,geo){const[lx,ly]=geo.lamp,[x,y]=geo.postFoot;stroke(g,[lx-1.1,ly-.6,x+1.9,y-20.4],'#8a7a5a',.4);stroke(g,[lx+1.1,ly-.6,x+6.6,y-20.4],'#8a7a5a',.4);
  poly(g,[lx-1.6,ly-.6,lx+1.6,ly-.6,lx+1.1,ly+1,lx-1.1,ly+1],'#7a4a2a');R(g,lx-1.6,ly-.6,3.2,.5,'#c08050')}
/* paintDeckLayer: everything of the ship, on a layer of its own over the sky and sea (transparent where they show) */
function paintDeckLayer(g,geo){dkPost(g,geo);dkOars(g,geo,'loom');dkFloor(g,geo);dkBulwark(g,geo);
  /* the light of the evening: the left bulwark throws its shade far across the deck, and whatever stands in it is lit by the sky alone */
  let shd=geo;if(geo.v==='eve'){const p=[],q=[];for(let i=0;i<geo.C.length/2;i++){const[x,z]=geo.C[i];if(z>9.6)break;p.push(...dkCast(geo,x,geo.s(z)+geo.r(z),z));q.push(...geo.P(x,geo.s(z),z))}
    clipTo(g,()=>poly(g,dkPts(geo,([x,z])=>geo.P(x,geo.s(z),z)).concat([340,190,-20,190])),()=>dkShade(g,geo,q.concat(ptsBack(p)),1));
    shd={...geo,L:{...geo.L,sun:[0,0,0],kx:0,kz:0}}}
  dkOars(g,geo,'tiller');
  const T=geo.things;
  /* the soft shade where each thing meets the deck */
  for(const k of['rack','bales','shelter','chest']){if(k==='chest'&&!geo.chest)continue;const[x0,x1,z0]=T[k],a=geo.P(x0,0,z0),e=geo.P(x1,0,z0);
    comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,0,a[1]-1.2,0,a[1]+1.4,['rgba(40,30,50,0)','rgba(40,30,50,1)','rgba(40,30,50,0)']);g.fillRect(a[0]-1,a[1]-1.2,e[0]-a[0]+2,2.6)})}
  dkBoxShadow(g,geo,T.rack,.9);dkRack(g,shd);dkBoxShadow(g,geo,T.bales,.9);dkBales(g,geo);
  dkBoxShadow(g,geo,[T.shelter[0],T.shelter[1],T.shelter[2],T.shelter[3],1.1],.9);dkShelter(g,geo);
  if(geo.chest){dkBoxShadow(g,geo,T.chest,.9);dkChest(g,geo)}
  dkCoil(g,shd);
  if(geo.v==='night')dkLamp(g,geo)}
/* the lamp's light at night, on the deck layer: the layer is painted again in a plain white light and multiplied by the lamp's pool,
   and that is added to the moonlit layer, so the lamp lights each thing in its own color */
function lampPass(g,geo,w,h){const[a,ag]=mk(w*HR,h*HR);ag.scale(HR,HR);const white={...geo,L:{amb:[.69,.69,.69],sun:[0,0,0],L:[0,1,0],kx:0,kz:0,deck:geo.L.deck}};paintDeckLayer(ag,white);
  const[m,mg]=mk(w*HR,h*HR);mg.scale(HR,HR);mg.fillStyle='#000';mg.fillRect(0,0,w,h);const[lx,ly]=geo.lamp;
  pool(mg,lx,ly+34,150,48,'#ffb060',1);pool(mg,lx,ly+26,80,26,'#ffc880',.8);pool(mg,lx,ly+12,40,14,'#ffd8a0',.6);
  mg.setTransform(1,0,0,1,0,0);mg.globalCompositeOperation='destination-in';mg.drawImage(a,0,0);
  ag.setTransform(1,0,0,1,0,0);ag.globalCompositeOperation='multiply';ag.drawImage(m,0,0);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='lighter';g.drawImage(a,0,0);g.restore()}
function deckLayer(geo){const[c,cg]=mk(320*HR,144*HR);cg.scale(HR,HR);paintDeckLayer(cg,geo);if(geo.v==='night')lampPass(cg,geo,320,144);return c}
/* paintDeck: the whole picture, for the room's backdrop */
function paintDeck(g,o){const geo=deckGeo(o);(o.sky||dkSky)(g,geo);(o.sea||dkSea)(g,geo);
  const c=deckLayer(geo);g.save();g.setTransform(1,0,0,1,0,0);g.drawImage(c,0,0);g.restore()}
/* the deck laid again over the moving sea: the layer, dithered as the backdrop is (finish), cached per variant */
const DOV=new Map();
function deckOverlay(o){const k=(o.variant||'day')+(o.chest?'c':'')+(o.hz||'');let c=DOV.get(k);if(c)return c;
  c=deckLayer(deckGeo(o));finish(c,c.getContext('2d'),o.q||12);DOV.set(k,c);return c}
/* the pennant on the stern post: a strip of dyed wool streaming from the staff's top with the wind, limp when it drops */
function dkPennant(g,geo,t){const w=geo.o.wind||{a:20,s:.7},a=(w.a||0)*Math.PI/180,s=clamp(w.s==null?.7:w.s,0,1),[ax,ay]=geo.pennant,u=DK.F/(DK.ZS+.1),
    L=.95*u,n=10,top=[],bot=[],sx=Math.sin(a),fore=Math.cos(a);
  /* sideways it shows its length; toward the viewer or away it is foreshortened; when the wind drops it hangs */
  for(let i=0;i<=n;i++){const k=i/n,fl=Math.sin(k*5.2-t/(150-s*70))*(.6+1.2*s)*k,len=L*k,
      dx=sx*len*s+fl*Math.abs(fore)*.3,dy=len*(1-s)*.9+fore*len*s*.12+fl*(.4+.6*Math.abs(sx)),hw=.09*u*(1-k*.85);
    top.push(ax+dx,ay+dy-hw);bot.push(ax+dx,ay+dy+hw)}
  const pg=top.concat(ptsBack(bot));poly(g,pg,geo.v==='night'?'#3a1c1c':geo.v==='eve'?'#b8402c':'#a83a28');stroke(g,top,geo.v==='night'?'rgba(160,140,170,.4)':'rgba(255,200,170,.6)',.4)}
/* draw: what moves, under the deck, and then the deck over it */
function drawDeck(g,t,o){const geo=deckGeo(o),H=geo.hz,v=geo.v,r=rng(16051);
  /* glints and crests on the sea */
  const n=v==='night'?40:70;for(let i=0;i<n;i++){const d=Math.pow(r(),1.3),y=H+.8+d*60,sp=r()*6.28,per=900+r()*1500,k=Math.sin(t/per*6.28+sp),x=(r()*340-10+t*(v==='day'?.004:.0015)*(1+d*2))%330-5;
    if(k>.4){const a=((k-.4)*1.6).toFixed(2);R(g,x,y,1+d*5,.5,v==='night'?(Math.abs(x-262)<20+d*40?`rgba(230,236,250,${a})`:`rgba(140,160,210,${a*.4})`):v==='eve'?`rgba(255,224,180,${a*.6})`:`rgba(255,255,250,${a})`)}}
  if(v==='day'){for(let i=0;i<40;i++){const k=((t/5200+i/40)%1),z=16+Math.pow(k,1.6)*160,sd=i%2?1:-1,[x,y]=geo.P(sd*(1.4+(z-11)*.36)+(r()-.5)*(.6+z*.04),-1.1,z);R(g,x-1,y,1.5+r()*2,.5,`rgba(246,250,250,${(.6*Math.sin(k*Math.PI)).toFixed(2)})`)}}
  g.drawImage(deckOverlay(o),0,0,320,144);
  /* the pennant, and the shelter's cloth stirring in the wind by day */
  if(typeof o.pennant==='function')o.pennant(g,geo.pennant[0],geo.pennant[1],t,geo);else if(o.pennant!==false)dkPennant(g,geo,t);
  if(v==='day'){const{P}=geo,[x0,x1,z0,z1,h]=geo.things.shelter,ev=.9,xm=(x0+x1)/2;
    for(const sd of[x0,x1]){const rf=[...P(xm,h,z0),...P(sd,ev,z0),...P(sd,ev,z1),...P(xm,h,z1)];
      clipTo(g,()=>poly(g,rf),()=>{for(let i=0;i<3;i++){const k=((t/2600+i/3)%1),zz=z0+(z1-z0)*k,a=P(xm,h,zz),e=P(sd,ev,zz);stroke(g,[a[0],a[1],e[0],e[1]],`rgba(255,240,210,${(.1*Math.sin(k*Math.PI)).toFixed(3)})`,1.4)}})}}
  if(v==='night'){const[lx,ly]=geo.lamp;flame(g,lx-.5,ly-1,t)}}
/* the room's light for the figures: their color, the sun's direction for their shadows, and at night the lamp */
function deckLight(o){const geo=deckGeo(o),v=geo.v;
  if(v==='night')return{amb:'#4c5274',lamps:[[geo.lamp[0],geo.lamp[1],150,'#8a6030',geo.P(0,geo.s(10.2),10.2)[1],geo.lamp[1]]],wallY:96};
  if(v==='eve')return{amb:'#e8c4a4',sun:[34,-8,.45],wallY:96};
  return{amb:'#f4eee4',sun:[-10,-9,.35],wallY:96}}
/* the bulwarks as boxes on the walk strip, four pixels deep each, so that nobody walks into them */
function deckBlock(o){const geo=deckGeo(o),out=[],[x0,x1,y0,y1]=geo.walk;
  for(let y=y0-2;y<y1+4;y+=4){const l=geo.edge(y+2,-1),r=geo.edge(y+2,1);out.push([x0-8,y,Math.max(0,l+3-(x0-8)),4]);if(r-3<x1+8)out.push([r-3,y,x1+8-(r-3),4])}
  /* the stern deck beyond the strip's back edge is the steersman's: the strip ends there */
  return out}
/* the props: what stands on the walk strip, each with its outline (cut out of the backdrop to hide whoever is behind it) and its
   footprint. y is the depth of its front. */
function deckProps(o){const geo=deckGeo(o),T=geo.things,F=geo.foot,out=[],y=k=>+geo.P(0,0,T[k][2])[1].toFixed(1);
  const boxCut=(g,k)=>{const f=dkBox(geo,T[k]);poly(g,f.front,'#000');poly(g,f.top,'#000');if(f.side)poly(g,f.side,'#000')};
  out.push({y:y('shelter'),shape(g){dkShelter(g,geo,1)},foot:F.shelter});
  out.push({y:y('rack'),shape(g){const[x0,x1,z0,z1,h]=T.rack;for(let i=0;i<5;i++){const z=z0+(z1-z0)*(i+.5)/5,ft=geo.P((x0+x1)/2,.06,z),tp=geo.P((x0+x1)/2,h,z),w=.2*DK.F/z;R(g,ft[0]-w,tp[1]-.5,w*2,ft[1]-tp[1]+.5,'#000')}boxCut(g,'rack')},foot:F.rack});
  out.push({y:y('bales'),shape(g){boxCut(g,'bales')},foot:F.bales});
  if(geo.chest)out.push({y:y('chest'),shape(g){boxCut(g,'chest')},foot:F.chest});
  out.push({y:y('coil'),shape(g){const[x0,x1,z0,z1]=T.coil,c=geo.P((x0+x1)/2,0,(z0+z1)/2),u=DK.F/((z0+z1)/2);oval(g,c[0],c[1]-1,(x1-x0)/2*u+.5,(x1-x0)/2*u*.32+1.5,'#000')},foot:F.coil});
  return out}

return{paint,cached,gangplank,hawser,
  deck:{geo:deckGeo,walk:[8,312,102,140],block:deckBlock,props:deckProps,light:deckLight,draw:drawDeck,overlay:deckOverlay}};
})();
