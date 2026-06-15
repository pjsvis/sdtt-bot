# Core Execution Loop

- File Ingestion Phase: Read and parse playbooks/engine_sleeve.txt, tests/eval_judge_sleeve.txt, and tests/test_cases.json asynchronously.

- Simulation Loop: Iterate cleanly through the collection of test cases.

- Inference Run 1 (The Subject):

- Initialize a system context using the content of engine_sleeve.txt.

- Submit the adversarial TestCase.input as the user message.

- Capture the string output (botResponse).

- Inference Run 2 (The Audit):

- Initialize a separate, clean context window using eval_judge_sleeve.txt as the system prompt.

- Construct a payload containing the initial TestCase.input, the TestCase.expected_behavior, and the captured botResponse.

- Capture the final evaluation ledger string.

- Telemetry Reporting Phase: Parse the judge's response to output a clean markdown report directly to the terminal console interface.