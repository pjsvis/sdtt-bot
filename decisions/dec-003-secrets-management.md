# Decision: Secrets Management

**Date:** 2026‑06‑15
**Status:** accepted

## Context
API keys and other sensitive credentials should never be hardcoded in scripts or committed to version control. Credentials are managed by Skate, not local files.

## Decision
1. API keys are retrieved from Skate via `skate get <key>` at runtime.
2. No `.secrets` file is used; credentials live in Skate.
3. Scripts fall back to the `SDTT_API_KEY` env var if Skate is unavailable.
4. The `.secrets` approach was discarded after the decision to use Skate.

## Affected files
- `.gitignore` – does not reference `.secrets`
- `scripts/sdtt-advice.ts` – updated to retrieve `NVIDIA_API_KEY` via Skate
- `decisions/dec-003-secrets-management.md` – this file