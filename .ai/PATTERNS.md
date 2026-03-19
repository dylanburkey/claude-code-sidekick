# Implementation Patterns

**Last Updated:** 2026-03-18

## Workspace & Module Patterns

### pnpm Workspace Setup
`pnpm-workspace.yaml` defines packages: `[cli, tools/*]`. Each package has its
own `package.json`. Root scripts delegate to sub-packages via `cd tools/X && pnpm Y`.

### ES Module Pattern
All files use `"type": "module"` - use `import`/`export` everywhere. `__dirname`
must be reconstructed: `path.dirname(fileURLToPath(import.meta.url))`.

### Zero-Dependency Pattern (CLI)
CLI uses only Node built-ins (`node:fs/promises`, `node:child_process`,
`node:path`, `node:util`). No runtime deps for scaffolding logic - `fs-extra`
was migrated to native APIs.

## Multi-Model AI Patterns

### Lazy Client Initialization
```javascript
let veniceClient = null;
export function getVenice() {
  if (!veniceClient) {
    if (!process.env.VENICE_API_KEY) throw new Error('...');
    veniceClient = new OpenAI({ apiKey: ..., baseURL: 'https://api.venice.ai/api/v1' });
  }
  return veniceClient;
}
```
All provider clients initialized lazily on first use. Pattern in
`tools/multi-model/lib/clients.js:80-109`.

### Provider Detection Pattern
```javascript
export function getAvailableProviders() {
  const providers = [];
  if (process.env.OPENAI_API_KEY) providers.push('openai');
  if (process.env.ANTHROPIC_API_KEY) providers.push('anthropic');
  if (process.env.GEMINI_API_KEY || process.env.GEMENI_API_KEY) providers.push('gemini');
  if (process.env.VENICE_API_KEY) providers.push('venice');
  return providers;
}
```
Typo-tolerant for Gemini key name. Pattern in `tools/multi-model/lib/clients.js:32`.

### OpenAI-Compatible Adapter Pattern
Venice AI uses the OpenAI SDK with a custom `baseURL`. Any OpenAI-compatible
provider follows this pattern: `new OpenAI({ apiKey, baseURL: 'custom-url' })`.

### Single-Model Fallback Pattern
```javascript
export function isMultiModelEnabled() {
  const setting = process.env.USE_MULTI_MODEL?.toUpperCase();
  return setting !== 'FALSE' && setting !== '0' && setting !== 'NO';
}
```
Set `USE_MULTI_MODEL=FALSE` to force single-model mode. Defaults to TRUE.

### venice/ Prefix Pattern
Venice models accept either bare model name (`llama-3.3-70b`) or prefixed
(`venice/llama-3.3-70b`). Strip prefix before API call:
```javascript
const veniceModel = model.replace('venice/', '');
```
Pattern in `tools/multi-model/lib/clients.js:178`.

### Model Routing Pattern
Task types map to optimal models. Routing logic:
- Long context (>50k chars) → Claude Sonnet (200k window)
- Code generation → GPT-4o (mature function calling)
- Documentation → Claude Sonnet (nuanced)
- Security review → Claude Sonnet (careful reasoning)
- Quick refactors → GPT-4o-mini (fast)
- Linting/style → Gemini Flash (cheapest)
See `tools/multi-model/lib/model-router.js` for full TASK_ROUTING map.

## CLI Scaffolding Patterns

### Non-Blocking Dashboard Launch
After project creation, dashboard is launched as a detached background process:
```javascript
const server = spawn('node', [buildEntry], {
  detached: true,
  stdio: 'ignore',
  env: { ...process.env, PROJECT_ROOT: projectPath, PORT: port }
});
server.unref();
await new Promise(resolve => setTimeout(resolve, 1500)); // wait for server
await openInBrowser(`http://localhost:${port}`);
```
Pattern in `cli/src/scaffold.js:95-130`. Dashboard only launches if
`tools/dashboard/build/index.js` exists.

### Cross-Platform Browser Open
```javascript
export async function openInBrowser(url) {
  if (process.platform === 'darwin') await execFileAsync('open', [url]);
  else if (process.platform === 'win32') await execFileAsync('cmd', ['/c', 'start', '', url]);
  else await execFileAsync('xdg-open', [url]);
}
```
Pattern in `cli/src/utils.js:175`. Errors are caught and warned - never thrown.

## Agent & Workflow Patterns

### EARS Requirements Pattern
Five EARS patterns for requirements in specs:
- Ubiquitous: `THE SYSTEM SHALL [action]`
- Event-Driven: `WHEN [event] THE SYSTEM SHALL [response]`
- State-Driven: `WHILE [state] THE SYSTEM SHALL [behavior]`
- Optional: `WHERE [condition] THE SYSTEM SHALL [action]`
- Unwanted: `IF [condition] THEN THE SYSTEM SHALL [response]`

### Phase Gate Pattern
After each phase: HARD STOP. User must explicitly run `/task-planner phase=N+1`.
Never auto-advance. Prevents scope creep. Enforced by `phase-control` skill.

### Spec → Plan → Task → Code Flow
1. Write spec in `specs/feature-name.md` using EARS
2. `/project-planner` generates `project-plan/phase_N.md`
3. `/task-planner` generates `tasks/phase-N-tasks.md`
4. `/task-runner` executes via specialized agents

### Agent Selection Pattern
Match task type to agent:
| Task | Agent |
|------|-------|
| Setup/config | init-agent |
| Requirements/planning | planner-agent |
| Feature implementation | dev-agent |
| Tests | test-agent |
| Documentation | docs-agent |
| Code review | review-agent |
| Coordination | orchestrator-agent |
| Shopify themes | shopify-theme-developer |

## Dashboard Patterns

### Server-Side API Proxy Pattern
All external API calls (Asana, Cloudflare, GitHub) go through SvelteKit
server routes (`+server.ts`). API keys never exposed to client. Routes live at
`tools/dashboard/src/routes/api/`.

### Session Cache Pattern
Tab data fetched on first activation only, then cached for session. Reduces
API calls. Implemented via Svelte stores.

### Progressive Enhancement Pattern
Dashboard must work without JavaScript for read-only views. Core layout
uses semantic HTML + CSS, enhanced with Svelte.

## Code Style Patterns

### BEM CSS Pattern
```css
.product-card { }
.product-card__title { }
.product-card--featured { }
```

### CSS Custom Properties Pattern
```css
:root {
  --color-primary: #1a1a2e;
  --space-md: 1rem;
}
```

### Mobile-First Responsive Pattern
```css
.component { padding: var(--space-sm); }
@media (min-width: 768px) { .component { padding: var(--space-md); } }
```

### Accessibility Non-Negotiables
- WCAG 2.1 AA minimum
- Visible focus indicators (never `outline: none` without replacement)
- 44x44px minimum touch targets
- `prefers-reduced-motion` respected
- `aria-live` regions for dynamic content
