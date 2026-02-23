# CLAUDE.md - SSG Starter Project Context

> Context for AI assistants working on this SSG project.

## Project Overview

**SSG Starter** is a production-ready static site template built with Astro. It
demonstrates the Claude Code Sidekick workflow for building modern web projects.

### Tech Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Modern CSS (@layer, custom properties)
- **Content:** Markdown with frontmatter
- **Theme:** Dark with pink/purple accents

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SEO.astro       # Meta tags, OG, Twitter, AI crawlers
│   ├── JsonLD.astro    # Structured data schemas
│   ├── Nav.astro       # Fixed navigation
│   └── Footer.astro    # Site footer
├── layouts/
│   └── BaseLayout.astro # Main layout (includes SEO, Nav, Footer)
├── pages/
│   ├── index.astro     # Homepage
│   └── blog/
│       ├── index.astro # Blog listing
│       └── [slug].astro # Dynamic post pages
└── content/
    ├── config.ts       # Content collection schemas
    └── posts/          # Markdown blog posts
```

## Commands

```bash
pnpm dev      # Start dev server at localhost:4321
pnpm build    # Build static site to ./dist/
pnpm preview  # Preview production build
```

## CSS Architecture

Uses `@layer` for cascade control:

```css
@layer reset, base, tokens, layout, components, utilities;
```

### Design Tokens

All design values are CSS custom properties:

```css
:root {
  --color-surface: #0a0a0f;
  --color-accent: #ec4899;
  --color-purple: #8b5cf6;
  --glass-bg: rgba(24, 24, 27, 0.6);
}
```

### Key Classes

| Class        | Purpose                          |
| ------------ | -------------------------------- |
| `.glass`     | Glass morphism card effect       |
| `.container` | Max-width centered container     |
| `.section`   | Vertical padding for sections    |
| `.grid`      | CSS grid with responsive columns |
| `.btn`       | Button base styles               |
| `.prose`     | Blog post content styling        |

## Content Collections

Blog posts use Astro's content collections with this schema:

```typescript
{
  title: string,
  description: string,
  publishedAt: Date,
  author: string,
  tags: string[],
  draft: boolean
}
```

### Adding a Post

Create `src/content/posts/my-post.md`:

```markdown
---
title: 'My Post Title'
description: 'Brief description'
publishedAt: 2024-02-21
tags: ['tag1', 'tag2']
---

Content here...
```

## SEO

Every page includes:

- Primary meta tags (title, description)
- Open Graph tags (og:title, og:image, etc.)
- Twitter Card tags
- AI crawler directives (GPTBot, anthropic-index, CCBot)
- JSON-LD structured data (Organization, WebSite, Article)

## Coding Standards

### HTML

- Semantic elements (`<article>`, `<section>`, `<nav>`)
- Proper heading hierarchy
- ARIA labels where needed

### CSS

- Use custom properties for values
- Mobile-first responsive design
- No `!important`

### Accessibility

- Color contrast AA compliant
- Focus states visible
- Skip links present
- `prefers-reduced-motion` respected

## When Working on This Project

1. Check existing patterns before adding new ones
2. Use the established CSS custom properties
3. Follow the component structure (props interface, clear docs)
4. Test on mobile viewport
5. Verify SEO meta tags render correctly

## Related Files

- [PROJECT_STARTER.md](./PROJECT_STARTER.md) - Original requirements
- [.claude/project-plan/phase_1.md](./.claude/project-plan/phase_1.md) - Project
  plan
- [.claude/tasks/phase-1-tasks.md](./.claude/tasks/phase-1-tasks.md) - Task
  breakdown
