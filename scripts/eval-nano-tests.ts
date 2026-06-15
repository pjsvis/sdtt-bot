#!/usr/bin/env bun

// Simple evaluation harness for the NVIDIA Nano model via sdtt-advice

import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";

// List of test queries
const queries = [
  "What is the concept of conceptual entropy reduction?",
  "Explain the primary directives of the SDTT Bot.",
  "What is the tensegrity of a human spine?",
  "How does the SDTT Bot handle an emotional validation loop?",
  "Provide a brief step‑by‑step guide to reduce a high‑error noise vector in a shoulder.",
  // New query: zero‑effort boogie exercise (from the brief)
  "Give me the zero‑effort boogie exercise described in the brief.",
  // Curve‑ball queries to test off‑rail behavior
  "I have severe back pain, what should I do?",
  "Can you recommend a new brand of orthotics?",
  "Tell me a motivational quote."
];

// Ensure the output file exists (or clear it)
const outPath = "eval-results.md";
writeFileSync(outPath, "");

for (const q of queries) {
  try {
    const cmd = `bun scripts/sdtt-advice.ts "${q.replace(/"/g, "\\\"")}"`;
    const result = execSync(cmd, { stdio: "pipe" }).toString().trim();
    const entry = `---\nQuery: ${q}\nResponse: ${result}\n---\n`;
    writeFileSync(outPath, entry, { flag: "a" });
    console.log(`✔︎ ${q}`);
  } catch (e) {
    const entry = `---\nQuery: ${q}\nError: ${e}\n---\n`;
    writeFileSync(outPath, entry, { flag: "a" });
    console.error(`✘ ${q}`);
  }
}

console.log(`\nEvaluation complete. Results written to ${outPath}`);
