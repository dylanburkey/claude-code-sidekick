# Task Completion Hook

## Trigger
This hook activates when any task is marked as completed.

## Purpose
Ensure proper task finalization and maintain project state:
1. Validate completion criteria met
2. Update task tracking documents
3. Trigger dependent task notifications
4. Generate task completion report

## Activation

```yaml
trigger:
  event: "task_complete"
  source: "task-runner"
  
  payload:
    task_id: "PHASE1-003"
    agent: "dev"
    status: "completed"
    artifacts: []
```

## Validation Steps

### 1. Acceptance Criteria Check
```yaml
validate:
  criteria:
    - all acceptance criteria marked complete
    - no blocking issues remain
    - required files exist
    - tests passing (if applicable)
```

### 2. Artifact Verification
```yaml
artifacts:
  verify:
    - files created/modified as expected
    - no untracked changes left
    - proper file naming conventions
```

### 3. Documentation Check
```yaml
documentation:
  verify:
    - inline comments added
    - JSDoc for public APIs
    - CLAUDE.md updated if needed
```

## Actions

### Update Task File
```markdown
### PHASE1-003: Implement Header Component
- **Status**: ✅ Completed
- **Completed**: 2024-01-15 14:30:00
- **Agent**: dev
- **Duration**: 45 minutes
- **Artifacts**:
  - src/components/header.js (created)
  - src/components/header.css (created)
  - tests/header.test.js (created)
```

### Notify Dependent Tasks
```yaml
notify:
  tasks:
    - id: "PHASE1-004"
      message: "Dependency PHASE1-003 completed"
      status: "ready"
    - id: "PHASE1-005"
      message: "Dependency PHASE1-003 completed"
      status: "pending" # still has other dependencies
```

### Update Progress Tracking
```yaml
progress:
  phase: 1
  completed: 3
  remaining: 12
  blocked: 0
  percentage: 20
```

## Completion Report

Generated at `.claude/docs/task-reports/PHASE1-003.md`:

```markdown
# Task Completion Report: PHASE1-003

## Summary
- **Task**: Implement Header Component
- **Status**: Completed
- **Agent**: dev-agent
- **Started**: 2024-01-15 13:45:00
- **Completed**: 2024-01-15 14:30:00
- **Duration**: 45 minutes

## Deliverables
| File | Action | Lines |
|------|--------|-------|
| src/components/header.js | Created | 85 |
| src/components/header.css | Created | 120 |
| tests/header.test.js | Created | 45 |

## Acceptance Criteria
- [x] Responsive header component
- [x] Navigation support
- [x] Accessible keyboard navigation
- [x] Unit tests passing

## Notes
Implementation followed existing component patterns.
Used CSS Grid for layout per project standards.

## Next Steps
- PHASE1-004 now unblocked
- PHASE1-005 pending other dependencies
```

## Configuration

In `.claude/config.yml`:
```yaml
hooks:
  task_complete:
    enabled: true
    generate_report: true
    update_tracking: true
    notify_dependents: true
    validate_criteria: true
```

## Error Handling

If validation fails:
```yaml
on_failure:
  - revert task status to "in_progress"
  - log validation failures
  - notify orchestrator
  - provide remediation steps
```
