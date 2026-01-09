# Building a Web3 dApp with Privy: Complete Walkthrough

> **Build a professional Web3 application with wallet authentication, smart contracts, and blockchain integration - No blockchain experience required!**

## What You'll Build

A complete decentralized application (dApp) with:
- **Frontend:** React + TypeScript + Vite
- **Wallet Auth:** Privy for seamless wallet connections
- **Blockchain:** Ethereum/Polygon smart contract integration
- **Web3 Library:** ethers.js or viem
- **Features:** Wallet connect, NFT minting, token interactions
- **Deployment:** Vercel with blockchain connectivity

**Time Required:** 60-75 minutes

---

## What is Web3 and Why Privy?

### Web3 Basics (No Jargon)

**Traditional Web (Web2):**
- Your data lives on company servers
- Companies control access
- You need username/password

**Web3:**
- Your data lives in your wallet (you control it)
- You connect with your wallet (like MetaMask)
- No passwords needed - cryptographic signatures prove it's you

**Privy Makes This Easy:**
- Users can connect with any wallet
- Or sign in with email/social (Privy creates wallet for them)
- Handles all complexity automatically

---

## Prerequisites

- Basic React knowledge helpful (but not required)
- MetaMask or any Web3 wallet installed
- Terminal/command line access

---

## Step 1: Set Up Your Project (5 minutes)

### 1.1 Create Project

```bash
# Create project folder
mkdir my-web3-dapp
cd my-web3-dapp

# Download Sidekick
git clone https://github.com/dylanburkey/claude-code-sidekick.git temp-sidekick
cd temp-sidekick

# Copy Sidekick files
cp -r .claude/ ../
cp PROJECT_STARTER.md ../
cp .env.example ../

# Clean up
cd ..
rm -rf temp-sidekick
```

### 1.2 Configure PROJECT_STARTER.md

```markdown
## Project Information

### Project Name
NFT Minting dApp

### Project Description
A decentralized application for minting NFTs with wallet authentication
via Privy. Users connect their wallet, interact with smart contracts,
and mint their own NFTs on the Polygon network.

### Project Type
web-app
```

### 1.3 Select React Preset

```markdown
### Project Preset

- [ ] **Static Website**
- [ ] **Astro Site**
- [x] **React App** - React, TypeScript, Vite, TanStack
- [ ] **Next.js App**
- [ ] **Vue/Nuxt**
- [ ] **SvelteKit**
- [ ] **Full Stack**
- [ ] **Custom**
```

### 1.4 Customize for Web3

```markdown
## Code Rules Configuration

### Language Standards

- **Modern JavaScript**: `TRUE`
- **TypeScript**: `TRUE`  ← Important for Web3
- **Node.js**: `TRUE`

### Framework Standards

- **React**: `TRUE`

### Quality & Testing

- **Security**: `TRUE`  ← Critical for Web3
- **Testing Standards**: `TRUE`

## MCP Configuration

### Development Tools

- **GitHub**: `TRUE`
- **Sentry**: `TRUE`  ← Track Web3 errors

### Cloud & Infrastructure

- **Vercel**: `TRUE`  ← For deployment
```

### 1.5 Run Quick Start

```bash
/quick-start
```

---

## Step 2: Set Up Privy (10 minutes)

### 2.1 Create Privy Account

1. Go to https://privy.io
2. Click "Get Started" or "Sign Up"
3. Create account with email
4. Verify your email

### 2.2 Create New App

1. In Privy Dashboard, click "Create App"
2. App Name: "NFT Minting dApp"
3. Select network: "Polygon Mumbai" (testnet for development)
4. Click "Create"

### 2.3 Configure Privy Settings

**In the Privy Dashboard:**

**Login Methods:**
- ✅ Email
- ✅ Wallet (MetaMask, Coinbase, WalletConnect)
- ✅ Social (Google, Twitter, Discord)

**Chains:**
- ✅ Polygon Mumbai (for development)
- Later add Polygon Mainnet (for production)

**Appearance:**
- Upload your logo
- Set brand colors
- Customize connect modal

### 2.4 Get Privy App ID

