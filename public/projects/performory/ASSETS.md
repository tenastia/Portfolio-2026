# Performory — assets to export

The 2026 case study layout is built and references the filenames below. Any file
that isn't here yet is skipped at render rather than showing a broken image, so
the page stays intact — drop a file in with the exact name and it appears.

All exports go in this folder (`public/projects/performory/`).

## Still to export

| Filename | What it is | Figma node | Notes |
| --- | --- | --- | --- |
| `sketch-sonata-img.png` | Hand-drawn sonata-blocks sketch, beside "The Game Plan" | `IMG_6188 1` | Export **landscape** (the Figma frame rotates it −90°); renders ~482×230 |
| `sketch-proposition-img.png` | Hand-drawn piano + thought-cloud sketch, under "Product Proposition" | `IMG_6189 1` | 880×410 |
| `design-screen-1.png` | Tall practice screen, left of the `Design` divider | `23 1` | 350×680 |
| `design-screen-2.png` | Tall practice screen, right of the `Design` divider | `23 2` | 350×694 |
| `final-screen-1.png` … `final-screen-8.png` | The eight screens in the closing marquee | `6468:16480`–`6468:16487` | 240×522 each, same order as the Figma row |

The alt text for the eight marquee screens is set in
`src/app/project/[slug]/page.tsx` (`PERFORMORY_FINAL_SCREENS`) — worth a read to
check each one matches the screen you export into that slot.

## Reused from the existing study

These already match the new design closely enough to ship:

- `performory-hero-img.png` — hero card
- `govong-help-img.png` — "Giving Just Enough Help" pair

## Reused, but worth replacing

These carry the right content but are cropped tighter than the Figma, which
shows full phone frames. Export the fuller versions when convenient and they can
be swapped in place:

- `long-pieces-img.png` — "Taming the Monster" pair
- `gradual-skill-builder.png` — first/second iteration pair

## Icons (optional)

`SpecsCard` takes an optional `icon` per chip. The Figma has small glyphs beside
the Work and Stack entries (Figma, Illustrator, Photoshop, and the three
discipline marks); they render as text-only until those SVGs are exported. Add
them as e.g. `icon-figma.svg` and pass `{ label: "Figma", icon: "/projects/performory/icon-figma.svg" }`.

The back-to-home cross in the sticky rail is drawn inline as SVG rather than
exported — swap it for `icon-close.svg` if you'd rather ship the Figma glyph.
