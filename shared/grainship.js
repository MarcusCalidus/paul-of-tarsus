/* Paul of Tarsus: the grain ship of Acts 27, shared by Chapters Twenty-Two and Twenty-Three: the large merchantman from Alexandria,
   laden with wheat, that Julius finds at Myra (27:6) and that carries 276 people (27:37) into the northeaster and onto the shoal off
   Malta (27:41). Loaded on demand with need('grainship') (list 'grainship' in the chapter's needs, with 'ship', whose hull painter it
   uses for the planking: it touches SHARED.ship only inside its functions, since the files of a chapter's needs load side by side) and
   registered in shared/pwa.js for offline play. Painted to the standard of Chapters Fifteen to Twenty-One: on the half-pixel canvas,
   light worked out per part, soft contact shadows, dithered once by the engine.

   What the sources settle, and what this painter follows (the publications' drawings were looked at for form and proportion only;
   nothing of them is copied): a large, deep, round-bellied hull with wales along it; one mainmast amidships with a large square sail
   on a long yard; a short foremast raked steeply forward over the bow for the small foresail (27:40); a high sternpost that curves up
   and forward; a gallery that juts out aft; a low cabin on the after deck; a hatch amidships with a ladder into the hold; two great
   steering oars, one at each quarter, lashed up out of the water at anchor and in the storm (27:40); a skiff towed astern in fair
   weather and hoisted aboard in the storm (27:16, 17); hook anchors of wood with a heavy lead stock. The number of masts, the cabin and
   how the grain lay are not stated; they are drawn as the publications' drawings show them. No figurehead (decided for this ship).

   CONTRIBUTING section 3, as it meets this ship:
   - No upright stands across the level line where sea meets sky: the masts run out of the top of the picture, and the caller keeps
     the horizon behind land, out of the picture (the storm), or hidden in the dark (the night).
   - The main yard is never across its mast. In harbor and in the storm it is lowered and lies fore and aft on the deck, its furled sail
     on it, and the mast stands behind it as it stands behind the rail. The foresail, at Myra, is furled and lashed along its own mast;
     at the wreck it is set, and the sail hides the mast from its foot to its yard, so the yard ends no mast.
   - The steering oars slant down and aft at the quarter, and below the rail they lie beyond the curve of the stern, against the water,
     not across the planking; their lashings slant.
   - The gallery's rail is upright slats between a deep top rail and a deep bottom beam: one way only, never a lattice; the sternpost
     rises at its forward end, so no rail crosses the post.
   - The anchors are shown as they were (an exception the maintainer decided on 26 November 2026, for accuracy), at Myra only: hung at
     the bow with their arms flat against the planking, so the lead stock is seen end-on, a small block, and the arms curve up from the
     crown; and one lying on the deck. By night and in the storm only their cables are seen.
   - The undergirding (27:17) is shown round the hull in the storm and at the wreck (the second exception of 26 November 2026): each
     rope comes over the rail and runs down the side at a slant, curving with the belly of the hull, never square to the planks.
   - A lantern hangs by two cords that part upward; four cables over the stern run side by side and each goes over the rail and down
     out of sight, so none crosses another or a plank of the stern.
   - Wreckage lies alone, each piece long and low at one slant for the whole sea, and nothing lies across anything.

   API (SHARED.grainship):
     side(g, o)      the ship from the side, bow to the right (mirror the canvas for a bow to the left). o:
                       x, y      the after end of the hull at the rail, and the waterline (default 20, 108)
                       len       her length at the rail in room pixels, stem to stern (default 360; every measure follows it)
                       state     'moored' (sails furled, oars lashed up, skiff on its line, anchors at the bow), 'storm' (yard down,
                                 mast bare, skiff aboard, undergirding, oars lashed), 'wreck' (bow fast, stern breaking up, foresail
                                 set and torn, undergirding)
                       post      'bird' (the sternpost ends in a bird's head and neck) or 'curl' (a plain scroll); default 'bird'
                       anchors   false leaves the anchors at the bow out (state 'moored')
                       tilt      radians: the whole ship turned about her middle at the waterline (positive: bow up)
                       light     'day' (sun from the left, default), 'storm' (grey, no sun), 'dawn' (grey with a warm light low at the
                                 left)
                       flap      0..1, how the torn foresail stands at this moment (state 'wreck')
                       figs(g)   people on deck, drawn behind the rail
                     Returns the geometry (G below): sheer(x), wl, x0, x1, the mast, the stern, the oar, for a room's hotspots.
     geo(o)          that geometry without painting.
     anchor(g, a)    one anchor: a = {x, y (the ring), ang (radians from straight down, positive: the crown swings to the right),
                     len, view:'side' (arms in the picture plane, the stock end-on) | 'deck' (lying on a deck: the stock across,
                     foreshortened, a = {..., sx, sy}, the stock's half-length as a vector), light}
     deck(g, o)      the deck seen across from the near rail, for a walkable room (see "The deck" below)
     sternNight(g,o) the stern seen from aboard by night (see "The stern by night" below)
     wreckage(g, o)  floating pieces of the ship: o.pieces [[x, y, len], ...], o.slant (one for all), o.light */
