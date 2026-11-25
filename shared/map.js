/* Paul of Tarsus: the travel map, shared by every chapter and loaded on demand (see need() in index.html).
   A painted map of the eastern Mediterranean, our own: the coasts are rough real coordinates in an equirectangular projection,
   painted like the rooms (gradients, texture, relief, then the ordered dither). Cities are round dots. There are no grid lines,
   no compass and no markers, and the routes are laid out so that they never cross.

     journey(route, o)   between scenes: earlier legs are shown, the new ones draw themselves as dotted lines, city by city,
                         with a music sting. route: [[from, to, 'new sea'], ...]; 'new' legs animate, 'sea' legs follow waypoints.
     pick(ids, here, o)  for a hub chapter: the places as dots; resolves with the place the player clicks, or null (Esc).
                         o.legs: the legs already travelled, [[from, to], ...], which are shown. o.seen: places whose dots are lit
                         although no leg reaches them. o.hint: the key of the line under the map (click_a_place_to_travel_there).
                         It may be called again and again, with the same places: each call shows the map afresh and waits for one
                         click. Chapter Eighteen's elders (Acts 21:19) use it on the view journeys with trail(picked) as its legs.
     trail(ids)          the legs to draw for places picked in order (see WAYS)
     go(from, to)        draw one leg and arrive.
     where(id)           a place's position on the map, in view pixels.
   A place with hide:1 is a point on a road and nothing more: a leg may start or end there, and neither a dot nor a name is drawn.
   A place with cape:1 is a cape: its name is drawn and no dot, and a sea leg may run round it (Cape Lectum).
   journey and pick take o.labels: where a place's name goes on this chapter's map, {id:{lab, dx, dy, sz}}, when its usual side would
   lie across one of the chapter's routes; and o.view: the window a chapter looks through (see VIEWS), when its road leaves the usual one.
   journey takes o.night: the window is darkened, for a road travelled by night; the route and the names stay bright; o.seen: places that
   are shown from the start although no leg of this map reaches them (Athens and Corinth, in Chapter Twelve: the account names no road
   between them, so none is drawn); and o.pulse: the place where the light stands. */
