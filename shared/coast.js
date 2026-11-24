/* Paul of Tarsus: the sea and the coast, shared by every chapter that sails or walks beside the sea (Chapter Sixteen first, then
   Seventeen and Twenty-Two to Twenty-Five: Cos, Rhodes, Tyre, the shipwreck, Malta). Painted to the standard of Chapter Fifteen: on the
   half-pixel canvas, light worked out for every pixel, soft contact shadows, no flat fills, and dithered once, by the engine, when the
   backdrop is baked. Loaded on demand via CHAP[n].needs (list 'coast', and 'weather' for the wind; 'country' too where a headland or a
   road is painted, since they borrow its rock and its tufts) and registered in shared/pwa.js for offline play. Every painter takes a
   seed of its own and draws nothing from the room's rng().

   One options object serves a whole picture. Make it once and hand it to every painter, so that all of them stand in the same light:
     O = {w:320, hz:62, hour:'morning', sun:[x,y], cloud:.3, wind:W, seed:7}
       w       the room's width; hz the horizon: one level for the whole scene, about the eyes of the people in it (eye(y) gives the eyes
               of a figure whose feet are at y). Sea, beach and paving all run back to it.
       hour    'dawn', 'morning', 'midday', 'evening' or 'night'. light(O) gives the light that goes with it (and keeps it on O.L):
               colors for sky, water, land, shadow and foam, and amb, the color a room hands to its figures (ART[id].light.amb).
       sun     where the sun stands, in room pixels; it may lie outside the picture (x < 0 or x > w, or y < 0), and then only its glow
               is seen. Leave it out and the sun is behind us, on the side O.light says (-1 left, 1 right; default -1): no road of light
               on the water then. moon: [x, y, phase] at night (phase 0 new .. .5 full .. 1 new; it is lit on the right while waxing).
       cloud   0 clear .. 1 overcast. wind: a wind from SHARED.weather.wind(); the sea's waves and whitecaps and the clouds' drift
               follow it. Calm if it is left out.
       F, eye  the focal length of the view in room pixels (default w) and the eye's height over the water in metres (2.2: standing
               on a quay or a deck). A room whose paving runs to the horizon uses the same vanishing line hz.

     light(O)                    the light of O.hour (see above), kept on O.L
     eye(y)                      the height of the eyes of a figure standing with its feet at y (y - 44): a good horizon for a room
                                 whose people stand about there
     sky(g, O)                   the sky above hz, worked out for every pixel: its gradient, the glow of the sun or moon, the disc,
                                 the stars at night, and the clouds (O.cloud) on a deck that lies in perspective and drifts with the
                                 wind; O.streak (0..1) draws them out along the wind. O.moving: leave the clouds out of the
                                 backdrop, for skyLayer to move them
     skyLayer(O)                 the moving sky for a room's draw: L = coast.skyLayer(O); L.draw(g, t). It paints the sky with its
                                 clouds where they have drifted to by t, above O.top(x) (the skyline: give it, or nothing but the
                                 sky above hz is touched) and outside O.cover ([x,y,w,h] boxes where something of the room stands
                                 against the sky). It is worked out about eight times a second and dithered as the backdrop is.
                                 Paint the backdrop with the same O and O.moving, and grade nothing over the sky afterwards
     sea(g, O)                   the sea from hz down to O.y1 (default 144), for every pixel: the swell and the waves seen in
                                 perspective, each pixel the color of the sky it mirrors over the color of the water, the road of
                                 light under the sun or the moon, a little haze at the horizon, and whitecaps as many as the wind
                                 has. Returns the sea's motion: S.draw(g, t) in the room's draw makes the glints twinkle, small waves
                                 run before the wind and the whitecaps break and fade, a few hundred half-pixel strokes a frame.
                                 S.open(x, y) says where open water is seen: set it to leave out what the room paints over the
                                 sea (a ship, a quay, an island): S.open = (x,y) => !(x > 200 && y < 104)
     seaMotion(O)                the same motion without painting, for a room whose paint has not run yet
     isle(g, x0, x1, h, O, o)    an island or a cape far off on the horizon, h at its highest, in the haze of its distance
                                 (o.dist: 0 near .. 1 at the edge of sight, default .7). o.kind: 'island' (both ends fall to the
                                 sea), or 'cape' with o.from 'l' or 'r', the side where it runs out of the picture. o.seed. Returns
                                 {top(x)}, the skyline it makes. An island on the horizon is fine; a mast or a post across it is not
     headland(g, O, o)           a headland or a stretch of cliff coming in from one side and falling to the sea: o.side 'l' or 'r',
                                 o.top (its ridge where it leaves the picture), o.xs, o.ys (the brow where the ridge ends), o.xf,
                                 o.foot (where the cliff stands in the water: below hz, nearer than the horizon), o.base (where its
                                 shore leaves the picture's edge: o.foot for a headland across the water, lower for a coast that
                                 comes toward us). Bedded rock (shared/country.js crag), scrub on the slope above the cliff (o.scrub
                                 0..1), wet rock and a lace of surf at its foot, o.dist for the haze. Returns {top(x), draw(g,t)}:
                                 draw moves the surf
     shore(g, O, o)              a beach between the water's edge o.edge(x) (a function: the sea lies above it) and o.y1, from o.x0
                                 to o.x1: o.kind 'sand' or 'shingle'. A wet band with the sky in it, a lace of foam along the edge,
                                 and dry sand or stones that grow toward us. Returns {draw(g,t)}: the wash runs up and back
     road(g, O, o)               a coast road along a slope: o.pts its middle from far to near (x,y pairs), o.w0 and o.w1 its width
                                 far and near, o.c its dust; worn wheel ruts, stones and dry tufts, and with o.kerb 'l' or 'r' a row of
                                 loose stones along its lower edge (no posts)
     quay(g, O, o)               a stone quay or mole. o.view 'top': we stand on it, its edge running across at o.y (a number or a
                                 function of x) with the sea beyond: a coping of long stones whose joints stop inside it, the paving
                                 toward us in perspective to hz (o.y1, o.c), wet stone along the lip, o.bollards [x, ...]: squat
                                 mooring stones as wide as they are tall, each with its shadow. o.view 'face': seen across the water,
                                 from o.x0 to o.x1, its top at o.y (at x0) falling o.slope for every pixel, o.face tall: ashlar
                                 courses with staggered joints, the wet dark band and weed at the water, its shadow in the water.
                                 No bollard is set where it would stand across the horizon. Returns {top(x)}
     town(g, O, o)               a harbor town in the same light: houses that step up a hill (o.hill(x): the hill's top; o.rows; o.size,
                                 the height of a house in the front row) above a waterfront at o.base, with o.warehouses [[x, w, h],
                                 ...]: long low stores with tiled roofs and wide doors. Flat roofs and low tiled ones, windows as
                                 small dark openings without bars, and no tower that rises from a wall. At
                                 night o.lamps (0..1) of the windows glow. Returns {top(x), hearths:[[x, y], ...]}: where smoke may
                                 rise (SHARED.weather.smoke)
     skyline(...fns)             one top(x) for several: the highest of them; for skyLayer's O.top
     land(g, L, dist, fn)        what the land painters above are built on: fn(q) paints on a layer of its own, which is then given
                                 the hour's light (L = light(O)) and the haze of its distance (0..1) and set into the picture, so
                                 that nothing round it is touched. A room may paint its own land with it (a wall, a tower on a hill)
     polyTop(p)                  the top of a filled outline (x,y pairs) as a function of x, for a skyline

   What a room painter must know. The horizon is O.hz and nothing else: the paving's vanishing line (pave(..., {vy:hz})), the sea's,
   the beach's, the far land's foot. Paint in this order: sky, isles, sea, headlands and town, quay or shore, then the room's own things,
   so that each hides what lies behind it (the sea is written over everything below hz that was painted before it, so paint it before
   whatever stands in the water); then give S.open and skyLayer's O.top and O.cover what the room has painted over sea and
   sky. Draw S.draw(g, t) (and L.draw, the shore's and the headland's draw) first in the room's draw, before anything that stands in
   front; they paint in room pixels from the room's left edge. Wind: W = SHARED.weather.wind({from:'n', force:2, view:'w'}); its signs
   are drawn with SHARED.weather.pennant and .smoke. Look at the stop `coast` (coast-sheet.png, coast-detail.png, coast-wind.png).
   Birds are left to shared/birds.js (ROOMS[id].birds). Nothing upright may stand across the horizon: a mast, a post, a pole;
   keep it out of the picture, or let land stand behind it (CONTRIBUTING section 3). */
