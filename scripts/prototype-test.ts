#!/usr/bin/env bun
import { execSync } from "child_process";

function run(cmd: string) {
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  // 1. orient – should succeed and generate indexes
  run("bun scripts/orient.ts");

  // 2. verify playbooks registry has at least one entry
  const registryPath = "playbooks/REGISTRY.jsonl";
  const content = execSync(`cat ${registryPath}`).toString();
  const lines = content.trim().split("\n").filter(Boolean);
  if (lines.length === 0) {
    console.error("❌ REGISTRY.jsonl is empty");
    process.exit(1);
  }
  console.log(`✅ REGISTRY.jsonl has ${lines.length} entries`);

  // 3. help – should print three commands
  run("bun scripts/help.ts");

  console.log("✅ Prototype test passed");
} catch (e) {
  console.error("❌ Prototype test failed", e);
  process.exit(1);
}
