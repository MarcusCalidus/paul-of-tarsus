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
   - SEA: the people of the voyage and of Malta (Acts 27:1-28:10; Chapters Twenty-Two and Twenty-Three): the pilot, the shipowner, the
     sailors of the grain ship and of the coaster, the other prisoners, a merchant, a soldier with and without his mail, dry and wet;
     the islanders of Malta, Publius, his father and his household.
   - ROME: the people of Acts 28:11-31 (Chapters Twenty-Four and Twenty-Five): the companions named in the letters, the brothers and
     sisters of Rome and Puteoli, the three who carry the news, the leading men of the Jews of Rome, and others; and cat, the lodging's cat.
   - custody: the two chains of Acts 21:33, the soldiers who hold Paul by the arms (22:25), and the knot that carries him up the stairs
     (21:35), for Chapter Eighteen, the one chain of Acts 24-26, and the long chain of the lodging in Rome (Acts 28:16, 30) with the soldier
     seated (see below; the poses are the figure painter's, index.html CUFF).
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
   Drops dry cloaks (and the border along a mantle)/helmets/spears unless keepCloak/keepArmor is set, applies soaked cloth/hair (wet:1) and ragged tears (torn:1..3). */
function shipwrecked(base,opts){
  const o=Object.assign({},base,{p:null,gt:null,wet:1,torn:(opts&&opts.torn)||1});
  if(!(opts&&opts.keepCloak)){delete o.cloak;delete o.cape;delete o.offCloak;delete o.himation;delete o.toga;delete o.edge}
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
                       hems, a mantle wrapped over it, her hair parted and bound up with a blue ribbon (only the king wears a band of gold); a little gold, a fine necklace and a
                       small earring (necklace, earring: square pixels). Modest.
     festus            Porcius Festus, governor after Felix (24:27): in the same public dress as Felix (a white toga with a purple border
                       along it, never down the middle; red shoes, a ring), but another man: younger than Felix, ruddier, his dark hair
                       cropped and thinning, and no pendant.
     agrippa           King Agrippa (25:13), of the family of Herod, about thirty: a purple mantle over a long fine tunic with a band of gold,
                       a plain gold diadem round his head (diadem: a band only, nothing that stands up or hangs), a short trimmed beard, a ring.
     bernice           his sister (25:13), about thirty: a rich long robe with long sleeves and a band of wine red, a wine-red mantle
                       wrapped over it, her hair bound up with a wine-red ribbon (only the king wears a band of gold), a fine necklace and small earrings. Modest and dignified;
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
  drusilla:{skin:'#d0a47c',hair:'#241610',fem:1,band:'#3e5a80',slim:1,brow:'#2a1a12',tunic:'#ece4d4',long:1,longSleeve:1,trim:'#3e5a80',
    cloak:'#4e6e96',himation:1,belt:'#c9a23a',necklace:'#e2bc54',earring:'#e2bc54',ring:1,ph:8500},
  festus:{skin:'#cc9c72',hair:'#2e2218',brow:'#241a12',crop:1,thin:1,tunic:'#f2ece0',long:1,cloak:'#f4efe2',toga:1,edge:'#66246e',
    shoes:'#9e2624',ring:1,ph:8700},
  agrippa:{skin:'#c8966a',hair:'#2a1c14',beard:'#2a1c14',shortBeard:1,brow:'#20140e',diadem:'#d8b04a',tunic:'#ece4d2',long:1,longSleeve:1,
    trim:'#c9a23a',cloak:'#5c2068',himation:1,belt:'#8a6a2a',ring:1,shoes:'#7a3a26',ph:8900},
  bernice:{skin:'#c99c74',hair:'#2e1c14',fem:1,band:'#7a2a36',slim:1,brow:'#2a1a12',tunic:'#eadcc0',long:1,longSleeve:1,trim:'#7a2a36',
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

/* ---- the sea (Acts 27:1-28:10; Chapters Twenty-Two and Twenty-Three) ----
   No source describes how anyone on the ship or on the island was dressed (see the chapters' facts), so every look here is invented, as is
   plausible for 58 C.E. and as the earlier chapters dress seamen and country people. Nobody here has a name but Publius (Acts 28:7); Luke,
   Aristarchus, Julius and the soldiers are the looks above (CAESAREA.luke, CAESAREA.aristarchus, ROMAN, and SHIPWRECK for them wet).
   Every arm is down, bent or folded; nobody wears a strap across the body or a knife in his belt (a belt is the engine's, as
   every figure in the game wears it), and a head cloth is the engine's wrap, which lies close round the head (CONTRIBUTING section 3). Every look ending in _wet is the look before it after the
   wreck, made by shipwrecked(): soaked, torn, its mantle lost; the islanders, Publius and his house are dry.
   The grain ship of Alexandria (27:6):
     pilot             the steersman (27:11): an old hand of the sea, weathered dark, his beard grey, a dark blue head cloth against the sun
                       and the spray, a short brown tunic, barefoot.
     shipowner         the owner of the ship and her cargo (27:11), a man of means from Alexandria: a long fine cream tunic with long sleeves and a
                       band of ochre at the hems, a deep indigo mantle wrapped over it (himation) with a narrow ochre border along it (edge),
                       sandals, one ring; his beard close and his hair receding. No one else on the deck wears his colors (Luke wears a white
                       tunic under a teal mantle, Julius a red cloak), and nothing on him is the sign of a rank or of a god.
     sailor_1 .. _4    sailors, barefoot in short tunics, each told apart at a glance on a crowded deck: sailor_1 the sailor of the earlier
                       sheets (SHIPWRECK.sailor_wet), short beard, a sand-colored tunic; sailor_2 young, dark, his hair cropped, a cloth bound
                       round his forehead and a madder-red tunic; sailor_3 bald, with a grey full beard and a slate-blue tunic; sailor_4 a
                       faded yellow head cloth, a young beard and an olive tunic.
     ship_boy          a boy of the crew, barefoot, in an undyed tunic.
   The coaster of Adramyttium (27:2): coaster_sailor_1, a burly man with a full beard in a grey-green tunic, and coaster_sailor_2, an olive
     head cloth and a short beard, in a brown tunic; both barefoot.
   The other prisoners (27:1), plain and worn, in drab short tunics: prisoner_1 the prisoner of the earlier sheets (SHIPWRECK.prisoner_wet),
     slim; prisoner_2 with a full black beard, in a brown tunic; prisoner_3 young, his hair receding early, a brown beard, barefoot; prisoner_old
     an old man with a long white beard in a long tunic, who walks with short steps.
   merchant            a passenger traveling on his own business: a long saffron tunic with a brown band at the hem, a traveling mantle
                       over his shoulders, a full beard, a ring and good shoes.
   soldier_mail, soldier_unmailed   a soldier of the guard aboard, in mail and his belt with its sword, bareheaded at sea; and the same man
                       with his mail off, in his tunic, belt and boots: the one who cannot swim in it (Chapter Twenty-Three's planks).
   julius_sea          Julius, the army officer of 27:1 (ROMAN.centurion_julius, the same head and the same red cloak), as he is on the
                       days at sea: without his cuirass, in a plain white tunic with his cloak over the shoulder, a plain belt and his
                       boots; julius_sea_wet the same after the wreck, keeping his cloak. ROMAN.centurion_julius and SHIPWRECK.julius_dry
                       and julius_wet, in the cuirass, stay as they are.
   The islanders of Malta (28:1, 2): of Phoenician descent under Roman rule, with a language of their own. Country people, dry, in long
     tunics, in the earth colors of undyed and plant-dyed wool, the men with a head cloth, the women with a veil,
     so that they are plainly another people than the ship's company in its short tunics.
     islander_elder    the older man who talks with Luke: a long white beard, a pale head cloth, a brown tunic and an umber mantle.
     islander_1, _2    men: a wheat-colored tunic and a rust head cloth with a full black beard; a dark tunic, an ochre mantle and a
                       dun head cloth with a young beard.
     islander_3, _4    women: a veil of undyed brown over an ochre tunic; an older woman, her hair greying under a rust veil.
     islander_5        a young man, beardless, a tawny tunic and a sand-colored head cloth (he brings the sticks).
   Publius and his house (28:7-10):
     publius           "the principal man of the island", probably the leading Roman officer there and a man of lands (Insight on the
                       Scriptures, "Publius"): a Roman of standing at home, clean-shaven, his dark hair cropped and greying, a clean white
                       long tunic and a mantle of fine undyed wool wrapped over it, good shoes and a ring. No toga, no purple, no wreath.
     publius_father    his father, an old man, clean-shaven, his white hair thin and cropped, in a plain long tunic girded with a pale cord: in bed
                       with fever and dysentery (28:8), and later on his feet.
     household_1, _2   people of his household: a manservant in a short tunic, and a woman of the house in a long tunic, her hair bound up. */
const SAILOR_1=Object.assign({},SAILOR_ALEX,{barefoot:1,ph:11500});
const SEA_DRY={
  pilot:{skin:'#94603a',hair:'#6a625a',beard:'#8a847a',grey:'#b4aea4',fullBeard:1,brow:'#5a524a',wrap:'#3e4e62',tunic:'#7a6450',belt:'#2e2016',barefoot:1,ph:11700},
  shipowner:{skin:'#ac784c',hair:'#2e2420',grey:'#7e766e',beard:'#3a2e26',shortBeard:1,receding:1,brow:'#241a12',tunic:'#e2d6b6',long:1,longSleeve:1,trim:'#a8823a',
    cloak:'#262e56',himation:1,edge:'#b08a3a',belt:'#6a4a26',ring:1,shoes:'#6a4026',ph:11900},
  sailor_1:SAILOR_1,
  sailor_2:{skin:'#8a5632',hair:'#1e1410',brow:'#1a100a',crop:1,slim:1,tunic:'#8e3c2c',belt:'#2e2016',sweat:'#d8ccb0',barefoot:1,ph:12100},
  sailor_3:{skin:'#a06a40',hair:'#7a746c',beard:'#8a847c',grey:'#b8b2aa',bald:1,fullBeard:1,brow:'#5a544e',tunic:'#5a6a76',belt:'#2a2018',barefoot:1,ph:12300},
  sailor_4:{skin:'#b07a4c',wrap:'#c4a040',beard:'#3a2a1a',shortBeard:1,brow:'#1e140c',tunic:'#6c7650',belt:'#3a2a1a',barefoot:1,ph:12500},
  ship_boy:{skin:'#a8703f',hair:'#2a1a10',brow:'#1e120c',h:1,tunic:'#cabb94',belt:'#5a4030',barefoot:1,ph:12700},
  coaster_sailor_1:{skin:'#a06a3e',hair:'#3a2a1a',beard:'#3e2e20',fullBeard:1,brow:'#2a1c12',tunic:'#66766a',belt:'#2e2016',barefoot:1,ph:12900},
  coaster_sailor_2:{skin:'#b47e52',wrap:'#6a6238',beard:'#4a3a2a',shortBeard:1,brow:'#2e2016',tunic:'#946446',belt:'#2e2016',barefoot:1,ph:13100},
  prisoner_1:PRISONER,
  prisoner_2:{skin:'#b07a50',hair:'#241812',beard:'#2a1c14',fullBeard:1,brow:'#1e140c',tunic:'#7a5e48',belt:'#3a2c1c',ph:13300},
  prisoner_3:{skin:'#c49470',hair:'#6a4a30',beard:'#6e5034',receding:1,brow:'#4a3220',slim:1,tunic:'#6a6e5e',belt:'#3a2c1c',barefoot:1,ph:13500},
  prisoner_old:{skin:'#b4805a',hair:'#b0aaa2',beard:'#bcb6ae',grey:'#dad4cc',thin:1,longBeard:1,brow:'#8e8880',tunic:'#958b76',long:1,belt:'#3a2c1c',ph:13700},
  merchant:{skin:'#bc8a60',hair:'#4a3626',beard:'#4a3626',fullBeard:1,brow:'#30221a',tunic:'#c8a462',long:1,trim:'#6a3e22',cloak:'#6a4434',belt:'#5a3a1e',ring:1,shoes:'#5a3a22',ph:13900},
  soldier_mail:{skin:'#b07c54',hair:'#2a1a12',brow:'#20140e',crop:1,tunic:'#d6cab2',armor:'#7e8692',armorStyle:'mail',belt:'#4a2e18',milBelt:1,caligae:1,gladius:1,ph:14100},
  julius_sea:{skin:ROMAN.centurion_julius.skin,hair:ROMAN.centurion_julius.hair,grey:ROMAN.centurion_julius.grey,brow:ROMAN.centurion_julius.brow,crop:1,thin:1,
    tunic:'#e6dfcc',cloak:ROMAN.centurion_julius.cloak,offCloak:1,belt:'#4a2c16',caligae:1,ph:ROMAN.centurion_julius.ph},
  soldier_unmailed:{skin:'#b07c54',hair:'#2a1a12',brow:'#20140e',crop:1,tunic:'#d6cab2',belt:'#4a2e18',caligae:1,ph:14100},
  islander_elder:{skin:'#9e6a42',wrap:'#d2c4a4',beard:'#b4aea4',grey:'#dcd6cc',longBeard:1,brow:'#8a847a',tunic:'#866446',long:1,cloak:'#5e4a30',belt:'#3a2818',ph:14300},
  islander_1:{skin:'#a8703f',wrap:'#8a4a2a',beard:'#22160e',fullBeard:1,brow:'#1e140c',tunic:'#c4b088',long:1,belt:'#4a3020',ph:14500},
  islander_2:{skin:'#b07a48',wrap:'#9a8460',beard:'#2e2016',shortBeard:1,brow:'#22160e',tunic:'#6e5238',long:1,cloak:'#a8783e',belt:'#3a2818',ph:14700},
  islander_3:{skin:'#b88458',veil:'#8a7a58',tunic:'#ae8a58',long:1,longSleeve:1,trim:'#6a3e22',slim:1,belt:'#6a4a2a',ph:14900},
  islander_4:{skin:'#a87850',veil:'#8e5432',veilHair:'#9a948c',tunic:'#6a5e46',long:1,longSleeve:1,slim:1,belt:'#4a3424',brow:'#6e665e',ph:15100},
  islander_5:{skin:'#a8703f',wrap:'#bea676',brow:'#1e140c',slim:1,tunic:'#9a7a52',long:1,belt:'#3a2818',ph:15300},
  publius:{skin:'#c69c72',hair:'#3e3228',grey:'#8e867e',brow:'#2a2018',crop:1,tunic:'#f0eadc',long:1,cloak:'#b4a684',himation:1,belt:'#5a4030',ring:1,shoes:'#6a3a22',ph:15500},
  publius_father:{skin:'#c4a07c',hair:'#d2cec8',grey:'#eeeae4',brow:'#aaa69e',crop:1,thin:1,tunic:'#e2dac8',long:1,belt:'#9a8e78',ph:15700},
  household_1:{skin:'#a8744a',hair:'#2e2016',brow:'#22160e',crop:1,tunic:'#bcae90',belt:'#4a3424',ph:15900},
  household_2:{skin:'#bc8a60',hair:'#2a1c14',fem:1,band:'#8a6a4a',slim:1,brow:'#22160e',tunic:'#c8b896',long:1,longSleeve:1,trim:'#7a5a3a',belt:'#6a4a2a',ph:16100}
};
/* the wreck (27:41-44): everyone from the ship, wet and torn; sailors and the boy were barefoot before, the others lose their sandals,
   and the soldiers keep their boots. The soldier who keeps his mail keeps it here too (keepArmor), and loses his sword. */
const SEA_WET={
  pilot_wet:shipwrecked(SEA_DRY.pilot,{torn:2}),
  shipowner_wet:shipwrecked(SEA_DRY.shipowner,{torn:2,barefoot:1}),
  sailor_1_wet:shipwrecked(SAILOR_1,{torn:3}),
  sailor_2_wet:shipwrecked(SEA_DRY.sailor_2,{torn:2}),
  sailor_3_wet:shipwrecked(SEA_DRY.sailor_3,{torn:1}),
  sailor_4_wet:shipwrecked(SEA_DRY.sailor_4,{torn:3}),
  ship_boy_wet:shipwrecked(SEA_DRY.ship_boy,{torn:1}),
  prisoner_1_wet:shipwrecked(PRISONER,{torn:2,barefoot:1}),
  prisoner_2_wet:shipwrecked(SEA_DRY.prisoner_2,{torn:3,barefoot:1}),
  prisoner_3_wet:shipwrecked(SEA_DRY.prisoner_3,{torn:1,barefoot:1}),
  prisoner_old_wet:shipwrecked(SEA_DRY.prisoner_old,{torn:2,barefoot:1}),
  merchant_wet:shipwrecked(SEA_DRY.merchant,{torn:1,barefoot:1}),
  soldier_mail_wet:shipwrecked(SEA_DRY.soldier_mail,{torn:1,keepArmor:1,barefoot:0}),
  soldier_unmailed_wet:shipwrecked(SEA_DRY.soldier_unmailed,{torn:2,barefoot:0}),
  julius_sea_wet:shipwrecked(SEA_DRY.julius_sea,{torn:2,keepCloak:1,barefoot:0})
};
const SEA=Object.assign({},SEA_DRY,SEA_WET);

/* ---- Rome (Acts 28:11-31; Chapters Twenty-Four and Twenty-Five) ----
   Italy about 59 to 61 C.E.: men in a tunic to the knee, girded for work; a mantle for men of standing; women in a tunic to the feet with
   the mantle over it, the hair parted and bound up or the mantle drawn over the head. No source describes how any of them dressed, so
   each is drawn as is plausible for the person and says no more than is known; nobody wears a mark of rank or of a god. The looks are
   keyed by what they are: the chapters name the people. Every arm is down, bent or folded, and whatever hangs at a belt hangs at the side.
   Shared from single chapters, unchanged in face and dress:
     timothy, tychicus, mikon   as Chapter Eighteen paints Timothy (tim18) and Chapter Fifteen Tychicus (tych15) and Mikon, the brother
                       who carried loads on the quay at Cenchreae (mikon15), now in Rome.
   Named in the letters (Philippians, Colossians, Philemon):
     mark              John Mark, some twelve years after Chapters Four, Five and Seven: the same coloring and the green of his tunic, a
                       full short beard, a little heavier (no longer slim), and a mantle.
     onesimus          a young man, a slave's plain short tunic of undyed wool, his hair cropped.
     epaphroditus      in his thirties, pale and thin after his sickness (Philippians 2:27), a traveler's mantle of brown wool.
     epaphras          of Colossae in Phrygia, whose valley's wool was dyed a reddish purple: a border of that tone along his mantle, no more.
     demas, justus     Demas, a man in his prime; Jesus who is called Justus, a Jew (Colossians 4:11), with the fringes every Israelite wore.
     luke, aristarchus are CAESAREA.luke and CAESAREA.aristarchus.
   Of Rome and Puteoli, invented:
     carrier           the young brother of Rome who is played in Chapter Twenty-Four: he carries goods between the barges and the city,
                       strong, in a girded tunic, a folded pad on his shoulder (pad).
     rome_old          an old brother whose knees are bad: white-haired, in a long tunic and a mantle.
     rome_baker        a baker, his apron and tunic pale with flour.
     rome_slave        a slave, young, in a plain short tunic.
     rome_brother_a, rome_brother_b   a craftsman of middle years, and a young man.
     rome_lady         a sister of some means: a long robe, a mantle wrapped over it, her hair bound up with a ribbon, a fine necklace.
     rome_sister_a, rome_sister_b     an older sister, the mantle drawn over her greying hair; a young one, her hair parted and bound.
     puteoli_host, puteoli_dock, puteoli_young, puteoli_sister   three brothers and a sister of Puteoli, a harbor town: an older man of a
                       house, a dock worker, a young man; the sister's mantle drawn over her head.
   The three who carry the news (28:15, as the game tells it):
     carter            dusty, his coiled whip hung from his belt at the hip (whip).
     trader            well dressed, a long tunic and a mantle, his broad traveling hat hanging on his back (hatBack), a ring, good shoes.
     boatman           of the canal, barefoot, his arms bare (bareArm), his pole held slanting (spear:'pole': no head, nothing across it).
   Others:
     sailor            a sailor of the grain ship (SEA.sailor_1).
     innkeeper, landlady, landlord   the innkeeper at Three Taverns, in his apron; the landlady, the mantle over her head; the landlord, a man
                       of some means in a mantle.
     freedman          a believer of Caesar's household who keeps accounts (Philippians 4:22): neat, a writing case at his belt (penCase),
                       nothing that marks rank.
     jew_rome_1 .. 6   the leading men of the Jews of Rome (28:17): older men of the Dispersion, as the game paints the rulers of the
                       synagogues of Antioch and Thessalonica, in long tunics and mantles with fringes; two with the mantle drawn over the
                       head (wrap in the mantle's color). Not the dress of the Sanhedrin: no scripture case, no gold.
     traveler_1, _2    two travelers on the Appian Way.
     paul_home         Paul at home in the lodging, his mantle laid aside (the lodging's peg holds a brown cloak): his look of Chapters
                       Nineteen on, without the mantle, so that a hand that comes forward over him crosses nothing.
     paul_weary        Paul on the road, weary (28:15): the same look, with the weary step and head of the figure painter (weary:1).
   The soldiers of the watch are ROMAN.praetorian_watch, _young, _old, _bald and _ruddy: a tunic, sometimes a cloak, a belt, sandals and
   a sword without a guard; no armor, helmet, shield, standard or spear. */
const ROME={
  timothy:{skin:'#c89868',hair:'#3a2616',beard:'#3a2616',shortBeard:1,tunic:'#d8cfb0',cloak:'#5a6a52',belt:'#5a3a20',trim:'#7a8a6a',brow:'#2a1a12',slim:1,ph:1700},
  tychicus:{skin:'#c69870',hair:'#5a4630',beard:'#5a4630',receding:1,tunic:'#c8a868',cloak:'#6a6a44',belt:'#3a2a1a',trim:'#8a6a3a',brow:'#3a2a1a',ph:2100},
  mikon:{skin:'#a8703f',beard:'#2a1a12',tunic:'#9a7a5a',belt:'#3a2a1a',wrap:'#b8a078',brow:'#1a1210',ph:400},
  mark:{skin:'#c08c5c',hair:'#2a1a12',beard:'#2a1a12',fullBeard:1,tunic:'#8aa08a',cloak:'#4e5e46',belt:'#5a3a20',trim:'#5a705a',brow:'#2a1a12',ph:900},
  onesimus:{skin:'#b88454',hair:'#2a1c12',brow:'#22160e',crop:1,slim:1,tunic:'#b4a688',belt:'#4a3424',ph:16300},
  epaphroditus:{skin:'#c8a682',hair:'#4a3626',beard:'#4a3626',shortBeard:1,brow:'#30221a',slim:1,tunic:'#bcb39c',cloak:'#6e5a44',belt:'#4a3424',ph:16500},
  epaphras:{skin:'#c08e62',hair:'#5a4632',beard:'#5a4632',fullBeard:1,brow:'#3a2c20',tunic:'#d8ccb0',long:1,cloak:'#857a68',edge:'#7a3050',belt:'#4a3424',ph:16700},
  demas:{skin:'#c49470',hair:'#3a2a1e',beard:'#3a2a1e',shortBeard:1,receding:1,brow:'#2a1c12',tunic:'#9c8c6a',cloak:'#3e5a6a',belt:'#3a2818',ph:16900},
  justus:{skin:'#b88456',hair:'#2e2016',beard:'#2e2016',fullBeard:1,brow:'#22160e',tunic:'#d4c8a8',long:1,cloak:'#5a5a74',belt:'#4a3424',fringe:'#e6dcc6',ph:17100},
  carrier:{skin:'#b47a4c',hair:'#2a1a10',brow:'#1e140c',tunic:'#8e7656',belt:'#3a2818',pad:'#9a7a4e',ph:17300},
  rome_old:{skin:'#b88a62',hair:'#c8c2ba',beard:'#d0cac2',grey:'#ece6de',thin:1,fullBeard:1,brow:'#9a948c',tunic:'#a89a80',long:1,cloak:'#6a5a4a',belt:'#4a3424',ph:17500},
  rome_baker:{skin:'#c49068',hair:'#4a3626',beard:'#5a4636',grey:'#c8bca8',shortBeard:1,brow:'#30221a',tunic:'#e6dcc6',apron:'#f2ece0',belt:'#8a7a5a',ph:17700},
  rome_slave:{skin:'#8a5a36',hair:'#1e1410',crop:1,brow:'#1a100a',slim:1,tunic:'#a49478',belt:'#3a2818',ph:17900},
  rome_brother_a:{skin:'#c08c5c',hair:'#5a4632',beard:'#5a4632',receding:1,brow:'#3a2a1c',tunic:'#7a6a4e',belt:'#3a2818',ph:18100},
  rome_brother_b:{skin:'#c8986c',hair:'#3a2616',brow:'#2a1a12',slim:1,tunic:'#5e7a8a',belt:'#4a3020',ph:18300},
  rome_lady:{skin:'#cfa47e',hair:'#2e1c14',fem:1,band:'#8a5a2a',slim:1,brow:'#2a1a12',tunic:'#e6dcc4',long:1,longSleeve:1,trim:'#8a5a2a',cloak:'#7a4a3a',himation:1,belt:'#8a6a3a',necklace:'#d8b45a',ph:18500},
  rome_sister_a:{skin:'#b8865e',veil:'#6a6a58',veilHair:'#8e8880',tunic:'#9a8a6a',long:1,longSleeve:1,trim:'#5a5a48',slim:1,belt:'#4a3424',brow:'#6a645c',ph:18700},
  rome_sister_b:{skin:'#c49470',hair:'#4a2e1c',fem:1,band:'#4a6a5a',slim:1,brow:'#3a2414',tunic:'#b8a888',long:1,longSleeve:1,trim:'#4a6a5a',belt:'#6a4a2a',ph:18900},
  puteoli_host:{skin:'#b47e52',hair:'#6a625a',beard:'#7a7268',grey:'#a49c92',fullBeard:1,receding:1,brow:'#4a423a',tunic:'#dcd0b4',long:1,cloak:'#4a5a6a',belt:'#4a3424',ph:19100},
  puteoli_dock:{skin:'#9a6438',hair:'#2a1a10',beard:'#2a1a10',shortBeard:1,brow:'#1e140c',tunic:'#6e5a42',belt:'#2e2016',ph:19300},
  puteoli_young:{skin:'#c08c5c',hair:'#3a2a1c',brow:'#2a1a12',slim:1,tunic:'#9aa08a',belt:'#4a3a24',ph:19500},
  puteoli_sister:{skin:'#c4946a',veil:'#8a6a4a',tunic:'#c8b896',long:1,longSleeve:1,trim:'#6a4a2a',slim:1,belt:'#6a4a2a',brow:'#3a2414',ph:19700},
  carter:{skin:'#a87448',hair:'#3a2a1a',beard:'#4a3826',shortBeard:1,brow:'#2a1a10',tunic:'#a08e70',belt:'#3a2818',whip:'#4a3020',ph:19900},
  trader:{skin:'#c49064',hair:'#3a2a1c',beard:'#3a2a1c',shortBeard:1,brow:'#2a1c12',tunic:'#3e5a7a',long:1,cloak:'#8a6a3a',hatBack:'#b8a070',belt:'#6a4a26',ring:1,shoes:'#6a4026',ph:20100},
  boatman:{skin:'#94603a',hair:'#2a1a10',beard:'#3a2a1a',shortBeard:1,brow:'#1e140c',tunic:'#7a6a50',belt:'#2e2016',bareArm:1,spear:'pole',barefoot:1,ph:20300},
  sailor:SAILOR_1,
  innkeeper:{skin:'#c08a5a',hair:'#3a2a1c',beard:'#3a2a1c',fullBeard:1,receding:1,brow:'#2a1c12',tunic:'#5c6c7a',apron:'#c8b48a',belt:'#4a3020',ph:20500},
  landlady:{skin:'#c89a72',veil:'#8a4a3a',veilHair:'#8a837a',tunic:'#a89a76',long:1,longSleeve:1,trim:'#6a4a2a',belt:'#5a3a22',brow:'#5a524a',ph:20700},
  landlord:{skin:'#bc8a60',hair:'#5a5048',grey:'#8e867e',receding:1,brow:'#3a322a',tunic:'#d8ccb0',long:1,cloak:'#7a6a4a',himation:1,belt:'#5a4030',ring:1,ph:20900},
  freedman:{skin:'#c49a72',hair:'#3a2c20',crop:1,brow:'#2a1c12',tunic:'#e6dece',cloak:'#6e7a84',belt:'#5a4030',penCase:'#7a5a3a',ph:21100},
  jew_rome_1:{skin:'#b47e52',wrap:'#5a4e6a',beard:'#c8c2ba',grey:'#e4ded6',longBeard:1,brow:'#8a847c',tunic:'#d8ccb0',long:1,cloak:'#5a4e6a',belt:'#4a3424',fringe:'#e6dcc6',ph:21300},
  jew_rome_2:{skin:'#c08c5c',hair:'#6a625a',beard:'#7a7268',grey:'#a8a098',fullBeard:1,receding:1,brow:'#4a423a',tunic:'#a89a7a',long:1,cloak:'#3e4e5e',belt:'#3a2414',fringe:'#e6dcc6',ph:21500},
  jew_rome_3:{skin:'#a8703f',wrap:'#7a6a4a',beard:'#4a3a2c',fullBeard:1,brow:'#2a1a12',tunic:'#c8b890',long:1,cloak:'#7a6a4a',belt:'#3a2414',fringe:'#e6dcc6',ph:21700},
  jew_rome_4:{skin:'#bc8a60',hair:'#9a948c',beard:'#aaa49c',grey:'#d0cac2',bald:1,longBeard:1,brow:'#6a645c',tunic:'#e2d8c2',long:1,cloak:'#6a3a2c',belt:'#4a3424',fringe:'#e6dcc6',ph:21900},
  jew_rome_5:{skin:'#c49468',hair:'#5a4e44',beard:'#5e5248',grey:'#8a8078',thin:1,fullBeard:1,brow:'#3a2e24',tunic:'#9aa08a',long:1,cloak:'#4a5a4a',belt:'#3a2414',fringe:'#e6dcc6',ph:22100},
  jew_rome_6:{skin:'#b07a4c',hair:'#8a8278',beard:'#9a948c',grey:'#c4beb6',receding:1,longBeard:1,brow:'#5a544e',tunic:'#ddd2b8',long:1,cloak:'#5a3a46',belt:'#4a3424',fringe:'#e6dcc6',ph:22300},
  traveler_1:{skin:'#b88458',hair:'#4a3626',beard:'#4a3626',shortBeard:1,brow:'#30221a',tunic:'#8a7458',cloak:'#5a4a3a',belt:'#3a2818',ph:22500},
  traveler_2:{skin:'#c89a70',wrap:'#c8b088',beard:'#3a2a1c',brow:'#2a1c12',tunic:'#a08060',belt:'#4a3020',ph:22700},
  paul_home:(()=>{const o=paulLook(25);delete o.cloak;return o})(),
  paul_weary:Object.assign(paulLook(24),{weary:1})
};
/* two more soldiers of the watch in Rome, in the same dress as ROMAN.praetorian_watch and its fellows, each with a head and colors of
   his own, so that five different men can stand watch: a bald man of middle years, and a ruddy one with his hair receding */
Object.assign(ROMAN,{
  praetorian_watch_bald:{skin:'#b07c52',hair:'#3a2a1c',brow:'#2a1c12',bald:1,tunic:'#d6cdb6',cloak:'#3e4a5a',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:2500},
  praetorian_watch_ruddy:{skin:'#c88a64',hair:'#6a3a22',brow:'#4a2a18',receding:1,tunic:'#9a3a2a',cloak:'#5a5a3a',offCloak:1,
    belt:'#4a2c16',milBelt:1,caligae:1,gladius:1,ph:2700}});
/* the cat of the lodging (Chapter Twenty-Five): a small grey-brown cat, asleep and curled, her tail laid round her front, or awake and
   sitting, her tail round her feet. Two ears, small and apart; an eye is a square pixel. Drawn at x, y (where she touches the floor), in the
   room's light, at that depth. o: {room, awake, dir (the way her head looks)} */
function cat(g,x,y,o){o=o||{};const d=o.dir||1,lit=o.room?lightAt(o.room,x,y):null,B='#6a5a4a',L=c=>lit2(c,lit),X=v=>x+d*v;
  depth(y+.01,()=>{const M=SHARED.materials;if(M&&M.shadow)M.shadow(g,x,y,o.awake?2.6:4.2,.8,.45);
    if(!o.awake){g.fillStyle=L(B);oval(g,X(.6),y-1.7,3.3,1.75);g.fill();oval(g,X(-2.2),y-3,1.55,1.4);g.fill();
      poly(g,[X(-3.5),y-3.6,X(-3.2),y-4.7,X(-2.5),y-4.1],L(B));poly(g,[X(-1.9),y-4.2,X(-1.3),y-4.9,X(-.9),y-3.8],L(B));
      g.fillStyle=L(tint(B,.25));oval(g,X(1),y-2.9,2.6,.6);g.fill();R(g,x-3,y-.8,6.5,.8,L(tint(B,-.4)));
      stroke(g,[X(3.6),y-.9,X(2.2),y-.3,X(-.4),y-.35,X(-1.8),y-.8],L(tint(B,-.18)),.9);R(g,X(-2.7)-.25,y-3.2,.5,.5,L(tint(B,-.5)));return}
    /* sitting: the haunch, the chest rising from it, the head on the chest, the ears apart, the tail round the feet on the floor */
    g.fillStyle=L(B);oval(g,X(-.8),y-2,2.4,2);g.fill();poly(g,[X(-.2),y-3.6,X(1.6),y-6,X(2.4),y-5.6,X(2),y-1,X(.6),y],L(B));
    oval(g,X(2.2),y-6.6,1.4,1.2);g.fill();poly(g,[X(1.2),y-7.2,X(1.3),y-8.4,X(1.9),y-7.6],L(B));poly(g,[X(2.6),y-7.6,X(3.2),y-8.4,X(3.3),y-7.2],L(B));
    g.fillStyle=L(tint(B,.25));oval(g,X(-1.2),y-3.4,1.4,.6);g.fill();R(g,Math.min(X(1.6),X(2.4)),y-5.6,.8,2.6,L(tint(B,.18)));
    R(g,X(2.6)-.25,y-6.9,.5,.5,L('#d8c060'));stroke(g,[X(-2.6),y-.4,X(-.6),y-.2,X(1.6),y-.3,X(2.8),y-.6],L(tint(B,-.2)),.8)})}
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
                                   'one':    one chain, on one wrist (Acts 24-26, before the governor): the one soldier given (A on P's left,
                                             or B on his right) a pace off on that side, facing the way P faces, a keeper by the wrist toward
                                             P; P is chained to him (P.chainTo) by the wrist on his side, and wears no cuff on the other: his
                                             near wrist when the soldier stands behind him, his far one when the soldier stands ahead, so that
                                             it is the same hand whichever way P turns (poseOf, pz 'n' or 'f'). Only that far hand, when it is
                                             the chained one, may be raised with its chain (ges 1); a free far hand may do anything.
                                   Chained or held, P stands still where he is; a script that walks them walks all three alike.
     custody.chains(g, P, A, B, o) in a room's draw(g, t): a short chain from each of P's cuffs to the cuff of the keeper on that side,
                                   hanging a little between them (chained by one wrist: only to P.chainTo, a light chain that hangs in a curve, slack 1.6), drawn link by link as small squares of iron, light and dark in turn, at
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
function cuffPt(a,which){const d=facing(a),ps=a.pose&&POSE[a.pose]?a.pose+(a.pk|0):'',p=(ps?cuffAt(a.look,poseOf(a),a.ges||0,a.fr,ps):cuffAt(a.look,poseOf(a),a.ges||0,a.fr))[which];if(!p)return null;const ly=poseOf(a)==='l'?LIFT:0;return[hp(a.x)+d*p[0]*FIG.K,hp(a.y)-ly+p[1]*FIG.K]}
function place(kind,P,A,B){const d=P.dir||1;for(const a of[P,A,B])if(a){a.chained=a.held=a.keeper=a.grips=a.chainTo=a.wrist=a.tether=0;a.walk=null}
  if(kind==='one'){const S=A||B,side=A?-1:1;if(!S)return;P.chained=1;P.chainTo=S;S.room=P.room;S.dir=d;S.keeper=side===-d?'far':'near';S.x=P.x+side*18;S.y=P.y+(side===-d?-.5:.5);return}
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
/* a light chain on one wrist (P.chainTo): longer than the chains of Acts 21:33, so that it hangs in a light curve; its middle sags away
   from the straight line on the side that faces down, so that a chain that falls steeply from a raised hand bows a little instead of
   overshooting its lower end; the steeper it falls, the less it sags. Links every half pixel, light and dark in turn */
function hang(g,p,q,slack,lit){const dx=q[0]-p[0],dy=q[1]-p[1],d=Math.hypot(dx,dy)||1,L=d*slack+1,cs=Math.abs(dx)/d,s=Math.sqrt(Math.max(0,L*L-d*d))*.42*(.3+.7*cs),
    nx=-dy/d,ny=dx/d,f=ny<0||ny===0&&nx<0?-1:1,n=Math.max(2,Math.ceil(L*2)),C=[lit2(CUFF[1],lit),lit2(CUFF[3],lit)];let last='',j=0;
  for(let i=0;i<=n;i++){const t=i/n,b=s*4*t*(1-t)*f,x=p[0]+dx*t+nx*b,y=p[1]+dy*t+ny*b,k=Math.round(x*2)+','+Math.round(y*2);if(k===last)continue;last=k;
    g.fillStyle=C[j++%2];g.fillRect(Math.round(x*2)/2,Math.round(y*2)/2,.5,.5)}}
function chains(g,P,A,B,o){o=o||{};for(const S of[A,B]){if(!S||S.room!==P.room||!poseOf(S)||P.chainTo&&S!==P.chainTo)continue;if(P.tether){tether(g,P,S);continue}
  const sp=cuffPt(S,'far')||cuffPt(S,'near'),pf=cuffPt(P,'far'),pn=cuffPt(P,'near');if(!sp||!pf&&!pn)continue;
  const pp=!pn||pf&&Math.abs(pf[0]-sp[0])<Math.abs(pn[0]-sp[0])?pf:pn,z=Math.max(P.y,S.y)+.01,lit=lightAt(P.room,P.x,P.y);
  depth(z,()=>P.chainTo?hang(g,pp,sp,o.slack||1.6,lit):span(g,pp,sp,o.slack,lit))}}
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
/* ---- the long chain (Acts 28:16, 20, 30; Chapter Twenty-Five) ----
   In Rome Paul stayed by himself with the soldier who guarded him, on one chain. In the lodging the soldier sits (by the door, at the
   table, by the window: SHARED.lodging.AT.seats) and Paul moves about within the reach of a long chain, his right wrist to the soldier's
   left (poseOf: a.wrist 'right' keeps Paul's hand whichever way he turns; a.keeper 'long', the soldier's far hand, mirrored as every
   figure is when he faces left). The chain runs from the soldier's cuff over his lap and his knee
   down to the floor, along the floor in a loose curve or two, and up to Paul's cuff; as Paul goes farther the curves straighten, and he
   can never go so far that it is drawn taut (reach). It goes round whatever stands on the floor and never over its edge, never hangs
   straight down from the middle of anything, its curves never close into a ring, and each link is drawn at its own depth: on the floor
   at the floor's, and where it hangs from a hand at the depth of the one who holds it, in front of him where it falls on the side toward
   the other, behind him where it would cross him (and so too from a hand on the table, which it leaves behind him, into his lap).
     custody.sit(P, S, at, o)     chain P to S on a long chain, and sit S at a seat: at [x, y] (his feet), o: {dir (the way S faces), len
                                  (the chain's length in room pixels, LONG), walk (the room's whole walk strip; SHARED.lodging.WALK)};
                                  P walks freely within reach (the room's walk, see reach)
     custody.tether(g, P, S, o)   in a room's draw(g, t): the chain, link by link (custody.chains draws it as well, for a P with a tether)
     custody.path(P, S)           {pts, floor, slack, len}: the chain's points [x, y, z], those that lie on the floor (where a cat may sleep
                                  on it), how much of it is to spare, and its length
     custody.reach(room, at, o)   the box [x0, x1, y0, y1] of the room's walk strip (o.walk, the whole of it) that P can reach from a seat at
                                  [x, y] (o: {dir, len, walk, look and keeper: the two looks, ROME.paul_home and ROMAN.praetorian_watch}),
                                  with chain to spare everywhere in it: the room's walk while he is chained (a getter), and the test for a
                                  click on something out of reach (ROOMS[id].reach, see clickView)
     custody.stool(g, x, y, o)    in a room's draw: a stool standing on the floor with its foot line at y, as the lodging paints its own
                                  (o: {room, hour}): the one the soldier of the last watch carries (the figure painter's pose 'stool') and
                                  sets down where the chain reaches the door */
const LONG=115,MARG=[3,1.4],SPARE=.9,strip=()=>SHARED.lodging?SHARED.lodging.WALK:[14,306,106,138];
/* the floor: footprints of what stands on it, widened by a margin; where one who is on the chain sits, his seat leaves the floor free
   under him (a stool all of it, a bench as far as his body goes), so that the chain may leave from between his feet, and nowhere else */
function obstacles(room,skip,m){m=m||MARG;const out=[];for(const b of roomFeet(room).map(f=>f.b)){const s=skip.find(([x,y])=>x>b[0]-1&&x<b[2]+1&&y>b[1]-1&&y<b[3]+2);
    const parts=s?[[b[0],Math.min(b[2],s[0]-8)],[Math.max(b[0],s[0]+8),b[2]]].filter(([a,c])=>c-a>1):[[b[0],b[2]]];
    for(const[a,c]of parts)out.push([a-m[0],b[1]-m[1],c+m[0],b[3]+m[1]])}return out}
const inB=(B,x,y)=>B.some(b=>x>b[0]&&x<b[2]&&y>b[1]&&y<b[3]),fd=(p,q)=>Math.hypot(q[0]-p[0],(q[1]-p[1])*2);
/* does the segment p-q pass through the inside of box b (Liang and Barsky) */
function cuts(p,q,b){let t0=0,t1=1;const dx=q[0]-p[0],dy=q[1]-p[1];
  for(const[P_,Q_]of[[-dx,p[0]-b[0]],[dx,b[2]-p[0]],[-dy,p[1]-b[1]],[dy,b[3]-p[1]]]){if(P_===0){if(Q_<=0)return false;continue}const r=Q_/P_;if(P_<0){if(r>t1)return false;if(r>t0)t0=r}else{if(r<t0)return false;if(r<t1)t1=r}}
  return t1-t0>1e-6}
const clearSeg=(B,p,q)=>!B.some(b=>cuts(p,q,b));
/* the shortest way along the floor from a to b round the boxes, by their corners (the floor counts double in depth, as a walk does); a box
   that one of its ends lies in is left out, so that the chain leaves from under a seat by the shortest way */
function route(B,a,b,yl){B=B.filter(r=>!inB([r],a[0],a[1])&&!inB([r],b[0],b[1]));if(clearSeg(B,a,b))return[a,b];const N=[a,b];
  for(const r of B)for(const c of[[r[0]-.5,r[1]-.5],[r[2]+.5,r[1]-.5],[r[0]-.5,r[3]+.5],[r[2]+.5,r[3]+.5]])if(c[1]>=yl[0]&&c[1]<=yl[1]&&!inB(B,c[0],c[1]))N.push(c);
  const D=N.map(()=>Infinity),from=N.map(()=>-1),done=N.map(()=>0);D[0]=0;
  for(;;){let i=-1;for(let k=0;k<N.length;k++)if(!done[k]&&D[k]<Infinity&&(i<0||D[k]<D[i]))i=k;if(i<0||i===1)break;done[i]=1;
    for(let k=0;k<N.length;k++)if(!done[k]){const c=D[i]+fd(N[i],N[k]);if(c<D[k]&&clearSeg(B,N[i],N[k])){D[k]=c;from[k]=i}}}
  if(D[1]===Infinity)return[a,b];const out=[];for(let i=1;i>=0;i=from[i])out.unshift(N[i]);return out}
const len=pts=>{let s=0;for(let i=1;i<pts.length;i++)s+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);return s};
const quad=(a,c,b,n)=>{const o=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;o.push([u*u*a[0]+2*u*t*c[0]+t*t*b[0],u*u*a[1]+2*u*t*c[1]+t*t*b[1]])}return o};
/* one end of the chain: from the cuff of a down to the floor (lead, ending at the floor point F), and the depth it hangs at (z). Seated,
   over the lap and the knee and down in front of the shin; at the table writing, behind him into his lap; standing or walking, down from
   the hand, toward the other end where the hand is on that side, behind him where it is not */
function endOf(a,other){const c=cuffPt(a,'far')||cuffPt(a,'near');if(!c)return null;const d=facing(a),x=hp(a.x),y=hp(a.y),ps=a.pose&&POSE[a.pose];
  if(a.fr===-1&&!ps){
    /* on a bench, whose seat runs on past his knee, it falls behind his legs (from the knee between the shins, from the hip under the
       seat), so that it never crosses the seat's edge; on a stool, over the knee and down in front of the shin */
    if(roomFeet(a.room).some(f=>f.b[2]-f.b[0]>14&&a.x>f.b[0]-1&&a.x<f.b[2]+1&&a.y>f.b[1]-1&&a.y<f.b[3]+2)){const kn=(c[0]-x)*d>6,F=kn?[x+d*5,y-.8]:[c[0]+d,y-.8];
      return{c,F,z:a.y-.03,lead:kn?quad(c,[x+d*6,y-6],F,12):quad(c,[c[0],y-4],F,10),sat:1}}
    const K=[x+d*11.5,y-13.5],F=[x+d*14.5,y+1.6];return{c,F,z:a.y+.02,lead:[c].concat(quad(K,[K[0]+d*1.2,F[1]-1.5],F,12)),sat:1}}
  if(ps&&a.pose==='write'){const F=[x+d*5,y-1];return{c,F,z:a.y-.03,lead:quad(c,[c[0],F[1]],F,14)}}
  const s=other.x>=a.x?1:-1,front=Math.sign(c[0]-x)===s,F=[c[0]+s*6,y+(front?1.4:-1.2)];return{c,F,z:a.y+(front?.02:-.03),lead:quad(c,[c[0]+s*1.5,F[1]-3],F,14)}}
/* the chain's whole course: the soldier's end, the floor between, Paul's end; the floor in a loose curve or two as long as there is chain
   to spare, its sway in the floor's own plane, flipped or lessened where it would come too near something that stands there */
function path(P,S){const ES=endOf(S,P),EP=endOf(P,S);if(!ES||!EP)return null;const W=P.tetherW||strip(),
    skip=[[S.x,S.y]].concat(EP.sat||P.pose==='write'?[[P.x,P.y]]:[]),B=obstacles(P.room,skip),yl=[W[2]-4,143],fl=route(B,ES.F,EP.F,yl);
  /* the floor course, every pixel along it */
  const q=[];for(let i=1;i<fl.length;i++){const a=fl[i-1],b=fl[i],n=Math.max(1,Math.ceil(fd(a,b)));for(let k=i>1?1:0;k<=n;k++)q.push([a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n])}
  const cum=[0];for(let i=1;i<q.length;i++)cum.push(cum[i-1]+fd(q[i-1],q[i]));const D=cum[cum.length-1]||1,L=P.tether||LONG,
    slack=L-len(ES.lead)-len(EP.lead)-D,sl=len(q),n=sl<40?1:2,A0=Math.min(7,sl*.16,slack>0?2/(Math.PI*n)*Math.sqrt(slack*D):0);
  const sway=(A,sg)=>q.map((p,i)=>{const j=Math.min(q.length-1,i+1),h=Math.max(0,i-1),dx=q[j][0]-q[h][0],dy=(q[j][1]-q[h][1])*2,l=Math.hypot(dx,dy)||1,
      w=A*sg*Math.sin(Math.PI*n*cum[i]/D)*Math.min(1,cum[i]/6,(D-cum[i])/6);return[p[0]-dy/l*w,clamp(p[1]+dx/l*w/2,yl[0],yl[1])]});
  let floor=null;for(const A of[A0,A0*.6,A0*.3,0]){for(const sg of[1,-1]){const f=sway(A,sg);if(!f.some(p=>inB(B,p[0],p[1]))){floor=f;break}if(!A)floor=f}if(floor)break}
  /* where the ends lie close to something on the floor, the chain is laid along its edge, never over it */
  const raw=obstacles(P.room,skip,[.6,.4]);floor=floor.map(p=>{const b=raw.find(b=>p[0]>b[0]&&p[0]<b[2]&&p[1]>b[1]&&p[1]<b[3]);return b?[p[0],p[1]-b[1]<b[3]-p[1]?b[1]:b[3]]:p});
  const pts=ES.lead.map(p=>[p[0],p[1],ES.z]).concat(floor.map(p=>[p[0],p[1],p[1]]),EP.lead.slice().reverse().map(p=>[p[0],p[1],EP.z]));
  return{pts,floor,slack,len:L,D}}
/* the chain drawn: a link every half pixel along its course, light and dark in turn, at the canvas's own pixels; the links of one depth
   are laid down together, each run at its own depth in the room */
function tether(g,P,S){if(!S||S.room!==P.room)return;const pa=path(P,S);if(!pa)return;const p=pa.pts,runs=[];let last='',j=0,run=null;
  for(let i=1;i<p.length;i++){const a=p[i-1],b=p[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])*4));
    for(let k=i>1?1:0;k<=n;k++){const t=k/n,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=a[2]+(b[2]-a[2])*t,key=Math.round(x*2)+','+Math.round(y*2);if(key===last)continue;last=key;
      if(!run||Math.abs(z-run.z)>.5){run={z,l:[]};runs.push(run)}run.l.push([Math.round(x*2)/2,Math.round(y*2)/2,j++%2,y])}}
  for(const r of runs)depth(r.z+.004,()=>{for(const[x,y,c,fy]of r.l){const lit=lightAt(P.room,x,Math.max(fy,r.z));g.fillStyle=lit2(CUFF[c?3:1],lit);g.fillRect(x,y,.5,.5)}})}
