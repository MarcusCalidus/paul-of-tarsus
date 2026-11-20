/* Paul of Tarsus: level data for Chapter Twelve, "Tentmakers of Corinth".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Corinth (Acts 18:1-22), from the autumn of 50 C.E. to the spring of 52: Paul finds Aquila and Priscilla, lodges and works with them,
   and speaks in the synagogue every Sabbath; Silas and Timothy come, and he gives himself wholly to the word; he is opposed, shakes
   out his garments and moves next door, to the house of Titius Justus; Crispus believes, and many others; he is told in a vision to
   keep on speaking, and stays a year and six months; he is led to the judgment seat, and Gallio will not hear the case; he sails with
   Priscilla and Aquila, has his hair cut short at Cenchreae, leaves the two at Ephesus, and comes by Caesarea to Antioch.
   Acts does not say how Paul found Aquila and Priscilla, where their workshop stood, what they made, or whether the two were disciples
   already; what Silas and Timothy brought (that is from his letters); who wrote the letter to the Thessalonians down, or who carried
   it; how Crispus came to believe; in which month the vision came; which law the charge meant, or what Paul would have said; who beat
   Sosthenes, or what became of him; what the vow was; why Paul would not stay at Ephesus; or which congregation he went up to greet.
   The chapter claims none of it, and its end screen says so. Luke is in Philippi, so the narration says "he" and "they".
   What the account itself says is told by the narrator, in paraphrase with its reference, and never put into a mouth as a quotation:
   those lines stand together in TOLD below.
   Two things are new here. Light: an awning in the court of Justus is hung on hooks, and the light under it is worked out from where
   it hangs (AWN). And time: the year and six months are walked season by season, and what is promised in one season is kept in its
   own (SEASON, PROM). Aquila and Priscilla, whom the Scriptures never name apart, are played as one.
   Corinth is shown as it stood (CONTRIBUTING section 3, the exception for Athens, Corinth, Ephesus and Rome): the old temple over the
   city and the temple on the rock, from outside and from afar. No rite is shown, no god is named, and Paul admires none of it. */
LEVEL(12,()=>{
"use strict";

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A scale that no earlier chapter has used: a major third under a minor sixth and seventh, from A flat, in even bars of sixteen. At
   the bench (mood "bench") a working tune on the lyre over a low string and a steady hand drum. From the day he lays the awl down
   (mood "word") the same tune without its beat. In the night of Acts 18:9 (mood "night") nothing plays. Through the year and six
   months the tune is a round (ROUND): in winter one voice, in spring a second that comes in two bars behind it, in summer a third
   (moods "winter", "spring", "summer"): there are many. In the court the round is always whole ("court"). At the judgment seat one
   drum, which stops in the middle of a bar (seat12; mood "seat" is silence). At Ephesus a tune that is begun and left unfinished
   ("eph"). On the way home and in Antioch the round once more, far off ("home"). Nothing is claimed about how music was played then. */
const _=null,SCALE=[0,2,4,5,7,8,10],
 TUNE={A:[0,_,2,_,4,_,_,2,4,_,5,_,4,_,2,_],B:[4,_,5,_,7,_,_,5,4,_,2,_,0,_,_,_],C:[7,_,_,5,4,_,5,_,7,_,8,_,7,_,_,_],D:[4,_,2,_,0,_,_,2,1,_,0,_,0,_,_,_]},
 REST=Array(16).fill(_),ROUND=Object.assign({R:REST},TUNE),
 MUSIC={dt:.16,steps:16,root:56,scale:SCALE,bars:16,tracks:[
  {inst:'lyre',moods:['bench','word'],prog:'ABCDABCD',len:3,seq:TUNE},
  {inst:'bass',moods:['bench','word'],prog:'ABAB',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-5,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_]}},
  {drum:1,moods:['bench'],prog:'AAAB',seq:{A:'d...t...d.t.t...',B:'d...t...d.t.t.k.'},vol:.7},
  {inst:'lyre',moods:['winter','spring','summer','court'],prog:'ABCD',len:3,seq:ROUND,vol:.9},
  {inst:'harp',moods:['spring','summer','court'],prog:'CDAB',len:4,oct:12,seq:ROUND,vol:.7},
  {inst:'ney',moods:['summer','court'],prog:'BCDA',len:3,oct:12,seq:ROUND,vol:.55},
  {inst:'bass',moods:['winter','spring','summer','court'],prog:'ABAB',len:6,seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],B:[-5,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_]},vol:.8},
  {inst:'aulos',moods:['eph'],loop:8,oct:12,vol:.8,lines:[[[0,4,3],[4,5,2],[8,7,6]],[[0,8,3],[4,7,2],[8,5,4]],[[0,4,2],[4,2,6]],[],[],[],[],[]]},
  {drone:[0],every:32,moods:['eph','seat'],vol:.4},
  {inst:'harp',moods:['home'],prog:'ABCD',len:5,oct:12,seq:ROUND,vol:.45},
  {inst:'lyre',moods:['home'],prog:'CDAB',len:3,seq:ROUND,vol:.35}]};
/* seat12: the drum before the judgment seat. Two bars and a half of it, and then it stops, in the middle of a bar. */
const seat12=()=>{if(!AU.ctx)return;const t0=now()+.05,dt=.16;'d...t...d.t.t...d...t...d.t.t...d...t...'.split('').forEach((c,i)=>{if(c!=='.')(c==='d'?DRUMS.d:DRUMS.t)(t0+i*dt,c==='d'?1.2:.9)})};
/* ink12: a reed drawn across a potsherd. good12: the awning is right, and the round's first notes sound together */
const scratch12=()=>{if(AU.ctx)noise({d:.22,v:.07,f:5200,q:1.2})},
  chord12=n=>{if(AU.ctx)[0,2,4,7].slice(0,n||4).forEach((d,i)=>INST.harp(mtof(note(d,0,MUSIC)),now()+.03+i*.09,.6,.85))};
/* rain on a cloth and on paving; and the mallet of a man who drives a wedge under a ship on the beach */
const BEDS={rain:{type:'highpass',f:3200,q:.5,lfo:.31,depth:.25,v:.2}},
  CALLS={mallet:[2.2,6,(t,d)=>{const n=2+(Math.random()*3|0);for(let i=0;i<n;i++){noise({t:t+i*.34,d:.04,v:.08,f:900,q:2,dest:d});tone({f:210,to:150,t:t+i*.34,d:.09,type:'triangle',v:.03,dest:d})}}]};

/* ============ ART ============ */
const SH='#8f95c8',LIN='#e9dfc2',GOAT='#3d332c',MBL='#e8e3d6',BLU='#7f93b4';
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr, lit}]. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,o.lit||lit,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),o.sw==null?7.5:o.sw)})}
/* col: one column, its shaft narrowing a little toward the top, with a capital hardly wider than the shaft: it never reads as a post
   under a bar. shade darkens one that stands in a back row. */
function col(g,x,y,h,w,c,o){o=o||{};const s=o.shade||0,n=o.fl||3;
  poly(g,[x-w/2,y,x+w/2,y,x+w*.42,y-h,x-w*.42,y-h]);g.fillStyle=lg(g,x-w/2,0,x+w/2,0,[tint(c,-.36-s),tint(c,.14-s),tint(c,-.04-s),tint(c,-.44-s)]);g.fill();
  for(let i=1;i<n;i++)R(g,x-w/2+w*i/n,y-h+1,.5,h-2,'rgba(40,30,50,.16)');
  if(!o.plain){const ch=Math.max(1.5,w*.5);R(g,x-w*.42-.5,y-h-ch,w*.84+1,ch,tint(c,-.08-s));R(g,x-w*.42-.5,y-h-ch,w*.84+1,.5,tint(c,.26-s));R(g,x-w/2-.5,y-1,w+1,1,tint(c,-.22-s))}}
/* colonnade: a row of columns under a deep beam and a tiled roof, with shade behind them */
function colonnade(g,x,y,w,h,n,c,o){o=o||{};const bh=o.beam||5,RO='#b9744e';R(g,x,y-h,w,h,o.dark||'#4a4254');
  if(o.back)o.back();comp(g,'multiply',o.sh==null?.5:o.sh,()=>R(g,x,y-h,w,h,'#8a86b0'));
  poly(g,[x-3,y-h-bh,x+w+3,y-h-bh,x+w-2,y-h-bh-8,x+2,y-h-bh-8],RO);for(let i=x;i<x+w;i+=5)stroke(g,[i,y-h-bh,i+(x+w/2-i)*.03,y-h-bh-8],'rgba(80,36,24,.3)',.5);R(g,x-3,y-h-bh-.6,w+6,.8,'#d88a5c');
  R(g,x-1.5,y-h-bh,w+3,bh,c);R(g,x-1.5,y-h-bh,w+3,.6,tint(c,.3));R(g,x-1.5,y-h-.6,w+3,.6,tint(c,-.3));
  for(let i=0;i<n;i++)col(g,x+(i+.5)*w/n,y,h,o.cw||5.6,c,{fl:3})}
/* oldTemple: the old temple of Corinth from outside: heavy columns, each of a single stone (Awake!, January 22, 1991), under a deep
   beam and a low gable, on its steps; side: its long flank running back in shade. The beam and the gable span the whole front. */
function oldTemple(g,x,y,w,n,ch,c,o){o=o||{};const s=o.side||0,eh=Math.max(2,ch*.26),ph=w*.15,cw=Math.max(1.6,w/(n*1.7));
  if(s){const x0=s>0?x+w:x+s,ws=Math.abs(s),cs=mix(tint(c,-.3),'#6a70a8',.3),m=Math.max(3,Math.round(ws/(cw*2.2)));
    R(g,x0,y-ch-eh,ws,ch+eh,tint(cs,-.36));for(let i=0;i<m;i++)col(g,x0+(i+.5)*ws/m,y,ch,cw*.86,cs,{plain:1,fl:2});
    R(g,x0,y-ch-eh,ws,eh,tint(cs,.05));R(g,x0,y-ch-eh,ws,.5,tint(cs,.2));
    poly(g,s>0?[x+w/2,y-ch-eh-ph,x+w/2+s,y-ch-eh-ph,x+w+s+1,y-ch-eh,x+w,y-ch-eh]:[x+w/2,y-ch-eh-ph,x+w/2+s,y-ch-eh-ph,x+s-1,y-ch-eh,x,y-ch-eh],mix('#a9785a','#6a70a8',.34));R(g,x0,y,ws,1.2,tint(cs,-.1))}
  R(g,x,y-ch-eh,w,ch+eh,tint(c,-.6));for(let i=0;i<n;i++)col(g,x+(i+.5)*w/n,y,ch,cw,c,{fl:2});
  R(g,x-.5,y-ch-eh,w+1,eh,tint(c,.02));R(g,x-.5,y-ch-eh,w+1,.5,tint(c,.3));R(g,x-.5,y-ch-.6,w+1,.6,tint(c,-.3));
  poly(g,[x-1,y-ch-eh,x+w+1,y-ch-eh,x+w/2,y-ch-eh-ph],tint(c,-.05));poly(g,[x+2,y-ch-eh-.9,x+w-2,y-ch-eh-.9,x+w/2,y-ch-eh-ph+1.3],tint(c,-.28));
  stroke(g,[x-1,y-ch-eh,x+w/2,y-ch-eh-ph,x+w+1,y-ch-eh],tint(c,.3),.6);
  for(let i=0;i<3;i++){R(g,x-1.5-i*1.2,y+i*1.2,w+3+i*2.4,1.2,tint(c,-.08-i*.07));R(g,x-1.5-i*1.2,y+i*1.2,w+3+i*2.4,.5,tint(c,.14))}}
/* rock: the Acrocorinth, steep and bare, 513 meters above the marketplace (Insight, "Corinth"), with its wall along the top and a
   temple on the summit, small and far off. Each part of that temple is more than a pixel across. k: the scale. */
function rock(g,cx,base,k,r,o){o=o||{};const C=o.c||'#a99a82',P=[cx-80*k,base,cx-62*k,base-12*k,cx-46*k,base-29*k,cx-31*k,base-35*k,cx-23*k,base-51*k,cx-11*k,base-57*k,cx+13*k,base-58*k,cx+22*k,base-51*k,cx+30*k,base-39*k,cx+47*k,base-30*k,cx+62*k,base-13*k,cx+84*k,base];
  poly(g,P);g.fillStyle=lg(g,cx-70*k,0,cx+70*k,0,[tint(C,-.28),tint(C,.1),C,tint(C,-.24)]);g.fill();
  clipTo(g,()=>poly(g,P),()=>{for(let i=0;i<80*k;i++){const x=cx-72*k+r()*150*k,y=base-56*k+r()*52*k;R(g,x,y,.5+r()*.5,3+r()*10*k,r()<.5?'rgba(60,46,44,.2)':'rgba(255,244,216,.13)')}
    ao(g,cx-84*k,base-14*k,170*k,14*k,'b',.3,'#5a6040');tex(g,'mott',.42,cx-84*k,base-60*k,170*k,62*k,'overlay',.7)});
  for(let i=0;i<11;i++)foliage(g,cx-74*k+i*15*k+r()*5,base-1-r()*4*k,5*k,2.2*k,o.green||'#6c7a4c',r,12);
  R(g,cx-10*k,base-59.4*k,23*k,1.8*k,tint(C,.2));R(g,cx-10*k,base-59.4*k,23*k,.5,tint(C,.4));
  const tw=Math.max(6,8*k),th=Math.max(3.5,4.4*k),tx=cx-1*k,ty=base-59.4*k;R(g,tx,ty-th,tw,th,'#e6dcc4');for(let i=0;i<3;i++)R(g,tx+1+i*(tw-2)/3,ty-th+1,Math.max(1,(tw-2)/6),th-1,'#a89c86');
  R(g,tx-.5,ty-th-1,tw+1,1.2,'#f0e8d2');poly(g,[tx-.5,ty-th-1,tx+tw+.5,ty-th-1,tx+tw/2,ty-th-3.2],'#d8ccb0')}
/* bench: a stone bench along a wall, in two tiers; the joints of each tier stop short of its edges, and those of the lower tier stand
   between those of the upper one. stool: a wooden bench on two legs, set at its ends. */
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030')}
function stool(g,x,y,w,c){c=c||'#8a683a';R(g,x+1,y+7,w,1.2,'rgba(30,22,40,.3)');wood(g,x,y,w,2.2,c);R(g,x,y,w,.6,tint(c,.3));wood(g,x+.6,y+2.2,2,5,tint(c,-.25),1);wood(g,x+w-2.6,y+2.2,2,5,tint(c,-.25),1)}
/* letters cut in stone, one line each, centered on cx: a dark stroke with a pale edge below and to the right of it. A letter in an
   inscription is a letter, not a cross shape (CONTRIBUTING section 3); each inscription is still looked at enlarged. */
const GFONT=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
function cutLetters(g,words,cx,y,w,sz){sz=sz||5;g.textBaseline='middle';g.font=GFONT(sz);while(Math.max(...words.map(s=>g.measureText(s).width))>w&&sz>2.8){sz-=.2;g.font=GFONT(sz)}
  words.forEach((s,i)=>{const tw=g.measureText(s).width,tx=cx-tw/2,ty=y+i*(sz+.8);g.fillStyle='rgba(255,250,232,.6)';g.fillText(s,tx+.5,ty+.5);g.fillStyle='rgba(58,46,40,.9)';g.fillText(s,tx,ty)})}
/* cap12: a caption in small letters with a dark edge, as the names on the map are written. It is made to fit its width. */
/* edge: the dark edge round words painted on the picture, a stroke with round joins behind the letters (five shifted copies of the
   words left steps on their curves) */
const edge=(g,s,x,y)=>{g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1;g.lineJoin='round';g.strokeText(s,x,y);g.restore()};
function cap12(g,s,x,y,w,col,left){s=T(s);let sz=4.8;g.font=GFONT(sz);g.textBaseline='middle';while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=GFONT(sz)}
  const tw=g.measureText(s).width,tx=left?x:x-tw/2;if(G.caps12)G.caps12.push({s,w:tw,max:w,sz});
  edge(g,s,tx,y);g.fillStyle=col||'#f4e4b8';g.fillText(s,tx,y)}
/* roll: a roll of cloth lying on its side, its foot at y; nothing is tied round it (clothRoll in the engine: one end faces us) */
function roll(g,x,y,w,h,c){clothRoll(g,x,y,w,h,c)}
/* the seasons of the year and six months: autumn 50, winter, the spring of the games, summer 51; and the spring of 52, when he sails.
   Each has its sky and its light. */
const SKY={a:['#5489c4','#8fb4d8','#d4e0e4','#f0e2c0'],w:['#77818c','#959da4','#b4babc','#c6c8c2'],s:['#4686cc','#84b4e0','#d0e2ec','#eef0dc'],u:['#3b78c6','#74a6da','#c4daea','#f4ecd2'],f:['#4c8aca','#8ab6de','#d2e2ea','#f0ecd8']},
  WARM={a:'#fff0cc',w:'#dfe4ea',s:'#fff6dc',u:'#fff2c8',f:'#fff6dc'};
const haze=(g,w,y0,v)=>{comp(g,'soft-light',v==='w'?.22:.4,()=>{g.fillStyle=lg(g,0,y0,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,y0,w,144-y0)});if(v==='w')comp(g,'multiply',.34,()=>R(g,0,0,w,144,'#a9afbd'))};

/* ---------- The road to the western harbor ---------- */
/* A paved street that ran from the marketplace down to Lechaeum, with footways and colonnades with shops (The Watchtower, March 1,
   2009); near its end, by the steps up to the marketplace, a spring gave the shops and the craftsmen their water (Awake!, January 22,
   1991). Over the roofs stand the old temple on its rise and, far off, the rock with the temple on its summit. Where the workshop of
   Aquila and Priscilla stood, nobody knows (Awake!, as above): the game puts it on this street. The synagogue and the house of Titius
   Justus share a wall (Acts 18:7). A marble lintel naming a synagogue of the Hebrews was found near this road; most date it later than
   Paul's day (study note on Acts 18:1), and the chapter's page says so. In winter it rains; in the spring of the games there are booths. */
const SEAS=()=>F.cen?'f':F.summer?'u':F.spring?'s':F.shook?'w':'a';
ART.street12={w:640,q:12,variant:SEAS,
 paint(g,v){const r=rng(1201),W1='#dfd0aa',W2='#d6c59c',ST='#d9cfb4',out=v!=='w';
  sky(g,640,64,SKY[v]);if(v==='w'){for(let i=0;i<7;i++)cloud(g,40+i*96,8+(i%3)*7,90,9,r,'#c9ccd0','#878d98')}else{cloud(g,70,12,56,4,r);cloud(g,292,8,44,4,r);cloud(g,560,15,50,4,r)}
  ridge(g,0,640,66,x=>7+5*Math.sin(x/57+1)+3*Math.sin(x/19),['#9aa6b4','#a8b0a8']);R(g,0,62,640,44,'#b0a67a');
  rock(g,548,72,1.12,r);
  /* the old temple on its rise, over the roofs */
  ridge(g,20,230,60,x=>24*Math.exp(-Math.pow((x-86)/58,2)),['#b9ae84','#a59a6c']);for(let i=0;i<6;i++)foliage(g,30+i*26+r()*6,50+r()*4,6,2.6,'#6f8250',r,16);
  oldTemple(g,50,35,40,6,15,'#d9cdb0',{side:36});
  /* at the left, the way down to the western harbor: the road between its two long walls, and the gulf beyond */
  R(g,0,50,36,56,'#b9c8d4');R(g,0,56,36,5,'#5f8fb4');R(g,0,56,36,.6,'#a8cce0');ridge(g,0,36,56,x=>3+2*Math.sin(x/9),['#93a3b4','#a2aeb0']);
  poly(g,[10,104,30,104,22,61,17,61],'#cfc2a0');poly(g,[0,104,10,104,17,61,13,61,0,70],'#b3a78a');poly(g,[30,104,36,104,36,72,25,61,22,61],'#a39880');ao(g,0,61,36,10,'t',.25,'#2a2440');
  /* the colonnade of shops: bronze and pots under its roof. The wares stand on the ground: a board behind the columns would be crossed by them */
  colonnade(g,36,104,94,56,5,ST,{back:()=>{R(g,40,60,86,44,'#6a5c58');for(const[x,c]of[[48,'#b8863c'],[57,'#a8742e'],[66,'#c49448'],[92,'#9a5a36'],[103,'#8a4a2a']])vessel(g,x,103,3,7+((x*7)%4),c,x>80?'jar':'jug');
    for(let i=0;i<4;i++){R(g,46+i*8,68,3.4,4.2,'#c49448');R(g,46+i*8,68,3.4,.6,'#f0d088')}}});
  /* the workshop: a house front with a wide opening onto the street */
  house(g,130,30,94,74,W1,r,{patch:2,cracks:3,beams:14});R(g,129,25.6,96,2,'#b8603c');for(let i=130;i<224;i+=4)R(g,i,25.6,.5,2,'rgba(90,40,24,.35)');
  R(g,144,52,64,52,'#2a221c');wood(g,142,49,68,3.4,'#6a4e2c');for(const[x,h,c]of[[150,12,GOAT],[162,9,'#4a3e34'],[176,13,GOAT],[190,8,'#5a4a3a']])roll(g,x,103,10,h,c);roll(g,156,91,10,8,'#4a3e34');
  ao(g,144,52,64,14,'t',.6);ao(g,144,52,8,52,'l',.5);windowArt(g,214,60,7,8,W1,{shut:1});
  if(out)awning(g,138,44,76,9,'#a8442c','#e0d2a8',7.6);else{R(g,138,44,76,2.6,'#8a3a26');R(g,138,44,76,.6,'#c06a4c')}
  /* a house with a shuttered shop */
  house(g,224,34,78,70,W2,r,{patch:2,cracks:3,beams:13});R(g,223,29.6,80,2,'#b8603c');doorArt(g,252,62,22,42,'#6a4a2c',r,{bands:[]});windowArt(g,234,48,10,9,W2,{shut:1});windowArt(g,282,48,10,9,W2,{bars:2});
  /* the spring: a front of dressed stone, an arch, and a basin */
  ashlar(g,302,40,72,64,'#cfc5a8',r,{bw:13,bh:6,v:.1});R(g,300,36,76,4.6,tint('#cfc5a8',.12));R(g,300,36,76,.6,tint('#cfc5a8',.36));
  arch(g,320,60,36,38,'#3a3640');g.save();arch(g,320,60,36,38);g.clip();R(g,320,80,36,18,'#4a5a66');R(g,334.6,72,7,3,'#8a7a5a');R(g,341.6,73.4,1.6,10,'rgba(200,232,244,.85)');ao(g,320,60,36,12,'t',.5);g.restore();
  g.fillStyle=lg(g,316,0,360,0,['#9a9484','#dcd4c0','#bcb4a0','#7e786c']);g.fillRect(316,95,44,9.4);R(g,316,95,44,1,'#eee8d8');R(g,318,96,40,1.6,'#6a9ab0');
  /* the synagogue, and beside it, wall to wall, the house of Titius Justus */
  house(g,374,26,92,78,'#e2d6b4',r,{patch:1,cracks:3,beams:0});R(g,373,21.6,94,2,'#b8603c');for(const x of[384,446]){R(g,x-1.6,44,12.2,14,tint('#e2d6b4',-.2));R(g,x,45.6,9,11,'#2a2420');for(let i=1;i<3;i++)R(g,x+i*3-.4,45.6,.8,11,'#6a5a44')}
  doorArt(g,404,62,26,42,'#5f4428',r,{bands:[]});R(g,398,53,38,9.4,MBL);R(g,398,53,38,.7,'#ffffff');R(g,398,61.8,38,.6,tint(MBL,-.3));cutLetters(g,['ΣΥΝΑΓΩΓΗ','ΕΒΡΑΙΩΝ'],417,55.8,35,3.6);
  house(g,466,32,96,72,'#dccca4',r,{patch:2,cracks:3,beams:15});R(g,465,27.6,98,2,'#b8603c');for(let i=466;i<562;i+=4)R(g,i,27.6,.5,2,'rgba(90,40,24,.35)');
  R(g,494,56,34,48,tint(ST,-.1));R(g,494,56,34,1,tint(ST,.3));doorArt(g,498,60,26,42,'#7a5632',r,{bands:[]});R(g,492,102,38,2,tint(ST,.06));R(g,490,104,42,1.6,tint(ST,-.14));
  windowArt(g,474,44,10,9,'#dccca4',{bars:2});windowArt(g,540,44,10,9,'#dccca4',{shut:1});foliage(g,556,60,6,16,'#5f7a44',r,60);stroke(g,[558,104,557,80,555,62],'#5a4a36',1);
  /* the steps up to the marketplace, and the end of its colonnade */
  R(g,562,34,78,70,'#8f8aa0');for(let i=0;i<8;i++){R(g,566+i*1.6,99-i*5,74-i*1.6,5,tint('#d2c8ae',-.025*i));R(g,566+i*1.6,99-i*5,74-i*1.6,.8,'rgba(255,248,226,.5)');R(g,566+i*1.6,103.2-i*5,74-i*1.6,.8,'rgba(60,48,40,.34)')}
  R(g,596,30,44,34,'#4a4254');R(g,594,26,46,4.6,ST);R(g,594,26,46,.6,tint(ST,.3));for(let i=0;i<3;i++)col(g,604+i*15,64,34,5,ST,{fl:3,shade:.08*i});
  poly(g,[562,34,572,58,572,104,562,104],'#9a94a8');ao(g,562,34,78,10,'t',.3,'#2a2440');
  /* the booths of the spring of the games: cloth roofs on four legs, set at their corners */
  if(v==='s')for(const[x,c1,c2]of[[232,'#3f6f8a','#e6dcc0'],[538,'#a8642e','#e6dcc0']]){R(g,x+2,104,40,1.6,'rgba(40,30,60,.3)');wood(g,x,84,1.6,20,'#6a4e2c',1);wood(g,x+40,84,1.6,20,'#6a4e2c',1);
    awning(g,x-2,78,45.6,7,c1,c2,5.7);wood(g,x+2,96,37,2,'#8a683a');for(let i=0;i<4;i++)vessel(g,x+7+i*9,96,2.2,4+i%2,i%2?'#9a5a36':'#b8863c','jug',{noShadow:1})}
  pave(g,0,103,640,144,'#cdc09e',r,{vx:320,vy:58,rows:4,step:44,v:.07});ao(g,0,103,640,6,'t',.35,'#3a3050');
  if(v==='w'){/* wet stone: the sky lies in it, and water stands in the hollows */
    comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(200,210,222,.9)','rgba(200,210,222,.2)']);g.fillRect(0,104,640,40)});
    for(let i=0;i<16;i++){const x=20+r()*600,y=112+r()*28;oval(g,x,y,7+r()*9,1.2+r()*1.2,'rgba(86,98,116,.5)');oval(g,x-1,y-.3,4+r()*5,.6,'rgba(214,222,232,.5)')}}
  else shade(g,[36,104,640,104,640,v==='u'?113:110,36,v==='u'?116:112],SH,v==='u'?.44:.32);
  haze(g,640,103,v);if(v!=='w')pool(g,300,0,340,150,WARM[v],.1,'screen')},
 light:()=>SEAS()==='w'?{amb:'#c9cdd8'}:null,
 /* rain, in the winter; the water of the spring; and whoever is in the street in this season */
 draw(g,t){for(let i=0;i<3;i++){const k=((t/700+i*.33)%1);R(g,341.7,84+k*10,1.3,1.4,`rgba(230,246,250,${.7*(1-k)})`)}
  const v=SEAS();if(v==='s')cast(g,[['hx12c',70,116,1],['hx12d',86,119,-1],['hx12e',586,118,-1],['hx12f',352,114,1]]);
  else if(v==='u')cast(g,[['hx12c',78,116,1],['hx12f',600,117,-1]]);else if(v==='a')cast(g,[['hx12d',66,117,1]])},
 front(g,t){if(SEAS()==='w')rain(g,t,640)}};
