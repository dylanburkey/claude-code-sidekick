# Getting Started with Claude Code Sidekick

This guide helps you pick the right path based on what you're trying to do.

---

## What Are You Trying To Do?

### 🆕 "I'm starting a new project from scratch"

**Use the CLI** - It's the fastest way to get a production-ready project.

```bash
npx create-claude-project
```

The CLI will:

1. Ask you what kind of project (React, Next.js, Astro, etc.)
2. Ask what features you need (database, auth, payments, etc.)
3. Scaffold everything with Claude Code Sidekick pre-configured

**Time:** 2 minutes

[→ Detailed CLI Guide](cli-guide.md)

---

### 📂 "I have an existing project and want to add Sidekick"

**Copy the .claude directory** to your project.

```bash
# Clone the repo
git clone https://github.com/dylanburkey/claude-code-sidekick.git

# Copy .claude to your project
cp -r claude-code-sidekick/.claude/ /path/to/your-project/
```

Then open your project in Claude Code and run:

```bash
/quick-start
```

This will guide you through configuring Sidekick for your existing codebase.

**Time:** 5 minutes

---

### 🔍 "I just want the multi-model AI code review tools"

You don't need the full framework - just the `tools/multi-model/` directory.

```bash
# Clone and set up
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick/tools/multi-model
pnpm install

# Add your API key(s) to .env in the repo root
echo "ANTHROPIC_API_KEY=sk-ant-your-key" >> ../../.env

# Review code
pnpm review -- /path/to/any/file.js
```

[→ Multi-Model Toolkit Guide](../tools/multi-model/README.md)

**Time:** 3 minutes

---

### 📖 "I'm new to all of this and need a full explanation"

Start with the Beginner's Guide, which explains every concept step by step.

[→ Complete Beginner's Guide](beginner-guide.md)

**Time:** 30 minutes (worth it if you're new)

---

## Quick Overview: What Does Sidekick Include?

| Component             | What It Does                                 | Location             |
| --------------------- | -------------------------------------------- | -------------------- |
| **Commands**          | Claude Code commands like `/project-planner` | `.claude/commands/`  |
| **Agents**            | 50+ specialized AI assistants                | `.claude/agents/`    |
| **Hooks**             | 32+ automated quality checks                 | `.claude/hooks/`     |
| **MCP Integrations**  | 35+ pre-configured services                  | `.claude/mcp/`       |
| **Multi-Model Tools** | Use Claude + GPT + Gemini together           | `tools/multi-model/` |
| **Examples**          | Working starter projects                     | `examples/`          |

---

## After Setup: What Commands Can I Use?

Once you have `.claude/` in your project, these commands are available in Claude
Code:

| Command            | What It Does                                        |
| ------------------ | --------------------------------------------------- |
| `/quick-start`     | Guided setup wizard                                 |
| `/project-planner` | Create a phased project plan from your requirements |
| `/task-planner`    | Break a feature into actionable tasks               |
| `/task-runner`     | Execute tasks with specialized agents               |
| `/mcp-setup`       | Configure external services (databases, APIs, etc.) |
| `/hooks-setup`     | Set up automated quality checks                     |
| `/status`          | Check project progress                              |
| `/analyze-project` | Analyze existing codebase                           |

---

## Typical First-Day Workflow

### For a new project:

```bash
# 1. Create project
npx create-claude-project

# 2. Start dev server
cd my-project
npm install
npm run dev

# 3. In Claude Code, plan your work
/project-planner
# → Creates phases with milestones

# 4. Start building
/task-planner
# → Breaks first feature into tasks
```

### For an existing project:

```bash
# 1. Add Sidekick
cp -r claude-code-sidekick/.claude/ ./

# 2. Configure
/quick-start
# → Select your tech stack and features

# 3. Set up integrations
/mcp-setup
# → Select: database, auth, hosting, etc.

# 4. Set up automation
/hooks-setup
# → Enable: pre-commit checks, formatting, etc.
```

---

## Common Questions

### "Do I need all the API keys?"

No. For the multi-model tools, you only need ONE of:

- `ANTHROPIC_API_KEY` (Claude)
- `OPENAI_API_KEY` (GPT)
- `GEMINI_API_KEY` (Gemini)
- `VENICE_API_KEY` (Venice AI)

The toolkit auto-detects what's available and works with whatever you have.

### "Can I use Sidekick with Cursor/Copilot?"

Yes! They complement each other:

- **Cursor/Copilot:** Inline code suggestions
- **Sidekick:** Project structure, automation, multi-model tools

### "What if I don't want all the features?"

The `.claude/config.yml` lets you disable anything:

```yaml
features:
  mcp: false # Disable MCP integrations
  hooks: false # Disable automation hooks
  agents: false # Disable specialized agents
```

Or just delete the folders you don't need.

---

## Next Steps

- [CLI Guide](cli-guide.md) - Full CLI documentation
- [Configuration Guide](configuration.md) - Customize everything
- [Troubleshooting](troubleshooting.md) - Common issues and fixes
- [Multi-Model Tools](../../tools/multi-model/README.md) - AI toolkit docs
