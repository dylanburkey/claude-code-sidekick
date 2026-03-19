# Project Plan: Ops Dashboard

> Derived from `specs/ops-dashboard.md` Personal command center — Asana ·
> Cloudflare · GitHub

---

## Phase 1 — Scaffold & Shell

**Goal:** Runnable SvelteKit app with navigation, empty tab placeholders, full
CSS system, and Docker setup. No external API calls yet.

### Deliverables

- [ ] `~/dev/projects/ops-dashboard/` created and initialised
- [ ] SvelteKit project with TypeScript, Node adapter
- [ ] `.nvmrc` set to `20`
- [ ] CSS custom properties system (`_variables.css`, `_reset.css`)
- [ ] `+layout.svelte` — app shell with `<TabNav>` component
- [ ] `TabNav.svelte` — Asana · Cloudflare · GitHub tabs, hash-based routing
- [ ] `+page.svelte` — renders active tab panel based on hash
- [ ] `AsanaTab.svelte`, `CloudflareTab.svelte`, `GitHubTab.svelte` — empty
      skeletons with heading and "loading" placeholder
- [ ] `FilterInput.svelte` — reusable accessible search input component
- [ ] `ErrorState.svelte` — reusable error display component
- [ ] `ConfigNotice.svelte` — reusable "token not configured" notice
- [ ] `Dockerfile` — multi-stage build, Node 20 alpine
- [ ] `docker-compose.yml` — local dev with volume mount and hot reload
- [ ] `.env.example` with all required key names
- [ ] `README.md` with setup and deploy instructions

**Acceptance:** `pnpm dev` starts the app, tabs switch via URL hash, no console
errors, passes Lighthouse accessibility audit.

---

## Phase 2 — Cloudflare Tab

**Goal:** Live Cloudflare resources displayed and filterable.

### Deliverables

- [ ] `src/lib/api/cloudflare.ts` — typed API client for Pages, Workers, Workers
      AI, R2, D1 (parallel fetch via `Promise.all`)
- [ ] `src/lib/types.ts` — `CloudflareResource` interface
- [ ] `src/routes/api/cloudflare/resources/+server.ts` — GET endpoint, returns
      unified resource list grouped by type
- [ ] `CloudflareTab.svelte` — fetches on first activation, renders groups, live
      filter, deep-links to Cloudflare dashboard
- [ ] Empty group hiding behaviour
- [ ] Error state if API call fails
- [ ] Config notice if `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` absent

**Acceptance:** All 5 resource types appear, filter narrows results in real
time, each item links to the correct Cloudflare dashboard URL, no tokens in
client bundle.

---

## Phase 3 — GitHub Tab

**Goal:** Open PRs and issues across all repos, filterable.

### Deliverables

- [ ] `src/lib/api/github.ts` — typed API client
- [ ] `GitHubItem` type in `types.ts`
- [ ] `src/routes/api/github/items/+server.ts` — GET endpoint
- [ ] `GitHubTab.svelte` — fetches on activation, renders items sorted by last
      updated, All / PRs / Issues filter toggle
- [ ] Age display (e.g. "3d ago")
- [ ] Label badges
- [ ] Error state and config notice

**Acceptance:** PRs and issues from all repos appear, toggle filters work, items
open correct GitHub URLs in new tab.

---

## Phase 4 — Asana Tab

**Goal:** Open tasks from workspace, completable from the dashboard.

### Deliverables

- [ ] `src/lib/api/asana.ts` — typed API client
- [ ] `AsanaTask` type in `types.ts`
- [ ] `src/routes/api/asana/tasks/+server.ts` — GET endpoint, resolves workspace
      GID, returns tasks grouped by project
- [ ] `src/routes/api/asana/complete/+server.ts` — POST endpoint, marks task
      complete
- [ ] `AsanaTab.svelte` — fetches on activation, renders grouped tasks, text
      filter, optimistic complete toggle, overdue flagging
- [ ] Error state and config notice

**Acceptance:** Tasks appear grouped by project, filter works, checking a task
marks it complete in Asana within 2 seconds, overdue tasks are visually
distinct.

---

## Phase 5 — Polish & Deploy

**Goal:** Production-quality UX and live deployment at ops.codesidekick.xyz.

### Deliverables

- [ ] Loading skeleton states for each tab (CSS-only, no JS required)
- [ ] Keyboard navigation audit — all interactive elements reachable
- [ ] Focus management when switching tabs
- [ ] `<title>` updates per active tab
- [ ] Coolify service created, connected to repo
- [ ] Cloudflare Tunnel configured: `ops.codesidekick.xyz` → Coolify service
- [ ] Environment variables set in Coolify
- [ ] Production smoke test — all three tabs load live data
- [ ] `CHANGELOG.md` entry

**Acceptance:** Lighthouse scores ≥ 90 performance, 100 accessibility. Dashboard
reachable at `ops.codesidekick.xyz` from Tailscale-connected device.

---

## Dependencies Between Phases

```
Phase 1 (scaffold)
    └── Phase 2 (Cloudflare) ─┐
    └── Phase 3 (GitHub)      ├── Phase 5 (deploy)
    └── Phase 4 (Asana)      ─┘
```

Phases 2, 3, 4 can be built in any order after Phase 1.
