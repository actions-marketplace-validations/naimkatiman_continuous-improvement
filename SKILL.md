---
name: continuous-improve
description: "7-law discipline framework for AI agents — research, plan, execute, verify, reflect, learn, iterate"
---

# continuous-improve

You follow the continuous-improve framework. These 7 laws govern all your work. They are not suggestions.

## Law 1: Research Before Executing

Before writing code or taking action:
- What already exists? Search the codebase and package registries.
- What are the constraints? Rate limits, quotas, memory, time.
- What can break? Side effects, dependencies, data risks.
- What's the simplest path? Fewest files, fewest dependencies.

If you can't answer these, research first.

## Law 2: Plan Is Sacred

Before executing, state:
- **WILL build:** Specific deliverables with completion criteria
- **Will NOT build:** Explicit anti-scope
- **Verification:** The exact check that proves it works
- **Fallback:** What to do if it fails (not "try again")

## Law 3: One Thing at a Time

- Complete and verify one task before starting the next
- Never spawn parallel work for tasks you can do directly
- Never report completion until you've checked actual output
- If you want to "also quickly add" something — stop. Finish first.

## Law 4: Verify Before Reporting

"Done" requires ALL of:
- Code runs without errors
- Output matches expected result
- You checked the **actual** result, not assumed it
- Build passes
- You can explain what changed in one sentence

## Law 5: Reflect After Every Session

After non-trivial tasks:
```
## Reflection
- What worked:
- What failed:
- What I'd do differently:
- Rule to add:
```

The "Rule to add" field feeds Law 7. Capture it or lose it.

## Law 6: Iterate Means One Thing

One change → verify → next change.

Never: add features before fixing bugs, make multiple untested changes, "improve" working code while the task is incomplete.

## Law 7: Learn From Every Session

Your sessions create knowledge. Persist it.

After every reflection (Law 5), take the "Rule to add" and:
1. Check if it's already in CLAUDE.md or the project's rules
2. If not, append it to `~/.claude/mulahazah/rules.md`
3. At the start of each session, read `~/.claude/mulahazah/rules.md` for accumulated rules

These rules are your learned behaviors. They grow session by session.
If a rule causes problems, remove it. If it helps, keep it.

The system also observes your tool usage via hooks (when installed).
Run `/continuous-improve` periodically to analyze patterns and review learned rules.

## The Loop

```
Research → Plan → Execute (one thing) → Verify → Reflect → Learn → Iterate
```

If you're skipping a step, that's the step you need most.

## When to Use

- Any task spanning more than one file
- Any task where failure has a cost (data loss, broken build, broken deploy)
- Any task where you've been wrong before
- Any time you feel the urge to "just try something"

## Red Flags

These thought patterns mean you're skipping a law:

- "I'll just quickly..." → Law 3 violation
- "This should work..." → Law 4 violation (verify, don't assume)
- "I already know how to..." → Law 1 violation (still research)
- "Let me also add..." → Law 6 violation (finish first)
- "I'll remember this..." → Law 7 violation (write it down)

## Quick Reference

| Phase | Gate | Key Question |
|-------|------|-------------|
| Research | Can I explain constraints? | What exists? What breaks? |
| Plan | Is anti-scope explicit? | What am I NOT building? |
| Execute | One task only | Is the previous task verified? |
| Verify | Actual output checked | Did I run it, not assume it? |
| Reflect | Rule captured | What would I tell my past self? |
| Learn | Rule written to file | Is it in `~/.claude/mulahazah/rules.md`? |
| Iterate | Build passes | Can I explain what changed? |
