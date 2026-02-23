# Real-World Example: Building an SSG with Claude Code Sidekick

> A complete walkthrough of using Claude Code Sidekick to build a production
> static site generator project.

---

## The Project: Rise3 Recovery Platform

We'll rebuild a live production site (rise3.org) as a proper SSG with:

- Blog support via markdown
- SEO meta tags and JSON-LD structured data
- Modern CSS (layers, custom properties, glass effects)
- Content collections for easy updates

---

## Step 1: Create the Project

### Terminal Command

```bash
$ npx create-claude-project rise3-webapp --preset=astro

   ╭──────────────────────────────────────────╮
   │                                          │
   │   🚀 Create Claude Project               │
   │      AI-Powered Project Generator        │
   │                                          │
   ╰──────────────────────────────────────────╯

✔ Creating project structure...
✔ Copying Claude Code Sidekick files...
✔ Initializing git repository...

🎉 Project created successfully!

  cd rise3-webapp
  pnpm install
```

### What Gets Created

```
rise3-webapp/
├── .claude/                    # Sidekick configuration
│   ├── agents/                 # Specialized AI agents
│   ├── commands/               # Slash commands
│   ├── hooks/                  # Automation hooks
│   └── rules/                  # Code standards
├── PROJECT_STARTER.md          # Your requirements
├── CLAUDE.md                   # AI context
└── package.json
```

---

## Step 2: Define Requirements in PROJECT_STARTER.md

Edit `PROJECT_STARTER.md` with your project specs:

```markdown
# Project Starter Template

## Project Information

### Project Name

Rise3 - Recovery Platform Website

### Project Description

A static site for Rise3, a blockchain-powered recovery incentives platform. Must
match the existing deployed site at rise3.org exactly, but rebuilt as a proper
SSG with blog support and content management.

### Project Type

static-site

---

## Goals & Objectives

### Primary Goal

Rebuild rise3.org as an Astro SSG with:

- Exact design match (dark theme, glass effects, pink/purple gradients)
- Blog system using markdown content collections
- SEO optimization (meta tags, JSON-LD structured data)
- Modern CSS architecture (@layer, custom properties)

### Success Criteria

- Visual parity with production site
- Lighthouse SEO score > 95
- Blog posts render from markdown
- All CSS uses modern features (no preprocessors)

---

## Requirements (EARS Notation)

### Functional Requirements

1. WHEN user visits /blog THE SYSTEM SHALL display list of posts
2. WHEN user visits /blog/[slug] THE SYSTEM SHALL render markdown content
3. THE SYSTEM SHALL include Open Graph and Twitter meta tags
4. THE SYSTEM SHALL include JSON-LD structured data for Organization and
   Articles

### Non-Functional Requirements

- CSS: Use @layer for organization
- CSS: Use namespaced custom properties (--r3-\*)
- Accessibility: WCAG 2.1 AA compliant
- Performance: Static HTML, minimal JavaScript
```

---

## Step 3: Run /project-planner

### Terminal Command

```bash
# In Claude Code
> /project-planner

📋 Reading PROJECT_STARTER.md...
✓ Parsed project requirements
✓ Identified 4 functional requirements
✓ Identified 4 non-functional requirements

🔍 Analyzing project...

┌────────────────────────────────────────┐
│ COMPLEXITY ASSESSMENT                  │
├────────────────────────────────────────┤
│ Overall: MEDIUM                        │
│                                        │
│ Key Challenges:                        │
│ • Exact CSS replication required       │
│ • SEO meta system needs to be robust   │
│ • Content collections for blog         │
└────────────────────────────────────────┘

📁 Creating project-plan/phase_1.md...
✓ Phase 1: Foundation & Design System
✓ Phase 2: Core Pages & Components
✓ Phase 3: Blog System
✓ Phase 4: SEO & Deployment

✅ Project plan created!
```

### Generated Output: `.claude/project-plan/phase_1.md`

````markdown
# Phase 1: Foundation & Design System

Generated: 2026-02-21T16:00:00Z Source: PROJECT_STARTER.md

## Objectives

1. Set up Astro project with static output
2. Replicate CSS design system from production site
3. Create base layout with proper structure
4. Implement SEO component with meta tags

## Deliverables