1. In Dashboard → Settings → API Keys
2. Copy your "App ID" (starts with `clp...`)
3. Save it - you'll need this!

### 2.5 Set Up Alchemy (For Blockchain RPC)

1. Go to https://www.alchemy.com
2. Create free account
3. Create new app:
   - Chain: Polygon
   - Network: Mumbai (testnet)
4. Copy your API key

---

## Step 3: Configure Environment (5 minutes)

Create `.env` file:

```bash
cp .env.example .env
```

Add your keys:

```env
# Privy
VITE_PRIVY_APP_ID=your_privy_app_id_here

# Alchemy (Polygon Mumbai)
VITE_ALCHEMY_API_KEY=your_alchemy_key_here
VITE_ALCHEMY_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY

# Contract Address (we'll deploy later)
VITE_NFT_CONTRACT_ADDRESS=

# Network
VITE_CHAIN_ID=80001  # Polygon Mumbai
VITE_CHAIN_NAME=Polygon Mumbai

# App
VITE_APP_URL=http://localhost:5173

# GitHub (for deployment)
GITHUB_TOKEN=your_github_token

# Vercel (for deployment)
VERCEL_TOKEN=your_vercel_token
```

---

## Step 4: Define Your dApp Features (10 minutes)

In `PROJECT_STARTER.md`:

```markdown
## Goals & Objectives

### Primary Goal

Create a Web3 NFT minting application where users can:

1. **Wallet Authentication**
   - Connect with MetaMask, Coinbase, WalletConnect
   - Sign in with email (Privy creates wallet)
   - Social login (Google, Twitter, Discord)
   - View wallet address and balance

2. **NFT Minting**
   - Mint new NFTs with custom metadata
   - Upload image to IPFS
   - Pay gas fees in MATIC
   - View minting transaction on blockchain explorer
   - See minted NFT in collection

3. **NFT Gallery**
   - View all minted NFTs
   - Display NFT metadata (name, description, image)
   - Show owner address
   - Link to OpenSea/marketplace

4. **Wallet Features**
   - View MATIC balance
   - View NFT collection
   - Switch between wallets
   - Disconnect wallet
   - Transaction history

### Success Criteria

- Users can connect wallet in under 10 seconds
- Minting transaction completes in under 30 seconds
- NFT appears in gallery immediately after minting
- Works on mobile devices
- Handles errors gracefully (insufficient funds, rejected transactions)
- Responsive design

### Functional Requirements

1. **WHEN** user clicks "Connect Wallet" **THE SYSTEM SHALL** show Privy modal with login options
2. **WHEN** user connects wallet **THE SYSTEM SHALL** fetch and display their address and balance
3. **WHEN** user mints NFT **THE SYSTEM SHALL** prompt for transaction signature
4. **WHEN** transaction succeeds **THE SYSTEM SHALL** show success message with transaction hash
5. **WHEN** user insufficient funds **THE SYSTEM SHALL** show friendly error message
6. **IF** user rejects transaction **THEN THE SYSTEM SHALL** allow them to try again
7. **THE SYSTEM SHALL** store NFT metadata on IPFS
8. **THE SYSTEM SHALL** display loading states during blockchain operations
9. **THE SYSTEM SHALL** show gas estimates before transactions
10. **THE SYSTEM SHALL** work on Polygon Mumbai testnet
```

---

## Step 5: Install Web3 Dependencies (5 minutes)

```bash
npm install --save \
  @privy-io/react-auth \
  @privy-io/wagmi-connector \
  wagmi \
  viem \
  @tanstack/react-query
```

**What each does:**
- `@privy-io/react-auth` - Privy wallet connection
- `wagmi` - React hooks for Ethereum
- `viem` - Modern Ethereum library
- `@tanstack/react-query` - Data fetching

---

## Step 6: Generate Project Plan (5 minutes)

```bash
/project-planner
```

Creates a plan covering:
- React + TypeScript setup with Vite
- Privy integration
- Smart contract deployment
- NFT minting functionality
- IPFS integration for metadata
- Wallet state management
- UI components

---

