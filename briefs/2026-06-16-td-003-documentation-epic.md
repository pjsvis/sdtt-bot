# brief: Documentation for SDTT‑Bot

**Created:** 2026-06-16
**TD:** TD-003
**Status:** pending

## What
Create and link the core documentation files (`README.md`, `docs/prototype.md`, `docs/README.md`) and ensure they are referenced from the project root.

## Why
Provides a clear map for humans and agents, reducing the need to guess the purpose of files or commands. A well‑written README is the first line of defence against entropy.

## How
1. Write `docs/prototype.md` summarising the bootstrap prototype and its test harness.
2. Update the repository root `README.md` to include a “Quick‑Start” section that points to `just orient` and the three `just` commands.
3. Add a `docs/README.md` that indexes all playbooks and explains the unified‑registry workflow.
4. Link the new docs from the root `README.md` and from the `justfile` comments.

## Acceptance criteria
- `README.md` contains a “Quick‑Start” section with `just orient` instructions.
- `docs/prototype.md` exists and is referenced from the root README.
- `docs/README.md` lists all playbooks and explains the registry.
- All docs render without markdown errors (`markdownlint` passes).

## Out of scope
- Full API reference for the registry scripts (handled in separate playbooks).
- Internationalisation of documentation.
