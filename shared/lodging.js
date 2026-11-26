/* Paul of Tarsus: the lodging in Rome where Paul lived for two whole years in his own rented house, guarded by one soldier, and welcomed
   all who came to him (Acts 28:16, 23, 30, 31). The player chooses it at the end of Chapter Twenty-Four, and all of Chapter Twenty-Five is
   played in it. The sources say nothing of what it looked like or where it stood: only that it held many who came (The Watchtower of
   2013), and that the common people of Rome lived in tenements several storeys high, with shops and their living quarters on the
   ground floor and larger flats on the floor above (Insight "Rome"; the Study Edition's media "Apartment Buildings in Ancient Rome").
   So there are two lodgings to choose from, painted as one room in two variants:
     'flat'    a flat on the second floor of a tenement: a floor of planks, limewashed walls with a painted socle of red ochre, a
               ceiling of beams; a wide window with its shutters folded back, over the roofs of Rome to a hill far off with a temple's
               pediment on it; a door of upright planks at the right to the stair landing
     'street'  a room at street level, as the shops with their living quarters had: a floor of stone flags, older, rougher plaster,
               darker for its age; a wide doorway at the right that opens on a small square, with the house front
               opposite in its shade, a public fountain's long, low basin at its foot and the sun on the paving before it; a small
               window high in the wall (at night the doorway is shut with upright boards)
   Both have the same geometry (POS): the door's foot, the bed, the benches, the table with the papyrus, the pen and the inkwell, the
   stools, the jar and the niche with its lamp stand in the same places, so that one script plays in either. Nothing round stands where
   a head comes: the window and the doorways are square, the niche is a small square above head height, and the lamp's light falls
   outward and downward from it (nicheLight). No temple, altar or image in the room; the pediment far off through the window is the only
   temple seen, from outside and small (CONTRIBUTING section 3: Rome is one of the four cities).

   We look south through the back wall, so that the sun stands beyond it and crosses from left (east) to right (west) through the day:
   a patch of sun comes in through the window (and in the street room through the doorway and the high window), falls to the right
   and toward us in the morning, short at midday, to the left in the evening, and the figures' shadows turn with it (light()).
     early   early morning: low warm sun from the left, a long patch thrown to the right
     mid     mid-morning
     noon    midday: a high sun, a short patch close under the window
     after   afternoon
     eve     evening: low warm sun from the right, a long patch thrown to the left (the street room has no sun through its doorway in
             the early morning and the evening: the houses across the square shade it; the high window still lets a patch in)
     night   the lamp in its niche; the window dark over the roofs, a few lit windows far off

   Loaded on demand with need('lodging'); it paints with shared/materials.js, shared/coast.js and shared/temple.js (list them in the
   chapter's needs) and touches them only inside its functions. Painted to the standard of Chapters Fifteen to Twenty-One: on the
   half-pixel canvas, light per pixel, soft contact shadows, dithered once by the engine. Registered in shared/pwa.js for offline play.

   API (SHARED.lodging):
     room(g, o)        paints the room for a 320 by 144 room. o: {kind 'flat' or 'street', hour (HOURS key), cloak (false: the peg
                       stands bare, for the morning after Acts when Paul has taken his cloak), stools (left out: every
                       stool; false: none; an array of names from STOOLS, such as ['desk','table']: only those)}. A stool that is not
                       painted has no cut-out and no footprint either (pass the same list to props and foot); the level draws one it
                       has moved with SHARED.cast.custody.stool(g, x, y, {room}), after stoolCast(g, x, y, {hour}) for its shadow: it is
                       the same stool as the painted one, in the same light
     light(kind, hour) ART[id].light: the sun of the hour (its shadow tip for a figure 46 tall), or at night the lamp in its niche
     motion(o)         {draw(g, t)} for the room's draw: the lamp's flame at night, the fountain's spout by day in the street room
     props(kind, stools)  ART[id].props: the table and the stools that stand in the walk strip, cut out of the backdrop so that whoever
                       stands behind them is hidden; each with its footprint (a stool's entry says which: stool 'desk')
     foot(kind, stools)   every footprint of the room's own things, [x, y, w, h] (ROOMS[id].block)
     stoolCast(g, x, y, o)  the shadow a stool at x, y casts in the light of o.hour, for a stool the level draws
     STOOLS            the stools' names, ['desk', 'table', 'door']; their places are POS.stools
     POS               the one table of places, read by both variants (room pixels; feet at y)
     AT                where people stand or sit: door (the door's foot, where a visitor appears, facing left), seats (the three places
                       where the soldier can sit: door, table, window), desk (Paul's stool at the table), stand (where Paul stands
                       to talk with a visitor, and where a visitor stands before him)
     WALK              the walk strip [x0, x1, y0, y1]
     HOURS, KINDS      the hours and the two kinds
     PLACES, OTHER     two lodgings that do not fit, for the search in Chapter Twenty-Four: room(g, {kind:'garret'}) and room(g,
                       {kind:'small'}), at midday only, with light(kind), props(kind) and foot(kind) as above; PLACES[kind] holds each
                       one's WALK, POS and AT (door: the landlord at the door, facing in; luke and brother: the two visitors before him) */
