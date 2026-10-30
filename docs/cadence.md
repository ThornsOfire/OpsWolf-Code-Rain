# Cadence correction (unreleased)

The 30 FPS limiter now keeps draw deadlines on a fixed cadence rather than restarting its interval after a late draw. A 0.5 ms timestamp tolerance absorbs boundary rounding; actual elapsed draw time still drives movement and blends. Missed deadlines are skipped, never rendered in catch-up bursts. Elapsed updates remain capped at 100 ms. Pause/hidden/offscreen/media suspension resets deadlines on resume.

Run node --test tests/cadence.test.mjs for 60/59.94/120/144 Hz timestamp cases with and without 0.2 ms jitter, plus long-stall/resume checks. The original implementation reproduced 20–23 FPS on nominal 60 Hz timestamps. The correction holds about 30 FPS in those cases. Existing state/browser checks cover settings, blending, suspension, workload limits and cleanup. These are deterministic/browser fixtures, not proof of physical monitor/GPU or native-host smoothness.

No preset, color, glow, density, speed, glyph, resolution, frame-rate budget, UI or saved-state defaults changed. More consistently drawing 30 frames can cost more GPU work than the buggy lower frame rate. This is a pacing correction, not a GPU-utilization reduction. Closed-panel UI refresh/root-color experiments are excluded.

Standalone package remains private/unreleased 0.1.0. Cursadex integration requires a new reviewed renderer commit/provenance and independent plugin 0.1.2 identity; never replace 0.1.1 bytes or retarget its URL. Host build/import/activation remain coordinator-owned.
