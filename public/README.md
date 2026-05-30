# Static assets (`public/`)

Everything in this folder is served from the site root `/`.
A reference like `src="/headshot.png"` in the code maps to the file
`public/headshot.png`. **File names are case-sensitive and the extension
must match exactly.** Drop the files at the paths below and they appear on
the site with no code changes.

## Images the site is looking for

| Where it shows up            | Code reference                  | Put the file here                       | Suggested size                          |
| ---------------------------- | ------------------------------- | --------------------------------------- | --------------------------------------- |
| Headshot (replaces bio)      | `/headshot.png`                 | `public/headshot.png`                   | square, ≥ 256×256 (shown at 64×64)      |
| Project card — performory    | `/projects/performory.png`      | `public/projects/performory.png`        | ~1408×856 (704×428 ratio ≈ 1.645:1)     |
| Project card — scorebook     | `/projects/scorebook.png`       | `public/projects/scorebook.png`         | ~1408×856                               |
| Project card — cadence       | `/projects/cadence.png`         | `public/projects/cadence.png`           | ~1408×856                               |
| Project card — metronome     | `/projects/metronome.png`       | `public/projects/metronome.png`         | ~1408×856                               |
| Performory case-study hero   | `/projects/performory/hero.jpg` | `public/projects/performory/hero.jpg`   | wide hero image (note: `.jpg`)          |

## Fonts (also missing — the site currently falls back to Helvetica/Arial)

| Code reference                      | Put the file here                          |
| ----------------------------------- | ------------------------------------------ |
| `/fonts/PPNeueMontreal-Book.woff2`  | `public/fonts/PPNeueMontreal-Book.woff2`   |
| `/fonts/PPNeueMontreal-Book.woff`   | `public/fonts/PPNeueMontreal-Book.woff`    |
| `/fonts/PPNeueMontreal-Medium.woff2`| `public/fonts/PPNeueMontreal-Medium.woff2` |
| `/fonts/PPNeueMontreal-Medium.woff` | `public/fonts/PPNeueMontreal-Medium.woff`  |

If an image is missing, the project cards and headshot fall back gracefully
(the `<img>` hides and a neutral background shows), so partial uploads are fine.
