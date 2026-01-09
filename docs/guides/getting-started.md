# Getting Started

Get your project running in 2 minutes with Quick Start presets, or take full control with custom configuration.

## Choose Your Path

### 🚀 Quick Start (Recommended for Most Projects)

**Time:** 2 minutes | **Best for:** Standard tech stacks

[Complete Quick Start Guide →](quick-start-guide.md)

Select a preset that matches your project type and everything is configured automatically.

### ⚙️ Custom Configuration

**Time:** 5-10 minutes | **Best for:** Unique requirements

Manually configure each aspect of your project for complete control.

### 📚 Full Walkthrough (For Beginners)

**Time:** 30 minutes | **Best for:** First-time users

[Complete Beginner's Guide →](beginner-guide.md)

Step-by-step walkthrough with explanations of every concept.

---

## Quick Start Setup (2 Minutes)

### Step 1: Copy Template Files

```bash
# Clone the repository
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick

# Copy to your project
cp -r .claude/ /path/to/your/project/
cp PROJECT_STARTER.md /path/to/your/project/
cp .env.example /path/to/your/project/

cd /path/to/your/project/
```

### Step 2: Select Your Preset

Open `PROJECT_STARTER.md` and choose your tech stack:

```markdown
### Project Preset

- [ ] **Static Website** - HTML, Modern CSS, Vanilla JS
- [x] **Astro Site** - Astro 5, Modern CSS, Islands  ← Put X here
- [ ] **React App** - React, TypeScript, Vite
- [ ] **Next.js App** - Next.js 15, App Router
- [ ] **Vue/Nuxt** - Vue 3, Nuxt, Composition API
- [ ] **SvelteKit** - Svelte 5, SvelteKit
- [ ] **Full Stack** - Complete backend + frontend + database
- [ ] **Custom** - Manual configuration
```

### Step 3: Run Quick Start

```bash
/quick-start
```

**Done!** Your project is configured with:
- Code quality rules for your tech stack
- MCP servers (database, cloud, analytics)
- Development hooks (git, formatting, testing)
- Specialized AI agents
- Project structure

### Step 4: Add Your Project Details

In `PROJECT_STARTER.md`, fill out:

```markdown
## Project Information

### Project Name
My Awesome App

### Project Description
A web application that helps users manage their tasks efficiently

### Primary Goal
Create a simple, beautiful task manager that works on all devices
```

### Step 5: Generate and Build

```bash
# Create your project plan
/project-planner

# Generate implementation tasks
/task-planner

# Let agents build your project
/task-runner
```

**Your application is ready!**

---

## Custom Configuration (5-10 Minutes)

For projects with unique requirements:

### Step 1: Copy Template Files

Same as Quick Start Step 1 above.

### Step 2: Select Custom Preset

```markdown
### Project Preset

- [x] **Custom** - Manual configuration
```

### Step 3: Configure Master Toggles

```markdown
### Master Toggles

- **MCP Servers**: `TRUE`         # External services
- **Development Hooks**: `TRUE`   # Automation
- **Code Quality Rules**: `TRUE`  # Linting/standards
- **AI Agents**: `TRUE`           # Specialized agents
```

**Set to `FALSE` to disable entire categories.**

### Step 4: Configure Code Rules

```markdown
## Code Rules Configuration

### Language Standards
- **Modern JavaScript**: `TRUE`
- **TypeScript**: `FALSE`
- **Node.js**: `FALSE`
- **Python**: `FALSE`

### Framework Standards
- **Astro**: `TRUE`
- **React**: `FALSE`
(... configure what you need ...)
```

See [Configuration Guide](configuration.md) for all options.

### Step 5: Configure Services

```markdown
## MCP Configuration

### Database & Storage
- **Neon Database**: `TRUE`
- **Supabase**: `FALSE`

### Cloud & Infrastructure
- **Cloudflare**: `TRUE`
- **Vercel**: `FALSE`
(... select what you need ...)
```

### Step 6: Apply Configuration

```bash
/mcp-setup      # Configure MCP servers
/hooks-setup    # Configure development hooks
/rules-setup    # Configure code quality rules
```

### Step 7: Continue as Normal

Follow steps 4-5 from Quick Start above.

## What's Next?

- [Configure your project](configuration.md)
- [Learn about EARS notation](../architecture/index.md)
- [Explore the API](../api/index.md)

## Need Help?

- Check the [Architecture docs](../architecture/index.md) for design decisions
- Review [CLAUDE.md](../../CLAUDE.md) for AI context
- Look at the [QUICKSTART.md](../../QUICKSTART.md) for more details
