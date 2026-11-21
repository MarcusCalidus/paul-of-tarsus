/* Paul of Tarsus: the trailer's clock (tools/trailer/). tools/trailer/trailer.mjs puts this in front of every page it opens, before the
   game's own scripts, so that the game keeps time by it: performance.now, Date.now, setTimeout, setInterval and requestAnimationFrame.
   While a shot is being set up the clock runs with the real one; while it is filmed it stands still and moves on only when the recorder
   steps it, by exactly one frame, firing every timer that falls due in that frame at its own moment and then the frame's animation
   callbacks. So every frame of the trailer is drawn at its exact time, however long the screenshot takes. CSS transitions are not on
   this clock: the shots keep clear of the game's own fades, and the trailer fades in its own frames instead. */
(()=>{
"use strict";
const real={now:performance.now.bind(performance),raf:window.requestAnimationFrame.bind(window),caf:window.cancelAnimationFrame.bind(window)};
const EPOCH=Date.now();
let mode='real',vt=0,base=real.now(),id=1;
const timers=new Map(),rafs=new Map();
const now=()=>mode==='real'?vt+(real.now()-base):vt;
performance.now=now;Date.now=()=>Math.floor(EPOCH+now());
const add=(fn,ms,args,every)=>{const i=id++;timers.set(i,{fn,args,at:now()+Math.max(0,+ms||0),every});return i};
window.setTimeout=(fn,ms,...a)=>add(fn,ms,a,0);
window.setInterval=(fn,ms,...a)=>add(fn,ms,a,Math.max(4,+ms||0));
window.clearTimeout=window.clearInterval=i=>{timers.delete(i)};
window.requestAnimationFrame=fn=>{const i=id++;rafs.set(i,fn);return i};
window.cancelAnimationFrame=i=>{rafs.delete(i)};
/* a macrotask of the real browser, so that every promise waiting on what just ran has run before the next timer */
const settle=()=>new Promise(r=>{const ch=new MessageChannel();ch.port1.onmessage=()=>r();ch.port2.postMessage(0)});
const fire=t=>{if(t.every)t.at+=t.every;else timers.delete(t.key);try{typeof t.fn==='function'?t.fn(...t.args):eval(t.fn)}catch(e){console.error(e)}};
const due=limit=>{let best=null;for(const[k,t]of timers)if(t.at<=limit&&(!best||t.at<best.at)){t.key=k;best=t}return best};
const frame=()=>{const list=[...rafs.values()];rafs.clear();const t=now();for(const f of list){try{f(t)}catch(e){console.error(e)}}};
/* in real mode, the clock's own loop fires what is due and draws a frame whenever the browser does */
(function loop(){if(mode==='real'){let t,n=0;while((t=due(now()))&&n++<200)fire(t);frame()}real.raf(loop)})();
window.__clock={
  get mode(){return mode},now,
  /* stop: from now on the clock moves only when stepped */
  stop(){vt=now();mode='step'},
  /* run: run with the real clock again, from where it stands */
  run(){base=real.now();mode='real'},
  /* step: move on by ms, firing every timer in order of its time, then draw one frame */
  async step(ms){const end=vt+ms;let t,n=0;await settle();
    while((t=due(end))&&n++<2000){vt=Math.max(vt,t.at);fire(t);await settle()}
    vt=end;frame();await settle()}};
})();
