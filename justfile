# Minimal entry points for SDTT‑Bot

help:
	bun scripts/help.ts

about:
	bun scripts/about.ts

orient:
	bun scripts/orient.ts

# Verify registry and prototype
check:
	bun scripts/reg-check.ts
	bun scripts/reg-sync.ts --all --fix
	bun scripts/prototype-test.ts

# Agent‑friendly TD helpers

td-claim:
	bun scripts/td-claim.ts

td-update:
	bun scripts/td-update.ts

td-report:
	bun scripts/td-report.ts

td-block:
	bun scripts/td-block.ts

td-esc:
	bun scripts/td-esc.ts