SHARED.lodging=(()=>{
"use strict";
const WY=98,VX=168,HZ=76,WALK=[14,306,106,138];
const POS={
  win:{x0:80,x1:142,top:36,sill:84},              /* the flat's window */
  high:{x0:98,x1:124,top:18,sill:34},             /* the street room's small window, high in the wall */
  door:{x0:252,x1:278,top:46,b:WY},               /* the flat's door to the stair landing */
  wide:{x0:236,x1:302,top:38,b:WY},               /* the street room's doorway to the square */
  niche:{x0:189,x1:199,top:36,b:46},              /* the lamp's niche, a small square above head height */
  bed:{x0:8,x1:64,top:90,foot:103},
  benches:[{x0:72,x1:148,top:93,foot:102},{x0:158,x1:226,top:93,foot:102}],
  table:{x0:106,x1:160,top:101,back:95,foot:118,bfoot:112},
  stools:{desk:{x:94,y:121},table:{x:170,y:121},door:{x:238,y:114}},
  jar:{x0:304,x1:314,top:78,foot:103},
  peg:{x:166,y:52},                               /* a peg in the wall, a cloak hanging from it */
  basket:{x:86,y:102},
  shelf:{x0:14,x1:56,top:34,b:44}};               /* a long low recess in the wall above the bed, with a jug, a bowl and folded linen */                          /* a basket of rolls under the bench */
const AT={door:[266,108,-1],seats:{door:[238,114],table:[170,121],window:[138,102]},desk:[94,121,1],stand:{paul:[198,124,1],visitor:[246,118,-1]}};
const KINDS=['flat','street'];
/* the hours: the sky of shared/coast.js, where the sun stands for it (room pixels, outside the picture), the figures' shadow tip, the
   room's light handed to the figures, and a tone laid over the room; lane: how far the shade of the houses across the square reaches
   toward the street room's doorway (1: all the paving before it is in shade, no sun comes through the doorway) */
const HOURS={
  early:{sky:'morning',sp:[-190,52],sun:[30,11,.3],amb:'#f2d4bc',tone:['#ffb878',.34],lane:1},
  mid:{sky:'morning',sp:[-60,-10],sun:[15,9,.34],amb:'#f2e6da',tone:['#fff0d8',.1],lane:.45},
  noon:{sky:'midday',sp:[150,-140],sun:[3,7,.36],amb:'#f4eee6',tone:null,lane:.3},
  after:{sky:'midday',sp:[380,-20],sun:[-15,9,.34],amb:'#f2e6d6',tone:['#fff0d0',.1],lane:.45},
  eve:{sky:'evening',sp:[500,48],sun:[-30,11,.3],amb:'#f4ceac',tone:['#ff9850',.38],lane:1},
  night:{sky:'night',sp:null,sun:null,amb:'#4e4a64',tone:null,lane:1}};
const H_=h=>HOURS[h]||HOURS.noon;
const C={flat:'#e6d8bc',street:'#d8c8aa'},OCHRE='#94523a',SH='#181220';
const sh=(...a)=>SHARED.materials.shadow(...a);
/* one coast options object for each hour, kept, so that the light worked out on it is kept too */
const OS={};
function viewO(h){return OS[h]||(OS[h]={w:320,hz:HZ,hour:H_(h).sky,sun:H_(h).sp,moon:h==='night'?[60,8,.62]:undefined,cloud:.12,streak:.5,seed:2511,y1:POS.win.sill+1})}
/* the opening of a deep window or doorway as it is seen: its far edge drawn a little toward the vanishing point */
function opening(W,f){f=f||.06;return{x0:W.x0,x1:W.x1,top:W.top,sill:W.sill!=null?W.sill:W.b,ox0:W.x0+(VX-W.x0)*f,ox1:W.x1+(VX-W.x1)*f,otop:W.top+(HZ-W.top)*f,osill:(W.sill!=null?W.sill:W.b)+(HZ-(W.sill!=null?W.sill:W.b))*f}}

/* ---- the room ---- */
function room(g,o){if(o.kind==='garret')return garret(g);if(o.kind==='small')return small(g);const kind=o.kind==='street'?'street':'flat',h=o.hour||'noon',night=h==='night',r=rng(2501),M=SHARED.materials,ST=stoolsOf(o.stools);
  const A=kind==='flat'?opening(POS.win):opening(POS.high),D=kind==='street'?opening(POS.wide,.04):null;
  /* the view beyond the openings, painted over the whole picture; the room is painted round it */
  if(kind==='flat')roofs(g,h,A);else{highSky(g,h,A);lane(g,h,D)}
  g.save();g.beginPath();g.rect(-4,-4,328,152);g.rect(A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop);
  if(D&&!night)g.rect(D.x0,D.top,D.x1-D.x0,WY-D.top);g.clip('evenodd');
  walls(g,kind,r,night);
  M.ceiling(g,320,{U:8,x0:16,step:36,vx:VX,vy:HZ,r,boards:'#3a2a1e',joist:kind==='flat'?'#6e5232':'#5e4430',plate:'#7e5e3a'});
  if(kind==='flat')planks(g,r);else flags(g,r);
  quiet(g);
  ao(g,0,WY,320,5,'t',.3,'#3a2c30');R(g,0,WY-.4,320,.8,'rgba(60,44,50,.35)');
  g.restore();
  niche(g,POS.niche,kind);
  if(kind==='flat'){windowFrame(g,A,h,1);doorLeaf(g,POS.door,r)}
  else{windowFrame(g,A,h,0);doorway(g,D,h,r)}
  shelf(g,POS.shelf,kind,r);
  bed(g,POS.bed,h,r);
  for(const B of POS.benches)bench(g,B,h,r);
  table(g,POS.table,h,r);
  for(const k of ST)stoolShadow(g,POS.stools[k].x,POS.stools[k].y,h);
  jar(g,POS.jar,h);
  if(o.cloak===false)peg(g,POS.peg);else cloak(g,POS.peg,r);
  basket(g,POS.basket,h,r);
  shadeRoom(g,kind,h,A,D);
  if(!night)patch(g,kind,h,A,D);
  if(night)nightLight(g,kind,A);
  /* the stools last, in the light a figure standing there is given, so that each is the very stool custody.stool draws */
  for(const k of ST)stool(g,POS.stools[k],kind,h)}
/* which stools stand in the room: o.stools left out, all; false, none; an array of their names, those */
const STOOLS=['desk','table','door'];
function stoolsOf(s){return s==null||s===true?STOOLS:s===false?[]:STOOLS.filter(k=>s.indexOf(k)>=0)}

/* the walls: limewashed plaster; in the flat a socle of red ochre below the window's ledge, as the better rooms had it; in the street
   room older, rougher plaster, and damp along the foot */
function walls(g,kind,r,night){const M=SHARED.materials,c=C[kind];
  plaster(g,0,0,320,WY,c,r,{patch:0,cracks:0,t:kind==='street'?.42:.3,top:.03,bot:-.04,brick:'#a0603e',rubble:0});
  SHARED.temple.age(g,0,8,320,WY-8,rng(2506),kind==='street'?.55:.3);
  if(kind==='flat'){const t=86;R(g,0,t,320,WY-t,OCHRE);inRect(g,0,t,320,WY-t,()=>{tex(g,'mott',.5,0,t,320,WY-t,'overlay',1);tex(g,'blotch',.3,0,t,320,WY-t,'soft-light',1);
      for(let i=0;i<40;i++)R(g,r()*320,t+1+r()*(WY-t-2),1+r()*3,.5,r()<.5?'rgba(60,24,16,.25)':'rgba(255,220,190,.12)')});
    R(g,0,t-.6,320,.8,'#6a3424');R(g,0,t-1.2,320,.6,'rgba(255,246,226,.3)')}
  g.fillStyle=lg(g,0,WY-16,0,WY,['rgba(110,90,70,0)',kind==='street'?'rgba(90,76,60,.3)':'rgba(110,90,70,.14)']);g.fillRect(0,WY-16,320,16);
  for(const[x,y,n]of kind==='flat'?[[30,14,3],[226,13,4]]:[[30,14,4],[160,12,3],[214,14,3]])M.crack(g,x,y,n,r,.45)}
/* the flat's floor: planks laid across the room on the joists below, in courses that widen toward us; each board ends in a joint that
   stops inside its own course, and the joints of one course never meet those of the next */
function planks(g,r,wood){const n=8,y1=144,ys=[];for(let k=0;k<=n;k++)ys.push(WY+(y1-WY)*Math.pow(k/n,1.45));
  const X=(u,y)=>VX+u*(y-HZ)/(y1-HZ);
  R(g,-2,WY,324,y1-WY,'#3a2818');
  let prev=[];
  for(let k=0;k<n;k++){const a=ys[k],b=ys[k+1],gap=Math.min(.5,.2+(b-a)*.04),cur=[],near=6*(144-HZ)/(a-HZ);let u=-600-r()*60;
    while(X(u,a)<330){let len=90+r()*80;
      /* a joint never comes within a few pixels of a joint of the course behind it */
      for(let t=0;t<6&&prev.some(p=>Math.abs(p-(u+len))<near);t++)len+=near*1.2;cur.push(u+len);const c=tint(wood||'#8a6440',(r()-.5)*.22),P=[X(u,a)+gap,a+gap,X(u+len,a),a+gap,X(u+len,b),b,X(u,b)+gap,b];
      poly(g,P);g.fillStyle=lg(g,0,a,0,b,[tint(c,.1),c,tint(c,-.14)]);g.fill();
      clipTo(g,()=>poly(g,P),()=>{tex(g,'wood',.22,X(u,a)-4,a,X(u+len,b)-X(u,a)+8,b-a,'overlay',.5);
        for(let i=0;i<(b-a)*1.2;i++){const t=r(),yy=a+gap+t*(b-a-gap),x0=X(u+r()*len,yy),l=4+r()*18;R(g,x0,yy,l,.5,r()<.5?tint(c,-.18):tint(c,.12))}
        if(r()<.3){const t=r(),yy=a+(b-a)*(.3+t*.4),xx=X(u+len*(.2+r()*.6),yy);R(g,xx,yy-.3,1.2,.8,tint(c,-.35))}});
      R(g,X(u,a)+gap,a+gap,X(u+len,a)-X(u,a)-gap,.5,'rgba(255,230,190,.16)');
      u+=len}prev=cur}
  tex(g,'mott',.3,0,WY,320,y1-WY,'overlay',1);
  /* worn paler where people walk: from the door to the table */
  pool(g,214,122,90,14,'#e8d0a8',.12,'screen')}
/* where the soldier's long chain hangs from his hand to the floor at the seats by the door and at the table (custody.sit, facing either
   way), the level lines of the floor behind it (the joints between the courses of planks or flags) are softened, so that the chain does
   not stand across them as an upright over a level band (CONTRIBUTING section 3): the floor there is smoothed upward and downward,
   fading out to each side. By the window the chain falls behind his legs and the table hides it */
function quiet(g){const T=g.getTransform(),sx=T.a,sy=T.d;
  for(const k of['door','table'])for(const d of[-1,1]){const[x,y]=AT.seats[k],a=d<0?x-15.5:x+9,b=a+6.5,y0=Math.max(WY+1,y-16),y1=y+2.5;
    const X0=Math.round(sx*a+T.e),X1=Math.round(sx*b+T.e),Y0=Math.round(sy*y0+T.f),Y1=Math.round(sy*y1+T.f),w=X1-X0,h=Y1-Y0;if(w<2||h<4)continue;
    const im=g.getImageData(X0,Y0,w,h),D=im.data,O=D.slice(),K=Math.max(1,Math.round(sy*1.2));
    for(let i=0;i<w;i++){const u=Math.min(1,Math.min(i+.5,w-i-.5)/(w*.3));
      for(let j=0;j<h;j++){const v=Math.min(1,Math.min(j+.5,h-j-.5)/(sy*1.5)),f=u*v;if(f<=0)continue;let r=0,g2=0,b2=0,n=0;
        for(let t=-K;t<=K;t++){const jj=Math.min(h-1,Math.max(0,j+t)),q=(jj*w+i)*4;r+=O[q];g2+=O[q+1];b2+=O[q+2];n++}
        const q=(j*w+i)*4;D[q]=O[q]+(r/n-O[q])*f;D[q+1]=O[q+1]+(g2/n-O[q+1])*f;D[q+2]=O[q+2]+(b2/n-O[q+2])*f}}
    g.putImageData(im,X0,Y0)}}
/* the street room's floor: flags of grey stone in courses, worn */
function flags(g,r){pave(g,-2,WY,322,144,'#c4b89e',r,{vx:VX,vy:HZ,rows:5,step:40,v:.07,t:.34,rand:0});
  pool(g,250,112,70,12,'#e8dcc4',.1,'screen')}
/* the niche: a small square recess above head height, its floor a ledge of stone; a clay lamp in it, its nozzle to the right */
function niche(g,N,kind){const c=C[kind],w=N.x1-N.x0,h=N.b-N.top;
  R(g,N.x0,N.top,w,h,tint(c,-.45));ao(g,N.x0,N.top,w,4,'t',.45,'#1a1012');R(g,N.x0,N.top,1.2,h,tint(c,-.3));R(g,N.x1-.6,N.top,.6,h,tint(c,-.2));
  R(g,N.x0-.6,N.b,w+1.2,1.2,tint(c,.04));R(g,N.x0-.6,N.b,w+1.2,.5,'rgba(255,246,226,.5)');R(g,N.x0-.6,N.b+1.2,w+1.2,.5,'rgba(60,44,50,.35)');
  const lx=N.x0+w*.46,ly=N.b;poly(g,[lx-3.2,ly,lx+2.4,ly,lx+4.2,ly-1,lx+4.4,ly-1.8,lx+2.2,ly-1.6,lx+1.4,ly-2.4,lx-2.6,ly-2.4,lx-3.4,ly-1.4],'#9a5a36');
  R(g,lx-2.6,ly-2.4,4.2,.5,'#c88a5a');R(g,lx-.8,ly-2.2,1,.6,'#3a2014');R(g,lx+3.6,ly-1.9,.8,.5,'#2a1810');
  /* soot above it, faint, in a long low smear that stops at the niche's top */
  comp(g,'multiply',.18,()=>{g.fillStyle=lg(g,0,N.top-5,0,N.top,['rgba(40,30,30,0)','rgba(40,30,30,1)']);g.fillRect(N.x0+1,N.top-5,w-2,5)})}

/* ---- the openings ---- */
/* the window (or the high window) from inside: the left side of its opening, lit by the sky only; the lintel's underside; the ledge
   along its foot. The flat's window has two shutters of upright boards folded back flat against the wall on either side */
function windowFrame(g,A,h,shutters){const{x0,x1,top,sill,ox0,otop,osill}=A,c=C[shutters?'flat':'street'],night=h==='night',r=rng(2521);
  const RV=[x0,top,ox0,otop,ox0,osill,x0,sill];poly(g,RV);g.fillStyle=lg(g,x0,0,ox0,0,[tint(c,-.22),tint(c,-.1)]);g.fill();
  clipTo(g,()=>poly(g,RV),()=>tex(g,'mott',.4,x0,top,ox0-x0+1,sill-top,'overlay',1));
  stroke(g,[x0+.25,top,x0+.25,sill],night?'rgba(120,120,160,.3)':'rgba(255,246,226,.4)',.5);
  const SO=[x0,top,x1,top,x1,otop,ox0,otop];poly(g,SO,tint(c,-.3));clipTo(g,()=>poly(g,SO),()=>tex(g,'mott',.4,x0,top,x1-x0,otop-top+1,'overlay',1));
  R(g,ox0,otop-.4,x1-ox0,.5,'rgba(40,30,40,.3)');
  const lx0=x0-3,lx1=x1+3,ft=sill+2,fb=sill+4.4,TOP=[ox0,osill,x1,osill,x1,sill,lx1,sill,lx1,ft,lx0,ft,lx0,sill,x0,sill];
  ao(g,lx0,fb,lx1-lx0,3,'t',.3,'#2a1c24');
  poly(g,TOP);g.fillStyle=lg(g,0,osill,0,ft,night?['#8a8494','#7a7484']:['#f4e8cc','#e4d4b4']);g.fill();
  clipTo(g,()=>poly(g,TOP),()=>tex(g,'mott',.35,lx0,osill,lx1-lx0,ft-osill+1,'overlay',1));
  R(g,lx0,ft,lx1-lx0,fb-ft,tint(c,-.25));R(g,lx0,ft,lx1-lx0,.5,'rgba(255,244,220,.6)');tex(g,'mott',.3,lx0,ft,lx1-lx0,fb-ft,'overlay',1);
  R(g,lx0,fb-.5,lx1-lx0,.5,'rgba(50,36,44,.45)');
  if(!shutters)return;
  /* the shutters: each leaf as wide as half the opening is too much for the wall beside it, so each folds in two; we see the outer
     half lying flat on the wall, its upright boards, a little shade along the edge that stands off the wall */
  const sw=9,st=top+1,sb=sill-1;
  for(const[sx,d]of[[x0-4-sw,-1],[x1+4,1]]){comp(g,'multiply',.35,()=>R(g,sx+(d<0?-1.2:sw),st+1,1.2,sb-st,'#3a2c30'));
    for(let i=0;i<3;i++){const pw=sw/3,cc=tint('#7a5a3a',(r()-.5)*.14);SHARED.materials.plank(g,sx+i*pw,st,pw,sb-st,cc,r,1);if(i)R(g,sx+i*pw,st,.5,sb-st,'rgba(30,18,12,.45)')}
    R(g,sx,st,sw,.6,'rgba(255,230,190,.3)');R(g,sx,sb-.6,sw,.6,'rgba(30,18,12,.5)');R(g,d<0?sx:sx+sw-.6,st,.6,sb-st,'rgba(255,230,190,.25)');
    /* the pin it turns on, a small square of iron at its inner edge, top and bottom */
    for(const y of[st+3,sb-4])R(g,d<0?sx+sw-1:sx,y,1,1,'#2a2420')}}
/* the flat's door to the stair landing: a frame of dressed stone, a leaf of upright planks without any band across them, a small
   square pull; set back in the thickness of the wall, its right side showing in shade */
function doorLeaf(g,D,r){const M=SHARED.materials,c=C.flat,w=D.x1-D.x0,h=D.b-D.top,n=4,pw=w/n;
  SHARED.temple.stone(g,D.x0-4,D.top-5,w+8,5,rng(2523),{bh:5,bw:w+8,c:tint(c,.02),v:.05,age:.3});R(g,D.x0-4,D.top-5,w+8,.5,'rgba(255,246,226,.5)');R(g,D.x0-4,D.top-.5,w+8,.6,'rgba(50,36,40,.45)');
  for(const x of[D.x0-4,D.x1+1]){R(g,x,D.top,3,h,tint(c,-.02));tex(g,'mott',.35,x,D.top,3,h,'overlay',1);R(g,x,D.top,.5,h,'rgba(255,246,226,.4)');R(g,x+2.5,D.top,.5,h,'rgba(60,44,50,.3)')}
  for(let i=0;i<n;i++){M.plank(g,D.x0+i*pw,D.top,pw,h,['#6e5034','#664a30','#6c4e32','#62462c'][i],r,1);if(i)R(g,D.x0+i*pw,D.top,.5,h,'rgba(30,18,12,.5)');R(g,D.x0+i*pw+.5,D.top,.5,h,'rgba(200,160,110,.18)')}
  R(g,D.x0,D.top,2,h,'rgba(30,20,20,.4)');ao(g,D.x0,D.top,w,6,'t',.45,'#1a1012');
  R(g,D.x0+pw*.6,D.top+h*.52,1.6,1.6,'#2a1e16');R(g,D.x0+pw*.6,D.top+h*.52,1.6,.5,'#8a6a48');
  R(g,D.x0-1,D.b-1,w+2,1.4,tint(c,-.08));R(g,D.x0-1,D.b-1,w+2,.5,'rgba(255,246,226,.4)')}
/* the street room's doorway: two jambs of brick-faced masonry and a deep lintel of timber, the threshold a long stone with a groove
   for the boards that shut the doorway at night. By night the boards stand in it, upright, side by side */
function doorway(g,D,h,r){const M=SHARED.materials,night=h==='night',{x0,x1,top}=D,w=x1-x0;
  /* the jambs' faces toward the room are only their edges; the left jamb's side shows in the opening, toward the vanishing point */
  const LJ=[x0,top,D.ox0,D.otop,D.ox0,WY-.6,x0,WY];poly(g,LJ);g.fillStyle=lg(g,x0,0,D.ox0,0,['#9a7a62','#b49478']);g.fill();
  clipTo(g,()=>poly(g,LJ),()=>{tex(g,'mott',.45,x0,top,D.ox0-x0+1,WY-top,'overlay',1);for(let y=top+2;y<WY;y+=2.2)stroke(g,[x0,y,D.ox0,y+(HZ-y)*.04],'rgba(70,40,30,.35)',.4)});
  /* the lintel: a deep beam across the top of the opening, its underside in shade */
  M.board(g,x0-5,top-5,w+10,5,'#5e4430',r);R(g,x0-5,top-5,w+10,.5,'rgba(255,230,190,.3)');
  poly(g,[x0,top,x1,top,D.ox1,D.otop,D.ox0,D.otop],'#3e2c22');
  for(const x of[x0-5,x1])R(g,x,top,5,WY-top,'#a8886a');
  for(const[x,s]of[[x0-5,1],[x1,-1]])inRect(g,x,top,5,WY-top,()=>{tex(g,'mott',.4,x,top,5,WY-top,'overlay',1);
    /* the brick facing: courses whose joints stop inside them */
    for(let y=top+1.6,j=0;y<WY;y+=2.2,j++){R(g,x,y,5,.4,'rgba(80,50,36,.45)');R(g,x+(j%2?1.4:3.2),y+.4,.4,1.8,'rgba(80,50,36,.4)')}
    R(g,s>0?x:x+4.5,top,.5,WY-top,'rgba(255,240,220,.35)')});
  /* the threshold */
  R(g,x0-5,WY-1.4,w+10,2.4,'#b4a88e');R(g,x0-5,WY-1.4,w+10,.5,'#e4d8bc');R(g,x0,WY-.4,w,.5,'rgba(50,40,36,.55)');
  if(!night)return;
  /* the boards for the night: upright, each its own tone, their tops in the groove under the lintel */
  for(let x=x0,i=0;x<x1-.01;x+=6.6,i++){const pw=Math.min(6.6,x1-x);M.plank(g,x,top,pw,WY-top-.6,tint('#5e442c',(r()-.5)*.2),r,1);R(g,x,top,.5,WY-top,'rgba(20,12,8,.6)')}
  ao(g,x0,top,w,5,'t',.5,'#1a1012')}

/* ---- what is seen through the openings ---- */
/* the flat's window: the sky of the hour; a hill far off with a palace's long walls and a temple's pediment on it; the upper storeys
   of the tenements nearer, plastered, with rows of small dark windows and low tiled roofs; below the eyes the roofs of the lower
   houses across the street. Every building stands on the one horizon or rises from behind a nearer roof */
function roofs(g,h,A){const K=SHARED.coast,O=viewO(h),L=K.light(O),night=h==='night',r=rng(2531);
  K.light(O);K.sky(g,O);
  const x0=A.ox0-2,x1=A.x1+2,yb=A.osill+1.5;
  /* the hill: low and long, with the palace's long walls on it in pale blocks and, at the right of the gap between the tenements, a
     temple's front: a pediment on a deep beam over a row of columns, the whole no wider than ten pixels, in the haze */
  const hill=x=>HZ-6-5*Math.exp(-Math.pow((x-100)/20,2))-1.6*Math.sin(x/7);
  K.land(g,L,.72,q=>{const P=[x0,HZ+3];for(let x=x0;x<=x1;x+=.5)P.push(x,hill(x));P.push(x1,HZ+3);poly(q,P);q.fillStyle=lg(q,0,HZ-14,0,HZ,['#7a8a6a','#6a7a5c']);q.fill();
    clipTo(q,()=>poly(q,P),()=>{for(let i=0;i<60;i++)R(q,x0+r()*(x1-x0),HZ-14+r()*16,1+r()*2,.8,r()<.5?'rgba(40,60,40,.35)':'rgba(200,220,180,.2)')});
    for(const[bx,bw,bh,c]of[[86,10,4,'#e8dcc4'],[95,8,5.5,'#efe4cc'],[103,5,3.5,'#e0d2b8']]){const by=hill(bx+bw/2)+1;R(q,bx,by-bh,bw,bh,c);R(q,bx,by-bh,bw,.5,'#fff6e4');R(q,bx+bw-1,by-bh,1,bh,tint(c,-.2));
      for(let i=bx+1.5;i<bx+bw-1.5;i+=2.5)R(q,i,by-bh+1.4,.5,.8,'rgba(60,50,60,.45)')}
    const tx=106.5,tb=hill(111)+.8,tw=9;R(q,tx-.6,tb-.8,tw+1.2,.8,'#e4dac6');
    for(let i=0;i<5;i++)R(q,tx+.4+i*1.95,tb-4.6,.6,3.8,'#f2ead8');R(q,tx,tb-6,tw,1.4,'#f4ecdc');R(q,tx,tb-4.8,tw,.4,'rgba(60,50,60,.3)');
    poly(q,[tx-.4,tb-6,tx+tw+.4,tb-6,tx+tw/2,tb-8],'#ece2cc');poly(q,[tx+.8,tb-6.2,tx+tw-.8,tb-6.2,tx+tw/2,tb-7.6],'#d8ccb4')});
  /* the tenements nearer, rising above the eyes: plaster of ochre, pink and cream, a band of brick at each floor, small dark windows
     with their shutters, one with a wooden balcony on beam ends; a low hipped roof of red tiles on each, seen edge on */
  const lit=[];K.land(g,L,.3,q=>{
    for(const[x,w,t,c,bal]of[[81,14,58,'#d8b88e'],[95.5,7.5,68,'#e8d8bc'],[116.5,15,55,'#cfa486',1],[132,14,61,'#e2c8a8']]){const sd=x+w/2<VX?1:0,b=HZ+4;
      R(q,x,t,w,b-t,c);inRect(q,x,t,w,b-t,()=>{tex(q,'mott',.45,x,t,w,b-t,'overlay',1);
        for(let y=t+2.6,f=0;y<HZ;y+=5,f++){if(f)R(q,x,y-1.6,w,.8,'rgba(150,80,50,.45)');
          for(let wx=x+1.6+(f%2)*1.7;wx<x+w-1.8;wx+=3.4){R(q,wx,y,1.2,1.8,'#3a2c2c');if(r()<.35)R(q,wx+1.2,y,.6,1.8,'#7a5a3a');if(night&&r()<.22)lit.push([wx,y])}}
        R(q,sd?x+w-1.2:x,t,1.2,b-t,'rgba(70,50,60,.28)')});
      if(bal){const by=t+12.4;R(q,x-1,by,w+2,1,'#6a4a2e');R(q,x-1,by,w+2,.4,'#9a7650');for(let bx=x+.6;bx<x+w;bx+=3.4)R(q,bx,by+1,.8,.8,'#4a3020')}
      poly(q,[x-.8,t,x+w+.8,t,x+w*.7,t-2.4,x+w*.3,t-2.4],'#a05a3a');R(q,x+w*.3,t-2.4,w*.4,.5,'#c47a52');R(q,x-.8,t-.4,w+1.6,.5,'#c47a52');R(q,x-.8,t,w+1.6,.5,'rgba(40,24,20,.5)')}});
  /* the roofs below the eyes, across the street: two long slopes of red tiles seen from a little above, in courses that run along
     them, each with its ridge level along its top and its eave's shadow at its foot; the nearer, lower one at the right. Both reach
     down past the window's ledge */
  K.land(g,L,.06,q=>{for(const[a,b,y0,hip]of[[x0-4,116,HZ+1.4,1],[110,x1+4,HZ+3.6,0]]){const P=hip?[a,y0,b-5,y0,b,yb,a,yb]:[a,y0,b,y0,b,yb,a,yb];poly(q,P);q.fillStyle=lg(q,0,y0,0,yb,['#c07850','#9a5638']);q.fill();
      clipTo(q,()=>poly(q,P),()=>{tex(q,'mott',.5,a,y0,b-a,yb-y0,'overlay',1);for(let y=y0+1.3;y<yb;y+=1.4)R(q,a,y,b-a,.45,'rgba(80,36,24,.42)');
        for(let i=0;i<50;i++)R(q,a+r()*(b-a),y0+r()*(yb-y0),1+r()*2,.5,r()<.5?'rgba(255,210,170,.25)':'rgba(60,28,20,.3)');
        if(hip)comp(q,'multiply',.3,()=>poly(q,[b-5,y0,b,yb,b-7,yb],'#6a4050'))});
      R(q,a,y0-.4,(hip?b-5:b)-a,.9,'#d08a62');R(q,a,y0+.5,(hip?b-5:b)-a,.4,'rgba(60,30,24,.4)')}
    ao(q,x0,HZ+3.6,x1-x0,2,'t',.25,'#3a2028')});
  if(night){comp(g,'multiply',.25,()=>{g.fillStyle='#2a2848';g.fillRect(x0,0,x1-x0,yb)});
    /* a few windows lit by a lamp inside, small and square */
    for(const[wx,y]of lit){R(g,wx,y,1.2,1.8,'#e8a858');R(g,wx,y+.5,1.2,.6,'#ffd898')}}}
/* the street room's high window: only the sky, high up */
function highSky(g,h,A){const K=SHARED.coast,O=Object.assign({},viewO(h),{seed:2533});O.L=null;K.light(O);K.sky(g,O)}
/* the street room's doorway: the small square before it, the house front across it in its own shade (it faces north) with a shop's
   opening and a window, a public fountain's long, low basin at its foot fed from a spout in a block at the basin's right end, and the
   paving between, where the sun lies from our threshold to the shade of the houses (none early and late) */
function lane(g,h,D){const K=SHARED.coast,O=viewO(h),L=K.light(O),H=H_(h),night=h==='night',r=rng(2541);if(night)return;
  const{x0,x1,top}=D,F=82;
  inRect(g,x0,top,x1-x0,WY-top,()=>{
    /* the house front opposite: plaster, its ground floor with a shop opening shut by boards and a door, a band of brick above it */
    plaster(g,x0-2,top-2,x1-x0+4,F-top+2,'#d4b896',r,{patch:0,cracks:0,t:.45,brick:'#a0603e'});
    R(g,x0-2,57,x1-x0+4,2.6,'#a85e40');R(g,x0-2,57,x1-x0+4,.5,'rgba(255,220,190,.3)');
    for(let x=x0;x<x1;x+=3.4)R(g,x,57.6+((x/3.4|0)%2)*1,.4,1,'rgba(70,36,24,.4)');
    /* a window of the floor above, square, its shutter open against the wall */
    R(g,x0+10,42,8,9,'#3a2c2a');R(g,x0+18,42,4,9,'#7a5a3a');R(g,x0+10,51,8,.8,'#c8b090');
    /* the shop across the square: its boards stand in the opening at this hour, half of them taken away */
    R(g,x0+30,64,24,F-64,'#2e2420');for(let x=x0+42;x<x0+54;x+=4)SHARED.materials.plank(g,x,64,4,F-64,tint('#6a4c32',(r()-.5)*.2),r,1);
    SHARED.materials.board(g,x0+28,61.6,28,2.4,'#5a4030',r);
    /* a door at the left */
    R(g,x0+4,66,8,F-66,'#4a3424');R(g,x0+4,66,8,.6,'#2a1c14');
    /* the shade: the front faces north, so it is in shade at every hour, lit only by the sky and the paving */
    comp(g,'multiply',.32,()=>{g.fillStyle='#7a86b0';g.fillRect(x0,top,x1-x0,F-top)});
    /* the paving of the square, in perspective to the one horizon */
    pave(g,x0-2,F,x1+2,WY+.4,'#c8bca2',r,{vx:VX,vy:HZ,rows:3,step:36,v:.06,t:.34,rand:0});
    ao(g,x0,F,x1-x0,3,'t',.3,'#3a3048');
    /* the fountain: a long low basin of stone standing on the paving before the front, its water seen over its near rim; at its
       right end a block as wide as the basin is deep, with the spout in its face; the water runs from the spout into the basin */
    const b0=x0+4,b1=x0+36,bf=F+4.4,bt=bf-5,FT=bt-1.2;
    sh(g,(b0+b1)/2+2,bf,(b1-b0)/2+2,1.2,.5);
    poly(g,[b0+1,FT,b1-1,FT,b1,bt,b0,bt],'#b8ac94');R(g,b0+1.6,FT+.2,b1-b0-3.2,.8,'#5a6a80');R(g,b0+1.6,FT+.2,b1-b0-3.2,.4,'#a8b8cc');
    R(g,b0,bt,b1-b0,bf-bt,'#a49882');R(g,b0,bt,b1-b0,.5,'#d4c8b0');tex(g,'mott',.4,b0,bt,b1-b0,bf-bt,'overlay',1);R(g,b0,bf-.5,b1-b0,.5,'rgba(50,40,50,.4)');
    const k0=b1,k1=b1+6,kt=bt-7;R(g,k0,kt,k1-k0,bf-kt,'#a89c84');R(g,k0,kt,k1-k0,.6,'#d4c8b0');R(g,k1-.6,kt,.6,bf-kt,'rgba(60,50,60,.35)');tex(g,'mott',.4,k0,kt,k1-k0,bf-kt,'overlay',1);
    R(g,k0-1,kt+2.4,1.2,.8,'#6a6458');stroke(g,[k0-1,kt+3,k0-2.2,kt+3.6,k0-2.8,FT+.4],'rgba(220,232,240,.75)',.5);
    /* the sun on the paving: from our threshold back to the line of the houses' shade */
    const ys=F+(WY-F)*H.lane;comp(g,'multiply',.4,()=>{g.fillStyle='#8a90b4';g.fillRect(x0,F,x1-x0,ys-F)});
    if(H.lane<1){comp(g,'screen',.22,()=>{g.fillStyle=H.tone?H.tone[0]:'#fff4e0';g.fillRect(x0,ys,x1-x0,WY-ys)});R(g,x0,ys,x1-x0,.5,'rgba(255,240,210,.25)')}
    if(H.tone)comp(g,'soft-light',H.tone[1],()=>{g.fillStyle=H.tone[0];g.fillRect(x0,top,x1-x0,WY-top)})})}

/* ---- the light ---- */
/* the patch of sun on the floor: the opening projected along the sun of the hour (the patch of a point h above the floor lands h
   times the shadow's tip away from the wall's foot), soft at its edges, a faint glow in the air over it, and the light thrown back
   from the floor onto the wall's foot. In the street room also the doorway's patch, where the sun reaches it */
function patch(g,kind,h,A,D){const H=H_(h),[dx,dy]=H.sun,ux=dx/46,uy=dy/46,warm=h==='eve'||h==='early'?'rgba(255,200,140,1)':'rgba(255,238,204,1)';
  /* the patch on a level surface z above the floor: a point of the opening q above the floor lands (q - z) times the shadow's tip
     from the wall's foot, and the surface lies z higher in the picture */
  const one=(x0,x1,top,sill,k,z,air)=>{const P=(x,q)=>[x+(q-z)*ux,WY+(q-z)*uy-z],hs=WY-sill,ht=WY-top,Q=[...P(x0,hs),...P(x1,hs),...P(x1,ht),...P(x0,ht)];
    for(const[d,a]of[[3,.18],[1.6,.22],[0,.3]])comp(g,'soft-light',a*2*k,()=>poly(g,[Q[0]-d,Q[1]-d*.4,Q[2]+d,Q[3]-d*.4,Q[4]+d,Q[5]+d*.6,Q[6]-d,Q[7]+d*.6],warm));
    comp(g,'screen',.42*k,()=>poly(g,Q,warm));
    if(!air)return;
    comp(g,'screen',.05*k,()=>{poly(g,[x0,top,x1,top,Q[4],Q[5],Q[6],Q[7]]);g.fillStyle=lg(g,0,top,0,Q[5],[warm,'rgba(255,236,200,.1)']);g.fill()});
    pool(g,(Q[0]+Q[4])/2,(Q[1]+Q[5])/2,(x1-x0)*.8,8,'#fff0d8',.07*k,'screen')};
  const all=(z,air)=>{one(A.x0,A.x1,A.top,A.sill,kind==='flat'?1:.8,z,air);if(D&&H.lane<1)one(D.x0,D.x1,D.top,WY,1-H.lane*.6,z,air)};
  /* on the floor, but not on what stands in front of it */
  g.save();g.beginPath();g.rect(-4,WY,328,60);front(g);g.clip('evenodd');all(0,1);g.restore();
  /* on the table's top and the benches' seats, where the light reaches them at their own height (the stools are painted after, in the
     light of a figure standing there: see stool) */
  const T=POS.table;clipTo(g,()=>poly(g,[T.x0+3,T.back,T.x1-3,T.back,T.x1,T.top,T.x0,T.top]),()=>all(T.foot-T.top,0));
  for(const B of POS.benches)inRect(g,B.x0,B.top-1.2,B.x1-B.x0,1.4,()=>all(B.foot-B.top,0));
  comp(g,'soft-light',.3,()=>{g.fillStyle=lg(g,0,WY,0,WY-24,[warm,'rgba(255,220,170,0)']);g.fillRect(kind==='flat'?A.x0-20:D.x0-20,WY-24,90,24)})}
/* the outlines of what stands out on the floor in front of the patch of sun (the table, the basket), added to the path being built, so
   that the patch is left off them (the stools are painted after the patch: see stool) */
function front(g){const T=POS.table;g.moveTo(T.x0+3,T.back);g.lineTo(T.x1-3,T.back);g.lineTo(T.x1,T.top);g.lineTo(T.x1,T.foot);g.lineTo(T.x0,T.foot);g.lineTo(T.x0,T.top);g.closePath();
  const B=POS.basket;g.rect(B.x-6.4,B.y-12,12.8,12)}
/* the room's own light by day: indoors, darker than the day outside; lighter on the side of the opening that lets the most in (the
   flat's window, the street room's doorway), darker toward the corners and the ceiling; the hour's tone over all. Not over what is
   seen through the openings */
function shadeRoom(g,kind,h,A,D){const H=H_(h),night=h==='night';if(night)return;
  const lx=kind==='flat'?(A.x0+A.x1)/2:(D.x0+D.x1)/2;
  g.save();g.beginPath();g.rect(-4,-4,328,152);g.rect(A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop);if(D)g.rect(D.x0,D.top,D.x1-D.x0,WY-D.top);g.clip('evenodd');
  shade(g,[0,0,320,0,320,144,0,144],'#b4a4a8',kind==='flat'?.46:.52);
  comp(g,'multiply',kind==='flat'?.55:.7,()=>{g.fillStyle=rg(g,lx,92,kind==='flat'?250:290,['#ffffff','#e4d6d2','#9c8aa8','#6e6080']);g.fillRect(0,0,320,144)});
  /* the opening itself throws light on the wall round it and on the floor before it */
  comp(g,'screen',.12,()=>{g.fillStyle=rg(g,lx,WY+6,90,['#fff0dc','rgba(255,240,220,0)']);g.fillRect(0,0,320,144)});
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,0,0,WY,['#8a7a98','#e8dcd8','#ffffff']);g.fillRect(0,0,320,WY)});
  if(H.tone)comp(g,'soft-light',H.tone[1],()=>{g.fillStyle=H.tone[0];g.fillRect(0,0,320,144)});
  g.restore()}
