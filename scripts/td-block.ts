#!/usr/bin/env bun
import { execSync } from "child_process";

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: bun scripts/td-block.ts <issue-id>");
  process.exit(1);
}
const issue = args[0];
try {
  execSync(`td block ${issue}`, { stdio: "inherit" });
  console.log(`✅ Blocked issue ${issue}`);
} catch (e) {
  console.error(`❌ Failed to block issue ${issue}:`, e);
  process.exit(1);
}
