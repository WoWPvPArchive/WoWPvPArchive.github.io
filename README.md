# Site Structure

`index.html` is now the homepage: a 3-column expansion picker (The
Burning Crusade / World of Warcraft / Wrath of the Lich King). Clicking
the middle (Vanilla) column takes you to `character-select.html` —
everything described below, which used to be `index.html`, still lives
there unchanged. The other two columns are placeholders and don't go
anywhere yet.

**Homepage files:**
- `index.html` — the 3-column picker's structure
- `home.css` — its styling (hover/focus effects: dims and desaturates
  the other two columns, widens and gold-borders whichever one you're
  on)
- `home.js` — wires up navigation; only Vanilla goes anywhere
- `images/expansions/` — the three background images
  (`burning-crusade.jpg`, `vanilla.png`, `wrath.png`) and the three
  logo images (`logo-bc.png`, `logo-vanilla.png`, `logo-wrath.png`)

To make Burning Crusade or Wrath actually lead somewhere later: give
that column's `<button>` an `href`-equivalent by updating the click
handler in `home.js` the same way Vanilla's works (`window.location.href
= "..."`), once there's a page for it to go to.

# Character Select Page

A character-select-style landing page: pick a class from the row of 9
icons at the top of the screen, and the background, 3D model, name,
and lore text all switch. A "Skill" / "Fun" toggle above the row swaps
in a second, different set of the same for whichever class is
currently selected.

## Files
- `character-select.html` — structure (this was `index.html` before
  the homepage above was added)
- `style.css` — styling, including one background theme per class/mode
  and the class icon row
- `script.js` — `CLASS_DATA` (all the names, lore, videos, models, and
  animations) plus the logic that swaps everything when you click a
  class or a mode, and preloads assets in the background
- `models/` — `.glb` 3D model files
- `icons/` — class icon images
- `images/` — background images per class/mode
- `fonts/` — for the Morpheus font file (see below)

## Reference

**Class icons:** each button shows a real icon image
(`icons/classicon_{class}.png`) inside a thin silver-bordered square.
To change one, just replace the corresponding file in `icons/` — no
code changes needed as long as the filename stays the same.

**Backgrounds:** set per class *and* mode in `style.css`, since Skill
and Fun can each look different for the same class:
```css
[data-class="warrior"][data-mode="skill"] {
  background-image: url("images/warrior-skill.jpg");
  background-size: cover;
  background-position: center;
}
```
Any class/mode combination without its own rule falls back to a
neutral dark backdrop.

**Names, flavor text, and lore:** all in `script.js` under
`CLASS_DATA`. Each class has a `skill` and a `fun` entry with:
- `name` — shown in the read-only name field at the bottom (visitors
  can't edit it)
- `text` — a shorter flavor line (currently empty on every entry; fill
  it in if you want that line to show something)
- `lore` — the longer text shown in the right-hand panel. If it ends
  with "X/10" or "X.X/10", that gets pulled out and rendered as a
  star-rating badge next to the name instead of staying in the
  paragraph — see "Ratings" below.

**Multiple profiles per class/mode:** instead of a flat entry, a
class/mode can have a `variants` array of that same shape (each with
its own `name`, `text`, `model`, `lore`, `video`, `animation`) when
there's more than one option worth featuring — right now just
Shaman/Fun (Cabbarnuke and Unbreakable). Clicking the name header
cycles to the next variant, updating everything (lore, rating, model,
video) to match. Add more variants to any class/mode's array the same
way if you want the same behavior elsewhere.

**Ratings:** shown next to the name header, right-aligned, as a row of
10 stars (supporting genuine half-stars, not just rounding) plus the
raw score. This only appears when a `lore` string ends in "X/10"; the
rest of the text becomes the paragraph body.

**Embedded video:** a video player sits on the left side of the
screen for the current class/mode's `video` field (the id from the
YouTube URL, e.g. `"dQw4w9WgXcQ"`). It's faded to low opacity until
you hover over it or start playing it (it stays fully visible while
actually playing, even after your mouse leaves). It never autoplays —
switching class/mode loads the new video's thumbnail via YouTube's
"cue" API, ready to play on click, rather than starting it
automatically. If `video` is `null`, the box shows "No video has been
set for this class / mode yet." instead of an empty player.

**3D models + animations:** each entry points at
`models/{class}-{mode}.glb` and names which animation clip to play via
`animation` (defaults to `"Stand"`). If a model doesn't have a clip by
that name, the code automatically tries a few common alternates
("Idle", "Stand1", etc.), and if none of those match either, it plays
the file's first animation and logs a console warning listing that
file's actual animation names — check DevTools → Console if a
character is playing the wrong animation. Any class/mode without a
model file yet shows a dashed placeholder box with the expected path.
An entry can also set `cameraRadius` (e.g. `"75%"`) to zoom that
specific model in closer than the default 100% — Warlock/Fun uses this
to look bigger than the rest. min/max-camera-orbit move together with
it automatically so the zoom isn't clamped back.

**Morpheus font:** `.lore-text` is set to use "Morpheus" (the
blackletter-style font used in WoW's UI), which isn't available via
Google Fonts or any CDN — it's shareware, free for personal use only.
To enable it:
1. Download it (search "Morpheus font Kiwi Media").
2. Put the file at `fonts/Morpheus.ttf`.
3. It should just work — the `@font-face` rule in `style.css` is
   already active and pointing at that path. If it doesn't show up,
   check the Network tab in DevTools for a 404 on `Morpheus.ttf` —
   that usually means a filename/case mismatch or the file didn't get
   pushed to the repo.
Until the font file is present, `.lore-text` falls back to EB
Garamond automatically.

**Preloading:** on page load, once the first model (Warrior/Skill)
finishes loading, the page automatically starts fetching every other
model and background image in the background — no clicking required
for them to warm up. This means the very first visit downloads
everything eventually, so if your `.glb` files are large, keeping them
compressed (see below) matters more than it otherwise would.

**Honorable Mentions:** the button at the bottom of the main screen
slides the whole page up and out, replaced by a second scene sliding
up from below (see `body.honorable-open` in `style.css` for the
transition). That scene has the same 9 class icons in a horizontal row
near the bottom, centered — click one to populate a list of names on
each side ("Fun" on the left, "Skill" on the right; those two badges
themselves sit at the bottom corners, just above the volume button).
Each list grows *upward* from its badge (first entry closest to the
badge, later ones stacking above it) rather than being anchored at the
top — that's `flex-direction: column-reverse` plus anchoring the list
by `bottom` instead of `top` in `style.css`, so the box's height (and
therefore how far up it reaches) grows with however many entries a
class has. Both lists share one uniform box width together (sized to
whichever name, on either side, is longest). This data lives
separately from the main `CLASS_DATA`, in `HONORABLE_MENTIONS` further
down in `script.js`: each class has a `skill` and `fun` array, and you
can add or remove entries freely — each is just
`{ name: "...", lore: "...", video: "..." }` (use `video: null` if
there's no video for that entry yet).

Clicking a name controls both the video slot and the lore box. A
video, if that entry has one, appears in a single shared, unstyled
slot centered on screen (no border or background of its own, sized
bigger than the main screen's player since it now has the middle of
the scene to itself) — a top-level element rather than nested inside
either list, so it can never be clipped by a list's scroll area, and
it never affects any entry's position or width. Lore, if that entry
has any, appears in a separate box centered just above the icon row
(with a slight dark backdrop for legibility), typed out
letter-by-letter. Selecting a different entry, collapsing the current
one, or switching classes all clear whichever of these was showing —
neither one is "sticky" across entries. This `lore` field is
per-character now; there's no more class-level ambient note (the
`note` field still exists on some classes in the data but isn't read
or displayed by anything).

The "Back" button stays at the top and returns to the main scene.

The Honorable Mentions scene has its own background, separate from the
main screen's per-class ones — search `style.css` for `.honorable-scene`
for the comment showing how to point it at an image. It's one image
for the whole scene (not per-class), and shows a solid dark color
until you set one.

On the main screen, the big character name header (e.g. "Bobo",
"Arthus") is tinted to match the currently selected class's official
WoW color — search `style.css` for `body[data-class=` to find/adjust
these. (Honorable Mentions' entry boxes are plain now — that tinting
was tried and then removed.)

Every element on the Honorable Mentions scene (headers, icons, labels,
entry boxes, the note text, the video slot, the Back button) is sized
about 25% larger than an earlier version of this scene — done as
individual font-size/dimension bumps throughout its section of
`style.css` rather than a single CSS transform, to avoid any risk of
content clipping at the screen edges.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add `index.html`, `home.css`, `home.js`, `character-select.html`,
   `style.css`, `script.js`, and the `models/`, `icons/`, `images/`
   (including its `expansions/` subfolder), and `fonts/` folders to
   the repo root — or into a `/docs` folder if you prefer.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick your branch (usually `main`) and the folder (`/` or
   `/docs`), then save.
6. GitHub will give you a URL like `https://yourusername.github.io/yourrepo/`
   within a minute or two.

No build step is required — this is plain HTML/CSS/JS. GitHub Pages'
filesystem is case-sensitive, so double check filenames/folders match
exactly what's referenced in the code if something 404s.

**Keeping `.glb` files small:** try [gltf.report](https://gltf.report/)
(drag-and-drop optimizer, nothing uploaded anywhere) or the
`gltf-transform` CLI (`npm install -g @gltf-transform/cli`, then
`gltf-transform optimize in.glb out.glb`) — texture compression is
usually where the biggest size wins are.