/* the night: the lamp in its niche. Its light falls outward and downward from the opening (nicheLight), long and low on the wall
   below it and on the floor; the window keeps the cold of the night sky; the corners go dark */
function nightLight(g,kind,A){const N=POS.niche,nx=(N.x0+N.x1)/2,ny=N.b;
  lightmap(g,320,'#3e3a56',l=>{nicheLight(l,nx,ny,64,18,'#ffb868',.72);pool(l,nx,108,120,30,'#ffb060',.55);pool(l,nx-30,122,150,22,'#ffb060',.3);
    pool(l,nx,ny+12,58,6,'#ffc070',.18);
    poly(l,[A.ox0,A.otop,A.x1,A.otop,A.x1,A.osill,A.ox0,A.osill],'#d8dcf0');pool(l,(A.x0+A.x1)/2,(A.top+A.sill)/2,60,24,'#5a66a0',.3);
    l.fillStyle=lg(l,0,0,0,18,['rgba(10,8,16,.5)','rgba(10,8,16,0)']);l.fillRect(0,0,320,18);
    ao(l,0,0,40,144,'l',.35,'#0a0810');ao(l,280,0,40,144,'r',.3,'#0a0810')})}
function light(kind,h){const H=H_(h);if(LIGHT2[kind])return Object.assign({},LIGHT2[kind],{sun:LIGHT2[kind].sun.slice()});
  if(h==='night'){const N=POS.niche,nx=(N.x0+N.x1)/2,
      wall=kind==='flat'?[[0,POS.win.x0-3,WY,10],[POS.win.x1+3,POS.door.x0-4,WY,10],[POS.door.x1+4,320,WY,10]]:[[0,320,WY,10]];
    return{amb:H.amb,wallY:WY,wall,lamps:[[nx,92,120,'#7a5220',WY,POS.niche.b-1]]}}
  return{amb:H.amb,sun:H.sun.slice(),wallY:WY}}

