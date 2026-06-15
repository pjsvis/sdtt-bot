# Prototype SDTT‑Bot

This document explains the minimal prototype that validates the `just` façade and the unified registry.

## Steps
1. Run `just orient` – syncs all `INDEX.jsonl` / `REGISTRY.jsonl` files.
2. Run `just check` – executes the test harness (`scripts/prototype-test.ts`).
3. Verify that the three core commands (`help`, `about`, `orient`) are available.

The prototype is intentionally tiny: it does not implement the full SDTT engine, but it proves that the tooling chain works end‑to‑end.
