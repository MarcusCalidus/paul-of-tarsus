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
/* materials and light shared by the backdrops of every chapter (shared/materials.js), to the standard of Chapter Fifteen's room of
   Gaius: plank12/board12 quiet grain, crack12 two-tone cracks set by hand (skipCracks12 keeps the random draws of the cracks they
   replace), shadow12 soft contact shadows in three passes of alpha, earth12 a color drawn a little toward its own grey */
const{plank:plank12,board:board12,crack:crack12,skipCracks:skipCracks12,shadow:shadow12,earth:earth12}=SHARED.materials;
/* sun12: the light of a day out of doors, as a light map: the sky and whatever stands up into the sun above hz keep the full day, the
   pools that fn lays (lighter) bring the sunlit walls and paving back up to it, and what they leave lies in the day's shade (amb). */
function sun12(g,w,hz,amb,fn){lightmap(g,w,amb,l=>{l.fillStyle=lg(l,0,0,0,hz,[[0,'#ffffff'],[.7,'#ffffff'],[1,'rgba(255,255,255,0)']]);l.fillRect(0,0,w,hz);fn(l)})}
/* cracks12: cracks cut by hand, [x, y, steps] each, from a seed of their own, so that the rest of the room keeps its shape */
function cracks12(g,seed,list,a){const rb=rng(seed);for(const[x,y,n]of list)crack12(g,x,y,n,rb,a)}
/* joists12: the ceiling over a room, seen from below as in Chapter Fifteen's room of Gaius: joists that run from the wall plate (their
   foot at y = U) toward us and spread as they come, the boards dark between them. Of each joist we see the underside and the side turned
   to the middle of the room; nothing stands on the plate as a post would. The grain of each underside is drawn from rw exactly as the
   upright board it replaces drew it (x0, step: the feet of the joists), so that the rest of the room keeps its shape. */
function joists12(g,x0,step,U,c,rw){const VX=160,VY=72,pu=x=>VX+(x-VX)*VY/(VY-U),pb=x=>VX+(x-VX)*VY/(VY-U+3.4);
  g.fillStyle=lg(g,0,0,0,U,['#1c140e','#2c2018']);g.fillRect(0,0,320,U);tex(g,'wood',.4,0,0,320,U,'overlay',.5);ao(g,0,0,320,U*.7,'t',.45,'#0c0808');
  for(let a=x0;a<320;a+=step){const b=a+6,left=a+3<VX,e=left?b:a,P=[a,U,b,U,pu(b),0,pu(a),0];
    /* the shade the boards gather beside it, the side turned to the middle, and the underside with its grain */
    for(const[d,al]of[[3.4,.14],[1.6,.2]]){poly(g,[a-d,U,a,U,pu(a),0,pu(a-d),0],rgba('#0c0808',al));poly(g,[b,U,b+d,U,pu(b+d),0,pu(b),0],rgba('#0c0808',al*.6))}
    poly(g,[e,U,e,U-3.4,pb(e),0,pu(e),0],left?tint(c,-.34):tint(c,.12));poly(g,P,c);
    const s=(pu(a+3)-(a+3))/U;clipTo(g,()=>poly(g,P),()=>{g.save();g.transform(1,0,-s,1,s*U,0);board12(g,a,0,6,U,c,rw,1);g.restore()});
    stroke(g,[e,U,pu(e),0],left?tint(c,.18):tint(c,.3),.5)}}
const SH='#8f95c8',LIN='#e9dfc2',GOAT='#3d332c',MBL='#e8e3d6',BLU=earth12('#7f93b4',.14);
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
function colonnade(g,x,y,w,h,n,c,o){o=o||{};const bh=o.beam||5,RO='#b9744e';R(g,x,y-h,w,h,o.dark||earth12('#4a4254',.45));
  if(o.back)o.back();comp(g,'multiply',o.sh==null?.5:o.sh,()=>R(g,x,y-h,w,h,earth12('#8a86b0',.45)));
  /* the shade under the roof is deepest under the beam and at the foot of the back wall */
  ao(g,x,y-h,w,Math.min(12,h*.3),'t',.4,'#1e1a24');ao(g,x,y-5,w,5,'b',.22,'#1e1a24');
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
    ao(g,cx-84*k,base-14*k,170*k,14*k,'b',.3,'#5a6040');tex(g,'mott',.3,cx-84*k,base-60*k,170*k,62*k,'overlay',.7)});
  for(let i=0;i<11;i++)foliage(g,cx-74*k+i*15*k+r()*5,base-1-r()*4*k,5*k,2.2*k,o.green||'#6c7a4c',r,12);
  R(g,cx-10*k,base-59.4*k,23*k,1.8*k,tint(C,.2));R(g,cx-10*k,base-59.4*k,23*k,.5,tint(C,.4));
  const tw=Math.max(6,8*k),th=Math.max(3.5,4.4*k),tx=cx-1*k,ty=base-59.4*k;R(g,tx,ty-th,tw,th,'#e6dcc4');for(let i=0;i<3;i++)R(g,tx+1+i*(tw-2)/3,ty-th+1,Math.max(1,(tw-2)/6),th-1,'#a89c86');
  R(g,tx-.5,ty-th-1,tw+1,1.2,'#f0e8d2');poly(g,[tx-.5,ty-th-1,tx+tw+.5,ty-th-1,tx+tw/2,ty-th-3.2],'#d8ccb0')}
/* bench: a stone bench along a wall, in two tiers; the joints of each tier stop short of its edges, and those of the lower tier stand
   between those of the upper one. stool: a wooden bench on two legs, set at its ends. */
function bench(g,x,y,w,c){R(g,x,y,w,2.4,tint(c,.16));R(g,x,y,w,.7,tint(c,.4));R(g,x,y+2.4,w,5,tint(c,-.2));R(g,x,y+7.4,w,2.2,tint(c,.06));R(g,x,y+7.4,w,.6,tint(c,.3));R(g,x,y+9.6,w,5.4,tint(c,-.3));
  for(let i=x+18;i<x+w-6;i+=26)R(g,i,y+3,.6,3.8,tint(c,-.42));for(let i=x+31;i<x+w-6;i+=26)R(g,i,y+10.2,.6,4.6,tint(c,-.46));ao(g,x,y+11,w,4,'b',.35,'#2a2030');
  /* the shade under the lip of the seat, and the weathering of the stone */
  ao(g,x,y+2.4,w,2,'t',.3,'#2a2030');inRect(g,x,y,w,15,()=>tex(g,'mott',.18,x,y,w,15,'overlay',.7))}
function stool(g,x,y,w,c){c=c||'#8a683a';const rw=rng(1290+Math.round(x*7+y));shadow12(g,x+w/2+1,y+7.5,w/2+1,1.1,.36,'#1e1828');
  board12(g,x,y,w,2.2,c,rw);R(g,x,y,w,.6,tint(c,.3));board12(g,x+.6,y+2.2,2,5,tint(c,-.25),rw,1);board12(g,x+w-2.6,y+2.2,2,5,tint(c,-.25),rw,1);ao(g,x,y+2.2,w,1.6,'t',.3,'#1e1828')}
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
const SKY0={a:['#5489c4','#8fb4d8','#d4e0e4','#f0e2c0'],w:['#77818c','#959da4','#b4babc','#c6c8c2'],s:['#4686cc','#84b4e0','#d0e2ec','#eef0dc'],u:['#3b78c6','#74a6da','#c4daea','#f4ecd2'],f:['#4c8aca','#8ab6de','#d2e2ea','#f0ecd8']},
  /* the skies drawn a little toward their own grey (earth12), so that they sit with the stone and plaster under them */
  SKY=Object.fromEntries(Object.entries(SKY0).map(([k,v])=>[k,v.map(c=>earth12(c,.12))])),
  WARM={a:'#fff0cc',w:'#dfe4ea',s:'#fff6dc',u:'#fff2c8',f:'#fff6dc'};
const haze=(g,w,y0,v)=>{comp(g,'soft-light',v==='w'?.22:.4,()=>{g.fillStyle=lg(g,0,y0,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,y0,w,144-y0)});if(v==='w')comp(g,'multiply',.34,()=>R(g,0,0,w,144,'#a9afbd'))};

/* ---------- The road to the western harbor ---------- */
/* A paved street that ran from the marketplace down to Lechaeum, with footways and colonnades with shops (The Watchtower, March 1,
   2009); near its end, by the steps up to the marketplace, a spring gave the shops and the craftsmen their water (Awake!, January 22,
   1991). Over the roofs stand the old temple on its rise and, far off, the rock with the temple on its summit. Where the workshop of
   Aquila and Priscilla stood, nobody knows (Awake!, as above): the game puts it on this street. The synagogue and the house of Titius
   Justus share a wall (Acts 18:7). A marble lintel naming a synagogue of the Hebrews was found near this road; most date it later than
   Paul's day (study note on Acts 18:1), and the chapter's page says so. In winter it rains; in the spring of the games there are booths. */
const PUD_ST=SHARED.weather.puddles(640,111,139,16,1202),PUD_CT=SHARED.weather.puddles(320,111,138,8,1206),PUD_CN=SHARED.weather.puddles(320,112,139,6,1214);
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
  house(g,130,30,94,74,W1,r,{patch:2,cracks:0,beams:14,t:.36});skipCracks12(r,3);R(g,129,25.6,96,2,'#b8603c');for(let i=130;i<224;i+=4)R(g,i,25.6,.5,2,'rgba(90,40,24,.35)');
  R(g,144,52,64,52,'#2a221c');board12(g,142,49,68,3.4,'#6a4e2c',rng(1292));ao(g,142,52.4,68,2.4,'t',.3,'#1a1410');for(const[x,h,c]of[[150,12,GOAT],[162,9,'#4a3e34'],[176,13,GOAT],[190,8,'#5a4a3a']])roll(g,x,103,10,h,c);roll(g,156,91,10,8,'#4a3e34');
  ao(g,144,52,64,14,'t',.6);ao(g,144,52,8,52,'l',.5);windowArt(g,214,60,7,8,W1,{shut:1});
  if(out)awning(g,138,44,76,9,'#a8442c','#e0d2a8',7.6);else{R(g,138,44,76,2.6,'#8a3a26');R(g,138,44,76,.6,'#c06a4c')}
  /* a house with a shuttered shop */
  house(g,224,34,78,70,W2,r,{patch:2,cracks:0,beams:13,t:.36});skipCracks12(r,3);R(g,223,29.6,80,2,'#b8603c');doorArt(g,252,62,22,42,'#6a4a2c',r,{bands:[]});windowArt(g,234,48,10,9,W2,{shut:1});windowArt(g,282,48,10,9,W2,{bars:2});
  /* the spring: a front of dressed stone, an arch, and a basin */
  ashlar(g,302,40,72,64,'#cfc5a8',r,{bw:13,bh:6,v:.1});R(g,300,36,76,4.6,tint('#cfc5a8',.12));R(g,300,36,76,.6,tint('#cfc5a8',.36));
  arch(g,320,60,36,38,'#3a3640');g.save();arch(g,320,60,36,38);g.clip();R(g,320,80,36,18,'#4a5a66');R(g,334.6,72,7,3,'#8a7a5a');R(g,341.6,73.4,1.6,10,'rgba(200,232,244,.85)');ao(g,320,60,36,12,'t',.5);g.restore();
  g.fillStyle=lg(g,316,0,360,0,['#9a9484','#dcd4c0','#bcb4a0','#7e786c']);g.fillRect(316,95,44,9.4);R(g,316,95,44,1,'#eee8d8');R(g,318,96,40,1.6,'#6a9ab0');
  /* the synagogue, and beside it, wall to wall, the house of Titius Justus */
  house(g,374,26,92,78,'#e2d6b4',r,{patch:1,cracks:0,beams:0,t:.36});skipCracks12(r,3);R(g,373,21.6,94,2,'#b8603c');for(const x of[384,446]){R(g,x-1.6,44,12.2,14,tint('#e2d6b4',-.2));R(g,x,45.6,9,11,'#2a2420');for(let i=1;i<3;i++)R(g,x+i*3-.4,45.6,.8,11,'#6a5a44')}
  doorArt(g,404,62,26,42,'#5f4428',r,{bands:[]});R(g,398,53,38,9.4,MBL);R(g,398,53,38,.7,'#ffffff');R(g,398,61.8,38,.6,tint(MBL,-.3));cutLetters(g,['ΣΥΝΑΓΩΓΗ','ΕΒΡΑΙΩΝ'],417,55.8,35,3.6);
  house(g,466,32,96,72,'#dccca4',r,{patch:2,cracks:0,beams:15,t:.36});skipCracks12(r,3);R(g,465,27.6,98,2,'#b8603c');for(let i=466;i<562;i+=4)R(g,i,27.6,.5,2,'rgba(90,40,24,.35)');
  R(g,494,56,34,48,tint(ST,-.1));R(g,494,56,34,1,tint(ST,.3));doorArt(g,498,60,26,42,'#7a5632',r,{bands:[]});R(g,492,102,38,2,tint(ST,.06));R(g,490,104,42,1.6,tint(ST,-.14));
  windowArt(g,474,44,10,9,'#dccca4',{bars:2});windowArt(g,540,44,10,9,'#dccca4',{shut:1});foliage(g,556,60,6,16,'#5f7a44',r,60);stroke(g,[558,104,557,80,555,62],'#5a4a36',1);
  /* the steps up to the marketplace, and the end of its colonnade */
  R(g,562,34,78,70,earth12('#8f8aa0',.5));for(let i=0;i<8;i++){R(g,566+i*1.6,99-i*5,74-i*1.6,5,tint('#d2c8ae',-.025*i));R(g,566+i*1.6,99-i*5,74-i*1.6,.8,'rgba(255,248,226,.5)');R(g,566+i*1.6,103.2-i*5,74-i*1.6,.8,'rgba(60,48,40,.34)')}
  R(g,596,30,44,34,'#4a4254');R(g,594,26,46,4.6,ST);R(g,594,26,46,.6,tint(ST,.3));for(let i=0;i<3;i++)col(g,604+i*15,64,34,5,ST,{fl:3,shade:.08*i});
  poly(g,[562,34,572,58,572,104,562,104],earth12('#9a94a8',.5));ao(g,562,34,78,10,'t',.3,'#2a2440');
  /* cracks cut by hand, high under the eaves, where they run to no head; the shade in the angles where one front meets the next, and
     along the foot of the fronts */
  cracks12(g,1293,[[135,35,3],[219,35,3],[229,40,3],[268,40,3],[378,31,3],[440,30,3],[487,37,4],[531,36,3]]);
  for(const x of[224,302,374,466,562])ao(g,x,30,4,74,'l',.16,'#3a3050');ao(g,130,99,432,5,'b',.22,'#3a3050');
  /* the booths of the spring of the games: cloth roofs on four legs, set at their corners. Each is closed behind by a hanging cloth and in
     front by a counter of boards down to the ground, so that neither the joints of the door behind the first nor the trunk of the tree
     and the edges of the steps behind the second run across its shelf */
  if(v==='s')for(const[x,c1,c2]of[[232,earth12('#3f6f8a',.24),'#e6dcc0'],[538,earth12('#a8642e',.14),'#e6dcc0']]){const rw=rng(1294+x);shadow12(g,x+21,104.8,22,1.2,.34,'#2a2440');
    g.fillStyle=lg(g,0,85,0,96,[tint(c2,-.34),tint(c2,-.16)]);g.fillRect(x+1.6,85,38.4,11);for(let i=0;i<6;i++)R(g,x+3+i*6.4,85,3,11,'rgba(60,44,40,.07)');
    board12(g,x,84,1.6,20,'#6a4e2c',rw,1);board12(g,x+40,84,1.6,20,'#6a4e2c',rw,1);
    awning(g,x-2,78,45.6,7,c1,c2,5.7);ao(g,x+1.6,85,38.4,4,'t',.35,'#2a2440');
    plank12(g,x+1.6,96.6,38.4,7.6,'#7a5a34',rw,0);ao(g,x+1.6,96.6,38.4,2,'t',.3,'#1e1828');board12(g,x+1,95,39.6,2,'#8a683a',rw);
    for(let i=0;i<4;i++)vessel(g,x+7+i*9,95,2.2,4+i%2,i%2?'#9a5a36':'#b8863c','jug',{noShadow:1})}
  pave(g,0,103,640,144,'#cdc09e',r,{vx:320,vy:58,rows:4,step:44,v:.07});ao(g,0,103,640,6,'t',.35,'#3a3050');
  if(v==='w'){/* wet stone: sky sheen, capillary damp along wall bases, and layered puddles */
    SHARED.weather.wetGround(g,0,104,640,40,{puddles:PUD_ST,dampX:36,dampW:536,dampH:7})}
  else shade(g,[36,104,640,104,640,v==='u'?113:110,36,v==='u'?116:112],SH,v==='u'?.44:.32);
  /* the day's light: the sun on the fronts and the open paving, a warm bounce at the foot of the walls; the shop's opening, the
     colonnades and the near paving lie in the day's shade. In winter the light is grey and even, and the shade shallow. */
  if(v==='w')sun12(g,640,30,'#e4e4e8',l=>{pool(l,320,64,360,60,'#ffffff',.6);pool(l,320,122,360,22,'#f4f4f8',.4)});
  else sun12(g,640,32,'#dcd4d2',l=>{pool(l,330,58,330,56,'#ffffff',.8);pool(l,90,70,70,40,'#fff8ec',.4);pool(l,320,114,330,14,'#fff4e0',.55);
    pool(l,330,100,250,6,'#fff0d8',.35);pool(l,600,80,50,30,'#ffffff',.5)});
  haze(g,640,103,v);if(v!=='w')pool(g,300,0,340,150,WARM[v],.1,'screen')},
 light:()=>SEAS()==='w'?{amb:'#c9cdd8'}:null,
 /* rain, in the winter; the water of the spring; and whoever is in the street in this season */
 draw(g,t){for(let i=0;i<3;i++){const k=((t/700+i*.33)%1);R(g,341.7,84+k*10,1.3,1.4,`rgba(230,246,250,${.7*(1-k)})`)}
  const v=SEAS();if(v==='s')cast(g,[['hx12c',70,116,1],['hx12d',86,119,-1],['hx12e',586,118,-1],['hx12f',352,114,1]]);
  else if(v==='u')cast(g,[['hx12c',78,116,1],['hx12f',600,117,-1]]);else if(v==='a')cast(g,[['hx12d',66,117,1]])},
 front(g,t){if(SEAS()==='w')SHARED.weather.rain(g,t,640,{puddles:PUD_ST,splashY:[108,140]})}};