## Step 7: Generate Tasks (5 minutes)

```bash
/task-planner
```

Tasks will include:
1. Set up React + TypeScript + Vite
2. Install and configure Privy
3. Create wallet connection flow
4. Build smart contract (Solidity)
5. Deploy contract to Polygon Mumbai
6. Create minting interface
7. Integrate IPFS for metadata
8. Build NFT gallery
9. Add transaction feedback
10. Deploy to Vercel

---

## Step 8: Let Agents Build It (20 minutes)

```bash
/task-runner
```

**Watch progress:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task Runner Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[React Agent] Task 1: Set up React + Vite
→ Creating Vite project with React + TypeScript...
→ Configuring TypeScript strict mode...
→ Setting up path aliases...
✓ Complete (8.2s)

[Blockchain Agent] Task 2: Configure Privy
→ Installing Privy dependencies...
→ Creating PrivyProvider wrapper...
→ Configuring chains and login methods...
✓ Complete (12.4s)

[Blockchain Agent] Task 3: Create smart contract
→ Writing ERC721 NFT contract...
→ Adding minting function...
→ Adding metadata support...
→ Compiling with Hardhat...
✓ Complete (18.7s)

[Blockchain Agent] Task 4: Deploy contract
→ Configuring Hardhat for Polygon Mumbai...
→ Deploying NFTContract...
→ Contract deployed to: 0x1234...
→ Verifying on Polygonscan...
✓ Complete (45.3s)

[React Agent] Task 5: Build minting UI
→ Creating MintNFT component...
→ Adding form with image upload...
→ Integrating with smart contract...
→ Adding transaction feedback...
✓ Complete (16.8s)

