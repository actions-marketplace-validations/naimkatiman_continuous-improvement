# Quickstart — continuous-improve

New here? This gets you from zero to a working first session in under 5 minutes.

---

## Step 1: Install

**OpenClaw:**
```bash
mkdir -p ~/.openclaw/skills/continuous-improve && \
curl -o ~/.openclaw/skills/continuous-improve/SKILL.md \
  https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

**Any other agent — paste this into your chat:**
```
Before starting any task, fetch and follow the skill at:
https://raw.githubusercontent.com/naimkatiman/continuous-improve-skill/main/SKILL.md
```

---

## Step 2: Trigger It

Give your agent a real task and prefix it:

```
Use the continuous-improve framework to [your task here].
```

Examples:
```
Use the continuous-improve framework to add pagination to the users API endpoint.
Use the continuous-improve framework to debug why the login form breaks on mobile.
Use the continuous-improve framework to refactor the payment module to use the new SDK.
```

---

## Step 3: Watch the Phases

Your agent should walk through each phase out loud. If it jumps straight to execution — stop it and say:

```
You skipped research and planning. Go back to Phase 1.
```

Here's what each phase looks like in practice:

### Phase 1 — Research (agent checks before acting)
> "Checked the codebase — no pagination exists yet. Constraint: PostgreSQL, Prisma ORM. Risk: query could timeout on large tables. Simplest path: cursor-based pagination, single query change."

### Phase 2 — Plan (agent writes explicit plan)
> "WILL build: `cursor` + `limit` params on GET /users. Will NOT build: offset pagination, frontend UI. Verification: `curl '/api/users?limit=5&cursor=10'` returns 5 records with a `nextCursor` field."

### Phase 3 — Execute (one thing at a time)
> "Modifying users route... done. Adding cursor logic to Prisma query... done. No other changes."

### Phase 4 — Verify (agent runs the actual check)
> "Running: `curl '/api/users?limit=5&cursor=10'`. Got: 5 records, nextCursor present. ✅"

### Phase 5 — Reflect (agent writes a lesson)
> "Logged to learning-log.md: cursor pagination needs a unique sort field — created_at alone isn't stable. Use id as tiebreaker next time."

---

## Step 4: Check the Learning Log

After any non-trivial session, your agent should have written to `memory/learning-log.md`.

```bash
cat memory/learning-log.md
```

If it's empty — ask your agent why it skipped Phase 5.

---

## Common First-Session Problems

**Agent skips straight to coding?**
→ Add this to your system prompt: *"Always announce which skill phase you are in before acting."*

**Agent writes "done" without verifying?**
→ Reply: *"What verification command did you run? Show me the output."*

**Agent doesn't know what learning-log.md is?**
→ Tell it: *"Write a reflection to memory/learning-log.md — what worked, what failed, what to do differently."*

**Phases feel slow for tiny tasks?**
→ They should. For tiny tasks (< 5 min), compress phases 1-2 to one sentence each. The discipline matters more for bigger tasks.

---

## You're Ready

That's it. The skill is most valuable when:
- You're under pressure and tempted to skip steps
- A task has failed 2+ times and you don't know why
- You're handing off work to subagents
- You want a session that produces a learnable artifact, not just code

Questions or edge cases → [open an issue](https://github.com/naimkatiman/continuous-improve-skill/issues).
