/* Paul of Tarsus: the storm at sea, for Chapters Twenty-Two and Twenty-Three (Acts 27:14-44): the northeaster and the many days with
   neither sun nor stars, and the surf in the bay at a grey daybreak, in rain. Painted to the standard of shared/coast.js: the half-pixel
   canvas, light worked out for the hour, nothing flat, and what is baked is dithered once as the backdrop is. Loaded on demand via
   CHAP[n].needs (list 'storm', with 'weather' for the wet deck and 'country' for the bay's shore) and registered in shared/pwa.js for
   offline play. Every painter takes a seed of its own and draws nothing from the room's rng().

   The account names a violent wind, thick cloud, rain and cold, and neither sun nor stars for many days (Acts 27:14, 20; 28:2). It names no
   lightning and no thunder, and nothing here makes either: the light never flashes, and the night sky has no star and no moon.

   Nothing here reads a clock. Whatever moves takes the time t (ms, as a room's draw gets it) and, where the sea keeps a beat, the beat b:
   a number whose fraction is the phase of one sea, 0 to 1, and whose whole part counts the seas (pass (now - t0) / BEAT.period, or a
   bare phase). The level keeps the clock; the picture and the test read the same b.

     BEAT                         {period: 6000, parts}: one sea in about six seconds, of which three are a clear pause:
                                    pause  0    .. .50   the deck (or the shallows) is clear; from about .35 the next sea is seen building
                                    rise   .50  .. .58   it stands up above the rail (in the bay: it rises in the near water)
                                    over   .58  .. .66   it breaks over the rail and comes aboard (in the bay: its crest breaks)
                                    run    .66  .. .82   the water runs across the deck (the white water runs through the shallows)
                                    drain  .82  .. 1     it drains away (runs back), and the deck is clear again by 1
     beat(b)                      {f, part, k, safe}: the phase, the part it is in, how far through that part (0..1), and whether the way is
                                  clear (the pause)
     PAL                          the palettes: 'day' (the storm by day), 'night' (no star, no moon: the foam is the lightest thing),
                                  'black' (a darker night, for the maintainer to compare), 'dawn' (the bay at a grey daybreak in rain)

     sky(o)                       the storm sky: a low deck of cloud with darker scud driving under it, baked once as two strips that
                                  tile and moved each frame. o.pal, o.h (how far down it reaches, default 100), o.w, o.seed, o.dx (-1: the
                                  cloud drives to the left), o.speed. Returns {draw(g, t)}. At night there is nothing in it but cloud.
     deckSea(o)                   the heavy seas seen from the deck, looking across her to windward over the rail: ridge after ridge in
                                  perspective, each lifting as it nears, the foam on their tops, spindrift torn off them, and no horizon
                                  (the far seas run into the rain). The ship rides high in the pause and drops into the trough as the sea
                                  comes, so the seas sink away below the rail and then stand up far above it. o.pal, o.rail (the top of
                                  the rail, the y where the sea is cut off by the bulwark, default 82), o.deck0 (the foot of the bulwark
                                  on the deck, 97), o.height (the seas' height, 1), o.lamp [x, y, r] (a low warm light that lights the
                                  water and the rain near it), o.seed. Returns:
                                    draw(g, t, b)     the sky's foot and the seas, from the top of the picture down to the rail: call it
                                                      in the room's draw, then lay the deck and the bulwark over it (as ship.deck does)
                                    aboard(g, t, b)   the sea that comes aboard on the beat: white water over the rail, the green water
                                                      that runs across the deck toward us, and how it drains away; call it after the deck
                                                      and before the figures
                                    front(g, t, b)    the spray that flies over everything when the sea strikes, and the driven rain:
                                                      call it in the room's front
                                    wetAt(x, y, b)    whether the water running across the deck covers the floor at x, y now
                                    roll(b)           the roll of the ship in radians, for a room that turns the whole picture with her
     rain(g, t, o)                driven rain in sheets: broad veils that sweep across with the gusts and the streaks within them, slanting
                                  hard with the wind; o.slant (dx for each pixel down, -.9), o.density, o.pal, o.y0, o.y1, o.splash
                                  [y0, y1] (short splashes on a deck or the sand between those lines), o.lamp [x, y, r] (the streaks near a
                                  lamp catch its light). The streaks are short, so none reads as a line across an upright
     gust(t, seed)                how hard it blows now, 0..1, for the rain and the sound
     sideSea(o)                   the same sea seen from outside, for a ship shown from the side: ridges in perspective from the rain to
                                  the bottom of the picture, with the ship at o.zShip among them. o.pal, o.hz (the eyes' level, never
                                  drawn: the far seas are lost in the rain), o.eye, o.height, o.period (how long one sea takes to pass,
                                  6000), o.seed. Returns:
                                    far(g, t)         the seas beyond the ship; then the ship's painter draws her hull at ride()
                                    ride(t, xa, xb)   where she floats: {y, a, ya, yb}, the waterline under her stern (xa) and her bow (xb)
                                                      and the angle between them, as the seas lift and drop her
                                    wash(g, t, xa, xb) the water at her waterline: a dark band over the foot of the hull and a lace of foam
                                    near(g, t)        the seas between her and us, over the foot of her hull
     bay(o)                       the bay at a grey daybreak in rain (Chapter Twenty-Three): low hills of the shore under cloud, a beach
                                  of sand that curves toward us at the right, rows of breakers running in to it, the wash on the sand,
                                  and the wet sand. Needs SHARED.country. o.seed, o.shoal (true: a bar off to the left with the sea
                                  breaking on both sides of it). Returns:
                                    paint(g)          the whole still picture (for a backdrop or a told picture)
                                    draw(g, t, b)     the cloud, the land and everything that moves: the breakers, and on the beat a
                                                      set of greater seas whose white water runs through the shallows
                                    front(g, t, b)    the rain
                                    edge(x)           the water's edge on the sand (the y of the line)
                                    wetAt(x, y, b)    whether the white water of the beat covers the shallows at x, y now
     deckPlaceholder(g, o)        a plain flat deck and bulwark for mockups only: the ship's painter paints the real one
     hullPlaceholder(g, x, y, a, len) a plain flat hull for mockups only

   CONTRIBUTING section 3: the foam is level rows and filled shapes, never a vertical stroke across a level one; spray flies in short
   level dashes and small squares; spindrift is a stair of level dashes down the wind; the rain's streaks are short and slanting; no
   horizon is drawn anywhere, so nothing can stand across one; no bird is in the air (section 4: none in rain or a storm); the light
   never flashes, and the spray's veil comes up and goes over a third of a second. A lamp's light lies long and low on the deck and the
   water. Look at the stop `storm` (and the mockup's enlarged crops) after a change. */
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
function fbm(x,y,s,n,p){let v=0,a=.5,f=1,t=0;for(let k=0;k<n;k++){v+=a*vn(x*f,y*f,s+k*17,p?p*f:0);t+=a;f*=2;a*=.5}return v/t}
/* finishA: as the engine's finish (colors in steps, a 4x4 ordered dither), and the alpha dithered on the same grid, so that a layer
   with soft edges (scud, haze) keeps them as a stipple and lies over what is behind it without a halo */
