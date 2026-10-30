# Cadence correction (unreleased)

Current status, 2026-10-29: standalone **0.1.0** stays private/unreleased. Reviewed renderer commit is `c976189e3ec78d0f902a27e5aacf33470c38ebd8`; Cursadex's separate Rain plugin **0.1.2** was normally verified/imported into the owner-activated **0.1.0-dev.5** host. The owner reports generally smoother motion, with an open blend-only frame-drop report (**BUG-011**). See [verification](verification.md) for identities and acceptance limits, and the [changelog](../CHANGELOG.md) for scope. Local activation is not public publication.

The 30 FPS limiter now keeps draw deadlines on a fixed cadence rather than restarting its interval after a late draw. A 0.5 ms timestamp tolerance absorbs boundary rounding; actual elapsed draw time still drives movement and blends. Missed deadlines are skipped, never rendered in catch-up bursts. Elapsed updates remain capped at 100 ms. Pause/hidden/offscreen/media suspension resets deadlines on resume.

From the repository root, run `node --test tests/cadence.test.mjs` for 10 assertions covering 60/59.94/120/144 Hz timestamp cases with and without 0.2 ms jitter, plus long-stall/resume checks. The original implementation reproduced 20–23 FPS on nominal 60 Hz timestamps. The correction holds about 30 FPS in those cases. Nine state tests and 37 browser checks also pass, covering settings, blending, suspension, workload limits and cleanup. These are deterministic/browser fixtures, not proof of physical monitor/GPU or native-host smoothness.

No preset, color, glow, density, speed, glyph, resolution, frame-rate budget, UI or saved-state defaults changed. More consistently drawing 30 frames can cost more GPU work than the buggy lower frame rate. This is a pacing correction, not a GPU-utilization reduction. Closed-panel UI refresh/root-color experiments are excluded.

The independent plugin/provenance update and matching host build/import have now been completed for local dev.5. Historical plugin **0.1.1**, pinned to `4d68d1f`, retains its original bytes/identity; its URL was not retargeted. Any future renderer change still requires deliberate source/provenance review, an independent plugin identity and matching host validation. Host build/import/activation remain coordinator-owned.

BUG-011's reported sequence is preset change → Save → Start blend: animation appears to drop frames during the blend and becomes smooth again afterward. Frame intervals, exact preset pair, panel visibility and GPU/CPU cost have not been independently captured. The cause and whether this existed before dev.5 are unknown. No blend-specific fix or resource-use improvement is claimed.

The separate **F26** request for top-of-explorer access to an active theme/background's settings is future host UI work, not part of this renderer correction and not implemented.
