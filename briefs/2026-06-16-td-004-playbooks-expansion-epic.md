# brief: Playbooks Expansion for SDTT‑Bot

**Created:** 2026-06-16
**TD:** TD-004
**Status:** pending

## What
Add the missing playbooks (`insights‑playbook.md`, `cli‑playbook.md`, `td‑playbook.md`, `debriefs‑playbook.md`, `playbooks‑playbook.md`, `justfile‑playbook.md`, `dev‑stack‑setup‑playbook.md`, `agent‑messages‑playbook.md`, `engine‑sleeve‑playbook.md`, `docs‑playbook.md`, `extensions‑playbook.md`, `pelvic‑calibration‑playbook.md`, `prompts‑playbook.md`, `single‑brief‑workflow‑playbook.md`, `justfile‑playbook.md`, `td‑playbook.md`, `insights‑playbook.md`) and ensure each is registered in the unified registry.

## Why
A complete set of playbooks gives agents a full map of the operating procedures, preventing accidental omission of critical steps and reducing entropy.

## How
1. Create each missing playbook file with a concise purpose and structure (as per existing playbooks).
2. Add an entry for each new playbook to `playbooks/REGISTRY.jsonl` (use `scripts/reg‑import.ts` or manual entry).
3. Update the `docs/README.md` index to list the new playbooks.
4. Run `bun scripts/reg‑sync.ts --all --fix` to verify the registry matches the filesystem.

## Acceptance criteria
- All listed playbooks exist in `playbooks/`.
- Each playbook has a corresponding entry in `REGISTRY.jsonl`.
- `docs/README.md` indexes the new playbooks.
- `just check` passes registry sync without errors.

## Out of scope
- Populating each playbook with full content beyond a placeholder description.
- Internationalisation of playbook titles.
