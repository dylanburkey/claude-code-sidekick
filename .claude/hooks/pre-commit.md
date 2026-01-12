# Pre-Commit Validation Hook

## Trigger

This hook activates before any commit is finalized.

## Purpose

Ensure code quality and consistency before changes are committed:

1. Validate code against project rules
2. Run relevant tests
3. Check documentation completeness
4. Verify accessibility standards

## Validation Checks

### 1. Code Quality

```yaml
checks:
  syntax:
    - valid JavaScript/TypeScript
    - valid CSS
    - valid HTML/Liquid

  linting:
    - no console.log in production code
    - no TODO comments without issue reference
    - proper error handling

  formatting:
    - consistent indentation
    - proper naming conventions
```

### 2. Accessibility

```yaml
accessibility:
  html:
    - semantic elements used
    - ARIA labels present where needed
    - proper heading hierarchy
    - alt text for images

  css:
    - no !important overuse
    - focus styles preserved
    - sufficient color contrast defined

  javascript:
    - keyboard navigation supported
    - focus management handled
```

### 3. Documentation

```yaml
documentation:
  required:
    - exported functions have JSDoc
    - complex logic has comments
    - new files documented in CLAUDE.md

  validated:
    - README links work
    - code examples run
    - API docs match implementation
```

### 4. Testing

```yaml
testing:
  run:
    - unit tests for changed files
    - integration tests if API changed

  coverage:
    - new code has tests
    - critical paths covered
```

## Execution Flow

```
1. Commit initiated
2. Identify staged files
3. Run applicable checks per file type
4. Aggregate results
5. If all pass → allow commit
6. If failures → block with report
```

## Check Configuration

### Per-File-Type Rules

```yaml
file_checks:
  '*.js':
    - syntax
    - linting
    - jsdoc
    - unit_tests

  '*.css':
    - syntax
    - accessibility
    - no_important

  '*.liquid':
    - syntax
    - accessibility
    - semantic_html

  '*.md':
    - valid_links
    - spell_check
```

### Severity Levels

```yaml
severity:
  block:
    - syntax_errors
    - failing_tests
    - security_issues

  warn:
    - missing_jsdoc
    - todo_without_issue
    - accessibility_warnings

  info:
    - style_suggestions
    - optimization_hints
```

## Output

### Success

```
✓ Pre-commit validation passed
  Files checked: 5
  Tests run: 12
  Time: 2.3s
```

### Failure

```
✗ Pre-commit validation failed

BLOCKING ISSUES:
  src/utils/format.js:15
    ✗ Syntax error: Unexpected token

  src/components/modal.js
    ✗ Test failing: should close on escape

WARNINGS:
  src/components/card.css:42
    ⚠ Using !important - consider specificity

Fix blocking issues before committing.
```

## Bypass

For emergency commits (use sparingly):

```bash
git commit --no-verify -m "emergency fix"
```

Bypassed commits are logged for later review.

## Configuration

In `.claude/config.yml`:

```yaml
hooks:
  pre_commit:
    enabled: true
    run_tests: true
    check_accessibility: true
    check_documentation: true
    block_on_warnings: false
    timeout_seconds: 60
```

## Integration with Agents

- **review-agent**: Consulted for pattern validation
- **test-agent**: Runs relevant test suites
- **docs-agent**: Validates documentation completeness
