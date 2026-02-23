# /phase-approve - Authorize Next Phase

## Purpose

Explicitly authorizes execution of the next phase. This is the ONLY way to
advance beyond the current phase.

## Trigger

```
/phase-approve <phase_number>
```

## Arguments

- `phase_number` (required): The phase number to authorize (e.g., 2)

## Process

### Step 1: Validate Request

1. Check that previous phase is complete
2. Check that requested phase is next in sequence
3. Verify no unresolved scope violations

### Step 2: Confirm with User

```
╔══════════════════════════════════════════════════════════════╗
║  📋 PHASE AUTHORIZATION REQUEST                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Requesting authorization for: Phase {{N}}                   ║
║                                                              ║
║  Prerequisites:                                              ║
║  ├─ Phase {{N-1}}: ✓ Complete                                ║
║  ├─ Scope Violations: ✓ None                                 ║
║  └─ Checkpoints: ✓ All approved                              ║
║                                                              ║
║  ────────────────────────────────────────────────────────    ║
║                                                              ║
║  Phase {{N}} Scope (from project-plan):                      ║
║  ├─ {{OBJECTIVE_1}}                                          ║
║  ├─ {{OBJECTIVE_2}}                                          ║
║  └─ {{OBJECTIVE_3}}                                          ║
║                                                              ║
║  Estimated Tasks: {{TASK_COUNT}}                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type "APPROVE" to authorize Phase {{N}}, or "CANCEL" to abort.
```

### Step 3: Update State

If approved, update `.claude/state/execution.json`:

```json
{
  "authorized_phases": [1, 2],
  "current_phase": 2,
  "phase_status": "not_started"
}
```

### Step 4: Confirm Authorization

```
╔══════════════════════════════════════════════════════════════╗
║  ✓ PHASE {{N}} AUTHORIZED                                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  You may now run:                                            ║
║    /task-planner phase={{N}}                                 ║
║    /task-runner phase={{N}}                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## Validation Rules

### Cannot Approve If:

- Previous phase is not complete
- Unresolved scope violations exist
- Pending checkpoints require approval
- Skipping phases (e.g., approving Phase 3 when Phase 2 not done)

### Error Messages

```
⛔ CANNOT AUTHORIZE PHASE {{N}}

Reason: Phase {{N-1}} is not complete.
Status: {{INCOMPLETE_TASKS}} tasks remaining.

Complete Phase {{N-1}} first, then try again.
```

## Example Usage

```bash
# After completing Phase 1
/phase-approve 2

# View current authorization
/status
```
