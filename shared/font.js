/* Paul of Tarsus: a pixel font painted in code (CONTRIBUTING section 4).
   Two bitmap faces on the grid of the view's canvas pixels (two font pixels to one room pixel):
     - "Paul Pixel"       12-pixel em (used at calc(var(--s)*6px) or integer multiples), upright, and slanted for thoughts.
     - "Paul Pixel Small"  9-pixel em (used at calc(var(--s)*4.5px)) for the top bar, tags, notes and footers.
   Each glyph is built in memory as a TrueType font (head, hhea, maxp, OS/2, hmtx, cmap, loca, glyf, name, post) from merged pixel
   rectangles and registered with FontFace. No font file, no network; works from disk. If any browser refuses it, the page keeps
   its monospace fallback (html.pf is added only once all faces are ready).
   Cross-shape guard (CONTRIBUTING section 3): +, *, #, $ and † are left out; t and f have one-sided bars; % is a slash between two
   solid squares, not an x; ⇄ is two harpoons whose barbs turn at the ends of their shafts, so that no line crosses another; umlaut dots are single pixels set apart;
   bullets are solid squares. */
SHARED.font=(()=>{
"use strict";

/* Glyphs are drawn row by row from the top, '#' a pixel. Every glyph stands on the baseline unless the table below says otherwise,
   so that no letter sits higher or lower than its neighbours:
     regular: capitals and ascenders 8 pixels, the x-height 6, descenders 2 below the baseline;
     small:   capitals and ascenders 6 pixels, the x-height 4, descenders 2 below the baseline.
   META gives [bottom, advance] for a glyph that does not stand on the baseline (bottom: the y of its lowest row, negative below the
   baseline) or that wants another advance than its width plus one. Glyphs in DESC hang 2 pixels below the baseline. */
const DESC='gjpqy,;‚„';
const REG={
  ' ':[[],3],' ':[[],3],
  'A':['.###.','#...#','#...#','#####','#...#','#...#','#...#','#...#'],
  'B':['####.','#...#','#...#','####.','#...#','#...#','#...#','####.'],
  'C':['.###.','#...#','#....','#....','#....','#....','#...#','.###.'],
  'D':['####.','#...#','#...#','#...#','#...#','#...#','#...#','####.'],
  'E':['#####','#....','#....','####.','#....','#....','#....','#####'],
  'F':['#####','#....','#....','####.','#....','#....','#....','#....'],
  'G':['.###.','#...#','#....','#....','#..##','#...#','#...#','.###.'],
  'H':['#...#','#...#','#...#','#####','#...#','#...#','#...#','#...#'],
  'I':['###','.#.','.#.','.#.','.#.','.#.','.#.','###'],
  'J':['..###','...#.','...#.','...#.','...#.','#..#.','#..#.','.##..'],
  'K':['#...#','#..#.','#.#..','##...','#.#..','#..#.','#...#','#...#'],
  'L':['#....','#....','#....','#....','#....','#....','#....','#####'],
  'M':['#...#','##.##','#.#.#','#.#.#','#...#','#...#','#...#','#...#'],
  'N':['#...#','##..#','#.#.#','#..##','#...#','#...#','#...#','#...#'],
  'O':['.###.','#...#','#...#','#...#','#...#','#...#','#...#','.###.'],
  'P':['####.','#...#','#...#','####.','#....','#....','#....','#....'],
  'Q':['.###.','#...#','#...#','#...#','#...#','#.#.#','#..#.','.##.#'],
  'R':['####.','#...#','#...#','####.','#.#..','#..#.','#...#','#...#'],
  'S':['.###.','#...#','#....','.###.','....#','....#','#...#','.###.'],
  'T':['#####','..#..','..#..','..#..','..#..','..#..','..#..','..#..'],
  'U':['#...#','#...#','#...#','#...#','#...#','#...#','#...#','.###.'],
  'V':['#...#','#...#','#...#','#...#','#...#','.#.#.','.#.#.','..#..'],
  'W':['#...#','#...#','#...#','#...#','#.#.#','#.#.#','#.#.#','.#.#.'],
  'X':['#...#','#...#','.#.#.','..#..','..#..','.#.#.','#...#','#...#'],
  'Y':['#...#','#...#','.#.#.','..#..','..#..','..#..','..#..','..#..'],
  'Z':['#####','....#','...#.','..#..','.#...','#....','#....','#####'],

  'a':['.###.','....#','.####','#...#','#...#','.####'],
  'b':['#....','#....','####.','#...#','#...#','#...#','#...#','####.'],
  'c':['.###.','#...#','#....','#....','#...#','.###.'],
  'd':['....#','....#','.####','#...#','#...#','#...#','#...#','.####'],
  'e':['.###.','#...#','#####','#....','#...#','.###.'],
  'f':['..##','.#..','.###','.#..','.#..','.#..','.#..','.#..'],
  'g':['.####','#...#','#...#','#...#','#...#','.####','....#','.###.'],
  'h':['#....','#....','####.','#...#','#...#','#...#','#...#','#...#'],
  'i':['#','.','#','#','#','#','#','#'],
  'j':['..#','...','..#','..#','..#','..#','..#','..#','#.#','.#.'],
  'k':['#...','#...','#..#','#.#.','##..','#.#.','#..#','#..#'],
  'l':['##','.#','.#','.#','.#','.#','.#','.#'],
  'm':['##.#.','#.#.#','#.#.#','#.#.#','#.#.#','#.#.#'],
  'n':['####.','#...#','#...#','#...#','#...#','#...#'],
  'o':['.###.','#...#','#...#','#...#','#...#','.###.'],
  'p':['####.','#...#','#...#','#...#','#...#','####.','#....','#....'],
  'q':['.####','#...#','#...#','#...#','#...#','.####','....#','....#'],
  'r':['#.##.','##..#','#....','#....','#....','#....'],
  's':['.####','#....','.###.','....#','....#','####.'],
  't':['.#..','.###','.#..','.#..','.#..','.#..','..##'],
  'u':['#...#','#...#','#...#','#...#','#...#','.####'],
  'v':['#...#','#...#','#...#','.#.#.','.#.#.','..#..'],
  'w':['#...#','#...#','#...#','#.#.#','#.#.#','.#.#.'],
  'x':['#...#','.#.#.','..#..','..#..','.#.#.','#...#'],
  'y':['#...#','#...#','#...#','#...#','#...#','.####','....#','.###.'],
  'z':['#####','...#.','..#..','.#...','#....','#####'],

  '0':['.###.','#..##','#.#.#','#.#.#','##..#','#...#','#...#','.###.'],
  '1':['.#.','##.','.#.','.#.','.#.','.#.','.#.','###'],
  '2':['.###.','#...#','....#','..##.','.#...','#....','#....','#####'],
  '3':['####.','....#','....#','.###.','....#','....#','....#','####.'],
  '4':['#...#','#...#','#...#','#####','....#','....#','....#','....#'],
  '5':['#####','#....','#....','####.','....#','....#','#...#','.###.'],
  '6':['.###.','#...#','#....','####.','#...#','#...#','#...#','.###.'],
  '7':['#####','....#','...#.','..#..','.#...','.#...','.#...','.#...'],
  '8':['.###.','#...#','#...#','.###.','#...#','#...#','#...#','.###.'],
  '9':['.###.','#...#','#...#','.####','....#','....#','#...#','.###.'],

  '.':['#'],
  ',':['.#','.#','#.'],
  ':':['#','.','.','.','#'],
  ';':['.#','..','..','..','.#','.#','#.'],
  '!':['#','#','#','#','#','#','.','#'],
  '?':['.###.','#...#','....#','...#.','..#..','..#..','.....','..#..'],
  '\'':['#','#','#'],
  '"':['#.#','#.#','#.#'],
  '(':['.#','#.','#.','#.','#.','#.','#.','.#'],
  ')':['#.','.#','.#','.#','.#','.#','.#','#.'],
  '[':['##','#.','#.','#.','#.','#.','#.','##'],
  ']':['##','.#','.#','.#','.#','.#','.#','##'],
  '-':['###'],
  '/':['...#','...#','..#.','..#.','.#..','.#..','#...','#...'],
  '\\':['#...','#...','.#..','.#..','..#.','..#.','...#','...#'],
  '&':['.##..','#..#.','#..#.','.##..','#..#.','#...#','#..#.','.##.#'],
  '%':['##....','##...#','....#.','...#..','..#...','.#....','#...##','....##'],
  '=':['####','....','####'],
  '<':['..#','.#.','#..','.#.','..#'],
  '>':['#..','.#.','..#','.#.','#..'],
  '_':['#####'],
  '{':['.##','.#.','.#.','#..','.#.','.#.','.##'],
  '}':['##.','.#.','.#.','..#','.#.','.#.','##.'],
  '~':['.##.#','#..#.'],

  /* German & accented */
  'Ä':['.#.#.','.....','.###.','#...#','#...#','#####','#...#','#...#','#...#','#...#'],
  'Ö':['.#.#.','.....','.###.','#...#','#...#','#...#','#...#','#...#','#...#','.###.'],
  'Ü':['.#.#.','.....','#...#','#...#','#...#','#...#','#...#','#...#','#...#','.###.'],
  'ä':['.#.#.','.....','.###.','....#','.####','#...#','#...#','.####'],
  'ö':['.#.#.','.....','.###.','#...#','#...#','#...#','#...#','.###.'],
  'ü':['.#.#.','.....','#...#','#...#','#...#','#...#','#...#','.####'],
  'ë':['.#.#.','.....','.###.','#...#','#####','#....','#...#','.###.'],
  'é':['...#.','..#..','.###.','#...#','#####','#....','#...#','.###.'],
  'ß':['.##..','#..#.','#..#.','#.#..','#..#.','#...#','#...#','#.##.'],

  /* Punctuation & symbols. German quotes open low („) and close high (“); English ones open with “ and close with ”. */
  '„':['.#.#','.#.#','#.#.'],
  '“':['.#.#','#.#.','#.#.'],
  '”':['.#.#','.#.#','#.#.'],
  '‚':['.#','.#','#.'],
  '‘':['.#','#.','#.'],
  '’':['.#','.#','#.'],
  '–':['####'],
  '—':['######'],
  '−':['###'],
  '·':['##','##'],
  '•':['###','###','###'],
  '…':['#.#.#'],
  '›':['#..','.#.','..#','.#.','#..'],
  '‹':['..#','.#.','#..','.#.','..#'],
  '«':['..#.#','.#.#.','#.#..','.#.#.','..#.#'],
  '»':['#.#..','.#.#.','..#.#','.#.#.','#.#..'],
  '▸':['#...','##..','###.','####','###.','##..','#...'],
  '♫':['..###','.#..#','.#..#','.#..#','##.##','##.##'],
  '⇄':['...#.','....#','#####','.....','#####','#....','.#...'],
  '≡':['#####','.....','#####','.....','#####']
};
const REG_META={
  ',':[-2],';':[-2],'\'':[5],'"':[5],'-':[3],'=':[2],'<':[1],'>':[1],'_':[-1],'~':[3],
  'i':[0,2],'l':[0,3],
  '„':[-2],'“':[5],'”':[5],'‚':[-2],'‘':[5],'’':[5],'–':[3],'—':[3],'−':[3],
  '·':[2],'•':[2],'›':[1],'‹':[1],'«':[1],'»':[1],'⇄':[0],'≡':[1]
};

const SML={
  ' ':[[],2],' ':[[],2],
  'A':['.##.','#..#','####','#..#','#..#','#..#'],
  'B':['###.','#..#','###.','#..#','#..#','###.'],
  'C':['.##.','#..#','#...','#...','#..#','.##.'],
  'D':['###.','#..#','#..#','#..#','#..#','###.'],
  'E':['####','#...','###.','#...','#...','####'],
  'F':['####','#...','###.','#...','#...','#...'],
  'G':['.##.','#..#','#...','#.##','#..#','.##.'],
  'H':['#..#','#..#','####','#..#','#..#','#..#'],
  'I':['###','.#.','.#.','.#.','.#.','###'],
  'J':['..##','...#','...#','#..#','#..#','.##.'],
  'K':['#..#','#.#.','##..','#.#.','#..#','#..#'],
  'L':['#...','#...','#...','#...','#...','####'],
  'M':['#...#','##.##','#.#.#','#...#','#...#','#...#'],
  'N':['#..#','##.#','#.##','#..#','#..#','#..#'],
  'O':['.##.','#..#','#..#','#..#','#..#','.##.'],
  'P':['###.','#..#','###.','#...','#...','#...'],
  'Q':['.##.','#..#','#..#','#..#','#.#.','.#.#'],
  'R':['###.','#..#','###.','#.#.','#..#','#..#'],
  'S':['.###','#...','.##.','...#','...#','###.'],
  'T':['#####','..#..','..#..','..#..','..#..','..#..'],
  'U':['#..#','#..#','#..#','#..#','#..#','.##.'],
  'V':['#..#','#..#','#..#','#..#','.##.','.##.'],
  'W':['#...#','#...#','#...#','#.#.#','#.#.#','.#.#.'],
  'X':['#..#','#..#','.##.','.##.','#..#','#..#'],
  'Y':['#...#','.#.#.','..#..','..#..','..#..','..#..'],
  'Z':['####','...#','..#.','.#..','#...','####'],

  'a':['.###','#..#','#..#','.###'],
  'b':['#...','#...','###.','#..#','#..#','###.'],
  'c':['.###','#...','#...','.###'],
  'd':['...#','...#','.###','#..#','#..#','.###'],
  'e':['.##.','####','#...','.###'],
  'f':['.##','#..','###','#..','#..','#..'],
  'g':['.###','#..#','#..#','.###','...#','.##.'],
  'h':['#...','#...','###.','#..#','#..#','#..#'],
  'i':['#','.','#','#','#','#'],
  'j':['.#','..','.#','.#','.#','.#','.#','#.'],
  'k':['#..','#..','#.#','##.','#.#','#.#'],
  'l':['#','#','#','#','#','#'],
  'm':['##.#.','#.#.#','#.#.#','#.#.#'],
  'n':['###.','#..#','#..#','#..#'],
  'o':['.##.','#..#','#..#','.##.'],
  'p':['###.','#..#','#..#','###.','#...','#...'],
  'q':['.###','#..#','#..#','.###','...#','...#'],
  'r':['.###','#...','#...','#...'],
  's':['.###','##..','..##','###.'],
  't':['#..','###','#..','#..','.##'],
  'u':['#..#','#..#','#..#','.###'],
  'v':['#..#','#..#','.##.','.##.'],
  'w':['#...#','#.#.#','#.#.#','.#.#.'],
  'x':['#..#','.##.','.##.','#..#'],
  'y':['#..#','#..#','.###','...#','.##.'],
  'z':['####','..#.','.#..','####'],

  '0':['.##.','#.##','##.#','#..#','#..#','.##.'],
  '1':['.#.','##.','.#.','.#.','.#.','###'],
  '2':['.##.','#..#','..#.','.#..','#...','####'],
  '3':['###.','...#','.##.','...#','...#','###.'],
  '4':['#..#','#..#','####','...#','...#','...#'],
  '5':['####','#...','###.','...#','...#','###.'],
  '6':['.##.','#...','###.','#..#','#..#','.##.'],
  '7':['####','...#','..#.','.#..','.#..','.#..'],
  '8':['.##.','#..#','.##.','#..#','#..#','.##.'],
  '9':['.##.','#..#','.###','...#','...#','.##.'],

  '.':['#'],',':['.#','#.'],':':['#','.','.','#'],';':['.#','..','..','.#','#.'],
  '!':['#','#','#','#','.','#'],'?':['.##.','#..#','..#.','.#..','....','.#..'],
  '\'':['#','#'],'"':['#.#','#.#'],'(':['.#','#.','#.','#.','#.','.#'],')':['#.','.#','.#','.#','.#','#.'],
  '[':['##','#.','#.','#.','#.','##'],']':['##','.#','.#','.#','.#','##'],
  '-':['##'],'/':['..#','..#','.#.','.#.','#..','#..'],'\\':['#..','#..','.#.','.#.','..#','..#'],
  '&':['.##.','#..#','.##.','#.#.','#..#','.##.'],'%':['#...','...#','..#.','.#..','#...','...#'],
  '=':['###','...','###'],'<':['.#','#.','.#'],'>':['#.','.#','#.'],'_':['####'],'~':['.#.#','#.#.'],

  'Ä':['#..#','....','.##.','#..#','####','#..#','#..#','#..#'],
  'Ö':['#..#','....','.##.','#..#','#..#','#..#','#..#','.##.'],
  'Ü':['#..#','....','#..#','#..#','#..#','#..#','#..#','.##.'],
  'ä':['#..#','....','.###','#..#','#..#','.###'],
  'ö':['#..#','....','.##.','#..#','#..#','.##.'],
  'ü':['#..#','....','#..#','#..#','#..#','.###'],
  'ë':['#..#','....','.##.','####','#...','.###'],
  'é':['..#.','.#..','.##.','####','#...','.###'],
  'ß':['.##.','#..#','###.','#..#','#..#','#.#.'],

  '„':['.#.#','.#.#','#.#.'],'“':['.#.#','#.#.','#.#.'],'”':['.#.#','.#.#','#.#.'],
  '‚':['.#','.#','#.'],'‘':['.#','#.','#.'],'’':['.#','.#','#.'],
  '–':['###'],'—':['#####'],'−':['##'],'·':['#'],'•':['##','##'],'…':['#.#.#'],
  '›':['#.','.#','#.'],'‹':['.#','#.','.#'],'«':['.#.#','#.#.','.#.#'],'»':['#.#.','.#.#','#.#.'],
  '▸':['#..','##.','###','##.','#..'],'♫':['.###','.#.#','.#.#','##.#','##.#'],
  '⇄':['..#.','...#','####','....','####','#...','.#..'],'≡':['####','....','####','....','####']
};
const SML_META={
  ',':[-1],';':[-1],'\'':[4],'"':[4],'-':[2],'=':[1],'<':[1],'>':[1],'_':[-1],'~':[2],
  'i':[0,2],'l':[0,2],
  '„':[-2],'“':[3],'”':[3],'‚':[-2],'‘':[3],'’':[3],'–':[2],'—':[2],'−':[2],
  '·':[2],'•':[1],'›':[1],'‹':[1],'«':[1],'»':[1],'⇄':[-1],'≡':[0]
};
/* the % of the small face is a slash between two single pixels, and its & a stack of two rings: neither is an x */

/* expand: each glyph's rows, advance and the y of the top of its first row (y counts up from the baseline; row r covers
   [yTop-r-1, yTop-r]). The bottom comes from META, from DESC, or is the baseline. */
function expand(map,meta){
  const out={};
  for(const ch of Object.keys(map)){
    const v=map[ch];
    if(typeof v[0]!=='string'){out[ch]={rows:v[0],adv:v[1],yTop:0};continue}
    const w=Math.max(...v.map(r=>r.length)),m=meta[ch]||[];
    const bottom=m[0]!=null?m[0]:DESC.includes(ch)?-2:0;
    out[ch]={rows:v,adv:m[1]!=null?m[1]:w+1,yTop:bottom+v.length}
  }
  return out
}

/* toRects: the pixels of each glyph merged into rectangles, runs along a row first and then equal runs down the rows */
function toRects(glyphs){
  const out={};
  for(const ch of Object.keys(glyphs)){
    const g=glyphs[ch],rows=g.rows,runs=[];
    for(let r=0;r<rows.length;r++){
      const y=g.yTop-r-1,row=rows[r],rr=[];
      for(let x=0;x<row.length;){
        if(row[x]==='#'){let x1=x+1;while(x1<row.length&&row[x1]==='#')x1++;rr.push([x,x1]);x=x1}else x++
      }
      runs.push({y,rr})
    }
    const rects=[],active=new Map();
    for(const{y,rr}of runs){
      const next=new Map();
      for(const[x0,x1]of rr){
        const k=x0+','+x1,prev=active.get(k);
        if(prev&&prev.y0===y+1){prev.y0=y;next.set(k,prev)}
        else{const rect={x0,y0:y,x1,y1:y+1};rects.push(rect);next.set(k,rect)}
      }
      active.clear();for(const[k,v]of next)active.set(k,v)
    }
    out[ch]={rects:rects.map(r=>[r.x0,r.y0,r.x1,r.y1]),adv:g.adv}
  }
  return out
}

/* --- TrueType binary writer --- */
const UNIT=100;
/* buildTTF: a font from glyphs of pixel rectangles. slant leans every rectangle into a parallelogram, moving a point slant font pixels
   to the right for each pixel it stands above the baseline; the glyph's box covers the slanted shape, or a browser clips its top. */
function buildTTF(name,sub,em,asc,desc,xH,capH,italic,glyphMap,slant){
  const K=slant||0,lean=(x,y)=>Math.round(x+K*y);
  const upm=em*UNIT,codes=Object.keys(glyphMap).map(c=>c.codePointAt(0)).sort((a,b)=>a-b);
  const glyphs=[{code:0,rects:[],adv:Math.round(em*.5)}];
  for(const cp of codes){const ch=String.fromCodePoint(cp),g=glyphMap[ch];glyphs.push({code:cp,rects:g.rects,adv:g.adv})}
  const nG=glyphs.length;

  let maxPts=0,maxCts=0,gXMin=32767,gYMin=32767,gXMax=-32768,gYMax=-32768,maxAdv=0,minLsb=32767,minRsb=32767,maxExt=-32768,sumAdv=0,cntAdv=0;
  const glyfChunks=[],loca=new Uint32Array(nG+1);
  let gOff=0;
  for(let i=0;i<nG;i++){
    loca[i]=gOff;
    const g=glyphs[i],adv=g.adv*UNIT;
    maxAdv=Math.max(maxAdv,adv);
    if(g.code>=32&&g.code<=126){sumAdv+=adv;cntAdv++}
    if(!g.rects.length){continue}
    let x0=32767,y0=32767,x1=-32768,y1=-32768;
    const rs=g.rects.map(r=>[r[0]*UNIT,r[1]*UNIT,r[2]*UNIT,r[3]*UNIT]);
    for(const[a,b,c,d]of rs){x0=Math.min(x0,lean(a,b));y0=Math.min(y0,b);x1=Math.max(x1,lean(c,d));y1=Math.max(y1,d)}
    gXMin=Math.min(gXMin,x0);gYMin=Math.min(gYMin,y0);gXMax=Math.max(gXMax,x1);gYMax=Math.max(gYMax,y1);
    minLsb=Math.min(minLsb,x0);minRsb=Math.min(minRsb,adv-x1);maxExt=Math.max(maxExt,x1);
    const nc=rs.length,np=nc*4;maxCts=Math.max(maxCts,nc);maxPts=Math.max(maxPts,np);
    /* encode simple glyph with 2-byte deltas (flags=1: on-curve, 16-bit dx, 16-bit dy) */
    const buf=new ArrayBuffer(10+nc*2+2+np+np*2+np*2),dv=new DataView(buf);
    let p=0;
    dv.setInt16(p,nc);p+=2;dv.setInt16(p,x0);p+=2;dv.setInt16(p,y0);p+=2;dv.setInt16(p,x1);p+=2;dv.setInt16(p,y1);p+=2;
    for(let k=0;k<nc;k++){dv.setUint16(p,k*4+3);p+=2}
    dv.setUint16(p,0);p+=2;
    for(let k=0;k<np;k++)dv.setUint8(p++,1);
    let px=0;
    for(const[a,b,c,d]of rs)for(const nx of[lean(a,b),lean(a,d),lean(c,d),lean(c,b)]){dv.setInt16(p,nx-px);p+=2;px=nx}
    let py=0;
    for(const[a,b,c,d]of rs)for(const ny of[b,d,d,b]){dv.setInt16(p,ny-py);p+=2;py=ny}
    const pad=(4-(buf.byteLength%4))%4,u8=new Uint8Array(buf.byteLength+pad);u8.set(new Uint8Array(buf));
    glyfChunks.push(u8);gOff+=u8.length
  }
  loca[nG]=gOff;
  if(gXMin>gXMax){gXMin=gYMin=gXMax=gYMax=minLsb=minRsb=maxExt=0}

  const glyf=new Uint8Array(gOff);{let o=0;for(const u of glyfChunks){glyf.set(u,o);o+=u.length}}
  const locaBuf=new ArrayBuffer((nG+1)*4),locaDv=new DataView(locaBuf);
  for(let i=0;i<=nG;i++)locaDv.setUint32(i*4,loca[i]);

  const hmtxBuf=new ArrayBuffer(nG*4),hmtxDv=new DataView(hmtxBuf);
  for(let i=0;i<nG;i++){const g=glyphs[i],lx=g.rects.length?Math.min(...g.rects.map(r=>lean(r[0]*UNIT,r[1]*UNIT))):0;hmtxDv.setUint16(i*4,g.adv*UNIT);hmtxDv.setInt16(i*4+2,lx)}

  /* cmap format 4 */
  const segs=[];
  for(let i=1;i<nG;){
    const s=glyphs[i].code;let e=s,j=i+1;
    while(j<nG&&glyphs[j].code===e+1&&j-i===glyphs[j].code-s){e++;j++}
    segs.push({s,e,delta:(i-s+65536)%65536});i=j
  }
  segs.push({s:0xFFFF,e:0xFFFF,delta:1});
  const sc=segs.length,sr=2*Math.pow(2,Math.floor(Math.log2(sc))),es=Math.floor(Math.log2(sc)),rs=sc*2-sr;
  const f4Len=14+sc*8+2,cmapLen=4+16+f4Len,cmapBuf=new ArrayBuffer(cmapLen),cmapDv=new DataView(cmapBuf);
  cmapDv.setUint16(0,0);cmapDv.setUint16(2,2);
  cmapDv.setUint16(4,0);cmapDv.setUint16(6,3);cmapDv.setUint32(8,20);
  cmapDv.setUint16(12,3);cmapDv.setUint16(14,1);cmapDv.setUint32(16,20);
  let cp=20;
  cmapDv.setUint16(cp,4);cmapDv.setUint16(cp+2,f4Len);cmapDv.setUint16(cp+4,0);
  cmapDv.setUint16(cp+6,sc*2);cmapDv.setUint16(cp+8,sr);cmapDv.setUint16(cp+10,es);cmapDv.setUint16(cp+12,rs);cp+=14;
  for(const x of segs){cmapDv.setUint16(cp,x.e);cp+=2}
  cmapDv.setUint16(cp,0);cp+=2;
  for(const x of segs){cmapDv.setUint16(cp,x.s);cp+=2}
  for(const x of segs){cmapDv.setUint16(cp,x.delta);cp+=2}
  for(let k=0;k<sc;k++){cmapDv.setUint16(cp,0);cp+=2}

  /* head */
  const headBuf=new ArrayBuffer(54),headDv=new DataView(headBuf);
  headDv.setUint32(0,0x00010000);headDv.setUint32(4,0x00010000);headDv.setUint32(12,0x5F0F3CF5);
  headDv.setUint16(16,0x000B);headDv.setUint16(18,upm);
  headDv.setInt16(36,gXMin);headDv.setInt16(38,gYMin);headDv.setInt16(40,gXMax);headDv.setInt16(42,gYMax);
  headDv.setUint16(44,italic?2:0);headDv.setUint16(46,8);headDv.setInt16(48,2);headDv.setInt16(50,1);

  /* hhea */
  const hheaBuf=new ArrayBuffer(36),hheaDv=new DataView(hheaBuf);
  hheaDv.setUint32(0,0x00010000);hheaDv.setInt16(4,asc*UNIT);hheaDv.setInt16(6,desc*UNIT);hheaDv.setInt16(8,0);
  hheaDv.setUint16(10,maxAdv);hheaDv.setInt16(12,minLsb);hheaDv.setInt16(14,minRsb);hheaDv.setInt16(16,maxExt);
  hheaDv.setInt16(18,italic?1:1);hheaDv.setInt16(20,0);hheaDv.setUint16(34,nG);

  /* maxp */
  const maxpBuf=new ArrayBuffer(32),maxpDv=new DataView(maxpBuf);
  maxpDv.setUint32(0,0x00010000);maxpDv.setUint16(4,nG);maxpDv.setUint16(6,maxPts);maxpDv.setUint16(8,maxCts);

  /* OS/2 v4 */
  const os2Buf=new ArrayBuffer(96),os2Dv=new DataView(os2Buf);
  os2Dv.setUint16(0,4);os2Dv.setInt16(2,cntAdv?Math.round(sumAdv/cntAdv):600);os2Dv.setUint16(4,400);os2Dv.setUint16(6,5);
  os2Dv.setInt16(10,Math.round(upm*.5));os2Dv.setInt16(12,Math.round(upm*.5));
  os2Dv.setInt16(26,Math.round(upm*.1));os2Dv.setInt16(28,Math.round(upm*.3));
  os2Dv.setUint16(62,italic?0x0001:0x0040);os2Dv.setUint16(64,codes[0]);os2Dv.setUint16(66,Math.min(0xFFFF,codes[codes.length-1]));
  os2Dv.setInt16(68,asc*UNIT);os2Dv.setInt16(70,desc*UNIT);os2Dv.setInt16(72,0);
  os2Dv.setUint16(74,Math.max(asc*UNIT,gYMax));os2Dv.setUint16(76,Math.max(-desc*UNIT,-gYMin));
  os2Dv.setUint32(78,1);os2Dv.setInt16(86,xH*UNIT);os2Dv.setInt16(88,capH*UNIT);

  /* name */
  const ps=(name+'-'+sub).replace(/\s+/g,''),strs=[[1,name],[2,sub],[4,name+' '+sub],[6,ps]];
  const enc=strs.map(([id,s])=>{const b=new Uint8Array(s.length*2);for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);b[i*2]=c>>8;b[i*2+1]=c&255}return{id,b}});
  const strBytes=enc.reduce((a,x)=>a+x.b.length,0),nameBuf=new ArrayBuffer(6+enc.length*12+strBytes),nameDv=new DataView(nameBuf);
  nameDv.setUint16(0,0);nameDv.setUint16(2,enc.length);nameDv.setUint16(4,6+enc.length*12);
  let no=6,so=0;
  for(const x of enc){nameDv.setUint16(no,3);nameDv.setUint16(no+2,1);nameDv.setUint16(no+4,0x0409);nameDv.setUint16(no+6,x.id);
    nameDv.setUint16(no+8,x.b.length);nameDv.setUint16(no+10,so);no+=12;new Uint8Array(nameBuf,6+enc.length*12+so).set(x.b);so+=x.b.length}

  /* post v3 */
  const postBuf=new ArrayBuffer(32),postDv=new DataView(postBuf);
  postDv.setUint32(0,0x00030000);if(italic)postDv.setInt32(4,-10<<16);postDv.setInt16(8,-UNIT);postDv.setInt16(10,UNIT);

  const tables=[
    ['OS/2',new Uint8Array(os2Buf)],['cmap',new Uint8Array(cmapBuf)],['glyf',glyf],['head',new Uint8Array(headBuf)],
    ['hhea',new Uint8Array(hheaBuf)],['hmtx',new Uint8Array(hmtxBuf)],['loca',new Uint8Array(locaBuf)],
    ['maxp',new Uint8Array(maxpBuf)],['name',new Uint8Array(nameBuf)],['post',new Uint8Array(postBuf)]
  ].sort((a,b)=>a[0]<b[0]?-1:1);

  const csum=u=>{let s=0;for(let i=0;i<u.length;i+=4)s=(s+((u[i]<<24)|(u[i+1]<<16)|(u[i+2]<<8)|u[i+3]))>>>0;return s};
  const hdrLen=12+tables.length*16;
  let total=hdrLen;const padded=tables.map(([tag,u])=>{const len=u.length,p=new Uint8Array((len+3)&~3);p.set(u);total+=p.length;return[tag,u.length,p]});
  const out=new Uint8Array(total),dv=new DataView(out.buffer);
  const nt=padded.length,sr2=16*Math.pow(2,Math.floor(Math.log2(nt))),es2=Math.floor(Math.log2(nt)),rs2=nt*16-sr2;
  dv.setUint32(0,0x00010000);dv.setUint16(4,nt);dv.setUint16(6,sr2);dv.setUint16(8,es2);dv.setUint16(10,rs2);
  let off=hdrLen,di=12,headOff=0;
  for(const[tag,len,u]of padded){
    for(let i=0;i<4;i++)dv.setUint8(di+i,tag.charCodeAt(i));
    dv.setUint32(di+4,csum(u));dv.setUint32(di+8,off);dv.setUint32(di+12,len);di+=16;
    if(tag==='head')headOff=off;
    out.set(u,off);off+=u.length
  }
  const fullSum=csum(out);
  dv.setUint32(headOff+8,(0xB1B0AFBA-fullSum)>>>0);
  return out.buffer
}

