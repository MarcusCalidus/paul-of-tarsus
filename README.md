# Paul of Tarsus: On the Roads of Rome

A browser point-and-click adventure in the style of early-1990s verb-and-inventory adventure games. You play Saul of Tarsus, later known as the apostle Paul, a tentmaker who gets out of tight spots with his trade, his brothers and prayer rather than with force.

There are twelve chapters so far, in English and German. The game is a small engine in `index.html` plus one level file per chapter in `levels/`, loaded only when that chapter is played. There are no image or audio files: every backdrop, character and icon is painted in code on a canvas, and all music, ambience and sound effects are synthesized with the Web Audio API.

![Title screen](docs/screenshots/title.png)

## Play

**Play online: https://paul-of-tarsus.theunknownones.net/**

Or download this repository and open `index.html` in any current desktop browser (keep the `levels` folder next to it). Pick a chapter on the title screen (scroll the list for the later ones); the game saves your place by itself, so next time the title screen offers to continue. Nothing to install or build.

The online version is served by GitHub Pages straight from the root of the `main` branch. In a current browser it can be installed as an app ("Install" in Chrome and Edge, "Add to Home Screen" on iPhone and iPad), and once it has loaded it plays without a connection.

## Chapters

Each chapter has its own page with screenshots, a walkthrough, its music and map, and what is invented in it.

1. [Chapter One: Escape from Damascus](docs/chapter-1.md)
2. [Chapter Two: A Friend in Jerusalem](docs/chapter-2.md)
3. [Chapter Three: Called to Antioch](docs/chapter-3.md)
4. [Chapter Four: Sent Out to Cyprus](docs/chapter-4.md)
5. [Chapter Five: A Light of Nations](docs/chapter-5.md)
6. [Chapter Six: The Door to Faith](docs/chapter-6.md)
7. [Chapter Seven: Timothy of Lystra](docs/chapter-7.md)
8. [Chapter Eight: The Man from Macedonia](docs/chapter-8.md)
9. [Chapter Nine: Midnight in Philippi](docs/chapter-9.md)
10. [Chapter Ten: Is It So?](docs/chapter-10.md)
11. [Chapter Eleven: The Unknown God](docs/chapter-11.md)
12. [Chapter Twelve: Tentmakers of Corinth](docs/chapter-12.md)

## How to play

Point at something and click: its usual verb lights up. Use the verbs, the inventory and the blue **Pray to Jehovah** button (the hint system) to get Paul out of trouble with his trade, his brothers and prayer. The game saves your place by itself and shows a safe-point code in the top bar. Everything is in [How to play](docs/how-to-play.md): the controls, languages, prayer, safe-point codes. How the game looks and sounds is in [Look and sound](docs/look-and-sound.md).

![Pointing at Eliab lights Talk to](docs/screenshots/verbs.png)

## About the content

The game follows the scriptural understanding of Jehovah's Witnesses and the New World Translation of the Holy Scriptures (Study Edition); the German version follows the German edition, the *Neue-Welt-Übersetzung der Heiligen Schrift (Studienausgabe)*. Verses are told in the game's own words with their references, and no text, artwork or other material of jw.org is reproduced. Historical details are checked by hand against jw.org and wol.jw.org. Paul is shown as a courageous, observant minister who relies on practical wisdom, cooperation with fellow believers and trust in Jehovah. There are no halos, crosses or mystical effects, and no puzzle is solved by a miracle or by violence.

The events themselves are from the Scriptures. All dialogue is imaginative dramatization, including the words given to Barnabas, Cephas, James, Agabus, Lucius, John Mark, Sergius Paulus, Bar-Jesus, Timothy, Eunice, Lois, Jason, Dionysius, Damaris, Aquila, Priscilla, Titius Justus, Crispus, Stephanas, Gaius, the man who was lame and the priest of Zeus. Where a chapter shows somebody whom Acts does not name at that place (Stephanas and Gaius in Corinth, who are known from 1 Corinthians 1:14, 16), its page and its end screen say so. The supporting characters are invented too. Each chapter's page has an "About the content" section that says what the account leaves unsaid, what is invented and which publications the details come from, and each chapter's end screen says so too:

- [Chapter One: Escape from Damascus](docs/chapter-1.md#about-the-content)
- [Chapter Two: A Friend in Jerusalem](docs/chapter-2.md#about-the-content)
- [Chapter Three: Called to Antioch](docs/chapter-3.md#about-the-content)
- [Chapter Four: Sent Out to Cyprus](docs/chapter-4.md#about-the-content)
- [Chapter Five: A Light of Nations](docs/chapter-5.md#about-the-content)
- [Chapter Six: The Door to Faith](docs/chapter-6.md#about-the-content)
- [Chapter Seven: Timothy of Lystra](docs/chapter-7.md#about-the-content)
- [Chapter Eight: The Man from Macedonia](docs/chapter-8.md#about-the-content)
- [Chapter Nine: Midnight in Philippi](docs/chapter-9.md#about-the-content)
- [Chapter Ten: Is It So?](docs/chapter-10.md#about-the-content)
- [Chapter Eleven: The Unknown God](docs/chapter-11.md#about-the-content)
- [Chapter Twelve: Tentmakers of Corinth](docs/chapter-12.md#about-the-content)

This is an independent, non-commercial fan project. It is not produced, endorsed or reviewed by Jehovah's Witnesses or the Watch Tower Bible and Tract Society, and it is not affiliated with jw.org. It contains no material from jw.org or its subdomains; it only refers to them as sources that its authors read. Their [Terms of Use](https://www.jw.org/en/terms-of-use/) apply to their content.

## Development

There is no build step: `index.html` is the engine and `levels/chapterN.js` holds one chapter each. `node tools/playtest.mjs` (Node 22 or newer and Google Chrome) plays every chapter in both languages and must pass. The layout of the code, the playtest stops and the rest are in [Development](docs/development.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing the game. It holds the rules every change must follow: Bible accounts told in your own words and checked against the New World Translation (Study Edition), historical details checked against jw.org and wol.jw.org without copying anything from them, no violence, deceit or miracle shortcuts, no crosses, and the art, audio, code and save-code rules. AI coding assistants find them through [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md).

## Credits

Design, code, art and music by Marco Warm, built with Claude.

## License

Copyright © 2026 Marco Warm. All rights reserved. The source is public, but the game is not open source: you may play it, download it to play on your own devices, read its code, change your own copy for private use and propose changes as pull requests, but not publish, host or sell a copy or a changed version, or use its name for another game. Contributions are made under the terms in [LICENSE](LICENSE). Versions released before 18 November 2026 were under the MIT License.