/* rain: delegates to shared/weather.js (short wind-slanted strokes, puddle ripples, damp surfaces) */
const rain=(g,t,w,y1,o)=>SHARED.weather.rain(g,t,w,Object.assign({y1:y1||144},o||{}));

/* ---------- The workshop of Aquila and Priscilla ---------- */
/* A room open to the street: a long bench, rolls of goat-hair cloth from Cilicia and of linen, coils of cord on their pegs, steps to
   the loft where they sleep. Tents were made of goat-hair cloth, of leather and of linen (The Watchtower, November 1, 2012). By night a
   lamp burns on the shelf. Everything in it is invented. */
const NIGHT=()=>!!((F.r2&&!F.night)||(F.word&&!F.stay2));
ART.shop12={w:320,q:12,variant:()=>NIGHT()?'n':SEAS()==='w'?'w':'d',
 paint(g,v){const r=rng(1203),W='#cdbb94',n=v==='n';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:0,brick:'#a8845a',t:.34});skipCracks12(r,5);const rw=rng(1295);
  /* the joists of the ceiling, coming toward us from the wall plate (joists12); the plate; the shade gathers under it, in the corner at
     the right and along the foot of the wall. The cracks are cut by hand, high under the plate, where they run to no head. */
  cracks12(g,1296,[[104,15,3],[190,14,4],[256,16,3]]);
  joists12(g,10,38,9,'#5a4226',rw);board12(g,0,9,320,2.6,'#6a4e2c',rw);
  ao(g,0,11.6,320,12,'t',.44,'#2a2030');ao(g,0,11.6,320,3,'t',.3,'#1a1420');ao(g,296,11.6,24,92,'r',.22,'#2a2030');ao(g,0,95,320,9,'b',.24,'#2a2030');
  /* the opening onto the street: the paving, and the colonnade across the way */
  R(g,14,32,74,72,'#2a221c');if(n){g.fillStyle=lg(g,0,36,0,70,['#141c38','#26304e']);g.fillRect(18,36,66,34);for(let i=0;i<9;i++){const sx=22+r()*58,sy=40+r()*22;if(sy<52)R(g,sx,sy,.8,.8,'rgba(230,236,255,.8)')}
    /* by night as by day the colonnade across the street closes the view, and the street runs back to the same level */
    R(g,18,62,66,26,'#1c1a26');R(g,18,58,66,4,'#4a4a5c');R(g,18,54,66,4,'#3e2c30');for(let i=0;i<4;i++)col(g,26+i*17,88,26,4,'#5a5a6e',{fl:2});
    g.fillStyle=lg(g,0,88,0,104,['#3a3a4a','#4a4a58']);g.fillRect(18,88,66,16)}
  else{g.fillStyle=lg(g,0,36,0,70,v==='w'?['#8d959c','#b9bfc0']:['#78a8d8','#dfe8e2']);g.fillRect(18,36,66,34);R(g,18,62,66,26,earth12('#6a6070',.45));ao(g,18,62,66,6,'t',.35,'#1e1a24');R(g,18,58,66,4,'#d9cfb4');R(g,18,54,66,4,'#b9744e');for(let i=0;i<4;i++)col(g,26+i*17,88,26,4,'#d9cfb4',{fl:2});
    g.fillStyle=lg(g,0,88,0,104,['#cdc09e','#d8cdae']);g.fillRect(18,88,66,16);if(v==='w')for(let i=0;i<30;i++)R(g,18+r()*64,38+r()*62,.5,3,'rgba(220,228,238,.5)')}
  board12(g,12,30,78,3.6,'#6a4e2c',rw);board12(g,12,30,3.6,74,'#5a4226',rw,1);board12(g,86.4,30,3.6,74,'#5a4226',rw,1);ao(g,15.6,33.6,70.8,3,'t',.35,'#120e0c');
  /* the shelf with its lamp; cord on pegs, each coil hanging from its own peg at the top of its ring */
  ao(g,212,54,30,4,'t',.3,'#2a2030');board12(g,212,52,30,2,'#7a5a34',rw);R(g,222,48.4,8,3.6,'#b8733c');R(g,222,48.4,8,.7,'#e0a064');R(g,229.4,47.6,2.2,1.4,'#b8733c');
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
  R(g,116,100,116,4,'rgba(30,22,40,.14)');for(const x of[121,223])shadow12(g,x,104.4,8,1.2,.4,'#1e1828');
  board12(g,114,84,116,4,'#8a683a',rw);R(g,114,84,116,.7,'#c8a06a');R(g,114,87.6,116,.8,'#4a3420');ao(g,114,88.4,116,3,'t',.35,'#1e1828');
  for(const x of[118,220]){clipTo(g,()=>poly(g,[x,88,x+6,88,x+8,104,x-2,104]),()=>plank12(g,x-2,88,10,16,'#5a4226',rw,1));R(g,x,88,6,.6,'#7a5a34');ao(g,x-2,88,10,3,'t',.3,'#1e1828')}
  /* the floor: trodden earth */
  g.fillStyle=lg(g,0,103,0,144,['#a8946c','#b8a67c','#c4b48a']);g.fillRect(0,103,320,41);tex(g,'mott',.32,0,103,320,41,'overlay',1);for(let i=0;i<120;i++){const k=r(),y=104+k*40;R(g,r()*320,y,1+k*2.2,.5+k*.5,r()<.5?'rgba(80,62,40,.25)':'rgba(255,240,206,.2)')}
  ao(g,0,103,320,6,'t',.4,'#2a2030');ao(g,0,103,320,2.4,'t',.3,'#1a1420');
  /* light. By night: the lamp on its shelf first, then what it reaches: the bench under it, the rolls beside it and the floor, in pools
     that are long and low, so that none lies round a head; the night's blue in the opening. By day: the street's light through the
     opening, falling on the floor and the jar and reaching along the bench; the ceiling, the corner by the steps and the near floor lie
     in the room's own shade. */
  if(n)lightmap(g,320,'#4a4460',l=>{pool(l,226,49,26,12,'#ffd9a0',.9);pool(l,226,64,90,34,'#ffcf90',.7);pool(l,206,92,72,20,'#ffcf90',.6);pool(l,250,94,40,26,'#f0b878',.4);
    pool(l,214,118,110,20,'#e8a868',.45);pool(l,52,82,34,30,'#7a84b8',.45);pool(l,58,118,40,12,'#6a72a8',.3);
    comp(l,'multiply',1,()=>{ao(l,0,0,320,24,'t',.4,'#1a1030');ao(l,0,128,320,16,'b',.35,'#1a1030')})});
  else lightmap(g,320,v==='w'?'#9a98a4':'#b0a69c',l=>{pool(l,50,74,84,74,v==='w'?'#e8ecf2':'#fff4d8',.95);pool(l,120,122,170,36,v==='w'?'#dfe3ea':'#ffeecc',.6);
    pool(l,160,94,90,16,v==='w'?'#d8dce4':'#f4e6cc',.35);pool(l,96,108,40,8,v==='w'?'#eef0f4':'#fff4dc',.4);
    comp(l,'multiply',1,()=>{ao(l,0,0,320,26,'t',.3,'#3a3048');ao(l,250,0,70,144,'r',.3,'#3a3048');ao(l,0,130,320,14,'b',.25,'#3a3048')})})},
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
  plaster(g,36,30,248,74,W,r,{patch:2,cracks:0,brick:'#b08a5a',t:.36});skipCracks12(r,4);R(g,36,30,248,1.6,tint(W,.16));ao(g,36,31.6,248,7,'t',.2,'#3a3060');
  /* cracks cut by hand, high under the eaves, where they run to no head */
  cracks12(g,1297,[[44,34,3],[122,33,4],[206,34,3],[258,35,3]]);
  R(g,58,54,30,50,tint(ST,-.1));doorArt(g,61,57,24,47,'#6a4a2c',r,{bands:[]});windowArt(g,150,46,12,10,W,{bars:2});
  /* the wall of the synagogue, at the left, in shade; and the front of the house, at the right, with its door */
  poly(g,[0,8,36,30,36,104,0,132],WL);clipTo(g,()=>poly(g,[0,8,36,30,36,104,0,132]),()=>{tex(g,'mott',.32,0,0,36,140,'overlay',1);for(let i=0;i<9;i++)stroke(g,[0,18+i*13,36,36+i*8],'rgba(50,40,60,.14)',.5);ao(g,26,30,10,74,'r',.18,'#2a2440')});
  poly(g,[320,8,284,30,284,104,320,132],tint(W,.04));clipTo(g,()=>poly(g,[320,8,284,30,284,104,320,132]),()=>{tex(g,'mott',.3,284,0,36,140,'overlay',1);poly(g,[296,56,312,50,312,124,296,112],'#3a2a1c');poly(g,[296,56,312,50,312,53,296,58.6],'#7a5a34');poly(g,[290,40,300,36,300,46,290,49],'#2a2420')});
  for(const[x,y]of[[22,42],[23,51],[24,60]]){R(g,x,y,2,2,'#2a2420');R(g,x,y,2,.6,'#6a625a')}for(const[x,y]of[[296,42],[295,51],[294,60]]){R(g,x,y,2,2,'#2a2420');R(g,x,y,2,.6,'#6a625a')}
  /* the bench by the door of the house; the mouth of the cistern */
  bench(g,236,89,44,ST);R(g,196,100,22,4,tint(ST,-.1));R(g,196,100,22,1,tint(ST,.3));R(g,199,101.4,16,1.8,'#2a2a32');
  if(v==='a'){poly(g,[142,100,186,100,190,105,138,105],'#b89a62');for(let i=0;i<26;i++)R(g,144+r()*40,100.6+r()*3.4,1.6,1.2,r()<.5?'#6a3a52':'#7a4a34')}
  else for(const x of[98,140]){stool(g,x,96,34)}
  if(v==='u'||v==='f')for(const x of[98,140])stool(g,x+4,99.4,34,'#7a5a34');
  for(const[x,c]of[[46,'#9a5a36'],[124,'#8a4a2a']])vessel(g,x,105,3.6,11,c,'jar');foliage(g,272,62,5,13,'#5f7a44',r,50);stroke(g,[274,90,273,74,271,62],'#5a4a36',1);
  pave(g,0,103,320,144,'#cbbf9e',r,{vx:160,vy:60,rows:4,step:42,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  /* the shade gathers in the angles where the side walls meet the back wall, and along the foot of the walls */
  ao(g,36,32,7,72,'l',.26,'#2a2440');ao(g,277,32,7,72,'r',.2,'#2a2440');ao(g,36,98,248,6,'b',.2,'#3a3050');
  if(wet)SHARED.weather.wetGround(g,0,104,320,40,{puddles:PUD_CT,dampX:36,dampW:248,dampH:6});
  else shade(g,[0,132,36,104,96,104,60,144,0,144],SH,.42);
  /* the day's light: the sun on the back wall and the open paving, a warm bounce at its foot; the wall of the synagogue and the near
     paving in the day's shade. In winter the light is grey and even. */
  if(wet)sun12(g,320,24,'#e4e4e8',l=>{pool(l,160,66,170,46,'#ffffff',.55);pool(l,170,120,170,20,'#f4f4f8',.4)});
  else sun12(g,320,24,'#dcd4d2',l=>{pool(l,170,62,160,46,'#ffffff',.8);pool(l,190,114,170,14,'#fff4e0',.55);pool(l,170,101,130,5,'#fff0d8',.35);pool(l,300,70,30,50,'#fff8f0',.35)});
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
 front(g,t){if(CV()==='w'&&!(G.room==='court12'&&F.r2))rain(g,t,320,144,{puddles:PUD_CT,splashY:[108,140]})}};

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
  plaster(g,AX0,28,AX1-AX0,AFL-28,W,r,{patch:1,cracks:0,brick:'#b08a5a',top:-.02,bot:-.2,t:.36});skipCracks12(r,4);
  /* cracks cut by hand, high on the wall, where neither the light nor the cloth has anything to say */
  cracks12(g,1298,[[70,31,3],[150,30,3],[204,32,3]]);R(g,AX0,26,AX1-AX0,2.4,tint(W,.14));R(g,AX0,26,AX1-AX0,.6,tint(W,.36));
  comp(g,'multiply',v==='w'?.3:.46,()=>R(g,AX0,28,AX1-AX0,AFL-28,'#8f8cb4'));
  doorArt(g,228,74,24,44,'#6a4a2c',r,{bands:[]});windowArt(g,233,50,13,10,W,{bars:2});
  /* the two walls, cut through: on the left the synagogue's, on the right the house's; a tiled roof on each */
  /* the shade gathers in the angles where the far wall meets the two walls that are cut through */
  ao(g,AX0,28,8,AFL-28,'l',.26,'#2a2440');ao(g,AX1-8,28,8,AFL-28,'r',.22,'#2a2440');ao(g,AX0,AFL-6,AX1-AX0,6,'b',.2,'#2a2440');
  for(const[x,c,out]of[[36,'#b7ab90',0],[264,'#c9bd9e',284]]){ashlar(g,x,ATOP,20,AFL-ATOP,c,r,{bw:10,bh:6,v:.08});ao(g,x,ATOP,20,AFL-ATOP,x<100?'l':'r',.2,'#2a2440');R(g,x-1,ATOP-2,22,2.4,tint(c,.14));R(g,x-1,ATOP-2,22,.6,tint(c,.36))}
  /* beyond the walls: the synagogue in its own shade, the house in the sun; their color drawn toward the stone's (earth12) */
  R(g,0,30,36,88,earth12('#7f7890',.5));poly(g,[0,22,36,ATOP+6,36,30,0,30],'#b8603c');R(g,0,36,36,82,earth12('#6f6880',.5));tex(g,'mott',.28,0,30,36,88,'overlay',1);ao(g,0,30,36,8,'t',.3,'#2a2440');
  R(g,284,30,36,88,'#b8ab8c');poly(g,[320,22,284,ATOP+6,284,30,320,30],'#b8603c');tex(g,'mott',.28,284,30,36,88,'overlay',1);ao(g,284,30,36,6,'t',.22,'#2a2440');
  for(const y of HY)for(const x of[AX0,AX1-3]){R(g,x,y-1,3,2.4,'#2a2420');R(g,x,y-1,3,.6,'#7a7268')}
  /* the floor, and the ground under it */
  R(g,0,AFL,320,3,tint(ST,.06));R(g,0,AFL,320,.7,tint(ST,.3));for(let i=8;i<320;i+=22+((i*7)%9))R(g,i,AFL+.8,.6,2.2,tint(ST,-.34));
  g.fillStyle=lg(g,0,AFL+3,0,144,['#7a6a50','#6a5a44','#5a4c3a']);g.fillRect(0,AFL+3,320,23);tex(g,'mott',.32,0,AFL+3,320,23,'overlay',1);ao(g,0,AFL+3,320,3,'t',.3,'#2a2030');for(let i=0;i<60;i++)R(g,r()*320,AFL+4+r()*20,1+r()*2,.6+r(),r()<.5?'rgba(40,30,20,.3)':'rgba(220,200,160,.16)');
  /* what stands in the court */
  if(v==='a'){stool(g,BENCH1[0],110,BENCH1[1]-BENCH1[0],'#8a683a');poly(g,[FIGS[0]-2,AFL,FIGS[1]+2,AFL,FIGS[1],AFL-1.6,FIGS[0],AFL-1.6],'#b89a62');for(let i=0;i<22;i++)R(g,FIGS[0]+1+r()*(FIGS[1]-FIGS[0]-3),AFL-3+r()*1.4,1.8,1.4,r()<.5?'#6a3a52':'#7a4a34')}
  else{for(const[,x0,x1]of SEAT3)stool(g,x0,110,x1-x0,'#8a683a');
    if(v==='w'){R(g,244,AFL-1.6,18,2.4,tint(ST,-.14));R(g,244,AFL-1.6,18,.6,tint(ST,.26));R(g,247,AFL-.8,12,1.6,'#22222a')}
    else{const rw=rng(1299);shadow12(g,(READ[0]+READ[1])/2+1,AFL,(READ[1]-READ[0])/2+1,1,.36,'#1e1828');plank12(g,READ[0]+1,104,READ[1]-READ[0]-2,14,'#8a683a',rw,1);ao(g,READ[0]+1,104.4,READ[1]-READ[0]-2,2.4,'t',.35,'#1e1828');
      board12(g,READ[0],102,READ[1]-READ[0],2.4,'#a88048',rw);R(g,READ[0],102,READ[1]-READ[0],.6,'#d8b078')}}
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
  G.caps12=[];const H=['high','middle','low'];cap12(g,T('rope_l_at_the_wall_r_at_the_house',{l:T(H[st.l]),r:T(H[st.r])}),160,131,300);
  cap12(g,st.n===2?T('one_cloth_of_goat_hair'):st.n===1?T('linen_p',{p:T(POS2[st.p])}):T('linen_p_new_cloth_q',{p:T(POS2[st.p]),q:T(POS1[st.q])}),160,138.4,300)}};
const POS2=['by_the_wall','in_the_middle','by_the_house'],POS1=['first_quarter','second_quarter','third_quarter','last_quarter'];

