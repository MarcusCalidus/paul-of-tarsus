/* Paul of Tarsus: the storm at sea, for Chapters Twenty-Two and Twenty-Three (Acts 27:14-44): the northeaster and the many days with
   neither sun nor stars, and the surf in the bay at a grey daybreak, in rain. Painted to the standard of shared/coast.js: the half-pixel
   canvas, light worked out for the hour, nothing flat, and what is baked is dithered once as the backdrop is. Loaded on demand via
   CHAP[n].needs (list 'storm', with 'weather' for the wet deck and 'country' for the bay's shore) and registered in shared/pwa.js for
   offline play. Every painter takes a seed of its own and draws nothing from the room's rng().

   The account names a violent wind, thick cloud, rain and cold, and neither sun nor stars for many days (Acts 27:14, 20; 28:2). It names no
   lightning and no thunder; the maintainer decided that the storm has lightning far off (CONTRIBUTING section 4), drawn here only when a
   room passes lightning:true (see "lightning, far off" below). Nothing makes thunder, the light never flashes, and the night sky has no
   star and no moon.

   Nothing here reads a clock. Whatever moves takes the time t (ms, as a room's draw gets it) and, where the sea keeps a beat, the
   engine's phase e (shared/beat.js): pass G.beat.phase(t) straight in. 0 is the moment the sea breaks; the water runs off until G.beat.from
   (.24); the pause is [from, to) (.24 .. .74); the next sea rises from `to` and breaks at 1. A whole part, if e has one, counts the seas
   ((t - G.beat.t0) / G.beat.period has the same fraction and makes each sea a little different from the last). A level whose beat has
   other windows gives them as o.from and o.to to deckSea and bay.

     ENG                          {from: .24, to: .74}: the engine's windows, the defaults of SHARED.beat.start()
     inner(e, o)                  the painters' own cycle for the engine's phase: pause 0 .. .5, rise .5 .. .58, over .58 .. .66, run
                                  .66 .. .82, drain .82 .. 1, the sea breaking at .6; the rise fills the engine's swell [to, 1), over,
                                  run and drain its run-off [0, from), and the pause its pause, each part keeping its proportions
     BEAT                         {period: 6000, from, to, parts}: the parts of that inner cycle
     beat(e, o)                   {e, f, part, k, safe}: the engine's phase, the inner one, the part it is in ('pause', 'rise', 'over',
                                  'run', 'drain'), how far through it (0..1), and whether the way is clear (the pause)
     PAL                          the palettes: 'day' (the storm by day), 'night' (no star, no moon: the foam is the lightest thing),
                                  'black' (a darker night, for the maintainer to compare), 'dawn' (the bay at a grey daybreak in rain)

     sky(o)                       the storm sky: a low deck of cloud with darker scud driving under it, baked once as two strips that
                                  tile and moved each frame. o.pal, o.h (how far down it reaches, default 100), o.w, o.seed, o.dx (-1: the
                                  cloud drives to the left), o.speed. Returns {draw(g, t)}. At night there is nothing in it but cloud.
     deckSea(o)                   the heavy seas seen from the deck, looking across her to windward over the rail: great seas in
                                  perspective, each lifting as it nears, dark faces and lighter backs, the foam on their tops, spindrift
                                  torn off them, and no horizon (the far seas run into the rain). The sea that comes stands up highest at
                                  the windward end and comes over there first. o.pal, o.rail (the top of the rail, 82), o.deck0 (the foot
                                  of the bulwark on the deck, 97), o.height (the seas' height, 1), o.lamp [x, y, r] (a low warm light that
                                  lights the water and the rain near it), o.from, o.to, o.seed; o.lightning (true: strokes far off in its
                                  sky), o.clear [x0, x1] (where no stroke falls: the masts; default the middle third), o.period (the
                                  beat's period, 6000). Returns, in the order a room draws them:
                                    draw(g, t, e)     the sky and the seas, over the whole picture. Not swayed
                                    sway(e, k)        the ship's motion now, k its strength (0 still, 1 as sketched): {a (radians), dx,
                                                      dy (room pixels), sy (vertical scale: she heels toward us), px, py (the pivot, low
                                                      and amidships)}. Everything of hers is drawn under
                                                        g.translate(px+dx, py+dy); g.rotate(a); g.scale(1, sy); g.translate(-px, -py)
                                                      the deck and the rail (painted past the picture's edges, so that her motion
                                                      shows nothing behind them), what stands on her, aboard, and the people
                                    aboard(g, t, e, k) the sea that comes aboard: white water over the rail, the green water that runs
                                                      across the deck toward us, and how it drains away. Swayed (it lies on her deck):
                                                      call it under sway(e, k) with the same k, after the deck and before the figures
                                    front(g, t, e)    the spray that flies over everything when the sea strikes, and the driven rain:
                                                      call it in the room's front. Not swayed
                                    wetAt(x, y, e)    whether the water on the deck covers the floor at x, y (in her own frame, where
                                                      the figures stand) now
     rain(g, t, o)                driven rain in sheets: broad veils that sweep across with the gusts and the streaks within them, slanting
                                  hard with the wind; o.slant (dx for each pixel down, -.9), o.density, o.pal, o.y0, o.y1, o.splash
                                  [y0, y1] (short splashes on a deck or the sand between those lines), o.lamp [x, y, r] (the streaks near a
                                  lamp catch its light). The streaks are short, so none reads as a line across an upright
     gust(t, seed)                how hard it blows now, 0..1, for the rain and the sound
     sideSea(o)                   the same sea seen from outside, for a ship shown from the side: great seas in perspective from the
                                  rain to the bottom of the picture, with the ship at o.zShip among them. o.pal, o.hz (the eyes' level,
                                  never drawn: the far seas are lost in rain and spindrift, with no level edge), o.eye, o.height, o.period
                                  (how long one sea takes to pass, 6000), o.hullH (her height from the waterline to the rail on the
                                  screen, 24), o.seed; o.lightning and o.clear as for deckSea. In this order:
                                    far(g, t)         the sky and the seas beyond her
                                    ride(t, xa, xb)   where she floats: {y, a, ya, yb}, the waterline under her stern (xa) and her bow
                                                      (xb) and the angle between them, as the seas lift and drop her. Call it every frame
                                                      before near: near keeps to the span it gives. Then the ship's painter draws her
                                                      whole, down to the keel, at ya/a
                                    near(g, t)        the water at her own distance from her waterline down to the foot of the picture,
                                                      so that nothing of her below the waterline ever shows; the lace of foam at her
                                                      waterline and the white water at her bow; then the seas between her and us,
                                                      which hide at most a third of her hull
                                    front(g, t)       the rain
     bay(o)                       the bay at a grey daybreak in rain (Chapter Twenty-Three): low hills of the shore under cloud, a beach
                                  of sand that curves toward us at the right, rows of breakers running in to it, the wash on the sand,
                                  and the wet sand. Needs SHARED.country. o.seed, o.shoal (true: a bar off to the left with the sea
                                  breaking on both sides of it). Returns:
                                    paint(g)          the whole still picture (for a backdrop or a told picture)
                                    draw(g, t, e)     the cloud, the land and everything that moves: the breakers, and on the beat a
                                                      set of greater seas whose white water runs through the shallows
                                    front(g, t, e)    the rain
                                    edge(x)           the water's edge on the sand (the y of the line)
                                    wetAt(x, y, e)    whether the white water of the beat covers the shallows at x, y now
     deckPlaceholder(g, o)        a plain flat deck and bulwark for mockups only: the ship's painter paints the real one
     hullPlaceholder(g, x, y, a, len) a plain flat hull for mockups only

   CONTRIBUTING section 3: the foam is level rows and filled shapes, never a vertical stroke across a level one; spray flies in short
   level dashes and small squares; spindrift is a stair of level dashes down the wind; the rain's streaks are short and slanting; no
   horizon is drawn anywhere, so nothing can stand across one; no bird is in the air (section 4: none in rain or a storm); the light
   never flashes, and the spray's veil comes up and goes over a third of a second. A lamp's light lies long and low on the deck and the
   water. After a change, look at the pictures enlarged (a playtest stop for them comes with Chapter Twenty-Two). */
SHARED.storm=(()=>{
"use strict";
const TAU=Math.PI*2,fr=v=>v-Math.floor(v),smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)},
  L3=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t],hx=c=>typeof c==='string'?hex(c):c,
  cs=(c,a)=>{const h=hx(c);return`rgba(${h[0]|0},${h[1]|0},${h[2]|0},${a<0?0:a>1?1:+a.toFixed(3)})`},
  mixc=(a,b,t)=>L3(hx(a),hx(b),clamp(t,0,1));
/* value noise, seeded, that tiles across with period p (in cells) */
function h2(i,j,s){let h=(Math.imul(i,374761393)+Math.imul(j,668265263)+Math.imul(s,1442695041))|0;h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296}
function vn(x,y,s,p){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy),I=p?((i%p)+p)%p:i,I1=p?(I+1)%p:i+1,
  a=h2(I,j,s),b=h2(I1,j,s),c=h2(I,j+1,s),d=h2(I1,j+1,s);return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function vnp(x,y,s,px,py){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy),I=((i%px)+px)%px,J=((j%py)+py)%py,I1=(I+1)%px,J1=(J+1)%py,
  a=h2(I,J,s),b=h2(I1,J,s),c=h2(I,J1,s),d=h2(I1,J1,s);return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function fbmp(x,y,s,n,px,py){let v=0,a=.5,f=1,t=0;for(let k=0;k<n;k++){v+=a*vnp(x*f,y*f,s+k*17,px*f,py*f);t+=a;f*=2;a*=.5}return v/t}
function fbm(x,y,s,n,p){let v=0,a=.5,f=1,t=0;for(let k=0;k<n;k++){v+=a*vn(x*f,y*f,s+k*17,p?p*f:0);t+=a;f*=2;a*=.5}return v/t}
/* finishA: as the engine's finish (colors in steps, a 4x4 ordered dither), and the alpha dithered on the same grid, so that a layer
   with soft edges (scud, haze) keeps them as a stipple and lies over what is behind it without a halo */
function finishA(c,g,q,soft){q=q||12;const w=c.width,h=c.height,im=g.getImageData(0,0,w,h),d=im.data;
  for(let y=0,i=0;y<h;y++)for(let x=0;x<w;x++,i+=4){const b=(BAYER[((y>>1)&3)*4+((x>>1)&3)]+.5)/16;if(soft){if(!d[i+3])continue}else{if(d[i+3]/255<=b){d[i+3]=0;continue}d[i+3]=255}
    const t=(b-.5)*q,m=d[i]*.3+d[i+1]*.59+d[i+2]*.11;
    for(let k=0;k<3;k++){const v=Math.round(((m+(d[i+k]-m)*1.14-128)*1.07+128+t)/q)*q;d[i+k]=v<0?0:v>255?255:v}}
  g.putImageData(im,0,0)}

