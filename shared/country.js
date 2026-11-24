/* Paul of Tarsus: the open country, shared by every chapter that walks through it (issue #82, group D): rock faces, boulders and stony
   ground, turf, the fields of a plain, reeds, and trees, painted to the standard of Chapter Fifteen and of the close views of Chapter
   Thirteen. Loaded on demand via CHAP[n].needs (see need() in index.html) and registered in shared/pwa.js for offline play.
   Every painter takes a seed of its own and draws nothing from the room's rng(), so that a room that calls it keeps everything else where
   it was. The sun stands to the left unless o.light says 1 (to the right). Nothing here makes a cross: a stone, a leaf or a flower under
   about a pixel across is a small square, never a round dab; blades of grass all lean one way; a crack in a rock face stops short of the
   bed below it; an edge between two planes of rock is drawn as a line only where it runs more across than down; field plots in
   neighbouring rows never share a corner.

     crag(g, p, c, seed, o)              a face of bare rock inside the outline p (x,y pairs): soft buttresses turned to the sun and gullies
                                         turned from it, then angular slabs that the rock has broken into, lit or in shade, and beds that
                                         dip (o.dip, spaced about o.bed) and pinch out, each with its lit lip and the shade under its
                                         ledge; cracks, pits, lichen, and here and there a bush or a tuft on a ledge (o.scrub: how many).
                                         o.shade: 'l' or 'r', a side in the shade of a gorge; o.haze: a color the face is drawn toward;
                                         o.gaps: fissures [x1,y1,x2,y2] that the room draws across it, which no line of the face crosses
     boulder(g, x, y, w, h, c, seed, o)  a weathered stone sitting on the ground, its foot at y: a lit top, a face to the sun, a shaded
                                         side, a crack or two and its shadow. o.cut: the outline only (for a room's props)
     ground(g, x, y0, w, y1, c, seed, o) stony ground between y0 (far) and y1 (near): dust, worn patches, and stones that grow toward us,
                                         each with its lit top and its shadow. o.n: how many stones; o.size; o.tufts: dry tufts
     turf(g, x, y0, w, y1, c, seed, o)   grass between y0 and y1: blades that lean with the wind (o.wind, default 1, to the right) and grow
                                         toward us, lit at the tips, darker in hollows; o.flowers: how many; o.dry: how much of it is straw
     plain(g, x0, x1, hz, y1, seed, o)   the plots of a plain from its horizon hz down to y1, seen in perspective toward o.vx: stubble,
                                         green grain, ploughed land, fallow and orchard, hazed toward the horizon, with field banks and the
                                         soft shadows of clouds. o.land: the general green; o.haze: the color of the distance
     range(g, x0, x1, base, f, st, o)    a far range under f(x) on the line base (as ridge() paints it), modelled softly: slopes turned to
                                         the sun a little lighter, those turned from it a little darker and cooler. o.k: how strongly
     reeds(g, x0, x1, y, h, seed, o)     reeds and rushes along a line y, each a long blade with a darker foot, some with a seed head
     tree(g, x, y, h, c, o)              a broad-leaved tree, its foot at x,y, h tall. o.kind: 'plane' (wide, pale patched bark), 'oak',
                                         'willow' (grey-green, its twigs hanging), 'poplar' (tall and narrow), 'olive' (silver, a twisted
                                         trunk), 'bush'. Its limbs fork below the crown, the crown is clumps of leaves, each dark beneath
                                         and lit toward the sun. o.seed; o.lean; o.cast: false leaves out the shadow it throws on the
                                         ground. A tree under 12 high is drawn as it is seen from afar */
SHARED.country=(()=>{
"use strict";
const A='#1e1a32',hash=(...v)=>Math.abs(Math.round(v.reduce((s,k,i)=>s+k*[131,71,17,29,53][i%5],7)))+1;
/* blob: the outline of an irregular, rounded mass, flatter underneath */
function blob(r,cx,cy,rx,ry,n,j,flat){const p=[];n=n||12;j=j==null?.24:j;const a0=r()*6.2832;
  for(let i=0;i<n;i++){const a=a0+i/n*6.2832,q=1-j/2+r()*j,s=Math.sin(a);p.push(cx+Math.cos(a)*rx*q,cy+s*ry*q*(s>0?(flat||.8):1))}return p}
/* dab: a small mark of paint; under a pixel across it is a square */
function dab(g,x,y,w,h,c){if(w<1.1&&h<1.1){R(g,x,y,Math.max(.5,w),Math.max(.5,w),c);return}R(g,x-w/2,y-h/2,w,h,c)}
const bbox=p=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}return[x0,y0,x1,y1]};