function finishA(c,g,q,soft){q=q||12;const w=c.width,h=c.height,im=g.getImageData(0,0,w,h),d=im.data;
  for(let y=0,i=0;y<h;y++)for(let x=0;x<w;x++,i+=4){const b=(BAYER[((y>>1)&3)*4+((x>>1)&3)]+.5)/16;if(soft){if(!d[i+3])continue}else{if(d[i+3]/255<=b){d[i+3]=0;continue}d[i+3]=255}
    const t=(b-.5)*q,m=d[i]*.3+d[i+1]*.59+d[i+2]*.11;
    for(let k=0;k<3;k++){const v=Math.round(((m+(d[i+k]-m)*1.14-128)*1.07+128+t)/q)*q;d[i+k]=v<0?0:v>255?255:v}}
  g.putImageData(im,0,0)}

/* ---------- the beat ---------- */
const BEAT={period:6000,parts:[['pause',0,.5],['rise',.5,.58],['over',.58,.66],['run',.66,.82],['drain',.82,1]]};
function beat(b){const f=fr(b||0);let p=BEAT.parts[0];for(const q of BEAT.parts)if(f>=q[1]&&f<q[2])p=q;
  return{f,n:Math.floor(b||0),part:p[0],k:(f-p[1])/(p[2]-p[1]),safe:p[0]==='pause'}}
/* how hard it blows: 0..1, gusting over a few seconds */
const gust=(t,s)=>clamp(.56+.26*Math.sin(t/1900+(s||0))+.18*Math.sin(t/730+2.1*(s||0))+.08*Math.sin(t/310+.7),0,1);

/* ---------- palettes ---------- */
const PAL={
  /* by day: no sun anywhere; the sky a heavy grey, the seas dark green-grey with pale glassy lips, the foam the lightest thing */
  day:{zen:'#363b44',mid:'#4f5660',haze:'#79828a',cl:'#6c747e',cd:'#2a2f37',scud:'#23272e',scudL:'#3e444d',
    face:'#253634',deep:'#15201e',glass:'#4f6c62',crest:'#7e988e',foam:'#e4ebe8',foamS:'#a4b4b0',water:'#3b5650',rain:'#c4ccd2',amb:'#8a929c'},
  /* at night: no star, no moon; only the foam and the breaking water show, grey */
  night:{zen:'#07090c',mid:'#0c0f14',haze:'#161b21',cl:'#151a20',cd:'#06080b',scud:'#040507',scudL:'#0d1015',
    face:'#0b1213',deep:'#050809',glass:'#18231f',crest:'#28362f',foam:'#7a8688',foamS:'#465255',water:'#142220',rain:'#5c656c',amb:'#2a3040'},
  /* a darker night still, to compare */
  black:{zen:'#030405',mid:'#050608',haze:'#0b0d11',cl:'#0a0c10',cd:'#020304',scud:'#010102',scudL:'#06080a',
    face:'#05090a',deep:'#020304',glass:'#0c1412',crest:'#16201c',foam:'#4c5658',foamS:'#2c3436',water:'#0a1412',rain:'#384046',amb:'#181c26'},
  /* the bay at a grey daybreak in rain: a little light in the cloud, the shallows green over sand, the foam white */
  dawn:{zen:'#4e535c',mid:'#6b7179',haze:'#9a9d9e',cl:'#8c9196',cd:'#464b54',scud:'#3c4048',scudL:'#5e636b',
    face:'#3a4e48',deep:'#283834',glass:'#6a8678',crest:'#9ab2a6',foam:'#eef1ec',foamS:'#b6c4bc',water:'#557066',rain:'#d2d8da',amb:'#a4a8ac',
    sand:'#a49478',wet:'#5c574e',land:'#56604c'}};

/* ---------- the sky ---------- */
/* two strips that tile across (TW room pixels wide): the cloud deck, opaque, lit softly from above with the haze of the rain toward its
   foot; and the scud, ragged and darker, driving lower and faster, with stippled edges */
const SKYC=new Map();
function skyTiles(pal,h,seed){const key=pal+'|'+h+'|'+seed;if(SKYC.has(key))return SKYC.get(key);
  const P=PAL[pal],TW=640,k=HR,Wd=TW*k,Hd=Math.ceil(h*k),zen=hx(P.zen),mid=hx(P.mid),haze=hx(P.haze),cl=hx(P.cl),cd=hx(P.cd),sc=hx(P.scud),scl=hx(P.scudL);
  const[dc,dg]=mk(Wd,Hd),[sc_,sg]=mk(Wd,Hd),D=dg.createImageData(Wd,Hd),S=sg.createImageData(Wd,Hd);
  /* the cloud seen in perspective: a cell is wide and flat low down and larger overhead */
  const vOf=y=>Math.log(1+y/14)*3.1;
  for(let Y=0;Y<Hd;Y++){const y=(Y+.5)/k,e=y/h,v=vOf(y),v2=vOf(Math.max(0,y-2.2)),sq=1+e*1.6;
    let base=L3(zen,mid,smooth(0,.55,e));base=L3(base,haze,smooth(.45,1,e));
    for(let X=0;X<Wd;X++){const x=(X+.5)/k,u=x/TW*8,i=(Y*Wd+X)*4;
      const w0=fbm(u*sq+.7*fbm(u*.5,v*.5,seed+3,2,4),v,seed,5,8),w1=fbm(u*sq+.7*fbm(u*.5,v2*.5,seed+3,2,4),v2,seed,5,8),
        m=smooth(.38,.72,w0),lit=clamp((w0-w1)*7,-1,1);
      let c=L3(base,cd,m*.55*(1-e*.6));c=L3(c,cl,clamp(lit,0,1)*.55*(1-e*.5));c=L3(c,haze,smooth(.7,1,e)*.7);
      D.data[i]=c[0];D.data[i+1]=c[1];D.data[i+2]=c[2];D.data[i+3]=255;
      /* scud: torn and drawn out along the wind, in a band low in the sky */
      const sv=vOf(y)*2.2,n=fbm(u*1.1+.6*fbm(u*.6,sv*.5,seed+9,2,8),sv,seed+11,4,8),band=smooth(.1,.45,e)*(1-smooth(.85,1,e)),a=smooth(.55,.72,n)*band*.8;
      if(a>0){const n2=fbm(u*1.1+.6*fbm(u*.6,(sv-.35)*.5,seed+9,2,8),sv-.35,seed+11,4,8),l=clamp((n-n2)*5,0,1),q=L3(L3(base,sc,.55),scl,l*.7);
        S.data[i]=q[0];S.data[i+1]=q[1];S.data[i+2]=q[2];S.data[i+3]=a*255}}}
  dg.putImageData(D,0,0);sg.putImageData(S,0,0);finishA(dc,dg,12);finishA(sc_,sg,12,1);
  const T={deck:dc,scud:sc_,TW,h};if(SKYC.size>6)SKYC.delete(SKYC.keys().next().value);SKYC.set(key,T);return T}
