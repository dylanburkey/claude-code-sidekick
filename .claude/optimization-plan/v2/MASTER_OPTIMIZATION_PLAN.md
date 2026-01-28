# Claude Code Sidekick: Master Optimization Plan v2

> **Status:** Active  
> **Created:** January 16, 2026  
> **Author:** Dylan Burkey  
> **Purpose:** Comprehensive optimization of hooks, agents, rules, and commands

---

## Executive Summary

This plan optimizes Claude Code Sidekick into a complete AI-assisted development workflow with six interconnected components:

1. **PROJECT_STARTER.md** → Project definition template
2. **project-planner** → Analyzes starter, creates phase plans
3. **phase documents** → Stored in `project-plan/phase_N.md`
4. **task-planner** → Converts phases into executable tasks
5. **task-runner** → Executes tasks via specialized subagents
6. **hooks** → Auto-generates documentation on file changes

The architecture supports two entry modes:
- **Greenfield Mode:** Start from PROJECT_STARTER.md
- **Existing Project Mode:** Start from PROJECT_TASK_LIST.md with codebase analysis

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ENTRY POINTS                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐            ┌──────────────────┐               │
│  │ ccs init         │            │ ccs join         │               │
│  │ (Greenfield)     │            │ (Existing)       │               │
│  └────────┬─────────┘            └────────┬─────────┘               │
│           │                               │                          │
│           ▼                               ▼                          │
│  ┌──────────────────┐            ┌──────────────────┐               │
│  │PROJECT_STARTER.md│            │ Codebase Analysis│               │
│  │                  │            │ + PROJECT_TASK_  │               │
│  │                  │            │   LIST.md        │               │
│  └────────┬─────────┘            └────────┬─────────┘               │
│           │                               │                          │
│           └───────────────┬───────────────┘                          │
│                           ▼                                          │
├─────────────────────────────────────────────────────────────────────┤
│                     PLANNING LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│           ┌──────────────────────────────┐                          │
│           │      /project-planner        │                          │
│           │                              │                          │
│           │  • Reads PROJECT_STARTER.md  │                          │
│           │    or PROJECT_TASK_LIST.md   │                          │
│           │  • Analyzes requirements     │                          │
│           │  • Creates phase documents   │                          │
│           └──────────────┬───────────────┘                          │
│                          │                                          │
│                          ▼                                          │
│           ┌──────────────────────────────┐                          │
│           │  project-plan/phase_N.md     │                          │
│           │                              │                          │
│           │  • Goals & objectives        │                          │
│           │  • Success criteria          │                          │
│           │  • Technical approach        │                          │
│           │  • Completion checklist      │                          │
│           └──────────────┬───────────────┘                          │
│                          │                                          │
├─────────────────────────────────────────────────────────────────────┤
│                     TASK LAYER                                       │
├─────────────────────────────────────────────────────────────────────┤
│                          │                                          │
│                          ▼                                          │
│           ┌──────────────────────────────┐                          │
│           │       /task-planner          │                          │
│           │                              │                          │
│           │  • Reads phase_N.md          │                          │
│           │  • Generates discrete tasks  │                          │
│           │  • Assigns agents            │                          │
│           │  • Sets dependencies         │                          │
│           └──────────────┬───────────────┘                          │
│                          │                                          │
│                          ▼                                          │
│           ┌──────────────────────────────┐                          │
│           │  tasks/phase-N-tasks.md      │                          │
│           │                              │                          │
│           │  • Task ID & description     │                          │
│           │  • Acceptance criteria       │                          │
│           │  • Assigned agent            │                          │
│           │  • Dependencies              │                          │
│           │  • Status (pending/done)     │                          │
│           └──────────────┬───────────────┘                          │
│                          │                                          │
├─────────────────────────────────────────────────────────────────────┤
│                   EXECUTION LAYER                                    │
├─────────────────────────────────────────────────────────────────────┤
│                          │                                          │
│                          ▼                                          │
│           ┌──────────────────────────────┐                          │
│           │       /task-runner           │                          │
│           │                              │                          │
│           │  • Reads task file           │                          │
│           │  • Creates git worktree      │                          │
│           │  • Delegates to agents       │                          │
│           │  • Updates progress state    │                          │
│           │  • Merges on completion      │                          │
│           └──────────────┬───────────────┘                          │
│                          │                                          │
│           ┌──────────────┴──────────────┐                           │
│           ▼              ▼              ▼                           │
│    ┌───────────┐  ┌───────────┐  ┌───────────┐                     │
│    │ dev-agent │  │test-agent │  │docs-agent │                     │
│    └───────────┘  └───────────┘  └───────────┘                     │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                     HOOKS LAYER                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Event Triggers                           │    │
│  │                                                              │    │
│  │  on-file-save ──► JSDoc generation, README update            │    │
│  │  on-task-complete ──► Progress update, state persistence     │    │
│  │  on-phase-complete ──► Worktree merge, CLAUDE.md update      │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component 1: PROJECT_STARTER.md

