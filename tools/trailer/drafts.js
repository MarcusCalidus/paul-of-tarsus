/* Paul of Tarsus: drafts of the trailer's score, to choose from (see tools/trailer/music.js for the format). Each has the whole shape
   of a trailer: a quiet opening, a build, the climax, and the last hit under the title. */
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

/* ============ A. The Road: the Chapter One theme, in D Hijaz, grown into a trailer ============
   The ney plays the theme alone over a drone (the theme as the ney has it in the overture, shared/splash.js); the low strings start to
   bounce under its second half and the frame drums come in; a riser and an impact, and the whole theme returns on horns with strings,
   voices and great drums, the violins an octave above for its second half. A breath of silence, a harp sweep, the theme's last turn on
   everyone, and the final chord under the title. */
{
 /* the overture's harp under the theme, and its rising sweep */
 const HP=[[[4,4,4],[12,8,4]],[[4,3,4],[8,7,6]],[[4,4,4],[12,9,4]],[[4,7,2],[6,8,2],[8,9,2],[10,11,6]],
   [[2,4,2],[4,7,2],[6,11,2],[10,9,2],[12,7,4]],[[2,5,2],[4,7,2],[6,9,2],[10,7,2],[12,4,4]],[[2,4,2],[6,7,2],[10,5,2],[14,4,2]],[[0,0,2],[2,4,2],[4,7,4],[8,14,8]]];
 const END=[[0,0,2],[2,4,2],[4,7,4],[8,14,8]];
 /* chords: D major, G minor over D, E flat; A is D over its fifth. Basses: their roots. */
 const CH={D:[0,2,4],G:[0,3,5],E:[1,3,5],A:[0,2,4]},RT={D:-7,G:-4,E:-6,A:-3};
 /*           intro       build       climax      climax 2   brk last  final */
 const H='........ EADDGGDD DDDDGGDD EADDGGDD .. GG DE D-----',HX='DDDDGGDD EADDGGDD DDDDGGDD EADDGGDD .. GG DE D-----';
 const SP={D:[-7,_,-7,-7,0,_,-7,-7,-3,_,-7,-7,0,_,-3,_],G:[-4,_,-4,-4,3,_,-4,-4,-7,_,-4,-4,3,_,-7,_],
   E:[-6,_,-6,-6,1,_,-6,-6,-3,_,-3,-3,0,_,-3,_],X:[-7,_,-7,-7,0,_,-7,-7,-6,_,-6,-6,1,_,-6,_]};
 TR.SCORES.A={name:'A',title:'The Road',dt:.165,root:50,scale:HIJAZ,bars:22,tail:5,
  sections:[[0,'the theme alone'],[4,'the build'],[8,'the theme in full'],[12,'higher'],[16,'a breath'],[17,'the last turn'],[19,'the title']],
  tracks:[
  {name:'sub',inst:'sub',oct:-12,vol:.9,env:[[0,.22],[4,.45],[8,1]],lines:hold(HX,RT)},
  {name:'drone',inst:'str',vol:.32,bright:2.2,lines:{0:[[0,[-7,-3,0],64]]},env:[[0,.5],[2,1]]},
  {name:'basses',inst:'str',vol:.9,bright:2.4,env:[[4,.6],[8,1]],lines:hold(H,RT)},
  {name:'violas',inst:'str',vol:.6,env:[[4,.5],[8,1]],lines:hold(H,CH)},
  {name:'violins',inst:'str',oct:12,vol:.8,bright:3.4,lines:join(from(12,T1.slice(4)),{16:[[0,11,16,.5]],17:L17,18:L18,19:[[0,[7,9,11],40]]})},
  {name:'ney',inst:'ney',oct:12,vol:.5,room:.45,lines:join(from(0,T1),{20:[[4,7,24,.7]]})},
  {name:'aulos',inst:'aulos',oct:12,vol:1.6,lines:{6:T1[6],7:T1[7]}},
  {name:'harp',inst:'harp',oct:12,vol:.75,room:.4,lines:join(from(0,HP),{16:SWEEP,20:END})},
  {name:'spiccato',inst:'spic',vol:.9,env:[[4,.35],[8,.8],[12,1]],prog:'.... EDGD DDGD EDGD . GX ...',seq:SP},
  {name:'horns',inst:'horn',vol:1,lines:join(from(8,T1),{17:L17,18:L18,19:[[0,[0,4],40]]})},
  {name:'horns low',inst:'horn',oct:-12,vol:.8,lines:join(from(8,T1),{17:L17,18:L18})},
  {name:'choir',inst:'choir',oct:12,vol:.8,vow:'a',env:[[8,.6],[12,1]],lines:hold('........ ........ DDDDGGDD EADDGGDD .. GG DE D-----',CH)},
  {name:'great drums',drum:1,vol:1,env:[[0,.45],[4,.6],[7,.8],[8,1]],prog:'gggg BBBF CCCC CCCF . CF X..',
   seq:{g:'g...............',B:'G.......g...g...',C:'G..g..G.G..g.Gg.',F:'G.g.G.g.GgGgGGGG',X:'G...............'}},
  {name:'frame drums',drum:1,vol:1.6,prog:'.... AAAA AAAB AAAB . AB ...',seq:{A:'d.skt.s.d.skt.sk',B:'d.skt.s.d.tktktk'}},
  {name:'timpani',inst:'timp',vol:1,prog:'.... .... DDGD EDGD . GX Z..',
   seq:{D:[-7,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],G:[-4,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],E:[-6,_,_,_,_,_,_,_,-3,_,_,_,_,_,_,_],X:[-7,_,_,_,_,_,_,_,-6,_,_,_,_,_,_,_],Z:[-7]}},
  {name:'roll',inst:'roll',vol:.8,lines:{7:[[0,-7,16]],18:[[8,-6,8]]}},
  {name:'braam',inst:'braam',vol:1,lines:{8:[[0,[-7,-3],20]],12:[[0,[-6,-2],20]],17:[[0,[-4,0],16]],19:[[0,[-7,-3,0],40]]}},
  {name:'cymbal',drum:1,vol:2.2,prog:'b... .... .... .... . .. .b.',seq:{b:'b.......b.......'}},
  {name:'cuts',fx:[[6,0,'riser',32,.8],[16,0,'riser',16,1],[18,8,'swell',8,.8],[8,0,'boom',0,1],[12,0,'boom',0,.6],[17,0,'boom',0,.7],[19,0,'boom',0,1.2]]}]}}

