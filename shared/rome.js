/* Paul of Tarsus: Rome about 59 C.E., as Chapters Twenty-Four and Twenty-Five see it from outside: the Appian Way in its last miles, with
   its paving of lava blocks, its curbs, a milestone and the tombs beside it; the city on its hills seen from the road; and the Porta Capena,
   the gate by which the road enters the city. Loaded on demand with need('rome') (list 'rome' in the chapter's needs, with 'materials',
   'country' and 'temple', which it paints with: it touches them only inside its functions) and registered in shared/pwa.js for offline
   play. Painted to the standard of Chapters Fifteen to Twenty-One: on the half-pixel canvas, light worked out per pixel where it matters
   (the paving), soft contact shadows, dithered once by the engine.

   What is painted, and what is left out (the facts: the Study Edition's note on Acts 28:14 and its media "The City of Rome", "The Appian
   Way" and "Construction of a Roman Road"; Insight on the Scriptures, "Rome", "Highway"; Awake! 1981 and The Watchtower 2006 and 2013 on
   the road and the arrival): the road paved with large flat polygonal blocks of dark lava, fitted like giant cobblestones and slightly
   crowned, held by curbstones, a ditch beside it; a cylindrical milestone at the roadside; plain tombs and pines and cypresses along the
   road; the city of brick and concrete, often faced with marble: tenement blocks several storeys high in the valleys, the houses of the
   rich on the hills, the Circus Maximus in its valley, the Palatine with the emperor's palace, temple fronts seen from outside and far off,
   the arches of an aqueduct out in the country; and the Porta Capena in the old wall of big blocks, with the Circus Maximus beyond it on
   the left. Not painted, because they did not stand yet in 59 or are not checked: the Colosseum, the arch of Titus, any great dome, the
   catacombs. No altar, no rite, no smoke, no standard and no statue anywhere (CONTRIBUTING section 3; Rome is one of the four cities
   where a temple may be seen, from outside, far off and restrained).

   Section 3's shapes, as these painters keep them: the joints of the paving are an irregular web drawn per pixel round seeds on a turned
   and jittered hexagonal lattice, so that three blocks meet at every corner and no joint meets another at a right angle or runs on
   across it; the joints of a curb, a wall or a tomb stop at the edge of their own course; the milestone has no wider base and its top is
   an ellipse more than a pixel high; the cypresses and the pines are trees as they grow (pine() is the engine's); a tower stands only at
   the end of a wall; the leaves of the gate are upright boards with no band; the round head of the gate stands above every head on the
   walk strip, and nothing round lies behind a head.

   API (SHARED.rome):
     far(g, o)        the room "Rome from afar": the Appian Way at the third milestone, morning, the city in the haze beyond (320 by 144).
                      o: {temples: 0..3 (how many temple fronts are seen, default 2), aqueduct (default true), mist (default true)}
     capena(g, o)     the room "at the Porta Capena": the gate in the old wall, the street beyond it closed by a house front, the Circus
                      Maximus over the wall at the left, the Palatine over the gate (320 by 144). o: {temples (0 or 1, default 0)}
     light(room)      ART[id].light for 'far' or 'capena': {amb, sun, wallY, wall}
     WALK             the walk strip of each room: {far:[x0,x1,y0,y1], capena:[...]}
     HZ               the horizon of each room: {far, capena}
   The parts, each for a later painter to call with a view V = view({hz, F, H, cx}) and a road frame Q = frame(d):
     view(o)                          the projection of a picture: P(X, Z, h) gives the screen point of a world point (h: its height),
                                      at(x, y) the ground point under a screen point
     frame(d)                         a road's frame: d its direction on the ground [dx, dz]; w(u, s) the world point at u along it and s
                                      across it
     road(g, V, Q, o)                 the paving of lava blocks between s0 and s1 across the road, worked out per pixel: o {s0, s1, cell,
                                      seed, sun:[X, Z] (where the light comes from), haze, x0, x1, y0, y1, clip}
     curb(g, V, Q, o)                 a row of curbstones along the road: o {s0, s1 (its two edges across), h (its height), u0, u1, len
                                      (a stone's length), c, seed}
     milestone(g, x, y, o)            a milestone standing with its foot at x, y: o {w, h (pixels), n (its number in Roman letters, cut
                                      into it as strokes: I, V and X), sun (-1 the light from the left, 1 from the right), seed}
     tomb(g, V, Q, o)                 a plain tomb of masonry beside the road: o {u, s, w, d, h (in world units), c, seed}
     cypress(g, x, y, h, o)           a cypress with its foot at x, y, h tall: o {c, seed, sun}
     city(g, o)                       the city on its hills far off, between x0 and x1 below the horizon hz: o {hz, temples, aqueduct,
                                      mist, seed}
     gate(g, o)                       the Porta Capena (see capena) */
