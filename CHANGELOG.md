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

- The 30 FPS renderer now keeps fixed draw deadlines with a small timestamp tolerance, avoiding extra skipped frames at common refresh rates. Actual elapsed time still drives motion/blends, missed deadlines do not cause catch-up bursts, and suspension resets timing. This corrects pacing; it does not establish lower GPU use or resolve the reported blend-only frame drops.
- High-contrast status now settles when the frame callback observes a changed media state before its change event arrives.

### Limitations

- Standalone **0.1.0** remains private/unreleased, with reviewed renderer source `c976189e3ec78d0f902a27e5aacf33470c38ebd8`. The separate owner-activated OpsWolf **0.1.0-dev.9** host uses normally verified/imported Rain plugin **0.1.2**. Historical plugin **0.1.1** pinned `4d68d1f`. See [verification](docs/verification.md) for exact identities, evidence and remaining live checks. No source push or downloadable plugin release is implied.
- **BUG-011 remains open:** the owner reports temporary frame drops while blending presets, followed by smooth motion after completion. No independent reproduction or established cause; this is separate from the corrected cadence limiter.
- Host flyout/Changes opacity and empty-editor transparency with Code Rain are owner-accepted. The empty-editor host repair was integrated from dev.6 and remains in dev.9; transparency with other themes is still open.

### Requested work (not implemented)

- **F26:** generic access at the top of Cursadex's explorer to the active theme/background's existing settings, including Rain. Placement, supported capabilities and no-active-effect behavior remain to be designed, preserving drafts and explicit Save. This is a recorded request, not shipped functionality or implementation authorization.
