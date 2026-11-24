/* Paul of Tarsus: level data for Chapter Nine, "Midnight in Philippi".
   Loaded on demand by index.html (see LEVEL and loadLevel there). Everything that belongs to this chapter lives here:
   its music and ambience, its artwork (painted in code), its cast, items, rooms, hotspots, dialog, cutscenes and hints.
   Philippi (Acts 16:16-40): the servant girl who followed them for many days; the marketplace, the rods and the inner prison; the song
   at midnight, the earthquake and the jailer; the morning, when the magistrates came themselves; and Lydia's house. Acts does not say
   what the two men sang, how many prisoners there were or why none of them fled, how Paul knew what the jailer was about to do, how the
   two came to be in the prison again by morning, or who the brothers in Lydia's house were: the chapter claims none of it, and its end
   screen says so. The narration says "we" as far as Acts does (16:17), and "they" from the verse in which two men are seized (16:19).
   What the account itself says is told by the narrator, in paraphrase with its reference, and never put into a mouth as a quotation:
   those lines stand together in TOLD below, and the lines of the psalm in PS, so that their wording can be compared with the Study
   Edition in one place. */
LEVEL(9,()=>{
"use strict";
/* wood, cracks, contact shadows and earth colors as every chapter paints them (shared/materials.js) */
const{plank:plank9,board:board9,crack:crack9,skipCracks:skipCracks9,shadow:shadow9,earth:earth9,ceiling:ceiling9}=SHARED.materials;

/* ============ MUSIC AND AMBIENCE (plain data, played by the engine's sequencer) ============ */
/* A tune on six notes from E: E, F sharp, G, A, B and D. The scale has no sixth, so it is neither of the modes an earlier chapter used
   with a minor third. The tune is the one the psalm is sung to: a call that climbs and comes home, and an answer that starts high and
   walks down to the keynote. In Lydia's house (mood "calm") a harp and a ney have it; by the river (mood "rest") only the harp is left,
   and while the psalm is sung (mood "song") nothing plays at all. In the marketplace and before the magistrates (mood "tense") nothing is
   held: a low string plucks the keynote in threes, threes and twos and leans on the note above it, a drum ticks with it and almost
   stops every fourth bar, and a ney begins the tune and breaks off a note before it comes home; in the inner prison (mood "cell") no instrument, only the room, and then two voices; in the
   jailer's court by night (mood "night") a drone and a harp, far apart; and when the two are led out (mood "hope") a lyre, a low
   string, a hand drum and a pair of pipes. Nothing is claimed about how psalms were sung in Paul's day: it is not known how it sounded. */
const _=null,
 TUNE=[[[0,0,2],[2,2,2],[4,3,2],[6,4,2],[8,4,4],[12,3,4]],[[2,2,2],[4,3,2],[6,1,2],[8,0,8]],[[0,4,2],[2,5,4],[6,4,2],[8,3,4],[12,2,2],[14,3,4]],[[2,2,2],[4,1,4],[8,0,8]],
  [[0,4,2],[2,4,2],[4,5,4],[8,4,2],[10,2,4]],[[0,3,2],[2,1,2],[4,0,2],[6,-2,8]],[[0,4,2],[2,4,2],[4,5,4],[8,4,2],[10,3,4],[14,2,2]],[[0,3,4],[4,2,2],[6,1,4],[10,0,6]]],
 MUSIC={dt:.15,steps:16,root:52,scale:[0,2,3,5,7,10],bars:16,tracks:[
  {inst:'harp',moods:['calm','rest'],prog:'AABAAACA',len:4,oct:12,vol:.8,seq:{A:[0,_,4,_,6,_,4,_,2,_,4,_,6,_,4,_],B:[-1,_,3,_,5,_,3,_,1,_,3,_,5,_,3,_],C:[3,_,6,_,8,_,6,_,2,_,4,_,6,_,4,_]}},
  {inst:'bass',moods:['calm','hope'],prog:'AABAAACA',len:7,seq:{A:[-6,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_],B:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],C:[-3,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_]}},
  {drum:1,moods:['calm'],seq:{A:'d.......t.......'},vol:.35},
  {inst:'ney',moods:['calm'],loop:8,oct:12,lines:TUNE,vol:.9},
  {drum:1,moods:['rest'],prog:'AB',seq:{A:'b...............',B:'................'},vol:.5},
  {inst:'bass',moods:['tense'],prog:'AABC',len:2,group:[3,3,2],vol:1.2,seq:{
    A:[-6,_,_,-6,_,_,-5,_,-6,_,_,-6,_,_,_,_],B:[-6,_,_,-6,_,_,-5,_,-5,_,_,-6,_,_,-8,_],C:[-6,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_]}},
  {drum:1,moods:['tense'],prog:'AABC',group:[3,3,2],seq:{A:'d..k..k.d..k..k.',B:'d..k..k.d..k.kk.',C:'d...............'},vol:.8},
  {inst:'ney',moods:['tense'],oct:12,loop:8,vol:1.1,lines:[TUNE[0],TUNE[1].slice(0,-1),[],[],TUNE[4],TUNE[5].slice(0,2),[],[]]},
  {drone:[0],every:32,moods:['night'],vol:.6},
  {inst:'harp',moods:['night'],prog:'ABAC',len:8,oct:12,vol:.7,seq:{A:[0,_,_,_,_,_,_,_,4,_,_,_,_,_,_,_],B:[-1,_,_,_,_,_,_,_,3,_,_,_,_,_,_,_],C:[1,_,_,_,_,_,_,_,4,_,_,_,_,_,_,_]}},
  {inst:'lyre',moods:['hope'],prog:'AABAAACA',len:3,seq:{A:[0,_,4,_,6,_,4,_,2,_,4,_,6,_,4,_],B:[-1,_,3,_,5,_,3,_,1,_,3,_,5,_,3,_],C:[3,_,6,_,8,_,6,_,2,_,4,_,6,_,4,_]}},
  {drum:1,moods:['hope'],prog:'AAAB',seq:{A:'d...t.k.d..t..k.',B:'d...t.k.d..t.tk.'}},
  {inst:'aulos',moods:['hope'],hold:0,loop:8,oct:12,lines:TUNE}]};

/* ============ THE SUNG VOICE ============ */
/* The game has no recordings, so a voice is built as its strings and pipes are. A voice is a buzz from the throat that passes through the
   mouth, and the mouth rings at a few pitches of its own, which move as the vowel changes. So: a wave with every overtone, each weaker
   than the one below it (the throat), through five resonant lowpass filters one after another (the mouth). Each of them passes what
   lies below its pitch, rings at it, and closes above it, as a tube does; set in a row they give each vowel its own balance.
   VOW: the first four resonances of a man's mouth for each vowel, in Hz. @ is the neutral vowel of an unstressed syllable, y the German
   u with two dots. BW: how wide each resonance is, in Hz. GAIN evens out how loud the vowels come out. It has no consonants: it sounds
   like people singing and never like words, and the line stands on the screen. */
const VOW={a:[730,1090,2440,3400],o:[570,840,2410,3300],u:[320,800,2240,3300],e:[530,1840,2480,3400],i:[280,2250,2900,3400],y:[290,1700,2200,3300],'@':[500,1400,2450,3400]},
  BW=[80,90,120,170,250],F5=4500,GAIN={a:.73,o:.82,u:1,e:1,i:1.07,y:1.06,'@':.93},LEVEL=.07,STEP=.28;
/* Who sings. Paul is lower in the mouth and darker, with more breath in the tone; Silas is brighter; each is a few cents off the other,
   as two men are. scale stretches the resonances (a longer or a shorter throat), tilt is how fast the throat's overtones fall away.
   W1 and W2 are women of the household, whose mouths are shorter and who sing an octave above the men (up, in semitones); M3 is one
   more man; X is a man muttering in the dark. */
const VOICE={P:{scale:.96,tilt:1.15,breath:.02,pan:-.18,vib:[5.1,22],cents:-4},S:{scale:1.07,tilt:1.04,breath:.012,pan:.2,vib:[5.6,26],cents:5},
  W1:{scale:1.19,tilt:1.1,breath:.016,pan:-.42,vib:[5.8,22],cents:7,up:12},W2:{scale:1.24,tilt:1.2,breath:.02,pan:.45,vib:[5.4,18],cents:-6,up:12},
  M3:{scale:1.03,tilt:1.1,breath:.015,pan:-.3,vib:[5.7,20],cents:-9},X:{scale:.92,tilt:1.5,breath:.03,pan:.5,vib:[5,0],cents:0}},
  WAVES=new WeakMap();
function wave(c,tilt){let m=WAVES.get(c);if(!m)WAVES.set(c,m={});const k=tilt.toFixed(2);
  if(!m[k]){const N=48,re=new Float32Array(N),im=new Float32Array(N);for(let n=1;n<N;n++)im[n]=Math.pow(n,-tilt);m[k]=c.createPeriodicWave(re,im)}return m[k]}
/* sing: one note of a sung line, written to dest. f Hz, t start, d seconds, v level, who the singer, vow the vowel. from is the note before
   it in the same breath ({f, vow}): then the pitch glides from that note and the mouth moves from that vowel, with a dip in between
   where the consonant would be. Without it the note scoops up onto its pitch, as a voice does when it starts. tie: another note
   follows in this breath. rough (0 to 1) is a tired, hoarse voice: more breath, less level, an unsteady pitch that sags at the end. */
function sing(dest,o){const c=AU.ctx,w=o.who,t=o.t,d=o.d,leg=o.from,rough=o.rough||0,tn=Math.pow(2,(w.cents||0)/1200),f=o.f*tn,end=t+d+(o.tie?.04:0);
  const osc=c.createOscillator();osc.setPeriodicWave(wave(c,w.tilt+.3*rough));
  osc.frequency.setValueAtTime(leg?leg.f*tn:f*Math.pow(2,-(40+30*rough)/1200),t);osc.frequency.exponentialRampToValueAtTime(f,t+(leg?.06:.09));
  if(rough&&d>.5){osc.frequency.setValueAtTime(f,t+d*.65);osc.frequency.exponentialRampToValueAtTime(f*Math.pow(2,-18*rough/1200),t+d)}
  const wob=(hz,cents,from,full)=>{if(!cents)return;const l=c.createOscillator(),g=c.createGain();l.frequency.value=hz;g.gain.setValueAtTime(0,t);
    if(from>0)g.gain.setValueAtTime(0,t+from);g.gain.linearRampToValueAtTime(cents,t+full);l.connect(g);g.connect(osc.detune);l.start(t);l.stop(end+.1)};
  if(d>=.55)wob(w.vib[0]*(.97+.06*Math.random()),w.vib[1]*(1-.4*rough),.22,.5);   /* vibrato: only on a held note, and it comes in late */
  wob(.7+.5*Math.random(),5+6*rough,0,.05);wob(2.3+Math.random(),3+5*rough,0,.05);if(rough)wob(9+4*Math.random(),7*rough,0,.05);   /* no voice holds a pitch as a pipe does */
  const src=c.createGain();osc.connect(src);
  /* the breath in the tone: noise through the same mouth, with a puff where a note starts */
  const nz=c.createBufferSource(),nh=c.createBiquadFilter(),ng=c.createGain(),b=w.breath*(1+2.5*rough);
  nz.buffer=AU.nbuf;nz.loop=true;nh.type='highpass';nh.frequency.value=900;ng.gain.setValueAtTime(leg?b:b*3,t);ng.gain.exponentialRampToValueAtTime(b,t+.12);
  nz.connect(nh);nh.connect(ng);ng.connect(src);
  const V=VOW[o.vow]||VOW.a,V0=leg&&VOW[leg.vow]||V,ny=c.sampleRate*.45;let x=src;
  for(let i=0;i<5;i++){const lp=c.createBiquadFilter(),a=Math.min(ny,(i<4?V0[i]:F5)*w.scale),z=Math.min(ny,(i<4?V[i]:F5)*w.scale);lp.type='lowpass';
    lp.frequency.setValueAtTime(a,t);if(a!==z)lp.frequency.exponentialRampToValueAtTime(z,t+.07);lp.Q.value=20*Math.log10(Math.max(1,z/BW[i]));x.connect(lp);x=lp}
  const env=c.createGain(),v=(o.v||1)*LEVEL*(GAIN[o.vow]||1)*(1-.25*rough),a=leg?.045:.08,g=env.gain,rel=o.tie?.09:.2;x.connect(env);
  g.setValueAtTime(leg?v*.4:.0001,t);g.linearRampToValueAtTime(v,t+a);g.setValueAtTime(v,Math.max(t+a,end-rel));g.linearRampToValueAtTime(.0001,end);
  let out=env;if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=w.pan;env.connect(p);out=p}
  out.connect(dest);osc.start(t);osc.stop(end+.05);nz.start(t,Math.random()*.5);nz.stop(end+.05)}
/* inhale: the singer draws breath before a line */
function inhale(dest,t,w,v){const c=AU.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();s.buffer=AU.nbuf;s.loop=true;fl.type='bandpass';fl.Q.value=.9;
  fl.frequency.setValueAtTime(900*w.scale,t);fl.frequency.exponentialRampToValueAtTime(1700*w.scale,t+.3);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.2);g.gain.exponentialRampToValueAtTime(.0001,t+.34);
  s.connect(fl);fl.connect(g);g.connect(dest);s.start(t,Math.random()*.5);s.stop(t+.4)}
/* The lines of the psalm as they are sung: each syllable is the degree of the scale, a dot, its length in steps, and its vowel; "-.1" is
   a rest of one step. The vowels and the rhythm are those of the line that stands on the screen, so each language has its own: these are
   the English ones, and a language's file gives its own under the same key (CONTRIBUTING section 8). */
const SONG={c1:'sung_c9_1',c2:'sung_c9_2',
  c3:'sung_c9_3',c4:'sung_c9_4',a:'sung_c9_5'};
/* who sings a line: Paul, Silas, both, a household (Silas among them), one woman who begins it, or everyone in the house */
const CHOIR={P:['P'],S:['S'],PS:['S','P'],H:['S','W1','W2','M3'],W:['W1'],ALL:['S','P','W1','W2','M3']};
/* whose mouths sing it: the same people, as far as they stand in the room. A household is everyone of the congregation there but Paul. */
const SINGERS={P:()=>[P],S:()=>[SI],PS:()=>[SI,P],H:()=>[SI,TI,LU,LK,LY,PH,EL],W:()=>[PH],ALL:()=>[P,SI,TI,LU,LK,LY,PH,EL]};
/* notes: when each note of a sung line falls, [from, to, vowel] in milliseconds from the moment the line appears: the singer's mouth holds
   each vowel for its note (cadence, in index.html). The voice draws breath first, as in voices. */
const notes=key=>{const out=[];let y=500;for(const n of parse(SONG[key])){const d=n[1]*STEP*1000;if(n[0]!=null)out.push([y,y+d,n[2]]);y+=d}return out};
const parse=s=>T(s).split(' ').map(x=>{const m=/^(-?\d+|-)\.(\d+)(.?)$/.exec(x)||['','-','1',''];return[m[1]==='-'?null:+m[1],+m[2],m[3]||'a']});
/* the second voice under a line: a fourth below (three steps of this scale), closing onto the same last note */
const lower=l=>l.map((n,i)=>n[0]==null?n:[i===l.length-1?0:i===l.length-2?n[0]-2:n[0]-3,n[1],n[2]]);
let BUS=null;
/* hushSong: whoever is singing breaks off (a line that is skipped, or a cry that cuts across it) */
function hushSong(){const g=BUS;BUS=null;if(g&&AU.ctx){try{g.gain.setTargetAtTime(0,AU.ctx.currentTime,.04)}catch(e){}setTimeout(()=>{try{g.disconnect()}catch(e){}},700)}}
/* voices: put a sung line on the mixer, through a bus of its own that goes to the music and to the room. Returns how long it lasts. */
function voices(by,key,o){o=o||{};const L=parse(SONG[key]),dur=L.reduce((s,n)=>s+n[1],0)*STEP+.42,c=AU.ctx;if(!c||c.state!=='running'&&!o.force)return dur;
  const bus=BUS=c.createGain(),t0=c.currentTime+.08,who=CHOIR[by],v=(o.v||1)*(who.length>2?.6:1);bus.connect(AU.mus);bus.connect(AU.send);
  who.forEach(w=>{const W=VOICE[w],line=o.fourths&&who.length>1&&(w==='P'||w==='M3')?lower(L):L;inhale(bus,t0,W,o.rough?.04:.02);let y=t0+.42,prev=null;
    line.forEach((n,i)=>{const d=n[1]*STEP;if(n[0]==null){prev=null;y+=d;return}
      const f=mtof(note(n[0],W.up||0,MUSIC)),nx=line[i+1];sing(bus,{f,t:y,d,v,who:W,vow:n[2],from:prev,tie:!!(nx&&nx[0]!=null),rough:o.rough});prev={f,vow:n[2]};y+=d})});
  return dur}
