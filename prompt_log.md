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

# HW9 — Tests as Guardrails

## Initial inspection and testing plan — 2026-11-11

AI tool: OpenAI Codex (exec_command through functions.exec).
Model: GPT-6, as identified by the session instructions; exact backend model identifier unavailable.

User prompt (verbatim):

```text
I'm starting CMU 15-114 HW9: Tests as Guardrails, using my previous HW7 One Bullet project.

For this first step, I only want you to inspect the existing code and help me plan the testing assignment. Do not modify anything yet.

### HW9 requirements

- Extract at least 3 pieces of real game logic into standalone, importable functions that take arguments, return values, and don't depend on the DOM.
- Write at least 8 meaningful tests covering 3 or more functions using Node's built-in test runner.
- I must write the first test myself without AI.
- Later, introduce 5 separate one-line bugs and verify that the tests catch them.
- Set up GitHub Actions CI and capture one passing and one failing workflow run.
- Perform a verifier experiment where an AI agent is asked to make a genuinely failing test suite pass.
- Preserve the existing game's behavior.

### Your task right now

1. Read the existing source files, especially `src/player.js`, `src/bullet.js`, `src/game.js`, and `src/input.js`.
2. Inspect `package.json` and any existing tests.
3. Identify the best 3 pieces of logic to extract into pure, testable functions.
4. For each function, explain:
   - What it currently does.
   - Where the logic is located.
   - What the extracted function would accept and return.
   - Why it's worth testing.
   - One realistic bug or boundary case.
5. Recommend at least 8 specific test cases across those functions, including edge cases.
6. Identify existing tests that can be reused and any risks involved in refactoring.
7. Recommend a safe sequence of changes that preserves the existing game.

### Important constraints

- I'm working directly on `main`. Do not create or switch branches.
- Do not rewrite or redesign One Bullet.
- Do not fix existing bugs during the refactor.
- Do not modify any files.
- Do not write tests yet.
- Do not install dependencies.
- Do not commit or push anything.
- Do not claim anything was tested unless you actually ran it.

Give me a concise report of your findings and your recommended next step.

Then STOP.
```

Summary: Read the existing source, package configuration, README, and tests; recommended three extractions and test cases. Ran `node --test`: 2 passed, 0 failed. No files were modified during that inspection. This entry was appended during Step 2 using the exact prompt available in conversation history.

## Step 2: Make the logic testable — 2026-11-11

AI tool: OpenAI Codex (exec_command and apply_patch through functions.exec).
Model: GPT-6, as identified by the session instructions; exact backend model identifier unavailable.

User prompt (verbatim):

```text
I'm continuing CMU 15-114 HW9: Tests as Guardrails using my existing One Bullet repository.

The initial code inspection is complete. The existing two tests passed, and we identified three pieces of logic worth extracting.

Now I want to complete **Step 2: Make the logic testable**.

### Task

Extract these three functions into a standalone JavaScript module, preferably `src/gameLogic.js`:

**1. calculatePlayerPosition**

- Extract the movement logic currently in `src/player.js`.
- Accept the player's position, movement direction, speed, radius, elapsed time, and arena dimensions.
- Return the updated `{ x, y }` position.
- Preserve direction normalization and boundary clamping.

**2. advanceBullet**

- Extract the bullet movement and first-wall collision logic currently in `src/bullet.js`.
- Accept the bullet's current state, position, velocity, radius, elapsed time, and arena dimensions.
- Return the updated bullet state, position, and velocity.
- Preserve the exact wall collision behavior, including diagonal movement and exact arrival times.

**3. canRetrieveBullet**

- Extract the retrieval condition currently in `src/bullet.js`.
- Accept the bullet state, player/bullet positions, and their radii.
- Return a boolean indicating whether retrieval is allowed.
- Preserve the current behavior, including allowing retrieval when the circles touch exactly.

### Integration

Update the existing Player and Bullet class methods to call these extracted functions.

The new functions must:

- Be exported and importable by Node.
- Take arguments and return values.
- Not depend on the DOM or canvas.
- Not mutate their input objects.
- Preserve all existing game behavior.

### Important constraints

This is a refactor, NOT a rewrite.

- Do not fix any existing bugs.
- Do not add new game features.
- Do not change the existing acceptance criteria.
- Preserve the single Bullet instance.
- Preserve the update order in Game.update().
- Do not change input handling, rendering, or unfinished game systems unless a minimal import change is necessary.
- Keep the current package.json configuration.
- Do not modify the existing tests.
- Do not write any new tests yet. My professor requires me to write the first new test myself without AI.
- Do not create branches.
- Do not commit or push.

### Verification

After extracting the functions:

1. Run `node --test`.
2. Confirm the original two tests still pass.
3. Check that the new functions can be imported independently.
4. Review the diff to confirm that the existing behavior was preserved.
5. If browser testing is available, verify the original shooting/retrieval mechanics. Otherwise clearly tell me that browser behavior remains unverified.

Do not claim that the refactor is fully verified based only on passing Node tests.

### HW9 Prompt Log

I'm reusing my HW7 repository, so I also need to continue using the existing `prompt_log.md`.

Please:

1. Preserve all existing HW7 prompt-log entries.
2. Append a new section titled `# HW9 — Tests as Guardrails` if it doesn't exist.
3. Record this prompt verbatim, with the actual tool and model information.
4. Include a short factual summary of what changed and which tests were run.
5. If the exact previous HW9 inspection prompt is available in conversation history, record it too. Do not reconstruct it from memory if it isn't available.
6. Continue using this same prompt log for future HW9 work.

Important: HW9 requires a separate tests-only Git commit later. Do not include prompt_log.md in that tests-only commit.

### When finished

Report:

1. Files changed.
2. The three extracted functions and their signatures.
3. How the existing classes now use them.
4. Test results.
5. Any behavior that could not be verified.
6. Confirmation that the HW9 prompt-log section was added.

Then STOP.
```

Summary: Added `src/gameLogic.js` exporting `calculatePlayerPosition(position, direction, speed, radius, seconds, width, height)`, `advanceBullet(bullet, seconds, width, height)`, and `canRetrieveBullet(bullet, player)`. Updated Player.update, Bullet.update, and Bullet.retrieve to use these functions. Inputs are only read; each movement function returns a new object. Preserved arithmetic, wall comparison operators, retrieval comparisons, the single Bullet instance, and Game.update order. Existing tests, package configuration, input, rendering, and acceptance criteria were not changed.

Verification: Ran `node --test`: the original 2 tests passed, 0 failed. Ran an independent Node ES-module import and confirmed all three exports are functions. Reviewed the class diff and extracted module; `git diff --check` passed. Browser automation availability was attempted twice through mcp__cua_repl, but its runtime failed to initialize (kernel/sandbox startup errors); browser shooting and retrieval remain unverified. No new tests were written. No dependencies installed, branches created, commits made, or pushes performed.

Continue future HW9 entries in this log. Keep `prompt_log.md` out of the later tests-only commit.
