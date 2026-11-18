# Contributing

Paul of Tarsus is a Bible-based adventure meant to be suitable for Jehovah's Witness families. The rules below apply to everyone who changes it: the maintainer, contributors who propose changes, and AI coding assistants working in this repository. When a new rule is agreed, it is added to this file in the same change.

## 1. Scripture and history

### The Bible text

- Every Bible paraphrase and reference follows the **New World Translation of the Holy Scriptures (Study Edition)**, which you read on [jw.org](https://www.jw.org/en/library/bible/study-bible/books/) or in the [Watchtower Online Library](https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty).
- Look up every verse there before you write about it. Do not work from memory, and do not take what a verse means from another translation or from another edition of the New World Translation.
- Tell what a verse says in your own words, with its reference. Do not copy the Study Edition's wording into the game or its documentation (see "Terms of use of jw.org" below). A paraphrase follows the meaning of the New World Translation and must not say more or less than the verse does. Never invent a quotation, or present a paraphrase as one: a paraphrase stands without quotation marks, on the wax tablets too.
- Other translations may be consulted for ideas on wording and sentence shape, never for the meaning: in English, Byington's *The Bible in Living English* and Rotherham's *Emphasised Bible*; in German, BIBEL.HEUTE and *Hoffnung für Alle*. Never copy any of them 1:1 either, and do not stitch a sentence together from their fragments. Write your own wording with your own sentence structure, shorter where possible.
- Use the divine name wherever the New World Translation has it in the passage: "Jehovah" (in German "Jehova"), never "the Lord", "der Herr" or "God" in its place. Where the New World Translation has "God" or "Lord", keep that.
- If you cannot check what a verse says, give the reference only, and list it for the maintainer to check.
- Give the reference with the line it belongs to, for example "(James 1:5)", or on the chapter's end screen.

### Historical information

- Check dates, places, routes, distances, people, offices, customs, trades, clothing, buildings and money against [jw.org](https://www.jw.org) or [wol.jw.org](https://wol.jw.org): the Study Edition's notes, media and maps, *Insight on the Scriptures*, and the other publications there.
- Where those sources are silent, a detail may be invented, but it must be plausible and must not contradict them. For example, the Scriptures say nothing of how the relief in Chapter Three was packed and counted, so those details are invented.
- If you cannot verify something, leave it out or ask the maintainer. In a pull request, list what you checked and where.

### Understanding and wording

- Follow the scriptural understanding of Jehovah's Witnesses. Use "Jehovah", "C.E." and "B.C.E.", "the congregation" and "the brothers".
- Watch for details that are easy to get wrong. Acts 11:26 says the disciples were called Christians "by divine providence", so the name must not be presented as a nickname coined by outsiders.
- Use jw.org and wol.jw.org to check facts only. Do not copy their artwork, photographs, maps or publication text into the game.

### Terms of use of jw.org

The [Terms of Use](https://www.jw.org/en/terms-of-use/) of jw.org (which cover its subdomains, such as wol.jw.org) let you view, download and print its text, artwork, music, photos and videos for your own personal, non-commercial use, and share links to downloadable publications. They do not let you post that material or its trademarks on any website, distribute it with or as part of a software application, use it for a commercial purpose, or use it for marketing. This game is a software application and its repository is a website, so:

- Neither the game nor the documentation reproduces text from the Study Edition (verses, study notes, footnotes), from *Insight on the Scriptures* or from any other publication on jw.org or wol.jw.org: no quotation marks around their wording, and no close paraphrase that keeps a source sentence's structure and changes only a word here and there. A verse is told with its reference in wording and sentence structure of your own, as "The Bible text" above describes; for anything else, name the publication, chapter or article and say in your own words what it establishes.
- No artwork, photograph, map, music, video, logo or trademark of the Watch Tower Bible and Tract Society or of jw.org appears in the game, its icon, its screenshots or its documentation. Everything is painted and synthesized in code (section 4).
- The game and its pages are not marketed with the name, logo or authority of jw.org or of Jehovah's Witnesses. The README says that this is an independent, non-commercial project that they do not produce, endorse or review; keep that sentence, and keep the game free of charge and free of advertising.
- Do not build or ship a tool that collects, copies or scrapes data from jw.org or wol.jw.org. Look things up by hand.
- Check the Terms of Use again when you change anything in this section: they may be revised.

## 2. Story and puzzles

- Paul gets out of trouble with his trade, cooperation with fellow believers, honesty, practical wisdom and trust in Jehovah. No puzzle is solved by violence, deceit or a miracle used as a shortcut.
- Paul never lies. That includes every dialogue choice offered to the player: a wrong choice may be unwise, but never untrue.
- **Pray to Jehovah** is the hint system. It never changes the game's state. The first prayer at a point gives a gentle hint, and praying again gives a more direct one.
- Invented characters and all dialogue are dramatization. Each chapter's end screen says so, and the "About the content" section of the chapter's page in `docs/` names the invented characters.
- A person named in the Scriptures appears only in events where the account places that person, or where the Study Edition's notes or the publications on wol.jw.org say that the person was likely there. In the second case the chapter's end screen and the README say what the account itself leaves unsaid. For example, Acts 14 does not name the disciples at Lystra; the note on 2 Timothy 1:5 says that Lois and Eunice likely became believers during that stay, so Chapter Six shows them with Timothy, and says that Acts does not.
- The narration follows the account's own voice. It calls him Saul until Acts 13:9 and Paul from there on, and it says "we" where Acts does: from Troas in Chapter Eight (Acts 16:10), and "they" again where the account returns to it (Acts 16:19).
- Before building a new chapter, agree on its episode with the maintainer by opening an issue.

## 3. Images and symbols

- No halos, crosses, mystical effects or pagan symbols. Where the account itself names a light from heaven, on the road to Damascus (Acts 9:3; 22:6, 11; 26:13), the screen goes plain white without rays, beams or figure; it comes up over at least four tenths of a second and never flashes.
- This includes cross shapes that appear by accident in pixel art. Watch for:
  - a tiny ellipse one pixel high, which rasterizes as a plus sign;
  - any small round shape with a radius under about one pixel of the view, such as the hole of a ring, a bead or the rim of a very small jar, which rasterizes as a plus sign too: draw it as a small square;
  - a vertical line over a horizontal band, such as rope lashings or yarn skeins;
  - grid lines or map lines that meet at right angles, and route lines on a map that cross each other;
  - a label or text laid across a thin line, such as a lake, river or coast;
  - "+" or "x" markers, and cross-shaped cursors or highlights;
  - four small squares set two by two, where the gap between them is a plus sign;
  - a rope or strap hanging straight down from the middle of a beam, which makes a T, and ties drawn across a roll or a bundle;
  - a tower that rises from the middle of a wall, or a post from the middle of a rail: set it at the end;
  - a sword with its guard. Where the account names a drawn sword (Acts 16:27), the hand covers the guard and the blade is one slanting line;
  - a mast or a post that stands across the level line where the sea meets the sky: keep the upright out of the picture, or the horizon behind something;
  - the joints of a bench or a wall drawn across its courses, and the threads of a loose weave drawn both ways: let each joint stop at the edge of its own course, and the threads run one way;
  - in a close view of a thing, such as a scroll or a bolt of cloth: a roller with a handle standing out of it or a tie round it, ruled lines that meet a margin, and four corners of laid-out pieces meeting in one point;
  - a column under a beam: paint a colonnade as a row of columns under a deep beam and a roof, give a column a capital hardly wider than its shaft, and lay no single block across two columns that stand free;
  - a statue with an arm stretched out, or with a spear held upright beside a shield: every arm is down, bent, or folded into the mantle;
  - the legs of a walking figure crossing below the hem as an X: the hips come together as it walks, so that the legs open like a pair of compasses; a foot that reaches across the foot of a spear, which makes a T upside down: whoever carries a spear steps short; and an arm that swings across the body as one dark slanting bar: the near arm swings forward only to the edge of the body;
  - a living figure with an arm stretched out to the side, or with both arms raised: when a hand moves, the forearm is bent and slanting, only the far hand is raised, and whoever holds a spear keeps his hand on it;
  - a tool hung by its handle with a blade or a head across it, such as a half-moon knife on a wall; a plank, an oar or a strap laid across a hull; a spar lying across the props of a ship; a bench with a leg under its middle; a board, a shelf or a table that runs behind a row of columns, each of which crosses it; and iron bands laid across the planks of a door.
- A letter in an inscription is a letter, not a cross shape: Greek capitals cut in stone may include tau and chi. Each inscription is still looked at enlarged.
- Where the account itself names something used in false worship, it may be shown plainly when the scene is about refusing it: the bulls and garlands of Acts 14:13 are shown at the gate of Lystra.
- A temple, an altar, a statue or an image of a god is not shown, with one exception, made for historical accuracy: in **Athens, Corinth, Ephesus and Rome** pagan temples, altars and deities may be displayed, because those cities cannot be shown as they were without them. Athens is Chapter Eleven, where the account itself turns on what Paul saw (Acts 17:16, 23, 24, 29); Corinth is Chapter Twelve, where two temples are seen from afar. Wherever the exception is used:
  - What is shown is recognizable and restrained: a temple from outside, an altar as an inscribed block, a statue as a draped figure. Nothing is unclothed, no image of a god is seen in close-up, and what the publications describe as indecent is left out altogether (the pillars at the entrance to the marketplace of Athens, for one).
  - No rite is shown: no sacrifice, fire, smoke or offering on an altar, no procession, and nobody praying or bowing to an image.
  - A god is named on the screen only where the scene needs it.
  - Paul never admires one, and the player never uses one as a tool, a key or a hiding place. The one use the game makes of any of them is the one Paul made of the altar in Acts 17:23.
  - Every other rule of this section holds for them.
- Look at screenshots of every changed scene before committing.

## 4. Look and sound

- Backdrops are painted in the manner of early-1990s VGA adventure games: painterly and detailed, with depth and real lighting. The scenes are our own. Never copy another game's art, characters or music.
- Characters are pixel-placed sprites drawn to the same standard as the backdrops: three-quarter view, crisp hand-placed pixels, flat bands of light and shadow, no outline, and lit by the room they stand in. Dress and head coverings fit the period, the place and the person.
- A figure has the proportions of the sprites of those games, not of life: it stands about five heads tall, with a head large enough for its face to be read on a small screen. Every head is drawn by hand at its own size, never as an enlarged copy of a smaller one. After a change to the figure painter or to a head, look at the whole cast, enlarged: `node tools/playtest.mjs cast`.
- In a Greek city the men of standing wear the Greek outer garment: a rectangular length of cloth wrapped over a tunic. The game's text calls it a mantle, not a toga, which the publications keep for a Roman garment. Greek women look as they did in the first century: a tunic to the feet, the mantle over it, and the hair parted and bound up, or the mantle drawn over the head. No woman is shown on the Areopagus: Damaris (Acts 17:34) listens from the path below it.
- A scene has depth. Whoever stands farther back is drawn behind: a man who walks behind the carrier's mule is hidden by it, and hides it when he stands in front. This holds for everything that stands inside a room's walkable strip, whether it is a person, an animal, or a thing painted into the backdrop such as a stool, a low table or a heap of sailcloth. In a new room, walk behind and in front of everything that stands out on the floor, and look.
- A scene has one horizon. Its sea, its fields and its paving run back to one level, about as high as the eyes of the people who stand in it, and whatever is seen through a gate, a window or a colonnade ends at that level too: the country behind a city gate has no lower horizon of its own. The engine's `gateView` paints that country, and each gate gives it the horizon and the sky of its own scene. Where an opening shows a street, either a house front closes the view or the street runs back to that same level. In a new room, lay a level line across the picture and look.
- Figures move when they speak, and the movement is drawn to the same standard: every frame of a mouth, a chin, a head or a hand is placed by hand in the figure painter, never made by scaling or turning another frame. After adding or changing one, look at all of them enlarged on `cast-talk.png` (`node tools/playtest.mjs cast`), for a chin or a beard that has come apart and for cross shapes; the playtest fails if a pose is in more than one piece. A figure that bows keeps its head still. A statue never moves.
- A walk follows the ground and never a clock: the frame comes from the distance covered, so that a foot that stands is not carried along, a step is heard as a foot lands, and a walk begins and ends on a shorter step. Everybody walks at the same speed, so that companions stay together; what differs from one person to the next is the step. Every frame of a stride is worked out by the figure painter for every look; after a change, look at them enlarged on `cast-walk.png` (`node tools/playtest.mjs cast`).
- A movement says something, and what it says must be true. A nod is a yes and a shake of the head is a no: the engine never gives either by itself, so that nobody, and Paul least of all, seems to agree with what he does not agree with. Whoever is spoken to may raise his brows or blink, and no more. A script directs a nod, a shake of the head or a hand on the chest, or the chapter lists the line in its `ACTING` table: only where the line itself plainly says so, and never on a thought.
- Narration is never set on a bare black screen. A line told while the picture is dark is read from the narrator's scroll (`shared/scroll.js`): an open roll of papyrus, held in two hands by lamplight. A chapter does nothing for it but fade out, or set the scene `DARK`, and tell. A roll and not a single sheet, because what the narrator tells is for the most part Luke's account, a book. The hands follow the maintainer's example: seen from the back, the thumb resting on its roll with its nail and the folds of its joint, in a short scale of skin tones with the backdrops' own dither. In that picture only the two flames move, with the small glow round each: nothing brightens and darkens the whole of it. The one place where narration stands on a plain screen without the scroll is the words told while the screen is white on the road to Damascus, set in dark ink because the narrator's room is by lamplight.
- Animals are drawn to the same standard as the people. Every part grows out of the one before it: a tail is set on at the rump, a neck comes out of the shoulders in the body's own tones, a head sits on its neck, and nothing floats free. Two animals that stand together must not overlap so that the head of one seems to belong to the body of the other. Look at them enlarged, in every walking frame and facing both ways: `node tools/playtest.mjs beasts`. The playtest fails if a sprite is in more than one piece.
- The game opens on its opening picture (`shared/splash.js`): its name over a tentmaker's bench by lamplight, once each time the game is opened and not when the player comes back to the title from a game. It is silent until the player clicks or presses a key, and never tries to sound before that. The click starts the overture; when its melody has been heard, or on a second click, the picture passes into the title's own and the chapters appear. In that picture only the flame moves.
- There are no image or audio files. Everything is painted in code on a canvas, and all music and sound are synthesized with the Web Audio API.
- Each chapter has its own score, and each room has a mood and ambience to match.
- Sound follows the player's device. On iPhone and iPad the game stays quiet in Silent Mode; never work around it (no HTML audio element, no `playback` audio session). The game may say that Silent Mode could be on, but it must not claim to know: Safari does not tell a page.

## 5. Code

- `index.html` is the engine. Each chapter is one file, `levels/chapterN.js`, loaded only when that chapter is played. It holds the chapter's music, artwork, cast, items, rooms, dialog, cutscenes and prayer hints. A new chapter adds its file and one line to the `CHAP` manifest. Anything shared between chapters goes in its own file, also loaded on demand, not in a chapter file or the engine.
- The game must keep running when `index.html` is opened straight from disk: no build step, no server and no dependencies.
- The game is also an installable app that plays offline (`sw.js`, `shared/pwa.js`). It loads its service worker only over http(s), so it still runs from disk. Its icon and manifest are made in code like everything else: no icon or manifest file. A new file in `shared/` goes on the offline list in `shared/pwa.js`; `node tools/playtest.mjs pwa` checks it.
- Safe-point codes are a promise to players. Every code that works today must keep working. The browser's autosave (`localStorage`, key `paul.save`) is that same code and nothing else, so the promise covers it: never keep other state there without a format the decoder can tell apart from the code. If a change needs more state, add a new code format that the decoder can tell apart from the old one. Never reorder a chapter's `flags`, `rooms` or `share`; only append to them, within the widths the code format reserves. Player options (volumes, text speed) live in their own key (`paul.opts`), separate from `paul.save`. Saved games (the farthest point, the last point's time and the four slots) live in `paul.saves`, and every entry in it is a safe-point code, so the same promise covers each one. The farthest point is never overwritten by a point that is not farther, and only the player deletes it.

## 6. Testing and documentation

- `node tools/playtest.mjs` must pass (it needs Node 22 or newer and Google Chrome). Extend it for every new puzzle step or feature.
- Add a stop to `tools/playtest-harness.html` for every new scene or feature, and look at its screenshot.
- Keep the documentation current. Each chapter has its own page, `docs/chapter-N.md`, with its walkthrough, music, map and "About the content"; a new chapter adds its page and a line in the README's chapter list and "About the content" list. Keep `docs/how-to-play.md`, `docs/look-and-sound.md` and `docs/development.md` current too, and the README short: what the game is, how to play, how to contribute, with links. Every new feature gets a screenshot in `docs/screenshots/`.

## 7. Publishing

GitHub Pages serves the game from the root of `main`, so a push to `main` publishes it. Push only changes that have been tested.

## 8. Languages

The game is written in English and plays in German too. The English text stays in the code; every other language is data under `lang/`, one folder per language.

- New or changed player-visible text must be added in every supported language in the same change. Changing an English line changes its key: change the entry in every language file with it. The playtest fails on a line that has no translation and on a translation whose English line is gone.
- Every rule in section 1 applies in each language. German verses are read in the German New World Translation, Study Edition ("Neue-Welt-Übersetzung der Heiligen Schrift – Studienausgabe"), on [wol.jw.org](https://wol.jw.org/de/wol/binav/r10/lp-x/nwtsty) or [jw.org/de](https://www.jw.org/de/bibliothek/bibel/studienbibel/buecher/). Look up each verse there before you write about it, and tell it in your own German words with the reference; the terms of use in section 1 apply to the German text just as they do to the English. Never base a German line on your own translation of the English verse: check what the German Study Edition says, and write the German paraphrase from that. For wording ideas BIBEL.HEUTE and *Hoffnung für Alle* may be consulted as section 1 allows, and never copied; the divine name is "Jehova" wherever the German Study Edition has it. If you cannot check a verse, give the reference only and list it for the maintainer.
- References use the language's own book names and style, such as "(Apostelgeschichte 9:25)" or "(5. Mose 21:23)". Names of people and places follow that language's Study Edition, without the marks that show stress: Saulus, Paulus, Kephas, Jakobus, Stephanus, Damaskus, Cäsarea, Antiochia. Invented characters with a Bible name take its spelling there too (Noomi, Isai, Sakkai).
- In German, use the terms Jehovah's Witnesses use: "Jehova", "u. Z." and "v. u. Z.", "die Versammlung", "die Brüder", "unverdiente Güte". Acts 11:26 says the disciples were "durch göttliche Vorsehung" called Christians. The characters say "du" to one another, as people do in the German Bible. German text uses „ and “ for quotation marks.
- A translation says what the English line says, no more and no less. Paul never lies in any language, and the dialogue choices keep their order, so every walkthrough holds in every language.
- In code, write player-visible text in English and let the engine translate it as it is shown (`say`, `choose`, names, the tablets, the map). A line put together from parts is a template, such as `T('It still needs {list}.', {list})`, so that each language can word it in its own order. Never let the story's logic compare translated text.
- Names in the status line ("Use awl with torn awning") stand without an article. In a language with cases, choose names that read correctly after every verb, such as German compounds ("Vorratskorb (verstärkt)", not "verstärkter Korb").
- A speaking figure's mouth follows the words that stand on the screen, read as they are shown in the player's language: a level gives no data for it, and a translation needs none. Never time a mouth, a head or a hand by the English text of a line that is shown in another language.
- A line that is sung is written as its notes, syllable by syllable, each with the vowel of its syllable. The singer's mouth follows those notes. The vowels and the rhythm follow the words on the screen, so they are language data: each language gives its own under the same key, as it gives the line itself, and the playtest checks that it does.
- Check every changed scene in each language: German is longer than English, and text must not overflow its box or cross a line on the map.

## 9. License

- The game is not open source. [LICENSE](LICENSE) lets people play it, download it to play on their own devices, read its code, change their own copy for private use and propose changes to this repository; it does not let them publish, host or sell a copy or a changed version, or use the name "Paul of Tarsus" for another game.
- A fork is only for preparing a pull request to this repository. It is not published as a website, for example with GitHub Pages.
- Whoever proposes a change grants the maintainer the right to use, change, publish and relicense it (LICENSE, section 3). Do not propose anything you have no right to give.
- Code contributed under the MIT License before 18 November 2026 keeps its MIT notice in LICENSE.