function sky(o){o=o||{};const pal=o.pal||'day',h=o.h||100,seed=o.seed||2207,dx=o.dx==null?-1:o.dx,sp=o.speed==null?5:o.speed;let T=null;
  const put=(g,c,off)=>{const W=T.TW,x=hp(-(fr(off/W))*W);g.drawImage(c,0,0,c.width,c.height,x,0,W,T.h);g.drawImage(c,0,0,c.width,c.height,x+W,0,W,T.h)};
  return{h,draw(g,t){if(!T)T=skyTiles(pal,h,seed);put(g,T.deck,-t/1000*sp*dx);put(g,T.scud,-t/1000*sp*3.2*dx)}}}

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
    if(lamp&&Math.hypot((x-lamp[0])/1.8,y-lamp[1])<lamp[2]*(.4+.6*r())){warm.push(x,y);continue}g.moveTo(x,y);g.lineTo(x+dx,y+len)}
  g.strokeStyle=cs(col,.34);g.lineWidth=.5;g.lineCap='butt';g.stroke();
  if(warm.length){g.beginPath();for(let i=0;i<warm.length;i+=2){g.moveTo(warm[i],warm[i+1]);g.lineTo(warm[i]+dx,warm[i+1]+len)}g.strokeStyle='rgba(236,200,160,.42)';g.stroke()}
  /* splashes on the deck or the sand: short level dashes that come and go */
  if(o.splash){const[a,b]=o.splash,sn=Math.round(w*.08*den*(.4+.6*gu));
    for(let i=0;i<sn;i++){const k=fr(t/380+i*.618),c=Math.floor(t/380+i*.618);if(k>.3)continue;const rr=rng(i*977+c*131),sx=rr()*w,sy=a+Math.pow(rr(),.7)*(b-a),u=k/.3,s=(sy-a)/(b-a+1);
      R(g,sx-1-u*s,sy,1.5+u*2*(.6+s),.5,cs(col,.4*(1-u)))}}
  g.restore()}

/* ---------- foam, spray and spindrift: the shapes every sea here is made of ---------- */
/* a run of foam along a crest: a filled band from the crest down by th(x), then rows that spill down the face, each a little shorter;
   all level, nothing upright */
function foamRun(g,pts,i0,i1,th,P,a,warmAt){if(i1-i0<1)return;const p=[];
  for(let i=i0;i<=i1;i++)p.push(pts[2*i],pts[2*i+1]-.3);
  for(let i=i1;i>=i0;i--)p.push(pts[2*i],pts[2*i+1]+th(i));
  poly(g,p,cs(warmAt?mixc(P.foam,'#ffd6a0',warmAt):P.foam,a));
  /* the shade on the foam's lower edge and the rows spilling down the face */
  for(let i=i0;i<i1;i++){const x=pts[2*i],y=pts[2*i+1]+th(i),wd=pts[2*i+2]-x;R(g,x,y-.5,wd,.5,cs(P.foamS,a*.8))}
}
/* spray: small squares and level dashes flung out from (x, y) toward (vx, vy) and falling; u 0..1 how far they have gone */
function spray(g,x,y,vx,vy,u,n,seed,col,a,sz){const r=rng(seed);for(let i=0;i<n;i++){const s=.4+r()*.8,d=u*s,px=x+vx*d+(r()-.5)*sz,py=y+vy*d+20*d*d+(r()-.5)*sz*.4,q=r()<.5?.5:1;
  const al=a*(1-u)*(.5+r()*.5);if(al<.02)continue;R(g,px,py,q+(r()<.4?1:0),.5,cs(col,al));if(q>.5&&r()<.5)R(g,px,py+.5,q,.5,cs(col,al*.6))}}
/* spindrift: a stair of level dashes torn off a crest down the wind */
function drift(g,x,y,dx,dy,len,a,col,u){const n=Math.max(2,Math.round(len/1.6));for(let i=0;i<n;i++){const k=(i+u)/n,al=a*(1-k)*Math.min(1,k*4+.2);if(al<.03)continue;
  R(g,x+dx*k*len,y+dy*k*len,1.5-k*.8,.5,cs(col,al))}}

/* ---------- one sea, seen from in front ---------- */
/* pk: a crest that is sharp at its top and broad in its trough, as a sea in a gale is */
const pk=u=>Math.exp(2.4*(Math.cos(TAU*u)-1));
/* the face texture: level streaks of lighter and darker water and of old foam, baked once for a palette, dithered, and laid on every sea
   (moved with it) so that no face is a flat fill */
const FACEC=new Map();
function faceTex(pal){if(FACEC.has(pal))return FACEC.get(pal);const P=PAL[pal],TW=256,TH=56,[c,q]=mk(TW*HR,TH*HR),im=q.createImageData(TW*HR,TH*HR),d=im.data,
    li=hx(P.glass),dk=hx(P.deep),fo=hx(P.foamS);
  for(let Y=0;Y<TH*HR;Y++)for(let X=0;X<TW*HR;X++){const x=X/HR,y=Y/HR,u=x/TW*6,v=y/2.2,i=(Y*TW*HR+X)*4,
      n=fbm(u+.5*fbm(u*.7,v*.4,41,2,4),v,43,4,6),m=fbm(u*2.2,v*1.6,47,3,13),e=smooth(0,10,y);
    let c=null,a=0;if(n>.6){c=li;a=(n-.6)*2.6*(1-e*.5)}else if(n<.4){c=dk;a=(.4-n)*2.2*e}
    if(m>.7&&y>3){c=fo;a=Math.max(a,(m-.7)*2.4*(1-y/TH))}
    if(c){d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=clamp(a,0,1)*255}}
  q.putImageData(im,0,0);finishA(c,q,12);const T={c,TW,TH};FACEC.set(pal,T);return T}
