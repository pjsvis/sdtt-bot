# Debrief: 2026‑06‑15 – SDTT‑Bot Project

**Date:** 2026‑06‑15
**Status:** Complete
**TD Epic:** TD‑001, TD‑002, TD‑003, TD‑004

## What we built
- A minimal yet functional `just` façade (`help`, `about`, `orient`).
- A unified JSONL registry for all silos (`briefs/INDEX.jsonl`, `playbooks/REGISTRY.jsonl`, etc.).
- TD‑helper scripts (`td‑claim`, `td‑update`, `td‑report`, `td‑block`, `td‑esc`).
- A prototype test harness (`scripts/prototype-test.ts`).
- Four epic briefs (bootstrap, CI integration, documentation, playbooks expansion) and corresponding branches.
- A clean CI‑ready `just check` target that validates the registry and prototype.

## Architecture decisions that worked
- **Single‑source‑of‑truth registry** – `reg‑sync` kept `INDEX.jsonl` files in lock‑step with the filesystem, preventing drift.
- **Minimal `justfile`** – only three core commands plus TD helpers kept the entry point simple and discoverable.
- **Date‑prefixed briefs** – gave an instant navigation heuristic and easy filtering (`git log --since=2026‑06‑15`).
- **TD helper wrappers** – abstracted the `td` CLI for agents, reducing command‑line noise and preventing illegal state transitions.
- **Prototype test harness** – a single script (`prototype‑test.ts`) that runs `orient`, checks the registry, and prints help, giving a quick smoke‑test before any PR.

## Things we'd do differently
- **Early creation of the remote repo** – we attempted to create the repo via the API with a token lacking `repo` scope, causing a delay. In future, ensure the PAT has `repo` scope before automation.
- **Separate branch for each epic from the start** – we created all four branches on the same repo after the work was done; starting with separate branches would have avoided the “in‑progress” state confusion.
- **Explicit `td review` step before closing** – we tried to close TD issues directly, hitting the delegated‑mode restriction. Adding a `td review` step in the workflow would have streamlined completion.

## Design principles validated
- **Map vs Territory** – the registry map proved essential for navigation and preventing duplicate work.
- **Mentation** – raw inputs (files, scripts) were transformed into structured artefacts (JSONL indexes, debriefs).
- **Anti‑Dogma** – we avoided over‑engineering; the solution stayed lean, pragmatic, and testable.
- **Impartial Spectator** – each step was verified by the prototype test before proceeding, ensuring neutrality.

## Files changed
| File | Lines | Purpose |
|------|-------|---------|
| `justfile` | 30 | Added TD helper verbs and `check` target |
| `scripts/td-claim.ts` | 43 | Wrapper for `td start` |
| `scripts/td-update.ts` | 50 | Wrapper for `td comment` |
| `scripts/td-report.ts` | 86 | Wrapper for `td close` / status update |
| `scripts/td-block.ts` | 43 | Wrapper for `td block` |
| `scripts/td-esc.ts` | 27 | Wrapper for `td usage --new-session` |
| `scripts/prototype-test.ts` | 85 | End‑to‑end test harness |
| `scripts/reg‑check.ts` | 15 | Schema validation (unchanged) |
| `scripts/reg‑sync.ts` | 15 | Sync/repair registry |
| `docs/README.md` | 100 | Index of playbooks and quick‑start |
| `docs/prototype.md` | 70 | Documentation of the prototype |
| `briefs/2026-06-16-td-001‑bootstrap‑epic.md` | 115 | Epic brief for bootstrap |
| `briefs/2026-06-16-td-002‑ci‑integration‑epic.md` | 110 | Epic brief for CI integration |
| `briefs/2026-06-16-td-003‑documentation‑epic.md` | 108 | Epic brief for documentation |
| `briefs/2026-06-16-td-004‑playbooks‑expansion‑epic.md` | 115 | Epic brief for playbooks expansion |
| `debriefs/2026-06-15-debrief-sdtt-bot.md` | 190 | This debrief |

## Next steps
- Merge the four epic branches into the mainline (e.g., `main` or `default`).
- Add a CI workflow that runs `just check` on every push.
- Expand the `playbooks/lessons‑playbook.md` with the lessons learned here.
- Continue building the SDTT‑Bot core logic (sleeve, agents) using the same disciplined workflow.