SHARED.map=(()=>{
"use strict";
const W=320,H=144,LON0=23.2,LAT0=37.45,KX=18.4,KY=22.15;
const xy=(lon,lat)=>[(lon-LON0)*KX,(LAT0-lat)*KY];
/* views: the map is larger than the screen, and a chapter may look at another part of it. A view is how far its window lies to the right
   of and below the usual one, in view pixels (whole ones, so that the painting stays crisp). north: Asia Minor as far as Galatia, with
   its upper edge at about 39.3 degrees north and its left edge at about 24.6 east; Jerusalem and Egypt lie below it. aegean: the lands
   round the Aegean, from about 21 to 38.4 degrees east and 35.5 to 42 north: Macedonia and Achaia on the left, Asia Minor as far as
   Iconium on the right, the Black Sea along the top. west: the same lands seen from a little further west, from about 19.8 degrees
   east, so that Thessalonica and Beroea have room for their names (Chapter Ten). Everything on the map keeps its coordinates in every
   view (the usual window's pixels); only the window moves. ionia: the coast of Asia from the Troad to Miletus, two and a quarter times as close (a third
   number is how many view pixels a pixel of the map takes), from about 22.9 to 30.6 degrees east and 37.1 to 40.0 north, for the
   voyage of Acts 20:13-17, where Assos, Mitylene, Chios, Samos and Miletus lie a few pixels apart. In a closer view the coasts, the
   lines and the routes keep their places on the map, and the names, the dots and the strokes keep their size on the screen.
   caria: the coast from Miletus by Cos and Rhodes to Patara, three times as close, from about 25.4 to 31.2 degrees east and 35.8 to 38.0
   north, for the first days of Acts 21:1, where those places lie a few pixels apart. levant: the whole voyage of Acts 21:1-8, from Miletus
   by Patara, south of Cyprus, to Tyre, Ptolemais and Caesarea, at the usual size, from about 24.3 to 41.6 degrees east and 31.4 to 37.9 north.
   journeys: everything of the first two journeys and the start of the third, a little farther off than usual (four fifths of the usual
   size), from about 19.8 to 39.9 degrees east and 34.2 to 41.8 north: Cyprus, Pamphylia and the cities of Pisidia and Lycaonia, Macedonia
   and Achaia, and Ephesus, for Chapter Eighteen, where Paul tells the elders one by one what God had done among the nations (Acts 21:19).
   Its names stand where JLAB puts them, unless a chapter gives its own. */
const VIEWS={north:[26,-41],aegean:[-40,-101],west:[-62,-101],ionia:[-6,-57,2.25],caria:[41,-11,3],levant:[20,-10],journeys:[-62,-96,.86]};
let OX=0,OY=0,ZM=1,VN='';
/* where the name of the sea stands: in open water, clear of the routes and of the hint under it, in each view */
const SEA={'-62,-96':[60,56],'0,0':[92,84],'26,-41':[60,65],'-40,-101':[95.7,35.4],'-62,-101':[95.7,35.4],'-6,-57':[8.6,-37.7],'41,-11':[46,30],'20,-10':[100,100]};
/* where the hint under a map to pick from stands, in screen pixels from the top, where the usual place (H - 14) would cross a coast */
const HINT={journeys:H-5};
/* VLAB: where the names stand in a view that has names of its own (as a chapter gives journey and pick its labels), unless the chapter
   gives others */
const VLAB={journeys:{salamis:{lab:'r'},paphos:{lab:'l',dy:2},thessalonica:{lab:'l',dy:-4},corinth:{lab:'l',dy:2},athens:{lab:'r',dy:12}}};
const inView=(x,y,m)=>{m/=ZM;return x>=OX-m&&x<=OX+W/ZM+m&&y>=OY-m&&y<=OY+H/ZM+m};
/* Rz: a small square of the route, snapped to the canvas pixels of the view however close it is (R, at the usual size) */
const Rz=(g,x,y,w,h,c)=>{const k=HR*ZM,s=v=>Math.round(v*k)/k;g.fillStyle=c;g.fillRect(s(x),s(y),s(w),s(h))};
const pts=a=>{const o=[];for(let i=0;i<a.length;i+=2)o.push(...xy(a[i],a[i+1]));return o};
/* places: lon, lat, the side the name goes on, and dy to raise or lower a name clear of a line. Names, here and below, are English and
   translated as they are drawn (T); a name may be longer in another language, and the playtest checks that none crosses a line. */
const PLACES={
  damascus:{name:'Damascus',at:[36.29,33.51],lab:'r'},jerusalem:{name:'Jerusalem',at:[35.22,31.78],lab:'r',dy:-2},
  caesarea:{name:'Caesarea',at:[34.89,32.50],lab:'l'},tarsus:{name:'Tarsus',at:[34.89,36.92],lab:'l'},
  antioch:{name:'Antioch',at:[36.16,36.20],lab:'r'},seleucia:{name:'Seleucia',at:[35.93,36.12],lab:'r',dy:4.6},
  tyre:{name:'Tyre',at:[35.20,33.27],lab:'r',minor:1},salamis:{name:'Salamis',at:[33.90,35.18],lab:'l',minor:1},
  paphos:{name:'Paphos',at:[32.42,34.76],lab:'l',minor:1},alexandria:{name:'Alexandria',at:[29.92,31.20],lab:'r',minor:1},
  perga:{name:'Perga',at:[30.85,36.96],lab:'l',dy:-3},antiochp:{name:'antioch_in_pisidia',at:[31.19,38.30],lab:'l'},
  iconium:{name:'Iconium',at:[32.49,37.87],lab:'r'},lystra:{name:'Lystra',at:[32.35,37.58],lab:'l'},derbe:{name:'Derbe',at:[33.39,37.35],lab:'r'},
  attalia:{name:'Attalia',at:[30.66,36.86],lab:'l',dy:3.6},
  /* two passes on the trade road from Syria: through the Amanus north of Antioch, and through the Taurus north of Tarsus */
  syriangates:{name:'syrian_gates',at:[36.28,36.48],lab:'r'},ciliciangates:{name:'cilician_gates',at:[34.78,37.28],lab:'r'},
  /* round the Aegean. Philippi lay some 15 km inland of its port, less than two dots apart on this map: it stands a little further
     north-west than it lay, so that the two can be told apart. The name of Samothrace is set small, between Thasos and Athos. */
  troas:{name:'Troas',at:[26.15,39.75],lab:'l',dy:3},samothrace:{name:'Samothrace',at:[25.56,40.5],lab:'l',dy:1.2,sz:4},
  neapolis:{name:'Neapolis',at:[24.41,40.94],lab:'r',dy:-3.6},philippi:{name:'Philippi',at:[24.22,41.1],lab:'l'},
  /* two points on the road of Acts 16:6-8 that the account does not name: where a paved road ran west toward Ephesus, and where the
     road north came near Bithynia */
  westroad:{name:'',at:[30.95,39.0],hide:1},bithynianroad:{name:'',at:[29.8,40.2],hide:1},
  /* along the Egnatian Way from Philippi (Acts 17:1), and on to Beroea and Athens. The two towns they passed through lie a day's walk
     from each other and from Thessalonica, a few dots apart on this map: their names are set small, and each chapter's map says where
     they go. The account sends Paul from Beroea to the sea and names no harbor: the point on the coast has no dot and no name. */
  amphipolis:{name:'Amphipolis',at:[23.85,40.82],lab:'l',sz:4},apollonia:{name:'Apollonia',at:[23.47,40.63],lab:'l',sz:4},
  thessalonica:{name:'Thessalonica',at:[22.95,40.63],lab:'l'},beroea:{name:'Beroea',at:[22.2,40.52],lab:'l'},
  seaward:{name:'',at:[22.64,40.42],hide:1},athens:{name:'Athens',at:[23.73,37.98],lab:'b'},
  /* Corinth, by its isthmus (Acts 18:1). Cenchreae, its eastern harbor (Acts 18:18), lay 11 km away, less than a dot on this map: it
     is the point on the coast where the sea road begins, and has no dot and no name of its own. Ephesus (Acts 18:19); and a point
     off Samos where the course home to Caesarea leaves the course that came in, so that no stretch of sea is drawn twice. */
  corinth:{name:'Corinth',at:[22.9,37.9],lab:'l'},cenchreae:{name:'',at:[23.06,37.87],hide:1},
  ephesus:{name:'Ephesus',at:[27.32,37.93],lab:'r'},offsamos:{name:'',at:[26.46,37.92],hide:1},
  /* from Troas to Miletus (Acts 20:13-17). Assos, the seaport of Mysia on the north shore of the Gulf of Adramyttium, which the ship
     reached round Cape Lectum while Paul came over the land; Mitylene, the chief city of Lesbos, on its eastern shore; the anchorage
     opposite Chios, in the strait between the island and the mainland (the dot is where the ship lay, the name stands for the island,
     west of it); Samos, the city on the island's southern shore; and Miletus, by the mouth of the Maeander, on the southern shore of
     the gulf that the elders of Ephesus crossed. Cape Lectum is a name and no dot (cape:1): the ship's way runs round it. */
  assos:{name:'Assos',at:[26.34,39.49],lab:'r',dy:-7},lectum:{name:'cape_lectum',at:[25.97,39.45],lab:'l',cape:1,dy:2,sz:4},
  mitylene:{name:'Mitylene',at:[26.6,39.11],lab:'r',dx:11},chios:{name:'Chios',at:[26.27,38.46],lab:'l',dx:-16},
  samos:{name:'Samos',at:[26.95,37.67],lab:'t',dy:-4},miletus:{name:'Miletus',at:[27.27,37.5],lab:'r',dy:2.5},
  /* from Miletus to Caesarea (Acts 21:1-8). Cos, the town at the north-eastern end of the island; Rhodes, the city at the northern tip of
     its island; Patara, the seaport of Lycia, some 10 km east of the mouth of the Xanthus, on this map a point of the coast; Ptolemais,
     the old Acco, at the northern end of the bay that Mount Carmel closes (Tyre and Caesarea are above). The road up to Jerusalem from
     Caesarea (Acts 21:15) is drawn only as far as a point inland, where the chapter ends. */
  cos:{name:'Cos',at:[27.29,36.89],lab:'r'},rhodes:{name:'Rhodes',at:[28.22,36.406],lab:'r',dy:6},patara:{name:'Patara',at:[29.35,36.26],lab:'l',dy:5},
  ptolemais:{name:'Ptolemais',at:[35.07,32.92],lab:'r',dy:-2.4},tojerusalem:{name:'',at:[35.02,32.22],hide:1}};
/* waypoints for legs that do not run straight: by sea up the coast and east of Cyprus; by road round the Gulf of Issus; through
   the south of Cyprus, the way tradition has them go from Salamis to Paphos; by sea clear of the western cape of Cyprus; up the valley
   through the Taurus; along the foot of the mountains to Iconium; and home from Attalia by sea, between Cyprus and the coast of Cilicia */
const VIA={'caesarea-tarsus':[34.42,33.3,34.5,34.7,34.88,35.75],'tarsus-antioch':[35.6,37.02,36.2,37.03,36.32,36.7,36.3,36.45],
  'salamis-paphos':[33.45,34.99,32.95,34.8],'paphos-perga':[32.0,35.2,31.35,36.25],'perga-antiochp':[31.0,37.6],'antiochp-iconium':[31.85,38.02],
  'attalia-seleucia':[31.2,36.4,32.2,35.92,33.2,35.74,34.2,35.9,35.1,36.14],
  /* from the Syrian Gates round the Gulf of Issus to Tarsus; and from the Cilician Gates out onto the plateau, and west to Derbe */
  'syriangates-tarsus':[36.32,36.7,36.2,37.03,35.6,37.02],'ciliciangates-derbe':[34.55,37.47,34.05,37.5],
  /* north through Phrygia and Galatia, then west through Mysia to the sea; from Troas between Lemnos and Imbros to Samothrace, and
     through the strait north of Thasos to Neapolis */
  'antiochp-westroad':[31.05,38.7],'westroad-bithynianroad':[30.6,39.72],'bithynianroad-troas':[28.9,40.02,27.9,39.95,27.0,39.86],
  'troas-samothrace':[25.92,39.9,25.57,40.06,25.5,40.3],'samothrace-neapolis':[25.1,40.72,24.72,40.86],
  /* round the head of the gulf to Beroea; and by sea down the gulf, outside Euboea, between it and Andros, and round the cape of
     Attica. The account names neither the harbor nor the course: the line shows open water. */
  'thessalonica-beroea':[22.6,40.67],
  'seaward-athens':[22.95,40.1,23.2,39.75,23.65,39.3,24.1,38.95,24.55,38.55,24.8,38.2,24.62,37.99,24.4,37.75,24.1,37.58,23.8,37.68,23.63,37.84],
  /* from Cenchreae out of the gulf, well south of the cape of Attica (and of the name of Athens), south of Tinos, north of Icaria
     and of Samos, into the gulf of Ephesus;
     and home: between Icaria and Samos, west of Cos, between Carpathus and Rhodes, south of Cyprus, to Caesarea. The account names
     no course for either: the lines show open water. Then up to Jerusalem, and north to Antioch behind the mountains of the coast. */
  'cenchreae-offsamos':[23.4,37.74,23.62,37.5,23.8,37.3,24.2,37.14,24.8,37.16,25.3,37.3,25.72,37.72,26.12,37.88],
  'offsamos-caesarea':[26.47,37.62,26.52,37.3,26.72,36.95,27.05,36.5,27.45,35.98,27.75,35.62,28.6,35.3,30.2,34.7,31.8,34.25,33.2,33.85,34.2,33.2],
  'jerusalem-antioch':[35.5,32.5,36.2,33.2,36.62,34.4,36.6,35.4],
  /* Acts 20:13-17. The ship from Troas down the coast and round Cape Lectum, and on along the north shore of the gulf to Assos; Paul's
     way over the land, inland of both; from Assos east, and down the strait between Lesbos and the mainland to Mitylene; from there
     past the point of the long peninsula into the strait off Chios; out of it, between Icaria and Samos, to the city of Samos; and on,
     into the mouth of the gulf, to Miletus. The account names no course: the lines show open water. The messenger's way, and the
     elders' after him: across the gulf from Miletus, and over the land east of Mycale to Ephesus. */
  'troas-lectum':[26.02,39.64,25.97,39.54],'lectum-assos':[26.06,39.415,26.2,39.43],'troas-assos':[26.25,39.64,26.32,39.56],
  'assos-mitylene':[26.5,39.45,26.66,39.33,26.69,39.2],'mitylene-chios':[26.66,39.0,26.5,38.82,26.3,38.68],
  'chios-samos':[26.2,38.3,26.22,38.12,26.3,37.95,26.47,37.74,26.62,37.6,26.84,37.6],'samos-miletus':[27.08,37.59,27.18,37.535],
  'miletus-ephesus':[27.3,37.62,27.4,37.72,27.38,37.84],
  /* Acts 21:1-8. Out of the gulf of Miletus and south, west of the long peninsula, to Cos; round the eastern end of Cos and the point of
     Cnidus, and east to Rhodes; along the coast of Lycia to Patara. From Patara across the open sea, well south of Cyprus, which is left
     on the left (21:3), to Tyre; down the coast to Ptolemais; and round Carmel along the coast to Caesarea. The account names no course,
     and does not say whether the last leg went by land or by sea: the lines keep to the coast. */
  'miletus-cos':[27.12,37.4,27.1,37.15,27.22,36.98],'cos-rhodes':[27.375,36.76,27.37,36.66,27.75,36.56,28.05,36.49],'rhodes-patara':[28.6,36.48,29.05,36.38],
  'patara-tyre':[29.6,35.95,30.5,34.9,31.6,34.35,32.6,34.1,33.6,33.95,34.4,33.6,34.9,33.33],'tyre-ptolemais':[35.13,33.2,35.05,33.02],
  'ptolemais-caesarea':[35.0,32.92,34.9,32.82,34.88,32.66]};
/* region names sit where no coast, lake or route runs through them. close: a name with its letters set closer together, for a region
   too small to hold a widely spaced one; north: a name shown only in the northern window and the Aegean one, where the mountains make
   room for it; west: a name shown only in the Aegean window */
const REGIONS=[{name:'CILICIA',at:[32.7,36.72],out:['journeys']},{name:'SYRIA',at:[37.6,35.2]},{name:'CYPRUS',at:[33.2,34.35],sea:1},
  {name:'PISIDIA',at:[29.62,37.68]},{name:'GALATIA',at:[33.6,38.75]},
  {name:'PAMPHYLIA',at:[32.015,37.02],close:1,north:1},
  {name:'PHRYGIA',at:[29.6,38.9],west:1,out:['journeys']},{name:'ASIA',at:[27.75,38.8],west:1},{name:'MYSIA',at:[27.9,39.6],west:1},
  {name:'BITHYNIA',at:[31.3,40.72],west:1},{name:'MACEDONIA',at:[22.75,41.5],west:1},{name:'ACHAIA',at:[22.2,38.62],west:1,out:['journeys']},
  /* Lycia, behind Patara, only in the close window of Chapter Seventeen (in: the views a name is shown in): in the wider ones the
     strip of land between the Taurus and the sea holds Pamphylia and Cilicia already. out: the views a name is not shown in (in the far
   window of the journeys, Cilicia, Phrygia and Achaia would run into coasts, islands or each other) */
  {name:'LYCIA',at:[29.9,36.75],in:['caria']}];
/* the coast of the mainland of Asia: along the Black Sea to the Bosporus, the Propontis and the Hellespont, round the Troad and down
   the Aegean shore, round Asia Minor, down the Syrian and Phoenician coast, and west along Egypt. The first three lines lie above the
   usual window: the Black Sea shore; the Propontis, with the gulfs on its Asian side, and the Troad; then the gulfs of Smyrna and
   Ephesus, and the long capes between them. */
const COAST=pts([40.5,41.0,39.7,41.0,38.4,40.93,37.9,41.0,37.7,41.13,37.28,41.13,36.95,41.28,36.65,41.38,36.33,41.29,36.05,41.45,35.95,41.72,35.5,41.66,35.2,41.98,34.95,42.06,34.2,41.95,33.76,41.98,33.34,42.02,
  32.9,41.87,32.39,41.75,32.05,41.58,31.79,41.45,31.42,41.3,31.16,41.09,30.65,41.13,30.23,41.2,29.61,41.18,29.17,41.23,29.11,41.12,29.05,41.02,
  29.3,40.84,29.93,40.76,29.5,40.68,29.28,40.65,28.78,40.53,29.0,40.47,29.15,40.42,28.9,40.37,28.6,40.38,28.25,40.4,27.97,40.36,28.05,40.48,27.85,40.53,27.62,40.49,27.7,40.38,27.5,40.33,27.3,40.42,27.0,40.4,
  26.72,40.33,26.43,40.14,26.24,40.0,26.16,39.86,26.15,39.75,26.1,39.6,26.07,39.48,26.34,39.49,26.62,39.54,26.95,39.58,26.88,39.47,26.72,39.3,26.9,39.07,27.0,38.92,26.96,38.8,26.76,38.68,26.85,38.54,27.1,38.45,26.88,38.37,26.66,38.34,26.6,38.5,26.5,38.64,26.36,38.66,26.4,38.42,
  26.26,38.3,26.42,38.24,26.78,38.18,26.86,38.03,27.24,37.96,27.26,37.84,27.2,37.72,27.0,37.66,27.2,37.62,27.4,37.6,27.43,37.56,27.36,37.53,27.28,37.51,27.2,37.45,27.25,37.3,27.6,37.12,27.45,36.98,28.0,36.98,28.25,36.84,27.42,36.72,28.1,36.74,28.6,36.74,28.92,36.64,29.12,36.6,29.35,36.26,
  29.66,36.15,30.15,36.25,30.46,36.32,30.56,36.64,30.72,36.88,31.02,36.85,31.42,36.74,31.76,36.55,32.02,36.5,32.3,36.22,32.62,36.08,32.96,36.1,33.32,36.14,
  33.66,36.2,33.96,36.3,34.16,36.45,34.46,36.7,34.66,36.8,34.92,36.74,35.3,36.6,35.56,36.58,35.76,36.75,35.96,36.86,36.16,36.95,36.2,36.72,36.06,36.56,
  35.96,36.36,35.95,36.1,35.84,35.86,35.75,35.52,35.92,35.35,35.95,35.18,35.87,34.9,35.8,34.45,35.65,34.25,35.63,34.12,35.48,33.9,35.44,33.7,35.36,33.56,
  35.2,33.28,35.12,33.1,35.07,32.92,34.96,32.84,34.93,32.68,34.89,32.5,34.85,32.33,34.75,32.06,34.64,31.8,34.55,31.67,34.45,31.52,34.24,31.32,33.8,31.13,
  33.2,31.15,32.75,31.08,32.55,31.05,32.3,31.26,31.85,31.52,31.5,31.56,31.0,31.6,30.6,31.5,30.36,31.46,30.06,31.32,29.9,31.2,29.5,31.04,29.3,30.95]);
/* the land is closed far outside every window */
const LAND=COAST.concat(pts([29.3,27,46,27,46,41.0]));
/* Europe: from the Bosporus along the Propontis and the Hellespont, round the Thracian Chersonese, along Thrace and Macedonia with the
   three fingers of Chalcidice, down the east of Greece, round the Peloponnese (which hangs by its isthmus), up the western coast, and
   closed far outside every window. The straits are narrower than a pixel of this map, and are drawn a little wider than they are.
   The usual window begins at 23.2 degrees east and 37.45 north: the Argolid is cut a little short, so that nothing of Europe shows in it. */
const EUROPE=pts([29.02,41.25,28.97,41.12,28.93,41.02,28.6,40.97,28.25,41.07,27.97,40.97,27.51,40.98,27.3,40.78,27.11,40.61,26.85,40.5,26.62,40.44,26.4,40.27,26.3,40.14,26.17,40.04,26.14,40.1,26.25,40.22,26.45,40.38,26.65,40.52,
  26.8,40.62,26.55,40.63,26.3,40.62,26.08,40.7,25.87,40.84,25.5,40.87,25.1,40.95,24.85,40.9,24.62,40.93,24.41,40.94,24.3,40.83,24.1,40.72,23.85,40.78,23.71,40.72,23.7,40.66,23.79,40.59,23.88,40.42,24.15,40.32,24.39,40.13,24.2,40.2,23.98,40.32,
  23.74,40.3,23.9,40.15,23.98,39.96,23.76,40.05,23.7,40.2,23.5,40.27,23.6,40.1,23.72,39.93,23.4,39.98,23.3,40.15,23.0,40.27,22.9,40.37,22.95,40.55,22.95,40.63,22.75,40.6,22.65,40.47,22.6,40.3,22.6,40.1,22.75,39.85,22.92,39.68,
  23.25,39.35,23.3,39.15,23.05,39.02,22.85,38.98,22.6,38.9,22.78,38.8,23.03,38.75,23.1,38.65,23.3,38.55,23.48,38.46,23.62,38.38,23.82,38.28,24.02,38.12,24.01,38.02,24.06,37.72,24.03,37.65,23.8,37.8,23.63,37.94,23.5,38.04,23.35,37.98,
  23.05,37.9,23.16,37.63,23.45,37.5,23.3,37.46,23.15,37.31,22.8,37.57,22.72,37.6,22.75,37.4,22.9,37.1,23.05,36.8,23.2,36.44,22.95,36.52,22.8,36.8,22.57,36.76,22.48,36.39,22.37,36.5,22.15,36.9,22.11,37.02,21.95,36.8,21.7,36.8,
  21.65,37.0,21.57,37.25,21.3,37.65,21.12,37.93,21.35,38.17,21.73,38.25,21.78,38.31,22.08,38.26,22.6,38.02,22.9,37.97,22.98,38.0,22.86,38.04,23.1,38.06,23.22,38.15,22.9,38.2,22.63,38.37,22.42,38.43,22.38,38.37,22.1,38.35,
  21.83,38.39,21.77,38.33,21.43,38.36,21.15,38.3,21.1,38.36,21.0,38.6,20.9,38.8,20.75,38.95,20.5,39.25,20.25,39.5,20.0,39.7,19.9,39.9,19.45,40.35,19.4,41.0,19.5,41.6,19.0,42.5,18.5,44,27.9,44,27.9,42.3,28.05,41.9,28.6,41.4]);
const ISLES=[EUROPE,
  /* the northern Aegean: Samothrace, Thasos, Imbros, Lemnos; and off the coast of Greece, Euboea and Skyros */
  pts([25.45,40.5,25.6,40.51,25.72,40.46,25.7,40.4,25.55,40.38,25.44,40.43]),pts([24.52,40.69,24.65,40.79,24.78,40.7,24.73,40.59,24.6,40.57]),
  pts([25.67,40.17,25.85,40.24,26.02,40.16,25.9,40.1,25.7,40.11]),pts([25.04,39.92,25.2,40.03,25.44,39.98,25.36,39.8,25.2,39.83,25.08,39.84]),
  pts([23.0,38.87,23.3,39.03,23.45,38.9,23.75,38.72,24.15,38.65,24.25,38.35,24.58,38.15,24.5,37.97,24.25,38.02,24.05,38.3,23.72,38.42,23.62,38.52,23.3,38.7,23.1,38.82]),
  pts([24.4,38.95,24.54,38.9,24.6,38.78,24.46,38.76]),
  pts([32.27,35.08,32.6,35.18,32.95,35.38,33.4,35.34,33.9,35.37,34.3,35.55,34.59,35.69,34.2,35.45,33.95,35.27,34.05,35.0,33.62,34.88,33.02,34.62,32.62,34.68,32.4,34.75]),
  pts([23.55,35.3,23.6,35.58,24.0,35.52,24.3,35.37,24.9,35.42,25.4,35.32,25.72,35.2,26.1,35.22,26.3,35.31,26.22,35.04,25.73,35.0,25.0,34.95,24.72,34.94,24.3,35.15,23.9,35.25]),
  pts([27.7,36.15,28.0,36.45,28.25,36.4,28.2,36.1,27.85,35.9,27.7,35.98]),pts([27.08,35.42,27.22,35.4,27.25,35.85,27.12,35.86]),
  pts([26.86,36.86,27.3,36.9,27.36,36.8,26.95,36.78]),pts([25.36,37.14,25.56,37.12,25.52,36.98,25.36,36.96]),pts([25.26,36.48,25.46,36.44,25.42,36.36,25.28,36.36]),
  pts([24.32,36.76,24.56,36.78,24.52,36.66,24.36,36.64]),pts([25.74,36.9,26.0,36.86,25.98,36.8,25.74,36.82]),pts([26.28,36.62,26.44,36.6,26.38,36.52,26.26,36.54]),
  /* above the usual window: Samos, Icaria, Chios, Lesbos, Andros and Tinos */
  pts([26.57,37.73,26.7,37.8,26.9,37.78,27.07,37.72,26.95,37.66,26.7,37.66]),pts([25.98,37.52,26.12,37.62,26.36,37.68,26.3,37.6,26.05,37.5]),
  pts([25.86,38.56,26.0,38.6,26.16,38.52,26.14,38.3,26.1,38.17,25.98,38.16,25.9,38.3]),pts([25.85,39.2,26.0,39.3,26.35,39.38,26.6,39.3,26.6,39.05,26.4,38.97,26.15,39.02,26.05,39.12]),
  pts([24.7,37.98,24.78,38.0,24.96,37.86,24.9,37.76,24.76,37.86]),pts([25.0,37.66,25.1,37.68,25.24,37.58,25.2,37.52,25.05,37.58]),
  /* west of Greece, seen only in the western window: Corcyra, Leucas, Cephallenia and Zacynthus */
  pts([19.65,39.8,19.95,39.78,20.1,39.4,19.95,39.38,19.75,39.6]),pts([20.6,38.84,20.72,38.8,20.7,38.58,20.56,38.6]),
  pts([20.4,38.47,20.6,38.47,20.8,38.2,20.75,38.07,20.5,38.1,20.35,38.25]),pts([20.63,37.9,20.75,37.92,20.98,37.72,20.85,37.65,20.7,37.72])];
const LAKES=[pts([35.46,31.77,35.6,31.76,35.6,31.4,35.52,31.08,35.38,31.12,35.42,31.5]),pts([35.54,32.9,35.64,32.88,35.62,32.72,35.54,32.74])];
/* ranges of hills and mountains: a line of small peaks, each lit on its north-western face */
const RANGES=[[29.2,37.25,30.4,37.15,31.4,37.05,32.4,36.95,33.4,36.98,34.3,37.25,35.0,37.35],[35.75,37.3,36.3,37.05,36.38,36.6,36.3,36.3],
  [35.95,34.55,35.86,34.1,35.7,33.62],[36.42,34.28,36.2,33.86,35.9,33.38],[35.22,32.6,35.24,32.2,35.2,31.92,35.1,31.5],
  [32.7,34.98,33.05,34.92],[23.9,35.28,24.5,35.25,25.0,35.17,25.6,35.08],[36.95,36.55,37.4,36.3]];
/* in the northern view the Taurus opens where the road from Perga climbs through it, and stands back from the names beside that road:
   behind Pamphylia, a strip of coast up to 50 km wide, it runs further inland, clear of the region's name;
   the mountains north-east of Antioch in Pisidia run along the road to Iconium */
/* in the Aegean view as well: the mountains along the Black Sea and north of Galatia, Rhodope behind the coast of Thrace, Olympus
   and the Pindus, the heights of central Greece and of the Peloponnese. They stand back from every name on that map. */
const RANGES_W=[[32.7,41.3,33.6,41.52,34.7,41.45,36.0,41.02,37.6,40.76],[32.3,40.25,33.2,40.48,34.2,40.4],[36.2,39.9,37.2,39.6,38.0,39.2],[24.4,41.62,25.0,41.52,25.7,41.46],
  [21.25,40.6,21.4,40.0,21.6,39.4,21.9,38.95],[22.3,40.12,22.5,39.84],[22.2,38.66,22.75,38.5],[22.1,37.9,22.3,37.42,22.36,36.98]];
const RANGES_X=[...RANGES_W.filter(r=>r[0]!==21.25),[21.45,39.75,21.6,39.4,21.9,38.95]];
const RANGES_N=[[28.6,37.42,29.3,37.34,29.95,37.3],[31.62,37.22,32.28,37.2],[33.25,36.97,34.3,37.25,35.0,37.35],...RANGES.slice(1),[31.45,38.58,31.9,38.36,32.3,38.2],[28.3,38.3,28.9,38.42],[33.9,37.9,34.5,38.2]];
function poly(g,p){g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()}
function line(g,p){g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1])}
function paint(g){const r=rng(1913),lands=[LAND,...ISLES];
  /* the sea: deep in the open water, lighter toward the east and the coasts */
  g.fillStyle=lg(g,0,0,W,H,['#1c4772','#255a88','#2f6d98']);g.fillRect(0,0,W,H);tex(g,'mott',.42,0,0,W,H,'overlay',1);
  for(let i=0;i<260;i++){const x=r()*W,y=r()*H;R(g,x,y,1.5+r()*3,.5,rgba(r()<.5?'#6aa6c8':'#163a60',.35))}
  /* from here on in the map's own coordinates, with the window moved to its view */
  g.save();g.scale(ZM,ZM);g.translate(-OX,-OY);const Wz=W/ZM,Hz=H/ZM;
  g.lineJoin='round';g.lineCap='round';
  for(const[w,a]of[[11,.07],[7,.1],[4.5,.14],[2.4,.22],[1.2,.35]])for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=w/ZM;g.strokeStyle=rgba('#8cd2d2',a);g.stroke()}
  /* the land: ochre and dust, greener along the coasts and in the Nile delta, sand toward the deserts */
  clipTo(g,()=>{g.beginPath();for(const p of lands){g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath()}},()=>{
    g.fillStyle=lg(g,0,OY,0,OY+Hz,['#a88a52','#b8995c','#c4a466']);g.fillRect(OX,OY,Wz,Hz);
    for(const[x,y,rx,ry]of[[300,92,70,42],[205,152,60,22],[60,150,90,30],[318,40,40,30]])pool(g,x,y,rx,ry,'#e2cc98',.75,'source-over');
    for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=9/ZM;g.strokeStyle=rgba('#6f8a44',.32);g.stroke();g.lineWidth=4/ZM;g.strokeStyle=rgba('#62803c',.3);g.stroke()}
    pool(g,...xy(31.0,31.15),26,9,'#5f8a40',.55,'source-over');
    tex(g,'mott',.55,OX,OY,Wz,Hz,'overlay',1/ZM);tex(g,'grain',.16,OX,OY,Wz,Hz,'overlay',.5/ZM);
    for(let i=0;i<500;i++){const x=OX+r()*Wz,y=OY+r()*Hz;oval(g,x,y,(.6+r()*1.4)/ZM,(.4+r()*.6)/ZM,rgba(r()<.5?'#d8c08a':'#7a6a3c',.28))}
    /* relief: small peaks along each range, light on the north-west face and shadow on the south-east */
    for(const rg of OX<0?RANGES_N.concat(OX<-50?RANGES_X:RANGES_W):OY<0?RANGES_N:RANGES){const q=pts(rg);for(let i=0;i<q.length-2;i+=2){const x0=q[i],y0=q[i+1],x1=q[i+2],y1=q[i+3],n=Math.max(2,Math.round(Math.hypot(x1-x0,y1-y0)*ZM/3.2));
      for(let k=0;k<n;k++){const t=k/n,x=x0+(x1-x0)*t+(r()-.5)*2.4/ZM,y=y0+(y1-y0)*t+(r()-.5)*2/ZM,w=(1.8+r()*1.2)/ZM,h=(2.2+r()*1.6)/ZM;
        g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-h);g.lineTo(x+w,y);g.closePath();g.fillStyle='#7a5c38';g.fill();
        g.beginPath();g.moveTo(x-w,y);g.lineTo(x,y-h);g.lineTo(x+w*.15,y);g.closePath();g.fillStyle='#d6be88';g.fill();
        if(rg[1]>36.9&&r()<.5){g.beginPath();g.moveTo(x-w*.32,y-h*.66);g.lineTo(x,y-h);g.lineTo(x+w*.3,y-h*.7);g.closePath();g.fillStyle='#f4f0e6';g.fill()}}}}
    for(const p of LAKES){poly(g,p);g.fillStyle='#2f6d98';g.fill();g.lineWidth=.6/ZM;g.strokeStyle=rgba('#8cd2d2',.6);g.stroke()}});
  /* the edge of the land, darker on the shadow side */
  for(const p of[COAST,...ISLES]){(p===COAST?line:poly)(g,p);g.lineWidth=.7/ZM;g.strokeStyle='#5a4428';g.stroke()}
  g.restore();
  ao(g,0,0,W,18,'t',.35,'#0a1428');ao(g,0,H-16,W,16,'b',.3,'#0a1428');ao(g,0,0,22,H,'l',.4,'#0a1428');ao(g,W-14,0,14,H,'r',.25,'#0a1428')}
