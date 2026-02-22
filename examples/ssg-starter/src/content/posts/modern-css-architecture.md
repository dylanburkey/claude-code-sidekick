---
title: "Modern CSS Architecture with @layer"
description: "How SSG Starter uses CSS @layer for maintainable, scalable stylesheets without preprocessors."
publishedAt: 2024-02-20
author: "SSG Team"
tags: ["css", "architecture", "tutorial"]
---

# Modern CSS Architecture

SSG Starter uses modern CSS features to create maintainable stylesheets without any preprocessors.

## The @layer System

CSS `@layer` lets you control the cascade explicitly:

```css
@layer reset, base, tokens, layout, components, utilities;
```

Each layer has clear responsibilities:

1. **reset** - Normalize browser defaults
2. **base** - Typography, body styles
3. **tokens** - CSS custom properties (colors, spacing, etc.)
4. **layout** - Container, grid, flex utilities
5. **components** - Buttons, cards, nav, etc.
6. **utilities** - Helper classes

## Custom Properties

All design tokens are CSS custom properties:

```css
@layer tokens {
  :root {
    --color-accent: #ec4899;
    --color-purple: #8b5cf6;
    --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  }
}
```

## Glass Effect

The signature glass effect uses backdrop-filter:

```css
.glass {
  background: rgba(24, 24, 27, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(236, 72, 153, 0.2);
}
```

## Benefits

- No build step for CSS
- Native browser features
- Easy to debug
- Future-proof

The result is fast, maintainable CSS that works everywhere.
