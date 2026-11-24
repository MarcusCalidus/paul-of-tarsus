/* Paul of Tarsus: level data for Chapter Thirteen, "The Hall of Tyrannus".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Ephesus (Acts 18:23-19:20), about 52 to 55 C.E.: Paul sets out through Galatia and Phrygia; meanwhile Apollos of Alexandria speaks
   boldly in the synagogue of Ephesus, knowing only the baptism of John, and Priscilla and Aquila take him into their company; he
   crosses to Achaia with a letter from the brothers. Paul comes down by the inland regions and finds about twelve disciples who have
   not heard of holy spirit; three months in the synagogue; then he withdraws with the disciples and gives talks every day in the school
   auditorium of Tyrannus, for two years, so that the whole province of Asia hears the word; cloths and aprons are carried from him
   to the sick; the seven sons of Sceva; and a good number who practiced magical arts burn their books before everybody: fifty
   thousand pieces of silver.
   Acts does not say what Apollos said in the synagogue, or where and in how many evenings Priscilla and Aquila taught him; where Paul
   found the twelve, or who brought them; who Tyrannus was, how Paul came by his hall, or at what hours he spoke there (a few
   manuscripts add hours; the study note on Acts 19:9 does not take them for the original text, and says that some find the hot
   midday hours reasonable all the same); when Timothy came to Ephesus (19:22 places him there at the end of this time); who asked for
   a cloth or an apron, or who was made well; how the word reached any other city of the province; who burned books, where each had
   kept them, why they were not sold, or how the sum was reckoned. The chapter claims none of it, and its end screen says so. Luke is in
   Philippi, so the narration says "he" and "they". What the account itself says is told by the narrator, in paraphrase with its
   reference, and never put into a mouth as a quotation: those lines stand together in TOLD below.
   Three things are new here. What is missing: Apollos says nothing that is wrong, and the two who listen have to find what he does
   not say (HEARD). A day in three parts: the bench before sunrise, the hall at midday, the houses by lamplight, moved on at a sundial
   in the street (DAY, PART, dial). And two close views: a house in which what was kept back is looked for (HIDE), and a counting
   board on which the price is laid out in pebbles (BOARD). Aquila and Priscilla are played as one, from the first scene.
   Ephesus is shown as it stood (CONTRIBUTING section 3, the exception for Athens, Corinth, Ephesus and Rome): its temple is seen once,
   far off, from the road, and nobody names it; the uproar about it belongs to the next chapter. No formula, sign or charm of the
   magical arts is drawn or worded anywhere: a book is a roll with nothing on it, and nobody reads from one. */
LEVEL(13,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* One tune in three lights, in bars of nine (two, two, two and three), on G with a minor third and a major sixth. Before sunrise it is
   a working tune on the lyre over a low string and a hand drum ("dawn"); at midday the same tune at half its pace on one pipe, over a
   single held note ("noon"); by lamplight it is played on the harp ("lamp"). The tune has a gap: until the evening at the tentmakers'
   table it leaves out the sixth note of its scale and steps over the place where that note belongs (GAP, mood "gap"). At that table
   the note is heard for the first time (given13), and from then on it belongs to the tune (FULL). On the road above the city the tune
   is far off ("road"); in the synagogue, when the quarrel comes, a low string and a slow drum ("door"); what is told in the dark has no
   music ("night"); and at the fire all three play it together ("fire"). Nothing is claimed about how music was played then. */
const _=null,SCALE=[0,2,3,5,7,9,10],
 GAP={A:[0,_,2,_,4,_,3,_,_],B:[4,_,6,_,4,_,2,_,_],C:[7,_,6,_,4,_,3,_,2],D:[1,_,2,_,0,_,0,_,_]},
 FULL={A:[0,_,2,_,4,_,3,_,_],B:[4,_,5,_,6,_,4,_,2],C:[7,_,6,_,5,_,4,_,2],D:[1,_,2,_,0,_,0,_,_]},
 LOW={A:[-7,_,_,_,_,_,-3,_,_],B:[-5,_,_,_,_,_,-7,_,_]},
 SLOW=[[[0,0,5],[6,2,3]],[[0,4,6],[6,3,3]],[[0,4,4],[4,5,5]],[[0,6,4],[4,4,3],[7,2,2]],[[0,7,4],[4,6,5]],[[0,5,4],[4,4,3],[7,2,2]],[[0,1,4],[4,2,5]],[[0,0,9]]],
 MUSIC={dt:.2,steps:9,group:[2,2,2,3],root:55,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['gap'],prog:'ABCD',len:3,seq:GAP},
  {inst:'bass',moods:['gap','dawn','fire'],prog:'ABAB',len:5,seq:LOW,vol:.8},
  {inst:'lyre',moods:['dawn','fire'],prog:'ABCD',len:3,seq:FULL},
  {drum:1,moods:['dawn','fire'],prog:'AAAB',seq:{A:'d.t.t.d.k',B:'d.t.t.d.t'},vol:.6},
  {inst:'ney',moods:['noon','fire'],loop:8,oct:12,vol:.6,lines:SLOW},
  {drone:[0],every:18,moods:['noon'],vol:.35},
  {inst:'harp',moods:['lamp','fire'],prog:'ABCD',len:4,oct:12,seq:FULL,vol:.75},
  {inst:'bass',moods:['lamp'],prog:'ABAB',len:7,seq:{A:[-7,_,_,_,_,_,_,_,_],B:[-5,_,_,_,_,_,_,_,_]},vol:.6},
  {inst:'harp',moods:['road'],prog:'ABCD',len:5,oct:12,seq:GAP,vol:.4},
  {drone:[0],every:36,moods:['road','door'],vol:.3},
  {inst:'bass',moods:['door'],prog:'ABAB',len:6,seq:{A:[-7,_,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_,_]},vol:.9},
  {drum:1,moods:['door'],prog:'A',seq:{A:'d.....k..'},vol:.7}]};
/* given13: the note that the tune has left out, heard for the first time: alone, and then in its place between its neighbors */
const given13=()=>{if(!AU.ctx)return;const t=now()+.05,f=d=>mtof(note(d,1,MUSIC));INST.harp(f(5),t,1.6,.9);[4,5,6].forEach((d,i)=>INST.harp(f(d),t+1.5+i*.3,i===2?1.2:.5,.8))};
/* pebble13: a pebble set down on wood; carry13: a handful taken up, and one set down in the next place */
const pebble13=v=>{if(AU.ctx){noise({d:.03,v:.1*(v||1),f:2400,q:3});tone({f:520,to:380,d:.05,type:'triangle',v:.03})}},
  carry13=()=>{if(AU.ctx){for(let i=0;i<4;i++)noise({t:now()+i*.035,d:.03,v:.06,f:3000,q:3});noise({t:now()+.22,d:.04,v:.12,f:1900,q:3})}};
/* cicadas in the heat of midday: a dry rattle that swells and breaks off; and the sea wind in a curtain */
const CALLS={cicada:[.5,2.4,(t,d)=>{const n=9+(Math.random()*9|0),f=4600+Math.random()*900;for(let i=0;i<n;i++)noise({t:t+i*.052,d:.03,v:.035+.03*Math.sin(i/n*3.14),f,q:7,dest:d})}]},
  BEDS={flap:{type:'lowpass',f:300,q:.8,lfo:.7,depth:.9,v:.3}};

/* ============ ART ============ */
const SH='#8f95c8',LIN='#e9dfc2',GOAT='#3d332c',ST='#d9cfb4',RO='#b9744e',MBL='#e8e3d6';
/* materials and light shared by every chapter (shared/materials.js), to the standard of Chapter Fifteen's room of Gaius: quiet
   grain, cracks in two tones set by hand, contact shadows in three passes, dyes drawn toward earth colors, shade beside joists */
const{plank:plank13,board:boardW13,crack:crack13,skipCracks:skipCracks13,shadow:shadow13,earth:earth13}=SHARED.materials;
/* wall13: a plastered wall whose patches of bare brick and whose cracks are set by hand. plaster() is run once more with its random
   ones, o as before, on a canvas that is thrown away, so that it takes from r all it ever took and every other thing of the room keeps
   its place; then the wall is painted with none, and the patches P ([x, y, half width, half height]) and the cracks C ([x, y, steps])
   are laid where they hide nothing and run to no head, from a seed of their own. */
function wall13(g,x,y,w,h,c,r,o,P,C,seed){plaster(mk(1,1)[1],x,y,w,h,c,r,o);const q=rng(seed),b=o.brick||tint(c,-.3);
  plaster(g,x,y,w,h,c,q,Object.assign({},o,{patch:0,cracks:0,t:o.t==null?.36:o.t}));
  for(const[px,py,pw,ph]of P){const pts=[];for(let a=0;a<9;a++){const t=a/9*6.2832,k=.6+q()*.4;pts.push(px+Math.cos(t)*pw*k,py+Math.sin(t)*ph*k)}
    clipTo(g,()=>poly(g,pts),()=>{R(g,px-pw,py-ph,pw*2,ph*2,tint(b,-.35));for(let j=0,row=0;j<ph*2;j+=2.5,row++)for(let i=-(row%2)*3;i<pw*2;i+=6)R(g,px-pw+i,py-ph+j,5.5,2,tint(b,(q()-.5)*.25))});
    stroke(g,pts.concat(pts.slice(0,2)),rgba('#000000',.25),.5)}
  for(const[cx,cy,n]of C)crack13(g,cx,cy,n,q)}
/* joists13: the ceiling over a room, seen from below as in Chapter Fifteen's room of Gaius: joists that run from the wall plate (their
   foot at y = U) toward us and spread as they come, the boards dark between them. Of each joist we see the underside and the side turned
   to the middle of the room; nothing stands on the plate as a post would. The grain of each underside is drawn from rw exactly as the
   upright board it replaces drew it (x0, step: the feet of the joists), so that the rest of the room keeps its shape. */
function joists13(g,x0,step,U,c,rw){const VX=160,VY=72,pu=x=>VX+(x-VX)*VY/(VY-U),pb=x=>VX+(x-VX)*VY/(VY-U+3.4);
  g.fillStyle=lg(g,0,0,0,U,['#1c140e','#2c2018']);g.fillRect(0,0,320,U);tex(g,'wood',.4,0,0,320,U,'overlay',.5);ao(g,0,0,320,U*.7,'t',.45,'#0c0808');
  for(let a=x0;a<320;a+=step){const b=a+6,left=a+3<VX,e=left?b:a,P=[a,U,b,U,pu(b),0,pu(a),0];
    /* the shade the boards gather beside it, the side turned to the middle, and the underside with its grain */
    for(const[d,al]of[[3.4,.14],[1.6,.2]]){poly(g,[a-d,U,a,U,pu(a),0,pu(a-d),0],rgba('#0c0808',al));poly(g,[b,U,b+d,U,pu(b+d),0,pu(b),0],rgba('#0c0808',al*.6))}
    poly(g,[e,U,e,U-3.4,pb(e),0,pu(e),0],left?tint(c,-.34):tint(c,.12));poly(g,P,c);
    const s=(pu(a+3)-(a+3))/U;clipTo(g,()=>poly(g,P),()=>{g.save();g.transform(1,0,-s,1,s*U,0);boardW13(g,a,0,6,U,c,rw,1);g.restore()});
    stroke(g,[e,U,pu(e),0],left?tint(c,.18):tint(c,.3),.5)}}
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr, lit, sw}]. A figure with fr -1 sits. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges||0;
  figure(g,x,y,o.lit||lit,id+dir+'s'+(fr<0?'q':fr)+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),o.sw==null?7.5:o.sw)})}
/* col: one column, its shaft narrowing a little toward the top, with a capital hardly wider than the shaft: it never reads as a post
   under a bar. colonnade: a row of columns under a deep beam and a tiled roof, with shade behind them. */
function col(g,x,y,h,w,c,o){o=o||{};const s=o.shade||0,n=o.fl||3;
  poly(g,[x-w/2,y,x+w/2,y,x+w*.42,y-h,x-w*.42,y-h]);g.fillStyle=lg(g,x-w/2,0,x+w/2,0,[tint(c,-.36-s),tint(c,.14-s),tint(c,-.04-s),tint(c,-.44-s)]);g.fill();
  for(let i=1;i<n;i++)R(g,x-w/2+w*i/n,y-h+1,.5,h-2,'rgba(40,30,50,.16)');
  if(!o.plain){const ch=Math.max(1.5,w*.5);R(g,x-w*.42-.5,y-h-ch,w*.84+1,ch,tint(c,-.08-s));R(g,x-w*.42-.5,y-h-ch,w*.84+1,.5,tint(c,.26-s));R(g,x-w/2-.5,y-1,w+1,1,tint(c,-.22-s))}}
function colonnade(g,x,y,w,h,n,c,o){o=o||{};const bh=o.beam||5;R(g,x,y-h,w,h,o.dark||'#4c4644');
  if(o.back)o.back();comp(g,'multiply',o.sh==null?.5:o.sh,()=>R(g,x,y-h,w,h,'#928ca4'));
  poly(g,[x-3,y-h-bh,x+w+3,y-h-bh,x+w-2,y-h-bh-8,x+2,y-h-bh-8],RO);for(let i=x;i<x+w;i+=5)stroke(g,[i,y-h-bh,i+(x+w/2-i)*.03,y-h-bh-8],'rgba(80,36,24,.3)',.5);R(g,x-3,y-h-bh-.6,w+6,.8,'#d88a5c');
  R(g,x-1.5,y-h-bh,w+3,bh,c);R(g,x-1.5,y-h-bh,w+3,.6,tint(c,.3));R(g,x-1.5,y-h-.6,w+3,.6,tint(c,-.3));
  for(let i=0;i<n;i++)col(g,x+(i+.5)*w/n,y,h,o.cw||5.6,c,{fl:3})}
/* bench: a stone bench along a wall, in two tiers; the joints of each tier stop short of its edges, and those of the lower tier stand
   between those of the upper one. stool: a wooden bench on two legs, set at its ends. */
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}
function stool(g,x,y,w,c){c=c||'#8a683a';R(g,x+1,y+7,w,1.2,'rgba(30,22,40,.3)');wood(g,x,y,w,2.2,c);R(g,x,y,w,.6,tint(c,.3));wood(g,x+.6,y+2.2,2,5,tint(c,-.25),1);wood(g,x+w-2.6,y+2.2,2,5,tint(c,-.25),1)}
/* cap13: a caption in small letters with a dark edge, as the names on the map are written. It is made to fit its width, and what is
   written is noted in G.caps13, so that the playtest can see that it fits in every language. */
const GFONT=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
const edge=(g,s,x,y)=>{g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1;g.lineJoin='round';g.strokeText(s,x,y);g.restore()};
function cap13(g,s,x,y,w,c,left,sz0){s=T(s);let sz=sz0||4.8;g.font=GFONT(sz);g.textBaseline='middle';while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=GFONT(sz)}
  const tw=g.measureText(s).width,tx=left?x:x-tw/2;if(G.caps13)G.caps13.push({s,w:tw,max:w,sz,box:[tx-.6,y-sz*.55,tx+tw+.6,y+sz*.5]});
  edge(g,s,tx,y);g.fillStyle=c||'#f4e4b8';g.fillText(s,tx,y)}
/* aroll: a book of the magical arts, as far as it is ever shown: a small roll lying on its side, with nothing written on it and
   nothing tied round it. tilt turns it a little, so that a heap of them is a heap and not a row. */
function aroll(g,x,y,w,h,c,tilt){g.save();g.translate(x+w/2,y-h/2);g.rotate(tilt||0);clothRoll(g,-w/2,h/2,w,h,c||'#d9c9a0',{k:.34,face:.22});g.restore()}
/* heapOf: n small rolls thrown together on the ground at x,y, the later ones on top. Each lies at its own slant, and no two lie square across each other. */
function heapOf(g,x,y,n,r,z){z=z||1;const C=['#d9c9a0','#cdb98c','#e2d6b4','#c4ae80','#d2c096'];
  for(let i=0;i<n;i++){const row=i<7?0:i<12?1:i<15?2:3,k=i<7?i:i<12?i-7:i<15?i-12:i-15,m=[7,5,3,2][row],w=(9+r()*4)*z,h=(3.4+r()*1.2)*z,
      px=x+(k-(m-1)/2)*(6.4+row*.4)*z+(r()-.5)*2,py=y-row*3.2*z-r();aroll(g,px-w/2,py,w,h,C[(i*3+row)%5],(r()-.5)*.5+(k%2?.14:-.14))}}
/* theater: a theater built into the slope of a hill, seen from afar: a bowl of stone seats between two retaining walls, wider toward
   the top; the tiers follow the bowl, each a level curve, and a walkway parts the lower seats from the upper; at its foot the round
   floor and, in front of that, the long stage building with its doorways (Insight, "Ephesus": 66 tiers, room for some 25,000).
   cx, by: the middle of its foot; w: its width at the top; h: its height. sag: how far a tier dips in the middle (seen from below,
   as from the street) or, if negative, rises (seen from above, as from the road). No stair is drawn across the tiers: lines that run
   up a slope across level ones would cross them. */
function theater(g,cx,by,w,h,sag,o){o=o||{};const c=o.c||'#ded5bc',n=o.n||9,k=o.k||.5,xl=f=>cx-w*(k/2+(1-k)/2*f),xr=f=>cx+w*(k/2+(1-k)/2*f),yy=f=>by-h*f,sg=f=>sag*(.35+.65*f),
    arc=f=>{g.moveTo(xl(f),yy(f));g.quadraticCurveTo(cx,yy(f)+2*sg(f),xr(f),yy(f))};
  /* the hollow of the hill behind it, in shade */
  g.beginPath();g.moveTo(xl(0)-1,by);g.lineTo(xl(1)-2.4,yy(1)-1);g.quadraticCurveTo(cx,yy(1)+2*sg(1)-2.4,xr(1)+2.4,yy(1)-1);g.lineTo(xr(0)+1,by);g.closePath();g.fillStyle=o.hill||'#8f8658';g.fill();
  /* the bowl */
  g.beginPath();g.moveTo(xl(0),by);g.lineTo(xl(1),yy(1));g.quadraticCurveTo(cx,yy(1)+2*sg(1),xr(1),yy(1));g.lineTo(xr(0),by);g.closePath();g.fillStyle=lg(g,cx-w/2,0,cx+w/2,0,[tint(c,-.2),tint(c,.06),c,tint(c,-.26)]);g.fill();
  g.save();g.clip();
  /* shade deepens toward the foot of the bowl; the tiers, light above and dark below each */
  g.fillStyle=lg(g,0,yy(1),0,by,['rgba(60,50,80,0)','rgba(60,50,80,.3)']);g.fillRect(cx-w/2-2,yy(1)-4,w+4,h+8);
  g.fillStyle=lg(g,cx-w/2,0,cx+w/2,0,['rgba(70,60,100,.42)','rgba(70,60,100,.16)','rgba(255,246,220,.0)','rgba(255,246,220,.2)']);g.fillRect(cx-w/2-2,yy(1)-4,w+4,h+8);
  for(let i=1;i<=n;i++){const f=i/(n+1);g.beginPath();arc(f);g.strokeStyle=tint(c,-.34);g.lineWidth=.7;g.stroke();g.beginPath();arc(f-.028);g.strokeStyle=tint(c,.22);g.lineWidth=.5;g.stroke()}
  /* the walkway between the lower seats and the upper */
  g.beginPath();arc(.5);g.strokeStyle=tint(c,.3);g.lineWidth=1.6;g.stroke();g.beginPath();arc(.47);g.strokeStyle=tint(c,-.46);g.lineWidth=.6;g.stroke();
  g.restore();
  /* the wall along its upper rim */
  g.beginPath();arc(1);g.strokeStyle=tint(c,-.5);g.lineWidth=1.2;g.stroke();g.beginPath();g.moveTo(xl(1),yy(1)-.9);g.quadraticCurveTo(cx,yy(1)+2*sg(1)-.9,xr(1),yy(1)-.9);g.strokeStyle=tint(c,.16);g.lineWidth=.7;g.stroke();
  /* the two retaining walls, of dressed stone, at the ends of the bowl */
  poly(g,[xl(0),by,xl(1),yy(1),xl(1)-2,yy(1)+.6,xl(0)-2.6,by],tint(c,-.3));poly(g,[xr(0),by,xr(1),yy(1),xr(1)+2,yy(1)+.6,xr(0)+2.6,by],tint(c,-.42));
  stroke(g,[xl(0),by,xl(1),yy(1)],tint(c,.2),.5);
  /* the round floor at its foot, and the stage building in front of it: a long house of two stories with a row of doorways */
  oval(g,cx,by-.6,w*k*.36,Math.max(1.4,h*.07),'#b9ae90');
  const sw=w*k*.94,sh=Math.max(4.4,h*.2),sx=cx-sw/2,sy=by-1;R(g,sx,sy,sw,sh,tint(c,-.08));R(g,sx,sy,sw,.7,tint(c,.3));R(g,sx,sy+sh*.46,sw,.6,tint(c,-.3));R(g,sx+sw-.8,sy,.8,sh,tint(c,-.3));
  const nd=o.doors||5,dw=Math.max(1.4,sw/(nd*3));for(let i=0;i<nd;i++)R(g,sx+sw*(i+.5)/nd-dw/2,sy+sh*.56,dw,sh*.44,'#4a4050')}
/* the three parts of a day, and their light: m before the sun is over the roofs, n midday, e the evening, with lamps. The story says
   which it is (PART, below); a room's variant() asks it. */
const SKY={m:['#5b86c0','#9fb9d8','#e6d8c0','#f6dcae'],n:['#3f7fd0','#78aee4','#cfe2f0','#f0f0de'],e:['#3d4a84','#7a6a9a','#d08a6a','#f0b070']};

/* ---------- The workshop of Aquila and Priscilla, at Ephesus ---------- */
/* The bench that came over the sea from Corinth (Acts 18:18, 19), in a room open to the street by a wide door. The congregation met in
   their house (1 Corinthians 16:19): in the evening the bench is cleared, and is their table. Steps lead to the loft. Everything in
   the room is invented. v: d by day, m before sunrise, with the lamp lit, n in the evening. */