/* sung: a line is sung while it stands on the screen. o.cut: it breaks off after that many seconds. A line that the player skips breaks off too. */
async function sung(by,key,a,text,o){o=o||{};hushSong();const d=voices(by,key,o);
  await say(a,text,{dur:Math.round((o.cut||d+.25)*1000),color:o.color,sung:notes(key),choir:SINGERS[by]().filter(x=>x!==a&&x.room===G.room)});hushSong()}
/* the sounds of the inner prison, heard only in this chapter: water, a chain, a cough, and a man muttering */
const CALLS9={
  drip9:[2.2,3.6,(t,d)=>{tone({f:1700,to:800,t,d:.07,type:'sine',v:.05,a:.002,dest:d,echo:1});tone({f:2300,to:1500,t:t+.11,d:.05,type:'sine',v:.02,a:.002,dest:d,echo:1})}],
  chain9:[3.2,5.8,(t,d)=>{let y=t;const n=3+(Math.random()*4|0);for(let i=0;i<n;i++){noise({t:y,d:.035,v:.06*(.6+Math.random()*.6),f:3200+Math.random()*2600,q:9,dest:d});y+=.05+Math.random()*.09}}],
  cough9:[7,12,(t,d)=>{noise({t,d:.1,v:.13,f:700,q:.8,dest:d});noise({t:t+.17,d:.09,v:.09,f:620,q:.8,dest:d})}],
  mutter9:[2.4,4.2,(t,d)=>{let y=t,prev=null;const n=4+(Math.random()*4|0);for(let i=0;i<n;i++){const dd=.11+Math.random()*.1,f=92+Math.random()*26,vow='@aou'[Math.random()*4|0];
    sing(d,{f,t:y,d:dd,v:.3,who:VOICE.X,vow,from:prev,tie:i<n-1,rough:.6});prev={f,vow};y+=dd}}]};
/* rumble: the earthquake of Acts 16:26, as it is heard: the ground, stones, doors thrown open, and iron falling on stone */
function rumble(){if(!AU.ctx)return;const t=now()+.05;noise({t,d:6,v:.5,a:1.2,sus:1,f:70,q:.7,type:'lowpass'});noise({t:t+.5,d:5,v:.12,a:1.5,sus:1,f:240,q:.6});
  for(let i=0;i<9;i++)tone({f:70+Math.random()*30,to:36,t:t+.6+Math.random()*4.4,d:.35,type:'sine',v:.3});
  for(const dt of[1.9,2.5,3.4]){noise({t:t+dt,d:.18,v:.3,f:420,q:.8});tone({f:110,to:60,t:t+dt,d:.3,type:'triangle',v:.22,echo:1})}
  for(let i=0;i<14;i++)noise({t:t+2.2+Math.random()*2.6,d:.04,v:.07,f:3000+Math.random()*3000,q:9})}

/* ============ ART ============ */
const SH='#8f95c8';
/* rock, earth, tree, tufts, flowers: the ground and what grows on it, as in the chapter before */
function rock(g,x,y,w,h,c){oval(g,x+w*.1,y,w*.62,Math.max(.8,h*.16),'rgba(30,26,50,.34)');const p=[x-w/2,y,x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y];
  poly(g,p,c);clipTo(g,()=>poly(g,p),()=>{poly(g,[x-w*.42,y-h*.6,x-w*.14,y-h,x+w*.22,y-h*.9,x,y-h*.5],tint(c,.22));poly(g,[x+w*.22,y-h*.9,x+w/2,y-h*.42,x+w*.46,y,x+w*.1,y],tint(c,-.26));tex(g,'mott',.5,x-w/2,y-h,w,h,'overlay',1)})}
function earth(g,x,y0,w,y1,c,r,n){g.fillStyle=lg(g,0,y0,0,y1,[tint(c,-.12),c,tint(c,.1)]);g.fillRect(x,y0,w,y1-y0);tex(g,'mott',.4,x,y0,w,y1-y0,'overlay',1);tex(g,'grain',.14,x,y0,w,y1-y0,'overlay',.5);
  for(let i=0;i<(n||w*.4);i++){const k=r(),sy=y0+1+k*(y1-y0-2),sx=x+r()*w,s=.5+k*1.3;oval(g,sx,sy,s*1.5,s*.6,r()<.5?tint(c,.2):tint(c,-.24));if(r()<.3)oval(g,sx+s*.5,sy+s*.4,s*1.3,s*.3,'rgba(40,36,70,.22)')}}
function tree(g,x,y,h,c,r){const tw=Math.max(1.6,h*.07);stroke(g,[x,y,x-tw*.3,y-h*.3,x+tw*.4,y-h*.56],'#5a4632',tw);stroke(g,[x+tw*.3,y,x,y-h*.3,x+tw*.7,y-h*.56],'#8a765a',tw*.3);
  stroke(g,[x,y-h*.4,x-h*.16,y-h*.58],'#5a4632',tw*.5);stroke(g,[x+tw*.3,y-h*.46,x+h*.18,y-h*.62],'#5a4632',tw*.5);
  foliage(g,x-h*.14,y-h*.66,h*.24,h*.17,tint(c,-.08),r,h*3);foliage(g,x+h*.16,y-h*.7,h*.22,h*.16,c,r,h*3);foliage(g,x,y-h*.84,h*.24,h*.16,tint(c,.08),r,h*3.4)}
function tufts(g,x0,x1,y,h,c,r,n){for(let i=0;i<n;i++){const x=x0+r()*(x1-x0),hh=h*(.5+r()*.7);stroke(g,[x,y+r()*1.4,x+(r()-.5)*hh*.5,y-hh],r()<.5?c:tint(c,(r()-.5)*.4),.5)}}
/* each flower is two pixels wide and one high, so that none of them reads as a mark */
function flowers(g,x0,y0,w,h,r,n){const C=['#d84a3a','#e8c84a','#f0ece0','#b86ab0'];for(let i=0;i<n;i++){const x=x0+r()*w,y=y0+r()*h;R(g,x,y,1,.5,C[(r()*C.length)|0])}}
/* arcade: a row of round-headed openings in a wall, each dark inside, with a shop's goods at its foot. Arches, not posts under a beam: a
   row of uprights under a level band is a row of T shapes. */
function arcade(g,x,y,n,w,h,gap,wall,r){for(let i=0;i<n;i++){const ax=x+i*(w+gap);arch(g,ax-1,y-1,w+2,h+1,tint(wall,-.2));arch(g,ax,y,w,h,'#2a1e18');
    g.save();arch(g,ax,y,w,h);g.clip();g.fillStyle=lg(g,0,y,0,y+h,['#1a120e','#4a3626']);g.fillRect(ax,y,w,h);
    const c=['#8a5a3a','#6a7a5a','#a8843e','#7a4a5a'][(i*3+1)%4];R(g,ax+2,y+h-7,w-4,7,tint(c,-.2));R(g,ax+2,y+h-7,w-4,.6,tint(c,.3));for(let k=0;k<3;k++)R(g,ax+3+k*(w-6)/3,y+h-10-(k%2)*2,(w-8)/3,3+(k%2)*2,tint(c,(r()-.5)*.3));
    ao(g,ax,y,w,6,'t',.5);g.restore()}}
/* starry: a night sky, its stars single pixels of different brightness */
function starry(g,w,h,r,st){sky(g,w,h,st||['#0e1430','#1a2444','#2a3458']);for(let i=0;i<w*h/26;i++)R(g,r()*w,r()*h*.9,.5,.5,`rgba(236,236,255,${.25+r()*.7})`)}
/* cast: figures posed in a scene, the nearest drawn last. Each is [look id, x, y, dir, {bow, ges, fr}]. */
function cast(g,list,lit){list.slice().sort((a,b)=>a[2]-b[2]).forEach(([id,x,y,dir,o])=>{o=o||{};const fr=o.fr||0,bow=o.bow?1:0,ges=o.ges?1:0;
  figure(g,x,y,o.lit||lit,id+dir+'s'+fr+bow+ges,s=>person(s,0,0,LOOK[id],dir,fr,0,bow,ges,bow),7.5)})}
/* rods: what a constable carries on his shoulder, the bundle of rods bound round the handle of an ax that Insight ("Constable") describes
   as his mark of office. It lies at a slant, and its ties wind round it at a slant, so that nothing stands across anything; the blade
   shows on one side only, at the upper end. */
function rods(g,x,y,dir){const d=dir||1,x1=x+d*7,y1=y-15;stroke(g,[x,y,x1,y1],'#5a4226',2.6);stroke(g,[x-d*.6,y-.2,x1-d*.6,y1-.2],'#a8824e',.8);stroke(g,[x+d*.7,y+.2,x1+d*.7,y1+.2],'#3a2a18',.6);
  for(const k of[.22,.5,.78]){const px=x+(x1-x)*k,py=y+(y1-y)*k;stroke(g,[px-d*1.2,py-1.4,px+d*1.2,py+.2],'#8a3a2a',.7)}
  poly(g,[x1-d*.4,y1+3.4,x1+d*3.6,y1+2.2,x1+d*4,y1-1.6,x1+d*.9,y1-.4],'#b8bcc8');stroke(g,[x1+d*3.6,y1+2.2,x1+d*4,y1-1.6],'#eef0f6',.5)}

/* ---------- Lydia's house, by day: the room where the brothers of Philippi meet ---------- */
ART.lydia9={w:320,q:12,
 paint(g){const r=rng(911),W='#e2d2ae',rw=rng(9111),A='#2a2030';
  plaster(g,0,0,320,104,W,r,{patch:2,cracks:0,brick:'#b08a5a',t:.32});skipCracks9(r,4);
  /* cracks cut by hand, high on the wall, where they run to no head; a seed of their own, so the rest of the room keeps its shape */
  {const rb=rng(9112);for(const[x,y,n]of[[34,14,3],[124,13,2],[250,15,3]])crack9(g,x,y,n,rb,.9)}
  const RD=earth9('#9a4a3a',.22);R(g,0,70,320,34,RD);tex(g,'mott',.26,0,70,320,34,'overlay',1);R(g,0,69,320,1.6,'#e8dcc0');R(g,0,70.6,320,.6,tint(RD,-.4));
  /* the ceiling: its joists run toward the viewer from the wall plate, in the perspective of the floor (shared ceiling()) */
  ceiling9(g,320,{x0:10,step:36,r:rw,vx:160,vy:60});ao(g,0,10.4,320,12,'t',.42,A);
  /* the corners of the room, and the foot of the wall */
  ao(g,0,10,12,94,'l',.22,A);ao(g,0,96,320,8,'b',.2,A);
  /* the door to the street stands open to the morning: the house across the way, and the paving of the street */
  R(g,14,44,34,60,tint(W,-.16));g.fillStyle=lg(g,0,47,0,104,[earth9('#a8cdea',.12),'#e8e2cc','#e0d2ae']);g.fillRect(17,47,28,57);
  R(g,17,62,28,24,'#e6d8b6');R(g,17,60.6,28,1.6,'#b06a48');R(g,26,68,7,8,'#3a2c22');R(g,17,86,28,18,'#cfc4a8');for(let i=0;i<3;i++)R(g,17,90+i*5,28,.5,'rgba(120,108,90,.4)');
  ao(g,17,47,28,4,'t',.3,A);board9(g,14,44,3,60,'#5a4226',rw,1);board9(g,45,44,3,60,'#5a4226',rw,1);board9(g,14,44,34,3,'#5a4226',rw);
  /* the stair to the upper room, each tread throwing a little shade on the riser under it */
  for(let i=0;i<7;i++){const x=262+i*8,y=96-i*8;R(g,x,y,58-i*8,8,tint('#cabea2',-i*.02));R(g,x,y,58-i*8,.7,'#f0e6cc');ao(g,x,y+.7,58-i*8,2.4,'t',.16,A);R(g,x,y+7.2,58-i*8,.8,'#8a8068')}
  ao(g,250,10,12,94,'r',.16,A);
  R(g,300,10,20,38,tint(W,-.2));R(g,302,12,18,36,'#2a1e16');ao(g,302,12,18,8,'t',.5);
  /* her store: shelves of cloth, purple, crimson and violet */
  board9(g,84,30,2,54,'#5a4226',rw,1);board9(g,196,30,2,54,'#5a4226',rw,1);
  for(const y of[42,56,70]){ao(g,86,y+2,110,3.4,'t',.3,A);board9(g,84,y,114,2,'#7a5c36',rw);for(let i=0;i<9;i++){const c=earth9(['#6a2a5a','#8e2c40','#5a3a7a','#a03a4a','#7a3a6a','#4a2a5a','#b05a6a'][(i*3+y)%7],.16),bx=88+i*12;g.fillStyle=lg(g,0,y-8,0,y,[tint(c,.22),c,tint(c,-.36)]);g.fillRect(bx,y-8+(i%3?0:1.4),10,8-(i%3?0:1.4));R(g,bx,y-4,10,.4,'rgba(0,0,0,.25)')}}
  /* two lamps in their niches, unlit by day */
  for(const x of[58,222]){arch(g,x,38,14,18,tint(W,-.32));arch(g,x+1.4,39.4,11.2,16.6,'#4a3828');R(g,x-1,55.6,16,1.6,tint(W,.16));R(g,x+3.6,53,6.4,2.6,'#b8733c');R(g,x+3.6,53,6.4,.6,'#e0a064');R(g,x+9.4,52.2,1.8,1.2,'#b8733c')}
  /* the floor: slabs, and a mat woven in bands; a great jar of water by the door */
  pave(g,0,103,320,144,'#cdbf9c',r,{vx:160,vy:60,rows:4,step:44,v:.07,t:.3});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.22,'#1a1420');
  {const M=earth9('#6a3a5a',.24),M1=earth9('#d8b878',.12),M2=earth9('#3a2238',.2);
    clipTo(g,()=>poly(g,[70,113,250,113,268,138,52,138]),()=>{R(g,52,113,216,25,M);for(let i=0;i<8;i++)R(g,52,114.6+i*3,216,1,i%2?M1:M2);tex(g,'mott',.26,52,113,216,25,'overlay',1);ao(g,52,113,216,5,'t',.25)})}
  shadow9(g,62,106,8,1.8,.34);vessel(g,60,106,6,17,'#9a5a36','pithos',{noShadow:1});
  /* the table: bread, bowls and a jug */
  shadow9(g,159,106.4,52,2.6,.34);shadow9(g,112,106.2,4,1,.3);shadow9(g,205,106.2,4,1,.3);
  board9(g,110,90,96,4,'#96703e',rw);R(g,110,93.6,96,1,'#5a4226');board9(g,110,94,3,12,'#5a4226',rw,1);board9(g,203,94,3,12,'#5a4226',rw,1);ao(g,113,94,90,3,'t',.3,A);
  for(const x of[122,146,176])R(g,x,88,9,2,'#d8b070');for(const x of[122,146,176])R(g,x+1,87.2,7,.9,'#f0d090');
  vessel(g,162,90,3.4,3,'#b06a3a','bowl',{noShadow:1});vessel(g,194,90,3.2,8,'#8a4a2a','jug',{noShadow:1});vessel(g,136,90,3.4,3,'#a8844e','bowl',{noShadow:1});
  /* daylight from the door, and from the stair well: the door's fall on the floor and the mat, its reach along the shelves and the
     table, the shade toward the ceiling, the far corner and the near floor */
  lightmap(g,320,'#a69ca6',l=>{pool(l,31,84,60,70,'#fff4d8',1);pool(l,70,122,130,40,'#ffeecc',.7);pool(l,306,40,60,60,'#fff0d8',.6);pool(l,190,112,170,50,'#ffe8cc',.3);
    pool(l,96,62,80,40,'#f4e8d8',.42);pool(l,158,92,64,16,'#f8ead2',.4);pool(l,284,90,50,30,'#f2e4d2',.34);
    l.fillStyle=lg(l,0,0,0,28,['rgba(20,16,24,.3)','rgba(20,16,24,0)']);l.fillRect(0,0,320,28);
    l.fillStyle=lg(l,0,126,0,144,['rgba(20,16,24,0)','rgba(20,16,24,.24)']);l.fillRect(0,126,320,18)})},
 light:{amb:'#e6dcd8',wallY:103,wall:[[0,17,103,11],[45,300,103,11],[300,320,103,48]],lamps:[[31,96,80,'#30281a',103,76]]},
 draw(){},front(){}};

