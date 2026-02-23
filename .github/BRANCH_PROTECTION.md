# Branch Protection & CI/CD Strategy

## Branch Structure

```
main (production)
  ↑
  │ PR with required checks
  │
dev (staging/integration)
  ↑
  │ PR with quality checks
  │
feature/* (development)
feat/*
fix/*
```

## Branch Purposes

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code | Highly protected |
| `dev` | Integration/staging | Protected |
| `feature/*` | New features | None |
| `feat/*` | New features (alias) | None |
| `fix/*` | Bug fixes | None |

## Workflow

### 1. Feature Development

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Work on feature
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature

# Create PR to dev
```

### 2. PR to Dev (Quality Gate)

When you create a PR to `dev`, these checks run automatically:

- ✅ **Lint & Format** - ESLint, Prettier
- ✅ **Tests** - Unit tests, CLI tests
- ✅ **Security** - npm audit, secret scanning
- ✅ **Code Quality** - Redundancy, file sizes
- 🤖 **AI Review** - Multi-model consensus (if API keys configured)

**Required to pass:** Lint, Tests

### 3. Merge to Dev

Once PR checks pass and code is approved:
- Squash and merge to `dev`
- Feature branch is deleted

### 4. PR to Main (Release Gate)

When creating a PR from `dev` to `main`:

- All CI checks must pass
- Manual approval required
- Use `Merge Dev to Main` workflow for automated release

### 5. Release to Main

Use the manual workflow:

```
Actions → Merge Dev to Main → Run workflow
```

Options:
- **Merge strategy**: merge, squash, or rebase
- **Create release**: Auto-tag and create GitHub release
- **Version bump**: patch, minor, or major

## GitHub Branch Protection Settings

### For `main` branch:

```yaml
# Settings → Branches → Add rule → main
require_pull_request_reviews: true
required_approving_review_count: 1
dismiss_stale_reviews: true
require_status_checks: true
required_status_checks:
  - "CI - Code Quality & Validation / Lint & Code Quality"
  - "CI - Code Quality & Validation / Test CLI Tool"
  - "CI - Code Quality & Validation / Security Audit"
require_branches_to_be_up_to_date: true
restrict_pushes: true
allow_force_pushes: false
allow_deletions: false
```

### For `dev` branch:

```yaml
# Settings → Branches → Add rule → dev
require_pull_request_reviews: true
required_approving_review_count: 1
require_status_checks: true
required_status_checks:
  - "PR Quality Check / Lint & Format"
  - "PR Quality Check / Run Tests"
require_branches_to_be_up_to_date: true
allow_force_pushes: false
```

## CI/CD Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push/PR to main, dev | Full CI validation |
| `pr-quality-check.yml` | PR to dev | Quality gates for dev |
| `merge-dev-to-main.yml` | Manual | Controlled releases |
| `pre-commit.yml` | Push | Pre-commit validation |

## Setting Up API Keys for AI Review

To enable multi-model AI code review in CI:

1. Go to **Settings → Secrets and variables → Actions**
2. Add these secrets:
   - `OPENAI_API_KEY` - For GPT-4 reviews
   - `ANTHROPIC_API_KEY` - For Claude reviews
   - `GEMINI_API_KEY` - For Gemini reviews

The AI review will run on PRs to `dev` when at least one key is configured.

## Quick Reference

```bash
# Start new feature
git checkout dev && git pull
git checkout -b feature/my-feature

# Push and create PR
git push -u origin feature/my-feature
# → Create PR to dev on GitHub

# After PR merged to dev, release to main
# → Go to Actions → Merge Dev to Main → Run workflow
```