### Purpose
Single source of truth for greenfield project definition. Users fill this template to communicate their vision to Claude Code Sidekick.

### Location
`/PROJECT_STARTER.md` (project root)

### Current State
✅ Exists and is comprehensive (521 lines)

### Optimizations Needed

| Area | Issue | Solution |
|------|-------|----------|
| EARS Notation | Good but examples could be clearer | Add inline examples in template |
| Questions Section | Users don't know what to ask | Add suggested question prompts |
| Constraints | Buried in the document | Move to dedicated section |
| Tech Stack | Requires manual entry | Add preset options |

### Enhanced Template Structure

```markdown
# PROJECT_STARTER.md

## 1. Project Identity
- Name, description, type (web-app/api/library/cli/static-site)

## 2. Vision & Goals
- Primary goal (single sentence)
- Success criteria (measurable outcomes)
- Non-goals (explicit exclusions)

## 3. Requirements (EARS Notation)
- Functional requirements
- Non-functional requirements
- Quality attributes

## 4. Technical Decisions
- Framework/stack preferences
- Architecture style (monolith/microservices/serverless)
- Deployment target

## 5. Constraints
- Timeline
- Budget/resources
- Existing systems to integrate

## 6. Questions for Claude
- Architecture questions
- Technology choices
- Best practices inquiries

## 7. References
- Inspiration links
- Design mockups
- API documentation
```

---

## Component 2: Project Planner Command

### Purpose
Analyzes PROJECT_STARTER.md and creates phase documents with breakdown of goals, criteria, and technical approach.

### Location
`.claude/commands/project-planner.md`

### Current State
✅ Exists with good structure

### Enhanced Workflow

```
┌────────────────────────────────────────────────────────────────┐
│                    /project-planner                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUT:                                                         │
│  ├── PROJECT_STARTER.md (greenfield)                           │
│  └── PROJECT_TASK_LIST.md (existing projects)                  │
│                                                                 │
│  ANALYSIS STEPS:                                                │
│  1. Parse project definition                                    │
│  2. Identify complexity and dependencies                        │
│  3. Assess risks and blockers                                   │
│  4. Answer embedded questions                                   │
│  5. Determine optimal phase breakdown                           │
│                                                                 │
│  OUTPUT:                                                        │
│  ├── project-plan/phase_1.md                                   │
│  ├── project-plan/phase_2.md                                   │
│  ├── project-plan/phase_N.md                                   │
│  └── state/planning.json (metadata)                            │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Phase Document Template

```markdown
# Phase {{N}}: {{PHASE_NAME}}

> Generated: {{TIMESTAMP}}  
> Source: PROJECT_STARTER.md  
> Estimated Duration: {{DURATION}}

## Overview
{{Brief description of what this phase accomplishes}}

## Goals
1. {{Goal 1}}
2. {{Goal 2}}
3. {{Goal 3}}

## Intent
{{Why this phase exists and how it fits the overall project}}

## Success Criteria
- [ ] {{Criterion 1 - measurable}}
- [ ] {{Criterion 2 - testable}}
- [ ] {{Criterion 3 - verifiable}}

## Technical Approach

### Architecture Decisions
{{Key architectural choices for this phase}}

### Patterns to Use
- {{Pattern 1}}: {{Rationale}}
- {{Pattern 2}}: {{Rationale}}

### Dependencies
- **External:** {{NPM packages, APIs, services}}
- **Internal:** {{Components from previous phases}}

## Deliverables
1. {{Deliverable 1}} - {{Location}}
2. {{Deliverable 2}} - {{Location}}
3. {{Deliverable 3}} - {{Location}}

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{Risk 1}} | Medium | High | {{Strategy}} |

