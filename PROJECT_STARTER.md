# Project Starter Template

> **Instructions:** Fill out this template to define your project. The
> `/project-planner` command will analyze this document to create a
> comprehensive project plan.

---

## Project Information

### Project Name

<!-- Replace with your project name -->

North Coast AI

### Project Description

<!-- 2-3 sentences describing what this project does -->

North Coast AI is a web application that is on the cutting edge of AI
technology. Specializing in Generative AI, across multiple domains, inlcuding
blockchain, finance, manufaturing, marketing, and more, North Coast AI provides
AI-powered tools for businesses and individuals to improve their digital
operations through secure, efficient, and innovational AI solutions.

### Project Type

<!-- Select one: web-app | api | library | cli | static-site | shopify-theme | other -->

web-app

---

## Goals & Objectives

### Primary Goal

<!-- What is the main thing this project should accomplish? -->

The primary goal of this project is to create a web application that provides
AI-powered tools for businesses and individuals to improve their digital
operations through secure, efficient, and innovational AI solutions.

Right now, the project is the website for North Coast AI. We need to create a
website that is modern, responsive, and easy to navigate. It should also be easy
to update and maintain. It will be built with Astro 5, modern CSS,Vanilla JS and
deployed to Cloudflare Workers.

Primary goals include:

- Create a website for North Coast AI that is modern, responsive, and easy to
  navigate. It should also be easy to update and maintain. It will be built with
  Astro 5, modern CSS,Vanilla JS and deployed to Cloudflare Workers. We will
  focus on the following features:
  - Modern, responsive design
  - Easy to navigate
  - Easy to update and maintain
  - Built with Astro 5, modern CSS,Vanilla JS and deployed to Cloudflare
    Workers.

### Success Criteria

<!-- How will you know the project is successful? List measurable outcomes -->

- The website is unique and stands out from competitors
- The website is easy to navigate and use for users including accessibility. We
  need to be WCAG 2.1 Level AA compliant.
- We will use Cloudflare D1 for the CMS, Hono for the API, and Cloudflare
  Workers for the server.
- The website is built with Astro 5, Modern CSS (Flexbox, Grid, Custom
  Properties, nested selectors, scoped styles, layers, etc),Vanilla JS and
  deployed to Cloudflare Workers.

### Non-Goals

<!-- What is explicitly NOT part of this project? -->

---

## Requirements (EARS Notation)

> **EARS Format:** Use structured requirements for clarity and testability.
>
> - **Ubiquitous:** "THE SYSTEM SHALL [action]"
> - **Event-driven:** "WHEN [event] THE SYSTEM SHALL [response]"
> - **State-driven:** "WHILE [state] THE SYSTEM SHALL [behavior]"
> - **Optional:** "WHERE [feature enabled] THE SYSTEM SHALL [action]"
> - **Unwanted:** "IF [condition] THEN THE SYSTEM SHALL [prevent/handle]"

### Functional Requirements

<!-- Example: WHEN user clicks submit THE SYSTEM SHALL validate all form fields and display errors next to invalid fields -->

1. The website should be easy to navigate and use for users including
   accessibility. We need to be WCAG 2.1 Level AA compliant. The site should be
   built with Astro 5, modern CSS (Flexbox, Grid, Custom Properties, nested
   selectors, scoped styles, layers, etc),Vanilla JS and deployed to Cloudflare
   Workers and function on mobile devices.
2. The website requires a backend API to handle user authentication and
   authorization. The API will be built with Hono and deployed to Cloudflare
   Workers. The backend will allow for the creation of new pages, support
   friendly urls, and allow users to update the SEO data for each page. This
   includes schema.org data for search engines, JSON-LD data for search engines,
   and Open Graph data for social media. We will have the essential meta tags
   such as title, description, keywords, author, and canonical url.
3. We will use Resource hints to improve performance. This includes DNS
   prefetching, preloading, and preconnecting.
4. Modern HTML standards will be used to ensure the website is future proof and
   compatible with all modern browsers.This includes popovers, tooltips, and
   other modern features.

### Non-Functional Requirements

<!-- Example: THE SYSTEM SHALL achieve a Lighthouse performance score of 90+ -->

1. **Performance:** The website should be fast and responsive. Make use of Astro
   5's features to improve performance.
2. **Accessibility:** The website should be WCAG 2.1 Level AA compliant.
3. **Security:** The website should be secure and protected against common
   security threats.

---

## Technical Requirements

### Target Platform

