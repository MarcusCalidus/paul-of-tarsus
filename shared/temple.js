/* Paul of Tarsus: Jehovah's temple in Jerusalem seen from afar, and the pale weathered limestone of the city, shared by every chapter
   that shows Jerusalem (the Prologue, Chapters Two, Seven and Eighteen). Loaded on demand with need('temple') (list 'temple' in the
   chapter's needs) and registered in shared/pwa.js for offline play.

   The temple is drawn as Chapter Eighteen's courts draw it from near by (ART.court18, ART.stairs18), in its layout and proportions as the
   Study Edition's media and the publications on wol.jw.org show them, painted in our own way (CONTRIBUTING sections 1 and 3): the
   sanctuary the tallest thing on the mount, of pale stone, with a cornice and a band of gold along its top; a T in plan, its front block
   at the east end wider and taller than the long body behind it, and its gilded front facing east, so that from the city on the west it
   is turned away and only catches the light along its edge; the inner courts on their terrace, walled; the outer colonnades along the
   edge of the platform, the Royal colonnade on the south with its red-tiled roof; and the fortress of Antonia at the north-west corner,
   with a tower at each of its four corners, the south-east one the tallest. No altar is seen from outside, and no fire, smoke or standard.

   API (SHARED.temple):
     far(g, o)       the temple mount seen from the city on the west, far off. o:
                       x, base   where the middle of the sanctuary's west end stands, and the line of the west colonnade's roof (the top
                                 of the platform's wall), in room pixels
                       s         scale: room pixels to a unit (1: the sanctuary's front block is 32 pixels wide and 33 high)
                       k         how far round to the south we stand (0: due west; 0.5: south-west): the south faces show to the right
                       sun       'left': the sun high and behind us on the left (its west faces lit, the south faces in half shade);
                                 'back': the morning sun in the east, behind the mount (the west faces in shade, the south faces and
                                 every gold band and edge in the sun)
                       haze, a   the colour of the air and how much of it lies over the mount (0..1)
                       parts     {antonia, royal, wall, inner}: which of them to draw besides the sanctuary (all, if left out)
                       down      how far below base the platform's wall is painted (in units; 22 by default)
                       seed      the seed of its stone
     roofs(g, o)     a row of the city's flat roofs far off, pale limestone and plaster, with parapets and small windows. o: {x0, x1,
                     y (their tops, about), dy (how much the tops vary), down (how far their fronts go down), w: [min, max] width,
                     sun 'left' | 'right' | 'back', haze, a, seed}
     stone(g, x, y, w, h, r, o)  a face of dressed, weathered limestone in courses (Chapter Eighteen's look): o {bh, bw, c, v, rough,
                     age, honey, grey}
     age(g, x, y, w, h, r, k)    the weather on a stone face: stains, veins, pits and grit; k its strength
     GOLD            the gold of the sanctuary, from its highlight to its shade */
