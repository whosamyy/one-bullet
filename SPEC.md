# One Bullet

## 1. Game Overview

One Bullet is an arena survival game where the player has exactly one bullet. Enemies keep appearing and chase the player, who moves around the arena and shoots enemies to earn points.

The main loop is shoot → survive → retrieve → shoot again. After firing, the player has to wait for the bullet to stop and then physically touch it to pick it up. They cannot shoot again until they retrieve that same bullet.

Retrieving the bullet is the central mechanic because every shot leaves the player without a way to shoot until they reach it again. The fun should come from deciding when to fire and figuring out how to reach the bullet while enemies are chasing them. The game ends when the player runs out of health.

## 2. Full Feature Set

### Core Features

- An arena that the player can move around in.
- Exactly one bullet, which is either held by the player, traveling through the arena, or stopped and waiting to be retrieved.
- Firing sends the held bullet through the arena. The player cannot fire while it is traveling or waiting for pickup.
- The bullet eventually stops. The player retrieves it by touching it after it has stopped, which makes shooting available again.
- Enemies continuously appear and chase the player.
- The player can kill enemies with the bullet and gets points for each enemy killed.
- A health system and a game-over state when health reaches zero.

### Choices Still Needed

The original idea leaves the following choices blank. They need to be settled before implementation, rather than treated as selected features:

- Movement and firing controls.
- Starting health: 1 life or 3 hearts.
- The exact damage rule: which collision causes damage, how much health it removes, and whether continued contact can cause repeated damage.
- What makes the bullet stop, including what happens when it hits a wall or an enemy.
- How many points each enemy is worth.
- Any additional required mechanics. Ricochets, hitting multiple enemies, a dash, and combo bonuses were examples in the prompt, not confirmed choices.
- Any stretch features. None have been selected yet.

## 3. Acceptance Criteria

Criteria that refer to an undecided rule can be fully tested once that choice is filled in above.

1. The player can use the chosen movement controls to move around the arena.
2. The player starts with exactly one bullet available to fire.
3. Using the chosen firing control while holding the bullet sends that bullet through the arena.
4. The player cannot fire another shot while the bullet is traveling or stopped outside their possession.
5. The fired bullet stops according to the chosen bullet collision and stopping rules and remains available for retrieval.
6. Touching the stopped bullet retrieves it and allows the player to fire that same bullet again.
7. The player can complete the shoot → survive → retrieve → shoot-again loop repeatedly without creating additional bullets.
8. Enemies continue to appear during active play and move toward the player.
9. A bullet hit can kill an enemy, and a killed enemy no longer chases or damages the player.
10. The player starts with the selected amount of health: 1 life or 3 hearts.
11. Collisions reduce health only under the selected damage rule, by the selected amount, with repeated contact handled according to that rule.
12. Killing an enemy increases the score by the chosen point value exactly once for that enemy.
13. When the player's health reaches zero, the game enters a game-over state and active gameplay ends.

## 4. Priorities

### Must Have

- Player movement around the arena.
- One bullet that can be fired, stops, and can be retrieved by touch.
- Shooting locked until that same bullet is retrieved.
- Continuously appearing enemies that chase the player and can be killed.
- A defined collision and damage rule, starting health, and game over at zero health.
- Points for killing enemies.

The one-bullet shoot → survive → retrieve → shoot-again loop comes first. The open choices above need to be resolved so these features have clear rules.

### Should Have

- No additional features selected yet. Any later choices in this category should support the core loop.

### Stretch / Cut First

- No stretch features selected yet. If any are added later, they should be cut before the core loop is reduced.