<!-- Where will this run? (browser, node, both, mobile, etc.) -->

This will run in the browser but also be a PWA

### Technology Preferences

**Use:**

- Semantic HTML
- Modern CSS (Grid, Flexbox, custom properties)
- Progressive enhancement

**Avoid:**

- Utility-first CSS frameworks (unless explicitly needed)
- Heavy JavaScript frameworks (unless complexity warrants)

### Browser/Environment Support

<!-- Minimum versions, compatibility requirements -->

Anything before 2015 does not require support. Fallbacks for older browsers will
be provided.

### Performance Requirements

<!-- Load times, bundle sizes, response times, etc. -->

Vite will be used to improve performance. Vite+ is being considered for the
frontend.

---

## Features

### Core Features (Must Have)

<!-- Essential features for MVP - each should map to requirements above -->

1.
2.
3.

### Secondary Features (Should Have)

1.
2.

### Nice to Have (Could Have)

1.
2.

---

## Architecture

### High-Level Architecture

<!-- Describe the overall system design, or write "TBD" for AI to propose -->

### Key Components

1.
2.
3.

### Data Flow

<!-- How does data move through the system? -->

### External Dependencies

<!-- APIs, services, databases, etc. -->

---

## Constraints

### Timeline

### Budget/Resources

### Technical Constraints

<!-- Existing systems to integrate with, legacy support, etc. -->

---

## Questions

<!-- List any questions you need answered before or during development -->

1.
2.

---

## Quick Start Configuration

> **Choose a preset that matches your project type for instant setup**

### Project Preset

Select the option that best matches your project. This automatically configures
MCP servers, hooks, and code rules.

- [ ] **Static Website** - Semantic HTML, Modern CSS, Vanilla JavaScript
- [ ] **Astro Site** - Astro 5, Modern CSS, Islands Architecture
- [ ] **React App** - React, TypeScript, Vite, TanStack
- [ ] **Next.js App** - Next.js 15, App Router, TypeScript
- [ ] **Vue/Nuxt** - Vue 3, Nuxt, Composition API
- [ ] **SvelteKit** - Svelte 5, SvelteKit, Runes
- [ ] **Full Stack** - Complete backend + frontend + database stack
- [x] **Custom** - Manual configuration (complete sections below)

### Master Toggles

Control entire feature categories. When `FALSE`, the entire section is skipped.

- **MCP Servers**: `TRUE`
  <!-- External service integrations (databases, APIs, etc.) -->
- **Development Hooks**: `TRUE` <!-- Git hooks, auto-formatting, automation -->
- **Code Quality Rules**: `TRUE`
  <!-- Language-specific linting and standards -->
- **AI Agents**: `TRUE` <!-- Specialized agents for tasks -->

