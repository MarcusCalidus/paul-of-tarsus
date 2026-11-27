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
   the strings take its second half while voices hum and the great drum begins to walk, and climb on through the theme's rising phrase
   (its third and fourth bars, to the A held over D) under the trailer's puzzles; a roll, an impact, and the key lifts a step
   for the theme on strings, horns and voices: its first half, its first half once more with the low horns under it (four bars added on
   2026-11-26, when the trailer took in the last chapters; the maintainer asked for about twelve seconds more), and then its second half,
   the height. Then A's breath and the theme's last turn, the final chord under the title, and the harp as it dies away. The theme's harmony is the overture's, with the minor fourth (G minor) under its third bar, bittersweet
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
 TR.SCORE={name:'D',title:'The Road in the Light',dt:.1875,root:50,scale:HIJAZ,bars:32,tail:5,trans:[[14,2]],
  sections:[[0,'the harp'],[4,'the ney'],[8,'the strings'],[11,'the puzzles'],[14,'a step higher'],[18,'once more'],[22,'the height'],[26,'a breath'],[27,'the last turn'],[29,'the title']],
  tracks:[
  {name:'sub',inst:'sub',oct:-12,vol:.9,env:[[4,.5],[14,1]],lines:hold('........ '+TH+' '+TL+' GGDD |'+TH+' '+TH+' '+TL+' '+END,RT)},
  {name:'basses',inst:'str',vol:.8,bright:2.2,env:[[4,.6],[8,.8],[14,1]],lines:hold('........ '+TH+' '+TL+' GGDD |'+TH+' '+TH+' '+TL+' '+END,RT2)},
  {name:'violas',inst:'str',vol:.6,env:[[2,.35],[8,.8],[14,1]],lines:hold('....GGDD '+TH+' '+TL+' GGDD |'+TH+' '+TH+' '+TL+' '+END,CH)},
  {name:'violins',inst:'str',oct:12,vol:.85,bright:3.4,env:[[8,.75],[12,.8],[14,1]],lines:join(from(8,T1.slice(4)),from(12,T1.slice(2,4)),from(14,T1.slice(0,4)),from(18,T1),{26:[[0,11,16,.5]],27:L17,28:L18,29:[[0,[7,9,11],40]]})},
  {name:'violins low',inst:'str',vol:.5,lines:join(from(14,T1.slice(0,4)),from(18,T1),{27:L17,28:L18})},
  {name:'ney',inst:'ney',oct:12,vol:.6,room:.5,lines:join(from(4,T1.slice(0,4)),{30:[[0,4,6,.55],[6,5,2,.55],[8,4,8,.55]],31:[[0,7,16,.5]]})},
  {name:'harp',inst:'harp',vol:1.1,room:.45,prog:'DDGD DDGD EYGD GD DDGDDDGDEYGD . GX ZZ.',seq:HA,lines:{26:SWEEP}},
  {name:'horns',inst:'horn',vol:.9,lines:join(from(8,CT),{12:[[0,5,16,.6]],13:[[0,4,16,.65]]},from(14,T1.slice(0,4)),from(18,T1),{27:L17,28:L18,29:[[0,[0,4],40]]})},
  {name:'horns low',inst:'horn',oct:-12,vol:.7,lines:join(from(18,T1),{27:L17,28:L18})},
  {name:'choir oo',inst:'choir',oct:12,vow:'o',vol:.6,lines:hold('........ ........ '+TL+' GGDD',CH)},
  {name:'choir',inst:'choir',oct:12,vow:'a',vol:.85,lines:hold('........ ........ ........ .... |'+TH+' '+TH+' '+TL+' '+END,CH)},
  {name:'spiccato',inst:'spic',vol:.7,env:[[12,.35],[14,.7],[18,.85],[22,1]],prog:'........ .... GD DDGDDDGDEYGD . GX ...',seq:SP},
  {name:'great drums',drum:1,vol:.9,env:[[8,.55],[13,.8],[14,.85],[18,.92],[22,1]],prog:'........ QQQQQF RRRRRRRFRRRF . RF X..',
   seq:{Q:'G.......g...g...',F:'G...g...G.g.GgGg',R:'G..gG...G..gG.g.',X:'G...............'}},
  {name:'timpani',inst:'timp',vol:.9,env:[[8,.6],[14,1]],prog:'........ EYGD GD DDGDDDGDEYGD . GX Z..',seq:TP},
  {name:'roll',inst:'roll',vol:.7,lines:{13:[[0,-7,16]],21:[[8,-7,8]],28:[[8,-6,8]]}},
  {name:'braam',inst:'braam',vol:.5,lines:{14:[[0,[-7,-3],16]],29:[[0,[-7,-3],32]]}},
  {name:'cymbal',drum:1,vol:2,prog:'b.b. .... .... .. ............ . .. .b.',seq:{b:'b...............'}},
  {name:'cuts',fx:[[3,8,'swell',8,.35],[13,0,'riser',16,.9],[14,0,'boom',0,.9],[17,8,'swell',8,.4],[22,0,'boom',0,.5],[23,0,'boom',0,.45],[26,0,'riser',16,1],[27,0,'boom',0,.7],[28,8,'swell',8,.7],[29,0,'boom',0,1.1]]}]};

 /* The same score cut down to eighteen bars (57 seconds), for the upright film of a phone's status (the cut "status" in
    tools/trailer/shots.js; the maintainer asked for the trailer's music, shorter, on 2026-11-26). Nothing in it is new: every bar is a
    bar of the score above, with its own voices, and only the way from one to the next is shorter. The ney begins at once with the
    theme's first half over the harp (bars 4 to 7 above); the strings climb through its rising phrase to the roll and the riser (12, 13);
    the key lifts a step for the theme on strings, horns and voices, its first half (14 to 17) and then its second, the height (22 to
    25), where the low horns come in; the last turn follows without the breath (27, 28), a riser under the height's last bar in its
    place; and the final chord stands under the title for two bars (29, 30). */
 const END2='GG DE D---',LAST=[[0,4,6,.55],[6,5,2,.55],[8,4,8,.55]];
 TR.SCORES.trailer=TR.SCORE;
 TR.SCORES.status={name:'S',title:'The Road in the Light (the short cut)',dt:.1875,root:50,scale:HIJAZ,bars:18,tail:3,trans:[[6,2]],
  sections:[[0,'the ney'],[4,'the climb'],[6,'a step higher'],[10,'the height'],[14,'the last turn'],[16,'the title']],
  tracks:[
  {name:'sub',inst:'sub',oct:-12,vol:.9,env:[[0,.5],[6,1]],lines:hold(TH+' GGDD |'+TH+' '+TL+' '+END2,RT)},
  {name:'basses',inst:'str',vol:.8,bright:2.2,env:[[0,.6],[4,.8],[6,1]],lines:hold(TH+' GGDD |'+TH+' '+TL+' '+END2,RT2)},
  {name:'violas',inst:'str',vol:.6,env:[[0,.5],[4,.8],[6,1]],lines:hold(TH+' GGDD |'+TH+' '+TL+' '+END2,CH)},
  {name:'violins',inst:'str',oct:12,vol:.85,bright:3.4,env:[[4,.8],[6,1]],lines:join(from(4,T1.slice(2,4)),from(6,T1),{14:L17,15:L18,16:[[0,[7,9,11],28]]})},
  {name:'violins low',inst:'str',vol:.5,lines:join(from(6,T1),{14:L17,15:L18})},
  {name:'ney',inst:'ney',oct:12,vol:.6,room:.5,lines:join(from(0,T1.slice(0,4)),{17:LAST})},
  {name:'harp',inst:'harp',vol:1.1,room:.45,prog:'DDGD GD DDGD EYGD GX ZZ',seq:HA},
  {name:'horns',inst:'horn',vol:.9,lines:join({4:[[0,5,16,.6]],5:[[0,4,16,.65]]},from(6,T1),{14:L17,15:L18,16:[[0,[0,4],28]]})},
  {name:'horns low',inst:'horn',oct:-12,vol:.7,lines:join(from(10,T1.slice(4)),{14:L17,15:L18})},
  {name:'choir oo',inst:'choir',oct:12,vow:'o',vol:.6,lines:hold('........ GGDD',CH)},
  {name:'choir',inst:'choir',oct:12,vow:'a',vol:.85,lines:hold('........ .... |'+TH+' '+TL+' '+END2,CH)},
  {name:'spiccato',inst:'spic',vol:.7,env:[[4,.35],[6,.75],[10,1]],prog:'.... GD DDGD EYGD GX ..',seq:SP},
  {name:'great drums',drum:1,vol:.9,env:[[4,.6],[5,.8],[6,.88],[10,1]],prog:'.... QF RRRF RRRF RF X.',
   seq:{Q:'G.......g...g...',F:'G...g...G.g.GgGg',R:'G..gG...G..gG.g.',X:'G...............'}},
  {name:'timpani',inst:'timp',vol:.9,env:[[4,.7],[6,1]],prog:'.... GD DDGD EYGD GX Z.',seq:TP},
  {name:'roll',inst:'roll',vol:.7,lines:{5:[[0,-7,16]],9:[[8,-7,8]],15:[[8,-6,8]]}},
  {name:'braam',inst:'braam',vol:.5,lines:{6:[[0,[-7,-3],16]],16:[[0,[-7,-3],28]]}},
  {name:'cymbal',drum:1,vol:2,prog:'.... .. .... .... .. .b',seq:{b:'b...............'}},
  {name:'cuts',fx:[[5,0,'riser',16,.9],[6,0,'boom',0,.9],[9,8,'swell',8,.4],[10,0,'boom',0,.5],[11,0,'boom',0,.45],[13,0,'riser',16,.7],[14,0,'boom',0,.7],[15,8,'swell',8,.7],[16,0,'boom',0,1.1]]}]}}
})();
