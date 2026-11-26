/* Paul of Tarsus: reusable character looks shared across Chapters Eighteen to Twenty-Five (loaded on demand with need('cast')).
   - ROMAN: Roman foot soldiers (lorica segmentata & lorica hamata), centurions (molded cuirass, transverse crest, officer cloak), the
     commander of the Jerusalem garrison (a military tribune: tunic with the narrow purple stripe, cuirass, gold ring),
     and Praetorian Guard (inside-Rome watch tunic + military belt/caligae/gladius, formal Roman toga + caligae, and full armored duty);
     the horsemen and spearmen of the escort to Caesarea (Acts 23:23), and Felix, governor of Judea (Acts 23:24-35).
   - SANHEDRIN: the high priest Ananias, Pharisees, Sadducees, clerks, attendants, an elder and a chief priest (Acts 22:30-23:15; 24:1).
   - FAMILY: Paul's sister and her son in Jerusalem (Acts 23:16).
   - CAESAREA: Tertullus, Drusilla, Festus, King Agrippa and Bernice, the governor's clerk, Festus's advisers, the leading men of the city,
     the military commanders, two brothers of Caesarea, and the shared looks of Luke, Philip and Aristarchus (Acts 24:1-26:32).
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
  legionary_pilum:{skin:'#c08e64',hair:'#342418',brow:'#281c12',crop:1,tunic:'#962a24',helm:'#949ca8',helmStyle:'galea',helmTrim:'#c8a44e',
    armor:'#a0a8b4',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,pilum:1,ph:400},
  legionary_guard:{skin:'#b8845c',hair:'#2a1c12',brow:'#20140e',crop:1,tunic:'#922824',helm:'#8e96a2',helmStyle:'galea',helmTrim:'#c4a04a',
    armor:'#9ca4b0',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:900},
  legionary_bare:{skin:'#c8966c',hair:'#4a3624',brow:'#342416',crop:1,tunic:'#982c26',
    armor:'#9ca4b0',armorStyle:'seg',belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:1400},
  auxiliary_mail:{skin:'#b07c54',hair:'#2a1a12',brow:'#20140e',crop:1,tunic:'#d6cab2',helm:'#8e96a2',helmStyle:'galea',helmTrim:'#a4acb8',
    armor:'#7e8692',armorStyle:'mail',belt:'#4a2e18',milBelt:1,caligae:1,gladius:1,spear:1,ph:1900},
  escort_cloak:{skin:'#bc8a60',hair:'#5a4632',brow:'#3e2e20',crop:1,tunic:'#cec2aa',cloak:'#3e463a',cape:1,
    armor:'#7c8490',armorStyle:'mail',belt:'#4a2e18',milBelt:1,caligae:1,gladius:1,ph:2400},

  /* Centurions / army officers (Jerusalem barracks, Claudius Lysias's officers, Julius of the band of Augustus) */
  centurion_crested:{skin:'#be8a5e',hair:'#3e2e20',brow:'#2a1c12',crop:1,tunic:'#962622',cloak:'#8e1e1e',offCloak:1,drape:1,
    helm:'#c49844',helmStyle:'crest',helmTrim:'#e4c064',crest:'#a8201c',armor:'#c49844',armorStyle:'cuirass',pteruges:'#5a361e',
    sash:'#8e1e1e',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:600},
  centurion_julius:{skin:'#b8845a',hair:'#6e665c',grey:'#a0988e',brow:'#4a423a',crop:1,thin:1,tunic:'#922622',cloak:'#8a1e1e',offCloak:1,
    armor:'#be9442',armorStyle:'cuirass',pteruges:'#5a361e',sash:'#8a1e1e',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:1100},
  centurion_veteran:{skin:'#c49268',hair:'#8a8278',grey:'#beb8ae',brow:'#605a52',crop:1,thin:1,tunic:'#8c2622',cloak:'#7a1c1e',cape:1,
    helm:'#9ea6b2',helmStyle:'crest',helmTrim:'#d8b454',crest:'#ebe4d4',armor:'#9ea6b2',armorStyle:'cuirass',cuirassTrim:'#d4ae4e',pteruges:'#4e301e',
    sash:'#7a1c1e',belt:'#4a2c16',milBelt:1,caligae:1,gladius:'left',ph:1700},

  /* The commander of the garrison in Jerusalem (Acts 21:31-22:29), a military tribune: Greek by birth, middle-aged, clean-shaven, his hair
     cropped and greying at the temples. The signs of his rank (Insight on the Scriptures, "Military Commander"): the narrow purple stripe on
     his tunic (clavus) and a gold ring (ring, two pixels on a finger of the far hand). tribune: in the barracks, in his tunic, with a
     military cloak over the near shoulder, belt, boots and sword; tribune_armored: in a molded cuirass with its sash, bareheaded (as he
     runs down to the court, or on the stairs); tribune_helmet: the same with a plumed helmet. */
  tribune:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#642474',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:2900},
  tribune_armored:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#642474',offCloak:1,
    armor:'#cfa646',armorStyle:'cuirass',pteruges:'#52321e',sash:'#5c2068',belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:2900},
  tribune_helmet:{skin:'#c69a6e',hair:'#44362a',grey:'#9a9186',brow:'#2e2218',crop:1,thin:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#642474',offCloak:1,
    helm:'#cfa646',helmStyle:'plume',helmTrim:'#f0d478',crest:'#ece6d8',armor:'#cfa646',armorStyle:'cuirass',pteruges:'#52321e',sash:'#5c2068',belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:2900},

  /* Praetorian Guard in Rome (Acts 28:16; Philippians 1:13):
     Inside the city limits they wore civilian-style tunics and cloaks (or formal togas on palace/escort duty),
     recognizable by military belts, sandals (caligae) and side arms; outside/full dress in plumed armor. */
  praetorian_watch:{skin:'#c29066',hair:'#342418',brow:'#261a10',crop:1,tunic:'#7c2424',cloak:'#7a1e22',offCloak:1,drape:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:500},
  praetorian_watch_young:{skin:'#caa078',hair:'#5a4028',brow:'#3e2a18',crop:1,slim:1,tunic:'#e2dac6',cloak:'#54265e',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:1200},
  praetorian_watch_old:{skin:'#b4825a',hair:'#868078',grey:'#bab4ac',brow:'#5e5850',crop:1,thin:1,tunic:'#dfd6c0',cloak:'#6e2026',cape:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:2100},
  praetorian_toga:{skin:'#c4946a',hair:'#3e2c1e',brow:'#2a1c12',crop:1,tunic:'#f0eadc',cloak:'#f4efe2',toga:1,long:1,
    caligae:1,ph:800},
  praetorian_armored:{skin:'#bc8a60',hair:'#2e2014',brow:'#20140e',crop:1,tunic:'#7c202a',cloak:'#581e66',cape:1,
    helm:'#969ea8',helmStyle:'plume',helmTrim:'#d8b454',crest:'#722482',armor:'#9ca4b0',armorStyle:'cuirass',cuirassTrim:'#d8b454',pteruges:'#662472',
    sash:'#642070',belt:'#4a2c16',milBelt:1,caligae:1,greaves:'#9ea6b2',gladius:1,pilum:1,ph:1600},

  /* The escort of Acts 23:23-24 (Chapter Nineteen): 70 horsemen and 200 spearmen beside the foot soldiers. horseman: an auxiliary
     cavalryman in mail, helmet and cloak, with his sword and no spear (standing, or riding: a rider is drawn seated with his legs
     hanging, person's fr -7). spearman, spearman_young, spearman_old: light infantry (Insight on the Scriptures, "Spearmen"), in a tunic
     and leather belt with a helmet, carrying one simple spear with a wooden shaft and an iron head (the Study Edition's media "Roman
     Spears"), always slanting (spear:'slant'): the far hand holds it, its head leans forward well ahead of the face, and its shaft runs
     behind the body, never upright. */
  horseman:{skin:'#b88458',hair:'#3a2a1c',brow:'#28190f',crop:1,tunic:'#cbbda2',cloak:'#464a3e',cape:1,helm:'#949ca8',helmStyle:'galea',helmTrim:'#c2a04e',
    armor:'#7e8692',armorStyle:'mail',belt:'#422814',milBelt:1,caligae:1,gladius:1,ph:3100},
  horseman_b:{skin:'#c49066',hair:'#5a4030',brow:'#3a2a1c',crop:1,tunic:'#c4b69a',cloak:'#5e3228',cape:1,helm:'#8e96a2',helmStyle:'galea',helmTrim:'#a4acb8',
    armor:'#7a828e',armorStyle:'mail',belt:'#422814',milBelt:1,caligae:1,gladius:1,ph:3300},
  spearman:{skin:'#b07c52',hair:'#2e1e14',brow:'#20140e',crop:1,tunic:'#b6a27c',helm:'#8e949c',helmStyle:'galea',helmTrim:'#b8a268',belt:'#4a2c16',milBelt:1,caligae:1,
    spear:'slant',ph:3500},
  spearman_young:{skin:'#c09068',hair:'#4a3624',brow:'#342416',crop:1,slim:1,tunic:'#c0ae88',helm:'#94989e',helmStyle:'galea',helmTrim:'#bca66c',belt:'#4a2c16',milBelt:1,caligae:1,
    spear:'slant',ph:3700},
  spearman_old:{skin:'#a8744c',hair:'#6a625a',grey:'#9a948c',brow:'#4a423a',crop:1,thin:1,tunic:'#a89470',cloak:'#4a463c',cape:1,belt:'#4a2c16',milBelt:1,caligae:1,
    spear:'slant',ph:3900},

  /* Felix, governor of Judea (Acts 23:24-35): Antonius Felix, a freed slave of the imperial house made procurator (Insight on the
     Scriptures, "Felix"). Nothing in the publications describes his own appearance. He is drawn in the public dress that The Watchtower
     (2005, "Who Was Pontius Pilate?") gives a governor of Judea a generation before him: a white toga with a purple border (edge: the
     band along the toga where it crosses the chest, slanting, never down the middle of the figure), over a white tunic; clean-shaven,
     his dark hair cut short, a small pendant at the neck (pendant: a square), red shoes (shoes) and a gold ring (ring: two pixels).
     Seated on his chair, person's fr -1. */
  felix:{skin:'#c69a70',hair:'#5e5852',grey:'#a29c94',brow:'#3a342e',crop:1,tunic:'#f2ece0',long:1,cloak:'#f4efe2',toga:1,edge:'#66246e',
    pendant:'#e6be50',shoes:'#9e2624',ring:1,ph:4100}
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

