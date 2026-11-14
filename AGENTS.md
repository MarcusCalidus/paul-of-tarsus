# Notes for AI coding assistants

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing anything. Its rules bind every change, including rules the person you are working for did not mention.

- Look up every Bible verse in the New World Translation of the Holy Scriptures (Study Edition) on [wol.jw.org](https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty) before writing it, and check every historical detail on jw.org or wol.jw.org. If you cannot reach those sites, stop and say so; never fall back on memory.
- The game is in English and German (CONTRIBUTING section 8). Add every new line in both. Quote German verses from the German Study Edition on [wol.jw.org](https://wol.jw.org/de/wol/binav/r10/lp-x/nwtsty), never from your own translation of the English.
- When the maintainer states a new rule, add it to CONTRIBUTING.md in the same change.
- Before calling work done, run `node tools/playtest.mjs` and look at screenshots of every changed scene, including a check for accidental cross shapes.
- Commit tested work. Do not push unless asked: a push to `main` publishes the game.
