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
  /* A small grey-brown pack donkey, seen from the side with its head turned a little toward us, so that both long ears read: the near
     one shows its pale inside, the far one its back. Dark rims and tips to the ears, a short erect dark mane, a dark stripe along the
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
  const HEAD={rest:{px:29,py:-64,al:58,jaw:0,ear:0},20:{px:28,py:-65.5,al:24,jaw:0,ear:1},21:{px:27,py:-64.5,al:-2,jaw:22,ear:1},
    22:{px:27,py:-64.5,al:-7,jaw:40,ear:1},23:{px:29,py:-64.5,al:38,jaw:0,ear:.4}};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  function donkey(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>=1&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0,
      tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,HP=Object.assign({},HEAD[fr>=20?fr:'rest']);HP.py+=o+hd;HP.px+=hd*.4;
    /* the picture is built in a buffer first: color, nearness (z) and part of every pixel; then laid down */
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const put=(px,py,z,col,part)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;if(z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return 0;return Pb[(py+Y0)*FW+px+X0]};
    const set=(px,py,col)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=99}};
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
    /* the head: cranium, cheek, face and pale muzzle, and the lower jaw on its hinge, which opens for the bray */
    const a=HP.al*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,Wp=(u,v)=>[HP.px+u*ux+v*vx,HP.py+u*uy+v*vy],hm=coat(0);
    {const[c0,c1]=Wp(2.5,2.2);ell(c0,c1,1,6.5,6,6,a,hm,3)}
    {const[c0,c1]=Wp(8.5,5.6);ell(c0,c1,1.5,7,5.8,5.5,a,hm,3)}
    {const[a0,a1]=Wp(3,.6),[b0,b1]=Wp(18,1.6);cap(a0,a1,5.2,b0,b1,4.2,1.5,hm,3)}
    {const[c0,c1]=Wp(20.5,2.4);ell(c0,c1,1.2,4.6,4.2,4.6,a,pale,3)}
    const ja=HP.jaw*Math.PI/180,hu=10,hv=6,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v));
    {const[h0,h1]=Wp(hu,hv),[c0,c1]=Wr(19.5,6.2);cap(h0,h1,3.6,c0,c1,2.3,1,hm,3);ell(c0,c1,1.3,3,2.2,3,a+ja,pale,3)}
    if(HP.jaw){/* the open mouth: dark within, the teeth along both jaws */
      const Q=[Wp(12,5.6),Wp(24.4,5.4),Wr(22.5,3.6),Wr(12,4.6)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let c=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(px,py,-1,INNER,3)}
      for(let u=15;u<=22.5;u+=.5){const[p,q]=Wp(u,6.3);put(p,q,-.5,'#e2d8c2',3);const[r,s]=Wr(u+.5,3.2);put(r,s,-.5,'#cfc4ac',3)}}
    /* the neck: overlapping rounds from the shoulders to the head, its crest a little arched; and its short erect mane */
    const NK=[];{const[ax,ay]=Wp(4.5,4.5),bx=15,by=-45+o,cx=(bx+ax)/2-2,cy=(by+ay)/2-2;
      for(let i=0;i<=16;i++){const t=i/16,nx=(1-t)*(1-t)*bx+2*t*(1-t)*cx+t*t*ax,ny=(1-t)*(1-t)*by+2*t*(1-t)*cy+t*t*ay,r=9-4*t;NK.push([nx,ny,r]);ell(nx,ny,-2,r,r,r,0,hm,2)}}
    /* the ears: long and upright, or laid back as it brays; the near one shows its pale inside, the far one its back */
    const ear=(bx,by,ang,len,near)=>{const ex=Math.cos(ang),ey=Math.sin(ang),R=len+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=3.3*Math.sin(Math.PI*(t*.8+.2));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.8)col=DARK;else if(Math.abs(s)>hw-1)col=near?DARK2:DARK;
        else if(near&&t>.14&&Math.abs(s)<hw-1.6)col=PALE[l<0?1:2];
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,near?0:1)];
        put(px,py,near?12:-6,col,6)}};
    {const e=HP.ear,up=-Math.PI/2,bk=Math.PI+.5;ear(HP.px+2.5,HP.py-1.5,up+.2+(bk-up-.05)*e,14,0);ear(HP.px-1.5,HP.py-.5,up-.15+(bk-up+.1)*e,15,1)}
    for(let i=3;i<NK.length;i++){const[cx,cy,r]=NK[i],[px0,py0]=NK[i-1],dx=cx-px0,dy=cy-py0,L=Math.hypot(dx,dy)||1,nx=dy/L,ny=-dx/L,s=nx*0+ny<0?1:-1,
        rx=cx+nx*s*(r-1.6),ry=cy+ny*s*(r-1.6),h=i%3?2.4:1.8;cap(rx,ry,1,cx+nx*s*(r+h),cy+ny*s*(r+h),.9,30,()=>i%4===1?DARK2:DARK,8)}
    /* the eye in its pale ring, the nostril, and the line of the closed mouth */
    {const[e0,e1]=Wp(6.4,-1.6),X=Math.floor(e0),Y=Math.floor(e1);if(partAt(X,Y)===3){for(const[dx,dy]of[[-1,0],[-1,1],[2,0],[2,1],[0,2],[1,2]])set(X+dx,Y+dy,PALE[2]);
        for(const dx of[-1,0,1,2])set(X+dx,Y-1,COAT[3]);set(X,Y,'#1a1410');set(X+1,Y,'#1a1410');set(X,Y+1,'#2a201a');set(X+1,Y+1,'#1a1410')}}
    for(const[u,v,c]of[[22.2,1.3,'#4a4038'],[23,1.9,'#2e2622'],[23.5,2.7,'#2e2622']]){const[n0,n1]=Wp(u,v);set(n0,n1,c)}
    if(!HP.jaw)for(let u=17;u<=23.6;u+=.5){const[p,q]=Wp(u,4.5);if(partAt(Math.floor(p),Math.floor(q))===3)set(p,q,'#7a7064')}
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
  /* for now the donkey's painter, until the mule has one of its own */
  const mule=(g,x,y,dir,fr,load)=>DONKEY.paint(g,x,y,dir,fr,load);
  return{paint:mule,frame:DONKEY.frame,reach:DONKEY.reach,stance:DONKEY.stance,stride:DONKEY.stride,beat:DONKEY.beat,voice:[[0,0],[650,0]],sound:DONKEY.sound,sw:15}})();
