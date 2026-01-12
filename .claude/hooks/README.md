# Hooks Configuration System

> Automated actions triggered by events in your development workflow

## Overview

The Hooks Configuration System provides declarative automation for common
development tasks. Enable hooks with TRUE/FALSE flags in PROJECT_STARTER.md and
they're automatically configured and installed.

## Quick Start

### 1. Configure in PROJECT_STARTER.md

```markdown
## Hooks Configuration

### Git Hooks

- **Pre-Commit Validation**: `TRUE`
- **Commit Message Validation**: `TRUE`

### File Hooks

- **Auto Format on Save**: `TRUE`
- **Auto Import Sort**: `TRUE`
```

### 2. Run Setup Command

```bash
/hooks-setup
```

### 3. Hooks Are Installed

That's it! Hooks are now active in your project.

## Directory Structure

```
.claude/hooks/
├── README.md                      # This file
├── config.json                    # Generated configuration
├── definitions/                   # Hook definitions
│   ├── pre-commit-validation.json
│   ├── commit-message-validation.json
│   ├── auto-format-on-save.json
│   ├── auto-import-sort.json
│   ├── readme-sync.json
│   ├── task-completion-notifications.json
│   └── agent-error-handling.json
├── templates/                     # Hook templates
│   ├── hook-template.json
│   └── custom-hook-guide.md
├── scripts/                       # Hook execution scripts
│   ├── run-hook.js
│   └── install-git-hooks.sh
└── examples/                      # Example configurations
    └── config.example.json
```

## Available Hooks

### Git Hooks (4)

| Hook                          | Purpose                                 | Trigger    |
| ----------------------------- | --------------------------------------- | ---------- |
| **Pre-Commit Validation**     | Lint, format, type-check before commits | pre-commit |
| **Pre-Push Validation**       | Run full test suite before pushing      | pre-push   |
| **Commit Message Validation** | Enforce conventional commit format      | commit-msg |
| **Branch Name Validation**    | Enforce branch naming conventions       | pre-commit |

### File Hooks (4)

| Hook                      | Purpose                           | Trigger |
| ------------------------- | --------------------------------- | ------- |
| **Auto Format on Save**   | Format code when files are saved  | on-save |
| **Auto Import Sort**      | Sort imports when files are saved | on-save |
| **Auto Documentation**    | Generate docs when code changes   | on-save |
| **Unused Code Detection** | Detect unused code                | on-save |

### Build & Test Hooks (4)

| Hook                     | Purpose                     | Trigger    |
| ------------------------ | --------------------------- | ---------- |
| **Pre-Build Validation** | Validate before builds      | pre-build  |
| **Post-Build Actions**   | Actions after builds        | post-build |
| **Test on File Change**  | Run tests when files change | on-change  |
| **Coverage Reporting**   | Generate coverage reports   | post-test  |

### Deployment Hooks (4)

| Hook                         | Purpose                          | Trigger      |
| ---------------------------- | -------------------------------- | ------------ |
| **Pre-Deploy Checks**        | Validate before deployments      | pre-deploy   |
| **Post-Deploy Verification** | Verify deployments               | post-deploy  |
| **Deployment Notifications** | Notify team of deployments       | post-deploy  |
| **Rollback on Failure**      | Auto-rollback failed deployments | deploy-error |

### Code Quality Hooks (4)

| Hook                      | Purpose                       | Trigger    |
| ------------------------- | ----------------------------- | ---------- |
| **Complexity Analysis**   | Analyze code complexity       | on-commit  |
| **Security Scanning**     | Scan for vulnerabilities      | pre-commit |
| **Dependency Audit**      | Check vulnerable dependencies | pre-commit |
| **Performance Profiling** | Profile performance           | on-change  |

### Documentation Hooks (4)