/* rain: short slanting strokes that fall and are gone. None of them is long enough to cross anything. */
function rain(g,t,w,y1){const r=rng(1277),n=Math.round(w*.34);for(let i=0;i<n;i++){const x=r()*w,ph=r(),sp=.9+r()*.5,k=((t/520*sp+ph)%1),y=-6+k*((y1||144)+6);R(g,x-k*5,y,.5,3.4,'rgba(214,224,236,.42)')}}

/* ---------- The workshop of Aquila and Priscilla ---------- */
/* A room open to the street: a long bench, rolls of goat-hair cloth from Cilicia and of linen, coils of cord on their pegs, steps to
   the loft where they sleep. Tents were made of goat-hair cloth, of leather and of linen (The Watchtower, November 1, 2012). By night a
   lamp burns on the shelf. Everything in it is invented. */
const NIGHT=()=>!!((F.r2&&!F.night)||(F.word&&!F.stay2));
ART.shop12={w:320,q:12,variant:()=>NIGHT()?'n':SEAS()==='w'?'w':'d',
 paint(g,v){const r=rng(1203),W='#cdbb94',n=v==='n';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:5,brick:'#a8845a',t:.5});for(let i=10;i<320;i+=38)wood(g,i,0,6,9,'#5a4226',1);wood(g,0,9,320,2.6,'#6a4e2c');ao(g,0,11.6,320,12,'t',.44,'#2a2030');
  /* the opening onto the street: the paving, and the colonnade across the way */
  R(g,14,32,74,72,'#2a221c');if(n){g.fillStyle=lg(g,0,36,0,104,['#1a2444','#2a3050','#3a3a4c']);g.fillRect(18,36,66,68);for(let i=0;i<9;i++)R(g,22+r()*58,40+r()*22,.8,.8,'rgba(230,236,255,.8)')}
  else{g.fillStyle=lg(g,0,36,0,70,v==='w'?['#8d959c','#b9bfc0']:['#78a8d8','#dfe8e2']);g.fillRect(18,36,66,34);R(g,18,62,66,26,'#6a6070');R(g,18,58,66,4,'#d9cfb4');R(g,18,54,66,4,'#b9744e');for(let i=0;i<4;i++)col(g,26+i*17,88,26,4,'#d9cfb4',{fl:2});
    g.fillStyle=lg(g,0,88,0,104,['#cdc09e','#d8cdae']);g.fillRect(18,88,66,16);if(v==='w')for(let i=0;i<30;i++)R(g,18+r()*64,38+r()*62,.5,3,'rgba(220,228,238,.5)')}
  wood(g,12,30,78,3.6,'#6a4e2c');wood(g,12,30,3.6,74,'#5a4226',1);wood(g,86.4,30,3.6,74,'#5a4226',1);
  /* the shelf with its lamp; cord on pegs, each coil hanging from its own peg at the top of its ring */
  wood(g,212,52,30,2,'#7a5a34');R(g,222,48.4,8,3.6,'#b8733c');R(g,222,48.4,8,.7,'#e0a064');R(g,229.4,47.6,2.2,1.4,'#b8733c');
  for(const[x,c]of[[132,'#b89a62'],[150,'#8a6a40'],[168,'#c8b078']]){R(g,x-.8,38,1.6,2.6,'#4a3420');g.strokeStyle=tint(c,-.4);g.lineWidth=3.2;g.beginPath();g.ellipse(x,48,4.6,7,0,0,6.2832);g.stroke();g.strokeStyle=c;g.lineWidth=2;g.stroke();g.strokeStyle=tint(c,.3);g.lineWidth=.5;g.beginPath();g.ellipse(x-.6,48,4.6,7,0,3.6,5.6);g.stroke()}
  /* rolls of cloth: goat hair, dark and stiff, and paler linen */
  for(const[x,y,w,h,c]of[[236,103,30,10,GOAT],[238,93,28,9,'#4a3e34'],[241,84.4,24,8,GOAT],[204,103,26,9,LIN],[207,94.4,22,8,tint(LIN,-.1)]])roll(g,x,y,w,h,c);
  /* reeds in the corner, standing in a jar: they lean apart and do not cross */
  vessel(g,100,104,4.4,11,'#9a5a36','jar');for(let i=0;i<5;i++)stroke(g,[98.4+i*.8,93.4,95+i*2.4,62+((i*5)%7)],['#b8a868','#a89858','#c8b878'][i%3],.9);
  /* the water jar, and the steps to the loft: two stringers and the treads between them */
  vessel(g,116,104,5,13,'#8a4a2a','pithos');
  poly(g,[270,104,277,104,309,44,302,44],'#5a4226');poly(g,[288,104,295,104,320,58,320,46],'#6a4e2c');for(let i=0;i<7;i++){const k=i/7,x0=276+k*29,y0=98-k*52;poly(g,[x0,y0,x0+16,y0,x0+17,y0+2.4,x0+1,y0+2.4],'#8a683a');R(g,x0,y0,16,.6,'#b8905a')}
  R(g,296,26,24,20,'#2a221c');ao(g,296,26,24,8,'t',.5);
  /* the bench: a long table on two trestles, set at its ends */
  R(g,118,105,112,2,'rgba(30,22,40,.32)');wood(g,114,84,116,4,'#8a683a');R(g,114,84,116,.7,'#c8a06a');R(g,114,87.6,116,.8,'#4a3420');for(const x of[118,220]){poly(g,[x,88,x+6,88,x+8,104,x-2,104],'#5a4226');R(g,x,88,6,.6,'#7a5a34')}
  /* the floor: trodden earth */
  g.fillStyle=lg(g,0,103,0,144,['#a8946c','#b8a67c','#c4b48a']);g.fillRect(0,103,320,41);tex(g,'mott',.5,0,103,320,41,'overlay',1);for(let i=0;i<120;i++){const k=r(),y=104+k*40;R(g,r()*320,y,1+k*2.2,.5+k*.5,r()<.5?'rgba(80,62,40,.25)':'rgba(255,240,206,.2)')}
  ao(g,0,103,320,6,'t',.4,'#2a2030');
  if(n)lightmap(g,320,'#4a4460',l=>{pool(l,226,50,74,62,'#ffd9a0',1);pool(l,226,96,120,40,'#ffcf90',.7);pool(l,50,70,40,50,'#8a94c8',.5)});
  else lightmap(g,320,v==='w'?'#9a98a4':'#b0a69c',l=>{pool(l,50,74,84,74,v==='w'?'#e8ecf2':'#fff4d8',.95);pool(l,120,122,170,36,v==='w'?'#dfe3ea':'#ffeecc',.6)})},
 light:()=>NIGHT()?{amb:'#8a84a8',lamps:[[226,70,90,'#7a5a30']]}:{amb:SEAS()==='w'?'#d4d2da':'#e6dcd4'},
 draw(g,t){benchTop(g);if(NIGHT())flame(g,230,47,t)},front(){}};

/* ---------- The court of Titius Justus ---------- */
/* An open court between the wall that the house shares with the synagogue (left) and the front of the house (right). The Watchtower
   of November 1, 2012, says that Paul, working with Aquila, may have made linen sun awnings of the kind that covered the open court
   of a private house; Bearing Thorough Witness (chapter 19, paragraphs 10 and 18) says that this house became the place where the new
   congregation met. That Justus ordered such an awning, and everything in the court, is invented. */
const CV=()=>F.cen?'f':F.summer?'u':F.shook?'w':'a';
ART.court12={w:320,q:12,variant:CV,
 paint(g,v){const r=rng(1205),W='#dccca4',WL='#b9ad92',ST='#d2c8ae',wet=v==='w';
  sky(g,320,44,SKY[v]);if(wet)for(let i=0;i<4;i++)cloud(g,30+i*90,8+(i%2)*8,90,9,r,'#c9ccd0','#878d98');else{cloud(g,90,10,50,4,r);cloud(g,250,16,40,4,r)}
  R(g,36,22,248,10,'#b8603c');for(let i=38;i<284;i+=5)R(g,i,22,.5,10,'rgba(90,40,24,.3)');R(g,36,21.4,248,.8,'#d88a5c');
  plaster(g,36,30,248,74,W,r,{patch:2,cracks:4,brick:'#b08a5a'});R(g,36,30,248,1.6,tint(W,.16));ao(g,36,31.6,248,7,'t',.2,'#3a3060');
  R(g,58,54,30,50,tint(ST,-.1));doorArt(g,61,57,24,47,'#6a4a2c',r,{bands:[]});windowArt(g,150,46,12,10,W,{bars:2});
  /* the wall of the synagogue, at the left, in shade; and the front of the house, at the right, with its door */
  poly(g,[0,8,36,30,36,104,0,132],WL);clipTo(g,()=>poly(g,[0,8,36,30,36,104,0,132]),()=>{tex(g,'mott',.5,0,0,36,140,'overlay',1);for(let i=0;i<9;i++)stroke(g,[0,18+i*13,36,36+i*8],'rgba(50,40,60,.14)',.5);ao(g,26,30,10,74,'r',.18,'#2a2440')});
  poly(g,[320,8,284,30,284,104,320,132],tint(W,.04));clipTo(g,()=>poly(g,[320,8,284,30,284,104,320,132]),()=>{tex(g,'mott',.45,284,0,36,140,'overlay',1);poly(g,[296,56,312,50,312,124,296,112],'#3a2a1c');poly(g,[296,56,312,50,312,53,296,58.6],'#7a5a34');poly(g,[290,40,300,36,300,46,290,49],'#2a2420')});
  for(const[x,y]of[[22,42],[23,51],[24,60]]){R(g,x,y,2,2,'#2a2420');R(g,x,y,2,.6,'#6a625a')}for(const[x,y]of[[296,42],[295,51],[294,60]]){R(g,x,y,2,2,'#2a2420');R(g,x,y,2,.6,'#6a625a')}
  /* the bench by the door of the house; the mouth of the cistern */
  bench(g,236,89,44,ST);R(g,196,100,22,4,tint(ST,-.1));R(g,196,100,22,1,tint(ST,.3));R(g,199,101.4,16,1.8,'#2a2a32');
  if(v==='a'){poly(g,[142,100,186,100,190,105,138,105],'#b89a62');for(let i=0;i<26;i++)R(g,144+r()*40,100.6+r()*3.4,1.6,1.2,r()<.5?'#6a3a52':'#7a4a34')}
  else for(const x of[98,140]){stool(g,x,96,34)}
  if(v==='u'||v==='f')for(const x of[98,140])stool(g,x+4,99.4,34,'#7a5a34');
  for(const[x,c]of[[46,'#9a5a36'],[124,'#8a4a2a']])vessel(g,x,105,3.6,11,c,'jar');foliage(g,272,62,5,13,'#5f7a44',r,50);stroke(g,[274,90,273,74,271,62],'#5a4a36',1);
  pave(g,0,103,320,144,'#cbbf9e',r,{vx:160,vy:60,rows:4,step:42,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  if(wet){comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(200,210,222,.9)','rgba(200,210,222,.2)']);g.fillRect(0,104,320,40)});for(let i=0;i<8;i++){const x=20+r()*280,y=112+r()*28;oval(g,x,y,7+r()*8,1.2+r(),'rgba(86,98,116,.5)')}}
  else shade(g,[0,132,36,104,96,104,60,144,0,144],SH,.42);
  haze(g,320,103,v);if(!wet)pool(g,200,0,220,150,WARM[v],.1,'screen')},
 light:()=>CV()==='w'?{amb:'#c9cdd8'}:null,
 /* the rope from wall to wall, and the cloth on it, as it was last set */
 draw(g,t){const st=awn(),Y=[40,50,60],y0=Y[st.l],y1=Y[st.r],B=bays(st),yy=x=>y0+(y1-y0)*(x-30)/260;
  depth(104,()=>{stroke(g,[24,y0+1.5,30,y0,290,y1,296,y1+1.5],'#6a5438',.9);
   for(let b=0;b<4;b++)if(B[b]){const xa=30+b*65,xb=xa+65,c=st.n===2?GOAT:st.n===3&&b===st.q&&!(b===st.p||b===st.p+1)?tint(LIN,-.12):LIN;
     poly(g,[xa,yy(xa),xb,yy(xb),xb+9,yy(xb)+9,xa+9,yy(xa)+9]);g.fillStyle=lg(g,0,yy(xa),0,yy(xa)+9,[tint(c,.1),c,tint(c,-.28)]);g.fill();
     for(let i=1;i<6;i++)stroke(g,[xa+i*11,yy(xa+i*11)+.6,xa+i*11+8.4,yy(xa+i*11)+8.6],'rgba(40,30,30,.14)',.5);stroke(g,[xa+9,yy(xa)+9,xb+9,yy(xb)+9],tint(c,-.4),.6)}
   /* its shade on the floor, as one field under the cloth */
   if(awnDone()){const b0=B.indexOf(1),b1=B.lastIndexOf(1);if(b0>=0)comp(g,'multiply',.34,()=>poly(g,[40+b0*62,105,102+b1*62,105,112+b1*62,138,34+b0*62,138],SH))}});
  if(CV()==='u'&&F.r3)cast(g,[['hx12a',104,111,1],['hx12b',124,112,1],['hx12g',150,111,-1],['hx12h',170,112,1]])},
 front(g,t){if(CV()==='w'&&!(G.room==='court12'&&F.r2))rain(g,t,320)}};

/* ---------- The awning, seen from the side ---------- */
/* A close view, the game's fourth: the court cut through from the wall of the synagogue (left) to the front of the house (right). A
   rope runs from one of three hooks on the left to one of three on the right, and cloth hangs from it on rings; it is slid along
   the rope a quarter of the way at a time. The sun is not in the picture: its light is, worked out from where the cloth hangs and
   painted anew whenever it moves (lightField). In winter it rains, and what matters is where the water runs. */
const AX0=56,AX1=264,AFL=118,ATOP=20,HY=[36,52,68],BAY=(AX1-AX0)/4,ROUND_K=[0,.75,0,-.45];
/* the round that is being played: 1 in autumn, 2 in the rain, 3 a year on; and the state of the rope and the cloth */
const roundNo=()=>!F.r1?1:!F.r2?2:3,awnDone=()=>!!(roundNo()===1?F.r1:roundNo()===2?F.r2:F.r3)||(F.r1&&!F.shook)||(F.r2&&!F.summer);
const SOLVED={1:{l:1,r:2,p:2,q:0,n:1},2:{l:0,r:2,p:0,q:0,n:2},3:{l:1,r:1,p:1,q:3,n:3}},START={1:{l:0,r:0,p:0,q:0,n:1},2:{l:1,r:1,p:0,q:0,n:2},3:{l:2,r:2,p:0,q:0,n:3}};
function awn(){const n=F.r3?3:F.summer?(F.cloth2?3:1):F.shook?2:1;if(!G.aw12||G.aw12.n!==n)G.aw12=Object.assign({},(n===1?F.r1:n===2?F.r2:F.r3)?SOLVED[n]:START[n]);return G.aw12}
function bays(st){if(st.n===2)return[1,1,1,1];const B=[0,0,0,0];B[st.p]=B[st.p+1]=1;if(st.n===3)B[st.q]=1;return B}
const ropeY=(st,x)=>HY[st.l]+(HY[st.r]-HY[st.l])*(x-AX0)/(AX1-AX0);
/* dark: whether the point x,y in the court is in shade (or, in the rain, dry), with the light falling k across for every one down */
function dark(st,k,x,y){if(k>0&&y-(x-AX0)/k>ATOP)return true;if(k<0&&y-(AX1-x)/-k>ATOP)return true;
  const a=HY[st.l],m=(HY[st.r]-HY[st.l])/(AX1-AX0),yi=(a+m*(x-AX0)-m*k*y)/(1-m*k),xi=x-k*(y-yi);
  return yi<y-.5&&xi>=AX0&&xi<AX1&&!!bays(st)[Math.floor((xi-AX0)/BAY)]}
const allDark=(st,k,x0,x1,y)=>{for(let x=x0;x<=x1;x+=2)if(!dark(st,k,x,y))return false;return true},allLit=(st,k,x0,x1,y)=>{for(let x=x0;x<=x1;x+=2)if(dark(st,k,x,y))return false;return true};
/* what is in the court in each round: [name, x0, x1] */
const SEAT3=[['end',92,114],['mid',122,146],['mid',158,182],['door',194,218]],FIGS=[150,178],BENCH1=[226,258],READ=[60,74];
/* judge: what is wrong with the setting, as a word that the story answers, or '' when it holds */
function judge(st){const n=st.n,k=ROUND_K[n];
  if(n===1)return!allDark(st,k,BENCH1[0],BENCH1[1],112)?'bench':!allLit(st,k,FIGS[0],FIGS[1],117)?'figs':'';
  if(n===2)return st.l>st.r?'wall':st.l===st.r?'belly':st.r-st.l<2?'slow':'';
  for(const[w,x0,x1]of SEAT3.slice(0,3))if(!allDark(st,k,x0,x1,100))return w;if(!allLit(st,k,READ[0],READ[1],100))return'read';
  const[w,x0,x1]=SEAT3[3];return!allDark(st,k,x0,x1,100)?w:st.r===2?'hair':''}
/* lightField: the light that falls into the court, one room pixel at a time, kept until the setting changes */
function lightField(st){const k=ROUND_K[st.n],key=[st.n,st.l,st.r,st.p,st.q].join();if(G.lf12&&G.lf12.key===key)return G.lf12.c;const w=AX1-AX0,h=AFL-28,[c,x]=mk(w,h),im=x.createImageData(w,h),d=im.data;
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){if(!dark(st,k,AX0+i+.5,28+j+.5)){const o=(j*w+i)*4;d[o]=255;d[o+1]=240;d[o+2]=196;d[o+3]=((i+j)&1)?150:118}}
  x.putImageData(im,0,0);G.lf12={key,c};return c}
ART.awn12={w:320,q:12,variant:()=>roundNo()===1?'a':roundNo()===2?'w':'u',
 paint(g,v){const r=rng(1207),W='#d9caa2',ST='#c9bfa6';
  sky(g,320,60,SKY[v]);if(v==='w')for(let i=0;i<4;i++)cloud(g,30+i*90,6+(i%2)*8,90,9,r,'#c9ccd0','#878d98');else cloud(g,160,8,60,4,r);
  /* the far wall of the court, with the door of the house and the window over it */
  plaster(g,AX0,28,AX1-AX0,AFL-28,W,r,{patch:1,cracks:4,brick:'#b08a5a',top:-.02,bot:-.2});R(g,AX0,26,AX1-AX0,2.4,tint(W,.14));R(g,AX0,26,AX1-AX0,.6,tint(W,.36));
  comp(g,'multiply',v==='w'?.3:.46,()=>R(g,AX0,28,AX1-AX0,AFL-28,'#8f8cb4'));
  doorArt(g,228,74,24,44,'#6a4a2c',r,{bands:[]});windowArt(g,233,50,13,10,W,{bars:2});
  /* the two walls, cut through: on the left the synagogue's, on the right the house's; a tiled roof on each */
  for(const[x,c,out]of[[36,'#b7ab90',0],[264,'#c9bd9e',284]]){ashlar(g,x,ATOP,20,AFL-ATOP,c,r,{bw:10,bh:6,v:.08});ao(g,x,ATOP,20,AFL-ATOP,x<100?'l':'r',.2,'#2a2440');R(g,x-1,ATOP-2,22,2.4,tint(c,.14));R(g,x-1,ATOP-2,22,.6,tint(c,.36))}
  R(g,0,30,36,88,'#7f7890');poly(g,[0,22,36,ATOP+6,36,30,0,30],'#b8603c');R(g,0,36,36,82,'#6f6880');tex(g,'mott',.4,0,30,36,88,'overlay',1);
  R(g,284,30,36,88,'#b8ab8c');poly(g,[320,22,284,ATOP+6,284,30,320,30],'#b8603c');tex(g,'mott',.4,284,30,36,88,'overlay',1);
  for(const y of HY)for(const x of[AX0,AX1-3]){R(g,x,y-1,3,2.4,'#2a2420');R(g,x,y-1,3,.6,'#7a7268')}
  /* the floor, and the ground under it */
  R(g,0,AFL,320,3,tint(ST,.06));R(g,0,AFL,320,.7,tint(ST,.3));for(let i=8;i<320;i+=22+((i*7)%9))R(g,i,AFL+.8,.6,2.2,tint(ST,-.34));
  g.fillStyle=lg(g,0,AFL+3,0,144,['#7a6a50','#6a5a44','#5a4c3a']);g.fillRect(0,AFL+3,320,23);tex(g,'mott',.5,0,AFL+3,320,23,'overlay',1);for(let i=0;i<60;i++)R(g,r()*320,AFL+4+r()*20,1+r()*2,.6+r(),r()<.5?'rgba(40,30,20,.3)':'rgba(220,200,160,.16)');
  /* what stands in the court */
  if(v==='a'){stool(g,BENCH1[0],110,BENCH1[1]-BENCH1[0],'#8a683a');poly(g,[FIGS[0]-2,AFL,FIGS[1]+2,AFL,FIGS[1],AFL-1.6,FIGS[0],AFL-1.6],'#b89a62');for(let i=0;i<22;i++)R(g,FIGS[0]+1+r()*(FIGS[1]-FIGS[0]-3),AFL-3+r()*1.4,1.8,1.4,r()<.5?'#6a3a52':'#7a4a34')}
  else{for(const[,x0,x1]of SEAT3)stool(g,x0,110,x1-x0,'#8a683a');
    if(v==='w'){R(g,244,AFL-1.6,18,2.4,tint(ST,-.14));R(g,244,AFL-1.6,18,.6,tint(ST,.26));R(g,247,AFL-.8,12,1.6,'#22222a')}
    else{R(g,READ[0]+1,104,READ[1]-READ[0]-2,14,'#8a683a');R(g,READ[0],102,READ[1]-READ[0],2.4,'#a88048');R(g,READ[0],102,READ[1]-READ[0],.6,'#d8b078')}}
  if(v==='w')comp(g,'multiply',.3,()=>R(g,0,0,320,144,'#a9afbd'))},
 light:{amb:'#ffffff'},
 draw(g,t){const st=awn(),n=st.n,k=ROUND_K[n],B=bays(st),c0=n===2?GOAT:LIN;
  /* the light, on the far wall and on the floor */
  if(n!==2){const LF=lightField(st);for(let i=0;i<2;i++){g.save();g.globalCompositeOperation='soft-light';g.drawImage(LF,AX0,28,AX1-AX0,AFL-28);g.restore()}comp(g,'screen',.5,()=>g.drawImage(LF,AX0,28,AX1-AX0,AFL-28));
    for(let x=AX0;x<AX1;x+=2)if(!dark(st,k,x+1,AFL-.5))R(g,x,AFL,2,1.4,'rgba(255,244,206,.8)')}
  /* a year on: they sit on every bench, seen to the waist over it, and two stand by the door */
  if(n===3)depth(AFL,()=>{g.save();g.beginPath();g.rect(0,0,320,111.5);g.clip();cast(g,[['hx12a',103,AFL+13,1,{sw:0}],['hx12b',134,AFL+13,1,{sw:0}],['hx12g',170,AFL+13,-1,{sw:0}],['hx12h',206,AFL+13,-1,{sw:0}]],'#d8d2cc');g.restore();
    cast(g,[['hx12i',240,AFL,-1,{sw:0}],['hx12j',254,AFL,-1,{sw:0}]],'#d8d2cc')});
  /* the rope, hook to hook, and the cloth on it: each bay hangs a little, from ring to ring */
  stroke(g,[AX0+2,HY[st.l],AX1-2,HY[st.r]],'#6a5438',.9);
  for(let b=0;b<4;b++)if(B[b]){const xa=AX0+b*BAY,xb=xa+BAY,ya=ropeY(st,xa),yb=ropeY(st,xb),c=n===3&&b===st.q&&!(b===st.p||b===st.p+1)?tint(LIN,-.14):c0,P=[xa+1,ya+.4];
    for(let i=0;i<=6;i++){const u=i/6;P.push(xa+1+(BAY-2)*u,ya+(yb-ya)*u+2.6+Math.sin(u*Math.PI)*2.2)}P.push(xb-1,yb+.4);poly(g,P);g.fillStyle=lg(g,0,Math.min(ya,yb),0,Math.max(ya,yb)+5,[tint(c,.12),c,tint(c,-.32)]);g.fill();
    for(let i=0;i<4;i++){const u=(i+.5)/4,x=xa+BAY*u,y=ya+(yb-ya)*u;R(g,x-1,y-1,2,2,'#8a7a5a')}}
  /* in the rain: the water runs to the low end of the cloth and falls there; a cloth that does not slope fills, and drips through */
  if(n===2){const j=judge(st),lo=st.l>st.r?AX0+3:AX1-4,ph=(t/260)%1;
    if(j==='belly'||j==='slow'){const x=j==='belly'?160:196,y=ropeY(st,x)+5;for(let i=0;i<3;i++){const q=(ph+i/3)%1;R(g,x+i*7-7,y+q*(AFL-y),1,2.4,'rgba(200,220,240,.8)')}oval(g,x,AFL-.2,9,1.1,'rgba(120,140,170,.6)')}
    if(j!=='belly')for(let i=0;i<4;i++){const q=(ph+i/4)%1,y=(st.l>st.r?HY[st.l]:HY[st.r])+3;R(g,lo,y+q*(AFL-y),1.2,3,'rgba(200,220,240,.85)')}}},
 front(g,t){const st=awn();if(st.n===2){g.save();g.beginPath();g.rect(0,0,320,ATOP+8);g.rect(0,0,AX0,144);g.rect(AX1,0,320-AX1,144);g.clip();rain(g,t,320,AFL);g.restore();
    g.save();g.beginPath();for(let x=AX0;x<AX1;x+=4){const y=ropeY(st,x+2)-2;g.rect(x,ATOP,4,Math.max(0,y-ATOP))}g.clip();rain(g,t,320,AFL);g.restore()}
  G.caps12=[];const H=['high','middle','low'];cap12(g,T('rope: {l} at the wall, {r} at the house',{l:T(H[st.l]),r:T(H[st.r])}),160,131,300);
  cap12(g,st.n===2?T('one cloth of goat hair, wall to wall'):st.n===1?T('linen: {p}',{p:T(POS2[st.p])}):T('linen: {p}; new cloth: {q}',{p:T(POS2[st.p]),q:T(POS1[st.q])}),160,138.4,300)}};
const POS2=['by the wall','in the middle','by the house'],POS1=['first quarter','second quarter','third quarter','last quarter'];

/* ---------- The synagogue of Corinth ---------- */
ART.syn12={w:320,q:12,
 paint(g){const r=rng(1209),W='#ddd0ac',ST='#c6bca2';
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:4,brick:'#b08a5a',t:.45});for(let i=16;i<320;i+=40)wood(g,i,0,6,8,'#5a4226',1);wood(g,0,8,320,2.4,'#6a4e2c');ao(g,0,10.4,320,12,'t',.42,'#2a2030');
  for(const x of[96,150,204]){R(g,x-2,24,18,22,tint(W,-.2));g.fillStyle=lg(g,0,26,0,44,['#9aa6b4','#cfd4d2']);g.fillRect(x,26,14,18);for(let i=1;i<3;i++)R(g,x+i*4.6-.4,26,.8,18,'#5a4a36');ao(g,x,26,14,4,'t',.4);R(g,x-3,46,20,1.6,tint(W,.2))}
  R(g,268,44,38,60,tint(W,-.16));doorArt(g,271,47,32,57,'#5f4428',r,{bands:[]});
  bench(g,14,89,70,ST);bench(g,196,89,62,ST);
  R(g,112,104,62,3,'rgba(40,30,60,.34)');wood(g,110,88,62,4,'#8a683a');R(g,110,88,62,.7,'#c8a06a');R(g,110,91.6,62,.8,'#4a3420');wood(g,114,92,3,12,'#5a4226',1);wood(g,165,92,3,12,'#5a4226',1);
  R(g,130,86.4,18,1.8,'#e6dcc0');R(g,128,85.8,2.6,2.8,'#b89058');R(g,147.4,85.8,2.6,2.8,'#b89058');
  R(g,34,62,30,26,'#7a5632');R(g,34,62,30,.8,'#b08a5a');g.fillStyle=lg(g,0,58,0,74,['#7a5a8a','#5f4470','#463058']);g.fillRect(32,58,34,15);R(g,32,72,34,1.2,'#c9a14a');for(let i=0;i<5;i++)R(g,36+i*7,59.6,.5,9.6+(i%2)*1.4,'rgba(30,16,50,.3)');
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  lightmap(g,320,'#a8a0ac',l=>{for(const x of[103,157,211])pool(l,x,62,40,62,'#eef0f4',.8);pool(l,160,118,190,44,'#f4eede',.45)})},
 light:{amb:'#dcd6d8'},draw(g){cast(g,[['op12a',196,121,-1,{ges:1}],['sos12',220,118,-1],['op12b',240,124,-1],['op12c',62,119,1],['hx12b',84,123,1]],lightAt('syn12',200,120))},front(){}};