[React Agent] Task 6: Build NFT gallery
→ Creating NFTGallery component...
→ Fetching NFTs from contract...
→ Displaying metadata and images...
✓ Complete (14.2s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
All Tasks Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contract Address: 0x1234567890abcdef...
Deployed to: Polygon Mumbai
View on Polygonscan: https://mumbai.polygonscan.com/address/0x...
```

---

## Step 9: Project Structure (5 minutes)

```
my-web3-dapp/
├── src/
│   ├── main.tsx                  # App entry point
│   ├── App.tsx                   # Main app component
│   ├── providers/
│   │   └── PrivyProvider.tsx    # Privy configuration
│   ├── components/
│   │   ├── ConnectWallet.tsx    # Wallet connection button
│   │   ├── WalletInfo.tsx       # Display wallet details
│   │   ├── MintNFT.tsx          # Minting interface
│   │   ├── NFTGallery.tsx       # Display NFTs
│   │   └── NFTCard.tsx          # Individual NFT display
│   ├── hooks/
│   │   ├── useWallet.ts         # Wallet state hook
│   │   ├── useMintNFT.ts        # Minting logic
│   │   └── useNFTs.ts           # Fetch NFTs
│   ├── lib/
│   │   ├── contract.ts          # Contract interaction
│   │   ├── ipfs.ts              # IPFS upload
│   │   └── config.ts            # Chain config
│   └── contracts/
│       ├── NFT.sol              # Smart contract
│       └── NFT.json             # Contract ABI
├── hardhat/
│   ├── contracts/               # Solidity contracts
│   ├── scripts/                 # Deployment scripts
│   └── hardhat.config.ts
├── .env
├── package.json
└── vite.config.ts
```

---

## Step 10: Key Code Examples

### Privy Provider Setup

**src/providers/PrivyProvider.tsx:**

```typescript
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiConfig, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

const wagmiConfig = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(
      `https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
    ),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email', 'google', 'twitter'],
        appearance: {
          theme: 'light',
          accentColor: '#6366f1',
          logo: '/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
    </PrivyProvider>
  );
}
```

### Connect Wallet Component

**src/components/ConnectWallet.tsx:**

```typescript
import { usePrivy } from '@privy-io/react-auth';

export function ConnectWallet() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-address">
            {user?.wallet?.address.slice(0, 6)}...
            {user?.wallet?.address.slice(-4)}
          </span>
        </div>
        <button onClick={logout} className="btn-disconnect">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={login} className="btn-connect">
      Connect Wallet
    </button>
  );
}
```

### Smart Contract (NFT.sol)

**contracts/NFT.sol:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMinter is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NFTMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("My NFT Collection", "MNFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        emit NFTMinted(recipient, newTokenId, tokenURI);

        return newTokenId;
    }

    function getTotalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
```

### Mint NFT Component

**src/components/MintNFT.tsx:**

```typescript
import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { parseEther } from 'viem';
import { uploadToIPFS } from '../lib/ipfs';
import { mintNFT } from '../lib/contract';

export function MintNFT() {
  const { data: walletClient } = useWalletClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletClient || !image) return;

    try {
      setMinting(true);

      // 1. Upload image to IPFS
      console.log('Uploading image to IPFS...');
      const imageUrl = await uploadToIPFS(image);

      // 2. Create metadata
      const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: [],
      };

      // 3. Upload metadata to IPFS
      console.log('Uploading metadata to IPFS...');
      const metadataUrl = await uploadToIPFS(
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );

      // 4. Mint NFT
      console.log('Minting NFT...');
      const hash = await mintNFT(walletClient, metadataUrl);
      setTxHash(hash);

      alert('NFT Minted Successfully!');

      // Reset form
      setName('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Minting error:', error);
      alert(error.message || 'Failed to mint NFT');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="mint-container">
      <h2>Mint Your NFT</h2>

      <form onSubmit={handleMint}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="My Awesome NFT"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your NFT..."
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={minting || !walletClient}
          className="btn-mint"
        >
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>

      {txHash && (
        <div className="success-message">
          <p>Transaction Hash:</p>
          <a
            href={`https://mumbai.polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash.slice(0, 10)}...{txHash.slice(-8)}
          </a>
        </div>
      )}
    </div>
  );
}
```

### NFT Gallery

**src/components/NFTGallery.tsx:**

```typescript
import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { NFTCard } from './NFTCard';
import { fetchNFTs } from '../lib/contract';

export function NFTGallery() {
  const publicClient = usePublicClient();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNFTs() {
      try {
        const fetchedNFTs = await fetchNFTs(publicClient);
        setNfts(fetchedNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNFTs();
  }, [publicClient]);

  if (loading) {
    return <div className="loading">Loading NFTs...</div>;
  }

  if (nfts.length === 0) {
    return (
      <div className="empty-state">
        <p>No NFTs minted yet. Be the first to mint!</p>
      </div>
    );
  }

  return (
    <div className="nft-gallery">
      <h2>NFT Collection</h2>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
}
```

---

## Step 11: Run Your dApp (5 minutes)

### 11.1 Get Test MATIC

1. Go to https://faucet.polygon.technology
2. Select "Mumbai"
3. Paste your wallet address
4. Click "Submit"
5. Wait ~1 minute for test MATIC

### 11.2 Start Development Server

```bash
npm run dev
```

**Open:** http://localhost:5173

### 11.3 Test the dApp

1. **Click "Connect Wallet"**
   - Choose MetaMask (or any wallet)
   - Approve the connection
   - See your wallet address displayed

2. **Mint an NFT**
   - Fill in name and description
   - Upload an image
   - Click "Mint NFT"
   - Approve the transaction in MetaMask
   - Wait for confirmation

3. **View in Gallery**
   - Your NFT appears automatically!
   - Click to see full details

4. **View on Polygonscan**
   - Click the transaction link
   - See it on the blockchain explorer

---

## Step 12: Deploy to Production (15 minutes)

### 12.1 Update Privy for Production

In Privy Dashboard:
1. Add production URL: `https://your-app.vercel.app`
2. Update chain to Polygon Mainnet (for production)
3. Save changes

### 12.2 Deploy Contract to Polygon Mainnet

```bash
# In hardhat folder
npx hardhat run scripts/deploy.ts --network polygon

# Copy the contract address
# Update .env.production:
VITE_NFT_CONTRACT_ADDRESS=0x_new_mainnet_address
```

### 12.3 Deploy to Vercel

```bash
# Build for production
npm run build

# Deploy
vercel --prod
```

**Add environment variables in Vercel:**
- `VITE_PRIVY_APP_ID`
- `VITE_ALCHEMY_API_KEY`
- `VITE_NFT_CONTRACT_ADDRESS`
- `VITE_CHAIN_ID=137` (Polygon Mainnet)

**Your dApp is live!** 🎉

---

## Step 13: Advanced Features

### 13.1 Add Wallet Balance Display

```typescript
import { useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

export function WalletBalance() {
  const { user } = usePrivy();
  const { data: balance } = useBalance({
    address: user?.wallet?.address,
  });

  return (
    <div className="balance">
      <span>{balance?.formatted} {balance?.symbol}</span>
    </div>
  );
}
```

### 13.2 Add Transaction History

```typescript
import { usePublicClient } from 'wagmi';

export function TransactionHistory() {
  const publicClient = usePublicClient();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTxs() {
      // Fetch transactions for user's address
      const logs = await publicClient.getLogs({
        address: contractAddress,
        event: 'NFTMinted',
        fromBlock: 'earliest',
      });

      setTransactions(logs);
    }

    fetchTxs();
  }, []);

  return (
    <div className="tx-history">
      {transactions.map((tx) => (
        <div key={tx.transactionHash}>
          <a href={`https://polygonscan.com/tx/${tx.transactionHash}`}>
            {tx.transactionHash.slice(0, 10)}...
          </a>
        </div>
      ))}
    </div>
  );
}
```

### 13.3 Add Gas Estimation

```typescript
async function estimateGas() {
  const gasEstimate = await publicClient.estimateContractGas({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mintNFT',
    args: [userAddress, tokenURI],
  });

  const gasPrice = await publicClient.getGasPrice();
  const gasCost = gasEstimate * gasPrice;

  console.log(`Estimated gas cost: ${formatEther(gasCost)} MATIC`);
  return gasCost;
}
```

### 13.4 Add Network Switching

```typescript
import { useSwitchNetwork } from 'wagmi';