SHARED.coast=(()=>{
"use strict";
const A='#1e1a32';
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const L3=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const C=c=>hex(c);
/* value noise, seeded, with optional period p (for a texture that tiles) */
function h2(i,j,s){let h=(Math.imul(i,374761393)+Math.imul(j,668265263)+Math.imul(s,1442695041))|0;h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296}
function vn(x,y,s,p){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy),
  I=p?((i%p)+p)%p:i,J=p?((j%p)+p)%p:j,I1=p?(I+1)%p:i+1,J1=p?(J+1)%p:j+1,a=h2(I,J,s),b=h2(I1,J,s),c=h2(I,J1,s),d=h2(I1,J1,s);
  return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function fbm(x,y,s,n,p){let v=0,a=.5,f=1,t=0;for(let k=0;k<n;k++){v+=a*vn(x*f,y*f,s+k*17,p?p*f:0);t+=a;f*=2;a*=.5}return v/t}

/* ---------- the light of the hour ---------- */
const HOURS={
  dawn:   {zen:'#33406e',mid:'#8c7fa6',hor:'#f2c69c',glow:'#ffcf96',glowK:1,sunC:'#fff2cc',deep:'#263656',body:'#364c6c',haze:'#b8a6ba',mul:'#e0c8cc',
           shad:'#56508e',amb:'#e6c8be',stars:.15,cLit:'#ffd6b4',cSh:'#786690',foam:'#f0dcd4',land:'#7c7488',key:'#ffd6ac',spec:1},
  morning:{zen:'#3a6eb2',mid:'#7aa6d2',hor:'#e2e6d8',glow:'#fff2cc',glowK:.8,sunC:'#fffbea',deep:'#22567e',body:'#2c6a8a',haze:'#bccad6',mul:'#fff6ec',
           shad:'#7a80b8',amb:'#f6f0e6',stars:0,cLit:'#fffaf0',cSh:'#a6b2cc',foam:'#f6f8f4',land:'#8a8c6c',key:'#fff4dc',spec:1},
  midday: {zen:'#2a62ae',mid:'#6a9cd2',hor:'#cddfea',glow:'#ffffff',glowK:.6,sunC:'#ffffff',deep:'#1a547e',body:'#26728e',haze:'#c4d2de',mul:'#ffffff',
           shad:'#8890c2',amb:'#ffffff',stars:0,cLit:'#ffffff',cSh:'#aeb8cc',foam:'#ffffff',land:'#8c8a66',key:'#ffffff',spec:.9},
  evening:{zen:'#44538c',mid:'#ae8aa0',hor:'#f6c286',glow:'#ffb866',glowK:1,sunC:'#ffe2a2',deep:'#283a60',body:'#3a4c68',haze:'#c69c98',mul:'#f4d0b8',
           shad:'#62558e',amb:'#f0d0b4',stars:0,cLit:'#ffcc96',cSh:'#7e6488',foam:'#f4dcc2',land:'#7e6e70',key:'#ffcc98',spec:1},
  night:  {zen:'#070a1c',mid:'#0e1430',hor:'#1e2850',glow:'#b4c4ea',glowK:.55,sunC:'#eeeee0',deep:'#070e1c',body:'#0c182a',haze:'#26304f',mul:'#3a4470',
           shad:'#121630',amb:'#4a5884',stars:1,cLit:'#59678e',cSh:'#161c34',foam:'#7888aa',land:'#1c2238',key:'#6a7cb0',spec:.7}};
function light(O){if(O.L&&O.L.O===O)return O.L;const H=HOURS[O.hour||'morning'],w=O.w||320,hz=O.hz==null?62:O.hz,cover=clamp(O.cloud||0,0,1),
    L={O,hour:O.hour||'morning',w,hz,cover,F:O.F||w,cx:O.cx==null?w/2:O.cx,night:(O.hour==='night')};
  for(const k in H)L[k]=typeof H[k]==='string'?C(H[k]):H[k];
  /* cloud greys the sky and the water and takes the edge off the light */
  if(cover){const grey=c=>{const m=c[0]*.3+c[1]*.59+c[2]*.11;return L3(c,[m*.98,m,m*1.03],cover*.55)};
    for(const k of['zen','mid','hor','deep','body','glow'])L[k]=grey(L[k]);L.zen=L3(L.zen,L.mid,cover*.4);L.glowK*=1-cover*.6;L.spec*=1-cover*.75}
  const sun=L.night?O.moon:O.sun;L.sunP=sun?[sun[0],sun[1]]:null;L.phase=O.moon&&O.moon[2]!=null?O.moon[2]:.5;
  L.side=O.light!=null?O.light:sun?Math.sign(sun[0]-L.cx)||-1:-1;
  /* where the light comes from, in the world: x across, y up, z into the picture */
  if(sun){const dx=(sun[0]-L.cx)/L.F,dy=(hz-sun[1])/L.F,n=Math.hypot(dx,dy,1);L.sd=[dx/n,dy/n,1/n]}
  else{const n=Math.hypot(L.side*.8,.5,1);L.sd=[L.side*.8/n,.5/n,-1/n]}
  L.amb=toHex(...(L.night?C(HOURS.night.amb):C(H.amb)).map((v,i)=>v*(1-cover*.15)));
  L.hex=k=>toHex(...L[k]);
  return O.L=L}
const eye=y=>y-44;

/* ---------- the sky ---------- */
/* skyRGB: the clear sky at x, y (no clouds, no disc) */
function skyRGB(L,x,y){const hz=L.hz,dy=hz-y,e=clamp(dy/Math.max(40,hz),0,1.4);
  let c=L3(L.hor,L.mid,smooth(0,.5,e));c=L3(c,L.zen,smooth(.3,1.15,e));
  if(dy<14)c=L3(c,L3(L.hor,[255,255,255],L.night?.05:.18),Math.exp(-Math.max(0,dy)/3.2)*.6);
  const P=L.sunP||[L.side<0?-L.w*.5:L.w*1.5,hz-L.F*.3],k=L.sunP?1:.35,d=Math.hypot((x-P[0])/L.F,(y-P[1])/L.F*1.2),
    gl=L.glowK*k*(.62*Math.exp(-d*14)+.34*Math.exp(-d*3.2)+.18*Math.exp(-Math.max(0,dy)/10)*Math.exp(-Math.abs(x-P[0])/(L.F*.7)));
  return L3(c,L.glow,clamp(gl,0,1))}
/* the stars: a fixed list for a seed, brighter toward the zenith; a bright one is one room pixel, square */
function starList(L,seed){const r=rng(seed+911),out=[];for(let i=0;i<L.w*L.hz/38;i++){const x=r()*L.w,y=Math.pow(r(),1.3)*(L.hz-3),b=r();out.push([x,y,b])}return out}
/* the cloud deck: a texture that tiles, made once for a seed and a streak, with the light on it from the sun's side, and its mipmaps */
const TEXC=new Map();
function cloudTex(seed,cover,streak,L){const key=[seed,cover.toFixed(2),streak.toFixed(2),L.sd.map(v=>v.toFixed(2)).join()].join('|');if(TEXC.has(key))return TEXC.get(key);
  const N=256,D=new Float32Array(N*N),th=.72-cover*.5;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i/N*12,v=j/N*12,w=fbm(u+fbm(u*.5,v*.5,seed+5,2,6)*1.4,v,seed,5,12);D[j*N+i]=smooth(th,th+.2+cover*.12,w)}
  /* light: what lies between a point and the sun shades it; the side turned to the sun is lit */
  const sx=L.sd[0],sz=L.sd[2],sn=Math.hypot(sx,sz)||1,ox=Math.round(sx/sn*5),oz=Math.round(sz/sn*5),Lt=new Float32Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=D[j*N+i];let b=0;for(let s=1;s<=3;s++)b+=D[((j+oz*s/3|0)+N*4)%N*N+((i+ox*s/3|0)+N*4)%N];Lt[j*N+i]=clamp(.78-b/3*.9+a*.15,0,1)}
  const mips=[[D,Lt,N]];let d=D,l=Lt,n=N;while(n>8){const m=n/2,d2=new Float32Array(m*m),l2=new Float32Array(m*m);
    for(let j=0;j<m;j++)for(let i=0;i<m;i++){const a=(2*j)*n+2*i;d2[j*m+i]=(d[a]+d[a+1]+d[a+n]+d[a+n+1])/4;l2[j*m+i]=(l[a]+l[a+1]+l[a+n]+l[a+n+1])/4}mips.push([d2,l2,m]);d=d2;l=l2;n=m}
  const T={mips,N,streak};if(TEXC.size>6)TEXC.delete(TEXC.keys().next().value);TEXC.set(key,T);return T}
function samp(T,lv,u,v){const[d,l,n]=T.mips[Math.min(lv,T.mips.length-1)],x=u*n-.5,y=v*n-.5,i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,
    i0=((i%n)+n)%n,j0=((j%n)+n)%n,i1=(i0+1)%n,j1=(j0+1)%n,a=j0*n+i0,b=j0*n+i1,c=j1*n+i0,e=j1*n+i1;
  return[(d[a]*(1-fx)+d[b]*fx)*(1-fy)+(d[c]*(1-fx)+d[e]*fx)*fy,(l[a]*(1-fx)+l[b]*fx)*(1-fy)+(l[c]*(1-fx)+l[e]*fx)*fy]}
