/* Paul of Tarsus: the trailer's music (tools/trailer/). Not part of the game: tools/trailer/trailer.mjs loads this file into a copy of
   the game, after index.html, so that the trailer plays on the engine's own instruments (INST, DRUMS, tone, noise, note) and renders
   offline. Like the game's music, every sound is synthesized with the Web Audio API.

   The trailer wants a bigger sound than a room in the game, so it brings a few voices of its own: a string ensemble (str), the same
   players bouncing the bow (spic), wordless voices on a vowel (choir), a low brass swell (braam), a held sine under everything (sub),
   timpani (timp, roll), the great drum (drum character G, soft g), and the sounds of a cut: an impact (boom), a rising sweep (riser)
   and a swell of cymbal noise (swell). Everything sounds in a long hall (hall) instead of the game's small room.

   A score is plain data, close to the game's (see "music" in index.html):
     {dt: seconds per step, root, scale, bars, trans: [[bar, semitones], ...] (the key moves up from that bar), tail: seconds after the last bar,
      tracks: [...]}
   Every bar has 16 steps. A track is one of
     {inst, prog:'..AB', seq:{A:[a degree, an array of degrees, or null per step]}}   a pattern per bar; '.' is a bar of rest
     {inst, lines:{bar:[[step, degree(s), length in steps, velocity], ...]}}        notes placed by bar (an array counts from 0)
     {drum:1, prog, seq:{A:'G..g'}}                                                  one character per step: TR.DR, then the engine's DRUMS
     {fx:[[bar, step, kind, length in steps, level], ...]}                           a boom, riser or swell
   and may say vol (its level), env ([[bar, level], ...]: the level moves in straight lines between those bars; two points at one bar jump),
   pan, room (how much of it goes into the hall), oct (semitones), and options for its voice (a, r, bright, vow, width).
   hold(s, map) writes a line of held chords from a string of chord names, two to a bar: equal names in a row are one held chord,
   '-' holds the one before, '.' rests, '|' (taking no time) strikes the next one anew. */
const TR=(()=>{
"use strict";
let R=Math.random;
const N=16;
/* a seeded random, so that a render is the same every time */
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};

/* ---------- building blocks ---------- */
/* vo: one oscillator voice. f Hz from t for d seconds at level v; a attack, r release after d (dec: it dies away over d instead);
   det cents, to: glide to that frequency over td; vib Hz of vibrato (vibf its rate, vibd how long it takes to come in);
   lp [[Hz, seconds after t], ...] a lowpass that moves (lpq its Q); pan; echo also sends to the hall. */
function vo(o){const c=AU.ctx,t=o.t,d=o.d,v=o.v,a=o.a==null?.006:o.a,r=o.r==null?.08:o.r,ny=c.sampleRate*.45,end=o.dec?t+d:t+Math.max(d,a)+r;
  const s=c.createOscillator();s.type=o.type||'sawtooth';s.frequency.setValueAtTime(o.f,t);if(o.det)s.detune.setValueAtTime(o.det,t);
  if(o.to)s.frequency.exponentialRampToValueAtTime(o.to,t+(o.td||d));
  if(o.vib){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=o.vibf||5;lg.gain.setValueAtTime(0,t);
    lg.gain.linearRampToValueAtTime(o.vib,t+(o.vibd||.3));l.connect(lg);lg.connect(s.frequency);l.start(t);l.stop(end+.05)}
  let x=s;if(o.lp){const fl=c.createBiquadFilter();fl.type='lowpass';fl.Q.value=o.lpq||.7;
    o.lp.forEach(([hz,at],i)=>{hz=Math.max(20,Math.min(hz,ny));i?fl.frequency.exponentialRampToValueAtTime(hz,t+at):fl.frequency.setValueAtTime(hz,t+at)});x.connect(fl);x=fl}
  const g=c.createGain();x.connect(g);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+a);
  if(o.dec)g.gain.exponentialRampToValueAtTime(.0001,t+d);else{g.gain.setValueAtTime(v,t+Math.max(d,a));g.gain.exponentialRampToValueAtTime(.0001,end)}
  let y=g;if(o.pan){const p=c.createStereoPanner();p.pan.value=o.pan;g.connect(p);y=p}
  y.connect(o.dest||AU.out);if(o.echo)y.connect(AU.toRoom);s.start(t);s.stop(end+.05)}