ART.shop13={w:320,q:12,variant:()=>SHOPV(),
 paint(g,v){const r=rng(1301),W='#d2c09a',n=v!=='d';
  wall13(g,0,0,320,104,W,r,{patch:2,cracks:5,brick:'#a8845a',t:.34},[[112,22,9,5],[178,36,7,4]],[[62,16,4],[128,15,3],[206,17,4],[312,16,3]],1331);
  /* the joists of the ceiling, coming toward us from the wall plate (joists13), and the plate */
  const rw=rng(1332);joists13(g,14,38,9,'#5a4226',rw);
  boardW13(g,0,9,320,2.6,'#6a4e2c',rw);ao(g,0,11.6,320,12,'t',.44,'#2a2030');ao(g,0,11.6,320,3,'t',.3,'#1a1420');
  ao(g,0,12,10,92,'l',.24,'#2a2030');ao(g,310,12,10,92,'r',.24,'#2a2030');ao(g,0,96,320,8,'b',.22,'#2a2030');
  /* the door to the street, at the right: by day the colonnade across the way; before sunrise a paling sky; at night the stars */
  R(g,228,32,72,72,'#2a221c');
  if(v==='n'){g.fillStyle=lg(g,0,36,0,104,['#141c3c','#222a4c','#34364a'].map(c=>earth13(c,.22)));g.fillRect(232,36,64,68);for(let i=0;i<9;i++)R(g,236+r()*56,40+r()*20,.8,.8,'rgba(230,236,255,.8)');R(g,232,88,64,16,'#3a3848')}
  else{g.fillStyle=lg(g,0,36,0,70,v==='m'?['#4a5c8c','#c8b4a8']:['#78a8d8','#dfe8e2']);g.fillRect(232,36,64,34);R(g,232,62,64,26,v==='m'?'#4a4658':'#6a6070');R(g,232,58,64,4,v==='m'?'#9a9288':ST);R(g,232,54,64,4,v==='m'?'#7a5444':RO);
    for(let i=0;i<4;i++)col(g,240+i*16,88,26,4,v==='m'?'#9a9288':ST,{fl:2});g.fillStyle=lg(g,0,88,0,104,v==='m'?['#7a7468','#8a8274']:['#cdc09e','#d8cdae']);g.fillRect(232,88,64,16)}
  boardW13(g,226,30,76,3.6,'#6a4e2c',rw);boardW13(g,226,30,3.6,74,'#5a4226',rw,1);boardW13(g,298.4,30,3.6,74,'#5a4226',rw,1);ao(g,229.6,33.6,6,70,'l',.3,'#2a2030');
  /* the floor: trodden earth. It is laid before what stands on it, so that each thing stands on it with its own soft shadow (nothing
     painted between the door and here takes from r, so the floor's specks lie where they always did) */
  g.fillStyle=lg(g,0,103,0,144,['#a6946e','#b4a47e','#c0b28c']);g.fillRect(0,103,320,41);tex(g,'mott',.3,0,103,320,41,'overlay',1);tex(g,'grain',.16,0,103,320,41,'overlay',.5);
  for(let i=0;i<120;i++){const k=r(),y=104+k*40;R(g,r()*320,y,1+k*2.2,.5+k*.5,r()<.5?'rgba(80,62,40,.25)':'rgba(255,240,206,.2)')}
  ao(g,0,103,320,6,'t',.36,'#2a2030');ao(g,0,103,320,2.4,'t',.26,'#1a1420');
  /* the steps to the loft, at the left: two stringers and the treads between them */
  poly(g,[50,104,43,104,11,44,18,44],'#5a4226');poly(g,[32,104,25,104,0,58,0,46],'#6a4e2c');for(let i=0;i<7;i++){const k=i/7,x0=28-k*29,y0=98-k*52;poly(g,[x0,y0,x0+16,y0,x0+15,y0+2.4,x0-1,y0+2.4],'#8a683a');R(g,x0,y0,16,.6,'#b8905a')}
  R(g,0,26,24,20,'#2a221c');ao(g,0,26,24,8,'t',.5);
  /* the shelf with its lamp; cord on pegs, each coil hanging from its own peg at the top of its ring */
  ao(g,135,54,28,4,'t',.3,'#2a2030');boardW13(g,134,52,30,2,'#7a5a34',rw);R(g,144,48.4,8,3.6,'#b8733c');R(g,144,48.4,8,.7,'#e0a064');R(g,151.4,47.6,2.2,1.4,'#b8733c');
  for(const[x,c]of[[82,'#b89a62'],[100,'#8a6a40'],[118,'#c8b078']]){R(g,x-.8,38,1.6,2.6,'#4a3420');g.strokeStyle=tint(c,-.4);g.lineWidth=3.2;g.beginPath();g.ellipse(x,48,4.6,7,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=2;g.stroke();g.strokeStyle=tint(c,.3);g.lineWidth=.5;g.beginPath();g.ellipse(x-.6,48,4.6,7,0,3.6,5.6);g.stroke()}
  /* rolls of cloth between the bench and the door: goat hair, dark and stiff, and paler linen; and a basket of remnants */
  shadow13(g,210,103.4,15,1.6,.42);shadow13(g,312,103.8,9,1.4,.36);
  for(const[x,y,w,h,c]of[[196,103,26,10,GOAT],[198,93,23,9,'#4a3e34'],[200,84.4,20,8,LIN]])clothRoll(g,x,y,w,h,c);
  poly(g,[306,104,318,104,320,94,304,94],'#a8844a');for(let i=0;i<5;i++)stroke(g,[304.6+i*3.4,94.6,305.4+i*3.1,103.6],'rgba(60,40,16,.4)',.5);R(g,303.4,93,17,1.6,'#c8a468');
  for(const[x,y,c]of[[306,93,GOAT],[311,92,LIN],[315,93,'#8a4a3a']]){poly(g,[x,y,x+4,y-.6,x+4.6,y-3.4,x+.4,y-2.8],c)}
  /* the water jar */
  shadow13(g,60.6,104,6.4,1.5,.42);vessel(g,60,104,5,13,'#8a4a2a','pithos',{noShadow:1});
  /* the bench: a long table on two trestles, set at its ends; the shade under its top, and each trestle standing in its own shadow */
  shadow13(g,130,104.4,60,1.3,.26);for(const x of[70,182])shadow13(g,x+3.2,104,6.4,1.3,.44);
  boardW13(g,66,84,126,4,'#8a683a',rw);R(g,66,84,126,.7,'#c8a06a');R(g,66,87.6,126,.8,'#4a3420');
  for(const x of[70,182]){const P=[x,88,x+6,88,x+8,104,x-2,104];poly(g,P,'#5a4226');clipTo(g,()=>poly(g,P),()=>{tex(g,'vert',.16,x-2,88,10,16,'overlay',.5);ao(g,x-2,88,10,4,'t',.3,'#1a1010')});R(g,x,88,6,.6,'#7a5a34')}
  /* light: the lamp on the shelf reaches the bench top, the cloth by the door and the floor round the bench; the doorway gives the
     sky's light; the corner under the loft stays in shade */
  if(v==='n')lightmap(g,320,'#4a4460',l=>{pool(l,148,50,78,64,'#ffd9a0',1);pool(l,140,98,130,42,'#ffcf90',.7);pool(l,130,86,64,8,'#ffe0b0',.4);pool(l,206,92,30,18,'#ffcf90',.3);pool(l,264,70,40,50,'#7a84b8',.4);pool(l,14,70,40,70,'#6a6080',.5,'multiply')});
  else if(v==='m')lightmap(g,320,'#5a5470',l=>{pool(l,148,50,74,62,'#ffd9a0',1);pool(l,136,98,120,40,'#ffcf90',.7);pool(l,130,86,60,8,'#ffe0b0',.36);pool(l,264,74,54,64,'#c8c4d8',.75);pool(l,240,124,90,30,'#b8b4c8',.4);pool(l,14,70,40,70,'#7a7090',.5,'multiply')});
  else lightmap(g,320,'#b0a69c',l=>{pool(l,264,74,84,74,'#fff4d8',.95);pool(l,200,122,170,36,'#ffeecc',.6);pool(l,150,86,80,10,'#fff0d4',.3);pool(l,210,96,26,16,'#fff4d8',.3);pool(l,14,74,44,74,'#9a9098',.5,'multiply')})},
 light:()=>SHOPV()==='n'?{amb:'#8a84a8',lamps:[[148,70,90,'#7a5a30']]}:SHOPV()==='m'?{amb:'#9a94b0',lamps:[[148,70,90,'#6a4e2a']]}:{amb:'#e6dcd4'},
 draw(g,t){benchTop13(g);if(SHOPV()!=='d')flame(g,152,47,t)},front(){}};

/* ---------- The synagogue of Ephesus ---------- */
/* Inside the house whose door Paul went in at on his way home (Acts 18:19): benches along the walls, a low platform with the
   reader's table, and behind it the chest of the scrolls under its cloth. Here Apollos speaks (18:26), and here Paul speaks for
   three months (19:8). Everything in it is invented. */
ART.syn13={w:320,q:12,
 paint(g){const r=rng(1303),W='#dccfaa',S='#c6bca2';
  wall13(g,0,0,320,104,W,r,{patch:0,cracks:4,brick:'#b08a5a',t:.3},[],[[32,13,4],[116,12,3],[202,13,3],[292,12,4]],1333);
  /* the joists of the ceiling, coming toward us from the wall plate (joists13), and the plate */
  const rw=rng(1334);joists13(g,10,44,8,'#5a4226',rw);
  boardW13(g,0,8,320,2.4,'#6a4e2c',rw);ao(g,0,10.4,320,12,'t',.42,'#2a2030');ao(g,0,10.4,320,3,'t',.28,'#1a1420');
  ao(g,0,11,10,93,'l',.24,'#2a2030');ao(g,310,11,10,93,'r',.24,'#2a2030');ao(g,0,96,320,8,'b',.2,'#2a2030');
  /* two windows high in the wall, round-headed, with upright bars */
  for(const x of[84,222]){R(g,x-2,20,18,26,tint(W,-.2));g.save();arch(g,x,22,14,22);g.clip();g.fillStyle=lg(g,0,22,0,44,['#9ab0cc','#d8dcd4']);g.fillRect(x,22,14,22);for(let i=1;i<3;i++)R(g,x+i*4.6-.4,22,.8,22,'#5a4a36');ao(g,x,22,14,5,'t',.4);g.restore();R(g,x-3,46,20,1.6,tint(W,.2))}
  /* the recess with the chest of the scrolls, under its cloth, on a step of stone */
  R(g,136,30,48,62,tint(W,-.24));ao(g,136,30,48,10,'t',.5,'#2a2030');ao(g,136,30,6,62,'l',.3,'#2a2030');
  ao(g,136,84,48,8,'b',.3,'#2a2030');plank13(g,144,58,32,30,'#7a5632',rw);R(g,144,58,32,.8,'#b08a5a');ao(g,144,71,32,4,'t',.34,'#1a1010');R(g,175,58,1,30,'#4a3420');
  g.fillStyle=lg(g,0,52,0,72,['#7e5654','#664242','#4c3030'].map(c=>earth13(c,.16)));g.fillRect(142,52,36,19);R(g,142,70,36,1.2,earth13('#c9a14a',.2));for(let i=0;i<5;i++)R(g,146+i*7,54,.5,12+(i%2)*1.6,'rgba(30,16,40,.3)');
  R(g,132,88,56,4,tint(S,.08));R(g,132,88,56,.7,tint(S,.36));shadow13(g,160,88.4,17,1,.3);
  /* the door to the street, at the left */
  R(g,10,44,36,60,tint(W,-.16));doorArt(g,13,47,30,57,'#5f4428',r,{bands:[],left:1});
  bench(g,56,89,66,S);bench(g,198,89,108,S);
  /* the platform: two low steps of wood across the middle of the house, and the reader's table on it, a scroll lying open across the table */
  boardW13(g,104,100,112,4,'#7a5a34',rw);R(g,104,100,112,.7,'#b8905a');boardW13(g,98,104,124,4.6,'#6a4e2c',rw);R(g,98,104,124,.7,'#a8804a');R(g,98,108.4,124,1.6,'rgba(30,20,40,.4)');
  shadow13(g,160,100.4,30,.9,.3);for(const x of[134.5,185.5])shadow13(g,x,100.2,2.6,.7,.4);
  boardW13(g,130,84,60,3.6,'#8a683a',rw);R(g,130,84,60,.7,'#c8a06a');R(g,130,87.2,60,.8,'#4a3420');boardW13(g,133,88,3,12,'#5a4226',rw,1);boardW13(g,184,88,3,12,'#5a4226',rw,1);ao(g,136,87.6,48,3,'t',.22,'#1a1010');
  R(g,150,82.4,20,1.8,'#e6dcc0');R(g,148,81.8,2.6,2.8,'#b89058');R(g,169.4,81.8,2.6,2.8,'#b89058');
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07,t:.24});ao(g,0,103,320,6,'t',.32,'#3a3050');ao(g,0,103,320,2.4,'t',.24,'#1a1420');
  /* the platform again over the paving, where it stands out into the room, with its shadow laid soft on the stone */
  for(const[d,a]of[[3.4,.12],[1.8,.18]])R(g,98-d*.4,108.6,124+d*.8,d,rgba('#1e1828',a));
  boardW13(g,98,104,124,4.6,'#6a4e2c',rw);R(g,98,104,124,.7,'#a8804a');R(g,100,108.6,122,1.4,'rgba(30,20,40,.3)');
  /* light: the two windows on the wall below them and, long and low, on the floor; the recess keeps its shade, and so do the corners */
  lightmap(g,320,'#a8a0ac',l=>{for(const x of[91,229]){pool(l,x,66,44,70,'#eef0f4',.85);pool(l,x+6,118,46,9,'#f4f0e6',.3)}pool(l,160,118,190,44,'#f4eede',.45);
    pool(l,160,60,30,34,'#8a8498',.4,'multiply');pool(l,0,74,34,80,'#8a8498',.4,'multiply');pool(l,320,74,34,80,'#8a8498',.4,'multiply')})},
 light:{amb:'#dcd6d8'},draw(g){synCast(g)},front(){}};

/* ---------- A street of Ephesus ---------- */
/* One street, seen three times a day. From the left: the way down to the harbor; a colonnade of shops, the last of them a seller
   of wine; the workshop of Aquila and Priscilla; the synagogue; a gap between the houses, with the hill and its theater beyond and
   a sundial against a low wall; the hall of Tyrannus, behind a porch of columns; a fuller's house with his vats at the door; a
   lodging for carriers, under a vine; and a larger house with a bench by its door. Ephesus had colonnades of shops, civic and
   commercial squares, and a theater in the slope of a hill that held some 25,000 (Bearing Thorough Witness, chapter 20, box; Insight,
   "Ephesus"); where the synagogue, the hall or anybody's house stood is not known, and this street is invented. Hours were counted
   from sunrise, twelve to the day (Insight, "Hour"); the publications read for this chapter do not describe a sundial, and the one
   here is the game's own. Its pointer is a bronze rod that leans out over the hollow of the stone, and nothing stands upright across a line.
   v: m in the morning, n at midday, e in the evening; f is the morning of the fire. */
const HX0=376,HX1=478;   /* the front of the hall */
ART.street13={w:640,q:12,variant:()=>STREETV(),
 paint(g,v0){const v=v0==='f'?'m':v0,r=rng(1305),W1='#e0d2ae',W2='#d6c59c',W3='#e6dabb',eve=v==='e',noon=v==='n';
  sky(g,640,64,SKY[v]);if(eve){cloud(g,120,16,70,5,r,'#ffd8b0','#9a7a9a');cloud(g,420,10,60,4,r,'#ffd8b0','#9a7a9a')}else if(!noon){cloud(g,90,12,56,4,r);cloud(g,500,9,50,4,r)}
  /* the hill, with the theater in its hollow: tiers of seats that follow the slope, far off; and the hills beyond */
  ridge(g,0,640,66,x=>9+5*Math.sin(x/61+2)+3*Math.sin(x/23),['#9aa6b6','#a8b0aa']);
  ridge(g,286,420,70,x=>30*Math.exp(-Math.pow((x-350)/44,2))+2*Math.sin(x/7),['#b9b184','#a59c6c']);
  R(g,318,68,62,18,'#a39a68');for(let i=0;i<7;i++)foliage(g,324+i*9+r()*4,78+r()*5,5,2.4,'#6f8250',r,16);
  {g.save();g.beginPath();g.rect(318,24,62,62);g.clip();theater(g,349,70,56,23,2.4,{n:8,k:.36});g.restore();for(const[x,y,h]of[[325,80,11],[374,78,12]])cypress(g,x,y,h)}
  /* at the left, the way down to the harbor: the street falls away between two walls, and beyond it lie the basin and the sea */
  R(g,0,48,56,56,'#b8c6d0');R(g,0,56,56,4.6,'#5f8fb4');R(g,0,56,56,.6,'#a8cce0');ridge(g,0,56,56,x=>3+2*Math.sin(x/9+1),['#93a3b4','#a2aeb0']);
  R(g,0,60.6,56,6,'#a8a070');R(g,6,62,30,3.4,'#4f7fa4');R(g,6,62,30,.5,'#a8cce0');for(const x of[12,24])poly(g,[x,64.6,x+8,64.6,x+7,66,x+1,66],'#5a3c20');
  poly(g,[16,104,40,104,31,66.6,25,66.6],'#cfc2a0');poly(g,[0,104,16,104,25,66.6,20,66.6,0,76],'#b3a78a');poly(g,[40,104,56,104,56,74,35,66.6,31,66.6],'#a39880');ao(g,0,66,56,10,'t',.25,'#2a2440');
  /* the colonnade of shops: pots, bronze, and at its end the seller of wine, with jars leaning by his door */
  colonnade(g,56,104,96,56,5,ST,{back:()=>{R(g,60,60,88,44,'#6a5c58');for(const[x,c]of[[66,'#b8863c'],[75,'#a8742e'],[86,'#9a5a36'],[97,'#8a4a2a']])vessel(g,x,103,3,7+((x*7)%4),c,x>80?'jar':'jug');
    for(let i=0;i<3;i++){R(g,64+i*8,68,3.4,4.2,'#c49448');R(g,64+i*8,68,3.4,.6,'#f0d088')}
    R(g,122,64,22,40,'#3a2c22');doorArt(g,124,66,18,38,'#6a4a2c',r,{bands:[]})}});
  for(const[x,h]of[[112,13],[118,12]]){g.save();g.translate(x,104);g.rotate(.2);vessel(g,0,0,3,h,'#a8642e','amph',{noShadow:1});g.restore()}
  /* the workshop: a house front with a wide opening onto the street, and an awning over it */
  house(g,152,30,86,74,W1,r,{patch:2,cracks:0,beams:14});skipCracks13(r,3);R(g,151,25.6,88,2,'#b8603c');for(let i=152;i<238;i+=4)R(g,i,25.6,.5,2,'rgba(90,40,24,.35)');
  R(g,166,52,58,52,'#2a221c');wood(g,164,49,62,3.4,'#6a4e2c');for(const[x,h,c]of[[172,12,GOAT],[186,9,'#4a3e34'],[200,13,GOAT],[212,8,LIN]])clothRoll(g,x,103,9,h,c);
  ao(g,166,52,58,14,'t',.6);ao(g,166,52,8,52,'l',.5);windowArt(g,230,60,6,8,W1,{shut:1});awning(g,160,44,70,9,earth13('#3f6f8a',.3),'#e0d2a8',7);
  /* the synagogue: dressed stone below, plaster above, and a door in a frame of stone under a plain lintel */
  house(g,238,26,84,78,W3,r,{patch:1,cracks:0,beams:0});skipCracks13(r,3);R(g,237,21.6,86,2,'#b8603c');ashlar(g,238,84,84,20,'#cfc5a8',r,{bw:13,bh:5,v:.1});
  for(const x of[248,300]){R(g,x-1.6,44,12.2,14,tint(W3,-.2));R(g,x,45.6,9,11,'#2a2420');for(let i=1;i<3;i++)R(g,x+i*3-.4,45.6,.8,11,'#6a5a44')}
  R(g,264,58,32,46,tint(W3,-.14));doorArt(g,268,62,24,42,'#5f4428',r,{bands:[]});R(g,262,54,36,4.4,ST);R(g,262,54,36,.7,'#f4ecd6');
  /* the gap: a low wall, a stone bench, and the sundial on its pillar against the wall */
  ashlar(g,322,84,54,20,'#c9bfa4',r,{bw:12,bh:5,v:.1});R(g,322,82.6,54,1.8,tint(ST,.1));R(g,322,82.6,54,.6,tint(ST,.36));
  R(g,352,96,20,2.4,tint(ST,.1));R(g,352,96,20,.6,tint(ST,.36));R(g,353,98.4,3,5.6,tint(ST,-.2));R(g,368,98.4,3,5.6,tint(ST,-.24));
  dialArt(g,336,104,v==='m'?0:noon?1:2);
  /* the hall: three steps, a porch of four columns under a deep beam and a low roof, and the door behind them */
  R(g,HX0,34,HX1-HX0,64,'#cfc4a6');plaster(g,HX0,34,HX1-HX0,64,'#d8ccac',r,{patch:1,cracks:0});skipCracks13(r,3);
  for(const x of[392,452]){windowArt(g,x,52,10,12,'#d8ccac',{shut:noon||eve?1:0,bars:noon||eve?0:2})}
  R(g,414,54,28,44,'#2a2018');R(g,412,50,32,4,tint(ST,.04));R(g,412,50,32,.7,'#f4ecd6');R(g,412,54,2.4,44,tint(ST,-.14));R(g,441.6,54,2.4,44,tint(ST,-.2));
  comp(g,'multiply',.42,()=>R(g,HX0,34,HX1-HX0,64,'#8a86b0'));
  for(let i=0;i<3;i++){R(g,HX0-4+i*1.6,98+i*2,HX1-HX0+8-i*3.2,2,tint(ST,-.03*i));R(g,HX0-4+i*1.6,98+i*2,HX1-HX0+8-i*3.2,.6,'rgba(255,248,226,.55)')}
  poly(g,[HX0-5,28,HX1+5,28,HX1,20,HX0,20],RO);for(let i=HX0;i<HX1;i+=5)stroke(g,[i,28,i+(427-i)*.03,20],'rgba(80,36,24,.3)',.5);R(g,HX0-5,27.4,HX1-HX0+10,.8,'#d88a5c');
  R(g,HX0-3,28,HX1-HX0+6,6,ST);R(g,HX0-3,28,HX1-HX0+6,.6,tint(ST,.3));R(g,HX0-3,33.4,HX1-HX0+6,.6,tint(ST,-.3));
  for(const x of[386,408,446,468])col(g,x,98,64,6.4,ST,{fl:3});
  /* the fuller's house: his vats by the door, and cloth laid over a rail to dry, the rail's posts at its ends */
  house(g,478,36,60,68,W2,r,{patch:2,cracks:0,beams:12});skipCracks13(r,3);R(g,477,31.6,62,2,'#b8603c');doorArt(g,498,64,20,40,'#6a4a2c',r,{bands:[]});windowArt(g,484,48,8,8,W2,{shut:1});
  for(const[x,c]of[[488,'#8a7a6a'],[527,'#7a6a5a']]){vessel(g,x,104,5.4,8,c,'bowl');R(g,x-3.4,96.6,6.8,1,'#a8b4b8')}
  /* the carriers' lodging, under its vine */
  house(g,538,40,52,64,W1,r,{patch:2,cracks:0,beams:13});skipCracks13(r,3);R(g,537,35.6,54,2,'#b8603c');doorArt(g,554,64,20,40,'#7a5632',r,{bands:[]});
  stroke(g,[578,104,577,80,572,62,560,57],'#5a4a36',1.2);foliage(g,562,56,15,5,'#5f7a44',r,90);foliage(g,578,64,5,9,'#6c8a4c',r,40);
  /* the larger house: a door in a frame of dressed stone, a barred window, and a stone bench */
  house(g,590,28,50,76,W3,r,{patch:1,cracks:0,beams:0});skipCracks13(r,3);R(g,589,23.6,52,2,'#b8603c');R(g,602,56,30,48,tint(ST,-.1));R(g,602,56,30,1,tint(ST,.3));doorArt(g,606,60,22,44,'#5f4428',r,{bands:[]});
  windowArt(g,594,42,7,8,W3,{bars:2});R(g,592,98,9,2,tint(ST,.1));R(g,592,98,9,.6,tint(ST,.36));R(g,593,100,2.4,4,tint(ST,-.2));
  /* cracks in two tones, set by hand high on the house fronts, where they run to no head (their own seed: the street keeps its shape) */
  {const rc=rng(1339);for(const[x,y,n]of[[158,35,3],[234,34,3],[243,31,3],[317,31,3],[381,38,3],[473,38,2],[533,41,3],[543,45,3],[635,33,3]])crack13(g,x,y,n,rc,.9)}
  pave(g,0,103,640,144,'#cdc09e',r,{vx:320,vy:58,rows:4,step:44,v:.07,t:.24});ao(g,0,103,640,6,'t',.32,'#3a3050');ao(g,0,103,640,2.4,'t',.22,'#1a1420');
  /* each thing that stands at the foot of the fronts stands in its own soft shadow */
  for(const[x,rx]of[[66,4],[75,4],[86,4],[97,4],[115,6],[336,8],[362,11],[488,7],[527,7],[596,5]])shadow13(g,x+1,104.2,rx,1.1,.34);
  /* the light of the hour */
  if(v==='m'){shade(g,[0,104,640,104,640,121,0,124],SH,.36);comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,640,0,['rgba(120,130,190,.7)','rgba(255,230,170,.7)']);g.fillRect(0,0,640,144)});pool(g,560,0,300,150,'#fff0cc',.12,'screen')}
  else if(noon){shade(g,[0,104,640,104,640,107.4,0,107.8],'#7a7eb4',.6);comp(g,'screen',.2,()=>R(g,0,0,640,144,'#fff6dc'));comp(g,'soft-light',.5,()=>R(g,0,60,640,84,'#fff2c8'));pool(g,320,10,420,160,'#fffbe6',.16,'screen')}
  else{comp(g,'multiply',.62,()=>R(g,0,0,640,144,'#8f84b4'));comp(g,'soft-light',.6,()=>{g.fillStyle=lg(g,0,0,640,0,['rgba(255,190,120,.9)','rgba(110,100,170,.8)']);g.fillRect(0,0,640,144)});
    /* lamps: one in each window and doorway where somebody is at home */
    for(const[x,y,w,h]of[[484,48,8,8],[594,42,7,8],[248,45.6,9,11]]){comp(g,'screen',.75,()=>R(g,x,y,w,h,'#ffc878'));}
    /* in the workshop a lamp stands low at the back: its light lies along the floor and fades upward into the dark under the beam, never
       as a round glow where a head comes to stand; the rolls of cloth stand dark against it, lit only along their tops */
    clipTo(g,()=>{g.beginPath();g.rect(166,52,58,52)},()=>{comp(g,'screen',.8,()=>{g.fillStyle=lg(g,0,58,0,104,['rgba(255,200,120,0)','rgba(255,200,120,.34)','rgba(255,196,116,.8)']);g.fillRect(166,52,58,52)});
      ao(g,166,52,10,52,'l',.4,'#2a1a10');ao(g,214,52,10,52,'r',.4,'#2a1a10')});
    litLayer(g,640,'#6a5a68',l=>{for(const[x,h,c]of[[172,12,GOAT],[186,9,'#4a3e34'],[200,13,GOAT],[212,8,LIN]])clothRoll(l,x,103,9,h,c)},l=>pool(l,196,84,40,10,'#ffb868',.5));
    for(const[x,y,rx,ry,a]of[[195,100,60,34,.5],[508,96,34,30,.42],[564,96,30,28,.42],[617,96,34,30,.45],[133,96,26,26,.38]])pool(g,x,y,rx,ry,'#ffb868',a,'screen')}},
 light:()=>{const v=STREETV();return v==='e'?{amb:'#a89ac0',lamps:[[195,96,50,'#6a4a20'],[508,96,30,'#5a4018'],[564,96,28,'#5a4018'],[617,96,30,'#5a4018'],[133,96,26,'#4a3414']]}:v==='n'?null:{amb:'#f0e8dc'}},
 draw(g,t){streetDraw(g,t)},front(){}};
/* dialArt: the sundial on its pillar, in the street, its foot at x,y. A block of pale stone with a hollow like a quarter of a bowl cut into
   its face; three notches on the rim of the hollow (morning, midday, evening), and a bronze pointer leaded into its top that leans out
   over the hollow and to the side. Its shadow is a wedge that lies in the hollow and points at one notch (k: 0, 1 or 2), and the rim on
   the sun's side shades the hollow under it. No line is upright across another. The close view (dial13) paints the same stone. */
function dialArt(g,x,y,k){const C='#e2dccb',w=11,h=9,ph=13,bx=x-w/2,by=y-ph-h,cy=by+1.6,rx=w/2-1.2,ry=h-2.6,sx=1-k,hi=1-Math.abs(sx);
  /* its shadow on the wall behind, away from the sun */
  comp(g,'multiply',.4,()=>{poly(g,[bx-sx*4,by+1.5+3*hi,bx+w-sx*4,by+1.5+3*hi,bx+w-sx*4,y-.6,bx-sx*4,y-.6],'#8a84b4')});
  /* the pier, as wide as the head, on a foot a little wider, with a groove where the head sits on it */
  g.fillStyle=lg(g,bx,0,bx+w,0,[tint(C,-.04),tint(C,-.12),tint(C,-.2)]);g.fillRect(bx+.5,y-ph,w-1,ph);R(g,bx+w-1.5,y-ph,1,ph,tint(C,-.34));R(g,bx+.5,y-ph,.5,ph,tint(C,.12));
  R(g,bx+.5,y-ph,w-1,.6,tint(C,-.42));R(g,bx-.6,y-1.6,w+1.2,1.6,tint(C,-.24));R(g,bx-.6,y-1.6,w+1.2,.5,tint(C,.08));
  g.fillStyle=lg(g,0,y-5,0,y,['rgba(110,96,76,0)','rgba(110,96,76,.35)']);g.fillRect(bx+.5,y-5,w-1,3.4);
  /* the head: its front lit, its right side in shade, its top edge catching the light */
  g.fillStyle=lg(g,bx,by,bx+w,by+h,[tint(C,.08),C,tint(C,-.08)]);g.fillRect(bx,by,w,h);R(g,bx+w-1,by,1,h,tint(C,-.3));R(g,bx,by,w,.6,tint(C,.34));R(g,bx,by+h-.5,w,.5,tint(C,-.3));
  clipTo(g,()=>{g.beginPath();g.rect(bx,by,w,ph+h)},()=>{tex(g,'mott',.5,bx,by,w,ph+h,'overlay',.5);tex(g,'grain',.2,bx,by,w,ph+h,'overlay',.5)});
  /* the hollow: dark under its lip, lit where it turns up, with the light caught on its lower rim */
  g.save();g.beginPath();g.ellipse(x,cy,rx,ry,0,0,Math.PI);g.closePath();g.clip();
  g.fillStyle=lg(g,0,cy,0,cy+ry,[tint(C,-.5),tint(C,-.26),tint(C,.04)]);g.fillRect(x-rx,cy,rx*2,ry);
  comp(g,'multiply',.6,()=>{g.beginPath();g.rect(x-rx-1,cy-1,rx*2+2,ry+2);g.ellipse(x-sx*rx*.42,cy+ry*(.1+.12*Math.abs(sx)),rx,ry,0,0,6.2832);g.fillStyle='#857ea6';g.fill('evenodd')});
  const a=[2.5,1.5708,.64][k],tx=x+Math.cos(a)*rx*.86,ty=cy+Math.sin(a)*ry*.86,nx=-(ty-cy),ny=tx-x,nl=Math.hypot(nx,ny);
  comp(g,'multiply',.85,()=>poly(g,[x+nx/nl*.9,cy,tx,ty,x-nx/nl*.9,cy],'#5a5286'));g.restore();
  g.lineWidth=.5;g.strokeStyle=tint(C,.3);g.beginPath();g.ellipse(x,cy,rx+.3,ry+.3,0,.3,Math.PI-.3);g.stroke();R(g,x-rx,cy-.5,rx*2,.5,tint(C,-.5));
  for(const q of[2.5,1.5708,.64])R(g,x+Math.cos(q)*(rx+.6)-.5,cy+Math.sin(q)*(ry+.6)-.5,1,1,tint(C,-.52));
  /* lichen, and the green the rain has washed down from the bronze */
  R(g,x-.2,by+.6,1,1,'rgba(80,150,120,.5)');for(const[px,py,c]of[[bx+1.4,by+h-1.4,'#c0a666'],[bx+w-2.6,y-4,'#a2a688'],[bx+2,y-8.5,'#bca468']])R(g,px,py,.5,.5,c);
  /* the pointer: bronze, leaded into the top of the stone, leaning out over the hollow and to the side */
  R(g,x-1,by-.4,2,.6,'#9a98a0');poly(g,[x-.6,by,x+.4,by+.2,x+3.4,by-3.4,x+2.8,by-3.8],'#5e4a2c');stroke(g,[x-.3,by-.2,x+3,by-3.6],'#c8a464',.35);R(g,x+1.2,by-1.8,.6,.6,'rgba(98,164,138,.9)')}

/* ---------- The road above the city ---------- */
/* He came through the inland regions and down to Ephesus (Acts 19:1). The road comes over a shoulder of the hills, and the whole of
   it lies below: the harbor, kept open by dredging and joined to the sea by the river; the city between its two hills, with the
   theater in the slope of one; and far off in the plain a temple that was counted among the wonders of the world: about 50 meters by
   105, with a hundred columns some 17 meters high (Insight, "Ephesus"; Bearing Thorough Witness, chapter 20, box). It is seen from
   outside and from afar, nobody names it, and Paul has no word for it. The sea closes the view at one level, and no upright stands
   across that line. */
