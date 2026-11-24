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
  /* A small grey pack donkey, drawn after the maintainer's picture: seen from the side, its big head carried high on a fairly upright
     neck and turned three-quarters toward us, so that both long ears read, set in a V: the near one shows its pale inside, the far one its
     back. Dark rims and tips to the ears, a short erect dark mane, a dark stripe along the back from the withers to the tail (and no
     stripe across the shoulders: with the one along the back it would make a cross), a pale ring round the eye, a large pale muzzle with
     a dark nostril and dark lips, a pale band along the belly that runs into the pale inside of the thigh, legs dark grey from the knees
     and hocks down (the far legs darker still), small dark hooves, and a thin tail with a dark tuft that hangs close behind the hind legs.
     It is built of masses traced from the picture: the barrel with its round croup, the haunch and the shoulder over it, the neck, and
     the head of skull and jowl, nose and muzzle, and lower jaw; the legs of tapering limbs. Each mass is a smooth outline, rounded
     toward its edge (mass below), lit from the front and above and laid down pixel by pixel in the five flat tones of ramp(), with a
     checker where one tone gives way to the next. The nearer mass wins, so the haunch and the shoulder stand out from the barrel and
     the near legs from the belly; the neck and the shoulder leave no dark line where they lie over the barrel (fb), and the shoulder
     takes the light on its face, fading into the barrel through a checker. The legs are tapering limbs: a thick forearm, and a thick
     lower thigh that narrows to a pointed hock; a slim cannon, the fetlock, and a small hoof, a wedge that stands flat on the ground and
     turns with the pastern as it swings. The ears, the eye, the mouth (pixel by pixel), the mane, the stripe and the loads are placed
     on top. Ears reach about 41 room pixels above the hooves, the withers about 27.
     load: 0 a saddle blanket held by a girth, 1 pack bags of striped goat hair over it, 2 the bags filled, with two sacks of grain on top;
     -1 nothing at all, bare, only for comparison sheets. The bags carry only stripes that run along them, and no strap crosses
     them. fr 0 stands; 4 to 19 are the sixteen frames of its walk (frame below gives the frame for a distance walked); 1, 2 and 3 are
     three moments of that walk, a quarter of a cycle apart, for a scene that counts frames itself; 20 to 23 are its bray (see voice). */
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
  const COAT=ramp('#7c7068'),PALE=ramp('#c6b8a8'),LOW=ramp('#4c4440'),HOOF=ramp('#433a36'),DARK='#2e2729',DARK2='#4a4240',INNER='#5a2622';
  /* the head at rest, and in the frames of its bray: poll (px, py), the angle of the face below the level (al, degrees), how far the
     lower jaw is open (jaw, degrees), and the ears (ear: 0 up, 1 laid back along the neck) */
  const HEAD={rest:{px:35,py:-65.5,al:62,jaw:0,ear:0},20:{px:35,py:-66.5,al:32,jaw:0,ear:1},21:{px:35.5,py:-67,al:8,jaw:16,ear:1},
    22:{px:35.5,py:-67,al:-2,jaw:28,ear:1},23:{px:35,py:-66,al:47,jaw:0,ear:.4}};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  /* smooth: a closed outline through the points given, n points to a span (Catmull-Rom) */
  const smooth=(P,n=4)=>{const R=[],N=P.length;for(let i=0;i<N;i++){const p0=P[(i+N-1)%N],p1=P[i],p2=P[(i+1)%N],p3=P[(i+2)%N];
    for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;R.push([0,1].map(c=>.5*(2*p1[c]+(p2[c]-p0[c])*t+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*t2+(3*p1[c]-p0[c]-3*p2[c]+p3[c])*t3)))}}return R};
  function donkey(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>=1&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0,
      tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,HP=Object.assign({},HEAD[fr>=20?fr:'rest']);HP.py+=o+hd;HP.px+=hd*.4;
    /* the picture is built in a buffer first: color, nearness (z) and part of every pixel; then laid down */
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const put=(px,py,z,col,part)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;if(z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return 0;return Pb[(py+Y0)*FW+px+X0]};
    const set=(px,py,col)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=50}};
    /* the light falls from the front and above: s, how much a surface with normal (nx, ny, nz) faces it, gives the tone; a checker
       where one tone gives way to the next */
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.5-ny*.7+nz*.5+((px+py)&1?.05:-.05);return Math.max(0,Math.min(4,(s>.9?0:s>.64?1:s>.3?2:s>-.05?3:4)+(ex||0)))};
    const coat=(ex,R)=>(nx,ny,nz,px,py)=>(R||COAT)[tn(nx,ny,nz,px,py,ex)];
    /* mass: a smooth outline P, rounded toward its edge over R units (soft: how far the edge turns away), at depth L; the nearer wins */
    const mass=(P,L,R,mat,part,soft=1)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[a,b]of P){x0=Math.min(x0,a);x1=Math.max(x1,a);y0=Math.min(y0,b);y1=Math.max(y1,b)}const N=P.length;
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const cx=px+.5,cy=py+.5;let inn=false,best=1e9,ex=0,ey=0;
        for(let i=0,j=N-1;i<N;j=i++){const[ax,ay]=P[j],[bx,by]=P[i];if((ay>cy)!==(by>cy)&&cx<(bx-ax)*(cy-ay)/(by-ay)+ax)inn=!inn;
          const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1;let t=((cx-ax)*dx+(cy-ay)*dy)/l2;t=t<0?0:t>1?1:t;const qx=ax+dx*t-cx,qy=ay+dy*t-cy,d2=qx*qx+qy*qy;if(d2<best){best=d2;ex=qx;ey=qy}}
        if(!inn)continue;const d=Math.sqrt(best),q=Math.max(0,1-d/R)*soft,l=d||1,nz=Math.sqrt(1-q*q);put(px,py,L*100+R*nz,mat(ex/l*q,ey/l*q,nz,px,py),part)}};
    /* ell: a small round, half-sizes a, b; cap: a limb from one round to another */
    const ell=(cx,cy,cz,a,b,mat,part)=>{const R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const u=(px+.5-cx)/a,v=(py+.5-cy)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),l=Math.hypot(u,v,w);put(px,py,cz+Math.max(a,b)*w,mat(u/l,v/l,w/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    const B=P=>P.map(([a,b])=>[a,b+o]);
    /* fb: a mass whose back edge lies inside the body turns away only up and down there, so that it leaves no dark line behind it */
    const fb=mat=>(nx,ny,nz,px,py)=>nx<0?mat(0,ny,Math.sqrt(1-ny*ny),px,py):mat(nx,ny,nz,px,py);
    /* at: where the hoof of a leg is at this moment, its beat being off of a cycle after the near hind's: hx before or behind the leg's
       root, lift off the ground, and bend, how far the joint is flexed */
    const at=(off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=REACH,Bs=STANCE;if(p<Bs)return{hx:T/2-T*p/Bs,lift:0,bend:0};
      const v=(p-Bs)/(1-Bs),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:v?2+Math.round(4.5*q):0,bend:q}};
    /* leg: from the shoulder or the hip (sx) down to the hoof. A fore leg is straight while it stands and folds at the knee as it
       swings; a hind leg has its hock behind the line, more so as it swings. From the knee or the hock down the leg is darker, and the far
       legs are a tone darker. Every hoof stands on the ground line, so that a planted hoof stays where it was set down. */
    const leg=(sx,P,near,hind)=>{const L=near?150:-100,ex=near?0:1,gy=0,up0=coat(ex),up=(nx,ny,nz,px,py)=>ny<0?up0(nx,0,Math.sqrt(1-nx*nx),px,py):up0(nx,ny,nz,px,py),lo=coat(ex,LOW),b=P.bend,
        hx=sx+P.hx,fx=hx-.6,fy=gy-5.2-P.lift,tx=sx,ty=-42+o,dx=fx-tx,dy=fy-ty,Ln=Math.hypot(dx,dy),bx=-dy/Ln,by=dx/Ln;
      let jx,jy;
      if(hind){const gx=tx+dx*.33+bx*1.6,gy2=ty+dy*.33+by*1.6;jx=tx+dx*.63+bx*(3+2.5*b);jy=ty+dy*.63+by*(3+2.5*b);
        cap(tx,ty,6.4,gx,gy2,5.4,L,up,4);cap(gx,gy2,5.1,jx,jy,2.6,L,up,4);cap(jx-bx*.4,jy-by*.4,2.4,jx+bx*1.6-dx/Ln*1.2,jy+by*1.6-dy/Ln*1.2,1.2,L+1,lo,4);cap(jx,jy,2.1,fx,fy,1.7,L,lo,4)}
      else{jx=tx+dx*.66-bx*4.5*b;jy=ty+dy*.66-by*4.5*b;/* the forearm grows out from under the shoulder, and never shows past its back edge */
        cap(tx+.8,ty+4,4.6,jx,jy,3,L,up,4);ell(jx,jy,L+1,2.8,2.5,lo,4);cap(jx,jy,2.1,fx,fy,1.75,L,lo,4)}
      ell(fx,fy,L+1,2.1,2,lo,4);
      /* the pastern, and the hoof: flat on the ground while it stands, turned with the pastern while it swings */
      const d0=.3*(1-b)-(hind?.2:.75)*b,d1=(1-b)+(hind?.9:.62)*b,dl=Math.hypot(d0,d1),ux=d0/dl,uy=d1/dl;
      cap(fx,fy,1.7,fx+ux*2.3,fy+uy*2.3,1.7,L,lo,4);
      const hm=(nx,ny,nz,px,py)=>HOOF[Math.min(4,tn(nx,ny,nz,px,py,ex))];
      let Q;if(!P.lift){const cx=fx+ux*2.3;Q=[[cx-1.7,gy-3],[cx+1.5,gy-3],[cx+3,gy],[cx-2.3,gy]]}
      else{const cx=fx+ux*2.2,cy=fy+uy*2.2,vx=uy,vy=-ux;Q=[[cx-vx*1.6,cy-vy*1.6],[cx+vx*1.4,cy+vy*1.4],[cx+vx*2+ux*2.6,cy+vy*2+uy*2.6],[cx-vx*1.9+ux*2.6,cy-vy*1.9+uy*2.6]]}
      mass(Q,L/100+.02,1.2,hm,5,.6)};
    const SF=14.5,SH=-19;
    leg(SH,at(.5,4),0,1);leg(SF,at(.75,5),0,0);leg(SH,at(0,-3.5),1,1);leg(SF,at(.25,-.5),1,0);
    /* the body: the barrel with its round croup and chest; the haunch and the shoulder over it. The belly is pale between the legs,
       and so is the inside of the thigh. */
    const belly=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),Y=py-o,t=(px+3)/14;return Y>=-34.5+t*t*1.4&&px>-18&&px<11?PALE[b<4?1:2]:COAT[b]};
    mass(smooth(B([[11,-54],[3,-53.6],[-5,-54.2],[-11,-55.8],[-16,-56.6],[-21,-55],[-25,-51],[-27.3,-45],[-27.6,-38.5],[-26,-33],[-21,-30.5],[-15,-31.5],
      [-9,-30],[-2,-28.8],[5,-28.8],[10,-30.2],[15,-31],[20,-32.5],[23.5,-36],[24.6,-41],[23,-46.5],[19,-50.5],[15,-53]])),0,9,belly,1);
        mass(smooth(B([[-12,-54],[-17,-56.4],[-21.5,-54.8],[-25.2,-50.8],[-27.4,-45],[-27.7,-38.5],[-26.5,-32.5],[-24,-27],[-19.5,-26.5],[-16.5,-31],[-13.5,-37],[-10.5,-43],[-9.5,-49]])),2,7,(nx,ny,nz,px,py)=>{/* the pale inside of the thigh, along its lower front edge, running into the belly */
      const b=tn(nx,ny,nz,px,py),Y=py-o,e=-13.5-(Y+37)*.57;return Y+((px+py)&1?.8:0)>-35&&px+((px+py)&1?.6:0)>e-2.4?PALE[Math.max(1,Math.min(3,b))]:COAT[b]},1,.7);
    /* the shoulder takes the light on its face, without a line behind it */
    mass(smooth(B([[12.5,-50],[17,-51],[21,-48],[23.8,-43],[24.4,-38.5],[22.8,-34],[18.5,-31],[13.5,-30.5],[10.8,-33],[10.2,-40],[10.8,-46]])),2,6,
      (nx,ny,nz,px,py)=>{const q=Math.hypot(nx,ny),c=(px+py)&1,c4=(px&1)+(py&1)*2;
        return COAT[q<.15?1:q<.35?(c?1:2):q<.55&&c4===0?1:tn(Math.max(0,nx),ny,nx<0?Math.sqrt(1-ny*ny):nz,px,py)]},1);
    /* the tail: set on at the top of the croup, hanging close behind the haunch to its dark tuft */
    {const T=[[-23,-54],[-26.4,-50.6],[-28.4,-45],[-28.9,-38],[-28.9+tl*.4,-30]],tc=coat(1,LOW);for(let i=0;i<T.length-1;i++)cap(T[i][0],T[i][1]+o,1.35,T[i+1][0],T[i+1][1]+o,1.2,120,tc,7);
      ell(-28.9+tl,-24.4+o,121,1.6,5,(nx,ny,nz,px,py)=>(px+py)%3?DARK:DARK2,7)}
    /* the head: big, as long as the neck. A broad skull with a deep, round jowl, a straight face down to a large pale muzzle, the
       lowest and frontmost part of it, and the lower jaw on its hinge, which opens for the bray. u runs down the face from the poll,
       v back toward the jaw; its front, the broad face turned toward us, takes the light. */
    const a=HP.al*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,Wp=(u,v)=>[HP.px+u*ux+v*vx,HP.py+u*uy+v*vy],
      lu=(px,py)=>(px+.5-HP.px)*ux+(py+.5-HP.py)*uy,
      ja=HP.jaw*Math.PI/180,hu=9,hv=7,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v)),
      muz=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py);return lu(px,py)+((px+py)&1?.5:0)>17?PALE[Math.max(1,Math.min(3,b))]:COAT[b]};
    mass(smooth([[-1.8,1],[-.8,-2.6],[2.5,-4.4],[7,-4.8],[11,-4.4],[14,-3.6],[15,3],[14,10.6],[10.5,12],[6.5,11.4],[3,8.8],[.2,5.2]].map(p=>Wp(...p))),3,5,coat(0),3,.8);
    mass(smooth([[11,-4.2],[16,-3.6],[20.5,-3.1],[23.8,-2],[25.4,.3],[25.4,3.4],[24,5.8],[21,6.6],[16,7.2],[12,7],[10.5,2]].map(p=>Wp(...p))),3.3,4.5,muz,3,.7);
    mass(smooth([[8.5,8.5],[12.5,11.5],[17.5,10],[22,8],[23.8,6.4],[21,5.6],[16,6.2],[11,6.5]].map(p=>Wr(...p))),3.1,3.5,muz,3,.7);
    if(HP.jaw){/* the open mouth: dark within, the pale teeth along both jaws */
      mass([Wp(11,6.6),Wp(24.2,5.8),Wr(23.6,6.2),Wr(11,6.5)],3.05,1,()=>INNER,3,0);
      for(let u=16;u<=22.5;u+=.5){const[p,q]=Wp(u,6.4);put(p,q,331,'#ece4d0',3);const[r,s]=Wr(u+.3,6.1);put(r,s,331,'#d8ceb6',3)}}
    /* the neck: from the withers and the chest up to the head, its crest a little arched */
    const CR=B([[9,-53.6],[14,-57],[19.5,-61.5],[25,-65.5]]);
    mass(smooth([...CR,Wp(-.5,1.5),Wp(5,9),Wp(10.5,11),...B([[27.5,-44],[25.5,-38.5],[20,-36],[12,-42]])]),.5,7,fb((nx,ny,nz,px,py)=>{
      /* a lighter band along the lower side of the neck, a little inside its edge */
      const q=Math.hypot(nx,ny),b=tn(nx,ny,nz,px,py);return COAT[q>.18&&q<.6&&(nx*.75+ny*.66)/q>.55?(q>.52||q<.24?((px+py)&1?1:b):1):b]}),2,.7);
    /* the ears: very long, set wide apart on the top of the head and opening in a V, or laid back along the neck as it brays; the near
       one shows its pale inside, the far one its darker back; both have dark rims and tips */
    const ear=(bx0,by0,ang,len0,near,w)=>{const ex=Math.cos(ang),ey=Math.sin(ang),bx=bx0-ex*2,by=by0-ey*2,len=len0+2,R=len+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=w*Math.sin(Math.PI*(t*.8+.2));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.84)col=DARK;else if(Math.abs(s)>hw-1)col=DARK2;
        else if(near&&t>.14&&Math.abs(s)<hw-1.6)col=PALE[l<0?2:3];
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,1)];
        put(px,py,near?400:-60,col,6)}};
    {const e=HP.ear,bk=-Math.PI+.42,an=-1.45,af=-1.22,[f0,f1]=Wp(1.4,-3.8),[n0,n1]=Wp(-1,1.6);
      ear(f0,f1,af+(bk+.1-af)*e,14,0,2.8);ear(n0,n1,an+(bk-an)*e,16,1,3.3)}
    /* the mane: short, erect and dark, along the crest from the withers to between the ears */
    {const C=[...CR,Wp(-.6,.6)];for(let i=0;i<C.length-1;i++){const[x0,y0]=C[i],[x1,y1]=C[i+1],L=Math.hypot(x1-x0,y1-y0),nx=(y1-y0)/L,ny=-(x1-x0)/L,n=Math.ceil(L/.5);
      for(let j=0;j<n;j++){const t=j/n,cx=x0+(x1-x0)*t,cy=y0+(y1-y0)*t,s=(i+t)/(C.length-1),h=.6+1.5*Math.min(1,s*1.8)+((j+i*3)%5<2?.5:0);
        for(let d=-.8;d<=h;d+=.5)put(cx+nx*d,cy+ny*d,250,d>h-.6&&(j%3===0)?DARK2:DARK,8)}}}
    /* the forelock runs on over the poll to between the ears: short, and laid back, so that with the ears it makes no cross */
    for(const[u,v]of[[-.4,1.2],[-.9,-.6],[.4,-2.2]]){const[r0,r1]=Wp(u+1.2,v),[t0,t1]=Wp(u-1.4,v+1.6);cap(r0,r1,1,t0,t1,.8,350,()=>DARK,8)}
    /* the eye, dark in its pale ring, high on the side of the head: small squares, never a round one pixel high; the nostril on the
       front of the muzzle; the line of the closed mouth */
    {const[e0,e1]=Wp(9,2),X=Math.floor(e0),Y=Math.floor(e1),es=(x,y,c)=>{if(partAt(x,y)===3)set(x,y,c)};
      for(const[dx,dy]of[[-1,-1],[0,-1],[1,-1],[-2,0],[2,0],[-2,1],[2,1],[-1,2],[0,2],[1,2],[2,2]])es(X+dx,Y+dy,dy<0?COAT[1]:PALE[1]);
      for(const dx of[-1,0,1])es(X+dx,Y,'#16110e');for(const dx of[-1,0,1])es(X+dx,Y+1,dx===1?'#3a2e26':'#1e1812');es(X,Y,'#5a5048')}
    /* the mouth, pixel by pixel over the masses: A the upper lip, B the lower lip, the chin and the lower jaw. While the mouth is shut
       they part along a line from the corner of the mouth to the tip, drawn dark, and round the tip; while it is open, A is the muzzle
       and B the jaw that has dropped. The underside of the upper lip lies in shade below the nostril, the edge of the lower lip
       catches the light, and the underside of the jaw is dark. */
    {const lv=(px,py)=>(px+.5-HP.px)*vx+(py+.5-HP.py)*vy,ju=(px,py)=>hu+(lu(px,py)-hu)*Math.cos(ja)+(lv(px,py)-hv)*Math.sin(ja),
        zAt=(x,y)=>{x=Math.floor(x);y=Math.floor(y);if(y>=0||y<-Y0||x<-X0||x>=FW-X0)return -1e9;const i=(y+Y0)*FW+x+X0;return Pb[i]===3?Zb[i]:-1e9},
        low=(x,y)=>lv(x,y)>4.75-.3*(lu(x,y)-20),
        isA=(x,y)=>{const z=zAt(x,y);return HP.jaw?z>332.9&&z<335:z>299&&z<335&&lu(x,y)>17&&!low(x,y)},
        isB=(x,y)=>{const z=zAt(x,y);return HP.jaw?z>312&&z<314:z>299&&z<335&&lu(x,y)>16.4&&low(x,y)},
        isK=(x,y)=>!HP.jaw&&isA(x,y)&&lu(x,y)>19.6&&(isB(x,y+1)||isB(x-1,y)||lv(x,y)>1.2&&lu(x,y)>24&&partAt(x,y+1)!==3),
        [c0,c1]=Wp(20,3),X=Math.floor(c0),Y=Math.floor(c1);
      for(let py=Y-12;py<=Y+12;py++)for(let px=X-12;px<=X+12;px++){
        if(isB(px,py)&&ju(px,py)<=17){if(ju(px,py)>16.4&&PALE.includes(Cb[(py+Y0)*FW+px+X0]))set(px,py,COAT[2])}
        else if(isB(px,py))set(px,py,partAt(px,py+1)!==3?LOW[2]:ju(px,py)>19&&!isB(px,py-1)?PALE[3]:COAT[2]);
        else if(isK(px,py))set(px,py,DARK);
        else if(isA(px,py)&&lu(px,py)>22.3){let d=1;while(d<4&&isA(px,py+d)&&!isK(px,py+d))d++;if(d<=2)set(px,py,PALE[4]);else if(d===3)set(px,py,PALE[3])}
        else if(isA(px,py)&&lu(px,py)>17.4){let d=1;while(d<3&&isA(px,py+d)&&!isK(px,py+d))d++;if(lu(px,py)>18.6&&d<=2||Cb[(py+Y0)*FW+px+X0]===PALE[3])set(px,py,PALE[2])}}
      /* the nostril, low on the pale muzzle: three small squares */
      const[n0,n1]=Wp(21,1.3),NX=Math.floor(n0),NY=Math.floor(n1);
      for(const[dx,dy,c]of[[0,0,'#231a18'],[0,1,'#2a201c'],[1,1,'#3a2e28']])if(isA(NX+dx,NY+dy))set(NX+dx,NY+dy,c)}
    /* the stripe along the back, from the withers to the root of the tail, a pixel under the line of the back */
    for(let X=-22;X<=10;X++){let Y=-Y0;while(Y<0&&![1,2].includes(partAt(X,Y)))Y++;if(Y<-1&&partAt(X,Y+1)===1)set(X,Y+1,X>-20&&X<8?DARK:DARK2)}
    /* the loads */
    const topAt=X=>{let Y=-Y0;while(Y<0&&![1,2,8].includes(partAt(X,Y)))Y++;return Y},botAt=X=>{let Y=-1;while(Y>-Y0&&partAt(X,Y)!==1)Y--;return Y};
    if(load>=0){const K=ramp('#8a3e30'),bt=X=>{let Y=-Y0;while(Y<0&&partAt(X,Y)!==1)Y++;return Y};for(let X=-13;X<=12;X++){const t0=bt(X)-1,n=12;for(let i=0;i<n;i++){if([2,8].includes(partAt(X,t0+i)))continue;let v=i===0?0:i>=n-2?3:X>10?1:X<-11?3:2;if(i===7)v=-1;set(X,t0+i,v<0?'#d8c9a0':i===8?K[4]:K[v])}}
      if(!load){const yb=bt(8)+10,yb2=botAt(8);for(let Y=yb;Y<=yb2;Y++){const X=8+Math.round((Y-yb)/Math.max(1,yb2-yb)*1.4);set(X,Y,'#6a4628');set(X+1,Y,'#4a2e18')}}}
    if(load>0){const Bg=ramp('#4a3c30'),S=ramp('#b8a47c'),Rd=ramp('#8a3a2c'),L=ramp('#7a5a3a'),cy=(load>1?-37.5:-39)+o,a2=load>1?15.5:15,b2=load>1?11.5:10;
      for(let Y=Math.floor(cy-b2);Y<=cy+b2;Y++)for(let X=Math.floor(-1-a2);X<=-1+a2;X++){const u=(X+.5+1)/a2,v=(Y+.5-cy)/b2,q=1-Math.pow(Math.abs(u),4)-Math.pow(Math.abs(v),load>1?3:6);if(q<0)continue;
        const nz=Math.pow(q,.35)*(load>1?1:.8),n=Math.hypot(Math.pow(u,3),Math.pow(v,3)*.8,nz),b=tn(Math.pow(u,3)/n,Math.pow(v,3)*.8/n,nz/n,X,Y);
        set(X,Y,v<-.8?L[Math.max(0,b-1)]:v>-.42&&v<-.26?S[b]:v>.3&&v<.44?Rd[b]:Bg[b])}
      if(load>1){/* two sacks of grain, upright on the saddle between the bags */
        const sack=(sx,sc)=>{const Q=ramp(sc),qm=(nx,ny,nz,px,py)=>Q[tn(nx,ny,nz,px,py)],by=topAt(Math.round(sx))+1,cy2=by-5.5;ell(sx,cy2,900,6.5,5.8,qm,9);
          cap(sx-1,cy2-4,3.4,sx+.3,cy2-7.5,2.2,901,qm,9);for(let d=-1;d<=1;d++)set(sx+d,cy2-7.5,'#6a4a2a');ell(sx+.6,cy2-9.2,902,3,1.7,qm,9)};
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
    /* A working ox or a bull, the heaviest of the animals, in the pixel manner of the figures and seen from the side, as in the maintainer's
       reference picture: a deep barrel of a body that rises to a hump of muscle at the withers, a short thick neck that comes out of the
       shoulders below the line of the back with the dewlap hanging from throat to brisket under it, and the head carried low and forward,
       hanging in front of the chest with its poll below the withers, turned three-quarters toward us: one side of the face and its broad
       front, both short pale horns, both ears and both eyes, the muzzle lowest. The barrel is modelled in flat bands, as in the reference,
       with a crease where the shoulder and the haunch meet it. c: its coat, from
       which every tone is taken (ramp), so that the brown oxen of Zenon's wagon and the near-white bulls of Lystra are the same painter.
       gar: a garland of leaves and yellow flowers round the neck (Acts 14:13).
       Every part grows out of the one before it: the tail is set on at the top of the rump and lies along it before it hangs free, the near
       legs are painted in the body's own tones as far down as the belly, so that haunch and shoulder grow out of it, and the neck is painted
       in the same bands of tone as the body it comes out of, so that no seam shows.
       Crosses: the horns curve out and straight up from a poll that rises between them, so that the crown of the head is no level bar over
       the face; the ears droop; the garland hangs round the neck in a curve over the dewlap and crosses no line or crease; nothing else is
       ever laid across the neck.
       fr 0 stands. fr 4 to 19 are the sixteen frames of its walk (frame below gives the frame for a distance walked); 1, 2 and 3 are three
       moments of that walk, a quarter of a cycle apart, for a scene that counts frames itself. The walk has four beats: near hind, near
       fore, far hind, far fore, each a quarter of the cycle after the one before. A hoof stands on the ground for OX_STANCE of the cycle,
       going back under the body, and swings forward for the rest, lifted, with the hock or the knee bent. The legs swing from the hip and
       the shoulder, high inside the body, so that a leg slants less than a pendulum hung at the belly would; while it walks the two legs of
       a pair leave the body at nearly one place and open like a pair of compasses, and never cross as an X under the belly. A heavy beast
       plods: the body sinks a pixel as each fore hoof takes its weight, the hip and the shoulder roll up a pixel in turn over the leg that
       stands under them, the head sways a pixel forward and back and dips with the fore hooves, the dewlap swings after it, and the tip of
       the tail swings away from the near hind leg when that leg is back.
       fr 20 to 22 are its voice (see voice and sound), with the same head: 20 lifted a little and the muzzle pushed forward, the mouth shut;
       21 the lower jaw dropping; 22 the mouth wide open and the dewlap drawn taut. */
    /* the head in three-quarter view, as it hangs (OX_HEAD), lifted with the muzzle forward (OX_RAISE), and lowing (OX_LOW1, OX_LOW2) */
    const OX_HEAD=[
      ".............................x......","...x.........................x......","...xx.......................cy......","...yc.......................cy......",
      "...ycC.....................Ccy......","....ycC..................Cccy.......",".....yccC....HHHHHHHH..cccy.........","......yyccC.LLLLLLLLLLcy............",
      "........yycchHLLLLLLLh..............","..........HHhHLLLLLLLHHh............","....eeeehHHHhHLLLLLLLHHhd...........",".eEEEEehHLLLhHHHHHHHHHhhhdeee.......",
      "eEEEeedhHHkwhHHHHHHHHHHkkddeEEEe....",".eeedddhHHkkhhhhhhhhhhhkhddeEEEEe...","....dddhHHddhhhhhhhhhhhhhddeeeee....","........hHHHhhhhhhhhhhhhhd.ddd......",
      "........dHHHHhhhhhhhhhhhhd..........",".........dHHHhhhhhhhhhhhhd..........",".........dhhhhhhhhhhhhhhhd..........","..........dhhhhhhhhhhhhhhd..........",
      "..........dhhhhhhhhhhhhhhhd.........","...........dhhhhhhhhhhhhhhd.........","...........dhhhhhhhhhhhhhhd.........","............dhhhhhhhhhhhhhhd........",
      "............dhhhhhhhhhhhhhhd........","............DqqMMMMMMMMMMMMMM.......",".............DqMMmmmmmmmmmmmq.......",".............DqMMmmnnmmmmmnnq.......",
      ".............DqMMmmnmmmmmmmnq.......","..............Dmmmmmmmmmmmmmq.......","..............ddnnnnnnnnnnnnq.......","...............DqqqqqqqqqqqD........",
      "................DqqqqqqqqqD.........",".................DqqqqqqqD.........."];
    const OX_RAISE=[
      ".............................x......","...x.........................x......","...xx.......................cy......","...yc.......................cy......",
      "...ycC.....................Ccy......","....ycC..................Cccy.......",".....yccC....HHHHHHHH..cccy.........","......yyccC.LLLLLLLLLLcy............",
      "........yycchHLLLLLLLh..............","..........HHhHLLLLLLLHHh............","....eeeehHHHhHLLLLLLLHHhd...........",".eEEEEehHLLLhHHHHHHHHHhhhdeee.......",
      "eEEEeedhHHkwhHHHHHHHHHHkkddeEEEe....",".eeedddhHHkkhhhhhhhhhhhkhddeEEEEe...","....dddhHHddhhhhhhhhhhhhhddeeeee....","........hHHHhhhhhhhhhhhhhd.ddd......",
      ".........dHHHHhhhhhhhhhhhhd.........","..........dHHHhhhhhhhhhhhhd.........","..........dhhhhhhhhhhhhhhhd.........","...........dhhhhhhhhhhhhhhd.........",
      "...........dhhhhhhhhhhhhhhhd........","............dhhhhhhhhhhhhhhd........","............dhhhhhhhhhhhhhhd........","..............dhhhhhhhhhhhhhhd......",
      "..............dhhhhhhhhhhhhhhd......","..............DqqMMMMMMMMMMMMMM.....","...............DqMMmmmmmmmmmmmq.....","...............DqMMmmnnmmmmmnnq.....",
      "...............DqMMmmnmmmmmmmnq.....","................Dmmmmmmmmmmmmmq.....",".................ddnnnnnnnnnnnnq....","..................DqqqqqqqqqqqD.....",
      "...................DqqqqqqqqqD......","....................DqqqqqqqD......."];
    const OX_LOW1=[
      ".............................x......","...x.........................x......","...xx.......................cy......","...yc.......................cy......",
      "...ycC.....................Ccy......","....ycC..................Cccy.......",".....yccC....HHHHHHHH..cccy.........","......yyccC.LLLLLLLLLLcy............",
      "........yycchHLLLLLLLh..............","..........HHhHLLLLLLLHHh............","....eeeehHHHhHLLLLLLLHHhd...........",".eEEEEehHLLLhHHHHHHHHHhhhdeee.......",
      "eEEEeedhHHkwhHHHHHHHHHHkkddeEEEe....",".eeedddhHHkkhhhhhhhhhhhkhddeEEEEe...","....dddhHHddhhhhhhhhhhhhhddeeeee....",".........hHHHhhhhhhhhhhhhhdddd......",
      ".........dHHHHhhhhhhhhhhhhd.........","..........dHHHhhhhhhhhhhhhd.........","..........dhhhhhhhhhhhhhhhd.........","...........dhhhhhhhhhhhhhhd.........",
      "............dhhhhhhhhhhhhhhhd.......",".............dhhhhhhhhhhhhhhd.......",".............dhhhhhhhhhhhhhhd.......","..............dhhhhhhhhhhhhhhd......",
      "..............dhhhhhhhhhhhhhhd......","..............DqqMMMMMMMMMMMMMM.....","................DqMMmmmmmmmmmmmq....","................DqMMmmnnmmmmmnnq....",
      "................DqMMmmnmmmmmmmnq....",".................Dmmmmmmmmmmmmmq....","...................oooooooooooo.....","..................oooooooooooo......",
      ".................Dqqmmmmmmmmmmmq....","...................DqqqqqqqqqqqD....","....................DqqqqqqqqqD.....",".....................DqqqqqqqD......"];
    const OX_LOW2=[
      ".............................x......","...x.........................x......","...xx.......................cy......","...yc.......................cy......",
      "...ycC.....................Ccy......","....ycC..................Cccy.......",".....yccC....HHHHHHHH..cccy.........","......yyccC.LLLLLLLLLLcy............",
      "........yycchHLLLLLLLh..............","..........HHhHLLLLLLLHHh............","....eeeehHHHhHLLLLLLLHHhd...........",".eEEEEehHLLLhHHHHHHHHHhhhdeee.......",
      "eEEEeedhHHkwhHHHHHHHHHHkkddeEEEe....",".eeedddhHHkkhhhhhhhhhhhkhddeEEEEe...","....dddhHHddhhhhhhhhhhhhhddeeeee....",".........hHHHhhhhhhhhhhhhhdddd......",
      ".........dHHHHhhhhhhhhhhhhd.........","..........dHHHhhhhhhhhhhhhd.........","..........dhhhhhhhhhhhhhhhd.........","............dhhhhhhhhhhhhhhd........",
      "............dhhhhhhhhhhhhhhhd.......",".............dhhhhhhhhhhhhhhd.......",".............dhhhhhhhhhhhhhhd.......","...............dhhhhhhhhhhhhhhd.....",
      "...............dhhhhhhhhhhhhhhd.....","...............DqqMMMMMMMMMMMMMM....","................DqMMmmmmmmmmmmmq....",".................DqMMmmnnmmmmmnnq...",
      ".................DqMMmmnmmmmmmmnq...","..................Dmmmmmmmmmmmmmq...","....................oooooooooooo....","...................ooooooooooooo....",
      "...................oooottttttooo....","...................oooottttttoo.....","..................Dqqmmmmmmmmmmmq...","....................DqqqqqqqqqqqD...",
      ".....................DqqqqqqqqqD....","......................DqqqqqqqD....."];
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
      const pose=V===0?{P:[43+sway,-61+hd],Q:[46+sway,-43+hd],sag:9,H:OX_HEAD,hx:34+sway,hy:-70+hd}
        :V===1?{P:[45,-64],Q:[50,-48],sag:5,H:OX_RAISE,hx:36,hy:-73}
        :{P:[46,-65],Q:[52,-50],sag:3,H:V===2?OX_LOW1:OX_LOW2,hx:37,hy:-74};
      /* top: the line of the back, from the rump over the hump of the withers and along the crest of the neck to the poll */
      /* top: the line of the back. From the buttock it rises over the rump to the hip bones (the hooks, a slight angular rise), runs nearly
         level along the loin and the back to a low rise at the withers, and goes down along the crest of the neck to the poll, below the
         line of the back. The tail is set on high, where the rump begins to slope. */
      const top=xx=>{if(xx<=-40)return-63+Math.pow(-40-xx,1.5)+rl;
        if(xx<=-28)return-63-4.7*(xx+40)/12+rl;
        if(xx<=14)return-66.5-1.2*Math.max(0,1-(xx+28)/5)-3*Math.exp(-Math.pow((xx-12)/9,2))+(xx<-20?rl:xx>2?rs:0);
        const u=Math.min(1,(xx-14)/(pose.P[0]-14)),d=pose.P[1]+69.5-rs;return-69.5+rs+d*Math.sin(u*Math.PI/2)};
      /* bot: the underline. Under the buttock it runs into the thigh; it is tucked up high at the flank, in front of the hind leg, where the
         flank is hollow; the belly is rounded and the chest lies deep and low between the forelegs. From the brisket on, which stays where
         it is whatever the head does, the dewlap hangs as a loose fold up to the throat, swinging as it walks and drawn taut when the neck is
         stretched. */
      const bot=xx=>{if(xx<-34)return-38-5*(1-Math.sqrt(Math.max(0,1-Math.pow((xx+34)/11,2))));
        if(xx<-20)return-38+(xx+34)/14;
        if(xx<-6)return-37+10.5*(1-Math.pow((-6-xx)/14,2));
        if(xx<26)return-26.5-.6*Math.exp(-Math.pow((xx-8)/10,2));
        const u=Math.min(1,(xx-26)/(pose.Q[0]-26)),s=Math.min(1,Math.max(0,u-dw*.06));return-26.5+(pose.Q[1]+26.5)*u+pose.sag*Math.sin(Math.PI*s)};
      const X0=-45,X1=pose.Q[0]+2;
      /* tone: the band of tone of a pixel of the body, in flat bands that follow the line of the back: a highlight along the back, the light
         band reaching further down on the top of the shoulder (in front of its crease, cs) and of the haunch (behind the flank's crease, ch),
         the side in the base tone, the shade under the belly, behind the shoulder and in front of the haunch; the rear and the underside of
         the neck fall into shade. Only the edge between two bands is dithered, a pixel wide. */
      const cs=yy=>5+(yy+68)*4/28,ch=yy=>-24+(yy+62)*5/22;
      const tone=(xx,yy)=>{const t0=top(xx),b0=bot(xx),r=(yy-t0)/Math.max(1,b0-t0)+((xx+yy)&1?.025:-.025);
        let v=yy-t0<1.2&&xx>-38?0:r<.36?1:r<.66?2:r<.86?3:4;
        if(v>=1&&v<=2&&yy<-50&&(xx>cs(yy)&&xx<27||xx<ch(yy)&&xx>-38))v=Math.max(1,v-(r<.5?1:0));
        if(r>.3&&r<.7&&(xx<=cs(yy)&&xx>cs(yy)-3||xx>=ch(yy)&&xx<ch(yy)+3))v++;
        if(xx<-38&&v)v++;if(xx>26&&r>.45)v++;
        return Math.min(4,v)};
      /* at: where the hoof of a leg is at this moment, the leg's beat being off of a cycle after the near hind leg's: hx before or behind the
         leg's root, lift off the ground, and bend, how far the hock or the knee is flexed */
      const at=off=>{if(!W)return{hx:0,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=OX_REACH,B=OX_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
        const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(5*q),bend:5*q}};
      /* leg: from its root at lx down to the hoof. The top of a near leg lies inside the body and is painted in the body's tones as far as the
         belly; below it the leg is lit from the front and darker behind, a far leg a band darker again. A hind leg goes down from the stifle
         to the hock, which stands back, and on down a fine bony cannon to the fetlock and its dewclaw; a fore leg goes down the thick forearm to
         the knee and the cannon below it. The top moves with a
         two fifths of the hoof's swing, since the leg swings from the hip or the shoulder high above. */
      const leg=(lx,P,far,hind)=>{const y0=(far?(hind?-42:-31):hind?-50:-46)+o,yh=-3-P.lift,tx=lx+P.hx*.4+(hind?4:0),jy=hind?-22:-18,
          jx=hind?lx-5+P.hx*.52-P.bend*.8:lx+P.hx*.6+P.bend,hx=lx+P.hx,n=yh-y0;
        for(let i=0;i<n;i++){const yy=y0+i,cx=yy<=jy?tx+(jx-tx)*(yy-y0)/(jy-y0):jx+(hx-jx)*(yy-jy)/(yh-jy),t=(yy-y0)/(jy-y0),b=(yy-jy)/(yh-jy),
            joint=Math.abs(yy-jy)<=1,w=joint?10:yy<jy?(hind?Math.round(16-7*t):Math.round(13-4*t)):(b<.12?8:b<.7?6:b<.9?8:7),
            x0=Math.round(cx-w/2+(hind&&yy<=jy?1:0))-(joint&&hind?1:0);
          for(let q=0;q<w;q++){const xx=x0+q,u=(q+.5)/w;
            if(!far&&yy-o<bot(xx)-.5&&xx>=X0)px(xx,yy,D[tone(xx,yy-o)]);
            else px(xx,yy,D[Math.min(4,(u<.18?4:u<.42?3:u<.86?2:1)+(far?1:0))])}
          /* the dewclaw, a dark knob at the back of the fetlock */
          if(yy===yh-4)px(x0-1,yy,hoof,1,2)}
        const hx0=Math.round(hx-4);px(hx0,yh,hoof,9,2);px(hx0,yh+2,hoof,4);px(hx0+5,yh+2,hoof,4);px(hx0+6,yh,hoofL,2);px(hx0-1,yh-1,hoof,2)};
      /* the far legs, behind the body: walking, each pair leaves the body at one place */
      leg(W?-24:-20,at(.5),1,1);leg(W?24:25,at(.75),1,0);
      /* the tail: set on at the top of the rump, lying along it, then hanging free to a dark switch */
      {const ty0=Math.round(top(-40))+o;for(let yy=ty0;yy<=-31+o;yy++){const i=yy-ty0,lie=yy<-52+o,sw=i>10?Math.round(tl*(i-10)/14):0,
          xx=lie?Math.round(-40-Math.pow(Math.max(0,yy-o+63),1/1.5))-1:-46+sw,tuft=yy>-40+o;
        if(tuft){const w=yy>-35+o?5:4;px(xx-(w>4?2:1),yy,hoof,w)}else px(xx,yy,D[i%4?3:4],2)}}
      /* the body and the neck: column by column, between the line of the back and the underline */
      for(let xx=X0;xx<=X1;xx++){const t0=Math.round(top(xx)),b0=Math.round(bot(xx));for(let yy=t0;yy<=b0;yy++)px(xx,yy+o,D[tone(xx,yy)])}
      /* creases: where the flank folds in front of the haunch, and behind the shoulder; each a short soft line that ends inside the body */
      for(let yy=-60;yy<=-40;yy++){const xx=Math.round(ch(yy));px(xx,yy+o,D[Math.min(4,tone(xx,yy)+1)])}
      for(let yy=-66;yy<=-42;yy++){const xx=Math.round(cs(yy));px(xx,yy+o,D[Math.min(4,tone(xx,yy)+1)])}
      /* the near legs, in front of the body */
      leg(W?-26:-29,at(0),0,1);leg(W?22:19,at(.25),0,0);
      /* a garland: leaves set two by two along a cord, slanting either way, and a few yellow flowers among them. It hangs round the neck from
         behind the poll, sags in a curve over the dewlap and goes up again under the jaw, where the head hides it. No line crosses it. */
      if(gar){const[S,C,E]=V?[[30,-67],[37,-29],[51,-49]]:[[27+sway,-66+hd],[33+sway,-24+hd],[47+sway,-43+hd]],G0='#3f6a32',G1='#4f7a3a',G2='#6f9a4a',G3='#8fb45a';
        for(let i=0;i<17;i++){const u=i/16,w=(1-u)*(1-u),v2=2*u*(1-u),z=u*u,gx=Math.round(w*S[0]+v2*C[0]+z*E[0]),gy=Math.round(w*S[1]+v2*C[1]+z*E[1])+o,s=i%2;
          px(gx-2,gy-1,G0,4,3);px(gx-(s?4:0),gy+(s?-1:0),s?G1:G2,4,2);px(gx-(s?3:-1),gy+(s?-1:0),G3,2,1);px(gx+(s?0:-3),gy+1,G1,3,1);
          if(i%5===2){px(gx-1,gy-2,'#e8c040',3,2);px(gx,gy-2,'#fff0a0',1);px(gx-1,gy-1,'#c89a30',1)}}}
      /* the head */
      const pale=mix('#b4aca6',c,.22),horn='#e6dcc0';
      stamp(g,pose.H,pose.hx,pose.hy+o,{L:D[0],H:D[1],h:D[2],d:D[3],D:D[4],e:D[3],E:mix(c,'#5a3436',.5),k:'#1a120c',w:'#e8e0d0',
        m:pale,M:tint(pale,.3),q:mix(pale,'#3a3034',.35),n:'#2a1c18',o:'#3a1418',t:'#b06a70',c:horn,C:'#f6f0e0',y:'#b0a284',x:'#4a3c30'});
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