/* ---------- rock ---------- */
function crag(g,p,c,seed,o){o=o||{};const r=rng(seed),L=o.light==null?-1:o.light,[x0,y0,x1,y1]=bbox(p),W=x1-x0,H=y1-y0,sl=o.dip||0,
  hi=tint(c,.3),cool=mix(tint(c,-.3),'#5a5c8c',.32),ink='#1c1828',
  /* gaps: fissures the room cuts across the face ([x1,y1,x2,y2]); no line of the face is drawn within a few pixels of one, so that none crosses it */
  gap=(xa,ya,xb,yb)=>{for(const[a,b,c2,d]of o.gaps||[])for(let t=0;t<=1;t+=.1){const x=xa+(xb-xa)*t,y=ya+(yb-ya)*t,lo=Math.min(b,d)-2.5,hi2=Math.max(b,d)+2.5;
    if(y<lo||y>hi2)continue;const u=Math.max(0,Math.min(1,(y-b)/((d-b)||1))),fx=a+(c2-a)*u;if(Math.abs(x-fx)<4)return true}return false};
  clipTo(g,()=>poly(g,p),()=>{
    g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.1),c,tint(c,-.14)]);g.fillRect(x0,y0,W,H);
    tex(g,'mott',.4,x0,y0,W,H,'overlay',1);tex(g,'blotch',.25,x0,y0,W,H,'soft-light',.6);
    /* the planes the rock has broken into, the large ones first: each is an angular slab turned to the sun, square to us, or into the
       shade. Its edges that face the sun catch it and those that face down are dark, but only where an edge runs more across than down:
       an upright edge is a change of tone and no line, so that nothing runs down across a bed */
    const bedY=[];for(let j=y0+3+r()*6;j<y1;j+=(o.bed||8)*(.5+r()*1.6))bedY.push(j);
    const tones=[tint(c,.24),tint(c,.11),c,mix(tint(c,-.13),cool,.35),mix(tint(c,-.26),cool,.5)];
    /* first the great forms: soft buttresses turned to the sun and gullies turned away, with no edge drawn */
    let bx=x0-r()*30;while(bx<x1){const bw=26+r()*50,sk=(r()-.5)*.3,mid=bx+bw*(.35+r()*.3),P=[bx,y0,mid+sk*H*.5,y0,mid-sk*H*.5,y1,bx,y1],Q=[mid+sk*H*.5,y0,bx+bw,y0,bx+bw,y1,mid-sk*H*.5,y1];
      comp(g,'source-over',.2+r()*.12,()=>{poly(g,L<0?P:Q);g.fillStyle=lg(g,bx,0,bx+bw,0,L<0?[rgba(hi,0),rgba(hi,.8),rgba(hi,.2)]:[rgba(hi,.2),rgba(hi,.8),rgba(hi,0)]);g.fill()});
      comp(g,'source-over',.18+r()*.12,()=>{poly(g,L<0?Q:P);g.fillStyle=lg(g,bx,0,bx+bw,0,L<0?[rgba(cool,0),rgba(cool,.8),rgba(cool,.1)]:[rgba(cool,.1),rgba(cool,.8),rgba(cool,0)]);g.fill()});bx+=bw}
    const slab=(R0,a)=>{const cx=x0+r()*W,cy=y0+r()*H,n=5+Math.floor(r()*2),a0=r()*6.28,P=[];
      for(let i=0;i<n;i++){const t=a0+i/n*6.2832+(r()-.5)*.6,q=.6+r()*.4;P.push(cx+Math.cos(t)*R0*q,cy+Math.sin(t)*R0*q*(.32+r()*.2)+(Math.cos(t)*R0*q)*sl)}
      const nx=(r()-.5)*2,ny=-r()*1.2+.3,lum=nx*L*.6-ny*.8+(r()-.5)*.3,cc=tones[lum>.8?0:lum>.3?1:lum>-.2?2:lum>-.6?3:4];
      comp(g,'source-over',a,()=>{poly(g,P);g.fillStyle=lg(g,cx-R0,cy-R0*.5,cx+R0,cy+R0*.5,L<0?[tint(cc,.06),cc,tint(cc,-.06)]:[tint(cc,-.06),cc,tint(cc,.06)]);g.fill()});
      for(let i=0;i<P.length;i+=2){const xa=P[i],ya=P[i+1],xb=P[(i+2)%P.length],yb=P[(i+3)%P.length],dx=xb-xa,dy=yb-ya;if(Math.abs(dy)>Math.abs(dx)*.6)continue;
        const ox=dy,oy=-dx,face=(ox*L*.5-oy)/Math.hypot(ox,oy);/* outward normal of a clockwise outline */
        if(gap(xa,ya,xb,yb))continue;if(oy>0)stroke(g,[xa,ya,xb,yb],rgba(ink,.32*a),.5);else if(face>.2)stroke(g,[xa,ya,xb,yb],rgba(hi,.34*a),.5)}};
    for(let k=0;k<W*H/420;k++)slab(14+r()*20,.7);for(let k=0;k<W*H/110;k++)slab(5+r()*8,.68);
    tex(g,'mott',.38,x0,y0,W,H,'overlay',1);tex(g,'blotch',.22,x0,y0,W,H,'soft-light',.6);tex(g,'grain',.12,x0,y0,W,H,'overlay',.5);
    /* a few beds of the limestone, which pinch out and come back, each with its lit lip and the shade under its ledge */
    const beds=[];for(const j of bedY){const q=[];let x=x0-4+(r()<.6?r()*W*.5:0);const end=x1+8-(r()<.6?r()*W*.5:0);
      for(;x<=end;x+=5+r()*8)q.push(x,j+(x-x0)*sl+(r()-.5)*2);if(q.length>=4)beds.push(q)}
    for(const q of beds){const th=1.5+r()*2.6;for(let i=0;i<q.length-2;i+=2){const s=[q[i],q[i+1],q[i+2],q[i+3]],fade=Math.min(1,i/6,(q.length-4-i)/6+.15);if(gap(s[0],s[1],s[2],s[3]))continue;
      poly(g,[s[0],s[1],s[2],s[3],s[2],s[3]+th,s[0],s[1]+th],rgba(ink,.2*fade));stroke(g,s,rgba(ink,.36*fade),.6);stroke(g,s.map((v,k)=>k%2?v-.6:v),rgba(hi,.3*fade),.5)}}
    /* cracks that wander down a little way, pits, and lichen */
    const bedAt=(q,x)=>{if(x<q[0]||x>q[q.length-2])return null;let i=0;while(i<q.length-4&&q[i+2]<x)i+=2;return q[i+1]+(q[i+3]-q[i+1])*(x-q[i])/((q[i+2]-q[i])||1)},
      under=(x,y)=>{let nb=1e9;for(const q of beds){const v=bedAt(q,x);if(v!=null&&v>y&&v<nb)nb=v}return nb};
    for(let k=0;k<W*H/320;k++){let x=x0+r()*W,y=y0+r()*H;const q=[x,y],nb=under(x,y)-1.4;for(let s=0;s<2+r()*3;s++){x+=(r()-.5)*2.6;y+=1+r()*2.2;if(y>nb)break;q.push(x,y)}if(q.length<4||gap(q[0],q[1],q[q.length-2],q[q.length-1]))continue;
      stroke(g,q,rgba(ink,.3),.5);stroke(g,q.map((v,i)=>i%2?v:v-L*.5),rgba(hi,.16),.5)}
    for(let k=0;k<W*H/110;k++){const x=x0+r()*W,y=y0+r()*H,s=.5+r()*.7;R(g,x,y,s,.5,rgba('#140f1e',.3));R(g,x,y+.5,s,.5,rgba(hi,.2))}
    for(let k=0;k<W*H/180;k++){const x=x0+r()*W,y=y0+r()*H,w=.8+r()*2.2,k2=r();R(g,x,y,w,.5+r()*.5,rgba(k2<.4?'#c8b878':k2<.75?'#8c9670':'#e0dccc',.25+r()*.18))}
    if(o.haze)comp(g,'source-over',o.hazeA==null?.3:o.hazeA,()=>{g.fillStyle=o.haze;g.fillRect(x0,y0,W,H)});
    if(o.shade)ao(g,x0,y0,W,H,o.shade,.3,'#2a2848');
    /* a bush or a tuft rooted on a ledge */
    for(let k=0;k<(o.scrub||0);k++){const q=beds[Math.floor(r()*beds.length)];if(!q)continue;const i=2*Math.floor(r()*(q.length/2-1)),x=q[i]+r()*(q[i+2]-q[i]),y=q[i+1]+(q[i+3]-q[i+1])*((x-q[i])/(q[i+2]-q[i]||1));
      if(y<y0+4||y>y1-2)continue;const s=1.6+r()*2.4;if(r()<.55)bush(g,x,y,s*1.7,s,o.green||'#5f7444',hash(x,y,s));else hang(g,x,y,s*2,o.green||'#6f7c4a',hash(x,y))}});
}
/* hang: grass that roots on a ledge and falls over its edge, every blade the same way */
function hang(g,x,y,w,c,seed){const r=rng(seed),d=r()<.5?-1:1;for(let i=0;i<w*1.8;i++){const sx=x+(r()-.5)*w,h=1.4+r()*2.6;stroke(g,[sx,y-.8,sx+d*h*.35,y+.2,sx+d*h*.5,y+h*.6],r()<.5?c:tint(c,.18),.5)}}
/* bush: a low clump of leaves, dark beneath, lit on top toward the sun */
function bush(g,x,y,w,h,c,seed,o){o=o||{};const r=rng(seed),L=o.light==null?-1:o.light;
  if(o.cast!==false)oval(g,x-L*w*.2,y+.2,w*.62,Math.max(1,h*.16),rgba(A,.28));
  crown(g,[{x,y:y-h*.45,a:w*.5,b:h*.55},{x:x-w*.22,y:y-h*.32,a:w*.3,b:h*.36},{x:x+w*.24,y:y-h*.3,a:w*.28,b:h*.34}],c,r,L,{x,y:y-h*.45,a:w*.5,b:h*.55})}

