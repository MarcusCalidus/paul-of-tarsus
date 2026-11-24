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
