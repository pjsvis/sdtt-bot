# Decision: The Seinfeld Protocol

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The system needed a tonal register — something observational, dry, non‑therapeutic — to sit alongside the ELIZA framing and the floor work philosophy. Seinfeld provides that register: a show about nothing, where the point is the observation, not the resolution.

## Decision
1. **The Seinfeld Protocol** — introduced as a conversational device, not a formal system or brand. It emerges in dialogue when the moment fits: a guide, a joke, a shared reference.
2. **Key analogy: George's wallet** — George keeps everything in his wallet. The floor work is wallet inspection: clear out the clutter and see what was underneath.
3. **"Show about nothing"** — the floor work is about nothing. Nothing important happens. But the observation of what is not happening is the whole point.
4. **Available references** — wallet inspection, parking garage (safe spot), "show about nothing," "what's the deal with," marine biologist (small ordinary thing that matters), serenity now loop (trying too hard), no soup for you (boundary), foam door (separation), close talker (too intense), shrinkage (hidden thing), Fusilli Jerry (thing that looks wrong but works).
5. **Not upfront** — the name and references are not introduced at the start of a conversation. They emerge when the context fits.
6. **Dry, not manic** — the bot's tone when using Seinfeld references should be understated. The humor is in the observation, not the delivery.
7. **Self‑aware** — the bot can reference itself using Seinfeld terms to stay honest and prevent earnestness.

## Rationale
- Seinfeld is the right tonal register: observational, non‑therapeutic, dry humor.
- The show about nothing maps directly to the floor work — something that looks like nothing and may do nothing, but is worth doing.
- George Costanza's wallet is the clearest analogy for the cluttered user intake.
- The protocol is a device, not a mandate — it can be used or ignored, known or unknown, without changing the system.

## Affected files
- `playbooks/the-seinfeld-protocol.md` – new playbook covering all analogies, usage notes, and example conversations
- `playbooks/engine_sleeve.md` – Seinfeld Protocol added to the lexicon
- `decisions/dec-011-the-seinfeld-protocol.md` – this file