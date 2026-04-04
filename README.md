# continuous-improve

> Stop your AI agent from skipping steps, guessing, and declaring "done" without verifying.

[![Version](https://img.shields.io/badge/version-1.1.0-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Inspired by](https://img.shields.io/badge/inspired_by-Superpowers-purple)](https://github.com/obra/superpowers)

---

## The Problem

AI agents are great at individual steps. They're terrible at discipline.

They skip research. They plan loosely. They declare "done" before verifying. They add features mid-task. They never reflect. Each session, they repeat the same mistakes.

This skill fixes that — not with suggestions, but with **gates** that block forward progress until each phase is actually complete.

---

## Install

### Option 1: npx (recommended)

Auto-detects your AI tools and installs to all of them:

```bash
npx continuous-improve-skill
```

Install to a specific target:

```bash
npx continuous-improve-skill --target claude    # Claude Code only
npx continuous-improve-skill --target openclaw  # OpenClaw only
npx continuous-improve-skill --target cursor    # Cursor only
npx continuous-improve-skill --target all       # All targets
```

Uninstall:

```bash
npx continuous-improve-skill --uninstall
```

### Option 2: One-line shell script

```bash
curl -fsSL https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/install.sh | bash
```

### Option 3: Manual

```bash
mkdir -p ~/.claude/skills/continuous-improve && \
curl -fsSL -o ~/.claude/skills/continuous-improve/SKILL.md \
  https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

Replace `~/.claude` with `~/.openclaw`, `~/.cursor`, or `~/.codex` for other tools.

### Option 4: Tell your agent

```
Fetch and follow the skill at: https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

---

## Your First Task (Do This Now)

After installing, give your agent this prompt:

```
Use the continuous-improve framework to [describe your task].
```

Your agent should respond with:
> *"I'm using the continuous-improve framework for this task."*

Then watch it research before planning, plan before executing, and verify before reporting done. If it skips any of those — the skill needs more emphasis in your config.

---

## How It Works

Five phases. Each has a gate. You can't proceed without passing it.

```
Research → Plan → Execute → Verify → Reflect
```

| Phase | What happens | Gate |
|-------|-------------|------|
| **1. Research** | Agent checks what exists, what can break, simplest path | Must answer 4 questions before proceeding |
| **2. Plan** | Agent writes explicit plan: scope, anti-scope, verification, fallback | Written plan required — vague plan = blocked |
| **3. Execute** | One task at a time. No scope creep. No parallel work. | Task complete, nothing added out of scope |
| **4. Verify** | Agent runs the actual verification command. No assumptions. | Command ran. Output matched. |
| **5. Reflect** | Agent writes what worked, what failed, what to do differently | Written to learning-log before session closes |

### The Iron Law

```
NO EXECUTION WITHOUT RESEARCH AND PLAN FIRST
NO REPORTING DONE WITHOUT VERIFICATION
NO NEXT TASK WHILE CURRENT TASK IS INCOMPLETE
```

---

## What a Good Run Looks Like

```
You: Use continuous-improve to add rate limiting to the API.

Agent: I'm using the continuous-improve framework for this task.

[Phase 1 - Research]
- Checked: middleware/auth.js exists, no rate limiting present
- Constraint: Redis not available — must use in-memory or express-rate-limit
- Risk: Shared state won't work across multiple workers
- Simplest path: express-rate-limit package, single-file middleware

[Phase 2 - Plan]
WILL build: rate-limit middleware in middleware/rateLimit.js, applied in app.js
Will NOT build: Redis adapter, per-user limits, admin override
Verification: curl -X POST /api/login 6 times rapidly, expect 429 on 6th
Fallback: manual token bucket if express-rate-limit has issues

[Phase 3 - Execute]
Installing express-rate-limit... done
Writing middleware/rateLimit.js... done
Applying in app.js... done

[Phase 4 - Verify]
Running: curl loop against /api/login × 6
Result: requests 1-5 → 200, request 6 → 429 ✅

[Phase 5 - Reflect]
Logged to memory/learning-log.md:
- express-rate-limit works fine without Redis for single-process apps
- Anti-scope saved us from over-engineering Redis adapter
```

---

## Red Flags (Shortcuts the Skill Blocks)

If your agent says any of these — it's skipping the process:

- "I'll research after I start"
- "Just try this and see if it works"
- "It's probably X, let me fix that real quick"
- "While I'm here, I'll also improve..."
- "One more quick fix" *(after 2+ failed attempts)*
- "Done!" *(without running any verification)*

These aren't signs of speed — they're signs of future rework.

---

## Files

```
continuous-improve-skill/
├── SKILL.md              # The skill — load this into your agent
├── QUICKSTART.md         # Step-by-step first-use guide
├── CHANGELOG.md          # What changed between versions
├── README.md             # This file
├── package.json          # npm package for `npx continuous-improve-skill`
├── install.sh            # One-line shell installer
├── bin/
│   └── install.mjs       # Node.js CLI installer
└── .cloudplugin/
    └── marketplace.json  # Plugin marketplace metadata
```

---

## Contributing

Found a gap? Skill doesn't hold up under pressure? Open an issue or PR.

The best improvements come from real failure cases — describe what the agent did wrong and what rule would have caught it.

---

## Inspired By

[Superpowers by Jesse Vincent](https://github.com/obra/superpowers) — the best agentic skills framework out there. This skill applies the same gate-based philosophy to continuous improvement loops.

---

## License

MIT
