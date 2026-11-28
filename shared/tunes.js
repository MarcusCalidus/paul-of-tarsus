/* Paul of Tarsus: one bar of each chapter's own tune, for the look back at the end of the game (issue #95), where each chapter's bar is
   heard as its road is drawn on the map. Loaded on demand with need('tunes') and registered in shared/pwa.js for offline play.

   A chapter's score lives in its level file, and a level is not loaded just for one bar, so the bars are copied here. Each is the bar in
   which the chapter's main tune begins, in the mood its first rooms play, with the voices that sound under it in that bar (four tracks at
   most), taken from the chapter's own MUSIC as it stands and never written anew. A copy is a score the engine plays as it plays any other
   (setScore): the same gain, dt, steps, group, root and scale as the chapter's, and the same tracks with their levels, their octaves and their
   lengths, with everything that depends on the mood or on the bar resolved away: no track lists moods (so the bar plays whatever the
   mood), a melody's from and loop are gone and its lines are the bar's own, and a pattern's prog names only the bar's patterns. One thing
   is changed on purpose: a drone is struck once at the start of the copy and let go at its end (every is the copy's length), where in the
   chapter it rings on for the bars after it. The playtest stop `tunes` plays every copy and its chapter's score through the engine's own
   playStep and fails, naming the chapter, the track and the step, on any note that differs: so when a chapter's music is changed, its
   copy here must be taken again (src says from where).

   Where the tune's first bar is short (under two seconds) and its first phrase plainly runs over two bars, two are taken (bars:2):
   Chapters Thirteen, Fourteen, Nineteen and Twenty. The Prologue plays on Chapter One's score by moods of its own; its road plays nothing
   (mood "none"), so its bar is the harp of the house of Judas in Damascus (mood "harp"), where that road ends, and not Chapter One's.

     BARS          {pro, 1, 2, ...}: per chapter {dt, steps, group, root, scale, bars, src, tracks}, a score without its then. src: where the
                   bar comes from, {mood, bar, tracks}: the mood, the bar counted from 0 as the chapter's score counts it, and the indices
                   of the chapter score's tracks that were taken, in the order they stand here
     has(n)        whether chapter n ('pro', or a number) has its bar here
     score(n,then,o) a fresh score for setScore that plays the bar once and then hands over to then (a score); with no then it hands over
                   to a score of silence in the bar's key, because the engine plays a score round and round unless it names another
                   (stepOn). A new object each call, since then is state that a score keeps. o.even: at the look back's one level
                   (see RMS below) and not at the chapter's own
     len(n)        the bar's length in seconds (one bar, or two)

   Heard one after another, the bars are far from equally loud: where Chapter One's tune begins a drone and a drum sound under it, and
   where Chapter Twenty's begins there is a lyre and a bass. RMS is how loud each bar is by itself, in dB, as the stop `tunes` measures
   it offline (it fails when a bar has moved more than 2 dB from the number here). With o.even a bar is brought toward EVEN through the
   levels of its tracks, by 8 dB at most either way, so that no chapter is lost beside another; the notes are untouched. Since the
   chapters' own music was brought to one level (a score's gain, 2026-11-27) the bars differ by little more than their own make-up. */
