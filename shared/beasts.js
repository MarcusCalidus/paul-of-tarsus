/* Paul of Tarsus: the animals, painted pixel by pixel in the manner of the figures (person() in index.html) and placed with figure(), so that
   they stand in the depth queue, take the light of the room they stand in and cast its shadows. Loaded on demand via CHAP[n].needs (see
   need() in index.html). Registered in shared/pwa.js for offline play.

   Placing an animal, inside a room's draw() or a cutscene:
     donkey(g, x, y, dir, fr, load, lit)    a pack donkey with its feet at x,y. dir 1 faces right, -1 left. fr: 0 stands, 4 to 19 the
                                            frames of its walk (frame.donkey gives the frame for a distance walked), 20 and up the frames
                                            of its voice (see speak). load: 0 a saddle blanket, 1 pack bags, 2 bags filled with sacks on
                                            top. lit: the light on it (lightAt), or nothing for plain daylight
     mule(g, x, y, dir, fr, load, lit)      a pack mule, the same way
     ox(g, x, y, dir, fr, coat, gar, lit)   an ox or a bull. coat: its color. gar: a garland round its neck (Acts 14:13)
   Walking: everybody covers ground at WALK_V, the animals too, so that a donkey keeps up with whoever leads it.
     frame.donkey(dist, v), frame.mule(dist, v), frame.ox(dist, v)
                                            the frame of the walk after dist room pixels at v room pixels a second (WALK_V if none)
   Its voice: an animal that is talked to brays or lows, and its head and mouth move with the sound.
     speak(id, kind)                        plays the voice of kind ('donkey', 'mule', 'ox') and moves the animal that the room draws as
                                            id; resolves when the sound is over
     pose(id, fr)                           the frame to draw the animal id with: fr, or the frame of its voice while it speaks
   For the playtest:
     paint.donkey, paint.mule, paint.ox     the painters themselves, (g, 0, 0, dir, fr, ...) into a sprite
     kinds.donkey, kinds.mule, kinds.ox     each kind's numbers: its gait, its voice and the half-width of its shadow

   Each kind lives in a section of its own below and gives the same things: paint, frame, the numbers of its walk, voice (a list of
   [ms, fr]: from ms after the sound starts the animal is drawn with frame fr; the last entry is when it is over), sound() and sw. */
