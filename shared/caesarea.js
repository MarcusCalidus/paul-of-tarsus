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
                     guard (a step behind the accused on his left, near enough for the chain, and clear of the
                     desk), officer, accusers (a list, nearest the governor first; they face the seat too, and stand round the accused
                     when the level spreads them so), advisers (two, standing on the upper step at the right of the seat, where the
                     small table stands: paint the court with table:false when they are there). Nobody stands in front of the desk
                     (x 150..190) while the scribe sits at it. */
SHARED.caesarea=(()=>{
"use strict";
const HZ=60,PIER=[186,197],COLS=[224,256,288,318],WALK=[30,300,114,138],WALLY=96,COPING=80.4,
  DAIS={lower:[196,308,104,112],upper:[204,300,98,104]},
  SEAT={x0:229,x1:248,top:91,foot:100,at:[238,100,-1]},
  TABLE={x0:264,x1:284,top:89,foot:100},
  DESK={x0:170,x1:185,top:97,foot:110,stool:{x0:156,x1:168,top:101,foot:110},at:[162,110,1]},
  AT={governor:[238,100,-1],scribe:[162,110,1],accused:[210,128,1],guard:[194,121,1],officer:[300,130,-1],
    accusers:[[140,122,1],[116,128,1],[94,120,1],[70,126,1]],advisers:[[270,101,-1],[292,101,-1]]};
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

/* ---------- Paul's room in the palace, and the harbor from its window ----------
   Chapter Twenty keeps Paul for two years in a room of the palace with one window over the harbor (invented: Acts says only that he
   was kept in custody with some freedom, 24:23, 27); Chapter Twenty-One may come back to it. Painted to the standard of Chapters
   Fifteen to Nineteen, with the sky and the sea of shared/coast.js, so that the room's window and the close view of it stand in one
   light, season by season. Loaded with the rest of this file; it touches coast, materials, temple and weather only inside its
   functions (list 'weather' in the chapter's needs for the rain).

   The window faces west over the sea: the afternoon sun stands beyond it, high at the left out of the picture, so that light comes into
   the room from the back left and the figures' shadows fall to the right and toward us. Four seasons, each with its own light:
     su  summer: a high sun, a clear sky with a little haze, a light breeze; the sailing season
     au  autumn: the sun low and warm at the left, a road of light on the water at the left edge, a fresher wind
     wi  winter: an overcast sky, grey sea, a strong west wind and a heavy swell, rain; soft light without a cast shadow
     sp  spring: a clear, fresh light, a light breeze

   API (SHARED.caesarea):
     cell(g, o)          paints Paul's room for a 320 by 144 room. o: {k (the season), win:{x0, x1, top, sill} (the opening in the back
                         wall), hz (the horizon seen through it), wallY (the foot of the back wall), door:{x0, x1, top, b}, bed:{x0, x1,
                         top (the mattress), foot}, jar:{x0, x1, top, foot}}. Plain limewashed walls of the palace's pale stone under a
                         ceiling of beams, a floor of stone flags; the window deep in the wall, its left side and its lintel showing,
                         a ledge of stone along its foot; only sky and sea in it (whatever is nearer lies below its sill); a bed of
                         wood with legs at its two ends only; a water jar with a square mouth; a door of upright planks without any
                         band across them. The light of the season through the window: a patch on the floor in the sun, soft shade
                         elsewhere; the bed and the jar throw their shadows the way the figures do (cellLight).
     cellLight(k)        ART[id].light for the room in season k: the sun of the window, or in winter the soft light alone
     cellMotion(o)       {draw(g, t)} for the room's draw, with the same o: the glints and small waves on the sea in the window, and
                         the rain beyond it in winter
     harbor(g, o)        paints the close view of the window: the harbor Sebastos seen from above, for a 320 by 144 close view. o: {k,
                         hz (the horizon, 50), quay (the edge of the near quay, 100), sill (the back edge of the sill, 112), ships}.
                         The stone frame of the deep window: the lintel's underside, the two sides (the left in shade, the right in
                         the sun), the sill broad and deep, lit, the left side's shadow lying across its end; no bars. Through it the
                         sky, a low coast far off at the right on the horizon, the open sea; the breakwater, a long arm of stone
                         running out from the left with its walkway and a low wall on its seaward side, and a square tower at its end
                         (not in its middle) by the harbor's mouth; at the right the end of the shorter mole; the basin, the near
                         quay with its mooring stones. Every upright ends well below the horizon. ships: [[x, waterline, length, dir,
                         sail], ...]: at anchor in the basin (sail 0: the mast with the yard lowered against it, the sail furled on
                         the yard, its top always below the foot of the breakwater behind it) or under sail at sea (sail 1). No
                         temple, no statue (Caesarea is not one of CONTRIBUTING section 3's four cities).
     harborMotion(o)     {draw(g, t)} for the close view's draw: the sea's glints, small waves and whitecaps on open water; in winter
                         the rain beyond the window and the spray of the swell breaking on the breakwater
     SEASONS             the season's options (hour, sun, cloud, wind) */
Object.assign(SHARED.caesarea,(()=>{
"use strict";
const SEASONS={
  su:{hour:'midday',az:-50,el:62,cloud:.1,streak:.45,force:1,amb:'#f2e6d6',sun:[14,9,.3],tone:null},
  au:{hour:'evening',az:-28,el:26,cloud:.28,streak:.55,force:2,amb:'#f4dcc0',sun:[24,12,.34],tone:['#ffcc90',.22]},
  wi:{hour:'midday',cloud:.97,streak:.2,force:3,amb:'#d6d4d8',sun:null,tone:['#8a90a8',.3]},
  sp:{hour:'morning',az:-58,el:50,cloud:.2,streak:.4,force:1,amb:'#eeeae0',sun:[17,10,.3],tone:null}};
const sea_=k=>SEASONS[k]||SEASONS.su,C='#e4d6b8',VX=160;
/* one coast options object for each season and horizon, kept, so that the light worked out on it is kept too */
const OS=new Map();
function viewO(k,hz,y1,seed){const key=[k,hz,y1,seed].join();if(OS.has(key))return OS.get(key);const S=sea_(k),
    W=SHARED.weather?SHARED.weather.wind({from:'w',force:S.force,view:'nw'}):null,
    O={w:320,hz,hour:S.hour,sun:S.az==null?null:[S.az,hz-S.el],light:-1,cloud:S.cloud,streak:S.streak,wind:W,seed,y1};
  OS.set(key,O);return O}
const sh=(...a)=>SHARED.materials.shadow(...a);
/* the season's tone laid over what the coast's light does not paint (the walls, the frame) */
function tone(g,k,x,y,w,h){const t=sea_(k).tone;if(t)comp(g,k==='wi'?'multiply':'soft-light',t[1],()=>{g.fillStyle=t[0];g.fillRect(x,y,w,h)})}

/* ---- the room ---- */
function cellLight(k){const S=sea_(k);
  /* winter: an overcast sky, so the light through the window is soft and the figures keep their contact shadow alone */
  return S.sun?{amb:S.amb,sun:S.sun.slice(),wallY:100}:{amb:S.amb,wallY:100}}
function opening(o){const W=o.win,f=.06,hz=o.hz;return{x0:W.x0,x1:W.x1,top:W.top,sill:W.sill,ox0:W.x0+(VX-W.x0)*f,otop:W.top+(hz-W.top)*f,osill:W.sill+(hz-W.sill)*f}}
function cell(g,o){const k=o.k||'su',S=sea_(k),A=opening(o),hz=o.hz,WY=o.wallY||100,r=rng(2001),M=SHARED.materials,K=SHARED.coast,
    O=viewO(k,hz,A.osill+1,2004);
  /* the view: the sky and the far sea, worked out for every pixel; the room is painted round it */
  K.light(O);K.sky(g,O);K.sea(g,O);
  if(k==='wi')comp(g,'saturation',.5,()=>{g.fillStyle='#808080';g.fillRect(0,0,320,A.osill+1)});
  g.save();g.beginPath();g.rect(-4,-4,328,152);g.rect(A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop);g.clip('evenodd');
  plaster(g,0,0,320,WY,C,r,{patch:0,cracks:0,t:.3,top:.03,bot:-.04});
  SHARED.temple.age(g,0,8,320,WY-8,rng(2006),.35);
  /* damp and wear low on the wall, a little soot high up */
  g.fillStyle=lg(g,0,WY-14,0,WY,['rgba(120,100,80,0)','rgba(120,100,80,.16)']);g.fillRect(0,WY-14,320,14);
  for(const[x,y,n]of[[146,13,3],[226,12,4],[18,14,2]])M.crack(g,x,y,n,r,.45);
  M.ceiling(g,320,{U:8,x0:14,step:34,vx:VX,vy:hz,r,boards:'#3a2a1e',joist:'#6e5232',plate:'#7e5e3a'});
  door(g,o.door,r);
  pave(g,-2,WY,322,144,'#d8c8a6',r,{vx:VX,vy:hz,rows:5,step:34,v:.06,t:.3,rand:1});
  ao(g,0,WY,320,5,'t',.3,'#3a2c30');R(g,0,WY-.4,320,.8,'rgba(60,44,50,.35)');
  shadeRoom(g,o,A,k);
  g.restore();
  windowRoom(g,A,k);
  lightRoom(g,o,A,k);
  bed(g,o.bed,k,r);
  jar(g,o.jar,k)}
/* the room's own light: indoors, darker than the day outside; lighter on the window's side, darker toward the far right, the ceiling and
   the corners. In winter grey and dim. */
function shadeRoom(g,o,A,k){const S=sea_(k),wi=!S.sun;
  shade(g,[0,0,320,0,320,144,0,144],wi?'#9a9aa8':k==='au'?'#bca08e':'#b4a4a4',wi?.62:.5);
  comp(g,'multiply',wi?.4:.35,()=>{g.fillStyle=lg(g,0,0,320,0,wi?['#e8e8f0','#c8c8d4','#a0a0b4']:['#fff4e4','#e4d0c8','#b4a0b0']);g.fillRect(0,0,320,144)});
  comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,0,0,WY_(o),['#8a7a98','#e8dcd8','#ffffff']);g.fillRect(0,0,320,WY_(o))});
  tone(g,k,0,0,320,144)}
const WY_=o=>o.wallY||100;
/* the window from inside: the left side of the opening, lit only by the sky; the lintel's underside; the ledge along its foot, its
   top in the light of the window */
function windowRoom(g,A,k){const{x0,x1,top,sill,ox0,otop,osill}=A,wi=k==='wi';
  const RV=[x0,top,ox0,otop,ox0,osill,x0,sill];poly(g,RV);g.fillStyle=lg(g,x0,0,ox0,0,wi?['#a8a4a4','#bcb8b6']:['#c4b498','#d8c8aa']);g.fill();
  clipTo(g,()=>poly(g,RV),()=>{tex(g,'mott',.4,x0,top,ox0-x0+1,sill-top,'overlay',1);g.fillStyle=lg(g,0,top,0,sill,['rgba(60,50,70,.3)','rgba(60,50,70,0)','rgba(255,240,210,.12)']);g.fillRect(x0,top,ox0-x0+1,sill-top)});
  stroke(g,[x0+.25,top,x0+.25,sill],wi?'rgba(230,230,236,.3)':'rgba(255,246,226,.45)',.5);
  const SO=[x0,top,x1,top,x1,otop,ox0,otop];poly(g,SO,wi?'#8e8a8c':'#a8967e');clipTo(g,()=>poly(g,SO),()=>tex(g,'mott',.4,x0,top,x1-x0,otop-top+1,'overlay',1));
  R(g,ox0,otop-.4,x1-ox0,.5,'rgba(40,30,40,.3)');
  const lx0=x0-3,lx1=x1+3,ft=sill+2.2,fb=sill+5,TOP=[ox0,osill,x1,osill,x1,sill,lx1,sill,lx1,ft,lx0,ft,lx0,sill,x0,sill];
  ao(g,lx0,fb,lx1-lx0,4,'t',.35,'#2a1c24');
  poly(g,TOP);g.fillStyle=lg(g,0,osill,0,ft,wi?['#c2beb8','#b2aea8']:k==='au'?['#ffe0b0','#f4cf9c']:['#f8ecd0','#ecdcbc']);g.fill();
  clipTo(g,()=>poly(g,TOP),()=>tex(g,'mott',.35,lx0,osill,lx1-lx0,ft-osill+1,'overlay',1));
  R(g,lx0,ft,lx1-lx0,fb-ft,wi?'#8e8a8a':'#a8987e');R(g,lx0,ft,lx1-lx0,.5,wi?'#d8d6d2':'#fff0d4');tex(g,'mott',.3,lx0,ft,lx1-lx0,fb-ft,'overlay',1);
  R(g,lx0,fb-.5,lx1-lx0,.5,'rgba(50,36,44,.45)');R(g,lx1-.5,sill,.5,fb-sill,'rgba(50,36,44,.35)')}
/* the door: a frame of dressed stone, a leaf of upright planks without any band across them, a small square pull; set back in the
   thickness of the wall, its right side showing in shade */
function door(g,D,r){const M=SHARED.materials,w=D.x1-D.x0,h=D.b-D.top,n=4,pw=w/n;
  SHARED.temple.stone(g,D.x0-4,D.top-5,w+8,5,rng(2007),{bh:5,bw:w+8,c:tint(C,.02),v:.05,age:.3});R(g,D.x0-4,D.top-5,w+8,.5,'rgba(255,246,226,.5)');R(g,D.x0-4,D.top-.5,w+8,.6,'rgba(50,36,40,.45)');
  for(const x of[D.x0-4,D.x1+1]){R(g,x,D.top,3,h,tint(C,-.02));tex(g,'mott',.35,x,D.top,3,h,'overlay',1);R(g,x,D.top,.5,h,'rgba(255,246,226,.4)');R(g,x+2.5,D.top,.5,h,'rgba(60,44,50,.3)')}
  for(let i=0;i<n;i++){M.plank(g,D.x0+i*pw,D.top,pw,h,['#6e5034','#664a30','#6c4e32','#62462c'][i],r,1);if(i)R(g,D.x0+i*pw,D.top,.5,h,'rgba(30,18,12,.5)');R(g,D.x0+i*pw+.5,D.top,.5,h,'rgba(200,160,110,.18)')}
  R(g,D.x1-2,D.top,2,h,'rgba(30,20,20,.4)');ao(g,D.x0,D.top,w,6,'t',.45,'#1a1012');
  R(g,D.x0+pw*2.6,D.top+h*.5,1.6,1.6,'#2a1e16');R(g,D.x0+pw*2.6,D.top+h*.5,1.6,.5,'#8a6a48');
  R(g,D.x0-1,D.b-1,w+2,1.4,tint(C,-.08));R(g,D.x0-1,D.b-1,w+2,.5,'rgba(255,246,226,.4)')}
/* the bed along the back wall: a frame of wood on four legs, two at each end and none under its middle, nothing rising above it at
   either end; a thick straw mattress and a blanket of brown wool with a dark stripe, folded at its foot */
function bed(g,B,k,r){const S=sea_(k),wi=!S.sun,M=SHARED.materials,mb=B.top+5.2,rl=mb,rb=rl+3,W=wi?'#5a4636':'#6a4a2e',lit=wi?'#7a6450':'#9a6e44',len=B.x1-B.x0;
  const[ux,uy]=S.sun?[S.sun[0]/46,S.sun[1]/46]:[.1,.05],hh=B.foot-B.top;
  /* its shadow: under it, and thrown to the right and toward us, soft */
  comp(g,'multiply',wi?.2:.3,()=>poly(g,[B.x0+1,B.foot-1,B.x1,B.foot-1,B.x1+hh*ux,B.foot-1+hh*uy*.6,B.x0+1+hh*ux,B.foot-1+hh*uy*.6],'#5a4a66'));
  sh(g,(B.x0+B.x1)/2+2,B.foot-.8,len/2,1.6,.5);
  /* the far legs, up and to the right of the near ones; the near legs: only at the two ends */
  for(const x of[B.x0+2.6,B.x1-1.2])R(g,x,rb,1.6,B.foot-2.6-rb,tint(W,-.35));
  for(const[x,d]of[[B.x0+.2,-1],[B.x1-2.4,1]]){R(g,x,rb,2.2,B.foot-rb,d<0?lit:tint(W,-.15));R(g,x,rb,.5,B.foot-rb,d<0?'rgba(255,220,170,.35)':'rgba(255,220,170,.12)');R(g,x,B.foot-.6,2.2,.6,'#24160c');sh(g,x+1.1,B.foot,2,.6,.5)}
  M.board(g,B.x0,rl,len,rb-rl,W,r);R(g,B.x0,rl,len,.5,lit);R(g,B.x0,rl,.5,rb-rl,lit)
  /* the mattress: straw in a linen tick, thick, soft and a little uneven, its rounded ends; lit from the window at the left */
  const mt=x=>B.top+.4*Math.sin((x-B.x0)/9)+.3*Math.sin((x-B.x0)/3.7),a=B.x0+.8,b=B.x1-.6,P=[a,mb,a-.2,B.top+1.4,a+.8,B.top+.2];
  for(let x=a+2;x<=b-2;x+=1)P.push(x,mt(x));P.push(b-.6,B.top+.4,b+.2,B.top+1.6,b,mb);
  poly(g,P);g.fillStyle=lg(g,0,B.top,0,mb,wi?['#c8c0b0','#a89e8a','#8a8070']:['#eadcb8','#cdb88e','#a89064']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.4,a,B.top-1,len,7,'overlay',1);
    for(let i=0;i<20;i++)R(g,a+r()*(b-a),B.top+1+r()*3.4,1+r()*2,.5,r()<.5?'rgba(140,110,60,.3)':'rgba(255,246,214,.28)');
    g.fillStyle=lg(g,a,0,b,0,['rgba(255,240,210,.25)','rgba(255,240,210,0)','rgba(60,40,50,.18)']);g.fillRect(a,B.top-1,b-a,7);
    R(g,a,mb-1.2,b-a,1.2,'rgba(70,50,40,.25)')});
  /* the blanket, folded at the foot of the bed: a soft thick fold with rounded edges, a dark stripe woven along it, darker underneath */
  const b0=B.x1-26,b1=B.x1-1,c0=wi?'#6e5a4c':'#8e6446',t0=B.top-2.4,BP=[b0,mb-.2,b0-.6,B.top+1.4,b0+.2,t0+1,b0+1.6,t0];
  for(let x=b0+3;x<=b1-2;x+=1.5)BP.push(x,t0+.25*Math.sin(x/2.1)+.15*Math.sin(x/.9));BP.push(b1-.6,t0+.3,b1+.4,t0+1.4,b1+.6,mb-.2);
  poly(g,BP);g.fillStyle=lg(g,0,t0,0,mb,[tint(c0,.18),c0,tint(c0,-.22)]);g.fill();
  clipTo(g,()=>poly(g,BP),()=>{tex(g,'mott',.4,b0-1,t0-1,b1-b0+2,8,'overlay',1);
    R(g,b0-1,t0+2.2,b1-b0+2,.9,wi?'#3e322e':'#4a2e22');R(g,b0-1,t0+3.1,b1-b0+2,.5,rgba(tint(c0,.3),.4));
    g.fillStyle=lg(g,b0,0,b1,0,['rgba(255,226,190,.22)','rgba(255,226,190,0)','rgba(30,20,30,.2)']);g.fillRect(b0-1,t0-1,b1-b0+2,8);
    R(g,b0-1,mb-1,b1-b0+2,1,'rgba(30,18,14,.3)')});
  R(g,b0+1.4,t0,b1-b0-2.4,.5,rgba(tint(c0,.45),.6))}
