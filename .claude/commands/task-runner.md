# Task Runner Command

## Purpose

Executes tasks from a task file using the appropriate subagents, completing them
one by one in dependency order.

## Trigger

Run after `task-planner` has generated a task list.

## Arguments

- `phase` (optional): Phase number to execute. Defaults to `1`.
- `task` (optional): Specific task ID to run. If omitted, runs all pending
  tasks.
- `mode` (optional): Execution mode - `sequential` (default) or `batch`.

## Instructions

### Step 0: Display Phase Boundary Notice

Before ANY execution, output:

```
┌─────────────────────────────────────────────────────────────┐
│         PHASE {{PHASE}} EXECUTION STARTING                 │
│                                                             │
│  ⚠️  This session is LIMITED to Phase {{PHASE}} only        │
│                                                             │
│  Scope Control: ACTIVE                                      │
│  Auto-Advance: DISABLED                                     │
│  Phase Lock: Phase {{PHASE}}                                │
│                                                             │
│  The system will STOP at phase completion.                  │
│  Manual command required for next phase.                    │
└─────────────────────────────────────────────────────────────┘
```

### Step 0.5: Load Required Skills

Before execution, load:
1. `.claude/skills/phase-control/SKILL.md`
2. `.claude/skills/scope-guard/SKILL.md`
3. `.claude/skills/checkpoint-manager/SKILL.md`

### Step 1: Load Task File

Read `.claude/tasks/phase-{{PHASE}}-tasks.md` and parse:

1. **Task List** - All tasks with their metadata
2. **Dependencies** - Task dependency graph
3. **Status** - Current status of each task

### Step 2: Build Execution Plan

1. **Filter** - Get tasks with status `pending` or `blocked`
2. **Sort** - Order by dependencies and priority
3. **Group** - Identify parallelizable batches
4. **Validate** - Ensure no circular dependencies

### Step 3: Execute Tasks

For each task in order:

#### 3.1 Pre-Execution Check

- Verify all dependencies are `complete`
- If blocked, move to next task
- Load agent configuration

#### 3.2 Invoke Subagent

Based on task assignment, invoke the appropriate agent:

```yaml
Agent Mapping:
  init: .claude/agents/init-agent.md
  planner: .claude/agents/planner-agent.md
  dev: .claude/agents/dev-agent.md
  test: .claude/agents/test-agent.md
  docs: .claude/agents/docs-agent.md
  review: .claude/agents/review-agent.md
```

When invoking an agent:

1. Load agent configuration from file
2. Pass task context (description, criteria, deliverables)
3. Apply relevant rules from `.claude/rules/`
4. Monitor execution

#### 3.3 Agent Execution Protocol

Each agent follows this protocol:

```markdown
## Task Execution: {{TASK_ID}}

### Context

- Task: {{TASK_NAME}}
- Description: {{DESCRIPTION}}
- Deliverables: {{DELIVERABLES}}

### Execution Steps

1. Review acceptance criteria
2. Plan implementation approach
3. Execute implementation
4. Verify deliverables
5. Self-review against criteria

### Completion Report

- Status: {{complete/failed/blocked}}
- Deliverables Created: {{LIST}}
- Notes: {{Any issues or observations}}
```

#### 3.4 Post-Execution

After each task:

1. Update task status in task file
2. Log execution details
3. Trigger documentation hook if applicable
4. Check if dependent tasks are unblocked

### Step 4: Handle Failures

If a task fails:

1. **Log Error** - Capture failure details
2. **Mark Status** - Set task to `failed`
3. **Block Dependents** - Mark dependent tasks as `blocked`
4. **Report** - Generate failure report
5. **Decision** - Prompt for retry or skip

### Step 5: Progress Reporting

After each task batch, report:

```markdown
## Execution Progress

### Completed

- [x] PHASE1-001: Set up project structure
- [x] PHASE1-002: Create configuration files

### In Progress

- [ ] PHASE1-003: Implement core component

### Blocked

- [ ] PHASE1-004: Write tests (waiting on PHASE1-003)

### Failed

- [ ] PHASE1-005: Integration setup (Error: ...)

### Summary

- Completed: 2/10
- In Progress: 1/10
- Blocked: 1/10
- Failed: 1/10
- Remaining: 5/10
```

### Step 6: Phase Completion (HARD STOP)

When all tasks complete:

1. **Generate Report** - Summary of phase execution
2. **Update Documentation** - Trigger docs agent
3. **Notify** - Report phase completion
4. **STOP EXECUTION** - **DO NOT proceed to next phase automatically**

Output exactly this completion message:

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ✓ PHASE {{PHASE}} COMPLETE                                  ║
║                                                               ║
║   All tasks for Phase {{PHASE}} have been executed.           ║
║                                                               ║
║   ─────────────────────────────────────────────────────────   ║
║                                                               ║
║   To continue to Phase {{PHASE+1}}, run BOTH commands:        ║
║                                                               ║
║     /task-planner phase={{PHASE+1}}                           ║
║     /task-runner phase={{PHASE+1}}                            ║
║                                                               ║
║   ─────────────────────────────────────────────────────────   ║
║                                                               ║
║   ⚠️  MANUAL COMMAND REQUIRED - NO AUTO-ADVANCE              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

**CRITICAL RULES:**
- **NEVER** automatically invoke task-planner for next phase
- **NEVER** automatically invoke task-runner for next phase
- **NEVER** generate Phase N+1 plans without explicit user command
- **ALWAYS** wait for explicit `/task-planner phase=N` command
- **ALWAYS** require user confirmation before ANY next-phase work

## Agent Invocation

### Loading an Agent

```javascript
// Pseudocode for agent invocation
async function invokeAgent(taskContext) {
  const agent = await loadAgent(taskContext.agent);
  const rules = await loadRules(agent.applicableRules);

  const execution = await agent.execute({
    task: taskContext,
    rules: rules,
    sharedContext: await loadSharedContext(),
  });

  return execution.result;
}
```

### Agent Context Object

```yaml
TaskContext:
  id: 'PHASE1-001'
  name: 'Set up project structure'
  agent: 'init'
  description: '...'
  acceptanceCriteria: [...]
  deliverables: [...]
  dependencies: []
  technicalNotes: '...'

AgentContext:
  config: '.claude/agents/init-agent.md'
  capabilities: [...]
  tools: [...]

ExecutionContext:
  sharedContext: [CLAUDE.md, README.md, ...]
  rules: [code-style, documentation, accessibility]
  outputDir: '.claude/docs'
```

## Output

The command produces:

1. Updated `.claude/tasks/phase-{{PHASE}}-tasks.md` with status changes
2. Deliverables as defined by each task
3. Execution log in `.claude/docs/execution-logs/`
4. Updated README.md and CLAUDE.md via hooks

## Example Usage

```bash
# Run all pending tasks in phase 1
/task-runner

# Run a specific phase
/task-runner phase=2

# Run a specific task
/task-runner task=PHASE1-003

# Run in batch mode (parallel where possible)
/task-runner mode=batch
```

## Execution Modes

### Sequential Mode (Default)

- Executes one task at a time
- Safer, easier to debug
- Better for initial runs

### Batch Mode

- Groups independent tasks
- Executes batches in parallel
- Faster for large task lists
- Requires careful dependency management

## Error Recovery

### Retry Strategy

```yaml
retry:
  max_attempts: 3
  backoff: exponential
  initial_delay: 1s
  max_delay: 30s
```

### Skip Strategy

- Mark task as `skipped`
- Block dependent tasks
- Continue with independent tasks
- Report at end

### Manual Intervention

- Pause execution
- Request user input
- Resume with guidance

## Best Practices

1. **Review First** - Check task list before running
2. **Start Sequential** - Use batch mode only when confident
3. **Monitor Progress** - Watch for early failures
4. **Handle Blockers** - Address blocked tasks promptly
5. **Document Issues** - Log problems for future reference
