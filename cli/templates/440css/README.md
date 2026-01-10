# 440css

> Modern, semantic CSS system built for the web

## Philosophy

440css is named after the musical note A (440Hz), representing harmony and standardization. It's a modern CSS framework built on semantic principles, accessibility-first design, and progressive enhancement.

## Features

- **Semantic Classes** - No utility mess, just meaningful component names
- **Accessibility First** - WCAG AAA compliant out of the box
- **Fluid Everything** - Typography, spacing, and layouts that scale
- **Dark Mode** - Built-in dark mode support
- **Logical Properties** - RTL-ready from the start
- **Tiny Bundle** - ~5KB gzipped
- **Custom Properties** - Fully customizable design tokens

## Installation

```bash
# With create-440-app (automatic)
npx create-440-app my-project

# Manual installation
npm install 440css
```

## Usage

### Import in your CSS

```css
@import '440css/440.css';
```

### Or in JavaScript

```javascript
import '440css/440.css';
```

## Core Concepts

### Design Tokens

All design decisions live in CSS custom properties:

```css
:root {
  --color-primary: hsl(220 90% 56%);
  --space-md: clamp(1.5rem, 1.37rem + 0.65vw, 1.88rem);
  --font-size-base: clamp(1rem, 0.91rem + 0.43vw, 1.25rem);
}
```

### Fluid Typography

Typography scales smoothly across all screen sizes:

```html
<h1>Scales from 3rem to 4.5rem</h1>
<p>Base text scales from 1rem to 1.25rem</p>
```

### Layout Patterns

Modern layout primitives based on Every Layout principles:

```html
<!-- Auto-responsive grid -->
<div class="grid-auto">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Stack with consistent spacing -->
<div class="stack">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>

<!-- Sidebar layout -->
<div class="sidebar">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>
```

## Components

### Buttons

```html
<button class="button button-primary">Primary</button>
<button class="button button-secondary">Secondary</button>
<button class="button button-outline">Outline</button>
<button class="button button-ghost">Ghost</button>
```

### Forms

```html
<div class="form-field">
  <label for="email" class="required">Email</label>
  <input type="email" id="email" placeholder="you@example.com">
  <span class="form-hint">We'll never share your email</span>
</div>
```

### Cards

```html
<article class="card">
  <header class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Subtitle text</p>
  </header>
  <div class="card-body">
    <p>Card content goes here</p>
  </div>
  <footer class="card-footer">
    <button class="button button-primary">Action</button>
  </footer>
</article>
```

## Customization

Override any design token:

```css
:root {
  /* Brand colors */
  --color-primary: hsl(280 60% 50%);
  --color-accent: hsl(340 80% 55%);

  /* Spacing scale */
  --space-md: 2rem;

  /* Typography */
  --font-sans: 'Inter', sans-serif;
}
```

## File Structure

```
440css/
├── 440.css              # Main bundle
├── core/
│   ├── reset.css       # Modern CSS reset
│   ├── variables.css   # Design tokens
│   ├── typography.css  # Type system
│   └── layout.css      # Layout primitives
├── components/
│   ├── buttons.css
│   ├── forms.css
│   └── cards.css
└── utilities/
    ├── accessibility.css
    └── spacing.css
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

(Targets browsers that support CSS custom properties, clamp(), and logical properties)

## Why 440css?

- **Semantic over utility** - Write meaningful HTML, not className soup
- **Modern CSS only** - No preprocessors, build steps, or legacy baggage
- **Accessibility first** - WCAG compliance isn't optional
- **Small footprint** - ~5KB for the full system
- **Framework agnostic** - Works with React, Vue, Svelte, vanilla JS
- **Future-proof** - Built on web standards, not abstractions

## Examples

### Landing Page

```html
<div class="cover">
  <header class="container-lg">
    <nav><!-- nav here --></nav>
  </header>

  <main class="cover-center container-lg">
    <h1>Welcome to 440css</h1>
    <p class="lead">Modern CSS that scales</p>
    <div class="cluster">
      <button class="button button-primary button-lg">Get Started</button>
      <button class="button button-outline button-lg">Learn More</button>
    </div>
  </main>

  <footer class="container-lg">
    <p class="text-small text-muted">&copy; 2024</p>
  </footer>
</div>
```

### Dashboard

```html
<div class="sidebar">
  <aside>
    <nav class="stack">
      <!-- navigation -->
    </nav>
  </aside>

  <main>
    <div class="card-grid">
      <article class="card"><!-- card 1 --></article>
      <article class="card"><!-- card 2 --></article>
      <article class="card"><!-- card 3 --></article>
    </div>
  </main>
</div>
```

## License

MIT

## Links

- [Documentation](https://github.com/dylanburkey/claude-code-sidekick/tree/main/cli/templates/440css)
- [Claude Code Sidekick](https://github.com/dylanburkey/claude-code-sidekick)
- [Report Issues](https://github.com/dylanburkey/claude-code-sidekick/issues)

---

Built with love and web standards
