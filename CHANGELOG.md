# Changelog

## Unreleased

### Added

- Optional frame scheduler capability for embedding hosts to hold/release animation without replacing browser globals. Pause, hidden lifecycle and disposal cancel host-owned frame tickets.
- Standalone Canvas 2D code rain with independent rain/interface colors, four presets, custom characters and bounded motion controls.
- Preset blending with duration, holds, looping, pause/resume and stop-at-current-values behavior.
- Eight personal preset slots, explicit local save, current/interface resets and readable storage/validation failures.
- Hidden/offscreen/reduced-motion/high-contrast lifecycle controls, bounded rendering workload and disposal.
- State and browser fixtures, including keyboard/pointer controls, persistence, resource limits and simulated navigation recovery.

### Fixed

- High-contrast status now settles when the frame callback observes a changed media state before its change event arrives.

### Limitations

- The separate Cursadex adapter is included in the owner's activated local test build and has integration fixtures; real-host readability, interaction and startup acceptance remain pending. Standalone 0.1.0 and host plugin 0.1.1 are separate identities. Source and downloadable plugin publication remain unapproved; this is not an installer or published release.
