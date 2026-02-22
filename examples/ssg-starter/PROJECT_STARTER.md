# Project Starter Template

## Project Information

### Project Name
SSG Starter - Modern Static Site Generator

### Project Description
A production-ready static site with blog support, SEO optimization, and modern CSS architecture. Built as a demonstration of Claude Code Sidekick workflow.

### Project Type
static-site

---

## Goals & Objectives

### Primary Goal
Create a reusable SSG template with:
- Blog system using markdown content collections
- Comprehensive SEO (meta tags, JSON-LD structured data)
- Modern CSS with @layer architecture
- Dark theme with glass morphism effects
- Fully accessible (WCAG 2.1 AA)

### Success Criteria
- Lighthouse SEO score > 95
- Lighthouse Accessibility score > 95
- Blog posts render from markdown
- All pages include proper meta tags
- CSS uses modern features (no preprocessors)

### Non-Goals
- Server-side functionality
- Database integration
- Authentication

---

## Requirements (EARS Notation)

### Functional Requirements

1. WHEN user visits the homepage THE SYSTEM SHALL display hero section and feature cards
2. WHEN user visits /blog THE SYSTEM SHALL display a list of all published posts
3. WHEN user visits /blog/[slug] THE SYSTEM SHALL render the markdown content with proper styling
4. THE SYSTEM SHALL include Open Graph meta tags on all pages
5. THE SYSTEM SHALL include Twitter Card meta tags on all pages
6. THE SYSTEM SHALL include JSON-LD structured data for Organization and Articles

### Non-Functional Requirements

- **CSS Architecture:** Use @layer for organization (reset, base, tokens, layout, components, utilities)
- **CSS Variables:** Use namespaced custom properties for theming
- **Accessibility:** All interactive elements must be keyboard accessible
- **Accessibility:** Color contrast must meet WCAG AA standards
- **Performance:** No JavaScript frameworks, minimal client-side JS
- **Performance:** Static HTML generation for all pages

---

## Technical Stack

- **Framework:** Astro 5
- **Styling:** Modern CSS (no preprocessors)
- **Content:** Markdown with frontmatter
- **Deployment:** Static hosting (Cloudflare, Vercel, Netlify)

---

## File Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Route pages
├── content/        # Markdown content
│   └── posts/      # Blog posts
└── styles/         # Global styles (optional)
```
