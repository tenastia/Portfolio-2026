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
- `practice-screen-no-sections.png` — "Taming the Monster", left screen: the
  same practice screen with no sections row at all
- `practice-screen.png` — the right screen of that pair, with the **sections
  chip left out of its row**; the chip is drawn in markup over it
- `sections-selector-modal.png` — the selector sheet with its **carousel left
  empty**; the cards, their names and the selectors are drawn over it
- `section-card-all.png`, `section-card-01.png` … `section-card-05.png` — the
  carousel thumbnails, in that order (`PERFORMORY_SECTION_CARDS` in
  `src/app/project/[slug]/page.tsx`). "All" comes first, then each section
- `gradual-skill-builder.png` — first/second iteration pair
- `final-design-01.png` … `final-design-08.png` — the closing marquee, in that
  order. Alt text per screen is in `PERFORMORY_FINAL_SCREENS`
  (`src/app/project/[slug]/page.tsx`) — worth a read to check each line matches
  the screen in that slot.

`gradual-skill-builder.png` is cropped tighter than the Figma, which shows full
phone frames. A fuller export can replace it in place.

`overview-img.png`, `calendar-img.png`, `the-game-plan-img.png` and
`long-pieces-img.png` are left over from earlier versions of the layout and are
no longer referenced — `long-pieces-img.png` was the combined "Taming the
Monster" pair, now replaced by the two screens above. Safe to delete when you're
sure nothing else wants them.

`practice-screen-after-motion-1.png` was byte-identical to
`practice-screen-empty.png`, which is already in use, so it isn't carried here.

## The shared hero background

`performory-hero-bg.png` is meant to carry other studies' heroes too, but a
foreground needs a **transparent background** to sit on it —
`performory-hero-screen.png` is cut that way, `cg-hero-image.png` is not.

Century Group is still on its own hero for that reason: dropped onto the shared
field, its flat `#202020` backdrop reads as a lighter rectangle over the plume,
and softening or rounding that edge does not hide it. A cut-out export of the
two device mockups is all it needs — then it takes the same `background` and
`contain` props Performory's hero uses.

## The animated screens

Two panels play their interaction rather than showing it. Both work the same
way: a static export with the moving part **left out**, and that part rebuilt as
real markup over it, so the control animates properly instead of one screenshot
dissolving into another. Only the content it drives swaps underneath.

- **"Giving Just Enough Help"** — `PracticeBarsScreen`. The Show Bars control is
  markup over `practice-screen-empty.png`; the notation card behind it swaps per
  option.
- **"Taming the Monster"** — `SectionSelectorScreen`. The sections chip is
  markup over `practice-screen.png`, and the whole selector sheet plays on top:
  a piece already being practised in sections 1 and 2 has its selector opened,
  the carousel scrolls out to the far end, sections 4 and 5 go in, and the chip
  comes back reading `1, 2, 4, 5`. Each card's selector carries the same running
  number the chip spells out, so a section picked third reads "3" in the
  carousel and lands third in the chip — the list is the order they were
  chosen, which is the point the annotation beside it makes.

  The sequence is `PICKED` (what is already selected) plus `ADDED` (what it
  picks, in order) at the top of the component; the chip text and every
  selector number derive from those two, so they cannot drift apart.

Geometry constants are measured off the exports and written as percentages, so
the overlay stays registered at any width; type and padding are sized in `cqw`
against the nearest container, so they scale with the screen. The Performory
frames export at exactly 2× their Figma frames (the screen is 350 × 562 design
units, the modal 300 × 397.687 inside it), which is what those percentages are
derived from — worth re-checking if a screen is ever re-exported at a different
size.

To build another one:

1. Export the screen with the moving control **left out**, plus the content
   states as separate elements on a shared canvas.
2. Measure the control's box and the content slot off a *filled* export, and
   write them as percentages of the screen.
3. Give the stage a `role="img"` and one `label` — the parts are decorative.

One more panel is a candidate: **"It's easier when it's built up gradually"**
(Yes / Not Yet selecting).

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

Two glyphs are drawn inline as SVG rather than exported: the back-to-home cross
in the sticky rail, and the pencil inside the sections chip
(`SectionSelectorScreen`). Both are built to the Figma vector's box, so an
export can replace them in place — `icon-close.svg` for the first, and the
chip's `Vector` node for the second — if you'd rather ship the real glyphs.
