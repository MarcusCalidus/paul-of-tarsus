/* Paul of Tarsus: rain, wind slant, puddles, and wet-surface helpers, shared by chapters with rain or storms.
   Loaded on demand via CHAP[n].needs (see need() in index.html). Registered in shared/pwa.js for offline play.

     puddles(w, y0, y1, n, seed)       deterministic list of [x, y, rx, ry] hollows for a wet floor
     wetGround(g, x0, y0, w, h, opt)   bakes wet sky sheen, damp wall/curb bases, and layered puddles into a room backdrop
     rain(g, t, w, opt)                draws short wind-slanted rain streaks, puddle ripples, and subtle ground splash flecks
                                       (kept short so no stroke reads as a long line crossing an upright) */
SHARED.weather=(()=>{
"use strict";
function puddles(w,y0,y1,n,seed){const r=rng(seed||1279),out=[];
  for(let i=0;i<n;i++){const x=18+r()*(w-36),y=y0+r()*(y1-y0),rx=6.5+r()*9.5,ry=1.2+r()*1.2;out.push([x,y,rx,ry])}
  return out}
/* wetGround: wet paving sheen, capillary damp darkening along wall/curb feet, and puddles with dark wet stone rims */
function wetGround(g,x0,y0,w,h,o){o=o||{};
  /* capillary damp darkening rising slightly up the wall base and pooling along the curb */
  if(o.damp!==false){const dh=o.dampH||6,dx=o.dampX!=null?o.dampX:x0,dw=o.dampW!=null?o.dampW:w;
    comp(g,'multiply',o.dampA||.38,()=>{
      g.fillStyle=lg(g,0,y0-dh,0,y0+2,['rgba(52,58,72,0)','rgba(52,58,72,.82)','rgba(42,48,62,.95)','rgba(52,58,72,0)']);
      g.fillRect(dx,y0-dh,dw,dh+4)});
    for(const seg of(o.walls||[])){const[wx,wy,ww,wh]=seg;
      comp(g,'multiply',.34,()=>{g.fillStyle=lg(g,0,wy-wh,0,wy+2,['rgba(46,52,66,0)','rgba(46,52,66,.9)']);g.fillRect(wx,wy-wh,ww,wh+2)})}}
  /* subtle overcast sky reflection across the wet paving */
  comp(g,'screen',o.sheen==null?.26:o.sheen,()=>{
    g.fillStyle=lg(g,0,y0,0,y0+h,['rgba(206,216,228,.88)','rgba(206,216,228,.18)']);
    g.fillRect(x0,y0,w,h)});
  /* puddles: damp darkened stone halo, sky-tinted water body, and soft sky glint */
  for(const[x,y,rx,ry]of(o.puddles||[])){
    oval(g,x,y+.2,rx+1.6,ry+.5,'rgba(44,50,64,.36)');
    oval(g,x,y,rx,ry,'rgba(82,96,116,.54)');
    oval(g,x-rx*.12,y-.25,rx*.62,Math.max(.55,ry*.46),'rgba(212,222,234,.44)')}}
/* rain: wind-slanted short rain streaks, animated concentric puddle ripples, and brief mist flecks on wet stone */
function rain(g,t,w,o){o=o||{};const r=rng(o.seed||1277),y1=o.y1||144,n=Math.round(w*(o.density||.42)),
    wind=o.wind==null?-1.35:o.wind,len=o.len||3.8,col=o.col||'rgba(216,226,238,.46)',spBase=o.speed||490;
  g.save();g.strokeStyle=col;g.lineWidth=.55;g.beginPath();
  for(let i=0;i<n;i++){const x0=r()*(w+24)-12,ph=r(),sp=.85+r()*.55,k=((t/spBase*sp+ph)%1),
      y=-len-2+k*(y1+len+4),x=x0+k*wind*10,dx=wind*(len/3.8);
    g.moveTo(x,y);g.lineTo(x+dx,y+len)}
  g.stroke();
  /* expanding concentric ripples on puddles (radii kept wide enough to never rasterize as a +) */
  if(o.puddles){for(let i=0;i<o.puddles.length;i++){const[px,py,rx,ry]=o.puddles[i];
    for(let j=0;j<2;j++){const k=((t/(920+(i%3)*140)+i*.37+j*.5)%1);if(k>.78)continue;
      const u=k/.78,rrx=1.8+u*Math.min(rx*.72,6.2),rry=Math.max(.5,rrx*.22),ox=(j?-.28:.24)*rx,oy=(j?.14:-.12)*ry;
      g.strokeStyle=`rgba(228,236,244,${(.52*(1-u)).toFixed(2)})`;g.lineWidth=.45;
      g.beginPath();g.ellipse(px+ox,py+oy,rrx,rry,0,0,6.2832);g.stroke()}}}
  /* brief horizontal surface splash glints on wet paving */
  if(o.splashY){const[sy0,sy1]=o.splashY,sn=Math.round(w*.06);
    for(let i=0;i<sn;i++){const k=((t/420+i*.29)%1);if(k>.22)continue;
      const u=k/.22,sx=12+((i*97+Math.floor(t/420)*43)%(w-24)),sy=sy0+((i*53)%Math.max(1,sy1-sy0));
      R(g,sx-1.2-u,sy,2.4+u*2,.5,`rgba(226,236,244,${(.45*(1-u)).toFixed(2)})`)}}
  g.restore()}
return{puddles,wetGround,rain}})();
