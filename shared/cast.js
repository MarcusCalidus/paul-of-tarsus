/* Paul of Tarsus: reusable character looks shared across Chapters Eighteen to Twenty-Five (loaded on demand with need('cast')).
   - ROMAN: Roman foot soldiers (lorica segmentata & lorica hamata), centurions (molded cuirass, transverse crest, officer cloak),
     and Praetorian Guard (inside-Rome watch tunic + military belt/caligae/gladius, formal Roman toga + caligae, and full armored duty).
   - shipwrecked(look, opts): turns any look into wet, torn shipwreck survivor clothing for Acts 27-28 (Chapter Twenty-Three).
   - SHIPWRECK: ready-to-use shipwreck survivor looks (Paul, Luke, Aristarchus, Julius, escort soldier, sailor, fellow prisoner).
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

return{ROMAN,SHIPWRECK,shipwrecked}})();