function boulder(g,x,y,w,h,c,seed,o){o=o||{};const r=rng(seed),L=o.light==null?-1:o.light,
  p=[x-w/2,y,x-w*(.44+r()*.06),y-h*(.5+r()*.15),x-w*(.2+r()*.1),y-h,x+w*(.12+r()*.12),y-h*(.94+r()*.06),x+w*(.4+r()*.06),y-h*(.55+r()*.1),x+w/2,y-h*.1,x+w*.44,y];
  if(o.cut){poly(g,p,'#000');return}
  oval(g,x-L*w*.12,y+.1,w*.62,Math.max(1,h*.16),rgba(A,.3));oval(g,x-L*w*.06,y,w*.52,Math.max(.8,h*.1),rgba(A,.35));
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{const tx=x+w*(r()-.5)*.2;
    /* the top, the face to the sun, and the side in shade, with soft edges between them */
    poly(g,[x-w*.48,y-h*.55,x-w*.2,y-h,x+w*.2,y-h*.96,tx+w*.06,y-h*.55],tint(c,.2));
    poly(g,L<0?[x-w*.2,y-h,x+w*.2,y-h,x+w*.4,y-h*.55,tx+w*.06,y-h*.55]:[x-w*.5,y-h*.55,x-w*.2,y-h,x+w*.2,y-h,tx+w*.06,y-h*.55],rgba(tint(c,.34),.6));
    poly(g,L<0?[tx+w*.06,y-h*.55,x+w*.44,y-h*.6,x+w*.6,y,tx+w*.1,y]:[tx+w*.06,y-h*.55,x-w*.44,y-h*.6,x-w*.6,y,tx-w*.1,y],rgba(mix(tint(c,-.34),'#5a5a88',.3),.8));
    tex(g,'mott',.4,x-w/2,y-h,w,h,'overlay',1);tex(g,'grain',.14,x-w/2,y-h,w,h,'overlay',.5);
    for(let k=0;k<w*h/12;k++){const px=x+(r()-.5)*w,py=y-r()*h;R(g,px,py,.5+r()*.6,.5,rgba(r()<.5?'#e8e2d0':'#1c1828',.2))}
    if(w>8)for(let k=0;k<1+(w>16);k++){let qx=x+(r()-.5)*w*.5,qy=y-h*(.7+r()*.2);const q=[qx,qy];for(let s=0;s<3;s++){qx+=(r()-.5)*2.6;qy+=1+r()*h*.16;q.push(qx,qy)}stroke(g,q,rgba('#1c1828',.38),.5);stroke(g,q.map((v,i)=>i%2?v:v-L*.5),rgba('#fff6e0',.16),.5)}
    if(o.moss)for(let k=0;k<w;k++)R(g,x-w*.4+r()*w*.6,y-h*(.6+r()*.4),.5+r()*1.4,.5,rgba(o.moss,.5));
    ao(g,x-w/2,y-h*.3,w,h*.3,'b',.32,A)})}