/* seaRidge: paint one sea from its crest line. S = {pts: x, y pairs every 2 px, sh: its shape 0..1 at each, z: its distance, fade: the
   rain's haze 0..1, sc: room pixels to the metre there (perspective), ox: how far its pattern has drifted in pixels, k: who it is,
   thr: from what shape up its top breaks, brk: 0..1 how much of its whole crest breaks, warm(x, y): 0..1 lamplight there}; o carries the
   palette P, the seed, the wind dx and the time t. Its body runs down to the foot of the picture; the nearer seas are painted over it. */
function seaRidge(g,S,o){const{pts,sh,z,fade,sc,ox,k}=S,P=o.P,haze=hx(P.haze),w=pts[pts.length-2],t=o.t,dxW=o.dxW,fo=1-fade*.92;
  let top=1e9;for(let i=1;i<pts.length;i+=2)top=Math.min(top,pts[i]);const body=[...pts,w,160,pts[0],160];
  poly(g,body,cs(P.face,1));
  g.fillStyle=lg(g,0,top+1.5*sc,0,top+26*sc+10,[cs(P.face,0),cs(P.deep,.9)]);poly(g,body);g.fill();
  /* the face's own streaks, carried with the sea */
  if(fade<.9){const T=faceTex(o.pal);clipTo(g,()=>poly(g,body),()=>{g.globalAlpha=(1-fade)*.9;const x0=-fr(ox/T.TW)*T.TW;
    for(let x=x0-T.TW;x<w+T.TW;x+=T.TW)g.drawImage(T.c,x,top-1,T.TW,T.TH);g.globalAlpha=1})}
  /* the lip: the water under the crest is thin and lets the light through */
  for(const[d,c,a]of[[3.4,P.glass,.3],[2.1,P.glass,.55],[1.1,P.crest,.55],[.3,P.crest,.85]]){g.beginPath();for(let i=0;i<pts.length;i+=2)g[i?'lineTo':'moveTo'](pts[i],pts[i+1]+d*clamp(sc,.3,1.6));
    g.strokeStyle=cs(c,a*(1-fade*.85));g.lineWidth=Math.max(.5,Math.min(1.6,sc*.9));g.stroke()}
  /* the rain's haze between us and it, thicker the farther it is */
  if(fade>.02){poly(g,body);g.fillStyle=lg(g,0,top-2,0,top+30,[cs(haze,fade*.97),cs(haze,fade*.85)]);g.fill()}
  /* where it breaks: the foam on its peaks, the rows spilling down its face, and spindrift torn off the top toward us */
  const thr=S.thr,brk=S.brk||0,n=sh.length,th=i=>(sh[i]-thr)/(1-thr+1e-6)*(.8+Math.min(5,sc*.45))*(1+brk*1.6)+.5;let i0=-1;
  for(let i=0;i<=n;i++){const on=i<n&&sh[i]>thr;if(on&&i0<0)i0=i;if(!on&&i0>=0){const i1=i-1;
      if(i1>i0){foamRun(g,pts,i0,i1,th,P,.94*fo,S.warm?S.warm(pts[2*i0],pts[2*i0+1]):0);
        const rr=rng(k*31+i0*7+(o.seed|0));for(let j=i0;j<i1;j+=1+Math.floor(rr()*2)){const yb=pts[2*j+1]+th(j);const ss=Math.min(2.2,Math.max(.5,sc*.25));for(let q=1;q<=4;q++)if(rr()<.55)R(g,pts[2*j]+(rr()-.3)*ss*2,yb+q*ss*.9,(1.5+rr()*4)*ss,.5,cs(P.foam,(.55-q*.1)*fo))}
        if(z<90&&i1-i0>2){const m=Math.floor((i0+i1)/2),u=fr(t/620+h2(k,i0,5)),len=(6+7*rr())*Math.min(1.8,Math.max(.5,sc*.3));drift(g,pts[2*m],pts[2*m+1]-.5,dxW*.95,.42,len,.65*fo,P.foam,u)}}
      i0=-1}}
  return top}

/* ---------- the seas from the deck ---------- */
/* Seen from the deck across the beam to windward. The seas come toward us one by one; sea k is at z = Z0 + (k - s) DZ metres, s = b - .6,
   so that a sea reaches the ship (Z0) at phase .6 of every beat, in the middle of 'over'. The eye is E metres above the mean level of the
   sea: the ship rides high in the pause and drops into the trough as the sea arrives. A crest of height H at X across is seen at
   y = hz + F (E - H) / z. Nothing of the horizon is drawn: the far seas fade into the rain's haze, which is the color of the sky's foot. */