SHARED.rome=(()=>{
"use strict";
const HZ={far:60,capena:78},WALK={far:[16,304,114,138],capena:[16,304,112,138]};
const hash=(a,b,c)=>{let h=(a*374761393+b*668265263+(c||0)*2147483647)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
const sm=(a,b,v)=>{const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t)};
const sh=(...a)=>SHARED.materials.shadow(...a);

/* ---------------------------------------------------------------- projection ---------------------------------------------------------------- */
/* view: a picture's projection. The eye stands H over the ground; F is the focal length in room pixels; cx the column straight ahead. A
   world point is X across (to the right), Z away from us, h up. */
function view(o){const{hz,F,H,cx}=o;
  return{hz,F,H,cx,P:(X,Z,h)=>[cx+F*X/Z,hz+F*(H-(h||0))/Z],at:(x,y)=>{const Z=F*H/(y-hz);return[(x-cx)*Z/F,Z]},k:Z=>F/Z}}
/* frame: a road running along d on the ground; e is across it, turned to the right of d. u along, s across. */
function frame(d){const l=Math.hypot(d[0],d[1]),dx=d[0]/l,dz=d[1]/l,ex=dz,ez=-dx,
    E=ez<0||(ez===0&&ex<0)?[-ex,-ez]:[ex,ez];
  return{dx,dz,ex:E[0],ez:E[1],w:(u,s)=>[u*dx+s*E[0],u*dz+s*E[1]],us:(X,Z)=>[X*dx+Z*dz,X*E[0]+Z*E[1]]}}

/* ---------------------------------------------------------------- the paving ---------------------------------------------------------------- */
/* road: large flat blocks of dark lava, fitted like giant cobblestones, the road slightly crowned so that the water runs off. Worked out for
   every pixel of the half-pixel canvas between the two edges s0 and s1: each pixel is given to the nearest seed of a hexagonal lattice that
   is turned by a sixth of a right angle (so that no family of joints runs along the road or across it) and jittered, so that the joints between the blocks are an irregular web of three-way corners;
   the joint is as wide on the screen near and far (its width is measured in screen pixels), and fades where the blocks grow too small to
   be told apart. Each block has its own tone between a blue-grey, a violet-grey and a brown-grey, is worn smooth and a little domed, so
   that its side toward the light is lighter and its edge into the joint darker; the joints are packed with earth, and with a green
   sprig here and there near the curbs. The crown makes the middle of the road a shade lighter. o.sun: the direction the light comes from on
   the ground, [X, Z] (X to the right, Z away). o.clip(x, y): leave out a pixel (something stands before the road there). */
function road(g,V,Q,o){const cv=g.canvas,W=cv.width,Hh=cv.height,x0=Math.max(0,Math.floor((o.x0==null?0:o.x0)*HR)),x1=Math.min(W,Math.ceil((o.x1==null?W/HR:o.x1)*HR)),
    y0=Math.max(0,Math.floor((o.y0==null?V.hz+1:o.y0)*HR)),y1=Math.min(Hh,Math.ceil((o.y1==null?Hh/HR:o.y1)*HR));
  if(x1<=x0||y1<=y0)return;
  const im=g.getImageData(x0,y0,x1-x0,y1-y0),d=im.data,c=o.cell||.62,seed=o.seed||1,th=o.turn==null?.26:o.turn,ct=Math.cos(th),st=Math.sin(th),hx=c,hy=c*.866,
    sun=o.sun||[.5,-.86],sl=Math.hypot(sun[0],sun[1]),Lu=(sun[0]*Q.dx+sun[1]*Q.dz)/sl,Ls=(sun[0]*Q.ex+sun[1]*Q.ez)/sl,
    TONES=o.tones||[[72,72,80],[80,72,78],[86,78,72],[66,68,76],[94,88,84],[76,70,68],[60,60,66]],haze=hex(o.haze||'#c8c6cc'),light=hex(o.light||'#fff0dc'),
    joint=[38,32,30],dirt=[70,60,50],s0=o.s0,s1=o.s1,mid=(s0+s1)/2,half=(s1-s0)/2;
  /* the lattice point i, j: jittered by its own hash */
  /* (and drawn a little together or apart by a slow wave, so that the blocks are of many sizes) */
  const seedAt=(i,j)=>{let a=(i+(j&1)*.5)*hx+(hash(i,j,seed)-.5)*.74*hx,b=j*hy+(hash(j,i,seed+7)-.5)*.74*hy;
    a+=.22*hx*Math.sin(b/hy*1.37+seed);b+=.22*hy*Math.sin(a/hx*1.13+seed*.7);return[a,b]};
  for(let py=y0;py<y1;py++){const y=(py+.5)/HR;if(y<=V.hz+.5)continue;
    for(let px=x0;px<x1;px++){const x=(px+.5)/HR;if(o.clip&&o.clip(x,y))continue;
      const[X,Z]=V.at(x,y),[u,s]=Q.us(X,Z);if(s<s0||s>s1)continue;
      /* into the lattice's own frame */
      const a=u*ct+s*st,b=-u*st+s*ct,jb=Math.round(b/hy);let d1=1e9,A1=null,id=0;
      const cand=[];for(let j=jb-2;j<=jb+2;j++){const ib=Math.round(a/hx-(j&1)*.5);for(let i=ib-2;i<=ib+2;i++){const p=seedAt(i,j),dd=(p[0]-a)**2+(p[1]-b)**2;cand.push(p);
        if(dd<d1){d1=dd;A1=p;id=i*7919+j*104729}}}
      /* the distance to the nearest joint: to the bisector between this block's seed and each other seed, measured in screen pixels */
      const dZy=-Z/(y-V.hz);let ed=1e9;
      for(const A2 of cand){if(A2===A1)continue;let ka=A2[0]-A1[0],kb=A2[1]-A1[1];const kl=Math.hypot(ka,kb);if(kl>2.6*c)continue;ka/=kl;kb/=kl;
        const e=((A1[0]+A2[0])/2-a)*ka+((A1[1]+A2[1])/2-b)*kb,ku=ka*ct-kb*st,ks=ka*st+kb*ct,kX=ku*Q.dx+ks*Q.ex,kZ=ku*Q.dz+ks*Q.ez,
          gx=kX*Z/V.F,gy=(kX*(x-V.cx)/V.F+kZ)*dZy,v=e/(Math.hypot(gx,gy)||1e-6);if(v<ed)ed=v}
      /* how large a block is on the screen, top to bottom: the joints fade out where it is under about two pixels */
      const cellPx=c*(y-V.hz)/Z,vis=sm(1.6,3.4,cellPx);
      /* the block's tone, its dome toward the light, its worn edge, the road's crown */
      const T=TONES[Math.floor(hash(id,3,seed)*TONES.length)],tv=(hash(id,5,seed)-.5)*.16,va=a-A1[0],vb=b-A1[1],vl=Math.hypot(va,vb)||1,
        vu=(va*ct-vb*st)/vl,vs=(va*st+vb*ct)/vl,rr=Math.min(1,vl/(c*.55)),dome=(vu*Lu+vs*Ls)*Math.pow(rr,1.4)*.28,
        edge=1-sm(0,1.6,ed),cr=1-((s-mid)/half)**2,
        n=(hash(px,py,seed)-.5)*.09;
      let k=1+tv+dome*vis-edge*.34*vis+cr*.08+n;
      let r=T[0]*k,gg=T[1]*k,bb=T[2]*k;
      /* the sheen of the worn tops in the morning light, on the side toward the sun */
      const sheen=Math.max(0,dome)*vis*1.8;r+=sheen*70;gg+=sheen*64;bb+=sheen*56;
      /* the joint: earth, darker at its heart */
      if(ed<.5){const q=Math.min(1,(1-ed/.5)*1.4)*vis,jc=ed<.26?joint:dirt;r=r*(1-q)+jc[0]*q;gg=gg*(1-q)+jc[1]*q;bb=bb*(1-q)+jc[2]*q;
        /* a sprig of grass in the joints near the curbs */
        const near=Math.min(s-s0,s1-s);if(near<.35&&hash(id,11,seed)<.25&&ed<.3){r=r*.4+78*.6;gg=gg*.4+108*.6;bb=bb*.4+62*.6}}
      /* the light of the hour, then the air between us and the stone */
      r=r*light[0]/255;gg=gg*light[1]/255;bb=bb*light[2]/255;
      const f=clamp((Z-(o.hz0||9))/(o.hz1||60),0,.7);r+=(haze[0]-r)*f;gg+=(haze[1]-gg)*f;bb+=(haze[2]-bb)*f;
      const i4=((py-y0)*(x1-x0)+(px-x0))*4;d[i4]=r;d[i4+1]=gg;d[i4+2]=bb;d[i4+3]=255}}
  g.putImageData(im,x0,y0)}

/* curb: a row of curbstones along the road between u0 and u1, from s0 to s1 across it, standing h above the paving: its top lit, its face
   toward us (when it is turned to us) in the light of the hour; the joint between two stones runs across the stone and stops at its own
   edges. */
function curb(g,V,Q,o){const r=rng(o.seed||5),c=o.c||'#a8a294',len=o.len||1.1,h=o.h||.14,near=o.near;
  for(let u=Math.max(o.u0,uSpan(Q,o.s0,o.s1)[0])+(r()-.5)*len;u<o.u1;){const L=len*(.7+r()*.6),ua=u,ub=u+L,cc=tint(c,(r()-.5)*.14),
      W=(uu,ss)=>Q.w(uu,ss),Pt=(uu,ss,hh)=>{const[X,Z]=W(uu,ss);return V.P(X,Z,hh)};
    const top=[...Pt(ua,o.s0,h),...Pt(ub,o.s0,h),...Pt(ub,o.s1,h),...Pt(ua,o.s1,h)];
    /* the face turned toward us: the near edge (s0) for a curb beyond the road, the far edge (s1) for one before it, which we see from
       its back only as its top */
    const fs=near?o.s1:o.s0,face=[...Pt(ua,fs,h),...Pt(ub,fs,h),...Pt(ub,fs,0),...Pt(ua,fs,0)];
    if(!near){poly(g,face);g.fillStyle=lg(g,0,face[1],0,face[5],[tint(cc,-.05),tint(cc,-.22)]);g.fill()}
    poly(g,top);g.fillStyle=lg(g,0,Math.min(top[1],top[5]),0,Math.max(top[1],top[5])+.01,[tint(cc,.06),tint(cc,.18)]);g.fill();
    clipTo(g,()=>poly(g,top),()=>tex(g,'mott',.4,Math.min(top[0],top[6])-1,Math.min(top[1],top[5])-1,Math.abs(top[2]-top[0])+4,8,'overlay',1));
    stroke(g,[top[0],top[1],top[2],top[3]],rgba(tint(cc,.4),.7),.5);
    /* the joint: across the top and down the face, inside this stone's own course */
    if(ua>o.u0){stroke(g,[top[0],top[1],top[6],top[7]],'rgba(50,40,40,.55)',.5);if(!near)stroke(g,[face[0],face[1],face[6],face[7]],'rgba(50,40,40,.5)',.5)}
    u=ub}}

/* ---------------------------------------------------------------- the milestone ---------------------------------------------------------------- */
/* milestone: a short, thick cylinder of grey stone standing on its own foot in the verge, with no wider base (an upright on a plinth would
   be an upright on a level band). Its top is seen a little from above, an ellipse more than a pixel high; its side is round, lit from
   o.sun's side. The number is cut into it in Roman letters: I a short upright, V two strokes that meet below, X two that cross (a letter in
   an inscription, CONTRIBUTING section 3), each a groove with its lit lip; no line runs across them. */
function milestone(g,x,y,o){o=o||{};const w=o.w||10,h=o.h||26,ry=o.ry||1.6,sun=o.sun==null?1:o.sun,c=o.c||'#b4aea0',r=rng(o.seed||31),hw=w/2,
    st=sun>0?[tint(c,-.42),tint(c,-.18),tint(c,.06),tint(c,.2),tint(c,.06)]:[tint(c,.04),tint(c,.22),tint(c,.06),tint(c,-.2),tint(c,-.42)];
  /* its shadow on the ground, cast away from the light */
  if(o.cast){const[dx,dy]=o.cast;for(const[q,a]of[[1.2,.1],[.5,.12],[0,.14]])comp(g,'multiply',a*2,()=>poly(g,[x-hw-q,y,x+hw+q,y,x+hw+dx*.5+q,y+dy*.5,x-hw+dx*.5-q,y+dy*.5],'#6a6478'))}
  sh(g,x+sun*.6,y,hw+1.4,1.2,.5);
  /* the round side */
  const B=[x-hw,y-h+ry];g.beginPath();g.moveTo(x-hw,y-h+ry);g.lineTo(x-hw,y);g.ellipse(x,y,hw,ry*.9,0,Math.PI,0,true);g.lineTo(x+hw,y-h+ry);g.closePath();
  g.fillStyle=lg(g,x-hw,0,x+hw,0,st);g.fill();
  clipTo(g,()=>{g.beginPath();g.rect(x-hw,y-h+ry,w,h)},()=>{tex(g,'mott',.45,x-hw,y-h,w,h+2,'overlay',1);tex(g,'grain',.18,x-hw,y-h,w,h+2,'overlay',.5);
    for(let i=0;i<w*h*.25;i++){const px=x-hw+r()*w,py=y-h+ry+r()*h;R(g,px,py,.5,.5,r()<.5?'rgba(70,64,70,.22)':'rgba(255,250,236,.18)')}
    /* weather: lichen low on the shaded side, a darker band of damp at its foot */
    ao(g,x-hw,y-5,w,5,'b',.28,'#3e3a40');
    for(let i=0;i<6;i++)R(g,x-sun*hw*.6+(r()-.5)*w*.5,y-2-r()*h*.4,.5+r()*.8,.5,'rgba(150,150,96,.35)')});
  /* the top: a disc seen from a little above, lit */
  oval(g,x,y-h+ry,hw,ry,tint(c,.22));g.strokeStyle=rgba(tint(c,-.3),.6);g.lineWidth=.5;g.beginPath();g.ellipse(x,y-h+ry,hw-.25,ry-.25,0,0,Math.PI);g.stroke();
  R(g,x-hw*.4,y-h+ry-.6,hw*.8,.5,'rgba(255,250,236,.4)');
  /* the number, cut in strokes */
  const n=o.n||'III',lh=o.lh||5,top=y-h+ry+(o.ny||5),sp=2.1;let wsum=0;const widths=[...n].map(ch=>ch==='I'?1:2.6);wsum=widths.reduce((s,v)=>s+v,0)+(n.length-1)*1.1;
  let lx=x-wsum/2+sun*.3;
  const cut=(a,b,c2,d2)=>{stroke(g,[a,b,c2,d2],'rgba(40,36,44,.75)',.6);stroke(g,[a+sun*.5,b,c2+sun*.5,d2],'rgba(255,248,230,.45)',.5)};
  [...n].forEach((ch,i)=>{const wv=widths[i];if(ch==='I')cut(lx+.5,top,lx+.5,top+lh);else if(ch==='V'){cut(lx,top,lx+wv/2,top+lh);cut(lx+wv,top,lx+wv/2,top+lh)}
    else if(ch==='X'){cut(lx,top,lx+wv,top+lh);cut(lx+wv,top,lx,top+lh)}lx+=wv+1.1});
  void sp;void B}

/* ---------------------------------------------------------------- a cypress ---------------------------------------------------------------- */
/* cypress: a tall narrow cypress as it grows: a short trunk, then the dense column of foliage, widest a third of the way up, its tip a
   little bent, its edge ragged with sprays; lit on o.sun's side (1 right, -1 left), dark on the other. Under 10 high it is drawn as from
   afar: a dark narrow flame of dabs, no trunk. */
function cypress(g,x,y,h,o){o=o||{};const c=o.c||'#3a5236',r=rng(o.seed!=null?o.seed:Math.round(x*97+y*31+h*7)),sun=o.sun==null?1:o.sun,w=o.w||h*.16,
    bend=(r()-.5)*h*.06,hazeK=o.haze||0,hc=o.hazeC||'#b8bcc4',C=k=>mix(tint(c,k),hc,hazeK);
  const wAt=t=>w*(t<.12?.55+t*3:t<.35?.9+(t-.12)*.45:1-(t-.35)*1.35)*(t>.9?.6:1),cxAt=t=>x+bend*t*t;
  if(h>=10){R(g,x-.6,y-h*.08,1.3,h*.08,'#3a2a20');R(g,x-.6,y-h*.08,.5,h*.08,'#5a4232')}
  const L=[],Rr=[];for(let i=0;i<=24;i++){const t=.05+i/24*.95,yy=y-t*h,ww=Math.max(.5,wAt(t)*(.92+r()*.16));L.push(cxAt(t)-ww,yy);Rr.unshift(cxAt(t)+ww,yy)}
  const P=L.concat(Rr);poly(g,P,C(-.3));
  clipTo(g,()=>poly(g,P),()=>{g.fillStyle=lg(g,x-w,0,x+w,0,sun>0?[C(-.42),C(-.18),C(.02)]:[C(.02),C(-.18),C(-.42)]);g.fillRect(x-w-2,y-h,w*2+4,h)});
  /* sprays at the edge and over the face: small dabs, square where they are under a pixel */
  for(let i=0;i<h*w*.9;i++){const t=.08+r()*.88,ww=wAt(t),side=r()<.5?-1:1,px=cxAt(t)+side*ww*(.3+r()*.8),py=y-t*h,lit=side===sun?.06+r()*.12:-.36+r()*.12;
    if(h<18)R(g,px-.25,py-.25,.5,.5,C(lit));else oval(g,px,py,.6+r()*.5,.5+r()*.6,C(lit))}
  for(let i=0;i<h*.4;i++){const t=.1+r()*.8,px=cxAt(t)+sun*wAt(t)*(.75+r()*.35),py=y-t*h;R(g,px,py,.5,.5,C(.16))}
  if(o.cast&&h>=10){const[dx,dy]=o.cast;comp(g,'multiply',.25,()=>poly(g,[x-w*.8,y,x+w*.8,y,x+w*.4+dx*h/46,y+dy*h/46,x-w*.4+dx*h/46,y+dy*h/46],'#6a6478'))}}

/* ---------------------------------------------------------------- a tomb ---------------------------------------------------------------- */
/* tomb: a plain tomb of masonry beside the road, its walls aligned with it: on two low steps of grey stone, a square body faced with pale
   travertine in courses (each joint stops at the edge of its own course), a moulded cornice, and over it a low roof of stepped stone. On
   the face turned to the road a marble panel with the lines of an inscription, cut as short level strokes (no letters are read). No statue,
   no column, nothing on top. o: u, s (the corner nearest us, in the road's frame), w (its length along the road), d (its depth away from
   it), h, c, seed; sun: [X, Z], the way the light comes from, which decides which faces are lit. */
function tomb(g,V,Q,o){const r=rng(o.seed||41),c=o.c||'#d8ceb6',st=o.step||'#a8a49a',sun=o.sun||[.5,-.86],u0=o.u,s0=o.s,w=o.w,dd=o.d,h=o.h,
    Pt=(u,s,hh)=>{const[X,Z]=Q.w(u,s);return V.P(X,Z,hh)};
  /* which of the two side faces we see: the one whose outward side turns to us */
  const[cX,cZ]=Q.w(u0+w/2,s0+dd/2),endL=(-Q.dx)*(-cX)+(-Q.dz)*(-cZ)>0,su=endL?u0:u0+w;
  const lit=(nx,nz)=>clamp(.62+.5*(nx*sun[0]+nz*sun[1])/Math.hypot(sun[0],sun[1]),.25,1.1);
  const box=(a0,a1,b0,b1,h0,h1,col,fn)=>{
    const front=[...Pt(a0,b0,h1),...Pt(a1,b0,h1),...Pt(a1,b0,h0),...Pt(a0,b0,h0)],
      sideU=endL?a0:a1,side=[...Pt(sideU,b0,h1),...Pt(sideU,b1,h1),...Pt(sideU,b1,h0),...Pt(sideU,b0,h0)],
      top=[...Pt(a0,b0,h1),...Pt(a1,b0,h1),...Pt(a1,b1,h1),...Pt(a0,b1,h1)];
    const fl=lit(-Q.ex,-Q.ez),sl=endL?lit(-Q.dx,-Q.dz):lit(Q.dx,Q.dz);
    poly(g,side,tint(col,(sl-.85)*.6-.14));poly(g,front,tint(col,(fl-.85)*.6));
    if(top[1]<front[1]-.2||top[5]<front[1]){poly(g,top,tint(col,.14));stroke(g,[top[0],top[1],top[2],top[3]],rgba(tint(col,.4),.8),.5)}
    stroke(g,[side[0],side[1],side[6],side[7]],rgba(tint(col,-.3),.5),.5);
    if(fn)fn(front,side,fl,sl);
    return{front,side,top}};
  const ft=Pt(u0,s0,0),pxPerM=V.k(Q.w(u0,s0)[1]);
  /* the shadow it throws, away from the light, on the ground: soft */
  {const k=o.castK||1.2;const sx=-sun[0]*h*k,sz=-sun[1]*h*k,G=[...Pt(u0,s0,0),...Pt(u0+w,s0,0)],[X1,Z1]=Q.w(u0+w,s0+dd),[X0,Z0]=Q.w(u0,s0+dd);
    const T1=V.P(X1+sx,Z1+sz,0),T0=V.P(X0+sx,Z0+sz,0),Ln=[...G,...V.P(...Q.w(u0+w,s0+dd),0),...T1,...T0,...V.P(...Q.w(u0,s0+dd),0)];
    for(const a of[.12,.14])comp(g,'multiply',a,()=>poly(g,Ln,'#58506e'))}
  /* the two steps */
  box(u0-.35,u0+w+.35,s0-.35,s0+dd+.35,0,.22,st,(F)=>{clipTo(g,()=>poly(g,F),()=>tex(g,'mott',.4,F[6]-2,F[1]-2,F[2]-F[6]+4,F[5]-F[1]+4,'overlay',1))});
  box(u0-.18,u0+w+.18,s0-.18,s0+dd+.18,.22,.42,tint(st,.06),(F)=>{clipTo(g,()=>poly(g,F),()=>tex(g,'mott',.4,F[6]-2,F[1]-2,F[2]-F[6]+4,F[5]-F[1]+4,'overlay',1))});
  /* the body, in courses */
  const hb=h*.78,courses=Math.max(3,Math.round(hb/.55));
  box(u0,u0+w,s0,s0+dd,.42,hb,c,(F,S,fl,sl)=>{
    for(const[Fc,lk]of[[F,fl],[S,sl]]){clipTo(g,()=>poly(g,Fc),()=>{
      const x0=Math.min(Fc[0],Fc[6])-1,x1=Math.max(Fc[2],Fc[4])+1,yA=Math.min(Fc[1],Fc[3])-1,yB=Math.max(Fc[5],Fc[7])+1;
      tex(g,'mott',.45,x0,yA,x1-x0,yB-yA,'overlay',1);tex(g,'grain',.12,x0,yA,x1-x0,yB-yA,'overlay',.5);
      SHARED.temple.age(g,x0,yA,x1-x0,yB-yA,rng((o.seed||41)+(Fc===F?1:2)),.35);
      /* the courses: lines between the two upright edges of the face at even heights, and in each course its joints, staggered. Only on
         the face toward the road: on the narrow side face they would meet the front ones at the corner as plus signs */
      if(Fc!==F)return;let prev=[];for(let k=1;k<=courses;k++){const t=k/courses,ya=Fc[7]+(Fc[1]-Fc[7])*t,yb=Fc[5]+(Fc[3]-Fc[5])*t;
        stroke(g,[Fc[6],ya,Fc[4],yb],'rgba(80,66,60,.4)',.5);stroke(g,[Fc[6],ya+.5,Fc[4],yb+.5],'rgba(255,248,230,.3)',.5)}
      for(let k=0;k<courses;k++){const t0=k/courses,t1=(k+1)/courses,cur=[];let f=r()*.3;
        while(f<.98){f+=.22+r()*.2;if(prev.some(p=>Math.abs(p-f)<.08))f+=.09;if(f>.96)break;cur.push(f);
          const xa=Fc[6]+(Fc[4]-Fc[6])*f,ya=Fc[7]+(Fc[1]-Fc[7])*t0+((Fc[5]+(Fc[3]-Fc[5])*t0)-(Fc[7]+(Fc[1]-Fc[7])*t0))*f,
            yb=Fc[7]+(Fc[1]-Fc[7])*t1+((Fc[5]+(Fc[3]-Fc[5])*t1)-(Fc[7]+(Fc[1]-Fc[7])*t1))*f;
          stroke(g,[xa,ya-.3,xa,yb+.3],'rgba(80,66,60,.38)',.5)}prev=cur}
      void lk})}
    /* the panel of the inscription on the face toward the road: a slab of whiter marble with a fine frame, the lines short level strokes */
    const pa=.28,pb=.72,ph0=.42,ph1=.72,Q4=(fu,fh)=>{const xa=F[6]+(F[4]-F[6])*fu,ya=F[7]+(F[5]-F[7])*fu,yt=F[1]+(F[3]-F[1])*fu;return[xa,ya+(yt-ya)*fh]};
    const pq=[...Q4(pa,ph1),...Q4(pb,ph1),...Q4(pb,ph0),...Q4(pa,ph0)];poly(g,pq,'#eee8dc');stroke(g,[...pq,pq[0],pq[1]],'rgba(110,96,90,.55)',.5);
    const lines=4;for(let i=0;i<lines;i++){const fh=ph1-(i+1)*(ph1-ph0)/(lines+1);let fu=pa+.05+r()*.03;
      while(fu<pb-.08){const L=.04+r()*.08,[xa,ya]=Q4(fu,fh),[xb,yb]=Q4(Math.min(pb-.05,fu+L),fh);stroke(g,[xa,ya,xb,yb],'rgba(80,70,72,.6)',.5);fu+=L+.03}}});
  /* the cornice: a broader course that stands out, lit along its top, its underside in shade */
  const cr=box(u0-.12,u0+w+.12,s0-.12,s0+dd+.12,hb,hb+.22,tint(c,.08));
  stroke(g,[cr.front[0],cr.front[1],cr.front[2],cr.front[3]],'rgba(255,250,236,.7)',.5);stroke(g,[cr.front[6],cr.front[7],cr.front[4],cr.front[5]],'rgba(70,56,60,.55)',.5);
  /* the low roof of stepped stone */
  box(u0+.12,u0+w-.12,s0+.12,s0+dd-.12,hb+.22,hb+.4,tint(c,-.04));
  box(u0+.3,u0+w-.3,s0+.3,s0+dd-.3,hb+.4,hb+.56,tint(c,-.08));
  ao(g,Math.min(ft[0],ft[0])-2,ft[1]-6,(w+1)*pxPerM+4,6,'b',.15,'#3a3040');
  return{foot:ft}}

/* ---------------------------------------------------------------- the city far off ---------------------------------------------------------------- */
/* house: a small house far off: its front toward us in the light of the hour, a narrow side face, and its roof of red tiles above, seen a
   little from above. o.storeys: windows in rows (a dark half-pixel square each, in rows that never meet a line, every other row set over by half a step, so
   that no four of them stand two by two); o.gable: a gable end
   toward us; o.flat: a flat roof with a parapet. Haze: how far the air has paled it. */
function house(g,x,y,w,h,o){o=o||{};const hz=o.haze||0,hc=o.hc||'#c6c8d2',c=mix(o.c||'#d8c4a0',hc,hz),rf=mix(o.roof||'#a85a3c',hc,hz*.9),side=o.side||0,rh=o.rh==null?Math.max(1,w*.22):o.rh;
  /* the side face, darker (the light is behind us at the right: a left side is in shade) */
  if(side)poly(g,side>0?[x+w,y-h,x+w+side,y-h-side*.3,x+w+side,y-side*.3,x+w,y]:[x,y-h,x+side,y-h+side*.3,x+side,y+side*.3,x,y],tint(c,side>0?-.08:-.3));
  R(g,x,y-h,w,h,c);R(g,x,y-.5,w,.5,tint(c,-.18));
  if(o.storeys&&h>3){const n=o.storeys,dy=(h-1)/n;for(let k=0;k<n;k++){const yy=y-h+.8+k*dy;for(let xx=x+.8+(k%2)*.8;xx<x+w-.8;xx+=1.6)if(hash(Math.round(xx*2),Math.round(yy*2),7)<.8)R(g,xx,yy,.5,.5,mix('#3a2c30',hc,hz*.7))}}
  if(o.flat){R(g,x-.25,y-h-.8,w+.5,.8,tint(c,.12));return}
  if(o.gable){poly(g,[x-.3,y-h,x+w+.3,y-h,x+w/2,y-h-rh],tint(c,.06));poly(g,[x+w/2,y-h-rh,x+w+.3,y-h,x+w+.3+Math.abs(side||1),y-h-.3,x+w/2+Math.abs(side||1),y-h-rh-.3],rf)}
  else{poly(g,[x-.4,y-h,x+w+.4,y-h,x+w-.3,y-h-rh,x+.3,y-h-rh],rf);R(g,x+.3,y-h-rh,w-.6,.5,tint(rf,.25));R(g,x-.4,y-h,w+.8,.5,tint(rf,-.3))}}
/* farTemple: a temple front far off, seen from outside: on its podium, a row of columns (pale strokes) before the shaded cella wall, a deep
   beam across all of them, the pediment over the beam, the roof's edge. Nothing in it is a figure; no altar or anything before it. */
function farTemple(g,x,y,w,o){o=o||{};const hz=o.haze||0,hc=o.hc||'#c6c8d2',c=mix(o.c||'#ece2cc',hc,hz),n=o.n||6,ch=o.ch||w*.5,pod=o.pod||w*.22,eh=Math.max(1,ch*.18),ph=w*.2,side=o.side||0;
  /* the flank running back, in shade, under the long roof */
  if(side){const sx=side>0?x+w:x+side;R(g,sx,y-pod-ch-eh,Math.abs(side),ch+eh,tint(c,-.34));R(g,sx,y-pod,Math.abs(side),pod,tint(c,-.22));
    poly(g,side>0?[x+w/2,y-pod-ch-eh-ph,x+w/2+side,y-pod-ch-eh-ph-.4,x+w+side,y-pod-ch-eh-.4,x+w,y-pod-ch-eh]:[x+w/2,y-pod-ch-eh-ph,x+w/2+side,y-pod-ch-eh-ph-.4,x+side,y-pod-ch-eh-.4,x,y-pod-ch-eh],mix('#9a5a40',hc,hz))}
  R(g,x-.5,y-pod,w+1,pod,tint(c,-.06));R(g,x-.5,y-pod,w+1,.5,tint(c,.2));
  R(g,x,y-pod-ch,w,ch,tint(c,-.48));
  for(let i=0;i<n;i++){const cx2=x+(i+.5)*w/n,cw=Math.max(.5,w/n*.45);R(g,cx2-cw/2,y-pod-ch,cw,ch,tint(c,.08));if(cw>=1)R(g,cx2-cw/2,y-pod-ch,.5,ch,tint(c,.3))}
  R(g,x-.5,y-pod-ch-eh,w+1,eh,tint(c,.04));R(g,x-.5,y-pod-ch-eh,w+1,.5,tint(c,.28));
  poly(g,[x-.8,y-pod-ch-eh,x+w+.8,y-pod-ch-eh,x+w/2,y-pod-ch-eh-ph],tint(c,.12));poly(g,[x+1,y-pod-ch-eh-.4,x+w-1,y-pod-ch-eh-.4,x+w/2,y-pod-ch-eh-ph+.8],tint(c,-.16))}
/* palace: the emperor's palace on the Palatine far off: long blocks of several storeys, each with a portico along its front (a row of pale
   columns under a deep beam, its back in shade), red roofs over them, set back one behind another up the hill. */
function palace(g,x,y,w,o){o=o||{};const hz=o.haze||0,hc=o.hc||'#c6c8d2',c=mix('#e6d8bc',hc,hz),rf=mix('#a4583c',hc,hz*.9),r=rng(o.seed||61);
  const blocks=[[.1,.62,9,3],[.0,.3,6,0],[.42,1,7,0],[.2,.78,4,-4]];
  for(const[a,b,h,dy]of blocks.slice().reverse()){const x0=x+w*a,x1=x+w*b,yy=y+dy,ww=x1-x0;
    R(g,x0,yy-h,ww,h,tint(c,(r()-.5)*.08));poly(g,[x0-.4,yy-h,x1+.4,yy-h,x1-.6,yy-h-1.4,x0+.6,yy-h-1.4],rf);R(g,x0+.6,yy-h-1.4,ww-1.2,.5,tint(rf,.25));
    /* the portico: a dark band of shade with the columns before it, under the beam */
    R(g,x0,yy-h*.55,ww,h*.4,tint(c,-.45));for(let xx=x0+.6;xx<x1-.4;xx+=1.4)R(g,xx,yy-h*.55,.5,h*.4,tint(c,.12));R(g,x0,yy-h*.55-.8,ww,.8,tint(c,.1));
    /* windows above it */
    for(let xx=x0+1;xx<x1-1;xx+=2)if(r()<.75)R(g,xx,yy-h+1.2,.5,.5,tint(c,-.5))}}
/* circus: the Circus Maximus in its valley, seen along its long side: a long, low wall of three storeys of arcades (its arches small dark
   openings, each storey under its own cornice, none of them touching it), a plain attic on top; over it, since we look down a little,
   a thin band of the far tiers of seats in shade. Its ends are hidden among the houses, so that it never reads as a ring. */
function circus(g,x,y,w,o){o=o||{};const hz=o.haze||0,hc=o.hc||'#c6c8d2',c=mix('#e6d4b0',hc,hz),h=o.h||5,dk=mix('#6a5048',hc,hz*.8),sl=o.slope||0;
  const Y=xx=>y+(xx-x)*sl;
  /* the far tiers of seats, seen over the near wall */
  poly(g,[x+2,Y(x+2)-h-1.6,x+w-2,Y(x+w-2)-h-1.6,x+w,Y(x+w)-h,x,Y(x)-h],mix('#a89880',hc,hz));
  stroke(g,[x+2,Y(x+2)-h-.9,x+w-2,Y(x+w-2)-h-.9],rgba(mix('#e8dcc4',hc,hz),.6),.5);
  /* the outer wall */
  poly(g,[x,Y(x)-h,x+w,Y(x+w)-h,x+w,Y(x+w),x,Y(x)]);g.fillStyle=lg(g,0,y-h,0,y,[tint(c,.08),c,tint(c,-.08)]);g.fill();
  const tiers=[.12,.42,.72,1];
  for(let k=0;k<3;k++){const t0=tiers[k],t1=tiers[k+1];
    for(let xx=x+1;xx<x+w-1;xx+=1.5){const ya=Y(xx)-h+h*t0+.6,yb=Y(xx)-h+h*t1-.3;if(yb-ya>=.5)R(g,xx,ya,.5,yb-ya,dk)}
    stroke(g,[x,Y(x)-h+h*t0,x+w,Y(x+w)-h+h*t0],rgba(tint(c,.3),.7),.5)}
  R(g,x,Y(x)-h-.3,w,.5,rgba(tint(c,.4),.8))}
/* aqueduct: the arches of an aqueduct running across the country far off from (xa, ya) to (xb, yb), its foot on the ground, ha high at
   the near end and hb at the far one: one solid band of masonry, the channel along its top, with a round-headed opening in every bay
   cut out of it (filled evenodd, so that the country behind is seen through each arch and nothing is painted there). The piers are the
   band between the openings, never posts under a rail: each opening's head stands well below the channel. */
function aqueduct(g,xa,ya,xb,yb,ha,hb,o){o=o||{};const hz=o.haze||0,hc=o.hc||'#c6c8d2',c=mix(o.c||'#c8a07a',hc,hz),n=o.n||22;
  const at=t=>[xa+(xb-xa)*t,ya+(yb-ya)*t,ha+(hb-ha)*t];
  const P=[];for(let i=0;i<=n;i++)P.push(at(1-Math.pow(1-i/n,1.3)));
  g.beginPath();g.moveTo(xa,ya-ha);g.lineTo(xb,yb-hb);g.lineTo(xb,yb);g.lineTo(xa,ya);g.closePath();
  const holes=[];
  for(let i=0;i+1<P.length;i++){const[x0,y0,h0]=P[i],[x1,y1,h1]=P[i+1],pw=Math.max(.5,Math.abs(x1-x0)*.28),l=Math.min(x0,x1)+pw/2,rr=Math.max(x0,x1)-pw/2,
      w=rr-l,hm=(h0+h1)/2,ym=(y0+y1)/2,sp=ym-hm*.42,rad=w/2;if(w<.5)continue;
    if(sp-rad<ym-hm*.8)continue;holes.push([l,rr,ym,sp,rad]);
    g.moveTo(l,ym);g.lineTo(l,sp);if(rad>=.75)g.arc(l+rad,sp,rad,Math.PI,0);else g.lineTo(rr,sp);g.lineTo(rr,ym);g.closePath()}
  g.fillStyle=lg(g,xa,0,xb,0,[c,tint(c,.06)]);g.fill('evenodd');
  /* the inner side of each opening, in shade at its left (the light is behind us at the right) */
  for(const[l,,ym,sp]of holes)R(g,l,sp,.5,ym-sp,rgba(tint(c,-.35),.8));
  /* the channel: its lit top edge and the shade under its lip */
  stroke(g,[xa,ya-ha,xb,yb-hb],rgba(tint(c,.3),.9),.5);stroke(g,[xa,ya-ha*.86,xb,yb-hb*.86],rgba(tint(c,-.25),.45),.5)}
/* city: Rome on its hills far off, from x0 to x1, below the horizon hz, as the morning shows it from the Appian Way with the sun behind
   us: the far ridge beyond the river at the horizon; the hills of the city, the Aventine at the left, the Palatine at the right of the
   Circus with the palace on it, the Capitoline farther off between them, the Caelian nearest at the right; the valleys full of roofs and
   tenement blocks, the houses on the hills among gardens; the old wall along the near edge with the gate where the road goes in;
   the temple fronts (o.temples: 0 to 3); the arches of an aqueduct out in the country at the right (o.aqueduct); mist lying in the low
   ground (o.mist). Returns {gate:[x, y]}, where the road reaches the city. */
function city(g,o){const hz=o.hz,r=rng(o.seed||81),hc='#c4c6d2',T=o.temples==null?2:o.temples;
  /* the ground of the city, warm and pale, under the haze */
  const yb=hz+18;g.fillStyle=lg(g,0,hz,0,yb,['rgba(200,192,180,.85)','rgba(188,174,150,.85)']);
  poly(g,[34,hz+1,262,hz+1,268,hz+5,256,yb-3,190,yb,120,yb,60,yb-3,34,hz+8]);g.fill();
  /* the hills, low and long, in grey-green, lit toward us */
  const hill=(cx,cy,w,h,c)=>{const P=[];for(let i=0;i<=20;i++){const t=i/20,xx=cx-w/2+t*w,yy=cy-h*Math.pow(Math.sin(Math.PI*t),.7)*(1+.08*Math.sin(t*9));P.push(xx,yy)}P.push(cx+w/2,cy+2,cx-w/2,cy+2);
    poly(g,P);g.fillStyle=lg(g,0,cy-h,0,cy,[mix(c,hc,.35),mix(c,hc,.5)]);g.fill()};
  hill(118,hz+2,34,7,'#8a9470');                     /* the Capitoline, farther off */
  hill(78,hz+6,56,8,'#869068');                      /* the Aventine */
  hill(178,hz+8,46,9,'#8a9470');                     /* the Palatine */
  hill(236,hz+11,58,8,'#849066');                    /* the Caelian */
  /* the roofs: back to front, the valleys densest; tall tenement blocks where the ground is low */
  const H=[];
  for(let i=0;i<560;i++){const x=34+r()*228,depth=r(),y=hz+2+depth*15+Math.sin(x/23)*1.2;
    const low=!(Math.abs(x-78)<22||Math.abs(x-178)<18||Math.abs(x-236)<24)||(x>120&&x<150);
    const tall=low&&r()<.4;H.push({x,y,w:1.6+r()*3.4,h:tall?3.5+r()*4:1.4+r()*2,tall,c:['#d8b480','#cc9c6c','#e0c494','#b87a52','#d4a878','#c88c60','#e4d0a8'][Math.floor(r()*7)],roof:['#a0503a','#b4623e','#8e4632','#a85a3c'][Math.floor(r()*4)],
      gable:r()<.25,flat:tall&&r()<.4,side:x<160?.6:-.6,haze:.24-depth*.14})}
  /* a gap in the roofs for the Circus in its valley, and for the gardens on the hills */
  const inCircus=(x,y)=>x>120&&x<168&&y>hz+5&&y<hz+13.4;
  H.sort((a,b)=>a.y-b.y);
  const capY=hz-1;
  for(const q of H){if(inCircus(q.x,q.y))continue;house(g,q.x,q.y,q.w,q.h,{c:q.c,roof:q.roof,storeys:q.tall?Math.floor(q.h/1.6):0,gable:q.gable,flat:q.flat,side:q.side,haze:q.haze,hc});}
  /* gardens on the hills: dark green clumps, cypresses among them */
  for(let i=0;i<70;i++){const hx=[78,178,236,118][i%4],hw=[22,16,24,12][i%4],x=hx+(r()-.5)*hw*2,y=hz+[3,5,8,0][i%4]+r()*4;
    const q=.7+r()*1.1;poly(g,[x-q,y,x+q,y,x+q*.6,y-q*.9,x-q*.5,y-q*.8],mix('#4e6640',hc,.4))}
  for(let i=0;i<9;i++){const x=40+r()*240,y=hz+3+r()*12;cypress(g,x,y,4+r()*3,{c:'#3e5238',haze:.4,hazeC:hc})}
  /* the Circus Maximus in the valley between the Aventine and the Palatine */
  circus(g,118,hz+12.6,52,{haze:.24,hc,h:5,slope:-.02});
  /* the palace on the Palatine, the houses of the rich round it */
  palace(g,164,hz+1,30,{haze:.28,hc});
  /* the temple fronts, from outside and far off: on the Capitoline the largest, facing us across the city; one on the Aventine; one on
     the Palatine beside the palace */
  if(T>0)farTemple(g,113,capY+1,10,{n:6,ch:5,pod:2,haze:.32,hc,side:2.4});
  if(T>1)farTemple(g,64,hz+4,7,{n:4,ch:3.4,pod:1.4,haze:.3,hc,side:-1.6});
  if(T>2)farTemple(g,196,hz+3,6,{n:4,ch:3,pod:1.2,haze:.3,hc,side:1.4});
  /* tall tenements in front of the Circus's near end, low in the valley where the road comes in */
  for(let i=0;i<26;i++){const x=110+r()*70,y=hz+15.5+r()*3;house(g,x,y,2+r()*3,3+r()*4,{c:['#cc9c6c','#b87a52','#d8b480','#c88c60'][i%4],storeys:3,flat:r()<.5,side:x<160?.6:-.6,haze:.2,hc})}
  /* the old wall along the near edge of the city, low and pale, with the gate where the road goes in; no tower on it */
  const gx=o.gx||150,wy=hz+19.5;
  for(const[a,b]of[[54,gx-2],[gx+2.6,262]]){const P=[a,wy-1.8,b,wy-2.2+(b-a)*.004,b,wy+.4,a,wy+.6];poly(g,P,mix('#c8b89a',hc,.18));stroke(g,[a,wy-1.8,b,wy-2.2+(b-a)*.004],rgba('#f4ead4',.8),.5)}
  R(g,gx-2,wy-1.6,4.6,2,mix('#5a4a48',hc,.3));
  /* the aqueduct out in the country at the right, its arches running toward the city */
  if(o.aqueduct!==false)aqueduct(g,322,hz+21,250,hz+10,7,3.4,{haze:.16,hc,n:22});
  /* mist lying in the low ground of the valleys, and the air over everything */
  if(o.mist!==false){for(const[x,y,w]of[[146,hz+12,30],[100,hz+9,26],[210,hz+13,24],[280,hz+16,30]])pool(g,x,y,w,1.8,'#eeeaf0',.45,'source-over')}
  comp(g,'source-over',1,()=>{g.fillStyle=lg(g,0,hz-12,0,yb+2,['rgba(214,214,226,.0)','rgba(214,214,226,.2)','rgba(214,214,226,.04)']);g.fillRect(-2,hz-12,324,yb-hz+14)});
  return{gate:[gx,wy]}}

/* ================================================================ the room: Rome from afar ================================================================ */
/* far: the Appian Way at the third milestone, in the morning. We stand on the road where it comes down from the hills, looking north-west
   to the city; the sun is low behind us at the right (east-south-east), so everything turned to us is lit, and every shadow falls away
   from us and to the left.
     The sky, clear and pale, warm low behind the far ridge; the far ridge beyond the river at the horizon (y 60) and the mountains at the
   right far off; the city on its hills below the horizon in the morning haze (city()); the open country between, its fields green in the
   spring, the road going on across it straight toward the city between tombs and cypresses until it reaches the gate in the old wall.
     In front: the road itself, crossing the picture and running away to the left, paved per pixel in lava blocks (road()), held by its
   curbs; a footpath of packed gravel beyond the far curb and a dry ditch beyond it, the verge with spring grass. On the verge: the milestone
   with III cut into it (x 128), a plain tomb at the left (its foot at about y 100), a pair of cypresses beside it, and an umbrella pine at
   the right (the engine's pine). Nothing stands in the walk strip (WALK.far), so the room needs no props.
     Heads on the walk strip come at about y 64..94: behind them lie the city's roofs and hills, the country and the road; nothing round. */
const VF={hz:60,F:320,H:2.4,cx:160},DF=[-.985,.17];
function far(g,o){o=o||{};const V=view(VF),Q=frame(DF),hz=VF.hz,r=rng(2401),sun=[.55,-.84],cast=[-16,-11];
  /* the sky */
  sky(g,320,hz+2,['#7e9cc6','#a4b8d4','#cfd6dc','#e8e0d2']);
  pool(g,330,hz,140,22,'#fff0d8',.35,'screen');
  {const q=rng(2402);cloud(g,70,16,70,3,q,'#fbf6ee','#b8c0d4');cloud(g,250,9,60,2.4,q,'#fbf6ee','#b8c0d4');cloud(g,170,26,40,1.6,q,'#f4f0ea','#c0c6d8')}
  /* the mountains far off at the right, and the low ridge beyond the river behind the city */
  SHARED.country.range(g,170,322,hz+1,x=>7+9*Math.pow(Math.max(0,Math.sin(clamp(x-170,0,152)/152*Math.PI*.9)),1.2)+2*Math.sin(x/9),['#b4bcd0','#c4c8d6'],{k:.3,light:1});
  ridge(g,-2,200,hz+1,x=>2.6+1.6*Math.sin(x/17)+1.2*Math.sin(x/7.3)+(x<70?1.2:0),['#a8b0b4','#b8bcc2']);
  for(let i=0;i<30;i++){const x=r()*190,y=hz-1-r()*2;R(g,x,y,.5+r(),.5,'rgba(120,130,120,.35)')}
  /* the open country, from the horizon down to the verge */
  SHARED.country.plain(g,-2,322,hz,112,2403,{vx:150,land:'#9aac6a',haze:'#cacdd6',clouds:2});
  /* the city */
  const C=city(g,{hz,temples:o.temples,aqueduct:o.aqueduct,mist:o.mist,gx:150});
  /* the road going on to the city: straight across the country, paler and narrower as it goes, between its tombs and cypresses */
  const ga=C.gate,gb=[64,103];
  {const P=[];for(let i=0;i<=16;i++){const t=i/16,x=ga[0]+(gb[0]-ga[0])*t,y=ga[1]+(gb[1]-ga[1])*t,hw=.5+t*3.4;P.push(x+hw*.25,y-hw*.18)}
    for(let i=16;i>=0;i--){const t=i/16,x=ga[0]+(gb[0]-ga[0])*t,y=ga[1]+(gb[1]-ga[1])*t,hw=.5+t*3.4;P.push(x-hw*.25,y+hw*.6)}
    poly(g,P);g.fillStyle=lg(g,gb[0],gb[1],ga[0],ga[1],['#8a8478','#a8a49a','#bab8b4']);g.fill();
    /* the light on the crown of the road, a fine line */
    stroke(g,[ga[0],ga[1]-.2,gb[0]+1,gb[1]-1],'rgba(240,236,224,.35)',.5)}
  /* out in the country: a farmhouse or two among trees, umbrella pines far off in a row along a lane, a line of poplars by a stream's
     dry bed is left out (water runs somewhere) */
  for(const[x,y,w,h]of[[214,88,7,3.4],[286,92,6,3],[30,82,5,2.4]]){house(g,x,y,w,h,{c:'#d8c09a',roof:'#a85a3c',side:-1.2,haze:.15,rh:1.4});
    SHARED.country.tree(g,x+w+3,y+.4,6,'#56703e',{kind:'oak',seed:x})}
  for(let i=0;i<5;i++){const x=180+i*11+r()*4,y=92-i*1.4;pine(g,x,y,7+r()*2,'#4a6440')}
  /* tombs and cypresses along it, smaller as they go */
  for(let i=0;i<14;i++){const t=.08+i/14*.86,x=ga[0]+(gb[0]-ga[0])*t,y=ga[1]+(gb[1]-ga[1])*t,k=.3+t*.9,side=i%2?1:-1,ox=side*(2+t*7)+(r()-.5)*2,oy=side*-1.2*t;
    if(i%3===0){const w=2.4*k+1,h=2.6*k+1.2,X=x+ox-w/2,Y=y+oy;R(g,X,Y-h,w,h,mix('#e0d6c0','#c4c6d2',.4-t*.3));R(g,X,Y-h,w,.5,'rgba(255,250,236,.5)');R(g,X+w-.5,Y-h,.5,h,'rgba(80,70,80,.3)');R(g,X-.3,Y-h-.6,w+.6,.6,mix('#d8ccb4','#c4c6d2',.4-t*.3))}
    else if(i%3===1){const w=3*k+1,h=1.8*k+1,X=x+ox-w/2,Y=y+oy;R(g,X,Y-h,w,h,mix('#d4c8ae','#c4c6d2',.4-t*.3));R(g,X,Y-h,w,.5,'rgba(255,250,236,.45)');R(g,X,Y-h*.55,w,.5,'rgba(90,80,80,.25)')}
    cypress(g,x-ox*.7+side*1.5,y+.6,3+t*9,{c:'#3a5034',haze:.45-t*.35,hazeC:'#c4c6d2',seed:300+i})}
  /* the near verge beyond the road: spring grass, a little dry along the footpath; then the dry ditch */
  SHARED.country.turf(g,-2,96,324,110,'#8a9c58',2404,{wind:-.4,scale:.6,flowers:30,dry:.25});
  /* the tomb at the left, its pair of cypresses, and the pine at the right */
  cypress(g,54,95,40,{c:'#34502f',seed:2405,cast});cypress(g,63,96,31,{c:'#3a5634',seed:2406,cast});
  pine(g,8,93,(o.pineH||80),'#46623e',{lean:o.pineLean==null?.3:o.pineLean,shade:false});
  SHARED.country.turf(g,-2,90,30,101,'#8a9c58',2414,{wind:-.4,scale:.7,dry:.2});
  tomb(g,V,Q,{u:12.6,s:22,w:2.4,d:2.2,h:3.3,seed:2407,sun});
  /* the ditch: a shallow dry trough under the verge, grass on its far bank, its bed in shade */
  ditch(g,V,Q,16.2,17.1,r);
  /* the footpath of packed gravel between the curb and the ditch */
  band(g,V,Q,14.65,16.2,'#a49680','#bcae94',2408);
  /* the road */
  road(g,V,Q,{s0:8.4,s1:14.3,cell:.62,seed:2409,sun,haze:'#c8c6cc',hz0:9,hz1:40});
  /* its curbs: beyond the road (we see their face), and before it (only their top, at the foot of the picture) */
  curb(g,V,Q,{s0:14.3,s1:14.65,h:.14,u0:-40,u1:40,seed:2410,c:'#a8a294'});
  curb(g,V,Q,{s0:8.05,s1:8.4,h:.14,u0:-40,u1:40,seed:2411,c:'#a29c8e',near:1});
  band(g,V,Q,6.4,8.05,'#a49680','#b4a68c',2412);
  /* the milestone, at the edge of the footpath by the curb */
  {const[X,Z]=Q.w(-1.5,15.5),[mx,my]=V.P(X,Z,0),k=V.k(Z);milestone(g,mx,my,{w:.7*k,h:1.3*k,ry:1.5,n:'III',sun:1,seed:2413,cast,lh:5.2,ny:5.4})}
  /* the light of the morning over the whole: warm from the right and from behind us, the far left a little cooler */
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(180,186,214,1)','rgba(240,222,196,.8)','rgba(255,214,170,1)']);g.fillRect(0,0,320,144)});
  ao(g,0,128,320,16,'b',.12,'#2a2440')}
/* uSpan: the stretch of a road, along it, that lies before us (at least 0.6 away) between the edges s0 and s1, out to 80 */
const uSpan=(Q,s0,s1)=>{const z=.6,lo=Q.dz>0?Math.max((z-s0*Q.ez)/Q.dz,(z-s1*Q.ez)/Q.dz):-80;return[Math.max(-80,lo),80]};
/* band: a strip of ground along the road between s0 and s1 across it: packed earth and gravel, small stones */
function band(g,V,Q,s0,s1,c0,c1,seed){const r=rng(seed),P=[],[ua,ub]=uSpan(Q,s0,s1);for(let u=ua;u<=ub;u+=.5){const[X,Z]=Q.w(u,s0);P.push(...V.P(X,Z,0))}
  for(let u=ub;u>=ua;u-=.5){const[X,Z]=Q.w(u,s1);P.push(...V.P(X,Z,0))}
  poly(g,P);g.fillStyle=lg(g,0,90,0,144,[c1,c0]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.5,0,80,320,64,'overlay',1);tex(g,'grain',.25,0,80,320,64,'overlay',.5);
    for(let i=0;i<900;i++){const x=r()*320,y=80+r()*64;R(g,x,y,.5,.5,r()<.5?'rgba(80,70,60,.3)':'rgba(250,240,220,.3)')}})}
