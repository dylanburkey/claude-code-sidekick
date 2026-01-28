# WordPress Theme/Plugin Project Starter

> **Instructions:** Fill out this template to define your WordPress theme or
> plugin project. The `/project-planner` command will analyze this document to
> create a comprehensive project plan.

---

## Project Information

### Project Name

<!-- Replace with your WordPress theme or plugin name -->

Your Theme/Plugin Name

### Project Description

<!-- 2-3 sentences describing what this theme/plugin does -->

A modern, high-performance WordPress [theme/plugin] built for [purpose/niche].
This project prioritizes performance, accessibility, and user experience while
maintaining compatibility with the WordPress ecosystem.

### Project Type

<!-- Select one: wordpress-theme | wordpress-plugin | wordpress-both -->

wordpress-theme

### WordPress Project Approach

<!-- Select one: block-theme | classic-theme | hybrid-theme | plugin | multisite -->

block-theme

---

## Goals & Objectives

### Primary Goal

<!-- What is the main thing this project should accomplish? -->

Create a modern, performant WordPress [theme/plugin] that provides excellent
user experience while maintaining compatibility with WordPress standards and
ecosystem.

### Success Criteria

<!-- How will you know the project is successful? List measurable outcomes -->

- [ ] WordPress.org theme/plugin guidelines compliance
- [ ] Lighthouse Performance score of 90+
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] PHP 8.0+ compatibility
- [ ] WordPress 6.0+ compatibility
- [ ] No jQuery dependencies (use vanilla JavaScript)
- [ ] Full Site Editing support (for block themes)
- [ ] Responsive design (320px to 4K)
- [ ] Cross-browser compatibility

### Non-Goals

<!-- What is explicitly NOT part of this project? -->

- Support for WordPress versions below 6.0
- Support for PHP versions below 8.0
- Internet Explorer support
- jQuery-dependent functionality

---

## Requirements (EARS Notation)

> **EARS Format:** Use structured requirements for clarity and testability.
>
> - **Ubiquitous:** "THE [THEME/PLUGIN] SHALL [action]"
> - **Event-driven:** "WHEN [event] THE [THEME/PLUGIN] SHALL [response]"
> - **State-driven:** "WHILE [state] THE [THEME/PLUGIN] SHALL [behavior]"
> - **Optional:** "WHERE [feature enabled] THE [THEME/PLUGIN] SHALL [action]"
> - **Unwanted:** "IF [condition] THEN THE [THEME/PLUGIN] SHALL
>   [prevent/handle]"

### Functional Requirements (Theme)

1. THE THEME SHALL support Full Site Editing with block patterns and templates
2. THE THEME SHALL provide customizable global styles via theme.json
3. WHEN a user edits a page THE THEME SHALL display all custom blocks in the
   block inserter
4. THE THEME SHALL support dynamic block patterns for common layouts
5. THE THEME SHALL provide responsive navigation patterns
6. WHERE featured images are enabled THE THEME SHALL display them responsively
7. THE THEME SHALL support custom post types and taxonomies
8. THE THEME SHALL include accessible skip links and ARIA landmarks
9. THE THEME SHALL support internationalization (i18n) and translation-ready
   strings
10. THE THEME SHALL include template parts for headers, footers, and sidebars

### Functional Requirements (Plugin)

1. THE PLUGIN SHALL register custom blocks using the Block API
2. THE PLUGIN SHALL provide admin settings page with organized options
3. WHEN settings are saved THE PLUGIN SHALL validate and sanitize all input
4. THE PLUGIN SHALL register custom post types and taxonomies (if needed)
5. THE PLUGIN SHALL provide shortcodes for legacy editor support
6. WHERE REST API is enabled THE PLUGIN SHALL register custom endpoints
7. THE PLUGIN SHALL enqueue assets only where needed (not globally)
8. THE PLUGIN SHALL provide uninstall hook to clean up database
9. THE PLUGIN SHALL support multisite installations
10. THE PLUGIN SHALL use WordPress coding standards

### Non-Functional Requirements

1. **Performance:** THE [THEME/PLUGIN] SHALL achieve Lighthouse scores of 90+
2. **Accessibility:** THE [THEME/PLUGIN] SHALL meet WCAG 2.1 AA standards
3. **Security:** THE [THEME/PLUGIN] SHALL sanitize all input and escape all
   output