ART.road13={w:320,q:12,
 paint(g){const r=rng(1307),HZ=58;
  sky(g,320,HZ+2,SKY.m);cloud(g,70,14,60,5,r);cloud(g,236,9,54,4,r);
  /* far off: the hills across the gulf, at the left, and the hills that close the plain, at the right */
  ridge(g,0,170,HZ,x=>(5+3*Math.sin(x/19+1)+3*Math.exp(-Math.pow((x-40)/30,2)))*clamp((170-x)/60,0,1),['#93a3b6','#a8b4ba']);
  ridge(g,160,320,HZ,x=>(3.4+2.6*Math.sin(x/23+2)+1.6*Math.sin(x/9))*clamp((x-160)/70,0,1),['#a3acac','#b6baa6']);
  /* the plain, paler toward the horizon */
  g.fillStyle=lg(g,0,HZ,0,106,['#cdd0a6','#b6b880','#a4a66a','#989a5c']);g.fillRect(0,HZ,320,48);
  /* the gulf, at the left, behind a shore that runs away to the horizon; shoreX: where the shore lies at the height y */
  const SHORE=[188,HZ,172,60.4,150,63.4,128,66.4,104,70,84,74.6,60,80,34,88,0,97],
    shoreX=y=>{for(let i=2;i<SHORE.length;i+=2)if(y<=SHORE[i+1]){const k=(y-SHORE[i-1])/(SHORE[i+1]-SHORE[i-1]);return SHORE[i-2]+(SHORE[i]-SHORE[i-2])*k}return 0};
  {const P=[0,HZ].concat(SHORE);poly(g,P);g.fillStyle=lg(g,0,HZ,0,98,['#9cc0d2','#6398be','#4179a8']);g.fill();
    clipTo(g,()=>poly(g,P),()=>{for(let i=0;i<80;i++){const y=HZ+1+r()*38;R(g,r()*190,y,(1.5+r()*5)*(y-HZ+6)/30,.5,'rgba(224,240,246,.4)')}});
    }
  tex(g,'mott',.28,0,HZ,320,48,'overlay',1);
  /* fields: strips that lie flat on the plain, and grow thin with distance */
  for(let i=0;i<34;i++){const d=r(),y=HZ+2.4+d*d*40,x=shoreX(y)+10+r()*(300-shoreX(y)),w=(8+r()*24)*(.3+d),h=.5+d*2.2;
    poly(g,[x,y,x+w,y-.3,x+w+h*1.6,y+h,x+h*1.6,y+h+.3],['rgba(236,218,134,.3)','rgba(104,140,76,.26)','rgba(170,136,92,.2)'][i%3])}
  /* the river: it comes out of the far plain as a thread, winds, and widens as it nears, and runs into the harbor; and from the harbor a
     channel runs on to the sea. Each is one ribbon of water that grows wider along its way: it has no end that stops short, the river's
     mouth lies inside the basin, and the channel's opens through a gap in the shore. */
  const RIV=[[324,60.9],[300,60.4],[282,61.6],[264,61],[246,62.6],[230,62],[212,64],[196,63.6],[180,66],[164,67.6],[150,71.4],[140,75.6],[132,79.2],[124,80.6]],
    CHAN=[[118,80.8],[104,80.6],[92,79.8],[82,78.6],[74,77.7],[66,76.8],[58,75.8]],
    riverY=x=>{for(let i=1;i<RIV.length;i++)if(x>=RIV[i][0]){const k=(x-RIV[i][0])/(RIV[i-1][0]-RIV[i][0]);return RIV[i][1]+(RIV[i-1][1]-RIV[i][1])*k}return 99},
    wet=(x,y)=>(x>54&&x<142&&y>73&&y<86)||(x>=138&&Math.abs(y-riverY(x))<3),
    ribbon=(P,w0,w1,c)=>{const Q=[P[0]],mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];for(let i=1;i<P.length-1;i++){const a=mid(P[i-1],P[i]),b=mid(P[i],P[i+1]);for(let u=0;u<1;u+=.25)Q.push([(1-u)*(1-u)*a[0]+2*u*(1-u)*P[i][0]+u*u*b[0],(1-u)*(1-u)*a[1]+2*u*(1-u)*P[i][1]+u*u*b[1]])}Q.push(P[P.length-1]);
      const L=[],Rr=[];Q.forEach((q,j)=>{const a=Q[Math.max(0,j-1)],b=Q[Math.min(Q.length-1,j+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1,t=j/(Q.length-1),hw=(w0+(w1-w0)*Math.pow(t,1.6))/2;L.push(q[0]-dy/d*hw,q[1]+dx/d*hw);Rr.unshift(q[0]+dy/d*hw,q[1]-dx/d*hw)});poly(g,L.concat(Rr),c)};
  ribbon(RIV,.6,3.2,'#3f78a8');ribbon(RIV,.2,1.2,'#8cc0dc');
  /* the channel is drawn on the land only: where it reaches the shore, the sea itself is its mouth */
  g.save();g.beginPath();g.rect(0,0,320,144);g.moveTo(0,HZ);for(let i=0;i<SHORE.length;i+=2)g.lineTo(SHORE[i],SHORE[i+1]);g.closePath();g.clip('evenodd');ribbon(CHAN,2.6,4.6,'#4a82b0');ribbon(CHAN,.8,2,'#6aa0c4');g.restore();
  /* the basin: long, low and straight-sided, with a quay of stone on the city's side. Never a round pool: whoever walks on the road
     has his head in front of it, and a round pool behind a head is a ring round it */
  poly(g,[103,79.3,110,78.4,131,78.3,138.6,79.4,139.4,81.3,133,82.7,109,82.9,102.4,81.9],'#3f78a8');poly(g,[107,79.8,112,79.3,130,79.2,135.4,80,135.8,80.9,131,81.7,111,81.9,106.6,81.2],'#5d94bc');
  stroke(g,[109.4,83.2,132.8,83],'#d6ccae',.8);
  /* the shallows and the sand along the shore, on either side of the channel's mouth */
  for(const part of[SHORE.slice(0,10).concat([77,76.2]),[65,78.9].concat(SHORE.slice(12))]){stroke(g,part,'rgba(176,218,224,.75)',1.6);stroke(g,part,'#ddd3a4',.6)}
  for(const[x,y,a]of[[114,80.5,.1],[123,81.3,-.12],[130,80,.16]]){g.save();g.translate(x,y);g.rotate(a);poly(g,[-3.4,0,-1.6,-1.1,2,-1.1,3.6,0,2,1.1,-1.6,1.1],'#5a3c20');poly(g,[-2,0,-1,-.5,1.6,-.5,2.4,0,1.6,.5,-1,.5],'#c8a674');g.restore()}
  /* far off in the plain, beyond the river: the temple, small, its columns more than a pixel across; trees about it */
  {const x=254,y=67;R(g,x-3,y,36,1.4,'#cfc6ac');R(g,x-1.6,y-1,33,1.2,'#d8cfb6');R(g,x,y-10,30,9,'#8a849a');for(let i=0;i<7;i++)R(g,x+.6+i*4.3,y-10,1.8,9,i%2?'#ece4d0':'#e2dac4');R(g,x-1,y-12.4,32,2.6,'#ece4d0');R(g,x-1,y-12.4,32,.6,'#ffffff');poly(g,[x-1,y-12.4,x+31,y-12.4,x+15,y-16.4],'#ddd4bc');
    for(const[tx,ty,h]of[[248,68,6],[290,68.4,7],[296,69,5]])cypress(g,tx,ty,h)}
  /* the hill with the theater in its slope: it grows out of the plain, its foot the color of the plain, its far side in shade */
  {const f=x=>25*Math.exp(-Math.pow((x-198)/31,2))*(1+.05*Math.sin(x/3.4))+3*Math.exp(-Math.pow((x-232)/16,2)),P=[148,97];for(let x=148;x<=262;x+=1)P.push(x,97-f(x));P.push(262,97);
    poly(g,P);g.fillStyle=lg(g,0,70,0,97,['#c6bd8c','#b2ad78','#a4a66a']);g.fill();
    clipTo(g,()=>poly(g,P),()=>{g.fillStyle=lg(g,160,0,258,0,['rgba(255,246,214,.22)','rgba(70,64,110,0)','rgba(70,64,110,.2)','rgba(70,64,110,.46)']);g.fillRect(148,60,120,40);tex(g,'mott',.5,148,66,116,32,'overlay',.7);
      for(let i=0;i<34;i++){const x=154+r()*104,y=97-r()*f(x)*.94;foliage(g,x,y,1.6+r()*2.2,1+r(),'#6f7f4c',r,5)}
      for(let i=0;i<9;i++){const x=160+r()*90,y=97-r()*f(x)*.8;R(g,x,y,2+r()*2,1,'rgba(226,216,186,.6)');R(g,x,y+1,2+r()*2,.6,'rgba(70,60,60,.3)')}})}
  theater(g,186,92,34,13.8,-1.5,{n:6,k:.44,doors:4,hill:'#958c5c'});
  /* the city between the hill and the harbor, and the street that runs from the theater to the ships */
  stroke(g,[170,93,152,89,136,83.6],'#e9e1cb',1.3);
  for(let i=0;i<46;i++){const x=128+r()*62,y=83+r()*14,w=3.6+r()*4,h=2.6+r()*2.2;if(x>166&&x<206&&y<96||y<86+(x-128)*-.02&&x<134)continue;R(g,x,y,w,h,r()<.5?'#e6dabb':'#d8cba6');R(g,x,y,w,1.1,'#b8603c');R(g,x+w-1,y+1.1,1,h-1.1,'#a89c80')}
  /* another hill, nearer, at the right; and trees on the plain, smaller as they stand farther off */
  ridge(g,232,320,104,x=>24*Math.exp(-Math.pow((x-306)/44,2))+2*Math.sin(x/7),['#aaa672','#96965a']);
  for(let i=0;i<16;i++)foliage(g,246+r()*74,104-r()*20*Math.exp(-Math.pow((246+i*4-306)/50,2))-1,2.4+r()*3,1.4+r(),'#6c7c4c',r,8);
  for(let i=0;i<22;i++){const d=r(),y=HZ+5+d*38,x=shoreX(y)+8+r()*(310-shoreX(y)),k=.35+d*.9;if(x>150&&x<262&&y>72||wet(x,y))continue;if(i%3||k<.8)foliage(g,x,y,3.4*k,1.6*k,'#6f8250',r,8);else cypress(g,x,y,7*k)}
  /* the near hillside, where the road comes over: its rim against the plain, grass and rock, and the beaten road */
  {const RIM=[0,100,24,98,52,100.4,86,98.6,120,101,158,99,196,101.4,236,99.4,272,101,300,99,320,100.6];
    comp(g,'screen',.5,()=>{g.fillStyle=lg(g,0,86,0,101,['rgba(236,238,220,0)','rgba(236,238,220,.7)']);g.fillRect(0,86,320,16)});
    poly(g,RIM.concat([320,144,0,144]));g.fillStyle=lg(g,0,98,0,144,['#8f8a58','#a89c70','#bcae86','#c8ba92']);g.fill();
    clipTo(g,()=>poly(g,RIM.concat([320,144,0,144])),()=>{tex(g,'mott',.36,0,96,320,48,'overlay',1);tex(g,'grain',.16,0,96,320,48,'overlay',.5);
      for(let i=0;i<170;i++){const k=r(),y=102+k*42;R(g,r()*320,y,1+k*2.6,.5+k*.6,r()<.5?'rgba(90,76,50,.26)':'rgba(255,244,214,.2)')}
      /* the road: two wheel tracks and the trodden middle, coming over from the left and going down at the right */
      poly(g,[0,124,70,121,150,120,230,117,290,111,320,107,320,117,292,121,232,128,150,132,70,134,0,138],'rgba(214,198,160,.6)');
      for(const dy of[2.4,9.6])stroke(g,[0,124+dy,70,121+dy,150,120+dy,230,117+dy*.9,290,111+dy*.8,320,107+dy*.8],'rgba(110,92,64,.34)',.8)});
    for(let i=0;i<60;i++){const x=r()*320,k=Math.floor(x/32),u=(x-k*32)/32,y=RIM[k*2+1]+(RIM[Math.min(10,k+1)*2+1]-RIM[k*2+1])*u;poly(g,[x-1.2,y+.6,x,y-1.6-r()*2,x+1.2,y+.6],r()<.5?'#6c7a4c':'#7f8a54')}
    for(const[x,y,w,h]of[[60,108,15,6],[254,107,19,7],[150,104.6,9,3.6]]){shadow13(g,x+w*.56,y+.3,w*.6,1.2,.36,'#28222e');poly(g,[x,y,x+w*.3,y-h,x+w*.8,y-h*.8,x+w,y],'#a89c82');poly(g,[x,y,x+w*.3,y-h,x+w*.5,y-h*.4],'#cfc4a8');
      poly(g,[x+w*.5,y-h*.4,x+w*.8,y-h*.8,x+w,y,x+w*.6,y],'rgba(70,60,80,.22)')}
    for(let i=0;i<14;i++)foliage(g,r()*320,103+r()*5,3+r()*4,2,'#6c7a4c',r,12)}
  /* a pine at the left, bent by the wind off the sea: the engine's pine (CONTRIBUTING section 3), leaning hard inland. The clumps of
     needles that stood here before are drawn once more on a canvas that is thrown away, so that the room takes from r all it ever took. */
  {const[,t]=mk(1,1);for(const[x,y,w]of[[21,46,22],[10,54,14],[29,56,15],[19,38,12]])foliage(t,x,y,w,5,'#4f6a3e',r,70)}
  pine(g,8,112,66,'#4f6a3e',{lean:.8,shade:false});
  pool(g,34,116,44,9,'#3a3458',.34,'multiply');pool(g,220,0,240,150,'#fff0cc',.1,'screen')},
 light:null,draw(){},front(){}};

/* ---------- The hall of Tyrannus ---------- */
/* A school's hall for lectures (Acts 19:9), at midday: benches of stone along the wall, a platform with the teacher's chair and a
   desk for a roll, shuttered windows high up, and a door hung with a curtain against the heat. Nothing is known of Tyrannus or of
   his school (Insight, "Tyrannus"; study note on Acts 19:9): all of it is invented. The chest for rolls is a round box with a lid,
   and the desk a solid block with a sloping top: no board stands on a post. */
ART.hall13={w:320,q:12,
 paint(g){const r=rng(1309),W='#dfd3b2',S='#cbc1a6';
  wall13(g,0,0,320,104,W,r,{patch:1,cracks:4,brick:'#b08a5a',t:.3},[[268,30,8,4.6]],[[40,15,3],[126,14,4],[184,14,3],[250,14,4],[306,15,3]],1335);
  R(g,0,10,320,2.4,tint(W,-.2));R(g,0,10,320,.5,tint(W,.1));ao(g,0,12.4,320,12,'t',.4,'#2a2030');ao(g,0,12.4,320,3,'t',.26,'#1a1420');
  /* a painted band along the wall, plain: one color under a line, an earth red worn paler where shoulders have rubbed it */
  {const B=earth13('#b8846a',.12);R(g,0,70,320,34,B);R(g,0,69,320,1.2,'#7a4a3a');R(g,0,70.2,320,.5,tint(B,.16));tex(g,'mott',.22,0,69,320,35,'overlay',1);tex(g,'grain',.14,0,69,320,35,'overlay',.5);
    pool(g,150,82,90,5,tint(B,.2),.22,'source-over')}
  ao(g,0,12,10,92,'l',.24,'#2a2030');ao(g,310,12,10,92,'r',.26,'#2a2030');ao(g,0,96,320,8,'b',.22,'#2a2030');const rw=rng(1336);
  /* three windows high in the wall, their shutters half closed against the sun */
  for(const x of[92,150,208]){R(g,x-2,20,20,22,tint(W,-.2));g.fillStyle=lg(g,0,22,0,40,['#bcd4ec','#f4f2e2']);g.fillRect(x,22,16,18);boards(g,x,22,5,18,2.5,'#7a5632',r);boards(g,x+11,22,5,18,2.5,'#7a5632',r);ao(g,x,22,16,4,'t',.3);R(g,x-3,42,22,1.6,tint(W,.2))}
  /* the door, at the left, and the mended curtain drawn half across it: the street behind it is white with heat */
  R(g,10,36,40,68,tint(S,-.12));R(g,13,39,34,65,'#fff8e2');g.fillStyle=lg(g,0,39,0,104,['#dfeaf2','#fff6dc','#f0e2b8']);g.fillRect(13,39,34,65);
  {const P=[13,39,36,39,34,58,37,80,33,104,13,104];poly(g,P);g.fillStyle=lg(g,13,0,37,0,[tint(GOAT,.14),GOAT,tint(GOAT,-.3)]);g.fill();clipTo(g,()=>poly(g,P),()=>{for(let i=0;i<5;i++)stroke(g,[16+i*4.4,40,15+i*4.6,104],'rgba(0,0,0,.3)',.5);R(g,23,39,3.4,65,tint(GOAT,.2));for(let j=41;j<103;j+=3.4){R(g,22.4,j,.8,.8,'rgba(220,200,160,.6)');R(g,26.2,j+1.7,.8,.8,'rgba(220,200,160,.6)')}})}
  R(g,10,36,40,3,tint(S,.06));R(g,10,36,3,68,tint(S,-.18));R(g,47,36,3,68,tint(S,-.22));
  /* the benches */
  bench(g,58,89,176,S);
  /* the platform, the teacher's chair with its high back, and the desk for a roll */
  R(g,238,100,82,4,tint(S,.06));R(g,238,100,82,.7,tint(S,.36));R(g,238,103.4,82,1,tint(S,-.3));ao(g,238,98,82,2,'b',.2,'#2a2030');
  shadow13(g,297,100.2,13,1,.34);ao(g,280,62,6,38,'r',.22,'#2a2030');plank13(g,286,62,22,38,'#7a5632',rw,1);R(g,286,62,22,1,'#b08a5a');R(g,307,62,1,18,'#4a3420');
  ao(g,286,72,22,8,'b',.3,'#1a1010');boardW13(g,284,80,26,3,'#8a683a',rw);R(g,284,80,26,.7,'#c8a06a');boardW13(g,285,83,3,17,'#5a4226',rw,1);boardW13(g,306,83,3,17,'#5a4226',rw,1);ao(g,288,83,18,4,'t',.3,'#1a1010');
  shadow13(g,261,100.2,12,1,.36);{const D=[250,100,270,100,270,82,250,86];poly(g,D,'#8a683a');clipTo(g,()=>poly(g,D),()=>{tex(g,'vert',.18,250,82,20,18,'overlay',.5);R(g,268.6,82,1.4,18,'rgba(40,26,16,.3)');R(g,250,86,.6,14,'rgba(255,236,200,.2)')})}
  poly(g,[248,86,272,81.4,272,79.6,248,84.2],'#a8804a');R(g,250,99,20,1,'#4a3420');
  /* a round box for rolls, its lid beside it; and the water jar by the door */
  shadow13(g,228.6,104,7.6,1.2,.4);R(g,222,97,12,7,'#9a6a3a');oval(g,228,97,6,1.8,'#6a4424');for(const x of[224.6,227.4,230.2])R(g,x,94.4,2,3,'#e2d4a8');oval(g,214,103.4,5,1.4,'#8a5a30');
  shadow13(g,54.4,104,4.6,1.2,.4);vessel(g,54,104,3.6,11,'#8a4a2a','jar',{noShadow:1});
  pave(g,0,103,320,144,'#c9bd9c',r,{vx:160,vy:60,rows:4,step:46,v:.07,t:.24});ao(g,0,103,320,6,'t',.32,'#3a3050');ao(g,0,103,320,2.4,'t',.24,'#1a1420');
  /* light: the white street in the doorway, which falls far across the floor; the three windows on the wall under them and, long and
     low, on the floor; the shade under the bench; the corner by the platform, away from the door, in a deeper shade */
  lightmap(g,320,'#9a94a6',l=>{pool(l,30,72,60,80,'#fff8e2',1);pool(l,44,124,110,34,'#fff2cc',.8);pool(l,70,112,60,8,'#fff4d8',.3);
    for(const x of[100,158,216]){pool(l,x,62,30,60,'#f4f0e2',.6);pool(l,x+8,116,30,6,'#f6f0e0',.26)}pool(l,180,120,200,40,'#f0e8d8',.4);
    pool(l,146,99,92,5,'#8a8496',.5,'multiply');pool(l,318,70,46,80,'#8e889c',.45,'multiply')})},
 /* what was left under the bench: a pupil's tablet, small and square */
 light:{amb:'#d8d2d6'},draw(g,t){R(g,64,101.4,6,3.4,'#6a4424');R(g,64.8,102,4.4,2.2,'#2a1f16');hallCast(g)},front(){}};

/* ---------- A house in the evening, with one wall taken away ---------- */
/* A close view, and the game's first of a house: one room under a flat roof, seen from the street side as if the front wall were
   gone, with the ground cut through under its floor. A door with its threshold, a hearth, a lamp in its niche, a jar for grain, a
   cloak on its peg, a strongbox, a bed; steps of stone up the outside to the roof, where a mat lies rolled. The account says that
   many confessed and reported their practices openly, and that a good number brought their books together (Acts 19:18, 19); where
   anybody had kept them is invented. A roll is a roll with nothing on it; a charm is a small pouch drawn shut; no sign and no
   writing is shown. There is one room and no upper floor: no wall stands under the middle of a beam. */
const HX=[48,272],HFL=112,HTOP=36;
ART.house13={w:320,q:12,
 paint(g){const r=rng(1311),W='#d6c8a4',S='#b9ad92';
  g.fillStyle=lg(g,0,0,0,144,['#10183a','#1c2448','#2a2c44'].map(c=>earth13(c,.2)));g.fillRect(0,0,320,144);for(let i=0;i<34;i++)R(g,r()*320,r()*30,.8,.8,`rgba(230,236,255,${.4+r()*.5})`);
  /* the ground, cut through: earth, with stones in it */
  g.fillStyle=lg(g,0,HFL+4,0,144,['#6a5a44','#5a4c3a','#4a3e30']);g.fillRect(0,HFL+4,320,144-HFL-4);tex(g,'mott',.34,0,HFL+4,320,30,'overlay',1);tex(g,'grain',.16,0,HFL+4,320,30,'overlay',.5);for(let i=0;i<70;i++)R(g,r()*320,HFL+6+r()*24,1+r()*2.4,.6+r(),r()<.5?'rgba(30,22,16,.4)':'rgba(200,180,140,.16)');
  R(g,0,HFL+1,HX[0]-8,3,'#3a3848');R(g,HX[1]+8,HFL+1,320-HX[1]-8,3,'#3a3848');
  /* the back wall of the room */
  wall13(g,HX[0],HTOP,HX[1]-HX[0],HFL-HTOP,W,r,{patch:2,cracks:4,brick:'#a8845a',top:-.04,bot:-.22,t:.34},[[90,46,7,4.2],[254,52,7,4]],[[70,39,3],[118,39,3],[224,39,4],[264,39,3]],1337);
  const rw=rng(1338);
  /* the two side walls and the roof, cut through: mud brick under plaster, and the roof of clay on reeds on beams, whose cut ends we see
     in the shade under the reeds, a dark line between each end and the reeds so that none hangs from them as a post from a bar */
  for(const x of[HX[0]-8,HX[1]]){R(g,x,HTOP-8,8,HFL-HTOP+12,'#9a7a54');for(let j=0;j<(HFL-HTOP+12)/3;j++)for(let i=-(j%2)*2.6;i<8;i+=5.2)R(g,x+Math.max(0,i)+.3,HTOP-8+j*3+.3,Math.min(4.6,8-Math.max(0,i)-.3),2.4,tint('#a8845a',(r()-.5)*.2));R(g,x,HTOP-8,.8,HFL-HTOP+12,tint(W,-.1));R(g,x+7.2,HTOP-8,.8,HFL-HTOP+12,tint(W,-.3))}
  R(g,HX[0]-8,HTOP-8,HX[1]-HX[0]+16,3.4,'#b8a078');R(g,HX[0]-8,HTOP-8,HX[1]-HX[0]+16,.7,'#d8c8a0');R(g,HX[0]-8,HTOP-4.6,HX[1]-HX[0]+16,2,'#8a7a4a');for(let i=HX[0]-8;i<HX[1]+8;i+=1.4)R(g,i,HTOP-4.6,.6,2,'rgba(50,40,20,.3)');
  R(g,HX[0],HTOP-2.6,HX[1]-HX[0],2.6,'#3a2c20');for(let i=HX[0]+9;i<HX[1]-6;i+=19){R(g,i,HTOP-1.9,3.4,1.9,'#8a683a');R(g,i,HTOP-.6,3.4,.6,'#5a4228')}
  /* the parapet of the roof, at its two ends; a rolled mat and a jar up there */
  for(const x of[HX[0]-8,HX[1]+2]){R(g,x,HTOP-16,6,8,tint(W,-.2));R(g,x,HTOP-16,6,.8,tint(W,.1))}
  clothRoll(g,196,HTOP-8,28,6,'#b89a5a',{k:.3});vessel(g,92,HTOP-8,3.4,9,'#8a4a2a','jar',{noShadow:1});
  /* the steps up the outside, at the right: blocks of stone, each lower than the one before it */
  for(let i=0;i<8;i++){const x=HX[1]+8+i*4.4,h=(HFL+1-(HTOP-8))*(1-i/8);R(g,x,HFL+1-h,4.6,h,tint(S,-.1-.03*i));R(g,x,HFL+1-h,4.6,.7,tint(S,.2))}
  /* the door, in the back wall at the left, shut; its threshold of pale stone in the floor */
  R(g,54,58,28,54,tint(S,-.14));doorArt(g,57,61,22,51,'#5f4428',r,{bands:[]});
  /* the hearth: a low ring of stones against the wall, a pot on it, and a few embers; one stone beside it sits a little proud */
  for(const[x,w]of[[100,6],[106,7],[113,6],[119,5]])R(g,x,105,w-.6,7,tint('#8a8278',(r()-.5)*.2));R(g,103,102,16,3.4,'#2a2420');for(let i=0;i<5;i++)R(g,104+i*3,103,1.6,1.4,i%2?'#d8582c':'#8a2a18');
  vessel(g,111,102,4,6,'#5a4a42','bowl',{noShadow:1});
  /* soot on the wall over the hearth: a soft stain that rises from it and fades, with no edge of its own */
  pool(g,111,96,13,9,'#2a2018',.26,'source-over');pool(g,111.6,84,9,18,'#2a2018',.14,'source-over');
  R(g,125.4,106,6,6,tint('#9a9288',.1));R(g,125.4,106,6,.7,'#c8c0b4');
  /* the lamp in its niche */
  R(g,132,60,13,11,tint(W,-.34));ao(g,132,60,13,5,'t',.4,'#1a1010');ao(g,132,60,3,11,'l',.25,'#1a1010');ao(g,142,60,3,11,'r',.25,'#1a1010');R(g,132,60,13,1,tint(W,-.5));R(g,131.6,70.6,13.8,.6,tint(W,.12));R(g,134.4,67.4,7,2.6,'#b8733c');R(g,134.4,67.4,7,.6,'#e0a064');R(g,140.6,66.8,2,1.2,'#b8733c');
  /* the jar for grain, with its lid; the water jar by the door */
  vessel(g,150,HFL,7,20,'#9a5a36','pithos');R(g,146,91,8,1.6,'#6a4424');vessel(g,90,HFL,3.6,11,'#8a4a2a','jar');
  /* a cloak on its peg: the cloth hangs from the peg itself, wide and uneven, and nothing is tied round it */
  R(g,193,56,2,2.4,'#4a3420');{const P=[186,58,202,58,205,72,203,90,197,92.6,190,91,185,88,184,70];poly(g,P);g.fillStyle=lg(g,184,0,205,0,['#5a3f6a','#7a5a8a','#6a4a7a','#4a3058'].map(c=>earth13(c,.3)));g.fill();clipTo(g,()=>poly(g,P),()=>{for(const x of[189,194,199])stroke(g,[x,60,x-1.4,92],'rgba(20,10,30,.34)',.6);R(g,184,88,22,1.2,'#c9a14a')})}
  /* the strongbox: boards, a lid, and a hasp at its edge */
  shadow13(g,222,HFL+.6,14,1.1,.42);boards(g,210,97,24,15,4.8,'#6a4a2c',r);R(g,209,94,26,3.4,'#7a5632');R(g,209,94,26,.7,'#b08a5a');R(g,231,97,2,3,'#2a2420');
  /* the bed: a low frame on two feet, set at its ends, a mattress and a blanket thrown back */
  shadow13(g,256,HFL+.6,17,1.1,.4);boardW13(g,240,103,31,2.6,'#7a5a34',rw);R(g,240,105.6,2.6,6.4,'#5a4226');R(g,268.4,105.6,2.6,6.4,'#5a4226');
  R(g,241,99,29,4,'#d8ccb0');R(g,241,99,29,.8,'#f0e6cc');poly(g,[252,99,270,99,270,95,258,95.6,252,97],'#8a4a3a');poly(g,[252,99,258,95.6,256,99.6],'#6a3428');oval(g,246,98,4,1.6,'#e6dcc4');
  /* the floor: beaten earth, with the threshold stone set in it under the door */
  R(g,HX[0],HFL,HX[1]-HX[0],4,'#a8946c');R(g,HX[0],HFL,HX[1]-HX[0],.8,'#c8b48a');tex(g,'mott',.5,HX[0],HFL,HX[1]-HX[0],4,'overlay',1);R(g,54,HFL-.6,28,4.6,tint(S,.12));R(g,54,HFL-.6,28,.8,'#e8e0cc');
  ao(g,HX[0],HTOP,HX[1]-HX[0],9,'t',.5,'#1a1020');ao(g,HX[0],HFL-8,HX[1]-HX[0],8,'b',.3,'#1a1020');
  /* one lamp lights the room, from its niche: its light falls outward and downward from the opening, the arch keeps the wall above it in
     shade, and the far corners of the room go dark; outside it is night */
  {const[lc,l]=mk(320*HR,144*HR),bx=HX[0]-8,by=HTOP-8,bw=HX[1]-HX[0]+16,bh=HFL-HTOP+12;l.scale(HR,HR);l.fillStyle='#ffffff';l.fillRect(0,0,320,144);
    clipTo(l,()=>{l.beginPath();l.rect(bx,by,bw,bh)},()=>{l.fillStyle=rg(l,138,90,176,['#c89a80','#b08a7c','#76627e','#564c76']);l.fillRect(bx,by,bw,bh);
      nicheLight(l,138.5,70,48,40,'#ff9a64',.56);pool(l,138,104,70,10,'#ffa870',.28);pool(l,138.5,50,28,14,'#6a5c7a',.55,'multiply');
      pool(l,bx,HFL,40,30,'#6a5c7a',.4,'multiply');pool(l,bx+bw,HFL,40,30,'#6a5c7a',.4,'multiply')});
    g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='multiply';g.drawImage(lc,0,0);g.restore()}
  comp(g,'multiply',.55,()=>{R(g,HX[0]-8,0,HX[1]-HX[0]+60,HTOP-8,'#6a70a8');R(g,HX[1]+8,HTOP-8,60,HFL-HTOP+9,'#6a70a8');R(g,0,HFL+4,320,40,'#7a78a0')});
  pool(g,138.5,68.6,6,3,'#ffd9a0',.45,'screen')},
 light:{amb:'#e8c8a0'},
 draw(g,t){flame(g,141,66,t);houseDraw(g,t)},front(g){houseFront(g)}};

/* ---------- The counting board ---------- */
/* A close view: a board for reckoning, seen from above, on a table in the street. The account says that they calculated the value
   of the books and found it to be fifty thousand pieces of silver (Acts 19:19), and does not say how; the study note leaves open
   which coin was meant. The publications read for this chapter describe no such board: this one is the game's own. Five places,
   from ten thousands at the left to ones at the right, read like a written number. A place is a trough for up to four pebbles and,
   above it, a round hollow for one pebble that counts as five. Beside each trough and each hollow its worth is cut in the letters
   that stood for numbers in the Greek cities of that day (NUM13): alpha for one and epsilon for five, iota for ten and nu for fifty,
   rho for a hundred and phi for five hundred, the same alpha and epsilon with a stroke at the foot for a thousand and five thousand,
   and mu, the myriad, with the alpha or the epsilon over it for ten thousand and fifty thousand. These letters are NOT from the
   publications: Insight ("Number, Numeral") says only that the Jews came to use the letters of their own alphabet as figures, and
   that the Christian Greek Scriptures mostly write numbers out as words. They are the ordinary Greek number letters as they are
   commonly given, put here because the maintainer asked for them; the chapter's page lists them for him to check. He accepts a
   letter among them that is shaped like a cross (CONTRIBUTING section 3); none of these ten is. Nothing else names a place: what
   the letters mean is part of the puzzle. The hotspots are called by their letters, Look says which letter it is (alpha the first of
   the alphabet, epsilon the fifth), the board shows how the places follow one another (five in a trough become one in the hollow,
   two in a hollow one in the next place), and prayer gives the key. (Notches were tried first, and then names under the board.)
   The troughs and hollows are cut into the wood, each by itself: no line is ruled across the board, and apart from those letters
   nothing on it is written. A pebble is several pixels across. */
/* NUM13: for each place, from the left, the letter for one of it and the letter for five of it */
const NUM13=[[{l:'\u039c',sup:'\u03b1'},{l:'\u039c',sup:'\u03b5'}],[{l:'\u0391',low:1},{l:'\u0395',low:1}],[{l:'\u03a1'},{l:'\u03a6'}],[{l:'\u0399'},{l:'\u039d'}],[{l:'\u0391'},{l:'\u0395'}]];
const BW=[44,40,36,32,28],BX=(()=>{const a=[];let x=52;for(const w of BW){a.push(x);x+=w+9}return a})(),BY=26,BH=82;
ART.board13={w:320,q:12,
 paint(g){const r=rng(1313);
  /* warm fine-grained table boards so bottom captions read cleanly */
  {const rb=rng(1340);for(const[y0,y1,c]of[[0,46,'#5c4226'],[46,98,'#523a20'],[98,144,'#463018']])plank13(g,0,y0,320,y1-y0,c,rb,0)}
  for(const y of[46,98]){R(g,0,y,320,.8,'rgba(24,14,6,.45)');R(g,0,y+.8,320,.6,'rgba(190,150,100,.14)')}
  for(let i=0;i<36;i++)R(g,0,i*4.1+r()*1.8,320,.5,r()<.5?'rgba(32,20,10,.16)':'rgba(210,170,118,.08)');
  /* the board: one plank of pale boxwood with soft fine grain so incised Greek numerals stand out clearly */
  R(g,45,BY+3,236,BH,'rgba(18,10,6,.46)');
  shadow13(g,162,BY+BH+1.6,122,2.4,.4,'#120a06');
  /* its grain stays a fine overlay with no long streaks: a streak across an incised letter could make a cross of it */
  g.fillStyle=lg(g,42,BY,42,BY+BH,['#dac092','#ceaf7c','#bfa06d']);g.fillRect(42,BY,236,BH);
  inRect(g,42,BY,236,BH,()=>{tex(g,'wood',.15,42,BY,236,BH,'overlay',.5);tex(g,'mott',.08,42,BY,236,BH,'overlay',.7);
    for(let i=0;i<24;i++)R(g,42,BY+2+i*3.4+r(),236,.5,r()<.5?'rgba(98,70,36,.12)':'rgba(255,244,214,.14)')});
  R(g,42,BY,236,1,'#f0d8aa');R(g,42,BY,1,BH,'#e4c898');R(g,42,BY+BH-1,236,1,'#84643a');R(g,277,BY,1,BH,'#84643a');
  BW.forEach((w,i)=>{const x=BX[i],cx=x+w/2;
    /* the hollow for the pebble that counts as five */
    oval(g,cx,BY+14,8.4,7.4,'#9a7a4c');oval(g,cx+.6,BY+14.8,7.2,6.2,'#b4925e');g.strokeStyle='#6a4a28';g.lineWidth=.8;g.beginPath();g.ellipse(cx,BY+14,8.4,7.4,0,2.6,5.4);g.stroke();
    /* the trough for the pebbles that count as one each: rounded at its ends */
    const tx=cx-7,ty=BY+28,tw=14,th=47;g.beginPath();g.moveTo(tx+5,ty);g.lineTo(tx+tw-5,ty);g.quadraticCurveTo(tx+tw,ty,tx+tw,ty+5);g.lineTo(tx+tw,ty+th-5);g.quadraticCurveTo(tx+tw,ty+th,tx+tw-5,ty+th);g.lineTo(tx+5,ty+th);g.quadraticCurveTo(tx,ty+th,tx,ty+th-5);g.lineTo(tx,ty+5);g.quadraticCurveTo(tx,ty,tx+5,ty);g.closePath();
    g.fillStyle='#9a7a4c';g.fill();g.save();g.clip();R(g,tx+1.4,ty+1.6,tw,th,'#b4925e');R(g,tx,ty,tw,1.6,'#6a4a28');R(g,tx,ty,1.4,th,'#7a5a34');g.restore()});
  /* the letters for the numbers, cut into the wood: a dark stroke with a pale edge. low: a stroke at the foot, for thousands; sup: the small letter over a myriad */
  BW.forEach((w,i)=>{const cx=BX[i]+w/2;NUM13[i].forEach((o,j)=>{const sz=8.4,y=j?BY+15:BY+35;g.font=GFONT(sz);g.textBaseline='middle';const tw=g.measureText(o.l).width,x=cx-(j?11.4:10)-tw;
      for(const[dx,dy,c]of[[.5,.5,'rgba(255,240,206,.55)'],[0,0,'rgba(58,38,20,.92)']]){g.font=GFONT(sz);g.fillStyle=c;g.fillText(o.l,x+dx,y+dy);if(o.low)stroke(g,[x-2.4+dx,y+sz*.56+dy,x-.6+dx,y+sz*.16+dy],c,.9);
        if(o.sup){g.font=GFONT(sz*.7);g.fillText(o.sup,x+dx+tw/2-g.measureText(o.sup).width/2,y+dy-sz*.78)}}})});
  /* the bowl of pebbles, at the right */
  oval(g,298,74,15,12,'rgba(20,12,8,.4)');oval(g,296,71,15,12,'#8a4a2a');oval(g,296,70,12.6,9.8,'#5a2e18');
  for(const[x,y,c]of[[291,68,'#d8d2c4'],[299,66,'#8a8a94'],[296,73,'#c4b8a0'],[303,71,'#e2dccc'],[289,73,'#9a9488'],[297,69,'#b8b0a0']])pebble(g,x,y,c);
  comp(g,'multiply',.4,()=>{g.fillStyle=rg(g,160,60,230,['#ffffff','#8a7a80']);g.fillRect(0,0,320,144)})},
 light:{amb:'#ffffff'},draw(g,t){boardDraw(g)},front(g){boardFront(g)}};
/* pebble: a river pebble seen from above, with its shadow and a light on it */
function pebble(g,x,y,c){oval(g,x+.6,y+.8,4.4,3.4,'rgba(30,20,12,.42)');oval(g,x,y,4.2,3.2,tint(c,-.14));oval(g,x-.4,y-.4,3.4,2.4,c);oval(g,x-1.2,y-1.1,1.6,1,tint(c,.4))}

/* ---------- The province of Asia ---------- */
/* A picture, not a room: the Roman province in the west of Asia Minor, from Pergamum in the north to the valley of the Lycus in the
   south-east, with Ephesus, its capital by now (Insight, "Asia"), on the coast. The places are set where the publications put
   them: Smyrna on the coast, and Pergamum about 80 km north of it and 25 km from the sea; Thyatira about 60 km inland; Sardis
   about 50 km south of Thyatira and 75 km east of Smyrna; Philadelphia about 45 km south-east of Sardis; Laodicea about 150 km east
   of Ephesus, with Hierapolis about 10 km north of it and Colossae about 18 km east-south-east (Insight, under each name). The three
   in the valley of the Lycus stand a little further apart than they lay, so that they can be told apart, and Hierapolis a little to
   the east of north, so that its road leaves the main road as a fork and not at a right angle. A road is a row of dots
   from Ephesus, or from a town on such a road: they branch and never cross, and no name lies on one. Acts says that all who lived
   in the province heard the word (19:10) and not how it came to any of these towns: the roads are the ways home of people who had
   been in the hall, and the picture claims a congregation for none of them (see the study notes on 1 Corinthians 16:9, 19). */
const AXY=(lon,lat)=>[66+(lon-26.2)*62,6+(39.38-lat)*60];
const TOWN={ephesus:{name:'Ephesus',at:[27.34,37.94],lab:[-12.7,1.4,'r']},smyrna:{name:'Smyrna',at:[27.17,38.42],lab:[5,-.6,'l']},pergamum:{name:'Pergamum',at:[27.18,39.12],lab:[5,0,'l']},
  thyatira:{name:'Thyatira',at:[27.84,38.92],lab:[5,-3,'l']},sardis:{name:'Sardis',at:[28.04,38.49],lab:[5,-4,'l']},philadelphia:{name:'Philadelphia',at:[28.52,38.35],lab:[5,0,'l']},
  laodicea:{name:'Laodicea',at:[29.06,37.83],lab:[-4,6,'r']},hierapolis:{name:'Hierapolis',at:[29.25,38.02],lab:[0,-5,'c']},colossae:{name:'Colossae',at:[29.36,37.74],lab:[4,5,'l']}};
/* the roads, each from a town already on a road: [from, to, a point to bend through] */
const ROADS=[['ephesus','sardis',[27.72,38.2]],['ephesus','smyrna',[27.2,38.18]],['sardis','thyatira',[27.96,38.72]],['smyrna','pergamum',[27.08,38.78]],['sardis','philadelphia',[28.3,38.38]],
  ['ephesus','laodicea',[28.2,37.84]],['laodicea','hierapolis',null],['laodicea','colossae',null]];
/* how far the word has been carried, as the story stands: the towns that are shown */
const SHOWN=()=>G.asia13==='all'||F.sum?Object.keys(TOWN):['ephesus'].concat(F.n1?['sardis']:[],F.n2?['smyrna','thyatira']:[]);
/* The coast and the islands, from rough real coordinates (longitude, latitude), as on the travel map: from the north, past the gulf
   below Pergamum, round the long gulf at whose head Smyrna lies, out along the peninsula and back, past Ephesus and the cape opposite
   Samos, and round the gulf of Miletus. Three islands lie off it: Lesbos, Chios and Samos. ASIALINES: the same outlines in picture
   pixels, for the playtest, which checks that no name lies across one. */
const COASTLL=[[26.70,39.38],[26.76,39.24],[26.88,39.08],[27.03,38.94],[26.94,38.86],[26.78,38.70],[26.76,38.60],[26.96,38.50],[27.08,38.47],[27.15,38.43],[27.02,38.39],[26.82,38.37],[26.66,38.42],[26.50,38.40],[26.32,38.30],[26.40,38.20],[26.62,38.16],[26.80,38.19],[26.96,38.07],[27.19,38.00],[27.27,37.95],[27.25,37.86],[27.02,37.69],[27.20,37.62],[27.29,37.53],[27.21,37.40],[27.42,37.30],[27.50,37.10],[27.45,36.96]],
  ISLES=[[26.25,39.15,.36,.19,-.25],[26.02,38.38,.13,.27,.1],[26.83,37.74,.29,.085,-.12]],
  COAST=[].concat(...COASTLL.map(q=>AXY(q[0],q[1]))),
  ISLE=ISLES.map(([lon,lat,rx,ry,rot])=>{const[cx,cy]=AXY(lon,lat),P=[];for(let i=0;i<14;i++){const a=i/14*6.2832,k=1+.1*Math.sin(i*2.3+lon*7),ex=Math.cos(a)*rx*62*k,ey=Math.sin(a)*ry*60*k;P.push(cx+ex*Math.cos(rot)-ey*Math.sin(rot),cy+ex*Math.sin(rot)+ey*Math.cos(rot))}return P}),
  ASIALINES=[COAST].concat(ISLE.map(P=>P.concat(P.slice(0,2))));
let ASIA=null;
function asiaBack(){return ASIA||(ASIA=bake(320,g=>{const r=rng(1315),LAND=[COAST[0],0].concat(COAST,[320,144,320,0]);
    g.fillStyle=lg(g,0,0,320,144,['#1f4c78','#2a618e','#34729c']);g.fillRect(0,0,320,144);tex(g,'mott',.4,0,0,320,144,'overlay',1);for(let i=0;i<170;i++)R(g,r()*150,r()*144,1.5+r()*3,.5,rgba(r()<.5?'#6aa6c8':'#163a60',.35));
    for(const P of[LAND].concat(ISLE)){for(const[w,a]of[[9,.1],[5,.16],[2.4,.3]]){poly(g,P);g.lineWidth=w;g.strokeStyle=rgba('#8cd2d2',a);g.lineJoin='round';g.stroke()}}
    for(const P of[LAND].concat(ISLE)){poly(g,P);g.fillStyle=lg(g,60,0,320,144,['#b8a468','#c2a86c','#b39a62']);g.fill();clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.55,0,0,320,144,'overlay',1);for(let i=0;i<220;i++)oval(g,60+r()*260,r()*144,.8+r()*1.6,.5+r()*.8,rgba(r()<.5?'#d8c08a':'#7a6a3c',.28))});
      poly(g,P);g.lineWidth=.7;g.strokeStyle='#5a4428';g.stroke()}
    /* the valleys, green, running inland from the coast; and the hills between them: small peaks, lit from the north-west. None stands on a road. */
    clipTo(g,()=>poly(g,LAND),()=>{for(const[x,y,rx,ry]of[[176,62,44,7],[186,86,50,6],[236,100,44,6],[150,30,24,8]])pool(g,x,y,rx,ry,'#7f9050',.45,'source-over')});
    for(const[x0,y0,x1,y1]of[[178,74,232,82],[146,44,140,26],[196,18,270,26],[226,116,300,124],[244,52,306,58],[160,112,200,118],[236,80,296,84]]){const n=Math.round(Math.hypot(x1-x0,y1-y0)/5);for(let k=0;k<n;k++){const u=k/n,x=x0+(x1-x0)*u+(r()-.5)*4,y=y0+(y1-y0)*u+(r()-.5)*3,w=2.4+r()*1.6,h=3+r()*2;
      poly(g,[x-w,y,x,y-h,x+w,y],'#7a5c38');poly(g,[x-w,y,x,y-h,x+w*.15,y],'#d6be88')}}
    ao(g,0,0,320,14,'t',.3,'#0a1428');ao(g,0,130,320,14,'b',.3,'#0a1428');ao(g,0,0,16,144,'l',.3,'#0a1428');ao(g,304,0,16,144,'r',.25,'#0a1428')},12))}
