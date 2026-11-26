/* Paul of Tarsus: Herod's palace at Caesarea, which reached out into the sea (Study Edition media "Caesarea"), shared by the chapters
   that stand in it: Chapter Nineteen brings Paul there (Acts 23:33-35), Chapter Twenty holds the hearing before Felix in its court
   (Acts 24), Chapter Twenty-One the hearing before Festus (Acts 25:6-12). The court is the same place in all three, in the same
   geometry, so that the governor's seat, the dais and the columns never move from one chapter to the next. Loaded on demand with
   need('caesarea') (list 'caesarea' in the chapter's needs, with 'coast', 'temple' and 'materials', which it paints with: it touches
   them only inside its functions, since the files of a chapter's needs load side by side) and registered in shared/pwa.js for offline
   play. Painted to the standard of Chapters Fifteen to Nineteen: on the half-pixel canvas, light per pixel, soft contact shadows,
   dithered once by the engine.

   The court: a court of the palace, paved in pale stone, open at the back over a low sea wall to the sea, which runs to the one horizon
   (y 60, HZ). We look north along the coast: the sea is at the left (west), the land behind the palace at the right (east). At the
   right the hall of the palace: a portico of four columns under a deep beam and the eave of its roof, standing on a solid pier at its
   left end, which stands across nothing: the sea and its horizon end at the pier. Above the beam the palace's upper storey goes on out
   of the picture: no roof or gable is seen against the sky. Behind the columns the hall's back wall in shade, painted in panels of
   imitation stone that stop short of the columns (no band runs behind them). Before the portico a dais of two broad steps of white
   stone, the governor's wooden seat on it (its top at y 91, where a seated figure's hips rest; legs at its two ends, curving a little,
   no rail, and a solid back) and a small table beside it. No temple anywhere (Caesarea is not one of CONTRIBUTING section 3's four
   cities); no standard, no image. Heads in the walk strip come at y 62..96: behind them lie the back wall between two columns, the sea
   wall, the sea and the sky; nothing round.

   Two hours, each with its own light, which the painted shade and the figures' cast shadows (light()) share:
     'evening'  (Chapter Nineteen) the sun of the late afternoon out of the picture at the left, over the sea: the sea wall's face, the
                columns and the dais are lit from the left, their shadows fall to the right and toward us, and a faint road of light
                lies on the water at the left edge.
     'morning'  (the hearings of Chapters Twenty and Twenty-One) the sun low at the right, inland, behind the palace: the columns, the
                dais and the seat are lit from the right, their shadows fall to the left, toward the sea; the sky over the sea is the
                clear one of the side away from the sun, and no road of light lies on the water.

   API (SHARED.caesarea):
     court(g, o)     paints the court for a 320 by 144 room and returns the sea's motion S (S.draw(g, t) in the room's draw makes the
                     water move; S.open already limits it to the open sea left of the pier). o:
                       hour    'evening' (default) or 'morning'
                       letter  the commander's letter lies unrolled on the small table (Chapter Nineteen, once it has been read)
                       table   the small table beside the seat (default true)
                       desk    a scribe's writing table with its stool, at the back of the court to the left of the dais (DESK), with
                               a wax tablet open on it and a pen beside it
     O(hour)         the options of shared/coast.js for that hour (horizon, sun, cloud), for any other picture of this coast that
                     must stand in the same light
     light(hour)     ART[id].light for a room of the court: {amb, sun, wallY}
     birds(hour)     ROOMS[id].birds: gulls over the water, two standing on the coping of the sea wall (fair weather by day)
     HZ              the horizon, y 60
     WALK            the walk strip of the court, [30, 300, 114, 138], wholly in front of the dais and the desk: nothing painted
                     stands in it, so the court needs no props or footprints
     WALLY           the foot of the hall's back wall (y 96), where a shadow cast back would bend upward
     COPING          the top of the sea wall (y 80.4), where the gulls stand
     PIER, COLS      the pier at the portico's left end [x0, x1] and the middle of each column (x)
     DAIS            {lower:[x0, x1, top, foot], upper:[x0, x1, top, foot]}: the two steps
     SEAT            the governor's seat: {x0, x1, top 91, foot 100, at:[238, 100, -1]} (at: where the governor sits, facing left;
                     set the figure's seat flag)
     TABLE           the small table beside the seat: {x0, x1, top, foot}
     DESK            the scribe's writing table and stool: {x0, x1, top, foot, stool:{x0, x1, top, foot}, at:[x, y, 1]} (at: where the
                     scribe sits, facing the governor, seat flag set)
     AT              where people stand for a hearing (room pixels of the feet, and the way each faces): governor, scribe, accused,
                     guard (beside the accused, on his left, for the chain), officer, accusers (a list, nearest the governor first;
                     they face the seat too, and stand round the accused when the level spreads them so), advisers (two, on the upper
                     step at either side of the seat) */
