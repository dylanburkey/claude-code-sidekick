# Claude Code Sidekick

> The only Claude Code development toolkit you need. Combines battle-tested methodologies from Cursor, Zed, Windsurf, and Copilot into a simple, powerful development system that just works.

## Why Claude Code Sidekick?

Traditional AI coding tools give you **suggestions**. Claude Code Sidekick gives you **systems**.

While Cursor, Windsurf, and Copilot excel at code completion and inline suggestions, they leave you to figure out project structure, workflow automation, and system integration. Claude Code Sidekick provides a complete, opinionated development framework that transforms how you build software with AI.

### The Problem with Current AI Tools

**Copilot**: Excellent autocomplete, but no project structure or workflow
**Cursor**: Great AI pair programming, but requires manual setup for each project
**Windsurf**: Powerful flow-based coding, but lacks standardization and reusability
**Zed**: Fast and collaborative, but minimal AI-specific tooling

### The Claude Code Sidekick Solution

A complete development system that includes:

- **50+ Specialized Agents** for every development task
- **35+ Pre-Configured MCP Integrations** (databases, cloud, analytics, payments)
- **32+ Automated Hooks** for quality, testing, and deployment
- **Declarative Configuration** - Just flip TRUE/FALSE switches
- **Spec-Driven Development** with EARS notation
- **Complete Documentation** for every component

**Setup Time:** 5 minutes
**Configuration:** TRUE/FALSE flags in one file
**Result:** Production-ready development environment

## Key Differentiators

### 1. Declarative Configuration

**Others:** Write complex configuration files, install tools manually, configure each integration
**Sidekick:** Mark what you want as TRUE, run one command, done.

```markdown
## MCP Configuration
- **Neon Database**: `TRUE`
- **Cloudflare**: `TRUE`
- **GitHub**: `TRUE`
- **Stripe**: `TRUE`

## Hooks Configuration
- **Pre-Commit Validation**: `TRUE`
- **Auto Format on Save**: `TRUE`
```

Run `/mcp-setup` and `/hooks-setup` - your entire development environment is configured.

### 2. Agent Library

**Others:** General-purpose AI that tries to do everything
**Sidekick:** 50+ specialized agents, each expert in their domain

- **Code Generation Agents** - Generate components, APIs, migrations, configs
- **Task Automation Agents** - Handle builds, deployments, CI/CD
- **Testing Agents** - Create tests, run audits, validate accessibility
- **Documentation Agents** - Generate docs, maintain READMEs, update changelogs
- **Blockchain Agents** - Smart contracts, DApps, Web3 integration

Each agent includes real examples, best practices, and MCP integration.

### 3. MCP Integration at Scale

**Others:** Manual MCP setup, one server at a time
**Sidekick:** 35+ pre-configured MCP providers across 10 categories

- **Databases**: Neon, Supabase, Turso, Pinecone
- **Cloud**: Cloudflare, AWS, Vercel, Railway
- **Development**: GitHub, GitLab, Linear, Sentry
- **Analytics**: GA4, PostHog, Axiom, Datadog
- **Payments**: Stripe, PayPal, Shopify
- **AI/ML**: OpenAI, Anthropic, Hugging Face, Replicate
- **And 20+ more...**

Each provider includes:
- JSON configuration
- Environment variable templates
- Setup documentation
- Agent integration examples

### 4. Automated Quality & Compliance

**Others:** Manual testing, linting, and deployment
**Sidekick:** 32+ hooks automate your entire workflow

- **Git Hooks** - Validate commits, enforce standards, run tests
- **File Hooks** - Auto-format, sort imports, update docs
- **Build Hooks** - Pre-build validation, post-build analysis
- **Deployment Hooks** - Pre-deploy checks, rollback automation
- **Agent Hooks** - Task notifications, error handling

All configurable with TRUE/FALSE flags.

### 5. Spec-Driven Development

**Others:** Start coding, figure it out as you go
**Sidekick:** Define requirements first with EARS notation

