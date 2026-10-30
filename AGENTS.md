# Code-rain project rules

This is a standalone, dependency-free visual playground. Follow the workspace master plan during the active Cursadex run. No remote publication or installation into the working Codex instance without owner review.

- Keep the renderer separate from the controls, persistence and preset policy. Do not import Codex internals.
- Bound canvas pixels, glyph work and frame rate. Stop animation when paused, hidden, offscreen or reduced motion is requested. Dispose listeners and observers.
- Keep rain settings independent of interface colors. Save only after explicit user action. Validate storage before applying it; no network requests or downloaded assets.
- Test transition timing, invalid state, persistence failures, keyboard controls, reduced motion, resize and cleanup. Distinguish synthetic browser checks from native Cursadex integration.
- Preserve user data and the working Cursadex installation. Local test output belongs under ignored artifacts.
- Keep standalone package, Cursadex plugin and Cursadex fork versions distinct. See `docs/verification.md` for evidence/publication status. Documentation edits do not authorize changing Cursadex's pinned source/package or publishing assets; record exact tested commits and hashes for an authorized handoff.
