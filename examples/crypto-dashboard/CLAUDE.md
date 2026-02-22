# CLAUDE.md - Crypto Dashboard Project Context

> Context for AI assistants working on this Web3 dashboard project.

## Project Overview

**Nexus Protocol Dashboard** is a crypto landing page demonstrating Privy wallet authentication with signature verification. Features a dark neon aesthetic inspired by GigaBrain and modern DeFi platforms.

### Tech Stack
- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Auth:** Privy (@privy-io/react-auth)
- **Styling:** Modern CSS (no framework)

## Authentication Flow

```
1. User lands on Hero page
           ↓
2. User clicks "Connect Wallet"
           ↓
3. Privy modal opens (wallet selection)
           ↓
4. Wallet connects successfully
           ↓
5. SignatureModal appears
           ↓
6. User signs verification message
           ↓
7. Dashboard is displayed
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Top navigation with wallet status
│   ├── Hero.tsx             # Landing page hero section
│   ├── SignatureModal.tsx   # Signature verification overlay
│   ├── Dashboard.tsx        # Main dashboard layout
│   ├── StatsCard.tsx        # Portfolio stat cards
│   ├── TokenList.tsx        # Token holdings list
│   └── ActivityFeed.tsx     # Transaction history
├── hooks/
│   └── useSignature.ts      # Signature verification hook
├── styles/
│   └── globals.css          # All styles (neon dark theme)
├── App.tsx                  # Main app with Privy provider
└── main.tsx                 # Entry point
```

## Key Components

### App.tsx
- Wraps app in `PrivyProvider`
- Manages auth state and signature verification
- Includes demo mode for testing without Privy

### SignatureModal.tsx
- Displays after wallet connection
- Shows message to be signed
- Calls Privy `signMessage` or simulates in demo mode

### Dashboard.tsx
- Only visible after signature verification
- Contains StatsCard grid, TokenList, ActivityFeed

## CSS Architecture

### Design Tokens
```css
:root {
  --color-bg: #0a0a0f;
  --color-cyan: #00f5ff;
  --color-purple: #a855f7;
  --color-pink: #ec4899;
  --gradient-hero: linear-gradient(135deg, cyan, purple, pink);
}
```

### Key Classes
| Class | Purpose |
|-------|---------|
| `.glass` | Glassmorphism card with blur |
| `.btn--glow` | Gradient button with glow effect |
| `.wallet-badge` | Connected wallet address display |
| `.text-gradient` | Gradient text effect |
| `.hero` | Full-height landing section |
| `.dashboard` | Post-auth dashboard container |

## Privy Integration

### Provider Config
```tsx
<PrivyProvider
  appId={import.meta.env.VITE_PRIVY_APP_ID}
  config={{
    appearance: { theme: 'dark', accentColor: '#00f5ff' },
    loginMethods: ['wallet'],
  }}
>
```

### Hooks Used
- `usePrivy()` - Auth state, login, logout
- `useSignMessage()` - Request wallet signature

## Demo Mode

If `VITE_PRIVY_APP_ID` is not set, app runs in demo mode:
- Simulates wallet connection
- Simulates signature flow
- Shows full dashboard with mock data

## Coding Standards

### TypeScript
- Strict mode enabled
- Props interfaces for all components
- Explicit return types

### CSS
- Custom properties for all colors/spacing
- BEM-ish naming (component__element)
- Mobile-first media queries

### Components
- Functional components with hooks
- Props destructuring
- Conditional rendering for auth states

## Mock Data

Token and activity data in components is static/mock:
- `TokenList.tsx` - hardcoded token array
- `ActivityFeed.tsx` - hardcoded activity array

To integrate real data:
1. Fetch from API or blockchain
2. Replace static arrays with state
3. Add loading states

## Related Files

- [PROJECT_STARTER.md](./PROJECT_STARTER.md) - Requirements
- [README.md](./README.md) - Full documentation with examples
