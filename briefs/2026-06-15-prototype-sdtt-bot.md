# brief: Prototype SDTT‑Bot

**Created:** 2026-06-15
**TD:** td-12345
**Status:** pending

## What
Implement and test a minimal prototype of the SDTT‑Bot that can run the `just orient` workflow, sync the unified registry, and expose the three `just` commands (`help`, `about`, `orient`).

## Why
A working prototype validates the new `justfile` façade, the registry scripts, and the overall agent‑ready process. It provides a concrete target for the next sprint and a reference implementation for future extensions.

## How
1. Add the `justfile` with `help`, `about`, `orient` commands (already done).
2. Ensure the registry scripts (`reg-sync.ts`, `reg-list.ts`, etc.) are executable and pass type‑checking.
3. Write a simple test harness (`scripts/prototype-test.ts`) that:
   - Calls `bun scripts/orient.ts` and checks exit code 0.
   - Verifies that `playbooks/REGISTRY.jsonl` exists and contains at least one entry.
   - Runs `bun scripts/help.ts` and captures its output.
4. Add a CI step (e.g., `just check`) that runs the test harness.
5. Document the prototype in `docs/prototype.md`.

## Acceptance criteria
- `just orient` runs without errors and creates/updates all `INDEX.jsonl` files.
- `just help` prints the three command descriptions.
- `scripts/prototype-test.ts` exits with status 0.
- CI passes the new test step.
- Documentation (`docs/prototype.md`) is added and linked from `README.md`.

## Out of scope
- Full implementation of the SDTT‑Bot’s core logic beyond the bootstrap process.
- Integration with external services or model providers.
- UI/UX polish of the command output.