const baked={},art=()=>{const k=OX+','+OY+','+ZM;return baked[k]||(baked[k]=bake(W,paint,10))};
/* setView: the window a chapter looks through; a name that is not a view gives the usual one */
function setView(v){[OX,OY,ZM=1]=VIEWS[v]||[0,0];VN=VIEWS[v]?v:''}
/* a leg as a path of points, through its waypoints, then sampled every couple of pixels for the dotted line */
const at=id=>xy(...PLACES[id].at);
function path(a,b){const v=VIA[a+'-'+b]||VIA[b+'-'+a],raw=[at(a)];if(v){const q=pts(v);if(VIA[a+'-'+b])for(let i=0;i<q.length;i+=2)raw.push([q[i],q[i+1]]);
    else for(let i=q.length-2;i>=0;i-=2)raw.push([q[i],q[i+1]])}raw.push(at(b));
  const out=[];for(let i=0;i<raw.length-1;i++){const[x0,y0]=raw[i],[x1,y1]=raw[i+1],p0=raw[i-1]||raw[i],p3=raw[i+2]||raw[i+1];
    for(let k=0;k<12;k++){const t=k/12,t2=t*t,t3=t2*t,c=(u0,u1,u2,u3)=>.5*(2*u1+(-u0+u2)*t+(2*u0-5*u1+4*u2-u3)*t2+(-u0+3*u1-3*u2+u3)*t3);out.push([c(p0[0],x0,x1,p3[0]),c(p0[1],y0,y1,p3[1])])}}
  out.push(at(b));const dots=[];let s=0;
  for(let i=1;i<out.length;i++){const[x0,y0]=out[i-1],[x1,y1]=out[i],d=Math.hypot(x1-x0,y1-y0);for(;s<=d;s+=2.6/ZM)dots.push([x0+(x1-x0)*(d?s/d:0),y0+(y1-y0)*(d?s/d:0)]);s-=d}
  return dots}
