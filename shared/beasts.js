/* Paul of Tarsus: the animals, painted pixel by pixel in the manner of the figures (person() in index.html) and placed with figure(), so that
   they stand in the depth queue, take the light of the room they stand in and cast its shadows. Loaded on demand via CHAP[n].needs (see
   need() in index.html). Registered in shared/pwa.js for offline play.

   Placing an animal, inside a room's draw() or a cutscene:
     donkey(g, x, y, dir, fr, load, lit, z)   a pack donkey with its feet at x,y. dir 1 faces right, -1 left. fr: 0 stands, 4 to 19 the
                                              frames of its walk (frame.donkey gives the frame for a distance walked), 20 and up the frames
                                              of its voice (see speak). load: 0 a saddle blanket, 1 pack bags, 2 bags filled with sacks on
                                              top (-1 bare, for comparison sheets). lit: the light on it (lightAt), or nothing for daylight
     mule(g, x, y, dir, fr, load, lit, z)     a pack mule, the same way
     ox(g, x, y, dir, fr, coat, gar, lit, z)  an ox or a bull. coat: its color. gar: a garland round its neck (Acts 14:13). z: depth override
                                              when a yoked team sorts together while still queuing its floor/wall shadows in SQ
     sheep(g, x, y, dir, fr, look, lit, z)    a ewe, ram or lamb. look: a number, one of the flock's looks (SHEEP.LOOKS; 4 is a horned ram, 6 and 7 are lambs), or
                                              {fl, face, k, ram, lamb}. fr: 0 stands, 4 to 19 walk, 20 and 21 bleat, 22 and 23 chew, 24 and 25 graze
     sheepStill(g, x, y, dir, fr, look)       a sheep painted into a backdrop, with its contact shadow
     flock(n, seed)                           n sheep's {look, dir, fr}: their looks, ways and poses, a lamb for every three adults and at most one ram; the room
                                              places them, far enough apart that no head lies over another sheep's body
   Walking: everybody covers ground at WALK_V, the animals too, so that a donkey keeps up with whoever leads it.
     frame.donkey(dist, v), frame.mule(dist, v), frame.ox(dist, v), frame.sheep(dist, v, look)
                                              the frame of the walk after dist room pixels at v room pixels a second (WALK_V if none)
   Its voice: an animal that is talked to brays or lows, and its head and mouth move with the sound.
     speak(id, kind, look)                    plays the voice of kind ('donkey', 'mule', 'ox', 'sheep': a lamb's bleat is higher) and moves the animal that the room draws as
                                              id; resolves when the sound is over
     pose(id, fr)                             the frame to draw the animal id with: fr, or the frame of its voice while it speaks
   Shadows: each kind's span(fr) gives [sw, sx] in room pixels from the four hooves' spread in frame fr (just like walkSw() for people), so
   the contact oval centers under the hooves and breathes with the stride, while figShadow() projects cast and wall-bent shadows from the sprite.
   For the playtest:
     paint.donkey, paint.mule, paint.ox, paint.sheep   the painters themselves, (g, 0, 0, dir, fr, ...) into a sprite
     kinds.donkey, kinds.mule, kinds.ox, kinds.sheep   each kind's numbers: its gait, its voice, sw and span(fr) */
