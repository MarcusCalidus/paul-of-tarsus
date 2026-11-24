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
       legs on larger hooves, a longer neck carried higher, with a short upright mane; its head is a donkey's made a little longer and
       finer, broad in the forehead and deep in the jaw, with a big pale muzzle and a large eye in a pale ring, ears long but shorter
       than a donkey's, and a tail that grows long hair from high up. Its coat is a dark bay: a brown body, the mane, the tail and
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
    /* poses of the head: the poll (px, py), the slant of the face below the level (al, degrees), how far the lower jaw is open (jaw,
       degrees), and the ears (ear: 0 up, 1 laid back along the neck). At rest the face runs steeply down and forward; braying, the head
       goes up with the muzzle forward and up, the jaw drops open and the ears lie back. */
    const HEADS={0:{px:43,py:-82,al:58,jaw:0,ear:0},20:{px:44,py:-85,al:26,jaw:0,ear:1},21:{px:45,py:-85,al:4,jaw:20,ear:1},
      22:{px:45,py:-85,al:-4,jaw:36,ear:1},23:{px:44,py:-84,al:22,jaw:12,ear:.6}};
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
      const HP=HEADS[fr>=20?Math.min(23,fr):0],a=(HP.al+hd*2)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),PX=HP.px+hd*.4,PY=HP.py+o+hd;
      const wx=(u,v)=>PX+u*ca-v*sa,wy=(u,v)=>PY+u*sa+v*ca;
      /* the neck: from the withers and the chest up to the poll and the throat, its crest arched, lit along the crest and dark under the throat */
      const c0=[11,-61+o],c2=[wx(-1,-1.5),wy(-1,-1.5)],c1=[c0[0]+(c2[0]-c0[0])*.4-2,c2[1]+(c0[1]-c2[1])*.38-3],t0=[37,-45+o],t1=[wx(4,13),wy(4,13)];
      const crest=s=>[(1-s)*(1-s)*c0[0]+2*s*(1-s)*c1[0]+s*s*c2[0],(1-s)*(1-s)*c0[1]+2*s*(1-s)*c1[1]+s*s*c2[1]],poly=[];
      for(let i=0;i<=16;i++)poly.push(crest(i/16));poly.push(t1,t0,[30,-40+o]);
      const inPoly=(x,y)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
      const dSeg=(x,y,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy))),ex=x-a[0]-dx*t,ey=y-a[1]-dy*t;return Math.sqrt(ex*ex+ey*ey)};
      for(let yy=Math.floor(Math.min(c2[1],t1[1])-2);yy<=t0[1]+1;yy++)for(let xx=10;xx<=Math.ceil(Math.max(t0[0],t1[0],c2[0]))+2;xx++){const X=xx+.5,Y=yy+.5;
        if(!inPoly(X,Y)||inBody(X,Y-o))continue;let dc=1e9;for(let i=0;i<16;i++)dc=Math.min(dc,dSeg(X,Y,poly[i],poly[i+1]));const s=dc/(dc+dSeg(X,Y,t0,t1));
        px(xx,yy,D[s<.14?1:s<.5?2:s<.8?3:4])}
      /* the mane: a short dark upright brush along the crest, from the withers up to between the ears, a few hairs catching the light */
      for(let i=1;i<=31;i++){const s=i/31,[mx,my]=crest(Math.min(s,.99)),[nx,ny]=crest(Math.min(1,s+.02)),dx=nx-mx,dy=ny-my,l=Math.hypot(dx,dy)||1,ux=dy/l,uy=-dx/l,h=2+(i%3===1?1:0);
        for(let j=0;j<=h;j++)px(Math.round(mx+ux*j),Math.round(my+uy*j),j===h&&i%4===2?PT[1]:PT[j?2:3])}
      /* The head, a donkey's head made a little longer and finer, seen three-quarters toward us as the body is: a broad flat forehead and
         the front of the face catch the light, the near cheek is a deep round jaw, and the face runs down and forward to a big pale mealy
         muzzle, its lowest and frontmost part, with the nostrils on its front and the mouth under it. It is built of rounded masses, each
         lit from the front and above by its own surface, in a buffer of its own (color and nearness of every pixel), and laid down over
         the neck: where two masses meet the nearer one wins. The lower jaw turns on its hinge to open the mouth as the mule brays. */
      const HB=new Map(),put=(x,y,z,col,part)=>{x=Math.floor(x);y=Math.floor(y);const k=x*1024+y,h=HB.get(k);if(!h||z>h.z)HB.set(k,{x,y,z,col,part})},
        partAt=(x,y)=>{const h=HB.get(Math.floor(x)*1024+Math.floor(y));return h?h.part:0},set=(x,y,col)=>{const h=HB.get(Math.floor(x)*1024+Math.floor(y));if(h)h.col=col};
      const tn=(nx,ny,nz,x,y,ex)=>{const s=nx*.5-ny*.7+nz*.5+((x+y)&1?.03:-.03);return Math.min(4,(s>.86?0:s>.62?1:s>.3?2:s>-.05?3:4)+(ex||0))},
        hm=(nx,ny,nz,x,y)=>D[tn(nx,ny,nz,x,y)],pale=(nx,ny,nz,x,y)=>M[Math.max(0,Math.min(4,tn(nx,ny,nz,x,y)-1))];
      const ellH=(cx,cy,cz,A,B,C,th,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(A,B)+1;
        for(let y=Math.floor(cy-R);y<=cy+R;y++)for(let x=Math.floor(cx-R);x<=cx+R;x++){const X=x+.5-cx,Y=y+.5-cy,u=(X*co+Y*si)/A,v=(-X*si+Y*co)/B,q=1-u*u-v*v;if(q<0)continue;
          const w=Math.sqrt(q),lx=u/A,ly=v/B,lz=w/C,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz);put(x,y,cz+C*w,mat(nx/l,ny/l,lz/l,x,y),part)}};
      const capH=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
        for(let y=Math.floor(Math.min(y0,y1)-R);y<=Math.max(y0,y1)+R;y++)for(let x=Math.floor(Math.min(x0,x1)-R);x<=Math.max(x0,x1)+R;x++){
          const X=x+.5-x0,Y=y+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
          const kk=d/r,w=Math.sqrt(1-kk*kk);put(x,y,cz+r*w,mat(ex/r,ey/r,w,x,y),part)}};
      const Wp=(u,v)=>[wx(u,v),wy(u,v)];
      /* cranium with its broad forehead, the deep jaw of the near cheek, the long face, and the muzzle */
      {const[c0,c1]=Wp(3,2.2);ellH(c0,c1,1,7.6,7,7,a,hm,3)}
      {const[c0,c1]=Wp(9.5,6.4);ellH(c0,c1,1.5,8.2,6.8,6.2,a,hm,3)}
      {const[a0,a1]=Wp(3.5,.5),[b0,b1]=Wp(21,1.8);capH(a0,a1,6,b0,b1,4.8,1.5,hm,3)}
      {const[c0,c1]=Wp(24,2.8);ellH(c0,c1,1.2,5.4,5,5.4,a,pale,3)}
      /* the lower jaw on its hinge, with the pale chin */
      const ja=HP.jaw*Math.PI/180,hu=11.5,hv=7,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v));
      {const[h0,h1]=Wp(hu,hv),[c0,c1]=Wr(22.5,7.2);capH(h0,h1,4.2,c0,c1,2.7,1,hm,3);ellH(c0,c1,1.3,3.5,2.6,3.5,a+ja,pale,3)}
      if(HP.jaw){/* the open mouth: dark within, the teeth along both jaws */
        const Q=[Wp(13.5,6.5),Wp(28.4,6.3),Wr(26.2,4.2),Wr(13.5,5.4)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
        for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){let c=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>y+.5!==yj>y+.5&&x+.5<(xj-xi)*(y+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(x,y,-1,MOUTH,3)}
        for(let u=17.5;u<=26.5;u+=.5){const[p,q]=Wp(u,7.3);put(p,q,-.5,TEETH,3);const[r,s]=Wr(u+.5,3.8);put(r,s,-.5,'#cbbfa4',3)}}
      /* the ears: long, set wide apart at the top of the head in a V, or laid back along the neck as it brays. The near one shows its
         pale inside with a dark rim and tip; the far one is seen from behind, in the coat, darker, with a dark tip */
      const ear=(bx,by,ang,len,near)=>{const ex=Math.cos(ang),ey=Math.sin(ang),R=len+4;
        for(let y=Math.floor(by-R);y<=by+R;y++)for(let x=Math.floor(bx-R);x<=bx+R;x++){const X=x+.5-bx,Y=y+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
          const hw=3.1*Math.sin(Math.PI*(t*.8+.2));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
          if(t>.8)col=PT[near?2:3];else if(Math.abs(s)>hw-1)col=near?PT[3]:PT[2];
          else if(near&&t>.14&&Math.abs(s)<hw-1.6)col=M[l<0?1:2];
          else col=D[tn(-ey*l*.7,ex*l*.7,.7,x,y,near?0:1)];
          put(x,y,near?12:-6,col,6)}};
      {const e=HP.ear,up=-Math.PI/2,bk=Math.PI+.5;ear(PX+2.5,PY-1.5,up+.24+(bk-up-.05)*e,13.5,0);ear(PX-1.5,PY-.5,up-.2+(bk-up+.1)*e,14.5,1)}
      /* the brush of the mane goes on between the ears, onto the poll */
      for(let i=0;i<4;i++){const[fx,fy]=Wp(-1+i*.9,-2.2-i*.2);capH(fx,fy,.8,fx-.4,fy-2.6+i*.3,.7,8,()=>i%2?PT[3]:PT[2],8)}
      /* a halter: a noseband round the face and a headstall behind the ears, apart, so that no strap crosses another or the line of the face */
      for(let v=-6;v<=10;v+=.3)for(let du=0;du<=1.2;du+=.3){const[p,q]=Wp(18+du,v);if(partAt(p,q)===3)set(p,q,v<-2.5?STRAP_LIT:STRAP)}
      for(let v=.5;v<=13;v+=.35){const[p,q]=Wp(-1.6,v);if(partAt(p,q)===3)set(p,q,STRAP)}
      /* the eye, large and dark in its pale ring, under a dark brow; the nostrils on the front of the muzzle; the line of the closed mouth */
      {const[e0,e1]=Wp(7.6,-1.4),X=Math.floor(e0),Y=Math.floor(e1);if(partAt(X,Y)===3){for(const[dx,dy]of[[-1,0],[-1,1],[3,0],[3,1],[0,2],[1,2],[2,2]])set(X+dx,Y+dy,M[1]);
          for(const dx of[-1,0,1,2,3])set(X+dx,Y-1,D[4]);set(X,Y,EYE);set(X+1,Y,EYE);set(X+2,Y,'#4e3e36');set(X,Y+1,'#2a1e18');set(X+1,Y+1,EYE);set(X+2,Y+1,EYE)}}
      for(const[u,v,c]of[[26,1.1,M[4]],[26.8,1.7,'#2a1e18'],[27.4,2.5,'#2a1e18'],[27.6,3.3,M[4]]]){const[n0,n1]=Wp(u,v);set(n0,n1,c)}
      if(!HP.jaw)for(let u=20;u<=27.6;u+=.5){const[p,q]=Wp(u,5.8);if(partAt(p,q)===3)set(p,q,M[4])}
      for(const h of HB.values())px(h.x,h.y,h.col);
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
  /* A working ox or a bull, the heaviest of the animals, drawn after the maintainer's reference picture and seen from the side: a
     massive body, the back running level from a square rump to the high, heavy hump over the shoulder, the chest deep and low between
     the forelegs, a thick neck with the dewlap hanging under it in a soft fold from the throat to the brisket; the head carried low and
     forward, clear of the shoulder, turned three-quarters toward us; stout legs, darker below the knee and the hock, on dark cloven
     hooves; a thin tail. The belly line is kept clean. The withers stand about 38 room pixels above the hooves, the horn tips about 43,
     and it is about 60 long.
     How it is painted. The picture is built in a buffer of color and nearness (z), and the nearer pixel wins. The body and the neck are
     one smooth surface between the line of the back (top) and the underline (bot), whose nearness rises as a rounded section between
     them, with the shoulder, the haunch and the crest swelling out of it. Its light is laid out as in the reference, in flat bands
     (bodyTone): the light tone along the top of the back and the crest, one soft lit round slanting down the shoulder from the hump and
     one along the hip; the side in the coat's own tone; a darker tone only in the lower third (the belly, under the chest and the
     throat, behind the elbow) and down the back of the thigh. The legs are rounded limbs in flat bands too (lt): lit in front, the
     coat's tone, shaded behind; the far ones a tone darker. The head, the horns, the ears and the tail are rounded masses, each lit by
     its own surface from the front and above, the forehead and the long face a tone lighter, so that the face is the brightest and
     most readable part of the ox; the muzzle is placed pixel by pixel (MUZ). Every edge between two tones is a checker a pixel or two
     wide, and no outline is drawn (sprite() darkens the edge).
     c: its coat, from which every tone is taken (its light tones are the coat brightened in its own hue, warm and not grey), so that the
     brown oxen of Zenon's wagon and the near-white bulls of Lystra are the same painter. gar: a garland of leaves and yellow flowers
     round the neck (Acts 14:13).
     Every part grows out of the one before it: the near thigh runs down out of the rump to a pointed hock, the forearm grows out from
     under the chest, the neck carries on into the head (also when it is lifted), the horns grow thick out of the corners of the poll
     with a tuft of darker hair between them, and the tail is set on at the top of the rump and hangs close behind the thigh, behind
     the near hind leg, to its dark switch at the hock.
     Crosses: the horns are crescents, thick at the root, that curve out, up and a little in from the corners of the poll, which is the
     top of the head, and no horn stands straight over a level line; the ears droop out to the sides below them, short, each on its own
     side, and cross nothing; the eye is a small block, never a one-pixel-high ellipse; there is no stripe over the shoulders; the
     garland hangs round the neck in a wide curve, from behind the head down over the dewlap and up under the jaw, and crosses no line
     or crease.
     fr 0 stands. fr 4 to 19 are the sixteen frames of its walk (frame below gives the frame for a distance walked); 1, 2 and 3 are three
     moments of that walk, a quarter of a cycle apart, for a scene that counts frames itself. The walk has four beats: near hind, near
     fore, far hind, far fore, each a quarter of the cycle after the one before. A hoof stands on the ground for OX_STANCE of the cycle,
     going back under the body, and swings forward for the rest, lifted, with the hock or the knee bent. The two legs of a pair leave the
     body at one place and open like a pair of compasses, and never cross as an X under the belly. A heavy beast plods: the body sinks a
     pixel as each fore hoof takes its weight, the hip and the shoulder roll up a pixel in turn over the leg that stands under them, the
     head sways a pixel forward and back and dips with the fore hooves, the dewlap swings after it, and the tip of the tail swings.
     fr 20 to 22 are its voice (see voice and sound): 20 the head lifted a little about the top of the neck and the muzzle pushed
     forward, the mouth shut; 21 the lower jaw dropping; 22 the mouth wide open and the dewlap drawn taut. */
  /* The numbers of the walk. A hoof reaches OX_REACH drawing units (two to a room pixel) from the front of its step to the back, and stands
     on the ground for OX_STANCE of the cycle. So one cycle carries the ox OX_STRIDE room pixels with its hooves planted: 40 / .62 / 2 =
     32.3. A cycle is never quicker than OX_BEAT seconds: up to 32.3 / .67 = 48.1 room pixels a second, just above WALK_V, the hooves stay
     exactly where they are set down (no slip at all), and a cycle takes two thirds of a second, a plod and not a scurry.
     frame(dist, v): the frame of the walk after dist room pixels at v room pixels a second (WALK_V if none is given). */
  const OX_REACH=40,OX_STANCE=.62,OX_STRIDE=OX_REACH/OX_STANCE/2,OX_BEAT=.67;
  const oxFr=(dist,v)=>{const c=Math.max(OX_STRIDE,Math.abs(v==null?WALK_V:v)*OX_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  /* the head in each pose: rot, how far it is lifted about the top of the neck (degrees; the muzzle comes up and forward), dx and dy a
     shift, jaw how far the lower jaw drops (degrees), and sag how loose the dewlap hangs (1 at rest, less as the neck is stretched) */
  const HEAD={0:{rot:0,dx:0,dy:0,jaw:0,sag:1},20:{rot:-10,dx:1,dy:-1,jaw:0,sag:.75},21:{rot:-16,dx:1.5,dy:-1.5,jaw:10,sag:.55},22:{rot:-20,dx:2,dy:-2,jaw:22,sag:.4}};
  function ox(g,x,y,dir,fr,c,gar){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>0&&fr<20,k=fr>=4&&fr<20?(fr-4)%16:W?(fr-1)*4:0,ph=k/16,HP=HEAD[fr>=20?fr:0]||HEAD[0];
    /* the beats: o, the body sinks a pixel as each fore hoof takes the weight; hd, the head dips with it and a frame after; sway, the head
       a pixel forward and back over the cycle; rl and rs, the hip and the shoulder rise a pixel over the leg that stands under them; tl,
       the tip of the tail; dw, the swing of the dewlap */
    const o=W&&(k%8===5||k%8===6)?1:0,hd=W&&(k%8===6||k%8===7)?1:0,sway=W?Math.round(Math.cos(6.2832*(ph-.2))):0,
      rl=W&&(k>=1&&k<=4)?-1:0,rs=W&&(k>=5&&k<=8)?-1:0,tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,dw=W?Math.sin(6.2832*(ph-.35)):0;
    /* the tones, all taken from the coat: the coat itself, the lower legs a good deal darker, the muzzle pale, the switch of the tail
       dark; the hooves dark grey and the horns pale cream, the same on every coat */
    const warm=(cc,f)=>{const[r,g2,b2]=hex(cc);return toHex(Math.min(255,r*(1+f)+6*f),Math.min(255,g2*(1+f*.9)+4*f),Math.min(255,b2*(1+f*.7)))},
      COAT=((R0)=>[warm(c,.42),warm(c,.2),c,R0[3],R0[4]])(ramp(c)),LOW=ramp(mix(c,'#24160f',.5)),
      MZ=[mix(c,'#c0aea0',.6),mix(c,'#a89488',.6),mix(c,'#5e5a56',.6),mix(c,'#30302c',.7),mix(c,'#0c0806',.85)],SW=ramp(mix(c,'#1a110c',.65)),HOOF=ramp('#4a4440'),
      HORN=ramp('#e2d8bc'),MID=ramp('#b4a688'),TIP=ramp('#5a4c3c');
    /* the picture is built in a buffer first: color, nearness (z) and part of every pixel; then laid down */
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const idx=(px,py)=>(py>=0||py<-Y0||px<-X0||px>=FW-X0)?-1:(py+Y0)*FW+px+X0;
    let LIM=null;const put=(px,py,z,col,part)=>{if(LIM!=null&&py<LIM)z-=60;const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{const i=idx(Math.floor(px),Math.floor(py));return i<0?0:Pb[i]};
    const set=(px,py,col)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&Pb[i])Cb[i]=col};
    /* the light falls from the front and above: s, how much a surface with normal (nx, ny, nz) faces it, gives the tone; near the edge
       between two tones the pixels take one or the other as a checker */
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.42-ny*.86+nz*.46+((px+py)&1?.04:-.04);return Math.max(0,Math.min(4,(s>.9?0:s>.64?1:s>.3?2:s>-.04?3:4)+(ex||0)))};
    const lt=(R,ex)=>(nx,ny,nz,px,py)=>{const a=nx+((px+py)&1?.1:-.1);return R[Math.min(4,(ex||0)+(a<-.3?3:a>.55?1:2))]};
    const mat=(R,ex)=>(nx,ny,nz,px,py)=>R[tn(nx,ny,nz,px,py,ex)];
    /* ell: a rounded mass, half-sizes a, b, c, turned by th; sell: a rounded block, its sides flatter (p > 2); cap: a limb from one round
       to another */
    const ell=(cx,cy,cz,a,b,cc,th,m,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),lx=u/a,ly=v/b,lz=w/cc,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz);put(px,py,cz+cc*w,m(nx/l,ny/l,lz/l,px,py),part)}};
    const sell=(cx,cy,cz,A,B,C,th,p,m,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(A,B)*1.2+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/A,v=(-X*si+Y*co)/B,
          au=Math.abs(u),av=Math.abs(v),q=1-Math.pow(au,p)-Math.pow(av,p);if(q<0)continue;const w=Math.pow(q,1/p),
          lx=Math.sign(u)*Math.pow(au,p-1)/A,ly=Math.sign(v)*Math.pow(av,p-1)/B,lz=Math.pow(w,p-1)/C,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz)||1;
        put(px,py,cz+C*w,m(nx/l,ny/l,lz/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,m,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,m(ex/r,ey/r,w,px,py,t),part)}};
    /* HT places a point of the head in its pose: lifted about the top of the neck (PX, PY), shifted, swaying and dipping with the walk */
    const hr=HP.rot*Math.PI/180,hc=Math.cos(hr),hs=Math.sin(hr),PX=36,PY=-62,hox=HP.dx+sway,hoy=HP.dy+o+hd,
      HT=(x,y)=>[PX+(x-PX)*hc-(y-PY)*hs+hox,PY+(x-PX)*hs+(y-PY)*hc+hoy];
    /* at: where the hoof of a leg is at this moment, its beat being off of a cycle after the near hind's: hx before or behind the leg's
       root (st where it stands at rest), lift off the ground, and bend, how far the knee or the hock is flexed */
    const at=(off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=OX_REACH,B=OX_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
      const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(5*q),bend:q}};
    /* leg: from the shoulder or the hip at sx down to the hoof, stout. A fore leg: the thick forearm down to the knee, a straight cannon
       below it, the knee coming forward as the leg folds in its swing. A hind leg: the broad gaskin down to the hock, which stands behind
       the line of the leg and further back as it swings, and the cannon slanting forward from it to the fetlock. Below the knee and the
       hock the leg is dark; a far leg is a tone darker again. The near legs are laid in front of the body only below LIM (under the
       rump, under the chest), so that the thigh runs down out of the rump to a pointed hock and the forearm grows out of the chest with no
       seam; above it the body covers them. They are painted in flat bands (lt): lit in front, the coat's tone, shaded behind. */
    const leg=(sx,P,near,hind)=>{const ex=near?0:1,cz=near?24:-9,up=lt(COAT,ex),lo=lt(LOW,ex),hx=sx+P.hx,fy=-6.5-P.lift,b=P.bend;
      if(hind){const jx=hx-4.6-2.5*b+P.hx*.06,jy=-23-P.lift*.6+o*.5,fx=hx+.4*b,tx=sx-3+P.hx*.12,kx=sx+3+P.hx*.22;LIM=near?-46+o:null;
        cap(tx,-48+o+rl,11,jx,jy,3.6,cz,up,4);cap(kx,-40+o,7.5,jx+1.2,jy-3,3.4,cz,up,4);cap(jx-.6,jy-1.6,2.6,jx-2,jy-3.6,1.7,cz,up,4);
        LIM=null;cap(jx,jy,2.9,fx,fy,2.5,cz,lo,4);foot(fx,fy,b,cz,ex)}
      else{const kx=sx+P.hx*.72+4.5*b,ky=-17-P.lift*.7,ax=sx+P.hx*.25,fx=hx-3.5*b,fy2=fy-1.5*b;LIM=near?-30+o:null;
        cap(ax,-42+o+rs,10,kx,ky,4.6,cz,up,4);LIM=null;ell(kx,ky,cz+.4,3.6,3.4,3.4,0,lo,4);
        cap(kx,ky,3.1,fx,fy2,2.6,cz,lo,4);foot(fx,fy2,b,cz,ex)}};
    /* foot: the fetlock, the dewclaw at its back, the short pastern and the cloven hoof, dark grey, its toe forward */
    const foot=(fx,fy,b,cz,ex)=>{const lo=lt(LOW,ex),hf=mat(HOOF,ex);ell(fx,fy,cz+.3,3.4,3.1,3,0,lo,4);ell(fx-3,fy+.6,cz-.5,1.4,1.5,1.2,0,mat(HOOF,ex+1),4);
      sell(fx+.9+.6*b,fy+4.3-1.5*b,cz+.5,4.8,2.5,3.2,-.35*b,2.4,hf,5)};
    /* the legs: the far ones behind the body, the near ones in front of it; each pair leaves the body at one place */
    const SF=12,SH=-37;
    leg(SH,at(.5,7),0,1);leg(SF,at(.75,7),0,0);leg(SH,at(0,-5),1,1);leg(SF,at(.25,-2),1,0);
    /* the body and the neck, one smooth mass. Its outline: top, the line of the back, level from the square rump to the hump over the
       shoulder and down the crest of the neck to the head; bot, the underline, from the buttock along the belly to the deep chest, up
       the brisket and along the dewlap, which hangs in a soft fold to the throat. Its surface rises as a rounded section between the two
       lines, with the broad round of the shoulder, the haunch and the crest of the neck swelling out of it, and takes the light as one
       surface: broad soft bands, the light on the back, the shoulder and the haunch, the shade under the belly and the throat. */
    const[Tx,Ty1]=HT(39,-49),[Nx,Ny1]=HT(40,-70.5),Ty=Ty1-o,Ny=Ny1-o,SAG=HP.sag;
    const top=xx=>{if(xx<-50){const q=(-50-xx)/6.5;return-69.5+rl+4.5*(1-Math.sqrt(Math.max(0,1-q*q)))}
      if(xx<-6)return-69.5+(xx<-24?rl:0)-1.2*(xx+50)/44;
      if(xx<22)return-70.7-5.4*Math.exp(-Math.pow((xx-9)/10,2))+(xx>-2?rs:0);
      const y22=-70.7-5.4*Math.exp(-1.69),u=Math.min(1,(xx-22)/(Nx-22));return y22+(Ny-y22)*(u*u*(3-2*u))};
    const bot=xx=>{if(xx<-50){const q=(-50-xx)/6.5;return-38-5*(1-Math.sqrt(Math.max(0,1-q*q)))}
      if(xx<-28)return-38+7*(xx+50)/22;
      if(xx<0)return-31+6.5*Math.sin(Math.PI/2*(xx+28)/28);
      if(xx<22)return-24.5+1.2*Math.exp(-Math.pow((xx-12)/8,2));
      if(xx<27){const q=(xx-22)/5;return-24.5-2.5*q*q}
      const u=Math.min(1,(xx-27)/(Tx-27)),s=Math.min(1,Math.max(0,u-dw*.05));return-27+(Ty+27)*u+4.2*SAG*Math.sin(Math.PI*s)};
    const bump=(xx,yy)=>6*Math.exp(-Math.pow((xx-12)/11,2)-Math.pow((yy+54)/13,2))+5*Math.exp(-Math.pow((xx+42)/9,2)-Math.pow((yy+57)/10,2))
      +1.8*Math.exp(-Math.pow((xx-26)/8,2)-Math.pow((yy+62)/8,2))-1.2*Math.exp(-Math.pow((xx-31)/5,2)-Math.pow((yy+42)/5,2));
    /* the light on the body is laid out as the reference has it, in flat bands: the light tone along the top of the back and the crest,
       one soft lit round on the shoulder and one on the hip; the side the coat's own tone; a darker tone only in the lower third (the
       belly, under the chest and the throat, behind the elbow) and down the back of the thigh. Each edge is a checker a pixel or two wide. */
    const sm=(a,b,v)=>Math.max(0,Math.min(1,(v-a)/(b-a))),bodyTone=(xx,yy)=>{const t0=top(xx),b0=bot(xx),r=(yy-t0)/Math.max(1,b0-t0);let L=2;
      const el=(cx,cy,a,b,th)=>{const X=xx-cx,Y=yy-cy,co=Math.cos(th),si=Math.sin(th),u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b;return u*u+v*v};
      L-=sm(6.5,2.5,yy-t0);
      L-=sm(1,.45,el(12,-61,15,7.5,1.2));L-=sm(1,.45,el(-41,-63.5,12,6.5,-.1));L=Math.max(1,L);
      const w=sm(-40,-33,xx);L+=w*sm(.6,.7,r)+w*sm(.86,.94,r);
      L+=.8*sm(1,.4,Math.pow((xx-2)/4.5,2)+Math.pow((yy+31)/7,2));
      L+=sm(-49.5,-52,xx)*sm(-54,-50,yy);
      const k=((Math.floor(xx)+Math.floor(yy))&1)?.2:-.2;return Math.max(0,Math.min(4,Math.round(L+k)))};
    {const BX0=-57,BX1=Math.ceil(Math.max(Tx,Nx))+1,BY0=-80,BY1=-18,bw=BX1-BX0+1,bh=BY1-BY0+1,ZF=new Float32Array(bw*bh);
      const zAt=(xx,yy)=>{const t0=top(xx),b0=bot(xx);if(yy<t0||yy>b0)return 0;const mid=(t0+b0)/2,hh=(b0-t0)/2,v=(yy-mid)/Math.max(1,hh),
          er=xx<-50?Math.sqrt(Math.max(0,1-Math.pow((-50-xx)/6.6,2))):1,D=xx>24?16-4*Math.min(1,(xx-24)/12):17;
        return Math.max(.01,D*er*Math.pow(Math.max(0,1-v*v),.55)+bump(xx,yy)*Math.pow(Math.max(0,1-v*v),.5))};
      for(let j=0;j<bh;j++)for(let i=0;i<bw;i++)ZF[j*bw+i]=zAt(BX0+i+.5,BY0+j+.5-o);
      const zf=(i,j)=>i<0||j<0||i>=bw||j>=bh?0:ZF[j*bw+i];
      for(let j=0;j<bh;j++)for(let i=0;i<bw;i++){const z=ZF[j*bw+i];if(!z)continue;
        const gx=(zf(i+1,j)-zf(i-1,j))/2,gy=(zf(i,j+1)-zf(i,j-1))/2,l=Math.hypot(gx,gy,1),px=BX0+i,py=BY0+j;
        put(px,py,z,COAT[bodyTone(px+.5,py+.5-o)],BX0+i>27&&BY0+j>-50?2:1)}}
    /* the tail: thin, set on at the top of the rump and hanging close behind the thigh to a dark switch at the hock */
    {const T=[[-53,-68],[-56,-65.5],[-57.2,-60],[-57.6+tl*.3,-48],[-57.4+tl*.7,-30]];for(let i=0;i<T.length-1;i++)cap(T[i][0],T[i][1]+o,1.05,T[i+1][0],T[i+1][1]+o,.95,i?3:15,mat(COAT,1),7);
      ell(-57.3+tl,-23.5+o,3,2,6.5,2,0,mat(SW),7)}
    /* behind the head, hidden while it hangs: the neck carried on into it and the throat, for when it is lifted */
    {const[a0,a1]=HT(40,-62),[b0,b1]=HT(40,-50);cap(30,-60+o,10,a0,a1,8,0,mat(COAT),2);cap(29,-44+o,8,b0,b1,6,0,mat(COAT,1),2)}
    /* the head: low and forward, clear of the shoulder, turned three-quarters toward us: the broad forehead and the long face take the
       light and are its brightest part; the cheek and the lower jaw are in the coat's own tone, and the muzzle is broad and pale */
    const E=(x0,y0,cz,a,b,cc,th,m)=>{const[p,q]=HT(x0,y0);ell(p,q,cz,a,b,cc,th+hr,m,3)},Sx=(x0,y0,cz,A,B,C,th,p,m)=>{const[u,v]=HT(x0,y0);sell(u,v,cz,A,B,C,th+hr,p,m,3)};
    Sx(49,-66.8,14,9.6,5.6,4.5,.08,2.6,mat(COAT,-1));
    Sx(54,-56.5,14,6.6,12,4.5,-.4,2.6,mat(COAT,-1));
    E(45,-55.5,12,6.6,7.2,6,0,mat(COAT));
    /* the lower jaw, which drops on its hinge for the low, and the dark mouth inside */
    const jr=HP.jaw*Math.PI/180,JX=42,JY=-50,JT=(x0,y0)=>HT(JX+(x0-JX)*Math.cos(jr)-(y0-JY)*Math.sin(jr),JY+(x0-JX)*Math.sin(jr)+(y0-JY)*Math.cos(jr));
    {const[p,q]=JT(50,-45.4);ell(p,q,12,7.4,2.8,6,.15+hr+jr,mat(COAT,1),3)}
    /* behind the corner of the mouth, under everything else: the dark between the cheek and the lower jaw, so that no gap opens there */
    {const Q=[HT(43,-53),HT(53,-52),JT(53,-45.5),JT(43,-46)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let ins=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)ins=!ins}
        if(ins)put(px,py,-40,COAT[4],3)}}
    if(HP.jaw){const Q=[HT(44,-48),HT(63,-45.5),JT(61,-44.5),JT(44,-47)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let ins=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)ins=!ins}
        if(ins)put(px,py,11.5,py+.5>(Q[2][1]+Q[3][1])/2-1?'#8a4a4a':'#2a1414',3)}}
    /* the horns: thick at the root, out of the corners of the poll, curving out, up and a little in, pale cream darkening to the tips;
       the near one in front of the neck */
    const horn=(P,cz)=>{const n=P.length-1;for(let i=0;i<n;i++){const[a0,a1]=HT(...P[i]),[b0,b1]=HT(...P[i+1]),r0=3.7-2.6*Math.pow(i/n,.8),r1=3.7-2.6*Math.pow((i+1)/n,.8),
      R=i>=n-1?TIP:i>=n-2?MID:HORN;cap(a0,a1,r0,b0,b1,r1,cz,mat(R),8)}};
    horn([[54.5,-69.6],[59.8,-72.2],[62.8,-75.8],[63.2,-80.4],[61.2,-85]],6);
    horn([[42.5,-69.6],[37,-72.2],[34,-75.8],[33.6,-80.4],[35.6,-85]],20);
    /* the ears: short, drooping out to the sides and a little down below the roots of the horns; the near one shows its darker inside
       within a rim of coat, the far one its back */
    const ear=(x0,y0,ang,len,hw,cz,near)=>{const[bx,by]=HT(x0,y0),ea=ang+hr,ex=Math.cos(ea),ey=Math.sin(ea),R=len+hw+1;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const w=hw*Math.pow(Math.sin(Math.PI*(t*.75+.25)),.7);if(Math.abs(s)>w)continue;const l=s/w;
        put(px,py,cz,near&&t>.2&&t<.85&&Math.abs(s)<w-1.1?mix(c,l<0?'#c89c8c':'#a87868',.38):COAT[tn(-ey*l*.6,ex*l*.6-.3,.7,px,py,near?0:1)],6)}};
    ear(57.5,-65.2,.5,6.5,2.5,13,0);ear(41.5,-64.4,Math.PI-.6,8,3,19,1);
    /* the tuft of darker hair on the poll between the horns */
    for(const[dx,dy,t]of[[1,0,3],[2,0,4],[3,0,3],[0,1,3],[1,1,4],[2,1,3],[3,1,4],[4,1,3],[1,2,3],[2,2,3],[3,2,3]]){const[p,q]=HT(46+dx,-73+dy);set(p,q,COAT[t])}
    /* the eye under the shade of its lid, high on the near side of the face, dark with a light catch */
    {const[e0,e1]=HT(47,-60.2),X=Math.round(e0),Y=Math.round(e1);for(const dx of[-1,0,1,2,3])set(X+dx,Y-1,COAT[3]);set(X-2,Y,COAT[3]);
      set(X,Y,'#140e0a');set(X+1,Y,'#d8d0c0');set(X+2,Y,'#140e0a');set(X-1,Y,'#2a1c16');set(X,Y+1,'#1e1410');set(X+1,Y+1,'#1e1410');set(X+2,Y+1,COAT[3])}
    /* the muzzle, after the reference, placed pixel by pixel: MUZ is its map, a row to a pixel from the top of the muzzle (drawing
       y -53) to under the chin, a column to a pixel from drawing x 47. The top of the muzzle carries on the lit face; below it the broad
       muzzle, pale on top (p), a tone darker on its lit side (q), and shaded (r, s) on its front and below; the dark nostril (t) a comma
       on the side of it, set back from the front; the dark line of the mouth under it (t), running back into the shadow under the cheek
       (E); the chin and the lower lip in the coat's shade (D) with a greyer front (s, r), and
       the underside of the jaw dark (E). Coat tones A to E, muzzle tones p to t; '.' leaves the pixel as the head painted it and '_'
       clears it. The rows above the mouth line go with the head, the last two with the lower jaw, so that the low opens the mouth
       between them; each pixel looks up the cell it falls in, so the map follows the head when it is lifted. */
    {const MUZ=['...........BBCCD__','........BBBBCCCrs_','.......CCBqqppppqs','......DCBBqtqpppqs','......DCBBqttqqqrs','......DDBBqrtrrrs_',
        '......DCBBrrsssss_','..EEEEEEDDsttttts_','.......EDDDDssr...','.........EEEE.....'],LOW0=8,MX=47,MY=-53,
        tone=ch=>ch>='A'&&ch<='E'?COAT[ch.charCodeAt(0)-65]:MZ['pqrst'.indexOf(ch)];
      const cj=Math.cos(jr),sj=Math.sin(jr),HI=(X,Y)=>{const u=X-hox-PX,v=Y-hoy-PY;return[PX+u*hc+v*hs,PY-u*hs+v*hc]},
        JI=(X,Y)=>{const[a,b]=HI(X,Y);return[JX+(a-JX)*cj+(b-JY)*sj,JY-(a-JX)*sj+(b-JY)*cj]};
      const cell=(l,lower)=>{const i=Math.floor(l[0]-MX),j=Math.floor(l[1]-MY);if(j<0||j>=MUZ.length||i<0||i>=MUZ[0].length||(j>=LOW0)!==lower)return'.';return MUZ[j][i]};
      const[cx0,cy0]=HT(MX+9,MY+5);for(let py=Math.floor(cy0-16);py<=cy0+16;py++)for(let px=Math.floor(cx0-16);px<=cx0+16;px++){
        const up=cell(HI(px+.5,py+.5),false),lo=cell(JI(px+.5,py+.5),true);
        if(up==='_'){const i=idx(px,py);if(i>=0){Pb[i]=0;Zb[i]=38.5}}else if(up!=='.')put(px,py,40,tone(up),3);
        if(lo!=='.'&&lo!=='_')put(px,py,39,tone(lo),3)}}
    /* a garland: leaves set two by two along a cord, slanting either way, and a few yellow flowers among them. It hangs round the neck from
       behind the head, sags in a curve over the dewlap and goes up again under the jaw, where the head hides it. No line crosses it. */
    if(gar){const S=HT(29,-71.5),C1=[19,-52+o],C2=[22,-27+o],E2=HT(43,-48.5),G0='#3f6a32',G1='#4f7a3a',G2='#6f9a4a',G3='#8fb45a',z=18,N=21;
      for(let i=0;i<N;i++){const u=i/(N-1),a0=(1-u)*(1-u)*(1-u),a1=3*u*(1-u)*(1-u),a2=3*u*u*(1-u),a3=u*u*u,
          gx=Math.round(a0*S[0]+a1*C1[0]+a2*C2[0]+a3*E2[0]),gy=Math.round(a0*S[1]+a1*C1[1]+a2*C2[1]+a3*E2[1]),s=i%2,
          P=(a,b,col,ww,hh)=>{for(let j=0;j<(hh||1);j++)for(let q=0;q<(ww||1);q++)put(a+q,b+j,z+(i%3)*.1,col,9)};
        P(gx-2,gy-1,G0,4,3);P(gx-(s?4:0),gy+(s?-1:0),s?G1:G2,4,2);P(gx-(s?3:-1),gy+(s?-1:0),G3,2,1);P(gx+(s?0:-3),gy+1,G1,3,1);
        if(i%5===2){P(gx-1,gy-2,'#e8c040',3,2);P(gx,gy-2,'#fff0a0',1);P(gx-1,gy-1,'#c89a30',1)}}}
    /* lay the buffer down */
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
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