function ground(g,x,y0,w,y1,c,seed,o){o=o||{};const r=rng(seed),H=y1-y0,L=o.light==null?-1:o.light;
  g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.06)]);g.fillRect(x,y0,w,H);
  tex(g,'mott',.42,x,y0,w,H,'overlay',1);tex(g,'blotch',.2,x,y0,w,H,'soft-light',1);tex(g,'grain',.18,x,y0,w,H,'overlay',.5);
  /* worn patches of dust and darker damp, long and low as ground seen at a slant */
  for(let k=0;k<w*H/700;k++){const k2=r(),px=x+r()*w,py=y0+k2*H,rx=8+k2*26;pool(g,px,py,rx,rx*.16,r()<.55?tint(c,.3):mix(tint(c,-.3),'#5a5478',.2),.22,'source-over')}
  /* grit: specks that grow toward us */
  for(let k=0;k<w*H/6;k++){const k2=Math.pow(r(),.8),px=x+r()*w,py=y0+k2*H;R(g,px,py,.5,.5,rgba(r()<.5?'#f4ecd8':'#2a2232',.12+k2*.12))}
  /* stones, far ones first */
  const st=[];for(let k=0;k<(o.n==null?w*.35:o.n);k++){const k2=Math.pow(r(),.75);st.push([x+r()*w,y0+1+k2*(H-2),k2,r(),r(),r()])}
  st.sort((a,b)=>a[1]-b[1]);
  for(const[sx,sy,k2,a,b,d]of st){const s=(.5+k2*2.2)*(o.size||1)*(.6+a*.8),cc=tint(c,(b-.5)*.36-.04);
    if(s<1.1){R(g,sx,sy,.5,.5,tint(cc,.2));R(g,sx,sy+.5,.5,.5,rgba(A,.25));continue}
    const hh=s*(.45+d*.25),q=[sx-s,sy,sx-s*.8,sy-hh*.7,sx-s*.2,sy-hh,sx+s*.6,sy-hh*.8,sx+s,sy-hh*.2,sx+s*.8,sy];
    poly(g,[sx-s*.8-L*s*.3,sy+.2,sx+s-L*s*.5,sy+.2,sx+s*1.1-L*s*.6,sy+hh*.35,sx-s*.6-L*s*.4,sy+hh*.4],rgba(A,.28));
    poly(g,q,cc);poly(g,[sx-s*.8,sy-hh*.7,sx-s*.2,sy-hh,sx+s*.6,sy-hh*.8,sx+s*.1,sy-hh*.45],tint(cc,.24));
    poly(g,L<0?[sx+s*.6,sy-hh*.8,sx+s,sy-hh*.2,sx+s*.8,sy,sx+s*.2,sy]:[sx-s*.2,sy-hh,sx-s,sy,sx-s*.6,sy,sx-s*.8,sy-hh*.7],rgba(mix(tint(cc,-.35),'#5a5a88',.3),.7))}
  if(o.tufts)for(let k=0;k<o.tufts;k++){const k2=Math.pow(r(),.7),px=x+r()*w,py=y0+2+k2*(H-2);tuft(g,px,py,1.2+k2*2.6,o.tuftC||'#a89a62',r)}}
