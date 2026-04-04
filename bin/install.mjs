#!/usr/bin/env node

/**
 * continuous-improve-skill installer
 *
 * Usage:
 *   npx continuous-improve-skill                # auto-detect & install
 *   npx continuous-improve-skill --target claude # install to ~/.claude/skills/
 *   npx continuous-improve-skill --target openclaw # install to ~/.openclaw/skills/
 *   npx continuous-improve-skill --target cursor # install to ~/.cursor/skills/
 *   npx continuous-improve-skill --target all    # install to all detected targets
 *   npx continuous-improve-skill --uninstall     # remove from all targets
 */

import { existsSync, mkdirSync, copyFileSync, readFileSync, unlinkSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILL_SOURCE = join(__dirname, "..", "SKILL.md");
const SKILL_NAME = "continuous-improve";

const TARGETS = {
  claude: {
    label: "Claude Code",
    dir: join(homedir(), ".claude", "skills", SKILL_NAME),
  },
  openclaw: {
    label: "OpenClaw",
    dir: join(homedir(), ".openclaw", "skills", SKILL_NAME),
  },
  cursor: {
    label: "Cursor",
    dir: join(homedir(), ".cursor", "skills", SKILL_NAME),
  },
  codex: {
    label: "Codex",
    dir: join(homedir(), ".codex", "skills", SKILL_NAME),
  },
};

function detectTargets() {
  const detected = [];
  for (const [key, target] of Object.entries(TARGETS)) {
    const parentDir = dirname(target.dir);
    const configDir = dirname(parentDir);
    if (existsSync(configDir)) {
      detected.push(key);
    }
  }
  return detected;
}

function installTo(key) {
  const target = TARGETS[key];
  if (!target) {
    console.error(`  Unknown target: ${key}`);
    return false;
  }

  try {
    mkdirSync(target.dir, { recursive: true });
    copyFileSync(SKILL_SOURCE, join(target.dir, "SKILL.md"));
    console.log(`  ✓ ${target.label} → ${target.dir}/SKILL.md`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${target.label}: ${err.message}`);
    return false;
  }
}

function uninstallAll() {
  console.log("\n🗑  Uninstalling continuous-improve skill...\n");
  let removed = 0;
  for (const [key, target] of Object.entries(TARGETS)) {
    const skillFile = join(target.dir, "SKILL.md");
    if (existsSync(skillFile)) {
      try {
        rmSync(target.dir, { recursive: true });
        console.log(`  ✓ Removed from ${target.label}`);
        removed++;
      } catch (err) {
        console.error(`  ✗ ${target.label}: ${err.message}`);
      }
    }
  }
  if (removed === 0) {
    console.log("  No installations found.");
  }
  console.log();
}

function printUsage() {
  console.log(`
Usage: npx continuous-improve-skill [options]

Options:
  --target <name>   Install to specific target (claude, openclaw, cursor, codex, all)
  --uninstall       Remove from all targets
  --help            Show this help

Examples:
  npx continuous-improve-skill              # auto-detect & install
  npx continuous-improve-skill --target all # install everywhere
  npx continuous-improve-skill --uninstall  # remove all
`);
}

// --- Main ---

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  printUsage();
  process.exit(0);
}

if (args.includes("--uninstall")) {
  uninstallAll();
  process.exit(0);
}

console.log(`
╔══════════════════════════════════════════════════════╗
║        continuous-improve-skill installer            ║
║   Research → Plan → Execute → Verify → Reflect       ║
╚══════════════════════════════════════════════════════╝
`);

const targetIdx = args.indexOf("--target");
let targets;

if (targetIdx !== -1 && args[targetIdx + 1]) {
  const requested = args[targetIdx + 1].toLowerCase();
  if (requested === "all") {
    targets = Object.keys(TARGETS);
  } else if (TARGETS[requested]) {
    targets = [requested];
  } else {
    console.error(`Unknown target: ${requested}`);
    console.error(`Available: ${Object.keys(TARGETS).join(", ")}, all`);
    process.exit(1);
  }
} else {
  targets = detectTargets();
  if (targets.length === 0) {
    console.log("No supported agent configs detected. Installing to Claude Code by default.\n");
    targets = ["claude"];
  } else {
    console.log(`Detected: ${targets.map((t) => TARGETS[t].label).join(", ")}\n`);
  }
}

console.log("Installing...\n");

let installed = 0;
for (const t of targets) {
  if (installTo(t)) installed++;
}

console.log(`
${installed > 0 ? "✅" : "❌"} Installed to ${installed}/${targets.length} target(s).

Next steps:
  1. Start a new agent session
  2. Say: "Use the continuous-improve framework to [your task]"
  3. Watch the 5-phase loop in action

Docs: https://github.com/naimkatiman/continuous-improve-skill
`);