/* the water jar: plain red clay, its body swelling below a short neck, its mouth a small square seen a little from above; standing on
   the floor in front of the wall, lit from the window at the left */
function jar(g,J,k){const S=sea_(k),wi=!S.sun,cx=(J.x0+J.x1)/2,hw=(J.x1-J.x0)/2,h=J.foot-J.top,[ux,uy]=S.sun?[S.sun[0]/46,S.sun[1]/46]:[.1,.05];
  comp(g,'multiply',wi?.18:.28,()=>poly(g,[cx-2.6,J.foot,cx+2.6,J.foot,cx+2.6+h*ux,J.foot+h*uy*.6,cx-2.6+h*ux,J.foot+h*uy*.6],'#5a4a66'));
  sh(g,cx+.6,J.foot,hw*.9,.9,.55);
  const wf=t=>t<.12?1.6:t<.22?1.6+(t-.12)/.1*1.4:t<.6?3+Math.sin((t-.22)/.38*Math.PI*.5)*(hw-3):t<.94?hw-(t-.6)/.34*(hw-2.4):2.4,L=[],Rr=[];
  for(let i=0;i<=30;i++){const t=i/30,w=wf(t),y=J.top+1.2+t*(h-1.2);L.push(cx-w,y);Rr.unshift(cx+w,y)}
  const B=L.concat(Rr);poly(g,B);g.fillStyle=lg(g,cx-hw,0,cx+hw,0,wi?['#a8785c','#946446','#764a32','#4e2e1e']:['#c48c5c','#a86c42','#80492c','#542e1a']);g.fill();
  clipTo(g,()=>poly(g,B),()=>{tex(g,'mott',.35,cx-hw,J.top,hw*2,h,'overlay',1);
    R(g,cx-hw*.55,J.top+h*.35,.6,h*.4,wi?'rgba(230,220,210,.3)':'rgba(255,226,190,.45)');ao(g,cx-hw,J.foot-3,hw*2,3,'b',.35,'#2a1610');
    R(g,cx-hw,J.top+h*.3,hw*2,.5,'rgba(70,36,20,.25)')});
  /* the mouth: a small square rim, its inside dark */
  R(g,cx-2,J.top,4,1.6,wi?'#a87a5a':'#c08a5a');R(g,cx-2,J.top,4,.5,wi?'#d0b0a0':'#e8b88a');R(g,cx-1.4,J.top+.5,2.8,.7,'#2a1610')}