/* skyPlan: everything about a sky that does not move, worked out once for every device pixel above the skyline */
function skyPlan(g,O,k,whole){const L=light(O),w=L.w,hz=L.hz,W=O.wind,top=!whole&&O.top||(()=>hz),H=Math.ceil(hz*k),Wd=Math.ceil(w*k),seed=O.seed||1,
    n=Wd*H,base=new Float32Array(n*3),mask=new Uint8Array(n),U=new Float32Array(n),V=new Float32Array(n),lv=new Uint8Array(n),fade=new Float32Array(n),
    dr=W&&W.drift||{dx:0,dz:0,speed:0},dn=Math.hypot(dr.dx,dr.dz),ea=dn?[dr.dx/dn,dr.dz/dn]:[1,0],streak=clamp(O.streak==null?(W?W.force*.12:0):O.streak,0,.9),
    T=L.cover>0?cloudTex(seed,L.cover,streak,L):null,cov=!whole&&O.cover||[],P=4.2/*world units in one tile*/;
  const stars=L.stars?starList(L,seed):[],sun=L.sunP,rs=L.night?3:3.4;
  for(let Y=0;Y<H;Y++){const y=(Y+.5)/k,dy=hz-y;for(let X=0;X<Wd;X++){const x=(X+.5)/k,i=Y*Wd+X;
      if(y>=top(x)||dy<=0)continue;let hide=0;for(const[a,b,c,d]of cov)if(x>=a&&x<a+c&&y>=b&&y<b+d){hide=1;break}if(hide)continue;mask[i]=1;
      let c=skyRGB(L,x,y);
      if(sun){const d=Math.hypot(x-sun[0],y-sun[1]);if(d<rs+.6){let a=clamp(rs+.5-d,0,1);
        if(L.night){/* the moon in her phase (0 new, .5 full): waxing she is lit on the right, waning on the left; the dark part is only
             a little lighter than the sky */
          const u=(x-sun[0])/rs,v=(y-sun[1])/rs,xt=Math.cos(2*Math.PI*L.phase)*Math.sqrt(Math.max(0,1-v*v)),lit=L.phase<=.5?u>xt:u<-xt;a*=lit?1:.1}
        c=L3(c,L.sunC,a)}}
      base[i*3]=c[0];base[i*3+1]=c[1];base[i*3+2]=c[2];
      if(T){const z=L.F/dy,Xw=(x-L.cx)/dy,ua=Xw*ea[0]+z*ea[1],vb=-Xw*ea[1]+z*ea[0],fp=Math.max(1/dy,L.F/(dy*dy))/k/P*T.N*(1+streak);
        U[i]=ua*(1-streak*.75);V[i]=vb;lv[i]=Math.max(0,Math.floor(Math.log2(Math.max(1,fp))));fade[i]=smooth(.4,7,dy)}}}
  for(const[x,y,b]of stars){if(b<1-L.stars)continue;const X=Math.floor(x*k),Y=Math.floor(y*k),big=b>.965,v=(.35+.65*b)*smooth(1,10,hz-y);
    for(let q=0;q<(big?2:1);q++)for(let p=0;p<(big?2:1);p++){const i=(Y+q)*Wd+X+p;if(i<n&&mask[i])for(let m=0;m<3;m++)base[i*3+m]+= (255-base[i*3+m])*v*(big?.9:.7)}}
  return{L,k,Wd,H,n,base,mask,U,V,lv,fade,T,dr,ea,P,cover:L.cover}}
/* skyPixels: the sky at time t into an ImageData-like array (alpha 255 where the sky is, 0 elsewhere) */
function skyPixels(S,t,out){const{L,n,base,mask,U,V,lv,fade,T,dr,P}=S,off=(t||0)/1000*(dr.speed||0)*.05,o1=off/P,
    lit=L.cLit,sh=L.cSh,hzc=L3(L.hor,L.haze,.3);
  for(let i=0;i<n;i++){const j=i*4;if(!mask[i]){out[j+3]=0;continue}let r=base[i*3],g=base[i*3+1],b=base[i*3+2];
    if(T){const[d,l]=samp(T,lv[i],U[i]/P-o1,V[i]/P);const a=d*fade[i];if(a>.002){
      const f=1-fade[i],cr=sh[0]+(lit[0]-sh[0])*l,cg=sh[1]+(lit[1]-sh[1])*l,cb=sh[2]+(lit[2]-sh[2])*l,
        rr=cr+(hzc[0]-cr)*f*.6,gg=cg+(hzc[1]-cg)*f*.6,bb=cb+(hzc[2]-cb)*f*.6,dk=1-.16*smooth(.7,1,d);
      r+=(rr*dk-r)*a;g+=(gg*dk-g)*a;b+=(bb*dk-b)*a}}
    out[j]=r;out[j+1]=g;out[j+2]=b;out[j+3]=255}}
function sky(g,O){const L=light(O),T=g.getTransform(),k=T.a,S=skyPlan(g,O,k,1),x0=Math.round(T.e),y0=Math.round(T.f);
  const im=g.getImageData(x0,y0,S.Wd,S.H),d=im.data,buf=new Float32Array(S.n*4);
  if(O.moving){const T0=S.T;S.T=null;skyPixels(S,0,buf);S.T=T0}else skyPixels(S,O.t||0,buf);
  for(let i=0;i<S.n;i++){const j=i*4;if(!buf[j+3])continue;d[j]=buf[j];d[j+1]=buf[j+1];d[j+2]=buf[j+2];d[j+3]=255}
  g.putImageData(im,x0,y0);return L}
/* skyLayer: the sky that moves, for a room's draw */
function skyLayer(O){let S=null,cv=null,cg=null,last=-1;const step=O.step||125;
  return{draw(g,t){if(!(O.cloud>0))return;if(!S){const k=HR;S=skyPlan(null,O,k);[cv,cg]=mk(S.Wd,S.H)}
      const f=Math.floor(t/step);if(f!==last){last=f;const im=cg.createImageData(S.Wd,S.H),buf=new Float32Array(S.n*4);skyPixels(S,f*step,buf);
        for(let i=0;i<buf.length;i++)im.data[i]=buf[i];cg.putImageData(im,0,0);finish(cv,cg,O.q||12)}
      g.drawImage(cv,0,0,S.Wd/HR,S.H/HR)}}}

/* ---------- the sea ---------- */
/* seaModel: the waves for a wind, in the world: x across, z into the picture, in metres. Each is [ux, uz, k, slope, phase]. The swell
   comes from a way of its own; the wind's waves spread round its way and are steeper as it blows harder. */
function seaModel(O){const L=light(O),W=O.wind||{force:0,dx:0,dz:0,caps:0},f=W.force||0,r=rng((O.seed||1)*7+3),
    /* the waves run mostly across our line of sight, so that their crests lie level as a painter sees them; the wind turns them a little */
    wd=Math.atan2(1,(W.dx||0)*.35),comps=[];
  const sw=Math.atan2(1,O.swell==null?-.3:O.swell);comps.push([Math.cos(sw),Math.sin(sw),2*Math.PI/32,.016+.007*f,r()*6.28]);
  comps.push([Math.cos(sw+.25),Math.sin(sw+.25),2*Math.PI/13,.014+.006*f,r()*6.28]);
  for(let i=0;i<13;i++){const lam=5*Math.pow(.66,i),a=wd+(r()-.5)*(1.1+f*.22),s=(f?.026+.012*f:.011)*(.75+r()*.5);comps.push([Math.cos(a),Math.sin(a),2*Math.PI/lam,s,r()*6.28])}
  return{L,W,f,comps,E:O.eye||2.2,lean:f*.1}}
