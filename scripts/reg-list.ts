#!/usr/bin/env bun
import { readFileSync } from "fs";
import { resolve } from "path";

function usage() {
  console.error("Usage: bun scripts/reg-list.ts <registry>");
  process.exit(1);
}
if (process.argv.length < 3) usage();
const registry = process.argv[2];
const indexFile = (() => {
  switch (registry) {
    case "briefs":
      return resolve("briefs/INDEX.jsonl");
    case "debriefs":
      return resolve("debriefs/INDEX.jsonl");
    case "decisions":
      return resolve("decisions/INDEX.jsonl");
    case "playbooks":
      return resolve("playbooks/REGISTRY.jsonl");
    case "docs":
      return resolve("docs/INDEX.jsonl");
    default:
      console.error(`Unknown registry: ${registry}`);
      process.exit(1);
  }
})();

let data: string;
try {
  data = readFileSync(indexFile, "utf-8");
} catch (e) {
  console.error(`Failed to read ${indexFile}: ${e}`);
  process.exit(1);
}
const entries = data
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

if (entries.length === 0) {
  console.log(`No entries in ${indexFile}`);
  process.exit(0);
}

// Compute column widths
const colWidths = {
  file: Math.max(...entries.map((e) => e.file.length), 4),
  date: 10,
  status: Math.max(...entries.map((e) => e.status.length), 6),
  summary: Math.max(...entries.map((e) => e.summary.length), 7),
};

function pad(str: string, len: number) {
  return str + " ".repeat(Math.max(0, len - str.length));
}

console.log(
  `${pad("FILE", colWidths.file)} ${pad("DATE", colWidths.date)} ${pad(
    "STATUS",
    colWidths.status
  )} ${pad("SUMMARY", colWidths.summary)}`
);
console.log("-".repeat(colWidths.file + colWidths.date + colWidths.status + colWidths.summary + 3));
for (const e of entries) {
  console.log(
    `${pad(e.file, colWidths.file)} ${pad(e.date, colWidths.date)} ${pad(
      e.status,
      colWidths.status
    )} ${pad(e.summary, colWidths.summary)}`
  );
}
