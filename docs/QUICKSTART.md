# Claude Code Sidekick - Quick Start

Get up and running in under 5 minutes.

---

## Choose Your Path

### 🆕 Starting a New Project?

```bash
npx create-claude-project
```

Follow the prompts. Done.

---

### 📁 Have an Existing Project?

```bash
# 1. Clone sidekick
git clone https://github.com/dylanburkey/claude-code-sidekick.git

# 2. Copy the .claude folder to your project
cp -r claude-code-sidekick/.claude/ /path/to/your-project/

# 3. Open your project in Claude Code and run:
/quick-start
```

---

### 🤖 Just Want Multi-Model AI Tools?

```bash
# 1. Clone and install
git clone https://github.com/dylanburkey/claude-code-sidekick.git
cd claude-code-sidekick/tools/multi-model
pnpm install

# 2. Add at least one API key to .env
echo "ANTHROPIC_API_KEY=sk-ant-your-key" >> ../../.env

# 3. Review code
pnpm review -- /path/to/your/file.js
```

---

## What Can I Do Now?

### In Claude Code (with .claude/ set up):

| Command            | What it does                          |
| ------------------ | ------------------------------------- |
| `/quick-start`     | Guided setup wizard                   |
| `/project-planner` | Create a phased project plan          |
| `/task-planner`    | Break features into tasks             |
| `/mcp-setup`       | Add database, cloud, API integrations |
| `/hooks-setup`     | Add automated quality checks          |
| `/status`          | See project progress                  |

### Multi-Model Tools:

| Command                  | What it does               |
| ------------------------ | -------------------------- |
| `pnpm review -- <file>`  | AI code review (consensus) |
| `pnpm index -- <dir>`    | Index codebase for search  |
| `pnpm search -- "query"` | Semantic code search       |

---

## Common First Steps

### After creating a new project:

```bash
cd your-project
npm install
npm run dev

# Then in Claude Code:
/project-planner   # Plan your features
```

### After adding to existing project:

```bash
# In Claude Code:
/mcp-setup         # Add integrations (database, auth, etc.)
/hooks-setup       # Add quality automation
```

### For code review:

```bash
cd tools/multi-model
pnpm review -- ../src/critical-file.js --deep
```

---

## Need More Help?

- [Full README](../README.md)
- [CLI Documentation](guides/cli-guide.md)
- [Beginner's Guide](guides/beginner-guide.md)
- [Troubleshooting](guides/troubleshooting.md)

---

## Minimum Requirements

- Node.js 18+
- Claude Code (Anthropic's CLI)
- At least one API key for multi-model tools (optional)
