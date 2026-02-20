# Scope Guard Skill

## Purpose
Monitors all agent actions to prevent out-of-scope work. Acts as a watchdog that validates every file creation, modification, and task execution against the current phase scope.

## When to Use
- Automatically invoked before any file operation
- Called by dev-agent before implementation
- Called by orchestrator before task delegation

## Scope Validation Rules

### 1. File-Level Scope Check
Before creating/modifying ANY file:

```javascript
// Pseudocode for scope validation
function validateScope(filePath, currentPhase) {
  const phaseDeliverables = loadPhaseDeliverables(currentPhase);
  const futureDeliverables = loadFuturePhaseDeliverables(currentPhase);
  
  if (futureDeliverables.includes(filePath)) {
    return {
      allowed: false,
      reason: `File "${filePath}" is a Phase ${futurePhase} deliverable`,
      action: "STOP"
    };
  }
  
  return { allowed: true };
}
```

### 2. Task-Level Scope Check
Before executing ANY task:
```yaml
validation:
  - task_id_matches_phase: true
  - dependencies_in_scope: true
  - deliverables_in_scope: true
  - no_future_phase_imports: true
```

### 3. Code-Level Scope Check
During implementation, flag:
- Imports from future-phase modules
- References to future-phase components
- API calls to future-phase endpoints

## Violation Handling

### Level 1: Warning
```
⚠️  SCOPE WARNING
Creating file that may belong to future phase.
File: src/components/AdvancedFeature.js
Suspected Phase: 3

Continue? (Requires explicit confirmation)
```

### Level 2: Block
```
⛔ SCOPE VIOLATION - BLOCKED
Cannot create Phase 2 deliverable while in Phase 1.

File: src/api/advancedEndpoint.js
Reason: Listed in Phase 2 deliverables

Action: STOPPED
Resolution: Run /task-planner phase=2 first
```

### Level 3: Emergency Stop
```
🚨 CRITICAL SCOPE VIOLATION
Multiple out-of-scope operations detected.
Execution HALTED to prevent scope creep.

Violations:
1. Created 3 Phase 2 files
2. Modified Phase 3 config
3. Implemented Phase 2 feature

Manual review required before continuing.
```

## Scope Definition Sources
Read scope from (in priority order):
1. `.claude/tasks/phase-N-tasks.md` - Task deliverables
2. `.claude/project-plan/phase_N.md` - Phase scope
3. `PROJECT_STARTER.md` - Overall phase definitions

## Integration

### With Dev Agent
```markdown
## Before Any Implementation

1. Load scope-guard skill
2. Call validateScope(planned_files)
3. If violations: STOP and report
4. If clean: proceed with implementation
```

### With Orchestrator
```markdown
## Before Task Delegation

1. Validate task is in current phase
2. Validate task dependencies are met
3. Validate no scope violations
4. Only then delegate to agent
```

## Configuration
```yaml
# .claude/config.yml
scope_guard:
  enabled: true
  strictness: "strict"  # strict | moderate | relaxed
  on_violation: "block" # block | warn | log
  allow_override: false
```
