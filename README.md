# continuous-improve

> Stop your AI agent from skipping steps, guessing, and declaring "done" without verifying.

[![Version](https://img.shields.io/badge/version-2.0.1-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## The Problem

AI agents are great at individual steps. They're terrible at discipline.

They skip research. They plan loosely. They declare "done" before verifying. They add features mid-task. They never reflect. Each session, they repeat the same mistakes.

This skill fixes that with **7 laws** and a **learning system** that persists rules between sessions.

---

## Install

### Option 1: npx (recommended)

```bash
npx continuous-improve-skill
```

For Claude Code, this also installs:
- Observation hooks (captures every tool call as JSONL)
- `/continuous-improve` command
- Analysis pipeline (extracts rules from observations)
- Background observer (optional, runs Haiku for pattern detection)

Install to a specific target:

```bash
npx continuous-improve-skill --target claude    # Claude Code + Mulahazah
npx continuous-improve-skill --target openclaw  # OpenClaw (skill only)
npx continuous-improve-skill --target cursor    # Cursor (skill only)
npx continuous-improve-skill --target all       # All targets
```

### Option 2: Manual

```bash
mkdir -p ~/.claude/skills/continuous-improve && \
curl -fsSL -o ~/.claude/skills/continuous-improve/SKILL.md \
  https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

### Option 3: Tell your agent

```
Fetch and follow the skill at: https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

---

## The 7 Laws

| # | Law | What it prevents |
|---|-----|-----------------|
| 1 | **Research Before Executing** | Blind execution, rate limit violations, reinventing the wheel |
| 2 | **Plan Is Sacred** | Scope creep, vague goals, no fallback strategy |
| 3 | **One Thing at a Time** | Feature sprawl, compounding changes, context explosion |
| 4 | **Verify Before Reporting** | Premature "done", assumed success, broken builds |
| 5 | **Reflect After Every Session** | Repeated mistakes, lost lessons, no improvement |
| 6 | **Iterate Means One Thing** | Multiple untested changes, debugging nightmares |
| 7 | **Learn From Every Session** | Forgotten rules, same mistakes across sessions |

### The Loop

```
Research -> Plan -> Execute (one thing) -> Verify -> Reflect -> Learn -> Iterate
```

---

## What Actually Happens

After installing, give your agent any task:

```
Use continuous-improve to add rate limiting to the API.
```

Your agent will:

1. **Research** -- check what exists, constraints, risks, simplest path
2. **Plan** -- state what it WILL and WILL NOT build, exact verification, fallback
3. **Execute** -- one task at a time, no scope creep
4. **Verify** -- run the actual check, not assume it worked
5. **Reflect** -- log what worked, what failed, what rule to add
6. **Learn** -- save the rule to `~/.claude/mulahazah/rules.md`
7. **Iterate** -- one change, verify, next change

If it skips any of those, the skill needs more emphasis in your config.

---

## Mulahazah: Learning Between Sessions

**Law 7 is what makes this different.** Most agent frameworks are static rules. continuous-improve learns.

### How it works

1. **Hooks capture every tool call** -- PreToolUse/PostToolUse hooks write JSONL observations (<50ms, never blocks your session)
2. **Reflections create rules** -- when the agent reflects (Law 5), the "Rule to add" gets saved to `~/.claude/mulahazah/rules.md`
3. **Rules persist** -- next session, the agent reads its accumulated rules and follows them
4. **Analysis extracts patterns** -- run `/continuous-improve` to analyze observations and extract new rules automatically

### /continuous-improve command

Run this after finishing significant work:

```
/continuous-improve
```

It does three things:
1. **Reflects** on what happened this session
2. **Analyzes** pending observations for patterns (uses Haiku)
3. **Shows** all learned rules

### Background Observer (optional)

For automatic pattern detection between `/continuous-improve` runs:

```bash
~/.claude/mulahazah/agents/start-observer.sh
```

This runs a Haiku agent every 5 minutes to analyze accumulated observations. Cost-efficient -- only runs when 20+ observations accumulate.

---

## Files

```
continuous-improve-skill/
+-- SKILL.md                    # The 7 Laws
+-- commands/
|   +-- continuous-improve.md   # The /continuous-improve command
+-- hooks/
|   +-- observe.sh              # Observation hook
+-- agents/
|   +-- observer.md             # Background Haiku observer prompt
|   +-- observer-loop.sh        # Periodic analysis runner
|   +-- start-observer.sh       # Observer launcher
+-- bin/
|   +-- install.mjs             # CLI installer
|   +-- analyze.sh              # Observation analysis pipeline
+-- config.json                 # Observer config
+-- QUICKSTART.md               # First-use guide
+-- CHANGELOG.md                # Version history
+-- package.json
```

### What gets installed where (Claude Code)

```
~/.claude/skills/continuous-improve/SKILL.md     # The skill
~/.claude/commands/continuous-improve.md          # The command
~/.claude/mulahazah/
+-- observe.sh                                    # Hook script
+-- rules.md                                      # Learned rules (grows over time)
+-- config.json                                   # Observer config
+-- projects.json                                 # Project registry
+-- bin/analyze.sh                                # Analysis pipeline
+-- agents/                                       # Observer scripts
+-- projects/<hash>/observations.jsonl            # Per-project observations
```

---

## Red Flags

If your agent says any of these, it's skipping a law:

- "I'll just quickly..." -- Law 3 violation
- "This should work..." -- Law 4 violation (verify, don't assume)
- "I already know how to..." -- Law 1 violation (still research)
- "Let me also add..." -- Law 6 violation (finish first)
- "I'll remember this..." -- Law 7 violation (write it down)

---

## Contributing

Found a gap? The skill doesn't hold up under pressure? Open an issue or PR.

The best improvements come from real failure cases -- describe what the agent did wrong and what rule would have caught it.

---

## License

MIT
