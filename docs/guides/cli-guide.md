# CLI Guide

> **Create projects in seconds with the 440 CLI**

## What You'll Learn

- How to use `create-440-app` CLI
- Available presets and features
- Command-line options
- Customization and advanced usage

**Time Required:** 2 minutes to create a project

---

## Quick Start

### Installation

No installation required! Use npx:

```bash
npx create-440-app
```

### Your First Project

1. **Run the command:**

   ```bash
   npx create-440-app
   ```

2. **Answer the prompts:**

   ```
   ◆  What is your project named?
   │  my-awesome-app

   ◆  Choose your project type:
   │  ● Astro Site - Astro 5, Modern CSS, Islands

   ◆  Select additional features:
   │  ◼ 440css - Modern CSS system (recommended)
   │  ◻ Database - Neon PostgreSQL with Prisma
   │  ◻ Authentication - User authentication system

   ◆  Create project "my-awesome-app" with Astro Site?
   │  Yes
   ```

3. **Start building:**
   ```bash
   cd my-awesome-app
   npm install
   npm run dev
   ```

**Done!** Your project is ready in under 2 minutes.

---

## Available Presets

### Static Website

**Best for:** Landing pages, marketing sites, portfolios

**Includes:**

- Semantic HTML5
- Modern CSS
- Vanilla JavaScript
- Vite bundler
- SEO optimization

**Example use cases:**

- Product landing page
- Portfolio website
- Company homepage

---

### Astro Site

**Best for:** Content sites, blogs, documentation

**Includes:**

- Astro 5
- Modern CSS
- Islands Architecture
- Markdown/MDX support
- Cloudflare Pages ready

**Example use cases:**

- Technical blog
- Documentation site
- Content-heavy marketing site

---

### React App

**Best for:** Interactive web applications

**Includes:**

- React 18
- TypeScript
- Vite
- TanStack Query
- Modern CSS

**Example use cases:**

- Dashboard
- Admin panel
- Interactive tool

---

### Next.js App

**Best for:** Full-stack React applications

**Includes:**

- Next.js 15
- App Router
- TypeScript
- Server Components
- API Routes

**Example use cases:**

- SaaS application
- E-commerce site
- Full-stack web app

---

### Vue/Nuxt

**Best for:** Full-stack Vue applications

**Includes:**

- Vue 3
- Nuxt
- Composition API
- Pinia state management
- Server-side rendering

**Example use cases:**

- Task management app
- Social platform
- Content management system

---

### SvelteKit

**Best for:** Modern reactive applications

**Includes:**

- Svelte 5
- Runes API
- TypeScript
- SvelteKit routing
- Adapter Auto

**Example use cases:**

- Real-time dashboard
- Chat application
- Interactive data visualization

---

### Full Stack

**Best for:** Complete backend + frontend applications

**Includes:**

- Node.js/Fastify
- PostgreSQL/Prisma
- TypeScript
- API-first design
- Full authentication

**Example use cases:**

- Multi-tenant SaaS
- API platform
- Complex business application

---

## Optional Features

### 440css

**Recommended for all projects**

Modern CSS system with:

- Fluid typography
- Design tokens
- Dark mode
- Accessibility-first
- Semantic components

**When to use:**

- Every project (unless you have existing CSS framework)
- Prefer semantic CSS over utility classes
- Want professional, accessible design

---

### Database

**PostgreSQL with Prisma**

Includes:

- Neon PostgreSQL setup
- Prisma ORM
- Type-safe queries
- Migration system
- MCP integration

**When to use:**

- Need to store user data
- Building CRUD applications
- Require relational data

**Example:**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}
```

---

### Authentication

**NextAuth.js integration**

Includes:

- User registration/login
- Session management
- OAuth providers (Google, GitHub)
- JWT tokens
- Protected routes

**When to use:**

- User accounts required
- Need login/signup
- Protecting resources

---

### Analytics

**Sentry error tracking**

Includes:

- Error monitoring
- Performance tracking
- Release tracking
- User feedback
- MCP integration

**When to use:**

- Production applications
- Need error alerts
- Want performance insights

---

### Deployment

**Vercel and Cloudflare**

Includes:

- Deployment configuration
- Environment setup
- CI/CD integration
- MCP integration
- Platform-specific optimizations

**When to use:**

- Deploying to Vercel or Cloudflare
- Want automated deployments
- Need production config

---

## Command Line Usage

### Basic

```bash
# Interactive mode (recommended)
npx create-440-app