/* ditch: the dry ditch beyond the footpath: its near bank in shade, its bed of earth, its far bank grassy and lit */
function ditch(g,V,Q,s0,s1,r){const P=(u,s)=>{const[X,Z]=Q.w(u,s);return V.P(X,Z,0)},A=[],B=[];
  const[ua,ub]=uSpan(Q,s0,s1);for(let u=ua;u<=ub;u+=.5){A.push(...P(u,s0));B.unshift(...P(u,s1))}
  const D=A.concat(B);poly(g,D,'#7a6a52');clipTo(g,()=>poly(g,D),()=>{tex(g,'mott',.5,0,80,320,40,'overlay',1);
    for(let u=ua;u<ub;u+=.5){const[x0,y0]=P(u,s0),[x1,y1]=P(u+.5,s0);poly(g,[x0,y0,x1,y1,x1,y1-1,x0,y0-1],'rgba(50,40,50,.25)')}
    for(let i=0;i<260;i++){const x=r()*320,y=86+r()*30;R(g,x,y,.5,.5,'rgba(110,130,70,.5)')}})}

/* ================================================================ the room: at the Porta Capena ================================================================ */
/* capena: the Porta Capena, an hour later, the sun still low behind us at the right. The Appian Way comes up to the gate straight away
   from us (its vanishing point is the middle of the gate, x 190, on the horizon y 78), paved in the same lava blocks between its curbs,
   with a footpath of packed earth on each side; at the left, a strip of beaten ground along the foot of the wall.
     The old wall of the city, of big squared blocks of grey-yellow tufa in long courses: in front of us from x 114 to the right edge, its
   coping at y 22; at the left it turns away from us and runs back, its top falling toward the left (its courses go back to a point on
   the horizon far off at the left, its foot at y 104 at the corner and 93 at the left edge). No tower: the corner is a plain corner.
     The gate: a round-headed opening (x 172..208, its head at y 30, its springing at y 48) in a ring of wedge-shaped stones, its jambs of
   long and short blocks; through it the vaulted passage, its two leaves of upright boards standing open against its walls (no band across
   them); at its far end the street of the city in the sun, running back to the horizon, closed by the front of a tenement house: a row of
   shops on the ground floor with their wide square openings, windows above, a tiled eave.
     Over the wall at the left, beyond it, the long outer wall of the Circus Maximus, three storeys of arcades running back toward the
   middle; over the gate, far off, the Palatine with the palace; at the right, roofs of the city over the wall. Heads on the walk strip
   come at about y 62..94, in front of the wall's coursed blocks, of the dark of the passage and the house front through it: the gate's
   round head (y 30..48) and its ring stand above every head. */
