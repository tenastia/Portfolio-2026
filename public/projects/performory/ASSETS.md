# Performory — assets

The case study references the filenames below. Anything not here yet is skipped
at render rather than showing a broken image, so the page stays intact — drop a
file in with the exact name and it appears.

All exports go in this folder (`public/projects/performory/`).

Nothing is outstanding: both hand-drawn sketches that used to sit here were
replaced by the animated scene and the video band below, and are no longer
wanted.

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
  same practice screen with no sections row at all. **Still exported without the
  light border** the right screen now carries, so the pair reads mismatched —
  a re-export with the border would settle it
- `practice-screen.png` — the right screen of that pair, with the **sections
  chip left out of its row**; the chip is drawn in markup over it. Carries a
  light hairline border around the phone
- `sections-selector-modal.png` — the selector sheet with its **carousel left
  empty**; the cards, their names and the selectors are drawn over it
- `section-card-all.png`, `section-card-01.png` … `section-card-05.png` — the
  carousel thumbnails, in that order (`PERFORMORY_SECTION_CARDS` in
  `src/app/project/[slug]/page.tsx`). "All" comes first, then each section
- `product-proposition.mp4` — the footage behind "Product Proposition",
  1280×720, 10s. **11.9MB**, which is heavy for a background loop; a shorter or
  more compressed cut would drop it a long way without anyone noticing
- `cube-I.png`, `cube-II.png`, `cube-III.png` — the three sonata sections
  beside "The Game Plan", 312×312 each
- `character-original.png`, `character-surprised.png` — the two faces the
  player wears in that scene, 158×158
- `practice-routine-initial-iteration.png` — "It's easier when it's built up
  gradually", left screen: the first iteration, which asked which event the
  piece was for
- `practice-routine-set-up.png` — the right screen of that pair, with
  **everything below the piece card left out**; the whole set-up flow is drawn
  over it, and its status bar and tab bar are re-used as the fixed chrome the
  content scrolls under
- `final-design-01.png` … `final-design-08.png` — the closing marquee, in that
  order. Alt text per screen is in `PERFORMORY_FINAL_SCREENS`
  (`src/app/project/[slug]/page.tsx`) — worth a read to check each line matches
  the screen in that slot.

`gradual-skill-builder.png` is left over from the previous version of that
panel and is no longer referenced.

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

Three panels play their interaction rather than showing it. Both work the same
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

- **"The Game Plan"** — `GamePlanScene`. Not a screen: the three cubes and the
  player, composed and animated from their own exports rather than shipped as
  one picture. The cubes breathe on staggered timers; the player drifts to the
  development, loses his place, and goes back to the start. **He never reaches
  the third cube** — that is the finding the copy makes, so if the run ever
  changes, the recapitulation staying untouched is the part to keep. The "?" is
  set as type rather than exported.

  It replaces `sketch-sonata-img.png`, which was never exported and is no longer
  wanted.

- **"Product Proposition"** — `VideoBand`. Not an interaction, just footage
  behind the copy, with 80% black between them so the type reads. The dim is a
  real layer rather than an opacity on the video, so the panel colour stays
  underneath as the ground while the video loads. At 80%, even a pure-white
  frame leaves the body copy at 6.1:1 against it, and the pink footage at
  7.8:1 — so there is room to lighten it if the video ever looks too buried.

  It replaces `sketch-proposition-img.png`, which was never exported.

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

- **"It's easier when it's built up gradually"** — `PracticeRoutineScreen`, and
  the largest of the three: the whole goal-setting flow, played inside one
  phone. A memorising date is chosen from the calendar, then the practice days,
  then a 16:00 slot added through a time picker, then notifications turned on.

  This one treats the frame as a device. The status bar and tab bar are slices
  of the export held at the top and bottom, and everything between them scrolls
  under them — so the screen never moves, only its content does. Each beat's
  scroll position is set so that whatever the next beat touches is on screen
  when it happens; `Continue` and `Start Memorizing` both sat below the fold
  until that was checked, which is worth re-checking if the flow ever changes.

  The whole cycle runs about 13.5 seconds. That is long for a loop — it is
  four separate decisions — so say if you would rather it were tightened; the
  per-beat timings are the `FLOW` array at the top of the component.

  **The time picker is not in the Figma.** The flow needs one to add 16:00, so
  it is built from this screen's own materials: the selector sheet's border and
  radius, a `#292929` band for the selected row, and the primary button. If you
  design a real one, it replaces `TimePicker` in that file and nothing else
  moves.

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

A few glyphs are drawn inline as SVG rather than exported: the back-to-home
cross in the sticky rail, the pencil inside the sections chip
(`SectionSelectorScreen`), and the calendar's month caret and month pager
(`PracticeRoutineScreen`). All are built to their Figma vector's box, so an
export can replace any of them in place if you'd rather ship the real glyphs —
`icon-close.svg` covers the first.

One type note: the in-markup labels are set in the project's `--font-sans`,
which is PP Neue Montreal, while the exports are set in PP Radio Grotesk. The
two are close enough at these sizes, but PP Neue Montreal is wider, so a long
label such as "Select the days when you would like to practice the piece."
wraps to two lines where the Figma keeps it on one. It also has no ultralight,
so those labels sit a little heavier than designed. Both go away if PP Radio
Grotesk is added to `public/fonts/` and given a `@font-face` — and note that
PP Neue Montreal's own webfonts are still missing from that folder, so every
sans-serif on the site currently falls back to Helvetica.