/* the light of the season through the window: a patch on the floor in the sun, slanting to the right and toward us (long in autumn,
   short in summer), soft at its edges, a faint shaft in the air over it, and the light thrown back from the floor onto the foot of the
   wall. In winter only a little paler grey on the floor below the window, without an edge. */
function lightRoom(g,o,A,k){const S=sea_(k),WY=o.wallY||100;
  if(!S.sun){pool(g,(A.x0+A.x1)/2+10,108,56,8,'#dce2ee',.12,'screen');comp(g,'screen',.05,()=>{poly(g,[A.x0,A.sill,A.x1,A.sill,A.x1+20,120,A.x0+6,120]);g.fillStyle='#dce2ee';g.fill()});return}
  const[dx,dy]=S.sun,ux=dx/46,uy=dy/46,P=(x,h)=>[x+h*ux,WY+h*uy],hs=WY-A.sill,ht=WY-A.top,
    Q=[...P(A.x0,hs),...P(A.x1,hs),...P(A.x1,ht),...P(A.x0,ht)],warm=k==='au'?'rgba(255,190,120,1)':'rgba(255,238,204,1)';
  comp(g,'screen',k==='au'?.07:.06,()=>{poly(g,[A.x0,A.top,A.x1,A.top,Q[4],Q[5],Q[6],Q[7]]);g.fillStyle=lg(g,0,A.top,0,Q[5],[warm,'rgba(255,236,200,.2)']);g.fill()});
  for(const[d,a]of[[3,.18],[1.6,.22],[0,.3]])comp(g,'soft-light',a*2,()=>poly(g,[Q[0]-d,Q[1]-d*.4,Q[2]+d,Q[3]-d*.4,Q[4]+d,Q[5]+d*.6,Q[6]-d,Q[7]+d*.6],warm));
  comp(g,'screen',k==='au'?.3:.26,()=>poly(g,Q,warm));
  comp(g,'soft-light',.35,()=>{g.fillStyle=lg(g,0,WY,0,WY-26,[warm,'rgba(255,220,170,0)']);g.fillRect(A.x0-10,WY-26,Q[4]-A.x0+40,26)});
  pool(g,(Q[0]+Q[4])/2,(Q[1]+Q[5])/2,60,12,k==='au'?'#ffc890':'#fff0d8',.08,'screen')}
