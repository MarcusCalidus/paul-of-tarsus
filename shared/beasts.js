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
  /* A pack mule, the foal of a donkey and a mare, and a size bigger than the donkey, drawn after the maintainer's picture of a mule:
     seen from the side and built more like a horse than the donkey is. A compact, deep barrel that hangs low between the legs, a round
     high croup, and a deep chest before the fore legs; each leg grows out of a mass of muscle, the hind out of a big thigh and gaskin
     that come down from the haunch to a clear hock, the fore out of a broad forearm to the knee, and below the hock and the knee a slim
     dark cannon to a large dark hoof. A neck thick at its base, carried high, with a short, even, upright dark mane whose top is a
     little ragged. The long head is turned three-quarters toward us, so that the broad forehead and the front of the face catch the
     light and both long ears read, set in a V: the near one shows its inside, the far one its back. A large dark eye in a pale ring, a
     pale mealy muzzle, and a long tail of dark hair, narrow at the dock and a little wider below, hanging close behind the thigh from
     high on the rump. The coat is a bay brown: a lighter strip along the crest under the mane and down the throat, the belly paler, the
     back of the haunch darker, the legs dark from the knees and hocks down and the far legs darker still. It wears no halter.
     It is painted as the donkey is: rounded masses (barrel, haunch, shoulder, breast; a neck lit across its round; cranium, cheek, face,
     muzzle and lower jaw; legs of tapering limbs), each lit by its own surface from the front and above and laid down pixel by pixel in
     five flat tones, with a checker of the two tones where one band passes into the next; where two masses meet the nearer one wins, so
     a crease shows behind the shoulder and in front of the haunch. No outline is drawn: the engine darkens the edge. The mane, the ears,
     the eye, the nostril and the loads go on top; as it brays, the muzzle and the mouth are laid over by hand (VMZ, below). No crease
     runs down from the withers, which would cross the line of the back under the mane, and the eye is a block of pixels, not a round.
     Sizes, in drawing units (two to a room pixel): the back stands 66 high (33 room pixels), the tips of the ears 93 (46 or 47 room
     pixels, a man's height), the belly 31 above the ground: the barrel is about half the height of the back.
     load: 0 a saddle blanket behind the withers, its girth hanging from its front corner, so that the two make an L and never a T; 1 a
     pack saddle's pad over it and a pack bag of banded goat's hair on each side, hanging down against the barrel to just above the
     belly; 2 the bags stuffed with wool and fleeces piled four deep on top, half as high again as the back; -1 the bare mule, nothing
     on its back, only for the sheets that compare it with the picture it was drawn after (no scene uses it).
     fr 0 stands; fr 4 to 19 are the sixteen frames of its walk (frame.mule gives the frame for a distance walked), and 1, 2 and 3 three
     moments of it, a quarter of a cycle apart; fr 20 to 23 are its voice: 20 the head raised and the ears laid back, 21 the mouth a
     little open for the whinny, 22 the neck stretched and the mouth wide for the hee, 23 half shut for the haw.
     The walk has four beats, as every walk of a four-footed beast: near hind, near fore, far hind, far fore, each a quarter of a cycle
     after the one before. A hoof stands for ten frames, going back under the body, and swings forward for six, lifted, with the hock
     or the knee bent; a swinging fore hoof hangs under its knee and does not fold back across the leg that stands. The legs of a pair
     hang from one place in the body and open like a pair of compasses. Standing, it stands as in the picture: the near hind straight
     under the buttock, the far hind a step forward, the far fore a little before the near one. The body sinks a pixel as each fore
     hoof lands, the head nods a pixel more with it and a frame after it, and the tail swings. Every part grows out of the one before
     it: the legs out of the body, the neck out of the shoulders, the head out of the neck, the tail out of the top of the rump. */
  /* The numbers of the walk. A hoof reaches MULE_REACH drawing units from the front of its step to the back while it stands, and stands
     for MULE_STANCE of the cycle, so a cycle carries the mule MULE_STRIDE room pixels with its hooves planted: 36 / .625 / 2 = 28.8, against
     the donkey's 24 and a man's 27. A cycle is never quicker than MULE_BEAT seconds, or the walk would turn into a scurry: up to
     28.8 / .6 = 48 room pixels a second the hooves stay where they are set down, so at WALK_V (48) they do not slip at all, and a
     cycle takes .6 s.
     muleFr: the frame of the walk for a distance walked (dist, in room pixels) at a speed (v, room pixels a second; WALK_V if none). */
  const MULE_REACH=36,MULE_STANCE=.625,MULE_STRIDE=MULE_REACH/MULE_STANCE/2,MULE_BEAT=.6;
  const muleFr=(dist,v)=>{const c=Math.max(MULE_STRIDE,Math.abs(v==null?WALK_V:v)*MULE_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  /* the tones, highlight to deep shadow: the bay coat, the paler belly, the mealy muzzle and eye ring, the dark legs, the hooves, the mane */
  const COAT=['#9a7150','#825c3c','#6e4a2d','#583420','#3e2418'],PALE=['#c49c76','#ac8462','#94704f','#7a5840','#5e4230'],
    MEAL=['#d8c8ae','#c2ae92','#a8927a','#8a7664','#6a5a4c'],PT=['#5e4030','#4a3022','#3a241a','#2a1912','#1c0f0a'],
    HOOF=['#544640','#3e322c','#2c221e','#201814','#150f0c'],MANE='#22150f',MANE2='#3a2418',EYE='#120c0a',MOUTH='#3e1a16',TEETH='#d8cdb2',
    STRAP='#5c3318',STRAP_LIT='#8a5a30';
  /* poses of the head: the poll (px, py), the slant of the face below the level (al, degrees), how far the lower jaw is open (jaw,
     degrees), and the ears (ear: 0 up, 1 laid back along the neck). At rest the long face runs steeply down and forward; braying, the
     head goes up with the muzzle forward, the jaw drops open and the ears lie back. */
  const HEADS={0:{px:43,py:-82,al:64,jaw:0,ear:0},20:{px:44,py:-85,al:38,jaw:0,ear:1},21:{px:45,py:-85,al:16,jaw:20,ear:1},
    22:{px:46,py:-85,al:6,jaw:34,ear:1},23:{px:44.5,py:-84,al:28,jaw:12,ear:.6}};
  /* The muzzle of the voice frames, by hand (see the painter): for each frame its top left corner (x, y, in drawing units from the
     mule's feet) and its rows. The letters: a to e the coat, 0 to 4 the meal, as above; w the coat warming into the meal, p the meal
     itself, g its shade; n the ring of the nostril, N the nostril; l the lip, L its shade, k the dark under the lips and the chin;
     M the mouth within, q the tongue deep in it, T the front teeth. */
  const VMC={a:COAT[0],b:COAT[1],c:COAT[2],d:COAT[3],e:COAT[4],0:MEAL[0],1:MEAL[1],2:MEAL[2],3:MEAL[3],4:MEAL[4],
    w:'#a38466',p:'#b39d82',g:'#968272',n:'#5e4c3a',N:'#1c100a',l:'#7e6250',L:'#644838',k:'#4a3428',M:'#24120e',q:'#4a2620',T:'#c4b89c'};
  const VMZ={
    20:[58,-73,[
      '......wwwp..',
      '...wwp111pp.',
      '.bwppp11ppp2',
      'cwpppp1nNNp2',
      'cwlg2ppnNNpp',
      'LLMlg2ppggg2',
      '.LLMlg2glllL',
      '.LllMlllllL.',
      '.LLLlMlLLLk.',
      '.kkLLLMkkk..',
      '...kkkk.....']],
    21:[64,-83,[
      '......a.....',
      '.....w111...',
      '....wp11pp..',
      '...wppnNNp2.',
      '..wpp2nNNnp.',
      '.wpp22gggpp2',
      'w222222222gg',
      'LggglllllllL',
      'LLllllllLLL.',
      'MkLLLLLLLkk.',
      '..MMMMMTTM..',
      '...lMMMM....',
      '..LllllL....',
      '..LLlLL.....',
      '..kLLLk.....',
      '..kkLkk.....',
      '..kkkkk.....']],
    22:[63,-88,[
      '.........a......',
      '........w111....',
      '.......wp1111p..',
      '......wpp11pp2..',
      '.....wpppnNNp2..',
      '.....wpp2nNNnp2.',
      '....wpp22gggpp2.',
      '...cw22222222gg.',
      '...LlllllllllL..',
      '....LLllllllLL..',
      '...MkLLLLLLLk...',
      '...MMMkkkkkk....',
      '...MMMMMMMTT....',
      '....MMMMMMMM....',
      '......qqMMM.....',
      '......llMMM.....',
      '......lllM......',
      '.....LlllL......',
      '.....LLlLL......',
      '.....kLLLk......',
      '.....kkkkk......']],
    23:[61,-77,[
      '.......a....',
      '......w111..',
      '....wwp11pp.',
      '..wwppp11pp2',
      '.wwppppnNNp2',
      'wwppp2pnNNnp',
      'cw22pp22ggg2',
      'cLg2222222gg',
      '.LggllllllL.',
      '..LLllllLLL.',
      '..MLLLLLkk..',
      '.LlMMTTM....',
      '.LlllLL.....',
      '.kLLLk......',
      '..kkkk......']]};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  function mule(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>0&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0;
    /* the picture is built in a buffer first: color, nearness (z) and part of every pixel; then laid down */
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const idx=(px,py)=>py>=0||py<-Y0||px<-X0||px>=FW-X0?-1:(py+Y0)*FW+px+X0;
    const put=(px,py,z,col,part)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{const i=idx(Math.floor(px),Math.floor(py));return i<0?0:Pb[i]};
    const set=(px,py,col)=>{const i=idx(Math.floor(px),Math.floor(py));if(i<0)return;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=99}};
    /* the light falls from the front and above: s, how much a surface with normal (nx, ny, nz) faces it, gives the tone; near the edge
       of a band the two tones alternate pixel by pixel */
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.3-ny*.85+nz*.45+((px+py)&1?.04:-.04);return Math.max(0,Math.min(4,(s>.9?0:s>.64?1:s>.2?2:s>-.18?3:4)+(ex||0)))};
    const coat=(ex,R)=>(nx,ny,nz,px,py)=>(R||COAT)[tn(nx,ny,nz,px,py,ex)];
    const belly=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py);return ny>.5&&nz>.12?PALE[Math.max(1,Math.min(3,b-1))]:COAT[b]};
    /* sell: a rounded block, its sides flatter than an ell's (p > 2) */
    const sell=(cx,cy,cz,A,B,C,th,p,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(A,B)*1.2+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/A,v=(-X*si+Y*co)/B,
          au=Math.abs(u),av=Math.abs(v),q=1-Math.pow(au,p)-Math.pow(av,p);if(q<0)continue;const w=Math.pow(q,1/p),
          lx=Math.sign(u)*Math.pow(au,p-1)/A,ly=Math.sign(v)*Math.pow(av,p-1)/B,lz=Math.pow(w,p-1)/C,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz)||1;
        put(px,py,cz+C*w,mat(nx/l,ny/l,lz/l,px,py),part)}};
    /* ell: a rounded mass, half-sizes a, b, c, turned by th; cap: a limb from one round to another */
    const ell=(cx,cy,cz,a,b,c,th,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),lx=u/a,ly=v/b,lz=w/c,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz);put(px,py,cz+c*w,mat(nx/l,ny/l,lz/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    /* at: where the hoof of a leg is at this moment, its beat being off of a cycle after the near hind's: hx before or behind the leg's
       root (st when it stands still), lift off the ground, and bend, how far the knee or the hock is flexed */
    const at=(off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=MULE_REACH,B=MULE_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
      const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:v?2+Math.round(5*q):0,bend:q}};
    /* leg: from inside the body at (sx, sy) by the knee (fore) or the hock (hind) and the fetlock down to the hoof. The upper leg is in
       the coat, lit along its front; from the knee or the hock down it is in the dark of the points; a far leg is a tone darker and
       behind the body. A fore leg is straight while it stands and folds at the knee as it swings, the hoof turning back under it; the
       hock of a hind leg stands behind the line of the leg, more so as it swings. */
    const leg=(sx,P,near,hind)=>{const ex=near?0:2,cz=near?3:-8,sy=(hind?-42:-40)+o,b=P.bend,
        pd0=.3*(1-b)-(hind?.5:.12)*b,pd1=(1-b)+(hind?.85:1)*b,pl=Math.hypot(pd0,pd1),ux=pd0/pl,uy=pd1/pl,
        gy=0,hc=sx+P.hx,fx=hc-ux*7.6+.4,fy=gy-P.lift-uy*7.6-.4,dx=fx-sx,dy=fy-sy,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,
        f=hind?.58:.6,off=hind?-(1.6+3.4*b):.4+4*b,jx=sx+dx*f-nx*off,jy=sy+dy*f-ny*off,up=(nx,ny,nz,px,py)=>COAT[tn(nx,ny,nz,px,py,ex+(hind&&nx<-.45?1:0))],lo=coat(ex,PT);
      if(hind){/* the thigh and the gaskin, deep under the haunch, narrowing to the point of the hock */
        cap(sx,sy-2,6.5,jx,jy,2.6,cz,up,4);cap(sx-3.5,sy-6,4.8,jx-.5,jy,2.3,cz-.5,up,4)}
      else{/* the forearm, broad at the elbow */
        cap(sx,sy-1,5.4,jx,jy,2.6,cz,up,4)}
      cap(jx,jy,1.9,fx,fy,1.7,cz,lo,4);ell(fx,fy,cz+.3,2.2,2.3,2.2,0,lo,4);
      /* the pastern slants down and forward to the hoof; the hoof, wider at the ground, its toe sloped, its heel steep */
      cap(fx+ux*1.5,fy+uy*1.5,1.7,fx+ux*3.5,fy+uy*3.5,1.9,cz,lo,4);
      const vx=uy,vy=-ux;/* (vx, vy): toward the toe */
      for(let py=Math.floor(fy-2);py<=fy+10;py++)for(let px=Math.floor(fx-7);px<=fx+7;px++){const X=px+.5-fx,Y=py+.5-fy,a=X*ux+Y*uy,c=X*vx+Y*vy;
        if(a<3.6||a>7.9)continue;const t=(a-3.6)/4.3;if(c<-2.7-t*.6||c>2.2+t*2.2)continue;
        put(px,py,cz+1,a<4.6?HOOF[Math.min(4,1+ex)]:HOOF[Math.min(4,(c>1.2+t*2.2?1:c<-1.6?3:2)+ex)],5)}};
    /* the far legs, behind the body */
    leg(-28,at(.5,11),0,1);leg(17,at(.75,5),0,0);
    /* the tail: set on high at the top of the rump, a short dock in the coat, then long dark hair hanging close behind the thigh, fuller
       below; it swings a little as the mule walks, and ends above the hocks */
    {const sw=W?1.6*Math.cos(6.2832*(ph-.05)):0;cap(-33,-62+o,1.6,-37.4,-57+o,1.6,-1,coat(1),7);
      for(let py=-58;py<=-25;py++){const s=(py+58)/33,cx=-38.4-s*1.8+sw*s*s,w=2.2+s*2.6-(s>.88?(s-.88)*16:0);
        for(let px=Math.floor(cx-w/2);px<cx+w/2;px++){const e=(px+.5-cx)/(w/2),hair=((px*5+Math.floor((py+60)/3))%4+4)%4;
          put(px,py+o,-2,e>.45&&s<.7?MANE2:hair===0?PT[3]:e<-.5?MANE:PT[4],7)}}}
    /* the body: barrel, haunch, shoulder and breast */
    sell(0,-48.5+o,0,22.5,17,13,0,2.5,belly,1);
    ell(-22,-52.5+o,2,15,14.5,9,-.08,(nx,ny,nz,px,py)=>COAT[tn(nx,ny,nz,px,py,nx<-.5?1:0)],1);
    ell(17,-51.5+o,2,14,10,5.5,1,coat(0),1);
    ell(24,-44.5+o,1,9,11.5,4,0,coat(0),1);
    /* the near legs, in front of it */
    leg(-28,at(0,-5),1,1);leg(17,at(.25,-4),1,0);
    /* the head's pose: at rest it nods with the walk; its voice raises it. u runs down the face from the poll, v across it toward the
       jaw, so that the side of the head turned to us lies at positive v and the front of the face at negative v */
    const HP=HEADS[fr>=20?Math.min(23,fr):0],a=(HP.al+hd*2)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),PX=HP.px+hd*.4,PY=HP.py+o+hd,
      Wp=(u,v)=>[PX+u*ca-v*sa,PY+u*sa+v*ca],hm=coat(0),pm=(nx,ny,nz,px,py)=>MEAL[Math.max(0,Math.min(3,tn(nx,ny,nz,px,py)-1))];
    /* the neck: from the withers and the breast up to the poll and the throat, its crest a little arched; lit across its round, so that
       the crest under the mane and the front of the throat catch the light and its middle lies in a band of shade */
    const c0=[7,-62+o],c2=Wp(-1.5,-.5),c1=[c0[0]+(c2[0]-c0[0])*.42-2.5,c0[1]+(c2[1]-c0[1])*.62-3.5],t1=Wp(14,9.5),t0=[35,-47+o];
    const crest=s=>[(1-s)*(1-s)*c0[0]+2*s*(1-s)*c1[0]+s*s*c2[0],(1-s)*(1-s)*c0[1]+2*s*(1-s)*c1[1]+s*s*c2[1]],poly=[];
    for(let i=0;i<=16;i++)poly.push(crest(i/16));poly.push(Wp(10,3),t1,t0,[26,-40+o],[8,-48+o]);
    {const inPoly=(x,y)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
      const dSeg=(x,y,p,q)=>{const dx=q[0]-p[0],dy=q[1]-p[1],t=Math.max(0,Math.min(1,((x-p[0])*dx+(y-p[1])*dy)/(dx*dx+dy*dy))),ex=x-p[0]-dx*t,ey=y-p[1]-dy*t;return Math.hypot(ex,ey)};
      const ax=t0[0]-c0[0]*.5-c2[0]*.5,ay=t0[1]-c0[1]*.5-c2[1]*.5,al=Math.hypot(ax,ay),acx=ax/al,acy=ay/al;
      let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of poly){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const X=px+.5,Y=py+.5;if(!inPoly(X,Y))continue;
        let dc=1e9;for(let i=0;i<16;i++)dc=Math.min(dc,dSeg(X,Y,poly[i],poly[i+1]));const s=dc/(dc+dSeg(X,Y,t1,t0)),
          th=(s*2-1)*1.25,nz=Math.cos(th),sn=Math.sin(th);{let b=tn(acx*sn*1.2,acy*sn*.3-.25*Math.max(0,-sn),nz,px,py);if(s<.13||s>.9&&s<.97)b=Math.max(1,b-1);put(px,py,-1,COAT[b],2)}}}
    /* the mane: a short, even, upright crest along the neck, from the withers up to the poll, its top a little ragged and a few hairs
       there catching the light */
    for(let i=0;i<=80;i++){const s=.03+i/80*.95,[mx,my]=crest(s),[nx,ny]=crest(Math.min(1,s+.02)),dx=nx-mx,dy=ny-my,l=Math.hypot(dx,dy)||1,ox=dy/l,oy=-dx/l,
        h=(i<8?1+i*.2:2.6)+(((i*13)%7)<2?.5:0)+(i>64?(i-64)*.03:0);
      for(let j=-1;j<=h;j+=.5)put(mx+ox*j,my+oy*j,20,j>h-.6&&((i*5)%9)<3?MANE2:MANE,8)}
    /* The head, long and fine, turned three-quarters toward us: the cranium with its broad forehead, the round jaw of the near cheek, the
       long straight face, and the big pale muzzle, its lowest and frontmost part. The lower jaw turns on its hinge to open the mouth. */
    {const[c0x,c0y]=Wp(3.5,.5);ell(c0x,c0y,1,6.5,7.5,7,a,hm,3)}
    {const[c0x,c0y]=Wp(12.5,5);ell(c0x,c0y,1.5,8.5,6.3,6,a,hm,3)}
    {const[ax0,ay0]=Wp(4.5,-2.4),[bx0,by0]=Wp(22.5,-1.2);cap(ax0,ay0,4.7,bx0,by0,4.2,2,hm,3)}
    {const[c0x,c0y]=Wp(26,.9);ell(c0x,c0y,2.2,6,5.8,5.4,a,pm,3)}
    const ja=HP.jaw*Math.PI/180,hu=13,hv=8,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v));
    {const[h0,h1]=Wp(hu,hv),[m0,m1]=Wr(23.5,5.6);cap(h0,h1,4,m0,m1,2.9,1,hm,3);const[c0x,c0y]=Wr(26,4.8);ell(c0x,c0y,1.3,3.6,2.8,3,a+ja,pm,3)}
    if(HP.jaw){/* the open mouth: dark within, the teeth along both jaws */
      const Q=[Wp(18.5,5.2),Wp(30.6,2.8),Wr(28.4,3.8),Wr(18.5,5.6)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let c=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(px,py,-1,MOUTH,3)}
      /* the teeth go only where the mouth shows */
      const tooth=(p,q,c)=>{const i=idx(Math.floor(p),Math.floor(q));if(i>=0&&Cb[i]===MOUTH)Cb[i]=c};
      for(let u=21;u<=29;u+=.5){const[p,q]=Wp(u,4.2-(u-19)*.12);tooth(p,q,TEETH);const[r,s]=Wr(u,3.6);tooth(r,s,'#cbbfa4')}}
    /* the ears: long, set apart on the top of the head in a V, or laid back along the neck as it brays. The near one shows its inside,
       paler, within a dark rim; the far one is seen from behind, darker; both have dark tips */
    const ear=(bx0,by0,ang,len,near)=>{const ex=Math.cos(ang),ey=Math.sin(ang),bx=bx0-ex*2,by=by0-ey*2,L=len+2,R=L+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/L,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=(near?2.9:2.6)*Math.sin(Math.PI*(t*.8+.2));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.82)col=MANE;else if(Math.abs(s)>hw-1)col=near?MANE2:MANE;
        else if(near&&t>.14)col=(l<-.1?PALE[3]:(px+py)&1&&l<.3?PALE[3]:COAT[3]);
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,near?0:1)];
        put(px,py,near?12:-6,col,6)}};
    {const e=HP.ear,bk=-Math.PI+.42,nA=-1.41,fA=-.92,[f0,f1]=Wp(1.8,-5.2),[n0,n1]=Wp(.4,1.6);
      ear(f0,f1,fA+(bk+.1-fA)*e,11.5,0);ear(n0,n1,nA+(bk-nA)*e,13,1)}
    /* a short forelock lies back over the poll between the ears */
    for(const[u,v]of[[1,-2.4],[.2,-1],[1.6,-.4]]){const[r0,r1]=Wp(u+1.4,v),[e0,e1]=Wp(u-1.2,v+1.8);cap(r0,r1,.9,e0,e1,.8,14,()=>MANE,8)}
    /* the eye, large and dark in its pale ring, under the brow on the near side; the nostril on the front of the muzzle; the mouth */
    {const[e0,e1]=Wp(9,3),X=Math.floor(e0),Y=Math.floor(e1),sh=(x,y,c)=>{if(partAt(x,y)===3)set(x,y,c)};
      for(const[dx,dy,c]of[[-1,-1,MEAL[0]],[0,-1,MEAL[0]],[1,-1,MEAL[0]],[2,-1,MEAL[1]],[-2,0,MEAL[1]],[3,0,MEAL[1]],[-1,1,MEAL[1]],[3,1,MEAL[2]],[0,2,MEAL[1]],[1,2,MEAL[1]],[2,2,MEAL[2]]])sh(X+dx,Y+dy,c);
      for(const dx of[-1,0,1,2])sh(X+dx,Y,EYE);for(const dx of[0,1,2])sh(X+dx,Y+1,dx===2?'#2a1e18':EYE);sh(X,Y,'#4e3e36');
      for(const dx of[-2,-1,0,1])sh(X+dx,Y-2,COAT[3])}
    for(const[u,v,c]of[[26.8,-1.8,MEAL[4]],[27.4,-.9,'#2a1e18'],[28,0,'#2a1e18'],[28,.9,MEAL[4]]]){const[n0,n1]=Wp(u,v);if(partAt(n0,n1)===3)set(n0,n1,c)}
    if(!HP.jaw)for(let u=24;u<=30.4;u+=.5){const[p,q]=Wp(u,3.8);if(partAt(p,q)===3)set(p,q,MEAL[4])}
    /* As it brays, the muzzle and the mouth are placed by hand, pixel by pixel, after the maintainer's picture, one map to each frame of
       the voice: the coat warming into a mealy muzzle, lit along its top; a round dark nostril high on its front in a ring of shade; the
       upper lip below it brown, and its underside dark; the mouth dark within, with a glimpse of the front teeth; the lower lip and the
       chin brown, darker underneath. A map is laid over what the masses painted: '.' leaves a pixel as it is, any other letter sets it
       (see VMC). The maps keep to the muzzle and the jaw; nothing else of the head changes. */
    if(VMZ[fr]){const[x0,y0,R]=VMZ[fr];R.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch==='.')continue;const k=idx(x0+i,y0+j);if(k<0)continue;
      if(ch===' '){Pb[k]=0;Zb[k]=-1e9;continue}Cb[k]=VMC[ch];if(!Pb[k]){Pb[k]=3;Zb[k]=99}}})}
    /* the loads */
    const topAt=X=>{let Y=-Y0;while(Y<0&&![1,2].includes(partAt(X,Y)))Y++;return Y},botAt=X=>{let Y=-1;while(Y>-Y0&&partAt(X,Y)!==1)Y--;return Y};
    if(load>=0){/* the saddle blanket on the back, following its line, and one girth from its front corner down behind the elbow */
      const K=['#b4604c','#9a4a3a','#7e3a2e','#642a24','#4a1e1c'];for(let X=-15;X<=8;X++){const tp=topAt(X)-1;for(let i=0;i<13;i++){const u=(X+15.5)/24;
        set(X,tp+i,i===9?'#d4c49c':K[i===0?0:i===12?4:u<.1?4:u<.28?3:u<.82?2:1])}}
      if(!load){const yb=topAt(8)+12,yb2=botAt(9);for(let Y=yb;Y<=yb2;Y++){const X=8+Math.round((Y-yb)/Math.max(1,yb2-yb)*1.5);set(X,Y,STRAP);set(X-1,Y,STRAP_LIT)}}}
    if(load>0){/* the pack saddle's pad over the blanket, and a pack bag of dark goat's hair, banded, hanging on each side; the near one hides the far */
      const S=ramp('#6a4a2c'),B=ramp('#3e3029'),full=load>1;for(let X=-11;X<=11;X++){const tp=topAt(X)-4,u=(X+11.5)/23;for(let i=0;i<4;i++)set(X,tp+i,S[i===0?(u>.5?0:1):u<.15?4:u<.4?3:2])}
      const bt=topAt(0)+4,bh=full?28:25;for(let i=0;i<bh;i++){const s=i/(bh-1),hw=Math.round(15.5+(full?2.5:1.2)*Math.sin(Math.PI*Math.min(1,s*1.15))-(s>.86?(s-.86)*28:0));
        for(let X=-hw;X<=hw;X++){const u=(X+hw+.5)/(2*hw+1);let v=u<.1?4:u<.3?3:u<.78?2:1;if(i<2)v=Math.max(0,v-1);if(s>.84)v=Math.min(4,v+1);
          const band=i===5||i===6||i===bh-6;set(X-1,bt+i,band?(v<2?'#b88a44':v<3?'#9a6e34':'#6e4c26'):B[v])}}
      for(let X=-15;X<=15;X++)set(X-1,bt,X%2?S[1]:S[2]);
      if(full){/* wool bulging out of the bags' mouths, and fleeces, folded and piled on the pack saddle four deep, each a little narrower
          than the one under it, their edges hanging in soft waves and drooping over the bags at the ends; curls of shade in the wool */
        const Wl=ramp('#d8ceb6');for(let X=-16;X<=16;X++){const h=2+((X*7+3)%5+5)%5%3;for(let j=0;j<h;j++)set(X-1,bt-1-j,Wl[j===h-1?0:j?1:2])}
        for(let L=0;L<4;L++){const yb=bt+2-L*7,hw=20-L*2.6,cx=(L%2?1.5:-.5)-1,Q=ramp(['#d4c9ae','#dcd2b8','#cfc3a6','#d9cfb4'][L]);
          for(let X=Math.floor(cx-hw);X<=Math.ceil(cx+hw);X++){const e=(X-cx)/hw;if(Math.abs(e)>1)continue;
            const bot=yb+Math.round(1.2*Math.sin(X*.8+L*1.7))+(Math.abs(e)>.82?2:0),top=yb-9+Math.round(3*Math.pow(Math.abs(e),3))+(((X*5+L*3)%7+7)%7<2?1:0);
            for(let Y=top;Y<=bot;Y++){const t=(Y-top)/Math.max(1,bot-top);let v=t<.2?0:t<.45?1:t<.8?2:3;if(e<-.75)v=Math.min(4,v+1);if(e>.7&&v>1)v--;
              if(v<3&&((X*3+Y*7+L)%11===0||(X*3+Y*7+L)%11===1&&t>.3))v++;if(Y===bot)v=Math.max(v,3);set(X,Y,Q[v])}}}}}
    /* a pinhole the masses leave between them (a speck or two where an ear, the mane and the head meet) is filled from its neighbour */
    {const seen=new Uint8Array(FW*FH);for(let i=0;i<FW*FH;i++){if(Pb[i]||seen[i])continue;const st=[i],comp=[];let edge=false;seen[i]=1;
      while(st.length){const k=st.pop(),x=k%FW,y=(k-x)/FW;comp.push(k);if(!x||!y||x===FW-1||y===FH-1)edge=true;
        for(const j of[k-1,k+1,k-FW,k+FW])if(j>=0&&j<FW*FH&&!seen[j]&&!Pb[j]&&Math.abs(j%FW-x)<=1){seen[j]=1;st.push(j)}}
      if(!edge&&comp.length<8)for(const k of comp){const n=[k-1,k+1,k-FW,k+FW].find(j=>Pb[j]&&Pb[j]!==10);if(n!=null){Cb[k]=Cb[n];Pb[k]=10}}}}
    /* lay the buffer down */
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
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