SHARED.beasts=(()=>{

/* ================================================================ the donkey ================================================================ */
const DONKEY=(()=>{
  /* A small grey pack donkey, drawn after the maintainer's reference picture: seen from the side, its head carried on a trim, fairly
     upright neck and turned three-quarters toward us, so that both long ears read in an alert V: the near one shows its pale inside
     centered between dark rims and tip, the far one its darker back. A short erect dark mane, a dark dorsal stripe along the back from
     the withers to the tail (and no stripe across the shoulders or vertical crease behind the shoulder, which would make a cross), an
     almond dark eye with a pale lower/inner lid ring, a pale muzzle with a dark nostril and dark lips, an arched underline with a dark
     shade band above a curved pale belly highlight and a soft pale wrap on the lower brisket, slender tapering legs dark from the knees
     and hocks down (at rest, the far hooves sit two drawing units higher in three-quarter perspective; walking, planted hooves stand on
     the ground line with zero slip), and a tail set on at the rounded croup that tapers to a pointed dark tuft behind the hocks. */
  const REACH=30,STANCE=.625,STRIDE=REACH/STANCE/2,BEAT=.5;
  const frame=(dist,v)=>{const c=Math.max(STRIDE,Math.abs(v==null?WALK_V:v)*BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const COAT=ramp('#766962'),PALE=ramp('#c4b6a6'),LOW=ramp('#48403c'),HOOF=ramp('#39302c'),DARK='#261f21',DARK2='#463e3c',INNER='#5a2622';
  const HEAD={rest:{px:33.5,py:-63.0,al:64,jaw:0,ear:0},20:{px:33.5,py:-64.5,al:34,jaw:0,ear:1},21:{px:34,py:-65,al:10,jaw:16,ear:1},
    22:{px:34,py:-65,al:0,jaw:28,ear:1},23:{px:33.5,py:-64,al:49,jaw:0,ear:.4}};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  const smooth=(P,n=4)=>{const R=[],N=P.length;for(let i=0;i<N;i++){const p0=P[(i+N-1)%N],p1=P[i],p2=P[(i+1)%N],p3=P[(i+2)%N];
    for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;R.push([0,1].map(c=>.5*(2*p1[c]+(p2[c]-p0[c])*t+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*t2+(3*p1[c]-p0[c]-3*p2[c]+p3[c])*t3)))}}return R};
  const SF=16.5,SH=-19.5;
  const atPose=(W,ph,off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=REACH,Bs=STANCE;if(p<Bs)return{hx:T/2-T*p/Bs,lift:0,bend:0};
    const v=(p-Bs)/(1-Bs),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:v?2+Math.round(4.5*q):0,bend:q}};
  const shadowSpan=fr=>{const W=fr>=1&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,
      xs=[SH+atPose(W,ph,.5,6.8).hx,SF+atPose(W,ph,.75,3.4).hx,SH+atPose(W,ph,0,-3.5).hx,SF+atPose(W,ph,.25,-1.0).hx],
      x0=Math.min(...xs)-2.5,x1=Math.max(...xs)+3;return[(x1-x0)/4+1.5,(x0+x1)/4]};

  function donkey(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>=1&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0,
      tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,HP=Object.assign({},HEAD[fr>=20?fr:'rest']);HP.py+=o+hd;HP.px+=hd*.4;
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const put=(px,py,z,col,part)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;if(z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return 0;return Pb[(py+Y0)*FW+px+X0]};
    const set=(px,py,col)=>{px=Math.floor(px);py=Math.floor(py);if(py>=0||py<-Y0||px<-X0||px>=FW-X0)return;const i=(py+Y0)*FW+px+X0;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=50}};
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.5-ny*.72+nz*.5+((px+py)&1?.05:-.05);return Math.max(0,Math.min(4,(s>.9?0:s>.64?1:s>.28?2:s>-.06?3:4)+(ex||0)))};
    const coat=(ex,R)=>(nx,ny,nz,px,py)=>(R||COAT)[tn(nx,ny,nz,px,py,ex)];
    const mass=(P,L,R,mat,part,soft=1)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[a,b]of P){x0=Math.min(x0,a);x1=Math.max(x1,a);y0=Math.min(y0,b);y1=Math.max(y1,b)}const N=P.length;
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const cx=px+.5,cy=py+.5;let inn=false,best=1e9,ex=0,ey=0;
        for(let i=0,j=N-1;i<N;j=i++){const[ax,ay]=P[j],[bx,by]=P[i];if((ay>cy)!==(by>cy)&&cx<(bx-ax)*(cy-ay)/(by-ay)+ax)inn=!inn;
          const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1;let t=((cx-ax)*dx+(cy-ay)*dy)/l2;t=t<0?0:t>1?1:t;const qx=ax+dx*t-cx,qy=ay+dy*t-cy,d2=qx*qx+qy*qy;if(d2<best){best=d2;ex=qx;ey=qy}}
        if(!inn)continue;const d=Math.sqrt(best),q=Math.max(0,1-d/R)*soft,l=d||1,nz=Math.sqrt(1-q*q);put(px,py,L*100+R*nz,mat(ex/l*q,ey/l*q,nz,px,py),part)}};
    const ell=(cx,cy,cz,a,b,mat,part)=>{const R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const u=(px+.5-cx)/a,v=(py+.5-cy)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),l=Math.hypot(u,v,w);put(px,py,cz+Math.max(a,b)*w,mat(u/l,v/l,w/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    const B=P=>P.map(([a,b])=>[a,b+o]);
    const fb=mat=>(nx,ny,nz,px,py)=>nx<0?mat(0,ny,Math.sqrt(1-ny*ny),px,py):mat(nx,ny,nz,px,py);
    const at=(off,st)=>atPose(W,ph,off,st);
    const leg=(sx,P,near,hind)=>{const L=near?150:-100,ex=near?0:2,gy=(!W&&!near)?-2:0,
        up0=coat(near?0:1),up=(nx,ny,nz,px,py)=>{
          const t=ny<0?up0(nx,0,Math.sqrt(1-nx*nx),px,py):up0(nx,ny,nz,px,py);
          return near&&!hind&&nx>.55&&py<-24?PALE[2]:near&&nx<-.55?COAT[3]:t},
        lo=coat(near?0:1,LOW),b=P.bend,
        hx=sx+P.hx,fx=hx-.6,fy=gy-5.2-P.lift,tx=sx,ty=(hind?-41:-39)+o,dx=fx-tx,dy=fy-ty,Ln=Math.hypot(dx,dy),bx=-dy/Ln,by=dx/Ln;
      let jx,jy;
      if(hind){const gx=tx+dx*.32+bx*1.8,gy2=ty+dy*.32+by*1.8;jx=tx+dx*.60+bx*(3.5+2.4*b);jy=ty+dy*.60+by*(3.5+2.4*b);
        cap(tx-.4,ty,5.8,gx,gy2,4.5,L,up,4);cap(gx,gy2,4.3,jx,jy,2.3,L,up,4);cap(jx-bx*.3,jy-by*.3,2.1,jx+bx*1.4-dx/Ln*1.0,jy+by*1.4-dy/Ln*1.0,1.05,L+1,lo,4);cap(jx,jy,1.95,fx,fy,1.6,L,lo,4)}
      else{jx=tx+dx*.62-bx*4.5*b;jy=ty+dy*.62-by*4.5*b;
        cap(tx+.2,ty+3,3.6,jx,jy,2.15,L,up,4);ell(jx,jy,L+1,2.2,2.1,lo,4);cap(jx,jy,1.85,fx,fy,1.6,L,lo,4)}
      ell(fx,fy,L+1,1.95,1.85,lo,4);
      const d0=.3*(1-b)-(hind?.2:.75)*b,d1=(1-b)+(hind?.9:.62)*b,dl=Math.hypot(d0,d1),ux=d0/dl,uy=d1/dl;
      cap(fx,fy,1.6,fx+ux*2.3,fy+uy*2.3,1.6,L,lo,4);
      const hm=(nx,ny,nz,px,py)=>HOOF[Math.min(4,tn(nx,ny,nz,px,py,ex))];
      let Q;if(!P.lift){const cx=fx+ux*2.3;Q=[[cx-1.6,gy-3],[cx+1.4,gy-3],[cx+2.8,gy],[cx-2.1,gy]]}
      else{const cx=fx+ux*2.2,cy=fy+uy*2.2,vx=uy,vy=-ux;Q=[[cx-vx*1.6,cy-vy*1.6],[cx+vx*1.4,cy+vy*1.4],[cx+vx*2+ux*2.6,cy+vy*2+uy*2.6],[cx-vx*1.9+ux*2.6,cy-vy*1.9+uy*2.6]]}
      mass(Q,L/100+.02,1.2,hm,5,.6)};
    leg(SH,at(.5,6.8),0,1);leg(SF,at(.75,3.4),0,0);leg(SH,at(0,-3.5),1,1);leg(SF,at(.25,-1.0),1,0);

    const bBot=px=>{const u=(px-1)/15;return-28.6-3.4*u*u-(px<-5?Math.pow((-5-px)/9,1.7)*2.6:0)};
    const belly=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),Y=py-o,yb=bBot(px),c=(px+py)&1;
      if(px>-16.5&&px<13.5&&Y>=yb-2.8+(c?.3:-.3))return PALE[Y>yb-.9?3:Y>yb-1.8?2:1];
      if(px>-16&&px<13&&Y>=yb-4.8+(c?.4:-.4))return COAT[Math.max(b,3)];
      if(px>=17.5&&px<24&&Y>=-36.0+(px-20)*.4+(c?.4:-.4))return PALE[b<3?2:3];
      return COAT[b]};
    mass(smooth(B([[11,-52.2],[3,-52.2],[-5,-53.0],[-12,-54.8],[-17.5,-55.2],[-22,-53.2],[-25.2,-49.2],[-26.4,-44.0],[-25.6,-38.2],[-23.4,-33.8],
      [-18.5,-34.2],[-13.5,-32.2],[-7.5,-29.8],[-1,-28.5],[5.5,-28.5],[11.5,-29.6],[16.5,-30.8],[21,-33.2],[24.2,-37.2],[24.8,-41.8],[22.8,-46.8],[18.5,-50.2],[14.5,-51.8]])),0,9,belly,1);
    mass(smooth(B([[-12,-53.2],[-17.5,-55.0],[-22,-53.0],[-25.2,-49.0],[-26.3,-43.8],[-25.0,-38.2],[-22.6,-33.5],[-19.2,-31.8],[-16.8,-34.2],[-14.2,-38.2],[-11,-43.5],[-9.8,-48.5]])),2,6.2,
      (nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),Y=py-o;return Y>-33.8&&px>-17&&((px+py)&1||Y>-32.5)?PALE[2]:COAT[nx<-.5?Math.min(4,b+1):b]},1,.72);
    mass(smooth(B([[13,-49],[17.5,-49.8],[21.5,-47],[24.2,-42.2],[24.4,-37.8],[22.2,-33.2],[18.2,-31.0],[14.5,-31.8],[12.2,-35.0],[11.5,-40.5],[12,-45.5]])),2,5.8,
      (nx,ny,nz,px,py)=>{const Y=py-o;if(px>18.5&&Y>-35.5+((px+py)&1?.5:-.5))return PALE[2];
        const q=Math.hypot(nx,ny),c=(px+py)&1,c4=(px&1)+(py&1)*2;
        return COAT[q<.15?1:q<.35?(c?1:2):q<.55&&c4===0?1:tn(Math.max(0,nx),ny,nx<0?Math.sqrt(1-ny*ny):nz,px,py)]},1);
    {const T=[[-23.5,-51.2],[-25.9,-47.0],[-27.0,-41.2],[-27.2+tl*.35,-35],[-26.9+tl*.7,-29.5]],tc=coat(1,LOW);
      for(let i=0;i<T.length-1;i++)cap(T[i][0],T[i][1]+o,1.25,T[i+1][0],T[i+1][1]+o,1.05,120,tc,7);
      for(let dy=0;dy<=9;dy++){const s=dy/9,hw=s<.45?.85+s*2.1:1.8*(1-(s-.45)/.58),cx=-26.9+tl*(.7+s*.3)+(s>.5?(s-.5)*1.0:0),py=Math.round(-30+dy+o);
        for(let px=Math.floor(cx-hw);px<=Math.ceil(cx+hw);px++)if(Math.abs(px+.5-cx)<=hw)put(px,py,121,(px+py)%3?DARK:DARK2,7)}}

    const a=HP.al*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,Wp=(u,v)=>[HP.px+u*ux+v*vx,HP.py+u*uy+v*vy],
      lu=(px,py)=>(px+.5-HP.px)*ux+(py+.5-HP.py)*uy,lv0=(px,py)=>(px+.5-HP.px)*vx+(py+.5-HP.py)*vy,
      ja=HP.jaw*Math.PI/180,hu=9,hv=7,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v)),
      muz=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py);return lu(px,py)+((px+py)&1?.5:0)>16.8?PALE[Math.max(1,Math.min(3,b))]:COAT[b]};
    mass(smooth([[-1.8,1],[-.8,-2.5],[2.5,-4.2],[7,-4.6],[11,-4.2],[14,-3.4],[15,2.8],[13.8,10.2],[10.2,11.6],[6.2,11.0],[2.8,8.5],[.2,5.0]].map(p=>Wp(...p))),3,5,
      (nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),v=lv0(px,py),u=lu(px,py);return v>8.8&&u>3&&u<13?COAT[Math.min(4,b+1)]:COAT[b]},3,.82);
    mass(smooth([[11,-4.0],[16,-3.4],[20.2,-2.9],[23.4,-1.8],[24.8,.3],[24.8,3.3],[23.5,5.6],[20.6,6.4],[15.8,7.0],[12,6.8],[10.5,2]].map(p=>Wp(...p))),3.3,4.4,muz,3,.7);
    mass(smooth([[8.5,8.2],[12.2,11.0],[17.2,9.6],[21.5,7.8],[23.2,6.2],[20.6,5.4],[15.8,6.0],[11,6.3]].map(p=>Wr(...p))),3.1,3.4,muz,3,.7);
    if(HP.jaw){
      mass([Wp(11,6.4),Wp(23.6,5.6),Wr(23.0,6.0),Wr(11,6.3)],3.05,1,()=>INNER,3,0);
      for(let u=16;u<=22;u+=.5){const[p,q]=Wp(u,6.2);put(p,q,331,'#ece4d0',3);const[r,s]=Wr(u+.3,5.9);put(r,s,331,'#d8ceb6',3)}}
    const CR=B([[9.5,-52.0],[14.5,-55.0],[19.5,-58.6],[24.5,-62.0]]);
    mass(smooth([...CR,Wp(-.5,1.4),Wp(5,8.6),Wp(10,10.6),...B([[26.2,-42.8],[24.5,-37.5],[19.5,-35.5],[12,-41.5]])]),.5,6.6,fb((nx,ny,nz,px,py)=>{
      const q=Math.hypot(nx,ny),b=tn(nx,ny,nz,px,py);return COAT[q>.18&&q<.6&&(nx*.75+ny*.66)/q>.55?(q>.52||q<.24?((px+py)&1?1:b):1):b]}),2,.7);
    const ear=(bx0,by0,ang,len0,near,w)=>{const ex=Math.cos(ang),ey=Math.sin(ang),bx=bx0-ex*2,by=by0-ey*2,len=len0+2,R=len+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=w*Math.sin(Math.PI*(t*.8+.2));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.82)col=DARK;else if(Math.abs(s)>hw-1.15)col=near&&l>0?DARK:DARK2;
        else if(near&&t>.15&&Math.abs(s-.15)<hw-1.35)col=PALE[l<.05?2:3];
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,near?0:1)];
        put(px,py,near?400:-60,col,6)}};
    {const e=HP.ear,bk=-Math.PI+.42,an=-1.38,af=-1.08,[f0,f1]=Wp(1.6,-3.6),[n0,n1]=Wp(-.8,1.4);
      ear(f0,f1,af+(bk+.1-af)*e,14.2,0,2.7);ear(n0,n1,an+(bk-an)*e,15.8,1,3.15)}
    {const C=[...CR,Wp(-.6,.6)];for(let i=0;i<C.length-1;i++){const[x0,y0]=C[i],[x1,y1]=C[i+1],L=Math.hypot(x1-x0,y1-y0),nx=(y1-y0)/L,ny=-(x1-x0)/L,n=Math.ceil(L/.5);
      for(let j=0;j<n;j++){const t=j/n,cx=x0+(x1-x0)*t,cy=y0+(y1-y0)*t,s=(i+t)/(C.length-1),h=.5+1.2*Math.min(1,s*1.8)+((j+i*3)%5<2?.4:0);
        for(let d=-.8;d<=h;d+=.5)put(cx+nx*d,cy+ny*d,250,d>h-.5&&(j%3===0)?DARK2:DARK,8)}}}
    for(const[u,v]of[[-.4,1.2],[-.9,-.6],[.4,-2.0]]){const[r0,r1]=Wp(u+1.2,v),[t0,t1]=Wp(u-1.3,v+1.5);cap(r0,r1,.95,t0,t1,.75,350,()=>DARK,8)}
    {const[e0,e1]=Wp(8.8,2.0),X=Math.floor(e0),Y=Math.floor(e1),es=(x,y,c)=>{if(partAt(x,y)===3)set(x,y,c)};
      for(const dx of[-1,0,1])es(X+dx,Y-1,COAT[3]);es(X-2,Y,PALE[2]);es(X+2,Y,PALE[2]);
      for(const[dx,dy]of[[-1,2],[0,2],[1,2],[2,1]])es(X+dx,Y+dy,PALE[2]);
      for(const dx of[-1,0,1])es(X+dx,Y,'#16110e');for(const dx of[0,1])es(X+dx,Y+1,dx===1?'#342820':'#1c1610');es(X-1,Y+1,PALE[3]);es(X,Y,'#4c423a')}
    {const lv=(px,py)=>(px+.5-HP.px)*vx+(py+.5-HP.py)*vy,ju=(px,py)=>hu+(lu(px,py)-hu)*Math.cos(ja)+(lv(px,py)-hv)*Math.sin(ja),
        zAt=(x,y)=>{x=Math.floor(x);y=Math.floor(y);if(y>=0||y<-Y0||x<-X0||x>=FW-X0)return -1e9;const i=(y+Y0)*FW+x+X0;return Pb[i]===3?Zb[i]:-1e9},
        low=(x,y)=>lv(x,y)>4.6-.3*(lu(x,y)-19.5),
        isA=(x,y)=>{const z=zAt(x,y);return HP.jaw?z>332.8&&z<335:z>299&&z<335&&lu(x,y)>16.6&&!low(x,y)},
        isB=(x,y)=>{const z=zAt(x,y);return HP.jaw?z>311.8&&z<314:z>299&&z<335&&lu(x,y)>16.0&&low(x,y)},
        isK=(x,y)=>!HP.jaw&&isA(x,y)&&lu(x,y)>19.2&&(isB(x,y+1)||isB(x-1,y)||lv(x,y)>1.2&&lu(x,y)>23.4&&partAt(x,y+1)!==3),
        [c0,c1]=Wp(19.5,3),X=Math.floor(c0),Y=Math.floor(c1);
      for(let py=Y-12;py<=Y+12;py++)for(let px=X-12;px<=X+12;px++){
        if(isB(px,py)&&ju(px,py)<=16.6){if(ju(px,py)>16.0&&PALE.includes(Cb[(py+Y0)*FW+px+X0]))set(px,py,COAT[2])}
        else if(isB(px,py))set(px,py,partAt(px,py+1)!==3?LOW[2]:ju(px,py)>18.6&&!isB(px,py-1)?PALE[3]:COAT[2]);
        else if(isK(px,py))set(px,py,DARK);
        else if(isA(px,py)&&lu(px,py)>21.8){let d=1;while(d<4&&isA(px,py+d)&&!isK(px,py+d))d++;if(d<=2)set(px,py,PALE[4]);else if(d===3)set(px,py,PALE[3])}
        else if(isA(px,py)&&lu(px,py)>17.0){let d=1;while(d<3&&isA(px,py+d)&&!isK(px,py+d))d++;if(lu(px,py)>18.2&&d<=2||Cb[(py+Y0)*FW+px+X0]===PALE[3])set(px,py,PALE[2])}}
      const[n0,n1]=Wp(20.5,1.2),NX=Math.floor(n0),NY=Math.floor(n1);
      for(const[dx,dy,c]of[[0,0,'#231a18'],[0,1,'#2a201c'],[1,1,'#3a2e28']])if(isA(NX+dx,NY+dy))set(NX+dx,NY+dy,c)}
    for(let X=-21;X<=10;X++){let Y=-Y0;while(Y<0&&![1,2].includes(partAt(X,Y)))Y++;if(Y<-1&&partAt(X,Y+1)===1)set(X,Y+1,X>-19&&X<8?DARK:DARK2)}
    const topAt=X=>{let Y=-Y0;while(Y<0&&![1,2,8].includes(partAt(X,Y)))Y++;return Y},botAt=X=>{let Y=-1;while(Y>-Y0&&partAt(X,Y)!==1)Y--;return Y};
    if(load>=0){const K=ramp('#8a3e30'),bt=X=>{let Y=-Y0;while(Y<0&&partAt(X,Y)!==1)Y++;return Y};for(let X=-12;X<=12;X++){const t0=bt(X)-1,n=12;for(let i=0;i<n;i++){if([2,8].includes(partAt(X,t0+i)))continue;let v=i===0?0:i>=n-2?3:X>10?1:X<-10?3:2;if(i===7)v=-1;set(X,t0+i,v<0?'#d8c9a0':i===8?K[4]:K[v])}}
      if(!load){const yb=bt(9)+10,yb2=botAt(9);for(let Y=yb;Y<=yb2;Y++){const X=9+Math.round((Y-yb)/Math.max(1,yb2-yb)*1.4);set(X,Y,'#6a4628');set(X+1,Y,'#4a2e18')}}}
    if(load>0){const Bg=ramp('#4a3c30'),S=ramp('#b8a47c'),Rd=ramp('#8a3a2c'),L=ramp('#7a5a3a'),cy=(load>1?-37:-38.5)+o,a2=load>1?15:14.5,b2=load>1?11.5:10;
      for(let Y=Math.floor(cy-b2);Y<=cy+b2;Y++)for(let X=Math.floor(-a2);X<=a2;X++){const u=(X+.5)/a2,v=(Y+.5-cy)/b2,q=1-Math.pow(Math.abs(u),4)-Math.pow(Math.abs(v),load>1?3:6);if(q<0)continue;
        const nz=Math.pow(q,.35)*(load>1?1:.8),n=Math.hypot(Math.pow(u,3),Math.pow(v,3)*.8,nz),b=tn(Math.pow(u,3)/n,Math.pow(v,3)*.8/n,nz/n,X,Y);
        set(X,Y,v<-.8?L[Math.max(0,b-1)]:v>-.42&&v<-.26?S[b]:v>.3&&v<.44?Rd[b]:Bg[b])}
      if(load>1){
        const sack=(sx,sc)=>{const Q=ramp(sc),qm=(nx,ny,nz,px,py)=>Q[tn(nx,ny,nz,px,py)],by=topAt(Math.round(sx))+1,cy2=by-5.5;ell(sx,cy2,900,6.5,5.8,qm,9);
          cap(sx-1,cy2-4,3.4,sx+.3,cy2-7.5,2.2,901,qm,9);for(let d=-1;d<=1;d++)set(sx+d,cy2-7.5,'#6a4a2a');ell(sx+.6,cy2-9.2,902,3,1.7,qm,9)};
        sack(-6,'#c4b282');sack(5.5,'#d4c294')}}
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
    g.restore()}
  const sound=()=>{const t=now();tone({f:610,to:780,t:t+.19,d:.32,type:'sawtooth',v:.035,a:.05,sus:1,vib:12,lp:[[2600,0],[1800,.3]]});
    tone({f:300,to:222,t:t+.6,d:.48,type:'sawtooth',v:.05,a:.03,sus:1,vib:7,lp:[[1700,0],[700,.48]]});
    tone({f:304,to:226,t:t+.6,d:.48,type:'square',v:.018,a:.03,sus:1,lp:[[900,0],[500,.48]]})};
  return{paint:donkey,frame,reach:REACH,stance:STANCE,stride:STRIDE,beat:BEAT,
    voice:[[0,20],[150,21],[210,22],[500,21],[580,22],[1060,21],[1140,20],[1230,23],[1350,0]],sound,sw:13.5,span:shadowSpan}})();
/* ============================================================== end of the donkey ============================================================ */