const VC={hz:78,F:320,H:1.7,cx:190},GATE={x:172,w:36,top:30,base:104},CORNER=114,WTOP=22,VPL=[-150,78];
function capena(g,o){o=o||{};const V=view(VC),Q=frame([0,1]),hz=VC.hz,r=rng(2501),sun=[.5,-.86];
  sky(g,320,60,['#7898c4','#a2b4d0','#d4d8dc']);
  {const q=rng(2502);cloud(g,240,8,70,2.4,q,'#fbf6ee','#b8c0d4')}
  /* far off over the gate: the Palatine, its slope and gardens, the palace on top */
  const hc='#c8ccd8';
  /* the Caelian at the right, nearer; the Palatine over the gate, farther: their slopes, gardens and houses, the palace on top */
  ridge(g,200,322,WTOP+2,x=>(10+3*Math.sin((x-226)/30)+1.2*Math.sin(x/5))*sm(200,250,x),[mix('#8a9a72',hc,.2),mix('#9aa486',hc,.3)]);
  ridge(g,80,260,WTOP+2,x=>(13+4*Math.sin((x-80)/180*Math.PI)+1*Math.sin(x/6))*sm(80,140,x)*(1-sm(232,260,x)*.4),[mix('#8e9a80',hc,.35),mix('#a4aa94',hc,.4)]);
  palace(g,140,WTOP-3.6,84,{haze:.3,hc,seed:2503});
  for(let i=0;i<46;i++){const x=104+r()*140,y=WTOP+.6-r()*3;if(x>136&&x<228)continue;house(g,x,y,2+r()*3,1.6+r()*2,{c:'#dcc4a0',haze:.3,hc,side:-.6})}
  for(let i=0;i<30;i++){const x=100+r()*150,y=WTOP-1-r()*6;if(x>138&&x<226&&y<WTOP-2)continue;const q=.8+r()*1.2;poly(g,[x-q,y,x+q,y,x+q*.6,y-q*.9,x-q*.5,y-q*.8],mix('#4e6640',hc,.45))}
  /* a temple front on the Palatine's slope at the left of the palace, far off and only from outside (o.temples) */
  if(o.temples)farTemple(g,116,WTOP-2.4,11,{n:6,ch:5.4,pod:1.8,haze:.3,hc,side:-2});
  /* roofs of the city over the wall at the right, on the Caelian's slope */
  for(let i=0;i<30;i++){const x=228+r()*96,y=WTOP+.8-r()*7,w=4+r()*8,h=3+r()*5;house(g,x,y,w,h,{c:['#d8b480','#cc9c6c','#e0c494','#c88c60'][i%4],roof:['#a0503a','#b4623e','#8e4632'][i%3],haze:.14,hc,side:-1,rh:2,storeys:r()<.5?2:0})}
  for(let i=0;i<5;i++)cypress(g,236+r()*80,WTOP+.5,7+r()*5,{c:'#3e5636',haze:.2,hazeC:hc,seed:2520+i});
  /* the Circus Maximus beyond the wall at the left */
  circusSide(g,r);
  /* the ground before the wall, the road and its footpaths */
  {g.fillStyle=lg(g,0,90,0,144,['#b8a888','#a89878']);g.fillRect(-2,88,324,58);tex(g,'mott',.5,0,88,320,56,'overlay',1);tex(g,'grain',.2,0,88,320,56,'overlay',.5);
    for(let i=0;i<500;i++){const x=r()*320,y=92+r()*52;R(g,x,y,.5,.5,r()<.5?'rgba(80,66,54,.3)':'rgba(250,240,220,.3)')}
    /* the ground trodden darker where people and beasts go to the gate, and stones and tufts here and there */
    pool(g,120,124,90,10,'#8a7458',.22,'multiply');pool(g,260,128,70,9,'#8a7458',.18,'multiply');
    SHARED.country.ground(g,0,108,320,144,'#b4a486',2513,{n:60,size:.7,tufts:0})}
  /* the wall: the part that runs back at the left, then the front with the gate */
  wallBack(g,rng(2504));
  wallFront(g,rng(2505));
  passage(g,rng(2506));
  ring(g,rng(2507));
  /* the road up to the gate: footpaths, curbs, paving */
  band(g,V,Q,-3.4,-1.75,'#a49680','#b6a88c',2508);band(g,V,Q,1.75,3.4,'#a49680','#b6a88c',2509);
  road(g,V,Q,{s0:-1.4,s1:1.4,cell:.5,seed:2510,sun,haze:'#c8c6cc',hz0:12,hz1:60,y0:104});
  curb(g,V,Q,{s0:-1.75,s1:-1.4,h:.12,u0:-1,u1:60,seed:2511,c:'#a8a294'});
  curbSide(g,V,Q,1.4,1.75,.12,2512);
  /* the sill of the gate: one long slab across the threshold */
  R(g,GATE.x-2,103.2,GATE.w+4,1.6,'#c8bca0');R(g,GATE.x-2,103.2,GATE.w+4,.5,'#f4e8cc');R(g,GATE.x-2,104.6,GATE.w+4,.5,'rgba(60,46,50,.45)');
  /* the foot of the wall: grime, the soft shade where the wall meets the ground, and weeds along it (never at the threshold) */
  ao(g,0,96,320,9,'b',.16,'#4a3a30');
  {const q=rng(2514);for(let i=0;i<26;i++){const x=q()*300,w=3+q()*12;if(x+w>GATE.x-14&&x<GATE.x+GATE.w+14)continue;const y=capenaWallY(x)+.8;
    SHARED.country.turf(g,x,y-2-q()*1.5,w,y+q()*1.2,'#8e9460',2515+i,{wind:-.3,scale:.4+q()*.3,dry:.5})}}
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(190,190,214,1)','rgba(244,224,196,.8)','rgba(255,214,170,1)']);g.fillRect(0,0,320,144)});
  ao(g,0,126,320,18,'b',.12,'#2a2440')}
