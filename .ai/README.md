# Claude Code Sidekick - AI Memory System

**Last Updated:** 2026-03-18

## What Is This Project

Claude Code Sidekick is a complete development framework for AI-assisted coding
with Claude. It provides professional project scaffolding (`npx create-claude-project`),
50+ specialized agents, 35+ MCP integrations, 32+ automated hooks, a multi-model
AI toolkit, and a local web dashboard.

## Quick Orientation

**You are in:** `/Users/dylanburkey/dev/projects/claude-code-sidekick`
**Current branch:** `docs/improve-readme-clarity`
**Package manager:** pnpm (workspace monorepo)
**Node version:** >=18.0.0

## Monorepo Structure

```
claude-code-sidekick/
├── .ai/                    # THIS memory system
├── .claude/                # Claude Code config (agents, commands, hooks, rules, skills)
├── cli/                    # npx create-claude-project CLI
├── tools/
│   ├── multi-model/        # Multi-model AI toolkit (OpenAI/Anthropic/Gemini/Venice)
│   └── dashboard/          # SvelteKit local web dashboard (NEW, untracked)
├── specs/                  # EARS feature specifications
├── examples/               # Example projects (crypto-dashboard, ssg-starter)
├── docs/                   # Documentation guides
├── project-plan/           # Generated phase plans (untracked)
├── pnpm-workspace.yaml     # Workspace: [cli, tools/*] (NEW, untracked)
├── .env.example            # All environment variables documented
└── CLAUDE.md               # AI assistant context document
```

## Key Capabilities

| Capability | Location | Status |
|-----------|----------|--------|
| CLI scaffolding | `cli/` | Complete |
| Agent system | `.claude/agents/` | Complete (50+ agents) |
| Slash commands | `.claude/commands/` | Complete (11 commands) |
| Skills | `.claude/skills/` | Complete (4 skills) |
| Hooks | `.claude/hooks/` | Complete (32+ hooks) |
| MCP integrations | `.claude/mcp/` | Complete (35+ servers) |
| Multi-model AI | `tools/multi-model/` | Complete (4 providers) |
| Local dashboard | `tools/dashboard/` | In Progress |
| Ops dashboard | `specs/ops-dashboard.md` | Planned |

## AI Providers (Multi-Model Toolkit)

| Provider | Key | Models |
|---------|-----|--------|
| OpenAI | OPENAI_API_KEY | gpt-4o, gpt-4o-mini |
| Anthropic | ANTHROPIC_API_KEY | claude-sonnet-4, claude-haiku-4 |
| Google | GEMINI_API_KEY | gemini-1.5-pro, gemini-2.0-flash |
| Venice AI | VENICE_API_KEY | llama-3.3-70b, deepseek-r1-671b, + 4 more |

## Recent Changes (Last 5 Commits)

1. `01e9b36` - docs: Improve README and documentation clarity
2. `c99c997` - Merge PR #8 (Venice AI support)
3. `8fed0b0` - feat: Add Venice AI (VVV) support to multi-model toolkit
4. `dad44b8` - Merge PR #7 (remove invoice)
5. `81f5a37` - chore: Remove invoice file

## Memory Files

| File | Contents |
|------|----------|
| `ARCHITECTURE.json` | System architecture, data flows, config files |
| `FILES.json` | Complete file index with line references |
| `PATTERNS.md` | Code patterns, templates, best practices |
| `BUSINESS.json` | Features, status, product decisions |
| `QUICK.md` | Commands, env vars, debugging |
| `TODO.md` | Current tasks, pending commits, planned work |
| `README.md` | This file - system overview |
| `SPRINT_UPDATE.md` | Update procedures for this memory system |

## Important Decisions & Context

1. **Venice AI** uses OpenAI SDK with custom `baseURL` - it's OpenAI-compatible
2. **Dashboard auto-launch** is best-effort (non-blocking) - only fires if built
3. **Phase gates are HARD STOPS** - never auto-advance between development phases
4. **Zero dependencies** in CLI - uses only Node built-ins (no fs-extra)
5. **pnpm workspace** at root manages cli + tools/* as linked packages
6. **Gemini key typo tolerance** - accepts both `GEMINI_API_KEY` and `GEMENI_API_KEY`
