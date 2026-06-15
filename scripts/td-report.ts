#!/usr/bin/env bun
import { execSync } from "child_process";

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: bun scripts/td-report.ts <issue-id> [status]");
  process.exit(1);
}
const issue = args[0];
const status = args[1] || "done"; // default to done/complete

// Map common status synonyms to td commands
let cmd: string;
if (status === "done" || status === "complete" || status === "close") {
  cmd = `td close ${issue}`;
} else if (status === "block" || status === "blocked") {
  cmd = `td block ${issue}`;
} else {
  // fallback: use td update to set status field
  cmd = `td update ${issue} status:${status}`;
}

try {
  execSync(cmd, { stdio: "inherit" });
  console.log(`✅ Updated issue ${issue} with status ${status}`);
} catch (e) {
  console.error(`❌ Failed to update issue ${issue}:`, e);
  process.exit(1);
}
