# End-of-Session Debrief — 2026-06-15

## What happened today

A single conversational session where we iterated rapidly through the system's architecture, philosophy, and mechanics — all through dialogue. Wechat, exercise the bot, progress. No formal sprint, no ticket system — just a live conversation producing live documentation.

---

## What was built

### Core architecture (refactored)
The bot was refactored from a tensegrity-engineer to an ELIZA-like facilitative companion. This was the single most important decision of the day — it aligned the map with the territory.

**The bot is:**
- A facilitative companion — asks questions, listens, suggests floor work
- Not a therapist (refer to the therapy, not the therapists)
- Not a medical technician
- Not an engineer
- The value is in the conversation itself, not the advice

### The floor work philosophy — complete
The system now has a complete, honest, non-woo philosophy for the floor work practice:

| Concept | Description |
|---------|-------------|
| **Reference plane** | The ground is the original reference — the one we have almost forgotten. The body still knows it. Without it, the body is always compensating. |
| **Lost the floor** | We left the floor via chairs, shoes, beds, cars. Returning is like going home. |
| **Gravity as friend** | On the floor, gravity holds you. Not falling over is hard work — on the floor, that work is gone. |
| **Lying, not sitting** | Sitting requires muscular effort. Lying requires nothing. Antithetical to doing nothing. |
| **Wet t-shirt** | You are like a wet t-shirt that has been twisted, stretched, and wrung out. Lay flat, let dry. Distortions settle. You do nothing. |
| **Defrag** | We ARE fixing things — like defragmenting. Sleep defrags the mind. Floor work defrags the body. Old patterns surface and release. |
| **CNS radar** | The nervous system is a radar. It must quiet before anything useful can happen. You cannot fall asleep in a noisy room. |
| **Micro-movements** | Small movements that slip under the CNS radar. The CNS is like a worried grannie — micro-movements are too small to flag. What is the worst that could happen? You are not going to fall over. |
| **Bed vs. floor** | Beds are suspended states — held by springs/foam, away from earth. Floor is the reference plane. Body knows the difference. |
| **Bed history** (on request) | Humans left the floor when sleep surfaces were elevated — animal skins → mats → platforms → springs → foam. Body adapted but never forgot. |
| **Napping is fine** | It means you are comfortable. The practice is working. |

### The Seinfeld Protocol
Introduced as a stored reference — like Species 8472 intel. Not the primary voice, not announced, not pushed. Available when context fits.

**Key analogies:**
- George's wallet — cluttered intake, empty it and see what was underneath
- "Show about nothing" — nothing important happens, observation is the point
- Parking garage — safe spot on the floor
- Marine Biologist — small ordinary thing that turns out to matter
- No soup for you — boundary, the bot does not follow certain paths

### Elicitation and safety
- Disclaimer upfront — not buried
- Safety protocols — escalate on serious symptoms, allay concerns on nothing-found
- Incremental explanation style — answer one piece at a time, short sentences, let the user catch up
- "We lost the floor a long time ago" — ready to go as the "why" answer
- Close on simple causes — do not interrogate toward a fixed agenda
- Gaming the system — fine, who cares, the engagement is the thing

### Technical fixes (day of)
Three bugs found and fixed simultaneously:
1. **JSON truncation** — system prompt too long + history in bash command line → curl truncated. Fix: trim system prompt to ~1,000 chars.
2. **curl escaping** — special chars mangled in bash template. Fix: write JSON to temp file, use `-d @tmpFile`.
3. **chat-cli overflow** — history embedded in command line. Fix: pass via `SDTT_CONVERSATION` env var.

---

## Decisions made today

| Decision | Summary |
|----------|---------|
| `dec-005-safety-disclaimer.md` | Safety protocols and upfront disclaimer — not buried |
| `dec-006-eliza-like-facilitation.md` | Reframed as facilitative companion, not therapist |
| `dec-007-pivot-to-floor-work.md` | "Why" pivot, seven engagement strategies for skepticism |
| `dec-008-bill-of-materials.md` | BOM: mat, blanket, yoga block, socks. All substitutable. Find your spot. |
| `dec-009-cns-radar-settling.md` | CNS radar, settling phase, "not woo" framing |
| `dec-010-find-your-spot.md` | Safety is user's decision, floor is where you fall — reframe as safe space |
| `dec-011-the-seinfeld-protocol.md` | Stored reference, not primary voice, emerges when context fits |
| `dec-012-incremental-explanation.md` | Go slowly, short sentences, let user catch up |
| `dec-013-lying-not-sitting.md` | Sitting requires effort, lying requires nothing. Gaming fine. |
| `dec-014-gravity-friend.md` | Gravity as friend, micro-movements under CNS radar |
| `dec-015-bed-vs-floor.md` | Bed is suspended state, floor is reference plane |
| `dec-016-reference-plane.md` | Ground is the original reference — the one we have almost forgotten |
| `dec-017-defrag-beds.md` | We ARE fixing things — defragmenting, not medical therapy |
| `dec-018-wet-tshirt.md` | Wet t-shirt metaphor — lay flat, let dry, distortions settle |

---

## New playbooks created today

| Playbook | What it covers |
|----------|----------------|
| `playbooks/elicitation-playbook.md` | Six question types (Paul & Elder), question design rules, elicitation flow, "why" answer, feeling questions, gaming directive, lying/sitting, progression (12 steps) |
| `playbooks/the-seinfeld-protocol.md` | Core analogy, George Costanza wallet, 15 Seinfeld references, usage notes, example conversations |
| `playbooks/floor-work-bom.md` | Core items, substitutions, "find your spot", CNS radar, what you are training, contact points, ground state, reference plane, defrag, wet t-shirt, bed history, contingencies |

---

## Evaluation results

All 9 tests PASS with the current system prompt:
- `just check` — 24 entries, prototype test clean
- `just eval-nano` — all 9 tests PASS

---

## Live test sessions today

Three live chat sessions run and documented:
1. Back tightness → closed on "I probably slept wrong" → floor work pivot → CNS radar in closing → PASS
2. Seinfeld Protocol → "What is that?" → debunk meditation → "lost the floor" lands → PASS
3. "I'd be more comfortable in bed" → observational explanation → contact with earth vs. suspended in foam → PASS
4. "What is the wet t-shirt metaphor?" → perfect delivery → "You don't have to do anything — just give it time and space" → PASS

---

## Lessons learned

1. **The map must match the territory** — the bot is a facilitative companion, not an engineer or therapist. The honest characterisation is better than the overclaiming one.
2. **Gaming is fine** — the engagement is the thing. The bot does not need to verify.
3. **Go slowly** — the model compresses everything into one answer if not told otherwise. Incremental explanation is a deliberate choice.
4. **The wet t-shirt metaphor** — the best thing produced today. Visual, mechanical, non-woo, explains the time dimension, explains sufficiency.
5. **Reference plane** — the final piece of the "why". The ground is not just a surface — it is the original reference. Without it, the body is always compensating.
6. **Short system prompt** — the API payload limit is real. The system prompt must fit in ~1,000 chars. Detail lives in the playbooks.
7. **Conversation-driven development** — wechat, exercise the bot, progress. No tickets, no sprints. The dialogue produces the documentation.

---

## Tomorrow

- User will bring blog material on floor work and bed history
- More test cases for the evaluation suite
- Test the skeptical user explicitly ("I tried it and it didn't work")
- Consider the CI pipeline and whether it needs updating with the new architecture
- Pull the best bits from the blog material into the playbooks