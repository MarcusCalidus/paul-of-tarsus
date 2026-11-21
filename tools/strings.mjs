// The game's text is data: the code holds keys, lang/en/ holds the English, and every other language under lang/ holds its own text for
// the same keys, each with the fingerprint of the English line it was made from. This file checks all of it.
//   node tools/strings.mjs --check                     the text check (tools/playtest.mjs runs it too)
//   node tools/strings.mjs --show de 9 [--stale]       a part's lines side by side: key, English, German, and whether the German is stale
//   node tools/strings.mjs --confirm de 9 <key>...     after checking a stale German line (or rewriting it), record that it fits the
//                                                      English as it stands now; --stale instead of keys confirms every stale line of the part
//   node tools/strings.mjs levels/chapter1.js          the text-like strings found in a file, one line each
// A string literal counts as text when it reads like a sentence or a phrase (letters and a space), when it is a one-word line
// such as "Gladly.", when it sits where a name or a line goes (name:, called:, look:, q:..., a person's name in actor(...), the
// branches of a get name() getter), or when it is passed to T(...). Code strings that happen to read like text are in NOT_TEXT.
// A short string of the form "word: value" is taken for a style rule; a sentence that opens that way ("Beware: the road is long.") is text.
// In the code every such string must be a key of lang/en. What the scan misses, the playtest still catches: it plays the whole game in
// each language and fails on any key shown without its text.
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
const NOT_TEXT=new Set(['use strict','on end','on card','on long','on title','italic bold 5px "Lucida Console",Monaco,monospace','bold 4.2px "Lucida Console",Monaco,monospace',
  'bold 4.4px "Lucida Console",Monaco,monospace','new sea','#overlay [data-ch]','(prefers-reduced-motion: reduce)']);
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

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])&&process.argv[2]&&!process.argv[2].startsWith('--')){
  for(const f of process.argv.slice(2)){const src=fs.readFileSync(f,'utf8');for(const x of scan(src,{engine:/index\.html$/.test(f)}))console.log(x.line+'\t'+x.s)}}

/* ---------- the text check (run by tools/playtest.mjs, or: node tools/strings.mjs --check) ---------- */
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
/* the engine's code: what stands between <script> and </script> in index.html */
const engineSource=()=>[...fs.readFileSync(path.join(ROOT,'index.html'),'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n;\n');
/* the fingerprint of an English line: FNV-1a over its UTF-16 code units, in base 36 */
export const fingerprint=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(36).padStart(7,'0')};
const PARTS=()=>{const p=['main'];if(fs.existsSync(path.join(ROOT,'levels','prologue.js')))p.push('prologue');
  for(const f of fs.readdirSync(path.join(ROOT,'levels')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}))){const m=f.match(/^chapter(\d+)\.js$/);if(m)p.push(m[1])}return p};
const langFile=(lang,part)=>path.join(ROOT,'lang',lang,(part==='main'||part==='prologue'?part:'chapter'+part)+'.js');
/* a language's entries, part by part, as they stand in its files: a string (English) or [text, fingerprint] (any other language) */
export function readLang(lang){const D={},sb={TEXTS:(l,p,d)=>{if(l===lang)Object.assign(D[p]||(D[p]={}),d)}};
  const dir=path.join(ROOT,'lang',lang);if(fs.existsSync(dir))for(const f of fs.readdirSync(dir))if(f.endsWith('.js'))vm.runInNewContext(fs.readFileSync(path.join(dir,f),'utf8'),sb,{filename:f});
  return D}
