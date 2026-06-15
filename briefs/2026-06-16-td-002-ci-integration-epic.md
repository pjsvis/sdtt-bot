# brief: CI Integration for SDTT‑Bot

**Created:** 2026-06-16
**TD:** TD-002
**Status:** complete (CI workflow deferred — token lacks workflow scope)

## What
Integrate the unified registry checks (`reg‑check`, `reg‑sync`) and the prototype test harness into the CI pipeline (`just check`).

## Why
Ensures every commit validates the map (registry) and the agent’s bootstrap workflow, preventing drift and hidden entropy.

## How
1. Extend `justfile` with a `check` target that runs:
   - `bun scripts/reg‑check.ts`
   - `bun scripts/reg‑sync.ts --all --fix`
   - `bun scripts/prototype-test.ts`
2. Add the new `check` target to the repository’s CI configuration (GitHub Actions or similar).
3. Verify that a failing registry sync aborts the CI run.

## Acceptance criteria
- `just check` runs all three scripts and exits with status 0 on a clean repo.
- CI pipeline fails if any script reports an error.
- Documentation updated to describe the new `just check` command.

## Out of scope
- Adding unrelated linting or formatting checks.
- Changing the repository’s testing framework beyond the prototype harness.
