#!/usr/bin/env bun

/*
  Simple interactive CLI for manual testing of the SDTT-Bot.
  All interactions are persisted to a timestamped log file under `chat-traces/`.
  The bot asks natural, single-focus questions to gather information before
  forming a hypothesis.
*/

import { execSync } from "child_process";
import { resolve } from "path";
import { existsSync, mkdirSync, appendFileSync, readFileSync, writeFileSync } from "fs";
import * as readline from "readline";

// ---------------------------------------------------------------------------
// Session state (lightweight JSON file)
// ---------------------------------------------------------------------------
const tracesDir = resolve("chat-traces");
if (!existsSync(tracesDir)) mkdirSync(tracesDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logPath = resolve(tracesDir, `session-${timestamp}.log`);
const statePath = resolve(tracesDir, "session-state.json");

let sessionState = { context: "" as string, complete: false };
if (existsSync(statePath)) {
  try { sessionState = JSON.parse(readFileSync(statePath, "utf-8")); } catch (_) {}
}

function saveState() {
  writeFileSync(statePath, JSON.stringify(sessionState, null, 2));
}

function log(line: string) {
  appendFileSync(logPath, line + "\n");
}

// ---------------------------------------------------------------------------
// Simple greeting — user leads from here
// ---------------------------------------------------------------------------
const greeting = "Hello.";
console.log(`BOT: ${greeting}\n`);
log(`BOT: ${greeting}`);

// Reset command – clears state file
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();

rl.on("line", (input) => {
  const trimmed = input.trim();

  if (trimmed.toLowerCase() === "reset") {
    sessionState = { context: "", complete: false };
    saveState();
    console.log("🔄 Session reset.");
    console.log(`BOT: ${opening}\n`);
    log("SYSTEM: Session reset");
    rl.prompt();
    return;
  }

  if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "quit") {
    rl.close();
    return;
  }

  log(`USER: ${trimmed}`);

  // Pass conversation history via environment variable (avoids command line length limits)
  const history = existsSync(logPath) ? readFileSync(logPath, "utf-8") : "";
  const env = { ...process.env, SDTT_CONVERSATION: history };

  try {
    const raw = execSync(`bun scripts/sdtt-advice.ts "${trimmed.replace(/"/g, '\\"')}"`, {
      stdio: "pipe",
      env,
    }).toString().trim();
    console.log(`BOT: ${raw}\n`);
    log(`BOT: ${raw}`);
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error("⚠️ ", err);
    log(`ERROR: ${err}`);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("\nSession ended. Log saved to " + logPath);
  process.exit(0);
});