# Quick Start Guide

> Get from zero to production-ready in 2 minutes with preset configurations

## Overview

The Quick Start system provides instant project configuration through intelligent presets that automatically configure:

- **Code Quality Rules** - Language and framework-specific best practices
- **MCP Servers** - Database, cloud, and service integrations
- **Development Hooks** - Automation for git, formatting, and testing
- **AI Agents** - Specialized agents for your tech stack
- **Project Structure** - Folders, configs, and initial files

## How It Works

### 1. Choose Your Stack

Instead of manually configuring dozens of settings, simply select the preset that matches your project:

```markdown
### Project Preset

- [ ] **Static Website** - Semantic HTML, Modern CSS, Vanilla JavaScript
- [x] **Astro Site** - Astro 5, Modern CSS, Islands Architecture
- [ ] **React App** - React, TypeScript, Vite, TanStack
- [ ] **Next.js App** - Next.js 15, App Router, TypeScript
- [ ] **Vue/Nuxt** - Vue 3, Nuxt, Composition API
- [ ] **SvelteKit** - Svelte 5, SvelteKit, Runes
- [ ] **Full Stack** - Complete backend + frontend + database
- [ ] **Custom** - Manual configuration
```

### 2. Run One Command

```bash
/quick-start
```

### 3. Start Building

Your entire development environment is configured and ready!

## Available Presets

### Static Website

**Perfect for:**
- Landing pages
- Documentation sites
- Marketing websites
- Portfolios

**Includes:**
- Modern JavaScript (ES6+)
- Modern CSS (Grid, Flexbox, Custom Properties)
- WCAG AA Accessibility
- SEO Optimization
- Git hooks for code quality

**MCP Servers:**
- GitHub (repository operations)

**Hooks:**
- Pre-commit validation
- Auto-format on save
- README sync

---

### Astro Site

**Perfect for:**
- Blogs and content sites
- Marketing sites
- Documentation
- Content-heavy applications

**Includes:**
- Astro 5 conventions
- Modern CSS
- Component best practices
- Islands architecture
- SEO & performance optimization
- PWA support

**MCP Servers:**
- GitHub (repository operations)
- Cloudflare (Workers, Pages, D1)
- Sentry (error tracking)
- Google Analytics 4

**Hooks:**
- Pre-commit validation
- Commit message validation
- Auto-format on save
- Auto import sort
- README sync
- Task notifications

---

### React App

**Perfect for:**
- Dashboards
- Admin panels
- Single-page applications
- Interactive web apps

**Includes:**
- React 18+ best practices
- TypeScript strict mode
- Vite bundling
- Modern CSS
- Testing standards
- Component patterns

**MCP Servers:**
- GitHub
- Vercel (deployment)
- Sentry (error tracking)

**Hooks:**
- Pre-commit validation
- Commit message validation
- Auto-format on save
- Test on file change
- README sync

---

### Next.js App

**Perfect for:**
- Full-stack applications
- E-commerce sites
- Content platforms
- SaaS products

**Includes:**
- Next.js 15+ conventions
- App Router patterns
- React Server Components
- TypeScript
- Tailwind CSS
- API routes
- Testing setup

**MCP Servers:**
- GitHub
- Vercel (deployment)
- Sentry (error tracking)
- Supabase (database + auth)

**Hooks:**
- Pre-commit validation
- Pre-push validation
- Commit message validation
- Auto-format on save
- Test on file change
- API doc generation

---

### Vue/Nuxt

**Perfect for:**
- Single-page applications
- Server-side rendered apps
- Progressive web apps

**Includes:**
- Vue 3 Composition API
- Nuxt auto-imports
- TypeScript
- Tailwind CSS
- Modern patterns

**MCP Servers:**
- GitHub
- Vercel (deployment)
- Sentry (error tracking)

**Hooks:**
- Pre-commit validation
- Auto-format on save
- Test on file change
- README sync

---

### SvelteKit

**Perfect for:**
- Fast, lightweight apps
- Interactive experiences
- Performance-critical sites

**Includes:**
- Svelte 5 features
- Runes system
- TypeScript
- Modern CSS
- Routing patterns

**MCP Servers:**
- GitHub
- Vercel (deployment)
- Sentry (error tracking)

**Hooks:**
- Pre-commit validation
- Auto-format on save
- Test on file change
- README sync

---

### Full Stack

**Perfect for:**
- Complete applications
- SaaS platforms
- Enterprise applications
- Complex systems

**Includes:**
- Frontend (React/Next.js)
- Backend (Hono/Node.js)
- Database (PostgreSQL/D1)
- API design patterns
- Authentication
- Testing (unit + E2E)
- Security best practices

**MCP Servers:**
- GitHub
- Neon Database (PostgreSQL)
- Cloudflare (Workers, D1, KV)
- Vercel (deployment)
- Sentry (error tracking)
- Stripe (payments)
- Google Analytics 4

**Hooks:**
- Pre-commit validation
- Pre-push validation
- Commit message validation
- Auto-format on save
- Test on file change
- Pre-build validation
- Security scanning
- API doc generation

---

### Custom

**Perfect for:**
- Unique tech stacks
- Legacy projects
- Experimental setups
- Projects with specific requirements

**Behavior:**
- No automatic configuration
- Complete manual control
- Fill out all sections in PROJECT_STARTER.md

## Master Toggles

Control entire feature categories:

```markdown
### Master Toggles

- **MCP Servers**: `TRUE`         # Enable database and service integrations
- **Development Hooks**: `TRUE`   # Enable git hooks and automation
- **Code Quality Rules**: `TRUE`  # Enable linting and standards
- **AI Agents**: `TRUE`           # Enable specialized task agents
```

When set to `FALSE`, the entire category is disabled:

- `MCP Servers: FALSE` → No MCP configuration
- `Development Hooks: FALSE` → No hooks installed
- `Code Quality Rules: FALSE` → No code rules enforced
- `AI Agents: FALSE` → Only core agents available

## Workflow Comparison

### With Quick Start (2 minutes)

```bash
# 1. Select preset in PROJECT_STARTER.md
- [x] Astro Site

# 2. Apply preset
/quick-start

# 3. Done!
```

### Without Quick Start (30-60 minutes)

```bash
# 1. Research best practices for Astro
# 2. Set up linting configuration
# 3. Configure prettier
# 4. Install and configure MCP servers (Cloudflare, Sentry, GA4)
# 5. Set up git hooks manually
# 6. Create project structure
# 7. Configure build tools
# 8. Set up environment variables
# 9. Write documentation
# ... 20+ more steps
```

## Advanced Usage

### Override Preset Settings

Start with a preset, then customize:

```markdown
### Project Preset
- [x] **Astro Site**

### Master Toggles
- **MCP Servers**: `TRUE`
- **Development Hooks**: `TRUE`
- **Code Quality Rules**: `TRUE`

## Code Rules Configuration
<!-- Override specific rules -->
- **TypeScript**: `TRUE`  <!-- Add TypeScript to Astro preset -->
- **Tailwind CSS**: `TRUE`  <!-- Add Tailwind to Astro preset -->
```

### Validate Before Applying

```bash
/quick-start --validate
```

Shows what will be configured without making changes.

### Preview Configuration

```bash
/quick-start --show-preset
```

Displays complete preset configuration.

### Switch Presets

```bash
# Change preset in PROJECT_STARTER.md
- [x] **Next.js App**  # Changed from Astro Site

# Reapply
/quick-start
```

Configuration updates to match new preset.

## What Gets Configured

### Code Rules

Based on your tech stack:

```
Astro Site Preset:
✓ Modern JavaScript (ES6+)
✓ Astro Conventions
✓ Modern CSS (Grid, Flexbox, Custom Properties)
✓ WCAG AA Accessibility
✓ SEO Optimization
✓ Performance Best Practices
✓ Security Standards
✓ PWA Standards
```

### MCP Servers

Integrations for your stack:

```
Astro Site Preset:
✓ GitHub → Repository operations, PRs, issues
✓ Cloudflare → Workers, Pages, D1 database
✓ Sentry → Error tracking and monitoring
✓ Google Analytics 4 → Web analytics
```

### Development Hooks

Automation for your workflow:

```
Astro Site Preset:
✓ Pre-Commit Validation → Lint, format, type-check
✓ Commit Message Validation → Conventional commits
✓ Auto Format on Save → Prettier formatting
✓ Auto Import Sort → Organize imports
✓ README Sync → Keep docs updated
✓ Task Notifications → Agent completion alerts
```

### Project Structure

Initial folders and files:

```
Astro Site Structure:
src/
├── components/
├── layouts/
├── pages/
└── styles/
public/
astro.config.mjs
.env.example
.vscode/settings.json
.claude/
└── (all configuration files)
```

## After Quick Start

Your project has:

1. **Code quality enforcement** - Linting, formatting, type checking
2. **Automated workflows** - Git hooks, file watchers, build scripts
3. **Service integrations** - Database, cloud, analytics, monitoring
4. **Specialized agents** - Framework-specific AI assistance
5. **Best practices** - Industry standards for your stack
6. **Documentation** - README, API docs, inline comments

## Next Steps

```bash
# 1. Set up environment variables
cp .env.example .env
# Add your API keys

# 2. Install dependencies
npm install

# 3. Create your project plan
/project-planner

# 4. Generate tasks
/task-planner

# 5. Start building
/task-runner
```

## Troubleshooting

### Multiple Presets Selected

**Error:** Only one preset can be selected at a time.

**Fix:** Ensure only one preset has `[x]` checkbox marked.

### No Preset Selected

**Error:** No preset is marked in PROJECT_STARTER.md.

**Fix:** Select a preset by changing `[ ]` to `[x]` for your chosen option.

### Master Toggle Disabled

**Behavior:** If a master toggle is `FALSE`, that entire section is skipped.

**Example:**
```markdown
- **MCP Servers**: `FALSE`
```
Result: No MCP servers will be configured, regardless of preset.

### Preset vs Manual Config Conflict

**Warning:** Manual configuration overrides preset.

**Fix:** Either:
1. Remove manual config to use preset defaults
2. Switch to "Custom" preset for full manual control

## Benefits

### Speed
- **Without Quick Start:** 30-60 minutes of configuration
- **With Quick Start:** 2 minutes to production-ready

### Consistency
- Same setup across all projects
- Team-wide standards
- Best practices enforced automatically

### Completeness
- Nothing missed
- All integrations configured
- Full automation enabled

### Flexibility
- Start with preset, customize as needed
- Master toggles for bulk control
- Switch presets anytime

---

**Quick Start transforms setup from hours to minutes. Choose your stack, run one command, and start building.**
