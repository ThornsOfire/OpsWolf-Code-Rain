# Code Rain verification and handoff

Updated 2026-10-29. Nothing here authorizes publication.

## Artifact identities

| Artifact | Version / source | Status |
| --- | --- | --- |
| Standalone playground | package.json 0.1.0; tested renderer commit 4d68d1f | Local, private package, unreleased |
| Cursadex background plugin | 0.1.1; same pinned renderer/state/license source | Built/imported with normal hash verification; no published download |
| Currently activated host | Cursadex runtime 0b47a7d | Includes Rain; live effect acceptance pending |
| Later host footer build | Cursadex 0.1.0-dev.1, upstream 0.5.40 | Separate host identity; no Rain renderer/package change |

The reviewed 10,422-byte plugin package has SHA-256 `751c10db39c69748738c36cc8fce3e7cc8afaf1ab8e2dfe6cae08a26861af639`. Future documentation commits do not change that source pin or package identity.

## Evidence collected

- **9 state tests and 37 standalone browser checks passed** at the renderer checkpoint. Controls, persistence, errors, transitions, resource limits, accessibility/lifecycle and cleanup are covered. Desktop/narrow/daylight/high-contrast captures and results are in ignored `artifacts/`. Some lifecycle events are simulated; physical GPU behavior is not certified.
- Cursadex separately passed 24 controller checks, 23 package/startup checks, 33 production UI checks (19 Rain-specific), 31 source/pin checks and 160 shared-surface checks at its recorded checkpoints. These are separate suites, not a single summed acceptance score.
- Native offline import accepted the exact package and verified its cached bytes. All 27 host plugins were later imported/verified for owner activation. Import success is not proof of readability over real documents.
- Source publication has not occurred. The configured public remote being empty is consistent with the review hold, not absence of implementation/tests.

## Owner live checklist

In Cursadex: Preview Market → Appearance → Code Rain, then its sliders control. A download/install prompt is not expected for this already imported candidate; preserve its message rather than fetching another build.

- [ ] Enable Rain: chat, tree, editor and native Changes remain readable and clickable.
- [ ] Change speed, density, glyph size and colors; documents and composer drafts stay intact.
- [ ] Apply a preset, blend, pause/resume and Stop blend. Interface/rain colors follow their documented ownership.
- [ ] Explicitly Save a harmless configuration, close/reopen settings and check values/dirty feedback. Unsaved changes must not silently replace the saved snapshot.
- [ ] Resize at your usual zoom. Reopening a settings panel closed by native market resize preserves its session values.
- [ ] Disable Rain: the prior appearance returns while Rain still owns its override. A manual native appearance change wins instead of being overwritten.
- [ ] On the next normal restart, check selected background and saved settings. Playback pause/blend timing is session-only. Keep other agents' work clear of that restart.
- [ ] Observe normal responsiveness and readability on your hardware. Resource caps do not guarantee a particular GPU/CPU load.

For a failure, record host commit/version, plugin version, steps, expected/actual behavior and whether the standalone playground reproduces it. Diagnose before changing pinned assets. Host recovery restores UI/companion launch selection, not source edits or drafts; no live crash/recovery cycle has been performed.

## Later publication

Review source/docs first, then explicitly authorize a push. Source push, release tags and downloadable verified host plugins are independent deliverables. A renderer update requires a separate pin/package review in Cursadex; never change a published URL's expected bytes to make an old package appear current.