/* ---------- the beat ---------- */
/* Every painter here takes the engine's phase e (shared/beat.js, G.beat.phase(t)): 0 when the sea breaks; the water runs off until
   `from`; the pause is [from, to); the next sea rises from `to` and breaks at 1. A whole part, if e has one, counts the seas (pass
   (t - G.beat.t0) / G.beat.period for seas that differ from one to the next; G.beat.phase(t) alone is enough). Inside, the painters keep
   their own cycle (inner): pause 0 .. .5, rise .5 .. .58, over .58 .. .66, run .66 .. .82, drain .82 .. 1, with the sea breaking at .6;
   inner(e) stretches it onto the engine's windows, so the rise fills the swell, the run and the drain fill the run-off, and the pause is
   the pause, with every part keeping its proportions within its window. ENG holds the engine's default windows; a painter takes o.from
   and o.to where a level starts its beat with others (G.beat.from, G.beat.to). */
const ENG={from:.24,to:.74};
const BEAT={period:6000,from:ENG.from,to:ENG.to,parts:[['pause',0,.5],['rise',.5,.58],['over',.58,.66],['run',.66,.82],['drain',.82,1]]};
function inner(e,o){const from=o&&o.from!=null?o.from:ENG.from,to=o&&o.to!=null?o.to:ENG.to,v=e||0,n=Math.floor(v),q=v-n;
  return q<from?n+.6+.4*q/from:q<to?n+1+.5*(q-from)/(to-from):n+1.5+.1*(q-to)/(1-to)}
/* beat(e): {e: the engine's phase, f: the painters' own, part, k: how far through it, safe: in the pause} */
function beat(e,o){const b=inner(e,o),f=fr(b);let p=BEAT.parts[0];for(const q of BEAT.parts)if(f>=q[1]&&f<q[2])p=q;
  return{e:fr(e||0),f,part:p[0],k:(f-p[1])/(p[2]-p[1]),safe:p[0]==='pause'}}
/* how hard it blows: 0..1, gusting over a few seconds */
const gust=(t,s)=>clamp(.56+.26*Math.sin(t/1900+(s||0))+.18*Math.sin(t/730+2.1*(s||0))+.08*Math.sin(t/310+.7),0,1);

/* ---------- palettes ---------- */
const PAL={
  /* by day: no sun anywhere; a heavy sky, darkest in the cloud base low down over a paler veil of rain; the seas green-black in their
     faces, lighter grey-green on their backs; the foam the lightest thing */
  day:{zen:'#4c525c',mid:'#3a4048',low:'#262b31',haze:'#5d666c',cl:'#737b85',cd:'#1d2228',scud:'#181c21',scudL:'#5a646e',
    back:'#3c5c54',face:'#213b36',deep:'#0c1a18',glass:'#4f8a74',crest:'#96bcaa',foam:'#eef3f0',foamS:'#9db2ab',water:'#2b453f',rain:'#c4ccd2',amb:'#8a929c'},
  /* at night: no star, no moon; the foam and the breaking water show grey, nothing else */
  night:{zen:'#0d1015',mid:'#090b0f',low:'#050608',haze:'#161b20',cl:'#1c222a',cd:'#040506',scud:'#030304',scudL:'#191e25',
    back:'#16241f',face:'#0a1614',deep:'#030807',glass:'#1a3028',crest:'#334a40',foam:'#808c8e',foamS:'#4a5658',water:'#0f1b19',rain:'#5c656c',amb:'#2a3040'},
  /* a darker night still, to compare */
  black:{zen:'#07080b',mid:'#040506',low:'#020203',haze:'#0b0d10',cl:'#0f1216',cd:'#020203',scud:'#010101',scudL:'#0b0d10',
    back:'#0d1513',face:'#030707',deep:'#010303',glass:'#0c1612',crest:'#18221d',foam:'#4e585a',foamS:'#2c3436',water:'#0a1412',rain:'#384046',amb:'#181c26'},
  /* the bay at a grey daybreak in rain: a little light in the cloud, the breakers pale green behind the white, the foam white */
  dawn:{zen:'#666b74',mid:'#565c64',low:'#454a52',haze:'#8e9496',cl:'#8e939a',cd:'#3c4149',scud:'#33373f',scudL:'#70767e',
    back:'#6a8076',face:'#33463e',deep:'#20302a',glass:'#7fa491',crest:'#aac8b8',foam:'#f0f3ee',foamS:'#b2c2b9',water:'#4c665c',rain:'#d2d8da',amb:'#a4a8ac',
    sand:'#a49478',wet:'#5c574e',land:'#56604c'}};

/* ---------- the sky ---------- */
/* two strips that tile across (TW room pixels wide): the cloud deck, opaque, its billows lit a little from above and darkest in the
   heavy base low down, over a paler veil of rain at its foot; and the scud, torn low cloud with ragged lit edges, that drives faster
   than the deck above it */
const SKYC=new Map();
function skyTiles(pal,h,seed,ft){ft=ft||.84;const key=pal+'|'+h+'|'+seed+'|'+ft;if(SKYC.has(key))return SKYC.get(key);
  const P=PAL[pal],TW=640,k=HR,Wd=TW*k,Hd=Math.ceil(h*k),zen=hx(P.zen),mid=hx(P.mid),low=hx(P.low),haze=hx(P.haze),cl=hx(P.cl),cd=hx(P.cd),sc=hx(P.scud),scl=hx(P.scudL);
  const[dc,dg]=mk(Wd,Hd),[sc_,sg]=mk(Wd,Hd),D=dg.createImageData(Wd,Hd),S=sg.createImageData(Wd,Hd);
  /* the cloud in perspective: cells a little flatter low down, never ruled */
  const vOf=y=>-Math.log(1-y/(h*1.18))*3.2;
  for(let Y=0;Y<Hd;Y++){const y=(Y+.5)/k,e=y/h,v=vOf(y),v2=vOf(Math.max(0,y-2.5)),sv=vOf(y)*2.3,sv2=vOf(Math.max(0,y-1.5))*2.3;
    const m0=Math.min(.5,ft*.6),base=e<m0?L3(zen,mid,e/m0):e<ft?L3(mid,low,smooth(m0,ft,e)):L3(low,haze,smooth(ft,1,e)),foot=smooth(ft,1,e);
    for(let X=0;X<Wd;X++){const x=(X+.5)/k,u=x/TW*8,i=(Y*Wd+X)*4,warp=fbm(u*.5,v*.5,seed+3,2,4);
      const w0=fbm(u+.9*warp,v,seed,5,8),w1=fbm(u+.9*warp,v2,seed,5,8),m=smooth(.34,.7,w0),lit=clamp((w0-w1)*9,-1,1);
      let c=L3(base,cd,m*.62*(1-foot));c=L3(c,cl,Math.max(0,lit)*.62*(1-e*.35)*(1-foot));c=L3(c,cd,Math.max(0,-lit)*.3*(1-foot));
      D.data[i]=c[0];D.data[i+1]=c[1];D.data[i+2]=c[2];D.data[i+3]=255;
      /* scud: torn fragments in the lower sky, dark, with ragged lit tops */
      const wp=fbm(u,sv*.6,seed+9,2,8),n=fbm(u*2+1.4*wp,sv*1.5,seed+11,4,16)+.1*(vn(u*16,sv*5,seed+13,128)-.5),band=smooth(.25,.5,e)*(1-smooth(.9,1,e)),a=smooth(.5,.62,n)*band;
      if(a>0){const n2=fbm(u*2+1.4*wp,sv2*1.5,seed+11,4,16),l=clamp((n-n2)*4,0,1),q=L3(L3(base,sc,.75),scl,l*.55);
        S.data[i]=q[0];S.data[i+1]=q[1];S.data[i+2]=q[2];S.data[i+3]=a*255}}}
  dg.putImageData(D,0,0);sg.putImageData(S,0,0);finishA(dc,dg,12);finishA(sc_,sg,12,1);
  const T={deck:dc,scud:sc_,TW,h};if(SKYC.size>6)SKYC.delete(SKYC.keys().next().value);SKYC.set(key,T);return T}
function sky(o){o=o||{};const pal=o.pal||'day',h=o.h||100,seed=o.seed||2207,ft=o.foot,dx=o.dx==null?-1:o.dx,sp=o.speed==null?4:o.speed,
    L=o.lightning?lightning({pal,w:o.w||320,foot:o.boltFoot==null?h-8:o.boltFoot,clear:o.clear,period:o.period,seed:seed+7}):null;let T=null;
  const put=(g,c,off)=>{const W=T.TW,x=hp(-(fr(off/W))*W);g.drawImage(c,0,0,c.width,c.height,x,0,W,T.h);g.drawImage(c,0,0,c.width,c.height,x+W,0,W,T.h)};
  return{h,L,
    /* e: the engine's phase, for a room on the beat: no stroke falls in the half second when the sea strikes */
    draw(g,t,e){if(!T)T=skyTiles(pal,h,seed,ft);put(g,T.deck,-t/1000*sp*dx);const B=L&&L.at(t,e);if(B)L.bolt(g,B);put(g,T.scud,-t/1000*sp*4*dx);if(B)L.glow(g,B,h)}}}

/* ---------- lightning, far off ---------- */
/* The account names none, but the maintainer decided that this storm has lightning (CONTRIBUTING section 4): far off in the sky, never
   lighting the whole picture. A room never draws it: deckSea and sideSea draw it in their sky when the room passes lightning:true.
   When: time is cut into slots of 5 s; in a slot a stroke falls or not, and when, as a hash of the slot's number decides (so two frames
   of the same moment always agree, and nothing reads a clock or a random number): in 44 slots in a hundred, at most 1.4 s into it, so
   that two strokes are at least 3.6 s apart and one falls every 11.4 s on average, every 15 s or so on the beat. A room on the beat passes the engine's phase e (and its
   period); a stroke whose light would fall within the half second round the sea's striking the rail is left out, so that it cannot be
   taken for the beat. Where: anywhere across the sky but within o.clear [x0, x1] (default: the middle third, where a mast may stand) and
   6 px either side of it, its foot (o.foot) just over the far seas, where it is lost in the haze, its length a tenth to a fifth of the
   picture's height. Its shape: one thin broken line that runs down, each step at most 35 degrees from upright; at most two branches,
   one to each side and never two from one fork, each leaving downward at 46 to 57 degrees from upright, so that a branch draws away from the line below its fork
   and the two lie on different sides: no branch can cross the line or the other, and none leaves square to it (no T, no plus).
   The light: the stroke shows for a quarter of a second and goes; the cloud round its top brightens, a long low glow, over a fifth of a
   second, and fades over half a second; the picture's brightness is not otherwise touched, and nothing below the sky is lit (by night
   the far seas' crests catch a little of it). No thunder: nothing here makes a sound. */
