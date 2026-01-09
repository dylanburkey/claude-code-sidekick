# Blockchain Development Agents

> Specialized agents for Web3, smart contract development, and blockchain integration.

## Overview

Blockchain development agents provide specialized tools for building decentralized applications (DApps), smart contracts, and Web3 integrations. These agents understand blockchain-specific patterns, security considerations, and best practices.

## Available Agents

### Smart Contract Development
- **Contract Generator**: Generate Solidity/Vyper smart contracts
- **Contract Upgrader**: Create upgradeable contract patterns
- **Security Auditor**: Analyze contracts for vulnerabilities
- **Gas Optimizer**: Optimize contract gas usage

### DApp Development
- **DApp Scaffolder**: Generate complete DApp structure
- **Web3 Integration**: Connect frontend to blockchain
- **Wallet Connector**: Implement wallet connection logic
- **Transaction Manager**: Handle blockchain transactions

### Testing & Deployment
- **Contract Test Generator**: Create comprehensive contract tests
- **Hardhat/Foundry Setup**: Configure development environment
- **Deployment Scripts**: Generate deployment automation
- **Network Manager**: Multi-chain deployment handling

### Blockchain Integration
- **Subgraph Generator**: Create The Graph subgraphs
- **Event Listener**: Monitor blockchain events
- **Oracle Integration**: Connect to price feeds and oracles
- **IPFS Manager**: Handle decentralized storage

## Usage Patterns

### Generate Smart Contract

```markdown
Generate an ERC-721 NFT contract with:
- Mintable tokens with metadata
- Pausable functionality
- Owner controls
- Royalty support (EIP-2981)
- Gas optimizations
- Comprehensive tests
```

### Create DApp Frontend

```markdown
Generate a DApp frontend for the NFT marketplace including:
- Wallet connection (MetaMask, WalletConnect)
- Contract interaction hooks
- Transaction status handling
- Error management
- Network switching
- Gas estimation
```

### Deploy Multi-Chain

```markdown
Create deployment scripts for:
- Ethereum mainnet
- Polygon
- Arbitrum
- Optimism

Include verification, gas optimization, and rollback procedures.
```

## Best Practices

### Smart Contract Security

```solidity
// ✓ Use established patterns
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureNFT is ERC721, Ownable, ReentrancyGuard {
    // ✓ Use SafeMath (or Solidity 0.8+ built-in checks)
    // ✓ Implement ReentrancyGuard
    // ✓ Use pull over push for payments
    // ✓ Validate all inputs
    // ✓ Emit events for important state changes

    function mint(address to, uint256 tokenId)
        external
        onlyOwner
        nonReentrant
    {
        require(to != address(0), "Invalid address");
        _safeMint(to, tokenId);
        emit Minted(to, tokenId);
    }
}
```

### Gas Optimization

```solidity
// ✓ Pack storage variables
contract Optimized {
    // Pack into single slot (256 bits)
    uint128 public value1;
    uint64 public value2;
    uint64 public value3;

    // ✓ Use immutable for constants set in constructor
    address public immutable owner;

    // ✓ Use calldata for read-only function parameters
    function process(uint256[] calldata ids) external {
        // Process ids
    }

    // ✓ Cache storage reads
    function batchProcess() external {
        uint256 _value = value1; // Cache storage read
        for (uint i = 0; i < 10; i++) {
            // Use _value instead of reading storage repeatedly
        }
    }
}
```

### Web3 Integration

```typescript
// ✓ Handle wallet connection properly
import { useWeb3React } from '@web3-react/core';

function WalletConnect() {
  const { activate, account, library } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injector);
    } catch (error) {
      console.error('Connection failed:', error);
      // Handle different error types
      if (error.code === 4001) {
        // User rejected
      } else if (error.code === -32002) {
        // Request already pending
      }
    }
  };

  return (
    <button onClick={connect}>
      {account ? `Connected: ${account}` : 'Connect Wallet'}
    </button>
  );
}
```

## Agent Configuration

### Smart Contract Generator Config

```yaml
agent: blockchain/contract-generator
config:
  language: solidity
  version: 0.8.20
  standards:
    - ERC721
    - ERC2981
  features:
    - ownable
    - pausable
    - enumerable
  testing:
    framework: hardhat
    coverage: true
  optimization:
    runs: 200
```

### DApp Scaffolder Config

```yaml
agent: blockchain/dapp-scaffolder
config:
  frontend:
    framework: react
    web3Library: ethers
    wallets:
      - metamask
      - walletconnect
      - coinbase
  contracts:
    - name: NFTMarketplace
      address: "0x..."
  networks:
    - mainnet
    - goerli
    - polygon
```

## Examples

### Example 1: ERC-20 Token

**Prompt:**
```
Generate an ERC-20 token contract with:
- Fixed supply of 1,000,000 tokens
- 18 decimals
- Burnable functionality
- Permit (EIP-2612) support
- Comprehensive tests
- Deployment script for mainnet and testnets
```

