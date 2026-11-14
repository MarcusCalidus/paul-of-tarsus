// Finds the player-visible English text in the game's source files, and checks every language under lang/ against it.
//   node tools/strings.mjs levels/chapter1.js     prints the text found in a file, one line each
//   node tools/strings.mjs --check                 the translation check (tools/playtest.mjs runs it too)
// A string literal counts as text when it reads like a sentence or a phrase (letters and a space), when it is a one-word line
// such as "Gladly.", when it sits where a name or a line goes (name:, called:, look:, q:..., a person's name in actor(...), the
// branches of a get name() getter), or when it is passed to T(...). Code strings that happen to read like text are in NOT_TEXT.
// A short string of the form "word: value" is taken for a style rule; a sentence that opens that way ("Beware: the road is long.") is text.
// What the scan misses, the playtest still catches: it plays the whole game in each language and fails on any line shown untranslated.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

/* tokenize: string literals with the tokens before them; template literals with ${} are reported whole, as dynamic */
export function literals(src){
  const out=[];let i=0,prev=[];const n=src.length;
  const push=t=>{prev.push(t);if(prev.length>16)prev.shift()};
  const regexOK=()=>{const p=prev[prev.length-1];return !p||(p.k==='p'&&!/^[)\]}]$/.test(p.v))||(p.k==='w'&&/^(return|typeof|case|in|of|new|delete|void|throw)$/.test(p.v))};
  while(i<n){const c=src[i];
    if(c==='/'&&src[i+1]==='/'){while(i<n&&src[i]!=='\n')i++;continue}
    if(c==='/'&&src[i+1]==='*'){const e=src.indexOf('*/',i+2);i=e<0?n:e+2;continue}
    if(c==="'"||c==='"'){let j=i+1,s='';while(j<n&&src[j]!==c){if(src[j]==='\\'){const d=src[j+1];s+=d==='n'?'\n':d==='u'?String.fromCharCode(parseInt(src.substr(j+2,4),16)):d;j+=d==='u'?6:2}else s+=src[j++]}
      const t={k:'s',v:s,at:i,before:prev.slice()};out.push(t);push(t);i=j+1;continue}
    if(c==='`'){let j=i+1,s='',dyn=false,depth=0;while(j<n){if(src[j]==='\\'){s+=src[j+1];j+=2;continue}
        if(src[j]==='`'&&!depth)break;if(src[j]==='$'&&src[j+1]==='{'&&!depth){dyn=true;depth=1;s+='${';j+=2;continue}
        if(depth){if(src[j]==='{')depth++;else if(src[j]==='}'){depth--;if(!depth){s+='}';j++;continue}}}s+=src[j++]}
      const t={k:'s',v:s,at:i,before:prev.slice(),tpl:1,dyn};out.push(t);push(t);i=j+1;continue}
    if(c==='/'&&regexOK()){let j=i+1,cls=false;while(j<n&&(src[j]!=='/'||cls)){if(src[j]==='\\')j++;else if(src[j]==='[')cls=true;else if(src[j]===']')cls=false;j++}
      j++;while(/[a-z]/.test(src[j]||''))j++;push({k:'r',v:src.slice(i,j)});i=j;continue}
    if(/\s/.test(c)){i++;continue}
    if(/[A-Za-z_$]/.test(c)){let j=i;while(j<n&&/[\w$]/.test(src[j]))j++;push({k:'w',v:src.slice(i,j)});i=j;continue}
    if(/[0-9.]/.test(c)&&/[0-9]/.test(src[i+1]||c)){let j=i;while(j<n&&/[\w.]/.test(src[j]))j++;push({k:'n',v:src.slice(i,j)});i=j;continue}
    push({k:'p',v:c});i++}
  return out}

/* strings with a space that are code, not text */
const NOT_TEXT=new Set(['use strict','on end','italic bold 5px "Lucida Console",Monaco,monospace','bold 4.2px "Lucida Console",Monaco,monospace',
  'bold 4.4px "Lucida Console",Monaco,monospace','new sea','#overlay [data-ch]']);
