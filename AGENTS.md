# Code-rain project rules

This is a standalone, dependency-free visual playground. Follow the workspace master plan during the active Cursadex run. No remote publication or installation into the working Codex instance without owner review.

- Keep the renderer separate from the controls, persistence and preset policy. Do not import Codex internals.
- Bound canvas pixels, glyph work and frame rate. Stop animation when paused, hidden, offscreen or reduced motion is requested. Dispose listeners and observers.
- Keep rain settings independent of interface colors. Save only after explicit user action. Validate storage before applying it; no network requests or downloaded assets.
- Test transition timing, invalid state, persistence failures, keyboard controls, reduced motion, resize and cleanup. Distinguish synthetic browser checks from native Cursadex integration.
- Preserve user data and the working Cursadex installation. Local test output belongs under ignored artifacts.
- Keep standalone package, Cursadex plugin and Cursadex fork versions distinct. See `docs/verification.md` for evidence/publication status. Documentation edits do not authorize changing Cursadex's pinned source/package or publishing assets; record exact tested commits and hashes for an authorized handoff.

## Deployment handoffs

- Follow the workspace `WorkspaceSetup/Deployment/README.md` standard when present. Public clones remain independent: exact source identity, immutable artifact hashes/sizes, evidence, dependencies, settings preservation and activation/rollback limits are the portable contract. Use ignored `artifacts/handoffs/` for local bundles.
- A standalone Rain app and a Cursadex Rain component are separate products/handoffs. Submit Cursadex work as an `integrate-only` component with only owned source and explicit included/excluded scope. A Rain-only review build does not contain concurrent Nova or chat fixes. Keep old review artifacts unchanged.
- Only the Cursadex coordinator owns its shared version, final combined build, activation manifest, launch helpers and rollback selection. Do not retarget pinned renderer/plugin assets, overwrite another agent's changes or update live launch controls. Freeze handed-off source or report a new replacement manifest.
- Source readiness is not application staging. Record unavailable packaging tools as blockers; do not install/download, publish, restart, enable hooks or activate without owner authorization. Distinguish fixture passes from live appearance/acceptance checks.