**Generated Output:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Burnable, ERC20Permit {
    constructor()
        ERC20("MyToken", "MTK")
        ERC20Permit("MyToken")
    {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

### Example 2: NFT Marketplace

**Prompt:**
```
Create an NFT marketplace contract with:
- List NFTs for sale (fixed price or auction)
- Buy/bid functionality
- Royalty distribution (EIP-2981)
- Platform fee mechanism
- Event emissions for indexing
- Comprehensive tests
```

### Example 3: DeFi Staking Contract

**Prompt:**
```
Generate a staking contract that allows:
- Users to stake ERC-20 tokens
- Earn rewards based on time staked
- Flexible reward rates (updatable by owner)
- Emergency withdraw function
- Automated reward distribution
- Gas-optimized operations
```

## Integration with MCP

Blockchain agents can leverage MCP for:

- **Database Storage**: Store blockchain data via Neon MCP
- **API Integration**: Connect to blockchain explorers and APIs
- **Event Processing**: Process and store blockchain events
- **Analytics**: Track contract metrics and usage

### MCP Example

```typescript
// Store blockchain events in database via MCP
async function indexNFTTransfers(contractAddress: string) {
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Listen for Transfer events
  contract.on('Transfer', async (from, to, tokenId, event) => {
    // Store event in database via MCP
    await mcp.neon.runSql({
      projectId: 'project-id',
      sql: `
        INSERT INTO nft_transfers (from_address, to_address, token_id, tx_hash, block_number)
        VALUES ($1, $2, $3, $4, $5)
      `,
      params: [from, to, tokenId.toString(), event.transactionHash, event.blockNumber]
    });
  });
}
```

## Smart Contract Patterns

### Proxy Pattern (Upgradeable Contracts)

```solidity
// Using OpenZeppelin's upgradeable contracts
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyNFTUpgradeable is
    Initializable,
    ERC721Upgradeable,
    OwnableUpgradeable
{
    function initialize() initializer public {
        __ERC721_init("MyNFT", "MNFT");
        __Ownable_init();
    }
}
```

### Factory Pattern

```solidity
contract NFTFactory {
    event NFTCreated(address indexed nftAddress, address indexed creator);

    function createNFT(string memory name, string memory symbol)
        external
        returns (address)
    {
        MyNFT nft = new MyNFT(name, symbol, msg.sender);
        emit NFTCreated(address(nft), msg.sender);
        return address(nft);
    }
}
```

### Pull Payment Pattern

```solidity
import "@openzeppelin/contracts/security/PullPayment.sol";

contract Marketplace is PullPayment {
    function buyItem(uint256 itemId) external payable {
        // Process purchase
        address seller = items[itemId].seller;
        uint256 price = items[itemId].price;

        // Use pull payment instead of direct transfer
        _asyncTransfer(seller, price);
    }
}
```

## Testing Smart Contracts

### Unit Tests

```typescript
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT", function () {
  it("Should mint an NFT", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const nft = await MyNFT.deploy();

    await nft.mint(addr1.address, 1);
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should emit Transfer event", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const nft = await MyNFT.deploy();

    await expect(nft.mint(addr1.address, 1))
      .to.emit(nft, "Transfer")
      .withArgs(ethers.ZeroAddress, addr1.address, 1);
  });
});
```

### Gas Tests

```typescript
it("Should optimize gas for batch minting", async function () {
  const tx = await nft.batchMint(addr1.address, [1, 2, 3, 4, 5]);
  const receipt = await tx.wait();

  console.log("Gas used:", receipt.gasUsed.toString());
  expect(receipt.gasUsed).to.be.lt(500000); // Assert gas limit
});
```

### Fuzz Testing

```solidity
// Using Foundry's fuzz testing
contract MyNFTTest is Test {
    function testFuzz_Mint(address to, uint256 tokenId) public {
        vm.assume(to != address(0));
        vm.assume(tokenId < 10000);

        nft.mint(to, tokenId);
        assertEq(nft.ownerOf(tokenId), to);
    }
}
```

## Deployment & Verification

### Hardhat Deployment

```typescript
// deploy/001_deploy_nft.ts
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MyNFT", {
    from: deployer,
    args: ["MyNFT", "MNFT"],
    log: true,
    waitConfirmations: 5,
  });

  // Verify on Etherscan
  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: ["MyNFT", "MNFT"],
  });
};

export default func;
```

### Multi-Chain Deployment

```typescript
// Deploy to multiple networks
const networks = ['mainnet', 'polygon', 'arbitrum', 'optimism'];

for (const network of networks) {
  console.log(`Deploying to ${network}...`);

  await hre.changeNetwork(network);
  const deployment = await deploy("MyNFT", { ... });

  console.log(`Deployed to ${network} at ${deployment.address}`);
}
```

## Security Auditing

### Common Vulnerabilities

- **Reentrancy**: Use ReentrancyGuard
- **Integer Overflow**: Use Solidity 0.8+ or SafeMath
- **Access Control**: Implement proper role management
- **Front-Running**: Use commit-reveal patterns where needed
- **Timestamp Dependence**: Avoid using block.timestamp for critical logic

### Security Tools

```yaml
# Run security analysis
slither: npm run security:slither
mythril: npm run security:mythril
echidna: npm run security:echidna
```

## Troubleshooting

### Gas Issues
- Use gas profiler to identify expensive operations
- Optimize storage layout
- Use events instead of storage where possible
- Batch operations when possible

### Transaction Failures
- Check gas limits
- Verify correct network
- Ensure sufficient balance
- Review revert messages

### Integration Issues
- Verify contract ABIs match deployed contracts
- Check network configurations
- Validate wallet connections
- Test with testnets first

## Contributing

To add a new blockchain agent:

1. Define blockchain-specific functionality
2. Include security considerations
3. Provide deployment scripts
4. Add comprehensive tests
5. Document gas optimizations
6. Include multi-chain support

## Resources

- [Agent Template](../templates/agent-template.md)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Foundry Book](https://book.getfoundry.sh/)

---

*Blockchain development agents provide secure, optimized, and tested solutions for decentralized application development.*