/* the color of the sea at a pixel, and how much of the sun it gives back */
function seaPix(M,x,y,k){const L=M.L,hz=L.hz,F=L.F,E=M.E,yy=y-hz;if(yy<=0)return null;const z=E*F/yy,X=(x-L.cx)*z/F,
    fx=z/(F*k),fz=z*z/(E*F*k);let sx=0,sz=0,lost=0;
  for(const[ux,uz,kk,s,ph]of M.comps){const lam=2*Math.PI/kk,fp=Math.hypot(ux*fx,uz*fz),att=clamp((lam/fp-2.2)/3,0,1);
    if(att>0){let p=kk*(ux*X+uz*z)+ph;p+=M.lean*Math.sin(p);const c=Math.cos(p)*s*att;sx+=c*ux;sz+=c*uz}lost+=s*s*(1-att*att)*.5}
  const nn=Math.hypot(sx,1,sz),nx=-sx/nn,ny=1/nn,nz=-sz/nn,vn2=Math.hypot(X,E,z),vx=X/vn2,vy=-E/vn2,vz=z/vn2,d=vx*nx+vy*ny+vz*nz;
  let rx=vx-2*d*nx,ry=vy-2*d*ny,rz=vz-2*d*nz;const sig=Math.sqrt(lost),ry2=ry+1.3*sig;
  const cosT=clamp(-d+.55*sig,0,1),fr=.02+.98*Math.pow(1-cosT,5);
  let sk;if(rz>.05){const xs=L.cx+rx/rz*F,ys=hz-ry2/rz*F;sk=skyRGB(L,clamp(xs,-L.w,L.w*2),Math.max(ys,hz-L.F*1.5))}else sk=skyRGB(L,L.cx,hz-L.F);
  if(L.cover)sk=L3(sk,L3(L.cLit,L.cSh,.5),L.cover*.35);
  const body=L3(L.body,L.deep,smooth(2,70,z));let c=L3(body,L3(sk,L.deep,.12+.07*M.f),clamp(fr,0,1));
  /* the sun's road */
  /* the sun's road: the light comes back where a wave turns it to us; the waves are tilted toward and away from us far more than to
     the sides, so the road is long and narrow */
  let sp=0;if(L.sunP){const sd=L.sd,da=Math.atan2(rx,rz)-Math.atan2(sd[0],sd[2]),de=Math.asin(clamp(ry,-1,1))-Math.asin(sd[1]),
      sa=.0005+.0005*M.f+lost*.6,se=.0016+.0016*M.f+lost*3;
    sp=Math.exp(-(da*da/(2*sa)+de*de/(2*se)))*Math.pow(.0016/se,.18)*L.spec*2;
    /* the light breaks into glints, each a short level dash */
    if(sp>.01){const n=vn(x*.55,y*2.1,77)*.6+vn(x*1.3,y*3.7,78)*.4;sp*=.22+3.4*Math.pow(n,4.5)}}
  c=L3(c,L.sunC,clamp(sp,0,1));if(sp>1)c=L3(c,[255,255,250],clamp((sp-1)*.4,0,.6));
  c=L3(c,L3(L.hor,L.haze,.35),Math.exp(-yy/2.4)*.5);
  return[c,sp,z]}
/* cap: a whitecap s wide at x, y: the breaking crest, the foam spilling down its face in rows that each lie a little farther downwind
   (dx), and a thin streak blown on ahead. Every row is level; nothing stands up */
function cap(g,x,y,s,dx,col,a){R(g,x,y,s,.5,rgba(col,a));if(s<1.5)return;R(g,x+s*.08+dx*s*.12,y+.5,s*.84,.5,rgba(col,a*.65));
  const rows=Math.min(4,Math.floor(s/4));for(let k=1;k<=rows;k++)R(g,x+s*(.1+.08*k)+dx*s*.16*(k+1),y+.5+.5*k,s*(.78-.14*k),.5,rgba(col,a*(.45-.07*k)));
  if(s>3&&Math.abs(dx)>.2)R(g,dx>0?x+s*.9:x-s*.5*Math.abs(dx),y+.5,s*.5*Math.abs(dx),.5,rgba(col,a*.25))}
function seaMotion(O,glints){const L=light(O),M=seaModel(O),w=L.w,hz=L.hz,y1=O.y1||144,r=rng((O.seed||1)*13+5),W=M.W;
  if(!glints){glints=[];if(L.sunP)for(let i=0;i<4000&&glints.length<240;i++){const x=r()*w,y=hz+.5+Math.pow(r(),1.6)*(y1-hz-1),p=seaPix(M,x,y,HR);if(p&&p[1]>.32)glints.push([hp(x),hp(y),p[1]])}}
  const G=glints.map(([x,y,s])=>{const z=M.E*L.F/(y-hz);return[x,y,hp(clamp(.5+5/z,.5,3.5)),r()*6.28,180+r()*420,clamp(s,0,1)]});
  /* small waves that run before the wind: a dark trough and a lit crest a little downwind of it */
  const RP=[];for(let i=0;i<70;i++){const y=hz+1+Math.pow(r(),1.4)*(y1-hz-2),z=M.E*L.F/(y-hz);RP.push([r()*w,y,clamp(1.5+10/z,1,9),r()*6.28,clamp(6/z,.03,1.4)])}
  const S={hz,y1,w,L,W,glints:G,ripples:RP,open:(x,y)=>y>hz+.4&&y<y1-.4,
    draw(g,t){const gl=L.night?'rgba(236,238,226,':L.hour==='evening'||L.hour==='dawn'?'rgba(255,232,180,':'rgba(255,252,236,';
      for(const[x,y,ww,ph,sp,a]of G){const q=Math.sin(t/sp+ph);if(q>.45&&S.open(x,y))R(g,x-ww/2,y,ww,.5,gl+(a*(q-.45)*1.9).toFixed(2)+')')}
      const dx=W.dx||0,dz=W.dz||0,f=W.force||0,dk=L.night?'rgba(4,8,18,':'rgba(16,40,70,',li=L.night?'rgba(150,164,200,':'rgba(230,240,244,';
      for(const[x0,y,ww,ph,v]of RP){const u=((t/1000*(.4+f*.5)*v*(dx||.3)*8+x0)%(w+20)+w+20)%(w+20)-10,q=Math.sin(t/900+ph);if(q<-.2||!S.open(u,y))continue;
        const a=(.12+.12*(q+.2))*(f?1:.6),ln=dx*ww*.35;R(g,u,y,ww,.5,dk+a.toFixed(2)+')');if(f)R(g,u+ln+(dz>0?0:.5),y-.5,ww*.7,.5,li+(a*1.1).toFixed(2)+')')}
      /* whitecaps: each breaks, holds its foam a moment and fades, then another breaks elsewhere */
      const n=Math.round((W.caps||0)*w*(y1-hz)/4000);for(let i=0;i<n;i++){const T=2600+(i*373)%1700,tt=t+i*977,c=Math.floor(tt/T),u=(tt%T)/T;if(u>.8)continue;
        const rr=rng(i*7919+c*104729),y=hz+2+Math.pow(rr(),1.25)*(y1-hz-4),x=rr()*w,z=M.E*L.F/(y-hz),s=clamp(L.F/z*(.5+rr()*.9),.5,14);if(!S.open(x,y))continue;
        const e=u<.18?u/.18:1-(u-.18)/.62;cap(g,x,y,s*(.6+e*.5),dx,L.night?'#8c9ab8':'#fafcfa',.95*e)}}};
  return S}
function sea(g,O){const L=light(O),M=seaModel(O),T=g.getTransform(),k=T.a,y1=O.y1||144,hz=L.hz,w=L.w,X0=Math.round(T.e),Y0=Math.round(T.f+hz*k),
    Wd=Math.ceil(w*k),H=Math.ceil((y1-hz)*k),im=g.getImageData(X0,Y0,Wd,H),d=im.data,r=rng((O.seed||1)*31+9),gl=[];
  for(let Y=0;Y<H;Y++){const y=hz+(Y+.5)/k;for(let X=0;X<Wd;X++){const x=(X+.5)/k,p=seaPix(M,x,y,k);if(!p)continue;const i=(Y*Wd+X)*4;
      d[i]=p[0][0];d[i+1]=p[0][1];d[i+2]=p[0][2];d[i+3]=255;if(p[1]>.32&&r()<.012)gl.push([x,y,p[1]])}}
  g.putImageData(im,X0,Y0);
  /* whitecaps fixed in the backdrop, fewer than the moving ones: a short crest of foam, its spray blown downwind */
  const W=M.W,n=Math.round((W.caps||0)*w*(y1-hz)/4000*.5),dx=W.dx||0,fo=L.hex('foam');
  for(let i=0;i<n;i++){const y=hz+2+Math.pow(r(),1.25)*(y1-hz-4),x=r()*w,z=M.E*L.F/(y-hz),s=clamp(L.F/z*(.4+r()*.8),.5,12);
    if(s>2)R(g,x+s*.1,y+1,s*.8,.5,rgba(L.hex('deep'),.25));cap(g,x,y,s,dx,fo,.85)}
  while(gl.length>240)gl.splice(Math.floor(r()*gl.length),1);
  return seaMotion(O,gl)}

/* ---------- land: grading, islands, headlands ---------- */
/* land: paint something of the land on a layer of its own, lay the hour's light over it (the hour's color multiplied in, and the haze
   of its distance, dist 0..1), and set it into the picture; nothing outside what was painted is touched. fn(q) paints on the layer and
   may return an object; its after(g), if it has one, is painted over the finished land (lamps, foam), and it is returned. */