/* ================================================================= the mule ================================================================= */
const MULE=(()=>{
  /* A bay pack mule, a size bigger than the donkey and built with the leggy, compact proportions of the maintainer's reference: clear
     daylight under an arched flank, a rounded high croup, muscular thigh and tapered forearm down to slim dark cannons and neat hooves
     (the far hooves stepped higher in perspective at rest), a trim straight neck crest under a short upright roached mane, long pointed
     mule ears set in an alert V, a tapered head with warm brown nose bridge blending softly into the mealy muzzle, dark brow over an
     almond eye with subtle pale lower lid, pale buff chest/axilla wrap and sandy-tan belly rim, and a full dark tail hugging the buttock
     and tapering to a wispy switch near the hock. */
  const MULE_REACH=36,MULE_STANCE=.625,MULE_STRIDE=MULE_REACH/MULE_STANCE/2,MULE_BEAT=.6;
  const muleFr=(dist,v)=>{const c=Math.max(MULE_STRIDE,Math.abs(v==null?WALK_V:v)*MULE_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const COAT=['#9e7350','#855c3b','#6c472b','#52321d','#382012'],PALE=['#c8ac8e','#b29272','#98785a','#7c5e46','#5e4432'],
    MEAL=['#d0be9e','#baa284','#9e846a','#806852','#604c3c'],PT=['#5a3c2b','#462d1f','#352016','#25150e','#180d08'],
    HOOF=['#50423c','#3a2e28','#2a201c','#1e1612','#140e0b'],MANE='#1e120c',MANE2='#3a2418',EYE='#120c0a',MOUTH='#3a1814',TEETH='#d8cdb2',
    STRAP='#5c3318',STRAP_LIT='#8a5a30';
  const HEADS={0:{px:39.5,py:-77.2,al:67,jaw:0,ear:0},20:{px:40.5,py:-80.5,al:38,jaw:0,ear:1},21:{px:41.5,py:-80.5,al:16,jaw:20,ear:1},
    22:{px:42.5,py:-80.5,al:6,jaw:34,ear:1},23:{px:41,py:-79.5,al:28,jaw:12,ear:.6}};
  const VMC={a:COAT[0],b:COAT[1],c:COAT[2],d:COAT[3],e:COAT[4],0:MEAL[0],1:MEAL[1],2:MEAL[2],3:MEAL[3],4:MEAL[4],
    w:'#a38466',p:'#b39d82',g:'#968272',n:'#5e4c3a',N:'#1c100a',l:'#7e6250',L:'#644838',k:'#4a3428',M:'#24120e',q:'#4a2620',T:'#c4b89c'};
  const VMZ={
    20:[54,-69,[
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
    21:[60,-79,[
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
    22:[59,-84,[
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
    23:[57,-73,[
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
  const SH=-24.5,SF=18;
  const atPose=(W,ph,off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=MULE_REACH,B=MULE_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
    const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:v?2+Math.round(5*q):0,bend:q}};
  const shadowSpan=fr=>{const W=fr>0&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,
      xs=[SH+atPose(W,ph,.5,5.2).hx,SF+atPose(W,ph,.75,3.8).hx,SH+atPose(W,ph,0,-3.5).hx,SF+atPose(W,ph,.25,-1.5).hx],
      x0=Math.min(...xs)-2.5,x1=Math.max(...xs)+3;return[(x1-x0)/4+1.6,(x0+x1)/4]};

  const smooth=(P,n=4)=>{const R=[],N=P.length;for(let i=0;i<N;i++){const p0=P[(i+N-1)%N],p1=P[i],p2=P[(i+1)%N],p3=P[(i+2)%N];
    for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;R.push([0,1].map(c=>.5*(2*p1[c]+(p2[c]-p0[c])*t+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*t2+(3*p1[c]-p0[c]-3*p2[c]+p3[c])*t3)))}}return R};

  function mule(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>0&&fr<20,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][k%8]:0;
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const idx=(px,py)=>py>=0||py<-Y0||px<-X0||px>=FW-X0?-1:(py+Y0)*FW+px+X0;
    const put=(px,py,z,col,part)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{const i=idx(Math.floor(px),Math.floor(py));return i<0?0:Pb[i]};
    const set=(px,py,col)=>{const i=idx(Math.floor(px),Math.floor(py));if(i<0)return;Cb[i]=col;if(!Pb[i]){Pb[i]=9;Zb[i]=99}};
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.36-ny*.82+nz*.44+((px+py)&1?.05:-.05);return Math.max(0,Math.min(4,(s>.88?0:s>.56?1:s>.14?2:s>-.22?3:4)+(ex||0)))};
    const coat=(ex,R)=>(nx,ny,nz,px,py)=>(R||COAT)[tn(nx,ny,nz,px,py,ex)];

    const ell=(cx,cy,cz,a,b,c,th,mat,part)=>{const co=Math.cos(th),si=Math.sin(th),R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const X=px+.5-cx,Y=py+.5-cy,u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b,q=1-u*u-v*v;if(q<0)continue;
        const w=Math.sqrt(q),lx=u/a,ly=v/b,lz=w/c,nx=lx*co-ly*si,ny=lx*si+ly*co,l=Math.hypot(nx,ny,lz);put(px,py,cz+c*w,mat(nx/l,ny/l,lz/l,px,py),part)}};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    const mass=(P,L,R,mat,part,soft=1)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[a,b]of P){x0=Math.min(x0,a);x1=Math.max(x1,a);y0=Math.min(y0,b);y1=Math.max(y1,b)}const N=P.length;
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const cx=px+.5,cy=py+.5;let inn=false,best=1e9,ex=0,ey=0;
        for(let i=0,j=N-1;i<N;j=i++){const[ax,ay]=P[j],[bx,by]=P[i];if((ay>cy)!==(by>cy)&&cx<(bx-ax)*(cy-ay)/(by-ay)+ax)inn=!inn;
          const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1;let t=((cx-ax)*dx+(cy-ay)*dy)/l2;t=t<0?0:t>1?1:t;const qx=ax+dx*t-cx,qy=ay+dy*t-cy,d2=qx*qx+qy*qy;if(d2<best){best=d2;ex=qx;ey=qy}}
        if(!inn)continue;const d=Math.sqrt(best),q=Math.max(0,1-d/R)*soft,l=d||1,nz=Math.sqrt(1-q*q);put(px,py,L*100+R*nz,mat(ex/l*q,ey/l*q,nz,px,py),part)}};

    const at=(off,st)=>atPose(W,ph,off,st);
    const leg=(sx,P,near,hind)=>{const ex=near?0:2,cz=near?24:-8,sy=(hind?-43:-40)+o,b=P.bend,
        pd0=.26*(1-b)-(hind?.45:.12)*b,pd1=(1-b)+(hind?.85:1)*b,pl=Math.hypot(pd0,pd1),ux=pd0/pl,uy=pd1/pl,
        gy=(!W&&!near)?-2:0,hc=sx+P.hx,fx=hc-ux*6.8+.3,fy=gy-P.lift-uy*6.8-.3,dx=fx-sx,dy=fy-sy,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,
        f=hind?.56:.56,off=hind?-(2.4+3.2*b):.25+3.8*b,jx=sx+dx*f-nx*off,jy=sy+dy*f-ny*off,
        up=(nx,ny,nz,px,py)=>COAT[tn(nx,ny,nz,px,py,ex+(near&&!hind&&nx>.52&&py<-22?-1:nx<-.42?1:0))],lo=coat(ex,PT);
      if(hind){
        cap(sx+.5,sy-2,6.0,jx,jy,2.3,cz,up,4);cap(sx-3.0,sy-6,4.4,jx-.5,jy,2.0,cz-.5,up,4)}
      else{
        cap(sx-.4,sy,3.9,jx,jy,1.95,cz,up,4)}
      cap(jx,jy,1.8,fx,fy,1.55,cz,lo,4);ell(fx,fy,cz+.3,1.95,2.05,1.95,0,lo,4);
      cap(fx+ux*1.4,fy+uy*1.4,1.55,fx+ux*3.2,fy+uy*3.2,1.7,cz,lo,4);
      const vx=uy,vy=-ux;
      for(let py=Math.floor(fy-2);py<=fy+9;py++)for(let px=Math.floor(fx-6);px<=fx+6;px++){const X=px+.5-fx,Y=py+.5-fy,a=X*ux+Y*uy,c=X*vx+Y*vy;
        if(a<3.2||a>7.2)continue;const t=(a-3.2)/4.0;if(c<-2.0-t*.3||c>1.6+t*1.25)continue;
        put(px,py,cz+1,a<4.2?HOOF[Math.min(4,1+ex)]:HOOF[Math.min(4,(c>.8+t*1.2?1:c<-1.2?3:2)+ex)],5)}};

    leg(SH,at(.5,5.2),0,1);leg(SF,at(.75,3.8),0,0);

    {const sw=W?1.5*Math.cos(6.2832*(ph-.05)):0;cap(-29.5,-61.5+o,1.5,-32.4,-56.5+o,1.4,19,coat(1),7);
      for(let py=-57;py<=-21;py++){const s=(py+57)/36,cx=-32.4-Math.sin(s*2.1)*1.4+sw*s*s,
          w=s<.60?1.8+s*3.1:3.66*(1-(s-.60)/.43);
        for(let px=Math.floor(cx-w/2);px<=Math.ceil(cx+w/2);px++){if(Math.abs(px+.5-cx)>w/2)continue;
          const e=(px+.5-cx)/Math.max(.6,w/2),hair=((px*5+Math.floor((py+60)/3))%4+4)%4;
          put(px,py+o,-2,e>.42&&s<.65?MANE2:hair===0?PT[3]:e<-.45?MANE:PT[4],7)}}}

    const B=P=>P.map(([a,b])=>[a,b+o]);
    const bBot=px=>{const u=(px-2)/15;return-34.2-3.6*u*u-(px<-6?Math.pow((-6-px)/8.5,1.8)*2.8:0)};
    const bodyMat=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),Y=py-o,yb=bBot(px),c=(px+py)&1;
      if(px>-14.5&&px<12.5&&Y>=yb-2.2+(c?.3:-.3))return PALE[Y>yb-.9?3:2];
      if(px>=19&&px<27.5&&Y>=-43+(px-23)*.45+(c?.45:-.45))return PALE[Y>-38.5?2:1];
      if(px>-15&&px<13.5&&Y>=yb-5.4+(c?.45:-.45))return COAT[Math.max(b,3)];
      return COAT[b]};
    mass(smooth(B([[10,-63.2],[2,-62.4],[-7,-62.6],[-15,-64.2],[-21.5,-65.4],[-27.5,-63.6],[-31.2,-59.5],[-32.6,-53.5],[-31.8,-46.8],
      [-28.5,-41.5],[-20,-40.0],[-13.5,-37.2],[-6,-34.8],[2,-34.0],[9.5,-34.6],[16,-36.0],[22,-37.5],[26.2,-41.5],[27.8,-47.5],[25.5,-54],[19,-59.5]])),.0,10.5,bodyMat,1);
    mass(smooth(B([[-15.5,-63.8],[-22,-65.4],[-27.8,-63.5],[-31.4,-59.2],[-32.6,-53.0],[-31.4,-46.0],[-29.0,-40.5],[-24.5,-39.0],[-20.5,-42.5],[-17.5,-48.5],[-15,-55.5]])),.18,7,
      (nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py,nx<-.5?1:0);return COAT[b]},1,.78);
    mass(smooth(B([[12.5,-58.5],[18.5,-59.0],[24,-55.0],[27.4,-49.2],[27.2,-43.2],[24.2,-38.2],[19,-36.5],[14.5,-39],[13,-46],[12.5,-53]])),.2,6.5,
      (nx,ny,nz,px,py)=>{const Y=py-o,c=(px+py)&1;
        if(px>=19.5&&Y>=-42.5+(px-23)*.4+(c?.4:-.4))return PALE[Y>-38.5?2:1];
        const diag=px-(Y+54)*.55;if(Y>-55&&Y<-42&&diag>14.5&&diag<17.2)return COAT[c?3:2];
        const b=tn(Math.max(0,nx),ny,nx<0?Math.sqrt(1-ny*ny):nz,px,py);return COAT[b]},1,.8);

    leg(SH,at(0,-3.5),1,1);leg(SF,at(.25,-1.5),1,0);

    const HP=HEADS[fr>=20?Math.min(23,fr):0],a=(HP.al+hd*2)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),PX=HP.px+hd*.4,PY=HP.py+o+hd,
      Wp=(u,v)=>[PX+u*ca-v*sa,PY+u*sa+v*ca],hm=coat(0);
    const c0=[9,-63.0+o],c2=Wp(-1.2,-.3),c1=[c0[0]+(c2[0]-c0[0])*.48-.6,c0[1]+(c2[1]-c0[1])*.52-.8],t1=Wp(12.5,8.6),t0=[31.5,-47.5+o];
    const crest=s=>[(1-s)*(1-s)*c0[0]+2*s*(1-s)*c1[0]+s*s*c2[0],(1-s)*(1-s)*c0[1]+2*s*(1-s)*c1[1]+s*s*c2[1]],poly=[];
    for(let i=0;i<=16;i++)poly.push(crest(i/16));poly.push(Wp(9,2.8),t1,t0,[24,-40.5+o],[9,-49+o]);
    {const inPoly=(x,y)=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
      const dSeg=(x,y,p,q)=>{const dx=q[0]-p[0],dy=q[1]-p[1],t=Math.max(0,Math.min(1,((x-p[0])*dx+(y-p[1])*dy)/(dx*dx+dy*dy))),ex=x-p[0]-dx*t,ey=y-p[1]-dy*t;return Math.hypot(ex,ey)};
      const ax=t0[0]-c0[0]*.5-c2[0]*.5,ay=t0[1]-c0[1]*.5-c2[1]*.5,al=Math.hypot(ax,ay),acx=ax/al,acy=ay/al;
      let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of poly){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const X=px+.5,Y=py+.5;if(!inPoly(X,Y))continue;
        let dc=1e9;for(let i=0;i<16;i++)dc=Math.min(dc,dSeg(X,Y,poly[i],poly[i+1]));const s=dc/(dc+dSeg(X,Y,t1,t0)),
          th=(s*2-1)*1.25,nz=Math.cos(th),sn=Math.sin(th);
        let b=tn(acx*sn*1.2,acy*sn*.3-.25*Math.max(0,-sn),nz,px,py);
        if(s<.16)b=Math.max(1,b-1);else if(s>.86&&s<.97)b=Math.max(1,b-1);else if(s>.52&&s<.76)b=Math.min(4,b+1);
        put(px,py,15,COAT[b],2)}}
    for(let i=0;i<=76;i++){const s=.02+i/76*.96,[mx,my]=crest(s),[nx,ny]=crest(Math.min(1,s+.02)),dx=nx-mx,dy=ny-my,l=Math.hypot(dx,dy)||1,ox=dy/l,oy=-dx/l,
        h=(i<7?.8+i*.12:1.65)+(((i*13)%7)<2?.35:0);
      for(let j=-.8;j<=h;j+=.5)put(mx+ox*j,my+oy*j,28,j>h-.5&&((i*5)%9)<3?MANE2:MANE,8)}

    const lu=(px,py)=>(px+.5-PX)*ca+(py+.5-PY)*sa,lv=(px,py)=>-(px+.5-PX)*sa+(py+.5-PY)*ca;
    const muzMat=(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py),u=lu(px,py),v=lv(px,py),c=(px+py)&1;
      const m=u+(v>-1?1.0:0)+(c?.6:-.6);
      if(m<20.6)return COAT[b];
      if(m<22.2)return c?MEAL[Math.min(4,b+1)]:PALE[Math.min(4,b+1)];
      return MEAL[Math.max(0,Math.min(4,b))]};
    {const[c0x,c0y]=Wp(3.2,.4);ell(c0x,c0y,30,5.8,6.6,6.2,a,hm,3)}
    {const[c0x,c0y]=Wp(11.2,4.4);ell(c0x,c0y,31,7.6,5.6,5.4,a,(nx,ny,nz,px,py)=>{const b=tn(nx,ny,nz,px,py);return lv(px,py)>8.2?COAT[Math.min(4,b+1)]:COAT[b]},3)}
    {const[ax0,ay0]=Wp(4.2,-2.0),[bx0,by0]=Wp(21.2,-1.0);cap(ax0,ay0,4.3,bx0,by0,3.5,32,muzMat,3)}
    {const[c0x,c0y]=Wp(24.2,.6);ell(c0x,c0y,32.5,4.5,4.1,4.0,a,muzMat,3)}
    const ja=HP.jaw*Math.PI/180,hu=12,hv=7.2,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],Wr=(u,v)=>Wp(...rot(u,v));
    {const[h0,h1]=Wp(hu,hv),[m0,m1]=Wr(22.2,4.8);cap(h0,h1,3.6,m0,m1,2.4,30.5,muzMat,3);
      const[c0x,c0y]=Wr(24.2,4.0);ell(c0x,c0y,31.2,3.0,2.3,2.5,a+ja,(nx,ny,nz,px,py)=>MEAL[Math.min(4,tn(nx,ny,nz,px,py)+1)],3)}
    if(HP.jaw){
      const Q=[Wp(17.5,4.6),Wp(27.8,2.4),Wr(26.2,3.4),Wr(17.5,5.0)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let c=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(px,py,29,MOUTH,3)}
      const tooth=(p,q,c)=>{const i=idx(Math.floor(p),Math.floor(q));if(i>=0&&Cb[i]===MOUTH)Cb[i]=c};
      for(let u=20;u<=26.5;u+=.5){const[p,q]=Wp(u,3.8-(u-19)*.12);tooth(p,q,TEETH);const[r,s]=Wr(u,3.2);tooth(r,s,'#cbbfa4')}}

    const ear=(bx0,by0,ang,len,near)=>{const ex=Math.cos(ang),ey=Math.sin(ang),bx=bx0-ex*2,by=by0-ey*2,L=len+2,R=L+4;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/L,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const hw=(near?3.0:2.65)*Math.sin(Math.PI*(t*.82+.18));if(Math.abs(s)>hw)continue;const l=s/hw;let col;
        if(t>.80)col=MANE;else if(Math.abs(s)>hw-1.1)col=near&&l<0?MANE2:MANE;
        else if(near&&t>.15&&Math.abs(s-.1)<hw-1.25)col=l<.1?PALE[2]:COAT[3];
        else col=COAT[tn(-ey*l*.7,ex*l*.7,.7,px,py,near?0:1)];
        put(px,py,near?42:-6,col,6)}};
    {const e=HP.ear,bk=-Math.PI+.42,nA=-1.39,fA=-.96,[f0,f1]=Wp(1.6,-4.4),[n0,n1]=Wp(-.3,1.4);
      ear(f0,f1,fA+(bk+.1-fA)*e,15.2,0);ear(n0,n1,nA+(bk-nA)*e,16.8,1)}
    for(const[u,v]of[[.8,-2.0],[.1,-.8],[1.3,-.2]]){const[r0,r1]=Wp(u+1.2,v),[e0,e1]=Wp(u-1.1,v+1.6);cap(r0,r1,.85,e0,e1,.75,44,()=>MANE,8)}

    {const[e0,e1]=Wp(8.6,2.4),X=Math.floor(e0),Y=Math.floor(e1),sh=(x,y,c)=>{if(partAt(x,y)===3)set(x,y,c)};
      for(const dx of[-1,0,1,2])sh(X+dx,Y-1,COAT[4]);
      sh(X-2,Y,COAT[3]);sh(X+2,Y,PALE[2]);
      for(const[dx,dy,c]of[[-1,1,PALE[2]],[0,2,PALE[2]],[1,2,PALE[2]],[2,1,PALE[2]]])sh(X+dx,Y+dy,c);
      for(const dx of[-1,0,1])sh(X+dx,Y,EYE);for(const dx of[0,1])sh(X+dx,Y+1,dx===1?'#2a1e18':EYE);sh(X,Y,'#4a3a30')}
    for(const[u,v,c]of[[24.0,-1.4,MEAL[3]],[24.6,-.6,'#1e120d'],[25.2,.1,'#1e120d'],[25.2,.9,MEAL[3]]]){const[n0,n1]=Wp(u,v);if(partAt(n0,n1)===3)set(n0,n1,c)}
    if(!HP.jaw)for(let u=21.5;u<=27.6;u+=.5){const[p,q]=Wp(u,3.1);if(partAt(p,q)===3)set(p,q,u>24?MANE2:MEAL[4])}

    if(VMZ[fr]){const[x0,y0,R]=VMZ[fr];R.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch==='.')continue;const k=idx(x0+i,y0+j);if(k<0)continue;
      if(ch===' '){Pb[k]=0;Zb[k]=-1e9;continue}Cb[k]=VMC[ch];if(!Pb[k]){Pb[k]=3;Zb[k]=99}}})}

    const topAt=X=>{let Y=-Y0;while(Y<0&&![1,2].includes(partAt(X,Y)))Y++;return Y},botAt=X=>{let Y=-1;while(Y>-Y0&&partAt(X,Y)!==1)Y--;return Y};
    if(load>=0){
      const K=['#b4604c','#9a4a3a','#7e3a2e','#642a24','#4a1e1c'];for(let X=-14;X<=8;X++){const tp=topAt(X)-1;for(let i=0;i<13;i++){const u=(X+14.5)/23;
        set(X,tp+i,i===9?'#d4c49c':K[i===0?0:i===12?4:u<.1?4:u<.28?3:u<.82?2:1])}}
      if(!load){const yb=topAt(8)+12,yb2=botAt(9);for(let Y=yb;Y<=yb2;Y++){const X=8+Math.round((Y-yb)/Math.max(1,yb2-yb)*1.5);set(X,Y,STRAP);set(X-1,Y,STRAP_LIT)}}}
    if(load>0){
      const S=ramp('#6a4a2c'),B2=ramp('#3e3029'),full=load>1;for(let X=-11;X<=10;X++){const tp=topAt(X)-4,u=(X+11.5)/22;for(let i=0;i<4;i++)set(X,tp+i,S[i===0?(u>.5?0:1):u<.15?4:u<.4?3:2])}
      const bt=topAt(0)+4,bh=full?26:23;for(let i=0;i<bh;i++){const s=i/(bh-1),hw=Math.round(14.5+(full?2.2:1.0)*Math.sin(Math.PI*Math.min(1,s*1.15))-(s>.86?(s-.86)*26:0));
        for(let X=-hw;X<=hw;X++){const u=(X+hw+.5)/(2*hw+1);let v=u<.1?4:u<.3?3:u<.78?2:1;if(i<2)v=Math.max(0,v-1);if(s>.84)v=Math.min(4,v+1);
          const band=i===5||i===6||i===bh-6;set(X-1,bt+i,band?(v<2?'#b88a44':v<3?'#9a6e34':'#6e4c26'):B2[v])}}
      for(let X=-14;X<=14;X++)set(X-1,bt,X%2?S[1]:S[2]);
      if(full){
        const Wl=ramp('#d8ceb6');for(let X=-15;X<=15;X++){const h=2+((X*7+3)%5+5)%5%3;for(let j=0;j<h;j++)set(X-1,bt-1-j,Wl[j===h-1?0:j?1:2])}
        for(let L=0;L<4;L++){const yb=bt+2-L*7,hw=19-L*2.5,cx=(L%2?1.5:-.5)-1,Q=ramp(['#d4c9ae','#dcd2b8','#cfc3a6','#d9cfb4'][L]);
          for(let X=Math.floor(cx-hw);X<=Math.ceil(cx+hw);X++){const e=(X-cx)/hw;if(Math.abs(e)>1)continue;
            const bot=yb+Math.round(1.2*Math.sin(X*.8+L*1.7))+(Math.abs(e)>.82?2:0),top=yb-9+Math.round(3*Math.pow(Math.abs(e),3))+(((X*5+L*3)%7+7)%7<2?1:0);
            for(let Y=top;Y<=bot;Y++){const t=(Y-top)/Math.max(1,bot-top);let v=t<.2?0:t<.45?1:t<.8?2:3;if(e<-.75)v=Math.min(4,v+1);if(e>.7&&v>1)v--;
              if(v<3&&((X*3+Y*7+L)%11===0||(X*3+Y*7+L)%11===1&&t>.3))v++;if(Y===bot)v=Math.max(v,3);set(X,Y,Q[v])}}}}}
    {const seen=new Uint8Array(FW*FH);for(let i=0;i<FW*FH;i++){if(Pb[i]||seen[i])continue;const st=[i],comp=[];let edge=false;seen[i]=1;
      while(st.length){const k=st.pop(),x=k%FW,y=(k-x)/FW;comp.push(k);if(!x||!y||x===FW-1||y===FH-1)edge=true;
        for(const j of[k-1,k+1,k-FW,k+FW])if(j>=0&&j<FW*FH&&!seen[j]&&!Pb[j]&&Math.abs(j%FW-x)<=1){seen[j]=1;st.push(j)}}
      if(!edge&&comp.length<8)for(const k of comp){const n=[k-1,k+1,k-FW,k+FW].find(j=>Pb[j]&&Pb[j]!==10);if(n!=null){Cb[k]=Cb[n];Pb[k]=10}}}}
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
    g.restore()}
  const sound=()=>{const t=now();
    [[0,980,760],[.07,900,1020],[.14,1000,720],[.21,860,940],[.28,900,640],[.35,760,820],[.42,760,520]].forEach(([d,f,to])=>tone({f,to,t:t+d,d:.09,type:'sawtooth',v:.032,lp:[[2600,0]]}));
    for(const[d,f,to,h]of[[.58,560,470,.19],[.79,250,205,.27],[1.1,540,460,.17],[1.3,240,190,.3]]){tone({f,to,t:t+d,d:h,type:'sawtooth',v:f>400?.04:.052,sus:1,lp:[[f>400?2200:1300,0],[900,h]]});
      tone({f:f*1.5,to:to*1.5,t:t+d,d:h,type:'square',v:.012,sus:1,lp:[[1600,0]]})}};
  const voice=[[0,20],[60,21],[520,20],[580,22],[780,23],[1080,22],[1280,23],[1600,20],[1700,0]];
  return{paint:mule,frame:muleFr,reach:MULE_REACH,stance:MULE_STANCE,stride:MULE_STRIDE,beat:MULE_BEAT,voice,sound,sw:16.5,span:shadowSpan}})();