/* ---------- Outside the gate: the river, and the bank where the women sit; the road from the gate comes down on the right ---------- */
const WATER=[0,95,120,92.4,240,89.6,318,86,338,86,331,90,262,98,152,105.6,0,112],STONES=[[196,122],[224,118],[254,116.4],[286,118],[312,123]];
const pang9=x=>12+9*Math.sin(x/97+.3)+4*Math.sin(x/31+1)+2*Math.sin(x/11);
ART.river9={w:480,fp:1.3,q:12,
 /* the flat stones stand inside the walkable strip: whoever stands behind one has his feet hidden by it */
 props:STONES.map(([x,y])=>({y,shape(g){oval(g,x,y,10,2.8,'#000');R(g,x-9,y+1,18,1.4,'#000')}})),
 paint(g){const r=rng(913);
  sky(g,480,70,['#4a86c8','#86b2dc','#c8dae6','#eeeada'].map(c=>earth9(c,.14)));cloud(g,70,12,50,6,r);cloud(g,206,20,56,5,r);cloud(g,356,9,48,5,r);cloud(g,452,24,30,4,r);
  /* far across the plain: a long mountain, blue with the morning */
  ridge(g,0,330,66,pang9,['#8494b8','#a4b0c8','#c2c8cc']);comp(g,'screen',.36,()=>{g.fillStyle=lg(g,0,40,0,66,['rgba(224,230,238,0)','rgba(224,230,238,1)']);g.fillRect(0,40,330,26)});
  /* the city on its hill, small with distance: its wall, the gate, and the road down from it */
  ridge(g,300,480,72,x=>4+16*Math.exp(-Math.pow((x-420)/60,2))+1.4*Math.sin(x/6),['#a8b07c','#b4b888']);
  R(g,380,50,84,5.6,'#d6ccb2');R(g,380,50,84,.6,'#f2ead2');for(let i=380;i<464;i+=5)R(g,i,48.4,2.6,1.8,'#d6ccb2');R(g,416,47,7,8.6,'#cabfa4');R(g,418,51,3,4.6,'#4a3c30');
  for(const[hx,hw,hh]of[[388,9,5],[402,8,6],[432,10,5],[448,9,6]]){R(g,hx,50-hh,hw,hh,'#e2d8be');R(g,hx,50-hh-1,hw,1.2,'#b8603c')}
  stroke(g,[419.6,55.6,424,62,440,72,468,84,480,90],'#d8cca8',1.6);
  /* the plain: fields, and the green of the marsh to the south of the city */
  g.fillStyle=lg(g,0,66,0,96,['#a8b47a','#9cae6c','#8ea660'].map(c=>earth9(c,.14)));g.fillRect(0,66,480,30);tex(g,'mott',.36,0,66,480,30,'overlay',1);
  for(let i=0;i<10;i++){const fx=8+i*33+r()*10,fy=70+r()*9;poly(g,[fx,fy,fx+22,fy-1,fx+28,fy+5.6,fx+4,fy+6.6],i%3===0?'rgba(170,150,96,.36)':i%3===1?'rgba(96,136,74,.32)':'rgba(200,184,120,.3)')}
  for(const[x,y]of[[40,84],[150,80],[204,83],[292,78]]){oval(g,x+2,y+3.2,5,1,'rgba(50,60,90,.3)');R(g,x-.4,y+1,1.2,2.6,'#5a4630');foliage(g,x,y-.8,4.6,3.2,'#6a8c52',r,22)}
  /* the far bank, its reeds, and the trees that stand along the water */
  poly(g,[0,93,120,90.4,240,87.6,340,84,480,84,480,90,340,88,240,91,120,94,0,96.6],'#86a05a');tufts(g,0,330,92,5,'#6f8c48',r,150);
  /* the river: clear, and quick over its stones */
  poly(g,WATER);g.fillStyle=lg(g,0,86,0,112,['#b8dce0','#7fb2c4','#5a94ac','#4a8098']);g.fill();
  clipTo(g,()=>poly(g,WATER),()=>{comp(g,'multiply',.3,()=>{g.fillStyle=lg(g,0,86,0,98,['rgba(80,120,70,1)','rgba(80,120,70,0)']);g.fillRect(0,86,340,12)});
    for(let i=0;i<150;i++){const k=r(),sy=88+k*24,sx=(1-k)*330*r()+k*r()*260;R(g,sx,sy,2+k*7,.5,r()<.6?'rgba(238,250,250,.6)':'rgba(24,64,84,.32)')}});
  stroke(g,[0,112,152,105.6,262,98,331,90],'rgba(240,250,250,.55)',.7);
  for(const[x,y,w,h]of[[60,104,9,4],[118,101,7,3.4],[176,100.6,8,3.6],[236,96.4,6,3]])rock(g,x,y,w,h,'#9a9486');
  tree(g,96,93,46,'#5c8a48',r);tree(g,214,90,38,'#688f50',r);tree(g,300,88,30,'#5a8648',r);
  /* the near bank: turf, flowers, and the road coming down from the gate, with a path worn from it to the water */
  earth(g,0,104,480,144,earth9('#a8ac74',.1),r,150);
  comp(g,'soft-light',.6,()=>{g.fillStyle=lg(g,0,104,0,144,['rgba(96,146,62,.95)','rgba(96,146,62,.5)']);g.fillRect(0,104,480,40)});
  clipTo(g,()=>poly(g,[0,112,152,105.6,262,98,331,90,338,86,480,86,480,104,0,104]),()=>{g.fillStyle=earth9('#96aa64',.12);g.fillRect(0,86,480,26);tex(g,'mott',.36,0,86,480,26,'overlay',1)});
  poly(g,[480,90,480,102,440,108,404,118,372,126,340,131,318,131,340,113,412,99],'#cfc39c');poly(g,[480,102,480,128,430,128,404,118,440,108],'#d6caa4');
  for(let i=0;i<26;i++){const k=r();R(g,404+r()*74,106+k*20,2+k*3,.5,r()<.5?'rgba(120,108,80,.35)':'rgba(250,244,220,.4)')}
  flowers(g,0,112,330,30,r,170);flowers(g,330,132,150,10,r,36);tufts(g,0,480,142,5,'#6f8c48',r,160);tufts(g,0,150,113,4,'#7a9650',r,50);
  /* the flat stones, set in a half circle and worn smooth: this is where they sit */
  for(const[x,y]of STONES){shadow9(g,x+1.4,y+1.4,11,2.4,.34,'#1e1e3c');g.fillStyle=lg(g,x-10,0,x+10,0,['#8e887a','#d6d0c0','#b8b2a2','#7e786c']);g.beginPath();g.ellipse(x,y,10,2.8,0,0,6.2832);g.fill();R(g,x-8,y-2.2,14,.6,'rgba(250,246,232,.5)');R(g,x-9,y+1,18,1.4,'#7e786c');R(g,x-6,y+2.4,12,.5,'rgba(30,30,50,.3)')}
  /* a great plane tree on this bank, and its shade over the stones */
  /* its shade in three steps, soft at the edge and deep under the crown */
  for(const[k,a]of[[1.14,.12],[1,.16],[.72,.12]])comp(g,'multiply',a,()=>{oval(g,286,123,104*k,13*k,'#7a80b4');oval(g,340,118,60*k,9*k,'#7a80b4')});comp(g,'screen',.3,()=>{for(let i=0;i<46;i++)oval(g,184+r()*180,114+r()*18,1.5+r()*3,.5+r()*.8,'#fff4c8')});
  tree(g,372,114,84,'#5a8a48',r);rock(g,398,116,12,6,'#948e80');crack9(g,397,111.6,1,rng(9131),.8);
  pool(g,180,0,300,160,'#fff6d6',.12,'screen');ao(g,0,128,480,16,'b',.1,'#2a2050');
  /* the morning sun from the left and high: it lies full on the near bank and the road, the sky and the far plain keep their own light,
     and the foot of the picture and the bank under the plane tree fall a little into shade */
  lightmap(g,480,'#d6d2d8',l=>{l.fillStyle=lg(l,0,0,0,104,['#ffffff','#ffffff','rgba(255,255,255,0)']);l.fillRect(0,0,480,104);
    pool(l,140,116,190,34,'#fff4e0',.7);pool(l,440,112,90,30,'#fff2dc',.6);pool(l,250,124,90,14,'#f8f0e0',.4);pool(l,60,104,90,14,'#f2f4f0',.4);
    l.fillStyle=lg(l,0,128,0,144,['rgba(30,26,44,0)','rgba(30,26,44,.16)']);l.fillRect(0,128,480,16)})},
 fore(g){const r=rng(914);/* reeds and iris at the water's edge, nearest us */
  for(let i=0;i<80;i++){const sx=-6+r()*130;stroke(g,[sx,154,sx+(r()-.5)*12,116+r()*20],r()<.5?'#56723a':'#6c8a48',1)}
  for(let i=0;i<8;i++){const sx=8+i*14+r()*6,sy=120+r()*12;R(g,sx,sy,2,1.6,'#e8c84a');R(g,sx+.4,sy+1.6,1.2,1,'#c8a02a')}
  rock(g,580,154,46,18,'#7a7468');comp(g,'source-atop',.36,()=>R(g,0,0,640,150,'#2c3a58'))},
 draw(g,t){/* light running down the water */
  for(let i=0;i<18;i++){const k=((t/1500+i*.0556)%1),x=320-k*320,y=87+k*19+(i%3);if(i%2)R(g,x,y,3+k*5,.5,`rgba(244,252,252,${.6*Math.sin(k*3.1416)})`)}
  /* the women of Lydia's household, who come out with her */
  for(const[id,x,y,d]of HOUSEHOLD)man(g,x,y,id,d,0,null,0,7)},
 front(){}};
/* ---------- The marketplace of Philippi: the long hall of shops, and the platform where the magistrates sit ---------- */
/* No temple, altar, statue or image stands in it. The hall is a row of arches under a tiled roof. */
ART.forum9={w:320,q:12,
 paint(g){const r=rng(917),ST='#d6ccb0',W='#e4d6b6',A='#3a3050';
  sky(g,320,58,['#3d7cc6','#76a8dc','#bcd4e6','#e8e8dc'].map(c=>earth9(c,.14)));cloud(g,60,10,44,5,r);cloud(g,236,16,50,5,r);
  /* over the roofs: the rocky acropolis hill with its citadel wall grounded into the slope and tower at the wall's end */
  const ac=x=>8+24*Math.exp(-Math.pow((x-250)/60,2))+2*Math.sin(x/9);
  ridge(g,150,320,50,ac,['#bfb49c','#a69c82','#8c846e']);
  clipTo(g,()=>{g.beginPath();g.moveTo(150,50);for(let x=150;x<=320;x+=2)g.lineTo(x,50-ac(x));g.lineTo(320,50);g.closePath()},()=>{
    poly(g,[190,46,248,18,242,46],'rgba(244,236,210,.2)');poly(g,[252,18,314,44,254,48],'rgba(58,50,74,.2)');
    tex(g,'mott',.3,150,14,170,36,'overlay',.7);
    for(let i=0;i<14;i++)foliage(g,166+i*10+r()*6,30+r()*14,4+r()*3,1.8+r(),'#7a8658',r,8)});
  /* citadel curtain wall seated down onto the ridge slope, with small battlements and an end tower at x=222 */
  const cw=[222,16.5,282,17.8,282,25.5,264,23,222,22];
  poly(g,cw,'#cfc4a8');clipTo(g,()=>poly(g,cw),()=>{for(let y=18.5;y<25;y+=2.4)R(g,222,y,60,.45,'rgba(76,64,48,.28)');tex(g,'mott',.3,222,16,60,10,'overlay',.6)});
  stroke(g,[222,16.5,282,17.8],'#efe6ce',.6);for(let x=232;x<280;x+=4.5)R(g,x,15.3+(x-222)*.022,2.4,1.6,'#d8ceb4');
  ashlar(g,220,9.5,11,13,'#c8bea2',r,{bw:5.5,bh:3.2,v:.08,t:.25});R(g,219.5,8.2,12,1.6,'#dfd6bc');R(g,219.5,8.2,12,.5,'#f4ecd8');
  for(let x=219.5;x<231;x+=3.6)R(g,x,6.8,2,1.5,'#dfd6bc');R(g,229,9.5,2,13,'rgba(54,46,78,.32)');R(g,224.4,12.5,1.2,2.6,'#3a322c');
  for(const[x,h]of[[176,10],[304,12]])cypress(g,x,52,h);
  /* the hall of shops along the far side of the square */
  plaster(g,0,40,320,64,W,r,{patch:3,cracks:0,t:.36});skipCracks9(r,5);
  /* cracks cut by hand in the band over the arches, clear of the magistrates' heads */
  {const rb=rng(9171);for(const[x,y,n]of[[40,43,2],[150,43.4,2],[290,43,2]])crack9(g,x,y,n,rb,.9)}
  const TL=earth9('#b8603c',.16);R(g,0,35,320,6,TL);for(let i=0;i<320;i+=4)R(g,i,35,.5,6,'rgba(90,40,24,.35)');R(g,0,35,320,.7,tint(TL,.24));R(g,0,41,320,1,'rgba(60,40,60,.4)');ao(g,0,42,320,7,'t',.3,A);
  arcade(g,8,56,9,26,48,9,W,r);ao(g,0,97,320,7,'b',.18,A);
  /* the platform: a block of dressed stone with three steps up its front, and the magistrates' two seats on it */
  shade(g,[90,103.6,214,103.6,226,111.2,99,111.2],SH,.18);shade(g,[92,104,212,104,222,110,102,110],SH,.3);shade(g,[94,104,210,104,215,106.8,98,106.8],SH,.2);
  ashlar(g,96,80,112,24,ST,r,{bw:14,bh:6,v:.08,t:.3});R(g,94,78.4,116,2.2,'#f0e8d0');R(g,94,80.4,116,.6,'#a09678');
  for(let i=0;i<3;i++){const sx=134-i*4,sw=36+i*8,sy=86+i*6;R(g,sx,sy,sw,6,tint(ST,.06-i*.05));R(g,sx,sy,sw,.7,'#f4ecd6');R(g,sx,sy+5.4,sw,.6,'#9a9078')}
  for(const x of[110,186]){R(g,x+1,72,2,6.6,'#5a4226');R(g,x+9,72,2,6.6,'#5a4226');R(g,x,70,12,2.2,'#7a5632');R(g,x,70,12,.5,'#b08a5a');R(g,x+1.6,67,8.8,3.2,earth9('#8e2c40',.18));R(g,x+1.6,67,8.8,.6,earth9('#c05a6a',.18))}
  /* the square, paved, and the ruts of the great road along its near side */
  pave(g,0,103,320,144,'#cfc6ae',r,{vx:160,vy:60,rows:5,step:36,v:.08,joint:'#9a927c'});ao(g,0,103,320,5,'t',.3,'#4a4460');
  for(let i=0;i<2;i++)stroke(g,[0,129+i*8,320,128.4+i*8],'rgba(80,70,90,.28)',1);
  comp(g,'soft-light',.45,()=>{g.fillStyle=lg(g,0,103,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,103,320,41)});
  pool(g,160,0,220,150,'#fff4d6',.12,'screen');
  /* the sun from the left and high: full on the square and the front of the platform, the hall in the shade of its eaves, the far end
     of the hall and the foot of the picture a little darker */
  lightmap(g,320,'#d4d0d8',l=>{l.fillStyle=lg(l,0,0,0,56,['#ffffff','#ffffff','rgba(255,255,255,0)']);l.fillRect(0,0,320,56);
    pool(l,140,118,200,30,'#fff4e0',.62);pool(l,150,90,70,20,'#fff2dc',.5);pool(l,60,80,90,30,'#f6efe4',.36);
    l.fillStyle=lg(l,0,128,0,144,['rgba(30,26,44,0)','rgba(30,26,44,.14)']);l.fillRect(0,128,320,16)})},
 draw(){},front(){}};

/* ---------- The inner prison: not seen at all, then by the grey of an open door, then by lamps ---------- */
/* It is painted in full, and then the light is taken away: while the door is shut there is nothing to see but a hair of grey under it, and
   the room is its sounds (see ROOMS.cell9, heard). After the earthquake the door stands open; when the jailer has asked for lights, the
   room is seen for the first time. The stocks are two beams lying flat on the floor, one upon the other: nothing stands under them. */