function cellMotion(o){const k=o.k||'su',A=opening(o),O=viewO(k,o.hz,A.osill+1,2004),S=SHARED.coast.seaMotion(O);
  S.open=(x,y)=>x>A.ox0+.5&&x<A.x1-.5&&y>o.hz+.4&&y<A.osill-.4;
  return{draw(g,t){S.draw(g,t);
    if(k==='wi'&&SHARED.weather)inRect(g,A.ox0,A.otop,A.x1-A.ox0,A.osill-A.otop,()=>SHARED.weather.rain(g,t,320,{y1:A.osill+2,density:.34,len:2.6,col:'rgba(214,222,232,.42)'}))}}}

/* ---- the harbor from the window ---- */
/* the breakwater: its walkway's near edge T(x) and its foot in the water B(x), running out from the left behind the window's side to
   its end at x 231, where the tower stands; nearer (lower) at the left */
const BW={x0:-6,x1:233,T:x=>67.4-.022*x,B:x=>67.4-.022*x+8.6-.0155*(x+6),P:x=>4-.009*(x+6)},MOLE={x0:264,T:x=>64.6+(x-264)*.03,F:3.6};
const TOWER={x0:223,x1:239,side:4,top:54.4};
function harbor(g,o){const k=o.k||'su',S=sea_(k),hz=o.hz||50,Q=o.quay||100,SL=o.sill||112,K=SHARED.coast,O=viewO(k,hz,Q+1,2011),L=K.light(O);
  K.sky(g,O);
  K.isle(g,262,330,3,O,{kind:'cape',from:'r',dist:.88,seed:2012});
  K.sea(g,O);
  /* the open sea beyond the breakwater runs higher in winter: a darker band and broken foam along its seaward side */
  breakwater(g,O,L,k);
  for(const b of o.ships||[]){boatWater(g,b);K.land(g,L,clamp((Q-b[1])/(Q-hz)*.5,0,.6),q=>boat(q,L,b,hz))}
  K.quay(g,O,{view:'top',y:Q,y1:SL+2,x0:-2,x1:322,ch:2.6,c:'#cdbd9a',cope:'#dccdac',vx:VX,rows:3,step:30,seed:2013});
  /* winter: the colour goes out of everything under the overcast, and the quay is dark with the rain */
  if(k==='wi'){comp(g,'saturation',.5,()=>{g.fillStyle='#808080';g.fillRect(0,0,320,SL)});comp(g,'multiply',.25,()=>{g.fillStyle='#7a8494';g.fillRect(0,hz,320,SL-hz)});
    comp(g,'multiply',.3,()=>{g.fillStyle='#6a7080';g.fillRect(0,Q+2,320,SL-Q)})}
  frame(g,o,k)}
