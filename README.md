# Self-Directed Tensegrity Tuning (SDTT) Core Repository

This repository houses the configuration parameters, system sleeves, operational playbooks, and architectural documentation for the SDTT engine.

## Quick‑Start

1. **Initialize task manager** – `td init` (already done).
2. **Orient the agent** – `just orient`. This syncs the unified registry and prepares the workspace.
3. **Run the prototype test** – `just check`. It validates the `just` commands and the registry.
4. **Explore the docs** – `docs/README.md` indexes all playbooks.

## Repository Architecture (Silo Protocol)

sdtt-bot/
├── README.md
├── briefs/
│   └── architecture_brief.md     # System scope, constraints, and target objectives
├── decisions/
│   └── dec001_intake_logic.md     # Rationale for "physical glitch" and threat de‑escalation
├── playbooks/
│   └── engine_sleeve.txt          # The master text prompt configuration for local model deployment
└── docs/
    ├── protocol_library.md        # 5mm experiments, baseline tracking, and structural vectors
    └── bibliography.md            # The narrativised, authority-cached source database