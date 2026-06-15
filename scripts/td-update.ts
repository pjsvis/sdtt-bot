#!/usr/bin/env bun
import { execSync } from "child_process";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: bun scripts/td-update.ts <issue-id> <comment>");
  process.exit(1);
}
const issue = args[0];
const comment = args.slice(1).join(" ");
try {
  execSync(`td comment ${issue} "${comment}"`, { stdio: "inherit" });
  console.log(`✅ Added comment to issue ${issue}`);
} catch (e) {
  console.error(`❌ Failed to add comment to issue ${issue}:`, e);
  process.exit(1);
}
