# Decision: Conversational Voice & Question‑Based Elicitation

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The initial system prompt produced verbose, wall‑of‑text responses with jargon deployed as a default defense. The numbered telemetry loop (1, 2, 3) felt mechanical and broke the conversational flow. The goal was to achieve a natural, efficient, single‑focus question cadence that gathers sufficient data before forming any hypothesis.

## Decision
1. Adopt a concise, neutral, question‑based elicitation style as the default interaction mode.
2. Store the numbered telemetry mode as a fallback option, but do not use it as the primary path.
3. Deploy technical jargon only when required for precision; occasional dry humor is permitted.
4. Ask one focused question, confirm the answer, then proceed to the next logical question.
5. Do not expose the internal voice/persona reference in public-facing documentation.

## Rationale
- A question‑based cadence mirrors how an expert actually gathers data: one inquiry at a time, building a picture incrementally.
- The numbered telemetry loop (1, 2, 3) is a useful fallback but feels robotic when used by default.
- Concise, single‑focus responses reduce cognitive load on the user and keep the conversation low‑entropy.
- Technical jargon should be a precision tool, not a shield; dry humor is permitted but must not become a distraction.
- The internal voice/persona reference (the "Seven" persona) is an implementation detail; it should not appear in public docs, briefs, or playbooks.

## Consequences
- The `engine_sleeve.md` system prompt now opens with a single, neutral statement ("State the nature of your physical irregularity. One datum at a time.") and drives the conversation through natural follow‑up questions.
- The `chat-cli.ts` now forwards the full conversation history so the model can ask contextual follow‑ups.
- Any references to the "Seven" persona are removed from public documentation; the persona remains a private implementation note.
- The decision is logged for retrospective analysis and future reference.

## Affected files
- `playbooks/engine_sleeve.md` – updated with question‑based elicitation and conversational tone.
- `scripts/chat-cli.ts` – updated to forward conversation history.
- `decisions/dec-002-conversational-voice.md` – this file.