function breakwater(g,O,L,k){const K=SHARED.coast,{x0,x1,T,B}=BW,wi=k==='wi';
  /* its inner face, toward the basin, in the shade of the afternoon sun, with its courses, the wet band and weed at the water */
  K.quay(g,O,{view:'face',x0,x1,y:T(x0),slope:-.022,face:B(x0)-T(x0),slope2:-.0155,c:'#d6c6a2',dist:.22,seed:2014});
  /* the walkway on top, lit, and a low wall along its seaward side, its inner face in shade and its top lit; the sea beyond */
  K.land(g,L,.22,q=>{const P=BW.P,w=x=>T(x)-P(x)*.62,p=x=>T(x)-P(x),Wk=[x0,T(x0),x1,T(x1),x1,w(x1),x0,w(x0)],Wl=[x0,w(x0),x1,w(x1),x1,p(x1),x0,p(x0)];
    poly(q,Wk);q.fillStyle=lg(q,0,w(x0),0,T(x0),['#e4d4b2','#f6e8cc']);q.fill();clipTo(q,()=>poly(q,Wk),()=>{tex(q,'mott',.45,x0,p(x1)-2,x1-x0,14,'overlay',1);
      const r=rng(2021);for(let i=0;i<60;i++){const x=x0+r()*(x1-x0);R(q,x,w(x)+.4+r()*(T(x)-w(x)-.8),1+r()*3,.5,r()<.5?'rgba(120,100,80,.2)':'rgba(255,250,236,.3)')}});
    poly(q,Wl);q.fillStyle=lg(q,0,p(x0),0,w(x0),['#c6b698','#ac9c80']);q.fill();clipTo(q,()=>poly(q,Wl),()=>tex(q,'mott',.4,x0,p(x1)-2,x1-x0,10,'overlay',1));
    stroke(q,[x0,p(x0),x1,p(x1)],'#fff2d8',.5);stroke(q,[x0,w(x0),x1,w(x1)],'rgba(60,50,60,.4)',.5);
    /* the sea washing the low wall's outer foot: a lace of foam, broken, heavier in winter */
    const r=rng(2015);for(let x=x0;x<x1;x+=.5)if(r()<(wi?.7:.3))R(q,x,p(x)-.5-r()*(wi?1.2:.5),.5,.5,rgba('#f4f6f4',wi?.55:.35))});
  tower(g,O,L,k);
  /* the end of the shorter mole at the right, across the harbor's mouth from the tower */
  K.quay(g,O,{view:'face',x0:MOLE.x0,x1:330,y:MOLE.T(MOLE.x0),slope:.03,face:MOLE.F,c:'#d2c29e',dist:.3,seed:2016});
  K.land(g,L,.3,q=>{const t=MOLE.T(MOLE.x0),P=[MOLE.x0,t,330,MOLE.T(330),330,MOLE.T(330)-2,MOLE.x0+1.4,t-1.6];poly(q,P,'#efe0c2');
    poly(q,[MOLE.x0-1.4,t-1,MOLE.x0,t,MOLE.x0,t+MOLE.F,MOLE.x0-1.4,t+MOLE.F-.6],'#f4e6c8');R(q,MOLE.x0-1.4,t+MOLE.F-1.2,1.4,.8,'rgba(40,56,48,.5)')})}
