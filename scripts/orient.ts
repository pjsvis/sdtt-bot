#!/usr/bin/env bun
import { execSync } from "child_process";

console.log("Orienting agent – syncing registries...");
execSync("bun scripts/reg-sync.ts --all --fix", { stdio: "inherit" });
console.log("Agent ready.");