/* ---------- The synagogue of Corinth ---------- */
ART.syn12={w:320,q:12,
 paint(g){const r=rng(1209),W='#ddd0ac',ST='#c6bca2';
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:0,brick:'#b08a5a',t:.32});skipCracks12(r,4);const rw=rng(1300);
  /* the joists of the ceiling, coming toward us from the wall plate (joists12); the shade under the plate, in the corners and along the
     foot of the wall. The cracks are cut by hand, high under the plate, where they run to no head. */
  cracks12(g,1301,[[40,13,3],[128,12,3],[250,13,4]]);
  joists12(g,16,40,8,'#5a4226',rw);board12(g,0,8,320,2.4,'#6a4e2c',rw);
  ao(g,0,10.4,320,12,'t',.42,'#2a2030');ao(g,0,10.4,320,3,'t',.3,'#1a1420');ao(g,0,10,10,94,'l',.24,'#2a2030');ao(g,310,10,10,94,'r',.24,'#2a2030');ao(g,0,95,320,9,'b',.24,'#2a2030');
  for(const x of[96,150,204]){R(g,x-2,24,18,22,tint(W,-.2));g.fillStyle=lg(g,0,26,0,44,['#9aa6b4','#cfd4d2']);g.fillRect(x,26,14,18);for(let i=1;i<3;i++)R(g,x+i*4.6-.4,26,.8,18,'#5a4a36');ao(g,x,26,14,4,'t',.4);R(g,x-3,46,20,1.6,tint(W,.2))}
  R(g,268,44,38,60,tint(W,-.16));doorArt(g,271,47,32,57,'#5f4428',r,{bands:[]});
  bench(g,14,89,70,ST);bench(g,196,89,62,ST);
  R(g,112,101,62,3,'rgba(40,30,60,.12)');for(const x of[115.5,166.5])shadow12(g,x,104.4,5,1.1,.4,'#1e1828');
  board12(g,110,88,62,4,'#8a683a',rw);R(g,110,88,62,.7,'#c8a06a');R(g,110,91.6,62,.8,'#4a3420');board12(g,114,92,3,12,'#5a4226',rw,1);board12(g,165,92,3,12,'#5a4226',rw,1);ao(g,114,92,54,2.4,'t',.35,'#1e1828');
  R(g,130,86.4,18,1.8,'#e6dcc0');R(g,128,85.8,2.6,2.8,'#b89058');R(g,147.4,85.8,2.6,2.8,'#b89058');
  plank12(g,34,62,30,26,'#7a5632',rw);R(g,34,62,30,.8,'#b08a5a');ao(g,34,73,30,4,'t',.4,'#1e1828');g.fillStyle=lg(g,0,58,0,74,['#7a5a8a','#5f4470','#463058'].map(c=>earth12(c,.3)));g.fillRect(32,58,34,15);R(g,32,72,34,1.2,'#c9a14a');for(let i=0;i<5;i++)R(g,36+i*7,59.6,.5,9.6+(i%2)*1.4,'rgba(30,16,50,.3)');
  pave(g,0,103,320,144,'#c9bc9a',r,{vx:160,vy:60,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.3,'#1a1420');
  /* light: the day through the three high windows, a long band along the upper wall and, where it falls, a bright patch for each on the
     floor, long and low; the reader's table and the benches catch what the floor gives back. Nothing round lies where a head comes. The
     corners, the ceiling and the near floor lie in the room's own shade. */
  lightmap(g,320,'#a8a0ac',l=>{pool(l,157,34,110,18,'#eef0f4',.8);for(const x of[103,157,211])pool(l,x+14,124,36,8,'#f4f2ec',.6);pool(l,160,116,190,40,'#f4eede',.45);
    pool(l,141,90,50,10,'#f0ece4',.35);pool(l,49,92,40,8,'#e8e4e0',.3);pool(l,227,92,40,8,'#e8e4e0',.3);
    comp(l,'multiply',1,()=>{ao(l,0,0,60,144,'l',.25,'#3a3048');ao(l,260,0,60,144,'r',.25,'#3a3048');ao(l,0,130,320,14,'b',.25,'#3a3048')})})},
 light:{amb:'#dcd6d8'},draw(g){cast(g,[['op12a',196,121,-1,{ges:1}],['sos12',220,118,-1],['op12b',240,124,-1],['op12c',62,119,1],['hx12b',84,123,1]],lightAt('syn12',200,120))},front(){}};

/* ---------- The neck of land, from above ---------- */
/* A picture, not a room: Corinth below its rock, a gulf on either side, and a harbor on each. Lechaeum, to the west, was the harbor
   for Italy, joined to the city by two long walls; Cenchreae, about 11 kilometers to the east, was the harbor for Asia, Syria and
   Egypt; and across the neck, where it is about 6 kilometers wide, ran a paved trackway on which small ships were hauled from sea to
   sea (Insight, "Corinth", "Cenchreae"; Bearing Thorough Witness, chapter 19, box; The Watchtower, March 1, 2009). No road on it
   crosses another, and each name stands clear of the shore. */
const W1=[0,0,214,0,204,12,190,26,166,36,130,44,90,50,44,55,0,60],W2=[320,144,320,36,290,30,262,34,236,30,216,38,214,56,224,76,236,98,228,120,236,144];
ART.isth12={w:320,q:12,variant:()=>SEAS()==='w'?'w':'d',
 paint(g,v){const r=rng(1211);g.fillStyle=lg(g,0,0,320,144,['#b39a62','#c2a86c','#b8a064']);g.fillRect(0,0,320,144);tex(g,'mott',.4,0,0,320,144,'overlay',1);
  for(let i=0;i<300;i++)oval(g,r()*320,r()*144,.8+r()*1.6,.5+r()*.8,rgba(r()<.5?'#d8c08a':'#7a6a3c',.28));
  for(const[x,y,rx,ry]of[[60,110,70,30],[280,12,40,16],[170,120,40,20]])pool(g,x,y,rx,ry,'#7f9050',.5,'source-over');
  for(const W of[W1,W2]){for(const[w,a]of[[9,.1],[5,.16],[2.4,.3]]){poly(g,W);g.lineWidth=w;g.strokeStyle=rgba('#8cd2d2',a);g.lineJoin='round';g.stroke()}
    poly(g,W);g.fillStyle=lg(g,0,0,320,144,['#1f4c78','#2a618e','#34729c'].map(c=>earth12(c,.16)));g.fill();clipTo(g,()=>poly(g,W),()=>{tex(g,'mott',.3,0,0,320,144,'overlay',1);for(let i=0;i<160;i++)R(g,r()*320,r()*144,1.5+r()*3,.5,rgba(r()<.5?'#6aa6c8':'#163a60',.35))});
    poly(g,W);g.lineWidth=.7;g.strokeStyle='#5a4428';g.stroke()}
  /* hills: small peaks, lit from the north-west */
  for(const[x0,y0,x1,y1]of[[20,92,96,116],[240,8,304,18],[178,128,206,138]]){const n=Math.round(Math.hypot(x1-x0,y1-y0)/5);for(let k=0;k<n;k++){const u=k/n,x=x0+(x1-x0)*u+(r()-.5)*4,y=y0+(y1-y0)*u+(r()-.5)*3,w=2.4+r()*1.6,h=3+r()*2;
    poly(g,[x-w,y,x,y-h,x+w,y],'#7a5c38');poly(g,[x-w,y,x,y-h,x+w*.15,y],'#d6be88')}}
  /* Acrocorinth: craggy multi-faceted rock massif lit from the north-west, with summit curtain wall and temple roof */
  {const P=[127,112,123,101,130,90,141,85,154,85,165,91,170,103,164,113,152,118,136,118];
   poly(g,P.map((v,i)=>i%2?v+2.2:v+3),'rgba(42,34,24,.34)');
   poly(g,P,'#9a845e');
   clipTo(g,()=>poly(g,P),()=>{
     /* sunlit NW escarpment, high limestone ridge, and shadowed SE cliff facets */
     poly(g,[123,101,130,90,141,85,154,85,148,96,136,104,127,112],'#d8c69a');
     poly(g,[130,90,141,85,152,86,146,93,136,96],'#e8dab2');
     poly(g,[154,85,165,91,170,103,164,113,152,118,146,102,150,94],'#786242');
     poly(g,[136,104,146,102,152,118,136,118,127,112],'#8c7450');
     for(const q of[[128,104,136,95,145,92],[134,112,144,104,154,101],[154,93,161,100,165,108],[148,106,156,113]])stroke(g,q,'rgba(52,38,24,.35)',.7);
     tex(g,'mott',.45,122,84,50,36,'overlay',.7);ao(g,122,106,50,14,'b',.3,'#32281e')});
   /* summit fortification rim and tiny gabled temple roof */
   stroke(g,[137,96,142,91.5,152,91.5,157,96,154,101,140,101,137,96],'#d8ccb0',.8);
   R(g,143.5,95.4,7,3.4,'#e8dec6');poly(g,[143,95.4,151,95.4,147,93.2],'#c46c44');R(g,149.2,95.4,1.3,3.4,'#a89e86')}
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
  sky(g,320,62,SKY[v]);if(wet)for(let i=0;i<4;i++)cloud(g,30+i*90,8+(i%2)*8,90,9,r,'#c9ccd0','#878d98');else{cloud(g,70,12,50,4,r);cloud(g,240,8,56,4,r)}
  ridge(g,0,320,62,x=>10+5*Math.sin(x/47+2)+3*Math.sin(x/15)+4*Math.exp(-Math.pow((x-250)/60,2)),wet?['#7f8894','#8d9498']:['#8fa0b4','#a2aeae']);
  g.fillStyle=lg(g,0,60,0,104,(wet?['#5a6f84','#4a6078','#52687c']:['#5d94bc','#3f78a8','#4a84ae']).map(c=>earth12(c,.12)));g.fillRect(0,60,320,44);for(let i=0;i<90;i++){const y=61+r()*42;R(g,r()*320,y,2+r()*6*(y-58)/40,.5,wet?'rgba(214,224,236,.3)':'rgba(214,236,244,.4)')}
  /* the far pier, curving in from the right; and the near one, on which the sheds stand */
  poly(g,[320,64,250,66,190,69,150,73,150,76,190,73,250,71,320,71],ST);stroke(g,[320,64,250,66,190,69,150,73],tint(ST,.3),.7);poly(g,[320,71,250,71,190,73,150,76,320,76],'rgba(30,40,60,.3)');
  ashlar(g,0,46,128,58,'#cdc1a2',r,{bw:13,bh:6,v:.1});R(g,0,41,130,5,'#b8603c');for(let i=0;i<130;i+=5)R(g,i,41,.5,5,'rgba(90,40,24,.3)');R(g,0,40.4,130,.8,'#d88a5c');
  for(const x of[10,50,90]){arch(g,x,60,28,44,'#2e2838');g.save();arch(g,x,60,28,44);g.clip();ao(g,x,60,28,16,'t',.6);for(let i=0;i<3;i++)vessel(g,x+6+i*8,104,3,9+i%2*2,['#9a5a36','#8a4a2a','#a8642e'][i],'amph');g.restore()}
  poly(g,[128,46,136,52,136,104,128,104],earth12('#9a94a8',.5));
  /* the shade under the eaves of the sheds, and along their foot */
  ao(g,0,46,128,4,'t',.3,'#2a2440');ao(g,0,98,136,6,'b',.22,'#3a3050');
  /* in summer/fall: a ship for Asia moored behind the stone edge of the quay and behind the bollards; her mast stands beyond the edge */
  if(!wet)inRect(g,136,0,184,100,()=>SHARED.ship.paint(g,{seed:1215,dir:1,view:'stern',x0:238,x1:322,yBot:100,yWaist:79,
    sternRise:11,sternSpan:42,sternPow:2.2,palette:'lit',gradY0:66,gradY1:100,
    sacks:[[274,3.4,'#b8a47a'],[286,4,'#c6b286'],[298,3.6,'#a8946a'],[312,4.2,'#c2ae82']],
    pitch:{f0:.54,color:'rgba(28,16,10,.42)'},
    wale:{f0:.13,f1:.23,color:'#a2482c'},waleWear:{count:14,c1:'#8c6438',c2:'#c46848'},
    lowerWale:{f0:.47,f1:.54,color:'#3a2416',hi:'#b88a52'},
    beams:{f:.33,x0:256,x1:318,step:16,w:1.8,h:1.8,color:'#24160e',hi:'#d4a66a'},
    scuppers:[266,298],
    sunGlow:{comp:'screen',a:.22,x0:236,x1:280,stops:['rgba(255,228,176,1)','rgba(255,228,176,0)'],rx:236,ry:64,rw:46,rh:36},
    turnShade:{comp:'multiply',a:.28,x0:282,x1:322,stops:['rgba(84,78,124,0)','rgba(84,78,124,1)'],rx:280,ry:64,rw:42,rh:36},
    rail:{x0:240,x1:322,h:1.5,color:'#a37c4a',hi:'#f0cc90'},
    stern:{thick:2.8,sweep:7,rimCol:'#f0cc90',capCol:'#d8ac70'},
    rudders:[{loom:[246,74,248.8,74,243,96,240.2,96],blade:[239.5,94,243.5,94,242,100,237.5,100],hi:[246.4,74.4,240.6,96]}]}));
  /* the quay */
  pave(g,0,103,320,144,'#c9bd9c',r,{vx:160,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,5,'t',.3,'#3a3050');R(g,136,100,184,4,tint(ST,-.12));R(g,136,100,184,.8,tint(ST,.24));
  for(const x of[150,214,290]){R(g,x,96,5,5,'#5a5248');R(g,x,96,5,1,'#8a8278')}
  if(wet){/* a ship hauled out for the winter: the hull on its side timbers, the mast taken down */
    shadow12(g,208,104.4,58,1.8,.4,'#1a1830');
    SHARED.ship.paint(g,{seed:1214,dir:1,view:'full',x0:155,x1:261,yBot:102,yWaist:81,
      bowRise:11,bowSpan:34,bowPow:2.2,sternRise:8,sternSpan:30,sternPow:2.1,palette:'shaded',gradY0:68,gradY1:102,
      pitch:{f0:.53,color:'rgba(24,14,10,.46)'},
      wale:{f0:.13,f1:.23,color:'#8c422c'},waleWear:{count:16,c1:'#785432',c2:'#ac5c42'},
      lowerWale:{f0:.47,f1:.54,color:'#2e1e14',hi:'#9a7248'},
      beams:{f:.33,x0:172,x1:246,step:16,w:1.8,h:1.8,color:'#20140c',hi:'#b89460'},
      scuppers:[184,216],
      turnShade:{comp:'multiply',a:.3,x0:152,x1:264,stops:['rgba(90,94,132,.3)','rgba(90,94,132,.8)'],rx:150,ry:68,rw:116,rh:36},
      rail:{x0:156,x1:260,h:1.5,color:'#967042',hi:'#d8b47c'},
      stem:{thick:2.6,sweep:7,rimCol:'#d8b47c',capCol:'#c29862'},
      stern:{thick:2.6,sweep:6,rimCol:'#c29862',capCol:'#a88050'},
      beachProps:[170,200,232]});
    SHARED.weather.wetGround(g,0,104,320,40,{puddles:PUD_CN,dampX:0,dampW:136,dampH:6})}
  else{
    SHARED.ship.hawser(g,241,78,216.5,97,3);
    SHARED.ship.gangplank(g,{x0:252,y0:80,x1:232,y1:108,w0:9,w1:13,cleats:4});
    shade(g,[136,104,320,104,320,112,136,110],SH,.32)}
  /* the day's light: the sun on the sheds, the ship and the open quay; the arches and the near quay in the day's shade. In winter the
     light is grey and even. */
  if(wet)sun12(g,320,60,'#e4e4e8',l=>{pool(l,170,90,190,40,'#ffffff',.5);pool(l,160,122,180,20,'#f4f4f8',.4)});
  else sun12(g,320,60,'#dcd4d2',l=>{pool(l,64,70,90,30,'#ffffff',.75);pool(l,260,84,90,24,'#ffffff',.7);pool(l,180,114,190,14,'#fff4e0',.55);pool(l,64,101,80,5,'#fff0d8',.35)});
  haze(g,320,103,v);if(!wet)pool(g,180,0,240,150,WARM[v],.1,'screen')},
 light:()=>F.summer||F.cen?null:{amb:'#c9cdd8'},draw(){},front(g,t){if(!F.summer&&!F.cen)rain(g,t,320,144,{puddles:PUD_CN,splashY:[108,140]})}};

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
  ao(g,194,104,128,4,'t',.34,'#2a2440');ao(g,176,104,20,3,'t',.24,'#2a2440');R(g,196,80,124,24,MBL);for(let i=0;i<6;i++){const x=198+i*20.4;R(g,x,85,18,16,i%2?BLU:tint(MBL,-.06));R(g,x,85,18,.7,i%2?tint(BLU,.3):'#ffffff');R(g,x+17.3,85,.7,16,i%2?tint(BLU,-.3):tint(MBL,-.3))}
  R(g,194,77,128,3.6,tint(MBL,.04));R(g,194,77,128,.7,'#ffffff');R(g,194,80.2,128,.6,tint(MBL,-.3));for(let i=0;i<40;i++)R(g,197+i*3.1,82,1.6,1.4,i%2?tint(BLU,-.1):tint(MBL,-.2));
  tex(g,'mott',.2,194,77,128,27,'overlay',.6);ao(g,196,80.8,124,3,'t',.25,'#3a3050');
  for(let i=0;i<5;i++){R(g,176+i*4,100-i*4.6,20-i*4,4.6+i*4.6,tint(MBL,-.05*i-.04));R(g,176+i*4,100-i*4.6,20-i*4,.7,'#ffffff')}
  /* the seat on it: a chair of marble with a high back, and a cloth over its front */
  R(g,246,56,26,21,tint(MBL,-.1));R(g,246,56,26,.8,'#ffffff');R(g,244,66,3.4,11,tint(MBL,-.2));R(g,270.6,66,3.4,11,tint(MBL,-.24));
  g.fillStyle=lg(g,0,68,0,78,['#8a3a4a','#6a2a3a'].map(c=>earth12(c,.22)));g.fillRect(248,68,22,9.4);R(g,248,68,22,.7,earth12('#b8606e',.22));
  /* the waiting room beside it */
  R(g,320,66,40,38,tint(MBL,-.08));R(g,318,62,44,4.4,tint(MBL,.04));R(g,318,62,44,.7,'#ffffff');R(g,330,76,18,28,'#2a2430');R(g,330,76,18,1,'#8a8272');ao(g,330,76,18,8,'t',.5);tex(g,'mott',.2,320,62,40,42,'overlay',.6);ao(g,320,66.4,40,3,'t',.25,'#3a3050');ao(g,318,104,44,3,'t',.3,'#2a2440');
  if(v==='u'||v==='f'){shadow12(g,89,110.4,34,1.4,.34,'#2a2440');poly(g,[60,105,118,105,122,110,56,110],'#a8926a');for(const[x,y,k,c,w,h]of[[66,107,'jar','#9a5a36',3,8],[75,108,'jug','#8a4a2a',2.6,6],[84,107,'amph','#a8642e',3,10],[94,108,'bowl','#b06a3a',3.4,2.6],[103,107,'jar','#7a4226',2.8,7],[112,108,'jug','#9a5a36',2.4,5.4]])vessel(g,x,y,w,h,c,k)}
  pave(g,0,103,480,144,PV,r,{vx:240,vy:56,rows:4,step:46,v:.07,rand:1});ao(g,0,103,480,6,'t',.3,'#3a3050');
  ao(g,0,100,480,4,'b',.2,'#3a3050');shade(g,[24,104,456,104,470,111,10,112],SH,.28);
  /* the day's light: the sun on the rock, the roof, the judgment seat and the open paving; the colonnade and the near paving in the
     day's shade. In winter the light is grey and even. */
  if(v==='w')sun12(g,480,60,'#e4e4e8',l=>{pool(l,250,90,260,40,'#ffffff',.55);pool(l,240,122,260,20,'#f4f4f8',.4)});
  else sun12(g,480,60,'#dcd4d2',l=>{pool(l,258,86,120,30,'#ffffff',.85);pool(l,240,70,260,20,'#ffffff',.5);pool(l,240,114,250,14,'#fff4e0',.55);pool(l,240,101,220,5,'#fff0d8',.35)});
  haze(g,480,103,v);pool(g,240,0,300,150,WARM[v]||WARM.u,.1,'screen')},
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
  plaster(g,0,0,320,104,W,r,{patch:0,cracks:0,t:.3});skipCracks12(r,3);
  /* cracks cut by hand, high on the wall, where they run to no head; the shade under the ceiling, in the corner and along the foot */
  cracks12(g,1302,[[30,5,3],[150,5,3],[290,6,3]]);ao(g,0,0,320,10,'t',.3,'#2e241c');ao(g,306,0,14,104,'r',.22,'#2e241c');for(let i=0;i<5;i++){const x=70+i*48;R(g,x,22,40,54,tint(W,-.07));R(g,x,22,40,.8,tint(W,.2));R(g,x+39.2,22,.8,54,tint(W,-.24));R(g,x,75.2,40,.8,tint(W,-.24))}
  R(g,0,78,320,3,tint(MBL,.04));R(g,0,78,320,.7,'#ffffff');
  /* the doorway onto the square: the side of the platform, in the sun */
  R(g,14,26,46,78,'#2a221c');g.fillStyle=lg(g,0,30,0,70,['#78a8d8','#e2e8de']);g.fillRect(18,30,38,40);R(g,18,62,38,26,MBL);for(let i=0;i<2;i++)R(g,20+i*19,66,17,18,i?BLU:tint(MBL,-.06));R(g,18,60,38,3,'#ffffff');R(g,18,88,38,16,'#cfc3a2');
  R(g,12,24,50,3,tint(MBL,-.1));R(g,12,24,3,80,tint(MBL,-.16));R(g,59,24,3,80,tint(MBL,-.2));
  /* the bench of marble along the wall */
  R(g,84,101,200,3,'rgba(50,36,24,.12)');for(const x of[87.5,275.5])shadow12(g,x,104.4,5,1.1,.4,'#2a2018');g.fillStyle=lg(g,0,86,0,104,[tint(MBL,.04),tint(MBL,-.1),tint(MBL,-.26)]);g.fillRect(82,86,200,18);R(g,80,84,204,3,MBL);R(g,80,84,204,.7,'#ffffff');for(const x of[84,272])R(g,x,87,7,17,tint(MBL,-.2));tex(g,'mott',.2,80,84,204,20,'overlay',.6);ao(g,82,87,200,3,'t',.3,'#3a2e26');
  /* the mosaic floor */
  R(g,0,103,320,41,'#b9ad92');for(let i=0;i<1500;i++){const k=r(),y=106+k*37,x=r()*320,s=1.2+k*1.6;R(g,x,y,s*(1+r()*.5),s*.6,['#e6dcc4','#8a8474','#c9a878','#6f7f94','#d8ceb4','#a8563e'][(r()*6)|0])}
  R(g,0,104,320,2.2,'#4e4238');R(g,0,141,320,3,'#4e4238');ao(g,0,103,320,6,'t',.35,'#3a2e26');
  /* light: the day through the doorway, bright in it and falling long and low across the floor and the near end of the bench; along the
     wall it fades, and nothing round lies where a head comes. The ceiling and the far corner lie in the room's own shade, a warm grey of the earth, as the rest of the city's walls. */
  lightmap(g,320,'#b0a698',l=>{pool(l,37,64,28,44,'#fff4d8',.95);pool(l,66,100,30,7,'#fff0d4',.45);pool(l,96,118,110,18,'#ffeecc',.75);pool(l,150,126,170,30,'#ffeecc',.4);pool(l,104,92,44,8,'#fff0d4',.35);
    comp(l,'multiply',1,()=>{ao(l,0,0,320,20,'t',.25,'#3e3228');ao(l,240,0,80,144,'r',.25,'#3e3228');ao(l,0,132,320,12,'b',.2,'#3e3228')})})},
 light:{amb:'#e0dace'},draw(){},front(){}};

