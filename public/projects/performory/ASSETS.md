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
| `final-screen-1.png` … `final-screen-8.png` | The eight screens in the closing marquee | `6468:16480`–`6468:16487` | 240×522 each, same order as the Figma row |

The alt text for the eight marquee screens is set in
`src/app/project/[slug]/page.tsx` (`PERFORMORY_FINAL_SCREENS`) — worth a read to
check each one matches the screen you export into that slot.

## In use

- `performory-hero-img.png` — hero card
- `performory-design-left-img.png`, `performory-design-right-img.png` — the two
  screens under the Design divider, sliding in from top and bottom
- `practice-screen-before-static.png` — "Giving Just Enough Help", left screen
- `practice-screen-after-motion-1/2/3.png` — the right screen of the same panel,
  crossfading through One → Two → Three (see below)
- `long-pieces-img.png` — "Taming the Monster" pair
- `gradual-skill-builder.png` — first/second iteration pair

`long-pieces-img.png` and `gradual-skill-builder.png` are cropped tighter than
the Figma, which shows full phone frames. Fuller exports can replace them in
place.

`govong-help-img.png` is no longer referenced — it was the combined
before/after image, now superseded by the four `practice-screen-*` files. Left
in the folder in case you still want it.

## Adding another animated screen

`ScreenSequence` crossfades exported states of one screen while it is on
screen, restarting when the reader comes back to it and holding the last frame
under a reduced-motion preference. To add one:

1. Export each state on the **same canvas size** — the component stacks them.
2. Pass them in order with the shared `aspect`, plus a `label` describing what
   the sequence shows (the frames themselves are decorative).

Two more panels are candidates: **"Taming the Monster"** (the `Sections 2, 4, 5`
chip appearing, the progress bar filling) and **"It's easier when it's built up
gradually"** (Yes / Not Yet selecting).

## Icons (optional)

`SpecsCard` resolves icons from chip labels via `SPEC_ICONS`. Three Work labels
have no mark yet: **Responsive Design**, **Interactive Kiosk**, **Web Design**.
`icon-cms.svg` and `icon-sketch.svg` are wired up but unused — no chip is
currently labelled "CMS" or "Sketch".

The back-to-home cross in the sticky rail is drawn inline as SVG rather than
exported — swap it for `icon-close.svg` if you'd rather ship the Figma glyph.