/* ---------- The neck of land, from above ---------- */
/* A picture, not a room: Corinth below its rock, a gulf on either side, and a harbor on each. Lechaeum, to the west, was the harbor
   for Italy, joined to the city by two long walls; Cenchreae, about 11 kilometers to the east, was the harbor for Asia, Syria and
   Egypt; and across the neck, where it is about 6 kilometers wide, ran a paved trackway on which small ships were hauled from sea to
   sea (Insight, "Corinth", "Cenchreae"; Bearing Thorough Witness, chapter 19, box; The Watchtower, March 1, 2009). No road on it
   crosses another, and each name stands clear of the shore. */
const W1=[0,0,214,0,204,12,190,26,166,36,130,44,90,50,44,55,0,60],W2=[320,144,320,36,290,30,262,34,236,30,216,38,214,56,224,76,236,98,228,120,236,144];
ART.isth12={w:320,q:10,variant:()=>SEAS()==='w'?'w':'d',
 paint(g,v){const r=rng(1211);g.fillStyle=lg(g,0,0,320,144,['#b39a62','#c2a86c','#b8a064']);g.fillRect(0,0,320,144);tex(g,'mott',.55,0,0,320,144,'overlay',1);
  for(let i=0;i<300;i++)oval(g,r()*320,r()*144,.8+r()*1.6,.5+r()*.8,rgba(r()<.5?'#d8c08a':'#7a6a3c',.28));
  for(const[x,y,rx,ry]of[[60,110,70,30],[280,12,40,16],[170,120,40,20]])pool(g,x,y,rx,ry,'#7f9050',.5,'source-over');
  for(const W of[W1,W2]){for(const[w,a]of[[9,.1],[5,.16],[2.4,.3]]){poly(g,W);g.lineWidth=w;g.strokeStyle=rgba('#8cd2d2',a);g.lineJoin='round';g.stroke()}
    poly(g,W);g.fillStyle=lg(g,0,0,320,144,['#1f4c78','#2a618e','#34729c']);g.fill();clipTo(g,()=>poly(g,W),()=>{tex(g,'mott',.4,0,0,320,144,'overlay',1);for(let i=0;i<160;i++)R(g,r()*320,r()*144,1.5+r()*3,.5,rgba(r()<.5?'#6aa6c8':'#163a60',.35))});
    poly(g,W);g.lineWidth=.7;g.strokeStyle='#5a4428';g.stroke()}
  /* hills: small peaks, lit from the north-west */
  for(const[x0,y0,x1,y1]of[[20,92,96,116],[240,8,304,18],[178,128,206,138]]){const n=Math.round(Math.hypot(x1-x0,y1-y0)/5);for(let k=0;k<n;k++){const u=k/n,x=x0+(x1-x0)*u+(r()-.5)*4,y=y0+(y1-y0)*u+(r()-.5)*3,w=2.4+r()*1.6,h=3+r()*2;
    poly(g,[x-w,y,x,y-h,x+w,y],'#7a5c38');poly(g,[x-w,y,x,y-h,x+w*.15,y],'#d6be88')}}
  /* the rock, and the city at its foot */
  {const P=[128,112,124,98,134,88,150,86,164,92,168,106,156,116,138,118];poly(g,P);g.fillStyle=lg(g,124,0,168,0,['#d6c49a','#a8926a','#7a6444']);g.fill();clipTo(g,()=>poly(g,P),()=>{tex(g,'mott',.5,120,84,52,36,'overlay',.6);ao(g,120,104,52,14,'b',.35,'#3a3024')});
   R(g,144,96,6,4,'#e6dcc4');R(g,144,95,6,1.2,'#f4ecd6')}
  for(const[x,y,w,h]of[[140,66,8,5],[150,64,9,6],[160,68,7,5],[146,73,8,5],[156,75,9,5],[136,74,7,4]]){R(g,x,y,w,h,'#e2d6b6');R(g,x,y,w,1.4,'#b8603c');R(g,x+w-1,y+1.4,1,h-1.4,'#a89c80')}
  /* the two long walls down to the western harbor; the road to the eastern one; the trackway for ships across the neck */
  poly(g,[140,64,146,63,122,48,117,50],'rgba(232,222,196,.9)');stroke(g,[140,64,117,50],'#8a7a5a',.6);stroke(g,[146,63,122,48],'#8a7a5a',.6);
  for(let i=0;i<=14;i++){const u=i/14,x=168+(214-168)*u,y=72+Math.sin(u*3.1)*-4+(u*2);R(g,x-.6,y-.6,1.4,1.4,'#6a4a2c')}
  stroke(g,[203,14,217,36],'rgba(236,228,206,.95)',2.6);stroke(g,[202,14,216,36],'#7a6a4a',.5);stroke(g,[204.4,14,218.4,36],'#7a6a4a',.5);
  /* the harbors, and ships in them: seen from above a hull is a pointed oval, and nothing stands on it */
  for(const[x,y,w]of[[112,46,12],[219,74,12]]){R(g,x-w/2,y-2,w,4,'#e2d6b6');R(g,x-w/2,y-2,w,1.2,'#b8603c')}
  const ship=(x,y,a)=>{g.save();g.translate(x,y);g.rotate(a);poly(g,[-4.4,0,-2,-1.5,2.6,-1.5,4.6,0,2.6,1.5,-2,1.5],'#5a3c20');poly(g,[-2.8,0,-1.4,-.8,2,-.8,3.2,0,2,.8,-1.4,.8],'#c8a674');g.restore()};
  if(v==='w')for(const[x,y,a]of[[104,52,.3],[98,54,.2],[226,66,1.2],[230,84,1.4],[226,90,1.3]])ship(x,y,a);
  else for(const[x,y,a]of[[70,30,.2],[98,40,-.4],[150,18,.1],[30,44,.3],[250,70,.5],[272,96,-.3],[296,60,.2],[244,112,1],[209,23,1]])ship(x,y,a);
  ao(g,0,0,320,14,'t',.3,'#0a1428');ao(g,0,130,320,14,'b',.3,'#0a1428');ao(g,0,0,16,144,'l',.3,'#0a1428');ao(g,304,0,16,144,'r',.25,'#0a1428');
  if(v==='w')comp(g,'multiply',.28,()=>R(g,0,0,320,144,'#a9afbd'))},
 light:{amb:'#ffffff'},draw(){},front(){}};

/* ---------- Cenchreae ---------- */
/* The eastern harbor: two piers that reached into the sea like a horseshoe, and room for ships 40 meters long (The Watchtower,
   March 1, 2009). In winter a ship is hauled out, and her mast is down. The far side of the gulf closes the view: no upright
   stands across the line of the sea. The sanctuaries of the harbor are not shown. */
