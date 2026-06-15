#!/usr/bin/env bun
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, basename } from "path";

function usage() {
  console.error(
    "Usage: bun scripts/reg-import.ts <source-file> [--apply]\n" +
      "  --apply   Copy file into playbooks/ and register it"
  );
  process.exit(1);
}
if (process.argv.length < 3) usage();
const srcPath = process.argv[2];
const apply = process.argv.includes("--apply");

if (!existsSync(srcPath)) {
  console.error(`Source file not found: ${srcPath}`);
  process.exit(1);
}
const content = readFileSync(srcPath, "utf-8");
const targetName = basename(srcPath);
const targetPath = resolve("playbooks", targetName);

if (!apply) {
  console.log(`--- Preview of ${targetName} ---`);
  console.log(content);
  process.exit(0);
}
if (existsSync(targetPath)) {
  console.error(`File already exists in playbooks/: ${targetName}`);
  process.exit(1);
}
writeFileSync(targetPath, content);
console.log(`Imported ${targetName} to playbooks/`);

// Update registry
const registryPath = resolve("playbooks", "REGISTRY.jsonl");
let registryLines: string[] = [];
if (existsSync(registryPath)) {
  registryLines = readFileSync(registryPath, "utf-8").split("\n").filter(Boolean);
}
const today = new Date().toISOString().slice(0, 10);
const newEntry = {
  file: targetName,
  date: today,
  status: "canonical",
  summary: "Imported playbook",
  meta: {},
};
registryLines.push(JSON.stringify(newEntry));
writeFileSync(registryPath, registryLines.join("\n") + "\n");
console.log(`Updated registry ${registryPath}`);
