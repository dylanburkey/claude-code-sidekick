# Code Style Rules

## Purpose
Enforce consistent, maintainable code across the project following modern web standards.

## HTML Standards

### Semantic Markup
Use semantic HTML elements over generic divs:

```html
<!-- ✓ Correct -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <section>
      <h2>Section Heading</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<footer>
  <p>&copy; 2024</p>
</footer>

<!-- ✗ Avoid -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
```

### Document Outline
- One `<h1>` per page
- Proper heading hierarchy (no skipped levels)
- Use `<section>` and `<article>` appropriately

## CSS Standards

### Modern CSS First
Use CSS Grid and Flexbox for layout:

```css
/* ✓ Correct - CSS Grid */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
}

/* ✓ Correct - Flexbox */
.flex-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

/* ✗ Avoid - floats for layout */
.old-layout {
  float: left;
  width: 33.33%;
}
```

### Custom Properties
Use CSS custom properties for theming:

```css
/* ✓ Define in :root */
:root {
  --color-primary: #1a1a2e;
  --color-secondary: #16213e;
  --color-accent: #e94560;
  
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  
  --font-body: system-ui, sans-serif;
  --font-heading: Georgia, serif;
}

/* ✓ Use throughout */
.component {
  color: var(--color-primary);
  padding: var(--space-md);
  font-family: var(--font-body);
}
```

### Logical Properties
Prefer logical properties for internationalization:

```css
/* ✓ Correct - logical properties */
.component {
  margin-inline: auto;
  padding-block: var(--space-md);
  border-inline-start: 2px solid var(--color-accent);
}

/* ✗ Avoid - physical properties when logical exists */
.component {
  margin-left: auto;
  margin-right: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
```

### No Utility-First Frameworks
Write semantic, maintainable CSS:

```css
/* ✓ Correct - semantic class names */
.product-card {
  display: grid;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-surface);
  border-radius: 8px;
}

.product-card__title {
  font-size: 1.25rem;
  font-weight: 600;
}

/* ✗ Avoid - utility classes */
<div class="flex flex-col gap-4 p-8 bg-white rounded-lg">
```

### Mobile-First Responsive
Start with mobile, enhance for larger screens:

```css
/* ✓ Mobile-first */
.component {
  padding: var(--space-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-md);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--space-lg);
  }
}
```

## JavaScript Standards

### Modern ES6+
Use modern JavaScript features:

```javascript
// ✓ Correct - const/let, arrow functions, destructuring
const processItems = (items) => {
  const { data, meta } = items;
  return data.map((item) => ({
    ...item,
    processed: true,
  }));
};

// ✓ Correct - async/await
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};
```

### Web Components
Prefer native web components:

```javascript
// ✓ Correct - Custom Element
class ProductCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.innerHTML = `
      <article class="product-card">
        <h2>${this.getAttribute('title')}</h2>
      </article>
    `;
  }
}

customElements.define('product-card', ProductCard);
```

### Progressive Enhancement
Core functionality without JavaScript:

```html
<!-- ✓ Works without JS, enhanced with JS -->
<details class="accordion">
  <summary>Section Title</summary>
  <div class="accordion__content">
    Content here...
  </div>
</details>

<!-- Enhanced with JavaScript for animations -->
```

## Naming Conventions

### Files
- `kebab-case` for files: `product-card.js`, `main-header.css`
- Component files match component name: `ProductCard` → `product-card.js`

### CSS Classes
- BEM methodology: `block__element--modifier`
- Semantic names describing purpose, not appearance

```css
/* ✓ Correct */
.product-card {}
.product-card__title {}
.product-card--featured {}

/* ✗ Avoid */
.red-box {}
.left-aligned {}
.big-text {}
```

### JavaScript
- `camelCase` for variables and functions
- `PascalCase` for classes and components
- `UPPER_SNAKE_CASE` for constants

## Code Organization

### File Structure
```
src/
├── components/
│   ├── product-card.js
│   └── product-card.css
├── layouts/
│   └── main-layout.css
├── utilities/
│   └── helpers.js
└── index.js
```

### Import Order
1. External dependencies
2. Internal modules
3. Styles
4. Types (if TypeScript)

```javascript
// External
import { createApp } from 'framework';

// Internal
import { formatPrice } from './utilities/helpers.js';
import { ProductCard } from './components/product-card.js';

// Styles
import './styles/main.css';
```

## Enforcement
- Agents check against these rules before completing tasks
- Pre-commit hook validates compliance
- Review agent uses these as evaluation criteria
