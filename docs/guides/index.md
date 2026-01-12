# Guides

Comprehensive step-by-step guides for building with Claude Code Sidekick.

## 🚀 Start Here

**New to Claude Code Sidekick?** Choose your path:

| Guide                                     | Time   | Best For                         |
| ----------------------------------------- | ------ | -------------------------------- |
| [Quick Start Guide](quick-start-guide.md) | 2 min  | Use a preset, get building fast  |
| [Beginner's Guide](beginner-guide.md)     | 30 min | First-time users, learn concepts |
| [Getting Started](getting-started.md)     | 5 min  | Quick reference for setup        |

## 📚 Complete Walkthroughs

### Full-Stack Development

| Guide                                                        | Description                                              | Tech Stack                               |
| ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------- |
| [Nuxt Full-Stack Walkthrough](nuxt-fullstack-walkthrough.md) | Build a complete Nuxt 3 app with database and deployment | Nuxt 3, Modern CSS, Vite+, PostgreSQL    |
| [Python FastAPI Walkthrough](python-fastapi-walkthrough.md)  | Build a RESTful API with FastAPI and PostgreSQL          | Python, FastAPI, PostgreSQL, SQLAlchemy  |
| [Web3 dApp with Privy](web3-dapp-privy-walkthrough.md)       | Build a decentralized app with wallet auth and NFTs      | React, Privy, Ethereum/Polygon, Solidity |

**Coming Soon:**

- React + Next.js Full-Stack
- Astro Content Site
- SvelteKit Application

## 📖 Guide Categories

### Setup & Installation

| Guide                                     | Time   | Description                                          |
| ----------------------------------------- | ------ | ---------------------------------------------------- |
| [CLI Guide](cli-guide.md)                 | 2 min  | Create projects instantly with the CLI (recommended) |
| [Getting Started](getting-started.md)     | 5 min  | Initial setup with Quick Start or Custom config      |
| [Quick Start Guide](quick-start-guide.md) | 2 min  | Use presets for instant configuration                |
| [Configuration](configuration.md)         | 10 min | Detailed configuration options                       |

### For Beginners

| Guide                                                        | Time   | Description                                              |
| ------------------------------------------------------------ | ------ | -------------------------------------------------------- |
| [Beginner's Guide](beginner-guide.md)                        | 30 min | Complete introduction with no coding experience required |
| [Nuxt Full-Stack Walkthrough](nuxt-fullstack-walkthrough.md) | 60 min | Build a real application step-by-step                    |
| [Python FastAPI Walkthrough](python-fastapi-walkthrough.md)  | 75 min | Build a Python API from scratch                          |
| [Web3 dApp with Privy](web3-dapp-privy-walkthrough.md)       | 75 min | Build your first Web3 application                        |

### Reference

| Guide                                 | Description                         |
| ------------------------------------- | ----------------------------------- |
| [Troubleshooting](troubleshooting.md) | Common issues and solutions         |
| [Configuration](configuration.md)     | All configuration options explained |

---

## Guide By Goal

### "I want to build a website"

**Static/Marketing Site:**

1. [Quick Start Guide](quick-start-guide.md) → Select "Static Website"
2. Build your site

**Blog/Content Site:**

1. [Quick Start Guide](quick-start-guide.md) → Select "Astro Site"
2. Build your content

### "I want to build a web application"

**Simple App (SPA):**

1. [Quick Start Guide](quick-start-guide.md) → Select "React App" or "Vue/Nuxt"
2. Build your app

**Full-Stack with Database:**

1. Frontend + Backend:
   [Nuxt Full-Stack Walkthrough](nuxt-fullstack-walkthrough.md)
2. API-first: [Python FastAPI Walkthrough](python-fastapi-walkthrough.md)
3. Follow step-by-step

**Web3/Blockchain:**

1. [Web3 dApp with Privy](web3-dapp-privy-walkthrough.md)
2. Deploy your first dApp

### "I've never coded before"

1. [Beginner's Guide](beginner-guide.md) - Start here
2. [Quick Start Guide](quick-start-guide.md) - Use a preset
3. [Troubleshooting](troubleshooting.md) - When you need help

### "I'm an experienced developer"

1. [Quick Start Guide](quick-start-guide.md) - Get configured
2. [Configuration](configuration.md) - Customize everything
3. Start building

---

## Quick Reference

### Essential Commands

```bash
/quick-start      # Apply preset configuration
/project-planner  # Generate project plan
/task-planner     # Generate implementation tasks
/task-runner      # Execute tasks with AI agents
/mcp-setup        # Configure MCP servers
/hooks-setup      # Configure development hooks
```

### Common Tasks

| Task                 | Command                          | Guide                                                                                     |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| Start new project    | `/quick-start`                   | [Quick Start](quick-start-guide.md)                                                       |
| Fix an issue         | Read error, check guide          | [Troubleshooting](troubleshooting.md)                                                     |
| Add a feature        | Describe it, run `/task-planner` | [Beginner's Guide](beginner-guide.md#part-6-common-tasks)                                 |
| Deploy to production | `npm run deploy`                 | [Nuxt Walkthrough](nuxt-fullstack-walkthrough.md#step-11-deploy-to-production-10-minutes) |

---

## Guide Structure

All guides follow a consistent structure:

### Complete Walkthrough Guides

- **Goal**: What you'll build
- **Time**: How long it takes
- **Prerequisites**: What you need
- **Step-by-step instructions**: Detailed, numbered steps
- **Examples**: Real code examples
- **Troubleshooting**: Common issues
- **Next steps**: What to do after

### Reference Guides

- **Overview**: What it covers
- **Quick reference**: Fast lookup
- **Detailed explanations**: Deep dives
- **Examples**: Code samples
- **Links**: Related resources

---

## Contributing a Guide

We welcome contributions! Here's how to add a new guide:

### 1. Choose Guide Type

**Walkthrough Guide** - Step-by-step tutorial

- Use for: Building something specific
- Example: "Building a Blog with Astro"

**Reference Guide** - Detailed documentation

- Use for: Explaining concepts or options
- Example: "MCP Server Configuration"

**Troubleshooting Guide** - Problem solving

- Use for: Common errors and solutions
- Example: "Database Connection Issues"

### 2. Use the Template

```markdown
# Guide Title

> **One sentence describing what this guide does**

## What You'll Learn/Build

- Bullet point 1
- Bullet point 2

## Prerequisites

- What you need before starting

**Time Required:** X minutes

---

## Step 1: First Major Step (X minutes)

### 1.1 Substep

Explanation with code:

\`\`\`bash command example \`\`\`

**What this does:**

- Explanation

### 1.2 Next Substep

...

---

## Troubleshooting

### Common Issue 1

**Error:** Error message

**Solution:** How to fix

---

## Next Steps

- [Related Guide](link.md)
- [Another Guide](link.md)
```

### 3. Guidelines

**Writing Style:**

- Clear and conversational
- Short sentences
- Active voice
- Define technical terms
- Include examples

**Code Samples:**

- Always include context
- Add comments
- Show expected output
- Provide full examples

**Structure:**

- Use numbered steps for sequences
- Use bullets for lists
- Use headers for organization
- Include visual breaks (----)

**For Beginners:**

- Explain every command
- Don't assume knowledge
- Provide context
- Show expected results

**For Experts:**

- Quick reference first
- Details available but optional
- Link to deep dives
- Focus on efficiency

### 4. Add to Index

1. Add your guide to the appropriate section above
2. Include: Title, Time, Description
3. Link to your file
4. Update Quick Reference if applicable

### 5. Submit

1. Create a pull request
2. Include a brief description
3. Link to any related issues
4. Request review

---

## Guide Maintenance

### Updating Guides

When updating an existing guide:

1. **Check accuracy** - Verify all commands work
2. **Update versions** - Ensure framework versions are current
3. **Test examples** - Run all code samples
4. **Fix links** - Ensure all links work
5. **Update screenshots** - If UI changed

### Regular Review

Guides are reviewed:

- When major versions release
- When features change
- When users report issues
- Quarterly for freshness

---

## Need Help?

**Can't find what you're looking for?**

1. Check [Troubleshooting](troubleshooting.md)
2. Search
   [GitHub Issues](https://github.com/dylanburkey/claude-code-sidekick/issues)
3. Ask Claude Code directly
4. Open a new issue

**Want a guide for something specific?**

[Request a guide →](https://github.com/dylanburkey/claude-code-sidekick/issues/new?template=guide-request.md)

---

**Happy building!** 🚀