SHARED.grainship=(()=>{
"use strict";

/* ---------- the hull from the side: one geometry for every state ---------- */
/* geo(o): her measures in room pixels. Everything follows len (k = len / 360). The sheer rises toward the high stern and a little toward
   the bow; the stern overhangs, the stem is blunt and nearly upright; below the water she is deep and round (D), which only the storm
   and the wreck show. */
function geo(o){o=o||{};const L=o.len||360,k=L/360,x0=o.x!=null?o.x:20,x1=x0+L,wl=o.y!=null?o.y:108,
    H=42*k,sR=28*k,sS=.34*L,bR=20*k,bS=.3*L,D=26*k,
    sheer=x=>wl-H-sR*Math.pow(clamp((x0+sS-x)/sS,0,1),2)-bR*Math.pow(clamp((x-(x1-bS))/bS,0,1),2.2),
    bez=(p,t)=>{const u=1-t;return[u*u*u*p[0]+3*u*u*t*p[2]+3*u*t*t*p[4]+t*t*t*p[6],u*u*u*p[1]+3*u*u*t*p[3]+3*u*t*t*p[5]+t*t*t*p[7]]},
    /* the outer line of the stern, from the rail down round the counter to the keel, and of the stem, from the keel up to its head */
    SB=[x0,sheer(x0),x0+.022*L,sheer(x0)+(wl-sheer(x0))*.62,x0+.085*L,wl+D*.7,x0+.2*L,wl+D],
    FB=[x1-.13*L,wl+D,x1-.02*L,wl+D*.85,x1+.012*L,wl-H*.2,x1,sheer(x1)],
    curve=(p,n)=>{const q=[];for(let i=0;i<=n;i++)q.push(...bez(p,i/n));return q},
    STERN=curve(SB,24),STEM=curve(FB,20),
    /* x of the stern's and the stem's outer line at a height y (for what hangs beside them) */
    edgeAt=(P,y)=>{let best=P[0],d=1e9;for(let i=0;i<P.length;i+=2){const e=Math.abs(P[i+1]-y);if(e<d){d=e;best=P[i]}}return best},
    keel=x=>wl+D-3*k*Math.pow(Math.abs((x-(x0+x1)/2)/(L/2)),3),
    mast={x:x0+.53*L,w:5*k},
    fore={x:x1-.11*L,ang:.74,len:.27*L,w0:3*k,w1:1.8*k},
    post={x:x0+.035*L},
    cabin={x:x0+.085*L,w:.11*L,h:10*k},
    gallery={x0:x0-.075*L,x1:post.x,depth:2.4*k,rail:6.4*k},
    oar={head:[x0+.085*L,0],w:2.2*k,blade:7*k};
  oar.head[1]=sheer(oar.head[0])+.6*k;
  fore.foot=[fore.x,sheer(fore.x)+1.5*k];fore.head=[fore.foot[0]+Math.sin(fore.ang)*fore.len,fore.foot[1]-Math.cos(fore.ang)*fore.len];
  return{L,k,x0,x1,wl,H,D,sheer,STERN,STEM,keel,edgeAt,mast,fore,post,cabin,gallery,oar,o}}

/* the outline of the hull, stern to keel to stem to the rail and back along the sheer */
function hullPts(G){const p=G.STERN.slice();for(let x=G.STERN[G.STERN.length-2]+3;x<G.STEM[0];x+=3)p.push(x,G.keel(x));
  p.push(...G.STEM);for(let x=G.x1-2;x>G.x0;x-=3)p.push(x,G.sheer(x));return p}
/* a timber along a curve: the outer line P and the inner line offset inward (toward the hull) by w */
function inner(P,w,sgn){const q=[];for(let i=0;i<P.length;i+=2){const a=Math.max(0,i-2),b=Math.min(P.length-2,i+2),tx=P[b]-P[a],ty=P[b+1]-P[a+1],l=Math.hypot(tx,ty)||1;
  q.push(P[i]-ty/l*w*sgn,P[i+1]+tx/l*w*sgn)}return q}

/* the palette of each light: hull wood ramp, wale, lit edge, the shade on the side turned from the light, sail cloth, rope */
const LIGHT={
  day:{hull:['#b88a56','#956a3e','#6c4a2a','#3e2a1a'],wale:'#8c4a30',lower:'#33241c',hi:'#f6e2b4',rail:'#a37c4a',post:'#86623e',postHi:'#f0d6a2',
    sail:['#f0e0b8','#d0bc90','#927e5a'],rope:'#cbb282',ropeSh:'rgba(30,24,34,.45)',lead:'#8e9096',leadHi:'#d0d2d4',wood:'#6e4a2a',woodHi:'#d8a86a',
    shade:'#5a5488',glow:'rgba(255,226,170,1)',amb:'#f2ece2',slat:'#9a7246',dark:'#24160e'},
  storm:{hull:['#6e6458','#544a40','#3c342e','#26201e'],wale:'#5e3a30',lower:'#221a18',hi:'#c8c4bc',rail:'#6a5e50',post:'#5a4c3e',postHi:'#b8b0a2',
    sail:['#bcb6a6','#9a9484','#6a665c'],rope:'#a49a84',ropeSh:'rgba(16,14,20,.5)',lead:'#6e7076',leadHi:'#a8aaae',wood:'#4e3e30',woodHi:'#9a8a74',
    shade:'#3e4458',glow:'rgba(200,210,220,1)',amb:'#a8acb4',slat:'#605244',dark:'#16100c'},
  dawn:{hull:['#8a7262','#6a5446','#4a3a32','#2a2020'],wale:'#7a4234',lower:'#2a1e1a',hi:'#f0cca0',rail:'#86684e',post:'#6e5440',postHi:'#f4c898',
    sail:['#e0c8a4','#b8a080','#7a6854'],rope:'#c4a882',ropeSh:'rgba(20,16,24,.5)',lead:'#7a7a80',leadHi:'#c8b8a8',wood:'#5a4232',woodHi:'#c89a6e',
    shade:'#4a4466',glow:'rgba(255,200,140,1)',amb:'#c8b4a4',slat:'#7a6048',dark:'#1a120e'}};

/* side(g, o): the whole ship from the side (see the header) */
function side(g,o){o=o||{};const G=geo(o),C=LIGHT[o.light]||LIGHT.day,st=o.state||'moored',{L,k,x0,x1,wl,sheer}=G,r=rng(o.seed||22027);
  g.save();
  if(o.tilt){const cx=(x0+x1)/2;g.translate(cx,wl);g.rotate(-o.tilt);g.translate(-cx,-wl)}
  /* behind the hull: the stays, the masts, the cabin, people on deck, and the skiff aboard */
  rigBehind(g,G,C,st);
  if(st!=='wreck')cabin(g,G,C);
  if(st==='storm')skiffAboard(g,G,C);
  if(o.figs)o.figs(g,G);
  /* the hull, planked in strakes that follow the sheer (shared/ship.js), cut out of the picture where the stern has broken up */
  const HP=hullPts(G);
  const brk=st==='wreck'?breakLine(G):null;
  g.save();
  if(brk){g.beginPath();g.moveTo(brk[0],brk[1]);for(let i=2;i<brk.length;i+=2)g.lineTo(brk[i],brk[i+1]);g.lineTo(x1+40,-200);g.lineTo(x1+40,400);g.lineTo(brk[brk.length-2],400);g.closePath();g.clip()}
  hull(g,G,C,HP,r);
  g.restore();
  if(brk){/* the stern, broken off, lies lower and leans back as the seas take it (27:41): the same planking, turned away from the break,
       its post still on it; the sea in front covers what lies under the water */
    const bx=brk[0],by=brk[1];g.save();g.translate(bx-5*k,by+12*k);g.rotate(-.2);g.translate(-bx,-by);
    g.beginPath();g.moveTo(brk[0],brk[1]);for(let i=2;i<brk.length;i+=2)g.lineTo(brk[i],brk[i+1]);g.lineTo(x0-80,400);g.lineTo(x0-80,-200);g.closePath();g.clip();
    hull(g,G,C,HP,rng(23043));sternpost(g,G,C,o.post||'bird');g.restore();
    broken(g,G,C,brk,r)}
  /* on the hull and beside it */
  if(st!=='wreck')gallery(g,G,C);
  if(st!=='wreck')sternpost(g,G,C,o.post||'bird');
  if(st==='moored'&&o.anchors!==false)bowAnchors(g,G,C);
  if(st!=='moored')girding(g,G,C);
  yardOnDeck(g,G,C,st);
  if(st!=='wreck')oar(g,G,C,st);
  if(st==='wreck')foresail(g,G,C,o.flap||0);
  g.restore();
  return G}

/* the hull's planking: SHARED.ship.paint with the grain ship's own outline, wales and posts */
function hull(g,G,C,HP,r){const{L,k,x0,x1,wl,sheer,D}=G,yb=wl+D;
  const SI=inner(G.STERN,2.6*k,-1),FI=inner(G.STEM,2.6*k,-1);
  SHARED.ship.paint(g,{r,dir:1,view:'full',x0,x1,yBot:yb,sheer,palette:null,hullGrad:C.hull,gradY0:sheer(x0+L*.5)-4,gradY1:yb,
    hullPath:()=>poly(g,HP),
    pitch:{f0:.62,color:'rgba(22,14,10,.5)'},
    wale:{f0:.1,f1:.16,color:C.wale},waleWear:{count:Math.round(40*k),c1:tint(C.wale,-.25),c2:tint(C.wale,.25)},
    lowerWale:{f0:.4,f1:.46,color:C.lower,hi:tint(C.hi,-.3)},
    seams:[.1,.16,.22,.28,.34,.4,.46,.52,.58,.62,.68,.74,.8,.86,.92],
    buttCourses:[[.16,.22],[.22,.28],[.28,.34],[.34,.4],[.46,.52],[.52,.58],[.62,.68],[.68,.74],[.74,.8],[.8,.86]],
    buttX0:x0+.06*L,buttX1:x1-.06*L,buttStepMin:24*k,buttStepVar:22*k,buttStartVar:20*k,
    beams:{f:.25,x0:x0+.14*L,x1:x1-.12*L,step:17*k,w:1.8*k,h:1.8*k,color:C.dark,hi:tint(C.hi,-.2)},
    scuppers:Array.from({length:9},(_,i)=>x0+(.2+i*.075)*L),scupperF:.05,
    texRect:{x:x0-4,y:sheer(x0)-6,w:L+12,h:yb-sheer(x0)+8},woodScale:.3,woodAlpha:.55,mottScale:.3,mottAlpha:.75,
    turnShade:{comp:'multiply',a:.34,x0:x0,x1:x1,stops:[rgba(C.shade,.2),rgba(C.shade,0),rgba(C.shade,.25),rgba(C.shade,.9)],rx:x0-4,ry:sheer(x0)-6,rw:L+12,rh:yb-sheer(x0)+10},
    sunGlow:C===LIGHT.storm?null:{comp:'screen',a:.22,x0:x0,x1:x0+.5*L,stops:[C.glow,'rgba(0,0,0,0)'],rx:x0-4,ry:sheer(x0)-6,rw:L*.5,rh:yb-sheer(x0)+8},
    aoY:wl-10*k,aoHeight:D+12*k,aoA:.42,aoCol:'#0c0808',
    rail:{x0:x0+1,x1:x1-1,h:1.8*k,color:C.rail,hi:C.hi},
    stern:{IN:SI,OUT:G.STERN,color:C.post,rabbet:true,rimCol:C.postHi,rimLen:12,cap:false,ao:false},
    stem:{IN:FI,OUT:G.STEM,stemFirst:1,color:C.post,rabbet:true,rimPts:G.STEM.slice(G.STEM.length-24),rimCol:C.postHi,rimW:.6,
      capPoly:[x1-1.8*k,sheer(x1)-.4*k,x1+.8*k,sheer(x1)-3.6*k,x1+3.4*k,sheer(x1)-3*k,x1+3*k,sheer(x1)+.6*k],capCol:tint(C.post,.1),capRim:[x1-1.8*k,sheer(x1)-.4*k,x1+.8*k,sheer(x1)-3.6*k,x1+3.4*k,sheer(x1)-3*k],capRimCol:C.postHi}})}

/* ---------- the rig ---------- */
/* behind the hull: the backstay and the forestay, the mainmast running out of the top of the picture, and the raked foremast. The
   forestay comes down from the mainmast's head, beyond the picture, to the foremast's head and ends there: the two meet at a point. */
function rigBehind(g,G,C,st){const{k,x0,sheer,mast:m,fore:f}=G,mc=C===LIGHT.day?['#6a4a2a','#a67c4a','#5a3c20']:C===LIGHT.dawn?['#4e3a2a','#8a6a4c','#3a2a1e']:['#3e3630','#6a5e52','#2e2824'];
  const top=-8;
  stroke(g,[m.x+m.w*.5-40*k,top,f.head[0],f.head[1]],tint(C.rope,-.45),.55);
  {const bx=x0+(st==='wreck'?.25:.15)*G.L;stroke(g,[m.x+m.w*.5-28*k,top,bx,sheer(bx)-1],tint(C.rope,-.45),.55)}
  /* the mainmast: a round spar, lit on the side toward the light */
  g.fillStyle=lg(g,m.x,0,m.x+m.w,0,mc);g.fillRect(m.x,top,m.w,sheer(m.x)+4-top);
  R(g,m.x+.4,top,.6,sheer(m.x)+4-top,rgba(C.hi,.45));
  /* the foremast: from its foot behind the bow's rail, raking forward over the stem; tapered, lit along its upper side */
  const[fx,fy]=f.foot,[hx,hy]=f.head,dx=hx-fx,dy=hy-fy,l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;
  poly(g,[fx+nx*f.w0/2,fy+ny*f.w0/2,hx+nx*f.w1/2,hy+ny*f.w1/2,hx-nx*f.w1/2,hy-ny*f.w1/2,fx-nx*f.w0/2,fy-ny*f.w0/2],mc[0]);
  stroke(g,[fx-nx*f.w0*.25,fy-ny*f.w0*.25,hx-nx*f.w1*.2,hy-ny*f.w1*.2],rgba(C.hi,.6),.5);
  R(g,hx-1*k,hy-1*k,2*k,1.4*k,mc[2]);
  /* at Myra the foresail is furled and lashed along its mast, a slim roll beside the spar's upper half */
  if(st==='moored'||st==='storm'){const a=.36,b=.9,p=[];for(let i=0;i<=10;i++){const t=a+(b-a)*i/10,sw=(1.4+1.6*Math.sin(Math.PI*i/10))*G.k;p.push(fx+dx*t-nx*(f.w0*.4),fy+dy*t-ny*(f.w0*.4))}
    const q=[];for(let i=10;i>=0;i--){const t=a+(b-a)*i/10,sw=(1.2+1.8*Math.sin(Math.PI*i/10))*G.k;q.push(fx+dx*t-nx*(f.w0*.4+sw),fy+dy*t-ny*(f.w0*.4+sw))}
    poly(g,p.concat(q),C.sail[1]);stroke(g,q,rgba(C.sail[2],.8),.5);stroke(g,p,rgba(C.sail[0],.8),.5)}}

/* the cabin on the after deck, seen over the rail: low, planked lengthwise, a door and a small window, its roof a little proud */
function cabin(g,G,C){const{k,sheer}=G,c=G.cabin,x=c.x,w=c.w,by=sheer(x+w*.5)+2*k,ty=by-c.h-2*k,W=C.hull[1];
  R(g,x,ty,w,by-ty,W);
  clipTo(g,()=>R(g,x,ty,w,by-ty),()=>{for(let y=ty+2.4*k;y<by;y+=2.4*k){R(g,x,y,w,.5,'rgba(32,18,10,.4)');R(g,x,y+.5,w,.4,'rgba(255,224,180,.14)')}
    tex(g,'wood',.25,x,ty,w,by-ty,'overlay',.5);g.fillStyle=lg(g,x,0,x+w,0,['rgba(255,236,200,.12)','rgba(40,30,60,0)','rgba(40,30,60,.3)']);g.fillRect(x,ty,w,by-ty)});
  R(g,x-1.2*k,ty-1.6*k,w+2.4*k,1.8*k,tint(W,-.35));R(g,x-1.2*k,ty-1.6*k,w+2.4*k,.5,rgba(C.hi,.7));R(g,x-1.2*k,ty+.2*k,w+2.4*k,.5,'rgba(20,12,8,.5)');
  R(g,x+w*.62,ty+2.6*k,4.2*k,3.6*k,C.dark);R(g,x+w*.62,ty+6.2*k,4.2*k,.5,rgba(C.hi,.4));
  R(g,x+w*.22,ty+2.2*k,5*k,by-ty,tint(C.dark,.08));R(g,x+w*.22,ty+2.2*k,.6,by-ty,rgba(C.hi,.35))}

/* the main yard lowered: it lies fore and aft on the deck amidships with the mainsail furled on it, seen over the rail; the mast
   stands behind it as behind the rail */
function yardOnDeck(g,G,C,st){const{L,k,sheer,mast:m}=G,a=m.x-(st==='storm'?.15:.27)*L,b=m.x+.25*L;
  const yb=x=>sheer(x)-.4*k;
  /* the roll: furled cloth bunched under the yard, bellying a little between the points where it is tied in, which do not show */
  const th=x=>{const u=(x-a)/(b-a);return(3+2.6*Math.sin(Math.PI*u))*k},
    top=x=>yb(x)-th(x),P=[];for(let x=a;x<=b;x+=2)P.push(x,top(x));for(let x=b;x>=a;x-=2)P.push(x,yb(x));
  poly(g,P);g.fillStyle=lg(g,0,top(m.x)-1,0,yb(m.x),C.sail);g.fill();
  clipTo(g,()=>poly(g,P),()=>{const n=9;for(let i=0;i<n;i++){const u0=a+(b-a)*i/n,u1=a+(b-a)*(i+1)/n,um=(u0+u1)/2;
      g.fillStyle=lg(g,u0,0,u1,0,['rgba(255,244,214,.3)','rgba(255,244,214,0)','rgba(70,56,60,.3)']);g.fillRect(u0,top(um)-3,u1-u0,th(um)+6);
      g.strokeStyle='rgba(104,88,60,.5)';g.lineWidth=.45;g.beginPath();g.moveTo(u0+1,top(um)+th(um)*.35);g.quadraticCurveTo(um,top(um)+th(um)*.8,u1-1,top(um)+th(um)*.35);g.stroke()}
    tex(g,'mott',.3,a,top(m.x)-4,b-a,th(m.x)+8,'overlay',.5)});
  /* the yard on top of it: a long tapered spar, its arms reaching past the roll */
  const ya=a-.05*L,yb2=b+.06*L,yt=x=>{const u=(x-ya)/(yb2-ya);return top(clamp(x,a,b))-(1+.9*Math.sin(Math.PI*u))*k},
    Y=[];for(let x=ya;x<=yb2;x+=3)Y.push(x,yt(x)-.2);const Yb=[];for(let x=yb2;x>=ya;x-=3){const u=(x-ya)/(yb2-ya);Yb.push(x,yt(x)+(.9+1.3*Math.sin(Math.PI*u))*k)}
  poly(g,Y.concat(Yb),C.wood);stroke(g,Y,rgba(C.woodHi,.8),.5);
  comp(g,'multiply',.4,()=>{const q=[];for(let x=a;x<=b;x+=2)q.push(x,yb(x)+.6);for(let x=b;x>=a;x-=2)q.push(x,yb(x)+2.2*k);poly(g,q,'#6a5a78')})}

/* ---------- the stern ---------- */
/* the gallery: a platform jutting aft from the sternpost at the height of the after rail, on two slanting brackets; its rail is a row
   of upright slats between a deep top rail and a deep bottom beam, and it ends against the post */
function gallery(g,G,C){const{k,sheer}=G,q=G.gallery,yP=sheer(G.post.x)+.5*k,x0=q.x0,x1=q.x1,d=q.depth,h=q.rail,tr=1.6*k;
  /* the brackets under it, from the counter of the stern out to the platform's after end */
  const sx=G.edgeAt(G.STERN,yP+10*k);
  {const px=x0+(x1-x0)*.45,ey=yP+11*k,ex=G.edgeAt(G.STERN,ey)+.5;poly(g,[px-1.3*k,yP+d,px+1.3*k,yP+d,ex+1.4*k,ey+1.6*k,ex-.6*k,ey],C.wood);stroke(g,[px-1.3*k,yP+d,ex-.6*k,ey],rgba(C.woodHi,.55),.45)}
  /* the slats, then the top rail and the platform's edge, both deeper than a slat is wide */
  const yt=yP-h;comp(g,'multiply',.5,()=>R(g,x0,yt+tr,x1-x0,h-tr,'#3a3048'));
  for(let x=x0+1.2*k;x<x1-1.2*k;x+=2.4*k){R(g,x,yt+tr,1.1*k,h-tr,C.slat);R(g,x,yt+tr,.5,h-tr,rgba(C.hi,.45))}
  R(g,x0,yt,x1-x0,tr,C.rail);R(g,x0,yt,x1-x0,.5,C.hi);R(g,x0,yt+tr-.5,x1-x0,.5,'rgba(20,12,8,.45)');
  R(g,x0,yP,x1-x0,d,tint(C.rail,-.15));R(g,x0,yP,x1-x0,.5,rgba(C.hi,.7));R(g,x0,yP+d-.5,x1-x0,.5,'rgba(20,12,8,.5)');
  R(g,x0-.6*k,yt,1.6*k,yP+d-yt,tint(C.rail,-.1));R(g,x0-.6*k,yt,.5,yP+d-yt,rgba(C.hi,.6))}

/* ---------- the sternpost: a swan's neck (decided by the maintainer, 26 November 2026) ----------
   One design, in its own measure (u forward toward the bow, v up, both in units of about a metre at the deck views), that every view
   maps into its picture (swanDraw). A swan swimming the way the ship sails: the neck rises from where the gallery meets the hull on the
   bow side of its loop, leaning a little forward, turns over at the top toward the stern and comes down on the stern side, over the
   gallery (clear above its rail), so that the loop is nearly closed and the open sky inside it is a tall narrow oval. The head hangs
   bowed there, its bill pointing toward the bow and down, toward the neck, almost touching it. The timber is thick (at its foot about
   twice the loom of a steering oar) and stays full all the way round. A carved ornament of plain weathered wood: one piece, no outline,
   lit by its scene; no figurehead, no gilding, nothing set under it. */
const SWAN={/* the neck's middle line, [u, v, thickness]; broad heavy timber all the way round, tall narrow sky oval inside, swelling smoothly into the rounded skull */
  line:[[0,0,.88],[.15,.48,.78],[.35,1.05,.70],[.46,1.68,.66],[.42,2.28,.64],[.21,2.75,.62],[-.14,2.94,.60],[-.45,2.78,.56],[-.58,2.44,.51],[-.60,2.12,.42],[-.57,1.84,.55],[-.50,1.63,.58],[-.40,1.46,.34]],
  head:{c:[-.51,1.66],bill:[.49,-.872],a:.30,b:.29,bl:.52},athwart:.54,top:3.24};
function cr(P,n){const out=[];for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
  for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t,f=(k)=>.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3);out.push([f(0),f(1),f(2)])}}
  out.push(P[P.length-1].slice());return out}
/* swanDraw(g, M, cols, Ld, opt): M(u, v) gives [x, y, px per unit] in the picture; cols {mid, sh, lit, bill, billLit, eye}; Ld the
   direction toward the light in the picture (unit vector); opt {fs, fc} the foreshortening (|sin|, |cos| of yaw; side view 1, 0).
   The neck and rounded skull form one continuous carved silhouette with true 3D elliptical cross-section projection; its lit and shaded
   sides are flat bands clipped inside it, so it stays one piece with no outline, no seam and no hole; then the bill in a warmer tone,
   long and flattish with a small basal knob, and the eye as a small square. */