/* roadDots: the dots of a road, about 3.4 pixels apart, bent through its point */
function roadDots([a,b,via]){const p=AXY(...TOWN[a].at),q=AXY(...TOWN[b].at),m=via?AXY(...via):[(p[0]+q[0])/2,(p[1]+q[1])/2],L=Math.hypot(m[0]-p[0],m[1]-p[1])+Math.hypot(q[0]-m[0],q[1]-m[1]),n=Math.max(2,Math.round(L/3.4)),o=[];
  for(let i=1;i<n;i++){const u=i/n,c=2*m[0]-(p[0]+q[0])/2,d=2*m[1]-(p[1]+q[1])/2;o.push([(1-u)*(1-u)*p[0]+2*u*(1-u)*c+u*u*q[0],(1-u)*(1-u)*p[1]+2*u*(1-u)*d+u*u*q[1]])}return o}
/* asia13: the scene. What it draws (dots and the boxes of the names) is noted in G.map13, for the playtest. */
function asia13(g,t){g.drawImage(asiaBack(),0,0,320,144);const on=SHOWN(),M=G.map13={dots:[],boxes:[],roads:[],lines:ASIALINES};G.caps13=[];
  for(const rd of ROADS)if(on.includes(rd[0])&&on.includes(rd[1])){const D=roadDots(rd);M.roads.push(D);for(const[x,y]of D){R(g,x-.7,y-.7,1.4,1.4,'#5a2e1c');M.dots.push([x,y])}}
  for(const k of on){const[x,y]=AXY(...TOWN[k].at),E=k==='ephesus';R(g,x-(E?2.4:1.8),y-(E?2.4:1.8),E?4.8:3.6,E?4.8:3.6,'#2a1a12');R(g,x-(E?1.6:1),y-(E?1.6:1),E?3.2:2,E?3.2:2,E?'#ffd978':'#f4e4b8');
    const[dx,dy,side]=TOWN[k].lab,s=T(TOWN[k].name);g.font=GFONT(E?5:4.4);const tw=g.measureText(s).width,tx=side==='r'?x+dx-tw:side==='c'?x+dx-tw/2:x+dx;cap13(g,TOWN[k].name,tx,y+dy,90,E?'#ffe9a8':'#f4e4b8',1,E?5:4.4)}
  M.boxes=G.caps13.map(c=>c.box.concat([c.s]));
  const k=(t/900)%1,[ex,ey]=AXY(...TOWN.ephesus.at);g.strokeStyle=`rgba(255,226,150,${.9*(1-k)})`;g.lineWidth=.6;g.beginPath();g.arc(ex,ey,3+k*6,0,6.2832);g.stroke()}
/* dial13: the sundial, seen close, while its shadow moves from one notch to the next. The head of pale stone stands before the low wall,
   seen a little from above and from the left, so that its top and its right side show: the hollow in its face, the three notches in its
   rim, and the bronze pointer leaded into its top, green where the rain sits on it and where the rain has run down from it. What does
   not move is painted once, in three layers (the wall behind, the stone, the pointer); what moves with the sun is laid between them:
   the dial's shadow on the wall, the light on its side, the shade inside the hollow under the rim on the sun's side, and the wedge of
   the pointer's shadow. u runs from 0 (the morning notch) to 2 (the evening notch); the sun stands on the right in the morning and
   on the left in the evening, high at midday. A frame is put together and dithered only when u has moved. */
const DV={x0:108,x1:192,yt:38,yb:104,dx:16,dy:8,cx:150,by:45,rx:33,ry:49,NOTCH:[2.5,1.5708,.64],raw:null};
function dialBack(g){const r=rng(1319),CY=14;
  /* beyond the wall: the slope of the hill, thick with scrub, and a cypress or two */
  g.fillStyle=lg(g,0,0,0,CY,['#8a8a5c','#7a7c50','#6a7046']);g.fillRect(0,0,320,CY+2);tex(g,'mott',.5,0,0,320,CY+2,'overlay',.6);
  for(let i=0;i<10;i++){const px=r()*320,py=2+r()*(CY-2);oval(g,px,py,6+r()*10,1+r()*1.4,'#a89c72')}
  for(let row=0;row<3;row++)for(let i=0;i<40;i++){const px=r()*330-5,py=row*5+1+r()*4,rx=2.4+r()*3.6,ry=1.4+r()*1.6,c=['#5f7344','#6a7c4a','#56683e','#728250'][Math.floor(r()*4)];
    oval(g,px+.6,py+ry*.6,rx,ry*.8,'rgba(50,46,40,.35)');foliage(g,px,py,rx,ry,c,r,rx*ry*1.2);R(g,px-rx*.4,py-ry*.7,rx*.6,.5,tint(c,.3))}
  for(const[x,h]of[[46,20],[262,17]])cypress(g,x,CY+3,h,'#41593a');
  tex(g,'mott',.3,0,0,320,CY+2,'overlay',1);comp(g,'screen',.16,()=>R(g,0,0,320,CY+2,'#e4e2cc'));
  /* the coping of the low wall: slabs with a lit top and a shaded lip */
  R(g,0,CY,320,5,'#b9ae90');let x=-r()*20;while(x<320){const w=34+r()*22,c=tint('#d2c8aa',(r()-.5)*.1);R(g,x+.4,CY,w-.8,3.2,c);R(g,x+.4,CY,w-.8,.8,tint(c,.32));R(g,x+.4,CY+3.2,w-.8,1.8,tint(c,-.34));x+=w}
  tex(g,'mott',.4,0,CY,320,5,'overlay',.7);
  /* the wall: coursed blocks, weathered, and a little darker than the dial in front of it */
  const WY=CY+5,WH=123-WY;ashlar(g,0,WY,320,WH,'#bdb294',r,{bw:44,bh:17,v:.16,t:.35});
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,WY,0,123,['rgba(70,60,96,.9)','rgba(255,255,255,0)','rgba(255,255,255,0)','rgba(110,92,74,.9)']);g.fillRect(0,WY,320,WH)});
  tex(g,'vert',.07,0,WY,320,WH,'multiply',.8);
  /* rain stains under the coping, and lichen on the blocks */
  for(let i=0;i<12;i++){const sx=r()*320,sl=8+r()*30,sw=3+r()*7;g.fillStyle=lg(g,0,WY,0,WY+sl,['rgba(90,80,66,.24)','rgba(90,80,66,0)']);poly(g,[sx,WY,sx+sw,WY,sx+sw*.7,WY+sl,sx+sw*.2,WY+sl]);g.fill()}
  lichen13(g,r,0,WY,320,WH-4,26);
  /* a caper growing out of a joint low on the left: its stems arch over and hang, with round leaves and two flowers */
  caper13(g,r,34,104);
  /* the paving between the wall and the dial: slabs whose joints stop at the edge of their own row */
  const PY=123;R(g,0,PY,320,21,'#9a8e74');
  {let y=PY,row=0;for(const h of[5,7,9]){let x=-r()*30-(row%2)*18;while(x<330){const w=40+r()*18,c=tint('#c8ba98',(r()-.5)*.12),k0=(y-PY)*.012,k1=(y+h-PY)*.012;
      poly(g,[x+.5+(x-150)*k0,y+.4,x+w-.5+(x+w-150)*k0,y+.4,x+w-.5+(x+w-150)*k1,y+h-.3,x+.5+(x-150)*k1,y+h-.3],c);R(g,x+1+(x-150)*k0,y+.4,w-2,.6,tint(c,.2));x+=w}y+=h;row++}}
  tex(g,'mott',.45,0,PY,320,21,'overlay',.8);tex(g,'grain',.14,0,PY,320,21,'overlay',.5);
  ao(g,0,PY,320,7,'t',.5,'#3a3050');
  /* tufts of grass along the foot of the wall */
  for(let i=0;i<14;i++){const px=r()*320;if(px>98&&px<214)continue;foliage(g,px,PY+.6,2+r()*2.4,1.2+r()*.8,['#7a8a50','#8a924e'][i%2],r,10)}
}
function lichen13(g,r,x,y,w,h,n,skip){for(let i=0;i<n;i++){const px=x+r()*w,py=y+r()*h;if(skip&&skip(px,py))continue;const s=.9+r()*2.2,o=r()<.5,c=o?['#b89a58','#c2a462','#a88a4c'][i%3]:['#a2a688','#b0b296','#8e9478'][i%3];
  for(let k=0;k<3+s*2.5;k++){const a=r()*6.28,d=r()*s;oval(g,px+Math.cos(a)*d*1.3,py+Math.sin(a)*d*.8,.5+r()*.7,.4+r()*.5,tint(c,(r()-.5)*.2))}
  for(let k=0;k<2;k++)R(g,px+(r()-.5)*s*1.6,py+(r()-.5)*s,.5,.5,tint(c,o?.3:-.35))}}
function caper13(g,r,x,y){
  for(const[ex,ey]of[[-12,9],[-5,12],[6,12],[13,8]])stroke(g,[x,y,x+ex*.5,y+1,x+ex,y+ey],'#4e5e34',.5);
  for(let i=0;i<70;i++){const a=Math.PI*(.05+.9*r()),d=Math.sqrt(r()),px=x+Math.cos(a)*d*14*(r()<.5?-1:1)*.95,py=y-2+Math.sin(a)*d*11+(r()-.5)*2,k=r();
    oval(g,px,py,1.1+k*.7,.9+k*.4,['#4e683a','#5e7c44','#6e8e4e','#7e9e58'][Math.floor(r()*4)]);if(k>.6)R(g,px-.5,py-.6,.7,.4,'#a8c07a')}}

