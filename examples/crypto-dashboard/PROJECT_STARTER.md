# Project Starter Template

## Project Information

### Project Name
Nexus Protocol - Crypto Dashboard

### Project Description
A Web3 landing page with Privy wallet authentication, signature verification, and an elaborate crypto dashboard. Dark neon aesthetic inspired by GigaBrain and modern DeFi platforms.

### Project Type
web-app (React + Vite + Privy)

---

## Goals & Objectives

### Primary Goal
Create a crypto landing page that:
- Connects wallets via Privy
- Requires signature verification after connection
- Displays elaborate dashboard post-authentication
- Uses dark neon aesthetic (cyan, purple, pink accents)
- Features glassmorphism UI components

### Success Criteria
- Wallet connection works with multiple providers
- Signature is required before dashboard access
- Dashboard shows portfolio, tokens, activity
- Visual design matches GigaBrain-style crypto aesthetics
- Mobile responsive
- Accessible

### Non-Goals
- Actual blockchain transactions
- Real token data (demo/mock data is fine)
- Backend API (client-side only)

---

## Requirements (EARS Notation)

### Functional Requirements

1. WHEN user clicks "Connect Wallet" THE SYSTEM SHALL open Privy authentication modal
2. WHEN wallet successfully connects THE SYSTEM SHALL display signature verification modal
3. WHEN user signs the verification message THE SYSTEM SHALL grant access to dashboard
4. WHEN user rejects signature THE SYSTEM SHALL remain on landing page
5. WHILE user is authenticated THE SYSTEM SHALL display wallet address in navbar
6. WHEN user clicks "Disconnect" THE SYSTEM SHALL clear session and return to landing
7. THE SYSTEM SHALL display portfolio value, token holdings, and activity feed on dashboard

### Non-Functional Requirements

- **Theme:** Dark background (#0a0a0f) with neon accents (cyan #00f5ff, purple #a855f7, pink #ec4899)
- **Effects:** Glassmorphism cards with backdrop-filter blur
- **Animation:** Subtle glow pulses, hover transitions
- **Typography:** Inter for body, JetBrains Mono for addresses/numbers
- **Responsive:** Mobile-first, works on all screen sizes
- **Performance:** No heavy dependencies beyond React + Privy

---

## Technical Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Auth:** Privy (@privy-io/react-auth)
- **Styling:** Modern CSS (custom properties, no framework)
- **State:** React hooks (useState, useContext)

---

## Design Inspiration

- GigaBrain (gigabrain.so) - AI token aesthetics
- Dune Analytics - Dashboard layouts
- DeBank - Portfolio presentation
- Zapper - Activity feeds
- Uniswap - Glass card styling
