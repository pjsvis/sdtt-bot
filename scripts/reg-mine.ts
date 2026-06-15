#!/usr/bin/env bun
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, basename } from "path";

function usage() {
  console.error(
    "Usage: bun scripts/reg-mine.ts <source-file> [--apply]\n" +
      "  --apply   Write transformed file to playbooks/ and update registry"
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
const raw = readFileSync(srcPath, "utf-8");

// Simple mining rules
let transformed = raw
  .replace(/TradingAgents/g, "<PROJECT>")
  .replace(/src\/server\//g, "<SRC-SERVER>/")
  .replace(/\$\{[^}]+\}/g, "<ENV>")
  .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "<UUID>")
  .replace(/session-\d+/gi, "<SESSION>")
  .replace(/\b[A-Z]{2,5}\b/g, "<TOKEN>"); // generic token placeholder

if (!apply) {
  console.log(transformed);
  process.exit(0);
}

// Write to playbooks directory
const targetName = basename(srcPath);
const targetPath = resolve("playbooks", targetName);
writeFileSync(targetPath, transformed);
console.log(`Wrote transformed file to ${targetPath}`);

// Update registry entry in playbooks/REGISTRY.jsonl
const registryPath = resolve("playbooks", "REGISTRY.jsonl");
let registryLines: string[] = [];
if (existsSync(registryPath)) {
  registryLines = readFileSync(registryPath, "utf-8").split("\n").filter(Boolean);
}
const today = new Date().toISOString().slice(0, 10);
let updated = false;
const newLines = registryLines.map((line) => {
  const entry = JSON.parse(line);
  if (entry.file === targetName) {
    entry.meta = entry.meta || {};
    entry.meta.last_mined = today;
    updated = true;
    return JSON.stringify(entry);
  }
  return line;
});
if (!updated) {
  const newEntry = {
    file: targetName,
    date: today,
    status: "canonical",
    summary: "Mined version",
    meta: { last_mined: today },
  };
  newLines.push(JSON.stringify(newEntry));
}
writeFileSync(registryPath, newLines.join("\n") + "\n");
console.log(`Updated registry ${registryPath}`);