/* the dial itself: the head with its hollow, and the pier under it */
function dialStone(g){const r=rng(1321),{x0,x1,yt,yb,dx,dy,cx,by,rx,ry}=DV,C='#e4dccb';
  /* the pier, as wide as the head, its side receding to the right */
  const py=yb+4;
  poly(g,[x1,py,x1+dx,py-dy,x1+dx,150,x1,150],tint(C,-.3));
  g.fillStyle=lg(g,x0,0,x1,0,[tint(C,-.02),tint(C,-.08),tint(C,-.16)]);g.fillRect(x0,py,x1-x0,50);
  /* the moulding between head and pier: a fillet and a hollow, hardly proud of the stone */
  poly(g,[x1,yb,x1+dx,yb-dy,x1+dx,py-dy,x1,py],tint(C,-.42));R(g,x0,yb,x1-x0,1.2,tint(C,-.1));R(g,x0,yb+1.2,x1-x0,2.8,tint(C,-.36));R(g,x0,py-.6,x1-x0,.6,tint(C,-.5));
  /* the head: its top, its front and its side */
  poly(g,[x0,yt,x1,yt,x1+dx,yt-dy,x0+dx,yt-dy],tint(C,.16));
  poly(g,[x1,yt,x1+dx,yt-dy,x1+dx,yb-dy,x1,yb],tint(C,-.26));
  g.fillStyle=lg(g,x0,yt,x1,yb,[tint(C,.06),C,tint(C,-.1)]);g.fillRect(x0,yt,x1-x0,yb-yt);
  /* texture over all the stone: mottling, grain, faint veins, rain streaks */
  clipTo(g,()=>poly(g,[x0,yt,x0+dx,yt-dy,x1+dx,yt-dy,x1+dx,150,x0,150]),()=>{
    tex(g,'mott',.6,x0,yt-dy,x1-x0+dx,150,'overlay',.7);tex(g,'blotch',.3,x0,yt-dy,x1-x0+dx,150,'soft-light',.5);tex(g,'grain',.22,x0,yt-dy,x1-x0+dx,150,'overlay',.5);
    comp(g,'multiply',.12,()=>{g.fillStyle=g.createPattern(texture('blotch'),'repeat');g.fillRect(x0,yt-dy,x1-x0+dx,150)});
    for(let i=0;i<7;i++){let px=x0+r()*(x1-x0+dx),py0=yt-dy+r()*90;const p=[px,py0];for(let k=0;k<9;k++){px+=(r()-.3)*6;p.push(px,py0+=2+r()*5)}stroke(g,p,'rgba(128,128,140,.26)',.5);stroke(g,p.map((v,i)=>v+(i%2?0:.6)),'rgba(255,255,255,.12)',.4)}
    for(let i=0;i<90;i++){const px=x0+r()*(x1-x0+dx),py=yt-dy+r()*112;R(g,px,py,.5+r()*.6,.5,'rgba(90,78,70,.5)');R(g,px,py+.5,.6,.5,'rgba(255,250,236,.4)')}
    tex(g,'vert',.1,x0,yt,x1-x0+dx,150,'multiply',.6);
    g.fillStyle=lg(g,0,yb-24,0,150,['rgba(120,110,90,0)','rgba(120,104,84,.32)']);g.fillRect(x0,yb-24,x1-x0+dx,150)});
  /* the arrises: worn, lit along the top and dark along the receding corner, with a chip or two out of them */
  R(g,x0,yt-.2,x1-x0,.8,tint(C,.38));R(g,x1-.4,yt,.8,yb-yt,tint(C,-.1));R(g,x0,yt,.6,yb-yt,tint(C,.12));stroke(g,[x0+dx,yt-dy,x1+dx,yt-dy],tint(C,-.06),.5);
  for(const[px,py,w,h]of[[x1-1.6,yb-30,1.6,6],[x0,yb-46,1.2,5]])poly(g,[px,py,px+w,py+h*.3,px+w*.6,py+h,px,py+h*.8],tint(C,-.3));
  poly(g,[cx-.6,yt,cx+2.6,yt,cx+3.4,by,cx-1,by],'rgba(80,150,120,.42)');
  /* the hollow: a quarter of a bowl cut into the face, dark under its lip and lit where it turns up to the light */
  g.save();bowlPath(g,0);g.clip();
  g.fillStyle=lg(g,0,by,0,by+ry,[tint(C,-.48),tint(C,-.3),tint(C,-.08),tint(C,.1)]);g.fillRect(cx-rx,by,rx*2,ry);
  pool(g,cx,by+ry*.72,rx*.8,ry*.42,'#fff4dc',.35,'screen');
  tex(g,'mott',.36,cx-rx,by,rx*2,ry,'overlay',.7);tex(g,'grain',.14,cx-rx,by,rx*2,ry,'overlay',.5);
  /* the lip throws a band of shade along the top, and the inside of the rim catches it all round */
  g.fillStyle=lg(g,0,by,0,by+7,['rgba(40,32,60,.55)','rgba(40,32,60,0)']);g.fillRect(cx-rx,by,rx*2,7);
  g.lineWidth=2.2;g.strokeStyle='rgba(60,48,70,.3)';g.beginPath();g.ellipse(cx,by,rx-1,ry-1,0,0,Math.PI);g.stroke();
  /* a green stain where the rain has washed the bronze of the pointer down over the lip and into the bowl */
  g.fillStyle=lg(g,0,by,0,by+26,['rgba(80,150,120,.4)','rgba(80,150,120,0)']);poly(g,[cx-1,by,cx+3.4,by,cx+4.6,by+26,cx+.4,by+26]);g.fill();
  pool(g,cx,by+ry-3,rx*.4,4,'#8a7a5a',.3,'multiply');
  for(let i=0;i<40;i++){const px=cx+(r()-.5)*rx*2,py=by+r()*ry;R(g,px,py,.5,.5,'rgba(90,78,70,.45)');R(g,px,py+.5,.5,.5,'rgba(255,250,236,.35)')}
  g.restore();
  /* the rim of the hollow: lit along its lower edge, where the stone faces up */
  g.lineWidth=.9;g.strokeStyle=tint(C,.34);g.beginPath();g.ellipse(cx,by,rx+.4,ry+.4,0,.15,Math.PI-.15);g.stroke();
  R(g,cx-rx,by-.6,rx*2,.8,tint(C,-.5));
  /* the three notches in the rim: small cuts, each with a lit face and a dark one, the dark one away from the light */
  for(const q of DV.NOTCH){const ex=cx+Math.cos(q)*rx,ey=by+Math.sin(q)*ry,nx=Math.cos(q),ny=Math.sin(q)*rx/ry,L=Math.hypot(nx,ny),ux=nx/L,uy=ny/L,tx=-uy,ty=ux,
      a=[ex-ux*1.6,ey-uy*1.6],b=[ex+ux*5.6+tx*3.2,ey+uy*5.6+ty*3.2],c=[ex+ux*5.6-tx*3.2,ey+uy*5.6-ty*3.2],m=[ex+ux*5.6,ey+uy*5.6];
    poly(g,[...a,...b,...m],tint(C,-.5));poly(g,[...a,...m,...c],tint(C,-.18));stroke(g,[...a,...m],tint(C,-.62),.4);stroke(g,[...a,...b],tint(C,-.3),.3)}
  /* lichen on the head and the pier, never inside the cut of the hollow */
  const inBowl=(px,py)=>py>by-1&&((px-cx)/(rx+2))**2+((py-by)/(ry+2))**2<1;
  const nearNotch=(px,py)=>inBowl(px,py)||DV.NOTCH.some(q=>Math.hypot(px-(cx+Math.cos(q)*rx),py-(by+Math.sin(q)*ry))<9);
  lichen13(g,r,x0+dx,yt-dy,x1-x0,3,3);lichen13(g,r,x0,yt+8,x1-x0,22,3,nearNotch);lichen13(g,r,x0,yb-30,x1-x0,80,9,nearNotch);
}
function bowlPath(g,grow){const{cx,by,rx,ry}=DV;g.beginPath();g.ellipse(cx,by,rx+grow,ry+grow,0,0,Math.PI);g.closePath()}
/* the pointer: a bronze rod leaded into the top of the stone, leaning out over the hollow and to the side */
function dialPointer(g){const{cx,yt}=DV,b=[cx,yt-2.4],t=[cx+21,yt-18],at=k=>[b[0]+(t[0]-b[0])*k,b[1]+(t[1]-b[1])*k];
  oval(g,b[0]+.6,b[1]+.4,3.6,1.5,'#7e7c84');oval(g,b[0]+.2,b[1],2.6,1,'#aeacb4');pool(g,b[0]+3,b[1]+1.4,6,2,'#3a3050',.25,'multiply');
  poly(g,[b[0]-1.5,b[1],b[0]+1.4,b[1]+.5,t[0]+.8,t[1]+.6,t[0]-.6,t[1]-.4],'#4e3c24');
  stroke(g,[b[0]-.8,b[1]-.2,t[0]-.2,t[1]],'#8a6a3a',.9);stroke(g,[b[0]-.7,b[1]-.6,t[0]-.4,t[1]-.3],'#d8b470',.35);
  /* verdigris where the rain sits on the bronze: patches of its own size, not rings */
  for(const[k,w]of[[.12,.9],[.3,.5],[.55,1.2],[.82,.4]]){const[x,y]=at(k);poly(g,[x-w,y+1,x+w*.6,y+.2,x+w*1.4,y-.7,x,y-.2],'rgba(98,164,138,.85)')}
  oval(g,t[0],t[1],1.3,1.2,'#5a4628');R(g,t[0]-.7,t[1]-.9,.8,.6,'#e0c080')}
function dialLayer(fn){const[c,g]=mk(320*HR,144*HR);g.scale(HR,HR);fn(g);return c}
function dial13(g,t){const d=G.dial13||{a:0,b:1,k:1},u=d.a+(d.b-d.a)*d.k,key=Math.round(u*240);
  if(!DV.raw)DV.raw={back:dialLayer(dialBack),stone:dialLayer(dialStone),ptr:dialLayer(dialPointer),work:mk(320*HR,144*HR),key:null};
  const L=DV.raw;if(L.key!==key){L.key=key;const[c,w]=L.work,{x0,x1,yt,yb,dx,dy,cx,by,rx,ry,NOTCH}=DV,sx=1-u,hi=1-Math.abs(sx);
    w.setTransform(1,0,0,1,0,0);w.globalCompositeOperation='source-over';w.globalAlpha=1;w.drawImage(L.back,0,0);w.setTransform(HR,0,0,HR,0,0);
    /* the dial's own shadow, thrown back onto the paving and the wall: to the side away from the sun, and shorter as the sun climbs */
    const ox=-sx*30,oy=10+28*hi;
    const cast=(e,a)=>comp(w,'multiply',a,()=>{poly(w,[x0+ox-e,yt+oy-e,x0+dx+ox*.9-e,yt-dy+oy-e,x1+dx+ox*.9+e,yt-dy+oy-e,x1+dx+ox+e,150,x0+ox-e,150],'#7c78a8');
      stroke(w,[cx+ox,yt-2+oy,cx+21+ox*.8,yt-18+oy*.9],'#7c78a8',1.2+e)});cast(1.4,.3);cast(0,.55);
    w.setTransform(1,0,0,1,0,0);w.drawImage(L.stone,0,0);w.setTransform(HR,0,0,HR,0,0);
    /* the side of the stone: in the sun in the morning, in shade in the afternoon */
    const side=()=>{poly(w,[x1,yt,x1+dx,yt-dy,x1+dx,150,x1,150])};
    if(sx>0)comp(w,'screen',.3*sx,()=>{side();w.fillStyle='#fff0cc';w.fill()});else comp(w,'multiply',.45*-sx,()=>{side();w.fillStyle='#8a84b0';w.fill()});
    /* inside the hollow, the rim on the sun's side shades the stone below it */
    w.save();bowlPath(w,0);w.clip();
    comp(w,'multiply',.75,()=>{w.beginPath();w.rect(cx-rx-2,by-2,rx*2+4,ry+4);w.ellipse(cx-sx*rx*.42,by+ry*(.1+.12*Math.abs(sx)),rx*(1-.08*Math.abs(sx)),ry,0,0,6.2832);w.fillStyle='#857ea6';w.fill('evenodd')});
    /* the shadow of the pointer: a band from its foot, and the round shadow of its knob at the end, which tells the hour */
    const a=u<=1?NOTCH[0]+(NOTCH[1]-NOTCH[0])*u:NOTCH[1]+(NOTCH[2]-NOTCH[1])*(u-1),tx=cx+Math.cos(a)*rx*.86,ty=by+Math.sin(a)*ry*.86,nx=-(ty-by),ny=tx-cx,nl=Math.hypot(nx,ny);
    const px=nx/nl,py=ny/nl;
    comp(w,'multiply',.4,()=>poly(w,[cx+px*5.4,by,tx+px*1.2+(tx-cx)*.04,ty+(ty-by)*.04,tx-px*1.2+(tx-cx)*.04,ty+(ty-by)*.04,cx-px*5.4,by],'#8a84b0'));
    comp(w,'multiply',.88,()=>poly(w,[cx+px*3.8,by,tx,ty,cx-px*3.8,by],'#625a8c'));
    w.restore();
    w.setTransform(1,0,0,1,0,0);w.drawImage(L.ptr,0,0);w.setTransform(HR,0,0,HR,0,0);
    /* the light of the hour, and the edges of the picture */
    const tone=u<=1?mix('#ffcf96','#fff6e4',u):mix('#fff6e4','#ffac78',u-1);
    comp(w,'soft-light',.5,()=>R(w,0,0,320,144,tone));comp(w,'screen',.08+.1*hi,()=>R(w,0,0,320,144,'#fff8e8'));
    comp(w,'multiply',.4,()=>{w.fillStyle=rg(w,150,66,230,['#ffffff','#ffffff','#7a7096']);w.fillRect(0,0,320,144)});
    w.setTransform(1,0,0,1,0,0);finish(c,w,12)}
  g.drawImage(L.work[0],0,0,320,144)}

/* ============ THE DAY, AND ITS THREE PARTS ============ */
/* From the day the hall is his, the two years are played as three days: an early one, a middle one and a late one, and after them
   the morning of the fire. DAY: which of them it is. PART: m, the morning (the bench before sunrise, and the street after it); n,
   midday (the hall); e, the evening (the houses). The shadow is moved on at the sundial (dial), from morning to midday and from
   midday to evening, and it will not move while something promised for that part of the day is still open (OPEN13). Night comes
   when Paul goes up to the loft. Before the hall is his, it is morning; and midday from the hour he leaves the synagogue. */
const DAY=()=>F.n3?4:F.n2?3:F.n1?2:1,
  PART=()=>{if(!F.hall)return F.out?'n':'m';const d=DAY();return d>3?'m':F['e'+d]?'e':F['m'+d]?'n':'m'},
  SHOPV=()=>F.aside&&!F.sent?'n':!F.hall||DAY()>3?'d':PART()==='m'?'m':PART()==='e'?'n':'d',
  STREETV=()=>F.n3?'f':PART();
/* what is still open in this part of the day, as Paul would say it; or nothing */
function OPEN13(){const d=DAY(),p=PART();if(!F.hall||d>3)return null;
  if(p==='m')return d===1&&!F.b1?'awning_is_promised_for_today':d===2&&!F.apr?'myrtale_is_waiting_at_the_bench':null;
  if(p==='n')return!F['t'+d]?'they_will_be_sitting_in_the_hall':d===1&&!F.g1?'man_in_the_hall_had_a_question':d===2&&!F.two?'two_men_in_the_hall_wanted':d===3&&!F.kle?'somebody_in_the_hall_has':null;
  return d===1&&!F.a1?'glaukos_is_expecting_me':d===2&&!F.a2?'hegesias_sails_at_first':d===2&&!F.p2?'diodotos_is_still_waiting_under_his_vine':d===3&&!F.last?'kleandros_asked_me_to_his_house':null}

/* ============ CAST ============ */
/* Aquila and Priscilla look as they did in Corinth, with two more years in his hair. Apollos is a Jew of Alexandria, a learned man
   in a long striped tunic. Philon is the man of the synagogue of Ephesus whom Chapter Twelve invented. The Greeks of the city wear
   the mantle of Chapters Eleven and Twelve (himation:1); craftsmen, carriers and seamen the short tunic. Paul is the Paul of the
   third journey (paulLook in index.html); at the bench before sunrise he works without his mantle, in an apron and with a cloth
   round his forehead (study note on Acts 19:12). Timothy has his first beard. The dyes are drawn toward the earth colors of the
   backdrops: Kleandros, a man of means, shows it in a fine white tunic and a full mantle of a dark murex brown, not in a bright dye,
   and the hearers' purples are madder and murex browns. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
const JEW=(skin,hair,tunic,stripe,o)=>Object.assign({skin,hair,beard:hair,tunic,stripe,long:1,belt:'#4a3a24',brow:tint(hair,-.3),ph:0},o);
const AQL={skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',grey:'#8a7e72',tunic:'#b9a888',cloak:'#56687a',belt:'#3a2a1a',brow:'#2a1a12',ph:400};
Object.assign(LOOK,{
  paul13b:Object.assign(paulLook(13),{cloak:null,pouch:0,apron:'#8a6a4a',sweat:'#d8cfb0'}),paul13c:Object.assign(paulLook(13),{cloak:null,pouch:0,sweat:'#d8cfb0'}),
  aq13:AQL,prisca13:{skin:'#c8a078',veil:'#8a4a52',tunic:'#cdb890',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,trim:'#8a4a52',brow:'#3a2414',ph:1200},
  apollos13:{skin:'#b98658',hair:'#2a1c14',beard:'#2a1c14',tunic:'#ece4d0',long:1,stripe:'#7a2a4a',belt:'#4a3a24',cloak:'#a8763a',brow:'#1a1210',ph:900},
  philon13:{skin:'#b88a62',hair:'#d0d0d0',beard:'#d0d0d0',thin:1,longBeard:1,brow:'#9a9a9a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',cloak:'#8a7a5a',ph:500},
  symm13:{skin:'#b47e52',hair:'#3a2a1a',beard:'#3a2a1a',fullBeard:1,tunic:'#8a6a4a',long:1,belt:'#2e2016',cloak:'#4a4a5a',brow:'#1a1210',ph:200},
  mene13:{skin:'#b8845a',hair:'#8a8a8a',beard:'#8a8a8a',receding:1,shortBeard:1,tunic:'#a89c7c',belt:'#5a4a30',brow:'#5a5a5a',ph:1500},
  klea13:HIM('#c08c5c','#3a2a1a','#ece4d0','#5a3e44',{ph:700}),
  myrt13:{skin:'#c8a078',hair:'#3a2616',fem:1,band:'#c9a14a',tunic:'#d8c8a0',cloak:'#7a8a6a',himation:1,long:1,slim:1,longSleeve:1,brow:'#3a2414',ph:1900},
  glau13:HIM('#c69870','#6a6a6a','#e6dec8','#8a5a3a',{receding:1,ph:300}),
  hege13:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#7a8a9a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:1100},
  diod13:{skin:'#b47e52',hair:'#5a4026',beard:'#5a4026',shortBeard:1,tunic:'#b08a6a',belt:'#4a3a24',cloak:'#6a5a4a',brow:'#3a2a1a',ph:2100},
  timothy13:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  well13:{skin:'#c69870',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#c8b490',belt:'#4a3a24',brow:'#2a1a12',ph:2500},
  /* the twelve: seen, and not named */
  dz13a:JEW('#b47e52','#2a1a12','#d8d0b8','#5e4048',{ph:100}),dz13b:JEW('#c69870','#8a8a8a','#e2dac6','#3f5f86',{receding:1,longBeard:1,ph:1300}),dz13c:JEW('#b88a62','#3a2a1a','#c8b890',null,{ph:2300,slim:1}),
  dz13d:JEW('#a8703f','#2a1a12','#b8a684','#5a3a3a',{fullBeard:1}),dz13e:JEW('#c08c5c','#5a4026','#e6dec8','#7a2a4a',{}),dz13f:JEW('#b47e52','#c8c8c8','#9a8a6a',null,{bald:1,longBeard:1,cloak:'#5a5a6a'}),
  dz13g:JEW('#c89a70','#3a2616','#d8cfb0','#6a5a3a',{slim:1,beard:null}),dz13h:JEW('#b8845a','#4a3a2c','#a89c7c',null,{thin:1}),dz13i:JEW('#b98658','#2a1c14','#ece4d0','#3f6f5a',{shortBeard:1}),
  dz13j:JEW('#c69870','#6a6a6a','#c4b08a',null,{receding:1,fullBeard:1,cloak:'#7a5a3a'}),dz13k:JEW('#a8703f','#3a2a1a','#d8d0b8','#4a5268',{}),dz13l:JEW('#b47e52','#5a4026','#d2c8a8',null,{slim:1,shortBeard:1}),
  /* hearers and passers-by: Jews and Greeks, men and women */
  hx13a:HIM('#c69870','#5a4026','#e0d8c0','#8a6a5a',{beard:null}),hx13b:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  hx13c:{skin:'#b8845a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#a8946a',belt:'#4a3a24',brow:'#1a1210',ph:0},hx13d:{skin:'#c8a078',hair:'#5a4026',fem:1,band:'#8a4a40',tunic:'#e2d6b4',cloak:'#7e5a52',himation:1,long:1,slim:1,longSleeve:1,ph:0},
  hx13e:{skin:'#a8703f',hair:'#2a1a12',tunic:'#8a9a8a',belt:'#3a2a1a',slim:1,brow:'#1a1210',ph:0},hx13f:HIM('#b8845a','#8a8a8a','#e6dec8','#6a7a8a',{thin:1}),
  hx13g:{skin:'#c8a078',veil:'#5f7f6a',tunic:'#d8c8a0',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,ph:0},hx13h:{skin:'#b47e52',hair:'#c8c8c8',beard:'#c8c8c8',longBeard:1,bald:1,tunic:'#9a8a6a',long:1,belt:'#2e2016',brow:'#8a8a8a',ph:0},
  op13a:{skin:'#c69870',hair:'#8a8a8a',beard:'#8a8a8a',receding:1,longBeard:1,tunic:'#d8d0b8',long:1,belt:'#4a3a24',ph:0},op13b:{skin:'#b88a62',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#9a8a6a',long:1,belt:'#2e2016',stripe:'#5a3a3a',ph:0}});
/* Aquila and Priscilla are one actor with a mate (see drawActor in index.html), and can be played from the first scene: aq13. PR is
   Priscilla's voice and place. */
const AP=actor('aq13','aquila_and_priscilla','#b8d0e8',112),AO=actor('apollos13','Apollos','#f0d0a0',128),PH=actor('philon13','Philon','#e0e0f0',90),
  SY=actor('symm13','Symmachos','#e8b0a0',104),ME=actor('mene13','Menekrates','#d8d0b0',118),KL=actor('klea13','Kleandros','#c8d8f0',100),
  MY=actor('myrt13','Myrtale','#f0c0d0',190),GL=actor('glau13','Glaukos','#e0c8a0',96),HE=actor('hege13','Hegesias','#a8c8e8',110),
  DI=actor('diod13','Diodotos','#c8e0b0',124),TI=actor('timothy13','Timothy','#b8e0b0',146),WE=actor('well13','man_beside_myrtale','#e0d8b8',120),
  D1=actor('dz13a','disciple','#d8c8e8',116),D2=actor('dz13b','old_disciple','#e0d8c0',92),D3=actor('dz13c','young_disciple','#c8e8d8',140);
const PR={color:'#f0b8c0',pitch:186,name:'Priscilla',talk:false,get room(){return AP.room},get x(){return AP.x-13*AP.dir},get y(){return AP.y}};
AP.mate={fig:'prisca13',dx:-13,voice:PR,get talk(){return PR.talk}};AP.called='Aquila';
/* voices at the counting board, of people who are heard and not named */
const V1={color:'#f0d0c0',pitch:176,name:'woman'},V2={color:'#c0d8e8',pitch:104,name:'man_from_the_harbor'},V3={color:'#d8e0b8',pitch:132,name:'two_brothers'},V4={color:'#e0d8d0',pitch:86,name:'old_man'};

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 18:23 to 19:20, told by the narrator in paraphrase, each line with its reference; and with it what Paul said of these
   years to the elders of this city, and what he wrote from it. None of it is put into a mouth as a quotation, and none of it stands
   in quotation marks (CONTRIBUTING section 1). What the disciples and Paul say to each other in Acts 19:2-4 is spoken in the scene,
   in the game's own words. */
const TOLD={
 v23:'he_stayed_there_for_a_while_acts_18_23',
 v24:'to_ephesus_there_acts_18_24',
 v25:'way_of_jehovah_acts_18_25',
 v26a:'in_the_synagogue_acts_18_26',
 v26b:'they_drew_him_acts_18_26',
 v27a:'he_had_a_mind_acts_18_27',
 v27b:'once_there_he_acts_18_27',
 v28:'for_with_the_scriptures_acts_18_28',
 v1:'paul_came_down_acts_19_1',
 v5:'they_heard_it_acts_19_5',
 v6:'holy_spirit_came_acts_19_6',
 v7:'all_told_they_were_some_twelve_men_acts_19_7',
 v8:'for_three_months_the_synagogue_heard_him_acts_19_8',
 v9a:'there_were_some_acts_19_9',
 v9b:'he_drew_back_acts_19_9',
 v9c:'from_then_on_his_talks_acts_19_9',
 v10:'two_years_passed_in_this_way_acts_19_10',
 v11:'through_pauls_hands_acts_19_11',
 v12:'people_even_took_acts_19_12',
 v13:'there_were_jews_acts_19_13',
 v14:'among_those_who_acts_19_14',
 v15:'wicked_spirit_had_an_answer_for_them_acts_19_15',
 v16:'man_who_had_the_wicked_acts_19_16',
 v17:'all_ephesus_came_acts_19_17',
 v18:'many_who_had_acts_19_18',
 v19a:'of_those_who_acts_19_19',
 v19b:'price_of_the_books_acts_19_19',
 v20:'word_of_jehovah_acts_19_20',
 /* from elsewhere */
 a166:'years_before_on_his_second_acts_16_6',
 a2034:'later_he_reminded_acts_20_34',
 a2020:'he_had_held_back_acts_20_20',
 c1619:'from_this_city_1_corinthians_16_19',
 c169:'he_meant_to_stay_1_corinthians_16_8_9'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});
/* the passages on the tablets: each a note in the writer's own words with its reference, never the wording of a translation. The
   second is a note of Chapter Eleven, word for word. */
const PS={da244:{ref:'daniel_2_44',gist:'god_of_heaven_has_a_kingdom'},
  ps1465:{ref:'psalm_146_5_6',gist:'happy_is_the_man_whose'},
  is403:{ref:'isaiah_40_3',gist:'in_the_wilderness_a_voice'}};
const quote=k=>T('text_ref',{text:T(PS[k].gist),ref:T(PS[k].ref)});
/* HEARD: the way, as Aquila and Priscilla were taught it, point by point; and what Apollos says in the synagogue, which is each of
   those points but the last. The notes are theirs, in their own words, each with its reference. What Apollos says is invented: the
   account says only that he taught accurately what concerned Jesus, and knew of no baptism but John's. k: the point; q: the point
   in a few words, as it is chosen; t: the note; say: his words for it. */
const HEARD=[
 {k:'voice',q:'voice_in_the_wilderness_was_john',t:'isaiah_wrote_of_a_voice_isaiah_40_3',
  say:['open_isaiah_brothers','it_has_spoken']},
 {k:'repent',q:'john_preached_a_baptism',t:'before_jesus_came_acts_13_24',
  say:['what_did_he_cry_out_to_them','he_took_them_down_into_the_river']},
 {k:'after',q:'john_said_that_another',t:'near_the_end_acts_13_25',
  say:['he_did_what_a_teacher_never_does','he_said_that_he_was_not']},
 {k:'christ',q:'one_who_came_after_him',t:'one_who_came_acts_18_5',
  say:['brothers_the_one_he_pointed','search_the_law_and_the_prophets']},
 {k:'name',q:'baptism_in_the_name_of_jesus',t:'at_pentecost_peter_acts_2_38'}];
const ticked=()=>G.ap13||(G.ap13={i:0,t:F.apo?HEARD.slice(0,4).map(h=>h.k):[]});

/* ============ HELPERS ============ */
/* think: whoever is played weighs what to do. A choice that would not serve is set aside in thought (no), or it is said, and somebody
   answers it (by, no); the rest stay to choose from. */
async function think(who,q,opts){let av=opts.slice();
  for(;;){if(q)await say(who,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok){if(o.say)await say(who,o.say);return o}
    if(o.by){await say(who,o.q);await say(o.by,o.no)}else await say(who,o.no,TH);av=av.filter(x=>x!==o)}}
/* goto: whoever is played walks from one place to the next */
async function goto(room,x,y,dir){await fade(1,260);place13(room);const a=PC();if(x!=null)place(a,room,x,y,dir);enterRoom(room,a.x,a.y,a.dir);codeBtn();await fade(0,260);const r=ROOMS[room];if(r.enter)await r.enter()}
/* show: a room is shown anew where whoever is played stands, with everyone in his place */
function show13(room,x,y,dir){place13(room);const a=PC();if(x!=null)place(a,room,x,y,dir);enterRoom(room,a.x,a.y,a.dir);codeBtn()}
/* mine: an exit or a thing that is Paul's; ours: one that belongs to the two at the bench */
const mine=(fn,line)=>(...a)=>PC()!==P?say(AP,line||'that_is_pauls_to_do'):fn(...a);
/* the dark of what is told and not shown: read from the narrator's scroll */
async function darkly(fn){await fade(1,500);G.scene=DARK;const m=AU.mood,am=AU.amb;AU.mood='night';AU.amb={};await fade(0,300);await fn();await fade(1,400);G.scene=null;AU.mood=m;AU.amb=am}
/* the pair may walk the street on their own errand: before Paul has come, and on the evening when two tables are waiting */
const pairOut=()=>!F.sent||(!!F.e2&&!F.n2);

/* ============ ACT ONE: before he came (Acts 18:24-28) ============ */
async function toSyn(){const pc=PC();
  if(pc!==P){if(F.sent)return say(AP,'paul_is_in_there_or_will_be');if(F.gap)return say(AP,'sabbath_is_over_and_our_guest');return goto('syn13',64,122,1)}
  if(F.out)return say(P,'i_have_left_that_house');
  if(!F.awl)return say(P,'i_said_that_i_would_come');
  if(!F.tw)return say(P,'these_men_first');
  await goto('syn13',64,122,1)}
async function synEnter(){
  if(PC()!==P){if(!G.s13){G.s13=1;await tell('v25');await tell('v26a');await say(AP,'he_holds_the_whole_house',TH);await say(PR,'have_the_tablets_ready')}return}
  if(!F.syn)return threeMonths()}
/* listen: Apollos says the next part of what he has to say, and the two decide which of their notes it was. Every note stays on
   offer, those already ticked as well, so that the last of them is still a choice among five. */
