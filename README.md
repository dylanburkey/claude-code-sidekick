# Claude Code Sidekick

> Complete development framework for AI-assisted coding with Claude.
> Professional project scaffolding, specialized agents, and automation in one
> command.

## Quick Start

### Option 1: CLI - Instant Project Creation (2 minutes)

```bash
npx create-claude-project
```

Follow the interactive prompts to scaffold a production-ready project with
Claude Code Sidekick configured.

### Option 2: Manual Setup (5 minutes)

```bash
# Clone the repository
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick

# Copy to your project
cp -r .claude/ /your-project/
cp PROJECT_STARTER.md /your-project/

# Configure with Quick Start
# Edit PROJECT_STARTER.md, then run:
/quick-start
```

---

## What is Claude Code Sidekick?

Traditional AI coding tools give you **suggestions**. Claude Code Sidekick gives
you **systems**.

While Cursor, Windsurf, and Copilot excel at code completion and inline
suggestions, they leave you to figure out project structure, workflow
automation, and system integration. Claude Code Sidekick provides a complete,
opinionated development framework that transforms how you build software with
AI.

### Core Features

- **Professional CLI** - `npx create-claude-project` for instant project
  generation
- **50+ Specialized Agents** for every development task
- **35+ Pre-Configured MCP Integrations** (databases, cloud, analytics,
  payments)
- **32+ Automated Hooks** for quality, testing, and deployment
- **Declarative Configuration** - Just flip TRUE/FALSE switches
- **Spec-Driven Development** with EARS notation
- **Complete Documentation** for every component

**Setup Time:** 2 minutes with CLI, 5 minutes manual **Configuration:** Choose a
preset or use TRUE/FALSE flags **Result:** Production-ready development
environment

---

## CLI Features

The `create-claude-project` CLI scaffolds production-ready projects with:

- **8 Production Presets** - Static, Astro, React, Next.js, Nuxt, SvelteKit,
  Full Stack, Custom
- **Feature Selection** - Database, auth, analytics, deployment configs
- **Automatic Setup** - All files, dependencies, and configurations
- **Claude Code Integration** - .claude/ directory with agents, hooks, and rules
- **Git Ready** - Initialized with .gitignore and initial commit
- **Zero Config** - Everything works out of the box

[View CLI Documentation →](cli/README.md)

---

## Key Differentiators

### 1. Declarative Configuration

**Others:** Write complex configuration files, install tools manually, configure
each integration **Sidekick:** Mark what you want as TRUE, run one command, done

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

Run `/mcp-setup` and `/hooks-setup` - your entire development environment is
configured.

### 2. Agent Library

**Others:** General-purpose AI that tries to do everything **Sidekick:** 50+
specialized agents, each expert in their domain

- **Code Generation Agents** - Generate components, APIs, migrations, configs
- **Task Automation Agents** - Handle builds, deployments, CI/CD
- **Testing Agents** - Create tests, run audits, validate accessibility
- **Documentation Agents** - Generate docs, maintain READMEs, update changelogs
- **Blockchain Agents** - Smart contracts, DApps, Web3 integration

Each agent includes real examples, best practices, and MCP integration.

### 3. MCP Integration at Scale

**Others:** Manual MCP setup, one server at a time **Sidekick:** 35+
pre-configured MCP providers across 10 categories

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

**Others:** Manual testing, linting, and deployment **Sidekick:** 32+ hooks
automate your entire workflow

- **Git Hooks** - Validate commits, enforce standards, run tests
- **File Hooks** - Auto-format, sort imports, update docs
- **Build Hooks** - Pre-build validation, post-build analysis
- **Deployment Hooks** - Pre-deploy checks, rollback automation
- **Agent Hooks** - Task notifications, error handling

All configurable with TRUE/FALSE flags.

### 5. Spec-Driven Development

**Others:** Start coding, figure it out as you go **Sidekick:** Define
requirements first with EARS notation

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

Clear, testable, unambiguous requirements that become your implementation
roadmap.

---

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

---

## What's Included

### Core Components

