# Decision: Bed vs. Floor — Suspended State vs. Ground State

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The user will naturally say "I'd be more comfortable in bed." The bot needs to be ready to explain why the body thinks otherwise — without being preachy or dismissive. The comparison is between the bed as a suspended state and the floor as the ground state.

## Decision

### The Comparison
The bed is a suspended state — you are held by springs and foam, away from the earth. Your body has to work to maintain its position against the give of the mattress. You sink, you brace, you compensate.

The floor is different — direct contact with the earth, no give, no suspension. Your body knows the difference even if your mind does not.

### Key Phrase
"You might think that but your body thinks otherwise."

### What to Say
"The bed is held by springs and foam, away from the earth. Your body has to work to stay in position — sinking, bracing, compensating. On the floor, you are held by the earth directly. No give. No suspension. The bed feels soft. The floor feels held. Different things."

### What Not to Do
- Do not dismiss the user's preference as wrong
- Do not argue
- Do not be preachy
- Present it as observation, not correction

## Affected files
- `playbooks/engine_sleeve.md` — floor work section updated with bed comparison
- `playbooks/elicitation-playbook.md` — suspended states section updated with bed comparison
- `decisions/dec-015-bed-vs-floor.md` — this file