const ST={legs:[],seen:new Set(),pulse:null,places:null,hover:null,boxes:[],over:null};
/* a place as this chapter's map shows it: its usual entry, with the chapter's own side for its name */
const placeOf=k=>ST.over&&ST.over[k]?Object.assign({},PLACES[k],ST.over[k]):PLACES[k];
/* box: note where a name was drawn, so that the playtest can check that no name crosses a coast or a route, in any language */
const box=(g,s,x,y,sz)=>ST.boxes.push([x,y-sz*.45,x+g.measureText(s).width,y+sz*.45,s]);
/* edge: the dark edge round words painted on the picture, a stroke with round joins behind the letters (five shifted copies of the
   words left steps on their curves) */
const edge=(g,s,x,y)=>{g.save();g.strokeStyle='rgba(8,6,10,.85)';g.lineWidth=1/ZM;g.lineJoin='round';g.strokeText(s,x,y);g.restore()};
function label(g,s,x,y,side,col,sz){sz=(sz||4.6)/ZM;g.font=`bold ${sz}px "Lucida Console",Monaco,"Courier New",monospace`;g.textBaseline='middle';
  const w=g.measureText(s).width,o=3.2/ZM,tx=side==='r'?x+o:side==='l'?x-o-w:x-w/2,ty=side==='t'?y-5/ZM:side==='b'?y+5/ZM:y;box(g,s,tx,ty,sz);
  edge(g,s,tx,ty);g.fillStyle=col;g.fillText(s,tx,ty)}
