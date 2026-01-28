## Description

This PR brings v2-clean-start improvements to main, including expanded platform
support and a comprehensive workflow optimization plan for the Claude Code
Sidekick command/agent architecture.

### What's included:

**Platform Support**

- Added Shopify and WordPress development support
- Updated QUICKSTART.md with accurate file paths

**Workflow Optimization Plan** (`.claude/optimization-plan/`)

- Four-command workflow: `/plan` → `/task` → `/run` → `/status`
- Single orchestrator coordinating all agent delegation
- State persistence with `progress.json` and `checkpoints.json` for session
  resumability
- Auto-documentation hooks triggered on file save
- Structured agent delegation protocol with context passing

## Type of Change

- [x] ✨ New feature (non-breaking change that adds functionality)
- [x] 📝 Documentation update

## Checklist

### Code Quality

- [x] My code follows the project's style guidelines
- [x] I have run `pnpm lint` and fixed all errors
- [x] I have run `pnpm format` to format my code
- [x] All functions have JSDoc comments

### Documentation

- [x] I have updated CLAUDE.md if needed
- [x] I have added JSDoc comments to new functions
- [x] I have updated README.md if needed

## Summary of Changes

| Commit    | Description                                                |
| --------- | ---------------------------------------------------------- |
| `5b36f0d` | Add workflow optimization plan for commands, agents, hooks |
| `452f3f5` | Update QUICKSTART.md with accurate file paths              |
| `a029f5c` | Add Shopify and WordPress development support              |

## Next Steps After Merge

1. Implement Phase 1: Core loop (orchestrator, state management, `/run`,
   `/status`)
2. Test with northcoast.ai as primary test project
3. Iterate on agent delegation patterns

## Additional Notes

The optimization plan establishes the canonical workflow for Claude Code
Sidekick, resolving previous confusion from multiple variations. It prioritizes
practical workflow automation with a focused four-command structure.