/* nz: filtered noise. fq [[Hz, seconds after t], ...] moves its filter (type, q); it dies away over d, or with swell grows over d and
   is cut off at its end */
function nz(o){const c=AU.ctx,t=o.t,d=o.d,v=o.v,a=o.a||.002,ny=c.sampleRate*.45,end=t+d+(o.swell?.03:0);
  const s=c.createBufferSource();s.buffer=AU.nbuf;s.loop=true;const fl=c.createBiquadFilter();fl.type=o.type||'bandpass';fl.Q.value=o.q||1;
  (o.fq||[[o.f||1000,0]]).forEach(([hz,at],i)=>{hz=Math.max(20,Math.min(hz,ny));i?fl.frequency.exponentialRampToValueAtTime(hz,t+at):fl.frequency.setValueAtTime(hz,t+at)});
  const g=c.createGain();g.gain.setValueAtTime(.0001,t);
  if(o.swell){g.gain.exponentialRampToValueAtTime(v,t+d);g.gain.linearRampToValueAtTime(.0001,end)}
  else{g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d)}
  s.connect(fl);fl.connect(g);let y=g;if(o.pan){const p=c.createStereoPanner();p.pan.value=o.pan;g.connect(p);y=p}
  y.connect(o.dest||AU.out);if(o.echo)y.connect(AU.toRoom);s.start(t,R()*.5);s.stop(end+.05)}
/* sat: a soft clipping curve, for the grit of the brass */
function sat(k){const n=1024,x=new Float32Array(n);for(let i=0;i<n;i++){const u=i/(n-1)*2-1;x[i]=Math.tanh(k*u)/Math.tanh(k)}return x}
/* hall: a long stereo room, built as the engine builds its own (audioGraph): early reflections, then noise that dies away (60 dB in
   about rt seconds) and darkens as it goes, different in each ear */
function hall(c,rt){const sr=c.sampleRate,n=Math.round(sr*rt*1.15),ir=c.createBuffer(2,n,sr),pre=.024;let e=0;
  for(let k=0;k<2;k++){const x=ir.getChannelData(k);let y=0;
    for(let i=0;i<n;i++){const t=i/sr;if(t<pre)continue;const u=t-pre,fc=260+8500*Math.exp(-u/.7),q=Math.exp(-2*Math.PI*fc/sr);
      y=(1-q)*(R()*2-1)+q*y;x[i]=y*Math.pow(10,-3*u/rt)*Math.min(1,u/.04)}
    [[13,.5],[21,.42],[31,.34],[43,.27],[59,.2],[73,.15]].forEach(([ms,g],j)=>{x[Math.round((ms+k*2.9)*sr/1000)]+=g*(j%2?-1:1)*.25})}
  for(let k=0;k<2;k++)for(const v of ir.getChannelData(k))e+=v*v;
  for(let k=0;k<2;k++){const x=ir.getChannelData(k);for(let i=0;i<n;i++)x[i]/=Math.sqrt(e/2)}
  const cv=c.createConvolver();cv.normalize=false;cv.buffer=ir;const inp=c.createGain(),out=c.createGain();inp.connect(cv);cv.connect(out);return{inp,out}}

/* ---------- the trailer's voices: (f, t, d, v, down, track) like the engine's instruments ---------- */
const VOWEL={a:[[730,1,90],[1090,.55,110],[2440,.3,170],[3400,.12,250]],o:[[570,1,80],[840,.5,100],[2410,.12,170],[3300,.05,250]],
  u:[[320,1,70],[800,.3,90],[2240,.06,170],[3300,.03,250]]};