SHARED.beasts=(()=>{

/* ================================================================ the donkey ================================================================ */
const DONKEY=(()=>{
  /* A small grey-brown pack donkey, seen from the side with its big, boxy head carried high and turned a little toward us, so that both
     long ears read, set wide apart in a V: the near one shows its pale inside, the far one its back. Dark rims and tips to the ears, a short erect dark mane, a dark stripe along the
     back from the withers to the tail (and no stripe across the shoulders: with the one along the back it would make a cross), a pale
     muzzle, a pale ring round the eye and a pale belly, darker lower legs, small dark hooves, and a thin tail with a dark tuft.
     It is built like the figures of the reference: rounded masses (barrel, haunch, shoulder, breast, a neck of overlapping rounds, the
     head of cranium, cheek, face, muzzle and lower jaw, the legs of tapering limbs), each lit by its own surface from the front and above
     and laid down pixel by pixel in the five flat tones of ramp(); where two masses meet, the nearer one wins, so a crease shows where the
     haunch meets the barrel and the near legs stand out from the belly. The ears, the eye, the nostril, the mane, the stripe and the
     loads are placed on top. Ears reach about 40 room pixels above the hooves, the withers about 25.
     load: 0 a saddle blanket held by a girth, 1 pack bags of striped goat hair over it, 2 the bags filled, with two sacks of grain on top.
     The bags carry only stripes that run along them, and no strap crosses them. fr 0 stands; 4 to 19 are the sixteen frames of its walk
     (frame below gives the frame for a distance walked); 1, 2 and 3 are three moments of that walk, a quarter of a cycle apart, for a
     scene that counts frames itself; 20 to 23 are its bray (see voice). */
  /* The walk has four beats: near hind, near fore, far hind, far fore, each a quarter of the cycle after the one before. A hoof stands
     on the ground for STANCE of the cycle (ten frames of sixteen), going back under the body REACH drawing units (two to a room pixel),
     and swings forward for the other six, lifted, with the knee of a fore leg flexed forward and the hock of a hind leg further back.
     The two legs of a pair leave the body at one place and open like a pair of compasses: set apart, they would cross as an X under the
     belly. The body sinks a unit as each fore hoof lands, the head nods with it, and the tip of the tail swings.
     So one cycle carries the donkey STRIDE = REACH / STANCE / 2 = 30 / .625 / 2 = 24 room pixels with its hooves planted, and a cycle
     is never quicker than BEAT = .5 s: up to 24 / .5 = 48 room pixels a second, WALK_V, the hooves stay where they are set down. At
     WALK_V that is two cycles a second, eight short, quick footfalls: a donkey's neat walk, and no slip at all. Slower, the cycle
     slows with it; faster than WALK_V a cycle still takes .5 s and the hooves would slide.
     frame(dist, v): the frame of the walk after dist room pixels at v room pixels a second (WALK_V if none). */
  const REACH=30,STANCE=.625,STRIDE=REACH/STANCE/2,BEAT=.5;
  const frame=(dist,v)=>{const c=Math.max(STRIDE,Math.abs(v==null?WALK_V:v)*BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const COAT=ramp('#8c8376'),PALE=ramp('#d2cabb'),LOW=ramp('#6b6258'),HOOF=ramp('#3c3028'),DARK='#362d27',DARK2='#4a4038',INNER='#5a2622';
  /* the head at rest, and in the frames of its bray: poll (px, py), the angle of the face below the level (al, degrees), how far the
     lower jaw is open (jaw, degrees), and the ears (ear: 0 up, 1 laid back along the neck) */
  const HEAD={rest:{px:28.5,py:-61,al:65,jaw:0,ear:0},20:{px:28,py:-63,al:32,jaw:0,ear:1},21:{px:28,py:-64,al:6,jaw:18,ear:1},
    22:{px:28,py:-64,al:-2,jaw:32,ear:1},23:{px:28.5,py:-62,al:48,jaw:0,ear:.4}};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  function donkey(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>=1&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0,
      tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,HP=Object.assign({},HEAD[fr>=20?fr:'rest']);HP.py+=o+hd;HP.px+=hd*.4;
    /* the picture is built in a buffer first: color, nearness (z) and part of every pixel; then laid down */
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const put=(px,py,z,col,part)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;if(z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return 0;return Pb[(py+Y0)*FW+px+X0]};
    const set=(px,py,col)=>set0(px,py,col),set0=(px,py,col)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=99}};
    /* the light falls from the front and above: s, how much a surface with normal (nx, ny, nz) faces it, gives the tone */
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.5-ny*.7+nz*.5+((px+py)&1?.03:-.03);return Math.min(4,(s>.86?0:s>.62?1:s>.3?2:s>-.05?3:4)+(ex||0))};
    const coat=(ex,R)=>(nx,ny,nz,px,py)=>(R||COAT)[tn(nx,ny,nz,px,py,ex)];
    const belly=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py);return ny>.5&&nz>.2?PALE[Math.max(1,Math.min(3,b))]:COAT[b]};
    const pale=(nx,ny,nz,px,py)=>PALE[Math.max(0,tn(nx,ny,nz,px,py)-1)];
    /* ell: a rounded mass, half-sizes a, b, c, turned by th; cap: a limb from one round to another */
    const ell=(cx,cy,cz,a,b,c,th,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),lx=u/a,ly=v/b,lz=w/c,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz);put(px,py,cz+c*w,mat(nx/l,ny/l,lz/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    /* at: where the hoof of a leg is at this moment, its beat being off of a cycle after the near hind's: hx before or behind the leg's
       root, lift off the ground, and bend, how far the joint is flexed */
    const at=(off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=REACH,B=STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
      const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:v?2+Math.round(4.5*q):0,bend:q}};
    /* leg: from the shoulder or the hip (sx, sy) down to the hoof. A fore leg is straight while it stands and folds at the knee as it
       swings; a hind leg has its hock behind the line, more so as it swings. From the knee or the hock down the leg is darker. */
    const leg=(sx,P,near,hind)=>{const sy=(hind?-45:-44)+o,ex=near?0:1,cz=near?5:-5,hc=sx+P.hx,fy=-6.5-P.lift,fx=hc-1.4,dx=fx-sx,dy=fy-sy,L=Math.hypot(dx,dy),
        nx=-dy/L,ny=dx/L,f=hind?.7:.68,off=hind?-(3.2+3.2*P.bend):5.5*P.bend,jx=sx+dx*f+nx*off,jy=sy+dy*f+ny*off,up=coat(ex),lo=coat(ex,LOW);
      if(hind){const s2=.36,kx=sx+dx*s2-nx*2.5,ky=sy+dy*s2-ny*2.5;cap(kx,ky,5.2,jx,jy,2.9,cz,up,4)}
      else{const s2=.3,kx=sx+dx*s2,ky=sy+dy*s2;cap(kx,ky,4.4,jx,jy,3,cz,up,4)}
      cap(jx,jy,2.7,fx,fy,2.15,cz,lo,4);ell(fx,fy,cz+.3,2.5,2.5,2.5,0,lo,4);
      const b=P.bend,d0=.28*(1-b)-(hind?.42:.75)*b,d1=1*(1-b)+(hind?.9:.62)*b,dl=Math.hypot(d0,d1),ux=d0/dl,uy=d1/dl;
      cap(fx+ux*2,fy+uy*2,1.9,fx+ux*3.6,fy+uy*3.6,2,cz,lo,4);
      cap(fx+ux*4.6,fy+uy*4.6,2.3,fx+ux*6.4,fy+uy*6.4,2.55,cz+.5,(nx2,ny2,nz2,px,py)=>HOOF[Math.min(4,tn(nx2,ny2,nz2,px,py,ex))],5)};
    const SF=15,SH=-16;
    leg(SH,at(.5,3),0,1);leg(SF,at(.75,-2.5),0,0);leg(SH,at(0,-3),1,1);leg(SF,at(.25,2),1,0);
    /* the body: barrel, haunch, shoulder and breast; the croup slopes to the root of the tail */
    ell(-2,-38.5+o,0,23,12.5,12,0,belly,1);ell(-17,-42+o,1,11.5,10,10,-.12,coat(0),1);ell(12,-40+o,1,10.5,10.5,9,0,belly,1);ell(18.5,-36+o,0,6,8.5,8,0,belly,1);
    /* the tail: set on at the top of the rump, lying along it, then hanging free to its dark tuft */
    {const T=[[-27,-47.5],[-29.4,-44.5],[-30.8,-40],[-31.2+tl*.3,-35],[-31+tl*.7,-30]];for(let i=0;i<T.length-1;i++)cap(T[i][0],T[i][1]+o,1.3,T[i+1][0],T[i+1][1]+o,1.05,2,coat(1),7);
      ell(-30.8+tl,-26.5+o,2,1.8,3.6,1.5,0,(nx,ny,nz,px,py)=>(px+py)%3?DARK:DARK2,7)}
    /* the head: big and boxy, as long as the neck. A broad forehead and cranium, a deep cheek and jaw, a straight face of one width down
       to a large pale muzzle, which is the lowest and frontmost part of it, and the lower jaw on its hinge, which opens for the bray.
       Its front, the broad face turned a little toward us, takes the light. u runs down the face from the poll, v back toward the jaw. */
    const a=HP.al*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,Wp=(u,v)=>[HP.px+u*ux+v*vx,HP.py+u*uy+v*vy],hm=coat(0),
      lv=(px,py)=>(px+.5-HP.px)*vx+(py+.5-HP.py)*vy,
      hf=(nx,ny,nz,px,py)=>{let b=tn(nx,ny,nz,px,py);if(lv(px,py)<-2.2)b=Math.max(0,b-1);return COAT[b]},
      pm=(nx,ny,nz,px,py)=>PALE[Math.max(0,Math.min(3,tn(nx,ny,nz,px,py)-1))];
    /* sell: a rounded block, its sides flatter than an ell's (p > 2) */
    const sell=(cx,cy,cz,A,B,C,th,p,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(A,B)*1.2+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/A,v=(-X*si+Y*co)/B,
          au=Math.abs(u),av=Math.abs(v),q=1-Math.pow(au,p)-Math.pow(av,p);if(q<0)continue;const w=Math.pow(q,1/p),
          lx=Math.sign(u)*Math.pow(au,p-1)/A,ly=Math.sign(v)*Math.pow(av,p-1)/B,lz=Math.pow(w,p-1)/C,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz)||1;
        put(px,py,cz+C*w,mat(nx/l,ny/l,lz/l,px,py),part)}};
    {const[c0,c1]=Wp(3.2,2.2);sell(c0,c1,1,5.4,5.8,6,a,2.6,hf,3)}
    {const[c0,c1]=Wp(9,4.4);ell(c0,c1,1.5,6.6,4.6,5.5,a,hm,3)}
    {const[c0,c1]=Wp(9.5,.6);sell(c0,c1,2,7.5,4.6,5,a,3,hf,3)}
    {const[c0,c1]=Wp(17.6,1.5);sell(c0,c1,2.2,4.6,4.9,5,a,2.6,pm,3)}
    const ja=HP.jaw*Math.PI/180,hu=9,hv=7,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v));
    {const[h0,h1]=Wp(hu,hv),[m0,m1]=Wr(15,6.9),[c0,c1]=Wr(18.4,6.7);cap(h0,h1,3.4,m0,m1,2.9,1,hm,3);sell(c0,c1,1.6,3.6,2.7,3.5,a+ja,2.4,pm,3)}
    if(HP.jaw){/* the open mouth: dark within, the pale teeth along both jaws */
      const Q=[Wp(11.5,6.4),Wp(22.4,5.6),Wr(21.8,6.6),Wr(12,6.8)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let c=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(px,py,-1,INNER,3)}
      for(let u=15;u<=21.5;u+=.5){const[p,q]=Wp(u,6.7);put(p,q,-.5,'#ece4d0',3);const[r,s]=Wr(u+.3,5.5);put(r,s,-.5,'#d8ceb6',3)}}
    /* the neck: overlapping rounds from the shoulders to the head, its crest a little arched; and its short erect mane */
    const NK=[];{const[ax,ay]=Wp(4.5,5.2),bx=15,by=-45+o,cx=(bx+ax)/2-2.5,cy=(by+ay)/2-2;
      for(let i=0;i<=16;i++){const t=i/16,nx=(1-t)*(1-t)*bx+2*t*(1-t)*cx+t*t*ax,ny=(1-t)*(1-t)*by+2*t*(1-t)*cy+t*t*ay,r=9-3.2*t;NK.push([nx,ny,r]);ell(nx,ny,-2,r,r,r,0,hm,2)}}
    /* the ears: very long, set wide apart on the top of the head and opening in a V, or laid back along the neck as it brays; the near
       one shows its pale inside, the far one its darker back; both have dark rims and tips */
    const ear=(bx0,by0,ang,len0,near)=>{const ex=Math.cos(ang),ey=Math.sin(ang),bx=bx0-ex*2,by=by0-ey*2,len=len0+2,R=len+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=2.9*Math.sin(Math.PI*(t*.78+.22));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.8)col=DARK;else if(Math.abs(s)>hw-1)col=DARK2;
        else if(near&&t>.12&&Math.abs(s)<hw-1.3)col=PALE[l<0?0:1];
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,1)];
        put(px,py,near?12:-6,col,6)}};
    {const e=HP.ear,up=-Math.PI/2,bk=-Math.PI+.42,[f0,f1]=Wp(-1.2,-3.2),[n0,n1]=Wp(-.2,3.4);
      ear(f0,f1,up+.3+(bk+.1-up-.3)*e,14,0);ear(n0,n1,up-.12+(bk-up+.12)*e,15,1)}
    for(let i=3;i<NK.length;i++){const[cx,cy,r]=NK[i],[px0,py0]=NK[i-1],dx=cx-px0,dy=cy-py0,L=Math.hypot(dx,dy)||1,nx=dy/L,ny=-dx/L,s=ny<0?1:-1,
        rx=cx+nx*s*(r-1.6),ry=cy+ny*s*(r-1.6),h=i%3?2.4:1.8;cap(rx,ry,1,cx+nx*s*(r+h),cy+ny*s*(r+h),.9,30,()=>i%4===1?DARK2:DARK,8)}
    /* the brush runs on over the poll to between the ears: short, and laid back, so that with the ears it makes no cross */
    for(const[u,v]of[[-.4,1.2],[-.9,-.6],[.4,2.6]]){const[r0,r1]=Wp(u+1.2,v),[t0,t1]=Wp(u-1.4,v+1.6);cap(r0,r1,1,t0,t1,.8,10,()=>DARK,8)}
    /* the eye, large and dark in its pale ring, high on the side of the head; the nostril on the front of the muzzle; the line of the closed mouth */
    {const[e0,e1]=Wp(6.2,-1.4),X=Math.floor(e0),Y=Math.floor(e1),set=(x,y,c)=>{if(partAt(Math.floor(x),Math.floor(y))===3)set0(x,y,c)};
      for(const[dx,dy]of[[-1,-1],[0,-1],[1,-1],[2,-1],[-2,0],[3,0],[-2,1],[3,1],[-1,2],[0,2],[1,2],[2,2]])set(X+dx,Y+dy,PALE[dy<0?2:1]);
      for(const dx of[-1,0,1,2])set(X+dx,Y,'#14100c');for(const dx of[-1,0,1,2])set(X+dx,Y+1,dx===2?'#3a2e26':'#1e1812');set(X+1,Y,'#5a5048');set(X-2,Y-1,COAT[3]);set(X-1,Y-2,COAT[3]);set(X,Y-2,COAT[3])}
    for(const[u,v,c]of[[19.6,-1.8,'#4a4038'],[20.4,-1,'#241c18'],[20.6,0,'#241c18'],[20.2,.9,'#4a4038']]){const[n0,n1]=Wp(u,v);if(partAt(Math.floor(n0),Math.floor(n1))===3)set(n0,n1,c)}
    if(!HP.jaw)for(let u=14.5;u<=21.5;u+=.5){const[p,q]=Wp(u,6.5);if(partAt(Math.floor(p),Math.floor(q))===3)set(p,q,u>20.5?'#8a8274':'#6a6258')}
    /* the stripe along the back, from the mane to the root of the tail */
    for(let X=-27;X<=13;X++){let Y=-Y0;while(Y<0&&![1,2].includes(partAt(X,Y)))Y++;if(Y<0){set(X,Y,DARK);set(X,Y+1,X>-25&&X<11?DARK:DARK2)}}
    /* the loads */
    const topAt=X=>{let Y=-Y0;while(Y<0&&![1,2,8].includes(partAt(X,Y)))Y++;return Y},botAt=X=>{let Y=-1;while(Y>-Y0&&partAt(X,Y)!==1)Y--;return Y};
    {const K=ramp('#8a3e30'),bt=X=>{let Y=-Y0;while(Y<0&&partAt(X,Y)!==1)Y++;return Y};for(let X=-13;X<=12;X++){const t0=bt(X)-1,n=12;for(let i=0;i<n;i++){if([2,8].includes(partAt(X,t0+i)))continue;let v=i===0?0:i>=n-2?3:X>10?1:X<-11?3:2;if(i===7)v=-1;set(X,t0+i,v<0?'#d8c9a0':i===8?K[4]:K[v])}}
      if(!load){const yb=bt(12)+10,yb2=botAt(14);for(let Y=yb;Y<=yb2;Y++){const X=12+Math.round((Y-yb)/(yb2-yb)*2.4);set(X,Y,'#6a4628');set(X+1,Y,'#4a2e18')}}}
    if(load){const B=ramp('#4a3c30'),S=ramp('#b8a47c'),Rd=ramp('#8a3a2c'),L=ramp('#7a5a3a'),cy=(load>1?-35:-36.5)+o,a2=load>1?15.5:15,b2=load>1?11.5:10;
      for(let Y=Math.floor(cy-b2);Y<=cy+b2;Y++)for(let X=Math.floor(-1-a2);X<=-1+a2;X++){const u=(X+.5+1)/a2,v=(Y+.5-cy)/b2,q=1-Math.pow(Math.abs(u),4)-Math.pow(Math.abs(v),load>1?3:6);if(q<0)continue;
        const nz=Math.pow(q,.35)*(load>1?1:.8),n=Math.hypot(Math.pow(u,3),Math.pow(v,3)*.8,nz),b=tn(Math.pow(u,3)/n,Math.pow(v,3)*.8/n,nz/n,X,Y);
        set(X,Y,v<-.8?L[Math.max(0,b-1)]:v>-.42&&v<-.26?S[b]:v>.3&&v<.44?Rd[b]:B[b])}
      if(load>1){/* two sacks of grain, upright on the saddle between the bags */
        const sack=(sx,sc)=>{const Q=ramp(sc),qm=(nx,ny,nz,px,py)=>Q[tn(nx,ny,nz,px,py)],by=topAt(Math.round(sx))+1,cy2=by-5.5;ell(sx,cy2,40,6.5,5.8,5,0,qm,9);
          cap(sx-1,cy2-4,3.4,sx+.3,cy2-7.5,2.2,41,qm,9);for(let d=-1;d<=1;d++)set(sx+d,cy2-7.5,'#6a4a2a');ell(sx+.6,cy2-9.2,41,3,1.7,2,0,qm,9)};
        sack(-6.5,'#c4b282');sack(5,'#d4c294')}}
    /* lay the buffer down */
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
    g.restore()}
  /* the bray: a thin rising "hee" as it draws breath, and a lower, rougher "haw" as it lets it out (two saw waves a few hertz apart, so
     that they beat), together a little over a second. voice: the frames that go with it, [ms, fr]: the head goes up with the ears laid
     back (20), the mouth opens (21) and is wide on each part (22), between them half shut, and the head comes down again (23). */
  const sound=()=>{const t=now();tone({f:610,to:780,t:t+.19,d:.32,type:'sawtooth',v:.035,a:.05,sus:1,vib:12,lp:[[2600,0],[1800,.3]]});
    tone({f:300,to:222,t:t+.6,d:.48,type:'sawtooth',v:.05,a:.03,sus:1,vib:7,lp:[[1700,0],[700,.48]]});
    tone({f:304,to:226,t:t+.6,d:.48,type:'square',v:.018,a:.03,sus:1,lp:[[900,0],[500,.48]]})};
  return{paint:donkey,frame,reach:REACH,stance:STANCE,stride:STRIDE,beat:BEAT,
    voice:[[0,20],[150,21],[210,22],[500,21],[580,22],[1060,21],[1140,20],[1230,23],[1350,0]],sound,sw:16}})();