- [ ] Astro config (static output, Cloudflare adapter)
- [ ] CSS file with @layer architecture
- [ ] BaseLayout.astro with head/body structure
- [ ] SEO.astro component
- [ ] JsonLD.astro component

## Technical Approach

### CSS Architecture

```css
@layer reset, base, tokens, layout, components, utilities;

@layer tokens {
  :root {
    --r3-color-accent: #ec4899;
    --r3-color-purple: #8b5cf6;
    --r3-glass-bg: rgba(24, 24, 27, 0.6);
    /* ... */
  }
}
```
````

````

---

## Step 4: Run /task-planner

### Terminal Command

```bash
> /task-planner

📖 Reading project-plan/phase_1.md...
✓ Found 4 objectives
✓ Found 5 deliverables

🔨 Generating tasks...

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1 TASKS                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ TASK-001 [init] Astro Configuration              ~15 min       │
│ ├── Set output: 'static'                                       │
│ ├── Configure site URL                                         │
│ └── Add Cloudflare adapter                                     │
│                                                                 │
│ TASK-002 [dev] CSS Design System                 ~45 min       │
│ ├── Copy production CSS                                        │
│ ├── Verify @layer structure                                    │
│ └── Test glass effects render                                  │
│                                                                 │
│ TASK-003 [dev] SEO Component                     ~30 min       │
│ ├── Create SEO.astro                                           │
│ ├── Add OG meta tags                                           │
│ ├── Add Twitter card tags                                      │
│ └── Add AI crawler directives                                  │
│                                                                 │
│ TASK-004 [dev] JSON-LD Component                 ~30 min       │
│ ├── Create JsonLD.astro                                        │
│ ├── Organization schema                                        │
│ ├── WebSite schema                                             │
│ └── Article schema (for blog)                                  │
│                                                                 │
│ TASK-005 [dev] Base Layout                       ~30 min       │
│ ├── Create BaseLayout.astro                                    │
│ ├── Include SEO + JsonLD                                       │
│ └── Add nav/footer slots                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

📁 Created tasks/phase-1-tasks.md
✅ 5 tasks generated
````

---

## Step 5: Run /task-runner

### Terminal Command

```bash
> /task-runner

🤖 Loading agents...
✓ init-agent ready
✓ dev-agent ready

📋 Reading tasks/phase-1-tasks.md...
✓ Found 5 tasks

🚀 Executing Phase 1...
```

### Task Execution Output

```bash
┌──────────────────────────────────────────────────────────────────┐
│ TASK-001: Astro Configuration                        [init]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Reading current astro.config.mjs...                           │
│ ▶ Setting output: 'static'                                      │
│ ▶ Adding site URL: 'https://rise3.org'                          │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘

📄 astro.config.mjs:
```

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://rise3.org',
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
});
```

```bash
┌──────────────────────────────────────────────────────────────────┐
│ TASK-002: CSS Design System                          [dev]      │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Fetching production CSS from rise3.org...                     │
│ ▶ Analyzing @layer structure...                                 │
│ ▶ Writing to public/styles.css (1,600 lines)...                 │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘

📄 CSS Architecture Detected:
```

```css
@layer reset, base, tokens, layout, components, utilities;

@layer tokens {
  :root {
    /* --r3 = Rise3 namespace */
    --r3-color-surface: #0a0a0f;
    --r3-color-accent: #ec4899;
    --r3-color-purple: #8b5cf6;
    --r3-glass-bg: rgba(24, 24, 27, 0.6);
    --r3-text-hero: clamp(3rem, 2.5rem + 3vw, 5.5rem);
    /* ... */
  }
}

@layer components {
  .glass {
    background: var(--r3-glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--r3-glass-border);
    border-radius: var(--r3-radius-lg);
  }
}
```

```bash
┌──────────────────────────────────────────────────────────────────┐
│ TASK-003: SEO Component                              [dev]      │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating src/components/SEO.astro...                          │
│ ▶ Adding standard meta tags...                                  │
│ ▶ Adding Open Graph tags...                                     │
│ ▶ Adding Twitter Card tags...                                   │
│ ▶ Adding AI crawler directives...                               │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘

📄 src/components/SEO.astro:
```

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}

const { title, description, image, type = 'website' } = Astro.props;
const siteUrl = 'https://rise3.org';
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />

