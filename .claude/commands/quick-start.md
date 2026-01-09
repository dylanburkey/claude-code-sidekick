# Quick Start Command

> Instantly configure your project based on the selected preset in PROJECT_STARTER.md

## Purpose

This command reads the Quick Start Configuration section in PROJECT_STARTER.md and automatically:

1. Applies the selected preset configuration
2. Enables appropriate MCP servers
3. Configures development hooks
4. Sets up code quality rules
5. Initializes project structure

## Usage

```bash
/quick-start
```

Or with options:

```bash
/quick-start --validate     # Validate configuration without applying
/quick-start --show-preset  # Show what will be configured
/quick-start --reset        # Reset to custom configuration
```

## Process

### Step 1: Read PROJECT_STARTER.md

Parse the Quick Start Configuration section:

```markdown
### Project Preset

- [x] **Astro Site** - Astro 5, Modern CSS, Islands Architecture
- [ ] **React App** - React, TypeScript, Vite, TanStack
- [ ] **Custom** - Manual configuration
```

Identify the selected preset (the one marked with `[x]`).

### Step 2: Load Preset Definition

Read the preset configuration from `.claude/config/preset-definitions.json`:

```json
{
  "astro-site": {
    "name": "Astro Site",
    "rules": {
      "Modern JavaScript": true,
      "Astro": true,
      "Modern CSS": true,
      "WCAG AA Accessibility": true,
      "SEO Optimization": true,
      "Performance": true
    },
    "mcp": {
      "GitHub": true,
      "Cloudflare": true,
      "Sentry": true
    },
    "hooks": {
      "Pre-Commit Validation": true,
      "Auto Format on Save": true,
      "README Sync": true
    }
  }
}
```

### Step 3: Check Master Toggles

Verify master toggles in PROJECT_STARTER.md:

```markdown
### Master Toggles

- **MCP Servers**: `TRUE`
- **Development Hooks**: `TRUE`
- **Code Quality Rules**: `TRUE`
- **AI Agents**: `TRUE`
```

Only configure sections where master toggle is `TRUE`.

### Step 4: Apply Configuration

For each enabled section:

#### Code Rules

1. Create rule files in `.claude/rules/`
2. Load rule definitions from library
3. Apply preset-specific rules
4. Generate config file

**Example Output:**

```
Creating code rules:
✓ Modern JavaScript (ES6+)
✓ Astro Conventions
✓ Modern CSS (Grid, Flexbox, Custom Properties)
✓ WCAG AA Accessibility
✓ SEO Optimization
✓ Performance Best Practices

Rules configured in .claude/rules/config.json
```

#### MCP Servers

1. Enable specified MCP servers
2. Generate MCP configuration
3. Create `.env.example` with required keys

**Example Output:**

```
Configuring MCP servers:
✓ GitHub (repository operations)
✓ Cloudflare (Workers, D1, Pages)
✓ Sentry (error tracking)

Required environment variables added to .env.example:
- GITHUB_TOKEN
- CLOUDFLARE_API_TOKEN
- SENTRY_AUTH_TOKEN

Run: cp .env.example .env and add your API keys
```

#### Development Hooks

1. Install enabled hooks
2. Configure hook settings
3. Set up git hooks
4. Configure IDE integration

**Example Output:**

```
Setting up development hooks:
✓ Pre-Commit Validation
✓ Commit Message Validation
✓ Auto Format on Save
✓ Auto Import Sort
✓ README Sync
✓ Task Completion Notifications

Git hooks installed in .git/hooks/
IDE settings updated in .vscode/settings.json
```

#### AI Agents

If enabled, configure specialized agents:

```
Enabling AI agents:
✓ Code generation agents
✓ Testing agents
✓ Documentation agents
✓ Review agents

Agent configurations in .claude/agents/
```

### Step 5: Generate Project Structure

Create initial project structure based on preset:

**For Astro Site:**

