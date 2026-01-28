# Shopify Theme Project Starter

> **Instructions:** Fill out this template to define your Shopify theme project.
> The `/project-planner` command will analyze this document to create a
> comprehensive project plan.

---

## Project Information

### Project Name

<!-- Replace with your Shopify theme name -->

Your Theme Name

### Project Description

<!-- 2-3 sentences describing what this theme does -->

A modern, high-performance Shopify theme built for [industry/niche]. This theme
prioritizes conversion optimization, accessibility, and merchant customization
while maintaining exceptional performance scores.

### Project Type

<!-- Fixed value for Shopify themes -->

shopify-theme

### Theme Base

<!-- Select one: dawn | debut | custom | blank -->

dawn

---

## Goals & Objectives

### Primary Goal

<!-- What is the main thing this theme should accomplish? -->

Create a high-converting, accessible Shopify theme that provides excellent user
experience across all devices while giving merchants extensive customization
options without requiring code changes.

### Success Criteria

<!-- How will you know the theme is successful? List measurable outcomes -->

- [ ] Lighthouse Performance score of 90+ on all page types
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Mobile conversion rate within 10% of desktop
- [ ] Theme customization without code (all via theme editor)
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design that works on screens from 320px to 4K

### Non-Goals

<!-- What is explicitly NOT part of this theme? -->

- Complex app integrations (handled by merchants)
- Multi-language support beyond Shopify's built-in capabilities
- Custom backend functionality (use Shopify apps instead)

---

## Requirements (EARS Notation)

> **EARS Format:** Use structured requirements for clarity and testability.
>
> - **Ubiquitous:** "THE THEME SHALL [action]"
> - **Event-driven:** "WHEN [event] THE THEME SHALL [response]"
> - **State-driven:** "WHILE [state] THE THEME SHALL [behavior]"
> - **Optional:** "WHERE [feature enabled] THE THEME SHALL [action]"
> - **Unwanted:** "IF [condition] THEN THE THEME SHALL [prevent/handle]"

### Functional Requirements

1. THE THEME SHALL provide customizable sections for all page types (home,
   collection, product, pages)
2. WHEN a user adds a product to cart THE THEME SHALL update the cart count
   without page reload
3. THE THEME SHALL support product variants with real-time inventory updates
4. WHERE quick view is enabled THE THEME SHALL display product details in a
   modal
5. THE THEME SHALL support image galleries with zoom functionality
6. WHEN a user filters collections THE THEME SHALL update results without page
   reload
7. THE THEME SHALL provide responsive navigation that works on mobile and
   desktop
8. THE THEME SHALL support promotional banners with scheduling options
9. WHERE product recommendations are enabled THE THEME SHALL display related
   products
10. THE THEME SHALL support customer reviews integration

### Non-Functional Requirements

1. **Performance:** THE THEME SHALL achieve Lighthouse scores of 90+ across all
   metrics
2. **Accessibility:** THE THEME SHALL meet WCAG 2.1 AA standards for all
   components
3. **Responsiveness:** THE THEME SHALL display correctly on devices from 320px
   to 4K resolution
4. **Browser Support:** THE THEME SHALL work on last 2 versions of major
   browsers
5. **Load Time:** THE THEME SHALL load initial page content within 2 seconds on
   3G
6. **SEO:** THE THEME SHALL include proper schema.org markup for products and
   reviews
7. **Customization:** THE THEME SHALL allow 90% of customizations via theme
   editor

---

## Technical Requirements

### Shopify Theme Requirements

**Version:**

- Shopify CLI 3.x
- Theme Kit 2.x (optional)
- Dawn 15.0+ as base (if applicable)

**Required Shopify Features:**

- [ ] Sections Everywhere
- [ ] JSON Templates
- [ ] Dynamic Sources
- [ ] Metafields support
- [ ] Color scheme support
- [ ] App blocks

### Technology Preferences

**Use:**

