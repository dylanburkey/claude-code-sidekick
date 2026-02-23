# Claude Code Sidekick - Examples & Walkthrough

> Visual guide showing how the system works in practice.

---

## Quick Overview

Claude Code Sidekick transforms project development from "figure it out" to
"follow the system."

```
┌─────────────────────────────────────────────────────────────────────┐
│                    THE SIDEKICK WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   1. CREATE          2. PLAN           3. TASK           4. BUILD  │
│   ─────────          ──────            ──────            ───────   │
│   npx create-        /project-         /task-            /task-    │
│   claude-project     planner           planner           runner    │
│                                                                     │
│   ┌─────────┐       ┌─────────┐       ┌─────────┐       ┌────────┐│
│   │ .claude │ ───▶  │ phase_  │ ───▶  │ tasks/  │ ───▶  │ CODE!  ││
│   │ folder  │       │ 1.md    │       │ *.md    │       │        ││
│   └─────────┘       └─────────┘       └─────────┘       └────────┘│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Example 1: Creating a New Project

### Terminal: Running the CLI

```bash
$ npx create-claude-project

   ╭──────────────────────────────────────────╮
   │                                          │
   │   🚀 Create Claude Project               │
   │      AI-Powered Project Generator        │
   │                                          │
   ╰──────────────────────────────────────────╯

? Project name: › my-saas-app
? Select a preset: ›
  ○ Static Website - Landing pages, marketing sites
  ○ Astro Site - Content-heavy sites, blogs
  ● Next.js App - Full-stack React framework
  ○ Vue/Nuxt - Full-stack Vue framework
  ○ SvelteKit - Modern reactive framework
  ○ Full Stack - Backend + Frontend

? Select features:
  ◉ Database (Neon PostgreSQL + Prisma)
  ◉ Authentication (NextAuth.js)
  ◉ Analytics (Sentry)
  ◉ Deployment (Vercel)

✔ Creating project structure...
✔ Copying Claude Code Sidekick files...
✔ Installing dependencies...
✔ Initializing git repository...

🎉 Project created successfully!

  cd my-saas-app
  npm run dev

Next steps:
  1. Edit PROJECT_STARTER.md with your requirements
  2. Run /project-planner in Claude Code
  3. Run /task-planner to generate tasks
  4. Run /task-runner to build!
```

### Result: Project Structure

```
my-saas-app/
├── .claude/                    # 🧠 The brain of the operation
│   ├── agents/                 # Specialized AI agents
│   │   ├── dev-agent.yml       # Development tasks
│   │   ├── test-agent.yml      # Testing tasks
│   │   └── docs-agent.yml      # Documentation
│   ├── commands/               # Slash commands
│   │   ├── project-planner.md  # /project-planner
│   │   ├── task-planner.md     # /task-planner
│   │   └── task-runner.md      # /task-runner
│   ├── hooks/                  # Automation triggers
│   │   ├── pre-commit.yml      # Before commits
│   │   └── post-save-docs.yml  # After saving
│   ├── mcp/                    # MCP integrations
│   │   └── providers/          # 35+ pre-configured
│   └── rules/                  # Code standards
│       ├── code-style.md
│       └── accessibility.md
├── PROJECT_STARTER.md          # 📋 YOUR requirements go here
├── CLAUDE.md                   # AI context document
└── package.json
```

---

## Example 2: The PROJECT_STARTER.md File

This is where you define what you're building. The AI reads this to understand
your project.

```markdown
# Project Starter Template

## Project Information

### Project Name

TaskFlow - Team Task Management

### Project Description

A Kanban-style task management app for small teams. Users can create boards, add
tasks, assign team members, and track progress with drag-and-drop.

### Project Type

web-app

---

## Goals & Objectives

### Primary Goal

Create a fast, accessible task management tool that works offline-first and
syncs when connected.

### Success Criteria

- Sub-100ms interactions
- Works offline (PWA)
- WCAG 2.1 AA compliant
- Real-time collaboration

---

## Requirements (EARS Notation)

### Functional Requirements

