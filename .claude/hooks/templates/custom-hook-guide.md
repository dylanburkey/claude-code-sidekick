# Custom Hook Guide

> Step-by-step guide to creating custom hooks for your project

## Overview

Custom hooks allow you to automate project-specific tasks and enforce custom workflows. This guide walks through creating and configuring custom hooks.

## When to Create a Custom Hook

Create a custom hook when you need to:

- Automate project-specific validation
- Enforce custom coding standards
- Integrate with internal tools
- Create specialized workflows
- Add automation not covered by built-in hooks

## Step-by-Step Guide

### Step 1: Plan Your Hook

Define what your hook will do:

**Example: Database Schema Validation**
- **Name**: database-schema-validation
- **Trigger**: pre-commit
- **Purpose**: Validate database migrations before committing
- **Actions**: Check migration syntax, validate against schema
- **When**: Before commits that modify migration files

### Step 2: Create Hook Definition

Create `.claude/hooks/definitions/database-schema-validation.json`:

```json
{
  "name": "database-schema-validation",
  "displayName": "Database Schema Validation",
  "category": "custom",
  "trigger": "pre-commit",
  "description": "Validate database migrations before committing",
  "actions": [
    {
      "name": "validate-syntax",
      "description": "Validate SQL syntax",
      "command": "node scripts/validate-migration-syntax.js",
      "continueOnError": false
    },
    {
      "name": "check-schema",
      "description": "Check against current schema",
      "command": "node scripts/check-migration-schema.js",
      "continueOnError": false
    },
    {
      "name": "test-migration",
      "description": "Test migration in dev environment",
      "command": "npm run test:migration",
      "continueOnError": true
    }
  ],
  "settings": {
    "enabled": true,
    "failOnError": true,
    "skipCIEnvironment": false
  },
  "files": {
    "include": ["db/migrations/**/*.sql"],
    "exclude": []
  }
}
```

### Step 3: Create Hook Script

Create the validation script `scripts/validate-migration-syntax.js`:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get staged migration files
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .toString()
  .split('\n')
  .filter(file => file.startsWith('db/migrations/') && file.endsWith('.sql'));

if (stagedFiles.length === 0) {
  console.log('No migration files to validate');
  process.exit(0);
}

let hasErrors = false;

