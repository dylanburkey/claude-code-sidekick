# TODO - Current Tasks

**Last Updated:** 2026-03-18

## Active Branch: docs/improve-readme-clarity

## Uncommitted Changes (Pending Commit)

These files are modified but not yet committed on `docs/improve-readme-clarity`:

- `.env.example` - Added DASHBOARD section (DASHBOARD_PORT, PROJECT_ROOT note)
- `.prettierignore` - Updated ignore rules
- `cli/src/scaffold.js` - Added `launchDashboard()` and `spawn` import
- `cli/src/utils.js` - Added `openInBrowser()` cross-platform utility
- `package.json` - Added `dashboard:dev` and `dashboard:build` scripts, pnpm overrides
- `pnpm-lock.yaml` - Updated lock file
- `tools/multi-model/lib/clients.js` - Contains current state (Venice AI already committed)

## Untracked Files (New, Not Staged)

- `.serena/` - Serena MCP configuration (new)
- `pnpm-workspace.yaml` - Monorepo workspace config (new, IMPORTANT)
- `project-plan/` - Generated phase plans
- `specs/ops-dashboard.md` - Ops dashboard spec (new feature spec)
- `tools/dashboard/` - New SvelteKit dashboard tool (entire directory)

## In Progress

### Dashboard Tool (tools/dashboard/)
- Status: Scaffolded, not yet committed
- Stack: SvelteKit 2 + Svelte 5 + Vite 6 + adapter-node
- Port: 5174
- Next: Run `pnpm dashboard:build` to produce `build/index.js` for auto-launch
- Routes exist: agents, history, hooks, review, skills, api/

### CLI Dashboard Launch Integration
- Status: Code written (uncommitted), needs commit
- Files: `cli/src/scaffold.js` (launchDashboard), `cli/src/utils.js` (openInBrowser)
- Behavior: Non-blocking spawn after project creation, opens browser at localhost:5174

## Planned

### Ops Dashboard (specs/ops-dashboard.md)
- Status: Spec written, implementation not started
- Phases: scaffold+shell → Cloudflare tab → GitHub tab → Asana tab → polish+deploy
- Deploy target: ops.codesidekick.xyz via Tailscale + Coolify
- Run `/project-planner` against ops-dashboard spec to start

### README Improvements
- Branch `docs/improve-readme-clarity` - README already committed (01e9b36)
- Pending: Commit remaining changes and merge to main

## Completed Recently

- [x] Venice AI (VVV) support - commit 8fed0b0 (feat: Add Venice AI support)
- [x] Multi-model toolkit - tools/multi-model/ (OpenAI, Anthropic, Gemini, Venice)
- [x] Single-model mode support - commit 3c55fcd
- [x] PR quality check CI workflow - .github/workflows/pr-quality-check.yml
- [x] Removed invoice file - commit 81f5a37
- [x] README clarity improvements - commit 01e9b36
- [x] Crypto dashboard example - examples/crypto-dashboard/
- [x] SSG starter example - examples/ssg-starter/
- [x] Agent library (50+ agents)
- [x] 35+ MCP integrations
- [x] 32+ hooks system

## Next Actions

1. Commit pending changes on docs/improve-readme-clarity branch:
   - Stage: pnpm-workspace.yaml, tools/dashboard/, .env.example changes,
     cli/src/scaffold.js, cli/src/utils.js, package.json, specs/ops-dashboard.md
   - Then merge to main

2. Build dashboard: `pnpm dashboard:build` to enable auto-launch

3. Plan ops dashboard: `/project-planner` against `specs/ops-dashboard.md`