function dot(g,x,y,lit){oval(g,x,y,1.9/ZM,1.9/ZM,'#1a0e08');oval(g,x,y,1.15/ZM,1.15/ZM,lit?'#f4dc8a':'#c8b48a')}
/* draw: the baked map, then everything that moves: the routes, the city dots and their names */
function draw(g,t){g.drawImage(art(),0,0,W,H);ST.boxes=[];if(ST.night){g.fillStyle='rgba(6,10,38,.6)';g.fillRect(0,0,W,H)}const sea=T('great_sea').split('').join(' ');
  g.save();g.scale(ZM,ZM);g.translate(-OX,-OY);const Z=ZM;
  g.font=`italic bold ${5/Z}px "Lucida Console",Monaco,monospace`;g.textBaseline='middle';g.fillStyle='rgba(190,224,236,.55)';{const[sx,sy]=SEA[OX+','+OY]||SEA['0,0'];g.fillText(sea,sx,sy);box(g,sea,sx,sy,5/Z)}
  for(const{name,at:[lon,lat],sea,close,north,west,in:vs,out:vo}of REGIONS){if(north&&OY>=0||west&&OX>=0||vs&&!vs.includes(VN)||vo&&vo.includes(VN))continue;const[x,y]=xy(lon,lat),s=T(name),hw=s.length*(close?1.66:2.3)/Z;if(!inView(x-hw,y,-2)||!inView(x+hw,y,-2))continue;
    g.font=`bold ${4.2/Z}px "Lucida Console",Monaco,monospace`;g.fillStyle=sea?'rgba(190,224,236,.55)':'rgba(70,46,20,.6)';
    if(close){/* letter by letter, a third of a letter apart */for(let i=0;i<s.length;i++)g.fillText(s[i],x-hw+i*3.32/Z,y);ST.boxes.push([x-hw,y-1.9/Z,x+hw,y+1.9/Z,s])}
    else{const sp=s.split('').join(' ');g.fillText(sp,x-hw,y);box(g,sp,x-hw,y,4.2/Z)}}
  for(const L of ST.legs){const n=Math.floor(L.dots.length*L.k);for(let i=0;i<n;i++){const[x,y]=L.dots[i];Rz(g,x-.6/Z,y-.6/Z,1.2/Z,1.2/Z,'#5a140c');Rz(g,x-.35/Z,y-.35/Z,.7/Z,.7/Z,L.k<1&&i>n-4?'#ffe0a0':'#d84a32')}}
  const show=new Set(ST.places||Object.keys(PLACES).filter(k=>PLACES[k].minor||ST.seen.has(k)));
  for(const k of show){const p=placeOf(k),[x,y]=at(k),main=!p.minor||ST.places||ST.seen.has(k);if(p.hide||!inView(x,y,-3))continue;if(!p.cape)dot(g,x,y,ST.seen.has(k)||ST.hover===k);
    label(g,T(p.name),x+(p.dx||0)/Z,y+(p.dy||0)/Z,p.lab,main?(ST.hover===k?'#ffffff':'#f4e4b8'):'rgba(232,220,190,.62)',main?p.sz||4.8:4)}
  if(ST.pulse){const[x,y]=at(ST.pulse),k=(t/900)%1;g.strokeStyle=`rgba(255,226,150,${.9*(1-k)})`;g.lineWidth=.6/Z;g.beginPath();g.arc(x,y,(2.4+k*6)/Z,0,6.2832);g.stroke()}
  g.restore();
  if(ST.places){g.font='bold 4.4px "Lucida Console",Monaco,monospace';g.textBaseline='middle';g.fillStyle='rgba(244,228,184,.9)';/* the hint stands in open sea, clear of the coast of Egypt */
    const s=T(ST.hint||'click_a_place_to_travel_there'),hy=HINT[VN]||H-14;g.fillText(s,8,hy);ST.boxes.push([8/ZM+OX,(hy-1.98)/ZM+OY,(8+g.measureText(s).width)/ZM+OX,(hy+1.98)/ZM+OY,s])}}
