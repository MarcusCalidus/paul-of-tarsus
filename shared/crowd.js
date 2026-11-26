/* Paul of Tarsus: the cry of a crowd, shared by the chapters in which the account puts words in a crowd's mouth (Chapter Fourteen, the
   cry for Artemis of Acts 19:28, 34; Chapter Eighteen, Acts 21:36 and 22:22). Loaded on demand with need('crowd') (list 'crowd' in the
   chapter's needs) and registered in shared/pwa.js for offline play.

   A cry is heard and never written on the screen (CONTRIBUTING section 8). It is a crowd of men shouting the same words, each a little off
   the beat and off the pitch of the next. Each voice is a buzz from the throat through three resonances of the mouth that move with the
   vowel, and breath; the shout falls at the end of each syllable, as a shout does. It has no consonants, so it sounds like a crowd and
   never like words. The vowels and their rhythm are those of what the account says the crowd shouted, in the player's language: the
   chapter's text gives them under a key of its own, each syllable as its height (0 the lowest), a dot, its length in steps, and its vowel
   (a e i o u y, and @ for a dull, unstressed one); "-.2" is a rest of two steps. For example "2.2e 1.1i 3.2a -.3".

     parse(key)                 the syllables of a cry from its key: [[height or null, steps, vowel], ...]
     cry(dest, t, o)            the whole cry once, from t (seconds of the audio clock), into dest; returns its length in seconds (0
                                without sound). o: {key, n, base, far, vol, step, interval}
                                  key       the text key that gives the cry's syllables
                                  n         how many voices (9 is a crowd at hand; fewer sound smaller)
                                  base      the pitch of height 0, in Hz (Chapter Fourteen: its keynote an octave down)
                                  far       0 near; 1 heard through walls and shutters (a lowpass at 520 Hz, and quieter); or a number
                                            above 1, the lowpass itself in Hz, for anything between (2600 is near)
                                  vol       the loudness of the whole crowd (default .03 near, .012 far: the sum is divided by the root
                                            of n and multiplied by three, as Chapter Fourteen always did)
                                  step      the length of one step in seconds (.2)
                                  interval  semitones from one height to the next (2)
     call(o, lo, hi)            an ambience call for a chapter's calls:{..} (index.html, ambience): the cry heard again and again, every
                                lo to hi seconds, at the room's level for it
     shout(dest,t,d,f,vow,v,far) one voice shouting one syllable: d seconds long, at f Hz, on vowel vow, at loudness v
     VOW                        the three resonances of each vowel, in Hz
     ROAR, ROARFAR              ambience beds: the roar of a crowd at hand, low, with a slow swell, and the same far off. A chapter names
                                them in its own beds:{..} under names of its own (roar14: SHARED.crowd.ROAR). */
SHARED.crowd=(()=>{
"use strict";
const VOW={a:[730,1090,2440],o:[570,840,2410],u:[320,800,2240],e:[530,1840,2480],i:[280,2250,2900],y:[290,1700,2200],'@':[500,1400,2450]};
const parse=s=>T(s).split(' ').map(x=>{const m=/^(-?\d+|-)\.(\d+)(.?)$/.exec(x)||['','-','1',''];return[m[1]==='-'?null:+m[1],+m[2],m[3]||'a']});
function shout(dest,t,d,f,vow,v,far){const c=AU.ctx,o=c.createOscillator(),src=c.createGain();o.type='sawtooth';
  o.frequency.setValueAtTime(f*1.06,t);o.frequency.exponentialRampToValueAtTime(f,t+.05);o.frequency.exponentialRampToValueAtTime(f*.82,t+d);o.connect(src);
  const nz=c.createBufferSource(),ng=c.createGain();nz.buffer=AU.nbuf;nz.loop=true;ng.gain.value=.5;nz.connect(ng);ng.connect(src);
  const V=VOW[vow]||VOW.a,sum=c.createGain();
  V.forEach((fr,i)=>{const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fr*(.95+.1*Math.random());bp.Q.value=[6,8,9][i];const gg=c.createGain();gg.gain.value=[1,.6,.3][i];src.connect(bp);bp.connect(gg);gg.connect(sum)});
  const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=far>1?far:far?520:2600;sum.connect(lp);
  const env=c.createGain(),g=env.gain;g.value=0;g.setValueAtTime(.0001,t);g.linearRampToValueAtTime(v,t+.04);g.setValueAtTime(v,t+d*.6);g.linearRampToValueAtTime(.0001,t+d);lp.connect(env);
  let out=env;if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=Math.random()*1.6-.8;env.connect(p);out=p}out.connect(dest);
  o.start(t);o.stop(t+d+.05);nz.start(t,Math.random()*.5);nz.stop(t+d+.05)}
function cry(dest,t,o){if(!AU.ctx)return 0;const L=parse(o.key),STEP=o.step||.2,n=o.n||9,far=o.far||0,iv=o.interval||2,
    v=(o.vol!=null?o.vol:far===1||far&&far<1200?.012:.03)/Math.sqrt(n)*3;let len=0;for(const s of L)len+=s[1]*STEP;
  for(let k=0;k<n;k++){let y=t+Math.random()*.06;const base=o.base*(.94+.12*Math.random());
    for(const[h,l,vow]of L){const d=l*STEP;if(h!=null)shout(dest,y,d*.9,base*Math.pow(2,(h*iv)/12),vow,v,far);y+=d}}
  return len}
const call=(o,lo,hi)=>[lo,hi,(t,d)=>cry(d,t,o)];
const ROAR={type:'lowpass',f:340,q:.6,lfo:.19,depth:.55,v:.55},ROARFAR={type:'lowpass',f:180,q:.5,lfo:.12,depth:.6,v:.45};
return{VOW,parse,shout,cry,call,ROAR,ROARFAR}})();