/* ---- the things in the room ---- */
/* the sun's direction for the shadows of things: the hour's shadow tip, as for a figure 46 tall; at night the lamp's, short and soft */
function sunU(h){const H=H_(h);return H.sun?[H.sun[0]/46,H.sun[1]/46,.3]:[.12,.08,.16]}
/* a thing's cast shadow on the floor: the outline of its foot, carried along the light as far as it is high */
function cast(g,x0,x1,y,hh,h,d){const[ux,uy,a]=sunU(h);d=d||0;comp(g,'multiply',a,()=>poly(g,[x0,y-d,x1,y-d,x1+hh*ux,y-d+hh*uy*.6,x0+hh*ux,y-d+hh*uy*.6],'#5a4a66'))}
/* the bed along the back wall at the left: a frame of wood on four legs, two at each end and none under its middle; a straw mattress
   under a cover of grey-green wool with an ochre stripe along its edge, a fold of it hanging over the near side; a pillow at the end by
   the wall's corner */
function bed(g,B,h,r){const M=SHARED.materials,W='#6a4a2e',lit='#9a6e44',len=B.x1-B.x0,mb=B.top+5,rb=mb+3;
  cast(g,B.x0+1,B.x1,B.foot-1,B.foot-B.top,h);sh(g,(B.x0+B.x1)/2+1,B.foot-.8,len/2,1.6,.5);
  for(const x of[B.x0+2.6,B.x1-1.2])R(g,x,rb,1.6,B.foot-2.6-rb,tint(W,-.35));
  for(const[x,d]of[[B.x0+.2,-1],[B.x1-2.4,1]]){R(g,x,rb,2.2,B.foot-rb,d<0?tint(W,-.1):lit);R(g,x,B.foot-.6,2.2,.6,'#24160c');sh(g,x+1.1,B.foot,2,.6,.5)}
  M.board(g,B.x0,mb,len,rb-mb,W,r);R(g,B.x0,mb,len,.5,lit);
  /* the mattress and the cover over it: soft, a little uneven, the cover hanging a hand's breadth over the frame toward us */
  const mt=x=>B.top+.4*Math.sin((x-B.x0)/9)+.3*Math.sin((x-B.x0)/3.7),a=B.x0+.8,b=B.x1-.6,cv='#6e7462',P=[a,mb+1.6,a-.2,B.top+1.4,a+.8,B.top+.2];
  for(let x=a+2;x<=b-2;x+=1)P.push(x,mt(x));P.push(b-.6,B.top+.4,b+.2,B.top+1.6,b+.2,mb+1.8);for(let x=b-2;x>=a+2;x-=2)P.push(x,mb+1.8+.3*Math.sin(x*.9));
  poly(g,P);g.fillStyle=lg(g,0,B.top,0,mb+2,[tint(cv,.16),cv,tint(cv,-.3)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.45,a,B.top-1,len,9,'overlay',1);
    R(g,a,mb-.2,b-a,.9,'#b08a4a');R(g,a,mb+.7,b-a,.4,'rgba(60,40,30,.3)');
    for(let i=0;i<24;i++)R(g,a+r()*(b-a),B.top+.6+r()*4,1+r()*2.4,.5,r()<.5?'rgba(40,46,36,.3)':'rgba(230,236,210,.18)');
    R(g,a,mb+1.2,b-a,.8,'rgba(30,26,24,.35)')});
  /* the pillow: a soft bolster of linen at the left end */
  const p0=B.x0+1.4,p1=B.x0+12,PP=[p0,B.top+.6,p0+.6,B.top-1.6,p0+3,B.top-2.4,p1-2,B.top-2.2,p1,B.top-1,p1+.4,B.top+.8];poly(g,PP);g.fillStyle=lg(g,0,B.top-2.4,0,B.top+1,['#ece2cc','#b8aa8c']);g.fill();
  clipTo(g,()=>poly(g,PP),()=>tex(g,'mott',.35,p0,B.top-3,p1-p0+1,4,'overlay',1))}