async function listen(){if(PC()===P)return;const st=ticked();
  if(F.gap)return say(AO,'after_sundown_then');
  if(F.apo)return gap();
  const h=HEARD[st.i];for(const s of h.say)await say(AO,s,{to:null});
  const av=HEARD;
  for(;;){await say(PR,'which_of_ours_was_that',TH);const pick=av[await choose(av.map(x=>x.q).concat(['that_is_not_how_we_were']),{keep:1})];
    if(!pick){await say(AP,'brother_a_question_if_the_house');
      await say(AO,'ask_whenever_you_like_that_is');await say(PR,'they_agree');continue}
    if(pick.k===h.k){st.t.push(h.k);st.i++;SFX.pick();await say(PR,['that_one_said','yes_word_for_word_what','that_one_too','that_he'][st.i-1]);break}
    await say(PR,st.t.includes(pick.k)?'we_have_that_one_already':pick.k==='name'?'of_that_he_has_said_nothing_yet':'no_that_was')}
  if(st.i<4)return;F.apo=1;codeBtn();await say(AP,'not_one_wrong_word');
  await say(PR,'nor_did_i_hear_one')}
/* gap: what is missing is found: not an error, but a thing that was not said */
async function gap(){await say(AO,'peace_friends');let av=HEARD.slice();
  for(;;){await say(AP,'what_did_we_not_hear_from_him',TH);const h=av[await choose(av.map(x=>x.q))];
    if(h.k==='name')break;await say(PR,'he_said_that_i',TH);av=av.filter(x=>x!==h)}
  await say(AP,'of_that_not_a_word',TH);await say(PR,'because_he_knows_of_no_other',TH);F.gap=1;SFX.good();codeBtn();
  await think(AP,'he_ought_to_hear_it',[
    {q:'stand_up_and_tell_the_synagogue',no:'it_would_be_true_every_word'},
    {q:'say_nothing',no:'let_him_go_on_to_the_next'},
    {q:'ask_him_to_our_table',ok:1,say:'apollos_we_are_aquila_and_priscilla_tentmakers'}]);
  await say(AO,'gladly_a');F.aside=1;
  await fade(1,500);AO.room=null;show13('shop13',120,122,1);place(AO,'shop13',178,120,-1);await fade(0,600);
  await narr('by_sundown_the_bench_was_a_table',{dur:8000});await atTable()}
/* atTable: how to say it. The order matters: what is true and good to hear comes first, and leave is asked before anything is added. */
async function atTable(){if(F.taught)return;
  await think(AP,'he_is_our_guest',[
    {q:'there_is_something_that_you',no:'before_he_has_tasted_the_bread'},
    {q:'you_know_only_the_baptism_of_john',no:'true_and'},
    {q:'we_have_not_heard_the_scriptures',ok:1,say:'we_have_not_heard_the_scriptures_said'}]);
  await say(AO,'paul_of_tarsus_i_have');
  await think(AP,'now_the_thing_itself',[
    {q:'you_are_a_learned_man_of_alexandria',no:'true_both_halves_of_it'},
    {q:'wait_for_paul',no:'paul_is_on_a_road_somewhere'},
    {q:'may_we_tell_you_what_we',ok:1,say:'there_is_one_thing_we_were'}]);
  await say(AO,'tell_me');
  await say(PR,'john_sent_the_people_on_to_the_one');
  await say(AP,'there_is_more_brother');
  await say(AO,'in_his_name');given13();AU.mood='lamp';
  await say(AO,'say_it_again_slowly_from_pentecost_on_i');await tell('v26b');F.taught=1;SFX.good();codeBtn();
  await narr('it_took_more_than_one_evening',{dur:9000});await sendOff()}
async function sendOff(){await say(AO,'i_mean_to_cross_over_to_achaia');
  await say(AP,'you_will_not_go_as_a_stranger');await tell('v27a');
  await say(AO,'i_shall_carry_their_letter');F.sent=1;AO.room=null;
  await darkly(async()=>{await tell('v27b');await tell('v28')});await comeDown()}

/* ============ ACT TWO: the road down, and about twelve men (Acts 19:1-7) ============ */
const ROAD1=[['antioch','syriangates','new'],['syriangates','tarsus','new'],['tarsus','ciliciangates','new'],['ciliciangates','derbe','new'],['derbe','lystra','new'],['lystra','iconium','new'],['iconium','antiochp','new']],
  ROAD2=ROAD1.map(l=>l.slice(0,2)).concat([['antiochp','ephesus','new']]),
  LAB13={syriangates:{hide:1},tarsus:{hide:1},ciliciangates:{hide:1},derbe:{hide:1},lystra:{hide:1},iconium:{hide:1},antiochp:{hide:1},antioch:{lab:'r'},ephesus:{lab:'r',dy:6}};
async function comeDown(){
  try{await need('map');await SHARED.map.journey(ROAD2,{view:'aegean',labels:LAB13,speed:1700});await tell('v1',null,1)}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.came=1;place(P,'road13',40,124,1);playAs(P);show13('road13',40,124,1);await fade(0,700);
  await narr('it_was_a_road_that_he_had',{dur:6000});await tell('a166');
  await say(P,'ephesus_then',TH)}
async function intoCity(){await fade(1,400);show13('street13',612,124,-1);await fade(0,500);
  await narr('he_had_seen_one_street',{dur:8000})}
async function toShop(){const pc=PC();
  if(pc===P&&F.out&&!F.hall&&has('curt13m'))return say(P,'it_is_mended_said');
  await goto('shop13',252,122,-1);if(pc===P&&F.came&&!F.awl)return reunion()}
async function reunion(){await say(AP,'paul_2');await say(PR,'you_said_if_jehovah_is_willing');
  await say(P,'he_was_willing');
  await say(PR,'your_awl_and_your_thread');addItem('awl');addItem('thread');F.awl=1;SFX.pick();
  await say(AP,'there_was_a_man_here_before');
  await say(PR,'there_are_others_disciples');
  await fade(1,400);show13('street13',204,124,1);await fade(0,500);
  await say(P,'they_look_like_men_who',TH)}
/* the twelve: Paul asks before he teaches. Each right question opens the next; a wrong beginning is true, and leads nowhere. */
async function twelve(){if(PC()!==P)return say(AP,'we_have_talked_with_them');if(F.tw)return say(D1,'we_speak_of_little_else_brother');
  if(!F.q1){await think(P,null,[
      {q:'brothers_let_me_tell_you',by:D1,no:'gladly_some_sabbath'},
      {q:'how_long_have_you_been_disciples',by:D2,no:'some_of_us_since_we_were_boys'},
      {q:'holy_spirit_brothers_was',ok:1,say:'holy_spirit_brothers_was'}]);
    await say(D1,'holy_spirit');F.q1=1;codeBtn();return say(P,'it_is_not_with_the_spirit',TH)}
  if(!F.q2){await think(P,null,[
      {q:'you_must_be_baptized',by:D3,no:'we_are_baptized'},
      {q:'what_baptism_was_yours',ok:1,say:'what_baptism_was_yours'}]);
    await say(D2,'johns_brother');F.q2=1;codeBtn();return say(P,'john',TH)}
  await think(P,null,[
    {q:'come_with_me_to_the_water',by:D1,no:'for_what_brother'},
    {q:'john_himself_pointed_people',ok:1,say:'what_john_did_in_the_water'}]);
  await say(D1,'in_the_one_after_him');await say(D3,'baptize_us_in_that_name');
  await darkly(async()=>{await tell('v5');await tell('v6');await tell('v7')});F.tw=1;show13('street13',204,124,1);await fade(0,600);
  await narr('he_had_not_told_them_what',{dur:7500});
  await say(P,'now_the_synagogue_said',TH)}

/* ============ ACT THREE: three months, and the door (Acts 19:8, 9) ============ */
async function threeMonths(){await say(PH,'paul_of_tarsus_if');
  await say(P,'he_was_willing_philon');
  await narr('they_gave_him_the_readers_table',{dur:7000});await tell('v8');
  await fade(1,500);F.syn=1;G.heat13=0;show13('syn13',118,124,1);await fade(0,600);await narr('three_months',{dur:7500});await tell('v9a');
  await say(SY,'three_months_we_have_let_him_talk',{to:null});
  await say(P,'he_is_not_speaking_to_me',TH)}
/* ANSWERS: what he could answer, each of it true: what is chosen, what he says, and what comes back */
const ANSWERS=[['kingdom_i_speak_of_is_the_one','the_kingdom_i_speak_of_is_the_one','daniel_q'],
  ['show_me_the_passage_that_i','for_three_months_i_have','whole_of_it_is_twisted'],
  ['you_have_not_yet_said_what','you_speak_against_the_way','false_q']];
async function quarrel(){if(PC()!==P)return say(AP,'if_we_answer_him_too_there');const st=G.q13||(G.q13=[0,1,2]);
  if(!st.length)return say(P,'there_is_no_answer_left',TH);
  const i=st[await choose(st.map(k=>ANSWERS[k][0]))];await say(P,ANSWERS[i][1]);await say(SY,ANSWERS[i][2]);G.q13=st.filter(k=>k!==i);G.heat13=(G.heat13||0)+1;
  await narr(['half_the_house_was_on_its_feet','every_bench_had_taken_a_side','nobody_was_listening_to_the_scriptures'][Math.min(2,G.heat13-1)],{dur:6500});
  if(G.heat13>=2)await say(P,'every_true_word_i_say_is',TH)}
async function withMe(){if(PC()!==P)return say(AP,'we_go_when_he_goes');if(F.withme)return say(D1,'we_are_ready');
  await say(P,'brothers_we_are_going');await say(D1,'where_to_paul');
  await say(P,'i_do_not_know_yet');F.withme=1;codeBtn()}
async function leaveSyn(){if(PC()!==P)return say(AP,'not_before_paul');
  if(!F.syn||F.out)return goto('street13',280,120,1);
  if(!F.withme)return say(P,'not_alone_and_not_like',TH);
  await narr('he_gave_symmachos_no_last_word',{dur:8000});await tell('v9b');
  await fade(1,500);F.out=1;show13('street13',300,124,1);await fade(0,600);
  await narr('philon_came_as_far_as_the_door',{dur:7000});
  await say(P,'dozen_households_and_more',TH)}
/* the hall, for a curtain */
async function mene(){if(PC()!==P)return say(ME,'good_day_to_you_both');
  if(F.hall)return say(ME,PART()==='n'?'in_with_you':PART()==='m'?'school_has_it_till_the_sun':'shut_for_the_night_tentmaker');
  if(F.men)return say(ME,has('curt13m')?'is_that_it':'mend_the_curtain_and_the_hall');
  await say(ME,'school_of_tyrannus');
  await say(P,'hall_stands_empty_for_the_rest');
  await say(ME,'empty_it');
  await say(P,'if_the_curtain_were_whole');await say(ME,'it_would_be_the_coolest');
  await say(P,'i_am_a_tentmaker_said');
  await say(ME,'mend_that_curtain_and_you');F.men=1;codeBtn()}
async function takeCurtain(){if(PC()!==P)return say(AP,'curtain_in_two_halves');if(F.hall)return say(P,'it_hangs_and_it_holds');if(F.curt)return say(P,F.sewn?'mended_one_belongs_here':'bare_rod');
  if(!F.men)return say(P,'door_curtain_of_goat_hair');
  F.curt=1;addItem('curt13');return say(P,'down_it_comes')}
async function hang(id){if(id!=='curt13m')return id==='curt13'?say(P,'torn_as_it_is'):false;delItem('curt13m');SFX.creak();
  await say(ME,'whole_said');await say(ME,'hall_is_yours_tentmaker');
  F.hall=1;codeBtn();await tell('v9c');
  await narr('nobody_knows_what_tyrannus',{dur:9000});await dawn(1)}
async function benchUse(id){const b=G.b13||(G.b13={on:0,pt:0});
  if(PC()!==P)return false;
  if(id==='curt13'){b.on=1;delItem('curt13');return say(P,'i_lay_it_out_along_the_bench')}
  if(id==='curt13m')return say(P,'it_is_mended_now');return false}
async function curtainUse(id){const b=G.b13||(G.b13={on:0,pt:0});
  if(PC()!==P)return say(AP,'paul_has_it_in_hand');
  if(id==='patch13'){b.pt=1;delItem('patch13');return say(P,'strip_of_new_goat_hair')}
  if(id==='awl'||id==='thread'){if(!b.pt)return say(P,'sew_the_two_edges_to_each');
    SFX.sew();F.sewn=1;G.b13=null;addItem('curt13m');codeBtn();return say(P,'both_edges_sewn_down_onto_the_strip')}
  return false}

/* ============ A DAY IN THREE PARTS ============ */
/* dawn: a day begins at the bench, before the sun is over the roofs */
async function dawn(d){await fade(1,600);playAs(P);show13('shop13',150,122,1);await fade(0,700);
  if(d===1){await narr('before_the_sun_was_over_the_roofs',{dur:8500});await tell('a2034');
    await say(PR,'awning_for_the_potter_is')}
  else if(d===2){if(!has('apron13'))addItem('apron13',1);await narr('months_went_by_like_that_the_bench',{dur:6500});
    await say(MY,'is_this_the_tentmakers')}
  else{await narr('for_days_the_whole_city',{dur:6000});await say(AP,'they_were_asking_for_you');
    await say(P,'it_is_not_my_name_that_they')}}
async function seam(id){if(id!=='awl'&&id!=='thread')return false;if(PC()!==P)return say(AP,'that_seam_is_pauls');if(F.b1)return say(P,'sewn_and_the_thread_made_fast');
  SFX.sew();F.b1=1;codeBtn();await say(P,'long_seam_end_to_end_before');return say(AP,'done_before_sunrise')}
/* Myrtale, and the apron (Acts 19:11, 12): she asks, he gives it, and the rest is told */
async function myrtale(){if(F.apr)return;if(PC()!==P)return say(MY,'it_is_the_tentmaker_i_have');
  if(G.my13)return say(MY,'apron_that_you_work_in_tentmaker');G.my13=1;
  await say(MY,'they_say_in_our_street');
  await say(MY,'i_do_not_ask_you_to_leave')}
async function giveApron(id){if(id!=='apron13')return false;if(!G.my13)await myrtale();
  await say(P,'it_is_a_working_apron_myrtale');await say(MY,'it_is_enough_for_me_that_it');
  delItem('apron13');P.look=LOOK.paul13c;P.wear='c';SFX.pick();await wait(300);MY.room=null;
  await darkly(async()=>{await tell('v11');await tell('v12')});F.apr=1;show13('shop13',150,122,1);await fade(0,600);
  await say(PR,'that_is_the_third_this_month');await say(P,'cut_it_plain')}
/* dial: the shadow is moved on. turnDial shows it move. */
async function turnDial(a,b){await fade(1,300);G.dial13={a,b,k:0};G.scene=dial13;await fade(0,300);await wait(350);await tween(G.speedAll>200?200:2400,k=>{G.dial13.k=k*k*(3-2*k)});await wait(G.speedAll>200?60:700);await fade(1,300);G.scene=null}
async function dial(){if(PC()!==P)return say(AP,'day_is_pauls_to_count');
  if(!F.hall)return say(P,'sundial_with_three_notches',TH);
  const d=DAY(),p=PART(),open=OPEN13();if(d>3)return say(P,'this_morning_nobody_is',TH);
  if(p==='e')return say(P,'shadow_has_gone_out_with_the_sun',TH);if(open)return say(P,open,TH);
  if(p==='m'){await turnDial(0,1);F['m'+d]=1;show13('street13',336,122,1);await fade(0,400);
    return narr(d===1?'shadow_drew_in_under_the_pointer':'the_shadow_drew_in_under_the_pointer',{dur:d===1?9000:5600})}
  await turnDial(1,2);F['e'+d]=1;show13('street13',336,122,1);await fade(0,400);
  await narr(d===1?'shadow_crept_out_again_and_grew_long':'shadow_grew_long_and_the_lamps',{dur:d===1?7000:5200});
  if(d===2)await say(P,'two_tables_and_one_evening',TH)}
/* the hall at midday */
async function toHall(){const pc=PC();if(pc!==P)return say(AP,'paul_speaks_in_there_when_the_sun');
  if(!F.out)return say(P,'hall_behind_a_porch_of_columns');if(!F.hall)return mene();
  if(DAY()>3)return say(P,'not_today_today');
  if(PART()==='m')return say(P,'school_has_it_until_the_sun');if(PART()==='e')return say(P,'shut_for_the_night');
  await goto('hall13',70,124,1)}
async function hallEnter(){const d=DAY();if(G.he13===d)return;G.he13=d;
  if(d===1)await narr('first_day_there_were_more',{dur:6000});
  else if(d===2){await narr('by_now_men_stood_along',{dur:8000});await say(P,'philon_in',TH)}
  else{await narr('that_day_the_hall_could',{dur:5600});await say(P,'timothy_by_the_desk',TH)}}
async function speakHall(){if(PC()!==P)return;const d=DAY();if(F['t'+d])return say(P,'i_have_spoken');
  await narr(d===3?'he_told_them_plainly_whose':'he_spoke_about_the_kingdom',{dur:8000});F['t'+d]=1;codeBtn();
  if(d===1)await say(P,'they_listened_to_the_end',TH);
  else if(d===2)await say(P,'two_of_them_have_not_moved',TH);
  else await confess()}
async function glaukos(){if(F.g1)return say(GL,'where_the_fuller_lives');
  if(!F.t1)return say(GL,'after_you_have_spoken_tentmaker');
  await say(GL,'glaukos_of_sardis');
  await say(P,'that_is_not_answered_between');
  await say(GL,'with_a_fuller_in_this_street');F.g1=1;SFX.pick();codeBtn()}
async function hegesias(){const a=G.as13||(G.as13={});if(F.two||a.he)return say(HE,'under_the_colonnade_at_the_wine_sellers');
  if(!F.t2)return say(HE,'speak_first_friend');
  await say(HE,'hegesias_of_smyrna');
  await say(P,'i_want_to_answer_that_from_what');
  await say(HE,'under_the_colonnade_at_the_wine');a.he=1;SFX.pick();return bothAsked()}
async function diodotos(){const a=G.as13||(G.as13={});if(F.two||a.di)return say(DI,'under_the_vine_where_the_carriers_lodge');
  if(!F.t2)return say(DI,'afterwards_said');
  await say(DI,'diodotos_of_thyatira');
  await say(P,'it_is_not_q');
  await say(DI,'under_the_vine_where_the_carriers_lodge_said');a.di=1;SFX.pick();return bothAsked()}
async function bothAsked(){const a=G.as13;if(!(a.he&&a.di))return;F.two=1;codeBtn();await say(P,'hegesias_at_the_wine_sellers',TH)}
async function confess(){await narr('when_he_had_finished_a_man',{dur:6500});
await say(KL,'kleandros_said',{to:null});await tell('v18');
  await say(KL,'i_want_them_out_of_my_house');F.kle=1;codeBtn();
  await say(P,'this_evening_kleandros')}
/* the evening: a question that was asked in the hall is answered at a door, by lamplight (Acts 20:20) */
async function evening(who){const d=DAY(),pc=PC();
  if(PART()!=='e'||d>3)return say(pc,who==='kl'?'large_house_with_a_door':who==='gl'?'fullers_house':who==='he'?'wine_sellers_door_at_the_end':'lodging_for_carriers_with_a_vine');
  if(who==='gl'){if(pc!==P)return say(AP,'the_fullers');if(d!==1)return say(P,'fullers_said');return F.a1?say(P,'he_has_his_answer_and_a_great'):visit1()}
  if(who==='he'){if(d!==2)return say(pc,'wine_seller_has_shut_up_for_the_night');if(pc!==P)return say(AP,'hegesias_asked_about_what_is_written');return F.a2?say(P,'he_has_his_answer'):visit2()}
  if(who==='di'){if(d!==2)return say(pc,'carriers_are_asleep');
    if(pc===P)return say(P,F.p2?'aquila_and_priscilla_have_been_there':'if_i_sit_down_here_hegesias',TH);return F.p2?say(AP,'he_asked_us_to_come_again'):visit2p()}
  if(pc!==P)return say(AP,'kleandros_asked_paul');if(d!==3)return say(P,'large_house');if(F.last)return say(P,'he_is_carrying_them_out_himself');
  await goto('house13',160,236,1)}
/* pass: Paul answers from his tablets. The one who asked says what he makes of each passage. */
async function pass(who,right,miss){const ks=Object.keys(PS);for(;;){const k=ks[await choose(ks.map(k=>PS[k].ref))];await say(P,quote(k));if(k===right)return;await say(who,miss[k])}}
async function visit1(){place(GL,'street13',532,117,-1);await say(GL,'you_came_q');
  await pass(GL,'da244',{ps1465:'god_who_made_the_sea_and_the_land',is403:'road_through_a_desert'});
  await say(GL,'set_up_by_the_god_of_heaven');
  await say(P,'i_did_not_write_it_glaukos');
  await narr('he_stayed_until_the_fullers',{dur:6500});await tell('a2020');F.a1=1;GL.room=null;SFX.good();codeBtn();
  await say(P,'that_is_enough_for_one_day',TH)}
async function visit2(){place(HE,'street13',157,117,-1);await say(HE,'in_here_out_of_the_lamplight');
  await pass(HE,'ps1465',{da244:'kings_and_kingdoms',is403:'road_in_a_desert'});
  await say(HE,'one_who_made_the_sea_and_everything');
  await narr('he_stayed_until_the_wine',{dur:7000});F.a2=1;HE.room=null;SFX.good();codeBtn();
  if(!F.p2)await say(P,'diodotos_is_still_sitting_under_his_vine',TH)}
async function visit2p(){place(DI,'street13',588,117,-1);await say(DI,'i_asked_the_tentmaker_a_question');
  await say(AP,'tentmakers_too');
  await think(AP,null,[
    {q:'paul_would_explain_it_to_you',no:'he_left_this_table_to_us'},
    {q:'you_must_make_the_time_for_it',by:DI,no:'out_of_what'},
    {q:'we_learned_it_at_the_bench',ok:1,say:'we_sew_from_first_light_diodotos'}]);
  await say(DI,'one_thing_a_night');
  await narr('it_was_the_second_time',{dur:8000});F.p2=1;DI.room=null;SFX.good();codeBtn()}
/* night: up to the loft, when nothing is open; and what the night tells */
async function sleep(){const pc=PC();if(pc!==P)return say(AP,F.aside&&!F.sent?'not_while_our_guest_is':'not_while_there_is_work');
  if(!F.hall||DAY()>3)return say(P,'steps_to_the_loft_said');
  if(PART()!=='e')return say(P,'not_while_there_is_light_said');const open=OPEN13();if(open)return say(P,open,TH);return night(DAY())}
async function night(d){await fade(1,600);F['n'+d]=1;G.asia13=null;G.scene=asia13;AU.mood='road';AU.amb={wind:.25};await fade(0,600);
  if(d===1){await narr('glaukos_sold_his_wool_and_went',{dur:9000,low:1});await narr('nobody_sent_him',{dur:5000,low:1})}
  else if(d===2){await narr('hegesias_sailed_for_smyrna',{dur:8000,low:1});await tell('v10',null,1);
    await say(P,'thyatira_i',TH)}
  if(d===2){await fade(1,500);G.scene=DARK;AU.mood='night';AU.amb={};await fade(0,300);for(const k of['v13','v14','v15','v16','v17'])await tell(k)}
  await fade(1,500);G.scene=null;if(d===3)return lastMorning();await dawn(d+1)}

/* ============ ACT FOUR: before everybody (Acts 19:18-20) ============ */
/* HIDE: where Kleandros kept what he kept. k: the place; clue: what he remembers of it; look: what Paul sees; find: what he says as
   he finds it. The seventh lies in the strongbox, and is not looked for. */
const HIDE=[
 {k:'thr',clue:'one_of_them_every_guest',look:'threshold_one_slab_of_pale_stone',find:'we_lift_the_slab_together'},
 {k:'hem',clue:'one_i_wore_and_never_saw',look:'good_cloak_on_its_peg',find:'four_stitches_no_more'},
 {k:'jar',clue:'one_sleeps_where_the_damp',look:'jar_of_barley_full_to_the_brim',find:'my_arm_goes_in_to_the_elbow'},
 {k:'bed',clue:'one_i_slept_on_as_a_man',look:'bed_a_low_frame_a_mattress',find:'between_the_frame_and_the_straw'},
 {k:'stone',clue:'one_is_kept_warm',look:'one_stone_beside_the_hearth',find:'it_lifts_out_behind'},
 {k:'roof',clue:'one_has_seen_the_stars',look:'mat_on_the_roof_rolled',find:'rolled_into_the_mat_a_pouch'}];
const found13=()=>G.h13||(G.h13=F.found?HIDE.map(h=>h.k):[]);
async function search(k,how){const f=found13(),h=HIDE.find(x=>x.k===k);if(f.includes(k))return say(P,'i_have_been_there');
  if(how==='look')return say(P,h.look);
  if(k==='hem'&&how!=='awl'&&how!=='knife')return say(P,'sewn_in_i');
  if(k==='hem')SFX.sew();else SFX.pick();f.push(k);await say(P,h.find);
  if(f.length<HIDE.length)return say(KL,['one_said','two_said','three_said','four_said','five_said'][f.length-1]);
  F.found=1;codeBtn();await say(KL,'six_said');return lastRoll()}
async function kleandros(){const f=found13();if(F.last)return say(KL,'tomorrow_in_the_open_street');if(F.found)return lastRoll();
  if(!G.kl13){G.kl13=1;await say(KL,'seven_i_paid_for_i')}
  const left=HIDE.filter(h=>!f.includes(h.k)),h=left[(G.kc13=(G.kc13||0)+1)%left.length];return say(KL,h.clue)}
/* the seventh: it is his to give up, and Paul only asks */
async function lastRoll(){if(F.last)return;await say(KL,'it_lies_in_the_strongbox');
  await say(KL,'paul_i_could');
  await think(P,null,[
    {q:'burn_it',no:'if_i_tell_him_he_has_only'},
    {q:'it_is_yours_to_decide',by:KL,no:'i_know_that_it_is_mine'},
    {q:'who_would_buy_it_from_you',ok:1,say:'who_would_buy_it_from_you'}]);
  await say(KL,'who_said');await say(P,'what_would_he_do_with_it');
  await say(KL,'what_i_did');
  await say(KL,'it_goes_with_the_others');F.last=1;SFX.good();codeBtn();
  await narr('he_had_asked_two_questions',{dur:6500});await fade(1,400);show13('street13',600,124,-1);await fade(0,500);
  await say(P,'seven_out_of_one_house',TH)}
/* the morning of the fire, and the sum */
async function lastMorning(){G.bd13=null;playAs(P);show13('street13',260,124,1);await fade(0,700);await narr('in_the_morning_they_carried',{dur:7500});
  await say(KL,'before_we_light_it_let',{to:null});await say(TI,'i_shall_keep_the_count')}
/* OWNERS: who lays down what. cap: what is written under the board; n: the sum that was said. The five add up to fifty thousand. */
const OWNERS=[
 {who:()=>KL,line:'roll_from_my_strongbox',cap:'kleandros_one_roll_at_twelve',n:15000},
 {who:()=>V1,line:'two_rolls_at_four_hundred_each',cap:'woman_two_rolls_at_four',n:1600},
 {who:()=>V2,line:'nine_thousand_and_nine_hundred',cap:'man_from_the_harbor_nine',n:9900},
 {who:()=>V3,line:'seven_rolls_bought_one',cap:'two_brothers_seven_rolls',n:5250},
 {who:()=>V4,line:'eighteen_thousand_two_hundred_and_fifty',cap:'old_man_eighteen_thousand',n:18250}];
const WANT=k=>OWNERS.slice(0,k+1).reduce((s,o)=>s+o.n,0);
const board=()=>G.bd13||(G.bd13={v:F.sum?50000:0,base:F.sum?50000:0,k:F.sum?5:0});
const digits=v=>[4,3,2,1,0].map(e=>Math.floor(v/Math.pow(10,e))%10);
async function toBoard(){if(F.sum)return say(PC(),'one_pebble_in_the_highest_place');
  await fade(1,220);board();show13('board13',160,236,1);await fade(0,260);const b=board();
  if(!b.told){b.told=1;await say(PC(),'counting_board_cut_the_greek',TH);
    await say(PC(),'pebble_that_lies_wrong',TH);await say(OWNERS[b.k].who(),OWNERS[b.k].line)}}
async function outBoard(){await fade(1,220);show13('street13',300,124,1);await fade(0,260)}
async function lay(i,five){const b=board();if(F.sum||b.k>4)return;const add=(five?5:1)*Math.pow(10,4-i),v=b.v+add;
  if(v>99999)return say(PC(),'board_has_no_place_higher_than_that',TH);const was=digits(b.v);b.v=v;const now=digits(v),carried=now.some((d,j)=>d%5<was[j]%5||d<was[j]);
  if(carried){carry13();if(!b.car){b.car=1;await say(PC(),'five_in_a_trough_are_one',TH)}}else pebble13()}