/* ============ C. A Light of Nations: hopeful, in D Mixolydian ============
   A harp alone, then the ney with a new tune over it; the strings take the tune, warm voices hum under it and the great drum begins to
   walk; a timpani roll, and the key lifts a step for the climax, where the tune climbs to its highest note on strings, horns and voices.
   The last chord under the title, and the harp again as it dies away. */
{const MIXO=[0,2,4,5,7,9,10];
 /* D, B minor, G over D, C (E G C); C then D in the last bar of each phrase */
 const CH={D:[0,2,4],b:[-2,0,2],G:[0,3,5],C:[1,3,6]},RT={D:[-7,0],b:[-9,-2],G:[-11,-4],C:[-8,-1]},SUB={D:-7,b:-9,G:-11,C:-8};
 const h=[[[0,4,6],[6,5,2],[8,7,8]],[[0,9,6],[6,8,2],[8,7,4],[12,5,4]],[[0,3,4],[4,5,4],[8,7,4],[12,8,4]],[[0,10,6],[6,9,2],[8,8,4],[12,7,4]]];
 const k=[[[0,4,6],[6,5,2],[8,7,6],[14,8,2]],[[0,9,8],[8,8,4],[12,7,4]],[[0,5,4],[4,7,4],[8,10,8]],[[0,8,4],[4,6,4],[8,7,8]]];
 /* the horns' counter-line under the strings, in long notes */
 const CT=[[[0,2,16,.6]],[[0,2,16,.6]],[[0,3,16,.6]],[[0,3,8,.6],[8,2,8,.6]]];
 const HA={D:[0,_,4,_,7,_,9,_,11,_,9,_,7,_,4,_],b:[-2,_,2,_,5,_,7,_,9,_,7,_,5,_,2,_],G:[-4,_,0,_,3,_,5,_,7,_,5,_,3,_,0,_],
   X:[-1,_,3,_,6,_,8,_,0,_,4,_,7,_,9,_],E:[11,_,_,_,9,_,_,_,7,_,_,_,4,_,_,_]};
 const SP={D:[0,_,0,0,7,_,0,0,0,_,0,0,7,_,0,0],b:[-2,_,-2,-2,5,_,-2,-2,-2,_,-2,-2,5,_,-2,-2],G:[-4,_,-4,-4,3,_,-4,-4,-4,_,-4,-4,3,_,-4,-4],
   X:[-1,_,-1,-1,6,_,-1,-1,0,_,0,0,7,_,0,0]};
 /*          bars 0-3   4-7      8-11      | 12-15 (a step higher)  16-19 */
 const loop='DDbbGGCD';
 TR.SCORES.C={name:'C',title:'A Light of Nations',dt:.1875,root:50,scale:MIXO,bars:20,tail:5,trans:[[12,2]],
  sections:[[0,'the harp'],[4,'the ney'],[8,'the strings'],[12,'a step higher'],[16,'the title']],
  tracks:[
  {name:'sub',inst:'sub',vol:.8,lines:hold('........ '+loop+' '+loop+' |'+loop+' D-----..',SUB)},
  {name:'basses',inst:'str',vol:.8,bright:2.2,env:[[4,.6],[8,.8],[12,1]],lines:hold('........ '+loop+' '+loop+' |'+loop+' D-----..',RT)},
  {name:'violas',inst:'str',vol:.6,env:[[2,.35],[8,.8],[12,1]],lines:hold('....GGCD '+loop+' '+loop+' |'+loop+' D-----..',CH)},
  {name:'violins',inst:'str',oct:12,vol:.85,bright:3.4,env:[[8,.75],[12,1]],lines:join(from(8,h),from(12,k),{16:[[0,[7,9,11],40]]})},
  {name:'violins low',inst:'str',vol:.5,lines:from(12,k)},
  {name:'ney',inst:'ney',oct:12,vol:.75,room:.5,lines:join(from(4,h),{17:[[4,4,6,.6],[10,5,2,.6]],18:[[0,7,24,.6]]})},
  {name:'harp',inst:'harp',vol:1.1,room:.45,prog:'DbGX DbGX DbGX DbGX EE..',seq:HA},
  {name:'horns',inst:'horn',vol:.9,lines:join(from(8,CT),from(12,k),{16:[[0,[0,4],40]]})},
  {name:'choir oo',inst:'choir',oct:12,vow:'o',vol:.6,lines:hold('........ ........ '+loop+' ........ ........',CH)},
  {name:'choir',inst:'choir',oct:12,vow:'a',vol:.85,lines:hold('........ ........ ........ |'+loop+' D-----..',CH)},
  {name:'spiccato',inst:'spic',vol:.7,prog:'............ DbGX ....',seq:SP},
  {name:'great drums',drum:1,vol:.9,env:[[6,.55],[8,.7],[11,.85],[12,1]],prog:'...... gg QQQF RRRF X...',
   seq:{g:'g.......g.......',Q:'G.......g...g...',F:'G...g...G.g.GgGg',R:'G..gG...G..gG.g.',X:'G...............'}},
  {name:'timpani',inst:'timp',vol:.9,env:[[8,.6],[12,1]],prog:'........ DbGX DbGX Z...',
   seq:{D:[-7,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],b:[-2,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],G:[-4,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],X:[-1,_,_,_,_,_,_,_,-7,_,_,_,_,_,_,_],Z:[-7]}},
  {name:'roll',inst:'roll',vol:.7,lines:{7:[[8,-7,8]],11:[[0,-7,16]]}},
  {name:'braam',inst:'braam',vol:.55,lines:{16:[[0,[-7,-3],32]]}},
  {name:'cymbal',drum:1,vol:2,prog:'b.b. .... .... .... .b..',seq:{b:'b...............'}},
  {name:'cuts',fx:[[3,8,'swell',8,.35],[11,0,'riser',16,.9],[15,8,'swell',8,.6],[12,0,'boom',0,.9],[16,0,'boom',0,1.1]]}]}}

/* ============ D. The Road in the light: A's theme in C's mood ============
   The theme of A, in D Hijaz, played the way C plays its tune: a harp alone, then the ney with the theme's first half over the harp;
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
 TR.SCORES.D={name:'D',title:'The Road in the Light',dt:.1875,root:50,scale:HIJAZ,bars:26,tail:5,trans:[[12,2]],
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
