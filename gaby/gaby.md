# Gaby
## "eval as a brushstroke" (SVG Code Art for Gaby)

1. Check the code before
2. Download the svg
3. Open the svg directly on your local browser

**Inspiration**  
How can you surprise someone who is really tied to tech?  
Not with a generic "happy birthday" card, but with something that speaks their native language: an editor, a cursor, a program being authored in real time. A greeting that is not shown, it is built.

**Author:** Jorge Feldmann  
**Date:** December 23, 2025  

## Overview

This piece is an SVG that behaves like a miniature IDE: it types a JavaScript program into a "code editor" line by line, then executes that exact program at the end using "eval". The viewer watches the program being authored before the program comes alive.

The output is a final kinetic gesture: the phrase "Happy Birthday Gaby" resolves from noise into certainty, like a compiler finishing a spell.

## Trust, knowledge, and the act of opening the file

An SVG with code inside is not a normal image. Opening it is closer to running a program than viewing a picture. That makes the act of opening this artwork a sign of trust and knowledge:

- Trust, because you are choosing to execute something embedded in a visual format.
- Knowledge, because you understand that SVG can carry scripts, and scripts can do anything a page can do.

This is why the piece carries an implicit rule: we should not open SVGs with embedded code unless we are really sure about the code, where it came from, and what it does. In a way, the medium itself becomes part of the message: the greeting is not only "Happy Birthday", it is also "I trust you, and I know you will understand what you are looking at".

## Why this is code as art

### 1) The artwork is the act of writing itself
Most animations hide their mechanism. This one makes the mechanism the subject. The typing is not a UI flourish; it is the narrative. The piece reminds you that software is not only results, it is the choreography of producing results.

### 2) The same code exists in two states: image and engine
A single program is:
- a visual object (printed into the editor, readable, framed like poetry)
- an executable object (evaluated after being entirely "written")

That duality is the core aesthetic: the script is both paint and the painter.

### 3) "eval" as the controversial medium
"eval" is usually treated as "forbidden", "unsafe", or "hateful JavaScript". Here, that reputation becomes texture. The piece uses "eval" as a deliberate artistic material, like using glitch, noise, or distortion in visual art.

The tension is intentional: we take the "worst practice" and turn it into a ritual. In this context, "eval" is not a shortcut, it is a statement: "execution is part of the reveal".

### 4) Determinism versus entropy
The phrase emerges from random characters. That scramble to truth moment is a metaphor for development:
- the messy, chaotic search
- the gradual locking of meaning
- the final clean compile

The animation does not simply show typing; it shows convergence.

## The process (how the trick works)

1. A source program is stored as an array of lines (so it can be displayed as code).
2. The SVG types those lines into the editor, character by character.
3. Nothing runs yet. The "editor" is pure performance: ink on stage.
4. After the final line prints, the script joins the lines into one string.
5. It calls "eval(program)", executing the same code the viewer just watched being written.
6. That evaluated code animates the last line's output until it resolves to:

"console.log("Happy Birthday Gaby");"

## Testing the limits (ideas to push the piece further)

### Make the code fight back
- Add self modifying behavior: the printed code rewrites parts of itself before the final "eval".
- Print a decoy program, then "patch" it live (like a hotfix) before execution.

### Turn danger into a dial
- Generate the program from fragments (tokens), then assemble it on screen.
- Gradually "unlock" forbidden constructs: first safe functions, then dynamic evaluation, then reflection.

### Expand the performative editor
- Add a fake lint error that resolves itself.
- Add a fake stack trace, then "fix" it and rerun.
- Insert comments that read like a manifesto, revealed at the same time as the code.

### Explore meaning through constraints
- Force the final message to be produced only through transformations (no direct string literal).
- Encode the greeting and decode it on screen (base64, XOR, rune-like glyph mapping).

### Make the viewer complicit
- Use time-based entropy (e.g., seed randomness from frame time) so each viewing is unique.
- Let the cursor, scramble speed, or message resolve rate vary by environment, device as collaborator.

## Objective

Greet Gaby on his birthday, not with a static banner, but with a living, developer native ritual: the message is compiled, not merely displayed.

AI fair-usage:** No AI was used in the process of creation**, only Grammarly to check this text.
