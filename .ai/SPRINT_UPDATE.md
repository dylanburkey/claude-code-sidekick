# Memory System Update Procedures

**Last Updated:** 2026-03-18

## How to Update This Memory System

Run `/update` or say "update the memory system" to trigger the AI Memory System
Update Agent. It will:

1. Read all 8 files in `.ai/`
2. Analyze git diffs (`git diff`, `git log --oneline -20`, `git diff HEAD~10..HEAD`)
3. Identify gaps between diffs and memory files
4. Apply updates autonomously
5. Invoke `/commit` to commit changes

## Update Triggers

Update the memory system when:
- New features are implemented
- New files or packages are added
- Architecture decisions are made
- Dependencies change significantly
- Commands or workflows are added/changed
- A sprint or development phase completes

## What Gets Updated

| Change Type | Files to Update |
|------------|----------------|
| New feature | BUSINESS.json (status), FILES.json (new files), TODO.md |
| New AI provider | ARCHITECTURE.json, PATTERNS.md, BUSINESS.json, QUICK.md |
| New CLI command | FILES.json, QUICK.md |
| Architecture change | ARCHITECTURE.json, PATTERNS.md, README.md |
| New slash command | FILES.json, QUICK.md |
| New tool/package | FILES.json, ARCHITECTURE.json, QUICK.md |
| Phase completion | TODO.md (move to completed), BUSINESS.json (status update) |
| Bug fix with pattern | PATTERNS.md (add to debugging section) |

## JSON Validation

After any JSON file edit:
```bash
python3 -m json.tool /path/to/file.json > /dev/null && echo "valid" || echo "invalid"
```

## Line Count Target

Total `.ai/` folder: ~3000 lines (+/- 200 acceptable).

Check with:
```bash
wc -l /Users/dylanburkey/dev/projects/claude-code-sidekick/.ai/*.md \
       /Users/dylanburkey/dev/projects/claude-code-sidekick/.ai/*.json
```

## Memory File Purposes (Quick Reference)

- **ARCHITECTURE.json** - System design, data flows, integration points, config locations
- **FILES.json** - Every important file with purpose and line references
- **PATTERNS.md** - Reusable code patterns with examples from actual files
- **BUSINESS.json** - Feature status (planned/in-progress/complete), product decisions
- **QUICK.md** - Commands to run, env vars, debugging steps, file lookup table
- **TODO.md** - Current branch state, uncommitted files, next actions
- **README.md** - System overview, project orientation for new sessions
- **SPRINT_UPDATE.md** - This file - update procedures

## Venice AI Update Example (Reference)

When commit 8fed0b0 added Venice AI:
- ARCHITECTURE.json: Added `venice` to `multiModelArchitecture.providers`
- FILES.json: Updated `tools/multi-model/lib/clients.js` entries with line refs
- PATTERNS.md: Added "OpenAI-Compatible Adapter Pattern" and "venice/ Prefix Pattern"
- BUSINESS.json: Added `veniceAISupport` feature as `status: complete`
- QUICK.md: Added Venice AI usage examples and env var
- README.md: Updated AI Providers table

## Dashboard Addition Example (Reference)

When `tools/dashboard/` was added:
- ARCHITECTURE.json: Added `dashboardArchitecture` section and `tools/dashboard` workspace
- FILES.json: Added all `tools/dashboard/` file entries
- PATTERNS.md: Added "Non-Blocking Dashboard Launch" and "Server-Side API Proxy Pattern"
- BUSINESS.json: Added `localDashboard` feature as `status: in-progress`
- QUICK.md: Added `pnpm dashboard:dev` and `pnpm dashboard:build` commands
- TODO.md: Added dashboard in "In Progress" section