/* ---- the Sanhedrin (Acts 22:30-23:10; and the high priest and the elders who came down to Caesarea, Acts 24:1) ----
   Every member is a Jewish man of standing, in a long robe and a mantle, drawn with respect: nothing in a face or a dress makes fun of
   anyone (CONTRIBUTING section 2). The only mark the publications give to tell the two parties apart is the Pharisees' (Insight on the
   Scriptures, "Pharisees", from Matthew 23:5): they wore their scripture cases broad and the fringes of their garments long. So:
     ananias          the high priest Ananias, son of Nedebaeus: an older man in the rich dress of a wealthy priestly family, a fine
                      robe with long sleeves, a mantle with a band of gold along its edge, a white headcloth and a gold ring. Not the
                      high priest's vestments: this is a court day, not the service of the temple.
     pharisee_1 .. 6  a broad scripture case on the forehead (phyl:1, a square box of leather, never a ring, with no strap across
                      anything and none on the arm) and long fringes at the corners of the mantle (fringe: their color, fringeLong:1;
                      short slanting threads, never a vertical line over a band). Ages and beards differ; some wear a headcloth.
     sadducee_1 .. 5  close to the priesthood and the wealthy (Insight, "Sadducees"): fine cloth, a band along the mantle, a ring here and
                      there; a small case (phyl:2) or none, and short fringes. Nothing else tells them apart, so in the council they sit
                      mixed with the Pharisees, and the player must look.
   Every Israelite man wore fringes, with a blue cord above them (Numbers 15:38; Insight, "Dress"), and Jewish men generally wore the cases
   (study note on Matthew 23:5): so every man here in a mantle has short fringes, and what marks the Pharisees is that theirs are long
   and their cases broad.
     clerk_1, clerk_2 the two clerks in front of the court, who wrote down what was said: each with a writing board (board: the color of
                      its wood), drawn on his knees when he sits (person's fr -1) and under his arm when he stands.
     attendant_1, _2  the men who stood by the high priest (Acts 23:2): plain good dress, a headcloth, no mantle and no case.
     elder_1, chief_priest_1   for the chief priests and elders whom the forty went to (23:14), and who came down with Ananias (24:1).
   Seated, every one of them sits as CONTRIBUTING section 4 says (the figure painter's one seated pose). */
