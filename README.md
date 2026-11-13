# Paul of Tarsus: The Roman Road Runner

A browser point-and-click adventure in the style of early-1990s verb-and-inventory adventure games. You play Saul of Tarsus, later known as the apostle Paul, a tentmaker who gets out of tight spots with his trade, his brothers and prayer rather than with force.

The whole game is one self-contained `index.html`. There are no image or audio files: every picture is drawn in code on a canvas and all music and sound effects are synthesized with the Web Audio API.

![Title screen](docs/screenshots/title.png)

## Play

Open `index.html` in any current desktop browser. Nothing to install or build.

To put it online, push this repository to GitHub and enable GitHub Pages for the main branch; the game is served straight from the repository root.

## Chapter One: Escape from Damascus

Damascus, about 36 C.E. Opposers have plotted to do away with Saul, and the governor under King Aretas has the city gates watched day and night. The brothers have a plan: lower him by night in a basket from a window in the city wall (Acts 9:23-25; 2 Corinthians 11:32, 33). The basket is frayed, the rope is too short, and a soldier is watching the alley to the wall.

| | |
|---|---|
| ![Eliab's workshop](docs/screenshots/workshop.png) | ![The guarded street](docs/screenshots/guard.png) |
| Eliab's workshop: gather what a tentmaker needs | The street: a soldier of the ethnarch bars the alley |
| ![Naomi's upper room](docs/screenshots/house.png) | ![Lowered in a basket](docs/screenshots/descent.png) |
| Naomi's room on the wall: no light may show | By night, through an opening in the wall |

Three connected locations, five characters to talk to, and a puzzle chain built on Paul's trade: cutting and braiding goat-hair cloth, splicing rope, mending an awning, reinforcing a basket.

<details>
<summary>Walkthrough (spoilers)</summary>

1. Open the tool pouch. Pick up the thread, knife, cloth, rope and basket in the workshop.
2. Use the knife with the cloth, then the cloth strips with the rope.
3. In the street, talk to the merchant. Use the awl on his torn awning; he gives you leather straps and hangs the awning.
4. Use the straps with the basket.
5. Walk into the alley behind the awning.
6. In Naomi's room: use the lamp, open the shutters, use the long rope with the roof beam, use the basket with the window.

Optional: fill the waterskin at the well and give the guard a drink.
</details>

## How to play

| Action | How |
|---|---|
| Walk, look, talk, use an exit | Click in the scene |
| Use a verb | Click **Look at**, **Pick up**, **Use**, **Open**, **Talk to** or **Give**, then the target |
| Combine things | **Use**, then an inventory item, then another item or something in the scene |
| Skip a line of dialogue | Click the scene or press Space |
| Keyboard | `1`-`6` verbs, `P` pray, `M` mute |

### Pray to Jehovah

The blue button is the hint system. Paul pauses, bows his head and prays for wisdom and a calm heart (James 1:5; Proverbs 3:5, 6). Prayer never solves a puzzle or changes the game. It clears his mind, and he then has a thought that points toward the next practical step. Praying again at the same point gives a more direct thought.

![Praying for wisdom](docs/screenshots/pray.png)

### Safe-point codes

The top bar always shows a six-character code for exactly where you are. Write it down, and enter it later with **ENTER CODE** on the title screen (or the code button during play) to return to the same room with the same inventory and progress. Any moment outside a cutscene is a safe point.

![Safe-point code](docs/screenshots/code.png)

## About the content

The game follows the scriptural understanding of Jehovah's Witnesses and the wording of the New World Translation. Paul is shown as a courageous, observant minister who relies on practical wisdom, cooperation with fellow believers and trust in Jehovah. There are no halos, crosses or mystical effects, and no puzzle is solved by a miracle or by violence.

The escape itself is from the Scriptures. Supporting characters (Eliab, Naomi, Jesse, the merchant Zakkai, the guard) and all dialogue are imaginative dramatization.

This is an independent, non-commercial fan project. It is not produced, endorsed or reviewed by Jehovah's Witnesses or the Watch Tower Bible and Tract Society.

## Roadmap

- **Chapter Two: A Friend in Jerusalem** (Acts 9:26-30), in development. The disciples in Jerusalem are afraid of Saul, until Barnabas comes to his aid.

## Development

Everything lives in `index.html`: styles, engine, art, audio, rooms and dialogue. Edit it and reload.

`tools/playtest.mjs` plays the game through the real interface in headless Chrome and checks each puzzle step, the save codes and the ending. It needs Node 22 or newer and Google Chrome.

```bash
node tools/playtest.mjs
```

Pass stop names to save screenshots to `tools/out/` instead, for example `node tools/playtest.mjs title workshop guard`. The stop names are defined in `tools/playtest-harness.html`.

## Credits

Design, code, art and music by Marco Warm, built with Claude.

Copyright © 2026 Marco Warm.
