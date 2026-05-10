# B.I.R.A. Tactics Prompt
## “Battle Intelligence Response Arena” — Prompt-Based Tactical Grid Game

Preview: https://htmlpreview.github.io/?https://github.com/jotafeldmann/art/blob/main/bira/index.html

Repository: https://github.com/jotafeldmann/art/tree/main/bira

1. Open the GitHub Pages preview in Chrome
2. Make sure Chrome’s built-in AI API is enabled
3. Give tactical orders using natural language
4. Watch the AI translate your prompt into legal unit actions

Local run:

    npm install
    npm run serve

Then open:

    http://localhost:3000/

Or:

    http://localhost:3000/index.html

**Inspiration**  
This project began as an experiment: what happens when a strategy game is not controlled mainly by clicking every unit, but by talking to an AI commander?

Instead of manually choosing every move, the player gives a tactical intention: advance, attack, retreat, move to a corner, focus fire, survive, or pressure the enemy. The game then asks Chrome’s built-in AI API to convert that instruction into legal actions inside the rules of the board.

At the same time, the project is personal. **B.I.R.A.** is a dedication to my brother Bira. The name became both a tribute and a system:

**B.I.R.A. — Battle Intelligence Response Arena**

It is a small browser game, a tactical prototype, an AI experiment, and a personal homage.

**Author:** Jota Feldmann  
**Created with:** ChatGPT  
**Purpose:** Homage to Bira and experiment with Chrome AI API  

## Overview

**B.I.R.A. Tactics Prompt** is a single-file browser tactics game built around a configurable grid, simultaneous turn resolution, and natural-language commands.

The player controls units through prompts. The game engine generates all legal actions, and the AI is only allowed to choose from those valid options. This prevents the AI from inventing impossible moves, illegal attacks, or invalid coordinates.

The game includes:

- configurable board size
- configurable unit count
- draggable starting positions
- custom HP, damage, move range, and attack range
- turn limit, including unlimited mode
- simultaneous combat
- animated movement
- attack and destruction effects
- colored battle log
- help and settings tabs
- unit tests and visual smoke tests

## How the game works

The player writes a command.

The game builds a list of legal actions.

Chrome AI chooses action IDs from that list.

The engine validates the result.

The enemy chooses actions using a rule-based heuristic.

Both sides resolve the turn simultaneously.

The log records what happened.

## Victory and defeat

The game ends when:

- one side has no units
- one side has no legal moves
- both sides are unable to continue
- the turn limit is reached

If the turn limit is reached, the side with more surviving units wins. If both sides have the same number of units, the game is a draw.

A turn limit of 0 means there is no turn limit.

## Configuration

The Settings tab allows changing:

- board columns
- board rows
- turn limit
- player unit count
- enemy unit count
- movement range
- attack range
- max HP
- damage
- starting unit positions

Starting units can be repositioned by dragging them on the board or by editing exact coordinates.

Columns are named like spreadsheet columns:

    A, B, C ... Z, AA, AB, AC ...

## Testing

Install dependencies:

    npm install

Run all tests:

    npm test

Logic tests:

    npm run test:logic

Visual smoke tests:

    npm run test:visual

The tests cover:

- column naming such as A, Z, AA, AB
- invalid AI action rejection
- simultaneous destruction
- legal action generation
- outcome detection
- tab rendering
- settings behavior
- help content

## GitHub Pages

Expected public URL:

    https://jotafeldmann.github.io/art/bira/

Recommended setup:

1. Go to repository settings for jotafeldmann/art
2. Open Pages
3. Set source to the main branch
4. Use the repository root as the publishing source
5. Keep the game inside /bira/index.html

## Chrome AI note

The game is designed to test Chrome’s built-in AI API.

For best results, run it as a top-level page:

    http://localhost:3000/

or:

    https://jotafeldmann.github.io/art/bira/

Avoid iframe-based previews when testing Chrome AI integration, because the Prompt API may be restricted by browser Permission Policy rules in embedded contexts.

## AI fair usage

**AI was used as a creative and technical assistant in the development of this project.**

The concept, direction, testing, naming, gameplay decisions, and final intention were guided by Jota Feldmann. ChatGPT was used to help design, implement, debug, refactor, test, and document the prototype.

The project also exists as an experiment with the **Chrome AI API**, using browser-based AI to interpret natural-language tactical commands.

**This game is a dedication to my brother Bira.**
