/* Paul of Tarsus: reusable character looks shared across Chapters Eighteen to Twenty-Five (loaded on demand with need('cast')).
   - ROMAN: Roman foot soldiers (lorica segmentata & lorica hamata), centurions (molded cuirass, transverse crest, officer cloak), the
     commander of the Jerusalem garrison (a military tribune: tunic with the narrow purple stripe, cuirass, gold ring),
     and Praetorian Guard (inside-Rome watch tunic + military belt/caligae/gladius, formal Roman toga + caligae, and full armored duty).
   - shipwrecked(look, opts): turns any look into wet, torn shipwreck survivor clothing for Acts 27-28 (Chapter Twenty-Three).
   - SHIPWRECK: ready-to-use shipwreck survivor looks (Paul, Luke, Aristarchus, Julius, escort soldier, sailor, fellow prisoner).
   - custody: the two chains of Acts 21:33, the soldiers who hold Paul by the arms (22:25), and the knot that carries him up the stairs
     (21:35), for Chapter Eighteen (see below; the poses are the figure painter's, index.html CUFF).
   Historical dress follows wol.jw.org (Insight on the Scriptures, The Watchtower on Ephesians 6 armor, centurions, and the Praetorian Guard). */
SHARED.cast=(()=>{
"use strict";

/* Reusable Roman military looks: clean-shaven first-century Romans with cropped hair, military boots (caligae),
   plated belts (milBelt) and crossguard-free sheathed gladii. */
const ROMAN={
  /* Foot soldiers (legionaries & auxiliaries: Jerusalem barracks, night escort, Caesarea, grain ship escort) */
  legionary_pilum:{skin:'#c08e64',hair:'#342418',brow:'#281c12',crop:1,tunic:'#963028',helm:'#8c929c',helmStyle:'galea',
    armor:'#9aa0aa',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,pilum:1,ph:400},
  legionary_guard:{skin:'#b8845c',hair:'#2a1c12',brow:'#20140e',crop:1,tunic:'#92302a',helm:'#8a909a',helmStyle:'galea',
    armor:'#969ca6',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:900},
  legionary_bare:{skin:'#c8966c',hair:'#4a3624',brow:'#342416',crop:1,tunic:'#98342c',
    armor:'#969ca6',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:1400},
  auxiliary_mail:{skin:'#b07c54',hair:'#2a1a12',brow:'#20140e',crop:1,tunic:'#c6b494',helm:'#a88c52',helmStyle:'galea',
    armor:'#7e848e',armorStyle:'mail',belt:'#422814',milBelt:1,caligae:1,gladius:1,spear:1,ph:1900},
  escort_cloak:{skin:'#bc8a60',hair:'#5a4632',brow:'#3e2e20',crop:1,tunic:'#92322a',cloak:'#6e3a2c',cape:1,
    armor:'#7e848e',armorStyle:'mail',belt:'#422814',milBelt:1,caligae:1,gladius:1,ph:2400},

  /* Centurions / army officers (Jerusalem barracks, Claudius Lysias's officers, Julius of the band of Augustus) */
  centurion_crested:{skin:'#be8a5e',hair:'#3e2e20',brow:'#2a1c12',crop:1,tunic:'#9a2c26',cloak:'#8e2220',offCloak:1,
    helm:'#b8964e',helmStyle:'crest',crest:'#b82820',armor:'#b8964e',armorStyle:'cuirass',pteruges:'#e2d8be',
    sash:'#8e2220',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:600},
  centurion_julius:{skin:'#b8845a',hair:'#6e665c',grey:'#a0988e',brow:'#4a423a',crop:1,thin:1,tunic:'#962c26',cloak:'#8a2220',offCloak:1,
    armor:'#b4924c',armorStyle:'cuirass',pteruges:'#ded4ba',sash:'#8a2220',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:1100},
  centurion_veteran:{skin:'#c49268',hair:'#8a8278',grey:'#beb8ae',brow:'#605a52',crop:1,thin:1,tunic:'#8c2a24',cloak:'#7a1e20',cape:1,
    helm:'#9ca2ac',helmStyle:'crest',crest:'#e4dcc4',armor:'#9aa0aa',armorStyle:'cuirass',pteruges:'#d8ceb4',
    sash:'#7a1e20',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:1700},

  /* The commander of the garrison in Jerusalem (Acts 21:31-22:29), a military tribune: Greek by birth, middle-aged, clean-shaven, his hair
     cropped and greying at the temples. The signs of his rank (Insight on the Scriptures, "Military Commander"): the narrow purple stripe on
     his tunic (clavus) and a gold ring (ring, two pixels on a finger of the far hand). tribune: in the barracks, in his tunic, with a
     military cloak over the near shoulder, belt, boots and sword; tribune_armored: in a molded cuirass with its sash, bareheaded (as he
     runs down to the court, or on the stairs); tribune_helmet: the same with a plumed helmet. */
  tribune:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#e6dfcc',clavus:'#5c2458',cloak:'#7e2a26',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ring:1,ph:2900},
  tribune_armored:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#e6dfcc',clavus:'#5c2458',cloak:'#7e2a26',offCloak:1,
    armor:'#c4a058',armorStyle:'cuirass',pteruges:'#e8dfc8',sash:'#7e2a26',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ring:1,ph:2900},
  tribune_helmet:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#e6dfcc',clavus:'#5c2458',cloak:'#7e2a26',offCloak:1,
    helm:'#c4a058',helmStyle:'plume',crest:'#e6dccb',armor:'#c4a058',armorStyle:'cuirass',pteruges:'#e8dfc8',sash:'#7e2a26',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ring:1,ph:2900},

  /* Praetorian Guard in Rome (Acts 28:16; Philippians 1:13):
     Inside the city limits they wore civilian-style tunics and cloaks (or formal togas on palace/escort duty),
     recognizable by military belts, sandals (caligae) and side arms; outside/full dress in plumed armor. */
  praetorian_watch:{skin:'#c29066',hair:'#342418',brow:'#261a10',crop:1,tunic:'#e4dcc8',cloak:'#78242c',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:500},
  praetorian_watch_young:{skin:'#caa078',hair:'#5a4028',brow:'#3e2a18',crop:1,slim:1,tunic:'#d6ccb6',cloak:'#4a3852',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:1200},
  praetorian_watch_old:{skin:'#b4825a',hair:'#868078',grey:'#bab4ac',brow:'#5e5850',crop:1,thin:1,tunic:'#dcd2bc',cloak:'#6e2228',cape:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:2100},
  praetorian_toga:{skin:'#c4946a',hair:'#3e2c1e',brow:'#2a1c12',crop:1,tunic:'#ebe4d2',cloak:'#f0eadc',toga:1,long:1,
    caligae:1,ph:800},
  praetorian_armored:{skin:'#bc8a60',hair:'#2e2014',brow:'#20140e',crop:1,tunic:'#7c202a',cloak:'#681a24',cape:1,
    helm:'#9ea4ae',helmStyle:'plume',crest:'#8a1e28',armor:'#b69450',armorStyle:'cuirass',pteruges:'#e6dec6',
    sash:'#681a24',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,pilum:1,ph:1600}
};

