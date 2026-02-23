# Getting Started Tutorial

> A complete walkthrough of building a project with Claude Code Sidekick

This guide walks you through the entire Claude Code Sidekick workflow from start
to finish. By the end, you'll understand how to use each command and agent to
build production-ready projects.

---

## Overview: The Sidekick Workflow

Claude Code Sidekick follows a structured, 4-step workflow:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. PROJECT_STARTER.md    →  Define what you're building       │
│              ↓                                                  │
│   2. /project-planner      →  Generate a project plan           │
│              ↓                                                  │
│   3. /task-planner         →  Break plan into tasks             │
│              ↓                                                  │
│   4. /task-runner          →  Execute tasks with dev agent      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Each step builds on the previous one. This structure ensures:

- Clear requirements before coding starts
- Organized phases and milestones
- Trackable tasks with progress
- Consistent, quality code output

---

## Step 1: Fill Out PROJECT_STARTER.md

The `PROJECT_STARTER.md` file is your project's blueprint. It tells Claude
exactly what you want to build.

### Open the File

```bash
# Navigate to your project
cd my-project

# Open PROJECT_STARTER.md in your editor
code PROJECT_STARTER.md   # VS Code
# or
open PROJECT_STARTER.md   # macOS default
```

### Fill In Each Section

Here's what each section means:

#### Project Information

```markdown
## Project Information

### Project Name

My Awesome Blog

### Project Description

A personal blog with dark theme, SEO optimization, and a content management
system for markdown posts.

### Project Type

web-app
```

**Tips:**

- Be specific in the description
- Mention key features you want
- Project type helps Claude choose the right tools

#### Goals & Objectives

```markdown
## Goals & Objectives

### Primary Goal

Create a fast, SEO-optimized blog that ranks well in search engines and provides
an excellent reading experience.

### Success Criteria

- Lighthouse score above 95
- All pages have meta tags and structured data
- Mobile responsive design
- Blog post pages with proper heading hierarchy

### Non-Goals

- User authentication (this is a static site)
- Comments system (will add later)
- E-commerce features
```

**Tips:**

- Non-goals are important! They prevent scope creep
- Success criteria should be measurable

#### Requirements (EARS Notation)

EARS notation makes requirements clear and testable:

```markdown
## Requirements

### Functional Requirements

1. WHEN user visits homepage THE SYSTEM SHALL display recent posts
2. WHEN user clicks a post THE SYSTEM SHALL navigate to the post page
3. THE SYSTEM SHALL generate an RSS feed at /feed.xml
4. WHILE page is loading THE SYSTEM SHALL show a loading indicator

### Non-Functional Requirements

- Load time under 2 seconds on 3G
- WCAG 2.1 AA accessible
- Works without JavaScript enabled
```

**EARS Keywords:** | Keyword | Meaning | Example |
|---------|---------|---------| | WHEN | Triggered by event | WHEN user
clicks... | | THE SYSTEM SHALL | Required behavior | ...SHALL show menu | |
WHILE | During a state | WHILE loading... | | WHERE | Specific conditions |
WHERE user is admin... |

#### Technical Stack

```markdown
## Technical Stack

- Framework: Astro 5
- Styling: Modern CSS (no framework)
- Content: Markdown with frontmatter
- Deployment: Vercel
```

### Save and Continue

Once filled out, save the file. You're ready for step 2.

---

## Step 2: Run /project-planner

The `/project-planner` command reads your PROJECT_STARTER.md and generates a
structured project plan.

### Run the Command

In Claude Code (Terminal or VS Code), type:

```
/project-planner
```

### What Happens

Claude will:

1. Read your PROJECT_STARTER.md
2. Analyze the requirements
3. Break the project into phases
4. Create a detailed plan

### Output Location

The plan is saved to:

```
.claude/project-plan/phase_1.md
```

### Example Output

```markdown
# Phase 1: Core Blog Setup

## Objectives

1. Project scaffolding with Astro
2. Base layout and navigation
3. Blog post collection setup
4. Homepage with post listing
5. Individual post pages

## Deliverables

- [ ] package.json with dependencies
- [ ] src/layouts/BaseLayout.astro
- [ ] src/components/Nav.astro
- [ ] src/pages/index.astro
- [ ] src/pages/blog/[slug].astro
- [ ] src/content/config.ts

## Technical Approach

- Use Astro content collections for posts
- CSS custom properties for theming
- Mobile-first responsive design
```

### Review the Plan

Read through the generated plan. If something's wrong:

- Edit `.claude/project-plan/phase_1.md` directly
- Or update PROJECT_STARTER.md and re-run

---

## Step 3: Run /task-planner

The `/task-planner` command converts the project plan into actionable tasks.

### Run the Command

```
/task-planner
```

### What Happens

Claude will:

1. Read the project plan (phase_1.md)
2. Break each objective into tasks
3. Estimate time for each task
4. Assign appropriate agents

### Output Location

Tasks are saved to:

```
.claude/tasks/phase-1-tasks.md
```

### Example Output