/* a bench along the back wall: a thick plank on two legs, one at each end, set in a little from the ends; none under its middle */
function bench(g,B,h,r){const M=SHARED.materials,W='#6e5034',t=B.top,th=2.2;
  cast(g,B.x0,B.x1,B.foot,B.foot-B.top,h,.3);sh(g,(B.x0+B.x1)/2,B.foot-.5,(B.x1-B.x0)/2,1.2,.45);
  for(const x of[B.x0+4.6,B.x1-6.2])R(g,x,t+th,1.4,B.foot-1.6-t-th,tint(W,-.45));
  for(const x of[B.x0+3,B.x1-5.4]){R(g,x,t+th,2.4,B.foot-t-th,tint(W,-.15));R(g,x,t+th,.5,B.foot-t-th,'rgba(255,220,170,.2)');R(g,x,B.foot-.5,2.4,.5,'#24160c');sh(g,x+1.2,B.foot,1.4,.5,.4)}
  /* the seat: its top seen a little from above, its front edge */
  poly(g,[B.x0+1,t-1.2,B.x1-1,t-1.2,B.x1,t,B.x0,t],tint(W,.18));M.board(g,B.x0,t,B.x1-B.x0,th,W,r);R(g,B.x0,t-1.2,B.x1-B.x0,.5,'rgba(255,230,190,.25)')}
/* the table: a plain table of wood standing free in the room, its top seen from a little above; legs only at its four corners, the far
   ones up and in from the near; on it a sheet of papyrus cut from a roll, a reed pen beside it and a squat inkwell of clay with a small
   square hole */
function table(g,T,h,r){const M=SHARED.materials,W='#7a5838',lit='#a47a50',ap=2.2,ft=T.foot,bf=T.bfoot,f0=T.x0,f1=T.x1,b0=T.x0+3,b1=T.x1-3;
  cast(g,f0,f1,ft,ft-T.top,h,1.5);sh(g,(f0+f1)/2,ft-2,(f1-f0)/2+2,3,.42);
  /* the floor under it, in its shade */
  comp(g,'multiply',.6,()=>{g.fillStyle=lg(g,0,T.back,0,ft,['#5a4a62','#8a7a88']);poly(g,[b0,T.back,b1,T.back,f1,ft-.5,f0,ft-.5]);g.fill()});
  /* the far legs, then the near legs */
  for(const x of[b0+.6,b1-2])R(g,x,T.back+1,1.6,bf-T.back-1,tint(W,-.4));
  const top=[b0,T.back,b1,T.back,f1,T.top,f0,T.top];poly(g,top);g.fillStyle=lg(g,0,T.back,0,T.top,[tint(W,.12),tint(W,.24)]);g.fill();
  clipTo(g,()=>poly(g,top),()=>{tex(g,'wood',.3,f0,T.back,f1-f0,T.top-T.back,'overlay',.5);for(let i=0;i<14;i++){const y=T.back+r()*(T.top-T.back);R(g,f0+r()*(f1-f0-8),y,4+r()*10,.5,r()<.5?tint(W,-.1):tint(W,.3))}});
  M.board(g,f0,T.top,f1-f0,ap,W,r);R(g,f0,T.top,f1-f0,.5,lit);ao(g,f0,T.top+ap,f1-f0,3,'t',.35,'#1a1210');
  for(const x of[f0+.4,f1-2.6]){R(g,x,T.top+ap,2.2,ft-T.top-ap,tint(W,-.12));R(g,x,T.top+ap,.5,ft-T.top-ap,'rgba(255,220,170,.22)');R(g,x,ft-.5,2.2,.5,'#24160c');sh(g,x+1.1,ft,1.4,.5,.4)}
  /* the papyrus: a sheet with its fibers running across, a little turned, a few lines written on its upper part; at the table's left
     end, where the writing hand of one seated on the desk stool lies on it */
  const sx=f0+2,sy=T.back+1,S=[sx+.6,sy,sx+15,sy-.2,sx+15.8,T.top-1.2,sx,T.top-1];poly(g,S,'#e6d6a8');
  clipTo(g,()=>poly(g,S),()=>{for(let y=sy;y<T.top;y+=.5)R(g,sx-1,y,18,.5,(y*2|0)%2?'rgba(170,140,80,.18)':'rgba(255,248,220,.15)');
    for(let k=0;k<3;k++){let x=sx+2;const y=sy+1+k*1.3;while(x<sx+13-k*2){const l=1+r()*2.4;R(g,x,y,l,.5,'rgba(40,30,30,.55)');x+=l+.8}}});
  R(g,sx,T.top-1.2,15.8,.4,'rgba(80,60,40,.35)');
  /* the reed pen, lying slanted beyond the inkwell, its cut point toward the sheet */
  stroke(g,[sx+24.6,T.top-1.4,sx+32.6,sy+.6],'#b49a5a',.6);R(g,sx+24.2,T.top-1.6,.6,.6,'#2a2014');
  /* the inkwell: squat, round in its body, its top flat with a small square hole; beside the sheet, in reach of the writing hand */
  const ix=sx+19.4,iy=T.top-2.2;poly(g,[ix-2.4,iy+1.6,ix-2.6,iy,ix-2,iy-1.2,ix+2,iy-1.2,ix+2.6,iy,ix+2.4,iy+1.6],'#6a3c26');
  R(g,ix-2,iy-1.6,4,.8,'#8a5434');R(g,ix-.5,iy-1.6,1,.5,'#120a08');R(g,ix-2.4,iy-.2,1,1.2,'rgba(255,210,170,.3)');sh(g,ix+.6,iy+1.6,3,.6,.4)}
/* a stool: a small square seat on four legs at its corners, as high as a seated man's hips (9 room pixels: SEATG). It is the stool that
   SHARED.cast.custody.stool draws for one the level moves, line for line: the same size, the same plain wood, and the same light, the
   light the engine gives a figure standing there (lightAt over this room's light()), so that nobody sees a difference when the level
   takes one out of the backdrop (room's o.stools) and draws it elsewhere. Keep the two alike. Its shadows are painted on the floor
   under the room's own light, before it (stoolShadow) */
function stool(g,S,kind,h){const Wd='#6a4c30',x=S.x,y=S.y,hw=5,t=y-9,lit=litAt(kind,h,x,y),col=c=>unfinish(lit2(c,lit));
  for(const lx of[x-hw+1.6,x+hw-2.6])R(g,lx,t+1,1,y-2-t,col(tint(Wd,-.45)));
  poly(g,[x-hw+1,t-1.6,x+hw-1,t-1.6,x+hw,t,x-hw,t],col(tint(Wd,.22)));R(g,x-hw,t,hw*2,1.6,col(Wd));R(g,x-hw,t,hw*2,.5,col(tint(Wd,.12)));
  for(const lx of[x-hw+.2,x+hw-1.8]){R(g,lx,t+1.6,1.6,y-t-1.6,col(tint(Wd,-.12)));R(g,lx,y-.5,1.6,.5,unfinish('#24160c'))}}
/* the engine finishes every backdrop (index.html finish): a little more color and contrast, and the dither. A drawn stool is not
   finished, so the painted one is given the color that comes out of finish as the drawn one's */
function unfinish(c){const[r,g,b]=hex(c),mT=r*.3+g*.59+b*.11,m=(mT-128)/1.07+128;return toHex(...[r,g,b].map(T=>m+((T-128)/1.07+128-m)/1.14))}
/* a stool's shadows on the floor: the one it casts in the light of the hour, and its contact shadow. A level that draws a moved stool
   with custody.stool (which gives it its contact shadow) calls stoolCast for the cast one, in its draw, before the stool */
function stoolShadow(g,x,y,h){cast(g,x-5,x+5,y,9,h,.4);sh(g,x,y-.6,6,1.2,.45)}
function stoolCast(g,x,y,o){cast(g,x-5,x+5,y,9,(o&&o.hour)||'noon',.4)}
/* the light the engine gives a figure at x, y in this room (index.html lightAt, over light(kind, hour)), and a color in it */
function litAt(kind,h,x,y){const L=light(kind,h);let[r,g,b]=hex(L.amb||'#ffffff');
  for(const[lx,ly,lr,c]of L.lamps||[]){const d=Math.hypot(x-lx,(y-22-ly)*1.5)/lr;if(d<1){const k=(1-d)*(1-d),q=hex(c);r+=q[0]*k;g+=q[1]*k;b+=q[2]*k}}
  return r>=254&&g>=254&&b>=254?null:toHex(r,g,b)}
const lit2=(c,l)=>{if(!l)return c;const a=hex(c),b=hex(l);return toHex(a[0]*b[0]/255,a[1]*b[1]/255,a[2]*b[2]/255)};
/* the water jar: plain red clay, its body swelling below a short neck, its mouth a small square */
function jar(g,J,h){const cx=(J.x0+J.x1)/2,hw=(J.x1-J.x0)/2,hh=J.foot-J.top;
  cast(g,cx-2.6,cx+2.6,J.foot,hh,h);sh(g,cx+.6,J.foot,hw*.9,.9,.55);
  const wf=t=>t<.12?1.6:t<.22?1.6+(t-.12)/.1*1.4:t<.6?3+Math.sin((t-.22)/.38*Math.PI*.5)*(hw-3):t<.94?hw-(t-.6)/.34*(hw-2.4):2.4,L=[],Rr=[];
  for(let i=0;i<=30;i++){const t=i/30,w=wf(t),y=J.top+1.2+t*(hh-1.2);L.push(cx-w,y);Rr.unshift(cx+w,y)}
  const B=L.concat(Rr);poly(g,B);g.fillStyle=lg(g,cx-hw,0,cx+hw,0,['#c48c5c','#a86c42','#80492c','#542e1a']);g.fill();
  clipTo(g,()=>poly(g,B),()=>{tex(g,'mott',.35,cx-hw,J.top,hw*2,hh,'overlay',1);R(g,cx-hw*.55,J.top+hh*.35,.6,hh*.4,'rgba(255,226,190,.4)');ao(g,cx-hw,J.foot-3,hw*2,3,'b',.35,'#2a1610')});
  R(g,cx-2,J.top,4,1.6,'#c08a5a');R(g,cx-2,J.top,4,.5,'#e8b88a');R(g,cx-1.4,J.top+.5,2.8,.7,'#2a1610')}

