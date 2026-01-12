# Documentation Standards

## Purpose

This rule file defines documentation standards for all project files and code.

## Applies To

- All markdown files
- Code comments
- API documentation
- README files
- CLAUDE.md updates

---

## Documentation Requirements

### README.md Structure

Every project README must include:

```markdown
# Project Name

Brief description (1-2 sentences)

## Features

- Key feature 1
- Key feature 2

## Quick Start

Installation and basic usage

## Documentation

Links to detailed docs

## Contributing

How to contribute

## License

License information
```

### CLAUDE.md Structure

The CLAUDE.md file provides AI assistant context:

```markdown
# Project Name - AI Context

## Project Overview

What this project does and its purpose

## Architecture

High-level system design

## Key Patterns

Important patterns used in this codebase

## File Structure

Directory organization

## Development Guidelines

How to work in this codebase

## Current State

What's implemented, what's in progress
```

---

## Code Documentation

### File Headers

Every significant file should have a header comment:

```javascript
/**
 * @file Description of what this file does
 * @module ModuleName
 * @requires dependencies
 */
```

### Function Documentation

Use JSDoc-style comments:

```javascript
/**
 * Brief description of function purpose
 *
 * @param {Type} paramName - Parameter description
 * @returns {Type} Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * const result = functionName(arg);
 */
```

### CSS Documentation

Document sections and complex selectors:

```css
/* ==========================================================================
   Component Name
   ========================================================================== */

/**
 * Component description
 * 
 * 1. Explanation of non-obvious style
 * 2. Another explanation
 */
.component {
  property: value; /* 1 */
  property: value; /* 2 */
}
```

---

## Markdown Standards

### Headings

- Use sentence case for headings
- Don't skip heading levels
- Include blank line before and after headings

### Lists

- Use `-` for unordered lists
- Use `1.` for ordered lists (auto-numbering)
- Indent nested lists with 2 spaces

### Code Blocks

- Always specify language for syntax highlighting
- Use inline code for short references: `variable`
- Use code blocks for multi-line code

### Links

- Use descriptive link text (not "click here")
- Prefer relative links for internal docs
- Check links remain valid

---

## API Documentation

### Endpoint Documentation

````markdown
## Endpoint Name

Brief description

### Request

`METHOD /path/:param`

**Parameters:** | Name | Type | Required | Description |
|------|------|----------|-------------| | param | string | Yes | Description |

**Body:**

```json
{
  "field": "value"
}
```
````

### Response

**Success (200):**

```json
{
  "data": {}
}
```

**Error (4xx):**

```json
{
  "error": "message"
}
```

```

---

## Documentation Updates

### When to Update
- New features added
- APIs changed
- Patterns established
- Architecture decisions made
- Breaking changes introduced

### Update Checklist
- [ ] README.md reflects current state
- [ ] CLAUDE.md has accurate context
- [ ] Code comments are current
- [ ] API docs match implementation
- [ ] Examples work as documented

---

## Automated Documentation

### Triggers
The docs-agent automatically updates documentation when:
- Files are saved (post-save-docs hook)
- Tasks complete (task-complete hook)
- Phase milestones reached

### Generated Docs Location
- `.claude/docs/` - Generated documentation
- `.claude/docs/api/` - API documentation
- `.claude/docs/guides/` - Implementation guides
```