function deckSea(o){o=o||{};const w=o.w||320,pal=o.pal||'day',P=PAL[pal],hz=o.hz==null?56:o.hz,F=o.F||150,cx=w/2,RAIL=o.rail||82,D0=o.deck0||97,
    ht=o.height==null?1:o.height,seed=o.seed||2209,Z0=13,DZ=24,N=9,lamp=o.lamp,dxW=o.dx==null?-1:o.dx,
    SKY=sky({pal,h:RAIL+4,seed:seed+1,dx:dxW,w});
  const bump=s=>{const q=fr(s+.5)-.5;return Math.exp(-(q/.14)*(q/.14))},
    E=s=>5.6+2.6*(1-2*bump(s)),
    roll=b=>{const s=(b||0)-.6;return .045*Math.sin(TAU*s+.9)},
    rk=k=>h2(k,7,seed),
    lampK=(x,y)=>lamp?Math.pow(clamp(1-Math.hypot((x-lamp[0])/2.2,y-lamp[1])/lamp[2],0,1),1.4):0;
  /* the shape of sea k along X (metres across): three trains of peaks that drift with the wind, the shortest choppy */
  const shapeOf=(k,X,t)=>{const dr=t/1000*1.5*dxW;return .5*pk(X/34+rk(k+99)*3+dr/34)+.32*pk(X/14+rk(k+51)*3+dr*1.6/14)+.18*pk(X/5.5+rk(k+23)*3+dr*2.2/5.5)};
  function sea(g,k,s,t,b){const z=Z0+(k-s)*DZ,near=k-s;if(near<-.09)return;const e=E(s),tl=Math.tan(roll(b)),
      a=ht*(7.6+2*(rk(k)-.5))*(.62+.38*smooth(70,Z0,z)),pts=[],sh=[];
    for(let x=-6;x<=w+6;x+=2){const X=(x-cx)*z/F,q=shapeOf(k,X,t);pts.push(x,hz+F*(e-a*(.55+.45*q))/z+tl*(x-cx));sh.push(q)}
    const brk=clamp(1-(near+.06)/.2,0,1);if(near>-.1&&near<.35)NEAR={b,pts};
    seaRidge(g,{pts,sh,z,fade:1-Math.exp(-Math.max(0,z-Z0-6)/110),sc:F/z,ox:t/1000*1.5*dxW*F/z*.8,k,thr:.68-.6*brk,brk,warm:lamp?lampK:0},{P,pal,t,dxW,seed})}
  let NEAR=null;
  const draw=(g,t,b)=>{b=b||0;const s=b-.6;NEAR=null;SKY.draw(g,t);
    g.save();g.beginPath();g.rect(-8,-8,w+16,RAIL+6);g.clip();
    for(let k=Math.ceil(s-.09)+N-1;k>=Math.ceil(s-.09);k--)sea(g,k,s,t,b);
    g.restore()};
  /* the sea that comes aboard: white water over the rail, then green water running across the deck toward us, then draining away */
  const sheetEdge=(x,f,t)=>{const run=smooth(.6,.8,f),lob=Math.sin(x/23+1.3)*4+Math.sin(x/9.5+t/300)*1.6+Math.sin(x/51)*5;
    return D0+(152-D0)*Math.pow(run,.8)+lob*run*(1-run*.3)};
  const wetAt=(x,y,b)=>{const f=fr(b||0);return f>.6&&f<.86&&y>=D0&&y<=sheetEdge(x,f,0)-1};
  /* the broken crest as it comes down on her: heads of white water, rounded, along the whole rail */
  const head=(x,L,ph)=>{const u=fr(x/L+ph)*2-1;return Math.sqrt(Math.max(0,1-u*u))},mass=(x,lift,drop)=>{const q=.45*(.5+.5*Math.cos(TAU*(x/90+.2)))+.35*head(x,23,.3)+.2*head(x,9,.7);return[RAIL-1-lift*(.35+.65*q),RAIL+drop*(.9+.07*Math.sin(x/13+2)+.05*Math.sin(x/4.1)+.04*Math.sin(x/2.3))+1]};
  function aboard(g,t,b){b=b||0;const f=fr(b);if(f<.55)return;const Wd=w;
    const ov=f<.62?1:1-smooth(.68,.75,f),grow=smooth(.555,.625,f);
    if(ov>0&&grow>0){const fall=smooth(.6,.72,f),drop=smooth(.59,.66,f)*(D0-RAIL+6),C=NEAR&&NEAR.b===b?NEAR.pts:null,
        cy=x=>{if(!C)return RAIL-26*ht;const j=clamp(Math.round((x+6)/2),0,C.length/2-1);return Math.min(RAIL,C[2*j+1])},
        tp=(x,dy,L)=>{const y=cy(x);return y+(RAIL-y)*fall*.92-head(x,L,dy*.1+.3)*(1.5+5*fall)+dy+(1-ov)*3},
        bt=x=>{const y=cy(x),yb=mass(x,0,drop)[1];return y+(yb-y)*Math.min(1,grow*1.15)*(.96+.04*Math.sin(x/7+1))};
      /* the white comes down the sea's face from its crest, then the crest falls onto the rail and over it: two layers, the shade behind
         and the white heads, then level rows of shade in the white and the green of the water showing through low down */
      let face=null;
      for(const[dy,c,L]of[[-1.6,P.foamS,17],[0,P.foam,23]]){const p=[];
        for(let x=-6;x<=Wd+6;x+=2)p.push(x,tp(x,dy,L));for(let x=Wd+6;x>=-6;x-=2)p.push(x,Math.max(tp(x,dy,L),bt(x)));
        poly(g,p,cs(c,.97*ov));face=p}
      clipTo(g,()=>poly(g,face),()=>{
        g.fillStyle=lg(g,0,RAIL-34,0,D0+6,[cs(P.glass,0),cs(P.glass,.14*ov),cs(P.glass,.5*ov)]);g.fillRect(-6,-4,Wd+12,D0+12);
        const rr=rng(seed+77),mv=(f-.56)*50;for(let i=0;i<300;i++){const x=rr()*(Wd+12)-6,y=cy(x)+rr()*(D0+4-cy(x))+mv*rr(),ln=2+rr()*9,c=rr()<.25?P.glass:P.foamS;R(g,x,y,ln,.5,cs(c,(.3+.35*rr())*ov))}});
      if(lamp)glowOn(g,face,lamp,ov)}
    /* on the deck: the sheet of water running toward us, a band of white at its leading edge, and foam marbling behind it */
    const run=smooth(.6,.64,f)*(1-smooth(.8,.97,f));
    if(run>0){const pts=[];for(let x=-6;x<=Wd+6;x+=2)pts.push(x,sheetEdge(x,f,t));
      const p=[-6,D0-1,Wd+6,D0-1];for(let i=pts.length-2;i>=0;i-=2)p.push(pts[i],pts[i+1]);
      const dr=smooth(.8,.97,f);
      poly(g,p,cs(P.water,.9*run));
      clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,0,D0,0,152,[cs(P.glass,.55*run),cs(P.water,0)]);g.fillRect(-6,D0-1,Wd+12,60);
        const T=faceTex(pal);g.globalAlpha=run*.8;for(let x=-fr(t/40/T.TW)*T.TW-T.TW;x<Wd+T.TW;x+=T.TW)g.drawImage(T.c,x,D0+(f-.6)*30,T.TW,T.TH);g.globalAlpha=1;
        /* the foam on it: level streaks that the water carries toward us and spreads as it goes */
        const rr=rng(seed+303),mv=(f-.6)*70;for(let i=0;i<170;i++){const x=rr()*(Wd+20)-10,y0=D0+rr()*50,y=y0+mv*(.4+rr()*.6),s=clamp((y-D0)/40,.3,1.6),ln=(2+rr()*10)*s;
          if(rr()<dr*1.1)continue;R(g,x,y,ln,.5,cs(P.foam,(.3+.5*rr())*run));if(ln>5)R(g,x+ln*.25,y+.5,ln*.5,.5,cs(P.foam,.25*run))}});
      /* the leading edge: a band of white that thins as the water spreads */
      for(let i=0;i<pts.length-2;i+=2){const x=pts[i],y=pts[i+1],s=clamp((y-D0)/30,.4,1.8),th=(1.5+2.8*s)*(1-dr*.8);
        R(g,x,y-th,2,th,cs(P.foam,.96*run));R(g,x,y-th-.5,2,.5,cs(P.foamS,.6*run))}
      if(lamp)glowOn(g,p,lamp,run)}
    /* as it drains: the last of the foam in level strands, slipping toward us and away under the lee rail, and a film of water */
    const dn=smooth(.8,.86,f)*(1-smooth(.93,1,f));
    if(dn>0){const rr=rng(seed+505),mv=(f-.8)*120;for(let i=0;i<110;i++){const x=rr()*Wd,y=D0+2+rr()*44+mv*(.5+rr()*.5),s=clamp((y-D0)/40,.3,1.6),ln=(2+rr()*7)*s;if(y>150)continue;
        R(g,x,y,ln,.5,cs(P.foam,(.2+.35*rr())*dn))}
      comp(g,'screen',.16*dn,()=>{g.fillStyle=lg(g,0,D0,0,144,[cs(P.haze,1),cs(P.haze,.2)]);g.fillRect(-6,D0,Wd+12,48)})}}
  /* a lamp's light on the water: warm, long and low */
  function glowOn(g,p,L,a){clipTo(g,()=>poly(g,p),()=>pool(g,L[0],L[1]+6,L[2]*1.4,L[2]*.45,'#ffb868',.55*a,'screen'))}
  /* in front of everything: the spray as the sea strikes, flung over the rail toward us; a thin veil of it that comes up and goes over a
     third of a second and more (never a flash); the rain */
  function front(g,t,b){b=b||0;const f=fr(b);
    if(f>.56&&f<.78){const u=(f-.56)/.22,ve=Math.sin(Math.PI*clamp((f-.57)/.19,0,1));
      if(ve>0){g.fillStyle=lg(g,0,RAIL-30,0,144,[cs(P.foamS,.2*ve),cs(P.foamS,.05*ve)]);g.fillRect(-6,0,w+12,144)}
      for(let j=0;j<7;j++){const x=12+j*48+(j%2)*13;spray(g,x,RAIL-8,dxW*26,60,u,52,seed+j*17+((b|0)%5)*101,P.foam,.9,12)}}
    rain(g,t,{w,pal,density:o.rain==null?1:o.rain,lamp,splash:[D0+4,140],seed:seed+3})}
  return{draw,aboard,front,wetAt,roll,E,sky:SKY,rail:RAIL,deck0:D0,pal:P,beat}}