```markdown
## Functional Requirements

### Event-Driven
- WHEN user clicks submit THE SYSTEM SHALL validate all fields
- WHEN validation passes THE SYSTEM SHALL send data to API

### State-Driven
- WHILE form is submitting THE SYSTEM SHALL disable submit button
- WHILE user is authenticated THE SYSTEM SHALL show logout option

### Error Handling
- IF network request fails THEN THE SYSTEM SHALL retry up to 3 times
```

Clear, testable, unambiguous requirements that become your implementation roadmap.

## Features

### Structured Workflow
**Requirements → Plans → Tasks → Implementation**

Define what you want, let the system break it down, execute with specialized agents.

```bash
/project-planner    # Analyze requirements, create phases
/task-planner       # Generate implementation tasks
/task-runner        # Execute with specialized agents
```

### Specialized Agents

| Agent | Role | When to Use |
|-------|------|-------------|
| **init** | Project setup | Starting new projects |
| **planner** | Requirements analysis | Planning features |
| **dev** | Code implementation | Building features |
| **test** | Testing & QA | Ensuring quality |
| **docs** | Documentation | Maintaining docs |
| **review** | Code review | Pre-commit validation |
| **orchestrator** | Task coordination | Complex workflows |

Plus **50+ specialized agents** in the Agent Library for specific tasks.

### MCP Integration

Pre-configured for **35+ providers**:

```markdown
## Available MCPs

Database & Storage (4)
- Neon, Supabase, Turso, Pinecone

Cloud & Infrastructure (4)
- Cloudflare, AWS, Vercel, Railway

Development Tools (4)
- GitHub, GitLab, Linear, Sentry

Analytics & Monitoring (4)
- GA4, PostHog, Axiom, Datadog

Payments & Commerce (3)
- Stripe, PayPal, Shopify

AI & ML Services (4)
- OpenAI, Anthropic, Hugging Face, Replicate

And 12+ more categories...
```

### Automated Hooks

**32+ hooks** across 8 categories:

- **Git** - Validate commits, run tests
- **File** - Format code, sort imports
- **Build** - Pre-build checks, post-build actions
- **Deploy** - Deployment automation, rollback
- **Quality** - Security scans, complexity analysis
- **Docs** - README sync, changelog updates
- **Collaboration** - PR templates, issue linking
- **Agent** - Task notifications, error handling

### Development Standards

Built-in enforcement for:

- **WCAG 2.1 AA** accessibility compliance
- **Semantic HTML** - proper elements, meaningful structure
- **Modern CSS** - Grid, Flexbox, custom properties
- **Progressive Enhancement** - works without JavaScript
- **Performance** - Lighthouse 90+, optimized bundles
- **Security** - OWASP compliance, vulnerability scanning

## Quick Start

### 1. Copy to Your Project

```bash
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick

# Copy to your project
cp -r .claude/ /your-project/
cp PROJECT_STARTER.md /your-project/
cp .env.example /your-project/
```

### 2. Configure Your Project

Edit `PROJECT_STARTER.md`:

```markdown
## Project Information
**Name:** Your Project
**Description:** What it does
**Type:** web-app

## MCP Configuration
- **Neon Database**: `TRUE`
- **Cloudflare**: `TRUE`
- **GitHub**: `TRUE`

## Hooks Configuration
- **Pre-Commit Validation**: `TRUE`
- **Auto Format on Save**: `TRUE`
```

### 3. Generate Configuration

```bash
/mcp-setup      # Configure MCPs
/hooks-setup    # Configure hooks
```

### 4. Start Building

```bash
/project-planner    # Create project plan
/task-planner       # Generate tasks
/task-runner        # Execute with agents
```

That's it. You now have:
- Database connected (Neon)
- Cloud infrastructure ready (Cloudflare)
- Git automation (GitHub)
- Code quality checks (pre-commit)
- Auto-formatting (on save)
- 50+ specialized agents
- Complete documentation

