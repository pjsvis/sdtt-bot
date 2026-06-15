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