/* =============================================================== end of the mule ============================================================= */


/* ================================================================== the ox ================================================================== */
const OX=(()=>{
  /* A heavy working ox or bull, drawn after the maintainer's reference: a rounded croup running into a heavy shoulder hump, a clean arched
     belly line, deep brisket and folded dewlap, curved skin folds behind the jaw, sculpted shoulder-to-forearm and gaskin-to-hock muscles
     on compact cloven hooves (the far hooves stepped higher in perspective at rest), a tail hugging the buttock to a ragged dark switch
     behind the hock, and a tucked wedge-shaped head in rich umber (never over-brightened above the body) with dark-rimmed cupped ears,
     serious angled cattle brow over a recessed eye, compact pale-ringed muzzle, and slenderer shaded horn crescents curving out, up and
     inward to sharp dark tips. Pale coats (#e6dccc, #d8c8b0) keep clean near-white modeling for the garlanded bulls of Lystra. */
  const OX_REACH=40,OX_STANCE=.62,OX_STRIDE=OX_REACH/OX_STANCE/2,OX_BEAT=.67;
  const oxFr=(dist,v)=>{const c=Math.max(OX_STRIDE,Math.abs(v==null?WALK_V:v)*OX_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  const HEAD={0:{rot:0,dx:0,dy:0,jaw:0,sag:1},20:{rot:-10,dx:1,dy:-1,jaw:0,sag:.75},21:{rot:-16,dx:1.5,dy:-1.5,jaw:10,sag:.55},22:{rot:-20,dx:2,dy:-2,jaw:22,sag:.4}};
  const SF=13,SH=-34.5;
  const atPose=(W,ph,off,st)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=OX_REACH,B=OX_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
    const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(5*q),bend:q}};
  const shadowSpan=fr=>{const W=fr>0&&fr<20,k=fr>=4&&fr<20?(fr-4)%16:W?(fr-1)*4:0,ph=k/16,
      xs=[SH+atPose(W,ph,.5,9.0).hx,SF+atPose(W,ph,.75,7.0).hx,SH+atPose(W,ph,0,-5.5).hx,SF+atPose(W,ph,.25,-2).hx],
      x0=Math.min(...xs)-3,x1=Math.max(...xs)+3.5;return[(x1-x0)/4+1.8,(x0+x1)/4]};

  function ox(g,x,y,dir,fr,c,gar){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const W=fr>0&&fr<20,k=fr>=4&&fr<20?(fr-4)%16:W?(fr-1)*4:0,ph=k/16,HP=HEAD[fr>=20?fr:0]||HEAD[0];
    const o=W&&(k%8===5||k%8===6)?1:0,hd=W&&(k%8===6||k%8===7)?1:0,sway=W?Math.round(Math.cos(6.2832*(ph-.2))):0,
      rl=W&&(k>=1&&k<=4)?-1:0,rs=W&&(k>=5&&k<=8)?-1:0,tl=W?Math.round(1.4*Math.cos(6.2832*(ph-.05))):0,dw=W?Math.sin(6.2832*(ph-.35)):0;

    const[cr,cg,cb]=hex(c),lum=(cr*.3+cg*.59+cb*.11)/255;
    const base=lum<.55?mix(c,'#5b3a24',.48):c;
    const COAT=lum<.55
      ?[tint(base,.22),tint(base,.10),base,mix(tint(base,-.28),'#24130b',.35),mix(tint(base,-.54),'#160b06',.48)]
      :ramp(c);
    const LOW=lum<.55?['#482f20','#382216','#2a180f','#1f110a','#140a05']:ramp(mix(c,'#3a2e26',.42));
    const MZ=[mix(base,'#c6b4a2',.68),mix(base,'#9e8c7c',.66),mix(base,'#584e48',.72),mix(base,'#2c2420',.82),'#140d0a'];
    const SW=lum<.55?['#342015','#26160e','#1c0f09','#140a06','#0e0704']:ramp(mix(c,'#241812',.6));
    const HOOF=['#5e5650','#48403b','#36302c','#26211e','#181412'];
    const HORN=['#d4c7af','#b2a48d','#887a66','#5e5142','#3e3329'],MID=['#8e806c','#706352','#524639','#3a3026','#261e18'],TIP=['#463a30','#342a22','#241c16','#18130f','#100c09'];

    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const idx=(px,py)=>(py>=0||py<-Y0||px<-X0||px>=FW-X0)?-1:(py+Y0)*FW+px+X0;
    let LIM=null;const put=(px,py,z,col,part)=>{if(LIM!=null&&(typeof LIM==='function'?LIM(px,py):py<LIM))z-=60;const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{const i=idx(Math.floor(px),Math.floor(py));return i<0?0:Pb[i]};
    const set=(px,py,col)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&Pb[i])Cb[i]=col};
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.4-ny*.86+nz*.46+((px+py)&1?.05:-.05);return Math.max(0,Math.min(4,(s>.88?0:s>.6?1:s>.24?2:s>-.08?3:4)+(ex||0)))};
    const lt=(R,ex)=>(nx,ny,nz,px,py)=>{const a=nx+((px+py)&1?.12:-.12);return R[Math.min(4,(ex||0)+(a<-.28?3:a>.52?1:2))]};
    const mat=(R,ex)=>(nx,ny,nz,px,py)=>R[tn(nx,ny,nz,px,py,ex)];

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

    const hr=HP.rot*Math.PI/180,hc=Math.cos(hr),hs=Math.sin(hr),PX=33,PY=-62,hox=HP.dx+sway,hoy=HP.dy+o+hd,
      HT=(x,y)=>[PX+(x-PX)*hc-(y-PY)*hs+hox,PY+(x-PX)*hs+(y-PY)*hc+hoy];
    const at=(off,st)=>atPose(W,ph,off,st);

    const foot=(fx,fy,b,cz,ex)=>{const lo=lt(LOW,ex);
      ell(fx,fy,cz+.3,2.6,2.5,2.5,0,lo,4);ell(fx-2.3,fy+.8,cz-.4,1.15,1.25,1.1,0,mat(HOOF,ex+1),4);
      const gy=Math.round(fy+5.2-1.2*b),cx=fx+.8+.5*b;
      for(let py=Math.floor(fy+1.8-b);py<=gy;py++){const t=(py-(fy+1.8-b))/Math.max(1,gy-(fy+1.8-b)),xL=cx-2.0-t*.35,xR=cx+1.7+t*1.05;
        for(let px=Math.floor(xL);px<=Math.ceil(xR);px++){if(px+.5<xL||px+.5>xR)continue;
          const u=(px+.5-xL)/(xR-xL),cleft=t>.45&&Math.abs(u-.58)<.11;
          put(px,py,cz+.6,HOOF[Math.min(4,(cleft?4:t<.28?3:u>.68?1:u<.28?3:2)+ex)],5)}}};

    const leg=(sx,P,near,hind)=>{const ex=near?0:2,cz=near?24:-9,lo=lt(LOW,near?0:1),
        gy=(!W&&!near)?-2.5:0,hx=sx+P.hx,fy=gy-5.2-P.lift,b=P.bend,
        upFore=(nx,ny,nz,px,py)=>{const c2=(px+py)&1;if(!near)return COAT[nx>.3?3:4];
          const topFade=py<-38+o?1:py<-35+o?(c2?1:0):0;
          return COAT[Math.min(4,(nx>.50?(c2?3:4):nx<-.46?(c2?3:4):nx>-.08&&nx<.35&&py<-24?(c2?1:2):2)+topFade)]},
        upHind=(nx,ny,nz,px,py)=>{const c2=(px+py)&1;if(!near)return COAT[nx>.3?3:4];
          return COAT[nx<-.35?(c2?3:4):nx>.48?(c2?3:2):py<-34&&nx>-.15?(c2?2:3):3]};
      if(hind){const jx=hx-4.0-2.4*b+P.hx*.06,jy=-22.5-P.lift*.6+o*.5,fx=hx+.3*b,tx=sx-2.2+P.hx*.12,kx=sx+3+P.hx*.22;
        LIM=near?(px,py)=>py<-45+o+.18*(px-tx)*(px-tx):null;
        cap(tx,-48+o+rl,9.2,jx,jy,3.0,cz,upHind,4);cap(kx,-40+o,6.4,jx+1.0,jy-3,2.8,cz,upHind,4);cap(jx-.5,jy-1.5,2.2,jx-1.8,jy-3.4,1.5,cz,upHind,4);
        LIM=null;cap(jx,jy,2.45,fx,fy,2.05,cz,lo,4);foot(fx,fy,b,cz,near?0:1)}
      else{const kx=sx+P.hx*.70+4.2*b,ky=-17.5-P.lift*.7,ax=sx+P.hx*.22,fx=hx-3.2*b,fy2=fy-1.4*b;
        LIM=near?(px,py)=>py<-42+o+.24*(px-(ax+.3))*(px-(ax+.3)):null;
        cap(ax+.3,-44+o+rs,7.6,kx,ky,3.3,cz,upFore,4);LIM=null;ell(kx,ky,cz+.4,2.8,2.7,2.7,0,lo,4);
        cap(kx,ky,2.5,fx,fy2,2.1,cz,lo,4);foot(fx,fy2,b,cz,near?0:1)}};

    leg(SH,at(.5,9.0),0,1);leg(SF,at(.75,7.0),0,0);leg(SH,at(0,-5.5),1,1);leg(SF,at(.25,-2),1,0);

    const[Tx,Ty1]=HT(36,-48),[Nx,Ny1]=HT(36.5,-69.5),Ty=Ty1-o,Ny=Ny1-o,SAG=HP.sag;
    const top=xx=>{
      if(xx<-43){const q=Math.min(1,(-43-xx)/7.6);return-69.8+rl+10.5*(1-Math.sqrt(Math.max(0,1-q*q)))}
      if(xx<-4)return-69.8+(xx<-22?rl:0)+.6*Math.sin((xx+43)/39*Math.PI);
      if(xx<23)return-70.2-5.6*Math.exp(-Math.pow((xx-15.5)/9.5,2))+(xx>-2?rs:0);
      const y23=-70.2-5.6*Math.exp(-Math.pow(7.5/9.5,2)),u=Math.min(1,(xx-23)/Math.max(1,Nx-23));return y23+(Ny-y23)*(u*u*(3-2*u))};
    const bot=xx=>{
      if(xx<-43){const q=Math.min(1,(-43-xx)/7.6);return-39-8.5*(1-Math.sqrt(Math.max(0,1-q*q)))}
      if(xx<-26)return-39+5.2*(xx+43)/17;
      if(xx<2)return-33.8+3.2*Math.sin(Math.PI*(xx+26)/34);
      if(xx<23)return-30.6+4.2*Math.sin(Math.PI/2*(xx-2)/21);
      const u=Math.min(1,(xx-23)/Math.max(1,Tx-23)),s=Math.min(1,Math.max(0,u-dw*.05));return-26.4+(Ty+26.4)*u+4.6*SAG*Math.sin(Math.PI*s)};
    const bump=(xx,yy)=>6.5*Math.exp(-Math.pow((xx-14)/10.5,2)-Math.pow((yy+52)/14,2))+5.2*Math.exp(-Math.pow((xx+38)/8.5,2)-Math.pow((yy+56)/10,2))
      +1.8*Math.exp(-Math.pow((xx-26)/7,2)-Math.pow((yy+62)/8,2))-1.5*Math.exp(-Math.pow((xx-29)/4.5,2)-Math.pow((yy+54)/8,2));

    const sm=(a,b,v)=>Math.max(0,Math.min(1,(v-a)/(b-a))),bodyTone=(xx,yy)=>{
      const t0=top(xx),b0=bot(xx),r=(yy-t0)/Math.max(1,b0-t0);let L=2.05;
      const el=(cx,cy,a,b,th)=>{const X=xx-cx,Y=yy-cy,co=Math.cos(th),si=Math.sin(th),u=(X*co+Y*si)/a,v=(-X*si+Y*co)/b;return u*u+v*v};
      L-=1.0*sm(6.0,1.8,yy-t0);
      L-=.9*sm(1,.36,el(13.5,-56,12.5,10.5,1.2));
      L-=.8*sm(1,.42,el(-36,-61,10.0,6.5,-.15));
      L=Math.max(.85,L);
      const wave=.08*Math.sin((xx+12)*.14);
      const w=sm(-44,-31,xx);
      L+=w*1.05*sm(.50+wave,.68+wave,r)+w*.95*sm(.76,.91,r);
      L+=1.15*sm(17,25,xx)*sm(.38,.64,r);
      if(xx>24.5&&xx<36.5){const fx=xx+2.1*Math.sin((yy+56)*.16),env=sm(24.5,27.5,xx)*sm(36.5,33.5,xx)*sm(-68,-62,yy)*sm(-41,-47,yy),
        fold=Math.sin((fx-26.2)*1.25);L+=.55*env+(fold>.25?.65*env:0)}
      L+=.9*sm(1,.32,Math.pow((xx-3.5)/5.2,2)+Math.pow((yy+37)/9.5,2));
      L+=.85*sm(1,.32,Math.pow((xx+26.5)/4.8,2)+Math.pow((yy+43)/10,2));
      L+=1.2*sm(-42,-49,xx)*sm(-63,-44,yy);
      const k=((Math.floor(xx)+Math.floor(yy))&1)?.22:-.22;return Math.max(0,Math.min(4,Math.round(L+k)))};

    {const BX0=-51,BX1=Math.ceil(Math.max(Tx,Nx))+1,BY0=-80,BY1=-18,bw=BX1-BX0+1,bh=BY1-BY0+1,ZF=new Float32Array(bw*bh);
      const zAt=(xx,yy)=>{const t0=top(xx),b0=bot(xx);if(yy<t0||yy>b0)return 0;const mid=(t0+b0)/2,hh=(b0-t0)/2,v=(yy-mid)/Math.max(1,hh),
          er=xx<-43?Math.sqrt(Math.max(0,1-Math.pow((-43-xx)/7.8,2))):1,D=xx>22?16-4*Math.min(1,(xx-22)/13):17;
        return Math.max(.01,D*er*Math.pow(Math.max(0,1-v*v),.55)+bump(xx,yy)*Math.pow(Math.max(0,1-v*v),.5))};
      for(let j=0;j<bh;j++)for(let i=0;i<bw;i++)ZF[j*bw+i]=zAt(BX0+i+.5,BY0+j+.5-o);
      for(let j=0;j<bh;j++)for(let i=0;i<bw;i++){const z=ZF[j*bw+i];if(!z)continue;
        const px=BX0+i,py=BY0+j;put(px,py,z,COAT[bodyTone(px+.5,py+.5-o)],px>25&&py>-50?2:1)}}

    {const T=[[-47.0,-65.5],[-49.4,-60.5],[-49.5,-53],[-47.8+tl*.3,-43],[-46.8+tl*.65,-31]];
      for(let i=0;i<T.length-1;i++)cap(T[i][0],T[i][1]+o,1.25,T[i+1][0],T[i+1][1]+o,1.1,26,mat(COAT,2),7);
      for(let dy=0;dy<=15;dy++){const s=dy/15,hw=s<.46?1.1+s*2.9:2.45*(1-(s-.46)/.57),cx=-46.9+tl*(.65+s*.35)-(s<.5?s*1.5:.75-(s-.5)*1.2),py=Math.round(-31+dy+o);
        for(let px=Math.floor(cx-hw);px<=Math.ceil(cx+hw);px++){const d=Math.abs(px+.5-cx);if(d>hw)continue;
          put(px,py,27,SW[d>hw-.7?3:px+.5>cx?1:2],7)}}}

    {const[a0,a1]=HT(36,-62),[b0,b1]=HT(36,-50);cap(27,-60+o,9.5,a0,a1,7.5,0,mat(COAT,1),2);cap(26,-44+o,7.5,b0,b1,5.5,0,mat(COAT,2),2)}

    const E=(x0,y0,cz,a,b,cc,th,m)=>{const[p,q]=HT(x0,y0);ell(p,q,cz,a,b,cc,th+hr,m,3)},Sx=(x0,y0,cz,A,B,C,th,p,m)=>{const[u,v]=HT(x0,y0);sell(u,v,cz,A,B,C,th+hr,p,m,3)};
    Sx(44.5,-65.5,14,8.6,5.2,4.5,.1,2.5,mat(COAT,0));
    Sx(49.2,-56.2,14,5.8,10.5,4.4,-.42,2.5,(nx,ny,nz,px,py)=>COAT[tn(nx,ny,nz,px,py,nx>.35?0:1)]);
    E(41.8,-55.5,12.5,6.2,6.8,5.8,0,mat(COAT,1));

    const jr=HP.jaw*Math.PI/180,JX=39,JY=-50,JT=(x0,y0)=>HT(JX+(x0-JX)*Math.cos(jr)-(y0-JY)*Math.sin(jr),JY+(x0-JX)*Math.sin(jr)+(y0-JY)*Math.cos(jr));
    {const[p,q]=JT(46,-46.2);ell(p,q,12,6.5,2.6,5.5,.14+hr+jr,mat(COAT,2),3)}
    {const Q=[HT(40,-53),HT(49,-52),JT(49,-46),JT(40,-46.5)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let ins=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)ins=!ins}
        if(ins)put(px,py,-40,COAT[4],3)}}
    if(HP.jaw){const Q=[HT(41,-48.5),HT(57,-46),JT(55.5,-45),JT(41,-47.5)];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,q]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,q);y1=Math.max(y1,q)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let ins=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)ins=!ins}
        if(ins)put(px,py,11.5,py+.5>(Q[2][1]+Q[3][1])/2-1?'#8a4a4a':'#2a1414',3)}}

    const horn=(P,cz)=>{const n=P.length-1;for(let i=0;i<n;i++){const[a0,a1]=HT(...P[i]),[b0,b1]=HT(...P[i+1]),r0=2.8-2.0*Math.pow(i/n,.82),r1=2.8-2.0*Math.pow((i+1)/n,.82),
      R=i>=n-1?TIP:i>=n-2?MID:HORN;cap(a0,a1,r0,b0,b1,r1,cz,mat(R),8)}};
    horn([[49.5,-68.2],[56.2,-70.0],[60.6,-73.8],[61.4,-78.8],[59.2,-83.5]],6);
    horn([[39.2,-68.2],[34.2,-70.6],[31.8,-74.8],[32.0,-80.0],[34.2,-85.0]],20);

    const ear=(x0,y0,ang,len,hw,cz,near)=>{const[bx,by]=HT(x0,y0),ea=ang+hr,ex=Math.cos(ea),ey=Math.sin(ea),R=len+hw+1;
      for(let py=Math.floor(by-R);py<=by+R;py++)for(let px=Math.floor(bx-R);px<=bx+R;px++){const X=px+.5-bx,Y=py+.5-by,t=(X*ex+Y*ey)/len,s=-X*ey+Y*ex;if(t<0||t>1)continue;
        const w=hw*Math.pow(Math.sin(Math.PI*(t*.75+.25)),.7);if(Math.abs(s)>w)continue;const l=s/w;
        const rim=Math.abs(s)>w-.95||t>.84;
        put(px,py,cz,rim?COAT[4]:near&&t>.18&&Math.abs(s)<w-1.15?COAT[l<0?2:3]:COAT[3],6)}};
    ear(52.2,-64.5,.42,6.2,2.4,13,0);ear(38.2,-63.8,Math.PI-.48,8.2,2.8,19,1);

    for(const[dx,dy,t]of[[-2,1,4],[-1,0,3],[0,0,4],[1,0,3],[2,0,4],[3,0,4],[4,0,3],[5,1,4],[-1,1,4],[0,1,3],[1,1,4],[2,1,3],[3,1,4],[4,1,3],[0,2,3],[1,2,4],[2,2,3],[3,2,3]]){const[p,q]=HT(41.5+dx,-70.8+dy);set(p,q,COAT[t])}

    {const[e0,e1]=HT(43.5,-59.5),X=Math.round(e0),Y=Math.round(e1);
      for(const[dx,dy]of[[-2,0],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-2]])set(X+dx,Y+dy,COAT[4]);
      for(const[dx,dy]of[[0,-2],[1,-2],[2,-2]])set(X+dx,Y+dy,COAT[1]);
      set(X-1,Y,'#1a100c');set(X,Y,'#120b08');set(X+1,Y,'#beb29e');set(X+2,Y,'#120b08');
      set(X,Y+1,'#241610');set(X+1,Y+1,COAT[3]);set(X-1,Y+1,COAT[3])}

    {const MUZ=[
        '.........CCDDD__',
        '.......CCCCDDpq_',
        '......DCCBqpqqpr',
        '.....EDCCqttqqrr',
        '.....EDCCqrtssrs',
        '.....EDDCrrssss_',
        '..EEEEEDDssssss_',
        '......EEDDDsrs..',
        '........EEEE....'],LOW0=7,MX=43,MY=-53.5,
        tone=ch=>ch>='A'&&ch<='E'?COAT[ch.charCodeAt(0)-65]:MZ['pqrst'.indexOf(ch)];
      const cj=Math.cos(jr),sj=Math.sin(jr),HI=(X,Y)=>{const u=X-hox-PX,v=Y-hoy-PY;return[PX+u*hc+v*hs,PY-u*hs+v*hc]},
        JI=(X,Y)=>{const[a,b]=HI(X,Y);return[JX+(a-JX)*cj+(b-JY)*sj,JY-(a-JX)*sj+(b-JY)*cj]};
      const cell=(l,lower)=>{const i=Math.floor(l[0]-MX),j=Math.floor(l[1]-MY);if(j<0||j>=MUZ.length||i<0||i>=MUZ[0].length||(j>=LOW0)!==lower)return'.';return MUZ[j][i]};
      const[cx0,cy0]=HT(MX+8,MY+4.5);for(let py=Math.floor(cy0-15);py<=cy0+15;py++)for(let px=Math.floor(cx0-15);px<=cx0+15;px++){
        const up=cell(HI(px+.5,py+.5),false),lo=cell(JI(px+.5,py+.5),true);
        if(up==='_'){const i=idx(px,py);if(i>=0){Pb[i]=0;Zb[i]=38.5}}else if(up!=='.')put(px,py,40,tone(up),3);
        if(lo!=='.'&&lo!=='_')put(px,py,39,tone(lo),3)}}

    if(gar){const S=HT(27,-70.5),C1=[18,-51+o],C2=[21,-27+o],E2=HT(40,-48.5),G0='#3f6a32',G1='#4f7a3a',G2='#6f9a4a',G3='#8fb45a',z=18,N=21;
      for(let i=0;i<N;i++){const u=i/(N-1),a0=(1-u)*(1-u)*(1-u),a1=3*u*(1-u)*(1-u),a2=3*u*u*(1-u),a3=u*u*u,
          gx=Math.round(a0*S[0]+a1*C1[0]+a2*C2[0]+a3*E2[0]),gy=Math.round(a0*S[1]+a1*C1[1]+a2*C2[1]+a3*E2[1]),s=i%2,
          P=(a,b,col,ww,hh)=>{for(let j=0;j<(hh||1);j++)for(let q=0;q<(ww||1);q++)put(a+q,b+j,z+(i%3)*.1,col,9)};
        P(gx-2,gy-1,G0,4,3);P(gx-(s?4:0),gy+(s?-1:0),s?G1:G2,4,2);P(gx-(s?3:-1),gy+(s?-1:0),G3,2,1);P(gx+(s?0:-3),gy+1,G1,3,1);
        if(i%5===2){P(gx-1,gy-2,'#e8c040',3,2);P(gx,gy-2,'#fff0a0',1);P(gx-1,gy-1,'#c89a30',1)}}}
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
    g.restore()}

  const sound=()=>{tone({f:104,bend:[-260,.28],to:84,d:1.45,type:'sawtooth',v:.038,a:.14,sus:1,vib:1.2,vibd:.6,lp:[[240,0],[620,.3],[820,.7],[520,1.05],[220,1.45]]});
    tone({f:52,bend:[-260,.28],to:42,d:1.45,type:'triangle',v:.036,a:.16,sus:1})};
  return{paint:ox,frame:oxFr,reach:OX_REACH,stance:OX_STANCE,stride:OX_STRIDE,beat:OX_BEAT,voice:[[0,20],[200,21],[420,22],[1050,21],[1300,20],[1520,0]],sound,sw:19,span:shadowSpan}})();