/* =============================================================== end of the mule ============================================================= */


/* ================================================================== the ox ================================================================== */
const OX=(()=>{
    /* An ox or a bull, in the pixel manner of the engine's pack donkey and seen from the side. c: its coat. gar: a garland of leaves round its neck.
       Every part grows out of the one before it: the tail is set on at the top of the rump and lies along it before it hangs free, the crest of
       the shoulders sits on the back, and the neck is painted in the same bands of tone as the body it comes out of, so that no seam shows. */
    const OX_HEAD=["......www.............","....wwW.ww............","...wwW................","...wWhhhhhhh..........",".eehhHHHHHhhh.........","eEehHHHHHHHhhh........",".eehHHHkHHHHHhhh......",
      "..dhHHHHHHHHHHhhhh....","..dhhHHHHHHHHHHhhhmm..","..dhhhHHHHHHHHHhhmmmm.","...dhhhhHHHHHHhhmmmMmm","...ddhhhhhhhhhhhmmMMmm","....ddhhhhhhhhhhmmmnmm",".....dddhhhhhhhhmmmmm.",".......ddddhhhhdmmmm..","...........dddd.mmm..."];
    function ox(g,x,y,dir,fr,c,gar){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
      const px=(a,b,col,w,h)=>{g.fillStyle=col;g.fillRect(a,b,w||1,h||1)},D=ramp(c),hoof='#2a2018',s=fr===1?3:fr===3?-3:0,o=fr%2?-1:0;
      /* hw: the half-width of the barrel of the body in each row. band: the tone a row is painted in, for the body and the neck alike. */
      const hw=yy=>{const dy=(yy+43.5)/16.5;return Math.round(34*Math.sqrt(Math.max(0,1-dy*dy*.9)))},band=yy=>yy<-55?1:yy<-46?2:yy<-35?3:4;
      /* back: the line of the back, rising to the crest of the shoulders */
      const back=xx=>-60-2.6*Math.exp(-Math.pow((xx-18)/7,2));
      /* a leg: the far ones start under the belly. The near ones start higher, inside the body, and are painted in the body's own tones as far
         down as the belly, so that haunch and shoulder grow out of it instead of being laid on top */
      const leg=(lx,sh,far)=>{const y0=(far?-30:-37)+o,n=-3-y0;for(let i=0;i<n;i++){const yy=y0+i-o,t=i/(n-1),cx=lx+Math.round(sh*t*t),w=t<.36?9:t<.64?7:6,x0=cx+(t<.36?0:1);
          for(let k=0;k<w;k++){const u=(k+.5)/w;px(x0+k,y0+i,D[!far&&yy<-27?Math.min(4,band(yy)+(u<.22?1:0)):Math.min(4,(u<.22?4:u<.5?3:u<.82?2:1)+(far?1:0))])}}
        px(lx+Math.round(sh)+1,-3,hoof,7,3);px(lx+Math.round(sh)+6,-3,'#4a3a2c',2)};
      leg(-22,s,1);leg(17,-s,1);
      /* the tail */
      for(let yy=-57;yy<=-24;yy++){const i=yy+57,tuft=yy>-31;px(tuft?-38:yy<-44?-hw(yy)-3:-37,yy+o,tuft?hoof:D[i%4?3:4],tuft?4:2)}
      /* the body: a deep barrel, lit along the back */
      for(let yy=-60;yy<=-27;yy++){const w=hw(yy);for(let xx=-w-1;xx<=w-1;xx++)px(xx,yy+o,D[Math.min(4,band(yy)+(xx<-w+3?1:0))])}
      /* the crest of the shoulders, on the line of the back */
      for(let xx=2;xx<20;xx++){const yb=Math.round(back(xx));let top=-60;while(hw(top)<xx+1)top++;if(top>yb)px(xx,yb+o,D[1],1,top-yb)}
      leg(-30,-s,0);leg(23,s,0);
      /* a thick neck, from the shoulders to the poll, with the dewlap hanging under it */
      for(let xx=20;xx<=44;xx++){const t=(xx-20)/24,y0=Math.round(back(xx)+2*t),y1=Math.round(-29-19*t+1.8*Math.sin(t*Math.PI));
        for(let yy=y0;yy<=y1;yy++)px(xx,yy+o,D[yy===y0?1:yy>=y1-1?4:band(yy)])}
      /* the head, carried low and forward: one horn in a crescent, an ear behind it, a broad pale muzzle */
      stamp(g,OX_HEAD,38,-62+o,{h:D[2],H:D[1],d:D[3],e:D[3],E:mix(c,'#6a4a40',.55),k:'#1a120c',m:mix(c,'#d8c8b8',.5),M:'#e6dccc',n:hoof,w:'#efe4c8',W:'#b8a888'});
      /* a garland: leaves and a few yellow flowers in a band round the neck, hanging a little below the throat */
      if(gar)for(let i=0;i<11;i++){const gx=28+Math.round(i*.75),gy=-61+o+i*2;px(gx,gy,i%2?'#4f7a3a':'#6f9a4a',6,2);px(gx+1,gy,'#8fb45a',2);if(i%3===1)px(gx+3,gy,'#f0d060',2,2)}
      g.restore()}
  const sound=()=>{tone({f:110,to:92,d:.9,type:'sawtooth',v:.06})};
  return{paint:ox,frame:DONKEY.frame,reach:DONKEY.reach,stance:DONKEY.stance,stride:DONKEY.stride,beat:DONKEY.beat,voice:[[0,0],[900,0]],sound,sw:17}})();
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
