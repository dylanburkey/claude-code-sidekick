# Architecture

System architecture and design documentation.

## Overview

The Claude Code Starter Template uses a structured, agent-based architecture for
AI-assisted development.

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│              (Claude Code CLI / Commands)                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Orchestrator Agent                     │
│            (Coordinates work between agents)             │
└───────┬─────────┬─────────┬─────────┬─────────┬────────┘
        │         │         │         │         │
        ▼         ▼         ▼         ▼         ▼
   ┌────────┐ ┌───────┐ ┌──────┐ ┌──────┐ ┌────────┐
   │ Planner│ │  Dev  │ │ Test │ │ Docs │ │ Review │
   │ Agent  │ │ Agent │ │Agent │ │Agent │ │ Agent  │
   └────────┘ └───────┘ └──────┘ └──────┘ └────────┘
        │         │         │         │         │
        └─────────┴─────────┴─────────┴─────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Steering Documents                     │
│           (product.md, tech.md, structure.md)            │
└─────────────────────────────────────────────────────────┘
```

## Key Components

### Commands

Entry points for workflows:

| Command            | Purpose                             |
| ------------------ | ----------------------------------- |
| `/project-planner` | Analyze requirements, create phases |
| `/task-planner`    | Generate implementation tasks       |
| `/task-runner`     | Execute tasks with agents           |

### Agents

Specialized workers:

| Agent          | Responsibility                     |
| -------------- | ---------------------------------- |
| `orchestrator` | Coordinate agents, manage flow     |
| `planner`      | Analyze requirements, create plans |
| `dev`          | Write code, implement features     |
| `test`         | Write and run tests                |
| `docs`         | Create documentation               |
| `review`       | Code review, quality checks        |

### Hooks

Event-driven automation:

| Hook            | Trigger    | Action         |
| --------------- | ---------- | -------------- |
| `doc-generator` | File save  | Generate docs  |
| `pre-commit`    | Git commit | Quality checks |
| `task-complete` | Task done  | Update status  |

### Rules

Enforced standards:

| Rule            | Enforces             |
| --------------- | -------------------- |
| `code-style`    | Formatting, patterns |
| `accessibility` | WCAG compliance      |
| `documentation` | Doc standards        |

## Sections

- [Decisions](decisions/) - Architecture Decision Records (ADRs)
- [Diagrams](diagrams/) - System diagrams

## Key Patterns

### EARS Notation

Requirements use EARS (Easy Approach to Requirements Syntax):

| Pattern      | Syntax                         | Use Case                 |
| ------------ | ------------------------------ | ------------------------ |
| Ubiquitous   | THE SYSTEM SHALL...            | Always-on behavior       |
| Event-Driven | WHEN... THE SYSTEM SHALL...    | Response to events       |
| State-Driven | WHILE... THE SYSTEM SHALL...   | State-dependent behavior |
| Optional     | WHERE... THE SYSTEM SHALL...   | Conditional features     |
| Unwanted     | IF... THEN THE SYSTEM SHALL... | Error handling           |

### Progressive Enhancement

1. Core functionality works without JavaScript
2. Enhance with JavaScript when available
3. Use semantic HTML as foundation
4. Layer CSS for presentation
5. Add interactivity last

### Accessibility First

1. Start with WCAG 2.1 AA compliance
2. Use semantic elements
3. Ensure keyboard navigation
4. Provide ARIA when needed
5. Test with screen readers
