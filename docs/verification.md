# Code Rain verification and handoff

Updated 2026-10-30. Nothing here authorizes publication.

## Current status

Standalone **0.1.0** is private/unreleased. The reviewed renderer source is `c976189e3ec78d0f902a27e5aacf33470c38ebd8`. Rain plugin **0.1.2** remains normally verified/imported in the owner-activated OpsWolf **0.1.0-dev.9** host. Source push, release tags and downloadable packages remain separate, unperformed publication actions.

The owner confirms the flyout opacity is correct and Changes is translucent, retaining their present opacity. The empty-editor host repair was integrated from dev.6 and remains in dev.9; the owner confirms transparency with Code Rain. Transparency with other themes remains open. General glyph motion appears smoother, but **BUG-011** records frame drops during preset blending. Full document/control readability, physical GPU behavior and all lifecycle/resize cases are not accepted by these observations alone.

This file records evidence summaries and exact local artifact identities. Ignored `artifacts/` bundles, screenshots, receipts and the separate Cursadex checkout are not shipped with a public clone and are not prerequisites for running this project. Historical local paths below are evidence labels, not links or portable build instructions. Use the [README](../README.md) for standalone commands and [cadence notes](cadence.md) for the renderer change.

## Artifact identities

| Artifact | Version / source | Status |
| --- | --- | --- |
| Standalone playground | package.json 0.1.0; renderer commit `c976189e3ec78d0f902a27e5aacf33470c38ebd8` | Local, private package, unreleased |
| Current OpsWolf Rain plugin | 0.1.2; same reviewed renderer commit, unchanged state/license | Normally verified/imported into dev.9; no published download |
| Owner-activated host | OpsWolf 0.1.0-dev.9, build `cursadex-0.1.0-dev.9-s7898857933d4` | Matching native/UI catalog, import and activation verified; reported appearance cases accepted, broader coverage limited |
| Historical Rain plugin | 0.1.1; renderer `4d68d1fcdddd458d08be1523497b4f2a7af57f55` | Previous reviewed package; not the current pin |
| Historical hosts | Runtime `0b47a7d`, then dev.1–dev.8 | Earlier evidence retained below; not the current host |

Current plugin `CodeCodex-background-code-rain-0.1.2.js` is **10,580 bytes**, SHA-256 `8e2909de7967c0d1a8432833c45c71320d08a9f3220d0c29a42f2bd84977cdae`. Renderer source is **8,130 bytes**, SHA-256 `cdb2918d07a442c8ede6157f0243a6afa5a188ca07348d184d62c20dc1004a83`; state and license retain their previous reviewed bytes. The dev.5 application handoff SHA-256 is `ef1f31fd4aaab5eee26266feca0b015126d79a7a455b63294dd561d55ccf9970`. These are separate artifact identities, not a public download offer.

Historical plugin 0.1.1 is **10,422 bytes**, SHA-256 `751c10db39c69748738c36cc8fce3e7cc8afaf1ab8e2dfe6cae08a26861af639`. Its identity and old sealed handoffs remain unchanged. Documentation edits never retarget plugin URLs or pins.

## Evidence collected

- Current reviewed renderer: **9 state tests, 10 cadence assertions and 37 standalone browser checks passed**. Controls, persistence, errors, transitions, resource limits, accessibility/lifecycle and cleanup are covered. Desktop/narrow/daylight/high-contrast captures and results are in ignored `artifacts/`. Some lifecycle events are simulated; physical GPU behavior is not certified.
- Plugin 0.1.2 passed **23 package checks**, including deterministic builds, exact source/provenance verification, tamper rejection, normal verification stamps and lifecycle behavior. No verifier was weakened. Source/package qualification and native host import are separate evidence.
- The coordinator's dev.5 combined run passed **26 commands** and **298 native tests**, with 2 existing opt-in tests ignored. The matching native catalog normally imported/verified all **27 plugins**, including Rain 0.1.2, and owner activation was verified. The sealed application inventories 1,000 artifacts; operational verification checks 54 assets. Neither inventory counts nor import success establish visual acceptance.
- Earlier Cursadex checkpoints separately passed 24 controller checks, 23 package/startup checks, 33 production UI checks (19 Rain-specific), 31 source/pin checks and 160 shared-surface checks. Later focus and layered-surface evidence is retained below. These are separate suites at recorded snapshots, not a single summed acceptance score.
- The dev.9 host's combined checks pass all 28 commands; 1,011 artifacts and 54 operational assets verify. Its manifest SHA-256 is `9a883f7e531d09d5e27adaf3c1185e428097e8cc4f4d6fdf65d7558d94d9f94b`. The dev.5 figures above remain historical evidence, not dev.9 counts. Rain/native package identities are unchanged.
- Publication of this checkout's newer source remains pending review. The configured public remote has a separate main branch; do not overwrite it or infer publication state from its existence.

