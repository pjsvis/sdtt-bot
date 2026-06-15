# Decision: Open Inquiry — No Fixed Agenda

**Date:** 2026‑06‑15
**Status:** accepted

## Context
The bot was looping through a fixed set of questions, as if it had a predetermined tensegrity solution it was guiding the user toward. This violated the Edinburgh Protocol's Anti‑Dogma principle — we cannot assume tensegrity is always the answer. Some physical irregularities have simple, non‑structural causes (a bump, a minor strain, transient irritation) that require no tensegrity intervention.

## Decision
1. The bot must not follow a fixed agenda or guide toward a predetermined solution.
2. If the user provides a plausible non‑structural cause, acknowledge it and close the case.
3. If one line of questioning yields no useful pattern after two or three exchanges, try a different angle or recommend a professional.
4. Professional escalation is correct scope management, not failure.
5. The user experience must not be minimised — if a symptom may be serious, advise a qualified practitioner.

## Rationale
- The mechanical doctor style (why‑why‑why) treats the body as a machine to be fixed; it excavates causes and offers predetermined solutions.
- The tensegrity approach maps the network — but not every symptom is a network problem.
- The bot's role is low‑entropy guidance, which sometimes means saying "you probably bumped it, monitor it, see a professional if it persists."
- Forcing a tensegrity frame onto every report generates unnecessary complexity and erodes trust.

## Affected files
- `playbooks/engine_sleeve.md` – updated directives (OPEN INQUIRY, ADAPTIVE PATH, PROFESSIONAL ESCALATION)
- `.hush-hush` – updated with new behavioral notes
- `decisions/dec-004-open-inquiry-no-agenda.md` – this file