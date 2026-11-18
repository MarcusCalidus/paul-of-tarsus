/* Paul of Tarsus: level data for Chapter Seven, "Timothy of Lystra".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   The opening of the second missionary journey (Acts 15:36-16:5), after the meeting in Jerusalem (Acts 15:1-35), which is told as the
   chapter opens: with Silas through Syria and Cilicia, over the Taurus by the Cilician Gates, to Derbe, Lystra and Iconium. The travel
   map (shared/map.js) leads from place to place, through its northern window. Acts names no city in Cilicia and describes no road: the
   congregation in Tarsus and the road through the Gates are likely, not stated, and the chapter's end screen says so. */
LEVEL(7,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A road tune on five notes, in E flat: the kind of tune a shepherd's pipe plays. A lyre steps in even fours over a bass, a frame drum
   keeps a walking pace, and a reed pipe carries the tune (mood "hope": the roads and the street). Indoors and in the courtyards (mood
   "calm") a harp takes the lyre's place and a ney the pipe's. While a congregation is of two minds (mood "tense") only a drone, a slow
   drum and a few notes of the oud remain; and when the wind comes down the gorge (mood "storm") the drum rolls like thunder far off. */
const _=null,
 TUNE=[[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,3,4],[4,2,2],[6,1,2],[8,2,8]],[[0,4,2],[2,5,2],[4,6,4],[8,5,2],[10,4,2],[12,3,4]],[[0,2,4],[4,1,4],[8,0,8]],
  [[0,5,4],[4,6,2],[6,7,2],[8,6,4],[12,5,4]],[[0,4,4],[4,3,2],[6,4,2],[8,2,8]],[[0,1,2],[2,2,2],[4,3,2],[6,4,2],[8,3,4],[12,1,4]],[[0,0,4],[4,-1,2],[6,0,10]]],
 MUSIC={dt:.17,root:51,scale:[0,2,4,7,9],bars:16,tracks:[
  {inst:'lyre',moods:['hope'],prog:'AABAACBA',len:3,seq:{A:[0,_,2,_,3,_,2,_,0,_,2,_,3,_,5,_],B:[1,_,3,_,4,_,3,_,1,_,3,_,4,_,6,_],C:[-1,_,1,_,3,_,1,_,-2,_,0,_,2,_,0,_]}},
  {inst:'harp',moods:['calm'],group:[3,3,4,4,2],prog:'AABAACBA',len:3,oct:12,seq:{A:[0,_,_,2,_,_,3,_,_,_,2,_,_,_,0,_],B:[1,_,_,3,_,_,4,_,_,_,3,_,_,_,1,_],C:[-1,_,_,1,_,_,3,_,_,_,1,_,_,_,-2,_]}},
  {inst:'bass',moods:['hope','calm'],prog:'AABAACBA',len:6,seq:{A:[-5,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_],B:[-4,_,_,_,_,_,_,_,-1,_,_,_,_,_,_,_],C:[-6,_,_,_,_,_,_,_,-7,_,_,_,_,_,-4,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d...t.k.d.d.t...',B:'d...t.k.d.k.t.tk'}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.45},
  {drum:1,moods:['tense'],seq:{A:'d.......d.......'},vol:.7},
  {drone:[0,7],every:32,moods:['tense','storm']},
  {inst:'oud',moods:['tense'],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,_,_,2,_,_,_,1,_,_,_],B:[0,_,_,_,_,_,_,_,-1,_,_,_,0,_,_,_]},vol:.6},
  {drum:1,moods:['storm'],group:[3,3,2],prog:'AB',seq:{A:'d..d..k.d.......',B:'d..d..k.d..kd.k.'},vol:.9},
  {inst:'oud',moods:['storm'],group:[3,3,2,2,2,4],prog:'AB',len:4,seq:{A:[0,_,_,_,_,_,2,_,_,_,_,_,1,_,_,_],B:[0,_,_,_,-1,_,_,_,_,_,1,_,_,_,_,_]},vol:.7},
  {inst:'aulos',moods:['hope'],loop:8,oct:12,lines:TUNE},
  {inst:'ney',moods:['calm'],from:8,oct:12,lines:TUNE}]};

/* ============ ART ============ */
const SH='#8f95c8';
/* What is seen through a city gate: sky, hills and the road running on. */
function gateView(g,x,y,w,h,st){g.save();arch(g,x,y,w,h);g.clip();sky(g,480,y+h-18,st||['#5a98d8','#a8cdea','#dfeaf0']);
  ridge(g,x,x+w,y+h-12,q=>9+3*Math.sin(q/5+1),['#a9b4c8','#c2cad4']);ridge(g,x,x+w,y+h-12,q=>3+2*Math.sin(q/3),['#98a86c','#a8b47c']);
  R(g,x,y+h-12,w,12,'#c4c08a');poly(g,[x+w*.45,y+h-12,x+w*.6,y+h-12,x+w*.95,y+h,x+w*.15,y+h],'#ead9ae');
  ao(g,x,y,w,10,'t',.55,'#2a2440');ao(g,x,y,5,h,'l',.5,'#2a2440');ao(g,x+w-4,y,4,h,'r',.35,'#2a2440');g.restore()}
/* snowy: a far range under f(x), blue with distance, with snow lying on everything above the line s */
function snowy(g,x0,x1,base,f,st,s){ridge(g,x0,x1,base,f,st);for(let x=x0;x<x1;x+=.5){const h=f(x);if(h>s)R(g,x,base-h,.5,Math.min(h-s,2.2+1.6*Math.sin(x*.9)+(h-s)*.3),'#f4f4f8')}}
/* crag: a face of bare limestone inside the outline p: bedded, cracked, lit from the upper left */
function crag(g,p,c,r,o){o=o||{};let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<p.length;i+=2){x0=Math.min(x0,p[i]);x1=Math.max(x1,p[i]);y0=Math.min(y0,p[i+1]);y1=Math.max(y1,p[i+1])}
  clipTo(g,()=>poly(g,p),()=>{g.fillStyle=lg(g,0,y0,0,y1,[tint(c,.16),c,tint(c,-.22)]);g.fillRect(x0,y0,x1-x0,y1-y0);tex(g,'mott',.7,x0,y0,x1-x0,y1-y0,'overlay',1);tex(g,'vert',.3,x0,y0,x1-x0,y1-y0,'overlay',.5);
    for(let j=y0+3+r()*4;j<y1;j+=4+r()*7){const q=[x0,j+(r()-.5)*3],sl=o.dip||0;for(let x=x0+8;x<=x1+8;x+=8+r()*10)q.push(x,j+(x-x0)*sl+(r()-.5)*2.4);stroke(g,q,rgba('#2a2438',.26),.6);stroke(g,q.map((v,i)=>i%2?v+.7:v),rgba('#fff6e0',.16),.5)}
    for(let k=0;k<(x1-x0)*(y1-y0)/420;k++){let qx=x0+r()*(x1-x0),qy=y0+r()*(y1-y0)*.8;const q=[qx,qy];for(let s=0;s<3+r()*4;s++){qx+=(r()-.5)*4;qy+=2+r()*5;q.push(qx,qy)}stroke(g,q,rgba('#1e1a2c',.34),.5)}
    if(o.shade)ao(g,x0,y0,x1-x0,y1-y0,o.shade,.3,'#2a2848')})}
/* rock: a stone sitting on the ground at x,y */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.5,x-w/2,y-h,w,h,'overlay',1)})}
/* pine: a mountain pine in three tiers of needles, darker below */
function pine(g,x,y,h,c){c=c||'#3c5a44';R(g,x-.6,y-h*.3,1.4,h*.3,'#4a3626');for(let i=0;i<3;i++){const yy=y-h*(.24+i*.24),w=h*(.3-i*.07);
    poly(g,[x-w,yy,x,yy-h*.34,x+w,yy],tint(c,-.12+i*.1));poly(g,[x-w,yy,x,yy-h*.34,x-w*.1,yy],tint(c,.1+i*.1))}}
/* poplar: a tall narrow tree, such as line every water channel of the plateau; bare: in winter, a broom of twigs */
function poplar(g,x,y,h,c,r,bare){R(g,x-.6,y-h*.24,1.3,h*.24,'#5a4630');if(!bare)return foliage(g,x,y-h*.6,h*.11+1.6,h*.42,c||'#5f8a4a',r,h*2.4);
  stroke(g,[x,y-h*.24,x+.4,y-h*.96],'#6a5a48',1);for(let i=0;i<h*.9;i++){const k=.26+r()*.66,yy=y-h*k,w=(h*.1+1.4)*Math.sin((k-.2)*3.6)*(.4+r()*.6),s=r()<.5?-1:1;stroke(g,[x,yy,x+s*w,yy-2-r()*5],r()<.5?'#7a6a54':'#9a8a6c',.5)}}
/* earth: trodden ground between y0 and y1, with small stones in it */
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.55,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.4);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.5+k*1.3;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.24));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.3,s*.3,'rgba(40,36,70,.22)')}}
/* stoneGround: bare ground of rock and gravel between y0 and y1 */
function stoneGround(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.1),c,tint(c,.08)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.6,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.16,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.5);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.6+k*1.6;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.25));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.4,s*.3,'rgba(40,36,70,.25)')}}
/* An ox, in the pixel manner of the engine's pack donkey and seen from the side: Zenon's team, as it stood at Derbe in Chapter Six.
   Every part grows out of the one before it: the tail is set on at the top of the rump and lies along it before it hangs free, the crest of
   the shoulders sits on the back, and the neck is painted in the same bands of tone as the body it comes out of, so that no seam shows. */
const OX_HEAD=["......www.............","....wwW.ww............","...wwW................","...wWhhhhhhh..........",".eehhHHHHHhhh.........","eEehHHHHHHHhhh........",".eehHHHkHHHHHhhh......",
  "..dhHHHHHHHHHHhhhh....","..dhhHHHHHHHHHHhhhmm..","..dhhhHHHHHHHHHhhmmmm.","...dhhhhHHHHHHhhmmmMmm","...ddhhhhhhhhhhhmmMMmm","....ddhhhhhhhhhhmmmnmm",".....dddhhhhhhhhmmmmm.",".......ddddhhhhdmmmm..","...........dddd.mmm..."];
function ox(g,x,y,dir,fr,c){g.save();g.translate(x,y);g.scale(dir*FIG.K,FIG.K);
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
  g.restore()}
const cattle=(g,x,y,dir,fr,c,lit)=>figure(g,x,y,lit,'ox7'+dir+fr+c,s=>ox(s,0,0,dir,fr,c),17);
/* wagon: a four-wheeled wagon with solid wheels, its bed at x, standing on the ground at y. cov: 1 a cover on its hoops, -1 an open wagon. load: sacks or bales on its bed. */
function wagon(g,x,y,cov,load){oval(g,x+30,y+.6,36,2.2,'rgba(30,26,50,.35)');
  for(const wx of[x+13,x+47])oval(g,wx+2.4,y-6,5.4,5.6,'#33261a');
  wood(g,x,y-13.6,60,4.6,'#7a5a34');R(g,x,y-9,60,1,'#3a2a1a');R(g,x+60,y-12,13,1.6,'#6a4a2a');R(g,x+60,y-12,13,.5,'#a07a48');
  if(load)for(const[sx,sw,sh,sc]of[[x+10,6.4,10,'#b8a880'],[x+23,7,12,'#c4b48c'],[x+37,6.6,11,'#a89870'],[x+50,6,9.6,'#b4a47c']])sack(g,sx,y-13.6,sw,sh,sc);
  if(cov>0){g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath();g.fillStyle=lg(g,0,y-34,0,y-13,['#51443a','#2e2620','#1a1410']);g.fill();
    clipTo(g,()=>{g.beginPath();g.moveTo(x+1,y-13.6);g.bezierCurveTo(x+1,y-39,x+59,y-39,x+59,y-13.6);g.closePath()},()=>{for(let i=0;i<5;i++){const hx=x+6+i*12;g.fillStyle='rgba(255,236,200,.1)';g.fillRect(hx,y-34,1,21)}
      tex(g,'mott',.4,x,y-36,60,24,'overlay',1);ao(g,x,y-22,60,9,'b',.4)});
    for(const cx of[x+1.6,x+55.2]){R(g,cx,y-17,3.2,3,'#a8703c');R(g,cx,y-17,3.2,.6,'#d09a5e');R(g,cx+1.1,y-15.9,1,1,'#2a1a10')}}
  for(const wx of[x+13,x+47]){oval(g,wx,y-6,6.2,6.2,'#4a341e');oval(g,wx,y-6,5,5,'#8a6638');oval(g,wx-.8,y-6.8,3.6,3.6,'#9a7646');stroke(g,[wx-4.2,y-8.4,wx+4.2,y-8.4],'#5a4026',.5);stroke(g,[wx-4.2,y-3.6,wx+4.2,y-3.6],'#5a4026',.5);oval(g,wx,y-6,1.5,1.5,'#33261a')}}
/* bale: a bale of goat-hair cloth, rolled tight, lying on the ground at x,y */
function bale(g,x,y,w,h,c){oval(g,x+w/2+1,y+.4,w/2+2,1.3,'rgba(30,26,50,.35)');g.fillStyle=lg(g,0,y-h,0,y,[tint(c,.28),c,tint(c,-.5)]);g.fillRect(x,y-h,w,h);
  for(let i=1.5;i<w;i+=2.4)R(g,x+i,y-h,.5,h,'rgba(0,0,0,.2)');oval(g,x,y-h/2,h*.3,h/2,tint(c,.14));oval(g,x+w,y-h/2,h*.3,h/2,tint(c,-.36));R(g,x,y-h,w,.5,tint(c,.4))}