/* ---------- Ephesus ---------- */
/* A quay, and a street that climbs from it to the door of a synagogue (Acts 18:19). The temple of the city is not in this picture:
   it is kept for the chapter in which the account turns on it. Everything here is invented. */
ART.eph12={w:320,q:12,
 paint(g){const r=rng(1219),W='#e0d2ae';
  sky(g,320,60,SKY.f);cloud(g,80,12,50,4,r);cloud(g,250,8,50,4,r);
  ridge(g,0,320,64,x=>12+7*Math.sin(x/53+1)+4*Math.sin(x/17),['#9aa8b8','#a9b2aa']);ridge(g,90,320,84,x=>16+8*Math.exp(-Math.pow((x-250)/80,2))+2*Math.sin(x/11),['#b6b17e','#a49f6a']);
  for(let i=0;i<8;i++)foliage(g,110+i*26+r()*8,70+r()*5,6,3,'#6f8250',r,18);for(const[x,y,h]of[[120,76,12],[300,72,14]])cypress(g,x,y,h);
  g.fillStyle=lg(g,0,62,0,104,['#5d94bc','#3f78a8','#4a84ae'].map(c=>earth12(c,.12)));g.fillRect(0,62,96,42);for(let i=0;i<40;i++){const y=63+r()*40;R(g,r()*96,y,2+r()*5,.5,'rgba(214,236,244,.4)')}
  R(g,96,62,34,42,'#a8a070');foliage(g,112,84,12,6,'#7c8a52',r,40);R(g,96,100,34,4,'#bcb298');
  /* the stern of the ship that brought them, moored behind the stone edge of the quay and behind the bollards */
  inRect(g,0,0,96,100,()=>SHARED.ship.paint(g,{seed:1219,dir:-1,view:'stern',x0:-2,x1:78,yBot:100,yWaist:78,
    sternRise:12,sternSpan:44,sternPow:2.2,palette:'lit',gradY0:64,gradY1:100,
    bales:[[6,14,4.8,'#a89468'],[22,12,6.2,'#8e7a52'],[38,16,4.2,'#d8cdb0']],
    pitch:{f0:.54,color:'rgba(26,16,10,.42)'},
    wale:{f0:.13,f1:.23,color:'#a2482c'},waleWear:{count:14,c1:'#8c6438',c2:'#c46848'},
    lowerWale:{f0:.47,f1:.54,color:'#3a2416',hi:'#b88a52'},
    beams:{f:.33,x0:8,x1:64,step:16,w:1.8,h:1.8,color:'#24160e',hi:'#d4a66a'},
    scuppers:[16,46],
    sunGlow:{comp:'screen',a:.24,x0:36,x1:82,stops:['rgba(255,228,176,0)','rgba(255,228,176,1)'],rx:34,ry:62,rw:50,rh:38},
    turnShade:{comp:'multiply',a:.28,x0:0,x1:40,stops:['rgba(84,78,124,1)','rgba(84,78,124,0)'],rx:0,ry:62,rw:42,rh:38},
    rail:{x0:-2,x1:76,h:1.5,color:'#a37c4a',hi:'#f0cc90'},
    stern:{thick:2.8,sweep:7,rimCol:'#f0cc90',capCol:'#d8ac70'},
    rudders:[{loom:[68,74,70.8,74,76,96,73.2,96],blade:[72.5,94,76.5,94,78,100,73.5,100],hi:[68.4,74.4,73.6,96]}]}));
  /* houses up the street; the door of the synagogue, with a porch of two posts at its ends */
  house(g,128,48,70,56,W,r,{patch:2,cracks:0,beams:13,t:.36});skipCracks12(r,3);R(g,127,43.6,72,2,'#b8603c');windowArt(g,142,62,10,9,W,{shut:1});doorArt(g,170,66,18,38,'#6a4a2c',r,{bands:[]});
  house(g,198,36,122,68,'#e6dabb',r,{patch:1,cracks:0,beams:0,t:.36});skipCracks12(r,3);R(g,197,31.6,124,2,'#b8603c');for(const x of[210,292]){R(g,x-1.6,50,12.2,14,tint('#e6dabb',-.2));R(g,x,51.6,9,11,'#2a2420');for(let i=1;i<3;i++)R(g,x+i*3-.4,51.6,.8,11,'#6a5a44')}
  R(g,236,58,40,46,tint('#e6dabb',-.14));doorArt(g,242,62,28,42,'#5f4428',r,{bands:[]});R(g,234,54,44,4.4,'#d9cfb4');R(g,234,54,44,.7,'#f4ecd6');ao(g,236,58.4,40,3,'t',.3,'#2a2440');
  /* cracks cut by hand, high under the eaves, where they run to no head; the shade where the fronts meet, and along their foot */
  cracks12(g,1303,[[133,53,3],[192,53,3],[222,40,3],[284,41,3],[312,42,3]]);ao(g,198,36,4,68,'l',.16,'#3a3050');ao(g,128,99,192,5,'b',.22,'#3a3050');
  for(const[x,c,k]of[[104,'#9a5a36','amph'],[112,'#8a4a2a','amph'],[120,'#a8642e','jar']])vessel(g,x,105,3.4,11,c,k);sack(g,96,105,5,8,'#c8b890');
  pave(g,0,103,320,144,'#cdc09e',r,{vx:200,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');R(g,0,100,96,4,'#bcb298');R(g,0,100,96,.8,'#e6dcc4');for(const x of[40,86]){R(g,x,96,5,5,'#5a5248');R(g,x,96,5,1,'#8a8278')}
  SHARED.ship.hawser(g,76,78,88,97,2.5);
  SHARED.ship.gangplank(g,{x0:54,y0:80,x1:70,y1:108,w0:9,w1:13,cleats:4,sunSide:'r'});
  shade(g,[128,104,320,104,320,112,120,113],SH,.32);
  /* the day's light: the sun on the house fronts, the ship and the open quay; the near quay in the day's shade */
  sun12(g,320,60,'#dcd4d2',l=>{pool(l,230,70,110,40,'#ffffff',.8);pool(l,50,84,70,24,'#ffffff',.7);pool(l,180,114,190,14,'#fff4e0',.55);pool(l,224,101,110,5,'#fff0d8',.35)});
  haze(g,320,103,'f');pool(g,160,0,220,150,WARM.f,.1,'screen')},
 light:null,draw(g){cast(g,[['hx12k',226,114,1],['hx12l',288,115,-1]])},front(){}};

/* ---------- Antioch ---------- */
/* The court in Antioch of Syria where the journey began (Acts 15:35, 40), painted anew, in the light of evening. */
ART.ant12={w:320,q:12,
 paint(g){const r=rng(1221),W='#e2d2aa';
  sky(g,320,50,['#5a7ab4','#a8b0c8','#e8c8a0','#f4d8a8']);cloud(g,90,14,60,5,r,'#ffe8c8','#b89ab0');cloud(g,250,10,50,4,r,'#ffe8c8','#b89ab0');
  ridge(g,0,320,52,x=>12+8*Math.sin(x/61)+4*Math.sin(x/23+1),['#8f8aa8','#a89a9c']);
  plaster(g,0,36,320,68,W,r,{patch:3,cracks:0,brick:'#b08a5a',t:.36});skipCracks12(r,5);
  /* cracks cut by hand, high under the coping, where they run to no head; the shade under the coping */
  cracks12(g,1304,[[92,39,3],[206,39,3],[300,40,3]]);ao(g,0,36,320,5,'t',.28,'#3a3050');R(g,0,32,320,4.6,tint(W,.12));R(g,0,32,320,.6,tint(W,.36));for(let i=4;i<320;i+=10){R(g,i,28,6,4.4,tint(W,.06));R(g,i,28,6,.6,tint(W,.3))}
  /* the gate, open: the street beyond it */
  R(g,128,48,60,56,tint(W,-.2));arch(g,134,52,48,52);g.fillStyle=lg(g,0,52,0,104,['#e8c8a0','#c8b090','#b8a888']);g.fill();g.save();arch(g,134,52,48,52);g.clip();R(g,134,84,48,20,'#c2b594');R(g,140,70,12,14,'#d8caa4');R(g,158,66,14,18,'#c8b890');ao(g,134,52,48,12,'t',.4);g.restore();
  boards(g,122,58,12,46,4,'#6a4a2c',r);boards(g,182,58,12,46,4,'#6a4a2c',r);
  /* an olive tree, benches, jars */
  stroke(g,[42,104,40,84,46,70],'#5a4a36',3);stroke(g,[41,86,32,72],'#5a4a36',2);foliage(g,44,58,26,15,'#6f8456',r,220);foliage(g,58,64,14,9,'#84966a',r,60);
  ao(g,0,98,320,6,'b',.22,'#3a3050');bench(g,212,89,84,'#cfc5a8');stool(g,70,96,36);for(const[x,c,k]of[[204,'#9a5a36','jar'],[304,'#8a4a2a','pithos']])vessel(g,x,105,k==='pithos'?5:3.6,k==='pithos'?14:10,c,k);
  pave(g,0,103,320,144,'#cdbf9c',r,{vx:160,vy:58,rows:4,step:44,v:.07});ao(g,0,103,320,6,'t',.35,'#3a3050');
  shade(g,[0,104,320,104,320,118,0,122],earth12('#9a8cb8',.3),.4);
  /* the light of evening, low from the west: warm on the wall and the open paving, the gateway and the near paving in shade */
  sun12(g,320,36,'#d8ccca',l=>{pool(l,150,66,190,40,'#fff2e0',.75);pool(l,160,114,200,14,'#ffeedc',.5);pool(l,180,101,150,5,'#ffe8d0',.3)});
  comp(g,'soft-light',.5,()=>{g.fillStyle=lg(g,0,0,0,144,['rgba(255,214,150,.5)','rgba(255,200,140,.9)']);g.fillRect(0,0,320,144)});pool(g,160,60,200,90,'#ffd8a0',.14,'screen')},
 light:{amb:'#f4e2cc'},draw(g){cast(g,[['hx12m',96,116,1],['hx12n',232,114,-1],['hx12b',254,117,-1],['hx12a',70,121,1]],'#f4e2cc')},front(){}};

/* ---------- The letter, seen close ---------- */
/* A sheet of papyrus on the bench: its fibers run one way, the lines of writing are short strokes of uneven length that stop short of
   the edge, and the reed lies beside the sheet, not across it. G.let12 says how many lines stand on it. */
function letter12(g,t){const r=rng(1223),n=(G.let12||{n:0}).n;
  /* three broad oak planks with natural tone shifts, bevel seams, and fine wood grain */
  const planks=[[0,46,'#6e502d','#5e4223'],[46,50,'#664a28','#563c20'],[96,48,'#5e4324','#4e361c']];
  /* each plank with a quiet grain of its own (plank12): long streaks that stop inside the plank, never ruled from edge to edge; the random
     draws of the old full-width streaks are still taken, so the sheet and the lines on it keep their place */
  const rw=rng(1305);for(const[py,ph,c0,c1]of planks){plank12(g,0,py,VW,ph,mix(c0,c1,.5),rw,0);for(let i=0;i<22;i++)r();
    if(py>0){R(g,0,py,VW,.9,'rgba(22,12,6,.55)');R(g,0,py+.9,VW,.6,'rgba(210,170,116,.16)')}}
  tex(g,'mott',.14,0,0,VW,VH,'overlay',.9);
  /* papyrus sheet with natural horizontal fiber strips, gentle edge aging, and contact shadow */
  R(g,95,13,134,117,'rgba(16,9,5,.45)');g.fillStyle=lg(g,92,10,92,126,['#ebddb4','#e2d2a2','#d6c28e']);g.fillRect(92,10,132,116);
  for(let y=11;y<125;){const hh=1+r()*2.2;R(g,92,y,132,hh,r()<.5?'rgba(146,112,56,.08)':'rgba(255,248,220,.12)');y+=hh}
  tex(g,'mott',.16,92,10,132,116,'overlay',.8);ao(g,92,10,132,7,'t',.14,'#6e4c1e');ao(g,92,118,132,8,'b',.18,'#6e4c1e');
  R(g,92,10,132,.8,'#f8eed0');R(g,92,10,.7,116,'#f4e8c4');R(g,223.3,10,.7,116,'rgba(90,64,34,.35)');
  for(let j=0;j<Math.min(n,17);j++){let x=102+(j%5===0?8:0);const y=20+j*5.9,end=j===Math.min(n,17)-1?150+r()*30:206+r()*8;while(x<end){const l=2.6+r()*5.4;R(g,x,y,Math.min(l,end-x),1.1,'rgba(36,26,22,.86)');x+=l+1.6}}
  /* reed pen with shadow and highlighted shaft, inkwell with wet gleam, and shaded pumice stone */
  poly(g,[248,105.5,252,103.5,288,36,285,34],'rgba(16,9,5,.36)');
  poly(g,[246,104,250,102,286,34,283,32],'#baa868');stroke(g,[247.5,102.5,283.6,33],'#e0d090',.7);poly(g,[246,104,250,102,251.4,98,248,97],'#261812');
  oval(g,264,118,14,6.6,'rgba(16,9,5,.42)');oval(g,262,116,13.4,6.6,'#7a4226');oval(g,262,115.2,12.2,5.6,'#9a5a36');oval(g,262,114.6,10.6,4.4,'#181010');oval(g,258.6,113.4,4.6,1.4,'rgba(148,142,172,.55)');
  oval(g,56,106,12,7.2,'rgba(16,9,5,.38)');oval(g,54,104,11.4,7.2,'#b8a678');oval(g,52.8,102.8,9.4,5.6,'#d2c294');oval(g,50.8,101.8,2.8,1.8,'#9c8c60');oval(g,58,106,2.2,1.5,'#8e7e54');
  comp(g,'multiply',.46,()=>{g.fillStyle=rg(g,160,66,225,['#fff2d6','#76666e']);g.fillRect(0,0,VW,VH)})}
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
const AQ=actor('aquila12','aquila_and_priscilla','#b8d0e8',112),AP=actor('aq12','aquila_and_priscilla','#b8d0e8',112),
  SI=actor('silas12','Silas','#9fd8c8',118),TI=actor('timothy12','Timothy','#b8e0b0',150),TJ=actor('justus12','titius_justus','#f0d8a8',96),
  CR=actor('crispus12','Crispus','#d8d0f0',88),SP=actor('steph12','Stephanas','#b8e0b0',104),GA=actor('gaius12','Gaius','#f0c8a0',128),
  SB=actor('sabin12','Sabinus','#e8b8a0',120),MA=actor('marc12','Marcellus','#e0d8c0',100),KA=actor('kal12','Kallistos','#a8c8e8',108),
  PX=actor('prax12','Praxias','#f0e8b8',146),EU=actor('euph12','Euphron','#a8d8e0',116),TR=actor('thra12','Thrason','#e8c8a0',94),
  DE=actor('dec12','Decimus','#d8d8c8',134),PH=actor('philon12','Philon','#e0e0f0',90),AT=actor('att12','attendant','#e0c0b0',110);
const pairOn=()=>!!F.laid&&!F.eph,PAIR=()=>AP.room?AP:AQ;
const PR={color:'#f0b8c0',pitch:186,name:'Priscilla',talk:false,get room(){return PAIR().room},get x(){const a=PAIR();return a.x-13*a.dir},get y(){return PAIR().y}};
const MATE={fig:'prisca12',dx:-13,voice:PR,get talk(){return PR.talk}};AQ.mate=MATE;AP.mate=MATE;AQ.called=AP.called='Aquila';

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 18:1-22, verse by verse, told by the narrator in paraphrase, each with its reference; and with it what Paul's letters
   say of these months. None of it is put into a mouth, and none of it stands in quotation marks: a paraphrase is never presented as
   a quotation (CONTRIBUTING section 1). */
const TOLD={
 v1:'athens_lay_behind_acts_18_1',
 v2:'claudius_had_commanded_acts_18_2',
 v3:'tents_were_their_trade_acts_18_3',
 v4:'every_sabbath_found_acts_18_4',
 v5a:'they_were_silas_acts_18_5',
 v5b:'from_then_on_the_word_acts_18_5',
 v6a:'jews_though_set_acts_18_6',
 v6b:'paul_shook_out_his_garments_before_them_acts_18_6',
 v7:'titius_justus_who_acts_18_7',
 v8:'crispus_who_presided_acts_18_8',
 v9:'one_night_the_lord_acts_18_9',
 v10:'lord_was_with_him_acts_18_10',
 v11:'word_of_god_was_acts_18_11',
 v12:'it_was_in_gallios_acts_18_12',
 v13:'worship_of_god_acts_18_13',
 v14:'before_paul_could_acts_18_14',
 v15:'disputes_about_words_acts_18_15',
 v16:'accusers_were_driven_acts_18_16',
 v17:'right_before_the_judgment_acts_18_17',
 v18a:'after_a_good_acts_18_18',
 v18b:'paul_was_under_a_vow_acts_18_18',
 v19:'ship_put_in_at_ephesus_acts_18_19',
 v20:'more_than_once_acts_18_20',
 v21:'he_took_his_leave_acts_18_21',
 v22:'caesarea_was_where_he_landed_acts_18_22',
 v23:'he_stayed_there_for_a_while_acts_18_23',
 /* from his letters */
 c23:'he_came_to_them_1_corinthians_2_3',
 k119:'when_he_was_in_need_2_corinthians_11_9',
 t36:'brothers_there_were_1_thessalonians_3_6',
 t11:'it_went_out_from_paul_1_thessalonians_1_1',
 t217:'he_had_been_parted_1_thessalonians_2_17',
 t527:'every_one_of_the_brothers_1_thessalonians_5_27',
 c924:'only_one_runner_1_corinthians_9_24',
 c925:'they_do_it_for_a_crown_1_corinthians_9_25',
 a166:'on_the_way_out_the_holy_acts_16_6',
 c116:'crispus_and_gaius_1_corinthians_1_14_16',
 c1615:'household_of_stephanas_1_corinthians_16_15'};
const tell=(k,ms,low)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62),low});
/* the one passage on his tablets: a note in his own words with its reference, never the wording of a translation */
const PS={ne5:{ref:'nehemiah_5_13',gist:'nehemiah_shook_out_the_fold'}};