/* ---------- the sea from outside, a ship among the seas ---------- */
/* The seas run toward us, a crest every DZ metres, one passing every o.period ms; the ship lies at ZS among them, so the seas beyond her
   are drawn before her hull and those between her and us after it. Her waterline is the surface at ZS under her stern and her bow. */
function sideSea(o){o=o||{};const w=o.w||320,pal=o.pal||'day',P=PAL[pal],hz=o.hz==null?30:o.hz,F=o.F||300,E=o.eye||12,cx=w/2,ZS=o.zShip||46,DZ=o.spacing||24,Z0=6,
    ht=o.height==null?1:o.height,per=o.period||6000,seed=o.seed||2215,dxW=o.dx==null?-1:o.dx,rk=k=>h2(k,3,seed),N=14;
  const SKY=sky({pal,h:hz+34,seed:seed+1,dx:dxW,w});
  const amp=k=>ht*(6+1.8*(rk(k)-.5)),
    shape=(k,X,t)=>{const dr=t/1000*1.4*dxW;return .5*pk(X/40+rk(k+9)*3+dr/40)+.32*pk(X/15+rk(k+5)*3+dr*1.5/15)+.18*pk(X/6+rk(k+2)*3+dr*2/6)},
    zOf=(k,t)=>Z0+(k-t/per)*DZ;
  function ridge(g,k,t){const z=zOf(k,t);if(z<Z0*.4||z>Z0+N*DZ)return;const pts=[],sh=[];
    for(let x=-6;x<=w+6;x+=2){const X=(x-cx)*z/F,q=shape(k,X,t);pts.push(x,hz+F*(E-amp(k)*(.55+.45*q))/z);sh.push(q)}
    seaRidge(g,{pts,sh,z,fade:1-Math.exp(-Math.max(0,z-20)/150),sc:F/z/4,ox:t/1000*1.4*dxW*F/z*.8,k,thr:.5},{P,pal,t,dxW,seed})}
  const ks=t=>{const s=t/per,out=[];for(let k=Math.floor(s+N);k>=Math.ceil(s-.6);k--)out.push(k);return out};
  /* the surface at x where she lies: high under a crest that is passing her, low between */
  function heightAt(x,t){const u=(ZS-Z0)/DZ+t/per,k=Math.floor(u),q=u-k,X=(x-cx)*ZS/F,c=v=>Math.exp(-v*v/.045);
    return amp(k)*(.55+.45*shape(k,X,t))*c(q)+amp(k+1)*(.55+.45*shape(k+1,X,t))*c(1-q)-ht*2.4}
  const ride=(t,xa,xb)=>{const ya=hz+F*(E-heightAt(xa,t))/ZS,yb=hz+F*(E-heightAt(xb,t))/ZS;return{ya,yb,y:(ya+yb)/2,a:Math.atan2(yb-ya,xb-xa)}};
  return{sky:SKY,
    far(g,t){SKY.draw(g,t);for(const k of ks(t))if(zOf(k,t)>ZS)ridge(g,k,t)},
    near(g,t){for(const k of ks(t))if(zOf(k,t)<=ZS)ridge(g,k,t)},
    ride,
    wash(g,t,xa,xb){const R0=ride(t,xa,xb);
      for(let x=xa;x<=xb;x+=1){const y=R0.ya+(R0.yb-R0.ya)*(x-xa)/(xb-xa),q=Math.sin(x/7+t/400)*.6+Math.sin(x/3.1-t/260)*.4;
        R(g,x,y-1.5+q*.5,1,3,cs(P.face,.95));R(g,x,y-1.6+q*.5,1,.5,cs(P.foam,clamp(.35+q*.5,0,1)))}
      /* white water thrown up at her bow as she drops into a sea */
      const dip=(R0.yb-R0.ya)*Math.sign(xb-xa);if(dip>1){const u=fr(t/520);spray(g,xb,R0.yb-3,-dxW*10*Math.sign(xb-xa),-24,u,34,seed+((t/520)|0),P.foam,clamp((dip-1)/5,0,1),6)}},
    front(g,t){rain(g,t,{w,pal,density:o.rain==null?1:o.rain,seed:seed+3})}}}