function land(g,L,dist,fn){const T=g.getTransform(),cv=g.canvas,[c,q]=mk(cv.width,cv.height);q.setTransform(T);const ret=fn(q)||{};
  const[m,mq]=mk(cv.width,cv.height);mq.drawImage(c,0,0);
  q.save();q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='multiply';q.fillStyle=L.hex('mul');q.fillRect(0,0,cv.width,cv.height);
  if(dist>0){q.globalCompositeOperation='source-over';q.globalAlpha=clamp(dist,0,1)*.85;q.fillStyle=L.hex('haze');q.fillRect(0,0,cv.width,cv.height)}
  q.globalAlpha=1;q.globalCompositeOperation='destination-in';q.drawImage(m,0,0);q.restore();
  g.save();g.setTransform(1,0,0,1,0,0);g.drawImage(c,0,0);g.restore();if(ret.after)ret.after(g);return ret}
function isle(g,x0,x1,h,O,o){o=o||{};const L=light(O),hz=L.hz,dist=o.dist==null?.7:o.dist,s=o.seed||(x0*7+x1*3+h|0),kind=o.kind||'island',from=o.from||'r',W=x1-x0,
    f=x=>{const u=(x-x0)/W;if(u<0||u>1)return 0;let e;
      if(kind==='cape'){const v=from==='r'?u:1-u;e=Math.pow(smooth(0,1,v*1.15),.8)*(1+.06*Math.sin(v*9))}
      else e=Math.pow(Math.sin(Math.PI*Math.pow(u,o.lean||1)),.55);
      return h*e*(.82+.36*fbm(x/14,0,s,3))*(kind==='cape'?1:smooth(0,.06,u)*smooth(1,.94,u))},
    top=x=>{const v=f(x);return v>0?hz-v:Infinity};
  const pts=[x0,hz+.2];for(let x=x0;x<=x1;x+=.5)pts.push(x,hz-f(x));pts.push(x1,hz+.2);
  const land=L3(L.land,L.haze,.5+dist*.45),lit=L3(land,L.key,.22*(1-dist*.6)),dk=L3(land,L.shad,.3*(1-dist*.5));
  poly(g,pts,toHex(...land));
  clipTo(g,()=>poly(g,pts),()=>{
    /* slopes turned to the light a little lighter, those turned from it a little darker; nothing runs down to the waterline */
    for(let x=x0;x<x1;x+=.5){const sl=(f(x+1)-f(x-1))/2*(-L.side),t=hz-f(x),dd=Math.min(f(x)*.8,3+Math.abs(sl)*10);if(Math.abs(sl)<.04||dd<.5)continue;
      g.fillStyle=lg(g,0,t,0,t+dd,[rgba(toHex(...(sl>0?lit:dk)),Math.min(.8,Math.abs(sl)*2)),rgba(toHex(...(sl>0?lit:dk)),0)]);g.fillRect(x,t,.5,dd)}
    if(dist<.6)tex(g,'mott',.3*(1-dist),x0,hz-h-2,W,h+3,'overlay',1);
    /* the shade along its foot, and a pale line where the sea meets it */
    g.fillStyle=lg(g,0,hz-Math.max(1,h*.25),0,hz,[rgba(toHex(...dk),0),rgba(toHex(...dk),.5)]);g.fillRect(x0,hz-h,W,h)});
  if(dist<.75)for(let x=x0+2;x<x1-2;x+=.5)if(f(x)>.8)R(g,x,hz-.5,.5,.5,rgba(L.hex('foam'),.25*(1-dist)));
  return{top}}

/* headland: the ridge from the picture's edge to the brow, the cliff from the brow to the water, and the shore back to the edge */
function headland(g0,O,o){const L=light(O);return land(g0,L,o.dist||0,g=>{const hz=L.hz,w=L.w,s=o.seed||17,r=rng(s),side=o.side||'l',E=side==='l'?0:w,sg=side==='l'?1:-1,
    top=o.top,xs=o.xs,ys=o.ys,xf=o.xf,foot=o.foot,base=o.base==null?o.foot:o.base,dist=o.dist||0,
    ridge=[],cliff=[];
  for(let i=0;i<=24;i++){const u=i/24,x=E+(xs-E)*u,y=top+(ys-top)*(u*u*(3-2*u)*.7+u*.3)+(i&&i<24?(fbm(u*6,1,s,3)-.5)*Math.abs(ys-top)*.35:0);ridge.push(x,y)}
  /* the cliff: a few steps of rock down to the water, never leaning out */
  let x=xs,y=ys;for(let i=1;i<=7;i++){const u=i/7,nx=xs+(xf-xs)*u+(i<7?(r()-.5)*Math.abs(xf-xs)*.25:0),ny=ys+(foot-ys)*u;
    x=sg>0?Math.max(x,nx):Math.min(x,nx);y=ny;cliff.push(x,y)}
  /* the shore that comes back to the edge, in a few bays */
  const shore=[];for(let i=1;i<=8;i++){const u=i/8,sx=xf+(E-xf)*u,sy=foot+(base-foot)*Math.pow(u,1.6)+(i<8?Math.sin(u*9+s)*1.2*u:0);shore.push(sx,sy)}
  const P=[E,top].concat(ridge,cliff,shore,[E,base]);
  const yTop=Math.min(top,ys)-2,box=[Math.min(E,xf)-2,yTop,Math.abs(xf-E)+4,Math.max(base,foot)-yTop+2];
  const CO=SHARED.country,rock=o.rock||'#b5a58a';
  if(CO)CO.crag(g,P,rock,s,{light:L.side,dip:o.dip==null?-.05*sg:o.dip,bed:o.bed||7,scrub:0});
  else{poly(g,P,rock);clipTo(g,()=>poly(g,P),()=>tex(g,'mott',.5,...box,'overlay',1))}
  /* the slope above the brow is scrub: a mat of dark green with lit tops, thinning toward the cliff */
  const scrub=o.scrub==null?.7:o.scrub,band=x=>{let y0=Infinity;for(let i=0;i<ridge.length-2;i+=2)if((x-ridge[i])*(x-ridge[i+2])<=0){const t=(x-ridge[i])/((ridge[i+2]-ridge[i])||1);y0=ridge[i+1]+(ridge[i+3]-ridge[i+1])*t}return y0};
  if(scrub>0)clipTo(g,()=>poly(g,P),()=>{const gr=o.green||'#5c6c40';
    for(let i=0;i<Math.abs(xs-E)*scrub*7;i++){const x=E+(xs-E)*Math.pow(r(),.8),y0=band(x),d=Math.pow(r(),1.6)*(Math.abs(foot-ys)*.5+6)*(1-Math.abs(x-E)/Math.abs(xs-E)*.6);
      if(!isFinite(y0))continue;const y=y0+d,sz=.8+r()*2.2*(1-dist),cc=r()<.5?gr:tint(gr,r()<.5?.16:-.2);
      if(sz<1.1){R(g,x,y,.5+sz*.5,.5,cc);continue}R(g,x-sz*.6-L.side*.4,y+.3,sz*1.2,.5,rgba(A,.25));poly(g,[x-sz*.6,y,x-sz*.4,y-sz*.5,x+sz*.1,y-sz*.7,x+sz*.6,y-sz*.3,x+sz*.6,y],cc);
      R(g,L.side<0?x-sz*.4:x,y-sz*.6,sz*.5,.5,tint(cc,.3))}});
  /* the foot: along the water's edge the rock is wet and dark for a pixel or two, and tumbled stones lie at it, larger toward us */
  const wl=[xf,foot].concat(shore),lace=[];
  for(let i=2;i<wl.length;i+=2){const ax=wl[i-2],ay=wl[i-1],bx=wl[i],by=wl[i+1],n=Math.max(1,Math.hypot(bx-ax,by-ay)*2);
    for(let k=0;k<n;k++){const t=k/n,px=ax+(bx-ax)*t,py=ay+(by-ay)*t;if(py<hz+.5)continue;const d=clamp((py-hz)/30,0,1);
      R(g,px-.25,py-1.5-d*2,.5,1.5+d*2,rgba('#1a1a26',.28));R(g,px-.25,py-.8-d,.5,.8+d,rgba('#1a1a26',.35));lace.push([px,py,r()*6.28])}}
  if(CO)for(let i=0;i<lace.length;i+=1+Math.floor(r()*6)){const[px,py]=lace[i],d=clamp((py-hz)/40,0,1),sz=(.8+d*4)*(.4+r()*1.2),near=1-i/lace.length;
    if(r()<.12+.45*near*near&&sz>1.2)CO.boulder(g,px+(r()-.5)*2,py+.2+r()*d*2,sz*(1.2+r()*.6),sz,tint(rock,-.05-r()*.15),s+i*7,{light:L.side})}
  const fo=L.hex('foam');
  return{top:polyTop(P),after(g){for(const[px,py,ph]of lace){const k=vn(px/5,py/5,s);if(k>.45)R(g,px+sg*.5,py-.5,.5,.5,rgba(fo,(k-.45)*1.4*(1-dist)))}},
    draw(g,t){for(const[px,py,ph]of lace){const q=Math.sin(t/700+ph);if(q>.3)R(g,px+sg*(.5+q),py-.5,.5+q,.5,rgba(fo,(.7*(q-.3)*(1-dist)).toFixed(2)))}}}})}

