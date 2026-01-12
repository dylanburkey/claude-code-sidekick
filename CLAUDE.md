# CLAUDE.md - AI Assistant Context

> This document provides context and instructions for AI assistants working on
> projects using this template.

## Template Overview

This is a **Claude Code Starter Template** that provides a structured workflow
for AI-assisted development. It implements spec-driven development using EARS
notation for clear, testable requirements.

### Core Philosophy

1. **Structured Planning** - Requirements → Design → Tasks → Implementation
2. **Progressive Enhancement** - Semantic HTML → CSS → JavaScript
3. **Accessibility First** - WCAG compliance is non-negotiable
4. **Modern Standards** - Native APIs over frameworks, CSS Grid over floats

## Workflow

```
PROJECT_STARTER.md
        ↓
   /project-planner
        ↓
project-plan/phase_N.md
        ↓
   /task-planner
        ↓
tasks/phase-N-tasks.md
        ↓
   /task-runner
        ↓
   Agents Execute
```

### Commands

| Command            | Purpose                                        | Output                    |
| ------------------ | ---------------------------------------------- | ------------------------- |
| `/project-planner` | Analyze requirements, create project breakdown | `project-plan/phase_N.md` |
| `/task-planner`    | Generate implementation tasks from plan        | `tasks/phase-N-tasks.md`  |
| `/task-runner`     | Execute tasks using specialized agents         | Completed code + docs     |

## Agents

Specialized agents handle different aspects of development:

| Agent          | Role           | Responsibilities                          |
| -------------- | -------------- | ----------------------------------------- |
| `init`         | Initialization | Project setup, file structure, config     |
| `planner`      | Planning       | Requirements analysis, phase breakdown    |
| `dev`          | Development    | Code implementation, feature building     |
| `test`         | Testing        | Unit tests, integration tests, validation |
| `docs`         | Documentation  | README, inline docs, API docs             |
| `review`       | Quality        | Code review, standards compliance         |
| `orchestrator` | Coordination   | Task assignment, dependency management    |

## Agent Library

The [Agent Library](./agent-library/README.md) provides a comprehensive
collection of specialized agents organized by category:

### Categories

- **[Code Generation](./agent-library/code-generation/)** - Generate components,
  APIs, configs, and boilerplate
- **[Task Automation](./agent-library/task-automation/)** - Automate builds,
  deployments, and workflows
- **[Testing](./agent-library/testing/)** - Quality assurance, accessibility
  audits, and test generation
- **[Documentation](./agent-library/documentation/)** - API docs, READMEs, and
  inline documentation
- **[Blockchain](./agent-library/blockchain/)** - Smart contracts, DApps, and
  Web3 integration

### Using Agent Library Agents

Agents from the library can be:

1. Used directly through prompts and the Task tool
2. Copied to `.claude/agents/` for project-specific customization
3. Extended and modified for specific needs
4. Combined into custom workflows

### Creating Custom Agents

Use the [agent template](./agent-library/templates/agent-template.md) to create
new agents:

1. Copy template to appropriate category
2. Fill in all required sections
3. Add real-world examples
4. Test thoroughly
5. Document MCP integration if applicable

See the [Agent Library README](./agent-library/README.md) for detailed
information.

## Steering Documents

Project-specific guidance lives in `.claude/steering/`:

- **product.md** - Product vision, user experience principles
- **tech.md** - Technical standards, code conventions
- **structure.md** - File organization, naming conventions

**Always consult steering documents before implementing.**

## Rules

Development rules in `.claude/rules/`:

- **code-style.md** - Formatting, naming, patterns
- **accessibility.md** - WCAG requirements, testing
- **documentation.md** - Comment standards, doc formats

## EARS Requirements Notation

Use EARS (Easy Approach to Requirements Syntax) for clear requirements:

| Pattern      | Format                                          | Example                                                      |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------ |
| Ubiquitous   | THE SYSTEM SHALL [action]                       | THE SYSTEM SHALL validate all user input                     |
| Event-Driven | WHEN [event] THE SYSTEM SHALL [response]        | WHEN user submits form THE SYSTEM SHALL display confirmation |
| State-Driven | WHILE [state] THE SYSTEM SHALL [behavior]       | WHILE loading THE SYSTEM SHALL show spinner                  |
| Optional     | WHERE [condition] THE SYSTEM SHALL [action]     | WHERE user is admin THE SYSTEM SHALL show settings           |
| Unwanted     | IF [condition] THEN THE SYSTEM SHALL [response] | IF network fails THEN THE SYSTEM SHALL retry 3 times         |

## Code Standards

### HTML

```html
<!-- Semantic, accessible structure -->
<button type="submit" aria-describedby="help-text">Submit Form</button>
<p id="help-text" class="visually-hidden">
  Submits your information for processing
</p>
```

### CSS

```css
/* Modern CSS with custom properties */
.component {
  --spacing: clamp(1rem, 2vw, 2rem);
  display: grid;
  gap: var(--spacing);
  padding-block: var(--spacing);
}
```

### JavaScript

```javascript
// Native APIs, progressive enhancement
const form = document.querySelector('form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Handle submission
});
```

## File Locations

```
.claude/
├── commands/          # Slash commands
├── agents/            # Agent definitions
├── hooks/             # Event automation
├── rules/             # Development standards
└── steering/          # Project guidance

specs/                 # Feature specifications
project-plan/          # Generated plans
tasks/                 # Generated tasks
```

## Hooks

Automated actions triggered by events:

| Hook             | Trigger       | Action                        |
| ---------------- | ------------- | ----------------------------- |
| `post-save-docs` | File saved    | Update relevant documentation |
| `pre-commit`     | Before commit | Run linting, tests            |
| `task-complete`  | Task finished | Update task status, notify    |

## Working with This Template

### Starting a New Project

1. Copy `.claude/`, `specs/`, and `PROJECT_STARTER.md` to your project
2. Fill out `PROJECT_STARTER.md` with your requirements
3. Customize steering documents for your project
4. Run `/project-planner` to begin

### Adding Features

1. Create spec in `specs/feature-name.md` using EARS notation
2. Run `/task-planner` to generate tasks
3. Run `/task-runner` to implement

### Quality Checklist

Before considering work complete:

- [ ] Code follows steering/tech.md standards
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed

## Context for AI Assistants

When working on projects using this template:

1. **Read steering documents first** - They contain project-specific guidance
2. **Follow EARS requirements** - They define acceptance criteria
3. **Check rules before coding** - Standards are non-negotiable
4. **Update documentation** - Hooks assist but don't replace thoughtfulness
5. **Use appropriate agent** - Match task type to agent capability

### Priority Order for Decisions

1. Accessibility
2. Performance
3. Functionality
4. Aesthetics

### When in Doubt

- Check steering documents
- Review existing patterns in codebase
- Ask for clarification
- Default to simpler solution

---

_This template implements spec-driven development inspired by modern AI
development workflows. It emphasizes clarity, testability, and maintainability._
