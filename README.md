# OpsWolf Code Rain

We finally got the Matrix writing lol.

A small, standalone code-rain playground. Change the glyphs, colors and motion; blend between presets; keep the interface readable. It runs locally with browser Canvas 2D and has no package dependencies, account, analytics or external assets.

**Local candidate, not a published release.** Cursadex integration is separate and not installed. This project does not change Codex, your desktop wallpaper or Windows settings.

## Run it

With an installed Node.js runtime, from this folder:

```sh
node serve.mjs
```

Open **http://127.0.0.1:4179** in your browser. Ctrl+C stops the loopback-only server. If that port is busy, pass another, for example `node serve.mjs 4180`. Browser modules need an HTTP server; opening index.html as a file is not the supported launch path. There is no install step.

## The controls

- **Presets:** Woodland signal, Arctic relay, Amber terminal and Daylight circuit. Applying one changes the rain. Check **Match interface** to also apply its interface palette.
- **Rain:** separate rain, leading-character, glow and background colors; speed, density, glyph size, trail length, glow, brightness, opacity and a custom character set.
- **Blend:** starts from the current rain and moves to the selected preset. Choose duration, endpoint hold and looping there/back. Numeric values and RGB colors interpolate; the character set switches halfway. Column/trail counts are discrete and resource-capped. Interface colors stay fixed.
- **Pause:** freezes animation and blend time. Resume continues from there. Stop blend keeps its current values. Editing a rain control or applying a preset ends the current blend.
- **Interface:** independent surface, text and accent colors. Text below 4.5:1 contrast or accent/focus below 3:1 is rejected. This checks these solid interface pairs, not every possible composited background or theme.
- **Personal presets:** capture up to eight; remove only the selected personal preset. Capture/remove affects this session until **Save locally**.
- **Save locally:** keeps the current rain snapshot, interface and personal presets under `opswolf:code-rain:v1` in this browser origin's localStorage. Playback and transition timing are not saved. A different port/browser/profile has separate storage.
- **Reset current:** restores the current rain/interface defaults. It keeps personal presets and does not erase the saved snapshot until you explicitly save. Reset interface affects only the interface.

Storage failures leave session controls usable and show a message. Unknown schema versions, corrupt or oversized saved data fall back safely. Nothing is transmitted to an account.

## Motion and resource limits

The renderer stops scheduling animation while paused, offscreen, hidden, in reduced-motion mode or in forced-color/high-contrast mode. Reduced motion shows a still image; requesting a blend applies its destination immediately. High contrast hides the decorative canvas. Returning from browser back/forward cache recreates one renderer with the session settings; an in-progress blend is stopped.

Work is bounded at 30 drawn frames/second, 140 columns, 1,200 glyph draws/frame, a 2560×1440 backing canvas and at most 1.5 device-pixel ratio. Slow frames advance by at most 100 ms, avoiding catch-up bursts. Larger displays can look softer and extreme density/trail settings are capped. These are workload limits, not a promise of a particular GPU/CPU utilization on every machine.

## How it fits together

| File | Owns |
| --- | --- |
| `src/state.mjs` | Validated settings, shipped presets, transition timing/colors, bounded persistence |
| `src/renderer.mjs` | Canvas, animation, resource budgets and visibility/media lifecycle |
| `src/app.mjs` | Controls, explicit save/reset and browser navigation lifecycle |
| `index.html`, `style.css` | Standalone layout and accessible controls |
| `serve.mjs` | Read-only loopback static server |

`CodeRain(container, settings, {onTransition, onState, frameScheduler})` creates an owned canvas. It exposes `setSettings`, `setPaused`, `startTransition`, `stopTransition`, `state`, and `dispose`. An integration must provide the container, own persistence and call dispose. The renderer has no Codex imports or global application styling. A future Cursadex adapter must use its normal verified plugin/package lifecycle; standalone success does not certify that integration.

An optional `frameScheduler` supplies `request(callback)` and `cancel(ticket)`. It follows animation-frame semantics: callbacks run asynchronously with a monotonic millisecond timestamp, each request returns a unique nonzero numeric ticket (negative tickets are supported), and cancellation must tolerate an already settled ticket or zero. Hosts can park frames during their own transitions without patching global browser functions. The default uses the container window's animation-frame API. Supplying only one half of the pair is rejected before a canvas is created.

## Checks

```sh
node --test tests/state.test.mjs
node tests/browser.test.mjs
```

Browser checks use installed Chrome, a disposable owned profile and loopback server. They never download a browser. Set `CHROME_PATH` to its executable if it is not at the default Windows Chrome path. Node 22.18 and installed Chrome were used for the current candidate.

Current evidence: **9 state tests and 37 browser checks passed**. Pointer/keyboard journeys cover settings, preset capture, save/reload, reset and error messages. Renderer checks cover pause/resume, transitions, reduced motion, high contrast, real intersection-based suspension, resource caps, cleanup and uncaught exceptions. Hidden-document and back/forward-cache lifecycle events are simulated; physical GPU behavior and native Cursadex embedding remain unverified. Desktop, daylight, narrow and high-contrast captures were visually reviewed. Results/captures live under ignored `artifacts/`.

## Credit

The browser test driver is adapted from the MIT-licensed Cursadex / Code-Codex test harness. See LICENSE. The renderer, playground and presets are independent from the native Codex application; this is an unofficial community project.