export function NetworkSwitcher() {
  const { chains, switchNetwork } = useSwitchNetwork();

  return (
    <select onChange={(e) => switchNetwork?.(Number(e.target.value))}>
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </select>
  );
}
```

---

## Troubleshooting

### "Privy not configured"

Check `.env`:
```bash
# Make sure this is set
VITE_PRIVY_APP_ID=clp...
```

### "Insufficient funds"

Get test MATIC from faucet:
https://faucet.polygon.technology

### "Contract not deployed"

Re-run deployment:
```bash
cd hardhat
npx hardhat run scripts/deploy.ts --network mumbai
```

### "MetaMask shows wrong network"

Switch to Polygon Mumbai in MetaMask:
1. Open MetaMask
2. Click network dropdown
3. Select "Polygon Mumbai" or add it manually

### "IPFS upload failed"

Try alternative IPFS service:
- Pinata: https://pinata.cloud
- NFT.Storage: https://nft.storage
- Web3.Storage: https://web3.storage

---

## Next Steps

### Enhance Your dApp

**Add Features:**
- NFT marketplace (buy/sell)
- Lazy minting (mint on purchase)
- Royalties for creators
- Batch minting
- NFT staking
- Token gating

**Improve UX:**
- Loading skeletons
- Transaction animations
- Error boundaries
- Mobile optimization
- Progressive Web App

**Add Security:**
- Rate limiting
- Signature verification
- Contract upgradability
- Pausable contracts

**Scale:**
- Layer 2 solutions (Polygon, Arbitrum)
- IPFS pinning service
- CDN for assets
- Caching layer

---

## Summary

**You built:**
- ✅ Full Web3 dApp with React + TypeScript
- ✅ Privy wallet authentication (email, social, wallet)
- ✅ Smart contract on Polygon
- ✅ NFT minting functionality
- ✅ IPFS integration for metadata
- ✅ NFT gallery
- ✅ Deployed to production

**From zero to Web3 in ~75 minutes!**

**Welcome to Web3 development!** 🚀⛓️