const V={
  /* strings: five players a few cents apart, spread across the stage, bowing in slowly; bright opens the bow */
  str(f,t,d,v,down,tr){const a=tr.a!=null?tr.a:Math.min(.45,d*.35),r=tr.r!=null?tr.r:.7,top=Math.min(9000,f*(tr.bright||4.5)+1300),w=tr.width==null?1:tr.width;
    [[-12,-.8],[-5,-.4],[1,0],[6,.4],[13,.8]].forEach(([det,pan],i)=>vo({f,t,d,v:v*.042,det,pan:pan*w,a:a*(.8+i*.1),r,lp:[[f*2.5+300,0],[top,a+.2]],lpq:.6,
      vib:f*.0042,vibf:4.5+i*.27,vibd:.4,echo:1}))},
  /* spiccato: the same players bouncing the bow, short and bright, with the scrape of the hair */
  spic(f,t,d,v){[[-8,-.45],[0,0],[9,.45]].forEach(([det,pan])=>vo({f,t,d:Math.min(d,.09),v:v*.05,det,pan,a:.004,r:.09,lp:[[Math.min(8000,f*10),0],[f*2.6+250,.08]],lpq:1.1,echo:1}));
    nz({t,d:.025,v:v*.02,f:Math.min(9000,f*7),q:1.4})},
  /* choir: four voices on one vowel (vow: a, o or u), each through the resonances of an open mouth */
  choir(f,t,d,v,down,tr){const c=AU.ctx,a=tr.a!=null?tr.a:Math.min(.7,d*.4),r=tr.r!=null?tr.r:1.1,F=VOWEL[tr.vow||'a'],end=t+Math.max(d,a)+r;
    [[-11,-.65],[-3,-.22],[4,.22],[12,.65]].forEach(([det,pan],i)=>{const s=c.createOscillator();s.type='sawtooth';s.frequency.value=f;s.detune.value=det;
      const l=c.createOscillator(),lg=c.createGain();l.frequency.value=4.9+i*.31;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.007,t+.6);l.connect(lg);lg.connect(s.frequency);
      const sum=c.createGain(),g=c.createGain(),p=c.createStereoPanner();
      F.forEach(([ff,amp,bw])=>{const b=c.createBiquadFilter();b.type='bandpass';b.frequency.value=ff;b.Q.value=ff/bw;const bg=c.createGain();bg.gain.value=amp;s.connect(b);b.connect(bg);bg.connect(sum)});
      sum.connect(g);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*.2,t+a);g.gain.setValueAtTime(v*.2,t+Math.max(d,a));g.gain.exponentialRampToValueAtTime(.0001,end);
      p.pan.value=pan;g.connect(p);p.connect(AU.out);p.connect(AU.toRoom);s.start(t);s.stop(end+.05);l.start(t);l.stop(end+.05)})},
  /* braam: low brass that blares in and darkens, a little rough, with a sine an octave below */
  braam(f,t,d,v,down,tr){const c=AU.ctx,r=tr.r!=null?tr.r:1.6,end=t+d+r,sh=c.createWaveShaper(),fl=c.createBiquadFilter(),g=c.createGain();
    sh.curve=sat(2.2);fl.type='lowpass';fl.Q.value=1.6;fl.frequency.setValueAtTime(110,t);fl.frequency.exponentialRampToValueAtTime(1900,t+.2);
    fl.frequency.exponentialRampToValueAtTime(700,t+d);fl.frequency.exponentialRampToValueAtTime(200,end);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*.07,t+.07);g.gain.setValueAtTime(v*.07,t+d);g.gain.exponentialRampToValueAtTime(.0001,end);
    [[0,'sawtooth',.5,1],[8,'sawtooth',.5,1],[-7,'sawtooth',.5,1],[0,'square',.35,.5]].forEach(([det,ty,lv,m])=>{const s=c.createOscillator(),sg=c.createGain();
      s.type=ty;s.frequency.value=f*m;s.detune.value=det;sg.gain.value=lv;s.connect(sg);sg.connect(sh);s.start(t);s.stop(end+.05)});
    sh.connect(fl);fl.connect(g);g.connect(AU.out);g.connect(AU.toRoom);vo({f:f/2,t,d,v:v*.12,type:'sine',a:.05,r})},
  /* sub: a held sine that swells in, under everything */
  sub(f,t,d,v,down,tr){vo({f,t,d,v:v*.05,type:'sine',a:tr.a!=null?tr.a:Math.min(1.2,d*.3),r:tr.r!=null?tr.r:1});vo({f:f*2,t,d,v:v*.02,type:'sine',a:Math.min(1.2,d*.3),r:.8})},
  /* timpani: a tuned drum, its partials not quite whole multiples, and the felt of the mallet */
  timp(f,t,d,v){const D=Math.max(1.4,d);vo({f:f*1.03,to:f,td:.05,t,d:D,v:v*.3,type:'sine',a:.003,dec:1,echo:1});
    vo({f:f*1.504,t,d:D*.5,v:v*.1,type:'sine',a:.003,dec:1,echo:1});vo({f:f*1.742,t,d:D*.35,v:v*.05,type:'sine',a:.003,dec:1});
    vo({f:f*2,t,d:D*.3,v:v*.04,type:'sine',a:.003,dec:1});nz({t,d:.07,v:v*.09,f:650,type:'lowpass',q:.7})},
  /* roll: the timpani rolled, growing louder over d */
  roll(f,t,d,v){const n=Math.max(2,Math.round(d/.055));for(let k=0;k<n;k++){const u=k/(n-1);V.timp(f,t+k*.055+(R()-.5)*.008,.6,v*(.12+.88*u*u)*(.85+.3*R()))}}};