```
Creating Astro project structure:
✓ src/
  ├─ components/
  ├─ layouts/
  ├─ pages/
  └─ styles/
✓ public/
✓ astro.config.mjs
✓ tsconfig.json (if TypeScript enabled)
```

### Step 6: Install Dependencies

Suggest dependencies based on preset:

```markdown
Recommended dependencies for Astro Site:

Install with:
npm install astro @astrojs/cloudflare

Dev dependencies:
npm install -D prettier prettier-plugin-astro
```

### Step 7: Output Summary

Display comprehensive setup summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick Start Complete: Astro Site
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Preset Applied
✓ Code Rules Configured (6 rules)
✓ MCP Servers Enabled (3 servers)
✓ Development Hooks Installed (6 hooks)
✓ AI Agents Enabled
✓ Project Structure Created

Configuration Files:
├─ .claude/rules/config.json
├─ .claude/hooks/config.json
├─ .claude/mcp/config.json
├─ .env.example
└─ .vscode/settings.json

Next Steps:
1. Copy .env.example to .env and add API keys
2. Install dependencies: npm install
3. Start development: npm run dev
4. Run /project-planner to create your project plan

Documentation:
- Code Rules: .claude/rules/README.md
- MCP Setup: docs/guides/mcp-configuration.md
- Hooks Guide: docs/guides/hooks-setup.md

Ready to start building! 🚀
```

## Available Presets

### Static Website

Perfect for simple sites with semantic HTML and vanilla JavaScript.

**Includes:**
- Modern JavaScript (ES6+)
- Modern CSS (Grid, Flexbox, Custom Properties)
- WCAG AA Accessibility
- SEO Optimization
- Basic git hooks

**Best for:**
- Landing pages
- Documentation sites
- Marketing websites
- Portfolios

### Astro Site

Optimized for content-focused sites with Astro's islands architecture.

**Includes:**
- Astro conventions
- Modern CSS
- Component best practices
- SEO & performance optimization
- Cloudflare deployment
- PWA support

**Best for:**
- Blogs
- Marketing sites
- Documentation
- Content-heavy applications

### React App

Single-page applications with React and modern tooling.

**Includes:**
- React best practices
- TypeScript support
- Vite bundling
- Testing standards
- State management patterns

**Best for:**
- Dashboards
- Admin panels
- Web applications
- SaaS products

### Next.js App

Full-featured Next.js applications with App Router.

**Includes:**
- Next.js conventions
- React Server Components
- TypeScript
- Tailwind CSS
- API routes
- Testing setup

**Best for:**
- Full-stack applications
- E-commerce sites
- Content platforms
- Marketing + App hybrid

### Vue/Nuxt

Modern Vue 3 applications with Nuxt.

**Includes:**
- Vue Composition API
- Nuxt auto-imports
- TypeScript
- Tailwind CSS
- Server-side rendering

**Best for:**
- SPAs
- SSR applications
- Progressive web apps

### SvelteKit

Lightweight applications with Svelte and SvelteKit.

**Includes:**
- Svelte 5 features
- Runes system
- TypeScript
- Modern CSS
- Routing patterns

**Best for:**
- Fast, lightweight apps
- Interactive experiences
- Performance-critical sites

### Full Stack

Complete backend + frontend + database stack.

**Includes:**
- Frontend framework (React/Next.js)
- Backend API (Hono/Express)
- Database (PostgreSQL/D1)
- Authentication
- Testing (unit + E2E)
- Deployment pipelines

**Best for:**
- Complete applications
- SaaS platforms
- Enterprise apps
- Complex systems

### Custom

Manual configuration for unique requirements.

**Behavior:**
- No automatic configuration
- Fill out all sections manually
- Full control over every setting

**Best for:**
- Unique tech stacks
- Legacy projects
- Experimental setups
- Specific requirements

## Command Options

### `--validate`

Check configuration without applying changes:

```bash
/quick-start --validate
```

**Output:**

```
Validating configuration...

✓ Valid preset selected: Astro Site
✓ Master toggles configured
✓ No conflicting rules
✓ Required dependencies available
✓ Configuration is consistent