/* tuft: a little clump of dry grass, its blades leaning one way */
function tuft(g,x,y,h,c,r){const n=3+Math.floor(r()*4),lean=.3+r()*.4;pool(g,x+h*.3,y+.3,n*.6+1,.7,'#2a2232',.3,'source-over');
  for(let i=0;i<n;i++){const lx=x+(i-n/2)*.55,hh=h*(.55+r()*.5);stroke(g,[lx,y,lx+lean*hh*.5,y-hh],r()<.5?c:tint(c,r()<.5?.18:-.22),.5)}}

/* ---------- grass and fields ---------- */
function turf(g,x,y0,w,y1,c,seed,o){o=o||{};const r=rng(seed),H=y1-y0,wind=o.wind==null?1:o.wind,dry=o.dry||0,dk=mix(tint(c,-.34),'#3a4a5a',.2);
  g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.08),c,tint(c,-.12)]);g.fillRect(x,y0,w,H);
  tex(g,'mott',.45,x,y0,w,H,'overlay',1);tex(g,'blotch',.3,x,y0,w,H,'soft-light',1);
  /* the lie of the ground: swells catching the light and hollows in shade, long and low */
  for(let k=0;k<w*H/500;k++){const k2=r(),px=x+r()*w,py=y0+k2*H,rx=10+k2*30;pool(g,px,py,rx,rx*.18,r()<.5?tint(c,.32):dk,.22,'source-over')}
  if(dry)for(let k=0;k<w*H/600*dry;k++){const px=x+r()*w,py=y0+r()*H,rx=6+r()*20;pool(g,px,py,rx,rx*.2,'#c8b878',.3,'source-over')}
  /* blades: far ones are a stipple, near ones are strokes that lean with the wind */
  const n=w*H*(o.dense||1.1);for(let k=0;k<n;k++){const k2=Math.pow(r(),.6),px=x+r()*w,py=y0+k2*H,h=.6+k2*3.4*(.6+r()*.7),t=r(),
      cc=r()<dry*.6?(t<.5?'#c8b47a':'#a89660'):t<.22?dk:t<.55?tint(c,-.12):t<.85?tint(c,.1):tint(c,.28);
    if(h<1.2){R(g,px,py,.5,.5,cc);continue}const lean=wind*(.15+r()*.2)*h;stroke(g,[px,py,px+lean,py-h],cc,.5);if(t>.7)R(g,px+lean,py-h,.5,.5,tint(c,.4))}
  for(let k=0;k<(o.flowers||0);k++){const k2=Math.pow(r(),.6),px=x+r()*w,py=y0+k2*H,C=o.fc||['#d84a3a','#e8c84a','#f0ece0','#b86ab0','#e8c84a'],cc=C[Math.floor(r()*C.length)];
    R(g,px,py,k2>.6?1:.5,.5,cc);if(k2>.6)R(g,px,py+.5,1,.5,tint(cc,-.35))}}
function reeds(g,x0,x1,y,h,seed,o){o=o||{};const r=rng(seed),n=o.n||(x1-x0)*.8,c=o.c||'#6a8448',wind=o.wind==null?1:o.wind;
  for(let k=0;k<n;k++){const x=x0+r()*(x1-x0),yy=y+(r()-.5)*(o.dy||2),hh=h*(.5+r()*.6),l=wind*(.08+r()*.14)*hh,t=r(),cc=t<.3?tint(c,-.3):t<.7?c:tint(c,.2);
    stroke(g,[x,yy,x+l*.4,yy-hh*.55,x+l,yy-hh],cc,.5);if(r()<.3)stroke(g,[x,yy,x-l*.6,yy-hh*.4],tint(c,-.15),.5);
    if(o.heads&&r()<.18)R(g,x+l-.25,yy-hh-1.6,.8,2,o.headC||'#7a5a3a')}}
/* plain: rows of plots, each thinner than the one nearer us, divided along lines that run to the vanishing point. A row's divisions are
   set afresh, so that no corner of one row meets a corner of the next */