/* wallY of the gate's room: the foot of the wall, level in front, rising toward the left where the wall runs back */
const capenaWallY=x=>x>=CORNER?104:104-(CORNER-x)*(104-93)/CORNER;
/* the face of the wall that runs back at the left: courses between lines that go to the far point VPL, blocks whose joints stand upright
   and stop at the edge of their course, staggered; lit raking from the right, a little less than the front */
function wallBack(g,r){const S='#c4b48e',x0=-2,x1=CORNER,topAt=x=>WTOP+(CORNER-x)*(WTOP-VPL[1])/(CORNER-VPL[0])*-1,footAt=capenaWallY;
  const top=x=>WTOP+(x-CORNER)*(VPL[1]-WTOP)/(VPL[0]-CORNER);
  const P=[x0,top(x0),x1,WTOP,x1,104,x0,footAt(x0)];poly(g,P,tint(S,-.12));
  clipTo(g,()=>poly(g,P),()=>{const n=9;let prev=[];
    for(let k=0;k<n;k++){const ya=t=>top(t)+(footAt(t)-top(t))*k/n,yb=t=>top(t)+(footAt(t)-top(t))*(k+1)/n,cur=[];
      /* blocks: widths shrink toward the far point */
      let x=x1;while(x>x0){const sc=(x-VPL[0])/(x1-VPL[0]),w=Math.max(3,(18+r()*16)*sc);let nx=x-w;for(let t=0;t<5&&prev.some(p=>Math.abs(p-nx)<3*sc+1);t++)nx-=3*sc+1;
        const cc=tint(S,(r()-.5)*.14-.1);poly(g,[nx,ya(nx),x,ya(x),x,yb(x),nx,yb(nx)],cc);
        stroke(g,[nx,ya(nx)+.25,x,ya(x)+.25],rgba(tint(cc,.22),.8),.5);stroke(g,[nx+.25,ya(nx)+.5,nx+.25,yb(nx)-.4],'rgba(70,56,52,.45)',.5);
        cur.push(nx);x=nx}
      prev=cur}
    tex(g,'mott',.35,x0,0,x1-x0,110,'overlay',1);SHARED.temple.age(g,x0,10,x1-x0,96,rng(2521),.4);
    ao(g,x0,0,x1-x0,110,'l',.3,'#4a4060')});
  /* its coping: a lip along the top, lit */
  stroke(g,[x0,top(x0)-.2,x1,WTOP-.2],'#f4e8cc',.6);stroke(g,[x0,top(x0)+.8,x1,WTOP+.8],'rgba(70,56,60,.45)',.5);
  /* the corner: a fine line of light down the edge where the two faces meet */
  R(g,CORNER-.5,WTOP,.6,104-WTOP,'rgba(60,46,50,.35)');void topAt}