/* the tower at the breakwater's end, by the harbor's mouth: a square tower of the same pale stone, its left face in the sun, its front
   in shade, a plain cornice and a low parapet; two small square windows; it stands on the end of the arm, and its top stays well
   below the horizon */
function tower(g,O,L,k){const{x0,x1,side,top}=TOWER,fx=x0+side,ft=BW.B(x1)+.4,K=SHARED.coast;
  K.land(g,L,.24,q=>{
    /* its shadow on the water, to the right */
    comp(q,'multiply',.35,()=>poly(q,[x1,ft-1.4,x1+12,ft-.4,x1+13,ft+.8,x1,ft+.5],'#4a5070'));
    /* the left face, in the sun */
    const LF=[x0,top+1,fx,top,fx,ft,x0,ft-.8];poly(q,LF);q.fillStyle=lg(q,0,top,0,ft,['#fff0d0','#f0dcb4']);q.fill();
    clipTo(q,()=>poly(q,LF),()=>{tex(q,'mott',.4,x0,top,side,ft-top,'overlay',1);for(const y of[top+4.4,top+8.6])stroke(q,[x0,y+.5,fx,y],'rgba(150,120,100,.35)',.4)});
    /* the front, in shade, in courses whose joints stop inside them */
    q.fillStyle=lg(q,fx,0,x1,0,['#c4b498','#a89a80']);q.fillRect(fx,top,x1-fx,ft-top);
    inRect(q,fx,top,x1-fx,ft-top,()=>{tex(q,'mott',.4,fx,top,x1-fx,ft-top,'overlay',1);
      const r=rng(2017);let j=0;for(let y=top+4.4;y<ft-1;y+=4.2,j++){R(q,fx,y,x1-fx,.4,'rgba(80,64,64,.32)');R(q,fx,y+.4,x1-fx,.4,'rgba(255,240,220,.15)');
        for(let x=fx+1.6+((j*3.7+r()*2)%4);x<x1-1.4;x+=5.2+r()*1.4)R(q,x,y+.8,.4,3,'rgba(80,64,64,.26)')}
      R(q,fx,top,.6,ft-top,'rgba(255,240,220,.3)')});
    /* the cornice and the low parapet on top, both as wide as the tower */
    R(q,x0-.6,top-.8,x1-x0+1.2,1.4,'#eedebe');R(q,x0-.6,top-.8,x1-x0+1.2,.5,'#fff6e0');R(q,x0-.6,top+.6,x1-x0+1.2,.4,'rgba(60,50,60,.4)');
    R(q,x0,top-2,x1-x0,1.2,'#c8b898');R(q,x0,top-2,x1-x0,.5,'#fbeed4');R(q,x0,top-2,side,1.2,'#f4e4c4');
    /* one small square window high on its front, dark */
    R(q,fx+6.6,top+1.6,1.4,1.4,'#3a3036');
    /* wet at its foot, the foam round it */
    q.fillStyle=lg(q,0,ft-2.4,0,ft,['rgba(40,56,48,0)','rgba(40,56,48,.6)']);q.fillRect(x0,ft-2.4,x1-x0,2.4);
    for(let x=x0;x<x1+1;x+=.5)R(q,x,ft-.2+Math.sin(x*1.7)*.2,.5,.5,'rgba(244,246,244,.5)')})}
/* a ship of the harbor, small and seen from the side, its bow at dir: the hull in curved strakes that follow the sheer, rising to a
   curved stern post; at anchor (sail 0) the mast stands with the yard lowered slanting from its top to the stern, the sail furled on it,
   so that mast and yard meet at a corner; under sail (sail 1) the square sail stands above the hull. The top of every mast is set from
   the horizon and kept below the foot of the breakwater behind it */
