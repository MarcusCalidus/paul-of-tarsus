/* Paul of Tarsus: the title logo, loaded for the title screen (see need() in index.html).
   The game's name in raised gold capitals that stand taller toward the middle, so that the name stands under an arch, and the subtitle
   between two rules beneath it. It is painted in code like everything else: there is no font file, and the letters are our own.
   Each letter is a skeleton of strokes (GL), written with a broad pen held at an angle, which gives the thick and thin of Roman
   capitals, and finished with serifs. That makes a mask of whole pixels, two to the room pixel like the backdrops, and the gold, the
   raised side, the outline and the shadow are painted from the mask. Light comes from the upper right, where the moon stands on the
   title screen. Nothing sparkles or glows, and the rules stop short of the subtitle: see section 3 of CONTRIBUTING.md.

     paint(name, sub)   the logo as a canvas, for a name and a subtitle already in the player's language. It is painted once and kept.
     can(text)          whether every letter of a text has a glyph here. A language whose title needs another letter adds it to GL;
                        until then the title screen shows that language's title as plain text. */
SHARED.logo=(()=>{
"use strict";
/* The letters. The cap height is 1, y runs down and the baseline is at 1. s: the strokes, each a path (M move, L line, C curve,
   E ellipse: centre and radii), with h:1 for a hairline. f: the serifs, [x, y, kind, on a hairline]: b a foot and t a head (bl, br,
   tl, tr on one side only); d and u a tick down or up at the end of an arm, ud both, and a trailing - where the arm ends on its left. */
const stem=x=>({p:['M',x,0,'L',x,1]});
const GL={
 A:{w:.88,s:[{p:['M',.44,-.02,'L',.06,1],h:1},{p:['M',.44,-.02,'L',.82,1]},{p:['M',.21,.65,'L',.68,.65],h:1}],f:[[.06,1,'b',1],[.82,1,'b']]},
 D:{w:.86,s:[stem(.13),{p:['M',.13,.035,'L',.34,.035,'C',.86,.035,.86,.965,.34,.965,'L',.13,.965]}],f:[[.13,0,'tl'],[.13,1,'bl']]},
 E:{w:.58,s:[stem(.13),{p:['M',.13,.035,'L',.52,.035],h:1},{p:['M',.13,.49,'L',.45,.49],h:1},{p:['M',.13,.965,'L',.55,.965],h:1}],f:[[.13,0,'tl'],[.13,1,'bl'],[.52,.035,'d'],[.45,.49,'ud'],[.55,.965,'u']]},
 F:{w:.56,s:[stem(.13),{p:['M',.13,.035,'L',.52,.035],h:1},{p:['M',.13,.49,'L',.45,.49],h:1}],f:[[.13,0,'tl'],[.13,1,'b'],[.52,.035,'d'],[.45,.49,'ud']]},
 H:{w:.86,s:[stem(.13),stem(.73),{p:['M',.13,.48,'L',.73,.48],h:1}],f:[[.13,0,'t'],[.13,1,'b'],[.73,0,'t'],[.73,1,'b']]},
 L:{w:.58,s:[stem(.13),{p:['M',.13,.965,'L',.56,.965],h:1}],f:[[.13,0,'t'],[.13,1,'bl'],[.56,.965,'u']]},
 M:{w:1.06,s:[{p:['M',.10,1,'L',.17,0],h:1},{p:['M',.17,0,'L',.53,.93]},{p:['M',.53,.93,'L',.89,0],h:1},{p:['M',.89,0,'L',.96,1]}],f:[[.10,1,'b',1],[.96,1,'b']]},
 N:{w:.90,s:[{p:['M',.13,1,'L',.13,0],h:1},{p:['M',.13,0,'L',.77,1]},{p:['M',.77,1,'L',.77,0],h:1}],f:[[.13,1,'b',1],[.77,0,'t',1],[.13,0,'tl',1]]},
 O:{w:1,s:[{p:['E',.5,.5,.435,.525]}],f:[]},
 P:{w:.62,s:[stem(.13),{p:['M',.13,.035,'L',.30,.035,'C',.62,.035,.62,.56,.30,.56,'L',.13,.56]}],f:[[.13,0,'tl'],[.13,1,'b']]},
 R:{w:.72,s:[stem(.13),{p:['M',.13,.035,'L',.30,.035,'C',.60,.035,.60,.52,.30,.52,'L',.13,.52]},{p:['M',.33,.52,'L',.68,1]}],f:[[.13,0,'tl'],[.13,1,'b'],[.68,1,'br']]},
 S:{w:.60,s:[{p:['M',.51,.16,'C',.43,-.03,.10,-.04,.095,.23,'C',.09,.37,.20,.43,.31,.49,'C',.43,.55,.535,.62,.535,.77,'C',.535,1.05,.15,1.04,.06,.82]}],f:[]},
 T:{w:.80,s:[stem(.40),{p:['M',.04,.035,'L',.76,.035],h:1}],f:[[.40,1,'b'],[.04,.035,'d-'],[.76,.035,'d']]},
 U:{w:.86,s:[{p:['M',.13,0,'L',.13,.66,'C',.13,1.08,.73,1.08,.73,.66,'L',.73,0]}],f:[[.13,0,'t'],[.73,0,'t']]},
 V:{w:.86,s:[{p:['M',.04,0,'L',.43,1.02]},{p:['M',.82,0,'L',.43,1.02],h:1}],f:[[.04,0,'t'],[.82,0,'t',1]]},
 /* the rest of the alphabet, for the chapters' title cards. X is a letter here, as chi in a carved inscription (CONTRIBUTING section 3). */
 B:{w:.68,s:[stem(.13),{p:['M',.13,.035,'L',.30,.035,'C',.58,.035,.58,.48,.30,.48,'L',.13,.48]},{p:['M',.13,.48,'L',.33,.48,'C',.66,.48,.66,.965,.33,.965,'L',.13,.965]}],f:[[.13,0,'tl'],[.13,1,'bl']]},
 C:{w:.84,s:[{p:['M',.78,.21,'C',.68,-.03,.08,-.06,.07,.5,'C',.06,1.06,.70,1.04,.80,.78]}],f:[]},
 G:{w:.88,s:[{p:['M',.78,.21,'C',.68,-.03,.08,-.06,.07,.5,'C',.06,1.06,.66,1.06,.78,.84,'L',.78,.58]},{p:['M',.54,.58,'L',.78,.58],h:1}],f:[]},
 I:{w:.38,s:[stem(.19)],f:[[.19,0,'t'],[.19,1,'b']]},
 J:{w:.46,s:[{p:['M',.32,0,'L',.32,.80,'C',.32,1.08,.08,1.10,.02,.92]}],f:[[.32,0,'t']]},
 K:{w:.80,s:[stem(.13),{p:['M',.70,0,'L',.15,.57],h:1},{p:['M',.32,.40,'L',.76,1]}],f:[[.13,0,'t'],[.13,1,'b'],[.70,0,'t',1],[.76,1,'br']]},
 W:{w:1.14,s:[{p:['M',.02,0,'L',.29,1.02]},{p:['M',.56,.04,'L',.29,1.02],h:1},{p:['M',.56,.04,'L',.83,1.02]},{p:['M',1.10,0,'L',.83,1.02],h:1}],f:[[.02,0,'t'],[1.10,0,'t',1]]},
 X:{w:.84,s:[{p:['M',.06,0,'L',.76,1]},{p:['M',.74,0,'L',.08,1],h:1}],f:[[.06,0,'t'],[.76,1,'b'],[.74,0,'t',1],[.08,1,'b',1]]},
 Y:{w:.82,s:[{p:['M',.04,0,'L',.40,.52]},{p:['M',.78,0,'L',.40,.52],h:1},{p:['M',.40,.52,'L',.40,1]}],f:[[.04,0,'t'],[.78,0,'t',1],[.40,1,'b']]},
 Z:{w:.74,s:[{p:['M',.08,.035,'L',.66,.035],h:1},{p:['M',.66,.035,'L',.08,.965]},{p:['M',.08,.965,'L',.68,.965],h:1}],f:[[.08,.035,'d-'],[.68,.965,'u']]},
 '?':{w:.70,s:[{p:['M',.12,.22,'C',.14,-.04,.62,-.06,.62,.22,'C',.62,.42,.38,.46,.38,.68]},{p:['E',.38,.93,.05,.05]}],f:[]}};
/* letters with dots above them: the dots stand over the capital, and the line makes room for them (see paint) */
for(const[u,b,xs]of[['Ä','A',[.28,.60]],['Ö','O',[.32,.68]],['Ü','U',[.25,.61]]])GL[u]={w:GL[b].w,s:GL[b].s.concat(xs.map(x=>({p:['E',x,-.2,.05,.05]}))),f:GL[b].f};
/* pairs of letters that stand closer together than their widths say */
const KERN={PA:-.13,TA:-.15,AT:-.12,AV:-.16,VA:-.16,VO:-.07,OV:-.07,LT:-.1,LO:-.03,AU:-.03,UA:-.03,RS:-.01,AR:-.02,RO:-.03,OA:-.06,AD:-.02,FR:-.02,TR:-.02,ST:-.02,SS:.01,RA:-.06,TE:-.02,FT:-.04,LU:-.02};
/* The pens: nib is the length of the pen's edge and ang its angle in degrees; thin is added all round; a hairline is written with
   hair of the nib. All in cap heights. serif: how far a serif reaches to each side (sw), its slope (sh) and its foot (bt). */
const NAME={nib:.19,ang:15,thin:.05,hair:.48,serif:{sw:.12,sh:.07,bt:.035}},SUB={nib:.08,ang:17,thin:.1,hair:1};
const can=text=>[...text].every(ch=>ch===' '||GL[ch]);
/* points: a path as runs of points close enough together for the pen to be swept along them */
function points(p){const out=[];let cur,x=0,y=0;
  for(let i=0;i<p.length;){const c=p[i++];
    if(c==='M'){x=p[i++];y=p[i++];out.push(cur=[[x,y]])}
    else if(c==='L'){const X=p[i++],Y=p[i++],n=Math.max(1,Math.ceil(Math.hypot(X-x,Y-y)/.03));for(let k=1;k<=n;k++)cur.push([x+(X-x)*k/n,y+(Y-y)*k/n]);x=X;y=Y}
    else if(c==='C'){const a=p[i++],b=p[i++],e=p[i++],f=p[i++],X=p[i++],Y=p[i++];
      for(let k=1;k<=28;k++){const t=k/28,u=1-t;cur.push([u*u*u*x+3*u*u*t*a+3*u*t*t*e+t*t*t*X,u*u*u*y+3*u*u*t*b+3*u*t*t*f+t*t*t*Y])}x=X;y=Y}
    else{const cx=p[i++],cy=p[i++],rx=p[i++],ry=p[i++];out.push(cur=[]);for(let k=0;k<=64;k++){const t=k/64*6.2832;cur.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}}}
  return out}
/* lay: where each letter of a line stands, and the line's width, in cap heights */
function lay(text,track,space){let x=0;const it=[];
  for(let i=0;i<text.length;i++){const ch=text[i];if(ch===' '){x+=space;continue}it.push({g:GL[ch],x});x+=GL[ch].w+track+(KERN[ch+(text[i+1]||'')]||0)}
  return{it,w:x-track}}
/* write: a line of text on g. o: x, y (the top left of the capitals), cap (their height in pixels), pen, track, space, and
   warp(x, y, u) to bend the line, where u runs from 0 to 1 along it. */
function write(g,text,o){const pen=o.pen,cap=o.cap,L=lay(text,o.track,o.space),W=L.w*cap,A=pen.ang*Math.PI/180,sin=Math.sin(A),cos=Math.cos(A);
  g.lineJoin=g.lineCap='round';
  for(const it of L.it){const at=(gx,gy)=>{const X=o.x+(it.x+gx)*cap,Y=o.y+gy*cap;return o.warp?o.warp(X,Y,(X-o.x)/W):[X,Y]};
    for(const s of it.g.s){const k=s.h?pen.hair:1,hx=cos*pen.nib*cap*k/2,hy=-sin*pen.nib*cap*k/2;g.lineWidth=pen.thin*cap;
      for(const run of points(s.p)){const q=run.map(p=>at(p[0],p[1]));
        for(let i=0;i<q.length-1;i++){const a=q[i],b=q[i+1];g.beginPath();g.moveTo(a[0]+hx,a[1]+hy);g.lineTo(b[0]+hx,b[1]+hy);g.lineTo(b[0]-hx,b[1]-hy);g.lineTo(a[0]-hx,a[1]-hy);g.closePath();g.fill();g.stroke()}}}
    const sf=pen.serif;if(sf)for(const[x,y,kind,hairline]of it.g.f){const k=hairline?pen.hair:1;
      /* hw: half a stem's width; oy: how far the pen's slanted end reaches past a stem's end; ht and ox: the same for an arm */
      const hw=(pen.nib*k*cos+pen.thin)/2,oy=(pen.nib*k*sin+pen.thin)/2,ht=(pen.nib*pen.hair*sin+pen.thin)/2,ox=(pen.nib*pen.hair*cos+pen.thin)/2,sw=hw+sf.sw*(hairline?.8:1);let P;
      if(kind[0]==='b'||kind[0]==='t'){const s=kind[0]==='b'?1:-1,l=kind[1]!=='r'?sw:hw,r=kind[1]!=='l'?sw:hw,e=y+s*oy;
        P=[[x-l,e],[x-l,e-s*sf.bt],[x-hw,e-s*(sf.sh+sf.bt)],[x+hw,e-s*(sf.sh+sf.bt)],[x+r,e-s*sf.bt],[x+r,e]]}
      else{const m=kind.endsWith('-')?-1:1,up=kind.includes('u')?.16:ht,dn=kind.includes('d')?.16:ht,e=x+m*ox,back=sf.sh+sf.bt+.03;
        P=[[e,y-up],[e,y+dn],[e-m*sf.bt,y+dn],[e-m*back,y+ht],[e-m*back,y-ht],[e-m*sf.bt,y-up]]}
      g.beginPath();P.forEach((p,i)=>{const q=at(p[0],p[1]);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();g.fill()}}}
const width=(text,o)=>lay(text,o.track,o.space).w*o.cap;
/* masks: one byte for each pixel, set where the shape is */
const blank=(w,h)=>Object.assign(new Uint8Array(w*h),{w,h});
function mask(w,h,fn){const[c,g]=mk(w,h);g.fillStyle=g.strokeStyle='#fff';fn(g);const d=g.getImageData(0,0,w,h).data,m=blank(w,h);for(let i=0;i<m.length;i++)m[i]=d[i*4+3]>127?1:0;return m}
const each=(m,fn)=>{const r=blank(m.w,m.h);for(let y=0,i=0;y<m.h;y++)for(let x=0;x<m.w;x++,i++)r[i]=fn(i,x,y)?1:0;return r};
const at=(m,x,y)=>x>=0&&y>=0&&x<m.w&&y<m.h&&m[y*m.w+x];
const shift=(m,dx,dy)=>each(m,(i,x,y)=>at(m,x-dx,y-dy)),join=(a,b)=>each(a,i=>a[i]|b[i]),less=(a,b)=>each(a,i=>a[i]&&!b[i]);
const grow=m=>each(m,(i,x,y)=>{for(let b=-1;b<=1;b++)for(let a=-1;a<=1;a++)if(at(m,x+a,y+b))return 1});
/* band: one of a list of colours for t from 0 to 1, with a dithered seam where one gives way to the next */
const band=(cols,t,x,y)=>{const n=cols.length,v=clamp(t,0,.9999)*n,i=Math.floor(v),f=v-i;return cols[Math.min(n-1,f>.55&&(f-.55)/.45>(BAYER[(y&3)*4+(x&3)]+.5)/16?i+1:i)]};
const GOLD=['#fff7c6','#ffe98c','#f8d35c','#e9b944','#d79a34','#c07a26','#e2b24c'].map(hex),SIDE=['#8a3414','#6e2410','#54180c'].map(hex);
const EDGE=hex('#1c0b06'),LIT=hex('#fffbe2'),LOW=hex('#8f5216'),PALE=hex('#fff3b8'),DEEP=hex('#e2b24c'),RISE=.22,DEPTH=5,KEPT={};
function paint(name,sub){const key=name+'|'+sub;if(KEPT[key])return KEPT[key];
  /* the name: as tall as the room allows, standing on a level line, each letter stretched to the arch above it */
  const o1={pen:NAME,track:.13,space:.44},cap=Math.min(37,Math.floor(540/width(name,{cap:1,...o1}))),tw=Math.ceil(width(name,{cap,...o1}));
  /* the canvas is a whole number of room pixels each way, and a multiple of four across, so that it sits on whole screen pixels */
  const W=Math.ceil((tw+(DEPTH+9)*2)/4)*4,pad=(W-tw)>>1,up=/[ÄÖÜ]/.test(name)?Math.round(cap*.34):0,base=3+up+Math.round(cap*(1+RISE)),o2={pen:SUB,track:.26,space:.8,cap:11},sw=Math.ceil(width(sub,o2)),sy=base+DEPTH+8,H=Math.ceil((sy+o2.cap+6)/2)*2;
  const arch=u=>1+RISE*Math.cos(Math.PI*(clamp(u,0,1)-.5));
  const face=mask(W,H,g=>write(g,name,{x:pad,y:base-cap,cap,...o1,warp:(x,y,u)=>[x,base-(base-y)*arch(u)]}));
  /* the subtitle, and a rule on each side of it that thins away from it and stops short of it */
  const sx=Math.round((W-sw)/2),my=sy+Math.floor(o2.cap/2),len=Math.min(70,sx-12-DEPTH);
  const small=mask(W,H,g=>{write(g,sub,{x:sx,y:sy,...o2});
    if(len>=16)for(const s of[-1,1]){const x0=s<0?sx-10:sx+sw+10,bar=(dy,part)=>{const l=Math.round(len*part);g.fillRect(s<0?x0-l:x0,my+dy,l,1)};bar(-1,.36);bar(0,1);bar(1,.6)}});
  /* the raised side runs down and to the left, away from the light */
  let side=shift(face,-1,1);for(let i=2;i<=DEPTH;i++)side=join(side,shift(face,-i,i));
  const solid=join(face,side),dark=join(grow(solid),grow(small)),shadow=shift(dark,-2,3);
  const hi=less(face,shift(face,-1,1)),lo=less(face,shift(face,1,-1));
  const[c,g]=mk(W,H),im=g.createImageData(W,H),d=im.data,put=(i,q,a)=>{const j=i*4;d[j]=q[0];d[j+1]=q[1];d[j+2]=q[2];d[j+3]=a||255};
  for(let y=0,i=0;y<H;y++)for(let x=0;x<W;x++,i++){
    if(face[i]){const h=cap*arch((x-pad)/tw);put(i,hi[i]?LIT:lo[i]?LOW:band(GOLD,(y-(base-h))/h*.96+.02,x,y))}
    else if(side[i])put(i,band(SIDE,(y-3)/(base+DEPTH),x,y));
    else if(small[i])put(i,y<my?PALE:DEEP);
    else if(dark[i])put(i,EDGE);
    else if(shadow[i])put(i,[4,3,10],128)}
  g.putImageData(im,0,0);c.className='logo';return KEPT[key]=c}
return{paint,can}})();