- Liquid templating with modern patterns
- Semantic HTML5
- Modern CSS (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript with progressive enhancement
- Shopify Section Rendering API for dynamic updates
- CSS modules or scoped styles
- Intersection Observer for lazy loading
- Fetch API for AJAX requests

**Avoid:**

- jQuery (use vanilla JavaScript)
- Heavy JavaScript frameworks (React, Vue) unless absolutely necessary
- Inline styles (use CSS classes)
- !important declarations
- Table layouts
- Deprecated Shopify features

### Browser/Environment Support

**Minimum Versions:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

**Graceful Degradation:**

- Provide fallbacks for CSS Grid (use feature queries)
- Fallback for custom properties (where critical)
- Polyfills for IntersectionObserver (if needed)

### Performance Requirements

- **Page Load:** < 2s on 3G
- **Time to Interactive:** < 3.5s
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms
- **Image Optimization:** Use Shopify image_url filter with responsive sizes
- **JavaScript:** < 100KB gzipped total
- **CSS:** < 50KB critical CSS, rest lazy loaded

---

## Features

### Core Features (Must Have)

1. **Homepage Sections**
   - Hero/slideshow section
   - Featured collections
   - Featured products
   - Image with text
   - Newsletter signup
   - Testimonials

2. **Product Pages**
   - Product image gallery with zoom
   - Variant selector (color swatches, dropdowns)
   - Add to cart with quantity selector
   - Product description tabs
   - Size guide (where applicable)
   - Related products
   - Product reviews integration

3. **Collection Pages**
   - Product grid (responsive)
   - Filters (price, color, size, etc.)
   - Sort options
   - Pagination or infinite scroll
   - Active filters display
   - Collection banner

4. **Cart**
   - AJAX cart (drawer or page)
   - Quantity updates
   - Remove items
   - Cart notes
   - Shipping calculator
   - Cart upsells

5. **Navigation**
   - Mega menu support
   - Mobile hamburger menu
   - Search with autocomplete
   - Account links
   - Cart icon with count

### Secondary Features (Should Have)

1. Quick view modal for products
2. Product comparison
3. Wishlist/save for later
4. Recently viewed products
5. Sticky header on scroll
6. Back to top button
7. Image lazy loading
8. Video support in product galleries
9. Product badges (new, sale, sold out)
10. Color scheme customization

### Nice to Have (Could Have)

1. Predictive search
2. Product recommendations AI
3. 360-degree product viewer
4. Size finder tool
5. Live chat integration
6. Multi-currency support
7. Geolocation for store locator
8. Age verification modal
9. Cookie consent banner
10. Advanced filtering (price sliders, multi-select)

---

## Architecture

### High-Level Architecture

```
shopify-theme/
├── assets/           # CSS, JS, images, fonts
├── config/          # Theme settings schema
├── layout/          # Base templates (theme.liquid, etc.)
├── locales/         # Translation files
├── sections/        # Reusable sections
├── snippets/        # Reusable code snippets
├── templates/       # Legacy templates (if needed)
└── templates/customers/ # Customer account templates
```

### Key Components

1. **Layout System**
   - theme.liquid (main layout)
   - Optional alternative layouts (checkout, gift_card)

2. **Section Library**
   - Modular sections with schemas
   - Blocks for customization
   - Presets for quick setup

3. **Snippet Library**
   - Product card
   - Icon system
   - Form components
   - Loading states

4. **Asset Management**
   - Critical CSS inlined
   - Non-critical CSS lazy loaded
   - JavaScript modules
   - Optimized images (WebP with fallbacks)

### Data Flow

1. **Page Load**
   - Server renders Liquid
   - Critical CSS loads inline
   - Main content displays (FCP)
   - JavaScript enhances progressively

2. **Dynamic Updates**
   - User interaction triggers event
   - JavaScript makes API request
   - Section Rendering API returns HTML
   - DOM updates without page reload

3. **Cart Management**
   - Add to cart via AJAX API
   - Cart updates via Section Rendering API
   - Cart drawer/page re-renders
   - Analytics event fires

### External Dependencies

**Required Shopify APIs:**

- Cart API (AJAX cart operations)
- Section Rendering API (dynamic updates)
- Storefront API (optional for advanced features)

**Recommended Apps:**

- Product reviews app (Judge.me, Yotpo, etc.)
- Email marketing (Klaviyo, Mailchimp)
- SEO optimization (Plug in SEO)
- Analytics (Google Analytics, Facebook Pixel)

**Optional Services:**

- CDN for custom assets (Cloudinary, Imgix)
- Font hosting (Google Fonts, Adobe Fonts)

---

## Constraints

### Timeline

<!-- Add your timeline constraints -->

- Phase 1 (Foundation): [X weeks]
- Phase 2 (Core Features): [X weeks]
- Phase 3 (Secondary Features): [X weeks]
- Phase 4 (Testing & Launch): [X weeks]

### Budget/Resources

<!-- Resource constraints -->

- Development team size: [number]
- Shopify Partner Store for testing
- Shopify theme development tools/subscriptions

### Technical Constraints

<!-- Shopify-specific constraints -->

- Must work with Shopify's existing infrastructure
- Theme file size limits (5MB max per file)
- Liquid render limits (avoid complex nested loops)
- App block compatibility required
- No server-side code outside Liquid

---

## Code Quality Standards

### Liquid Standards

- Use `{%- liquid -%}` tag for cleaner multi-line logic
- Implement null checks for all Liquid objects
- Use `| default:` filter for fallback values
- Comment complex Liquid logic
- Follow snake_case for Liquid variables
- Use semantic HTML5 elements
- Add `{{ section.shopify_attributes }}` to all sections

### CSS Standards

- Use CSS custom properties for theming
- Follow BEM naming convention
- Mobile-first responsive design
- Use CSS Grid and Flexbox (no floats)
- Implement logical properties for RTL support
- Avoid !important unless absolutely necessary
- Keep specificity low

### JavaScript Standards

- Use ES6+ modern JavaScript
- Avoid jQuery
- Progressive enhancement approach
- Event delegation for dynamic content
- Debounce/throttle expensive operations
- Async/await for API calls
- Error handling with try/catch

### Accessibility Standards

- WCAG 2.1 AA compliance
- Semantic HTML
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Color contrast ratios (4.5:1 minimum)
- Screen reader testing

---

## Questions

<!-- List any questions you need answered before or during development -->

1. What is the primary product category (affects section design)?
2. Are there existing brand guidelines (colors, fonts, style)?
3. What Shopify plan will the store use (affects API limits)?
4. Do you need multi-language support?
5. What apps should the theme integrate with?
6. Are there any competitor themes to reference or avoid?
7. What is the target audience demographic?
8. Do you need B2B features (wholesale pricing, customer groups)?

---

## Quick Start Configuration

> **Shopify Theme Preset** - Automatically configures MCP servers, hooks, and
> code rules for Shopify development.

### Master Toggles

Control entire feature categories.

- **MCP Servers**: `TRUE` <!-- Shopify CLI, Context7 for documentation -->
- **Development Hooks**: `TRUE` <!-- Git hooks, theme-check automation -->
- **Code Quality Rules**: `TRUE` <!-- Liquid, CSS, JavaScript standards -->
- **AI Agents**: `TRUE` <!-- Shopify Theme Developer agent -->

---

## Code Rules Configuration

### Language Standards

- **Modern JavaScript**: `TRUE`
- **Liquid Templating**: `TRUE`
- **TypeScript**: `FALSE` (unless building advanced features)

### CSS & Styling

- **Modern CSS**: `TRUE`
- **Sass/SCSS**: `FALSE` (Dawn uses CSS, avoid preprocessing)
- **Tailwind CSS**: `FALSE` (not compatible with Shopify theme customization)

### Quality & Testing

- **WCAG AA Accessibility**: `TRUE`
- **SEO Optimization**: `TRUE`
- **Performance**: `TRUE`
- **Security**: `TRUE`

### Shopify Standards

- **Liquid Best Practices**: `TRUE`
- **Theme Check Linting**: `TRUE`
- **Section Schema Standards**: `TRUE`
- **App Block Compatibility**: `TRUE`

---

## MCP Configuration

### Development Tools

- **GitHub**: `TRUE` <!-- Theme version control -->
- **Context7**: `TRUE` <!-- Shopify Liquid documentation -->

### Shopify Tools

- **Shopify CLI**: `TRUE` <!-- Theme development and testing -->
- **Shopify Theme Check**: `TRUE` <!-- Liquid linting -->

### Analytics & Monitoring

- **Google Analytics 4**: `TRUE` <!-- E-commerce tracking -->
- **Sentry**: `FALSE` (optional for JavaScript error tracking)

---

## Hooks Configuration

### Git Hooks

- **Pre-Commit Validation**: `TRUE` <!-- Run theme-check before commits -->
- **Commit Message Validation**: `TRUE`

### File Hooks

- **Auto Format on Save**: `TRUE` <!-- Prettier for CSS/JS -->
- **Liquid Linting**: `TRUE` <!-- Theme Check on save -->

### Theme Hooks

- **Theme Check on Build**: `TRUE`
- **Performance Audit**: `TRUE` (run Lighthouse before deploy)

---

## Additional Context

### Reference Projects

<!-- Link to similar themes or design inspiration -->

- [Dawn theme](https://github.com/Shopify/dawn) - Base reference
- [Competitor theme examples]

### Existing Assets

<!-- Brand assets, design files, content -->

- Brand guidelines: [location]
- Logo files: [location]
- Product images: [location]
- Content copy: [location]

### Shopify Store Details

- **Store URL:** [yourstore.myshopify.com]
- **Shopify Plan:** [Basic/Shopify/Advanced/Plus]
- **Existing Theme:** [current theme name]
- **Migration Required:** [Yes/No]

---

> **Next Steps:** After completing this template, run `/project-planner` to
> generate your Shopify theme development plan.
