# Crypto Dashboard Example

> Web3 landing page with Privy wallet connection and signature verification

This example demonstrates how to use Claude Code Sidekick to build a crypto landing page with:

- ✅ Privy wallet authentication
- ✅ Signature verification on connect
- ✅ Elaborate dashboard UI post-auth
- ✅ Dark neon aesthetic (GigaBrain-inspired)
- ✅ Real-time data displays
- ✅ Glassmorphism + gradients

---

## How This Was Built

### Step 1: Project Creation

```bash
$ npx create-claude-project crypto-dashboard --preset=react

   ╭──────────────────────────────────────────╮
   │                                          │
   │   🚀 Create Claude Project               │
   │      AI-Powered Project Generator        │
   │                                          │
   ╰──────────────────────────────────────────╯

? Project name: › crypto-dashboard
? Select a preset: › React App
? Select features:
  ◉ Authentication (Privy Web3)

✔ Creating project structure...
✔ Installing dependencies...

🎉 Project created successfully!
```

### Step 2: Define Requirements

```markdown
## Requirements (EARS Notation)

### Functional
1. WHEN user clicks "Connect Wallet" THE SYSTEM SHALL open Privy modal
2. WHEN wallet connects THE SYSTEM SHALL request signature verification
3. WHEN signature verified THE SYSTEM SHALL display dashboard
4. WHILE user is connected THE SYSTEM SHALL show wallet address
5. WHEN user clicks "Disconnect" THE SYSTEM SHALL clear session

### Non-Functional
- Dark theme with neon accents (cyan, purple, pink)
- Glassmorphism cards
- Animated gradients
- Mobile responsive
```

### Step 3: Execute with Sidekick

```bash
> /project-planner
> /task-planner
> /task-runner

┌──────────────────────────────────────────────────────────────────┐
│ TASK-003: Privy Integration                          [dev]      │
├──────────────────────────────────────────────────────────────────┤
│ ▶ Installing @privy-io/react-auth...                            │
│ ▶ Creating PrivyProvider wrapper...                             │
│ ▶ Implementing signature verification...                        │
│ ✅ COMPLETE                                                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
crypto-dashboard/
├── src/
│   ├── components/
│   │   ├── ConnectButton.tsx    # Wallet connect with Privy
│   │   ├── SignatureModal.tsx   # Signature request flow
│   │   ├── Dashboard.tsx        # Main dashboard (post-auth)
│   │   ├── StatsCard.tsx        # Glassmorphism stat cards
│   │   ├── PortfolioChart.tsx   # Holdings visualization
│   │   ├── TokenList.tsx        # Token balances
│   │   ├── ActivityFeed.tsx     # Transaction history
│   │   └── Navbar.tsx           # Top navigation
│   ├── hooks/
│   │   └── useSignature.ts      # Signature verification hook
│   ├── styles/
│   │   └── globals.css          # Neon dark theme
│   ├── App.tsx                  # Main app with Privy
│   └── main.tsx                 # Entry point
├── public/
│   └── logo.svg
├── index.html
├── package.json
└── vite.config.ts
```

---

## Quick Start

### 1. Get Privy App ID