/* shipwrecked(base, opts): derive a wet, torn shipwreck survivor look from any existing character look.
   Drops dry cloaks/helmets/spears unless keepCloak/keepArmor is set, applies soaked cloth/hair (wet:1) and ragged tears (torn:1..3). */
function shipwrecked(base,opts){
  const o=Object.assign({},base,{p:null,gt:null,wet:1,torn:(opts&&opts.torn)||1});
  if(!(opts&&opts.keepCloak)){delete o.cloak;delete o.cape;delete o.offCloak;delete o.himation;delete o.toga}
  if(!(opts&&opts.keepArmor)){delete o.armor;delete o.armorStyle;delete o.pteruges;delete o.sash}
  delete o.helm;delete o.helmStyle;delete o.crest;delete o.spear;delete o.pilum;delete o.gladius;delete o.pouch;
  if(opts&&opts.barefoot!==undefined)o.barefoot=opts.barefoot;else if(!o.caligae)o.barefoot=1;
  return o}

const LUKE_LATE={skin:'#c4946a',hair:'#4e4238',beard:'#564a40',grey:'#8c847c',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#342a22',ph:1100};
const ARISTARCHUS={skin:'#bc8a60',hair:'#3a2a1c',beard:'#3a2a1c',tunic:'#96a488',cloak:'#5a4e3e',belt:'#3a2818',trim:'#6a765c',brow:'#2a1c12',ph:1500};
const SAILOR_ALEX={skin:'#a67044',hair:'#2a1a12',beard:'#2a1a12',shortBeard:1,tunic:'#b69e74',belt:'#3e2816',brow:'#1e120c',ph:2000};
const PRISONER={skin:'#b8865c',hair:'#4a3a2c',beard:'#4a3a2c',tunic:'#9c8e74',belt:'#3a2c1c',slim:1,brow:'#2e2016',ph:2700};

const SHIPWRECK={
  paul_dry:paulLook(23),
  paul_wet:shipwrecked(paulLook(23),{torn:1,barefoot:1}),
  luke_dry:LUKE_LATE,
  luke_wet:shipwrecked(LUKE_LATE,{torn:2,barefoot:1}),
  aristarchus_wet:shipwrecked(ARISTARCHUS,{torn:3,barefoot:1}),
  julius_dry:ROMAN.centurion_julius,
  julius_wet:shipwrecked(ROMAN.centurion_julius,{torn:2,keepCloak:1,keepArmor:1,barefoot:0}),
  soldier_wet:shipwrecked(ROMAN.legionary_bare,{torn:1,barefoot:0}),
  sailor_wet:shipwrecked(SAILOR_ALEX,{torn:3,barefoot:1}),
  prisoner_wet:shipwrecked(PRISONER,{torn:2,barefoot:1})
};

/* ---- custody (Acts 21:33-22:29): two chains, the soldiers who hold a prisoner by the arms, and the knot that carries him ----
   The poses themselves are the figure painter's (index.html, CUFF and person's pz); here is what lies between two figures, and where they
   stand for it. Every function takes actors (ACT entries: x, y, dir, look and the custody flags); P is the prisoner, A the soldier on his
   left (the smaller x), B the one on his right; either may be null.
     custody.place(kind, P, A, B)  set the soldiers beside P and give them their flags and their facing, for kind
                                   'chain': both face the way P faces, a pace off on either side; each is a keeper by the wrist that is
                                             toward P (the one behind by his far wrist, the one ahead by his near wrist), and P is chained;
                                   'hold':   both stand a little behind P (y - 1.5) and grip his arms above the elbow, the one on his
                                             back side facing the way he faces, the other facing him; P is held (Acts 22:25: never spread,
                                             no post, nothing raised).
                                   Chained or held, P stands still where he is; a script that walks them walks all three alike.
     custody.chains(g, P, A, B, o) in a room's draw(g, t): a short chain from each of P's cuffs to the cuff of the keeper on that side,
                                   hanging a little between them, drawn link by link as small squares of iron, light and dark in turn, at
                                   the depth of the nearer of the two; o.slack: how much longer than the gap a chain is (1.3).
     custody.grips(g, P, A, B)     in a room's draw(g, t): the fingers of each soldier who grips (a.grips) over P's upper arm on his side,
                                   in the soldier's skin and the room's light, drawn over P.
     custody.knot(g, x, y, o)      in a room's draw(g, t), or in a scene: P carried by soldiers in a tight knot (Acts 21:35), at one depth (y, the
                                   feet of the front row): two behind, three in front, P raised among them (LIFT) with his head and
                                   shoulders above theirs and nothing of him below the hem, his arms down in his cuffs. o: {room (for the
                                   light), dir (the way they go, 1 or -1), pdir (the way P looks; dir if left out), d (how far they have
                                   come, for the soldiers' stride; leave it out and they stand), look (P's look; LOOK.paul), men (five
                                   looks, back left, back right, front left, middle, front right; CARRIERS by default)}
     CARRIERS                      the five soldiers of the knot: foot soldiers with and without helmets, none with a spear. */
const CARRIERS=[ROMAN.legionary_guard,ROMAN.legionary_bare,ROMAN.escort_cloak,ROMAN.legionary_guard,Object.assign({},ROMAN.legionary_bare,{skin:'#b47e56',hair:'#2a1c12',ph:2600})];
const lit2=(c,l)=>{if(!l)return c;const a=hex(c),b=hex(l);return toHex(a[0]*b[0]/255,a[1]*b[1]/255,a[2]*b[2]/255)};
/* where a cuff of actor a is, in room pixels: which: 'far' or 'near' */
function cuffPt(a,which){const d=facing(a),p=cuffAt(a.look,poseOf(a),a.ges||0,a.fr)[which];if(!p)return null;const ly=poseOf(a)==='l'?LIFT:0;return[hp(a.x)+d*p[0]*FIG.K,hp(a.y)-ly+p[1]*FIG.K]}
function place(kind,P,A,B){const d=P.dir||1;for(const a of[P,A,B])if(a){a.chained=a.held=a.keeper=a.grips=0;a.walk=null}
  if(kind==='chain'){P.chained=1;const back=d>0?A:B,ahead=d>0?B:A;
    if(back){back.room=P.room;back.dir=d;back.keeper='far';back.x=P.x-d*18;back.y=P.y-.5}
    if(ahead){ahead.room=P.room;ahead.dir=d;ahead.keeper='near';ahead.x=P.x+d*18;ahead.y=P.y+.5}}
  else if(kind==='hold'){P.held=1;const back=d>0?A:B,front=d>0?B:A;
    if(back){back.room=P.room;back.dir=d;back.grips=1;back.x=P.x-d*16.5;back.y=P.y-1.5}
    if(front){front.room=P.room;front.dir=-d;front.grips=1;front.x=P.x+d*16.75;front.y=P.y-1.5}}}
/* a chain: from p to q, hanging; links every half pixel, light and dark in turn, at the canvas's own pixels */
function span(g,p,q,slack,lit){const d=Math.hypot(q[0]-p[0],q[1]-p[1]),L=d*(slack||1.3)+1,sag=Math.sqrt(Math.max(0,L*L-d*d))*.42,n=Math.max(2,Math.ceil(L*2)),
    C=[lit2(CUFF[1],lit),lit2(CUFF[3],lit)];let last='';
  for(let i=0;i<=n;i++){const t=i/n,x=p[0]+(q[0]-p[0])*t,y=p[1]+(q[1]-p[1])*t+sag*4*t*(1-t),k=Math.round(x*2)+','+Math.round(y*2);if(k===last)continue;last=k;
    g.fillStyle=C[i%2];g.fillRect(Math.round(x*2)/2,Math.round(y*2)/2,.5,.5)}}
function chains(g,P,A,B,o){o=o||{};for(const S of[A,B]){if(!S||S.room!==P.room||!poseOf(S))continue;
  const sp=cuffPt(S,'far')||cuffPt(S,'near'),pf=cuffPt(P,'far'),pn=cuffPt(P,'near');if(!sp||!pf&&!pn)continue;
  const pp=!pn||pf&&Math.abs(pf[0]-sp[0])<Math.abs(pn[0]-sp[0])?pf:pn,z=Math.max(P.y,S.y)+.01,lit=lightAt(P.room,P.x,P.y);
  depth(z,()=>span(g,pp,sp,o.slack,lit))}}
/* the fingers over the prisoner's upper arm: four rows across the arm from the soldier's side, lit along the knuckles */
function grips(g,P,A,B){for(const S of[A,B]){if(!S||!S.grips||S.room!==P.room)continue;const d=facing(P),back=(S.x-P.x)*d<0,o=P.look,fem=!!(o.veil||o.fem),nw=(o.slim?1:0)+(fem?1:0),
    yS=-4-(o.h?19:23)-(o.h?13:16)-3-(o.h?22:fem?24:26),x0=back?-10+nw-(fem?4:5):11-nw,K=ramp(S.look.skin),lit=lightAt(P.room,P.x,P.y),
    from=back?x0-1:x0+5;
  depth(Math.max(P.y,S.y)+.02,()=>{for(let r=0;r<4;r++)for(let k=0;k<4;k++){const u=back?from+k:from-k,v=yS+10+r;
    g.fillStyle=lit2(K[r===0?1:r===3?3:k===3?3:2],lit);g.fillRect(hp(P.x)+d*u*FIG.K-(d<0?.5:0),hp(P.y)+v*FIG.K,.5,.5)}})}}
function knot(g,x,y,o){o=o||{};const d=o.dir||1,pd=o.pdir||d,men=o.men||CARRIERS,Pl=o.look||LOOK.paul,lit=(px,py)=>o.room?lightAt(o.room,px,py):null,
    M=[[-9,-3,men[0],0],[8,-3.5,men[1],7],[0,-2,null,0],[-12,-.5,men[2],11],[12,0,men[4],5],[0,1,men[3],3]];
  depth(y+.5,()=>{for(const[dx,dy,L,off]of M){const mx=x+d*dx,my=y+dy;
    if(!L){figure(g,mx,my-LIFT,lit(mx,my),'knotP|'+pd+(o.key||''),q=>person(q,0,0,Pl,pd,0,0,0,0,0,0,'l'),0);continue}
    /* they carry him together, keep step, and step short (the half step of the stride), so that no leg of one crosses a leg of the next */
    const fr=o.d!=null?36+((walkFr(L,o.d*2,WALK_V)-4)&15):0;figure(g,mx,my,lit(mx,my),'knot|'+off+'|'+d+'|'+fr,q=>person(q,0,0,L,d,fr,0,0,0,0,0),walkSw(L,fr))}})}
const custody={place,chains,grips,knot,cuffPt,CARRIERS};

return{ROMAN,SHIPWRECK,shipwrecked,custody}})();