function lightning(o){const w=o.w||320,P=PAL[o.pal||'day'],night=o.pal==='night'||o.pal==='black',SLOT=5000,DUR=700,seed=o.seed||2251,
    clr=o.clear||[w/3,w*2/3],per=o.period||6000,foot=o.foot,C=new Map();
  /* the stroke of slot n, or null */
  function plan(n){if(C.has(n))return C.get(n);const r=rng((Math.imul(n,2654435761)^Math.imul(seed,40503))>>>0);r();let p=null;
    if(r()<.44){const ts=n*SLOT+r()*1400,len=14+r()*14,top=foot-len,
        side=r()<.5?-1:1,room=side<0?clr[0]-14:w-clr[1]-14,x0=side<0?8+r()*Math.max(0,room-8):clr[1]+14+r()*Math.max(0,room-8);
      /* the line: steps down, each at most .7 across for 1 down */
      const M=[[x0,top]];let x=x0,y=top;const lean=(r()-.5)*.5;while(y<foot){const dy=2+r()*2.2,dx=clamp(lean*dy+(r()-.5)*dy,-.7*dy,.7*dy);x+=dx;y+=dy;M.push([x,y])}
      /* the branches: at most one to each side, from a fork in its upper two thirds, leaving at 1.05 to 1.55 across for 1 down */
      const Bs=[],nb=r()<.25?0:r()<.6?1:2,first=r()<.5?-1:1;
      let i0=-9;for(let b=0;b<nb;b++){const sd=b?-first:first,top=Math.max(1,Math.floor(M.length*.6)-1);let i=1+Math.floor(r()*top);
        /* two branches never leave from the same fork, nor from neighbouring ones: no three lines from one point */
        if(Math.abs(i-i0)<2){i=i0+2<=top?i0+2:i0-2;if(i<1)break}i0=i;const pts=[M[i].slice()];let bx=M[i][0],by=M[i][1];
        const st=2+Math.floor(r()*2);for(let k=0;k<st;k++){const dy=1.8+r()*1.5;bx+=sd*dy*(1.05+r()*.5);by+=dy;pts.push([bx,by])}Bs.push(pts)}
      /* it keeps clear of the masts' span */
      let lo=1e9,hi=-1e9;for(const q of[M,...Bs])for(const[a]of q){lo=Math.min(lo,a);hi=Math.max(hi,a)}
      if(!(hi<clr[0]-6||lo>clr[1]+6)||lo<2||hi>w-2)p=null;else p={ts,M,Bs,top,foot,x:x0,box:[lo-3,top-3,hi+3,foot+3]}}
    if(C.size>8)C.delete(C.keys().next().value);C.set(n,p);return p}
  /* the stroke showing at t, with u its progress 0..1 over DUR, or null */
  function at(t,e){const n=Math.floor(t/SLOT);for(const m of[n,n-1]){const p=plan(m);if(!p||t<p.ts||t>=p.ts+DUR)continue;
      if(e!=null){const q=fr(e+(p.ts-t)/per),d=DUR/per;/* its light lies in [q, q + d]: keep it out of [-.06, .06] round the strike */
        if(fr(q+.06+d)<.12+d)continue}
      return{p,u:(t-p.ts)/DUR}}return null}
  const strokeA=u=>smooth(0,.08,u)*(1-smooth(.2,.38,u)),lightA=u=>smooth(0,.2,u)*(1-smooth(.28,1,u))*(1-.2*Math.exp(-((u-.24)/.05)*((u-.24)/.05)));
  function line(g,pts,col,wd){g.beginPath();pts.forEach(([x,y],i)=>g[i?'lineTo':'moveTo'](x,y));g.strokeStyle=col;g.lineWidth=wd;g.lineJoin='miter';g.lineCap='butt';g.stroke()}
  /* the stroke: brightest at its top, lost in the haze toward its foot */
  function bolt(g,B){const a=strokeA(B.u);if(a<=0)return;const p=B.p,c=night?'#e4e8ff':'#f2f4ff';
    g.save();const gr=lg(g,0,p.top,0,p.foot,[cs(c,a),cs(c,a*.9),cs(c,0)]);
    line(g,p.M,gr,.6);for(const b of p.Bs)line(g,b,gr,.5);g.restore()}
  /* the light in the cloud round its top: long and low, softly, nowhere else */
  function glow(g,B,h){const a=lightA(B.u);if(a<=0)return;const p=B.p;g.save();g.beginPath();g.rect(-8,0,w+16,h);g.clip();
    pool(g,p.x,p.top-4,46,11,night?'#9aa6c8':'#d8dcec',(night?.34:.32)*a,'screen');pool(g,p.x,p.top-2,20,6,'#ffffff',(night?.18:.12)*a,'screen');g.restore()}
  /* by night the far seas' crests catch a little of it */
  function seas(g,B,y0,y1){if(!night)return;const a=lightA(B.u);if(a<=0)return;g.save();g.beginPath();g.rect(-8,y0,w+16,y1-y0);g.clip();
    pool(g,B.p.x,y0+2,60,(y1-y0)*.6,'#7c88a8',.22*a,'screen');g.restore()}
  return{at,bolt,glow,seas,plan,box:B=>B&&strokeA(B.u)>0?B.p.box:null,SLOT,DUR}}

/* ---------- the rain ---------- */
function rain(g,t,o){o=o||{};const w=o.w||320,y0=o.y0||0,y1=o.y1||144,H=y1-y0,P=PAL[o.pal||'day'],sl=o.slant==null?-.9:o.slant,dir=sl<0?-1:1,
    gu=gust(t,o.seed||1),den=(o.density==null?1:o.density),col=P.rain,lamp=o.lamp,r=rng(o.seed||2231);
  /* the sheets: broad veils, sheared along the rain, that sweep across with the wind and thicken in the gusts */
  g.save();g.beginPath();g.rect(-8,y0,w+16,H);g.clip();
  for(let i=0;i<3;i++){const bw=70+i*34,span=w+bw*2+Math.abs(sl)*H,x=fr(i*.37+t/1000*(16+i*9)/span*dir)*span-bw-(dir<0?0:Math.abs(sl)*H),
      a=(.05+.05*gu)*den*(i===1?1.2:1);
    g.save();g.transform(1,0,sl,1,-sl*y0,0);g.fillStyle=lg(g,x,0,x+bw,0,[cs(col,0),cs(col,a),cs(col,a*.7),cs(col,0)]);g.fillRect(x-4,y0,bw+8,H);g.restore()}
  /* the streaks: short, thin, slanting hard; more of them in a gust */
  const n=Math.round(w*.9*den*(.35+.65*gu)),len=5.5,dx=sl*len;let warm=[];
  g.beginPath();
  for(let i=0;i<n;i++){const x0=r()*(w+Math.abs(sl)*H+20)-(dir<0?0:Math.abs(sl)*H)-10,ph=r(),sp=.8+r()*.5,k=fr(t/360*sp+ph),y=y0-len+k*(H+len),x=x0+sl*(y-y0);
    if(lamp&&Math.hypot((x-lamp[0])/1.8,y-lamp[1])<lamp[2]*(.4+.6*r())){warm.push(x,y);continue}
    /* none across a stroke of lightning (o.hole: its box), where it would make a cross */
    if(o.hole&&x+Math.min(0,dx)<o.hole[2]&&x+Math.max(0,dx)>o.hole[0]&&y<o.hole[3]&&y+len>o.hole[1])continue;g.moveTo(x,y);g.lineTo(x+dx,y+len)}
  g.strokeStyle=cs(col,.34);g.lineWidth=.5;g.lineCap='butt';g.stroke();
  if(warm.length){g.beginPath();for(let i=0;i<warm.length;i+=2){g.moveTo(warm[i],warm[i+1]);g.lineTo(warm[i]+dx,warm[i+1]+len)}g.strokeStyle='rgba(236,200,160,.42)';g.stroke()}
  /* splashes on the deck or the sand: short level dashes that come and go */
  if(o.splash){const[a,b]=o.splash,sn=Math.round(w*.08*den*(.4+.6*gu));
    for(let i=0;i<sn;i++){const k=fr(t/380+i*.618),c=Math.floor(t/380+i*.618);if(k>.3)continue;const rr=rng(i*977+c*131),sx=rr()*w,sy=a+Math.pow(rr(),.7)*(b-a),u=k/.3,s=(sy-a)/(b-a+1);
      R(g,sx-1-u*s,sy,1.5+u*2*(.6+s),.5,cs(col,.4*(1-u)))}}
  g.restore()}

/* ---------- foam, spray and spindrift: the shapes every sea here is made of ---------- */
/* spray: small squares and level dashes flung out from (x, y) toward (vx, vy) and falling; u 0..1 how far they have gone */
function spray(g,x,y,vx,vy,u,n,seed,col,a,sz){const r=rng(seed);for(let i=0;i<n;i++){const s=.4+r()*.8,d=u*s,px=x+vx*d+(r()-.5)*sz,py=y+vy*d+20*d*d+(r()-.5)*sz*.4,q=r()<.5?.5:1;
  const al=a*(1-u)*(.5+r()*.5);if(al<.02)continue;R(g,px,py,q+(r()<.4?1:0),.5,cs(col,al));if(q>.5&&r()<.5)R(g,px,py+.5,q,.5,cs(col,al*.6))}}
/* spindrift: a stair of level dashes torn off a crest down the wind */
function drift(g,x,y,dx,dy,len,a,col,u){const n=Math.max(2,Math.round(len/1.6));for(let i=0;i<n;i++){const k=(i+u)/n,al=a*(1-k)*Math.min(1,k*4+.2);if(al<.03)continue;
  R(g,x+dx*k*len,y+dy*k*len,1.6-k*.9,.5,cs(col,al))}}
/* lace: a strand of foam running down a face, a stair of short level dashes that wanders as the water does; strands never cross */
function lace(g,x,y,n,dx,col,a,r,yMax){let px=x,py=y;for(let i=0;i<n;i++){if(yMax&&py>yMax)break;const l=1+r()*2.4;R(g,px,py,l,.5,cs(col,a*(1-i/n*.75)));px+=dx+(r()-.5)*1.2;py+=.5+(r()<.45?.5:0)}}
/* streak: a long thin level streak of foam, broken into pieces */
function streak(g,x,y,len,col,a,r){let xx=x;while(xx<x+len){const l=1+r()*Math.min(6,len*.4);R(g,xx,y,l,.5,cs(col,a*(.6+.4*r())));xx+=l+.5+r()*2.5}}