/* the map's music, in the key of the chapter: each part is semitones above the tonic, and oct says which octave of the tonic, counting
   from the one nearest D4; the engine's tune() places and snaps it. The sting: two low drum strokes, a drone on the tonic, a harp rising
   through the third and fifth to the octave, and a ney phrase. The chime as a leg arrives: the fifth rising to the tonic. */
const STING={drone:{oct:-1,n:[0]},harp:{oct:0,n:[0,4,7,12]},ney:{oct:1,n:[0,2,4,7,4]}},CHIME={oct:2,n:[-5,0]};
const hz=p=>tune(p.n,p.oct).map(mtof);
function sting(){const t=now()+.06;if(!AU.ctx)return;DRUMS.d(t,1.3);DRUMS.d(t+.36,.9);INST.drone(hz(STING.drone)[0],t,2.6,.8);
  hz(STING.harp).forEach((f,i)=>INST.harp(f,t+i*.13,.5,1.3));hz(STING.ney).forEach((f,i)=>INST.ney(f,t+.62+i*.2,i===4?.9:.34,.9))}
const arrive=()=>{const[a,b]=hz(CHIME);tone({f:a,d:.18,type:'sine',v:.05,echo:1});tone({f:b,t:now()+.08,d:.22,type:'sine',v:.035,echo:1})};
function show(){G.scene=draw;setScore(null);AU.amb={wind:.25,waves:.25}}
/* journey: between scenes. Fades to the map, shows the legs already travelled, then draws the new ones, city by city. */
async function journey(route,o){o=o||{};setView(o.view);ST.places=null;ST.hover=null;ST.legs=[];ST.seen=new Set(o.seen||[]);ST.pulse=o.pulse||null;ST.over=o.labels||VLAB[VN]||null;ST.night=!!o.night;
  for(const[a,b,kind]of route){const k=/new/.test(kind||'')?0:1;ST.legs.push({a,b,k,dots:path(a,b)});if(k){ST.seen.add(a);ST.seen.add(b)}}
  const first=ST.legs.find(L=>!L.k);if(first)ST.seen.add(first.a);
  if(o.instant){show();for(const L of ST.legs){L.k=1;ST.seen.add(L.a);ST.seen.add(L.b)}ST.pulse=o.pulse||(route.length?route[route.length-1][1]:null);return}
  await fade(1,450);show();codeBtn();await fade(0,550);sting();await wait(700);
  for(const L of ST.legs)if(!L.k){ST.pulse=L.a;await tween(o.speed||1900,k=>{L.k=k});ST.seen.add(L.b);arrive();ST.pulse=L.b;await wait(350)}
  if(o.text)for(const s of[].concat(o.text))await narr(s,{dur:Math.max(3200,1600+s.length*60)})}