## Comparison

### vs. Cursor

**Cursor Strengths:**
- Excellent AI pair programming
- Natural language code editing
- Context-aware suggestions

**Sidekick Advantages:**
- Complete project structure
- Pre-configured integrations (35+ MCPs)
- Automated workflows (32+ hooks)
- Specialized agents for every task
- Declarative configuration
- Reusable across all projects

**Use Together:** Cursor for coding + Sidekick for structure and automation

### vs. Windsurf

**Windsurf Strengths:**
- Flow-based development
- Multi-file editing
- Contextual awareness

**Sidekick Advantages:**
- Standardized workflows
- Pre-built agent library
- MCP integration system
- Quality automation
- Production-ready configurations
- Team collaboration features

**Use Together:** Windsurf for flow + Sidekick for structure and deployment

### vs. Copilot

**Copilot Strengths:**
- Fast autocomplete
- Wide IDE support
- Simple setup

**Sidekick Advantages:**
- Complete development framework
- Project structure and organization
- Integration management
- Quality enforcement
- Documentation automation
- Deployment pipelines

**Use Together:** Copilot for suggestions + Sidekick for everything else

### The Sidekick Edge

What makes Claude Code Sidekick unique:

1. **Complete System** - Not just code completion, entire development workflow
2. **Declarative** - TRUE/FALSE configuration, no complex setup
3. **Extensible** - 50+ agents, 35+ MCPs, 32+ hooks, all customizable
4. **Production-Ready** - Quality, security, accessibility built-in
5. **Team-Friendly** - Shared configurations, consistent workflows
6. **Time-Saving** - Hours of setup becomes minutes

## What's Included

### Core Components

```
.claude/
├── commands/           # /project-planner, /task-planner, /mcp-setup, /hooks-setup
├── agents/            # Specialized AI agents for different tasks
├── hooks/             # 32+ automated development hooks
│   ├── definitions/   # Pre-configured hook definitions
│   ├── templates/     # Create custom hooks
│   └── examples/      # Example configurations
├── mcp/               # MCP integration system
│   ├── providers/     # 35+ pre-configured MCP providers
│   ├── templates/     # Custom MCP guide
│   └── configs/       # Generated configurations
├── rules/             # Development standards
│   ├── code-style.md
│   ├── accessibility.md
│   └── documentation.md
└── steering/          # Project-specific guidance
    ├── product.md
    ├── tech.md
    └── structure.md
```

### Agent Library

```
agent-library/
├── code-generation/   # Generate components, APIs, configs
├── task-automation/   # Build, deploy, CI/CD automation
├── testing/          # Unit tests, E2E, accessibility audits
├── documentation/    # API docs, READMEs, changelogs
├── blockchain/       # Smart contracts, DApps, Web3
└── templates/        # Create custom agents
```

## Use Cases

### Startup MVP Development
- **Quick Setup** - 5 minutes to production-ready environment
- **Integrated Services** - Database, hosting, analytics, payments
- **Quality Built-In** - Accessibility, security, performance
- **Fast Iteration** - Automated testing and deployment

### Enterprise Applications
- **Standardized Workflows** - Consistent across all teams
- **Compliance** - Built-in WCAG, security scanning
- **Integration** - 35+ pre-configured services
- **Documentation** - Automated and always up-to-date

### Open Source Projects
- **Contribution-Ready** - Pre-commit hooks, standards enforcement
- **Documentation** - Auto-generated, always synced
- **Quality Gates** - Automated testing, code review
- **Team Coordination** - Hooks for PR templates, issue linking

### Blockchain Development
- **Specialized Agents** - Smart contract generation, DApp scaffolding
- **Testing** - Automated testing with testnet integration
- **Documentation** - Contract documentation, API generation
- **Security** - Built-in security scanning and auditing

## Real-World Examples

### Example 1: Full-Stack SaaS

