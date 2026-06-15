# Playbook: Lessons Learned

## Purpose
Capture concise, actionable lessons from recent work so future agents and humans can benefit without re‑discovering them.

## Lessons

### 1. Registry as Single Source of Truth
- **What happened:** The unified JSONL registry prevented duplicate work and gave a clear map of what exists.
- **Why it matters:** Guarantees every agent sees the same view of the project; eliminates hidden files.
- **Action:** Always run `just check` (which calls `reg‑sync` and `reg‑check`) before starting new work.

### 2. Minimal `justfile` façade
- **What happened:** Keeping `justfile` to three core commands (`help`, `about`, `orient`) plus thin TD helpers kept the entry point discoverable.
- **Why it matters:** Reduces cognitive load and prevents the “dumping‑ground” anti‑pattern.
- **Action:** Add new commands only when a clear, reusable pattern emerges.

### 3. TD helper wrappers
- **What happened:** Scripts like `td‑claim.ts`, `td‑update.ts`, `td‑report.ts` abstracted the `td` CLI for agents.
- **Why it matters:** Prevents agents from entering illegal states (e.g., closing without review) and provides a uniform interface.
- **Action:** Use these wrappers for any future `td` interactions; extend them as needed.

### 4. Prototype test harness
- **What happened:** `scripts/prototype-test.ts` gave a fast smoke‑test that validated the registry, `just` commands, and help output.
- **Why it matters:** Early detection of broken tooling before PRs land.
- **Action:** Treat `just check` as a gate; add new checks here as the project grows.

### 5. Date‑prefixed briefs
- **What happened:** Filenames like `2026‑06‑15‑debrief‑sdtt‑bot.md` made navigation trivial and allowed quick filtering by date.
- **Why it matters:** Aligns with the “Map vs Territory” principle; users can locate recent work without full‑text search.
- **Action:** Enforce the naming convention for all future briefs and debriefs.

### 6. Token scope awareness
- **What happened:** The initial attempt to create the remote repo failed because the PAT lacked `repo` scope.
- **Why it matters:** Permissions are a hidden source of failure; checking scopes early saves time.
- **Action:** Verify PAT scopes before any automated GitHub API call.

### 7. Review before close
- **What happened:** Directly closing a TD issue without a review caused errors (`delegated mode requires --admin`).
- **Why it matters:** Enforces the “Impartial Spectator” step; ensures work is vetted before being marked done.
- **Action:** Insert a `td review` step in the workflow before any `td report` that closes an issue.

## Usage
- When starting a new sprint, read this playbook to remind yourself of the proven patterns.
- Add new lessons here as they arise; keep entries short, actionable, and tied to a concrete outcome.