Ready to apply with: /quick-start
```

### `--show-preset`

Display what will be configured:

```bash
/quick-start --show-preset
```

**Output:**

```
Preset: Astro Site

Code Rules (6):
- Modern JavaScript (ES6+)
- Astro Conventions
- Modern CSS
- WCAG AA Accessibility
- SEO Optimization
- Performance

MCP Servers (3):
- GitHub
- Cloudflare
- Sentry

Development Hooks (6):
- Pre-Commit Validation
- Commit Message Validation
- Auto Format on Save
- Auto Import Sort
- README Sync
- Task Completion Notifications

Run /quick-start to apply this configuration
```

### `--reset`

Reset to custom configuration:

```bash
/quick-start --reset
```

**Behavior:**
- Changes PROJECT_STARTER.md preset to "Custom"
- Preserves existing configurations
- Allows manual setup

## Examples

### Example 1: New Astro Project

1. Select Astro Site preset in PROJECT_STARTER.md
2. Run `/quick-start`
3. Copy `.env.example` to `.env`
4. Add API keys
5. Install dependencies
6. Start building

**Result:** Fully configured Astro project in minutes.

### Example 2: Validate Before Applying

```bash
/quick-start --validate
```

Check configuration, review output, then:

```bash
/quick-start
```

### Example 3: See What Changes

```bash
/quick-start --show-preset
```

Review the preset configuration, adjust if needed, then apply.

### Example 4: Start Over

Made mistakes? Reset:

```bash
/quick-start --reset
```

Reconfigure PROJECT_STARTER.md with different choices, then re-run.

## Integration with Other Commands

### After Quick Start

```bash
/quick-start           # Configure project
/mcp-setup            # Fine-tune MCP if needed
/hooks-setup          # Adjust hook settings
/project-planner      # Create project plan
```

### Workflow

```
PROJECT_STARTER.md
        ↓
   /quick-start (applies preset)
        ↓
   Manual adjustments (optional)
        ↓
   /project-planner
        ↓
   Start development
```

## Troubleshooting

### Multiple Presets Selected

**Error:**

```
Error: Multiple presets selected
Found: Astro Site, React App

Please select only ONE preset or choose Custom.
```

**Fix:** Ensure only one preset has `[x]` in PROJECT_STARTER.md.

### No Preset Selected

**Error:**

```
Error: No preset selected

Please select a preset in PROJECT_STARTER.md or choose Custom.
```

**Fix:** Mark one preset with `[x]` in the checkbox.

### Conflicting Configuration

**Warning:**

```
Warning: Manual MCP configuration conflicts with preset

Preset enables: GitHub, Cloudflare, Sentry
Manual config enables: GitHub, Vercel, AWS

Using manual configuration (Custom preset mode)
```

**Fix:** Either:
1. Remove manual MCP configuration to use preset
2. Switch to "Custom" preset for manual control

### Missing Dependencies

**Warning:**

```
Warning: Preset requires packages not in package.json

Missing: astro, @astrojs/cloudflare

Run: npm install astro @astrojs/cloudflare
```

**Fix:** Install required dependencies.

## Best Practices

### Start Simple

Choose the simplest preset that meets your needs:

- Building a blog? → **Astro Site**
- Need an app? → **React App**
- Full features? → **Next.js App**
- Unique setup? → **Custom**

### Use Presets as Starting Points

You can:
1. Apply a preset
2. Manually adjust specific settings
3. Keep most preset defaults

### Review Before Applying

Always run `--show-preset` first to see what will change.

### Keep Presets Updated

As your project grows, you might:
- Start with **Static Website**
- Upgrade to **Astro Site**
- Eventually use **Full Stack**

Re-run `/quick-start` with new preset to update configuration.

## Notes

- Presets are templates, not restrictions
- You can override any preset setting
- Master toggles apply to all presets
- Custom preset = manual configuration
- Presets save hours of initial setup

---

*Quick Start makes project setup instant. Choose your stack, apply the preset, and start building in minutes instead of hours.*