/* the engine's plucked strings and the drums are played by hand: accents and a few milliseconds off the grid */
const HAND=new Set(['harp','lyre','oud','bass','spic']);

/* the great drum: a deep skin that falls in pitch and rings in the hall, with the thud of the stick; G loud, g soft */
function great(t,v,pan){vo({f:92,to:47,td:.4,t,d:1.7,v:v*.34,type:'sine',a:.002,dec:1,pan,echo:1});vo({f:158,to:84,td:.16,t,d:.4,v:v*.17,type:'sine',a:.002,dec:1,pan});
  nz({t,d:.45,v:v*.3,fq:[[2400,0],[260,.3]],type:'lowpass',q:.8,pan,echo:1});nz({t,d:.04,v:v*.16,f:2300,q:1.1,pan})}
const DR={G:(t,v,s)=>great(t,v,s%4?.22:-.22),g:(t,v,s)=>great(t,v*.42,s%4?.3:-.3)};
/* the sounds of a cut */
const FX={
  /* boom: the impact on a cut, a sine falling into the floor, a burst that closes, the great drum, and a wash of cymbal noise */
  boom(t,d,v){vo({f:64,to:30,td:1.3,t,d:3.4,v:v*.4,type:'sine',a:.003,dec:1,echo:1});
    nz({t,d:1.9,v:v*.22,fq:[[5200,0],[150,1]],type:'lowpass',q:.6,pan:-.35,echo:1});nz({t,d:1.9,v:v*.22,fq:[[5600,0],[160,1]],type:'lowpass',q:.6,pan:.35,echo:1});
    great(t,v*.9,0);nz({t,d:2.8,v:v*.035,f:6500,type:'highpass',q:.5,pan:-.5,echo:1});nz({t,d:2.8,v:v*.035,f:7000,type:'highpass',q:.5,pan:.5,echo:1})},
  /* riser: noise whose band climbs, two ears apart, and a tone gliding up under it, cut off at its end */
  riser(t,d,v){nz({t,d,v:v*.1,fq:[[280,0],[7000,d]],q:2.6,swell:1,pan:-.55});nz({t,d,v:v*.1,fq:[[300,0],[7600,d]],q:2.6,swell:1,pan:.55});
    vo({f:170,to:690,td:d,t,d,v:v*.035,a:d*.92,r:.03,lp:[[500,0],[5000,d]],vib:6,vibf:7})},
  /* swell: cymbal noise that grows and stops dead */
  swell(t,d,v){nz({t,d,v:v*.06,f:4200,type:'highpass',q:.6,swell:1,pan:-.4});nz({t,d,v:v*.06,f:4600,type:'highpass',q:.6,swell:1,pan:.4})}};

