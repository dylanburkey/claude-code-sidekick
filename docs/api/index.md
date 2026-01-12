# API Reference

Code documentation for all exported modules.

## Sections

- [Components](components/) - UI components and custom elements
- [Utilities](utilities/) - Helper functions and utilities
- [Types](types/) - Type definitions and interfaces

## Quick Reference

_This section is automatically updated when new exports are documented._

### Components

| Component             | Description                         |
| --------------------- | ----------------------------------- |
| _None documented yet_ | Add components to `src/components/` |

### Utilities

| Function              | Description                   |
| --------------------- | ----------------------------- |
| _None documented yet_ | Add utilities to `src/utils/` |

### Types

| Type                  | Description               |
| --------------------- | ------------------------- |
| _None documented yet_ | Add types to `src/types/` |

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

Documentation will be generated in the appropriate subdirectory based on file
location.
