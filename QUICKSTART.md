# Quick Start Guide

Get up and running with the Claude Code Starter Template in 5 minutes.

## 1. Copy Template to Your Project

```bash
# Clone or copy the .claude directory to your project
cp -r /path/to/claude-code-lib/.claude /your-project/
cp /path/to/claude-code-lib/PROJECT_STARTER.md /your-project/
cp -r /path/to/claude-code-lib/specs /your-project/
```

## 2. Fill Out PROJECT_STARTER.md

Open `PROJECT_STARTER.md` and complete each section:

```markdown
## Project Overview

**Name:** My Awesome Project **Description:** A web application that does
amazing things

## Goals

1. Build a responsive landing page
2. Implement user authentication
3. Create a dashboard

## Requirements (EARS Notation)

### Functional

- THE SYSTEM SHALL display a responsive navigation menu
- WHEN user clicks login THE SYSTEM SHALL show authentication modal
- WHILE user is authenticated THE SYSTEM SHALL display dashboard link
```

## 3. Run Project Planner

In Claude Code, run the planner command:

```
/project-planner
```

This analyzes your PROJECT_STARTER.md and creates:

- `project-plan/phase_1.md` - Detailed project breakdown

## 4. Generate Tasks

Run the task planner:

```
/task-planner
```

This creates:

- `tasks/phase-1-tasks.md` - Step-by-step implementation tasks

## 5. Execute Tasks

Run the task runner:

```
/task-runner
```

This:

- Reads tasks from `tasks/phase-1-tasks.md`
- Assigns tasks to appropriate agents (dev, test, docs)
- Executes tasks in dependency order
- Updates task status as work completes

## Directory Structure After Setup

```
your-project/
├── .claude/
│   ├── commands/           # Slash commands
│   │   ├── project-planner.md
│   │   ├── task-planner.md
│   │   └── task-runner.md
│   ├── agents/             # Specialized AI agents
│   │   ├── init.md
│   │   ├── planner.md
│   │   ├── dev.md
│   │   ├── test.md
│   │   ├── docs.md
│   │   ├── review.md
│   │   └── orchestrator.md
│   ├── hooks/              # Event-driven automation
│   │   ├── post-save-docs.md
│   │   ├── pre-commit.md
│   │   └── task-complete.md
│   ├── rules/              # Development standards
│   │   ├── code-style.md
│   │   ├── accessibility.md
│   │   └── documentation.md
│   └── steering/           # Project-specific guidance
│       ├── product.md
│       ├── tech.md
│       └── structure.md
├── specs/                  # Feature specifications
│   └── _TEMPLATE.md
├── project-plan/           # Generated plans
│   └── phase_1.md
├── tasks/                  # Generated tasks
│   └── phase-1-tasks.md
├── PROJECT_STARTER.md      # Your project definition
├── CLAUDE.md               # AI context document
└── README.md               # Project documentation
```

## Common Workflows

### Adding a New Feature

1. Copy `specs/_TEMPLATE.md` to `specs/feature-name.md`
2. Fill out requirements using EARS notation
3. Run `/task-planner` to generate tasks
4. Run `/task-runner` to implement

### Code Review

```
Ask Claude: "Review the code in src/components/Button.js"
```

The review agent will check:

- Code style compliance
- Accessibility standards
- Performance considerations
- Security best practices

### Update Documentation

Documentation auto-updates via hooks, but you can also:

```
Ask Claude: "Update the documentation for the authentication module"
```

## Tips for Best Results

1. **Be specific in requirements** - EARS notation forces clarity
2. **Break large features into phases** - Easier to manage and test
3. **Review generated plans** - AI suggestions benefit from human oversight
4. **Use steering documents** - Customize for your project's needs
5. **Check task dependencies** - Ensure prerequisites are met

## Troubleshooting

**Tasks not generating correctly?**

- Ensure PROJECT_STARTER.md has clear requirements
- Check that goals are specific and measurable

**Agents not following standards?**

- Review and update steering documents
- Check rules/ directory for missing standards

**Documentation not updating?**

- Verify hooks are properly configured
- Check file paths in hook definitions

---

Need help? Review the full documentation in CLAUDE.md or ask Claude directly!