## Owner live checklist

**Current owner evidence through 2026-10-30, dev.9 / Rain 0.1.2:** Rain renders; flyout/Changes opacity and empty-editor transparency with Code Rain are accepted. Motion is generally smoother, with blend-only drops still open. The inactive-window pause also has an earlier owner live pass for the reported case. These observations do not complete the individual checks below or establish compatibility with other themes.

The earlier dev.4 flyout/Changes failures led to host surface repairs from dev.5. The solid empty-editor placeholder was repaired from dev.6 and retained in the current host; its original investigation is historical. Cross-theme transparency remains separate.

In Cursadex: Preview Market → Appearance → Code Rain, then its sliders control. A download/install prompt is not expected for this already imported candidate; preserve its message rather than fetching another build.

- [ ] Enable Rain: chat, tree, editor and native Changes remain readable and clickable.
- [ ] Change speed, density, glyph size and colors; documents and composer drafts stay intact.
- [ ] Apply a preset, blend, pause/resume and Stop blend. Interface/rain colors follow their documented ownership.
- [ ] Explicitly Save a harmless configuration, close/reopen settings and check values/dirty feedback. Unsaved changes must not silently replace the saved snapshot.
- [ ] Resize at your usual zoom. Reopening a settings panel closed by native market resize preserves its session values.
- [ ] Disable Rain: the prior appearance returns while Rain still owns its override. A manual native appearance change wins instead of being overwritten.
- [ ] On the next normal restart, check selected background and saved settings. Playback pause/blend timing is session-only. Keep other agents' work clear of that restart.
- [ ] Observe normal responsiveness and readability on your hardware. Resource caps do not guarantee a particular GPU/CPU load.
- [ ] Characterize BUG-011: compare steady, blending and completed playback at the same settings; record preset pair, duration, panel visibility and frame timings before inferring a cause.
- [ ] Broaden empty-editor checks beyond the accepted Code Rain case: docked/fullscreen, disable restoration, retained drafts/controls and other themes. The current host already includes the repair; another restart does not add cross-theme support.

For a failure, record host commit/version, plugin version, steps, expected/actual behavior and whether the standalone playground reproduces it. Diagnose before changing pinned assets. Host recovery restores UI/companion launch selection, not source edits or drafts; no live crash/recovery cycle has been performed.

## Known issues and future host work

- **BUG-011, open:** in dev.5/plugin 0.1.2 the owner reports preset change → Save → Start blend temporarily drops frames, then motion is smooth after completion. Only owner visual evidence is available. Cause, exact timings and whether this predates dev.5 remain unknown; it is not a confirmed regression or a completed optimization.
- **BUG-004, empty-editor follow-up:** source cause and an isolated fix are established below, but the fix is unintegrated and undeployed. Retain the accepted flyout and current Changes/file-tree levels.
- **F26, requested only:** a generic control at the top of Cursadex's explorer should open the currently active theme/background's existing settings, including Rain. Placement, supported capabilities and no-active-effect behavior remain to be designed. Preserve drafts and explicit Save; do not introduce a second settings store or autosave. This is not implemented or authorized for implementation by recording it here.

## Historical host repair review checkpoint — dev.2

The following records describe the earlier review snapshot and its then-current host, not today's dev.5 deployment.

BUG-003/004/005 have host-only source repairs and an isolated Cursadex 0.1.0-dev.2 review build, based on host commit 6e010a6 plus explicitly hashed working files. The settings fix accounts for border-box size and inherited zoom; the hover flyout gets a solid Rain-only backing; the docked editor and native Changes use their intended background layers. Expanded sidebar styling and document/control colors remain unchanged. See the sibling Cursadex integration guide and `artifacts/rain-review/review-manifest.json` for exact source/build hashes.

Evidence at that checkpoint: 20 focused layout/sidebar checks, 51 native Changes checks, 33 production UI checks (19 Rain), 23 package checks, 160 shared surfaces, 24 controller checks and 31 startup/pin checks; TypeScript, version, architecture and changelog structure passed. These were synthetic; live acceptance was then pending. The standalone renderer/state/license and Rain plugin pins/bytes were not changed by those host-only repairs. Existing 9/37 standalone evidence was not rerun for them.