const KINDS={stubble:'#d6c07c',grain:'#9cb064',green:'#86a458',plough:'#a8845e',fallow:'#aeac7c',meadow:'#94ac66',orchard:'#8aa060'};
function plain(g,x0,x1,hz,y1,seed,o){o=o||{};const r=rng(seed),vx=o.vx==null?(x0+x1)/2:o.vx,H=y1-hz,land=o.land||'#9cae6c',haze=o.haze||'#c8d2d4',
  kinds=o.kinds||['stubble','grain','green','plough','fallow','meadow','green','stubble','orchard'];
  g.fillStyle=lg(g,0,hz,0,y1,[mix(land,haze,.5),land,tint(land,-.06)]);g.fillRect(x0,hz,x1-x0,H);
  let s=1;const rows=[];while(H*s>.7){const s2=s*(.62+r()*.14);rows.push([s2,s]);s=s2}
  for(const[sa,sb]of rows){const ya=hz+H*sa,yb=hz+H*sb,ua=(x0-vx)/sa-40,ub=(x1-vx)/sa+40;let u=ua-r()*60;
    while(u<ub){const pw=36+r()*90,k=kinds[Math.floor(r()*kinds.length)],c=tint(o.tone&&o.tone[k]||KINDS[k],(r()-.5)*.12),fog=Math.min(.8,(1-sb)*.9),cc=mix(c,haze,fog*.6);
      const P=[vx+u*sa,ya,vx+(u+pw)*sa,ya,vx+(u+pw)*sb,yb,vx+u*sb,yb];poly(g,P,cc);
      clipTo(g,()=>poly(g,P),()=>{
        /* rows of the crop, furrows or trees, running toward the vanishing point; only where they are wide enough to be seen */
        const step=k==='orchard'?(sb>.22?9:0):k==='plough'?3.2:k==='stubble'?4:0;
        if(step&&sb>.45&&yb-ya>5)for(let v=u+step*.5;v<u+pw;v+=step){if(k==='orchard'){for(let t=0;t<3;t++){const f=sa+(sb-sa)*(t+.5)/3,px=vx+v*f,py=hz+H*f,q=f*5;if(q<1.1)continue;{R(g,px-q*.2,py-.2,q*1.3,.5,rgba(A,.25));poly(g,blob(r,px,py-q*.6,q,q*.6,7),tint(cc,-.28));R(g,px-q*.5,py-q,q*.6,.5,tint(cc,.12))}}}
          else poly(g,[vx+v*sa,ya,vx+(v+step*.35)*sa,ya,vx+(v+step*.35)*sb,yb,vx+v*sb,yb],k==='plough'?rgba('#5a3a28',.12):rgba('#8a7440',.09))}
        if(k==='green'||k==='grain'||k==='meadow'||k==='fallow')for(let i=0;i<(yb-ya)*(P[2]-P[0])/3;i++){const px=P[6]+r()*(P[4]-P[6]),py=ya+r()*(yb-ya);R(g,px,py,.5+r()*1.4*sb,.5,rgba(r()<.5?tint(cc,.2):tint(cc,-.2),.6))}
        ao(g,Math.min(P[0],P[6]),ya,Math.max(P[2],P[4])-Math.min(P[0],P[6]),(yb-ya)*.5,'t',.08,A)});
      u+=pw}
    /* the bank or the hedge at the far edge of the row: a darker line with the light along its top, and here and there a bush */
    if(sb>.06&&r()<.75){const t=Math.max(.5,sb*1.6);R(g,x0,ya,x1-x0,t,rgba(mix(land,'#4a5a3a',.5),.35*(1-(1-sb)*.6)));R(g,x0,ya-.5,x1-x0,.5,rgba('#f4f0dc',.18));
      for(let i=0;i<(x1-x0)*sb*.05;i++){const px=x0+r()*(x1-x0),q=Math.max(.5,sb*4*(.6+r()*.6));if(q<1.1)R(g,px,ya-.5,.5,.5,rgba('#3e5234',.6));else poly(g,blob(r,px,ya-q*.4,q*1.2,q*.6,7),mix('#4e6a3e',haze,(1-sb)*.5))}}}
  tex(g,'mott',.4,x0,hz,x1-x0,H,'overlay',1);
  /* the shadows of the clouds lie on the plain */
  for(let k=0;k<(o.clouds==null?3:o.clouds);k++){const px=x0+r()*(x1-x0),py=hz+H*(.25+r()*.6),rx=20+r()*50;pool(g,px,py,rx,rx*.12,'#4a5470',.16,'source-over')}
  /* and the distance hazes over */
  g.fillStyle=lg(g,0,hz,0,hz+H*.6,[rgba(haze,.5),rgba(haze,.14),rgba(haze,0)]);g.fillRect(x0,hz,x1-x0,H*.6)}

function range(g,x0,x1,base,f,st,o){o=o||{};const L=o.light==null?-1:o.light,k=o.k==null?.5:o.k;ridge(g,x0,x1,base,f,st);
  clipTo(g,()=>{g.beginPath();g.moveTo(x0,base);for(let x=x0;x<=x1;x+=.5)g.lineTo(x,base-f(x));g.lineTo(x1,base);g.closePath()},()=>{
    for(let x=x0;x<x1;x+=.5){const s=(f(x+1)-f(x-1))/2*(-L),top=base-f(x),d=Math.min(base-top,5+Math.abs(s)*24);if(Math.abs(s)<.03)continue;const c=s>0?'#fff6e4':'#3a3c68',a=Math.min(.45,Math.abs(s)*1.2)*k;
      g.fillStyle=lg(g,0,top,0,top+d,[rgba(c,a),rgba(c,0)]);g.fillRect(x,top,.5,d)}
    tex(g,'mott',.22,x0,0,x1-x0,base,'overlay',1)})}