/* ============================================================== end of the donkey ============================================================ */


/* ================================================================= the mule ================================================================= */
const MULE=(()=>{
    /* A pack mule, the foal of a donkey and a mare, and a size bigger than the donkey: seen from the side, with its head turned a little
       toward us so that both ears read. It is more like a horse than the donkey is: a deeper body with a round haunch, longer and finer
       legs on larger hooves, a longer neck carried higher, with a short upright mane, a long head with a straight face, ears long but
       shorter than a donkey's, and a tail that grows long hair from high up. Its coat is a dark bay: a brown body, the mane, the tail and
       the legs below the knees and hocks dark, and a mealy muzzle and belly, so that it never reads as the grey donkey beside it.
       Sizes, in drawing units (two to a room pixel): the withers stand 62 high (31 room pixels), the tips of the ears 97 (48 room
       pixels, a man's height), the belly 33 above the ground.
       load: 0 a saddle blanket and its girth, 1 pack bags, 2 the bags stuffed with wool and fleeces piled four deep on top, half as
       high again as the back. fr 0 stands; fr 4 to 19 are the sixteen frames of its walk (frame.mule gives the frame for a distance walked), and 1, 2 and
       3 three moments of it, a quarter of a cycle apart; fr 20 to 23 are its voice: 20 the head raised and the ears laid back, 21 the
       mouth a little open for the whinny, 22 the neck stretched and the mouth wide for the hee, 23 half shut for the haw.
       The walk has four beats, as every walk of a four-footed beast: near hind, near fore, far hind, far fore, each a quarter of a cycle
       after the one before. A hoof stands for ten frames, going back under the body, and swings forward for six, lifted, with the hock
       or the knee bent. The legs of a pair hang from one place in the body and open like a pair of compasses. The body sinks a pixel
       as each fore hoof lands, the head nods a pixel more with it and a frame after it, and the tail swings away from the near hind leg
       when that leg is back. Every part is painted from the one it grows out of: the legs come out of the body, the neck out of the
       shoulders, the head out of the neck, the tail out of the top of the rump. */
    const COAT='#7a4b2f',POINT='#34271f',MEAL='#c4a27c',HOOF='#1d1713',HOOF_LIT='#4e3e32',EYE='#120c0a',MOUTH='#3e1a16',TEETH='#d8cdb2',
      STRAP='#5c3318',STRAP_LIT='#8a5a30',D=ramp(COAT),PT=ramp(POINT),M=ramp(MEAL);
    /* The numbers of the walk. A hoof reaches MULE_REACH drawing units from the front of its step to the back while it stands, and stands
       for MULE_STANCE of the cycle, so a cycle carries the mule MULE_STRIDE room pixels with its hooves planted: 36 / .625 / 2 = 28.8, against
       the donkey's 17.6 and a man's 27. A cycle is never quicker than MULE_BEAT seconds, or the walk would turn into a scurry: up to
       28.8 / .6 = 48 room pixels a second the hooves stay where they are set down, so at WALK_V (48) they do not slip at all, and a
       cycle takes .6 s. The reach swings legs 33 units long under the belly through about twenty degrees each way; a longer one would
       bring the hind hoof of one side up against the fore hoof of that side as it lifts, and the two legs would cross as an X.
       muleFr: the frame of the walk for a distance walked (dist, in room pixels) at a speed (v, room pixels a second; WALK_V if none). */
    const MULE_REACH=36,MULE_STANCE=.625,MULE_STRIDE=MULE_REACH/MULE_STANCE/2,MULE_BEAT=.6;
    const muleFr=(dist,v)=>{const c=Math.max(MULE_STRIDE,Math.abs(v==null?WALK_V:v)*MULE_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
    /* the body: a deep barrel, the round haunch behind and the chest before, in drawing units with the feet at 0,0 */
    const ell=(x,y,cx,cy,rx,ry)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1;
    const inBody=(x,y)=>ell(x,y,0,-46.5,29.5,13.5)||ell(x,y,-19.5,-48.5,15,12.5)||ell(x,y,20,-48,13.5,13.5);
    const COLS={},ROWS={};
    for(let x=-40;x<=40;x++)for(let y=-70;y<=-28;y++)if(inBody(x+.5,y+.5)){const c=COLS[x]||(COLS[x]=[y,y]);c[1]=y;const r=ROWS[y]||(ROWS[y]=[x,x]);r[1]=Math.max(r[1],x)}
    /* capsule: the pixels within ra..rb of the segment a-b, each given to paint(u, t, x, y): u runs across the segment from -1 to 1, 1 being the
       side to the left of its way (the front of a leg that runs down, the crest of a neck that runs up), and t along it from 0 to 1 */
    const capsule=(ax,ay,bx,by,ra,rb,paint)=>{const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy||1,L=Math.sqrt(L2),R=Math.max(ra,rb)+1;
      for(let y=Math.floor(Math.min(ay,by)-R);y<=Math.ceil(Math.max(ay,by)+R);y++)for(let x=Math.floor(Math.min(ax,bx)-R);x<=Math.ceil(Math.max(ax,bx)+R);x++){
        const qx=x+.5-ax,qy=y+.5-ay,t=Math.max(0,Math.min(1,(qx*dx+qy*dy)/L2)),ex=qx-dx*t,ey=qy-dy*t,r=ra+(rb-ra)*t;
        if(ex*ex+ey*ey<=r*r)paint((ex*dy-ey*dx)/L/r,t,x,y)}};
    /* the head, in its own frame: u along the face from the poll to the nose, v across it, down toward the jaw */
    const inHead=(u,v)=>{if(ell(u,v,7,8.5,9,9)||ell(u,v,3.5,2,5.5,4.2))return true;const t=Math.max(0,Math.min(1,(u-3.5)/25.5)),cy=3+2.4*t,r=4.3+.8*t;return(u-3.5-25.5*t)**2+(v-cy)**2<=r*r};
    /* poses of the head: the poll x,y, the slant of the face below the level (degrees), how far the jaw is open (degrees), the ears laid back */
    const HEADS={0:[44,-83,48,0,0],20:[46,-86,30,0,1],21:[47,-86,25,9,1],22:[49,-84,14,24,1],23:[49,-83,17,12,1]};
    function mule(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
      const px=(a,b,col,w,h)=>{g.fillStyle=col;g.fillRect(a,b,w||1,h||1)};
      const W=fr>0&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0;
      /* at: where the hoof of a leg is at this moment, the leg's beat being off of a cycle after the near hind leg's: hx before or behind
         the leg's root, lift off the ground, and q, how far it is through its swing (0 while it stands) */
      const at=off=>{if(!W)return{hx:0,lift:0,q:0,sw:0};const p=((ph-off)%1+1)%1,T=MULE_REACH,B=MULE_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,q:0,sw:0};
        const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(6*q),q,sw:1}};
      /* leg: from inside the body at its root rx, by the hock (hind) or the knee (fore) and the fetlock down to the hoof. The upper leg is
         in the coat's tones, the leg from the hock or knee down in the dark of the points; a far leg is a tone darker. Only what lies
         outside the body is painted, so the leg grows out of it. The hock bends back and the knee forward; as a fore leg swings the
         knee lifts and the hoof folds back under it. */
      const leg=(rx,P,far,hind)=>{const y0=-44+o,hx=rx+P.hx,hy=-P.lift,q=P.q,f=far?1:0,out=(xx,yy)=>!inBody(xx+.5,yy+.5-o);
        const J=hind?[rx+P.hx*.7-5-2*q,-23-P.lift*.6]:[rx+P.hx*.55+5*q,-18-P.lift*.5-3*q];
        const F=hind?[hx-2+3*q,hy-7]:[hx-1+3*q,hy-7+q];
        const tone=(R,lo)=>(u,t,xx,yy)=>{if(!out(xx,yy))return;px(xx,yy,R[Math.min(4,(u>.5?1:u>-.15?2:u>-.6?3:4)+f+(lo&&t>.7?0:0))])};
        capsule(rx,y0,J[0],J[1],hind?6.5:5.5,hind?3.6:3.4,tone(D));
        capsule(J[0],J[1],F[0],F[1],hind?3.2:3,2.6,tone(PT,1));
        capsule(F[0],F[1],hx+(P.sw?2*q:0),hy-4,2.9,2.6,tone(PT));
        /* the hoof: flat on the ground while it stands, tipped back as it swings */
        if(!P.sw||P.lift===0){for(let i=0;i<4;i++){const w=[6,7,8,8][i],x0=Math.round(hx)-3-(i>1?1:0);px(x0,hy-4+i,HOOF,w);px(x0+w-2,hy-4+i,far?HOOF:HOOF_LIT,2)}}
        else capsule(hx+2*q,hy-4,hx+2*q-2.4*q,hy-.5,3,3.6,(u,t,xx,yy)=>px(xx,yy,u>.5&&!far?HOOF_LIT:HOOF))};
      const N=at(0),NF=at(.25),FH=at(.5),FF=at(.75);
      leg(-21,FH,1,1);leg(20,FF,1,0);
      /* tail: set on at the top of the rump, a short dock in the coat, then long dark hair from high up, fuller than a donkey's tuft. It
         swings a pixel or two, away from the near hind leg when that leg is back, and ends above the hocks,
         so that it never hangs across a leg. */
      const sway=W?Math.round(2*Math.cos(6.2832*(ph-.05))):0;
      capsule(-31.5,-58+o,-36,-51+o,2.2,2.2,(u,t,xx,yy)=>px(xx,yy,D[u>.3?2:3]));
      for(let yy=-54;yy<=-27;yy++){const i=yy+54,s=i/27,cx=-37.5-s*1.6+sway*s,w=Math.round(s<.4?3+s*7:s<.85?6:6-(s-.85)*20);
        for(let q=0;q<w;q++){const xx=Math.round(cx-w/2+q);px(xx,yy+o,q===w-1&&s<.6?PT[1]:(q+(i>>2))%3===0?PT[3]:q<1?PT[3]:PT[2])}}
      /* the barrel: lit along the back, darker toward the rump's round edge, the belly mealy */
      for(const xs in COLS){const xx=+xs,[t0,t1]=COLS[xs];for(let yy=t0;yy<=t1;yy++){const t=(yy-t0)/Math.max(1,t1-t0),[l,r]=ROWS[yy];
        let v=t<.12?1:t<.48?2:t<.78?3:4;if(xx-l<3)v=Math.min(4,v+1);if(r-xx<4&&t<.45)v=Math.max(1,v-1);
        /* the round haunch catches the light on its upper front, and the hollow of the flank before it lies in shade */
        const hr=((xx+19.5)/15)**2+((yy+48.5)/12.5)**2;if(hr<.42&&yy<-50&&xx>-28)v=Math.max(1,v-1);if(xx>-9&&xx<-5&&t>.35&&t<.8)v=Math.min(4,v+1);
        px(xx,yy+o,xx>-20&&xx<13&&(t>.9||t>.8&&(xx+yy)%2)?M[3]:D[v])}}
      /* a broken highlight along the line of the back */
      for(let xx=-26;xx<24;xx+=3)if(COLS[xx])px(xx,COLS[xx][0]+o,D[0],2);
      leg(-23,N,0,1);leg(22,NF,0,0);
      /* the head's pose: at rest it nods with the walk; its voice raises it */
      const[hx0,hy0,ang,jaw,back]=HEADS[fr>=20?Math.min(23,fr):0],a=(ang+hd*2)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),PX=hx0,PY=hy0+o+hd;
      const wx=(u,v)=>PX+u*ca-v*sa,wy=(u,v)=>PY+u*sa+v*ca;
      /* the neck: from the withers and the chest up to the poll and the throat, its crest arched, lit along the crest and dark under the throat */
      const c0=[11,-61+o],c2=[wx(-1.8,-.3),wy(-1.8,-.3)],c1=[c0[0]+(c2[0]-c0[0])*.4-2,c2[1]+(c0[1]-c2[1])*.38-3],t0=[37,-45+o],t1=[wx(1.5,14.5),wy(1.5,14.5)];
      const crest=s=>[(1-s)*(1-s)*c0[0]+2*s*(1-s)*c1[0]+s*s*c2[0],(1-s)*(1-s)*c0[1]+2*s*(1-s)*c1[1]+s*s*c2[1]],poly=[];
      for(let i=0;i<=16;i++)poly.push(crest(i/16));poly.push(t1,t0,[30,-40+o]);
      const inPoly=(x,y)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
      const dSeg=(x,y,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy))),ex=x-a[0]-dx*t,ey=y-a[1]-dy*t;return Math.sqrt(ex*ex+ey*ey)};
      for(let yy=Math.floor(Math.min(c2[1],t1[1])-2);yy<=t0[1]+1;yy++)for(let xx=10;xx<=Math.ceil(Math.max(t0[0],t1[0],c2[0]))+2;xx++){const X=xx+.5,Y=yy+.5;
        if(!inPoly(X,Y)||inBody(X,Y-o))continue;let dc=1e9;for(let i=0;i<16;i++)dc=Math.min(dc,dSeg(X,Y,poly[i],poly[i+1]));const s=dc/(dc+dSeg(X,Y,t0,t1));
        px(xx,yy,D[s<.14?1:s<.5?2:s<.8?3:4])}
      /* the mane: short and upright along the crest, dark, a few hairs catching the light */
      for(let i=1;i<=30;i++){const s=i/31,[mx,my]=crest(s),[nx,ny]=crest(Math.min(1,s+.02)),dx=nx-mx,dy=ny-my,l=Math.hypot(dx,dy)||1,ux=dy/l,uy=-dx/l,h=2+(i%3===1?1:0)-(s>.94?1:0);
        for(let j=0;j<=h;j++)px(Math.round(mx+ux*j),Math.round(my+uy*j),j===h&&i%4===2?PT[1]:PT[j?2:3])}
      /* the ears, long, rising from the poll; the far one behind and darker. Laid back along the neck while the mule brays. Each shows the
         dark hollow turned a little toward us, and dark tips */
      const ear=(bx,by,ex,ey,far)=>capsule(bx,by,bx+ex,by+ey,2.9,.7,(u,t,xx,yy)=>
        px(xx,yy,t>.82?PT[2+far]:D[Math.min(4,(u>.45?1:u>-.1?(t>.18&&t<.78&&!far?4:2):3)+far)]));
      const eb=[wx(-.5,-.6),wy(-.5,-.6)];
      if(back){ear(eb[0]-3,eb[1]+.5,-10.5,-4.5,1);ear(eb[0],eb[1],-11,-6,0)}else{ear(eb[0]-3,eb[1]+.5,-2.6,-11.4,1)}
      /* the head itself: a straight face, lit along its front, a round jowl, a mealy muzzle. With the mouth open the lower jaw turns down
         about the corner of the mouth, and the mouth shows dark, with the teeth along its edges */
      const jr=jaw*Math.PI/180,jc=Math.cos(jr),js=Math.sin(jr),JU=13,JV=6.6;
      const isIn=(x,y)=>{const dx=x-PX,dy=y-PY,u=dx*ca+dy*sa,v=-dx*sa+dy*ca;if(!jaw)return inHead(u,v)?[u,v,0]:null;
        if(inHead(u,v)&&(v<=JV||u<=JU))return[u,v,0];
        const ru=JU+(u-JU)*jc+(v-JV)*js,rv=JV-(u-JU)*js+(v-JV)*jc;if(rv>JV&&ru>JU&&inHead(ru,rv))return[ru,rv,1];
        if(u>JU&&v>JV&&rv<=JV&&ru<32&&inHead(Math.min(ru,u),JV-.5))return[u,v,2];return null};
      for(let yy=Math.floor(PY-16);yy<=PY+40;yy++)for(let xx=Math.floor(PX-16);xx<=PX+40;xx++){const h=isIn(xx+.5,yy+.5);if(!h)continue;const[u,v,part]=h;
        if(part===2){px(xx,yy,v<JV+1.2&&u>23?TEETH:MOUTH);continue}
        const below=!isIn(xx+.5,yy+1.5),muz=u>24;let c;
        if(part===1&&v<JV+1.1&&u>22)c=u>25?TEETH:M[3];
        else if(muz)c=below?M[4]:v<1.6?M[1]:v<6?M[2]:M[3];
        else{let t=v<1.1?1:v<5.4?2:3;if(ell(u,v,7,8.5,9,9)&&!ell(u,v,7.6,7.6,6.4,6.2)&&v>6)t=Math.max(t,3);if(ell(u,v,8.5,7,4.4,3.6)&&v>4.4)t=2;if(below)t=4;if(u<-1&&v>2.5)t=Math.min(4,t+1);c=D[t]}
        px(xx,yy,c)}
      /* the near ear stands in front of the head; laid back, both lie behind it */
      if(!back)ear(eb[0],eb[1],.9,-12.6,0);
      /* the eye, the nostril and the line of the mouth, placed on the head as it is turned */
      const ex=Math.round(wx(11,2.9)),ey=Math.round(wy(11,2.9));px(ex,ey,EYE,2,2);px(ex+1,ey,'#4a3a34');px(ex-1,ey-1,D[1],3);px(ex,ey+2,M[2],2);
      const nx=Math.round(wx(29.6,3.8)),ny=Math.round(wy(29.6,3.8));px(nx,ny,EYE,2);px(nx-1,ny+1,M[4],2);
      if(!jaw)for(let s=26;s<=33;s+=.5)px(Math.round(wx(s,7.7)),Math.round(wy(s,7.7)),M[4]);
      /* a halter: a noseband round the nose and a strap behind the ears, apart, so that no strap crosses another */
      for(let s=-.6;s<=9.6;s+=.4){px(Math.round(wx(20.5,s)),Math.round(wy(20.5,s)),s<1?STRAP_LIT:STRAP);px(Math.round(wx(21.4,s)),Math.round(wy(21.4,s)),STRAP)}
      for(let s=-.4;s<=13.5;s+=.4)px(Math.round(wx(-.6,s)),Math.round(wy(-.6,s)),s<1?STRAP_LIT:STRAP);
      /* the saddle blanket on the back, held by one girth behind the elbow */
      const K=ramp('#7e3a2e');for(let xx=-13;xx<=13;xx++){const tp=COLS[xx][0]-1+o;for(let i=0;i<13;i++){const u=(xx+13.5)/27;px(xx,tp+i,i===9?'#d4c49c':K[i===0?0:i===12?4:u<.12?4:u<.3?3:u<.8?2:1])}}
      {const gx=9;for(let yy=COLS[gx][0]+12+o;yy<=COLS[gx][1]+o;yy++){px(gx,yy,STRAP,2);px(gx+1,yy,STRAP_LIT)}}
      if(load){/* the pack saddle's pad over the blanket, and a pack bag of dark goat's hair, banded, hanging on each side; the near one hides the far */
        const S=ramp('#6a4a2c'),B=ramp('#3e3029'),full=load>1;for(let xx=-11;xx<=11;xx++){const tp=COLS[xx][0]-4+o,u=(xx+11.5)/23;for(let i=0;i<4;i++)px(xx,tp+i,S[i===0?(u>.5?0:1):u<.15?4:u<.4?3:2])}
        const bt=-59+o,bh=full?23:20;for(let i=0;i<bh;i++){const s=i/(bh-1),hw=Math.round(15.5+(full?2.5:1.2)*Math.sin(Math.PI*Math.min(1,s*1.15))-(s>.86?(s-.86)*28:0));
          for(let xx=-hw;xx<=hw;xx++){const u=(xx+hw+.5)/(2*hw+1);let v=u<.1?4:u<.3?3:u<.78?2:1;if(i<2)v=Math.max(0,v-1);if(s>.84)v=Math.min(4,v+1);
            const band=i===5||i===6||i===bh-6;px(xx,bt+i,band?(v<2?'#b88a44':v<3?'#9a6e34':'#6e4c26'):B[v])}}
        for(let xx=-15;xx<=15;xx++)px(xx,bt,xx%2?S[1]:S[2]);
        if(full){/* wool bulging out of the bags' mouths, and two sacks of wool laid on top, the upper one smaller, their mouths tied */
          const Wl=ramp('#d8ceb6');for(let xx=-16;xx<=16;xx++){const h=2+((xx*7+3)%5+5)%5%3;for(let j=0;j<h;j++)px(xx,bt-1-j,Wl[j===h-1?0:j?1:2])}
          /* fleeces, folded and piled on the pack saddle four deep, each a little narrower than the one under it, their edges hanging
             in soft waves and drooping over the bags at the ends; curls of shade in the wool, lit along the top and toward the front */
          for(let L=0;L<4;L++){const yb=bt+2-L*7,hw=20-L*2.6,cx=L%2?1.5:-.5,Q=ramp(['#d4c9ae','#dcd2b8','#cfc3a6','#d9cfb4'][L]);
            for(let xx=Math.floor(cx-hw);xx<=Math.ceil(cx+hw);xx++){const e=(xx-cx)/hw;if(Math.abs(e)>1)continue;
              const bot=yb+Math.round(1.2*Math.sin(xx*.8+L*1.7))+(Math.abs(e)>.82?2:0),top=yb-9+Math.round(3*Math.pow(Math.abs(e),3))+(((xx*5+L*3)%7+7)%7<2?1:0);
              for(let yy=top;yy<=bot;yy++){const t=(yy-top)/Math.max(1,bot-top);let v=t<.2?0:t<.45?1:t<.8?2:3;if(e<-.75)v=Math.min(4,v+1);if(e>.7&&v>1)v--;
                if(v<3&&((xx*3+yy*7+L)%11===0||(xx*3+yy*7+L)%11===1&&t>.3))v++;if(yy===bot)v=Math.max(v,3);px(xx,yy,Q[v])}}}}}
      g.restore()}
    /* The voice: a mule's bray begins like a horse's whinny, high and shaking, and ends like a donkey's hee-haw, twice over. About one and
       a half seconds, as quiet as the game's other sounds. The voice list follows it: the head rises as the whinny begins, the mouth opens
       with it, and with each hee the neck stretches and the mouth opens wide, closing halfway for the haw. */
    const sound=()=>{const t=now();
      [[0,980,760],[.07,900,1020],[.14,1000,720],[.21,860,940],[.28,900,640],[.35,760,820],[.42,760,520]].forEach(([d,f,to])=>tone({f,to,t:t+d,d:.09,type:'sawtooth',v:.032,lp:[[2600,0]]}));
      for(const[d,f,to,h]of[[.58,560,470,.19],[.79,250,205,.27],[1.1,540,460,.17],[1.3,240,190,.3]]){tone({f,to,t:t+d,d:h,type:'sawtooth',v:f>400?.04:.052,sus:1,lp:[[f>400?2200:1300,0],[900,h]]});
        tone({f:f*1.5,to:to*1.5,t:t+d,d:h,type:'square',v:.012,sus:1,lp:[[1600,0]]})}};
    const voice=[[0,20],[60,21],[520,20],[580,22],[780,23],[1080,22],[1280,23],[1600,20],[1700,0]];
  return{paint:mule,frame:muleFr,reach:MULE_REACH,stance:MULE_STANCE,stride:MULE_STRIDE,beat:MULE_BEAT,voice,sound,sw:19}})();