function swanDraw(g,M,cols,Ld,opt){opt=opt||{};const fs=opt.fs!=null?opt.fs:1,fc=opt.fc!=null?opt.fc:0,aw=SWAN.athwart;
  const S=cr(SWAN.line,8),n=S.length,Q=[];
  for(let i=0;i<n;i++){const a=S[Math.max(0,i-1)],c=S[Math.min(n-1,i+1)],du=c[0]-a[0],dv=c[1]-a[1],dl=Math.hypot(du,dv)||1,tu=du/dl,tv=dv/dl,
      l2=Math.hypot(tu*fs,tv)||1,t=S[i][2],tw=t*aw,tEff=Math.hypot(t*fs,tw*Math.abs(tv)*fc)/l2,[x,y,k]=M(S[i][0],S[i][1]);
    Q.push([x,y,tEff*k])}
  /* build a ribbon from a centerline P, untangling any inner-bend fold so tight foreshortened arches never notch */
  const ribOf=(P,scale,off)=>{const m=P.length,Lo=[],Ro=[];
    for(let i=0;i<m;i++){const a=P[Math.max(0,i-1)],c=P[Math.min(m-1,i+1)],tx=c[0]-a[0],ty=c[1]-a[1],l=Math.hypot(tx,ty)||1,nx=-ty/l,ny=tx/l,
        w=P[i][2]*scale/2,ox=Ld[0]*P[i][2]*off,oy=Ld[1]*P[i][2]*off;
      Lo.push([P[i][0]+ox+nx*w,P[i][1]+oy+ny*w]);Ro.push([P[i][0]+ox-nx*w,P[i][1]+oy-ny*w])}
    for(const E of[Lo,Ro])for(let pass=0;pass<3;pass++)for(let i=1;i<m;i++){
      const tx=P[i][0]-P[i-1][0],ty=P[i][1]-P[i-1][1];
      if((E[i][0]-E[i-1][0])*tx+(E[i][1]-E[i-1][1])*ty<0){const mx=(E[i][0]+E[i-1][0])/2,my=(E[i][1]+E[i-1][1])/2;E[i-1]=[mx,my];E[i]=[mx,my]}}
    const Lx=[],Rx=[];for(let i=0;i<m;i++){Lx.push(Lo[i][0],Lo[i][1]);Rx.push(Ro[i][0],Ro[i][1])}
    return Lx.concat(ptsBackG(Rx))};
  const neck=ribOf(Q,1,0);
  /* the head frame, built from where its middle and bill fall: the rounded skull is part of the continuous curve, with a subtle
     cranium fill so the crown and cheek stay full at any angle */
  const H=SWAN.head,bd=H.bill,pt=[-bd[1],bd[0]],top=pt[0]>0?pt:[-pt[0],-pt[1]],U=(a,b)=>M(H.c[0]+bd[0]*a+top[0]*b,H.c[1]+bd[1]*a+top[1]*b);
  const hc=U(0,0),sc=hc[2],r0=H.a*.76,bt=U(r0+H.bl,0),bv=[bt[0]-hc[0],bt[1]-hc[1]],bL=Math.hypot(...bv)||1,bx=bv[0]/bL,by=bv[1]/bL,qx=-by,qy=bx,
    along=Math.max(bL/(r0+H.bl)*H.a,H.b*.92*sc),
    br=H.b*Math.hypot(fs,aw*fc)*sc,
    /* the forehead / upper-culmen side of the bill: toward the inner oval and top */
    sg=(qx*(U(0,.1)[0]-hc[0])+qy*(U(0,.1)[1]-hc[1]))>=0?1:-1;
  const skull=[];for(let i=0;i<24;i++){const th=i/24*6.2832,c=Math.cos(th),sn=Math.sin(th),
      l=c<0?along*1.04:along*.88,w=sn*sg>0?br*.98:br*.96;
    skull.push(hc[0]+bx*c*l+qx*sn*w,hc[1]+by*c*l+qy*sn*w)}
  /* extended centerline for shading bands only: extends past both ends (below the foot and past the bill root) so every flat band
     flows seamlessly from foot through arch and skull without stopping short or making a cap */
  const d0x=Q[1][0]-Q[0][0],d0y=Q[1][1]-Q[0][1],d0l=Math.hypot(d0x,d0y)||1,qn=Q[n-1],
    Qsh=[[Q[0][0]-d0x/d0l*Q[0][2],Q[0][1]-d0y/d0l*Q[0][2],Q[0][2]],...Q,[qn[0]+bx*br*1.6,qn[1]+by*br*1.6,qn[2]]];
  /* both outlines wound the same way, so where the neck runs into the skull the shape stays whole (no hole where they overlap) */
  const area=p=>{let A=0;for(let i=0;i<p.length;i+=2){const j=(i+2)%p.length;A+=p[i]*p[j+1]-p[j]*p[i+1]}return A},wind=p=>area(p)<0?ptsBackG(p):p,
    sub=p=>{p=wind(p);g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()},body=()=>{g.beginPath();sub(neck);sub(skull)};
  clipTo(g,body,()=>{poly(g,neck,cols.mid);poly(g,skull,cols.mid);
    /* one unified set of flat bands of light and shadow along the whole carved piece, reaching both edges cleanly with no outline */
    const band=(off,scW,col)=>poly(g,ribOf(Qsh,scW,off),col);
    band(-.38,.56,mix(cols.mid,cols.sh,.45));
    band(-.48,.42,cols.sh);
    band(.38,.56,mix(cols.mid,cols.lit,.38));
    band(.48,.32,mix(cols.mid,cols.lit,.68))});
  /* the bill: long and flattish, nearly parallel-sided to a bluntly rounded tip, with a small rounded knob at its root; warmer wood
     with flat lit and shaded bands and no outline */
  const rx=hc[0]+bx*along*.74,ry=hc[1]+by*along*.74,tx=bt[0],ty=bt[1],dx=tx-rx,dy=ty-ry,
    Bpt=(t,w)=>[rx+dx*t+qx*w*sc*sg,ry+dy*t+qy*w*sc*sg],
    Bp=[...Bpt(-.04,.13),...Bpt(.03,.168),...Bpt(.12,.166),...Bpt(.22,.112),...Bpt(.60,.102),...Bpt(.85,.088),...Bpt(.95,.055),...Bpt(1.0,.005),
      ...Bpt(.97,-.055),...Bpt(.85,-.075),...Bpt(.46,-.092),...Bpt(-.04,-.108)];
  const bSh=mix(cols.bill,cols.sh,.48),bKnob=mix(cols.bill,cols.sh,.64);
  poly(g,Bp,cols.bill);
  clipTo(g,()=>poly(g,Bp),()=>{
    /* shaded underside and lit upper bridge of the bill */
    const lo=[...Bpt(-.06,-.02),...Bpt(.98,-.01),...Bpt(1.04,-.16),...Bpt(-.06,-.18)];
    const hi=[...Bpt(.16,.16),...Bpt(1.02,.15),...Bpt(.98,.032),...Bpt(.20,.048)];
    poly(g,lo,bSh);poly(g,hi,cols.billLit);
    /* small dark-warm basal knob tucked against the forehead */
    poly(g,[...Bpt(-.05,.20),...Bpt(.16,.20),...Bpt(.21,.10),...Bpt(.08,.075),...Bpt(-.05,.08)],bKnob)});
  /* the eye: a small square behind the bill root, toward the forehead side */
  const es=sc>10?1:.5,ex=Math.round((hc[0]+bx*along*.18+qx*br*.24*sg)*2)/2,ey=Math.round((hc[1]+by*along*.18+qy*br*.24*sg)*2)/2;
  R(g,ex-es/2,ey-es/2,es,es,cols.eye)}

/* the sternpost from the side: the swan's neck rising from the forward end of the gallery. kind 'curl' keeps the plain scroll that was
   shown as a choice before the maintainer chose the swan. */
function sternpost(g,G,C,kind){const{k,sheer}=G,x=G.post.x,y=sheer(x)+1.5*k,s=G.o.swan||12.6;
  if(kind!=='curl'){swanDraw(g,(u,v)=>[x+u*s,y-v*s,s],{mid:C.post,sh:tint(C.post,-.42),lit:C.postHi,bill:mix(C.post,'#c06a3a',.45),billLit:tint(mix(C.post,'#e0904e',.5),.3),eye:C.dark},[-.6,-.8]);return}
  const lit=C.postHi,mid=C.post,sh=tint(C.post,-.4),CL=[];
  for(let i=0;i<=16;i++){const t=i/16;CL.push([x-5*k*Math.sin(t*Math.PI*.8)+2*k*t*t,y-30*k*t,(5.2-2*t)*k])}
  const[tx,ty]=CL[CL.length-1],cx=tx+4.6*k,cy=ty;for(let i=1;i<=26;i++){const t=i/26,a=Math.PI*(1+2*t),R0=(4.6-3*t)*k;CL.push([cx+R0*Math.cos(a),cy+R0*Math.sin(a),(3.2-1.8*t)*k])}
  const pass=(c,f,dx)=>{g.strokeStyle=c;g.lineCap='round';g.lineJoin='round';for(let i=1;i<CL.length;i++){g.lineWidth=Math.max(.5,CL[i][2]*f);g.beginPath();g.moveTo(CL[i-1][0]+dx,CL[i-1][1]);g.lineTo(CL[i][0]+dx,CL[i][1]);g.stroke()}g.lineCap='butt'};
  pass(sh,1,0);pass(mid,.72,-.45*k);pass(rgba(lit,.8),.26,-1.1*k)}

/* ---------- the steering oar at the near quarter ---------- */
/* the loom comes up to its head at the rail's top, where the tiller is set in (inboard, out of sight), and runs down and aft beyond
   the curve of the stern to the broad blade; it ends at the rail and crosses no rail. Moored or in the storm it is lashed up: the blade hangs clear of the water, a lashing slanting from its neck up to the
   gallery. At the wreck the lashings have been loosed (27:40) and the blade is in the water. */
function oar(g,G,C,st){const{k,wl,sheer}=G,[hx,hy]=G.oar.head,down=st==='wreck',bl=down?wl+8*k:wl-11*k,ang=down?.36:.42,
    ux=-Math.sin(ang),uy=Math.cos(ang),len=(bl-hy)/uy,fx=hx+ux*len,fy=bl,nx=-uy,ny=ux,w=G.oar.w,b=G.oar.blade,bs=len*.68;
  const bx=hx+ux*bs,by=hy+uy*bs;
  /* the loom, and the blade widening from its neck */
  poly(g,[hx+nx*w*.5,hy+ny*w*.5,bx+nx*w*.5,by+ny*w*.5,bx-nx*w*.5,by-ny*w*.5,hx-nx*w*.5,hy-ny*w*.5],C.wood);
  poly(g,[bx+nx*w*.5,by+ny*w*.5,bx+ux*4*k+nx*b*.5,by+uy*4*k+ny*b*.5,fx+nx*b*.5,fy+ny*b*.5,fx+ux*1.5*k,fy+uy*1.5*k,fx-nx*b*.5,fy-ny*b*.5,bx+ux*4*k-nx*b*.5,by+uy*4*k-ny*b*.5,bx-nx*w*.5,by-ny*w*.5],tint(C.wood,.06));
  stroke(g,[hx+nx*w*.3,hy+ny*w*.3,bx+nx*w*.3,by+ny*w*.3,bx+ux*4*k+nx*b*.4,by+uy*4*k+ny*b*.4,fx+nx*b*.4,fy+ny*b*.4],rgba(C.woodHi,.7),.5);
  stroke(g,[hx-nx*w*.45,hy-ny*w*.45,bx-nx*w*.45,by-ny*w*.45],'rgba(16,10,8,.45)',.45);
  /* its head, squared, at the rail's top: the tiller set into it lies inboard, behind the rail, so the loom crosses no rail */
  poly(g,[hx-1.4*k,hy-1.6*k,hx+1.4*k,hy-1.6*k,hx+1.4*k,hy+1.2*k,hx-1.4*k,hy+1.2*k],tint(C.wood,-.15));R(g,hx-1.4*k,hy-1.6*k,2.8*k,.5,rgba(C.woodHi,.8));
  /* the lashing that holds it up, from the blade's neck to the gallery's after end */
  if(!down){const lx=bx+ux*2*k,ly=by+uy*2*k;hawserS(g,lx,ly,G.gallery.x0+3*k,sheer(G.post.x)+G.gallery.depth+1,1.2*k,C)}}

/* a rope with a little sag and its shadow, in the light's rope color */
function hawserS(g,x0,y0,x1,y1,sag,C,w){const p=[];for(let i=0;i<=12;i++){const t=i/12;p.push(x0+(x1-x0)*t,y0+(y1-y0)*t+sag*Math.sin(Math.PI*t))}
  stroke(g,p.map((v,i)=>i%2?v+.5:v),C.ropeSh,w||.6);stroke(g,p,C.rope,w||.6);return p}

/* ---------- anchors (shown only at Myra: CONTRIBUTING section 3, the exception of 26 November 2026) ---------- */
/* anchor(g, a): a hook anchor of wood with a heavy lead stock. The ring at the head (a small square), the stock just below it, the
   shank, and at the crown two arms that curve up and out, each ending in a broad fluke. view 'side': the arms lie in the picture's
   plane, so the stock is seen end-on, a short thick block; view 'deck': it lies on a deck, the stock across (a.sx, a.sy: the stock's
   half-length as a vector in the picture, foreshortened), one arm up and one down to the planks. */
function anchor(g,a){const C=a.C||LIGHT[a.light]||LIGHT.day,len=a.len,ang=a.ang||0,s=len/30,W=a.wood||'#8a6c4c',Wd=tint(W,-.35),Wl=tint(W,.45),
    deck=a.view==='deck';
  g.save();g.translate(a.x,a.y);g.rotate(-ang);
  /* in the anchor's own frame: the ring at 0, the shank running down +y to the crown at 30 s */
  const Yc=21*s,Rr=9*s,armPt=(sd,al,off)=>[sd*(Rr+off)*Math.sin(al),Yc+(Rr+off)*Math.cos(al)];
  /* the arms, an arc from the crown out and up on each side, thick at the crown and thinner toward the tips; in view 'deck' the lower
     arm (sd 1) is foreshortened, its tip on the planks */
  for(const sd of[-1,1]){const f=deck&&sd>0?.62:1,out=[],inn=[];
    for(let i=0;i<=12;i++){const al=1.78*i/12,w=(1.7-.8*i/12)*s;const p=armPt(sd,al,w*.5),q=armPt(sd,al,-w*.5);out.push(p[0]*f,p[1]);inn.push(q[0]*f,q[1])}
    poly(g,out.concat(ptsBackG(inn)),a.mono||(sd<0?tint(W,.06):W));if(!a.mono){stroke(g,(sd<0?out:inn).slice(0,22),rgba(Wl,.75),.45);stroke(g,(sd<0?inn:out).slice(4),rgba(Wd,.7),.4)}
    /* the fluke: a broad spade on the inner side of the arm, near its tip */
    const t0=armPt(sd,1.2,-.6*s),t1=armPt(sd,1.78,-.4*s),m=armPt(sd,1.5,-3.2*s);
    poly(g,[t0[0]*f,t0[1],m[0]*f,m[1],t1[0]*f,t1[1]],a.mono||(sd<0?tint(W,.12):tint(W,-.12)));if(!a.mono)stroke(g,[t0[0]*f,t0[1],m[0]*f,m[1]],rgba(Wl,.6),.4)}
  /* the shank, a little wider toward the crown, lit along its left edge */
  poly(g,[-1*s,3.6*s,1*s,3.6*s,1.25*s,30.4*s,-1.25*s,30.4*s],a.mono||W);
  if(!a.mono){stroke(g,[-.8*s,4*s,-1*s,29.6*s],rgba(Wl,.75),.5);stroke(g,[.9*s,4*s,1.1*s,29.6*s],rgba(Wd,.7),.45)}
  /* the lead collar binding the arms to the shank at the crown */
  poly(g,[-1.9*s,26.6*s,1.9*s,26.6*s,1.9*s,29.4*s,-1.9*s,29.4*s],a.mono||C.lead);if(!a.mono)stroke(g,[-1.9*s,26.8*s,1.9*s,26.8*s],C.leadHi,.45);
  /* the stock, end-on in the side view: a heavy block of lead across the head of the shank */
  if(!deck){poly(g,[-1.8*s,1*s,1.8*s,1*s,1.7*s,4.6*s,-1.7*s,4.6*s],a.mono||C.lead);if(!a.mono){stroke(g,[-1.8*s,1.2*s,1.8*s,1.2*s],C.leadHi,.5);stroke(g,[-1.7*s,4.4*s,1.7*s,4.4*s],'rgba(20,20,30,.55)',.45);R(g,-1.6*s,1.6*s,.5,2.6*s,rgba(C.leadHi,.5))}}
  /* the ring at the head: a small square, not a round */
  poly(g,[-1.1*s,-1.6*s,1.1*s,-1.6*s,1.1*s,1.2*s,-1.1*s,1.2*s],a.mono||tint(C.lead,-.25));if(!a.mono)poly(g,[-.45*s,-.9*s,.45*s,-.9*s,.45*s,.3*s,-.45*s,.3*s],C.dark);
  g.restore();
  /* view 'deck': the stock lies across the head, foreshortened (a.sx, a.sy its half-length in the picture) */
  if(deck){const cx=a.x+Math.sin(ang)*2.6*s,cy=a.y+Math.cos(ang)*2.6*s,sx=a.sx,sy=a.sy,h=1.5*s;
    poly(g,[cx-sx,cy-sy-h,cx+sx,cy+sy-h*.8,cx+sx,cy+sy+h*.7,cx-sx,cy-sy+h],C.lead);stroke(g,[cx-sx,cy-sy-h,cx+sx,cy+sy-h*.8],C.leadHi,.5);
    stroke(g,[cx-sx,cy-sy+h,cx+sx,cy+sy+h*.7],'rgba(20,20,30,.5)',.45)}}

/* two anchors at the bow, hung by their rings from the rail near the stem, their arms flat against the planking */
function bowAnchors(g,G,C){const{L,k,sheer,x1}=G;
  for(const[u,dy,len]of[[.875,3,28],[.93,6,25]]){const x=x1-(1-u)*L,y=sheer(x)+dy*k;
    hawserS(g,x-1*k,sheer(x)-.4,x,y,0,C,.7*k);
    comp(g,'multiply',.45,()=>anchor(g,{x:x+1.4*k,y:y+1.2*k,len:len*k,ang:-.12,C,mono:'#4a3a48'}));
    anchor(g,{x,y,len:len*k,ang:-.12,C})}}

/* ---------- storm and wreck ---------- */
/* the undergirding (27:17): ropes passed under her from side to side and hove tight on deck. Each comes over the rail and runs down the
   side at a slant (steeper at the rail, flatter as it goes under the belly toward the keel), so it crosses the strakes at a slant and
   is never square to them. Five of them, spread along the middle body, side by side; none crosses another. */
function girding(g,G,C){const{L,k,sheer,keel}=G;
  for(let i=0;i<5;i++){const xr=G.x0+(.36+i*.11)*L,ya=sheer(xr)+.2,yb0=keel(xr),h=yb0-ya,xb=xr-1.05*h,yb=keel(xb)+1,
      c1=[xr-.32*h,ya+h*.42],c2=[xb+.5*h,yb-h*.1],
      p=[];for(let j=0;j<=20;j++){const t=j/20,u=1-t;p.push(u*u*u*xr+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*xb,u*u*u*ya+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*yb)}
    stroke(g,p.map((v,j)=>j%2?v+.8:v+.4),'rgba(16,10,8,.5)',1.1*k);stroke(g,p,C.rope,.9*k);stroke(g,p.map((v,j)=>j%2?v-.35:v-.15),rgba(C.hi,.35),.4);
    /* where it comes over the rail from the deck: a short bend */
    stroke(g,[xr+2.6*k,ya-.2,xr+1.2*k,ya-1.5*k,xr-.4*k,ya-.6*k,p[2],p[3]],C.rope,.9*k)}}