/* ---------- trees ---------- */
/* crown: the clumps of a crown in a cool dark mass, each clump lit toward the sun and the crown as a whole lit on its upper sun side, the
   leaves dabbed on so that the rim is ragged; e: the crown's whole extent {x, y, a, b} */
function crown(g,cl,c,r,L,e){const dk=mix(tint(c,-.5),'#28304e',.3),d1=mix(tint(c,-.26),'#3a4860',.12),l1=mix(tint(c,.18),'#e8e0a0',.14),l2=mix(tint(c,.38),'#f0e8b4',.26);
  cl.sort((a,b)=>a.y-b.y);
  for(const k of cl){k.p=blob(r,k.x,k.y,k.a,k.b,14,.34);poly(g,k.p,dk)}
  for(const k of cl){const{x,y,a,b}=k;poly(g,k.p,dk);poly(g,blob(r,x+L*a*.12,y-b*.2,a*.8,b*.66,12,.36),d1);
    const n=a*b*(a>4?2.6:1.6);for(let i=0;i<n;i++){const t=r()*6.2832,d=Math.sqrt(r())*1.06,nx=Math.cos(t)*d,ny=Math.sin(t)*d,px=x+nx*a,py=y+ny*b*(ny>0?.8:1);
      if(d>.95&&ny>.15)continue;const gx=(px-e.x)/e.a,gy=(py-e.y)/e.b,l=nx*L*.5-ny*.95+gx*L*.2-gy*.3+(r()-.5)*.36,
        cc=l>.85?l2:l>.35?l1:l>-.1?c:l>-.55?d1:dk;dab(g,px,py,.6+r()*Math.min(1.3,a*.11),.5+r()*.5,cc)}}}
const KIND={plane:{w:.92,h:.62,t:.42,tw:.07,bark:'#6a6450',barkL:'#b4ae92',n:10,leaf:'#617f48'},oak:{w:.82,h:.6,t:.4,tw:.075,bark:'#4a3e32',barkL:'#7a6a54',n:9,leaf:'#56703e'},
  willow:{w:.86,h:.66,t:.36,tw:.08,bark:'#5a4e40',barkL:'#8a7c64',n:9,leaf:'#7f9466',droop:1},poplar:{w:.3,h:.86,t:.12,tw:.05,bark:'#6a6252',barkL:'#b0a88e',n:9,leaf:'#5d7845',tall:1},
  olive:{w:.95,h:.5,t:.36,tw:.1,bark:'#5e5246',barkL:'#8a7a66',n:11,leaf:'#7d876a',gnarl:1}};