/* ---------- beach ---------- */
function shore(g0,O,o){const L=light(O);return land(g0,L,0,g=>{const s=o.seed||23,r=rng(s),x0=o.x0||0,x1=o.x1==null?L.w:o.x1,E=o.edge,y1=o.y1||144,kind=o.kind||'sand',
    sand=C(o.c||(kind==='sand'?'#c8b48c':'#a49a8a')),wetB=o.wet||5;
  const P=[x0,y1];for(let x=x0;x<=x1;x+=1)P.push(x,E(x));P.push(x1,E(x1),x1,y1);
  const top=Math.min(...P.filter((v,i)=>i%2&&i>1));
  clipTo(g,()=>poly(g,P),()=>{const sc=toHex(...sand);g.fillStyle=lg(g,0,top,0,y1,[tint(sc,-.08),sc,tint(sc,.05)]);g.fillRect(x0,top,x1-x0,y1-top);
    tex(g,'mott',.35,x0,top,x1-x0,y1-top,'overlay',1);tex(g,'grain',.16,x0,top,x1-x0,y1-top,'overlay',.5);
    /* the wet band: darker, with the sky lying in it as a film */
    for(let x=x0;x<x1;x+=.5){const e=E(x),wb=wetB*(.6+.6*fbm(x/9,0,s,2));g.fillStyle=lg(g,0,e,0,e+wb,[rgba('#3a3446',.42),rgba('#3a3446',.12),rgba('#3a3446',0)]);g.fillRect(x,e,.5,wb)}
    for(let i=0;i<(x1-x0)/6;i++){const x=x0+r()*(x1-x0),e=E(x),ww=4+r()*14;R(g,x,e+.5+r()*wetB*.6,ww,.5,rgba(toHex(...skyRGB(L,x,L.hz-20)),.22+r()*.2))}
    if(kind==='sand'){/* ripples the wind and the water left, long and low, and here and there a shell or a strand of weed */
      for(let i=0;i<(x1-x0)*(y1-top)/90;i++){const y=top+Math.pow(r(),.8)*(y1-top),x=x0+r()*(x1-x0),k=(y-top)/(y1-top+1),ww=2+k*8;R(g,x,y,ww,.5,rgba(r()<.5?'#5a4a3a':'#fff4dc',.08+.08*k))}
      for(let i=0;i<(x1-x0)/14;i++){const y=top+wetB+r()*(y1-top-wetB),x=x0+r()*(x1-x0);R(g,x,y,.5+r()*.6,.5,r()<.5?'#efe6d6':'#5a5040')}}
    else{/* shingle: stones that grow toward us, each with its lit top and its shadow; glossy where they are wet */
      const st=[];for(let i=0;i<(x1-x0)*(y1-top)/7;i++){const k=Math.pow(r(),.7),y=top+1+k*(y1-top-1);st.push([x0+r()*(x1-x0),y,k,r(),r()])}st.sort((a,b)=>a[1]-b[1]);
      for(const[x,y,k,a,b]of st){const sz=(.5+k*2.4)*(.6+a*.8),cc=tint(['#a89c8a','#8c8478','#c2b8a4','#9a8c76','#d4ccb8','#7a7068'][Math.floor(b*6)],(r()-.5)*.2),wet=y<E(x)+wetB;
        if(sz<1.1){R(g,x,y,.5,.5,wet?tint(cc,-.3):cc);continue}const hh=sz*.55;
        R(g,x-sz*.5-L.side*sz*.3,y+.2,sz*1.2,.5,rgba(A,.3));poly(g,[x-sz*.6,y,x-sz*.45,y-hh*.7,x,y-hh,x+sz*.45,y-hh*.7,x+sz*.6,y,x,y+hh*.25],wet?tint(cc,-.3):cc);
        R(g,L.side<0?x-sz*.35:x,y-hh*.85,sz*.4,.5,tint(cc,wet?.5:.3))}}
    ao(g,x0,top,x1-x0,4,'t',.15,'#2a2440')});
  /* the lace of foam along the edge */
  const fo=L.hex('foam'),pts=[];for(let x=x0;x<x1;x+=1)pts.push([x,E(x),r()*6.28,.5+r()*.8]);
  return{after(g){for(const[x,e,ph,a]of pts)if(Math.sin(ph)>-.4)R(g,x,e-.2,1,.5,rgba(fo,.55*a))},draw(g,t){const u=Math.sin(t/2300);for(const[x,e,ph,a]of pts){const q=Math.sin(t/1100+x/19+ph*.3),dy=u*1.2+q*.4;if(dy<-.2)continue;R(g,x,e+dy,1,.5,rgba(fo,(.6*a*clamp(.3+q,0,1)).toFixed(2)));
      if(dy>.6&&a>.9)R(g,x,e+dy*.4,1,.5,rgba(fo,.18))}}}})}

/* ---------- the coast road ---------- */
function road(g0,O,o){const L=light(O);return land(g0,L,0,g=>{const p=o.pts,s=o.seed||31,r=rng(s),c=o.c||'#c4ac84',n=p.length/2,Lf=[],Rt=[],CO=SHARED.country;
  for(let i=0;i<n;i++){const x=p[2*i],y=p[2*i+1],a=Math.max(0,i-1),b=Math.min(n-1,i+1),tx=p[2*b]-p[2*a],ty=p[2*b+1]-p[2*a+1],tl=Math.hypot(tx,ty)||1,
      hw=((o.w0||3)+((o.w1||14)-(o.w0||3))*i/(n-1))/2,nx=-ty/tl,ny=tx/tl;Lf.push(x+nx*hw,y+ny*hw*.5);Rt.unshift(x-nx*hw,y-ny*hw*.5)}
  const Q=Lf.concat(Rt);
  const ys=Q.filter((v,i)=>i%2),xs=Q.filter((v,i)=>!(i%2)),bx=[Math.min(...xs)-2,Math.min(...ys)-2,Math.max(...xs)-Math.min(...xs)+4,Math.max(...ys)-Math.min(...ys)+4];
  clipTo(g,()=>poly(g,Q),()=>{g.fillStyle=lg(g,0,bx[1],0,bx[1]+bx[3],[tint(c,-.05),c,tint(c,.06)]);g.fillRect(...bx);tex(g,'mott',.4,...bx,'overlay',1);tex(g,'grain',.18,...bx,'overlay',.5);
    /* two worn ruts, running with the road */
    for(const f of[-.28,.22]){const q=[];for(let i=0;i<n;i++){const a=Lf.slice(2*i,2*i+2),b=Rt.slice(2*(n-1-i),2*(n-1-i)+2);q.push(a[0]+(b[0]-a[0])*(.5+f),a[1]+(b[1]-a[1])*(.5+f))}
      stroke(g,q,rgba('#5a4636',.22),1);stroke(g,q.map((v,i)=>i%2?v+.5:v),rgba('#fff4dc',.12),.5)}
    for(let i=0;i<bx[2]*bx[3]/14;i++){const x=bx[0]+r()*bx[2],y=bx[1]+r()*bx[3],k=(y-bx[1])/bx[3];R(g,x,y,.5+k,.5,rgba(r()<.5?'#fff0d0':'#4a3a2e',.18+.12*k))}
    ao(g,bx[0],bx[1],bx[2],bx[3],'t',.1,'#2a2440')});
  stroke(g,Lf,rgba('#3a3040',.2),.5);
  /* along its lower edge: loose stones; along both, dry tufts */
  const edge=o.kerb==='r'?Rt.slice().reverse():o.kerb==='l'?Lf:null;
  if(edge)for(let i=0;i<edge.length-2;i+=2){const ax=o.kerb==='r'?edge[i+1]:edge[i],ay=o.kerb==='r'?edge[i]:edge[i+1],bx2=o.kerb==='r'?edge[i+3]:edge[i+2],by=o.kerb==='r'?edge[i+2]:edge[i+3];
    for(let t=0;t<1;t+=.35+r()*.3){const x=ax+(bx2-ax)*t,y=ay+(by-ay)*t,k=clamp((y-bx[1])/bx[3],0,1),sz=1+k*2.6;
      if(CO)CO.boulder(g,x,y+sz*.2,sz*1.6,sz,'#a8a08c',s+i*13+(t*100|0),{light:L.side});else poly(g,[x-sz,y,x-sz*.6,y-sz*.8,x+sz*.6,y-sz*.8,x+sz,y],'#a8a08c')}}
  if(CO)for(let i=0;i<n*1.4;i++){const j=Math.floor(r()*n),side=r()<.5,q=side?Lf:Rt,k=side?j:n-1-j,x=q[2*k]+(r()-.5)*3,y=q[2*k+1]+r()*1.5;CO.tuft(g,x,y,1+j/n*2.6,'#a89a62',r)}
})}

