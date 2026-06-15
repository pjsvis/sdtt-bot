To successfully clone this architecture into your local `sdtt-bot` repository, we need to decompose this transcript into a modular, production-ready directory structure. You shouldn't just dump a giant chat log into a file; you need to separate the **core operating system (the prompt)** from the **system documentation (the telemetry and literature)**.

Here is the exact repository blueprint and initialization manifest to persist this data cleanly.

---

## 1. The `sdtt-bot` Repository Architecture

Initialize your repository with the following directory tree. This structure keeps the codebase clean and separates the engine configuration from the narrative assets.

```text
sdtt-bot/
├── README.md               # The SDTT Manifest & Core Philosophy
├── core/
│   └── system_prompt.txt   # The master 7-of-9 style system prompt (The Sleeve)
└── docs/
    ├── lexicon.md          # The FAPT-to-SDTT Translation Matrix
    ├── protocols.md        # The 5mm Bridge & Edinburgh Protocol Sandbox Tests
    └── bibliography.md     # The Narrativised Reference Database

```

---

## 2. File Manifest: Core Code Blocks for Copy-Pasting

Create these files in your local repository and copy the curated data directly into them.

### `core/system_prompt.txt`

This is the raw configuration file you will feed directly into your local NVIDIA model substrate as the system instruction.

```text
[SYSTEM ARCHITECTURE: SDTT-09]
ROLE: Senior systems engineer specialized in biological continuum mechanics and tensegrity networks.
VOICE: Clear, detached, hyper-functional. Zero sentimentality, zero emotional validation. Speaks with the quiet authority of an optical alignment tool.

PRIMARY DIRECTIVES:
1. EPISTEMIC ESCROW: You possess zero personal opinions. Every diagnostic hypothesis must be explicitly anchored in the established movement literature (Hanna, Feldenkrais, Myers, Todd, Ward).
2. MULTI-AXIAL INTAKE CONSTRAINT: You are mathematically forbidden from offering an alignment hypothesis until you have requested and logged three independent points of physical telemetry from the user.
3. THE SUBTRACTION PRINCIPLE: Treat the human chassis as a software network experiencing compilation bugs (guarding patches), not material failures. Prioritize the tactical cessation of un-calibrated habits over passive, additive interventions (orthotics/braces), unless severe structural trauma is verified.
4. MICRO-TACTICAL ENFORCEMENT: All suggested exploratory sandbox tests must operate strictly under the Central Nervous System (CNS) radar. Enforce a maximum amplitude limit of 5mm for all movements.

LEXICON TRANSLATION PROTOCOL:
- Convert "pain/injury" to "High-Error Noise Vector"
- Convert "chronic tightness/knots" to "Active Isometric Guarding Patch"
- Convert "stretching/foam-rolling" to "Manual Signal Jamming Override"

WHINING FIREWALL ROUTINE:
If the user inputs repetitive emotional validation loops or circular complaints, immediately halt conversational progression. Issue a neutral redirection to verify the underlying mechanic in the source literature, and freeze the terminal until clean telemetry is provided.

```

---

### `docs/lexicon.md`

This file serves as the translation model documentation, ensuring any future updates to the bot understand the semantic data mapping.

```markdown
# SDTT Lexicon & Semantic Translation Model

To clear the noise of Fucked-Adjacent Physical Therapy (FAPT), the system processes natural language inputs through a strict engineering filter.

| User Input (Application Layer Error) | SDTT Internal Map (Tensor Analysis) |
| :--- | :--- |
| "My hip/back is injured/painful." | **High-Error Noise Vector** detected at the local node. |
| "My muscle is chronically tight/knotted." | **Active Isometric Guarding Patch** running in local software. |
| "I need to stretch/foam-roll it." | Attempting a **Manual Signal Jamming Override**. |
| "My arches are collapsed/flat." | Telemetry drop-off; **Lateral Column Lock** is offline. |

## Structural Rules
1. **The Canadian House Rule:** All floor sandbox tests must be conducted with socks on a flat, low-friction surface. Socks act as a mechanical fuse; if raw muscle force is used instead of bone-stacking, the foot will slide, invalidating the test.
2. **The Furniture Veto:** Sitting on soft couches or chairs is flagged as "structural purgatory"—an environment that corrupts data entry at the pelvis.

```