function boat(g,L,[x,y,n,d,sail],hz){const h=Math.max(.8,n*.14),X=u=>x+u*d*n/2,shr=u=>y-h-(u<0?h*1.3:h*.55)*Math.pow(Math.abs(u),3),
    lit=toHex(...L.key),dark='#2c2018';
  let top=y-.36*(y-hz);if(!sail&&x>BW.x0&&x<BW.x1+2)top=Math.max(top,BW.B(x)+1.6);
  if(sail){/* under sail, far off: a small hull and the sail, pale in the sun on its left */
    poly(g,[X(-1),shr(-1),X(1),shr(1),X(.85),y,X(-.85),y],'#3a2c22');R(g,Math.min(X(-1),X(1)),shr(0)-.3,n,.4,rgba(lit,.6));
    const sw=n*.42,sb=shr(0)-.4,cx=x+d*n*.04;poly(g,[cx-sw/2,top,cx+sw/2,top,cx+sw/2+d*.3,sb,cx-sw/2+d*.3,sb]);g.fillStyle=lg(g,cx-sw/2,0,cx+sw/2,0,['#fff6e4','#d8ccb6']);g.fill();
    return}
  /* the mast and the lowered yard, behind the hull's rail: they meet at the mast's top, and the yard's foot rests by the stern */
  const mx=X(.14),ye=X(-.66),ys=shr(-.66)-h*.6;
  stroke(g,[mx,shr(.14),mx,top],'#3e2c1e',.6);stroke(g,[mx-d*.3,shr(.14),mx-d*.3,top+.8],rgba(lit,.45),.4);
  stroke(g,[mx-d*.1,top+.6,ye,ys],'#c8bca2',.9);stroke(g,[mx,top+.1,ye,ys-.5],'#4a3422',.5);
  /* a low deckhouse at the stern */
  if(n>12){const c0=X(-.62),c1=X(-.34),cy=shr(-.48)-h*.75;R(g,Math.min(c0,c1),cy,Math.abs(c1-c0),h*.9,'#6a4c32');R(g,Math.min(c0,c1),cy,Math.abs(c1-c0),.5,rgba(lit,.7));R(g,Math.min(c0,c1)+Math.abs(c1-c0)*.4,cy+.8,1,1,'#2a1c12')}
  /* the hull */
  const P=[];for(let u=-1;u<=1.001;u+=.1)P.push(X(u),shr(u));P.push(X(.97),y-h*.4,X(.9),y,X(-.9),y,X(-.97),y-h*.5);
  poly(g,P);g.fillStyle=lg(g,0,shr(-1),0,y,['#7a5a3c','#4e3624','#33241a']);g.fill();
  clipTo(g,()=>poly(g,P),()=>{
    /* the strakes: seams that follow the sheer and flatten toward the waterline */
    if(n>9)for(const f of[.42,.64,.84]){const p=[];for(let u=-1;u<=1.001;u+=.1){const s=shr(u);p.push(X(u),s+(y-s)*f)}stroke(g,p,'rgba(20,12,8,.4)',.4)}
    /* the wale, a darker band under the rail, and the light from the left along the hull */
    {const p=[];for(let u=-1;u<=1.001;u+=.1){const s=shr(u);p.push(X(u),s+(y-s)*.26)}stroke(g,p,'rgba(30,18,10,.55)',.6)}
    g.fillStyle=lg(g,x-n/2,0,x+n/2,0,['rgba(255,220,170,.2)','rgba(255,220,170,0)']);g.fillRect(x-n/2-1,shr(-1)-2,n+2,y-shr(-1)+2)});
  {const p=[];for(let u=-1;u<=1.001;u+=.1)p.push(X(u),shr(u));stroke(g,p,rgba(lit,.85),.5)}
  /* the stern post, curving up and over toward the deck */
  const sx=X(-1),sy=shr(-1);stroke(g,[sx,sy+.4,sx-d*.5,sy-h*.5,sx-d*.2,sy-h*1.1,sx+d*.6,sy-h*1.2],dark,.6);stroke(g,[sx-d*.3,sy-h*.4,sx,sy-h*1.05],rgba(lit,.6),.4)}
/* the reflection and shadow of a ship on the water, under it */
function boatWater(g,[x,y,n,d,sail]){const h=Math.max(.8,n*.14);
  const nr=Math.max(2,Math.round(h*2.6));for(let i=0;i<nr;i++){const yy=y+.2+i*.5,w=n*(.86-i*.05)*(i%2?.92:1);if(w<1)break;
    comp(g,'multiply',.5*(1-i/nr*.7),()=>R(g,x-w/2+(i%3)*.3,yy,w,.5,'#3a3e58'))}
  if(!sail)R(g,x-n*.4,y-.1,n*.8,.5,'rgba(240,244,240,.3)');else for(let i=0;i<3;i++)R(g,x-d*(n*.6+i*1.4),y-.1,1.2,.5,'rgba(244,246,244,.5)')}