/* ---------- quay and mole ---------- */
function bollard(g,L,x,y,sz){const h=sz,w=sz*.9,c='#8d8a92',sd=L.side;
  poly(g,[x-w/2,y,x+w/2,y,x+w/2-sd*h*1.2+w*.2,y+h*.5,x-w/2-sd*h*1.2,y+h*.5],rgba('#2a2840',.35));
  poly(g,[x-w/2,y,x-w/2+.6,y-h,x+w/2-.6,y-h,x+w/2,y],c);R(g,x-w/2+.6,y-h,w-1.2,.8,'#e8e0cc');R(g,sd<0?x-w/2+.6:x+w/2-1.1,y-h+.8,.5,h-.8,'#c8c0ac');
  R(g,sd<0?x+w/2-1.1:x-w/2+.6,y-h+.8,.5,h-.8,'#5e5c6c');R(g,x-w/2+.4,y-h*.45,w-.8,.5,'rgba(40,36,56,.35)')}
function quay(g0,O,o){const L=light(O);return land(g0,L,o.dist||0,g=>{const hz=L.hz,w=L.w,s=o.seed||41,r=rng(s),view=o.view||'top';
  if(view==='top'){const Y=typeof o.y==='function'?o.y:()=>o.y,y1=o.y1||144,x0=o.x0||0,x1=o.x1==null?w:o.x1,ch=o.ch||3,c=o.c||'#c4b896',cope=o.cope||'#d2c6a6';
    /* the water just off the lip lies in the quay's shade */
    for(let x=x0;x<x1;x+=.5)ao(g,x,Y(x)-6,.5,6,'b',.3,'#0e2036');
    const P=[x0,Y(x0)];for(let x=x0;x<=x1;x+=2)P.push(x,Y(x));P.push(x1,Y(x1),x1,y1,x0,y1);
    clipTo(g,()=>poly(g,P),()=>{const yy=Math.min(Y(x0),Y(x1));
      if(typeof pave==='function'){const rr=rng(s+1);pave(g,x0,yy+ch,x1,y1,c,rr,{vx:o.vx==null?w/2:o.vx,vy:hz,rows:o.rows||5,step:o.step||34,v:.08})}
      /* worn and stained where loads are carried, and damp near the lip */
      for(let i=0;i<(x1-x0)/26;i++){const x=x0+r()*(x1-x0),y=yy+ch+2+r()*(y1-yy-ch-2),k=(y-yy)/(y1-yy);oval(g,x,y,6+k*14,1.2+k*2.4,'rgba(112,96,72,.08)')}
      if(o.wet!==false){g.fillStyle=lg(g,0,yy+ch,0,yy+ch+6,['rgba(40,44,64,.25)','rgba(40,44,64,0)']);g.fillRect(x0,yy+ch,x1-x0,6)}});
    /* the coping: long stones, the joints stopping inside the course */
    for(let x=x0;x<x1;x+=.5){const y=Y(x);R(g,x,y,.5,ch,cope);}
    clipTo(g,()=>{g.beginPath();g.moveTo(x0,Y(x0));for(let x=x0;x<=x1;x+=2)g.lineTo(x,Y(x));for(let x=x1;x>=x0;x-=2)g.lineTo(x,Y(x)+ch);g.closePath()},()=>{const yy=Math.min(Y(x0),Y(x1)),yb=Math.max(Y(x0),Y(x1))+ch;
      tex(g,'mott',.45,x0,yy,x1-x0,yb-yy,'overlay',1);g.fillStyle=lg(g,0,yy,0,yb,['rgba(255,250,230,.3)','rgba(40,36,56,.18)']);g.fillRect(x0,yy,x1-x0,yb-yy);
      for(let x=x0+4+r()*10;x<x1;x+=14+r()*12)R(g,x,Y(x)+.6,.5,ch-1.1,'rgba(60,52,70,.4)')});
    for(let x=x0;x<x1;x+=.5)R(g,x,Y(x),.5,.5,rgba(L.hex('key'),.75));
    for(let x=x0;x<x1;x+=.5)R(g,x,Y(x)+ch,.5,.5,'rgba(50,42,60,.4)');
    for(const bx of o.bollards||[]){const y=Y(bx)+ch*.6,sz=o.bsize||6;if(y-sz<hz+.5&&y>hz-.5)continue;bollard(g,L,bx,y,sz)}
    return{top:x=>x>=x0&&x<=x1?Y(x):Infinity}}
  /* seen across the water */
  const x0=o.x0,x1=o.x1,sl=o.slope||0,T=x=>o.y+(x-x0)*sl,fc=o.face||6,B=x=>T(x)+fc+(x-x0)*(o.slope2||0),c=o.c||'#c8b896',dist=o.dist||0;
  const F=[x0,T(x0),x1,T(x1),x1,B(x1),x0,B(x0)];
  /* its shadow and its reflection in the water */
  for(let i=0;i<(x1-x0)*1.2;i++){const x=x0+r()*(x1-x0),d=r()*fc*.8;R(g,x,B(x)+.3+d,1+r()*3,.5,rgba('#18203a',.38*(1-d/fc)))}
  poly(g,F,c);clipTo(g,()=>poly(g,F),()=>{g.fillStyle=lg(g,0,Math.min(T(x0),T(x1)),0,Math.max(B(x0),B(x1)),[tint(c,.1),c,tint(c,-.3)]);g.fillRect(x0,Math.min(T(x0),T(x1)),x1-x0,fc+Math.abs(x1-x0)*Math.abs(sl)+4);
    const nc=Math.max(1,Math.round(fc/2.4));let prev=[];
    for(let j=0;j<nc;j++){const fy=x=>T(x)+(B(x)-T(x))*j/nc,fy2=x=>T(x)+(B(x)-T(x))*(j+1)/nc;if(j)stroke(g,[x0,fy(x0),x1,fy(x1)],'rgba(70,56,52,.32)',.4);
      const cur=[];let a=x0;for(let x=x0+2+r()*6;;x+=5+r()*7){if(prev.some(p=>Math.abs(p-x)<1.6))x+=2.2;const e=Math.min(x,x1),tn=(r()-.5)*.24;
        poly(g,[a,fy(a),e,fy(e),e,fy2(e),a,fy2(a)],tn>0?rgba('#fff4dc',tn*.8):rgba('#2a2030',-tn*.8));R(g,a,fy(a)+.3,e-a,.5,'rgba(255,246,222,.18)');a=e;if(x>=x1-1)break;
        cur.push(x);R(g,x,fy(x)+.4,.5,Math.max(.5,fy2(x)-fy(x)-.8),'rgba(60,46,44,.42)')}prev=cur}
    tex(g,'mott',.4,x0,Math.min(T(x0),T(x1))-2,x1-x0,fc+Math.abs(x1-x0)*Math.abs(sl)+6,'overlay',.6);
    /* wet, dark, with weed, where the sea washes it */
    for(let x=x0;x<x1;x+=.5){const b=B(x);g.fillStyle=lg(g,0,b-fc*.38,0,b,['rgba(40,52,48,0)','rgba(40,56,48,.55)','rgba(28,34,40,.75)']);g.fillRect(x,b-fc*.38,.5,fc*.38);
      if(r()<.3)R(g,x,b-fc*.22-r()*fc*.1,.5,.5,rgba('#6a7a3a',.5))}
    if(L.side!==0)ao(g,x0,Math.min(T(x0),T(x1)),x1-x0,fc*1.4,L.side<0?'r':'l',.2,'#2a2848')});
  stroke(g,[x0,T(x0),x1,T(x1)],rgba(L.hex('key'),.8),.6);
  for(let x=x0;x<x1;x+=.5)if(r()<.5)R(g,x,B(x)-.3,.5,.5,rgba(L.hex('foam'),.35));
  for(const bx of o.bollards||[]){const y=T(bx)+.2,sz=o.bsize||Math.max(1.5,fc*.45);if(y-sz<hz+.6&&y>hz-.6)continue;bollard(g,L,bx,y,sz)}
  return{top:x=>x>=x0&&x<=x1?T(x)-((o.bollards||[]).some(b=>Math.abs(b-x)<(o.bsize||2))?(o.bsize||Math.max(1.5,fc*.45)):0):Infinity}})}