SHARED.caesarea=(()=>{
"use strict";
const HZ=60,PIER=[186,197],COLS=[224,256,288,318],WALK=[30,300,114,138],WALLY=96,COPING=80.4,
  DAIS={lower:[196,308,104,112],upper:[204,300,98,104]},
  SEAT={x0:229,x1:248,top:91,foot:100,at:[238,100,-1]},
  TABLE={x0:264,x1:284,top:89,foot:100},
  DESK={x0:178,x1:193,top:97,foot:110,stool:{x0:164,x1:176,top:101,foot:110},at:[170,110,1]},
  AT={governor:[238,100,-1],scribe:[170,110,1],accused:[188,126,1],guard:[166,130,1],officer:[284,126,-1],
    accusers:[[136,122,1],[112,128,1],[90,120,1],[66,126,1]],advisers:[[214,101,1],[292,101,-1]]};
/* the coast's options for each hour; one object per hour, kept, so that shared/coast.js keeps its light on it (O.L) */
const OPT={evening:{w:320,hz:HZ,hour:'evening',sun:[-80,14],cloud:.16,streak:.35,seed:1972,y1:82},
  morning:{w:320,hz:HZ,hour:'morning',sun:[400,18],cloud:.16,streak:.35,seed:1972,y1:82}};
const O=hour=>OPT[hour==='morning'?'morning':'evening'];
/* the figures' light: sun:[dx, dy, strength] is the tip of the shadow of a figure 46 pixels tall, from its feet */
const LIGHT={evening:{amb:'#f6e0c8',sun:[22,7,.35],wallY:WALLY},morning:{amb:'#f4eee4',sun:[-22,7,.35],wallY:WALLY}};
const light=hour=>{const L=LIGHT[hour==='morning'?'morning':'evening'];return{amb:L.amb,sun:L.sun.slice(),wallY:L.wallY}};
const birds=()=>({gulls:[8,6,168,36],stand:[[46,COPING,1],[92,COPING,-1]]});
const sh=(...a)=>SHARED.materials.shadow(...a);

function court(g,o){o=o||{};const K=SHARED.coast,E=o.hour!=='morning',Op=O(o.hour),r=rng(1971),S='#e6d8bc';K.light(Op);
  K.sky(g,Op);
  const sea=K.sea(g,Op);sea.open=(x,y)=>x<PIER[0]-.5&&y>HZ+.5&&y<80;
  /* the court's paving, toward us */
  pave(g,-2,96,322,144,'#dccbab',r,{vx:150,vy:HZ,rows:6,step:34,v:.06,t:.3,rand:1});
  seaWall(g,r,S,E);
  hall(g,r,S,E);
  dais(g,r,E);
  seat(g,E);
  if(o.table!==false)table(g,o,E);
  if(o.desk)desk(g,E);
  lightUp(g,E);
  return sea}
/* the sea wall: a coping of long stones whose top (y 80.4) is where the gulls stand, its lip lit; under it the face of the wall in large
   drafted blocks, half lit by the low sun (from the left in the evening, raking from the right in the morning); the shade gathering
   at its foot */
function seaWall(g,r,S,E){const x1=PIER[0],T=COPING;
  SHARED.temple.stone(g,0,83,x1,13,r,{bh:6.5,bw:22,c:'#d6c6a4',v:.07,rough:1,age:.6});
  g.fillStyle=E?lg(g,0,0,x1,0,['rgba(255,220,170,.22)','rgba(255,220,170,0)']):lg(g,0,0,x1,0,['rgba(150,160,200,.12)','rgba(255,244,220,.16)']);g.fillRect(0,83,x1,13);
  R(g,0,T,x1,2.6,tint(S,.06));R(g,0,T,x1,.6,'#fff6e4');R(g,0,T+2.1,x1,.5,'rgba(90,70,80,.45)');
  for(let x=18+r()*10;x<x1-4;x+=26+r()*14)R(g,x,T+.6,.5,1.6,'rgba(110,90,90,.4)');
  R(g,0,T+2.6,x1,.8,'rgba(70,52,64,.35)');ao(g,0,90,x1,6,'b',.3,'#4a3848')}
/* the hall: the pier at its left end, from the floor to the beam; the back wall in shade with its painted panels between the columns;
   the columns with their bases and capitals; the deep beam over them and the eave of the roof */
function hall(g,r,S,E){const[p0,p1]=PIER,B0=16,B1=27,F=WALLY;
  /* the back wall, deep in the portico's shade, and the strip of the hall's floor in front of it */
  g.fillStyle=lg(g,0,B1,0,F,['#6a5a5c','#86726c','#9a8678']);g.fillRect(p1,B1,320-p1,F-B1);
  inRect(g,p1,B1,320-p1,F-B1,()=>{tex(g,'mott',.3,p1,B1,320-p1,F-B1,'overlay',1);
    /* the panels: deep red and ochre fields like veined stone, each framed by a pale line, all inside its own bay */
    const bays=[p1].concat(COLS);for(let i=0;i<bays.length-1;i++){const a=bays[i]+(i?5:3),b=bays[i+1]-5,col=i%2?'#7a3a30':'#9a6a3a';if(b-a<6)continue;
      for(const[y0,y1]of[[B1+8,B1+30],[B1+34,F-9]]){R(g,a,y0,b-a,y1-y0,col);inRect(g,a,y0,b-a,y1-y0,()=>{tex(g,'blotch',.45,a,y0,b-a,y1-y0,'soft-light',1);
          for(let k=0;k<6;k++){let vx=a+r()*(b-a),vy=y0+r()*(y1-y0);const p=[vx,vy];for(let s=0;s<5;s++){vx+=(r()-.3)*3;vy+=(r()-.5)*2;p.push(vx,vy)}stroke(g,p,rgba(tint(col,.3),.35),.5)}});
        R(g,a,y0,b-a,.5,'rgba(230,210,180,.35)');R(g,a,y1-.5,b-a,.5,'rgba(40,24,24,.4)')}}
    R(g,p1,F-4,320-p1,4,'#8a7868');R(g,p1,F-4,320-p1,.5,'rgba(230,210,190,.3)');
    ao(g,p1,B1,320-p1,12,'t',.55,'#1e1420')});
  /* the pier: a solid block of the same stone, its face lit from the sun's side, shaded toward the other */
  g.fillStyle=lg(g,p0,0,p1,0,E?[tint(S,.12),tint(S,.02),tint(S,-.2)]:[tint(S,-.18),tint(S,.02),tint(S,.1)]);g.fillRect(p0,B1,p1-p0,F-B1);
  SHARED.temple.age(g,p0,B1,p1-p0,F-B1,rng(1973),.5);if(E)R(g,p0,B1,.6,F-B1,'#fff4e0');else{R(g,p0,B1,.6,F-B1,'rgba(80,60,74,.4)');R(g,p1-.6,B1,.6,F-B1,'rgba(255,246,228,.7)')}
  R(g,p0-.8,F-4,p1-p0+1.6,4,tint(S,-.02));R(g,p0-.8,F-4,p1-p0+1.6,.5,'#fff0d8');R(g,p0-1,B1,p1-p0+2,2.2,tint(S,.08));R(g,p0-1,B1+2.2,p1-p0+2,.5,'rgba(80,60,70,.4)');
  for(const x of COLS)column(g,x,S,B1,F,E);
  /* the deep beam: an architrave of two faces, a frieze, a moulding; then the eave of the roof, its underside in shade, its edge lit */
  const xb=p0-2;g.fillStyle=lg(g,0,B0,0,B1,[tint(S,.06),tint(S,-.04)]);g.fillRect(xb,B0,320-xb,B1-B0);
  tex(g,'mott',.3,xb,B0,320-xb,B1-B0,'overlay',1);R(g,xb,B0,320-xb,.6,'#fff4e0');R(g,xb,B0+4,320-xb,.5,'rgba(90,70,80,.35)');R(g,xb,B0+4.5,320-xb,.5,'rgba(255,240,220,.4)');
  R(g,xb,B1-3.6,320-xb,.5,'rgba(90,70,80,.35)');R(g,xb,B1-.6,320-xb,.6,'rgba(60,44,56,.6)');R(g,xb,B0,.6,B1-B0,E?'#fff6e8':'rgba(90,70,84,.45)');
  /* above the beam the upper storey of the palace, which goes on out of the picture: dressed stone, a moulding under it, two small
     windows without bars, dark */
  SHARED.temple.stone(g,xb,0,320-xb,B0-1.6,rng(1974),{bh:5.4,bw:18,c:'#dcccac',v:.07,age:.6});
  g.fillStyle=E?lg(g,xb,0,320,0,['rgba(255,214,160,.25)','rgba(120,100,140,.25)']):lg(g,xb,0,320,0,['rgba(130,120,160,.22)','rgba(255,240,210,.2)']);g.fillRect(xb,0,320-xb,B0);
  R(g,xb,0,.6,B0,E?'#fff4e0':'rgba(90,70,84,.4)');
  for(const wx of[236,284]){R(g,wx,2.4,6,8,'#2e2224');R(g,wx,2.4,6,1.2,'#1a1214');R(g,wx-.8,10.4,7.6,1,'#f0e2c4');R(g,wx-.8,11.4,7.6,.5,'rgba(70,50,60,.45)')}
  R(g,xb-1.4,B0-1.6,322-xb,1.8,tint(S,.1));R(g,xb-1.4,B0-1.6,322-xb,.5,'#fff6e4');R(g,xb-1.4,B0,322-xb,.5,'rgba(70,52,64,.5)');
  ao(g,p1,B1,320-p1,6,'t',.4,'#1a1018')}
/* column: a column of the portico, standing on the hall's floor line: a square plinth and a round moulding, the shaft lit from the
   sun's side and fluted, a capital of two mouldings hardly wider than the shaft under the beam; its shade on the back wall on the side
   away from the sun */
function column(g,x,S,top,bot,E){const sw=3.4,cap=4,base=4.4,y0=top+cap,y1=bot-base,mir=a=>E?a:a.slice().reverse();
  comp(g,'multiply',.35,()=>{if(E){g.fillStyle=lg(g,x+sw,0,x+sw+8,0,['rgba(90,70,100,1)','rgba(90,70,100,0)']);g.fillRect(x+sw,top,8,bot-top)}
    else{g.fillStyle=lg(g,x-sw,0,x-sw-8,0,['rgba(90,70,100,1)','rgba(90,70,100,0)']);g.fillRect(x-sw-8,top,8,bot-top)}});
  g.fillStyle=lg(g,x-sw,0,x+sw,0,mir([tint(S,.06),tint(S,.2),tint(S,.04),tint(S,-.18),tint(S,-.34)]));g.fillRect(x-sw,y0,sw*2,y1-y0);
  for(let k=-2;k<=2;k++){const u=k/2.8,fx=x+Math.sin(u*1.3)*sw*.9,fw=Math.max(.5,Math.cos(u*1.3)*.9);R(g,fx,y0+.6,fw*.5,y1-y0-1.2,rgba(tint(S,-.4),.3));R(g,E?fx-.5:fx+fw*.5,y0+.6,.5,y1-y0-1.2,rgba('#fff8ec',.25*Math.cos(u)))}
  inRect(g,x-sw,y0,sw*2,y1-y0,()=>tex(g,'mott',.25,x-sw,y0,sw*2,y1-y0,'overlay',1));
  g.fillStyle=lg(g,x-sw-1,0,x+sw+1,0,mir([tint(S,.2),tint(S,.04),tint(S,-.3)]));g.fillRect(x-sw-.6,y0-2,sw*2+1.2,2);R(g,x-sw-.6,y0-.5,sw*2+1.2,.5,'rgba(60,44,56,.4)');
  R(g,x-sw-1,top,sw*2+2,2,tint(S,.06));R(g,x-sw-1,top,sw*2+2,.5,'#fff4e0');
  g.fillStyle=lg(g,x-sw-1.2,0,x+sw+1.2,0,mir([tint(S,.2),tint(S,.02),tint(S,-.3)]));g.fillRect(x-sw-.8,y1,sw*2+1.6,1.8);
  R(g,x-sw-1.4,y1+1.8,sw*2+2.8,base-1.8,tint(S,-.06));R(g,x-sw-1.4,y1+1.8,sw*2+2.8,.5,'#fff0d8');
  sh(g,E?x+2:x-2,bot+.2,sw+2,.9,.4)}
/* the dais: two broad steps of white stone with grey veins, their treads lit, their faces half lit, the end that faces the sun in
   full light; the shade they throw on the paving on the other side */
function dais(g,r,E){const C='#ece4d4',steps=[DAIS.lower,DAIS.upper].map(([x0,x1,t,b])=>[x0,x1,t,t+2.6,b]);
  comp(g,'multiply',.3,()=>poly(g,E?[308,112,316,112,312,104,306,104]:[196,112,188,112,192,104,198,104],'#6a5a7a'));
  for(const[x0,x1,t,f,b]of steps){
    g.fillStyle=lg(g,0,t,0,f,[tint(C,.08),tint(C,.02)]);g.fillRect(x0,t,x1-x0,f-t);
    g.fillStyle=lg(g,x0,0,x1,0,E?[tint(C,-.04),tint(C,-.12),tint(C,-.2)]:[tint(C,-.2),tint(C,-.12),tint(C,-.04)]);g.fillRect(x0,f,x1-x0,b-f);
    inRect(g,x0,t,x1-x0,b-t,()=>{tex(g,'mott',.25,x0,t,x1-x0,b-t,'overlay',1);
      for(let k=0;k<5;k++){let vx=x0+r()*(x1-x0),vy=t+r()*(b-t);const p=[vx,vy];for(let s=0;s<6;s++){vx+=1+r()*3;vy+=(r()-.5)*1.4;p.push(vx,vy)}stroke(g,p,'rgba(120,116,130,.3)',.5)}});
    R(g,x0,t,x1-x0,.5,'#fffcf4');R(g,x0,f-.4,x1-x0,.5,'rgba(255,255,250,.6)');R(g,x0,b-.5,x1-x0,.5,'rgba(70,60,80,.4)');
    poly(g,E?[x0,t,x0+1.4,t,x0+1.4,b,x0,b]:[x1-1.4,t,x1,t,x1,b,x1-1.4,b],'#fffaf0');
    for(let x=x0+28+r()*6;x<x1-10;x+=34+r()*8)R(g,x,f+.6,.5,b-f-1.2,'rgba(120,110,120,.35)')}
  ao(g,196,112,112,3,'t',.2,'#4a3a4a')}
/* the governor's seat: a chair of dark wood on the upper step, its seat's top at y 91 where the hips rest; a leg at each end, curving out
   a little to its foot; a solid back, rising behind the sitter on the right, a little reclined, rounded at its top; no rail between the
   legs. Lit from the sun's side. */
function seat(g,E){const W='#6a4428',{x0,x1,top:T,foot:FL}=SEAT;
  sh(g,(x0+x1)/2+(E?2:-2),FL+.2,11,1,.5);
  for(const[x,d]of[[x0+1,-1],[x1-1.6,1]]){poly(g,[x,T+2,x+1.6,T+2,x+1.6+d*.4,FL-3,x+1.4+d*1.2,FL-.2,x+d*1.2,FL,x+d*.2,FL-3],(d<0)===E?'#8a5a34':'#4a2e1a');R(g,x+d*1.2-.4,FL-.6,2.2,.6,'#3a2414')}
  /* the back: a solid curved panel behind the sitter */
  poly(g,[x1-4.4,T,x1-1,T,x1+1.6,74,x1+1.4,71.6,x1,70.8,x1-1.8,71.4,x1-3.4,74]);g.fillStyle=lg(g,x1-4,0,x1+2,0,E?['#8a5a34',W,'#3e2616']:['#3e2616',W,'#8a5a34']);g.fill();
  stroke(g,E?[x1-3.2,74,x1-1.8,71.6,x1,71]:[x1,71,x1+1.2,71.8,x1+1.4,74],'#b08050',.5);
  /* the seat: a thick board, its front edge lit */
  R(g,x0,T,x1-x0,2.2,W);R(g,x0,T,x1-x0,.6,'#a87a4a');R(g,x0,T+1.8,x1-x0,.5,'#3a2414');
  inRect(g,x0,T,x1-x0,2.2,()=>tex(g,'wood',.3,x0,T,x1-x0,2.2,'overlay',.5));
  /* a cushion of purple wool along the back of the seat, behind the sitter */
  R(g,x1-6,T-1.2,5,1.4,'#6a3a5a');R(g,x1-6,T-1.2,5,.5,'#9a6a8a')}
/* the small table beside the seat: a top of the same wood on two legs at its ends; the commander's letter lies on it once it has been
   read (o.letter) */
function table(g,o,E){const W='#6e4a2c',{x0,x1,top:T,foot:FL}=TABLE;
  sh(g,(x0+x1)/2+(E?2:-2),FL+.2,12,1,.5);
  for(const[x,d]of[[x0+1.4,-1],[x1-2.4,1]])poly(g,[x,T+2,x+1,T+2,x+1+d*.3,FL-2,x+1+d*.9,FL,x+d*.6,FL,x+d*.1,FL-2],(d<0)===E?'#8a5e38':'#4a3020');
  R(g,x0,T-1,x1-x0,1.2,'#9a7048');R(g,x0,T-1,x1-x0,.5,'#c89a68');R(g,x0,T+.2,x1-x0,1.8,W);R(g,x0,T+1.6,x1-x0,.5,'#3a2414');
  if(o.letter){/* the sheet, unrolled flat, its ends curling up a little */
    R(g,x0+4,T-1.8,12,1.2,'#eee2c0');R(g,x0+4,T-1.8,12,.5,'#fff6e0');R(g,x0+3.4,T-2.2,.8,1.2,'#d8c8a0');R(g,x0+15.8,T-2.2,.8,1.2,'#d8c8a0');
    for(const yy of[T-1.3])R(g,x0+5.4,yy,8,.4,'rgba(70,50,40,.35)')}}
/* the scribe's desk, at the back of the court left of the dais, behind the walk strip: a low writing table of plain wood on two legs at
   its ends (no leg under its middle, no rail), a wax tablet of two leaves open on it and a reed pen laid beside it, slanting; and the
   scribe's stool to its left, a thick board on two legs at its ends, its top 9 above the feet as for the clerks of Chapter Nineteen.
   The ink, if any, is a small square pot, never round. Lit from the sun's side, the shadows on the other. */
function desk(g,E){const r=rng(1975),D=DESK,st=D.stool,W='#7a5434',dx=E?2:-2,lit=d=>(d<0)===E?'#9a6c42':'#4e3420';
  /* the stool */
  sh(g,(st.x0+st.x1)/2+dx,st.foot+.2,8,1,.5);
  for(const[x,d]of[[st.x0+.4,-1],[st.x1-2,1]])SHARED.materials.board(g,x,st.top+1,1.6,st.foot-st.top-1,lit(d),r,1);
  SHARED.materials.board(g,st.x0-.4,st.top-.2,st.x1-st.x0+.8,1.6,'#8a6440',r);R(g,st.x0-.4,st.top-.2,st.x1-st.x0+.8,.5,'#c09468');
  /* the table */
  sh(g,(D.x0+D.x1)/2+dx,D.foot+.2,10,1,.5);
  for(const[x,d]of[[D.x0+1,-1],[D.x1-2.2,1]])poly(g,[x,D.top+2,x+1.2,D.top+2,x+1.2+d*.2,D.foot-1.6,x+1.2+d*.7,D.foot,x+d*.5,D.foot,x+d*.1,D.foot-1.6],lit(d));
  R(g,D.x0,D.top-1,D.x1-D.x0,1.2,'#a87c50');R(g,D.x0,D.top-1,D.x1-D.x0,.5,'#d0a474');R(g,D.x0,D.top+.2,D.x1-D.x0,1.8,W);R(g,D.x0,D.top+1.6,D.x1-D.x0,.5,'#3a2414');
  inRect(g,D.x0,D.top+.2,D.x1-D.x0,1.8,()=>tex(g,'wood',.3,D.x0,D.top+.2,D.x1-D.x0,1.8,'overlay',.5));
  /* the tablet, open: two leaves of wood side by side, each with its dark wax, a narrow gap between them (not a line across them) */
  const tx=D.x0+3,ty=D.top-2.2;for(const k of[0,1]){const x=tx+k*4.4;R(g,x,ty,4,1.4,'#b08a5a');R(g,x+.5,ty+.3,3,.8,'#4a3a2a');R(g,x,ty,4,.4,'#d8b884')}
  /* the pen, slanting, beside it; the ink pot a small square */
  stroke(g,[D.x0+12.2,D.top-1.4,D.x0+13.8,D.top-2.4],'#c8b088',.5);
  R(g,D.x1-3,D.top-2.4,1.6,1.6,'#3a3036');R(g,D.x1-3,D.top-2.4,1.6,.5,'#8a7a80')}
/* the light of the hour: in the evening warm from the left over the court and the near faces, the portico's depth cooler, the shade of
   the pier falling to the right and toward us; in the morning a cooler light from the right, the pier's shade falling to the left,
   toward the sea */
function lightUp(g,E){
  if(E){comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(255,206,150,1)','rgba(250,214,180,.7)','rgba(190,180,220,.8)']);g.fillRect(0,80,320,64)});
    comp(g,'multiply',.25,()=>poly(g,[197,96,214,96,236,104,204,104],'#7a6a8a'));
    pool(g,60,118,140,20,'#ffe0b0',.12,'screen')}
  else{comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,0,320,0,['rgba(186,190,226,.8)','rgba(246,236,218,.7)','rgba(255,236,200,1)']);g.fillRect(0,80,320,64)});
    comp(g,'multiply',.25,()=>poly(g,[186,96,169,96,147,104,179,104],'#6a6a8e'));
    pool(g,236,120,130,20,'#fff2d8',.12,'screen')}
  ao(g,0,96,320,6,'t',.25,'#3a2c3c');ao(g,0,126,320,18,'b',.12,'#2a2050')}

return{court,O,light,birds,HZ,WALK,WALLY,COPING,PIER,COLS,DAIS,SEAT,TABLE,DESK,AT}})();