## Questions Answered
{{Responses to questions from PROJECT_STARTER.md}}

## Open Questions
{{Questions requiring user input before proceeding}}

## Transition to Next Phase
{{Conditions that must be met before moving to phase N+1}}
```

---

## Component 3: Task Planner Command

### Purpose
Reads phase documents and generates discrete, executable tasks with clear acceptance criteria and agent assignments.

### Location
`.claude/commands/task-planner.md`

### Enhanced Workflow

```
┌────────────────────────────────────────────────────────────────┐
│                      /task-planner                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUT:                                                         │
│  └── project-plan/phase_N.md                                   │
│                                                                 │
│  PROCESSING:                                                    │
│  1. Extract goals and deliverables                              │
│  2. Decompose into atomic tasks                                 │
│  3. Determine task dependencies (topological sort)              │
│  4. Assign appropriate agents                                   │
│  5. Estimate complexity                                         │
│  6. Set acceptance criteria                                     │
│                                                                 │
│  OUTPUT:                                                        │
│  ├── tasks/phase-N-tasks.md                                    │
│  └── state/tasks.json (machine-readable status)                │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Task File Template

```markdown
# Phase {{N}} Tasks

> Generated: {{TIMESTAMP}}  
> Source: project-plan/phase_{{N}}.md  
> Total Tasks: {{COUNT}}

## Task Overview

| ID | Task | Agent | Status | Dependencies |
|----|------|-------|--------|--------------|
| 1.1 | {{Task name}} | dev | pending | none |
| 1.2 | {{Task name}} | dev | pending | 1.1 |
| 1.3 | {{Task name}} | test | pending | 1.2 |

---

## Task Details

### Task 1.1: {{Task Name}}

**Agent:** dev-agent  
**Complexity:** Medium  
**Estimated Time:** 2 hours  
**Dependencies:** None

#### Description
{{Detailed description of what needs to be done}}

#### Acceptance Criteria
- [ ] {{Criterion 1}}
- [ ] {{Criterion 2}}
- [ ] {{Criterion 3}}

#### Files to Create/Modify
- `src/components/{{Component}}.tsx`
- `src/styles/{{Component}}.css`

#### Implementation Notes
{{Any specific guidance for the agent}}

---

### Task 1.2: {{Task Name}}
...
```

---

## Component 4: Task Runner Command

### Purpose
Executes tasks sequentially using specialized subagents, manages git worktrees for isolation, and tracks progress.

### Location
`.claude/commands/task-runner.md`

### Enhanced Workflow

```
┌────────────────────────────────────────────────────────────────┐
│                       /task-runner                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUT:                                                         │
│  └── tasks/phase-N-tasks.md                                    │
│                                                                 │
│  EXECUTION LOOP:                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Read pending tasks                                     │  │
│  │ 2. Create git worktree for phase                          │  │
│  │ 3. For each task in dependency order:                     │  │
│  │    a. Load task details                                   │  │
│  │    b. Invoke assigned agent                               │  │
│  │    c. Validate acceptance criteria                        │  │
│  │    d. Update progress state                               │  │
│  │    e. Trigger on-task-complete hook                       │  │
│  │ 4. On all tasks complete:                                 │  │
│  │    a. Run validation suite                                │  │
│  │    b. Merge worktree to main                              │  │
│  │    c. Trigger on-phase-complete hook                      │  │
│  │    d. Clean up worktree                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  OUTPUT:                                                        │
│  ├── Completed code in repository                              │
│  ├── state/progress.json (updated)                             │
│  └── state/checkpoints.json (for resumability)                 │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Agent Delegation Pattern

```yaml
# Task execution delegation
task:
  id: "1.1"
  name: "Create user authentication component"
  agent: "dev-agent"
  
delegation:
  # Context provided to agent
  context:
    - phase_document: "project-plan/phase_1.md"
    - task_file: "tasks/phase-1-tasks.md"
    - project_context: "CLAUDE.md"
    
  # Agent instructions
  instructions: |
    Execute task 1.1 following acceptance criteria.
    Create files in the worktree.
    Report completion status.
    
  # Success validation
  validation:
    - acceptance_criteria_met: true
    - lint_passes: true
    - types_valid: true