const cellV=()=>G.lit9?'l':F.quake?'o':'';
ART.cell9={w:320,q:12,variant:cellV,
 /* the stocks lie on the floor in front of the two men: their ankles are behind the beams, as they are in them */
 props:[{y:136,shape(g,v){const sx=118,sy=129,sw=92;R(g,sx,sy+2.4,sw,4,'#000');
   if(v){g.save();g.translate(sx+16,sy-6);g.rotate(-.1);g.fillStyle='#000';g.fillRect(0,0,sw,3.6);g.restore()}else{R(g,sx,sy-1.2,sw,3.6,'#000');R(g,sx+sw-3,sy-1.6,4,8,'#000')}}}],
 paint(g,v){const r=rng(919),ST='#8e8676',rw=rng(9191);
  ashlar(g,0,0,320,106,ST,r,{bw:22,bh:11,v:.12,t:.36,fade:.25});ao(g,0,0,320,26,'t',.5);ao(g,0,80,320,26,'b',.45,'#1a1410');
  /* the corners of the cell close it in, and a darker seam where the wall meets the floor */
  ao(g,0,0,26,106,'l',.4,'#0e0c0a');ao(g,294,0,26,106,'r',.4,'#0e0c0a');ao(g,0,101,320,5,'b',.3,'#0e0c0a');
  for(let i=0;i<9;i++){const x=20+r()*280;stroke(g,[x,20+r()*20,x+(r()-.5)*4,70+r()*30],'rgba(20,24,20,.28)',1+r())}
  /* rings let into the wall, and the chains that hang from them; each ring is a small square, and its hole a smaller one */
  for(const[x,y,n]of[[52,58,9],[262,54,11],[96,50,6]]){R(g,x-1.6,y-1.6,3.6,3.6,'#3a3632');R(g,x-.6,y-.6,1.6,1.6,'#16120e');for(let k=0;k<(v?3:n);k++)R(g,x-.5+(k%2)*.6,y+2+k*2.4,1.4,1.8,k%2?'#5a544c':'#2e2a26')}
  /* the door: thick planks in a deep frame */
  R(g,192,40,48,66,tint(ST,-.4));
  if(v){g.fillStyle=v==='l'?lg(g,0,44,0,104,['#2c2a3e','#5a4c44','#7a6248']):lg(g,0,44,0,104,['#1c2440','#39425e','#4a5068']);g.fillRect(196,44,40,62);
    if(v==='l')for(let j=0;j<6;j++)R(g,196,48+j*8,40,.5,'rgba(20,16,24,.35)');R(g,196,92,40,14,v==='l'?'#8a7252':'#565c70');for(let i=0;i<3;i++)R(g,196,95+i*4,40,.5,'rgba(20,20,40,.3)');boards(g,236,46,9,60,4.5,'#4a3824',r);R(g,236,46,.8,60,'#1a120c')}
  else{boards(g,196,44,40,62,6.6,'#4a3824',r);ao(g,196,44,40,8,'t',.6);R(g,196,104.6,40,1.4,'#7a7e98')}
  ao(g,192,40,48,5,'t',.5);
  /* two short cracks in the stone, each inside its own block, so that none runs across a joint */
  {const rb=rng(9192);for(const[x,y]of[[122,34.6],[276,45.6]])crack9(g,x,y,1,rb,1.2)}
  /* the floor: beaten earth, and old straw */
  earth(g,0,105,320,144,'#6e6454',r,90);ao(g,0,105,320,8,'t',.5,'#0e0c0a');
  for(let i=0;i<150;i++){const x=r()*320,y=110+r()*32;stroke(g,[x,y,x+3+r()*5,y+(r()-.5)*2.4],r()<.5?'#a8965e':'#7a6c44',.5)}
  /* fallen links under the rings, once the bonds have come loose */
  if(v)for(const[x,y]of[[50,112],[258,114],[98,110]])for(let k=0;k<7;k++)R(g,x+k*2.2+(k%2),y+(k%3)*.8,1.8,1.2,k%2?'#5a544c':'#2e2a26');
  const sx=118,sy=129,sw=92;R(g,sx+2,sy+5.6,sw,2.4,'rgba(10,8,6,.2)');R(g,sx+1,sy+5,sw,2.4,'rgba(10,8,6,.26)');R(g,sx+1,sy+5.2,sw-1,1.4,'rgba(10,8,6,.3)');board9(g,sx,sy+2.4,sw,4,'#5a4226',rw);
  if(v){g.save();g.translate(sx+16,sy-6);g.rotate(-.1);board9(g,0,0,sw,3.6,'#6a4e2c',rw);g.restore();for(let i=0;i<5;i++)R(g,sx+10+i*17,sy+2.4,3,1.2,'#120e0a')}
  else{board9(g,sx,sy-1.2,sw,3.6,'#6a4e2c',rw);for(let i=0;i<5;i++)R(g,sx+10+i*17,sy+1.4,3,2,'#120e0a');R(g,sx+sw-3,sy-1.6,4,8,'#2e2a26');R(g,sx+sw-3,sy-1.6,4,.6,'#5a544c')}
  /* lit: the lamps stand in the doorway and are carried in; their light reaches the stocks, the floor and the walls on either side, and
     leaves the vault and the near floor in shade. Open: the grey of the outer door, on the jambs and in a fall on the floor */
  if(v==='l')lightmap(g,320,'#564a5a',l=>{pool(l,216,84,90,70,'#ffcf8a',1);pool(l,160,120,150,50,'#ffc078',.75);pool(l,60,110,80,50,'#ffb060',.3);
    pool(l,164,130,60,10,'#ffd8a0',.45);pool(l,270,70,60,50,'#e8a868',.3);pool(l,110,60,90,50,'#d89a5c',.26);
    l.fillStyle=lg(l,0,0,0,30,['rgba(14,10,16,.4)','rgba(14,10,16,0)']);l.fillRect(0,0,320,30);
    l.fillStyle=lg(l,0,128,0,144,['rgba(14,10,16,0)','rgba(14,10,16,.3)']);l.fillRect(0,128,320,16)});
  else if(v)lightmap(g,320,'#11131f',l=>{pool(l,216,80,46,56,'#6a76a6',.9);pool(l,200,124,90,26,'#4a5684',.7);pool(l,190,72,10,34,'#5a6698',.4);pool(l,242,72,10,34,'#5a6698',.4);pool(l,218,112,30,6,'#7a86b6',.4)});
  else lightmap(g,320,'#020204',l=>{pool(l,216,106,26,5,'#2a2e44',.9)})},
 light(){const v=cellV(),W=[[0,196,105,14],[236,320,105,14]];return v==='l'?{amb:'#7a6c72',wallY:105,wall:W,lamps:[[216,96,90,'#6a4a20',105,84],[160,124,90,'#5a3a14',140,114]]}:v?{amb:'#1c2030',wallY:105,wall:W,lamps:[[214,110,60,'#20284a',105,84]]}:{amb:'#07070b'}},
 draw(g,t){/* the jailer, as he is seen from the dark: a man against the grey of the outer door, with his sword drawn. The blade is one slanting
     line from his raised hand; his hand covers the guard, so that hilt and blade make no cross. */
  if(F.quake&&!G.lit9&&!F.saved){const x=216,y=105;figure(g,x,y,'#3a4266','jailer9-1s01',s=>person(s,0,0,LOOK.jailer9,-1,0,0,0,1,0),6);
    depth(y+.1,()=>{stroke(g,[x-10,y-37.4,x-16,y-49],'#8088a8',1.8);stroke(g,[x-10.2,y-37.8,x-16.2,y-49.4],'#d4daee',.8)})}},
 front(){}};

/* ---------- The court of the prison: by night, when the jailer brings them out, and in the morning ---------- */
ART.gaol9={w:320,q:12,variant:()=>F.back?'d':'',
 paint(g,v){const r=rng(923),ST='#b8ae96',W='#d8caa6',day=v==='d',A='#2a2440';
  if(day){sky(g,320,40,['#6a9ed8','#a8c8e4','#f0e2c4'].map(c=>earth9(c,.14)));cloud(g,250,10,40,4,r);cloud(g,96,14,34,3,r)}else starry(g,320,40,r);
  /* the wall round the court */
  ashlar(g,0,22,320,84,ST,r,{bw:18,bh:8,v:.1,t:.3});R(g,0,20.4,320,2.2,tint(ST,.2));R(g,0,22.4,320,.6,tint(ST,-.4));ao(g,0,23,320,6,'t',.22,A);
  /* the outer door, to the street: oak in a frame of stone. In the morning it stands open. */
  R(g,16,46,40,60,tint(ST,-.3));
  if(day){g.fillStyle=lg(g,0,50,0,106,['#a8cdea','#e8e2cc','#d8ccae']);g.fillRect(20,50,32,56);R(g,20,66,32,22,'#e2d6b6');R(g,20,64.6,32,1.6,'#b8603c');R(g,20,88,32,18,'#cfc4a8');boards(g,52,52,7,54,3.5,'#5a4226',r);R(g,52,52,.8,54,'#2a1c10')}
  else{boards(g,20,50,32,56,5.4,'#5a4226',r);ao(g,20,50,32,6,'t',.5);R(g,20,50,.8,56,'#2a1c10')}
  /* two cells, each with a small barred opening in its door: upright bars only */
  for(const x of[70,108]){R(g,x-2,58,32,48,tint(ST,-.3));boards(g,x,60,28,46,4.7,'#4a3824',r);R(g,x+8,66,12,9,'#0e0a08');for(let i=1;i<4;i++)R(g,x+8+i*3-.4,66,.8,9,'#3a3632');ao(g,x,60,28,5,'t',.5)}
  /* a trough of stone against the wall, with water in it */
  shade(g,[140,105.6,186,105.6,193,111,146,111],SH,.16);shade(g,[142,106,184,106,190,110,148,110],SH,.3);shade(g,[144,106,182,106,186,108,148,108],SH,.2);g.fillStyle=lg(g,144,0,182,0,['#aca28c','#e8e0c8','#cec4ac','#8e8674']);g.fillRect(144,96,38,10);R(g,143,94.6,40,2,'#f0e8d4');R(g,143,96.4,40,.6,'#a8a094');R(g,146.4,95,33.2,1.2,day?earth9('#4f8cb4',.16):'#2e4a6e');crack9(g,170,97.2,1,rng(9231),.9);
  /* the way down to the inner prison: a low doorway at the foot of three steps, black inside, its door thrown back */
  R(g,190,58,44,48,tint(ST,-.36));R(g,194,62,36,44,'#07060a');for(let i=0;i<3;i++){R(g,194+i*3,94+i*4,36-i*6,4,tint(ST,-.2-i*.12));R(g,194+i*3,94+i*4,36-i*6,.6,tint(ST,.1))}
  boards(g,230,60,8,46,4,'#4a3824',r);R(g,230,60,.8,46,'#1a120c');
  /* the jailer's house: a plastered front, its door, and a lamp in a niche beside it */
  plaster(g,246,30,74,76,W,r,{patch:2,cracks:0,t:.36,brick:'#a8845a'});skipCracks9(r,3);{const rb=rng(9232);for(const[x,y,n]of[[254,32,2],[312,33,2]])crack9(g,x,y,n,rb,.9)}
  ao(g,246,30,8,76,'l',.3,A);R(g,246,28,74,2.4,tint(W,.16));R(g,246,30.4,74,.8,tint(W,-.38));
  R(g,270,54,34,52,tint(W,-.2));doorArt(g,273,57,28,49,'#6a4a2c',r,{bands:[]});
  arch(g,252,62,12,16,tint(W,-.32));arch(g,253.2,63.2,9.6,14.8,'#4a3828');R(g,251,77.6,14,1.6,tint(W,.16));R(g,255,75,6.4,2.6,'#b8733c');R(g,255,75,6.4,.6,'#e0a064');R(g,260.8,74.2,1.8,1.2,'#b8733c');
  /* the court: paved */
  ao(g,0,98,320,8,'b',.22,A);
  pave(g,0,105,320,144,'#c4baa0',r,{vx:160,vy:62,rows:5,step:38,v:.08,joint:'#8e8670',t:.3});ao(g,0,105,320,5,'t',.35,'#3a3450');ao(g,0,105,320,2,'t',.2,'#1a1420');
  /* by day: the sun over the wall on the left; the wall's foot and the near court a little in shade. By night: the lamp in its niche,
     its fall on the court, the moon along the top of the wall and on the middle of the court, the dark gathering in the doorways */
  if(day){shade(g,[16,106,56,106,74,116,34,116],SH,.4);comp(g,'soft-light',.4,()=>{g.fillStyle=lg(g,0,105,0,144,['rgba(250,244,222,0)','rgba(250,244,222,.9)']);g.fillRect(0,105,320,39)});pool(g,36,90,90,60,'#fff0cc',.2,'screen');
    lightmap(g,320,'#d4d0d8',l=>{l.fillStyle=lg(l,0,0,0,40,['#ffffff','rgba(255,255,255,0)']);l.fillRect(0,0,320,40);pool(l,120,70,170,50,'#fff4e2',.5);pool(l,150,120,190,26,'#fff2dc',.6);
      l.fillStyle=lg(l,0,128,0,144,['rgba(30,26,44,0)','rgba(30,26,44,.14)']);l.fillRect(0,128,320,16)})}
  else lightmap(g,320,'#363a5c',l=>{nicheLight(l,258,74,34,28,'#ffc070',.92);pool(l,262,112,80,40,'#ffb060',.5);pool(l,120,116,150,40,'#8a94c8',.35);
    pool(l,140,26,180,14,'#8e98c8',.4);pool(l,290,96,30,12,'#ffb060',.3);
    l.fillStyle=lg(l,0,128,0,144,['rgba(10,10,20,0)','rgba(10,10,20,.26)']);l.fillRect(0,128,320,16)})},
 light(){return F.back?null:{amb:'#6c6e96',wallY:105,wall:[[0,194,105,23],[230,320,105,30]],lamps:[[258,90,84,'#7a5220',105,74.6]]}},
 draw(g,t){if(!F.back)flame(g,258.2,74.6,t);
  /* what the constables carry, drawn with them */
  for(const a of[CO,C2])if(a.room==='gaol9')depth(a.y+.2,()=>rods(g,a.x-a.dir*3.4,a.y-28,-a.dir))},
 front(){}};

