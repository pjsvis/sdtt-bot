# brief: Bootstrap SDTT‑Bot

**Created:** 2026-06-16
**TD:** TD-001
**Status:** pending

## What
Implement and test a minimal prototype of the SDTT‑Bot that can run `just orient`, sync the unified registry, and expose the three `just` commands (`help`, `about`, `orient`).

## Proposed model
NVIDIA hosted model `nvidia/nemotron-3-nano-30b-a3b:free` – a lightweight, locally‑runnable LLM suitable for text‑only interactions.

## Why
Validates the new `justfile` façade, the registry scripts, and the overall agent‑ready process. Provides a concrete target for the next sprint and a reference implementation for future extensions.

## How
1. Ensure `just orient` runs without errors and updates all `INDEX.jsonl` files.
2. Write a test harness (`scripts/prototype-test.ts`) that:
   - Calls `bun scripts/orient.ts` and checks exit code 0.
   - Verifies that `playbooks/REGISTRY.jsonl` exists and contains at least one entry.
   - Runs `bun scripts/help.ts` and captures its output.
3. Add the test harness to the `just check` pipeline.
4. Document the prototype in `docs/prototype.md` and link from `README.md`.

## Acceptance criteria
- `just orient` succeeds and updates the registry.
- `just help` prints the three command descriptions.
- `scripts/prototype-test.ts` exits with status 0.
- CI passes the new test step.
- Documentation (`docs/prototype.md`) is added and linked.

## Out of scope
- Full implementation of the SDTT‑Bot core logic beyond bootstrap.
- Integration with external services or model providers.
- UI/UX polish of the command output.
