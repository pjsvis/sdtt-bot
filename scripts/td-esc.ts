#!/usr/bin/env bun
import { execSync } from "child_process";

try {
  execSync(`td usage --new-session`, { stdio: "inherit" });
  console.log("✅ Session reset (new td session).");
} catch (e) {
  console.error("❌ Failed to reset td session:", e);
  process.exit(1);
}
