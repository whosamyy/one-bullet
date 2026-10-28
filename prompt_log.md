# Prompt log

## Phase 1 implementation request

AI tool: OpenAI Codex
Model: GPT-6 (as identified by the session; exact backend model identifier unavailable)

User prompt (verbatim):

```text
# Context from my IDE setup:

## Active file: SPEC.md

## Open tabs:
- SPEC.md: SPEC.md

## My request:
Read `SPEC.md` first. Treat it as the source of truth for the game and do not invent features that are not in the spec.

I am in the 45-minute Phase 1 build period for CMU 15-114 HW7. I am NOT supposed to finish the game today. My goal is to leave behind a clean, runnable foundation that another student can extend.

For this first implementation step, build ONLY the basic structure and the central One Bullet gameplay loop.

Focus on:

1. Create a clean project structure with small, understandable files/modules instead of putting everything in one huge file.
2. Create a basic playable game window/arena.
3. Implement player movement using the controls specified in `SPEC.md`.
4. Implement the core one-bullet mechanic:
   - the player starts with exactly one bullet
   - the player can fire it
   - while the bullet is away, the player cannot fire another one
   - after the bullet stops/lands, the player can physically move to it and retrieve it
   - retrieving it allows the player to shoot again
5. Add only the minimum collision/boundary behavior needed for that loop to work.

Do NOT implement the full game yet.

Specifically, do NOT rush ahead and complete:

- the full enemy system
- difficulty progression
- all scoring/combo systems
- all special bullet abilities
- polished graphics
- menus
- game-over polish
- stretch features

unless one of those is absolutely necessary for the basic core loop to run.

Important:

- Keep the code easy for another student to inherit.
- Use descriptive names.
- Split responsibilities into sensible files/classes/functions.
- Add short comments only where the reasoning is not obvious.
- Leave clear `TODO:` comments at natural extension points for features from `SPEC.md` that are intentionally not implemented yet.
- Do not rewrite or modify `SPEC.md`.
- Do not claim unimplemented features work.
- Do not commit or push.

Also create or append to `prompt_log.md` and include THIS PROMPT VERBATIM, along with the AI tool/model being used.

After implementation:

1. Run the game.
2. Verify player movement works.
3. Verify the player can fire exactly one bullet.
4. Verify another shot cannot be fired until the bullet is retrieved.
5. Verify retrieving the bullet allows another shot.
6. Tell me which acceptance criteria from `SPEC.md` are fully met, partially met, or still untouched.
7. Show me the files you created/changed.
8. Tell me the exact command to run the game.
9. STOP.

Do not continue with additional game features after the core loop is working.
```

User clarification (verbatim):

```text
Use these controls and stopping rule
```

Approved choices: WASD/arrow-key movement, left click toward cursor to fire,
bullet stops at the first arena wall. SPEC.md remains unchanged.
