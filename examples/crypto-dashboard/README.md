# Crypto Dashboard Example

> Step-by-step walkthrough of building a Web3 dApp with Claude Code Sidekick

This example shows how to build a crypto landing page with wallet authentication using the Sidekick workflow.

---

## What You'll Learn

1. How to define Web3 requirements in PROJECT_STARTER.md
2. How to use /project-planner for dApp projects
3. How to integrate Privy wallet authentication
4. How to fix TypeScript errors during development

---

## The Finished Product

This example builds a complete crypto dashboard with:

- ✅ Privy wallet connection
- ✅ Signature verification (proves wallet ownership)
- ✅ Elaborate dashboard UI
- ✅ Dark neon theme (GigaBrain-inspired)
- ✅ Glassmorphism effects
- ✅ Demo mode (works without Privy key)

---

## Step 1: Review PROJECT_STARTER.md

Open [PROJECT_STARTER.md](./PROJECT_STARTER.md) to see the requirements.

### Key Requirements

```markdown
### Functional Requirements

1. WHEN user clicks "Connect Wallet" THE SYSTEM SHALL open Privy modal
2. WHEN wallet connects THE SYSTEM SHALL request signature verification
3. WHEN signature verified THE SYSTEM SHALL display dashboard
4. WHILE user is authenticated THE SYSTEM SHALL show wallet address
```

### Design Requirements

```markdown
### Non-Functional Requirements

- Theme: Dark background (#0a0a0f) with neon accents
- Effects: Glassmorphism cards with backdrop-filter blur
- Typography: Inter for body, JetBrains Mono for addresses
```

---

## Step 2: Run /project-planner

### Command

```
/project-planner
```

### Output

See [.claude/project-plan/phase_1.md](./.claude/project-plan/phase_1.md)

The plan identifies:
- Authentication flow (connect → sign → dashboard)
- Component hierarchy
- CSS architecture decisions

---

## Step 3: Run /task-planner

### Command

```
/task-planner
```

### Output

See [.claude/tasks/phase-1-tasks.md](./.claude/tasks/phase-1-tasks.md)

Tasks are broken down by component:

| ID | Agent | Task | Status |
|----|-------|------|--------|
| TASK-001 | init | Project setup | ✅ |
| TASK-002 | dev | CSS theme | ✅ |
| TASK-003 | dev | Privy integration | ✅ |
| TASK-004 | dev | Navbar | ✅ |
| TASK-005 | dev | Hero section | ✅ |
| TASK-006 | dev | Signature modal | ✅ |
| TASK-007 | dev | Dashboard | ✅ |

---

## Step 4: Run /task-runner

### Command

```
/task-runner
```

### What Happens

Claude executes each task:

```
┌──────────────────────────────────────────────────────────────────┐
│ TASK-006: Signature Modal                             [dev]     │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Creating SignatureModal.tsx...                                │
│ ▶ Adding message display...                                     │
│ ▶ Implementing sign handler...                                  │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. User on Landing Page                                       │
│              ↓                                                  │
│   2. Clicks "Connect Wallet"                                    │
│              ↓                                                  │
│   3. Privy modal opens (MetaMask, WalletConnect, etc.)          │
│              ↓                                                  │
│   4. Wallet connects successfully                               │
│              ↓                                                  │
│   5. Signature modal appears                                    │
│              ↓                                                  │
│   6. User signs verification message                            │
│              ↓                                                  │
│   7. Dashboard is displayed                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Running the Example

### Install Dependencies

```bash
cd examples/crypto-dashboard
npm install
```

### Start Dev Server (Demo Mode)

Without a Privy app ID, the example runs in demo mode:

```bash
npm run dev
# Opens http://localhost:5173
```

Demo mode simulates:
- Wallet connection
- Signature flow
- Full dashboard

### With Real Privy

1. Get an app ID from [privy.io](https://privy.io)
2. Create `.env`:
   ```
   VITE_PRIVY_APP_ID=your-app-id
   ```
3. Run `npm run dev`

---

## Project Structure

```
crypto-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Top nav with wallet badge
│   │   ├── Hero.tsx           # Landing hero section
│   │   ├── SignatureModal.tsx # Verification overlay
│   │   ├── Dashboard.tsx      # Post-auth dashboard
│   │   ├── StatsCard.tsx      # Portfolio stat cards
│   │   ├── TokenList.tsx      # Token holdings
│   │   └── ActivityFeed.tsx   # Transaction history
│   ├── styles/
│   │   └── globals.css        # Neon dark theme (13KB)
│   ├── App.tsx                # Privy provider + routing
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # TypeScript env types
├── PROJECT_STARTER.md
├── CLAUDE.md
└── package.json
```

---

## Key Code Explained

### Privy Provider (App.tsx)

```tsx
<PrivyProvider
  appId={import.meta.env.VITE_PRIVY_APP_ID}
  config={{
    appearance: {
      theme: 'dark',
      accentColor: '#00f5ff',
    },
    loginMethods: ['wallet'],
  }}
>
  <AppContent />
</PrivyProvider>
```

### Signature Modal

```tsx
const handleSign = async () => {
  const message = `Welcome to Nexus Protocol!
Timestamp: ${Date.now()}
Nonce: ${crypto.randomUUID()}`;
  
  // In real app: await signMessage(message)
  // Then verify signature
  onSuccess();
};
```

### Auth State Flow

```tsx
function AppContent() {
  const { authenticated } = usePrivy();
  const [signatureVerified, setSignatureVerified] = useState(false);

  // Not connected → show Hero
  // Connected but not signed → show SignatureModal
  // Signed → show Dashboard
}
```

---

## CSS Theme

### Color Palette

```css
:root {
  --color-bg: #0a0a0f;
  --color-cyan: #00f5ff;
  --color-purple: #a855f7;
  --color-pink: #ec4899;
}
```

### Glassmorphism

```css
.glass {
  background: rgba(18, 18, 26, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
}

.glass:hover {
  border-color: rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
}
```

### Glow Button

```css
.btn--glow {
  background: linear-gradient(135deg, #00f5ff, #a855f7, #ec4899);
  position: relative;
}

.btn--glow::before {
  content: '';
  position: absolute;
  inset: -3px;
  background: inherit;
  filter: blur(16px);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn--glow:hover::before {
  opacity: 0.6;
}
```

---

## Fixing Common Errors

### "Property 'env' does not exist on ImportMeta"

Add `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIVY_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### "Unused variable"

Remove unused imports/variables or prefix with `_`:

```typescript
// Before
const [showModal, setShowModal] = useState(false);

// After (if unused)
// Remove the line entirely
```

### "Module not found"

```bash
npm install
```

---

## Customizing

### Change Branding

Edit `src/styles/globals.css`:

```css
:root {
  --color-cyan: #your-primary;
  --color-purple: #your-secondary;
}
```

### Add Tokens

Edit `src/components/TokenList.tsx`:

```typescript
const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '12.45', value: '$31,284' },
  // Add more tokens...
];
```

### Real Blockchain Data

Replace mock data with:
- Alchemy/Infura for balances
- CoinGecko for prices
- The Graph for history

---

## Design Inspiration

- [GigaBrain](https://gigabrain.so) - AI token aesthetics
- [Dune Analytics](https://dune.com) - Dashboard layouts
- [DeBank](https://debank.com) - Portfolio presentation
- [Zapper](https://zapper.fi) - Activity feeds

---

## Next Steps

- Read the [Getting Started Tutorial](../../docs/guides/getting-started-tutorial.md)
- Try the [SSG Starter Example](../ssg-starter/)
- Learn about [Available Agents](../../.claude/agents/)