/* the frame of the deep window: the lintel's underside and the two sides seen from inside it, the broad sill */
function frame(g,o,k){const SL=o.sill||112,S=sea_(k),wi=!S.sun,r=rng(2018),
    LS=[0,0,320,0,296,10,24,10],LV=[0,0,24,10,24,SL,0,126],RV=[320,0,296,10,296,SL,320,126],TP=[24,SL,296,SL,320,126,0,126];
  /* the lintel's underside, in shade, lit a little from the sill below */
  poly(g,LS);g.fillStyle=lg(g,0,0,0,10,[tint(C,-.42),tint(C,-.3)]);g.fill();clipTo(g,()=>poly(g,LS),()=>{tex(g,'mott',.22,0,0,320,10,'overlay',1);tex(g,'grain',.2,0,0,320,10,'overlay',.5);SHARED.temple.age(g,0,0,320,10,rng(2019),.05)});
  R(g,24,9.4,272,.6,'rgba(255,240,216,.35)');
  /* the left side, away from the sun, in shade; the right side in the sun (in winter both in the same grey light) */
  poly(g,LV);g.fillStyle=lg(g,0,0,24,0,[tint(C,-.3),tint(C,-.22)]);g.fill();
  poly(g,RV);g.fillStyle=lg(g,296,0,320,0,wi?[tint(C,-.2),tint(C,-.26)]:[tint(C,.08),tint(C,-.02)]);g.fill();
  for(const[P,x0]of[[LV,0],[RV,296]])clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.22,x0,0,24,126,'overlay',1);tex(g,'grain',.2,x0,0,24,126,'overlay',.5);SHARED.temple.age(g,x0,0,24,126,rng(2020+x0),.05);g.fillStyle=lg(g,0,0,0,126,['rgba(40,30,40,.12)','rgba(40,30,40,0)','rgba(255,240,220,.1)']);g.fillRect(x0,0,24,126);
    /* the courses of the side, running back to the opening's edge */
    for(const y of[30,58,86]){stroke(g,x0?[296,y,320,y+(y-50)*.18]:[0,y+(y-50)*.18,24,y],'rgba(70,56,56,.3)',.5)}
    ao(g,x0,0,24,8,'t',.35,'#2a1e28')});
  stroke(g,[24.25,10,24.25,SL],'rgba(255,246,226,.45)',.5);stroke(g,[295.75,10,295.75,SL],'rgba(70,56,60,.4)',.5);
  /* the sill: its top broad and deep, veined and weathered, lit; one joint between two long stones, running toward the opening */
  poly(g,TP);g.fillStyle=lg(g,0,SL,0,126,wi?['#c4beb4','#d2ccc0']:['#ecdcbc','#f8ecd2']);g.fill();
  clipTo(g,()=>poly(g,TP),()=>{tex(g,'mott',.4,0,SL,320,14,'overlay',1);tex(g,'blotch',.3,0,SL,320,14,'soft-light',1.3);tex(g,'grain',.16,0,SL,320,14,'overlay',.5);
    /* weathered: small pits and specks only, so that nothing runs into the marks Paul scratches at its left */
    for(let i=0;i<320*14/9;i++)R(g,r()*320,SL+r()*14,.5,.5,r()<.55?'rgba(96,76,58,.2)':'rgba(255,248,230,.22)');
    for(let i=0;i<7;i++){let vx=100+r()*200,vy=SL+2+r()*10;const p=[vx,vy];for(let s=0;s<6;s++){vx+=1.4+r()*3;vy+=(r()-.5)*1.2;p.push(vx,vy)}stroke(g,p,'rgba(140,130,140,.22)',.5)}
    stroke(g,[212,SL+.4,223,125.6],'rgba(90,70,64,.45)',.5);stroke(g,[212.6,SL+.4,223.6,125.6],'rgba(255,246,226,.35)',.5);
    ao(g,0,SL,320,2.4,'t',.3,'#3a2c34');
    /* the shadow of the left side across the sill's end, slanting to the right and toward us */
    if(S.sun){const s=S.sun[0]/S.sun[1];for(const[d,a]of[[1.8,.08],[.8,.08],[0,.1]])comp(g,'multiply',a,()=>poly(g,[24,SL,24+(126-SL)*s+d,126,-2,126],k==='au'?'#a06a70':'#7a7090'))}});
  /* the crease where the left side meets the sill */
  stroke(g,[0,126,24,SL],'rgba(60,46,54,.35)',.5);
  /* the front of the sill, toward the room, in shade, its upper edge rounded and lit */
  g.fillStyle=lg(g,0,126,0,144,[tint(C,-.16),tint(C,-.32)]);g.fillRect(0,126,320,18);tex(g,'mott',.22,0,126,320,18,'overlay',1);tex(g,'grain',.2,0,126,320,18,'overlay',.5);
  R(g,0,126,320,.6,wi?'#e4e0d8':'#fff4dc');R(g,0,126.6,320,.8,'rgba(255,240,214,.3)');ao(g,0,126,320,3,'t',.12,'#2a1e28');
  for(const x of[94,170,262])stroke(g,[x,127.4,x+.3,144],'rgba(80,64,64,.3)',.5);
  tone(g,k,0,0,320,10);tone(g,k,0,0,24,144);tone(g,k,296,0,24,144);tone(g,k,0,SL,320,32)}
function harborMotion(o){const k=o.k||'su',hz=o.hz||50,Q=o.quay||100,O=viewO(k,hz,Q+1,2011),S=SHARED.coast.seaMotion(O),wi=k==='wi',
    ships=(o.ships||[]).map(([x,y,n])=>[x-n/2-2,y-n*.8,n+4,n*.8+2]);
  S.open=(x,y)=>{if(y<=hz+.4||y>=Q-.6)return false;if(x>BW.x0&&x<BW.x1+1&&y>BW.T(x)-BW.P(x)-1.2&&y<BW.B(x)+1)return false;
    if(x>TOWER.x0-4&&x<TOWER.x1+1&&y>TOWER.top-3&&y<BW.B(TOWER.x1)+1.4)return false;if(x>MOLE.x0-2&&y>MOLE.T(x)-2&&y<MOLE.T(x)+MOLE.F+1)return false;
    for(const[a,b,c,d]of ships)if(x>a&&x<a+c&&y>b&&y<b+d)return false;return true};
  /* the swell breaking on the seaward side of the breakwater: bursts of spray that rise a little over its low wall and fall away */
  const SP=[[34,0],[92,700],[150,1500],[196,400],[226,1100]];
  return{draw(g,t){S.draw(g,t);if(!wi)return;
    for(const[x,ph]of SP){const T=2300,u=((t+ph)%T)/T;if(u>.55)continue;const e=u/.55,top=BW.T(x)-3.6,rr=rng(x*31+Math.floor((t+ph)/T)),a=(1-e)*.7;
      for(let i=0;i<26;i++){const dx=(rr()-.5)*(6+e*8),dy=rr()*(2+e*5)*(1-Math.abs(dx)/12);R(g,hp(x+dx+e*3),hp(top-dy),.5,.5,`rgba(240,244,246,${(a*(.4+rr()*.6)).toFixed(2)})`)}}
    inRect(g,24,10,272,Q+12-10,()=>SHARED.weather&&SHARED.weather.rain(g,t,320,{y1:Q+12,density:.5,len:3.4,col:'rgba(214,222,232,.4)'}))}}}

return{SEASONS,cell,cellLight,cellMotion,harbor,harborMotion}})());
