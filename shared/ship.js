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
       60 fps animated scenes. */
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

return{paint,cached,gangplank,hawser};
})();