/* the front of the wall, from the corner to the right edge, with the coping along its top */
function wallFront(g,r){const S='#ccbc94';
  SHARED.temple.stone(g,CORNER,WTOP+2.4,322-CORNER,104-WTOP-2.4,r,{bh:9.2,bw:30,c:S,v:.08,age:.5});
  R(g,CORNER-1,WTOP,323-CORNER,2.6,tint(S,.14));R(g,CORNER-1,WTOP,323-CORNER,.6,'#fff4dc');R(g,CORNER-1,WTOP+2.4,323-CORNER,.6,'rgba(70,52,56,.5)');
  ao(g,CORNER,WTOP+3,320-CORNER,4,'t',.25,'#5a4050');
  for(let i=0;i<14;i++){const x=CORNER+r()*(320-CORNER),y=40+r()*56;pool(g,x,y,5+r()*10,2+r()*3,'#8a7458',.1,'multiply')}
  ao(g,CORNER,88,320-CORNER,16,'b',.18,'#5a4030')}
/* the passage through the gate and the street beyond it: the far end lit, the street running back to the horizon and closed by a house
   front whose shops and windows are square; the two leaves standing open against the passage walls */
function passage(g,r){const{x,w,top,base}=GATE,sp=top+w/2,vx=VC.cx,vy=VC.hz,k=.46,at=(px,py,s)=>[px+(vx-px)*(1-k)*s,py+(vy-py)*(1-k)*s];
  const fx0=at(x,base,1)[0],fx1=at(x+w,base,1)[0],fy=at(x,base,1)[1],fsp=at(x,sp,1)[1],ftop=at(x,top,1)[1];
  clipTo(g,()=>arch(g,x,top,w,base-top),()=>{
    g.fillStyle=lg(g,0,top,0,base,['#2a2022','#3a2c28','#4a3a30']);g.fillRect(x,top,w,base-top);
    /* beyond the far mouth: the street, in the sun, and the house front across it */
    clipTo(g,()=>{g.beginPath();g.rect(fx0,ftop-10,fx1-fx0,fy-ftop+10)},()=>{
      const hy=VC.hz+2.4;
      /* the house front: brick-faced, plastered above, the shop openings dark and square, the windows small and square */
      g.fillStyle=lg(g,0,ftop-10,0,hy,['#a89078','#d4bc98','#dcc4a0']);g.fillRect(fx0-2,ftop-10,fx1-fx0+4,hy-ftop+10);
      g.fillStyle=lg(g,0,hy-9,0,hy,['#b47a58','#a86c4c']);g.fillRect(fx0-2,hy-9,fx1-fx0+4,9);
      tex(g,'mott',.4,fx0,ftop-10,fx1-fx0,hy-ftop+10,'overlay',1);
      for(let i=0;i<3;i++){const sx=fx0+1+i*(fx1-fx0-2)/3,sw=(fx1-fx0-2)/3-1.4;R(g,sx+.4,hy-6.6,sw,6.6,'#3a2a24');R(g,sx+.4,hy-6.6,sw,.6,'#6a4a38');R(g,sx-.2,hy-7.4,sw+1.2,.8,'#e8d0b0')}
      for(let i=0;i<4;i++){const wx=fx0+2+i*(fx1-fx0-4)/4;R(g,wx,hy-13.6,1.6,1.8,'#3a2a2a');R(g,wx-.3,hy-11.8,2.2,.5,'#f0dcc0')}
      R(g,fx0-2,hy-9,fx1-fx0+4,.6,'rgba(90,60,50,.4)');
      /* its foot, and the street between it and the gate: paving in the sun */
      g.fillStyle=lg(g,0,hy,0,fy,['#c8b494','#e2cea8']);g.fillRect(fx0-2,hy,fx1-fx0+4,fy-hy);R(g,fx0-2,hy,fx1-fx0+4,.5,'rgba(60,44,40,.45)');
      for(const yy of[hy+2,hy+4.4])R(g,fx0-2,yy,fx1-fx0+4,.5,'rgba(140,110,90,.25)')});
    /* the floor of the passage, in shade, flags in courses going back */
    const F=[x,base,x+w,base,fx1,fy,fx0,fy];poly(g,F,'#5e4c3a');
    clipTo(g,()=>poly(g,F),()=>{for(let s=.1;s<1;s+=.16+s*.08){const[ax,ay]=at(x,base,s),[bx]=at(x+w,base,s);R(g,ax,ay,bx-ax,.5,'rgba(30,20,16,.45)')}
      g.fillStyle=lg(g,0,fy,0,base,['rgba(240,214,170,.3)','rgba(0,0,0,0)']);g.fillRect(x,fy,w,base-fy)});
    /* the passage walls: the left one, turned to the right, has the low sun on it near the mouth; the right one in shade */
    const LW=[x,sp,x,base,fx0,fy,fx0,fsp],RW=[x+w,sp,x+w,base,fx1,fy,fx1,fsp];
    poly(g,LW,'#6a5240');poly(g,RW,'#3e302a');
    clipTo(g,()=>poly(g,LW),()=>{poly(g,[x,sp+3,x,base,x+3.6,base-1.4,x+3.6,sp+5],'rgba(255,206,150,.4)');
      for(const s of[.25,.52,.78]){const[ax,ay]=at(x,sp,s),[,by]=at(x,base,s);R(g,ax-.25,ay,.5,by-ay,'rgba(30,20,16,.35)')}});
    clipTo(g,()=>poly(g,RW),()=>{for(const s of[.25,.52,.78]){const[ax,ay]=at(x+w,sp,s),[,by]=at(x+w,base,s);R(g,ax-.25,ay,.5,by-ay,'rgba(20,14,12,.4)')}});
    leaf(g,at,x,sp,base,.05,.5,-1);leaf(g,at,x+w,sp,base,.05,.5,1);
    ao(g,x,top,w,12,'t',.6,'#000');ao(g,x+w-5,top,5,base-top,'r',.3,'#000')})}
