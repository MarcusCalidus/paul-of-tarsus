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
    /* A pack donkey in the same pixel manner, seen from the side. load: 0 saddle blanket only, 1 pack bags, 2 bags filled, with sacks on top.
       fr 0 stands. fr 4 to 19 are the sixteen frames of its walk (beastFr below gives the frame for a distance walked); 1, 2 and 3 are three
       moments of that walk, a quarter of a cycle apart, for a scene that counts frames itself. The walk has four beats: near hind, near
       fore, far hind, far fore, each a quarter of the cycle after the one before. A hoof stands for ten frames, going back under the body,
       and swings forward for six, lifted, with the leg bent at the hock or the knee. While the donkey walks, the two legs of a pair leave
       the body at nearly one place and open like a pair of compasses: set apart as they stand, they would cross as an X under the belly.
       The body sinks a pixel as each fore hoof lands, the head dips with it and for a frame after it, and the tip of the tail swings a
       pixel, away from the near hind leg when that leg is back. The load rides with the body. */
    const DONKEY_HEAD=["...e...e................","..eE..eE................","..eE..eE................","..eEe.eE................","..eEe.eEe...............","..eEeeeEe...............","..eeeeeeeh..............",
      ".dhhhhhhhhh.............",".dhHHHHHHhhhh...........","dhhHHkkHHHHhhhh.........","dhhHHkkHHHHHHhhhhm......","dhhhHHHHHHHHHhhhmmmm....",".dhhhhhHHHHHhhhmmmmmm...",".ddhhhhhhhhhhhmmmMMmmm..",
      "..ddhhhhhhhhhhmmmMMmnm..","...dddhhhhhhhhmmmmmmmm..",".....ddddhhhhdmmmmmmm...",".........ddddd.mmmm....."];
    /* The numbers of that walk. A hoof reaches DONKEY_REACH drawing units (two to a room pixel) from the front of its step to the back, and
       stands on the ground for DONKEY_STANCE of the cycle. So one cycle carries the donkey DONKEY_STRIDE room pixels with its hooves
       planted: 22 / .625 / 2 = 17.6. A cycle is never quicker than DONKEY_BEAT seconds, or it would be a scurry and not a walk: up to
       17.6 / .64 = 27.5 room pixels a second the hooves stay where they are set down, and above that they slip (at 66, the speed people
       walk at, by 58 hundredths of each cycle).
       beastFr: the frame of the walk for a distance walked (dist, in room pixels) at a speed (v, room pixels a second; 66 if none is given).
       A scene that moves a donkey draws it with beast(g, x, y, dir, beastFr(dist, v), load), and with frame 0 where it stands. */
    const DONKEY_REACH=22,DONKEY_STANCE=.625,DONKEY_STRIDE=DONKEY_REACH/DONKEY_STANCE/2,DONKEY_BEAT=.64;
    const beastFr=(dist,v)=>{const c=Math.max(DONKEY_STRIDE,Math.abs(v==null?WALK_V:v)*DONKEY_BEAT);return 4+Math.floor((dist/c%1+1)%1*16)%16};
    function donkey(g,x,y,dir,fr,load){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
      const px=(a,b,col,w,h)=>{g.fillStyle=col;g.fillRect(a,b,w||1,h||1)},D=ramp('#94836e'),pale='#c4b49c',hoof='#2a2018';
      const W=fr>0,k=fr>=4?(fr-4)%16:(fr-1)*4,ph=k/16,o=W&&(k%8===4||k%8===5)?1:0,hd=W&&(k%8===5||k%8===6)?1:0,tl=W?Math.round(Math.cos(6.2832*(ph-.05))):0;
      /* at: where the hoof of a leg is at this moment, the leg's beat being off of a cycle after the near hind leg's: hx before or behind the
         leg's root, lift off the ground, and bend, how far the joint is flexed */
      const at=off=>{if(!W)return{hx:0,lift:0,bend:0};const p=((ph-off)%1+1)%1,T=DONKEY_REACH,B=DONKEY_STANCE;if(p<B)return{hx:T/2-T*p/B,lift:0,bend:0};
        const v=(p-B)/(1-B),q=Math.sin(Math.PI*v);return{hx:-T/2*Math.cos(Math.PI*v),lift:Math.round(4*q),bend:3*q}};
      /* leg: from its root at lx down to the hoof, in two parts: the hock of a hind leg bends back, the knee of a fore leg forward. A part
         that slants is drawn a pixel or two wider, so that it is as thick as one that stands. */
      const leg=(lx,P,far,hind)=>{const y0=-31+o,n=-3-P.lift-y0,J=Math.round(n*.5),jx=hind?P.hx*.42-P.bend:P.hx*.5+P.bend;
        for(let i=0;i<n;i++){const t=i/(n-1),sl=Math.abs(i<=J?jx/J:(P.hx-jx)/(n-1-J)),ex=sl>.7?2:sl>.4?1:0,cx=lx+Math.round(i<=J?jx*i/J:jx+(P.hx-jx)*(i-J)/(n-1-J)),
            w=(t<.3?8:t<.6?7:6)+ex,x0=cx+(t<.3?0:1)-(ex>1?1:0),knee=t>.42&&t<.52?1:0;
          for(let q=0;q<w+knee;q++){const u=(q+.5)/(w+knee);px(x0+q,y0+i,D[Math.min(4,(u<.22?4:u<.5?3:u<.82?2:1)+(far?1:0))])}}
        const hx=lx+Math.round(P.hx)+1,hy=-3-P.lift;px(hx,hy,hoof,7,3);px(hx+5,hy,'#4a3a2c',2)};
      leg(W?-20:-17,at(.5),1,1);leg(W?15:14,at(.75),1,0);
      /* tail: set on at the top of the rump and lying along it, then hanging free to its tuft */
      const rump=yy=>{const dy=(yy+37.5)/13.5;return-Math.round(27*Math.sqrt(Math.max(0,1-dy*dy)))-1};
      for(let yy=-49;yy<=-23;yy++){const i=yy+49,tuft=i>20;px((tuft?-31:yy<-38?rump(yy)-2:-30)+(i>10?Math.round(tl*(i-10)/16):0),yy+o,tuft?hoof:D[i%5?3:4],tuft?3:2)}
      /* barrel of the body: lit along the back, pale under the belly */
      for(let yy=-51;yy<=-24;yy++){const dy=(yy+37.5)/13.5,hw=Math.round(27*Math.sqrt(Math.max(0,1-dy*dy)));
        for(let xx=-hw-1;xx<=hw-1;xx++){let v=dy<-.7?1:dy<-.2?2:dy<.45?3:4;if(xx<-hw+3)v=Math.min(4,v+1);if(xx>hw-6&&dy<.3)v=Math.max(1,v-1);px(xx,yy+o,dy>.72&&xx>-hw+4?pale:D[v])}}
      /* a broken highlight along the line of the back: each dash lies on the top row of the body where it is */
      for(let xx=-20;xx<16;xx+=3)px(xx,Math.ceil(-37.5-13.5*Math.sqrt(1-Math.pow((Math.abs(xx)+3)/27,2)))+o,D[0],2);
      leg(W?-22:-25,at(0),0,1);leg(W?17:18,at(.25),0,0);
      /* a short thick neck with its dark mane, the head carried low and forward. When the head dips (hd), the upper half of the neck goes down with it */
      for(let yy=-59;yy<=-41;yy++){const t=(yy+59)/18,x0=Math.round(25-13*t),x1=Math.round(38-9*t);for(let xx=x0;xx<=x1;xx++){const u=(xx-x0+.5)/(x1-x0+1);px(xx,yy+o+(t<.5?hd:0),xx-x0<2?'#3a2e24':D[u<.3?3:u<.7?2:1])}}
      /* the breast, rounding the foot of the neck back into the body */
      for(let yy=-40;yy<=-33;yy++){const x1=Math.round(29-(yy+41)*.6);for(let xx=24;xx<=x1;xx++)px(xx,yy+o,D[xx>x1-2?1:2])}
      stamp(g,DONKEY_HEAD,24,-75+o+hd,{h:D[2],H:D[1],d:D[3],e:D[2],E:'#5a4636',k:'#1a120c',m:pale,M:'#dccdb6',n:hoof});
      for(let i=0;i<6;i++)px(38,-63+o+hd+i,'#7a4a24');for(let i=0;i<9;i++)px(38-i,-64+o+hd-Math.round(i*.35),'#7a4a24');
      /* saddle blanket, held by two girths */
      const K=ramp('#8a4a3a');px(-9,-40+o,'#5a3a20',2,16);px(8,-40+o,'#5a3a20',2,16);px(-8,-40+o,'#3a2616',1,16);px(9,-40+o,'#3a2616',1,16);
      for(let i=0;i<12;i++){const hw=i<2?11:14;for(let xx=-hw;xx<=hw;xx++){const u=(xx+hw+.5)/(2*hw+1);px(xx,-53+o+i,i===8?'#d8c9a0':K[i===0?0:i===11?4:u<.15?4:u<.35?3:u<.75?2:1])}}
      for(let xx=-14;xx<=14;xx+=2)px(xx,-41+o,K[3]);
      if(load){const B=ramp('#30261f');px(-18,-55+o,'#4a3e34',37,5);px(-18,-55+o,'#6a5a4c',37);
        for(let i=0;i<26;i++){const ins=i>22?i-22:0;for(let xx=-18+ins;xx<=18-ins;xx++){const u=(xx+18.5)/37;let v=u<.12?4:u<.3?3:u<.7?2:1;if((xx+i*2)%4===0&&i%2)v=Math.max(0,v-1);px(xx,-50+o+i,B[v])}}
        px(-18,-50+o,'#5a4c40',37);px(-12,-56+o,'#9a7448',2,12);px(10,-56+o,'#9a7448',2,12);px(-11,-56+o,'#6a4e30',1,12);px(11,-56+o,'#6a4e30',1,12);
        if(load>1){for(const[sx,sy,sw,sh,sc]of[[-9,-56,10,15,'#cdbb8c'],[8,-56,10,17,'#d8c698']]){const Q=ramp(sc);
            for(let i=0;i<sh;i++){const dy=(i+.5-sh/2)/(sh/2),hw=Math.round(sw*Math.sqrt(Math.max(0,1-dy*dy)));for(let xx=-hw;xx<hw;xx++){const u=(xx+hw+.5)/(2*hw);px(sx+xx,sy-sh+i+o,Q[u<.15?4:u<.35?3:u<.7?2:dy<-.2?0:1])}}
            px(sx-2,sy-sh-3+o,Q[3],4,3);px(sx-1,sy-sh-3+o,Q[1],2,2);px(sx-3,sy-sh+o,'#7a5a34',6)}
          px(-18,-62+o,'#8a6a40',37);px(-18,-66+o,'#8a6a40',14);px(4,-67+o,'#8a6a40',14)}}
      g.restore()}
  const sound=()=>{tone({f:520,to:300,d:.22,type:'sawtooth',v:.06});tone({f:230,to:150,t:now()+.24,d:.4,type:'sawtooth',v:.07})};
  return{paint:donkey,frame:beastFr,reach:DONKEY_REACH,stance:DONKEY_STANCE,stride:DONKEY_STRIDE,beat:DONKEY_BEAT,voice:[[0,0],[650,0]],sound,sw:15}})();
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
       on the ground for OX_STANCE of the cycle. So one cycle carries the ox OX_STRIDE room pixels with its hooves planted: 44 / .62 / 2 =
       35.5, a long, slow step for a beast whose legs swing from a hip and a shoulder some thirty pixels above the ground. A cycle is never
       quicker than OX_BEAT seconds: up to 35.5 / .74 = 48 room pixels a second, WALK_V, the hooves stay exactly where they are set down, and
       a cycle takes three quarters of a second, a plod and not a scurry. Faster than WALK_V they would slip.
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
  const sound=()=>{tone({f:104,bend:[-260,.28],to:84,d:1.45,type:'sawtooth',v:.05,a:.14,sus:1,vib:1.2,vibd:.6,lp:[[240,0],[620,.3],[820,.7],[520,1.05],[220,1.45]]});
    tone({f:52,bend:[-260,.28],to:42,d:1.45,type:'triangle',v:.06,a:.16,sus:1})};
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
