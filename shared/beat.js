/* Paul of Tarsus: the slow beat of the sea, for a crossing timed by the waves (Chapters Twenty-Two and Twenty-Three: the skiff hauled
   in while the stern is down, the deck crossed from hold to hold, the surf). Loaded with need('beat'), or 'beat' in CHAP[n].needs, and kept
   for offline play by shared/pwa.js. It paints nothing and knows no room by name: the level paints the sea from the phase it gives.

   One clock. The beat is kept on performance.now() from a start time, never by adding frames and never by the music or the AudioContext,
   so the wave is the same whether the sound is on, muted, or never started, and a tab left in the background finds it where it should be.
   The wave's sound is scheduled from that same clock a little ahead, so that what is heard and what is seen are one wave.

   A cycle runs from 0 to 1. At 0 the sea breaks (the crash); the water runs off; then comes the pause, [from, to), in which a step can be
   made; after it the next sea rises (the swell) and breaks at 1, which is the 0 of the next cycle.

     start(o)        begin a beat and make it G.beat (a beat already running is stopped first). o, all optional:
                       period  ms from wave to wave (6000); pause ms of calm in it (3000); at the phase where the pause begins (.24);
                       need    ms a step takes: a click is a hit only if the pause lasts that long after it (0);
                       phase   the phase at the start (by default the end of the pause, so the first sea is seen rising);
                       call    misses in a row after which a sailor calls the moment (3); carry misses after which he takes him across (6);
                       sticky  the help, once given, stays until reset() (false: a hit clears the count, and the help with it);
                       sound   schedule the sea's sound (true); vol its level (1); dest the bus it goes to (AU.fx);
                       room    the room it belongs to (G.room): it stops by itself when that room is no longer shown; null for none.
                     Under the playtest (fast()) period, pause and need are shortened to three tenths.
     stop()          stop the beat that is running: no more sound is scheduled, and what was scheduled ahead fades out at once.
     cap(g, key, x, y, o)  a caption over the picture (the sailor's call, 'now'), drawn as Chapter Thirteen's captions are: a key, in the
                     player's language, with a dark edge, made to fit o.w (60) room pixels. o.c its colour. Never a standing line:
                     a click while a line stands only skips the line, and the next sea would be missed.
     call(g, x, y, t) draws cap(g, 'now', x, y) while G.beat is calling (see calling); the level draws the sailor himself.
     fast()          whether the playtest is playing at speed.

   The beat (G.beat), for the level, and for the playtest, which waits for the pause before it clicks and clicks on the wave to miss:
     phase(t)        the phase at the moment t (performance.now() if not given)
     inPause(t)      whether t lies in the pause
     next(t)         {from, to}: the pause that t lies in, or else the next one, in ms on the performance.now() clock
     crash(t)        the time of the next sea to break after t
     attempt(t)      a step tried at the moment t, which is the moment of the click (G.actT, which clickView keeps), not the time the
                     handler runs: {hit, misses, help, carry, phase}. help is 0 (none), 1 (the call) or 2 (the carry); carry is help===2.
                     A hit clears the count of misses in a row.
     calling(t)      the sailor calls: help is given, t lies in the pause and a step begun now still ends inside it
     reset()         clear the count and the help (a new crossing)
     misses, help, on, sounded (seas whose sound has been scheduled), period, pause, from, to, need, t0
   Nothing of the beat is in a safe-point code: a code restored in the middle of a crossing starts no beat (setChapter stops it), and
   the level starts one again when its room needs it.

   Traps (see docs/development.md, "The beat of the sea"): nothing reaches a room while a script runs, so a crossing is never one long cut:
   each step is a short one; a line that stands swallows the next click, so a miss says nothing as a standing line (notice() or cap()); a
   phone holds back a second tap within 350 ms, so a step is never asked for twice in quick succession. */