/* ---------- the bay at daybreak ---------- */
/* We stand on the beach and look out over the bay. At the right the low hills of the shore come down to it and the beach curves round
   toward us; at the left the bay opens to the sea, which is lost in the rain (no horizon is drawn: the water fades into the haze, the color
   of the sky's foot). Far out at the left the seas break on a bar, white on both sides of it. The rows of breakers lie along the beach as
   its waterline does: a row d metres out lies at y = HZ + (edge(x) - HZ) / (1 + d / 25). They come in toward us, rise, break, and run
   through the shallows as white water, up the sand and back. On the beat a greater sea does the same, and its white water fills the
   shallows from side to side. */
function bay(o){o=o||{};const w=o.w||320,P=PAL.dawn,HZ=60,seed=o.seed||2301,CO=SHARED.country,SKY=sky({pal:'dawn',h:70,seed:seed+1,dx:-1,w,speed:4}),D=25;
  const edge=x=>121+2.4*Math.sin(x/41+1)+1.2*Math.sin(x/13)-37*Math.pow(smooth(170,326,x),1.15),
    far=x=>x<150?HZ:HZ+2+(x-150)*.13,
    yAt=(x,d)=>HZ+(edge(x)-HZ)/(1+d/D),
    hills=x=>{const u=clamp((x-128)/40,0,1);return far(x)-u*(15+8*Math.sin(x/47+.6)+4*Math.sin(x/19+2)+1.4*Math.sin(x/7.3))-2*u},
    water=new Path2D();
  water.moveTo(-6,HZ-1);for(let x=-6;x<=w+6;x+=2)water.lineTo(x,far(x)-.5);for(let x=w+6;x>=-6;x-=2)water.lineTo(x,edge(x)+.5);water.closePath();
  let LAND=null;
  /* everything below the cloud, baked once with the sky left out */
  function land(){if(LAND)return LAND;const[c,q]=mk(w*HR,144*HR);q.scale(HR,HR);const r=rng(seed+5);
    /* the sea far out: the color of the haze where it meets the sky, darker toward us */
    q.fillStyle=lg(q,0,HZ-1,0,124,[P.haze,mix(P.water,P.haze,.55),P.water,P.face]);q.fill(water);
    clipTo(q,()=>q.clip(water),()=>{q.fillStyle=lg(q,0,0,w,0,['rgba(26,38,36,.25)','rgba(26,38,36,0)','rgba(150,140,110,.2)']);q.fillRect(-6,HZ,w+12,70);
      tex(q,'mott',.25,-6,HZ,w+12,70,'overlay',1);
      for(let i=0;i<380;i++){const x=r()*w,d=Math.pow(r(),1.3)*220,y=yAt(x,d),s=(y-HZ)/40;if(y>edge(x)-1)continue;R(q,x,y,(2+r()*9)*s+.5,.5,cs(P.foamS,(.12+.25*r())*clamp(s*2,0,1)))}
      if(o.shoal!==false){/* the bar far out at the left: the sea breaking white along it, open water on both sides */
        for(let i=0;i<120;i++){const x=6+r()*92,y=HZ+3.2+x*.012+(r()-.5)*1.2;R(q,x,y,.5+r()*2.4,.5,cs(P.foam,.3+.5*r()))}}});
    /* a far point of land at the left, in the rain */
    const FP=[-6,HZ];for(let x=-6;x<=34;x+=1)FP.push(x,HZ-3.5*smooth(34,0,x)-.8*Math.sin(x/3));FP.push(34,HZ);poly(q,FP,cs(mix(P.land,P.haze,.75),1));
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
    /* the beach we stand on: wet sand along the water with the grey sky lying in it, then the dry sand, darkened by the rain */
    const BP=[-6,152];for(let x=-6;x<=w+6;x+=1)BP.push(x,edge(x));BP.push(w+6,far(w+6),w+6,152);
    poly(q,BP);q.fillStyle=lg(q,0,95,0,150,[mix(P.sand,P.wet,.4),mix(P.sand,P.wet,.3),P.sand]);q.fill();
    clipTo(q,()=>poly(q,BP),()=>{tex(q,'mott',.35,-6,80,w+12,72,'overlay',1);tex(q,'grain',.2,-6,80,w+12,72,'overlay',.5);
      for(let x=-6;x<w+6;x+=.5){const e=edge(x),s=clamp((e-HZ)/40,.3,1.6),wb=(4+s*9)*(.7+.5*fbm(x/11,0,seed,2));q.fillStyle=lg(q,0,e,0,e+wb,[cs(P.wet,.8),cs(P.wet,.5),cs(P.wet,0)]);q.fillRect(x,e,.5,wb)}
      for(let i=0;i<90;i++){const x=r()*w,e=edge(x),s=clamp((e-HZ)/40,.3,1.6),y=e+1+r()*s*7;R(q,x,y,(3+r()*10)*s,.5,cs(P.haze,.3+r()*.2))}
      /* ripples the backwash left, long and low, and strands of weed along the line of the last high wash */
      for(let i=0;i<160;i++){const x=r()*w,e=edge(x),y=e+6+Math.pow(r(),.8)*(150-e-6),s=clamp((y-HZ)/50,.3,1.8);R(q,x,y,(2+r()*7)*s,.5,cs(r()<.5?'#4a4438':'#d8ccb0',.12+.1*r()))}
      for(let i=0;i<40;i++){const x=r()*w,e=edge(x),s=clamp((e-HZ)/40,.3,1.6),y=e+(9+r()*5)*s;R(q,x,y,(1+r()*3)*s,.5,'rgba(52,58,40,.6)')}});
    finishA(c,q,12);return LAND=c}
  /* one row at d metres out, of size a: unbroken, a dark face under a pale lip; breaking (br 0..1), white comes down its face; broken,
     a band of white water rolling in, its front ragged, foam trailing behind it */
  function row(g,d,a,br,t,id){const pts=[];for(let x=-6;x<=w+6;x+=2)pts.push(x,yAt(x,d));
    const hb=x=>{const s=clamp((yAt(x,d)-HZ)/40,.1,2);return(.6+3.2*s)*a*(.75+.25*Math.sin(x/17+id)+.1*Math.sin(x/6.3+id*2))};
    const face=[];for(let i=0;i<pts.length;i+=2)face.push(pts[i],pts[i+1]);for(let i=pts.length-2;i>=0;i-=2)face.push(pts[i],pts[i+1]+hb(pts[i]));
    poly(g,face,cs(P.face,.85*(1-br*.7)));
    g.beginPath();for(let i=0;i<pts.length;i+=2)g[i?'lineTo':'moveTo'](pts[i],pts[i+1]+.3);g.strokeStyle=cs(P.crest,.8*(1-br*.4));g.lineWidth=.6;g.stroke();
    g.beginPath();for(let i=0;i<pts.length;i+=2)g[i?'lineTo':'moveTo'](pts[i],pts[i+1]+1.1);g.strokeStyle=cs(P.glass,.6*(1-br*.5));g.lineWidth=.7;g.stroke();
    if(br>0){const wf=[];for(let i=0;i<pts.length;i+=2){const x=pts[i];wf.push(x,pts[i+1]-.4-br*hb(x)*.25)}
      for(let i=pts.length-2;i>=0;i-=2){const x=pts[i],j=Math.sin(x/5.1+id+t/300)*.6+Math.sin(x/2.3+id*3)*.4;wf.push(x,pts[i+1]+hb(x)*(.3+.9*br)+j*br*hb(x)*.25)}
      poly(g,wf,cs(P.foam,.95*Math.min(1,br*2)));
      /* the shade in the white, low down, and the foam trailing behind it, toward the sea */
      for(let i=0;i<pts.length;i+=2){const x=pts[i];R(g,x,pts[i+1]+hb(x)*(.3+.9*br)-.6,2,.5,cs(P.foamS,.7*br))}
      const r=rng(id*131+7);for(let i=0;i<90;i++){const x=r()*w,dd=d+r()*18*br,y=yAt(x,dd),s=clamp((y-HZ)/40,.1,2);R(g,x,y-.5,(2+r()*8)*s,.5,cs(P.foam,(.25+.5*r())*br*Math.min(1,a)))}}}
  /* the wash on the sand: a thin sheet of water running up by u (0..1) and back, its edge a lace of foam */
  function wash(g,u,a,id){for(let x=-6;x<=w+6;x+=2){const e=edge(x),s=clamp((e-HZ)/40,.3,1.6),up=u*(3+7*s)*(.7+.3*Math.sin(x/13+id));if(up<.3)continue;
    R(g,x,e,2,up,cs(P.glass,.3*a));R(g,x,e+up-.5,2,.5,cs(P.foam,.85*a))}}
  /* the beat's sea: where it is (d) and how far it has broken, by phase */
  const setD=f=>f<.3?Infinity:f<.5?220-(f-.3)/.2*100:f<.58?120-(f-.5)/.08*50:f<.66?70-(f-.58)/.08*35:f<.82?35-(f-.66)/.16*35:0,
    setBr=f=>smooth(.56,.64,f),setA=f=>1+smooth(.3,.56,f)*1.2,
    wetAt=(x,y,b)=>{const f=fr(b||0);if(f<.62||f>.92)return false;const d=setD(f),front=f<.82?yAt(x,d)+3:edge(x)+(f<.88?8:4);return y<=front&&y>=yAt(x,d+16)};
  function draw(g,t,b){b=b||0;const f=fr(b);SKY.draw(g,t);g.drawImage(land(),0,0,w,144);
    g.save();g.clip(water);
    /* the rows that keep coming between the sets, smaller; drawn far to near */
    const rows=[];for(let j=0;j<4;j++){const u=fr(t/7200+j/4),d=180*Math.pow(1-u,1.6);rows.push([d,.5+.15*(j%3),smooth(.45,.6,u)*(1-smooth(.96,1,u)),j+1])}
    const d0=setD(f);if(isFinite(d0)&&f<.84)rows.push([d0,setA(f),setBr(f),90+(b|0)%7]);
    rows.sort((p,q)=>q[0]-p[0]);for(const[d,a,br,id]of rows)row(g,d,a,br,t,id);
    g.restore();
    for(let j=0;j<2;j++){const u=fr(t/3600+j*.5);wash(g,Math.sin(Math.PI*u)*.6,.6,j)}
    if(f>.8){const u=clamp((f-.8)/.18,0,1);wash(g,Math.sin(Math.PI*u)*1.7,1,9)}}
  function front(g,t,b){rain(g,t,{w,pal:'dawn',density:o.rain==null?.8:o.rain,splash:[104,142],seed:seed+3,slant:-.7})}
  function paint(g){const T=skyTiles('dawn',70,seed+1);g.drawImage(T.deck,0,0,w,70);g.drawImage(T.scud,0,0,w,70);g.drawImage(land(),0,0,w,144)}
  return{paint,draw,front,edge,wetAt,yAt,setD}}

