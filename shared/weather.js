/* Paul of Tarsus: rain, wind slant, puddles, and wet-surface helpers, shared by chapters with rain or storms.
   Loaded on demand via CHAP[n].needs (see need() in index.html). Registered in shared/pwa.js for offline play.

     puddles(w, y0, y1, n, seed)       deterministic list of [x, y, rx, ry] hollows for a wet floor
     wetGround(g, x0, y0, w, h, opt)   bakes wet sky sheen, damp wall/curb bases, and layered puddles into a room backdrop
     rain(g, t, w, opt)                draws short wind-slanted rain streaks, puddle ripples, and subtle ground splash flecks
                                       (kept short so no stroke reads as a long line crossing an upright)

   The wind (Chapter Sixteen's North wind, and every sea and coast scene after it):
     wind(o)                           what the wind does, and what each of its signs shows. o.from: where it blows from, a point of the
                                       compass ('n', 'nne', 'ne' ... 'nnw') or degrees; o.force: 0 calm, 1 light, 2 fresh, 3 strong,
                                       4 a gale; o.view: the way the picture looks (default 's'). Returns W = {from, force, view, deg,
                                       dx, dz, pennant, smoke, caps, drift}: dx is where it blows across the picture (1 to the right,
                                       -1 to the left), dz whether it blows into the picture (1, away from us) or out of it (-1). Each
                                       sign is worked out from the wind unless o names it: o.pennant, o.smoke, o.caps or o.drift is
                                       either {from, force} (that sign shows another wind: a pennant swung by the current at anchor)
                                       or the sign itself; o.smoke = {lee:1} lays the smoke back towards the hill in whose lee it rises,
                                       low and curling, which is how smoke lies wrong. So a puzzle can set every sign by itself.
                                         W.pennant {dx, dz, lift, flap}   lift: 0 hangs down, 1 stands straight out; flap: how fast it beats
                                         W.smoke   {dx, dz, rise, bend, curl}  rise: the part of its height it climbs before it bends
                                         W.caps    whitecaps for each 100 by 40 pixels of sea at middle distance (0 at force 0 and 1)
                                         W.drift   {dx, dz, speed}        which way and how fast the clouds go (shared/coast.js reads it)
     pennant(g, t, x, y, W, o)         a long narrow streamer of cloth flying from the tip of a stern ornament at x, y: tapered, beating
                                       in a travelling wave, lit on its upper edge. o.len (14), o.w (2.2), o.c its color. Reads W.pennant
                                       (or a sign given as W). Where it would hang straight down, keep the tip clear of the horizon:
                                       a hanging streamer across the level line of the sea is a cross (CONTRIBUTING section 3)
     smoke(g, t, x, y, W, o)           the smoke of a hearth or a fire at x, y: puffs that rise, bend with W.smoke and thin away, each
                                       a soft cluster of half pixels. o.h its height (24), o.c its color, o.a its strength, o.n puffs
     calm                              the wind of a still day: wind({force:0}) */