/* the skiff hoisted aboard and lashed: it lies keel up on the deck between the cabin and the lowered yard, only its bottom showing over
   the rail; its
   lashings run from its ends down to the rail at a slant */
function skiffAboard(g,G,C){const{L,k,sheer}=G,a=G.x0+.235*L,b=a+.13*L,top=x=>{const u=(x-a)/(b-a);return sheer(x)-(8.5*Math.sin(Math.PI*Math.min(1,u*1.05))+.6)*k};
  const P=[];for(let x=a;x<=b;x+=1.5)P.push(x,top(x));P.push(b,sheer(b)+2,a,sheer(a)+2);
  poly(g,P);g.fillStyle=lg(g,0,top((a+b)/2),0,sheer(a),[tint(C.hull[1],.06),C.hull[2]]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{for(const f of[.4,.7]){const q=[];for(let x=a;x<=b;x+=2)q.push(x,top(x)+(sheer(x)-top(x))*f);stroke(g,q,'rgba(20,12,8,.4)',.5)}tex(g,'wood',.25,a,top((a+b)/2),b-a,10*k,'overlay',.5)});
  const K=[];for(let x=a+2;x<=b-2;x+=1.5)K.push(x,top(x)-.4);stroke(g,K,rgba(C.hi,.6),.6);
  stroke(g,[a+1,top(a+1),a-5*k,sheer(a-5*k)],C.rope,.6);stroke(g,[b-1,top(b-1),b+5*k,sheer(b+5*k)],C.rope,.6)}

/* the break: where the stern has gone, a ragged line from the rail down to the keel well forward of the stern */
function breakLine(G){const{L,k,x0,wl,D,sheer}=G,r=rng(23041),xa=x0+.17*L,p=[];
  for(let i=0;i<=12;i++){const t=i/12,y0=sheer(xa)+.6*k,y=y0+(wl+D+4*k-y0)*t,x=xa+(i?(r()-.5)*7*k:0)+t*.06*L;p.push(x,i?y:y0-12*k)}return p}
/* the broken end: the hull's inside dark in the gap, and a few plank ends sprung loose, each standing alone at a slant */
function broken(g,G,C,brk,r){const{k}=G;
  const S=[];for(let i=0;i<brk.length;i+=2)S.push(brk[i]+(7-5*i/brk.length)*k+(r()-.5)*2*k,brk[i+1]);
  clipTo(g,()=>poly(g,hullPts(G)),()=>poly(g,brk.concat(ptsBackG(S)),C.dark));
  for(let i=2;i<brk.length-4;i+=4){const x=brk[i],y=brk[i+1],l=(5+r()*6)*k,a=-.5+r()*.3;
    const ex=x-Math.cos(a)*l,ey=y+Math.sin(a)*l;poly(g,[x,y-.8*k,x,y+.8*k,ex,ey+.6*k,ex,ey-.6*k],tint(C.hull[1],(r()-.5)*.2));stroke(g,[x,y-.8*k,ex,ey-.6*k],rgba(C.hi,.4),.4)}}
const ptsBackG=p=>{const q=[];for(let i=p.length-2;i>=0;i-=2)q.push(p[i],p[i+1]);return q};

/* the foresail set at the wreck (27:40), to drive her ashore: hoisted on its yard at the raked mast's head, the yard askew, the sail
   full of the wind from astern and bellying forward; torn along its foot, ragged, with a long strip ripped loose and streaming forward.
   It hangs in front of the mast, so it hides the mast from its foot to the yard and the yard ends no mast. Its seams run one way, down
   from the yard, curving with the belly. */
function foresail(g,G,C,flap){const{k,fore:f}=G,[hx,hy]=f.head,ask=.24,a=19*k,ca=Math.cos(ask),sa=Math.sin(ask),hS=30*k,r=rng(23071),
    yl=[hx-a*ca,hy+a*sa],yr=[hx+a*ca,hy-a*sa],bz=(p,t)=>{const u=1-t;return[u*u*u*p[0]+3*u*u*t*p[2]+3*u*t*t*p[4]+t*t*t*p[6],u*u*u*p[1]+3*u*u*t*p[3]+3*u*t*t*p[5]+t*t*t*p[7]]};
  const cl=[yr[0]+5*k,yr[1]+hS],tk=[yl[0]+6*k,yl[1]+hS*.86],
    LE=[yr[0],yr[1]+1*k,yr[0]+13*k,yr[1]+hS*.3,yr[0]+13*k,yr[1]+hS*.75,cl[0],cl[1]],
    AF=[tk[0],tk[1],yl[0]+3*k,yl[1]+hS*.55,yl[0]+.5*k,yl[1]+hS*.25,yl[0],yl[1]+1*k];
  const P=[yl[0],yl[1]+1*k];for(let i=0;i<=10;i++)P.push(...bz(LE,i/10));
  /* the torn foot: ragged tongues from the clew back to the tack */
  for(const[t,d]of[[.08,1.5],[.15,-2.5],[.24,4.5],[.3,-1],[.41,2],[.47,-3.5],[.58,6.5],[.63,-2],[.74,1.2],[.83,-4],[.9,2.4]]){const x=cl[0]+(tk[0]-cl[0])*t,y=cl[1]+(tk[1]-cl[1])*t+3*k*Math.sin(Math.PI*t);P.push(x+(r()-.5)*1.4*k,y+d*k)}
  for(let i=0;i<=10;i++)P.push(...bz(AF,i/10));
  poly(g,P,C.sail[0]);
  clipTo(g,()=>poly(g,P),()=>{g.fillStyle=lg(g,yl[0],0,cl[0]+10*k,0,[rgba(C.sail[2],.7),rgba(C.sail[2],.35),'rgba(255,240,210,.12)',rgba(C.sail[2],.25)]);g.fillRect(yl[0]-4,yr[1]-4,a*2+20*k,hS+10*k);
    for(let i=1;i<6;i++){const u=i/6,tx=yl[0]+(yr[0]-yl[0])*u,ty=yl[1]+(yr[1]-yl[1])*u+1*k,bx=tk[0]+(cl[0]-tk[0])*u,by=tk[1]+(cl[1]-tk[1])*u+3*k*Math.sin(Math.PI*u);
      g.strokeStyle=rgba(C.sail[2],.5);g.lineWidth=.45;g.beginPath();g.moveTo(tx,ty);g.quadraticCurveTo((tx+bx)/2+9*k*Math.sin(Math.PI*u)+3*k,(ty+by)/2,bx,by);g.stroke()}
    tex(g,'mott',.3,yl[0]-4,yr[1]-4,a*2+20*k,hS+10*k,'overlay',.55)});
  stroke(g,P.slice(0,24),rgba(C.hi,.5),.5);
  /* the strip torn loose from the foot near the tack, streaming forward and down in the wind */
  const s0=[tk[0]+5*k,tk[1]+2*k],sw=1.8*k,L2=14*k,ang=.5+flap*.25,ex=s0[0]+Math.cos(ang)*L2,ey=s0[1]+Math.sin(ang)*L2;
  poly(g,[s0[0]-sw,s0[1],s0[0]+sw,s0[1]-.4*k,(s0[0]+ex)/2+sw,(s0[1]+ey)/2+2*k,ex+.6*k,ey,ex-.8*k,ey+.6*k,(s0[0]+ex)/2-sw,(s0[1]+ey)/2+2.6*k],tint(C.sail[1],-.04));
  /* the yard, askew across the sail's head */
  poly(g,[yl[0]-2*k,yl[1]+.4*sa,yr[0]+2*k,yr[1]-.4*sa,yr[0]+2*k,yr[1]+1.4*k,yl[0]-2*k,yl[1]+1.4*k],C.wood);stroke(g,[yl[0]-2*k,yl[1]+.4*sa,yr[0]+2*k,yr[1]-.4*sa],rgba(C.woodHi,.7),.5)}

/* ---------- wreckage ---------- */
/* wreckage(g, o): planks and pieces of the ship afloat, each alone: a long low piece at the sea's one slant, its lit top edge, its
   dark wet side and the water's foam lace along its foot. None touches or lies across another. */
function wreckage(g,o){const C=LIGHT[o.light]||LIGHT.dawn,sl=o.slant||-.06,r=rng(o.seed||23051);
  for(const[x,y,len,kind]of o.pieces){const h=kind==='beam'?2.2:1.4,dx=Math.cos(sl)*len,dy=Math.sin(sl)*len,c=tint(C.hull[1],(r()-.5)*.25);
    poly(g,[x,y,x+dx,y+dy,x+dx,y+dy+h,x,y+h],c);stroke(g,[x,y,x+dx,y+dy],rgba(C.hi,.55),.5);R(g,x+dx-.5,y+dy,.5,h,'rgba(10,8,8,.4)');
    stroke(g,[x-1,y+h+.3,x+dx+1,y+dy+h+.3],'rgba(236,240,236,.6)',.5)}}

/* ======== The deck seen from aboard, looking aft ========
   deck(g, o) paints a walkable deck for a 320 by 144 room: the after half of the grain ship's deck in perspective, seen from just
   forward of her mainmast, a little to starboard of her middle line, looking aft. Laid out in the ship's own measure (metres) and
   projected (geoDeck), so the planks, the bulwarks, the things on deck and their footprints agree. The deck is wide (her half-beam is
   5.2 m against the coaster's 2.9 in shared/ship.js), and it rises aft to the after deck, where the cabin stands across it with the
   heads of the two steering oars at the quarters beside it, the gallery and the sternpost beyond.
     o.beyond(g, D)  paints what lies beyond the ship: sky, sea, land (D the geometry; D.hz the horizon). By default a plain placeholder
                     sky with a harbor's shore across the whole horizon. The mainmast's foot stands in the right foreground and the mast
                     runs out of the top of the picture: whatever the room paints beyond must keep land behind it (x 210..245 at the
                     horizon), so that it stands across no line of sea and sky. Everything else of the ship that rises above the eye
                     (the cabin, the oar heads, the post) stands where the stern, which rises above the horizon aft, is behind it.
     o.lean          true: the small lean-to of old sailcloth along the port rail (Paul's, Chapter Twenty-Two): its upper edge laid over
                     the rail and made fast outboard, out of sight, its lower edge pegged to the deck by two cords at its ends; no pole
                     under it and nothing hanging from the middle of anything.
     o.anchor        true (default): the spare anchor lying on the deck by the starboard rail (the exception of 26 November 2026)
     o.figs          [[y, fn(g)], ...]: people, each drawn at the depth of its feet among the things on deck
     o.light         'day' (default)
   What it promises (CONTRIBUTING sections 3 and 4): the deck planks run fore and aft and their butts are staggered, each inside its own
   plank; the bulwarks are planked in strakes with no post on their rails; the hatch's ladder shows only its two rails standing out of
   the hatch, its rungs inside stopping short of the rails; the windlass's drum lies between two cheeks as high as itself, with no post
   above; the lean-to has no pole; the lamp-less day has no round glow behind any head; the steering oars' heads and tillers meet at a
   corner; the anchor lies across the deck with its stock along the planks, foreshortened. */