/* ============ HELPERS ============ */
/* think: Paul weighs what to do. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){if(q)await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok){if(o.say)await say(P,o.say);return o}await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* come: a room is shown, with everyone in his place. goto: Paul walks from one place to the next. step: into a close view, or out. */
async function come(room,ms){place12(room);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,ms||600)}
async function goto(room,x,y,dir){await fade(1,260);place12(room);if(x!=null)place(P,room,x,y,dir);enterRoom(room,P.x,P.y,P.dir);codeBtn();await fade(0,260);const r=ROOMS[room];if(r.enter)await r.enter()}
/* mine: an exit is Paul's. When the two at the bench are played, they stay at it. */
const mine=fn=>()=>PC()!==P?say(PC(),'our_place_is_at_the_bench'):fn();
const lit12=(x,y)=>lightAt(G.room,x,y);
/* the dark of a scene that is told and not shown */
async function darkly(fn){await fade(1,500);G.scene=dark12;const m=AU.mood;AU.mood='night';AU.amb={};await fade(0,300);await fn();await fade(1,400);G.scene=null;AU.mood=m}

/* ============ AUTUMN: the same trade ============ */
async function toShop(){if(F.sab&&!F.came){await fade(1,260);place12('shop12');place(P,'shop12',124,122,-1);enterRoom('shop12',124,122,-1);codeBtn();await fade(0,260);return arrive()}
  await goto('shop12',60,122,1);if(!F.met)return meet()}
async function meet(){await say(AQ,'peace_stranger_said');
  await say(P,'goat_hair_woven_tight_cilician');
  await say(PR,'you_know_how_it_fights_the_knife');
  await say(AQ,'we_came_from_rome_with_what');await tell('v2');
  await say(P,'i_am_paul');
  await say(PR,'there_is_the_loft_and_there');await tell('v3');
  await narr('they_had_been_put_out_of_one',{dur:7000});
  await say(AQ,'begin_with_the_linen');F.met=1;SFX.good();codeBtn()}
async function sewAwning(){if(!F.met)return say(P,'not_my_bench_and_not_my_cloth');if(F.sewn)return say(P,'it_is_hemmed_and_ringed');
  SFX.sew();await say(P,'linen_is_kinder_to_the_awl');
  await narr('three_days_three_pairs_of_hands',{dur:7000});F.sewn=1;addItem('awn12');
  await say(AQ,'take_it_to_him')}
async function toCourt(){if(!F.sewn)return say(P,'good_door_with_a_frame');
  if(F.r1&&!F.shook)return say(P,F.sab?'his_court_is_shaded_and_he':'it_hangs_as_he_wanted_it');
  if(F.stay&&!F.summer)return say(P,'they_meet_there_on_the_first');
  if(F.summer&&!keptAll())return say(P,'three_people_in_this_city');
  await goto('court12',74,122,1)}
async function courtEnter(){if(F.sewn&&!F.r1&&!G.c12){G.c12=1;await say(TJ,'tentmaker_from_tarsus');
    await say(TJ,'you_see_the_hooks_three')}
  if(F.shook&&!F.r2&&!G.c12b){G.c12b=1;await say(TJ,'my_house_is_open_to_you');
    await say(P,'linen_is_for_the_sun');
    await say(TJ,'hang_it')}
  if(F.cloth2&&!F.r3&&!G.c12c){G.c12c=1;await say(TJ,'second_cloth');
    await say(GA,'you_read_from_where_the_wall')}
  if(F.gallio&&!F.bye)return farewell()}
/* the close view: in, and out */
async function toAwn(id){if(PC()!==P)return say(PC(),'paul_hangs_it');if(id&&id!=='awn12')return false;
  if(awnDone())return say(P,roundNo()===2&&F.r2?'it_sheds_the_rain_into_his_cistern':'it_hangs_as_it_should');
  if(roundNo()===3&&!F.cloth2)return say(P,'one_cloth_and_a_court_full');
  await fade(1,220);awn();place12('awn12');enterRoom('awn12',160,236,1);codeBtn();await fade(0,260);
  if(!G.aw12.told){G.aw12.told=1;await say(P,roundNo()===1?'rope_from_a_hook_in_one':roundNo()===2?'one_cloth_of_goat_hair_said':'two_cloths_now',TH)}}
async function outAwn(){await fade(1,220);place12('court12');place(P,'court12',150,120,1);enterRoom('court12',150,120,1);codeBtn();await fade(0,260)}
const HK=['high','middle','low'];
async function hook(side,i){const st=awn();if(awnDone())return;if(st[side]===i)return say(P,'rope_is_on_that_hook_already',TH);st[side]=i;SFX.creak()}
async function slide(which){const st=awn();if(awnDone())return;if(st.n===2)return say(P,'it_reaches_from_wall_to_wall',TH);
  if(which==='p')st.p=(st.p+1)%3;else st.q=(st.q+1)%4;noise({d:.16,v:.06,f:2600,q:.8})}
const WRONG={bench:[()=>TJ,'my_bench_is_in_the_sun_still'],figs:[()=>TJ,'my_figs'],
  wall:[()=>TJ,'it_is_running_down_the_wall'],belly:[()=>PR,'it_does_not_run_at_all'],
  slow:[()=>PR,'it_runs_but_slowly'],read:[()=>P,'i_cannot_see_my_own_tablets'],
  end:[()=>SP,'old_man_at_the_end_has'],mid:[()=>GA,'women_in_the_middle_are'],door:[()=>CR,'my_household_by_the_door'],
  hair:[()=>GA,'those_who_stand_by_the_door']};
async function lookAwn(){const st=awn();if(awnDone())return say(P,'it_hangs_as_it_should',TH);const j=judge(st);
  if(j){const[who,line]=WRONG[j];return say(who(),line,who()===P?TH:undefined)}
  chord12();SFX.good();const n=st.n;await wait(500);await outAwn();
  if(n===1){F.r1=1;delItem('awn12');await say(TJ,'shade_where_i_sit_and_sun');await say(P,'in_tarsus_and_in_a_few');
    await say(TJ,'here_is_what_we_agreed');await sabbaths()}
  else if(n===2){F.r2=1;await say(TJ,'dry_to_the_last_bench_and_the_water');await crispus()}
  else{F.r3=1;await year()}}
async function sabbaths(){await fade(1,400);place12('street12');place(P,'street12',380,122,1);enterRoom('street12',380,122,1);await fade(0,500);
  await narr('six_days_the_bench_was_full',{dur:7000});await tell('v4');F.sab=1;codeBtn();
  await say(P,'six_days_to_the_sabbath',TH)}

/* ============ LATE IN THE YEAR: the awl laid down, and a letter ============ */
async function arrive(){place(SI,'shop12',40,118,1);place(TI,'shop12',64,123,1);await narr('late_in_that_year_two_men',{dur:6500});await tell('v5a');
  await say(TI,'paul_we');
  await say(SI,'from_the_brothers_in_macedonia');await tell('k119');
  await say(P,'i_owe_this_bench_nothing');F.came=1;place12('shop12');place(P,'shop12',124,122,-1);codeBtn();
  await say(P,'one_order_of_mine_is_open',TH)}
async function closeSeam(){if(F.seam)return say(P,'sewn_to_the_corner_and_the_thread');SFX.sew();
  await say(P,'i_sew_on_to_the_corner');F.seam=1}
async function sabinus(){if(F.told)return say(SB,'on_the_day_before_the_sabbath_then');
  if(!F.seam){await say(SB,'my_cover_tentmaker');return say(P,'half_said')}
  await say(SB,'my_cover');let av=[0,1,2];
  for(;;){const Q=['it_will_be_ready_on_that_day','from_today_i_do_not_sew','somebody_will_see_to_it'],i=av[await choose(av.map(i=>Q[i]))];await say(P,Q[i]);
    if(i===0){await say(SB,'aquila');F.told=1;return}
    await say(SB,i===1?'my_cover_said':'somebody_said');av=av.filter(x=>x!==i)}}
async function layDown(id){if(id!=='awl'&&id!=='thread')return false;if(!F.came)return say(AQ,'keep_it_brother_there');
  if(!F.seam||!F.told){await say(AQ,'with_an_order_of_yours');return}
  await say(P,'keep_these_for_me');delItem('awl');delItem('thread');SFX.pick();
  await say(AQ,'we_will_keep_them_oiled');await say(PR,'go_and_say_it_paul');F.laid=1;G.invs.aq12=['awl12','thread12'];place12('shop12');codeBtn();await tell('v5b');
  await narr('from_that_day_the_bench',{dur:7000});SFX.good()}
async function timothy(){if(!F.laid)return say(TI,'i_have_more_to_tell_you');
  if(F.letter)return say(TI,F.gallio?'silas_and_i_stay_paul':'it_will_be_read_to_all');
  if(F.news)return say(TI,'sheet_a_reed_and_ink');
  await say(TI,'i_come_from_thessalonica');await tell('t36');
  await say(TI,'they_ask_after_you_every_day');
  await say(P,'it_is_too_much_for_one');
  await say(SI,'i_carried_a_letter_once_from_jerusalem');F.news=1;codeBtn();
  await say(P,'wax_does_not_travel',TH)}
function ink(){if(G.ink12==null)G.ink12=0;return G.ink12}
async function grind(id){if(id==='black12'){if(ink()>=4)return say(P,'it_is_paste_already',TH);G.ink12++;noise({d:.3,v:.05,f:1800,q:.6});return say(P,'i_grind_a_little_of_the_cake',TH)}
  if(id==='pen12')return say(P,'first_i_try_it_on_the_sherd',TH);return false}
async function water(){if(!F.news)return say(P,'small_bowl_of_water');if(F.ink)return say(P,'it_is_right_as_it_is');if(ink()<=0)return say(P,'it_is_water_still',TH);G.ink12--;SFX.splash();return say(P,'few_drops_more_of_water',TH)}
async function tryInk(id){if(id!=='pen12')return id==='reed12'?say(P,'reed_that_has_not_been',TH):false;if(F.ink)return say(P,'black_and_it_stays');scratch12();
  const k=ink();if(k===2){F.ink=1;delItem('black12');SFX.good();return say(P,'black_and_it_stays_where')}
  return say(P,['water_the','gray_and_it_runs_along_the_sherd','','it_clogs_the_slit_and_comes','paste_said'][k],TH)}
async function writeLetter(id){if(id!=='pen12'&&id!=='sheet12')return false;
  if(!(F.pen&&F.ink&&F.sheet))return say(TI,!F.pen?'i_have_no_reed_paul':!F.sheet?'on_what':'reed_is_cut');
  await say(P,'sit_to_it_timothy');delItem('pen12');delItem('sheet12');place(TI,'shop12',176,112,1);TI.bow=true;await wait(500);
  walk(P,250,126);await tell('t11');walk(P,130,128);await narr('he_walked_up_and_down_between',{dur:6000});await tell('t217');
  await fade(1,300);G.let12={n:13};G.scene=letter12;await fade(0,300);scratch12();await tell('t527');await narr('what_he_could_not_go_and_say',{dur:5600});
  await fade(1,300);G.scene=null;TI.bow=false;F.letter=1;place12('shop12');place(P,'shop12',150,124,1);codeBtn();await fade(0,300);
  await narr('brother_who_was_going_north',{dur:7500});
  await say(P,'now_the_synagogue',TH)}

/* ============ WINTER: one door further ============ */
async function toSyn(){if(!F.met)return say(P,'synagogue_said');if(F.shook)return say(P,'that_door_i_have_left');
  if(!F.letter)return say(P,F.sab?'on_the_sabbath':'on_the_sabbath_i_shall');
  await goto('syn12',150,124,1);await narr('every_sabbath_he_had_said',{dur:6500});await tell('v6a');addItem('mantle12',1);
  await say(P,'i_have_said_it_on_many_sabbaths',TH)}
async function shake(id){if(id!=='mantle12')return false;await narr('he_took_the_fold_of_his_mantle',{dur:6000});noise({d:.25,v:.08,f:1400,q:.6});await tell('v6b');
  await narr('he_had_told_them_on_many_sabbaths',{dur:6000});F.shook=1;delItem('mantle12');
  await fade(1,400);place12('street12');place(P,'street12',452,122,1);enterRoom('street12',452,122,1);codeBtn();await fade(0,500);
  await narr('he_did_not_go_far',{dur:5600});await tell('v7');await goto('court12',74,122,1)}
async function crispus(){place(CR,'court12',72,121,1);await narr('that_winter_someone_new',{dur:8000});
  await say(CR,'i_have_presided_over_the_house');
  await say(P,'there_is_room_on_the_bench_crispus');await tell('v8');await tell('c116');codeBtn();await evening()}
/* the road out, the first time: the others propose it */
async function evening(){await fade(1,500);place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,600);
  await say(AQ,'whole_synagogue_heard_you');
  await say(PR,'we_have_been_put_out_of_a_city');
  await say(SI,'in_thessalonica_we_left_the_same_night');
  await narr('in_every_city_before_this_one',{dur:7000})}
async function toMap(){if(PC()!==P)return say(PC(),'our_place_is_at_the_bench');await fade(1,220);place12('isth12');enterRoom('isth12',160,236,1);codeBtn();await fade(0,260)}
async function fromMap(to){await fade(1,220);const r=G.back12||'street12';place12(r);if(r==='street12')place(P,r,to==='e'?610:26,122,to==='e'?-1:1);else if(r==='shop12')place(P,r,60,122,1);enterRoom(r,P.x,P.y,P.dir);codeBtn();await fade(0,260)}
async function vision(){await fromMap();await narr('he_had_not_said_yes_and_he',{dur:6500});
  await darkly(async()=>{await tell('v9',9000);await tell('v10',9000)});F.night=1;place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,700);
  await narr('in_the_morning_the_bundle',{dur:6000})}
async function harbor(w){const first=F.r2&&!F.night,morn=F.night&&!F.stay,again=F.word&&!F.stay2;
  if(first){await say(P,w==='l'?'lechaeum_and_a_ship_for_italy':'cenchreae_and_a_ship_for_asia',TH);await say(P,'it_is_what_i_have_done',TH);return vision()}
  if(morn)return say(P,'i_was_told_to_keep_on_speaking',TH);
  if(again)return say(P,'year_ago_i_was_told_that_nobody',TH);
  if(w==='l')return say(P,F.pKal&&!F.kal?'lechaeum_ships_for_italy_sicily_and_spain':F.pPra&&F.summer&&!F.pra?'lechaeum_ships_for_the_west':'western_harbor',TH);
  if(F.gallio)return say(P,'soon_first',TH);
  if(!(F.pKal&&!F.kal)&&!(F.pPra&&F.summer&&!F.pra))return say(P,'eastern_harbor_two_hours_on_foot',TH);
  await fade(1,300);place12('cen12');enterRoom('cen12',30,124,1);codeBtn();await fade(0,300);
  await narr(F.summer?'two_hours_on_foot_across':'two_hours_on_foot_in_the_rain',{dur:6500})}
async function unpack(){if(PC()!==P)return say(PC(),'it_is_his_bundle');
  if(F.r2&&!F.night){await say(P,'my_bundle_packed_by_other_hands',TH);return}
  if(F.night&&!F.stay){await say(P,'unpack_it');await say(SI,'what_has_changed_since_last_night');
    await say(P,'i_was_told_to_keep_on_speaking_said');
    await say(PR,'we_unpack');SFX.pick();F.stay=1;place12('shop12');codeBtn();await tell('v11');await narr('he_stayed',{dur:4200});
    return say(P,'many_people_in_this_city',TH)}
  if(F.word&&!F.stay2){await say(P,'unpack_it_said');await say(AQ,'nothing_new_has_been_said_to_you');
    await say(P,'nothing_new');SFX.pick();F.stay2=1;codeBtn();return toSeat()}
  return say(P,'there_is_no_bundle_to_unpack')}

