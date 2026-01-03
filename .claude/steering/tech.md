# Technical Steering Document

> This document defines technical standards and conventions for AI assistants working on this project.

## Code Philosophy

### Progressive Enhancement
Build features in layers:
1. **Core:** Semantic HTML that works without CSS/JS
2. **Enhanced:** CSS for visual presentation
3. **Interactive:** JavaScript for dynamic behavior

### Accessibility First
- WCAG 2.1 AA compliance minimum
- Semantic HTML elements over divs with ARIA
- Keyboard navigation for all interactions
- Color contrast ratios: 4.5:1 for text, 3:1 for UI

## HTML Standards

```html
<!-- DO: Semantic structure -->
<article>
  <header>
    <h2>Title</h2>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <p>Content...</p>
</article>

<!-- DON'T: Div soup -->
<div class="article">
  <div class="header">
    <div class="title">Title</div>
  </div>
</div>
```

## CSS Standards

### Modern CSS Approach
- CSS Grid for page layout
- Flexbox for component alignment
- Custom properties for theming
- Logical properties for internationalization

```css
/* DO: Custom properties and modern layout */
.component {
  --spacing: 1rem;
  display: grid;
  gap: var(--spacing);
  padding-inline: var(--spacing);
}

/* DON'T: Magic numbers and old techniques */
.component {
  display: block;
  padding-left: 16px;
  padding-right: 16px;
}
.component::after {
  content: "";
  clear: both;
}
```

### Naming Convention
- BEM for component classes: `block__element--modifier`
- Utility classes only for single-purpose helpers
- No utility-first frameworks unless project requires

## JavaScript Standards

### Vanilla First
- Use native APIs before reaching for libraries
- Web Components for reusable interactive elements
- ES modules for code organization

```javascript
// DO: Native APIs
const data = await fetch('/api/data').then(r => r.json());
const element = document.querySelector('[data-component]');

// DON'T: Unnecessary abstractions
import axios from 'axios';
import $ from 'jquery';
```

### Error Handling
- Always handle promise rejections
- Provide meaningful error messages
- Fail gracefully with fallbacks

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Bundle Size | < 200KB |

## Testing Requirements

- Unit tests for utility functions
- Integration tests for user flows
- Accessibility tests with automated tools
- Visual regression for UI components

## Security Practices

- Sanitize all user input
- Use Content Security Policy headers
- HTTPS only
- No sensitive data in client-side code

---

> **Usage:** Reference this document when writing code. All code should align with these standards.
