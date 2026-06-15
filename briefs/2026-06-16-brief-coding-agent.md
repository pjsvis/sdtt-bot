# `briefs/br002_coding_agent_implementation.md`

```markdown
# Engineering Brief: TypeScript Automated Evaluation Framework

## 1. Objective
To construct a lightweight, high-fidelity local evaluation test runner in TypeScript that validates the adherence of the `sdtt-bot` system prompt (the sleeve) against adversarial test cases, utilizing a parallel judge session spawned from the same local model substrate.

## 2. Runtime Environment & Dependencies
*   **Runtime Engine:** Node.js (v20+) or Bun.
*   **Scripting Language:** TypeScript (Target: ES2022).
*   **Execution Command:** `npm run test:sleeve` or `bun run scripts/test_runner.ts`.
*   **Allowed Libraries:** Absolute minimum footprint. Use the native `fs/promises` for file I/O and standard fetch/Axios or the official `@google/genai` or `openai` SDK for interfacing with the local OpenAI-compatible API endpoint (e.g., Ollama, NVIDIA NIM, or LocalAI).

## 3. Data Flow Architecture

The script must orchestrate two isolated back-to-back inference contexts sequentially per test case:

```text
[test_cases.json] ──> Input ──> [Session 1: SDTT-Bot (engine_sleeve.txt)]
                                                    │
                                             Model Response
                                                    │
[eval_judge_sleeve.txt] ──> Input ──> [Session 2: Judge-Bot]
                                                    │
                                              Markdown Ledger

```

## 4. TypeScript Structural Specifications

The coding agent must implement the following structural interfaces and functional routines within `scripts/test_runner.ts`:

### Data Interfaces

```typescript
interface TestCase {
  id: string;
  input: string;
  expected_behavior: string;
}

interface TestConfig {
  test_cases: TestCase[];
}

interface EvalResult {
  testId: string;
  status: 'PASS' | 'FAIL';
  reasoning: string;
}

```

### Core Execution Loop

1. **File Ingestion Phase:** Read and parse `playbooks/engine_sleeve.txt`, `tests/eval_judge_sleeve.txt`, and `tests/test_cases.json` asynchronously.
2. **Simulation Loop:** Iterate cleanly through the collection of test cases.
3. **Inference Run 1 (The Subject):**
* Initialize a system context using the content of `engine_sleeve.txt`.
* Submit the adversarial `TestCase.input` as the user message.
* Capture the string output (`botResponse`).


4. **Inference Run 2 (The Audit):**
* Initialize a separate, clean context window using `eval_judge_sleeve.txt` as the system prompt.
* Construct a payload containing the initial `TestCase.input`, the `TestCase.expected_behavior`, and the captured `botResponse`.
* Capture the final evaluation ledger string.


5. **Telemetry Reporting Phase:** Parse the judge's response to output a clean markdown report directly to the terminal console interface.

## 5. Local Endpoint Configuration

The configuration must default to a localized loopback address, parameterized via standard environment variables:

```typescript
const API_URL = process.env.SDTT_API_URL || 'http://localhost:11434/v1'; // Default Ollama/NIM port
const MODEL_NAME = process.env.SDTT_MODEL || 'llama3';

```

## 6. Expected Acceptance Criteria

* **Zero State Persistence:** Session 2 must possess absolutely no leakage or historical cache from Session 1. Each test run must explicitly reset the context state.
* **Error Handling:** If the local model server drops connection or fails to return a token stream, the runner must catch the error, log a failure vector at that specific node, and immediately proceed to the next test case without crashing the script thread.

```

---

This brief provides the coding agent with an airtight, deterministic set of bounds. It leaves no room for creative fluff or architectural drift; it simply states the types, the loop geometry, and the exact files to hook together. 

You can commit this file directly into your `briefs/` directory. The project infrastructure is now completely prepared for code generation.

```