/* the reach: the part of the walk strip where Paul may stand with chain to spare (worked out on the floor, round what stands there, for
   the soldier seated at, facing dir, and a hand's drop at each end); the box grows from the seat column by column while every place in
   the column is within reach */
const RCH={};
function reach(room,at,o){o=o||{};const L=o.len||LONG,dir=o.dir||1,W=o.walk||strip(),key=[room,at,L,dir,W].join();if(RCH[key])return RCH[key];
  /* worked out on the chain's own course (path), for a soldier seated there and Paul standing at each place, facing either way */
  const S={id:'reachS',room,x:at[0],y:at[1],dir,fr:-1,seat:1,keeper:'long',look:o.keeper||ROMAN.praetorian_watch},
    P={id:'reachP',room,x:0,y:0,dir:1,fr:0,chained:1,chainTo:S,wrist:'right',tether:L,tetherW:W,look:o.look||ROME.paul_home},spare=L*(1-SPARE),
    ok=(x,y)=>{if(floorHit(room,x,y))return true;P.x=x;P.y=y;for(const d of[1,-1]){P.dir=d;const pa=path(P,S);if(!pa||pa.slack<spare)return false}return true},
    ys=[];for(let y=W[2];y<=W[3]+.01;y+=(W[3]-W[2])/4)ys.push(y);
  let y0=W[2],y1=W[3];const col=x=>ys.filter(y=>y>=y0&&y<=y1).every(y=>ok(x,y));
  while(!col(clamp(at[0],W[0],W[1]))&&y1-y0>4){if(Math.abs(at[1]-y0)>Math.abs(at[1]-y1))y0+=2;else y1-=2}
  let x0=clamp(at[0],W[0],W[1]),x1=x0;while(x0-3>=W[0]&&col(x0-3))x0-=3;while(x1+3<=W[1]&&col(x1+3))x1+=3;
  return RCH[key]=[x0,x1,y0,y1]}