/* ---------- writing a score ---------- */
function hold(s,map,per){per=per||2;const L={},w=N/per;let last=null,prev=null,i=0;
  for(const ch of s.replace(/\s/g,'')){if(ch==='|'){prev=null;continue}const bar=Math.floor(i/per),st=(i%per)*w;i++;
    if(ch==='.'){last=prev=null;continue}if(ch==='-'||ch===prev){if(last)last[2]+=w;continue}
    last=[st,map[ch],w];prev=ch;(L[bar]=L[bar]||[]).push(last)}return L}
/* bars: a list of bars as an object from bar k on */
const from=(k,list)=>Object.fromEntries(list.map((x,i)=>[k+i,x]));
const join=(...o)=>Object.assign({},...o);

/* ---------- rendering ---------- */
function render(sc,opt){opt=opt||{};const SR=opt.sr||48000,dt=sc.dt,T0=.25,len=T0+sc.bars*N*dt+(sc.tail==null?4:sc.tail);
  const c=new OfflineAudioContext(2,Math.ceil(SR*len),SR),keepR=Math.random,keep=Object.assign({},AU);
  Math.random=R=rng(opt.seed||1789);
  try{AU.ctx=c;audioGraph(c);
    const master=c.createGain(),comp=c.createDynamicsCompressor(),lim=c.createDynamicsCompressor();master.gain.value=sc.master||.8;
    comp.threshold.value=-18;comp.knee.value=10;comp.ratio.value=2.5;comp.attack.value=.03;comp.release.value=.4;
    lim.threshold.value=-4;lim.knee.value=0;lim.ratio.value=20;lim.attack.value=.002;lim.release.value=.15;
    /* the mastering EQ: less of the low boom and the mud, more presence and air, as a film's music has it */
    const eq=[['lowshelf',95,0,-4],['peaking',300,.8,-3],['peaking',2600,.7,2.5],['highshelf',5500,0,4]].map(([ty,f,q,g])=>{const b=c.createBiquadFilter();b.type=ty;b.frequency.value=f;if(q)b.Q.value=q;b.gain.value=g;return b});
    master.connect(eq[0]);for(let i=1;i<eq.length;i++)eq[i-1].connect(eq[i]);eq[eq.length-1].connect(comp);comp.connect(lim);lim.connect(c.destination);
    const H=hall(c,sc.hall||3.2);H.out.gain.value=sc.wet==null?.55:sc.wet;H.out.connect(master);
    const at=(bar,st)=>T0+(bar*N+st)*dt,shift=bar=>{let s=0;for(const[b,x]of sc.trans||[])if(bar>=b)s=x;return s},
      pitch=(n,oct,bar)=>mtof(note(n,oct||0,sc)+shift(bar)),jit=()=>(R()*2-1)*.004;
    sc.tracks.forEach((tr,j)=>{if(opt.solo!=null&&opt.solo!==j)return;if(opt.mute&&opt.mute.includes(j))return;
      /* the track's bus: its dry sound and its sends into the hall share one level, which follows env */
      const dry=c.createGain(),echo=c.createGain(),lv=c.createGain(),lvE=c.createGain(),pan=c.createStereoPanner(),send=c.createGain();
      dry.connect(lv);lv.connect(pan);pan.connect(master);pan.connect(send);send.gain.value=tr.room==null?.3:tr.room;send.connect(H.inp);
      echo.connect(lvE);lvE.connect(H.inp);pan.pan.value=tr.pan||0;const vol=tr.vol==null?1:tr.vol;
      for(const p of[lv.gain,lvE.gain]){const e=tr.env||[[0,1]];p.setValueAtTime(e[0][1]*vol,0);for(const[b,l]of e)p.linearRampToValueAtTime(l*vol,at(b,0))}
      AU.out=dry;AU.toRoom=echo;AU.body=tr.inst==='lyre'?lyreBody(c,dry):dry;
      if(tr.fx){for(const[b,st,k,l,v]of tr.fx)FX[k](at(b,st),l*dt,v==null?1:v);return}
      const hand=tr.drum||HAND.has(tr.inst),play=V[tr.inst]||INST[tr.inst];
      const hit=(bar,st,deg,l,vel)=>{const t=at(bar,st)+(hand?jit():0),v=(vel==null?1:vel)*(hand?accent(st%N,N):1);
        if(tr.drum){const f=DR[deg]||DRUMS[deg];if(f)f(Math.max(0,t),v,st);return}
        for(const n of[].concat(deg))play(pitch(n,tr.oct,bar),Math.max(0,t),l*dt,v,st%N===0,tr)};
      if(tr.prog){const pr=tr.prog.replace(/\s/g,'');for(let b=0;b<pr.length&&b<sc.bars;b++){const p=tr.seq[pr[b]];if(!p)continue;
        for(let st=0;st<N;st++){const x=typeof p==='string'?p[st]:p[st];if(x!=null&&x!=='.')hit(b,st,x,tr.len||2)}}}
      if(tr.lines){for(const k in tr.lines)for(const[st,deg,l,vel]of tr.lines[k]||[])hit(+k,st,deg,l,vel)}})}
  finally{for(const k in AU)AU[k]=keep[k];Math.random=keepR;R=Math.random}
  return c.startRendering()}

