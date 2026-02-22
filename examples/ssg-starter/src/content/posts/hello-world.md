---
title: "Hello World: Getting Started with SSG Starter"
description: "Learn how to use SSG Starter to build your next static site with modern CSS and full SEO support."
publishedAt: 2024-02-21
author: "SSG Team"
tags: ["getting-started", "tutorial"]
---

# Hello World

Welcome to SSG Starter! This template gives you everything you need to build a modern static site.

## What's Included

- **Blog System** - Write in Markdown, publish instantly
- **SEO Components** - Meta tags, Open Graph, JSON-LD
- **Modern CSS** - @layer, custom properties, glass effects
- **Dark Theme** - Beautiful and easy on the eyes

## Quick Start

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start the dev server with `pnpm dev`
4. Open http://localhost:4321

## Writing Posts

Create a new file in `src/content/posts/`:

```markdown
---
title: "My New Post"
description: "A brief description"
publishedAt: 2024-02-21
tags: ["tag1", "tag2"]
---

Your content here...
```

## Customization

Edit `public/styles.css` to change colors:

```css
:root {
  --color-accent: #ec4899;  /* Change this */
}
```

Happy building! 🚀