/* pick: a hub chapter's places as dots; hovering lights a name, a click resolves with that place, Esc or right-click with null */
function pick(ids,here,o){o=o||{};setView(o.view);ST.places=ids;ST.over=o.labels||VLAB[VN]||null;ST.night=false;ST.hint=o.hint||null;ST.legs=(o.legs||[]).map(([a,b])=>({a,b,k:1,dots:path(a,b)}));
  ST.seen=new Set([here,...(o.seen||[])]);for(const L of ST.legs)for(const k of[L.a,L.b])if(ids.includes(k))ST.seen.add(k);ST.pulse=here;ST.hover=null;show();
  const vp=$('#view'),pos=e=>framePos(e),
    /* a finger is less precise than a mouse: on a phone a place is found within twice the reach */
    near=e=>{const[x,y]=pos(e);let best=null,bd=PH.on?14:7;for(const k of ids){const[px,py]=where(k),d=Math.hypot(px-x,py-y);if(d<bd){bd=d;best=k}}return best};
  return new Promise(res=>{const end=v=>{vp.removeEventListener('click',ck,true);vp.removeEventListener('mousemove',mv,true);vp.removeEventListener('contextmenu',no,true);removeEventListener('keydown',kd,true);ST.places=null;res(v)},
    ck=e=>{e.stopImmediatePropagation();const k=near(e);if(k)end(k)},mv=e=>{ST.hover=near(e)},no=e=>{e.preventDefault();e.stopImmediatePropagation();end(null)},
    kd=e=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();end(null)}};
    vp.addEventListener('click',ck,true);vp.addEventListener('mousemove',mv,true);vp.addEventListener('contextmenu',no,true);addEventListener('keydown',kd,true)})}