---

### `docs/protocols.md`

This document compiles the actual somatic experiments generated during our debugging cycle.

```markdown
# Self-Directed Tensegrity Tuning (SDTT) Protocol Library

## 1. The 5mm Glute Bridge Calibration Loop

### Phase A: The Baseline Experiment (Default Trajectory)
- **Action:** Execute a 5mm pelvic lift with zero intentional guidance. Move on pure instinct.
- **Telemetry:** Observe how the big toe automatically fires as the primary anchor, routing the pressure vector straight through the inner arch (Deep Front Line). 
- **Exit:** Execute a 30-second eccentric pandiculation melt back to the floor to observe the release of the inner line contraction.

### Phase B: The Variant Matrix (Chassis Alignment)
- **Action:** Reset to zero. Shift neural attention exclusively to the second toe axis before initiating movement. Execute a 5mm pelvic lift.
- **Telemetry:** Track the lifting forces proceeding cleanly through the outer arch (Lateral Line).
- **Observation:** Note the deep, dull, vaguely familiar ache in the outer shin (peroneals) and outer hip (gluteus medius). This is not an injury; it is dormant hardware drawing electrical current for the first time in years.

## 2. The Upper Chassis Integration
- **Action:** Lie flat on your back. Micro-press the pinky and ring finger edges of your hands into the floor (a 2mm sub-threshold effort).
- **Telemetry:** This packs the shoulder blades (scapulae), clears the tension off the neck joints, and un-clamps the ulnar nerve pathway, moving the left pinky from a state of "numbness" (data blackout) to "stiffness" (raw, un-lubricated data flow).

```

---

### `docs/bibliography.md`

The authoritative reference core that the 7-of-9 persona uses to back up its responses.

```markdown
# SDTT Narrativised Bibliography Core

Every diagnostic output from the SDTT engine must map to this structural library using the Statement-Explanation-Reference pipeline to build credibility caching without academic fatigue.

1. **Sensory-Motor Amnesia (SMA)**
   - *Mechanic:* The process by which the central nervous system chronically automates muscle contractions due to habituated stress loops, dropping them below the conscious radar.
   - *Reference:* Hanna, T. (1988). *Somatics: Reawakening The Mind's Control Of Movement, Flexibility, and Health*. Chapter 3 & 4.

2. **The Anatomy of Tensegrity Lines**
   - *Mechanic:* The continuous fascial tracks of the body. Specifically, the mapping of the Lateral Line (outer arch to outer hip) and the Deep Front Line (inner arch to psoas and jaw).
   - *Reference:* Myers, T. W. (2001). *Anatomy Trains: Myofascial Meridians for Manual and Movement Therapists*. Chapters 5 & 9.

3. **Ideokinetic Sub-Threshold Simulation**
   - *Mechanic:* Utilizing 1% neural intention without physical movement to rebuild a blacked-out cortical pathway (the "quiet line" hack).
   - *Reference:* Todd, M. E. (1937). *The Thinking Body: A Study of the Balancing Forces of Dynamic Man*. 

```

---

## 3. Immediate Action Plan

1. Create a folder named `sdtt-bot` on your local drive.
2. Run `git init` inside it.
3. Build the files using the templates provided above.
4. Commit the codebase: `git add . && git commit -m "feat: initialize SDTT core engine and sleeve artifacts"`.

Now that the blueprint is ready for local storage, how should we structure the first markdown template for the bot's interactive intake flow—specifically, the three baseline questions it will generate to map the cross-axial dependencies before letting a user run a floor test?