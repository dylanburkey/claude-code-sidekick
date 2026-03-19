# Quick Reference - Commands & Debugging

**Last Updated:** 2026-03-18

## Development Commands

### Root Package (from project root)
```bash
pnpm lint              # ESLint on cli/src + cli/bin
pnpm lint:fix          # Auto-fix lint issues
pnpm format            # Prettier write
pnpm format:check      # Prettier check (CI)
pnpm test              # Vitest run
pnpm test:watch        # Vitest watch mode
pnpm test:coverage     # Coverage report
pnpm validate          # lint + format:check + test (full CI check)
pnpm dashboard:dev     # Start dashboard dev server (port 5174)
pnpm dashboard:build   # Build dashboard for production
```

### Multi-Model Toolkit (from tools/multi-model/)
```bash
pnpm install           # Install deps
pnpm review -- ../cli/src/scaffold.js --deep   # Review with all models
pnpm review -- ../cli/src/scaffold.js          # Quick review
pnpm index -- ../     # Index entire codebase
pnpm search -- "project scaffolding"           # Semantic search
```

### Dashboard (from tools/dashboard/)
```bash
pnpm dev               # Dev server at http://localhost:5174
pnpm build             # Build for production (outputs build/index.js)
pnpm start             # Start production server
```

### CLI Testing
```bash
cd cli && node bin/index.js   # Run CLI directly
npx create-claude-project     # Published CLI
```

### Git Workflow
```bash
git log --oneline -10         # Recent commits
git diff HEAD~5..HEAD --stat  # What changed recently
```

## Environment Setup

Required in `.env` at project root:
```bash
# At least one is required:
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
VENICE_API_KEY=...           # Venice AI (VVV token)

# Dashboard
DASHBOARD_PORT=5174          # Default port for local dashboard

# Disable multi-model (single provider fallback)
USE_MULTI_MODEL=FALSE
```

## Slash Commands (Claude Code)

| Command | Purpose | Output |
|---------|---------|--------|
| `/project-planner` | Analyze PROJECT_STARTER.md, create phase plans | `project-plan/phase_N.md` |
| `/task-planner` | Generate tasks from phase plan | `tasks/phase-N-tasks.md` |
| `/task-runner` | Execute tasks via agents | Completed code |
| `/quick-start` | Fast setup from PROJECT_STARTER.md | Project configured |
| `/phase-approve` | Approve current phase, advance to next | Phase gate passed |
| `/worktree-enable` | Enable parallel task execution | `.worktrees/` created |
| `/worktree-disable` | Disable worktrees | Worktrees cleaned up |
| `/status` | Show current phase/task status | Status report |
| `/mcp-setup` | Configure MCP integrations | MCP servers configured |
| `/hooks-setup` | Configure automation hooks | Hooks enabled |
| `/analyze-project` | Analyze project structure | Analysis report |

## Venice AI Usage

```javascript
import { complete, MODELS, VENICE_MODELS } from './tools/multi-model/index.js';

// Use Venice model directly
const result = await complete(MODELS.VENICE_LLAMA_70B, 'Your prompt here');

// Or with venice/ prefix
const result = await complete('venice/llama-3.3-70b', 'Your prompt here');

// Check Venice is available
import { hasProvider } from './tools/multi-model/index.js';
if (hasProvider('venice')) { /* use venice */ }
```

Venice models: `llama-3.3-70b`, `llama-3.2-3b`, `deepseek-r1-671b`,
`deepseek-r1-llama-70b`, `dolphin-2.9.2-qwen2-72b`, `qwen-2.5-72b`

## Multi-Model Programmatic Usage

```javascript
import { reviewCode, createRouter, searchCodebase } from './tools/multi-model/index.js';

// Consensus code review
const results = await reviewCode(code, { filename: 'app.js' });
console.log(results.confirmedIssues); // Issues 2+ models agree on

// Route to optimal model
const router = createRouter('balanced'); // or 'speed', 'quality', 'cost'
const response = await router.route('Explain this architecture...');

// Semantic search (requires indexed codebase)
const matches = await searchCodebase('authentication logic', {
  indexPath: '.code-index/index.json'
});
```

## Dashboard Auto-Launch

Dashboard launches automatically after CLI scaffolding IF:
1. `tools/dashboard/build/index.js` exists (run `pnpm dashboard:build`)
2. `DASHBOARD_PORT` env var (default: 5174)

To launch manually:
```bash
PROJECT_ROOT=/path/to/project PORT=5174 node tools/dashboard/build/index.js
```

## Common Debugging

### Multi-model errors
- "No API keys configured" - Set at least one API key in .env
- "Unknown model: X" - Check MODELS constants in clients.js, use MODELS.X
- "GEMINI_API_KEY not set" - Accepts both GEMINI_API_KEY and GEMENI_API_KEY

### CLI scaffolding issues
- Dashboard not launching: Run `pnpm dashboard:build` first
- Path errors: CLI uses `path.dirname(fileURLToPath(import.meta.url))` - check ESM __dirname

### Workspace issues
- "Package not found": Run `pnpm install` from repo root (workspace hoisting)
- Lock file conflicts: `pnpm install` regenerates pnpm-lock.yaml

### Phase/Agent workflow issues
- Phase won't advance: Must run `/phase-approve` explicitly - no auto-advance
- Agent not found: Check `.claude/agents/` for agent .md files
- Scope guard blocking: Check current phase scope in `.claude/skills/scope-guard/SKILL.md`

## File Quick Reference

| Need to... | File |
|-----------|------|
| Add new env var | `.env.example` + document it |
| Add CLI preset | `cli/src/templates.js` PRESETS object |
| Add AI provider | `tools/multi-model/lib/clients.js` |
| Add Venice model | VENICE_MODELS array + MODELS object + MODEL_COSTS in clients.js |
| Add slash command | `.claude/commands/your-command.md` |
| Add agent | `.claude/agents/your-agent.md` |
| Add hook | `.claude/hooks/your-hook.md` + config.yml |
| Add MCP server | `.claude/mcp/default-servers.md` |
| Write new spec | `specs/feature-name.md` using EARS notation |
| Add dashboard route | `tools/dashboard/src/routes/your-route/` |
