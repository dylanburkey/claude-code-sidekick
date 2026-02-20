# /status - Execution Status Command

## Purpose
Displays current execution state, phase progress, and next steps.

## Trigger
Run `/status` at any time to see project state.

## Output Format

```
╔══════════════════════════════════════════════════════════════╗
║  📊 CLAUDE CODE SIDEKICK STATUS                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Project: {{PROJECT_NAME}}                                   ║
║  Phase:   {{CURRENT_PHASE}} of {{TOTAL_PHASES}}              ║
║  Status:  {{STATUS}}                                         ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  Phase {{CURRENT_PHASE}} Progress:                           ║
║  ├─ Tasks Completed: {{COMPLETED}}/{{TOTAL}}                 ║
║  ├─ Tasks In Progress: {{IN_PROGRESS}}                       ║
║  ├─ Tasks Blocked: {{BLOCKED}}                               ║
║  └─ Tasks Pending: {{PENDING}}                               ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  Scope Control:                                              ║
║  ├─ Phase Lock: Phase {{PHASE_LIMIT}}                        ║
║  ├─ Auto-Advance: {{AUTO_ADVANCE}}                           ║
║  └─ Violations: {{VIOLATION_COUNT}}                          ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  Active MCPs:                                                ║
║  ├─ Serena: {{SERENA_STATUS}}                                ║
║  ├─ Chrome DevTools: {{CHROME_STATUS}}                       ║
║  └─ Context7: {{CONTEXT7_STATUS}}                            ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  Next Steps:                                                 ║
║  {{NEXT_STEPS}}                                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## Data Sources

Read from:
1. `.claude/state/execution.json` - Execution state
2. `.claude/tasks/phase-{{N}}-tasks.md` - Task progress
3. `.claude/config.yml` - Configuration
4. MCP server status check

## Status Values

| Status | Meaning |
|--------|---------|
| `not_started` | Phase planning not yet run |
| `planning` | Running /project-planner or /task-planner |
| `in_progress` | Tasks being executed |
| `awaiting_approval` | At checkpoint, waiting for user |
| `complete` | Phase finished |
| `blocked` | Execution halted due to error/violation |

## Next Steps Logic

Based on current state, suggest:

- If `not_started`: "Run /project-planner to begin"
- If `planning`: "Review generated plan"
- If `in_progress`: "Continue with /task-runner"
- If `awaiting_approval`: "Review and run /checkpoint-continue"
- If `complete`: "Run /task-planner phase={{N+1}} for next phase"
- If `blocked`: "Resolve violations before continuing"