/* ============ WHERE AND WHEN: the year and six months ============ */
/* After the night of the vision the city is walked through its seasons: winter, the spring of the games, summer. There are people in
   the street whom Paul has no errand with, and he speaks to them all the same (Acts 18:9). Some have no time now, and say when they
   have: not where, and not in which season. That has to be worked out from what the city is. A promise is noted on the tablets and
   kept in its season, and Paul will not let a season go while somebody is expecting him. PROM: each promise, the flag that is set when
   it is made, the flag when it is kept, and the note. Who comes to believe is not the player's doing: the narrator says what Acts
   18:8 and 18:10 say, and no more. Every one of these people is invented. */
const PROM=[
 {k:'kal',p:'pKal',note:'kallistos_a_seaman_on_the_run'},
 {k:'thr',p:'pThr',note:'thrason_a_potter_when_his_kiln'},
 {k:'dec',p:'pDec',note:'decimus_a_clerk_of_the_court'},
 {k:'pra',p:'pPra',note:'praxias_a_runner_when_the_games'},
 {k:'eup',p:'pEup',note:'euphron_who_keeps_a_booth'}];
const keptAll=()=>!!(F.thr&&F.eup&&F.pra),SEASON=()=>F.bye?'spring_of_the_year_52':F.summer?'summer_of_the_year_51':F.spring?'spring_of_the_year_51':F.shook?'the_winter':'autumn_of_the_year_50';
async function turn(){if(!F.stay)return say(P,'seasons_turn_by_themselves',TH);if(F.summer)return say(P,keptAll()?'this_summer_is_not_over_yet':'three_people_in_this_city_said',TH);
  if(!F.spring){if(!F.brought||!F.pThr||!F.pKal)return say(P,'there_are_people_in_that_street',TH);
    if(!F.marc)return say(P,'man_is_waiting_at_the_bench',TH);
    if(!F.kal)return say(P,'kallistos_is_expecting',TH);
    await fade(1,500);F.spring=1;G.back12='street12';place12('street12');place(P,'street12',60,124,1);enterRoom('street12',60,124,1);codeBtn();await fade(0,700);
    await narr('rain_stopped_and_the_ships',{dur:10500});
    return narr('visitors_slept_in_tents',{dur:8500})}
  if(!F.pPra||!F.pEup||!F.pDec)return say(P,'street_has_never_been_so_full',TH);
  if(!F.dec)return say(P,'decimus_said_when_the_court',TH);
  await fade(1,500);F.summer=1;G.back12='street12';place12('street12');place(P,'street12',60,124,1);enterRoom('street12',60,124,1);codeBtn();await fade(0,700);
  await narr('games_ended_and_the_booths_came_down',{dur:8500})}
async function marcellus(){if(F.brought)return say(MA,'they_say_that_you_left');
  await say(MA,'you_are_the_tentmaker');
  await think(null,[{q:'come_with_me',ok:1,say:'come_with_me'},
    {q:'i_will_mend_it_for_you',no:'with_what'}]);F.brought=1;
  await goto('shop12',60,122,1);await say(PR,'lay_it_on_the_bench');
  await say(P,'their_hands_are_busy_and_mine',TH)}
async function mend(id){if(id!=='awl12'&&id!=='thread12')return false;if(!F.brought||F.marc)return false;SFX.sew();await say(AP,'closed_and_doubled_where_it_tore');F.marc=1;
  await say(MA,'i_had_the_tentmaker_for_an_hour');await say(PR,'come_next_door_on_the_first');place12('shop12');codeBtn()}
async function thrason(){if(G.room==='agora12'){if(F.thr)return say(TR,'i_am_turning_it_over_tentmaker');
    await say(TR,'cold_as_a_stone_since_the_new');await say(P,'i_have');
    await narr('he_talked_until_the_shadow',{dur:6500});F.thr=1;SFX.good();return after3()}
  if(F.pThr)return say(TR,'when_it_is_cold_i_said');
  await say(TR,'not_now_friend');await say(P,'when_then');
  await say(TR,'when_it_is_cold');F.pThr=1;SFX.pick();codeBtn()}
async function kallistos(){if(G.room==='cen12'){if(F.kal)return say(KA,'when_the_sea_opens_i_am_gone');
    await say(KA,'you_came');
    await narr('he_talked_until_the_rain_stopped',{dur:7000});F.kal=1;SFX.good();return codeBtn()}
  if(F.pKal)return say(KA,'at_the_ship_i_said');
  await say(KA,'time_said');
  await say(KA,'not_here_i_only_walked');await say(P,'where_does_she_lie');
  await say(KA,'where_does_a_ship_lie_that_runs');F.pKal=1;SFX.pick();place12('street12');codeBtn()}
async function praxias(){if(G.room==='cen12'){if(F.pra)return say(PX,'crown_that_does_not_perish');
    await say(PX,'second_said');await tell('c924');await tell('c925');
    await say(P,'i_know_of_a_race_in_which');
    await narr('he_talked_until_the_shipmaster',{dur:6000});F.pra=1;SFX.good();return after3()}
  if(F.pPra)return say(PX,'after_i_have_run');
  await say(PX,'after_i_have_run_stranger');await say(P,'after_it');
  await say(PX,'after_it_i_go_home_crown');F.pPra=1;SFX.pick();place12('street12');codeBtn()}
async function euphron(){if(F.summer){if(F.eup)return say(EU,'my_wife_wants_to_hear_it_too');
    await say(EU,'booth_is_down_and_the_takings');await say(P,'i_still_do');
    await narr('he_talked_until_the_lamps',{dur:5600});F.eup=1;SFX.good();return after3()}
  if(F.pEup)return say(EU,'when_the_booths_are_down');
  await say(EU,'during_the_games_i_sell');F.pEup=1;SFX.pick();codeBtn()}
async function decimus(){if(G.room==='agora12'){if(F.dec)return say(DE,'i_shall_be_at_my_table');
    await say(DE,'you_are_quick');await say(P,'it_is_not_sitting');
    await say(DE,'it_is_the_old_proconsul');
    await narr('he_talked_while_the_clerk',{dur:6500});F.dec=1;SFX.good();return codeBtn()}
  if(F.pDec)return say(DE,'when_the_court_is_not_sitting');
  await say(DE,'i_write_for_the_court_of_the_proconsul');F.pDec=1;SFX.pick();place12('street12');codeBtn()}
async function after3(){codeBtn();if(keptAll())await say(P,'i_have_kept_what_i_promised',TH)}
async function toAgora(){if(!F.stay)return say(P,'steps_to_the_marketplace');await goto('agora12',40,124,1)}
async function sewSecond(id){if(id!=='awl12'&&id!=='thread12')return false;if(!(F.summer&&keptAll())||F.cloth2)return false;SFX.sew();
  await say(AP,'second_cloth_half_as_wide',{to:PR});F.cloth2=1;await say(PR,'stephanas_is_at_the_door');codeBtn()}
async function year(){await say(SP,'shade_on_every_bench_and_light');await tell('c1615');
  await narr('year_had_gone_by_since',{dur:7500});codeBtn();
  await fade(1,500);F.word=1;place12('shop12');place(P,'shop12',150,124,1);enterRoom('shop12',150,124,1);codeBtn();await fade(0,600);
  await say(SI,'they_have_agreed_among');
  await say(AQ,'new_one');
  await narr('this_time_nobody_spoke',{dur:6000})}

/* ============ ABOUT TO SPEAK: the judgment seat ============ */
const OPEN=['i_am_a_roman_and_i_have','what_i_teach_is_what_the_law','proconsul_i_thank_you_that_i'],
  opened=()=>F.opA&&F.opB?2:F.opB?1:F.opA?0:-1;
/* the drum before the seat: struck by hand, bar after bar, until it is stopped */
const drum12={t:0,on(){this.off();if(!AU.ctx)return;seat12();this.t=setInterval(()=>seat12(),.16*40*1000)},
  /* off: no more is struck, and what has been struck ahead is not heard: the music is held silent until those strokes are past */
  off(){if(!this.t)return;clearInterval(this.t);this.t=0;if(AU.mus&&AU.ctx){const g=AU.mus.gain,t=now();g.cancelScheduledValues(t);g.setValueAtTime(0,t);g.setValueAtTime(0,t+6.6);g.linearRampToValueAtTime(.55,t+7.4)}}};
async function toSeat(){await fade(1,600);await narr('in_the_morning_they_came_for_him',{dur:4600});place12('wait12');enterRoom('wait12',110,122,1);codeBtn();await fade(0,600);await tell('v12');await tell('v13');
  await say(AT,'sit_there');
  await say(P,'contrary_to_the_law',TH)}
async function prepare(){if(opened()>=0)return say(P,'i_have_my_first_sentence',TH);
  await say(P,'when_i_am_told_to_speak',TH);const i=await choose(OPEN);await say(P,OPEN[i],TH);if(i!==1)F.opA=1;if(i>0)F.opB=1;
  await say(P,'that_is_how_i_begin',TH);await say(AT,'paul_of_tarsus_out');
  await fade(1,300);G.g12={};place12('agora12');enterRoom('agora12',236,120,1);codeBtn();await fade(0,400);drum12.on();
  await narr('square_before_the_seat_was_full',{dur:8000})}
async function speak(){if(F.gallio)return;drum12.off();P.talk=true;await wait(420);P.talk=false;G.g12=G.g12||{};G.g12.say=1;await tell('v14');await tell('v15');G.g12.say=0;await tell('v16');
  G.g12.gone=1;await narr('he_had_his_first_sentence_ready',{dur:6500});
  await fade(1,500);G.scene=g=>backdrop(g,'agora12',76);AU.mood='night';await fade(0,500);await tell('v17');await fade(1,500);G.scene=null;F.gallio=1;G.g12=null;
  place12('agora12');place(P,'agora12',236,122,1);enterRoom('agora12',236,122,1);codeBtn();await fade(0,600);
  await say(P,'nobody_laid_a_hand_on_me',TH)}

/* ============ IF JEHOVAH IS WILLING: goodbye, Cenchreae, Ephesus, home ============ */
async function farewell(){await narr('winter_passed_and_another_spring_came',{dur:5000});await tell('v18a');
  await say(SI,'timothy_and_i_stay_paul_said');
  await say(TJ,'cloths_stay_where_you_hung_them');await say(CR,'go_in_peace_you');
  await narr('nobody_drove_him_out_of_corinth',{dur:6000});F.bye=1;
  await fade(1,500);place12('cen12');enterRoom('cen12',60,124,1);codeBtn();await fade(0,600);await tell('v18b');F.cen=1;place12('cen12');codeBtn();
  await say(AP,'bench_is_aboard_two_awls')}
const SEA1=[['cenchreae','offsamos','new sea'],['offsamos','ephesus','new']],SEA2=[['offsamos','caesarea','new sea'],['caesarea','jerusalem','new'],['jerusalem','antioch','new']],
  LAB1={corinth:{lab:'l'},athens:{lab:'b',dx:6,dy:7.2},ephesus:{lab:'r'}},LAB2={};
async function sail(){if(!F.cen)return say(P,'that_ship_is_not_mine');
  try{await need('map');await SHARED.map.journey(SEA1,{view:'aegean',labels:LAB1,seen:['corinth'],speed:2600});await narr('across_the_sea_that_he',{dur:7000})}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.eph=1;playAs(P);place12('eph12');enterRoom('eph12',100,122,1);codeBtn();await fade(0,600);await tell('v19');
  await narr('some_two_years_earlier',{dur:6500});await tell('a166');
  await say(AQ,'we_stay_here_paul');await say(PR,'when_you_come_back_there')}
async function philon(){if(F.asked)return say(PH,'we_shall_hold_you_to_the_first');
  await say(PH,'you_have_reasoned_with_us');
  await think(null,[{q:'i_will_come_back',no:'that_is_a_promise_and_i'},
    {q:'i_cannot_say_whether_i',no:'that_is_true'},
    {q:'i_will_be_back_with_you',ok:1,say:'i_will_be_back_with_you'}]);await tell('v20');await tell('v21');F.asked=1;codeBtn();
  await say(PH,'we_shall_hold_you_to_the_first')}
async function home(){if(!F.asked)return say(P,'they_are_still_standing');
  try{await need('map');await SHARED.map.journey(SEA2,{labels:LAB2,speed:2400});await tell('v22',null,0)}catch(e){console.error(e)}
  await fade(1,500);G.scene=null;setScore(MUSIC);F.home=1;place12('ant12');enterRoom('ant12',158,128,1);codeBtn();await fade(0,700);
  await narr('it_was_the_courtyard_from_which',{dur:6500})}
async function finale(){AU.mood='home';await say(P,'peace_brothers');
  await narr('in_corinth_nobody_had_to_let',{dur:7500});
  endScreen({title:'tentmakers_of_corinth_2',text:'he_came_with_his_tools',
    based:'based_on_acts_18_1_22_16',
    go:'click_to_look_back_along_the_road',code:['chapter_thirteen_code_code',codeOf(13,0)]});
  await wait(1500);ov.onclick=()=>{ov.onclick=null;ov.className='';lookBack()};await new Promise(()=>{})}
/* lookBack: the roads of all twelve chapters, journey by journey, so that no two of them cross on one map; then what Acts says next.
   BACKLAB: where the names stand on the map of the second journey, clear of its roads and of each other. The two towns that were
   only passed through, and the pass north of Antioch, keep their place on the road and have no dot and no name on this map. */
const BACKLAB={derbe:{lab:'r',dy:3.3},philippi:{lab:'l',dy:-2},amphipolis:{hide:1},apollonia:{hide:1},syriangates:{hide:1},thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:14,dy:7.2},corinth:{lab:'l'},ephesus:{lab:'r'}};
const BACK=[
 [[['damascus','jerusalem'],['jerusalem','caesarea'],['caesarea','tarsus','sea'],['tarsus','antioch']],{},'from_damascus_to_jerusalem'],
 [[['antioch','seleucia'],['seleucia','salamis','sea'],['salamis','paphos'],['paphos','perga','sea'],['perga','antiochp'],['antiochp','iconium']],
   {view:'north',labels:{salamis:{lab:'r',dy:4.2},paphos:{lab:'l',dy:2.6}}},'sent_out_from_antioch_across'],
 [[['perga','antiochp'],['antiochp','iconium'],['iconium','lystra'],['lystra','derbe'],['perga','attalia'],['attalia','seleucia','sea'],['seleucia','antioch']],
   {view:'north',labels:{derbe:{lab:'r',dy:3.3}}},'to_lystra_and_derbe_and_back'],
 [[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium'],['iconium','antiochp'],['antiochp','westroad'],['westroad','bithynianroad'],['bithynianroad','troas'],
   ['troas','samothrace','sea'],['samothrace','neapolis','sea'],['neapolis','philippi'],['philippi','amphipolis'],['amphipolis','apollonia'],['apollonia','thessalonica'],['thessalonica','beroea'],['beroea','seaward'],['seaward','athens','sea'],
   ['cenchreae','offsamos','sea'],['offsamos','ephesus']],{view:'aegean',seen:['corinth'],labels:BACKLAB},
   'through_galatia_to_troas'],
 [SEA2.map(l=>l.slice(0,2).concat(/sea/.test(l[2])?['sea']:[])),{labels:LAB2},'home_caesarea_up_and_down_to_antioch']];
async function lookBack(){G.busy=true;lock(true);try{await need('map');for(const[legs,o,line]of BACK){await fade(1,400);await SHARED.map.journey(legs,Object.assign({instant:1},o));await fade(0,500);await narr(line,{dur:7000,low:o.view==='aegean'?1:0})}
    await tell('v23',9000)}catch(e){console.error(e)}
  await narr('road_went_on',{dur:5000});G.end={};
  overlay('on end',()=>{ov.innerHTML='<h2>'+T('road_so_far')+'</h2><p>'+esc(T('twelve_chapters_from_a_basket_acts_9_23_to_18_22'))+
    '</p><p class="small">'+esc(T('acts_goes_on_from_here'))+'</p><p class="go">'+esc(T('click_to_continue_to_chapter_thirteen'))+'</p>'});await wait(1200);ov.onclick=()=>startChapter(13)}

/* ============ ITEMS ============ */
Object.assign(ICON,{
  awn12(g){IH.roll(g,LIN,7,10);for(let i=0;i<4;i++){R(g,6+i*4,5,2,2,'#8a7a5a');R(g,6+i*4,5,2,.6,'#c8b888')}},
  reed12(g){stroke(g,[5,20,19,4],'#8a7a40',2.4);stroke(g,[4.6,19.4,18.6,3.6],'#d8c880',.8);R(g,10.6,11.6,2,2,'#7a6a34')},
  pen12(g){stroke(g,[7,18,19,4],'#8a7a40',2.4);stroke(g,[6.6,17.4,18.6,3.6],'#d8c880',.8);poly(g,[4,21,7.6,19.4,6.2,16.6],'#2a1c16');R(g,12,10,2,2,'#7a6a34')},
  black12(g){g.fillStyle=lg(g,5,0,19,0,['#3a3440','#1a1418','#0c0a0e']);g.fillRect(5,9,14,8);R(g,5,9,14,1,'#5a5464');R(g,5,16.2,14,.8,'#000000');R(g,7,11,4,1,'#4a4454')},
  sheet12(g){R(g,5,4,14,17,'#e2d4a8');R(g,5,4,14,.8,'#f6ecc8');R(g,18.2,4,.8,17,'#b8a878');for(let j=0;j<7;j++)R(g,5,6+j*2.2,14,.5,'rgba(150,120,70,.35)')},
  mantle12(g){IH.square(g,'#6e4a2e',4,6,16,13);poly(g,[4,19,20,19,17,22,12,20.4,7,22],'#5a3a22');stroke(g,[8,6,10,19],'rgba(30,16,8,.4)',.7);stroke(g,[14,6,15,19],'rgba(30,16,8,.4)',.7)}});
const BYPAIR={aq12:'ours_to_keep_for_him_and_to_use'};
Object.assign(ITEMS,{
  awn12:{name:'linen_awning',look:'sun_awning_of_linen_hemmed'},
  reed12:{name:'reed',look:'hard_reed_as_long_as_my_forearm'},
  pen12:{name:'reed_pen',look:'reed_cut_slanting_and_slit'},
  black12:{name:'cake_of_ink',look:'cake_of_ink_soot_and_gum_dry'},
  sheet12:{name:'sheet_of_papyrus',look:'sheet_of_papyrus_clean'},
  mantle12:{name:'mantle',look:'my_mantle'},
  awl12:{name:'awl',icon:'awl',look:'awl_it',by:{aq12:'pauls_awl'}},
  thread12:{name:'waxed_thread',icon:'thread',look:'waxed_thread_in_their_keeping_now',by:{aq12:'waxed_thread_priscilla'}}});