/* a long low recess in the wall above the bed, square-cornered, its floor a ledge of stone: a jug, a bowl and a folded cloth in it */
function shelf(g,S,kind,r){const c=C[kind],w=S.x1-S.x0,h=S.b-S.top;
  R(g,S.x0,S.top,w,h,tint(c,-.42));ao(g,S.x0,S.top,w,4,'t',.4,'#1a1012');R(g,S.x0,S.top,1.4,h,tint(c,-.28));R(g,S.x1-.6,S.top,.6,h,tint(c,-.18));
  R(g,S.x0-.6,S.b,w+1.2,1.2,tint(c,.04));R(g,S.x0-.6,S.b,w+1.2,.5,'rgba(255,246,226,.5)');R(g,S.x0-.6,S.b+1.2,w+1.2,.5,'rgba(60,44,50,.35)');
  vessel(g,S.x0+8,S.b,3.2,7,'#9a5a36','jug',{noShadow:1});
  /* a shallow bowl, low and wide, its rim a flat ellipse no thinner than two pixels */
  poly(g,[S.x0+15,S.b-2.6,S.x0+24,S.b-2.6,S.x0+22.6,S.b,S.x0+16.4,S.b],'#b07a4a');R(g,S.x0+15,S.b-2.6,9,.8,'#d8a070');R(g,S.x0+16,S.b-2.2,7,.5,'#5a3020');
  /* the folded cloth: three soft layers of linen */
  for(let j=0;j<3;j++){const y=S.b-1.4-j*1.3;R(g,S.x0+28+j*.3,y,12-j*.6,1.3,tint('#d8ccb0',-j*.06));R(g,S.x0+28+j*.3,y,12-j*.6,.4,'rgba(255,250,236,.4)')}}
/* a cloak of brown wool hanging from a square peg in the wall: gathered over it, falling straight in a few folds, its hem a little uneven */
function cloak(g,Pg,r){const{x,y}=Pg,c='#6e4a2e',P=[x-1.4,y,x+1.4,y,x+4.4,y+2.6,x+5,y+12,x+5.8,y+24.2,x+3.2,y+25,x+.6,y+24.2,x-2.2,y+25.2,x-5.2,y+24.6,x-5.2,y+12,x-4.6,y+2.8];
  comp(g,'multiply',.25,()=>poly(g,P.map((v,i)=>i%2?v+.6:v+1.4),'#4a3a50'));
  poly(g,P);g.fillStyle=lg(g,x-6,0,x+6,0,[tint(c,-.1),tint(c,.14),tint(c,-.05),tint(c,-.3)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.45,x-6,y,12,26,'overlay',1);for(const[fx,a]of[[-2.6,.35],[.4,.3],[2.8,.4]])stroke(g,[x+fx*.5,y+3,x+fx,y+14,x+fx*1.1,y+25],rgba(tint(c,-.5),a),.6);
    for(const fx of[-1.6,1.4])stroke(g,[x+fx*.5,y+3,x+fx,y+14,x+fx,y+24],rgba(tint(c,.35),.3),.5)});
  peg(g,Pg)}
/* the peg alone, a small square block of wood, once the cloak has been taken from it (o.cloak false: the morning after Acts) */
function peg(g,Pg){const{x,y}=Pg;R(g,x-1,y-1.2,2,1.4,'#4a3020');R(g,x-1,y-1.2,2,.5,'#8a6440')}
/* a basket of wicker under the bench, upright, with rolls standing in it: their tops are small squares of pale papyrus */
function basket(g,B,h,r){const{x,y}=B,w=6,hh=7;sh(g,x+.5,y-.3,w+1,1,.5);
  for(const[dx,dh]of[[-3.4,2.2],[-1,3.2],[1.4,2.6],[3.6,1.8]]){R(g,x+dx-.9,y-hh-dh,1.8,dh+1,'#d8c89c');R(g,x+dx-.9,y-hh-dh,1.8,.8,'#f4e8c4');R(g,x+dx+.5,y-hh-dh,.4,dh+1,'rgba(90,70,40,.35)')}
  const P=[x-w,y-hh,x+w,y-hh,x+w-.6,y,x-w+.6,y];poly(g,P,'#9a7a48');
  clipTo(g,()=>poly(g,P),()=>{for(let yy=y-hh+.6;yy<y;yy+=1.1)R(g,x-w,yy,w*2,.5,'rgba(60,40,20,.35)');tex(g,'mott',.4,x-w,y-hh,w*2,hh,'overlay',1);
    g.fillStyle=lg(g,x-w,0,x+w,0,['rgba(255,230,180,.2)','rgba(0,0,0,0)','rgba(30,20,20,.3)']);g.fillRect(x-w,y-hh,w*2,hh)});
  R(g,x-w-.3,y-hh-.4,w*2+.6,.9,'#b8945a')}
/* ---- two lodgings that do not fit (Chapter Twenty-Four: the search) ---- */
/* Luke and a brother of Rome look at four lodgings: the two above fit, and these two do not. They are smaller, plainer pictures in the
   same manner and from the same viewpoint (the same horizon, vanishing point and foot of the back wall), at midday only:
     'garret'  a room under the roof, three flights up: the roof comes down to the left over it, its rafters running with the slope, one
               way only, and a low wall at the left where the pallet lies on the bare boards; one small square window with sky; at the
               right a doorway without its leaf (it stands open outward) on the head of a steep stair: the landing, the well going
               down beside it with its top steps, and the rail on its post. It is roomy enough: what is wrong with it is the stairs
     'small'   a clean, decent room at street level, simply too small: the side walls close in on either hand; one short bench, a
               stool, a small table, a small window high in the wall and the door to the street, its leaf standing open into the room.
               No more than four could sit in it
   Each has its own table of places (PLACES[kind]: WALK, POS, AT with door, where the landlord stands at the door facing in, and luke
   and brother, where the two visitors stand before him); room(), light(), props() and foot() take the kind as for the other two. */
const GCL=x=>66-.1875*x;                          /* the garret: where the underside of its roof meets the back wall */
const BOX={x0:92,x1:228,top:30};                  /* the small room: its back wall; its side walls and ceiling run from these edges toward us */
const PLACES={
  garret:{WALK:[44,300,106,138],
    POS:{door:{x0:270,x1:294,top:48,b:WY},win:{x0:186,x1:200,top:44,sill:58},pallet:{x0:14,x1:72,top:101,foot:109},jug:{x:84,y:103},landing:282},
    AT:{door:[262,108,-1],luke:[234,116,1],brother:[212,124,1]}},
  small:{WALK:[72,242,106,136],
    POS:{door:{x0:194,x1:218,top:46,b:WY},high:{x0:122,x1:144,top:38,sill:50},bench:{x0:98,x1:140,top:93,foot:102},
      table:{x0:96,x1:122,top:110,back:105,foot:122,bfoot:117},stool:{x:134,y:126},leaf:{x:218,near:233}},
    AT:{door:[206,108,-1],luke:[180,116,1],brother:[158,124,1]}}};
const LIGHT2={garret:{amb:'#eadfd4',sun:[3,7,.3],wallY:WY},small:{amb:'#f2e8dc',sun:[3,7,.34],wallY:WY}};
/* the room's own light by day: indoors, lighter round the opening that lets the most in, darker toward the corners and the ceiling */
function shadeAround(g,lx,rad,a,holes){g.save();g.beginPath();g.rect(-4,-4,328,152);for(const h of holes)g.rect(...h);g.clip('evenodd');
  shade(g,[0,0,320,0,320,144,0,144],'#b4a4a8',.48);
  comp(g,'multiply',a,()=>{g.fillStyle=rg(g,lx,92,rad,['#ffffff','#e4d6d2','#9c8aa8','#6e6080']);g.fillRect(0,0,320,144)});
  comp(g,'screen',.12,()=>{g.fillStyle=rg(g,lx,WY+6,80,['#fff0dc','rgba(255,240,220,0)']);g.fillRect(0,0,320,144)});
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,0,0,WY,['#8a7a98','#e8dcd8','#ffffff']);g.fillRect(0,0,320,WY)});g.restore()}
/* the patch of midday sun that an opening throws on the floor (as patch above), and a faint shaft of it in the air */
function sunIn(g,ops,front){const[dx,dy]=H_('noon').sun,ux=dx/46,uy=dy/46,warm='rgba(255,238,204,1)';
  for(const[x0,x1,top,sill,k]of ops){const P=(x,q)=>[x+q*ux,WY+q*uy],Q=[...P(x0,WY-sill),...P(x1,WY-sill),...P(x1,WY-top),...P(x0,WY-top)];
    g.save();g.beginPath();g.rect(-4,WY,328,60);if(front)front(g);g.clip('evenodd');
    for(const[d,a]of[[3,.18],[1.6,.22],[0,.3]])comp(g,'soft-light',a*2*k,()=>poly(g,[Q[0]-d,Q[1]-d*.4,Q[2]+d,Q[3]-d*.4,Q[4]+d,Q[5]+d*.6,Q[6]-d,Q[7]+d*.6],warm));
    comp(g,'screen',.42*k,()=>poly(g,Q,warm));g.restore();
    comp(g,'screen',.05*k,()=>{poly(g,[x0,top,x1,top,Q[4],Q[5],Q[6],Q[7]]);g.fillStyle=lg(g,0,top,0,Q[5],[warm,'rgba(255,236,200,.1)']);g.fill()})}}

/* the garret */
function garret(g){const r=rng(2561),M=SHARED.materials,P=PLACES.garret.POS,D=P.door,A=opening(P.win,.08);
  const O=Object.assign({},viewO('noon'),{seed:2563,y1:A.osill+1});O.L=null;SHARED.coast.light(O);SHARED.coast.sky(g,O);
  stairHead(g,D,P.landing,r);
  g.save();g.beginPath();g.rect(-4,-4,328,152);g.rect(A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop);g.rect(D.x0,D.top,D.x1-D.x0,WY-D.top);g.clip('evenodd');
  /* the back wall: old limewash, plain, stained under the roof */
  plaster(g,0,0,320,WY,'#d6c6a8',r,{patch:0,cracks:0,t:.45,top:.02,bot:-.06,brick:'#a0603e',rubble:0});
  SHARED.temple.age(g,0,4,320,WY-4,rng(2566),.5);
  g.fillStyle=lg(g,0,WY-14,0,WY,['rgba(110,90,70,0)','rgba(110,90,70,.18)']);g.fillRect(0,WY-14,320,14);
  for(const[x,y,n]of[[40,62,3],[236,30,4],[120,50,3]])M.crack(g,x,y,n,r,.45);
  roof(g,r);
  planks(g,r,'#7e6a52');
  ao(g,0,WY,320,5,'t',.3,'#3a2c30');R(g,0,WY-.4,320,.8,'rgba(60,44,50,.35)');
  g.restore();
  windowFrame(g,A,'noon',0);
  doorFrame(g,D,r);
  pallet(g,P.pallet,r);
  vessel(g,P.jug.x,P.jug.y,3,6.4,'#9a5a36','jug',{noShadow:1});sh(g,P.jug.x+.5,P.jug.y,3.4,.8,.55);cast(g,P.jug.x-2,P.jug.x+2,P.jug.y,6,'noon');
  shadeAround(g,(A.x0+A.x1)/2,230,.6,[[A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop],[D.x0,D.top,D.x1-D.x0,WY-D.top]]);
  /* darker under the low end of the roof */
  comp(g,'multiply',.35,()=>{g.fillStyle=lg(g,0,0,120,0,['#6e6080','rgba(255,255,255,0)']);poly(g,[0,0,120,0,120,144,0,144]);g.fill()});
  sunIn(g,[[A.x0,A.x1,A.top,A.sill,.9]],q=>{const B=P.pallet;q.rect(B.x0,B.top-3,B.x1-B.x0,B.foot-B.top+3)})}
