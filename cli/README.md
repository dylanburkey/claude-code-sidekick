# create-440-app

> CLI tool to create new projects with Claude Code Sidekick and 440css

## Quick Start

```bash
npx create-440-app
```

Follow the interactive prompts to create your project!

## Features

- 🎨 **8 Project Presets** - Static, Astro, React, Next.js, Nuxt, SvelteKit, Full Stack
- 🚀 **Interactive Setup** - Beautiful CLI with smart defaults
- 🎯 **Feature Selection** - Choose exactly what you need
- 📦 **Automatic Configuration** - All files, dependencies, and settings
- 🎨 **440css Integration** - Modern CSS system (optional)
- 🔧 **Development Ready** - Git, hooks, rules, MCPs pre-configured

## Usage

### Interactive Mode (Recommended)

```bash
npx create-440-app
```

The CLI will guide you through:
1. Project name
2. Preset selection (framework/stack)
3. Feature selection (database, auth, etc.)
4. Confirmation and creation

### Command Line Mode

```bash
# Create with specific preset
npx create-440-app my-app --preset=nuxt

# Skip dependency installation
npx create-440-app my-app --preset=astro --skip-install

# Skip git initialization
npx create-440-app my-app --preset=react --skip-git
```

## Available Presets

### Static Website
Perfect for landing pages and marketing sites
- Semantic HTML
- Modern CSS
- Vanilla JavaScript
- Vite bundler

### Astro Site
Best for content-heavy sites and blogs
- Astro 5
- Modern CSS
- Islands Architecture
- Cloudflare-ready

### React App
Modern single-page applications
- React 18
- TypeScript
- Vite
- TanStack Query

### Next.js App
Full-stack React framework
- Next.js 15
- App Router
- TypeScript
- Server Components

### Vue/Nuxt
Full-stack Vue framework
- Vue 3
- Nuxt
- Composition API
- Pinia state management

### SvelteKit
Modern reactive framework
- Svelte 5
- Runes API
- TypeScript
- Adapter Auto

### Full Stack
Complete backend + frontend
- Node.js/Fastify
- PostgreSQL/Prisma
- TypeScript
- API-first design

## Optional Features

Select any combination:

- **440css** - Modern CSS system (recommended for all projects)
- **Database** - Neon PostgreSQL with Prisma ORM
- **Authentication** - NextAuth.js integration
- **Analytics** - Sentry error tracking
- **Deployment** - Vercel/Cloudflare configuration

## What Gets Created

```
my-app/
├── .claude/                  # Claude Code configuration
│   ├── agents/              # Specialized AI agents
│   ├── commands/            # Slash commands
│   ├── hooks/               # Development hooks
│   └── rules/               # Code quality rules
├── 440css/                  # Modern CSS system (if selected)
├── PROJECT_STARTER.md       # Project configuration
├── package.json             # Dependencies and scripts
├── .env.example             # Environment template
└── .gitignore              # Git ignore patterns
```

## After Creation

```bash
cd my-app
npm install
npm run dev
```

Then use Claude Code Sidekick to build:

```bash
/project-planner   # Generate project plan
/task-planner      # Create implementation tasks
/task-runner       # Execute with AI agents
```

## CLI Options

| Option | Description |
|--------|-------------|
| `--preset <name>` | Skip preset selection (static\|astro\|react\|nextjs\|nuxt\|svelte\|fullstack) |
| `--skip-install` | Don't run npm install |
| `--skip-git` | Don't initialize git repository |
| `--help` | Show help message |
| `--version` | Show version number |

## Examples

**Create Astro blog:**
```bash
npx create-440-app my-blog --preset=astro
```

**Create Next.js app with database:**
```bash
npx create-440-app my-saas --preset=nextjs
# Select "Database" when prompted for features
```

**Create Vue app without installing:**
```bash
npx create-440-app my-vue-app --preset=nuxt --skip-install
cd my-vue-app
pnpm install  # Use your preferred package manager
```

## Requirements

- Node.js >= 18.0.0
- npm, yarn, pnpm, or bun

## Development

```bash
# Clone repository
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick/cli

# Install dependencies
npm install

# Test locally
npm run dev

# Link for global testing
npm link
create-440-app test-project
```

## Troubleshooting

### "command not found: create-440-app"

Make sure you have npm installed and run:
```bash
npx create-440-app
```

### Permission errors

On Unix systems, you may need:
```bash
sudo npx create-440-app
```

### Directory already exists

The CLI won't overwrite existing directories. Either:
- Choose a different project name
- Delete/rename the existing directory
- Use a different location

## License

MIT

## Links

- [Documentation](https://github.com/dylanburkey/claude-code-sidekick/tree/main/docs)
- [Claude Code Sidekick](https://github.com/dylanburkey/claude-code-sidekick)
- [440css](https://github.com/dylanburkey/claude-code-sidekick/tree/main/440css)
- [Report Issues](https://github.com/dylanburkey/claude-code-sidekick/issues)

---

**Happy building!** 🚀
