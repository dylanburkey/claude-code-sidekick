# Claude Code Starter Template

A structured template for AI-assisted development using Claude Code. Implements spec-driven development with EARS notation for clear, testable requirements.

## Features

- **Structured Workflow** - Requirements → Plans → Tasks → Implementation
- **Specialized Agents** - Dev, test, docs, review agents with clear responsibilities
- **EARS Notation** - Precise, testable requirement specifications
- **Event Hooks** - Automated documentation and quality checks
- **Steering Documents** - Project-specific AI guidance
- **Development Rules** - Enforced standards for accessibility, performance, and code quality

## Documentation

📚 **[View Full Documentation](docs/index.md)**

- [Getting Started](docs/guides/getting-started.md)
- [API Reference](docs/api/index.md)
- [Architecture](docs/architecture/index.md)
- [Changelog](docs/changelog/index.md)

## Quick Start

```bash
# Copy to your project
cp -r .claude/ /your-project/
cp PROJECT_STARTER.md /your-project/
cp -r specs/ /your-project/
cp -r docs/ /your-project/

# Fill out PROJECT_STARTER.md, then in Claude Code:
/project-planner    # Creates project-plan/phase_1.md
/task-planner       # Creates tasks/phase-1-tasks.md  
/task-runner        # Executes tasks with agents
```

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## Directory Structure

```
.claude/
├── commands/              # Slash commands
│   ├── project-planner.md # Analyzes requirements, creates phases
│   ├── task-planner.md    # Generates implementation tasks
│   └── task-runner.md     # Executes tasks with agents
├── agents/                # Specialized AI agents
│   ├── init.md            # Project initialization
│   ├── planner.md         # Requirements analysis
│   ├── dev.md             # Code implementation
│   ├── test.md            # Testing
│   ├── docs.md            # Documentation
│   ├── review.md          # Code review
│   └── orchestrator.md    # Task coordination
├── hooks/                 # Event-driven automation
│   ├── doc-generator.md   # Auto-generate docs on file save
│   ├── post-save-docs.md  # Update docs on file save
│   ├── pre-commit.md      # Quality checks before commit
│   └── task-complete.md   # Handle task completion
├── rules/                 # Development standards
│   ├── code-style.md      # Formatting and patterns
│   ├── accessibility.md   # WCAG compliance
│   └── documentation.md   # Doc standards
└── steering/              # Project-specific guidance
    ├── product.md         # Product vision and UX
    ├── tech.md            # Technical standards
    └── structure.md       # File organization

docs/                      # Project documentation (auto-generated)
├── index.md               # Documentation home
├── api/                   # API reference
├── guides/                # How-to guides
├── architecture/          # System design
└── changelog/             # Version history

specs/                     # Feature specifications
├── _TEMPLATE.md           # Spec template with EARS notation
project-plan/              # Generated project plans
tasks/                     # Generated task lists
```

## Workflow

```
┌─────────────────────┐
│  PROJECT_STARTER.md │  ← Define your project
└──────────┬──────────┘
           ↓
┌──────────────────────┐
│   /project-planner   │  ← Analyze & plan phases
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  project-plan/*.md   │  ← Review generated plan
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    /task-planner     │  ← Generate tasks
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│     tasks/*.md       │  ← Review task list
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    /task-runner      │  ← Execute with agents
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Completed Code     │  ← Working software
└──────────────────────┘
```

## Automatic Documentation

The `doc-generator` hook automatically maintains your documentation:

- **On file save** → Generates/updates relevant documentation
- **Creates structure** → Builds `docs/` directory if missing
- **Updates indexes** → Keeps navigation current
- **Syncs README** → Ensures documentation links work

See [.claude/hooks/doc-generator.md](.claude/hooks/doc-generator.md) for configuration.

## EARS Requirements Notation

Write clear, testable requirements:

```markdown
## Functional Requirements

### Ubiquitous (Always true)
- THE SYSTEM SHALL validate all form inputs before submission

### Event-Driven
- WHEN user clicks submit THE SYSTEM SHALL send data to API
- WHEN API returns error THE SYSTEM SHALL display error message

### State-Driven
- WHILE form is submitting THE SYSTEM SHALL disable submit button
- WHILE user is authenticated THE SYSTEM SHALL show logout option

### Optional Features
- WHERE user has admin role THE SYSTEM SHALL show admin panel

### Error Handling
- IF network request fails THEN THE SYSTEM SHALL retry up to 3 times
```

## Agents

| Agent | Responsibility |
|-------|----------------|
| **init** | Create project structure, config files |
| **planner** | Analyze requirements, break into phases |
| **dev** | Implement features, write code |
| **test** | Write and run tests |
| **docs** | Create and update documentation |
| **review** | Code review, standards compliance |
| **orchestrator** | Coordinate agents, manage dependencies |

## Agent Library

📦 **[Browse the Agent Library](agent-library/README.md)**

A comprehensive collection of 50+ specialized agents organized by category:

- **[Code Generation](agent-library/code-generation/)** - API endpoints, components, configs, schemas
- **[Task Automation](agent-library/task-automation/)** - Build pipelines, deployments, file organization
- **[Testing](agent-library/testing/)** - Unit tests, accessibility audits, performance testing
- **[Documentation](agent-library/documentation/)** - API docs, READMEs, changelogs, guides
- **[Blockchain](agent-library/blockchain/)** - Smart contracts, DApps, Web3 integration

Each agent includes:

- Clear purpose and capabilities
- Real-world usage examples
- Configuration options
- MCP integration support
- Best practices and troubleshooting

Use agents directly or customize them for your project. Create new agents using the provided [template](agent-library/templates/agent-template.md).

## Steering Documents

Customize AI behavior for your project:

- **product.md** - Vision, user types, UX principles, terminology
- **tech.md** - Code standards, performance targets, security practices
- **structure.md** - Directory organization, naming conventions, import order

## Development Standards

This template enforces:

- ✅ **Accessibility** - WCAG 2.1 AA compliance
- ✅ **Semantic HTML** - Proper elements, not div soup
- ✅ **Modern CSS** - Grid, Flexbox, custom properties
- ✅ **Progressive Enhancement** - Works without JavaScript
- ✅ **Performance** - Lighthouse 90+, minimal bundle size
- ✅ **Native APIs** - Browser standards over frameworks

## Customization

### Adding a New Command

Create `.claude/commands/your-command.md`:

```markdown
# Your Command

## Purpose
What this command does

## Input
What it expects

## Process
1. Step one
2. Step two

## Output
What it produces
```

### Adding a New Agent

Create `.claude/agents/your-agent.md`:

```markdown
# Your Agent

## Role
What this agent specializes in

## Capabilities
- Capability 1
- Capability 2

## Process
How it approaches tasks

## Output
What it produces
```

### Adding a Hook

Create `.claude/hooks/your-hook.md`:

```markdown
# Your Hook

## Trigger
When this hook runs

## Action
What it does

## Output
What it produces or updates
```

## Examples

### Example PROJECT_STARTER.md

```markdown
## Project Overview
**Name:** TaskFlow
**Description:** A task management app with team collaboration

## Goals
1. Create intuitive task board interface
2. Implement real-time updates
3. Add team member assignment

## Requirements (EARS)
### Functional
- THE SYSTEM SHALL display tasks in kanban columns
- WHEN user drags task THE SYSTEM SHALL update column
- WHILE syncing THE SYSTEM SHALL show sync indicator
```

### Example Spec

See `specs/_TEMPLATE.md` for a full feature specification template.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code standards in `.claude/rules/`
4. Submit a pull request

## License

MIT License - See LICENSE file for details.

---

**Built for developers who want structured, high-quality AI-assisted development.**
