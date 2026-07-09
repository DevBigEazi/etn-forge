# etn-forge Technical Documentation 🔧

This document provides detailed technical information about the etn-forge project architecture, implementation, and development guidelines.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [CLI Implementation](#cli-implementation)
- [Template System](#template-system)
- [Frontend Architecture](#frontend-architecture)
- [Smart Contract Architecture](#smart-contract-architecture)
- [Development Workflow](#development-workflow)
- [Performance Considerations](#performance-considerations)
- [Security Considerations](#security-considerations)

## 🏗 Architecture Overview

### Project Structure

```
etn-forge/
├── bin/                    # CLI executable
│   └── create-app.js      # Main CLI logic
├── templates/             # Template directories
│   ├── next-ts-hardhat/   # Next.js + TypeScript + Hardhat
│   ├── next-js-hardhat/   # Next.js + JavaScript + Hardhat
│   ├── next-ts-foundry/   # Next.js + TypeScript + Foundry
│   ├── next-js-foundry/   # Next.js + JavaScript + Foundry
│   ├── next-ts-thirdweb-foundry/ # Next.js + TypeScript + thirdweb + Foundry
│   ├── next-js-thirdweb-foundry/ # Next.js + JavaScript + thirdweb + Foundry
│   ├── react-ts-thirdweb-foundry/ # React + TypeScript + thirdweb + Foundry
│   ├── react-js-thirdweb-foundry/ # React + JavaScript + thirdweb + Foundry
│   ├── react-ts-hardhat/  # React + TypeScript + Hardhat
│   ├── react-js-hardhat/  # React + JavaScript + Hardhat
│   ├── react-ts-foundry/  # React + TypeScript + Foundry
│   └── react-js-foundry/  # React + JavaScript + Foundry
├── docs/                  # Documentation
├── package.json           # Root package configuration
├── .npmignore            # NPM publishing configuration
└── README.md             # Main documentation
```

### Design Principles

1. **Modularity**: Each template is self-contained
2. **Consistency**: Uniform structure across all templates
3. **Extensibility**: Easy to add new templates
4. **User Experience**: Intuitive CLI with clear feedback
5. **Production Ready**: Templates include all necessary configurations

## 🖥 CLI Implementation

### Core Components

#### 1. Interactive Selection System

```javascript
// Custom arrow key selector implementation
function createSelector(question, choices) {
  return new Promise((resolve) => {
    let selectedIndex = 0;
    
    // Handle arrow keys and Enter
    process.stdin.on('data', (key) => {
      const keyStr = key.toString();
      
      if (keyStr === '\x1b[A' && selectedIndex > 0) {
        selectedIndex--;
      } else if (keyStr === '\x1b[B' && selectedIndex < choices.length - 1) {
        selectedIndex++;
      } else if (keyStr === '\r' || keyStr === '\n') {
        resolve(choices[selectedIndex].value);
      }
    });
  });
}
```

#### 2. Template Copying System

```javascript
// Recursive directory copy with error handling
async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src);

  for (let entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stats = await stat(srcPath);

    if (stats.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}
```

#### 3. Command Execution

```javascript
// Safe command execution with error handling
function execCommand(command, cwd) {
  try {
    execSync(command, { stdio: "inherit", cwd });
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to execute ${command}`), error);
    return false;
  }
}
```

### CLI Flow

1. **Banner Display**: Show ASCII art and welcome message
2. **Project Name Validation**: Check if directory exists
3. **Interactive Selection**: Language → Framework → Environment
4. **Template Copying**: Copy selected template files
5. **Git Initialization**: Initialize repository and commit
6. **Dependency Installation**: Install npm packages
7. **Success Message**: Display next steps

## 📦 Template System

### Template Structure

Each template follows a consistent structure:

```
template-name/
├── frontend/              # Web application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks
│   ├── constants/       # Configuration
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
├── smart-contract/       # Blockchain development
│   ├── contracts/       # Solidity contracts
│   ├── test/           # Contract tests
│   ├── scripts/        # Deployment scripts
│   ├── package.json    # Contract dependencies
│   └── README.md       # Contract documentation
└── package.json         # Root workspace configuration
```

### Template Configuration

#### Root package.json (Workspace)

```json
{
  "name": "electroneum-dapp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "start": "cd frontend && npm run start",
    "hardhat": "cd smart-contract && npx hardhat node",
    "compile": "cd smart-contract && npx hardhat compile",
    "test": "cd smart-contract && npx hardhat test"
  },
  "workspaces": [
    "frontend",
    "smart-contract"
  ]
}
```

#### Frontend package.json

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.81.5",
    "next": "15.3.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "viem": "^2.31.7",
    "wagmi": "^2.15.6"
  }
}
```

## 🎨 Frontend Architecture

### Technology Stack

- **Framework**: Next.js 16 / React 19
- **Language**: TypeScript / JavaScript
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (Wagmi templates)
- **Blockchain**: Wagmi + Viem / thirdweb SDK v5
- **Build Tool**: Turbopack (Next.js)

### Component Architecture

#### 1. Provider Setup

```typescript
// provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

#### 2. Configuration (Wagmi)

```typescript
// config.ts
import { http, createConfig } from 'wagmi';
import { electroneum, electroneumTestnet } from 'wagmi/chains';

export const config = createConfig({
  chains: [electroneum, electroneumTestnet],
  transports: {
    [electroneum.id]: http(),
    [electroneumTestnet.id]: http(),
  },
});
```

#### 2.1 Configuration (thirdweb)

For thirdweb templates, the setup uses the client utility and `defineChain` for network details.

```typescript
// lib/client.ts
import { createThirdwebClient } from "thirdweb";

// For Next.js:
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";
// For React (Vite):
// const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "";

export const client = createThirdwebClient({
  clientId,
});

// usage in hooks/components
import { defineChain } from "thirdweb";
export const electroneum = defineChain(52014);
export const electroneumTestnet = defineChain(5201420);
```

#### 3. Custom Hooks

```typescript
// hooks/useGetCount.ts
import { useReadContract, useChainId } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';

export const useGetCounter = () => {
  const queryClient = useQueryClient();
  const chainId = useChainId();
  
  const network = useMemo(() => 
    chainId === 52014 ? "mainnet" : "testnet", 
    [chainId]
  );
  
  const contractAddress = useMemo(() => 
    CONTRACTS[network], 
    [network]
  );

  const {
    data: rawCount,
    refetch,
    isLoading,
    error,
  } = useReadContract({
    abi: countAbi,
    address: contractAddress,
    functionName: "getCount",
  });

  // ... rest of implementation
};
```

### State Management

#### TanStack Query Integration

```typescript
// Automatic cache invalidation on block updates
useEffect(() => {
  if (blockNumber) {
    queryClient.invalidateQueries({ queryKey });
    refetch();
  }
}, [blockNumber, invalidateQueries]);
```

#### Transaction State Management

```typescript
// Write hook with transaction states
const {
  increment,
  isPending: isIncrementPending,
  isConfirming: isIncrementConfirming,
  isConfirmed: isIncrementConfirmed,
  error: incrementError
} = useCounterIncrement();
```

## ⛓ Smart Contract Architecture

### Technology Stack

- **Language**: Solidity 0.8.26
- **Development**: Hardhat 2.24 / Foundry
- **Testing**: Hardhat Test / Forge Test
- **Deployment**: Hardhat Scripts / Forge Scripts
- **Type Generation**: TypeChain

### Contract Structure

#### Counter Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    int256 public count;
    address public owner;
    
    event CountChanged(int256 newCount, address changedBy);
    
    constructor() {
        owner = msg.sender;
        count = 0;
    }
    
    function increment() public {
        count++;
        emit CountChanged(count, msg.sender);
    }
    
    function decrement() public {
        count--;
        emit CountChanged(count, msg.sender);
    }
    
    function reset() public {
        count = 0;
        emit CountChanged(count, msg.sender);
    }
    
    function getCount() public view returns (int256) {
        return count;
    }
}
```

### Hardhat Configuration

```typescript
// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.26",
  networks: {
    "electroneum-testnet": {
      url: `https://rpc.ankr.com/electroneum_testnet/${process.env.ANKR_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    "electroneum": {
      url: `https://rpc.ankr.com/electroneum/${process.env.ANKR_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
```

### Foundry Configuration

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"

[rpc_endpoints]
electroneum-testnet = "https://rpc.ankr.com/electroneum_testnet/${ANKR_API_KEY}"
electroneum = "https://rpc.ankr.com/electroneum/${ANKR_API_KEY}"
 
[etherscan]
electroneum-testnet = { key = "empty", url = "https://testnet-blockexplorer.electroneum.com/api"}
electroneum = { key = "empty", url = "https://blockexplorer.electroneum.com/api" }
```

## 🔄 Development Workflow

### Local Development

1. **Template Development**:
   ```bash
   # Create test project
   npm link
   etn-forge test-project
   
   # Test template functionality
   cd test-project
   npm run dev
   ```

2. **CLI Testing**:
   ```bash
   # Test CLI locally
   node bin/create-app.js test-project
   ```

3. **Template Updates**:
   ```bash
   # Update template files
   # Test with new project creation
   # Verify all functionality works
   ```

### Testing Strategy

#### Unit Tests
- CLI functionality
- Template generation
- Error handling

#### Integration Tests
- End-to-end template creation
- DApp functionality
- Contract deployment

#### Manual Testing
- Cross-platform compatibility
- Different Node.js versions
- Various user scenarios

## ⚡ Performance Considerations

### CLI Performance

1. **Template Copying**: Use efficient file operations
2. **Dependency Installation**: Parallel installation where possible
3. **Memory Usage**: Minimize memory footprint during execution

### Frontend Performance

1. **Code Splitting**: Automatic with Next.js
2. **Bundle Optimization**: Turbopack for faster builds
3. **Caching**: TanStack Query for efficient data fetching
4. **Image Optimization**: Next.js built-in optimization

### Smart Contract Performance

1. **Gas Optimization**: Efficient contract design
2. **Testing**: Comprehensive test coverage
3. **Deployment**: Optimized deployment scripts

## 🔒 Security Considerations

### CLI Security

1. **Input Validation**: Validate all user inputs
2. **File Operations**: Safe file copying and creation
3. **Error Handling**: Don't expose sensitive information

### Frontend Security

1. **Environment Variables**: Secure handling of API keys
2. **Wallet Integration**: Safe wallet connection
3. **Input Sanitization**: Validate all user inputs

### Smart Contract Security

1. **Access Control**: Proper ownership management
2. **Input Validation**: Validate all function parameters
3. **Reentrancy Protection**: Use reentrancy guards
4. **Testing**: Comprehensive security testing

### Network Security

1. **RPC Endpoints**: Use secure, reliable RPC providers
2. **Private Keys**: Never expose private keys in code
3. **Environment Variables**: Secure environment configuration

## 📊 Monitoring and Debugging

### CLI Debugging

```bash
# Enable debug logging
DEBUG=* etn-forge my-project

# Verbose output
etn-forge my-project --verbose
```

### Frontend Debugging

```typescript
// Enable Wagmi debug mode
const config = createConfig({
  chains: [electroneum, electroneumTestnet],
  transports: {
    [electroneum.id]: http(),
    [electroneumTestnet.id]: http(),
  },
  debug: true, // Enable debug mode
});
```

### Smart Contract Debugging

```bash
# Hardhat debugging
npx hardhat console --network localhost

# Foundry debugging
forge debug
```

## 🚀 Deployment Considerations

### Frontend Deployment

1. **Vercel**: Optimized for Next.js
2. **Netlify**: Good for React apps
3. **Environment Variables**: Configure for production

### Smart Contract Deployment

1. **Testnet First**: Always deploy to testnet first
2. **Verification**: Verify contracts on block explorer
3. **Monitoring**: Monitor contract interactions

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
name: Deploy DApp
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

**This technical documentation provides a comprehensive overview of the etn-forge architecture and implementation details. For specific usage instructions, refer to the main README.md file.** 