/* strip: a vertical gradient baked once into a canvas one pixel wide (stops as [offset, color] pairs), so that a painter can hang it
   from a curved line column by column with drawImage, which is far cheaper than a gradient per column */
const STRIPC=new Map();
function strip(key,stops){let c=STRIPC.get(key);if(c)return c;const[cv,q]=mk(1,64);const gr=q.createLinearGradient(0,0,0,64);for(const[o,col]of stops)gr.addColorStop(o,col);
  q.fillStyle=gr;q.fillRect(0,0,1,64);STRIPC.set(key,cv);return cv}

/* hang: draw a strip c from the line pts (x, y pairs every 2 px) column by column, st room pixels wide, each column at the line's own
   height there (interpolated), dy below it (negative: above), L long; i0..i1 limits it to a run of the line */
function hang(g,c,pts,st,dy,L,i0,i1){const n=pts.length/2;i0=i0||0;i1=i1==null?n-1:i1;
  for(let x=pts[2*i0];x<pts[2*i1];x+=st){const u=(x+st/2-pts[0])/2,i=Math.min(n-2,Math.floor(u)),f=u-i,y=pts[2*i+1]+(pts[2*i+3]-pts[2*i+1])*f;g.drawImage(c,x,y+(typeof dy==='function'?dy(i):dy),st+.02,L)}}

/* ---------- one sea, seen from in front ---------- */
/* pk: a crest that is sharp at its top and broad in its trough, as a sea in a gale is */
const pk=u=>Math.exp(2.4*(Math.cos(TAU*u)-1)),pkb=u=>Math.exp(1.4*(Math.cos(TAU*u)-1));
/* rank: paint one great sea from its crest line, as a painter of those games would: a face dark and steep toward us, darkest low down,
   with laces of foam running down it from where it breaks; where we see over its crest, its back, lighter, the grey of the sky in it,
   streaked down the wind; the glassy lip under the crest; the haze of the rain the farther it is; and on its highest parts a bright
   lip of foam that curls over a shadow, with spray thrown up above it and spindrift blown off it.
   Q = {pts: x, y pairs every 2 px, sh: its shape 0..1 at each, bk: how far down the back we see above each point (px, or null), z: its
   distance, fade: the rain's haze 0..1, sc: room pixels to the metre there, ox: how far it has drifted (px), k: who it is, thr: from what
   shape up its top breaks, brk: 0..1 how much of the whole crest breaks, warm(x, y): lamplight 0..1}; o = {P, t, dxW (-1: the wind
   blows to the left), seed}. Its body runs to the foot of the picture; nearer seas are painted over it. */
function rank(g,Q,o){const{pts,sh,z,fade,sc,k,thr}=Q,brk=Q.brk||0,ox=Q.ox||0,bk=Q.bk,P=o.P,t=o.t,dxW=o.dxW,n=sh.length,w=pts[2*n-2],fo=1-fade*.92,det=fade<.5,
    s1=clamp(sc*.35,.4,2.2);
  const T=[];let top=1e9;for(let i=0;i<n;i++){const y=pts[2*i+1]-(bk?bk[i]:0);T.push(y);top=Math.min(top,y)}
  const body=[];for(let i=0;i<n;i++)body.push(pts[2*i],T[i]);body.push(w,160,pts[0],160);
  poly(g,body,cs(P.face,1));g.fillStyle=lg(g,0,top+3,0,top+Math.max(12,sc*7),[cs(P.face,0),cs(P.deep,.95)]);poly(g,body);g.fill();
  /* the back, over the crest: lighter, with the wind's streaks running down it toward the crest */
  if(bk){const p=[];for(let i=0;i<n;i++)p.push(pts[2*i],T[i]);for(let i=n-1;i>=0;i--)p.push(pts[2*i],pts[2*i+1]+.2);
    poly(g,p,cs(P.back,1));
    {const L=10,c=strip(o.pal+'back',[[0,cs(P.face,.45)],[.5,cs(P.back,0)],[1,cs(P.crest,.35)]]);clipTo(g,()=>poly(g,p),()=>{
      hang(g,c,pts,2,-L,L)})}
    if(det){const r=rng(k*977+5),ns=Math.min(50,Math.round(46*clamp(sc/4,.4,1.5))),span=w+40;
      for(let i=0;i<ns;i++){const xs=fr((r()*span+ox)/span)*span-20,j=clamp(Math.round((xs+6)/2),0,n-1),gap=bk[j];if(gap<2.5){r();r();continue}
        let x=xs,y=T[j]+r()*gap*.6;const a=(.3+.35*r())*fo,L=Math.round(4+r()*gap);
        for(let q=0;q<L;q++){const jj=clamp(Math.round((x+6)/2),0,n-1);if(y>pts[2*jj+1]-1||y<T[jj])break;R(g,x,y,1.4+r()*2,.5,cs(P.foamS,a*(1-q/L*.5)));x+=dxW*(.9+r()*.6);y+=.5}}}}
  /* the face's own streaks, carried with the sea */
  if(det&&o.tex){const F=faceTex(o.pal);clipTo(g,()=>{const p=[...pts,w,160,pts[0],160];poly(g,p)},()=>{g.globalAlpha=(1-fade)*.55;const x0=-fr(ox/F.TW)*F.TW;
    for(let x=x0-F.TW;x<w+F.TW;x+=F.TW)g.drawImage(F.c,x,top+2,F.TW,F.TH);g.globalAlpha=1})}
  /* the lip: the water under the crest is thin and lets the light through */
  if(det){/* column by column, a gradient that hangs from the crest: glassy green under it, darkening down the face */
    const L=clamp(11*s1,6,30),c=strip(o.pal+'lip',[[0,cs(P.glass,.62)],[.5,cs(P.glass,.3)],[1,cs(P.glass,0)]]);g.globalAlpha=1-fade;
    hang(g,c,pts,2,0,L);g.globalAlpha=1}
  for(const[d,c,a]of det?[[.4,P.crest,.55]]:[[1.1,P.glass,.5],[.35,P.crest,.7]]){g.beginPath();for(let i=0;i<n;i++)g[i?'lineTo':'moveTo'](pts[2*i],pts[2*i+1]+d*s1);
    g.strokeStyle=cs(c,a*(1-fade*.85));g.lineWidth=Math.max(.5,Math.min(1.2,s1*.7));g.stroke()}
  /* old foam lying all over the near faces: long thin level strands, broken, carried with the sea */
  if(det){const r=rng(k*577+3),deep=clamp((150-top)/20,1,5),ns=Math.min(80,Math.round(45*clamp(sc/4,.3,1.6)*deep)),span=w+60;
    for(let i=0;i<ns;i++){const x=fr((r()*span+ox)/span)*span-30,j=clamp(Math.round((x+6)/2),0,n-1),y=pts[2*j+1]+(2+Math.pow(r(),.9)*Math.max(30*s1,(150-pts[2*j+1])*.9));streak(g,x,y,(4+r()*16)*s1,r()<.7?P.foamS:P.foam,(.18+.3*r())*fo,r)}}
  /* laces of foam running down the face below the places where it breaks or has broken */
  if(det){const r=rng(k*131+11),nl=Math.min(48,Math.round((22+30*brk)*clamp(sc/4,.4,1.6)));
    for(let i=0;i<nl;i++){const j=Math.floor(r()*n);if(sh[j]<thr-.4-brk*.4){r();continue}const x=pts[2*j]+(r()-.5)*2,y=pts[2*j+1]+(1.5+r()*3)*s1;
      lace(g,x,y,Math.round((5+r()*12)*clamp(sc/5,.5,1.8)),dxW*(1.3+r()*.9),P.foamS,(.3+.35*r())*fo,r)}}
  /* the rain's haze between us and it */
  if(fade>.02){poly(g,body);g.fillStyle=lg(g,0,top-2,0,top+30,[cs(P.haze,fade*.97),cs(P.haze,fade*.85)]);g.fill()}
  /* where it breaks: a bright lip of foam over the shadow of its curl, spray thrown up above it and blown down the wind, spindrift */
  const th=i=>((sh[i]-thr)/(1-thr+1e-6)*(.8+Math.min(6,sc*.55))*(1+brk*1.4)+.5)*(.55+.9*vn(i/5+k*7.3,t/900,k+17));let i0=-1;
  for(let i=0;i<=n;i++){const on=i<n&&sh[i]>thr;if(on&&i0<0)i0=i;if(!on&&i0>=0){const i1=i-1;
      if(i1>i0){const wa=Q.warm?Q.warm(pts[2*i0],pts[2*i0+1]):0,col=wa?toHex(...mixc(P.foam,'#ffd6a0',wa)):P.foam;
        g.beginPath();for(let j=i0;j<=i1;j++)g[j>i0?'lineTo':'moveTo'](pts[2*j],pts[2*j+1]+th(j)+.6);g.strokeStyle=cs(P.deep,.55*fo);g.lineWidth=Math.max(.5,s1*.8);g.stroke();
        const p=[];for(let j=i0;j<=i1;j++)p.push(pts[2*j],pts[2*j+1]-.4);for(let j=i1;j>=i0;j--)p.push(pts[2*j],pts[2*j+1]+th(j));
        poly(g,p,cs(col,.96*fo));
        g.beginPath();for(let j=i0;j<=i1;j++)g[j>i0?'lineTo':'moveTo'](pts[2*j],pts[2*j+1]-.2);g.strokeStyle=cs('#ffffff',.6*fo);g.lineWidth=.5;g.stroke();
        for(let j=i0;j<i1;j++)R(g,pts[2*j],pts[2*j+1]+th(j)-.5,2,.5,cs(P.foamS,.75*fo));
        /* under the lip, the inside of the curl, green where the light comes through */
        if(det){const L=clamp(6*s1,3,14),c=strip(o.pal+'curl',[[0,cs(P.glass,.55)],[1,cs(P.glass,0)]]);g.globalAlpha=fo;
          hang(g,c,pts,1,j=>th(j)+.6,L,i0,i1);g.globalAlpha=1}
        const rr=rng(k*31+i0*7+(o.seed|0)),m=Math.floor((i0+i1)/2),wd=pts[2*i1]-pts[2*i0];
        if(det&&wd>3){for(let q=0;q<Math.max(1,Math.round(wd/22));q++){const jj=Math.round(i0+(i1-i0)*(q+.5)/Math.max(1,Math.round(wd/22))),u=fr(t/700+h2(k,i0+q,5));
            spray(g,pts[2*jj],pts[2*jj+1]-1,dxW*(6+sc*1.2),-(2+sc*.9),u,Math.round(8+Math.min(wd,22)*.6),k*13+i0+q*7,col,.8*fo,Math.min(wd,22)*.8)}
          const len=(6+8*rr())*Math.min(2,Math.max(.6,sc*.3));drift(g,pts[2*m],pts[2*m+1]-.5,dxW,.12,len*1.6,.6*fo,col,fr(t/520+h2(k,i0,7)))}}
      i0=-1}}
  return top}
