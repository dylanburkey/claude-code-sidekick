# /worktree-enable - Enable Git Worktree Mode

## Purpose
Enables parallel task execution using git worktrees. Simple one-command opt-in.

## Trigger
```
/worktree-enable
```

## What It Does

### Step 1: Check Prerequisites
```bash
# Verify git version supports worktrees
git --version  # Requires 2.5+

# Verify we're in a git repo
git rev-parse --git-dir
```

### Step 2: Create Worktree Directory
```bash
mkdir -p .worktrees
echo ".worktrees/" >> .gitignore
```

### Step 3: Update Config
Adds to `.claude/config.yml`:
```yaml
git:
  worktrees:
    enabled: true
    base_dir: ".worktrees"
    auto_cleanup: true
    max_concurrent: 3
```

### Step 4: Confirm
```
╔══════════════════════════════════════════════════════════════╗
║  ✓ GIT WORKTREE MODE ENABLED                                 ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Parallel execution is now active.                           ║
║                                                              ║
║  Settings:                                                   ║
║  ├─ Worktree directory: .worktrees/                          ║
║  ├─ Max concurrent: 3                                        ║
║  ├─ Auto cleanup: enabled                                    ║
║  └─ Merge strategy: auto                                     ║
║                                                              ║
║  Commands:                                                   ║
║  ├─ /worktree-list    - Show active worktrees                ║
║  ├─ /worktree-cleanup - Remove completed worktrees           ║
║  └─ /worktree-disable - Return to sequential mode            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## Options

```
/worktree-enable --max 5          # Set max concurrent worktrees
/worktree-enable --no-cleanup     # Don't auto-remove worktrees
/worktree-enable --squash         # Squash merge instead of regular
```

## Example Workflow

```bash
# 1. Enable worktrees
/worktree-enable

# 2. Run task planner (generates tasks)
/task-planner

# 3. Run task runner (now uses worktrees)
/task-runner

# Tasks without dependencies run in parallel:
# .worktrees/PHASE1-001/ ← Task 1
# .worktrees/PHASE1-002/ ← Task 2 (parallel)
# .worktrees/PHASE1-003/ ← Task 3 (parallel)

# 4. On completion, worktrees auto-merge and clean up
```

## Reverting
```
/worktree-disable
```