const looksCode=s=>/\{[^}]*:[^}]*;/.test(s)||/^[#.][\w-]+[\s.#\[]/.test(s)||/^[#.]?[\w-]+(\s*[,>]\s*|\s+)[#.\[]/.test(s)||/^(rgba?|calc|url)\(/.test(s)||/px\b.*(monospace|serif)/.test(s)||/^[\w-]+:\s*[\w#(]/.test(s)&&!/ /.test(s.split(':')[0])&&s.trim().split(/\s+/).length<5;
const wordsOf=s=>/\p{L}{2,}/u.test(s);
/* text: what a player can see. b is the list of tokens before the literal. */
export function isText(t,inGetName){const s=t.v,b=t.before,p1=b[b.length-1],p2=b[b.length-2],p3=b[b.length-3];
  if(p1&&p1.v==='('&&p2&&p2.v==='T')return true;
  if(!wordsOf(s)||NOT_TEXT.has(s)||t.dyn)return false;
  if(/<\/?[a-z]/i.test(s))return false;
  const slot=p1&&p1.v===':'&&p2&&p2.k==='w'&&/^(name|called|q|t|ref|short|note|look|pickup|use|open|talk|give|text|noCraft)$/.test(p2.v);
  /* actor(id, 'Name', ...): the second argument */
  const actorName=p1&&p1.v===','&&p2&&p2.k==='s'&&p3&&p3.v==='('&&b[b.length-4]&&b[b.length-4].v==='actor';
  if(slot||actorName||inGetName)return !/^[a-z]+[A-Z]\w*$/.test(s)&&!looksCode(s);
  /* a line of one word: "Gladly.", "Isaiah..." */
  if(/^\p{Lu}\p{Ll}+(?:\.\.\.|[.!?])$/u.test(s))return true;
  return / /.test(s.trim())&&!looksCode(s)}

/* scan a file: every text string, in order, with its line number */
export function scan(src,{engine}={}){const lits=literals(src),out=[];
  for(const t of lits){
    /* get name(){return ...?'a':'b'}: the branches of the getter are names */
    let g=false;const b=t.before;for(let k=b.length-1;k>=0;k--){if(b[k].v==='return'){g=b[k-1]&&b[k-1].v==='{'&&b[k-4]&&b[k-4].v==='name'&&b[k-5]&&b[k-5].v==='get';break}if(b[k].v===';'||b[k].v==='}')break}
    const p1=b[b.length-1];if(g&&p1&&!/^[?:]$/.test(p1.v))g=false;
    const T=b.length>=2&&b[b.length-1].v==='('&&b[b.length-2].v==='T';
    if(engine?T:isText(t,g))out.push({s:t.v,line:src.slice(0,t.at).split('\n').length,tpl:!!t.tpl})}
  return out}

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])&&process.argv[2]!=='--check'){
  for(const f of process.argv.slice(2)){const src=fs.readFileSync(f,'utf8');for(const x of scan(src,{engine:/index\.html$/.test(f)}))console.log(x.line+'\t'+x.s)}}

/* ---------- the translation check (run by tools/playtest.mjs, or: node tools/strings.mjs --check) ---------- */
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
const engineSource=()=>{const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');return h.slice(h.indexOf('<script>')+8,h.lastIndexOf('</script>'))};
/* English book names, as they must not appear (with a chapter and verse) in another language's text */
const BOOKS='Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Kings|Chronicles|Ezra|Nehemiah|Job|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Obadiah|Jonah|Micah|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Hebrews|James|Peter|Jude|Revelation';
/* what each language's text must not contain */
const RULES={de:[[/"/,'a straight quotation mark (German uses „ and “)'],[/\bC\.E\.|B\.C\.E\./,'C.E. or B.C.E. (German uses u. Z. and v. u. Z.)']]};
export function checkTexts(){
  const parts={main:[engineSource(),...['tablets','map'].map(n=>fs.readFileSync(path.join(ROOT,'shared',n+'.js'),'utf8'))]};
  for(const f of fs.readdirSync(path.join(ROOT,'levels')).sort()){const m=f.match(/^chapter(\d+)\.js$/);if(m)parts[m[1]]=[fs.readFileSync(path.join(ROOT,'levels',f),'utf8')]}
  const text={},lit={};for(const k in parts){text[k]=new Set();lit[k]=new Set();for(const s of parts[k]){for(const x of scan(s))text[k].add(x.s);for(const t of literals(s))lit[k].add(t.v)}}
  const out=[];let failed=false;const ok=(c,m,list)=>{if(!c)failed=true;out.push((c?'ok   ':'FAIL ')+m+(c?'':'\n       '+list.slice(0,12).map(s=>JSON.stringify(s)).join('\n       ')+(list.length>12?`\n       ... ${list.length-12} more`:'')))};
  const langDir=path.join(ROOT,'lang');
  for(const lang of fs.existsSync(langDir)?fs.readdirSync(langDir).sort():[]){const D={},sb={TEXTS:(l,p,d)=>{if(l===lang)Object.assign(D[p]||(D[p]={}),d)}};
    for(const f of fs.readdirSync(path.join(langDir,lang)))if(f.endsWith('.js'))vm.runInNewContext(fs.readFileSync(path.join(langDir,lang,f),'utf8'),sb,{filename:f});
    let n=0;const miss=[],stale=[],slot=[],book=[],marks=[],rule=[];
    for(const k in parts){const d=D[k]||{},m=D.main||{};
      for(const s of text[k]){n++;if(d[s]==null&&m[s]==null)miss.push((k==='main'?'':'chapter '+k+': ')+s)}
      for(const s in d){if(!lit[k].has(s))stale.push((k==='main'?'':'chapter '+k+': ')+s);const v=d[s];
        for(const x of v.match(/\{\w+\}/g)||[])if(!s.includes(x))slot.push(s+' -> '+v);
        if(new RegExp(`\\b(${BOOKS}) \\d+:\\d+`).test(v))book.push(v);
        if(/[̀-ͯʹ·]/.test(v.normalize('NFD').replace(/[̈́̀]/g,'')))marks.push(v);
        for(const[re,what]of RULES[lang]||[])if(re.test(v))rule.push(what+': '+v)}}
    ok(!miss.length,`${lang}: every English line has a translation (${n} lines)`,miss);
    ok(!stale.length,`${lang}: every translation belongs to a line that is still in the game`,stale);
    ok(!slot.length,`${lang}: no translation adds a {slot} its English line does not have`,slot);
    ok(!book.length,`${lang}: Scripture references use the language's own book names`,book);
    ok(!marks.length,`${lang}: no pronunciation marks copied from the Bible text`,marks);
    ok(!rule.length,`${lang}: punctuation and wording follow the language's rules`,rule)}
  return{out,failed}}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])&&process.argv[2]==='--check'){const r=checkTexts();console.log(r.out.join('\n'));process.exit(r.failed?1:0)}