```

---

## Component 5: Specialized Agents

### Agent Directory Structure

```
.claude/agents/
├── orchestrator-agent.md    # Coordinates all agents
├── dev-agent.md             # Code implementation
├── test-agent.md            # Test creation and validation
├── docs-agent.md            # Documentation generation
├── review-agent.md          # Code review and quality
├── security-agent.md        # Security scanning (NEW)
└── planner-agent.md         # Planning assistance
```

### Agent Responsibilities Matrix

| Agent | Primary Responsibility | Tools | Output |
|-------|----------------------|-------|--------|
| orchestrator | Task coordination, delegation | All agents | Progress state |
| dev | Code implementation | File ops, MCP | Source files |
| test | Test creation, execution | Vitest, fast-check | Test files |
| docs | Documentation | JSDoc, Markdown | Docs, README |
| review | Code quality | ESLint, TypeScript | Review reports |
| security | Vulnerability scanning | npm audit, Semgrep | Security reports |

### Enhanced Orchestrator Agent

```markdown
# Orchestrator Agent

## Role
Central coordinator for task execution. Reads task files, determines
execution order, delegates to specialized agents, and manages state.

## Workflow

### 1. Initialize Phase Execution
- Read tasks/phase-N-tasks.md
- Build dependency graph using topological sort
- Create git worktree for isolated development

### 2. Execute Tasks
For each task in dependency order:
1. Load task details and context
2. Select appropriate agent based on task type
3. Provide agent with:
   - Task description and acceptance criteria
   - Relevant file context
   - CLAUDE.md project guidelines
4. Monitor execution
5. Validate completion
6. Update state/progress.json

### 3. Handle Failures
- Log failure details to state/errors.json
- Attempt retry with exponential backoff
- On persistent failure, pause and notify user

### 4. Complete Phase
- Verify all tasks completed
- Run full validation suite
- Trigger documentation update
- Merge worktree to main
- Update CLAUDE.md if architecture changed

## Agent Selection Rules

| Task Type | Primary Agent | Backup Agent |
|-----------|--------------|--------------|
| Implementation | dev-agent | - |
| Testing | test-agent | dev-agent |
| Documentation | docs-agent | dev-agent |
| Review | review-agent | - |
| Security | security-agent | review-agent |
```

---

## Component 6: Hooks System

### Purpose
Automatically trigger actions when specific events occur during development.

### Hook Types

```
.claude/hooks/
├── definitions/
│   ├── on-file-save.md         # Triggers on any file save
│   ├── on-task-complete.md     # Triggers when task finishes
│   └── on-phase-complete.md    # Triggers when phase finishes
├── implementations/
│   ├── doc-generator.md        # JSDoc + README updates
│   ├── state-updater.md        # Progress tracking
│   └── worktree-manager.md     # Git worktree operations
└── templates/
    └── hook-template.md
```

### Hook Specifications

#### on-file-save Hook

```markdown
# On File Save Hook

## Trigger
Fires when any tracked file is saved during task execution.

## Actions

### 1. JSDoc Generation (for .ts/.js files)
- Extract function signatures
- Generate or update JSDoc comments
- Preserve existing documentation

### 2. README Update
- If new component created, add to component list
- If API changed, update API section
- If configuration changed, update setup instructions

### 3. CLAUDE.md Update (conditional)
- If new pattern introduced, document it
- If new file location significant, add to structure

## Implementation

```javascript
// Pseudo-code for hook logic
async function onFileSave(filepath) {
  const ext = path.extname(filepath);
  
  // JSDoc generation for code files
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    await generateJSDoc(filepath);
  }
  
  // README updates for component files
  if (filepath.includes('/components/')) {
    await updateReadmeComponents(filepath);
  }
  
  // CLAUDE.md updates for significant changes
  if (isSignificantChange(filepath)) {
    await updateClaudeMd(filepath);
  }
}
```
```

#### on-task-complete Hook

```markdown
# On Task Complete Hook

## Trigger
Fires when a task is marked as complete by the task runner.

## Actions

### 1. Update Progress State
- Mark task as completed in state/progress.json
- Record completion timestamp
- Calculate phase progress percentage

### 2. Create Checkpoint
- Snapshot current state to state/checkpoints.json
- Enable resumability if execution interrupted

### 3. Notify Next Task
- If dependent tasks exist, mark them as ready
- Update task runner queue

## State Update Format

