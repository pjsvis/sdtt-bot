#!/usr/bin/env bun
import { execSync } from "child_process";

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: bun scripts/td-claim.ts <issue-id>");
  process.exit(1);
}
const issue = args[0];
try {
  execSync(`td start ${issue}`, { stdio: "inherit" });
  console.log(`✅ Claimed/started issue ${issue}`);
} catch (e) {
  console.error(`❌ Failed to claim issue ${issue}:`, e);
  process.exit(1);
}