# With project name
npx create-440-app my-project
```

### With Preset

```bash
# Skip preset selection
npx create-440-app my-blog --preset=astro

# All presets
npx create-440-app my-app --preset=static
npx create-440-app my-app --preset=astro
npx create-440-app my-app --preset=react
npx create-440-app my-app --preset=nextjs
npx create-440-app my-app --preset=nuxt
npx create-440-app my-app --preset=svelte
npx create-440-app my-app --preset=fullstack
```

### Advanced Options

```bash
# Skip dependency installation
npx create-440-app my-app --skip-install

# Skip git initialization
npx create-440-app my-app --skip-git

# Combine options
npx create-440-app my-app --preset=nuxt --skip-install --skip-git
```

---

## After Creation

### Project Structure

```
my-project/
├── .claude/              # Claude Code Sidekick
│   ├── agents/          # AI agents
│   ├── commands/        # Slash commands
│   ├── hooks/           # Dev hooks
│   └── rules/           # Code rules
├── 440css/              # CSS system (if selected)
├── PROJECT_STARTER.md   # Configuration
├── package.json         # Dependencies
├── .env.example         # Environment template
└── .gitignore          # Git ignore
```

### Next Steps

1. **Install dependencies:**

   ```bash
   cd my-project
   npm install
   ```

2. **Start development:**

   ```bash
   npm run dev
   ```

3. **Generate project plan:**

   ```bash
   /project-planner
   ```

4. **Create tasks:**

   ```bash
   /task-planner
   ```

5. **Let AI build:**
   ```bash
   /task-runner
   ```

---

## Customization

### Modify PROJECT_STARTER.md

After creation, edit `PROJECT_STARTER.md` to:

- Add project description
- Change enabled rules
- Toggle MCP servers
- Configure hooks
- Adjust agent settings

### Add Dependencies

```bash
# Add any additional packages
npm install package-name

# Example: Add Tailwind (if not using 440css)
npm install tailwindcss autoprefixer
```

### Configure Environment

1. Copy example:

   ```bash
   cp .env.example .env
   ```

2. Add your keys:
   ```env
   DATABASE_URL=postgresql://...
   NEON_API_KEY=neon_api_...
   ```

---

## Examples

### Blog with Astro

```bash
npx create-440-app my-blog --preset=astro
cd my-blog
npm install
npm run dev
```

Features to select:

- ✓ 440css
- ✗ Database (use Markdown files)
- ✓ Deployment

### SaaS with Next.js

```bash
npx create-440-app my-saas --preset=nextjs
cd my-saas
npm install
npm run dev
```

Features to select:

- ✓ 440css
- ✓ Database
- ✓ Authentication
- ✓ Analytics
- ✓ Deployment

### Dashboard with Nuxt

```bash
npx create-440-app my-dashboard --preset=nuxt
cd my-dashboard
npm install
npm run dev
```

Features to select:

- ✓ 440css
- ✓ Database
- ✓ Authentication
- ✓ Analytics

---

## Troubleshooting

### Command not found

**Error:**

```
command not found: create-440-app
```

**Solution:** Use `npx`:

```bash
npx create-440-app
```

### Directory exists

**Error:**

```
Directory 'my-app' already exists
```

**Solution:** Choose a different name or remove existing directory:

```bash
rm -rf my-app
npx create-440-app my-app
```

### Permission denied

**Error:**

```
Permission denied
```

**Solution:** Check directory permissions:

```bash
# Unix/Mac
ls -la

# Fix permissions if needed
chmod 755 .
```

### Installation fails

**Error:**

```
npm install failed
```

**Solution:** Try different package manager:

```bash
# Create without installing
npx create-440-app my-app --skip-install

# Use your preferred manager
cd my-app
yarn install
# or
pnpm install
# or
bun install
```

---

## Comparison with Manual Setup

| Task                | Manual     | CLI       |
| ------------------- | ---------- | --------- |
| Clone template      | 2 min      | 0 min     |
| Select preset       | 2 min      | 30 sec    |
| Configure files     | 5 min      | 0 min     |
| Set up dependencies | 3 min      | 0 min     |
| Initialize git      | 1 min      | 0 min     |
| **Total**           | **13 min** | **2 min** |

**Time saved: 84%**

---

## Next Steps

- [Beginner's Guide](beginner-guide.md) - Learn the concepts
- [Quick Start Guide](quick-start-guide.md) - Preset details
- [Nuxt Walkthrough](nuxt-fullstack-walkthrough.md) - Build full app
- [Troubleshooting](troubleshooting.md) - Common issues

---

**Ready to build!**
