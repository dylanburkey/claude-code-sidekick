# Git Worktree Skill

## Purpose
Enables parallel task execution using git worktrees. Each task runs in an isolated worktree, preventing conflicts and allowing concurrent development.

## Opt-In

Add to `.claude/config.yml`:
```yaml
git:
  worktrees:
    enabled: true
    base_dir: ".worktrees"     # Where worktrees are created
    auto_cleanup: true          # Remove worktrees after task completion
    max_concurrent: 3           # Max parallel worktrees
```

Or run:
```
/worktree-enable
```

## How It Works

### Without Worktrees (Default)
```
main branch
    ↓
Task 1 → Task 2 → Task 3 (sequential)
```

### With Worktrees (Opt-In)
```
main branch
    ↓
    ├── .worktrees/task-001/ → Task 1
    ├── .worktrees/task-002/ → Task 2  (parallel)
    └── .worktrees/task-003/ → Task 3
    ↓
Merge all back to main
```

## Commands

### Enable Worktrees
```
/worktree-enable
```
Enables worktree mode for current project.

### Disable Worktrees
```
/worktree-disable
```
Returns to sequential mode.

### List Active Worktrees
```
/worktree-list
```
Shows all active worktrees and their status.

### Clean Up Worktrees
```
/worktree-cleanup
```
Removes completed/merged worktrees.

## Task Runner Integration

When worktrees are enabled, task-runner changes behavior:

### Step 1: Create Worktree for Task
```bash
git worktree add .worktrees/PHASE1-001 -b task/PHASE1-001
```

### Step 2: Execute Task in Worktree
```bash
cd .worktrees/PHASE1-001
# Agent executes task here
```

### Step 3: Merge on Completion
```bash
git checkout main
git merge task/PHASE1-001
git worktree remove .worktrees/PHASE1-001
git branch -d task/PHASE1-001
```

## Parallel Execution

With worktrees, independent tasks run in parallel:

```
╔══════════════════════════════════════════════════════════════╗
║  🌳 WORKTREE MODE ACTIVE                                     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Parallel Tasks (no dependencies):                           ║
║  ├─ .worktrees/PHASE1-001/ → dev-agent (in progress)        ║
║  ├─ .worktrees/PHASE1-002/ → dev-agent (in progress)        ║
║  └─ .worktrees/PHASE1-003/ → dev-agent (in progress)        ║
║                                                              ║
║  Queued (waiting on dependencies):                           ║
║  └─ PHASE1-004 → waiting on PHASE1-001                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## Merge Strategy

### Auto-Merge (default)
Tasks auto-merge to main when:
- All tests pass
- No conflicts detected
- Review agent approves

### Manual Merge
If conflicts or review needed:
```
⚠️  MERGE REQUIRED

Task PHASE1-002 completed but has conflicts.
Worktree: .worktrees/PHASE1-002

To resolve:
  cd .worktrees/PHASE1-002
  git merge main
  # resolve conflicts
  /worktree-merge PHASE1-002
```

## Configuration Options

```yaml
git:
  worktrees:
    enabled: true
    base_dir: ".worktrees"
    auto_cleanup: true
    max_concurrent: 3
    branch_prefix: "task/"
    merge_strategy: "auto"      # auto | manual | squash
    require_review: false       # Require review-agent before merge
    preserve_on_failure: true   # Keep worktree if task fails
```

## .gitignore

When enabled, adds to `.gitignore`:
```
.worktrees/
```

## Benefits

1. **Parallel Execution** - Independent tasks run simultaneously
2. **Isolation** - Task changes don't interfere with each other
3. **Easy Rollback** - Just delete the worktree branch
4. **Clean History** - Each task is a clean branch

## Limitations

- Tasks with dependencies still run sequentially
- Requires git 2.5+ for worktree support
- More disk space (each worktree is a full checkout)
