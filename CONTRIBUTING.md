# Contributing

Paul of Tarsus is a Bible-based adventure meant to be suitable for Jehovah's Witness families. The rules below apply to everyone who changes it: the maintainer, contributors, anyone who forks the game to improve it, and AI coding assistants working in this repository. When a new rule is agreed, it is added to this file in the same change.

## 1. Scripture and history

### The Bible text

- Every Bible quotation, paraphrase and reference uses the **New World Translation of the Holy Scriptures (Study Edition)**, on [jw.org](https://www.jw.org/en/library/bible/study-bible/books/) or in the [Watchtower Online Library](https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty).
- Look up every verse there before you write it. Do not quote from memory, from another translation, or from another edition of the New World Translation.
- Quote briefly and exactly. Prefer a short paraphrase with its reference to a long quotation. A paraphrase must not say more or less than the verse does. Never invent a quotation, or present a paraphrase as one.
- If you cannot check a verse's exact wording, give the reference only, and list it for the maintainer to check.
- Give the reference with the line it belongs to, for example "(James 1:5)", or on the chapter's end screen.

### Historical information

- Check dates, places, routes, distances, people, offices, customs, trades, clothing, buildings and money against [jw.org](https://www.jw.org) or [wol.jw.org](https://wol.jw.org): the Study Edition's notes, media and maps, *Insight on the Scriptures*, and the other publications there.
- Where those sources are silent, a detail may be invented, but it must be plausible and must not contradict them. For example, the Scriptures say nothing of how the relief in Chapter Three was packed and counted, so those details are invented.
- If you cannot verify something, leave it out or ask the maintainer. In a pull request, list what you checked and where.

### Understanding and wording

- Follow the scriptural understanding of Jehovah's Witnesses. Use "Jehovah", "C.E." and "B.C.E.", "the congregation" and "the brothers".
- Watch for details that are easy to get wrong. Acts 11:26 says the disciples were called Christians "by divine providence", so the name must not be presented as a nickname coined by outsiders.
- Use jw.org and wol.jw.org to check facts only. Do not copy their artwork, photographs, maps or publication text into the game.

## 2. Story and puzzles

- Paul gets out of trouble with his trade, cooperation with fellow believers, honesty, practical wisdom and trust in Jehovah. No puzzle is solved by violence, deceit or a miracle used as a shortcut.
- Paul never lies. That includes every dialogue choice offered to the player: a wrong choice may be unwise, but never untrue.
- **Pray to Jehovah** is the hint system. It never changes the game's state. The first prayer at a point gives a gentle hint, and praying again gives a more direct one.
- Invented characters and all dialogue are dramatization. Each chapter's end screen says so, and the README's "About the content" section names the invented characters.
- Before building a new chapter, agree on its episode with the maintainer by opening an issue.

## 3. Images and symbols

- No halos, crosses, mystical effects or pagan symbols.
- This includes cross shapes that appear by accident in pixel art. Watch for:
  - a tiny ellipse one pixel high, which rasterizes as a plus sign;
  - a vertical line over a horizontal band, such as rope lashings or yarn skeins;
  - grid lines or map lines that meet at right angles, and route lines on a map that cross each other;
  - a label or text laid across a thin line, such as a lake, river or coast;
  - "+" or "x" markers, and cross-shaped cursors or highlights.
- Look at screenshots of every changed scene before committing.

## 4. Look and sound

- Backdrops are painted in the manner of early-1990s VGA adventure games: painterly and detailed, with depth and real lighting. The scenes are our own. Never copy another game's art, characters or music.
- Characters are pixel-placed sprites drawn to the same standard as the backdrops: three-quarter view, crisp hand-placed pixels, flat bands of light and shadow, no outline, and lit by the room they stand in. Dress and head coverings fit the period, the place and the person.
- There are no image or audio files. Everything is painted in code on a canvas, and all music and sound are synthesized with the Web Audio API.
- Each chapter has its own score, and each room has a mood and ambience to match.
- Sound follows the player's device. On iPhone and iPad the game stays quiet in Silent Mode; never work around it (no HTML audio element, no `playback` audio session). The game may say that Silent Mode could be on, but it must not claim to know: Safari does not tell a page.

## 5. Code

- `index.html` is the engine. Each chapter is one file, `levels/chapterN.js`, loaded only when that chapter is played. It holds the chapter's music, artwork, cast, items, rooms, dialog, cutscenes and prayer hints. A new chapter adds its file and one line to the `CHAP` manifest. Anything shared between chapters goes in its own file, also loaded on demand, not in a chapter file or the engine.
- The game must keep running when `index.html` is opened straight from disk: no build step, no server and no dependencies.
- Safe-point codes are a promise to players. Every code that works today must keep working. If a change needs more state, add a new code format that the decoder can tell apart from the old one. Never reorder a chapter's `flags`, `rooms` or `share`; only append to them, within the widths the code format reserves.

## 6. Testing and documentation

- `node tools/playtest.mjs` must pass (it needs Node 22 or newer and Google Chrome). Extend it for every new puzzle step or feature.
- Add a stop to `tools/playtest-harness.html` for every new scene or feature, and look at its screenshot.
- Keep the README current: the walkthroughs, "How to play", "About the content", the "Development" section and the screenshots. Every new feature gets a screenshot in `docs/screenshots/`.

## 7. Publishing

GitHub Pages serves the game from the root of `main`, so a push to `main` publishes it. Push only changes that have been tested.

## 8. Languages

The game is written in English and plays in German too. The English text stays in the code; every other language is data under `lang/`, one folder per language.

- New or changed player-visible text must be added in every supported language in the same change. Changing an English line changes its key: change the entry in every language file with it. The playtest fails on a line that has no translation and on a translation whose English line is gone.
- Every rule in section 1 applies in each language. German Bible quotations come from the German New World Translation, Study Edition ("Neue-Welt-Übersetzung der Heiligen Schrift – Studienausgabe"), on [wol.jw.org](https://wol.jw.org/de/wol/binav/r10/lp-x/nwtsty) or [jw.org/de](https://www.jw.org/de/bibliothek/bibel/studienbibel/buecher/). Look up each verse there before you write it. Never translate an English verse yourself: a verse in another language is always quoted from that language's Study Edition. If you cannot check a verse's exact wording, give the reference only and list it for the maintainer.
- References use the language's own book names and style, such as "(Apostelgeschichte 9:25)" or "(5. Mose 21:23)". Names of people and places follow that language's Study Edition, without the marks that show stress: Saulus, Paulus, Kephas, Jakobus, Stephanus, Damaskus, Cäsarea, Antiochia. Invented characters with a Bible name take its spelling there too (Noomi, Isai, Sakkai).
- In German, use the terms Jehovah's Witnesses use: "Jehova", "u. Z." and "v. u. Z.", "die Versammlung", "die Brüder", "unverdiente Güte". Acts 11:26 says the disciples were "durch göttliche Vorsehung" called Christians. The characters say "du" to one another, as people do in the German Bible. German text uses „ and “ for quotation marks.
- A translation says what the English line says, no more and no less. Paul never lies in any language, and the dialogue choices keep their order, so every walkthrough holds in every language.
- In code, write player-visible text in English and let the engine translate it as it is shown (`say`, `choose`, names, the tablets, the map). A line put together from parts is a template, such as `T('It still needs {list}.', {list})`, so that each language can word it in its own order. Never let the story's logic compare translated text.
- Names in the status line ("Use awl with torn awning") stand without an article. In a language with cases, choose names that read correctly after every verb, such as German compounds ("Vorratskorb (verstärkt)", not "verstärkter Korb").
- Check every changed scene in each language: German is longer than English, and text must not overflow its box or cross a line on the map.