/* takeOff: one pebble is picked up again: from a trough, or from a hollow. What Timothy has already checked stays on the board. */
async function takeOff(i,five){const b=board();if(F.sum||b.k>4)return;const D=digits(b.v),val=(five?5:1)*Math.pow(10,4-i);
  if(!(five?D[i]>=5:D[i]%5>0))return say(PC(),five?'there_is_no_pebble_in_that_hollow':'there_is_no_pebble_in_that_trough',TH);
  if(b.v-val<b.base)return say(PC(),'that_one_was_laid_down',TH);b.v-=val;pebble13(.7)}
async function sweep(){const b=board();if(F.sum)return;if(b.v===b.base)return say(PC(),'bowl_of_river_pebbles');b.v=b.base;carry13();return say(PC(),'i_take_those_off_again',TH)}
async function reckon(){const b=board();if(F.sum||b.k>4)return;const want=WANT(b.k);
  if(b.v===b.base)return say(OWNERS[b.k].who(),OWNERS[b.k].line);
  if(b.v!==want)return say(TI,b.v<want?'i_have_more_than_that_on_my_tablet':'i_have_less_than_that_on_my_tablet');
  b.base=b.v;b.k++;SFX.pick();if(b.k<5){await say(TI,['fifteen_thousand','sixteen_thousand_six_hundred','twenty_six_thousand_five_hundred','thirty_one_thousand_seven_hundred_and_fifty'][b.k-1]);return say(OWNERS[b.k].who(),OWNERS[b.k].line)}
  F.sum=1;codeBtn();SFX.good();await say(TI,'one_pebble_in_the_highest');await wait(400);await outBoard();return fire()}
