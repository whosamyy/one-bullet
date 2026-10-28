# One Bullet — Phase 1

A deliberately small foundation for the shoot → retrieve → shoot loop.
`SPEC.md` is the source of truth and has not been changed.

## Run

From this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000 in a browser. No third-party packages are required.
Stop the server with Ctrl+C.

## Agreed Phase 1 rules

These choices were approved in chat because SPEC.md leaves them undecided:

- WASD or arrow keys move the player. Diagonal movement has the same speed.
- Left click inside the arena fires toward the cursor.
- The single bullet stops at the first wall and stays there.
- Touching a stopped bullet retrieves it. A traveling bullet cannot be picked up.
- The player stays inside the arena; the bullet is reachable at every wall.

Blue circle: player. Yellow circle: the same bullet, shown at the player's
center while held. The status line explains when shooting is available.
Clicking exactly at the player's center has no direction and does not fire.

## Files and extension points

- `index.html`, `style.css`: page and arena presentation.
- `src/main.js`: animation loop and status text.
- `src/input.js`: keyboard and mouse input.
- `src/game.js`: coordinates simulation; TODOs for the remaining spec features.
- `src/player.js`: movement and arena boundaries.
- `src/bullet.js`: held/traveling/stopped state and retrieval.
- `src/render.js`: canvas drawing.
- `tests/game.test.js`: core-loop invariants and boundary tests.
- `prompt_log.md`: original prompt and approved choices.

The model modules do not depend on the DOM, so future students can test or
extend them independently of input and drawing. There is exactly one Bullet
instance per Game; firing and retrieving change its state instead of creating
new bullets.

## Validation

Run model tests with Node.js (no npm install needed):

```sh
node --test
```

Browser checks exercise WASD/arrows, firing, repeated-click lockout while
traveling and stopped, physical pickup, and repeated pickup/refiring.

## SPEC.md acceptance criteria

| Criteria | Status | Phase 1 scope |
| --- | --- | --- |
| 1–6 | Fully met | Approved controls, one bullet, firing lockout, first-wall stop, touch retrieval. |
| 7 | Partially met | Repeated shoot/retrieve/shoot works with the same object; survival against enemies is deferred. |
| 8–13 | Untouched | Enemy spawning/chasing/kills, health, damage, scoring, and game over are intentionally deferred. |

Health, damage, points per kill, and bullet interactions with enemies still need
to be decided before those systems are implemented. No extra abilities,
progression, menus, or stretch features have been added.

## Next Steps

1. Add enemies that spawn and chase the player.
2. Implement bullet-enemy collisions and enemy deaths.
3. Add player health and damage from enemies.
4. Implement scoring and game over.
5. Add remaining features from SPEC.md if time allows.

## Known Bugs and Limitations

No known bugs in the core bullet loop from current testing.

Enemy interactions, health, scoring, and game over
have not been implemented yet.

The game has only been tested in Chrome.

## Shortcuts Taken

I kept the graphics basic and focused on the player
movement and bullet retrieval loop because of the
limited Phase 1 time.

I also left the enemy and scoring systems unfinished
so my partner can build on the existing structure.