COMBO['knife+reed12']=async()=>{if(!F.news)return say(P,'i_have_no_use_for_a_cut');SFX.cut();delItem('reed12');addItem('pen12');F.pen=1;
  await say(P,'i_cut_the_end_slanting')};
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
  {name:'road_to_the_harbors',x:0,y:50,w:36,h:56,wx:24,wy:122,dir:-1,exit:()=>{G.back12='street12';return toMap()},look:'road_down_to_the_western'},
  {name:'old_temple',x:44,y:8,w:84,h:28,wx:86,wy:114,look:'old_temple_on_its_rise'},
  {name:'colonnade_of_shops',x:36,y:42,w:94,h:62,wx:84,wy:114,look:'shops_under_a_colonnade_bronze_and_pots'},
  {name:'workshop',x:144,y:52,w:64,h:52,wx:176,wy:114,exit:mine(toShop),look:()=>say(P,F.met?'workshop_of_aquila_and_priscilla':'shop_open_to_the_street')},
  {name:'house_door',x:252,y:62,w:22,h:42,wx:263,wy:114,look:()=>say(P,F.pEup?'euphron_lives_here_behind_his_shutters':'shuttered_shop_and_a_door'),open:'it_is_not_my_door'},
  {name:'spring',x:316,y:60,w:44,h:44,wx:338,wy:114,look:'spring_under_an_arch_in_a_front',use:'i_drink_it_comes',pickup:'it_belongs_to_the_street'},
  {name:'lintel',x:398,y:52,w:38,h:10,wx:417,wy:114,look:'marble_with_letters_cut'},
  {name:'door_of_the_synagogue',x:404,y:62,w:26,h:42,wx:417,wy:114,exit:mine(toSyn),look:()=>say(P,F.shook?'door_of_the_synagogue_i':'door_of_the_synagogue_a')},
  {name:'door_of_titius_justus',x:498,y:60,w:26,h:44,wx:511,wy:114,exit:mine(toCourt),look:()=>say(P,F.shook?'house_of_titius_justus':'good_house_sharing_a_wall')},
  {name:'rock',x:470,y:0,w:150,h:24,wx:560,wy:114,look:'rock_of_corinth_over_everything'},
  {name:'steps_to_the_marketplace_2',x:566,y:56,w:74,h:48,wx:600,wy:114,dir:1,exit:mine(toAgora),look:'steps_up_to_the_marketplace'},
  {name:'booth',x:230,y:78,w:46,h:26,wx:253,wy:114,vis:()=>SEAS()==='s',look:'booth_four_legs_and_a_roof'},
  {name:'booth',x:536,y:78,w:46,h:26,wx:559,wy:114,vis:()=>SEAS()==='s',look:'another_booth'}]};
ROOMS.shop12={space:1.1,floor:'earth',walk:[20,304,112,137],get mood(){return NIGHT()?'night':MOOD()},get amb(){return NIGHT()?{crickets:.4}:SEAS()==='w'?{rain:.5}:{crowd:.2,hammer:.1}},hs:[
  {name:'opening_to_the_street',x:16,y:34,w:70,h:70,wx:52,wy:114,dir:-1,exit:()=>PC()!==P?say(PC(),'our_place_is_at_the_bench'):(F.r2&&!F.stay)||(F.word&&!F.stay2)?(G.back12='shop12',toMap()):F.brought&&!F.marc?say(P,'i_brought_the_man_here'):F.came&&!F.laid?say(P,'not_with_a_promise_of_mine'):goto('street12',176,120,1),
    look:'street_and_the_colonnade_across_the_way',as:{aq12:{look:'street_said'}}},
  {name:'workbench',x:114,y:78,w:116,h:26,wx:170,wy:113,look:'long_bench_on_two_trestles',use:'there_is_nothing_of_mine',as:{aq12:{look:'our_bench',use:'nothing_is_waiting_on_it'}}},
  {name:'length_of_linen',x:124,y:80,w:58,h:12,wx:150,wy:113,vis:()=>F.met&&!F.sewn||F.summer&&keptAll()&&!F.cloth2,def:'use',look:()=>say(P,F.summer?'linen_for_a_second_cloth':'linen_for_the_awning_of_titius'),use:()=>F.summer?say(P,'i_gave_the_awl_away_and_i'):say(P,'with_what_said'),
    useWith:id=>F.summer?false:id==='awl'||id==='thread'?sewAwning():false,as:{aq12:{look:'linen_for_the_second_cloth',use:'with_the_awl',useWith:sewSecond}}},
  {name:'half_sewn_cover',x:150,y:80,w:54,h:12,wx:176,wy:113,vis:()=>F.came&&!F.spring&&!(F.brought&&!F.marc),def:'use',look:()=>say(P,F.laid?'cover_for_sabinus':F.seam?'sewn_to_the_corner_and_the_thread':'cover_for_a_ships_cargo'),
    use:()=>F.laid?say(P,'it_is_theirs_now'):say(P,'with_the_awl'),useWith:id=>F.laid?false:id==='awl'||id==='thread'?closeSeam():false,as:{aq12:{look:'the_cover_for_sabinus',use:'it_will_be_ready_on_the_day'}}},
  {name:'torn_awning',x:118,y:80,w:38,h:12,wx:140,wy:113,vis:()=>F.brought&&!F.marc,def:'use',look:'awning_of_marcellus_torn',use:'my_hands_are_free_for_something_else',as:{aq12:{look:'torn_along_the_old_seam',use:'with_the_awl',useWith:mend}}},
  {name:'small_bowl',x:205,y:78,w:10,h:7,wx:196,wy:113,vis:()=>F.news&&!F.letter,def:'use',look:()=>say(P,F.ink?'black_and_neither_thin_nor_thick':'small_bowl_of_water_for_the_ink'),use:water,useWith:grind},
  {name:'potsherd',x:217,y:79,w:10,h:6,wx:210,wy:113,vis:()=>F.news&&!F.letter,look:'potsherd_for_trying_a_pen',useWith:tryInk},
  {name:'rolls_of_cloth',x:232,y:74,w:38,h:30,wx:226,wy:114,look:'goat_hair_cloth_from_cilicia_dark',pickup:'it_is_theirs_and_it_weighs',
    /* the chapter's hidden treasure: Paul's awl, in the hands that keep it, put to the cloth of his own country */
    as:{aq12:{look:'goat_hair_cloth_from_cilicia_paul',useWith:id=>id==='awl12'?say(AP,'his_awl_and_the_cloth_of_his_own').then(treasure):false}}},
  {name:'coils_of_cord',x:126,y:38,w:48,h:20,wx:150,wy:113,look:'cord_each_coil_on_its_own_peg',pickup:'each_hangs_where_a_hand_expects_it'},
  {name:'reeds',x:94,y:60,w:12,h:44,wx:112,wy:113,dir:-1,look:'hard_reeds_standing_in_a_jar',
    pickup:()=>F.reed?say(P,'one_is_enough'):!F.news?say(P,'i_have_no_use_for_a_reed'):(F.reed=1,addItem('reed12'),say(P,'hard_one_as_long_as_my_forearm'))},
  {name:'water_jar',x:110,y:90,w:12,h:15,wx:128,wy:113,dir:-1,look:'the_water_jar',pickup:'it_stays_where_it_is'},
  {name:'lamp',x:219,y:45,w:13,h:8,wx:210,wy:113,look:()=>say(P,NIGHT()?'one_lamp_said':'lamp_on_its_shelf_for_the_evenings')},
  {name:'steps_to_the_loft',x:270,y:40,w:50,h:64,wx:272,wy:116,look:'the_steps_to_the_loft',use:'not_while_there_is_light_said'},
  {name:'bundle',x:90,y:96,w:16,h:14,wx:116,wy:116,dir:-1,vis:()=>(F.r2&&!F.stay)||(F.word&&!F.stay2),def:'use',look:'my_bundle_packed_by_other',use:unpack,open:unpack,pickup:unpack,as:{aq12:{look:'his_bundle'}}}]};
ROOMS.court12={space:.8,walk:[40,290,112,137],get mood(){return F.stay?'court':MOOD()},get amb(){return CV()==='w'?{rain:.8}:{birds:.4,crowd:.15}},enter:()=>courtEnter(),hs:[
  {name:'door_to_the_street',x:61,y:57,w:24,h:47,wx:73,wy:114,exit:()=>F.sewn&&!F.r1?say(P,'with_the_cloth_still_folded'):F.shook&&!F.r2?say(P,'with_the_rain_coming_down'):F.cloth2&&!F.r3?say(P,'half_of_them_are_sitting'):goto('street12',511,120,-1),look:'door_to_the_street_2'},
  {name:'rope_and_hooks',x:20,y:34,w:280,h:20,wx:150,wy:120,def:'use',use:()=>toAwn(),useWith:toAwn,look:'three_hooks_in_the_wall'},
  {name:'wall_of_the_synagogue',x:0,y:56,w:34,h:60,wx:48,wy:118,dir:-1,look:'on_the_other_side_of_this_wall'},
  {name:'bench_by_the_door',x:236,y:88,w:44,h:16,wx:232,wy:114,dir:1,look:'a_stone_bench_by_the_door',use:'i_have_not_been_asked_to_sit'},
  {name:'figs',x:138,y:98,w:54,h:8,wx:164,wy:113,vis:()=>CV()==='a',look:'figs_drying_on_a_mat',pickup:'they_are_his_and_not_dry_yet'},
  {name:'benches',x:96,y:94,w:80,h:12,wx:136,wy:113,vis:()=>CV()!=='a',look:()=>say(P,CV()==='w'?'benches_set_out_for_those_who':'more_benches_every_month')},
  {name:'cistern',x:196,y:98,w:22,h:8,wx:206,wy:113,look:'mouth_of_his_cistern'},
  {name:'door_of_the_house',x:294,y:50,w:22,h:72,wx:284,wy:124,dir:1,look:'door_of_the_house_said',open:'it_is_his_to_open'}]};
const HOOKN={l:['high_hook_in_the_wall','middle_hook_in_the_wall','low_hook_in_the_wall'],r:['high_hook_in_the_house','middle_hook_in_the_house','low_hook_in_the_house']};
const hookHs=(side,i,x)=>({name:HOOKN[side][i],x,y:HY[i]-6,w:14,h:12,wx:160,wy:236,def:'use',use:()=>hook(side,i),look:side==='l'?'hook_of_iron_in_the_wall':'hook_of_iron_in_the_front'});
ROOMS.awn12={space:.6,walk:NOW,get mood(){return F.stay?'court':MOOD()},get amb(){return roundNo()===2?{rain:.8}:{birds:.4}},hs:[
  ...[0,1,2].map(i=>hookHs('l',i,46)),...[0,1,2].map(i=>hookHs('r',i,260)),
  {get name(){return awn().n===2?'cloth_of_goat_hair':'linen_cloth'},get x(){const st=awn();return st.n===2?AX0+14:AX0+st.p*BAY},y:30,get w(){return awn().n===2?AX1-AX0-28:2*BAY},h:48,wx:160,wy:236,def:'use',use:()=>slide('p'),
    look:()=>say(P,awn().n===2?'goat_hair_from_wall_to_wall':'linen_we_sewed_in_autumn')},
  {name:'new_cloth',get x(){return AX0+awn().q*BAY},y:30,w:BAY,h:48,wx:160,wy:236,def:'use',vis:()=>awn().n===3,use:()=>slide('q'),look:'second_cloth_from_the_bench'},
  {name:'court_below',x:70,y:86,w:150,h:32,wx:160,wy:236,look:()=>say(P,roundNo()===1?'his_bench_by_the_door_and_his_figs':roundNo()===2?'benches_and_by_the_door':'four_benches_full')},
  {name:'step_back_and_look',x:60,y:124,w:200,h:20,wx:160,wy:236,def:'use',use:lookAwn,look:lookAwn},
  {name:'back_to_the_court',x:262,y:124,w:58,h:20,wx:160,wy:236,exit:outAwn,look:'court_and_the_people_in_it'}]};
ROOMS.syn12={space:1.5,walk:[20,300,112,137],mood:'word',amb:{crowd:.5},hs:[
  {name:'door_to_the_street',x:271,y:47,w:32,h:57,wx:262,wy:116,dir:1,exit:()=>say(P,'not_like_a_man_who_slips_out_what'),look:'door_to_the_street_2'},
  {name:'men_who_oppose_him',x:182,y:72,w:68,h:54,wx:158,wy:124,dir:1,look:'they_have_heard_it_on_many_sabbaths',talk:()=>say(P,'i_have_said_it_on_many_sabbaths',TH),useWith:shake},
  {name:'benches',x:14,y:86,w:70,h:18,wx:60,wy:113,look:'benches_said'},
  {name:'readers_table',x:108,y:82,w:66,h:22,wx:140,wy:113,look:'the_table_from_which_the_law'},
  {name:'chest_of_the_scrolls',x:30,y:56,w:38,h:32,wx:76,wy:113,dir:-1,look:'chest_of_the_scrolls_under_its_cloth',open:'it_is_not_mine_to_open_2'},
  {name:'windows',x:92,y:22,w:130,h:26,wx:160,wy:113,look:'three_windows_with_upright_bars'}]};
ROOMS.isth12={space:.5,walk:NOW,get mood(){return NIGHT()?'night':MOOD()},amb:{wind:.4,waves:.3},hs:[
  {name:'gulf',x:0,y:0,w:190,h:30,wx:160,wy:236,look:'gulf_and_at_the_end_of_it'},
  {name:'Lechaeum',x:96,y:34,w:36,h:22,wx:160,wy:236,def:'use',use:()=>harbor('l'),look:'lechaeum_the_western_harbor'},
  {name:'Corinth',x:130,y:58,w:44,h:24,wx:160,wy:236,def:'use',use:()=>(F.r2&&!F.night)?vision():fromMap(),look:'corinth_under_its_rock'},
  {name:'rock',x:124,y:86,w:46,h:32,wx:160,wy:236,look:'rock_with_the_temple_on_its_top'},
  {name:'Cenchreae',x:206,y:62,w:36,h:26,wx:160,wy:236,def:'use',use:()=>harbor('c'),look:'cenchreae_the_eastern_harbor'},
  {name:'trackway_for_ships',x:196,y:10,w:26,h:28,wx:160,wy:236,look:()=>say(P,NIGHT()?'paved_way_across_the_neck':'a_paved_way_across_the_neck')},
  {name:'season',x:4,y:128,w:150,h:16,wx:160,wy:236,def:'use',use:turn,look:()=>say(P,T('season_said',{season:T(SEASON())}),TH)}]};
ART.isth12.front=g=>{G.caps12=[];cap12(g,'Lechaeum',64,24,70);cap12(g,'Corinth',150,126,60);cap12(g,'Cenchreae',276,84,70);cap12(g,'to_athens',290,22,50,'rgba(244,228,184,.7)');
  cap12(g,F.stay&&!F.summer?T('season_let_it_turn',{season:T(SEASON())}):SEASON(),8,136,150,'#f4e4b8',1)};
ROOMS.cen12={space:.5,walk:[16,304,112,138],get mood(){return MOOD()},get amb(){return F.summer||F.cen?{waves:.8,gulls:.6,creak:.3}:{rain:.7,waves:.6,mallet:.6}},hs:[
  {name:'road_to_corinth',x:0,y:104,w:14,h:40,wx:20,wy:124,dir:-1,exit:mine(()=>F.cen?say(P,'i_have_said_goodbye'):goto('street12',26,122,1)),look:'road_back_across_the_neck_of_land'},
  {name:'sheds',x:0,y:46,w:128,h:58,wx:70,wy:114,look:'sheds_of_dressed_stone'},
  {name:'far_pier',x:150,y:60,w:170,h:14,wx:230,wy:114,look:'the_far_pier'},
  {name:'ship_on_the_beach',x:150,y:70,w:116,h:36,wx:140,wy:118,dir:1,vis:()=>!F.summer&&!F.cen,look:'ship_hauled_out_for_the_winter'},
  {name:'ship_for_asia',x:236,y:62,w:84,h:36,wx:226,wy:118,dir:1,vis:()=>!!(F.summer||F.cen),look:()=>say(P,F.cen?'our_ship_for_ephesus_and_then':'ship_for_asia_taking_on_her_last')},
  {name:'plank',x:230,y:98,w:34,h:12,wx:226,wy:118,dir:1,vis:()=>!!F.cen,exit:mine(sail),look:'plank_to_the_ship'}]};
ROOMS.agora12={space:.6,get walk(){return HEARING()?[236,236,120,120]:[16,464,112,138]},get mood(){return HEARING()?'seat':MOOD()},amb:{crowd:.6,birds:.2},hs:[
  {name:'steps_to_the_street',x:0,y:56,w:20,h:60,wx:22,wy:124,dir:-1,vis:()=>!HEARING(),exit:mine(()=>goto('street12',610,122,-1)),look:'steps_down_to_the_street'},
  {name:'rock',x:60,y:0,w:190,h:38,wx:150,wy:114,look:'rock_straight_above_the_marketplace'},
  {name:'colonnade_and_shops',x:24,y:46,w:170,h:50,wx:110,wy:114,look:'colonnade_the_length_of_the_terrace'},
  {name:'judgment_seat',x:176,y:56,w:146,h:48,wx:236,wy:120,look:()=>say(P,HEARING()?'proconsul_of_achaia_on_his_seat':F.gallio?'the_judgment_seat':SEAS()==='s'?'judgment_seat_white_marble':'judgment_seat_where_the_proconsul')},
  {name:'waiting_room',x:320,y:62,w:40,h:42,wx:340,wy:114,vis:()=>!HEARING(),look:'room_beside_the_platform',open:'nobody_goes_in_there_unless'},
  {name:'potters_wares',x:56,y:100,w:66,h:12,wx:90,wy:116,vis:()=>SEAS()==='u',look:'pots_on_a_mat_thrasons',pickup:'they_are_for_sale_said'},
  {name:'proconsul_on_the_judgment_seat',x:240,y:28,w:38,h:40,wx:236,wy:120,def:'talk',vis:()=>HEARING(),talk:speak,use:speak,look:'gallio_the_proconsul'},
  {name:'accusers',x:104,y:70,w:76,h:56,wx:236,wy:120,vis:()=>HEARING(),look:'whole_synagogue_as_one_man',talk:'it_is_the_proconsul_who'}]};
