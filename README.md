# Paul of Tarsus: The Roman Road Runner

A browser point-and-click adventure in the style of early-1990s verb-and-inventory adventure games. You play Saul of Tarsus, later known as the apostle Paul, a tentmaker who gets out of tight spots with his trade, his brothers and prayer rather than with force.

There are four chapters so far, in English and German. The game is a small engine in `index.html` plus one level file per chapter in `levels/`, loaded only when that chapter is played. There are no image or audio files: every backdrop, character and icon is painted in code on a canvas, and all music, ambience and sound effects are synthesized with the Web Audio API.

![Title screen](docs/screenshots/title.png)

## Play

**Play online: https://marcuscalidus.github.io/paul-of-tarsus/**

Or download this repository and open `index.html` in any current desktop browser (keep the `levels` folder next to it). Pick a chapter on the title screen. Nothing to install or build.

The online version is served by GitHub Pages straight from the root of the `main` branch.

## Chapter One: Escape from Damascus

Damascus, about 36 C.E. Opposers have plotted to do away with Saul, and the governor under King Aretas has the city gates watched day and night. The brothers have a plan: lower him by night in a basket from a window in the city wall (Acts 9:23-25; 2 Corinthians 11:32, 33). The basket is frayed, the rope is too short, and a soldier is watching the alley to the wall.