The historical review UI SHA-256 is `ee74d4bcb54d9d213389cad3ed625807edec502ab531477bfeabe9ddb6bb72c1`. At review time that snapshot was neither installed nor selected; runtime `0b47a7d` was active. Later staging verified 50 assets and normally imported 27 plugins without changing the active launcher. These records do not identify the current application or authorize activation/publication.

## Later publication

Review source/docs first, then explicitly authorize a push. Source push, release tags and downloadable verified host plugins are independent deliverables. A renderer update requires a separate pin/package review in Cursadex; never change a published URL's expected bytes to make an old package appear current.

## Historical inactive-window pause component — now integrated

Owner requested a default-on **Pause when window is inactive** checkbox. Host-only implementation was isolated in integrate-only component `cursadex-code-rain-0.1.0-dev.2-focus.1-s24d7389dbe16`, then integrated into dev.4 and retained in dev.5. It preserves manual pause, freezes blend time, saves the opt-out only through explicit Save, accepts older settings with the default on, and removes listeners on disable/disposal. That component did not change the then-pinned renderer/plugin. Eighteen focus, 24 runtime, 36 production UI and 20 layout checks passed; build, types and architecture passed. Owner feedback confirms the reported inactive-window pause case; exhaustive Windows focus/minimize and persistence acceptance is still incomplete.

Historically this option was absent from sealed dev.3 and required the separate coordinator integration later completed in dev.4. Its original frozen local evidence label is `artifacts/handoffs/cursadex-code-rain-0.1.0-dev.2-focus.1-s24d7389dbe16/handoff.json`; that ignored bundle is not a public-clone prerequisite.

## Historical dev.4 opacity failures — repairs integrated in dev.5

BUG-003/004 were reopened after owner failures in dev.4. Live public-DOM inspection qualified the peeking state/overflowing menu and additional opaque Changes layers. Follow-up `cursadex-code-rain-0.1.0-dev.4-surfaces.1-s664e73047134` was source-ready/integrate-only, with 11 targeted and 160 shared-surface checks passed. A bounded temporary live Changes CSS check reached the identified layers and was removed. At submission it changed no shared source, renderer/package or deployed build; the coordinator later integrated these repairs into dev.5. The owner now accepts the flyout and requests retaining current Changes opacity. Original local evidence label: `artifacts/handoffs/cursadex-code-rain-0.1.0-dev.4-surfaces.1-s664e73047134/handoff.json`.

## Historical cadence qualification — now deployed in dev.5

Renderer cadence correction is locally committed at `c976189e3ec78d0f902a27e5aacf33470c38ebd8`; standalone stays 0.1.0 private/unreleased. The sealed integrate-only component `cursadex-code-rain-0.1.2-cadence.1-s03e9b9654b97` captured exact source/provenance and plugin 0.1.2 with the hashes/sizes in the current table above. State/license matched previous reviewed bytes. Submission itself did not change the then-existing 0.1.1 pin/cache/URLs. Coordinator integration subsequently advanced the current catalog to 0.1.2 without retargeting the historical package identity.

Ten cadence assertions, 9 state tests, 37 browser checks and 23 package checks passed. The existing verifier rejects tampering and produces deterministic 0.1.2 bytes; no trust check was weakened. The matching native/UI catalog and normal import were pending at component submission and were later verified for owner-activated dev.5. Broader physical smoothness/GPU acceptance remains open, including BUG-011. Stable 30 FPS can cost more work than the erroneous 20 FPS behavior; no GPU-use reduction is claimed. Presets, opt-ins and workload caps remain unchanged. No redundant-host-work experiment was included. Surfaces.1 remains a separate sealed historical component. No source push, release tag or public package publication has occurred.

## Empty editor follow-up / dev.5 owner feedback

Owner accepts the current flyout opacity and, after reconsidering left/right, requests no Changes-opacity adjustment. Empty editor remains solid: its `.editor-empty` placeholder independently paints the theme background and was omitted by Rain's transparency rules. Component `cursadex-code-rain-0.1.0-dev.5-empty.1-sc88facfbf3e0` adds only a Rain-specific placeholder clear inside `forced-colors:none`; current Changes/tree/flyout levels stay unchanged. Eight focused, 11 existing layered-surface and 160 shared-surface browser checks pass. These are synthetic; the component changed no shared runtime source, host, plugin or launcher. Frozen local evidence label: `artifacts/handoffs/cursadex-code-rain-0.1.0-dev.5-empty.1-sc88facfbf3e0/handoff.json` (ignored, not supplied by a public clone). Coordinator must merge the CSS delta plus supplied Unreleased/guide note and build a new application; owner then checks empty docked/fullscreen editor, restoration and retained controls/drafts. No restart for this component alone.