/* ================================================================ end of the ox ============================================================== */


/* ================================================================= the sheep ================================================================ */
const SHEEP=(()=>{
  /* A ewe, ram or lamb of the broad-tailed kind kept in the hills of Asia and Syria, redrawn after the maintainer's reference picture: a deep,
     plush shaggy fleece in flowing vertical-diagonal locks, shaded in warm earthy tones with sculpted woolly thigh and brisket masses that hang
     low over the belly; a plump broad-tail cushion set on at the rump; a thick woolly neck blending smoothly out of the shoulder in curved
     collar folds up into a woolly poll cap crowning the head; a compact, slightly Roman-nosed bare head turned three-quarters toward us, with a
     light plane along the bridge of the nose, a dark eye with a subtle brow and pale lower lid, and soft pendulous lop ears hanging down beside
     the cheek (never sticking out or pricked, so ears and head never make a cross); and shorter, sturdier tapering legs in the face's tones with
     pointed hocks and compact cloven hooves (at rest, the far hooves sit two drawing units higher in three-quarter perspective). A ram (ram:1)
     carries a fuller ringed neck and thick ribbed horns curving back, down behind the cheek and forward at the tips. A lamb (lamb:1) is a look
     of its own: a shorter, plumper curly-wool body, taller slender legs for its size, a bigger head and shorter drooping ears.
     Frames: 0 stands; 4 to 19 walk (1, 2, 3 are three moments of that walk); 20 and 21 bleat, the head up and the mouth open; 22 and 23
     chew, the head up and the jaw moving; 24 and 25 graze, the head down to the grass (24 the muzzle in it, 25 lifted a little and chewing).
     A look is {fl, face, k, ram, lamb}: the fleece and face colors, k a size between about 0.9 and 1.1 (its body plan's measures times k, the
     head and ears drawn at their own size), ram:1, and lamb:1. A number picks one of the flock's looks (LOOKS). */
  const FW=FIG.W,FH=FIG.H,X0=FIG.OX,Y0=FIG.OY;
  const LOOKS=[
    {fl:'#e4d8bc',face:'#6a4a34',k:1},
    {fl:'#e2d6b8',face:'#3e3129',k:.97},
    {fl:'#c2885e',face:'#e4cdb2',k:1.02},
    {fl:'#d6c8ac',face:'#583c2b',k:.98},
    {fl:'#e8e1d0',face:'#dcd0ba',k:1.06,ram:1},
    {fl:'#6e5d4f',face:'#342822',k:.98},
    {fl:'#efe6d0',face:'#74543c',k:1,lamb:1},
    {fl:'#e4d8be',face:'#3f322a',k:1,lamb:1}];
  const look=v=>typeof v==='number'?LOOKS[((v%LOOKS.length)+LOOKS.length)%LOOKS.length]:Object.assign({fl:'#e4d8bc',face:'#6a4a34',k:1},v||{});
  /* warm earthy five-tone ramp (highlight, light, base, shadow, deep) so cream and russet wool keep their warmth in shadow */
  const warmRamp=(c,warm=1)=>{const[r,g,b]=hex(c),lum=(r*.3+g*.59+b*.11)/255,sh=warm?'#4a3220':'#362822',dp=warm?'#28180e':'#1c1410';
    return[tint(c,lum>.78?.18:lum>.52?.26:.34),tint(c,lum>.78?.08:.13),c,mix(tint(c,-.22+.05*lum),sh,lum>.65?.32:.24),mix(tint(c,-.46+.08*lum),dp,lum>.65?.46:.38)]};
  /* open Catmull-Rom curve keeping [x, y, r] along a horn's spiral */
  const smoothOpen=(P,n=5)=>{const R=[],N=P.length,D=P[0].length;for(let i=0;i<N-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(N-1,i+2)],steps=i===N-2?n+1:n;
    for(let j=0;j<steps;j++){const t=j/n,t2=t*t,t3=t2*t,pt=[];for(let c=0;c<D;c++)pt.push(.5*(2*p1[c]+(p2[c]-p0[c])*t+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*t2+(3*p1[c]-p0[c]-3*p2[c]+p3[c])*t3));R.push(pt)}}return R};
  /* the body plans: hips and shoulders (SH, SF), where the legs go in (LT), the fleece barrel, woolly thigh and chest, neck, head, ears,
     broad tail, leg radii, and the walk (REACH drawing units a stance, BEAT seconds) */
  const PLAN={
    ewe:{SH:-14.5,SF:13.2,LT:-20.5,REACH:20,BEAT:.33,
      body:[[-23.5,-35.2],[-19.2,-40.4],[-12,-42.8],[-4,-43.2],[4.2,-42.6],[11.5,-41.4],[17,-38.2],[20.2,-33],[20.6,-26.6],[18.2,-20.6],[14,-17.6],[8.2,-17.5],[1.2,-18],[-6.8,-18.2],[-14.5,-18.5],[-20.5,-20.8],[-24.5,-26.2],[-25.2,-31.5]],
      thigh:[[-11.8,-39.2],[-18.2,-40.6],[-23,-36.8],[-24.6,-30.2],[-23,-22.8],[-19.4,-16.8],[-15.2,-15.8],[-12.4,-19.8],[-11,-26.8],[-10.6,-34]],
      chest:[[8.5,-39.5],[14.5,-39],[19,-34.8],[21,-28.2],[19.8,-21.6],[16.2,-16.6],[11.8,-16.4],[9,-21],[7.8,-29]],
      neck:[[14,-33,7.6]],
      head:{len:10.4,r0:4,r1:2.15,ear:8.8,earR:1.95},
      poses:{rest:{px:23.8,py:-43.4,al:54,jaw:0,en:116,ef:132},20:{px:24.6,py:-45.2,al:30,jaw:16,en:128,ef:142},21:{px:24.8,py:-45.8,al:22,jaw:26,en:132,ef:146},
        22:{px:23.8,py:-43.4,al:54,jaw:7,en:116,ef:132},23:{px:24,py:-43,al:58,jaw:0,chew:1,en:114,ef:130},24:{px:21.4,py:-14.2,al:80,jaw:0,low:1,en:94,ef:108},
        25:{px:21.6,py:-16.6,al:74,jaw:7,low:1,en:98,ef:112}},
      tail:[[-22.2,-34.4,4.2],[-25.8,-25,4.2],[-25.2,-20.6,3.2]],legR:[3.1,1.22]},
    lamb:{SH:-9.8,SF:8.4,LT:-15,REACH:14,BEAT:.24,
      body:[[-15.8,-25.2],[-12.8,-28.8],[-7.2,-30.2],[-.8,-30.4],[5.2,-29.6],[10,-27.2],[12.8,-23],[12.6,-18],[9.4,-14.4],[3.2,-13.8],[-3.8,-13.8],[-10,-14.6],[-14.6,-17.4],[-16.6,-21.4]],
      thigh:[[-8,-28],[-12.6,-28.8],[-15.6,-25.8],[-16.2,-21.2],[-14.6,-16.4],[-11.6,-13.2],[-8.8,-13.6],[-7.4,-18],[-7.2,-23.5]],
      chest:[[5,-28.2],[9.4,-27.4],[12.4,-23.8],[12.8,-18.8],[10.6,-14.4],[7.6,-13.6],[5.2,-17.4],[4.4,-23]],
      neck:[[8.6,-23.6,5.2]],
      head:{len:8.4,r0:3.7,r1:2,ear:6.2,earR:1.6},
      poses:{rest:{px:15.6,py:-32,al:50,jaw:0,en:118,ef:132},20:{px:16.4,py:-33.8,al:26,jaw:18,en:128,ef:142},21:{px:16.6,py:-34.2,al:18,jaw:28,en:132,ef:146},
        22:{px:15.6,py:-32,al:50,jaw:7,en:118,ef:132},23:{px:15.8,py:-31.6,al:54,jaw:0,chew:1,en:116,ef:130},24:{px:14.6,py:-10.8,al:80,jaw:0,low:1,en:94,ef:108},
        25:{px:14.8,py:-12.6,al:72,jaw:7,low:1,en:98,ef:112}},
      tail:[[-14.6,-24.2,2.8],[-16.4,-18.2,2.4],[-16,-16.2,1.8]],legR:[2.35,1.08]}};
  const planOf=v=>v.lamb?PLAN.lamb:PLAN.ewe;
  const stride=v=>{const P=planOf(v);return P.REACH/.625/2};
  const frame=(dist,v,lk)=>{const L=look(lk),P=planOf(L),c=Math.max(stride(L),Math.abs(v==null?WALK_V:v)*P.BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
  const atPose=(W,ph,off,st,R)=>{if(!W)return{hx:st,lift:0,bend:0};const p=((ph-off)%1+1)%1,B=.625;if(p<B)return{hx:R/2-R*p/B,lift:0,bend:0};
    const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-R/2*Math.cos(Math.PI*v),lift:v?1+Math.round(3.5*q):0,bend:q}};
  /* where each hoof stands: hind far, fore far, hind near, fore near (their phase and their place at rest) */
  const HOOVES=[[.5,4.2,1],[.75,2.6,0],[0,-2.8,1],[.25,-1.2,0]];
  const shadowSpan=(fr,lk)=>{const L=look(lk),P=planOf(L),k=L.k||1,W=fr>=1&&fr<20,q=fr>=4?(fr-4)%16:(fr-1)*4,ph=q/16,
      xs=HOOVES.map(([off,st,hind])=>(hind?P.SH:P.SF)*k+atPose(W,ph,off,st,P.REACH).hx),x0=Math.min(...xs)-2.5,x1=Math.max(...xs)+3;return[(x1-x0)/4+1.3,(x0+x1)/4]};
  const smooth=(P,n=4)=>{const R=[],N=P.length;for(let i=0;i<N;i++){const p0=P[(i+N-1)%N],p1=P[i],p2=P[(i+1)%N],p3=P[(i+2)%N];
    for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;R.push([0,1].map(c=>.5*(2*p1[c]+(p2[c]-p0[c])*t+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*t2+(3*p1[c]-p0[c]-3*p2[c]+p3[c])*t3)))}}return R};

  function sheep(g,x,y,dir,fr,lk){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
    const L=look(lk),P=planOf(L),k=L.k||1,lamb=!!L.lamb,ram=!!L.ram&&!lamb,FL=warmRamp(L.fl,1),FC=warmRamp(L.face,0),
      [fr0,fg0,fb0]=hex(L.face),fLum=(fr0*.3+fg0*.59+fb0*.11)/255,
      SK=warmRamp(fLum<.32?mix(L.face,'#2c2420',.2):mix(L.face,L.fl,.14),0),
      HOOF=['#4c423c','#3a312c','#29221e','#1d1714','#120e0c'],HORN=['#dfd2b6','#b8a280','#8c7558','#5e4c38','#34271c'],
      W=fr>=1&&fr<20,q=fr>=4&&fr<20?(fr-4)%16:W?(fr-1)*4:0,ph=q/16,o=W&&(q%8===4||q%8===5)?1:0,hd=W?[0,0,0,0,1,2,1,0][q%8]:0,
      tl=W?Math.round(1.1*Math.cos(6.2832*(ph-.05))):0,HP=Object.assign({},P.poses[fr>=20?Math.min(25,fr):'rest']);
    if(ram&&!HP.low){HP.py-=1.4;HP.px+=1.2;HP.al-=6}
    if(!HP.low){HP.py+=o+hd;HP.px+=hd*.35}
    const Zb=new Float32Array(FW*FH).fill(-1e9),Cb=new Array(FW*FH),Pb=new Uint8Array(FW*FH);
    const idx=(px,py)=>py>=0||py<-Y0||px<-X0||px>=FW-X0?-1:(py+Y0)*FW+px+X0;
    const put=(px,py,z,col,part)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&z>Zb[i]){Zb[i]=z;Cb[i]=col;Pb[i]=part}};
    const partAt=(px,py)=>{const i=idx(Math.floor(px),Math.floor(py));return i<0?0:Pb[i]};
    const set=(px,py,col)=>{const i=idx(Math.floor(px),Math.floor(py));if(i>=0&&Pb[i])Cb[i]=col};
    const tn=(nx,ny,nz,px,py,ex)=>{const s=nx*.34-ny*.84+nz*.42+((px+py)&1?.04:-.04);return Math.max(0,Math.min(4,(s>.84?0:s>.5?1:s>.1?2:s>-.24?3:4)+(ex||0)))};
    const hh=(a,b)=>{let n=Math.imul((a|0)*73856093^(b|0)*19349663,0x85ebca6b);n^=n>>>13;return(n>>>0)%97};
    /* wool: flowing vertical-diagonal hanging locks modulated gently (+/-1 tone) round the form's light, never a regular grid or plus */
    const wool=(ex,mode=0)=>(nx,ny,nz,px,py)=>{const base=tn(nx,ny,nz,px,py,ex),Y=py-o;let b=base;
      if(mode===2){const col=Math.floor((px+50)/2.8),off=hh(col,13)%4,vy=((Y+50+off)%4+4)%4;
        if(nx>.48&&b<4)b++;else if(vy===0&&nx<.2&&b>0)b--;else if(vy===3&&b<3)b++;return FL[Math.max(0,Math.min(4,b))]}
      const skirt=ny>.56?1:0,slant=lamb?.14:.22,u=px+60+(Y+46)*slant+Math.sin((Y+42)*.16)*.55,stepX=lamb?2.9:3.3,
        col=Math.floor(u/stepX),f=u/stepX-col,stagger=hh(col,31)%5,len=lamb?4:5+(hh(col,17)%3),
        yIn=(((Math.floor(Y)+60+stagger)%len)+len)%len,seed=hh(col,Math.floor((Math.floor(Y)+60+stagger)/len));
      if(f>.14&&f<.58&&yIn<len-1){if((yIn===0||(yIn===1&&seed%3<2))&&ny<.3&&b>0)b--}
      else if(f>=.74&&seed%5<3&&yIn>0&&ny>-.45)b=Math.min(4,base+1);
      else if(yIn===len-1&&f>.25&&f<.8&&seed%3===0&&ny>-.2)b=Math.min(4,base+1);
      if(skirt)b=Math.min(4,Math.max(b,base+1));
      return FL[Math.max(0,Math.min(4,b))]};
    const cap=(x0,y0,r0,x1,y1,r1,cz,mat,part)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
      for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
        const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
        const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,cz+r*w,mat(ex/r,ey/r,w,px,py,t),part)}};
    const ell=(cx,cy,cz,a,b,mat,part)=>{const R=Math.max(a,b)+1;
      for(let py=Math.floor(cy-R);py<=cy+R;py++)for(let px=Math.floor(cx-R);px<=cx+R;px++){const u=(px+.5-cx)/a,v=(py+.5-cy)/b,q2=1-u*u-v*v;if(q2<0)continue;
        const w=Math.sqrt(q2),l=Math.hypot(u,v,w);put(px,py,cz+Math.max(a,b)*w,mat(u/l,v/l,w/l,px,py),part)}};
    const mass=(Pt,Lz,R,mat,part,soft=1)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[a,b]of Pt){x0=Math.min(x0,a);x1=Math.max(x1,a);y0=Math.min(y0,b);y1=Math.max(y1,b)}const N=Pt.length;
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){const cx=px+.5,cy=py+.5;let inn=false,best=1e9,ex=0,ey=0;
        for(let i=0,j=N-1;i<N;j=i++){const[ax,ay]=Pt[j],[bx,by]=Pt[i];if((ay>cy)!==(by>cy)&&cx<(bx-ax)*(cy-ay)/(by-ay)+ax)inn=!inn;
          const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1;let t=((cx-ax)*dx+(cy-ay)*dy)/l2;t=t<0?0:t>1?1:t;const qx=ax+dx*t-cx,qy=ay+dy*t-cy,d2=qx*qx+qy*qy;if(d2<best){best=d2;ex=qx;ey=qy}}
        if(!inn)continue;const d=Math.sqrt(best),qq=Math.max(0,1-d/R)*soft,l=d||1,nz=Math.sqrt(1-qq*qq);put(px,py,Lz+R*nz,mat(ex/l*qq,ey/l*qq,nz,px,py),part)}};
    const K=p=>[p[0]*k,p[1]*k+o];
    /* the legs: woolly upper cuff tapering into slim bare shanks with a pointed hock behind, knee in front, and dark cloven hooves */
    const leg=([off,st,hind],near)=>{const A=atPose(W,ph,off,st,P.REACH),ex=near?0:1,cz=near?-10:-60,gy=(!W&&!near)?-2:0,sx=(hind?P.SH:P.SF)*k,
        tx=sx,ty=P.LT*k+o,hx=sx+A.hx,fy=gy-3-A.lift,b=A.bend,dx=hx-tx,dy=fy-ty,Ln=Math.hypot(dx,dy)||1,bx=-dy/Ln,by=dx/Ln,
        [r0,r1]=P.legR,jt=hind?.46:.5,jo=hind?(2.1+1.8*b):-(.15+2.6*b),jx=tx+dx*jt+bx*jo,jy=ty+dy*jt+by*jo,wx=tx+(jx-tx)*.42,wy=ty+(jy-ty)*.42,
        sk=(nx,ny,nz,px,py)=>{let tb=tn(nx,ny,nz,px,py,ex);if(near&&nx<-.35&&tb<4)tb++;return SK[Math.min(4,tb)]};
      cap(tx,ty,r0*1.16,wx,wy,r0*.76,cz,wool(ex+(near?0:1),0),4);cap(wx,wy,r1*1.45,jx,jy,r1*1.12,cz-.4,sk,4);
      if(hind)cap(jx,jy,r1*1.08,jx+bx*1.2,jy+by*1.2,r1*.72,cz+.2,sk,4);else ell(jx,jy,cz+.2,r1*1.18,r1*1.15,sk,4);
      cap(jx,jy,r1*1.05,hx-.2,fy,r1*.9,cz+.4,sk,4);ell(hx-.1,fy,cz+.5,r1*1.08,r1*1.02,sk,4);
      const hm=(nx,ny,nz,px,py)=>HOOF[Math.min(4,tn(nx,ny,nz,px,py,ex))];
      if(!A.lift){for(let yy=-3;yy<=-1;yy++)for(let xx=-1;xx<=2;xx++){if((yy===-3&&xx===2)||(yy===-3&&xx===-1&&lamb))continue;
        put(Math.floor(hx)+xx,gy+yy,cz+2,HOOF[Math.min(4,(yy===-3?1:xx===2?1:xx===-1?3:2)+ex)],5)}}
      else cap(hx-.1,fy,r1,hx+.85,fy+2.3,r1*.96,cz+2,hm,5)};
    leg(HOOVES[0],0);leg(HOOVES[1],0);leg(HOOVES[2],1);leg(HOOVES[3],1);
    /* the broad tail: plump woolly cushion curving out from the rump behind the thigh */
    {const T=P.tail.map(([a,b,r])=>[a*k,b*k+o,r*k]);
      cap(T[0][0],T[0][1],T[0][2],T[1][0]+tl*.3,T[1][1],T[1][2],6.5,wool(0,2),7);
      cap(T[1][0]+tl*.3,T[1][1],T[1][2]*.92,T[2][0]+tl*.5,T[2][1],T[2][2],7,wool(1,2),7)}
    /* the fleece: deep shaggy barrel with scalloped lower skirt, plus sculpted woolly thigh and chest */
    {const B=smooth(P.body.map(K)),N=B.length,cx=B.reduce((s,p)=>s+p[0],0)/N,cy=B.reduce((s,p)=>s+p[1],0)/N,
        F=B.map(([x0,y0],i)=>{const ang=Math.atan2(y0-cy,x0-cx),low=Math.max(0,Math.sin(ang)),
          bump=(.42+low*.85)*Math.sin(i*2.3+.4)+(.28+low*.42)*Math.sin(i*4.7+1.3);return[x0+Math.cos(ang)*bump,y0+Math.sin(ang)*bump]});
      mass(F,10,lamb?7.5:10.5,wool(0,0),1);
      mass(smooth(P.thigh.map(K),3).map(([x0,y0],i)=>[x0+.32*Math.sin(i*2.7),y0+.42*Math.cos(i*3.1)]),12.2,lamb?5.5:7.5,wool(0,0),1,.8);
      mass(smooth(P.chest.map(K),3).map(([x0,y0],i)=>[x0+.36*Math.sin(i*2.5+1),y0+.42*Math.cos(i*2.9)]),12.8,lamb?5.5:7.8,wool(0,0),1,.82)}
    /* the neck: blends smoothly out of the shoulder and rises in curved wool collar folds to the head */
    const hx0=HP.px*k,hy0=HP.py*k,a=HP.al*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,
      Hp=(u,v)=>[hx0+u*ux+v*vx,hy0+u*uy+v*vy],lu=(px,py)=>(px+.5-hx0)*ux+(py+.5-hy0)*uy,lv=(px,py)=>(px+.5-hx0)*vx+(py+.5-hy0)*vy,Hd=P.head;
    {const[[n0,n1,nr0]]=P.neck,[s0,s1]=K([n0,n1]),[e0,e1]=Hp(-1.4,.9),m0=(s0+e0)/2+(HP.low?2.2:-.3),m1=(s1+e1)/2+(HP.low?-1.4:-.6),
        nxA=e0-s0,nyA=e1-s1,nLen=Math.hypot(nxA,nyA)||1,nux=nxA/nLen,nuy=nyA/nLen,rBoost=ram?1.12:1,bodyW=wool(0,0),
        ruff=(nx,ny,nz,px,py)=>{const X=px+.5-s0,Y=py+.5-s1,along=X*nux+Y*nuy,across=-X*nuy+Y*nux;
          if(along<2&&!ram)return bodyW(nx,ny,nz,px,py);
          const base=tn(nx,ny,nz,px,py,0),ring=along+across*across*.03+Math.sin(across*.65)*.35,step=lamb?3.2:ram?3.3:3.8,
            phR=((ring%step)+step)%step,notch=hh(Math.floor(across/2.4),Math.floor(ring/step))%5,str=ram?4:3;
          let b=base;if(phR<1.1&&notch<str&&ny<.35&&b>0)b--;else if(phR>step-.85&&notch<str&&ny>-.4&&b<4)b=Math.min(4,base+1);
          return FL[Math.max(0,Math.min(4,b))]},
        neckSeg=(x0,y0,r0,z0,x1,y1,r1,z1)=>{const dx=x1-x0,dy=y1-y0,L2=dx*dx+dy*dy||1,R=Math.max(r0,r1)+1;
          for(let py=Math.floor(Math.min(y0,y1)-R);py<=Math.max(y0,y1)+R;py++)for(let px=Math.floor(Math.min(x0,x1)-R);px<=Math.max(x0,x1)+R;px++){
            const X=px+.5-x0,Y=py+.5-y0;let t=(X*dx+Y*dy)/L2;t=t<0?0:t>1?1:t;const ex=X-dx*t,ey=Y-dy*t,d=Math.hypot(ex,ey),r=r0+(r1-r0)*t;if(d>r)continue;
            const kk=d/r,w=Math.sqrt(1-kk*kk);put(px,py,z0+(z1-z0)*t+r*w,ruff(ex/r,ey/r,w,px,py),2)}};
      neckSeg(s0,s1,nr0*k*rBoost,13.5,m0,m1,(nr0*k*rBoost+Hd.r0*1.12)/2+.4,17.5);
      neckSeg(m0,m1,(nr0*k*rBoost+Hd.r0*1.12)/2+.4,17.5,e0,e1,Hd.r0*(ram?1.16:1.05),21);
      if(!HP.low){const[t0,t1]=Hp(1.6,Hd.r0*1.38);neckSeg(s0+3*k,s1+4.8*k,(lamb?3.5:4.8)*k*rBoost,14.5,t0-1.2,t1+2.2,(lamb?2.6:3.5)*k*rBoost,19.5)}}
    /* the head: slightly Roman-nosed bare skull and jaw, crowned by a woolly poll cap */
    const ja=(HP.jaw||0)*Math.PI/180,hu=Hd.len*.38,hv=Hd.r0*.5,rot=(u,v)=>[hu+(u-hu)*Math.cos(ja)-(v-hv)*Math.sin(ja),hv+(u-hu)*Math.sin(ja)+(v-hv)*Math.cos(ja)],
      faceMat=ex=>(nx,ny,nz,px,py)=>{const u=lu(px,py),v=lv(px,py),dt=(px+py)&1?.35:-.35;let b=tn(nx,ny,nz,px,py,ex);
        if(v<-.55+dt&&u>1&&u<Hd.len-.5&&b>0)b=Math.max(0,b-1);if(v>1.9&&u>1.5&&u<Hd.len-2.4&&b<4)b=Math.min(4,b+1);
        return fLum>=.25&&fLum<=.65&&u>Hd.len-2.3+dt?mix(FC[Math.max(0,b)],L.fl,.25):FC[Math.max(0,Math.min(4,b))]};
    {const[a0,a1]=Hp(0,-.2),[m0,m1]=Hp(Hd.len*.52,-.85),[b0,b1]=Hp(Hd.len,-.15),[c0,c1]=Hp(Hd.len*.26,Hd.r0*.32);
      cap(a0,a1,Hd.r0*1.02,m0,m1,Hd.r0*.78,30,faceMat(0),3);cap(m0,m1,Hd.r0*.76,b0,b1,Hd.r1,30.5,faceMat(0),3);
      ell(c0,c1,29.8,Hd.r0*.85,Hd.r0*.76,faceMat(0),3)}
    {const[a0,a1]=Hp(hu,hv*.52),[b0,b1]=Hp(...rot(Hd.len-.7,Hd.r1*.55)),jl=HP.chew?.65:0;cap(a0,a1,Hd.r0*.55,b0+jl*ux,b1+jl*uy,Hd.r1*.58,29.2,faceMat(1),3)}
    if(HP.jaw){const Q=[Hp(hu+.8,hv*.42),Hp(Hd.len-.2,Hd.r1*.2),Hp(...rot(Hd.len-.6,Hd.r1*.18))];let x0=99,x1=-99,y0=99,y1=-99;for(const[p,qq]of Q){x0=Math.min(x0,p);x1=Math.max(x1,p);y0=Math.min(y0,qq);y1=Math.max(y1,qq)}
      for(let py=Math.floor(y0);py<=y1;py++)for(let px=Math.floor(x0);px<=x1;px++){let c=false;for(let i=0,j=2;i<3;j=i++){const[xi,yi]=Q[i],[xj,yj]=Q[j];if(yi>py+.5!==yj>py+.5&&px+.5<(xj-xi)*(py+.5-yi)/(yj-yi)+xi)c=!c}if(c)put(px,py,31.2,'#441c1a',3)}}
    {const[p0,p1]=Hp(-1.8,-1.5),[p2,p3]=Hp(2.4,-Hd.r0*.74),[p4,p5]=Hp(-.6,Hd.r0*.42),
        capWool=(nx,ny,nz,px,py)=>{let b=tn(nx,ny,nz,px,py,0);const h=hh(px+30,py+60)%5;if(ny<-.2&&h<2&&b>0)b--;else if(ny>.2&&h===4&&b<4)b++;return FL[b]};
      cap(p0,p1,Hd.r0*(ram?.92:.98),p2,p3,Hd.r0*(ram?.56:.7),34,capWool,2);cap(p0,p1,Hd.r0*.85,p4,p5,Hd.r0*.66,32,capWool,2)}
    /* the drooping lop ears: soft teardrop leaves hanging down beside the cheek */
    const ear=(u0,v0,ang,len,r,cz,near)=>{const[b0,b1]=Hp(u0,v0),ea=ang*Math.PI/180,ex=Math.cos(ea),ey=Math.sin(ea),
        midx=b0+ex*len*.52+(near?-.4:.5),midy=b1+ey*len*.52,t0=b0+ex*len+(near?-.9:1.1),t1=b1+ey*len,
        earMat=(nx,ny,nz,px,py,t)=>{let b=tn(nx,ny,nz,px,py,near?0:2);if(t>.85)return FC[Math.min(4,b+1)];
          if(near){if(nx>.3&&t>.1&&t<.82)return FC[Math.max(0,b-1)];if(nx<-.32&&t>.14)return FC[Math.min(4,b+1)]}return FC[Math.max(0,Math.min(4,b))]};
      cap(b0,b1,r*.75,midx,midy,r*1.08,cz,earMat,6);cap(midx,midy,r*1.05,t0,t1,r*.55,cz+.2,earMat,6)};
    if(!ram){ear(1,-Hd.r0*.76,HP.ef,Hd.ear*.84,Hd.earR*.84,26,0);ear(-.8,-Hd.r0*.12,HP.en+4,Hd.ear,Hd.earR,40,1)}
    else ear(.6,.1,HP.en+16,Hd.ear*.6,Hd.earR*.74,34,1);
    /* the ram's curled ribbed horns */
    if(ram){const hornArc=(pts,cz,far)=>{const S=smoothOpen(pts,5);for(let i=0;i<S.length-1;i++){const t=i/(S.length-1),[x0,y0,r0]=S[i],[x1,y1,r1]=S[i+1];
        cap(x0,y0,r0,x1,y1,r1,cz+(far?0:t*6),(nx,ny,nz,px,py)=>{let b=tn(nx,ny,nz,px,py,far?1:0);const rib=Math.sin(t*30+(far?1.2:0));
          if(rib>.38&&t<.86&&b>0)b--;else if(rib<-.42&&b<4)b++;if(t>.76)b=Math.min(4,b+1);return HORN[Math.max(0,Math.min(4,b))]},8)}},
        Hpt=(u,v,r)=>{const[wx,wy]=Hp(u,v);return[wx,wy,r]};
      hornArc([Hpt(1.5,-Hd.r0*.72,2.2),Hpt(.8,-Hd.r0*1.75,2.1),Hpt(3.8,-Hd.r0*2.15,1.85),Hpt(7.2,-Hd.r0*1.75,1.48),Hpt(9.2,-Hd.r0*1.12,1.05)],24,1);
      hornArc([Hpt(.6,-Hd.r0*.65,2.65),Hpt(-3,-Hd.r0*1.48,2.55),Hpt(-6.4,-Hd.r0*.55,2.3),Hpt(-5.8,Hd.r0*.82,1.95),Hpt(-2,Hd.r0*1.38,1.55),Hpt(1.6,Hd.r0*.88,1.15)],44,0)}
    /* the eye with brow shadow and light lower lid; nostril; closed mouth line */
    {const[e0,e1]=Hp(Hd.len*.34,-Hd.r0*.28),X=Math.floor(e0),Y=Math.floor(e1),es=(xx,yy,c)=>{if(partAt(xx,yy)===3)set(xx,yy,c)};
      es(X,Y-1,FC[4]);es(X+1,Y-1,FC[3]);es(X,Y,'#120c0a');es(X+1,Y,'#281e18');es(X,Y+1,fLum<.34?FC[1]:FC[0]);es(X+1,Y+1,FC[1])}
    {const[n0,n1]=Hp(Hd.len-.45,-Hd.r1*.26),[n2,n3]=Hp(Hd.len-.95,-Hd.r1*.14);
      if(partAt(n0,n1)===3)set(n0,n1,'#1a1210');if(partAt(n2,n3)===3&&fLum>.3)set(n2,n3,FC[4])}
    if(!HP.jaw)for(let u=Hd.len-3;u<=Hd.len-.3;u+=.45){const[p,qq]=Hp(u,Hd.r1*.5);if(partAt(p,qq)===3)set(p,qq,FC[4])}
    /* small holes left between parts are closed in the color beside them */
    {const seen=new Uint8Array(FW*FH);for(let i=0;i<FW*FH;i++){if(Pb[i]||seen[i])continue;const st=[i],comp=[];let edge=false;seen[i]=1;
      while(st.length){const kq=st.pop(),xx=kq%FW,yy=(kq-xx)/FW;comp.push(kq);if(!xx||!yy||xx===FW-1||yy===FH-1)edge=true;
        for(const j of[kq-1,kq+1,kq-FW,kq+FW])if(j>=0&&j<FW*FH&&!seen[j]&&!Pb[j]&&Math.abs(j%FW-xx)<=1){seen[j]=1;st.push(j)}}
      if(!edge&&comp.length<6)for(const kq of comp){const n=[kq-1,kq+1,kq-FW,kq+FW].find(j=>Pb[j]&&Pb[j]!==10);if(n!=null){Cb[kq]=Cb[n];Pb[kq]=10}}}}
    for(let i=0;i<FW*FH;i++)if(Pb[i]){g.fillStyle=Cb[i];g.fillRect(i%FW-X0,Math.floor(i/FW)-Y0,1,1)}
    g.restore()}
  /* the bleat: two wavering nasal notes, deepest for a ram, mid for a ewe, higher for a lamb */
  const sound=lk=>{const L=look(lk),f=L.lamb?620:L.ram?340:430,t=now();
    for(const[d,f0,f1,h]of[[0,f,f*.97,.2],[.21,f*1.04,f*.9,.34]])tone({f:f0,to:f1,t:t+d,d:h,type:'sawtooth',v:.03,a:.02,sus:1,vib:9,vibd:.6,lp:[[1800,0],[1100,h]]})};
  return{paint:sheep,frame,look,LOOKS,plan:PLAN,stride,sw:11,span:shadowSpan,sound,voice:[[0,20],[120,21],[330,20],[420,21],[560,0]]}})();