/* ---------- The jailer's house, in that hour of the night ---------- */
ART.jailer9={w:320,q:12,
 paint(g){const r=rng(929),W='#dccaa4',rw=rng(9291),A='#2a2030';
  plaster(g,0,0,320,104,W,r,{patch:3,cracks:0,brick:'#a8845a',t:.36});skipCracks9(r,5);
  /* cracks cut by hand, high on the wall, where they run to no head */
  {const rb=rng(9292);for(const[x,y,n]of[[30,14,3],[194,13,2],[296,15,3]])crack9(g,x,y,n,rb,.9)}
  R(g,0,78,320,26,tint(W,-.24));tex(g,'mott',.28,0,78,320,26,'overlay',1);R(g,0,77,320,1.4,tint(W,.12));
  /* the ceiling: its joists run toward the viewer from the wall plate, in the perspective of the floor (shared ceiling()); the corners
     and the wall's foot */
  ceiling9(g,320,{x0:14,step:40,r:rw,vx:160,vy:60});ao(g,0,10.4,320,12,'t',.42,A);
  ao(g,0,10,14,94,'l',.24,A);ao(g,306,10,14,94,'r',.24,A);ao(g,0,96,320,8,'b',.22,A);
  /* the door to the court */
  R(g,266,44,36,60,tint(W,-.16));doorArt(g,269,47,30,57,'#6a4a2c',r,{bands:[],left:1});
  /* a shelf of the house's vessels, and two lamps in their niches */
  ao(g,102,46,80,3.4,'t',.3,A);board9(g,100,44,84,2,'#7a5c36',rw);for(const[x,k,c,w,h]of[[110,'jug','#8a4a2a',3.4,9],[124,'jar','#a8562e',4,10],[140,'bowl','#b06a3a',4,3.4],[154,'jug','#7a6a4a',3,8],[170,'jar','#9a5a36',4.4,11]])vessel(g,x,44,w,h,c,k,{noShadow:1});
  for(const x of[58,222]){arch(g,x,38,14,18,tint(W,-.32));arch(g,x+1.4,39.4,11.2,16.6,'#4a3828');R(g,x-1,55.6,16,1.6,tint(W,.16));R(g,x+3.6,53,6.4,2.6,'#b8733c');R(g,x+3.6,53,6.4,.6,'#e0a064');R(g,x+9.4,52.2,1.8,1.2,'#b8733c')}
  /* the floor, and a mat of rushes */
  pave(g,0,103,320,144,'#bfb293',r,{vx:160,vy:60,rows:4,step:44,v:.07,t:.3});ao(g,0,103,320,6,'t',.35,'#3a3050');ao(g,0,103,320,2.4,'t',.22,'#1a1420');
  clipTo(g,()=>poly(g,[86,116,236,116,250,138,72,138]),()=>{R(g,72,116,178,22,'#a8965e');for(let i=0;i<8;i++)R(g,72,117.4+i*2.8,178,.8,i%2?'#c8b67a':'#7a6c44');tex(g,'mott',.26,72,116,178,22,'overlay',1);ao(g,72,116,178,4,'t',.2)});
  /* the table, set in the night: bread, a bowl of olives, a jug */
  shadow9(g,169,106.4,46,2.6,.36);shadow9(g,128,106.2,4,1,.3);shadow9(g,209,106.2,4,1,.3);
  board9(g,126,90,84,4,'#8a683a',rw);R(g,126,93.6,84,1,'#5a4226');board9(g,126,94,3,12,'#5a4226',rw,1);board9(g,207,94,3,12,'#5a4226',rw,1);ao(g,129,94,78,3,'t',.3,A);
  for(const x of[136,160])R(g,x,88,9,2,'#d8b070');for(const x of[136,160])R(g,x+1,87.2,7,.9,'#f0d090');vessel(g,182,90,3.4,3,'#b06a3a','bowl',{noShadow:1});vessel(g,198,90,3.2,8,'#8a4a2a','jug',{noShadow:1});
  /* the two lamps from their niches, their fall on the floor and on the table between them; the ceiling, the corners and the near floor
     in shade */
  lightmap(g,320,'#66586e',l=>{nicheLight(l,65,51,34,28,'#ffc070',.9);nicheLight(l,229,51,34,28,'#ffc070',.9);pool(l,65,100,80,46,'#ffb060',.45);pool(l,229,100,80,46,'#ffb060',.45);pool(l,160,116,170,44,'#ffe0b0',.45);
    pool(l,168,92,50,14,'#ffd8a0',.4);pool(l,142,46,44,12,'#e8b880',.3);
    l.fillStyle=lg(l,0,0,0,28,['rgba(16,12,20,.34)','rgba(16,12,20,0)']);l.fillRect(0,0,320,28);
    l.fillStyle=lg(l,0,126,0,144,['rgba(16,12,20,0)','rgba(16,12,20,.26)']);l.fillRect(0,126,320,18)})},
 draw(g,t){for(const x of[58,222])flame(g,x+10.6,51.6,t+x*7)},front(){}};