```json
{
  "taskId": "1.3",
  "status": "completed",
  "completedAt": "2026-01-16T10:30:00Z",
  "duration": "15m",
  "agent": "dev-agent",
  "filesCreated": ["src/auth.ts"],
  "filesModified": ["src/index.ts"]
}
```
```

#### on-phase-complete Hook

```markdown
# On Phase Complete Hook

## Trigger
Fires when all tasks in a phase are completed.

## Actions

### 1. Worktree Merge
- Verify all tests pass
- Merge phase worktree to main (--no-ff)
- Delete worktree
- Prune stale references

### 2. Documentation Update
- Regenerate full documentation
- Update CLAUDE.md with phase learnings
- Update README with new capabilities

### 3. State Transition
- Mark phase as complete
- Initialize next phase if exists
- Generate phase completion report

### 4. User Notification
- Display phase summary
- List what was accomplished
- Show next phase preview
```

---

## State Management

### State Files

```
.claude/state/
├── progress.json       # Overall progress tracking
├── checkpoints.json    # Resumability snapshots
├── analysis.json       # Codebase analysis (existing projects)
└── errors.json         # Error log for debugging
```

### progress.json Schema

```json
{
  "version": "1.0",
  "mode": "greenfield",
  "projectName": "My Project",
  "startedAt": "2026-01-16T09:00:00Z",
  "currentPhase": 2,
  "phases": {
    "1": {
      "name": "Foundation",
      "status": "completed",
      "startedAt": "2026-01-16T09:00:00Z",
      "completedAt": "2026-01-16T14:30:00Z",
      "tasks": {
        "1.1": { "status": "completed", "agent": "dev" },
        "1.2": { "status": "completed", "agent": "dev" },
        "1.3": { "status": "completed", "agent": "test" }
      }
    },
    "2": {
      "name": "Core Features",
      "status": "in_progress",
      "startedAt": "2026-01-16T14:35:00Z",
      "tasks": {
        "2.1": { "status": "completed", "agent": "dev" },
        "2.2": { "status": "running", "agent": "dev", "startedAt": "2026-01-16T15:20:00Z" },
        "2.3": { "status": "pending" }
      }
    }
  }
}
```

---

## CLI Commands Summary

| Command | Description | Mode |
|---------|-------------|------|
| `ccs init` | Initialize greenfield project | Greenfield |
| `ccs join` | Analyze existing codebase | Existing |
| `ccs plan` | Generate phase documents | Both |
| `ccs task` | Generate task files | Both |
| `ccs task add "..."` | Add task to backlog | Both |
| `ccs run` | Execute pending tasks | Both |
| `ccs run --phase N` | Execute specific phase | Both |
| `ccs status` | Show progress dashboard | Both |
| `ccs health` | Show project health | Existing |
| `ccs scan` | Run security scan | Both |
| `ccs doc` | Regenerate documentation | Both |
| `ccs validate` | Validate project structure | Both |

---

## Implementation Priority

### Phase 1: Core Workflow (Week 1-2)
- [ ] Enhance PROJECT_STARTER.md template
- [ ] Update project-planner.md with dual-mode support
- [ ] Update task-planner.md with dependency resolution
- [ ] Update task-runner.md with agent delegation

### Phase 2: State Management (Week 2-3)
- [ ] Implement progress.json tracking
- [ ] Add checkpoint system for resumability
- [ ] Create status command with visual dashboard

### Phase 3: Hooks System (Week 3-4)
- [ ] Implement on-file-save hook
- [ ] Implement on-task-complete hook
- [ ] Implement on-phase-complete hook
- [ ] Wire hooks to Claude Code events

### Phase 4: Agent Optimization (Week 4-5)
- [ ] Enhance orchestrator-agent coordination
- [ ] Add security-agent
- [ ] Improve agent context passing
- [ ] Add agent performance metrics

### Phase 5: CLI Integration (Week 5-6)
- [ ] Build ccs CLI tool
- [ ] Implement all commands
- [ ] Add interactive prompts
- [ ] Create visual progress display

---

## Next Steps

1. Review this plan and confirm priorities
2. Start with Phase 1: Core Workflow
3. Create individual implementation documents for each component
4. Begin iterative development with testing at each stage

---

## Related Documents

- [Optimization Research](../OPTIMIZATION_PLAN.md)
- [Agent Definitions](../../agents/)
- [Command Specifications](../../commands/)
- [Hook Definitions](../../hooks/)
