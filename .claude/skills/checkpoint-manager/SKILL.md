# Checkpoint Manager Skill

## Purpose
Manages execution checkpoints to ensure proper stopping points and enable safe resumption of work. Creates explicit gates that require user approval before continuing.

## When to Use
- At phase boundaries
- After critical task completion
- Before any deployment action
- When significant decisions are needed

## Checkpoint Types

### 1. Phase Checkpoint (MANDATORY)
Triggered when all tasks in a phase complete.

```
╔══════════════════════════════════════════════════════════════╗
║  📍 CHECKPOINT: Phase 1 Complete                             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Summary:                                                    ║
║  ├─ Tasks Completed: 8/8                                     ║
║  ├─ Files Created: 12                                        ║
║  ├─ Tests Passing: 24/24                                     ║
║  └─ Documentation: Updated                                   ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  ⏸️  EXECUTION PAUSED                                        ║
║                                                              ║
║  Review the completed work before continuing.                ║
║  To proceed: /checkpoint-continue                            ║
║  To rollback: /checkpoint-rollback                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### 2. Critical Task Checkpoint
Triggered after high-risk tasks (database changes, auth setup, etc.)

```
📍 CHECKPOINT: Critical Task Complete
Task: PHASE1-005 (Database Schema Setup)

Changes made:
- Created migrations/001_initial.sql
- Updated schema.prisma
- Generated Prisma client

⚠️  This task made structural changes.
Review before continuing: /checkpoint-review PHASE1-005
```

### 3. Decision Checkpoint
Triggered when agent encounters ambiguity.

```
📍 CHECKPOINT: Decision Required

The task requires a choice between:
A) Implement feature using REST API
B) Implement feature using GraphQL

Context: [explanation]

Waiting for input: /decide A or /decide B
```

## Checkpoint State

Stored in `.claude/state/checkpoints.json`:
```json
{
  "checkpoints": [
    {
      "id": "cp-001",
      "type": "phase",
      "phase": 1,
      "timestamp": "2026-02-19T20:30:00Z",
      "status": "awaiting_approval",
      "summary": {
        "tasks_completed": 8,
        "files_created": 12,
        "tests_passing": 24
      }
    }
  ],
  "current_checkpoint": "cp-001",
  "can_continue": false
}
```

## Commands

### View Current Checkpoint
```
/checkpoint-status
```

### Approve and Continue
```
/checkpoint-continue
```
Marks checkpoint as approved, allows execution to continue.

### Rollback
```
/checkpoint-rollback
```
Reverts to state before checkpoint (requires git).

### Review Specific Checkpoint
```
/checkpoint-review <checkpoint-id>
```
Shows detailed diff of changes.

## Integration with Git

Each checkpoint creates a git tag:
```bash
git tag -a "checkpoint/phase-1-complete" -m "Phase 1 checkpoint"
```

Rollback uses:
```bash
git reset --hard "checkpoint/phase-1-start"
```

## Enforcement Rules

1. **No auto-continue**: Checkpoints MUST wait for explicit `/checkpoint-continue`
2. **Logged approval**: Record who approved and when
3. **Reversible**: Always maintain ability to rollback
4. **Visible**: Checkpoints must output clear terminal messages

## Configuration
```yaml
# .claude/config.yml
checkpoints:
  enabled: true
  require_approval: true
  auto_tag_git: true
  checkpoint_on:
    - phase_complete
    - critical_task
    - deployment
    - schema_change
```