4. **Compatibility:** THE [THEME/PLUGIN] SHALL work with popular plugins
   (WooCommerce, Yoast, etc.)
5. **Code Quality:** THE [THEME/PLUGIN] SHALL follow WordPress Coding Standards
6. **Documentation:** THE [THEME/PLUGIN] SHALL include inline documentation
   (PHPDoc)
7. **Translation:** THE [THEME/PLUGIN] SHALL be translation-ready with proper
   text domains

---

## Technical Requirements

### WordPress Requirements

**Minimum Versions:**

- WordPress: 6.0+
- PHP: 8.0+
- MySQL: 5.7+ or MariaDB 10.3+

**Required WordPress Features:**

- [ ] Block Editor (Gutenberg) support
- [ ] Full Site Editing (for block themes)
- [ ] theme.json for global styles
- [ ] Block patterns
- [ ] Template parts
- [ ] Custom block development (if applicable)
- [ ] REST API integration (if applicable)

### Technology Preferences

**Use:**

- PHP 8.0+ with type hints and modern features
- WordPress Block API for blocks
- React for block editor components (if needed)
- Vanilla JavaScript for frontend (no jQuery)
- Modern CSS (Grid, Flexbox, Custom Properties)
- WordPress Coding Standards (WPCS)
- Composer for dependency management
- npm/webpack for asset building

**Avoid:**

- jQuery (use vanilla JavaScript)
- Outdated PHP syntax (use modern PHP)
- Inline styles (use enqueued stylesheets)
- Direct database queries (use WordPress APIs)
- Global variables (use proper scoping)
- eval() and similar dangerous functions
- Deprecated WordPress functions

### Browser/Environment Support

**Minimum Versions:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

**No Support:**

- Internet Explorer (any version)
- Legacy Edge (pre-Chromium)

### Performance Requirements

- **Page Load:** < 2s on 3G
- **Time to Interactive:** < 3.5s
- **First Contentful Paint:** < 1.5s
- **PHP Memory:** < 64MB per request
- **Database Queries:** < 50 per page load
- **Asset Size:** CSS < 50KB, JS < 100KB (gzipped)
- **Image Optimization:** Responsive images with srcset

---

## Features

### Core Features (Must Have) - Theme

1. **Full Site Editing**
   - Global styles via theme.json
   - Block patterns library
   - Template parts (header, footer)
   - Template system

2. **Block Patterns**
   - Hero sections
   - Call to action patterns
   - Testimonial layouts
   - Gallery patterns
   - Pricing tables

3. **Typography System**
   - Custom font pairings
   - Fluid typography
   - Responsive line heights
   - Proper hierarchy

4. **Color System**
   - Color palettes in theme.json
   - Dark mode support (optional)
   - Accessible color combinations

5. **Responsive Design**
   - Mobile-first approach
   - Breakpoint system
   - Responsive images

### Core Features (Must Have) - Plugin

1. **Custom Blocks**
   - [List your custom blocks]
   - Block variations
   - Block styles

2. **Admin Interface**
   - Settings page
   - Dashboard widgets (if needed)
   - Admin notices

3. **Frontend Functionality**
   - [Core functionality]
   - Shortcode support
   - Widget support (if needed)

4. **Data Management**
   - Custom post types
   - Custom taxonomies
   - Custom fields/meta

5. **API Integration**
   - REST API endpoints
   - AJAX handlers
   - Webhooks (if needed)

### Secondary Features (Should Have)

1. Advanced block patterns
2. Animation support
3. Custom widgets
4. WooCommerce integration
5. Social media integration
6. Performance optimizations (lazy loading, etc.)
7. Schema.org markup
8. Open Graph meta tags
9. Breadcrumbs
10. Custom page templates

### Nice to Have (Could Have)

1. One-click demo import
2. Custom Gutenberg controls
3. Advanced color schemes
4. Typography presets
5. Layout presets
6. Custom dashboard
7. Analytics integration
8. Newsletter integration
9. Advanced caching
10. CDN integration

---

## Architecture

### High-Level Architecture (Theme)

