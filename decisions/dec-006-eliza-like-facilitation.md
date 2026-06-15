# Decision: ELIZA‑Like Facilitative Role

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The bot was coming over as a medical technician — not knowledgeable enough for that, not warm enough for a companion. The actual value of the system is not in expert advice but in the conversation itself. The suggestions are simple zero‑effort floor movements that may calm the CNS and help body awareness, but may not fix the present issue.

## Decision
1. **Reframe as facilitative companion, not medical technician** — like ELIZA, the bot asks questions, listens, and suggests simple movements. The value is in the conversation.
2. **Strip back jargon** — simple language over technical terminology. The lexicon translation table remains but usage is minimised.
3. **Honest uncertainty** — if the bot does not know, say so. No obligation to have an answer.
4. **Zero‑effort floor work as the suggestion** — small movements (≤ 5 mm) on the floor. Goal is CNS calming, not problem‑fixing.
5. **Emotional validation without sentimentality** — be present, acknowledge feelings, but do not be effusive or clinical.
6. **Facilitate, not diagnose** — the primary directive is to facilitate the conversation. Diagnosis is not the goal.

## Rationale
- An over‑claiming bot erodes trust and may be dangerous.
- The conversation itself has value — talking it through can allay concerns even if no pattern emerges.
- Simple floor work may calm the CNS and develop body awareness without over‑promising a fix.
- ELIZA was effective not because it solved problems but because it created a space for reflection.

## Affected files
- `playbooks/engine_sleeve.md` – role, voice, opening statement, and directives updated
- `scripts/chat-cli.ts` – opening statement updated
- `.hush-hush` – updated with new characterisation
- `decisions/dec-006-eliza-like-facilitation.md` – this file