```markdown
# Phase 1 Tasks

| ID       | Agent | Task                     | Est.   | Status |
| -------- | ----- | ------------------------ | ------ | ------ |
| TASK-001 | init  | Project scaffolding      | 5 min  | ⬜     |
| TASK-002 | dev   | Create BaseLayout.astro  | 15 min | ⬜     |
| TASK-003 | dev   | Create Nav component     | 10 min | ⬜     |
| TASK-004 | dev   | Setup content collection | 10 min | ⬜     |
| TASK-005 | dev   | Create homepage          | 20 min | ⬜     |
| TASK-006 | dev   | Create blog post page    | 25 min | ⬜     |

---

## TASK-001: Project Scaffolding

**Agent:** init **Estimated Time:** 5 minutes

### Instructions

1. Initialize Astro project
2. Add TypeScript configuration
3. Create folder structure

### Acceptance Criteria

- [ ] package.json exists
- [ ] tsconfig.json configured
- [ ] src/ directory structure created
```

### Task Agents

Each task is assigned an agent:

| Agent  | Purpose                     |
| ------ | --------------------------- |
| init   | Project setup, dependencies |
| dev    | Feature development, code   |
| test   | Testing, validation         |
| docs   | Documentation               |
| review | Code review, refactoring    |

---

## Step 4: Run /task-runner

The `/task-runner` command executes tasks one by one using the appropriate
agent.

### Run the Command

```
/task-runner
```

### What Happens

Claude will:

1. Find the first incomplete task
2. Load the assigned agent
3. Execute the task
4. Mark it complete
5. Move to the next task

### Interactive Mode

During execution, you may see:

```
┌──────────────────────────────────────────────────────────────────┐
│ TASK-003: Create Nav Component                        [dev]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating src/components/Nav.astro...                          │
│ ▶ Adding navigation links...                                    │
│ ▶ Styling with CSS...                                           │
│ ✅ COMPLETE                                                      │
│                                                                  │
│ Continue to next task? [Y/n]                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Fixing Errors

If a task produces broken code:

1. **Stop the runner** (Ctrl+C or answer 'n')
2. **Ask Claude to fix it:**
   ```
   The Nav component has a TypeScript error. Can you fix it?
   ```
3. **Resume:**
   ```
   /task-runner
   ```

### Manual Fixes

You can also:

- Edit files directly in your editor
- Mark tasks complete manually in the tasks file
- Skip tasks by marking them as "skipped"

---

## Complete Example: Building an SSG Blog

Let's walk through a real example.

### 1. Create Project

```bash
npx create-claude-project my-blog --preset=astro
cd my-blog
```

### 2. Edit PROJECT_STARTER.md

```markdown
## Project Information

### Project Name

Developer Blog

### Project Description

A technical blog for sharing programming tutorials. Dark theme with syntax
highlighting.

### Project Type

static-site

## Goals & Objectives

### Primary Goal

Create a fast, beautiful blog with excellent SEO.

### Success Criteria

- Lighthouse 95+ on all pages
- Blog posts with code syntax highlighting
- RSS feed
- Sitemap

### Non-Goals

- User accounts
- Comments
- Newsletter signup

## Requirements

### Functional

1. WHEN user visits / THE SYSTEM SHALL show latest 5 posts
2. WHEN user visits /blog THE SYSTEM SHALL show all posts
3. WHEN user visits /blog/[slug] THE SYSTEM SHALL show post content
4. THE SYSTEM SHALL generate sitemap.xml
5. THE SYSTEM SHALL generate feed.xml

### Non-Functional

- Dark theme with purple accents
- Mobile responsive
- WCAG 2.1 AA compliant
```

### 3. Run Workflow

```bash
# Open Claude Code
claude

# Generate plan
/project-planner

# Review plan (optional)
cat .claude/project-plan/phase_1.md

# Generate tasks
/task-planner

# Execute tasks
/task-runner
```

### 4. Test Result

```bash
npm run dev
# Open http://localhost:4321
```

---

## Tips for Success

### 1. Be Specific in Requirements

❌ Bad: "Make it look good" ✅ Good: "Dark theme with #0a0a0f background, pink
(#ec4899) accents"

### 2. Include Non-Goals

This prevents Claude from adding features you don't want.

### 3. Review Generated Plans

The plan is a proposal. Edit it if needed before running task-planner.

### 4. Run Tasks Incrementally

Don't run all tasks at once. Review after each one.

### 5. Fix Errors Early

If you see a bug, fix it before continuing. Technical debt compounds.

---

## Troubleshooting

### "No PROJECT_STARTER.md found"

Make sure you're in the project root directory.

### "Tasks file not found"

Run `/project-planner` first, then `/task-planner`.

### "TypeScript errors"

Ask Claude: "There are TypeScript errors. Can you fix them?"

### "Build fails"

```bash
npm run build 2>&1 | head -50
```

Share the error output with Claude.

---

## Next Steps

- [Real-World Example: SSG Blog](./real-world-example-ssg.md)
- [Available Agents](./.claude/agents/README.md)
- [Hook System](./.claude/hooks/README.md)
- [MCP Integrations](./.claude/mcp/README.md)