SHARED.temple=(()=>{
"use strict";
const GOLD=['#fff0b0','#f2cc6a','#d4a03a','#9a6c24','#6a4a20'];

/* stone: a face of dressed stone in courses, weathered: each block its own tone between cream, honey and a cool grey, a soft fall of
   light down it, a lit upper edge on most, a corner chipped here and there; joints that stop at the edge of their own course and never
   line up with the joints of the course above (so that no joint runs on through a course line); then the weather over all of it (age).
   o: {bh course height, bw block width, c tone, v variation, rough: drafted margins and a bossed face, age, honey, grey} */
function stone(g,x,y,w,h,r,o){const bh=o.bh,bw=o.bw,c=o.c,v=(o.v==null?.08:o.v)*1.4,HN=o.honey||'#dcbc84',GR=o.grey||'#bcb4b0';
  inRect(g,x,y,w,h,()=>{R(g,x,y,w,h,tint(c,-.15));let prev=[];
    for(let j=y,row=0;j<y+h;j+=bh,row++){let i=x-(row%2?bw*.5:0)-r()*bw*.3;const cur=[];
      while(i<x+w){let ww=bw*(.7+r()*.6);for(let k=0;k<3&&prev.some(p=>Math.abs(p-(i+ww))<1.8);k++)ww+=1.8;
        const cc=mix(tint(c,(r()-.5)*v*2),r()<.5?HN:GR,r()*.3);
        g.fillStyle=lg(g,0,j,0,j+bh,[tint(cc,.07),cc,tint(cc,-.08)]);g.fillRect(hp(i+.5),hp(j+.5),hp(ww-.5),hp(bh-.5));
        if(r()<.7)R(g,i+.5,j+.5,ww-.5,.5,rgba(tint(cc,.32),.4+r()*.4));
        if(o.rough&&bh>=2.5){R(g,i+1,j+1,ww-1.5,bh-1.5,rgba(tint(cc,.12),.55));R(g,i+1,j+bh-.5,ww-1,.5,rgba(tint(cc,-.22),.55))}
        if(r()<.22)R(g,(r()<.5?i+.5:i+ww-1.5),j+.5,1,1,rgba(tint(c,-.34),.55));
        i+=ww;cur.push(i)}prev=cur}});
  age(g,x,y,w,h,r,o.age==null?1:o.age)}
/* age: the weather on a stone face, inside x, y, w, h (and the current clip): stains of age in warm honey and grey where the rain has
   run and dried, soft and without edges, paler places the sun has bleached, fine pits and grit; k its strength (default 1) */
function age(g,x,y,w,h,r,k){k=k==null?1:k;inRect(g,x,y,w,h,()=>{
  tex(g,'blotch',.5*k,x,y,w,h,'soft-light',1.3);tex(g,'mott',.46*k,x,y,w,h,'overlay',.7);tex(g,'grain',.18*k,x,y,w,h,'overlay',.5);
  for(let i=0;i<w*h/150*k;i++){const sx=x+r()*w,sy=y+r()*h,rx=1.5+r()*Math.min(9,w*.25),ry=1+r()*Math.min(5,h*.22),d=r()<.62,run=r()<.3;
    pool(g,sx,sy+(run?ry:0),run?rx*.45:rx,run?ry*2:ry,d?(r()<.5?'#9a7c5c':'#867c8a'):'#fff2d2',(d?.26:.18)*k,d?'multiply':'screen')}
  for(let i=0;i<w*h/500*k;i++){let vx=x+r()*w,vy=y+r()*h;const p=[vx,vy],dx=r()<.5?1:-1;for(let s=0;s<4+r()*5;s++){vx+=dx*(1+r()*1.4);vy+=(r()-.5)*1.4;p.push(vx,vy)}
    stroke(g,p,'rgba(150,128,100,.22)',.5);stroke(g,p.map((v,j)=>j%2?v+.5:v),'rgba(255,248,230,.16)',.5)}
  for(let i=0;i<w*h/10*k;i++)R(g,x+r()*w,y+r()*h,.5,.5,r()<.55?'rgba(96,76,58,.22)':'rgba(255,248,230,.24)')})}

/* air: paint fn on a layer of its own the size of the picture, lay a haze of colour c over what it painted (and nothing else), and set
   it in the picture */
function air(g,c,a,fn){const W=g.canvas.width,H=g.canvas.height,[l,q]=mk(W,H);q.setTransform(g.getTransform());fn(q);
  if(a>0){q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-atop';q.globalAlpha=a;q.fillStyle=c;q.fillRect(0,0,W,H)}
  g.save();g.setTransform(1,0,0,1,0,0);g.drawImage(l,0,0);g.restore()}

/* the tones of a face by the way it is turned: 'w' a west face, 's' a south face, 't' the top of a coping; lit or in shade by o.sun */
function tones(sun){return sun==='back'?{w:'#d2c2a6',s:'#ecd8b0',t:'#fbeccc',ws:.26,ss:0,sl:'#fff6dc'}:{w:'#e6d2a8',s:'#d4c2a2',t:'#f8eccc',ws:0,ss:.12,sl:'#fffaec'}}

/* far: the temple mount from the city on the west (see the head of this file) */
function far(g,o){const s=o.s||1,k=o.k==null?.25:o.k,sun=o.sun||'left',T=tones(sun),P=o.parts||{antonia:1,royal:1,wall:1,inner:1},
    cw=Math.sqrt(1-k*k),X=(u,d)=>o.x+u*s*cw+((d||0)-45)*k*s,Y=v=>o.base-v*s,r=rng(o.seed||4711),dn=(o.down==null?22:o.down),
    bh=Math.max(1,2.6*s),bw=Math.max(3,9*s);
  air(g,o.haze||'#c8d0e0',o.a==null?.12:o.a,q=>{
    /* a face of stone from x0 to x1 and from y0 down to y1, of tone c, lit or in shade; its weather a little less at a distance */
    const face=(x0,x1,y0,y1,c,dark)=>{if(x1-x0<.3)return;stone(q,x0,y0,x1-x0,y1-y0,r,{bh,bw,c,v:.05,honey:'#e2c48e',grey:'#d4ccc0',age:Math.min(.6,.25+s*.3)});
        /* the warmth of the sun on a lit face, a cool shade on one turned from it */
        if(dark)comp(q,'multiply',dark,()=>R(q,x0,y0,x1-x0,y1-y0,'#9a94b4'));
        else comp(q,'soft-light',.55,()=>{q.fillStyle=lg(q,0,y0,0,y1,['rgba(255,236,196,1)','rgba(255,226,180,.6)']);q.fillRect(x0,y0,x1-x0,y1-y0)})},
      cornice=(x0,x1,y)=>{R(q,x0-.5*s,y-Math.max(.5,1.2*s),x1-x0+s,Math.max(.5,1.2*s),T.t);R(q,x0-.5*s,y,x1-x0+s,.5,'rgba(90,78,96,.55)')},
      gold=(x0,x1,y,h,lit)=>{h=Math.max(1,h);q.fillStyle=lg(q,0,y,0,y+h,lit?[GOLD[0],GOLD[1],GOLD[2]]:[GOLD[1],GOLD[2],GOLD[3]]);q.fillRect(x0,y,x1-x0,h);
        R(q,x0,y,x1-x0,.5,lit?'#fffae2':GOLD[1]);for(let x=x0+r()*3;x<x1-.5;x+=1.5+r()*3)R(q,x,y+h-.5,.5,.5,r()<.5?GOLD[3]:GOLD[0])},
      merlons=(x0,x1,y,c)=>{const m=Math.max(.5,1.4*s);for(let x=x0;x<=x1-m+.01;x+=m*2){R(q,x,y-m,m,m,c);R(q,x,y-m,m,.5,tint(c,.3))}};
    /* the Royal colonnade along the south edge, the tallest of the colonnades: its west end, a gable over a wall, and its long roof of red
       tiles running away east, the courses of the tiles along it; its outer south face under the eaves */
    if(P.royal){const g0=X(98,0),g1=X(110,0),gm=(g0+g1)/2,wt=Y(7),ap=Y(10.5),L=150*k*s;
      const roof=[gm,ap,g1,wt,g1+L,wt,gm+L,ap];poly(q,roof);q.fillStyle=lg(q,0,ap,0,wt,['#c0684a','#a8543a','#8a4430']);q.fill();
      clipTo(q,()=>poly(q,roof),()=>{for(let y=ap+.5;y<wt;y+=Math.max(.6,1*s))R(q,gm,y,g1+L-gm,.5,'rgba(70,30,20,.3)');tex(q,'mott',.35,gm,ap,g1+L-gm,wt-ap,'overlay',1)});
      R(q,gm,ap,L,.5,'#e09a70');face(g1,g1+L,wt,Y(-dn),T.s,T.ss);
      for(let x=g1+2*s;x<g1+L-s;x+=4*s)R(q,x,Y(4.4),Math.max(.5,.9*s),Math.max(.5,1.4*s),'rgba(58,46,48,.7)');
      face(g0,g1,wt,Y(-dn),T.w,T.ws);const ped=[g0-.4,wt,gm,ap,g1+.4,wt];poly(q,ped,tint(T.w,.06));
      clipTo(q,()=>poly(q,ped),()=>{if(T.ws)comp(q,'multiply',T.ws,()=>R(q,g0-1,ap,g1-g0+2,wt-ap,'#8a86b0'))});
      stroke(q,[g0-.6,wt+.2,gm,ap-.4,g1+.6,wt+.2],'#b0583c',Math.max(.5,.8*s));cornice(g0,g1,wt+Math.max(.5,1.2*s))}
    /* the inner courts on their terrace: the west end of their wall, the gatehouses at its two corners a little taller, and their south
       side running away east; behind them the sanctuary */
    const IN=30;
    if(P.inner){const a=X(-28,IN),b=X(28,IN),e=X(28,IN+100),top=Y(4),gt=Y(6);
      face(b,e,top,Y(0),T.s,T.ss);cornice(b,e,top);
      face(a,b,top,Y(0),T.w,T.ws);cornice(a,b,top);
      for(const[u0,u1]of[[-28,-22],[22,28]]){face(X(u0,IN),X(u1,IN),gt,Y(0),T.w,T.ws);cornice(X(u0,IN),X(u1,IN),gt)}
      face(X(28,IN),X(28,IN+6),gt,Y(0),T.s,T.ss);cornice(X(28,IN),X(28,IN+6),gt)}
    /* the sanctuary: its front block at the east end first, the tallest of all, wider than the body; its west face (the shoulders) and its
       south face; then the long body before it, its west end and its south flank with a row of small high windows; a cornice and a band
       of gold along every top, and the edge of the gilded east face catching the light at the far right */
    {const fx0=X(-16,85),fx1=X(16,85),fs1=X(16,95),ft=Y(33),bx0=X(-10,45),bx1=X(10,45),bs1=X(10,85),bt=Y(24),foot=Y(0),gh=Math.max(1.2,2.8*s);
      face(fx1,fs1,ft,foot,T.s,T.ss);face(fx0,fx1,ft,foot,T.w,T.ws);comp(q,'source-over',.1,()=>R(q,fx0,ft,fs1-fx0,foot-ft,o.haze||'#c8d0e0'));
      ao(q,fx0,bt-Math.max(1,4*s),fs1-fx0,Math.max(1,4*s),'b',.22,'#4a4060');
      if(fs1-fx1>2)for(const v of[27,20])for(let x=fx1+1.6*s;x<fs1-1.8*s;x+=3.6*s)R(q,x,Y(v),Math.max(.5,1.3*s),Math.max(.5,1.4*s),'rgba(58,46,48,.75)');
      cornice(fx0,fs1,ft+gh);gold(fx0-.5*s,fs1+.3*s,ft,gh,sun==='back');
      /* the edge of the gilded east face, turned away from us: only a thin line of it, in the light */
      q.fillStyle=lg(q,0,ft,0,foot,[GOLD[0],GOLD[1],GOLD[2]]);q.fillRect(fs1,ft,Math.max(.5,.8*s),foot-ft);
      if(sun==='back')pool(q,fs1+.5,ft+(foot-ft)*.35,Math.max(1.5,3*s),(foot-ft)*.4,'#fff0b0',.35,'screen');
      face(bx1,bs1,bt,foot,T.s,T.ss);face(bx0,bx1,bt,foot,T.w,T.ws);
      ao(q,bs1-Math.max(1,3*s),bt,Math.max(1,3*s),foot-bt,'r',.25,'#4a4060');
      if(bs1-bx1>2)for(let x=bx1+2*s;x<bs1-2.4*s;x+=4.2*s)R(q,x,Y(20),Math.max(.5,1.3*s),Math.max(.5,1.4*s),'rgba(58,46,48,.75)');
      if(s>=.6){R(q,bx0,Y(13),bs1-bx0,.5,rgba(T.t,.8));R(q,bx0,Y(13)+.5,bs1-bx0,.5,'rgba(120,104,100,.4)')}
      cornice(bx0,bs1,bt+gh);gold(bx0-.5*s,bs1,bt,gh,sun!=='back'?1:0);if(sun==='back')gold(bx1,bs1,bt,gh,1)}
    /* the west colonnade along the edge of the platform: its roof's edge, a lip of tiles over a cornice, and the great wall under it */
    if(P.wall){const a=X(-80,0),b=X(98,0),y=Y(0);
      face(a,b,y,Y(-dn),T.w,T.ws);R(q,a,y,b-a,Math.max(.5,1.4*s),T.t);R(q,a,y+Math.max(.5,1.4*s),b-a,.5,'rgba(90,78,96,.5)');
      R(q,a,y-Math.max(.5,.9*s),b-a,Math.max(.5,.9*s),'#a8644a');R(q,a,y-Math.max(.5,.9*s),b-a,.5,'#d8906a');
      for(let x=a+3*s;x<b-2*s;x+=6*s)R(q,x,Y(-4),Math.max(.5,1.2*s),Math.max(.5,1.6*s),'rgba(58,46,48,.55)')}
    /* the fortress of Antonia at the north-west corner, outside the platform: its west face and its south face, a tower at each corner,
       the south-east one, nearest the courts, the tallest; merlons along every top, rows of small windows. Every tower stands at a corner,
       none from the middle of a wall */
    if(P.antonia){const A0=-98,A1=-72,D0=-12,D1=18,c='#e2d2b0',top=Y(15),tw=6,
        tower=(u0,d,tt,south)=>{const x0=X(u0,d),x1=X(u0+tw,d);face(x0,x1,tt,Y(-dn),T.w,T.ws);
          if(south)face(x1,X(u0+tw,d+tw),tt,Y(-dn),T.s,T.ss);merlons(x0,south?X(u0+tw,d+tw):x1,tt,T.t);
          for(const v of[14,8])if(Y(v)>tt+s)R(q,(x0+x1)/2-.5*s,Y(v),Math.max(.5,1.2*s),Math.max(.5,1.6*s),'rgba(50,40,44,.8)')};
      /* the north-east tower stands behind the north-west one, hidden by it from the city: drawn, it would rise from the middle of the
         wall's top (CONTRIBUTING section 3) */
      tower(A1-tw,D1-tw,Y(24),1);
      face(X(A1,D0),X(A1,D1-tw),top,Y(-dn),T.s,T.ss);merlons(X(A1,D0),X(A1,D1-tw),top,T.t);
      face(X(A0,D0),X(A1,D0),top,Y(-dn),T.w,T.ws);merlons(X(A0,D0),X(A1,D0),top,T.t);
      for(const v of[11,6,1])for(let u=A0+tw+2;u<A1-tw-1;u+=3.4)R(q,X(u,D0),Y(v),Math.max(.5,1*s),Math.max(.5,1.4*s),'rgba(50,40,44,.75)');
      tower(A0,D0,Y(19),0);tower(A1-tw,D0,Y(19),1)}
  });
  /* the gold that takes the sun burns through the haze */
  if(sun==='back'){const ft=Y(33),fx0=X(-16,85),fs1=X(16,95);pool(g,(fx0+fs1)/2+4*s,ft+.6*s,(fs1-fx0)*.5,Math.max(1,1.4*s),'#fff2c0',.35,'screen')}}

/* roofs: a row of the city's flat roofs far off (see the head of this file) */
function roofs(g,o){const r=rng(o.seed||811),sun=o.sun||'left',down=o.down==null?16:o.down,w=o.w||[5,12],dy=o.dy==null?4:o.dy;
  air(g,o.haze||'#c8d0e0',o.a==null?.2:o.a,q=>{let x=o.x0-r()*4;
    while(x<o.x1){const ww=w[0]+r()*(w[1]-w[0]),t=o.y+(r()-.5)*dy*2,c=mix(tint('#e2d4b4',(r()-.5)*.12),r()<.5?'#dcbc84':'#cfc8c4',r()*.25),
        lit=sun==='right'?[tint(c,-.14),tint(c,.06)]:sun==='back'?[tint(c,-.2),tint(c,-.12)]:[tint(c,.06),tint(c,-.1)];
      q.fillStyle=lg(q,x,0,x+ww,0,lit);q.fillRect(x,t,ww,down);
      R(q,x-.3,t-.6,ww+.6,1.1,sun==='back'?tint(c,.02):tint(c,.2));R(q,x-.3,t-.6,ww+.6,.5,sun==='back'?'#fff0d4':'#fffaee');R(q,x,t+.5,ww,.5,'rgba(80,70,90,.35)');
      R(q,sun==='right'?x:x+ww-.5,t+1.5,.5,down-1.5,'rgba(80,72,100,.2)');
      for(let k=0;k<2;k++)if(r()<.6&&ww>4)R(q,x+1+r()*(ww-3),t+2.5+r()*Math.max(1,down*.3),1,1.2,'rgba(60,48,50,.6)');
      inRect(q,x,t,ww,down,()=>tex(q,'mott',.3,x,t,ww,down,'overlay',1));
      x+=ww+(r()<.25?.5+r()*1.5:0)}})}

return{GOLD,stone,age,far,roofs}})();
