# /worktree-disable - Disable Git Worktree Mode

## Purpose
Returns to sequential task execution. Cleans up existing worktrees.

## Trigger
```
/worktree-disable
```

## Process

### Step 1: Check for Active Worktrees
If worktrees exist with uncommitted work:
```
⚠️  ACTIVE WORKTREES DETECTED

The following worktrees have uncommitted changes:
├─ .worktrees/PHASE1-002/ (modified: 3 files)
└─ .worktrees/PHASE1-003/ (modified: 1 file)

Options:
  /worktree-disable --force   - Discard changes and disable
  /worktree-disable --merge   - Merge all and disable
  /worktree-disable --abort   - Cancel disable
```

### Step 2: Clean Up Worktrees
```bash
# Remove all worktrees
git worktree list | grep ".worktrees" | while read wt; do
  git worktree remove "$wt" --force
done

# Remove worktree branches
git branch | grep "task/" | xargs git branch -D
```

### Step 3: Update Config
Sets in `.claude/config.yml`:
```yaml
git:
  worktrees:
    enabled: false
```

### Step 4: Confirm
```
╔══════════════════════════════════════════════════════════════╗
║  ✓ GIT WORKTREE MODE DISABLED                                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Returned to sequential execution.                           ║
║                                                              ║
║  Cleaned up:                                                 ║
║  ├─ Worktrees removed: 3                                     ║
║  └─ Branches deleted: 3                                      ║
║                                                              ║
║  To re-enable: /worktree-enable                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```