const REG_G=expand(REG,REG_META),SML_G=expand(SML,SML_META);
const REG_R=toRects(REG_G),SML_R=toRects(SML_G),SLANT=.2;

/* Under html.pf: the sizes that put one font pixel on half a room pixel. Speech is outlined one font pixel all round, as thick as the
   letters' strokes: a thicker outline runs together between the letters on a bright scene. Thoughts are slanted: the
   pixel shapes lean about 11 degrees and the browser smooths their edges, the one text that is not on the pixel grid. A slant in whole
   pixels tears where a stroke steps over, and one in half pixels blurs on most screens. */
const CSS=`
html.pf body{font-family:"Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-weight:normal;font-synthesis:none;-webkit-font-smoothing:none;font-smooth:never}
html.pf #top{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px);letter-spacing:.04em}
html.pf #top button{font:inherit}
html.pf .line.th{-webkit-font-smoothing:antialiased;font-smooth:auto}
html.pf .line{font-size:calc(var(--s)*6px);line-height:1.25;
  text-shadow:var(--px) 0 #000,calc(var(--px)*-1) 0 #000,0 var(--px) #000,0 calc(var(--px)*-1) #000,
   var(--px) var(--px) #000,calc(var(--px)*-1) var(--px) #000,var(--px) calc(var(--px)*-1) #000,calc(var(--px)*-1) calc(var(--px)*-1) #000}
html.pf .tag{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px);line-height:1.25}
html.pf #hush{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px);line-height:1.35}
html.pf #overlay h1:not(.art){font-size:calc(var(--s)*18px)}
html.pf #overlay h2{font-size:calc(var(--s)*6px);letter-spacing:.16em}
html.pf #overlay p{font-size:calc(var(--s)*6px);line-height:1.25}
html.pf #overlay .small{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px);line-height:1.35}
html.pf #overlay .go,html.pf #overlay .pick{font-size:calc(var(--s)*6px)}
html.pf #overlay.end h1{font-size:calc(var(--s)*12px)!important}
html.pf #status{font-size:calc(var(--s)*6px);line-height:calc(var(--s)*11px)}
html.pf #verbs button{font-size:calc(var(--s)*6px)}
html.pf #choices button{font-size:calc(var(--s)*6px);line-height:calc(var(--s)*7.2px)}
html.pf #codebox h2{font-size:calc(var(--s)*12px);letter-spacing:.14em}
html.pf #codebox p{font-size:calc(var(--s)*6px);line-height:1.25}
html.pf #codebox .big{font-size:calc(var(--s)*18px);letter-spacing:.1em}
html.pf #codebox input{font-size:calc(var(--s)*6px);letter-spacing:.1em}
html.pf #codebox button{font-size:calc(var(--s)*6px)}
html.pf #codebox .small{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px)}
html.pf #codebox .kept{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace;font-size:calc(var(--s)*4.5px)}
html.pf #menu h2{font-size:calc(var(--s)*12px);letter-spacing:.14em}
html.pf #menu .row label,html.pf #menu button,html.pf #menu .seg button{font-size:calc(var(--s)*6px)}
html.pf #overlay.card h2{font-size:calc(var(--s)*6px);letter-spacing:.18em}
html.pf #overlay.card h1:not(.art){font-size:calc(var(--s)*12px)}
html.pf #tablets .cols{font-size:calc(var(--s)*4.5px);line-height:1.3}
html.pf #tablets .cols,html.pf #tablets .foot{font-family:"Paul Pixel Small","Paul Pixel","Lucida Console",Monaco,"Courier New",monospace}
html.pf #tablets h3{font-size:calc(var(--s)*6px)}
html.pf #tablets .foot{font-size:calc(var(--s)*4.5px)}
`;