/* a leaf of the gate: upright boards, standing open against a passage wall from depth s0 to s1; no band across it */
function leaf(g,at,px,sp,base,s0,s1,side){const top=sp+2,[ax,ay]=at(px,top,s0),[,ab]=at(px,base,s0),[bx,by]=at(px,top,s1),[,bb]=at(px,base,s1),
    c=side<0?'#8a6040':'#4a3424',Q=[ax,ay,bx,by,bx,bb,ax,ab];
  poly(g,Q,c);clipTo(g,()=>poly(g,Q),()=>{g.fillStyle=lg(g,ax,0,bx,0,[tint(c,side<0?.2:.1),tint(c,-.2)]);g.fillRect(Math.min(ax,bx),ay-1,Math.abs(bx-ax),ab-ay+2);
    tex(g,'vert',.3,Math.min(ax,bx),ay,Math.abs(bx-ax)+1,ab-ay,'overlay',.5);
    for(let i=1;i<5;i++){const s=s0+(s1-s0)*i/5,[lx]=at(px,top,s);R(g,lx-.2,ay-1,.45,ab-ay+2,rgba(tint(c,-.5),.7))}});
  R(g,bx-(side<0?.7:0),by,.7,bb-by,side<0?'#b08a60':'#2a1c14')}
/* the ring of the arch: wedge-shaped stones round the head, their joints running out from its centre; the jambs below the springing of
   long and short blocks in turn, down to the sill. Nothing lies across the springing. */