| | |
|---|---|
| ![Eliab's workshop](docs/screenshots/workshop.png) | ![The guarded street](docs/screenshots/guard.png) |
| Eliab's workshop: gather what a tentmaker needs | The street: a soldier of the governor bars the alley |
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

## Chapter Two: A Friend in Jerusalem

Three years after his conversion, Saul returns to Jerusalem and tries to join the disciples, but they are all afraid of him and do not believe he is a disciple. Then Barnabas comes to his aid (Acts 9:26-31; 22:17-21; Galatians 1:18, 19). Later, when a plot forces him to leave, the brothers bring him down to Caesarea, where the only ship bound for Tarsus has a torn sail.

| | |
|---|---|
| ![A street in Jerusalem](docs/screenshots/jerusalem.png) | ![The harbor of Caesarea](docs/screenshots/harbor.png) |
| Jerusalem: a stranger's broken cart, and a closed door | Caesarea: a ship that cannot sail, and a tentmaker who must |

Three more locations and eight new characters. This chapter turns on honesty as much as handiwork: Paul has to give Barnabas a plain account of himself, and the answers that excuse or recommend him get nowhere. Later, speaking boldly in Jerusalem, he disputes with two Greek-speaking Jews and answers them from the passages on his wax tablets; the last objection is about his own part in Stephen's death, and the answer to it is a confession (Acts 9:28, 29; 22:20).

| | |
|---|---|
| ![Paul's wax tablets](docs/screenshots/tablets.png) | ![Disputing with the Greek-speaking Jews](docs/screenshots/dispute.png) |
| The wax tablets: people met, what is still to do, and Scripture | Every answer is a passage from the tablets |

<details>
<summary>Walkthrough (spoilers)</summary>

1. Knock at the door of the house. Talk to the man with the handcart.
2. Pick up the pruned branch under the olive tree and use the knife on it.
3. Use the loose wheel, then use the peg with the handcart.
4. Answer Barnabas honestly: admit the persecution, tell what happened on the road to Damascus, and what happened in Damascus afterwards.
5. Knock at the door again. In the upper room, leave by the door to the city when you are ready.
6. In the street, talk to Dositheus. Answer each objection with a passage from your wax tablets: Isaiah 53:5 for the stake, Psalm 16:10 for the tomb, and Proverbs 28:13 when they ask about Stephen.
7. At the harbor, talk to the captain and use the halyard.
8. Use the knife on the heap of old sailcloth. Give the provisions to the fisherman.
9. Use the awl on the torn sail.
</details>

## Chapter Three: Called to Antioch

Tarsus, about 45 C.E. A great number of Greek-speaking people in Antioch of Syria have become believers, and Barnabas comes to Tarsus to make a thorough search for Saul. For a whole year the two of them teach in the congregation there, where the disciples are first called Christians by divine providence. Then the prophet Agabus foretells a great famine, and the disciples determine to send relief to the brothers in Judea, each according to what he can afford, by the hand of Barnabas and Saul (Acts 11:19-30; 12:25).

| | |
|---|---|
| ![Saul's stall in Tarsus](docs/screenshots/tarsus.png) | ![The courtyard in Antioch](docs/screenshots/antioch.png) |
| Tarsus: Barnabas finds his man, who has a promise to keep first | Antioch: the gifts are in, with weeks of road ahead of them |

Three more locations and five new characters, with Barnabas back at Paul's side, and this time you can play him too. Paul finishes a promised tent before he will leave Tarsus, sews pack bags for the relief, and sees the gift counted and sealed before the brothers. Some work takes both men: Barnabas holds the far edge of the tent while Paul sews, and Theron's jar of oil is a load for two men and a bar, like the grapes of Eshcol (Numbers 13:23). The puzzle about people is a spinner who stays away because she thinks she has nothing to give: pressure and pity both fail with her.

| | |
|---|---|
| ![Playing Barnabas](docs/screenshots/barnabas.png) | ![A load for two men and a bar](docs/screenshots/jar.png) |
| Barnabas holds the far edge; his own inventory holds his staff | Both men at Theron's stall, Barnabas's staff through the handles |

<details>
<summary>Walkthrough (spoilers)</summary>

1. In Tarsus, switch to Barnabas (the **⇄ Barnabas** button beside the prayer, or `C`) and use the tent: he holds the far edge. Switch back to Paul and use the awl on the tent.
2. Use the knife on the leather hide, then the leather loops on the tent.
3. Pick up the finished tent and give it to Kleon. Leave by the east gate.
4. In the courtyard at Antioch, use the knife with the goat-hair cloth.
5. Go out to the street and talk to Xanthe. Tell her that each gives what he can afford, ask what is in her hands, and tell her that the gift has no bags and you have no thread.
6. Use the awl with the cloth panels.
7. Switch to Barnabas, who is still in the courtyard, and walk him out to the street. Use his staff on Theron's oil jar: the two men carry it to the courtyard.
8. As Paul, give your savings to Lucius, and ask for the purse to be counted before the brothers and sealed.
9. Use the pack bags with the donkey.
</details>

## Chapter Four: Sent Out to Cyprus

Antioch, about 47 C.E. As the prophets and teachers of the congregation are ministering to Jehovah and fasting, the holy spirit says: "Set aside for me Barnabas and Saul for the work to which I have called them." They lay their hands on them and send them off. With John Mark as their attendant, the two go down to Seleucia and sail to Cyprus, where Barnabas was born. At Salamis they proclaim the word of God in the synagogues of the Jews. Then they go through the whole island as far as Paphos, where the proconsul Sergius Paulus, an intelligent man, calls for them, and the sorcerer Bar-Jesus, also called Elymas, tries to turn him away from the faith (Acts 13:1-12; 4:36).

| | |
|---|---|
| ![The quay at Seleucia](docs/screenshots/seleucia.png) | ![The crossing to Cyprus](docs/screenshots/voyage.png) |
| Seleucia: a ship for Cyprus, and no roof for her deck | The crossing, under the roof a tentmaker sewed |
| ![The synagogue in Salamis](docs/screenshots/synagogue.png) | ![Before the proconsul in Paphos](docs/screenshots/paphos.png) |
| Salamis: a stranger is welcome to a seat, not to the platform | Paphos: the proconsul asks, and Elymas objects |

Four more locations and seven new characters, and the first chapter in which the travel map is the way from place to place: the gangplank at Seleucia and the west gate of Salamis open it, and a click on a place goes there.

A merchant ship of those days gave its passengers drinking water and nothing else, so Paul sews a shelter for the deck, with a rope in its edge to lash it to the rail. On the quay sits an old disciple of Salamis whom Saul's persecution once drove out of Jerusalem (Acts 8:1-3; 11:19). He has nothing to say to Saul of Tarsus. Barnabas has to speak for his friend first, and then Saul has to say it himself, without an excuse.

On his own island Barnabas is the one who is known. He asks the presiding officer of a synagogue in Salamis for a hearing, and Paul builds his "word of encouragement" in the right order, beginning with what has just been read: the islands keep waiting for his law (Isaiah 42:4). In Paphos, Elymas raises three objections before the proconsul, and each is answered in its own way: one by Barnabas, one by showing Paul's awl, and one from the Scriptures. Then the account takes its course. What happens to Elymas is told as Acts tells it, and it solves no puzzle. From that hearing on the game calls Saul by his Roman name, Paul, as Acts does from chapter 13, verse 9.

| | |
|---|---|
| ![Choosing where to travel](docs/screenshots/travel.png) | ![The talk in the synagogue](docs/screenshots/speech.png) |
| The gangplank opens the map: Salamis lies a day and a night away | A word of encouragement has an order: do not run ahead of the hearers |

<details>
<summary>Walkthrough (spoilers)</summary>

1. At Seleucia, talk to Kallias, the shipmaster by the gangplank.
2. Use the knife on the coil of cord beside the mooring post. Use the awl (or the tarred cord) with the goat-hair cloth.
3. Switch to Barnabas and talk to the old man by the jars. Tell him that you asked the same question once, and then heard Saul out.
4. As Paul, talk to the old man, Jair, and say plainly what you did.
5. Walk up the gangplank, and click Salamis on the map.
6. In Salamis, open the door of the synagogue. Switch to Barnabas and talk to Zadok: let Saul speak after the reading, and test every word by the scroll.
7. As Paul, talk to Zadok. Build the talk in this order: the islands keep waiting; the promise to David; the savior from David's offspring, raised up; forgiveness of sins.
8. Leave by the door and then by the west gate, and click Paphos on the map.
9. In Paphos, switch to Barnabas and talk to the proconsul. As Paul, give the awl to the proconsul to show it. Then answer with Daniel 2:27, 28.
</details>

## Look and sound

The backdrops are painted in the manner of early-1990s VGA adventure games: perspective floors, textured plaster and stone, warm light against cool shadow, a foreground layer that slides past the scene as it scrolls, and a final ordered dither. Rooms are painted at twice the classic 320-pixel resolution. Night scenes and interiors are painted in daylight colors and then multiplied by a light map, so a lamp, a brazier or the moon through a window really lights the room; the same light falls on the characters as they walk through it.

The characters are sprites in the manner of the same era: placed pixel by pixel in a three-quarter view, shaded in flat bands of tone with dark edges on the shadow side instead of an outline. Faces, beards and head coverings are small hand-drawn pixel maps; one figure serves the whole cast through its palette and dress.

![The cast](docs/screenshots/cast.png)

Each chapter ends on a travel map of the eastern Mediterranean, painted the same way: coasts, shallows and mountain ranges, cities as dots, and no grid lines. The road travelled so far is shown, and the chapter's own leg draws itself as a dotted line from city to city, to a short sting on frame drum, harp and ney: Damascus to Jerusalem; Jerusalem to Caesarea and by sea to Tarsus; Tarsus to Antioch, where Paul's missionary journeys would begin. The routes never cross. Where the Scriptures do not say which way he went, the line takes a plausible one: by sea east of Cyprus, by road round the Gulf of Issus, and through the south of Cyprus.

Chapter Four draws the first missionary journey on a map of its own: Antioch to Seleucia, by sea to Salamis, and across the island to Paphos. The earlier roads are left off it, because the sea lane from Caesarea to Tarsus runs between Cyprus and Syria, just where the ship from Seleucia has to pass. In that chapter the map is also how you travel.

![The travel map at the end of Chapter Three](docs/screenshots/map.png)

Each chapter has its own score, and each room its own sounds:

| Chapter | Music | Around you |
|---|---|---|
| Escape from Damascus | Oud, frame drum and ney in D Hijaz; in the watched street only a drone and a heartbeat remain | Crickets, an owl, the soldier's brazier, night wind at the open window |
| A Friend in Jerusalem | Lyre and ney in A Dorian; at the harbor a harp rocks in threes like the swell | Birds and a distant market, then waves, gulls and creaking timbers |
| Called to Antioch | A quick lyre figure, walking bass and reed pipe in G Mixolydian, with claps in the busy street | A tentmakers' row, vine leaves in the courtyard, the fountain and the crowd |
| Sent Out to Cyprus | A harp in E Aeolian that rocks in three, three and two like a hull on a swell, with a ney at sea and a reed pipe in the harbors; before the proconsul only a drone, a slow drum and a few notes of the lyre | Waves, gulls and creaking timbers, a coppersmith's hammer in the market of Salamis, lamps in the synagogue, a brazier in the proconsul's hall |

## How to play

| Action | How |
|---|---|
| Do the obvious thing | Point at something: its usual verb lights up in the panel and shows on the status line (**Open** a door, **Talk to** a person, **Pick up** what can be taken, **Look at** anything else). Click to do it. |
| Use a verb | Click **Look at**, **Pick up**, **Use**, **Open**, **Talk to** or **Give**, then the target |
| Look at something | Right-click it, in the scene or in the inventory. Paul looks from where he stands. |
| Leave a room at once | Double-click an exit to skip the walk to it |
| Show what can be clicked | Hold `Tab`: everything in the room gets a dot and its name |
| Combine things | **Use**, then an inventory item, then another item or something in the scene |
| Play the other man | In Chapters Three and Four, click **⇄ Barnabas** (or **⇄ Paul**) beside the prayer button, or press `C`. Each man has his own inventory, and in Chapter Three he can stand in a different room; the view follows the one you play. **Give** an item to the other when they share a room to hand it over (**Use** on him only shows it). |
| Travel | In Chapter Four the way out of a town opens the travel map. Click a place to go there; `Esc` or a right-click stays. A place the story has not reached yet, or one that lies behind, says why not. |
| Read Paul's notes | Click the **wax tablets** in the inventory (their default verb is **Open**): the people he has met, what is still to be done, and the Scriptures for the chapter. Click or press Space to close them. |
| Show something to someone | **Give** (or **Use**) an item on a person. Everyone has something to say about everything Paul carries, sometimes a clue. Only what someone actually needs changes hands. |
| Ask about what you have learned | Once Paul learns something (a frayed basket, a torn sail, a famine), it appears as a new question when he talks to people in that chapter |
| Skip a line of dialogue | Click the scene or press Space |
| Change the language | Click **English** or **Deutsch** on the title screen, or the **EN**/**DE** button in the top bar at any time |
| Keyboard | `1`-`6` verbs, `P` pray, `M` mute, `Tab` names, `C` switch character |
| Sound | It starts with your first click, tap or key. **♫ SOUND ON** (or `M`) switches it off and on. On iPhone and iPad the game respects Silent Mode, and Safari cannot tell the game whether it is on, so a short note at the top right says where to look when the sound starts and whenever you switch it on. |

![Pointing at Eliab lights Talk to](docs/screenshots/verbs.png)

![Holding Tab names everything in the room](docs/screenshots/hotspots.png)

![On an iPad the game says where Silent Mode is](docs/screenshots/silent.png)

| | |
|---|---|
| ![The guard looks at the long rope](docs/screenshots/show.png) | ![Questions about what Paul has learned](docs/screenshots/topics.png) |
| Showing the long rope to the guard | The fisherman can be asked about Barnabas, the sail and the twine |

### Languages

The game plays in English and in German (Deutsch). It starts in your browser's language and remembers your choice; switch on the title screen or with the **EN**/**DE** button in the top bar, even in the middle of a scene. Only the words change: the puzzles, the answers and their order are the same, so the walkthroughs above hold in German too. A safe-point code works in either language. The German Bible quotations are from the *Neue-Welt-Übersetzung der Heiligen Schrift (Studienausgabe)*, and names follow it: Saulus, Kephas, Jakobus, Damaskus, Antiochia. A link can choose the language with `?lang=de` or `?lang=en`.

![Paul's wax tablets in German, with the Scriptures from the Neue-Welt-Übersetzung](docs/screenshots/deutsch.png)

### Pray to Jehovah

The blue button is the hint system. Paul pauses, bows his head and prays for wisdom and a calm heart (James 1:5; Proverbs 3:5, 6). Prayer never solves a puzzle or changes the game. It clears his mind, and he then has a thought that points toward the next practical step. Praying again at the same point gives a more direct thought.

![Praying for wisdom](docs/screenshots/pray.png)

### Safe-point codes

The top bar always shows a short code for exactly where you are: six characters in Chapter One, and the same with a leading `2-` in Chapter Two. Chapter Three and Chapter Four codes are nine characters (`3-XXX-XXX-XXX`, `4-XXX-XXX-XXX`), because they also remember which man you are playing, where each of them stands and who carries what; six-character Chapter Three codes from before still work. Write it down, and enter it later with **ENTER CODE** on the title screen (or the code button during play) to return to the same room with the same inventory and progress. Any moment outside a cutscene is a safe point.

![Safe-point code](docs/screenshots/code.png)

## About the content

The game follows the scriptural understanding of Jehovah's Witnesses and the wording of the New World Translation of the Holy Scriptures (Study Edition); the German version quotes the German edition, the *Neue-Welt-Übersetzung der Heiligen Schrift (Studienausgabe)*. Historical details are checked against jw.org and wol.jw.org. Paul is shown as a courageous, observant minister who relies on practical wisdom, cooperation with fellow believers and trust in Jehovah. There are no halos, crosses or mystical effects, and no puzzle is solved by a miracle or by violence.

The events themselves are from the Scriptures. All dialogue is imaginative dramatization, including the words given to Barnabas, Cephas, James, Agabus, Lucius, John Mark, Sergius Paulus and Bar-Jesus, and so are the supporting characters: Eliab, Naomi, Jesse, the merchant Zakkai and the guard in Chapter One; Mattan, the captain, the fisherman, the doorkeeper and the two Greek-speaking Jews Dositheus and Ariston in Chapter Two; Kleon, Xanthe and Theron in Chapter Three; the shipmaster Kallias, the old disciple Jair, the presiding officer Zadok and the merchant Philon in Chapter Four. The Scriptures say nothing of how the relief was packed or counted: those details are invented as well.

Chapter Four fills several silences of the account in the same way. Acts does not say where on Cyprus Barnabas was born, what was said in the synagogues of Salamis or how the people there responded, or what Elymas said to turn the proconsul away. The chapter places Barnabas's boyhood in Salamis, keeps the response there small, and gives Elymas three objections of its own. The shelter on the ship's deck rests on what is known of sea travel then: passengers on a merchant ship slept on deck and brought their own food and bedding. The ship has no figurehead, because those commonly showed a god.

This is an independent, non-commercial fan project. It is not produced, endorsed or reviewed by Jehovah's Witnesses or the Watch Tower Bible and Tract Society.

## Development

```
index.html            the engine: layout, paint toolkit, figures, audio sequencer, verbs, inventory, safe-point codes, level loader
levels/chapter1.js    Escape from Damascus
levels/chapter2.js    A Friend in Jerusalem
levels/chapter3.js    Called to Antioch
levels/chapter4.js    Sent Out to Cyprus
shared/tablets.js     Paul's wax tablets, used by every chapter
shared/map.js         the travel map: the journeys between chapters, and travel for a hub chapter
lang/de/              the German text: main.js for the engine and shared files, chapterN.js for each chapter
tools/                headless playtest, and the translation check (strings.mjs)
```

A level file holds everything that belongs to one chapter and nothing else does: its music and ambience, its artwork, its cast and items, its rooms with their hotspots and dialog, its cutscenes and its prayer hints. `index.html` keeps only a manifest with one line per chapter (`CHAP`: name, file, code salt), and fetches a level with a script tag the first time it is needed, so the game still runs when opened straight from disk. To add a chapter, write `levels/chapter5.js` and add its line to the manifest.

Inside a level file:

- **Music and ambience** are plain data. A score names a tempo, a tonic, a mode and a list of tracks (drone, drum pattern, step-sequenced instrument, melody); each track lists the moods it plays in, and each room names its mood (`calm`, `tense`, `hope`) and the sounds around it, for example `amb:{waves:.8,gulls:.6}`. The instruments, drums and ambience voices themselves live in the engine.
- **Sound starts** with the first press anywhere: browsers only allow it inside a click, tap or key press. Any later press wakes it again if the browser held it back or iOS interrupted it (after switching apps or locking the screen). The audio session is `ambient`, so iPhones and iPads keep the game quiet in Silent Mode; on those devices a note (`hush()`) says so, because Safari does not tell a page whether Silent Mode is on.
- **Artwork** is a painter per room: `paint` draws the backdrop once, `fore` an optional foreground layer, `draw` whatever changes with the story (items that can be taken, a sail going up), and `light` says how the room lights the people in it. The painters use the engine's toolkit: `plaster`, `ashlar`, `pave`, `wood`, `vessel`, `foliage`, `lightmap`, `shade` and so on.
- **Rooms and dialog** are tables of hotspots with their lines, and short async scripts for the puzzles and cutscenes. A hotspot's default verb (what a plain click does) is worked out by the engine: a door is opened, another exit is walked to, a person is talked to, something picked up with `take(...)` is picked up, and anything else is looked at. A hotspot can name its own with `def:'use'`, or with a getter when it changes with the story.
- **People** are hotspots with an `actor`. Besides `look` and `talk`, a person has a `give` script for the items that really matter to him (it returns `false` for the rest), a `show` table with his reply to every other item, keyed by item id, and a fallback `show['*']`, all in his own voice. Replies can be a line, a list of lines or a script. Using an item on a person is the same as giving it.
- **Wax tablets** are data too: `TABLETS` holds the chapter's `people` (name and note), `tasks` and `scripture` (reference and exact text), each with an optional condition `if` on the story, and the chapter definition passes it on as `tablets`. The overlay that shows them is `shared/tablets.js`, which the engine loads with `need('tablets')` the first time the tablets are opened. Anything else shared between chapters goes under `shared/` the same way.
- **A party** of playable characters is declared in the chapter definition: `party:['paul','barnabas']`. `P` is always Paul and the scripts use him by name; `PC()` is whoever is being played, and `playAs(P)` hands control back before a cutscene. Each member has his own inventory: `home` says who usually carries an item (`{staff:'barnabas'}`), and `share` lists the items that can change hands. Another member does only what the level writes for him, in `as:{barnabas:{look, use, useWith, give, talk, show}}` on a hotspot or a person; otherwise he answers from his own `def` table, leaves the crafts to Paul (`noCraft`), and describes items in his own words (`ITEMS[id].by.barnabas`).
- **Topics** are what Paul learns in a chapter: `TOPICS` lists them, each with its question and a condition on the flags, for example `{id:'sail',q:"The captain's sail is torn.",if:()=>F.metCapt}`. A person's `ask` table holds his answer to each topic he can be asked about. `talkTree` adds the topics that are open to its own questions, each asked once.

**Text and translations.** All player-visible text is written in English, in the code where it belongs: a look line on its hotspot, a reply in a person's `show` table, a line in a script. The engine translates it as it is shown, with `T(line)`: `say` and `narr`, `choose`, the status line, the Tab labels, the tablets, the map and the overlays all do this, so a level writes plain English and never calls `T` itself, except for a line put together from parts, which it writes as a template: `T('It still needs {list}.',{list})`. The game's logic only ever sees the English, so flags, hotspot names and safe-point codes are the same in every language.

Each other language is a folder under `lang/`: `lang/de/main.js` for the engine and `shared/`, and `lang/de/chapter1.js` and so on, each loaded with its chapter. A file is a table from each English line, exactly as it stands in the code, to its translation:

```js
TEXTS('de',1,{
  "spool of thread":"Garnspule",
  "Waxed thread. Good and strong.":"Gewachster Faden. Gut und stark.",
  ...
});
```

A line with no entry is shown in English. `node tools/strings.mjs --check` (which the playtest runs first) finds the English text in the code and reports every line missing from a language, every entry whose English line has changed or gone, a `{slot}` added in a translation, English book names in a reference, and pronunciation marks copied from the Bible text. Then the playtest plays the whole game in each language and fails on any line that was shown untranslated, and on any text that overflows its box. To add a language: add its line to `LANGS` in `index.html` (`fr:{native:'Français',dir:'lang/fr/'}`), copy `lang/de` to `lang/fr` and replace the translations, quoting every verse from that language's Study Edition. Nothing else in the engine changes.

**The travel map.** `shared/map.js` holds the geography: `PLACES` (each city's longitude and latitude, and the side its name goes on), the coasts, islands, lakes and ranges, and `VIA`, waypoints for legs that should not run straight. A chapter declares the way out of it as `route:[['jerusalem','caesarea','new'],['caesarea','tarsus','new sea']]`, with the earlier legs first and `new` on the ones to draw now, and calls `await journey()` in its ending. Check a new leg against the others: the playtest fails if two routes cross. A name sits on the side its place gives it (`lab`, and `dy` to raise or lower it). Where that side would lie across one of a chapter's routes, the chapter says where the name goes on its own map: `labels:{salamis:{lab:'r',dy:4.2}}`.

**A hub chapter** (Chapter Four is the first) is a chapter whose rooms are places on the map that the player travels between by clicking. It declares them in its definition, by their ids in `shared/map.js`, each with the room it leads to and where Paul stands on arrival:

```js
rooms:['seleucia','salamis','synagogue','paphos'],
places:{
  seleucia:{room:'seleucia',x:300,y:122,dir:-1,if:()=>false,no:'We were sent out, not back.'},
  salamis:{room:'salamis',x:150,y:122,dir:1,if:()=>G.room==='seleucia'},
  paphos:{room:'paphos',x:150,y:124,dir:1,if:()=>G.room==='salamis'&&F.spoke,no:'Paphos lies at the far end of the island.'}},
```

and gives the exits that lead out of town `exit:travel`, or an exit of its own that checks what the story still needs and then calls `travel()`. `travel()` opens the map with those places as dots; hovering lights a name, a click draws the way there and enters that room, and Esc or a right-click stays. A place can say when the way to it is open (`if`) and what the character says when it is not (`no`: a line, a list of lines or a script), and `hide` keeps it off the map. The chapter's `way()` lists the legs already travelled, which the map shows, and its `arrive(to, from)` runs after the journey and before the room appears: it brings the rest of the party along, and may tell of the journey, as the crossing to Salamis is told. A place that is not in `PLACES` yet is added there with its coordinates. A hub chapter will have more than three rooms, so it gets wide codes automatically; if it may grow, it reserves room with `codeBits` from the start.

**Safe-point codes.** A chapter whose state fits in 19 flags and three rooms, with Paul alone, gets the original six-character codes. Any other chapter (a party, more flags, more rooms) gets wide codes of 9, 12 or more characters, always a multiple of three, so the decoder tells the two apart by length. A wide code packs, from the lowest bit: the flags, each member's room, the member being played, and for each item in `share` the member who carries it; then it is masked and checked with 9 bits salted by the chapter, like the short codes. Every field has a fixed width, so a chapter can grow without breaking its codes: room for 19 flags and two bits per room (four rooms), unless the chapter needs more or reserves more with `codeBits:{flags, rooms, share}`. Never reorder a chapter's `flags`, `rooms` or `share`; only append, within those widths.

Edit a file and reload.

`tools/playtest.mjs` plays all four chapters through the real interface in headless Chrome and checks each puzzle step, the save codes and the endings. It needs Node 22 or newer and Google Chrome. Each run asks Chrome for a free debugging port, so several runs can go side by side.

```bash
node tools/playtest.mjs
```

It plays the game once in English and once more in every other language under `lang/`. Pass stop names to save screenshots to `tools/out/` instead, for example `node tools/playtest.mjs title workshop harbor`; put a language in front of a stop to take it in that language: `node tools/playtest.mjs de:title de:tablets`. The stop names are defined in `tools/playtest-harness.html`; Chapter Three stops such as `tarsus`, `court` and `antioch` start that chapter directly, and so do Chapter Four stops such as `seleucia`, `salamis` and `paphos`.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing the game. It holds the rules every change must follow: Bible wording from the New World Translation (Study Edition), historical details checked against jw.org and wol.jw.org, no violence, deceit or miracle shortcuts, no crosses, and the art, audio, code and save-code rules. The same rules apply in a fork. AI coding assistants find them through [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md).

## Credits

Design, code, art and music by Marco Warm, built with Claude.

## License

Copyright © 2026 Marco Warm. Released under the [MIT License](LICENSE).
