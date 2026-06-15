#!/usr/bin/env bun
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

function usage() {
  console.error(
    "Usage: bun scripts/reg-sync.ts [--all] [registry] [--fix]\n" +
      "  --all     Process all registries\n" +
      "  --fix     Regenerate missing indexes"
  );
  process.exit(1);
}
const args = process.argv.slice(2);
if (args.length === 0) usage();

const fix = args.includes("--fix");
const all = args.includes("--all");
const registries = all
  ? ["briefs", "debriefs", "decisions", "playbooks", "docs"]
  : args.filter((a) => !a.startsWith("--"));

function getIndexPath(reg: string): string {
  switch (reg) {
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
      console.error(`Unknown registry: ${reg}`);
      process.exit(1);
  }
}

function syncRegistry(reg: string) {
  const dirPath = resolve(reg);
  const indexPath = getIndexPath(reg);
  const files = readdirSync(dirPath).filter((f) => f !== "INDEX.jsonl" && f !== "REGISTRY.jsonl");
  const indexLines = existsSync(indexPath) ? readFileSync(indexPath, "utf-8").split("\n").filter(Boolean) : [];
  const indexedFiles = new Set<string>();
  indexLines.forEach((line) => {
    try {
      const entry = JSON.parse(line);
      indexedFiles.add(entry.file);
    } catch {}
  });

  const missing = files.filter((f) => !indexedFiles.has(f));
  const stale = [...indexedFiles].filter((f) => !files.includes(f));

  if (missing.length) {
    console.log(`[${reg}] MISSING: ${missing.join(", ")}`);
  }
  if (stale.length) {
    console.log(`[${reg}] STALE: ${stale.join(", ")}`);
  }

  if (fix) {
    const today = new Date().toISOString().slice(0, 10);
    const newLines = files.map((f) => {
      const existing = indexLines.find((l) => {
        try {
          const e = JSON.parse(l);
          return e.file === f;
        } catch {
          return false;
        }
      });
      if (existing) {
        return existing;
      }
      const entry = {
        file: f,
        date: today,
        status: "open",
        summary: "Auto‑generated entry",
        meta: {},
      };
      return JSON.stringify(entry);
    });
    writeFileSync(indexPath, newLines.join("\n") + "\n");
    console.log(`[${reg}] Regenerated ${indexPath}`);
  }
}

if (registries.length === 0) {
  console.error("No registries specified");
  process.exit(1);
}
registries.forEach(syncRegistry);