<!-- AI Crawler Directives -->
<meta name="GPTBot" content="index, follow" />
<meta name="anthropic-index" content="index, follow" />
<meta name="CCBot" content="index, follow" />
```

---

## Step 6: Verify with Dev Server

### Terminal Command

```bash
$ pnpm dev

 astro  v5.16.6 ready in 2164 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

### Browser Preview

Open `http://localhost:4321/` to see the site:

```
┌─────────────────────────────────────────────────────────────────┐
│  🔒 localhost:4321                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     Rise3                     Problem  Solution  Ecosystem      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    Your Recovery, Rewarded                              │   │
│  │                                                         │   │
│  │    Rise3                                                │   │
│  │                                                         │   │
│  │    Tokenizing recovery behaviors to transform           │   │
│  │    addiction treatment through immediate incentives,    │   │
│  │    accessible transportation, and stable housing.       │   │
│  │                                                         │   │
│  │    [Download Pitch Deck]  [Learn More]                  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  These Are Real People in Your Community                │  │
│  │                                                          │  │
│  │         0                                                │  │
│  │    lives lost today                                      │  │
│  │                                                          │  │
│  │    15+          5,500+         #4                        │  │
│  │    deaths/day   deaths/year   in U.S. states            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 7: Add Blog Content Collection

### File: `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Rise3 Team'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

### File: `src/content/posts/welcome.md`

```markdown
---
title: 'Welcome to Rise3'
description: 'Introducing our blockchain-powered recovery platform'
publishedAt: 2024-02-21
tags: ['announcement', 'recovery']
---

# Welcome to Rise3

We're excited to introduce Rise3, a revolutionary platform designed to support
and reward your recovery journey.

## Why We Built Rise3

Recovery is hard. But it shouldn't be a journey you take alone...
```

### Blog Listing: `src/pages/blog/index.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
---

<BaseLayout title="Blog - Rise3" description="News and updates">
  <section class="section">
    <div class="container">
      <h1>Rise3 Blog</h1>

      <div class="grid grid--3">
        {posts.map(post => (
          <article class="glass">
            <h2><a href={`/blog/${post.slug}`}>{post.data.title}</a></h2>
            <p>{post.data.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

---

## Step 8: Build & Deploy

### Terminal Commands

```bash
# Build static site
$ pnpm build

 prerendering static routes
▶ src/pages/blog/[slug].astro
  └─ /blog/welcome/index.html (+7ms)
▶ src/pages/blog/index.astro
  └─ /blog/index.html (+5ms)
▶ src/pages/index.astro
  └─ /index.html (+12ms)

✓ Completed in 44ms.
[build] Complete!

# Deploy to Cloudflare
$ pnpm deploy

✨ Deployment complete!
   https://rise3.org
```

---

## Key Sidekick Features Used

| Feature                | How It Helped                               |
| ---------------------- | ------------------------------------------- |
| **PROJECT_STARTER.md** | Defined exact requirements in EARS notation |
| **/project-planner**   | Analyzed requirements, created phased plan  |
| **/task-planner**      | Generated specific implementation tasks     |
| **/task-runner**       | Executed tasks with specialized agents      |
| **CSS Rules**          | Enforced modern CSS standards               |
| **Hooks**              | Auto-formatted on save, validated on commit |

---

## Final Project Structure

```
rise3-webapp/
├── .claude/                    # Sidekick config
│   ├── project-plan/
│   │   └── phase_1.md
│   └── tasks/
│       └── phase-1-tasks.md
├── src/
│   ├── components/
│   │   ├── SEO.astro           # Meta tags
│   │   ├── JsonLD.astro        # Structured data
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── content/
│   │   ├── config.ts           # Collections
│   │   └── posts/              # Markdown blog
│   └── pages/
│       ├── index.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── public/
│   └── styles.css              # 1,600 lines modern CSS
├── PROJECT_STARTER.md
└── CLAUDE.md
```

---

## Summary

Claude Code Sidekick transformed this from a vague request ("rebuild as SSG")
into:

1. **Structured requirements** via PROJECT_STARTER.md
2. **Phased plan** via /project-planner
3. **Actionable tasks** via /task-planner
4. **Executed implementation** via /task-runner

The result: A production-ready static site with blog support, SEO optimization,
and modern CSS architecture—built systematically instead of ad-hoc.

---

**Next:** [Building a Full-Stack App →](./fullstack-walkthrough.md)