/* =============================================================== end of the sheep ============================================================ */


/* --- common to all: placing with hoof-centered dynamic contact + cast shadows --- */
const KINDS={donkey:DONKEY,mule:MULE,ox:OX,sheep:SHEEP},VOICE={};
const speak=(id,kind,lk)=>{const K=KINDS[kind];try{K.sound(lk)}catch(e){}VOICE[id]={K,t0:performance.now()};const end=K.voice[K.voice.length-1][0];
  return new Promise(res=>setTimeout(()=>{if(VOICE[id]&&VOICE[id].K===K)delete VOICE[id];res()},end))};
const pose=(id,fr)=>{const v=VOICE[id];if(!v)return fr;const ms=performance.now()-v.t0,V=v.K.voice;if(ms>=V[V.length-1][0]){delete VOICE[id];return fr}
  let f=fr;for(const[t,q]of V)if(ms>=t)f=q;return f||fr};
const place=(kind,K)=>(g,x,y,dir,fr,load,lit,z)=>{const[sw,sx]=K.span(fr);figure(g,x,y,lit,kind+dir+'|'+fr+'|'+load,s=>K.paint(s,0,0,dir,fr,load),sw,dir*sx,z)};
return{donkey:place('donkey',DONKEY),mule:place('mule',MULE),
  ox:(g,x,y,dir,fr,c,gar,lit,z)=>{const[sw,sx]=OX.span(fr);figure(g,x,y,lit,'ox'+dir+'|'+fr+'|'+c+(gar?'g':''),s=>OX.paint(s,0,0,dir,fr,c,gar),sw,dir*sx,z)},
  /* a sheep that stands in the room's depth queue (an actor, or one of a flock that a room's draw places), and one painted into a backdrop */
  sheep:(g,x,y,dir,fr,lk,lit,z)=>{const[sw,sx]=SHEEP.span(fr,lk);figure(g,x,y,lit,'sheep'+(dir<0?'-1':'1')+'|'+fr+'|'+(typeof lk==='object'?JSON.stringify(lk):lk|0),s=>SHEEP.paint(s,0,0,dir,fr,lk),sw,dir*sx,z)},
  sheepStill:(g,x,y,dir,fr,lk)=>{const[sw,sx]=SHEEP.span(fr,lk),cx=x+dir*sx;oval(g,cx,y-.4,sw,2,'rgba(24,18,32,.2)');oval(g,cx,y-.4,sw*.68,1.3,'rgba(24,18,32,.24)');SHEEP.paint(g,x,y,dir,fr,lk)},
  flock:(n,seed)=>{const r=rng(seed||7),ewes=[0,1,2,3,5],out=[];let hasRam=0;for(let i=0;i<n;i++){const lamb=i%4===3;let lk=lamb?6+(i>>2)%2:Math.floor(r()*6);
    if(!lamb&&lk===4){if(hasRam)lk=ewes[Math.floor(r()*ewes.length)];else hasRam=1}out.push({look:lk,dir:r()<.5?-1:1,fr:[0,24,25,0,22,24][Math.floor(r()*6)],ph:r()})}return out},
  frame:{donkey:DONKEY.frame,mule:MULE.frame,ox:OX.frame,sheep:SHEEP.frame},paint:{donkey:DONKEY.paint,mule:MULE.paint,ox:OX.paint,sheep:SHEEP.paint},kinds:KINDS,speak,pose,
  DONKEY_STRIDE:DONKEY.stride,DONKEY_BEAT:DONKEY.beat}})();