SHARED.weather=(()=>{
"use strict";
function puddles(w,y0,y1,n,seed){const r=rng(seed||1279),out=[];
  for(let i=0;i<n;i++){const x=18+r()*(w-36),y=y0+r()*(y1-y0),rx=6.5+r()*9.5,ry=1.2+r()*1.2;out.push([x,y,rx,ry])}
  return out}
/* wetGround: wet paving sheen, capillary damp darkening along wall/curb feet, and puddles with dark wet stone rims */
function wetGround(g,x0,y0,w,h,o){o=o||{};
  /* capillary damp darkening rising slightly up the wall base and pooling along the curb */
  if(o.damp!==false){const dh=o.dampH||6,dx=o.dampX!=null?o.dampX:x0,dw=o.dampW!=null?o.dampW:w;
    comp(g,'multiply',o.dampA||.38,()=>{
      g.fillStyle=lg(g,0,y0-dh,0,y0+2,['rgba(52,58,72,0)','rgba(52,58,72,.82)','rgba(42,48,62,.95)','rgba(52,58,72,0)']);
      g.fillRect(dx,y0-dh,dw,dh+4)});
    for(const seg of(o.walls||[])){const[wx,wy,ww,wh]=seg;
      comp(g,'multiply',.34,()=>{g.fillStyle=lg(g,0,wy-wh,0,wy+2,['rgba(46,52,66,0)','rgba(46,52,66,.9)']);g.fillRect(wx,wy-wh,ww,wh+2)})}}
  /* subtle overcast sky reflection across the wet paving */
  comp(g,'screen',o.sheen==null?.26:o.sheen,()=>{
    g.fillStyle=lg(g,0,y0,0,y0+h,['rgba(206,216,228,.88)','rgba(206,216,228,.18)']);
    g.fillRect(x0,y0,w,h)});
  /* puddles: damp darkened stone halo, sky-tinted water body, and soft sky glint */
  for(const[x,y,rx,ry]of(o.puddles||[])){
    oval(g,x,y+.2,rx+1.6,ry+.5,'rgba(44,50,64,.36)');
    oval(g,x,y,rx,ry,'rgba(82,96,116,.54)');
    oval(g,x-rx*.12,y-.25,rx*.62,Math.max(.55,ry*.46),'rgba(212,222,234,.44)')}}
/* rain: wind-slanted short rain streaks, animated concentric puddle ripples, and brief mist flecks on wet stone */
function rain(g,t,w,o){o=o||{};const r=rng(o.seed||1277),y1=o.y1||144,n=Math.round(w*(o.density||.42)),
    wind=o.wind==null?-1.35:o.wind,len=o.len||3.8,col=o.col||'rgba(216,226,238,.46)',spBase=o.speed||490;
  g.save();g.strokeStyle=col;g.lineWidth=.55;g.beginPath();
  for(let i=0;i<n;i++){const x0=r()*(w+24)-12,ph=r(),sp=.85+r()*.55,k=((t/spBase*sp+ph)%1),
      y=-len-2+k*(y1+len+4),x=x0+k*wind*10,dx=wind*(len/3.8);
    g.moveTo(x,y);g.lineTo(x+dx,y+len)}
  g.stroke();
  /* expanding concentric ripples on puddles (radii kept wide enough to never rasterize as a +) */
  if(o.puddles){for(let i=0;i<o.puddles.length;i++){const[px,py,rx,ry]=o.puddles[i];
    for(let j=0;j<2;j++){const k=((t/(920+(i%3)*140)+i*.37+j*.5)%1);if(k>.78)continue;
      const u=k/.78,rrx=1.8+u*Math.min(rx*.72,6.2),rry=Math.max(.5,rrx*.22),ox=(j?-.28:.24)*rx,oy=(j?.14:-.12)*ry;
      g.strokeStyle=`rgba(228,236,244,${(.52*(1-u)).toFixed(2)})`;g.lineWidth=.45;
      g.beginPath();g.ellipse(px+ox,py+oy,rrx,rry,0,0,6.2832);g.stroke()}}}
  /* brief horizontal surface splash glints on wet paving */
  if(o.splashY){const[sy0,sy1]=o.splashY,sn=Math.round(w*.06);
    for(let i=0;i<sn;i++){const k=((t/420+i*.29)%1);if(k>.22)continue;
      const u=k/.22,sx=12+((i*97+Math.floor(t/420)*43)%(w-24)),sy=sy0+((i*53)%Math.max(1,sy1-sy0));
      R(g,sx-1.2-u,sy,2.4+u*2,.5,`rgba(226,236,244,${(.45*(1-u)).toFixed(2)})`)}}
  g.restore()}
/* ---------- wind ---------- */
const PTS={n:0,nne:22.5,ne:45,ene:67.5,e:90,ese:112.5,se:135,sse:157.5,s:180,ssw:202.5,sw:225,wsw:247.5,w:270,wnw:292.5,nw:315,nnw:337.5};
const toDeg=d=>typeof d==='number'?d:PTS[d]==null?0:PTS[d];
/* how each sign answers a wind of a given force (0..4) */
const LIFT=[0,.42,.74,.9,.97],FLAP=[0,.55,1,1.5,2.2],RISE=[1,.62,.36,.2,.1],BEND=[0,.55,1,1.4,1.8],CAPS=[0,0,1.2,4,9],DRIFT=[0,.35,.65,1,1.5];
function blow(from,force,view){const f=clamp(force==null?2:force,0,4),a=(toDeg(from==null?'n':from)+180-toDeg(view==null?'s':view))*Math.PI/180,on=f>0?1:0;
  return{f,dx:Math.sin(a)*on,dz:Math.cos(a)*on}}
function wind(o){o=o||{};const view=o.view==null?'s':o.view,from=o.from==null?'n':o.from,{f,dx,dz}=blow(from,o.force,view),
    own=(s,make)=>{if(s==null)return make(f,dx,dz);if(s.from!=null||s.force!=null){const b=blow(s.from==null?from:s.from,s.force==null?f:s.force,view);return Object.assign(make(b.f,b.dx,b.dz),s)}return Object.assign(make(f,dx,dz),s)},
    pennant=own(o.pennant,(f,dx,dz)=>({dx,dz,lift:LIFT[f],flap:FLAP[f]})),
    smoke=o.smoke&&o.smoke.lee?Object.assign({dx:-dx*.7||-.5,dz:-dz*.5,rise:.3,bend:.45,curl:1},o.smoke):own(o.smoke,(f,dx,dz)=>({dx,dz,rise:RISE[f],bend:BEND[f],curl:0})),
    caps=typeof o.caps==='number'?o.caps:o.caps?CAPS[clamp(o.caps.force==null?f:o.caps.force,0,4)]:CAPS[f],
    drift=own(o.drift,(f,dx,dz)=>({dx,dz,speed:DRIFT[f]}));
  return{from,force:f,view,deg:toDeg(from),dx,dz,pennant,smoke,caps,drift}}
const calm=wind({force:0});
/* pennant: the centre line runs out from the tip along the wind as far as it lifts, and droops the rest of the way; a wave runs along it
   from the tip to the tail, growing toward the tail. Seen along the wind (dz), it is shorter. Its width tapers to a forked tail. */
function pennant(g,t,x,y,W,o){o=o||{};const P=W&&W.pennant||W||calm.pennant,len=(o.len||14)*(.5+.5*Math.min(1,(P.lift||0)*1.4)),wd=o.w||2.2,c=o.c||'#a8402c',hi=o.hi||tint(c,.32),dk=o.dk||tint(c,-.42),
    lift=P.lift||0,lat=Math.hypot(P.dx||0,(P.dz||0)*.35),sx=(P.dx||0)>=0?1:-1,ex=sx*lift*clamp(lat,.3,1),ey=1-lift+(P.dz||0)*lift*.08,
    n=12,T=[],B=[],ph=t/1000*(1.6+(P.flap||0)*2.4),amp=wd*(.25+(P.flap||0)*.3);
  for(let i=0;i<=n;i++){const s=i/n,droop=(1-lift)*s*s*.5,px=x+len*s*ex,py=y+len*s*(ey*.9+droop)+len*s*.06,
      ang=Math.atan2(ey+droop*2,ex||1e-3)+Math.PI/2,wave=lift>.05?Math.sin(s*5.2-ph)*amp*s:Math.sin(s*3.4-ph*.25)*wd*.5*s,
      cx=px+Math.cos(ang)*wave,cy=py+Math.sin(ang)*wave,hw=Math.max(.5,wd*(1-.62*s))/2;
    T.push([cx+Math.cos(ang)*hw,cy+Math.sin(ang)*hw-(ex?.0:0)]);B.push([cx-Math.cos(ang)*hw,cy-Math.sin(ang)*hw])}
  /* the swallowtail: the last fifth parts in two */
  const p=[];T.forEach(q=>p.push(q[0],q[1]));const m=T[n],k=B[n],mid=[(T[n-2][0]+B[n-2][0])/2,(T[n-2][1]+B[n-2][1])/2];
  p.push(mid[0]+(m[0]-mid[0])*.15+(k[0]-mid[0])*.15,mid[1]+(m[1]-mid[1])*.15+(k[1]-mid[1])*.15);for(let i=n;i>=0;i--)p.push(B[i][0],B[i][1]);
  poly(g,p,c);
  /* the light along whichever edge faces up, and the shade under the folds where the wave turns away */
  for(let i=0;i<n-1;i++){const a=T[i],b=T[i+1],up=a[1]<B[i][1];stroke(g,up?[a[0],a[1],b[0],b[1]]:[B[i][0],B[i][1],B[i+1][0],B[i+1][1]],hi,.5);
    if(Math.sin((i/n)*5.2-ph)>.55&&lift>.05)stroke(g,[(a[0]+B[i][0])/2,(a[1]+B[i][1])/2,(b[0]+B[i+1][0])/2,(b[1]+B[i+1][1])/2],rgba(dk,.7),.5)}}
/* smoke: n puffs on their way up a path that rises, then bends with the sign; each grows and thins as it goes. A puff is a few soft
   squares of half pixels, never a ring, so that nothing round lies behind a head. */
function smoke(g,t,x,y,W,o){o=o||{};const S=W&&W.smoke||W||calm.smoke,h=o.h||24,c=o.c||'#cfcac2',sh=o.sh||'#7c7888',n=o.n||16,per=o.period||(6000-Math.abs(S.dx||0)*1600),a0=o.a==null?.62:o.a,
    rise=S.rise==null?1:S.rise,bend=S.bend||0,dx=S.dx||0,curl=S.curl||0,L=o.light==null?-1:o.light,
    at=u=>{const v=Math.max(0,u-rise),up=Math.min(u,rise)+v*(1-Math.min(.85,bend*Math.abs(dx)*.55))-(curl?v*v*.5:0);
      return[x+dx*h*bend*v*(1.1+v*.6)+(curl?Math.sin(u*6)*1.5*u:0),y-h*up]};
  for(let i=0;i<n;i++){const u=((t/per)+i/n)%1,[px,py]=at(u),j=Math.sin(i*2.3+t/900)*u*1.6,s=(1+u*5)*(o.size||1),al=a0*Math.pow(1-u,1.2)*Math.min(1,u*6),r=rng(i*31+7);
    /* each puff: a shaded body and a lit side, built of a few soft blocks of half pixels */
    for(let k=0;k<5;k++){const ox=(r()-.5)*s*1.2,oy=(r()-.5)*s*.8,w=Math.max(.5,s*(.55+r()*.4)),hh=Math.max(.5,s*(.4+r()*.3));
      R(g,px+j+ox-w/2,py+oy-hh/2+hh*.25,w,hh*.75,rgba(sh,al*.5));R(g,px+j+ox-w/2+L*w*.18,py+oy-hh/2,w*.8,hh*.6,rgba(c,al*.6))}}}
return{puddles,wetGround,rain,wind,calm,pennant,smoke,PTS}})();
