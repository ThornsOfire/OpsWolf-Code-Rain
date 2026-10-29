# Changelog

## Unreleased

### Added

- Standalone Canvas 2D code rain with independent rain/interface colors, four presets, custom characters and bounded motion controls.
- Preset blending with duration, holds, looping, pause/resume and stop-at-current-values behavior.
- Eight personal preset slots, explicit local save, current/interface resets and readable storage/validation failures.
- Hidden/offscreen/reduced-motion/high-contrast lifecycle controls, bounded rendering workload and disposal.
- State and browser fixtures, including keyboard/pointer controls, persistence, resource limits and simulated navigation recovery.

### Fixed

- High-contrast status now settles when the frame callback observes a changed media state before its change event arrives.

### Limitations

- Cursadex integration and physical/native-host verification are pending. This is a local candidate, not an installer or a published release.