ART.cen12={w:320,q:12,variant:()=>F.cen?'f':F.summer?'u':'w',
 paint(g,v){const r=rng(1213),ST='#cfc5a8',wet=v==='w';
  sky(g,320,52,SKY[v]);if(wet)for(let i=0;i<4;i++)cloud(g,30+i*90,8+(i%2)*8,90,9,r,'#c9ccd0','#878d98');else{cloud(g,70,12,50,4,r);cloud(g,240,8,56,4,r)}
  ridge(g,0,320,62,x=>10+5*Math.sin(x/47+2)+3*Math.sin(x/15)+4*Math.exp(-Math.pow((x-250)/60,2)),wet?['#7f8894','#8d9498']:['#8fa0b4','#a2aeae']);
  g.fillStyle=lg(g,0,60,0,104,wet?['#5a6f84','#4a6078','#52687c']:['#5d94bc','#3f78a8','#4a84ae']);g.fillRect(0,60,320,44);for(let i=0;i<90;i++){const y=61+r()*42;R(g,r()*320,y,2+r()*6*(y-58)/40,.5,wet?'rgba(214,224,236,.3)':'rgba(214,236,244,.4)')}
  /* the far pier, curving in from the right; and the near one, on which the sheds stand */
  poly(g,[320,64,250,66,190,69,150,73,150,76,190,73,250,71,320,71],ST);stroke(g,[320,64,250,66,190,69,150,73],tint(ST,.3),.7);poly(g,[320,71,250,71,190,73,150,76,320,76],'rgba(30,40,60,.3)');
  ashlar(g,0,46,128,58,'#cdc1a2',r,{bw:13,bh:6,v:.1});R(g,0,41,130,5,'#b8603c');for(let i=0;i<130;i+=5)R(g,i,41,.5,5,'rgba(90,40,24,.3)');R(g,0,40.4,130,.8,'#d88a5c');
  for(const x of[10,50,90]){arch(g,x,60,28,44,'#2e2838');g.save();arch(g,x,60,28,44);g.clip();ao(g,x,60,28,16,'t',.6);for(let i=0;i<3;i++)vessel(g,x+6+i*8,104,3,9+i%2*2,['#9a5a36','#8a4a2a','#a8642e'][i],'amph');g.restore()}
  poly(g,[128,46,136,52,136,104,128,104],'#9a94a8');
  /* the quay */
  pave(g,0,103,320,144,'#c9bd9c',r,{vx:160,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,5,'t',.3,'#3a3050');R(g,136,100,184,4,tint(ST,-.12));R(g,136,100,184,.8,tint(ST,.24));
  for(const x of[150,214,290]){R(g,x,96,5,5,'#5a5248');R(g,x,96,5,1,'#8a8278')}
  if(wet){/* a ship hauled out for the winter: the hull on its side timbers, the mast taken down and laid along the quay */
    R(g,150,104,112,2,'rgba(30,30,50,.3)');const H=[152,92,160,84,176,80,236,80,254,76,264,70,262,84,252,96,236,102,176,102,160,99];poly(g,H);g.fillStyle=lg(g,0,70,0,102,['#8a6238','#6a4a2a','#4a3220']);g.fill();
    clipTo(g,()=>poly(g,H),()=>{for(let i=0;i<4;i++)stroke(g,[152,86+i*4.4,264,84+i*4.2],'rgba(30,20,12,.4)',.5);tex(g,'wood',.5,150,70,116,34,'overlay',.6)});stroke(g,[160,84,176,80,236,80,254,76,264,70],'#b8905a',.7);
    for(const x of[170,200,232])poly(g,[x,102,x+3,102,x+8,108,x+5,108],'#5a4226');
    comp(g,'screen',.3,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(200,210,222,.9)','rgba(200,210,222,.2)']);g.fillRect(0,104,320,40)})}
  else{/* a ship for Asia at the quay: her stern, and the plank to her; her mast stands beyond the picture's edge */
    const H=[236,84,244,74,258,70,320,68,320,100,262,100,244,96];poly(g,H);g.fillStyle=lg(g,0,68,0,100,['#8a6238','#6a4a2a','#4a3220']);g.fill();
    clipTo(g,()=>poly(g,H),()=>{for(let i=0;i<4;i++)stroke(g,[236,78+i*5,320,76+i*5],'rgba(30,20,12,.4)',.5);tex(g,'wood',.5,236,66,84,36,'overlay',.6)});stroke(g,[236,84,244,74,258,70,320,68],'#b8905a',.7);
    poly(g,[250,100,262,100,246,108,232,108],'#9a7448');stroke(g,[250,100,232,108],'#5a4226',.6);
    shade(g,[136,104,320,104,320,112,136,110],SH,.32)}
  haze(g,320,103,v);if(!wet)pool(g,180,0,240,150,WARM[v],.1,'screen')},
 light:()=>F.summer||F.cen?null:{amb:'#c9cdd8'},draw(){},front(g,t){if(!F.summer&&!F.cen)rain(g,t,320)}};

/* ---------- The marketplace, and the judgment seat ---------- */
/* The marketplace, lined with colonnades and rows of shops (Insight, "Corinth"), seen toward the south, with the rock over it. Near its
   middle the judgment seat: a raised platform of white and blue marble with fine carving, standing out from the terrace between the
   upper and the lower level, with a waiting room beside it (Insight, "Corinth", "Judgment Seat"; the Study Edition's media note
   "Judgment Seat in Corinth"). In the spring the seat stands empty: the proconsul's year began with the summer (Insight, "Gallio"). */
const HEARING=()=>!!(F.stay2&&(F.opA||F.opB)&&!F.gallio);
ART.agora12={w:480,q:12,variant:()=>SEAS()+(HEARING()?'h':''),
 paint(g,vv){const v=vv[0],r=rng(1215),ST='#dbd1b6',PV='#cfc3a2';
  sky(g,480,72,SKY[v]||SKY.u);cloud(g,60,10,50,4,r);cloud(g,400,14,46,4,r);
  ridge(g,0,480,72,x=>8+5*Math.sin(x/61+2)+3*Math.sin(x/19),['#9aa8b8','#aab4ac']);R(g,0,70,480,36,'#b2a878');rock(g,150,76,1.14,r);
  /* the terrace of the upper level, with its colonnade and shops */
  colonnade(g,24,96,432,46,13,ST,{beam:5,cw:5.2,back:()=>{R(g,24,60,432,36,'#7a6a62');for(let i=0;i<9;i++){const x=40+i*47;R(g,x,68,22,28,'#3a3038');R(g,x,68,22,1,'#8a7c62');if(i%3!==1)vessel(g,x+11,96,3,8,i%2?'#9a5a36':'#b8863c',i%2?'jar':'jug',{noShadow:1})}}});
  ashlar(g,0,96,480,8,'#c9bfa4',r,{bw:16,bh:4,v:.08});R(g,0,96,480,.8,'#eee6cc');
  /* the judgment seat: white and blue marble, in panels, with a band of fine carving along its top */
  R(g,200,106,124,2,'rgba(40,30,60,.3)');R(g,196,80,124,24,MBL);for(let i=0;i<6;i++){const x=198+i*20.4;R(g,x,85,18,16,i%2?BLU:tint(MBL,-.06));R(g,x,85,18,.7,i%2?tint(BLU,.3):'#ffffff');R(g,x+17.3,85,.7,16,i%2?tint(BLU,-.3):tint(MBL,-.3))}
  R(g,194,77,128,3.6,tint(MBL,.04));R(g,194,77,128,.7,'#ffffff');R(g,194,80.2,128,.6,tint(MBL,-.3));for(let i=0;i<40;i++)R(g,197+i*3.1,82,1.6,1.4,i%2?tint(BLU,-.1):tint(MBL,-.2));
  tex(g,'mott',.3,194,77,128,27,'overlay',.6);
  for(let i=0;i<5;i++){R(g,176+i*4,100-i*4.6,20-i*4,4.6+i*4.6,tint(MBL,-.05*i-.04));R(g,176+i*4,100-i*4.6,20-i*4,.7,'#ffffff')}
  /* the seat on it: a chair of marble with a high back, and a cloth over its front */
  R(g,246,56,26,21,tint(MBL,-.1));R(g,246,56,26,.8,'#ffffff');R(g,244,66,3.4,11,tint(MBL,-.2));R(g,270.6,66,3.4,11,tint(MBL,-.24));
  g.fillStyle=lg(g,0,68,0,78,['#8a3a4a','#6a2a3a']);g.fillRect(248,68,22,9.4);R(g,248,68,22,.7,'#b8606e');
  /* the waiting room beside it */
  R(g,320,66,40,38,tint(MBL,-.08));R(g,318,62,44,4.4,tint(MBL,.04));R(g,318,62,44,.7,'#ffffff');R(g,330,76,18,28,'#2a2430');R(g,330,76,18,1,'#8a8272');ao(g,330,76,18,8,'t',.5);tex(g,'mott',.3,320,62,40,42,'overlay',.6);
  if(v==='u'||v==='f'){poly(g,[60,105,118,105,122,110,56,110],'#a8926a');for(const[x,y,k,c,w,h]of[[66,107,'jar','#9a5a36',3,8],[75,108,'jug','#8a4a2a',2.6,6],[84,107,'amph','#a8642e',3,10],[94,108,'bowl','#b06a3a',3.4,2.6],[103,107,'jar','#7a4226',2.8,7],[112,108,'jug','#9a5a36',2.4,5.4]])vessel(g,x,y,w,h,c,k)}
  pave(g,0,103,480,144,PV,r,{vx:240,vy:56,rows:4,step:46,v:.07,rand:1});ao(g,0,103,480,6,'t',.3,'#3a3050');
  shade(g,[24,104,456,104,470,111,10,112],SH,.28);haze(g,480,103,v);pool(g,240,0,300,150,WARM[v]||WARM.u,.1,'screen')},
 light:null,
 draw(g,t){const h=HEARING();if(h){/* the proconsul on the seat: seen to the waist, behind the cloth of the chair */
    depth(100,()=>{g.save();g.beginPath();g.rect(230,20,60,48);g.clip();man(g,259,92,'gal12',1,0,null,G.g12&&G.g12.say?1:0,0);g.restore();cast(g,[['lic12',214,80,1,{sw:0}],['lic12b',304,80,-1,{sw:0}]])})}
  if(h&&!(G.g12&&G.g12.gone))cast(g,[['op12a',150,120,1,{ges:1}],['sos12',170,116,1],['op12b',132,124,1],['op12c',116,118,1],['hx12c',350,118,-1],['hx12d',372,122,-1],['hx12e',394,117,-1],['hx12m',98,126,1]]);
  else if(!h)cast(g,SEAS()==='s'?[['hx12c',400,118,-1],['hx12e',60,120,1]]:[['hx12d',410,119,-1],['hx12f',52,121,1]])},front(){}};

/* ---------- The waiting room beside the judgment seat ---------- */
/* A room where those who were to come before the magistrate waited, with a floor of mosaic and a bench of marble (Insight, "Judgment
   Seat"). The floor is an uneven field of small stones in a plain border: no pattern, and no four of them set two by two. */
ART.wait12={w:320,q:12,
 paint(g){const r=rng(1217),W='#d8ceb8';
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:3,t:.4});for(let i=0;i<5;i++){const x=70+i*48;R(g,x,22,40,54,tint(W,-.07));R(g,x,22,40,.8,tint(W,.2));R(g,x+39.2,22,.8,54,tint(W,-.24));R(g,x,75.2,40,.8,tint(W,-.24))}
  R(g,0,78,320,3,tint(MBL,.04));R(g,0,78,320,.7,'#ffffff');
  /* the doorway onto the square: the side of the platform, in the sun */
  R(g,14,26,46,78,'#2a2430');g.fillStyle=lg(g,0,30,0,70,['#78a8d8','#e2e8de']);g.fillRect(18,30,38,40);R(g,18,62,38,26,MBL);for(let i=0;i<2;i++)R(g,20+i*19,66,17,18,i?BLU:tint(MBL,-.06));R(g,18,60,38,3,'#ffffff');R(g,18,88,38,16,'#cfc3a2');
  R(g,12,24,50,3,tint(MBL,-.1));R(g,12,24,3,80,tint(MBL,-.16));R(g,59,24,3,80,tint(MBL,-.2));
  /* the bench of marble along the wall */
  R(g,84,105,200,2,'rgba(40,30,60,.3)');g.fillStyle=lg(g,0,86,0,104,[tint(MBL,.04),tint(MBL,-.1),tint(MBL,-.26)]);g.fillRect(82,86,200,18);R(g,80,84,204,3,MBL);R(g,80,84,204,.7,'#ffffff');for(const x of[84,272])R(g,x,87,7,17,tint(MBL,-.2));tex(g,'mott',.3,80,84,204,20,'overlay',.6);
  /* the mosaic floor */
  R(g,0,103,320,41,'#b9ad92');for(let i=0;i<1500;i++){const k=r(),y=106+k*37,x=r()*320,s=1.2+k*1.6;R(g,x,y,s*(1+r()*.5),s*.6,['#e6dcc4','#8a8474','#c9a878','#6f7f94','#d8ceb4','#a8563e'][(r()*6)|0])}
  R(g,0,104,320,2.2,'#4a4250');R(g,0,141,320,3,'#4a4250');ao(g,0,103,320,6,'t',.35,'#3a3050');
  lightmap(g,320,'#a8a4b0',l=>{pool(l,40,70,70,80,'#fff4d8',.95);pool(l,110,124,170,36,'#ffeecc',.6)})},
 light:{amb:'#dcd8dc'},draw(){},front(){}};

/* ---------- Ephesus ---------- */
/* A quay, and a street that climbs from it to the door of a synagogue (Acts 18:19). The temple of the city is not in this picture:
   it is kept for the chapter in which the account turns on it. Everything here is invented. */
ART.eph12={w:320,q:12,
 paint(g){const r=rng(1219),W='#e0d2ae';
  sky(g,320,60,SKY.f);cloud(g,80,12,50,4,r);cloud(g,250,8,50,4,r);
  ridge(g,0,320,64,x=>12+7*Math.sin(x/53+1)+4*Math.sin(x/17),['#9aa8b8','#a9b2aa']);ridge(g,90,320,84,x=>16+8*Math.exp(-Math.pow((x-250)/80,2))+2*Math.sin(x/11),['#b6b17e','#a49f6a']);
  for(let i=0;i<8;i++)foliage(g,110+i*26+r()*8,70+r()*5,6,3,'#6f8250',r,18);for(const[x,y,h]of[[120,76,12],[300,72,14]])cypress(g,x,y,h);
  g.fillStyle=lg(g,0,62,0,104,['#5d94bc','#3f78a8','#4a84ae']);g.fillRect(0,62,96,42);for(let i=0;i<40;i++){const y=63+r()*40;R(g,r()*96,y,2+r()*5,.5,'rgba(214,236,244,.4)')}
  R(g,96,62,34,42,'#a8a070');foliage(g,112,84,12,6,'#7c8a52',r,40);R(g,96,100,34,4,'#bcb298');
  /* the stern of the ship that brought them */
  {const H=[0,70,54,72,66,76,76,86,70,98,56,102,0,102];poly(g,H);g.fillStyle=lg(g,0,70,0,102,['#8a6238','#6a4a2a','#4a3220']);g.fill();clipTo(g,()=>poly(g,H),()=>{for(let i=0;i<4;i++)stroke(g,[0,78+i*5,78,80+i*5],'rgba(30,20,12,.4)',.5);tex(g,'wood',.5,0,68,80,36,'overlay',.6)});
   stroke(g,[0,70,54,72,66,76,76,86],'#b8905a',.7);poly(g,[74,88,80,72,85,64,88,65,84,74,80,89],'#6a4a2a');poly(g,[58,102,70,102,88,108,74,108],'#9a7448')}
  /* houses up the street; the door of the synagogue, with a porch of two posts at its ends */
  house(g,128,48,70,56,W,r,{patch:2,cracks:3,beams:13});R(g,127,43.6,72,2,'#b8603c');windowArt(g,142,62,10,9,W,{shut:1});doorArt(g,170,66,18,38,'#6a4a2c',r,{bands:[]});
  house(g,198,36,122,68,'#e6dabb',r,{patch:1,cracks:3,beams:0});R(g,197,31.6,124,2,'#b8603c');for(const x of[210,292]){R(g,x-1.6,50,12.2,14,tint('#e6dabb',-.2));R(g,x,51.6,9,11,'#2a2420');for(let i=1;i<3;i++)R(g,x+i*3-.4,51.6,.8,11,'#6a5a44')}
  R(g,236,58,40,46,tint('#e6dabb',-.14));doorArt(g,242,62,28,42,'#5f4428',r,{bands:[]});R(g,234,54,44,4.4,'#d9cfb4');R(g,234,54,44,.7,'#f4ecd6');
  for(const[x,c,k]of[[104,'#9a5a36','amph'],[112,'#8a4a2a','amph'],[120,'#a8642e','jar']])vessel(g,x,105,3.4,11,c,k);sack(g,96,105,5,8,'#c8b890');
  pave(g,0,103,320,144,'#cdc09e',r,{vx:200,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');R(g,0,100,96,4,'#bcb298');R(g,0,100,96,.8,'#e6dcc4');for(const x of[40,86]){R(g,x,96,5,5,'#5a5248');R(g,x,96,5,1,'#8a8278')}
  shade(g,[128,104,320,104,320,112,120,113],SH,.32);haze(g,320,103,'f');pool(g,160,0,220,150,WARM.f,.1,'screen')},
 light:null,draw(g){cast(g,[['hx12k',226,114,1],['hx12l',288,115,-1]])},front(){}};

/* ---------- Antioch ---------- */
/* The court in Antioch of Syria where the journey began (Acts 15:35, 40), painted anew, in the light of evening. */
ART.ant12={w:320,q:12,
 paint(g){const r=rng(1221),W='#e2d2aa';
  sky(g,320,50,['#5a7ab4','#a8b0c8','#e8c8a0','#f4d8a8']);cloud(g,90,14,60,5,r,'#ffe8c8','#b89ab0');cloud(g,250,10,50,4,r,'#ffe8c8','#b89ab0');
  ridge(g,0,320,52,x=>12+8*Math.sin(x/61)+4*Math.sin(x/23+1),['#8f8aa8','#a89a9c']);
  plaster(g,0,36,320,68,W,r,{patch:3,cracks:5,brick:'#b08a5a'});R(g,0,32,320,4.6,tint(W,.12));R(g,0,32,320,.6,tint(W,.36));for(let i=4;i<320;i+=10){R(g,i,28,6,4.4,tint(W,.06));R(g,i,28,6,.6,tint(W,.3))}
  /* the gate, open: the street beyond it */
  R(g,128,48,60,56,tint(W,-.2));arch(g,134,52,48,52);g.fillStyle=lg(g,0,52,0,104,['#e8c8a0','#c8b090','#b8a888']);g.fill();g.save();arch(g,134,52,48,52);g.clip();R(g,134,84,48,20,'#c2b594');R(g,140,70,12,14,'#d8caa4');R(g,158,66,14,18,'#c8b890');ao(g,134,52,48,12,'t',.4);g.restore();
  boards(g,122,58,12,46,4,'#6a4a2c',r);boards(g,182,58,12,46,4,'#6a4a2c',r);
  /* an olive tree, benches, jars */
  stroke(g,[42,104,40,84,46,70],'#5a4a36',3);stroke(g,[41,86,32,72],'#5a4a36',2);foliage(g,44,58,26,15,'#6f8456',r,220);foliage(g,58,64,14,9,'#84966a',r,60);
  bench(g,212,89,84,'#cfc5a8');stool(g,70,96,36);for(const[x,c,k]of[[204,'#9a5a36','jar'],[304,'#8a4a2a','pithos']])vessel(g,x,105,k==='pithos'?5:3.6,k==='pithos'?14:10,c,k);
  pave(g,0,103,320,144,'#cdbf9c',r,{vx:160,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  shade(g,[0,104,320,104,320,118,0,122],'#9a8cb8',.4);comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,0,144,['rgba(255,214,150,.5)','rgba(255,200,140,.9)']);g.fillRect(0,0,320,144)});pool(g,160,60,200,90,'#ffd8a0',.14,'screen')},
 light:{amb:'#f4e2cc'},draw(g){cast(g,[['hx12m',96,116,1],['hx12n',232,114,-1],['hx12b',254,117,-1],['hx12a',70,121,1]],'#f4e2cc')},front(){}};

/* ---------- The letter, seen close ---------- */
/* A sheet of papyrus on the bench: its fibers run one way, the lines of writing are short strokes of uneven length that stop short of
   the edge, and the reed lies beside the sheet, not across it. G.let12 says how many lines stand on it. */
function letter12(g,t){const r=rng(1223),n=(G.let12||{n:0}).n;R(g,0,0,VW,VH,'#6a4e2c');for(let i=0;i<34;i++)R(g,0,i*4.4+r()*2,VW,.6,r()<.5?'rgba(40,26,14,.35)':'rgba(190,150,100,.18)');
  R(g,96,14,132,116,'rgba(20,12,8,.4)');R(g,92,10,132,116,'#e2d4a8');for(let i=0;i<50;i++)R(g,92,11+i*2.3+r(),132,.5,r()<.5?'rgba(150,120,70,.3)':'rgba(255,246,214,.3)');R(g,92,10,132,.8,'#f4e8c0');
  for(let j=0;j<Math.min(n,17);j++){let x=102+(j%5===0?8:0);const y=20+j*5.9,end=j===Math.min(n,17)-1?150+r()*30:206+r()*8;while(x<end){const l=2.6+r()*5.4;R(g,x,y,Math.min(l,end-x),1.1,'rgba(36,26,22,.86)');x+=l+1.6}}
  poly(g,[246,104,250,102,286,34,283,32],'#b8a868');poly(g,[246,104,250,102,251.4,98,248,97],'#2a1c16');
  oval(g,262,116,13,6.4,'#7a4226');oval(g,262,114.6,11,4.6,'#1a1210');oval(g,259,113.6,5,1.6,'rgba(120,110,140,.5)');oval(g,54,104,11,7,'#c9b888');oval(g,51,102,3,2,'#a89868');oval(g,58,106,2.4,1.6,'#a89868');
  comp(g,'multiply',.5,()=>{g.fillStyle=rg(g,160,70,220,['#fff0d0','#7a6a70']);g.fillRect(0,0,VW,VH)})}
const dark12=DARK;   /* the engine's dark scene: what is told in it is read from the narrator's scroll */

/* ============ CAST ============ */
/* Aquila and Priscilla are Jews from Rome: he in a tunic and mantle, she in a long tunic with the mantle over her head. Titius Justus,
   Stephanas and Gaius wear the Greek mantle of Chapter Eleven (himation:1); craftsmen and seamen the short tunic. Timothy looks as he
   did in Chapters Nine and Ten; Silas, three years on the road, has the first grey in his hair and beard. Paul is the Paul of the second
   journey (paulLook in index.html), and after Cenchreae the same man with his hair clipped short. The older men show the stages of
   hair loss that the engine knows. The proconsul wears the white garment of a Roman magistrate with its colored border. */
const HIM=(skin,hair,tunic,cloak,o)=>Object.assign({skin,hair,beard:hair,tunic,cloak,long:1,himation:1,brow:tint(hair,-.3),ph:0},o);
const AQL={skin:'#b8845a',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#b9a888',cloak:'#56687a',belt:'#3a2a1a',brow:'#2a1a12',ph:400};
Object.assign(LOOK,{
  paul12c:Object.assign(paulLook(12),{crop:1}),
  aquila12:AQL,aq12:Object.assign({},AQL),
  prisca12:{skin:'#c8a078',veil:'#8a4a52',tunic:'#cdb890',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,trim:'#8a4a52',brow:'#3a2414',ph:1200},
  silas12:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',grey:'#72665c',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  timothy12:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  justus12:HIM('#c08c5c','#8a8a8a','#ece4d0','#8a6a4a',{receding:1,ph:800}),
  crispus12:{skin:'#b88a62',hair:'#6a6a6a',beard:'#6a6a6a',receding:1,longBeard:1,brow:'#3a3a3a',tunic:'#e8e0cc',long:1,stripe:'#3f5f86',belt:'#4a3a24',cloak:'#7a6a8a',ph:1600},
  steph12:HIM('#b47e52','#2a1a12','#e6dec8','#6a8a6a',{ph:300}),gaius12:HIM('#c69870','#5a4026','#ece4d0','#a8804a',{beard:null,ph:2000}),
  gal12:HIM('#c89a70','#7a7a7a','#f4efe2','#f4efe2',{beard:null,edge:'#7a2a4a'}),
  lic12:{skin:'#b47e52',hair:'#2a1a12',tunic:'#e6dec8',cloak:'#8a3a3a',belt:'#4a3a24',brow:'#1a1210',ph:0},lic12b:{skin:'#c69870',hair:'#5a4026',tunic:'#e6dec8',cloak:'#8a3a3a',belt:'#4a3a24',brow:'#2a1a12',ph:0},
  sos12:{skin:'#b88a62',hair:'#3a2a1a',beard:'#3a2a1a',brow:'#2a1a12',tunic:'#e2dac6',long:1,stripe:'#5a3a6a',belt:'#4a3a24',cloak:'#6a5a4a',ph:0},
  sabin12:{skin:'#c69870',hair:'#5a4026',tunic:'#c8b490',cloak:'#7a3a2a',belt:'#4a3a24',brow:'#2a1a12',ph:2300},
  marc12:{skin:'#b47e52',hair:'#8a8a8a',beard:'#8a8a8a',thin:1,tunic:'#a89c7c',belt:'#5a4a30',brow:'#5a5a5a',ph:900},
  kal12:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#7a8a9a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:1500},
  prax12:{skin:'#c08c5c',hair:'#3a2616',tunic:'#e8e0cc',belt:'#8a3a2a',slim:1,brow:'#2a1a12',ph:600},
  euph12:{skin:'#b8845a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#b89a62',belt:'#3f6f8a',cloak:'#3f6f8a',brow:'#1a1210',ph:1900},
  thra12:{skin:'#a8703f',hair:'#5a4026',beard:'#5a4026',tunic:'#b08a6a',belt:'#4a3a24',bald:1,brow:'#3a2a1a',ph:1100},
  dec12:HIM('#c89a70','#3a2a1a','#ece4d0','#9a8a6a',{beard:null,slim:1,ph:2100}),
  philon12:{skin:'#b88a62',hair:'#d0d0d0',beard:'#d0d0d0',thin:1,longBeard:1,brow:'#9a9a9a',tunic:'#ece4d0',long:1,stripe:'#3f5f86',belt:'#4a3a24',cloak:'#8a7a5a',ph:500},
  att12:{skin:'#b47e52',hair:'#2a1a12',tunic:'#e6dec8',cloak:'#8a3a3a',belt:'#4a3a24',brow:'#1a1210',ph:1300},
  /* seen, and not named */
  op12a:{skin:'#b47e52',hair:'#2a1a12',beard:'#2a1a12',tunic:'#8a6a4a',long:1,belt:'#2e2016',cloak:'#4a4a5a',ph:0},op12b:{skin:'#c69870',hair:'#8a8a8a',beard:'#8a8a8a',receding:1,longBeard:1,tunic:'#d8d0b8',long:1,belt:'#4a3a24',ph:0},
  op12c:{skin:'#b88a62',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#9a8a6a',long:1,belt:'#2e2016',stripe:'#5a3a3a',ph:0},
  hx12a:{skin:'#b47e52',hair:'#c8c8c8',beard:'#c8c8c8',longBeard:1,bald:1,tunic:'#9a8a6a',long:1,belt:'#2e2016',brow:'#8a8a8a',ph:0},hx12b:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  hx12c:{skin:'#b8845a',hair:'#2a1a12',beard:'#2a1a12',tunic:'#a8946a',belt:'#4a3a24',brow:'#1a1210',ph:0},hx12d:HIM('#c69870','#5a4026','#e0d8c0','#8a6a5a',{beard:null}),
  hx12e:{skin:'#a8703f',hair:'#2a1a12',tunic:'#8a9a8a',belt:'#3a2a1a',slim:1,brow:'#1a1210',ph:0},hx12f:{skin:'#c8a078',veil:'#e2dccb',tunic:'#b8503c',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#e2dccb',ph:0},
  hx12g:{skin:'#c8a078',veil:'#5f7f6a',tunic:'#d8c8a0',long:1,belt:'#6a4a2a',slim:1,longSleeve:1,ph:0},hx12h:{skin:'#b47e52',hair:'#2a1a12',tunic:'#a89c7c',belt:'#5a4a30',slim:1,brow:'#1a1210',ph:0},
  hx12i:HIM('#b8845a','#3a2a1a','#e6dec8','#7a8a9a'),hx12j:{skin:'#c69870',hair:'#5a4026',tunic:'#b8a684',belt:'#4a3a24',brow:'#2a1a12',ph:0},
  hx12k:{skin:'#b88a62',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#d8d0b8',long:1,belt:'#4a3a24',stripe:'#6a4a3a',ph:0},hx12l:{skin:'#c69870',hair:'#8a8a8a',beard:'#8a8a8a',thin:1,fullBeard:1,tunic:'#8a7a6a',long:1,belt:'#2e2016',cloak:'#5a5a6a',ph:0},
  hx12m:{skin:'#b47e52',hair:'#5a4026',beard:'#5a4026',tunic:'#c4b08a',belt:'#3a2414',cloak:'#7a5a3a',brow:'#2a1a12',ph:0},hx12n:{skin:'#c08c5c',hair:'#d0d0d0',beard:'#d0d0d0',receding:1,longBeard:1,tunic:'#e2dac6',long:1,belt:'#4a3a24',brow:'#9a9a9a',ph:0}});
/* Aquila and Priscilla are one actor with a mate (see drawActor in index.html). aquila12 is the two of them in the scenes; aq12 is the
   same two when they can be played, from the day Paul lays down the awl until he leaves them at Ephesus: a second actor, so that
   the first can stand in a room without being played, as with Timothy in Chapter Ten. PR is Priscilla's voice and place. */
const AQ=actor('aquila12','Aquila and Priscilla','#b8d0e8',112),AP=actor('aq12','Aquila and Priscilla','#b8d0e8',112),
  SI=actor('silas12','Silas','#9fd8c8',118),TI=actor('timothy12','Timothy','#b8e0b0',150),TJ=actor('justus12','Titius Justus','#f0d8a8',96),
  CR=actor('crispus12','Crispus','#d8d0f0',88),SP=actor('steph12','Stephanas','#b8e0b0',104),GA=actor('gaius12','Gaius','#f0c8a0',128),
  SB=actor('sabin12','Sabinus','#e8b8a0',120),MA=actor('marc12','Marcellus','#e0d8c0',100),KA=actor('kal12','Kallistos','#a8c8e8',108),
  PX=actor('prax12','Praxias','#f0e8b8',146),EU=actor('euph12','Euphron','#a8d8e0',116),TR=actor('thra12','Thrason','#e8c8a0',94),
  DE=actor('dec12','Decimus','#d8d8c8',134),PH=actor('philon12','Philon','#e0e0f0',90),AT=actor('att12','attendant','#e0c0b0',110);
const pairOn=()=>!!F.laid&&!F.eph,PAIR=()=>AP.room?AP:AQ;
const PR={color:'#f0b8c0',pitch:186,name:'Priscilla',talk:false,get room(){return PAIR().room},get x(){const a=PAIR();return a.x-13*a.dir},get y(){return PAIR().y}};
const MATE={fig:'prisca12',dx:-13,get talk(){return PR.talk}};AQ.mate=MATE;AP.mate=MATE;AQ.called=AP.called='Aquila';

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 18:1-22, verse by verse, told by the narrator in paraphrase, each with its reference; and with it what Paul's letters
   say of these months. None of it is put into a mouth, and none of it stands in quotation marks: a paraphrase is never presented as
   a quotation (CONTRIBUTING section 1). */
const TOLD={
 v1:'After this he left Athens, and came to Corinth. (Acts 18:1)',
 v2:'There he found a Jew named Aquila, a native of Pontus. He had lately come from Italy with Priscilla, his wife, because Claudius had ordered all the Jews to leave Rome. Paul went to them, (Acts 18:2)',
 v3:'and because he was of the same trade he stayed at their home and worked with them: they were tentmakers by trade. (Acts 18:3)',
 v4:'Every Sabbath he gave a talk in the synagogue, and he persuaded Jews and Greeks. (Acts 18:4)',
 v5a:'Then Silas and Timothy came down from Macedonia. (Acts 18:5)',
 v5b:'From then on Paul was wholly taken up with the word, bearing witness to the Jews to prove that Jesus is the Christ. (Acts 18:5)',
 v6a:'But they kept on opposing him, and spoke abusively. (Acts 18:6)',
 v6b:'So he shook out his garments and told them that their blood was on their own heads. He was clean. From now on he would go to people of the nations. (Acts 18:6)',
 v7:'He moved from there into the house of a man named Titius Justus, a worshipper of God, whose house adjoined the synagogue. (Acts 18:7)',
 v8:'But Crispus, the presiding officer of the synagogue, became a believer in the Lord, and all his household with him. And many of the Corinthians who heard began to believe, and were baptized. (Acts 18:8)',
 v9:'And by night, in a vision, the Lord said to Paul that he was not to be afraid: he was to keep on speaking, and not be silent, (Acts 18:9)',
 v10:'for he was with him, and no man would attack him to do him harm; for he had many people in this city. (Acts 18:10)',
 v11:'So he stayed there a year and six months, teaching the word of God among them. (Acts 18:11)',
 v12:'While Gallio was proconsul of Achaia, the Jews rose up together against Paul and led him to the judgment seat. (Acts 18:12)',
 v13:'This man, they said, was persuading people to worship God in a way contrary to the law. (Acts 18:13)',
 v14:'Paul was about to speak when Gallio said to the Jews that if this were some wrong, or a serious crime, he would have reason to hear them out patiently. (Acts 18:14)',
 v15:'But if it was a dispute about speech and names and their own law, they must see to it themselves. He did not wish to be a judge of such things. (Acts 18:15)',
 v16:'With that he drove them away from the judgment seat. (Acts 18:16)',
 v17:'Then they all seized Sosthenes, the presiding officer of the synagogue, and began beating him in front of the judgment seat. But Gallio would have nothing at all to do with it. (Acts 18:17)',
 v18a:'Paul stayed quite a few days longer. Then he said goodbye to the brothers and sailed away for Syria, and Priscilla and Aquila went with him. (Acts 18:18)',
 v18b:'In Cenchreae he had his hair clipped short, for he had made a vow. (Acts 18:18)',
 v19:'So they came to Ephesus, and there he left them. He himself went into the synagogue and reasoned with the Jews. (Acts 18:19)',
 v20:'They kept asking him to stay longer, but he would not consent. (Acts 18:20)',
 v21:'He said goodbye, and told them that he would come back to them again, if Jehovah was willing. And he put out to sea from Ephesus (Acts 18:21)',
 v22:'and came down to Caesarea. He went up and greeted the congregation, and then went down to Antioch. (Acts 18:22)',
 v23:'After he had spent some time there he set out again, and went from place to place through the country of Galatia and Phrygia, making all the disciples strong. (Acts 18:23)',
 /* from his letters */
 c23:'He came to them, he wrote later, in weakness and in fear, and trembling greatly. (1 Corinthians 2:3)',
 k119:'When he was in need there, he wrote later, he became a burden to no one: the brothers who came from Macedonia supplied what he lacked. (2 Corinthians 11:9)',
 t36:'Timothy had just come from them, the letter says, with good news of their faithfulness and their love: they always thought of him fondly, and longed to see him as he longed to see them. (1 Thessalonians 3:6)',
 t11:'It went out from Paul, Silvanus and Timothy, to the congregation of the Thessalonians. (1 Thessalonians 1:1)',
 t217:'He had been parted from them for a short time, it said, in person and not in heart, and had made every effort to see them again. (1 Thessalonians 2:17)',
 t527:'And it put them under a solemn obligation: the letter was to be read to all the brothers. (1 Thessalonians 5:27)',
 c924:'The runners in a race all run, he wrote to this city later, but only one receives the prize. (1 Corinthians 9:24)',
 c925:'They do it for a crown that can perish, he wrote; but we, for one that cannot. (1 Corinthians 9:25)',
 a166:'On the way out, two years and more before, the holy spirit had forbidden them to speak the word in the province of Asia. (Acts 16:6)',
 c116:'Crispus and Gaius he baptized himself, he wrote later, and the household of Stephanas. (1 Corinthians 1:14, 16)',
 c1615:'The household of Stephanas he called the firstfruits of Achaia. (1 Corinthians 16:15)'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});
/* the one passage on his tablets: a note in his own words with its reference, never the wording of a translation */
const PS={ne5:{ref:'Nehemiah 5:13',gist:'Nehemiah shook out the folds of his garment: so may the true God shake out of his house and out of his possessions every man who does not keep this promise.'}};

/* ============ HELPERS ============ */
/* think: Paul weighs what to do. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){if(q)await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok){if(o.say)await say(P,o.say);return o}await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* come: a room is shown, with everyone in his place. goto: Paul walks from one place to the next. step: into a close view, or out. */
async function come(room,ms){place12(room);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,ms||600)}
async function goto(room,x,y,dir){await fade(1,260);place12(room);if(x!=null)place(P,room,x,y,dir);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,260);const r=ROOMS[room];if(r.enter)await r.enter()}
/* mine: an exit is Paul's. When the two at the bench are played, they stay at it. */
const mine=fn=>()=>PC()!==P?say(PC(),'Our place is at the bench. The streets are Paul\'s now.'):fn();
const lit12=(x,y)=>lightAt(G.room,x,y);
/* the dark of a scene that is told and not shown */
async function darkly(fn){await fade(1,500);G.scene=dark12;const m=AU.mood;AU.mood='night';AU.amb={};await fade(0,300);await fn();await fade(1,400);G.scene=null;AU.mood=m}

/* ============ AUTUMN: the same trade ============ */
async function toShop(){if(F.sab&&!F.came){await fade(1,260);place12('shop12');place(P,'shop12',60,122,1);enterRoom('shop12',60,122,1);codeBtn();await fade(0,260);return arrive()}
  await goto('shop12',60,122,1);if(!F.met)return meet()}
async function meet(){await say(AQ,'Peace, stranger. You look at that cloth the way a man looks at his own.');
  await say(P,'Goat hair, woven tight: Cilician. I grew up with it under my hands. I am from Tarsus, and a tentmaker.');
  await say(PR,'Then you know how it fights the knife. We have orders for three, and two pairs of hands.');
  await say(AQ,'We came from Rome with what we could carry. Claudius has ordered every Jew out of the city.');await tell('v2');
  await say(P,'I am Paul. I need work, and a corner to sleep in. I ask for no more than my hands earn.');
  await say(PR,'There is the loft, and there is the bench. Stay.');await tell('v3');
  await narr('They had been put out of one city already. In the next they made room for a stranger.',{dur:7000});
  await say(AQ,'Begin with the linen. Titius Justus, whose house is wall to wall with the synagogue, wants a roof of cloth over his court before his figs are dry.');F.met=1;SFX.good();codeBtn()}
async function sewAwning(){if(!F.met)return say(P,'Not my bench, and not my cloth. Not yet.');if(F.sewn)return say(P,'It is hemmed and ringed. It wants hanging, not sewing.');
  SFX.sew();await say(P,'Linen is kinder to the awl than goat hair. I take the hem; Aquila sews in the rings; Priscilla waxes thread faster than the two of us can use it.');
  await narr('Three days, three pairs of hands. The linen was hemmed, and a ring sewn in at every span.',{dur:7000});F.sewn=1;addItem('awn12');
  await say(AQ,'Take it to him. He has hooks in both walls. The cloth is half the work: the other half is where it hangs.')}
async function toCourt(){if(!F.sewn)return say(P,'A good door, with a frame of dressed stone. I have no errand at it yet.');
  if(F.r1&&!F.shook)return say(P,F.sab?'His court is shaded, and he is paid for. I shall see him in the synagogue.':'It hangs as he wanted it.');
  if(F.stay&&!F.summer)return say(P,'They meet there on the first day of the week, and dry. Today my errand is in the street.');
  if(F.summer&&!keptAll())return say(P,'Three people in this city are expecting me. First them.');
  await goto('court12',74,122,1)}
async function courtEnter(){if(F.sewn&&!F.r1&&!G.c12){G.c12=1;await say(TJ,'The tentmaker from Tarsus. I have heard you in the synagogue, twice now.');
    await say(TJ,'You see the hooks: three in the wall of the synagogue, three in mine. Hang it so that I have shade on my bench at midday, and my figs keep their sun.')}
  if(F.shook&&!F.r2&&!G.c12b){G.c12b=1;await say(TJ,'My house is open to you, Paul, and to whoever comes after you. But look at my guests: it is raining on them.');
    await say(P,'Linen is for the sun. For rain it has to be goat hair, the cloth of a tent. Aquila has a length that will reach from wall to wall.');
    await say(TJ,'Then hang it. And see where the water goes: I want it in my cistern, by the door, and not down the wall of my neighbors.')}
  if(F.cloth2&&!F.r3&&!G.c12c){G.c12c=1;await say(TJ,'The second cloth! Look at them: they sit to the door, and stand beyond it.');
    await say(GA,'And you read from where the wall of the synagogue is, Paul. You will want light on your tablets there.')}
  if(F.gallio&&!F.bye)return farewell()}
/* the close view: in, and out */
async function toAwn(id){if(PC()!==P)return say(PC(),'Paul hangs it. We sewed it.');if(id&&id!=='awn12')return false;
  if(awnDone())return say(P,roundNo()===2&&F.r2?'It sheds the rain into his cistern.':'It hangs as it should.');
  if(roundNo()===3&&!F.cloth2)return say(P,'One cloth, and a court full of people. It needs a second: that is work for the bench.');
  await fade(1,220);awn();place12('awn12');enterRoom('awn12',160,236,1);codeBtn();await fade(0,260);
  if(!G.aw12.told){G.aw12.told=1;await say(P,roundNo()===1?'A rope from a hook in one wall to a hook in the other. The cloth slides along it on its rings. I shall watch where the light falls.':roundNo()===2?'One cloth of goat hair, from wall to wall. All that is left to choose is the hooks.':'Two cloths now. And a morning sun that comes in over the roof of the house.',TH)}}
async function outAwn(){await fade(1,220);place12('court12');place(P,'court12',150,120,1);enterRoom('court12',150,120,1);codeBtn();await fade(0,260)}
const HK=['high','middle','low'];
async function hook(side,i){const st=awn();if(awnDone())return;if(st[side]===i)return say(P,'The rope is on that hook already.',TH);st[side]=i;SFX.creak()}
async function slide(which){const st=awn();if(awnDone())return;if(st.n===2)return say(P,'It reaches from wall to wall. There is nowhere for it to slide.',TH);
  if(which==='p')st.p=(st.p+1)%3;else st.q=(st.q+1)%4;noise({d:.16,v:.06,f:2600,q:.8})}
const WRONG={bench:[()=>TJ,'My bench is in the sun still.'],figs:[()=>TJ,'And my figs? They are in the shade now. They will mould before they dry.'],
  wall:[()=>TJ,'It is running down the wall of the synagogue. Not on their side, Paul: I have to live beside them.'],belly:[()=>PR,'It does not run at all. It is filling like a wineskin, and coming through over the middle bench.'],
  slow:[()=>PR,'It runs, but slowly. There is a belly forming above the third bench.'],read:[()=>P,'I cannot see my own tablets where I stand.'],
  end:[()=>SP,'The old man at the end has the sun in his face.'],mid:[()=>GA,'The women in the middle are sitting in a strip of sun.'],door:[()=>CR,'My household, by the door, have the sun on their necks.'],
  hair:[()=>GA,'Those who stand by the door have the cloth in their hair.']};
async function lookAwn(){const st=awn();if(awnDone())return say(P,'It hangs as it should.',TH);const j=judge(st);
  if(j){const[who,line]=WRONG[j];return say(who(),line,who()===P?TH:undefined)}
  chord12();SFX.good();const n=st.n;await wait(500);await outAwn();
  if(n===1){F.r1=1;delItem('awn12');await say(TJ,'Shade where I sit, and sun on the figs. You have hung these before.');await say(P,'In Tarsus, and in a few places since.');
    await say(TJ,'Here is what we agreed. And come to my table on the Sabbath: I have questions about what you said.');await sabbaths()}
  else if(n===2){F.r2=1;await say(TJ,'Dry to the last bench, and the water in my cistern.');await crispus()}
  else{F.r3=1;await year()}}
async function sabbaths(){await fade(1,400);place12('street12');place(P,'street12',380,122,1);enterRoom('street12',380,122,1);await fade(0,500);
  await narr('Six days the bench was full. On the seventh it stood empty, and the synagogue did not.',{dur:7000});await tell('v4');F.sab=1;codeBtn();
  await say(P,'Six days to the Sabbath. The bench is waiting.',TH)}

/* ============ LATE IN THE YEAR: the awl laid down, and a letter ============ */
async function arrive(){place(SI,'shop12',40,118,1);place(TI,'shop12',64,123,1);await narr('Late in that year two men stood in the opening of the shop, grey with the road.',{dur:6500});await tell('v5a');
  await say(TI,'Paul! We asked for a tentmaker from Tarsus at every bench in this street.');
  await say(SI,'From the brothers in Macedonia, for your needs. They would not let us leave without it.');await tell('k119');
  await say(P,'Then I owe this bench nothing more than what I have promised on it.');F.came=1;place12('shop12');place(P,'shop12',60,122,1);codeBtn();
  await say(P,'One order of mine is open: the cover for Sabinus, half sewn. I leave no promise lying on a bench.',TH)}
async function closeSeam(){if(F.seam)return say(P,'Sewn to the corner, and the thread made fast.');SFX.sew();
  await say(P,'I sew on to the corner, and make the thread fast there. From a corner another hand can go on, and nobody will see where mine stopped.');F.seam=1}
async function sabinus(){if(F.told)return say(SB,'On the day before the Sabbath, then. From Aquila.');
  if(!F.seam){await say(SB,'My cover, tentmaker. Is it done?');return say(P,'Half. Give me until I have reached the corner, and I will tell you how it stands.')}
  await say(SB,'My cover. You said: the day before the Sabbath.');let av=[0,1,2];
  for(;;){const Q=['It will be ready on that day. Aquila will finish it: from today I do not sew.','From today I do not sew.','Somebody will see to it.'],i=av[await choose(av.map(i=>Q[i]))];await say(P,Q[i]);
    if(i===0){await say(SB,'Aquila? His seams I know. Then it is all one to me whose hand it is.');F.told=1;return}
    await say(SB,i===1?'And my cover? I paid you half.':'Somebody! I ordered it from you.');av=av.filter(x=>x!==i)}}
async function layDown(id){if(id!=='awl'&&id!=='thread')return false;if(!F.came)return say(AQ,'Keep it, brother. There is work enough for three awls.');
  if(!F.seam||!F.told){await say(AQ,'With an order of yours open on the bench? See to Sabinus first, brother.');return}
  await say(P,'Keep these for me. The knife I keep: a man needs a knife.');delItem('awl');delItem('thread');SFX.pick();
  await say(AQ,'We will keep them oiled. And this bench will earn for three.');await say(PR,'Go and say it, Paul. It is what you came for.');F.laid=1;G.invs.aq12=['awl12','thread12'];place12('shop12');codeBtn();await tell('v5b');
  await narr('From that day the bench had two workers again, and the word had all of the third.',{dur:7000});SFX.good()}
async function timothy(){if(!F.laid)return say(TI,'I have more to tell you than fits in a doorway, Paul. When your hands are free.');
  if(F.letter)return say(TI,F.gallio?'Silas and I stay, Paul. There is more to do here than two men can finish.':'It will be read to all of them. I wish I could see their faces.');
  if(F.news)return say(TI,'A sheet, a reed and black. Then you speak, and I write.');
  await say(TI,'I come from Thessalonica.');await tell('t36');
  await say(TI,'They ask after you every day. Give me the answer, and I will carry it back by mouth, as the brothers from Beroea carried yours to us.');
  await say(P,'It is too much for one mouth, Timothy. And it is for all of them, not for those who happen to be in the house. It has to be written.');
  await say(SI,'I carried a letter once, from Jerusalem. A letter is read as it was sent.');F.news=1;codeBtn();
  await say(P,'Wax does not travel. I need a sheet, a reed, and black.',TH)}
function ink(){if(G.ink12==null)G.ink12=0;return G.ink12}
async function grind(id){if(id==='black12'){if(ink()>=4)return say(P,'It is paste already.',TH);G.ink12++;noise({d:.3,v:.05,f:1800,q:.6});return say(P,'I grind a little of the cake into the water.',TH)}
  if(id==='pen12')return say(P,'First I try it on the sherd. A sheet is too dear for trying.',TH);return false}
async function water(){if(!F.news)return say(P,'A small bowl of water.');if(F.ink)return say(P,'It is right as it is.');if(ink()<=0)return say(P,'It is water still.',TH);G.ink12--;SFX.splash();return say(P,'A few drops more of water.',TH)}
async function tryInk(id){if(id!=='pen12')return id==='reed12'?say(P,'A reed that has not been cut writes nothing.',TH):false;if(F.ink)return say(P,'Black, and it stays. I need no more strokes.');scratch12();
  const k=ink();if(k===2){F.ink=1;delItem('black12');SFX.good();return say(P,'Black, and it stays where the reed puts it.')}
  return say(P,['Water. The reed leaves nothing.','Grey, and it runs along the sherd.','','It clogs the slit, and comes off in a blot.','Paste. The reed will not take it up.'][k],TH)}
async function writeLetter(id){if(id!=='pen12'&&id!=='sheet12')return false;
  if(!(F.pen&&F.ink&&F.sheet))return say(TI,!F.pen?'I have no reed, Paul.':!F.sheet?'On what? Silas had a sheet.':'The reed is cut. But there is no black for it yet.');
  await say(P,'Sit to it, Timothy. I shall say it, and you write.');delItem('pen12');delItem('sheet12');place(TI,'shop12',176,112,1);TI.bow=true;await wait(500);
  walk(P,250,126);await tell('t11');walk(P,130,128);await narr('He walked up and down between the bales and the door, and Timothy wrote.',{dur:6000});await tell('t217');
  await fade(1,300);G.let12={n:13};G.scene=letter12;await fade(0,300);scratch12();await tell('t527');await narr('What he could not go and say, he wrote.',{dur:5600});
  await fade(1,300);G.scene=null;TI.bow=false;F.letter=1;place12('shop12');place(P,'shop12',150,124,1);codeBtn();await fade(0,300);
  await narr('A brother who was going north took it with him. It is the earliest of his letters in the Scriptures.',{dur:7500});
  await say(P,'And now the synagogue. They have heard me every Sabbath, and since the two came, every day.',TH)}

/* ============ WINTER: one door further ============ */
async function toSyn(){if(!F.met)return say(P,'The synagogue. On the Sabbath I shall be in it.');if(F.shook)return say(P,'That door I have left. The one beside it is open.');
  if(!F.letter)return say(P,F.sab?'On the Sabbath. Today is a working day.':'On the Sabbath I shall be in it.');
  await goto('syn12',150,124,1);await narr('Every Sabbath, and now every day, he said it in that house: that Jesus is the Christ.',{dur:6500});await tell('v6a');addItem('mantle12',1);
  await say(P,'I have said it on many Sabbaths. There is nothing left that I could add to it.',TH)}
async function shake(id){if(id!=='mantle12')return false;await narr('He took the fold of his mantle in both hands, and shook it out before them.',{dur:6000});noise({d:.25,v:.08,f:1400,q:.6});await tell('v6b');
  await narr('He had said it on many Sabbaths. Now he said that he had said it.',{dur:6000});F.shook=1;delItem('mantle12');
  await fade(1,400);place12('street12');place(P,'street12',452,122,1);enterRoom('street12',452,122,1);codeBtn();await fade(0,500);
  await narr('He did not go far. He went one door further.',{dur:5600});await tell('v7');await goto('court12',74,122,1)}
async function crispus(){place(CR,'court12',72,121,1);await narr('That winter a man came in by the door from the street who had sat in the first seat of the house next to it.',{dur:8000});
  await say(CR,'I have presided over the house on the other side of that wall for many years. Today I came through this door instead.');
  await say(P,'There is room on the bench, Crispus.');await tell('v8');await tell('c116');codeBtn();await evening()}
/* the road out, the first time: the others propose it */
async function evening(){await fade(1,500);place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,600);
  await say(AQ,'The whole synagogue heard you say it, and now their presiding officer has gone over. They will not let that rest.');
  await say(PR,'We have been put out of a city once. We know how it begins.');
  await say(SI,'In Thessalonica we left the same night. In Beroea, the same day. There is a ship for Asia at the eastern harbor: your bundle is by the door.');
  await narr('In every city before this one, it was the hour when the brothers found him a road.',{dur:7000})}
async function toMap(){if(PC()!==P)return say(PC(),'Our place is at the bench. The streets are Paul\'s now.');await fade(1,220);place12('isth12');enterRoom('isth12',160,236,1);codeBtn();await fade(0,260)}
async function fromMap(to){await fade(1,220);const r=G.back12||'street12';place12(r);if(r==='street12')place(P,r,to==='e'?610:26,122,to==='e'?-1:1);else if(r==='shop12')place(P,r,60,122,1);enterRoom(r,P.x,P.y,P.dir);codeBtn();await fade(0,260)}
async function vision(){await fromMap();await narr('He had not said yes, and he had not said no, when the lamp was put out.',{dur:6500});
  await darkly(async()=>{await tell('v9',9000);await tell('v10',9000)});F.night=1;place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,700);
  await narr('In the morning the bundle stood where they had left it.',{dur:6000})}
async function harbor(w){const first=F.r2&&!F.night,morn=F.night&&!F.stay,again=F.word&&!F.stay2;
  if(first){await say(P,w==='l'?'Lechaeum, and a ship for Italy.':'Cenchreae, and a ship for Asia.',TH);await say(P,'It is what I have done in every city. I have not said yes.',TH);return vision()}
  if(morn)return say(P,'I was told to keep on speaking, and not to be silent. That was not said to a man on the deck of a ship.',TH);
  if(again)return say(P,'A year ago I was told that nobody would attack me here to harm me. Nothing has been said to me since. Nothing has been taken back.',TH);
  if(w==='l')return say(P,F.pKal&&!F.kal?'Lechaeum: ships for Italy, Sicily and Spain. He said Ephesus and Smyrna.':F.pPra&&F.summer&&!F.pra?'Lechaeum: ships for the west. He said that he sails for Asia.':'The western harbor. Nobody is expecting me there.',TH);
  if(F.gallio)return say(P,'Soon. First I say goodbye.',TH);
  if(!(F.pKal&&!F.kal)&&!(F.pPra&&F.summer&&!F.pra))return say(P,'The eastern harbor, two hours on foot. Nobody is expecting me there today.',TH);
  await fade(1,300);place12('cen12');enterRoom('cen12',30,124,1);codeBtn();await fade(0,300);
  await narr(F.summer?'Two hours on foot, across the neck of land, to the harbor that looks toward Asia.':'Two hours on foot, in the rain, to the harbor that looks toward Asia.',{dur:6500})}
async function unpack(){if(PC()!==P)return say(PC(),'It is his bundle. He must say.');
  if(F.r2&&!F.night){await say(P,'My bundle, packed by other hands. They mean it well.',TH);return}
  if(F.night&&!F.stay){await say(P,'Unpack it. I am staying.');await say(SI,'What has changed since last night?');
    await say(P,'I was told to stay. To keep on speaking; that nobody will lay a hand on me here to harm me; and that there are many people in this city.');
    await say(PR,'Then we unpack.');SFX.pick();F.stay=1;place12('shop12');codeBtn();await tell('v11');await narr('He stayed.',{dur:4200});
    return say(P,'Many people, in this city. I shall not find them at a bench. The street is full of people I have no errand with.',TH)}
  if(F.word&&!F.stay2){await say(P,'Unpack it. What I was told a year ago still stands.');await say(AQ,'Nothing new has been said to you?');
    await say(P,'Nothing new. It does not have to be said twice.');SFX.pick();F.stay2=1;codeBtn();return toSeat()}
  return say(P,'There is no bundle to unpack.')}

/* ============ WHERE AND WHEN: the year and six months ============ */
/* After the night of the vision the city is walked through its seasons: winter, the spring of the games, summer. There are people in
   the street whom Paul has no errand with, and he speaks to them all the same (Acts 18:9). Some have no time now, and say when they
   have: not where, and not in which season. That has to be worked out from what the city is. A promise is noted on the tablets and
   kept in its season, and Paul will not let a season go while somebody is expecting him. PROM: each promise, the flag that is set when
   it is made, the flag when it is kept, and the note. Who comes to believe is not the player's doing: the narrator says what Acts
   18:8 and 18:10 say, and no more. Every one of these people is invented. */
const PROM=[
 {k:'kal',p:'pKal',note:'Kallistos, a seaman on the run to Ephesus and Smyrna: now, while the ships are laid up. At his ship.'},
 {k:'thr',p:'pThr',note:'Thrason, a potter: when his kiln is cold. He will be sitting by his pots.'},
 {k:'dec',p:'pDec',note:'Decimus, a clerk of the court: when the court is not sitting.'},
 {k:'pra',p:'pPra',note:'Praxias, a runner: when the games are over. By his ship, which sails for Asia.'},
 {k:'eup',p:'pEup',note:'Euphron, who keeps a booth: when the booths are down. At his own door.'}];
const keptAll=()=>!!(F.thr&&F.eup&&F.pra),SEASON=()=>F.bye?'The spring of the year 52':F.summer?'The summer of the year 51':F.spring?'The spring of the year 51':F.shook?'The winter':'The autumn of the year 50';
async function turn(){if(!F.stay)return say(P,'The seasons turn by themselves. I have other things to see to.',TH);if(F.summer)return say(P,keptAll()?'This summer is not over yet. The court of Justus is too small.':'Three people in this city are expecting me before the summer is out.',TH);
  if(!F.spring){if(!F.brought||!F.pThr||!F.pKal)return say(P,'There are people in that street to whom I have not said a word. I was told to keep on speaking.',TH);
    if(!F.marc)return say(P,'A man is waiting at the bench for his awning, and I walked him there myself.',TH);
    if(!F.kal)return say(P,'Kallistos is expecting me, and when the sea opens he is gone. I do not let the winter go before that.',TH);
    await fade(1,500);F.spring=1;G.back12='street12';place12('street12');place(P,'street12',60,124,1);enterRoom('street12',60,124,1);codeBtn();await fade(0,700);
    await narr('The rain stopped, and the ships went back into the water. Then the roads filled: every second year the games at the Isthmus brought crowds from far and near to this neck of land.',{dur:10500});
    return narr('The visitors slept in tents, and the sellers stood under roofs of cloth. At the bench of Aquila and Priscilla nobody looked up for weeks.',{dur:8500})}
  if(!F.pPra||!F.pEup||!F.pDec)return say(P,'The street has never been so full. I have not spoken to half of those who stopped in it.',TH);
  if(!F.dec)return say(P,'Decimus said: when the court is not sitting. I should look at the judgment seat before this spring is over.',TH);
  await fade(1,500);F.summer=1;G.back12='street12';place12('street12');place(P,'street12',60,124,1);enterRoom('street12',60,124,1);codeBtn();await fade(0,700);
  await narr('The games ended and the booths came down. With the summer a new proconsul came to Corinth: Gallio.',{dur:8500})}
async function marcellus(){if(F.brought)return say(MA,'They say that you left the synagogue and went next door. What do you tell them in there?');
  await say(MA,'You are the tentmaker? My awning came down in the night, torn from end to end.');
  await think(null,[{q:'Come with me. Aquila and Priscilla will mend it, and I will keep you company while they do.',ok:1,say:'Come with me. Aquila and Priscilla will mend it, and I will keep you company while they do.'},
    {q:'I will mend it for you.',no:'With what? I gave the awl away, and I know why.'}]);F.brought=1;
  await goto('shop12',60,122,1);await say(PR,'Lay it on the bench. Aquila, the long needle.');
  await say(P,'Their hands are busy, and mine are free. So are your ears, Marcellus.',TH)}
async function mend(id){if(id!=='awl12'&&id!=='thread12')return false;if(!F.brought||F.marc)return false;SFX.sew();await say(AP,'Closed, and doubled where it tore.');F.marc=1;
  await say(MA,'I had the tentmaker for an hour, and he never touched a needle. He talked. I am not sorry for it.');await say(PR,'Come next door on the first day of the week, and hear the rest.');place12('shop12');codeBtn()}
async function thrason(){if(G.room==='agora12'){if(F.thr)return say(TR,'I am turning it over, tentmaker. A man who was dead. Come by again.');
    await say(TR,'Cold as a stone since the new moon. Sit down. In the winter you said that you had something to tell me.');await say(P,'I have. It begins with the one who made the clay.');
    await narr('He talked until the shadow of the colonnade had reached the potter\'s mat.',{dur:6500});F.thr=1;SFX.good();return after3()}
  if(F.pThr)return say(TR,'When it is cold, I said. Look at the smoke.');
  await say(TR,'Not now, friend. The kiln is alight, and a kiln is like a small child: turn your back on it, and it is ruined.');await say(P,'When, then?');
  await say(TR,'When it is cold. Then you will find me sitting by my pots, with nothing to do but listen.');F.pThr=1;SFX.pick();codeBtn()}
async function kallistos(){if(G.room==='cen12'){if(F.kal)return say(KA,'When the sea opens I am gone. But I shall be back with the autumn, and I shall ask for you.');
    await say(KA,'You came! In this rain. Sit under the hull: it is the driest roof in the harbor. Now: this man who was dead.');
    await narr('He talked until the rain stopped. Two more seamen had come to listen from the next ship.',{dur:7000});F.kal=1;SFX.good();return codeBtn()}
  if(F.pKal)return say(KA,'At the ship, I said. I shall be there before you.');
  await say(KA,'Time? I have nothing else. She lies on her side timbers until the sea opens.');
  await say(KA,'But not here: I only walked over for cord. Come to the ship. A man listens better with his own planks beside him.');await say(P,'Where does she lie?');
  await say(KA,'Where does a ship lie that runs to Ephesus and Smyrna?');F.pKal=1;SFX.pick();place12('street12');codeBtn()}
async function praxias(){if(G.room==='cen12'){if(F.pra)return say(PX,'A crown that does not perish. I shall think about that all the way to Asia.');
    await say(PX,'Second. Here the second man gets nothing: one gets the crown, and even that does not keep.');await tell('c924');await tell('c925');
    await say(P,'I know of a race in which more than one receives the prize, and the crown does not perish. Sit down. Your ship is not ready.');
    await narr('He talked until the shipmaster called for the plank.',{dur:6000});F.pra=1;SFX.good();return after3()}
  if(F.pPra)return say(PX,'After I have run. By my ship.');
  await say(PX,'After I have run, stranger. Before a race a man has room in his head for one thing.');await say(P,'And after it?');
  await say(PX,'After it I go home, crown or no crown. My ship sails for Asia when the games are over. Look for me beside her, if you still want to talk to a man who may have lost.');F.pPra=1;SFX.pick();place12('street12');codeBtn()}
async function euphron(){if(F.summer){if(F.eup)return say(EU,'My wife wants to hear it too. Which door did you say?');
    await say(EU,'The booth is down and the takings are counted. Now I am a man again. You wanted to tell me something, in the spring.');await say(P,'I still do. Have you a bench in the shade?');
    await narr('He talked until the lamps were lit in the street.',{dur:5600});F.eup=1;SFX.good();return after3()}
  if(F.pEup)return say(EU,'When the booths are down! Two jugs for that price, lady, two!');
  await say(EU,'During the games I sell from the first light to the last. Come when the booths are down: then I am a man again, at my own door.');F.pEup=1;SFX.pick();codeBtn()}
async function decimus(){if(G.room==='agora12'){if(F.dec)return say(DE,'I shall be at my table again when the new man comes. Until then you know where I walk.');
    await say(DE,'You are quick. I said: when it is not sitting.');await say(P,'It is not sitting. The seat is empty.');
    await say(DE,'So it is: the old proconsul has gone, and the new one comes with the summer. For once I have a whole spring. Say what you have to say.');
    await narr('He talked while the clerk walked him twice round the empty judgment seat.',{dur:6500});F.dec=1;SFX.good();return codeBtn()}
  if(F.pDec)return say(DE,'When the court is not sitting. You will see it for yourself.');
  await say(DE,'I write for the court of the proconsul, and the court leaves a man no hour of his own. Come when it is not sitting.');F.pDec=1;SFX.pick();place12('street12');codeBtn()}
async function after3(){codeBtn();if(keptAll())await say(P,'I have kept what I promised. And Justus sent word this morning: his court is too small.',TH)}
async function toAgora(){if(!F.stay)return say(P,'The steps to the marketplace. My way lies between the bench and the synagogue.');await goto('agora12',40,124,1)}
async function sewSecond(id){if(id!=='awl12'&&id!=='thread12')return false;if(!(F.summer&&keptAll())||F.cloth2)return false;SFX.sew();
  await say(AP,'A second cloth, half as wide as the first. Paul will know where it has to hang.');F.cloth2=1;await say(PR,'Stephanas is at the door for it already.');codeBtn()}
async function year(){await say(SP,'Shade on every bench, and light where you stand. Now nobody has to leave before you have finished.');await tell('c1615');
  await narr('A year had gone by since he came into this street with his tools, and no bench to use them at.',{dur:7500});codeBtn();
  await fade(1,500);F.word=1;place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,600);
  await say(SI,'They have agreed among themselves, the whole synagogue together. In the morning they take you before the proconsul.');
  await say(AQ,'The new one. Nobody knows what he will do. Your bundle is by the door, and there is a ship.');
  await narr('This time nobody spoke to him in the night.',{dur:6000})}