const SANHEDRIN={
  ananias:{skin:'#b8865e',wrap:'#f2ecdc',beard:'#8a8278',grey:'#c4beb4',longBeard:1,brow:'#6a625a',tunic:'#e8dcc0',longSleeve:1,trim:'#c9a23a',long:1,
    cloak:'#5a2430',edge:'#c9a23a',belt:'#8a6a2a',ring:1,fringe:'#e6dcc6',ph:4300},
  pharisee_1:{skin:'#b47e52',hair:'#5a5048',beard:'#6a6058',grey:'#9a9088',longBeard:1,brow:'#3a322a',tunic:'#d8ccb0',cloak:'#6a5a44',long:1,belt:'#3a2414',
    phyl:1,fringe:'#e8e0cc',fringeLong:1,ph:4500},
  pharisee_2:{skin:'#c08c5c',hair:'#2e2018',beard:'#2e2018',fullBeard:1,brow:'#22160e',tunic:'#a89a7a',cloak:'#3e4a5e',long:1,belt:'#3a2414',
    phyl:1,fringe:'#ece6d4',fringeLong:1,ph:4700},
  pharisee_3:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#4a3a2c',fullBeard:1,brow:'#2a1a12',tunic:'#8a7a5a',cloak:'#c8b890',long:1,belt:'#3a2414',
    phyl:1,fringe:'#f0eadc',fringeLong:1,ph:4900},
  pharisee_4:{skin:'#bc8a60',hair:'#8a847c',beard:'#a49e96',grey:'#c8c2ba',thin:1,longBeard:1,brow:'#78726c',tunic:'#e0d6c0',cloak:'#7a6a52',long:1,belt:'#4a3424',
    phyl:1,fringe:'#e6dcc6',fringeLong:1,ph:5100},
  pharisee_5:{skin:'#c49468',hair:'#3a2a1c',beard:'#3a2a1c',brow:'#2a1a12',receding:1,tunic:'#9aa08a',cloak:'#5a4a3a',long:1,belt:'#3a2818',
    phyl:1,fringe:'#e8e2d0',fringeLong:1,ph:5300},
  pharisee_6:{skin:'#b07a4c',wrap:'#b8a882',beard:'#6e665c',grey:'#a49c92',longBeard:1,brow:'#4a423a',tunic:'#c8b896',cloak:'#4a5a4a',long:1,belt:'#3a2414',
    phyl:1,fringe:'#ece4d2',fringeLong:1,ph:5500},
  sadducee_1:{skin:'#c8966c',hair:'#4a3a2c',beard:'#4a3a2c',fullBeard:1,brow:'#30241a',tunic:'#ece4d2',longSleeve:1,trim:'#8a6a9a',long:1,
    cloak:'#3a5070',edge:'#b89a50',belt:'#6a4a26',ring:1,fringe:'#e6dcc6',ph:5700},
  sadducee_2:{skin:'#bc8a60',wrap:'#ece4d0',beard:'#7a7268',grey:'#b0a89e',fullBeard:1,brow:'#5a524a',tunic:'#d4c4a0',longSleeve:1,trim:'#8a6a2a',long:1,
    cloak:'#7a3a2c',edge:'#c9a23a',belt:'#4a3424',fringe:'#e6dcc6',phyl:2,ph:5900},
  sadducee_3:{skin:'#c49064',hair:'#2a1c12',beard:'#2a1c12',shortBeard:1,brow:'#20140c',tunic:'#e4dccb',longSleeve:1,trim:'#4a6a7a',long:1,
    cloak:'#2e5458',belt:'#6a4a26',ring:1,fringe:'#e6dcc6',ph:6100},
  sadducee_4:{skin:'#b8845a',hair:'#8a8278',beard:'#9a948c',grey:'#c4beb6',bald:1,fullBeard:1,brow:'#6a645c',tunic:'#ddd2b8',longSleeve:1,trim:'#9a7a3a',long:1,
    cloak:'#2e4a40',edge:'#b8964a',belt:'#4a3424',ring:1,fringe:'#e6dcc6',phyl:2,ph:6300},
  sadducee_5:{skin:'#c09062',wrap:'#c8a868',beard:'#3e2e20',brow:'#2a1c12',tunic:'#b0a07c',longSleeve:1,trim:'#6a4a2a',long:1,
    cloak:'#6a5a2c',edge:'#d8c084',belt:'#4a3424',fringe:'#e6dcc6',ph:6500},
  clerk_1:{skin:'#c08c5c',hair:'#3a2a1c',beard:'#3a2a1c',shortBeard:1,brow:'#2a1a12',tunic:'#ccc0a2',cloak:'#6a6456',long:1,belt:'#3a2414',
    board:'#a07a4a',fringe:'#e6dcc6',ph:6700},
  clerk_2:{skin:'#b47e52',hair:'#6a6058',beard:'#7a7066',grey:'#a49c92',thin:1,fullBeard:1,brow:'#4a423a',tunic:'#bcb090',cloak:'#5a5a6a',long:1,belt:'#3a2414',
    board:'#8a6a40',fringe:'#e6dcc6',phyl:2,ph:6900},
  attendant_1:{skin:'#b07a4c',wrap:'#d8cdb0',beard:'#3a2a1c',brow:'#2a1a12',tunic:'#9a8a6a',long:1,belt:'#3a2414',ph:7100},
  attendant_2:{skin:'#c08c5c',wrap:'#a89070',beard:'#4a3a2a',shortBeard:1,brow:'#2a1a12',tunic:'#8a7a5a',long:1,belt:'#3a2414',ph:7300},
  elder_1:{skin:'#a8703f',wrap:'#d8cdb0',beard:'#7a6a5a',grey:'#a8a098',longBeard:1,brow:'#3a2a1a',tunic:'#8a7a5a',cloak:'#c8b890',long:1,belt:'#3a2414',fringe:'#e6dcc6',ph:7500},
  chief_priest_1:{skin:'#c4946a',wrap:'#ece6d6',beard:'#5a4a3a',grey:'#8a8278',fullBeard:1,brow:'#3a2a1c',tunic:'#e2d8c2',longSleeve:1,trim:'#7a5a8a',long:1,
    cloak:'#6a4a2a',edge:'#c4a456',belt:'#6a4a26',ring:1,fringe:'#e6dcc6',ph:7700}
};

