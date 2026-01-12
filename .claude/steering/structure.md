# Structure Steering Document

> This document defines code organization patterns and file structure
> conventions.

## Directory Organization

### Standard Web Project

```
project-root/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page-level components
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   │   ├── base/           # Reset, typography, variables
│   │   ├── components/     # Component-specific styles
│   │   └── main.css        # Entry point
│   └── scripts/            # JavaScript modules
├── public/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── tests/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/                   # Documentation
├── .claude/                # AI assistant configuration
└── dist/                   # Build output (generated)
```

### Shopify Theme

```
theme-root/
├── assets/                 # CSS, JS, images
├── config/                 # Theme settings
├── layout/                 # Theme layouts
├── locales/                # Translations
├── sections/               # Theme sections
├── snippets/               # Reusable Liquid snippets
├── templates/              # Page templates
│   └── customers/          # Customer account templates
└── .claude/                # AI assistant configuration
```

## File Naming Conventions

### General Rules

- Use kebab-case for files: `user-profile.js`
- Use PascalCase for components: `UserProfile.jsx`
- Use snake_case for test files: `user_profile.test.js`
- Prefix partials with underscore: `_variables.css`

### Component Files

```
components/
├── Button/
│   ├── Button.js           # Component logic
│   ├── Button.css          # Component styles
│   ├── Button.test.js      # Component tests
│   └── index.js            # Public export
```

## Module Organization

### Single Responsibility

Each file should have one primary purpose:

```javascript
// utils/format-date.js - ONE job: format dates
export function formatDate(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale).format(date);
}

// DON'T: Multiple unrelated functions
export function formatDate() {}
export function calculateTotal() {}
export function validateEmail() {}
```

### Export Patterns

```javascript
// Named exports for utilities
export function formatCurrency(value) {}
export function formatDate(date) {}

// Default export for components
export default function UserProfile() {}

// Re-export from index for clean imports
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
```

## Import Order

Organize imports in this order:

```javascript
// 1. External dependencies
import { useState } from 'react';

// 2. Internal modules (absolute paths)
import { formatDate } from '@/utils/format';

// 3. Relative imports
import { Button } from '../components';

// 4. Styles
import './styles.css';
```

## Configuration Files

Keep configuration at project root:

```
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
├── vite.config.js
└── .env.example          # Template, never .env
```

## Documentation Location

```
docs/
├── README.md             # Project overview
├── CONTRIBUTING.md       # How to contribute
├── ARCHITECTURE.md       # System design
├── API.md                # API documentation
└── CHANGELOG.md          # Version history
```

---

> **Usage:** Follow these patterns when creating new files or reorganizing code.
