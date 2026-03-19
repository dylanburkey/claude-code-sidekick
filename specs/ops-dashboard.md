# Spec: Ops Dashboard (ops.codesidekick.xyz)

> Personal command center for managing Asana, Cloudflare, and GitHub from one
> private web interface.

## Overview

A SvelteKit web dashboard served privately via Tailscale at
`ops.codesidekick.xyz`. Replaces context-switching between Asana, the Cloudflare
dashboard, and GitHub by surfacing the most actionable data from each service in
a single, fast UI.

## Target User

Dylan Burkey — solo developer. No auth required (Tailscale network access is the
security boundary).

---

## Requirements (EARS Notation)

### Global

- THE SYSTEM SHALL load the initial dashboard shell in under 1.5 seconds.
- THE SYSTEM SHALL never expose API tokens to the client; all service calls MUST
  be proxied through SvelteKit server routes.
- THE SYSTEM SHALL work without JavaScript for read-only views (progressive
  enhancement).
- THE SYSTEM SHALL meet WCAG 2.1 AA accessibility standards.

### Navigation

- THE SYSTEM SHALL display a persistent top navigation with tabs: Asana ·
  Cloudflare · GitHub.
- WHEN a tab is activated THE SYSTEM SHALL lazy-fetch its data on first load
  only, then cache the result for the session.
- THE SYSTEM SHALL preserve the active tab across page refreshes via the URL
  hash (`#asana`, `#cloudflare`, `#github`).

### Asana Tab

- THE SYSTEM SHALL display all open tasks from the workspace associated with
  `ASANA_API_KEY`, grouped by project.
- THE SYSTEM SHALL show task name, assignee, due date, and completion status for
  each task.
- WHEN a task's checkbox is clicked THE SYSTEM SHALL mark it complete via the
  Asana API and optimistically update the UI.
- THE SYSTEM SHALL provide a text filter input that narrows tasks by name in
  real time (client-side, no re-fetch).
- WHERE a task has a due date in the past THE SYSTEM SHALL visually flag it as
  overdue.

### Cloudflare Tab

- THE SYSTEM SHALL display resources across the account grouped by type: Pages ·
  Workers · Workers AI · R2 · D1.
- THE SYSTEM SHALL fetch all five resource types in parallel to minimise load
  time.
- THE SYSTEM SHALL show for each resource: name, status/last-deployed, and a
  direct link to the Cloudflare dashboard.
- THE SYSTEM SHALL provide a single filter input that searches across all
  resource types simultaneously.
- WHEN a resource type group is empty THE SYSTEM SHALL hide the group header.

### GitHub Tab

- THE SYSTEM SHALL display open pull requests and open issues across all repos
  owned by the authenticated user, sorted by last updated.
- THE SYSTEM SHALL show for each item: repo name, title, labels, and age.
- THE SYSTEM SHALL provide a filter to show All · PRs only · Issues only.
- WHEN an item is clicked THE SYSTEM SHALL open it in a new tab on GitHub.

### Error Handling

- IF an API call fails THE SYSTEM SHALL display an inline error message within
  the affected tab without breaking other tabs.
- IF `ASANA_API_KEY` is not set THE SYSTEM SHALL display a configuration notice
  in the Asana tab.
- IF `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` is not set THE SYSTEM
  SHALL display a configuration notice in the Cloudflare tab.
- IF `GITHUB_TOKEN` is not set THE SYSTEM SHALL display a configuration notice
  in the GitHub tab.

---

## Service API Details

### Asana

- Base URL: `https://app.asana.com/api/1.0`
- Auth: `Authorization: Bearer {ASANA_API_KEY}`
- Endpoints used:
  - `GET /workspaces` → resolve workspace GID
  - `GET /tasks?workspace={gid}&assignee=me&completed_since=now` → open tasks
  - `PUT /tasks/{task_gid}` → mark complete

### Cloudflare

- Base URL: `https://api.cloudflare.com/client/v4`
- Auth: `Authorization: Bearer {CLOUDFLARE_API_TOKEN}`
- Account ID: `CLOUDFLARE_ACCOUNT_ID`
- Endpoints used:
  - `GET /accounts/{id}/pages/projects`
  - `GET /accounts/{id}/workers/scripts`
  - `GET /accounts/{id}/ai/models/search`
  - `GET /accounts/{id}/r2/buckets`
  - `GET /accounts/{id}/d1/database`

### GitHub

- Base URL: `https://api.github.com`
- Auth: `Authorization: Bearer {GITHUB_TOKEN}`
- Endpoints used:
  - `GET /issues?filter=all&state=open` → issues + PRs across all repos

---

## Tech Stack

| Layer      | Choice                | Reason                                         |
| ---------- | --------------------- | ---------------------------------------------- |
| Framework  | SvelteKit             | Lightweight, SSR + API routes in one, fast DX  |
| Styling    | Modern CSS / BEM      | No framework bloat, custom properties          |
| Deployment | Coolify (home server) | Docker container, auto-deploy on push          |
| Access     | Cloudflare Tunnel     | Expose Coolify service at ops.codesidekick.xyz |
| Runtime    | Node 20               | LTS, matches .nvmrc standard                   |

---

## Project Structure

```
ops-dashboard/
├── src/
│   ├── lib/
│   │   ├── api/
│   │   │   ├── asana.ts       # Asana API client (server-only)
│   │   │   ├── cloudflare.ts  # Cloudflare API client (server-only)
│   │   │   └── github.ts      # GitHub API client (server-only)
│   │   └── types.ts           # Shared TypeScript interfaces
│   ├── routes/
│   │   ├── +page.svelte       # Dashboard shell + tab switcher
│   │   ├── +layout.svelte     # App shell, nav, global styles
│   │   └── api/
│   │       ├── asana/
│   │       │   ├── tasks/+server.ts
│   │       │   └── complete/+server.ts
│   │       ├── cloudflare/
│   │       │   └── resources/+server.ts
│   │       └── github/
│   │           └── items/+server.ts
│   ├── components/
│   │   ├── TabNav.svelte
│   │   ├── AsanaTab.svelte
│   │   ├── CloudflareTab.svelte
│   │   ├── GitHubTab.svelte
│   │   ├── FilterInput.svelte
│   │   ├── ErrorState.svelte
│   │   └── ConfigNotice.svelte
│   └── styles/
│       ├── _variables.css
│       ├── _reset.css
│       ├── _typography.css
│       └── main.css
├── .env                       # Local secrets (gitignored)
├── .env.example               # Key names only
├── .nvmrc                     # 20
├── Dockerfile                 # Production container
├── docker-compose.yml         # Local dev with hot reload
└── svelte.config.js
```

---

## Phase Breakdown

### Phase 1 — Project scaffold & shell

SvelteKit project, layout, tab navigation, CSS custom properties, empty tab
placeholders, Dockerfile, deploy config.

### Phase 2 — Cloudflare tab

Server route, API client, resource display, filter input.

### Phase 3 — GitHub tab

Server route, API client, issues/PRs display, filter.

### Phase 4 — Asana tab

Server route, API client, task list, complete action, overdue flagging.

### Phase 5 — Polish & deploy

Error states, config notices, loading skeletons, Coolify deploy, Cloudflare
Tunnel config, production smoke test.
