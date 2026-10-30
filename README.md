# OpsWolf Code Rain

We finally got the Matrix writing lol.

A small, standalone code-rain playground. Change the glyphs, colors and motion; blend between presets; keep the interface readable. It runs locally with browser Canvas 2D and has no package dependencies, account, analytics or external assets.

**Local candidate, not a published release.** Standalone **0.1.0** remains private/unreleased; reviewed renderer source is `c976189`. The separate OpsWolf **0.1.0-dev.9** host is owner-activated with verified/imported Rain plugin **0.1.2**. The owner accepts flyout/Changes opacity and empty-editor transparency with Code Rain; blend smoothness and transparency with other themes remain open. This standalone playground does not change Codex, your desktop wallpaper or Windows settings. See [current verification and the live checklist](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/review/2026-10-30-local-work/docs/verification.md).

## Take a look

Real browser captures of this standalone playground using the included presets. Native OpsWolf integration and performance checks are tracked separately in the [verification guide](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/review/2026-10-30-local-work/docs/verification.md).

![Woodland signal rain beside the palette and motion controls](https://raw.githubusercontent.com/ThornsOfire/OpsWolf-Code-Rain/cea52a0b3e17e40ee669601062910a1622f6cc3d/docs/images/woodland-control-room.png)

*Woodland signal, with the rain palette and motion controls open.*

![Arctic relay rain with the preset selector and blend controls open](https://raw.githubusercontent.com/ThornsOfire/OpsWolf-Code-Rain/cea52a0b3e17e40ee669601062910a1622f6cc3d/docs/images/arctic-blend-controls.png)

*Arctic relay with Match interface enabled and blend controls open. No blend is running in this capture; the reported blend-only frame drops remain an open issue.*

## Turn it on inside Codex

If you're using an OpsWolf build with Code Rain installed:

1. Click **Preview Market** at the bottom of the file explorer.
2. Open **Appearance**.
3. Find **Code Rain Background** and click **Enable**.
4. Click the **sliders icon** beside it to open the Rain settings.
5. Pick a preset and click **Apply**, or adjust the colors and motion yourself. Click **Save** to keep your Rain settings for next time.

To find those settings again, use **Preview Market → Appearance → Code Rain Background → sliders**. **Pause** stops the animation temporarily; **Disable** on the Rain card turns the background off.

These controls come from the OpsWolf integration; they aren't built into stock Codex. If you don't have that setup yet, start with the [OpsWolf setup guide](https://github.com/ThornsOfire/OpsWolf/tree/candidate/planned-development#readme).

## Standalone browser demo

You can also run the playground outside Codex. This optional route uses a local server.

<details>
<summary>Run the standalone demo with Node.js</summary>

With Git and Node.js installed, clone the source branch and start its local server:

```sh
git clone --branch review/2026-10-30-local-work https://github.com/ThornsOfire/OpsWolf-Code-Rain.git
cd OpsWolf-Code-Rain
node serve.mjs
```

Open **http://127.0.0.1:4179** in your browser. Ctrl+C stops the loopback-only server. If that port is busy, pass another, for example `node serve.mjs 4180`. Browser modules need an HTTP server; opening index.html as a file is not the supported launch path. There is no install step.

</details>

## Standalone controls

The controls below describe the standalone playground. OpsWolf's embedded settings share the Rain controls; its preset management and interface settings have their own documented limits.

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

`CodeRain(container, settings, {onTransition, onState, frameScheduler})` creates an owned canvas. It exposes `setSettings`, `setPaused`, `startTransition`, `stopTransition`, `state`, and `dispose`. An integration must provide the container, own persistence and call dispose. The renderer has no Codex imports or global application styling. The OpsWolf adapter uses its normal verified plugin/package lifecycle; standalone success does not certify live embedding.

An optional `frameScheduler` supplies `request(callback)` and `cancel(ticket)`. It follows animation-frame semantics: callbacks run asynchronously with a monotonic millisecond timestamp, each request returns a unique nonzero numeric ticket (negative tickets are supported), and cancellation must tolerate an already settled ticket or zero. Hosts can park frames during their own transitions without patching global browser functions. The default uses the container window's animation-frame API. Supplying only one half of the pair is rejected before a canvas is created.

## Checks

```sh
node --test tests/state.test.mjs
node --test tests/cadence.test.mjs
node tests/browser.test.mjs
```

Browser checks use installed Chrome, a disposable owned profile and loopback server. They never download a browser. Set `CHROME_PATH` to its executable if it is not at the default Windows Chrome path. Node 22.18 and installed Chrome were used for the current candidate.

Current renderer evidence: **9 state tests, 10 cadence assertions and 37 browser checks passed**. Pointer/keyboard journeys cover settings, preset capture, save/reload, reset and error messages. Renderer checks cover pause/resume, transitions, reduced motion, high contrast, real intersection-based suspension, resource caps, cleanup and uncaught exceptions. Hidden-document and back/forward-cache lifecycle events are simulated; these checks do not certify physical GPU behavior or complete native OpsWolf acceptance. Desktop, daylight, narrow and high-contrast captures were visually reviewed. Local results/captures live under ignored `artifacts/` and are not required by a public clone.

## Versions and publication

The standalone package is **0.1.0**, private and unreleased. Renderer source is reviewed at `c976189e3ec78d0f902a27e5aacf33470c38ebd8`. OpsWolf independently packages those bytes as plugin **0.1.2**, verified/imported in the owner-activated **0.1.0-dev.9** host. The older plugin **0.1.1** used renderer `4d68d1f`; that is historical evidence, not the current pin. These source, plugin and host identities are distinct. Documentation edits do not retarget packages or authorize deployment.

The standalone source is published on [`review/2026-10-30-local-work`](https://github.com/ThornsOfire/OpsWolf-Code-Rain/tree/review/2026-10-30-local-work). This main branch is a documentation landing page; use the source branch to run or develop the playground. Source push, a versioned release and a downloadable host plugin are separate actions requiring approval. The local server/tests never publish automatically.

## Known issues and requested work

- **F27, requested 2026-10-30:** show both blend endpoints in the bottom status area inside Rain settings, for example “Arctic relay → Amber terminal,” including clear loop direction/hold/pause feedback. The top preset dropdown alone made expected blending look like a persistence failure; the owner withdrew that BUG-013 interpretation. No persistence defect is established. This settings clarity improvement is not implemented; the separate BUG-011 frame-drop report remains open.
- **F28, requested 2026-10-30:** create named personal Rain presets from slider/color/character configurations in OpsWolf settings, save them into the dropdown and edit them later. Include explicit update/Save as new and rename/delete management. The standalone playground already supports basic capture/removal of eight personal presets; full editing and OpsWolf support remain future work.
- **F29, recorded 2026-10-30:** the owner confirms clicking Save, but blend options still do not persist through app restarts. Requested saved configuration includes duration, hold, loop and destination selection where applicable; individual resets and stored values have not been independently checked. Restoring these options is separate from automatically resuming playback. Not implemented.
- **F30, requested 2026-10-30:** select first/from and second/to blend configurations and edit each endpoint’s sliders/colors/characters independently. Keep endpoint drafts, current playback and explicit updates to saved presets distinct. Not implemented.
- **BUG-011:** the owner reports dropped frames during preset blending, with smooth motion again after completion. A later report confirms frequent hitching while the blend changes glyph density and tail/trail length; their contribution is unproven. Initially reported in Cursadex dev.5/plugin 0.1.2; cause and whether it predates dev.5 remain unverified. Open, separate from the corrected frame-limiter cadence.
- **BUG-004 follow-up, resolved for the reported Rain case:** the empty-editor host repair was integrated from dev.6 and remains in dev.9. Transparency with Code Rain is owner-accepted; cross-theme transparency remains open separately as BUG-012.
- **F26, requested only:** a generic control at the top of OpsWolf's explorer to open the active theme/background's existing settings, including Rain. Placement and capability handling remain to be designed; this is not implemented and must preserve settings drafts and explicit Save.
- **Windows screensaver idea, recorded 2026-10-30:** offer Code Rain as a Windows screensaver as well as the standalone playground and OpsWolf background. Capture only for now; packaging, settings and Windows integration remain to be explored. No implementation or installation is authorized by this note.

## Credit

The browser test driver is adapted from the MIT-licensed OpsWolf (formerly Cursadex) / Code-Codex test harness. See LICENSE. The renderer, playground and presets are independent from the native Codex application; this is an unofficial community project.

Cadence correction source notes and limits: [cadence](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/review/2026-10-30-local-work/docs/cadence.md). Host activation is local owner testing; no public renderer/plugin release is implied.