/* WAYS: the roads of the journeys that a chapter may retell, in the order they were travelled, through the points between their cities.
   The first journey from Salamis through Cyprus to Paphos, by sea to Perga, up to Antioch in Pisidia, to Iconium, Lystra and Derbe
   (Acts 13:4-14:6); and from Philippi along the Egnatian Way to Thessalonica, to Beroea, by sea to Athens, to Corinth, and from Cenchreae
   to Ephesus (Acts 17:1-18:19). trail(ids): for places picked one after another, the legs to draw: between two that follow each other on
   one way, the road from the one to the other, through the points between; between any others, nothing. On the journeys view none of
   these legs crosses another, and no name crosses any of them (the playtest's map18). */
const WAYS=[['salamis','paphos','perga','antiochp','iconium','lystra','derbe'],
  ['philippi','amphipolis','apollonia','thessalonica','beroea','seaward','athens','corinth','cenchreae','offsamos','ephesus']];
function trail(ids){const out=[];for(let i=1;i<ids.length;i++){const a=ids[i-1],b=ids[i];for(const w of WAYS){const x=w.indexOf(a),y=w.indexOf(b);if(x<0||y<=x)continue;
    for(let k=x;k<y;k++)out.push([w[k],w[k+1]]);break}}return out}
/* go: draw one leg from a to b on the map that is showing, and arrive */
async function go(a,b){const L={a,b,k:0,dots:path(a,b)};ST.legs.push(L);ST.seen.add(a);ST.pulse=a;show();await tween(1500,k=>{L.k=k});ST.seen.add(b);arrive();ST.pulse=b;await wait(500)}
/* where: a place in the window that is showing */
const where=id=>{const[x,y]=at(id);return[(x-OX)*ZM,(y-OY)*ZM]};
/* lines: every thin line on the map that a name must not cross: the coasts, the islands and the lakes, as lists of points */
const lines=()=>[COAST,...ISLES.map(p=>p.concat(p.slice(0,2))),...LAKES.map(p=>p.concat(p.slice(0,2)))];
/* window: where the window that is showing lies on the map, [left, top, width, height], so that a test can see whether a name runs out of it */
return{journey,pick,go,where,lines,trail,ways:WAYS,labels:VLAB,places:PLACES,state:ST,draw,sting,arrive,window:()=>[OX,OY,W/ZM,H/ZM]};
})();
