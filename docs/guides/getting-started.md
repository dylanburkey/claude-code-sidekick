# Getting Started

Get up and running with the Claude Code Starter Template in 5 minutes.

## Prerequisites

- Claude Code CLI installed
- A new or existing project directory

## Quick Setup

### Step 1: Copy Template Files

Copy the template to your project:

```bash
# Copy the .claude directory
cp -r .claude/ /path/to/your/project/

# Copy the starter file
cp PROJECT_STARTER.md /path/to/your/project/

# Copy specs directory
cp -r specs/ /path/to/your/project/

# Copy docs directory
cp -r docs/ /path/to/your/project/
```

### Step 2: Fill Out PROJECT_STARTER.md

Open `PROJECT_STARTER.md` and fill in your project details:

```markdown
## Project Overview
**Name:** Your Project Name
**Description:** What your project does

## Goals
1. First goal
2. Second goal

## Requirements (EARS Notation)
- THE SYSTEM SHALL do something important
- WHEN user does X THE SYSTEM SHALL respond with Y
```

### Step 3: Generate Project Plan

Run the project planner command:

```
/project-planner
```

This creates `project-plan/phase_1.md` with your implementation phases.

### Step 4: Generate Tasks

Run the task planner:

```
/task-planner
```

This creates `tasks/phase-1-tasks.md` with specific tasks.

### Step 5: Execute Tasks

Run the task runner:

```
/task-runner
```

Agents will execute tasks and build your project.

## What's Next?

- [Configure your project](configuration.md)
- [Learn about EARS notation](../architecture/index.md)
- [Explore the API](../api/index.md)

## Need Help?

- Check the [Architecture docs](../architecture/index.md) for design decisions
- Review [CLAUDE.md](../../CLAUDE.md) for AI context
- Look at the [QUICKSTART.md](../../QUICKSTART.md) for more details
