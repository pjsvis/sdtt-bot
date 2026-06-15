#!/usr/bin/env bun
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

type Entry = {
  file: string;
  date: string;
  status: string;
  summary: string;
  meta?: Record<string, any>;
};

function validate(entry: any, lineNum: number, filePath: string): string[] {
  const errors: string[] = [];
  if (typeof entry.file !== "string") errors.push("file missing or not string");
  if (typeof entry.date !== "string") errors.push("date missing or not string");
  if (typeof entry.status !== "string") errors.push("status missing or not string");
  if (typeof entry.summary !== "string") errors.push("summary missing or not string");
  // meta is optional
  return errors.map((e) => `${filePath}:${lineNum}: ${e}`);
}

function checkRegistry(regPath: string) {
  if (!existsSync(regPath)) {
    console.error(`Registry file not found: ${regPath}`);
    return;
  }
  const lines = readFileSync(regPath, "utf-8").split("\n");
  lines.forEach((line, idx) => {
    if (!line.trim()) return;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      console.error(`${regPath}:${idx + 1}: Invalid JSON`);
      return;
    }
    const errs = validate(obj, idx + 1, regPath);
    errs.forEach((e) => console.error(e));
  });
}

// Determine which registries to check
const args = process.argv.slice(2);
if (args.length === 0) {
  // all registries
  const registries = [
    "briefs/INDEX.jsonl",
    "debriefs/INDEX.jsonl",
    "decisions/INDEX.jsonl",
    "playbooks/REGISTRY.jsonl",
    "docs/INDEX.jsonl",
  ];
  registries.forEach((p) => checkRegistry(resolve(p)));
} else {
  args.forEach((name) => {
    const path = (() => {
      switch (name) {
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
          console.error(`Unknown registry: ${name}`);
          return "";
      }
    })();
    if (path) checkRegistry(path);
  });
}
