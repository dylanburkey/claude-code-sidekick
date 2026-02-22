# SSG Starter Example

> A complete static site generator built with Claude Code Sidekick

This example demonstrates how to use Claude Code Sidekick to build a production-ready static site with:

- ✅ Blog system (Markdown content collections)
- ✅ SEO optimization (meta tags, JSON-LD)
- ✅ Modern CSS (@layer, custom properties, glass effects)
- ✅ Dark theme with pink/purple accents
- ✅ Responsive design
- ✅ Accessible (WCAG 2.1 AA)

---

## How This Was Built

### Step 1: Project Creation

```bash
$ npx create-claude-project ssg-starter --preset=astro

   ╭──────────────────────────────────────────╮
   │                                          │
   │   🚀 Create Claude Project               │
   │      AI-Powered Project Generator        │
   │                                          │
   ╰──────────────────────────────────────────╯

? Project name: › ssg-starter
? Select a preset: › Astro Site

✔ Creating project structure...
✔ Copying Claude Code Sidekick files...
✔ Installing dependencies...

🎉 Project created successfully!
```

### Step 2: Define Requirements

Edit `PROJECT_STARTER.md`:

```markdown
## Project Name
SSG Starter - Modern Static Site

## Requirements (EARS Notation)

### Functional
1. WHEN user visits /blog THE SYSTEM SHALL display post listing
2. WHEN user visits /blog/[slug] THE SYSTEM SHALL render markdown
3. THE SYSTEM SHALL include SEO meta tags on all pages
4. THE SYSTEM SHALL include JSON-LD structured data

### Non-Functional
- CSS: Use @layer for organization
- CSS: Dark theme with glass morphism effects
- Accessibility: WCAG 2.1 AA compliant
```

### Step 3: Generate Project Plan

```bash
$ claude
> /project-planner

📋 Reading PROJECT_STARTER.md...

┌────────────────────────────────────────┐
│ PROJECT ANALYSIS                       │
├────────────────────────────────────────┤
│ Complexity: MEDIUM                     │
│ Phases: 3                              │
│ Estimated Time: 2-3 hours              │
└────────────────────────────────────────┘

✅ Created .claude/project-plan/phase_1.md
```

### Step 4: Generate Tasks

```bash
> /task-planner

📖 Reading project-plan/phase_1.md...

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1 TASKS                                                   │
├─────────────────────────────────────────────────────────────────┤
│ TASK-001 [init] Astro Configuration              ~10 min       │
│ TASK-002 [dev] CSS Design System                 ~30 min       │
│ TASK-003 [dev] SEO Component                     ~20 min       │
│ TASK-004 [dev] JSON-LD Component                 ~20 min       │
│ TASK-005 [dev] Base Layout                       ~15 min       │
│ TASK-006 [dev] Navigation Component              ~15 min       │
│ TASK-007 [dev] Blog System                       ~30 min       │
└─────────────────────────────────────────────────────────────────┘

✅ Created .claude/tasks/phase-1-tasks.md
```

### Step 5: Execute Tasks

```bash
> /task-runner

🚀 Executing Phase 1...

┌──────────────────────────────────────────────────────────────────┐
│ TASK-001: Astro Configuration                        [init]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Setting output: 'static'                                      │
│ ▶ Configuring site URL                                          │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ TASK-002: CSS Design System                          [dev]      │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating @layer structure                                     │
│ ▶ Defining CSS custom properties                                │
│ ▶ Building glass effect utilities                               │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘

... (tasks 3-7) ...

═══════════════════════════════════════════════════════════════════
                    ⛔ PHASE 1 COMPLETE                            
═══════════════════════════════════════════════════════════════════

Summary:
  ✅ 7/7 tasks completed
  📁 12 files created
  🧪 All components rendering
```

---

## Project Structure

```
ssg-starter/
├── .claude/                      # Sidekick configuration
│   ├── project-plan/
│   │   └── phase_1.md           # Generated project plan
│   └── tasks/
│       └── phase-1-tasks.md     # Generated task list
│
├── src/
│   ├── components/
│   │   ├── SEO.astro            # Meta tags component
│   │   ├── JsonLD.astro         # Structured data
│   │   ├── Nav.astro            # Navigation
│   │   └── Footer.astro         # Footer
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     # Main layout
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   └── blog/
│   │       ├── index.astro      # Blog listing
│   │       └── [slug].astro     # Dynamic post pages
│   │
│   └── content/
│       ├── config.ts            # Content collections
│       └── posts/               # Markdown blog posts
│           └── hello-world.md
│
├── public/
│   └── styles.css               # Global styles
│
├── PROJECT_STARTER.md           # Requirements
├── astro.config.mjs             # Astro config
└── package.json
```

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:4321

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Key Features Explained

### 1. CSS Architecture

Uses modern CSS with `@layer` for organization:

```css
@layer reset, base, tokens, layout, components, utilities;

@layer tokens {
  :root {
    --color-surface: #0a0a0f;
    --color-accent: #ec4899;
    --glass-bg: rgba(24, 24, 27, 0.6);
  }
}

@layer components {
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(236, 72, 153, 0.2);
  }
}
```

### 2. SEO Component

Comprehensive meta tags including AI crawler directives:

```astro
<!-- src/components/SEO.astro -->
<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:image" content={image} />

<!-- AI Crawlers -->
<meta name="GPTBot" content="index, follow" />
<meta name="anthropic-index" content="index, follow" />
```

### 3. Content Collections

Type-safe markdown blog posts:

```typescript
// src/content/config.ts
const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

### 4. JSON-LD Structured Data

Rich snippets for search engines:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hello World",
  "author": { "@type": "Person", "name": "Author" },
  "datePublished": "2024-02-21"
}
```

---

## Adding Content

### New Blog Post

Create `src/content/posts/my-post.md`:

```markdown
---
title: "My New Post"
description: "A brief description"
publishedAt: 2024-02-21
tags: ["tutorial", "guide"]
---

# My New Post

Your content here...
```

### New Page

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="About us">
  <section class="section">
    <div class="container">
      <h1>About</h1>
      <p>Your content here...</p>
    </div>
  </section>
</BaseLayout>
```

---

## Customization

### Colors

Edit `public/styles.css`:

```css
@layer tokens {
  :root {
    --color-accent: #ec4899;     /* Pink */
    --color-secondary: #8b5cf6;  /* Purple */
    /* Change these to your brand colors */
  }
}
```

### Fonts

Edit `src/layouts/BaseLayout.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

---

## Deployment

### Cloudflare Pages

```bash
pnpm build
npx wrangler pages deploy dist
```

### Vercel

```bash
pnpm build
npx vercel --prod
```

### Netlify

```bash
pnpm build
npx netlify deploy --prod --dir=dist
```

---

## License

MIT - Use this as a starting point for your projects!
