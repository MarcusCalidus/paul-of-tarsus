/* Paul of Tarsus: the look back at the end of the game, shared by the finale. Loaded on demand (see need() in index.html), and kept for
   offline play by shared/pwa.js.

   It holds the table of every journey of the game, from the Prologue to Chapter Twenty-Five, journey by journey on the travel map
   (shared/map.js), on as many maps as it takes for no two roads to cross on one of them, in the order of the account; and the means to
   show one of those maps. The sequence that plays them (the narrated lines, one bar of each chapter's tune, the roads drawing themselves)
   belongs to the finale, not to this file: here there is no timing, no music and no text.

   Each map is one entry of JOURNEYS:
     id, view, labels, seen, regions   as SHARED.map.journey takes them; the labels are laid over the window's own (VLAB in shared/map.js)
     old      roads an earlier chapter drew and this map shows from the start, because a chapter on it goes back along them (Chapter Six
              comes back from Derbe by Iconium and Antioch in Pisidia to Perga, on the roads that Chapter Five drew); none is any part's
     line     the key of the map's narrated line. Maps 1 to 5 are Chapter Twelve's look back, and take its lines (chapter12.js in each language);
              the keys of the others are placeholders for the finale's own lines, which have no text yet.
     parts    one per chapter, in order: ch, 'pro' or a chapter's number; legs, the legs that chapter itself drew on its travel map, with the
              same places and the same kind ('sea'), in the order travelled (a road drawn out and back the same way is one leg); seen,
              places it lights without a road; and at, where its light stands: the place where the chapter ended, or for a chapter that
              stays in one place, that place, whose dot is lit while its bar is heard.
   Every chapter has one part in the whole table, but for Chapter Twelve, which has two on maps that follow each other, the second marked
   more:1 (the finale plays its bar and shows its name again): it drew the way across to Ephesus in the window of the Aegean and the
   way home in the usual one, and its own look back, whose lines these maps take, split them so. On one map the course home would leave
   the course to Ephesus off Samos at a right angle. Where the account has a journey that no chapter drew (Jerusalem to Damascus in the
   Prologue; Athens to Corinth in Chapter Twelve), no road is drawn here either.

     show(i, upTo)  shows map i with the legs of its parts 0..upTo drawn whole (all of them if upTo is left out; none if it is -1), the
                    dots of their places, of every part's seen and of its at lit, and the light at the last shown part's at (with none shown, at the
                    first part's first place). It resolves when the map is showing (G.scene is the map's; the engine's show() has set the
                    score to silence and the wind and waves of the map).
     ready(i)       whether every place map i needs is on the map (the voyage on from Malta waits for its places in shared/map.js)
     legsOf(ch)     the legs of one chapter, of both its parts where it has two, in order; partOf(ch): {map, part}, the index of the map
                    and of the part where the chapter begins
     dots(a, b)     the dotted line of a leg as this table draws it in the window that is showing, where it is not the map's own way
                    (see OWN), or null: the finale's sequence gives these to the map when it draws such a leg itself. */
