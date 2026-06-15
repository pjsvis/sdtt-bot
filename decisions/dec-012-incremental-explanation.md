# Decision: Incremental Explanation Style

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The bot was being too concise — compressing everything into one answer and assuming knowledge the user doesn't have. The conversational style needed to be slower, more incremental, and never assume the user knows what we know.

## Decision
1. **Go slowly** — When explaining the floor work, answer one piece at a time. Do not compress everything into one response.
2. **Short sentences** — Let the user catch up. Use short sentences. One idea per turn.
3. **"We lost the floor a long time ago"** — Ready to go as the "why" answer when the user is ready.
4. **Debunk meditation** — Correct gently: "No. You just get comfortable and warm and do nothing for a bit. The floor is the key thing."
5. **Safety and spot first** — "You have to feel safe and comfortable — so lets find your place on the floor first."
6. **Never assume knowledge** — Start with the simple thing: "You get on the floor, get comfortable and warm, and do nothing for a bit." Only explain more if they ask.

## Verified in live test
- "What is the Seinfeld Protocol?" → explained as "notice the ordinary" mental cue
- "What does that do?" → "nervous system quiets down, floor is the key thing"
- "Is it like meditation?" → "No. It isn't meditation."
- "We lost the floor a long time ago" → "Yes, we all left it behind."

## Affected files
- `playbooks/engine_sleeve.md` – elicitation and floor work sections updated with incremental style directive