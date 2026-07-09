# ETN Forge 🚀

**The Ultimate Electroneum DApp Scaffolding Tool**

ETN Forge is a comprehensive development toolkit designed to accelerate Electroneum DApp development. It provides pre-configured templates with modern web technologies and blockchain development tools, making it easy to build, test, and deploy decentralized applications on the Electroneum Smart Chain.

## 🌟 Features

- **Multiple Framework Support**: Choose between Next.js and React
- **TypeScript & JavaScript**: Full TypeScript support with optional JavaScript templates
- **Blockchain Development Tools**: Integrated Hardhat and Foundry support
- **Modern Web Stack**: Latest versions of React, Next.js, Tailwind CSS, and more
- **Wallet Integration**: Built-in Wagmi and Viem for seamless wallet connectivity
- **Electroneum Optimized**: Pre-configured for Electroneum Smart Chain (mainnet & testnet)
- **Interactive CLI**: Beautiful command-line interface with arrow key navigation
- **Production Ready**: Includes testing, linting, and deployment configurations

## 📋 Prerequisites

Before using etn-forge, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

For blockchain development:
- **Hardhat** (automatically installed with templates)
- **Foundry** (for Foundry-based templates)

## 🚀 Quick Start

### Create a New DApp

### Using npx (Recommended)

```sh
npx etn-forge <app name>
```

### Interactive Setup

The CLI will guide you through the setup process:

1. **Choose Language**: TypeScript (recommended) or JavaScript
2. **Select Framework**: Next.js (recommended) or React
3. **Choose Web3 SDK**: Wagmi + Viem (recommended) or thirdweb SDK
4. **Pick Development Environment**: Hardhat (recommended) or Foundry (automatically set to Foundry for thirdweb)

### Example Usage

```bash
# Create a Next.js + TypeScript + Hardhat project
npx etn-forge my-nextjs-dapp

# The CLI will automatically:
# ✅ Copy template files
# ✅ Initialize Git repository
# ✅ Install dependencies
# ✅ Set up project structure
```

## 📁 Project Structure

Each generated project follows a monorepo structure:

```
my-dapp/
├── frontend/                 # Web application
│   ├── app/                 # Next.js app directory (or src/ for React)
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── constants/          # Contract ABIs and helpers
│   ├── modals/             # Modal components
│   └── package.json        # Frontend dependencies
├── smart-contract/         # Blockchain development
│   ├── contracts/          # Solidity smart contracts
│   ├── test/              # Contract tests
│   ├── scripts/           # Deployment scripts
│   └── package.json       # Smart contract dependencies
└── package.json           # Root workspace configuration
```

## 🛠 Available Templates

### Next.js Templates

| Template | Language | Blockchain Tool | Description |
|----------|----------|-----------------|-------------|
| `next-ts-hardhat` | TypeScript | Hardhat | Next.js with TypeScript and Hardhat (Recommended) |
| `next-js-hardhat` | JavaScript | Hardhat | Next.js with JavaScript and Hardhat |
| `next-ts-foundry` | TypeScript | Foundry | Next.js with TypeScript and Foundry |
| `next-js-foundry` | JavaScript | Foundry | Next.js with JavaScript and Foundry |
| `next-ts-thirdweb-foundry` | TypeScript | thirdweb + Foundry | Next.js with TypeScript, thirdweb SDK, and Foundry |
| `next-js-thirdweb-foundry` | JavaScript | thirdweb + Foundry | Next.js with JavaScript, thirdweb SDK, and Foundry |

### React Templates

| Template | Language | Blockchain Tool | Description |
|----------|----------|-----------------|-------------|
| `react-ts-hardhat` | TypeScript | Hardhat | React with TypeScript and Hardhat |
| `react-js-hardhat` | JavaScript | Hardhat | React with JavaScript and Hardhat |
| `react-ts-foundry` | TypeScript | Foundry | React with TypeScript and Foundry |
| `react-js-foundry` | JavaScript | Foundry | React with JavaScript and Foundry |
| `react-ts-thirdweb-foundry` | TypeScript | thirdweb + Foundry | React with TypeScript, thirdweb SDK, and Foundry |
| `react-js-thirdweb-foundry` | JavaScript | thirdweb + Foundry | React with JavaScript, thirdweb SDK, and Foundry |

## 🎯 What's Included

### Frontend Features

- **Modern UI Framework**: Next.js 16 or React 19
- **Styling**: Tailwind CSS v4 with dark mode support
- **Type Safety**: Full TypeScript support
- **State Management**: TanStack Query for server state (Wagmi templates)
- **Wallet Integration**: Wagmi + Viem or thirdweb SDK v5 for blockchain interactions
- **Component Library**: Pre-built components for common DApp patterns
- **Responsive Design**: Mobile-first responsive layouts
- **Error Handling**: Comprehensive error states and loading indicators