for (const file of stagedFiles) {
  if (!file) continue;

  console.log(`Validating ${file}...`);

  try {
    const content = fs.readFileSync(file, 'utf8');

    // Validate SQL syntax (example checks)
    if (!content.includes('-- Migration:')) {
      console.error(`  ✗ Missing migration header`);
      hasErrors = true;
    }

    if (content.includes('DROP TABLE') && !content.includes('IF EXISTS')) {
      console.error(`  ✗ DROP TABLE should include IF EXISTS`);
      hasErrors = true;
    }

    if (!hasErrors) {
      console.log(`  ✓ Validation passed`);
    }
  } catch (error) {
    console.error(`  ✗ Error reading file: ${error.message}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\nMigration validation failed. Please fix errors and try again.');
  process.exit(1);
}

console.log('\n✓ All migrations validated successfully');
process.exit(0);
```

Make it executable:
```bash
chmod +x scripts/validate-migration-syntax.js
```

### Step 4: Add to PROJECT_STARTER.md

```markdown
### Custom Hooks

**Database Schema Validation**: `TRUE` <!-- Validate migrations before commits -->
```

### Step 5: Run Setup

```bash
/hooks-setup
```

### Step 6: Test Your Hook

```bash
# Try committing a migration file
echo "DROP TABLE users;" > db/migrations/001_test.sql
git add db/migrations/001_test.sql
git commit -m "test: migration validation"

# Should fail with validation errors
```

## Hook Types

### Git Hooks

Triggered by git commands:

```json
{
  "trigger": "pre-commit|commit-msg|pre-push|post-commit|pre-rebase",
  "script": ".git/hooks/pre-commit"
}
```

### File Hooks

Triggered by file changes:

```json
{
  "trigger": "on-save|on-create|on-delete|on-rename",
  "files": {
    "include": ["src/**/*"],
    "exclude": ["**/*.test.ts"]
  }
}
```

### Build Hooks

Triggered by build process:

```json
{
  "trigger": "pre-build|post-build|build-error",
  "command": "npm run build"
}
```

### Custom Event Hooks

Triggered by custom events:

```json
{
  "trigger": "custom-event",
  "emit": "node scripts/emit-event.js custom-event"
}
```

## Advanced Features

### Conditional Execution

Run actions based on conditions:

```json
{
  "actions": [
    {
      "name": "critical-check",
      "command": "npm run security-scan",
      "condition": "severity === 'high'",
      "continueOnError": false
    }
  ]
}
```

### Parallel Execution

Run actions in parallel:

```json
{
  "settings": {
    "parallel": true
  },
  "actions": [
    {"name": "lint", "command": "npm run lint"},
    {"name": "test", "command": "npm run test"},
    {"name": "type-check", "command": "npm run type-check"}
  ]
}
```

### Caching

Cache results to improve performance:

```javascript
const cache = require('./cache');

async function expensiveValidation(file) {
  const cacheKey = `validation:${file}:${getFileHash(file)}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = await performValidation(file);
  cache.set(cacheKey, result, { ttl: 3600 });

  return result;
}
```

### Error Recovery

Implement retry logic:

```json
{
  "settings": {
    "retryOnFailure": true,
    "maxRetries": 3,
    "retryDelay": 1000
  }
}
```

## Integration with MCPs

Hooks can use MCP servers for enhanced functionality:

```javascript
// Hook script using Neon MCP
const mcp = require('@modelcontextprotocol/sdk');

async function validateMigration(file) {
  // Create test branch
  const branch = await mcp.neon.createBranch({
    projectId: process.env.NEON_PROJECT_ID,
    branchName: `test-migration-${Date.now()}`
  });

  try {
    // Test migration in isolated branch
    await mcp.neon.runSql({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: branch.id,
      sql: fs.readFileSync(file, 'utf8')
    });

    console.log('Migration validated successfully');
    return true;
  } catch (error) {
    console.error('Migration validation failed:', error);
    return false;
  } finally {
    // Cleanup test branch
    await mcp.neon.deleteBranch({
      projectId: process.env.NEON_PROJECT_ID,
      branchId: branch.id
    });
  }
}
```

## Testing Hooks

### Unit Tests

```javascript
const { validateHook } = require('./.claude/hooks/scripts/run-hook');

describe('Custom Hook', () => {
  test('validates migration syntax', async () => {
    const result = await validateHook('database-schema-validation', {
      files: ['db/migrations/001_test.sql']
    });

    expect(result.passed).toBe(true);
  });

  test('fails on invalid syntax', async () => {
    const result = await validateHook('database-schema-validation', {
      files: ['db/migrations/invalid.sql']
    });

    expect(result.passed).toBe(false);
    expect(result.errors).toContain('Invalid SQL syntax');
  });
});
```

### Integration Tests

```bash
# Test hook in real environment
echo "Invalid SQL" > test-migration.sql
git add test-migration.sql

# This should fail
git commit -m "test: hook validation" 2>&1 | grep "validation failed"
```

## Best Practices

### Performance

- Keep hooks fast (< 5 seconds)
- Cache expensive operations
- Use parallel execution when possible
- Skip heavy operations in CI

### Error Handling

- Provide clear error messages
- Allow bypass for emergencies
- Log failures for debugging
- Set appropriate `continueOnError` flags

### Maintainability

- Document hook purpose and usage
- Use descriptive action names
- Keep scripts simple and focused
- Test hooks thoroughly

### Team Coordination

- Document custom hooks in README
- Provide setup instructions
- Share hook configurations
- Train team on hook usage

## Examples

### Example 1: API Contract Validation

```json
{
  "name": "api-contract-validation",
  "displayName": "API Contract Validation",
  "category": "custom",
  "trigger": "pre-commit",
  "description": "Validate API changes don't break contracts",
  "actions": [
    {
      "name": "check-breaking-changes",
      "command": "node scripts/check-api-breaking-changes.js"
    }
  ]
}
```

### Example 2: Translation Completeness

```json
{
  "name": "translation-check",
  "displayName": "Translation Completeness Check",
  "category": "custom",
  "trigger": "pre-commit",
  "description": "Ensure all translations are complete",
  "actions": [
    {
      "name": "check-translations",
      "command": "node scripts/check-translations.js"
    }
  ],
  "files": {
    "include": ["locales/**/*.json"]
  }
}
```

### Example 3: Performance Budget

```json
{
  "name": "performance-budget",
  "displayName": "Performance Budget Check",
  "category": "custom",
  "trigger": "pre-push",
  "description": "Ensure bundle size stays within budget",
  "actions": [
    {
      "name": "check-bundle-size",
      "command": "npm run build && node scripts/check-bundle-size.js"
    }
  ]
}
```

## Troubleshooting

### Hook Not Running

1. Check hook is enabled in config.json
2. Verify trigger matches event
3. Ensure script is executable
4. Run `/hooks-setup --validate`

### Script Errors

1. Run script manually to see error
2. Check file paths are correct
3. Verify dependencies are installed
4. Review script permissions

### Performance Issues

1. Profile hook execution time
2. Add caching for expensive operations
3. Consider moving to CI instead
4. Use parallel execution

## Resources

- [Hook Template](./hook-template.json)
- [Example Configuration](../examples/config.example.json)
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Hooks README](../README.md)

---

*Custom hooks enable you to automate any project-specific workflow and enforce your team's unique development practices.*