/* ---- the family of Paul in Jerusalem (Acts 23:16; Chapter Nineteen) ----
     pauls_nephew  the son of Paul's sister, a young man of about eighteen to twenty (unnamed): slim and bareheaded, his dark hair cut
                   short, his first beard close; a plain tunic to the ankles in a muted grey-green, open at the neck, and a brown
                   leather belt with a small brass plate. He walks and talks much: every pose is the figure painter's.
     pauls_sister  Paul's sister, a woman of about his age, at her door in Jerusalem: a long tunic, the mantle drawn over her head, and the
                   hair that shows under it greying (veilHair). */
const FAMILY={
  pauls_nephew:{skin:'#c4926a',hair:'#2e2016',beard:'#5e4230',shortBeard:1,crop:1,brow:'#24160e',slim:1,tunic:'#8a9482',long:1,belt:'#6a4426',buckle:'#d8b45a',ph:7900},
  pauls_sister:{skin:'#bc8c64',veil:'#6e4c3c',veilHair:'#8a837a',tunic:'#b8a888',long:1,slim:1,longSleeve:1,trim:'#5a4a3a',belt:'#6a4a2a',brow:'#7a7068',ph:8100}
};

/* Luke and Aristarchus as Chapters Fifteen to Eighteen paint them (luke15 .. luke18, arist15 .. arist18): the same looks as CAESAREA.luke
   and CAESAREA.aristarchus below, so that they look the same from Chapter Twenty on, dry and in the shipwreck. */