```markdown
## MCPs Enabled
- Neon Database: TRUE
- Cloudflare: TRUE
- GitHub: TRUE
- Sentry: TRUE
- Stripe: TRUE
- GA4: TRUE

## Hooks Enabled
- Pre-Commit Validation: TRUE
- Auto Format on Save: TRUE
- Pre-Deploy Checks: TRUE
- Post-Deploy Verification: TRUE
```

**Result:** Complete SaaS infrastructure with database, hosting, error tracking, payments, and analytics - configured in 5 minutes.

### Example 2: Blockchain DApp

```markdown
## MCPs Enabled
- Neon Database: TRUE (off-chain data)
- GitHub: TRUE
- Sentry: TRUE

## Agents Used
- Smart Contract Generator
- DApp Scaffolder
- Web3 Integration Helper
- Contract Test Generator
```

**Result:** Complete DApp with smart contracts, frontend, database, and testing - all generated with proper patterns.

### Example 3: Documentation Site

```markdown
## Hooks Enabled
- Auto Documentation: TRUE
- README Sync: TRUE
- API Doc Generation: TRUE
- Changelog Update: TRUE
```

**Result:** Documentation that updates automatically with every code change. Always accurate, always current.

## Documentation

### Getting Started
- [Quick Start Guide](docs/guides/getting-started.md)
- [MCP Integration](agent-library/docs/mcp-integration.md)
- [Hooks Configuration](.claude/hooks/README.md)
- [Agent Library](agent-library/README.md)

### Guides
- [Creating Custom Agents](agent-library/templates/README.md)
- [Adding Custom MCPs](.claude/mcp/templates/custom-mcp-guide.md)
- [Building Custom Hooks](.claude/hooks/templates/custom-hook-guide.md)
- [EARS Requirements Notation](docs/ears-guide.md)

### Reference
- [All Available MCPs](.claude/mcp/README.md)
- [All Available Hooks](.claude/hooks/README.md)
- [Code Style Rules](.claude/rules/code-style.md)
- [Accessibility Standards](.claude/rules/accessibility.md)

## Community & Support

### Contributing

We welcome contributions! Areas where you can help:

- **New Agents** - Add specialized agents to the library
- **MCP Providers** - Add new MCP integrations
- **Hooks** - Create useful automation hooks
- **Documentation** - Improve guides and examples
- **Examples** - Share real-world use cases

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Getting Help

- **Issues** - [GitHub Issues](https://github.com/dylanburkey/claude-code-sidekick/issues)
- **Discussions** - [GitHub Discussions](https://github.com/dylanburkey/claude-code-sidekick/discussions)
- **Documentation** - Comprehensive docs in this repo

## Roadmap

### Coming Soon
- Additional MCP providers (MongoDB, Redis, PostgreSQL)
- More specialized agents (mobile, desktop, embedded)
- IDE extensions (VSCode, JetBrains, Zed)
- CI/CD templates (GitHub Actions, GitLab CI, CircleCI)
- Monitoring dashboard for agents and hooks
- Team collaboration features

### Future Plans
- Visual workflow builder
- Agent marketplace
- Preset project templates
- Cloud-hosted agent execution
- Real-time collaboration

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

Built with inspiration from:
- **Cursor** - AI pair programming done right
- **Windsurf** - Flow-based development
- **Copilot** - AI code completion pioneer
- **Zed** - Fast, collaborative editing
- **Claude** - Advanced AI reasoning

Combined into something greater than the sum of its parts.

---

## The Bottom Line

**Other AI tools help you write code faster.**

**Claude Code Sidekick helps you build software better.**

- Complete development framework, not just code suggestions
- 50+ specialized agents for every task
- 35+ pre-configured integrations
- 32+ automated quality checks
- 5 minutes from clone to production-ready

**Stop cobbling together tools. Start with a system.**

[Get Started](docs/guides/getting-started.md) | [Browse Agent Library](agent-library/README.md) | [View Examples](examples/)

**Built for developers who want more than autocomplete.**