/* =============================================================== end of the mule ============================================================= */


/* ================================================================== the ox ================================================================== */
const OX=(()=>{
    /* A working ox or a bull, the heaviest of the animals, in the pixel manner of the figures and seen from the side, as in the maintainer's
       reference picture: a deep barrel of a body that rises to a hump of muscle at the withers, a short thick neck with the dewlap hanging
       under it, and a broad head turned a little toward us, so that both short pale horns, both ears and both eyes read. c: its coat, from
       which every tone is taken (ramp), so that the brown oxen of Zenon's wagon and the near-white bulls of Lystra are the same painter.
       gar: a garland of leaves and yellow flowers round the neck (Acts 14:13).
       Every part grows out of the one before it: the tail is set on at the top of the rump and lies along it before it hangs free, the near
       legs are painted in the body's own tones as far down as the belly, so that haunch and shoulder grow out of it, and the neck is painted
       in the same bands of tone as the body it comes out of, so that no seam shows.
       Crosses: the horns curve out and straight up from a poll that rises between them, so that the crown of the head is no level bar over
       the face; the ears droop; the garland is a loose band of leaves that slants across the neck and crosses no line; nothing is ever laid
       across the neck.
       fr 0 stands. fr 4 to 19 are the sixteen frames of its walk (frame below gives the frame for a distance walked); 1, 2 and 3 are three
       moments of that walk, a quarter of a cycle apart, for a scene that counts frames itself. The walk has four beats: near hind, near
       fore, far hind, far fore, each a quarter of the cycle after the one before. A hoof stands on the ground for OX_STANCE of the cycle,
       going back under the body, and swings forward for the rest, lifted, with the hock or the knee bent. The legs swing from the hip and
       the shoulder, high inside the body, so that a leg slants less than a pendulum hung at the belly would; while it walks the two legs of
       a pair leave the body at nearly one place and open like a pair of compasses, and never cross as an X under the belly. A heavy beast
       plods: the body sinks a pixel as each fore hoof takes its weight, the hip and the shoulder roll up a pixel in turn over the leg that
       stands under them, the head sways a pixel forward and back and dips with the fore hooves, the dewlap swings after it, and the tip of
       the tail swings away from the near hind leg when that leg is back.
       fr 20 to 22 are its voice (see voice and sound): 20 the head lifted and the neck stretched, the mouth shut; 21 the mouth half open;
       22 wide open, the dewlap drawn taut under the stretched neck. */
    const OX_HEAD=[
      "...x..............................x...","..xx..............................xx..","..xx..............................xx..",".ycC..............................ccy.",
      ".ycC..............................ccy.",".ycC..............................ccy.",".yccC............................cccy.","..yccC..........................cccy..",
      "..yyccC.........HHLLLLdd.......cccyy..","...yyccCC.....HHLLLLLLLLd.....cccyy...",".....yyccCcc.HHHLLLLLLLLdd.ccccyy.....","........yyccHHHHLLLLLLLLdddccy........",
      "........eeeHHHHHhLLLLLLhdddddD........",".....eeeEEeHHHHhhhLLLLhhdddddEddD.....","..eeEEEEEEeHHHHhhhhLLhhhdddddEEEEEdD..",".eEEEEEEEeeHHHHhhhhhhhhhddddddEEEEEED.",
      "..eeEEEEeddHkkkHhhhhhhhhkkkdddEEEEdD..","....eeeddddHkwkHhhhhhhhhkkkddddddD....","........dddHdkkHhhhhhhhhkkdddD........","...........HHddHhhhhhhhhdddD..........",
      "...........HHHHhhhhhhhhhdddD..........","............HHHhhhhhhhhhddD...........","............HHHhhhhhhhhhddD...........","............HHhhhhhhhhhhhdD...........",
      "............HHhhhhhhhhhhhdD...........","............MMMmmmmmmmmmmmm...........","...........MMMMmmmmmmmmmmmmm..........","...........MMnnMmmmmmmmmnnmm..........",
      "...........MnnnMmmmmmmmmnnnm..........","...........MMnMmmmmmmmmmmnmm..........","...........mmmmmmmmmmmmmmmmm..........","............qnnnnnnnnnnnnnq...........",
      "............mmmmmmmmmmmmmmm...........",".............qqqqqqqqqqqqq............"];
    /* the head lifted and the neck stretched to low: the muzzle comes forward, the horns sweep back over the poll, and the near ear lies back.
       RAISE has the mouth shut, LOW1 half open, LOW2 wide open with the tongue showing. Each is drawn by hand. */
    const OX_RAISE=[
      "...x..............x.....................","...xx.............xx....................","...yc.............cy....................","....ycC..........Ccy....................",
      ".....ycC........Ccy.....................","......ycC......Ccy......................",".......ycC....ccy.......................","........yccCHccy........................",
      ".........yyccHHHL.......................",".........dHLLLLLLLL.....................","........dHHLLLLLLLLLLLL.................",".......dHHHHHLLLLLLLLLLLLLL.............",
      ".....eedHHHHHHHHHHHLLLLLLLLLLMM.........","...eeEEdHHHHHHHHkwkHHHHHHHHHHMMMMM......",".eEEEEEdhHHHHHHHkkkhHHHHHHHHMMMMMMMM....","eEEEEeddhhhhhhhhhddhhhhhhhhhmMMMMMMnnM..",
      ".eeedddhhhhhhhhhhhhhhhhhhhhhmmmmmmmmnm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmq..","....ddhhhhhhhhhhhhhhhhhhhhhdmmmmmmmmmq..",
      "....dddhhhhhhhhhhhhhhhhhhhddnnnnnnnnnq..",".....ddhhhhhhhhhhhhhhhhhdddqmmmmmmmmq...",".....dddhhhhhhhhhhhhhhddddqqmmmmmmqq....","......dddhhhhhhhhhhdddddD..qqqqqq.......",
      ".......dddddddddddddDDD.................",".........DDDDDDDDDDD...................."];
    const OX_LOW1=[
      "...x..............x.....................","...xx.............xx....................","...yc.............cy....................","....ycC..........Ccy....................",
      ".....ycC........Ccy.....................","......ycC......Ccy......................",".......ycC....ccy.......................","........yccCHccy........................",
      ".........yyccHHHL.......................",".........dHLLLLLLLL.....................","........dHHLLLLLLLLLLLL.................",".......dHHHHHLLLLLLLLLLLLLL.............",
      ".....eedHHHHHHHHHHHLLLLLLLLLLMM.........","...eeEEdHHHHHHHHkwkHHHHHHHHHHMMMMM......",".eEEEEEdhHHHHHHHkkkhHHHHHHHHMMMMMMMM....","eEEEEeddhhhhhhhhhddhhhhhhhhhmMMMMMMnnM..",
      ".eeedddhhhhhhhhhhhhhhhhhhhhhmmmmmmmmnm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmq..","....ddhhhhhhhhhhhhhhhhhhhhhdmmmmmmmmmq..",
      "....dddhhhhhhhhhhhhhhhhhhhddqqqqqqqqqq..",".....ddhhhhhhhhhhhhhhhhhdddooooooooo....",".....dddhhhhhhhhhhhhhhddddqoooooooo.....","......dddhhhhhhhhhhdddddDqmmmmmmmmq.....",
      ".......dddddddddddddDDD..qqmmmmmq.......",".........DDDDDDDDDDD......qqqqq........."];
    const OX_LOW2=[
      "...x..............x.....................","...xx.............xx....................","...yc.............cy....................","....ycC..........Ccy....................",
      ".....ycC........Ccy.....................","......ycC......Ccy......................",".......ycC....ccy.......................","........yccCHccy........................",
      ".........yyccHHHL.......................",".........dHLLLLLLLL.....................","........dHHLLLLLLLLLLLL.................",".......dHHHHHLLLLLLLLLLLLLL.............",
      ".....eedHHHHHHHHHHHLLLLLLLLLLMM.........","...eeEEdHHHHHHHHkwkHHHHHHHHHHMMMMM......",".eEEEEEdhHHHHHHHkkkhHHHHHHHHMMMMMMMM....","eEEEEeddhhhhhhhhhddhhhhhhhhhmMMMMMMnnM..",
      ".eeedddhhhhhhhhhhhhhhhhhhhhhmmmmmmmmnm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmm..","....ddhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmq..","....ddhhhhhhhhhhhhhhhhhhhhhdmmmmmmmmmq..",
      "....dddhhhhhhhhhhhhhhhhhhhddqqqqqqqqqq..",".....ddhhhhhhhhhhhhhhhhhdddoooooooooo...",".....dddhhhhhhhhhhhhhhddddoooooooooo....","......dddhhhhhhhhhhdddddooottttoooo.....",
      ".......dddddddddddddDDDqootttttoo.......",".........DDDDDDDDDDD..qmmmmmmmmq........","......................qqmmmmmq..........",".......................qqqqq............"];
    /* The numbers of the walk. A hoof reaches OX_REACH drawing units (two to a room pixel) from the front of its step to the back, and stands
       on the ground for OX_STANCE of the cycle. So one cycle carries the ox OX_STRIDE room pixels with its hooves planted: 40 / .62 / 2 =
       32.3, a long step for a beast whose legs swing from a hip and a shoulder high in the body, so that a hoof can reach twenty units
       before and behind while the leg under the belly slants no more than a plodding leg does. A cycle is never quicker than OX_BEAT
       seconds: up to 32.3 / .67 = 48.1 room pixels a second, just above WALK_V, the hooves stay exactly where they are set down (no slip at
       all), and a cycle takes two thirds of a second, a plod and not a scurry. Only faster than WALK_V would they begin to slip.
       frame(dist, v): the frame of the walk after dist room pixels at v room pixels a second (WALK_V if none is given). */
    const OX_REACH=40,OX_STANCE=.62,OX_STRIDE=OX_REACH/OX_STANCE/2,OX_BEAT=.67;
    const oxFr=(dist,v)=>{const c=Math.max(OX_STRIDE,Math.abs(v==null?WALK_V:v)*OX_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
    function ox(g,x,y,dir,fr,c,gar){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
      const px=(a,b,col,w,h)=>{g.fillStyle=col;g.fillRect(a,b,w||1,h||1)},D=ramp(c),hoof='#2a2018',hoofL='#4a3a2c';
      const W=fr>0&&fr<20,V=fr>=20?fr-19:0,k=fr>=4&&fr<20?(fr-4)%16:W?(fr-1)*4:0,ph=k/16;
      /* the beats: o, the body sinks a pixel as each fore hoof takes the weight; hd, the head dips with it and a frame after; sway, the head a
         pixel forward and back over the cycle; roll, the hip (rl) and the shoulder (rs) rise a pixel over the leg that stands under them */
      const o=W&&(k%8===5||k%8===6)?1:0,hd=W&&(k%8===6||k%8===7)?1:0,sway=W?Math.round(Math.cos(6.2832*(ph-.2))):0,
        rl=W&&(k>=1&&k<=4)?-1:0,rs=W&&(k>=5&&k<=8)?-1:0,tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,dw=W?Math.round(1.5*Math.sin(6.2832*(ph-.35))):0;
      /* P, the poll (where the crest of the neck meets the head), and Q, the throat, for each pose; sag, how far the dewlap hangs below the
         line between brisket and throat; H, the head's map and where it is laid */
      const pose=V===0?{P:[36+sway,-73+hd],Q:[40+sway,-46+hd],sag:7,H:OX_HEAD,hx:28+sway,hy:-81+hd}
        :V===1?{P:[40,-75],Q:[40,-58],sag:4,H:OX_RAISE,hx:30,hy:-84}
        :{P:[42,-76],Q:[42,-60],sag:2,H:V===2?OX_LOW1:OX_LOW2,hx:32,hy:-85};
      /* top: the line of the back, from the rump over the hump of the withers and along the crest of the neck to the poll */
      const top=xx=>{if(xx<-35)return-58-8*Math.sqrt(Math.max(0,1-Math.pow((xx+35)/8,2)))+rl;
        if(xx<=14)return-65.5-1.2*Math.exp(-Math.pow((xx+28)/5,2))+.8*Math.exp(-Math.pow((xx+6)/10,2))-6.5*Math.exp(-Math.pow((xx-14)/11,2))+(xx<-20?rl:xx>2?rs:0);
        const u=Math.min(1,(xx-14)/(pose.P[0]-14)),d=pose.P[1]+72-rs;return-72+rs+d*(u*u*.5+u*.5)};
      /* bot: the underline, from the buttock along the belly to the brisket, which stays where it is whatever the head does, and then the
         dewlap up to the throat, swinging as it walks and drawn taut when the neck is stretched */
      const bot=xx=>{if(xx<-34)return-36-6*(1-Math.sqrt(Math.max(0,1-Math.pow((xx+34)/9,2))));
        if(xx<20)return-28.6+2.6*Math.exp(-Math.pow((xx+4)/14,2))-3*Math.exp(-Math.pow((xx+27)/6,2))+.8*Math.exp(-Math.pow((xx-14)/5,2));
        if(xx<30)return-27.6-(xx-20)*.25;
        const u=Math.min(1,(xx-30)/(pose.Q[0]-30)),s=Math.min(1,Math.max(0,u-dw*.06));return-30.1+(pose.Q[1]+30.1)*u+pose.sag*Math.sin(Math.PI*s)};
      const X0=-43,X1=pose.Q[0]+2;
      /* tone: the band of tone of a pixel of the body, lit from above and a little from the front: a highlight along the back, the light on
         the hump of the shoulder and on the haunch, the side in the base tone, the belly and the underside of the neck in shadow; the
         rear falls into shade. A checker dither softens each change of band, as the backdrops are dithered. */
      const tone=(xx,yy)=>{const t0=top(xx),b0=bot(xx),r=(yy-t0)/Math.max(1,b0-t0);let v=.8+r*3.3;
        const sh=Math.pow((xx-17)/12,2)+Math.pow((yy+55)/14,2),hu=Math.pow((xx+31)/10,2)+Math.pow((yy+57)/10,2);
        if(sh<1)v-=.9*(1-sh);if(hu<1)v-=.8*(1-hu);if(xx<-36)v+=(-36-xx)*.16;if(xx>22&&r>.45)v+=.35;
        if(yy-t0<1.2&&xx>-38)v=Math.min(v,.45);
        return Math.max(0,Math.min(4,Math.floor(v+((xx+yy)&1?.14:-.14))))};
      /* at: where the hoof of a leg is at this moment, the leg's beat being off of a cycle after the near hind leg's: hx before or behind the
         leg's root, lift off the ground, and bend, how far the hock or the knee is flexed */
      const at=off=>{if(!W)return{hx:0,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=OX_REACH,B=OX_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
        const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(5*q),bend:5*q}};
      /* leg: from its root at lx down to the hoof. The top of a near leg lies inside the body and is painted in the body's tones as far as the
         belly; below it the leg is lit from the front and darker behind, a far leg a band darker again. A hind leg goes down from the stifle
         to the hock, which stands back, and on down the cannon; a fore leg goes straight down the forearm to the knee. The top moves with a
         third of the hoof's swing, since the leg swings from the hip or the shoulder high above. */
      const leg=(lx,P,far,hind)=>{const y0=(far?-31:hind?-50:-46)+o,yh=-3-P.lift,tx=lx+P.hx*.33+(hind?3:0),jy=hind?-17:-14,
          jx=hind?lx-6+P.hx*.62-P.bend:lx+P.hx*.6+P.bend,hx=lx+P.hx,n=yh-y0;
        for(let i=0;i<n;i++){const yy=y0+i,cx=yy<=jy?tx+(jx-tx)*(yy-y0)/(jy-y0):jx+(hx-jx)*(yy-jy)/(yh-jy),t=(yy-y0)/(jy-y0),b=(yy-jy)/(yh-jy),
            w=yy<=jy?(hind?Math.round(16-6*t):Math.round(14-4*t)):(b<.15?(hind?10:11):b<.72?8:9),x0=Math.round(cx-w/2+(hind&&yy<=jy?1:0));
          for(let q=0;q<w;q++){const xx=x0+q,u=(q+.5)/w;
            if(!far&&yy-o<bot(xx)-.5&&xx>=X0)px(xx,yy,D[tone(xx,yy-o)]);
            else px(xx,yy,D[Math.min(4,(u<.18?4:u<.42?3:u<.86?2:1)+(far?1:0))])}}
        const hx0=Math.round(hx-4);px(hx0,yh,hoof,9,2);px(hx0,yh+2,hoof,4);px(hx0+5,yh+2,hoof,4);px(hx0+6,yh,hoofL,2);px(hx0-1,yh-1,hoof,2)};
      /* the far legs, behind the body: walking, each pair leaves the body at one place */
      leg(W?-24:-20,at(.5),1,1);leg(W?24:25,at(.75),1,0);
      /* the tail: set on at the top of the rump, lying along it, then hanging free to a dark switch */
      {const ty0=Math.round(top(-40))+o;for(let yy=ty0;yy<=-31+o;yy++){const i=yy-ty0,lie=yy<-51+o,sw=i>8?Math.round(tl*(i-8)/16):0,
          xx=lie?Math.round(-35-8*Math.sqrt(Math.max(0,1-Math.pow((yy-o+58)/8.5,2))))-1:-44+sw,tuft=yy>-40+o;
        if(tuft){const w=yy>-35+o?5:4;px(xx-(w>4?2:1),yy,hoof,w)}else px(xx,yy,D[i%4?3:4],2)}}
      /* the body and the neck: column by column, between the line of the back and the underline */
      for(let xx=X0;xx<=X1;xx++){const t0=Math.round(top(xx)),b0=Math.round(bot(xx));for(let yy=t0;yy<=b0;yy++)px(xx,yy+o,D[tone(xx,yy)])}
      /* creases: where the flank folds in front of the haunch, and behind the shoulder; each a short soft line that ends inside the body */
      for(let yy=-58;yy<=-38;yy++){const xx=Math.round(-22+(yy+58)*.15);px(xx,yy+o,D[Math.min(4,tone(xx,yy)+1)])}
      for(let yy=-64;yy<=-46;yy++){const xx=Math.round(6-(yy+64)*.12);if(yy%3)px(xx,yy+o,D[Math.min(4,tone(xx,yy)+1)])}
      /* the near legs, in front of the body */
      leg(W?-26:-29,at(0),0,1);leg(W?22:19,at(.25),0,0);
      /* a garland: leaves set two by two along a cord, slanting either way, and a few yellow flowers among them, laid on the neck from the
         crest down round the throat, where it hangs a little loose. The leaves overlap, so that no line of them crosses another. */
      if(gar){const[ax,ay]=V?[30,-72]:[24+sway,-70+hd],[bx,by]=V?[42,-54]:[33+sway,-39+hd],G0='#3f6a32',G1='#4f7a3a',G2='#6f9a4a',G3='#8fb45a';
        for(let i=0;i<16;i++){const u=i/15,gx=Math.round(ax+(bx-ax)*u+2.4*Math.sin(u*Math.PI)),gy=Math.round(ay+(by-ay)*u+1.5*Math.sin(u*Math.PI))+o,s=i%2;
          px(gx-2,gy,G0,5,2);px(gx-(s?4:0),gy+(s?-1:1),s?G1:G2,4,2);px(gx-(s?3:-1),gy+(s?-1:1),G3,2,1);px(gx+(s?1:-2),gy+1,G1,2,1);
          if(i%5===2){px(gx-1,gy-1,'#e8c040',3,2);px(gx,gy-1,'#fff0a0',1);px(gx-1,gy,'#c89a30',1)}}}
      /* the head */
      const pale=mix(c,'#e8dccb',.55),horn='#e6dcc0';
      stamp(g,pose.H,pose.hx,pose.hy+o,{L:D[0],H:D[1],h:D[2],d:D[3],D:D[4],e:D[3],E:mix(c,'#5a3436',.5),k:'#1a120c',w:'#e8e0d0',
        m:pale,M:tint(pale,.25),q:mix(pale,D[3],.5),n:'#2a1c18',o:'#3a1418',t:'#b06a70',c:horn,C:'#f6f0e0',y:'#b0a284',x:'#4a3c30'});
      g.restore()}
  /* sound: a low. A deep note through a closed mouth swells, opens as the mouth opens (the filter rises) and closes again, falling a little
     in pitch; a note an octave below gives it its chest. About one and a half seconds, and quiet like every effect. */
  const sound=()=>{tone({f:104,bend:[-260,.28],to:84,d:1.45,type:'sawtooth',v:.038,a:.14,sus:1,vib:1.2,vibd:.6,lp:[[240,0],[620,.3],[820,.7],[520,1.05],[220,1.45]]});
    tone({f:52,bend:[-260,.28],to:42,d:1.45,type:'triangle',v:.036,a:.16,sus:1})};
  /* voice: the head lifts and the neck stretches (20), the mouth opens as the note opens (21, 22) and closes as it falls away */
  return{paint:ox,frame:oxFr,reach:OX_REACH,stance:OX_STANCE,stride:OX_STRIDE,beat:OX_BEAT,voice:[[0,20],[200,21],[420,22],[1050,21],[1300,20],[1520,0]],sound,sw:22}})();
/* ================================================================ end of the ox ============================================================== */


/* --- common to all: placing, the voice --- */
const KINDS={donkey:DONKEY,mule:MULE,ox:OX},VOICE={};
const speak=(id,kind)=>{const K=KINDS[kind];try{K.sound()}catch(e){}VOICE[id]={K,t0:performance.now()};const end=K.voice[K.voice.length-1][0];
  return new Promise(res=>setTimeout(()=>{if(VOICE[id]&&VOICE[id].K===K)delete VOICE[id];res()},end))};
const pose=(id,fr)=>{const v=VOICE[id];if(!v)return fr;const ms=performance.now()-v.t0,V=v.K.voice;if(ms>=V[V.length-1][0]){delete VOICE[id];return fr}
  let f=fr;for(const[t,q]of V)if(ms>=t)f=q;return f||fr};
const place=(kind,K)=>(g,x,y,dir,fr,load,lit)=>figure(g,x,y,lit,kind+dir+'|'+fr+'|'+load,s=>K.paint(s,0,0,dir,fr,load),K.sw);
return{donkey:place('donkey',DONKEY),mule:place('mule',MULE),
  ox:(g,x,y,dir,fr,c,gar,lit)=>figure(g,x,y,lit,'ox'+dir+'|'+fr+'|'+c+(gar?'g':''),s=>OX.paint(s,0,0,dir,fr,c,gar),OX.sw),
  frame:{donkey:DONKEY.frame,mule:MULE.frame,ox:OX.frame},paint:{donkey:DONKEY.paint,mule:MULE.paint,ox:OX.paint},kinds:KINDS,speak,pose,
  DONKEY_STRIDE:DONKEY.stride,DONKEY_BEAT:DONKEY.beat}})();