const textOf=v=>Array.isArray(v)?v[0]:v;
/* English book names, as they must not appear (with a chapter and verse) in another language's text */
const BOOKS='Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Kings|Chronicles|Ezra|Nehemiah|Job|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Obadiah|Jonah|Micah|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Hebrews|James|Peter|Jude|Revelation';
/* what each language's text must not contain */
const RULES={de:[[/"/,'a straight quotation mark (German uses „ and “)'],[/\bC\.E\.|B\.C\.E\./,'C.E. or B.C.E. (German uses u. Z. and v. u. Z.)']]};
export function checkTexts(){
  const parts={main:[engineSource(),...['tablets','map'].map(n=>fs.readFileSync(path.join(ROOT,'shared',n+'.js'),'utf8'))]};
  for(const k of PARTS())if(k!=='main')parts[k]=[fs.readFileSync(path.join(ROOT,'levels',k==='prologue'?'prologue.js':'chapter'+k+'.js'),'utf8')];
  const lit={};for(const k in parts){lit[k]=new Set();for(const s of parts[k])for(const t of literals(s))lit[k].add(t.v)}
  const out=[];let failed=false;const ok=(c,m,list)=>{if(!c)failed=true;out.push((c?'ok   ':'FAIL ')+m+(c?'':'\n       '+list.slice(0,12).map(s=>JSON.stringify(s)).join('\n       ')+(list.length>12?`\n       ... ${list.length-12} more`:'')))};
  const where=k=>k==='main'?'':k==='prologue'?'prologue: ':'chapter '+k+': ';
  /* a line that is spoken with a gesture (a chapter's ACTING table) is a line of that chapter: it stands in the file once more, where it is spoken */
  {const orphan=[];let n=0;for(const k in parts){if(k==='main')continue;const src=parts[k][0],m=/\nconst ACTING=\{([\s\S]*?)\};\n/.exec(src);if(!m)continue;
      const count=s=>literals(src).filter(t=>t.v===s).length;for(const t of literals(m[1])){n++;if(count(t.v)<2)orphan.push('chapter '+k+': '+t.v)}}
    ok(!orphan.length&&n>0,`every line that is given a gesture is a line of its chapter (${n} lines)`,orphan)}
  /* English: every key the code shows has its line, every line is used, and no line is written in the code itself */
  const EN=readLang('en');{const inCode=[],unused=[],empty=[];let n=0;
    const known=(k,key)=>(EN[k]&&EN[k][key]!=null)||(EN.prologue&&EN.prologue[key]!=null)||(EN.main&&EN.main[key]!=null)||(k==='main'&&Object.values(EN).some(d=>d[key]!=null));
    for(const k in parts){for(const s of parts[k])for(const x of scan(s,{engine:k==='main'&&s===parts.main[0]}))if(!known(k,x.s))inCode.push(where(k)+x.s);
      for(const key in EN[k]||{}){n++;if(!lit[k].has(key))unused.push(where(k)+key);if(typeof EN[k][key]!=='string'||!EN[k][key])empty.push(where(k)+key)}}
    ok(!inCode.length,'the code holds keys, not text: every line it shows stands in lang/en',inCode);
    ok(!unused.length,`en: every line is used by its part of the game (${n} lines)`,unused);
    ok(!empty.length,'en: every line is a string with text in it',empty)}
  for(const lang of fs.readdirSync(path.join(ROOT,'lang')).sort()){if(lang==='en'||!fs.statSync(path.join(ROOT,'lang',lang)).isDirectory())continue;const D=readLang(lang);
    let n=0;const miss=[],orphan=[],unstamped=[],stale=[],slot=[],book=[],marks=[],rule=[];
    for(const k in parts){const d=D[k]||{},m=D.main||{},e=EN[k]||{};
      for(const key in e){n++;if(d[key]==null&&m[key]==null)miss.push(where(k)+key+': '+e[key])}
      for(const key in d){const en=e[key];if(en==null){orphan.push(where(k)+key);continue}const v=d[key],t=textOf(v);
        if(!Array.isArray(v)||typeof v[1]!=='string')unstamped.push(where(k)+key);else if(v[1]!==fingerprint(en))stale.push(where(k)+key+': '+en);
        for(const x of t.match(/\{\w+\}/g)||[])if(!en.includes(x))slot.push(en+' -> '+t);
        if(new RegExp(`\\b(${BOOKS}) \\d+:\\d+`).test(t))book.push(t);
        if(/[\u0300-\u036f\u02b9\u00b7]/.test(t.normalize('NFD').replace(/[\u0308\u0301\u0300]/g,'')))marks.push(t);
        for(const[re,what]of RULES[lang]||[])if(re.test(t))rule.push(what+': '+t)}}
    ok(!miss.length,`${lang}: every English line has a translation (${n} lines)`,miss);
    ok(!orphan.length,`${lang}: every translation belongs to a line that is still in lang/en`,orphan);
    ok(!unstamped.length,`${lang}: every translation carries the fingerprint of its English line ([text, fingerprint])`,unstamped);
    ok(!stale.length,`${lang}: no English line has changed since it was translated (check each, then: node tools/strings.mjs --confirm ${lang} <part> <key>)`,stale);
    ok(!slot.length,`${lang}: no translation adds a {slot} its English line does not have`,slot);
    ok(!book.length,`${lang}: Scripture references use the language's own book names`,book);
    ok(!marks.length,`${lang}: no pronunciation marks copied from the Bible text`,marks);
    ok(!rule.length,`${lang}: punctuation and wording follow the language's rules`,rule)}
  return{out,failed}}
const main=process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1]);
if(main&&process.argv[2]==='--check'){const r=checkTexts();console.log(r.out.join('\n'));process.exit(r.failed?1:0)}
/* --show and --confirm: one part of one language, against the English */
if(main&&(process.argv[2]==='--show'||process.argv[2]==='--confirm')){
  const[,, cmd,lang,part,...rest]=process.argv;if(!lang||lang==='en'||!part){console.error('usage: node tools/strings.mjs --show|--confirm <lang> <part> [keys... | --stale]');process.exit(2)}
  const EN=readLang('en')[part]||{},D=readLang(lang)[part]||{};
  const state=key=>{const v=D[key];if(v==null)return'missing';if(!Array.isArray(v))return'unstamped';return v[1]===fingerprint(EN[key])?'ok':'stale'};
  if(cmd==='--show'){const only=rest.includes('--stale');for(const key in EN){const st=state(key);if(only&&st==='ok')continue;
      console.log(`${key}  [${st}]\n  en: ${EN[key]}\n  ${lang}: ${D[key]==null?'':textOf(D[key])}`)}process.exit(0)}
  const keys=rest.includes('--stale')?Object.keys(EN).filter(k=>state(k)==='stale'||state(k)==='unstamped'):rest;
  const file=langFile(lang,part);const lines=fs.readFileSync(file,'utf8').split('\n');let done=0;const notFound=[];
  for(const key of keys){if(EN[key]==null||D[key]==null){notFound.push(key);continue}
    const kq=JSON.stringify(key),i=lines.findIndex(l=>l.startsWith('  '+kq+':'));if(i<0){notFound.push(key);continue}
    const comma=lines[i].endsWith(',')?',':'';lines[i]=`  ${kq}:${JSON.stringify([textOf(D[key]),fingerprint(EN[key])])}${comma}`;done++}
  fs.writeFileSync(file,lines.join('\n'));console.log(`${done} line(s) of ${path.relative(ROOT,file)} now carry the fingerprint of their English`+(notFound.length?`; not found: ${notFound.join(', ')}`:''));
  process.exit(notFound.length?1:0)}