/* ---------- handing a render to tools/trailer/trailer.mjs ---------- */
let WAV='';
/* wav: render a score, bring its loudest peak to -1 dBFS, and keep it as a 16-bit WAV in base64; returns its length in characters and
   the level of every bar (RMS in dBFS), so that the shape of the music can be read without hearing it */
async function wav(sc,opt){const b=await render(sc,opt),L=b.getChannelData(0),Rr=b.getChannelData(1),n=b.length;let pk=0;
  for(let i=0;i<n;i++)pk=Math.max(pk,Math.abs(L[i]),Math.abs(Rr[i]));const g=pk>0?Math.pow(10,-1/20)/pk:1;
  const bytes=new Uint8Array(44+n*4),dv=new DataView(bytes.buffer),str=(o,s)=>{for(let i=0;i<s.length;i++)bytes[o+i]=s.charCodeAt(i)};
  str(0,'RIFF');dv.setUint32(4,36+n*4,true);str(8,'WAVE');str(12,'fmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);
  dv.setUint32(24,b.sampleRate,true);dv.setUint32(28,b.sampleRate*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);str(36,'data');dv.setUint32(40,n*4,true);
  for(let i=0;i<n;i++){dv.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]*g))*32767,true);dv.setInt16(46+i*4,Math.max(-1,Math.min(1,Rr[i]*g))*32767,true)}
  let s='';for(let i=0;i<bytes.length;i+=0x8000)s+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));WAV=btoa(s);
  const bl=Math.round(b.sampleRate*N*sc.dt),off=Math.round(b.sampleRate*.25),bars=[];
  for(let k=0;off+k*bl<n;k++){let e=0,m=0;const a=off+k*bl,z=Math.min(n,a+bl);for(let i=a;i<z;i++){const x=(L[i]+Rr[i])*.5*g;e+=x*x}
    bars.push(+(10*Math.log10(e/(z-a)+1e-12)).toFixed(1))}
  return{size:WAV.length,peak:+(20*Math.log10(pk)).toFixed(1),seconds:+(n/b.sampleRate).toFixed(2),bars}}
/* levels: each track alone, the RMS (dBFS, before the peak is evened out) over the bars where it plays */
async function levels(sc){const out=[];for(let j=0;j<sc.tracks.length;j++){const b=await render(sc,{solo:j,sr:22050}),L=b.getChannelData(0),Rr=b.getChannelData(1);
  let e=0,n=0,pk=0;for(let i=0;i<b.length;i++){const x=(L[i]+Rr[i])*.5;pk=Math.max(pk,Math.abs(x));if(Math.abs(x)>1e-4){e+=x*x;n++}}
  const tr=sc.tracks[j];out.push({track:tr.name||tr.inst||(tr.drum?'drums':'fx'),rms:+(10*Math.log10(e/Math.max(1,n)+1e-12)).toFixed(1),peak:+(20*Math.log10(pk+1e-9)).toFixed(1)})}return out}
return{render,wav,levels,part:(i,size)=>WAV.slice(i*size,(i+1)*size),hold,from,join,V,FX,DR,SCORES:{}}})();