/* ---------- placeholders, for mockups only: the ship's painter paints the real deck and hull ---------- */
function deckPlaceholder(g,o){o=o||{};const w=o.w||320,RAIL=o.rail||82,D0=o.deck0||97,night=o.night;
  /* the bulwark: one flat band, its rail a lighter strip */
  R(g,-4,RAIL,w+8,D0-RAIL,night?'#1e1814':'#4e3e30');R(g,-4,RAIL,w+8,1.5,night?'#2e241c':'#6e5640');R(g,-4,D0-1,w+8,1,night?'#120e0c':'#30261e');
  /* the deck: one flat tone, darker near the bulwark, wet */
  g.fillStyle=lg(g,0,D0,0,144,night?['#120f0d','#1c1714']:['#3e342c','#54463a']);g.fillRect(-4,D0,w+8,144-D0);
  if(SHARED.weather)SHARED.weather.wetGround(g,-4,D0,w+8,144-D0,{damp:true,dampH:6,sheen:night?.06:.22,dampA:.4})}
function hullPlaceholder(g,x,y,a,len,o){o=o||{};g.save();g.translate(x,y);g.rotate(a);const L=len||200,H=o.h||22;
  poly(g,[0,-H,L*.08,-H-2,L*.9,-H-1,L+6,-H-9,L,-H*.4,L*.92,0,L*.06,0,-4,-H*.5],o.c||'#4a3a2e');R(g,L*.1,-H-1,L*.78,1.5,'#6a5440');
  R(g,L*.32,-H-6,L*.18,5,'#5a4836');g.restore()}

return{BEAT,beat,gust,PAL,sky,rain,deckSea,sideSea,bay,deckPlaceholder,hullPlaceholder,finishA,spray,drift}})();