/* ============ ABOUT TO SPEAK: the judgment seat ============ */
const OPEN=['I am a Roman, and I have broken no law of Rome.','What I teach is what the Law and the Prophets said would come.','Proconsul, I thank you that I may answer for myself.'],
  opened=()=>F.opA&&F.opB?2:F.opB?1:F.opA?0:-1;
/* the drum before the seat: struck by hand, bar after bar, until it is stopped */
const drum12={t:0,on(){this.off();if(!AU.ctx)return;seat12();this.t=setInterval(()=>seat12(),.16*40*1000)},
  /* off: no more is struck, and what has been struck ahead is not heard: the music is held silent until those strokes are past */
  off(){if(!this.t)return;clearInterval(this.t);this.t=0;if(AU.mus&&AU.ctx){const g=AU.mus.gain,t=now();g.cancelScheduledValues(t);g.setValueAtTime(0,t);g.setValueAtTime(0,t+6.6);g.linearRampToValueAtTime(.55,t+7.4)}}};
async function toSeat(){await fade(1,600);await narr('In the morning they came for him.',{dur:4600});place12('wait12');enterRoom('wait12',110,122,1);codeBtn();await fade(0,600);await tell('v12');await tell('v13');
  await say(AT,'Sit there. The proconsul is on the seat. You will be called.');
  await say(P,'Contrary to the law. Which law: that of Rome, or that of Moses? I had better have my first sentence ready.',TH)}