async function fire(){await say(KL,'fifty_thousand_pieces_of_silver',{to:null});G.fire13=performance.now();AU.amb={fire:.9,crowd:.4};AU.mood='fire';
  await tell('v19a');await tell('v19b');
  await narr('nobody_had_ordered_it',{dur:9500});await tell('v20');
  await fade(1,700);G.asia13='all';G.scene=asia13;AU.amb={wind:.25};await fade(0,700);
  await narr('he_had_not_left_the_city',{dur:7500,low:1});await tell('c1619',null,1);await tell('c169',null,1);
  endScreen({title:'the_hall_of_tyrannus',text:'learned_man_let_two_tentmakers_teach_him',
    based:'based_on_acts_18_23_19',
    go:'click_to_continue_to_chapter_fourteen',code:['chapter_fourteen_code_code',codeOf(14,0)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;startChapter(14)};await new Promise(()=>{})}

/* ============ ITEMS ============ */
Object.assign(ICON,{
  curt13(g){IH.square(g,GOAT,4,4,16,17);poly(g,[11,4,13,4,12.4,9,13.6,14,12,21,11,21,12.6,14,11.4,9],'#e9dfc2')},
  patch13(g){IH.square(g,'#4a3e34',8,4,8,17,'#8a7a5a')},
  curt13m(g){IH.square(g,GOAT,4,4,16,17);R(g,10.6,4,2.8,17,tint(GOAT,.22));for(let j=5;j<20;j+=2.4){R(g,10,j,1,.8,'#c8b890');R(g,13,j+1.2,1,.8,'#c8b890')}},
  apron13(g){poly(g,[7,6,17,6,19,20,5,20],'#8a6a4a');poly(g,[7,6,17,6,17.4,8.4,6.6,8.4],'#6a4e34');stroke(g,[7,7,3.4,9.4],'#6a4e34',1.2);stroke(g,[17,7,20.6,9.4],'#6a4e34',1.2);for(const x of[10,14])stroke(g,[x,9,x-.6,19.4],'rgba(30,20,12,.3)',.6)}});
Object.assign(ITEMS,{
  curt13:{name:'torn_curtain',look:'a_door_curtain_of_goat_hair'},
  patch13:{name:'strip_of_goat_hair',look:'a_strip_of_new_goat_hair'},
  curt13m:{name:'mended_curtain',look:'curtain_whole_again_both'},
  apron13:{name:'apron',look:'my_working_apron_goat_hair'},
  tab13:{name:'wax_tablets',icon:'tablets',def:'open',look:'our_tablets_what_we_were',by:{aq13:'our_tablets_what_we_were'},open:ITEMS.tablets.open}});
COMBO['curt13+patch13']=()=>say(P,'strip_to_lay_behind_the_tear');
COMBO['awl+curt13']=()=>say(P,'not_across_my_knee');
/* what lies on the bench of the workshop, as the story stands */
function benchTop13(g){const cl=(x,w,c,d)=>{poly(g,[x,84,x+w,84,x+w+2,91+(d||0),x+w*.6,89,x+w*.3,92+(d||0),x-2,90]);g.fillStyle=lg(g,0,82,0,92,[tint(c,.14),c,tint(c,-.3)]);g.fill();R(g,x,83.4,w,1.2,tint(c,.2));for(let i=3;i<w;i+=5)stroke(g,[x+i,84.6,x+i-.6,89],'rgba(30,20,20,.16)',.5)};
  const b=G.b13;
  if(F.aside&&!F.sent){/* the bench as a table: three loaves, a bowl, cups */
    for(const x of[92,112,160])oval(g,x,82.6,5.4,1.9,'#c89858');for(const x of[92,112,160])oval(g,x-.6,82.2,3.8,1.1,'#e0b878');vessel(g,134,84,4,3.4,'#9a5a36','bowl',{noShadow:1});for(const x of[102,124,146,172])vessel(g,x,84,1.7,3.6,'#b06a3a','jug',{noShadow:1})}
  else if(b&&b.on&&!F.sewn){cl(84,66,GOAT,2);if(b.pt)R(g,112,84.4,4,6.4,'#5a4c40');else poly(g,[113,84.4,115,84.4,114,90.6],'#d8ccac')}
  else if(F.hall&&DAY()===1&&PART()==='m')cl(88,60,'#b8703c',1);
  else if(F.hall&&DAY()<4&&PART()==='m')cl(100,54,GOAT,2)}
/* who is in the synagogue, besides those who speak: hearers on the benches (a figure with fr -1 sits), and, when the quarrel comes, men on their feet */
function synCast(g){const L=lightAt('syn13',160,120),sit={fr:-1,sw:0};
  if(!F.came)cast(g,[['hx13h',72,107,1,sit],['dz13b',92,107,1,sit],['hx13c',110,107,1,sit],['dz13e',214,107,-1,sit],['op13a',236,107,-1,sit],['dz13k',258,107,-1,sit],['hx13f',282,107,-1,sit],['dz13g',226,121,-1],['op13b',296,118,-1]],L);
  else if(F.syn&&!F.out)cast(g,[['op13a',214,120,-1,{ges:1}],['op13b',236,124,-1],['hx13h',262,118,-1],['hx13f',282,107,-1,sit],['dz13b',70,119,1],['dz13c',88,124,1],['dz13e',40,123,1],['dz13h',56,127,1],['dz13k',104,119,1]],L);
  else cast(g,[['hx13h',72,107,1,sit],['hx13c',110,107,1,sit],['op13a',236,107,-1,sit],['hx13f',282,107,-1,sit]],L)}
/* the curtain in the door of the hall: torn; taken down; or whole, and drawn across at midday */
function curtainArt(g){if(F.curt&&!F.hall)return;const whole=!!F.hall,x=414,y=54,P=whole?(PART()==='n'?[x,y,x+28,y,x+27,y+44,x,y+44]:[x,y,x+12,y,x+9,y+20,x+11,y+44,x,y+44]):[x,y,x+11,y,x+8,y+22,x+12,y+44,x,y+44];
  const dr=Q=>{poly(g,Q);g.fillStyle=lg(g,0,y,0,y+44,[tint(GOAT,.16),GOAT,tint(GOAT,-.3)]);g.fill();clipTo(g,()=>poly(g,Q),()=>{for(let i=2;i<28;i+=4.6)stroke(g,[x+i,y+1,x+i-.8,y+44],'rgba(0,0,0,.28)',.5)})};
  dr(P);if(!whole)dr([x+17,y,x+28,y,x+28,y+44,x+19,y+44,x+21,y+24]);else if(PART()==='n')R(g,x+12,y+1,3,43,tint(GOAT,.18))}
/* the heap of rolls in the street, and the fire in it: a few low tongues that rise and sink by turns, and smoke. Nothing in it flashes. */
function heapArt(g,t){const r=rng(1319);oval(g,347,124.6,30,3,'rgba(30,24,40,.3)');
  if(G.fire13){const k=Math.min(1,(performance.now()-G.fire13)/2600);
    /* scorch ring, ash scatter, and warm ember glow grounding the fire on the paving */
    oval(g,346,125.4,35,4.6,rgba('#201918',.38*k));oval(g,346,124.8,29,3.2,rgba('#362c28',.34*k));
    for(let i=0;i<14;i++){const ax=320+((i*17+5)%54),ay=123.6+((i*7)%5)*.6;R(g,ax,ay,1.6+(i%2),.7,rgba(i%3?'#7a746c':'#3a322c',.55*k))}}
  heapOf(g,346,124,17,r,1.5);
  if(G.fire13){const k=Math.min(1,(performance.now()-G.fire13)/2600);comp(g,'multiply',.55*k,()=>heapOf(g,346,124,17,rng(1319),1.5));
    /* glowing ember bed tucked into the foot of the charred scrolls */
    for(let i=0;i<8;i++){const ex=324+i*6.4,ey=123.2-(i%3)*1.8,pulse=.65+.35*Math.sin(t/220+i*1.9);
      oval(g,ex,ey,3.2,1.3,rgba('#b83412',.55*k*pulse));R(g,ex-1,ey-.4,2,.8,rgba('#ff9c30',.75*k*pulse))}
    /* steady, layered daylight flames with rounded bases rising out of the heap */
    for(let i=0;i<7;i++){const x=324+i*7.2,by=123.8-(i%3)*2.2,ph=Math.sin(t/250+i*1.7),h=(8.5+2.6*ph+((i+1)%3)*2.8)*k,w=2.4+(i%2)*.5;
      poly(g,[x-w,by,x-w*.7,by-h*.38,x-.2+ph*.35,by-h,x+w*.65+ph*.5,by-h*.44,x+w,by,x+w*.5,by+1.1,x-w*.5,by+1.1],'#cc3e14');
      poly(g,[x-w*.7,by+.2,x-w*.45,by-h*.32,x+.2*ph,by-h*.8,x+w*.5+ph*.3,by-h*.34,x+w*.7,by+.2],'#f07420');
      poly(g,[x-w*.42,by+.3,x+.3*ph,by-h*.56,x+w*.42,by+.3],'#ffc23a');
      oval(g,x,by-.4,w*.32,.9,rgba('#fff0a8',.85*k))}
    for(let i=0;i<5;i++){const q=((t/2600+i/5)%1);oval(g,346+Math.sin(i*2.4+q*3)*7,106-q*46,4+q*9,2.6+q*5,`rgba(90,84,96,${.28*k*(1-q)})`)}
    pool(g,346,122,42,16,'#ffb060',.22*k,'screen')}}
function streetDraw(g,t){depth(104.5,()=>curtainArt(g));const v=STREETV(),L=lightAt('street13',300,120);
  if(F.awl&&!F.tw)cast(g,[['dz13d',262,117,-1],['dz13e',300,116,-1],['dz13f',314,121,-1],['dz13g',288,126,-1],['dz13h',330,117,-1],['dz13i',346,123,-1],['dz13j',362,117,-1],['dz13k',376,125,-1],['dz13l',392,119,-1]],L);
  else if(v==='f'){depth(124,()=>heapArt(g,t));
    /* the table with the board, its two legs at its ends; and those who have come to see */
    depth(113,()=>{R(g,282,113.6,26,1.2,'rgba(30,22,40,.3)');wood(g,280,104,28,2.2,'#8a683a');R(g,280,104,28,.6,'#c8a06a');wood(g,281,106.2,2,7,'#5a4226',1);wood(g,305,106.2,2,7,'#5a4226',1);R(g,284,102.6,20,1.6,'#c8a878');R(g,284,102.6,20,.5,'#e8cc9c')});
    cast(g,[['hx13b',402,121,-1],['hx13c',420,117,-1],['dz13a',388,127,-1],['hx13d',434,124,-1],['hx13f',452,118,-1],['dz13b',226,118,1],['hx13g',210,124,1],['dz13i',470,125,-1],['hx13h',246,126,1],['hx13e',196,117,1]],L)}
  else if(v==='m'&&F.came&&F.tw&&!F.syn)cast(g,[['hx13c',96,117,1],['hx13d',540,118,-1]],L);
  else if(v==='m'&&!F.came)cast(g,[['hx13c',96,117,1],['hx13b',448,119,-1],['hx13e',560,118,1]],L);
  else if(v==='m'&&F.hall)cast(g,[['hx13e',100,117,1],['hx13b',540,119,-1]],L)}
/* who sits in the hall at midday, besides those who speak: more of them on each of the three days */
function hallCast(g){const d=DAY(),L=lightAt('hall13',160,120),sit={fr:-1,sw:0},A=[['dz13a',84,107,1,sit],['dz13b',106,107,1,sit],['dz13c',128,107,1,sit]],
    B=[['hx13b',150,107,1,sit],['dz13e',172,107,1,sit],['hx13f',194,107,1,sit],['dz13k',216,107,1,sit]],C=[['hx13d',118,121,1],['hx13c',98,125,1],['dz13i',140,126,1],['hx13h',78,122,1],['hx13g',160,121,1]];
  cast(g,d===1?A:d===2?A.concat(B):A.concat(B,C),L)}
/* the house: its owner, and what has been found so far, heaped by the door */
function houseDraw(g,t){const f=found13();cast(g,[['klea13',166,HFL+1,-1,{sw:0}]],'#f0d0a8');if(f.length){const r=rng(1321);heapOf(g,74,HFL+1,Math.min(7,f.length+(F.last?1:0)),r)}}
function houseFront(g){G.caps13=[];const n=found13().length+(F.last?1:0);cap13(g,T('found_n_of_seven',{n}),160,137,220)}
/* the board: the pebbles as they lie, and under it what is being laid down */
function boardDraw(g){const b=board(),D=digits(b.v),C=['#d8d2c4','#8a8a94','#c4b8a0','#e2dccc','#9a9488'];
  D.forEach((d,i)=>{const cx=BX[i]+BW[i]/2;if(d>=5)pebble(g,cx,BY+14,C[(i*2)%5]);for(let k=0;k<d%5;k++)pebble(g,cx+(k%2?.8:-.8),BY+34+k*10.6,C[(i+k)%5])})}
function boardFront(g){G.caps13=[];const b=board();
  cap13(g,b.k>4?'fifty_thousand_pieces_of_silver_2':OWNERS[b.k].cap,160,121,304);cap13(g,T('click_lays_a_pebble_pick',{pick:T('pick_up')}),160,129,308,'rgba(244,228,184,.8)');
  cap13(g,'timothy_checks_the_sum',104,137.4,150,'#f4e4b8');cap13(g,'back_to_the_street',262,137.4,100,'#f4e4b8')}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: whoever is played stands below the picture, and takes no step */
const MOOD=()=>!F.taught?'gap':!F.came?'lamp':!F.awl?'road':F.syn&&!F.out?'door':F.n3?'dawn':!F.hall?'lamp':PART()==='m'?'dawn':PART()==='n'?'noon':'lamp';
const SAMB=()=>{const v=STREETV();return v==='n'?{cicada:.8,wind:.2}:v==='e'?{crickets:.5,wind:.2}:v==='f'?{crowd:.5,birds:.2}:{crowd:.4,birds:.3,hammer:.15}};
const toStreet=()=>{const pc=PC();
  if(pc!==P){if(F.aside&&!F.sent)return say(AP,'not_with_a_guest_at_our_table');if(!pairOut())return say(AP,'our_place_is_at_the_bench_said');return goto('street13',196,120,1)}
  if(F.hall&&PART()==='m'&&OPEN13())return say(P,OPEN13(),TH);return goto('street13',196,120,1)};
ROOMS.shop13={space:1.1,floor:'earth',walk:[20,304,112,137],get mood(){return MOOD()},get amb(){return SHOPV()==='n'?{crickets:.4}:SHOPV()==='m'?{birds:.2}:{crowd:.2,hammer:.1}},hs:[
  {name:'door_to_the_street',x:230,y:34,w:68,h:70,wx:262,wy:114,dir:1,exit:toStreet,look:'the_street_and_the_colonnade_across_the_way',as:{aq13:{look:'street_a'}}},
  {name:'workbench',x:66,y:78,w:126,h:26,wx:130,wy:113,look:()=>say(P,F.hall?'the_bench':'bench_of_aquila_and_priscilla'),use:'there_is_nothing_of_mine',useWith:benchUse,
    as:{aq13:{look:()=>say(AP,F.aside&&!F.sent?'tonight_it_is_a_table':'our_bench_said'),use:'nothing_is_waiting_on_it'}}},
  {name:'torn_curtain',x:82,y:79,w:72,h:13,wx:118,wy:113,vis:()=>!!(G.b13&&G.b13.on&&!F.sewn),def:'use',look:()=>say(P,G.b13.pt?'strip_lies_behind_the_tear':'torn_with_the_weave_and_rotten'),use:()=>say(P,'with_the_awl_said'),useWith:curtainUse,as:{aq13:{look:'curtain_from_the_hall_of_the_school'}}},
  {name:'awning_for_the_potter',x:86,y:79,w:64,h:13,wx:118,wy:113,vis:()=>!!(F.hall&&DAY()===1&&PART()==='m'),def:'use',look:()=>say(P,F.b1?'sewn_and_the_thread_made_fast':'awning_for_the_potter_under_the_colonnade'),use:()=>say(P,F.b1?'it_is_done':'with_the_awl'),useWith:seam,as:{aq13:{look:'potters_awning'}}},
  {name:'table',x:84,y:76,w:96,h:10,wx:130,wy:113,vis:()=>!!(F.aside&&!F.sent),look:'bread_a_bowl_and_four_cups',as:{aq13:{look:'bread_a_bowl_and_a_cup',use:'after_he_has_eaten'}}},
  {name:'rolls_of_cloth',x:196,y:74,w:28,h:30,wx:190,wy:114,look:'goat_hair_cloth_and_linen',pickup:'it_is_theirs_and_it_weighs',as:{aq13:{look:'goat_hair_and_linen'}}},
  {name:'basket_of_remnants',x:302,y:88,w:18,h:16,wx:296,wy:114,dir:1,look:'basket_of_remnants_every',
    pickup:()=>PC()!==P?say(AP,'remnants_said'):F.patch?say(P,'one_strip_is_enough'):!F.curt?say(P,'remnants_i'):(F.patch=1,addItem('patch13'),say(P,'strip_of_new_goat_hair_said')),
    useWith:id=>id==='knife'?say(P,'cut_a_remnant_and_you_only'):false},
  {name:'coils_of_cord',x:76,y:38,w:48,h:20,wx:100,wy:113,look:'cord_each_coil_on_its_own',pickup:'each_hangs_where_a_hand_expects_it'},
  {name:'water_jar',x:54,y:90,w:12,h:15,wx:72,wy:113,dir:-1,look:'water_jar_said',pickup:'it_stays_where_it_is'},
  {name:'lamp',x:141,y:45,w:13,h:8,wx:148,wy:113,look:()=>say(PC(),SHOPV()==='d'?'lamp_on_its_shelf_for_the_hours':'one_lamp_it')},
  {name:'steps_to_the_loft',x:0,y:40,w:50,h:64,wx:48,wy:116,dir:-1,def:'use',look:'steps_to_the_loft_2',use:sleep,as:{aq13:{look:'the_loft',use:sleep}}}]};
ROOMS.street13={space:.7,walk:[16,624,112,138],get mood(){return MOOD()},get amb(){return SAMB()},hs:[
  {name:'way_down_to_the_harbor',x:0,y:48,w:54,h:56,wx:30,wy:122,dir:-1,look:()=>say(PC(),PC()===P?'the_way_down_to_the_harbor':'the_harbor')},
  {name:'colonnade_of_shops',x:56,y:46,w:62,h:58,wx:88,wy:114,look:'shops_under_a_colonnade_pots_and_bronze',as:{aq13:{look:'the_colonnade'}}},
  {name:'wine_sellers_door',x:122,y:62,w:22,h:42,wx:133,wy:114,def:'open',open:()=>evening('he'),use:()=>evening('he'),look:()=>evening('he'),as:{aq13:{open:()=>evening('he'),use:()=>evening('he'),look:()=>evening('he')}}},
  {name:'workshop',x:166,y:52,w:58,h:52,wx:196,wy:114,exit:toShop,look:()=>say(PC(),PC()!==P?'our_bench_under_our_awning':F.awl?'the_workshop_of_aquila_and_priscilla':'workshop_open_to_the_street')},
  {name:'door_of_the_synagogue',x:268,y:62,w:24,h:42,wx:280,wy:114,exit:toSyn,look:()=>say(PC(),PC()!==P?'synagogue_we':F.out?'door_of_the_synagogue_i_left':'door_of_the_synagogue_i_went')},
  {name:'theater',x:322,y:26,w:54,h:40,wx:350,wy:116,look:()=>say(PC(),'theater_in_the_hollow_of_the_hill')},
  {name:'stone_bench_2',x:352,y:94,w:20,h:10,wx:362,wy:113,look:'stone_bench_against_the_wall',use:'sit_by_the_sundial'},
  {name:'sundial',x:328,y:80,w:17,h:24,wx:352,wy:114,dir:-1,def:'use',use:dial,look:()=>say(PC(),T('sundial_on_a_pillar_a_hollow',{now:T(PC()!==P?'the_day_is_pauls_to_count':!F.hall?'i_have_no_hours_to_keep':DAY()>3?'nobody_is_looking_at_it_this_morning':PART()==='m'?'shadow_lies_on_the_first':PART()==='n'?'shadow_lies_on_the_middle_notch_midday':'the_shadow_has_gone_out_with_the_sun')}))},
  {name:'hall_of_tyrannus_2',x:410,y:48,w:36,h:50,wx:428,wy:114,exit:toHall,useWith:mine(hang),look:()=>say(PC(),!F.out?'hall_behind_a_porch_of_four_columns':F.hall?'school_auditorium_of_tyrannus':'hall_of_the_school')},
  {name:'torn_curtain',x:412,y:54,w:32,h:44,wx:428,wy:114,vis:()=>!!F.out&&!F.curt,def:'pickup',pickup:takeCurtain,look:'door_curtain_of_goat_hair_said',useWith:id=>id==='awl'||id==='thread'?say(P,'hanging_in_a_doorway'):false},
  {name:'fullers_vats',x:480,y:94,w:16,h:10,wx:490,wy:114,look:'a_fullers_vats',pickup:'no_2'},
  {name:'fullers_door',x:498,y:62,w:20,h:42,wx:508,wy:114,def:'open',open:()=>evening('gl'),use:()=>evening('gl'),look:()=>evening('gl'),as:{aq13:{open:()=>evening('gl'),use:()=>evening('gl'),look:()=>evening('gl')}}},
  {name:'door_under_the_vine',x:554,y:62,w:20,h:42,wx:564,wy:114,def:'open',open:()=>evening('di'),use:()=>evening('di'),look:()=>evening('di'),as:{aq13:{open:()=>evening('di'),use:()=>evening('di'),look:()=>evening('di')}}},
  {name:'door_of_the_large_house',x:606,y:58,w:22,h:46,wx:617,wy:114,def:'open',open:()=>evening('kl'),use:()=>evening('kl'),look:()=>evening('kl'),as:{aq13:{open:()=>evening('kl'),use:()=>evening('kl'),look:()=>evening('kl')}}},
  {name:'road_to_the_hills',x:628,y:98,w:12,h:46,wx:618,wy:126,dir:1,look:()=>say(PC(),PC()===P?'road_i_came_down_by_i':'road_inland')},
  {name:'heap_of_rolls',x:322,y:108,w:50,h:18,wx:306,wy:126,dir:1,vis:()=>!!F.n3,look:()=>say(PC(),G.fire13?'it_burns_low_and_steady':'rolls_from_a_great_many'),pickup:'nobody_is_taking_anything'},
  {name:'counting_board',x:280,y:98,w:28,h:16,wx:270,wy:124,dir:1,vis:()=>!!F.n3,def:'use',use:toBoard,look:'counting_board_on_a_table',as:{aq13:{use:toBoard,look:'a_counting_board'}}}]};
ROOMS.syn13={space:1.5,walk:[20,300,112,137],get mood(){return MOOD()},amb:{crowd:.5},enter:synEnter,hs:[
  {name:'door_to_the_street',x:13,y:47,w:30,h:57,wx:52,wy:116,dir:-1,exit:()=>PC()!==P?(F.syn?leaveSyn():goto('street13',280,120,1)):leaveSyn(),look:'door_to_the_street_2',as:{aq13:{look:'door_to_the_street_2'}}},
  {name:'chest_of_the_scrolls',x:140,y:50,w:40,h:40,wx:120,wy:113,look:'chest_of_the_scrolls_under_its_cloth',open:'it_is_not_mine_to_open_2',as:{aq13:{look:'chest_of_the_scrolls_said'}}},
  {name:'readers_table',x:130,y:80,w:60,h:22,wx:118,wy:113,look:()=>say(P,F.syn?'for_three_months_i_have_said':'table_from_which_the_law_said'),as:{aq13:{look:'readers_table_and_a_scroll'}}},
  {name:'benches',x:198,y:86,w:108,h:18,wx:240,wy:113,look:()=>say(PC(),F.syn&&PC()===P?'half_of_them_are_on_their_feet':'benches_of_stone_along_the_walls')},
  {name:'windows',x:82,y:20,w:156,h:26,wx:160,wy:113,look:'two_windows_high_in_the_wall'},
  {name:'disciples',x:30,y:76,w:80,h:54,wx:120,wy:124,dir:-1,vis:()=>!!F.syn&&!F.out,def:'talk',talk:withMe,look:'those_who_believe_the_twelve',as:{aq13:{look:'our_brothers',talk:withMe}}}]};
ROOMS.road13={space:.5,walk:[20,304,112,138],mood:'road',amb:{wind:.5,birds:.3,leaves:.3},hs:[
  {name:'sea',x:0,y:56,w:100,h:22,wx:60,wy:114,look:'the_sea'},
  {name:'harbor',x:30,y:78,w:80,h:12,wx:80,wy:114,look:'harbor_a_basin_and_the_river'},
  {name:'city',x:102,y:82,w:60,h:20,wx:130,wy:114,look:'ephesus_the'},
  {name:'theater',x:140,y:62,w:50,h:24,wx:164,wy:114,look:'theater_cut_into_the_hill'},
  {name:'building_in_the_plain',x:244,y:48,w:44,h:22,wx:250,wy:114,look:'far_off_in_the_plain_a_house'},
  {name:'pine',x:4,y:30,w:46,h:74,wx:44,wy:114,dir:-1,look:'pine_bent_by_the_wind_off'},
  {name:'road_down_to_the_city',x:296,y:96,w:24,h:48,wx:302,wy:126,dir:1,exit:intoCity,look:'road_goes_on_down_into_the_city'}]};
ROOMS.hall13={space:1.3,walk:[58,238,112,137],mood:'noon',amb:{cicada:.5,flap:.35},enter:hallEnter,hs:[
  {name:'door_curtain',x:13,y:39,w:34,h:65,wx:62,wy:118,dir:-1,exit:()=>goto('street13',428,120,1),look:'curtain_and_behind_it_a_street'},
  {name:'windows',x:90,y:20,w:136,h:22,wx:160,wy:113,look:'three_windows_their_shutters_half_closed'},
  {name:'benches',x:58,y:86,w:176,h:18,wx:150,wy:113,def:'talk',talk:speakHall,look:()=>say(P,DAY()===1?'benches_of_stone_and_more':DAY()===2?'benches_are_full':'not_a_hands_breadth_free')},
  {name:'desk',x:248,y:79,w:24,h:22,wx:236,wy:116,dir:1,def:'use',use:speakHall,look:'desk_for_a_roll_a_block'},
  {name:'teachers_chair',x:284,y:60,w:26,h:40,wx:238,wy:116,dir:1,look:'chair_of_the_schools_teacher',use:'it_is_not_my_chair'},
  {name:'box_of_rolls',x:210,y:92,w:26,h:12,wx:222,wy:113,look:'round_box_of_rolls_and_its_lid',open:'they_are_the_schools_books'},
  {name:'water_jar',x:50,y:92,w:8,h:12,wx:70,wy:113,dir:-1,look:'water_for_whoever_has_walked',use:'i_drink_it_is_still'},
  /* the chapter's hidden treasure: what a pupil left under the bench */
  {name:'something_under_the_bench',x:62,y:100,w:10,h:6,wx:84,wy:114,dir:-1,look:()=>say(P,'pupils_tablet_left_under_the_bench').then(()=>say(P,'somebody_will_tell_him')).then(treasure),pickup:'it_is_the_boys'}]};
const hideHs=(k,name,x,y,w,h)=>({name,x,y,w,h,wx:160,wy:236,def:'use',look:()=>search(k,'look'),use:()=>search(k,'use'),open:()=>search(k,'use'),pickup:()=>search(k,'use'),useWith:id=>id==='awl'||id==='knife'?search(k,id):false});
ROOMS.house13={space:1.2,walk:NOW,mood:'lamp',amb:{crickets:.4},hs:[
  {name:'door',x:57,y:61,w:22,h:50,wx:160,wy:236,look:'door_bolted_for_the_night',open:'not_yet_we'},
  hideHs('thr','threshold',54,111,28,7),
  {name:'water_jar',x:85,y:99,w:10,h:13,wx:160,wy:236,look:'water_nothing'},
  {name:'hearth',x:99,y:98,w:24,h:14,wx:160,wy:236,look:'hearth_a_pot_and_a_few',use:'lentils_said'},
  hideHs('stone','stone_by_the_hearth',124,104,9,9),
  {name:'lamp',x:131,y:59,w:15,h:13,wx:160,wy:236,look:'one_lamp_in_its_niche',pickup:'neither_of_us_would_see_anything'},
  hideHs('jar','jar_of_barley',142,90,17,23),
  hideHs('hem','cloak',183,56,24,38),
  {name:'strongbox',x:208,y:93,w:28,h:20,wx:160,wy:236,look:()=>say(P,F.found?'the_strongbox':'strongbox_with_a_hasp'),open:()=>F.found?lastRoll():say(P,'it_is_not_for_me_to_open')},
  hideHs('bed','bed',239,93,33,20),
  hideHs('roof','rolled_mat',194,20,32,10),
  {name:'jar_on_the_roof',x:86,y:17,w:12,h:12,wx:160,wy:236,look:'empty_jar_upside_down_on_the_roof'},
  {name:'steps_to_the_roof',x:280,y:30,w:38,h:82,wx:160,wy:236,look:'steps_of_stone_up_the_outside'},
  {name:'heap_by_the_door',x:58,y:100,w:34,h:12,wx:160,wy:236,vis:()=>found13().length>0,look:'what_we_have_found_so_far',pickup:'they_stay_together_where'},
  {name:'back_to_the_street',x:232,y:124,w:88,h:20,wx:160,wy:236,exit:()=>F.found&&!F.last?lastRoll():F.last?goto('street13',600,124,-1):say(P,'he_asked_me_to_help_him'),look:'street_and_the_night'}]};
const HOLLOW=['hollow_marked_mu_and_epsilon','hollow_marked_epsilon_with_a_stroke','hollow_marked_phi','hollow_marked_nu','hollow_marked_epsilon'],
  TROUGH=['trough_marked_mu_and_alpha','trough_marked_alpha_with_a_stroke','trough_marked_rho','trough_marked_iota','trough_marked_alpha'],
  HLOOK=['mu_for_a_myriad_with_a_small','epsilon_again_with_a_stroke','phi_said','nu_said','epsilon_the_fifth_letter'],
  TLOOK=['mu_for_a_myriad_with_a_small_said','alpha_again_with_a_stroke','rho_said','iota_said','alpha_the_first_letter_of_the_alphabet'];
/* The two at the bench walk these rooms as Paul does. Where a hotspot says nothing of its own for them, they do what he would do, if
   the handler asks who is played, and say what he would say, if the line is not in the first person. */
for(const id of['shop13','street13','syn13'])for(const h of ROOMS[id].hs){const a=(h.as=h.as||{}).aq13=(h.as&&h.as.aq13)||{};
  for(const v of['look','use','open','pickup','talk','useWith'])if(a[v]==null&&h[v]!=null&&(typeof h[v]==='function'||!/\b(I|my|me|mine)\b/.test(h[v])))a[v]=h[v]}
ROOMS.board13={space:.6,walk:NOW,get mood(){return MOOD()},amb:{crowd:.5,birds:.2},hs:[
  ...BW.map((w,i)=>({name:HOLLOW[i],x:BX[i]+w/2-10,y:BY+5,w:20,h:18,wx:160,wy:236,def:'use',use:()=>lay(i,1),pickup:()=>takeOff(i,1),look:()=>say(PC(),HLOOK[i]),as:{aq13:{use:()=>lay(i,1),pickup:()=>takeOff(i,1),look:()=>say(AP,HLOOK[i])}}})),
  ...BW.map((w,i)=>({name:TROUGH[i],x:BX[i]+w/2-10,y:BY+26,w:20,h:52,wx:160,wy:236,def:'use',use:()=>lay(i,0),pickup:()=>takeOff(i,0),look:()=>say(PC(),TLOOK[i]),as:{aq13:{use:()=>lay(i,0),pickup:()=>takeOff(i,0),look:()=>say(AP,TLOOK[i])}}})),
  {name:'bowl_of_pebbles',x:280,y:58,w:34,h:28,wx:160,wy:236,def:'use',use:sweep,pickup:sweep,look:'a_bowl_of_river_pebbles',as:{aq13:{use:sweep,pickup:sweep,look:'a_bowl_of_river_pebbles'}}},
  {name:'timothy_and_his_tablet',x:28,y:132,w:152,h:12,wx:160,wy:236,def:'talk',talk:reckon,use:reckon,look:()=>say(PC(),'timothy_keeps_the_count'),as:{aq13:{talk:reckon,use:reckon,look:()=>say(AP,'timothy_keeps_the_count_on_his_tablet')}}},
  {name:'back_to_the_street',x:212,y:132,w:100,h:12,wx:160,wy:236,exit:outBoard,look:'street_and_the_heap',as:{aq13:{look:'street_and_the_heap'}}}]};
ROOMS.house13.hs.splice(7,0,{name:'Kleandros',x:156,y:64,w:20,h:48,wx:160,wy:236,def:'talk',talk:kleandros,look:'kleandros_he'});

/* ============ PEOPLE ============ */
const pairTalk=async()=>{if(!F.awl)return reunion();if(!F.tw)return say(PR,'they_are_waiting_paul');
  if(!F.syn)return say(AP,'synagogue_has_been_asking');if(!F.out)return say(AP,'we_go_when_you_go');
  if(!F.hall){if(F.curt&&!F.patch){await say(P,'door_curtain_of_goat_hair_torn');return say(PR,'rotten_all_along_the_tear')}
    return say(AP,F.sewn?'that_will_hold':'dozen_households_and_more_coming')}
  const d=DAY(),p=PART();if(d>3)return say(PR,'i_never_thought_to_see_the_day');
  if(p==='m')return d===1&&!F.b1?say(PR,'long_seam_of_the_potters_awning_paul'):d===2&&!F.apr?say(PR,'she_has_been_standing_there'):say(AP,'go_brother');
  if(p==='n')return say(AP,'at_midday');
  return d===2&&!F.p2?say(PR,'diodotos_under_the_vine'):say(AP,'lamp_is_trimmed_and_your_bed')};
AP.hs={name:'aquila_and_priscilla',actor:AP,look:'aquila_and_priscilla_i',talk:pairTalk,
  give:id=>id==='curt13'?say(PR,'on_the_bench_with_it_paul'):false,
  show:{tablets:'you_read_and_we_listen_said',curt13m:'that_will_hold_said',patch13:'new_goat_hair',apron13:'i_cut_that_one_myself',awl:'it_has_not_been_used_since_cenchreae','*':'keep_it_by_you_brother_said'}};
const PAULHS={name:'Paul',actor:P,as:{aq13:{look:'paul_he_came_by',talk:()=>say(P,F.hall?'bench_before_sunrise_the_hall':'i_left_you_a_bench_and_a_promise'),show:{'*':'keep_it_it'}}}};
AO.hs={name:'Apollos',actor:AO,as:{aq13:{look:()=>say(AP,F.aside?'apollos_at_our_table':'apollos_a_jew_of_alexandria'),
  talk:()=>F.taught?sendOff():F.aside?atTable():listen(),show:{tab13:()=>say(AO,F.aside?'may_i_you':'after_i_have_spoken_friends'),'*':'later_friend'}}}};
PH.hs={name:'Philon',actor:PH,look:()=>say(P,G.room==='hall13'?(DAY()===3?'philon_on_a_bench_of_the_hall':'philon_in_the_doorway_neither'):F.out?'philon_he':'philon_of_the_synagogue_of_ephesus'),
  talk:()=>G.room==='hall13'?(DAY()===3?say(PH,'i_sat_down_paul'):say(PH,'i_am_only_standing_here').then(()=>say(P,'he_may_said'))):
    F.n3?say(PH,'i_never_owned_such_a_book'):F.out?say(PH,'i_have_sat_on_that_bench'):say(PH,'i_asked_you_to_stay_with_us'),
  show:{tablets:'i_know_what_is_on_them_said','*':'not_now_paul_said'},as:{aq13:{look:'philon_he_was',talk:()=>say(PH,'peace_both_of_you')}}};
SY.hs={name:'Symmachos',actor:SY,look:'symmachos',talk:quarrel,show:{tablets:'tablets_said','*':'put_that_away_2'},as:{aq13:{look:'symmachos_said',talk:quarrel}}};
ME.hs={name:'Menekrates',actor:ME,look:'menekrates_who_keeps_the_hall',talk:mene,give:id=>id==='curt13m'||id==='curt13'?hang(id):false,
  show:{curt13m:'do_not_show_it_to_me',curt13:'i_know_what_it_looks_like_friend',awl:'awl_then_you',patch13:'a_strip','*':'i_keep_a_hall_tentmaker'},as:{aq13:{look:'menekrates_of_the_school',talk:mene}}};
KL.hs={name:'Kleandros',actor:KL,look:()=>say(PC(),'kleandros_a_man_in_a_good'),talk:()=>say(KL,F.n3?(F.sum?'it_is_done_said':'let_it_be_reckoned_first'):'this_evening'),
  show:{tablets:'yours_i_am_not_afraid_of','*':'keep_it_paul_2'},as:{aq13:{look:'kleandros_a',talk:()=>say(KL,'your_bench_has_done_my_house')}}};
MY.hs={name:'Myrtale',actor:MY,look:()=>say(PC(),G.room==='hall13'?'myrtale_said':'woman_of_the_city_in_her_mantle'),
  talk:()=>G.room==='hall13'?say(MY,'this_is_my_husbands_brother_paul'):myrtale(),give:giveApron,show:{tablets:'i_cannot_read_tentmaker_said','*':'it_was_the_apron_i_came_for'},
  as:{aq13:{look:'she_has_come_for_paul',talk:myrtale}}};
WE.hs={name:'man_beside_myrtale',actor:WE,look:'man_i_have_not_met',talk:()=>say(WE,'i_came_to_listen').then(()=>say(P,'it_was_god_who_did_it_friend')),show:{'*':'later_i'}};
GL.hs={name:'Glaukos',actor:GL,look:'wool_merchant_by_the_dust',talk:glaukos,show:{tablets:'bring_them_this_evening','*':'is_it_wool'}};
HE.hs={name:'Hegesias',actor:HE,look:'seaman_his_cloth_is_wound',talk:hegesias,show:{tablets:'i_cannot_read_them_in_here','*':'would_it_float'}};
DI.hs={name:'Diodotos',actor:DI,look:()=>say(PC(),'carrier_with_the_road_still'),talk:()=>G.room==='street13'?evening('di'):diodotos(),show:{'*':'i_carry_enough_for_other_people'},as:{aq13:{look:'carrier_sitting_at_the_door',talk:()=>evening('di')}}};
TI.hs={name:'Timothy',actor:TI,look:'timothy_he_has_a',talk:()=>say(TI,F.n3?'tablet_is_ready':'i_came_as_soon_as_i_could'),
  show:{tablets:'i_have_my_own_with_me_paul','*':'i_would_rather_carry_it'},as:{aq13:{look:'timothy_grown',talk:()=>say(TI,'your_loft_here_is_tidier')}}};
const dzHs=(a,look)=>({name:a.name,actor:a,look,talk:()=>G.room==='syn13'?withMe():twelve(),show:{tablets:'we_have_the_scriptures','*':'keep_it_brother_2'},as:{aq13:{look:'one_of_the_twelve_men',talk:()=>G.room==='syn13'?withMe():twelve()}}});
D1.hs=dzHs(D1,'disciple_and_by_the_way');D2.hs=dzHs(D2,'an_old_disciple');D3.hs=dzHs(D3,'young_disciple_who_cannot_stand_still');
AP.def={look:'nothing_there_needs_our_hands',pickup:'it_is_not_ours',use:'that_is_not_for_us_to_do',open:'that_is_not_ours_to_open',talk:'later_2',give:'what_should_we_give'};
AP.noCraft='not_those_two_together';

/* ============ WAX TABLETS ============ */
/* Two pairs of tablets, in one table: Aquila and Priscilla's hold the way as they were taught it (HEARD), and Paul's what he has
   promised in Ephesus. Whoever is played opens his own. */
const mineT=f=>()=>PC()===P&&f(),oursT=f=>()=>PC()!==P&&f();
const TABLETS={
  people:[
    {name:'Apollos',note:()=>F.sent?'jew_of_alexandria':F.aside?'jew_of_alexandria_at_home':'jew_of_alexandria_who_is'},
    {name:'aquila_and_priscilla',note:'tentmakers_said',if:()=>!!F.awl},
    {name:'disciples_at_the_door',note:()=>F.tw?'about_twelve_men_baptized':'about_twelve_men',if:()=>!!F.awl},
    {name:'Philon',note:()=>F.n2?'he_has_found_himself_a_bench':F.n1?'he_stands_in_the_doorway':F.out?'he_stopped_at_the_door':'of_the_synagogue_of_ephesus_said',if:()=>!!F.syn},
    {name:'Symmachos',note:'he_speaks_against_the_way',if:()=>!!F.syn&&!F.hall},
    {name:'Menekrates',note:'he_keeps_the_hall_of_the_school',if:()=>!!F.men},
    {name:'Glaukos',note:'of_sardis',if:()=>!!F.g1},{name:'Myrtale',note:'she_asked_for_my_apron',if:()=>!!F.apr},
    {name:'Hegesias',note:'of_smyrna_a_seaman',if:()=>!!F.two},{name:'Diodotos',note:'of_thyatira',if:()=>!!F.two},
    {name:'Timothy',note:'he_has_come_to_ephesus',if:()=>!!F.m3},{name:'Kleandros',note:'he_wants_every_book_of_his_old',if:()=>!!F.kle}],
  tasks:[
    {t:'hear_the_man_from_alexandria',if:oursT(()=>!F.apo)},
    {t:'he_said_nothing_wrong',if:oursT(()=>!!F.apo&&!F.gap)},
    {t:'our_guest_first_what_is',if:oursT(()=>!!F.aside&&!F.taught)},
    {t:'apollos_means_to_cross_to_achaia',if:oursT(()=>!!F.taught&&!F.sent)},
    {t:'bench_said',if:oursT(()=>!!F.sent&&!(F.e2&&!F.p2)&&!(F.n3&&!F.sum))},
    {t:'diodotos_is_waiting_under_the_vine',if:oursT(()=>!!F.e2&&!F.p2)},
    {t:'find_the_two_whom_i_left',if:mineT(()=>!F.awl)},
    {t:'about_twelve_disciples',if:mineT(()=>!!F.awl&&!F.tw)},
    {t:'synagogue_i_said_that_i',if:mineT(()=>!!F.tw&&!F.syn)},
    {t:'every_answer_feeds_the_quarrel',if:mineT(()=>!!F.syn&&!F.out)},
    {t:'roof_for_the_disciples',if:mineT(()=>!!F.out&&!F.men)},
    {t:'mend_the_door_curtain_of_the_hall',if:mineT(()=>!!F.men&&!F.hall)},
    {t:()=>OPEN13(),if:mineT(()=>!!OPEN13())},
    {t:'move_the_shadow_on_at_the_sundial',if:mineT(()=>!!F.hall&&DAY()<4&&PART()!=='e'&&!OPEN13())},
    {t:'day_is_done',if:mineT(()=>!!F.hall&&DAY()<4&&PART()==='e'&&!OPEN13())},
    {t:'let_the_price_be_reckoned_before_everybody',if:()=>!!F.n3&&!F.sum}],
  scripture:[Object.assign({if:()=>!!F.came},PS.da244),Object.assign({if:()=>!!F.came},PS.ps1465),PS.is403],
  notes:{title:()=>PC()===P?'noted_in_ephesus':'way_as_we_were_taught_it',none:'nothing_yet_said',list:[
    ...HEARD.map(h=>({t:()=>ticked().t.includes(h.k)?T('heard_from_apollos_too_p',{p:T(h.t)}):h.t,if:()=>PC()!==P})),
    {t:'glaukos_of_sardis_where',if:mineT(()=>!!F.g1&&!F.a1)},
    {t:'hegesias_of_smyrna_at_the_wine',if:mineT(()=>!!F.two&&!F.a2)},
    {t:'diodotos_of_thyatira_under_the_vine',if:mineT(()=>!!F.two&&!F.p2)},
    {t:'kleandros_the_large_house',if:mineT(()=>!!F.kle&&!F.last)},
    {t:()=>T('in_the_house_of_kleandros',{n:found13().length+(F.last?1:0)}),if:mineT(()=>!!F.e3&&!F.n3)},
    {t:()=>T('gone_home_from_the_hall_list',{list:T(F.n2?'to_sardis_to_smyrna_to_thyatira':'to_sardis')}),if:mineT(()=>!!F.n1)}]}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={shop13:[150,122,1],street13:[196,120,1],syn13:[64,122,1],road13:[40,124,1],hall13:[70,124,1],house13:[160,236,1],board13:[160,236,1]};
const EVERY=[AO,PH,SY,ME,KL,MY,GL,HE,DI,TI,WE,D1,D2,D3];
function place13(room){for(const a of EVERY){a.room=null;a.bow=false;a.talk=false;a.seat=0}P.bow=false;AP.bow=false;PR.talk=false;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  /* until Acts 19:1 Paul is on the road: he stands in no room, and the two at the bench are played */
  if(!F.came){P.room=null;if(G.pc!==AP){G.pc=AP;G.inv=G.invs.aq13||(G.invs.aq13=[])}}
  const pc=PC(),e=ENT[room],d=DAY(),p=PART(),days=!!F.hall&&d<4;
  if(F.came&&(pc===P||!P.room))place(P,room,e[0],e[1],e[2]);
  /* at the bench before sunrise he works without his mantle, in an apron and with a cloth round his forehead */
  if(days&&p==='m'&&P.room==='shop13'){const gone=d===2&&F.apr;P.look=gone?LOOK.paul13c:LOOK.paul13b;P.wear=gone?'c':'b'}else if(P.wear){P.wear='';P.look=LOOK.paul}
  /* the two at the bench: where the story has them, unless they are out on an errand of their own */
  if(pc!==AP&&!(F.came&&pairOut()&&AP.room==='street13')){
    if(F.awl&&!F.tw)place(AP,'street13',176,118,1);else if(F.syn&&!F.out)place(AP,'syn13',32,130,1);else if(F.n3)place(AP,'street13',176,120,1);else place(AP,'shop13',196,120,-1)}
  if(F.aside&&!F.sent)place(AO,'shop13',178,120,-1);
  if(days&&d===2&&p==='m'&&!F.apr)place(MY,'shop13',262,120,-1);
  if(room==='syn13'){if(!F.came)place(AO,room,122,108,1);else if(!F.syn)place(PH,room,104,120,-1);else if(!F.out){place(SY,room,190,122,-1);place(PH,room,150,117,-1);place(D1,room,86,121,1)}}
  else if(room==='street13'){
    if(F.awl&&!F.tw){place(D3,room,232,126,-1);place(D1,room,248,119,-1);place(D2,room,276,123,-1)}
    if(F.out&&!F.n1&&!F.m1)place(PH,room,304,113,-1);
    if(F.out&&p!=='e'&&!F.n3)place(ME,room,398,113,-1);
    if(days&&d===2&&p==='e'&&!F.p2)place(DI,room,576,116,-1);
    if(F.n3){place(KL,room,372,121,-1);place(TI,room,318,116,-1);place(PH,room,500,121,-1);place(ME,room,484,116,-1);place(MY,room,150,121,1);place(WE,room,134,117,1)}}
  else if(room==='hall13'&&days&&p==='n'){
    if(d===1)place(GL,room,176,121,1);
    if(d===2){place(HE,room,196,124,1);place(DI,room,166,128,1);place(PH,room,58,115,1)}
    if(d===3){place(TI,room,246,128,-1);place(KL,room,146,122,1);place(MY,room,186,124,1);place(WE,room,204,121,1);place(PH,room,66,107,1);PH.seat=1}}
  /* a thing is shown to these two, or laid down with them: it is not handed over as between travelling companions */
  P.hs=PAULHS;P.party=AP.party=0;swapBtn()}
function setup13(){P.hs=PAULHS;P.called='Paul';G.ap13=G.b13=G.h13=G.bd13=G.as13=G.q13=G.map13=G.dial13=G.asia13=null;G.s13=G.heat13=G.my13=G.kl13=G.kc13=G.he13=G.fire13=0;G.caps13=[];
  G.invs={paul:['tablets','knife'],aq13:['tab13']};G.inv=G.invs.paul;drawInv()}

/* ============ THE START ============ */
async function start13(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(13);G.end={};
    try{await need('map');await SHARED.map.journey(ROAD1,{view:'aegean',labels:LAB13,speed:1400});await tell('v23',null,1)}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;setScore(MUSIC);show13('shop13',...ENT.shop13);drawInv();await fade(0,700);
    await narr('meanwhile_at_ephesus_the_bench',{dur:8000});await tell('v24');
    await say(AP,'they_say_in_the_street',{to:PR});
    await say(PR,'on_the_sabbath_the_bench_can_wait');codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
function hint13(){const d=DAY(),p=PART();
  if(PC()!==P){
    if(!F.apo)return G.room==='syn13'?['hear13',['he_is_saying_what_we_were','we_talk_to_apollos_and_choose']]:['syn13',['man_from_alexandria_speaks','we_go_out_by_the_door_and_in_at']];
    if(!F.gap)return['gap13',['he_said_nothing_wrong_q','we_talk_to_apollos_again']];
    if(!F.taught)return['table13',['he_is_our_guest_said','we_talk_to_apollos']];
    if(!F.sent)return['send13',['he_wants_to_cross_to_achaia','we_talk_to_apollos_said']];
    if(F.e2&&!F.n2&&!F.p2)return['vine13',['diodotos_is_sitting_under_his_vine','we_go_out_to_the_street']];
    if(F.n3&&!F.sum)return G.room==='board13'?BOARDH():['board13',['price_is_to_be_reckoned','we_use_the_counting_board']];
    return['pair13',['bench_is_ours_and_the_streets','we_change_back_to_paul']]}
  if(!F.awl)return G.room==='road13'?['down13',['city_lies_below_and_two','i_take_the_road_down_to_the_city']]:['find13',['somewhere_in_this_street','i_walk_to_the_workshop_said']];
  if(!F.q1)return['ask113',['they_are_disciples_already','i_talk_to_a_disciple_and_ask']];
  if(!F.q2)return['ask213',['they_have_not_heard_of_holy_spirit','i_talk_to_a_disciple_and_ask_said']];
  if(!F.tw)return['ask313',['john_himself_said_where_his_baptism_pointed','i_talk_to_a_disciple_john']];
  if(!F.syn)return['syn13b',['i_said_in_that_house_that_i','i_go_in_at_the_door_of_the_synagogue']];
  if(!F.out)return!F.withme?['with13',['no_answer_will_end_this_and_those_who','i_talk_to_the_disciples']]:['door13',['they_are_ready','i_go_out_by_the_door_to_the_street']];
  if(!F.men)return['mene13',['room_at_the_hour_when_nobody','i_talk_to_menekrates_in_front']];
  if(!F.curt)return['curt13',['he_will_give_the_hall_for_a_mended','i_pick_up_the_torn_curtain']];
  if(!F.sewn)return!F.patch?['patch13',['cloth_is_rotten_along_the_tear','in_the_workshop_i_pick']]:['sew13',['it_has_to_be_laid_out_flat','in_the_workshop_i_use_the_torn']];
  if(!F.hall)return['hang13',['it_is_whole','i_use_the_mended_curtain']];
  if(d>3)return F.sum?['end13',['it_is_reckoned','i_look_at_the_heap']]:G.room==='board13'?BOARDH():['board13',['let_the_city_hear_what','i_use_the_counting_board']];
  const open=OPEN13();
  if(p==='m'){if(d===1&&!F.b1)return['seam13',['an_awning_is_promised_for_today','in_the_workshop_i_use_the_awl']];
    if(d===2&&!F.apr)return['apron13',['she_asks_for_nothing_but_the_apron','i_give_the_apron_to_myrtale']];
    return['dial13',['mornings_work_is_done','in_the_street_i_use_the_sundial']]}
  if(p==='n'){if(G.room!=='hall13')return['hall13',['sun_is_high','i_go_in_at_the_hall_of_tyrannus']];
    if(!F['t'+d])return['talk13',['they_have_come_through','i_use_the_desk']];
    if(d===1&&!F.g1)return['glau13',['one_of_them_is_still_sitting','i_talk_to_glaukos']];
    if(d===2&&!F.two)return['two13',['two_of_them_want_more_than_the_talk','i_talk_to_hegesias_and_to_diodotos']];
    return['dial13b',['midday_is_over','i_go_out_and_use_the_sundial']]}
  if(d===1&&!F.a1)return G.room==='street13'?['full13',['he_lodges_with_a_fuller','i_open_the_fullers_door']]:['ev13',['glaukos_is_expecting_me_said','i_go_out_to_the_street']];
  if(d===2&&!F.a2)return['wine13',['hegesias_sails_at_first_said','i_open_the_wine_sellers']];
  if(d===2&&!F.p2)return['swap13',['i_cannot_be_at_two_tables','i_change_to_aquila_and_priscilla_the']];
  if(d===3&&!F.found)return G.room==='house13'?['seek13',['man_hides_such_things_well','i_talk_to_kleandros_and_look']]:['klea13',['kleandros_asked_me_to_his_house_said','i_open_the_door_of_the_large']];
  if(d===3&&!F.last)return['last13',['it_is_his_roll_and_his_house','i_ask_him_who_would_buy_it']];
  return['loft13',['the_day_is_done','in_the_workshop_i_use_the_steps']]}
const SUMS=['fifteen_thousand_2','sixteen_thousand_six_hundred_2','twenty_six_thousand_five_hundred_2','thirty_one_thousand_seven_hundred_and_fifty_2','fifty_thousand'];
const BOARDH=()=>['sum13',['greeks_write_their_numbers_with_letters',
  T('from_the_right_alpha_one',{n:T(SUMS[Math.min(4,board().k)])})]];

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['shop13','street13','syn13','road13','hall13','house13','board13'],setup:setup13,start:start13,hint:hint13,music:MUSIC,scenes:{asia:asia13,dial:dial13},topics:[],tablets:TABLETS,beds:BEDS,calls:CALLS,
  /* for the playtest: what is told, the notes, the hiding places, the board, the province, the day */
  told:TOLD,ps:PS,heard:HEARD,hide:HIDE,owners:OWNERS,want:WANT,board,digits,towns:TOWN,roads:ROADS,shown:SHOWN,axy:AXY,dots:roadDots,day:DAY,part:PART,open:OPEN13,answers:ANSWERS,road1:ROAD1,road2:ROAD2,given:given13,
  view:'aegean',labels:LAB13,route:ROAD2,
  flags:['apo','gap','aside','taught','sent','came','awl','q1','q2','tw','syn','withme','out','men','curt','patch','sewn','hall','b1','m1','t1','g1','e1','a1','n1','apr','m2','t2','two','e2','a2','p2','n2','m3','t3','kle','e3','found','last','n3','sum'],
  /* seven rooms and forty-one flags today; the code keeps room for sixteen and for forty-eight. Two can be played: Paul, and the two at the bench. */
  codeBits:{flags:48,rooms:4},party:['paul','aq13'],ent:ENT,home:{tab13:'aq13'},
  away:id=>id==='paul'&&!F.came,
  inv:room=>['tablets','knife'].concat(F.awl?['awl','thread']:[],F.curt&&!F.sewn?['curt13']:[],F.patch&&!F.sewn?['patch13']:[],F.sewn&&!F.hall?['curt13m']:[],F.hall&&DAY()===2&&PART()==='m'&&!F.apr?['apron13']:[],['tab13']),
  place:place13}
});