/* the face texture: level streaks of lighter and darker water and broken strands of old foam, baked once for a palette, dithered, and
   laid on every near face (moved with it) so that no face is a flat fill */
const FACEC=new Map();
function faceTex(pal){if(FACEC.has(pal))return FACEC.get(pal);const P=PAL[pal],TW=256,TH=64,[c,q]=mk(TW*HR,TH*HR),r=rng(4111);q.scale(HR,HR);
  const dash=(x,y,l,col,a)=>{R(q,x,y,l,.5,cs(col,a));if(x+l>TW)R(q,x-TW,y,l,.5,cs(col,a))};
  for(let i=0;i<420;i++){const y=Math.pow(r(),1.3)*TH,x=r()*TW,e=y/TH,l=3+r()*16*(1-e*.5);
    if(r()<.55-e*.4)dash(x,y,l,P.glass,(.2+.25*r())*(1-e));else dash(x,y,l,P.deep,(.15+.3*r())*(.3+e))}
  finishA(c,q,12,1);const T={c,TW,TH};FACEC.set(pal,T);return T}

/* ---------- the seas from the deck ---------- */
/* Seen from the deck across the beam to windward. The great seas come toward us one by one, a wave length DZ apart; sea k is at
   z = Z0 + (k - s) DZ metres, s = b - .6, so that a sea reaches the ship at phase .6 of every beat, in the middle of 'over'. The eye is
   E metres above the mean level of the sea: she rides high in the pause and drops into the trough as the sea comes. A crest of height
   H at X across is seen at y = hz + F (E - H) / z. In the pause the next sea stands across the picture, its peaks well above the rail
   and its saddles sinking below it, with the ranks beyond it dissolving into the rain; the lower parts show their backs, where we see
   over them. The sea that comes stands up highest at the windward end (the right: the rain slants down to the left) and its shoulder
   runs along the rail to the other end. No horizon is drawn: the farthest seas fade into the rain, the color of the sky's foot. */
function deckSea(o){o=o||{};const w=o.w||320,pal=o.pal||'day',P=PAL[pal],hz=o.hz==null?56:o.hz,F=o.F||150,cx=w/2,RAIL=o.rail||82,D0=o.deck0||97,
    ht=o.height==null?1:o.height,seed=o.seed||2209,Z0=24,DZ=60,N=4,lamp=o.lamp,dxW=o.dx==null?-1:o.dx,
    SKY=sky({pal,h:hz+10,seed:seed+1,dx:dxW,w,lightning:o.lightning,clear:o.clear,period:o.period});
  const bump=s=>{const q=fr(s+.5)-.5;return Math.exp(-(q/.15)*(q/.15))},
    E=s=>5.5-2.5*bump(s),
    /* the ship's motion (s = b - .6: 0 when the sea breaks on her): she sinks into the trough as the sea comes and is lifted as it passes
       under her (heave); the sea's blow heels her to leeward, toward us, and she comes back slowly (seen across her beam: the far rail
       rises, the near deck drops); her ends rise and fall against each other as the sea runs along her (pitch: the picture's tilt).
       Slow, all of it: nothing changes faster than the sea does */
    strike=s=>{const q=fr(s+.25)-.25;return q<0?smooth(-.06,0,q):Math.exp(-q/.22)*(1-smooth(.5,.75,q))},
    swayAt=(b,K)=>{const s=b-.6,k=K==null?1:K;
      return{a:k*(.032*Math.sin(TAU*(s-.12))+.012*strike(s)*(dxW<0?1:-1)),dx:k*.8*Math.sin(TAU*(s-.2)),dy:k*(2.6*Math.cos(TAU*(s+.04))+1.4*strike(s)),
        sy:1+k*.022*strike(s),px:cx,py:150}},
    rk=k=>h2(k,7,seed),
    lampK=(x,y)=>lamp?Math.pow(clamp(1-Math.hypot((x-lamp[0])/2.2,y-lamp[1])/lamp[2],0,1),1.4):0,
    /* where the shoulder of the coming sea is along the rail: from beyond the windward end to beyond the other */
    xsh=f=>{const u=f<.545?-(.545-f)*2000/w:(f-.545)/.045;return dxW<0?w*(1-u):w*u},
    /* when the sea comes over the rail at x: first at the windward end */
    t0=x=>.565+.045*(dxW<0?1-x/w:x/w);
  /* the shape of sea k along X (metres across): three trains of peaks that drift with the wind */
  const shapeOf=(k,X,t)=>{const dr=t/1000*1.6*dxW;return .6*pkb(X/58+rk(k+99)*3+dr/58)+.3*pkb(X/23+rk(k+51)*3+dr*1.5/23)+.1*pk(X/9+rk(k+23)*3+dr*2.2/9)};
  let NEAR=null;
  function sea(g,k,s,t,b){const near=k-s;if(near<-.1)return;const z=Z0+near*DZ,e=E(s),f=fr(b),tl=0,
      a=ht*(14+2.4*(rk(k)-.5))*(.72+.28*smooth(150,Z0,z)),be=near<.5?smooth(.5,.08,near):0,xs=xsh(f),pts=[],sh=[],bk=[];
    for(let x=-6;x<=w+6;x+=2){const X=(x-cx)*z/F,q=shapeOf(k,X,t),m=Math.exp(-((x-xs)/130)*((x-xs)/130)),
        H=a*(-.3+1.3*q)*(1-be*.45)+be*a*(.1+.26*m),y=hz+F*(e-H)/z+tl*(x-cx);
      pts.push(x,y);sh.push(clamp(q*(1-be*.5)+be*m,0,1));bk.push(clamp((e-H)/z*F*.5,0,16))}
    const brk=clamp(1-(near+.04)/.22,0,1);if(near>-.12&&near<.4)NEAR={b,pts};
    rank(g,{pts,sh,bk,z,fade:1-Math.exp(-Math.max(0,z-Z0-14)/150),sc:F/z,ox:t/1000*1.6*dxW*F/z,k,thr:.74-.5*brk,brk,warm:lamp?lampK:0},{P,pal,t,dxW,seed})}
  const draw=(g,t,e)=>{const b=inner(e,o),s=b-.6;NEAR=null;SKY.draw(g,t,o.lightning?e:undefined);R(g,-8,SKY.h-1,w+16,170-SKY.h,P.haze);
    g.save();
    for(let k=Math.ceil(s-.1)+N-1;k>=Math.ceil(s-.1);k--)sea(g,k,s,t,b);
    if(SKY.L){const B=SKY.L.at(t,e);if(B)SKY.L.seas(g,B,hz-8,RAIL)}
    g.restore()};
  /* the water on the deck: its leading edge at x, running toward us and down the wind, from where it came over first */
  const runAt=(x,f)=>smooth(t0(x)+.035,t0(x)+.22,f),
    sheetEdge=(x,f,t)=>{const p=runAt(x,f),lob=Math.sin(x/23+1.3)*3+Math.sin(x/9.5+t/300)*1.2+Math.sin(x/51)*4;return D0+(152-D0)*Math.pow(p,.85)+lob*p*(1-p*.3)};
  const wetAt=(x,y,e)=>{const f=fr(inner(e,o));return f>t0(x)+.035&&f<.86&&y>=D0&&y<=sheetEdge(x,f,0)-1};
  /* the sea that comes aboard: its crest falls on her, highest and first at the windward end and then all along the rail; white water
     pours over the rail, churns brightest where it lands, and runs across the deck toward us in streaks down the flow, a thin bright
     edge in front; then it drains away and the planks show through */
  function aboard(g,t,e,K){const b=inner(e,o),f=fr(b);if(f<.55)return;const C=NEAR&&NEAR.b===b?NEAR.pts:null,xs=xsh(f),
      /* the crest is the sea's, which does not sway: carried into her own frame, so that the white water meets it */
      W=swayAt(b,K),ca=Math.cos(-W.a),sa=Math.sin(-W.a),inv=(x,y)=>{const X=x-W.px-W.dx,Y=y-W.py-W.dy;return W.py+(sa*X+ca*Y)/W.sy},
      cy=x=>{if(!C)return RAIL-26*ht;const j=clamp(Math.round((x+6)/2),0,C.length/2-1);return Math.min(RAIL,inv(x,C[2*j+1]))};
    /* the falling crest and the white water over the rail */
    const top=[],bot=[];let any=0;
    for(let x=-6;x<=w+6;x+=2){const s0=t0(x),fall=smooth(s0-.01,s0+.09,f),gone=smooth(s0+.1,s0+.16,f),y=cy(x);
      const gr=smooth(s0-.04,s0+.02,f);if(gr<=0){top.push(x,y);bot.push(x,y);continue}any=1;
      const m=Math.exp(-((x-xs)/110)*((x-xs)/110)),yt=y+(RAIL-y)*fall*(.9-.25*m)+gone*(D0-RAIL)*.5,yf=RAIL+(D0+1-RAIL)*smooth(s0+.01,s0+.06,f),yb=y+(Math.max(yf,y)-y)*gr;
      top.push(x,Math.min(yt,yb-.5));bot.push(x,yb)}
    const MA=1-smooth(.68,.75,f);if(any&&MA>0){g.save();g.globalAlpha=MA;const p=top.slice();for(let i=bot.length-2;i>=0;i-=2)p.push(bot[i],bot[i+1]);
      let mn=1e9;for(let i=1;i<top.length;i+=2)mn=Math.min(mn,top[i]);
      poly(g,p);g.fillStyle=lg(g,0,mn,0,D0+2,[cs('#ffffff',.97),cs(mix(P.foam,P.glass,.22),.94),cs(mix(P.foam,P.glass,.32),.92),cs(P.foam,.98)]);g.fill();
      clipTo(g,()=>poly(g,p),()=>{const r=rng(seed+78),mv=(f-.56)*80;
        /* thin level streaks in the white, carried down with it; strands of the green water showing through */
        for(let i=0;i<260;i++){const x=r()*(w+12)-6,y=mn+r()*(D0+4-mn)+mv*r(),ln=2+r()*10,c=r()<.35?P.glass:r()<.6?P.foamS:'#ffffff';R(g,x,y,ln,.5,cs(c,.25+.35*r()))}
        g.fillStyle=lg(g,0,D0-5,0,D0+2,[cs('#ffffff',0),cs('#ffffff',.6)]);g.fillRect(-6,D0-5,w+12,8)});
      /* the top: a bright edge, and spray thrown up off it, blown down the wind */
      for(let i=0;i<top.length-2;i+=2)if(top[i+1]<RAIL)R(g,top[i],top[i+1]-.3,2,.5,cs('#ffffff',.85));
      for(let j=0;j<6;j++){const x=xs+(j-2.5)*34;if(x<-10||x>w+10)continue;const u=clamp((f-t0(clamp(x,0,w)))/.12,0,1);if(u<=0||u>=1)continue;
        spray(g,x,cy(clamp(x,0,w))-2,dxW*30,-28,u,40,seed+j*17+((b|0)%5)*101,P.foam,.9,24)}
      if(lamp)glowOn(g,p,lamp,1);g.restore()}
    /* on the deck */
    const dr=smooth(.8,.97,f);if(f<.6||dr>=1)return;
    const pts=[];for(let x=-6;x<=w+6;x+=2)pts.push(x,sheetEdge(x,f,t));
    const p=[-6,D0-1,w+6,D0-1];for(let i=pts.length-2;i>=0;i-=2)p.push(pts[i],pts[i+1]);
    /* green water, clear enough that the deck shows through, more so as it drains */
    poly(g,p);g.fillStyle=lg(g,0,D0,0,150,[cs(P.water,.85*(1-dr*.6)),cs(P.water,.65*(1-dr*.8))]);g.fill();
    clipTo(g,()=>poly(g,p),()=>{
      /* the churn where it lands: brightest along the foot of the bulwark, thinning toward us */
      const land=1-smooth(.64,.8,f);g.fillStyle=lg(g,0,D0-1,0,D0+22,[cs(P.foam,.95*land),cs(P.foam,.5*land),cs(P.foam,0)]);g.fillRect(-6,D0-1,w+12,24);
      /* streaks of foam along the flow, toward us and down the wind: stairs of level strands that never cross */
      const r=rng(seed+303),mv=(f-.6)*80;
      for(let i=0;i<120;i++){const x0=r()*(w+60)-30,y0=D0+r()*30+mv*(.5+.5*r()),a=(.35+.4*r())*(1-dr),n2=Math.round(5+r()*14);
        lace(g,x0,y0,n2,dxW*(1+r()*.6),r()<.7?P.foam:P.foamS,a,r,150)}});
    /* the leading edge: a thin bright line */
    for(let i=0;i<pts.length-2;i+=2){const x=pts[i],y=pts[i+1],s=clamp((y-D0)/30,.4,1.6);if(runAt(x,f)<=0)continue;
      R(g,x,y-.8*s,2,.8*s+.5,cs('#ffffff',.9*(1-dr)));R(g,x,y-1.3*s-.5,2,.5,cs(P.foamS,.6*(1-dr)))}
    if(lamp)glowOn(g,p,lamp,1-dr)}
  /* a lamp's light on the water: warm, long and low */
  function glowOn(g,p,L,a){clipTo(g,()=>poly(g,p),()=>pool(g,L[0],L[1]+6,L[2]*1.4,L[2]*.45,'#ffb868',.55*a,'screen'))}
  /* in front of everything: the spray flung over the rail toward us where the sea strikes, a thin veil of it that comes up and goes
     over a third of a second and more (never a flash), and the rain */
  function front(g,t,e){const b=inner(e,o),f=fr(b),xs=xsh(f);
    if(f>.56&&f<.8){const ve=Math.sin(Math.PI*clamp((f-.57)/.21,0,1));
      if(ve>0){g.fillStyle=lg(g,0,RAIL-30,0,144,[cs(P.foamS,.16*ve),cs(P.foamS,.04*ve)]);g.fillRect(-6,0,w+12,144)}
      for(let j=0;j<7;j++){const x=12+j*48+(j%2)*13,u=clamp((f-t0(x))/.18,0,1);if(u<=0||u>=1)continue;spray(g,x,RAIL-8,dxW*26,60,u,46,seed+j*17+((b|0)%5)*101,P.foam,.85,12)}}
    rain(g,t,{w,pal,density:o.rain==null?1:o.rain,lamp,splash:[D0+4,140],seed:seed+3,hole:SKY.L?SKY.L.box(SKY.L.at(t,e)):null})}
  /* sway(e, k): the transform under which a room draws everything that belongs to the ship (the deck, the rail, what stands on them,
     the people and aboard), with k the strength (0 still, 1 as sketched): {a: radians, dx, dy: room pixels, sy: the near deck dropping as
     she heels (a vertical scale, 1 when upright), px, py: the pivot, low and amidships}. Apply it as
       g.translate(px+dx, py+dy); g.rotate(a); g.scale(1, sy); g.translate(-px, -py)
     The sea, the sky, the spray and the rain do not belong to her: draw and front are drawn without it */
  const sway=(e,k)=>swayAt(inner(e,o),k);
  return{draw,aboard,front,wetAt,sway,E,sky:SKY,rail:RAIL,deck0:D0,pal:P,beat:e=>beat(e,o)}}