async function prepare(){if(opened()>=0)return say(P,'I have my first sentence. The rest will follow from the charge.',TH);
  await say(P,'When I am told to speak: how do I begin?',TH);const i=await choose(OPEN);await say(P,OPEN[i],TH);if(i!==1)F.opA=1;if(i>0)F.opB=1;
  await say(P,'That is how I begin.',TH);await say(AT,'Paul of Tarsus. Out, and stand before the seat.');
  await fade(1,300);G.g12={};place12('agora12');enterRoom('agora12',236,120,1);codeBtn();await fade(0,400);drum12.on();
  await narr('The square before the seat was full. He had stood before magistrates in Philippi, and knew how that had ended.',{dur:8000})}
async function speak(){if(F.gallio)return;drum12.off();P.talk=true;await wait(420);P.talk=false;G.g12=G.g12||{};G.g12.say=1;await tell('v14');await tell('v15');G.g12.say=0;await tell('v16');
  G.g12.gone=1;await narr('He had his first sentence ready. Nobody asked for it.',{dur:6500});
  await fade(1,500);G.scene=g=>backdrop(g,'agora12',76);AU.mood='night';await fade(0,500);await tell('v17');await fade(1,500);G.scene=null;F.gallio=1;G.g12=null;
  place12('agora12');place(P,'agora12',236,122,1);enterRoom('agora12',236,122,1);codeBtn();await fade(0,600);
  await say(P,'Nobody laid a hand on me. It was said to me a year ago, and it held.',TH)}

/* ============ IF JEHOVAH IS WILLING: goodbye, Cenchreae, Ephesus, home ============ */
async function farewell(){await narr('The winter passed, and another spring came.',{dur:5000});await tell('v18a');
  await say(SI,'Timothy and I stay, Paul. There is more to do here than two men can finish.');
  await say(TJ,'The cloths stay where you hung them. And the door stays open.');await say(CR,'Go in peace. You came to us through the wall, and you leave by the gate.');
  await narr('Nobody drove him out of Corinth. He said goodbye.',{dur:6000});F.bye=1;
  await fade(1,500);place12('cen12');enterRoom('cen12',60,124,1);codeBtn();await fade(0,600);await tell('v18b');F.cen=1;place12('cen12');codeBtn();
  await say(AP,'The bench is aboard: two awls, the knives and the cord. Whatever else a tentmaker needs, he finds in the next harbor.')}
const SEA1=[['cenchreae','offsamos','new sea'],['offsamos','ephesus','new']],SEA2=[['offsamos','caesarea','new sea'],['caesarea','jerusalem','new'],['jerusalem','antioch','new']],
  LAB1={corinth:{lab:'l'},athens:{lab:'b',dx:6,dy:7.2},ephesus:{lab:'r'}},LAB2={};
async function sail(){if(!F.cen)return say(P,'That ship is not mine.');
  try{await need('map');await SHARED.map.journey(SEA1,{view:'aegean',labels:LAB1,seen:['corinth'],speed:2600});await narr('Across the sea that he had crossed the other way two years before: to Ephesus.',{dur:7000})}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.eph=1;playAs(P);place12('eph12');enterRoom('eph12',100,122,1);codeBtn();await fade(0,600);await tell('v19');
  await narr('Some two years earlier the road to this city had been closed to him.',{dur:6500});await tell('a166');
  await say(AQ,'We stay here, Paul. A bench can stand in any city.');await say(PR,'And when you come back, there will be people in this one who know your name.')}
async function philon(){if(F.asked)return say(PH,'We shall hold you to the first half of that, and pray about the second.');
  await say(PH,'You have reasoned with us for one Sabbath, and we have a hundred questions. Stay with us. There is a house for you.');
  await think(null,[{q:'I will come back.',no:'That is a promise, and I do not know that I can keep it. It is not mine alone to give.'},
    {q:'I cannot say whether I shall ever come back.',no:'That is true. And it is less than I mean: I do mean to come.'},
    {q:'I will come back to you again, if Jehovah is willing.',ok:1,say:'I will come back to you again, if Jehovah is willing.'}]);await tell('v20');await tell('v21');F.asked=1;codeBtn();
  await say(PH,'We shall hold you to the first half of that, and pray about the second.')}
async function home(){if(!F.asked)return say(P,'They are still standing at the door of the synagogue. I have not answered them.');
  try{await need('map');await SHARED.map.journey(SEA2,{labels:LAB2,speed:2400});await tell('v22',null,0)}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.home=1;place12('ant12');enterRoom('ant12',158,128,1);codeBtn();await fade(0,700);
  await narr('It was the court from which he had set out with Silas, three years before.',{dur:6500})}