```
.claude/
├── commands/           # /project-planner, /task-planner, /mcp-setup, /hooks-setup, /quick-start
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

### CLI Package

```
cli/
├── bin/create-claude-project.js  # CLI entry point
├── src/
│   ├── index.js                  # Interactive prompts
│   ├── templates.js              # 8 preset configurations
│   ├── scaffold.js               # Project scaffolding
│   └── utils.js                  # Helper functions
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

---

## Documentation

### Getting Started

- [CLI Guide](docs/guides/cli-guide.md) - Instant project creation with CLI
- [Quick Start Guide](docs/guides/quick-start-guide.md) - Preset-based setup
- [Getting Started](docs/guides/getting-started.md) - Complete setup reference
- [Beginner's Guide](docs/guides/beginner-guide.md) - For complete beginners

### Comprehensive Guides

- [Nuxt Full-Stack Walkthrough](docs/guides/nuxt-fullstack-walkthrough.md) -
  Build complete Nuxt app
- [Python FastAPI Walkthrough](docs/guides/python-fastapi-walkthrough.md) -
  Build RESTful API
- [Web3 dApp with Privy](docs/guides/web3-dapp-privy-walkthrough.md) - Build
  decentralized app
- [Troubleshooting](docs/guides/troubleshooting.md) - Solutions for 50+ common
  issues

### Systems Documentation

- [MCP Integration](agent-library/docs/mcp-integration.md) - MCP setup guide
- [Hooks Configuration](.claude/hooks/README.md) - Automation hooks
- [Agent Library](agent-library/README.md) - All available agents

### Advanced

- [Creating Custom Agents](agent-library/templates/README.md)
- [Adding Custom MCPs](.claude/mcp/templates/custom-mcp-guide.md)
- [Building Custom Hooks](.claude/hooks/templates/custom-hook-guide.md)
- [EARS Requirements Notation](docs/ears-guide.md)

### Reference

- [All Available MCPs](.claude/mcp/README.md)
- [All Available Hooks](.claude/hooks/README.md)
- [Code Style Rules](.claude/rules/code-style.md)
- [Accessibility Standards](.claude/rules/accessibility.md)

---

## Use Cases

### Startup MVP Development

- Instant setup with CLI
- Integrated services (database, hosting, analytics, payments)
- Quality built-in (accessibility, security, performance)
- Fast iteration with automated testing and deployment

### Enterprise Applications

- Standardized workflows across all teams
- Compliance built-in (WCAG, security scanning)
- Integration with 35+ pre-configured services
- Automated documentation

### Open Source Projects

- Instant contributor setup with CLI
- Contribution-ready (pre-commit hooks, standards enforcement)
- Auto-generated documentation
- Quality gates and automated testing

### Blockchain Development

- Quick DApp setup with CLI
- Specialized agents for smart contracts and DApp scaffolding
- Automated testing with testnet integration
- Built-in security scanning and auditing

---

## Community & Support

### Contributing

We welcome contributions! Areas where you can help:

- **New Agents** - Add specialized agents to the library
- **MCP Providers** - Add new MCP integrations
- **Hooks** - Create useful automation hooks
- **CLI Presets** - Create new framework presets
- **Documentation** - Improve guides and examples
- **Examples** - Share real-world use cases

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Getting Help

- **CLI Issues** - [CLI Documentation](cli/README.md)
- **General Issues** -
  [GitHub Issues](https://github.com/dylanburkey/claude-code-sidekick/issues)
- **Discussions** -
  [GitHub Discussions](https://github.com/dylanburkey/claude-code-sidekick/discussions)
- **Comprehensive Docs** - All guides in this repo

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## The Bottom Line

**Other AI tools help you write code faster.**

**Claude Code Sidekick helps you build software better.**

- 2-minute setup with professional CLI
- 50+ specialized agents for every task
- 35+ pre-configured integrations
- 32+ automated quality checks
- Complete documentation for non-developers
- Production-ready from day one

**Stop cobbling together tools. Start with a system.**

```bash
npx create-claude-project
```

[Get Started →](docs/guides/cli-guide.md) |
[Browse Agent Library →](agent-library/README.md)

**Built for developers who want more than autocomplete.**
