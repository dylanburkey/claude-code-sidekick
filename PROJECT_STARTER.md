# Project Starter Template

> **Instructions:** Fill out this template to define your project. The `/project-planner` command will analyze this document to create a comprehensive project plan.

---

## Project Information

### Project Name
<!-- Replace with your project name -->
North Coast AI

### Project Description
<!-- 2-3 sentences describing what this project does -->
North Coast AI is a web application that is on the cutting edge of AI technology. Specializing in Generative AI, across multiple domains, inlcuding blockchain, finance, manufaturing, marketing, and more, North Coast AI provides AI-powered tools for businesses and individuals to improve their digital operations through secure, efficient, and innovational AI solutions.

### Project Type
<!-- Select one: web-app | api | library | cli | static-site | shopify-theme | other -->
web-app

---

## Goals & Objectives

### Primary Goal
<!-- What is the main thing this project should accomplish? -->
The primary goal of this project is to create a web application that provides AI-powered tools for businesses and individuals to improve their digital operations through secure, efficient, and innovational AI solutions. 

Right now, the project is the website for North Coast AI. We need to create a website that is modern, responsive, and easy to navigate. It should also be easy to update and maintain. It will be built with Astro 5, modern CSS,Vanilla JS and deployed to Cloudflare Workers.

Primary goals include:

 - Create a website for North Coast AI that is modern, responsive, and easy to navigate. It should also be easy to update and maintain. It will be built with Astro 5, modern CSS,Vanilla JS and deployed to Cloudflare Workers. We will focus on the following features:
   - Modern, responsive design
   - Easy to navigate
   - Easy to update and maintain
   - Built with Astro 5, modern CSS,Vanilla JS and deployed to Cloudflare Workers.
 
### Success Criteria
<!-- How will you know the project is successful? List measurable outcomes -->
- The website is unique and stands out from competitors
- The website is easy to navigate and use for users including accessibility. We need to be WCAG 2.1 Level AA compliant.
- We will use Cloudflare D1 for the CMS, Hono for the API, and Cloudflare Workers for the server.
- The website is built with Astro 5, Modern CSS (Flexbox, Grid, Custom Properties, nested selectors, scoped styles, layers, etc),Vanilla JS and deployed to Cloudflare Workers.

### Non-Goals
<!-- What is explicitly NOT part of this project? -->

---

## Requirements (EARS Notation)

> **EARS Format:** Use structured requirements for clarity and testability.
> - **Ubiquitous:** "THE SYSTEM SHALL [action]"
> - **Event-driven:** "WHEN [event] THE SYSTEM SHALL [response]"
> - **State-driven:** "WHILE [state] THE SYSTEM SHALL [behavior]"
> - **Optional:** "WHERE [feature enabled] THE SYSTEM SHALL [action]"
> - **Unwanted:** "IF [condition] THEN THE SYSTEM SHALL [prevent/handle]"

### Functional Requirements

<!-- Example: WHEN user clicks submit THE SYSTEM SHALL validate all form fields and display errors next to invalid fields -->

1. The website should be easy to navigate and use for users including accessibility. We need to be WCAG 2.1 Level AA compliant. The site should be built with Astro 5, modern CSS (Flexbox, Grid, Custom Properties, nested selectors, scoped styles, layers, etc),Vanilla JS and deployed to Cloudflare Workers and function on mobile devices.
2. The website requires a backend API to handle user authentication and authorization. The API will be built with Hono and deployed to Cloudflare Workers. The backend will allow for the creation of new pages, support friendly urls, and allow users to update the SEO data for each page. This includes schema.org data for search engines, JSON-LD data for search engines, and Open Graph data for social media. We will have the essential meta tags such as title, description, keywords, author, and canonical url.
3. We will use Resource hints to improve performance. This includes DNS prefetching, preloading, and preconnecting.
4. Modern HTML standards will be used to ensure the website is future proof and compatible with all modern browsers.This includes popovers, tooltips, and other modern features.

### Non-Functional Requirements

<!-- Example: THE SYSTEM SHALL achieve a Lighthouse performance score of 90+ -->

1. **Performance:** The website should be fast and responsive. Make use of Astro 5's features to improve performance.
2. **Accessibility:** The website should be WCAG 2.1 Level AA compliant.
3. **Security:** The website should be secure and protected against common security threats.

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
Anything before 2015 does not require support. Fallbacks for older browsers will be provided.

### Performance Requirements
<!-- Load times, bundle sizes, response times, etc. -->
Vite will be used to improve performance. Vite+ is being considered for the frontend.

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

## Additional Context

### Reference Projects


### Existing Assets


---

> **Next Steps:** After completing this template, run `/project-planner` to generate your project plan.