/* ---------- the sea from outside, a ship among the seas ---------- */
/* The great seas run toward us, a crest every DZ metres, one passing every o.period ms; the ship lies at ZS among them, so the seas
   beyond her are drawn before her hull and those between her and us after it. Her waterline is the surface at ZS under her stern and
   her bow. A sea between her and us may stand over the foot of her hull, never over more than a third of it (o.hullH, her height on the
   screen from the waterline to the rail), so that she stays in sight. The nearest sea, at the foot of the picture, breaks. */
function sideSea(o){o=o||{};const w=o.w||320,pal=o.pal||'day',P=PAL[pal],hz=o.hz==null?42:o.hz,F=o.F||300,E=o.eye||10,cx=w/2,ZS=o.zShip||60,DZ=o.spacing||50,Z0=10,
    ht=o.height==null?1:o.height,per=o.period||6000,seed=o.seed||2215,dxW=o.dx==null?-1:o.dx,rk=k=>h2(k,3,seed),N=6,HH=o.hullH||24;
  const SKY=sky({pal,h:hz+8,seed:seed+1,dx:dxW,w,foot:.6,lightning:o.lightning,clear:o.clear,boltFoot:hz-1});
  const amp=k=>ht*(9+2*(rk(k)-.5)),
    shape=(k,X,t)=>{const dr=t/1000*1.5*dxW;return .62*pkb(X/56+rk(k+9)*3+dr/56)+.28*pk(X/20+rk(k+5)*3+dr*1.5/20)+.1*pk(X/8+rk(k+2)*3+dr*2/8)},
    zOf=(k,t)=>Z0+(k-t/per)*DZ,H=(k,X,t)=>amp(k)*(.25+.75*shape(k,X,t));
  /* the surface where she lies: high under a crest that is passing her, low between */
  function heightAt(x,t){const u=(ZS-Z0)/DZ+t/per,k=Math.floor(u),q=u-k,X=(x-cx)*ZS/F,c=v=>Math.exp(-v*v/.06);
    return (H(k,X,t)*c(q)+H(k+1,X,t)*c(1-q))*.5-ht}
  const wl=(x,t)=>hz+F*(E-heightAt(x,t))/ZS;
  let span=null;
  function ridge(g,k,t){const z=zOf(k,t);if(z<Z0*.5||z>Z0+N*DZ)return;const pts=[],sh=[],bk=[],guard=z<=ZS&&span;
    for(let x=-6;x<=w+6;x+=2){const X=(x-cx)*z/F,q=shape(k,X,t),h=H(k,X,t);let y=hz+F*(E-h)/z;
      let m=0;if(guard){const[xa,xb]=span;m=smooth(xa-70,xa+20,x)*smooth(xb+70,xb-20,x);if(m>0)y=Math.max(y,y+(wl(clamp(x,xa,xb),t)-HH/3-y)*m)}
      pts.push(x,y);sh.push(q);bk.push(clamp((E-h)/z*F*.5,0,14)*(1-m))}
    const near=z<Z0+DZ*.6;
    rank(g,{pts,sh,bk,z,fade:1-Math.exp(-Math.max(0,z-24)/170),sc:F/z/2.2,ox:t/1000*1.5*dxW*F/z,k,thr:near?.42:.68,brk:near?.5:0},{P,pal,t,dxW,seed})}
  const ks=t=>{const s=t/per,out=[];for(let k=Math.floor(s+N);k>=Math.ceil(s-.5);k--)out.push(k);return out};
  const ride=(t,xa,xb)=>{span=[Math.min(xa,xb),Math.max(xa,xb)];const ya=wl(xa,t),yb=wl(xb,t);return{ya,yb,y:(ya+yb)/2,a:Math.atan2(yb-ya,xb-xa)}};
  return{sky:SKY,
    far(g,t){SKY.draw(g,t);R(g,-8,SKY.h-1,w+16,170-SKY.h,P.haze);for(const k of ks(t))if(zOf(k,t)>ZS)ridge(g,k,t);if(SKY.L){const B=SKY.L.at(t);if(B)SKY.L.seas(g,B,hz-6,hz+30)}veil(g,t)},
    /* near: first the water at her own distance, from her waterline down to the foot of the picture across the whole width, so that
       whatever of her is below the waterline (her bottom, her keel) is always covered, whatever the trough; then the lace of foam at her
       waterline and the white water at her bow; then the seas between her and us */
    near(g,t){if(span){const[xa,xb]=span,R0=ride(t,xa,xb),line=x=>R0.ya+(R0.yb-R0.ya)*(x-xa)/(xb-xa),pts=[],sh=[];
        for(let x=-6;x<=w+6;x+=2){let y=wl(x,t);const m=smooth(xa-20,xa,x)*smooth(xb+20,xb,x);if(m>0)y=y+(Math.min(y,line(clamp(x,xa,xb))+1)-y)*m;pts.push(x,y);sh.push(0)}
        rank(g,{pts,sh,z:ZS,fade:1-Math.exp(-Math.max(0,ZS-24)/170),sc:F/ZS/2.2,ox:t/1000*1.5*dxW*F/ZS,k:-7,thr:1.1,brk:0},{P,pal,t,dxW,seed});
        wash(g,t,xa,xb)}
      for(const k of ks(t))if(zOf(k,t)<=ZS)ridge(g,k,t)},
    ride,
    wash,
    front(g,t){rain(g,t,{w,pal,density:o.rain==null?1:o.rain,seed:seed+3,hole:SKY.L?SKY.L.box(SKY.L.at(t)):null})}};
  /* the lace of foam at her waterline, and white water thrown up at her bow as she drops into a sea (near draws it) */
  function wash(g,t,xa,xb){const R0=ride(t,xa,xb);
      for(let x=xa;x<=xb;x+=1){const y=R0.ya+(R0.yb-R0.ya)*(x-xa)/(xb-xa),q=Math.sin(x/7+t/400)*.6+Math.sin(x/3.1-t/260)*.4;
        R(g,x,y-1.5+q*.5,1,3,cs(P.face,.95));R(g,x,y-1.6+q*.5,1,.5,cs(P.foam,clamp(.35+q*.5,0,1)))}
      /* white water thrown up at her bow as she drops into a sea */
      const dip=(R0.yb-R0.ya)*Math.sign(xb-xa);if(dip>.5){const u=fr(t/520);spray(g,xb,R0.yb-3,-dxW*10*Math.sign(xb-xa),-26,u,40,seed+((t/520)|0),P.foam,clamp((dip-.5)/4,0,1),8)}}
  /* the rain and the spindrift over the farthest seas, where they would meet the sky: soft drifts of the haze's color that drive with the
     wind, so that no level edge is left there for a mast to cross */
  function veil(g,t){const r=rng(seed+61);for(let i=0;i<26;i++){const span2=w+160,x=fr((r()*span2+t/1000*(9+r()*8)*dxW)/span2)*span2-80,y=hz-16+r()*22,rx=24+r()*56,ry=3+r()*7;
    pool(g,x,y,rx,ry,r()<.3?P.low:P.haze,(.3+.4*r()),'source-over')}
    g.fillStyle=lg(g,0,hz-8,0,hz+8,[cs(P.haze,0),cs(P.haze,.55),cs(P.haze,0)]);g.fillRect(-8,hz-8,w+16,16)}}