1. WHEN user creates a board THE SYSTEM SHALL generate a unique shareable link
2. WHEN user drags a task THE SYSTEM SHALL update position in real-time
3. WHILE offline THE SYSTEM SHALL queue changes and sync when connected
4. IF sync conflict occurs THEN THE SYSTEM SHALL show resolution UI

### Non-Functional Requirements

- Performance: First contentful paint < 1.5s
- Accessibility: Keyboard navigation for all actions
- Security: Row-level security on all data
```

---

## Example 3: Running /project-planner

### Terminal: Planning Phase

```bash
# In Claude Code terminal
> /project-planner

📋 Reading PROJECT_STARTER.md...
✓ Parsed project requirements
✓ Identified 4 functional requirements
✓ Identified 3 non-functional requirements

🔍 Analyzing project...

┌────────────────────────────────────────┐
│ COMPLEXITY ASSESSMENT                  │
├────────────────────────────────────────┤
│ Overall: MEDIUM-HIGH                   │
│                                        │
│ Key Challenges:                        │
│ • Real-time sync with offline support  │
│ • Drag-and-drop accessibility          │
│ • Conflict resolution UI               │
└────────────────────────────────────────┘

📁 Creating project-plan/phase_1.md...
✓ Phase 1: Foundation (5 tasks)
✓ Phase 2: Core Features (8 tasks)
✓ Phase 3: Real-time & Offline (6 tasks)
✓ Phase 4: Polish & Deploy (4 tasks)

✅ Project plan created!

Next: Run /task-planner to generate implementation tasks
```

### Output: project-plan/phase_1.md

```markdown
# Phase 1: Foundation

Generated: 2026-02-21T14:30:00Z Source: PROJECT_STARTER.md

## Project Summary

### Overview

TaskFlow is a Kanban-style task management application targeting small teams.
The app prioritizes performance, accessibility, and offline-first architecture.

### Goals

- Fast, responsive drag-and-drop interface
- Offline-first with background sync
- Real-time collaboration between team members
- WCAG 2.1 AA compliance

## Analysis

### Complexity Assessment

- **Overall Complexity:** Medium-High
- **Key Challenges:**
  - Real-time sync with offline support requires careful state management
  - Drag-and-drop must be fully keyboard accessible
  - Conflict resolution needs clear, non-disruptive UI

### Dependencies

- **External:** Supabase (auth + realtime), Service Worker API
- **Internal:** State → UI → Sync pipeline

## Phase 1 Scope

### Objectives

1. Set up project structure with Next.js 15
2. Configure Supabase connection
3. Create base component library
4. Implement design tokens and CSS architecture
5. Set up testing framework

### Deliverables

- [ ] Working dev environment
- [ ] Base layout components
- [ ] Design system foundation
- [ ] Database schema
- [ ] CI/CD pipeline

## Technical Approach

### Architecture
```

┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ Next.js │────▶│ Supabase
│────▶│ Postgres │ │ (React) │ │ (Realtime) │ │ (D1) │ └─────────────┘
└─────────────┘ └─────────────┘ │ ▼ ┌─────────────┐ │ Service │ │ Worker │
└─────────────┘

```

### Technology Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Supabase (auth, realtime, storage)
- Modern CSS (layers, custom properties)
- Vitest + Playwright

## Criteria for Completion

- [ ] `npm run dev` starts without errors
- [ ] All base components render correctly
- [ ] Database migrations applied
- [ ] Tests pass
- [ ] Lighthouse accessibility score > 90
```

---

## Example 4: Running /task-planner

### Terminal: Task Generation

```bash
> /task-planner

📖 Reading project-plan/phase_1.md...
✓ Found 5 objectives
✓ Found 5 deliverables