| Hook                   | Purpose             | Trigger     |
| ---------------------- | ------------------- | ----------- |
| **README Sync**        | Keep README in sync | post-commit |
| **API Doc Generation** | Generate API docs   | on-change   |
| **Changelog Update**   | Update changelog    | post-commit |
| **Type Documentation** | Generate type docs  | on-change   |

### Collaboration Hooks (4)

| Hook                     | Purpose                | Trigger     |
| ------------------------ | ---------------------- | ----------- |
| **PR Template Creation** | Create PR descriptions | on-pr       |
| **Issue Linking**        | Link commits to issues | post-commit |
| **Code Review Requests** | Request reviews        | on-pr       |
| **Status Updates**       | Post status updates    | various     |

### Agent Hooks (4)

| Hook                              | Purpose                   | Trigger       |
| --------------------------------- | ------------------------- | ------------- |
| **Task Completion Notifications** | Notify on task completion | task-complete |
| **Agent Error Handling**          | Handle agent errors       | task-error    |
| **Agent Performance Tracking**    | Track agent metrics       | task-end      |
| **Agent Context Saving**          | Save agent context        | task-end      |

**Total: 32 pre-configured hooks**

## Commands

### `/hooks-setup`

Generate and install hook configuration

```bash
/hooks-setup
```

**Options:**

- `--output-only` - Generate config without installing
- `--validate` - Validate existing configuration
- `--uninstall` - Remove all installed hooks
- `--list` - List all available hooks
- `--enable [hook]` - Enable specific hook
- `--disable [hook]` - Disable specific hook

## Hook Configuration Format

Each hook is defined in a JSON file:

```json
{
  "name": "hook-name",
  "displayName": "Hook Display Name",
  "category": "git|file|build|deployment|agent|quality|documentation|collaboration",
  "trigger": "event-name",
  "description": "What this hook does",
  "actions": [
    {
      "name": "action-name",
      "description": "Action description",
      "command": "command to run",
      "continueOnError": false,
      "timeout": 30000
    }
  ],
  "settings": {
    "enabled": true,
    "failOnError": true,
    "skipCIEnvironment": false
  },
  "files": {
    "include": ["src/**/*"],
    "exclude": ["**/*.test.ts"]
  }
}
```

## Generated Configuration

After running `/hooks-setup`, a configuration file is created:

```json
{
  "enabled": true,
  "version": "1.0.0",
  "hooks": {
    "git": {
      "pre-commit-validation": {
        "enabled": true,
        "actions": ["lint", "format-check", "type-check"],
        "failOnError": true
      },
      "commit-message-validation": {
        "enabled": true,
        "pattern": "^(feat|fix|docs|style|refactor|test|chore):\\s.+",
        "failOnError": true
      }
    },
    "file": {
      "auto-format-on-save": {
        "enabled": true,
        "extensions": [".js", ".ts", ".tsx", ".jsx"],
        "formatter": "prettier"
      }
    }
  }
}
```

## Adding Custom Hooks

### Step 1: Create Hook Definition

Create `.claude/hooks/definitions/custom-hook.json`:

```json
{
  "name": "custom-hook",
  "displayName": "Custom Hook",
  "category": "custom",
  "trigger": "event-name",
  "description": "Your custom hook",
  "actions": [
    {
      "name": "custom-action",
      "command": "your-command",
      "continueOnError": false
    }
  ],
  "settings": {
    "enabled": true
  }
}
```

### Step 2: Add to PROJECT_STARTER.md

```markdown
### Custom Hooks

**Custom Hook**: `TRUE` <!-- Description -->
```

### Step 3: Run Setup

```bash
/hooks-setup
```

## Hook Categories

### Git Hooks

Triggered by git commands:

- Run before commits, pushes, merges
- Validate commit messages
- Enforce branch naming
- Run tests and linting

### File Hooks

Triggered by file system events:

- Format code on save
- Sort imports
- Update documentation
- Detect issues

### Build Hooks

Triggered during build process:

- Pre-build validation
- Post-build actions
- Error handling
- Artifact generation

### Deployment Hooks

Triggered during deployment:

- Pre-deploy checks
- Post-deploy verification
- Notifications
- Rollback automation

### Agent Hooks

Triggered by agent operations:

- Task completion
- Error handling
- Performance tracking
- Context management

## Integration with Tools

### Git Hooks

Installed in `.git/hooks/`:

```bash
.git/hooks/
├── pre-commit
├── commit-msg
├── pre-push
└── post-commit
```

### IDE Integration

**VSCode** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

**JetBrains** (`.idea/`):

- File Watchers for formatting
- Actions on Save for imports

## Bypass Hooks

### Temporarily Skip

```bash
# Skip git hooks
git commit --no-verify -m "emergency fix"

# Skip specific hook
SKIP_HOOKS=pre-commit git commit -m "skip pre-commit"
```

### Disable Permanently

```bash
/hooks-setup --disable pre-commit-validation
```

## Best Practices

### Start Small

Begin with essential hooks:

```markdown
- **Pre-Commit Validation**: `TRUE`
- **Commit Message Validation**: `TRUE`
- **Auto Format on Save**: `TRUE`
```

### Performance

- Keep hooks fast (< 5 seconds)
- Use caching where possible
- Run heavy tasks in CI, not locally
- Skip hooks in CI environments when appropriate

### Team Coordination

- Document hooks in README
- Share configurations via git
- Provide bypass instructions
- Test hooks thoroughly

### Error Handling

- Set `continueOnError` appropriately
- Provide helpful error messages
- Log failures for debugging
- Allow easy bypass for emergencies

## Troubleshooting

### Hooks Not Running

1. Verify hooks are enabled: `cat .claude/hooks/config.json`
2. Check git hooks are installed: `ls -la .git/hooks/`
3. Ensure hooks are executable: `chmod +x .git/hooks/*`
4. Run validation: `/hooks-setup --validate`

### Hook Failing

1. Run hook command manually to see error
2. Check required tools are installed
3. Verify file paths and permissions
4. Review hook configuration

### IDE Integration Issues

1. Restart IDE to reload settings
2. Check IDE-specific configuration files
3. Verify IDE extensions are installed
4. Manual configuration may be needed

## Security

### Safe Practices

- Review hook actions before enabling
- Don't execute untrusted code
- Validate inputs to hook scripts
- Use secure defaults

### Sensitive Data

- Don't include secrets in hook configs
- Use environment variables for credentials
- Be cautious with hooks accessing remote services

## Examples

### Example 1: Basic Development Setup

```markdown
- **Pre-Commit Validation**: `TRUE`
- **Commit Message Validation**: `TRUE`
- **Auto Format on Save**: `TRUE`
```

Result: Clean commits with proper formatting and messages

### Example 2: Full CI/CD

```markdown
- **Pre-Commit Validation**: `TRUE`
- **Pre-Push Validation**: `TRUE`
- **Pre-Deploy Checks**: `TRUE`
- **Post-Deploy Verification**: `TRUE`
- **Deployment Notifications**: `TRUE`
```

Result: Comprehensive automation from commit to deployment

### Example 3: Documentation-Focused

```markdown
- **Auto Documentation**: `TRUE`
- **README Sync**: `TRUE`
- **API Doc Generation**: `TRUE`
- **Changelog Update**: `TRUE`
```

Result: Always up-to-date documentation

## Resources

- [Hook Template](./templates/hook-template.json)
- [Custom Hook Guide](./templates/custom-hook-guide.md)
- [Example Configuration](./examples/config.example.json)
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)

## Support

For help with hooks:

1. Run `/hooks-setup --validate`
2. Check hook definitions in `definitions/`
3. Review generated configuration
4. Test hooks manually
5. Open issue with details

---

_The Hooks Configuration System automates repetitive tasks and enforces
consistent development practices across your team._
