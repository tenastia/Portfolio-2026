# Performory — assets

The case study references the filenames below. Anything not here yet is skipped
at render rather than showing a broken image, so the page stays intact — drop a
file in with the exact name and it appears.

All exports go in this folder (`public/projects/performory/`).

## Still to export

| Filename | What it is | Figma node | Notes |
| --- | --- | --- | --- |
| `sketch-sonata-img.png` | Hand-drawn sonata-blocks sketch, beside "The Game Plan" | `IMG_6188 1` | Export **landscape** (the Figma frame rotates it −90°); renders ~482×230 |
| `sketch-proposition-img.png` | Hand-drawn piano + thought-cloud sketch, under "Product Proposition" | `IMG_6189 1` | 880×410 |

## In use

- `performory-hero-bg.png` — the hero card's ambient field, 1408×574
- `performory-hero-screen.png` — the phone floating on it, at 74% of the card's
  height
- `performory-design-left-img.png`, `performory-design-right-img.png` — the two
  screens under the Design divider, sliding in from top and bottom
- `practice-screen-before-static.png` — "Giving Just Enough Help", left screen
- `practice-screen-empty.png` — the right screen of that panel, with the
  notation slot and the control row left empty
- `practice-element-1-bar/2-bars/3-bars.png` — the notation cards that drop into
  that slot, one per option
- `long-pieces-img.png` — "Taming the Monster" pair
- `gradual-skill-builder.png` — first/second iteration pair
- `final-design-01.png` … `final-design-08.png` — the closing marquee, in that
  order. Alt text per screen is in `PERFORMORY_FINAL_SCREENS`
  (`src/app/project/[slug]/page.tsx`) — worth a read to check each line matches
  the screen in that slot.

`long-pieces-img.png` and `gradual-skill-builder.png` are cropped tighter than
the Figma, which shows full phone frames. Fuller exports can replace them in
place.

`overview-img.png`, `calendar-img.png` and `the-game-plan-img.png` are left over
from the previous structure and are no longer referenced. Safe to delete when
you're sure nothing else wants them.

## The shared hero background

`performory-hero-bg.png` is meant to carry other studies' heroes too, but a
foreground needs a **transparent background** to sit on it —
`performory-hero-screen.png` is cut that way, `cg-hero-image.png` is not.

Century Group is still on its own hero for that reason: dropped onto the shared
field, its flat `#202020` backdrop reads as a lighter rectangle over the plume,
and softening or rounding that edge does not hide it. A cut-out export of the
two device mockups is all it needs — then it takes the same `background` and
`contain` props Performory's hero uses.

## Adding another animated screen

`PracticeBarsScreen` is the pattern: a static screen export with the moving
control rebuilt as real markup over it, so the control animates properly rather
than one screenshot dissolving into another. Only the content it drives — here
the notation card — swaps underneath.

Its geometry constants are measured off the export and written as percentages,
so the overlay stays registered at any width, and the control's type is sized in
`cqw` against the screen's container. To build another one:

1. Export the screen with the moving control **left out**, plus the content
   states as separate elements on a shared canvas.
2. Measure the control's box and the content slot off a *filled* export, and
   write them as percentages of the screen.
3. Give the stage a `role="img"` and one `label` — the parts are decorative.

Two more panels are candidates: **"Taming the Monster"** (the `Sections 2, 4, 5`
chip appearing, the progress bar filling) and **"It's easier when it's built up
gradually"** (Yes / Not Yet selecting).

## Icons

`SpecsCard` resolves icons from chip labels via `SPEC_ICONS`, so a study names a
discipline or a tool and the mark follows. Every label the six studies use has
one — the marks live in two places, `public/icon-*.svg` (the original set) and
`public/projects/icons-*.svg` plus `public/projects/jitter.svg` (the later
uploads); worth consolidating one day, but nothing is missing.

`UX Research` and `Interface Design` are wired up as aliases of the research and
UX | UI marks and no chip currently uses them.

Work chips are icon + label; Stack is icon-only 36px discs, per the design. The
marks render at their intrinsic size rather than a fixed box, because they are
not one shape: Figma is 11×16 portrait, the Adobe marks are 20×20, and Jitter is
a 24×8 wordmark.

The back-to-home cross in the sticky rail is drawn inline as SVG rather than
exported — swap it for `icon-close.svg` if you'd rather ship the Figma glyph.
