# OpsWolf Code Rain

Code Rain is a customizable falling-glyph background. Use it inside OpsWolf or run the standalone browser playground to try colors, motion and blends without changing your desktop.

## From a human to a human

**Looking for the code?** Use [the development source](https://github.com/ThornsOfire/OpsWolf-Code-Rain/tree/review/2026-10-30-local-work). This homepage branch carries the project overview.

Pick a palette, move a few sliders and see what happens. Quiet green terminal, cold blue rain, warm amber glow. There's room to make it yours. Just keep an eye on the blend controls; they can take the rain somewhere different from the preset name you're looking at.

### What you can do

- Start with Woodland signal, Arctic relay, Amber terminal or Daylight circuit.
- Change rain colors, leading characters, glow, speed, density, glyph size, trail length, brightness and opacity. You can supply your own characters too.
- Blend from the current rain toward a selected preset, set how long it takes, add a hold and loop there and back. **Pause** freezes the animation and blend; **Stop blend** keeps the appearance reached so far.
- In OpsWolf, Rain pauses when its window is inactive by default. You can turn that option off in settings.
- In the standalone playground, adjust the interface colors separately and capture up to eight named personal presets. Personal preset management is **not yet in OpsWolf's Rain settings**.

### Turn it on in OpsWolf

If you already have an OpsWolf build with Code Rain installed:

1. Open the **OpsWolf application menu at the top** and choose **Preview Market**.
2. Open **Appearance**, find **Code Rain Background** and click **Enable**.
3. Click the **sliders icon** beside it to open Rain settings.
4. Select a preset and click **Apply**, or adjust the controls yourself.
5. Click **Save** to keep the current Rain appearance for next time.

Reopen settings through the same menu path. **Disable** on the Rain card turns it off; **Pause** only freezes playback. The old Preview Market link in the explorer footer has been removed.

These controls belong to OpsWolf, not stock Codex. **This is still developer-alpha software, not a one-click Windows download.** There is no ready-to-run Rain installer or published host-plugin download. Setting up OpsWolf requires the official Codex desktop app and a source build using the Node.js, Rust and Windows C++ tools in the [OpsWolf setup guide](https://github.com/ThornsOfire/OpsWolf/tree/candidate/planned-development#readme). Fresh-machine setup has not yet been validated; if those tools are unfamiliar, this isn't a finished installer experience yet.

The locally tested **OpsWolf 0.1.0-alpha.3** repair has owner-confirmed Rain startup, Enable/Disable, retained current saved settings and previous-theme restoration. It repairs a connection broken by a Codex update; future updates can still need compatibility work. The repair is included in the OpsWolf alpha.3 source checkpoint. Use that source branch when building; a source push is not a ready-to-run release.

### Or try the standalone playground

This route doesn't need Codex or OpsWolf. Get the [Code Rain source branch](https://github.com/ThornsOfire/OpsWolf-Code-Rain/tree/review/2026-10-30-local-work), have Node.js installed, and open a terminal in its folder:

```sh
node serve.mjs
```

Open **http://127.0.0.1:4179** in your browser. Leave the terminal open while using it; **Ctrl+C** stops the server. If the port is busy, use `node serve.mjs 4180` and open port 4180 instead. No dependency installation is needed. Opening `index.html` directly isn't the supported route.

The standalone **Match interface** checkbox also applies the selected preset's interface colors; otherwise only the rain changes. **Capture as preset** adds a named personal preset for the session. **Save locally** keeps the current rain, interface and personal presets in that browser. **Reset current** changes the session; it doesn't erase the saved snapshot unless you save afterward.

### Take a look

These are genuine standalone browser captures using the included presets, not screenshots of Rain inside OpsWolf. They show the controls and appearance, not animation smoothness. [Capture provenance](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/images/README.md).

![Woodland signal rain beside the palette and motion controls](https://raw.githubusercontent.com/ThornsOfire/OpsWolf-Code-Rain/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/images/woodland-control-room.png)

*Woodland signal with the rain palette and motion controls open.*

![Arctic relay rain with the preset selector and blend controls open](https://raw.githubusercontent.com/ThornsOfire/OpsWolf-Code-Rain/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/images/arctic-blend-controls.png)

*Arctic relay with Match interface enabled and blend controls open. No blend is running in this capture.*

### What still needs work

- **Blending can hitch.** This remains noticeable in reported blends that change density and trail length. Their contribution hasn't been measured; the earlier frame-pacing correction didn't resolve all blend performance issues.
- **Blend options don't persist yet, even after Save.** Duration, hold, loop and blend selection/configuration need their own persistence work. Saving the current Rain appearance is different from saving those options or resuming playback.
- **Blend feedback needs to be clearer.** The top dropdown selects a preset; it doesn't describe both ends of an active blend. Named from/to labels, independently editable endpoints and custom preset creation/editing in OpsWolf are requested, not implemented.
- **Theme compatibility is limited.** Rain's reported editor/Changes/flyout transparency cases have owner acceptance. Transparency under other themes remains a separate open issue.
- **Performance depends on your machine.** Animation is capped at 30 drawn frames per second and stops for supported pause/visibility/accessibility conditions. That isn't a guarantee of smooth playback or low GPU usage on every display.

Direct access to the active theme's settings at the top of the explorer and a Windows screensaver version are also recorded ideas. Neither is implemented. The [verification guide](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/verification.md) and [cadence notes](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/cadence.md) retain detailed evidence; some historical deployment summaries there predate the alpha.3 status above.

### Settings, privacy and credit

Changes stay in the session until you explicitly save. The standalone playground uses local browser storage, has no account, analytics or downloaded assets, and makes no external network requests. Its server listens only on your own machine. A different browser, profile or server port has separate saved settings. Storage failures are reported without discarding the working session. These statements describe Rain; they don't change Codex's or OpsWolf's own network behavior.

Rain settings are separate from interface colors. The renderer respects reduced motion and high contrast, and disabling the embedded background restores the previous appearance only while Rain still owns that change. A manual appearance change takes priority. The standalone app does not change your wallpaper or Windows settings.

Code Rain is unofficial community software, independent of OpenAI. It is [MIT licensed](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/LICENSE); its browser test driver is adapted from the MIT-licensed [Code-Codex](https://github.com/Rice-dog/code-codex) / OpsWolf test harness. Thanks to the upstream contributors whose work made the integration possible.

## For agents, from an agent

### Source and artifact identities

| Item | Identity / boundary |
| --- | --- |
| Implementation branch | `review/2026-10-30-local-work`; published Code Rain source checkpoint `cea52a0`. `main` is the documentation landing page. |
| Standalone package | `package.json` version **0.1.0**, `private: true`; source is public, package/binary release is unreleased. No npm install step. |
| Reviewed renderer | `c976189e3ec78d0f902a27e5aacf33470c38ebd8`; 8,130 bytes, SHA-256 `cdb2918d07a442c8ede6157f0243a6afa5a188ca07348d184d62c20dc1004a83`. |
| Embedded plugin | **0.1.2**, 10,580 bytes, SHA-256 `8e2909de7967c0d1a8432833c45c71320d08a9f3220d0c29a42f2bd84977cdae`; independently versioned and normally verified/imported. Historical 0.1.1 used `4d68d1f`; never retarget its bytes/URL. |
| Host | Local owner-tested OpsWolf **0.1.0-alpha.3**, attached Codex Windows package **26.1027.3384.0**; host source checkpoint **0.1.0-alpha.3** on `candidate/planned-development`. Host, upstream, plugin and renderer versions are distinct. |
| Host acceptance | Startup, Enable/Disable, retained current settings and prior-theme restoration confirmed by owner. Not universal monitor/GPU, restart, theme or future-host compatibility. |

### Portable commands

From a fresh source checkout, with Git and an installed Node.js runtime (22.18 used for recorded tests):

```sh
git clone --branch review/2026-10-30-local-work https://github.com/ThornsOfire/OpsWolf-Code-Rain.git
cd OpsWolf-Code-Rain
node serve.mjs
```

Run checks from the repository root:

```sh
node --test tests/state.test.mjs
node --test tests/cadence.test.mjs
node tests/browser.test.mjs
```

Recorded renderer evidence: **9 state tests, 10 cadence assertions, 37 browser checks**. Browser checks require installed Chrome, use a disposable profile and loopback server, and never download a browser. `CHROME_PATH` can select its executable. Hidden-document and back/forward-cache cases are simulated. Standalone fixtures do not establish native acceptance. See [verification](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/verification.md), [cadence](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/docs/cadence.md) and [changelog](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/CHANGELOG.md).

### Ownership, persistence and integration

| Source | Responsibility |
| --- | --- |
| `src/renderer.mjs` | Canvas, interpolation, resource budgets, media/visibility lifecycle and disposal; no Codex internals. |
| `src/state.mjs` | Validated settings, shipped presets, transitions and bounded standalone persistence. |
| `src/app.mjs`, `index.html`, `style.css` | Standalone controls, accessibility, explicit Save/reset and navigation lifecycle. |
| `serve.mjs` | Read-only static server on `127.0.0.1`; default 4179, supported port range 1024–65535. |

- Renderer API: `CodeRain(container, settings, {onTransition, onState, frameScheduler})`; `setSettings`, `setPaused`, `startTransition`, `stopTransition`, `state`, `dispose`. Host owns the container, persistence and disposal. Optional scheduler requires both `request(callback)` and `cancel(ticket)`; nonzero numeric tickets may be negative, callbacks are asynchronous/monotonic, cancellation tolerates settled tickets/zero. No browser-global patching.
- Budgets: 30 drawn FPS, 140 columns, 1,200 glyph draws/frame, 2560×1440 backing pixels, DPR ≤1.5, elapsed update ≤100 ms; skip missed deadlines rather than catch up. Suspend on pause/hidden/offscreen/reduced-motion/forced-colors; dispose observers/listeners. More consistent 30 FPS can cost more work than the former cadence defect.
- Standalone storage: `opswolf:code-rain:v1`, schema `version:1`; explicit Save stores current rain, interface and up to eight personal presets. Playback/transition timing is not stored. Invalid, oversized, unsupported or inaccessible storage must not overwrite the user's prior snapshot. Interface validation rejects text contrast below 4.5:1 and accent/focus below 3:1 for the checked solid color pairs, not all composited content.
- Embedded storage: technical key `cursadex:code-rain:v1`, schema 1, separate from standalone. Host stores current Rain snapshot and default-on `pauseWhenUnfocused` through explicit Save; blend options remain session-only. Personal preset capture/editing is not exposed by the current embedded settings. Preserve legacy storage/event/CSS identifiers; a product-name change is not a migration.
- Host appearance repair: capability-checked same-origin initial/shared/dispatcher roles, bounded discovery, guarded metadata inspection and intrinsic RPC invocation; preserve theme leases, cancellation and safe failure. Unknown host interfaces must fail clearly, not force a theme. See the [OpsWolf integration guide](https://github.com/ThornsOfire/OpsWolf/blob/candidate/planned-development/docs/editor/code-rain-integration.md); published guide/source may lag locally accepted alpha.3.
- Open records: BUG-011 blend hitching; BUG-012 other-theme opacity; F26 direct active-theme settings; F27 endpoint feedback; F28 personal preset editing; F29 saved blend options; F30 editable A/B endpoints; Windows screensaver idea. BUG-013's original color-loss interpretation was withdrawn. Alpha.3 owner acceptance covers the repaired BUG-017 host connection, not these separate requests.
- Workflow: follow [AGENTS.md](https://github.com/ThornsOfire/OpsWolf-Code-Rain/blob/3f118c8bbf2602cdec7b6578827a02cb49a73f0c/AGENTS.md). Inspect status/source and preserve unrelated drafts. No dependencies/assets from the network. A renderer change needs deliberate provenance and independent host-package validation; preserve existing pins. Component handoffs are integrate-only; the coordinator owns shared host version/build/activation/rollback. Do not mutate sealed/running builds or publish/restart without authorization. When a workspace deployment standard is present, follow it; public clones must not depend on private workspace paths or ignored evidence bundles.