async function finale(){AU.mood='home';await say(P,'Peace, brothers. I have a great deal to tell you. It will take more than one evening.');
  await narr('In Corinth nobody had to let him down a wall. He stayed until he could say goodbye.',{dur:7500});
  endScreen({title:'Tentmakers of Corinth',text:'He came with his tools and no bench. He laid the tools down, stayed a year and six months, and left when he was ready.',
    based:'Based on Acts 18:1-22; 1 Corinthians 1:14-16; 2:3; 9:24, 25; 16:15; 2 Corinthians 11:9 and 1 Thessalonians 1:1; 2:17; 3:6; 5:27. Supporting characters and dialogue are imaginative; the events are from the Scriptures, and are told here in paraphrase. Acts does not say how Paul found Aquila and Priscilla, what they made, or whether the two were disciples already; who wrote the letter down or carried it; how Crispus came to believe; that anybody spoke of leaving; which law the charge meant; what became of Sosthenes, whom a later letter may name as a brother; what the vow was; why Paul would not stay at Ephesus; or which congregation he went up to greet: apparently that in Jerusalem. Acts does not name Stephanas or Gaius.',
    go:'Click to look back along the road',code:['Chapter Thirteen code: {code}',codeOf(13,0)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;ov.className='';lookBack()};await new Promise(()=>{})}
/* lookBack: the roads of all twelve chapters, journey by journey, so that no two of them cross on one map; then what Acts says next.
   BACKLAB: where the names stand on the map of the second journey, clear of its roads and of each other. The two towns that were
   only passed through, and the pass north of Antioch, keep their place on the road and have no dot and no name on this map. */
const BACKLAB={derbe:{lab:'r',dy:3.3},philippi:{lab:'l',dy:-2},amphipolis:{hide:1},apollonia:{hide:1},syriangates:{hide:1},thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:14,dy:7.2},corinth:{lab:'l'},ephesus:{lab:'r'}};
const BACK=[
 [[['damascus','jerusalem'],['jerusalem','caesarea'],['caesarea','tarsus','sea'],['tarsus','antioch']],{},'From Damascus to Jerusalem, to Tarsus, and to Antioch.'],
 [[['antioch','seleucia'],['seleucia','salamis','sea'],['salamis','paphos'],['paphos','perga','sea'],['perga','antiochp'],['antiochp','iconium']],
   {view:'north',labels:{salamis:{lab:'r',dy:4.2},paphos:{lab:'l',dy:2.6}}},'Sent out from Antioch: across Cyprus, and up through Pamphylia to Antioch in Pisidia and Iconium.'],
 [[['perga','antiochp'],['antiochp','iconium'],['iconium','lystra'],['lystra','derbe'],['perga','attalia'],['attalia','seleucia','sea'],['seleucia','antioch']],
   {view:'north',labels:{derbe:{lab:'r',dy:3.3}}},'To Lystra and Derbe, and back the same way; and home by sea from Attalia.'],
 [[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium'],['iconium','antiochp'],['antiochp','westroad'],['westroad','bithynianroad'],['bithynianroad','troas'],
   ['troas','samothrace','sea'],['samothrace','neapolis','sea'],['neapolis','philippi'],['philippi','amphipolis'],['amphipolis','apollonia'],['apollonia','thessalonica'],['thessalonica','beroea'],['beroea','seaward'],['seaward','athens','sea'],
   ['cenchreae','offsamos','sea'],['offsamos','ephesus']],{view:'aegean',seen:['corinth'],labels:BACKLAB},
   'Through Galatia to Troas, over to Macedonia, down to Athens and Corinth, and across to Ephesus.'],
 [SEA2.map(l=>l.slice(0,2).concat(/sea/.test(l[2])?['sea']:[])),{labels:LAB2},'And home: Caesarea, up, and down to Antioch.']];
async function lookBack(){G.busy=true;lock(true);try{await need('map');for(const[legs,o,line]of BACK){await fade(1,400);await SHARED.map.journey(legs,Object.assign({instant:1},o));await fade(0,500);await narr(line,{dur:7000,low:o.view==='aegean'?1:0})}
    await tell('v23',9000)}catch(e){console.error(e)}
  await narr('The road went on.',{dur:5000});G.end={};
  overlay('on end',()=>{ov.innerHTML='<h2>'+T('THE ROAD SO FAR')+'</h2><p>'+esc(T('Twelve chapters: from a basket let down the wall of Damascus to a court in Antioch, by way of Cyprus, Galatia, Macedonia and Achaia. (Acts 9:23 to 18:22)'))+
    '</p><p class="small">'+esc(T('Acts goes on from here, and so did he.'))+'</p><p class="go">'+esc(T('Click to continue to Chapter Thirteen'))+'</p>'});await wait(1200);ov.onclick=()=>startChapter(13)}

/* ============ ITEMS ============ */
Object.assign(ICON,{
  awn12(g){IH.roll(g,LIN,7,10);for(let i=0;i<4;i++){R(g,6+i*4,5,2,2,'#8a7a5a');R(g,6+i*4,5,2,.6,'#c8b888')}},
  reed12(g){stroke(g,[5,20,19,4],'#8a7a40',2.4);stroke(g,[4.6,19.4,18.6,3.6],'#d8c880',.8);R(g,10.6,11.6,2,2,'#7a6a34')},
  pen12(g){stroke(g,[7,18,19,4],'#8a7a40',2.4);stroke(g,[6.6,17.4,18.6,3.6],'#d8c880',.8);poly(g,[4,21,7.6,19.4,6.2,16.6],'#2a1c16');R(g,12,10,2,2,'#7a6a34')},
  black12(g){g.fillStyle=lg(g,5,0,19,0,['#3a3440','#1a1418','#0c0a0e']);g.fillRect(5,9,14,8);R(g,5,9,14,1,'#5a5464');R(g,5,16.2,14,.8,'#000000');R(g,7,11,4,1,'#4a4454')},
  sheet12(g){R(g,5,4,14,17,'#e2d4a8');R(g,5,4,14,.8,'#f6ecc8');R(g,18.2,4,.8,17,'#b8a878');for(let j=0;j<7;j++)R(g,5,6+j*2.2,14,.5,'rgba(150,120,70,.35)')},
  mantle12(g){IH.square(g,'#6e4a2e',4,6,16,13);poly(g,[4,19,20,19,17,22,12,20.4,7,22],'#5a3a22');stroke(g,[8,6,10,19],'rgba(30,16,8,.4)',.7);stroke(g,[14,6,15,19],'rgba(30,16,8,.4)',.7)}});
const BYPAIR={aq12:'Ours to keep for him, and to use meanwhile.'};
Object.assign(ITEMS,{
  awn12:{name:'linen awning',look:'A sun awning of linen, hemmed, with a ring sewn in at every span. Three pairs of hands made it.'},
  reed12:{name:'reed',look:'A hard reed, as long as my forearm. Uncut, it is good for nothing but stiffening a hem.'},
  pen12:{name:'reed pen',look:'A reed cut slanting, and slit at the point: a pen. A scribe would have made it finer.'},
  black12:{name:'cake of black',look:'A cake of black: soot and gum, dry. It is ground into water before it will write.'},
  sheet12:{name:'sheet of papyrus',look:'A sheet of papyrus, clean on its good side. Silas bought it in Philippi.'},
  mantle12:{name:'mantle',look:'My mantle. There is the dust of this house in its folds.'},
  awl12:{name:'awl',icon:'awl',look:'The awl. It is in their keeping now.',by:{aq12:'Paul\'s awl. He left it with us, oiled, and we keep it so.'}},
  thread12:{name:'waxed thread',icon:'thread',look:'Waxed thread, in their keeping now.',by:{aq12:'Waxed thread. Priscilla waxes it faster than I can use it.'}}});
COMBO['knife+reed12']=async()=>{if(!F.news)return say(P,'I have no use for a cut reed.');SFX.cut();delItem('reed12');addItem('pen12');F.pen=1;
  await say(P,'I cut the end slanting, and slit the point with the tip of the blade. A tentmaker\'s knife does a scribe\'s work, for once.')};
/* what lies on the bench of the workshop, as the story stands */
function benchTop(g){const cl=(x,w,c,d)=>{poly(g,[x,84,x+w,84,x+w+2,91+(d||0),x+w*.6,89,x+w*.3,92+(d||0),x-2,90]);g.fillStyle=lg(g,0,82,0,92,[tint(c,.14),c,tint(c,-.3)]);g.fill();R(g,x,83.4,w,1.2,tint(c,.2));for(let i=3;i<w;i+=5)stroke(g,[x+i,84.6,x+i-.6,89],'rgba(30,20,20,.16)',.5)};
  if(F.met&&!F.sewn||F.summer&&keptAll()&&!F.cloth2)cl(126,52,LIN);
  if(F.came&&!F.spring)cl(150,50,GOAT,2);if(F.brought&&!F.marc){cl(120,34,'#a8442c');R(g,131,84.6,3,5,'#e0d2a8');R(g,143,84.6,3,5,'#e0d2a8')}
  if(F.news&&!F.letter){vessel(g,210,84,3.2,3,'#9a5a36','bowl',{noShadow:1});R(g,207.6,81.4,4.8,1,F.ink?'#141018':ink()?'#4a4654':'#6a9ab0');poly(g,[218,84,226,84,224.6,81.6,219.4,82.2],'#b8703c');if(ink()>1||F.ink)R(g,220,82.6,3.4,.7,'#1a1418')}
  if((F.r2&&!F.stay)||(F.word&&!F.stay2))depth(108,()=>sack(g,98,108,6,10,'#8a6a4a'))}

/* ============ ROOMS ============ */
const NOW=[160,160,236,236];   /* a close view: Paul stands below the picture, and takes no step */
const MOOD=()=>!F.laid?'bench':!F.stay?'word':F.bye?'home':F.summer?'summer':F.spring?'spring':'winter';
const AMB=()=>SEAS()==='w'?{rain:.8,fountain:.3}:{crowd:SEAS()==='s'?.6:.3,fountain:.4,birds:.3};
ROOMS.street12={space:.7,walk:[16,624,112,138],get mood(){return MOOD()},get amb(){return AMB()},hs:[
  {name:'road to the harbors',x:0,y:50,w:36,h:56,wx:24,wy:122,dir:-1,exit:()=>{G.back12='street12';return toMap()},look:'The road down to the western harbor, between its two long walls. And from there, across the neck of land, to the other sea.'},
  {name:'old temple',x:44,y:8,w:84,h:28,wx:86,wy:114,look:'An old temple on its rise above the roofs: heavy columns, each of a single stone. I have work in this street, and none up there.'},
  {name:'colonnade of shops',x:36,y:42,w:94,h:62,wx:84,wy:114,look:'Shops under a colonnade: bronze, and pots. This city makes both, and sells them to the two seas.'},
  {name:'workshop',x:144,y:52,w:64,h:52,wx:176,wy:114,exit:mine(toShop),look:()=>say(P,F.met?'The workshop of Aquila and Priscilla. My bed is in its loft.':'A shop open to the street, and rolls of goat-hair cloth in it. I know that smell.')},
  {name:'house door',x:252,y:62,w:22,h:42,wx:263,wy:114,look:()=>say(P,F.pEup?'Euphron lives here, behind his shutters.':'A shuttered shop, and a door.'),open:'It is not my door.'},
  {name:'spring',x:316,y:60,w:44,h:44,wx:338,wy:114,look:'A spring under an arch, in a front of dressed stone. The whole street draws from it: the shops, the craftsmen, and every stranger.',use:'I drink. It comes cold out of the rock.',pickup:'It belongs to the street.'},
  {name:'lintel',x:398,y:52,w:38,h:10,wx:417,wy:114,look:'Marble, with letters cut in it: the synagogue of the Hebrews.'},
  {name:'door of the synagogue',x:404,y:62,w:26,h:42,wx:417,wy:114,exit:mine(toSyn),look:()=>say(P,F.shook?'The door of the synagogue. I shook out my mantle on the other side of it.':'The door of the synagogue. A large house, and a full one: Jews, and Greeks who worship God.')},
  {name:'door of Titius Justus',x:498,y:60,w:26,h:44,wx:511,wy:114,exit:mine(toCourt),look:()=>say(P,F.shook?'The house of Titius Justus. One wall of his court is the wall of the synagogue.':'A good house, wall to wall with the synagogue.')},
  {name:'rock',x:470,y:0,w:150,h:24,wx:560,wy:114,look:'The rock of Corinth, over everything, with a temple on its top. I have not climbed it, and I am not going to.'},
  {name:'steps to the marketplace',x:566,y:56,w:74,h:48,wx:600,wy:114,dir:1,exit:mine(toAgora),look:'Steps up to the marketplace. The proconsul sits there, when he sits.'},
  {name:'booth',x:230,y:78,w:46,h:26,wx:253,wy:114,vis:()=>SEAS()==='s',look:'A booth: four legs and a roof of cloth. They sprang up overnight when the games began.'},
  {name:'booth',x:536,y:78,w:46,h:26,wx:559,wy:114,vis:()=>SEAS()==='s',look:'Another booth. Somebody sewed every one of these roofs, and I think I know who.'}]};
ROOMS.shop12={space:1.1,floor:'earth',walk:[20,304,112,137],get mood(){return NIGHT()?'night':MOOD()},get amb(){return NIGHT()?{crickets:.4}:SEAS()==='w'?{rain:.5}:{crowd:.2,hammer:.1}},hs:[
  {name:'opening to the street',x:16,y:34,w:70,h:70,wx:52,wy:114,dir:-1,exit:()=>PC()!==P?say(PC(),'Our place is at the bench. The streets are Paul\'s now.'):(F.r2&&!F.stay)||(F.word&&!F.stay2)?(G.back12='shop12',toMap()):F.brought&&!F.marc?say(P,'I brought the man here. I stay until his awning is whole.'):F.came&&!F.laid?say(P,'Not with a promise of mine lying open on that bench.'):goto('street12',176,120,1),
    look:'The street, and the colonnade across the way. Whoever passes can look in, and does.',as:{aq12:{look:'The street. He is out there somewhere, talking.'}}},
  {name:'workbench',x:114,y:78,w:116,h:26,wx:170,wy:113,look:'A long bench on two trestles, worn pale where the cloth is drawn over it.',use:'There is nothing of mine on it now.',as:{aq12:{look:'Our bench. It has stood in Rome, and it will stand wherever we do.',use:'Nothing is waiting on it.'}}},
  {name:'length of linen',x:124,y:80,w:58,h:12,wx:150,wy:113,vis:()=>F.met&&!F.sewn||F.summer&&keptAll()&&!F.cloth2,def:'use',look:()=>say(P,F.summer?'Linen for a second cloth. That is their work.':'Linen for the awning of Titius Justus, cut to length.'),use:()=>F.summer?say(P,'I gave the awl away, and I know why. This is their work.'):say(P,'With what? The awl is in my pouch.'),
    useWith:id=>F.summer?false:id==='awl'||id==='thread'?sewAwning():false,as:{aq12:{look:'Linen, for the second cloth that Justus needs.',use:'With the awl.',useWith:sewSecond}}},
  {name:'half-sewn cover',x:150,y:80,w:54,h:12,wx:176,wy:113,vis:()=>F.came&&!F.spring&&!(F.brought&&!F.marc),def:'use',look:()=>say(P,F.laid?'The cover for Sabinus. Their hands took it up at the corner where mine stopped.':F.seam?'Sewn to the corner, and the thread made fast.':'A cover for a ship\'s cargo, of goat hair, doubled at the seams. I am halfway down the long seam.'),
    use:()=>F.laid?say(P,'It is theirs now.'):say(P,'With the awl.'),useWith:id=>F.laid?false:id==='awl'||id==='thread'?closeSeam():false,as:{aq12:{look:'The cover for Sabinus. He stopped at a corner, so that nobody can tell his seam from ours.',use:'It will be ready on the day he promised.'}}},
  {name:'torn awning',x:118,y:80,w:38,h:12,wx:140,wy:113,vis:()=>F.brought&&!F.marc,def:'use',look:'The awning of Marcellus, torn from end to end by the wind.',use:'My hands are free for something else. That is the point.',as:{aq12:{look:'Torn along the old seam. An hour, with two of us.',use:'With the awl.',useWith:mend}}},
  {name:'small bowl',x:205,y:78,w:10,h:7,wx:196,wy:113,vis:()=>F.news&&!F.letter,def:'use',look:()=>say(P,F.ink?'Black, and neither thin nor thick.':'A small bowl of water, for the black.'),use:water,useWith:grind},
  {name:'potsherd',x:217,y:79,w:10,h:6,wx:210,wy:113,vis:()=>F.news&&!F.letter,look:'A potsherd, for trying a pen. A sheet is too dear for that.',useWith:tryInk},
  {name:'rolls of cloth',x:232,y:74,w:38,h:30,wx:226,wy:114,look:'Goat-hair cloth from Cilicia, dark, stiff and rough. It fights the knife and the awl.',pickup:'It is theirs, and it weighs as much as I do.',
    /* the chapter's hidden treasure: Paul's awl, in the hands that keep it, put to the cloth of his own country */
    as:{aq12:{look:'Goat-hair cloth from Cilicia. Paul can tell where it was woven by the feel of it.',useWith:id=>id==='awl12'?say(AP,'His awl, and the cloth of his own country. Those two have met before.').then(treasure):false}}},
  {name:'coils of cord',x:126,y:38,w:48,h:20,wx:150,wy:113,look:'Cord, each coil on its own peg.',pickup:'Each hangs where a hand expects it.'},
  {name:'reeds',x:94,y:60,w:12,h:44,wx:112,wy:113,dir:-1,look:'Hard reeds, standing in a jar. They stiffen a hem.',
    pickup:()=>F.reed?say(P,'One is enough.'):!F.news?say(P,'I have no use for a reed.'):(F.reed=1,addItem('reed12'),say(P,'A hard one, as long as my forearm.'))},
  {name:'water jar',x:110,y:90,w:12,h:15,wx:128,wy:113,dir:-1,look:'The water jar. Priscilla fills it at the spring before it is light.',pickup:'It stays where it is.'},
  {name:'lamp',x:219,y:45,w:13,h:8,wx:210,wy:113,look:()=>say(P,NIGHT()?'One lamp. It lights the bench, and three faces.':'A lamp on its shelf, for the evenings when an order is late.')},
  {name:'steps to the loft',x:270,y:40,w:50,h:64,wx:272,wy:116,look:'The steps to the loft. They sleep at one end of it and I at the other, between rolls of linen.',use:'Not while there is light to work or to talk by.'},
  {name:'bundle',x:90,y:96,w:16,h:14,wx:116,wy:116,dir:-1,vis:()=>(F.r2&&!F.stay)||(F.word&&!F.stay2),def:'use',look:'My bundle, packed by other hands, and standing by the door.',use:unpack,open:unpack,pickup:unpack,as:{aq12:{look:'His bundle. We packed it; whether it is unpacked again is for him to say.'}}}]};
ROOMS.court12={space:.8,walk:[40,290,112,137],get mood(){return F.stay?'court':MOOD()},get amb(){return CV()==='w'?{rain:.8}:{birds:.4,crowd:.15}},enter:()=>courtEnter(),hs:[
  {name:'door to the street',x:61,y:57,w:24,h:47,wx:73,wy:114,exit:()=>F.sewn&&!F.r1?say(P,'With the cloth still folded under my arm?'):F.shook&&!F.r2?say(P,'With the rain coming down on his guests?'):F.cloth2&&!F.r3?say(P,'Half of them are sitting in the sun.'):goto('street12',511,120,-1),look:'The door to the street.'},
  {name:'rope and hooks',x:20,y:34,w:280,h:20,wx:150,wy:120,def:'use',use:()=>toAwn(),useWith:toAwn,look:'Three hooks in the wall of the synagogue, three in the front of the house, and a rope to run from one side to the other.'},
  {name:'wall of the synagogue',x:0,y:56,w:34,h:60,wx:48,wy:118,dir:-1,look:'On the other side of this wall is the synagogue. A man who speaks up in this court is heard in that house.'},
  {name:'bench by the door',x:236,y:88,w:44,h:16,wx:232,wy:114,dir:1,look:'A stone bench by the door of the house. Justus sits here at midday.',use:'I have not been asked to sit.'},
  {name:'figs',x:138,y:98,w:54,h:8,wx:164,wy:113,vis:()=>CV()==='a',look:'Figs, drying on a mat. They need all the sun the court gets.',pickup:'They are his, and not dry yet.'},
  {name:'benches',x:96,y:94,w:80,h:12,wx:136,wy:113,vis:()=>CV()!=='a',look:()=>say(P,CV()==='w'?'Benches, set out for those who come on the first day of the week.':'More benches every month. Justus has stopped counting them.')},
  {name:'cistern',x:196,y:98,w:22,h:8,wx:206,wy:113,look:'The mouth of his cistern. In this country a man keeps what the winter sends him.'},
  {name:'door of the house',x:294,y:50,w:22,h:72,wx:284,wy:124,dir:1,look:'The door of the house. He has opened it to a great many strangers.',open:'It is his to open.'}]};
const HOOKN={l:['high hook in the wall','middle hook in the wall','low hook in the wall'],r:['high hook in the house','middle hook in the house','low hook in the house']};
const hookHs=(side,i,x)=>({name:HOOKN[side][i],x,y:HY[i]-6,w:14,h:12,wx:160,wy:236,def:'use',use:()=>hook(side,i),look:side==='l'?'A hook of iron in the wall of the synagogue.':'A hook of iron in the front of the house.'});
ROOMS.awn12={space:.6,walk:NOW,get mood(){return F.stay?'court':MOOD()},get amb(){return roundNo()===2?{rain:.8}:{birds:.4}},hs:[
  ...[0,1,2].map(i=>hookHs('l',i,46)),...[0,1,2].map(i=>hookHs('r',i,260)),
  {get name(){return awn().n===2?'cloth of goat hair':'linen cloth'},get x(){const st=awn();return st.n===2?AX0+14:AX0+st.p*BAY},y:30,get w(){return awn().n===2?AX1-AX0-28:2*BAY},h:48,wx:160,wy:236,def:'use',use:()=>slide('p'),
    look:()=>say(P,awn().n===2?'Goat hair, from wall to wall, as on a tent. But the water has to go somewhere.':'The linen we sewed in autumn: half as wide as the court. It slides along the rope on its rings.')},
  {name:'new cloth',get x(){return AX0+awn().q*BAY},y:30,w:BAY,h:48,wx:160,wy:236,def:'use',vis:()=>awn().n===3,use:()=>slide('q'),look:'The second cloth, from the bench of Aquila and Priscilla: a quarter of the court wide.'},
  {name:'court below',x:70,y:86,w:150,h:32,wx:160,wy:236,look:()=>say(P,roundNo()===1?'His bench by the door, and his figs in the middle of the court.':roundNo()===2?'The benches; and by the door, the mouth of his cistern.':'Four benches, full. By the door they stand. And near the wall of the synagogue, the place where I read.')},
  {name:'step back and look',x:60,y:124,w:200,h:20,wx:160,wy:236,def:'use',use:lookAwn,look:lookAwn},
  {name:'back to the court',x:262,y:124,w:58,h:20,wx:160,wy:236,exit:outAwn,look:'The court, and the people in it.'}]};
ROOMS.syn12={space:1.5,walk:[20,300,112,137],mood:'word',amb:{crowd:.5},hs:[
  {name:'door to the street',x:271,y:47,w:32,h:57,wx:262,wy:116,dir:1,exit:()=>say(P,'Not like a man who slips out. What I do next, they shall see.'),look:'The door to the street.'},
  {name:'men who oppose him',x:182,y:72,w:68,h:54,wx:158,wy:124,dir:1,look:'They have heard it on many Sabbaths. Now they answer it with abuse, and one or two of them with worse than abuse.',talk:()=>say(P,'I have said it on many Sabbaths. There is nothing left that I could add to it.',TH),useWith:shake},
  {name:'benches',x:14,y:86,w:70,h:18,wx:60,wy:113,look:'The benches. Some who sit on them have begun to listen to me in earnest: Jews, and Greeks.'},
  {name:"reader's table",x:108,y:82,w:66,h:22,wx:140,wy:113,look:'The table from which the Law and the Prophets are read. Everything I have said in this house, I have said from what lies on it.'},
  {name:'chest of the scrolls',x:30,y:56,w:38,h:32,wx:76,wy:113,dir:-1,look:'The chest of the scrolls, under its cloth.',open:'It is not mine to open.'},
  {name:'windows',x:92,y:22,w:130,h:26,wx:160,wy:113,look:'Three windows, with upright bars. The light in them is the grey of winter.'}]};
ROOMS.isth12={space:.5,walk:NOW,get mood(){return NIGHT()?'night':MOOD()},amb:{wind:.4,waves:.3},hs:[
  {name:'gulf',x:0,y:0,w:190,h:30,wx:160,wy:236,look:'The gulf, and at the end of it the western sea: Italy, Sicily, Spain.'},
  {name:'Lechaeum',x:96,y:34,w:36,h:22,wx:160,wy:236,def:'use',use:()=>harbor('l'),look:'Lechaeum, the western harbor, joined to the city by two long walls. Ships for Italy lie there.'},
  {name:'Corinth',x:130,y:58,w:44,h:24,wx:160,wy:236,def:'use',use:()=>(F.r2&&!F.night)?vision():fromMap(),look:'Corinth, under its rock. It holds both harbors, and takes its toll at each.'},
  {name:'rock',x:124,y:86,w:46,h:32,wx:160,wy:236,look:'The rock, with the temple on its top.'},
  {name:'Cenchreae',x:206,y:62,w:36,h:26,wx:160,wy:236,def:'use',use:()=>harbor('c'),look:'Cenchreae, the eastern harbor, about two hours on foot. Ships for Asia, Syria and Egypt lie there.'},
  {name:'trackway for ships',x:196,y:10,w:26,h:28,wx:160,wy:236,look:'A paved way across the neck of land, with grooves for wheels. Small ships are hauled over it from one sea to the other, rather than sailed round the capes.'},
  {name:'season',x:4,y:128,w:150,h:16,wx:160,wy:236,def:'use',use:turn,look:()=>say(P,T('{season}.',{season:T(SEASON())}),TH)}]};
ART.isth12.front=g=>{G.caps12=[];cap12(g,'Lechaeum',64,24,70);cap12(g,'Corinth',150,126,60);cap12(g,'Cenchreae',276,84,70);cap12(g,'to Athens',290,22,50,'rgba(244,228,184,.7)');
  cap12(g,F.stay&&!F.summer?T('{season}: let it turn',{season:T(SEASON())}):SEASON(),8,136,150,'#f4e4b8',1)};
ROOMS.cen12={space:.5,walk:[16,304,112,138],get mood(){return MOOD()},get amb(){return F.summer||F.cen?{waves:.8,gulls:.6,creak:.3}:{rain:.7,waves:.6,mallet:.6}},hs:[
  {name:'road to Corinth',x:0,y:104,w:14,h:40,wx:20,wy:124,dir:-1,exit:mine(()=>F.cen?say(P,'I have said goodbye. I do not go back to say it twice.'):goto('street12',26,122,1)),look:'The road back across the neck of land.'},
  {name:'sheds',x:0,y:46,w:128,h:58,wx:70,wy:114,look:'Sheds of dressed stone along the quay, full of jars from Asia and Egypt.'},
  {name:'far pier',x:150,y:60,w:170,h:14,wx:230,wy:114,look:'The far pier. The two of them close the harbor like the ends of a horseshoe.'},
  {name:'ship on the beach',x:150,y:70,w:116,h:36,wx:140,wy:118,dir:1,vis:()=>!F.summer&&!F.cen,look:'A ship hauled out for the winter, propped on her side timbers, her mast taken down. Nobody sails till the sea opens.'},
  {name:'ship for Asia',x:236,y:62,w:84,h:36,wx:226,wy:118,dir:1,vis:()=>!!(F.summer||F.cen),look:()=>say(P,F.cen?'Our ship: for Ephesus, and then on toward Syria.':'A ship for Asia, taking on her last jars.')},
  {name:'plank',x:230,y:98,w:34,h:12,wx:226,wy:118,dir:1,vis:()=>!!F.cen,exit:mine(sail),look:'The plank to the ship.'}]};
ROOMS.agora12={space:.6,get walk(){return HEARING()?[236,236,120,120]:[16,464,112,138]},get mood(){return HEARING()?'seat':MOOD()},amb:{crowd:.6,birds:.2},hs:[
  {name:'steps to the street',x:0,y:56,w:20,h:60,wx:22,wy:124,dir:-1,vis:()=>!HEARING(),exit:mine(()=>goto('street12',610,122,-1)),look:'The steps down to the street.'},
  {name:'rock',x:60,y:0,w:190,h:38,wx:150,wy:114,look:'The rock, straight above the marketplace, with a temple on the very top of it.'},
  {name:'colonnade and shops',x:24,y:46,w:170,h:50,wx:110,wy:114,look:'A colonnade the length of the terrace, and a shop in every bay of it: meat, wine, bronze, and whatever the two harbors bring.'},
  {name:'judgment seat',x:176,y:56,w:146,h:48,wx:236,wy:120,look:()=>say(P,HEARING()?'The proconsul of Achaia, on his seat. He has not looked at me yet.':F.gallio?'The judgment seat. I stood before it, and never said a word.':SEAS()==='s'?'The judgment seat: white marble and blue, with a chair on it. The chair is empty. The old proconsul has gone, they say, and the new one comes with the summer.':'The judgment seat, where the proconsul hears cases: white marble and blue, cut as fine as a ring.')},
  {name:'waiting room',x:320,y:62,w:40,h:42,wx:340,wy:114,vis:()=>!HEARING(),look:'A room beside the platform, where those who have been summoned wait.',open:'Nobody goes in there unless he is sent for.'},
  {name:"potter's wares",x:56,y:100,w:66,h:12,wx:90,wy:116,vis:()=>SEAS()==='u',look:'Pots on a mat: Thrason\'s. No smoke over his kiln.',pickup:'They are for sale.'},
  {name:'proconsul on the judgment seat',x:240,y:28,w:38,h:40,wx:236,wy:120,def:'talk',vis:()=>HEARING(),talk:speak,use:speak,look:'Gallio, the proconsul. A crowd, a charge, and a man who is waiting to see whether it concerns him.'},
  {name:'accusers',x:104,y:70,w:76,h:56,wx:236,wy:120,vis:()=>HEARING(),look:'The whole synagogue, as one man. Sosthenes, who presides over it now, stands in front.',talk:'It is the proconsul who must hear me, not they.'}]};
ROOMS.wait12={space:1.6,walk:[70,300,112,137],mood:'seat',amb:{crowd:.4},hs:[
  {name:'doorway to the square',x:14,y:26,w:46,h:78,wx:70,wy:118,dir:-1,exit:()=>say(P,'Not before I am called.'),look:'The square, and the side of the platform, in the sun. I can hear the crowd.'},
  {name:'bench of marble',x:80,y:84,w:204,h:20,wx:150,wy:113,def:'use',use:prepare,look:'A bench of marble, cold through the mantle.'},
  {name:'floor',x:0,y:118,w:320,h:26,wx:160,wy:124,look:'A floor of small stones in six colors, laid by somebody with patience. Many men have studied it while they waited.'},
  {name:'wall',x:70,y:22,w:240,h:54,wx:190,wy:113,look:'Plain panels. There is nothing in this room to look at but the floor and one\'s own thoughts.'}]};
ROOMS.eph12={space:.5,walk:[90,304,112,138],mood:'eph',amb:{waves:.6,gulls:.5,crowd:.2},hs:[
  {name:'ship',x:0,y:64,w:90,h:36,wx:98,wy:118,dir:-1,look:'The ship that brought us over. She goes on toward Syria as soon as her jars are ashore.'},
  {name:'plank',x:56,y:100,w:34,h:10,wx:98,wy:118,dir:-1,exit:home,look:'The plank to the ship.'},
  {name:'jars',x:92,y:90,w:32,h:16,wx:126,wy:114,dir:-1,look:'Jars and a sack, set down on the quay.',pickup:'They are cargo.'},
  {name:'houses',x:128,y:44,w:70,h:40,wx:164,wy:114,look:'Ephesus. I have seen one street of it, and one house.'},
  {name:'door of the synagogue',x:242,y:62,w:28,h:42,wx:236,wy:116,dir:1,look:()=>say(P,F.asked?'I shall see this door again, if Jehovah is willing.':'The synagogue of Ephesus. I went in, as I do in every city.')}]};
ROOMS.ant12={space:.8,walk:[20,300,112,138],mood:'home',amb:{birds:.4,leaves:.4,crickets:.2},hs:[
  {name:'gate',x:134,y:52,w:48,h:52,wx:158,wy:114,exit:()=>say(P,'I have only just come in by it.'),look:'The gate to the street. I went out by it with Silas, three years ago.'},
  {name:'olive tree',x:20,y:44,w:52,h:60,wx:76,wy:114,dir:-1,look:'The olive tree. It was here when Barnabas brought me to this city.'},
  {name:'bench',x:212,y:88,w:84,h:16,wx:200,wy:114,dir:1,look:'The bench along the wall. This congregation sent me out twice from this court.'},
  {name:'brothers',x:222,y:70,w:44,h:50,wx:206,wy:120,dir:1,def:'talk',talk:finale,look:'Brothers of Antioch. Some I know; some came after I had gone.'}]};

/* ============ PEOPLE ============ */
const pairTalk=async()=>{if(!F.met)return meet();if(!F.sewn)return say(AQ,'The linen is on the bench, brother, and your awl is in your pouch.');if(!F.r1)return say(PR,'Titius Justus is waiting for his roof.');
  if(!F.came)return say(AQ,'Six days at the bench and the seventh in the synagogue. You work like two men, Paul.');if(!F.laid)return say(PR,'You are watching the door, Paul, not the seam. Finish what is yours, and give us the rest.');
  if(F.news&&!F.black){await say(P,'Have you black, for marking?');await say(PR,'A cake of it: soot and gum, dry. Grind it into water. Not too much water.');F.black=1;addItem('black12');return}
  if(F.r2&&!F.night)return say(PR,'Your bundle is by the door.');if(F.night&&!F.stay)return say(AQ,'Well, brother? The ship does not wait past noon.');
  if(F.word&&!F.stay2)return say(AQ,'It is for you to say.');if(F.brought&&!F.marc)return say(PR,'An hour, with two of us. Talk to him: that is what your hands are free for.');
  if(F.summer&&keptAll()&&!F.cloth2)return say(PR,'A second cloth for Justus? Leave it to the bench.');if(F.eph)return say(AQ,'Go, brother, and come back. You will find the bench standing.');if(F.cen)return say(PR,'We have packed a bench before, Paul. It takes less room every time.');
  return say(AQ,F.stay?'Go on, brother. The bench is ours; the street is yours.':'The bench earns for three.')};
const pairHs=a=>({name:'Aquila and Priscilla',actor:a,look:()=>say(P,F.met?'Aquila and Priscilla. I have never heard one of them named without the other.':'A man and a woman at one bench: Jews, by their speech, and not long in this city.'),talk:pairTalk,give:layDown,
  show:{tablets:'You read, and we listen, in the evening when the lamp is lit.',awn12:'It is for hanging, not for looking at. Take it to Justus.',reed12:'A reed? For a hem?',pen12:'You have cut it like a tentmaker, brother. It will write.',black12:'Into water, a little at a time.',sheet12:'A clean sheet. Do not waste it on trying.',mantle12:'Keep it on, brother.','*':'Keep it by you, brother.'}});
AQ.hs=pairHs(AQ);AP.hs=pairHs(AP);
const PAULHS={name:'Paul',actor:P,as:{aq12:{look:'Paul. Since he gave us the awl he has not sat still for an hour.',talk:()=>say(P,'The bench is yours, and I thank you for it. The word has all of me now.'),show:{'*':'Keep it. It is in the right hands.'}}}};
SI.hs={name:'Silas',actor:SI,look:'Silas. He was beaten with me in Philippi, and sent away with me from Thessalonica.',
  talk:async()=>{if(F.news&&!F.sheet){await say(SI,'I have a sheet of papyrus in my bundle, bought in Philippi and never written on. It is yours.');F.sheet=1;addItem('sheet12');return}
    return say(SI,F.gallio?'We stay, Timothy and I. Go in peace.':F.word&&!F.stay2?'I have run from three cities with you. Say the word.':F.r2&&!F.stay?'The ship lies at the eastern harbor.':F.laid?'Now you are free for it, and so am I.':'Macedonia has not forgotten you. You will see.')},
  show:{sheet12:'It is yours now.',tablets:'I know what is on them. I was there for half of it.','*':'Keep it, Paul.'},as:{aq12:{look:'Silas, from Jerusalem. He sleeps in the loft too now.',talk:()=>say(SI,'You took him in when he had nothing but his tools. We know it.'),show:{'*':'It is in good hands.'}}}};
TI.hs={name:'Timothy',actor:TI,look:'Timothy. He has walked from Thessalonica to find me.',talk:timothy,give:writeLetter,show:{tablets:'I learned to read from tablets like these.',reed12:'It is not cut yet.',black12:'It has to be ground first.','*':'I would rather carry it than keep it.'},
  as:{aq12:{look:'Timothy, the young one. He writes a clear hand.',talk:()=>say(TI,'Eunice, my mother, would like your loft. It is tidier than her house.'),show:{'*':'It is in good hands.'}}}};
TJ.hs={name:'Titius Justus',actor:TJ,look:'Titius Justus: a man of this city who worships the God of Israel. His house stands wall to wall with the synagogue.',
  talk:()=>say(TJ,!F.r1?'Shade on my bench at midday, and sun on my figs.':!F.shook?'Come to my table on the Sabbath.':!F.r2?'It is raining on my guests, Paul.':F.summer&&!F.cloth2?'Look at them, Paul: one cloth, for all of these. Can your friends at the bench sew a second?':F.cloth2&&!F.r3?'Half of them are sitting in the sun.':F.gallio?'The door stays open.':'My neighbors do not greet me any more. My court has never been so full.'),
  show:{awn12:'Do not show it to me. Hang it.',tablets:'Read to us on the first day of the week.',mantle12:'I saw what you did with it.','*':'I am no judge of that.'}};
CR.hs={name:'Crispus',actor:CR,look:'Crispus, who presided over the synagogue. He came through this door with his whole household.',talk:()=>say(CR,F.gallio?'Sosthenes presides in that house now. I do not envy him today.':'I have read those scrolls all my life. I am reading them again from the beginning.'),show:{tablets:'I know the passages. It is what they add up to that is new to me.','*':'Keep it, brother.'}};
SP.hs={name:'Stephanas',actor:SP,look:'Stephanas, with his whole household.',talk:()=>say(SP,'My whole household is on that bench. Tell me what there is to do, and we will do it.'),show:{'*':'Give me something to carry, rather.'}};
GA.hs={name:'Gaius',actor:GA,look:'Gaius, a man of this city.',talk:()=>say(GA,'If this court grows too small, mine is larger.'),show:{'*':'Keep it, Paul.'}};
SB.hs={name:'Sabinus',actor:SB,look:'Sabinus. He ships oil to Italy, and wants his cargo covered before the winter.',talk:sabinus,show:{awl:'I do not want to see your awl. I want to see my cover.','*':'Is that my cover? No.'}};
MA.hs={name:'Marcellus',actor:MA,look:'Marcellus, who lives across the street. He looks like a man who has slept badly.',talk:marcellus,show:{'*':'It will not mend my awning.'}};
TR.hs={name:'Thrason',actor:TR,look:'Thrason, a potter. Clay to the elbows.',talk:thrason,show:{'*':'Fired, it would be worth more.'}};
KA.hs={name:'Kallistos',actor:KA,look:'Kallistos, a seaman, with a coil of new cord over his shoulder.',talk:kallistos,show:{'*':'Would it float?'}};
PX.hs={name:'Praxias',actor:PX,look:'Praxias, a runner, come from Asia for the games. He stands as if the ground were hot.',talk:praxias,show:{'*':'It would only slow me down.'}};
EU.hs={name:'Euphron',actor:EU,look:'Euphron, who keeps a booth while the games last, and a shop the rest of the year.',talk:euphron,show:{'*':'I sell, friend. I do not buy.'}};
DE.hs={name:'Decimus',actor:DE,look:'Decimus, a clerk of the proconsul\'s court, with tablets of his own under his arm.',talk:decimus,show:{tablets:'Mine are fuller, and duller.','*':'Is it evidence? Then I do not want to see it.'}};
PH.hs={name:'Philon',actor:PH,look:'Philon, of the synagogue of Ephesus. He has more questions than one Sabbath can hold.',talk:philon,show:{tablets:'Read us more of that. Stay, and read us all of it.','*':'Bring it when you come back.'}};
AT.hs={name:'attendant',actor:AT,look:'An attendant of the proconsul. He has seen many men wait in this room.',talk:()=>say(AT,'You will be called. Sit.'),show:{'*':'Put it away. You bring nothing before the seat but yourself.'}};
AP.def={look:'Nothing there that wants our hands.',pickup:'It is not ours.',use:'That is not bench work.',open:'That is not ours to open.',talk:'Later. There is an order on the bench.',give:'What should we give?'};
AP.noCraft='Not those two together.';

/* ============ WAX TABLETS: people met, tasks still open, the Scriptures, and what he has promised in Corinth ============ */
const TABLETS={
  people:[
    {name:'Aquila and Priscilla',note:'Tentmakers, lately come from Rome. I lodge and work with them.',if:()=>!!F.met},
    {name:'Titius Justus',note:'A worshipper of God. His house adjoins the synagogue.',if:()=>!!F.sewn},
    {name:'Silas and Timothy',note:'Come down from Macedonia.',if:()=>!!F.came},
    {name:'Sabinus',note:'He has ordered a cover for a cargo.',if:()=>!!F.came&&!F.laid},
    {name:'Crispus',note:'The presiding officer of the synagogue. He and his household believe.',if:()=>!!F.r2},
    {name:'Stephanas, and Gaius',note:'Men of this city, and their households.',if:()=>!!F.cloth2},
    {name:'Gallio',note:'The proconsul of Achaia.',if:()=>!!F.summer},
    {name:'Philon',note:'Of the synagogue of Ephesus.',if:()=>!!F.eph}],
  tasks:[
    {t:'Find work, and a roof.',if:()=>!F.met},
    {t:'Sew the linen for Titius Justus.',if:()=>!!F.met&&!F.sewn},
    {t:'Hang it in his court: shade on his bench at midday, sun on his figs.',if:()=>!!F.sewn&&!F.r1},
    {t:'The bench is waiting.',if:()=>!!F.sab&&!F.came},
    {t:'One order of mine is open: the cover for Sabinus. Leave no promise lying on the bench.',if:()=>!!F.came&&!F.laid},
    {t:'Timothy has news from Thessalonica.',if:()=>!!F.laid&&!F.news},
    {t:'A letter: a sheet, a reed, and black.',if:()=>!!F.news&&!F.letter},
    {t:'The synagogue.',if:()=>!!F.letter&&!F.shook},
    {t:'It is raining on the guests of Justus.',if:()=>!!F.shook&&!F.r2},
    {t:'The brothers have packed my bundle.',if:()=>(!!F.r2&&!F.stay)||(!!F.word&&!F.stay2)},
    {t:'Keep on speaking: there are many people in this city.',if:()=>!!F.stay&&!F.r3},
    {t:'The court of Justus is too small for one cloth.',if:()=>!!F.summer&&keptAll()&&!F.r3},
    {t:'They will call me before the judgment seat.',if:()=>!!F.stay2&&!F.gallio},
    {t:'Say goodbye to the brothers.',if:()=>!!F.gallio&&!F.bye},
    {t:'The ship for Ephesus.',if:()=>!!F.cen&&!F.eph},
    {t:'They ask me to stay.',if:()=>!!F.eph&&!F.asked},
    {t:'Home.',if:()=>!!F.asked&&!F.home}],
  scripture:[PS.ne5],
  notes:{title:'NOTED IN CORINTH',none:'Nothing yet.',list:[...PROM.map(q=>({t:q.note,if:()=>!!F[q.p]&&!F[q.k]})),
    {t:()=>T('Kept: {n} of five.',{n:PROM.filter(q=>F[q.k]).length}),if:()=>PROM.some(q=>F[q.k])},
    {t:()=>T('Not needed before the judgment seat: {line}',{line:T(OPEN[Math.max(0,opened())])}),if:()=>!!F.gallio}]}};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={street12:[60,124,1],shop12:[60,122,1],court12:[74,122,1],awn12:[160,236,1],syn12:[150,124,1],isth12:[160,236,1],cen12:[30,124,1],agora12:[40,124,1],wait12:[110,122,1],eph12:[100,122,1],ant12:[158,128,1]};
const EVERY=[AQ,AP,SI,TI,TJ,CR,SP,GA,SB,MA,KA,PX,EU,TR,DE,PH,AT];
function place12(room){const pc=PC();for(const a of EVERY){a.room=null;a.bow=false;a.talk=false}P.bow=false;PR.talk=false;if(setScore&&AU.score!==MUSIC)setScore(MUSIC);
  if(F.cen){P.look=LOOK.paul12c;P.wear='c'}else if(P.wear){P.wear='';P.look=LOOK.paul}
  const e=ENT[room];if(pc===P||!P.room)place(P,room,e[0],e[1],e[2]);
  /* the two at the bench: in the workshop, wherever Paul is, until they sail with him */
  if(F.eph){if(room==='eph12')place(AQ,room,150,120,-1)}
  else if(F.bye){if(pairOn())place(AP,'cen12',196,122,1);else if(room==='cen12')place(AQ,room,196,122,1)}
  else if(pairOn())place(AP,'shop12',196,120,-1);else if(room==='shop12')place(AQ,room,196,120,-1);
  /* whoever is in the workshop is there wherever Paul is: the two at the bench may be looked in on from anywhere */
  if(F.came&&!F.bye&&!(F.gallio&&room==='court12')){place(SI,'shop12',258,124,-1);place(TI,'shop12',284,128,-1)}if(F.came&&!F.laid)place(SB,'shop12',96,118,1);if(F.brought&&!F.marc)place(MA,'shop12',104,124,1);
  if(room==='street12'){const v=SEAS();
    if(F.stay&&v==='w'){if(!F.brought)place(MA,room,278,118,-1);place(TR,room,96,116,1);if(!F.pKal)place(KA,room,222,120,-1)}
    else if(F.stay&&v==='s'){place(TR,room,96,116,1);if(!F.pPra)place(PX,room,332,121,1);place(EU,room,256,116,1);if(!F.pDec)place(DE,room,596,121,-1)}
    else if(F.stay&&v==='u'&&!F.gallio)place(EU,room,280,118,-1)}
  else if(room==='court12'){place(TJ,room,246,116,-1);if(F.r2)place(CR,room,214,121,-1);if(F.cloth2){place(SP,room,196,126,-1);place(GA,room,78,125,1)}if(F.gallio){place(SI,room,132,126,1);place(TI,room,156,130,1)}}
  else if(room==='cen12'){if(!F.summer&&!F.cen&&F.pKal)place(KA,room,200,120,-1);if(F.summer&&!F.cen&&F.pPra)place(PX,room,214,121,-1)}
  else if(room==='agora12'){if(SEAS()==='s'&&F.pDec)place(DE,room,296,121,-1);if(SEAS()==='u'&&!HEARING())place(TR,room,128,117,-1)}
  else if(room==='wait12')place(AT,room,84,120,1);
  else if(room==='eph12')place(PH,room,232,118,-1);
  /* a thing is shown to these two, or laid down with them: it is not handed over as between travelling companions */
  P.hs=PAULHS;P.party=AP.party=0;swapBtn()}
function setup12(){P.hs=PAULHS;P.called='Paul';G.aw12=G.lf12=G.g12=G.let12=null;G.c12=G.c12b=G.c12c=0;G.ink12=0;G.back12='street12';G.caps12=[];drum12.off();place12('street12');G.inv=['tablets','awl','thread','knife'];G.invs={paul:G.inv,aq12:[]};drawInv()}

/* ============ THE START ============ */
async function start12(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(12);G.end={};
    try{await need('map');await SHARED.map.journey([],{view:'aegean',labels:LAB1,seen:['athens','corinth'],pulse:'corinth'});
      await narr('The autumn of the year 50. From Athens he went on alone, to a city with a harbor on either side of it.',{dur:8500});await tell('v1')}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;setScore(MUSIC);place12('street12');enterRoom('street12',...ENT.street12);codeBtn();await fade(0,700);
    await tell('c23');await narr('He had his tools, and no bench to use them at.',{dur:5600});
    await say(P,'A roof first, and work. Somewhere in this street they are cutting goat-hair cloth: I know the smell of it from Tarsus.',TH);codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
const AWH={1:['The sun stands in the south at midday, over the wall of the synagogue. Shade falls away from it, toward the house.','I slide the linen along the rope until it hangs by the house, and step back and look.'],
  2:['Water runs downhill, and it must not run down their wall. His cistern is by the door of the house.','The rope on the high hook at the wall and on the low hook at the house. Then I step back and look.'],
  3:['The morning sun comes over the roof of the house. Whoever sits must have shade; where I read, I need light; and nobody at the door should have cloth in his hair.','The rope on the middle hook at both ends; the linen in the middle of the court; the new cloth in the last quarter, by the house. Then I step back and look.']};
function hint12(){
  if(PC()!==P)return F.brought&&!F.marc?['mend12',['His awning lies on our bench, and Paul is keeping him company.','We use the awl with the torn awning.']]:F.summer&&keptAll()&&!F.cloth2?['second12',['Justus needs a second cloth, and the linen is on the bench.','We use the awl with the length of linen.']]
    :['pair12',['The bench is ours, and the streets are his.','We change back to Paul: the button beside the prayer, or the key C.']];
  if(F.home)return['home12',['I am home. They are waiting to hear it.','I talk to the brothers.']];
  if(F.eph)return F.asked?['plank12',['I have given them my answer.','I go up the plank to the ship.']]:['ask12',['They want a promise. What can I promise that is mine to give?','I talk to Philon, and say that I will come back if Jehovah is willing.']];
  if(F.cen)return['sail12',['The ship is ready, and the bench is aboard.','I go up the plank.']];
  if(F.gallio)return['bye12',['I am not being driven out. There is time to say goodbye.','From the street I go in at the door of Titius Justus.']];
  if(F.stay2)return opened()<0?['open12',['The charge can mean the law of Rome, or the Law of Moses. I should have a first sentence ready.','I use the bench of marble, and choose how I shall begin.']]:['speak12',['I have been called. It is time to speak.','I talk to the proconsul on the judgment seat.']];
  if(F.word)return['stay12b',['Nothing new was said to me in the night. What was said a year ago?','That nobody would attack me here to harm me. I use the bundle, and have it unpacked.']];
  if(F.cloth2)return G.room==='awn12'?['awn312',AWH[3]]:['court312',['The second cloth is sewn.','In the court of Titius Justus I use the rope and hooks.']];
  if(F.summer){if(!F.eup)return['eup12',['Euphron said: when the booths are down, at his own door.','The booths are down. He stands by his door, in the street.']];
    if(!F.thr)return['thr12',['Thrason said: when his kiln is cold, by his pots.','His pots lie on a mat in the marketplace. I go up the steps.']];
    if(!F.pra)return['pra12',['Praxias said: when the games are over, by his ship. He sails for Asia.','Ships for Asia lie at the eastern harbor. I take the road to the harbors, and choose Cenchreae.']];
    return['cloth212',['Justus needs a second cloth, and my awl is not mine now.','I change to Aquila and Priscilla, and use the awl with the length of linen on the bench.']]}
  if(F.spring){if(!F.pPra||!F.pEup||!F.pDec)return['spr12',['The street is full. Keep on speaking.','I talk to the runner by the spring, to the seller at his booth, and to the clerk by the steps.']];
    if(!F.dec)return['dec12',['Decimus said: when the court is not sitting. Where does it sit?','On the judgment seat, in the marketplace. I go up the steps, and look at it.']];
    return['turn12',['I have kept what could be kept this spring.','I take the road to the harbors and, on the picture of the neck of land, let the season turn.']]}
  if(F.stay){if(!F.brought)return['marc12',['A man in the street has a torn awning, and I have no awl.','I talk to Marcellus, and take him to the bench.']];
    if(!F.marc)return['marc12b',['My hands are free. Theirs are not.','I change to Aquila and Priscilla: the button beside the prayer. They use the awl with the torn awning.']];
    if(!F.pThr||!F.pKal)return['win12',['Many people, in this city. I shall not find them at a bench.','I talk to everybody in the street: the potter under the colonnade, and the seaman by the workshop.']];
    if(!F.kal)return['kal12',['He runs to Ephesus and Smyrna. Which harbor looks toward Asia?','I take the road to the harbors, and choose Cenchreae, the eastern one.']];
    return['turn12',['I have kept what could be kept this winter.','I take the road to the harbors and, on the picture of the neck of land, let the season turn.']]}
  if(F.night)return['stay12',['I was told to keep on speaking, and that nobody would harm me here.','I use the bundle by the door: unpack it.']];
  if(F.r2)return['map12',['They mean it well. In every city so far, this was the hour to go.','I go to the opening of the shop, and look at the two harbors.']];
  if(F.shook)return G.room==='awn12'?['awn212',AWH[2]]:['court212',['It is raining on those who came to hear.','In the court of Titius Justus I use the rope and hooks.']];
  if(F.letter)return G.room==='syn12'?['shake12',['I have said all of it, many times. Nehemiah once shook out the fold of his garment.','I use my mantle with the men who oppose me.']]:['syn12',['They have heard me every Sabbath, and now every day.','I go in at the door of the synagogue.']];
  if(F.news){if(!F.pen)return['pen12',['A pen is a reed, cut slanting and slit.',F.reed?'I use my knife with the reed.':'I pick up a reed in the corner of the shop, and use my knife with it.']];
    if(!F.ink)return F.black?['ink12',['Too thin, and it runs. Too thick, and it clogs. The sherd will tell me.','I use the cake of black with the small bowl, twice; then the reed pen with the potsherd. If it clogs, I use the bowl: a few drops of water.']]:['black12',['Tentmakers mark their cloth with black.','I talk to Aquila and Priscilla.']];
    if(!F.sheet)return['sheet12',['Silas has carried a letter before.','I talk to Silas.']];return['write12',['Everything is ready, and Timothy writes a clear hand.','I give the reed pen to Timothy.']]}
  if(F.laid)return['news12',['Timothy has been waiting to tell me something.','I talk to Timothy.']];
  if(F.came)return!F.seam?['seam12',['One order of mine is open. I leave it at a place where another hand can go on.','I use the awl with the half-sewn cover.']]:!F.told?['told12',['Sabinus ordered it from me. He should hear from me whose hand finishes it.','I talk to Sabinus: it will be ready on that day, and Aquila will finish it.']]
    :['lay12',['Macedonia has sent enough. What do I still need an awl for?','I give the awl to Aquila and Priscilla.']];
  if(F.sab)return['bench12',['Six days at the bench.','I go back to the workshop.']];
  if(F.sewn)return G.room==='awn12'?['awn112',AWH[1]]:G.room==='court12'?['court112',['He has hooks in both walls.','I use the rope and hooks.']]:['just12',['The awning is sewn. It is half the work.','In the street: the door of Titius Justus, beside the synagogue.']];
  if(F.met)return['linen12',['They gave me a bench, and the first order.','I use the awl with the length of linen.']];
  return G.room==='shop12'?['meet12',['A man and a woman at one bench, and cloth from my own country.','I talk to them.']]:['shop12',['Goat-hair cloth: I know the smell of it.','I walk to the workshop that is open to the street.']]}

/* ============ CHAPTER DEFINITION ============ */
return{rooms:['street12','shop12','court12','awn12','syn12','isth12','cen12','agora12','wait12','eph12','ant12'],setup:setup12,start:start12,hint:hint12,music:MUSIC,scenes:{dark:dark12,letter:letter12},topics:[],tablets:TABLETS,beds:BEDS,calls:CALLS,
  /* for the playtest: what is told, the promises, the awning and its light, the openings, the roads */
  told:TOLD,ps:PS,prom:PROM,open:OPEN,awn,judge,dark,bays,solved:SOLVED,roundK:ROUND_K,seat:seat12,chord:chord12,back:BACK,sea1:SEA1,sea2:SEA2,season:SEASON,pos2:POS2,pos1:POS1,hk:HK,
  view:'aegean',labels:LAB1,route:SEA1,
  flags:['met','sewn','r1','sab','came','seam','told','laid','news','reed','pen','black','ink','sheet','letter','shook','r2','night','stay','brought','marc','pThr','pKal','kal','spring','pPra','pEup','pDec','dec','summer','thr','eup','pra','cloth2','r3','word','stay2','opA','opB','gallio','bye','cen','eph','asked','home'],
  /* eleven rooms and forty-five flags today; the code keeps room for sixteen and for forty-eight. Two can be played: Paul, and the two at the bench. */
  codeBits:{flags:48,rooms:4},party:['paul','aq12'],ent:ENT,home:{awl12:'aq12',thread12:'aq12'},
  away:id=>id==='aq12'&&!pairOn(),
  inv:room=>['tablets'].concat(F.laid?[]:['awl','thread'],['knife'],F.sewn&&!F.r1?['awn12']:[],F.reed&&!F.pen?['reed12']:[],F.pen&&!F.letter?['pen12']:[],F.black&&!F.ink?['black12']:[],F.sheet&&!F.letter?['sheet12']:[],
    room==='syn12'&&!F.shook?['mantle12']:[],pairOn()?['awl12','thread12']:[]),
  place:place12}
});