/* ---------- a harbor town ---------- */
function town(g0,O,o){const L=light(O);return land(g0,L,o.dist||0,g=>{const s=o.seed||53,r=rng(s),x0=o.x0,x1=o.x1,base=o.base,hill=o.hill,rows=o.rows||5,sz=o.size||14,dist=o.dist||0,sd=L.side,
    plaster=['#e4dac4','#d8cbb0','#eae2d0','#cdbb98','#e0d0b4','#d4c4a8'],roofC=['#a85a3a','#b46a44','#9a5034','#b8744c'];
  /* the hill behind: its slope, scrub and stone */
  const HP=[x0,base];for(let x=x0;x<=x1;x+=1)HP.push(x,hill(x));HP.push(x1,base);
  const hy=Math.min(...HP.filter((v,i)=>i%2));
  if(SHARED.country)SHARED.country.crag(g,HP,o.rock||'#a89c80',s+3,{light:sd,dip:.04,bed:9,scrub:6});else poly(g,HP,'#a89c80');
  clipTo(g,()=>poly(g,HP),()=>{for(let i=0;i<(x1-x0)*2;i++){const x=x0+r()*(x1-x0),y=hill(x)+r()*(base-hill(x)),q=1+r()*2;R(g,x,y,q,q*.6,rgba(r()<.5?'#5c6c40':'#6e7a4a',.7))}});
  const hearths=[],lamps=[];
  /* rows of houses from the top of the town down to the water, each row a little larger and set lower, its feet hidden by the next. A row
     is broken by gardens and olive scrub, so the hill shows between; the side wall in shade is narrow, as a house seen nearly square on */
  for(let j=0;j<rows;j++){const t=(j+1)/rows,hs=sz*(.5+.5*t);let x=x0+r()*hs;
    while(x<x1){const hw=Math.min(hs*(.9+r()*1.2),x1-x-.5);if(hw<hs*.6)break;const xm=x+hw/2,ht=hill(clamp(xm,x0,x1)),yb=base-(base-ht)*(1-t)*.9+hs*.1,
        hh=hs*(.72+r()*.4)*(r()<.18?1.35:1),flat=r()<.6,cc=plaster[Math.floor(r()*plaster.length)];
      if(r()<(o.gaps==null?.3:o.gaps)||yb-hh<ht+1||yb>base+.5||Math.min(hill(clamp(x,x0,x1)),hill(clamp(x+hw,x0,x1)))>yb-hh*.6){/* a garden: a few olive or fig bushes on the slope */
        for(let k=0;k<3;k++){const bx=x+r()*hw,by=yb-r()*hs*.3,q=hs*(.18+r()*.16);if(by<hill(clamp(bx,x0,x1))+q)continue;R(g,bx-q*.6-sd*q*.3,by+.2,q*1.6,.5,rgba(A,.25));
          poly(g,[bx-q,by,bx-q*.7,by-q*.7,bx,by-q,bx+q*.7,by-q*.7,bx+q,by],r()<.5?'#6a7650':'#58663e');R(g,sd<0?bx-q*.6:bx,by-q*.85,q*.6,.5,'#8c9868')}
        x+=hw*(.6+r()*.6);continue}
      const sw=Math.max(1,hw*.12),yt=yb-hh;
      const side=sd<0?[x+hw,yt,x+hw+sw,yt-sw*.3,x+hw+sw,yb-sw*.3,x+hw,yb]:[x,yt,x-sw,yt-sw*.3,x-sw,yb-sw*.3,x,yb];
      poly(g,side,mix(tint(cc,-.28),'#6a6ea0',.25));
      R(g,x,yt,hw,hh,cc);inRect(g,x,yt,hw,hh,()=>{g.fillStyle=lg(g,x,0,x+hw,0,sd<0?['rgba(255,250,236,.18)','rgba(255,250,236,0)']:['rgba(255,250,236,0)','rgba(255,250,236,.18)']);g.fillRect(x,yt,hw,hh);
        tex(g,'mott',.35,x,yt,hw,hh,'overlay',.6);ao(g,x,yb-hh*.45,hw,hh*.45,'b',.18,'#4a3424')});
      if(flat){R(g,x-.5,yt-1,hw+1,1.2,tint(cc,.14));R(g,x-.5,yt-1,hw+1,.5,tint(cc,.4));ao(g,x,yt+.2,hw,1.6,'t',.3,'#3a3048')}
      else{const rc=roofC[Math.floor(r()*roofC.length)],rh=Math.max(1.5,hs*.22);poly(g,[x-.8,yt+.3,x+hw*.16,yt-rh,x+hw*.84,yt-rh,x+hw+.8,yt+.3],rc);
        for(let q=yt-rh+1;q<yt;q+=1.2)R(g,x+hw*.1,q,hw*.8,.5,rgba('#5a2a1a',.22));R(g,x+hw*.16,yt-rh,hw*.68,.5,tint(rc,.3));ao(g,x,yt+.3,hw,1.6,'t',.35,'#3a2028')}
      /* windows and a door: small dark openings, none barred, none on the line of another */
      const nw=Math.max(0,Math.floor(hw/(hs*.55))),ww=Math.max(.5,hs*.12),wh=Math.max(.5,hs*.15);
      for(let k=0;k<nw;k++){if(r()<.25)continue;const wx=x+hw*(k+.5)/nw-ww/2,wy=yt+hh*(.18+r()*.1);
        R(g,wx,wy,ww,wh,'#2a221e');if(ww>1)R(g,wx-.25,wy+wh,ww+.5,.5,tint(cc,.25));if(L.night&&r()<(o.lamps||0))lamps.push([wx,wy,ww,wh])}
      if(hw>hs*.8&&r()<.6){const dw=Math.max(1,hs*.18),dx=x+hw*(.15+r()*.55);R(g,dx,yb-hs*.4,dw,hs*.4,'#2a1e18');ao(g,dx,yb-hs*.4,dw,hs*.15,'t',.4)}
      if(r()<.2&&flat)hearths.push([x+hw*(.3+r()*.4),yt-1]);
      x+=hw+sw+(r()<.4?hs*(.2+r()*.5):0)}}
  /* the warehouses along the water: long and low, a tiled roof, wide doors, one beside the next with no corner meeting another's */
  for(const[wx,ww,wh]of o.warehouses||[]){const yb=base,yt=yb-wh,rh=wh*.32,cc='#d6c8aa';
    poly(g,[wx-1,yt,wx+ww*.1,yt-rh,wx+ww*.9,yt-rh,wx+ww+1,yt],'#a6603c');for(let q=yt-rh+.8;q<yt;q+=1)R(g,wx,q,ww,.5,'rgba(70,30,20,.22)');R(g,wx+ww*.1,yt-rh,ww*.8,.5,'#d4946a');
    R(g,wx,yt,ww,wh,cc);inRect(g,wx,yt,ww,wh,()=>{tex(g,'mott',.4,wx,yt,ww,wh,'overlay',.6);ao(g,wx,yt,ww,2.5,'t',.4,'#3a2a24');ao(g,wx,yb-3,ww,3,'b',.25,'#4a3424')});
    const nd=Math.max(1,Math.floor(ww/(wh*1.6)));for(let k=0;k<nd;k++){const dx=wx+ww*(k+.5)/nd-wh*.3,dw=wh*.6,dh=wh*.62;R(g,dx,yb-dh,dw,dh,'#241a16');R(g,dx-.5,yb-dh-.5,dw+1,.5,'#9a8a70');ao(g,dx,yb-dh,dw,dh*.5,'t',.4)}}
  const top=x=>x>=x0&&x<=x1?hill(x):Infinity;
  return{top,hearths,lamps,after(g){for(const[lx,ly,lw,lh]of lamps){R(g,lx,ly,lw,lh,'#ffb860');R(g,lx,ly,lw,.5,'#ffe4a8')}}}})}

/* polyTop: the top of a filled outline at each half pixel across it, as a function of x (Infinity where it is not) */
function polyTop(P){let a=1e9,b=-1e9;for(let i=0;i<P.length;i+=2){a=Math.min(a,P[i]);b=Math.max(b,P[i])}const a0=Math.floor(a*2)/2,n=Math.ceil((b-a0)*2)+1,T=new Float32Array(n).fill(Infinity);
  for(let i=0;i<P.length;i+=2){const x1=P[i],y1=P[i+1],x2=P[(i+2)%P.length],y2=P[(i+3)%P.length],lo=Math.min(x1,x2),hi=Math.max(x1,x2);
    for(let k=Math.ceil((lo-a0)*2);k<=Math.floor((hi-a0)*2);k++){const x=a0+k/2,y=hi===lo?Math.min(y1,y2):y1+(y2-y1)*(x-x1)/(x2-x1);if(y<T[k])T[k]=y}}
  return x=>{const k=Math.round((x-a0)*2);return k>=0&&k<n?T[k]:Infinity}}
function skyline(...fns){return x=>{let y=Infinity;for(const f of fns)if(f)y=Math.min(y,f(x));return y}}
return{light,eye,sky,skyLayer,sea,seaMotion,isle,headland,shore,road,quay,town,skyline,land,polyTop,HOURS,skyRGB}})();
