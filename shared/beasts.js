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