/* ---------- the bay at daybreak ---------- */
/* We stand on the beach and look out over the bay. At the right the low hills of the shore come down to it and the beach curves round
   toward us; at the left the bay opens to the sea, which is lost in the rain (no horizon is drawn: the water fades into the haze, the color
   of the sky's foot). Far out at the left the seas break on the bar (27:41), a line of white in open water. After fourteen days of storm
   the surf is heavy: ranks of thick breakers lie along the beach as its waterline does (a rank d metres out lies at
   y = HZ + (edge(x) - HZ) / (1 + d / 25)), pale green behind their white; they rise, curl, break and tumble in toward us, foam lies in the
   shallows, the wash runs up the sand and back over a wide wet sheen, and spray goes up where the seas meet the point. On the beat a greater
   sea does the same, and its white water fills the shallows from side to side. */
function bay(o){o=o||{};const w=o.w||320,P=PAL.dawn,HZ=60,seed=o.seed||2301,CO=SHARED.country,SKY=sky({pal:'dawn',h:70,seed:seed+1,dx:-1,w,speed:3}),D=25;
  const edge=x=>121+2.4*Math.sin(x/41+1)+1.2*Math.sin(x/13)-37*Math.pow(smooth(170,326,x),1.15),
    far=x=>x<150?HZ:HZ+2+(x-150)*.13,
    yAt=(x,d)=>HZ+(edge(x)-HZ)/(1+d/D),
    hills=x=>{const u=clamp((x-128)/40,0,1);return far(x)-u*(15+8*Math.sin(x/47+.6)+4*Math.sin(x/19+2)+1.4*Math.sin(x/7.3))-2*u},
    water=new Path2D(),BARY=x=>HZ+6.5+x*.018;
  water.moveTo(-6,HZ-1);for(let x=-6;x<=w+6;x+=2)water.lineTo(x,far(x)-.5);for(let x=w+6;x>=-6;x-=2)water.lineTo(x,edge(x)+.5);water.closePath();
  let LAND=null;
  /* everything below the cloud, baked once with the sky left out */
  function land(){if(LAND)return LAND;const[c,q]=mk(w*HR,144*HR);q.scale(HR,HR);const r=rng(seed+5);
    /* the sea: the color of the haze far out, darker green toward us, paler in the shallows over sand */
    q.fillStyle=lg(q,0,HZ-1,0,124,[P.haze,mix(P.water,P.haze,.5),P.water,mix(P.water,P.glass,.35)]);q.fill(water);
    clipTo(q,()=>q.clip(water),()=>{q.fillStyle=lg(q,0,0,w,0,['rgba(22,34,30,.3)','rgba(22,34,30,0)','rgba(150,140,110,.18)']);q.fillRect(-6,HZ,w+12,70);
      /* darker water on both sides of the bar */
      for(let x=-6;x<120;x+=1){const y=BARY(x),k=smooth(-6,20,x)*smooth(124,96,x);R(q,x,y-2.5,1,2,cs(P.deep,.35*k));R(q,x,y+1,1,2.5,cs(P.deep,.3*k))}
      /* foam lying on the water, thickest in the shallows: long level strands, broken */
      for(let i=0;i<900;i++){const x=r()*w,d=Math.pow(r(),2.2)*200,y=yAt(x,d),s=clamp((y-HZ)/40,.1,2);if(y>edge(x)-.5)continue;streak(q,x,y,(3+r()*14)*s,r()<.5?P.foamS:P.foam,(.25+.4*r())*clamp(s*1.5,0,1),r)}});
    /* a far point of land at the left, in the rain */
    const FP=[-6,HZ];for(let x=-6;x<=34;x+=1)FP.push(x,HZ-3.5*smooth(34,0,x)-.8*Math.sin(x/3));FP.push(34,HZ);poly(q,FP,cs(mix(P.land,P.haze,.72),1));
    /* the hills of the shore: low, rounded, scrub and trees on them, grey in the rain */
    const HP=[120,far(120)+.5];for(let x=120;x<=w+6;x+=1)HP.push(x,hills(x));HP.push(w+6,far(w+6)+1);
    poly(q,HP);q.fillStyle=lg(q,0,HZ-24,0,HZ+24,['#5c6454','#4a5244']);q.fill();
    clipTo(q,()=>poly(q,HP),()=>{tex(q,'mott',.4,120,HZ-30,w,60,'overlay',1);
      for(let i=0;i<420;i++){const x=128+r()*(w-128),y=hills(x)+1+Math.pow(r(),.8)*(far(x)-hills(x)),s=.8+r()*1.6,c2=r()<.5?'#3c4838':'#46523c';
        if(s<1.2)R(q,x,y,1,.5,c2);else{R(q,x-s*.6,y,s*1.2,.5,c2);R(q,x-s*.4,y-.5,s*.8,.5,c2);R(q,x-s*.2,y-.5,s*.5,.5,tint(c2,.18))}}
      for(let i=0;i<30;i++){const x=130+r()*(w-130),y=hills(x)+2+r()*10;R(q,x,y,1.5+r()*3,.5,'rgba(196,190,170,.35)')}});
    if(CO)for(let i=0;i<10;i++){const x=150+r()*(w-160),y=hills(x)+3+r()*7;if(y>far(x)-2)continue;CO.tree(q,x,y,5+r()*4,'#4a563c',{kind:r()<.5?'olive':'oak',seed:seed+40+i,cast:false})}
    poly(q,HP);q.fillStyle=lg(q,0,HZ-24,0,HZ+24,[cs(P.haze,.6),cs(P.haze,.4)]);q.fill();
    /* the far beach at the hills' foot, a pale line that widens toward us */
    for(let x=128;x<=w+6;x+=1){const y=far(x),bw=.6+(x-128)*.022;R(q,x,y-bw,1,bw+.5,cs(mix(P.sand,P.haze,.5),1))}
    /* the beach we stand on: a wide wet sheen along the water where the wash runs back, with the grey sky lying in it, then the sand,
       darkened by the rain */
    const BP=[-6,152];for(let x=-6;x<=w+6;x+=1)BP.push(x,edge(x));BP.push(w+6,far(w+6),w+6,152);
    poly(q,BP);q.fillStyle=lg(q,0,95,0,150,[mix(P.sand,P.wet,.45),mix(P.sand,P.wet,.3),P.sand]);q.fill();
    clipTo(q,()=>poly(q,BP),()=>{tex(q,'mott',.35,-6,80,w+12,72,'overlay',1);tex(q,'grain',.2,-6,80,w+12,72,'overlay',.5);
      for(let x=-6;x<w+6;x+=.5){const e=edge(x),s=clamp((e-HZ)/40,.3,1.6),wb=(9+s*15)*(.75+.4*fbm(x/13,0,seed,2));
        q.fillStyle=lg(q,0,e,0,e+wb,[cs(P.wet,.85),cs(P.wet,.6),cs(P.wet,0)]);q.fillRect(x,e,.5,wb);
        q.fillStyle=lg(q,0,e,0,e+wb*.8,[cs(P.haze,.45),cs(P.haze,.18),cs(P.haze,0)]);q.fillRect(x,e,.5,wb*.8)}
      for(let i=0;i<150;i++){const x=r()*w,e=edge(x),s=clamp((e-HZ)/40,.3,1.6),y=e+1+r()*s*14;R(q,x,y,(3+r()*12)*s,.5,cs(r()<.6?P.haze:'#ffffff',.2+r()*.25))}
      /* ripples the backwash left, long and low, and strands of weed along the line of the highest wash */
      for(let i=0;i<160;i++){const x=r()*w,e=edge(x),y=e+10+Math.pow(r(),.8)*(150-e-10),s=clamp((y-HZ)/50,.3,1.8);R(q,x,y,(2+r()*7)*s,.5,cs(r()<.5?'#4a4438':'#d8ccb0',.12+.1*r()))}
      for(let i=0;i<40;i++){const x=r()*w,e=edge(x),s=clamp((e-HZ)/40,.3,1.6),y=e+(18+r()*6)*s;R(q,x,y,(1+r()*3)*s,.5,'rgba(52,58,40,.6)')}});
    finishA(c,q,12);return LAND=c}
  /* one rank of surf at d metres out, of size a: unbroken, a pale green face under a glassy lip; breaking (br 0..1), its lip curls over
     and spray goes up from it; broken, a thick band of tumbling white, brightest on top, its front ragged, foam trailing behind it */
  function breaker(g,d,a,br,t,id){const pts=[];for(let x=-6;x<=w+6;x+=2)pts.push(x,yAt(x,d));const n=pts.length/2,r=rng(id*131+7);
    const S=x=>clamp((yAt(x,d)-HZ)/40,.08,2.2),hb=(x,i)=>(1+5.5*S(x))*a*(.9+.08*Math.sin(x/17+id)+.05*Math.sin(x/6.3+id*2)),hd=x=>{const u=fr(x/(9+5*S(x))+id*.37)*2-1;return Math.sqrt(Math.max(0,1-u*u))};
    /* the face, pale green where the light comes through it, darker at its foot */
    const face=[];for(let i=0;i<n;i++)face.push(pts[2*i],pts[2*i+1]-br*hb(pts[2*i])*.3);for(let i=n-1;i>=0;i--)face.push(pts[2*i],pts[2*i+1]+hb(pts[2*i])*(1-br*.5));
    poly(g,face,cs(P.glass,.85*(1-br*.55)));
    for(const[dd,c,al]of[[.75,P.water,.5],[.95,P.face,.45]]){g.beginPath();for(let i=0;i<n;i++)g[i?'lineTo':'moveTo'](pts[2*i],pts[2*i+1]+hb(pts[2*i])*dd*(1-br*.5));g.strokeStyle=cs(c,al*(1-br*.5));g.lineWidth=Math.max(.5,a*.8);g.stroke()}
    g.beginPath();for(let i=0;i<n;i++)g[i?'lineTo':'moveTo'](pts[2*i],pts[2*i+1]-br*hb(pts[2*i])*.3+.3);g.strokeStyle=cs(P.crest,.85);g.lineWidth=.6;g.stroke();
    if(br>0){const wf=[],lo=[];for(let i=0;i<n;i++){const x=pts[2*i];wf.push(x,pts[2*i+1]-.4-br*hb(x)*.45-br*hd(x)*S(x)*1.6)}
      for(let i=n-1;i>=0;i--){const x=pts[2*i],j=.6*Math.sin(x/5.1+id+t/300)+.4*Math.sin(x/2.3+id*3);const y=pts[2*i+1]+hb(x)*(.25+.85*br)+j*br*S(x)*1.2;wf.push(x,y);lo.push(x,y)}
      poly(g,wf);let mn=1e9;for(let i=1;i<wf.length;i+=2)mn=Math.min(mn,wf[i]);
      const op=Math.min(1,br*2);g.fillStyle=cs(P.foam,.96*op);g.fill();
      /* the white is brightest on top, greyer and greener low down where it tumbles */
      {const c=strip('dawnwhite',[[0,cs('#ffffff',.5)],[.5,cs(P.foamS,0)],[1,cs(P.foamS,.55)]]);g.globalAlpha=op;clipTo(g,()=>poly(g,wf),()=>{
        for(let i=0;i<n-1;i+=2){const y0=Math.min(wf[2*i+1],wf[2*i+3]),y1=Math.max(wf[wf.length-1-2*i],wf[wf.length-3-2*i]);if(y1-y0>=1)g.drawImage(c,pts[2*i],y0,4.05,y1-y0)}});g.globalAlpha=1}
      clipTo(g,()=>poly(g,wf),()=>{/* tumbling: thin level streaks of shade and of the green showing through, more low down */
        for(let i=0;i<Math.round(60+90*a);i++){const x=r()*(w+8)-4,y0=yAt(x,d),h=hb(x),y=y0-br*h*.4+r()*h*(.7+.85*br),c=r()<.3?P.glass:P.foamS;R(g,x+((t/60)%4)*dxs,y,(1.5+r()*7)*S(x),.5,cs(c,(.25+.35*r())*op*(.4+.6*(y-y0+h*.4)/(h*1.4))))}});
      /* the bright top and the shade along the front */
      g.beginPath();for(let i=0;i<n;i++)g[i?'lineTo':'moveTo'](wf[2*i],wf[2*i+1]+.2);g.strokeStyle=cs('#ffffff',.8*op);g.lineWidth=.5;g.stroke();
      for(let i=0;i<lo.length;i+=2)R(g,lo[i],lo[i+1]-.6,2,.5,cs(P.foamS,.8*op));
      /* spray thrown up as it curls over, blown down the wind */
      if(br>.1&&a>.6){const u=fr(t/650+id*.37);for(let j=0;j<9;j++){const x=r()*w,y=yAt(x,d)-hb(x)*.6;if(y<edge(x)-1)spray(g,x,y,-14*S(x),-7*S(x),fr(u+j*.13),Math.round(12*a),id*19+j,P.foam,.8*Math.sin(Math.PI*Math.min(1,br*1.2)),8*S(x))}}
      /* foam trailing behind it, toward the sea */
      for(let i=0;i<Math.round(90*a);i++){const x=r()*w,dd=d+r()*26*br,y=yAt(x,dd),s=S(x);if(y<edge(x)||y>150){r();continue}streak(g,x,y-.5,(3+r()*12)*s,r()<.5?P.foam:P.foamS,(.25+.45*r())*br*Math.min(1,a),r)}}}
  const dxs=-.5;
  /* the wash on the sand: a sheet of water running up by u (0..1) and back, its edge a lace of foam, a glassy film behind it */
  function wash(g,u,a,id){for(let x=-6;x<=w+6;x+=2){const e=edge(x),s=clamp((e-HZ)/40,.3,1.6),up=u*(5+12*s)*(.75+.15*Math.sin(x/13+id)+.1*Math.sin(x/4.7+id*2));if(up<.3)continue;
    R(g,x,e,2,up,cs(P.glass,.32*a));R(g,x,e,2,up*.6,cs(P.haze,.18*a));if(h2(x|0,id,7)<.8)R(g,x,e+up-.5,2,.5,cs(P.foam,.9*a));if(h2(x|0,id,9)<.35)R(g,x+.5,e+up*.55,1.5,.5,cs(P.foam,.45*a))}}
  /* the bar far out where the seas break on both sides of it: a line of white water in open water, its foam coming and going */
  const BAR=o.shoal===false?null:(()=>{const r=rng(seed+9),a=[];for(let i=0;i<300;i++){const x=2+r()*112,k=smooth(0,16,x)*smooth(114,88,x);if(r()>k)continue;
    a.push([x,BARY(x)+(r()-.5)*1.4*k,.8+r()*3.4,r()*6.28,.55+.45*r()])}return a})();
  function bar(g,t){for(const[x,y,l,ph,a]of BAR){const q=.55+.45*Math.sin(t/800+ph);R(g,x,y,l,.5,cs(P.foam,a*q))}
    for(let j=0;j<4;j++){const u=fr(t/1700+j*.27),x=12+j*26+((t/1700+j*.27)|0)%3*5;spray(g,x,BARY(x)-.5,-8,-4,u,10,j*7+((t/1700+j*.27)|0),P.foam,.7,5)}}
  /* spray where the seas meet the point at the left */
  function point(g,t){for(let j=0;j<2;j++){const u=fr(t/2300+j*.5),x=24+j*7;spray(g,x,HZ-.5,-6,-7,u,14,j*11+((t/2300+j*.5)|0),P.foam,.65,6)}}
  /* the beat's sea: where it is (d) and how far it has broken, by phase */
  const setD=f=>f<.3?Infinity:f<.5?180-(f-.3)/.2*110:f<.58?70-(f-.5)/.08*30:f<.66?40-(f-.58)/.08*18:f<.82?22-(f-.66)/.16*22:0,
    setBr=f=>smooth(.56,.64,f),setA=f=>1.1+smooth(.3,.56,f)*1.6,
    wetAt=(x,y,e)=>{const f=fr(inner(e,o));if(f<.62||f>.92)return false;const d=setD(f),front=f<.82?yAt(x,d)+3:edge(x)+(f<.88?8:4);return y<=front&&y>=yAt(x,d+16)};
  function draw(g,t,e){const b=inner(e,o),f=fr(b);SKY.draw(g,t);g.drawImage(land(),0,0,w,144);
    g.save();g.clip(water);point(g,t);
    /* the ranks that keep coming between the sets, drawn far to near */
    /* (they spend themselves before they reach the near shallows, so that the way through the water is plainly clear between sets) */
    const rows=[];for(let j=0;j<4;j++){const u=fr(t/7600+j/4),d=16+160*Math.pow(1-u,1.5),fade=smooth(16,34,d);if(fade<=0)continue;rows.push([d,(1.1+.3*((j*5)%3)/2)*(.35+.65*fade),smooth(.3,.5,u)*fade,j+1])}
    const d0=setD(f);if(isFinite(d0)&&f<.84)rows.push([d0,setA(f),setBr(f),90+(b|0)%7]);
    rows.sort((p,q)=>q[0]-p[0]);for(const[d,a,br,id]of rows)if(d>=70)breaker(g,d,a,br,t,id);if(BAR)bar(g,t);for(const[d,a,br,id]of rows)if(d<70)breaker(g,d,a,br,t,id);
    g.restore();
    for(let j=0;j<2;j++){const u=fr(t/3800+j*.5);wash(g,Math.sin(Math.PI*u)*.7,.7,j)}
    if(f>.8){const u=clamp((f-.8)/.18,0,1);wash(g,Math.sin(Math.PI*u)*1.6,1,9)}}
  function front(g,t,b){rain(g,t,{w,pal:'dawn',density:o.rain==null?.85:o.rain,splash:[104,142],seed:seed+3,slant:-.75})}
  function paint(g){const T=skyTiles('dawn',70,seed+1);g.drawImage(T.deck,0,0,w,70);g.drawImage(T.scud,0,0,w,70);g.drawImage(land(),0,0,w,144)}
  return{paint,draw,front,edge,wetAt,yAt,setD,beat:e=>beat(e,o)}}

