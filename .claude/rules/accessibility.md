# Accessibility Rules

## Purpose

Ensure all code meets WCAG 2.1 AA standards and provides an inclusive user
experience.

## Core Principles

### 1. Perceivable

Information must be presentable in ways all users can perceive.

### 2. Operable

Interface components must be operable by all users.

### 3. Understandable

Information and UI operation must be understandable.

### 4. Robust

Content must be robust enough for diverse user agents.

---

## HTML Accessibility

### Semantic Structure

```html
<!-- ✓ Correct - meaningful landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Main">
    <!-- navigation content -->
  </nav>
</header>

<main role="main">
  <article>
    <h1>Page Title</h1>
    <!-- main content -->
  </article>
</main>

<aside role="complementary">
  <!-- sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- footer content -->
</footer>
```

### Headings

```html
<!-- ✓ Correct - logical hierarchy -->
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h2>Another Section</h2>

<!-- ✗ Avoid - skipped levels -->
<h1>Title</h1>
<h3>Subsection</h3>
<!-- missing h2 -->
```

### Images

```html
<!-- ✓ Informative image -->
<img
  src="product.jpg"
  alt="Red industrial safety helmet with adjustable strap"
/>

<!-- ✓ Decorative image -->
<img src="decorative-line.svg" alt="" role="presentation" />

<!-- ✓ Complex image with extended description -->
<figure>
  <img src="chart.png" alt="Sales growth chart" aria-describedby="chart-desc" />
  <figcaption id="chart-desc">
    Chart showing 25% sales increase from Q1 to Q4 2024...
  </figcaption>
</figure>
```

### Forms

```html
<!-- ✓ Correct - associated labels -->
<form>
  <div class="form-field">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-describedby="email-hint"
    />
    <p id="email-hint" class="hint">We'll never share your email.</p>
  </div>

  <div class="form-field">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      required
      aria-describedby="password-requirements"
    />
    <p id="password-requirements" class="hint">
      Minimum 8 characters with one number.
    </p>
  </div>

  <button type="submit">Create Account</button>
</form>

<!-- ✗ Avoid - missing labels -->
<input type="email" placeholder="Email" />
```

### Links and Buttons

```html
<!-- ✓ Descriptive link text -->
<a href="/products/safety-helmets">
  View our complete safety helmet collection
</a>

<!-- ✓ Button with accessible name -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>

<!-- ✗ Avoid - vague link text -->
<a href="/products">Click here</a>

<!-- ✗ Avoid - empty button -->
<button>
  <svg><!-- icon --></svg>
</button>
```

### Tables

```html
<!-- ✓ Correct - accessible table -->
<table>
  <caption>
    Product Specifications
  </caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Weight</th>
      <td>450g</td>
    </tr>
    <tr>
      <th scope="row">Material</th>
      <td>ABS Plastic</td>
    </tr>
  </tbody>
</table>
```

---

## CSS Accessibility

### Focus Visibility

```css
/* ✓ Visible focus indicator */
:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* ✓ Enhanced focus for keyboard users */
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* ✗ Never remove focus without replacement */
:focus {
  outline: none; /* NEVER do this without alternative */
}
```

### Color Contrast

```css
/* ✓ Sufficient contrast (4.5:1 for normal text) */
.text-content {
  color: #1a1a2e; /* Dark text */
  background: #ffffff; /* Light background */
  /* Contrast ratio: 14.8:1 ✓ */
}

/* ✓ Large text can have 3:1 ratio */
.heading-large {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a6a;
  /* Contrast ratio: 4.2:1 ✓ for large text */
}
```

### Motion and Animation

```css
/* ✓ Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ✓ Subtle transitions by default */
.button {
  transition: background-color 0.2s ease;
}
```

### Text Sizing

```css
/* ✓ Relative units for text */
body {
  font-size: 1rem; /* 16px base */
  line-height: 1.5;
}

.small-text {
  font-size: 0.875rem; /* 14px minimum */
}

/* ✗ Avoid fixed pixel sizes for body text */
body {
  font-size: 14px; /* Can't scale with user preferences */
}
```

### Touch Targets

```css
/* ✓ Minimum 44x44px touch targets */
.button,
.nav-link {
  min-height: 44px;
  min-width: 44px;
  padding: var(--space-sm) var(--space-md);
}

/* ✓ Adequate spacing between targets */
.button-group {
  gap: var(--space-sm);
}
```

---

## JavaScript Accessibility

### Keyboard Navigation

```javascript
// ✓ Support keyboard navigation
class Dropdown extends HTMLElement {
  connectedCallback() {
    this.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
      case 'Enter':
      case ' ':
        this.selectCurrent();
        break;
    }
  }
}
```

### Focus Management

```javascript
// ✓ Manage focus in modals
class Modal extends HTMLElement {
  open() {
    this.previouslyFocused = document.activeElement;
    this.setAttribute('open', '');
    this.querySelector('[autofocus]')?.focus();
    this.trapFocus();
  }

  close() {
    this.removeAttribute('open');
    this.previouslyFocused?.focus();
  }

  trapFocus() {
    const focusable = this.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    // ... implement focus trap
  }
}
```

### ARIA Live Regions

```javascript
// ✓ Announce dynamic content
const announcer = document.getElementById('announcer');
announcer.setAttribute('aria-live', 'polite');

function announce(message) {
  announcer.textContent = message;
}

// Usage
announce('Item added to cart');
```

### Screen Reader Only Content

```css
/* Utility for screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

```html
<!-- Usage -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span class="sr-only">Close menu</span>
</button>
```

---

## Testing Requirements

### Automated Testing

- Use jest-axe for component tests
- Run axe-core in integration tests
- Include in CI/CD pipeline

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus order is logical
- [ ] Color is not the only indicator
- [ ] Text can be resized to 200%
- [ ] Content works at 320px width

---

## Enforcement

- All new components must pass accessibility tests
- Review agent checks for WCAG compliance
- Pre-commit hook runs accessibility linting
- Documentation must include accessibility notes
