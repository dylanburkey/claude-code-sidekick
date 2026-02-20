# Phase Control Skill

## Purpose
Enforces strict phase boundaries during project execution. Prevents scope creep by ensuring work stays within the authorized phase.

## When to Use
- Before executing any task
- When task-runner completes a phase
- When any agent attempts to create deliverables
- When planning work that might span multiple phases

## Core Rules

### 1. Phase Authorization
```yaml
current_phase: 1  # Read from .claude/state/execution.json
authorized_phases: [1]  # Only phases explicitly approved
```

### 2. Pre-Task Validation
Before executing ANY task:
1. Check task ID prefix matches current phase (e.g., PHASE1-xxx)
2. Verify deliverables are within phase scope
3. Confirm no dependencies on future-phase tasks

### 3. Scope Violation Detection
Flag as SCOPE VIOLATION if:
- Task creates files listed in Phase N+1 deliverables
- Task references components from future phases
- Task implements features marked "Phase 2+" in PROJECT_STARTER.md

### 4. Hard Stop Protocol
When phase completes:
```
┌─────────────────────────────────────────────────────────────┐
│  ⛔ PHASE BOUNDARY - EXECUTION HALTED                       │
│                                                             │
│  Phase {{N}} complete. Awaiting explicit user command.      │
│                                                             │
│  DO NOT:                                                    │
│  - Auto-plan Phase {{N+1}}                                  │
│  - Auto-execute any Phase {{N+1}} tasks                     │
│  - Generate Phase {{N+1}} task files                        │
│                                                             │
│  WAIT FOR: /task-planner phase={{N+1}}                      │
└─────────────────────────────────────────────────────────────┘
```

## State File
Maintain execution state in `.claude/state/execution.json`:
```json
{
  "current_phase": 1,
  "phase_status": "in_progress",
  "authorized_phases": [1],
  "completed_phases": [],
  "last_checkpoint": "2026-02-19T20:00:00Z",
  "awaiting_approval": false
}
```

## Commands

### Check Phase Status
```
/phase-status
```
Output: Current phase, completion %, next steps

### Authorize Next Phase
```
/phase-approve 2
```
Explicitly authorizes Phase 2 execution

### Lock to Phase
```
/phase-lock 1
```
Prevents any work beyond Phase 1

## Integration Points
- task-runner.md: Calls phase-control before each task
- orchestrator-agent.md: Respects phase boundaries
- dev-agent.md: Checks scope before creating files