const LUKE_LATE={skin:'#c4946a',hair:'#4e3e30',beard:'#58483a',grey:'#8a8078',tunic:'#e4dec8',cloak:'#4f7a6a',belt:'#4a3a24',trim:'#3a5a4a',long:1,brow:'#2e2018',ph:1100};
const ARISTARCHUS={skin:'#bc8a60',hair:'#3a2a1c',beard:'#3a2a1c',fullBeard:1,tunic:'#96a488',cloak:'#5a4e3e',belt:'#3a2818',trim:'#6a765c',brow:'#2a1c12',ph:1500};

/* ---- Caesarea (Acts 24:1-26:32; Chapters Twenty and Twenty-One) ----
   No source describes how any of these people dressed, so each is drawn as is plausible for the person and says no more than is known.
   Every arm is down, bent or folded, no stripe runs down the middle of a mantle, and a pendant is a square (CONTRIBUTING section 3).
     tertullus         the public speaker of 24:1, middle-aged. His nationality is not known, so nothing in his dress gives him one: a long
                       tunic and the Greek mantle (himation), not a toga (which would make him a Roman) and no fringes or scripture case
                       (which would make him a Jew); a short beard, his hair greying, a ring.
     drusilla          the wife of Felix, a Jewess of about eighteen (24:24): a fine long robe with long sleeves and a band of blue at the
                       hems, a mantle wrapped over it, her hair parted and bound up with a gold band; a little gold, a fine necklace and a
                       small earring (necklace, earring: square pixels). Modest.
     festus            Porcius Festus, governor after Felix (24:27): in the same public dress as Felix (a white toga with a purple border
                       along it, never down the middle; red shoes, a ring), but another man: younger than Felix, ruddier, his dark hair
                       cropped and thinning, and no pendant.
     agrippa           King Agrippa (25:13), of the family of Herod, about thirty: a purple mantle over a long fine tunic with a band of gold,
                       a plain gold diadem round his head (diadem: a band only, nothing that stands up or hangs), a short trimmed beard, a ring.
     bernice           his sister (25:13), about thirty: a rich long robe with long sleeves and a band of wine red, a wine-red mantle
                       wrapped over it, her hair bound up with a gold band, a fine necklace and small earrings. Modest and dignified;
                       nothing in her dress hints at anything.
     governors_clerk   an invented clerk of the governor, about forty-five: a plain tunic, his hair cropped and greying, clean-shaven, and a
                       writing board (board) under his arm or on his knees. Seen in both chapters.
     adviser_1, _2     the advisers of Festus (25:12), Roman civilians: one older in a plain white toga, one younger in a tunic and mantle.
     leading_man_1..3  the leading men of the city (25:23), a city mostly of Gentiles: Greek mantles over long tunics, of different ages.
     commander_a..c    military commanders (25:23), of the rank of the commander in Jerusalem (a tribune: the narrow purple stripe, a gold
                       ring), varied from the tribune looks; bareheaded, since they sit in a hall: two in a cuirass, one in his tunic and cloak.
     brother_1, _2     two invented brothers of Caesarea, plain working men, one older and one young.
     luke, philip, aristarchus   the shared looks of these three from Chapter Twenty on: Luke and Aristarchus as Chapters Fifteen to
                       Eighteen paint them, Philip the evangelist as Chapter Seventeen does (grey, receding, a full beard).
   Seated, every one of them sits as CONTRIBUTING section 4 says (the figure painter's one seated pose). */
