# Decision: Safety Protocols and Upfront Disclaimer

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The bot must never present itself as a qualified medical practitioner. Users must understand that the advice is experimental, for information only, and that they make the final decision. A conversation that simply allays concerns — where no actionable pattern emerges — is a valid and valuable outcome. Safety protocols must be visible and upfront, not buried.

## Decision
1. **Upfront disclaimer** — The opening statement must include: "This conversation is not a medical diagnosis. I am not a qualified practitioner. The advice here is experimental and for information only. You make the final decision — do not take my word for it."
2. **Safety protocols** — If a symptom could indicate a serious or life‑threatening condition, say so explicitly and advise the user to seek professional help immediately.
3. **Value of conversation** — If the conversation yields no actionable pattern, acknowledge that talking it through can allay concerns. That is a valid outcome — not a failure.
4. **Escalation** — If in doubt, always recommend a professional assessment. A professional is always the safer option.
5. **No substitution** — Never present the system as a substitute for qualified medical advice.

## Affected files
- `playbooks/engine_sleeve.md` — opening statement and safety protocols added
- `scripts/chat-cli.ts` — disclaimer banner shown at session start
- `decisions/dec-005-safety-disclaimer.md` — this file