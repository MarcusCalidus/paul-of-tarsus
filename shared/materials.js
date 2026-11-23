/* Paul of Tarsus: materials and light shared by the backdrops of every chapter, to the standard of Chapter Fifteen's room of Gaius
   (plankGaius15, crackGaius15, lightGaius15). First written for Chapter One; moved here so that every chapter paints wood, cracks, contact
   shadows and earth colors the same way. Loaded on demand via CHAP[n].needs and PRO.needs (see need() in index.html). Registered in
   shared/pwa.js for offline play.

     plank(g, x, y, w, h, c, r, vert)     a board with a quiet grain: a soft fall of tone across it, a light overlay, and a few long streaks,
                                          lighter and darker, none of them strong. vert: the grain runs up and down. r: a rng()
     board(g, x, y, w, h, c, r, vert)     a plank with the lit and the shaded edge that a board or a beam shows
     crack(g, x, y, n, r, a)              a hairline crack cut into plaster or stone, in two tones: the dark of the cut and a faint lit lip
                                          beside it, n steps long, a its strength (default 1). Set cracks by hand, high on a wall, where
                                          they run to no head
     skipCracks(r, n)                     draw from r what plaster() would have drawn for n random cracks, so that a wall whose cracks are
                                          now set by hand keeps every other thing of its room where it was
     shadow(g, x, y, rx, ry, a, c)        the soft shadow of a thing that stands on the floor, in three passes of alpha: a wide faint one,
                                          the body, a darker core
     earth(c, k)                          a color drawn a little toward its own grey (k, default .18), so that dyes and painted blues sit
                                          among the mineral and earth colors of the rest
     joistAO(g, a, x0, w, U, c)           the soft shade of the boards beside each joist of a ceiling seen from below, in two steps: a
                                          joist from a at the wall plate (y = U) to x0 at the top of the picture */
SHARED.materials=(()=>{
"use strict";
function plank(g,x,y,w,h,c,r,vert){inRect(g,x,y,w,h,()=>{g.fillStyle=vert?lg(g,x,0,x+w,0,[tint(c,.08),c,tint(c,-.12)]):lg(g,0,y,0,y+h,[tint(c,.08),c,tint(c,-.12)]);g.fillRect(x,y,w,h);
  tex(g,vert?'vert':'wood',.2,x,y,w,h,'overlay',.5);
  for(let i=0;i<(vert?w:h)*.9;i++){const a=r(),L=vert?h:w,l=L*(.2+r()*.5),o=r()*(L-l),k=r()<.5?tint(c,-.16):tint(c,.1);
    if(vert)R(g,x+a*w,y+o,.5,l,k);else R(g,x+o,y+a*h,l,.5,k)}})}
function board(g,x,y,w,h,c,r,vert){plank(g,x,y,w,h,c,r,vert);
  if(vert){R(g,x,y,.5,h,tint(c,.2));R(g,x+w-.5,y,.5,h,tint(c,-.3))}else{R(g,x,y,w,.5,tint(c,.2));R(g,x,y+h-.5,w,.5,tint(c,-.3))}}
function crack(g,x,y,n,r,a){const p=[x,y];for(let s=0;s<n;s++){x+=(r()-.5)*5;y+=1.5+r()*4;p.push(x,y)}a=a||1;
  stroke(g,p,rgba('#000000',.3*a),.5);stroke(g,p.map((v,i)=>i%2?v:v+.5),rgba('#ffffff',.12*a),.5)}
function skipCracks(r,n){for(let k=0;k<n;k++){r();r();for(let s=0;s<5+r()*4;s++){r();r()}}}
function shadow(g,x,y,rx,ry,a,c){c=c||'#181220';oval(g,x,y,rx*1.3,ry*1.35,rgba(c,a*.3));oval(g,x,y,rx,ry,rgba(c,a*.4));oval(g,x,y,rx*.62,Math.max(1,ry*.6),rgba(c,a*.45))}
function earth(c,k){const[r,gg,b]=hex(c),m=r*.3+gg*.59+b*.11;return mix(c,toHex(m,m,m),k==null?.18:k)}
function joistAO(g,a,x0,w,U,c){for(const[d,al]of[[3.4,.14],[1.6,.2]]){poly(g,[a-d,U,a,U,x0,0,x0-d*1.17,0],rgba(c,al));poly(g,[a+w,U,a+w+d,U,x0+w*1.17+d*1.17,0,x0+w*1.17,0],rgba(c,al*.6))}}
return{plank,board,crack,skipCracks,shadow,earth,joistAO}})();