const ready=(async()=>{
  try{
    if(typeof FontFace==='undefined'||!document.fonts)return false;
    const f1=new FontFace('Paul Pixel',buildTTF('Paul Pixel','Regular',12,10,-2,5,8,0,REG_R),{weight:'100 900',style:'normal'});
    const f2=new FontFace('Paul Pixel',buildTTF('Paul Pixel','Italic',12,10,-2,5,8,1,REG_R,SLANT),{weight:'100 900',style:'italic'});
    const f3=new FontFace('Paul Pixel Small',buildTTF('Paul Pixel Small','Regular',9,7,-2,4,6,0,SML_R),{weight:'100 900',style:'normal'});
    await Promise.all([f1.load(),f2.load(),f3.load()]);
    document.fonts.add(f1);document.fonts.add(f2);document.fonts.add(f3);
    const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
    return true
  }catch(e){console.error(e);return false}
})();

/* onCanvas: for words painted on a canvas in room units, such as the names on the map and the captions of a close view. When the pixel
   font is in use it sets the small face on g, one font pixel to the canvas pixel, and returns true; it returns false when the font is
   not in use or the words are wider than w, and the caller keeps its own font. Paint at pin(x), and at the baseline mid(y) for words
   centred on y, so that every letter sits on whole canvas pixels. */
const on=()=>document.documentElement.classList.contains('pf');
function onCanvas(g,s,w){if(!on())return false;g.font='4.5px "Paul Pixel Small"';if(w!=null&&g.measureText(s).width>w)return false;
  g.textBaseline='alphabetic';return true}
const pin=v=>Math.round(v*2)/2,mid=y=>Math.round((y+1.5)*2)/2;

return{ready,onCanvas,pin,mid,has:ch=>!!REG_G[ch],hasSmall:ch=>!!SML_G[ch],
  families:{regular:'Paul Pixel',small:'Paul Pixel Small'},
  glyphs:{regular:REG_G,small:SML_G}};
})();
