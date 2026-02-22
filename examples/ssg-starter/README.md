# SSG Starter Example

> Step-by-step walkthrough of building a static site with Claude Code Sidekick

This example shows the complete Sidekick workflow from requirements to working code.

---

## What You'll Learn

1. How to fill out PROJECT_STARTER.md
2. How to run /project-planner
3. How to run /task-planner  
4. How to run /task-runner
5. How to fix errors along the way

---

## The Finished Product

This example builds a production-ready static site with:

- ✅ Homepage with hero section
- ✅ Blog listing page
- ✅ Individual blog post pages
- ✅ SEO meta tags on all pages
- ✅ JSON-LD structured data
- ✅ Dark theme with modern CSS
- ✅ Mobile responsive design

---

## Step 1: Review PROJECT_STARTER.md

Open [PROJECT_STARTER.md](./PROJECT_STARTER.md) to see the requirements.

### Key Sections

**Project Info:**
```markdown
### Project Name
SSG Starter

### Project Description
A modern static site generator starter template with blog...
```

**Requirements (EARS Notation):**
```markdown
1. WHEN user visits homepage THE SYSTEM SHALL display hero section
2. WHEN user visits /blog THE SYSTEM SHALL list all published posts
3. THE SYSTEM SHALL include SEO meta tags on all pages
```

**Technical Stack:**
```markdown
- Framework: Astro 5
- Styling: Modern CSS with @layer
- Content: Markdown with YAML frontmatter
```

---

## Step 2: Run /project-planner

The project-planner reads PROJECT_STARTER.md and creates a structured plan.

### Command

```
/project-planner
```

### Output

See [.claude/project-plan/phase_1.md](./.claude/project-plan/phase_1.md)

The plan includes:
- Project summary
- Phase objectives
- Technical approach
- Deliverables checklist

---

## Step 3: Run /task-planner

The task-planner converts the plan into actionable tasks.

### Command

```
/task-planner
```

### Output

See [.claude/tasks/phase-1-tasks.md](./.claude/tasks/phase-1-tasks.md)

Example task table:

| ID | Agent | Task | Time | Status |
|----|-------|------|------|--------|
| TASK-001 | init | Project setup | 10 min | ✅ |
| TASK-002 | dev | CSS architecture | 45 min | ✅ |
| TASK-003 | dev | Base layout | 20 min | ✅ |
| TASK-004 | dev | Nav component | 15 min | ✅ |

---

## Step 4: Run /task-runner

The task-runner executes each task using the assigned agent.

### Command

```
/task-runner
```

### What Happens

1. Claude finds the first incomplete task
2. Loads the appropriate agent (init, dev, test, etc.)
3. Executes the task
4. Marks it complete
5. Asks if you want to continue

### Fixing Errors

If code has errors:

```
There's a TypeScript error in SEO.astro. Can you fix it?
```

Claude will:
1. Read the error
2. Find the problem
3. Fix it
4. Verify the fix

---

## Project Structure

After running the workflow, you get:

```
ssg-starter/
├── src/
│   ├── components/
│   │   ├── SEO.astro          # Meta tags, OG, Twitter
│   │   ├── JsonLD.astro       # Structured data
│   │   ├── Nav.astro          # Site navigation
│   │   └── Footer.astro       # Site footer
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout wrapper
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   └── blog/
│   │       ├── index.astro    # Blog listing
│   │       └── [slug].astro   # Blog post template
│   └── content/
│       ├── config.ts          # Content schemas
│       └── posts/             # Markdown posts
├── public/
│   └── styles.css             # Global styles
├── PROJECT_STARTER.md         # Your requirements
├── CLAUDE.md                  # AI context
└── package.json
```

---

## Running the Example

### Install Dependencies

```bash
cd examples/ssg-starter
npm install
```

### Start Dev Server

```bash
npm run dev
# Opens http://localhost:4321
```

### Build for Production

```bash
npm run build
# Output in ./dist/
```

---

## Key Files Explained

### SEO.astro

Handles all meta tags:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />

<!-- AI Crawler Directives -->
<meta name="robots" content="index, follow, max-image-preview:large" />
```

### Content Collection

Blog posts use Astro's content collections:

```typescript
// src/content/config.ts
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()),
  }),
});
```

### CSS Architecture

Uses `@layer` for cascade control:

```css
@layer reset, base, tokens, layout, components, utilities;

@layer tokens {
  :root {
    --color-bg: #0a0a0f;
    --color-accent: #ec4899;
  }
}
```

---

## Customizing This Example

### Change Colors

Edit `public/styles.css`:

```css
:root {
  --color-accent: #your-color;
  --color-bg: #your-background;
}
```

### Add a Page

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="About us">
  <h1>About</h1>
  <p>Your content here.</p>
</BaseLayout>
```

### Add a Blog Post

Create `src/content/posts/my-post.md`:

```markdown
---
title: "My New Post"
description: "A brief description"
publishedAt: 2024-02-22
tags: ["tutorial"]
---

Your content here...
```

---

## Troubleshooting

### "Cannot find module"

```bash
npm install
```

### "Content collection error"

Check that your post frontmatter matches the schema in `config.ts`.

### "Build fails"

```bash
npm run build 2>&1
```

Share the error with Claude for help.

---

## Next Steps

- Read the [Getting Started Tutorial](../../docs/guides/getting-started-tutorial.md)
- Try the [Crypto Dashboard Example](../crypto-dashboard/)
- Explore [Available Agents](../../.claude/agents/)