/* ---------- Antioch: the courtyard where the congregation meets (opening scenes) ---------- */
ART.antioch7={w:320,
 paint(g){const r=rng(703),W='#e6d6ac';
  sky(g,320,58,['#3e7cc8','#76a8dc','#c2d6e4']);cloud(g,150,10,54,6,r);cloud(g,250,20,40,5,r);
  /* Mount Silpius over the roofs of the city */
  ridge(g,0,320,50,x=>20+9*Math.sin(x/64+.6)+3*Math.sin(x/19),['#8a9a86','#aab498']);
  for(const[hx,hy,hw,hh,c]of[[108,30,26,22,'#d8ccac'],[138,34,22,18,'#e6dabc'],[192,28,30,24,'#dcd0b0'],[228,34,24,18,'#cfc2a0']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-3,hy,3,hh,'rgba(60,50,90,.3)');R(g,hx+4,hy+6,3,4,'#3a2c22')}
  for(const[x,h]of[[170,16],[262,13]])cypress(g,x,50,h);
  /* the house, with tiled eaves, and its door */
  house(g,0,46,102,58,W,r,{side:0,patch:2,cracks:4,beams:0});
  for(let i=0;i<104;i+=5.5){R(g,i,36,5,8.5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.8,'#e08a60');R(g,i+4.5,36,.6,8.5,'#7a3620')}R(g,0,44.5,104,1.6,'#6a3a22');
  R(g,31,53,38,51,'#d8c8a0');doorArt(g,34,56,32,48,'#8a6a40',r);windowArt(g,80,58,10,10,W,{bars:2,wood:'#6a4e2c'});
  /* the wall of the courtyard, and the gate to the street */
  house(g,102,48,178,56,tint(W,-.04),r,{side:0,patch:3,cracks:5,beams:0});
  R(g,280,40,40,64,'#d6c69e');for(let i=280;i<320;i+=5.5){R(g,i,36,5,5,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.6,'#e08a60')}poly(g,[280,36,275,39,275,104,280,104],'#a8a0b0');
  arch(g,284,52,32,52,'#c2b28c');g.save();arch(g,286,54,28,50);g.clip();sky(g,320,80,['#74aade','#cfe2ee']);R(g,286,84,28,20,'#dcd5c3');
  for(const[hx,hy,hw,hh,c]of[[286,66,10,38,'#d6caa8'],[304,62,10,42,'#e2d6b4']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.2,'#b8603c')}poly(g,[292,104,310,104,304,84,298,84],'#e0d6ba');
  ao(g,286,54,28,9,'t',.5,'#2a2440');ao(g,286,54,5,50,'l',.45,'#2a2440');g.restore();
  /* the vine arbor */
  wood(g,126,43,3,63,'#6a4e2c',1);wood(g,226,43,3,63,'#6a4e2c',1);wood(g,126,40,103,3,'#7a5c36');for(let i=0;i<9;i++)wood(g,131+i*11.6,36.6,2.2,3.6,'#5a4226');
  stroke(g,[128.5,104,130,84,128.6,66,131,50,138,42],'#5a4630',1.2);stroke(g,[130,70,133,60,142,48],'#5a4630',.8);
  foliage(g,146,39,24,6.5,'#5f8a4a',r,100);foliage(g,196,38,30,7,'#6a9652',r,130);foliage(g,172,43,18,4,'#527c40',r,60);foliage(g,132,56,4,9,'#5f8a4a',r,20);
  /* a bench along the wall, and a great jar of water */
  R(g,150,98,62,8,'rgba(40,30,60,.38)');wood(g,148,96,3,10,'#5a4226',1);wood(g,211,96,3,10,'#5a4226',1);wood(g,148,92,66,4,'#96703e');R(g,148,95.6,66,1,'#5a4226');
  vessel(g,254,106,7,20,'#a05a34','pithos');
  /* paving */
  pave(g,0,104,320,144,'#d6c49a',r,{vx:160,vy:66,rows:5,step:34,v:.08});ao(g,0,104,320,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(255,240,200,0)','rgba(255,240,200,.9)']);g.fillRect(0,105,320,39)});
  shade(g,[0,105,100,105,112,111,0,113],SH,.55);shade(g,[118,105,238,105,250,121,126,121],SH,.4);
  comp(g,'screen',.35,()=>{for(let i=0;i<50;i++)oval(g,126+r()*116,106.5+r()*13,1.5+r()*3,.5+r()*.8,'#fff0c8')});
  pool(g,80,0,260,150,'#fff0c0',.14,'screen');ao(g,0,120,320,24,'b',.12,'#2a2050')},
 draw(){},front(){}};
/* ---------- Jerusalem: the room where the apostles and the elders gathered (opening scene) ---------- */
ART.council={w:320,
 paint(g){const r=rng(709),ST='#d8ccae';
  ashlar(g,0,0,320,104,ST,r,{bw:17,bh:8.5,v:.07,t:.35});
  for(let i=8;i<320;i+=38)wood(g,i,0,7,7,'#5a4226',1);wood(g,0,7,320,2.4,'#6a4e2c');ao(g,0,9.4,320,12,'t',.4,'#2a2030');
  /* three round-headed windows, high in the wall: the roofs of the city, and the sky over them */
  for(const x of[60,150,240]){arch(g,x-2,22,24,36,tint(ST,-.25));g.save();arch(g,x,24,20,34);g.clip();sky(g,320,58,['#6aa2dc','#d8e8f0']);R(g,x,48,20,10,'#d8d0bc');R(g,x+11,43,9,5,'#e2dac4');R(g,x,46.6,20,1.4,'#b8a888');
    ao(g,x,24,20,7,'t',.4,'#2a2440');ao(g,x,24,4,34,'l',.35,'#2a2440');g.restore();R(g,x-3,58,26,1.8,tint(ST,.2));R(g,x-3,59.8,26,.6,tint(ST,-.4))}
  /* a lamp in a niche on either side of the middle window */
  for(const x of[108,200]){arch(g,x,42,13,18,tint(ST,-.3));arch(g,x+1,43,11,17,'#3a2c22');R(g,x-1,59.6,15,1.6,tint(ST,.15));R(g,x+3.6,57,6,2.4,'#b8733c');R(g,x+3.6,57,6,.6,'#e0a064')}
  /* benches along the wall */
  for(const[x,w]of[[12,112],[196,112]]){R(g,x+2,97,w,8,'rgba(40,30,60,.3)');wood(g,x,90,w,4,'#8a6a40');R(g,x,93.6,w,.8,'#5a4226');wood(g,x,94,3,10,'#5a4226',1);wood(g,x+w-3,94,3,10,'#5a4226',1)}
  /* a table, with what is needed for writing a letter */
  R(g,140,98,44,8,'rgba(40,30,60,.34)');wood(g,138,88,44,4,'#96703e');R(g,138,91.6,44,1,'#5a4226');wood(g,138,92,3,12,'#5a4226',1);wood(g,179,92,3,12,'#5a4226',1);
  R(g,146,86.4,17,1.8,'#efe4c4');R(g,146,86.4,17,.5,'#fff8e0');R(g,144.6,86.2,1.6,2.2,'#d8cca8');for(let i=0;i<4;i++)R(g,149+i*3.4,87,2.4,.4,'#7a6a4a');
  /* an inkpot and a reed pen: square-cut, because a pot this small would rasterize as a plus sign if it were turned on the wheel */
  R(g,169.6,84.8,3,3.2,'#3a3028');R(g,169.6,84.8,3,.6,'#6a5a4c');R(g,170.2,84.2,1.8,.6,'#241c16');stroke(g,[164,87.6,169,83.6],'#c8a468',.6);
  /* the floor: great slabs, and a mat woven in bands */
  pave(g,0,103,320,144,'#cbbd9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  clipTo(g,()=>poly(g,[58,114,262,114,282,139,38,139]),()=>{R(g,38,114,244,25,'#7a4a3e');for(let i=0;i<8;i++)R(g,38,115.6+i*3,244,1,i%2?'#c8a878':'#4a2e2a');tex(g,'mott',.4,38,114,244,25,'overlay',1);ao(g,38,114,244,5,'t',.25)});
  lightmap(g,320,'#b0a498',l=>{for(const x of[70,160,250]){pool(l,x,40,26,26,'#fff4d8',1);l.fillStyle=lg(l,0,58,0,140,['rgba(255,240,200,.5)','rgba(255,240,200,0)']);poly(l,[x-10,58,x+10,58,x+44,140,x-44,140]);l.fill()}
    pool(l,114,54,26,22,'#ffc070',.5);pool(l,206,54,26,22,'#ffc070',.5);pool(l,160,122,170,40,'#fff0d8',.4)})},
 draw(){},front(){}};
/* ---------- Tarsus: the courtyard of Eirene the linen weaver, where the congregation meets ---------- */
const taur7=x=>18+7*Math.sin(x/83+1.4)+4*Math.sin(x/29+.6)+2*Math.sin(x/9);
ART.tarsus7={w:480,fp:1.3,
 paint(g){const r=rng(719),W='#e8dcc0',W2='#dccfae';
  sky(g,480,60,['#3a78c6','#72a6dc','#b8d2e6','#e6e8dc']);cloud(g,170,9,60,7,r);cloud(g,330,18,44,5,r);cloud(g,446,8,34,5,r);
  /* far to the north, over the wall: the Taurus, with the first snow of the year on it */
  snowy(g,96,480,46,taur7,['#8494c0','#a2b0cc','#c4ccd0'],21);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,16,0,46,['rgba(220,226,236,0)','rgba(220,226,236,1)']);g.fillRect(96,16,384,30)});
  for(const[x,h]of[[264,15],[272,11],[300,13]])cypress(g,x,44,h);
  /* the house of Eirene: two floors, a door, and barred windows */
  house(g,0,10,96,94,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,18,26,12,12,W,{bars:3,wood:'#6a4e2c'});windowArt(g,64,26,12,12,W,{bars:3,wood:'#6a4e2c'});
  R(g,33,56,30,48,'#cfc0a0');doorArt(g,36,59,24,45,'#7a5a3a',r);R(g,32,102.6,32,1.6,'#f0e6cc');poly(g,[96,6.5,101,10,101,104,96,104],'#a8a0b4');
  /* the wall of the courtyard */
  house(g,101,42,379,62,W2,r,{side:0,patch:5,cracks:8,beams:0});
  /* linen, bleaching on the wall in the sun */
  for(const[x,w,h]of[[272,20,27],[296,17,22]]){poly(g,[x,38+h,x+w,38+h,x+w+3,38+h+5,x+3,38+h+5],'rgba(50,40,90,.2)');g.fillStyle=lg(g,x,0,x+w,0,['#f0ecdf','#fffdf4','#e2dccb']);g.fillRect(x,37,w,h+1);
    for(let i=2;i<w;i+=3.4)R(g,x+i,38,.5,h-1,'rgba(120,110,90,.18)');R(g,x,38+h-.8,w,.8,'#cfc8b6')}
  /* the weaving shed: a tiled roof on two posts, the loom against the wall, and shelves of finished linen */
  for(let i=118;i<250;i+=5.5){R(g,i,36,5,8,(i|0)%11?'#c0603c':'#a84c2c');R(g,i,36,5,.8,'#e08a60');R(g,i+4.5,36,.6,8,'#7a3620')}R(g,118,44,132.5,1.6,'#6a3a22');wood(g,118,45.6,132.5,1.6,'#7a5632');
  shade(g,[118,47,250,47,250,104,118,104],SH,.42);
  wood(g,118,47.2,3,57,'#6a4e2c',1);wood(g,247.5,47.2,3,57,'#6a4e2c',1);
  /* the loom: two uprights and a beam, the web wound on the beam, and the warp hanging down to its weights. The beam ends at the
     uprights and the uprights at the beam, so that the frame is a doorway and nothing else. */
  wood(g,142,54,2.6,50,'#7a5632',1);wood(g,181.4,54,2.6,50,'#7a5632',1);wood(g,142,54,42,3,'#8a6238');
  g.fillStyle=lg(g,0,57,0,78,['#fffdf4','#f0eada','#dcd4c0']);g.fillRect(146,57,34,21);for(let j=58.5;j<78;j+=2)R(g,146,j,34,.4,'rgba(120,110,90,.2)');
  for(let i=0;i<12;i++){const x=147+i*2.9,n=(i*7)%3;R(g,x,78,.5,17+n,'#e8e0c8');R(g,x-.7,95+n,2,2.6,i%2?'#a89880':'#8a7c68');R(g,x-.7,95+n,2,.5,'#c8b89c')}
  /* the shelves, and the bolts of linen on them */
  R(g,196,62,1.6,42,'#5a4226');R(g,240.4,62,1.6,42,'#5a4226');
  for(const y of[62,76,90]){wood(g,196,y,46,2,'#7a5c36');for(let i=0;i<4;i++){const c=['#f4efe0','#e8dcc0','#c9d6dc','#eadfbe'][(i+y/2)%4|0],bx=199+i*10.4,n=i%2;g.fillStyle=lg(g,0,y-7,0,y,[tint(c,.1),c,tint(c,-.25)]);g.fillRect(bx,y-7+n,8.6,7-n);R(g,bx,y-3.6,8.6,.4,'rgba(90,80,60,.25)')}}
  /* a stone basin, for washing the flax */
  shade(g,[262,107,330,107,340,113,272,113],SH,.5);g.fillStyle=lg(g,264,0,328,0,['#b0a690','#ece4cc','#d2c8b0','#928a78']);g.fillRect(264,92,64,14);R(g,263,90.6,66,2.2,'#f2ead6');R(g,263,92.6,66,.6,'#a8a094');R(g,267,91.2,58,1.4,'#5f9cc0');R(g,264,104.6,64,1.4,'#8a8272');
  /* a fig tree, and under it the benches where the congregation sits */
  stroke(g,[384,104,383,86,387,68,381,54],'#6a5a48',4);stroke(g,[385,104,384.4,86,388.4,68,382.4,54],'#a8987e',1.2);stroke(g,[385,74,374,60,366,54],'#6a5a48',2);stroke(g,[386,66,398,54,404,48],'#6a5a48',2);
  foliage(g,376,40,30,13,'#5a8448',r,220);foliage(g,402,32,20,11,'#679252',r,120);foliage(g,354,50,15,8,'#4f7840',r,70);
  for(const x of[336,394]){R(g,x+2,98,36,8,'rgba(40,30,60,.38)');wood(g,x,92,38,4,'#96703e');R(g,x,95.6,38,1,'#5a4226');wood(g,x,96,3,9,'#5a4226',1);wood(g,x+35,96,3,9,'#5a4226',1)}
  /* the gate to the street */
  ashlar(g,438,30,42,74,'#dccfaa',r,{bw:13,bh:6.4,v:.09});R(g,437,28.6,43,2,'#f4e8c8');poly(g,[438,28.6,433,32,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48);
  /* paving */
  pave(g,0,103,480,144,'#d8ceb0',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(255,244,214,0)','rgba(255,244,214,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[0,104,101,104,112,110,0,112],SH,.5);shade(g,[118,104,250,104,262,112,128,112],SH,.42);shade(g,[334,104,438,104,450,121,346,121],SH,.4);
  comp(g,'screen',.3,()=>{for(let i=0;i<40;i++)oval(g,346+r()*92,106.5+r()*13,1.5+r()*3,.5+r()*.8,'#fff0c8')});
  pool(g,240,0,300,160,'#fff4d0',.14,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050')},
 fore(g){const r=rng(720);/* a jar, a sheaf of flax, and a sack of it */
  vessel(g,40,152,12,28,'#6a3420','jar',{noShadow:1});sack(g,500,152,13,18,'#c8bc98');
  for(let i=0;i<60;i++){const sx=96+r()*36;stroke(g,[sx,152,sx+(r()-.5)*10,132+r()*8],r()<.5?'#d8c88a':'#b8a868',1)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g){/* the congregation of Tarsus, when it has been called together: under the fig tree, and along the wall */
  if(F.read||G.gath)for(const[id,x,y,d]of FLOCK)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- The Cilician Gates: where the gorge widens, below its narrowest place ---------- */
/* TENT: the ground the merchant's tent stands on. LINE: where a man stands to hold its windward line. RIV: the bed of the stream. */
const TENT=[262,326],LINE=[338,117],RIV=[374,99,388,99,424,107,480,118,480,144,452,144,416,120,388,106];
const holding=()=>!!F.line&&SI.room==='gates'&&Math.abs(SI.x-LINE[0])<4;
/* the tent, in each of its three states: down, with a torn flap lifting in the wind; mended and laid out; up */
function tentArt(g,t){const[x0,x1]=TENT,xm=(x0+x1)/2;
  if(!F.mended){const f=Math.sin(t/160)*2.4+Math.sin(t/61);oval(g,xm,112.4,36,2.4,'rgba(20,16,40,.35)');
    poly(g,[x0,112,x0+8,104,x0+26,101,x0+44,105,x1-6,103,x1,112],'#2e2620');poly(g,[x0+8,104,x0+26,101,x0+44,105,x0+30,106.6,x0+14,106],'#473c33');
    poly(g,[x0+38,105,x0+57,96+f,x0+63,104.4],'#3a3029');poly(g,[x0+38,105,x0+57,96+f,x0+52,102],'#51453b');
    for(const fx of[12,24,50])stroke(g,[x0+fx,104,x0+fx+2,111.4],'rgba(0,0,0,.35)',.6);stroke(g,[x0+16,111.6,x0+29,91],'#7a5c36',1.4);stroke(g,[x0+16.6,111.6,x0+29.6,91],'#a8845a',.5)}
  else if(!F.up){oval(g,xm,112.6,36,2.2,'rgba(20,16,40,.35)');poly(g,[x0+2,112,x0+6,105.6,x1-8,105,x1-2,112],'#2e2620');poly(g,[x0+6,105.6,x1-8,105,x1-13,107.4,x0+12,108],'#473c33');
    for(const fx of[14,30,46])stroke(g,[x0+fx,107.6,x0+fx+1,111.6],'rgba(0,0,0,.3)',.6);stroke(g,[x0+2,114,x1-6,113.4],'#7a5c36',1.4);stroke(g,[x0+2,113.6,x1-6,113],'#a8845a',.5);
    if(holding())stroke(g,[x1-5,106,SI.x-7,SI.y-20],'#b8a880',.7)}
  else{const p=[x0-4,112,x0+9,93,x0+23,86,x0+39,89.6,x0+50,84.6,x1-7,92.6,x1+5,112];oval(g,xm,112.6,42,2.6,'rgba(10,8,30,.45)');
    stroke(g,[x0+9,93,x0-13,111.4],'#b8a880',.6);stroke(g,[x1-7,92.6,x1+15,111.4],'#b8a880',.6);R(g,x0-14.4,110,1.4,2.4,'#5a4226');R(g,x1+14.4,110,1.4,2.4,'#5a4226');
    poly(g,p);g.fillStyle=lg(g,0,84,0,112,['#3a3029','#2a221d','#17120f']);g.fill();
    clipTo(g,()=>poly(g,p),()=>{for(let i=0;i<8;i++)R(g,x0+2+i*8.6,84,.6,28,'rgba(255,236,200,.07)');stroke(g,[x0+23,86,x0+21,112],'rgba(0,0,0,.3)',.6);stroke(g,[x0+50,84.6,x0+53,112],'rgba(0,0,0,.3)',.6)});
    poly(g,[x0+27,112,x0+31,98,x0+41,98,x0+45,112],'#c8873a');poly(g,[x0+29,112,x0+32.4,100,x0+39.6,100,x0+43,112],'#f8cf80');pool(g,x0+36,106,13+Math.sin(t/210),9,'#ffb050',.22)}}
ART.gates={w:480,fp:1.25,q:12,
 variant:()=>F.up?'n':'d',
 light:()=>F.up?{amb:'#8890b4',lamps:[[298,106,46,'#6a4a1c']]}:{amb:'#c8c4d8'},
 paint(g,v){const r=rng(733),LS='#a8a29a',GR='#a29c8e',night=v==='n',DK='#1c1830';
  /* the sky: what the walls leave of it, and that full of cloud */
  sky(g,480,72,night?['#1a2036','#2a3250','#454c68']:['#343c5c','#565e7c','#8e8a9a','#c8b69a']);
  for(const[cx,cy,w]of[[362,5,60],[384,20,44],[330,3,50],[430,9,56]])cloud(g,cx,cy,w,7,r,night?'#56607c':'#a6a2b0',night?'#1a1e34':'#363a56');
  /* far up the gap: the next turn of the gorge, blue with distance, and darker toward its foot */
  crag(g,[334,44,346,33,362,27,380,32,402,44,404,100,334,100],mix(LS,night?'#3a4468':'#5c6890',.62),r,{dip:.02});ao(g,334,30,70,70,'b',.42,DK);
  /* the Gates themselves: two walls of limestone, and between them room for a stream and a road */
  const LW=[0,0,340,0,351,16,343,44,355,70,348,100,0,100],RW=[394,0,480,0,480,100,388,100,380,74,390,46,383,20];
  crag(g,LW,LS,r,{dip:.03,shade:'l'});crag(g,RW,tint(LS,.05),r,{dip:-.05,shade:'r'});
  /* the left wall is not one face: a buttress stands out of it, a cleft runs up behind the buttress, and ledges catch what light there is */
  crag(g,[112,0,214,0,228,26,219,58,231,86,104,86,116,56,102,28],tint(LS,.09),r,{dip:.05});
  shade(g,[214,0,250,0,262,36,248,86,231,86,219,58,228,26],SH,.62);shade(g,[0,0,112,0,102,28,116,56,104,86,0,86],SH,.46);shade(g,[250,0,340,0,351,16,343,44,355,70,348,86,248,86,262,36],SH,.24);
  /* fissures and ledges: the fissures short and slanting, and each ledge clear of every fissure, so that no upright line stands across a level one */
  for(const[a,b,c,d]of[[86,2,92,28],[258,8,251,40],[322,58,327,84],[160,48,154,78],[430,4,425,34]])stroke(g,[a,b,(a+c)/2+1.4,(b+d)/2,c,d],rgba(DK,.4),.9);
  for(const[x,y,w]of[[14,42,36],[120,30,30],[178,64,34],[270,50,36],[446,60,28]]){poly(g,[x,y,x+w,y-1.4,x+w-3,y+2.2,x+4,y+3],rgba(DK,.36));stroke(g,[x,y,x+w,y-1.4],'rgba(246,238,220,.4)',.6)}
  stroke(g,[340,0,351,16,343,44,355,70,348,100],'rgba(246,238,220,.4)',.8);stroke(g,[394,0,383,20,390,46,380,74,388,100],rgba(DK,.4),.8);
  /* the road: a ledge cut into the foot of the left wall, the marks of the picks still on the rock above it, and climbing on into the gap */
  clipTo(g,()=>poly(g,[0,84,170,86,280,89,348,92,348,100,0,100]),()=>{R(g,0,82,350,18,tint(LS,-.3));for(let x=3;x<348;x+=2.4+r()*3)stroke(g,[x,85+x*.02,x+1.4,96],rgba(DK,.36),.5);tex(g,'mott',.5,0,82,350,18,'overlay',1)});
  poly(g,[0,95.4,348,96.4,374,100,0,100],'#c9bea6');stroke(g,[0,95.4,348,96.4],'rgba(250,244,226,.5)',.5);
  poly(g,[348,100,374,100,369,78,361,78],'#b8ad98');stroke(g,[348,100,361,78],rgba(DK,.5),.7);stroke(g,[374,100,369,78],'rgba(255,246,224,.3)',.5);
  for(const[x,y,h]of[[62,36,20],[166,24,18],[236,50,15],[296,30,17],[408,46,16],[468,28,16]])pine(g,x,y,h,night?'#2c4638':'#3c5a44');
  /* the floor of the gorge, and the wheel ruts across it */
  stoneGround(g,0,100,480,144,GR,r,280);poly(g,[0,100,374,100,378,104,348,108,0,109],'rgba(214,200,170,.4)');ao(g,0,100,480,6,'t',.35,'#2a2848');
  for(let i=0;i<2;i++)stroke(g,[0,102.6+i*4,140,103+i*4,280,102.6+i*3.4,360,100.6+i*2],'rgba(70,60,80,.34)',.8);
  /* the stream, coming down out of the gap along the foot of the right wall */
  poly(g,RIV);g.fillStyle=lg(g,0,98,0,144,['#dfeef2','#8fb8c4','#5a8ea6','#3f7290']);g.fill();
  clipTo(g,()=>poly(g,RIV),()=>{for(let i=0;i<130;i++){const k=r(),sy=100+k*44,sx=378+k*90+(r()-.5)*40;R(g,sx,sy,2+k*7,.5+k*.4,r()<.6?'rgba(236,248,250,.6)':'rgba(20,56,80,.35)')}});
  stroke(g,[374,99,388,106,416,120,452,144],'rgba(240,250,250,.6)',.8);
  for(const[x,y,w,h]of[[400,112,9,5],[432,128,12,7],[466,122,10,6],[382,103.4,6,3.4]])rock(g,x,y,w,h,'#8e8a80');
  rock(g,224,105,18,8,'#9c968a');rock(g,8,107,16,8,'#a39d90');
  /* the merchant's bales of goat-hair cloth, stacked clear of the wet ground */
  bale(g,346,112,34,7,'#2e2620');bale(g,350,105,30,6.4,'#3a3029');bale(g,348,98.6,24,6,'#2a221d');
  if(night)lightmap(g,480,'#565c84',l=>{pool(l,298,104,64,40,'#ffc070',.95);pool(l,298,112,110,26,'#ffb060',.4);pool(l,366,24,34,34,'#8a94c0',.4)});
  else lightmap(g,480,'#a4a0b6',l=>{pool(l,366,26,60,60,'#f4e6c6',.8);pool(l,280,120,260,50,'#e8dcc8',.3)})},
 fore(g){const r=rng(734);rock(g,30,152,44,22,'#6a665e');rock(g,488,154,50,24,'#5e5a54');for(let i=0;i<24;i++){const sx=80+r()*60;stroke(g,[sx,150,sx+3+r()*6,137-r()*7],r()<.5?'#6a6a48':'#4a5038',.8)}
  comp(g,'source-atop',.5,()=>R(g,0,0,610,150,'#2a2850'))},
 draw(g,t){const lit=lightAt('gates',70,112);
  /* the far ox, the carter's wagon and its pole, the near ox, and the yoke that lies across both their necks: they face the cleft, and the wind.
     The pole ends behind the near ox's tail: if it ran on under the tail, the two would make a T upside down. */
  depth(113,()=>{cattle(g,115,110.6,1,0,'#6f4630',lit);wagon(g,20,112,-1,1);cattle(g,111,113,1,0,'#8a5a3a',lit);
    R(g,124,81,5,2.5,'#5a3e22');R(g,124,81,5,.5,'#a8845a');R(g,128.5,79.5,1.5,1.5,'#5a3e22')});
  tentArt(g,t)},
 /* the weather: before the tent is up, the wind, and what it carries; after it, the rain */
 front(g,t){if(!F.up){for(let i=0;i<14;i++){const k=((t/900+i*.0714)%1),x=500-k*540,y=18+((i*37)%96)+Math.sin(k*9+i)*3;R(g,x,y,5+(i%3)*2,.5,`rgba(226,220,206,${.34*(1-Math.abs(k-.5)*2)})`)}return}
  g.strokeStyle='rgba(206,216,240,.42)';g.lineWidth=.5;g.beginPath();for(let i=0;i<90;i++){const x=((i*61+t*.16)%520)-20,y=((i*37+t*.42)%150)-6;g.moveTo(x,y);g.lineTo(x-2.2,y+7)}g.stroke()}};
/* ---------- Lystra: the house of Lois and Eunice, by day, in winter ---------- */
/* wellJar: a small jar such as is carried to the well. It is drawn with straight edges and a flat rim: turned like the larger vessels, its
   rim would be an ellipse one pixel high, which rasterizes as a plus sign. */
function wellJar(g,x,y,c){R(g,x-3,y-.4,8,1,'rgba(30,20,40,.3)');poly(g,[x-1.6,y-10,x+1.6,y-10,x+1.8,y-8.4,x+3.6,y-5.6,x+3,y-1,x+1.6,y,x-1.6,y,x-3,y-1,x-3.6,y-5.6,x-1.8,y-8.4]);
  g.fillStyle=lg(g,x-3.6,0,x+3.6,0,[tint(c,-.3),tint(c,.26),c,tint(c,-.5)]);g.fill();R(g,x-2,y-10.6,4,1,tint(c,-.5));R(g,x-2,y-10.6,4,.4,tint(c,.2))}
/* the low table of the house at Lystra. It stands out on the mat, so it is a prop as well: whoever walks behind it is hidden by it */
function lowTable(g){wood(g,170,112,40,3,'#96703e');wood(g,170,115,2.6,8,'#5a4226',1);wood(g,207.4,115,2.6,8,'#5a4226',1);vessel(g,190,112,4.6,3.6,'#a8844e','bowl',{noShadow:1})}
ART.lystra7={w:320,q:12,
 props:[{y:123,shape:lowTable}],
 light:()=>({amb:'#f0e8dc',lamps:[[92,96,38,'#4a2410']]}),
 paint(g){const r=rng(461),W='#d8c8a4';
  plaster(g,0,0,320,104,W,r,{patch:4,cracks:6,brick:'#a8875a',t:.5});for(let i=14;i<320;i+=34)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  /* a window on the lane */
  windowArt(g,52,28,16,16,W,{dark:'#c8dcec',bars:2,wood:'#6a4e2c'});
  /* a niche for the lamp, and under it a shelf of household jars */
  arch(g,142,44,16,20,tint(W,-.34));arch(g,143.6,45.6,12.8,18.4,'#4a3828');R(g,146,60.6,8,2.4,'#b8733c');R(g,146,60.6,8,.6,'#e0a064');R(g,152.6,59.6,2.2,1.4,'#b8733c');
  wood(g,172,62,58,2.4,'#7a5c36');R(g,172,64.4,2,6,'#5a4226');R(g,228,64.4,2,6,'#5a4226');
  vessel(g,182,62,4,10,'#a05a34','jug');vessel(g,196,62,5,8,'#8a6a44','jar');vessel(g,210,62,3.6,9,'#b8733c','jug');vessel(g,222,62,4,6,'#7a5a3a','bowl');
  /* the hearth in the corner, built of field stone */
  ashlar(g,78,92,30,12,'#a89c88',r,{bw:7,bh:4,v:.14,t:.4});R(g,78,91,30,1.4,'#cfc4ac');R(g,82,94,22,8,'#1c1412');poly(g,[84,102,88,97,96,96,102,102],'#3a2a22');
  poly(g,[80,91,84,40,102,40,106,91],'rgba(30,20,20,.28)');
  /* a bench along the wall, with a blanket folded on it */
  R(g,6,92,62,12,'rgba(40,30,60,.3)');wood(g,6,86,62,4,'#8a6a40');wood(g,6,90,3,14,'#5a4226',1);wood(g,65,90,3,14,'#5a4226',1);
  g.fillStyle=lg(g,0,81,0,86,['#9a5a4a','#7a4438','#4a2a24']);g.fillRect(14,81.4,24,4.6);for(let i=0;i<24;i+=3)R(g,14+i,81.4,.5,4.6,'rgba(0,0,0,.2)');
  /* the door to the lane */
  R(g,266,48,34,56,'#c4b48e');doorArt(g,269,51,28,53,'#6a4a2c',r,{left:1});
  /* a great jar of water by the door, and the two that go to the well */
  vessel(g,250,106,7,20,'#9a5a36','pithos');wellJar(g,235,107,'#a8683c');wellJar(g,226,108,'#96582e');
  /* the floor: beaten earth, and a woven mat where the household eats */
  earth(g,0,103,320,144,'#b8a482',r,90);ao(g,0,103,320,6,'t',.4,'#3a3050');
  clipTo(g,()=>poly(g,[128,112,214,112,224,130,116,130]),()=>{R(g,116,112,110,18,'#9a6a4a');for(let i=0;i<6;i++)R(g,116,113.4+i*3,110,1.1,i%2?'#d8b878':'#5a3a2c');tex(g,'mott',.4,116,112,110,18,'overlay',1);ao(g,116,112,110,5,'t',.25)});
  /* a low table */
  R(g,168,122,44,3,'rgba(30,20,40,.4)');lowTable(g);
  lightmap(g,320,'#b4aca8',l=>{pool(l,60,36,30,26,'#f4f4ec',1);l.fillStyle=lg(l,0,44,0,140,['rgba(240,240,228,.5)','rgba(240,240,228,0)']);poly(l,[52,44,68,44,150,140,70,140]);l.fill();
      pool(l,283,80,40,60,'#f4f0e4',.6);pool(l,160,120,170,44,'#fff0d8',.45);pool(l,92,98,48,36,'#ff9a48',.55)})},
 fore(g){/* the edge of a storage chest, nearest us */
  R(g,0,134,58,10,'#3a2c20');R(g,0,134,58,.8,'#7a6248');R(g,56,134,2,10,'#241a12');R(g,262,138,58,6,'#3a2c20');R(g,262,138,58,.8,'#7a6248')},
 draw(g,t){for(let i=0;i<3;i++)flame(g,88+i*5,100.6-(i%2),t+i*230,i===1);pool(g,93,97,15+Math.sin(t/160)*1.4,8,'#ff8a3a',.16);
  /* the other older man of Lystra, and two of the congregation, come in from the lanes */
  for(const[id,x,y,d]of GATHER)man(g,x,y,id,d,0,'#f0e8dc',G.hands&&id==='eld7'?1:0,7)},
 front(){}};
/* ---------- Iconium: the saddlers' street again, in winter ---------- */
const sultan7=x=>30+8*Math.sin(x/57+1)+4*Math.sin(x/21+2)+2*Math.sin(x/7);
ART.iconium7={w:480,fp:1.3,
 paint(g){const r=rng(431),W='#e6d8b4',ST='#d8ccae';
  sky(g,480,72,['#4a7cbc','#7ea4d0','#b4c8dc','#e2e4dc']);cloud(g,236,12,60,7,r);cloud(g,360,22,40,5,r);cloud(g,70,8,40,5,r);
  /* beyond the fountain: the plateau under its winter fields, and the mountains white almost to their feet */
  snowy(g,186,300,66,sultan7,['#8494bc','#a6b2cc','#c8ccd0'],22);comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,34,0,68,['rgba(214,224,238,0)','rgba(214,224,238,1)']);g.fillRect(186,34,114,34)});
  g.fillStyle=lg(g,0,64,0,104,['#b8b48a','#a8a876','#98a068']);g.fillRect(186,64,114,40);tex(g,'mott',.5,186,64,114,40,'overlay',1);
  for(let i=0;i<7;i++){const fx=188+i*15+r()*6,fy=67+r()*8;poly(g,[fx,fy,fx+20,fy-1,fx+26,fy+7,fx+3,fy+8],i%3===0?'rgba(150,120,84,.4)':i%3===1?'rgba(96,130,76,.3)':'rgba(190,170,110,.3)')}
  for(const[x,y]of[[200,80],[228,75],[260,79],[286,84],[244,84]]){oval(g,x+2,y+3.4,5,1,'rgba(50,60,90,.34)');R(g,x-.4,y+1,1.2,2.8,'#5a4630');foliage(g,x,y-.6,4.6,3,'#7a8a5e',r,20)}
  /* the street that runs back to the synagogue of the Jews */
  R(g,0,40,60,64,'#cfc4a8');g.save();g.beginPath();g.rect(0,28,60,76);g.clip();sky(g,480,80,['#7ea4d0','#e2e4dc']);
  for(const[hx,hy,hw,hh,c]of[[0,42,18,62,'#d6caa8'],[42,48,18,56,'#e2d6b4'],[16,56,10,48,'#c8bc9c'],[32,60,9,44,'#d8ccac']]){R(g,hx,hy,hw,hh,c);R(g,hx,hy-2,hw,2.4,'#b8603c');R(g,hx+hw-2.4,hy,2.4,hh,'rgba(60,50,90,.3)')}
  poly(g,[18,104,42,104,33,74,27,74],'#e0d6ba');ao(g,0,28,60,12,'t',.2,'#2a2440');g.restore();
  /* Nathan's saddlery: a plastered house, its whole front open to the street under an awning */
  house(g,60,24,126,80,W,r,{side:0,patch:3,cracks:5,beams:12});windowArt(g,72,34,10,10,W,{bars:2,wood:'#6a4e2c'});windowArt(g,162,34,10,10,W,{bars:2,wood:'#6a4e2c'});
  R(g,84,56,84,48,'#231a15');g.fillStyle=lg(g,0,56,0,104,['#2c211a','#4a382a']);g.fillRect(86,58,80,46);
  /* inside: a shelf of pack saddles, and hides rolled on the floor */
  wood(g,88,70,76,1.6,'#5a4226');for(const[sx,c]of[[94,'#8a5a34'],[110,'#a06a3c'],[126,'#7a4c2c'],[144,'#96643a']]){g.fillStyle=lg(g,sx,0,sx+11,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+5.5,70,5.6,4.6,0,Math.PI,0);g.fill();R(g,sx+1,66.4,9,.6,tint(c,.4))}
  for(const[sx,c]of[[96,'#9a6a40'],[108,'#7a5030'],[152,'#8a5c36']]){g.fillStyle=lg(g,0,96,0,104,[tint(c,.25),c,tint(c,-.45)]);g.fillRect(sx,97,10,7);oval(g,sx,100.5,1.6,3.5,tint(c,.15));oval(g,sx+10,100.5,1.6,3.5,tint(c,-.3))}
  /* harness on a bar across the opening: collars, girths and bridles, hanging */
  wood(g,84,58,84,1.8,'#7a5c36');for(const[sx,ln,c]of[[92,16,'#6a4424'],[99,22,'#8a5a30'],[118,13,'#5a3a20'],[137,20,'#7a4c28'],[158,15,'#6a4424']]){R(g,sx,59.8,1.2,ln,c);R(g,sx,59.8,.5,ln,tint(c,.3));R(g,sx-1.2,59.8+ln,3.6,3.2,c);R(g,sx,59.8+ln+1,1.2,1.2,'#231a15')}
  for(const sx of[108,147]){g.strokeStyle='#5a3a20';g.lineWidth=2.4;g.beginPath();g.ellipse(sx,67.6,3.8,6,0,0,6.2832);g.stroke();g.strokeStyle='#a8743e';g.lineWidth=.7;g.beginPath();g.ellipse(sx-.4,67.4,3.8,6,0,2.6,5);g.stroke()}
  ao(g,84,56,84,10,'t',.6);ao(g,84,56,7,48,'l',.45);
  wood(g,82,48,2.4,57,'#6a4e2c',1);wood(g,168,48,2.4,57,'#6a4e2c',1);awning(g,80,41,92,9,'#3f5a7a','#e6dcc4',8);shade(g,[80,104,172,104,180,111,88,111],SH,.5);
  /* the saddler's bench, out in the light, and a half-made pack saddle on it */
  R(g,104,97,50,9,'rgba(40,30,60,.38)');wood(g,102,95,3,11,'#6a4e2c',1);wood(g,151,95,3,11,'#6a4e2c',1);wood(g,102,90,52,4.6,'#96703e');R(g,102,94.2,52,1.2,'#5a4226');
  g.fillStyle=lg(g,116,0,134,0,['#b47a44','#8a5a30','#5a3a1e']);g.beginPath();g.ellipse(125,90,9,7,0,Math.PI,0);g.fill();R(g,118,84.6,13,.7,'#d09a5e');
  /* a low wall along the water, and the poplars that drink from it, bare now */
  ashlar(g,186,92,114,12,'#cdbf9c',r,{bw:9,bh:4,v:.1,t:.3});R(g,186,91,114,1.4,'#eadcb6');
  poplar(g,196,92,50,0,r,1);poplar(g,205,92,40,0,r,1);poplar(g,290,92,54,0,r,1);poplar(g,281,92,38,0,r,1);
  /* the fountain: a spout in a stone pier, and a round basin worn by two hundred years of jars */
  shade(g,[222,106,270,106,280,112,232,112],SH,.5);g.fillStyle=lg(g,238,0,250,0,['#b8ae98','#eee6d0','#a8a090']);g.fillRect(238,66,12,32);R(g,236.6,64,14.8,2.6,'#f2ead6');R(g,236.6,66.4,14.8,.6,'#a8a094');
  R(g,241,80,6,3,'#7a7466');R(g,243,80.6,2,2,'#2e2a26');
  g.fillStyle=lg(g,220,0,268,0,['#b0a690','#ece4cc','#d2c8b0','#928a78']);g.fillRect(220,95,48,11);oval(g,244,106,24,3,'#928a78');oval(g,244,95,24,3.6,'#f2ead6');oval(g,244,95.3,21.6,2.8,'#4f8cb4');oval(g,238,94.8,9,1.1,'#86bcd8');
  /* the yard of Xanthos the carrier: a wall of dressed stone, and a gateway wide enough for a loaded wagon */
  ashlar(g,300,34,138,70,ST,r,{bw:13,bh:6.4,v:.08,t:.3});for(let i=300;i<438;i+=9){R(g,i,30,5.6,4,ST);R(g,i,30,5.6,.5,'#f4e8c8')}R(g,300,33.6,138,1,'#a8987a');
  R(g,372,50,58,54,'#b8ac90');R(g,375,53,52,51,'#2a2018');g.fillStyle=lg(g,0,53,0,104,['#3a2e24','#6a5a44']);g.fillRect(377,55,48,49);
  for(const[sx,sy,sw,sh,c]of[[384,104,5,9,'#b8a880'],[394,104,5.6,11,'#c8b890'],[414,104,4.6,8,'#a89870']])sack(g,sx,sy,sw,sh,c);vessel(g,404,104,4,12,'#8a4a2a','amph',{noShadow:1});
  wood(g,372,50,58,3.4,'#6a4e2c');R(g,372,53.2,58,.8,'#2a1c10');ao(g,377,55,48,12,'t',.6);ao(g,377,55,7,49,'l',.45);
  windowArt(g,318,46,9,9,ST,{bars:2});for(const x of[312,340]){R(g,x-1.6,94.4,3.2,3.2,'#4a443c');R(g,x-.6,95.4,1.2,1.2,ST)}
  /* the south gate, and the road from Lycaonia */
  ashlar(g,438,22,42,82,'#dccfaa',r,{bw:13,bh:6.4,v:.09});for(let i=438;i<480;i+=8){R(g,i,17.6,5,4.4,'#dccfaa');R(g,i,17.6,5,.5,'#f8eccc')}R(g,438,21.6,42,1,'#a8987a');poly(g,[438,17.6,433,21,433,104,438,104],'#a8a0b0');
  arch(g,444,54,32,50,'#c2b28c');gateView(g,446,56,28,48,['#6a98cc','#b0c8de','#dfe6ea']);for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;R(g,460+Math.cos(a)*16-.3,70+Math.sin(a)*16-1,.6,2.6,'#a8987a')}
  /* paving */
  pave(g,0,103,480,144,'#d8ceb4',r,{vx:240,vy:62,rows:5,step:36,v:.08,joint:'#a59c88'});ao(g,0,103,480,5,'t',.3,'#4a4460');
  comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(244,240,226,0)','rgba(244,240,226,.9)']);g.fillRect(0,103,480,41)});
  shade(g,[300,104,438,104,452,112,314,112],SH,.5);shade(g,[0,104,60,104,60,108,0,112],SH,.55);shade(g,[186,104,222,104,228,108,192,108],SH,.4);
  pool(g,240,0,300,160,'#f4f0e0',.12,'screen');ao(g,0,0,90,144,'l',.08,'#2a2050')},
 fore(g){const r=rng(432);/* a wine jar and a heap of pack saddles at the street's edge */
  vessel(g,34,152,11,30,'#5a2e1e','amph',{noShadow:1});
  for(const[sx,c]of[[470,'#6a4428'],[494,'#7a5030']]){g.fillStyle=lg(g,sx,0,sx+26,0,[tint(c,.2),c,tint(c,-.4)]);g.beginPath();g.ellipse(sx+13,150,14,13,0,Math.PI,0);g.fill()}
  sack(g,80,152,12,17,'#a8a090');for(let i=0;i<16;i++){const sx=540+r()*60;stroke(g,[sx,150,sx+(r()-.5)*5,138-r()*6],'#6a6a4a',.8)}
  comp(g,'source-atop',.4,()=>R(g,0,0,640,150,'#34305a'))},
 draw(g,t){/* water from the spout, and rings on the basin */
  const f=t/90;R(g,243.2,83,1.6,11,'#a8d8ec');for(let i=0;i<3;i++)R(g,243.2,83+((f+i*3.4)%10),1.6,1.2,'#f0fafe');
  for(let i=0;i<3;i++){const k=((t/460+i*.33)%1);g.strokeStyle=`rgba(230,246,252,${.7*(1-k)})`;g.lineWidth=.5;g.beginPath();g.ellipse(244,95.2,1.4+k*12,.3+k*1.6,0,0,6.2832);g.stroke()}
  /* the carrier's wagon, under the cover a tentmaker sewed for it two winters ago */
  wagon(g,310,110,1,0)},
 front(){}};
/* ============ CAST, ITEMS, COMBINATIONS ============ */
Object.assign(LOOK,{
  /* Silas, a leading man among the brothers in Jerusalem, and a prophet */
  silas:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  /* seen only as the chapter opens: Barnabas and John Mark; Peter and James, thirteen years after Chapter Two; Judas called Barsabbas; the men from Judea */
  barnabas7:{skin:'#b8844f',hair:'#685a4c',beard:'#685a4c',grey:'#9a9086',fullBeard:1,tunic:'#b0563a',cloak:'#d8c8a0',belt:'#5a3a20',trim:'#7a3a26',long:1,ph:500},
  mark7:{skin:'#c08c5c',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#8aa08a',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',slim:1,ph:900},
  peter7:{skin:'#b07848',hair:'#968e84',beard:'#a69e94',thin:1,tunic:'#3f6a8a',cloak:'#8a7a5a',belt:'#3a2414',long:1,brow:'#6a6258',ph:1300},
  james7:{skin:'#bd8a5a',hair:'#46382e',beard:'#52443a',grey:'#7a7068',longBeard:1,tunic:'#e0d6bc',cloak:'#6a5a7a',belt:'#4a3a24',long:1,ph:2900},
  judas7:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#4a3a2a',brow:'#2a1a12',tunic:'#8a6a4a',cloak:'#5a6a4a',long:1,belt:'#3a2414',ph:0},
  jud1:{skin:'#b47e52',wrap:'#3a3a5a',beard:'#2a1a12',longBeard:1,brow:'#1a1210',tunic:'#e2dcc8',cloak:'#3a4a6a',long:1,belt:'#8a6a2a',trim:'#3a4a6a',ph:0},
  jud2:{skin:'#c08c5c',wrap:'#e2dcc8',beard:'#5a4a3a',brow:'#3a2a1a',tunic:'#6a5a70',cloak:'#d8cdb0',long:1,belt:'#4a3a24',ph:0},
  /* the apostles and the elders in Jerusalem, and the brothers of Antioch */
  ap1:{skin:'#b47e52',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#a89068',cloak:'#5a6a7a',long:1,belt:'#4a3a24',ph:0},ap2:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#6a5a4a',longBeard:1,brow:'#3a2a1a',tunic:'#8a7a5a',cloak:'#c8b890',long:1,belt:'#3a2414',ph:0},
  ap3:{skin:'#c08c5c',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#7a5a3e',cloak:'#d8c8a0',long:1,belt:'#2e2016',ph:0},ap4:{skin:'#b8844f',hair:'#5a4a3a',beard:'#6a5a4a',tunic:'#5f7a6a',cloak:'#8a6a4a',long:1,belt:'#4a3a24',ph:0},
  ap5:{skin:'#c69870',wrap:'#8a5a3a',beard:'#2a1a12',brow:'#1a1210',tunic:'#d8c9a0',cloak:'#6a3a4a',long:1,belt:'#8a6a2a',ph:0},
  br1:{skin:'#c69870',hair:'#6a5030',beard:'#6a5030',brow:'#4a3420',tunic:'#d8c890',belt:'#5a3a20',ph:0},br2:{skin:'#8a5a3a',hair:'#1a1210',beard:'#1a1210',tunic:'#c9a23a',cloak:'#4a5a7a',long:1,belt:'#5a3a20',brow:'#120c0a',ph:0},
  br3:{skin:'#c89a70',veil:'#a8603a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},br4:{skin:'#c08c5c',hair:'#3a2a1a',tunic:'#8a9a7a',belt:'#4a3a24',slim:1,ph:0},
  /* Tarsus: an older brother of Israel, a brother of the nations, and the sister in whose courtyard the congregation meets */
  reuben:{skin:'#b47e52',wrap:'#d8d0b8',beard:'#9a9a9a',longBeard:1,brow:'#6a6a6a',tunic:'#6a4a5a',cloak:'#c8b890',long:1,belt:'#4a3a24',trim:'#8a6a7a',ph:1100},
  agathon:{skin:'#c69870',hair:'#5a4026',beard:'#5a4026',brow:'#3a2a1a',tunic:'#9ab0c0',belt:'#4a3a24',trim:'#5a7a8a',ph:1900},
  eirene:{skin:'#c89a70',veil:'#b85a3a',tunic:'#e6dcc0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#b85a3a',brow:'#3a2414',ph:2700},
  tc1:{skin:'#b47a4a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#b08a4a',belt:'#3a2414',ph:0},tc2:{skin:'#c89a70',veil:'#5a7a8a',tunic:'#e2d8c0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},
  tc3:{skin:'#c08c5c',wrap:'#c8b48a',beard:'#5a4a3a',brow:'#3a2a1a',tunic:'#7a8a9a',cloak:'#d8cdb0',long:1,belt:'#4a3a24',ph:0},tc4:{skin:'#a8703f',hair:'#3a2a1a',tunic:'#c8b888',belt:'#4a3a24',slim:1,ph:0},
  tc5:{skin:'#c49268',veil:'#c8a25a',tunic:'#8a6a7a',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},tc6:{skin:'#b8844f',hair:'#8a8a8a',beard:'#9a9a9a',brow:'#6a6a6a',tunic:'#9a6a4a',cloak:'#5a6a4a',long:1,belt:'#2e2016',ph:0},
  /* the Taurus road: the carter of Derbe from Chapter Six, and a merchant of Tarsus with his wife and daughter */
  zenon7:{skin:'#9a6238',hair:'#2a1a12',beard:'#2a1a12',tunic:'#6f7a5a',belt:'#2e2016',trim:'#4a5a3a',brow:'#1a1210',ph:1500},
  bion:{skin:'#b88458',wrap:'#7a8a4a',beard:'#2a1a12',brow:'#1a1210',tunic:'#c08a3a',cloak:'#4a5a6a',long:1,belt:'#3a2414',trim:'#7a5a1e',ph:2300},
  charis:{skin:'#c8a078',veil:'#6a5a8a',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#4a3a6a',brow:'#3a2414',ph:3300},
  melissa:{skin:'#d0a880',veil:'#d8a890',tunic:'#c8d0b0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,brow:'#3a2414',h:1,ph:600},
  /* Lystra: Timothy, a man's height now; his mother and his grandmother; Myron, one of the older men appointed in Chapter Six */
  timothy7:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  eunice7:{skin:'#c89a70',veil:'#7a8ab0',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#5a6a8a',brow:'#3a2414',ph:2500},
  lois7:{skin:'#b88a62',veil:'#e2dccb',tunic:'#6a5a70',long:1,belt:'#4a3a24',slim:1,longSleeve:1,trim:'#8a7a8a',brow:'#8a8a8a',ph:3100},
  myron:{skin:'#b47e52',hair:'#9a9a9a',beard:'#a8a8a8',brow:'#6a6a6a',tunic:'#a89068',cloak:'#5a6a7a',long:1,belt:'#4a3a24',ph:400},
  eld7:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#6a5a4a',brow:'#3a2a1a',tunic:'#8a7a5a',long:1,belt:'#3a2414',ph:0},
  ly1:{skin:'#c89a70',veil:'#a8603a',tunic:'#d8c9a0',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,ph:0},ly2:{skin:'#c49268',veil:'#6a7a4a',tunic:'#7a6a8a',long:1,belt:'#c9a14a',slim:1,longSleeve:1,ph:0},
  /* Iconium: the saddler and the carrier's wife, from Chapter Six */
  nathan7:{skin:'#b47e52',wrap:'#c8b48a',beard:'#3a2a1a',brow:'#2a1a12',tunic:'#8a5a34',belt:'#3a2414',trim:'#5a3a20',ph:1300},
  tatia7:{skin:'#d0a27a',veil:'#c8a25a',tunic:'#5f7a6a',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,trim:'#c8b890',brow:'#3a2414',ph:700}});
/* FLOCK: the congregation of Tarsus, called together; GATHER: who else is in the house of Lois */
const FLOCK=[['tc1',342,108,-1],['tc2',358,110.4,-1],['tc3',374,107.6,-1],['tc6',392,111,-1],['tc4',406,108,-1],['tc5',422,110.6,-1],['tc2',198,110,1],['tc4',182,112.6,1]];
const GATHER=[['eld7',34,117,1],['ly1',20,131,1],['ly2',304,132,-1]];
/* People who came into Chapter Six keep their own actors there; here each has a second one, so that neither chapter disturbs the other. */
const SI=actor('silas','Silas','#9fd8c8',118),RE=actor('reuben','Reuben','#e8dca8',100),AG=actor('agathon','Agathon','#b8e0d0',136),EI=actor('eirene','Eirene','#f0c0a8',196),
  ZE=actor('zenon7','Zenon','#f0b088',110),BI=actor('bion','Bion','#f0d090',114),CH=actor('charis','Charis','#d8c8f0',202),ME=actor('melissa','Melissa','#f4d0d8',250),
  TI=actor('timothy7','Timothy','#b8e0b0',150),EN=actor('eunice7','Eunice','#a8d0f0',204),LO=actor('lois7','Lois','#e8d0d8',170),MY=actor('myron','Myron','#e0d8b0',98),
  NA=actor('nathan7','Nathan','#e8d890',116),TA=actor('tatia7','Tatia','#e0c8f0',200),PE=actor('peter7','Peter','#8ec8f0',108),JA=actor('james7','James','#d8c8f0',122);
Object.assign(ICON,{
  /* the letter: a sheet of papyrus between its two rolls, with a few lines of writing that stop short of its edge. Nothing is tied across it. */
  letter(g){g.fillStyle=lg(g,6,0,20,0,['#d8c898','#f4e8c0','#e8dab0','#b8a878']);g.fillRect(6.4,6,13.2,12);for(let j=8.6,k=0;j<16.4;j+=1.9,k++)R(g,8,j,7+(k*3)%3.6,.6,'#6a5a3a');
    for(const y of[4,16.8]){g.fillStyle=lg(g,0,y,0,y+3.2,['#f8eccc','#d8c898','#9a8858']);g.fillRect(5,y,14.4,3.2);R(g,4,y+.4,1.2,2.4,'#e8dab0');R(g,19.2,y+.4,1.2,2.4,'#a89868');R(g,5,y+2.8,14.4,.4,'#7a6a48')}},
  /* the same letter in its case: a sleeve of goat-hair cloth, dark with tallow, its flap folded over the mouth */
  lcase(g){g.save();g.translate(12,12.4);g.rotate(-.62);g.fillStyle=lg(g,0,-3.6,0,3.6,['#5a4c40','#2e2620','#15100d']);g.fillRect(-9.4,-3.6,18.8,7.2);R(g,-9.4,-3.6,18.8,.7,'#8a7a66');R(g,-10.4,-3,1.2,6,'#3a3029');
    poly(g,[4.6,-3.6,9.4,-3.6,9.4,3.6,6.6,3.6],'#473c33');stroke(g,[4.6,-3.6,6.6,3.6],'#7a6a58',.5);for(let i=-7.6;i<4;i+=2.6)R(g,i,-2.6,.4,5.6,'rgba(255,236,200,.12)');g.restore()},
  pcase(g){g.save();g.translate(12,12.4);g.rotate(-.62);g.fillStyle=lg(g,0,-3.6,0,3.6,['#6a5c50','#473c33','#2a221d']);g.fillRect(-9.4,-3.6,18.8,7.2);R(g,-9.4,-3.6,18.8,.7,'#9a8a76');R(g,-10.4,-3,1.2,6,'#51453b');
    poly(g,[4.6,-3.6,9.4,-3.6,9.4,3.6,6.6,3.6],'#5a4c40');stroke(g,[4.6,-3.6,6.6,3.6],'#9a8a76',.5);for(let i=-8;i<4;i+=1.6){R(g,i,-3,.6,.5,'#d8cca8');R(g,i,2.5,.6,.5,'#d8cca8')}g.restore()},
  /* a yoke strap, coiled */
  strap(g){for(const[q,c]of[[7.6,'#6a4424'],[5,'#8a5a30'],[2.5,'#6a4424']]){g.strokeStyle=tint(c,-.45);g.lineWidth=2.8;g.beginPath();g.ellipse(11,13.4,q,q*.74,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=1.8;g.stroke()}
    stroke(g,[18.4,12.4,20.6,8,20,4.6],'#3a2414',2.8);stroke(g,[18.4,12.4,20.6,8,20,4.6],'#8a5a30',1.8);R(g,19,3.4,2,1.8,'#c9a14a')},
  /* tallow, in the lid of the carter's grease pot */
  tallow(g){R(g,6,19,13,1.2,'rgba(0,0,0,.3)');g.fillStyle=lg(g,5,0,19,0,['#8a5a34','#b8804c','#7a4c28','#4a2c14']);g.beginPath();g.moveTo(5,12.4);g.lineTo(19,12.4);g.lineTo(16.4,19.4);g.lineTo(7.6,19.4);g.closePath();g.fill();
    R(g,5,11.6,14,1.4,'#5a3a1e');g.fillStyle=lg(g,7,7,17,13,['#fff8e0','#eadfb8','#c8b888']);g.beginPath();g.ellipse(12,11.8,5.4,4.4,0,Math.PI,0);g.fill();R(g,9.6,8.6,2.6,1,'#fffdf0')}});
ICON.staff=g=>{stroke(g,[4.6,20.6,19,3.6],'#3e2a16',2.6);stroke(g,[4.2,20.2,18.6,3.2],'#a8804e',1);stroke(g,[5.4,20.8,19.6,4],'#5a3c20',.6);
  R(g,17.4,3,2.6,2.6,'#6a4a2a');R(g,3.4,19.8,2.2,2.2,'#2a1c10')};
Object.assign(ITEMS,{
  sstaff:{name:"Silas's staff",icon:'staff',look:"Silas's walking staff. It came down from Jerusalem beside the letter, and it has not complained once.",
    by:{silas:'My walking staff. It has learned the road from Jerusalem to Antioch, and now it is learning Cilicia.'}},
  letter:{name:'letter from Jerusalem',get icon(){return F.cased?'lcase':'letter'},
    get look(){return F.cased?'The letter of the apostles and the elders, and our copies of it, in a case of goat-hair cloth rubbed with tallow. A river may try it now.'
      :'The letter of the apostles and the elders in Jerusalem, and the copies we have made of it: one for every congregation on our road.'},
    by:{get silas(){return F.cased?'The letter, safe in the case Paul sewed for it. I watched him do it, and I could not tell you how.':'The letter I was sent out with, and our copies of it. I know it by heart, and I still read it from the page.'}}},
  strap:{name:'yoke strap',look:"A spare yoke strap from Zenon's harness box: ox-hide, as thick as a thumb. A hand's length of it will make a corner loop that no wind tears out.",
    by:{silas:'A strap of ox-hide. To me it is a strap. To Paul it is the corner of a tent.'}},
  cloth7:{name:'goat-hair cloth',icon:'cloth',look:"A length of goat-hair cloth off Bion's best bale. Cilicium: half the tents on the plateau are cut from it.",
    by:{silas:'Black goat-hair cloth. The merchant pressed it on Paul, and would not hear no.'}},
  pcase:{name:'letter case',look:'A sleeve of goat-hair cloth, sewn down both sides, with a flap to fold over its mouth. It will keep out dust. It will not yet keep out a river.',
    by:{silas:'A case for the letter. Paul made it while I was still wringing out my mantle.'}},
  tallow:{name:'axle tallow',look:"Tallow from Zenon's grease pot. It keeps water out of an axle. Worked into cloth with the thumb, it will keep water out of that too.",
    by:{silas:'A lump of tallow. It smells of oxen, and of every mile between Derbe and Tarsus.'}}});
/* how Silas describes the tools of the trade (set again whenever this chapter begins: see setup7) */
const BY7={awl:"The tentmaker's awl. I have watched it work, and I would not know which end to hold.",thread:'Waxed linen thread, and strong.',
  knife:'A knife for cloth and leather. I had better leave it in its owner\'s hand.',tablets:'His wax tablets: people, work and Scripture, in a small hand.'};
const inTar=()=>G.room==='tarsus7',inGates=()=>G.room==='gates',inLys=()=>G.room==='lystra7',inIco=()=>G.room==='iconium7',other=()=>PC()===P?SI:P,
  heard=()=>!!(F.eld&&F.fam&&F.nat&&F.tat);
/* toPaul: something handed to Paul, whoever is being played at the moment */
function toPaul(id,quiet){const inv=invOf(P);if(!inv.includes(id)){inv.push(id);drawInv();if(!quiet)SFX.pick()}}
function dropAll(id){for(const a of party()){const inv=invOf(a),i=inv.indexOf(id);if(i>=0)inv.splice(i,1)}if(G.item===id)G.item=null;drawInv()}
/* bring: something Paul needs for his work, which Silas happens to be carrying, comes back to him */
async function bring(id){const his=invOf(SI),i=his.indexOf(id);if(PC()===P&&i>=0){his.splice(i,1);toPaul(id,1);await say(SI,'You will want this back, Paul. In my hands it is only baggage.')}return invOf(P).includes(id)}
/* ask: a question put to whoever is played, with three answers. A reply may come from anyone present: r lists lines, or [actor, line, how] sets. */
async function ask(me,who,q,opts){let av=opts.slice();
  for(;;){await say(who,q);const o=av[await choose(av.map(o=>o.q))];for(const l of o.p||[o.q])await say(me,l);
    for(const x of o.r)await(Array.isArray(x)?say(x[0],x[1],x[2]||{}):say(who,x));if(o.ok)return;av=av.filter(x=>x!==o)}}
/* think: Paul weighs what to say next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* ============ SCRIPTURE: the passages on the tablets ============ */
const PASS={
  deut19:{ref:'Deuteronomy 19:15',gist:'A matter stands when two witnesses, or three, have given their testimony.'},
  prov18:{ref:'Proverbs 18:17',gist:'Whoever pleads his case first sounds right, until the other side arrives and questions him closely.'},
  ecc4:{ref:'Ecclesiastes 4:9, 10',gist:'Two are better off than one, since their toil brings them a good return; and if either falls, the other can lift his companion up.'},
  isa32:{ref:'Isaiah 32:2',gist:'Every one of them will be like shelter out of the wind and cover from the cloudburst, like running water in dry country, like the shade of a great rock in a thirsty land.'},
  sam16:{ref:'1 Samuel 16:7',gist:'God does not look at things as a man does: a man goes by what his eyes show him, but Jehovah looks into the heart.'},
  prov22:{ref:'Proverbs 22:1',gist:'Choose a good name before great riches; to be held in respect is worth more than silver and gold.'},
  ps71:{ref:'Psalm 71:17, 18',gist:'Since I was young, O God, you have been my teacher, and to this day I go on telling of your wonderful works. Do not leave me, O God, when I am old and my hair is gray. Let me tell the generation after mine of your power, and all who are still to come of your might.'}},
  ORDER=['deut19','prov18','ecc4','isa32','sam16','prov22','ps71'];
const quote=k=>T('{text} ({ref})',{text:T(PASS[k].gist),ref:T(PASS[k].ref)});
/* ============ TARSUS: the letter, and the second witness ============ */
/* A man who was a party to a dispute cannot be the only witness to how it ended. Paul argues, every word of it true, and gets nowhere. */
async function argue(){
  if(F.read)return say(RE,'It is settled, Paul, and I am glad of it. I only wish that I had asked sooner, and grumbled less.');
  if(F.silas)return say(RE,'I have heard your second witness, Paul, and I will hear your letter. Where it is read, and to whom, is for you to say.');
  let av=[
    {q:'I was in the room, Reuben. I heard it decided.',r:'You were in the room as one side of the dispute. I do not say that you lie, Paul. I say that no man is a witness in his own case.'},
    {q:"Read it. It is the apostles' letter, not mine.",r:'It speaks of Barnabas and Paul as men dear to those who wrote it. Of course it reads well in your hand. What I cannot read in it is what was said in that room.'},
    {q:'Peter himself spoke as I do.',r:'So you tell me. The men from Judea came from Jerusalem too, and they spoke as if Jerusalem had sent them.'}];
  await say(RE,'Well, Paul? Why should Tarsus take this letter on your word?');
  for(;;){const i=await choose(av.map(o=>o.q).concat('I will not argue it with you, Reuben.'));
    if(i===av.length){await say(P,'I will not argue it with you, Reuben.');break}
    const o=av[i];await say(P,o.q);await say(RE,o.r);av=av.filter(x=>x!==o);G.tried=1;if(!av.length)break;await say(RE,'Have you anything more?')}
  if(G.tried){await say(RE,quote('deut19'));await say(RE,'That is not my rule, Paul. It is the Law\'s.');
    await say(P,'Every word I said to him is true, and none of it is of any use. He is asking for a second witness. And he is right to ask.',TH)}}
/* The men from Judea were heard first in Tarsus, and seemed right (Proverbs 18:17): Paul's look at the benches says so. */
/* Silas was no party to the dispute. He was sent, with Judas, to tell the same things in person (Acts 15:27). */
async function vouch(){
  if(F.read)return say(RE,'You read it well, brother. Stay a week in Tarsus, and tell us the rest.');
  if(F.silas)return say(RE,'I have heard you, Silas. Now I would hear the letter.');
  await ask(SI,RE,'You are the man from Jerusalem. What have you to say that Paul has not said already?',[
    {q:'Paul has told you the truth.',r:['I never said that he lied. But you walk the same road he does: of course you say so. Tell me something that is yours to tell.']},
    {q:'It is settled, brother. Let it rest.',r:['Settled in Jerusalem, perhaps. Not yet in me. I would rather be persuaded than hushed.']},
    {q:'I was sent from Jerusalem to report it by word of mouth.',ok:1,
      p:['I am not here as Paul\'s friend, Reuben, though I am that. I am one of the two men whom the apostles and the elders sent out with this letter.',
        'It says that Judas and Silas are sent so that you may hear the same things from their own lips. (Acts 15:27)','I was there when it was written. Ask me what you like.'],
      r:['Then tell me this. The men who taught us: did Jerusalem send them?',[SI,'The letter answers that itself: they had no instructions from us. (Acts 15:24)'],
        'And the decision? Was it Paul\'s party against the rest?',[SI,'The letter says that we decided it with one mind. (Acts 15:25) Peter spoke, and James. When they had done, no one spoke against it.'],
        'Two witnesses. One who was a party to the matter, and one who was sent. That is enough for the Law, and it is enough for me.','I will hear your letter.']}]);
  F.silas=1;SFX.good();
  await say(P,'He did not raise his voice once. A man sent to settle a quarrel, who sounds like it.',TH)}
/* The letter is for the whole congregation, as it was in Antioch (Acts 15:30, 31): read to one man beside a loom, it would settle one man. */
async function readTarsus(){const me=PC();
  await say(me,me===P?'Eirene, will you call the congregation together? All of it. This letter was not written to three people beside a loom.':'Sister, will you call the whole congregation together? The letter is addressed to all of them.');
  await say(EI,'I have been waiting two months for someone to ask me that.');
  playAs(P);await fade(1,500);G.gath=1;
  place(SI,'tarsus7',268,124,1);place(P,'tarsus7',244,128,1);place(EI,'tarsus7',220,119,1);place(AG,'tarsus7',304,119,-1);place(RE,'tarsus7',328,124,-1);G.cam=108;
  await narr('In Antioch everyone had been assembled before the letter was handed over. (Acts 15:30) Now the same was done in Tarsus.',{dur:8000});
  await fade(0,600);
  await say(P,'Read it to them, Silas. You carried it out of Jerusalem.');
  await say(SI,'To the brothers from the nations in Antioch, Syria and Cilicia: greetings from your brothers, the apostles and the elders. (Acts 15:23)');
  await say(AG,'Cilicia! They wrote it to us. By name.');
  await say(SI,'We hear that some who came from us have upset you with their talk and tried to unsettle you. They had no instructions from us... (Acts 15:24)');
  await say(SI,'It seemed right to the holy spirit, and to us as well, to lay no burden on you beyond the necessary things: have nothing to do with what is sacrificed to idols, with blood, with anything strangled, or with sexual immorality. (Acts 15:28, 29)');
  await say(SI,'Guard yourselves well against these, and it will go well with you. Stay in good health! (Acts 15:29)');
  F.read=1;AU.mood='calm';SFX.good();
  await narr('When that letter was read in Antioch, there was joy at the encouragement it gave. (Acts 15:31) It was no different in Tarsus.',{dur:8000});
  await say(AG,'No burden beyond the necessary things. I have carried another for two months, and it is gone.');
  await say(RE,'I asked for a second witness, and I was given the whole council. Forgive an old man his caution, Paul.');
  await say(P,'There is nothing to forgive, Reuben. You asked what the Law asks, and you listened when it was answered.');
  await narr('Silas spoke on until the lamps were lit. He was a prophet, and in Antioch he and Judas had given many a talk that encouraged the brothers and made them strong. (Acts 15:32)',{dur:9500});
  codeBtn()}
/* letterTo: the letter, offered to one of the three by whoever carries it */
const letterTo=A=>async it=>{if(it!=='letter')return false;const me=PC();
  if(F.read)return say(A,A===EI?'It has been read in my courtyard, and I shall not forget the evening. Take it on to the next congregation.':A===RE?'I have heard it, and I have it by heart already. Take it on to the next city.':'I heard my own country named in it. I shall not forget that.');
  if(A===EI)return F.silas?readTarsus():say(EI,'I could have every brother in Tarsus in this courtyard before the lamps are lit. But Reuben says that he will not sit and hear a man read out his own victory; and where Reuben will not sit, a good many others will not sit either.');
  if(A===AG)return say(AG,'For me to read, by myself? I would sooner hear it with the brothers around me. If it is good news, they need it as much as I do.');
  if(!F.silas)return say(RE,me===P?'I can read, Paul. What I cannot read in it is what was said in that room.':'I can read, brother. First tell me by what right you carry it.');
  return say(me,me===P?'To Reuben alone, here beside the loom? Then three men know it, and the rest of Tarsus hears it at second hand. This trouble was sown in the whole congregation.'
    :'To him alone? In Antioch we called everyone together, and it was everyone who rejoiced.',TH)};
async function leaveTar(){const me=PC();
  if(!F.read)return say(me,me===P?(F.silas?'Reuben is ready to hear the letter, and so is all Tarsus. I am not leaving before it has been read.':'Not while this congregation is of two minds. That is what we came through Cilicia for.')
    :'We were sent to strengthen the congregations, not to walk past them.');
  await say(me,me===P?'North, Silas: over the Taurus. There are congregations beyond those mountains that have never seen this letter.':'North, then, and over the mountains. Lead on, Paul.');return travel()}
RE.hs={name:'Reuben',actor:RE,
  look:()=>say(P,F.read?'Reuben. He is going from bench to bench, telling everyone what he asked and what he was answered.':F.silas?'Reuben. He has stopped frowning at the letter, and started waiting for it.'
    :'Reuben, a son of Israel and one of the first in Tarsus to believe. A careful man. Half this congregation looks to him before it makes up its mind.'),
  give:letterTo(RE),
  show:{tablets:'You always carried those. I am glad that some things have not changed.',awl:'The tentmaker\'s awl. I remember when you had no other errand in Tarsus than that.',
    knife:'Put it away, Paul. Nobody here is cutting anything today: we are trying to mend.',thread:'Good thread. A congregation should be so well sewn.','*':'That is not what stands between us, Paul.'},
  ask:{witness:()=>say(RE,'I have said what I ask, Paul. Not more words from you. Another voice.')},
  talk:argue,
  as:{silas:{look:()=>say(SI,F.read?'Reuben. He asked a hard question honestly, and he took the answer the same way.':'An older brother, and a troubled one. He is not against Paul. He is afraid of being misled a second time.'),
    give:letterTo(RE),talk:vouch,show:{sstaff:'A staff from Jerusalem. So you did walk here from there.','*':'Keep it, brother. It is not a thing I need: it is a word.'}}}};
AG.hs={name:'Agathon',actor:AG,
  look:()=>say(P,F.read?'Agathon. He looks like a man who has put down a load.':'Agathon, a brother of the nations, with a wife and three sons. For two months he has not known whether his faith was enough.'),
  give:letterTo(AG),
  show:{tablets:'You read to us from those when I first believed. I should like to hear them again, when this is over.',awl:'My wife still has the awning you sewed for her stall.','*':'Not now, Paul. I cannot think of anything but that letter.'},
  ask:{witness:['Reuben is not a hard man, Paul. He was told one thing by men from Jerusalem, and now he is told another by you.','He says that he will believe it when he hears it from someone who has nothing to win by it.']},
  talk:()=>F.read?say(AG,'I can look my sons in the face again, and tell them plainly what is asked of us, and what is not.'):talkTree([
    {q:'What did the men from Judea tell you?',a:async()=>{await say(AG,'That unless we were circumcised, as the custom of Moses has it, we could not be saved. (Acts 15:1)');await say(AG,'It was said in this courtyard too, Paul. And they looked at me while they said it.')}},
    {q:'What does Reuben say to it?',a:()=>say(AG,'That he no longer knows. And if Reuben does not know, who am I to be sure?')},
    {q:'You will have your answer today, Agathon.',bye:1}]),
  as:{silas:{look:'A brother of the nations. He has the look of a man who was told that the door he came in by was the wrong one.',give:letterTo(AG),
    talk:()=>say(AG,F.read?'I heard you read it: to the brothers from the nations in Antioch, Syria and Cilicia. Cilicia! That is my country, and they wrote to it.':'You are from Jerusalem? Then you know whether it is true, what they told us. ...No. Do not tell me alone. Tell us all.'),
    show:{'*':'Not now, brother. I cannot think of anything but that letter.'}}}};
EI.hs={name:'Eirene',actor:EI,
  look:()=>say(P,F.read?'Eirene. Her courtyard is full, and she is counting heads to see how far the bread will go.':'Eirene, a weaver of linen. The congregation of Tarsus meets in her courtyard, and lately it has met there in two halves.'),
  give:letterTo(EI),
  show:{tablets:'Your tablets. You never could walk past a verse without writing it down.',awl:'I weave it, and you pierce it. We never did agree about cloth.',thread:'Linen thread, and waxed. Not mine: mine is finer.',
    knife:'Not near my loom with that, Paul.','*':'Keep it by you. You have a long road in front of you.'},
  ask:{witness:['Reuben is the most careful man in Tarsus, and one of the best. He will not be talked round. He will be shown, or he will stay as he is.','Your friend from Jerusalem has not opened his mouth yet. Why did the apostles send him, if not to speak?']},
  talk:()=>F.read?say(EI,'They are still talking under the fig tree. Let them. It is the first glad talk this courtyard has heard in two months.'):talkTree([
    {q:'How has it been here, Eirene?',a:async()=>{await say(EI,'Quiet, and not the good kind. The brothers of the nations sit on one bench and the brothers of Israel on another, and each is afraid of wounding the other.');
      await say(EI,'Nobody has left. But nobody sings as he used to.')}},
    {q:'Could the whole congregation be called together?',a:()=>say(EI,F.silas?'Today? Reuben will come now, and where Reuben comes the others follow. Put into my hand what I am to call them for, and I will have them here before the lamps are lit.'
      :'I could send my boys through the streets within the hour. But Reuben says that he will not sit and hear a man read out his own victory; and where Reuben will not sit, a good many others will not sit either.')},
    {q:'Peace to this house.',bye:1}]),
  as:{silas:{look:'Eirene. She keeps a divided congregation under one roof, and feeds both halves.',give:letterTo(EI),
    talk:()=>say(EI,F.read?'You read as one who was there, brother. That was what they needed.':F.silas?'Reuben is ready. Bring me the letter, and I will bring you the congregation.':'Peace to you, brother. You were sent with that letter, were you not? Then I wonder that Paul is doing all the talking.'),
    show:{sstaff:'Lean it by the door. Nobody will touch it.','*':'Keep it by you, brother.'}}}};
ROOMS.tarsus7={walk:[16,464,114,138],get mood(){return F.read?'calm':'tense'},amb:()=>F.read?{crowd:.5,birds:.4,leaves:.4}:{birds:.5,leaves:.4,crowd:.12},hs:[
  {name:'mountains',x:104,y:18,w:330,h:22,wx:260,look:'The Taurus, with the first snow of the year on it. Beyond it lie Derbe, Lystra and Iconium.'},
  {name:'door of the house',x:36,y:59,w:24,h:45,wx:50,wy:115,look:"Eirene's door. The congregation of Tarsus has gone in and out of it for years.",use:'The congregation meets in the courtyard. I have no business indoors.',open:'The congregation meets in the courtyard. I have no business indoors.'},
  {name:'loom',x:142,y:54,w:42,h:50,wx:164,wy:115,look:'Linen on the loom, as fine as any in Cilicia. Tarsus lives by its flax, and by the goat-hair cloth that tentmakers cut.',use:'Weaving is not sewing. I should only tangle her warp.',pickup:"It is Eirene's living."},
  {name:'bolts of linen',x:196,y:54,w:46,h:50,wx:220,wy:115,look:'Bolts of linen, bleached and folded. This city has a harbor, and its cloth goes out by it.',pickup:'They are hers, and I dare say they are sold already.'},
  {name:'linen on the wall',x:272,y:36,w:42,h:32,wx:292,wy:115,look:'Linen, bleaching on the wall in the sun.',pickup:'It is not dry, and it is not mine.'},
  {name:'stone basin',x:264,y:90,w:64,h:17,wx:296,wy:115,look:'A basin for washing the flax. The water is from the Cydnus, the river of Tarsus.',use:'I wash the dust of the Syrian road from my hands. It is cold: it comes down from the snow.'},
  {name:'fig tree',x:350,y:27,w:74,h:36,wx:386,wy:116,look:'A fig tree, old enough to shade a whole congregation.'},
  {name:'benches',x:336,y:88,w:96,h:17,wx:384,wy:116,look:async()=>{if(F.read)return say(P,'The benches under the fig tree. There is not room on them this evening.');await say(P,'Benches under a fig tree, and most of them empty. A congregation that is of two minds does not sit down together gladly.');
      await say(P,'The men from Judea sat here before I did, and stated their case first.');return say(P,quote('prov18'))},use:'I did not come back to Tarsus to sit down.'},
  {name:'gate to the street',x:444,y:54,w:32,h:50,wx:458,wy:115,dir:1,look:'The gate to the street. One way it runs down to the harbor. The other way it runs to the north gate, and the road to the mountains.',exit:leaveTar}]};
/* ============ THE CILICIAN GATES: a torn tent, and a storm an hour away ============ */
async function gatesIntro(){if(F.strap||F.mended)return;
  await say(ZE,'This is as far as we go tonight, brothers. Look at that sky. When the wind comes down the Gates like this, there is rain behind it, and plenty.');
  await say(ZE,'My oxen will stand it, and the three of us can sleep under the wagon. Those people yonder are not so well off.');
  await say(BI,'Hold it, Charis! Hold the... There. It is down again.');
  await say(SI,'A family, Paul. Their tent is down, and they have a child with them.');
  await say(P,'A torn tent, a storm an hour away, and a tentmaker standing in the road. I do not think that I need to pray long over this one.',TH)}
async function strapGive(){if(F.strap)return say(ZE,F.mended?'You had it, and I saw what you made of it.':'You have it in your hand, brother. Cut what you need.');
  await say(ZE,'Leather? I never leave Derbe without a spare yoke strap. Ox-hide, as thick as my thumb.');
  F.strap=1;toPaul('strap');
  await say(ZE,'I have often said that if my harness gave out in this pass, I should want a tentmaker beside me. I did not think that the tentmaker would be the one wanting leather!');
  await say(P,'A hand\'s length of it is all I need, Zenon. The rest goes back into your harness box.')}
async function tallowGive(){if(F.cased)return say(ZE,'It is in the weave now, where it belongs.');if(F.tallow)return say(ZE,'You have it, brother. Warm it in your hand first.');
  await say(ZE,'Keep the rain out? There is one thing on this wagon that rain has never got into: my axles. I grease them with tallow.');
  F.tallow=1;toPaul('tallow');
  await say(ZE,'Take a lump. Warm it in your hand, and rub it into the cloth. It will not smell like a letter from Jerusalem. But it will be dry.')}
/* mend7: a loop of ox-hide where the corner tore out, and the long seam closed */
async function mend7(){if(F.mended)return say(P,F.up?'It is mended, and it is standing. I will not pick at it.':'It is mended. What it wants now is to be put up.');
  if(!(await bring('strap')))return say(P,'I can close the seam now, and it will open again at the corner in the first gust. The loop first: and a loop wants leather. A carter carries leather.');
  await walk(P,254,118);P.dir=1;P.bow=true;SFX.cut();
  await say(P,'A hand\'s length of the strap, cut and doubled, and sewn through a patch where the corner tore out...');SFX.sew();await wait(600);
  await say(P,'And the long seam: one edge laid over the other and stitched twice along its length, so that the wind has nothing to get its fingers into.');SFX.sew();await wait(600);
  P.bow=false;delItem('strap');F.mended=1;SFX.good();
  await say(BI,'Sewn? Already? Then up with it, friend, before the rain!');
  await say(P,'Up, yes. But in this wind that is work for two: one man on the windward line, and one to set the pole and drive the pins.')}
/* The tent goes up only with a man on its windward line (played as Silas: use the tent), while Paul sets the pole and drives the pins. */
async function hold7(){if(F.up)return say(SI,'It stands, and I can let go at last. My hands will remember that line for a week.');
  if(!F.mended)return say(SI,'Paul will want me on that line once it is sewn. Not before: I should only be holding a rag in a gale.');
  if(holding())return say(SI,'I have it, Paul! Do not ask me how much longer.');
  await walk(SI,LINE[0],LINE[1]);SI.dir=-1;F.line=1;SFX.creak();
  await say(SI,'I have the windward line, and both heels dug in. Set your pole, Paul!')}
async function pitch7(){if(F.up)return say(P,'It stands with its back to the wind, as a tent should. I will not touch it again.');
  if(!F.mended)return mend7();
  if(!holding()){F.line=0;return say(P,'I get the pole upright, and the wind lays the whole tent flat again. It wants a man on the windward line while I set the pole and drive the pins.')}
  await walk(P,254,118);P.dir=1;P.bow=true;SFX.creak();
  await say(P,'Hold her there, Silas! The pole under the ridge... Now the pins, each one driven slanting, away from the pull.');
  for(let i=0;i<3;i++){noise({d:.05,v:.16,f:700,q:2});await wait(260)}
  P.bow=false;await fade(1,500);F.up=1;F.line=0;CH.room=null;ME.room=null;place(BI,'gates',320,122,-1);place(P,'gates',240,124,1);place(SI,'gates',350,121,-1);AU.mood='calm';toPaul('cloth7',1);
  await narr('The first drops fell as the last pin went in. Then the rain came down the gorge like a wall.',{dur:6000});
  await fade(0,600);SFX.good();
  await say(BI,'Dry! All three of us, and the lamp alight. I have slept worse in inns.');
  await say(BI,'You named no price, tentmaker, so I shall name one. A length off my best bale. Make of it whatever a tentmaker makes.');
  await say(P,'I did not do it for a price, Bion. But I will not refuse good cloth from the man who knows it best.');
  await say(SI,quote('ecc4'));
  await say(SI,'Paul. The rain has found our bundle. The wrapping of the letter is wet through.');
  await say(P,'The copies! They are for every congregation on this road, and there are rivers ahead of us. Papyrus and water do not keep company. They want a case.',TH);codeBtn()}
/* The copies of the decrees are for every congregation on the road (Acts 16:4): a case of goat-hair cloth, and tallow to turn the rain. */
async function sewCase(){if(F.sewn)return say(P,'The case is sewn. What it lacks now is something to turn the water.');
  if(!(await bring('cloth7')))return say(P,'A case wants cloth, and I have none to spare.');
  SFX.cut();await say(P,'A strip cut to the length of the roll, folded, and sewn down both sides; and a flap to fold over its mouth...');SFX.sew();await wait(600);
  delItem('cloth7');F.sewn=1;addItem('pcase',1);SFX.good();
  await say(P,'A case. It will keep out dust. But cloth drinks water: to turn a river, it wants something worked into the weave.')}
async function proof(){
  await say(P,'Tallow, worked into the weave with the thumb until the cloth is dark with it. Water will stand on that in beads.');
  delItem('tallow');delItem('pcase');F.cased=1;drawInv();SFX.good();
  await say(P,'And the letter inside it, with every copy. Now let the rivers come.');
  await say(SI,'A letter from Jerusalem, in a case that smells of oxen. I do not think that the apostles will mind.')}
const noCloth=()=>say(P,'It wants a tent to go on. And the tent is over there, flat on the ground.'),isSewn=()=>say(P,'It is sewn already, and sewn twice.');
Object.assign(COMBO,{
  'awl+cloth7':sewCase,'cloth7+thread':sewCase,'cloth7+knife':sewCase,'pcase+tallow':proof,
  'letter+pcase':()=>say(P,'Not yet. Cloth alone drinks water, and the letter would drink it after. First something to turn the rain.'),
  'letter+tallow':()=>say(P,'Tallow on papyrus? Nobody would ever read a word of it again.'),'cloth7+letter':()=>say(P,'Wrapped loosely in cloth, it would be as wet as it is now. It wants a sewn case.'),
  'cloth7+tallow':()=>say(P,'First the sewing. A greased cloth would never take a stitch.'),
  'awl+strap':noCloth,'strap+thread':noCloth,'knife+strap':()=>say(P,'I will cut it when I know the length. And the length is on the tent.'),'awl+pcase':isSewn,'pcase+thread':isSewn});
async function leaveGates(){const me=PC();
  if(!F.up)return say(me,me===P?'And leave a child in the open, with that sky coming down the gorge? Not for every congregation in Galatia. They would not thank me for it.':'With a family standing in the road, and the rain an hour away? Paul would not go, and neither will I.');
  if(!F.cased)return say(me,me===P?'By morning that stream will be over the road, and the letter is wrapped in a wet rag. First a case for it: one that sheds water.':'The letter is wet, and there are rivers ahead of us. Paul wants a case for it before we go one step further.');
  await fade(1,600);await narr('By first light the rain had gone over. The stream was loud, and the road stood clear of it.',{dur:6000});
  await say(BI,'Go well, tentmaker. If you come to Iconium, ask for Bion in the cloth market. I shall be the man with the dry family.');await fade(0,300);return travel()}
ZE.hs={name:'Zenon',actor:ZE,
  look:()=>say(P,F.up?'Zenon, under his wagon with his cloak over his head, as content as a man at his own hearth.':'Zenon of Derbe, the carter. Two winters ago he offered us this road as the short way home. Today he is carrying us up it the other way.'),
  show:{letter:()=>say(ZE,F.cased?'In its case, with my tallow on it. I shall tell them in Derbe that I had a hand in that letter.':'A letter from the apostles? I cannot read, brother. Read it to us in Derbe, on my threshing floor.'),
    strap:'That is the one. Cut what you need.',cloth7:"The merchant's cloth? Good stuff. It would make a fine cover for a wagon, if a man knew a tentmaker.",pcase:'A case for the letter? Dry cloth is thirsty cloth, brother.',
    tallow:'Warm it in your hand first.',awl:'There it is. I knew that I should see that awl at work on this road one day.',tablets:'Say one to me while I see to the oxen.',
    thread:'Strong stuff. I have traces on these oxen that are weaker.',knife:'Mind the ox. He is still nervous of blades.','*':'Stow it on the load, brother. It will ride dry there.'},
  ask:{loop:strapGive,dry:tallowGive},
  talk:()=>talkTree([
    {q:'How far is it to Derbe?',a:async()=>{await say(ZE,'Through the Gates tomorrow, if the stream stays in its bed. After that the road runs out onto the plateau, and it is level going to Derbe.');
      await say(ZE,'The brothers there meet on my threshing floor still. There are more of them than when you left.')}},
    {q:'You offered us this road once.',once:1,a:async()=>{await say(ZE,'And you would not take it. You went back to Lystra instead, to the people who had stoned you. I have told that story on every threshing floor between Derbe and Tarsus.');
      await say(P,'It runs both ways, Zenon. Today I am glad of it.')}},
    {q:'What do you know of these Gates?',once:1,a:()=>say(ZE,"That there is no better way through for wheels. A narrow gorge, and the road cut out of the rock: in places a wagon has a hand's breadth to spare. I have driven it more times than I have fingers and toes.")},
    {q:'See to your oxen, brother.',bye:1}]),
  as:{silas:{look:'Zenon, a carter and a disciple. He has not stopped telling me about Paul since Tarsus.',
    talk:()=>say(ZE,F.up?'You held that line like a man who has pulled oxen out of a ditch, brother. Are you sure that you come from a city?':'So you are the brother from Jerusalem. I have never seen Jerusalem. I have seen what came out of it, on my own threshing floor.'),
    show:{sstaff:'A good stick. You will want it in the Gates tomorrow.',letter:'Read it to us in Derbe, brother. On my threshing floor.','*':'Stow it on the load. It will ride dry there.'}}}};
BI.hs={name:'Bion',actor:BI,
  look:()=>say(P,F.up?'Bion, at the mouth of his tent, looking at the rain as if he had beaten it in a bargain.':'Bion, a cloth merchant of Tarsus, on his way to the cities of the plateau. He sells the cloth that tents are made of, and he cannot keep his own tent standing.'),
  show:{letter:'A letter? I carry forty of my own, friend, and every one of them is a bill.',cloth7:'It is yours, and I do not want it back.',pcase:'You made that out of my cloth, in the time it takes me to count a bale? I am in the wrong trade.',
    awl:'So that is how it is done. I have sold this cloth for twenty years, and never once watched it sewn.',strap:'Ox-hide. That will hold where the cloth did not.',
    tablets:'Accounts? No: I see that it is not accounts.','*':'Keep it out of the wet, friend.'},
  ask:{loop:'Leather? I deal in cloth, friend. Ask the carter: his oxen are wearing half a tannery.',dry:'Keep papyrus dry on this road? I wrap my accounts in oiled cloth, and I have none left. Grease of some kind is what you want.'},
  talk:async()=>{if(F.up)return talkTree([
      {q:'Is the child warm?',a:()=>say(BI,"Asleep, with her mother's cloak over her. She says that the rain on the tent sounds like a drum.")},
      {q:'You are wondering why we did it.',once:1,a:async()=>{await say(BI,'I am. You owed me nothing, and you asked for nothing. In my trade, that is a man with something to sell.');
        await say(P,'Nothing to sell, Bion. I serve a God who has shown me undeserved kindness. And I have a letter in my bag, written to people of the nations who have come to know him. Ask me about it when the rain stops.');
        await say(BI,'I may do that. It is a long night, and I am not sleepy.')}},
      {q:'Sleep dry, Bion.',bye:1}]);
    if(!G.metBion){G.metBion=1;
      await say(BI,'You are with the carter? Then you have a wagon to crawl under. I have a wife, a daughter, forty bales of the best goat-hair cloth in Cilicia, and a tent with a hole in it.');
      await say(BI,'The seam went in the first gust, and the corner loop tore out after it. I sell the cloth, friend. I never learned to sew it.');
      await say(P,'I did. Paul, of Tarsus: a tentmaker. Let me see what can be done.');
      await say(BI,'A tentmaker! Here, of all places? Then name your price, and name it quickly.');
      await say(P,'We can talk of prices when your daughter is under a roof.')}
    return talkTree([
      {q:'Where are you bound?',a:()=>say(BI,'Iconium, and the cities beyond it. Every caravan on the plateau sleeps under black cloth, and a good deal of that cloth goes up this road in my bales.')},
      {q:'How did it come down?',a:()=>say(BI,'I pitched it broadside to the wind, like a fool. And it is an old tent: I keep the new cloth for my customers.')},
      {q:'Keep your family close to the bales.',bye:1}])},
  as:{silas:{look:()=>say(SI,F.up?'The merchant. An hour ago he was shouting at the wind. Now he is thanking a tentmaker.':'A merchant, shouting at the wind. The wind is not listening.'),
    talk:()=>say(BI,F.up?'You held that line, friend, and I saw what it cost you. I shall not forget either of you.':'And you, friend? Are you a tentmaker too? No? Then stand by the one who is: he will want you.'),
    show:{sstaff:'A walking staff will not hold up my tent, friend. I wish that it would.','*':'Keep it out of the wet, friend.'}}}};
CH.hs={name:'Charis',actor:CH,
  look:"Charis, the merchant's wife. She has her back to the wind, and half of her cloak round the child.",
  show:{awl:'Is that for the tent? Then use it, sir, and do not show it to me.','*':'Not now, sir. I have my hands full.'},
  talk:()=>say(CH,F.mended?'It is sewn! Now, if only it will stand.':'I told him that it was an old tent. Can it truly be mended here, in the road, with the night coming?'),
  as:{silas:{look:'The merchant\'s wife. She has not once complained, and she has the most to complain of.',talk:()=>say(CH,'Is your friend truly a tentmaker? I had begun to think that nothing would go right today.'),show:{'*':'Not now, sir. I have my hands full.'}}}};
ME.hs={name:'Melissa',actor:ME,
  look:"A little girl, wrapped in half of her mother's cloak. She is watching the oxen, not the storm.",
  show:{awl:'Is it sharp?',tablets:'Are there pictures in it?','*':'Is that for our tent?'},
  talk:async()=>{await say(ME,'Does the big ox bite?');await say(P,'He does not. He is too busy thinking about his supper.')},
  as:{silas:{look:'The merchant\'s daughter. She is the only one here who is enjoying the wind.',talk:async()=>{await say(ME,'Are you cold too?');await say(SI,'A little. Not for much longer, I think.')},show:{'*':'Is that for our tent?'}}}};
ROOMS.gates={space:0.8,walk:[16,388,112,138],get mood(){return F.up?'calm':'storm'},amb:()=>F.up?{fountain:.9,leaves:.9,wind:.5}:{wind:1,leaves:.5,fountain:.25,creak:.3},enter:gatesIntro,hs:[
  {name:'rock wall',x:0,y:0,w:338,h:82,wx:180,look:'Limestone, as high as I can see. The marks of the picks are still on it where the road was cut.'},
  {name:'Cilician Gates',x:342,y:8,w:54,h:58,wx:360,wy:113,dir:1,exit:leaveGates,look:['The Cilician Gates. The gorge is so narrow here that the stream and the road could not both have room: so the road was cut out of the rock.','Every wagon between Tarsus and the plateau goes through that gap. So does every wind. Beyond it the road comes out onto the plateau, and runs to Derbe.']},
  {name:'stream',x:398,y:100,w:82,h:44,wx:384,wy:127,dir:1,look:'Snow water, coming down fast. If this rain lasts, it will be over the road by morning.',use:'I fill my hands and drink. It is cold enough to hurt the teeth.',pickup:'A stream stays in its bed. I hope.'},
  {name:'wagon',x:18,y:84,w:76,h:28,wx:58,wy:120,dir:-1,look:"Zenon's wagon, loaded for Derbe with what Tarsus sells. There is room under it for three men, if none of them turns over.",pickup:"It is Zenon's, and it is loaded.",use:'Not while that family is standing in the wind.'},
  {name:'oxen',x:96,y:79,w:52,h:35,wx:130,wy:123,dir:-1,look:"Zenon's brown oxen. They have put their heads down to the wind and shut their eyes. They have seen weather before.",pickup:"They are Zenon's."},
  {name:'bales',x:344,y:92,w:40,h:21,wx:352,wy:119,dir:1,look:'Bales of goat-hair cloth: cilicium, the black cloth of my own country. I have cut more of it than I could ever count.',pickup:"They are the merchant's whole fortune."},
  {get name(){return F.up?'tent':F.mended?'mended tent':'torn tent'},x:262,y:84,w:64,h:29,wx:254,wy:118,dir:1,def:'use',
    look:async()=>{if(F.up){await say(P,'A low black tent with its back to the wind, a lamp alight inside it, and the rain running off it. I have made finer ones. I have seldom been so glad of one.');
        await say(P,quote('isa32'));return say(P,'Isaiah wrote that of men who take the lead, not of goat-hair cloth. Tonight I see the picture more clearly.')}
      return say(P,F.mended?'Mended, and laid out ready, with its pole and its pins beside it. Now it must go up: and the wind has other ideas.'
      :'A good tent once: goat-hair cloth, such as I cut my first seams on. The long seam has opened for an arm\'s length, and one corner loop has torn clean out of the cloth.')},
    pickup:"It is Bion's house, such as it is.",use:pitch7,
    useWith:async it=>{if(it==='strap'||it==='awl'||it==='thread')return F.mended?pitch7():mend7();if(it==='knife')return say(P,'The cloth is sound. It was the seam that failed, and the loop.');
      if(it==='cloth7')return say(P,'His tent needs no new cloth. It needed a seam, and it has one.');return false}},
  {name:'road to Tarsus',x:0,y:114,w:14,h:24,wx:20,wy:128,dir:-1,look:'The road back down to Tarsus, two days behind us.',exit:()=>say(PC(),PC()===P?'We did not climb for two days in order to walk down again.':'Back down? Our road goes up, and through.')}]};
/* ============ LYSTRA AND ICONIUM: what the brothers say of Timothy ============ */
/* The brothers in Lystra and Iconium spoke well of Timothy (Acts 16:2). Before Paul asks Timothy to come, he hears it for himself:
   from the older men, from the household that raised him, and from the brothers a day's walk away. What he asks each of them matters.
   A question about what appears to the eyes gets a short answer; a question about what Timothy does gets a true one (1 Samuel 16:7). */
async function lysIntro(){if(F.readL||G.metLys)return;G.metLys=1;
  await say(LO,'I said that this door would be open. Come in, Paul. And you, brother: a friend of his has a place at this hearth.');
  await say(TI,'Paul! You came again. I have counted the new moons since you left.');
  await say(P,'Timothy? When I left, you were a boy with a water jar. Now I must look you in the eye.');
  await say(EN,'And Barnabas? Is he behind you on the road?');
  await say(P,'No, Eunice. Barnabas has sailed for Cyprus, with John Mark. He and I did not agree about this journey. Anger flared up between us, sharply, and we parted.');
  await say(P,'I will not dress it up for you. He is my brother still, and he is about the same work.');
  await say(P,'This is Silas, of Jerusalem. We carry a letter from the apostles and the elders, for every congregation on this road.');
  await say(MY,'Then Lystra shall hear it this evening. Peace to you both. I am Myron: one of the older men whom you and Barnabas appointed in this room, with prayer and fasting.')}
/* The decrees are delivered to each congregation (Acts 16:4). */
async function deliverL(it){if(it!=='letter')return false;const me=PC();
  if(F.readL)return say(MY,'It has been read and copied, and the copy is in my keeping. Take the letter on, brother: Iconium is waiting for it.');
  await say(me,me===P?'The letter, Myron: the decision of the apostles and the elders in Jerusalem. It is for Lystra to hear, and to keep.':'The letter, brother. I was sent out from Jerusalem with it, and it is addressed to brothers like these.');
  playAs(P);await fade(1,500);
  await narr('That evening the congregation of Lystra heard the letter read, and the older men received the decrees, to be observed.',{dur:7500});
  F.readL=1;await fade(0,500);SFX.good();
  await say(MY,'No burden but the necessary things. There are brothers in this town who will sleep better tonight for that.');
  await say(MY,'Timothy will copy it before the lamp burns down: he writes a clear hand, and his mother saw to that. At first light he will carry the copy up to the brothers in the hill villages.');
  await say(MY,'Nobody will have asked him to. He will simply be gone when we wake.');
  await say(P,'Two years ago he asked me whether I would come again. I did not think then that I should be the one with the questions.',TH)}
async function askMyron(){
  if(!F.readL)return say(MY,'First the letter, brother. Lystra has waited a long time for a word from Jerusalem.');
  if(F.eld)return say(MY,heard()?'You have asked in two cities, Paul. If you mean to ask the young man himself, the older men of Lystra will stand with you.':'I have told you what I see. Ask in Iconium too: he is as well known there as here.');
  await say(P,'Myron. Tell me about Timothy.');
  await ask(P,MY,'You have been watching him, and I have been watching you do it. Ask, then. What is it that you need to know?',[
    {q:'Does he speak well before the congregation?',r:['Well enough. He goes red, he says what is written, and he sits down. If it is an orator you want, there are better in Iconium.',[P,'A fair answer to a poor question. I asked about his tongue. I should have asked about his hands.',TH]]},
    {q:'Is he strong enough for the road?',r:['He is no ox, Paul. Neither are you, and you have been over the Taurus and back.',[P,'True. I am judging by what my eyes show me, and I know who does not judge so.',TH]]},
    {q:'What do you give him to do, and how does he do it?',ok:1,
      r:['Everything that needs feet, or a clear hand, or patience. He reads to the brothers who cannot read. He carries what we can spare to the widows in the hill villages, and he goes again the next week without being sent.',
        'I have never had to ask him for a thing twice. And I have never once heard him say how much he had done.',
        'But do not take it from Lystra alone. Ask in Iconium: he is as well known there as here.']}]);
  F.eld=1;SFX.good();
  await say(P,'What he is given, he does, and he does not count it. That is one witness.',TH)}
async function askFamily(){
  if(F.fam)return say(EN,heard()?'You have asked everyone but him, Paul. I think that I know what comes next. Ask him. I shall not stand in the way.':'I have said what I know. A mother should not be the only witness: ask the brothers.');
  await say(P,'Eunice. The older men see Timothy in the congregation. You and Lois see the rest.');
  await ask(P,EN,'I am his mother, Paul: I shall speak well of him whatever you ask. So ask me something that I cannot dress up.',[
    {q:'Was he a quick pupil?',r:['He had the Psalms by heart before he could carry a jar. Many a quick boy has learned them, and kept none of them. That is not what you want to know.']},
    {q:'Could he bear to leave this house?',r:['Do not ask me that yet. Ask me first whether he is fit to.']},
    {q:'What is he at home, when the brothers are not looking?',ok:1,
      r:['The same. That is the whole of it, Paul.','His father does not believe. Timothy honors him, and works beside him, and has never once hidden from him what he is. He has not one face for this room and another for the pasture.',
        [LO,'I taught my daughter, and she taught him. But the faith in that boy is his own now. Nobody is holding it up for him.']]}]);
  F.fam=1;SFX.good();
  await say(P,'A faith without hypocrisy: in the grandmother, in the mother, and now in him. That is a second witness.',TH)}
/* A hasty choice is unwise, not untrue: Paul wants him at once, and sets the wish aside until the brothers have been heard. */
async function talkTim(){
  if(heard()&&F.readL)return invite7();
  if(!G.asked){G.asked=1;
    await say(TI,'Is there something I can fetch for you, Paul? Water? The older men say that I am to see that you want for nothing.');
    await think('He would come if I asked him. I can see it in his face. Do I ask him now?',[
      {q:'Come with us, Timothy, and come now.',no:'It is what I want, and it is too soon. I have been in Lystra two days. Those who have watched him for two years have not been asked.'},
      {q:'You are young for such a road, Timothy.',no:'Is he? I have not asked one person who knows him. That would be judging by what the eyes show.'},
      {q:'Say nothing yet. First hear what the brothers say of him.',ok:1}]);
    await say(P,'Nothing, Timothy. But before I leave Lystra I shall want a word with you. Not yet.');
    return say(TI,'Whenever you say. I shall be wherever the water jars are.')}
  return talkTree([
    {q:'What have you been doing, these two years?',a:()=>say(TI,'Whatever the older men give me, Paul. It is not much. I carry things, mostly.')},
    {q:'Do you remember the night of the stones?',once:1,a:async()=>{await say(TI,'You sat by that lamp with blood in your hair, and mended two garments. I have thought of it every time I did not want to get up in the morning.');
      await say(P,'Then it was a better night\'s work than I knew.')}},
    {q:'Later, Timothy.',bye:1}])}
/* An optional kindness: a psalm read to Lois, whose eyes are past reading. */
async function psalm(it){if(it!=='tablets')return false;if(F.psalm)return say(LO,'I have it still, word for word. Read it to the boy on the road some evening.');
  await say(LO,'My eyes are past reading, child. Say one to me, and I will tell you whether you have it right.');
  await say(P,quote('ps71'));F.psalm=1;SFX.good();
  await say(LO,'You have it right. And the next generation is standing over there by the water jars, Paul. I have told him everything I know.')}
async function door7(){const me=PC();
  if(!F.readL)return say(me,me===P?'We have only just come in, and the letter is still in my bag. Lystra hears it first.':'Not before Lystra has heard the letter. That is what we were sent with.');
  if(heard())return say(me,me===P?'Not yet. There is a question I must put to a young man first, in front of his mother, his grandmother and the older men.':'Paul has something to ask in this house before we go. I can see it in his face.');
  if(F.nat&&F.tat)return say(me,me===P?'Iconium has had its letter, and I have had its answer. What is left to hear is in this house.':'We have been to Iconium. Whatever Paul still wants to know, he will find it in this room.');
  return travel()}
TI.hs={name:'Timothy',actor:TI,
  look:async()=>{if(heard()){await say(P,'Timothy. Four witnesses in two cities, and he has no idea that anyone has been asked.');return say(P,quote('prov22'))}
    return say(P,F.readL?'Timothy. He has not sat down since we came: wood, water, the lamp, the copy. Nobody tells him. He sees it, and it is done.'
    :'Timothy, the son of Eunice. A man\'s height now, and still listening with his whole face.')},
  show:{tablets:'I can say every passage that was on them two years ago, Paul. Are there new ones?',letter:()=>say(TI,F.readL?'I have copied it, word for word, and checked the copy twice against the letter.':'From Jerusalem? From the apostles themselves? May I hear it with the others?'),
    awl:'The awl! You mended two garments with it by that lamp. I watched every stitch.',thread:'My grandmother still spins. She says that hers was never so even.',knife:'Shaped like the new moon. I remember.','*':'Shall I carry that for you, Paul?'},
  ask:{tim:()=>say(TI,'Of me? ...I could not tell you, Paul. Ask them. I should only get it wrong.')},
  talk:talkTim,
  as:{silas:{look:'So this is Timothy. Paul spoke of a boy. I see a young man who has not sat down once since we came in.',
    talk:()=>say(TI,heard()?'Paul keeps looking at me, brother, and then he looks away. Have I done something wrong?':'Is it true that you were in the room, brother, when the apostles and the elders decided it? What was it like?'),
    show:{sstaff:'Shall I set it by the door for you, brother?',letter:'I copied it last night. I hope that my hand is fit for it.','*':'Shall I carry that for you, brother?'}}}};
EN.hs={name:'Eunice',actor:EN,
  look:()=>say(P,F.fam?'Eunice. She answered me without one word too many. Her faith is what it was by lamplight, two years ago.':'Eunice. These two years have cost her something, and she has remained.'),
  show:{tablets:'Written out. I still carry mine in my head, and now my son carries them in his.',letter:()=>say(EN,F.readL?'I heard it read. No burden but the necessary things. I should like my husband to have heard it.':'A letter from Jerusalem? Give it to Myron, Paul: it is for the congregation.'),
    thread:'You had thread in your hand the last time you stood in this room. And blood in your hair.','*':'Put it by, Paul. You are at home here.'},
  ask:{tim:()=>F.readL?askFamily():say(EN,'Ask me when the letter has been read, Paul. Tonight belongs to that.')},
  talk:async()=>{if(!F.readL)return talkTree([
      {q:'How has it been for you, these two years?',a:async()=>{await say(EN,'As you said that it would be. Not easier. But we have older men of our own now, and we have not been alone in it.');await say(EN,'Through many tribulations. I have not forgotten who said it, or where he had been that day.')}},
      {q:'And your husband?',once:1,a:()=>say(EN,'He is with the flocks. He does not believe, Paul, and he does not hinder us. He shakes his head a little less than he did.')},
      {q:'Peace to this house, Eunice.',bye:1}]);
    return askFamily()},
  as:{silas:{look:'Eunice, the mother. Paul told me on the road that her faith was without hypocrisy. He does not use that word lightly.',
    talk:()=>say(EN,'Peace to you, brother. So you are the one who was sent out with the letter. Sit by the fire: you have come a long way to bring it.'),show:{'*':'Put it by, brother. You are a guest here.'}}}};
LO.hs={name:'Lois',actor:LO,
  look:()=>say(P,F.psalm?'Lois. She is saying the psalm over to herself, with her eyes shut.':'Lois. Older by two winters, and her eyes are dimmer. Nothing else about her has given way.'),
  give:psalm,
  show:{letter:'Read it to the congregation, child, not to an old woman by the fire. I shall hear it with the rest.',thread:'I spun for this household for fifty years. That is good thread.','*':'Keep your things about you. And sit down: you make the room look small.'},
  ask:{tim:()=>F.readL?askFamily():say(LO,'Ask my daughter, when the letter has been read. She carries the most of what there is to tell.')},
  talk:()=>F.fam?say(LO,'I taught my daughter the holy writings, and she taught her son. Now I see what it was all for.'):F.readL?askFamily():say(LO,'I said that this door would be open, and it has been. Now give Myron that letter of yours, and let an old woman hear what Jerusalem has to say.'),
  as:{silas:{look:'Lois, the grandmother. What that young man knows of the Scriptures began with her.',give:async()=>false,
    talk:()=>say(LO,'Sit down, child. You are from Jerusalem? I was born a long way from it, and I have never seen it. Tell me how the brothers are there.'),show:{'*':'Keep your things about you.'}}}};
MY.hs={name:'Myron',actor:MY,
  look:()=>say(P,F.eld?'Myron. He speaks of Timothy as a craftsman speaks of a tool that has never once failed him.':'Myron, one of the older men of Lystra. We appointed him in this room, with prayer and fasting. (Acts 14:23)'),
  give:deliverL,
  show:{tablets:'I cannot read them, Paul. Timothy reads to me, and I remember.',awl:'A plain tool. The best ones are.','*':'Keep it by you, brother.'},
  ask:{tim:askMyron},
  talk:askMyron,
  as:{silas:{look:'Myron, one of the older men of this congregation. He has helped to keep the flock together for two years, with stones not far behind him.',give:deliverL,
    talk:()=>say(MY,F.readL?'A good letter, brother, and well carried. Lystra thanks Jerusalem for it.':'Peace, brother. You carry something for us, I think. I am one of the older men here: put it into my hand.'),show:{'*':'Keep it by you, brother.'}}}};
ROOMS.lystra7={space:1.25,walk:[16,304,110,136],mood:'calm',amb:{fire:.5,birds:.25,wind:.2},enter:lysIntro,hs:[
  {name:'window',x:48,y:24,w:24,h:26,wx:64,look:'The lane, in winter daylight. Two years ago I was dragged down it by the heels. Today a child waved at me from a doorway.'},
  {name:'lamp',x:140,y:42,w:20,h:24,wx:150,look:'The lamp in its niche. I mended two garments by it once, and a boy watched every stitch.',pickup:'It gives light to the whole house where it stands.'},
  {name:'shelf',x:172,y:48,w:60,h:18,wx:200,look:'Oil, meal and olives. It is a careful household still, and still not a rich one.',pickup:'It is their winter store.'},
  {name:'hearth',x:76,y:88,w:34,h:18,wx:112,wy:114,dir:-1,look:'A fire of thorn wood. Timothy laid it before anyone else was awake.',use:'I warm my hands. After the Gates, I shall never again take a dry fire for granted.'},
  {name:'bench',x:6,y:78,w:62,h:26,wx:60,wy:114,dir:-1,look:'The bench, and the blanket folded on it. They have given us the best place in the house a second time.',use:'Not yet. There are things to ask first.'},
  {name:'water jars',x:222,y:84,w:36,h:24,wx:228,wy:114,dir:1,look:'The great jar by the door, and the two that go to the well. All three are full. I do not need to ask who filled them.',pickup:'They are full, and it was not I who filled them.'},
  {name:'table',x:168,y:104,w:44,h:20,wx:160,wy:124,dir:1,look:'A low table, and one bowl. The whole congregation will eat at it tonight, in turns.',pickup:'It is their supper.'},
  {name:'door to the lane',x:269,y:51,w:28,h:53,wx:272,wy:113,dir:1,look:'The door to the lane. Lois said that it would be open, and it was.',exit:door7}]};
/* ---------- Iconium: the decrees delivered, and two more witnesses ---------- */
async function icoIntro(){if(F.readI||G.metIco)return;G.metIco=1;
  await say(NA,'Paul! Alive, and in my street again! Come under the awning, both of you.');
  await say(P,'Peace, Nathan. This is Silas, of Jerusalem. We bring the decision of the apostles and the elders, for Iconium as for every city.');
  await say(NA,'From Jerusalem? Then the brothers must hear it. But first sit down. You have walked from Lystra, and it shows.')}
async function deliverI(it){if(it!=='letter')return false;const me=PC();
  if(F.readI)return say(NA,'It is read, and it is copied. Carry it on, brother: there are cities beyond us.');
  await say(me,me===P?'The letter, Nathan. It is written to the brothers of the nations, and those of Israel should hear every word of it.':'The letter from Jerusalem, brother. I was sent out with it.');
  playAs(P);await fade(1,500);
  await narr('So the congregation in Iconium heard the letter too, and received the decrees.',{dur:6000});
  F.readI=1;await fade(0,500);SFX.good();
  await say(NA,'When this city took sides, there were some who told our Greek brothers that they were only half inside the door. That is finished with tonight.');
  await say(P,'That is the letter delivered. Now for the other thing that I walked here to learn.',TH)}
async function askNathan(){
  if(!F.readI)return say(NA,'First tell me what you carry, Paul. A man does not walk here from Lystra in winter with empty hands.');
  if(F.nat)return say(NA,'Take him with you, Paul. That is what you are thinking, and it is what I should do. But the older men of Lystra must say it too: he is theirs to give.');
  await say(P,'Nathan. In Lystra they tell me that Iconium knows Timothy, the son of Eunice.');
  await ask(P,NA,'Timothy of Lystra? Half of Iconium could tell you about him. What do you want to know?',[
    {q:'Does he look like a man the synagogues will hear?',r:['He looks like what he is: a young man with a Greek for a father. Looks! I make saddles, Paul. I know what a fine finish is worth on poor leather.']},
    {q:'Has he a good head for the Scriptures?',r:['A very good one. So had some of the men who came looking for you with stones. A head is not what you are asking about.']},
    {q:'How does Iconium come to know a young man from Lystra?',ok:1,
      r:['Because he walked here. When this city took sides, some of our brothers lost their work for it. Lystra is poorer than we are, and Lystra sent what it had: meal, oil, a little money.',
        "It was Timothy who carried it: a day's walk, with a sack on his back. And when the sack was empty he stayed two days, and cut wood for the widows, before he walked home.",
        'He has done it every few weeks since. Nobody here is of his own congregation, Paul. He does it all the same.']}]);
  F.nat=1;SFX.good();
  await say(P,'He spends himself for brothers who are not even of his own congregation. That is a third witness.',TH)}
async function askTatia(){
  if(F.tat)return say(TA,'If you take him with you, Paul, this fountain will miss him. And I shall be glad all the same.');
  await say(TA,'Paul! They said at the fountain that you were in the saddlers\' street, and I did not believe them.');
  await say(P,'Peace, Tatia. I am asking in Iconium about Timothy, the son of Eunice. You have seen him come and go.');
  await ask(P,TA,'The young man from Lystra? I can tell you what I have seen. Ask.',[
    {q:'Is he bold?',r:['Bold? No. He goes red when the older men ask him to read. Your friend Barnabas was never loud either, and I have not forgotten one word that he said to me.']},
    {q:'Does he come of a good family?',r:['His father is a Greek who keeps sheep, and does not believe. If family were the measure, Paul, where should I be, with my husband?']},
    {q:'What does he do, when he comes to Iconium?',ok:1,
      r:['He asks after people. By name: after me, after my sons, even after my husband.',
        'Xanthos shouted at him across the yard once, to keep away from his wife and his wagons. The next month Timothy greeted him as if nothing had been said, and asked how the wagon cover had stood the winter.',
        'He is not pretending, Paul. I have watched for it. He truly cares what becomes of us.']}]);
  F.tat=1;SFX.good();
  await say(P,'He genuinely cares for them: even for the one who shouted at him. That is a fourth witness, and the Law asks for two.',TH)}
async function leaveIco(){const me=PC();
  if(!F.readI)return say(me,me===P?'We walked a day to bring Iconium a letter, and it is still in my bag.':'Not before Iconium has its letter.');
  if(!(F.nat&&F.tat))return say(me,me===P?'Not yet. The older men of Lystra told me to ask in Iconium about Timothy, and I have not finished asking.':'Paul is still asking about the young man. I have learned to wait while he does that.');
  await say(me,me===P?'Back to Lystra, Silas. I have heard what I came to hear, and what is left to say must be said there.':'Back to Lystra, then. I think that I know what you are going to ask him, Paul.');return travel()}
NA.hs={name:'Nathan',actor:NA,
  look:()=>say(P,F.nat?'Nathan. He told it plainly, as he tells everything, and then went back to his stitching.':'Nathan the saddler. He brought us word of the stones once, and risked his own skin to do it. He is one of the older men of Iconium now.'),
  give:deliverI,
  show:{tablets:'You read to me from those the first Sabbath. I have them by heart now, and a good deal more.',awl:'That awl again! There is a wagon cover across the street that it sewed. It has not let in one drop.',
    knife:'A half-moon knife. We are still nearly of one trade, you and I.',thread:'Good thread. Mine is still thicker: I still sew for mules.','*':'Keep it by you, brother.'},
  ask:{tim:askNathan},
  talk:askNathan,
  as:{silas:{look:'A saddler, and an older man of this congregation. Paul says that he would trust him with his life, and has.',give:deliverI,
    talk:()=>say(NA,F.readI?'I have heard a great many letters read in the synagogue, brother. None that I was so glad to hear.':'Peace, brother. From Jerusalem? Then you have walked further than any saddle I ever made.'),show:{sstaff:'Olive wood? If you ever want a strap on it, come to me.','*':'Keep it by you, brother.'}}}};
TA.hs={name:'Tatia',actor:TA,
  look:()=>say(P,F.tat?'Tatia. She has watched that young man as closely as she once watched Barnabas, and for the same reason: to see whether it was real.':'Tatia, the wife of Xanthos, at the fountain with her jar. She has kept the faith for two years in a house that forbids its name.'),
  show:{tablets:'I still cannot read your letters, Paul. I still remember every word.',letter:()=>say(TA,F.readI?'Written to us of the nations, by name. I shall carry that home under my tongue.':'A letter? Then give it to Nathan, and let all of us hear it.'),'*':'Put it away, Paul. People still watch the two of us.'},
  ask:{tim:askTatia},
  talk:()=>F.readI?askTatia():say(TA,'Paul! In Iconium again, and in daylight! Go to Nathan first: he has been saying for a month that you would come.'),
  as:{silas:{look:'A sister at the fountain, with a jar she is in no hurry to fill.',
    talk:()=>say(TA,'You are the brother from Jerusalem? Then tell them there that the door is open in Iconium too. Even in the house of a carrier.'),show:{'*':'Keep it, brother.'}}}};
ROOMS.iconium7={space:0.9,walk:[16,464,110,138],mood:'hope',amb:{fountain:.7,birds:.2,hammer:.3,wind:.3,crowd:.2},enter:icoIntro,hs:[
  {name:'mountains',x:188,y:26,w:110,h:24,wx:244,look:'The mountains round the plain, white almost to their feet. Winter comes early up here.'},
  {name:'street to the synagogue',x:0,y:36,w:60,h:68,wx:42,wy:113,dir:-1,look:'The street to the synagogue of the Jews. I have not walked up it since the day we fled.',use:'Not today. I have a letter for the congregation, and a question for the brothers.',open:'Not today. I have a letter for the congregation, and a question for the brothers.'},
  {name:'saddlery',x:84,y:56,w:84,h:30,wx:126,wy:113,look:"Nathan's shop: pack saddles, collars, girths and bridles. The congregation of Iconium meets behind it.",pickup:"They are Nathan's living."},
  {name:"saddler's bench",x:102,y:82,w:52,h:23,wx:128,wy:113,look:"Nathan's bench, with a pack saddle half made on it. I sat at this corner of it for a month.",use:'It is his work, and he is in the middle of it.'},
  {name:'fountain',x:220,y:64,w:50,h:44,wx:246,wy:114,look:'The fountain at the crossroads. Barnabas answered a hard question here once, and answered it well.',use:'I drink. As cold, and as sweet, as I remembered.',pickup:'A fountain stays where it is.'},
  {name:'poplars',x:190,y:40,w:24,h:50,wx:204,look:'The poplars are bare. When we fled this city they were in full leaf.'},
  {name:'poplars',x:276,y:38,w:22,h:52,wx:286,look:'The poplars are bare. When we fled this city they were in full leaf.'},
  {name:"Xanthos's wagon",x:308,y:72,w:74,h:38,wx:344,wy:114,look:'The wagon of Xanthos the carrier, under its cover: goat-hair cloth, and a leather eyelet at each corner. Two winters, and every seam of it is sound.',pickup:'Take a wagon?',use:'The cover is his, and so is the wagon.'},
  {name:'gateway of the yard',x:375,y:53,w:52,h:51,wx:400,wy:113,look:"The yard of Xanthos the carrier. He is still for the rulers, I hear. But his wagon is still wearing my cover.",use:'I have no business in his yard.',open:'I have no business in his yard.'},
  {name:'south gate',x:444,y:54,w:32,h:50,wx:458,wy:113,dir:1,look:'The south gate, and the road back to Lystra: a day on foot.',exit:leaveIco}]};
/* ============ SILAS AND PAUL, AS EACH SEES THE OTHER ============ */
/* Silas when he is the one being played: his answers where the level wrote nothing for him, and the crafts he leaves to the tentmaker */
const SIL7={noCraft:"That is the tentmaker's trade, not mine. I should only spoil it.",
  def:{look:'I see nothing there that needs me.',pickup:h=>h.actor?'I would not dream of it.':'It is not mine to take.',
    use:"That is the tentmaker's trade, not mine.",open:'It does not open.',talk:'I would get no answer.',give:'First I should choose something to give.'}};
const SILAS7={name:'Silas',actor:SI,
  look:()=>say(P,inTar()?(F.read?'Silas. He read that letter as if every word of it had been written to the man in front of him.':F.silas?'Silas. He has said what he was sent to say, and now he waits, without fidgeting.':'Silas. He has not said one word since Reuben began. He was sent out with this letter: and he lets me carry it.')
    :inGates()?(F.up?'Silas, wet to the skin, and laughing at it.':'Silas. He is no tentmaker. But he has two hands, and he has seen where they are wanted.')
    :inLys()?'Silas. He watches Timothy fetch and carry. Then he looks at me, and says nothing.':'Silas. He has learned more names in Iconium in an hour than I did in a week.'),
  show:{letter:()=>say(SI,inTar()&&!F.read?'I know it by heart, Paul. It is not I who needs to hear it.':'Keep it by you. Or give it to me to carry: it came out of Jerusalem in my bag.'),
    awl:'Your awl. I have stopped being surprised by what it is asked to do.',thread:'Thread. I can at least hold the end of it.',knife:'Put it to work, brother. I will hold whatever needs holding.',
    tablets:'Read me one when we stop for the night. You choose them better than I do.',strap:'Leather, for the corner? Then the tent is as good as mended. Tell me where you want me.',
    cloth7:"The merchant's thanks. What will you make of it?",pcase:'A case for the letter. It looks thirsty, Paul.',tallow:"The carter's tallow. Not on the papyrus, I hope.",'*':'Keep it, brother. You will find a use for it.'},
  ask:{witness:['He asks for a second witness, Paul. He is right: you were one side of that dispute.','And you have one standing beside you. I was not sent all this way to carry your bundle.'],
    loop:'Leather? I have my sandals, and I need them. Ask the carter.',dry:'Not with anything that I carry. Ask a man who lives on this road, and drives it in every weather.',
    tim:'I have known him for a day, Paul, and I have not once seen him sit down. But a day is not what you are asking about.'},
  talk:()=>inTar()?talkTree([
      {q:'What do you make of Reuben?',a:()=>say(SI,F.silas?'An honest man, who asked an honest question. I wish that all doubts were so easily answered.':'That he is not your enemy. He was misled once, by men who sounded sure. Now he wants more than one man who sounds sure.')},
      {q:'What is still to do here?',a:()=>say(SI,F.read?'Nothing. Tarsus is of one mind again.':F.silas?'The letter, Paul. To all of them: it was to all of them that the trouble came.':'I was sent to report by word of mouth. So far I have not been asked to open my mouth.')},
      {q:'Be ready, brother.',bye:1}])
    :inGates()?talkTree([
      {q:'Have you ever pitched a tent, Silas?',once:1,a:async()=>{await say(SI,'Never in my life. But I can hold a rope, and I can do as I am told. Is that enough?');await say(P,'It is exactly enough.')}},
      {q:'What is still to do here?',a:()=>say(SI,!F.mended?'The tent, Paul. You sew, and I shall keep out of your light.':!F.up?'It must go up. Put me on the windward line, and tell me when to pull.':!F.cased?'The letter. One more night like this one, and Derbe gets a lump of wet papyrus.':'Nothing but to sleep, if the rain will let us.')},
      {q:'Stay close.',bye:1}])
    :inLys()?talkTree([
      {q:'What do you see in this house?',a:()=>say(SI,'A grandmother, a mother and a son, and one faith in the three of them. I have seen larger congregations with less.')},
      {q:'What is still to do here?',a:()=>say(SI,!F.readL?'The letter. Put it into the hand of the older man.':heard()?'You know very well. Ask him, Paul.':'You are weighing that young man. Weigh him well: ask those who know him.')},
      {q:'Sit by the fire, brother.',bye:1}])
    :talkTree([
      {q:'What do you make of Iconium?',a:()=>say(SI,'That it gathered stones for you once, and that there is a congregation in it all the same. I shall remember that when a city looks hopeless.')},
      {q:'Let us see to our errand.',bye:1}])};
/* Paul, as Silas sees him and talks to him */
const PAUL7={name:'Paul',actor:P,as:{silas:{
  look:()=>say(SI,inTar()?(F.read?'Paul. He let another man read his letter, and I think that he is the gladder for it.':'Paul. Everything that he has said to that man is true. It is not the truth that is wanting: it is a second voice.')
    :inGates()?(F.up?'Paul. Rain is running out of his beard, and he is looking at a bundle of wet papyrus as if it were a sick child.':'Paul. He looked at that torn tent the way I should look at a scroll.')
    :inLys()?'Paul. He has not taken his eyes off that young man since we came in.':'Paul. In this city they gathered stones for him. He walks through it asking after someone else.'),
  talk:()=>talkTree([
    {q:'What can I do to help?',a:()=>say(P,inTar()?(F.read?'Nothing more here. Take up your staff.':F.silas?'Stand ready to read. I mean the whole congregation to hear it.':'Speak to Reuben. He will not take it from me: I was a party to the dispute. You were sent.')
      :inGates()?(!F.mended?'Leave the sewing to me. But stay near: I shall want you.':!F.up?'Take the windward line of that tent, and hold it while I set the pole.':F.cased?'Sleep, if you can. So shall I.':'Keep the letter under your mantle until its case is ready.')
      :inLys()?(!F.readL?'See that Lystra hears the letter as Tarsus heard it.':heard()?'Stand by me. I am going to ask him.':'Watch that young man with me. You see people more quickly than I do.')
      :'Greet the brothers. They have not had a visitor from Jerusalem before.')},
    {q:'Why were two of us sent with one letter?',if:()=>inTar()&&!F.read,once:1,a:()=>say(P,"So that it should not rest on one man's word. It says of you and Judas that you are to tell the same things with your own lips. (Acts 15:27) I had nearly forgotten it.")},
    {q:'I will leave you to it.',bye:1}]),
  show:{sstaff:'Keep your staff by you, Silas. There is a great deal of road yet.',letter:()=>say(P,inTar()&&!F.read?'Keep it for a moment, Silas. When the whole congregation is here, it is you who should read it.':'You carry it as well as I do. Better: nobody can say that it is yours.'),'*':'Keep it by you, Silas.'}}}};
/* ============ TOPICS: what Paul has learned, which he can raise with anyone (see each person's ask table) ============ */
const TOPICS=[
  {id:'witness',q:'Reuben will not take the letter on my word.',if:()=>inTar()&&!F.silas},
  {id:'loop',q:"The tent's corner loop wants a strip of leather.",if:()=>inGates()&&!F.strap&&!F.mended},
  {id:'dry',q:'The copies of the letter must be kept dry.',if:()=>inGates()&&F.up&&!F.tallow&&!F.cased},
  {id:'tim',q:'What do the brothers say of Timothy?',if:()=>(inLys()||inIco())&&!heard()}];
/* ============ WAX TABLETS: people met, tasks still open, Scripture (shown by shared/tablets.js) ============ */
const TABLETS={
  people:[
    {name:'Silas',note:()=>inTar()?'A leading man among the brothers in Jerusalem, and a prophet. He was sent out with the letter, to tell the same things with his own lips. (Acts 15:27, 32)'
      :inGates()?'He has never pitched a tent in his life. He has two hands, and he offers them.':'A stranger in these cities, and already the brothers bring him their questions.'},
    {name:'Reuben',note:()=>F.read?'He asked for a second witness, and listened when he was given one.':'A brother of Israel in Tarsus, careful and well thought of. He will not take the letter on the word of a man who was a party to the dispute.',if:inTar},
    {name:'Agathon',note:'A brother of the nations in Tarsus. He was told that without circumcision he could not be saved.',if:inTar},
    {name:'Eirene',note:'A weaver of linen. The congregation of Tarsus meets in her courtyard.',if:inTar},
    {name:'Zenon',note:'The carter of Derbe, and a disciple. He drives the road over the Taurus, and he carries spare harness.',if:inGates},
    {name:'Bion',note:()=>F.up?'He is dry, with his wife and his daughter. He asked why we did it.':'A cloth merchant of Tarsus, with his wife Charis and their daughter Melissa. His tent is torn, and a storm is coming.',if:inGates},
    {name:'Timothy',note:()=>heard()?'The brothers in Lystra and Iconium speak well of him. (Acts 16:2)':'The son of Eunice; his father is a Greek. A man\'s height now. He does what he is given, and does not count it.',if:()=>inLys()||inIco()},
    {name:'Eunice',note:'The mother of Timothy. Her faith is the same by lamplight and by daylight.',if:inLys},
    {name:'Lois',note:'The mother of Eunice. What Timothy knows of the holy writings began with her.',if:inLys},
    {name:'Myron',note:'One of the older men appointed in Lystra. (Acts 14:23)',if:inLys},
    {name:'Nathan',note:'The saddler, and now one of the older men of Iconium.',if:inIco},
    {name:'Tatia',note:'The wife of Xanthos the carrier. She has kept the faith in a divided house.',if:inIco}],
  tasks:[
    {t:'Reuben asks for a second witness. I was a party to the dispute, and I cannot be it.',if:()=>inTar()&&!F.silas},
    {t:'Have the letter read to the whole congregation, as it was in Antioch.',if:()=>inTar()&&F.silas&&!F.read},
    {t:'Take the road north, over the Taurus.',if:()=>inTar()&&F.read},
    {t:"Mend the merchant's tent: the long seam, and a leather loop for its corner.",if:()=>inGates()&&!F.mended},
    {t:'Raise the tent. It wants a man on the windward line.',if:()=>inGates()&&F.mended&&!F.up},
    {t:'Make a case that will keep the copies of the letter dry.',if:()=>inGates()&&F.up&&!F.cased},
    {t:'Go on through the Gates, to Derbe.',if:()=>inGates()&&F.cased},
    {t:'Deliver the decrees to the congregation in Lystra.',if:()=>inLys()&&!F.readL},
    {t:'Hear what the older men of Lystra say of Timothy.',if:()=>inLys()&&F.readL&&!F.eld},
    {t:"Hear what Timothy's own household says of him.",if:()=>inLys()&&F.readL&&!F.fam},
    {t:'Carry the decrees to Iconium, and ask about Timothy there.',if:()=>inLys()&&F.readL&&!(F.nat&&F.tat)},
    {t:'Ask Timothy.',if:()=>inLys()&&heard()},
    {t:'Deliver the decrees to the congregation in Iconium.',if:()=>inIco()&&!F.readI},
    {t:'Hear what the brothers in Iconium say of Timothy.',if:()=>inIco()&&F.readI&&!(F.nat&&F.tat)},
    {t:'Go back to Lystra.',if:()=>inIco()&&F.nat&&F.tat}],
  scripture:ORDER.map(k=>PASS[k])};
/* ---------- Silas's side of things, when he is the one being played ---------- */
const AS_S={
  tarsus7:{'mountains':{look:'So those are the mountains that we must cross. Nobody in Jerusalem told me how high they were.'},
    'door of the house':{look:'The door of a house that has given its courtyard to the congregation.',use:'I am a guest here. I wait to be asked in.',open:'I am a guest here. I wait to be asked in.'},
    'loom':{look:'A loom, and it is standing idle. This whole house is waiting on a letter.',use:'I should only tangle it.'},'bolts of linen':{look:'Fine linen. Whoever wove it does nothing by halves.'},
    'linen on the wall':{look:'Clean linen in the sun. A peaceful sight, in a courtyard that has had little peace.'},'stone basin':{look:'Cold water, and clear. It has come a long way down to be here.',use:'I wash my face. It is like putting it into snow.'},
    'fig tree':{look:'A fig tree, with benches under it. A good place for a congregation to sit.'},
    'benches':{look:()=>say(SI,F.read?'Full benches, and nobody looking over his shoulder at the next one.':'Two benches, and the brothers sit on them like two households.')},
    'gate to the street':{look:'The gate to the street. We shall go out by it when this is mended, and not before.'}},
  gates:{'rock wall':{look:'Rock on both sides, and a strip of sky between. One feels very small in here.'},'Cilician Gates':{look:'So that is the gate of Cilicia. I have seen city gates that were wider. Tomorrow we go through it.'},
    'stream':{look:'The stream is rising already. I should not like to wade it carrying anything that I valued.',use:'I drink. My teeth ache with it.'},
    'wagon':{look:"The carter's wagon. There is room under it for three, he says. He has not measured us."},'oxen':{look:'Patient beasts. They brought our bundles up from Tarsus without one complaint, which is more than my feet can say.'},
    'bales':{look:'Black cloth, in bales. So this is what a tent is, before it is a tent.'},
    'road to Tarsus':{look:'The way we came.'}},
  lystra7:{'window':{look:'A lane in a small town. Paul was dragged along it once. He looked out at it just now as a man looks at a field that he has sown.'},'lamp':{look:'A small lamp in a niche. Paul glanced at it when we came in, and smiled.'},
    'shelf':{look:'Their winter store. They will share it with us, and go short without a word.'},'hearth':{look:'A good fire. Somebody was up before the sun to lay it.',use:'I warm my hands. I have been cold since the Gates.'},
    'bench':{look:'The best place in the house, and it is ours.',use:'Not while Paul is still on his feet.'},'water jars':{look:'Three jars, and every one of them full to the brim.'},
    'table':{look:'A low table. Whatever is on it tonight, we shall be given the first of it.'},'door to the lane':{look:'The door to the lane.'}},
  iconium7:{'mountains':{look:'Snow almost down to the plain. I am glad that we crossed when we did.'},
    'street to the synagogue':{look:'The street to the synagogue. Paul has told me what was gathered for him in it.',use:'Not today.',open:'Not today.'},
    'saddlery':{look:'A saddlery. It smells of leather and wax, like a certain tentmaker.'},"saddler's bench":{look:'A saddle, half made. Its maker put it down the moment he saw Paul.'},
    'fountain':{look:'Good water, and a good deal of talk round it.',use:'I drink. It is cold enough to wake a tired man.'},'poplars':{look:'Bare trees in a row, like the masts of ships in a harbor.'},
    "Xanthos's wagon":{look:'A wagon under a goat-hair cover. Paul looked at every seam of it as we passed.'},
    'gateway of the yard':{look:"A carrier's yard. A sister lives behind it, in a house that is divided.",use:'I have no business in there.',open:'I have no business in there.'},
    'south gate':{look:'The gate we came in by.'}}};
for(const r in AS_S)for(const h of ROOMS[r].hs)if(AS_S[r][h.name])h.as={silas:AS_S[r][h.name]};
/* the tent, in Silas's hands: he does not sew it, he holds its windward line */
ROOMS.gates.hs.find(h=>h.use===pitch7).as={silas:{
  look:()=>say(SI,F.up?'It stands. I held one rope, and I am as proud of it as if I had woven the cloth.':F.mended?'Mended, and lying there. In this wind it will not go up for one man alone.':'A tent, flat on the ground, with a rent in it as long as my arm. I should not know where to begin.'),
  use:hold7,pickup:hold7,useWith:async it=>say(SI,it==='sstaff'?'A staff will not hold it. Two hands on the windward line will.':SIL7.noCraft)}};
/* ============ PLACING THE CAST, SETUP ============ */
/* ENT: where Paul stands when a room is entered by a code. */
const ENT={tarsus7:[150,124,1],gates:[226,127,1],lystra7:[236,124,-1],iconium7:[420,124,-1]};
/* place7: put everyone where the story has them, for the room the two men are in. They keep together throughout. */
function place7(room){const o=other(),e=ENT[room];for(const a of[RE,AG,EI,ZE,BI,CH,ME,TI,EN,LO,MY,NA,TA])a.room=null;G.gath=0;G.hands=0;
  place(o,room,e[0]-e[2]*26,e[1]+2,e[2]);
  if(room==='tarsus7'){place(EI,room,84,117,1);place(AG,room,226,116,-1);place(RE,room,352,118,-1)}
  else if(room==='gates'){place(ZE,room,172,117,1);place(BI,room,310,123,-1);if(!F.up){place(CH,room,370,117,-1);place(ME,room,384,120,-1)}else place(BI,room,320,122,-1);
    if(F.line&&F.mended&&!F.up)place(SI,room,LINE[0],LINE[1],-1)}
  else if(room==='lystra7'){place(MY,room,62,121,1);place(LO,room,112,115,1);place(TI,room,150,122,1);place(EN,room,206,117,-1)}
  else if(room==='iconium7'){place(NA,room,128,114,1);place(TA,room,274,116,-1)}}
function setup7(){SI.hs=SILAS7;P.hs=PAUL7;P.called='Paul';Object.assign(SI,SIL7);SI.speed=0;SI.free=false;for(const id in BY7)(ITEMS[id].by=ITEMS[id].by||{}).silas=BY7[id];
  G.tried=G.asked=G.metBion=G.metLys=G.metIco=0;G.st=null;place7('tarsus7');G.inv=['awl','thread','knife','tablets','letter'];G.invs={paul:G.inv,silas:['sstaff']};drawInv()}
/* ============ SCENES: the opening, the roads, the ending; PRAYER HINTS ============ */
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. */
const LIT='#eadfcc';
function cast(g,list,lit){list.sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,lit||LIT,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),7.5)})}
/* The courtyard in Antioch, three times: the dispute (k 0), the letter read (k 1), and the parting (k 2; away: how far Barnabas and Mark have gone). */
function antiochScene(g,t){backdrop(g,'antioch7');const s=G.st||{},talk=Math.floor(t/600)%2;
  if(!s.k)cast(g,[['br1',16,119,1],['br3',84,116,1],['br4',276,119,-1],['br2',170,113,1],['barnabas7',98,124,1],['paul',124,127,1,{ges:talk}],['jud1',216,124,-1,{ges:1-talk}],['jud2',242,127,-1]]);
  else if(s.k===1)cast(g,[['br2',190,114,-1],['br3',208,118,-1],['br1',228,114,-1],['br4',246,118,-1],['ap3',266,115,-1],['tc5',180,123,-1],['tc4',222,125,-1],['tc2',256,126,-1],
    ['barnabas7',58,122,1],['paul',82,125,1],['judas7',110,123,1],['silas',138,126,1,{ges:talk}]]);
  else{const a=s.away||0,go=(id,d)=>a>0&&a<1?walkFr(LOOK[id],a*d,d/5.2):0,bow=s.bow?1:0,L=[['br1',16,119,1,{bow}],['br3',84,116,1,{bow}],['br2',60,123,1,{bow}],['br4',34,128,1,{bow}],['silas',112,123,1,{bow}],['paul',140,126,1,{bow}]];
    if(a<1)L.push(['barnabas7',178+a*112,125-a*9,a>0?1:-1,{fr:go('barnabas7',112)}],['mark7',204+a*100,128-a*10,a>0?1:-1,{fr:go('mark7',100)}]);   /* each at his own stride, over the ground he covers in 5.2 seconds */cast(g,L)}}
/* The meeting in Jerusalem (Acts 15:6-21). who: 0 Peter is speaking; 1 Barnabas and Paul; 2 James. */
function councilScene(g,t){backdrop(g,'council');const w=(G.st||{}).who||0,talk=Math.floor(t/600)%2;
  cast(g,[['ap1',30,113,1],['ap2',52,117,1],['ap4',76,113,1],['ap5',98,117,1],['ap3',226,113,-1],['ap1',250,117,-1],['ap2',274,113,-1],['ap4',296,117,-1],
    ['judas7',214,121,-1],['silas',238,125,-1],['james7',192,127,-1,{ges:w===2&&talk}],
    ['barnabas7',w===1?124:72,w===1?126:122,1],['paul',w===1?148:50,w===1?129:125,1,{ges:w===1&&talk}],['peter7',w===0?140:108,w===0?128:121,1,{ges:w===0&&talk}]],'#e4d6c4')}
/* OPENING: the road from Antioch, as the map draws it when the chapter opens. LABELS: where a name goes on this chapter's map. The road
   from the Cilician Gates comes to Derbe from the east, where the name usually stands; the name goes under that road, to the right of the
   place and a little below it. Under the place itself it would stand in one line with PAMPHYLIA, and read as part of that name. */
const OPENING=[['antioch','syriangates','new'],['syriangates','tarsus','new']],LABELS={derbe:{lab:'r',dy:3.3}};
/* arrive7: after the map has drawn a leg, and before the room is shown: who is there, and what is known of the road. */
async function arrive7(to,from){
  if(to==='ciliciangates'){place7('gates');
    await narr('At the north gate of Tarsus a wagon was loading for Derbe, and its carter was a brother: Zenon, who had once offered Paul this very road.',{dur:9000});
    await narr('From Tarsus the road climbed into the Taurus for some fifty kilometers, to the Cilician Gates: a cleft so narrow that a way for wagons had to be cut into its rock.',{dur:9500});
    await narr('Acts does not describe the road. But this was the trade route to the cities beyond the mountains, and the natural way for Paul to take.',{dur:8500})}
  else if(to==='derbe'){place7('lystra7');
    await narr('In this way he reached Derbe, and Lystra after it. (Acts 16:1)',{dur:5500});
    await narr("At Derbe the oxen were unyoked on Zenon's own threshing floor, and there the congregation heard the letter read.",{dur:8000});
    try{const M=SHARED.map;G.scene=M.draw;await fade(0,350);await M.go('derbe','lystra');await fade(1,400)}catch(e){console.error(e)}
    G.scene=null;setScore(MUSIC);AU.mood=ROOMS.lystra7.mood;AU.amb=ROOMS.lystra7.amb;
    await narr('It was late in the year 49, or early in 50. Two or three years had passed since the stones.',{dur:7000});
    await narr('There lived a disciple whose name was Timothy. His mother was a Jewish woman and a believer; his father was a Greek. (Acts 16:1)',{dur:8000})}
  else if(to==='iconium'){place7('iconium7');
    await narr('Iconium lay about 30 kilometers away: a day on foot, across the winter fields.',{dur:6500})}
  else if(to==='lystra'){place7('lystra7');
    await narr('They walked back the way they had come. In two cities Paul had heard one account of the same young man.',{dur:7500})}}
async function start7(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(7);G.end={};enterRoom('tarsus7',...ENT.tarsus7);G.st={k:0};G.scene=antiochScene;AU.mood='tense';AU.amb={birds:.4,leaves:.4,crowd:.3};codeBtn();await fade(0,600);
    await narr('Antioch in Syria, about 49 C.E.',{dur:3000});
    await narr('Some men arrived from Judea and started teaching the brothers that nobody could be saved without being circumcised as the custom of Moses requires. (Acts 15:1)',{dur:9500});
    await narr('Paul and Barnabas disagreed and argued with them at length. In the end it was settled that Paul, Barnabas and some others should take the question up to the apostles and elders in Jerusalem. (Acts 15:2)',{dur:11500});
    await fade(1,500);G.st={who:0};G.scene=councilScene;AU.mood='calm';AU.amb={birds:.2,crowd:.15};await fade(0,600);
    await narr('In Jerusalem the apostles and the elders met to examine the question. (Acts 15:6)',{dur:6500});
    await say(PE,'Why, then, do you put God to the test? You would lay on the necks of the disciples a yoke that was too heavy for our forefathers, and too heavy for us. (Acts 15:10)');
    await say(PE,'No: we trust that the undeserved kindness of the Lord Jesus saves us, and it saves them in just the same way. (Acts 15:11)');
    G.st.who=1;
    await narr('The whole gathering fell quiet. Then they listened as Barnabas and Paul told of the many signs and wonders God had worked through them among the nations. (Acts 15:12)',{dur:10500});
    G.st.who=2;
    await narr('Then James spoke. It appears that he presided over the discussion.',{dur:5000});
    await say(JA,'My decision, then, is that we should not make difficulties for people of the nations who turn to God. (Acts 15:19)');
    await narr('The apostles and the elders, and the whole congregation with them, then resolved to choose men of their own and send them to Antioch with Paul and Barnabas. Their choice fell on Judas, called Barsabbas, and Silas, both of whom took the lead among the brothers. (Acts 15:22)',{dur:12500});
    await narr('With them went a letter, addressed to the brothers from the nations in Antioch, Syria and Cilicia. (Acts 15:23)',{dur:8000});
    await fade(1,500);G.st={k:1};G.scene=antiochScene;AU.amb={birds:.4,leaves:.4,crowd:.5};await fade(0,600);
    await narr('The men were sent on their way and went down to Antioch. There they assembled everyone and delivered the letter; and when it had been read, there was joy at the encouragement it gave. (Acts 15:30, 31)',{dur:11500});
    await narr('Judas and Silas were prophets themselves, and in many a talk they encouraged the brothers and made them strong. (Acts 15:32)',{dur:8000});
    await fade(1,500);G.st={k:2,away:0};AU.mood='tense';AU.amb={birds:.4,leaves:.4};await fade(0,600);
    await narr('Some days later Paul put a plan to Barnabas:',{dur:3200});
    await say(P,'Come, let us go back to all the cities where we made the word of Jehovah known, and call on the brothers, and see how they fare. (Acts 15:36)');
    await narr('Barnabas had made up his mind that John, the one called Mark, should come too. Paul was against it: Mark had left them in Pamphylia, and had not gone on with them into the work. (Acts 15:37, 38)',{dur:12500});
    const st=G.st;tween(5200,k=>{st.away=k});
    await narr('Anger flared up over this, so sharply that the two parted. Barnabas took Mark and sailed for Cyprus. (Acts 15:39)',{dur:9500});
    st.away=1;st.bow=1;SFX.pray();
    await narr('Paul chose Silas. The brothers commended him to the undeserved kindness of Jehovah, and he set out. (Acts 15:40)',{dur:8500});
    try{await need('map');await SHARED.map.journey(OPENING,{labels:LABELS,view:'north',text:['His way led through Syria and Cilicia, and wherever he came he made the congregations stronger. (Acts 15:41)',
      'Acts does not name the congregations of Cilicia. The trade road ran north through the Syrian Gates, and across the plain to Tarsus: its chief city, where Paul was born.']})}catch(e){console.error(e)}
    await fade(1,500);G.scene=null;G.st=null;setScore(MUSIC);AU.mood=ROOMS.tarsus7.mood;AU.amb=ROOMS.tarsus7.amb;codeBtn();await fade(0,600);
    await narr('Tarsus, in Cilicia. In this story the congregation there meets in the courtyard of a weaver of linen.',{dur:6500});
    await say(EI,'Paul of Tarsus, home again! Peace to you, and to the brother with you. This courtyard has been waiting for you since the news came from Antioch.');
    await say(P,'Peace to this house, Eirene. This is Silas, of the congregation in Jerusalem.');
    await say(EI,'Then you both come at the right hour. Since those men from Judea passed through, this congregation has not slept well.');
    await walk(RE,300,120);RE.dir=-1;P.dir=1;SI.dir=1;
    await say(RE,'I will say it to your face, Paul, as I have said it behind your back. Those men taught that the brothers of the nations must be circumcised, or they cannot be saved. You stood against them in Antioch. Now you come with a letter which says that you were right.');
    await say(RE,'A man who carries home the verdict in his own dispute should not wonder if he is asked for more than his own word.');
    await walk(RE,352,118);RE.dir=-1;
    await say(P,'He is not an enemy. He is a careful man, and half this congregation looks to him.',TH)},true)}
/* Paul asks, the older men stand with him, and Timothy comes (Acts 16:3). His circumcision is told as Acts tells it, with the reason it gives, and is not shown. */
async function invite7(){playAs(P);AU.mood='calm';await Promise.all([walk(P,178,126),walk(SI,234,130)]);P.dir=-1;SI.dir=-1;TI.dir=1;
  await say(P,'Timothy. I have been asking about you in two cities, and you did not know it.');
  await say(TI,'About me? What did they say, Paul?');
  await say(P,"That what you are given, you do, and do not count it. That you are the same man at the hearth as at the well. That you walked a day's road with a sack on your back for brothers you hardly knew, and went again to see how they did.");
  await narr('The brothers in Lystra and in Iconium spoke well of him. (Acts 16:2)',{dur:6500});
  await think('He is looking at the floor. How do I put it to him?',[
    {q:'The brothers have spoken for you. You must come.',no:"Must? Then it would be the older men's errand that he ran, and not his own. I want a volunteer, not a porter."},
    {q:'I need someone to carry the bundles.',no:'True, and the least part of it. He would say yes at once, and never know what he had been offered.'},
    {q:'I want you with us. It will cost you your home.',ok:1}]);
  await say(P,'I want you to come with us, Timothy: with Silas and me, to the congregations, and beyond them to cities that have never heard. It will cost you this house. And you have seen for yourself what that road can be like, outside the gate of this town.');
  await narr('Paul let it be known that he wanted Timothy to travel with him. (Acts 16:3)',{dur:5500});
  await say(TI,'I am young, Paul. I go red when I read before twenty people.');
  await say(P,'I did not ask what you think of yourself. I asked the brothers, and I asked your mother. And I have eyes of my own.');
  await walk(MY,128,127);MY.dir=1;
  await say(MY,"It is not Paul alone who asks, Timothy. The older men of Lystra say the same. And things were said about you in this room, by God's spirit, which we have not forgotten.");
  await say(EN,'Do not look at me, my son. Everything I taught you was for this. I only did not know that it would be so soon.');
  await say(LO,'Go, child. I shall keep this door open for three of you now.');
  await say(TI,'Then, if the brothers are not mistaken in me... I will come.');
  G.hands=1;for(const a of[P,TI,MY,SI,EN,LO])a.bow=true;SFX.pray();await wait(900);
  await narr('There were prophecies about Timothy, and the body of elders laid their hands on him, as Paul did. It may have been at this time. (1 Timothy 1:18; 4:14; 2 Timothy 1:6)',{dur:10500});
  for(const a of[P,TI,MY,SI,EN,LO])a.bow=false;G.hands=0;
  await fade(1,700);AU.mood='hope';
  await narr('Paul wanted Timothy as his companion. So he took him and circumcised him, on account of the Jews who lived in those parts: every one of them knew that his father was a Greek. (Acts 16:3)',{dur:11000});
  await narr("Paul knew very well that no Christian had to be circumcised: the letter in his bag laid no such burden on anyone. But everyone knew that Timothy's father was a Greek, and to the Jews in the cities ahead of them that would have been an obstacle.",{dur:11500});
  await narr('So that nothing about him would stand in the way of the good news, Timothy submitted to it. Paul would later write that for the Jews he made himself like a Jew, so as to win Jews. (1 Corinthians 9:20)',{dur:10500});
  await journey();
  await narr('In city after city on their way they handed on the decrees that the apostles and the elders in Jerusalem had decided on, to be kept by the brothers there. (Acts 16:4)',{dur:10500});
  await narr('And so the congregations kept growing firmer in the faith, and larger in number with every day. (Acts 16:5)',{dur:8000});
  await narr("Some eleven years later Paul wrote to a congregation that he had no one else with Timothy's disposition, no one who would care so sincerely about how they fared. (Philippians 2:20)",{dur:9500});
  endScreen({title:'Timothy of Lystra',text:'Paul could not be his own witness, so he let another man speak. He sewed a stranger\'s tent in a storm, with a brother on the windward line. And before he asked a young man to leave his home, he asked those who knew him.',
    extra:[F.psalm&&'A psalm read to Lois'].filter(Boolean),
    based:'Based on Acts 15:1-16:5; Philippians 2:20-22; 1 Timothy 1:18; 4:14 and 2 Timothy 1:5, 6. Supporting characters and dialogue are imaginative; the events are from the Scriptures. Acts names no city in Cilicia and describes no road: Tarsus and the Cilician Gates are likely, not stated. Lystra was apparently Timothy\'s home; Acts 16 does not name his mother, or mention Lois. How Paul heard what the brothers in Iconium said, and when hands were laid on Timothy, is not told.',
    go:'Click to continue to Chapter Eight',code:['Chapter Eight code: {code}',codeOf(8,0)]});
  await wait(1500);ov.onclick=()=>startChapter(8);await new Promise(()=>{})}
function hint7(){const b=PC()!==P,craft=['craft7',["That is the tentmaker's craft, not mine. A good partner knows when to step back.",'Paul should do this part. I can leave it to him; he is never far away.']],
    his=['paul7b',['This is for Paul to ask. He knew the boy, and he will answer for the man.','Paul should do this. I can leave it to him.']],carry=id=>invOf(SI).includes(id);
  if(inTar()){
    if(!F.silas)return b?['wit7b',['I was no party to that dispute. I was sent out with the letter, to tell the same things with my own lips.','I should talk to Reuben, and tell him who sent me.']]
      :G.tried?['wit7',['He asks for a second witness. And the letter itself names two men who were sent to say the same things in person.','Silas should talk to Reuben. I can let him.']]
      :['reu7',['Reuben is a careful man, not an enemy. I should hear exactly what it is that he asks for.','I should talk to Reuben.']];
    if(!F.read)return['read7',['In Antioch the whole group was gathered, and then the letter was handed over. Read to one man in a corner, it would settle one man.',
      (b?carry('letter'):!carry('letter'))?'I should give the letter to Eirene, and ask her to call the congregation together.':b?'Paul carries the letter. He should give it to Eirene, who can call the congregation together.':'Silas has the letter. He can give it to Eirene, who can call the congregation together.']];
    return['north7',['Tarsus is of one mind again. Beyond the Taurus there are congregations that have never seen this letter.','We can leave by the gate to the street, and choose the Cilician Gates on the map.']]}
  if(inGates()){
    if(!F.mended)return b?craft:!F.strap?['strap7',['The seam I can close. The torn loop wants leather: and here stands a carter who never travels without spare harness.','I should talk to Zenon, and ask him for leather.']]
      :['mend7',['Leather, an awl and thread. A loop and a seam: an hour\'s work, with the wind for an overseer.','I should use the yoke strap on the torn tent.']];
    if(!F.up)return b?(holding()?['pitch7b',["I have the line. The rest is the tentmaker's part.",'Paul can use the tent now, while I hold.']]:['line7b',['Paul cannot hold a tent against this wind and set its pole at the same time.','I should use the tent, and take its windward line.']])
      :holding()?['pitch7',['Silas has the windward line. Now the pole, and the pins.','I can use the tent now, and raise it while he holds.']]
      :['line7',['A tent goes up in a wind only with a man on its windward line. Two are better than one.','Silas should use the tent, and take the line. Then I can raise it.']];
    if(!F.cased)return b?craft:!F.sewn?['case7',['Papyrus and rain. The copies are for every congregation on this road, and Bion has paid me in cloth.','I should use my awl on the goat-hair cloth, and sew a case for the letter.']]
      :!F.tallow?['tallow7',['A cloth case keeps out dust. To turn water it wants something worked into the weave. A carter keeps his axles greased.','I should talk to Zenon, and ask how to keep the letter dry.']]
      :['proof7',['A case that drinks water, and a lump of tallow.','I should use the tallow with the letter case.']];
    return['derbe7',['The family is dry, and so is the letter. Beyond the Gates the road runs to Derbe.','We can go on through the Cilician Gates, and choose Derbe on the map.']]}
  if(inLys()){
    if(!F.readL)return['readL7',['The decrees are for every congregation on this road, and Lystra has older men of its own now.',(b?carry('letter'):!carry('letter'))?'I should give the letter to Myron.':b?'Paul should give the letter to Myron.':'Silas has the letter. He can give it to Myron.']];
    if(heard())return b?his:['ask7',['Four witnesses in two cities, and my own eyes besides. It is time to ask him: and to tell him what it will cost.','I should talk to Timothy.']];
    if(!F.eld)return b?his:['eld7',['A man goes by what his eyes show him. I should not ask whether he speaks well, or looks strong. I should ask what he does.','I should talk to Myron, and ask what Timothy is given to do.']];
    if(!F.fam)return b?his:['fam7',['The older men see him in the congregation. His mother and his grandmother see him when nobody from the congregation is looking.','I should talk to Eunice, and ask what he is at home.']];
    return['ico7',['Lystra has spoken. Myron says that he is known in Iconium too: and Iconium must have its letter.','We can leave by the door to the lane, and choose Iconium on the map.']]}
  if(!F.readI)return['readI7',['Iconium must have the decrees, like every other city.',(b?carry('letter'):!carry('letter'))?'I should give the letter to Nathan.':b?'Paul should give the letter to Nathan.':'Silas has the letter. He can give it to Nathan.']];
  if(!F.nat)return b?his:['nat7',["Why should a congregation a day's walk away know a young man from Lystra at all?",'I should talk to Nathan, and ask how Iconium comes to know him.']];
  if(!F.tat)return b?his:['tat7',['Tatia has watched him come and go. What does he do, when he is here?','I should talk to Tatia at the fountain.']];
  return['back7',['Two cities, and one account of him. What is left to do is in Lystra.','We can leave by the south gate, and choose Lystra on the map.']]}
/* ============ CHAPTER DEFINITION ============ */
/* the lines that are spoken with a gesture (see gesture in index.html): a nod where a line plainly says yes, a shake of the head where it
   plainly says no. Each is a line of this chapter, in English, as it stands above. */
const ACTING={shake:['No, Eunice. Barnabas has sailed for Cyprus, with John Mark. He and I did not agree about this journey. Anger flared up between us, sharply, and we parted.']};
return{acting:ACTING,rooms:['tarsus7','gates','lystra7','iconium7'],setup:setup7,start:start7,hint:hint7,music:MUSIC,scenes:{antioch:antiochScene,council:councilScene},topics:TOPICS,tablets:TABLETS,
  /* painters: the chapter's animal, for the playtest, which checks that every part of it is attached */
  painters:{ox},
  /* Tarsus, the Gates and the cities of Lycaonia lie in the map's northern window. This journey is drawn on its own, as Chapter Four's was:
     the road from Antioch, by the Syrian Gates to Tarsus, over the Taurus by the Cilician Gates to Derbe and Lystra, and on to Iconium. */
  view:'north',labels:LABELS,
  route:[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium','new']],
  places:{
    antioch:{room:'-',if:()=>false,no:'Antioch commended us to the undeserved kindness of Jehovah for this road. It leads on, not back.'},
    syriangates:{room:'-',if:()=>false,no:'The Syrian Gates lie behind us, and the congregations of Syria with them. Our road leads on.'},
    tarsus:{room:'tarsus7',x:150,y:124,dir:1,if:()=>false,no:()=>say(PC(),inGates()?'Back down to Tarsus? We did not spend that night in the gorge in order to walk down again. And Tarsus has its letter.':'Tarsus has its letter, and its peace. Our road leads on.')},
    ciliciangates:{room:'gates',x:226,y:127,dir:1,if:inTar,no:'The Gates are behind us, and I am not sorry. One night in that gorge was enough.'},
    /* Derbe is passed on the way: the road from the Gates comes to it first, and runs on to Lystra, where the story stops (see arrive7) */
    derbe:{get room(){return inGates()?'lystra7':'-'},x:236,y:124,dir:-1,if:inGates,no:()=>say(PC(),inTar()?'Derbe lies beyond the Taurus, and the road to it goes through the Cilician Gates. One stage at a time.':'Derbe has its letter, and Zenon is at home there. Our road does not lead back.')},
    lystra:{room:'lystra7',x:236,y:124,dir:-1,if:inIco,no:'Lystra lies beyond Derbe, and beyond the mountains. One stage at a time.'},
    iconium:{room:'iconium7',x:420,y:124,dir:-1,if:()=>inLys()&&!(F.nat&&F.tat),no:()=>say(PC(),inLys()?'Iconium has had its letter, and I have had its answer. What is left to do is in this house.':'Iconium lies beyond Lystra. One stage at a time.')}},
  way:()=>[['antioch','syriangates'],['syriangates','tarsus']].concat(inTar()?[]:[['tarsus','ciliciangates']],inLys()||inIco()?[['ciliciangates','derbe'],['derbe','lystra']]:[],inIco()||(inLys()&&(F.readI||F.nat||F.tat))?[['lystra','iconium']]:[]),arrive:arrive7,
  flags:['silas','read','strap','mended','line','up','sewn','tallow','cased','readL','eld','fam','readI','nat','tat','psalm'],
  /* nine characters: 19 flags, two bits for each man's room, one for who is played, and twelve for who carries what */
  codeBits:{share:12},party:['paul','silas'],home:{sstaff:'silas'},share:['awl','thread','knife','tablets','letter','sstaff','strap','cloth7','pcase','tallow'],ent:ENT,
  inv(room){const inv=['awl','thread','knife','tablets','letter'],add=(c,id)=>{if(c)inv.push(id)};
    add(F.strap&&!F.mended,'strap');add(F.up&&!F.sewn,'cloth7');add(F.sewn&&!F.cased,'pcase');add(F.tallow&&!F.cased,'tallow');inv.push('sstaff');return inv},
  place:place7}
});