/* ---------- placeholders, for mockups only: the ship's painter paints the real deck and hull ---------- */
function deckPlaceholder(g,o){o=o||{};const w=o.w||320,RAIL=o.rail||82,D0=o.deck0||97,night=o.night,B=40;
  /* it runs on past the picture's edges and foot (B), so that she can sway without showing what lies behind her */
  R(g,-B,RAIL,w+2*B,D0-RAIL,night?'#1e1814':'#4e3e30');R(g,-B,RAIL,w+2*B,1.5,night?'#2e241c':'#6e5640');R(g,-B,D0-1,w+2*B,1,night?'#120e0c':'#30261e');
  g.fillStyle=lg(g,0,D0,0,144,night?['#120f0d','#1c1714']:['#3e342c','#54463a']);g.fillRect(-B,D0,w+2*B,144-D0+B);
  if(SHARED.weather)SHARED.weather.wetGround(g,-B,D0,w+2*B,144-D0+B,{damp:true,dampH:6,sheen:night?.06:.22,dampA:.4})}
function hullPlaceholder(g,x,y,a,len,o){o=o||{};g.save();g.translate(x,y);g.rotate(a);const L=len||200,H=o.h||22;
  poly(g,[0,-H,L*.08,-H-2,L*.9,-H-1,L+6,-H-9,L,-H*.4,L*.92,0,L*.06,0,-4,-H*.5],o.c||'#4a3a2e');R(g,L*.1,-H-1,L*.78,1.5,'#6a5440');
  R(g,L*.32,-H-6,L*.18,5,'#5a4836');g.restore()}

return{BEAT,ENG,inner,beat,gust,PAL,sky,rain,deckSea,sideSea,bay,deckPlaceholder,hullPlaceholder,finishA,spray,drift}})();
