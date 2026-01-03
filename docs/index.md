# Project Documentation

Welcome to the project documentation.

## Quick Links

- [Getting Started](guides/getting-started.md)
- [API Reference](api/index.md)
- [Architecture](architecture/index.md)
- [Changelog](changelog/index.md)

## Overview

This documentation is automatically generated and maintained by the `doc-generator` hook. When you save files in your project, documentation is created or updated based on the file type and content.

## Documentation Structure

| Section | Description |
|---------|-------------|
| [API](api/) | Code documentation, components, utilities, types |
| [Guides](guides/) | How-to guides and tutorials |
| [Architecture](architecture/) | System design and decisions |
| [Changelog](changelog/) | Version history and changes |

## How Documentation is Generated

The `doc-generator` hook triggers on file save and:

1. Analyzes the saved file for documentable content
2. Extracts exports, JSDoc comments, and type definitions
3. Generates or updates the appropriate documentation file
4. Updates index files with new links
5. Keeps the README.md documentation link current

## Contributing to Documentation

### Manual Documentation

Add `.md` files directly to any docs subdirectory. They will be indexed automatically.

### Code Comments

Use JSDoc-style comments in your code:

```javascript
/**
 * Calculates the sum of two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 * @example
 * add(2, 3) // returns 5
 */
function add(a, b) {
  return a + b;
}
```

### Architecture Decision Records

Document significant decisions in `architecture/decisions/`:

```markdown
# ADR-001: Use Custom Elements for Components

## Status
Accepted

## Context
We need a component system that works without build tools.

## Decision
Use native Custom Elements (Web Components).

## Consequences
- Works in all modern browsers
- No framework dependency
- Requires polyfill for older browsers
```
