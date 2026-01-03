# Configuration

Configure the Claude Code Starter Template for your project needs.

## Configuration Files

### Steering Documents

Located in `.claude/steering/`, these files customize AI behavior:

| File | Purpose |
|------|---------|
| `product.md` | Product vision, user types, UX principles |
| `tech.md` | Technical standards, performance targets |
| `structure.md` | File organization, naming conventions |

### Rules

Located in `.claude/rules/`, these enforce standards:

| File | Purpose |
|------|---------|
| `code-style.md` | Formatting, patterns, conventions |
| `accessibility.md` | WCAG compliance requirements |
| `documentation.md` | Documentation standards |

### Hooks

Located in `.claude/hooks/`, these automate tasks:

| File | Trigger | Action |
|------|---------|--------|
| `doc-generator.md` | File save | Generate/update documentation |
| `post-save-docs.md` | File save | Update README, CLAUDE.md |
| `pre-commit.md` | Git commit | Quality checks |
| `task-complete.md` | Task done | Update task status |

## Customizing Steering Documents

### product.md

Define your product context:

```markdown
## Product Vision
What problem does this solve?

## User Types
- Primary: Who uses this most?
- Secondary: Other users?

## UX Principles
1. Principle one
2. Principle two

## Terminology
- Term: Definition
```

### tech.md

Set technical standards:

```markdown
## Code Standards
- Language version requirements
- Formatting rules
- Pattern preferences

## Performance Targets
- Lighthouse score: 90+
- Bundle size limits
- Load time goals

## Security Practices
- Input validation rules
- Authentication approach
```

### structure.md

Define organization:

```markdown
## Directory Structure
Where different file types go

## Naming Conventions
- Files: kebab-case
- Components: PascalCase
- Functions: camelCase

## Import Order
1. External packages
2. Internal modules
3. Relative imports
```

## Hook Configuration

### doc-generator Settings

In the hook file, configure:

```yaml
hooks:
  doc_generator:
    enabled: true
    debounce_ms: 3000
    exclude:
      - "node_modules/**"
      - "dist/**"
      - "*.test.*"
```

### Disabling a Hook

Set `enabled: false` in the hook configuration, or remove the hook file.

## Adding Custom Configuration

### Custom Commands

Create `.claude/commands/your-command.md`:

```markdown
# Your Command

## Purpose
What it does

## Process
1. Step one
2. Step two
```

### Custom Agents

Create `.claude/agents/your-agent.md`:

```markdown
# Your Agent

## Role
What it specializes in

## Capabilities
- Capability one
- Capability two
```

### Custom Rules

Create `.claude/rules/your-rule.md`:

```markdown
# Your Rule

## When Applied
When this rule is checked

## Requirements
- Requirement one
- Requirement two
```
