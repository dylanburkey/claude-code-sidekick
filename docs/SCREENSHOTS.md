# Screenshot Guide

> Reference for creating terminal screenshots and visuals for documentation.

---

## Recommended Screenshots

### 1. CLI Creation (Hero Shot)

```bash
npx create-claude-project my-app
```

**Capture:**
- The interactive prompts
- Preset selection menu
- Feature checkboxes
- Success message

**Tool:** [asciinema](https://asciinema.org/) or [terminalizer](https://terminalizer.com/)

---

### 2. Project Structure

```bash
tree -L 2 -a --dirsfirst my-app
```

**Shows:**
- `.claude/` directory
- Key configuration files
- Clean, organized structure

---

### 3. Workflow Commands

**Screenshot 1: /project-planner**
```
📋 Reading PROJECT_STARTER.md...
✓ Parsed project requirements
🔍 Analyzing project...
📁 Creating project-plan/phase_1.md...
✅ Project plan created!
```

**Screenshot 2: /task-planner**
```
📖 Reading project-plan/phase_1.md...
🔨 Generating tasks...
┌─────────────────────────────────────┐
│ PHASE 1 TASKS                       │
├─────────────────────────────────────┤
│ TASK-001 [init] Project Setup       │
│ TASK-002 [init] Database Setup      │
│ TASK-003 [dev] Design System        │
└─────────────────────────────────────┘
```

**Screenshot 3: /task-runner**
```
🚀 Executing Phase 1...
┌──────────────────────────────────────┐
│ TASK-001: Project Setup    [init]   │
├──────────────────────────────────────┤
│ ▶ Creating Next.js project...       │
│ ✅ COMPLETE                          │
└──────────────────────────────────────┘
```

---

### 4. MCP Setup

```
> /mcp-setup

🔌 Configuring MCP servers...
┌───────────────────────────────────┐
│ NEON DATABASE ✓                   │
│ CLOUDFLARE ✓                      │
│ GITHUB ✓                          │
└───────────────────────────────────┘
```

---

## ASCII Diagrams for README

### Workflow Diagram

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   PROJECT_   │    │  /project-   │    │   /task-     │    │   /task-     │
│  STARTER.md  │───▶│   planner    │───▶│   planner    │───▶│   runner     │
│              │    │              │    │              │    │              │
│  Your reqs   │    │  Analysis    │    │  Task list   │    │  Execution   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### Agent System

```
                    ┌─────────────────┐
                    │  ORCHESTRATOR   │
                    │     Agent       │
                    └────────┬────────┘
                             │
         ┌───────────┬───────┴───────┬───────────┐
         ▼           ▼               ▼           ▼
    ┌─────────┐ ┌─────────┐    ┌─────────┐ ┌─────────┐
    │  INIT   │ │   DEV   │    │  TEST   │ │  DOCS   │
    │  Agent  │ │  Agent  │    │  Agent  │ │  Agent  │
    └─────────┘ └─────────┘    └─────────┘ └─────────┘
```

### MCP Integration

```
┌─────────────────────────────────────────────────────────────┐
│                     MCP PROVIDERS (35+)                     │
├──────────────┬──────────────┬──────────────┬───────────────┤
│  DATABASES   │    CLOUD     │     DEV      │   PAYMENTS    │
├──────────────┼──────────────┼──────────────┼───────────────┤
│ • Neon       │ • Cloudflare │ • GitHub     │ • Stripe      │
│ • Supabase   │ • AWS        │ • GitLab     │ • PayPal      │
│ • Turso      │ • Vercel     │ • Linear     │ • Shopify     │
│ • Pinecone   │ • Railway    │ • Sentry     │               │
└──────────────┴──────────────┴──────────────┴───────────────┘
```

---

## Terminal Recording Tools

### asciinema (Recommended)

```bash
# Install
brew install asciinema

# Record
asciinema rec demo.cast

# Upload
asciinema upload demo.cast

# Embed in README
[![asciicast](https://asciinema.org/a/XXXXX.svg)](https://asciinema.org/a/XXXXX)
```

### terminalizer

```bash
# Install
npm install -g terminalizer

# Record
terminalizer record demo

# Render to GIF
terminalizer render demo

# Use in README
![Demo](./demo.gif)
```

### VHS (by Charm)

```bash
# Install
brew install vhs

# Create tape file
cat > demo.tape << 'EOF'
Output demo.gif
Set FontSize 14
Set Width 800
Set Height 400

Type "npx create-claude-project my-app"
Enter
Sleep 2s
EOF

# Run
vhs demo.tape
```

---

## Color Palette for Graphics

| Element | Color | Hex |
|---------|-------|-----|
| Success | Green | `#10B981` |
| In Progress | Blue | `#3B82F6` |
| Warning | Yellow | `#F59E0B` |
| Error | Red | `#EF4444` |
| Background | Dark | `#1E1E2E` |
| Text | Light | `#CDD6F4` |

---

## Social Card Specs

**Dimensions:** 1200 x 630px (2:1 ratio)

**Existing cards:**
- `public/social-card.png` - Main
- `public/social-card-v2.png` - Overview
- `public/social-card-v3.png` - CLI
- `public/social-card-v4.png` - Features

---

## Badge Ideas

```markdown
![Claude Code](https://img.shields.io/badge/Claude-Code-blueviolet)
![Agents](https://img.shields.io/badge/Agents-50+-green)
![MCPs](https://img.shields.io/badge/MCPs-35+-blue)
![Hooks](https://img.shields.io/badge/Hooks-32+-orange)
```

Renders as:

![Claude Code](https://img.shields.io/badge/Claude-Code-blueviolet) ![Agents](https://img.shields.io/badge/Agents-50+-green) ![MCPs](https://img.shields.io/badge/MCPs-35+-blue) ![Hooks](https://img.shields.io/badge/Hooks-32+-orange)