```
wordpress-theme/
├── assets/               # CSS, JS, images
│   ├── css/
│   ├── js/
│   └── images/
├── block-patterns/       # Block pattern definitions
├── parts/               # Template parts
├── templates/           # Block templates
├── functions.php        # Theme setup and functions
├── theme.json          # Global styles and settings
├── style.css           # Theme stylesheet (required)
└── README.txt          # Theme documentation
```

### High-Level Architecture (Plugin)

```
wordpress-plugin/
├── admin/               # Admin-specific functionality
│   ├── css/
│   ├── js/
│   └── partials/
├── includes/            # Core plugin functionality
│   ├── class-activator.php
│   ├── class-deactivator.php
│   └── class-loader.php
├── public/              # Public-facing functionality
│   ├── css/
│   ├── js/
│   └── partials/
├── languages/           # Translation files
├── plugin-name.php     # Main plugin file
└── README.txt          # Plugin documentation
```

### Key Components (Theme)

1. **theme.json**
   - Settings (color, typography, spacing)
   - Styles (global, blocks)
   - Custom templates

2. **Block Patterns**
   - Categorized patterns
   - Reusable layouts
   - Pattern library

3. **Template System**
   - index.html (required)
   - singular.html, archive.html
   - Custom templates
   - Template parts

4. **Asset Management**
   - Enqueued stylesheets
   - Enqueued scripts
   - Editor styles

### Key Components (Plugin)

1. **Plugin Class Structure**
   - Activator (setup)
   - Deactivator (cleanup)
   - Loader (hooks)
   - Admin class
   - Public class

2. **Block Registration**
   - Block.json metadata
   - PHP render callbacks
   - JavaScript components
   - Block styles

3. **Settings API**
   - Settings sections
   - Settings fields
   - Sanitization callbacks
   - Validation

4. **Database Layer**
   - Custom tables (if needed)
   - Meta data handling
   - Query optimization

### Data Flow

1. **Frontend Request (Theme)**
   - WordPress loads template
   - theme.json styles applied
   - Block patterns rendered
   - Assets enqueued
   - Page displayed

2. **Block Editor (Both)**
   - Editor loads
   - Custom blocks registered
   - Block controls rendered
   - Save attributes to post content
   - Render on frontend

3. **Admin Settings (Plugin)**
   - Settings page loads
   - Form displays current values
   - User submits form
   - Validation runs
   - Sanitization runs
   - Save to database

### External Dependencies

**WordPress Core:**

- Block Editor (Gutenberg)
- REST API
- Customizer API (for classic themes)
- Settings API
- Template hierarchy

**Recommended Plugins Compatibility:**

- WooCommerce
- Yoast SEO
- Contact Form 7
- WPForms
- Advanced Custom Fields

**Build Tools:**

- @wordpress/scripts (recommended)
- webpack
- Babel
- Sass/PostCSS

---

## Constraints

### Timeline

<!-- Add your timeline constraints -->

- Phase 1 (Foundation): [X weeks]
- Phase 2 (Core Features): [X weeks]
- Phase 3 (Testing): [X weeks]
- Phase 4 (WordPress.org Submission): [X weeks]

### Budget/Resources

<!-- Resource constraints -->

- Development team size: [number]
- WordPress.org hosting (free)
- Development environment (Local, MAMP, etc.)

### Technical Constraints

<!-- WordPress-specific constraints -->

- Must follow WordPress.org guidelines
- Must pass Theme/Plugin Check
- Must work with WordPress Multisite
- Must not modify core files
- Must use WordPress APIs exclusively

---

## Code Quality Standards

### PHP Standards

- Follow WordPress PHP Coding Standards
- Use PHPDoc for all functions and classes
- Type hints for function parameters and return values
- Namespace organization (for plugins)
- Proper error handling
- Nonces for form submissions
- Capability checks for admin actions
- Data sanitization and validation
- Output escaping

### JavaScript Standards

- Use ES6+ modern JavaScript
- No jQuery dependencies
- WordPress JavaScript Coding Standards
- JSDoc for documentation
- Event delegation
- Progressive enhancement
- Async/await for AJAX
- Error handling

### CSS Standards

- Follow WordPress CSS Coding Standards
- Mobile-first approach
- BEM or similar naming convention
- CSS custom properties for theming
- Responsive design patterns
- Print styles where appropriate