### Smart Contract Features

- **Development Environment**: Hardhat or Foundry
- **Sample Contract**: Counter contract with full CRUD operations
- **Testing Framework**: Comprehensive test suite
- **Deployment Scripts**: Automated deployment to Electroneum networks (and thirdweb Dashboards)
- **Type Generation**: Automatic TypeScript types from contracts
- **Gas Optimization**: Built-in gas reporting and optimization

### Development Tools

- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Hot Reloading**: Fast development with hot module replacement
- **Environment Configuration**: Easy environment variable management
- **Git Integration**: Pre-configured Git hooks and workflows

## 🔧 Development Commands

### Root Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Smart Contract Commands

#### Hardhat Templates

```bash
# Start local Hardhat node
npm run hardhat

# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy contracts
npx hardhat run scripts/deploy.js --network <network>
```

#### Foundry Templates

```bash
# Build contracts
npm run compile

# Run tests
npm run test

# Start local Anvil node
anvil

# Deploy contracts
forge script script/Counter.s.sol:CounterScript --rpc-url <rpc_url> --private-key <private_key>
```

## 🌐 Electroneum Network Configuration

### Network Details

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Mainnet | 52014 | `https://rpc.ankr.com/electroneum/${ANKR_API_KEY}` | `https://blockexplorer.electroneum.com` |
| Testnet | 5201420 | `https://rpc.ankr.com/electroneum_testnet/${ANKR_API_KEY}` | `https://testnet-blockexplorer.electroneum.com` |

### Environment Variables

Create a `.env` file in your project root:

```env
# Ankr API Key (required for RPC access)
ANKR_API_KEY=your_ankr_api_key_here

# Private key for deployment (keep secure!)
PRIVATE_KEY=your_private_key_here

# Required for thirdweb client initialization (if using thirdweb template)
# For Next.js:
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
# For React (Vite):
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
```

## 📱 Sample DApp Features

Each template includes a fully functional counter DApp that demonstrates:

- **Wallet Connection**: Connect to MetaMask or other Web3 wallets
- **Contract Interaction**: Read and write to smart contracts
- **Transaction Handling**: Complete transaction flow with status updates
- **Error Handling**: Graceful error states and user feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic dark/light theme switching

### Counter Contract Functions

- `getCount()`: Read current counter value
- `increment()`: Increase counter by 1
- `decrement()`: Decrease counter by 1
- `reset()`: Reset counter to 0

## 🚀 Deployment

### Frontend Deployment

#### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify (For React apps)

```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the dist/ folder to Netlify
```

### Smart Contract Deployment

#### Hardhat Deployment

```bash
# Deploy to testnet
npx hardhat run scripts/deploy.js --network electroneum-testnet

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network electroneum
```

#### Foundry Deployment

```bash
# Deploy to testnet
forge script script/Counter.s.sol:CounterScript --rpc-url https://rpc.ankr.com/electroneum_testnet/${ANKR_API_KEY} --private-key ${PRIVATE_KEY} --broadcast

# Deploy to mainnet
forge script script/Counter.s.sol:CounterScript --rpc-url https://rpc.ankr.com/electroneum/${ANKR_API_KEY} --private-key ${PRIVATE_KEY} --broadcast

# thirdweb Deploy (deploy to Electroneum Dashboard without exposing private keys)
npx thirdweb deploy
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Network Connection Issues

```bash
# Check if you have the correct ANKR_API_KEY
echo $ANKR_API_KEY

# Verify network configuration in hardhat.config.ts or foundry.toml
```

#### 2. Contract Deployment Fails

```bash
# Ensure you have sufficient ETN for gas fees
# Check your private key is correct
# Verify network RPC endpoint is accessible
```

#### 3. Frontend Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

#### 4. Wallet Connection Issues

```bash
# Ensure MetaMask is installed and unlocked
# Check if you're on the correct network (Electroneum)
# Clear browser cache and try again
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/DevBigEazi/etn-forge.git
cd etn-forge

# Install dependencies
npm install

# Link the package locally
npm link

# Test the CLI
npx etn-dapp test-project
```
## 📞 Support

- **Documentation**: [https://developer.electroneum.com](https://developer.electroneum.com)
- **GitHub Issues**: [Report bugs here](https://github.com/devbigeazi/etn-forge/issues)

---

**Built with ❤️ for Electroneum Developer Community**

*etn-forge - Empowering developers to build the future of decentralized applications on Electroneum.*

## 🔗 Useful Links

- [Electroneum Docs](https://developer.electroneum.com/)
- [Viem Docs](https://viem.sh/docs/getting-started)
- [Wagmi Docs](https://wagmi.sh/react/getting-started)
- [Foundry Book](https://book.getfoundry.sh/)
- [Hardhat Docs](https://hardhat.org/getting-started/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Node.js Docs](https://nodejs.org)