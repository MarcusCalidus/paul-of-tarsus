# Larger heads: the trial, and the whole cast

The maintainer found the heads of the figures too small and wanted the proportions of the adventure sprites of the early 1990s. This page is the record of the trial on the branch `paul-proportions`: Paul in eight builds (round one), Lydia in the build that was chosen (round two), and then every person of the game in it (round three, at the top). Everything is painted by the game's own figure painter; every head is a pixel map drawn by hand at its own size, not a smaller head enlarged.

## Round three: everyone in build E

Build E is now the painter's one build: a head 15 units wide on a figure that keeps its height of 92, with legs, trunk and arms two rows shorter each, so that a figure stands about five heads tall. All 247 looks of the twelve chapters are painted in it, the statues of Athens too, since the same painter makes them.

Before:

![The cast as it was](cast-before.png)

After:

![The cast in build E](../screenshots/cast.png)

![Eight heads, eight times enlarged](../screenshots/cast-closeup.png)

The people who grow older from chapter to chapter:

![The same people, years apart](../screenshots/ages.png)

### Before and after, in the game

The same place in the same scene, twice enlarged: on the left as it was, on the right in build E.

![By the river at Philippi](pair-lydia.png)

![On the Areopagus](pair-areopagus.png)

![In the synagogue of Thessalonica](pair-synagogue10.png)

![The magistrates of Philippi and their constables](pair-magistrates.png)

![On the plateau of Phrygia](pair-plateau.png)

### In the game

Every picture in [docs/screenshots](../screenshots) was taken again; the chapter pages ([One](../chapter-1.md) to [Twelve](../chapter-12.md)) show them in their place. A few of them:

![The tentmaker's workshop of Chapter One](../screenshots/workshop.png)

![By the river at Philippi](../screenshots/lydia.png)

![The jailer of Philippi](../screenshots/jailer.png)

![The synagogue of Thessalonica](../screenshots/synagogue10.png)

![The Areopagus](../screenshots/areopagus.png)

![The street of Corinth](../screenshots/corinth.png)

![Before the judgment seat](../screenshots/judgment-seat.png)

### Every look, chapter by chapter

Three times enlarged, under the name the chapter's file gives it.

![Chapter One](cast-1.png)
![Chapter Two](cast-2.png)
![Chapter Three](cast-3.png)
![Chapter Four](cast-4.png)
![Chapter Five](cast-5.png)
![Chapter Six](cast-6.png)
![Chapter Seven](cast-7.png)
![Chapter Eight](cast-8.png)
![Chapter Nine](cast-9.png)
![Chapter Ten](cast-10.png)
![Chapter Eleven](cast-11.png)
![Chapter Twelve](cast-12.png)

### Every kind of head

Eight times enlarged: plain, speaking, bowed and facing left.

![Every kind of head](cast-heads.png)

## Round two: Lydia in build E

The maintainer chose E. To see how a woman looks in it, Lydia of Chapter Eight is drawn as she is today (A) and in build E, with a face and a veil drawn by hand at the larger size. The Paul of that chapter stands beside her in the same build.

![Lydia and Paul by the river at Philippi](11-river.png)

![Lydia and Paul side by side](8-lydia.png)

![Lydia's head](9-lydia-head.png)

![Lydia's poses](10-lydia-poses.png)

## Round one: Paul in eight builds

A is the figure as it was, and the others give Paul a larger head.

| | Head | Body | Height | Heads tall |
|---|---|---|---|---|
| **A** | 11 wide, as it is now | as it is now | 92 | 6.1 |
| **B** | 13 wide | unchanged, so he stands 2 rows taller | 94 | 5.5 |
| **C** | 13 wide | legs and trunk one row shorter each | 92 | 5.4 |
| **D** | 15 wide | unchanged, so he stands 4 rows taller | 96 | 5.1 |
| **E** | 15 wide | legs and trunk two rows shorter each | 92 | 4.8 |
| **F** | 15 wide | the trunk kept, the legs shorter: a stockier man | 92 | 4.8 |
| **G** | 15 wide | as F, with shoulders, trunk and skirt a pixel broader on each side | 92 | 4.8 |
| **H** | 17 wide | legs and trunk three rows shorter each | 92 | 4.2 |

### In the street of Corinth, close by

The Paul of Chapters Seven to Twelve, with the same wall and door behind each build.

![Close by in the street of Corinth](7-street-close.png)

### The line-up

Four times enlarged. The small red notch at the left of each field marks the height of today's figure.

![The young Paul of Chapters One and Two](1-young.png)

![The Paul of Chapters Seven to Twelve](2-older.png)

### The heads

Eight times enlarged.

![The heads](3-heads.png)

### As the game shows them

The whole width of the screen, all eight in a row.

![The street of Corinth](5-street.png)

![The same street with the young Paul](6-street-young.png)

### The poses

Standing, the two steps of the walk, speaking with the hand raised, the head bowed in prayer, and facing left.

![The poses](4-poses.png)

## Making the sheets again

`node tools/playtest.mjs cast` saves the sheets of round three to `tools/out/` (`cast-1.png` to `cast-12.png`, `cast-heads.png`, and `cast-main.png` and `cast-closeup.png`, which are kept in `docs/screenshots` as `cast.png` and `cast-closeup.png`). The sheets of rounds one and two were made by a stop of the trial, `proportions`, which went when the choice was made; it and the other builds are in the history of this branch (commit 3ef0aa1).