**Note:** If you selected a preset above and all master toggles are `TRUE`, skip
to [Additional Context](#additional-context). The preset will configure
everything for you.

---

## Code Rules Configuration

> **Optional:** Only configure this if you selected "Custom" above or want to
> override preset rules.

### Language Standards

- **Modern JavaScript**: `TRUE`
  <!-- ES6+, const/let, arrow functions, async/await -->
- **TypeScript**: `FALSE` <!-- Type safety, strict mode, decorators -->
- **Node.js**: `FALSE` <!-- Node-specific patterns and security -->
- **Python**: `FALSE` <!-- PEP 8, type hints, Black formatting -->

### Framework Standards

- **Astro**: `TRUE` <!-- Islands, components, content collections -->
- **React**: `FALSE` <!-- Hooks, performance, server components -->
- **Next.js**: `FALSE` <!-- App router, data fetching, optimization -->
- **Vue/Nuxt**: `FALSE` <!-- Composition API, auto-imports, Pinia -->
- **Svelte/SvelteKit**: `FALSE` <!-- Reactivity, stores, routing -->

### CSS & Styling

- **Modern CSS**: `TRUE`
  <!-- Grid, Flexbox, Custom Properties, Logical Properties -->
- **Tailwind CSS**: `FALSE` <!-- Utility-first CSS framework -->
- **Sass/SCSS**: `FALSE` <!-- Preprocessor best practices -->

### Backend & API

- **Hono**: `TRUE` <!-- Lightweight web framework patterns -->
- **Express/Fastify**: `FALSE` <!-- Node.js backend frameworks -->
- **REST API**: `FALSE` <!-- RESTful design patterns -->
- **GraphQL**: `FALSE` <!-- Schema design, resolvers -->

### Quality & Testing

- **WCAG AA Accessibility**: `TRUE` <!-- Enhanced accessibility standards -->
- **SEO Optimization**: `TRUE` <!-- Meta tags, schema.org, Open Graph -->
- **Performance**: `TRUE` <!-- Web Vitals, resource hints, optimization -->
- **Security**: `TRUE` <!-- OWASP, CSP, input validation -->
- **Testing Standards**: `FALSE` <!-- Jest, Playwright, Testing Library -->

### Platform Standards

- **Cloudflare Workers**: `TRUE` <!-- Edge computing, D1, KV, R2 -->
- **Vercel**: `FALSE` <!-- Edge functions, deployment -->
- **PWA**: `TRUE` <!-- Progressive Web App standards -->

---

## MCP Configuration

> **Optional:** Only configure this if you selected "Custom" above or want
> additional MCPs beyond your preset. **Model Context Protocol (MCP) Servers**
> extend Claude Code's capabilities by providing access to databases, APIs, and
> external services.

### Database & Storage

- **Neon Database**: `TRUE`
  <!-- PostgreSQL database operations, migrations, query tuning -->
- **Supabase**: `FALSE`
  <!-- PostgreSQL database with auth, storage, realtime -->
- **Turso**: `FALSE` <!-- Distributed SQLite database -->
- **Pinecone**: `FALSE` <!-- Vector database for AI/ML -->

### Cloud & Infrastructure

- **Cloudflare**: `TRUE` <!-- Workers, D1, KV, R2, Pages deployment -->
- **AWS**: `FALSE` <!-- EC2, S3, Lambda, RDS operations -->
- **Vercel**: `FALSE` <!-- Deployment and edge functions -->
- **Railway**: `FALSE` <!-- Database and app deployment -->

### Development Tools

- **GitHub**: `TRUE` <!-- Repository operations, issues, PRs, actions -->
- **GitLab**: `FALSE` <!-- Repository operations and CI/CD -->
- **Linear**: `FALSE` <!-- Issue tracking and project management -->
- **Sentry**: `TRUE` <!-- Error tracking and monitoring -->

### Communication

- **Slack**: `FALSE` <!-- Team notifications and updates -->
- **Discord**: `FALSE` <!-- Community and team communication -->
- **Email**: `FALSE` <!-- Transactional email via SendGrid/Resend -->

### Analytics & Monitoring

- **Google Analytics 4**: `TRUE` <!-- Web analytics and tracking -->
- **PostHog**: `FALSE` <!-- Product analytics and feature flags -->
- **Axiom**: `FALSE` <!-- Log management and analytics -->
- **Datadog**: `FALSE` <!-- Infrastructure monitoring -->

### Payments & Commerce

- **Stripe**: `TRUE` <!-- Payment processing and subscriptions -->
- **PayPal**: `FALSE` <!-- Payment processing -->
- **Shopify**: `FALSE` <!-- E-commerce platform integration -->

### AI & ML Services

- **OpenAI**: `FALSE` <!-- GPT models and embeddings -->
- **Anthropic**: `FALSE` <!-- Claude API for additional AI features -->
- **Hugging Face**: `FALSE` <!-- ML models and datasets -->
- **Replicate**: `FALSE` <!-- AI model deployment -->

### Development Services

- **Chrome DevTools**: `FALSE` <!-- Browser automation and testing -->
- **Playwright**: `FALSE` <!-- E2E testing and browser automation -->
- **Puppeteer**: `FALSE` <!-- Headless browser automation -->

### Content & Media

- **Contentful**: `FALSE` <!-- Headless CMS -->
- **Sanity**: `FALSE` <!-- Structured content platform -->
- **Cloudinary**: `FALSE` <!-- Image and video management -->
- **Uploadcare**: `FALSE` <!-- File uploading and CDN -->

### Search & Discovery

- **Algolia**: `FALSE` <!-- Search as a service -->
- **Meilisearch**: `FALSE` <!-- Open-source search engine -->
- **Typesense**: `FALSE` <!-- Fast, typo-tolerant search -->

### Custom MCPs

<!-- Add any custom MCP servers specific to your project -->

**Context7**: `FALSE` <!-- Description: Custom context management -->
**Serena**: `FALSE` <!-- Description: Custom service integration -->

### MCP Configuration Notes

<!-- Add any specific configuration requirements, API keys needed, or setup instructions -->

**Required Environment Variables:**

- NEON_API_KEY (Required for Neon Database)
- CLOUDFLARE_API_TOKEN (Required for Cloudflare)
- GITHUB_TOKEN (Required for GitHub)
- SENTRY_AUTH_TOKEN (Required for Sentry)
- STRIPE_SECRET_KEY (Required for Stripe)
- GA4_MEASUREMENT_ID (Required for Google Analytics 4)

**Setup Instructions:**

1. Run `/mcp-setup` after filling out this section to generate configuration
2. Add required API keys to your `.env` file
3. Restart Claude Code to load MCP servers

---

## Hooks Configuration

> **Optional:** Only configure this if you selected "Custom" above or want to
> override preset hooks. **Hooks** are automated actions triggered by events in
> your development workflow.

### Git Hooks

- **Pre-Commit Validation**: `TRUE`
  <!-- Lint, format, and test before commits -->
- **Pre-Push Validation**: `FALSE` <!-- Run full test suite before pushing -->
- **Commit Message Validation**: `TRUE` <!-- Enforce commit message format -->
- **Branch Name Validation**: `FALSE` <!-- Enforce branch naming conventions -->

### File Hooks

- **Auto Format on Save**: `TRUE`
  <!-- Format code automatically when saving files -->
- **Auto Import Sort**: `TRUE` <!-- Sort and organize imports on save -->
- **Auto Documentation**: `FALSE`
  <!-- Generate/update docs when code changes -->
- **Unused Code Detection**: `FALSE` <!-- Detect and warn about unused code -->

### Build & Test Hooks

- **Pre-Build Validation**: `FALSE` <!-- Validate before starting builds -->
- **Post-Build Actions**: `FALSE` <!-- Run actions after successful builds -->
- **Test on File Change**: `FALSE` <!-- Run relevant tests when files change -->
- **Coverage Reporting**: `FALSE` <!-- Generate coverage reports after tests -->

### Deployment Hooks

- **Pre-Deploy Checks**: `FALSE` <!-- Validate before deployments -->
- **Post-Deploy Verification**: `FALSE` <!-- Verify deployment success -->
- **Deployment Notifications**: `FALSE` <!-- Notify team of deployments -->
- **Rollback on Failure**: `FALSE` <!-- Auto-rollback failed deployments -->

### Code Quality Hooks

- **Complexity Analysis**: `FALSE` <!-- Analyze code complexity on changes -->
- **Security Scanning**: `FALSE` <!-- Scan for security vulnerabilities -->
- **Dependency Audit**: `FALSE` <!-- Check for vulnerable dependencies -->
- **Performance Profiling**: `FALSE` <!-- Profile performance on changes -->

### Documentation Hooks

- **README Sync**: `TRUE` <!-- Keep README in sync with code changes -->
- **API Doc Generation**: `FALSE` <!-- Generate API docs from code -->
- **Changelog Update**: `FALSE` <!-- Auto-update changelog on commits -->
- **Type Documentation**: `FALSE` <!-- Generate type documentation -->

### Collaboration Hooks

- **PR Template Creation**: `FALSE` <!-- Auto-create PR descriptions -->
- **Issue Linking**: `FALSE` <!-- Link commits to issues automatically -->
- **Code Review Requests**: `FALSE` <!-- Auto-request reviews on PRs -->
- **Status Updates**: `FALSE` <!-- Post status updates to team channels -->

### Agent Hooks

- **Task Completion Notifications**: `TRUE`
  <!-- Notify when agent tasks complete -->
- **Agent Error Handling**: `TRUE` <!-- Handle and log agent errors -->
- **Agent Performance Tracking**: `FALSE` <!-- Track agent execution metrics -->
- **Agent Context Saving**: `FALSE` <!-- Save agent context between runs -->

### Custom Hooks

<!-- Add any custom hooks specific to your project -->

**Database Migration Check**: `FALSE`

<!-- Validate migrations before applying --> **Environment Sync**: `FALSE`
<!-- Sync environment variables across team -->

### Hooks Configuration Notes

<!-- Add any specific hook configuration requirements or setup instructions -->

**Hook Execution Order:**

1. Pre-commit hooks run first
2. File hooks run on save
3. Build hooks run during build process
4. Deploy hooks run during deployment

**Setup Instructions:**

1. Run `/hooks-setup` after filling out this section to generate hook
   configurations
2. Hooks are automatically installed in your project
3. Configure hook settings in `.claude/hooks/config.json`

---

## Additional Context

### Reference Projects

### Existing Assets

---

> **Next Steps:** After completing this template, run `/project-planner` to
> generate your project plan.