const CAESAREA={
  tertullus:{skin:'#c29464',hair:'#4a3a2c',beard:'#4e3e30',grey:'#9a9086',shortBeard:1,receding:1,brow:'#30241a',tunic:'#ddd2b8',long:1,
    cloak:'#3e5466',himation:1,belt:'#4a3424',ring:1,ph:8300},
  drusilla:{skin:'#d0a47c',hair:'#241610',fem:1,band:'#d8b04a',slim:1,brow:'#2a1a12',tunic:'#ece4d4',long:1,longSleeve:1,trim:'#3e5a80',
    cloak:'#4e6e96',himation:1,belt:'#c9a23a',necklace:'#e2bc54',earring:'#e2bc54',ring:1,ph:8500},
  festus:{skin:'#cc9c72',hair:'#2e2218',brow:'#241a12',crop:1,thin:1,tunic:'#f2ece0',long:1,cloak:'#f4efe2',toga:1,edge:'#66246e',
    shoes:'#9e2624',ring:1,ph:8700},
  agrippa:{skin:'#c8966a',hair:'#2a1c14',beard:'#2a1c14',shortBeard:1,brow:'#20140e',diadem:'#d8b04a',tunic:'#ece4d2',long:1,longSleeve:1,
    trim:'#c9a23a',cloak:'#5c2068',himation:1,belt:'#8a6a2a',ring:1,shoes:'#7a3a26',ph:8900},
  bernice:{skin:'#c99c74',hair:'#2e1c14',fem:1,band:'#d8b04a',slim:1,brow:'#2a1a12',tunic:'#eadcc0',long:1,longSleeve:1,trim:'#7a2a36',
    cloak:'#6a2430',himation:1,belt:'#c9a23a',necklace:'#e2bc54',earring:'#e2bc54',ring:1,ph:9100},
  governors_clerk:{skin:'#c08c5e',hair:'#52443a',grey:'#948a80',brow:'#3a2e24',crop:1,tunic:'#b4aa92',belt:'#4a3424',board:'#9a7448',ph:9300},
  adviser_1:{skin:'#c69a72',hair:'#8a8278',grey:'#bcb6ac',brow:'#5e5850',crop:1,thin:1,tunic:'#eee8da',long:1,cloak:'#f2ede0',toga:1,ring:1,ph:9500},
  adviser_2:{skin:'#bc8c62',hair:'#3a2a1e',brow:'#281c12',crop:1,tunic:'#e4dcc8',long:1,cloak:'#6a5a48',belt:'#4a3424',ring:1,ph:9700},
  leading_man_1:{skin:'#c09064',hair:'#8e8880',beard:'#9a948c',grey:'#c6c0b8',receding:1,fullBeard:1,brow:'#6a645c',tunic:'#e2d8c2',long:1,
    cloak:'#6e4a3a',himation:1,belt:'#4a3424',ring:1,ph:9900},
  leading_man_2:{skin:'#c8986c',hair:'#3e2e20',beard:'#3e2e20',shortBeard:1,brow:'#2a1c12',tunic:'#d6ccb2',long:1,cloak:'#4e6248',himation:1,belt:'#4a3424',ph:10100},
  leading_man_3:{skin:'#b8865a',hair:'#5a4a3c',grey:'#9a9086',brow:'#3a2e24',crop:1,tunic:'#e8e0cc',long:1,cloak:'#7a6a8a',himation:1,belt:'#4a3424',ring:1,ph:10300},
  commander_a:{skin:'#c09066',hair:'#2e2016',brow:'#20140e',crop:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#642474',offCloak:1,
    armor:'#c4a04a',armorStyle:'cuirass',pteruges:'#52321e',sash:'#5c2068',belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:10500},
  commander_b:{skin:'#c8a078',hair:'#7e766c',grey:'#b4aea4',brow:'#58524a',crop:1,thin:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#5a2a3a',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:10700},
  commander_c:{skin:'#b4825a',hair:'#4a3626',brow:'#30221a',crop:1,tunic:'#ebe4d2',clavus:'#60226a',cloak:'#6a2030',offCloak:1,
    armor:'#a4acb6',armorStyle:'cuirass',cuirassTrim:'#d4ae4e',pteruges:'#4e301e',sash:'#6a2030',belt:'#4a2c16',milBelt:1,caligae:1,highBoot:1,gladius:'left',ring:1,ph:10900},
  brother_1:{skin:'#b48054',hair:'#7a7268',beard:'#867e74',grey:'#aaa298',receding:1,fullBeard:1,brow:'#4e4840',tunic:'#9a8464',cloak:'#5e4e3a',belt:'#3a2818',ph:11100},
  brother_2:{skin:'#c08e60',hair:'#2e2016',beard:'#3a2a1c',shortBeard:1,brow:'#22160e',tunic:'#a89a76',belt:'#4a3020',ph:11300},
  luke:LUKE_LATE,
  philip:{skin:'#b88a60',hair:'#9a948c',beard:'#a8a29a',grey:'#c8c2ba',fullBeard:1,receding:1,tunic:'#e0d6bc',cloak:'#6a5a44',long:1,belt:'#4a3a24',brow:'#6e6860',ph:450},
  aristarchus:ARISTARCHUS
};
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

return{ROMAN,SANHEDRIN,FAMILY,CAESAREA,SHIPWRECK,shipwrecked,custody}})();
