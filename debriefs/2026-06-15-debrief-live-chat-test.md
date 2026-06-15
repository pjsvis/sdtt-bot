# Debrief: Live Chat Test — 2026-06-15

## What happened

Ran a live chat test via `bun scripts/chat-cli.ts` with the following inputs:
- "My back has been tight for a few days"
- "It is not pain exactly, just tight"
- "I probably just slept wrong"
- "No I have not tried anything yet"
- "I think I will get on the floor and do nothing"

Trace saved to: `chat-traces/session-2026-06-15T16-48-09-237Z.log`

## Bugs found and fixed

| Bug | Root cause | Fix |
|-----|-----------|-----|
| **JSON truncation** — "failed to decode json body: unexpected end of JSON input" | System prompt too long (~2,600 chars) + conversation history in bash command line → curl command exceeded payload limit and got truncated mid-escape | System prompt trimmed to ~1,000 chars. `playbooks/engine_sleeve.md` rewritten to essential directives only. |
| **curl escaping corruption** | Bash heredoc with JSON payload containing special chars (em dashes, quotes) passed via command line | curl now writes JSON to a temp file and uses `-d @tmpFile`. `scripts/sdtt-advice.ts` updated. |
| **chat-cli command line overflow** | chat-cli embedded entire conversation history in the command line argument to `sdtt-advice.ts` | chat-cli now passes conversation history via `SDTT_CONVERSATION` environment variable. `scripts/chat-cli.ts` updated. |

## What the bot did well

1. **Elicitation worked** — one question at a time, following the answer
2. **Closed on simple cause** — "That could be it. If it lingers..." when user said they slept wrong
3. **Floor work pivot executed** — "Get on the floor. Stay there until the radar quiets."
4. **User in control** — "You decide when that happens. No rush."
5. **CNS radar reference** — appeared naturally in the closing without being forced
6. **Not prescriptive** — no fixed agenda, no interrogation

## Observations

- The bot sometimes asks a follow-up question after the case has been closed ("What does the discomfort feel like right now?") which is slightly redundant but not harmful
- The new opening statement ("I'm going to ask you a few questions, then suggest you get on the floor and do nothing") is well-received
- The ELIZA framing is working — the bot feels facilitative rather than clinical
- The Seinfeld Protocol was not triggered in this session (the context didn't naturally fit)

## Seinfeld Protocol Test (same session)

Tested the Seinfeld Protocol conversation in a separate session:

| Turn | User | Bot | Notes |
|------|------|-----|-------|
| 1 | "What is the Seinfeld Protocol?" | "A tiny mental cue — notice the ordinary" | Explained as mental cue, not technical system |
| 2 | "What does that do?" | "Nervous system quiets. Get on the floor, get comfortable, do nothing." | Floor is the key thing |
| 3 | "Is it like meditation?" | "No. It isn't meditation. You just get comfortable and warm and do nothing for a bit." | Correctly debunked meditation comparison |
| 4 | "We lost the floor a long time ago" | "Yes, we all left it behind. Find your spot." | "Lost the floor" line confirmed and redirected to spot |

**Outcome:** Incremental explanation style worked. Short sentences, one idea at a time, debunking assumptions, safety and spot first.

Trace: `chat-traces/session-2026-06-15T16-55-33-659Z.log`

## Decisions made
- `decisions/dec-012-incremental-explanation.md` — directive added to explain in small pieces, not everything at once

## Next steps

1. Consider adding Seinfeld Protocol to the evaluation suite as a specific test case
2. Test the "why?" pivot with a skeptical user who explicitly asks why
3. Consider adding a test case where the user says "I tried floor work and it didn't help" — to test the "doing nothing is not a failure state" framing