SHARED.beat=(()=>{
"use strict";
const fast=()=>G.speedAll>200;
let B=null,timer=0;

/* the sea's sound: the swell rising, the crash, the water running off the deck, in seconds from the crash. k scales them with the period. */
function sea(B,n,crashMs){const c=AU.ctx;if(!c||!B.bus)return false;const k=clamp(B.period/6000,.3,1.4),v=B.vol,
    nowMs=performance.now(),at=ms=>ctxAt(c,ms),soon=nowMs+20,
    rnd=(i=>()=>{i=Math.imul(i^i>>>15,2246822507)^Math.imul(i^i>>>13,3266489909);return((i^=i>>>16)>>>0)/4294967296})(n*7919+13),
    dest=B.bus,swell=1.7*k*1000;
  /* the swell: three bands of noise that swell in together, each starting later and brighter, so that the sea seems to climb */
  [[0,220,'lowpass',.7,.12],[.35,520,'bandpass',.8,.06],[.62,1150,'bandpass',.9,.035]].forEach(([dl,f,type,q,lv])=>{
    const s=Math.max(crashMs-swell*(1-dl),soon),d=(crashMs-s)/1000;if(d>.12)noise({t:at(s),d:d+.06,a:d,v:lv*v,f,type,q,dest})});
  if(crashMs<soon)return true;
  /* the crash: a broad burst, the spray above it, and the thump of the water on the planks */
  noise({t:at(crashMs),d:1.15*k+.25,v:.2*v,f:820,type:'bandpass',q:.45,dest});
  noise({t:at(crashMs+15),d:.6*k+.15,v:.07*v,f:3200,type:'highpass',q:.6,dest});
  tone({t:at(crashMs),d:.45,v:.15*v,f:72,to:36,type:'sine',dest});
  /* the water running off: a hiss that swells and dies, and small gurgles at the scuppers */
  const off=crashMs+280*k;noise({t:at(off),d:1.5*k+.2,a:.3*k,v:.065*v,f:1900,type:'highpass',q:.6,dest});
  for(let i=0;i<6;i++){const t=off+(120+rnd()*1100)*k,f=520+rnd()*900;noise({t:at(t),d:.07+rnd()*.07,v:(.035-i*.004)*v,f,type:'bandpass',q:7,dest})}
  return true}
/* ctxAt: the AudioContext's time at which a sound must start to be heard at the moment ms of the performance.now() clock. The output
   timestamp ties the two clocks where it is heard (so the device's latency is taken off); where the browser gives none, the context's
   current time stands for now. Never earlier than the context can still play. */
function ctxAt(c,ms){let base=c.currentTime,pn=performance.now();
  try{const o=c.getOutputTimestamp&&c.getOutputTimestamp();if(o&&o.contextTime>0&&o.performanceTime>0&&Math.abs(o.performanceTime-pn)<1000){base=o.contextTime;pn=o.performanceTime}}catch(e){}
  return Math.max(c.currentTime+.005,base+(ms-pn)/1000)}

/* tick: ten times a second, as long as a beat runs. It stops the beat when its room is gone, and schedules the sound of each sea that
   rises within the next half second. A tab in the background slows it, but nothing is counted by it: a sea whose crash has passed while
   it slept is not heard late. */
function tick(){if(!B)return;if(B.room&&G.room!==B.room)return stop();
  const c=AU.ctx;if(!B.sound||!c||c.state!=='running')return;
  if(!B.bus){try{B.bus=c.createGain();B.bus.gain.value=1;B.bus.connect(B.dest||AU.fx)}catch(e){B.bus=null;return}}
  const nowMs=performance.now(),lead=500+1700*clamp(B.period/6000,.3,1.4);
  for(let n=Math.floor((nowMs-B.t0)/B.period);;n++){const crash=B.t0+n*B.period;if(crash-lead>nowMs)break;
    if(crash<nowMs-50||n<=B.last)continue;B.last=n;if(sea(B,n,crash))B.sounded++}}

function stop(){clearInterval(timer);timer=0;const b=B;B=null;if(G.beat===b)G.beat=null;if(!b)return;b.on=false;
  /* what was scheduled ahead is let go at once: the beat's own bus fades out and is taken away */
  const c=AU.ctx;if(b.bus&&c){try{const g=b.bus.gain,t=c.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+.08);const bus=b.bus;setTimeout(()=>{try{bus.disconnect()}catch(e){}},400)}catch(e){}}
  b.bus=null}

function start(o={}){stop();const k=fast()?.3:1,period=(o.period||6000)*k,pause=Math.min((o.pause!=null?o.pause:3000)*k,period*.9),
    from=o.at!=null?o.at:.24,to=from+pause/period,ph=o.phase!=null?o.phase:to%1,now=performance.now();
  const b={on:true,period,pause,from,to,need:(o.need||0)*k,t0:now-ph*period,misses:0,help:0,sounded:0,last:-1e9,
    callAt:o.call||3,carryAt:o.carry||6,sticky:!!o.sticky,sound:o.sound!==false,vol:o.vol!=null?o.vol:1,dest:o.dest||null,bus:null,
    room:o.room!==undefined?o.room:G.room,
    phase(t){return(((t??performance.now())-this.t0)/this.period%1+1)%1},
    inPause(t){const p=this.phase(t);return p>=this.from&&p<this.to},
    next(t){t=t??performance.now();const n=Math.floor((t-this.t0)/this.period),a=this.t0+(n+this.from)*this.period,z=a+this.pause;
      return t<z?{from:a,to:z}:{from:a+this.period,to:z+this.period}},
    crash(t){t=t??performance.now();return this.t0+Math.floor((t-this.t0)/this.period+1)*this.period},
    attempt(t){t=t??(G.actT&&performance.now()-G.actT<2000?G.actT:performance.now());const p=this.phase(t),w=this.next(t),
        hit=this.inPause(t)&&w.to-t>=this.need;
      if(hit){if(!this.sticky){this.misses=0;this.help=0}}
      else{this.misses++;this.help=Math.max(this.sticky?this.help:0,this.misses>=this.carryAt?2:this.misses>=this.callAt?1:0)}
      return{hit,misses:this.misses,help:this.help,carry:this.help===2,phase:p}},
    calling(t){t=t??performance.now();return this.on&&this.help>=1&&this.inPause(t)&&this.next(t).to-t>=this.need},
    reset(){this.misses=0;this.help=0},
    stop};
  B=G.beat=b;timer=setInterval(tick,100);tick();return b}

/* the sailor's call, and any other caption over the picture: small letters with a dark edge, fitted to their width */
const FONT=z=>`bold ${z}px "Lucida Console",Monaco,"Courier New",monospace`;
function cap(g,key,x,y,o={}){const s=T(key),w=o.w||60;let sz=o.sz||6.4;g.save();g.font=FONT(sz);g.textBaseline='middle';
  while(g.measureText(s).width>w&&sz>3.2){sz-=.2;g.font=FONT(sz)}const tx=x-g.measureText(s).width/2;
  const tw=g.measureText(s).width;g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1.2;g.lineJoin='round';g.strokeText(s,tx,y);g.fillStyle=o.c||'#f8ecc4';g.fillText(s,tx,y);g.restore();
  /* what was written last, for the playtest: it must fit its width in every language */
  cap.last={key,s,sz,w:tw,max:w,t:performance.now()}}
function call(g,x,y,t){if(G.beat&&G.beat.calling(t))cap(g,'now',x,y)}

return{start,stop,cap,call,fast,get beat(){return B}}})();