ROOMS.wait12={space:1.6,walk:[70,300,112,137],mood:'seat',amb:{crowd:.4},hs:[
  {name:'doorway_to_the_square',x:14,y:26,w:46,h:78,wx:70,wy:118,dir:-1,exit:()=>say(P,'not_before_i_am_called'),look:'square_and_the_side_of_the_platform'},
  {name:'bench_of_marble',x:80,y:84,w:204,h:20,wx:150,wy:113,def:'use',use:prepare,look:'bench_of_marble_cold_through_the_mantle'},
  {name:'floor',x:0,y:118,w:320,h:26,wx:160,wy:124,look:'floor_of_small_stones_in_six'},
  {name:'wall',x:70,y:22,w:240,h:54,wx:190,wy:113,look:'plain_panels'}]};
ROOMS.eph12={space:.5,walk:[90,304,112,138],mood:'eph',amb:{waves:.6,gulls:.5,crowd:.2},hs:[
  {name:'ship',x:0,y:64,w:90,h:36,wx:98,wy:118,dir:-1,look:'ship_that_brought_us_over_she'},
  {name:'plank',x:56,y:100,w:34,h:10,wx:98,wy:118,dir:-1,exit:home,look:'plank_to_the_ship'},
  {name:'jars',x:92,y:90,w:32,h:16,wx:126,wy:114,dir:-1,look:'jars_and_a_sack_set_down',pickup:'they_are_cargo'},
  {name:'houses',x:128,y:44,w:70,h:40,wx:164,wy:114,look:'ephesus_said'},
  {name:'door_of_the_synagogue',x:242,y:62,w:28,h:42,wx:236,wy:116,dir:1,look:()=>say(P,F.asked?'i_shall_see_this_door_again':'synagogue_of_ephesus')}]};
ROOMS.ant12={space:.8,walk:[20,300,112,138],mood:'home',amb:{birds:.4,leaves:.4,crickets:.2},hs:[
  {name:'gate',x:134,y:52,w:48,h:52,wx:158,wy:114,exit:()=>say(P,'i_have_only_just_come_in_by_it'),look:'gate_to_the_street_i'},
  {name:'olive_tree',x:20,y:44,w:52,h:60,wx:76,wy:114,dir:-1,look:'the_olive_tree'},
  {name:'bench',x:212,y:88,w:84,h:16,wx:200,wy:114,dir:1,look:'bench_along_the_wall'},
  {name:'brothers',x:222,y:70,w:44,h:50,wx:206,wy:120,dir:1,def:'talk',talk:finale,look:'brothers_of_antioch'}]};

/* ============ PEOPLE ============ */
const pairTalk=async()=>{if(!F.met)return meet();if(!F.sewn)return say(AQ,'linen_is_on_the_bench_brother');if(!F.r1)return say(PR,'titius_justus_is_waiting_for_his_roof');
  if(!F.came)return say(AQ,'six_days_at_the_bench_and_the_seventh');if(!F.laid)return say(PR,'you_are_watching_the_door');
  if(F.news&&!F.black){await say(P,'have_you_ink_for_marking');await say(PR,'cake_of_it_soot_and_gum_dry');F.black=1;addItem('black12');return}
  if(F.r2&&!F.night)return say(PR,'your_bundle_is_by_the_door');if(F.night&&!F.stay)return say(AQ,'well_brother');
  if(F.word&&!F.stay2)return say(AQ,'it_is_for_you_to_say');if(F.brought&&!F.marc)return say(PR,'hour_with_two_of_us');
  if(F.summer&&keptAll()&&!F.cloth2)return say(PR,'second_cloth_for_justus');if(F.eph)return say(AQ,'go_brother_and_come_back');if(F.cen)return say(PR,'we_have_packed_a_bench_before_paul');
  return say(AQ,F.stay?'go_on_brother':'bench_earns_for_three')};
const pairHs=a=>({name:'aquila_and_priscilla',actor:a,look:()=>say(P,F.met?'aquila_and_priscilla_said':'man_and_a_woman_at_one'),talk:pairTalk,give:layDown,
  show:{tablets:'you_read_and_we_listen',awn12:'it_is_for_hanging_not_for_looking',reed12:'a_reed',pen12:'you_have_cut_it_like_a_tentmaker',black12:'into_water_a_little_at_a_time',sheet12:'clean_sheet',mantle12:'keep_it_on_brother','*':'keep_it_by_you_brother_said'}});
AQ.hs=pairHs(AQ);AP.hs=pairHs(AP);
const PAULHS={name:'Paul',actor:P,as:{aq12:{look:'paul_since',talk:()=>say(P,'bench_is_yours_and_i_thank'),show:{'*':'keep_it_it'}}}};
SI.hs={name:'Silas',actor:SI,look:'silas_he_was_beaten',
  talk:async()=>{if(F.news&&!F.sheet){await say(SI,'i_have_a_sheet_of_papyrus');F.sheet=1;addItem('sheet12');return}
    return say(SI,F.gallio?'we_stay_timothy_and_i':F.word&&!F.stay2?'twice_now_i_have_left_a_city':F.r2&&!F.stay?'ship_lies_at_the_eastern_harbor':F.laid?'now_you_are_free_for_it':'macedonia_has_not_forgotten_you')},
  show:{sheet12:'it_is_yours_now',tablets:'i_know_what_is_on_them','*':'keep_it_paul_2'},as:{aq12:{look:'silas_from_jerusalem',talk:()=>say(SI,'you_took_him_in_when_he'),show:{'*':'it_is_in_good_hands'}}}};
TI.hs={name:'Timothy',actor:TI,look:'timothy_he_has_walked',talk:timothy,give:writeLetter,show:{tablets:'i_learned_to_read_from_tablets',reed12:'it_is_not_cut_yet',black12:'it_has_to_be_ground_first','*':'i_would_rather_carry_it'},
  as:{aq12:{look:'timothy_the_young_one',talk:()=>say(TI,'eunice_my_mother_would_like_your_loft'),show:{'*':'it_is_in_good_hands'}}}};
TJ.hs={name:'titius_justus',actor:TJ,look:'titius_justus_a_man_of_this_city',
  talk:()=>say(TJ,!F.r1?'shade_on_my_bench_at_midday':!F.shook?'come_to_my_table_on_the_sabbath':!F.r2?'it_is_raining_on_my_guests_paul':F.summer&&!F.cloth2?'look_at_them_paul_one_cloth':F.cloth2&&!F.r3?'half_of_them_are_sitting':F.gallio?'door_stays_open':'my_neighbors_do_not_greet'),
  show:{awn12:'do_not_show_it_to_me',tablets:'read_to_us_on_the_first',mantle12:'i_saw_what_you_did_with_it','*':'i_am_no_judge_of_that'}};
CR.hs={name:'Crispus',actor:CR,look:'crispus_who_presided_over_the_synagogue',talk:()=>say(CR,F.gallio?'sosthenes_presides_in_that_house_now':'i_have_read_those_scrolls'),show:{tablets:'i_know_the_passages','*':'keep_it_brother_2'}};
SP.hs={name:'Stephanas',actor:SP,look:'stephanas_with_his_whole_household',talk:()=>say(SP,'my_whole_household_is_on_that_bench'),show:{'*':'give_me_something_to_carry_rather'}};
GA.hs={name:'Gaius',actor:GA,look:'gaius_a_man_of_this_city',talk:()=>say(GA,'if_this_court_grows_too'),show:{'*':'keep_it_paul_2'}};
SB.hs={name:'Sabinus',actor:SB,look:'sabinus_said',talk:sabinus,show:{awl:'i_do_not_want_to_see_your_awl','*':'is_that_my_cover'}};
MA.hs={name:'Marcellus',actor:MA,look:'marcellus_who_lives_across_the_street',talk:marcellus,show:{'*':'it_will_not_mend_my_awning'}};
TR.hs={name:'Thrason',actor:TR,look:'thrason_a_potter',talk:thrason,show:{tablets:'wax_i','*':'fired_it_would_be_worth_more'}};
KA.hs={name:'Kallistos',actor:KA,look:'kallistos_a_seaman_with_a_coil',talk:kallistos,show:{knife:'not_near_my_new_cord_tentmaker','*':'would_it_float'}};
PX.hs={name:'Praxias',actor:PX,look:'praxias_a_runner_come_from_asia',talk:praxias,show:{'*':'it_would_only_slow_me_down'}};
EU.hs={name:'Euphron',actor:EU,look:'euphron_who_keeps_a_booth_said',talk:euphron,show:{'*':'i_sell_friend'}};
DE.hs={name:'Decimus',actor:DE,look:'decimus_a_clerk_of_the_proconsuls',talk:decimus,show:{tablets:'mine_are_fuller_and_duller','*':'is_it_evidence'}};
PH.hs={name:'Philon',actor:PH,look:'philon_of_the_synagogue_of_ephesus',talk:philon,show:{tablets:'read_us_more_of_that_stay','*':'bring_it_when_you_come_back'}};
AT.hs={name:'attendant',actor:AT,look:'attendant_of_the_proconsul',talk:()=>say(AT,'you_will_be_called'),show:{'*':'put_it_away'}};
AP.def={look:'nothing_there_needs_our_hands',pickup:'it_is_not_ours',use:'that_is_not_bench_work',open:'that_is_not_ours_to_open',talk:'later_said',give:'what_should_we_give'};
AP.noCraft='not_those_two_together';

/* ============ WAX TABLETS: people met, tasks still open, the Scriptures, and what he has promised in Corinth ============ */
const TABLETS={
  people:[
    {name:'aquila_and_priscilla',note:'tentmakers_lately_come_from_rome',if:()=>!!F.met},
    {name:'titius_justus',note:'worshipper_of_god',if:()=>!!F.sewn},
    {name:'silas_and_timothy',note:'come_down_from_macedonia',if:()=>!!F.came},
    {name:'Sabinus',note:'he_has_ordered_a_cover',if:()=>!!F.came&&!F.laid},
    {name:'Crispus',note:'the_presiding_officer_of_the_synagogue',if:()=>!!F.r2},
    {name:'stephanas_and_gaius',note:'men_of_this_city_and_their_households',if:()=>!!F.cloth2},
    {name:'Gallio',note:'proconsul_of_achaia',if:()=>!!F.summer},
    {name:'Philon',note:'of_the_synagogue_of_ephesus',if:()=>!!F.eph}],
  tasks:[
    {t:'find_work_and_a_roof',if:()=>!F.met},
    {t:'sew_the_linen_for_titius_justus',if:()=>!!F.met&&!F.sewn},
    {t:'hang_it_in_his_court_shade',if:()=>!!F.sewn&&!F.r1},
    {t:'bench_is_waiting',if:()=>!!F.sab&&!F.came},
    {t:'one_order_of_mine_is_open_said',if:()=>!!F.came&&!F.laid},
    {t:'timothy_has_news_from_thessalonica',if:()=>!!F.laid&&!F.news},
    {t:'letter_a_sheet_a_reed_and_ink',if:()=>!!F.news&&!F.letter},
    {t:'synagogue_2',if:()=>!!F.letter&&!F.shook},
    {t:'it_is_raining_on_the_guests',if:()=>!!F.shook&&!F.r2},
    {t:'brothers_have_packed_my_bundle',if:()=>(!!F.r2&&!F.stay)||(!!F.word&&!F.stay2)},
    {t:'keep_on_speaking_the_lord',if:()=>!!F.stay&&!F.r3},
    {t:'court_of_justus_is_too',if:()=>!!F.summer&&keptAll()&&!F.r3},
    {t:'they_will_call_me_before',if:()=>!!F.stay2&&!F.gallio},
    {t:'say_goodbye_to_the_brothers',if:()=>!!F.gallio&&!F.bye},
    {t:'ship_for_ephesus',if:()=>!!F.cen&&!F.eph},
    {t:'they_ask_me_to_stay',if:()=>!!F.eph&&!F.asked},
    {t:'home_said',if:()=>!!F.asked&&!F.home}],
  scripture:[PS.ne5],
  notes:{title:'noted_in_corinth',none:'nothing_yet_said',list:[...PROM.map(q=>({t:q.note,if:()=>!!F[q.p]&&!F[q.k]})),
    {t:()=>T('kept_n_of_five',{n:PROM.filter(q=>F[q.k]).length}),if:()=>PROM.some(q=>F[q.k])},
    {t:()=>T('not_needed_before_the_judgment_seat_line',{line:T(OPEN[Math.max(0,opened())])}),if:()=>!!F.gallio}]}};

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
  else if(room==='court12'){place(TJ,room,246,116,-1);if(F.r2)place(CR,room,214,121,-1);if(F.cloth2){place(SP,room,196,126,-1);place(GA,room,100,126,1)}if(F.gallio){place(SI,room,132,126,1);place(TI,room,156,130,1)}}
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
      await narr('the_autumn_of_the_year_50',{dur:8500});await tell('v1')}catch(e){console.error(e)}
    await fade(1,600);G.scene=null;setScore(MUSIC);place12('street12');enterRoom('street12',...ENT.street12);codeBtn();await fade(0,700);
    await tell('c23');await narr('he_had_his_tools_and_no',{dur:5600});
    await say(P,'roof_first_and_work',TH);codeBtn()},true)}

/* ============ PRAYER HINTS ============ */
const AWH={1:['sun_stands_in_the_south','i_slide_the_linen_along'],
  2:['water_runs_downhill_and_it','rope_on_the_high_hook_at_the_wall'],
  3:['morning_sun_comes_over_the_roof','rope_on_the_middle_hook']};
function hint12(){
  if(PC()!==P)return F.brought&&!F.marc?['mend12',['his_awning_lies_on_our_bench','we_use_the_awl_with_the_torn']]:F.summer&&keptAll()&&!F.cloth2?['second12',['justus_needs_a_second_cloth','we_use_the_awl_with_the_length']]
    :['pair12',['bench_is_ours_and_the_streets','we_change_back_to_paul']];
  if(F.home)return['home12',['i_am_home','i_talk_to_the_brothers']];
  if(F.eph)return F.asked?['plank12',['i_have_given_them_my_answer','i_go_up_the_plank_to_the_ship']]:['ask12',['they_want_a_promise','i_talk_to_philon_and_say']];
  if(F.cen)return['sail12',['ship_is_ready_and_the_bench','i_go_up_the_plank']];
  if(F.gallio)return['bye12',['i_am_not_being_driven_out_there','from_the_street_i_go_in_at_the_door']];
  if(F.stay2)return opened()<0?['open12',['charge_can_mean_the_law','i_use_the_bench_of_marble']]:['speak12',['i_have_been_called','i_talk_to_the_proconsul']];
  if(F.word)return['stay12b',['nothing_new_was_said_to_me','that_nobody_would_attack']];
  if(F.cloth2)return G.room==='awn12'?['awn312',AWH[3]]:['court312',['second_cloth_is_sewn','in_the_court_of_titius']];
  if(F.summer){if(!F.eup)return['eup12',['euphron_said_when_the_booths','booths_are_down']];
    if(!F.thr)return['thr12',['thrason_said_when_his_kiln','his_pots_lie_on_a_mat_in_the_marketplace']];
    if(!F.pra)return['pra12',['praxias_said_when_the_games','ships_for_asia_lie_at_the_eastern']];
    return['cloth212',['justus_needs_a_second_cloth_said','i_change_to_aquila_and_priscilla']]}
  if(F.spring){if(!F.pPra||!F.pEup||!F.pDec)return['spr12',['street_is_full','i_talk_to_the_runner_by_the_spring']];
    if(!F.dec)return['dec12',['decimus_said_when_the_court_q','on_the_judgment_seat_in_the_marketplace']];
    return['turn12',['i_have_kept_what_could','i_take_the_road_to_the_harbors']]}
  if(F.stay){if(!F.brought)return['marc12',['man_in_the_street_has_a_torn','i_talk_to_marcellus_and_take']];
    if(!F.marc)return['marc12b',['my_hands_are_free','i_change_to_aquila_and_priscilla_said']];
    if(!F.pThr||!F.pKal)return['win12',['many_people_in_this_city_said','i_talk_to_everybody_in_the_street']];
    if(!F.kal)return['kal12',['he_runs_to_ephesus_and_smyrna','i_take_the_road_to_the_harbors_said']];
    return['turn12',['i_have_kept_what_could_said','i_take_the_road_to_the_harbors']]}
  if(F.night)return['stay12',['i_was_told_to_keep_on_speaking_and','i_use_the_bundle_by_the_door']];
  if(F.r2)return['map12',['they_mean_it_well','i_go_to_the_opening_of_the_shop']];
  if(F.shook)return G.room==='awn12'?['awn212',AWH[2]]:['court212',['it_is_raining_on_those_who','in_the_court_of_titius']];
  if(F.letter)return G.room==='syn12'?['shake12',['i_have_said_all_of_it_many','i_use_my_mantle_with_the_men']]:['syn12',['they_have_heard_me_every_sabbath','i_go_in_at_the_door_of_the_synagogue']];
  if(F.news){if(!F.pen)return['pen12',['pen_is_a_reed_cut_slanting',F.reed?'i_use_my_knife_with_the_reed':'i_pick_up_a_reed_in_the_corner']];
    if(!F.ink)return F.black?['ink12',['too_thin_and_it_runs','i_use_the_cake_of_ink_with_the_small']]:['black12',['tentmakers_mark_their_cloth_with_ink','i_talk_to_aquila_and_priscilla']];
    if(!F.sheet)return['sheet12',['silas_has_carried_a_letter_before','i_talk_to_silas']];return['write12',['everything_is_ready_and_timothy','i_give_the_reed_pen_to_timothy']]}
  if(F.laid)return['news12',['timothy_has_been_waiting','i_talk_to_timothy']];
  if(F.came)return!F.seam?['seam12',['one_order_of_mine_is_open_i','i_use_the_awl_with_the_half']]:!F.told?['told12',['sabinus_ordered_it_from_me','i_talk_to_sabinus_it_will']]
    :['lay12',['macedonia_has_sent_enough','i_give_the_awl_to_aquila']];
  if(F.sab)return['bench12',['six_days_at_the_bench','i_go_back_to_the_workshop']];
  if(F.sewn)return G.room==='awn12'?['awn112',AWH[1]]:G.room==='court12'?['court112',['he_has_hooks_in_both_walls','i_use_the_rope_and_hooks']]:['just12',['awning_is_sewn','in_the_street_the_door']];
  if(F.met)return['linen12',['they_gave_me_a_bench_and_the_first','i_use_the_awl_with_the_length']];
  return G.room==='shop12'?['meet12',['a_man_and_a_woman_at_one','i_talk_to_them']]:['shop12',['goat_hair_cloth_i_know','i_walk_to_the_workshop']]}

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