/* the underside of the roof: boards that run with the slope, the wall plate along the top of the back wall, and the rafters, each a beam
   whose face toward us shows below the boards; they lie parallel to the picture, so that they run as parallel bands, spaced wider as they
   come nearer, and nothing crosses them */
function roof(g,r){const M=SHARED.materials,P=[-4,-4,324,-4,324,GCL(324),-4,GCL(-4)],H=HZ-GCL(VX),k=-.1875;
  poly(g,P,'#3e2e20');clipTo(g,()=>poly(g,P),()=>{
    for(let o=0;o<90;o+=2.6){const c=tint('#3e2e22',(r()-.5)*.2),y0=GCL(-4)-o;poly(g,[-4,y0-2.6,324,y0-2.6+k*328,324,y0+k*328,-4,y0],c);
      for(let i=0;i<8;i++){const x=r()*320,l=6+r()*24;stroke(g,[x,y0-1.3+k*(x+4),x+l,y0-1.3+k*(x+l+4)],rgba(tint(c,r()<.5?-.25:.2),.5),.5)}}
    for(const s of[1.18,1.42,1.74,2.16,2.8]){const off=(s-1)*H,t=2.4*s,b=1.1*s,yb=x=>GCL(x)-off;
      comp(g,'multiply',.35,()=>poly(g,[-4,yb(-4)+b,324,yb(324)+b,324,yb(324)+b+1.6*s,-4,yb(-4)+b+1.6*s],'#2a1a14'));
      const F=[-4,yb(-4)-t,324,yb(324)-t,324,yb(324),-4,yb(-4)];poly(g,F,'#7a5a3a');clipTo(g,()=>poly(g,F),()=>tex(g,'wood',.25,-4,yb(324)-t,328,yb(-4)-yb(324)+t,'overlay',.5));
      poly(g,[-4,yb(-4),324,yb(324),324,yb(324)+b,-4,yb(-4)+b],'#8a6a48');stroke(g,[-4,yb(-4)-t+.25,324,yb(324)-t+.25],'rgba(30,20,14,.5)',.5)}});
  /* the wall plate on top of the back wall, and the shade it throws on the wall under it */
  const pl=[-4,GCL(-4)-2.6,324,GCL(324)-2.6,324,GCL(324)+.4,-4,GCL(-4)+.4];poly(g,pl,'#5e4630');stroke(g,[-4,GCL(-4)+.15,324,GCL(324)+.15],'#8a6a48',.5);
  comp(g,'multiply',.4,()=>{poly(g,[-4,GCL(-4)+.4,324,GCL(324)+.4,324,GCL(324)+5,-4,GCL(-4)+5]);g.fillStyle=lg(g,0,GCL(160),0,GCL(160)+5,['#3a2a30','rgba(255,255,255,0)']);g.fill()})}
/* the doorway of the garret: rough jambs and a lintel of timber, a worn threshold board; no leaf (it opens outward onto the landing) */
function doorFrame(g,D,r){const M=SHARED.materials,w=D.x1-D.x0,h=WY-D.top;
  M.board(g,D.x0-4,D.top-4,w+8,4,'#5e4630',r);R(g,D.x0-4,D.top-4,w+8,.5,'rgba(255,230,190,.3)');R(g,D.x0-4,D.top-.5,w+8,.5,'rgba(30,20,14,.5)');
  for(const[x,s]of[[D.x0-4,1],[D.x1,-1]]){M.plank(g,x,D.top,4,h,'#6a4e34',r,1);R(g,s>0?x:x+3.5,D.top,.5,h,'rgba(255,230,190,.3)');R(g,s>0?x+3.5:x,D.top,.5,h,'rgba(30,20,14,.45)')}
  R(g,D.x0-4,WY-1.2,w+8,1.8,'#7a6046');R(g,D.x0-4,WY-1.2,w+8,.5,'#a88a64')}
/* beyond the doorway: the landing at the right, its boards, and at the left the well of the stair going down along the far wall, so
   steep that each step drops nearly as far as it goes: its two top steps in profile, the dark below them, and the rail that follows
   them down from a post at the landing's edge. Lit only from the stair below and from our room */
function stairHead(g,D,lx,r){const LF=90,M=SHARED.materials;
  inRect(g,D.x0,D.top,D.x1-D.x0,WY-D.top,()=>{
    plaster(g,D.x0-2,D.top-2,D.x1-D.x0+4,WY-D.top+2,'#9a8a74',r,{patch:0,cracks:0,t:.45});
    /* the landing */
    R(g,lx,LF,D.x1-lx+1,WY-LF,'#6a5640');tex(g,'wood',.3,lx,LF,D.x1-lx+1,WY-LF,'overlay',.5);
    /* where the landing meets the far wall there is no hard line, so that the post stands on nothing that runs on past it */
    g.fillStyle=lg(g,0,LF-3,0,LF+2,['rgba(106,86,64,0)','rgba(106,86,64,.8)','rgba(106,86,64,0)']);g.fillRect(lx,LF-3,D.x1-lx+1,5);
    /* the well: the far wall goes on down past the landing and darkens */
    comp(g,'multiply',.85,()=>{g.fillStyle=lg(g,0,LF-10,0,WY,['rgba(255,255,255,1)','#3a2e34']);g.fillRect(D.x0,LF-10,lx-D.x0,WY-LF+10)});
    /* the top steps, in profile against the far wall: each tread 2.4 deep and 2.2 lower than the last */
    let x=lx-1.2,y=LF;const S=[x,y];for(let k=0;k<6;k++){y+=2.2;S.push(x,y);x-=2.4;S.push(x,y)}S.push(x,WY+2,lx-1.2,WY+2);
    poly(g,S,'#3e2e22');for(let k=0,x=lx-1.2,y=LF;k<6;k++){y+=2.2;x-=2.4;R(g,x,y,2.4,.6,'#9a7a56');R(g,x+2.4-.5,y-2.2,.5,2.2,'#2a1c14')}
    /* the rail: from the top of a post at the landing's edge down along the steps, at the slope of the stair */
    const pt=LF-15;R(g,lx-1,pt,2,LF-pt,'#5e4630');R(g,lx-1,pt,.5,LF-pt,'#8a6a48');
    stroke(g,[lx-1,pt+1.2,D.x0-6,pt+1.2+(lx-1-D.x0+6)*2.2/2.4],'#6e5236',1.2);stroke(g,[lx-1,pt+.8,D.x0-6,pt+.8+(lx-1-D.x0+6)*2.2/2.4],'rgba(200,160,110,.5)',.4);
    /* the doorway's own shade over all of it: dim beside the bright room */
    comp(g,'multiply',.45,()=>{g.fillStyle='#7a7090';g.fillRect(D.x0,D.top,D.x1-D.x0,WY-D.top)})})}
/* the pallet: a thick mat of straw in a ticking of coarse linen, low on the boards under the slope of the roof, a folded blanket at its
   foot */
function pallet(g,B,r){const len=B.x1-B.x0,mid=B.top+3.6;
  cast(g,B.x0+1,B.x1,B.foot-.4,4,'noon');sh(g,(B.x0+B.x1)/2+1,B.foot-.6,len/2+1,1.4,.55);
  const top=x=>B.top+.4*Math.sin((x-B.x0)/7)+.3*Math.sin((x-B.x0)/2.9),P=[B.x0+.6,B.foot,B.x0,mid,B.x0+1.6,B.top+.6];
  for(let x=B.x0+3;x<=B.x1-3;x+=1)P.push(x,top(x));P.push(B.x1-1.4,B.top+.6,B.x1,mid,B.x1-.6,B.foot);
  poly(g,P);g.fillStyle=lg(g,0,B.top,0,B.foot,['#d8c8a0','#c4b088','#8e7c5c']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.45,B.x0,B.top-1,len,B.foot-B.top+1,'overlay',1);
    for(let y=mid+.6;y<B.foot;y+=1.1)R(g,B.x0,y,len,.4,'rgba(110,90,60,.3)');
    for(let i=0;i<30;i++)R(g,B.x0+r()*len,B.top+.6+r()*3,1+r()*2,.5,r()<.5?'rgba(120,100,60,.35)':'rgba(255,246,214,.3)');
    R(g,B.x0,mid-.3,len,.6,'rgba(90,70,50,.35)')});
  const b0=B.x1-20,b1=B.x1-2,c0='#7a5a44';
  for(let j=2;j>=0;j--){const y0=B.top-1.4+j*1.5,y1=y0+1.8,Q=[b0+j*.4,y1,b0+j*.4-.2,y0+.6,b0+j*.4+.8,y0];for(let x=b0+3;x<=b1-2;x+=2)Q.push(x,y0+.15*Math.sin(x/2.3+j));Q.push(b1+.2,y0+.5,b1+.4,y1);
    poly(g,Q);g.fillStyle=lg(g,0,y0,0,y1,[tint(c0,.12-j*.06),tint(c0,-.1-j*.06)]);g.fill();R(g,b0+j*.4+.4,y0,b1-b0-1,.5,rgba(tint(c0,.4),.5))}}