SHARED.lookback=(()=>{
"use strict";
/* the ways of Chapter Fifteen (levels/chapter15.js, WAY15): the map has no waypoints of its own for the sea between Ephesus and Troas or
   for the land road from Corinth to Beroea, and draws them straight. That chapter gives them itself, as longitude and latitude, and draws
   them as the map draws its own legs; this is a copy of them, to go when they move into the map's VIA table. */
const OWN={'ephesus-troas':[26.9,37.93,26.3,37.96,25.75,38.1,25.62,38.6,25.66,39.1,25.86,39.5],
  'corinth-beroea':[23.14,37.99,23.36,38.12,23.3,38.36,23.13,38.56,23.06,38.69,23.0,38.745,22.9,38.765,22.8,38.785,22.62,38.86,22.5,38.93,22.42,39.1,22.4,39.5,22.33,40.1]};
/* the names on the map of the second journey, as Chapter Twelve's look back set them (BACKLAB): clear of its roads and of each other; the
   two towns only passed through, and the pass north of Antioch, keep their place on the road without a dot or a name */
const LAB4={derbe:{lab:'r',dy:3.3},philippi:{lab:'l',dy:-2},amphipolis:{hide:1},apollonia:{hide:1},syriangates:{hide:1},thessalonica:{lab:'t',dx:-7},athens:{lab:'b',dx:14,dy:7.2},corinth:{lab:'l'},ephesus:{lab:'r'}};
const JOURNEYS=[
  /* Jerusalem, Damascus, Jerusalem, Tarsus, Antioch (Acts 7:58-11:30), as Chapter Twelve's look back drew it */
  {id:'syria',view:'',line:'from_damascus_to_jerusalem',parts:[
    {ch:'pro',legs:[],at:'damascus'},
    {ch:1,legs:[['damascus','jerusalem']],at:'jerusalem'},
    {ch:2,legs:[['jerusalem','caesarea'],['caesarea','tarsus','sea']],at:'tarsus'},
    {ch:3,legs:[['tarsus','antioch']],at:'antioch'}]},
  /* the first journey, out: Cyprus, Perga, Antioch in Pisidia, Iconium (Acts 13) */
  {id:'cyprus',view:'north',labels:{salamis:{lab:'r',dy:4.2},paphos:{lab:'l',dy:2.6}},line:'sent_out_from_antioch_across',parts:[
    {ch:4,legs:[['antioch','seleucia'],['seleucia','salamis','sea'],['salamis','paphos']],at:'paphos'},
    {ch:5,legs:[['paphos','perga','sea'],['perga','antiochp'],['antiochp','iconium']],at:'iconium'}]},
  /* the first journey, on and home: Lystra and Derbe, back the same way to Perga, Attalia, Antioch (Acts 14) */
  {id:'derbe',view:'north',labels:{derbe:{lab:'r',dy:3.3}},old:[['perga','antiochp'],['antiochp','iconium']],line:'to_lystra_and_derbe_and_back',parts:[
    {ch:6,legs:[['iconium','lystra'],['lystra','derbe'],['perga','attalia'],['attalia','seleucia','sea'],['seleucia','antioch']],at:'antioch'}]},
  /* the second journey: through Cilicia and Galatia to Troas, Macedonia, Athens and Corinth, and across to Ephesus (Acts 15:36-18:19) */
  {id:'macedonia',view:'aegean',labels:LAB4,line:'through_galatia_to_troas',parts:[
    {ch:7,legs:[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium']],at:'iconium'},
    {ch:8,legs:[['iconium','antiochp'],['antiochp','westroad'],['westroad','bithynianroad'],['bithynianroad','troas'],['troas','samothrace','sea'],['samothrace','neapolis','sea'],['neapolis','philippi']],at:'philippi'},
    {ch:9,legs:[],at:'philippi'},
    {ch:10,legs:[['philippi','amphipolis'],['amphipolis','apollonia'],['apollonia','thessalonica'],['thessalonica','beroea'],['beroea','seaward'],['seaward','athens','sea']],at:'athens'},
    {ch:11,legs:[],at:'athens'},
    {ch:12,seen:['corinth'],legs:[['cenchreae','offsamos','sea'],['offsamos','ephesus']],at:'ephesus'}]},
  /* and home by Caesarea and Jerusalem to Antioch (Acts 18:21, 22), in the usual window, as Chapter Twelve drew it (LAB2: no names of its own) */
  {id:'home',view:'',line:'home_caesarea_up_and_down_to_antioch',parts:[
    {ch:12,more:1,legs:[['offsamos','caesarea','sea'],['caesarea','jerusalem'],['jerusalem','antioch']],at:'antioch'}]},
  /* the third journey: through Galatia and Phrygia to Ephesus; Macedonia and Greece, and back the same way to Troas (Acts 18:23-20:12),
     with the names where Chapters Thirteen and Fifteen set them (LAB13, LAB15), except Philippi and Troas, which stand clear of the names
     of Macedonia and Mysia here */
  {id:'ephesus',view:'aegean',labels:{syriangates:{hide:1},tarsus:{hide:1},ciliciangates:{hide:1},derbe:{hide:1},lystra:{hide:1},iconium:{hide:1},antiochp:{hide:1},
      antioch:{lab:'r'},ephesus:{lab:'r',dy:6},troas:{lab:'r',dy:-3},philippi:{lab:'t',dx:14},thessalonica:{lab:'t',dx:-14}},line:'look_back_ephesus',parts:[
    {ch:13,legs:[['antioch','syriangates'],['syriangates','tarsus'],['tarsus','ciliciangates'],['ciliciangates','derbe'],['derbe','lystra'],['lystra','iconium'],['iconium','antiochp'],['antiochp','ephesus']],at:'ephesus'},
    {ch:14,legs:[],at:'ephesus'},
    {ch:15,legs:[['ephesus','troas'],['troas','samothrace'],['samothrace','neapolis'],['neapolis','philippi'],['philippi','thessalonica'],['thessalonica','beroea'],['beroea','corinth']],at:'troas'}]},
  /* down the coast to Miletus, where the elders of Ephesus come (Acts 20:13-38) */
  {id:'miletus',view:'ionia',labels:{troas:{lab:'l',dy:-4}},line:'look_back_miletus',parts:[
    {ch:16,legs:[['troas','lectum','sea'],['lectum','assos','sea'],['troas','assos'],['assos','mitylene','sea'],['mitylene','chios','sea'],['chios','samos','sea'],['samos','miletus'],['miletus','ephesus']],at:'miletus'}]},
  /* by Cos, Rhodes, Patara and Tyre to Caesarea, and up to Jerusalem (Acts 21:1-22:29), as Chapter Seventeen set the names (LAB17) */
  {id:'jerusalem',view:'levant',labels:{cos:{lab:'l',dx:-1.5,dy:-3},rhodes:{lab:'r',dx:-2,dy:7},patara:{lab:'r',dy:-4}},line:'look_back_jerusalem',parts:[
    {ch:17,legs:[['miletus','cos','sea'],['cos','rhodes','sea'],['rhodes','patara','sea'],['patara','tyre','sea'],['tyre','ptolemais','sea'],['ptolemais','caesarea','sea'],['caesarea','tojerusalem']],at:'tojerusalem'},
    {ch:18,legs:[['tojerusalem','jerusalem']],at:'jerusalem'}]},
  /* as a prisoner by night to Antipatris and on to Caesarea, and the years there (Acts 22:30-26:32). A map of its own: on one map with the
     road up, the two roads between Caesarea and Jerusalem lie a pixel or two apart and read as one. */
  {id:'caesarea',view:'levant',line:'look_back_caesarea',parts:[
    {ch:19,legs:[['jerusalem','antipatris'],['antipatris','caesarea']],at:'caesarea'},
    {ch:20,legs:[],at:'caesarea'},
    {ch:21,legs:[],at:'caesarea'}]},
  /* the voyage out, to Fair Havens and into the storm (Acts 27:1-26) */
  {id:'crete',view:'outward',line:'look_back_crete',parts:[
    {ch:22,legs:[['caesarea','sidon','sea'],['sidon','myra','sea'],['myra','cnidus','sea'],['cnidus','salmone','sea'],['salmone','fairhavens','sea'],['fairhavens','cauda','sea']],at:'cauda'}]},
  /* fourteen nights on the Sea of Adria, and Malta (Acts 27:27-28:10) */
  {id:'malta',view:'adria',regions:['sea_of_adria'],old:[['myra','cnidus'],['cnidus','salmone'],['salmone','fairhavens'],['fairhavens','cauda']],line:'look_back_malta',parts:[
    {ch:23,legs:[['cauda','malta','sea']],at:'malta'}]},
  /* from Malta to Rome (Acts 28:11-31) */
  {id:'rome',view:'italy',line:'look_back_rome',parts:[
    {ch:24,legs:[['malta','syracuse','sea'],['syracuse','rhegium','sea'],['rhegium','puteoli','sea'],['puteoli','capua'],['capua','appius'],['appius','threetaverns'],['threetaverns','rome']],at:'rome'},
    {ch:25,legs:[],at:'rome'}]}];
const M=()=>SHARED.map;
/* every place a map names: the places of its legs, old and new, what it lights, and where its parts end */
const placesOf=J=>new Set([...(J.old||[]),...J.parts.flatMap(p=>p.legs)].flatMap(l=>l.slice(0,2)).concat(J.seen||[],J.parts.flatMap(p=>[...(p.seen||[]),p.at])));
const ready=i=>!!M()&&[...placesOf(JOURNEYS[i])].every(k=>M().places[k]);
const partOf=ch=>{for(let m=0;m<JOURNEYS.length;m++){const p=JOURNEYS[m].parts.findIndex(p=>p.ch===ch);if(p>=0)return{map:m,part:p}}return null};
const legsOf=ch=>{const p=JOURNEYS.flatMap(J=>J.parts.filter(p=>p.ch===ch));return p.length?p.flatMap(p=>p.legs):null};
/* dots: a leg of OWN drawn the way the map draws its legs (path in shared/map.js): through its points as a smooth curve, a dot every
   2.6 view pixels. The map's coordinates are found from two places in the window that is showing, so that it holds in any window. */
function dots(a,b){const m=M(),v=OWN[a+'-'+b]||OWN[b+'-'+a];if(!v)return null;
  const PL=m.places,[ox,oy,w]=m.window(),z=320/w,mx=id=>{const[x,y]=m.where(id);return[ox+x/z,oy+y/z]},
    A=PL.corinth.at,B=PL.troas.at,[ax,ay]=mx('corinth'),[bx,by]=mx('troas'),xy=(lon,lat)=>[ax+(lon-A[0])*(bx-ax)/(B[0]-A[0]),ay+(lat-A[1])*(by-ay)/(B[1]-A[1])],
    q=[];if(OWN[a+'-'+b])for(let i=0;i<v.length;i+=2)q.push(xy(v[i],v[i+1]));else for(let i=v.length-2;i>=0;i-=2)q.push(xy(v[i],v[i+1]));
  const raw=[xy(...PL[a].at),...q,xy(...PL[b].at)],out=[];
  for(let i=0;i<raw.length-1;i++){const[x0,y0]=raw[i],[x1,y1]=raw[i+1],p0=raw[i-1]||raw[i],p3=raw[i+2]||raw[i+1];
    for(let k=0;k<12;k++){const t=k/12,t2=t*t,t3=t2*t,c=(u0,u1,u2,u3)=>.5*(2*u1+(-u0+u2)*t+(2*u0-5*u1+4*u2-u3)*t2+(-u0+3*u1-3*u2+u3)*t3);out.push([c(p0[0],x0,x1,p3[0]),c(p0[1],y0,y1,p3[1])])}}
  out.push(raw[raw.length-1]);const d=[];let s=0;
  for(let i=1;i<out.length;i++){const[x0,y0]=out[i-1],[x1,y1]=out[i],l=Math.hypot(x1-x0,y1-y0);for(;s<=l;s+=2.6/z)d.push([x0+(x1-x0)*(l?s/l:0),y0+(y1-y0)*(l?s/l:0)]);s-=l}
  return d}
async function show(i,upTo){const m=await need('map'),J=JOURNEYS[i],n=upTo==null?J.parts.length-1:upTo,shown=J.parts.slice(0,n+1),legs=[...(J.old||[]),...shown.flatMap(p=>p.legs)],
    first=J.parts[0],light=shown.length?shown[shown.length-1].at:first.legs.length?first.legs[0][0]:first.at;
  await m.journey(legs,{instant:1,view:J.view,labels:Object.assign({},m.labels[J.view],J.labels),seen:[...(J.seen||[]),...shown.flatMap(p=>[...(p.seen||[]),p.at]),light],regions:J.regions,pulse:light});
  for(const L of m.state.legs){const d=dots(L.a,L.b);if(d)L.dots=d}}
return{JOURNEYS,show,ready,legsOf,partOf,dots};
})();
