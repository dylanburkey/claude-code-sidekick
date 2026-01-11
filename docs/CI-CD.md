# CI/CD Pipeline Documentation

This document describes the continuous integration and deployment pipeline for the Claude Code Starter Files project.

## Overview

The CI/CD system consists of:

1. **Local Git Hooks** - Pre-commit and pre-push validation using Husky
2. **GitHub Actions Workflows** - Automated testing and deployment
3. **Quality Gates** - ESLint, JSDoc, Prettier, YAML validation, and CLI tests

---

## Local Development Workflow

### Pre-commit Hook

When you run `git commit`, the following checks are executed automatically:

```bash
# Runs on staged files only (via lint-staged)
- ESLint with auto-fix
- Prettier formatting
- YAML validation for .yml files
```

### Pre-push Hook

Before code is pushed to the remote repository:

```bash
# Full validation
pnpm validate
  ├── pnpm lint          # ESLint (no auto-fix)
  └── pnpm format:check  # Prettier (check only)

# CLI tests
cd cli && pnpm test
```

### Setting Up Hooks

```bash
# Install dependencies (Husky will auto-install)
pnpm install

# If hooks aren't working, manually initialize
pnpm exec husky install

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

## GitHub Actions Workflows

### 1. CI - Code Quality & Validation (`ci.yml`)

**Triggers:** Push or PR to `main`, `dev`, or `development`

**Jobs:**

| Job | Description |
|-----|-------------|
| `lint` | ESLint + JSDoc + Prettier validation |
| `validate-configs` | YAML and JSON file validation |
| `validate-docs` | Markdown linting and link checking |
| `test-cli` | CLI tests and execution verification |
| `validate-agents` | Agent library structure validation |
| `security` | npm audit for vulnerabilities |
| `ci-summary` | Aggregates results |

### 2. Pre-commit Validation (`pre-commit.yml`)

**Triggers:** Push to non-main branches, PRs

**Quality Gates:**
1. ✅ No JavaScript syntax errors
2. ✅ ESLint passes
3. ✅ JSDoc comments present
4. ✅ Code properly formatted
5. ✅ YAML configs valid
6. ✅ CLI tests pass

### 3. Deploy to Production (`deploy-production.yml`)

**Triggers:** Manual (workflow_dispatch)

**Required Input:** Type "DEPLOY" to confirm

**Options:**
- Create GitHub release (default: true)
- Version bump type: patch, minor, major

**Jobs:**
1. Validate deployment request
2. Run all validation on dev branch
3. Merge dev into main (no-ff)
4. Create GitHub release with changelog

### 4. Merge Dev to Main (`merge-dev-to-main.yml`)

**Triggers:** Manual (workflow_dispatch)

**Options:**
- Merge strategy: merge, squash, or rebase
- Create GitHub release (optional)
- Version bump type: patch, minor, major

---

## NPM Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm lint` | Run ESLint on CLI source files |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm lint:jsdoc` | Check JSDoc comments specifically |
| `pnpm format` | Format all files with Prettier |
| `pnpm format:check` | Check formatting without changes |
| `pnpm validate` | Run all validation checks |
| `pnpm test` | Run CLI tests |

---

## JSDoc Requirements

All exported functions and classes must have JSDoc comments:

```javascript
/**
 * Create a new project from template
 * @param {string} projectName - The name of the project to create
 * @param {Object} options - Configuration options
 * @param {string} options.template - Template to use
 * @param {boolean} [options.git=true] - Initialize git repository
 * @returns {Promise<void>}
 */
export async function createProject(projectName, options) {
  // Implementation
}

/**
 * Project scaffold generator
 * @class
 */
class ProjectGenerator {
  /**
   * Generate project structure
   * @param {string} targetDir - Target directory path
   * @returns {Promise<string[]>} List of created files
   */
  async generate(targetDir) {
    // Implementation
  }
}
```

---

## Branching Strategy

```
main (production)
  │
  └── dev (development)
        │
        ├── feature/new-agent
        ├── fix/cli-bug
        └── docs/update-readme
```

### Workflow

1. Create feature branch from `dev`
2. Make changes with proper commits
3. Push to feature branch (triggers CI)
4. Create PR to `dev`
5. Merge after review
6. When ready, use "Merge Dev to Main" or "Deploy to Production" workflow

---

## Validation Details

### YAML Configuration Validation

All `.yml` files in `.claude/` are validated for:
- Valid YAML syntax
- Proper indentation
- No duplicate keys

### Agent Library Validation

The CI verifies:
- Required directories exist (`agent-library`, `.claude/agents`, etc.)
- Required files exist (`CLAUDE.md`, `README.md`, etc.)
- Agent files contain proper section headers

### CLI Validation

- JavaScript syntax check on all `.js` files
- ESLint rules pass
- JSDoc comments present
- CLI executes with `--help` flag

---

## Troubleshooting

### ESLint Errors

```bash
# See detailed errors
pnpm lint

# Auto-fix what's possible
pnpm lint:fix
```

### JSDoc Missing

The linter requires JSDoc for:
- Function declarations
- Method definitions  
- Class declarations
- Exported functions

### YAML Validation Failures

```bash
# Validate a specific file
npx yaml-lint .claude/config.yml
```

### Husky Not Running

```bash
# Reinstall hooks
rm -rf .husky/_
pnpm exec husky install
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Merge Conflicts

If the deploy workflow fails due to conflicts:
1. Locally checkout `main`
2. Run `git merge dev`
3. Resolve conflicts
4. Push to `main`

---

## File Structure

```
.github/
  workflows/
    ci.yml                  # Main CI workflow
    pre-commit.yml          # Pre-commit validation
    deploy-production.yml   # Full production deploy
    merge-dev-to-main.yml   # Quick merge workflow
  ISSUE_TEMPLATE/
    bug_report.md           # Bug report template
    feature_request.md      # Feature request template
  PULL_REQUEST_TEMPLATE.md  # PR checklist

.husky/
  pre-commit              # Local pre-commit hook
  pre-push                # Local pre-push hook

eslint.config.js          # ESLint configuration
.prettierrc               # Prettier configuration
.prettierignore           # Prettier ignore patterns
package.json              # Root package with scripts
```

---

## Release Process

### Automatic (via Deploy to Production)

1. Go to Actions → "Deploy to Production"
2. Click "Run workflow"
3. Type "DEPLOY" to confirm
4. Select version bump type
5. Click "Run workflow"

The workflow will:
- Validate all code
- Merge dev → main
- Bump version in `cli/package.json`
- Create GitHub release with changelog

### Manual Release

```bash
# Checkout main
git checkout main

# Merge dev
git merge dev

# Bump version
cd cli && npm version patch

# Push with tags
git push origin main --tags
```

---

## Adding New Agents

When adding agents to the library:

1. Create agent file in appropriate category
2. Follow the template structure
3. Include JSDoc comments in any JavaScript
4. Update agent library README
5. Ensure CI passes before merging