### Accessibility Standards

- WCAG 2.1 AA compliance
- Semantic HTML
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation
- Focus management
- Color contrast requirements
- Screen reader testing

### WordPress Standards

- Use WordPress hooks system
- Follow template hierarchy
- Use WordPress functions (wp_enqueue_script, etc.)
- Internationalization (i18n)
- Proper text domains
- Prefixed function names
- No direct file access
- Proper uninstall cleanup

---

## Questions

<!-- List any questions you need answered before or during development -->

1. Will this be submitted to WordPress.org directory?
2. What plugins should it be compatible with?
3. Do you need WooCommerce integration?
4. Will this use custom post types?
5. Do you need multisite support?
6. What is the target user base (beginners, developers, enterprises)?
7. Are there existing design assets or brand guidelines?
8. Do you need custom Gutenberg blocks?
9. Should it support the Classic Editor?
10. Do you need migration from an existing theme/plugin?

---

## Quick Start Configuration

> **WordPress Preset** - Automatically configures MCP servers, hooks, and code
> rules for WordPress development.

### Master Toggles

Control entire feature categories.

- **MCP Servers**: `TRUE` <!-- WordPress.org API, documentation -->
- **Development Hooks**: `TRUE` <!-- Git hooks, PHPCS automation -->
- **Code Quality Rules**: `TRUE` <!-- PHP, JavaScript, CSS standards -->
- **AI Agents**: `TRUE` <!-- Development agents -->

---

## Code Rules Configuration

### Language Standards

- **PHP**: `TRUE` (8.0+ with WordPress standards)
- **Modern JavaScript**: `TRUE` (ES6+, no jQuery)
- **TypeScript**: `FALSE` (unless building complex blocks)

### CSS & Styling

- **Modern CSS**: `TRUE`
- **Sass/SCSS**: `TRUE` (optional for build process)
- **Tailwind CSS**: `FALSE` (not recommended for WordPress themes)

### WordPress Standards

- **WordPress Coding Standards**: `TRUE`
- **Theme Check**: `TRUE` (for themes)
- **Plugin Check**: `TRUE` (for plugins)
- **Block Development Standards**: `TRUE`
- **Accessibility Standards**: `TRUE`

### Quality & Testing

- **WCAG AA Accessibility**: `TRUE`
- **SEO Optimization**: `TRUE`
- **Performance**: `TRUE`
- **Security**: `TRUE` (sanitization, validation, escaping)
- **PHPUnit Testing**: `TRUE` (recommended)

---

## MCP Configuration

### Development Tools

- **GitHub**: `TRUE` <!-- Version control -->
- **Context7**: `TRUE` <!-- WordPress documentation -->

### WordPress Tools

- **WordPress CLI**: `TRUE` <!-- wp-cli for development -->
- **Theme/Plugin Check**: `TRUE` <!-- Automated checking -->

### Testing Tools

- **PHPUnit**: `TRUE` <!-- Unit testing -->
- **Playwright**: `FALSE` (optional for E2E testing)

---

## Hooks Configuration

### Git Hooks

- **Pre-Commit Validation**: `TRUE` <!-- PHPCS, ESLint -->
- **Commit Message Validation**: `TRUE`

### File Hooks

- **Auto Format on Save**: `TRUE` <!-- PHPCBF, Prettier -->
- **PHP Linting**: `TRUE` <!-- PHPCS on save -->

### WordPress Hooks

- **Theme Check on Build**: `TRUE` (for themes)
- **Plugin Check on Build**: `TRUE` (for plugins)
- **i18n Check**: `TRUE` <!-- Translation string validation -->

---

## Additional Context

### Reference Projects

<!-- Link to similar themes/plugins -->

- WordPress Default Theme (Twenty Twenty-Four)
- [Other reference themes/plugins]

### Existing Assets

<!-- Brand assets, design files -->

- Design mockups: [location]
- Brand guidelines: [location]
- Logo files: [location]

### WordPress Environment

- **Development URL:** [local.wordpress.test]
- **WordPress Version:** [6.x]
- **PHP Version:** [8.x]
- **Database:** [MySQL/MariaDB]

---

> **Next Steps:** After completing this template, run `/project-planner` to
> generate your WordPress project development plan.