/* the small room */
function small(g){const r=rng(2571),M=SHARED.materials,P=PLACES.small.POS,D=P.door,A=opening(P.high,.08),B=BOX,f=(HZ-B.top);
  const LW=[B.x0,B.top,VX+(B.x0-VX)*HZ/f,0,-4,0,-4,HZ+(WY-HZ)*(-4-VX)/(B.x0-VX),B.x0,WY],RW=[B.x1,B.top,VX+(B.x1-VX)*HZ/f,0,324,0,324,HZ+(WY-HZ)*(324-VX)/(B.x1-VX),B.x1,WY],
    CE=[B.x0,B.top,B.x1,B.top,RW[2],0,LW[2],0],FL=[B.x0,WY,B.x1,WY,324,RW[7],324,150,-4,150,-4,LW[7]];
  const O=Object.assign({},viewO('noon'),{seed:2573,y1:A.osill+1});O.L=null;SHARED.coast.light(O);SHARED.coast.sky(g,O);
  street(g,D,r);
  g.save();g.beginPath();g.rect(-4,-4,328,152);g.rect(A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop);g.rect(D.x0,D.top,D.x1-D.x0,WY-D.top);g.clip('evenodd');
  /* the walls: clean limewash with a socle of red ochre, the back wall and both side walls; the side walls in perspective */
  const c='#e2d6be',sock=86,sl=(x,y,bx)=>HZ+(y-HZ)*(x-VX)/(bx-VX);
  plaster(g,-4,-4,328,WY+4,c,r,{patch:0,cracks:0,t:.3,top:.03,bot:-.04,brick:'#a0603e',rubble:0});SHARED.temple.age(g,0,8,320,WY,rng(2576),.25);
  R(g,B.x0,sock,B.x1-B.x0,WY-sock,OCHRE);
  for(const[W,bx,x1]of[[LW,B.x0,-4],[RW,B.x1,324]]){clipTo(g,()=>poly(g,W),()=>{plaster(g,-4,-4,328,150,c,r,{patch:0,cracks:0,t:.35});poly(g,[bx,sock,x1,sl(x1,sock,bx),x1,sl(x1,WY,bx),bx,WY],OCHRE)})}
  /* the socle's lit top edge, on the back wall and along each side wall */
  R(g,B.x0,sock-.6,B.x1-B.x0,.8,'#6a3424');for(const[bx,x1]of[[B.x0,-4],[B.x1,324]])stroke(g,[bx,sock-.2,x1,sl(x1,sock,bx)-.2],'#6a3424',.8);
  clipTo(g,()=>{poly(g,[B.x0,sock,B.x1,sock,B.x1,WY,B.x0,WY]);poly(g,[B.x0,sock,-4,sl(-4,sock,B.x0),-4,sl(-4,WY,B.x0),B.x0,WY]);poly(g,[B.x1,sock,324,sl(324,sock,B.x1),324,sl(324,WY,B.x1),B.x1,WY])},()=>tex(g,'mott',.45,-4,40,328,110,'overlay',1));
  /* the ceiling: boards, three joists running toward us, the plate along the top of the back wall */
  clipTo(g,()=>poly(g,CE),()=>{R(g,-4,-4,328,B.top+4,'#3e2e20');tex(g,'wood',.25,-4,0,328,B.top,'overlay',.5);
    for(const a of[116,150,184]){const k=HZ/f,J=[a,B.top,a+5,B.top,VX+(a+5-VX)*k,0,VX+(a-VX)*k,0];poly(g,J,'#62482e');poly(g,[a,B.top,a+1.4,B.top,VX+(a+1.4-VX)*k,0,VX+(a-VX)*k,0],'#3a2a1e')}
    M.board(g,B.x0,B.top-2.4,B.x1-B.x0,2.4,'#6a4e2c',r)});
  /* the corners where the walls meet: a soft shade along each */
  for(const W of[LW,RW])comp(g,'multiply',.5,()=>poly(g,W,W===LW?'#c4b8c4':'#a89cb0'));
  for(const x of[B.x0,B.x1])R(g,x-.4,B.top,.8,WY-B.top,'rgba(60,44,50,.35)');
  for(const[x,y]of[[150,34],[110,60]])M.crack(g,x,y,3,r,.35);
  /* the floor: stone flags, swept */
  clipTo(g,()=>poly(g,FL),()=>{pave(g,-4,WY,324,150,'#cabea6',r,{vx:VX,vy:HZ,rows:5,step:30,v:.06,t:.3,rand:0});pool(g,200,112,60,10,'#ece0c8',.1,'screen')});
  ao(g,B.x0,WY,B.x1-B.x0,4,'t',.3,'#3a2c30');for(const[bx,x1]of[[B.x0,-4],[B.x1,324]])stroke(g,[bx,WY,x1,sl(x1,WY,bx)],'rgba(60,44,50,.45)',.8);
  g.restore();
  windowFrame(g,A,'noon',0);
  smallDoor(g,D,P.leaf,r);
  bench(g,P.bench,'noon',r);
  smallTable(g,P.table,r);
  stoolShadow(g,P.stool.x,P.stool.y,'noon');
  shadeAround(g,(D.x0+D.x1)/2,210,.55,[[A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop],[D.x0,D.top,D.x1-D.x0,WY-D.top]]);
  sunIn(g,[[A.x0,A.x1,A.top,A.sill,.8],[D.x0,D.x1,D.top,WY,.8]],q=>{const T=P.table;q.rect(T.x0,T.back,T.x1-T.x0,T.foot-T.back)});
  stool(g,P.stool,'small','noon')}
/* the small room's door to the street: a frame of dressed stone, the leaf of upright planks standing open into the room against the
   right hand, hinged at the doorway's right side and seen in perspective, its near edge toward us */
function smallDoor(g,D,L,r){const M=SHARED.materials,c='#e2d6be',w=D.x1-D.x0,h=WY-D.top;
  SHARED.temple.stone(g,D.x0-4,D.top-5,w+8,5,rng(2578),{bh:5,bw:w+8,c:tint(c,.02),v:.05,age:.3});R(g,D.x0-4,D.top-5,w+8,.5,'rgba(255,246,226,.5)');R(g,D.x0-4,D.top-.5,w+8,.6,'rgba(50,36,40,.45)');
  for(const x of[D.x0-4,D.x1+1]){R(g,x,D.top,3,h,tint(c,-.02));tex(g,'mott',.35,x,D.top,3,h,'overlay',1);R(g,x,D.top,.5,h,'rgba(255,246,226,.4)');R(g,x+2.5,D.top,.5,h,'rgba(60,44,50,.3)')}
  R(g,D.x0-1,WY-1,w+2,1.4,tint(c,-.08));R(g,D.x0-1,WY-1,w+2,.5,'rgba(255,246,226,.4)');
  /* the leaf: its far edge at the hinge, its near edge nearer and so taller; its boards upright, their joints upright too */
  const s=(L.near-VX)/(L.x-VX),x0=L.x+1,top0=D.top,b0=WY,x1=L.near,top1=HZ-(HZ-D.top)*s,b1=HZ+(WY-HZ)*s,F=[x0,top0,x1,top1,x1,b1,x0,b0];
  comp(g,'multiply',.3,()=>poly(g,[x0,b0,x1,b1,x1+3,b1+.6,x0+2,b0+.2],'#3a2c40'));
  poly(g,F,'#6a4c32');clipTo(g,()=>poly(g,F),()=>{for(let i=0;i<4;i++){const t0=i/4,t1=(i+1)/4,xa=x0+(x1-x0)*t0,xb=x0+(x1-x0)*t1;
      poly(g,[xa,top0+(top1-top0)*t0,xb,top0+(top1-top0)*t1,xb,b0+(b1-b0)*t1,xa,b0+(b1-b0)*t0],tint('#6a4c32',[-.02,.06,-.05,.03][i]));if(i)stroke(g,[xa,top0+(top1-top0)*t0,xa,b0+(b1-b0)*t0],'rgba(30,18,12,.5)',.5)}
    tex(g,'wood',.3,x0,top1,x1-x0,b1-top1,'overlay',.5);g.fillStyle=lg(g,x0,0,x1,0,['rgba(30,20,20,.35)','rgba(255,230,190,.1)']);g.fillRect(x0,top1,x1-x0,b1-top1)});
  R(g,x1-.6,top1,.6,b1-top1,'#3a2618');R(g,x1-1.2,top1,.5,b1-top1,'rgba(255,230,190,.3)');sh(g,(x0+x1)/2+1,(b0+b1)/2+.4,(x1-x0)/2+1,1,.45)}
/* through the door: the lane outside, the house front opposite in its own shade, a shuttered window and a door in it, and the paving
   between, the midday sun on it from our threshold to the shade of the houses */
function street(g,D,r){const F=84;
  inRect(g,D.x0,D.top,D.x1-D.x0,WY-D.top,()=>{const x0=D.x0,x1=D.x1;
    plaster(g,x0-2,D.top-2,x1-x0+4,F-D.top+2,'#d2b692',r,{patch:0,cracks:0,t:.45,brick:'#a0603e'});
    R(g,x0-2,60,x1-x0+4,2.4,'#a85e40');R(g,x0-2,60,x1-x0+4,.5,'rgba(255,220,190,.3)');
    R(g,x0+4,48,7,8,'#3a2c2a');R(g,x0+11,48,3.4,8,'#7a5a3a');R(g,x0+4,56,7,.8,'#c8b090');
    R(g,x0+15,68,7,F-68,'#4a3424');R(g,x0+15,68,7,.6,'#2a1c14');
    comp(g,'multiply',.32,()=>{g.fillStyle='#7a86b0';g.fillRect(x0,D.top,x1-x0,F-D.top)});
    pave(g,x0-2,F,x1+2,WY+.4,'#c8bca2',r,{vx:VX,vy:HZ,rows:3,step:36,v:.06,t:.34,rand:0});ao(g,x0,F,x1-x0,3,'t',.3,'#3a3048');
    const ys=F+(WY-F)*.3;comp(g,'multiply',.4,()=>{g.fillStyle='#8a90b4';g.fillRect(x0,F,x1-x0,ys-F)});
    comp(g,'screen',.22,()=>{g.fillStyle='#fff4e0';g.fillRect(x0,ys,x1-x0,WY-ys)});R(g,x0,ys,x1-x0,.5,'rgba(255,240,210,.25)')})}
/* the small table: a plain top on four legs at its corners, bare */
function smallTable(g,T,r){const M=SHARED.materials,W='#7a5838',lit='#a47a50',ap=2,ft=T.foot,bf=T.bfoot,f0=T.x0,f1=T.x1,b0=T.x0+2,b1=T.x1-2;
  cast(g,f0,f1,ft,ft-T.top,'noon',1.5);sh(g,(f0+f1)/2,ft-2,(f1-f0)/2+2,3,.42);
  comp(g,'multiply',.6,()=>{g.fillStyle=lg(g,0,T.back,0,ft,['#5a4a62','#8a7a88']);poly(g,[b0,T.back,b1,T.back,f1,ft-.5,f0,ft-.5]);g.fill()});
  for(const x of[b0+.6,b1-2])R(g,x,T.back+1,1.4,bf-T.back-1,tint(W,-.4));
  const top=[b0,T.back,b1,T.back,f1,T.top,f0,T.top];poly(g,top);g.fillStyle=lg(g,0,T.back,0,T.top,[tint(W,.12),tint(W,.24)]);g.fill();
  clipTo(g,()=>poly(g,top),()=>tex(g,'wood',.3,f0,T.back,f1-f0,T.top-T.back,'overlay',.5));
  M.board(g,f0,T.top,f1-f0,ap,W,r);R(g,f0,T.top,f1-f0,.5,lit);ao(g,f0,T.top+ap,f1-f0,3,'t',.35,'#1a1210');
  for(const x of[f0+.4,f1-2.4]){R(g,x,T.top+ap,2,ft-T.top-ap,tint(W,-.12));R(g,x,T.top+ap,.5,ft-T.top-ap,'rgba(255,220,170,.22)');R(g,x,ft-.5,2,.5,'#24160c');sh(g,x+1,ft,1.4,.5,.4)}}

/* ---- for the chapter ---- */
/* the things that stand in the walk strip, cut out of the backdrop (ART[id].props), each with its footprint */
function props(kind,stools){if(kind==='garret'){const B=PLACES.garret.POS.pallet;
    return[{y:B.foot,shape(g){R(g,B.x0,B.top-3,B.x1-B.x0,B.foot-B.top+3,'#000')},foot:[B.x0,B.foot-4,B.x1-B.x0,5]}]}
  if(kind==='small'){const T=PLACES.small.POS.table,s=PLACES.small.POS.stool;
    return[{y:T.foot,shape(g){poly(g,[T.x0+2,T.back,T.x1-2,T.back,T.x1,T.top,T.x1,T.foot,T.x0,T.foot,T.x0,T.top],'#000')},foot:[T.x0-1,T.bfoot-1,T.x1-T.x0+2,T.foot-T.bfoot+2]},
      {stool:'small',y:s.y,shape(g){R(g,s.x-5,s.y-10.6,10,10.6,'#000')},foot:[s.x-5,s.y-3,10,4]}]}
  const T=POS.table,S=POS.stools,P=[];
  P.push({y:T.foot,shape(g){poly(g,[T.x0+3,T.back,T.x1-3,T.back,T.x1,T.top,T.x1,T.foot,T.x0,T.foot,T.x0,T.top],'#000')},foot:[T.x0-1,T.bfoot-1,T.x1-T.x0+2,T.foot-T.bfoot+2]});
  for(const k of stoolsOf(stools)){const s=S[k];P.push({stool:k,y:s.y,shape(g){R(g,s.x-5,s.y-10.6,10,10.6,'#000')},foot:[s.x-5,s.y-3,10,4]})}
  return P}
function foot(kind,stools){if(kind==='small'){const b=PLACES.small.POS.bench;return[[b.x0,b.foot-4,b.x1-b.x0,5]].concat(props(kind).map(p=>p.foot))}
  if(kind==='garret')return props(kind).map(p=>p.foot);
  const B=POS.bed,J=POS.jar,out=[[B.x0,B.foot-4,B.x1-B.x0,5],[J.x0-1,J.foot-3,J.x1-J.x0+2,4]];
  for(const b of POS.benches)out.push([b.x0,b.foot-4,b.x1-b.x0,5]);return out.concat(props(kind,stools).map(p=>p.foot))}
function motion(o){const night=o.hour==='night',N=POS.niche;
  return{draw(g,t){if(night)flame(g,N.x0+(N.x1-N.x0)*.46+3.8,N.b-2.4,t)}}}

return{room,light,motion,props,foot,stoolCast,POS,AT,WALK,HOURS,KINDS,STOOLS,PLACES,OTHER:['garret','small'],WY,HZ,VX}})();