/* ============ CAST ============ */
Object.assign(LOOK,{
  /* the four who came over from Troas. Silas and Timothy have actors of their own in this chapter, as in the one before, so that neither
     disturbs the other; Luke is the same man to play. paul9b and silas9b: without their cloaks, after the marketplace. */
  silas9:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',cloak:'#b89a62',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  silas9b:{skin:'#b98658',hair:'#3a2c22',beard:'#3a2c22',tunic:'#3f5f86',belt:'#4a3a24',trim:'#2a4466',long:1,brow:'#2a1a12',ph:700},
  paul9b:{skin:'#c08a5c',hair:'#483a32',beard:'#483a32',brow:'#3a2e28',grey:'#8a827a',thin:1,tunic:'#c4b08a',belt:'#3a2414',trim:'#8a6a4a',ph:0},
  timothy9:{skin:'#c89868',hair:'#3a2616',tunic:'#d8cfb0',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  luke:{skin:'#c4946a',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2a1a12',ph:1100},
  luke9:{skin:'#c4946a',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2a1a12',ph:1100},
  /* Lydia, two of the women who meet by the river, and people of her household */
  lydia9:{skin:'#c8a078',veil:'#6a2a5a',tunic:'#ece4d0',long:1,belt:'#c9a14a',slim:1,longSleeve:1,trim:'#6a2a5a',brow:'#3a2414',ph:1900},
  phila9:{skin:'#c89a70',veil:'#5a7a8a',tunic:'#b8a078',long:1,belt:'#5a3a20',slim:1,longSleeve:1,trim:'#3a5a6a',brow:'#3a2414',ph:3100},
  elpis9:{skin:'#b88a62',veil:'#c8a25a',tunic:'#7a6a8a',long:1,belt:'#4a3a24',slim:1,longSleeve:1,trim:'#5a4a6a',brow:'#8a8a8a',ph:400},
  hh91:{skin:'#b88a62',veil:'#e2dccb',tunic:'#6a5a70',long:1,belt:'#4a3a24',slim:1,longSleeve:1,brow:'#8a8a8a',ph:0},hh92:{skin:'#d0a880',veil:'#b05a6a',tunic:'#d8d0b4',long:1,belt:'#8a6a2a',slim:1,longSleeve:1,brow:'#3a2414',ph:0},
  hh93:{skin:'#c08c5c',hair:'#2a1a12',tunic:'#9aa88a',belt:'#4a3a24',slim:1,brow:'#2a1a12',ph:0},
  /* the servant girl, and her two masters */
  girl9:{skin:'#c69870',veil:'#c4b89a',tunic:'#9a8660',long:1,belt:'#5a4630',slim:1,h:1,brow:'#3a2414',ph:900},
  master91:{skin:'#b8845a',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#e6dcc0',cloak:'#8a3a2a',long:1,belt:'#c9a14a',trim:'#6a2418',brow:'#2a1a12',ph:300},
  master92:{skin:'#a8703f',hair:'#8a8a8a',bald:1,brow:'#5a5a5a',tunic:'#d8c890',cloak:'#3a5a4a',long:1,belt:'#4a3a24',trim:'#2a4034',ph:1300},
  /* the civil magistrates and their constables */
  mag91:{skin:'#c69870',hair:'#b0b0b0',brow:'#7a7a7a',tunic:'#f0ece0',cloak:'#e8e2d2',long:1,belt:'#8a6a2a',trim:'#7a2a5a',ph:500},
  mag92:{skin:'#b8845a',hair:'#5a4026',bald:1,brow:'#3a2a1a',tunic:'#f0ece0',cloak:'#e2dccb',long:1,belt:'#8a6a2a',trim:'#7a2a5a',ph:1900},
  lic91:{skin:'#a8703f',hair:'#2a1a12',tunic:'#a8402c',belt:'#3a2414',trim:'#6a2418',brow:'#1a1210',ph:200},
  lic92:{skin:'#b47e52',hair:'#3a2a1a',beard:'#3a2a1a',tunic:'#a8402c',belt:'#3a2414',trim:'#6a2418',brow:'#2a1a12',ph:1500},
  /* the jailer and those of his house: the account names none of them, and neither does the game */
  jailer9:{skin:'#b08058',hair:'#7a7670',brow:'#5a5650',tunic:'#7a6a52',belt:'#2e2016',trim:'#4a3e2e',ph:800},
  jw9:{skin:'#c89a70',veil:'#8a7a9a',tunic:'#c8bca0',long:1,belt:'#5a3a20',slim:1,longSleeve:1,brow:'#3a2414',ph:2700},
  jy9:{skin:'#c69870',hair:'#3a2616',tunic:'#b8b08a',belt:'#5a3a20',slim:1,h:1,brow:'#2a1a12',ph:1200},
  jo9:{skin:'#a8703f',hair:'#c8c8c8',beard:'#c8c8c8',brow:'#8a8a8a',tunic:'#8a7a62',belt:'#2e2016',ph:2200},
  /* the other prisoners: heard for hours before they are seen */
  pr91:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',longBeard:1,tunic:'#6a6252',belt:'#2e2016',brow:'#1a1210',ph:100},
  pr92:{skin:'#b47e52',hair:'#5a4026',beard:'#5a4026',tunic:'#7a6a5a',belt:'#2e2016',slim:1,brow:'#3a2a1a',ph:1700},
  pr93:{skin:'#b88a62',hair:'#c8c8c8',beard:'#c8c8c8',longBeard:1,bald:1,brow:'#8a8a8a',tunic:'#5e5a52',belt:'#2e2016',ph:2900},
  /* people of the colony, in the marketplace */
  cr91:{skin:'#c69870',hair:'#5a4026',tunic:'#e8e2d0',cloak:'#ded6c0',long:1,belt:'#8a6a2a',brow:'#3a2a1a',ph:0},cr92:{skin:'#c89a70',veil:'#c8a25a',tunic:'#7a8a9a',long:1,belt:'#5a3a20',slim:1,longSleeve:1,ph:0},
  cr93:{skin:'#a8703f',hair:'#2a1a12',beard:'#2a1a12',tunic:'#8a6a4a',belt:'#2e2016',ph:0},cr94:{skin:'#b8845a',hair:'#a8a8a8',brow:'#7a7a7a',tunic:'#a8402c',belt:'#3a2414',trim:'#6a2418',ph:0},
  cr95:{skin:'#b47e52',hair:'#3a2a1a',tunic:'#6a7a5a',belt:'#2e2016',slim:1,ph:0}});
/* HOUSEHOLD: who is with Lydia at the river. The account says "her household", and no more: they are seen, and nobody says who they are. */
const HOUSEHOLD=[['hh91',312,119,-1],['hh92',328,125,-1]];
const SI=actor('silas9','Silas','#9fd8c8',118),TI=actor('timothy9','Timothy','#b8e0b0',150),LU=actor('luke','Luke','#c8e8c0',126),LK=actor('luke9','Luke','#c8e8c0',126),
  LY=actor('lydia9','Lydia','#e0b0e8',190),PH=actor('phila9','Phila','#a8d0e0',198),EL=actor('elpis9','Elpis','#f0d8a0',176),
  GI=actor('girl9','servant_girl','#e8c8a0',230),MA=actor('master91','master_of_the_girl','#f0a890',104),MB=actor('master92','older_master','#d8c890',92),
  JA=actor('jailer9','jailer','#f0c090',106),MG=actor('mag91','magistrate','#e8d8f0',98),M2=actor('mag92','younger_magistrate','#d8d0e8',110),
  CO=actor('lic91','constable','#f0a898',116),C2=actor('lic92','bearded_constable','#e8b0a0',104),
  PR=[actor('pr91','man_who_muttered','#c8c0b0',90),actor('pr92','man_with_the_chain','#d0c8a8',124),actor('pr93','man_who_coughed','#c0c8d0',84)];

/* ============ WHAT THE ACCOUNT SAYS ============ */
/* TOLD: Acts 16:16-40, verse by verse, told by the narrator in paraphrase, each with its reference. None of it is put into a mouth, and
   none of it stands in quotation marks: a paraphrase is never presented as a quotation (CONTRIBUTING section 1). It says "we" and "us"
   in the first two, as Acts does, and "they" from the verse in which Paul and Silas are seized. */
const TOLD={
 v16:'on_our_way_to_the_place_acts_16_16',
 v17:'she_came_along_acts_16_17',
 v18:'this_went_on_for_many_acts_16_18',
 v19:'with_the_spirit_acts_16_19',
 v20:'they_brought_them_acts_16_20_21',
 v22:'whole_crowd_turned_on_the_two_together_acts_16_22',
 v23:'many_blows_had_acts_16_23_24',
 v25:'toward_midnight_paul_acts_16_25',
 v26:'all_at_once_the_earth_acts_16_26',
 v27:'jailer_started_out_of_his_sleep_acts_16_27',
 v28:'paul_shouted_to_him_acts_16_28',
 v29:'jailer_called_for_lights_acts_16_29',
 v30:'he_led_them_out_addressed_acts_16_30',
 v31:'their_answer_was_acts_16_31',
 v32:'two_made_the_word_acts_16_32',
 v33:'late_as_the_hour_acts_16_33',
 v34:'he_took_them_acts_16_34',
 v35:'at_daybreak_the_civil_acts_16_35',
 v36:'jailer_brought_the_message_acts_16_36',
 v37:'paul_answered_them_acts_16_37',
 v38:'constables_carried_his_answer_back_acts_16_38',
 v39:'they_came_themselves_acts_16_39',
 v40a:'leaving_the_prison_acts_16_40',
 v40b:'there_they_saw_acts_16_40'};
const tell=(k,ms)=>narr(TOLD[k],{dur:ms||Math.max(6500,2200+TOLD[k].length*62)});
/* PS: the psalm, as Paul has noted it on his tablets: four of its calls, and the answer that follows every one. A note in his own words,
   with its reference, and shown as that (gist: see shared/tablets.js). Acts does not say what the two men sang. */
const PS={c1:{ref:'psalm_136_1',gist:'jehovah_is_good_give_him_thanks',full:'jehovah_is_good_give_him_thanks_psalm_136_1'},
  c2:{ref:'psalm_136_23',gist:'he_did_not_forget_us_when_we',full:'he_did_not_forget_psalm_136_23'},
  c3:{ref:'psalm_136_24',gist:'again_and_again_he_saved',full:'again_and_again_psalm_136_24'},
  c4:{ref:'psalm_136_26',gist:'thank_the_god_of_heaven',full:'thank_the_god_of_heaven_psalm_136_26'},
  a:{ref:'psalm_136_1_26',gist:'there_is_no_end_to_his_loyal',full:'there_is_no_end_psalm_136_1_26'}},ORDER=['c1','c2','c3','c4'];
/* ============ HELPERS ============ */
const inHouse=()=>G.room==='lydia9',inRiv=()=>G.room==='river9',inCell=()=>G.room==='cell9',inGaol=()=>G.room==='gaol9',
  day=()=>!F.d1?1:!F.d2?2:3,sungN=()=>F.s3?3:F.s2?2:F.s1?1:0,allHere=()=>!!(F.c1&&F.c2&&F.c3),CHO='#f0e2b0';
/* think: Paul weighs what to do next. A choice that would not serve is set aside in thought, and never spoken. */
async function think(q,opts){let av=opts.slice();
  for(;;){await say(P,q,TH);const o=av[await choose(av.map(o=>o.q))];if(o.ok)return;await say(P,o.no,TH);av=av.filter(x=>x!==o)}}
/* pickLine: the player names a line of the psalm. want: the one that is right here; wrong(k): what is said to any other. All four are
   offered every time, mixed as every choice is (choose), so that the next line is found by knowing the psalm, not by its place. */
async function pickLine(q,want,wrong){const ks=ORDER;for(;;){await say(P,q,TH);const k=ks[await choose(ks.map(k=>PS[k].full))];if(k===want)return;await wrong(k)}}
/* strip: Paul and Silas without their cloaks, from the marketplace until Timothy brings them back */
function strip(on){P.look=on?LOOK.paul9b:LOOK.paul;P.wear=on?'b':'';SI.look=on?LOOK.silas9b:LOOK.silas9;SI.wear=on?'b':''}
/* come: a room is shown, with everyone in his place */
async function come(room,ms){place9(room);const a=PC();enterRoom(room,a.x,a.y,a.dir);codeBtn();await fade(0,ms||600)}

/* ============ LYDIA'S HOUSE, IN THE MORNING: a psalm that needs no scroll ============ */
/* The place of prayer has no chest for scrolls (Chapter Eight), and Philippi has no synagogue. What Lydia's household can keep of the
   Scriptures is what it can sing: so Paul teaches a psalm that is written as a call and an answer. Insight ("Music") says that much group
   singing in Israel appears to have been of that kind, and names Psalm 136. The lesson is invented. */
async function toRiver(){const me=PC();if(F.free)return leave();
  await say(me,me===P?'to_the_river_then_said':'to_the_river_then_i');
  await fade(1,500);playAs(P);F.went=1;await come('river9');return riverIntro()}
async function riverIntro(){if(G.metRiv||F.jail)return;G.metRiv=1;
  if(day()===1){await tell('v16');GI.talk=true;SFX.alert();await tell('v17');GI.talk=false;
    await say(TI,'who_is_she_paul');
    await say(LU,'a_servant_girl');
    await say(P,'every_word_that_she_cries_is_true',TH);
    await say(SI,'women_are_waiting_on_the_stones_paul')}
  codeBtn()}
/* ============ THE RIVER, ON THREE DAYS: the psalm that could not be finished ============ */
/* The girl followed Paul and the others (Acts 16:17), and went on doing so for many days (16:18). The player leads the psalm, and the cry breaks it off:
   then it has to be taken up again at the line that was broken. It is never sung to its end here. Nothing the player does ends the
   crying; the account does, in verse 18, and that is told. Paul speaks to the spirit, not to the girl. Nothing is shown when it leaves. */
const before=(k,want)=>ORDER.indexOf(k)<ORDER.indexOf(want);
const wrongNext=want=>k=>before(k,want)?say(PH,'we_have_sung_that_one_sir'):say(P,'not_yet_one',TH);
const wrongAgain=want=>k=>before(k,want)?say(EL,'that_one_we_sang_to_its_end'):say(P,'they_have_not_heard_that_line_yet',TH);
async function answerAll(o){await sung('H','a',null,PS.a.full,Object.assign({color:CHO},o))}
/* broken: the answer begins, and the cry cuts across it */
async function broken(){await answerAll({cut:1.7});SFX.alert();GI.talk=true;await narr('girl_cried_out_again_over_the_singing',{dur:5400});GI.talk=false}
async function cryAgain(){SFX.alert();GI.talk=true;await narr('again_she_cried_out_who',{dur:5600});GI.talk=false}
async function nextDay(text){await fade(1,700);await narr(text,{dur:5600});G.metRiv=1;place9('river9');enterRoom('river9',P.x,P.y,P.dir);await fade(0,700);SFX.alert();
  await narr('girl_was_on_the_road_again',{dur:5200})}
async function psalm(){const me=PC();if(me!==P)return say(LU,'psalm_is_pauls_to_give_out_i');
  const d=day();await walk(P,...spot(P,262,132));P.dir=1;AU.mood='song';
  if(d===1){
    await say(P,'lydia_phila_elpis_this_is');
    await say(EL,'one_answer_to_every_line');
    await pickLine('lines_are_on_my_tablets','c1',k=>say(P,k==='c4'?'no_that_is_how_it_ends':'that_comes_later',TH));
    await sung('P','c1',P,PS.c1.full);await answerAll();
    await say(PH,'again_sir');
    await pickLine('next_line','c2',wrongNext('c2'));
    await sung('P','c2',P,PS.c2.full);await broken();
    await say(PH,'i_have_lost_it_sir');
    await pickLine('where_do_i_take_it_up_again','c2',wrongAgain('c2'));
    await sung('P','c2',P,PS.c2.full);await answerAll();await cryAgain();
    await think('she_will_not_stop_while',[
      {q:'sing_louder_than_she_cries',no:'there_are_two_parties_shouting'},
      {q:'move_down_the_bank_out_of_her_hearing',no:'she_has_followed_us_from_the_gate'},
      {q:'come_back_tomorrow_and_go',ok:1}]);
    await say(P,'two_lines_and_the_answer');
    F.d1=1;await nextDay('she_followed_us_that_day')}
  else if(d===2){
    await say(P,'from_where_we_stopped');
    await say(PH,'two_lines_sir_and_the_answer');
    await pickLine('third_which','c3',wrongNext('c3'));
    await sung('P','c3',P,PS.c3.full);await broken();
    await say(EL,'every_day_sir');
    await pickLine('where_do_i_take_it_up_again','c3',wrongAgain('c3'));
    await sung('P','c3',P,PS.c3.full);await answerAll();await cryAgain();
    await say(LY,'people_ask_me_in_the_street');
    await say(P,'i_know_how_it_looks_lydia');
    F.d2=1;await nextDay('it_went_on_day_after_day')}
  else{
    await say(P,'one_line_is_left_and_then',{to:PH});
    await say(PH,'thanks_sir');
    await pickLine('last_q','c4',wrongNext('c4'));
    await sung('P','c4',P,PS.c4.full,{cut:1.5});SFX.alert();GI.talk=true;await narr('girl_cried_out_before_the_line',{dur:4400});GI.talk=false;
    return expel()}
  AU.mood=ROOMS.river9.mood;codeBtn()}
async function expel(){AU.mood='tense';P.dir=1;await wait(500);await tell('v18');GI.bow=true;AU.mood='song';
  await narr('it_was_quiet_beside_the_river',{dur:4200});
  await say(PH,'she_has_stopped');
  await say(EL,'listen_said');
  AU.mood='tense';await tell('v19');
  await Promise.all([walk(MA,P.x+26,P.y+1),walk(MB,SI.x+24,SI.y)]);MA.dir=MB.dir=-1;
  await say(MA,'our_girl');
  await say(MB,'to_the_magistrates_with_them',{to:MA});
  await fade(1,700);await narr('two_men_were_dragged_up_the_road',{dur:6500});
  return market()}
/* ============ THE MARKETPLACE: told, not played ============ */
/* The charge is told as the account tells it, in paraphrase (Acts 16:20, 21); what follows it is told in the dark (16:22-24), from the narrator's scroll, and nothing of it is
   shown. The account does not say whether the two spoke of being Romans in the uproar, and the game does not decide it. */
async function market(){G.st={k:0};G.scene=forumScene;AU.mood='tense';AU.amb={crowd:.8};await fade(0,700);await tell('v20');
  await fade(1,600);G.scene=dark;AU.amb={};await fade(0,300);await tell('v22');await tell('v23');await fade(1,500);
  F.jail=1;dealInv('cell9');drawInv();place9('cell9');G.scene=null;enterRoom('cell9',P.x,P.y,P.dir);await fade(0,900);
  await narr('door_shut_and_took_the_light',{dur:5000});
  await say(P,'silas_q',{to:SI});await say(SI,'here_said');codeBtn()}

/* ============ THE INNER PRISON: empty hands, and a song by heart ============ */
/* For eight chapters the player has had tools, tablets, feet and a room to look at. Here the garments were torn off, the feet are in the
   stocks, and there is no light: Bearing Thorough Witness (chapter 16, paragraph 11) says the two could no doubt hardly see each other.
   The room is its sounds, and every verb gives a true answer and gets nowhere, except Talk to: Silas is within reach. The psalm from
   the river is sung from memory. The Watchtower ("Sing to Jehovah!", 2010) notes that the two had no songbook. After each answer one
   sound in the dark falls silent, because the prisoners are listening (Acts 16:25). The song opens nothing: after the last answer the
   account takes its course, and the earthquake is told. Pray to Jehovah stays the hint, and changes nothing. */
async function silasTalk(){
  if(F.quake)return say(SI,allHere()?'they_are_all_here_paul':'beam_has_fallen_off_my_feet');
  if(F.voice)return nightSong();
  await say(P,'silas_how');
  await say(SI,'my_back_is_one_wound_and_they');
  await say(P,'same_said');
  await say(P,'pouch_awl_knife_and_thread');
  await say(SI,'did_they_take_what_was_on_them');
  await think('what_have_they_left_us',[
    {q:'nothing_at_all',no:'that_is_what_the_magistrates'},
    {q:'patience_until_the_morning',no:'we_shall_need_it'},
    {q:'what_we_know_by_heart_and_two',ok:1}]);
  await say(P,'they_did_not_brother');
  await say(SI,'begin_said');
  F.voice=1;SFX.good();codeBtn()}
async function nightSong(){const k=sungN()+1,want=ORDER[k-1];
  await pickLine(k===1?'from_the_beginning':'there_is',want,
    x=>ORDER.indexOf(x)<k-1?say(SI,'we_have_sung_that_one_brother'):say(P,k===1?'no_that':'not_yet_one',TH));
  await sung('P',want,P,PS[want].full,{rough:[.9,.45,.25,.1][k-1],v:[.75,.95,1,1][k-1]});
  if(k===1){await sung('S','a',SI,PS.a.full,{rough:.35,v:.9});await tell('v25')}
  else await sung('PS','a',SI,PS.a.full,{fourths:k===4});
  if(k<4){F['s'+k]=1;place9('cell9');await narr(['muttering_had_stopped','chain_was_still','nobody_coughed'][k-1],{dur:3600});codeBtn();return}
  await wait(1400);return quake()}
async function quake(){G.shake=performance.now();G.scene=shakeScene;AU.amb={};rumble();await tell('v26',9000);
  F.quake=1;place9('cell9');G.scene=null;enterRoom('cell9',P.x,P.y,P.dir);
  await say(SI,'beam_paul');
  await say(P,'door_every',TH);codeBtn()}
/* ============ AFTER THE EARTHQUAKE: all of us, counted ============ */
/* The door is open, and the jailer has drawn his sword (Acts 16:27). Paul wants to call out that all of them are there. He says nothing
   that he does not know to be true, so before he calls, the player listens for the men who listened to the psalm. There is no clock:
   the scene waits. Acts does not say how many prisoners there were, why none of them fled, or how Paul knew what the jailer was about
   to do; nobody here says why he has stayed. The staging is ours: the jailer stands in what light there is and looks into the dark. */
async function seeJailer(){if(G.sawJ)return;G.sawJ=1;await tell('v27')}
async function count(i){const a=PR[i];if(F['c'+(i+1)])return say(a,['here_i','still_here_singer','here_where'][i]);
  await say(P,['friend_q','you_with_the_chain','you_by_the_far_wall'][i]);
  await say(a,['here_the','here_singer','here_i_heard'][i]);
  if(i===1)await say(P,'it_was_his_psalm_that_you_heard');
  F['c'+(i+1)]=1;SFX.good();if(allHere())await say(P,'three_who_listened_and_silas_and_i',TH);codeBtn()}
async function doorway(){await seeJailer();
  await say(P,allHere()?'i_am_not_going_through_that_door':'door_is_open_and_the_outer',TH)}
async function callOut(){await seeJailer();
  if(!allHere())return say(P,'all_said',TH);
  P.dir=1;await tell('v28');SFX.good();return lights()}
/* ============ THE JAILER: lights, a question, and a night in his house (told, with a few lines) ============ */
/* No choice of the player's wins him, as none won Lydia. His question and the answer are told as the account tells them, in paraphrase (Acts 16:30, 31).
   The study note on 16:33 says the household was likely unfamiliar with basic Scriptural truths, and that the two no doubt spoke
   extensively: the game shows them speaking, and does not invent the talk. The baptism is told and not drawn. Those of his house are
   seen, and nobody says who they are. */
async function lights(){await fade(1,500);G.lit9=1;place(JA,'cell9',228,113,-1);enterRoom('cell9',P.x,P.y,P.dir);AU.amb={drip9:.4};await fade(0,700);
  await walk(JA,P.x-28,P.y+3);JA.dir=1;await tell('v29');JA.bow=true;await wait(900);
  await say(JA,'all_here');
  await fade(1,700);JA.bow=false;G.lit9=0;place9('gaol9');place(JA,'gaol9',196,124,-1);enterRoom('gaol9',P.x,P.y,P.dir);AU.mood='night';await fade(0,700);
  await tell('v30');await tell('v31');
  await say(JA,'say_it_in_my_house');
  await fade(1,600);G.st={k:0};G.scene=jailerScene;AU.amb={fire:.25};await fade(0,700);
  await tell('v32');
  await say(JA,'i_have_kept_that_door_for_eleven');
  await say(P,'hear_it_now_from_the_beginning');
  await narr('they_spoke_for_a_long_time',{dur:6200});
  G.st.k=1;await tell('v33');
  await say(JA,'i_shut_the_stocks_on_these_feet');
  G.st.k=2;await tell('v34');
  await fade(1,700);F.saved=1;G.scene=null;await come('gaol9',700);
  await narr('it_was_the_last_hour_of_the_night',{dur:4400});
  await say(JA,'stay_in_my_house_until');
  await say(P,'he_was_ordered_to_guard_us_securely',TH);codeBtn()}
/* ============ BEFORE DAY: back in ============ */
/* Acts 16:36 and 16:40 have the two in the prison in the morning, and do not say how they came there after the night in the jailer's
   house. Here they walk back in themselves, so that the jailer has his prisoners when the constables come. It is one step, and invented. */
async function backIn(){
  if(F.back)return say(P,'we_came_up_out_of_there');
  await say(P,'we_go_back_in_brother',{to:JA});
  await say(JA,'back_into');
  await say(P,'god_opened_them');
  await say(JA,'i_will_not_shut_the_stocks');
  await say(SI,'nobody_has_asked_you_to_brother');
  await fade(1,800);await narr('before_it_was_light_the_two',{dur:6200});
  F.back=1;await come('gaol9',800);return morning()}
/* ============ THE MORNING: what a Roman may ask ============ */
/* Paul's answer is in the account (Acts 16:37), and it is told. The player's part is before it and after it. Before: a brother wishes
   them peace, and the door is open. After: the magistrates stand in the court, afraid, because Roman law did not allow what they did
   (study note on 16:37), and they would give a great deal to have it forgotten. Paul takes one thing, the one his answer named. Bearing
   Thorough Witness (chapter 16, paragraphs 17, 18) gives the reason: with the magistrates on public record as the ones who acted
   unlawfully, they might be held back from mistreating the brothers who stayed. The offers, and the walk across the marketplace, are invented. */
async function morning(){if(G.morn)return;G.morn=1;AU.mood='tense';
  await tell('v35');
  await say(CO,'jailer_said',{to:JA});
  await tell('v36');
  await say(JA,'you_hear_it_brothers');codeBtn()}
async function answer(){if(F.open)return offers();
  await think('door_is_open_and_a_brother',[
    {q:'we_go_and_thank_god_for_it',no:'yesterday_the_whole_marketplace'},
    {q:'we_go_and_i_take_this_to_rome',no:'i_did_not_come_to_macedonia'},
    {q:'we_stay_here_until_they_come_themselves',ok:1}]);
  await tell('v37');
  await say(CO,'romans');await say(SI,'both_of_us',{to:CO});
  await say(CO,'i_shall_tell_them_what_you_say');
  await fade(1,600);await tell('v38');F.open=1;await come('gaol9',700);
  await say(MG,'there_has_been_a_mistake');codeBtn()}
async function offers(){
  await think('they_are_afraid_and_they',[
    {q:'silver_for_the_garments',no:'they_would_pay_gladly_and_say'},
    {q:'rods_for_the_men_who_accused_us',no:'those_two_lost_their_trade_yesterday'},
    {q:'their_leave_to_stay_and_to_preach',no:'they_would_promise_it_this_morning'},
    {q:'that_they_lead_us_out_themselves',ok:1}]);
  await say(P,'you_had_us_beaten_before');
  await say(MG,'that_is_all_that_you_ask');
  await say(P,'that_is_all_said');
  await say(M2,'it_shall_be_done');
  await say(P,'we_shall_go');
  await fade(1,700);G.st={k:1,t0:performance.now()};G.scene=forumScene;AU.mood='hope';AU.amb={crowd:.5,birds:.3};await fade(0,700);
  await tell('v39');
  await narr('they_crossed_the_marketplace',{dur:7000});
  await fade(1,700);F.free=1;dealInv('lydia9');G.scene=null;place9('lydia9');strip(true);G.inv.length=0;drawInv();enterRoom('lydia9',P.x,P.y,P.dir);codeBtn();await fade(0,700);return home()}
async function outer(){const me=P;
  if(!F.back){await say(me,'street_and_nobody_in_it',TH);
    return say(me,'at_daybreak_this_man_would',TH)}
  return answer()}
/* ============ LYDIA'S HOUSE: so that nobody has to ask for Paul ============ */
/* The two saw the brothers, encouraged them, and left (Acts 16:40). Luke stays: the study note on 16:33 says he was perhaps
   able to remain and give the new ones extra help. So the last thing to do is to leave nothing in Philippi that waits for Paul. Each of
   his cares is handed to one who stays, and to the right one. Bearing Thorough Witness (the box on Lydia) says the account suggests
   that her home became a meeting place. Acts does not say who the brothers in her house were: the jailer's household is spoken of here,
   and not shown. That Timothy gathered up what was torn off them is invented. */
async function home(){if(G.metHome)return;G.metHome=1;
  await tell('v40a');
  await say(LY,'paul_silas');
  await say(TI,'i_gathered_these_up_from_the_paving');
  strip(false);dealInv('lydia9');drawInv();SFX.pick();
  await say(LK,'let_me_see_your_backs');
  await say(P,'jailer_did_luke',{to:LK});
  await say(LY,'the_jailer');
  await say(SI,'it_is_a_long_story_sister',{to:LY});
  await say(P,'nothing_in_philippi_must',TH);codeBtn()}
const CARES=[{id:'k1',who:'luke9',q:'there_is_a_household_by_the_prison'},
  {id:'k2',who:'lydia9',q:'where_do_the_brothers_of_philippi'},
  {id:'k3',who:'phila9',q:'who_begins_the_psalm_by_the_river'}];
const YES={
  k1:async()=>{await say(LK,'i_shall_go_to_them_today');
    await say(P,'i_had_hoped_that_you_would')},
  k2:async()=>{await say(LY,'here_where_else');
    await say(P,'there_are');await say(LY,'they_shall_see_it')},
  k3:async()=>{await say(PH,'i_sir');
    await say(P,'found_it_again_every_day');await say(PH,'i_shall_begin_it_sir')}};
const NO={
  luke9:{k2:'i_am_a_guest_under_this_roof',k3:'i_shall_sing_the_answer'},
  lydia9:{k1:'i_shall_send_them_bread',
    k3:'i_can_keep_the_prices_of_nine'},
  phila9:{k1:'to_the_prison_sir',k2:'that_is_for_lydia_to_say_sir'}};
async function care(a){const open=CARES.filter(c=>!F[c.id]);if(!open.length)return say(a,'go_in_peace_paul');
  const i=await choose(open.map(c=>c.q).concat('nothing_more_for_now'),{keep:1});if(i===open.length)return;const c=open[i];await say(P,c.q);
  if(c.who!==a.id)return say(a,NO[a.id][c.id]);
  await YES[c.id]();F[c.id]=1;SFX.good();if(CARES.every(c=>F[c.id]))return done();codeBtn()}
async function leave(){const me=P;if(!CARES.every(c=>F[c.id]))return say(me,'not_yet_i');return done()}
async function done(){await say(P,'nobody_in_this_house_has',TH);
  await say(P,'phila_one');
  AU.mood='song';for(const k of['c1','c4']){await sung('W',k,PH,PS[k].full);await sung('ALL','a',null,PS.a.full,{color:CHO,fourths:k==='c4'})}
  await narr('it_was_sung_to_its_end',{dur:6600});
  await tell('v40b');return finale()}
/* The chapter closes on the map, with Philippi lit: nobody has travelled in it. The road so far is shown, and none of it draws itself. */
const ROAD9=[['iconium','antiochp'],['antiochp','westroad'],['westroad','bithynianroad'],['bithynianroad','troas'],['troas','samothrace','sea'],['samothrace','neapolis','sea'],['neapolis','philippi']];
async function finale(){AU.mood='hope';
  await narr('luke_did_not_leave_with_them_philippians_1_7_30',{dur:16500});
  try{await need('map');await fade(1,450);await SHARED.map.journey(ROAD9,{instant:1,view:'aegean'});await fade(0,550);SHARED.map.sting();
    await narr('from_philippi_they_acts_17_1',{dur:8500})}catch(e){console.error(e)}
  endScreen({title:'midnight_in_philippi_2',text:'paul_sang_where_nobody',
    based:'based_on_acts_16_16_40',
    go:'click_to_continue_to_chapter_ten',code:['chapter_ten_code_code',codeOf(10,0)]});
  await wait(1500);ov.onclick=()=>startChapter(10);await new Promise(()=>{})}
/* ============ ROOMS ============ */
ROOMS.lydia9={space:1.2,walk:[16,304,110,136],get mood(){return F.free?'hope':'calm'},amb:{crowd:.15,birds:.3},hs:[
  {name:'door_to_the_street',x:17,y:47,w:28,h:57,wx:44,wy:114,dir:-1,exit:toRiver,
    look:()=>say(P,F.free?'door_and_the_street_beyond_it':'street_and_the_morning'),
    as:{luke:{look:'the_street'}}},
  {name:'shelves_of_purple',x:84,y:32,w:114,h:40,wx:150,wy:112,look:'purple_crimson_and_violet_said',
    pickup:'one_of_those_bolts_is_worth',
    useWith:it=>it==='knife'?say(P,'my_knife_cuts_goat_hair_and_leather'):false,as:{luke:{look:'purple_she'}}},
  {name:'table',x:110,y:84,w:96,h:22,wx:158,wy:112,look:()=>say(P,F.free?'bread_and_a_place_laid':'her_table'),
    use:()=>say(P,F.free?'there_is_no_time_to_sit':'we_have_eaten_and_well'),pickup:'i_am_her_guest',
    as:{luke:{look:'full_table_every_day'}}},
  {name:'stair',x:262,y:40,w:58,h:64,wx:270,wy:114,dir:1,look:'stair_to_the_upper_room',
    use:()=>say(P,F.free?'not_today_we':'not_now_said'),as:{luke:{look:'stair_to_our_room',use:'not_now_paul_is'}}},
  {name:'water_jar',x:52,y:88,w:16,h:19,wx:76,wy:113,dir:-1,look:'great_jar_of_water_drawn',use:'i_drink_it_is_cold',pickup:'it_would_take_two_men_and_it',
    as:{luke:{look:'fresh_water_drawn_every_morning',use:'i_drink_and_i_wash_my_hands_said'}}},
  {name:'lamp_niche',x:220,y:38,w:18,h:20,wx:228,wy:112,look:'lamp_in_its_niche_not_lit',pickup:'it_belongs_to_its_niche',
    as:{luke:{look:'lamp_for_the_evenings'}}}]};
const toCity=async()=>{const me=PC();await say(me,me===P?'not_while_they_are_sitting':'paul_is_not_leaving_and_neither')};
ROOMS.river9={space:.6,walk:[16,464,116,138],mood:'rest',amb:{fountain:.5,birds:.7,leaves:.6,wind:.15},hs:[
  {name:'mountain',x:0,y:40,w:300,h:22,wx:230,look:'the_long_blue_mountain_across_the_plain',as:{luke:{look:'mountains_of_macedonia'}}},
  {name:'city',x:376,y:42,w:92,h:22,wx:420,look:'philippi_on_its_hill_said',as:{luke:{look:'philippi_said'}}},
  {name:'river',x:150,y:88,w:180,h:20,wx:226,wy:118,look:'clear_water_quick_over_its_stones',
    use:'i_wash_my_hands_and_my_face',pickup:'river_belongs_to_its_banks',as:{luke:{look:'clear_water_and_quick_said',use:'i_wash_my_hands_in_it'}}},
  {name:'flat_stones',x:186,y:112,w:138,h:16,wx:254,wy:130,def:'use',look:'the_stones_where_they_sit',use:psalm,
    as:{luke:{look:'stones_of_the_place_of_prayer',use:psalm}}},
  {name:'plane_tree',x:340,y:30,w:66,h:84,wx:372,wy:120,look:'the_plane_tree',as:{luke:{look:'shade_and_running_water_said'}}},
  {name:'road_to_the_gate',x:452,y:86,w:28,h:44,wx:458,wy:132,dir:1,look:'road_back_up_to_the_west_gate',exit:toCity,as:{luke:{look:'road_to_the_gate_and_that_girl'}}}]};
/* The inner prison. Until the earthquake it is heard and not seen: its hotspots are sounds, and their names are all there is on the screen.
   Paul cannot take a step. cellNo: what each verb comes to in the dark, where a hotspot says nothing of its own. */
const cellNo={pickup:'there_is_nothing_here_that_is_mine',use:'i_can_reach_nothing_here_but_silas',open:'there_is_nothing_here_that_i',talk:'dark_gives_no_answer',give:'i_have_nothing_left_to_give'};
ROOMS.cell9={space:1.5,get walk(){return F.quake?[36,296,112,136]:[150,150,131,131]},mood:'cell',heard:()=>!F.quake,
  amb:()=>F.quake?{drip9:.5}:{drip9:.7,mutter9:F.s1?0:.7,chain9:F.s2?0:.6,cough9:F.s3?0:.6,crickets:F.s3?.3:0},hs:[
  Object.assign({name:'darkness',x:0,y:0,w:320,h:144,wx:150,wy:131,vis:()=>!F.quake,look:'i_cannot_see_my_own_hands'},cellNo,{use:'stocks_hold_my_feet'}),
  Object.assign({name:'dripping_water',x:8,y:24,w:44,h:30,wx:150,wy:131,vis:()=>!F.quake,look:'water_dripping_somewhere_to_my_left'},cellNo,{use:'i_cannot_reach_it'}),
  Object.assign({name:'door',x:196,y:44,w:40,h:62,wx:150,wy:131,vis:()=>!F.quake,look:'hair_of_gray_under_the_door'},cellNo,{open:'it_is_barred_on_the_far',use:'i_cannot_reach_it_said'}),
  Object.assign({name:'stocks',x:118,y:126,w:92,h:12,wx:150,wy:131,vis:()=>!F.quake,look:'beam_of_timber_shut_over_my_ankles'},cellNo,
    {use:'shut_with_iron',open:'shut_with_iron',pickup:'it_holds_me'}),
  /* the hidden treasure of the chapter (CHAP[9].treasure): once all three men have fallen silent, a cricket can be heard in the wall. It is a
     sound only, like everything else in here, and finding it changes nothing in the story */
  Object.assign({name:'chirping',x:250,y:14,w:50,h:20,wx:150,wy:131,vis:()=>!!F.s3&&!F.quake},cellNo,
    {look:async()=>{await say(P,'cricket_somewhere_in_the_wall');treasure()}}),
  {name:'fallen_stocks',x:118,y:122,w:106,h:14,wx:150,wy:136,vis:()=>!!F.quake,look:'upper_beam_has_slid_off_the_lower',use:'i_have_had_enough_of_it',pickup:'let_it_lie'},
  {name:'doorway',x:196,y:44,w:40,h:62,wx:186,wy:116,dir:1,vis:()=>!!F.quake,exit:doorway,look:()=>doorway()},
  {name:'jailer',x:206,y:54,w:20,h:52,wx:186,wy:116,dir:1,def:'talk',vis:()=>!!F.quake,talk:callOut,use:callOut,
    look:async()=>{await seeJailer();await say(P,'jailer_against_the_gray',TH)},pickup:'that_would_hardly_be_loving'}]};
PR.forEach((a,i)=>{a.hs=Object.assign({get name(){return F.quake?['man_who_muttered','man_with_the_chain','man_who_coughed'][i]:['muttering','chain','cough'][i]},actor:a},cellNo,{
  look:()=>say(P,F.quake?['shape_against_the_wall','shape_by_the_ring_in_the_wall','shape_in_the_far_corner'][i]
    :['man_muttering_low_in_a_tongue','iron_on_stone_each_time_he_moves','cough_from_the_far_wall'][i]),
  talk:async()=>{if(F.quake)return count(i);await say(P,['friend_who','peace_to_you_friend','friend_is_there_water_near_you'][i]);
    await narr(['muttering_stopped_for_a_breath','chain_was_still_for_a_moment','cough_came_again'][i],{dur:4200})}})});
ROOMS.gaol9={space:1.1,walk:[16,304,112,136],get mood(){return F.back?'tense':'night'},amb:()=>F.back?{birds:.5,crowd:.15}:{crickets:.4,fire:.15},hs:[
  {name:'outer_door',x:18,y:48,w:40,h:58,wx:66,wy:116,dir:-1,exit:outer,
    look:()=>say(P,F.back?'outer_door_open_to_the_morning':'the_outer_door')},
  {name:'cells',x:68,y:58,w:70,h:48,wx:104,wy:113,look:()=>say(P,F.back?'cells_round_the_court':'the_cells_round_the_court'),open:'they_are_not_mine_to_open'},
  {name:'water_trough',x:143,y:93,w:40,h:14,wx:162,wy:113,look:'trough_of_stone_and_good',use:'i_drink_and_it_is_cold',pickup:'it_is_stone_and_it_is_his'},
  {name:'door_of_the_inner_prison',x:190,y:58,w:48,h:48,wx:214,wy:113,exit:backIn,
    look:()=>say(P,F.back?'way_down_to_the_inner_prison':'three_steps_down_and_black')},
  {name:'jailers_house',x:246,y:30,w:74,h:76,wx:286,wy:113,dir:1,look:()=>say(P,F.back?'his_house':'his_house_said'),
    use:()=>say(P,F.back?'not_now_the':'we_have_sat_at_his_table'),
    open:()=>say(P,F.back?'not_now_the':'we_have_sat_at_his_table')}]};

/* ============ PEOPLE ============ */
const todo=()=>inHouse()?(F.free?'we_have_an_hour_paul':'women_will_be_at_the_river')
  :inRiv()?'they_are_waiting_for_the_psalm_paul'
  :!F.back?'he_answers_for_us_with_his_life'
  :F.open?'they_are_afraid_of_us_paul':'he_means_it_kindly';
const SILAS9={name:'Silas',actor:SI,
  look:()=>say(P,inCell()?(F.quake?'silas_on_his_feet':'silas_i')
    :inGaol()?'silas_he_was':inRiv()?'silas_he_sings':'silas_he_walked_from'),
  show:{awl:'your_awl_it',tablets:'read_me_one_tonight','*':'keep_it_brother_said'},
  talk:async()=>{if(inCell())return silasTalk();if(inGaol()||F.free)return say(SI,todo());return talkTree([
    {q:'what_is_still_to_do_here',a:()=>say(SI,todo())},
    {q:'what_do_you_make_of_the_girl',if:()=>inRiv(),once:1,a:()=>say(SI,'that_she_says_nothing_false')},
    {q:'stay_close_brother',bye:1}])},
  as:{luke:{look:'silas_of_jerusalem',talk:()=>say(SI,'you_watch_everything_luke'),show:{'*':'keep_it_brother_2'}}}};
const TIM9={name:'Timothy',actor:TI,
  look:()=>say(P,F.free?'timothy_he_went':inRiv()?'timothy_he_knew':'timothy_some_months'),
  show:{tablets:'are_there_new_ones_paul',awl:'awl_i','*':'shall_i_carry_that_for_you_paul'},
  talk:async()=>{if(F.free)return say(TI,'luke_went_to_the_prison');
    return talkTree([{q:'what_is_still_to_do_here',a:()=>say(TI,todo())},
      {q:'your_grandmother_sang_you_this_psalm',once:1,a:()=>say(TI,'every_evening_paul')},
      {q:'stay_close_timothy',bye:1}])},
  as:{luke:{look:'timothy_young_and_quick_said',talk:()=>say(TI,'do_you_know_the_psalm_brother'),show:{'*':'shall_i_carry_that_for_you_brother'}}}};
/* Luke when he is the one being played: his answers where the level wrote nothing for him */
const LUK9={noCraft:'that_is_the_tentmakers_craft_not_mine_2',
  def:{look:'i_see_nothing_there_that_needs',pickup:h=>h.actor?'i_would_not_dream_of_it':'it_is_not_mine_to_take_said',
    use:'that_is_not_for_me_to_do',open:'it_does_not_open',talk:'i_would_get_no_answer',give:'first_i_should_choose_something_to_give'}};
const LUKE9={name:'Luke',actor:LU,
  look:()=>say(P,inRiv()?'luke_he_has':'luke_in_a'),
  show:{awl:'awl_in',tablets:'you_keep_notes','*':'keep_it_brother_2'},
  talk:()=>talkTree([{q:'what_is_still_to_do_here',a:()=>say(LU,todo())},
    {q:'what_do_you_see_in_the_girl',if:()=>inRiv(),once:1,a:()=>say(LU,'child_who_is_not_her_own')},
    {q:'stay_close_luke',bye:1}])};
/* Paul, as Luke sees him and talks to him */
const PAUL9={name:'Paul',actor:P,as:{luke:{
  look:()=>say(LU,inRiv()?'paul_he_gives':'paul_he_has_a'),
  talk:()=>say(P,inRiv()?'sing_the_answer_with_them_luke':'come_down_to_the_river'),show:{'*':'keep_it_by_you_luke'}}}};
/* Luke at the end, in Lydia's house: met, and not played. The account stops saying "we" where the two are seized, and he stays in Philippi. */
LK.hs={name:'Luke',actor:LK,look:'luke_he_has_looked',
  show:{awl:'you_have_it_back',tablets:'you_keep_notes_said','*':'keep_it_brother_2'},talk:()=>care(LK)};
const atRiver=A=>async()=>{if(PC()!==P)return say(A,A===LY?'sit_with_us_luke':A===PH?'do_you_sing_sir':'i_have_prayed_on_this_bank');return psalm()};
LY.hs={name:'Lydia',actor:LY,
  look:()=>say(P,F.free?'lydia_said':inRiv()?'lydia_on_the_stones_with_her_household':'lydia_a'),
  show:{tablets:'is_the_psalm_on_them_paul','*':'keep_it_paul'},
  talk:async()=>{if(F.free)return care(LY);if(inRiv())return atRiver(LY)();return talkTree([
    {q:'what_do_they_still_lack_lydia',once:1,a:()=>say(LY,'everything_that_is_written_paul')},
    {q:'who_is_the_girl_on_the_road',if:()=>!!F.went,once:1,a:()=>say(LY,'everybody_in_philippi_knows_her_her_masters')},
    {q:'we_are_going_out_to_the_river',bye:1}])},
  as:{luke:{look:'lydia_she',talk:atRiver(LY),show:{'*':'keep_it_luke'}}}};
PH.hs={name:'Phila',actor:PH,look:()=>say(P,F.free?'phila_she':'phila_she_loses'),
  show:{tablets:'writing_none_of','*':'keep_it_sir_said'},talk:async()=>{if(F.free)return care(PH);return atRiver(PH)()},
  as:{luke:{look:'phila_she_sings',talk:atRiver(PH),show:{'*':'keep_it_sir_said'}}}};
EL.hs={name:'Elpis',actor:EL,look:()=>say(P,F.free?'elpis_she':'elpis_the_oldest_of_them'),
  show:{tablets:'my_eyes_are_past_it_sir_said','*':'keep_it_sir_said'},
  talk:async()=>{if(F.free)return say(EL,'phila_sang_your_psalm_at_the_loom');return atRiver(EL)()},
  as:{luke:{look:'an_old_woman_straight_in_the_back',talk:atRiver(EL),show:{'*':'keep_it_sir_said'}}}};
/* the servant girl and her masters. She is a servant girl like any other: nothing marks the spirit, and nothing is seen when it leaves. */
GI.hs={name:'servant_girl',actor:GI,look:'servant_girl_hardly_more_than_a_child',
  talk:()=>say(P,'it_is_not_the_girl_who',TH),use:()=>say(P,'she_is_not_a_thing_to_be',TH),
  show:{'*':()=>say(P,'she_would_not_see_it',TH)},
  as:{luke:{look:'girl_of_twelve_or_thirteen',talk:()=>say(LU,'she_does_not_hear_me'),show:{'*':()=>say(LU,'she_does_not_see_it')}}}};
const masters=async()=>{await say(MA,'word_with_the_girl_stranger');
  await say(PC(),PC()===P?'they_sell_what_she_says':'they_take_silver_for_her_and_the_people',PC()===P?TH:{})};
MA.hs={name:'master_of_the_girl',actor:MA,look:'one_of_her_masters',talk:masters,show:{'*':'keep_it_i_sell'},
  as:{luke:{look:'one_of_her_masters_said',talk:masters,show:{'*':'keep_it_physician'}}}};
MB.hs={name:'older_master',actor:MB,look:'other_of_her_masters',talk:masters,show:{'*':'keep_it_2'},
  as:{luke:{look:'her_other_master',talk:masters,show:{'*':'keep_it_2'}}}};
/* the jailer, the constables and the magistrates */
JA.hs={name:'jailer',actor:JA,look:()=>say(P,F.back?'jailer_he':'jailer_yesterday'),
  show:{'*':'you_have_nothing_to_give_me_brother'},
  talk:async()=>{if(F.back)return answer();return talkTree([
    {q:'what_will_you_tell_the_magistrates',once:1,a:()=>say(JA,'what_happened_that_the_earth')},
    {q:'rest_brother_said',bye:1}])}};
const carry=()=>F.open?say(CO,'they_are_here_themselves_as_you_asked'):answer();
CO.hs={name:'constable',actor:CO,look:'constable_of_the_magistrates',talk:carry,show:{'*':'i_carry_what_i_am_given'}};
C2.hs={name:'bearded_constable',actor:C2,look:'other_constable',talk:carry,show:{'*':'i_carry_what_i_am_given'}};
MG.hs={name:'magistrate',actor:MG,look:'one_of_the_civil_magistrates_of_philippi',talk:offers,show:{'*':'whatever_that_is_it_shall'}};
M2.hs={name:'younger_magistrate',actor:M2,look:'other_magistrate',talk:offers,show:{'*':'whatever_that_is_it_shall'}};
/* how Luke describes the tools of the tentmaker's trade (set again whenever this chapter begins: see setup9) */
const BY9={awl:'tentmakers_awl_it_is',thread:'waxed_thread_i',
  knife:'knife_for_cloth_and_leather_said',tablets:'his_wax_tablets_names_tasks'};

/* ============ WAX TABLETS: people met, tasks still open, and the psalm (shown by shared/tablets.js) ============ */
const cared=()=>CARES.every(c=>F[c.id]);
const TABLETS={
  people:[
    {name:'Silas',note:'a_prophet_and_a_leading_man'},
    {name:'Timothy',note:'the_son_of_eunice_of_lystra'},
    {name:'Luke',note:()=>F.free?'a_physician_and_a_brother':'physician_and_a_brother_said'},
    {name:'Lydia',note:'a_seller_of_purple_from_thyatira'},
    {name:'Phila',note:'one_of_the_women_who_pray'},
    {name:'Elpis',note:'oldest_of_the_women_beside_the_river'},
    {name:'servant_girl_2',note:'she_follows_us_acts_16_16',if:()=>!!F.went&&!F.jail},
    {name:'her_masters',note:'two_men_of_the_city_who',if:()=>!!F.went&&!F.jail},
    {name:'Jailer',note:'yesterday_he_shut_the_stocks_on_us',if:()=>!!F.free}],
  tasks:[
    {t:'go_out_to_the_river_a_psalm',if:()=>inHouse()&&!F.free},
    {t:'teach_the_women_the_psalm',if:()=>inRiv()&&day()===1},
    {t:'go_on_with_the_psalm_the_third',if:()=>inRiv()&&day()===2},
    {t:'give_them_the_last_line',if:()=>inRiv()&&day()===3},
    {t:'household_by_the_prison',if:()=>!!F.free&&!F.k1},
    {t:'where_do_the_brothers_meet',if:()=>!!F.free&&!F.k2},
    {t:'who_begins_the_psalm_by_the_river',if:()=>!!F.free&&!F.k3},
    {t:'leave_the_city_as_we_were_asked',if:()=>!!F.free&&cared()}],
  scripture:ORDER.concat('a').map(k=>({ref:PS[k].ref,gist:PS[k].gist}))};

/* ============ PLACING THE CAST, SETUP ============ */
const ENT={lydia9:[150,126,1],river9:[262,132,1],cell9:[150,131,1],gaol9:[150,124,1]};
function place9(room){for(const a of[SI,TI,LU,LK,LY,PH,EL,GI,MA,MB,JA,MG,M2,CO,C2,...PR]){a.room=null;a.bow=false;a.talk=false}P.bow=false;strip(!!F.jail&&!F.free);
  if(room==='lydia9'){
    if(!F.free){place(P,room,150,126,1);place(LY,room,196,120,-1);place(SI,room,112,123,1);place(TI,room,238,128,-1);place(LU,room,84,131,1)}
    else{place(P,room,120,127,1);place(SI,room,92,131,1);place(TI,room,62,124,1);place(LY,room,196,120,-1);place(LK,room,160,132,-1);place(PH,room,232,124,-1);place(EL,room,264,130,-1)}}
  else if(room==='river9'){place(P,room,262,132,1);place(SI,room,298,136,-1);place(TI,room,176,133,1);place(LU,room,350,134,-1);
    place(LY,room,236,121,1);place(PH,room,204,124,1);place(EL,room,286,123,-1);place(GI,room,392,126,-1);place(MA,room,416,130,-1);place(MB,room,440,122,-1)}
  else if(room==='cell9'){place(P,room,150,131,1);place(SI,room,178,132,-1);
    [[40,120,1],[262,121,-1],[92,113,1]].forEach(([x,y,d],i)=>{if(F.quake||!F['s'+(i+1)])place(PR[i],room,x,y,d)})}
  else if(room==='gaol9'){
    if(!F.back){place(P,room,150,124,1);place(SI,room,122,128,1);place(JA,room,236,122,-1)}
    /* when the magistrates have come, the court makes room for them: whoever talks with one of them stands beside him, and nobody behind */
    else if(!F.open){place(P,room,196,122,-1);place(SI,room,224,127,-1);place(JA,room,150,125,-1);place(CO,room,74,120,1);place(C2,room,50,127,1)}
    else{place(P,room,196,122,-1);place(SI,room,224,127,-1);place(JA,room,170,125,-1);place(CO,room,62,120,1);place(C2,room,40,127,1);place(MG,room,104,122,1);place(M2,room,84,128,1)}}
  swapBtn()}
function setup9(){SI.hs=SILAS9;TI.hs=TIM9;LU.hs=LUKE9;P.hs=PAUL9;P.called='Paul';Object.assign(LU,LUK9);LU.speed=0;LU.free=false;for(const id in BY9)(ITEMS[id].by=ITEMS[id].by||{}).luke=BY9[id];
  G.metRiv=G.metHome=G.sawJ=G.morn=G.lit9=0;G.st=null;place9('lydia9');G.inv=['awl','thread','knife','tablets'];G.invs={paul:G.inv,luke:[]};drawInv()}

/* ============ SCENES ============ */
/* What is told and not shown is told in the dark (the engine's dark scene), and read from the narrator's scroll. */
const dark=DARK;
/* The earthquake: nothing is seen but the dark shaking, and dust coming down in it. No light, no figure. */
function shakeScene(g,t){const s=(t-G.shake)/1000,a=Math.max(0,Math.min(1,s/1.2))*Math.max(0,1-Math.max(0,s-5.5)/2.5),dx=(Math.random()-.5)*5*a,dy=(Math.random()-.5)*3*a;
  dark(g);g.save();g.translate(dx,dy);R(g,196,104.6,40,1.4,'#2a2e44');
  for(let i=0;i<46;i++){const x=(i*71)%320,k=((t/700+i*.137)%1);R(g,x+Math.sin(i+t/300)*2,k*150-4,.5,2+i%3,`rgba(120,116,110,${.3*a})`)}g.restore()}
/* The marketplace. k 0: the charge before the magistrates. k 1: the morning after, when they are led out across it. */
function forumScene(g,t){backdrop(g,'forum9');const k=G.st&&G.st.k||0,talk=Math.floor(t/600)%2;
  if(!k){cast(g,[['mag91',116,80,1],['mag92',192,80,-1],['lic91',84,108,1],['lic92',228,108,-1],['master91',112,121,1,{ges:talk}],['master92',88,127,1],['paul',160,119,-1],['silas9',186,123,-1],
      ['cr91',262,114,-1],['cr92',286,121,-1],['cr93',246,129,-1],['cr94',304,131,-1],['cr95',34,118,1],['cr93',56,133,1],['cr92',14,128,1]]);
    rods(g,84-3.4,108-29,-1);rods(g,228+3.4,108-29,1)}
  else{const s=Math.min(1,(performance.now()-G.st.t0)/9000),x=96+s*70,W=id=>({fr:s<1?walkFr(LOOK[id],s*70,70/9):0});   /* seventy room pixels in nine seconds: a slow walk, every foot where it is set down */
    cast(g,[['cr91',40,112,1],['cr92',64,116,1],['cr95',250,113,-1],['cr93',276,117,-1],['cr94',300,112,-1],['cr92',18,120,1],
      ['lic91',x+74,126,1,W('lic91')],['mag91',x+34,123,1,W('mag91')],['paul9b',x,127,1,W('paul9b')],['silas9b',x-26,123,1,W('silas9b')],['mag92',x-56,128,1,W('mag92')]]);
    rods(g,x+74-3.4,126-29,-1)}}
/* The jailer's house. k 0: the word is spoken to all who are in it. k 1: he washes their wounds. k 2: the table. */
function jailerScene(g,t){backdrop(g,'jailer9');ART.jailer9.draw(g,t);const k=G.st&&G.st.k||0,talk=Math.floor(t/700)%2,L='#eac8a0';
  if(k===0)cast(g,[['silas9b',70,129,1],['paul9b',100,124,1,{ges:talk}],['jailer9',176,125,-1],['jw9',206,121,-1],['jy9',230,128,-1],['jo9',254,123,-1]],L);
  else if(k===1){cast(g,[['paul9b',112,125,1,{bow:1}],['jailer9',88,128,1,{bow:1}],['silas9b',150,130,-1],['jw9',206,121,-1],['jy9',230,128,-1],['jo9',254,123,-1]],L);
    vessel(g,74,132,5,4,'#b06a3a','bowl');R(g,70.4,128.6,7.2,.8,'#8ab4cc')}
  else cast(g,[['jw9',112,118,1],['jy9',88,126,1],['paul9b',146,128,1],['silas9b',196,129,-1],['jailer9',228,123,-1,{ges:talk}],['jo9',258,128,-1]],L)}
async function start9(){ov.onclick=null;ov.className='';audioInit();SFX.good();if(!G.started)G.started=performance.now();
  await cut(async()=>{await fade(1,500);setChapter(9);G.end={};G.scene=null;enterRoom('lydia9',...ENT.lydia9);codeBtn();await fade(0,600);
    await narr('about_50_c_e',{dur:9500});
    await say(LY,'paul_phila_asked_me_last');
    await say(P,'you_shall_have_something');
    await say(TI,'one_that_my_grandmother_sings');
    await say(P,'that_one');codeBtn()},true)}
/* ============ PRAYER HINTS ============ */
function hint9(){const b=PC()!==P;
  if(inHouse()){
    if(!F.free)return b?['l9a',['paul_means_to_teach_them','we_can_go_out_by_the_door']]
      :['door9',['they_have_no_scroll','we_can_go_out_by_the_door']];
    const c=CARES.find(c=>!F[c.id]);
    if(!c)return['leave9',['everything_here_has_somebody_to_carry_it','i_can_go_out_by_the_door']];
    return c.id==='k1'?['k19',['household_that_learned','i_should_talk_to_luke_and_ask']]
      :c.id==='k2'?['k29',['brothers_need_a_room','i_should_talk_to_lydia_said']]
      :['k39',['who_kept_the_psalm_best','i_should_talk_to_phila']]}
  if(inRiv())return b?['l9b',['the_psalm_is_pauls_to_give_out_i','paul_should_use_the_flat_stones']]
    :day()===1?['ps19',['psalm_is_taught_line_by_line','i_should_use_the_flat_stones']]
    :day()===2?['ps29',['they_have_two_lines','i_should_use_the_flat_stones_said']]
    :['ps39',['one_line_is_left_the_thanks','i_should_use_the_flat_stones_and']];
  if(inCell()){
    if(!F.voice)return['voice9',['they_have_taken_my_tools','i_should_talk_to_silas_said']];
    if(!F.quake){const n=sungN();return['song9'+n,[['it_begins_with_thanks_to_jehovah','next_that_he_did_not_forget','next_that_he_saved_us_again','it_ends_with_thanks_to_the_god'][n],'i_should_talk_to_silas_and']]}
    if(!allHere())return['count9',['if_i_call_out_that_we_are','i_should_talk_to_each_of_the_three']];
    return['call9',['nobody_has_gone','i_should_talk_to_the_jailer']]}
  if(!F.back)return['back9',['he_was_ordered_to_guard','we_can_go_back_in_by_the_door']];
  if(!F.open)return['ans9',['they_beat_us_before_the_whole_city','i_should_talk_to_the_jailer_said']];
  return['ask9',['they_would_give_a_great_deal','i_should_talk_to_the_magistrate']]}
/* ============ CHAPTER DEFINITION ============ */
return{rooms:['lydia9','river9','cell9','gaol9'],setup:setup9,start:start9,hint:hint9,music:MUSIC,calls:CALLS9,scenes:{dark,forum:forumScene,jailer:jailerScene,shake:shakeScene},topics:[],tablets:TABLETS,
  /* for the playtest: what is told, the psalm, and the sung lines with the function that puts them on the mixer */
  told:TOLD,psalm:PS,song:SONG,voices,rumble,
  /* Nobody travels in this chapter. Its map is the road that led here, seen through the Aegean window, with Philippi lit. */
  view:'aegean',labels:{},route:ROAD9,
  /* Luke is with them as far as the account says "we". From the verse in which two men are seized he stands in no room, and a code must not put him in one. */
  away:id=>id==='luke'&&!!F.jail,
  flags:['went','d1','d2','jail','voice','s1','s2','s3','quake','c1','c2','c3','saved','back','open','free','k1','k2','k3'],
  /* four rooms and nineteen flags today; the code keeps room for eight and for twenty-four */
  codeBits:{flags:24,rooms:3},party:['paul','luke'],ent:ENT,
  inv:()=>F.jail&&!F.free?[]:['awl','thread','knife','tablets'],
  place:place9}
});
