#!/usr/bin/env bun
import { execSync } from "child_process";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Configuration - can be overridden via environment variables
const MODEL_URL = process.env.SDTT_MODEL_URL ?? "https://integrate.api.nvidia.com/v1";
const MODEL_ID = process.env.SDTT_MODEL_ID ?? "nvidia/nemotron-3-nano-30b-a3b";

// Load API key from Skate (credentials are managed externally)
function getApiKey(): string {
  if (process.env.SDTT_API_KEY) return process.env.SDTT_API_KEY;
  try {
    return execSync("skate get nvidia_api_key", { stdio: "pipe" }).toString().trim();
  } catch (e) {
    console.error("⚠️  Failed to retrieve NVIDIA_API_KEY from Skate.");
    process.exit(1);
  }
}

function usage() {
  console.error("Usage: bun scripts/sdtt-advice.ts \"<question>\"");
  process.exit(1);
}

const query = process.argv[2];
if (!query) usage();

// Load the system prompt (the sleeve) from playbooks/engine_sleeve.md
const systemPromptPath = "playbooks/engine_sleeve.md";
let systemPrompt = "";
try {
  systemPrompt = readFileSync(systemPromptPath, "utf-8");
} catch (e) {
  console.error(`⚠️  Could not read system prompt at ${systemPromptPath}:`, e);
  process.exit(1);
}

// Build messages array with conversation history if provided
const conversationHistory = process.env.SDTT_CONVERSATION ?? "";
const messages = conversationHistory
  ? [
      { role: "system", content: systemPrompt },
      ...parseConversationHistory(conversationHistory),
      { role: "user", content: query },
    ]
  : [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ];

const payload = JSON.stringify({
  model: MODEL_ID,
  messages,
  temperature: 0.2,
});

// Write payload to a temp file to avoid command line length issues with special characters
const tmpFile = join(tmpdir(), `sdtt-payload-${Date.now()}.json`);
writeFileSync(tmpFile, payload);

const API_KEY = getApiKey();
try {
  const curlCmd = `curl -s -X POST ${MODEL_URL}/chat/completions \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d @${tmpFile}`;
  const result = execSync(curlCmd, { stdio: "pipe" }).toString();
  unlinkSync(tmpFile);
  const json = JSON.parse(result);
  const answer = json.choices?.[0]?.message?.content?.trim() ?? "[no response]";
  console.log(answer);
} catch (e) {
  try { unlinkSync(tmpFile); } catch (_) {}
  console.error("⚠️  LLM request failed:", e);
  process.exit(1);
}

function parseConversationHistory(history: string): Array<{role: string; content: string}> {
  // Parse "[CONVERSATION HISTORY]\nSYSTEM: ...\nBOT: ...\nUSER: ...\n[NEW INPUT]"
  const messages: Array<{role: string; content: string}> = [];
  const lines = history.split("\n");
  let currentRole = "";
  let currentContent = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "SYSTEM:") {
      // Skip system messages (they're already in the system prompt)
      currentRole = "";
      currentContent = "";
    } else if (trimmed === "BOT:") {
      if (currentRole && currentContent) {
        messages.push({ role: currentRole, content: currentContent.trim() });
      }
      currentRole = "assistant";
      currentContent = "";
    } else if (trimmed === "USER:") {
      if (currentRole && currentContent) {
        messages.push({ role: currentRole, content: currentContent.trim() });
      }
      currentRole = "user";
      currentContent = "";
    } else if (currentRole) {
      currentContent += (currentContent ? "\n" : "") + line;
    }
  }

  if (currentRole && currentContent) {
    messages.push({ role: currentRole, content: currentContent.trim() });
  }

  return messages;
}