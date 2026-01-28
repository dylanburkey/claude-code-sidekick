# Quick Start Guide

Get up and running with the Claude Code Starter Template in 5 minutes.

## 1. Copy Template to Your Project

```bash
# Clone or copy the .claude directory to your project
# Replace 'your-project-name' with your actual project directory name

cp -r ~/dev/projects/claude-code-lib/.claude ~/dev/projects/your-project-name/
cp ~/dev/projects/claude-code-lib/PROJECT_STARTER.md ~/dev/projects/your-project-name/
cp -r ~/dev/projects/claude-code-lib/specs ~/dev/projects/your-project-name/

# Or using full paths:
# cp -r /Users/yourusername/dev/projects/claude-code-lib/.claude /Users/yourusername/dev/projects/your-project-name/
# cp /Users/yourusername/dev/projects/claude-code-lib/PROJECT_STARTER.md /Users/yourusername/dev/projects/your-project-name/
# cp -r /Users/yourusername/dev/projects/claude-code-lib/specs /Users/yourusername/dev/projects/your-project-name/

# Verify the copy was successful:
ls -la ~/dev/projects/your-project-name/.claude
```

**For Shopify or WordPress projects:**

```bash
# Use the specialized starter templates instead
cp ~/dev/projects/claude-code-lib/PROJECT_STARTER_SHOPIFY.md ~/dev/projects/your-project-name/PROJECT_STARTER.md
# or
cp ~/dev/projects/claude-code-lib/PROJECT_STARTER_WORDPRESS.md ~/dev/projects/your-project-name/PROJECT_STARTER.md
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
~/dev/projects/your-project-name/
├── .claude/
│   ├── commands/           # Slash commands
│   │   ├── project-planner.md
│   │   ├── task-planner.md
│   │   └── task-runner.md
│   ├── agents/             # Specialized AI agents
│   │   ├── init-agent.md
│   │   ├── planner-agent.md
│   │   ├── dev-agent.md
│   │   ├── test-agent.md
│   │   ├── docs-agent.md
│   │   ├── review-agent.md
│   │   ├── orchestrator-agent.md
│   │   └── shopify-theme-developer.md
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
├── project-plan/           # Generated plans (created by /project-planner)
│   └── phase_1.md
├── tasks/                  # Generated tasks (created by /task-planner)
│   └── phase-1-tasks.md
├── PROJECT_STARTER.md      # Your project definition
├── CLAUDE.md               # AI context document (optional, create if needed)
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
