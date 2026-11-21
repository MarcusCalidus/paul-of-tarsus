/* Paul of Tarsus: the trailer's score, "The Road in the Light" (see tools/trailer/music.js for the format). It is the Chapter One theme
   of the overture, in D Hijaz, played the way a hopeful film score would play it, and the trailer's cuts follow its bars: each bar is
   three seconds (16 steps of 0.1875 s), from 0.25 s on. The maintainer chose it on 2026-11-21 from drafts: the theme as a trailer (A)
   and a hopeful tune in D Mixolydian (C), blended (D). */
(()=>{
"use strict";
const _=null,{hold,from,join}=TR;

/* The Chapter One theme in D Hijaz, as the ney plays it in the overture (shared/splash.js): eight bars, [step, degree, length] */
const HIJAZ=[0,1,4,5,7,8,10];
const T1=[[[0,4,6],[6,5,2],[8,4,4],[12,3,2],[14,2,2]],[[0,3,4],[4,2,2],[6,1,2],[8,0,8]],[[0,2,4],[4,3,2],[6,4,2],[8,5,4],[12,4,4]],[[0,4,12]],
  [[0,7,6],[6,6,2],[8,5,4],[12,4,4]],[[0,5,2],[2,4,2],[4,3,4],[8,2,4],[12,1,4]],[[0,2,3],[3,1,1],[4,0,4],[8,1,2],[10,2,2],[12,1,4]],[[0,0,14]]];
/* the overture's rising harp sweep; the theme's last turn: down from the octave, then onto the tonic through the second step (bII to I,
   the cadence of Hijaz) */
const SWEEP=[[0,4,2],[2,7,2],[4,9,2],[6,11,2],[8,14,8]],L17=[[0,7,6],[6,6,2],[8,5,4],[12,4,4]],L18=[[0,3,4],[4,2,4],[8,1,8]];

/* The sections: a harp alone, then the ney with the theme's first half over the harp;
   the strings take its second half while voices hum and the great drum begins to walk; a roll, an impact, and the key lifts a step
   for the whole theme on strings, horns and voices. Then A's breath and the theme's last turn, the final chord under the title, and
   the harp as it dies away. The theme's harmony is the overture's, with the minor fourth (G minor) under its third bar, bittersweet
   between the major chords. */
{/* D major, G minor over D, E flat, D over A; X: D then E flat */
 const CH={D:[0,2,4],G:[0,3,5],E:[1,3,5],A:[0,2,4]},RT={D:-7,G:-4,E:-6,A:-3},RT2={D:[-7,0],G:[-4,3],E:[-6,1],A:[-3,0]};
 /* the harp's broken chords, two notes a beat; Z: the final chord, slowly downwards */
 const HA={D:[0,_,4,_,7,_,9,_,11,_,9,_,7,_,4,_],G:[-4,_,0,_,3,_,5,_,7,_,5,_,3,_,0,_],E:[-6,_,1,_,3,_,5,_,-3,_,0,_,4,_,7,_],
   Y:[-4,_,0,_,3,_,5,_,0,_,4,_,7,_,9,_],X:[0,_,4,_,7,_,9,_,-6,_,1,_,3,_,5,_],Z:[11,_,_,_,9,_,_,_,7,_,_,_,4,_,_,_]};
 const SP={D:[0,_,0,0,7,_,0,0,0,_,0,0,7,_,0,0],G:[-4,_,-4,-4,3,_,-4,-4,-4,_,-4,-4,3,_,-4,-4],E:[-6,_,-6,-6,1,_,-6,-6,-3,_,-3,-3,4,_,-3,-3],
   Y:[-4,_,-4,-4,3,_,-4,-4,0,_,0,0,7,_,0,0],X:[0,_,0,0,7,_,0,0,-6,_,-6,-6,1,_,-6,-6]};
 const TP={D:[-7],G:[-4],E:[-6,_,_,_,_,_,_,_,-3],Y:[-4,_,_,_,_,_,_,_,-7],X:[-7,_,_,_,_,_,_,_,-6],Z:[-7]};
 /* the horns' counter-line under the strings, in long notes */
 const CT=[[[0,3,8,.6],[8,2,8,.6]],[[0,5,8,.6],[8,4,8,.6]],[[0,3,16,.6]],[[0,2,16,.6]]];
 /*            harp      ney      strings  | a step higher            breath last  title */
 const TH='DDDDGGDD',TL='EAGDGGDD',END='.. GG DE D-----';
 TR.SCORE={name:'D',title:'The Road in the Light',dt:.1875,root:50,scale:HIJAZ,bars:26,tail:5,trans:[[12,2]],
  sections:[[0,'the harp'],[4,'the ney'],[8,'the strings'],[12,'a step higher'],[16,'the height'],[20,'a breath'],[21,'the last turn'],[23,'the title']],
  tracks:[
  {name:'sub',inst:'sub',oct:-12,vol:.9,env:[[4,.5],[12,1]],lines:hold('........ '+TH+' '+TL+' |'+TH+' '+TL+' '+END,RT)},
  {name:'basses',inst:'str',vol:.8,bright:2.2,env:[[4,.6],[8,.8],[12,1]],lines:hold('........ '+TH+' '+TL+' |'+TH+' '+TL+' '+END,RT2)},
  {name:'violas',inst:'str',vol:.6,env:[[2,.35],[8,.8],[12,1]],lines:hold('....GGDD '+TH+' '+TL+' |'+TH+' '+TL+' '+END,CH)},
  {name:'violins',inst:'str',oct:12,vol:.85,bright:3.4,env:[[8,.75],[12,1]],lines:join(from(8,T1.slice(4)),from(12,T1),{20:[[0,11,16,.5]],21:L17,22:L18,23:[[0,[7,9,11],40]]})},
  {name:'violins low',inst:'str',vol:.5,lines:join(from(12,T1),{21:L17,22:L18})},
  {name:'ney',inst:'ney',oct:12,vol:.6,room:.5,lines:join(from(4,T1.slice(0,4)),{24:[[0,4,6,.55],[6,5,2,.55],[8,4,8,.55]],25:[[0,7,16,.5]]})},
  {name:'harp',inst:'harp',vol:1.1,room:.45,prog:'DDGD DDGD EYGD DDGDEYGD . GX ZZ.',seq:HA,lines:{20:SWEEP}},
  {name:'horns',inst:'horn',vol:.9,lines:join(from(8,CT),from(12,T1),{21:L17,22:L18,23:[[0,[0,4],40]]})},
  {name:'horns low',inst:'horn',oct:-12,vol:.7,lines:join(from(16,T1.slice(4)),{21:L17,22:L18})},
  {name:'choir oo',inst:'choir',oct:12,vow:'o',vol:.6,lines:hold('........ ........ '+TL,CH)},
  {name:'choir',inst:'choir',oct:12,vow:'a',vol:.85,lines:hold('........ ........ ........ |'+TH+' '+TL+' '+END,CH)},
  {name:'spiccato',inst:'spic',vol:.7,env:[[12,.7],[16,1]],prog:'........ .... DDGDEYGD . GX ...',seq:SP},
  {name:'great drums',drum:1,vol:.9,env:[[8,.55],[11,.8],[12,.85],[16,1]],prog:'........ QQQF RRRRRRRF . RF X..',
   seq:{Q:'G.......g...g...',F:'G...g...G.g.GgGg',R:'G..gG...G..gG.g.',X:'G...............'}},
  {name:'timpani',inst:'timp',vol:.9,env:[[8,.6],[12,1]],prog:'........ EYGD DDGDEYGD . GX Z..',seq:TP},
  {name:'roll',inst:'roll',vol:.7,lines:{11:[[0,-7,16]],22:[[8,-6,8]]}},
  {name:'braam',inst:'braam',vol:.5,lines:{12:[[0,[-7,-3],16]],23:[[0,[-7,-3],32]]}},
  {name:'cymbal',drum:1,vol:2,prog:'b.b. .... .... ........ . .. .b.',seq:{b:'b...............'}},
  {name:'cuts',fx:[[3,8,'swell',8,.35],[11,0,'riser',16,.9],[12,0,'boom',0,.9],[16,0,'boom',0,.5],[20,0,'riser',16,1],[21,0,'boom',0,.7],[22,8,'swell',8,.7],[23,0,'boom',0,1.1]]}]}}
})();
