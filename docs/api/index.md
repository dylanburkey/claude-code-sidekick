# API Reference

Code documentation for all exported modules.

## Sections

- [Components](components/) - UI components and custom elements
- [Utilities](utilities/) - Helper functions and utilities
- [Types](types/) - Type definitions and interfaces

## Quick Reference

*This section is automatically updated when new exports are documented.*

### Components

| Component | Description |
|-----------|-------------|
| *None documented yet* | Add components to `src/components/` |

### Utilities

| Function | Description |
|----------|-------------|
| *None documented yet* | Add utilities to `src/utils/` |

### Types

| Type | Description |
|------|-------------|
| *None documented yet* | Add types to `src/types/` |

---

## Adding API Documentation

API documentation is generated from source files with JSDoc comments:

```javascript
/**
 * @module MyModule
 * @description Brief description of the module
 */

/**
 * Does something useful.
 * @param {string} input - The input value
 * @returns {string} The processed output
 */
export function myFunction(input) {
  return input.toUpperCase();
}
```

Documentation will be generated in the appropriate subdirectory based on file location.
