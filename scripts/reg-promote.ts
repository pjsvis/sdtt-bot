#!/usr/bin/env bun
import { readFileSync, existsSync } from "fs";
import { resolve, basename } from "path";

function usage() {
  console.error(
    "Usage: bun scripts/reg-promote.ts <source-file> [--diff] [--apply]\n" +
      "  --diff    Show line‑by‑line diff\n" +
      "  --apply   Perform mining (same as reg-mine --apply)"
  );
  process.exit(1);
}
if (process.argv.length < 3) usage();
const srcPath = process.argv[2];
const diff = process.argv.includes("--diff");
const apply = process.argv.includes("--apply");

if (!existsSync(srcPath)) {
  console.error(`Source file not found: ${srcPath}`);
  process.exit(1);
}
const raw = readFileSync(srcPath, "utf-8");

function mine(content: string): string {
  return content
    .replace(/TradingAgents/g, "<PROJECT>")
    .replace(/src\/server\//g, "<SRC-SERVER>/")
    .replace(/\$\{[^}]+\}/g, "<ENV>")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "<UUID>")
    .replace(/session-\d+/gi, "<SESSION>")
    .replace(/\b[A-Z]{2,5}\b/g, "<TOKEN>");
}
const transformed = mine(raw);

if (diff) {
  console.log("--- Original");
  console.log(raw);
  console.log("--- Transformed");
  console.log(transformed);
  process.exit(0);
}
if (apply) {
  const exec = require("child_process").execSync;
  const cmd = `bun scripts/reg-mine.ts ${srcPath} --apply`;
  try {
    exec(cmd, { stdio: "inherit" });
  } catch (e) {
    console.error("Failed to apply mining:", e);
    process.exit(1);
  }
  process.exit(0);
}

// Default: show a simple diff summary (line changes)
function diffSummary(orig: string, mined: string): void {
  const origLines = orig.split("\n");
  const minedLines = mined.split("\n");
  const max = Math.max(origLines.length, minedLines.length);
  for (let i = 0; i < max; i++) {
    const o = origLines[i] ?? "";
    const m = minedLines[i] ?? "";
    if (o !== m) {
      console.log(`- ${o}`);
      console.log(`+ ${m}`);
    }
  }
}
\Summary(raw, transformed);