1. Go to [privy.io](https://privy.io) and create an account
2. Create a new app
3. Copy your **App ID**

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_PRIVY_APP_ID=your-app-id-here
```

### 3. Run Development Server

```bash
pnpm install
pnpm dev
# → http://localhost:5173
```

---

## Features

### Landing Page (Pre-Auth)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     ╔═══════════════════════════════════════════════════╗      │
│     ║                                                   ║      │
│     ║   🌐 NEXUS PROTOCOL                               ║      │
│     ║                                                   ║      │
│     ║   The Future of Decentralized Intelligence       ║      │
│     ║                                                   ║      │
│     ║   ┌─────────────────────────────────────────┐    ║      │
│     ║   │     🔗 Connect Wallet                   │    ║      │
│     ║   └─────────────────────────────────────────┘    ║      │
│     ║                                                   ║      │
│     ╚═══════════════════════════════════════════════════╝      │
│                                                                 │
│     ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│     │ $2.4B TVL     │  │ 847K Holders  │  │ 12.4% APY     │    │
│     └───────────────┘  └───────────────┘  └───────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Signature Verification

After wallet connects, user must sign a message:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     ┌───────────────────────────────────────────────────┐      │
│     │                                                   │      │
│     │   🔐 Verify Ownership                             │      │
│     │                                                   │      │
│     │   Sign this message to prove you own this        │      │
│     │   wallet. This won't cost any gas.               │      │
│     │                                                   │      │
│     │   Message:                                        │      │
│     │   ┌─────────────────────────────────────────┐    │      │
│     │   │ Welcome to Nexus Protocol!              │    │      │
│     │   │ Timestamp: 1708531200                   │    │      │
│     │   │ Nonce: a1b2c3d4                         │    │      │
│     │   └─────────────────────────────────────────┘    │      │
│     │                                                   │      │
│     │   ┌─────────────────────────────────────────┐    │      │
│     │   │           ✍️ Sign Message               │    │      │
│     │   └─────────────────────────────────────────┘    │      │
│     │                                                   │      │
│     └───────────────────────────────────────────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard (Post-Auth)

```
┌─────────────────────────────────────────────────────────────────┐
│  NEXUS    Dashboard  Staking  Governance  Rewards    0x1234... │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │   Portfolio Value          24h Change      Total Yield  │   │
│  │   $124,847.32              +12.4% ▲        $8,432.12   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────┐  ┌────────────────────────┐    │
│  │ 📊 Holdings                │  │ 📈 Performance         │    │
│  │                            │  │                        │    │
│  │ ETH    12.45   $31,284    │  │  ╭──────────────────╮  │    │
│  │ NEXUS  84,320  $42,160    │  │  │    ╱╲    ╱╲     │  │    │
│  │ USDC   25,000  $25,000    │  │  │   ╱  ╲  ╱  ╲    │  │    │
│  │ stETH  8.2     $20,664    │  │  │  ╱    ╲╱    ╲   │  │    │
│  │                            │  │  ╰──────────────────╯  │    │
│  └────────────────────────────┘  └────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🔔 Recent Activity                                       │   │
│  │                                                         │   │
│  │ ✓ Staked 1,000 NEXUS                      2 hours ago  │   │
│  │ ✓ Claimed 42.5 NEXUS rewards              5 hours ago  │   │
│  │ ✓ Swapped 0.5 ETH → 2,100 NEXUS          1 day ago    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Code Examples

### Privy Provider Setup

```tsx
// src/App.tsx
import { PrivyProvider } from '@privy-io/react-auth';

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#00f5ff',
        },
        loginMethods: ['wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <Router />
    </PrivyProvider>
  );
}
```

### Signature Verification Hook

```tsx
// src/hooks/useSignature.ts
import { useSignMessage } from '@privy-io/react-auth';

export function useSignatureVerification() {
  const { signMessage } = useSignMessage();
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    const message = `Welcome to Nexus Protocol!\nTimestamp: ${Date.now()}\nNonce: ${crypto.randomUUID()}`;
    
    try {
      const signature = await signMessage(message);
      // Verify signature on backend or locally
      setVerified(true);
      return signature;
    } catch (error) {
      console.error('Signature rejected');
      return null;
    }
  };

  return { verify, verified };
}
```

### Connect Button

```tsx
// src/components/ConnectButton.tsx
import { usePrivy } from '@privy-io/react-auth';

export function ConnectButton() {
  const { login, authenticated, user } = usePrivy();

  if (authenticated) {
    return (
      <div className="wallet-badge">
        {user?.wallet?.address.slice(0, 6)}...
        {user?.wallet?.address.slice(-4)}
      </div>
    );
  }

  return (
    <button className="btn btn--glow" onClick={login}>
      🔗 Connect Wallet
    </button>
  );
}
```

---

## CSS Theme

### Color Palette

```css
:root {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-card: rgba(18, 18, 26, 0.8);
  
  --color-cyan: #00f5ff;
  --color-purple: #a855f7;
  --color-pink: #ec4899;
  --color-green: #10b981;
  --color-red: #ef4444;
  
  --gradient-hero: linear-gradient(135deg, #00f5ff 0%, #a855f7 50%, #ec4899 100%);
  --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.5);
}
```

### Glassmorphism Cards

```css
.glass-card {
  background: var(--color-card);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 245, 255, 0.1);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glass-card:hover {
  border-color: rgba(0, 245, 255, 0.3);
  box-shadow: var(--glow-cyan);
}
```

### Glow Button

```css
.btn--glow {
  background: var(--gradient-hero);
  color: white;
  padding: 12px 32px;
  border-radius: 9999px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn--glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-hero);
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn--glow:hover::before {
  opacity: 0.6;
}
```

---

## Customization

### Change Branding

Edit `src/styles/globals.css`:

```css
:root {
  --color-cyan: #your-primary;
  --color-purple: #your-secondary;
}
```

### Add Tokens

Edit `src/data/tokens.ts`:

```typescript
export const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: 12.45, price: 2512.34 },
  { symbol: 'NEXUS', name: 'Nexus Token', balance: 84320, price: 0.50 },
  // Add more...
];
```

---

## Deployment

### Vercel

```bash
pnpm build
npx vercel --prod
```

### Environment Variables

Set in your deployment platform:
- `VITE_PRIVY_APP_ID` - Your Privy App ID

---

## Inspiration Sites

- [GigaBrain](https://gigabrain.so) - AI token analytics
- [Dune Analytics](https://dune.com) - Crypto dashboards
- [DeBank](https://debank.com) - Portfolio tracker
- [Zapper](https://zapper.fi) - DeFi dashboard

---

## License

MIT - Use as a starting point for your Web3 projects!
