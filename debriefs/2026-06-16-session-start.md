# Session Start — 2026-06-16

## What you need to know

The SDTT-Bot was substantially built and refactored on 2026-06-15. Start from the repo, not from memory.

### Where we are
- **Repo:** `/Users/petersmith/Dev/GitHub/sdtt-bot`
- **Branch:** `epic-td-001` — pushed, clean
- **Start command:** `just check` (passes with 24 registry entries)

### What was built
The bot is an **ELIZA-like facilitative companion** — not a therapist, not an engineer. It asks questions, listens, and suggests lying on the floor and doing nothing. The value is in the conversation itself.

**The floor work philosophy (read these files):**
- `playbooks/engine_sleeve.md` — system prompt, directives, floor work philosophy
- `playbooks/floor-work-bom.md` — BOM, reference plane, wet t-shirt, defrag, bed history
- `playbooks/elicitation-playbook.md` — elicitation rules, feeling questions, 12-step progression
- `playbooks/the-seinfeld-protocol.md` — stored reference, George Costanza wallet, show about nothing

**Key decisions (read these):**
- `decisions/dec-006-eliza-like-facilitation.md` — bot refactored as facilitative companion
- `decisions/dec-013-lying-not-sitting.md` — lying not sitting, gaming is fine, feeling questions
- `decisions/dec-018-wet-tshirt.md` — wet t-shirt metaphor
- `decisions/dec-016-reference-plane.md` — ground as the forgotten reference plane

### Current architecture
- **Opening:** `Hello.` — system handles, model does not echo it
- **Elicitation:** one question only, wait for answer, do not ask multiple questions in one response
- **Close on:** simple causes, effective floor work, no actionable pattern
- **Seinfeld Protocol:** stored reference — like Species 8472 intel, not the primary voice
- **Gaming:** fine — engagement is the thing, do not verify
- **Safety:** protocols activate when needed, not displayed at session start
- **System prompt:** kept under ~1,000 chars to avoid API payload truncation

### Technical details
- Model: `nvidia/nemotron-3-nano-30b-a3b:free` via `https://integrate.api.nvidia.com/v1`
- API key: retrieved via `skate get nvidia_api_key` at runtime
- Payload: written to temp file (`-d @tmpFile`) to avoid command line length limits
- Conversation history: passed via `SDTT_CONVERSATION` env var

### Outstanding items
1. **TD-004 (playbooks expansion)** — in-progress. Some original items may be obsolete given the architecture refactor. Review before creating new playbooks.
2. **CI workflow** — `.github/workflows/ci.yml` deferred. Token lacks `workflow` scope. Add back when token updated.
3. **Blog material** — user will bring blog material on floor work and bed history. Pull best bits into the playbooks.
4. **More test cases** — add to eval suite: skeptical user, floor work didn't work, effective floor work

### DO NOT mention
7-of-9 voice — it is in `.hush-hush` only. Not in any briefs, decisions, debriefs, or public-facing docs.

### Commands
- `just check` — verify registry and prototype
- `just eval-nano` — run evaluation suite
- `just chat` — interactive CLI
- `just sdtt 'question'` — single query

### Full session history
See `debriefs/2026-06-15-debrief-wrap-up.md` for the complete session record including decisions, live tests, and lessons learned.