🔨 Generating tasks...

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1 TASKS                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ TASK-001 [init] Project Setup                     ~30 min      │
│ ├── Create Next.js project                                     │
│ ├── Configure TypeScript                                       │
│ └── Set up folder structure                                    │
│                                                                 │
│ TASK-002 [init] Database Setup                    ~45 min      │
│ ├── Configure Supabase client                                  │
│ ├── Create initial migrations                                  │
│ └── Set up row-level security                                  │
│                                                                 │
│ TASK-003 [dev] Design System                      ~60 min      │
│ ├── Create CSS custom properties                               │
│ ├── Build base components                                      │
│ └── Document component usage                                   │
│                                                                 │
│ TASK-004 [dev] Layout Components                  ~45 min      │
│ ├── Header, Sidebar, Main layout                               │
│ ├── Responsive breakpoints                                     │
│ └── Accessibility landmarks                                    │
│                                                                 │
│ TASK-005 [test] Testing Setup                     ~30 min      │
│ ├── Configure Vitest                                           │
│ ├── Configure Playwright                                       │
│ └── Add example tests                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

📁 Created tasks/phase-1-tasks.md
✅ 5 tasks generated

Next: Run /task-runner to execute tasks
```

### Output: tasks/phase-1-tasks.md

````markdown
# Phase 1 Tasks

Generated: 2026-02-21T14:35:00Z Source: project-plan/phase_1.md

## Task Overview

| ID       | Agent | Task              | Est. Time | Dependencies |
| -------- | ----- | ----------------- | --------- | ------------ |
| TASK-001 | init  | Project Setup     | 30 min    | None         |
| TASK-002 | init  | Database Setup    | 45 min    | TASK-001     |
| TASK-003 | dev   | Design System     | 60 min    | TASK-001     |
| TASK-004 | dev   | Layout Components | 45 min    | TASK-003     |
| TASK-005 | test  | Testing Setup     | 30 min    | TASK-001     |

---

## TASK-001: Project Setup

**Agent:** init **Priority:** Critical **Estimated Time:** 30 minutes

### Description

Initialize the Next.js 15 project with TypeScript and establish the foundational
folder structure.

### Acceptance Criteria

- [ ] Next.js 15 project created with App Router
- [ ] TypeScript configured in strict mode
- [ ] ESLint and Prettier configured
- [ ] Folder structure matches steering/structure.md

### Implementation Notes

```bash
npx create-next-app@latest taskflow --typescript --app --tailwind=false
```
````

### Files to Create

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/lib/utils.ts`
- `.env.local.example`

---

## TASK-002: Database Setup

...

````

---

## Example 5: Running /task-runner

### Terminal: Execution

```bash
> /task-runner

🤖 Loading agents...
✓ init-agent ready
✓ dev-agent ready
✓ test-agent ready

📋 Reading tasks/phase-1-tasks.md...
✓ Found 5 tasks

🚀 Executing Phase 1...

┌──────────────────────────────────────────────────────────────────┐
│ TASK-001: Project Setup                              [init]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating Next.js project...                                   │
│ ▶ Configuring TypeScript strict mode...                         │
│ ▶ Setting up folder structure...                                │
│ ▶ Adding ESLint configuration...                                │
│ ✅ COMPLETE (2m 15s)                                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ TASK-002: Database Setup                             [init]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Installing Supabase client...                                 │
│ ▶ Creating migration files...                                   │
│ ▶ Configuring row-level security...                             │
│ ✅ COMPLETE (3m 42s)                                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ TASK-003: Design System                              [dev]      │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating CSS custom properties...                             │
│ ▶ Building Button component...                                  │
│ ▶ Building Card component...                                    │
│ ▶ Building Input component...                                   │
│ ▶ Documenting component API...                                  │
│ ✅ COMPLETE (5m 18s)                                            │
└──────────────────────────────────────────────────────────────────┘

... (TASK-004, TASK-005) ...

═══════════════════════════════════════════════════════════════════
                    ⛔ PHASE 1 COMPLETE
═══════════════════════════════════════════════════════════════════

Summary:
  ✅ 5/5 tasks completed
  ⏱  Total time: 14m 23s
  📁 23 files created
  🧪 12 tests passing

To continue to Phase 2:
  1. Review the completed work
  2. Run: /task-planner phase=2
  3. Run: /task-runner phase=2

The system will NOT auto-advance. You control the pace.
````

---

## Key Files Explained

### .claude/config.yml - Main Configuration

```yaml
# Controls the entire system
project:
  name: 'TaskFlow'
  version: '1.0.0'