function tree(g,x,y,h,c,o){o=o||{};if(o.kind==='bush')return bush(g,x,y,h*1.5,h,c||'#5f7c4c',o.seed!=null?o.seed:hash(x,y,h),o);
  const K=KIND[o.kind||'plane'],r=rng(o.seed!=null?o.seed:hash(x,y,h)),L=o.light==null?-1:o.light;c=c||K.leaf;
  if(h<12)return far(g,x,y,h,c,r,L,K);
  const cw=h*K.w,chh=h*K.h,lean=o.lean!=null?o.lean*h*.15:(r()-.5)*h*.12,tx=x+lean,ty=y-h*K.t-chh*.1,ccy=y-h+chh*.5,tw=Math.max(1.4,h*K.tw),E={x:tx,y:ccy,a:cw/2,b:chh/2};
  /* its shadow on the ground, thrown away from the sun, and the dark where it stands */
  if(o.cast!==false){oval(g,x-L*h*.22,y+.6,cw*.5,Math.max(1.5,h*.05),rgba(A,.2));oval(g,x-L*h*.1,y+.3,cw*.3,Math.max(1,h*.03),rgba(A,.18))}
  oval(g,x-L*tw*.4,y+.2,tw*1.6,Math.max(.8,tw*.35),rgba(A,.45));
  /* the clumps of the crown, in an uneven dome (a column for a poplar) */
  const cl=[];if(K.tall){for(let i=0;i<K.n;i++){const t=i/(K.n-1);cl.push({x:x+lean*(1-t*.5)+(r()-.5)*cw*.24,y:y-h*.22-t*h*.7,a:cw*(.3+.2*Math.sin(t*3.1)+r()*.08),b:h*.1+r()*h*.03})}}
  else{const m=K.n-3,t0=r()*6.28;for(let i=0;i<K.n;i++){const t=i<3?r()*6.2832:t0+(i-3)/m*6.2832+(r()-.5)*.5,d=i<3?r()*.3:.62+r()*.3,px=tx+Math.cos(t)*E.a*d*.78,py=ccy+Math.sin(t)*E.b*d*.62-(i<3?E.b*.2:0)+(Math.sin(t)>.3?E.b*.08:0),a=cw*(i<3?.2+r()*.08:.12+r()*.14);if(i>=3&&Math.sin(t)>.6)continue;cl.push({x:px,y:py,a,b:a*(.6+r()*.16)})}}
  /* the trunk, and the limbs that climb from it into the crown: bark dark on the shaded side, pale where the sun is on it */
  const at=t=>[x+(tx-x)*t+Math.sin(t*3.1)*(K.gnarl?tw*.8:tw*.25),y-(y-ty)*t];
  const P=[],Q=[],seg=10,fl=tw*(K.gnarl?1.4:.9);for(let i=0;i<=seg;i++){const t=i/seg,[bx,by]=at(t),ww=tw*(1-t*.35)+fl*Math.pow(1-t,6)+(K.gnarl?Math.sin(t*9+r())*tw*.18:0);P.push(bx-ww/2,by);Q.unshift(bx+ww/2,by)}
  if(!K.tall){const lw0=Math.max(.8,tw*.55);let side=r()<.5?-1:1;for(let i=0;i<3;i++){const t=.5+i*.14,[sx,sy]=at(t),ex=tx+side*E.a*(.4+r()*.25),ey=ccy+E.b*(-.1+r()*.25),mx=sx+(ex-sx)*.35,my=ey+(sy-ey)*.25;
    stroke(g,[sx,sy,mx,my,ex,ey],K.bark,lw0*(1-i*.15));stroke(g,[sx+L*lw0*.3,sy,mx+L*lw0*.3,my,ex+L*lw0*.3,ey],K.barkL,lw0*.3);side=-side}}
  poly(g,P.concat(Q),K.bark);
  clipTo(g,()=>poly(g,P.concat(Q)),()=>{const bw=tw*1.6;g.fillStyle=lg(g,x-bw+lean*.3,0,x+bw+lean*.3,0,L<0?[K.barkL,tint(K.barkL,-.1),K.bark,tint(K.bark,-.3)]:[tint(K.bark,-.3),K.bark,tint(K.barkL,-.1),K.barkL]);g.fillRect(x-bw*2+Math.min(0,lean),ty,bw*4+Math.abs(lean),y-ty+1);
    if(o.kind==='plane'||!o.kind)for(let i=0;i<h*.7;i++){const py=ty+r()*(y-ty),px=x+(tx-x)*(1-(py-ty)/(y-ty))+(r()-.5)*tw,w=.8+r()*1.8;poly(g,blob(r,px,py,w,w*.7,6,.5),rgba(r()<.45?'#d6d0b4':r()<.6?'#8a8a6a':'#5e604a',.4))}
    else for(let i=0;i<h*.5;i++){const py=ty+r()*(y-ty),px=x+(tx-x)*(1-(py-ty)/(y-ty))+(r()-.5)*tw;R(g,px,py,.5,1+r()*2.4,rgba('#1a1410',.35))}
    ao(g,x-tw*3,ty,tw*6+Math.abs(lean),(y-ty)*.35,'t',.45,A);ao(g,x-tw*3,y-tw*1.4,tw*6,tw*1.4,'b',.3,A);comp(g,'multiply',.5,()=>{g.fillStyle=lg(g,x-tw,0,x+tw,0,L<0?['rgba(255,255,255,0)','rgba(255,255,255,0)','#8a88a8']:['#8a88a8','rgba(255,255,255,0)','rgba(255,255,255,0)']);g.fillRect(x-tw*2+Math.min(0,lean),ty,tw*4+Math.abs(lean),y-ty+1)})});
  crown(g,cl,c,r,L,E);
  /* the twigs of a willow, hanging from the underside of its crown, all the same way */
  if(K.droop)for(const k of cl){if(k.y<ccy-chh*.3)continue;for(let i=0;i<k.a*2;i++){const px=k.x+(r()-.5)*k.a*1.7,py=k.y+k.b*(.1+r()*.5),l=2.5+r()*h*.16;stroke(g,[px,py,px+.2,py+l*.6,px+.6,py+l],r()<.5?tint(c,.12):tint(c,-.2),.5)}}}
/* far: a tree too far off to show its trunk and limbs: a mass of leaf, lit to the sun, on a short stem */
function far(g,x,y,h,c,r,L,K){const w=h*K.w*.5;if(h>4)R(g,x-.25,y-h*.3,.5+(h>7?.5:0),h*.3,'#4a3e32');R(g,x-w*.9-L*h*.2,y,w*1.6,.5,rgba(A,.22));
  if(h<=3){R(g,x-.5,y-h,1,h*.7,tint(c,-.2));R(g,x-.5,y-h,.5,.5,tint(c,.15));return}
  const cl=K.tall?[{x,y:y-h*.55,a:w*.8,b:h*.42}]:[{x,y:y-h*.62,a:w,b:h*.36},{x:x-w*.4,y:y-h*.48,a:w*.6,b:h*.24},{x:x+w*.42,y:y-h*.5,a:w*.6,b:h*.24}];crown(g,cl,c,r,L,{x,y:y-h*.55,a:w*1.2,b:h*.45})}
return{crag,boulder,ground,tuft,turf,plain,range,reeds,tree,bush,hang}})();