/* a stool on the floor: a small square seat on four legs at its corners, as high as a seated man's hips, its top seen a little from above,
   in the room's light, with its contact shadow */
function stool(g,x,y,o){o=o||{};const lit=o.room?lightAt(o.room,x,y):null,Wd='#6a4c30',hw=5,t=y-9,col=c=>lit2(c,lit);
  depth(y,()=>{const M=SHARED.materials;if(M&&M.shadow)M.shadow(g,x,y-.6,hw+1,1.2,.45);
    for(const lx of[x-hw+1.6,x+hw-2.6])R(g,lx,t+1,1,y-2-t,col(tint(Wd,-.45)));
    poly(g,[x-hw+1,t-1.6,x+hw-1,t-1.6,x+hw,t,x-hw,t],col(tint(Wd,.22)));R(g,x-hw,t,hw*2,1.6,col(Wd));R(g,x-hw,t,hw*2,.5,col(tint(Wd,.12)));
    for(const lx of[x-hw+.2,x+hw-1.8]){R(g,lx,t+1.6,1.6,y-t-1.6,col(tint(Wd,-.12)));R(g,lx,y-.5,1.6,.5,'#24160c')}})}
function sit(P,S,at,o){o=o||{};for(const a of[P,S]){a.chained=a.held=a.keeper=a.grips=a.chainTo=a.wrist=a.tether=0;a.walk=null;a.pose=0}
  S.room=P.room;S.x=at[0];S.y=at[1];S.dir=o.dir||(P.x>=at[0]?1:-1);S.seat=1;S.keeper='long';
  P.chained=1;P.chainTo=S;P.wrist='right';P.tether=o.len||LONG;P.tetherW=o.walk||strip()}
const custody={place,chains,grips,knot,cuffPt,CARRIERS,sit,tether,path,reach,stool,LONG};

return{ROMAN,SANHEDRIN,FAMILY,CAESAREA,SHIPWRECK,SEA,ROME,shipwrecked,custody,cat}})();