# Agent system
agents:
  enabled: true
  directory: '.claude/agents'

# Phase execution control (CRITICAL)
execution:
  phase_limit: 1 # Only execute this phase
  auto_advance: false # NEVER auto-advance
  require_confirmation: true # User must approve each phase

# MCP servers
mcp:
  required:
    - name: 'serena'
      description: 'Code analysis'
    - name: 'context7'
      description: 'Documentation lookup'
```

### .claude/agents/dev-agent.yml - Agent Definition

```yaml
name: dev
role: Development Agent
description: Handles code implementation and feature building

capabilities:
  - Write production code
  - Implement features from specs
  - Refactor existing code
  - Fix bugs

constraints:
  - Follow steering/tech.md standards
  - Ensure WCAG 2.1 AA compliance
  - Write tests for new code
  - Update documentation

tools:
  - file_read
  - file_write
  - terminal
  - browser
```

### .claude/rules/code-style.md - Standards

```markdown
# Code Style Rules

## HTML

- Semantic elements over divs
- ARIA labels on interactive elements
- No inline styles

## CSS

- Custom properties for theming
- CSS layers for organization
- Mobile-first responsive design
- No utility-first frameworks

## JavaScript

- TypeScript in strict mode
- Native APIs over libraries
- Progressive enhancement
```

---

## MCP Integration Example

### Configuring Neon Database

```markdown
<!-- In PROJECT_STARTER.md -->

## MCP Configuration

- **Neon Database**: `TRUE`
- **Cloudflare**: `TRUE`
- **GitHub**: `TRUE`
```

### Running /mcp-setup

```bash
> /mcp-setup

🔌 Configuring MCP servers...

┌─────────────────────────────────────────┐
│ NEON DATABASE                           │
├─────────────────────────────────────────┤
│ Status: Configuring...                  │
│                                         │
│ ✓ Added to mcp.json                     │
│ ✓ Created .env.example entry            │
│ ✓ Generated Prisma schema               │
│                                         │
│ Required env vars:                      │
│   NEON_DATABASE_URL=                    │
│   NEON_API_KEY=                         │
└─────────────────────────────────────────┘

✅ 3 MCP servers configured
📄 Updated .env.example with required variables
```

---

## The Complete Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  YOU                    SIDEKICK                    OUTPUT             │
│  ───                    ────────                    ──────             │
│                                                                        │
│  Fill out               /project-planner            project-plan/      │
│  PROJECT_STARTER.md     ─────────────▶              phase_1.md         │
│                                                                        │
│                         /task-planner               tasks/             │
│  Review plan            ─────────────▶              phase-1-tasks.md   │
│                                                                        │
│                         /task-runner                                   │
│  Approve tasks          ─────────────▶              WORKING CODE!      │
│                                                                        │
│  ⛔ PHASE BOUNDARY ─────────────────────────────────────────────────   │
│                                                                        │
│  Review work            /task-planner phase=2       Continue...        │
│  ─────────────▶                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

| Component              | Purpose               | Location                    |
| ---------------------- | --------------------- | --------------------------- |
| **CLI**                | Creates new projects  | `npx create-claude-project` |
| **PROJECT_STARTER.md** | Your requirements     | Project root                |
| **CLAUDE.md**          | AI context            | Project root                |
| **.claude/config.yml** | System configuration  | `.claude/`                  |
| **.claude/commands/**  | Slash commands        | `.claude/commands/`         |
| **.claude/agents/**    | Specialized AI agents | `.claude/agents/`           |
| **.claude/hooks/**     | Automation triggers   | `.claude/hooks/`            |
| **.claude/mcp/**       | MCP integrations      | `.claude/mcp/`              |
| **.claude/rules/**     | Code standards        | `.claude/rules/`            |

**Start here:** `npx create-claude-project`

---

_Built for developers who want more than autocomplete._