SHARED.tunes=(()=>{
"use strict";
const _=null,
 BARS={
  /* the Prologue: Chapter One's score, mood "harp" (levels/prologue.js:224), the harp alone (levels/chapter1.js:42) */
  pro:{dt:.165,steps:16,root:50,scale:[0,1,4,5,7,8,10],bars:1,src:{mood:'harp',bar:0,tracks:[9]},tracks:[
   {inst:'harp',seq:{A:[0,_,_,_,4,_,_,_,2,_,_,_,0,_,_,_]},len:6,oct:12,vol:.75}]},
  /* Chapter One, D Hijaz, mood "calm", bar 8 where the ney comes in: drone, oud, drum, ney (levels/chapter1.js:22, 26, 49, 51) */
  1:{dt:.165,steps:16,root:50,scale:[0,1,4,5,7,8,10],bars:1,src:{mood:'calm',bar:8,tracks:[0,2,13,15]},tracks:[
   {drone:[-12],every:16},
   {inst:'oud',seq:{A:[3,_,5,_,7,_,5,_,3,_,5,_,9,_,7,_]}},
   {drum:1,seq:{A:'d.t...t.d...t.k.'}},
   {inst:'ney',lines:[[[0,4,6],[6,5,2],[8,4,4],[12,3,2],[14,2,2]]],oct:12}]},
  /* Chapter Two, A Dorian, mood "calm", bar 4 where the ney comes in: drone, lyre, drum, ney (levels/chapter2.js:14-17) */
  2:{dt:.19,steps:16,root:57,scale:[0,2,3,5,7,9,10],bars:1,src:{mood:'calm',bar:4,tracks:[0,1,2,3]},tracks:[
   {drone:[-12],every:16,vol:.5},
   {inst:'lyre',seq:{A:[3,_,5,_,7,_,10,_,7,_,5,_,7,_,5,_]}},
   {drum:1,seq:{A:'d.....t.d...t...'},vol:.8,group:[3,3,2,4,4]},
   {inst:'ney',lines:[[[0,4,4],[4,5,2],[6,4,2],[8,2,6]]],oct:12}]},
  /* Chapter Three, G Mixolydian, mood "calm", bar 8 where the aulos comes in: lyre, bass, drum, aulos (levels/chapter3.js:15-17, 19) */
  3:{dt:.155,steps:16,group:[3,3,2],root:55,scale:[0,2,4,5,7,9,10],bars:1,src:{mood:'calm',bar:8,tracks:[0,1,2,4]},tracks:[
   {inst:'lyre',seq:{A:[0,_,2,4,_,2,7,_,4,_,2,4,_,2,4,_]},len:2},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]},len:5},
   {drum:1,seq:{A:'d..k..t.d.k.t...'},vol:.7,group:[3,3,2,2,2,4]},
   {inst:'aulos',lines:[[[0,4,2],[2,5,2],[4,7,4],[8,5,2],[10,4,2],[12,2,4]]],oct:12}]},
  /* Chapter Four, E Aeolian, mood "hope" (the harbors): harp, bass, drum, aulos (levels/chapter4.js:33, 34, 36, 42) */
  4:{dt:.17,steps:16,group:[3,3,2],root:52,scale:[0,2,3,5,7,8,10],bars:1,src:{mood:'hope',bar:0,tracks:[0,1,3,8]},tracks:[
   {inst:'harp',seq:{A:[0,_,_,2,_,_,4,_,7,_,_,4,_,_,2,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]},len:5},
   {drum:1,seq:{A:'d.sk.st.d.sk.st.'}},
   {inst:'aulos',lines:[[[0,4,4],[4,5,2],[6,4,2],[8,2,4],[12,4,4]]],oct:12}]},
  /* Chapter Five, D Phrygian, mood "hope" (the road): lyre, bass, drum, aulos (levels/chapter5.js:19-21, 27) */
  5:{dt:.165,steps:16,root:50,scale:[0,1,3,5,7,8,10],bars:1,src:{mood:'hope',bar:0,tracks:[0,1,2,7]},tracks:[
   {inst:'lyre',seq:{A:[0,_,4,_,7,_,4,_,0,_,4,_,7,_,4,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]},len:6},
   {drum:1,seq:{A:'d.s.t.s.d.s.t.sk'}},
   {inst:'aulos',lines:[[[0,4,4],[4,5,2],[6,4,2],[8,3,4],[12,4,4]]],oct:12}]},
  /* Chapter Six, F Lydian, mood "hope" (the streets and roads; its first room is tense): lyre, bass, drum, aulos
     (levels/chapter6.js:21, 23, 24, 34) */
  6:{dt:.16,steps:16,root:53,scale:[0,2,4,6,7,9,11],bars:1,src:{mood:'hope',bar:0,tracks:[0,2,3,12]},tracks:[
   {inst:'lyre',seq:{A:[0,_,4,_,7,_,4,_,2,_,4,_,7,_,4,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]},len:6},
   {drum:1,seq:{A:'d..st.s.d.s.t.s.'}},
   {inst:'aulos',lines:[[[0,4,4],[4,3,2],[6,4,2],[8,6,4],[12,4,4]]],oct:12}]},
  /* Chapter Seven, E flat on five notes, mood "hope" (the roads; its first room is tense): lyre, bass, drum, aulos
     (levels/chapter7.js:22, 24, 25, 33) */
  7:{dt:.17,steps:16,root:51,scale:[0,2,4,7,9],bars:1,src:{mood:'hope',bar:0,tracks:[0,2,3,10]},tracks:[
   {inst:'lyre',seq:{A:[0,_,2,_,3,_,2,_,0,_,2,_,3,_,5,_]},len:3},
   {inst:'bass',seq:{A:[-5,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_]},len:6},
   {drum:1,seq:{A:'d...t.k.d.d.t...'}},
   {inst:'aulos',lines:[[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]]],oct:12}]},
  /* Chapter Eight, D Dorian in fives, mood "hope" (the roads): lyre, bass, drum, the pipes with the fifth held (levels/chapter8.js:27,
     29, 30, 40) */
  8:{dt:.23,steps:10,group:[3,2],root:50,scale:[0,2,3,5,7,9,10],bars:1,src:{mood:'hope',bar:0,tracks:[0,2,3,13]},tracks:[
   {inst:'lyre',seq:{A:[0,_,_,4,_,7,_,_,4,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,-3,_,_,_,_]},len:5},
   {drum:1,seq:{A:'d..t.d..t.'}},
   {inst:'aulos',lines:[[[0,4,3],[3,5,2],[5,4,3],[8,3,2]]],oct:12,hold:7}]},
  /* Chapter Nine, six notes from E, mood "calm" (Lydia's house): harp, bass, drum, ney (levels/chapter9.js:34-37) */
  9:{dt:.15,steps:16,root:52,scale:[0,2,3,5,7,10],bars:1,src:{mood:'calm',bar:0,tracks:[0,1,2,3]},tracks:[
   {inst:'harp',seq:{A:[0,_,4,_,6,_,4,_,2,_,4,_,6,_,4,_]},len:4,oct:12,vol:.8},
   {inst:'bass',seq:{A:[-6,_,_,_,_,_,_,_,-2,_,_,_,_,_,_,_]},len:7},
   {drum:1,seq:{A:'d.......t.......'},vol:.35},
   {inst:'ney',lines:[[[0,0,2],[2,2,2],[4,3,2],[6,4,2],[8,4,4],[12,3,4]]],oct:12,vol:.9}]},
  /* Chapter Ten, B flat major in sevens, mood "calm" (Jason's courtyard, MUSIC and not Beroea's MUSICB): lyre, bass, drum, ney
     (levels/chapter10.js:36-39) */
  10:{dt:.17,steps:14,group:[4,4,6],root:58,scale:[0,2,4,5,7,9,11],bars:1,src:{mood:'calm',bar:0,tracks:[0,1,2,3]},tracks:[
   {inst:'lyre',seq:{A:[0,_,4,_,2,_,4,_,0,_,2,_,4,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_]},len:6},
   {drum:1,seq:{A:'d...t...d..t..'},vol:.8},
   {inst:'ney',lines:[[[0,0,4],[4,2,4],[8,4,2],[10,5,2],[12,4,2]]],oct:12,vol:.9}]},
  /* Chapter Eleven, F sharp with a raised fourth, mood "market" (its rooms' "calm" is the same lyre and bass without a tune): lyre, bass,
     drum, the pipe's short tune (levels/chapter11.js:35-38) */
  11:{dt:.17,steps:12,root:54,scale:[0,2,3,6,7,9,10],bars:1,src:{mood:'market',bar:0,tracks:[0,1,2,3]},tracks:[
   {inst:'lyre',seq:{A:[0,_,_,4,_,_,2,_,_,4,_,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,-3,_,_,_,_,_]},len:5},
   {drum:1,seq:{A:'d..t..d.tt..'},vol:.7},
   {inst:'aulos',lines:[[[0,0,2],[2,2,1],[3,4,3]]],oct:12,vol:.85}]},
  /* Chapter Twelve, A flat, mood "bench": the working tune on the lyre, bass, drum (levels/chapter12.js:36-38) */
  12:{dt:.16,steps:16,root:56,scale:[0,2,4,5,7,8,10],bars:1,src:{mood:'bench',bar:0,tracks:[0,1,2]},tracks:[
   {inst:'lyre',seq:{A:[0,_,2,_,4,_,_,2,4,_,5,_,4,_,2,_]},len:3},
   {inst:'bass',seq:{A:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_]},len:6},
   {drum:1,seq:{A:'d...t...d.t.t...'},vol:.7}]},
  /* Chapter Thirteen, G in nines, mood "gap", two bars: the tune with its gap on the lyre, bass (levels/chapter13.js:44, 45) */
  13:{dt:.2,steps:9,group:[2,2,2,3],root:55,scale:[0,2,3,5,7,9,10],bars:2,src:{mood:'gap',bar:0,tracks:[0,1]},tracks:[
   {inst:'lyre',prog:'AB',seq:{A:[0,_,2,_,4,_,3,_,_],B:[4,_,6,_,4,_,2,_,_]},len:3},
   {inst:'bass',prog:'AB',seq:{A:[-7,_,_,_,_,_,-3,_,_],B:[-5,_,_,_,_,_,-7,_,_]},len:5,vol:.8}]},
  /* Chapter Fourteen, D in eights, mood "uproar" (its first rooms), two bars: the tune on the pipe, drum, bass (levels/chapter14.js:57, 58, 59) */
  14:{gain:1.29,dt:.19,steps:8,group:[3,3,2],root:50,scale:[0,2,3,5,7,9,10],bars:2,src:{mood:'uproar',bar:0,tracks:[3,4,5]},tracks:[
   {inst:'aulos',oct:12,lines:[[[0,0,1],[2,2,1],[4,3,1],[6,4,1]],[[0,5,2],[3,4,2],[6,2,1]]],vol:.55},
   {drum:1,prog:'AA',seq:{A:'d.tkd.tk'},vol:.75},
   {inst:'bass',prog:'AB',seq:{A:[-7,_,_,_,_,_,_,_],B:[-6,_,_,_,_,_,_,_]},len:6,vol:.85}]},
  /* Chapter Fifteen, six notes from C in twelves, mood "house" (the house of Gaius): lyre, bass (levels/chapter15.js:88, 89) */
  15:{gain:1.84,dt:.24,steps:12,group:[3,3,3,3],root:48,scale:[0,2,4,5,7,9],bars:1,src:{mood:'house',bar:0,tracks:[0,1]},tracks:[
   {inst:'lyre',lines:[[[0,2,2],[2,4,1],[3,2,3],[6,1,2],[8,2,1],[9,0,3]]],oct:12,vol:.8},
   {inst:'bass',lines:[[[0,0,6]]],vol:.5}]},
  /* Chapter Sixteen, C sharp in elevens, mood "quay" (the pipe that answers rests in this bar): lyre, bass (levels/chapter16.js:65, 67) */
  16:{gain:1.78,dt:.19,steps:11,group:[3,3,3,2],root:49,scale:[0,2,3,5,7,9,11],bars:1,src:{mood:'quay',bar:0,tracks:[0,2]},tracks:[
   {inst:'lyre',lines:[[[0,4,3],[3,5,3],[6,4,2],[8,2,3]]],oct:12,vol:.8},
   {inst:'bass',lines:[[[0,0,6],[6,-3,5]]],vol:.5}]},
  /* Chapter Seventeen, B minor in thirteens, mood "harbor" (the pipe rests in this bar): lyre, bass, drum (levels/chapter17.js:112, 114,
     115) */
  17:{gain:2.09,dt:.18,steps:13,group:[3,2,3,2,3],root:59,scale:[0,2,3,5,7,8,10],bars:1,src:{mood:'harbor',bar:0,tracks:[0,2,3]},tracks:[
   {inst:'lyre',lines:[[[0,0,3],[3,2,2],[5,4,3],[8,3,2],[10,2,3]]],vol:.75},
   {inst:'bass',lines:[[[0,0,8],[8,-3,5]]],oct:-12,vol:.45},
   {drum:1,seq:{A:'d..k.t..k.t..'},vol:.2}]},
  /* Chapter Eighteen, F minor in fifteens, mood "arrive" (at Mnason's; the harp rests in this bar): lyre, bass (levels/chapter18.js:117, 119
     114) */
  18:{gain:2.32,dt:.17,steps:15,group:[3,2,3,2,3,2],root:53,scale:[0,2,3,5,7,8,10],bars:1,src:{mood:'arrive',bar:0,tracks:[0,2]},tracks:[
   {inst:'lyre',oct:12,lines:[[[0,0,3],[3,2,2],[5,3,3],[8,4,2],[10,2,3],[13,3,2]]],vol:.62},
   {inst:'bass',oct:0,lines:[[[0,0,8],[8,-3,7]]],vol:.32}]},
  /* Chapter Nineteen, E Phrygian in sevens, mood "council", two bars: lyre, bass, the low held note (levels/chapter19.js:106, 107, 108) */
  19:{gain:2.63,dt:.2,steps:7,group:[2,2,3],root:52,scale:[0,1,3,5,7,8,10],bars:2,src:{mood:'council',bar:0,tracks:[0,1,2]},tracks:[
   {inst:'lyre',oct:12,lines:[[[0,0,2],[2,1,2],[4,2,3]],[[0,3,4],[4,4,3]]],vol:.5},
   {inst:'bass',oct:0,lines:[[[0,0,7]],[[0,-4,7]]],vol:.3},
   {drone:[0],every:14,vol:.05}]},
  /* Chapter Twenty, B Dorian in sixes, mood "court", two bars (the harp rests in them): lyre, bass (levels/chapter20.js:101, 103) */
  20:{gain:3.02,dt:.22,steps:6,group:[3,3],root:47,scale:[0,2,3,5,7,9,10],bars:2,src:{mood:'court',bar:0,tracks:[0,2]},tracks:[
   {inst:'lyre',oct:12,lines:[[[0,0,2],[2,2,1],[3,4,3]],[[0,5,2],[2,4,1],[3,3,1],[4,2,1],[5,3,1]]],vol:.5},
   {inst:'bass',oct:0,lines:[[[0,0,6]],[[0,-4,6]]],vol:.26}]},
  /* Chapter Twenty-One, A Aeolian in twenties, mood "court" (the harp rests in this bar): lyre, bass (levels/chapter21.js:98, 100) */
  21:{gain:2.92,dt:.12,steps:20,group:[3,3,4,3,3,4],root:57,scale:[0,2,3,5,7,8,10],bars:1,src:{mood:'court',bar:0,tracks:[0,2]},tracks:[
   {inst:'lyre',oct:12,lines:[[[0,0,3],[3,2,3],[6,4,4],[10,3,3],[13,2,3],[16,4,4]]],vol:.52},
   {inst:'bass',oct:0,lines:[[[0,0,20]]],vol:.26}]},
  /* Chapter Twenty-Two, A harmonic major in twenty-ones that fall 6, 6, 9, a seventh of a second to the step, mood "quay" (the harp rests
     in this bar): lyre, frame drum, low string (levels/chapter22.js:121, 123, 126) */
  22:{gain:2.45,dt:.14285714285714285,steps:21,group:[6,6,9],root:45,scale:[0,2,4,5,7,8,11],bars:1,src:{mood:'quay',bar:0,tracks:[0,2,5]},tracks:[
   {inst:'lyre',oct:24,lines:[[[0,0,2],[2,2,1],[3,4,3],[6,5,2],[8,4,1],[9,3,3],[12,2,6],[18,1,3]]],vol:.5},
   {drum:1,seq:{A:'d.....k.....d..k..k..'},vol:.2},
   {inst:'bass',lines:[[[0,0,12],[12,-3,9]]],vol:.4}]},
  /* Chapter Twenty-Three, B-flat harmonic minor in eighteens that fall 4, 5, 4, 5, mood "night": the harp, and the low string's one note
     to the bar (levels/chapter23.js:106, 107) */
  23:{gain:3.59,dt:.15,steps:18,group:[4,5,4,5],root:46,scale:[0,2,3,5,7,8,11],bars:1,src:{mood:'night',bar:0,tracks:[0,1]},tracks:[
   {inst:'harp',oct:12,lines:[[[0,0,4],[4,2,5],[9,4,4],[13,3,5]]],vol:.34},
   {inst:'bass',oct:0,lines:[[[0,0,18]]],vol:.2}]},
  /* Chapter Twenty-Four, C major in fifteens that fall 5, 5, 5, the bar of the walk, mood "quay" (the harp rests in this bar): lyre, low
     string (levels/chapter24.js:101, 103) */
  24:{gain:3.7,dt:.2,steps:15,group:[5,5,5],root:60,scale:[0,2,4,5,7,9,11],bars:1,src:{mood:'quay',bar:0,tracks:[0,2]},tracks:[
   {inst:'lyre',oct:0,lines:[[[0,0,5],[5,2,5],[10,4,5]]],vol:.44},
   {inst:'bass',oct:-12,lines:[[[0,0,15]]],vol:.22}]},
  /* Chapter Twenty-Five, A-flat Mixolydian in seventeens that fall 4, 4, 4, 5, mood "lodging": the lyre, the harp that rocks under it and
     the low string (levels/chapter25.js:117, 118, 119) */
  25:{gain:4.0,dt:.19,steps:17,group:[4,4,4,5],root:44,scale:[0,2,4,5,7,9,10],bars:1,src:{mood:'lodging',bar:0,tracks:[0,1,2]},tracks:[
   {inst:'lyre',oct:12,lines:[[[0,0,4],[4,2,4],[8,4,4],[12,5,5]]],vol:.48},
   {inst:'harp',oct:12,lines:[[[0,0,4],[8,4,4]]],vol:.28},
   {inst:'bass',oct:0,lines:[[[0,0,8],[8,4,9]]],vol:.24}]}},
 has=n=>Object.prototype.hasOwnProperty.call(BARS,n),
 len=n=>{const b=BARS[n];return b.bars*b.steps*b.dt},
 /* the silence that follows a bar: a score with no tracks, in the bar's key (setScore keeps the key of the last score, see AU.key) */
 hush=b=>({dt:b.dt,steps:b.steps,root:b.root,scale:b.scale,bars:1,tracks:[]}),
 RMS={pro:-35.2,1:-20.2,2:-23.1,3:-27.9,4:-28.3,5:-28.2,6:-28.3,7:-28.6,8:-27.9,9:-23.9,10:-25.1,11:-30.2,12:-30.5,13:-30.7,14:-29.7,15:-29.9,16:-29.8,
  17:-28.4,18:-29.2,19:-28.5,20:-28.9,21:-27.7,22:-28.5,23:-30.2,24:-31.2,25:-29.4},EVEN=-29,
 gain=n=>RMS[n]==null?1:Math.pow(10,clamp(EVEN-RMS[n],-8,8)/20),
 score=(n,then,o)=>{const b=BARS[n],k=o&&o.even?gain(n):1;
  return Object.assign({},b,{tracks:k===1?b.tracks:b.tracks.map(t=>Object.assign({},t,{vol:(t.vol==null?1:t.vol)*k})),then:then||hush(b)})};
return{BARS,RMS,EVEN,has,score,len,gain}})();