function ring(g,r){const{x,w,top,base}=GATE,S='#d4c49c',cx=x+w/2,sp=top+w/2,R0=w/2,R1=R0+5.4,n=15;
  for(let i=0;i<n;i++){const a0=Math.PI+i*Math.PI/n,a1=Math.PI+(i+1)*Math.PI/n,cc=tint(S,(r()-.5)*.08+.02),
      P=[cx+Math.cos(a0)*R0,sp+Math.sin(a0)*R0,cx+Math.cos(a0)*R1,sp+Math.sin(a0)*R1,cx+Math.cos(a1)*R1,sp+Math.sin(a1)*R1,cx+Math.cos(a1)*R0,sp+Math.sin(a1)*R0];
    poly(g,P,cc);const lit=Math.cos((a0+a1)/2)>0;stroke(g,[P[0],P[1],P[2],P[3]],tint(cc,lit?.2:-.12),.5);stroke(g,[P[2],P[3],P[4],P[5]],tint(cc,.2),.5);
    stroke(g,[P[4],P[5],P[6],P[7]],'rgba(70,50,50,.5)',.5)}
  g.beginPath();g.arc(cx,sp,R1+.4,Math.PI,0);g.strokeStyle='rgba(80,56,56,.4)';g.lineWidth=.6;g.stroke();
  for(const side of[-1,1]){let y=sp,k=0;
    while(y<base-.1){const h=Math.min(base-y,k%2?7:9),jw=k%2?5.4:8.4,X=side<0?x-jw:x+w,cc=tint(S,(r()-.5)*.08+.03);
      R(g,X,y,jw,h,cc);R(g,X,y,jw,.5,tint(cc,.22));R(g,X,y+h-.5,jw,.5,'rgba(70,50,50,.5)');
      if(side<0)R(g,X,y,.5,h,'rgba(80,56,56,.35)');else R(g,X+jw-.5,y,.5,h,'rgba(80,56,56,.35)');
      R(g,side<0?x-.6:x+w,y,.6,h,side<0?tint(cc,.3):tint(cc,-.3));y+=h;k++}}
  tex(g,'mott',.3,x-10,top-6,w+20,base-top+6,'overlay',1)}
/* the long outer wall of the Circus Maximus, beyond the city wall at the left: three storeys of arcades and a plain attic, running back
   toward the middle of the picture; seen over the wall only where it stands above it. Its arches are small and high, far above every head. */
function circusSide(g,r){const S='#e2d4b4',xa=-2,xb=150,ta=6,tb=40,fa=70,fb=74,top=x=>ta+(tb-ta)*(x-xa)/(xb-xa),foot=x=>fa+(fb-fa)*(x-xa)/(xb-xa);
  const P=[xa,top(xa),xb,top(xb),xb,foot(xb),xa,foot(xa)];poly(g,P);g.fillStyle=lg(g,xa,0,xb,0,[tint(S,.04),mix(S,'#c8ccd8',.35)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.3,xa,0,xb-xa,80,'overlay',1);
    const lvl=[0,.16,.44,.72,1];
    for(let k=1;k<4;k++){const yA=x=>top(x)+(foot(x)-top(x))*lvl[k],yB=x=>top(x)+(foot(x)-top(x))*lvl[k+1];
      stroke(g,[xa,yA(xa),xb,yA(xb)],'rgba(255,248,230,.6)',.5);stroke(g,[xa,yA(xa)+.6,xb,yA(xb)+.6],'rgba(90,76,72,.35)',.5);
      /* the arches of this storey: piers spaced by distance, each opening dark with a round head */
      for(let x=xa+1;x<xb-1;){const sc=(xb+40-x)/(xb+40-xa),bw=Math.max(1.4,8*sc),ow=bw*.6,y0=yA(x+bw*.2)+(yB(x)-yA(x))*.18,y1=yB(x+bw*.2)-.4,oh=y1-y0;
        if(ow>=1.6){g.beginPath();g.moveTo(x+bw*.2,y1);g.lineTo(x+bw*.2,y0+ow/2);g.arc(x+bw*.2+ow/2,y0+ow/2,ow/2,Math.PI,0);g.lineTo(x+bw*.2+ow,y1);g.closePath();g.fillStyle=mix('#5a4a4a','#c8ccd8',.25-.25*sc);g.fill()}
        else R(g,x+bw*.2,y0,Math.max(.5,ow),oh,mix('#5a4a4a','#c8ccd8',.3));
        x+=bw}}
    /* the attic: plain, with its cornice */
    stroke(g,[xa,top(xa)+.3,xb,top(xb)+.3],'#fff6e0',.6)});
  void r}
/* curbSide: the curb on the right of a road that runs away from us: we see its top and its inner face turned to the road (in shade) */
function curbSide(g,V,Q,s0,s1,h,seed){const r=rng(seed),Pt=(u,s,hh)=>{const[X,Z]=Q.w(u,s);return V.P(X,Z,hh)};
  for(let u=Math.max(.6,uSpan(Q,s0,s1)[0])+r()*.5;u<60;){const L=.9+r()*.5,a=u,b=u+L,cc=tint('#a8a294',(r()-.5)*.14);
    const face=[...Pt(a,s0,h),...Pt(b,s0,h),...Pt(b,s0,0),...Pt(a,s0,0)],top=[...Pt(a,s0,h),...Pt(b,s0,h),...Pt(b,s1,h),...Pt(a,s1,h)];
    poly(g,face,tint(cc,-.28));poly(g,top,tint(cc,.14));stroke(g,[top[0],top[1],top[6],top[7]],'rgba(50,40,40,.5)',.5);u=b}}

/* the figures' light: sun:[dx, dy, strength] is the tip of the shadow of a figure 46 pixels tall, from its feet. In both rooms the morning
   sun is low behind us at the right, so the shadows fall away from us and to the left; at the gate they reach the foot of the wall and
   bend up onto it, except across the opening of the gate. */
function light(room){if(room==='capena')return{amb:'#f6eadc',sun:[-12,-13,.42],wallY:capenaWallY,wall:[[0,GATE.x-6,WTOP,104],[GATE.x+GATE.w+6,320,WTOP,104]]};
  return{amb:'#f6ecdc',sun:[-16,-11,.5],wallY:WALK.far[2]-2}}

return{HZ,WALK,view,frame,road,curb,milestone,tomb,cypress,city,house,farTemple,palace,circus,aqueduct,far,capena,light,
  GATE,CORNER,capenaWallY}})();