const DG={F:150,E:1.7,hz:66,cx:160,cam:.6,ZS:17.5,B:5.2};
function geoDeck(o){o=o||{};const hz=o.hz!=null?o.hz:DG.hz,F=DG.F,E=DG.E,cx=DG.cx,cam=DG.cam,
    P=(x,y,z)=>[cx+F*(x-cam)/z,hz+F*(E-y)/z],
    b=z=>z<=8?DG.B:z>=DG.ZS?1.7:1.7+(DG.B-1.7)*Math.sqrt(Math.max(0,1-Math.pow((z-8)/(DG.ZS-8),2.4))),
    s=z=>z<=9?0:1.25*Math.pow(Math.min(1,(z-9)/(DG.ZS-9)),1.8),
    rh=z=>1.05+(z>11?.28*Math.min(1,(z-11)/6):0),
    /* the stern's rail sweeps up from both quarters to the foot of the post, which grows out of its peak */
    rx=(x,z)=>rh(z)+1.15*Math.pow(Math.max(0,1-Math.abs(x)/1.7),1.6)*clamp((z-(DG.ZS-.6))/.6,0,1),
    C=[];
  for(let z=2.2;z<DG.ZS;z+=z<8?.6:.25)C.push([-b(z),z]);
  for(let i=0;i<=8;i++){const x=-1.7+3.4*i/8;C.push([x,DG.ZS+.25*(1-Math.pow(x/1.7,2))])}
  for(let z=DG.ZS-.25;z>=2.2;z-=z<8?.6:.25)C.push([b(z),z]);
  const N=C.map((p,i)=>{const a=C[Math.max(0,i-1)],c=C[Math.min(C.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1;return[tz/l,-tx/l]}),
    zOfY=Y=>F*E/(Y-hz),
    things={mast:[3.3,3.9,4.0,4.6,9],hatch:[-1.5,1.5,6.8,9.2,.45],windlass:[.6,2.8,10.4,11.0,.72],cabin:[-2.6,2.6,11.3,14.2,1.75],
      anchor:[1.0,2.9,4.9,5.7,.8],lean:[-5.2,-3.2,5.6,8.4,1.05],bed:[-4.9,-3.9,6.0,7.4,.4],jar:[-4.9,-4.4,8.9,9.4,.7],coil:[2.5,3.1,6.3,6.9,.18],coil2:[-1.9,-1.2,9.8,10.4,.18]},
    footOf=([x0,x1,z0,z1])=>{const a=P(x0,0,z0),c=P(x1,0,z0),d=P(x0,0,z1),e=P(x1,0,z1),X0=Math.min(a[0],d[0]),X1=Math.max(c[0],e[0]);return[+X0.toFixed(1),+d[1].toFixed(1),+(X1-X0).toFixed(1),+(a[1]-d[1]).toFixed(1)]},
    foot={};for(const k in things)foot[k]=footOf(things[k]);
  const L=DLIGHT[o.light]||DLIGHT.day;
  return{hz,F,E,cam,P,b,s,rh,rx,C,N,zOfY,things,foot,walk:[8,312,102,140],L,o,edge:(Y,sd)=>{const z=zOfY(Y);return P(sd*b(z),0,z)[0]}}}
const DLIGHT={day:{amb:[.6,.6,.68],sun:[.62,.58,.5],d:[.42,.78,-.46]}};
/* the light on a face of albedo c whose outward normal is n */
function lit(D,c,n,k){const L=D.L,l=Math.hypot(...L.d),q=Math.max(0,(n[0]*L.d[0]+n[1]*L.d[1]+n[2]*L.d[2])/l/(Math.hypot(...n)||1))*(k==null?1:k),h=hex(c);
  return toHex(h[0]*(L.amb[0]+L.sun[0]*q)*1.12,h[1]*(L.amb[1]+L.sun[1]*q)*1.12,h[2]*(L.amb[2]+L.sun[2]*q)*1.12)}
/* where a point's shadow falls on the deck (height y above the deck at z) */
function castD(D,x,y,z){const d=D.L.d;return D.P(x-y*d[0]/d[1],D.s(z),z-y*d[2]/d[1])}
function softD(g,p,a){const cx=p.filter((_,i)=>i%2===0).reduce((s,v)=>s+v,0)/(p.length/2),cy=p.filter((_,i)=>i%2).reduce((s,v)=>s+v,0)/(p.length/2);
  for(const[k,al]of[[1.07,.28],[1,.42],[.93,.36]])comp(g,'multiply',(a||1)*al,()=>poly(g,p.map((v,i)=>i%2?cy+(v-cy)*k:cx+(v-cx)*k),'#8a82a4'))}
function hullOf(pts){const q=[];for(let i=0;i<pts.length;i+=2)q.push([pts[i],pts[i+1]]);q.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]),lo=[],up=[];
  for(const p of q){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}
  for(let i=q.length-1;i>=0;i--){const p=q[i];while(up.length>1&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
  return lo.slice(0,-1).concat(up.slice(0,-1)).flat()}
function boxShadow(g,D,[x0,x1,z0,z1,h],a){const pts=[],y0=D.s(z0);for(const x of[x0,x1])for(const z of[z0,z1]){pts.push(...D.P(x,D.s(z),z),...castD(D,x,h,z))}softD(g,hullOf(pts),a)}
/* a box on the deck: its front (toward us), its top when it is below the eye, its side turned to us */
function boxD(D,[x0,x1,z0,z1,h]){const{P}=D,y0=D.s(z0),y1=D.s(z1);return{
  front:[...P(x0,y0,z0),...P(x1,y0,z0),...P(x1,y0+h,z0),...P(x0,y0+h,z0)],top:[...P(x0,y0+h,z0),...P(x1,y0+h,z0),...P(x1,y1+h,z1),...P(x0,y1+h,z1)],
  side:x0>D.cam?[...P(x0,y0,z0),...P(x0,y0+h,z0),...P(x0,y1+h,z1),...P(x0,y1,z1)]:x1<D.cam?[...P(x1,y0,z0),...P(x1,y0+h,z0),...P(x1,y1+h,z1),...P(x1,y1,z1)]:null,
  sideN:x0>D.cam?[-1,0,0]:[1,0,0],under:y0+h>D.E}}
/* planks laid along a face (four corners a b c d, the planks running from a-b toward d-c), each its own tone, a seam between them */
function planks(g,face,n,c,r,dir){clipTo(g,()=>poly(g,face),()=>{const q=(u,v)=>[face[0]+(face[2]-face[0])*u+(face[6]-face[0])*v,face[1]+(face[3]-face[1])*u+(face[7]-face[1])*v];
  for(let i=0;i<n;i++){const a=i/n,b=(i+1)/n,pts=dir?[...q(a,0),...q(b,0),...q(b,1),...q(a,1)]:[...q(0,a),...q(1,a),...q(1,b),...q(0,b)];poly(g,pts,tint(c,(r()-.5)*.12));
    if(i)stroke(g,dir?[...q(a,0),...q(a,1)]:[...q(0,a),...q(1,a)],'rgba(24,14,8,.5)',.45)}
  tex(g,'wood',.25,Math.min(face[0],face[6])-2,Math.min(face[5],face[7])-2,Math.abs(face[2]-face[0])+4,Math.abs(face[1]-face[7])+4,'overlay',.45)})}

/* the deck: planks that run fore and aft, converging aft; each plank its own tone; butts staggered inside their planks; worn paler down
   the middle; shaded along the foot of each bulwark */
function deckFloor(g,D,r){const{P,s,b}=D,FL=D.C.map(([x,z])=>P(x,s(z),z)).flat(),floor=FL.concat([340,190,-20,190]),base=lit(D,'#a68660',[0,1,0]);
  clipTo(g,()=>poly(g,floor),()=>{R(g,-10,0,340,160,base);const du=.24,W=z=>.5*b(z)+.5*DG.B;
    for(let k=-24;k<24;k++){const u0=k*du/DG.B,u1=(k+1)*du/DG.B,zs=[];for(let z=2;z<=DG.ZS+.4;z+=z<6?.5:.25)zs.push(z);
      const pl=zs.map(z=>P(u0*W(z),s(z),z)).flat().concat(zs.slice().reverse().map(z=>P(u1*W(z),s(z),z)).flat()),c=tint(base,(r()-.5)*.14);
      poly(g,pl,c);
      clipTo(g,()=>poly(g,pl),()=>{for(let i=0;i<4;i++){const u=u0+(u1-u0)*(.2+r()*.6),za=2+r()*8,zb=za+1.5+r()*4,q=[];for(let z=za;z<zb;z+=.4)q.push(...P(u*W(z),s(z),z));if(q.length>3)stroke(g,q,r()<.5?rgba(tint(c,-.22),.45):rgba(tint(c,.14),.4),.5)}});
      const sm=zs.map(z=>P(u0*W(z),s(z),z)).flat();stroke(g,sm,'rgba(30,18,10,.5)',.5);
      const z0=2+((k*.618+.31)%1+1)%1*5;for(let z=z0;z<DG.ZS;z+=5.6){const a=P(u0*W(z)+.03,s(z),z),e=P(u1*W(z)-.03,s(z),z);if(e[0]-a[0]>2.2){R(g,a[0],a[1]-.25,e[0]-a[0],.5,'rgba(30,18,10,.45)');R(g,a[0],a[1]+.25,e[0]-a[0],.4,rgba(tint(c,.24),.3))}}}
    tex(g,'mott',.25,0,40,320,110,'overlay',.7);
    comp(g,'soft-light',.28,()=>poly(g,[...P(-1.2,0,2.4),...P(1.2,0,2.4),...P(.8,0,11),...P(-.8,0,11)],'#fff4d8'));
    for(const[d,a]of[[.04,.3],[.12,.18],[.24,.1]])stroke(g,D.C.map(([x,z],i)=>P(x+D.N[i][0]*d,s(z),z+D.N[i][1]*d)).flat(),`rgba(20,12,16,${a})`,1.2)})}
/* the bulwarks' inner faces all round, planked in three strakes that follow the sheer; butts inside their strakes; the rail on top:
   its inner face, and its lit top where it lies below the eye */
function deckBulwark(g,D,r){const{P,s,rh}=D,C=D.C,N=D.N,M=C.length-1,A='#8a6440',at=(i,f,d)=>{const[x,z]=C[i],[nx,nz]=N[i];return P(x+nx*(d||0),s(z)+f,z+nz*(d||0))},
    H=i=>D.rx(C[i][0],C[i][1])-.1,face=(i0,i1,f0,f1)=>{const p=[];for(let i=i0;i<=i1;i++)p.push(...at(i,f0(i)));for(let i=i1;i>=i0;i--)p.push(...at(i,f1(i)));return p};
  for(let i=0;i<M;i++)poly(g,face(i,i+1,()=>-.02,H),lit(D,A,[N[i][0],0,N[i][1]]));
  clipTo(g,()=>poly(g,face(0,M,()=>-.02,H)),()=>{
    for(const f of[.34,.67]){const p=[],q=[];for(let i=0;i<=M;i++){p.push(...at(i,H(i)*f));q.push(...at(i,H(i)*f-.03))}stroke(g,p,'rgba(26,16,10,.5)',.5);stroke(g,q,'rgba(255,224,170,.16)',.4)}
    for(let j=0;j<3;j++){const f0=[0,.34,.67][j],f1=[.34,.67,1][j];for(let i=3+j*5+(r()*4|0);i<M-2;i+=13+(r()*6|0)){const a=at(i,H(i)*f0+.04),e=at(i,H(i)*f1-.04);if(Math.abs(e[1]-a[1])>1.2)stroke(g,[a[0],a[1],e[0],e[1]],'rgba(26,16,10,.3)',.5)}}
    for(let j=0;j<3;j++){const f0=[0,.34,.67][j],f1=[.34,.67,1][j];for(let n=0;n<40;n++){const f=f0+(f1-f0)*(.15+.7*r()),i0=r()*(M-4)|0,len=3+(r()*10|0),p=[];for(let i=i0;i<=Math.min(M,i0+len);i++)p.push(...at(i,H(i)*f));if(p.length>3)stroke(g,p,r()<.5?'rgba(24,14,8,.18)':'rgba(255,226,180,.1)',.5)}}
    tex(g,'mott',.12,-10,20,340,130,'overlay',.7);
    {const p=[];for(let i=0;i<=M;i++)p.push(...at(i,H(i)-.02));stroke(g,p,'rgba(20,12,10,.34)',1)}
    {const q=[];for(let i=0;i<=M;i++)q.push(...at(i,.02));stroke(g,q,'rgba(20,12,10,.4)',1.4)}});
  for(let i=4;i<M-3;i+=6){const z=C[i][1];if(z>9)continue;const a=at(i,.03),e=at(i+1,.03),hh=Math.max(.5,150*.07/z);poly(g,[a[0],a[1],e[0],e[1],e[0],e[1]-hh,a[0],a[1]-hh],'#1a100a')}
  for(let i=0;i<M;i++){poly(g,[...at(i,H(i),.05),...at(i+1,H(i+1),.05),...at(i+1,H(i+1)+.1,.05),...at(i,H(i)+.1,.05)],lit(D,'#7a5636',[N[i][0],0,N[i][1]]))}
  for(let i=0;i<M;i++){const y=s(C[i][1])+H(i)+.1;if(y>D.E-.05)continue;poly(g,[...at(i,H(i)+.1,.05),...at(i+1,H(i+1)+.1,.05),...at(i+1,H(i+1)+.1,-.12),...at(i,H(i)+.1,-.12)],lit(D,'#9a7448',[0,1,0]))}
  const top=[];for(let i=0;i<=M;i++){const y=s(C[i][1])+H(i)+.1;top.push(...at(i,H(i)+.1,y<D.E-.05?-.12:.05))}
  stroke(g,top,lit(D,'#e8c898',[0,1,0],1.1),.5)}
/* the sternpost beyond the cabin: the stern's rail sweeps up from both quarters to a peak in the middle, and the swan's neck grows out
   of that peak, so it ends each rail and stands on the middle of none; the cabin is lower than the peak, so the neck never stands on
   its roof. The gallery, beyond the
   stern and lower than the eye's line over it, is not seen from here (a rail behind the post would make a cross). */
function deckStern(g,D,kind){const{P,s}=D,z=DG.ZS+.3,y0=s(DG.ZS)+D.rx(0,DG.ZS+.25),A='#7e5a36',SM=1.48,YW=-.82;
  /* the swan's neck, seen from forward and a little below: the loop foreshortened, the head hanging bowed toward us, its bill pointing
     down and toward the rising neck */
  swanDraw(g,(u,v)=>{const zz=z-u*SM*Math.cos(YW);return[...P(u*SM*Math.sin(YW),y0-.54+v*SM,zz),D.F*SM/zz]},{mid:lit(D,A,[0,.2,-1]),sh:lit(D,'#4c3420',[-1,0,-.3]),lit:lit(D,'#dfb886',[1,.6,-.5]),
    bill:lit(D,'#bc6c3c',[0,.2,-1]),billLit:lit(D,'#eea868',[.5,.6,-.6]),eye:'#1a100a'},[.6,-.8],{fs:Math.abs(Math.sin(YW)),fc:Math.abs(Math.cos(YW))})}
/* the steering oars at the quarters: the loom rising outboard past the rail, its squared head, and the tiller reaching forward and
   inboard; a lashing slanting from the loom down to the rail holds it up. Loom and tiller meet at a corner. */
function deckOars(g,D,part){const{P,s}=D;
  for(const sd of[-1,1]){const z=15.1,xr=sd*D.b(z),yr=s(z)+D.rh(z),h=P(xr+sd*.25,yr+.9,z+.1),f=P(xr+sd*.6,yr-.4,z+.2),t=P(xr-sd*1.1,yr+.62,z-1.3);
    if(part==='loom'){const dx=h[0]-f[0],dy=h[1]-f[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,w=1.3;
      poly(g,[f[0]+nx*w,f[1]+ny*w,h[0]+nx*w*.8,h[1]+ny*w*.8,h[0]-nx*w*.8,h[1]-ny*w*.8,f[0]-nx*w,f[1]-ny*w],lit(D,'#6a4a2c',[sd*.6,.5,-.6]))}
    else{const dx=t[0]-h[0],dy=t[1]-h[1],l=Math.hypot(dx,dy),nx=-dy/l*.6,ny=dx/l*.6;
      poly(g,[h[0]+nx,h[1]+ny,t[0]+nx*.8,t[1]+ny*.8,t[0]-nx*.8,t[1]-ny*.8,h[0]-nx,h[1]-ny],lit(D,'#7a5634',[0,.6,-.6]));
      poly(g,[h[0]-1.2,h[1]-1.1,h[0]+1.2,h[1]-1.1,h[0]+1.2,h[1]+1,h[0]-1.2,h[1]+1],lit(D,'#5a3e24',[sd*.5,.5,-.7]));R(g,h[0]-1.2,h[1]-1.1,2.4,.5,lit(D,'#d0a06a',[0,1,0]));
      const c=P(xr-sd*.5,yr,z-.9);stroke(g,[h[0],h[1]+1.4,c[0],c[1]],lit(D,'#c8ac78',[0,1,-.3]),.5)}}}
/* the cabin across the after deck: planked lengthwise, a door in the middle of its front, a small square window each side of it, its
   roof proud of the walls; nothing stands on it */
function deckCabin(g,D,r){const B=D.things.cabin,f=boxD(D,B),W='#7a5634',{P,s}=D,[x0,x1,z0,z1,h]=B,y0=s(z0);
  const cF=lit(D,W,[0,0,-1]),cS=lit(D,W,f.sideN);
  if(f.side)planks(g,f.side,6,cS,r,0);planks(g,f.front,7,cF,r,0);
  /* the roof: its front edge and the eave's shadow on the wall */
  const e0=P(x0-.15,y0+h+.12,z0-.15),e1=P(x1+.15,y0+h+.12,z0-.15),e2=P(x1+.15,y0+h-.02,z0-.15),e3=P(x0-.15,y0+h-.02,z0-.15);
  poly(g,[...e0,...e1,...e2,...e3],lit(D,'#5a3e26',[0,0,-1]));stroke(g,[e3[0],e3[1]+.5,e2[0],e2[1]+.5],'rgba(20,12,8,.5)',1);
  /* the door: a dark opening, its leaf standing open inward; and the two windows */
  const d0=P(-.45,y0,z0),d1=P(.45,y0+1.65,z0);R(g,d0[0],d1[1],d1[0]-d0[0],d0[1]-d1[1],'#1c120c');R(g,d0[0],d1[1],1,d0[1]-d1[1],lit(D,'#6a4a2c',[1,0,0]));
  for(const wx of[-1.7,1.1]){const a=P(wx,y0+1.1,z0),e=P(wx+.6,y0+1.55,z0);R(g,a[0],e[1],e[0]-a[0],a[1]-e[1],'#1c120c');R(g,a[0],a[1],e[0]-a[0],.5,lit(D,'#e0b880',[0,1,0]))}
  ao(g,f.front[0],f.front[1]-3,f.front[2]-f.front[0],3,'b',.3,'#0c0808');
  stroke(g,[f.front[0],f.front[1],f.front[6],f.front[7]],lit(D,'#f0d0a0',[-1,0,-.3]),.5)}
/* the hatch: a coaming of heavy timber round the opening, its lit top; the hold dark below; the ladder's two rails stand out of it at
   its after edge, leaning; its rungs, inside, stop short of the rails */
function deckHatch(g,D,r){const B=D.things.hatch,f=boxD(D,B),{P,s}=D,[x0,x1,z0,z1,h]=B,cw=.22;
  const cF=lit(D,'#7a5634',[0,0,-1]),cT=lit(D,'#9a7448',[0,1,0]);
  if(f.side)poly(g,f.side,lit(D,'#7a5634',f.sideN));poly(g,f.top,cT);planks(g,f.front,2,cF,r,0);
  const o=[...P(x0+cw,h,z0+cw),...P(x1-cw,h,z0+cw),...P(x1-cw,h,z1-cw),...P(x0+cw,h,z1-cw)];poly(g,o,'#140c08');
  clipTo(g,()=>poly(g,o),()=>{const a=P(x0+cw,h,z1-cw),e=P(x1-cw,h,z1-cw);g.fillStyle=lg(g,0,e[1],0,e[1]+4,[lit(D,'#5a4028',[0,0,-1]),'#140c08']);g.fillRect(a[0],e[1],e[0]-a[0],4);
    for(let i=0;i<2;i++){const ry=e[1]+1.6+i*1.6,ra=P(-.25,h,z1-cw-.1),rb=P(.25,h,z1-cw-.1);R(g,ra[0]+.8,ry,rb[0]-ra[0]-1.6,.5,'rgba(150,110,70,.5)')}});
  stroke(g,[f.top[6],f.top[7],f.top[4],f.top[5]],rgba(lit(D,'#fff0c8',[0,1,0]),.6),.5);stroke(g,[f.front[6],f.front[7],f.front[4],f.front[5]],lit(D,'#f0d0a0',[0,1,-.3]),.5);
  for(const lx of[-.32,.32]){const a=P(lx,h-.2,z1-cw-.05),e=P(lx-.04,h+.55,z1-cw-.2);poly(g,[a[0]-.6,a[1],a[0]+.6,a[1],e[0]+.55,e[1],e[0]-.55,e[1]],lit(D,'#8a6640',[0,.3,-1]));R(g,e[0]-.55,e[1],1.1,.5,lit(D,'#e8c090',[0,1,0]))}}
/* the windlass: a drum of timber lying across the deck between two cheeks as high as itself, square holes in the drum for the bars, the
   cable wound on it and led aft */
function deckWindlass(g,D,r){const[x0,x1,z0,z1,h]=D.things.windlass,{P,s}=D,y0=s(z0),cw=.22;
  for(const[a,b]of[[x0,x0+cw],[x1-cw,x1]]){const f=boxD(D,[a,b,z0,z1,h]);if(f.side)poly(g,f.side,lit(D,'#6e4e30',f.sideN));poly(g,f.front,lit(D,'#7a5634',[0,0,-1]));poly(g,f.top,lit(D,'#9a7448',[0,1,0]))}
  const dr=.24,cy=y0+.42,a=P(x0+cw,cy+dr,z0+.32),e=P(x1-cw,cy-dr,z0+.32),hh=e[1]-a[1];
  g.fillStyle=lg(g,0,a[1],0,e[1],[lit(D,'#9a7448',[0,1,-.3]),lit(D,'#6e4e30',[0,0,-1]),lit(D,'#3e2a1a',[0,-1,-.3])]);g.fillRect(a[0],a[1],e[0]-a[0],hh);
  for(let x=a[0]+2;x<e[0]-2;x+=1.3)R(g,x,a[1]+hh*.2,.6,hh*.6,'rgba(200,170,120,.35)');
  for(const u of[.18,.5,.82]){const x=a[0]+(e[0]-a[0])*u;R(g,x-.6,a[1]+hh*.3,1.2,1.2,'#1c120c')}
  const c=P(x0+.7,cy-dr,z0+.6),q=P(x0+.4,s(14),14);stroke(g,[c[0],c[1],q[0],q[1]],lit(D,'#c8ac78',[0,1,-.3]),.7)}
/* a coil of rope lying on the deck; its eye a slot */
function deckCoil(g,D,key){const[x0,x1,z0,z1]=D.things[key],{P}=D,z=(z0+z1)/2,c=P((x0+x1)/2,D.s(z),z),u=D.F/z,rx=(x1-x0)/2*u,ry=rx*.32,R0='#8a7450';
  comp(g,'multiply',.45,()=>oval(g,c[0]-.8,c[1]+.6,rx+1.4,ry+1,'#3a3050'));
  for(let k=2;k>=0;k--)oval(g,c[0],c[1]-k*.9*u/36,rx,ry,lit(D,k?tint(R0,-.3):R0,[0,1,-.3]));
  g.lineWidth=.5;g.strokeStyle='rgba(50,36,20,.5)';for(const q of[.82,.64,.46]){g.beginPath();g.ellipse(c[0],c[1]-1.8*u/36,rx*q,ry*q,0,0,6.2832);g.stroke()}
  R(g,c[0]-rx*.3,c[1]-1.8*u/36-.5,rx*.6,1,'#3a2c1c')}
/* the spare anchor lying on the deck in the waist, drawn as the two at the bow are, large (as long as a man is tall). It lies as such
   an anchor lies: on its side, its lead stock flat on the planks at its head (running back along them, so it is seen end-on, a block),
   the shank rising across the ship toward the crown, the lower arm's fluke resting on the deck and the upper arm standing up. The arms
   lie in the upright plane through the shank, which faces us, so the anchor is seen whole. */
function deckAnchor(g,D){const{P}=D,[x0,x1,z0,z1]=D.things.anchor,xh=x0+.15,z=(z0+z1)/2,yh=.18,L=1.8,th=.29,
    R0=P(xh,yh,z),C0=P(xh+L*Math.cos(th),yh+L*Math.sin(th),z),len=Math.hypot(C0[0]-R0[0],C0[1]-R0[1]),ang=Math.atan2(C0[0]-R0[0],C0[1]-R0[1]);
  /* its shadow on the deck, soft, under the stock, the shank and the arm that rests */
  softD(g,[...P(xh-.3,0,z-.35),...P(xh+L*1.02,0,z-.25),...P(xh+L*1.05,0,z+.5),...P(xh-.3,0,z+.45)],.7);
  const C={lead:lit(D,'#7e8088',[0,.4,-.9]),leadHi:lit(D,'#e6e8ea',[0,1,0]),dark:'#1c120c'};
  comp(g,'multiply',.5,()=>anchor(g,{x:R0[0]+1,y:R0[1]+1.4,len,ang,C,mono:'#5a4a5a'}));
  anchor(g,{x:R0[0],y:R0[1],len,ang,C,wood:lit(D,'#4e3828',[0,.3,-1])})}
/* the passengers' place along the port rail: bedding rolled up (its near end turned to us) and a water jar; or the lean-to */
function deckBed(g,D,r){const[x0,x1,z0,z1,h]=D.things.bed,{P}=D;
  /* two rolls of bedding lying fore and aft against the rail, each showing its near end as a face */
  for(const[xa,c,rr]of[[x0+.25,'#8a6e58',.22],[x0+.75,'#6e7a8a',.19]]){const zc=z0+.1,zf=z1-.1,nr=rr*D.F/zc,ce=P(xa,rr,zc),cb=P(xa,rr,zf),br=rr*D.F/zf;
    softD(g,[ce[0]-nr,ce[1]+nr,cb[0]-br,cb[1]+br,cb[0]+br+3,cb[1]+br,ce[0]+nr+3,ce[1]+nr],.6);
    poly(g,[ce[0]-nr,ce[1],cb[0]-br,cb[1],cb[0]+br,cb[1],ce[0]+nr,ce[1]]);g.fillStyle=lg(g,0,ce[1]-nr,0,ce[1]+nr,[lit(D,c,[0,1,-.3]),lit(D,c,[0,-.3,-1])]);
    poly(g,[ce[0]-nr,ce[1]-nr*.9,cb[0]-br,cb[1]-br*.9,cb[0]+br,cb[1]-br*.9,cb[0]+br,cb[1]+br*.9,ce[0]+nr,ce[1]+nr*.9,ce[0]-nr,ce[1]+nr*.9],lit(D,c,[.3,.6,-.6]));
    oval(g,ce[0],ce[1],nr,nr*.92,lit(D,tint(c,.12),[0,0,-1]));g.lineWidth=.5;g.strokeStyle=rgba(tint(c,-.4),.8);g.beginPath();g.ellipse(ce[0],ce[1],nr*.6,nr*.55,0,0,6.2832);g.stroke();
    R(g,ce[0]-nr*.15,ce[1]-.25,nr*.3,.5,rgba(tint(c,-.5),.8))}
  /* the water jar, stoppered, by the rail further aft */
  const[ja,jb,jz0,jz1,jh]=D.things.jar,z=(jz0+jz1)/2,ft=P((ja+jb)/2,0,z),tp=P((ja+jb)/2,jh,z),w=.24*D.F/z,H=ft[1]-tp[1],cx=ft[0],S=[];
  const hw=t=>t<.08?.3:t<.2?.3+(t-.08)*3:t<.6?.66+.34*Math.sin((t-.2)/.4*1.57):1-.5*Math.pow((t-.6)/.4,1.4);
  for(let k=0;k<=14;k++){const t=k/14;S.push(cx-hw(t)*w,tp[1]+t*H)}for(let k=14;k>=0;k--){const t=k/14;S.push(cx+hw(t)*w,tp[1]+t*H)}
  softD(g,[cx-w,ft[1],cx+w,ft[1],cx+w-H*.3,ft[1]+1.5,cx-w-H*.3,ft[1]+1.5],.5);
  poly(g,S);g.fillStyle=lg(g,cx-w,0,cx+w,0,[lit(D,'#a6643c',[-1,0,-.4]),lit(D,'#a6643c',[0,0,-1]),lit(D,'#a6643c',[1,.3,-.4])]);g.fill();R(g,cx-.3*w,tp[1]-.4,.6*w,1,lit(D,'#c8b898',[0,1,0]))}
/* the lean-to: old sailcloth laid over the port rail and made fast outboard, sloping down inboard to the deck, where it is held by two
   cords at its lower corners. Its seams run one way, down the slope; its near end is open */
function deckLean(g,D,r){const[x0,x1,z0,z1,h]=D.things.lean,{P,s,b,rh}=D,c='#a09478';
  const top=z=>P(-b(z)+.02,rh(z)+.06,z),low=z=>P(x1,.06,z),mid=(z,sag)=>P((-b(z)+x1)/2+.15,(rh(z)+.06)/2-sag*1.6,z);
  const ta=top(z0),tb=top(z1),la=low(z0+.15),lb=low(z1-.1);
  /* inside, seen through the open near end: the bulwark and the deck in its shade */
  comp(g,'multiply',.85,()=>poly(g,[ta[0],ta[1],...mid(z0,.12),la[0],la[1],...P(-b(z0)+.05,0,z0+.3)],'#5a4a5a'));
  softD(g,[la[0],la[1],lb[0],lb[1],lb[0]+5,lb[1]+1,la[0]+7,la[1]+2],.6);
  /* the cloth: from its edge over the rail down to the deck, sagging a little between, as old sailcloth on two cords does */
  const n=8,E=[],W=[];for(let i=0;i<=n;i++){const z=z0+(z1-z0)*i/n;E.push(...top(z));W.push(...mid(z,.12+.05*Math.sin(Math.PI*i/n)))}
  const B=[];for(let i=n;i>=0;i--){const z=z0+.15+(z1-z0-.25)*i/n;B.push(...low(z))}
  const up=E.concat(ptsBackG(W)),dn=W.concat(B);
  poly(g,up,lit(D,c,[.55,.82,-.1]));poly(g,dn,lit(D,c,[.75,.62,-.2]));
  clipTo(g,()=>{poly(g,up);poly(g,dn)},()=>{for(const u of[.2,.45,.7,.9]){const z=z0+(z1-z0)*u,a=top(z),m=mid(z,.13),e=low(z0+.15+(z1-z0-.25)*u);stroke(g,[a[0],a[1],m[0],m[1],e[0],e[1]],'rgba(80,68,52,.4)',.45)}
    tex(g,'mott',.4,ta[0]-4,tb[1]-2,lb[0]-ta[0]+10,la[1]-tb[1]+6,'overlay',.8);tex(g,'grain',.3,ta[0]-4,tb[1]-2,lb[0]-ta[0]+10,la[1]-tb[1]+6,'overlay',.5);
    const pc=mid(z0+(z1-z0)*.55,.1);R(g,pc[0]-2.4,pc[1]-1.2,4.4,2.6,lit(D,'#a89a7e',[.6,.8,0]));
    for(let x=pc[0]-2.4;x<pc[0]+2;x+=1.1)R(g,x,pc[1]-1.2,.5,.5,'rgba(60,50,40,.6)')});
  /* the near edge, a hem; the lower edge resting on the deck */
  stroke(g,[ta[0],ta[1],...mid(z0,.12),la[0],la[1]],rgba(lit(D,'#f4ead0',[0,.8,-.6]),.9),.6);stroke(g,B,lit(D,'#8a8070',[0,1,0]),.6);
  /* the cords at the lower corners, slanting out to pegs in the deck */
  for(const[p,z]of[[la,z0-.4],[lb,z1+.4]]){const q=P(x1+.55,0,z);stroke(g,[p[0],p[1],q[0],q[1]],lit(D,'#c8ac78',[0,1,-.3]),.5);R(g,q[0]-.5,q[1]-.5,1,1,'#3a2a1a')}}
/* the mainmast's foot, in the right foreground: the round mast standing in its partners (a low square collar of timber, no wider
   than it must be), running out of the top of the picture */
function deckMast(g,D){const[x0,x1,z0,z1]=D.things.mast,{P}=D,xm=(x0+x1)/2,zm=(z0+z1)/2,r=.3,f0=P(xm-r,0,zm-r),f1=P(xm+r,0,zm-r),w=f1[0]-f0[0];
  boxShadow(g,D,[x0-.2,x1+.2,z0-.2,z1+.2,1.2],.5);
  g.fillStyle=lg(g,f0[0],0,f1[0],0,[lit(D,'#7a5a38',[-1,0,-.3]),lit(D,'#8a6a44',[0,0,-1]),lit(D,'#b08a5a',[.7,.2,-.6]),lit(D,'#6a4a2c',[1,0,.2])]);g.fillRect(f0[0],-2,w,f0[1]+2);
  for(let i=0;i<6;i++){const x=f0[0]+w*(.15+.7*i/6);stroke(g,[x,-2,x+.2,f0[1]-3],'rgba(40,26,14,.18)',.5)}
  const pc=boxD(D,[x0-.08,x1+.08,z0-.08,z1+.08,.16]);poly(g,pc.side||pc.front,lit(D,'#6e4e30',[-1,0,0]));poly(g,pc.top,lit(D,'#9a7448',[0,1,0]));poly(g,pc.front,lit(D,'#7a5634',[0,0,-1]));
  stroke(g,[pc.front[6],pc.front[7],pc.front[4],pc.front[5]],lit(D,'#f0d0a0',[0,1,-.3]),.5);
}

/* deck(g, o): the whole picture: what lies beyond, the ship, and the things on deck with the people among them, from far to near */
function deck(g,o){o=o||{};const D=geoDeck(o),r=rng(22061);
  (o.beyond||deckBeyond)(g,D);
  deckStern(g,D,o.post||'bird');deckOars(g,D,'loom');
  deckFloor(g,D,r);deckBulwark(g,D,r);deckOars(g,D,'tiller');
  const T=D.things,dep=k=>D.P(0,D.s(T[k][2]),T[k][2])[1],items=[];
  items.push([dep('cabin'),()=>{boxShadow(g,D,T.cabin,.8);deckCabin(g,D,r)}]);
  items.push([dep('windlass'),()=>{boxShadow(g,D,T.windlass,.8);deckWindlass(g,D,r)}]);
  items.push([dep('coil2'),()=>deckCoil(g,D,'coil2')]);
  items.push([dep('jar'),()=>deckBed(g,D,r)]);
  items.push([dep('hatch'),()=>{boxShadow(g,D,T.hatch,.8);deckHatch(g,D,r)}]);
  if(o.lean)items.push([dep('lean'),()=>deckLean(g,D,r)]);
  if(o.anchor!==false)items.push([dep('anchor'),()=>deckAnchor(g,D)]);
  items.push([dep('coil'),()=>deckCoil(g,D,'coil')]);
  items.push([dep('mast'),()=>deckMast(g,D)]);
  for(const f of o.figs||[])items.push(f);
  items.sort((a,b)=>a[0]-b[0]);for(const[,fn]of items)fn(g);
  return D}
/* what lies beyond the ship in fair weather, by default: she lies close under high land (the quay of Myra, or the small bay of Fair
   Havens under the mountains of Crete), and we look toward it, so the land rises straight from behind every rail and no line of water
   is seen at all: the mast stands against rock and sky only. o.place: 'myra' (the quay with its long stores at the right, the steep
   spurs of the Taurus behind) or 'fairhavens' (the steep shore of the bay with its scrub, higher mountains beyond). Painted with
   shared/coast.js and shared/country.js when the chapter has them (it lists 'coast' and 'country' in its needs). */
function deckBeyond(g,D){const place=D.o.place||'myra',my=place==='myra',K=SHARED.coast,CO=SHARED.country,base=100,
    O={w:320,hz:D.hz,hour:my?'morning':'midday',cloud:my?.2:.35,seed:my?2206:2208,light:1};
  if(!K||!CO){sky(g,320,144,[[0,'#4a84c8'],[.5,'#8ab4d8'],[1,'#d4e2e4']]);poly(g,[0,base,0,50,80,36,170,46,250,30,320,44,320,base],'#7c8a72');return}
  const L=K.light(O);K.sky(g,O);
  const fm=my?x=>88+12*Math.sin(x/47+1)+8*Math.abs(Math.sin(x/19))+3*Math.sin(x/6.1):x=>92+16*Math.sin(x/61+2.2)+6*Math.abs(Math.sin(x/23+1))+3*Math.sin(x/7.3),
    fn=my?x=>46+10*Math.sin(x/33+.4)+5*Math.abs(Math.sin(x/11))+1.5*Math.sin(x/3.7):x=>52+9*Math.sin(x/41+1.4)+6*Math.abs(Math.sin(x/14+.5))+1.5*Math.sin(x/4.1);
  K.land(g,L,.08,q=>CO.range(q,0,320,base,fm,['#6a7890','#5a687e','#4c586c'],{k:.8,light:1}));
  K.land(g,L,.12,q=>{const P=[0,base];for(let x=0;x<=320;x++)P.push(x,base-fn(x));P.push(320,base);CO.crag(q,P,my?'#9a927a':'#a49a7c',my?2209:2210,{light:1,dip:my?.06:-.05,bed:5,scrub:my?110:180})});
  if(my){/* the quay at the right: its long stores of stone with low tiled roofs, standing on the quay's edge, their doors wide */
    K.land(g,L,.05,q=>{const r=rng(2211);
      for(const[x,w,h]of[[206,64,30],[268,60,34],[324,20,30]]){const top=base-h;
        q.fillStyle=lg(q,x,0,x+w,0,['#cabca0','#d8ccb0','#b4a88e']);q.fillRect(x,top,w,h);tex(q,'mott',.35,x,top,w,h,'overlay',.8);
        for(let y=top+4;y<base;y+=4)R(q,x,y,w,.5,'rgba(90,76,60,.25)');
        poly(q,[x-2,top+.5,x+w+2,top+.5,x+w-3,top-6,x+3,top-6],'#a8603e');for(const f of[.3,.6,.85])R(q,x+3-f*5,top-6+f*6.5,w-6+f*10,.5,'rgba(70,30,20,.4)');R(q,x-2,top,w+4,.5,'rgba(40,24,20,.5)');
        for(let dx=8;dx<w-10;dx+=18){R(q,x+dx,base-15,9,15,'#2a2018');R(q,x+dx,base-15,9,.6,'#8a7a62')}}})}}

/* ======== The stern by night, from aboard (Chapter Twenty-Three, the soundings: 27:27-29) ========
   sternNight(g, o) paints the after deck seen from just aft of the cabin, looking aft, on the fourteenth night: no moon and no star
   (27:20), the sea and the sky one darkness with no line between them, rain. One lantern hangs beside the sternpost, from it, by two
   cords that part upward (one to the post's shaft, one to its bent head), and is the only light: a small low glow, warm on the post, the
   rail and the deck. We stand a little to starboard of the middle, so the sternpost (the same bird's neck as from the side) is seen
   from behind and a little from the side, and it rises where the stern's rail turns round toward us; the rail is a plain rail. The steering oars stand lashed up at both quarters, their lashings slanting to the rail. Four cables come aft
   along the deck side by side, two each side of the post, rise to the stern rail and go over it and down into the dark: none crosses
   another, the post or a plank of the stern, whose inner face is left without seams where they pass. No anchor is seen.
     o.post    'bird' | 'curl'      o.cables   how many (default 4; 0 for none)      o.t   the time, for the flame
   For a room built on this picture (Chapter Twenty-Three's stern23), all optional and all leaving the picture as it was when not given:
     o.cam     how far to starboard of her middle line we stand (metres, default 1.3)
     o.lp      where the lantern hangs, [x, y, z] in metres (default [.5, 1.25, 5.35]); it must hang below both points its cords go to
     o.sky     false leaves the sky and the sea out, transparent, for a room that paints the storm's night behind the ship
     o.rain    false leaves the rain out, for a room that lets it fall in its own air
   Returns the geometry {P, hz, lamp:[x, y]} for the room (nightGeo gives the same without painting). */
function nightGeo(o){o=o||{};const F=150,E=1.7,hz=62,cam=o.cam!=null?o.cam:1.3,P=(x,y,z)=>[160+F*(x-cam)/z,hz+F*(E-y)/z],ZS=5.5,
    b=z=>z<=2?3.7:z>=ZS?1.9:1.9+1.8*Math.sqrt(Math.max(0,1-Math.pow((z-2)/(ZS-2),2.2))),LP=o.lp||[.5,1.25,5.35],zOf=Y=>F*E/(Y-hz);
  /* the deck's edges at a height Y on the screen (the foot of each bulwark), and the foot of the stern's face */
  return{F,E,hz,cam,P,b,ZS,lamp:P(...LP),lampFloor:P(LP[0],0,LP[2]),
    edge:(Y,sd)=>{const z=zOf(Y);return P(sd*b(z),0,z)[0]},sternFoot:P(0,0,ZS)[1],sternTop:P(0,1.17,ZS)[1]}}
function sternNight(g,o){o=o||{};const F=150,E=1.7,hz=62,cam=o.cam!=null?o.cam:1.3,P=(x,y,z)=>[160+F*(x-cam)/z,hz+F*(E-y)/z],ZS=5.5,
    b=z=>z<=2?3.7:z>=ZS?1.9:1.9+1.8*Math.sqrt(Math.max(0,1-Math.pow((z-2)/(ZS-2),2.2))),sz=x=>ZS+.2*(1-Math.pow(x/1.9,2)),rh=1.05,
    /* the rail: a little higher round the stern than at the quarters, a rail and nothing more */
    RH=(x,z)=>rh+.12*clamp((z-(ZS-1.5))/1.5,0,1),
    LP=o.lp||[.5,1.25,5.35],
    /* the lantern's light on a face: night ambient, and the lamp's warm light by angle and distance */
    lamp=(c,p,n)=>{const d=[LP[0]-p[0],LP[1]-p[1],LP[2]-p[2]],l=Math.hypot(...d),q=Math.max(0,(n[0]*d[0]+n[1]*d[1]+n[2]*d[2])/l/(Math.hypot(...n)||1)),f=q/(1+Math.pow(l/1.9,2)),h=hex(c);
      return toHex(h[0]*(.14+1.15*f),h[1]*(.16+.9*f),h[2]*(.24+.55*f))};
  /* the sky and the sea: one darkness, a little lighter low down where the sea's foam catches what light there is; no line between */
  if(o.sky!==false){sky(g,320,144,[[0,'#04060a'],[.35,'#0a0e16'],[.5,'#10161e'],[.7,'#0c1218'],[1,'#080c10']]);
  for(let i=0;i<16;i++){const r=rng(500+i);pool(g,r()*320,8+r()*40,40+r()*50,5+r()*6,'#161c28',.5,'source-over')}
  for(let i=0;i<70;i++){const r=rng(800+i),y=66+Math.pow(r(),1.4)*30;R(g,r()*320,y,1+r()*4,.5,`rgba(150,170,180,${(.05+.1*r()).toFixed(2)})`)}}
  /* the deck: planks running aft, converging; the lantern's pool on it */
  const C=[];for(let z=2;z<ZS;z+=.25)C.push([-b(z),z]);for(let i=0;i<=10;i++){const x=-1.9+3.8*i/10;C.push([x,sz(x)])}for(let z=ZS-.25;z>=2;z-=.25)C.push([b(z),z]);
  const N=C.map((p,i)=>{const a=C[Math.max(0,i-1)],c=C[Math.min(C.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1;return[tz/l,-tx/l]});
  const FL=C.map(([x,z])=>P(x,0,z)).flat(),r=rng(23061);
  clipTo(g,()=>poly(g,FL.concat([340,190,-20,190])),()=>{for(let k=-18;k<18;k++){const u0=k*.24,u1=u0+.24,p0=[],p1=[];for(let z=1.6;z<=6;z+=.4){p0.push(...P(u0*(.4+.6*b(z)/3.7),0,z));p1.push(...P(u1*(.4+.6*b(z)/3.7),0,z))}
      const pc=[u0+.12,0,4],c=lamp(tint('#8a6a48',(r()-.5)*.14),pc,[0,1,0]);poly(g,p0.concat(ptsBackG(p1)),c);stroke(g,p0,'rgba(8,6,6,.5)',.5)}
    comp(g,'lighter',.22,()=>{const c=P(LP[0],0,LP[2]-.4);pool(g,c[0],c[1],70,14,'#ffb060',1)});tex(g,'mott',.2,0,90,320,60,'overlay',.6)});
  /* the sternpost: the swan's neck, seen from forward and a little to one side and below: its loop foreshortened, the head hanging
     bowed toward us in front of the neck. Painted before the stern's rail, so the rail passes in front of its foot as a ship's rail
     passes in front of her mast. */
  const pf=RH(0,ZS+.2)-.3,Zs=ZS+.3,SM=.82,YW=-.88,SW=(u,v)=>{const z=Zs-u*SM*Math.cos(YW);return[...P(u*SM*Math.sin(YW),pf+v*SM,z),F*SM/z]};
  swanDraw(g,SW,{mid:lamp('#7e5a36',[0,pf+1.5,Zs-.5],[.3,0,-1]),sh:lamp('#4a321e',[0,pf+1.5,Zs],[-1,0,-.2]),lit:lamp('#f0c890',[0,pf+1.5,Zs-.5],[.6,-.2,-.8]),
    bill:lamp('#b46a3a',[0,pf+1.3,Zs-.7],[.3,-.3,-1]),billLit:lamp('#f0b070',[0,pf+1.3,Zs-.7],[.5,-.3,-.8]),eye:'#120c08'},[.85,.5],{fs:Math.abs(Math.sin(YW)),fc:Math.abs(Math.cos(YW))});
  /* the bulwarks: their inner faces, the rail on top; the stern's face plain, its grain only, where the cables come to it */
  const at=(i,y,d)=>{const[x,z]=C[i],[nx,nz]=N[i];return P(x+nx*(d||0),y,z+nz*(d||0))},M=C.length-1;
  const H=i=>RH(C[i][0],C[i][1]);for(let i=0;i<M;i++){const[x,z]=C[i],c=lamp('#7a5a3c',[x,.5,z],[N[i][0],0,N[i][1]]);poly(g,[...at(i,0),...at(i+1,0),...at(i+1,H(i+1)),...at(i,H(i))],c)}
  clipTo(g,()=>{const p=[];for(let i=0;i<=M;i++)p.push(...at(i,0));for(let i=M;i>=0;i--)p.push(...at(i,H(i)));poly(g,p)},()=>{tex(g,'wood',.2,0,40,320,110,'overlay',.4);
    for(const f of[.35,.68]){const p=[];for(let i=0;i<=M;i++){const z=C[i][1];if(z>ZS-.6&&Math.abs(C[i][0])<1.7){if(p.length>2)stroke(g,p,'rgba(6,4,4,.45)',.5);p.length=0;continue}p.push(...at(i,rh*f))}if(p.length>2)stroke(g,p,'rgba(6,4,4,.45)',.5)}});
  for(let i=0;i<M;i++){const[x,z]=C[i],h0=H(i),h1=H(i+1);poly(g,[...at(i,h0,.05),...at(i+1,h1,.05),...at(i+1,h1+.1,.05),...at(i,h0+.1,.05)],lamp('#6a4a30',[x,h0,z],[N[i][0],.3,N[i][1]]));
    if(Math.max(h0,h1)<E-.05)poly(g,[...at(i,h0+.1,.05),...at(i+1,h1+.1,.05),...at(i+1,h1+.1,-.12),...at(i,h0+.1,-.12)],lamp('#9a7448',[x,h0+.1,z],[0,1,0]))}
  /* the steering oars at the quarters, lashed up: each loom rising outboard past the rail to its squared head, the tiller lashed
     inboard along the rail, and the lashing slanting from the loom down to a cleat */
  for(const sd of[-1,1]){const z=4.6,xr=sd*b(z),h=P(xr+sd*.28,rh+.95,z+.1),f=P(xr+sd*.55,rh-.3,z+.25),dx=h[0]-f[0],dy=h[1]-f[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,w=2.2;
    poly(g,[f[0]+nx*w,f[1]+ny*w,h[0]+nx*w*.8,h[1]+ny*w*.8,h[0]-nx*w*.8,h[1]-ny*w*.8,f[0]-nx*w,f[1]-ny*w],lamp('#5a3e26',[xr,1.5,z],[-sd,.2,-.6]));
    poly(g,[h[0]-2,h[1]-1.8,h[0]+2,h[1]-1.8,h[0]+2,h[1]+1.6,h[0]-2,h[1]+1.6],lamp('#4a3220',[xr,1.9,z],[-sd,.5,-.6]));
    const t=P(xr-sd*.25,rh+.55,z-1.2);stroke(g,[h[0],h[1],t[0],t[1]],lamp('#6a4a2c',[xr,1.6,z-.6],[-sd,.6,-.4]),2.2);
    const cl=P(xr-sd*.25,.12,z-.55),m=P(xr+sd*.42,rh+.45,z+.18);stroke(g,[m[0],m[1],cl[0],cl[1]],lamp('#b8a070',[xr,1.2,z+.5],[-sd,.5,-.5]),.6)}
  /* the four cables: from the deck at our feet aft along the planks, rising to the stern rail, over it and away (each ends at the
     rail's top, where it bends down out of sight) */
  const n=o.cables!=null?o.cables:4;for(let i=0;i<n;i++){const x0=[-1.45,-.8,.8,1.45][i]||0,x1=x0*.86,z1=sz(x1)+.02,ye=RH(x1,z1)+.12,p=[];
    for(let j=0;j<=16;j++){const t=j/16,z=1.9+(z1-1.9)*t,y=.1+(ye-.1)*Math.pow(t,2.2);p.push(...P(x0+(x1-x0)*t,y,z))}
    const w0=150*.06/1.9,w1=150*.06/z1;for(let j=2;j<p.length;j+=2){const t=j/(p.length-2),w=w0+(w1-w0)*t,zz=1.9+(z1-1.9)*t,c=lamp('#9a8058',[x0,.5,zz],[0,1,-.3]);stroke(g,[p[j-2]+w*.25,p[j-1]+w*.3,p[j]+w*.25,p[j+1]+w*.3],'rgba(4,3,3,.6)',w);stroke(g,[p[j-2],p[j-1],p[j],p[j+1]],c,w*.8);stroke(g,[p[j-2]-w*.2,p[j-1]-w*.2,p[j]-w*.2,p[j+1]-w*.2],rgba(lamp('#e8c898',[x0,.5,zz],[0,1,-.3]),.6),Math.max(.4,w*.25))}
}
  /* the sternpost: up from the stern's middle, its head bent over toward us */
  /* the lantern: a little lantern of clay and horn, hung by two cords that part upward to the post's shaft and to its head */
  /* its two cords part upward from the lantern: one to the rising limb of the neck nearest us, one to the outer back of the descending limb clear of the head */
  const[lx,ly]=P(...LP),s1=SW(.35,1.05),s2=SW(-.78,2.28);
  stroke(g,[lx-.6,ly-2,s1[0],s1[1]],'#6a5a40',.5);stroke(g,[lx+.6,ly-2,s2[0],s2[1]],'#6a5a40',.5);
  comp(g,'lighter',.4,()=>{pool(g,lx,ly+4,18,8,'#ff9a40',.45);pool(g,lx,ly+1,7,4,'#ffc070',.55)});
  poly(g,[lx-1.6,ly-2,lx+1.6,ly-2,lx+1.9,ly+2.6,lx-1.9,ly+2.6],'#5a3a22');R(g,lx-1,ly-1.2,2,3,'#ffd890');R(g,lx-.5,ly-.6,1,1.6,'#fff4d0');R(g,lx-1.9,ly+2.6,3.8,.6,'#3a2414');
  /* rain, faint, brighter where it falls through the lantern's light */
  if(SHARED.weather&&o.rain!==false){SHARED.weather.rain(g,o.t||3000,320,{density:.5,len:4,col:'rgba(150,160,180,.22)',wind:-1.2,seed:2307});
    clipTo(g,()=>{g.beginPath();g.ellipse(lx,ly+10,40,26,0,0,6.2832)},()=>SHARED.weather.rain(g,o.t||3000,320,{density:.9,len:4,col:'rgba(255,214,150,.4)',wind:-1.2,seed:2308}))}
  return{P,hz,lamp:[lx,ly]}}

/* ======== The foredeck by night, from aboard, looking forward (Chapter Twenty-Three, the skiff: 27:30-32) ========
   bowNight(g, o) paints the fore part of her deck seen from just forward of the hatch, a little to starboard of her middle line, looking
   forward on the same night: the deck narrowing to the round of the bow, the bulwarks on both sides planked in strakes with their rail
   on top, the anchors of the bow lying against the port bulwark under a cover of sailcloth, lashed as they lie (nothing of an anchor
   shows; the lashing runs along the cover, never across it), and the short foremast raked forward over the bow with the foresail furled
   along its upper part (no yard is seen). One lantern, hung by two cords that part upward from the rigging out of the picture, lights the
   near deck; toward the bow the light dies into the night, and at the bow the rail is no lighter than the night beyond it, so that the
   mast, which rises in front of the bow, stands across no line (CONTRIBUTING section 3: a mast across a level line). The sky above the
   rail is left transparent (o.sky false is the only way: the room paints the storm's night behind her).
     o.lp      where the lantern hangs, [x, y, z] in metres (default [-.2, 2.55, 6.5])
   bowGeo(o) gives the geometry without painting: P(x, y, z) to the screen, b(z) the half-breadth, s(z) the deck's rise, rh(z) the
   bulwark's height, rail(z, side) the top of the rail on the screen, lamp [x, y], lampFloor y, and outboard (the outline of what lies
   beyond the starboard rail, for a clip). bowSkiff(g, D, k, drop) paints the skiff alongside to starboard, being let down (k 0..1, its
   gunwale going down from a little above the rail to the rail) or falling away (drop 0..1), clipped to what is seen beyond the rail, and
   returns the rings at its two ends on the screen. */
const BW={F:150,E:1.7,hz:62,cam:.8,ZS:13,B:5};
function bowGeo(o){o=o||{};const{F,E,hz,ZS,B}=BW,cam=o.cam!=null?o.cam:BW.cam,
    b=z=>z<=4?B:z>=ZS?0:B*Math.sqrt(Math.max(0,1-Math.pow((z-4)/(ZS-4),2.2))),
    s=z=>z<=3?0:.9*Math.pow(Math.min(1,(z-3)/(ZS-3)),1.8),
    rh=z=>1.05+.2*clamp((z-6)/(ZS-6),0,1),
    P=(x,y,z)=>[160+F*(x-cam)/z,hz+F*(E-y)/z],
    LP=o.lp||[-.2,2.55,6.5],
    /* the bulwark's line round the deck, port aft to the bow and back to starboard aft, with its inward normals */
    C=[];
  for(let z=2.4;z<ZS-.6;z+=z<9?.4:.2)C.push([-b(z),z]);for(let i=0;i<=12;i++){const a=Math.PI*i/12,z0=ZS-.6;C.push([-b(z0)*Math.cos(a),z0+.6*Math.sin(a)*1])}
  for(let z=ZS-.8;z>=2.4;z-=z<9?.4:.2)C.push([b(z),z]);
  const N=C.map((p,i)=>{const a=C[Math.max(0,i-1)],c=C[Math.min(C.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1;return[tz/l,-tx/l]}),
    rail=(z,sd)=>P(sd*b(z),s(z)+rh(z)+.1,z),
    outboard=[];
  {const st=C.filter(p=>p[0]>0||p[1]>ZS-.65);for(const[x,z]of st)outboard.push(...P(x,s(z)+rh(z)+.1,z));outboard.push(420,outboard[outboard.length-1],420,-60,P(0,0,ZS)[0],-60)}
  return{F,E,hz,cam,ZS,b,s,rh,P,C,N,LP,lamp:P(...LP),lampFloor:P(LP[0],s(LP[2]),LP[2])[1],rail,outboard,
    mast:{z:10.4,ang:.74,len:10},o}}
/* the lantern's light on a face, by night: what little the night gives, the lamp's warm light by angle and distance, and beyond its
   reach the night's own darkness, so that the far bow is lost in it */
function bowLight(D,c,p,n){const L=D.LP,d=[L[0]-p[0],L[1]-p[1],L[2]-p[2]],l=Math.hypot(...d),q=Math.max(0,(n[0]*d[0]+n[1]*d[1]+n[2]*d[2])/l/(Math.hypot(...n)||1)),
    f=q/(1+Math.pow(l/2.6,2)),h=hex(c),k=Math.max(clamp((l-4.6)/3.4,0,1)*.7,clamp((p[2]-10.6)/1.5,0,1)),nt=hex('#07080c'),
    v=[h[0]*(.12+1.25*f),h[1]*(.13+1.0*f),h[2]*(.2+.6*f)];
  return toHex(v[0]+(nt[0]-v[0])*k,v[1]+(nt[1]-v[1])*k,v[2]+(nt[2]-v[2])*k)}
function bowNight(g,o){o=o||{};const D=bowGeo(o),{P,b,s,rh,C,N,ZS}=D,r=rng(23081),M=C.length-1,lt=(c,p,n)=>bowLight(D,c,p,n);
  /* the deck: planks that run fore and aft and close in with the bow, each its own tone, butts staggered inside their planks */
  const FL=C.map(([x,z])=>P(x,s(z),z)).flat();
  clipTo(g,()=>poly(g,FL.concat([360,200,-40,200])),()=>{for(let k=-21;k<21;k++){const u0=k/21,u1=(k+1)/21,zs=[];for(let z=1.6;z<=ZS;z+=z<8?.4:.2)zs.push(z);
      const W=z=>Math.max(b(z),.01),pa=zs.map(z=>P(u0*W(z),s(z),z)).flat(),pb=zs.map(z=>P(u1*W(z),s(z),z)).flat(),
        zc=3+r()*6,c=lt(tint('#8a6a48',(r()-.5)*.14),[(u0+u1)/2*W(zc),s(zc),zc],[0,1,0]);
      poly(g,pa.concat(ptsBackG(pb)),c);stroke(g,pa,'rgba(6,4,4,.5)',.5);
      const z0=2+((k*.618+.31)%1+1)%1*5;for(let z=z0;z<ZS-1;z+=5.6){const a=P(u0*W(z)+.03,s(z),z),e=P(u1*W(z)-.03,s(z),z);if(e[0]-a[0]>2.2&&z<9)R(g,a[0],a[1]-.25,e[0]-a[0],.5,'rgba(8,6,4,.45)')}}
    tex(g,'mott',.2,0,60,320,90,'overlay',.6);
    comp(g,'lighter',.2,()=>{const c=P(D.LP[0],0,D.LP[2]-.6);pool(g,c[0],c[1]+6,80,13,'#ffb060',1)});
    /* the shade along the foot of each bulwark */
    for(const[d,a]of[[.05,.3],[.14,.16]])stroke(g,C.map(([x,z],i)=>P(x+N[i][0]*d,s(z),z+N[i][1]*d)).flat(),`rgba(6,4,6,${a})`,1.2)});
  /* the bulwarks' inner faces, planked in three strakes that follow the sheer, butts inside their strakes; the rail on top */
  const at=(i,f,d)=>{const[x,z]=C[i],[nx,nz]=N[i];return P(x+nx*(d||0),s(z)+f,z+nz*(d||0))},H=i=>rh(C[i][1]);
  for(let i=0;i<M;i++){const[x,z]=C[i];poly(g,[...at(i,0),...at(i+1,0),...at(i+1,H(i+1)),...at(i,H(i))],lt('#7a5a3c',[x,.6,z],[N[i][0],0,N[i][1]]))}
  clipTo(g,()=>{const p=[];for(let i=0;i<=M;i++)p.push(...at(i,0));for(let i=M;i>=0;i--)p.push(...at(i,H(i)));poly(g,p)},()=>{tex(g,'wood',.2,0,30,320,120,'overlay',.4);
    for(const f of[.34,.67]){const p=[];for(let i=0;i<=M;i++){if(C[i][1]>ZS-2.2){if(p.length>2)stroke(g,p,'rgba(6,4,4,.4)',.5);p.length=0;continue}p.push(...at(i,H(i)*f))}if(p.length>2)stroke(g,p,'rgba(6,4,4,.4)',.5)}
    for(let j=0;j<3;j++){const f0=[0,.34,.67][j],f1=[.34,.67,1][j];for(let i=2+j*4+(r()*3|0);i<M-2;i+=9+(r()*5|0)){if(C[i][1]>ZS-2.6)continue;const a=at(i,H(i)*f0+.05),e=at(i,H(i)*f1-.05);if(Math.abs(e[1]-a[1])>1.4)stroke(g,[a[0],a[1],e[0],e[1]],'rgba(6,4,4,.3)',.5)}}});
  for(let i=0;i<M;i++){const[x,z]=C[i],h0=H(i),h1=H(i+1);poly(g,[...at(i,h0,.05),...at(i+1,h1,.05),...at(i+1,h1+.1,.05),...at(i,h0+.1,.05)],lt('#6a4a30',[x,h0,z],[N[i][0],.3,N[i][1]]))}
  /* the scuppers: small dark squares low in the bulwark, near us only */
  for(let i=3;i<M-3;i+=7){if(C[i][1]>8.5)continue;const a=at(i,.03),e=at(i+1,.03),hh=Math.max(.5,150*.07/C[i][1]);poly(g,[a[0],a[1],e[0],e[1],e[0],e[1]-hh,a[0],a[1]-hh],'#0a0606')}
  /* the foremast: from its partners on the deck it rakes forward over the bow and runs out of the picture's top, the foresail furled
     along its upper part (a roll a little wider than the spar, no tie across it); dark against the night, lit a little at its foot */
  {const m=D.mast,f0=[0,s(m.z),m.z],dir=[0,Math.cos(m.ang),Math.sin(m.ang)],pt=t=>P(0,f0[1]+dir[1]*m.len*t,f0[2]+dir[2]*m.len*t),
      wd=t=>.16*(1-.3*t),Q=[],Qb=[];
    for(let i=0;i<=24;i++){const t=i/24,p=pt(t),z=f0[2]+dir[2]*m.len*t,w=D.F*wd(t)/z;Q.push(p[0]-w,p[1]);Qb.unshift(p[0]+w,p[1])}
    const roll=[],rollB=[];for(let i=0;i<=20;i++){const t=.42+.46*i/20,p=pt(t),z=f0[2]+dir[2]*m.len*t,w=D.F*(.16+.22*Math.sin(Math.PI*i/20))/z;roll.push(p[0]-w*1.05,p[1]);rollB.unshift(p[0]+w*.9,p[1])}
    poly(g,roll.concat(rollB),lt('#9a9078',[0,6,13],[0,0,-1]));
    /* the spar in short lengths, each lit for where it is: its foot in the lantern's light, the rest lost in the night as the bow is */
    for(let i=0;i<24;i++){const t=(i+.5)/24,w=[0,f0[1]+dir[1]*m.len*t,f0[2]+dir[2]*m.len*t];
      poly(g,[Q[2*i],Q[2*i+1],Q[2*i+2],Q[2*i+3],Qb[46-2*i],Qb[47-2*i],Qb[48-2*i],Qb[49-2*i]],lt('#6a4a2c',w,[.2,0,-1]));
      stroke(g,[Q[2*i],Q[2*i+1],Q[2*i+2],Q[2*i+3]],rgba(lt('#c89a68',w,[0,0,-1]),.7),.5)}
    const pc=[...P(-.3,s(m.z),m.z-.3),...P(.3,s(m.z),m.z-.3),...P(.3,s(m.z)+.16,m.z-.3),...P(-.3,s(m.z)+.16,m.z-.3)];poly(g,pc,lt('#6e4e30',[0,.2,m.z],[0,.3,-1]))}
  /* the anchors of the bow, under a cover of sailcloth against the port bulwark, lashed as they lie: a long low heap with two humps
     where the stocks lie under it; the lashing runs along its top from end to end */
  {const z0=7.1,z1=9.0,x=z=>-b(z)+.25,P2=(u,h,z)=>P(x(z)+u,s(z)+h,z),top=[],base=[];
    for(let i=0;i<=16;i++){const z=z0+(z1-z0)*i/16,u=i/16,h=.18+.34*Math.sin(Math.PI*u)+.1*Math.exp(-Math.pow((u-.28)/.1,2))+.08*Math.exp(-Math.pow((u-.72)/.1,2));top.push(...P2(.75,h,z));base.push(...P2(1.35,0,z))}
    const back=[];for(let i=16;i>=0;i--){const z=z0+(z1-z0)*i/16;back.push(...P2(0,.05,z))}
    softShade(g,base.concat(ptsBackG(top)),.5);
    poly(g,back.concat(top),lt('#8e8670',[x(8)+.4,.5,8],[.4,.8,-.4]));poly(g,top.concat(ptsBackG(base)),lt('#8a8068',[x(8)+1,.3,8],[.5,.2,-.8]));
    clipTo(g,()=>{poly(g,back.concat(top));poly(g,top.concat(ptsBackG(base)))},()=>{tex(g,'mott',.4,0,60,200,40,'overlay',.7);
      for(const u of[.2,.5,.8]){const z=z0+(z1-z0)*u,a=P2(.1,.05,z),m=P2(.75,.5,z),e=P2(1.3,0,z);stroke(g,[a[0],a[1],m[0],m[1],e[0],e[1]],'rgba(30,24,20,.28)',.45)}});
    const lash=[];for(let i=0;i<=16;i++){const z=z0-.2+(z1-z0+.4)*i/16,u=i/16,h=.2+.36*Math.sin(Math.PI*clamp(u,0,1))+.02;lash.push(...P2(.78,h,z))}
    stroke(g,lash,lt('#5a4a32',[x(8),.6,8],[0,1,-.3]),.6);const la=P2(.05,.5,z0-.25),lb=P2(.05,.5,z1+.25);stroke(g,[lash[0],lash[1],la[0],la[1]],lt('#5a4a32',[x(8),.6,7],[0,1,-.3]),.5);stroke(g,[lash[lash.length-2],lash[lash.length-1],lb[0],lb[1]],lt('#5a4a32',[x(8),.6,9],[0,1,-.3]),.5)}
  /* the lantern: horn and clay, hung by two cords that part upward to the rigging out of the picture */
  if(o.lantern!==false){const[lx,ly]=D.lamp;stroke(g,[lx-.6,ly-2,lx-9,-4],'#6a5a40',.5);stroke(g,[lx+.6,ly-2,lx+8,-4],'#6a5a40',.5);
    comp(g,'lighter',.4,()=>{pool(g,lx,ly+3,20,7,'#ff9a40',.45);pool(g,lx,ly+1,7,3.6,'#ffc070',.55)});
    poly(g,[lx-1.6,ly-2,lx+1.6,ly-2,lx+1.9,ly+2.6,lx-1.9,ly+2.6],'#5a3a22');R(g,lx-1,ly-1.2,2,3,'#ffd890');R(g,lx-.5,ly-.6,1,1.6,'#fff4d0');R(g,lx-1.9,ly+2.6,3.8,.6,'#3a2414')}
  return D}
/* a soft shade under a thing that lies on the deck */
function softShade(g,p,a){comp(g,'multiply',a,()=>poly(g,p,'#3a3048'))}
/* bowSkiff(g, D, k, drop): the skiff alongside to starboard, being let down or falling away (see bowNight) */
function bowSkiff(g,D,k,drop){const{P,b,s,rh}=D,z0=4.4,z1=8.4,dr=drop||0,
    gw=z=>s(z)+rh(z)+.1+.5-.55*clamp(k,0,1)+.35*Math.pow(Math.abs((z-(z0+z1)/2)/((z1-z0)/2)),2.4)-dr*dr*3.2,
    xi=z=>b(z)+.45+.25*Math.sin(Math.PI*clamp((z-z0)/(z1-z0),0,1)),lt=(c,p,n)=>bowLight(D,c,p,n),
    top=[],low=[];
  for(let i=0;i<=14;i++){const z=z0+(z1-z0)*i/14;top.push(...P(xi(z),gw(z),z));low.push(...P(xi(z)+.12,gw(z)-.62,z))}
  clipTo(g,()=>poly(g,D.outboard),()=>{
    /* her port side, toward us: two strakes and a wale, the light dying toward her bow */
    poly(g,top.concat(ptsBackG(low)),lt('#6a5038',[xi(8),gw(8),8],[-1,.2,-.4]));
    clipTo(g,()=>poly(g,top.concat(ptsBackG(low))),()=>{const mid=[];for(let i=0;i<=14;i++){const z=z0+(z1-z0)*i/14;mid.push(...P(xi(z)+.06,gw(z)-.3,z))}stroke(g,mid,'rgba(8,6,4,.5)',.5);
      tex(g,'wood',.25,200,40,120,50,'overlay',.4)});
    stroke(g,top,lt('#b08a5c',[xi(8),gw(8),8],[-.5,1,-.5]),.7);
    /* her stem and sternpost, short, rising a little above the gunwale at each end */
    for(const z of[z0,z1]){const a=P(xi(z),gw(z),z),e=P(xi(z)+.05,gw(z)+.18,z+(z===z0?-.12:.12));stroke(g,[a[0],a[1],e[0],e[1]],lt('#6a5038',[xi(z),gw(z),z],[-1,.3,-.3]),1.1)}});
  return{rings:[P(xi(z0+.15),gw(z0+.15)+.05,z0+.15),P(xi(z1-.15),gw(z1-.15)+.05,z1-.15)],z0,z1}}

return{side,geo,anchor,wreckage,LIGHT,hawser:hawserS,deck,geoDeck,sternNight,nightGeo,bowGeo,bowNight,bowSkiff};
})();
